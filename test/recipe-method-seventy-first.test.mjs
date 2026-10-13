import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["tarta-de-santiago", "cannoli-siciliani", "peanut-shaved-ice", "pav-bhaji"];
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  coldStorage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function recipe(id) {
  const found = byId.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function step(dish, title) {
  const found = dish.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${dish.id}: ${title} step exists`);
  return found;
}

function allLocales(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function official(dish, wanted) {
  for (const url of wanted) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official source is clearly labeled: ${url}`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: culinary references remain separate from safety guidance`);
}

test("seventy-first batch adds four genuinely unchecked, non-excluded recipes", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -36);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 280);
  assert.equal(new Set(beforeThisBatch).size, 280);
  assert.equal(covered.length, 316);
  assert.equal(new Set(covered).size, 316);
  assert.deepEqual(covered.slice(-36, -32), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 55);
  assert.equal(recipes.length - excluded.length - covered.length, 19);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the 280-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("the four revisions retain natural step counts and illustration mappings in all locales", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: unchanged source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: published method was revised`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: published storage guidance was revised`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official guidance was added`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count is retained`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: existing illustration scene mapping is unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration count matches the natural method`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: measurable localized ingredients`);
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: complete localized steps`);
      assert.ok(published.storage[locale], `${id}/${locale}: localized storage guidance`);
    }
    assert.equal(published.ingredients.length, draft.ingredients.length, `${id}: ingredient count is unchanged`);
  }
});

test("Tarta de Santiago checks egg-cake temperature, offers a browned-top correction, and chills leftovers", () => {
  const dish = recipe("tarta-de-santiago");
  const bake = step(dish, "Bake until set but still moist");
  allLocales(bake.body, {
    en: /71°C\/160°F[\s\S]*skewer should carry[\s\S]*tent loosely with foil[\s\S]*3 minutes more/,
    "zh-hant": /71°C\/160°F[\s\S]*竹籤應帶出[\s\S]*鬆鬆蓋上鋁箔[\s\S]*3 分鐘/,
    ja: /71°C\/160°F[\s\S]*竹串には[\s\S]*アルミホイルをかぶせて3分追加/,
    ko: /71°C\/160°F[\s\S]*꼬치에는[\s\S]*호일을 느슨하게 덮고 3분 더/,
    th: /71°C\/160°F[\s\S]*ไม้เสียบควรมี[\s\S]*คลุมฟอยล์หลวม ๆ อบต่อ 3 นาที/
  }, "egg safety and moist-crumb doneness are both measurable");
  allLocales(dish.storage, {
    en: /4°C\/40°F or below within 2 hours[\s\S]*above 32°C\/90°F[\s\S]*3–4 days[\s\S]*FDA guidance/,
    "zh-hant": /4°C\/40°F 以下[\s\S]*2 小時內[\s\S]*32°C\/90°F[\s\S]*3–4 天[\s\S]*FDA/,
    ja: /(?=[\s\S]*4°C\/40°F以下)(?=[\s\S]*2時間以内)(?=[\s\S]*32°C)(?=[\s\S]*3〜4日)(?=[\s\S]*FDA)/,
    ko: /(?=[\s\S]*4°C\/40°F 이하)(?=[\s\S]*2시간 안에)(?=[\s\S]*32°C\/90°F)(?=[\s\S]*3–4일)(?=[\s\S]*FDA)/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*32°C\/90°F[\s\S]*3–4 วัน[\s\S]*FDA/
  }, "egg-cake storage is refrigerated and time-limited");
  official(dish, [urls.temperatures, urls.eggs, urls.handling]);
});

