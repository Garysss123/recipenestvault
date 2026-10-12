import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { fill, localeOrder } from "../src/data.mjs";
import { recipeUi } from "../src/recipe-ui.mjs";
import { recipes } from "../src/recipes.mjs";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const foodSafetySource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const seafoodSafetySource = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const eggSafetySource = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const cookedRiceSafetySource = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";
const auditedIds = [
  "moussaka", "paella-valenciana", "poutine", "coq-au-vin",
  "bouillabaisse", "pissaladiere", "pasta-con-le-sarde", "stuffat-tal-fenek",
  "bibimbap", "bulgogi", "falafel", "shakshuka",
  "tonkatsu", "cornish-pasty", "carnitas", "indonesian-beef-rendang",
  "nigerian-jollof-rice", "tandoori-chicken", "marmitako", "banh-flan",
  "peruvian-ceviche", "nasi-goreng", "singapore-chilli-crab", "thieboudienne",
  "mohinga", "nepali-chicken-momo", "trinidad-doubles", "nasi-lemak",
  "mole-poblano", "bunny-chow", "cuban-ropa-vieja", "maultaschen",
  "fesenjan", "ukrainian-borscht", "tanzanian-pilau", "spaghetti-carbonara"
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

test("Peruvian ceviche uses previously frozen fish and states the FDA raw-seafood risk", () => {
  const recipe = auditedRecipes.get("peruvian-ceviche");
  assert.ok(recipe, "peruvian-ceviche slug exists");
  const fish = recipe.ingredients.find((row) => row.amount === "600 g");
  assert.match(fish.item.en, /previously frozen/i);
  assert.doesNotMatch(fish.item.en, /sashimi.grade/i, "the ingredient does not imply an unverified safety grade");

  const handling = recipeStep(recipe, "Keep the fish chilled");
  assert.match(handling.body.en, /previously frozen/i);
  assert.match(handling.body.en, /4°C or colder/);
  assert.match(handling.body.en, /freezing can kill parasites but does not kill all harmful germs/i);
  assert.match(handling.body.en, /lime juice does not make unsafe fish safe/i);
  const riskPatterns = {
    en: /Pregnant people.*children.*older adults.*weakened immune systems.*avoid raw or undercooked seafood/i,
    "zh-hant": /孕婦.*兒童.*長者.*免疫力低下者.*應避免生或未熟海鮮/,
    ja: /妊娠中の人.*子ども.*高齢者.*免疫機能が低下.*魚介類を避け/,
    ko: /임신부.*어린이.*고령자.*면역력이 약한 사람은.*해산물을 피/,
    th: /ผู้ตั้งครรภ์.*เด็ก.*ผู้สูงอายุ.*ผู้มีภูมิคุ้มกันอ่อนแอ.*หลีกเลี่ยงอาหารทะเลดิบหรือปรุงไม่สุก/
  };
  for (const locale of localeOrder) assert.match(handling.body[locale], riskPatterns[locale], `${locale}: raw-seafood risk is explicit`);
  assert.ok(recipe.sources.some((source) => source.url === seafoodSafetySource), "FDA raw-seafood guidance is credited");
});

test("nasi goreng follows the FSA cooling, 24-hour storage, and one-reheat rice guidance", () => {
  const recipe = auditedRecipes.get("nasi-goreng");
  assert.ok(recipe, "nasi-goreng slug exists");
  assert.match(recipe.ingredients.find((row) => row.amount === "700 g").item.en, /cooled as quickly as possible, ideally within 1 hour, then refrigerated/i);
  assert.match(recipe.instructions[0].body.en, /cooled as quickly as possible, ideally within 1 hour after cooking, and refrigerated/i);

  const patterns = {
    en: [/within 1 hour/i, /within 24 hours/i, /only once/i, /steaming hot all the way through/i],
    "zh-hant": [/1 小時內/, /24 小時內/, /一次/, /冒熱氣/],
    ja: [/1時間以内/, /24時間以内/, /一度だけ/, /湯気立つ/],
    ko: [/1시간 안에/, /24시간 안에/, /한 번만/, /김이 날/],
    th: [/1 ชั่วโมง/, /24 ชั่วโมง/, /ครั้งเดียว/, /มีไอทั่วถึง/]
  };
  const eggDoneness = {
    en: /both the whites and yolks are firm/i,
    "zh-hant": /蛋白與蛋黃都完全凝固/,
    ja: /白身と黄身の両方がしっかり固まり/,
    ko: /흰자와 노른자가 모두 단단히 익고/,
    th: /ทั้งไข่ขาวและไข่แดงสุกแน่น/
  };
  for (const locale of localeOrder) {
    for (const pattern of patterns[locale]) assert.match(recipe.storage[locale], pattern, `${locale}: rice storage guidance`);
    assert.match(recipe.instructions[4].body[locale], eggDoneness[locale],
      `${locale}: fried egg yolks and whites are fully firm`);
  }
  assert.ok(recipe.sources.some((source) => source.url === cookedRiceSafetySource), "Food Standards Agency rice guidance is credited");
});

test("Singapore chilli crab allocates its ingredients and checks crab and egg sauce doneness", () => {
  const recipe = auditedRecipes.get("singapore-chilli-crab");
  assert.ok(recipe, "singapore-chilli-crab slug exists");
  const method = recipe.instructions.map((step) => step.body.en).join(" ");
  for (const amount of [
    /180 g onion/, /25 g garlic/, /35 g fresh red chillies/, /all 30 ml neutral oil/,
    /400 g crushed tomatoes/, /250 ml fish stock or water/, /30 ml soy sauce/, /25 g palm sugar/,
    /1\.2 kg crab pieces/, /10 g cornstarch/, /30 ml cold water/, /1 lightly beaten egg/,
    /71°C \(160°F\)/, /3 thinly sliced green spring onions/, /all 4 warm mantou buns/
  ]) assert.match(method, amount, `method allocates ${amount}`);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("spring onions"))?.amount, "3");

  const crab = recipe.instructions[3];
  const crabPatterns = {
    en: /firm, pearly white and opaque/,
    "zh-hant": /結實、呈珍珠白且不透明/,
    ja: /身が締まり、真珠のように白く不透明/,
    ko: /단단하고 진주빛 흰색을 띠며 불투명/,
    th: /แน่น ขาวมุกและทึบแสง/
  };
  for (const locale of localeOrder) {
    assert.match(crab.body[locale], crabPatterns[locale], `${locale}: crab flesh reaches the official visual endpoint`);
    assert.match(recipe.instructions[4].body[locale], /71°C/, `${locale}: egg sauce reaches the egg-dish endpoint`);
  }
  assert.ok(recipe.sources.some((source) => source.url === seafoodSafetySource), "FDA crab doneness guidance is credited");
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov egg temperature is credited");
});

