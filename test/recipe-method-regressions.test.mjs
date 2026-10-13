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
const crossContaminationSource = "https://www.gov.uk/government/publications/why-avoiding-cross-contamination-is-important/why-avoiding-cross-contamination-is-important";
const auditedIds = [
  "moussaka", "paella-valenciana", "poutine", "coq-au-vin",
  "bouillabaisse", "pissaladiere", "pasta-con-le-sarde", "stuffat-tal-fenek",
  "bibimbap", "bulgogi", "falafel", "shakshuka",
  "tonkatsu", "cornish-pasty", "carnitas", "indonesian-beef-rendang",
  "nigerian-jollof-rice", "tandoori-chicken", "marmitako", "banh-flan",
  "peruvian-ceviche", "nasi-goreng", "singapore-chilli-crab", "thieboudienne",
  "mohinga", "nepali-chicken-momo", "trinidad-doubles", "nasi-lemak",
  "mole-poblano", "bunny-chow", "cuban-ropa-vieja", "maultaschen",
  "fesenjan", "ukrainian-borscht", "tanzanian-pilau", "spaghetti-carbonara",
  "mercimek-corbasi", "pierogi-ruskie", "cambodian-fish-amok", "lao-chicken-larb",
  "caponata", "baklava", "malva-pudding", "pancit-bihon",
  "feijoada", "imeretian-khachapuri", "tamales-de-pollo-en-salsa-verde", "huevos-rancheros",
  "harira", "mujadara", "maafe", "bobotie",
  "chicken-shawarma", "zaatar-manakish", "jambalaya", "thit-kho-trung",
  "chicken-and-sausage-gumbo", "pozole-rojo", "tortilla-espanola", "nuernberger-rostbratwurst",
  "moqueca-baiana", "nigerian-egusi-soup", "lu-rou-fan", "bo-kho",
  "khao-man-gai", "goan-fish-curry", "sri-lankan-egg-hoppers", "shepherds-pie",
  "tourtiere", "cocido-madrileno", "enchiladas-verdes", "taiwanese-beef-noodle-soup",
  "doro-wat", "filipino-chicken-adobo", "uzbek-plov", "jamaican-jerk-chicken",
  "oyakodon", "galbi", "bobo-de-camarao", "jiggs-dinner",
  "kung-pao-chicken", "twice-cooked-pork", "dan-dan-noodles", "tomato-egg-stir-fry",
  "chicken-karaage", "chawanmushi", "kimchi-fried-rice", "pork-souvlaki",
  "gyeran-jjim", "omurice", "samgyeopsal", "wonton-soup",
  "gyudon", "jiaozi", "tamagoyaki", "yakitori",
  "katsudon", "tom-yum-goong", "avgolemono", "apple-pie",
  "chicken-tikka-masala", "pad-kra-pao", "gambas-al-ajillo", "churrasco-picanha",
  "char-siu", "hyderabadi-chicken-biryani", "tempura", "lamingtons",
  "sweet-sour-pork", "japanese-gyoza", "beef-wellington", "fish-and-chips",
  "roast-beef-yorkshire-pudding", "buffalo-wings", "meatloaf", "pescado-a-la-veracruzana",
  "nikujaga", "southern-fried-chicken", "halifax-donair", "cochinita-pibil",
  "ossobuco-alla-milanese", "arancini-siciliani", "bavarian-krustenbraten", "nyama-choma",
  "rogan-josh", "toad-in-the-hole", "calamares-a-la-romana", "shiro-wat",
  "iraqi-lamb-kofta", "currywurst", "feijao-tropeiro", "vatapa",
  "chocolate-mousse", "saltimbocca-alla-romana", "tagliatelle-ragu-bolognese", "pisto-manchego",
  "taiwanese-oil-rice", "lablabi", "clafoutis", "beef-stifado",
  "quindim", "butter-tarts", "pastitsio", "danzai-noodles",
  "fabada-asturiana", "peameal-bacon-sandwich", "dan-bing", "kartoffelpuffer",
  "moo-ping", "gai-yang", "haemul-pajeon", "brik-a-loeuf",
  "oyster-omelette", "mandu", "bun-rieu", "cha-gio",
  "rinderrouladen", "crni-rizot", "khao-pad", "memphis-style-ribs",
  "pineapple-fried-rice", "fideua", "bun-cha", "cao-lau",
  "gimbap", "rice-kheer", "gua-bao", "spanakopita",
  "new-england-clam-chowder", "acaraje", "croquetas-de-jamon", "arroz-carreteiro",
  "onigiri", "coxinha", "frikadellen", "chiles-rellenos",
  "beef-chow-fun", "clay-pot-rice", "taiwanese-tea-eggs", "moules-marinieres",
  "japanese-curry", "spaghetti-alle-vongole", "arroz-con-leche", "full-english-breakfast",
  "idli-sambar", "shoyu-ramen", "koenigsberger-klopse", "traditional-trifle",
  "bossam", "sole-meuniere", "pani-puri", "banh-cuon",
  "peking-duck", "som-tam", "bun-thit-nuong", "goi-cuon",
  "taiwanese-sausage", "milkfish-congee", "larb-moo", "banh-mi-thit",
  "taiwanese-popcorn-chicken", "rajma-masala", "pho-ga", "bacalao-al-pil-pil",
  "dakgalbi", "ca-kho-to", "keftedes", "samosa",
  "tod-mun-pla", "poulet-basquaise", "chocolate-chip-cookies", "japchae",
  "risotto-alla-milanese", "lasagne-bolognese", "small-sausage-big-sausage", "pulpo-a-la-gallega",
  "three-cup-chicken", "chiayi-turkey-rice", "banh-xeo", "pollo-alla-cacciatora"
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

test("Turkish lentil soup assigns its oil and seasonings and gives useful stage times", () => {
  const recipe = auditedRecipes.get("mercimek-corbasi");
  assert.ok(recipe, "mercimek-corbasi slug exists");
  assert.equal(recipe.cookMinutes, 35);
  assert.equal(recipe.totalMinutes, 50);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("olive oil"))?.amount, "45 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.amount, "8 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "ground black pepper")?.amount, "1 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("ground Aleppo pepper"))?.amount, "2 g");

  const oil = recipeStep(recipe, "Soften the aromatics");
  const paste = recipeStep(recipe, "Toast tomato paste and spices");
  const simmer = recipeStep(recipe, "Simmer the lentils and broth");
  const finish = recipeStep(recipe, "Make paprika butter and serve");
  const patterns = {
    en: [/all 45 ml olive oil/, /1 minute/, /4–5 minutes[\s\S]*15–20 minutes/, /all 40 g butter[\s\S]*2 g Aleppo pepper[\s\S]*30–45 seconds[\s\S]*remaining 2 g salt[\s\S]*1 g black pepper/],
    "zh-hant": [/全部 45 毫升橄欖油/, /1 分鐘/, /4–5 分鐘[\s\S]*15–20 分鐘/, /全部 40 公克奶油[\s\S]*2 公克 Aleppo 辣椒粉[\s\S]*30–45 秒[\s\S]*2 公克鹽[\s\S]*1 公克黑胡椒/],
    ja: [/オリーブ油45ml全量/, /1分/, /4〜5分[\s\S]*15〜20分/, /バター40g全量[\s\S]*アレッポペッパー2g[\s\S]*30〜45秒[\s\S]*塩を最大2g[\s\S]*黒こしょう1g/],
    ko: [/올리브오일 45ml 전량/, /1분/, /4–5분[\s\S]*15–20분/, /버터 40g 전량[\s\S]*알레포 고추 2g[\s\S]*30–45초[\s\S]*최대 2g[\s\S]*1g 전량/],
    th: [/น้ำมันมะกอกทั้งหมด 45 มล\./, /1 นาที/, /4–5 นาที[\s\S]*15–20 นาที/, /เนยทั้งหมด 40 กรัม[\s\S]*พริกอเลปโป 2 กรัม[\s\S]*30–45 วินาที[\s\S]*ไม่เกิน 2 กรัม[\s\S]*1 กรัม/]
  };
  for (const locale of localeOrder) {
    [oil, paste, simmer, finish].forEach((step, index) => assert.match(step.body[locale], patterns[locale][index], `${locale}: lentil soup stage ${index + 1}`));
    assert.doesNotMatch(recipe.instructions.map((step) => step.body[locale]).join(" "), /\d+\s*°\s*[CF]/, `${locale}: no unnecessary temperature was added`);
  }
});

test("pierogi method allocates ingredients, gives a six-serving count, and times the work", () => {
  const recipe = auditedRecipes.get("pierogi-ruskie");
  assert.ok(recipe, "pierogi-ruskie slug exists");
  assert.equal(recipe.prepMinutes, 70);
  assert.equal(recipe.cookMinutes, 45);
  assert.equal(recipe.totalMinutes, 115);
  assert.equal(recipe.servings, 6);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("salt, divided"))?.amount, "8 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("sour cream"))?.amount, "120 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("water for boiling"))?.amount, "3 L");
  assert.ok(recipe.sources.some((source) => source.url === "https://www.bbcgoodfood.com/recipes/pierogi-ruskie"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.gov.pl/web/rolnictwo/pierogi-ruskie-z-chrzastawy"));

  const potatoes = recipeStep(recipe, "Cook the potatoes");
  const onion = recipeStep(recipe, "Brown the onion");
  const dough = recipeStep(recipe, "Make the filling and dough");
  const shape = recipeStep(recipe, "Roll and cut the wrappers");
  const fill = recipeStep(recipe, "Fill and seal");
  const boil = recipeStep(recipe, "Boil gently until they float");
  const timing = {
    en: [/15–20 minutes/, /8–10 minutes/, /5–6 minutes[\s\S]*20–30 minutes/, /48 rounds/, /22 g[\s\S]*48 pierogi[\s\S]*8 per serving/, /12 pierogi per batch[\s\S]*4–6 minutes/],
    "zh-hant": [/15–20 分鐘/, /8–10 分鐘/, /5–6 分鐘[\s\S]*20–30 分鐘/, /48 片/, /22 公克[\s\S]*48 個 pierogi[\s\S]*每份 8 個/, /每批煮 12 個 pierogi 共 4–6 分鐘/],
    ja: [/15〜20分/, /8〜10分/, /5〜6分[\s\S]*20〜30分/, /48枚/, /約22g[\s\S]*48個[\s\S]*1人8個/, /12個ずつ、4〜6分/],
    ko: [/15–20분/, /8–10분/, /5–6분[\s\S]*20–30분/, /48장/, /약 22g[\s\S]*총 48개[\s\S]*1인당 8개/, /12개씩 4–6분/],
    th: [/15–20 นาที/, /8–10 นาที/, /5–6 นาที[\s\S]*20–30 นาที/, /48 แผ่น/, /ประมาณ 22 กรัม[\s\S]*48 ชิ้น[\s\S]*8 ชิ้น/, /ครั้งละ 12 ชิ้นนาน 4–6 นาที/]
  };
  for (const locale of localeOrder) {
    [potatoes, onion, dough, shape, fill, boil].forEach((step, index) => assert.match(step.body[locale], timing[locale][index], `${locale}: pierogi step ${index + 1}`));
    assert.doesNotMatch(recipe.instructions.map((step) => step.body[locale]).join(" "), /\d+\s*°\s*[CF]/, `${locale}: no unnecessary temperature was added`);
  }
});

