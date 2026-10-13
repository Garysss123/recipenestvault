import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["rinderrouladen", "crni-rizot", "khao-pad", "memphis-style-ribs"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";
const officialPrefix = "Official food-safety guidance";
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

function everyLocale(instruction, patterns, label) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${label}`);
}

function officialSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith(officialPrefix)),
    `${recipe.id}: official safety source remains separately labelled`);
}

test("fortieth batch adds four existing eligible recipes without changing the registry or exclusions", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale method regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353, "the existing recipe registry is unchanged");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353, "all recipe IDs remain unique");
  assert.equal(excludedIds.length, 18, "the standing exclusion list remains 18 recipes");
  assert.equal(new Set(excludedIds).size, 18, "the standing exclusions remain unique");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 296, "shared detail routes cover 296 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 296, "the reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 292, "the 292 other reviewed IDs remain");
  assert.ok(ids.every((id) => covered.includes(id)), "all four additions enter shared route coverage");
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "none of the additions is excluded");
  assert.equal(recipes.length - excludedIds.length - covered.length, 39, "39 eligible existing recipes remain");

  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: every ingredient is localized`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: every method step is localized`);
    }
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith(officialPrefix)).length >= 2,
      `${id}: dish references remain alongside separate official safety guidance`);
  }
});

test("Rinderrouladen measures the beef layer, uses the whole-cut endpoint, and rests before untying", () => {
  const recipe = get("rinderrouladen");
  assert.equal(recipe.servings, 4);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "thin beef top-round slices")?.amount, "8 x 150 g");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [40, 140, 180]);
  everyLocale(step(recipe, "Braise until tender"), {
    en: /largest roll[\s\S]*63°C \(145°F\)[\s\S]*5 minutes more[\s\S]*Rest the rolls for 3 minutes/,
    "zh-hant": /最大肉捲[\s\S]*63°C（145°F）[\s\S]*再小火燉 5 分鐘並重測[\s\S]*靜置 3 分鐘/,
    ja: /最大のロール[\s\S]*63°C（145°F）[\s\S]*5分ずつ煮て再測定[\s\S]*3分休ませ/,
    ko: /가장 큰 롤[\s\S]*63°C\(145°F\)[\s\S]*5분 더 익혀 다시 재고[\s\S]*3분간 둡니다/,
    th: /ม้วนใหญ่สุด[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 5 นาทีแล้ววัดซ้ำ[\s\S]*พัก 3 นาที/
  }, "the thickest beef layer is measured and rested in all locales");
  officialSource(recipe, foodSafety);
  assert.equal(8 / recipe.servings, 2, "the eight roulades provide two rolls per serving");
});

test("Crni rižot checks the thickest cuttlefish piece against the seafood endpoint", () => {
  const recipe = get("crni-rizot");
  assert.equal(recipe.servings, 4);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("cleaned cuttlefish"))?.amount, "700 g");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 45, 70]);
  everyLocale(step(recipe, "Return cuttlefish and check texture"), {
    en: /thickest piece[\s\S]*63°C \(145°F\)[\s\S]*1-minute increments and recheck/,
    "zh-hant": /最大塊墨魚[\s\S]*63°C（145°F）[\s\S]*每次再煮 1 分鐘並重測/,
    ja: /最も厚い切り身[\s\S]*63°C（145°F）[\s\S]*1分ずつ煮て再測定/,
    ko: /가장 두꺼운 조각[\s\S]*63°C\(145°F\)[\s\S]*1분씩 더 끓여 다시 재고/,
    th: /ชิ้นที่หนาที่สุด[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 1 นาทีแล้ววัดซ้ำ/
  }, "the seafood endpoint and recheck interval are localized");
  officialSource(recipe, seafoodSafety);
  assert.equal(700 / recipe.servings, 175, "the existing cuttlefish quantity is 175 g per serving");
});

test("Khao pad verifies eggs and chilled crab, and cites official rice cooling guidance", () => {
  const recipe = get("khao-pad");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 20, 45]);
  const rice = recipe.ingredients.find((row) => row.item.en.startsWith("cold cooked jasmine rice"));
  assert.equal(rice?.amount, "700 g");
  const crab = recipe.ingredients.find((row) => row.item.en.startsWith("cooked lump crab meat"));
  assert.equal(crab?.amount, "250 g");
  everyLocale(step(recipe, "Season lightly"), {
    en: /largest curd[\s\S]*71°C \(160°F\)[\s\S]*15-second increments/,
    "zh-hant": /最大蛋塊[\s\S]*71°C（160°F）[\s\S]*每次再拌 15 秒/,
    ja: /最大の卵の塊[\s\S]*71°C（160°F）[\s\S]*15秒ずつ混ぜ/,
    ko: /가장 큰 달걀 덩어리[\s\S]*71°C\(160°F\)[\s\S]*15초씩 더 섞어/,
    th: /ก้อนไข่ใหญ่สุด[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 15 วินาที/
  }, "the final egg curds reach the egg-dish endpoint");
  everyLocale(step(recipe, "Sear aromatics and crab"), {
    en: /largest lump[\s\S]*74°C \(165°F\)[\s\S]*15-second increments/,
    "zh-hant": /最大蟹塊[\s\S]*74°C（165°F）[\s\S]*每次再炒 15 秒/,
    ja: /最大の蟹肉[\s\S]*74°C（165°F）[\s\S]*15秒ずつ加熱/,
    ko: /가장 큰 덩어리[\s\S]*74°C\(165°F\)[\s\S]*15초씩 더 볶아/,
    th: /ก้อนใหญ่สุด[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 15 วินาที/
  }, "the chilled cooked crab is reheated to the leftovers endpoint");
  everyLocale(step(recipe, "Finish with whole crab pieces"), {
    en: /largest reserved crab lump[\s\S]*74°C \(165°F\)[\s\S]*15-second increments/,
    "zh-hant": /最大蟹塊[\s\S]*74°C（165°F）[\s\S]*每次再翻炒 15 秒/,
    ja: /蟹の最も大きな塊[\s\S]*74°C（165°F）[\s\S]*15秒ずつ炒めて再測定/,
    ko: /가장 큰 게살 덩어리[\s\S]*74°C\(165°F\)[\s\S]*15초씩 더 볶아/,
    th: /ก้อนปูใหญ่สุด[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 15 วินาที/
  }, "the reserved crab also reaches the safe reheating endpoint");
  everyLocale(step(recipe, "Separate cold rice grains"), {
    en: /within 1 hour[\s\S]*within 24 hours[\s\S]*2 hours/,
    "zh-hant": /1 小時內冷藏[\s\S]*24 小時內使用[\s\S]*2 小時/,
    ja: /1時間以内に冷蔵[\s\S]*24時間以内[\s\S]*2時間/,
    ko: /1시간 안에 냉장[\s\S]*24시간 안에 사용[\s\S]*2시간/,
    th: /ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*2 ชั่วโมง/
  }, "rice cooling and cold storage instructions are localized");
  officialSource(recipe, foodSafety);
  officialSource(recipe, riceSafety);
  assert.equal(700 / recipe.servings, 175, "cold rice remains 175 g per serving");
  assert.equal(250 / recipe.servings, 62.5, "cooked crab remains 62.5 g per serving");
});

test("Memphis ribs cover the maximum smoke and rest schedule with a measured pork endpoint", () => {
  const recipe = get("memphis-style-ribs");
  assert.equal(recipe.servings, 6);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "pork spare ribs, 2 racks")?.amount, "2700 g");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [90, 260, 350]);
  const maxSchedule = 90 + 150 + 15;
  assert.ok(recipe.cookMinutes >= maxSchedule, "cook estimate covers 90-minute first smoke, 2.5-hour second smoke, and rest");
  everyLocale(step(recipe, "Smoke until tender with some bite"), {
    en: /thickest meaty part away from bone[\s\S]*63°C \(145°F\)[\s\S]*smoke 15 minutes more and recheck/,
    "zh-hant": /最厚的肉、避開骨頭[\s\S]*63°C（145°F）[\s\S]*再煙燻 15 分鐘並重測/,
    ja: /骨を避けて最も厚い肉[\s\S]*63°C（145°F）[\s\S]*15分ずつ燻して再測定/,
    ko: /뼈를 피해서 가장 두꺼운 살 부분[\s\S]*63°C\(145°F\)[\s\S]*15분 더 훈연하고 다시 잽니다/,
    th: /ส่วนเนื้อที่หนาที่สุดโดยไม่แตะกระดูก[\s\S]*63°C \(145°F\)[\s\S]*15 นาทีแล้ววัดซ้ำ/
  }, "pork temperature and recheck guidance are localized");
  assert.match(step(recipe, "Rest, slice and serve dry").body.en, /15 minutes/);
  officialSource(recipe, foodSafety);
  assert.equal(2700 / recipe.servings, 450, "the two racks provide 450 g raw ribs per serving");
});
