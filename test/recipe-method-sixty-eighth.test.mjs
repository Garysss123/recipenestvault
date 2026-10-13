import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["zaru-soba", "croque-monsieur", "crema-catalana", "tteokbokki"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialSources = [
  "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
];

function recipe(id) {
  const result = byId.get(id);
  assert.ok(result, `${id}: recipe exists`);
  return result;
}

function everyLocale(localized, patternByLocale, label) {
  for (const locale of localeOrder) {
    assert.match(localized[locale], patternByLocale[locale], `${locale}: ${label}`);
  }
}

function hasSafetyReferences(dish, { egg = false } = {}) {
  for (const url of officialSources) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official source listed: ${url}`);
  }
  if (egg) assert.ok(dish.sources.some((source) => source.url.includes("fda.gov") && source.title.startsWith("Official food-safety guidance")),
    `${dish.id}: official FDA egg guidance listed`);
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: two culinary references remain`);
}

test("sixty-eighth batch selects four unchecked slugs and preserves the registry and exclusions", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const starting = covered.slice(0, -4);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "standing old-patch exclusion list exists");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(starting.length, 268);
  assert.equal(new Set(starting).size, 268);
  assert.equal(covered.length, 272);
  assert.equal(new Set(covered).size, 272);
  assert.deepEqual(covered.slice(-4), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - starting.length, 67);
  assert.equal(recipes.length - excluded.length - covered.length, 63);
  assert.ok(ids.every((id) => !starting.includes(id)), "each selection was absent from the exact starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none of the four selections is excluded");
});

test("all four revisions keep step counts and illustration mappings while completing five locales", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = draftById.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: method is materially revised`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: storage guidance is revised`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official safety references are added`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: original step count is retained`);
    assert.deepEqual(published.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: original illustration scene mappings are unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: each natural step keeps its illustration`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient names and quantities exist`);
      assert.ok(published.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: localized method exists`);
      assert.ok(published.storage[locale], `${id}/${locale}: localized storage exists`);
    }
    hasSafetyReferences(published, { egg: id === "crema-catalana" });
  }
});

test("zaru soba portions ingredients, chills promptly, and keeps its reheat option separate", () => {
  const dish = recipe("zaru-soba");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 25, 20, 45]);
  everyLocale(dish.instructions[2].body, {
    en: /320 g dried soba[\s\S]*4–5 minutes[\s\S]*80 g dry soba/,
    "zh-hant": /320 公克乾蕎麥麵[\s\S]*4–5 分鐘[\s\S]*80 公克乾麵/,
    ja: /乾そば320g[\s\S]*4〜5分[\s\S]*乾麺80g/,
    ko: /건 메밀면 320g[\s\S]*4–5분[\s\S]*마른 면 80g/,
    th: /โซบะแห้ง 320 กรัม[\s\S]*4–5 นาที[\s\S]*เส้นแห้ง 80 กรัม/
  }, "measured noodle amount and estimated cook time are consistent");
  everyLocale(dish.instructions[4].body, {
    en: /40 g scallions[\s\S]*10 g scallions[\s\S]*half a sheet/,
    "zh-hant": /40 公克青蔥[\s\S]*10 公克青蔥[\s\S]*半張海苔/,
    ja: /ねぎ40g[\s\S]*約10g[\s\S]*のり半枚/,
    ko: /대파 40g[\s\S]*약 10g[\s\S]*김 반 장/,
    th: /ต้นหอม 40 กรัม[\s\S]*10 กรัม[\s\S]*โนริครึ่งแผ่น/
  }, "all listed condiments are divided across four portions");
  for (const locale of localeOrder) {
    assert.match(dish.instructions[0].body[locale], /2 hours|2 小時|2時間|2시간|2 ชั่วโมง/, `${locale}: sauce is chilled promptly`);
    assert.match(dish.storage[locale], /74°C\/165°F/, `${locale}: any hot leftover option uses the reheating endpoint`);
  }
  assert.doesNotMatch(dish.instructions.map((step) => step.body.en).join(" "), /63°C|71°C/,
    "no whole-cut or ground-meat endpoint is applied to a cold noodle and dried-bonito sauce recipe");
});

test("croque monsieur allocates every sandwich and uses the precooked-ham reheating endpoint", () => {
  const dish = recipe("croque-monsieur");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [2, 15, 25, 40]);
  everyLocale(dish.instructions[2].body, {
    en: /all 10 g mustard[\s\S]*80 g ham[\s\S]*22\.5 g[\s\S]*reserve the other 45 g cheese/,
    "zh-hant": /全部 10 公克芥末醬[\s\S]*80 公克火腿[\s\S]*22\.5 公克[\s\S]*剩下 45 公克起司/,
    ja: /マスタード10gすべて[\s\S]*ハム80g[\s\S]*22\.5g[\s\S]*残りのチーズ45g/,
    ko: /머스터드 10g 전량[\s\S]*햄 80g[\s\S]*22\.5g[\s\S]*남은 치즈 45g/,
    th: /มัสตาร์ด 10 กรัมทั้งหมด[\s\S]*แฮม 80 กรัม[\s\S]*22\.5 กรัม[\s\S]*ชีสที่เหลือ 45 กรัม/
  }, "two sandwiches use the measured ham, cheese, and mustard amounts");
  for (const locale of localeOrder) {
    assert.match(dish.instructions[5].body[locale], /74°C/,
      `${locale}: reheated precooked ham reaches the recipe's conservative endpoint`);
    assert.match(dish.instructions[5].body[locale], /60/,
      `${locale}: the USDA-inspected packaged-ham exception is disclosed`);
  }
  assert.doesNotMatch(dish.instructions.map((step) => step.body.en).join(" "), /63°C|71°C/,
    "neither whole-cut nor ground-meat temperatures are misapplied to precooked ham");
  assert.ok(dish.sources.some((source) => source.url === officialSources[0] && source.title.includes("Safe Minimum Internal Temperatures")),
    "official temperature chart is credited");
});

