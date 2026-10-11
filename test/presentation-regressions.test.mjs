import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { cuisines, featured, fill, localeOrder, locales } from "../src/data.mjs";
import { cuisineCollections } from "../src/cuisine-collections.mjs";
import { recipeDraftA } from "../src/recipe-draft-a.mjs";
import { recipeDraftB } from "../src/recipe-draft-b.mjs";
import { recipes } from "../src/recipes.mjs";
import { featuredCuisineHref, hasPublishedCuisineRecipes } from "../src/presentation.mjs";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const promptDerivedChineseRecipeIds = [
  "sweet-sour-pork",
  "clay-pot-rice",
  "beef-chow-fun",
  "wonton-soup",
  "peking-duck"
];

const staleFeaturedCopy = {
  en: /coming|future collection|collection preview/i,
  "zh-hant": /即將登場|預告未來|內容預覽/,
  ja: /これから加わる|コレクション予告/,
  ko: /곧 만나게|앞으로 여러 지역|미리 보기/,
  th: /กำลังจะมาถึง|คอลเลกชันในอนาคต|ตัวอย่างคอลเลกชัน/
};

test("featured cards link to published cuisine collections in all five locales", async () => {
  for (const locale of localeOrder) {
    const html = await readFile(`${dist}/${locale}/index.html`, "utf8");
    const section = html.match(/<section class="featured-section" id="featured"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, `${locale}: featured section is rendered`);
    const cards = [...section.matchAll(/<article class="recipe-card" id="preview-([^"]+)">([\s\S]*?)<\/article>/g)];
    assert.equal(cards.length, featured.length, `${locale}: all featured cards render`);

    for (const [, id, markup] of cards) {
      const item = featured.find((candidate) => candidate.id === id);
      assert.ok(item, `${locale}: ${id} belongs to featured data`);
      const cuisine = cuisines.find((candidate) => candidate.id === item.cuisine);
      const href = featuredCuisineHref(locale, item.cuisine);
      const action = fill(locales[locale].ui.viewCuisine, { cuisine: cuisine.names[locale] });
      assert.ok(markup.includes(`<a class="recipe-card-link" href="${href}" aria-label="${action}">`), `${locale}: ${id} has an accessible collection link`);
      assert.ok(hasPublishedCuisineRecipes(recipes.filter((recipe) => recipe.cuisine === item.cuisine)), `${locale}: ${id} points to a populated collection`);
    }

    assert.doesNotMatch(section, staleFeaturedCopy[locale], `${locale}: featured copy describes current collections`);
    const searchHtml = await readFile(`${dist}/${locale}/search/index.html`, "utf8");
    assert.ok(searchHtml.includes(`data-preview-label="${locales[locale].ui.collectionPreview}"`), `${locale}: featured dish search label is localized`);
    assert.ok(searchHtml.includes(locales[locale].ui.searchIntro), `${locale}: search copy matches current featured content`);
    assert.doesNotMatch(searchHtml, staleFeaturedCopy[locale], `${locale}: search copy does not promise future previews`);
  }
});

test("published Chinese recipes render as a collection in every locale", async () => {
  const chineseRecipes = recipes.filter((recipe) => recipe.cuisine === "chinese");
  assert.ok(chineseRecipes.length > 0);

  for (const locale of localeOrder) {
    const collection = cuisineCollections.chinese?.[locale];
    assert.ok(hasPublishedCuisineRecipes(chineseRecipes), `${locale}: recipe availability determines page state`);
    const html = await readFile(`${dist}/${locale}/cuisines/chinese/index.html`, "utf8");
    assert.match(html, /<section class="recipe-collection"/, `${locale}: published recipes are shown`);
    assert.doesNotMatch(html, /class="coming-section"/, `${locale}: populated page is not marked as coming`);
    assert.equal([...html.matchAll(/<article class="collection-recipe-card">/g)].length, chineseRecipes.length, `${locale}: all published Chinese recipes appear`);
    assert.ok(collection?.title, `${locale}: collection heading is localized`);
  }
});

test("empty cuisine state stays negative when no published recipes exist", () => {
  assert.equal(hasPublishedCuisineRecipes([]), false);
  assert.equal(hasPublishedCuisineRecipes(undefined), false);
  assert.equal(hasPublishedCuisineRecipes(null), false);
  assert.equal(hasPublishedCuisineRecipes([{ id: "published-recipe" }]), true);
});

test("Chinese visual briefs generate localized dish-name alt without changing authored alts", () => {
  const generatedById = new Map(recipeDraftB.map((recipe) => [recipe.id, recipe]));
  for (const id of promptDerivedChineseRecipeIds) {
    const recipe = generatedById.get(id);
    assert.ok(recipe, `${id}: source recipe exists`);
    assert.deepEqual(recipe.imageAlt, recipe.name, `${id}: alt follows the localized recipe name`);
    for (const locale of localeOrder) {
      assert.equal(recipe.imageAlt[locale], recipe.name[locale], `${id}/${locale}: alt is natural localized text`);
      assert.doesNotMatch(recipe.imageAlt[locale], /real finished-dish brief/i, `${id}/${locale}: internal prompt is not exposed`);
    }
  }

  const authoredAlt = recipeDraftA.find((recipe) => recipe.id === "mapo-tofu");
  assert.ok(authoredAlt);
  assert.notEqual(authoredAlt.imageAlt.en, authoredAlt.name.en, "existing authored descriptive alt remains intact");
  assert.match(authoredAlt.imageAlt.en, /tofu cubes|pork|sauce/i);
});
