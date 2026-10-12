import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { fill, localeOrder } from "../src/data.mjs";
import { recipeUi } from "../src/recipe-ui.mjs";
import { recipes } from "../src/recipes.mjs";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const foodSafetySource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const auditedIds = [
  "moussaka", "paella-valenciana", "poutine", "coq-au-vin",
  "bouillabaisse", "pissaladiere", "pasta-con-le-sarde", "stuffat-tal-fenek",
  "bibimbap", "bulgogi", "falafel", "shakshuka",
  "tonkatsu", "cornish-pasty", "carnitas", "indonesian-beef-rendang",
  "nigerian-jollof-rice", "tandoori-chicken", "marmitako", "banh-flan"
];
const auditedRecipes = new Map(auditedIds.map((id) => [id, recipes.find((recipe) => recipe.id === id)]));

function localized(value, locale) {
  return value?.[locale] ?? value?.en ?? value ?? "";
}

function duration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `PT${hours ? `${hours}H` : ""}${remainder ? `${remainder}M` : ""}`;
}

function formatRecipeTime(minutes, locale) {
  const ui = recipeUi[locale];
  if (minutes < 60) return fill(ui.minutes, { count: minutes });
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? fill(ui.hoursMinutes, { hours, minutes: remainder }) : fill(ui.hours, { count: hours });
}

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}

function recipeSchema(html, id, locale) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, `${locale}/${id}: JSON-LD exists`);
  const graph = JSON.parse(match[1])["@graph"];
  return graph.find((entry) => entry["@type"] === "Recipe");
}

function summedExplicitMinutes(bodies) {
  return bodies.flatMap((body) => [...body.matchAll(/\b(\d+)(?:[–-](\d+))?\s*minutes?\b/g)])
    .reduce(([minimum, maximum], [, low, high]) => [minimum + Number(low), maximum + Number(high ?? low)], [0, 0]);
}

function recipeStep(recipe, title) {
  const step = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(step, `${recipe.id}: ${title} step exists`);
  return step;
}

