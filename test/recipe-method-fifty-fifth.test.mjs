import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["three-cup-chicken", "chiayi-turkey-rice", "banh-xeo", "pollo-alla-cacciatora"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely",
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: recipe exists`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} step exists`);
  return found;
}

function everyLocale(localized, pattern, label) {
  for (const locale of localeOrder) assert.match(localized[locale], pattern[locale], `${locale}: ${label}`);
}

function official(recipe, expectedUrls) {
  for (const url of expectedUrls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: applicable official guidance is credited separately: ${url}`);
  }
}

function summedExplicitMinutes(bodies) {
  return bodies.flatMap((body) => [...body.matchAll(/\b(\d+)(?:[–-](\d+))?\s*minutes?\b/g)])
    .reduce(([minimum, maximum], [, low, high]) => [minimum + Number(low), maximum + Number(high ?? low)], [0, 0]);
}

test("fifty-fifth batch adds four unreviewed, non-excluded IDs to the shared five-locale ledger", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusions = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusions, "standing 18-slug exclusion list exists");
  const excludedIds = [...exclusions.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 284);
  assert.equal(new Set(covered).size, 284);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.deepEqual(covered.slice(-68, -64), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.ok(ids.every((id) => !covered.slice(0, -68).includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 51);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft remains present`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient details are localized`);
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: full method is localized`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: storage card is localized`);
    }
    assert.notDeepEqual(recipe.ingredients, draft.ingredients, `${id}: published ingredient refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: published method refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: published storage refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: official sources do not mutate the draft`);
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: two dish references remain separate from official guidance`);
  }
});

test("Three cup chicken separates timing from the 74°C poultry endpoint and allocates its sauce", () => {
  const recipe = get("three-cup-chicken");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [20, 45, 65, 4]);
  const chicken = step(recipe, "Braise to the poultry safety endpoint");
  everyLocale(chicken.body, {
    en: /15–20 minutes[\s\S]*74°C \(165°F\)[\s\S]*2-minute increments[\s\S]*not the safety test/,
    "zh-hant": /15–20 分鐘[\s\S]*74°C（165°F）[\s\S]*每次續煮 2 分鐘[\s\S]*安全檢查應以溫度計為準/,
    ja: /15〜20分[\s\S]*74°C（165°F）[\s\S]*2分ずつ[\s\S]*安全確認は温度/,
    ko: /15–20분[\s\S]*74°C \(165°F\)[\s\S]*2분씩[\s\S]*안전 확인은 온도계/,
    th: /15–20 นาที[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 2 นาที[\s\S]*ไม่ใช่การตรวจความปลอดภัย/
  }, "time estimate and poultry safety endpoint are distinct");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "all locales match the official cooked poultry storage card");
  assert.match(step(recipe, "Brown the chicken in uncrowded batches").body.en, /two batches[\s\S]*4–5 minutes each/);
  assert.match(step(recipe, "Reduce the glaze and finish with basil").body.en, /all 40 g basil[\s\S]*divide all chicken and sauce among four servings/);
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("Chiayi turkey rice fully assigns stock and shallot oil and uses rice-specific storage", () => {
  const recipe = get("chiayi-turkey-rice");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [25, 75, 100, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("strained turkey stock"))?.amount, "280 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil"))?.amount, "80 ml");
  assert.match(step(recipe, "Reduce the measured gravy").body.en,
    /all 250 ml reserved stock[\s\S]*15 ml of the 45 ml shallot oil[\s\S]*45 ml gravy per bowl[\s\S]*24 ml[\s\S]*6 ml over each/);
  assert.match(step(recipe, "Assemble four bowls and serve fresh rice").body.en,
    /800 g hot cooked rice[\s\S]*200 g each[\s\S]*all 80 g pickled radish/);
  everyLocale(recipe.storage, {
    en: /within 1 hour[\s\S]*4°C \(40°F\)[\s\S]*within 24 hours[\s\S]*only once[\s\S]*steaming hot[\s\S]*74°C \(165°F\)/,
    "zh-hant": /1 小時內[\s\S]*4°C（40°F）[\s\S]*24 小時內[\s\S]*只回熱一次[\s\S]*冒熱氣[\s\S]*74°C（165°F）/,
    ja: /1時間以内[\s\S]*4°C（40°F）[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*湯気[\s\S]*74°C（165°F）/,
    ko: /1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*24시간 안에[\s\S]*김[\s\S]*한 번만[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 1 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*ไอ[\s\S]*74°C \(165°F\)/
  }, "rice-specific cooling, storage, and single-reheat guidance is consistent in all locales");
  assert.ok(recipe.sources.some((source) => source.url === "https://www.seriouseats.com/taiwan-eats-turkey-rice-with-or-without-leftovers-recipe"));
  official(recipe, [urls.temperatures, urls.handling, urls.storage, urls.rice]);
});

