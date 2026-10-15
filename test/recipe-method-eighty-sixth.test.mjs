import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["creme-brulee", "gulab-jamun", "koshari", "mango-sticky-rice"];
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggs = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";
const published = new Map(recipes.map((dish) => [dish.id, dish]));
const drafts = new Map(allRecipeDrafts.map((dish) => [dish.id, dish]));

function parseIds(source, declaration) {
  const body = source.match(declaration)?.[1];
  assert.ok(body, "coverage declaration exists");
  return [...body.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
}

function dish(id) {
  const found = published.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function assertSources(recipe, expectedSafetyUrls) {
  for (const url of expectedSafetyUrls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: ${url} is labeled as official safety guidance`);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${recipe.id}: culinary sources remain distinct from safety references`);
}

test("eighty-sixth batch reimplements four excluded methods and preserves source facts", async () => {
  const historySource = await readFile(new URL("./recipe-method-eighty-fifth.test.mjs", import.meta.url), "utf8");
  const previousBatch = parseIds(historySource, /const ids = \[([\s\S]*?)\];/);
  const auditSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const historicReviewed = parseIds(auditSource, /const auditedIds = \[([\s\S]*?)\n\];/);
  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const historicExcluded = parseIds(exclusionSource, /const excludedIds = \[([\s\S]*?)\n\];/);
  const historicSnapshot = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261013.json", import.meta.url), "utf8"));
  const snapshot = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261014.json", import.meta.url), "utf8"));
  const cumulativeIds = [...previousBatch, ...ids];
  const reviewed = [...historicReviewed, ...cumulativeIds];
  const excluded = historicExcluded.filter((id) => !cumulativeIds.includes(id));

  assert.deepEqual(historicSnapshot.counts, { registry: 353, reviewed: 335, excluded: 18, unclassified: 0 },
    "the immutable 2026-10-13 historical record stays unchanged");
  assert.equal(new Set(historicReviewed).size, 335);
  assert.equal(historicExcluded.length, 18);
  assert.ok(ids.every((id) => historicExcluded.includes(id) && !historicReviewed.includes(id)), "all four began in the excluded set");
  assert.equal(recipes.length, 353);
  assert.equal(reviewed.length, 343);
  assert.equal(new Set(reviewed).size, 343);
  assert.equal(excluded.length, 10);
  assert.equal(new Set(excluded).size, 10);
  assert.equal(new Set([...reviewed, ...excluded]).size, 353);
  assert.deepEqual([...reviewed].sort(), snapshot.reviewedIds);
  assert.deepEqual([...excluded].sort(), snapshot.excludedIds);
  assert.deepEqual([...cumulativeIds].sort(), snapshot.reimplementedIds);
  assert.deepEqual(snapshot.counts, { registry: 353, reviewed: 343, reimplemented: 8, excluded: 10, unclassified: 0 });

  for (const id of ids) {
    const current = dish(id);
    const source = drafts.get(id);
    assert.ok(source, `${id}: original source draft exists`);
    assert.notDeepEqual(current.instructions, source.instructions, `${id}: published method is fully rewritten`);
    assert.notDeepEqual(current.sources, source.sources, `${id}: separate official safety references are added`);
    if (id === "koshari") {
      assert.deepEqual(current.ingredients.slice(0, source.ingredients.length), source.ingredients,
        "koshari source ingredient rows and quantities stay intact");
      assert.equal(current.ingredients.length, source.ingredients.length + 3, "measured water for lentils, rice, and chickpeas is listed");
      assert.deepEqual(current.ingredients.slice(source.ingredients.length), [
        { amount: "1.2 L", item: { en: "water for boiling the lentils", "zh-hant": "煮扁豆用水", ja: "レンズ豆をゆでる水", ko: "렌틸을 삶는 물", th: "น้ำสำหรับต้มเลนทิล" } },
        { amount: "400–430 ml", item: { en: "boiling water for cooking the rice", "zh-hant": "煮米用滾水", ja: "米を炊くための熱湯", ko: "쌀을 짓는 끓는 물", th: "น้ำเดือดสำหรับหุงข้าว" } },
        { amount: "30 ml", item: { en: "water for warming the chickpeas", "zh-hant": "加熱鷹嘴豆用水", ja: "ひよこ豆を温める水", ko: "병아리콩을 데우는 물", th: "น้ำสำหรับอุ่นถั่วลูกไก่" } }
      ]);
    } else {
      assert.deepEqual(current.ingredients, source.ingredients, `${id}: ingredient rows and quantities are preserved`);
    }
    assert.equal(current.servings, source.servings, `${id}: servings stay unchanged`);
    assert.equal(current.instructions.length, source.instructions.length, `${id}: original number of steps stays unchanged`);
    assert.deepEqual(current.instructions.map((step) => step.imageScene), source.instructions.map((step) => step.imageScene),
      `${id}: illustration stages stay aligned`);
    assert.equal(current.totalMinutes, current.prepMinutes + current.cookMinutes, `${id}: timing adds up`);
    assert.ok(current.tips.length >= 2 && current.commonMistakes.length >= 2, `${id}: practical tips and recovery guidance exist`);
    for (const locale of localeOrder) {
      assert.ok(current.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: steps are localized`);
      assert.ok(current.tips.every((tip) => tip[locale]) && current.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: tips and recovery guidance are localized`);
      assert.ok(current.storage[locale], `${id}/${locale}: storage guidance is localized`);
    }
  }

  assert.deepEqual([dish("creme-brulee").prepMinutes, dish("creme-brulee").cookMinutes, dish("creme-brulee").totalMinutes], [260, 80, 340]);
  assert.deepEqual([dish("gulab-jamun").prepMinutes, dish("gulab-jamun").cookMinutes, dish("gulab-jamun").totalMinutes], [155, 35, 190]);
  assert.deepEqual([dish("koshari").prepMinutes, dish("koshari").cookMinutes, dish("koshari").totalMinutes], [30, 65, 95]);
  assert.deepEqual([dish("mango-sticky-rice").prepMinutes, dish("mango-sticky-rice").cookMinutes, dish("mango-sticky-rice").totalMinutes], [755, 85, 840]);

  const expectedSources = {
    "creme-brulee": [eggs, temperatures, handling],
    "gulab-jamun": [rawFlour, temperatures, handling],
    koshari: [riceSafety, handling],
    "mango-sticky-rice": [riceSafety, handling]
  };
  const localizedSafety = {
    "creme-brulee": /71°C/,
    "gulab-jamun": /60°C/,
    koshari: /24 hours|24 小時|24時間|24시간|24 ชั่วโมง/,
    "mango-sticky-rice": /24 hours|24 小時|24時間|24시간|24 ชั่วโมง/
  };
  for (const id of ids) {
    const current = dish(id);
    assertSources(current, expectedSources[id]);
    for (const locale of localeOrder) {
      const content = [...current.instructions.map((step) => step.body[locale]), current.storage[locale]].join(" ");
      assert.match(content, localizedSafety[id], `${id}/${locale}: method or storage includes its recipe-specific safety control`);
    }
  }
  for (const locale of localeOrder) {
    assert.match(dish("gulab-jamun").storage[locale], /74°C/, `${locale}: gulab jamun leftovers reheat to 74°C`);
    for (const id of ["koshari", "mango-sticky-rice"]) {
      const storage = dish(id).storage[locale];
      assert.match(storage, /1 hour|1 小時|1時間|1시간|1 ชั่วโมง/, `${id}/${locale}: rice cools ideally within one hour`);
      assert.match(storage, /once|一度|一次|한 번|ครั้งเดียว/, `${id}/${locale}: rice is reheated only once`);
    }
  }
});
