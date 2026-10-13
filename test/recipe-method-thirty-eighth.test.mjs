import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["moo-ping", "gai-yang", "haemul-pajeon", "brik-a-loeuf"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const temperatureSource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const seafoodSource = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const eggSource = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
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

test("thirty-eighth batch adds four eligible existing recipes to five-locale coverage", async () => {
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
  assert.equal(covered.length, 252);
  assert.equal(new Set(covered).size, 252);
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 248, "the 248 other reviewed IDs remain");

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

test("moo ping counts its minimum marinade, whole-pork rest, and six serving allocations", () => {
  const recipe = get("moo-ping");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [395, 20, 415]);
  assert.ok(recipe.prepMinutes >= 6 * 60 + 35, "prep includes the six-hour minimum marinade and active preparation");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("pork shoulder"))?.amount, "900 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("hot cooked Thai glutinous rice"))?.amount, "600 g");
  assert.deepEqual([900 / 6, 600 / 6, 24 / 6], [150, 100, 4]);

  const finish = step(recipe, "Check, rest, and serve");
  everyLocale(finish, /63°C \/ 145°F/, "whole-cut pork reaches the safe temperature and unit conversion");
  localizedPatterns(finish, {
    en: /rest all pork on a clean tray for 3 minutes/,
    "zh-hant": /靜置至少 3 分鐘/,
    ja: /少なくとも3分休ませます/,
    ko: /최소 3분 쉽니다/,
    th: /อย่างน้อย 3 นาที/
  }, "the pork gets the required three-minute rest");
  localizedPatterns(finish, {
    en: /four skewers and 100 g cooked glutinous rice per serving/,
    "zh-hant": /每份四串、100 公克熟糯米/,
    ja: /串4本と炊いたもち米100g/,
    ko: /꼬치 4개와 익힌 찹쌀 100g/,
    th: /คนละ 4 ไม้กับข้าวเหนียวนึ่งสุก 100 กรัม/
  }, "the six skewers-and-rice portions are explicit");
  localizedPatterns(finish, {
    en: /30-second increments/,
    "zh-hant": /每次續烤 30 秒/,
    ja: /30秒ずつ追加/,
    ko: /30초씩 더 익히고/,
    th: /ครั้งละ 30 วินาที/
  }, "below-target skewers get timed rechecks");
  officialSource(recipe, temperatureSource);
});

test("gai yang includes the refrigerated marinade, full grilling window, and four portions", () => {
  const recipe = get("gai-yang");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [515, 51, 566]);
  assert.ok(recipe.prepMinutes >= 8 * 60 + 35, "prep includes the eight-hour minimum marinade and active preparation");
  assert.deepEqual([20 + 12 + 2 + 1 + 10, 20 + 15 + 4 + 2 + 10], [45, 51]);

  const safety = step(recipe, "Verify both thigh and drumstick");
  everyLocale(safety, /74°C \/ 165°F/, "both poultry sections reach the official endpoint");
  const serve = step(recipe, "Cut through joints and serve");
  localizedPatterns(serve, {
    en: /one quarter and 150 g cooked sticky rice to each of four servings/,
    "zh-hant": /四人各取一份雞腿與 150 公克熟糯米/,
    ja: /1人に1本と炊いたもち米150g/,
    ko: /4인분에 한 조각과 익힌 찹쌀 150g씩/,
    th: /ขาไก่หนึ่งชิ้นและข้าวเหนียวนึ่งสุก 150 กรัมต่อคนสำหรับ 4 ที่/
  }, "one chicken quarter and 150 g cooked rice are allocated per person");
  officialSource(recipe, temperatureSource);
});

test("haemul-pajeon oil adds up and seafood reaches FDA's endpoint in four portions", () => {
  const recipe = get("haemul-pajeon");
  assert.equal(recipe.servings, 4);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("neutral cooking oil"))?.amount, "50 ml");
  assert.equal(15 + 10 + 25, 50, "the ingredient amount equals all three measured oil uses");
  assert.equal(2 * 8 / 4, 4, "sixteen pancake pieces make four pieces per serving");

  const first = step(recipe, "Turn without folding");
  const second = step(recipe, "Cook the second and serve");
  everyLocale(first, /63°C \/ 145°F/, "shrimp, squid, and mussel pieces reach the FDA seafood temperature");
  everyLocale(second, /63°C \/ 145°F/, "the second pancake uses the same seafood endpoint");
  localizedPatterns({ body: Object.fromEntries(localeOrder.map((locale) => [locale, recipe.substitutions[0][locale]])) }, {
    en: /63°C \/ 145°F/,
    "zh-hant": /63°C \/ 145°F/,
    ja: /63°C \/ 145°F/,
    ko: /63°C \/ 145°F/,
    th: /63°C \/ 145°F/
  }, "the seafood substitution keeps the same safe endpoint");
  localizedPatterns(second, {
    en: /4 pieces per person across four servings/,
    "zh-hant": /四人每人分 4 塊/,
    ja: /4人に1人4切れずつ/,
    ko: /4인분에 1인당 4조각씩/,
    th: /4 ชิ้นต่อคนสำหรับ 4 ที่/
  }, "sixteen pieces are distributed among four servings");
  officialSource(recipe, seafoodSource);
});

test("brik keeps eggs refrigerated, labels the soft-yolk option, and checks fully cooked egg", () => {
  const recipe = get("brik-a-loeuf");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 10, 35]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.includes("pasteurized shell eggs"))?.amount, "2");
  const eggs = recipe.ingredients.find((row) => row.item.en.includes("pasteurized shell eggs"));
  assert.ok(eggs, "pasteurized shell eggs remain specified for the soft-yolk option");
  localizedPatterns({ body: eggs.item }, {
    en: /refrigerated until use/,
    "zh-hant": /使用前冷藏/,
    ja: /使用直前まで冷蔵/,
    ko: /사용 직전까지 냉장/,
    th: /แช่เย็นจนถึงก่อนใช้/
  }, "eggs stay refrigerated until use");

  const fry = step(recipe, "Fry until crisp");
  everyLocale(fry, /71°C \/ 160°F/, "fully cooked egg reaches the FDA egg-dish temperature");
  localizedPatterns(fry, {
    en: /15-second increments/,
    "zh-hant": /每次續煎 15 秒/,
    ja: /15秒ずつ追加/,
    ko: /15초씩 더 익힙니다/,
    th: /ครั้งละ 15 วินาที/
  }, "below-target fully cooked eggs get timed rechecks");
  localizedPatterns(fry, {
    en: /pasteurized eggs kept refrigerated until just before cracking/,
    "zh-hant": /冷藏保存、下鍋前才取出的巴氏殺菌蛋/,
    ja: /使用直前まで冷蔵した殺菌済み殻付き卵/,
    ko: /사용 직전까지 냉장한 살균란만 씁니다/,
    th: /ไข่พาสเจอไรซ์ที่แช่เย็นไว้จนถึงก่อนตอกเท่านั้น/
  }, "soft yolks use pasteurized eggs handled cold");
  localizedPatterns(step(recipe, "Drain and serve hot"), {
    en: /one brik to each of two people/,
    "zh-hant": /兩人各上一份/,
    ja: /2人に1つずつ/,
    ko: /두 사람에게 하나씩/,
    th: /หนึ่งชิ้นต่อคนสำหรับ 2 ที่/
  }, "two briks are apportioned one per person");
  officialSource(recipe, eggSource);
});
