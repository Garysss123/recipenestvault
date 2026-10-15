import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["tacos-al-pastor", "tiramisu"];
const interveningIds = [
  "mapo-tofu", "masala-dosa", "nanaimo-bars", "new-york-cheesecake",
  "pad-thai", "panna-cotta", "pizza-margherita", "sauerbraten"
];
const expectedReimplemented = [
  "butter-chicken", "cheeseburger", "chicken-teriyaki", "coffin-bread",
  "creme-brulee", "gulab-jamun", "koshari", "mango-sticky-rice",
  ...interveningIds,
  ...ids
].sort();
const porkTemperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const coldStorage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const published = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const localeTwoHours = {
  en: /2 hours/,
  "zh-hant": /2 小時/,
  ja: /2時間/,
  ko: /2시간/,
  th: /2 ชั่วโมง/
};

function findRecipe(id) {
  const found = published.get(id);
  assert.ok(found, id + ": published recipe exists");
  return found;
}

test("eighty-ninth batch finishes the exact 353-slug ledger and rewrites the final two methods", async () => {
  const oldest = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261013.json", import.meta.url), "utf8"));
  const prior = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261014.json", import.meta.url), "utf8"));
  const current = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261015.json", import.meta.url), "utf8"));

  assert.deepEqual(oldest.counts, { registry: 353, reviewed: 335, excluded: 18, unclassified: 0 });
  assert.equal(new Set(oldest.reviewedIds).size, 335, "the former 335 reviewed slugs remain unique");
  assert.equal(new Set(oldest.excludedIds).size, 18, "the former 18 exclusions remain unique");
  assert.deepEqual([...oldest.reviewedIds, ...oldest.excludedIds].sort(), [...new Set([...oldest.reviewedIds, ...oldest.excludedIds])].sort());
  assert.deepEqual([...oldest.reviewedIds, ...oldest.excludedIds].sort(), recipes.map((recipe) => recipe.id).sort(),
    "the historical 335 plus 18 disjoint exclusions still equal the full recipe registry");

  assert.deepEqual(prior.counts, { registry: 353, reviewed: 343, reimplemented: 8, excluded: 10, unclassified: 0 });
  assert.deepEqual(current.counts, { registry: 353, reviewed: 353, reimplemented: 18, excluded: 0, unclassified: 0 });
  const additionsAfterPriorSnapshot = [...interveningIds, ...ids];
  assert.ok(additionsAfterPriorSnapshot.every((id) => prior.excludedIds.includes(id) && !prior.reviewedIds.includes(id)),
    "all ten methods finished since the prior snapshot started excluded");
  assert.deepEqual(current.reviewedIds, [...prior.reviewedIds, ...additionsAfterPriorSnapshot].sort());
  assert.deepEqual(current.reimplementedIds, [...prior.reimplementedIds, ...additionsAfterPriorSnapshot].sort());
  assert.deepEqual(current.reimplementedIds, expectedReimplemented, "all 18 reimplemented slugs are exact and complete");
  assert.deepEqual(current.excludedIds, []);

  const publishedIds = recipes.map((recipe) => recipe.id).sort();
  assert.equal(publishedIds.length, 353);
  assert.equal(new Set(publishedIds).size, 353, "published recipes have no duplicate slugs");
  assert.deepEqual(current.reviewedIds, publishedIds, "every published recipe is covered exactly once");
  assert.equal(new Set(current.reviewedIds).size, 353);
  assert.equal(new Set(current.reimplementedIds).size, 18, "no reimplemented slug is duplicated");
  assert.equal(new Set([...current.reviewedIds, ...current.excludedIds]).size, 353);

  const expectedSteps = { "tacos-al-pastor": 9, tiramisu: 6 };
  const expectedTimes = { "tacos-al-pastor": [275, 45, 320], tiramisu: [400, 10, 410] };
  const expectedOfficialSources = {
    "tacos-al-pastor": [porkTemperatures, handling, coldStorage],
    tiramisu: [eggSafety, porkTemperatures, handling, coldStorage]
  };

  for (const id of ids) {
    const actual = findRecipe(id);
    const source = drafts.get(id);
    assert.ok(source, id + ": original recipe record exists");
    assert.equal(actual.servings, source.servings, id + ": original servings are preserved");
    assert.equal(actual.instructions.length, expectedSteps[id], id + ": original step count is preserved");
    assert.deepEqual(actual.ingredients, source.ingredients, id + ": all ingredient rows and amounts are preserved");
    assert.deepEqual([actual.prepMinutes, actual.cookMinutes, actual.totalMinutes], expectedTimes[id], id + ": full elapsed time is accounted for");
    assert.equal(actual.totalMinutes, actual.prepMinutes + actual.cookMinutes, id + ": total time adds up");
    assert.deepEqual(actual.instructions.map((step) => step.imageScene), source.instructions.map((step) => step.imageScene),
      id + ": original illustration stages are preserved");
    assert.notDeepEqual(actual.instructions.map((step) => step.body), source.instructions.map((step) => step.body),
      id + ": method text is newly written");
    assert.ok(actual.tips.length >= 2 && actual.commonMistakes.length >= 2, id + ": practical tips and failure recovery exist");

    const official = actual.sources.filter((entry) => entry.title.startsWith("Official food-safety guidance"));
    for (const url of expectedOfficialSources[id]) {
      assert.ok(official.some((entry) => entry.url === url), id + ": official safety source is cited: " + url);
    }
    assert.ok(actual.sources.filter((entry) => !entry.title.startsWith("Official food-safety guidance")).length >= 2,
      id + ": culinary sources remain separate from safety sources");

    for (const locale of localeOrder) {
      assert.ok(actual.instructions.every((step) => step.title[locale] && step.body[locale]), id + "/" + locale + ": instructions are complete");
      assert.ok(actual.tips.every((tip) => tip[locale]) && actual.commonMistakes.every((mistake) => mistake[locale]),
        id + "/" + locale + ": tips and recovery notes are translated");
      assert.ok(actual.storage[locale], id + "/" + locale + ": storage notes are translated");
    }
  }

  const tacos = findRecipe("tacos-al-pastor");
  const tiramisuRecipe = findRecipe("tiramisu");
  for (const locale of localeOrder) {
    assert.match(tacos.instructions[2].body[locale], /4°C/, locale + ": pork marinates under refrigeration");
    assert.match(tacos.instructions[4].body[locale], /63°C[\s\S]*145°F/, locale + ": each pork batch reaches its verified endpoint");
    assert.match(tacos.instructions[5].body[locale], /5 分鐘|5分|5분|5 นาที|5 minutes/, locale + ": pork rests at least 3 minutes before chopping");
    assert.match(tacos.instructions[8].body[locale], /18/, locale + ": all 18 tortillas are divided into six portions");
    assert.match(tacos.storage[locale], /74°C[\s\S]*165°F/, locale + ": reheated pork reaches the verified leftover endpoint");
    assert.match(tacos.storage[locale], localeTwoHours[locale], locale + ": cooked pork has a two-hour refrigeration limit");

    assert.match(tiramisuRecipe.instructions[1].body[locale], /71°C[\s\S]*160°F/, locale + ": yolks are cooked to the verified egg endpoint");
    assert.match(tiramisuRecipe.instructions[5].body[locale], /0–4°C|0〜4°C/, locale + ": tiramisu is chilled at refrigerator temperature");
    assert.match(tiramisuRecipe.instructions[5].body[locale], /6 hours|6 小時|6時間|6시간|6 ชั่วโมง/, locale + ": the tiramisu setting time is explicit");
    assert.match(tiramisuRecipe.storage[locale], localeTwoHours[locale], locale + ": egg-and-dairy dessert has a two-hour limit");
    assert.match(tiramisuRecipe.storage[locale], /4°C/, locale + ": egg-and-dairy dessert is stored cold");
  }
  assert.match(tiramisuRecipe.instructions[1].body.en, /Do not use it uncooked/);
  assert.match(tiramisuRecipe.storage.en, /3–4 days/);
});