test("moussaka oil allocation, safety endpoints, and stated wait times are explicit", () => {
  const recipe = auditedRecipes.get("moussaka");
  assert.ok(recipe, "moussaka slug exists");

  const oil = recipe.ingredients.find((row) => row.item.en.startsWith("extra-virgin olive oil"));
  assert.equal(oil?.amount, "80 ml");
  const allocatedOil = recipe.instructions.flatMap((step) => [...step.body.en.matchAll(/\b(\d+) ml olive oil\b/g)])
    .reduce((total, [, amount]) => total + Number(amount), 0);
  assert.equal(allocatedOil, 80, "the ingredient amount equals the three measured uses");

  for (const locale of localeOrder) {
    assert.match(recipe.instructions[4].body[locale], /71°C/,
      `${locale}: ground meat has the official 71°C endpoint`);
    assert.match(recipe.instructions[10].body[locale], /74°C/,
      `${locale}: casserole has the official 74°C endpoint`);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official temperature source is credited");

  const [prepWaitLow, prepWaitHigh] = summedExplicitMinutes(recipe.instructions.slice(0, 1).map((step) => step.body.en));
  const [cookLow, cookHigh] = summedExplicitMinutes(recipe.instructions.slice(1).map((step) => step.body.en));
  assert.equal(prepWaitLow, 30, "the aubergine salting wait is accounted in prep time");
  assert.equal(prepWaitHigh, 30);
  assert.ok(recipe.prepMinutes >= prepWaitHigh);
  assert.ok(recipe.cookMinutes >= cookLow && recipe.cookMinutes <= cookHigh,
    `cook time ${recipe.cookMinutes} covers the timed cooking, cooling, baking, and rest (${cookLow}–${cookHigh} min)`);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
});

test("paella cook time covers the timed method and checks both meats safely", () => {
  const recipe = auditedRecipes.get("paella-valenciana");
  assert.ok(recipe, "paella-valenciana slug exists");
  const [cookLow, cookHigh] = summedExplicitMinutes(recipe.instructions.map((step) => step.body.en));
  assert.ok(recipe.cookMinutes >= cookLow && recipe.cookMinutes <= cookHigh,
    `cook time ${recipe.cookMinutes} covers the timed method (${cookLow}–${cookHigh} min)`);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);

  for (const locale of localeOrder) {
    assert.match(recipe.instructions[5].body[locale], /74°C/,
      `${locale}: chicken reaches the poultry endpoint`);
    assert.match(recipe.instructions[5].body[locale], /71°C/,
      `${locale}: rabbit reaches the rabbit endpoint`);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official temperature source is credited");
});

test("coq au vin checks each chicken cut at its thickest point", () => {
  const recipe = auditedRecipes.get("coq-au-vin");
  assert.ok(recipe, "coq-au-vin slug exists");
  assert.match(recipe.instructions[5].body.en, /largest thigh and drumstick/i);
  assert.match(recipe.instructions[5].body.en, /both must reach 74°C \(165°F\)/);
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official temperature source is credited");

  for (const locale of localeOrder) {
    assert.match(recipe.instructions[5].body[locale], /74°C/,
      `${locale}: both poultry cuts reach the official endpoint`);
  }
});

test("bouillabaisse allocates its oil and salt, then checks every seafood endpoint", () => {
  const recipe = auditedRecipes.get("bouillabaisse");
  assert.ok(recipe, "bouillabaisse slug exists");
  assert.equal(recipe.instructions.length, 6, "the method stays aligned with its reviewed illustration set");
  assert.doesNotMatch(recipe.name.en, /rouille/i, "the recipe does not claim an unlisted side sauce");
  assert.doesNotMatch(recipe.description.en, /rouille/i);
  assert.doesNotMatch(recipe.instructions.map((step) => step.body.en).join(" "), /rouille/i);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "olive oil")?.amount, "60 ml");
  assert.match(recipeStep(recipe, "Build the fish stock").body.en, /30 ml of the olive oil/);
  assert.match(recipeStep(recipe, "Cook the aromatic base").body.en, /remaining 30 ml olive oil/);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt for the broth"))?.amount, "8 g");
  assert.match(recipeStep(recipe, "Combine with stock").body.en, /up to 8 g fine salt/);

  const seafood = recipeStep(recipe, "Poach the fish gently");
  for (const locale of localeOrder) assert.match(seafood.body[locale], /63°C/, `${locale}: fish reaches 63°C`);
  assert.match(seafood.body.en, /shrimp should be firm, pearly and opaque/i);
  assert.match(seafood.body.en, /mussel shells must open during cooking/i);
  assert.match(seafood.body.en, /discard any mussels that remain closed/i);
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official seafood temperature source is credited");
});

test("pissaladiere oil allocation and cook time cover its onion compote and bake", () => {
  const recipe = auditedRecipes.get("pissaladiere");
  assert.ok(recipe, "pissaladiere slug exists");
  assert.equal(recipe.prepMinutes, 100);
  assert.equal(recipe.cookMinutes, 65);
  assert.equal(recipe.totalMinutes, 165);
  const dough = recipeStep(recipe, "Make the yeast dough");
  const onions = recipeStep(recipe, "Slowly cook the onions");
  const bake = recipeStep(recipe, "Bake until the crust is golden");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "olive oil for dough")?.amount, "45 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "olive oil for onions")?.amount, "60 ml");

  for (const locale of localeOrder) {
    assert.match(dough.body[locale], /45/ , `${locale}: all dough oil is used`);
    assert.match(onions.body[locale], /60/ , `${locale}: onion oil amount is used`);
    assert.match(onions.body[locale], /45/ , `${locale}: onion cooking time is explicit`);
    assert.match(bake.body[locale], /200°C/ , `${locale}: oven temperature agrees`);
    assert.match(bake.body[locale], /20/ , `${locale}: bake time is explicit`);
  }
  assert.deepEqual(summedExplicitMinutes([onions.body.en, bake.body.en]), [65, 65]);
});

