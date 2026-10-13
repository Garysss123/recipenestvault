import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["dal-tadka", "gougeres", "skillet-cornbread", "toutons"];
const urls = {
  egg: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  flour: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know",
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
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
      `${dish.id}: official guidance is labelled separately: ${url}`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: two culinary references remain separate from official guidance`);
}

test("seventy-fourth batch adds four eligible slugs to exact five-locale coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -43);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 292);
  assert.equal(new Set(beforeThisBatch).size, 292);
  assert.equal(covered.length, 335);
  assert.equal(new Set(covered).size, 335);
  assert.deepEqual(covered.slice(-43, -39), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 43);
  assert.equal(recipes.length - excluded.length - covered.length, 0);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the exact 292-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("the four publication revisions preserve draft ingredients, natural steps, and illustrations", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: publication method was improved`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: publication storage guidance was improved`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official safety guidance was added`);
    assert.deepEqual(published.ingredients, draft.ingredients, `${id}: ingredient rows and amounts are unchanged`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: illustration scenes are unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration count matches the method`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: method is complete`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage guidance is localized`);
    }
  }
});

test("dal tadka starts the cooker timer at pressure and checks lentil texture without an unrelated cooking temperature", () => {
  const dish = recipe("dal-tadka");
  allLocales(step(dish, "Cook the lentils until collapsing").body, {
    en: /start a 10-minute timer only when high pressure is reached[\s\S]*fall naturally for 10 minutes[\s\S]*pressure indicator is down[\s\S]*Test three lentils[\s\S]*firm or chalky centre[\s\S]*30 ml hot water[\s\S]*2 minutes[\s\S]*5-minute natural release/,
    "zh-hant": /高壓後才開始計時 10 分鐘[\s\S]*自然洩壓 10 分鐘[\s\S]*壓力指示下降[\s\S]*取三顆扁豆測試[\s\S]*硬芯或粉硬感[\s\S]*30 毫升熱水[\s\S]*續煮 2 分鐘[\s\S]*自然洩壓 5 分鐘/,
    ja: /高圧になってから10分[\s\S]*10分自然減圧[\s\S]*圧力表示が下がってから[\s\S]*レンズ豆を3粒[\s\S]*硬い芯や粉っぽさ[\s\S]*熱湯30ml[\s\S]*2分加圧[\s\S]*5分自然減圧/,
    ko: /고압에 도달한 뒤부터 10분[\s\S]*10분 자연 감압[\s\S]*압력 표시가 내려간 뒤[\s\S]*렌틸콩 3개[\s\S]*단단하거나 가루 같은 심[\s\S]*뜨거운 물 30ml[\s\S]*2분 더[\s\S]*5분 자연 감압/,
    th: /ถึงแรงดันสูงแล้วจึงเริ่มจับเวลา 10 นาที[\s\S]*ปล่อยแรงดันตามธรรมชาติ 10 นาที[\s\S]*มาตรวัดแรงดันลดลง[\s\S]*ถั่ว 3 เม็ด[\s\S]*แกนแข็งหรือเป็นผง[\s\S]*น้ำร้อน 30 มล\.[\s\S]*2 นาที[\s\S]*5 นาที/
  }, "pressure-cooker timing, texture endpoint, and measured correction are explicit");
  allLocales(dish.storage, {
    en: /shallow containers[\s\S]*4°C \(40°F\)[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*Use within 3 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /淺容器[\s\S]*2 小時內[\s\S]*4°C（40°F）[\s\S]*高於 32°C（90°F）時須於 1 小時內[\s\S]*3 天內[\s\S]*74°C（165°F）/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*4°C（40°F）[\s\S]*32°C（90°F）を超える環境では1時間以内[\s\S]*3日以内[\s\S]*74°C（165°F）/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*32°C \(90°F\)가 넘는 환경에서는 1시간 안에[\s\S]*3일 안에[\s\S]*74°C \(165°F\)/,
    th: /ภาชนะตื้น[\s\S]*4°C \(40°F\)[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*ภายใน 3 วัน[\s\S]*74°C \(165°F\)/
  }, "lentil stew storage and leftover reheating use general leftover guidance");
  official(dish, [urls.temperatures, urls.handling, urls.storage]);
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(dish, "Cook the lentils until collapsing").body[locale], /71°C|160°F|63°C|145°F/,
      `${locale}: no meat or egg cook temperature is applied to lentils`);
  }
});

test("gougères verify the egg-rich shell and recover from browning before doneness", () => {
  const dish = recipe("gougeres");
  allLocales(step(dish, "Bake until hollow and golden").body, {
    en: /deep golden, hollow, and firm[\s\S]*thick shell[\s\S]*71°C \(160°F\)[\s\S]*below 71°C[\s\S]*160°C[\s\S]*3-minute increments/,
    "zh-hant": /深金黃、鼓起且外殼結實[\s\S]*較厚的外殼[\s\S]*71°C（160°F）[\s\S]*低於 71°C[\s\S]*160°C[\s\S]*3 分鐘/,
    ja: /濃いきつね色で膨らみ[\s\S]*厚い殻[\s\S]*71°C（160°F）[\s\S]*71°Cに達していなければ[\s\S]*160°C[\s\S]*3分ずつ/,
    ko: /짙은 금빛에 속이 비고 껍질이 단단해지게[\s\S]*두꺼운 껍질[\s\S]*71°C \(160°F\)[\s\S]*71°C보다 낮으면[\s\S]*160°C[\s\S]*3분씩/,
    th: /พอง สีทองเข้ม และเปลือกแน่น[\s\S]*เนื้อเปลือกส่วนหนา[\s\S]*71°C \(160°F\)[\s\S]*อุณหภูมิต่ำกว่า 71°C[\s\S]*160°C[\s\S]*ครั้งละ 3 นาที/
  }, "egg temperature is measured in shell, with a lower-heat recovery");
  allLocales(dish.storage, {
    en: /egg-and-cheese[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /含蛋與起司[\s\S]*2 小時內[\s\S]*高於 32°C／90°F 時 1 小時內[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /卵とチーズ[\s\S]*2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*3〜4日以内[\s\S]*74°C（165°F）/,
    ko: /달걀과 치즈[\s\S]*2시간 안에[\s\S]*32°C\/90°F를 넘는 환경에서는 1시간 안에[\s\S]*3–4일 안에[\s\S]*74°C \(165°F\)/,
    th: /มีไข่และชีส[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "egg-containing perishable puffs are refrigerated and safely reheated");
  official(dish, [urls.egg, urls.temperatures, urls.handling]);
});

test("skillet cornbread checks its egg-containing centre and corrects an over-browned top", () => {
  const dish = recipe("skillet-cornbread");
  allLocales(step(dish, "Bake, rest and cut").body, {
    en: /centre[\s\S]*71°C \(160°F\)[\s\S]*without wet batter[\s\S]*3 minutes more[\s\S]*cover loosely with foil[\s\S]*200°C[\s\S]*3-minute increments/,
    "zh-hant": /中心[\s\S]*71°C（160°F）[\s\S]*無濕麵糊[\s\S]*再烤 3 分鐘[\s\S]*鬆鬆蓋上鋁箔[\s\S]*200°C[\s\S]*續烤 3 分鐘/,
    ja: /中心[\s\S]*71°C（160°F）[\s\S]*濡れた生地が付かない[\s\S]*3分追加[\s\S]*ホイルをふんわり[\s\S]*200°C[\s\S]*3分ずつ/,
    ko: /중앙[\s\S]*71°C \(160°F\)[\s\S]*젖은 반죽이 묻지 않아야[\s\S]*3분 더[\s\S]*포일을 느슨하게[\s\S]*200°C[\s\S]*3분씩/,
    th: /ตรงกลาง[\s\S]*71°C \(160°F\)[\s\S]*ไม่มีแป้งเปียกติด[\s\S]*อบเพิ่ม 3 นาที[\s\S]*คลุมฟอยล์หลวม ๆ[\s\S]*200°C[\s\S]*ครั้งละ 3 นาที/
  }, "the egg endpoint and recovery protect the centre without burning the crust");
  allLocales(dish.storage, {
    en: /shallow containers[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /淺容器[\s\S]*2 小時內[\s\S]*高於 32°C（90°F）時須於 1 小時內[\s\S]*3–4 天內[\s\S]*74°C（165°F）/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*3〜4日以内[\s\S]*74°C（165°F）/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*32°C\/90°F를 넘는 환경에서는 1시간 안에[\s\S]*3–4일 안에[\s\S]*74°C \(165°F\)/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "cornbread leftovers use egg-dish cooling and reheating guidance");
  official(dish, [urls.egg, urls.temperatures, urls.handling]);
});

test("toutons cook flour dough fully without a guessed internal temperature", () => {
  const dish = recipe("toutons");
  allLocales(step(dish, "Mix the dough").body, {
    en: /Do not taste the raw dough[\s\S]*flour is a raw food[\s\S]*fully cooked/,
    "zh-hant": /麵粉屬生食[\s\S]*徹底烹熟[\s\S]*不要試吃生麵糰/,
    ja: /小麦粉は生の食品[\s\S]*十分に加熱[\s\S]*生地を味見しません/,
    ko: /밀가루는 익히지 않은 식품[\s\S]*완전히 익히기 전에는 맛보지/,
    th: /อย่าชิมโดดิบ[\s\S]*แป้งยังไม่ผ่านความร้อน[\s\S]*ปรุงให้สุกทั่ว/
  }, "FDA raw-flour guidance is applied to dough handling");
  allLocales(step(dish, "Heat the frying oil").body, {
    en: /135°C \(275°F\)[\s\S]*bubble steadily[\s\S]*above 140°C/,
    "zh-hant": /135°C（275°F）[\s\S]*緩緩冒泡[\s\S]*過 140°C/,
    ja: /135°C（275°F）[\s\S]*安定して泡立つ[\s\S]*140°Cを超えたら/,
    ko: /135°C \(275°F\)[\s\S]*꾸준히 거품[\s\S]*140°C를 넘으면/,
    th: /135°C \(275°F\)[\s\S]*ฟองสม่ำเสมอ[\s\S]*เกิน 140°C/
  }, "the frying temperature follows the dough's source-specific method");
  allLocales(step(dish, "Fry the toutons").body, {
    en: /thickest first round[\s\S]*set and matte[\s\S]*no wet, gummy stripe[\s\S]*120°C \(250°F\)[\s\S]*125–130°C[\s\S]*2-minute increments/,
    "zh-hant": /最厚的一片[\s\S]*定型、呈霧面[\s\S]*濕黏生麵糰帶[\s\S]*120°C（250°F）[\s\S]*125–130°C[\s\S]*每次續煎 2 分鐘/,
    ja: /最も厚い1個[\s\S]*固まり、つや消し[\s\S]*湿った粘りのある筋[\s\S]*120°C（250°F）[\s\S]*125〜130°C[\s\S]*2分ずつ/,
    ko: /가장 두꺼운 조각[\s\S]*보송하게 굳고[\s\S]*젖은 끈적한 줄[\s\S]*120°C \(250°F\)[\s\S]*125–130°C[\s\S]*2분씩/,
    th: /ชิ้นแรกที่หนาที่สุด[\s\S]*เซ็ตเป็นเนื้อด้าน[\s\S]*แถบแป้งเปียกเหนียว[\s\S]*120°C \(250°F\)[\s\S]*125–130°C[\s\S]*ครั้งละ 2 นาที/
  }, "the crumb is judged visually and with a lower-heat recovery, not an unrelated safe temperature");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(dish, "Fry the toutons").body[locale], /71°C|74°C|160°F|165°F/,
      `${locale}: no egg or meat internal temperature is applied to flour-only dough`);
  }
  official(dish, [urls.flour, urls.temperatures, urls.handling]);
});
