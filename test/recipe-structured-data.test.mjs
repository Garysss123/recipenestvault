import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { cuisines, localeOrder } from "../src/data.mjs";
import { recipeCategory, recipeKeywords } from "../src/recipe-structured-data.mjs";
import { recipes } from "../src/recipes.mjs";

const dist = new URL("../dist/", import.meta.url);

function localized(value, locale) {
  return value?.[locale] ?? value?.en ?? value ?? "";
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">");
}

function duration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `PT${hours ? `${hours}H` : ""}${remainder ? `${remainder}M` : ""}`;
}

function expectedInstructions(recipe, locale) {
  return recipe.instructions.map((step) => {
    if (step && typeof step === "object" && step.body) return localized(step.body, locale);
    return String(localized(step, locale)).replace(/^\d+\.(?!\d)\s*/, "");
  });
}

test("all 353 recipes have valid, source-backed JSON-LD matching each of five visible locales", async () => {
  assert.equal(recipes.length, 353, "published recipe count");
  assert.equal(localeOrder.length, 5, "published locale count");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, recipes.length, "recipe IDs are unique");

  let pagesChecked = 0;
  for (const locale of localeOrder) {
    for (const recipe of recipes) {
      const path = new URL(`${locale}/recipes/${recipe.id}/index.html`, dist);
      const html = await readFile(path, "utf8");
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      assert.equal(scripts.length, 1, `${locale}/${recipe.id}: one JSON-LD block`);

      let document;
      assert.doesNotThrow(() => { document = JSON.parse(scripts[0][1]); }, `${locale}/${recipe.id}: JSON-LD parses`);
      assert.equal(document["@context"], "https://schema.org", `${locale}/${recipe.id}: Schema.org context`);
      const graph = document["@graph"];
      assert.ok(Array.isArray(graph), `${locale}/${recipe.id}: JSON-LD graph exists`);
      const matches = graph.filter((entry) => entry["@type"] === "Recipe");
      assert.equal(matches.length, 1, `${locale}/${recipe.id}: exactly one Recipe entity`);
      const schema = matches[0];

      // Google's required Recipe properties.
      assert.equal(schema.name, localized(recipe.name, locale), `${locale}/${recipe.id}: required name`);
      assert.ok(schema.image?.url, `${locale}/${recipe.id}: required completed-dish image`);
      assert.equal(schema.image.url, `https://recipenestvault.com/images/recipes/${recipe.id}-1440.webp`, `${locale}/${recipe.id}: recipe image URL`);
      assert.ok(html.includes(`/images/recipes/${recipe.id}-960.webp`), `${locale}/${recipe.id}: schema image has a visible page image`);

      // Other supported fields are checked against the recipe model and visible page.
      assert.equal(schema.description, localized(recipe.description, locale), `${locale}/${recipe.id}: description`);
      assert.equal(schema.inLanguage, locale === "zh-hant" ? "zh-Hant" : locale, `${locale}/${recipe.id}: language`);
      assert.equal(schema.prepTime, duration(recipe.prepMinutes), `${locale}/${recipe.id}: prepTime`);
      assert.equal(schema.cookTime, duration(recipe.cookMinutes), `${locale}/${recipe.id}: cookTime`);
      assert.equal(schema.totalTime, duration(recipe.totalMinutes), `${locale}/${recipe.id}: totalTime`);
      assert.equal(schema.recipeYield, String(recipe.servings), `${locale}/${recipe.id}: yield`);
      assert.equal(schema.recipeCuisine, cuisines.find((cuisine) => cuisine.id === recipe.cuisine).names[locale], `${locale}/${recipe.id}: cuisine`);
      assert.deepEqual(schema.author, { "@type": "Organization", name: "Recipe Nest Vault", url: "https://recipenestvault.com" }, `${locale}/${recipe.id}: author is the publishing organization`);

      assert.ok(Array.isArray(schema.recipeIngredient) && schema.recipeIngredient.length > 0, `${locale}/${recipe.id}: ingredient list exists`);
      for (const row of recipe.ingredients) {
        assert.ok(row.item?.[locale], `${locale}/${recipe.id}: ingredient keyword source is localized`);
      }
      const expectedIngredients = recipe.ingredients.map((row) => `${localized(row.amount, locale)} ${localized(row.item, locale)}`);
      assert.deepEqual(schema.recipeIngredient, expectedIngredients, `${locale}/${recipe.id}: ingredients match authored data`);
      const ingredientBlock = html.match(/<section class="recipe-section ingredients-section"[\s\S]*?<ul>([\s\S]*?)<\/ul>/)?.[1];
      assert.ok(ingredientBlock, `${locale}/${recipe.id}: visible ingredient list exists`);
      const visibleIngredients = [...ingredientBlock.matchAll(/<li><span>(.*?)<\/span><p>(.*?)<\/p><\/li>/g)]
        .map(([, amount, item]) => `${decodeHtml(amount)} ${decodeHtml(item)}`);
      assert.deepEqual(visibleIngredients, schema.recipeIngredient, `${locale}/${recipe.id}: visible ingredients match JSON-LD`);

      const expectedKeywords = recipeKeywords(recipe, locale);
      assert.equal(schema.keywords, expectedKeywords, `${locale}/${recipe.id}: localized keywords use listed ingredients`);
      assert.ok(schema.keywords.length > 0, `${locale}/${recipe.id}: keywords are not empty`);
      for (const keyword of schema.keywords.split(", ")) {
        assert.ok(visibleIngredients.some((ingredient) => ingredient.includes(keyword)), `${locale}/${recipe.id}: keyword '${keyword}' appears in visible ingredients`);
      }
      assert.ok(!schema.keywords.includes(cuisines.find((cuisine) => cuisine.id === recipe.cuisine).names[locale]), `${locale}/${recipe.id}: cuisine is not stuffed into keywords`);

      const category = recipeCategory(recipe, locale);
      if (category) {
        assert.equal(schema.recipeCategory, category, `${locale}/${recipe.id}: category matches visible label`);
        assert.ok(!schema.keywords.split(", ").includes(category), `${locale}/${recipe.id}: category is not duplicated in keywords`);
      }
      else assert.equal(Object.hasOwn(schema, "recipeCategory"), false, `${locale}/${recipe.id}: unsupported category is omitted`);
      const eyebrow = html.match(/<p class="eyebrow">(.*?)<\/p>/)?.[1] ?? "";
      if (category) assert.ok(decodeHtml(eyebrow).includes(category), `${locale}/${recipe.id}: category appears in visible eyebrow`);

      const methodBlock = html.match(/<section class="recipe-section method-section"[\s\S]*?<ol>([\s\S]*?)<\/ol>/)?.[1];
      assert.ok(methodBlock, `${locale}/${recipe.id}: visible method exists`);
      const visibleInstructions = [...methodBlock.matchAll(/<li id="step-(\d+)">([\s\S]*?)<\/li>/g)];
      const instructions = expectedInstructions(recipe, locale);
      assert.equal(visibleInstructions.length, instructions.length, `${locale}/${recipe.id}: every visible step has an anchor`);
      assert.ok(Array.isArray(schema.recipeInstructions), `${locale}/${recipe.id}: HowToStep instructions exist`);
      assert.equal(schema.recipeInstructions.length, instructions.length, `${locale}/${recipe.id}: step count`);
      schema.recipeInstructions.forEach((step, index) => {
        const stepUrl = `https://recipenestvault.com/${locale}/recipes/${recipe.id}/#step-${index + 1}`;
        assert.equal(step["@type"], "HowToStep", `${locale}/${recipe.id}: step ${index + 1} type`);
        assert.equal(step.position, index + 1, `${locale}/${recipe.id}: step ${index + 1} position`);
        assert.equal(step.text, instructions[index], `${locale}/${recipe.id}: step ${index + 1} text`);
        assert.equal(step.url, stepUrl, `${locale}/${recipe.id}: step ${index + 1} URL points at a real anchor`);
        assert.equal(visibleInstructions[index][1], String(index + 1), `${locale}/${recipe.id}: visible step ${index + 1} anchor`);
        assert.ok(decodeHtml(visibleInstructions[index][2]).includes(instructions[index]), `${locale}/${recipe.id}: step ${index + 1} text is visible`);
        if (step.image) assert.ok(html.includes(step.image.replace("https://recipenestvault.com", "")), `${locale}/${recipe.id}: step image is visible`);
      });

      assert.ok(html.includes(`<h1>${escapeHtml(localized(recipe.name, locale))}</h1>`), `${locale}/${recipe.id}: visible heading matches name`);
      assert.ok(html.includes(`<p class="recipe-deck">${escapeHtml(localized(recipe.description, locale))}</p>`), `${locale}/${recipe.id}: visible description matches`);
      assert.ok(html.includes(escapeHtml(cuisines.find((cuisine) => cuisine.id === recipe.cuisine).names[locale])), `${locale}/${recipe.id}: cuisine is visible`);

      // These values are not present in source data, so emitting them would be fabricated.
      for (const unsupported of ["aggregateRating", "nutrition", "video", "datePublished", "dateModified"]) {
        assert.equal(Object.hasOwn(schema, unsupported), false, `${locale}/${recipe.id}: unsupported ${unsupported} is omitted`);
      }
      pagesChecked++;
    }
  }
  assert.equal(pagesChecked, 1765, "every recipe page in all five locales is checked");
});