test("thieboudienne verifies each fish steak at the official seafood temperature", () => {
  const recipe = auditedRecipes.get("thieboudienne");
  assert.ok(recipe, "thieboudienne slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil")?.amount, "60 ml");
  const oilAllocation = {
    en: /all 60 ml neutral oil/i,
    "zh-hant": /全部 60 毫升中性油/,
    ja: /中性油60mlをすべて/,
    ko: /중성 식용유 60ml를 모두/,
    th: /น้ำมันรสกลางทั้งหมด 60 มล./
  };
  for (const locale of localeOrder) {
    assert.match(recipe.instructions[2].body[locale], oilAllocation[locale],
      `${locale}: the full 60 ml neutral oil is allocated to the tomato base`);
    assert.match(recipe.instructions[4].body[locale], /63°C/, `${locale}: fish reaches 63°C (145°F)`);
    assert.match(recipe.instructions[4].body[locale], /thermometer|溫度計|温度計|온도계|เทอร์โมมิเตอร์/i,
      `${locale}: each steak is checked with a food thermometer`);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official seafood temperature source is credited");
});

test("mohinga allocates its aromatic-base oil amount in all five locales", () => {
  const recipe = auditedRecipes.get("mohinga");
  assert.ok(recipe, "mohinga slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil")?.amount, "15 ml");

  const allocations = {
    en: /all 15 ml neutral oil/i,
    "zh-hant": /全部 15 毫升中性油/,
    ja: /中性油15mlをすべて/,
    ko: /중성 식용유 15ml를 모두/,
    th: /น้ำมันรสกลางทั้งหมด 15 มล./
  };
  for (const locale of localeOrder) {
    assert.match(recipe.instructions[2].body[locale], allocations[locale], `${locale}: all listed oil is allocated`);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource),
    "official fish doneness guidance supports the existing flaking endpoint");
});