test("pasta con le sarde allocates oil and salt and cooks sardines to the seafood endpoint", () => {
  const recipe = auditedRecipes.get("pasta-con-le-sarde");
  assert.ok(recipe, "pasta-con-le-sarde slug exists");
  assert.equal(recipe.prepMinutes, 30);
  assert.equal(recipe.cookMinutes, 52);
  assert.equal(recipe.totalMinutes, 82);
  const oil = recipe.ingredients.find((row) => row.item.en.startsWith("extra-virgin olive oil"));
  const salt = recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"));
  assert.equal(oil?.amount, "100 ml");
  assert.match(oil.item.en, /60 ml for sauce and 40 ml for sardines/);
  assert.equal(salt?.amount, "8 g");
  assert.match(salt.item.en, /6 g for the fennel water and 2 g for the sardines/);

  const fennel = recipeStep(recipe, "Blanch the wild fennel");
  const sauce = recipeStep(recipe, "Build the fennel and raisin sauce");
  const sardines = recipeStep(recipe, "Cook the sardines gently");
  for (const locale of localeOrder) {
    assert.match(fennel.body[locale], /6/ , `${locale}: fennel water salt is allocated`);
    assert.match(fennel.body[locale], /20/ , `${locale}: fennel cooking time is explicit`);
    assert.match(sauce.body[locale], /60/ , `${locale}: sauce oil allocation is explicit`);
    assert.match(sardines.body[locale], /40/ , `${locale}: remaining sardine oil is used`);
    assert.match(sardines.body[locale], /63°C/, `${locale}: sardines reach the safe endpoint`);
  }
  const [cookLow, cookHigh] = summedExplicitMinutes(recipe.instructions.map((step) => step.body.en));
  assert.equal(cookLow, 44);
  assert.equal(cookHigh, 52);
  assert.ok(recipe.cookMinutes >= cookHigh, `cook time ${recipe.cookMinutes} covers the timed method (${cookLow}–${cookHigh} min)`);
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official fish temperature source is credited");
});

test("stuffat tal-fenek prep includes the marinade and the braise reaches rabbit's safe endpoint", () => {
  const recipe = auditedRecipes.get("stuffat-tal-fenek");
  assert.ok(recipe, "stuffat-tal-fenek slug exists");
  assert.equal(recipe.prepMinutes, 270, "prep includes 30 minutes active work and the four-hour minimum marinade");
  assert.equal(recipe.cookMinutes, 130);
  assert.equal(recipe.totalMinutes, 400);
  const marinade = recipeStep(recipe, "Marinate the rabbit");
  const brown = recipeStep(recipe, "Drain and brown the rabbit");
  const braise = recipeStep(recipe, "Braise until fork-tender");
  const base = recipeStep(recipe, "Build the tomato braising base");
  const rest = recipeStep(recipe, "Rest and serve");
  for (const locale of localeOrder) {
    assert.match(marinade.body[locale], /4/ , `${locale}: minimum marinade wait is explicit`);
    assert.match(brown.body[locale], /30/ , `${locale}: measured browning oil is used`);
    assert.match(braise.body[locale], /71°C/, `${locale}: rabbit reaches the official endpoint`);
  }
  const [cookLow, cookHigh] = summedExplicitMinutes([brown.body.en, base.body.en, braise.body.en, rest.body.en]);
  assert.equal(cookLow, 109);
  assert.equal(cookHigh, 126);
  assert.ok(recipe.cookMinutes >= cookHigh, `cook time ${recipe.cookMinutes} covers the timed method (${cookLow}–${cookHigh} min)`);
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official rabbit temperature source is credited");
});

