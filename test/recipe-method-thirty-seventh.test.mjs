import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["fabada-asturiana", "peameal-bacon-sandwich", "dan-bing", "kartoffelpuffer"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const porkSafety = "https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: existing recipe remains in the registry`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: step exists: ${title}`);
  return found;
}

function everyLocale(instruction, pattern, message) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], pattern, `${locale}: ${message}`);
}

function localizedPatterns(instruction, patterns, message) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${message}`);
}

function officialSource(recipe, url) {
  assert.ok(recipe.sources.some((entry) => entry.url === url && entry.title.startsWith("Official food-safety guidance")),
    `${recipe.id}: official safety source is labelled separately from dish references`);
}

test("thirty-seventh batch adds four eligible existing recipes to five-locale coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared route regression list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 236);
  assert.equal(new Set(covered).size, 236);
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 232, "the 232 other reviewed IDs remain");

  for (const id of ids) {
    const recipe = get(id);
    assert.ok(!excludedIds.includes(id), `${id}: not on the standing exclusion list`);
    assert.ok(covered.includes(id), `${id}: included in shared route coverage`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: method is localized`);
    }
  }
});

test("fabada timing includes the long simmer, finish and full rest, with pork checks", () => {
  const recipe = get("fabada-asturiana");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [500, 190, 690]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("dried Asturian fabes"))?.amount, "400 g");

  const start = step(recipe, "Bring the beans up slowly and skim");
  const pork = step(recipe, "Slow-cook with lacón and pancetta");
  const sausage = step(recipe, "Add saffron, chorizo and morcilla");
  const rest = step(recipe, "Rest, slice the compango and serve");
  everyLocale(pork, /71°C/, "the cured pork reaches the checked centre temperature");
  localizedPatterns(pork, {
    en: /10-minute increments/,
    "zh-hant": /續煮 10 分鐘/,
    ja: /10分ずつ煮足し/,
    ko: /10분씩 더 끓/,
    th: /ครั้งละ 10 นาที/
  }, "underdone or firm pork gets timed rechecks");
  everyLocale(sausage, /71°C/, "raw sausage has a safe centre target");
  localizedPatterns(sausage, {
    en: /package reheating directions/,
    "zh-hant": /包裝回熱說明/,
    ja: /包装の再加熱指示/,
    ko: /포장지의 재가열 안내/,
    th: /คำแนะนำอุ่นซ้ำบนบรรจุภัณฑ์/
  }, "fully cooked sausage follows its package reheating directions");
  everyLocale(rest, /30/, "the rest is included in the displayed cook estimate");
  everyLocale(rest, /four bowls|四碗|4つの器|네 그릇|4 ชาม/, "the four servings are portioned evenly");
  assert.match(start.body.en, /20 minutes/);
  assert.deepEqual([20 + 105 + 25 + 5 + 30, 20 + 105 + 30 + 10 + 30], [185, 195]);
  assert.ok(recipe.cookMinutes >= 185 && recipe.cookMinutes <= 195, "cook estimate covers the explicit 185–195 minute stages");
  officialSource(recipe, porkSafety);
});

test("peameal bacon portions are explicit and each pork slice reaches 71°C", () => {
  const recipe = get("peameal-bacon-sandwich");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [15, 15, 30]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("peameal bacon loin"))?.amount, "600 g");
  const bacon = step(recipe, "Griddle the peameal bacon");
  everyLocale(bacon, /71°C/, "every pork slice reaches Health Canada's safe temperature");
  everyLocale(bacon, /160°F/, "the Fahrenheit conversion is localized");
  localizedPatterns(bacon, {
    en: /30-second increments/,
    "zh-hant": /續煎 30 秒/,
    ja: /30秒ずつ追加加熱/,
    ko: /30초씩 더 익히/,
    th: /ครั้งละ 30 วินาที/
  }, "below-target slices get timed rechecks");
  everyLocale(bacon, /four slices|四片|4枚|네 장|4 ชิ้น/, "four equal sandwich portions are explicit");
  everyLocale(step(recipe, "Season and rest briefly"), /3 minutes|3 分鐘|3分|3분|3 นาที/, "the three-minute meat rest is explicit");
  officialSource(recipe, porkSafety);
});

test("dan bing allocates its oil exactly and checks each egg crepe before rolling", () => {
  const recipe = get("dan-bing");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [15, 20, 35]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "large eggs")?.amount, "8");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil"))?.amount, "28 ml");
  assert.equal(4 * 4 + 4 * 3, 28, "four crepes use all 28 ml of measured oil");
  const egg = step(recipe, "Set the scallion egg");
  everyLocale(egg, /two eggs|兩顆蛋|卵2個|달걀 두 개|ไข่ 2 ฟอง/, "each of four servings gets two eggs");
  const finish = step(recipe, "Bond crepe to egg");
  everyLocale(finish, /71°C/, "the egg layer reaches the safe egg-dish temperature");
  everyLocale(finish, /160°F/, "the Fahrenheit conversion is localized");
  localizedPatterns(finish, {
    en: /15 seconds/,
    "zh-hant": /15 秒/,
    ja: /15秒ずつ/,
    ko: /15초씩/,
    th: /ครั้งละ 15 วินาที/
  }, "below-target egg gets timed rechecks");
  everyLocale(step(recipe, "Slice and repeat"), /six pieces|六段|6切れ|여섯 조각|6 ชิ้น/, "each serving is divided into six pieces");
  officialSource(recipe, eggSafety);
});

test("Kartoffelpuffer are portioned as twelve pancakes and egg binder reaches 71°C", () => {
  const recipe = get("kartoffelpuffer");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 30, 55]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("waxy or all-purpose potatoes"))?.amount, "1 kg");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "large eggs")?.amount, "2");
  const fry = step(recipe, "Fry until lacy and crisp");
  localizedPatterns(fry, {
    en: /12 pancakes/,
    "zh-hant": /12 片/,
    ja: /合計12枚/,
    ko: /총 12장/,
    th: /รวม 12 แผ่น/
  }, "the batch yield is explicit");
  localizedPatterns(fry, {
    en: /from the side into the centre/,
    "zh-hant": /從側邊插入中心/,
    ja: /側面から中心へ/,
    ko: /옆면에서 중심까지/,
    th: /จากด้านข้างถึงกลางแผ่น/
  }, "the thermometer reaches the centre without touching the skillet");
  everyLocale(fry, /71°C/, "the egg binder reaches the safe egg-dish temperature");
  everyLocale(fry, /160°F/, "the Fahrenheit conversion is localized");
  localizedPatterns(fry, {
    en: /30-second increments/,
    "zh-hant": /續煎 30 秒/,
    ja: /30秒ずつ焼き足し/,
    ko: /30초씩 더 익혀/,
    th: /ครั้งละ 30 วินาที/
  }, "below-target centres get timed rechecks");
  localizedPatterns(fry, {
    en: /3 per serving/,
    "zh-hant": /每人 3 片/,
    ja: /1人3枚/,
    ko: /1인당 3장/,
    th: /คนละ 3 แผ่น/
  }, "three pancakes make each serving");
  officialSource(recipe, eggSafety);
});