test("cannoli keeps ricotta cold, corrects loose filling, and controls frying and serving time", () => {
  const dish = recipe("cannoli-siciliani");
  allLocales(step(dish, "Fry the shells").body, {
    en: /170–175°C[\s\S]*deep golden and blistered[\s\S]*darken in under 2 minutes[\s\S]*20–30 second increments/,
    "zh-hant": /170–175°C[\s\S]*深金黃並起泡[\s\S]*不到 2 分鐘[\s\S]*20–30 秒/,
    ja: /170〜175°C[\s\S]*濃いきつね色で気泡[\s\S]*2分未満[\s\S]*20〜30秒/,
    ko: /170–175°C[\s\S]*짙은 황금색이고 기포[\s\S]*2분도 되기 전에[\s\S]*20–30초/,
    th: /170–175°C[\s\S]*สีทองเข้มและมีฟอง[\s\S]*ก่อนครบ 2 นาที[\s\S]*20–30 วินาที/
  }, "frying has oil-temperature, colour, timing, and correction cues");
  allLocales(step(dish, "Make the ricotta filling").body, {
    en: /4°C\/40°F or below[\s\S]*hold a soft ridge[\s\S]*return it to the lined sieve[\s\S]*another 30 minutes/,
    "zh-hant": /4°C\/40°F 以下[\s\S]*柔軟紋路[\s\S]*放回鋪布的細篩[\s\S]*再冷藏 30 分鐘/,
    ja: /4°C\/40°F以下[\s\S]*柔らかな筋[\s\S]*裏ごし器に戻してさらに30分/,
    ko: /4°C\/40°F 이하[\s\S]*부드러운 자국[\s\S]*체에 다시 담아 30분 더 냉장/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*รอยนุ่ม ๆ[\s\S]*กลับใส่ตะแกรงที่รองผ้าและแช่อีก 30 นาที/
  }, "a loose dairy filling has a chilled straining correction");
  allLocales(step(dish, "Fill just before serving").body, {
    en: /10–15 minutes before serving[\s\S]*4°C\/40°F or below[\s\S]*2 hours[\s\S]*1 hour above 32°C/,
    "zh-hant": /10–15 分鐘[\s\S]*4°C\/40°F 以下[\s\S]*2 小時[\s\S]*32°C\/90°F 時超過 1 小時/,
    ja: /10〜15分前[\s\S]*4°C\/40°F以下[\s\S]*2時間[\s\S]*32°Cを超える場合は1時間/,
    ko: /10–15분[\s\S]*4°C\/40°F 이하[\s\S]*2시간[\s\S]*32°C\/90°F보다 높은 곳에 1시간/,
    th: /10–15 นาที[\s\S]*4°C\/40°F หรือต่ำกว่า[\s\S]*2 ชั่วโมง[\s\S]*1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C/
  }, "assembled ricotta pastries stay chilled and have a serving-window limit");
  official(dish, [urls.handling, urls.eggs]);
});

test("peanut toppings use a multi-sample tenderness check and quick shallow cooling", () => {
  const dish = recipe("peanut-shaved-ice");
  allLocales(step(dish, "Braise until creamy-tender").body, {
    en: /55–75 minutes[\s\S]*three of the largest peanuts[\s\S]*no firm or chalky centre[\s\S]*10 minutes more[\s\S]*boiling water 100 ml/,
    "zh-hant": /55–75 分鐘[\s\S]*三顆最大的花生[\s\S]*沒有堅硬或粉質中心[\s\S]*再燉 10 分鐘[\s\S]*100 毫升沸水/,
    ja: /55〜75分[\s\S]*大きいものを3粒[\s\S]*硬い芯や粉っぽさ[\s\S]*さらに10分[\s\S]*熱湯を100ml/,
    ko: /55–75분[\s\S]*가장 큰 땅콩 3개[\s\S]*단단하거나 분가루 같은 심[\s\S]*10분 더[\s\S]*끓는 물을 100ml/,
    th: /55–75 นาที[\s\S]*ถั่วเมล็ดใหญ่ 3 เมล็ด[\s\S]*ไตแข็งหรือเป็นผง[\s\S]*10 นาที[\s\S]*น้ำเดือดครั้งละ 100 มล\./
  }, "several peanuts establish tenderness and an undercooked correction");
  allLocales(step(dish, "Sweeten only after tender").body, {
    en: /clean shallow containers[\s\S]*no deeper than about 5 cm(?=[\s\S]*within 2 hours)(?=[\s\S]*4°C\/40°F or below)(?=[\s\S]*Do not wait)/,
    "zh-hant": /乾淨淺容器[\s\S]*不超過 5 公分[\s\S]*2 小時內[\s\S]*4°C\/40°F 以下[\s\S]*不要等整鍋/,
    ja: /清潔な深さ約5cm以下の浅い容器(?=[\s\S]*2時間以内)(?=[\s\S]*4°C\/40°F以下)(?=[\s\S]*鍋全体が室温になるまで待たない)/,
    ko: /깨끗한 얕은 용기[\s\S]*깊이 약 5cm 이하(?=[\s\S]*2시간 안에)(?=[\s\S]*4°C\/40°F 이하)(?=[\s\S]*기다리지 않습니다)/,
    th: /ภาชนะตื้นสะอาด[\s\S]*ไม่เกินประมาณ 5 ซม\.(?=[\s\S]*ภายใน 2 ชั่วโมง)(?=[\s\S]*4°C\/40°F หรือต่ำกว่า)(?=[\s\S]*อย่ารอ)/,
  }, "cooked peanuts cool promptly in shallow containers");
  allLocales(dish.storage, {
    en: /4°C\/40°F or below[\s\S]*within 2 hours[\s\S]*3 days[\s\S]*quality preference/,
    "zh-hant": /4°C\/40°F 以下[\s\S]*2 小時內[\s\S]*3 天[\s\S]*品質偏好/,
    ja: /(?=[\s\S]*4°C\/40°F以下)(?=[\s\S]*2時間以内)(?=[\s\S]*3日以内)(?=[\s\S]*品質上の目安)/,
    ko: /4°C\/40°F 이하[\s\S]*2시간 안에[\s\S]*3일 안에[\s\S]*품질 권장사항/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*3 วัน[\s\S]*คำแนะนำด้านคุณภาพ/
  }, "storage temperatures and the texture-only three-day target are explicit");
  official(dish, [urls.handling]);
});