test("momo filling and achar allocate every garlic, sesame, chili, and salt amount", () => {
  const recipe = auditedRecipes.get("nepali-chicken-momo");
  assert.ok(recipe, "nepali-chicken-momo slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("garlic, minced"))?.amount, "20 g");
  assert.ok(recipe.ingredients.some((row) => row.item.en === "fresh red chili, minced for achar"));
  assert.ok(recipe.ingredients.some((row) => row.item.en === "fine salt for achar"));
  const filling = recipeStep(recipe, "Season the filling");
  const achar = recipeStep(recipe, "Make the tomato achar");
  const fillingPatterns = {
    en: /15 g of the garlic[\s\S]*5 g salt/,
    "zh-hant": /15 公克蒜末[\s\S]*5 公克鹽/,
    ja: /にんにく15g[\s\S]*塩5g/,
    ko: /마늘 15g[\s\S]*소금 5g/,
    th: /กระเทียม 15 กรัม[\s\S]*เกลือ 5 กรัม/
  };
  const acharPatterns = {
    en: /all 15 g toasted sesame[\s\S]*reserved 5 g garlic[\s\S]*all 3 g fresh red chili[\s\S]*3 g fine salt/,
    "zh-hant": /全部 15 公克烘香芝麻[\s\S]*保留的 5 公克大蒜[\s\S]*全部 3 公克新鮮紅辣椒[\s\S]*3 公克細鹽/,
    ja: /炒りごま15gすべて[\s\S]*にんにく5g[\s\S]*赤唐辛子3gすべて[\s\S]*細塩3g/,
    ko: /참깨 15g 전량[\s\S]*마늘 5g[\s\S]*홍고추 3g 전량[\s\S]*소금 3g/,
    th: /งาคั่วทั้งหมด 15 กรัม[\s\S]*กระเทียมที่แบ่งไว้ 5 กรัม[\s\S]*พริกแดงสดทั้งหมด 3 กรัม[\s\S]*เกลือละเอียด 3 กรัม/
  };
  for (const locale of localeOrder) {
    assert.match(filling.body[locale], fillingPatterns[locale], `${locale}: filling amounts are explicit`);
    assert.match(achar.body[locale], acharPatterns[locale], `${locale}: achar amounts are explicit`);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://nepalesetaste.com/recipes/momo-achar/"),
    "achar ingredient reference is credited");
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource),
    "official poultry endpoint is credited");
});