test("crema catalana separates egg safety from the thicker-custard quality range", () => {
  const dish = recipe("crema-catalana");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [6, 310, 20, 330]);
  const custard = dish.instructions[2].body;
  for (const locale of localeOrder) {
    assert.match(custard[locale], /71°C/, `${locale}: official egg-dish minimum`);
    assert.match(custard[locale], /82.{0,4}84°C/, `${locale}: separate custard texture range`);
    assert.match(dish.instructions[3].body[locale], /2 hours|2 小時|2時間|2시간|2 ชั่วโมง/, `${locale}: rapid cooling limit`);
    assert.match(dish.storage[locale], /74°C\/165°F/, `${locale}: reheated egg leftovers use the endpoint`);
  }
  assert.ok(dish.sources.some((source) => source.url === officialSources[0]), "temperature chart is credited");
  assert.ok(dish.sources.some((source) => source.url === "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"),
    "FDA egg-handling guidance is credited");
});

test("tteokbokki lists its optional sauce water and reheats only to the leftover endpoint", () => {
  const dish = recipe("tteokbokki");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 15, 20, 35]);
  const adjustment = dish.ingredients.find((row) => row.item.en.startsWith("hot water, for loosening"));
  assert.deepEqual(adjustment?.amount, {
    en: "up to 120 ml", "zh-hant": "最多 120 毫升", ja: "最大120ml", ko: "최대 120ml", th: "ไม่เกิน 120 มล."
  });
  everyLocale(dish.instructions[4].body, {
    en: /30 ml at a time[\s\S]*up to 120 ml total[\s\S]*tender/,
    "zh-hant": /每次加入已列出的熱水 30 毫升[\s\S]*最多 120 毫升[\s\S]*熟軟但不糊/,
    ja: /30mlずつ[\s\S]*合計最大120ml[\s\S]*柔らかく/,
    ko: /30ml씩[\s\S]*총 최대 120ml[\s\S]*부드럽되 흐물거리지/,
    th: /ครั้งละ 30 มล\.[\s\S]*ไม่เกิน 120 มล\.[\s\S]*ต็อกนุ่ม/
  }, "only measured optional water is used to adjust the sauce");
  for (const locale of localeOrder) assert.match(dish.storage[locale], /74°C\/165°F/,
    `${locale}: cooked leftovers are reheated throughout to 74°C`);
  assert.doesNotMatch(dish.instructions.map((step) => step.body.en).join(" "), /63°C|71°C/,
    "the initial processed fish-cake steps do not borrow whole-cut or ground-meat endpoints");
});
