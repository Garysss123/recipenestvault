import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["quindim", "butter-tarts", "pastitsio", "danzai-noodles"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const sproutSafety = "https://www.fda.gov/food/people-risk-foodborne-illness/fruits-veggies-and-juices-food-safety-moms-be";
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

function localePatterns(instruction, patterns, message) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${message}`);
}

function source(recipe, url) {
  assert.ok(recipe.sources.some((entry) => entry.url === url && entry.title.startsWith("Official food-safety guidance")),
    `${recipe.id}: official safety guidance is labelled separately`);
}

function minuteRange(bodies) {
  return bodies.reduce(([minimum, maximum], body) => {
    const minutes = [...body.matchAll(/\b(\d+)(?:[–-](\d+))?\s*minutes?\b/g)];
    const seconds = [...body.matchAll(/\b(\d+)(?:[–-](\d+))?\s*seconds?\b/g)];
    const [minuteLow, minuteHigh] = minutes.reduce(([low, high], [, start, end]) => [low + Number(start), high + Number(end ?? start)], [0, 0]);
    const [secondLow, secondHigh] = seconds.reduce(([low, high], [, start, end]) => [low + Number(start), high + Number(end ?? start)], [0, 0]);
    return [minimum + minuteLow + secondLow / 60, maximum + minuteHigh + secondHigh / 60];
  }, [0, 0]).map((value) => Number(value.toFixed(2)));
}

test("thirty-sixth batch adds four existing recipes to five-locale regression without changing exclusions", async () => {
  const sourceText = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = sourceText.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared route regression list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353, "the published registry remains at 353 recipes");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353, "all recipe IDs remain unique");
  assert.equal(excludedIds.length, 18, "all standing exclusions remain explicit");
  assert.equal(new Set(excludedIds).size, 18, "the exclusion list stays unique");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 168, "shared regression covers 168 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 168, "shared route IDs stay unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 164, "the previous 164 reviewed IDs remain");

  for (const id of ids) {
    const recipe = get(id);
    assert.ok(!excludedIds.includes(id), `${id}: not on the standing exclusion list`);
    assert.ok(covered.includes(id), `${id}: enters shared route coverage`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: localized ingredients exist`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: localized method exists`);
    }
  }
});

test("quindim measures a real bain-marie, includes long rests, and checks the egg custard", () => {
  const recipe = get("quindim");
  assert.equal(recipe.servings, 12);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [740, 260, 1000]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("hot water for the bain-marie"))?.amount, "1.5 L");
  const batter = step(recipe, "Combine the custard");
  localePatterns(batter, {
    en: /12 hours/,
    "zh-hant": /12 小時/,
    ja: /12時間/,
    ko: /12시간/,
    th: /12 ชั่วโมง/
  }, "the overnight coconut settling time is explicit in every locale");
  const bake = step(recipe, "Bake in a water bath");
  everyLocale(bake, /71°C/, "the egg custard reaches the safe egg-dish temperature");
  everyLocale(bake, /160°F/, "the Fahrenheit conversion appears in each locale");
  localePatterns(bake, {
    en: /1\.5 L[\s\S]*halfway up[\s\S]*3-minute increments/,
    "zh-hant": /1\.5 公升[\s\S]*高度一半[\s\S]*每次續烤 3 分鐘後重測/,
    ja: /1\.5L[\s\S]*半分まで[\s\S]*3分ずつ焼き足して再測定/,
    ko: /1\.5L[\s\S]*절반까지[\s\S]*3분씩 더 굽고 다시 측정/,
    th: /1\.5 ลิตร[\s\S]*ครึ่งหนึ่ง[\s\S]*ครั้งละ 3 นาทีแล้ววัดซ้ำ/
  }, "water-bath depth and timed rechecks are explicit across locales");
  const chill = step(recipe, "Cool, chill and unmould");
  localePatterns(chill, {
    en: /30 minutes[\s\S]*0–4°C for 3 hours/,
    "zh-hant": /冷卻 30 分鐘[\s\S]*0–4°C 冷藏 3 小時/,
    ja: /30分[\s\S]*0〜4°Cで3時間/,
    ko: /30분[\s\S]*0–4°C에서 3시간/,
    th: /30 นาที[\s\S]*0–4°C นาน 3 ชั่วโมง/
  }, "cooling and refrigeration time are explicit in each locale");
  assert.ok(recipe.cookMinutes >= 45 + 30 + 180, "cook time includes the maximum bake, cooling and three-hour chill");
  source(recipe, foodSafety);
  source(recipe, eggSafety);
});

test("Ontario butter tarts retain a soft centre only after the egg filling reaches 71°C", () => {
  const recipe = get("butter-tarts");
  assert.equal(recipe.servings, 12);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [55, 47, 102]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "large eggs")?.amount, "2");
  const bake = step(recipe, "Bake to a safe, soft centre");
  everyLocale(bake, /71°C/, "the egg filling reaches the safe egg-dish temperature");
  everyLocale(bake, /160°F/, "the Fahrenheit conversion appears in each locale");
  localePatterns(bake, {
    en: /1 minute longer and recheck/,
    "zh-hant": /再烤 1 分鐘後重測/,
    ja: /1分ずつ焼き足して再測定/,
    ko: /1분씩 더 굽고 다시 측정/,
    th: /ครั้งละ 1 นาทีแล้ววัดซ้ำ/
  }, "below-target centres get a timed recheck in every locale");
  const rest = step(recipe, "Release and cool");
  everyLocale(rest, /30/, "the thirty-minute cooling period stays explicit");
  assert.equal(15 + 2 + 30, recipe.cookMinutes, "cook time covers the maximum bake, in-tin rest and cooling");
  source(recipe, foodSafety);
  source(recipe, eggSafety);
});

test("pastitsio timing covers its sauce, pasta, béchamel, bake and rest and checks casserole temperature", () => {
  const recipe = get("pastitsio");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [40, 146, 186]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "ground beef")?.amount, "750 g");
  const pasta = step(recipe, "Cook the pasta just short of done");
  localePatterns(pasta, {
    en: /8–10 minutes/,
    "zh-hant": /8–10 分鐘/,
    ja: /8〜10分/,
    ko: /8–10분/,
    th: /8–10 นาที/
  }, "the pasta has a practical time window in every locale");
  const bake = step(recipe, "Bake to a safe, deeply golden centre");
  everyLocale(bake, /74°C/, "the meat-and-egg casserole reaches the official casserole temperature");
  everyLocale(bake, /165°F/, "the Fahrenheit conversion appears in each locale");
  localePatterns(bake, {
    en: /5-minute increments/,
    "zh-hant": /每次續烤 5 分鐘後重測/,
    ja: /5分ずつ焼き足して再測定/,
    ko: /5분씩 더 굽고 다시 측정/,
    th: /ครั้งละ 5 นาทีแล้ววัดซ้ำ/
  }, "a below-target centre gets a timed recheck in every locale");
  const rest = step(recipe, "Cool for clean slices");
  everyLocale(rest, /30/, "the thirty-minute rest is retained");
  assert.equal(7 + 12 + 20 + 10 + 5 + 2 + 15 + 45 + 30, recipe.cookMinutes,
    "the upper estimate includes sequential timed cooking, the bake and rest");
  localePatterns(rest, {
    en: /8 pieces/,
    "zh-hant": /8 塊/,
    ja: /8切れ/,
    ko: /8조각/,
    th: /8 ชิ้น/
  }, "the casserole is divided into eight portions in every locale");
  source(recipe, foodSafety);
});

test("Danzai noodles time the complete method, check ground pork, and thoroughly cook sprouts", () => {
  const recipe = get("danzai-noodles");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [35, 110, 145]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "coarsely minced pork shoulder")?.amount, "350 g");
  const stock = step(recipe, "Simmer shrimp-pork stock");
  const brown = step(recipe, "Brown the minced pork");
  const braise = step(recipe, "Braise pork to a safe temperature");
  const seafood = step(recipe, "Cook shrimp and sprouts thoroughly");
  const noodles = step(recipe, "Cook and portion noodles");
  everyLocale(braise, /71°C/, "ground pork reaches the official temperature");
  everyLocale(braise, /160°F/, "the Fahrenheit conversion appears in each locale");
  localePatterns(braise, {
    en: /3-minute increments/,
    "zh-hant": /每次續煮 3 分鐘後重測/,
    ja: /3分ずつ煮足して再測定/,
    ko: /3분씩 더 끓이고 다시 측정/,
    th: /ครั้งละ 3 นาทีแล้ววัดซ้ำ/
  }, "a below-target pork clump gets a timed recheck");
  everyLocale(seafood, /63°C/, "shrimp are checked to the seafood endpoint");
  localePatterns(seafood, {
    en: /bean sprouts and simmer for 2 minutes[\s\S]*hot throughout/,
    "zh-hant": /豆芽[\s\S]*2 分鐘[\s\S]*熱透/,
    ja: /もやし[\s\S]*2分[\s\S]*全体を熱く/,
    ko: /숙주[\s\S]*2분간[\s\S]*전체가 뜨거워지면/,
    th: /ถั่วงอก[\s\S]*2 นาที[\s\S]*ร้อนทั่ว/
  }, "sprouts are cooked thoroughly rather than briefly blanched");
  const timedStages = [stock.body.en, brown.body.en, braise.body.en.replace(/ If below target,[\s\S]*?recheck\./i, ""), seafood.body.en, noodles.body.en];
  assert.deepEqual(minuteRange(timedStages), [100.5, 109], "the cooking estimate sums broth, pork, shrimp, thorough sprout cooking and noodles");
  assert.ok(recipe.cookMinutes >= 109, "cook time covers the high end of the listed stages");
  assert.match(step(recipe, "Finish each small bowl").body.en, /180 ml hot stock[\s\S]*45 g pork sauce/);
  source(recipe, foodSafety);
  source(recipe, sproutSafety);
});
