import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["chocolate-mousse", "saltimbocca-alla-romana", "tagliatelle-ragu-bolognese", "pisto-manchego"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-to-know-about-egg-safety";
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: existing recipe remains in the registry`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: step exists: ${title}`);
  return found;
}

function everyLocale(instruction, pattern, message) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], pattern, `${locale}: ${message}`);
}

function localePatterns(instruction, patterns, message) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${message}`);
}

function source(recipe, url) {
  assert.ok(recipe.sources.some((entry) => entry.url === url && entry.title.startsWith("Official food-safety guidance")),
    `${recipe.id}: official safety guidance is labelled separately`);
}

test("thirty-fourth batch adds four existing eligible recipes and preserves current route coverage", async () => {
  const sourceText = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = sourceText.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared route regression list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353, "recipe registry remains unchanged");
  assert.equal(excludedIds.length, 18, "all standing exclusions remain explicit");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 228, "shared five-locale route coverage includes this batch");
  assert.equal(new Set(covered).size, 228, "shared route IDs stay unique");
  for (const id of ids) {
    const recipe = get(id);
    assert.ok(!excludedIds.includes(id), `${id}: not on the standing exclusion list`);
    assert.ok(covered.includes(id), `${id}: added to shared route coverage`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: localized ingredients`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: localized instructions`);
    }
  }
});

test("chocolate mousse includes its three-hour setting time and refrigerated egg handling", () => {
  const recipe = get("chocolate-mousse");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [205, 10, 215]);
  assert.equal(recipe.servings, 6);
  assert.ok(recipe.ingredients.some((row) => row.item.en.includes("pasteurized") && row.amount === "4"));
  const chill = step(recipe, "Portion and chill");
  everyLocale(chill, /4°C/, "mousse is refrigerated at or below 4°C");
  localePatterns(chill, {
    en: /at least 3 hours/i,
    "zh-hant": /至少 3 小時/,
    ja: /少なくとも3時間/,
    ko: /최소 3시간/,
    th: /อย่างน้อย 3 ชั่วโมง/
  }, "three-hour setting time is stated");
  localePatterns(chill, {
    en: /room temperature for more than 2 hours/i,
    "zh-hant": /室溫放置超過 2 小時/,
    ja: /室温で2時間を超えて/,
    ko: /실온에 2시간 넘게/,
    th: /อุณหภูมิห้องนานเกิน 2 ชั่วโมง/
  }, "egg mousse is kept cold and discarded after the room-temperature limit");
  source(recipe, eggSafety);
});

test("saltimbocca measures veal safety, rests it, and divides eight cutlets across four servings", () => {
  const recipe = get("saltimbocca-alla-romana");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 15, 35]);
  assert.deepEqual([recipe.ingredients[0].amount.en, recipe.ingredients[1].amount.en], ["8 pieces / about 600 g", "8 slices / 120 g"]);
  const finish = step(recipe, "Check the centre and rest");
  everyLocale(finish, /63°C.{0,10}145°F/, "veal reaches the official whole-cut endpoint");
  localePatterns(finish, {
    en: /30-second increments/,
    "zh-hant": /30 秒/,
    ja: /30秒ずつ/,
    ko: /30초씩/,
    th: /30 วินาที/
  }, "a below-target batch gets a timed recheck");
  localePatterns(finish, {
    en: /3 minutes/,
    "zh-hant": /靜置 3 分鐘/,
    ja: /3分休ませる/,
    ko: /3분 둡니다/,
    th: /3 นาที/
  }, "veal rests for three minutes");
  const serve = step(recipe, "Mount with butter and serve");
  localePatterns(serve, {
    en: /eight cutlets/,
    "zh-hant": /8 片肉/,
    ja: /8枚/,
    ko: /8장/,
    th: /เนื้อ 8 ชิ้น/
  }, "all eight cutlets are allocated");
  localePatterns(serve, {
    en: /two per serving/,
    "zh-hant": /每份 2 片/,
    ja: /1人2枚/,
    ko: /1인당 2장/,
    th: /จานละ 2 ชิ้น/
  }, "each serving gets two cutlets");
  localePatterns(serve, {
    en: /all 40 g cold butter/,
    "zh-hant": /全部 40 公克冰奶油/,
    ja: /冷たいバター40g/,
    ko: /차가운 버터 40g/,
    th: /เนยเย็นทั้งหมด 40 กรัม/
  }, "the full listed butter amount is emulsified into the sauce");
  localePatterns(serve, {
    en: /do not let it boil again/,
    "zh-hant": /不要再煮沸/,
    ja: /再び沸騰させない/,
    ko: /다시 끓이지 않습니다/,
    th: /อย่าต้มให้เดือดอีก/
  }, "the butter sauce is kept from boiling after emulsifying");
  source(recipe, foodSafety);
});

test("Bolognese ragù verifies ground meat and allocates all Parmigiano", () => {
  const recipe = get("tagliatelle-ragu-bolognese");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 150, 175]);
  const brown = step(recipe, "Brown the meats");
  everyLocale(brown, /71°C.{0,10}160°F/, "ground beef and pork reach the official endpoint");
  localePatterns(brown, {
    en: /1-minute increments/,
    "zh-hant": /1 分鐘/,
    ja: /1分ずつ/,
    ko: /1분씩/,
    th: /1 นาที/
  }, "below-target clumps get a timed recheck");
  const ingredient = recipe.ingredients.find((row) => row.item.en.startsWith("Parmigiano Reggiano"));
  assert.equal(ingredient?.amount, "80 g");
  for (const locale of localeOrder) assert.match(ingredient.item[locale], /60|20/, `${locale}: cheese use is divided`);
  everyLocale(step(recipe, "Cook and sauce the tagliatelle"), /60/, "60 g cheese is tossed through the pasta");
  everyLocale(step(recipe, "Finish with Parmigiano"), /20/, "the remaining 20 g is distributed at serving");
  localePatterns(step(recipe, "Finish with Parmigiano"), {
    en: /six warm bowls/,
    "zh-hant": /6 個溫碗/,
    ja: /器6つ/,
    ko: /그릇 6개/,
    th: /ชามอุ่น 6 ใบ/
  }, "six bowls are served");
  source(recipe, foodSafety);
});

test("pisto keeps soft-yolk eggs pasteurized and assigns the six eggs to four plates", () => {
  const recipe = get("pisto-manchego");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 58, 78]);
  const eggs = recipe.ingredients.find((row) => row.item.en.includes("eggs"));
  assert.equal(eggs?.amount, "6");
  for (const locale of localeOrder) assert.match(eggs.item[locale], /pasteurized|殺菌|低温殺菌|살균|พาสเจอไรซ์/i,
    `${locale}: soft-yolk method calls for pasteurized eggs`);
  const finish = step(recipe, "Cook the eggs and allocate servings");
  everyLocale(finish, /6/, "all six eggs are cooked");
  localePatterns(finish, {
    en: /among four plates/,
    "zh-hant": /分成 4 盤/,
    ja: /4皿に分け/,
    ko: /접시 4개에 나누고/,
    th: /ลง 4 จาน/
  }, "pisto is divided among four plates");
  localePatterns(finish, {
    en: /remaining two eggs alongside to share/,
    "zh-hant": /剩下 2 顆另放供大家分食/,
    ja: /残り2個は取り分け用に添えて/,
    ko: /남은 2개는 함께 나눠 먹도록/,
    th: /ไข่ที่เหลือ 2 ฟองไว้แบ่งกัน/
  }, "the remaining two eggs are served to share");
  source(recipe, eggSafety);
});