test("representative rendered recipe pages match independently reviewed category and keyword expectations", async () => {
  const expectations = [
    {
      recipe: "bun-cha",
      locale: "th",
      category: undefined,
      keywords: "หมูสับไขมันประมาณ 20%, น้ำปลา, น้ำมันหอย"
    },
    {
      recipe: "black-forest-cake",
      locale: "en",
      category: "Dessert",
      keywords: "large eggs, cornstarch, unsweetened cocoa powder"
    },
    {
      recipe: "kung-pao-chicken",
      locale: "zh-hant",
      category: undefined,
      keywords: "去骨去皮雞腿肉, 生抽, 紹興酒"
    }
  ];

  for (const expected of expectations) {
    const html = await readFile(new URL(`${expected.locale}/recipes/${expected.recipe}/index.html`, dist), "utf8");
    const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? "null");
    const recipe = jsonLd?.["@graph"]?.find((entry) => entry["@type"] === "Recipe");
    assert.ok(recipe, `${expected.locale}/${expected.recipe}: rendered Recipe entity exists`);
    assert.equal(recipe.recipeCategory, expected.category, `${expected.locale}/${expected.recipe}: hard-coded page category expectation`);
    assert.equal(recipe.keywords, expected.keywords, `${expected.locale}/${expected.recipe}: hard-coded page keyword expectation`);
    assert.ok(recipe.keywords.split(", ").length <= 3, `${expected.locale}/${expected.recipe}: no more than three page keywords`);
  }

  const bunChaThaiKeywords = expectations[0].keywords.split(", ");
  assert.ok(bunChaThaiKeywords.includes("น้ำปลา"), "Thai fish sauce remains a distinctive keyword instead of being removed as water");
  assert.ok(bunChaThaiKeywords.includes("น้ำมันหอย"), "Thai oyster sauce remains a distinctive keyword instead of being removed as oil");
});
