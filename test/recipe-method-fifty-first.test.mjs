import assert from "node:assert/strict";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["taiwanese-popcorn-chicken", "rajma-masala", "pho-ga", "bacalao-al-pil-pil"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely",
  kidneyBeans: "https://www.fda.gov/food/foodborne-pathogens/bad-bug-book-second-edition"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: published recipe exists`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} step exists`);
  return found;
}

function official(recipe, wanted) {
  for (const url of wanted) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: directly relevant official source is credited: ${url}`);
  }
}

test("fifty-first batch adds four eligible recipes to the exact shared five-locale ledger", async () => {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 304);
  assert.equal(new Set(covered).size, 304);
  assert.deepEqual(covered.slice(-104, -100), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 31);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft remains present`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total is prep plus cook`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: measured ingredients are localized`);
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: all method steps are localized`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: storage card is localized`);
    }
    assert.notDeepEqual(recipe.instructions.map((entry) => entry.body.en), draft.instructions.map((entry) => entry.body.en),
      `${id}: published method refinement leaves its source draft untouched`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: published storage card leaves its source draft untouched`);
    assert.ok(recipe.sources.filter((entry) => !entry.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: two recipe-source references remain separate from official guidance`);
  }
});

test("Taiwanese popcorn chicken distinguishes fry estimates, poultry doneness, portions, and quality storage", () => {
  const recipe = get("taiwanese-popcorn-chicken");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [45, 20, 65, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.includes("chicken thigh"))?.amount, "700 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("coarse sweet potato starch"))?.amount, "180 g");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("fresh Taiwanese basil"))?.item.en ?? "", /washed and completely dried/);
  assert.match(step(recipe, "Heat oil safely").body.en, /175°C[\s\S]*recipe-selected frying target rather than a food-safety endpoint/);
  assert.match(step(recipe, "Fry in small batches and verify the centre").body.en,
    /three frying batches of about 233 g each[\s\S]*175 g raw chicken per diner[\s\S]*estimated 3½–4½ minutes[\s\S]*74°C \(165°F\)/);
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Fry in small batches and verify the centre").body[locale], /74°C/,
      `${locale}: the thickest poultry piece reaches the official endpoint`);
    assert.match(recipe.storage[locale], /3–4|3〜4|3~4/,
      `${locale}: official leftover window is distinguished from the one-day crispness choice`);
  }
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("rajma follows the FDA kidney-bean boil, accounts for every water and salt use, and serves six", () => {
  const recipe = get("rajma-masala");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [750, 145, 895, 6]);
  const water = recipe.ingredients.find((row) => row.item.en.startsWith("cool water for soaking"));
  assert.equal(water?.amount, "1.5 L + 3 L");
  assert.match(water.item.en, /fresh water for boiling \(reserve 500 ml\)/);
  assert.match(step(recipe, "Soak and inspect the beans").body.en,
    /8–12 hours[\s\S]*FDA guidance calls for at least 5 hours[\s\S]*discard all soaking water/);
  assert.match(step(recipe, "Boil the soaked beans in fresh water").body.en,
    /3 L fresh water[\s\S]*4 g of the salt[\s\S]*boiling for 30 minutes[\s\S]*do not use a slow cooker[\s\S]*estimated 25–40 minutes[\s\S]*Keep 500 ml cooking liquid/);
  assert.match(step(recipe, "Rest and portion six servings").body.en, /six equal bowls[\s\S]*all 20 g chopped cilantro/);
  assert.equal(recipe.ingredients.some((row) => /rice/i.test(row.item.en)), false,
    "the method no longer sends cooks to an unlisted rice side");
  assert.ok(recipe.cookMinutes >= 141, "cook metadata covers the upper end of timed bean, gravy, and rest stages");
  official(recipe, [urls.kidneyBeans, urls.handling, urls.storage, urls.temperatures]);
});

test("chicken pho portions all four bowls and keeps poultry, broth, and rice noodles on matching clocks", () => {
  const recipe = get("pho-ga");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [30, 130, 160, 4]);
  assert.match(step(recipe, "Poach the chicken safely").body.en,
    /35–45-minute poach is a starting estimate[\s\S]*thickest breast and thigh[\s\S]*74°C \(165°F\)/);
  assert.match(step(recipe, "Reheat and portion the chicken").body.en,
    /1–3-minute warm-up is an estimate[\s\S]*74°C \(165°F\)[\s\S]*320 g dry noodles as 80 g per bowl/);
  assert.match(step(recipe, "Finish four bowls").body.en, /600 ml[\s\S]*2\.4 L/);
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Poach the chicken safely").body[locale], /74°C/,
      `${locale}: both thick poultry sections reach the official endpoint`);
    assert.match(recipe.storage[locale], /3–4|3〜4|3~4/,
      `${locale}: official leftover window is distinct from the selected three-day limit`);
  }
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("pil-pil cod allocates the four water changes and uses the fish endpoint without treating process temperatures as safety limits", () => {
  const recipe = get("bacalao-al-pil-pil");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [2180, 35, 2215, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("salt cod loins"))?.amount, "800 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("cold water for four soaking changes"))?.amount, "12 L");
  assert.match(step(recipe, "Desalt the cod for 36 hours").body.en,
    /four 9-hour periods[\s\S]*change the water after the first three periods \(12 L total\)[\s\S]*not a government safety limit/);
  assert.match(step(recipe, "Poach the cod and check its centre").body.en,
    /68–70°C, a recipe-selected texture range[\s\S]*estimated 8–10 minutes[\s\S]*63°C \(145°F\)[\s\S]*2-minute increments/);
  assert.match(step(recipe, "Warm, portion, and serve").body.en, /one loin \(about 200 g before soaking\)[\s\S]*one quarter/);
  assert.ok(recipe.cookMinutes >= 34, "cook metadata covers the upper end of timed cooking and emulsion stages");
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Poach the cod and check its centre").body[locale], /63°C/,
      `${locale}: the finfish endpoint is explicit`);
    assert.match(recipe.storage[locale], /3–4|3〜4|3~4/,
      `${locale}: the 2-day quality choice is separate from official leftover guidance`);
  }
  official(recipe, [urls.seafood, urls.temperatures, urls.handling, urls.storage]);
});