test("fish amok gives a cup-size timing guide and credits the official fish endpoint", () => {
  const recipe = auditedRecipes.get("cambodian-fish-amok");
  assert.ok(recipe, "cambodian-fish-amok slug exists");
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov fish guidance is credited");
  const steam = recipeStep(recipe, "Steam until set");
  const timingAndSafety = {
    en: /15–18 minutes[\s\S]*egg custard must reach 71°C[\s\S]*fish piece must reach at least 63°C/,
    "zh-hant": /15–18 分鐘[\s\S]*蛋奶液中心必須達 71°C[\s\S]*最厚魚塊至少達 63°C/,
    ja: /15〜18分[\s\S]*卵液の中心が71°C[\s\S]*最も厚い魚が少なくとも63°C/,
    ko: /15–18분[\s\S]*달걀 커스터드 중심이 71°C[\s\S]*가장 두꺼운 생선이 최소 63°C/,
    th: /15–18 นาที[\s\S]*ใจกลางคัสตาร์ดไข่ต้องถึง 71°C[\s\S]*ชิ้นปลาที่หนาที่สุดต้องถึงอย่างน้อย 63°C/
  };
  for (const locale of localeOrder) assert.match(steam.body[locale], timingAndSafety[locale], `${locale}: fish amok timing and existing safe endpoint`);
});

test("Lao chicken larb times the rice and chicken, allocates its accompaniments, and credits poultry safety", () => {
  const recipe = auditedRecipes.get("lao-chicken-larb");
  assert.ok(recipe, "lao-chicken-larb slug exists");
  assert.equal(recipe.cookMinutes, 25);
  assert.equal(recipe.totalMinutes, 45);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("cooked sticky rice"))?.amount, "400 g");
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov poultry guidance is credited");
  const rice = recipeStep(recipe, "Toast the rice");
  const chicken = recipeStep(recipe, "Cook the chicken");
  const season = recipeStep(recipe, "Season while warm");
  const herbs = recipeStep(recipe, "Fold in the herbs");
  const serve = recipeStep(recipe, "Balance and plate");
  const patterns = {
    en: [/all 30 g glutinous rice[\s\S]*10–15 minutes/, /all 30 ml neutral oil[\s\S]*all 600 g ground chicken[\s\S]*7–10 minutes[\s\S]*74°C/, /all 45 ml fish sauce[\s\S]*60 ml lime juice[\s\S]*5 g chilli flakes/, /all 120 g red onion[\s\S]*30 g spring onion[\s\S]*30 g mint[\s\S]*25 g cilantro/, /all 150 g lettuce leaves and cucumber[\s\S]*all 400 g cooked sticky rice/],
    "zh-hant": [/全部 30 公克糯米 10–15 分鐘/, /全部 30 毫升中性油[\s\S]*全部 600 公克雞絞肉[\s\S]*7–10 分鐘[\s\S]*74°C/, /全部 45 毫升魚露[\s\S]*60 毫升萊姆汁[\s\S]*5 公克辣椒片/, /全部 120 公克紅洋蔥[\s\S]*30 公克青蔥[\s\S]*30 公克薄荷[\s\S]*25 公克香菜/, /全部 150 公克生菜葉與小黃瓜[\s\S]*400 公克糯米/],
    ja: [/もち米30g全量[\s\S]*10〜15分/, /中性油30ml全量[\s\S]*鶏ひき肉600g全量[\s\S]*7〜10分[\s\S]*74°C/, /ナンプラー45ml全量[\s\S]*ライム汁60ml全量[\s\S]*5g全量/, /赤玉ねぎ120g全量[\s\S]*青ねぎ30g全量[\s\S]*ミント30g全量[\s\S]*パクチー25g全量/, /レタスときゅうり150g全量[\s\S]*もち米400g全量/],
    ko: [/찹쌀 30g 전량[\s\S]*10–15분/, /중성유 30ml 전량[\s\S]*다진 닭고기 600g 전량[\s\S]*7–10분[\s\S]*74°C/, /피시소스 45ml 전량[\s\S]*라임즙 60ml 전량[\s\S]*고춧가루 5g 전량/, /적양파 120g[\s\S]*대파 30g[\s\S]*민트 30g[\s\S]*고수 25g/, /상추와 오이 150g 전량[\s\S]*찹쌀밥 400g 전량/],
    th: [/ข้าวเหนียวแห้งทั้งหมด 30 กรัม[\s\S]*10–15 นาที/, /น้ำมันรสกลางทั้งหมด 30 มล\.[\s\S]*ไก่บดทั้งหมด 600 กรัม[\s\S]*7–10 นาที[\s\S]*74°C/, /น้ำปลาทั้งหมด 45 มล\.[\s\S]*น้ำมะนาวทั้งหมด 60 มล\.[\s\S]*พริกป่นทั้งหมด 5 กรัม/, /หอมแดงใหญ่ทั้งหมด 120 กรัม[\s\S]*ต้นหอม 30 กรัม[\s\S]*สะระแหน่ 30 กรัม[\s\S]*ผักชี 25 กรัม/, /ใบผักกาดและแตงกวาทั้งหมด 150 กรัม[\s\S]*ข้าวเหนียวนึ่งสุกทั้งหมด 400 กรัม/]
  };
  for (const locale of localeOrder) [rice, chicken, season, herbs, serve].forEach((step, index) => assert.match(step.body[locale], patterns[locale][index], `${locale}: larb step ${index + 1}`));
});

test("caponata assigns salt, pepper, and both oils with practical stage times", () => {
  const recipe = auditedRecipes.get("caponata");
  assert.ok(recipe, "caponata slug exists");
  assert.equal(recipe.prepMinutes, 55);
  assert.equal(recipe.cookMinutes, 50);
  assert.equal(recipe.totalMinutes, 105);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "5 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "black pepper")?.amount, "1 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en === "olive oil for celery and onion")?.amount, "15 ml");
  assert.ok(recipe.sources.some((source) => source.url === "https://www.visitsicily.info/en/ricetta/caponata/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.lacucinaitaliana.com/italian-food/italian-dishes/sicilian-caponata-recipe"));

  const salt = recipeStep(recipe, "Salt and dry the eggplant");
  const eggplant = recipeStep(recipe, "Brown the eggplant in batches");
  const aromatics = recipeStep(recipe, "Cook celery and onion");
  const sauce = recipeStep(recipe, "Build the tomato agrodolce");
  const finish = recipeStep(recipe, "Combine olives, capers and eggplant");
  const patterns = {
    en: [/3 g fine salt[\s\S]*30–40 minutes/, /all 60 ml[\s\S]*2–3 uncrowded batches[\s\S]*5 minutes per batch/, /all 15 ml[\s\S]*5–7 minutes/, /10–12 minutes[\s\S]*up to the remaining 2 g salt/, /5–7 minutes/],
    "zh-hant": [/3 公克[\s\S]*30–40 分鐘/, /煎茄子用的全部 60 毫升[\s\S]*2–3 批[\s\S]*各煎約 5 分鐘/, /全部 15 毫升[\s\S]*5–7 分鐘/, /10–12 分鐘[\s\S]*剩餘最多 2 公克細鹽/, /5–7 分鐘/],
    ja: [/塩3g[\s\S]*30〜40分/, /なす用オリーブ油60mlをすべて[\s\S]*2〜3回[\s\S]*各回約5分/, /セロリと玉ねぎ用のオリーブ油15mlをすべて[\s\S]*5〜7分/, /10〜12分[\s\S]*残りの塩を最大2g/, /5〜7分/],
    ko: [/소금 3g[\s\S]*30–40분/, /가지용 올리브오일 60ml 전량[\s\S]*2–3회[\s\S]*회당 약 5분/, /셀러리와 양파용 올리브오일 15ml 전량[\s\S]*5–7분/, /10–12분[\s\S]*남은 소금 최대 2g/, /5–7분/],
    th: [/เกลือละเอียด 3 กรัม[\s\S]*30–40 นาที/, /น้ำมันมะกอกสำหรับมะเขือยาวทั้งหมด 60 มล\.[\s\S]*2–3 รอบ[\s\S]*รอบละประมาณ 5 นาที/, /น้ำมันมะกอกสำหรับเซเลอรีและหอมหัวใหญ่ทั้งหมด 15 มล\.[\s\S]*5–7 นาที/, /10–12 นาที[\s\S]*เกลือที่เหลือไม่เกิน 2 กรัม/, /5–7 นาที/]
  };
  for (const locale of localeOrder) {
    [salt, eggplant, aromatics, sauce, finish].forEach((step, index) => assert.match(step.body[locale], patterns[locale][index], `${locale}: caponata step ${index + 1}`));
    assert.doesNotMatch(recipe.instructions.map((step) => step.body[locale]).join(" "), /\d\s*°C/, `${locale}: no unnecessary temperature is added`);
  }
});