test("Trinidad doubles separates dough and curry seasoning from the frying oil in all locales", () => {
  const recipe = auditedRecipes.get("trinidad-doubles");
  assert.ok(recipe, "trinidad-doubles slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt, divided"))?.amount, "6 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil for channa")?.amount, "15 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil for shallow frying")?.amount, "450 ml");

  const dough = recipeStep(recipe, "Mix and rest the bara dough");
  const channa = recipeStep(recipe, "Season the channa");
  const seasoning = recipeStep(recipe, "Finish the chickpea curry");
  const doughPatterns = {
    en: /3 g fine salt/,
    "zh-hant": /3 公克細鹽/,
    ja: /細塩3g/,
    ko: /고운 소금 3g/,
    th: /เกลือละเอียด 3 กรัม/
  };
  const oilPatterns = {
    en: /all 15 ml neutral oil/,
    "zh-hant": /全部 15 毫升中性油/,
    ja: /中性油15mlをすべて/,
    ko: /중성 식용유 15ml를 모두/,
    th: /น้ำมันรสกลางทั้งหมด 15 มล./
  };
  const saltPatterns = {
    en: /up to the remaining 3 g fine salt/,
    "zh-hant": /最多剩餘 3 公克細鹽/,
    ja: /残りの細塩を最大3g/,
    ko: /남은 고운 소금을 최대 3g/,
    th: /เกลือละเอียดส่วนที่เหลือไม่เกิน 3 กรัม/
  };
  for (const locale of localeOrder) {
    assert.match(dough.body[locale], doughPatterns[locale], `${locale}: dough salt is measured`);
    assert.match(channa.body[locale], oilPatterns[locale], `${locale}: channa oil is measured`);
    assert.match(seasoning.body[locale], saltPatterns[locale], `${locale}: remaining salt is allocated`);
  }
  for (const locale of localeOrder) assert.match(recipeStep(recipe, "Fry the bara").body[locale], /450/,
    `${locale}: listed frying oil is allocated in the frying method`);
});

test("nasi lemak egg endpoint follows FDA guidance in all locales", () => {
  const recipe = auditedRecipes.get("nasi-lemak");
  assert.ok(recipe, "nasi-lemak slug exists");
  const eggs = recipeStep(recipe, "Cook the eggs and cucumber");
  const firmPatterns = {
    en: /both the whites and yolks are firm/,
    "zh-hant": /蛋白與蛋黃都凝固/,
    ja: /白身と黄身の両方が固まる/,
    ko: /흰자와 노른자가 모두 단단해질/,
    th: /ทั้งไข่ขาวและไข่แดงแข็งตัว/
  };
  for (const locale of localeOrder) assert.match(eggs.body[locale], firmPatterns[locale], `${locale}: egg endpoint is explicit`);
  assert.ok(eggs.body.en.includes("pasteurized eggs"), "undercooked preference directs to pasteurized eggs");
  assert.ok(recipe.sources.some((source) => source.url === eggSafetySource), "FDA egg safety guidance is credited");
});