test("Bánh xèo applies whole-cut pork guidance and shrimp appearance cues separately", () => {
  const recipe = get("banh-xeo");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [40, 55, 95, 4]);
  const pork = step(recipe, "Cook the pork and let it rest");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("pork shoulder"))?.item.en ?? "", /2.5 cm thick steaks/);
  everyLocale(pork.body, {
    en: /63°C \(145°F\)[\s\S]*3-minute rest[\s\S]*not the safety test/,
    "zh-hant": /63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*不是安全檢查/,
    ja: /63°C（145°F）[\s\S]*3分休ませます[\s\S]*時間や色は品質の目安で、安全確認ではありません/,
    ko: /63°C \(145°F\)[\s\S]*깨끗한 접시에서 3분 쉰다[\s\S]*팬 시간과 색은 식감 기준이지 안전 검사가 아니다/,
    th: /63°C \(145°F\)[\s\S]*พักบนจานสะอาด 3 นาที[\s\S]*เวลาในกระทะและสีเป็นสัญญาณด้านคุณภาพ ไม่ใช่การตรวจความปลอดภัย/
  }, "unground pork follows the whole-cut safe endpoint and rest");
  const shrimp = step(recipe, "Cook the shrimp by its shellfish cue");
  assert.match(shrimp.body.en, /pearly white and opaque throughout/);
  assert.doesNotMatch(shrimp.body.en, /63°C|145°F|71°C|160°F/);
  assert.match(shrimp.body.en, /FoodSafety.gov gives shrimp this visual endpoint rather than a numeric temperature/);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("water:"))?.amount, "450 ml");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("fish sauce:"))?.item.en ?? "", /10 ml pork, 40 ml dip/);
  assert.equal(recipe.instructions.length, 8, "the step sequence continues to match the eight existing cooking illustrations");
  assert.match(step(recipe, "Repeat all four crêpes and serve crisp").body.en, /10 ml oil[\s\S]*for each crêpe[\s\S]*four crêpes total[\s\S]*32–40 minutes/);
  everyLocale(recipe.storage, {
    en: /2-day window here is for best texture, not an official safety cutoff[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 天內食用是為了口感，不是官方安全期限[\s\S]*74°C（165°F）/,
    ja: /2日以内は食感の目安で、公式の安全期限ではありません[\s\S]*74°C（165°F）/,
    ko: /2일 권장은 식감 기준이지 공식 안전 기한이 아니다[\s\S]*74°C \(165°F\)/,
    th: /2 วันในสูตรนี้มีไว้เพื่อเนื้อสัมผัส ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ[\s\S]*74°C \(165°F\)/
  }, "shorter quality preference is explicitly separate from safety guidance");
  everyLocale(recipe.storage, {
    en: /Refrigerate cooked crêpes and leftover pork and shrimp filling[\s\S]*within 2 hours[\s\S]*4°C \(40°F\)/,
    "zh-hant": /熟薄餅及剩下的豬肉蝦餡[\s\S]*2 小時內[\s\S]*4°C（40°F）/,
    ja: /焼いたクレープと豚肉・えびの残り[\s\S]*2時間以内[\s\S]*4°C（40°F）/,
    ko: /익힌 전병과 남은 돼지고기·새우 속재료[\s\S]*2시간 안에[\s\S]*4°C \(40°F\)/,
    th: /แช่แผ่นแป้งสุกและไส้หมูกุ้งที่เหลือ[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)/
  }, "all cooked leftovers, including the crêpes, receive the same prompt chilling guidance");
  everyLocale(recipe.storage, {
    en: /FoodSafety.gov does not list a storage duration for cooked shrimp or crêpes/,
    "zh-hant": /FoodSafety.gov 未列熟蝦或熟薄餅的冷藏期限/,
    ja: /FoodSafety.govは調理済みえびやクレープの保存期間を示していません/,
    ko: /FoodSafety.gov는 익힌 새우나 전병의 보관 기간을 제시하지 않는다/,
    th: /FoodSafety.gov ไม่ระบุระยะเวลาเก็บกุ้งหรือแผ่นแป้งที่ปรุงสุก/
  }, "the official storage-duration gap is transparent in every locale");
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("Pollo alla cacciatora cook estimate covers its staged braise and checks every thigh safely", () => {
  const recipe = get("pollo-alla-cacciatora");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [20, 65, 85, 4]);
  const timedStages = recipe.instructions.map((entry) => entry.body.en);
  const [cookLow, cookHigh] = summedExplicitMinutes(timedStages);
  assert.ok(recipe.cookMinutes >= cookLow && recipe.cookMinutes <= cookHigh,
    `cook time ${recipe.cookMinutes} covers staged cooking estimate (${cookLow}–${cookHigh} min)`);
  everyLocale(step(recipe, "Braise gently").body, {
    en: /25–30 minutes[\s\S]*74°C \(165°F\)[\s\S]*5-minute increments[\s\S]*safety endpoint/,
    "zh-hant": /25–30 分鐘[\s\S]*74°C（165°F）[\s\S]*每次續煮 5 分鐘[\s\S]*禽肉食安熟度/,
    ja: /25〜30分[\s\S]*74°C（165°F）[\s\S]*5分ずつ[\s\S]*安全基準/,
    ko: /25–30분[\s\S]*74°C \(165°F\)[\s\S]*5분씩[\s\S]*안전 기준/,
    th: /25–30 นาที[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 5 นาที[\s\S]*เกณฑ์ความปลอดภัย/
  }, "all poultry cuts use the applicable official endpoint");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "storage card matches the general cooked poultry guidance");
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});