test("baklava allocates all butter and gives syrup, bake, and soak guides in five locales", () => {
  const recipe = auditedRecipes.get("baklava");
  assert.ok(recipe, "baklava slug exists");
  assert.equal(recipe.prepMinutes, 145);
  assert.equal(recipe.cookMinutes, 65);
  assert.equal(recipe.totalMinutes, 210);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("unsalted butter"))?.amount, "350 g");
  assert.ok(recipe.sources.some((source) => source.url === "https://www.bbcgoodfoodme.com/recipes/pistachio-almond-lemon-rose-baklava/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.foodnetwork.com/recipes/food-network-kitchen/pistachio-baklava-14024677"));

  const syrup = recipeStep(recipe, "Make the lemon-rose syrup");
  const layers = recipeStep(recipe, "Layer the filo");
  const top = recipeStep(recipe, "Score the pastry");
  const bake = recipeStep(recipe, "Bake until deeply golden");
  const soak = recipeStep(recipe, "Soak and cool completely");
  const patterns = {
    en: [/8–10 minutes/, [/20 g[\s\S]*about 300 g butter/, /final 30 g/], /180°C[\s\S]*55–65 minutes/, /at least 90 minutes/],
    "zh-hant": [/8–10 分鐘/, [/20 公克[\s\S]*約 300 公克/, /最後 30 公克/], /180°C[\s\S]*55–65 分鐘/, /至少 90 分鐘/],
    ja: [/8〜10分/, [/バター20g[\s\S]*約300g/, /バター30g/], /180°C[\s\S]*55〜65分/, /少なくとも90分/],
    ko: [/8–10분/, [/버터 20g[\s\S]*약 300g/, /버터 30g/], /180°C[\s\S]*55–65분/, /최소 90분/],
    th: [/8–10 นาที/, [/เนยใส 20 กรัม[\s\S]*ประมาณ 300 กรัม/, /เนยใส 30 กรัม/], /180°C[\s\S]*55–65 นาที/, /อย่างน้อย 90 นาที/]
  };
  for (const locale of localeOrder) {
    assert.match(syrup.body[locale], patterns[locale][0], `${locale}: syrup timing`);
    assert.match(layers.body[locale], patterns[locale][1][0], `${locale}: pan and sheet butter allocation`);
    assert.match(top.body[locale], patterns[locale][1][1], `${locale}: final butter allocation`);
    assert.match(bake.body[locale], patterns[locale][2], `${locale}: oven timing and endpoint`);
    assert.match(soak.body[locale], patterns[locale][3], `${locale}: cooling and absorption guide`);
  }
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
});

test("malva pudding allocates pan butter and gives a doneness-based bake guide", () => {
  const recipe = auditedRecipes.get("malva-pudding");
  assert.ok(recipe, "malva-pudding slug exists");
  assert.equal(recipe.prepMinutes, 20);
  assert.equal(recipe.cookMinutes, 40);
  assert.equal(recipe.totalMinutes, 60);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "unsalted butter, divided")?.amount, "60 g");
  assert.ok(recipe.sources.some((source) => source.url === "https://www.penguinrandomhouse.co.za/warren-mendess-malva-pudding/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://winemag.co.za/food/recipe/malva-pudding/"));
  const pan = recipeStep(recipe, "Prepare the pan and dry mix");
  const batter = recipeStep(recipe, "Combine the batter");
  const bake = recipeStep(recipe, "Bake the sponge and warm the sauce");
  const patterns = {
    en: [/5 g of the listed butter[\s\S]*remaining 55 g/, /melted 55 g butter/, /180°C[\s\S]*30–40 minutes[\s\S]*clean skewer/],
    "zh-hant": [/奶油中的 5 公克[\s\S]*剩餘 55 公克/, /融化的 55 公克奶油/, /180°C[\s\S]*30–40 分鐘[\s\S]*竹籤插入乾淨/],
    ja: [/バターから5g[\s\S]*残り55g/, /溶かしたバター55g/, /180°C[\s\S]*30〜40分[\s\S]*竹串がきれいに抜けたら/],
    ko: [/버터 중 5g[\s\S]*남은 55g/, /녹인 버터 55g/, /180°C[\s\S]*30–40분[\s\S]*꼬치가 깨끗하게/],
    th: [/เนยที่ระบุ 5 กรัม[\s\S]*เนยที่เหลือ 55 กรัม/, /เนยละลาย 55 กรัม/, /180°C[\s\S]*30–40 นาที[\s\S]*ไม้จิ้มออกมาสะอาด/]
  };
  for (const locale of localeOrder) {
    assert.match(pan.body[locale], patterns[locale][0], `${locale}: pan butter allocation`);
    assert.match(batter.body[locale], patterns[locale][1], `${locale}: batter butter allocation`);
    assert.match(bake.body[locale], patterns[locale][2], `${locale}: baking guide`);
  }
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
});

test("pancit bihon checks chicken at the official endpoint and times each wok stage", () => {
  const recipe = auditedRecipes.get("pancit-bihon");
  assert.ok(recipe, "pancit-bihon slug exists");
  assert.equal(recipe.prepMinutes, 25);
  assert.equal(recipe.cookMinutes, 25);
  assert.equal(recipe.totalMinutes, 50);
  const noodleWater = recipe.ingredients.find((row) => row.item.en.startsWith("water for the noodles"));
  assert.deepEqual(localeOrder.map((locale) => localized(noodleWater?.amount, locale)), [
    "up to 60 ml", "最多 60 毫升", "最大60ml", "최대 60ml", "ไม่เกิน 60 มล."
  ], "optional water amount is localized in all five languages");
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "official poultry endpoint is credited");
  assert.deepEqual(recipe.ingredients.map((row) => row.item.ko), [
    "건조 비혼 쌀국수", "무염 닭육수", "뼈를 제거한 닭다리살, 얇게 썬 것", "껍질을 벗긴 새우",
    "양배추, 곱게 채 썬 것", "당근, 채 썬 것", "중국식 소시지, 얇게 썬 것", "연간장",
    "굴소스", "칼라만시즙 또는 레몬즙", "향이 강하지 않은 식용유", "다진 마늘",
    "면이 부드러워지기 전에 웍이 마를 때만 넣는 물"
  ], "Korean ingredient fields use Korean rather than copied Thai text");
  const sausageChicken = recipeStep(recipe, "Brown the sausage and chicken");
  const vegetablesShrimp = recipeStep(recipe, "Cook the vegetables and shrimp");
  const noodles = recipeStep(recipe, "Absorb the broth");
  const patterns = {
    en: [/sausage for 4–5 minutes[\s\S]*chicken[\s\S]*3–5 minutes[\s\S]*74°C \(165°F\)/, /2–3 minutes[\s\S]*2–3 minutes/, /5–8 minutes[\s\S]*15 ml increments[\s\S]*60 ml/],
    "zh-hant": [/臘腸炒 4–5 分鐘[\s\S]*雞肉[\s\S]*3–5 分鐘[\s\S]*74°C（165°F）/, /2–3 分鐘[\s\S]*2–3 分鐘/, /5–8 分鐘[\s\S]*每次補 15 毫升[\s\S]*60 毫升/],
    ja: [/ソーセージを4〜5分[\s\S]*鶏肉[\s\S]*3〜5分[\s\S]*74°C（165°F）/, /2〜3分[\s\S]*2〜3分/, /5〜8分[\s\S]*15mlずつ[\s\S]*60ml/],
    ko: [/소시지를 4–5분[\s\S]*닭고기[\s\S]*3–5분[\s\S]*74°C \(165°F\)/, /2–3분[\s\S]*2–3분/, /5–8분[\s\S]*15ml씩[\s\S]*60ml/],
    th: [/กุนเชียง 4–5 นาที[\s\S]*ไก่[\s\S]*3–5 นาที[\s\S]*74°C \(165°F\)/, /2–3 นาที[\s\S]*2–3 นาที/, /5–8 นาที[\s\S]*ครั้งละ 15 มล\.[\s\S]*60 มล\./]
  };
  for (const locale of localeOrder) {
    assert.match(sausageChicken.body[locale], patterns[locale][0], `${locale}: sausage, chicken time and poultry endpoint`);
    assert.match(vegetablesShrimp.body[locale], patterns[locale][1], `${locale}: vegetable and shrimp guide`);
    assert.match(noodles.body[locale], patterns[locale][2], `${locale}: noodle absorption and optional water`);
  }
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
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

test("feijoada allocates salt and optional farofa, with timed browning and aromatics in all locales", () => {
  const recipe = auditedRecipes.get("feijoada");
  assert.ok(recipe, "feijoada slug exists");
  assert.equal(recipe.prepMinutes, 510);
  assert.equal(recipe.cookMinutes, 180);
  assert.equal(recipe.totalMinutes, 690);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.amount, "14 g");
  const farofa = recipe.ingredients.find((row) => row.item.en.startsWith("prepared farofa"));
  assert.equal(farofa?.amount, "160 g");
  assert.ok(recipe.sources.some((source) => source.url === "https://camilamade.com/homemade-feijoada/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.oliviascuisine.com/feijoada-recipe/"));
  const browning = recipeStep(recipe, "Brown the meats");
  const aromatics = recipeStep(recipe, "Build the aromatic base");
  const add = recipeStep(recipe, "Add beans and liquid");
  const finish = recipeStep(recipe, "Thicken and adjust");
  const serve = recipeStep(recipe, "Serve the complete plate");
  const descriptionPatterns = {
    en: /optional farofa/, "zh-hant": /可選的木薯粉 farofa/, ja: /ファロファは好みで加えます/,
    ko: /파로파는 선택으로 냅니다/, th: /ฟาโรฟาตามชอบ/
  };
  const boilPatterns = {
    en: /bring just to a boil/, "zh-hant": /煮至剛沸/, ja: /沸騰するまで加熱します/,
    ko: /막 끓기 시작하게/, th: /ต้มจนเดือดพอดี/
  };
  const patterns = {
    en: [/4–5 minutes[\s\S]*8–10 minutes total[\s\S]*final 2 minutes/, /5–7 minutes[\s\S]*1 minute/, /hold the salt for the final taste/, /up to 14 g salt gradually/, /prepared farofa as an optional side/],
    "zh-hant": [/4–5 分鐘[\s\S]*8–10 分鐘[\s\S]*最後 2 分鐘/, /5–7 分鐘[\s\S]*再炒 1 分鐘/, /鹽留到最後試味時再加/, /最多 14 公克鹽/, /farofa 可另作選配配菜/],
    ja: [/4〜5分[\s\S]*8〜10分[\s\S]*最後の2分/, /5〜7分[\s\S]*1分炒め/, /塩は最後に味を見て加えます/, /塩を最大14gまで少しずつ/, /ファロファは好みで別に出します/],
    ko: [/4–5분[\s\S]*8–10분[\s\S]*마지막 2분/, /5–7분[\s\S]*1분 볶으며/, /소금은 마지막에 맛을 보고 넣습니다/, /소금을 최대 14g까지 조금씩/, /파로파는 선택 곁들임으로 따로 냅니다/],
    th: [/4–5 นาที[\s\S]*8–10 นาที[\s\S]*2 นาทีสุดท้าย/, /5–7 นาที[\s\S]*อีก 1 นาที/, /เก็บเกลือไว้ปรุงตอนชิมรสท้ายสุด/, /เกลือได้ไม่เกิน 14 กรัม/, /ฟาโรฟาที่เตรียมแล้วเป็นเครื่องเคียงตามชอบ/]
  };
  for (const locale of localeOrder) {
    assert.match(browning.body[locale], patterns[locale][0], `${locale}: meat stage times`);
    assert.match(aromatics.body[locale], patterns[locale][1], `${locale}: onion and garlic stage times`);
    assert.match(recipe.description[locale], descriptionPatterns[locale], `${locale}: farofa is optional`);
    assert.match(add.body[locale], patterns[locale][2], `${locale}: hold seasoning until after desalted meat simmers`);
    assert.match(add.body[locale], boilPatterns[locale], `${locale}: add mixture to a boil`);
    assert.match(finish.body[locale], patterns[locale][3], `${locale}: final salt allocation`);
    assert.match(serve.body[locale], patterns[locale][4], `${locale}: optional prepared side`);
    assert.ok(localized(farofa.item, locale).length > 0, `${locale}: farofa ingredient is translated`);
  }
});

