import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["nikujaga", "southern-fried-chicken", "halifax-donair", "cochinita-pibil"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const officialPrefix = "Official food-safety guidance";

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} remains an existing published recipe`);
  return recipe;
}

function step(recipe, title) {
  const result = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(result, `${recipe.id}: ${title} instruction exists`);
  return result;
}

function everyLocale(instruction, check, label) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], check, `${locale}: ${label}`);
}

function sourceSeparation(recipe) {
  const dishSources = recipe.sources.filter((source) => !source.title.startsWith(officialPrefix));
  const safetySources = recipe.sources.filter((source) => source.title.startsWith(officialPrefix));
  assert.equal(dishSources.length, 2, `${recipe.id}: two dish-method references`);
  assert.equal(safetySources.length, 1, `${recipe.id}: one separately labelled official safety reference`);
  assert.equal(safetySources[0].url, foodSafety, `${recipe.id}: FoodSafety.gov is the safety source`);
}

test("thirtieth batch retains the 353-recipe registry and 18 exclusions, adding four existing recipes to the 152-ID current shared route coverage", async () => {
  assert.equal(recipes.length, 353);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));

  const regression = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = regression.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "the shared detail-route regression list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 152);
  assert.equal(new Set(covered).size, 152);
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 148, "all other 148 reviewed IDs remain");
  assert.ok(ids.every((id) => covered.includes(id)));

  for (const recipe of ids.map(get)) {
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${recipe.id}: total equals prep plus cook`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((item) => item.amount && item.item[locale]), `${recipe.id}/${locale}: ingredients are translated`);
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), `${recipe.id}/${locale}: method is translated`);
    }
    sourceSeparation(recipe);
  }
});

test("nikujaga uses the whole-cut pork endpoint and allocates four measured bowls", () => {
  const recipe = get("nikujaga");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 40, 65]);
  const simmer = step(recipe, "Add soy and shirataki; check doneness");
  const serve = step(recipe, "Rest and divide into four servings");
  everyLocale(simmer, /63°C.{0,5}145°F/, "whole-cut pork reaches the measured 63°C / 145°F endpoint");
  everyLocale(simmer, /2/, "a below-target reading gets a timed recheck");
  everyLocale(serve, /8/, "the covered rest exceeds three minutes");
  everyLocale(serve, /4/, "the pot is divided into four bowls");
  everyLocale(step(recipe, "Portion pork and measure the broth"), /75/, "raw pork is allocated per person");
  assert.match(recipe.substitutions[0].en, /63°C \(145°F\)[\s\S]*3 minutes/);
});

test("southern fried chicken uses a measured poultry endpoint and realistic batch portions", () => {
  const recipe = get("southern-fried-chicken");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [525, 80, 605]);
  const dark = step(recipe, "Fry thighs and drumsticks in batches");
  const white = step(recipe, "Fry breast and wings in batches");
  const serve = step(recipe, "Drain, rest and divide six servings");
  everyLocale(dark, /74°C.{0,5}165°F/, "dark meat reaches 74°C / 165°F");
  everyLocale(white, /74°C.{0,5}165°F/, "breast and wings reach 74°C / 165°F");
  everyLocale(dark, /600/, "small batches are limited to 600 g");
  everyLocale(serve, /300/, "six portions allocate 300 g raw bone-in chicken each");
  sourceSeparation(recipe);
});

test("Halifax donair checks the ground-beef endpoint and portions the fillings", () => {
  const recipe = get("halifax-donair");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 65, 95]);
  const bake = step(recipe, "Bake and temperature-check the donair loaf");
  const fill = step(recipe, "Fill and portion the donairs");
  everyLocale(bake, /71°C.{0,5}160°F/, "ground beef reaches 71°C / 160°F");
  everyLocale(bake, /45/, "45 minutes is only an initial check time");
  everyLocale(bake, /5/, "below-target readings get five-minute oven rechecks");
  everyLocale(fill, /225/, "raw beef equivalent is split per pita");
  everyLocale(fill, /75/, "sweet sauce is measured per pita");
  sourceSeparation(recipe);
});

test("cochinita pibil counts its minimum marinade and separates safety from tenderness", () => {
  const recipe = get("cochinita-pibil");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [280, 180, 460]);
  assert.ok(recipe.ingredients.some((item) => item.amount === "16" && /tortillas/i.test(item.item.en)), "the 16 tortillas used for service are listed");
  const marinade = step(recipe, "Marinate pork under refrigeration");
  const roast = step(recipe, "Slow-roast; check temperature and tenderness");
  const rest = step(recipe, "Rest the pork for at least three minutes");
  const serve = step(recipe, "Portion with pickled onion and tortillas");
  everyLocale(marinade, /4/, "the four-hour chilled minimum is explicit");
  everyLocale(roast, /63°C.{0,5}145°F/, "whole-cut pork reaches the safety minimum");
  everyLocale(roast, /15/, "roast time is a guide with 15-minute rechecks");
  everyLocale(roast, /fork|叉子|フォーク|포크|ส้อม/, "fork tenderness is a separate finish cue");
  everyLocale(rest, /20/, "the measured twenty-minute rest is explicit");
  everyLocale(serve, /200/, "raw pork is allocated per serving");
  everyLocale(serve, /2/, "two tortillas are allocated per serving");
  sourceSeparation(recipe);
});