test("bibimbap ingredient amounts are fully allocated and its times cover soaking and cooking", () => {
  const recipe = auditedRecipes.get("bibimbap");
  assert.ok(recipe, "bibimbap slug exists");
  const ingredient = (prefix) => recipe.ingredients.find((row) => row.item.en.startsWith(prefix));
  const allocated = (pattern) => recipe.instructions.flatMap((step) => [...step.body.en.matchAll(pattern)])
    .reduce((total, [, amount]) => total + Number(amount), 0);

  assert.equal(ingredient("Korean soup soy sauce")?.amount, "20 ml");
  assert.equal(allocated(/\b(\d+) ml (?:soup soy sauce)\b/g), 20);
  assert.equal(ingredient("toasted sesame oil")?.amount, "20 ml");
  assert.equal(allocated(/\b(\d+) ml sesame oil\b/g), 20);
  assert.equal(ingredient("neutral cooking oil")?.amount, "20 ml");
  assert.equal(allocated(/\b(\d+) ml (?:neutral oil|oil)\b/g), 20);
  assert.equal(ingredient("garlic")?.amount, "6 g");
  assert.equal(allocated(/\b(\d+) g garlic\b/g), 6);
  assert.equal(ingredient("fine salt")?.amount, "4 g");
  assert.equal(allocated(/\b(\d+) g salt\b/g), 4);
  assert.ok(recipe.prepMinutes >= 20, "prep covers the rice soak");
  const [cookLow, cookHigh] = summedExplicitMinutes(recipe.instructions.slice(1).map((step) => step.body.en));
  assert.ok(recipe.cookMinutes >= cookHigh,
    `cook time ${recipe.cookMinutes} covers the timed method (${cookLow}–${cookHigh} min)`);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);

  for (const locale of localeOrder) {
    assert.match(recipeStep(recipe, "Fry the pasteurized eggs").body[locale], /71°C/,
      `${locale}: unpasteurized-egg fallback fully sets eggs to the egg-dish endpoint`);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"));
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource));
});

test("bulgogi accounts for its two waits and cooks steak to its endpoint with a rest", () => {
  const recipe = auditedRecipes.get("bulgogi");
  assert.ok(recipe, "bulgogi slug exists");
  assert.equal(recipe.prepMinutes, 50, "prep covers the 20-minute freezer chill and 30-minute marinade");
  assert.equal(recipe.cookMinutes, 20);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "toasted sesame seeds")?.amount, "8 g");
  assert.match(recipeStep(recipe, "Build the pear marinade").body.en, /4 g sesame seeds/);
  assert.match(recipeStep(recipe, "Glaze and serve").body.en, /remaining 4 g sesame seeds/);

  for (const locale of localeOrder) {
    assert.match(recipeStep(recipe, "Sear the first batch").body[locale], /63°C/);
    assert.match(recipeStep(recipe, "Cook the second batch to doneness").body[locale], /63°C/);
    assert.match(recipeStep(recipe, "Cook the second batch to doneness").body[locale], /3\s*(?:minutes|分|분|นาที)/);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official steak endpoint and rest source is credited");
});

test("falafel refrigerates the soak and leftovers, lists its optional binder, and covers the long prep", () => {
  const recipe = auditedRecipes.get("falafel");
  assert.ok(recipe, "falafel slug exists");
  assert.equal(recipe.prepMinutes, 760, "prep includes the 12-hour soak and 30-minute rest");
  assert.equal(recipe.cookMinutes, 30);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
  assert.ok(recipe.ingredients.some((row) => localized(row.amount, "en") === "up to 15 g" && row.item.en.startsWith("all-purpose flour")),
    "the test-ball contingency is listed as an optional ingredient");
  assert.match(recipeStep(recipe, "Fry and drain").body.en, /split it to check that the centre is hot and tender with no hard chickpea pieces/);

  for (const locale of localeOrder) {
    assert.match(recipeStep(recipe, "Soak the chickpeas").body[locale], /4°C/);
    assert.match(recipe.storage[locale], /74°C/);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://food.unl.edu/article/how-cook-dry-beans-scratch/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"));
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource));
});

test("shakshuka allocates salt, oil, and garnish and gives safe egg and leftover endpoints", () => {
  const recipe = auditedRecipes.get("shakshuka");
  assert.ok(recipe, "shakshuka slug exists");
  assert.equal(recipe.prepMinutes, 15);
  assert.equal(recipe.cookMinutes, 35, "cook time covers the 25.5–30.5 minutes of timed cooking");
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "3 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "olive oil")?.amount, "45 ml");
  assert.match(recipeStep(recipe, "Soften the vegetables").body.en, /all 45 ml olive oil/);
  assert.match(recipeStep(recipe, "Soften the vegetables").body.en, /1 g of the fine salt/);
  assert.match(recipeStep(recipe, "Thicken the tomato sauce").body.en, /remaining 2 g fine salt/);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "pasteurized large eggs")?.amount, "4");
  assert.match(recipeStep(recipe, "Garnish and serve").body.en, /20 g chopped parsley or cilantro/);
  assert.match(recipeStep(recipe, "Garnish and serve").body.en, /up to 120 g crumbled feta/);

  for (const locale of localeOrder) {
    assert.match(recipeStep(recipe, "Cover and gently poach").body[locale], /71°C/);
    assert.match(recipe.storage[locale], /74°C/);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"));
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource));
});