test("Imeretian khachapuri gives rise, baking alternatives and full butter allocation in five locales", () => {
  const recipe = auditedRecipes.get("imeretian-khachapuri");
  assert.ok(recipe, "imeretian-khachapuri slug exists");
  assert.equal(recipe.prepMinutes, 90);
  assert.equal(recipe.cookMinutes, 23);
  assert.equal(recipe.totalMinutes, 113);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "butter, for finishing")?.amount, "25 g");
  assert.ok(recipe.sources.some((source) => source.url === "https://georgia.travel/imeretian-khachapuri"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.theguardian.com/food/2026/mar/22/how-to-make-the-perfect-cheese-khachapuri-recipe-felicity-cloake"));
  const knead = recipeStep(recipe, "Mix and knead the dough");
  const rise = recipeStep(recipe, "Let the dough rise");
  const bake = recipeStep(recipe, "Bake until blistered");
  const finish = recipeStep(recipe, "Butter and rest briefly");
  const patterns = {
    en: [/8–10 minutes/, /45–60 minutes[\s\S]*longer in a cool room/, /220°C[\s\S]*15 minutes[\s\S]*12 minutes[\s\S]*18[\s\S]*5 minutes per side/, /all 25 g butter[\s\S]*5 minutes/],
    "zh-hant": [/8–10 分鐘/, /45–60 分鐘[\s\S]*室溫較低時可能需要更久/, /220°C[\s\S]*15 分鐘[\s\S]*12 分鐘[\s\S]*18 分鐘[\s\S]*每面煎約 5 分鐘/, /全部 25 公克奶油[\s\S]*靜置 5 分鐘/],
    ja: [/8〜10分/, /45〜60分[\s\S]*室温が低いとさらに時間がかかります/, /220°C[\s\S]*約15分[\s\S]*12分[\s\S]*最大18分[\s\S]*片面約5分ずつ/, /バター25gをすべて[\s\S]*5分休ませます/],
    ko: [/8–10분/, /45–60분[\s\S]*서늘하면 더 걸릴 수 있습니다/, /220°C[\s\S]*약 15분[\s\S]*12분[\s\S]*최대 18분[\s\S]*한 면당 약 5분씩/, /버터 25g을 모두[\s\S]*5분 둡니다/],
    th: [/8–10 นาที/, /45–60 นาที[\s\S]*ห้องเย็นอาจใช้เวลานานขึ้น/, /220°C[\s\S]*ประมาณ 15 นาที[\s\S]*12 นาที[\s\S]*18 นาที[\s\S]*ด้านละประมาณ 5 นาที/, /เนยทั้ง 25 กรัม[\s\S]*พัก 5 นาที/]
  };
  for (const locale of localeOrder) {
    assert.match(knead.body[locale], patterns[locale][0], `${locale}: kneading guide`);
    assert.match(rise.body[locale], patterns[locale][1], `${locale}: rise duration and room-temperature caveat`);
    assert.match(bake.body[locale], patterns[locale][2], `${locale}: oven and skillet guides`);
    assert.match(finish.body[locale], patterns[locale][3], `${locale}: all listed butter and rest time`);
  }
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("low-moisture mozzarella"))?.item.ko, "저수분 모차렐라 치즈, 갈은 것");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("low-moisture mozzarella"))?.item.th, "มอสซาเรลลาชีสชนิดความชื้นต่ำ ขูด");
});

test("chicken tamales verify the poultry endpoint with an official safety source in five locales", () => {
  const recipe = auditedRecipes.get("tamales-de-pollo-en-salsa-verde");
  assert.ok(recipe, "tamales-de-pollo-en-salsa-verde slug exists");
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov poultry guidance is credited");
  const chicken = recipeStep(recipe, "Cook the chicken");
  const patterns = {
    en: [/about 20 minutes[\s\S]*food thermometer[\s\S]*74°C \(165°F\)[\s\S]*every 2 minutes/],
    "zh-hant": [/約 20 分鐘[\s\S]*食物溫度計[\s\S]*74°C（165°F）[\s\S]*每 2 分鐘再測一次/],
    ja: [/約20分[\s\S]*食品用温度計[\s\S]*74°C（165°F）[\s\S]*2分ごとに測り直します/],
    ko: [/약 20분[\s\S]*식품용 온도계[\s\S]*74°C \(165°F\)[\s\S]*2분마다 다시 확인/],
    th: [/ประมาณ 20 นาที[\s\S]*เทอร์โมมิเตอร์อาหาร[\s\S]*74°C \(165°F\)[\s\S]*ทุก 2 นาที/]
  };
  for (const locale of localeOrder) assert.match(chicken.body[locale], patterns[locale][0], `${locale}: chicken temperature endpoint and recheck`);
});

test("huevos rancheros direct soft-yolk servings to pasteurized eggs and credit FDA guidance", () => {
  const recipe = auditedRecipes.get("huevos-rancheros");
  assert.ok(recipe, "huevos-rancheros slug exists");
  assert.ok(recipe.sources.some((source) => source.url === eggSafetySource), "FDA egg guidance is credited");
  const eggs = recipeStep(recipe, "Fry the eggs");
  const patterns = {
    en: [/soft yolks[\s\S]*pasteurized shell eggs[\s\S]*both whites and yolks are firm/],
    "zh-hant": [/柔軟蛋黃[\s\S]*經巴氏殺菌的帶殼蛋[\s\S]*蛋白與蛋黃都煎至凝固/],
    ja: [/柔らかい黄身[\s\S]*殺菌済み殻付き卵[\s\S]*白身と黄身の両方が固まる/],
    ko: [/부드러운 노른자[\s\S]*살균 처리된 껍질 달걀[\s\S]*흰자와 노른자가 모두 단단해질/],
    th: [/ไข่แดงนุ่ม[\s\S]*ไข่ทั้งเปลือกที่ผ่านการพาสเจอไรซ์[\s\S]*ทั้งไข่ขาวและไข่แดงแข็งตัว/]
  };
  for (const locale of localeOrder) assert.match(eggs.body[locale], patterns[locale][0], `${locale}: pasteurized or fully cooked egg path`);
});

test("harira allocates oil and salt, times the soup stages, and specifies wheat vermicelli in every locale", () => {
  const recipe = auditedRecipes.get("harira");
  assert.ok(recipe, "harira slug exists");
  assert.equal(recipe.prepMinutes, 25);
  assert.equal(recipe.cookMinutes, 95);
  assert.equal(recipe.totalMinutes, 120);
  const oil = recipe.ingredients.find((row) => row.item.en.startsWith("olive oil"));
  assert.equal(oil?.amount, "30 ml");
  const lamb = recipeStep(recipe, "Brown the lamb");
  const aromatics = recipeStep(recipe, "Soften aromatics and bloom spices");
  const simmer = recipeStep(recipe, "Simmer lamb and lentils");
  const thicken = recipeStep(recipe, "Add chickpeas and thicken");
  const noodles = recipeStep(recipe, "Finish with herbs and vermicelli");
  assert.match(lamb.body.en, /20 ml olive oil[\s\S]*3–4 minutes per batch \(6–8 minutes total\)/);
  const timedStages = [
    lamb.body.en.replace("3–4 minutes per batch ", ""), aromatics.body.en, simmer.body.en, thicken.body.en, noodles.body.en
  ];
  const [cookLow, cookHigh] = summedExplicitMinutes(timedStages);
  assert.ok(recipe.cookMinutes >= cookLow && recipe.cookMinutes <= cookHigh,
    `cook time ${recipe.cookMinutes} covers timed stages (${cookLow}–${cookHigh} min)`);
  const patterns = {
    en: [/remaining 10 ml olive oil[\s\S]*5–6 minutes/, /all 5 g salt/, /thin wheat vermicelli[\s\S]*4–6 minutes/],
    "zh-hant": [/剩餘 10 毫升橄欖油[\s\S]*5–6 分鐘/, /全部 5 公克鹽/, /小麥細麵[\s\S]*4–6 分鐘/],
    ja: [/残りのオリーブ油10ml[\s\S]*5～6分/, /塩5gすべて/, /細い小麦バーミセリ[\s\S]*4～6分/],
    ko: [/남은 올리브오일 10ml[\s\S]*5~6분/, /소금 5g을 모두/, /가는 밀국수 베르미첼리[\s\S]*4~6분/],
    th: [/น้ำมันมะกอกที่เหลือ 10 มล\.[\s\S]*5–6 นาที/, /เกลือทั้งหมด 5 กรัม/, /เส้นหมี่ข้าวสาลีเส้นเล็ก[\s\S]*4–6 นาที/]
  };
  for (const locale of localeOrder) {
    assert.match(aromatics.body[locale], patterns[locale][0], `${locale}: remaining oil and onion timing`);
    assert.match(simmer.body[locale], patterns[locale][1], `${locale}: salt is fully allocated`);
    assert.match(noodles.body[locale], patterns[locale][2], `${locale}: wheat noodle identity and timing`);
  }
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
});

