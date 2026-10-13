import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["kimchi-jeon", "bienenstich", "gemista", "dolmades"];
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker",
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
  assert.ok(found, `${dish.id}: step ${title} exists`);
  return found;
}

function allLocales(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function official(dish, urlsToCheck) {
  for (const url of urlsToCheck) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official source is clearly labelled: ${url}`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: both culinary references remain separate from safety guidance`);
}

test("seventieth batch adds four genuinely unchecked, eligible slugs to shared coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -48);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 276);
  assert.equal(new Set(beforeThisBatch).size, 276);
  assert.equal(covered.length, 324);
  assert.equal(new Set(covered).size, 324);
  assert.deepEqual(covered.slice(-48, -44), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 59);
  assert.equal(recipes.length - excluded.length - covered.length, 11);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the exact starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("the four revisions preserve natural steps and illustrations and localize all recipe data", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: published method was revised`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: published storage guidance was revised`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official guidance was added`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count is retained`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: existing illustration scene mapping is unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration count still matches the natural method`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: all ingredients are measurable and localized`);
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: every step is localized`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage guidance is localized`);
    }
  }
});

test("kimchi pancake uses texture for fresh doneness and reserves 74°C for stored leftovers", () => {
  const dish = recipe("kimchi-jeon");
  const finish = step(dish, "Flip and crisp both sides");
  allLocales(finish.body, {
    en: /3–4 minutes[\s\S]*no longer glossy with wet batter[\s\S]*74°C is not a required safety endpoint/,
    "zh-hant": /3–4 分鐘[\s\S]*不再有濕亮麵糊[\s\S]*不需要以 74°C 作為食安終點/,
    ja: /3〜4分[\s\S]*濡れた生地のつやがなくなるまで[\s\S]*74°Cの安全終点は必要ありません/,
    ko: /3–4분[\s\S]*젖은 반죽처럼 윤이 나지 않게[\s\S]*74°C 안전 기준은 필요하지 않습니다/,
    th: /3–4 นาที[\s\S]*ไม่มีแป้งเปียกมันวาว[\s\S]*ไม่ต้องใช้อุณหภูมิ 74°C/,
  }, "fresh pancake doneness is a texture cue, not a meat endpoint");
  allLocales(dish.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F or below[\s\S]*2 days[\s\S]*quality preference[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F 以下[\s\S]*2 天[\s\S]*品質偏好[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C以下[\s\S]*2日以内[\s\S]*品質上の目安[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*2일 안에[\s\S]*품질 권장사항[\s\S]*74°C\/165°F/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*2 วัน[\s\S]*คำแนะนำด้านคุณภาพ[\s\S]*74°C\/165°F/
  }, "prompt refrigeration and leftover reheating are explicit in all locales");
  official(dish, [urls.temperatures, urls.handling]);
});

test("Bienenstich custard reaches the official egg temperature and cools promptly", () => {
  const dish = recipe("bienenstich");
  const custard = step(dish, "Cook the vanilla custard");
  const chill = step(dish, "Finish and chill the custard");
  allLocales(custard.body, {
    en: /71°C\/160°F[\s\S]*Do not use thickening or bubbles alone/,
    "zh-hant": /71°C\/160°F[\s\S]*不能只以變濃或冒泡/,
    ja: /71°C\/160°F[\s\S]*とろみや泡だけで卵の安全性を判断しません/,
    ko: /71°C\/160°F[\s\S]*걸쭉함이나 거품만으로 달걀 안전성을 판단하지 않습니다/,
    th: /71°C\/160°F[\s\S]*อย่าใช้ความข้นหรือฟองเพียงอย่างเดียว/
  }, "egg-safety endpoint and custard texture are distinguished");
  allLocales(chill.body, {
    en: /clean shallow heatproof dish[\s\S]*no deeper than about 4 cm[\s\S]*4°C\/40°F or below/,
    "zh-hant": /乾淨淺耐熱盤[\s\S]*不超過 4 公分[\s\S]*4°C\/40°F 以下/,
    ja: /清潔な浅い耐熱容器[\s\S]*約4cm以下[\s\S]*4°C以下/,
    ko: /깨끗하고 얕은 내열 접시[\s\S]*4cm를 넘지 않게[\s\S]*4°C\/40°F 이하/,
    th: /จานทนร้อนที่สะอาดและตื้น[\s\S]*ไม่เกินประมาณ 4 ซม\.[\s\S]*4°C\/40°F หรือต่ำกว่า/
  }, "custard is spread shallow and refrigerated");
  allLocales(dish.storage, {
    en: /4°C\/40°F or below[\s\S]*within 2 hours[\s\S]*quality preference/,
    "zh-hant": /4°C\/40°F 以下[\s\S]*2 小時內[\s\S]*品質偏好/,
    ja: /4°C\/40°F以下[\s\S]*2時間以内[\s\S]*品質上の目安/,
    ko: /4°C\/40°F 이하[\s\S]*2시간 안에[\s\S]*품질 권장사항/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*คำแนะนำด้านคุณภาพ/
  }, "cold storage and quality preference remain distinct");
  official(dish, [urls.temperatures, urls.handling, urls.eggs]);
});

test("Gemista checks rice tenderness and follows rice-specific cooling and storage", () => {
  const dish = recipe("gemista");
  const cool = step(dish, "Add the fresh herbs");
  const finish = step(dish, "Uncover and caramelize");
  const extraWater = dish.ingredients.find((row) => row.item.en.startsWith("boiling water, only if the roasting pan dries"));
  assert.equal(extraWater?.amount, "0–60 ml");
  allLocales(cool.body, {
    en: /clean shallow tray[\s\S]*cool it quickly in a shallow container and refrigerate within 1 hour/,
    "zh-hant": /乾淨淺盤[\s\S]*淺容器中快速降溫並於 1 小時內冷藏/,
    ja: /清潔な浅いトレー[\s\S]*浅い容器で素早く冷まし、1時間以内に冷蔵/,
    ko: /깨끗하고 얕은 쟁반[\s\S]*얕은 용기에 펴서 빠르게 식히고 1시간 안에 냉장/,
    th: /ถาดตื้นสะอาด[\s\S]*ภาชนะตื้นเพื่อให้เย็นเร็วและแช่เย็นภายใน 1 ชั่วโมง/
  }, "par-cooked rice cooling is explicit if the workflow pauses");
  allLocales(finish.body, {
    en: /35–45 minutes[\s\S]*no hard or chalky centre[\s\S]*30 ml at a time[\s\S]*10-minute increments/,
    "zh-hant": /35–45 分鐘[\s\S]*沒有硬心或粉質中心[\s\S]*每次加入 30 毫升[\s\S]*10 分鐘/,
    ja: /35〜45分[\s\S]*硬い芯や粉っぽい中心[\s\S]*30mlずつ[\s\S]*10分ずつ/,
    ko: /35–45분[\s\S]*딱딱하거나 분가루 같은 심[\s\S]*30ml씩[\s\S]*10분씩/,
    th: /35–45 นาที[\s\S]*ไตแข็งหรือเป็นผง[\s\S]*ครั้งละ 30 มล\.[\s\S]*ครั้งละ 10 นาที/
  }, "test the rice and give a measured correction path");
  allLocales(dish.storage, {
    en: /within 1 hour[\s\S]*4°C\/40°F or below[\s\S]*within 24 hours[\s\S]*only once[\s\S]*three-day/,
    "zh-hant": /1 小時內[\s\S]*4°C\/40°F 以下[\s\S]*24 小時內[\s\S]*一次[\s\S]*三天/,
    ja: /1時間以内[\s\S]*4°C以下[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*3日/,
    ko: /1시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*3일/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*เพียงครั้งเดียว[\s\S]*3 วัน/
  }, "rice-specific cooling, one-day use, and one reheat replace the old general window");
  official(dish, [urls.rice, urls.handling]);
});

test("dolmades finish the rice in the centre and follow rice-specific storage", () => {
  const dish = recipe("dolmades");
  const cool = step(dish, "Cool and add the herbs");
  const simmer = step(dish, "Simmer under a plate");
  const extraWater = dish.ingredients.find((row) => row.item.en.startsWith("boiling water, only if needed to finish the rice"));
  assert.equal(extraWater?.amount, "0–60 ml");
  allLocales(cool.body, {
    en: /clean shallow tray[\s\S]*roll and cook the dolmades without an avoidable pause[\s\S]*refrigerate within 1 hour/,
    "zh-hant": /乾淨淺盤[\s\S]*捲製並烹煮葡萄葉卷，不要無故擱置[\s\S]*於 1 小時內冷藏/,
    ja: /清潔な浅いトレー[\s\S]*間を空けずに葉で巻いて煮ます[\s\S]*1時間以内に冷蔵/,
    ko: /깨끗하고 얕은 쟁반[\s\S]*불필요하게 기다리지 말고 잎에 싸서 익힙니다[\s\S]*1시간 안에 냉장/,
    th: /ถาดตื้นสะอาด[\s\S]*ห่อใบและปรุงต่อโดยไม่พักนาน[\s\S]*แช่เย็นภายใน 1 ชั่วโมง/
  }, "partially cooked rice is cooled quickly if the preparation pauses");
  allLocales(simmer.body, {
    en: /about 40 minutes[\s\S]*no chalky or hard core[\s\S]*30 ml at a time[\s\S]*5–10 minute increments/,
    "zh-hant": /約 40 分鐘[\s\S]*沒有粉質或硬心[\s\S]*每次加入 30 毫升[\s\S]*5–10 分鐘/,
    ja: /約40分[\s\S]*粉っぽい芯や硬い芯[\s\S]*30mlずつ[\s\S]*5〜10分ずつ/,
    ko: /약 40분[\s\S]*가루 같거나 단단한 심[\s\S]*30ml씩[\s\S]*5–10분 간격/,
    th: /ประมาณ 40 นาที[\s\S]*ไตแข็งหรือเป็นผง[\s\S]*ครั้งละ 30 มล\.[\s\S]*ครั้งละ 5–10 นาที/
  }, "centre-roll doneness has a measured correction path");
  allLocales(dish.storage, {
    en: /within 1 hour[\s\S]*4°C\/40°F or below[\s\S]*within 24 hours[\s\S]*only once/,
    "zh-hant": /1 小時內[\s\S]*4°C\/40°F 以下[\s\S]*24 小時內[\s\S]*一次/,
    ja: /1時間以内[\s\S]*4°C以下[\s\S]*24時間以内[\s\S]*1回だけ/,
    ko: /1시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*24시간 안에[\s\S]*한 번만/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*เพียงครั้งเดียว/
  }, "rice-specific cooling, use, and reheat limits apply");
  official(dish, [urls.rice, urls.handling]);
});
