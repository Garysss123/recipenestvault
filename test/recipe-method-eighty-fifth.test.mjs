import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["butter-chicken", "cheeseburger", "chicken-teriyaki", "coffin-bread"];
const nextBatchIds = ["creme-brulee", "gulab-jamun", "koshari", "mango-sticky-rice"];
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const published = new Map(recipes.map((dish) => [dish.id, dish]));
const drafts = new Map(allRecipeDrafts.map((dish) => [dish.id, dish]));

function parseIds(source, declaration) {
  const body = source.match(declaration)?.[1];
  assert.ok(body, "coverage declaration exists");
  return [...body.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
}

function dish(id) {
  const found = published.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function hasOfficialSources(recipe) {
  for (const url of [handling, temperatures]) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: ${url} is separately attributed as official food-safety guidance`);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${recipe.id}: culinary references remain separate`);
}

test("eighty-fifth batch reimplements four excluded methods and preserves recipe source facts", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const historicReviewed = parseIds(ledgerSource, /const auditedIds = \[([\s\S]*?)\n\];/);
  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const historicExcluded = parseIds(exclusionSource, /const excludedIds = \[([\s\S]*?)\n\];/);
  const historicSnapshot = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261013.json", import.meta.url), "utf8"));
  const snapshot = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261014.json", import.meta.url), "utf8"));
  const cumulativeIds = [...ids, ...nextBatchIds];
  const newReviewed = [...historicReviewed, ...cumulativeIds];
  const newExcluded = historicExcluded.filter((id) => !cumulativeIds.includes(id));

  assert.equal(historicReviewed.length, 335);
  assert.equal(new Set(historicReviewed).size, 335);
  assert.equal(historicExcluded.length, 18);
  assert.equal(new Set(historicExcluded).size, 18);
  assert.deepEqual(historicSnapshot.counts, { registry: 353, reviewed: 335, excluded: 18, unclassified: 0 },
    "the historical 2026-10-13 coverage record remains intact");
  assert.ok(ids.every((id) => historicExcluded.includes(id)), "the four recipes started in the excluded set");
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(newReviewed.length, 343);
  assert.equal(new Set(newReviewed).size, 343);
  assert.equal(newExcluded.length, 10);
  assert.equal(new Set(newExcluded).size, 10);
  assert.equal(new Set([...newReviewed, ...newExcluded]).size, 353);
  assert.deepEqual([...newReviewed].sort(), snapshot.reviewedIds);
  assert.deepEqual([...newExcluded].sort(), snapshot.excludedIds);
  assert.deepEqual([...cumulativeIds].sort(), snapshot.reimplementedIds);
  assert.deepEqual(snapshot.counts, { registry: 353, reviewed: 343, reimplemented: 8, excluded: 10, unclassified: 0 });
  assert.ok(ids.every((id) => !historicReviewed.includes(id)));

  for (const id of ids) {
    const current = dish(id);
    const source = drafts.get(id);
    assert.ok(source, `${id}: original source draft remains present`);
    assert.notDeepEqual(current.instructions, source.instructions, `${id}: five-language published method is refined`);
    assert.notDeepEqual(current.sources, source.sources, `${id}: official safety references are separately added`);
    assert.deepEqual(current.ingredients, source.ingredients, `${id}: ingredient rows and quantities are preserved`);
    assert.equal(current.servings, source.servings, `${id}: serving count is preserved`);
    assert.equal(current.instructions.length, source.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(current.instructions.map((step) => step.imageScene), source.instructions.map((step) => step.imageScene),
      `${id}: illustration stages stay aligned`);
    assert.equal(current.totalMinutes, current.prepMinutes + current.cookMinutes, `${id}: total time adds up`);
    assert.ok(current.tips.length >= 2 && current.commonMistakes.length >= 2, `${id}: practical tips and recovery notes exist`);
    for (const locale of localeOrder) {
      assert.ok(current.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: all steps are localized`);
      assert.ok(current.tips.every((tip) => tip[locale]) && current.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: tips and recovery guidance are localized`);
      assert.ok(current.storage[locale], `${id}/${locale}: storage guidance is localized`);
      assert.match(current.storage[locale], /74°C/, `${id}/${locale}: leftover reheating endpoint is stated`);
    }
    hasOfficialSources(current);
  }

  assert.deepEqual([dish("butter-chicken").prepMinutes, dish("butter-chicken").cookMinutes, dish("butter-chicken").totalMinutes],
    [390, 60, 450]);
  assert.deepEqual([dish("cheeseburger").prepMinutes, dish("cheeseburger").cookMinutes, dish("cheeseburger").totalMinutes],
    [20, 15, 35]);
  assert.deepEqual([dish("chicken-teriyaki").prepMinutes, dish("chicken-teriyaki").cookMinutes, dish("chicken-teriyaki").totalMinutes],
    [15, 25, 40]);
  assert.deepEqual([dish("coffin-bread").prepMinutes, dish("coffin-bread").cookMinutes, dish("coffin-bread").totalMinutes],
    [25, 45, 70]);

  const safeTemperatures = {
    "butter-chicken": /74°C/,
    cheeseburger: /71°C\s*[（(]160°F[）)]/,
    "chicken-teriyaki": /74°C/,
    "coffin-bread": /74°C/
  };
  for (const id of ids) {
    for (const locale of localeOrder) {
      assert.match(dish(id).instructions.map((step) => step.body[locale]).join(" "), safeTemperatures[id],
        `${id}/${locale}: appropriate cooking temperature is explicit`);
    }
  }
});
