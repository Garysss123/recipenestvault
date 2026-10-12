import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["rogan-josh", "toad-in-the-hole", "calamares-a-la-romana", "shiro-wat"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
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

function sourceUrls(recipe) {
  return recipe.sources.map((source) => source.url);
}

test("thirty-second batch retains the registry and exclusions and adds four existing recipes to shared five-locale route coverage", async () => {
  assert.equal(recipes.length, 353);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(excludedIds.length, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared detail-route list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 180);
  assert.equal(new Set(covered).size, 180);
  assert.ok(ids.every((id) => covered.includes(id)));
  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
    assert.equal(localeOrder.length, 5);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: all ingredients are translated`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: all steps are translated`);
    }
  }
});

test("rogan josh allocates four lamb servings and separates a safety temperature from tenderness", () => {
  const recipe = get("rogan-josh");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 175, 195]);
  assert.deepEqual(sourceUrls(recipe).slice(-1), [foodSafety]);
  const braise = step(recipe, "Braise and verify lamb temperature");
  const serve = step(recipe, "Rest and divide four servings");
  everyLocale(braise, /63°C.{0,8}145°F/, "lamb reaches 63°C / 145°F");
  everyLocale(braise, /10\s*(?:-minute|minutes?|分|분|นาที)/, "below-target lamb gets a timed recheck");
  everyLocale(braise, /skewer|竹籤|串|꼬치|ไม้(?:เสียบ|แทง)/, "tenderness is checked separately from safe temperature");
  everyLocale(serve, /15/, "lamb rests before serving");
  everyLocale(serve, /250/, "four portions use a stated raw-weight equivalent");
  assert.match(serve.body.en, /editorial estimate/i);
});

test("toad in the hole checks pork sausage doneness and gives each of four diners two sausages", () => {
  const recipe = get("toad-in-the-hole");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [35, 55, 90]);
  assert.deepEqual(sourceUrls(recipe).slice(-1), [foodSafety]);
  const sausage = step(recipe, "Pour batter and check sausage doneness");
  const serve = step(recipe, "Divide four servings and serve");
  everyLocale(sausage, /71°C.{0,8}160°F/, "pork sausage reaches 71°C / 160°F");
  everyLocale(sausage, /5\s*(?:minutes?|分|분|นาที)/, "undercooked sausage gets a timed recheck");
  everyLocale(serve, /2/, "each of four servings includes two sausages");
  assert.match(serve.body.en, /2 sausages/);
});

test("calamares divide all squid, flour, and salt across four batches and check thick pieces with a thermometer", () => {
  const recipe = get("calamares-a-la-romana");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 25, 50]);
  assert.deepEqual(sourceUrls(recipe).slice(-1), [seafoodSafety]);
  const fry = step(recipe, "Divide and fry four batches safely");
  everyLocale(fry, /175/, "each serving has 175 g raw squid");
  everyLocale(fry, /7\.5/, "dusting flour is divided among four batches");
  everyLocale(fry, /63°C.{0,8}145°F/, "the thickest squid reaches the seafood endpoint");
  everyLocale(fry, /30\s*(?:seconds?|秒|초|วินาที)/, "undercooked squid gets a timed recheck");
  assert.equal(recipe.ingredients.find((row) => row.item.en.includes("dusting"))?.amount, "170 g");
});

test("shiro wat stages the aromatics, accounts for the full water amount, and divides injera among four", () => {
  const recipe = get("shiro-wat");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [10, 40, 50]);
  const aromatics = step(recipe, "Cook the onions and aromatics in stages");
  const slurry = step(recipe, "Whisk the slurry");
  const serve = step(recipe, "Season and divide four servings with injera");
  everyLocale(aromatics, /8.{0,2}10/, "onions have a distinct timed stage");
  everyLocale(aromatics, /1.{0,2}2/, "garlic and ginger have a distinct timed stage");
  everyLocale(aromatics, /6.{0,2}8/, "tomato and berbere have a distinct timed stage");
  everyLocale(slurry, /350/, "the first measured water portion is stated");
  everyLocale(slurry, /400/, "the remaining measured water portion is stated");
  everyLocale(serve, /two|2/, "each of four servings receives two injera rounds");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("warm water"))?.amount, "750 ml");
  assert.match(serve.body.en, /8 total/);
  assert.equal(sourceUrls(recipe).length, 2, "dish references remain separate and no unsupported official safety source is added");
});
