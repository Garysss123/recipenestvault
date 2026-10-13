import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["chicken-karaage", "chawanmushi", "kimchi-fried-rice", "pork-souvlaki"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} exists in the recipe registry`);
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

function matchesEveryLocale(instruction, patterns, label) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${label}`);
}

test("twenty-second method audit covers four existing recipes and retains exclusions", async () => {
  assert.equal(recipes.length, 353, "no recipes were added to the registry");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4, "the four audited IDs are distinct");
  assert.equal(excludedIds.length, 18, "the standing exclusion list remains 18 recipes");
  assert.equal(new Set(excludedIds).size, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "no excluded recipe enters this batch");

  const regressionSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = regressionSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "the shared all-locale route regression list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 320, "the shared detail-route regression now covers 320 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 320, "deep-review IDs remain unique");
  assert.ok(ids.every((id) => covered.includes(id)), "all four new recipes enter the shared route regression");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), `${id}/${locale}: method is localized`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time arithmetic`);
    assert.ok(recipe.sources.length >= 3, `${id}: recipe references remain separate from an official safety source`);
  }
});

test("karaage gives four raw-chicken portions and checks every fry batch safely", () => {
  const recipe = get("chicken-karaage");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [40, 25, 65]);
  hasSource(recipe, foodSafety);

  matchesEveryLocale(step(recipe, "Cut and portion the chicken"), {
    en: /four equal piles[\s\S]*150 g raw chicken per serving/,
    "zh-hant": /四等份[\s\S]*150 公克生雞肉/,
    ja: /4等分[\s\S]*生肉約150g/,
    ko: /네 등분[\s\S]*생닭 약 150g/,
    th: /สี่กองเท่า ๆ กัน[\s\S]*150 กรัมก่อนปรุง/
  }, "the 600 g chicken is allocated to four servings");
  matchesEveryLocale(step(recipe, "Second fry to 74°C"), {
    en: /For every batch[\s\S]*thickest piece[\s\S]*74°C/,
    "zh-hant": /每一批[\s\S]*最厚一塊[\s\S]*74°C/,
    ja: /毎回[\s\S]*最も厚い一個[\s\S]*74℃以上/,
    ko: /매 배치마다[\s\S]*가장 두꺼운 조각[\s\S]*74°C/,
    th: /ทุกชุด[\s\S]*ชิ้นที่หนาที่สุด[\s\S]*74°C/
  }, "each batch reaches the poultry endpoint");
  matchesEveryLocale(step(recipe, "Serve on cabbage"), {
    en: /four plates[\s\S]*150 g raw-chicken equivalent[\s\S]*15 g cabbage per person/,
    "zh-hant": /四盤[\s\S]*150 公克生雞肉[\s\S]*15 公克高麗菜/,
    ja: /4皿[\s\S]*生肉約150g相当[\s\S]*キャベツ15g/,
    ko: /네 접시[\s\S]*생닭 약 150g 상당[\s\S]*양배추 15g/,
    th: /สี่จาน[\s\S]*ไก่ดิบ 150 กรัม[\s\S]*กะหล่ำปลี 15 กรัม/
  }, "each plate has an explicit chicken and cabbage share");
});

test("chawanmushi divides the cups evenly and uses the egg-dish endpoint", () => {
  const recipe = get("chawanmushi");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [15, 20, 35]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, eggSafety);

  matchesEveryLocale(step(recipe, "Fill the steaming cups"), {
    en: /10 g of each mushroom per cup[\s\S]*37\.5 g raw egg[\s\S]*112\.5 ml dashi per cup/,
    "zh-hant": /每杯各 10 公克[\s\S]*37\.5 公克生蛋[\s\S]*112\.5 毫升高湯/,
    ja: /各器にそれぞれ10g[\s\S]*生卵約37\.5g[\s\S]*だし約112\.5ml/,
    ko: /각 버섯 10g씩[\s\S]*생달걀 약 37\.5g[\s\S]*다시 약 112\.5ml/,
    th: /เห็ดแต่ละชนิดถ้วยละ 10 กรัม[\s\S]*ไข่ดิบประมาณ 37\.5 กรัม[\s\S]*ดาชิ 112\.5 มล\./
  }, "four cups receive measured mushroom, egg, and dashi portions");
  matchesEveryLocale(step(recipe, "Check the egg safety"), {
    en: /thickest cup[\s\S]*71°C \(160°F\)[\s\S]*no liquid egg/,
    "zh-hant": /最厚杯的中心[\s\S]*71°C（160°F）[\s\S]*沒有流動蛋液/,
    ja: /最も厚い器の中心[\s\S]*71℃（160°F）[\s\S]*液状の卵が残らない/,
    ko: /가장 두꺼운 컵의 중심[\s\S]*71°C \(160°F\)[\s\S]*액체 달걀이 남지 않아야/,
    th: /ถ้วยที่หนาที่สุด[\s\S]*71°C \(160°F\)[\s\S]*ไม่มีไข่เหลว/
  }, "the cooked egg custard reaches the official egg-dish endpoint");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(recipe, "Check the egg safety").body[locale], /74°C|165°F|74℃|165℉/, `${locale}: the poultry endpoint is not assigned to the egg custard`);
  }
});

test("kimchi fried rice specifies rice handling, two bowls, and a steaming-hot endpoint", () => {
  const recipe = get("kimchi-fried-rice");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [10, 18, 28]);
  hasSource(recipe, riceSafety);

  matchesEveryLocale(step(recipe, "Loosen the cold rice"), {
    en: /ideally within 1 hour[\s\S]*within 24 hours[\s\S]*only once/,
    "zh-hant": /最好在 1 小時內[\s\S]*24 小時內使用[\s\S]*回熱一次/,
    ja: /1時間以内[\s\S]*24時間以内[\s\S]*1回だけ/,
    ko: /1시간 안에[\s\S]*24시간 안에[\s\S]*한 번만/,
    th: /ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ครั้งเดียว/
  }, "chilled rice follows the official rapid-cooling, 24-hour, and single-reheat guidance");
  matchesEveryLocale(step(recipe, "Finish without an egg"), {
    en: /two bowls[\s\S]*200 g cooked rice[\s\S]*125 g kimchi[\s\S]*20 g scallions per serving[\s\S]*steaming hot all the way through/,
    "zh-hant": /兩碗[\s\S]*200 公克熟飯[\s\S]*125 公克泡菜[\s\S]*20 公克青蔥[\s\S]*從裡到外都冒熱氣/,
    ja: /2皿[\s\S]*ご飯約200g[\s\S]*キムチ125g[\s\S]*青ねぎ20g[\s\S]*全体から湯気が立つ/,
    ko: /두 그릇[\s\S]*밥 약 200g[\s\S]*김치 125g[\s\S]*대파 20g[\s\S]*전체에서 김이 충분히 나는지/,
    th: /สองชาม[\s\S]*ข้าวสุกประมาณ 200 กรัม[\s\S]*กิมจิ 125 กรัม[\s\S]*ต้นหอม 20 กรัม[\s\S]*ร้อนมีไอทั่วถึง/
  }, "each bowl has an explicit share and the rice is steaming hot throughout");
  for (const instruction of recipe.instructions) {
    for (const locale of localeOrder) assert.doesNotMatch(instruction.body[locale], /\d+\s*°[CF]|\d+°[CF]/, `${locale}: no unrelated numeric temperature is forced onto rice`);
  }
  for (const locale of localeOrder) assert.match(recipe.storage[locale], /do not reheat|不可再次回熱|温め直さない|다시 데우지|อย่าอุ่นซ้ำ/i, `${locale}: cooked rice is not reheated a second time`);
});

test("pork souvlaki portions skewers, stages prep during marinating, and rests at the whole-cut endpoint", () => {
  const recipe = get("pork-souvlaki");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [40, 20, 60]);
  hasSource(recipe, foodSafety);
  assert.ok(recipe.sources.some((source) => source.url === "https://www.theguardian.com/food/2019/sep/04/how-to-cook-the-perfect-souvlaki-greek-kebab"));

  matchesEveryLocale(step(recipe, "Cut the pork evenly"), {
    en: /800 g evenly among 8 skewers[\s\S]*100 g raw pork per skewer/,
    "zh-hant": /800 公克豬肉平均分成 8 串[\s\S]*100 公克生豬肉/,
    ja: /800gを8本に均等に分け[\s\S]*生肉約100g/,
    ko: /800g을 8개 꼬치에 고르게 나누어[\s\S]*생고기 약 100g/,
    th: /หมู 800 กรัมลง 8 ไม้[\s\S]*100 กรัมก่อนปรุง/
  }, "the raw pork amount is split across eight skewers");
  matchesEveryLocale(step(recipe, "Serve with warm pita"), {
    en: /four plates[\s\S]*2 skewers \(about 200 g raw-pork equivalent\)[\s\S]*1 pita[\s\S]*one-quarter of the sliced onion[\s\S]*one-quarter of the tomato/,
    "zh-hant": /四份[\s\S]*2 串[\s\S]*200 公克生豬肉[\s\S]*1 張 pita[\s\S]*四分之一洋蔥[\s\S]*四分之一番茄/,
    ja: /1人分は串2本[\s\S]*生肉約200g相当[\s\S]*ピタ1枚[\s\S]*各4分の1/,
    ko: /1인분마다 꼬치 2개[\s\S]*생돼지고기 약 200g 상당[\s\S]*피타 1장[\s\S]*각각 4분의 1/,
    th: /สี่ที่[\s\S]*หมู 2 ไม้[\s\S]*หมูดิบประมาณ 200 กรัม[\s\S]*พิตา 1 แผ่น[\s\S]*หนึ่งในสี่/
  }, "each serving receives two skewers and measured sides");
  matchesEveryLocale(step(recipe, "Turn and finish the pork"), {
    en: /thickest pork piece[\s\S]*63°C \(145°F\)/,
    "zh-hant": /最厚豬肉塊中心[\s\S]*63°C（145°F）/,
    ja: /最も厚い豚肉[\s\S]*63°C（145°F）/,
    ko: /가장 두꺼운 돼지고기 조각 중심[\s\S]*63°C \(145°F\)/,
    th: /ชิ้นหมูที่หนาที่สุด[\s\S]*63°C \(145°F\)/
  }, "whole-muscle pork uses the 63°C endpoint");
  matchesEveryLocale(step(recipe, "Rest over sliced onion"), {
    en: /rest for 5 minutes[\s\S]*3-minute rest/,
    "zh-hant": /靜置 5 分鐘[\s\S]*3 分鐘靜置/,
    ja: /5分休ませ[\s\S]*3分休ませる/,
    ko: /5분 휴지[\s\S]*3분 휴지/,
    th: /พัก 5 นาที[\s\S]*พัก 3 นาที/
  }, "the rest exceeds the official three-minute whole-cut rest");
});
