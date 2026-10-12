import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["ossobuco-alla-milanese", "arancini-siciliani", "bavarian-krustenbraten", "nyama-choma"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} remains an existing published recipe`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} step exists`);
  return found;
}

function everyLocale(instruction, pattern, message) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], pattern, `${locale}: ${message}`);
}

function sources(recipe, expectedSafetyUrls) {
  const dish = recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance"));
  const safety = recipe.sources.filter((source) => source.title.startsWith("Official food-safety guidance"));
  assert.equal(dish.length, 2, `${recipe.id}: two dish-method sources remain separate`);
  assert.deepEqual(safety.map((source) => source.url), expectedSafetyUrls, `${recipe.id}: official safety sources are separately labelled`);
}

test("thirty-first batch retains 353 recipes and exclusions and adds four new IDs to five-locale route coverage", async () => {
  assert.equal(recipes.length, 353);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(excludedIds.length, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared detail-route list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 136);
  assert.equal(new Set(covered).size, 136);
  assert.ok(ids.every((id) => covered.includes(id)));
  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are translated`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: steps are translated`);
    }
  }
});

test("ossobuco allocates four shanks, measures the braise, and distinguishes safe doneness from tenderness", () => {
  const recipe = get("ossobuco-alla-milanese");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 180, 205]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.amount, "5 g");
  sources(recipe, [foodSafety]);
  const base = step(recipe, "Cook vegetables and reduce the wine");
  const braise = step(recipe, "Braise and check doneness");
  const serve = step(recipe, "Make gremolata and divide four servings");
  everyLocale(base, /7|7–8|7〜8/ , "vegetable cook stage is timed");
  everyLocale(braise, /63°C.{0,8}145°F/, "whole-cut veal reaches the official 63°C / 145°F endpoint");
  everyLocale(braise, /3/, "the whole-cut rest is stated");
  everyLocale(braise, /10/, "below-target meat gets a timed recheck");
  everyLocale(serve, /2/, "the reserved 2 g salt is allocated to the sauce");
  everyLocale(serve, /4/, "one shank is placed on each of four plates");
  assert.match(serve.body.en, /editorial estimate/i);
});

test("arancini corrects filling portions, rapid rice cooling, egg and frying endpoints", () => {
  const recipe = get("arancini-siciliani");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [90, 55, 145]);
  sources(recipe, [foodSafety, riceSafety]);
  const rice = step(recipe, "Cook rice and egg safely");
  const cool = step(recipe, "Cool rice and divide the filling");
  const shape = step(recipe, "Shape 16 arancini");
  const fry = step(recipe, "Fry in batches and check the centre");
  everyLocale(rice, /71°C.{0,8}160°F/, "egg-containing rice reaches 71°C / 160°F");
  everyLocale(cool, /1/, "rice is chilled within one hour");
  everyLocale(cool, /24/, "chilled rice is used within 24 hours");
  everyLocale(cool, /21/, "ragù-pea filling is divided into measured portions");
  everyLocale(shape, /16/, "the batch yields 16 rice balls");
  everyLocale(shape, /2/, "eight diners receive two balls each");
  everyLocale(fry, /175°C/, "oil temperature and batch frying are specified");
  everyLocale(fry, /74°C.{0,8}165°F/, "fried centre reaches 74°C / 165°F");
  everyLocale(fry, /4/, "frying is limited to four balls per batch");
  assert.match(cool.body.en, /within 1 hour/);
  assert.match(fry.body.en, /editorial estimate/i);
  assert.match(recipe.storage.en, /within 24 hours[\s\S]*74°C \(165°F\)/);
});

test("Bavarian roast includes the crackling stages, complete timing, thermometer endpoint, and six portions", () => {
  const recipe = get("bavarian-krustenbraten");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 320, 350]);
  sources(recipe, [foodSafety]);
  const roast = step(recipe, "Continue roasting and check pork");
  const serve = step(recipe, "Reduce gravy and divide six servings");
  everyLocale(roast, /63°C.{0,8}145°F/, "whole-cut pork reaches 63°C / 145°F");
  everyLocale(roast, /3/, "pork receives the official three-minute rest");
  everyLocale(roast, /10/, "below-target pork gets a timed recheck");
  everyLocale(serve, /330/, "roast is allocated as six raw-weight-equivalent portions");
  assert.match(serve.body.en, /editorial estimate/i);
  assert.ok(recipe.cookMinutes >= 317, "cook estimate covers the longest stated roast, rest, and gravy stages");
});

test("nyama choma divides salt and six portions and times the indirect grill with a safe endpoint", () => {
  const recipe = get("nyama-choma");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 125, 155]);
  sources(recipe, [foodSafety]);
  const season = step(recipe, "Season and portion the goat");
  const grill = step(recipe, "Slow-grill the thick pieces");
  const safe = step(recipe, "Char and verify safe temperature");
  const serve = step(recipe, "Divide six servings and share");
  everyLocale(season, /10/, "10 g of salt is assigned to the goat");
  everyLocale(grill, /60|60–80/, "indirect grilling has an estimated duration");
  everyLocale(safe, /63°C.{0,8}145°F/, "whole-cut goat reaches 63°C / 145°F");
  everyLocale(safe, /3/, "goat receives the official three-minute rest");
  everyLocale(serve, /250/, "six portions use a stated raw bone-in allocation");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("coarse salt"))?.item.en ?? "", /10 g.*2 g/);
});