test("mole poblano allocates its listed oil and sesame and checks poultry safety in all locales", () => {
  const recipe = auditedRecipes.get("mole-poblano");
  assert.ok(recipe, "mole-poblano slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil or lard")?.amount, "80 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "sesame seeds")?.amount, "80 g");
  assert.match(recipeStep(recipe, "Brown the nuts and seeds").body.en, /20 ml of the listed oil/);
  assert.match(recipeStep(recipe, "Toast the tortilla and bread").body.en, /20 ml of the listed oil/);
  assert.match(recipeStep(recipe, "Fry the mole puree").body.en, /remaining 40 ml oil/);
  assert.match(recipeStep(recipe, "Toast the sesame seeds").body.en, /Reserve 20 g.*remaining 60 g/);

  const chicken = recipeStep(recipe, "Poach the chicken gently");
  const brownNuts = recipeStep(recipe, "Brown the nuts and seeds");
  const bread = recipeStep(recipe, "Toast the tortilla and bread");
  const fryPuree = recipeStep(recipe, "Fry the mole puree");
  const fatPatterns = {
    en: [/20 ml of the listed oil or melted lard/, /20 ml of the listed oil or melted lard/, /remaining 40 ml oil or melted lard/],
    "zh-hant": [/20 毫升油或融化豬油/, /20 毫升油或融化豬油/, /剩餘 40 毫升油或融化豬油/],
    ja: [/油または溶かしたラード20ml/, /油または溶かしたラード20ml/, /残りの油または溶かしたラード40ml/],
    ko: [/기름 또는 녹인 라드 20ml/, /기름 또는 녹인 라드 20ml/, /남은 기름 또는 녹인 라드 40ml/],
    th: [/น้ำมันหรือน้ำมันหมูละลายตามรายการ 20 มล\./, /น้ำมันหรือน้ำมันหมูละลายตามรายการ 20 มล\./, /น้ำมันหรือน้ำมันหมูละลายที่เหลือ 40 มล\./]
  };
  const safetyPatterns = {
    en: /74°C \(165°F\)/,
    "zh-hant": /74°C（165°F）/,
    ja: /74°C（165°F）/,
    ko: /74°C\(165°F\)/,
    th: /74°C \(165°F\)/
  };
  for (const locale of localeOrder) {
    [brownNuts, bread, fryPuree].forEach((step, index) =>
      assert.match(step.body[locale], fatPatterns[locale][index], `${locale}: existing 80 ml oil-or-lard amount is allocated`));
    assert.match(chicken.body[locale], safetyPatterns[locale], `${locale}: chicken reaches official poultry endpoint`);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov poultry guidance is credited");
  assert.equal(recipe.cookMinutes, 115, "the site cook estimate reflects the timed method");
});

test("bunny chow explicitly assigns its oil and times the lamb curry", () => {
  const recipe = auditedRecipes.get("bunny-chow");
  assert.ok(recipe, "bunny-chow slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil")?.amount, "60 ml");
  assert.match(recipeStep(recipe, "Brown the mutton").body.en, /30 ml of the listed oil.*8–10 minutes/);
  assert.match(recipeStep(recipe, "Fry the Durban masala").body.en, /remaining 30 ml oil.*8–10 minutes.*1 minute/);
  assert.match(recipeStep(recipe, "Build the tomato curry").body.en, /5–8 minutes.*all 700 ml stock.*60–90 minutes/);
  assert.match(recipeStep(recipe, "Add potatoes and finish the curry").body.en, /600 g potatoes.*15–20 minutes/);
  const browned = recipeStep(recipe, "Brown the mutton");
  const onions = recipeStep(recipe, "Fry the Durban masala");
  const lambTimes = {
    en: [/30 ml of the listed oil/, /8–10 minutes/],
    "zh-hant": [/30 毫升油/, /8–10 分鐘/],
    ja: [/油30ml/, /8〜10分/],
    ko: [/기름 30ml/, /8–10분/],
    th: [/น้ำมันตามรายการ 30 มล\./, /8–10 นาที/]
  };
  for (const locale of localeOrder) {
    for (const pattern of lambTimes[locale]) assert.match(browned.body[locale], pattern, `${locale}: lamb browning amount and time`);
    assert.match(onions.body[locale], locale === "ja" ? /残りの油30ml.*8〜10分/ : /30.*8.*10/,
      `${locale}: remaining oil and onion timing are translated`);
  }
  assert.equal(recipe.cookMinutes, 120, "the site estimate sits within the chosen braise range");
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
});