test("mujadara quantities and covered rest match the rice-and-lentil method in every locale", () => {
  const recipe = auditedRecipes.get("mujadara");
  assert.ok(recipe, "mujadara slug exists");
  assert.equal(recipe.prepMinutes, 20);
  assert.equal(recipe.cookMinutes, 70);
  assert.equal(recipe.totalMinutes, 90);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("hot water"))?.amount, "500 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("olive oil"))?.amount, "90 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"))?.amount, "8 g");
  const lentils = recipeStep(recipe, "Start the lentils");
  const onions = recipeStep(recipe, "Caramelize the onions slowly");
  const rice = recipeStep(recipe, "Simmer rice and lentils together");
  const rest = recipeStep(recipe, "Rest and fluff");
  const [cookLow, cookHigh] = summedExplicitMinutes([lentils.body.en, onions.body.en, rice.body.en, rest.body.en]);
  assert.ok(recipe.cookMinutes >= cookLow && recipe.cookMinutes <= cookHigh,
    `cook time ${recipe.cookMinutes} covers timed stages (${cookLow}–${cookHigh} min)`);
  const patterns = {
    en: [/10–12 minutes/, /45 ml olive oil[\s\S]*2 g of the salt[\s\S]*25–30 minutes/, /exactly 500 ml hot water[\s\S]*remaining 6 g salt[\s\S]*18–20 minutes/, /covered for 10 minutes/],
    "zh-hant": [/10–12 分鐘/, /45 毫升橄欖油[\s\S]*2 公克鹽[\s\S]*25–30 分鐘/, /500 毫升熱水[\s\S]*剩餘 6 公克鹽[\s\S]*18–20 分鐘/, /加蓋靜置 10 分鐘/],
    ja: [/10～12分/, /オリーブ油45ml[\s\S]*塩2g[\s\S]*25～30分/, /熱湯500ml[\s\S]*残りの塩6g[\s\S]*18～20分/, /蓋をしたまま10分/],
    ko: [/10~12분/, /올리브오일 45ml[\s\S]*소금 2g[\s\S]*25~30분/, /뜨거운 물 500ml[\s\S]*남은 소금 6g[\s\S]*18~20분/, /뚜껑을 덮어 10분/],
    th: [/10–12 นาที/, /น้ำมันมะกอก 45 มล\.[\s\S]*เกลือ 2 กรัม[\s\S]*25–30 นาที/, /น้ำร้อน 500 มล\.[\s\S]*เกลือที่เหลือ 6 กรัม[\s\S]*18–20 นาที/, /ปิดฝา 10 นาที/]
  };
  for (const locale of localeOrder) {
    assert.match(lentils.body[locale], patterns[locale][0], `${locale}: lentils are par-cooked first`);
    assert.match(onions.body[locale], patterns[locale][1], `${locale}: onion oil/salt/time allocation`);
    assert.match(rice.body[locale], patterns[locale][2], `${locale}: measured water, salt, and rice time`);
    assert.match(rest.body[locale], patterns[locale][3], `${locale}: one covered rest is explicit`);
  }
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes);
});

test("mafe times chicken and peanut stew, cooks rice in parallel, and checks poultry at the official endpoint", () => {
  const recipe = auditedRecipes.get("maafe");
  assert.ok(recipe, "maafe slug exists");
  assert.equal(recipe.prepMinutes, 25);
  assert.equal(recipe.cookMinutes, 90);
  assert.equal(recipe.totalMinutes, 115);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("unsalted chicken stock"))?.amount, "1.2 L");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("long-grain rice"))?.amount, "400 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("water for cooking the rice"))?.amount, "600 ml");
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov is credited");
  const chicken = recipeStep(recipe, "Brown and season the chicken");
  const onions = recipeStep(recipe, "Soften onions and cook tomato");
  const peanut = recipeStep(recipe, "Blend the peanut sauce");
  const braise = recipeStep(recipe, "Simmer chicken in peanut broth");
  const vegetables = recipeStep(recipe, "Add roots and cabbage");
  const stewVegetableTiming = vegetables.body.en.split(" While the stew simmers")[0];
  const [cookLow, cookHigh] = summedExplicitMinutes([chicken.body.en, onions.body.en, peanut.body.en, braise.body.en, stewVegetableTiming]);
  assert.ok(recipe.cookMinutes >= cookLow && recipe.cookMinutes <= cookHigh,
    `cook time ${recipe.cookMinutes} covers stew stages (${cookLow}–${cookHigh} min), with rice cooked in parallel`);
  const patterns = {
    en: [/2 g salt[\s\S]*three batches[\s\S]*3–4 minutes per batch \(9–12 minutes total\)/, /remaining 900 ml stock[\s\S]*5–7 minutes[\s\S]*20–25 minutes/, /74°C \(165°F\)[\s\S]*600 ml water[\s\S]*12–15 minutes[\s\S]*10 minutes/],
    "zh-hant": [/2 公克鹽[\s\S]*三批[\s\S]*每批 3–4 分鐘（共 9–12 分鐘）/, /剩餘 900 毫升高湯[\s\S]*5–7 分鐘[\s\S]*20–25 分鐘/, /74°C[\s\S]*600 毫升水[\s\S]*12–15 分鐘[\s\S]*10 分鐘/],
    ja: [/塩2g[\s\S]*3回に分け[\s\S]*各3～4分（計9～12分）/, /残りのだし900ml[\s\S]*5～7分[\s\S]*20～25分/, /74°C[\s\S]*水600ml[\s\S]*12～15分[\s\S]*10分/],
    ko: [/소금 2g[\s\S]*세 번에 나눠[\s\S]*한 번에 3~4분씩\(총 9~12분\)/, /남은 육수 900ml[\s\S]*5~7분[\s\S]*20~25분/, /74°C[\s\S]*물 600ml[\s\S]*12~15분[\s\S]*10분/],
    th: [/เกลือ 2 กรัม[\s\S]*สามรอบ[\s\S]*รอบละ 3–4 นาที \(รวม 9–12 นาที\)/, /สต็อกที่เหลือ 900 มล\.[\s\S]*5–7 นาที[\s\S]*20–25 นาที/, /74°C[\s\S]*น้ำ 600 มล\.[\s\S]*12–15 นาที[\s\S]*10 นาที/]
  };
  for (const locale of localeOrder) {
    assert.match(chicken.body[locale], patterns[locale][0], `${locale}: chicken salt allocation and batch times`);
    assert.match(braise.body[locale], patterns[locale][1], `${locale}: stock allocation and braise times`);
    assert.match(vegetables.body[locale], patterns[locale][2], `${locale}: safe poultry temperature and parallel rice instructions`);
  }
});

