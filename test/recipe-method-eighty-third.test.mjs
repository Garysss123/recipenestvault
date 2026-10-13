import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["doenjang-jjigae", "ratatouille", "pan-con-tomate", "welsh-rarebit"];
const remainingEligible = ["zaalouk", "imam-bayildi", "halloumi-saganaki"];
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";
const published = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function recipe(id) {
  const found = published.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function official(dish, urls) {
  for (const url of urls) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: ${url} is separately attributed as official safety guidance`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: the two culinary references remain distinct`);
}

test("eighty-third batch adds four unreviewed eligible slugs and keeps full coverage and exclusions intact", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug five-locale ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -7);
  const throughThisBatch = covered.slice(0, -3);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "the standing exclusion list exists");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 328);
  assert.equal(new Set(beforeThisBatch).size, 328);
  assert.equal(throughThisBatch.length, 332);
  assert.equal(new Set(throughThisBatch).size, 332);
  assert.deepEqual(throughThisBatch.slice(-4), ids);
  assert.equal(covered.length, 335);
  assert.equal(new Set(covered).size, 335);
  assert.deepEqual(covered.slice(-3), remainingEligible);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id) && !excluded.includes(id)),
    "all four selected slugs were uncovered and eligible");
  assert.ok(remainingEligible.every((id) => throughThisBatch.includes(id) === false && !excluded.includes(id)),
    "the three slugs left after this historical batch are covered only by the following batch");
  assert.equal(recipes.length - excluded.length - throughThisBatch.length, 3);

  for (const id of ids) {
    const dish = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft remains present`);
    assert.notDeepEqual(dish.instructions, draft.instructions, `${id}: published method is refined`);
    assert.notDeepEqual(dish.sources, draft.sources, `${id}: official safety references are added separately`);
    assert.deepEqual(dish.ingredients, draft.ingredients, `${id}: ingredient rows and amounts are preserved`);
    assert.equal(dish.servings, draft.servings, `${id}: serving count is preserved`);
    assert.equal(dish.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(dish.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: reviewed illustration-stage mappings remain aligned`);
    assert.equal(dish.totalMinutes, dish.prepMinutes + dish.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(dish.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: every step is localized`);
      assert.ok(dish.tips.every((tip) => tip[locale]) && dish.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: practical guidance and recovery notes are localized`);
      assert.ok(dish.storage[locale], `${id}/${locale}: storage guidance is localized`);
    }
  }

  assert.deepEqual([recipe("doenjang-jjigae").prepMinutes, recipe("doenjang-jjigae").cookMinutes, recipe("doenjang-jjigae").totalMinutes],
    [20, 35, 55], "doenjang-jjigae estimate covers bringing the stock to a boil and all timed simmer/rest stages");
  assert.deepEqual([recipe("ratatouille").prepMinutes, recipe("ratatouille").cookMinutes, recipe("ratatouille").totalMinutes],
    [25, 60, 85], "ratatouille estimate covers the sequential browning, simmering, reduction, and rest stages");
  assert.deepEqual([recipe("pan-con-tomate").prepMinutes, recipe("pan-con-tomate").cookMinutes, recipe("pan-con-tomate").totalMinutes],
    [8, 8, 16], "pan con tomate timing remains aligned with the short toast method");
  assert.deepEqual([recipe("welsh-rarebit").prepMinutes, recipe("welsh-rarebit").cookMinutes, recipe("welsh-rarebit").totalMinutes],
    [10, 20, 30], "Welsh rarebit timing still covers both toast stages and the sauce");

  official(recipe("doenjang-jjigae"), [handling, temperatures]);
  official(recipe("ratatouille"), [handling, temperatures]);
  official(recipe("pan-con-tomate"), [handling]);
  official(recipe("welsh-rarebit"), [handling, temperatures, rawFlour]);

  const noFreshSafetyThreshold = [
    recipe("doenjang-jjigae"), recipe("ratatouille"), recipe("pan-con-tomate"), recipe("welsh-rarebit")
  ];
  for (const dish of noFreshSafetyThreshold) {
    const method = dish.instructions.map((step) => step.body.en).join(" ");
    assert.doesNotMatch(method, /74°C|safe minimum/i,
      `${dish.id}: fresh texture cues do not borrow a leftover or casserole safety threshold`);
  }
  for (const id of ["doenjang-jjigae", "ratatouille", "welsh-rarebit"]) {
    for (const locale of localeOrder) assert.match(recipe(id).storage[locale], /74°C/,
      `${id}/${locale}: 74°C is reserved for reheating leftovers`);
  }
});

test("draft-audit commands and recipe source groups remain separate counts", async () => {
  const packageData = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageData.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  assert.equal(auditCommands.length, 20, "package.json wires 20 draft-audit commands");
  const registrySource = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = registrySource.match(/export const allRecipeDrafts = \[([\s\S]*?)\];/)?.[1];
  assert.ok(groups, "the recipe source-group registry exists");
  assert.equal([...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length, 21,
    "the registry has 21 recipe source groups, distinct from the package command count");
});