test("tonkatsu allocates the sauce, verifies pork with its rest, and reheats leftovers safely", () => {
  const recipe = auditedRecipes.get("tonkatsu");
  assert.ok(recipe, "tonkatsu slug exists");
  assert.equal(recipe.prepMinutes, 20);
  assert.equal(recipe.cookMinutes, 25);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt")?.amount, "4 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("soy sauce"))?.amount, "15 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("tomato ketchup"))?.amount, "60 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "Worcestershire-style sauce")?.amount, "40 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("granulated sugar"))?.amount, "20 g");
  assert.match(recipeStep(recipe, "Simmer the tonkatsu sauce").body.en, /15 ml soy sauce, 60 g ketchup, 40 ml Worcestershire-style sauce, and 20 g sugar/);
  assert.match(recipeStep(recipe, "Prepare cabbage and pork").body.en, /5 minutes/);
  assert.match(recipeStep(recipe, "Rest and heat the oil").body.en, /10 minutes/);

  for (const locale of localeOrder) {
    assert.match(recipeStep(recipe, "Drain and verify 63°C / 145°F").body[locale], /63(?:°C|℃)/,
      `${locale}: pork reaches the official 63°C endpoint`);
    assert.match(recipeStep(recipe, "Drain and verify 63°C / 145°F").body[locale], /3/,
      `${locale}: pork rests after reaching the endpoint`);
    assert.match(recipe.storage[locale], /74(?:°C|℃)/,
      `${locale}: leftovers are reheated to the official 74°C endpoint`);
  }
  for (const url of [foodSafetySource, "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"]) {
    assert.ok(recipe.sources.some((source) => source.url === url), `official food-safety source is credited: ${url}`);
  }
});

test("Cornish pasty allocates its divided ingredients and includes bake checks and resting time", () => {
  const recipe = auditedRecipes.get("cornish-pasty");
  assert.ok(recipe, "cornish-pasty slug exists");
  assert.equal(recipe.prepMinutes, 70);
  assert.equal(recipe.cookMinutes, 70, "cook time covers baking and the 15-minute rest");
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "14 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "beaten egg for glazing")?.amount, "50 g");
  assert.match(recipe.instructions[0].body.en, /500 g flour with 6 g salt/);
  assert.match(recipe.instructions[2].body.en, /remaining 8 g salt/);
  assert.match(recipe.instructions[4].body.en, /one sixth of the raw filling/);
  assert.match(recipe.instructions[6].body.en, /50 g beaten egg/);
  assert.deepEqual(summedExplicitMinutes([recipe.instructions.at(-1).body.en]), [65, 70]);

  for (const locale of localeOrder) {
    assert.match(recipe.instructions.at(-1).body[locale], /63(?:°C|℃)/,
      `${locale}: beef reaches its official endpoint`);
    assert.match(recipe.storage[locale], /74(?:°C|℃)/,
      `${locale}: leftovers are reheated to the official endpoint`);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official meat endpoint is credited");
  assert.ok(recipe.sources.some((source) => source.url === "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"));
});

test("carnitas allocates all salt and braising liquid, covers the long method, and verifies pork safety", () => {
  const recipe = auditedRecipes.get("carnitas");
  assert.ok(recipe, "carnitas slug exists");
  assert.equal(recipe.prepMinutes, 25);
  assert.equal(recipe.cookMinutes, 145);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "16 g");
  assert.match(recipe.instructions[0].body.en, /8 g of the salt and 250 ml water/);
  assert.match(recipe.instructions[2].body.en, /remaining 8 g salt/);
  assert.match(recipe.instructions[3].body.en, /remaining 450 ml water/);
  assert.match(recipe.instructions.at(-1).body.en, /18 tortillas.*6 batches of 3.*30 seconds per side/);
  const [, cookHigh] = summedExplicitMinutes(recipe.instructions.slice(1).map((step) => step.body.en));
  assert.ok(recipe.cookMinutes >= cookHigh + 6,
    `cook time ${recipe.cookMinutes} includes the timed braise/reduction/rest (${cookHigh} min) and six tortilla batches (6 min)`);

  for (const locale of localeOrder) {
    assert.match(recipeStep(recipe, "Simmer slowly and check the pork").body[locale], /63(?:°C|℃)/,
      `${locale}: pork reaches the official endpoint`);
    assert.match(recipe.storage[locale], /74(?:°C|℃)/,
      `${locale}: leftovers are reheated to the official endpoint`);
  }
  for (const url of [foodSafetySource, "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"]) {
    assert.ok(recipe.sources.some((source) => source.url === url), `official food-safety source is credited: ${url}`);
  }
});

