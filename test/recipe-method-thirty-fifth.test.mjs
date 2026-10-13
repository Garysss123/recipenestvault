import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["taiwanese-oil-rice", "lablabi", "clafoutis", "beef-stifado"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
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

function localePatterns(instruction, patterns, message) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${message}`);
}

function source(recipe, url) {
  assert.ok(recipe.sources.some((entry) => entry.url === url && entry.title.startsWith("Official food-safety guidance")),
    `${recipe.id}: official safety guidance is labelled separately`);
}

function minuteRange(bodies) {
  const totals = bodies.reduce(([minimum, maximum], body) => {
    const minutes = [...body.matchAll(/\b(\d+)(?:[–-](\d+))?\s*minutes?\b/g)];
    const seconds = [...body.matchAll(/\b(\d+)(?:[–-](\d+))?\s*seconds?\b/g)];
    const [minuteLow, minuteHigh] = minutes.reduce(([low, high], [, start, end]) => [low + Number(start), high + Number(end ?? start)], [0, 0]);
    const [secondLow, secondHigh] = seconds.reduce(([low, high], [, start, end]) => [low + Number(start), high + Number(end ?? start)], [0, 0]);
    return [minimum + minuteLow + secondLow / 60, maximum + minuteHigh + secondHigh / 60];
  }, [0, 0]);
  return totals.map((value) => Number(value.toFixed(2)));
}

test("thirty-fifth batch adds four existing eligible recipes and preserves current route coverage", async () => {
  const sourceText = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = sourceText.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared route regression list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353, "recipe registry remains unchanged");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353, "all recipe IDs remain unique");
  assert.equal(excludedIds.length, 18, "all standing exclusions remain explicit");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 244, "shared five-locale route coverage includes this batch");
  assert.equal(new Set(covered).size, 244, "shared route IDs stay unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 240, "the 240 other reviewed IDs remain");
  for (const id of ids) {
    const recipe = get(id);
    assert.ok(!excludedIds.includes(id), `${id}: not on the standing exclusion list`);
    assert.ok(covered.includes(id), `${id}: added to shared route coverage`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: localized ingredients`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: localized instructions`);
    }
  }
});

test("Taiwanese oil rice covers all listed stages and checks pork safely", () => {
  const recipe = get("taiwanese-oil-rice");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [390, 85, 475]);
  const pork = recipe.ingredients.find((row) => row.item.en.startsWith("pork belly"));
  const shallots = recipe.ingredients.find((row) => row.item.en === "fried shallots");
  assert.equal(pork?.amount, "300 g");
  assert.equal(shallots?.amount, "60 g");
  everyLocale(step(recipe, "Fry the aromatic ingredients"), /half|一半|半量|절반|ครึ่งหนึ่ง/i, "first half of shallots is used in the aromatics");
  everyLocale(step(recipe, "Final steam and rest"), /remaining|剩餘|残り|남은|ที่เหลือ/i, "the rest of the shallots are used at the end");
  localePatterns(step(recipe, "Final steam and rest"), {
    en: /eight bowls/,
    "zh-hant": /八碗/,
    ja: /8人分/,
    ko: /8인분/,
    th: /8 ที่/
  }, "the finished rice is portioned for eight servings");

  const finalStage = step(recipe, "Final steam and rest").body.en.replace("If low, steam 2 minutes more and recheck. ", "");
  const nominalCook = minuteRange([...recipe.instructions.slice(1, 6).map((entry) => entry.body.en), finalStage]);
  assert.deepEqual(nominalCook, [77.5, 89.5], "the timed steam, browning, reduction, folding and final rest are summed");
  assert.ok(recipe.cookMinutes >= nominalCook[0] && recipe.cookMinutes <= nominalCook[1]);

  const finish = step(recipe, "Final steam and rest");
  everyLocale(finish, /63°C/, "the pork reaches the official whole-cut temperature");
  localePatterns(finish, {
    en: /145°F/,
    "zh-hant": /145°F/,
    ja: /145°F/,
    ko: /145°F/,
    th: /145°F/
  }, "the Fahrenheit conversion is present in each locale");
  localePatterns(finish, {
    en: /2 minutes more and recheck/,
    "zh-hant": /再蒸 2 分鐘後重測/,
    ja: /2分ずつ追加で蒸して再測定/,
    ko: /2분씩 더 찌고 다시 확인/,
    th: /เพิ่มครั้งละ 2 นาทีแล้ววัดซ้ำ/
  }, "a below-target piece gets a timed recheck");
  localePatterns(finish, {
    en: /10 minutes/,
    "zh-hant": /10 分鐘/,
    ja: /10分/,
    ko: /10분/,
    th: /10 นาที/
  }, "the pork rests after reaching its safe temperature");
  source(recipe, foodSafety);
});

test("lablabi time includes its overnight chickpea soak and the eggs have safe options", () => {
  const recipe = get("lablabi");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [495, 100, 595]);
  const chickpeas = recipe.ingredients.find((row) => row.item.en.startsWith("dried chickpeas"));
  assert.equal(chickpeas?.amount, "300 g");
  const lemons = recipe.ingredients.find((row) => row.item.en.startsWith("lemons:"));
  assert.equal(lemons?.amount, "2");
  assert.match(lemons.item.en, /juice one and cut one into wedges/);
  for (const locale of localeOrder) assert.match(chickpeas.item[locale], /8|٨|８/,
    `${locale}: chickpea soak duration is part of the ingredient preparation`);

  const cook = step(recipe, "Soak and cook the chickpeas");
  localePatterns(cook, {
    en: /60–90 minutes[\s\S]*chalky centre[\s\S]*10-minute increments/,
    "zh-hant": /60–90 分鐘[\s\S]*粉硬芯[\s\S]*10 分鐘/,
    ja: /60〜90分[\s\S]*粉っぽい硬さ[\s\S]*10分ずつ/,
    ko: /60~90분[\s\S]*가루처럼 단단한 심[\s\S]*10분씩/,
    th: /60–90 นาที[\s\S]*ผงแข็ง[\s\S]*10 นาที/
  }, "dry chickpeas are cooked through with age-dependent checks");
  const stages = minuteRange([
    cook.body.en.replace("Start checking at 60 minutes; ", ""),
    step(recipe, "Season the broth").body.en,
    step(recipe, "Prepare bread and bowls").body.en
  ]);
  assert.deepEqual(stages, [67, 97]);
  assert.ok(recipe.cookMinutes >= stages[1], "cook time covers the upper stated chickpea range and bowl wait");

  const egg = step(recipe, "Add chickpeas and optional egg");
  localePatterns(egg, {
    en: /both the white and yolk are firm[\s\S]*pasteurized eggs/,
    "zh-hant": /蛋白與蛋黃都凝固[\s\S]*巴氏殺菌蛋/,
    ja: /白身と黄身が固まる[\s\S]*殺菌済み卵/,
    ko: /흰자와 노른자가 모두 굳을 때까지[\s\S]*살균란/,
    th: /ทั้งไข่ขาวและไข่แดงสุก[\s\S]*ไข่พาสเจอไรซ์/
  }, "firm eggs or pasteurized eggs are specified in every locale");
  const finish = step(recipe, "Finish with lemon, harissa and oil");
  localePatterns(finish, {
    en: /four bowls[\s\S]*15 ml olive oil/,
    "zh-hant": /四碗[\s\S]*15 毫升橄欖油/,
    ja: /4つの器[\s\S]*15ml/,
    ko: /네 그릇[\s\S]*15ml/,
    th: /4 ชาม[\s\S]*15 มล/
  }, "the 60 ml oil is divided evenly among four bowls");
  source(recipe, eggSafety);
});

test("clafoutis counts its cooling time and checks the egg custard temperature", () => {
  const recipe = get("clafoutis");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 60, 80]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "large eggs")?.amount, "3");
  const bake = step(recipe, "Bake until safely set");
  everyLocale(bake, /71°C/, "egg custard reaches the official egg-dish temperature");
  everyLocale(bake, /160°F/, "the Fahrenheit conversion is present in each locale");
  localePatterns(bake, {
    en: /3-minute increments/,
    "zh-hant": /每次續烤 3 分鐘後重測/,
    ja: /3分ずつ焼き足して再測定/,
    ko: /3분씩 더 굽고 다시 측정/,
    th: /ครั้งละ 3 นาทีแล้ววัดซ้ำ/
  }, "a below-target center gets a timed recheck");
  const rest = step(recipe, "Rest and portion");
  localePatterns(rest, {
    en: /eight portions/,
    "zh-hant": /八份/,
    ja: /8人分/,
    ko: /8조각/,
    th: /8 ส่วน/
  }, "the clafoutis is divided into eight portions");
  const bakeAndRest = minuteRange([bake.body.en, rest.body.en]);
  assert.deepEqual(bakeAndRest, [55, 60]);
  assert.equal(recipe.cookMinutes, bakeAndRest[1], "cook time includes the longest stated bake and 20-minute rest");
  source(recipe, foodSafety);
});

test("beef stifado time covers its three browning batches, braises, reduction and rest", () => {
  const recipe = get("beef-stifado");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 200, 230]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("beef chuck"))?.amount, "1.5 kg");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("extra-virgin olive oil"))?.amount, "90 ml");
  const browning = step(recipe, "Brown the beef in batches");
  everyLocale(browning, /3/, "beef is browned in three batches");
  localePatterns(browning, {
    en: /8–10 minutes per batch/,
    "zh-hant": /每批煎 8–10 分鐘/,
    ja: /各8〜10分/,
    ko: /각 8–10분/,
    th: /รอบละ 8–10 นาที/
  }, "each batch has an 8–10-minute browning estimate");
  const check = step(recipe, "Check safety and tenderness");
  everyLocale(check, /63°C/, "beef reaches the official whole-cut temperature");
  everyLocale(check, /145°F/, "the Fahrenheit conversion is present in each locale");
  localePatterns(check, {
    en: /5-minute increments/,
    "zh-hant": /續燉 5 分鐘/,
    ja: /5分ずつ追加で煮て/,
    ko: /5분씩 더 브레이즈하고/,
    th: /ครั้งละ 5 นาทีแล้ววัดซ้ำ/
  }, "a below-target cut gets a timed recheck");

  const browningRange = minuteRange([browning.body.en]);
  const otherStages = minuteRange([
    step(recipe, "Brown the small onions").body.en,
    step(recipe, "Build the aromatic tomato base").body.en,
    step(recipe, "Start the slow braise").body.en,
    check.body.en.replace(/after 90 minutes[.]? /, ""),
    step(recipe, "Reduce the sauce uncovered").body.en,
    step(recipe, "Rest and correct seasoning").body.en
  ]);
  const cookRange = [browningRange[0] * 3 + otherStages[0], browningRange[1] * 3 + otherStages[1]];
  assert.deepEqual(cookRange, [188, 209], "the three separate browning batches are counted individually");
  assert.ok(recipe.cookMinutes >= cookRange[0] && recipe.cookMinutes <= cookRange[1]);
  localePatterns(step(recipe, "Rest and correct seasoning"), {
    en: /six servings/,
    "zh-hant": /六份/,
    ja: /6人分/,
    ko: /6인분/,
    th: /6 ที่/
  }, "the finished stew is portioned for six servings");
  source(recipe, foodSafety);
});
