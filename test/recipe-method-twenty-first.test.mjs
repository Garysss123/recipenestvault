import assert from "node:assert/strict";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["kung-pao-chicken", "twice-cooked-pork", "dan-dan-noodles", "tomato-egg-stir-fry"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} exists in the registry`);
  return recipe;
}

function step(recipe, title) {
  const result = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(result, `${recipe.id}: ${title} instruction exists`);
  return result;
}

function hasSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url), `${recipe.id} cites ${url}`);
}

function matchesInEveryLocale(instruction, patterns, label) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${label}`);
}

test("twenty-first method audit covers four existing recipes and preserves exclusions", () => {
  assert.equal(recipes.length, 353, "no recipes were added to the registry");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4, "the four audited IDs are distinct");
  assert.equal(excludedIds.length, 18, "the inherited exclusion list stays at 18 recipes");
  assert.equal(new Set(excludedIds).size, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "no excluded recipe enters this batch");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), `${id}/${locale}: method is localized`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: time arithmetic`);
  }
});

test("Kung Pao chicken accounts for batches, servings, and the poultry endpoint", () => {
  const recipe = get("kung-pao-chicken");
  assert.equal(recipe.servings, 3);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 12, 32]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("boneless, skinless chicken thigh"))?.amount, "500 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("neutral cooking oil"))?.amount, "25 ml");
  hasSource(recipe, foodSafety);

  matchesInEveryLocale(step(recipe, "Set up the two chicken batches"), {
    en: /two equal batches of about 250 g raw chicken each/,
    "zh-hant": /兩等份，每份約 250 公克生雞肉/,
    ja: /約250gずつの2等分/,
    ko: /약 250g씩 두 묶음/,
    th: /สองชุดเท่า ๆ กัน ชุดละประมาณ 250 กรัมก่อนปรุง/
  }, "two equal raw-chicken batches are specified");
  matchesInEveryLocale(step(recipe, "Sear in two batches"), {
    en: /largest pieces with a food thermometer[\s\S]*74°C \(165°F\)/,
    "zh-hant": /食物溫度計[\s\S]*74°C（165°F）/,
    ja: /食品用温度計[\s\S]*74°C（165°F）/,
    ko: /식품용 온도계[\s\S]*74°C \(165°F\)/,
    th: /เทอร์โมมิเตอร์[\s\S]*74°C \(165°F\)/
  }, "each chicken batch is measured at its thickest pieces");
  matchesInEveryLocale(step(recipe, "Add the crisp finish"), {
    en: /three servings[\s\S]*167 g raw chicken[\s\S]*13 g scallions[\s\S]*17 g peanuts/,
    "zh-hant": /三份[\s\S]*167 公克雞肉[\s\S]*13 公克青蔥[\s\S]*17 公克花生/,
    ja: /3人分[\s\S]*167g[\s\S]*13g[\s\S]*17g/,
    ko: /세 사람[\s\S]*167g[\s\S]*13g[\s\S]*17g/,
    th: /3 ที่[\s\S]*167 กรัม[\s\S]*13 กรัม[\s\S]*17 กรัม/
  }, "three finished portions state their raw-weight equivalents");
});

test("twice-cooked pork uses the whole-cut endpoint and an ordered rest", () => {
  const recipe = get("twice-cooked-pork");
  assert.equal(recipe.servings, 3);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 50, 70]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "pork belly, one piece")?.amount, "500 g");
  hasSource(recipe, foodSafety);

  matchesInEveryLocale(step(recipe, "Simmer until tender"), {
    en: /5-minute increments[\s\S]*63°C \(145°F\)[\s\S]*chopstick enters with little resistance/,
    "zh-hant": /63°C（145°F）[\s\S]*筷子仍難以插入[\s\S]*每次再煮 5 分鐘/,
    ja: /63°C（145°F）[\s\S]*箸がほぼ抵抗なく入る[\s\S]*5分ずつ追加で煮る/,
    ko: /63°C \(145°F\)[\s\S]*젓가락이 큰 저항 없이[\s\S]*5분씩 더 끓인다/,
    th: /ครั้งละ 5 นาที[\s\S]*63°C \(145°F\)[\s\S]*ตะเกียบแทงเข้าได้/
  }, "whole pork belly is checked for both safety and tenderness");
  matchesInEveryLocale(step(recipe, "Prepare the vegetables"), {
    en: /off the heat for 10 minutes[\s\S]*3-minute rest for whole-cut pork/,
    "zh-hant": /靜置 10 分鐘[\s\S]*3 分鐘靜置/,
    ja: /10分休ませる[\s\S]*3分の休ませ時間/,
    ko: /10분간 둔다[\s\S]*3분 휴지 시간보다 길다/,
    th: /พัก 10 นาที[\s\S]*พัก 3 นาที/
  }, "the 10-minute rest covers the official whole-cut rest period");
  matchesInEveryLocale(step(recipe, "Serve while the edges are curled"), {
    en: /three equal portions[\s\S]*167 g raw pork[\s\S]*20 g of each pepper[\s\S]*27 g garlic chives/,
    "zh-hant": /三份[\s\S]*167 公克生豬肉[\s\S]*青甜椒與紅甜椒各 20 公克[\s\S]*韭菜或韭蔥約 27 公克/,
    ja: /3人分[\s\S]*167g[\s\S]*20g[\s\S]*27g/,
    ko: /세 사람[\s\S]*167g[\s\S]*각각 20g[\s\S]*27g/,
    th: /3 ส่วนเท่า ๆ กัน[\s\S]*167 กรัม[\s\S]*อย่างละ 20 กรัม[\s\S]*ประมาณ 27 กรัม/
  }, "three servings include measured raw-weight shares");
  for (const instruction of recipe.instructions) {
    for (const locale of localeOrder) assert.doesNotMatch(instruction.body[locale], /71°C|160°F/, `${locale}: no ground-meat endpoint is assigned to whole pork belly`);
  }
});

test("Dan dan noodles gives the ground-pork endpoint and two bowl allocations", () => {
  const recipe = get("dan-dan-noodles");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [15, 15, 30]);
  hasSource(recipe, foodSafety);

  matchesInEveryLocale(step(recipe, "Brown the pork"), {
    en: /largest clump with a food thermometer[\s\S]*71°C \(160°F\)/,
    "zh-hant": /食物溫度計[\s\S]*71°C（160°F）/,
    ja: /食品用温度計[\s\S]*71°C（160°F）/,
    ko: /식품용 온도계[\s\S]*71°C \(160°F\)/,
    th: /เทอร์โมมิเตอร์[\s\S]*71°C \(160°F\)/
  }, "ground pork is checked in the thickest clump");
  matchesInEveryLocale(step(recipe, "Top and serve"), {
    en: /120 g fresh noodles[\s\S]*75 g raw-pork equivalent[\s\S]*15 g scallions[\s\S]*7\.5 g peanuts/,
    "zh-hant": /120 公克新鮮麵條[\s\S]*75 公克生豬肉[\s\S]*15 公克青蔥[\s\S]*7\.5 公克花生/,
    ja: /生麺120g[\s\S]*約75g[\s\S]*ねぎ15g[\s\S]*ピーナッツ7\.5g/,
    ko: /생면 120g[\s\S]*약 75g[\s\S]*대파 15g[\s\S]*땅콩 7\.5g/,
    th: /ต้นหอม 15 กรัม[\s\S]*ถั่วลิสงบด 7\.5 กรัม[\s\S]*เส้นสด 120 กรัม[\s\S]*75 กรัม/
  }, "both bowls receive explicit noodle, pork, and topping portions");
});

test("tomato and egg stir-fry finishes at the egg-dish endpoint and splits two servings", () => {
  const recipe = get("tomato-egg-stir-fry");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [10, 10, 20]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, eggSafety);

  const finish = step(recipe, "Warm the eggs through");
  matchesInEveryLocale(finish, {
    en: /1–2 minutes[\s\S]*no liquid egg remains[\s\S]*71°C \(160°F\)/,
    "zh-hant": /1–2 分鐘[\s\S]*不再有液態蛋[\s\S]*71°C（160°F）/,
    ja: /1〜2分[\s\S]*液状の卵がなくなり[\s\S]*71°C（160°F）/,
    ko: /1–2분[\s\S]*액체 달걀이 남지 않고[\s\S]*71°C \(160°F\)/,
    th: /1–2 นาที[\s\S]*ไม่เหลือไข่เหลว[\s\S]*71°C \(160°F\)/
  }, "egg dish uses 71°C / 160°F and no liquid egg remains");
  for (const locale of localeOrder) assert.doesNotMatch(finish.body[locale], /74°C|165°F/, `${locale}: no poultry endpoint is applied to eggs`);
  matchesInEveryLocale(step(recipe, "Set the egg curds"), {
    en: /not finished cooking yet[\s\S]*final cook/,
    "zh-hant": /尚未完成加熱[\s\S]*回鍋煮熟/,
    ja: /加熱が終わっていない[\s\S]*再加熱/,
    ko: /조리가 끝난 것이 아니므로[\s\S]*다시 익힐/,
    th: /ยังไม่สุกพร้อมเสิร์ฟ[\s\S]*ขั้นสุดท้าย/
  }, "the briefly set first egg curds are not served before the final cook");
  matchesInEveryLocale(step(recipe, "Serve immediately"), {
    en: /two plates[\s\S]*250 g raw tomatoes[\s\S]*two large eggs/,
    "zh-hant": /兩盤[\s\S]*250 公克番茄[\s\S]*2 顆大雞蛋/,
    ja: /2皿[\s\S]*250g[\s\S]*卵2個/,
    ko: /두 접시[\s\S]*250g[\s\S]*달걀 2개/,
    th: /สองจาน[\s\S]*250 กรัม[\s\S]*2 ฟอง/
  }, "the two serving split is stated");
});