test("rendang allocates salt, paste water, braising liquid, rice, and its 3-hour simmer in five languages", () => {
  const recipe = auditedRecipes.get("indonesian-beef-rendang");
  assert.ok(recipe, "indonesian-beef-rendang slug exists");
  assert.equal(recipe.prepMinutes, 35);
  assert.equal(recipe.cookMinutes, 180);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "8 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "water for blending the paste, use only as needed")?.amount, "60 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "water for the braise")?.amount, "250 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("dry jasmine rice"))?.amount, "360 g");
  assert.match(recipe.instructions[0].body.en, /4 g salt.*60 ml blending water.*10 minutes/);
  assert.match(recipe.instructions[1].body.en, /all 15 ml oil.*10 minutes/);
  assert.match(recipe.instructions[2].body.en, /1 kg beef.*400 ml coconut milk and 250 ml braising water/);
  assert.match(recipe.instructions[3].body.en, /140 minutes.*63°C \(145°F\)/);
  assert.match(recipe.instructions[4].body.en, /20 minutes.*remaining 4 g salt/);
  assert.match(recipe.instructions[5].body.en, /5 minutes.*360 g batch of cooked jasmine rice/);
  const timedCookStages = recipe.instructions.slice(1).map((step) => step.body.en.replaceAll(" every 10 minutes", " regularly"));
  assert.deepEqual(summedExplicitMinutes(timedCookStages), [180, 180],
    "10-minute paste toast, 5-minute beef coating, 140-minute simmer, 20-minute reduction, and 5-minute rest total 180 cook minutes");
  assert.ok(recipe.prepMinutes >= summedExplicitMinutes([recipe.instructions[0].body.en])[1], "prep covers the 10-minute paste and rice start");

  assert.ok(recipe.ingredients.every((row) => !/[\u0E00-\u0E7F]/u.test(row.item.ko)), "Korean ingredients contain no Thai-script copy-through");
  for (const locale of localeOrder) {
    assert.match(recipeStep(recipe, "Simmer until tender and verify temperature").body[locale], /63(?:°C|℃)/,
      `${locale}: beef reaches the official endpoint`);
    assert.match(recipe.storage[locale], /74(?:°C|℃)/,
      `${locale}: leftovers are reheated to the official endpoint`);
  }
  for (const url of [foodSafetySource, "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"]) {
    assert.ok(recipe.sources.some((source) => source.url === url), `official food-safety source is credited: ${url}`);
  }
});

test("Nigerian Jollof allocates oil and salt, covers cooking time, and follows cooked-rice safety", () => {
  const recipe = auditedRecipes.get("nigerian-jollof-rice");
  assert.ok(recipe, "Nigerian Jollof slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil")?.amount, "60 ml");
  assert.match(recipeStep(recipe, "Reduce the tomato sauce").body.en, /all 60 ml neutral oil/);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "7 g");
  assert.match(recipeStep(recipe, "Season the cooking liquid").body.en, /5 g salt/);
  assert.match(recipeStep(recipe, "Rest and serve").body.en, /remaining 2 g salt/);

  const [cookLow, cookHigh] = summedExplicitMinutes(recipe.instructions.slice(1).map((step) => step.body.en));
  assert.deepEqual([cookLow, cookHigh], [48, 56]);
  assert.ok(recipe.cookMinutes >= cookHigh, `cook time ${recipe.cookMinutes} covers the timed sauce, rice, and rest (${cookLow}–${cookHigh} min)`);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);

  const storagePatterns = {
    en: [/within 1 hour/, /within 24 hours/, /only once/],
    "zh-hant": [/1 小時內/, /24 小時內/, /一次/],
    ja: [/1時間以内/, /24時間以内/, /一度だけ/],
    ko: [/1시간 안에/, /24시간 안에/, /한 번만/],
    th: [/ภายใน 1 ชั่วโมง/, /ภายใน 24 ชั่วโมง/, /ครั้งเดียว/]
  };
  for (const locale of localeOrder) {
    for (const pattern of storagePatterns[locale]) assert.match(recipe.storage[locale], pattern, `${locale}: rice storage follows the FSA guidance`);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker"));
});