test("ropa vieja uses every listed ingredient and labels editorial seasoning amounts", () => {
  const recipe = auditedRecipes.get("cuban-ropa-vieja");
  assert.ok(recipe, "cuban-ropa-vieja slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.amount, "6 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "ground black pepper")?.amount, "1 g");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.item.en ?? "", /divided 3 g for the beef and up to 3 g to finish/);
  assert.match(recipeStep(recipe, "Braise the beef").body.en, /full 1\.5 L water or unsalted beef stock.*90–135 minutes/);
  assert.match(recipeStep(recipe, "Cool and shred").body.en, /reserve all the broth.*reduce it by about half for 20–30 minutes/);
  assert.match(recipeStep(recipe, "Soften the sofrito").body.en, /all 30 ml olive oil.*250 g onion and 300 g green pepper.*all 25 g garlic/);
  assert.match(recipeStep(recipe, "Build the tomato sauce").body.en, /all 40 g tomato paste.*1 g black pepper.*all 400 g crushed tomatoes.*15 ml vinegar.*all the reduced broth/);
  assert.match(recipeStep(recipe, "Fold in the beef").body.en, /all the shredded beef.*10 minutes/);
  assert.match(recipeStep(recipe, "Adjust and serve").body.en, /up to the remaining 3 g salt.*all 600 g cooked rice and 400 g black beans among the six servings/);
  const saltFinish = recipeStep(recipe, "Adjust and serve");
  const finishPatterns = {
    en: /up to the remaining 3 g salt.*six servings/,
    "zh-hant": /最多剩餘 3 公克鹽.*分配到六份/,
    ja: /残りの塩を最大3g.*6人分/,
    ko: /남은 소금 최대 3g.*6인분/,
    th: /เกลือที่เหลือไม่เกิน 3 กรัม.*6 ส่วน/
  };
  for (const locale of localeOrder) assert.match(saltFinish.body[locale], finishPatterns[locale], `${locale}: seasoning and servings`);
  assert.equal(recipe.cookMinutes, 190, "the existing cook estimate remains within source-based method timing");
});

test("maultaschen portion count and ground-meat safety endpoint agree across locales", () => {
  const recipe = auditedRecipes.get("maultaschen");
  assert.ok(recipe, "maultaschen slug exists");
  assert.equal(recipe.servings, 6);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "beef mince")?.amount, "250 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "pork sausage meat or pork mince")?.amount, "250 g");
  assert.match(recipeStep(recipe, "Fill in an even row").body.en, /18 equal portions \(3 per serving\)/);

  const simmer = recipeStep(recipe, "Simmer in batches");
  const safetyPatterns = {
    en: /71°C \(160°F\)/,
    "zh-hant": /71°C（160°F）/,
    ja: /71°C（160°F）/,
    ko: /71°C\(160°F\)/,
    th: /71°C \(160°F\)/
  };
  for (const locale of localeOrder) assert.match(simmer.body[locale], safetyPatterns[locale], `${locale}: ground meat reaches 71°C / 160°F`);
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov ground-meat guidance is credited");
});

test("fesenjan assigns saffron to rice and follows official poultry guidance in all locales", () => {
  const recipe = auditedRecipes.get("fesenjan");
  assert.ok(recipe, "fesenjan slug exists");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.amount, "10 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("saffron threads"))?.amount, "0.2 g");
  assert.equal(recipe.cookMinutes, 100);
  assert.equal(recipe.totalMinutes, 125);

  const braise = recipeStep(recipe, "Braise gently until tender");
  const finish = recipeStep(recipe, "Balance the sweet-sour sauce");
  const walnuts = recipeStep(recipe, "Toast and grind the walnuts");
  const rice = recipeStep(recipe, "Serve with Persian rice");
  const timePatterns = {
    en: /45–75 minutes/,
    "zh-hant": /45–75 分鐘/,
    ja: /45〜75分/,
    ko: /45–75분/,
    th: /45–75 นาที/
  };
  const safetyPatterns = {
    en: /74°C \(165°F\)/,
    "zh-hant": /74°C（165°F）/,
    ja: /74°C（165°F）/,
    ko: /74°C\(165°F\)/,
    th: /74°C \(165°F\)/
  };
  const saltPatterns = {
    en: /remaining 4 g salt/,
    "zh-hant": /剩餘 4 公克鹽/,
    ja: /残りの塩4g/,
    ko: /남은 소금 4g/,
    th: /เกลือที่เหลือ 4 กรัม/
  };
  const ricePatterns = {
    en: /30 ml blooming water through the 600 g cooked basmati rice/,
    "zh-hant": /30 毫升水拌入 600 公克熟印度香米/,
    ja: /戻し湯30mlを炊いたバスマティライス600gに混ぜ/,
    ko: /우린 물 30ml를 지은 바스마티쌀 600g에 섞/,
    th: /น้ำแช่ 30 มล\.กับข้าวบาสมาตีสุก 600 กรัม/
  };
  const bloomPatterns = {
    en: /crumble the threads into the listed 30 ml warm water.*bloom/,
    "zh-hant": /花絲揉碎.*30 毫升溫水.*泡開/,
    ja: /糸を砕いて.*ぬるま湯30ml.*戻します/,
    ko: /실을 부숴.*따뜻한 물 30ml.*우립니다/,
    th: /ขยี้เส้น.*น้ำอุ่น 30 มล\..*พักให้สีออก/
  };
  for (const locale of localeOrder) {
    assert.match(braise.body[locale], timePatterns[locale], `${locale}: braise time is translated`);
    assert.match(braise.body[locale], safetyPatterns[locale], `${locale}: official chicken endpoint is translated`);
    assert.match(walnuts.body[locale], bloomPatterns[locale], `${locale}: optional saffron bloom is actionable`);
    assert.match(finish.body[locale], saltPatterns[locale], `${locale}: sauce salt allocation is explicit`);
    assert.match(rice.body[locale], ricePatterns[locale], `${locale}: optional saffron is assigned to rice`);
  }
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov poultry guidance is credited");
});

