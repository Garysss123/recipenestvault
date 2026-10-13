import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["kitsune-udon", "vada-pav", "black-forest-cake", "montreal-smoked-meat-sandwich"];
const safetyUrls = [
  "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function recipe(id) {
  const found = byId.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function step(dish, title) {
  const found = dish.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${dish.id}: step ${title} exists`);
  return found;
}

function allLocales(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function safetySources(dish, { egg = false } = {}) {
  for (const url of safetyUrls) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official guidance is labelled separately: ${url}`);
  }
  if (egg) assert.ok(dish.sources.some((source) => source.url === "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"),
    `${dish.id}: FDA egg-safety guidance is listed`);
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: at least two culinary sources remain`);
}

test("sixty-ninth batch selects four unchecked, non-excluded slugs and preserves the registry", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -28);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing old-patch exclusions exist");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 272);
  assert.equal(new Set(beforeThisBatch).size, 272);
  assert.equal(covered.length, 300);
  assert.equal(new Set(covered).size, 300);
  assert.deepEqual(covered.slice(-28, -24), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 63);
  assert.equal(recipes.length - excluded.length - covered.length, 35);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "each selection was absent from the exact starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none of the selections is in the standing exclusion list");
});

test("the four revisions keep their natural step counts and exact illustration mappings", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: method changed`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: storage guidance changed`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official sources were added`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: total time adds up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count stays fixed`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: every existing imageScene mapping is unchanged`);
    const art = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(art.length, published.instructions.length, `${id}: one illustration remains mapped to each step`);
    assert.deepEqual(art.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: every ingredient has an amount and translation`);
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: every step is translated`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage guidance exists`);
    }
  }
});

test("kitsune udon separates blanching, seasoning, broth, noodles, and toppings", () => {
  const dish = recipe("kitsune-udon");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 15, 25, 40]);
  assert.match(dish.instructions[0].body.en, /1 L blanching water[\s\S]*240 g aburaage[\s\S]*separate 150 ml/);
  assert.match(dish.instructions[2].body.en, /1 L unsalted dashi[\s\S]*250 ml each[\s\S]*not a raw-meat safety endpoint/);
  assert.match(dish.instructions[3].body.en, /four 200 g frozen udon portions[\s\S]*package/);
  assert.match(dish.instructions[6].body.en, /about 60 g[\s\S]*20 g fish cake[\s\S]*10 g scallions[\s\S]*10 g tenkasu/);
  for (const locale of localeOrder) {
    assert.match(dish.storage[locale], /2 hours|2 小時|2時間|2시간|2 ชั่วโมง/, `${locale}: prompt refrigeration timing`);
    assert.match(dish.storage[locale], /74°C\/165°F/, `${locale}: leftover reheating endpoint`);
  }
  assert.doesNotMatch(dish.instructions.map((entry) => entry.body.en).join(" "), /63°C|71°C/,
    "prepared fish cake and tofu do not receive raw fish, whole-cut, or ground-meat endpoints");
  safetySources(dish);
});

test("vada pav portions eight fritters, controls fryer batches, and applies 74°C only to refrigerated filling or leftovers", () => {
  const dish = recipe("vada-pav");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [8, 40, 60, 100]);
  assert.equal(dish.ingredients.find((row) => row.item.en === "water, for boiling potatoes")?.amount.en, "2 L");
  assert.match(dish.instructions[2].body.en, /eight equal portions[\s\S]*74°C\/165°F/);
  assert.match(dish.instructions[3].body.en, /260–300 ml[\s\S]*10 ml increments/);
  assert.match(dish.instructions[4].body.en, /1\.5 L frying oil[\s\S]*165–175°C[\s\S]*not food safety/);
  assert.match(dish.instructions[5].body.en, /four batches of two[\s\S]*74°C\/165°F[\s\S]*Time and colour alone do not prove/);
  assert.match(dish.instructions[7].body.en, /15 g dry garlic chutney[\s\S]*15 g green cilantro chutney[\s\S]*no extra fried chile/);
  for (const locale of localeOrder) {
    assert.match(dish.storage[locale], /74°C\/165°F/, `${locale}: leftovers are reheated to 74°C`);
    assert.doesNotMatch(dish.storage[locale], /official 3.?4|공식 지침.*3.?4|公的な目安の3|官方指引可冷藏 3/,
      `${locale}: no meat/poultry storage window is applied to this vegetarian snack`);
  }
  assert.doesNotMatch(dish.instructions.map((entry) => entry.body.en).join(" "), /63°C|71°C/,
    "no raw whole-cut or ground-meat endpoint is applied to the potato filling");
  safetySources(dish);
});

test("Black Forest cake allocates the cherry juice, Kirsch, cream, chocolate, and twelve cherries", () => {
  const dish = recipe("black-forest-cake");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [12, 225, 40, 265]);
  const cherry = step(dish, "Cook the cherry filling");
  const kirsch = step(dish, "Brush with Kirsch");
  const buildMiddle = step(dish, "Build the second layer");
  const finish = step(dish, "Add chocolate and cherries");
  assert.match(cherry.body.en, /reserve exactly 400 ml[\s\S]*100 ml juice[\s\S]*remaining 300 ml[\s\S]*all the drained cherries/);
  assert.match(kirsch.body.en, /all 100 ml Kirsch[\s\S]*four exposed cut faces[\s\S]*25 ml on each/);
  assert.match(buildMiddle.body.en, /all four cut faces have already received their 25 ml share[\s\S]*remaining cherry filling/);
  assert.match(finish.body.en, /all 120 g dark chocolate[\s\S]*12 rosettes[\s\S]*one of the 12 reserved sour cherries on each/);
  allLocales(dish.instructions[0].body, {
    en: /71°C\/160°F[\s\S]*spring back[\s\S]*food-safety endpoint/,
    "zh-hant": /71°C\/160°F[\s\S]*回彈[\s\S]*食安終點/,
    ja: /71°C\/160°F[\s\S]*弾み[\s\S]*安全終点/,
    ko: /71°C\/160°F[\s\S]*되돌아오고[\s\S]*안전 종점/,
    th: /71°C\/160°F[\s\S]*เด้งกลับ[\s\S]*จุดสิ้นสุดด้านความปลอดภัย/
  }, "egg safety temperature stays distinct from sponge texture cues");
  for (const locale of localeOrder) {
    assert.match(dish.storage[locale], /2 hours|2 小時|2時間|2시간|2 ชั่วโมง/, `${locale}: prompt refrigeration`);
    assert.match(dish.storage[locale], /4°C/, `${locale}: cream cake stays refrigerated`);
    assert.match(dish.storage[locale], /1 hour|1 小時|1時間|1시간|1 ชั่วโมง/, `${locale}: shorter hot-weather limit`);
    assert.match(dish.storage[locale], /quality|品質|品質|품질|คุณภาพ/, `${locale}: two-day recommendation is quality guidance`);
  }
  safetySources(dish, { egg: true });
});

test("Montreal smoked meat portions the four sandwiches and uses a conditional leftover endpoint", () => {
  const dish = recipe("montreal-smoked-meat-sandwich");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 15, 15, 30]);
  assert.match(dish.instructions[1].body.en, /600 g ready-to-eat smoked meat[\s\S]*two 300 g batches[\s\S]*5–8 minutes[\s\S]*not a universal safety endpoint/);
  assert.match(dish.instructions[3].body.en, /four 15 ml portions/);
  assert.match(dish.instructions[4].body.en, /four equal 150 g portions[\s\S]*one dill pickle spear/);
  assert.doesNotMatch(dish.instructions.map((entry) => entry.body.en).join(" "), /63°C|71°C|74°C/,
    "ready-to-eat smoked meat does not receive raw whole-cut, ground-meat, or poultry cooking limits");
  for (const locale of localeOrder) {
    assert.match(dish.storage[locale], /74°C\/165°F/, `${locale}: stored leftover meat is reheated to 74°C`);
    assert.match(dish.storage[locale], /2 hours|2 小時|2時間|2시간|2 ชั่วโมง/, `${locale}: prompt refrigeration timing`);
  }
  safetySources(dish);
});