test("tandoori chicken allocates basting butter, counts the full oven method, and verifies every piece by thermometer", () => {
  const recipe = auditedRecipes.get("tandoori-chicken");
  assert.ok(recipe, "tandoori-chicken slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "melted butter or ghee for basting")?.amount, "30 g");
  assert.match(recipe.instructions[4].body.en, /15 g of the melted butter or ghee/);
  assert.match(recipe.instructions[5].body.en, /remaining 15 g butter or ghee/);
  assert.doesNotMatch(recipe.instructions.map((step) => step.body.en).join(" "), /juices run clear/i);
  assert.ok(recipe.prepMinutes >= 360, "prep covers the six-hour minimum marinade");
  const [cookLow, cookHigh] = summedExplicitMinutes(recipe.instructions.slice(3).map((step) => step.body.en));
  assert.deepEqual([cookLow, cookHigh], [52, 58], "cook time includes the 20-minute oven preheat, roast, broil, and rest");
  assert.ok(recipe.cookMinutes >= cookHigh);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);

  for (const locale of localeOrder) {
    assert.match(recipe.instructions[5].body[locale], /74°C/);
    assert.match(recipe.instructions[6].body[locale], /74°C/);
  }
  for (const url of [foodSafetySource, "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"]) {
    assert.ok(recipe.sources.some((source) => source.url === url), `official poultry/storage source is credited: ${url}`);
  }
});

test("marmitako allocates its broth and salt, covers the timed stew, and checks fish and leftovers safely", () => {
  const recipe = auditedRecipes.get("marmitako");
  assert.ok(recipe, "marmitako slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "extra-virgin olive oil")?.amount, "60 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "8 g");
  assert.match(recipe.instructions[0].body.en, /60 ml olive oil.*2 g salt/);
  assert.match(recipe.instructions[2].body.en, /1 L.*reserving 200 ml.*3 g salt/);
  assert.match(recipe.instructions[3].body.en, /100 ml.*final 100 ml stock.*remaining 3 g salt/);
  const [cookLow, cookHigh] = summedExplicitMinutes(recipe.instructions.map((step) => step.body.en));
  assert.deepEqual([cookLow, cookHigh], [55, 62]);
  assert.ok(recipe.cookMinutes >= cookHigh, `cook time ${recipe.cookMinutes} covers the timed stew (${cookLow}–${cookHigh} min)`);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);

  for (const locale of localeOrder) {
    assert.match(recipe.instructions[4].body[locale], /63°C/);
    assert.match(recipe.storage[locale], /74°C/);
  }
  for (const url of [foodSafetySource, "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"]) {
    assert.ok(recipe.sources.some((source) => source.url === url), `official fish/storage source is credited: ${url}`);
  }
});