test("Ukrainian borshch has timed stages, assigned oil and salt, and correct dish references", () => {
  const recipe = auditedRecipes.get("ukrainian-borscht");
  assert.ok(recipe, "ukrainian-borscht slug exists");
  assert.equal(recipe.cookMinutes, 100);
  assert.equal(recipe.totalMinutes, 135);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil"))?.amount, "30 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.amount, "6 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "ground black pepper")?.amount, "1 g");
  assert.ok(recipe.sources.some((source) => source.url === "https://www.theguardian.com/food/2020/sep/28/papushkas-borscht-by-olia-hercules"),
    "a direct borshch recipe reference replaces the unrelated soup link");

  const broth = recipeStep(recipe, "Make the pork broth");
  const beet = recipeStep(recipe, "Sauté the beet and carrot");
  const onion = recipeStep(recipe, "Soften the onion");
  const vegetables = recipeStep(recipe, "Cook the potatoes and cabbage");
  const finish = recipeStep(recipe, "Combine and simmer");
  const timingPatterns = {
    en: [/45–60 minutes/, /8–10 minutes/, /5–7 minutes/, /8–10 minutes[\s\S]*8–10 minutes/, /5–8 minutes/],
    "zh-hant": [/45–60 分鐘/, /8–10 分鐘/, /5–7 分鐘/, /8–10 分鐘[\s\S]*8–10 分鐘/, /5–8 分鐘/],
    ja: [/45〜60分/, /8〜10分/, /5〜7分/, /8〜10分[\s\S]*8〜10分/, /5〜8分/],
    ko: [/45–60분/, /8–10분/, /5–7분/, /8–10분[\s\S]*8–10분/, /5–8분/],
    th: [/45–60 นาที/, /8–10 นาที/, /5–7 นาที/, /8–10 นาที[\s\S]*8–10 นาที/, /5–8 นาที/]
  };
  for (const locale of localeOrder) {
    [broth, beet, onion, vegetables, finish].forEach((step, index) =>
      assert.match(step.body[locale], timingPatterns[locale][index], `${locale}: borshch stage ${index + 1} has a localized time`));
  }
  const allocations = {
    en: [/15 ml oil/, /remaining 15 ml oil/, /4 g salt/, /up to 2 g salt and the black pepper/],
    "zh-hant": [/15 毫升油/, /剩餘 15 毫升油/, /4 公克鹽/, /最多 2 公克鹽和黑胡椒/],
    ja: [/油15ml/, /残りの油15ml/, /塩4g/, /塩（最大2g）と黒こしょう/],
    ko: [/기름 15ml/, /남은 기름 15ml/, /소금 4g/, /남은 소금 최대 2g과 후추/],
    th: [/น้ำมัน 15 มล\./, /น้ำมันที่เหลือ 15 มล\./, /เกลือ 4 กรัม/, /เกลือที่เหลือไม่เกิน 2 กรัมและพริกไทย/]
  };
  for (const locale of localeOrder) {
    [beet, onion, broth, finish].forEach((step, index) =>
      assert.match(step.body[locale], allocations[locale][index], `${locale}: oil/salt allocation ${index + 1}`));
  }
});

