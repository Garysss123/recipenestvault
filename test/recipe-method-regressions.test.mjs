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
  "bouillabaisse", "pissaladiere", "pasta-con-le-sarde", "stuffat-tal-fenek"
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
