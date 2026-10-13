import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["dakgalbi", "ca-kho-to", "keftedes", "samosa"];
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
  rawFlour: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know"
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
      `${recipe.id}: directly relevant official guidance is credited: ${url}`);
  }
}

test("fifty-second batch appends four eligible IDs to the shared five-locale ledger", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 228);
  assert.equal(new Set(covered).size, 228);
  assert.deepEqual(covered.slice(-24, -20), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.ok(ids.every((id) => !covered.slice(0, -24).includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 107);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft remains present`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total is prep plus cook`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient details are localized`);
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: method is localized`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: storage card is localized`);
    }
    assert.notDeepEqual(recipe.ingredients, draft.ingredients, `${id}: published quantities and usage do not mutate the draft`);
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: published method does not mutate the draft`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: published storage card does not mutate the draft`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: added official sources do not mutate the draft`);
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: two recipe references remain separate from official guidance`);
  }
});

test("Dakgalbi allocates four servings and separates timing estimates from poultry safety", () => {
  const recipe = get("dakgalbi");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [45, 30, 75, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("boneless skinless chicken"))?.amount, "700 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("Korean cylindrical rice cakes"))?.amount, "200 g");
  assert.match(step(recipe, "Fold in perilla at the end").body.en, /four servings[\s\S]*175 g raw-chicken equivalent[\s\S]*50 g rice cakes[\s\S]*62\.5 g sweet potato/);
  assert.match(step(recipe, "Cook to safe doneness").body.en,
    /estimated 4–6 minutes[\s\S]*74°C \(165°F\)[\s\S]*after 1 minute/);
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Cook to safe doneness").body[locale], /74°C/, `${locale}: poultry endpoint is present`);
    assert.match(recipe.storage[locale], /3–4|3〜4|3~4/, `${locale}: official window and quality choice are both present`);
  }
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("Keftedes corrects the meatball yield and distinguishes frying setup, estimated time, and ground-meat doneness", () => {
  const recipe = get("keftedes");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [45, 35, 80, 6]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "mixed beef and pork mince")?.amount, "700 g");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("plain flour"))?.item.en ?? "", /use only as needed/);
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil"))?.item.en ?? "", /6–7 mm depth in a 24 cm pan/);
  assert.match(step(recipe, "Shape and dust the keftedes").body.en,
    /24 equal meatballs, about 40–45 g each[\s\S]*4 meatballs per each of 6 servings[\s\S]*about 117 g per serving/);
  const fry = step(recipe, "Shallow-fry in batches").body.en;
  assert.match(fry, /300 ml oil[\s\S]*175°C[\s\S]*not a food-safety endpoint[\s\S]*8 meatballs at a time[\s\S]*3 batches[\s\S]*estimated|times are estimates/);
  assert.match(fry, /71°C \(160°F\)/);
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Shallow-fry in batches").body[locale], /71°C/, `${locale}: ground-meat endpoint is present`);
    assert.match(recipe.storage[locale], /3–4|3〜4|3~4/, `${locale}: official leftover window and quality preference are distinguished`);
  }
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("Ca kho to divides four fish portions and checks finfish at 63°C rather than using sauce reduction as a safety test", () => {
  const recipe = get("ca-kho-to");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [30, 45, 75, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("four catfish steaks"))?.amount, "800 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("cooked jasmine rice"))?.amount, "600 g");
  assert.match(step(recipe, "Reduce to a glaze").body.en,
    /each thick steak[\s\S]*63°C \(145°F\)[\s\S]*2-minute increments[\s\S]*sauce colour and thickness are not safety tests/);
  assert.match(step(recipe, "Finish with scallions").body.en, /one steak and 150 g cooked rice per person[\s\S]*four plates/);
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Reduce to a glaze").body[locale], /63°C/, `${locale}: finfish endpoint is present`);
    assert.match(recipe.storage[locale], /2 days|2 天|2日|2일|2 วัน/,
      `${locale}: quality recommendation is not stated as an official storage limit`);
    assert.match(recipe.storage[locale], /74°C/, `${locale}: official reheating endpoint is present`);
  }
  official(recipe, [urls.temperatures, urls.seafood, urls.handling]);
});

test("Samosa accounts for all filling and uses oil settings as process estimates, not internal safety temperatures", () => {
  const recipe = get("samosa");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [80, 65, 145, 12]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "boiled potatoes, 2 cm pieces")?.amount, "700 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "green peas")?.amount, "150 g");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("neutral frying oil"))?.item.en ?? "", /1\.8 L gives about 5\.7 cm depth in a 20 cm pot/);
  assert.match(step(recipe, "Fill and seal").body.en, /Divide all the cold filling into 12 equal mounds[\s\S]*about 70–75 g each[\s\S]*none is left unused/);
  const lowFry = step(recipe, "Begin frying at low heat").body.en;
  assert.match(lowFry, /145–150°C[\s\S]*not a food-safety endpoint[\s\S]*estimated 8–10 minutes[\s\S]*3 batches/);
  const crisp = step(recipe, "Raise heat and crisp").body.en;
  assert.match(crisp, /165°C[\s\S]*not a safety value[\s\S]*estimated 4–6 minutes[\s\S]*steam|potato-and-pea filling should be steaming hot/);
  assert.doesNotMatch(`${lowFry} ${crisp}`, /74°C|71°C|145°F|165°F/);
  assert.match(recipe.storage.en, /within 2 days for texture[\s\S]*not an official safety deadline[\s\S]*74°C \(165°F\)/);
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Begin frying at low heat").body[locale], /145/, `${locale}: low oil setting is consistent`);
    assert.match(step(recipe, "Raise heat and crisp").body[locale], /165/, `${locale}: crisping setting is consistent`);
    assert.doesNotMatch(`${step(recipe, "Begin frying at low heat").body[locale]} ${step(recipe, "Raise heat and crisp").body[locale]}`, /74°C|71°C|145°F|165°F/,
      `${locale}: a meat or fish internal endpoint is not imposed on the vegetarian pastry`);
    assert.match(recipe.storage[locale], /74°C/, `${locale}: leftover reheating endpoint is consistent`);
  }
  official(recipe, [urls.temperatures, urls.handling, urls.rawFlour]);
});
