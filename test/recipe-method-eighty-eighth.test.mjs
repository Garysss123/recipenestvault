import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["pad-thai", "panna-cotta", "pizza-margherita", "sauerbraten"];
const previousBatch = ["mapo-tofu", "masala-dosa", "nanaimo-bars", "new-york-cheesecake"];
const finalBatch = ["tacos-al-pastor", "tiramisu"];
const temperatureChart = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handlingGuide = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const coldStorageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const seafoodGuide = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const published = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const expectedCounts = { registry: 353, reviewed: 353, reimplemented: 18, excluded: 0, unclassified: 0 };
const expectedSteps = { "pad-thai": 9, "panna-cotta": 5, "pizza-margherita": 5, sauerbraten: 9 };
const expectedTimes = {
  "pad-thai": [45, 15, 60],
  "panna-cotta": [335, 10, 345],
  "pizza-margherita": [175, 10, 185],
  sauerbraten: [4365, 220, 4585]
};
const expectedSafetySources = {
  "pad-thai": [temperatureChart, handlingGuide, coldStorageChart, seafoodGuide],
  "panna-cotta": [handlingGuide, coldStorageChart],
  "pizza-margherita": [handlingGuide, coldStorageChart, temperatureChart],
  sauerbraten: [handlingGuide, temperatureChart, coldStorageChart]
};
const localizedTwoHours = {
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

test("eighty-eighth batch adds four new methods while preserving the prior snapshot, recipe facts, and illustration stages", async () => {
  const historical = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261014.json", import.meta.url), "utf8"));
  const current = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261015.json", import.meta.url), "utf8"));

  assert.deepEqual(historical.counts, { registry: 353, reviewed: 343, reimplemented: 8, excluded: 10, unclassified: 0 });
  assert.deepEqual(current.counts, expectedCounts);
  const newIds = [...previousBatch, ...ids, ...finalBatch];
  assert.ok(newIds.every((id) => historical.excludedIds.includes(id) && !historical.reviewedIds.includes(id)),
    "all ten rewritten slugs were excluded in the immutable 2026-10-14 snapshot");
  assert.deepEqual(current.reviewedIds, [...historical.reviewedIds, ...newIds].sort());
  assert.deepEqual(current.reimplementedIds, [...historical.reimplementedIds, ...newIds].sort());
  assert.deepEqual(current.excludedIds, historical.excludedIds.filter((id) => !newIds.includes(id)));
  assert.equal(new Set(current.reviewedIds).size, 353);
  assert.equal(new Set(current.reimplementedIds).size, 18);
  assert.equal(new Set(current.excludedIds).size, 0);
  assert.deepEqual(current.excludedIds, []);
  assert.equal(new Set([...current.reviewedIds, ...current.excludedIds]).size, 353);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);

  for (const id of ids) {
    const actual = findRecipe(id);
    const source = drafts.get(id);
    assert.ok(source, id + ": original recipe record exists");
    assert.equal(actual.servings, source.servings, id + ": source serving count is preserved");
    assert.equal(actual.instructions.length, expectedSteps[id], id + ": original step count is preserved");
    assert.deepEqual(actual.ingredients, source.ingredients, id + ": every original ingredient and amount is preserved");
    assert.deepEqual([actual.prepMinutes, actual.cookMinutes, actual.totalMinutes], expectedTimes[id], id + ": elapsed time is explicit");
    assert.equal(actual.totalMinutes, actual.prepMinutes + actual.cookMinutes, id + ": total time adds up");
    assert.ok(actual.tips.length >= 2 && actual.commonMistakes.length >= 2, id + ": useful tips and recovery guidance exist");

    const officialSources = actual.sources.filter((sourceEntry) => sourceEntry.title.startsWith("Official food-safety guidance"));
    for (const url of expectedSafetySources[id]) {
      assert.ok(officialSources.some((sourceEntry) => sourceEntry.url === url), id + ": official safety source " + url + " is cited");
    }
    assert.ok(actual.sources.filter((sourceEntry) => !sourceEntry.title.startsWith("Official food-safety guidance")).length >= 2,
      id + ": culinary references remain distinct from safety references");

    assert.deepEqual(actual.instructions.map((step) => step.imageScene), source.instructions.map((step) => step.imageScene),
      id + ": the existing illustration stages are preserved");
    assert.notDeepEqual(actual.instructions.map((step) => step.body), source.instructions.map((step) => step.body),
      id + ": the published method is rewritten");
    for (const locale of localeOrder) {
      assert.ok(actual.instructions.every((step) => step.title[locale] && step.body[locale]), id + "/" + locale + ": steps are fully localized");
      assert.ok(actual.tips.every((tip) => tip[locale]) && actual.commonMistakes.every((mistake) => mistake[locale]),
        id + "/" + locale + ": tips and failure recovery are localized");
      assert.ok(actual.storage[locale], id + "/" + locale + ": storage advice is localized");
    }
  }

  const padThai = findRecipe("pad-thai");
  for (const locale of localeOrder) {
    assert.match(padThai.instructions[3].body[locale], /63°C[\s\S]*145°F/, locale + ": shrimp reaches its cited safe temperature");
    assert.match(padThai.instructions[4].body[locale], /71°C[\s\S]*160°F/, locale + ": egg curds reach the egg-dish endpoint");
    assert.match(padThai.instructions[7].body[locale], /100 g|100 公克|100グラム|100g|100 กรัม/,
      locale + ": all sprouts are cooked rather than held as a raw garnish");
    assert.match(padThai.storage[locale], /74°C[\s\S]*165°F/, locale + ": leftovers reach the cited reheating temperature");
    assert.match(padThai.storage[locale], localizedTwoHours[locale], locale + ": cooked food has a prompt refrigeration limit");
  }

  const pannaCotta = findRecipe("panna-cotta");
  const pizza = findRecipe("pizza-margherita");
  const sauerbraten = findRecipe("sauerbraten");
  for (const locale of localeOrder) {
    assert.match(pannaCotta.instructions[3].body[locale], /0–4°C|0〜4°C/, locale + ": panna cotta is chilled at refrigerator temperature");
    assert.match(pannaCotta.storage[locale], localizedTwoHours[locale], locale + ": chilled dairy dessert has a room-temperature limit");
    assert.match(pizza.instructions[1].body[locale], /20–24°C|20〜24°C/, locale + ": pizza fermentation has measured conditions and a visual cue");
    assert.match(pizza.instructions[1].body[locale], /90/, locale + ": pizza fermentation duration is stated");
    assert.match(pizza.instructions[4].body[locale], /4–6|4〜6/, locale + ": pizza bake has a time and visible doneness cues");
    assert.match(sauerbraten.instructions[1].body[locale], /4°C[\s\S]*3/, locale + ": the beef marinade stays refrigerated for the measured period");
    assert.match(sauerbraten.instructions[5].body[locale], /63°C[\s\S]*145°F[\s\S]*3/, locale + ": roast safety endpoint is distinct from tenderness");
    assert.match(sauerbraten.storage[locale], /74°C[\s\S]*165°F/, locale + ": reheated braise reaches the cited leftover temperature");
  }
  assert.match(sauerbraten.instructions[5].body.en, /full boil/);
  assert.match(pizza.instructions[2].body.en + " " + pizza.instructions[3].body.en, /250–290°C[\s\S]*400 g[\s\S]*250 g/);
});