test("pav bhaji times pressure cooking from pressure, checks largest pieces, and corrects consistency", () => {
  const dish = recipe("pav-bhaji");
  allLocales(step(dish, "Pressure-cook the vegetables").body, {
    en: /Once it reaches high pressure[\s\S]*5-minute timer[\s\S]*largest potato and cauliflower[\s\S]*no firm centre[\s\S]*1 more minute/,
    "zh-hant": /升至高壓後開始計時 5 分鐘[\s\S]*最大塊的馬鈴薯與花椰菜[\s\S]*沒有硬心[\s\S]*再煮 1 分鐘/,
    ja: /高圧になってから5分[\s\S]*最も大きいじゃがいもとカリフラワー[\s\S]*硬い芯がなく[\s\S]*1分加圧/,
    ko: /고압에 도달한 뒤 5분[\s\S]*가장 큰 감자와 콜리플라워[\s\S]*단단한 심 없이[\s\S]*1분 더/,
    th: /ขึ้นแรงดันสูงแล้วเริ่มจับเวลา 5 นาที[\s\S]*ชิ้นมันฝรั่งและกะหล่ำดอกที่ใหญ่ที่สุด[\s\S]*ไม่มีไตแข็ง[\s\S]*ต่อ 1 นาที/
  }, "the cooker timing and vegetable texture correction are explicit");
  allLocales(step(dish, "Mash vegetables into the masala").body, {
    en: /10–12 minutes[\s\S]*spatula track should close slowly[\s\S]*hot water 15 ml at a time[\s\S]*2-minute increments/,
    "zh-hant": /10–12 分鐘[\s\S]*鍋底痕跡應慢慢合起[\s\S]*每次加入 15 毫升熱水[\s\S]*每次續煮 2 分鐘/,
    ja: /10〜12分[\s\S]*跡がゆっくり閉じ[\s\S]*熱湯を15mlずつ[\s\S]*2分ずつ/,
    ko: /10–12분[\s\S]*자국이 천천히 메워지고[\s\S]*뜨거운 물을 15ml씩[\s\S]*2분씩/,
    th: /10–12 นาที[\s\S]*รอยที่ลากด้วยพายควรค่อย ๆ ปิด[\s\S]*น้ำร้อนครั้งละ 15 มล\.[\s\S]*ครั้งละ 2 นาที/
  }, "masala thickness has measurable tests and recovery steps");
  allLocales(dish.storage, {
    en: /(?=[\s\S]*4°C\/40°F or below)(?=[\s\S]*within 2 hours)(?=[\s\S]*3–4 days)(?=[\s\S]*74°C\/165°F)/,
    "zh-hant": /(?=[\s\S]*4°C\/40°F 以下)(?=[\s\S]*2 小時內)(?=[\s\S]*3–4 天)(?=[\s\S]*74°C\/165°F)/,
    ja: /(?=[\s\S]*4°C\/40°F以下)(?=[\s\S]*2時間以内)(?=[\s\S]*3〜4日)(?=[\s\S]*74°C\/165°F)/,
    ko: /(?=[\s\S]*4°C\/40°F 이하)(?=[\s\S]*2시간 안에)(?=[\s\S]*3–4일)(?=[\s\S]*74°C\/165°F)/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "vegetable stew refrigeration and leftover reheating follow official guidance");
  official(dish, [urls.handling, urls.coldStorage, urls.temperatures]);
});