test("Tanzanian pilau times the beef and rice and bounds stock use in all locales", () => {
  const recipe = auditedRecipes.get("tanzanian-pilau");
  assert.ok(recipe, "tanzanian-pilau slug exists");
  assert.equal(recipe.cookMinutes, 90);
  assert.equal(recipe.totalMinutes, 115);
  const beef = recipeStep(recipe, "Brown and tenderize the beef");
  const onions = recipeStep(recipe, "Brown the onions deeply");
  const broth = recipeStep(recipe, "Coat rice and add broth");
  const rice = recipeStep(recipe, "Simmer covered until the rice is done");
  const patterns = {
    en: [/25–35 minutes/, /15–20 minutes/, /remaining 650 ml[\s\S]*950 ml stock in total/, /20–25 minutes/],
    "zh-hant": [/25–35 分鐘/, /15–20 分鐘/, /剩餘 650 毫升[\s\S]*總高湯量不超過 950 毫升/, /20–25 分鐘/],
    ja: [/25〜35分/, /15〜20分/, /残りの温かいだし650ml[\s\S]*950mlを超えません/, /20〜25分/],
    ko: [/25–35분/, /15–20분/, /남은 따뜻한 육수 650ml[\s\S]*950ml를 넘기지 않습니다/, /20–25분/],
    th: [/25–35 นาที/, /15–20 นาที/, /สต็อกร้อนที่เหลือ 650 มล\.[\s\S]*ไม่เกิน 950 มล\./, /20–25 นาที/]
  };
  for (const locale of localeOrder) {
    [beef, onions, broth, rice].forEach((step, index) =>
      assert.match(step.body[locale], patterns[locale][index], `${locale}: pilau stage ${index + 1} has clear timing/quantity`));
  }
});

test("carbonara egg ingredients and method follow FDA pasteurized-egg guidance in all locales", () => {
  const recipe = auditedRecipes.get("spaghetti-carbonara");
  assert.ok(recipe, "spaghetti-carbonara slug exists");
  assert.ok(recipe.ingredients.some((row) => row.item.en === "large pasteurized egg yolks"));
  assert.ok(recipe.ingredients.some((row) => row.item.en === "large pasteurized whole egg"));
  assert.ok(recipe.sources.some((source) => source.url === eggSafetySource), "FDA egg safety guidance is credited");
  const eggBase = recipeStep(recipe, "Mix the egg base");
  const pasteurizedPatterns = {
    en: /shell eggs sold as pasteurized.*pasteurized egg products/,
    "zh-hant": /巴氏殺菌的帶殼蛋或巴氏殺菌蛋品/,
    ja: /殺菌済み表示の殻付き卵、または殺菌済み卵製品/,
    ko: /살균 표시가 있는 껍데기 달걀이나 살균 달걀 제품/,
    th: /ไข่เปลือกที่ระบุว่าพาสเจอไรซ์หรือผลิตภัณฑ์ไข่พาสเจอไรซ์/
  };
  for (const locale of localeOrder) assert.match(eggBase.body[locale], pasteurizedPatterns[locale], `${locale}: pasteurized eggs are specified`);
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
