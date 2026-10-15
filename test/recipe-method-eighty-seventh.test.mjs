import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { expandedInstructionsA } from "../src/recipe-expanded-a.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["mapo-tofu", "masala-dosa", "nanaimo-bars", "new-york-cheesecake"];
const nextBatchIds = ["pad-thai", "panna-cotta", "pizza-margherita", "sauerbraten"];
const finalBatchIds = ["tacos-al-pastor", "tiramisu"];
const tempSource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handlingSource = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const eggSource = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const dosaSource = "https://www.bccdc.ca/resource-gallery/Documents/Educational%20Materials/EH/FPS/Food/Fermented/Fermented%20Foods%20Guideline%20-%203.4%20Dosa%20and%20Idli.pdf";
const leftoversSource = "https://www.gov.uk/government/publications/student-guide-to-food-safety-and-hygiene/student-guide-to-food-safety-and-hygiene";
const published = new Map(recipes.map((dish) => [dish.id, dish]));
const drafts = new Map(allRecipeDrafts.map((dish) => [dish.id, dish]));
const localizedTwoHours = {
  en: /2 hours/,
  "zh-hant": /2 小時/,
  ja: /2時間/,
  ko: /2시간/,
  th: /2 ชั่วโมง/
};

function dish(id) {
  const found = published.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function assertOfficialSources(recipe, urls) {
  for (const url of urls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: ${url} is credited as official safety guidance`);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${recipe.id}: the culinary references remain distinct from safety sources`);
}

test("eighty-seventh batch reimplements four excluded recipes and preserves source portions and illustrations", async () => {
  const previous = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261014.json", import.meta.url), "utf8"));
  const current = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261015.json", import.meta.url), "utf8"));

  assert.deepEqual(previous.counts, { registry: 353, reviewed: 343, reimplemented: 8, excluded: 10, unclassified: 0 },
    "the 2026-10-14 coverage snapshot stays unchanged");
  assert.deepEqual(current.counts, { registry: 353, reviewed: 353, reimplemented: 18, excluded: 0, unclassified: 0 });
  assert.ok(ids.every((id) => previous.excludedIds.includes(id) && !previous.reviewedIds.includes(id)),
    "all four slugs began in the prior exclusion set");
  const additionsSinceSnapshot = [...ids, ...nextBatchIds, ...finalBatchIds];
  assert.deepEqual(current.reviewedIds, [...previous.reviewedIds, ...additionsSinceSnapshot].sort());
  assert.deepEqual(current.reimplementedIds, [...previous.reimplementedIds, ...additionsSinceSnapshot].sort());
  assert.deepEqual(current.excludedIds, previous.excludedIds.filter((id) => !additionsSinceSnapshot.includes(id)));
  assert.equal(new Set(current.reviewedIds).size, 353);
  assert.equal(new Set(current.reimplementedIds).size, 18);
  assert.equal(new Set(current.excludedIds).size, 0);
  assert.equal(new Set([...current.reviewedIds, ...current.excludedIds]).size, 353);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);

  const expectedSteps = { "mapo-tofu": 8, "masala-dosa": 9, "nanaimo-bars": 7, "new-york-cheesecake": 12 };
  const expectedTimes = {
    "mapo-tofu": [20, 15, 35],
    "masala-dosa": [1130, 65, 1195],
    "nanaimo-bars": [150, 15, 165],
    "new-york-cheesecake": [550, 150, 700]
  };
  const safetySources = {
    "mapo-tofu": [tempSource, handlingSource],
    "masala-dosa": [dosaSource, leftoversSource],
    "nanaimo-bars": [eggSource],
    "new-york-cheesecake": [eggSource, tempSource]
  };

  for (const id of ids) {
    const actual = dish(id);
    const source = drafts.get(id);
    assert.ok(source, `${id}: source recipe exists`);
    assert.equal(actual.servings, source.servings, `${id}: serving count is unchanged`);
    assert.equal(actual.instructions.length, expectedSteps[id], `${id}: source step sequence length is preserved`);
    assert.deepEqual([actual.prepMinutes, actual.cookMinutes, actual.totalMinutes], expectedTimes[id], `${id}: prep, cook, and elapsed time are explicit`);
    assert.equal(actual.totalMinutes, actual.prepMinutes + actual.cookMinutes, `${id}: total time adds up`);
    assert.ok(actual.tips.length >= 2 && actual.commonMistakes.length >= 2, `${id}: practical tips and recovery guidance exist`);
    assertOfficialSources(actual, safetySources[id]);

    const sourceInstructions = id === "mapo-tofu" ? expandedInstructionsA[id] : source.instructions;
    assert.deepEqual(actual.instructions.map((step) => step.imageScene), sourceInstructions.map((step) => step.imageScene),
      `${id}: illustration stages remain in place`);
    assert.notDeepEqual(actual.instructions.map((step) => step.body), sourceInstructions.map((step) => step.body),
      `${id}: the published method is rewritten`);
    for (const locale of localeOrder) {
      assert.ok(actual.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: every ingredient remains localized`);
      assert.ok(actual.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: method is fully localized`);
      assert.ok(actual.tips.every((tip) => tip[locale]) && actual.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: tips and failure recovery are localized`);
      assert.ok(actual.storage[locale], `${id}/${locale}: storage guidance is localized`);
    }
  }

  for (const id of ["nanaimo-bars", "new-york-cheesecake"]) {
    assert.deepEqual(dish(id).ingredients, drafts.get(id).ingredients, `${id}: ingredient rows and amounts stay intact`);
  }
  const mapo = dish("mapo-tofu");
  const mapoSource = drafts.get("mapo-tofu");
  assert.equal(mapo.ingredients.length, mapoSource.ingredients.length);
  assert.equal(mapo.ingredients.find((row) => row.item.en === "cornstarch slurry")?.amount, "8 g + 20 ml");
  for (let index = 0; index < mapo.ingredients.length; index += 1) {
    if (mapo.ingredients[index].item.en !== "cornstarch slurry") {
      assert.deepEqual(mapo.ingredients[index], mapoSource.ingredients[index], `mapo-tofu: ingredient ${index + 1} remains unchanged`);
    }
  }
  const dosa = dish("masala-dosa");
  const dosaSourceRecipe = drafts.get("masala-dosa");
  assert.deepEqual(dosa.ingredients.slice(0, dosaSourceRecipe.ingredients.length), dosaSourceRecipe.ingredients,
    "masala-dosa: all original ingredient quantities remain intact");
  assert.deepEqual(dosa.ingredients.at(-1), {
    amount: "60 ml",
    item: { en: "water for the potato filling", "zh-hant": "馬鈴薯餡用水", ja: "じゃがいもの具用の水", ko: "감자 속재료용 물", th: "น้ำสำหรับไส้มันฝรั่ง" }
  }, "masala-dosa: the method's pre-existing potato-filling water is listed explicitly");

  const mapoSafety = mapo.instructions[2].body;
  const dosaSoaking = dosa.instructions[0].body;
  const dosaFerment = dosa.instructions[3].body;
  const dosaCook = dosa.instructions[8].body;
  const nanaimo = dish("nanaimo-bars");
  const cheesecake = dish("new-york-cheesecake");
  for (const locale of localeOrder) {
    assert.match(mapoSafety[locale], /71°C[\s\S]*160°F/, `${locale}: ground pork reaches its verified 71°C endpoint`);
    assert.match(dosaSoaking[locale], /4°C/, `${locale}: long grain soaking is refrigerated`);
    assert.match(dosaFerment[locale], /30°C[\s\S]*12[\s\S]*14/, `${locale}: dosa fermentation has a cited time and temperature`);
    assert.match(dosaCook[locale], /74°C[\s\S]*15/, `${locale}: dosa cooks through to the cited temperature and hold time`);
    assert.match(nanaimo.instructions[1].body[locale], /71°C[\s\S]*160°F/, `${locale}: Nanaimo egg base reaches its verified endpoint`);
    assert.match(cheesecake.instructions[9].body[locale], /71°C[\s\S]*160°F/, `${locale}: cheesecake centre reaches its verified endpoint`);
    assert.match(nanaimo.storage[locale], /4°C/);
    assert.match(cheesecake.storage[locale], /4°C/);
    assert.match(nanaimo.storage[locale], localizedTwoHours[locale], `${locale}: Nanaimo bars have a two-hour room-temperature limit`);
    assert.match(cheesecake.storage[locale], localizedTwoHours[locale], `${locale}: cheesecake has a two-hour room-temperature limit`);
  }
  assert.match(cheesecake.instructions[9].body.en, /70–80 minutes[\s\S]*5-minute intervals/);
  assert.match(cheesecake.instructions[11].body.en, /at least 8 hours/);
  assert.match(`${dosa.instructions[7].body.en} ${dosa.instructions[8].body.en}`, /160–170 ml[\s\S]*110 g[\s\S]*8 dosas/);
});