test("Bánh flan allocates custard and serving ingredients, covers its waits and cooking range, and reaches a safe egg endpoint", () => {
  const recipe = auditedRecipes.get("banh-flan");
  assert.ok(recipe, "banh-flan slug exists");
  assert.match(recipe.instructions[1].body.en, /all 100 g white sugar with 40 ml water/);
  assert.match(recipe.instructions[2].body.en, /400 ml whole milk, 150 g sweetened condensed milk and 1 g salt/);
  assert.match(recipe.instructions[2].body.en, /5 ml vanilla extract/);
  assert.match(recipe.instructions[3].body.en, /3 large eggs and 2 egg yolks/);
  assert.match(recipe.instructions[7].body.en, /15 ml cold black coffee and 50 g crushed ice per serving/);
  assert.equal(15 * recipe.servings, 90, "optional coffee amount covers all six servings");
  assert.equal(50 * recipe.servings, 300, "optional ice amount covers all six servings");

  assert.ok(recipe.prepMinutes >= 30 + 240 + 10, "prep covers cooling the ramekins, caramel rest, and four-hour minimum chill");
  const timedCookStages = [
    recipe.instructions[1].body.en.replace("cool 10 minutes", ""),
    recipe.instructions[2].body.en,
    recipe.instructions[5].body.en
  ];
  const [cookLow, cookHigh] = summedExplicitMinutes(timedCookStages);
  assert.deepEqual([cookLow, cookHigh], [44, 57]);
  assert.ok(recipe.cookMinutes >= cookHigh);
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);

  for (const locale of localeOrder) assert.match(recipe.instructions[5].body[locale], /80–82°C/);
  for (const url of [foodSafetySource, "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"]) {
    assert.ok(recipe.sources.some((source) => source.url === url), `official egg/storage source is credited: ${url}`);
  }
});

test("audited recipe details, visible timing, ingredients, and Recipe JSON-LD agree in every locale", async () => {
  for (const id of auditedIds) {
    const recipe = auditedRecipes.get(id);
    assert.ok(recipe, `${id}: slug exists`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total is prep plus cook`);

    for (const locale of localeOrder) {
      const html = await readFile(`${dist}/${locale}/recipes/${id}/index.html`, "utf8");
      const schema = recipeSchema(html, id, locale);
      assert.equal(schema.prepTime, duration(recipe.prepMinutes), `${locale}/${id}: JSON-LD prep time`);
      assert.equal(schema.cookTime, duration(recipe.cookMinutes), `${locale}/${id}: JSON-LD cook time`);
      assert.equal(schema.totalTime, duration(recipe.totalMinutes), `${locale}/${id}: JSON-LD total time`);
      assert.equal(schema.recipeYield, String(recipe.servings), `${locale}/${id}: JSON-LD yield`);

      const meta = html.match(/<dl class="recipe-meta">([\s\S]*?)<\/dl>/)?.[1];
      assert.ok(meta, `${locale}/${id}: visible recipe timing exists`);
      const displayedMeta = [...meta.matchAll(/<dt>(.*?)<\/dt><dd>(.*?)<\/dd>/g)]
        .map(([, label, value]) => [decodeHtml(label), decodeHtml(value)]);
      assert.deepEqual(displayedMeta, [
        [recipeUi[locale].prep, formatRecipeTime(recipe.prepMinutes, locale)],
        [recipeUi[locale].cook, formatRecipeTime(recipe.cookMinutes, locale)],
        [recipeUi[locale].total, formatRecipeTime(recipe.totalMinutes, locale)],
        [recipeUi[locale].servings, String(recipe.servings)]
      ], `${locale}/${id}: visible timing matches data`);

      const ingredientBlock = html.match(/<section class="recipe-section ingredients-section"[\s\S]*?<ul>([\s\S]*?)<\/ul>/)?.[1];
      assert.ok(ingredientBlock, `${locale}/${id}: visible ingredient list exists`);
      const visibleIngredients = [...ingredientBlock.matchAll(/<li><span>(.*?)<\/span><p>(.*?)<\/p><\/li>/g)]
        .map(([, amount, item]) => `${decodeHtml(amount)} ${decodeHtml(item)}`);
      assert.deepEqual(schema.recipeIngredient, recipe.ingredients.map((row) => `${localized(row.amount, locale)} ${localized(row.item, locale)}`),
        `${locale}/${id}: JSON-LD ingredients match the authored recipe`);
      assert.deepEqual(visibleIngredients, schema.recipeIngredient, `${locale}/${id}: visible ingredients match JSON-LD`);

      const expectedInstructions = recipe.instructions.map((step) => localized(step.body, locale));
      assert.deepEqual(schema.recipeInstructions.map((step) => step.text), expectedInstructions,
        `${locale}/${id}: JSON-LD instructions match the authored recipe`);
      for (const instruction of expectedInstructions) {
        assert.ok(html.includes(instruction.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")),
          `${locale}/${id}: visible method contains its structured-data text`);
      }
    }
  }
});