test("bobotie allocates bread, butter, seasoning, and sides and checks casserole temperature", () => {
  const recipe = auditedRecipes.get("bobotie");
  assert.ok(recipe, "bobotie slug exists");
  assert.equal(recipe.prepMinutes, 25);
  assert.equal(recipe.cookMinutes, 75);
  assert.equal(recipe.totalMinutes, 100);
  assert.ok(recipe.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov meat-casserole guidance is credited");
  const soak = recipeStep(recipe, "Soak the bread");
  const onions = recipeStep(recipe, "Soften the onions");
  const mince = recipeStep(recipe, "Cook the curried mince");
  const bake = recipeStep(recipe, "Add the egg custard and bake");
  const serve = recipeStep(recipe, "Rest and serve with yellow rice");
  const [cookLow, cookHigh] = summedExplicitMinutes([onions.body.en, mince.body.en, bake.body.en, serve.body.en]);
  assert.ok(recipe.cookMinutes >= cookLow && recipe.cookMinutes <= cookHigh,
    `cook time ${recipe.cookMinutes} covers timed stages (${cookLow}–${cookHigh} min)`);
  const patterns = {
    en: [/150 ml milk[\s\S]*10 minutes/, /25 g of the butter[\s\S]*8–10 minutes/, /2 g salt[\s\S]*all 2 g black pepper/, /180°C[\s\S]*35–45 minutes[\s\S]*74°C \(165°F\)[\s\S]*after 5 minutes/, /900 g cooked yellow rice \(150 g per person\)[\s\S]*180 g fruit chutney \(30 g per person\)/],
    "zh-hant": [/150 毫升牛奶[\s\S]*10 分鐘/, /25 公克奶油[\s\S]*8–10 分鐘/, /2 公克鹽[\s\S]*全部 2 公克黑胡椒/, /180°C[\s\S]*35–45 分鐘[\s\S]*74°C（165°F）[\s\S]*5 分鐘後/, /熟黃薑飯 900 公克（每人 150 公克）[\s\S]*水果 chutney 180 公克（每人 30 公克）/],
    ja: [/牛乳150ml[\s\S]*10分/, /バター25g[\s\S]*8～10分/, /塩2g[\s\S]*黒こしょう2gすべて/, /180°C[\s\S]*35～45分[\s\S]*74°C（165°F）[\s\S]*5分追加/, /調理済みのイエローライス900g（1人150g）[\s\S]*果物のチャツネ180g（1人30g）/],
    ko: [/우유 150ml[\s\S]*10분/, /버터 25g[\s\S]*8~10분/, /소금 2g[\s\S]*후추 2g 전량/, /180°C[\s\S]*35~45분[\s\S]*74°C \(165°F\)[\s\S]*5분 더/, /조리된 옐로 라이스 900g \(1인분 150g\)[\s\S]*과일 처트니 180g \(1인분 30g\)/],
    th: [/นม 150 มล\.[\s\S]*10 นาที/, /เนย 25 กรัม[\s\S]*8–10 นาที/, /เกลือ 2 กรัม[\s\S]*พริกไทยดำ 2 กรัมทั้งหมด/, /180°C[\s\S]*35–45 นาที[\s\S]*74°C \(165°F\)[\s\S]*อีก 5 นาที/, /ข้าวเหลืองปรุงสุก 900 กรัม \(คนละ 150 กรัม\)[\s\S]*ชัทนีย์ผลไม้ 180 กรัม \(คนละ 30 กรัม\)/]
  };
  for (const locale of localeOrder) {
    assert.match(soak.body[locale], patterns[locale][0], `${locale}: bread soak uses the allocated milk`);
    assert.match(onions.body[locale], patterns[locale][1], `${locale}: onion butter and time allocation`);
    assert.match(mince.body[locale], patterns[locale][2], `${locale}: salt and pepper allocation`);
    assert.match(bake.body[locale], patterns[locale][3], `${locale}: oven bake and safe casserole endpoint`);
    assert.match(serve.body[locale], patterns[locale][4], `${locale}: exact sides and serving portions`);
  }
});


test("fourteenth method audit checks four new IDs, all five locales, amounts, timing, and safety endpoints", () => {
  assert.equal(auditedIds.length, 220, "deep-review coverage contains 220 distinct recipes");
  assert.equal(new Set(auditedIds).size, 220, "coverage IDs are unique");
  const chicken = auditedRecipes.get("chicken-shawarma");
  const bread = auditedRecipes.get("zaatar-manakish");
  const jambalaya = auditedRecipes.get("jambalaya");
  const pork = auditedRecipes.get("thit-kho-trung");
  for (const recipe of [chicken, bread, jambalaya, pork]) {
    assert.ok(recipe, "each fourteenth-batch slug exists");
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${recipe.id}/${locale}: localized ingredients exist`);
      assert.ok(recipe.instructions.every((step) => step.title[locale] && step.body[locale]), `${recipe.id}/${locale}: localized steps exist`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${recipe.id}: total time adds up`);
  }

  assert.equal(chicken.servings, 6);
  assert.deepEqual([chicken.prepMinutes, chicken.cookMinutes, chicken.totalMinutes], [45, 30, 75]);
  assert.equal(chicken.ingredients.find((row) => row.item.en === "fine salt")?.amount, "8 g");
  assert.equal(chicken.ingredients.find((row) => row.item.en === "black pepper")?.amount, "2 g");
  assert.equal(chicken.ingredients.find((row) => row.item.en.startsWith("garlic sauce"))?.amount, "120 g");
  assert.ok(chicken.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov poultry endpoint is credited");
  const roast = recipeStep(chicken, "Roast until browned and safe");
  const wrap = recipeStep(chicken, "Fill and fold the pita");
  const chickenRoastPatterns = {
    en: /230°C[\s\S]*22–28 minutes[\s\S]*12 minutes[\s\S]*74°C[\s\S]*3-minute intervals/,
    "zh-hant": /230°C[\s\S]*22–28 分鐘[\s\S]*12 分鐘[\s\S]*74°C[\s\S]*3 分鐘/,
    ja: /230°C[\s\S]*22〜28分[\s\S]*12分[\s\S]*74°C[\s\S]*3分/,
    ko: /230°C[\s\S]*22–28분[\s\S]*12분[\s\S]*74°C[\s\S]*3분/,
    th: /230°C[\s\S]*22–28 นาที[\s\S]*12 นาที[\s\S]*74°C[\s\S]*3 นาที/
  };
  for (const locale of localeOrder) {
    assert.match(roast.body[locale], chickenRoastPatterns[locale], `${locale}: roast timing and 74°C endpoint`);
    assert.match(wrap.body[locale], /20/, `${locale}: optional sauce has a measured per-wrap amount`);
  }

  assert.equal(bread.servings, 8);
  assert.deepEqual([bread.prepMinutes, bread.cookMinutes, bread.totalMinutes], [150, 22, 172]);
  const doughOil = bread.ingredients.find((row) => row.item.en.startsWith("olive oil, divided"));
  const toppingOil = bread.ingredients.find((row) => row.item.en.startsWith("olive oil for the topping"));
  const trayOil = bread.ingredients.find((row) => row.item.en.startsWith("extra oil to brush"));
  assert.deepEqual([doughOil?.amount, toppingOil?.amount, trayOil?.amount], ["45 ml", "100 ml", "15 ml"]);
  assert.equal(35 + 10 + 100 + 15, 160, "all listed olive oil is allocated");
  const proof = recipeStep(bread, "Let the dough rise");
  const topping = recipeStep(bread, "Mix the za’atar topping");
  const bake = recipeStep(bread, "Spread the za’atar and bake");
  const breadPatterns = {
    en: [/60–90 minutes/, /80 g[\s\S]*100 ml/, /8–10 minutes[\s\S]*20 minutes/],
    "zh-hant": [/60–90 分鐘/, /80 公克[\s\S]*100 毫升/, /8–10 分鐘[\s\S]*20 分鐘/],
    ja: [/60〜90分/, /80g[\s\S]*100ml/, /8〜10分[\s\S]*20分/],
    ko: [/60–90분/, /80g[\s\S]*100ml/, /8–10분[\s\S]*20분/],
    th: [/60–90 นาที/, /80 กรัม[\s\S]*100 มล\./, /8–10 นาที[\s\S]*20 นาที/]
  };
  for (const locale of localeOrder) {
    assert.match(proof.body[locale], breadPatterns[locale][0], `${locale}: first proof has a time range`);
    assert.match(topping.body[locale], breadPatterns[locale][1], `${locale}: topping oil is measured`);
    assert.match(bake.body[locale], breadPatterns[locale][2], `${locale}: batch bake timing is explicit`);
  }

  assert.equal(jambalaya.servings, 8);
  assert.deepEqual([jambalaya.prepMinutes, jambalaya.cookMinutes, jambalaya.totalMinutes], [30, 65, 95]);
  assert.ok(jambalaya.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov poultry endpoint is credited");
  const chickenRice = recipeStep(jambalaya, "Cook the rice covered");
  const shrimp = recipeStep(jambalaya, "Steam the shrimp on top");
  const chickenTempPatterns = {
    en: /18–20 minutes[\s\S]*chicken piece[\s\S]*74°C[\s\S]*3 minutes/,
    "zh-hant": /18–20 分鐘[\s\S]*雞肉[\s\S]*74°C[\s\S]*3 分鐘/,
    ja: /18〜20分[\s\S]*鶏肉[\s\S]*74°C[\s\S]*3分/,
    ko: /18–20분[\s\S]*닭고기[\s\S]*74°C[\s\S]*3분/,
    th: /18–20 นาที[\s\S]*ไก่[\s\S]*74°C[\s\S]*3 นาที/
  };
  const shrimpPatterns = {
    en: /5–6 minutes[\s\S]*pearly white and opaque/,
    "zh-hant": /5–6 分鐘[\s\S]*珍珠白且不透明/,
    ja: /5〜6分[\s\S]*真珠のような白色で不透明/,
    ko: /5–6분[\s\S]*진주빛 흰색으로 불투명/,
    th: /5–6 นาที[\s\S]*สีขาวมุกและทึบแสง/
  };
  for (const locale of localeOrder) {
    assert.match(chickenRice.body[locale], chickenTempPatterns[locale], `${locale}: chicken reaches its official endpoint before shrimp is added`);
    assert.match(shrimp.body[locale], shrimpPatterns[locale], `${locale}: shrimp endpoint follows the official visual cue`);
  }

  assert.equal(pork.servings, 6);
  assert.deepEqual([pork.prepMinutes, pork.cookMinutes, pork.totalMinutes], [35, 110, 145]);
  assert.equal(pork.ingredients.find((row) => row.item.en.startsWith("cooked rice"))?.amount, "900 g");
  assert.equal(pork.ingredients.find((row) => row.item.en.startsWith("fish sauce"))?.amount, "50 ml");
  assert.ok(pork.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov pork endpoint is credited");
  const porkDoneness = recipeStep(pork, "Let the eggs absorb the broth");
  const rest = recipeStep(pork, "Rest and serve");
  const porkPatterns = {
    en: /63°C \/ 145°F[\s\S]*10-minute intervals[\s\S]*3-minute rest/,
    "zh-hant": /63°C／145°F[\s\S]*10 分鐘[\s\S]*3 分鐘靜置/,
    ja: /63°C／145°F[\s\S]*10分[\s\S]*3分/,
    ko: /63°C \/ 145°F[\s\S]*10분[\s\S]*3분/,
    th: /63°C \/ 145°F[\s\S]*10 นาที[\s\S]*3 นาที/
  };
  for (const locale of localeOrder) {
    assert.match(porkDoneness.body[locale], porkPatterns[locale], `${locale}: pork temperature and rest endpoint`);
    assert.match(rest.body[locale], /5/, `${locale}: the final five-minute rest is stated`);
  }
});

test("fifteenth method audit checks four new recipes, five locales, portions, timing, and safe endpoints", () => {
  const gumbo = auditedRecipes.get("chicken-and-sausage-gumbo");
  const pozole = auditedRecipes.get("pozole-rojo");
  const tortilla = auditedRecipes.get("tortilla-espanola");
  const sausages = auditedRecipes.get("nuernberger-rostbratwurst");
  const additions = [gumbo, pozole, tortilla, sausages];

  assert.equal(auditedIds.length, 220);
  assert.equal(new Set(auditedIds).size, 220);
  for (const recipe of additions) {
    assert.ok(recipe, "each fifteenth-batch slug exists");
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${recipe.id}/${locale}: localized ingredients exist`);
      assert.ok(recipe.instructions.every((step) => step.title[locale] && step.body[locale]), `${recipe.id}/${locale}: localized steps exist`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${recipe.id}: total time adds up`);
  }

  assert.equal(gumbo.servings, 8);
  assert.deepEqual([gumbo.prepMinutes, gumbo.cookMinutes, gumbo.totalMinutes], [35, 145, 180]);
  assert.equal(gumbo.ingredients.find((row) => row.item.en === "fine salt, divided")?.amount, "6 g");
  assert.ok(gumbo.sources.some((source) => source.url === foodSafetySource));
  const gumboChickenSalt = recipeStep(gumbo, "Brown the chicken");
  const gumboStock = recipeStep(gumbo, "Whisk in the stock");
  const gumboChicken = recipeStep(gumbo, "Simmer the chicken");
  const gumboRice = recipeStep(gumbo, "Serve over rice");
  const gumboPatterns = {
    en: [/2 g of the salt/, /remaining 4 g salt/, /74°C \/ 165°F[\s\S]*3-minute intervals/, /800 g[\s\S]*8 bowls \(100 g each\)/],
    "zh-hant": [/2 公克鹽/, /剩餘 4 公克鹽/, /74°C／165°F[\s\S]*3 分鐘/, /800 公克[\s\S]*8 碗（每碗 100 公克）/],
    ja: [/塩2g/, /残りの塩4g/, /74°C \/ 165°F[\s\S]*3分/, /800g[\s\S]*8つの器に100gずつ/],
    ko: [/소금 2g/, /남은 소금 4g/, /74°C \/ 165°F[\s\S]*3분/, /밥 800g[\s\S]*8개에 100g씩/],
    th: [/เกลือ 2 กรัม/, /เกลือที่เหลือ 4 กรัม/, /74°C \/ 165°F[\s\S]*3 นาที/, /ข้าวสวยร้อน 800 กรัม[\s\S]*8 ชาม ชามละ 100 กรัม/]
  };
  for (const locale of localeOrder) {
    assert.match(gumboChickenSalt.body[locale], gumboPatterns[locale][0], `${locale}: measured chicken salt`);
    assert.match(gumboStock.body[locale], gumboPatterns[locale][1], `${locale}: remaining salt allocation`);
    assert.match(gumboChicken.body[locale], gumboPatterns[locale][2], `${locale}: safe poultry endpoint`);
    assert.match(gumboRice.body[locale], gumboPatterns[locale][3], `${locale}: rice portions`);
  }
  const gumboCookRange = summedExplicitMinutes(gumbo.instructions.map((step) => step.body.en));
  assert.deepEqual(gumboCookRange, [110, 125]);
  assert.ok(gumbo.cookMinutes >= gumboCookRange[1]);

  assert.equal(pozole.servings, 8);
  assert.deepEqual([pozole.prepMinutes, pozole.cookMinutes, pozole.totalMinutes], [45, 150, 195]);
  assert.match(pozole.ingredients.find((row) => row.item.en.startsWith("pork shoulder"))?.item.en ?? "", /4 cm cubes/);
  assert.ok(pozole.sources.some((source) => source.url === foodSafetySource));
  const porkEndpoint = recipeStep(pozole, "Simmer until the broth melds");
  const pozoleGarnish = recipeStep(pozole, "Prepare the fresh garnishes");
  const pozoleServe = recipeStep(pozole, "Ladle and garnish at the table");
  const pozolePatterns = {
    en: [/63°C \/ 145°F[\s\S]*fork-tender[\s\S]*10-minute intervals[\s\S]*rest the pork in the broth for 3 minutes/, /38 g cabbage[\s\S]*22 g radish[\s\S]*15 g onion/, /evenly among 8 deep bowls/],
    "zh-hant": [/63°C／145°F[\s\S]*叉子輕鬆撥開[\s\S]*再煮 10 分鐘[\s\S]*靜置 3 分鐘/, /38 公克高麗菜[\s\S]*22 公克蘿蔔[\s\S]*15 公克洋蔥/, /平均分入 8 個深碗/],
    ja: [/63°C \/ 145°F[\s\S]*フォークでほぐれる[\s\S]*10分ずつ[\s\S]*3分休ませる/, /キャベツは1人約38g[\s\S]*ラディッシュ約22g[\s\S]*玉ねぎ約15g/, /8つの深い器に均等に分ける/],
    ko: [/63°C \/ 145°F[\s\S]*포크로 쉽게 풀릴[\s\S]*10분씩[\s\S]*3분간 둡니다/, /양배추 약 38g[\s\S]*래디시 22g[\s\S]*양파 15g/, /깊은 그릇 8개에 고르게 나눕니다/],
    th: [/63°C \/ 145°F[\s\S]*ส้อมแยกได้[\s\S]*10 นาที[\s\S]*พักหมูในน้ำซุป 3 นาที/, /กะหล่ำ 38 กรัม[\s\S]*หัวไชเท้า 22 กรัม[\s\S]*หอม 15 กรัม/, /ชามลึก 8 ใบ/]
  };
  for (const locale of localeOrder) {
    assert.match(porkEndpoint.body[locale], pozolePatterns[locale][0], `${locale}: pork safety endpoint and tenderness`);
    assert.match(pozoleGarnish.body[locale], pozolePatterns[locale][1], `${locale}: garnish portions`);
    assert.match(pozoleServe.body[locale], pozolePatterns[locale][2], `${locale}: eight bowls`);
  }

  assert.equal(tortilla.servings, 4);
  assert.deepEqual([tortilla.prepMinutes, tortilla.cookMinutes, tortilla.totalMinutes], [25, 40, 65]);
  assert.ok(tortilla.ingredients.some((row) => row.item.en.startsWith("large eggs; use pasteurized eggs")));
  assert.ok(tortilla.sources.some((source) => source.url === eggSafetySource));
  const tortillaEggs = recipeStep(tortilla, "Flip, finish and rest");
  const tortillaPatterns = {
    en: /71°C \/ 160°F[\s\S]*1-minute intervals[\s\S]*pasteurized eggs[\s\S]*8 wedges[\s\S]*2 per person/,
    "zh-hant": /71°C／160°F[\s\S]*每次再煎 1 分鐘[\s\S]*巴氏殺菌蛋[\s\S]*8 片[\s\S]*每人 2 片/,
    ja: /71°C \/ 160°F[\s\S]*1分ずつ[\s\S]*殺菌済み卵[\s\S]*8等分[\s\S]*1人2切れ/,
    ko: /71°C \/ 160°F[\s\S]*1분씩[\s\S]*살균란[\s\S]*8조각[\s\S]*1인당 2조각/,
    th: /71°C \/ 160°F[\s\S]*ครั้งละ 1 นาที[\s\S]*ไข่พาสเจอไรซ์[\s\S]*8 ชิ้น[\s\S]*คนละ 2 ชิ้น/
  };
  for (const locale of localeOrder) assert.match(tortillaEggs.body[locale], tortillaPatterns[locale], `${locale}: egg-safety path and portions`);

  assert.equal(sausages.servings, 4);
  assert.deepEqual([sausages.prepMinutes, sausages.cookMinutes, sausages.totalMinutes], [15, 65, 80]);
  assert.equal(sausages.ingredients.find((row) => row.item.en.startsWith("fine salt, divided"))?.amount, "3 g");
  assert.ok(sausages.sources.some((source) => source.url === foodSafetySource));
  const sausageSalt = recipeStep(sausages, "Soften the onion and apple");
  const sausageSaltFinish = recipeStep(sausages, "Reduce the cabbage juices");
  const sausageDoneness = recipeStep(sausages, "Brown the sausages");
  const sausageServe = recipeStep(sausages, "Serve with mustard");
  const sausagePatterns = {
    en: [/2 g salt/, /remaining 1 g salt only if needed/, /71°C \/ 160°F[\s\S]*1-minute intervals[\s\S]*package reheating directions/, /700 g sauerkraut[\s\S]*175 g each[\s\S]*6 sausages[\s\S]*40 g German mustard[\s\S]*10 g per person/],
    "zh-hant": [/2 公克鹽/, /剩餘 1 公克鹽/, /71°C／160°F[\s\S]*再煎 1 分鐘[\s\S]*依包裝指示回熱/, /700 公克酸菜[\s\S]*175 公克[\s\S]*6 根香腸[\s\S]*40 公克德式芥末[\s\S]*10 公克/],
    ja: [/塩2g/, /残りの塩1g/, /71°C \/ 160°F[\s\S]*1分ずつ[\s\S]*包装の温め方/, /ザワークラウト700g[\s\S]*約175g[\s\S]*ソーセージ6本[\s\S]*マスタード40g[\s\S]*約10g/],
    ko: [/소금 2g/, /남은 소금 1g/, /71°C \/ 160°F[\s\S]*1분씩[\s\S]*포장 지침/, /사우어크라우트 700g[\s\S]*약 175g[\s\S]*소시지 6개[\s\S]*머스터드 40g[\s\S]*10g/],
    th: [/เกลือ 2 กรัม/, /เกลือ 1 กรัมที่เหลือ/, /71°C \/ 160°F[\s\S]*ครั้งละ 1 นาที[\s\S]*ตามคำแนะนำบนฉลาก/, /ซาวเคราต์ 700 กรัม[\s\S]*175 กรัม[\s\S]*ไส้กรอกจานละ 6 ชิ้น[\s\S]*มัสตาร์ดเยอรมัน 40 กรัม[\s\S]*10 กรัม/]
  };
  for (const locale of localeOrder) {
    assert.match(sausageSalt.body[locale], sausagePatterns[locale][0], `${locale}: salt allocation`);
    assert.match(sausageSaltFinish.body[locale], sausagePatterns[locale][1], `${locale}: optional final salt`);
    assert.match(sausageDoneness.body[locale], sausagePatterns[locale][2], `${locale}: sausage endpoint`);
    assert.match(sausageServe.body[locale], sausagePatterns[locale][3], `${locale}: per-person portions`);
  }
  assert.deepEqual([7 + 25 + 5 + (2 * 6) + 3, 7 + 25 + 8 + (2 * 8) + 3], [52, 59]);
  assert.ok(sausages.cookMinutes >= 59, "cook time covers both sausage batches and the high end of timed stages");
});

test("sixteenth method audit checks four existing recipes, five locales, allocations, timing, portions, and doneness", () => {
  assert.equal(auditedIds.length, 220, "deep-review coverage contains 220 distinct recipes");
  assert.equal(new Set(auditedIds).size, 220, "coverage IDs are unique");
  const moqueca = auditedRecipes.get("moqueca-baiana");
  const egusi = auditedRecipes.get("nigerian-egusi-soup");
  const luRouFan = auditedRecipes.get("lu-rou-fan");
  const boKho = auditedRecipes.get("bo-kho");
  const additions = [moqueca, egusi, luRouFan, boKho];
  for (const recipe of additions) {
    assert.ok(recipe, "each sixteenth-batch slug exists");
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${recipe.id}/${locale}: localized ingredients exist`);
      assert.ok(recipe.instructions.every((step) => step.title[locale] && step.body[locale]), `${recipe.id}/${locale}: localized steps exist`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${recipe.id}: total time adds up`);
  }

  assert.equal(moqueca.servings, 4);
  assert.deepEqual([moqueca.prepMinutes, moqueca.cookMinutes, moqueca.totalMinutes], [25, 35, 60]);
  assert.ok(moqueca.sources.some((source) => source.url === foodSafetySource));
  const seafoodEndpoint = recipeStep(moqueca, "Simmer without stirring");
  const moquecaServe = recipeStep(moqueca, "Serve with rice");
  const moquecaEndpointPatterns = {
    en: /63°C \(145°F\)[\s\S]*2-minute intervals[\s\S]*pink, pearly and opaque/,
    "zh-hant": /63°C（145°F）[\s\S]*每次煮 2 分鐘[\s\S]*粉紅、珍珠白且不透明/,
    ja: /63°C（145°F）[\s\S]*2分ずつ追加[\s\S]*不透明/,
    ko: /63°C \(145°F\)[\s\S]*2분씩 더[\s\S]*불투명/,
    th: /63°C \(145°F\)[\s\S]*ครั้งละ 2 นาที[\s\S]*ทึบแสง/
  };
  const moquecaPortionPatterns = {
    en: /four warm bowls[\s\S]*200 g fish[\s\S]*75 g shrimp[\s\S]*150 g cooked rice/,
    "zh-hant": /四個溫碗[\s\S]*200 g 魚[\s\S]*75 g 蝦[\s\S]*150 g 熟飯/,
    ja: /4つの器[\s\S]*魚約200g[\s\S]*えび75g[\s\S]*ご飯150g/,
    ko: /생선 약 200g[\s\S]*새우 75g[\s\S]*따뜻한 그릇 네 개[\s\S]*밥 150g/,
    th: /ชามอุ่น 4 ใบ[\s\S]*ปลา[\s\S]*200 กรัม[\s\S]*กุ้ง 75 กรัม[\s\S]*150 กรัม/
  };
  for (const locale of localeOrder) {
    assert.match(seafoodEndpoint.body[locale], moquecaEndpointPatterns[locale], `${locale}: fish temperature and shrimp doneness fallback`);
    assert.match(moquecaServe.body[locale], moquecaPortionPatterns[locale], `${locale}: four seafood and rice portions`);
  }
  assert.ok(moqueca.cookMinutes >= 30, "35-minute cook estimate covers 5 + 5 + 15 + 5 timed stages plus a 5-minute startup allowance");

  assert.equal(egusi.servings, 6);
  assert.deepEqual([egusi.prepMinutes, egusi.cookMinutes, egusi.totalMinutes], [25, 90, 115]);
  assert.ok(egusi.sources.some((source) => source.url === foodSafetySource));
  const stock = egusi.ingredients.find((row) => row.item.en.startsWith("unsalted beef stock"));
  const dividedSalt = egusi.ingredients.find((row) => row.item.en.startsWith("fine salt, divided"));
  const egusiBeef = recipeStep(egusi, "Season and simmer the beef");
  const egusiPaste = recipeStep(egusi, "Make the egusi paste");
  const egusiBase = recipeStep(egusi, "Build the red palm-oil base");
  const egusiBroth = recipeStep(egusi, "Whisk the egusi into the broth");
  const egusiFinish = recipeStep(egusi, "Add meat, smoked fish and greens");
  const egusiServe = recipeStep(egusi, "Serve with a swallow");
  const egusiBeefPatterns = {
    en: /45 minutes[\s\S]*63°C \(145°F\)[\s\S]*3 minutes/,
    "zh-hant": /45 分鐘[\s\S]*63°C（145°F）[\s\S]*3 分鐘/,
    ja: /45分[\s\S]*63°C（145°F）[\s\S]*3分/,
    ko: /45분[\s\S]*63°C \(145°F\)[\s\S]*3분/,
    th: /45 นาที[\s\S]*63°C \(145°F\)[\s\S]*3 นาที/
  };
  const egusiFinishPatterns = {
    en: /up to the remaining 5 g salt[\s\S]*after tasting/,
    "zh-hant": /先試味[\s\S]*最多 5 g/,
    ja: /味見しながら残り最大5g/,
    ko: /맛을 본 뒤[\s\S]*최대 5g/,
    th: /ชิมก่อน[\s\S]*ไม่เกิน 5 กรัม/
  };
  const egusiSaltPatterns = {
    en: /3 g[\s\S]*up to 5 g[\s\S]*tasting/,
    "zh-hant": /3 g[\s\S]*最多加 5 g[\s\S]*先試味/,
    ja: /3g[\s\S]*最大5g[\s\S]*味を見て/,
    ko: /3g[\s\S]*최대 5g[\s\S]*맛을 본 뒤/,
    th: /3 กรัม[\s\S]*ไม่เกิน 5 กรัม[\s\S]*ชิมก่อน/
  };
  const egusiServePatterns = {
    en: /six warm bowls[\s\S]*six wedges/,
    "zh-hant": /六個溫碗[\s\S]*切六角/,
    ja: /6つの器[\s\S]*6切れ/,
    ko: /그릇 여섯 개[\s\S]*여섯 조각/,
    th: /6 ใบ[\s\S]*6 ซีก/
  };
  for (const locale of localeOrder) {
    assert.match(stock.item[locale], /500[\s\S]*180[\s\S]*520/, `${locale}: stock is split across beef, paste, and soup`);
    assert.match(dividedSalt.item[locale], egusiSaltPatterns[locale], `${locale}: salt is allocated and held back for tasting`);
    assert.match(egusiBeef.body[locale], egusiBeefPatterns[locale], `${locale}: beef temperature and rest endpoint`);
    assert.match(egusiPaste.body[locale], /180/, `${locale}: reserved liquid for the egusi paste`);
    assert.match(egusiBase.body[locale], /90[\s\S]*20/, `${locale}: all palm oil and crayfish allocated`);
    assert.match(egusiBroth.body[locale], /520/, `${locale}: soup stock allocation`);
    assert.match(egusiFinish.body[locale], egusiFinishPatterns[locale], `${locale}: optional salt added only after tasting`);
    assert.match(egusiServe.body[locale], egusiServePatterns[locale], `${locale}: servings and lime wedges`);
  }
  assert.ok(egusi.cookMinutes >= 85, "90-minute estimate covers 45-minute beef simmer, 3-minute rest, and up to 25 + 8 + 4 minutes for soup stages");

  assert.equal(luRouFan.servings, 4);
  assert.deepEqual([luRouFan.prepMinutes, luRouFan.cookMinutes, luRouFan.totalMinutes], [40, 115, 155]);
  const luRouPrep = recipeStep(luRouFan, "Fry the shallots");
  const luRouPork = recipeStep(luRouFan, "Render and brown pork");
  const luRouBraise = recipeStep(luRouFan, "Braise with the eggs");
  const luRouServe = recipeStep(luRouFan, "Serve over rice");
  const luRouPrepPatterns = {
    en: /650 ml[\s\S]*20 minutes[\s\S]*exactly 650 ml[\s\S]*all 20 ml oil/,
    "zh-hant": /650 毫升[\s\S]*20 分鐘[\s\S]*總量 650 毫升[\s\S]*全部 20 毫升油/,
    ja: /650ml[\s\S]*20分[\s\S]*全量を650ml[\s\S]*油20mlすべて/,
    ko: /650ml[\s\S]*20분[\s\S]*총 650ml[\s\S]*기름 20ml 전부/,
    th: /650 มล[\s\S]*20 นาที[\s\S]*ทั้งหมด 650 มล[\s\S]*น้ำมันทั้ง 20 มล/
  };
  const luRouPortionPatterns = {
    en: /800 g[\s\S]*four bowls \(200 g each\)[\s\S]*one halved egg per person[\s\S]*all 250 g[\s\S]*62–63 g each/,
    "zh-hant": /800 g[\s\S]*四碗（每碗 200 g）[\s\S]*各放一顆[\s\S]*全部 250 g[\s\S]*62–63 g/,
    ja: /ご飯800g[\s\S]*4つの丼[\s\S]*卵1個[\s\S]*青菜250gすべて[\s\S]*62〜63g/,
    ko: /밥 800g[\s\S]*네 그릇[\s\S]*달걀 1개[\s\S]*채소 250g 전부[\s\S]*62~63g/,
    th: /ข้าวร้อน 800 กรัม[\s\S]*4 ชาม[\s\S]*1 ฟอง[\s\S]*ผักลวกทั้ง 250 กรัม[\s\S]*62–63 กรัม/
  };
  const luRouOilPatterns = {
    en: /all the reserved shallot-frying oil/,
    "zh-hant": /保留的炸紅蔥油全部/,
    ja: /取っておいたエシャロット油をすべて/,
    ko: /샬롯 기름을 전부/,
    th: /น้ำมันที่ใช้เจียวหอมแดงซึ่งพักไว้ทั้งหมด/
  };
  for (const locale of localeOrder) {
    assert.match(luRouPrep.body[locale], luRouPrepPatterns[locale], `${locale}: mushroom liquid and oil allocation`);
    assert.match(luRouPork.body[locale], luRouOilPatterns[locale], `${locale}: all fried-shallot oil is reused in the pork braise`);
    assert.match(luRouBraise.body[locale], /70/, `${locale}: low, long braise and spoon-tender endpoint`);
    assert.match(luRouServe.body[locale], luRouPortionPatterns[locale], `${locale}: rice, egg, and all greens apportioned`);
  }
  const luRouTimedCook = [8 + 10 + 2 + 1 + 70 + 8, 10 + 12 + 3 + 1 + 70 + 12];
  assert.deepEqual(luRouTimedCook, [99, 108], "mushroom soaking and periodic stirring are not added as extra cook stages");
  assert.ok(luRouFan.cookMinutes >= luRouTimedCook[1], "115-minute cook estimate covers the high end of timed shallot, pork, caramel, braise, and sauce stages");

  assert.equal(boKho.servings, 4);
  assert.deepEqual([boKho.prepMinutes, boKho.cookMinutes, boKho.totalMinutes], [55, 200, 255]);
  const boKhoMarinade = recipeStep(boKho, "Cut and marinate the beef");
  const boKhoPrep = recipeStep(boKho, "Prepare the aromatics");
  const boKhoBraise = recipeStep(boKho, "Simmer until nearly tender");
  const boKhoCarrots = recipeStep(boKho, "Cook the carrots");
  const boKhoServe = recipeStep(boKho, "Serve with fresh basil");
  const boKhoPrepPatterns = {
    en: /While the beef marinates in the refrigerator for 30 minutes/,
    "zh-hant": /牛肉在冰箱醃漬 30 分鐘期間/,
    ja: /牛肉を冷蔵庫で30分漬けている間に/,
    ko: /소고기를 냉장고에서 30분 재우는 동안/,
    th: /ระหว่างหมักเนื้อในตู้เย็น 30 นาที/
  };
  const boKhoPortionPatterns = {
    en: /four bowls[\s\S]*20 g Thai basil[\s\S]*about 5 g[\s\S]*four wedges, one per bowl[\s\S]*one-quarter of the optional baguette/,
    "zh-hant": /四碗[\s\S]*20 g 泰國羅勒[\s\S]*約 5 g[\s\S]*四角，每碗一角[\s\S]*可選的小法國麵包約四分之一條/,
    ja: /4つの器[\s\S]*タイバジル20g[\s\S]*約5g[\s\S]*4切れ[\s\S]*バゲット約4分の1本/,
    ko: /네 그릇[\s\S]*타이 바질 20g[\s\S]*약 5g[\s\S]*네 조각[\s\S]*바게트 약 4분의 1/,
    th: /4 ชาม[\s\S]*โหระพาไทย 20 กรัม[\s\S]*ประมาณ 5 กรัม[\s\S]*4 ซีก[\s\S]*บาแก็ตประมาณหนึ่งในสี่/
  };
  const boKhoTendernessPatterns = {
    en: /fork but still resist/,
    "zh-hant": /叉子能插入/,
    ja: /フォークが少し抵抗を残して入る/,
    ko: /포크가 약간 저항하며 들어갈/,
    th: /จิ้มส้อมเข้าได้แต่ยังต้านเล็กน้อย/
  };
  for (const locale of localeOrder) {
    assert.match(boKhoPrep.body[locale], boKhoPrepPatterns[locale], `${locale}: aromatics are prepared during the marinade`);
    assert.match(boKhoBraise.body[locale], boKhoTendernessPatterns[locale], `${locale}: long moist braise has a tenderness endpoint`);
    assert.match(boKhoCarrots.body[locale], /10-minute intervals|每次延長 10 分鐘|10分ずつ|10분씩|ครั้งละ 10 นาที/, `${locale}: beef tenderness has a timed recheck path`);
    assert.match(boKhoServe.body[locale], boKhoPortionPatterns[locale], `${locale}: basil, lime, and bread portions`);
  }
  assert.deepEqual([10 + 3 + 120 + 35 + 10 + 5 + 5], [188]);
  assert.ok(boKho.cookMinutes >= 188, "200-minute estimate covers two beef batches, aromatics, the braise and carrots, one 10-minute tenderness recheck, finish/rest, and time to return the liquid to a simmer");
});
