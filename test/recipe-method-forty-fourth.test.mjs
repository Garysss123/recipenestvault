import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["onigiri", "coxinha", "frikadellen", "chiles-rellenos"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const chillSafety = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const coldStorage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
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

function everyLocaleText(texts, patterns, label) {
  for (const locale of localeOrder) assert.match(texts[locale], patterns[locale], `${locale}: ${label}`);
}

function officialSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith(officialPrefix)),
    `${recipe.id}: official guidance is separately labelled`);
}

test("forty-fourth batch adds four eligible methods and preserves registry, exclusions, and prior coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale method regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353, "the existing recipe registry is unchanged");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353, "all recipe IDs remain unique");
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 256, "shared detail routes cover 256 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 256, "all reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 252, "all 252 other reviewed IDs remain");
  assert.ok(ids.every((id) => covered.includes(id)), "all four new IDs enter shared coverage");
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "none of the new IDs is excluded");
  assert.equal(recipes.length - excludedIds.length - covered.length, 79, "79 eligible existing recipes remain after this batch");

  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: all ingredients are localized`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: all method steps are localized`);
    }
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith(officialPrefix)).length >= 2,
      `${id}: two dish references remain separate from official safety guidance`);
  }
});

test("onigiri yield and rice cooling, storage, and reheating guidance match in five locales", () => {
  const recipe = get("onigiri");
  assert.equal(recipe.servings, 3);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [35, 30, 65]);
  everyLocale(step(recipe, "Wrap with nori and serve"), {
    en: /six onigiri, two per each of three servings[\s\S]*within 24 hours[\s\S]*Reheat rice only once[\s\S]*steaming hot throughout/,
    "zh-hant": /六顆飯糰[\s\S]*每人兩顆[\s\S]*1 小時內冷藏[\s\S]*24 小時內食用[\s\S]*最多復熱一次[\s\S]*整體冒蒸氣/,
    ja: /6個[\s\S]*1人2個[\s\S]*1時間以内に冷蔵[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*全体から湯気/,
    ko: /주먹밥 여섯 개[\s\S]*두 개씩[\s\S]*1시간 안에 냉장[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*전체에서 김/,
    th: /หกก้อน[\s\S]*คนละสองก้อน[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*เพียงครั้งเดียว[\s\S]*มีไอทั่วถึง/
  }, "yield and rice-specific handling guidance are localized");
  everyLocaleText(recipe.storage, {
    en: /within 1 hour of cooking[\s\S]*refrigerate covered[\s\S]*within 24 hours[\s\S]*only once[\s\S]*steaming hot throughout/,
    "zh-hant": /1 小時內冷藏[\s\S]*24 小時內[\s\S]*最多復熱一次[\s\S]*整體冒蒸氣/,
    ja: /1時間以内に覆って冷蔵[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*全体から湯気/,
    ko: /1시간 안에 덮어 냉장[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*전체에서 김/,
    th: /ภายใน 1 ชั่วโมงหลังหุง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*เพียงครั้งเดียว[\s\S]*มีไอทั่วถึง/
  }, "recipe-card storage matches the method in every locale");
  officialSource(recipe, riceSafety);
});

test("coxinha portions the filling and reheats the largest chilled croquette to 74°C", () => {
  const recipe = get("coxinha");
  assert.equal(recipe.servings, 12);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [55, 45, 100]);
  everyLocale(step(recipe, "Season and cool the filling"), {
    en: /shallow tray[\s\S]*refrigerate within 2 hours/,
    "zh-hant": /淺盤[\s\S]*2 小時內冷藏/,
    ja: /浅いトレー[\s\S]*2時間以内に冷蔵/,
    ko: /얕은 쟁반[\s\S]*2시간 안에 냉장/,
    th: /ถาดตื้น[\s\S]*ภายใน 2 ชั่วโมง/
  }, "cooked filling is chilled promptly");
  everyLocale(step(recipe, "Shape the teardrops"), {
    en: /dough into 12 portions[\s\S]*filling into 12 equal portions, one for each/,
    "zh-hant": /麵糰分成 12 份[\s\S]*雞肉餡也分成 12 等份[\s\S]*每顆可樂餅用一份/,
    ja: /生地を12等分[\s\S]*具もコシーニャ1個分ずつ12等分/,
    ko: /반죽을 12등분[\s\S]*속도 코시냐 한 개당 하나씩 12등분/,
    th: /แบ่งแป้งเป็น 12 ส่วน[\s\S]*แบ่งไส้เย็นเป็น 12 ส่วนเท่ากัน[\s\S]*หนึ่งส่วนต่อโคชินญาหนึ่งชิ้น/
  }, "one equal filling portion is allocated to each of twelve croquettes");
  everyLocale(step(recipe, "Fry to a safe hot centre"), {
    en: /largest coxinha in each batch[\s\S]*74°C \(165°F\)[\s\S]*30-second increments[\s\S]*160–170°C/,
    "zh-hant": /每批用乾淨溫度計測量最大顆中心[\s\S]*74°C（165°F）[\s\S]*續炸 30 秒再測[\s\S]*160–170°C/,
    ja: /各回で最も大きいコシーニャの中心[\s\S]*74°C（165°F）[\s\S]*30秒ずつ揚げて再測定[\s\S]*160〜170°C/,
    ko: /각 배치에서 가장 큰 코시냐의 중심[\s\S]*74°C \(165°F\)[\s\S]*30초씩 더 튀기고 다시[\s\S]*160–170°C/,
    th: /แต่ละรอบวัดใจกลางชิ้นใหญ่ที่สุด[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 30 วินาทีแล้ววัดซ้ำ[\s\S]*160–170°C/
  }, "the crisp outside does not replace a measured safe centre");
  everyLocaleText(recipe.storage, {
    en: /within 2 hours[\s\S]*up to 3 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*最多 3 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*3日以内[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*3일 안에[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 3 วัน[\s\S]*74°C \(165°F\)/
  }, "leftover reheating has the official temperature in every locale");
  officialSource(recipe, foodSafety);
  officialSource(recipe, chillSafety);
  officialSource(recipe, coldStorage);
});

test("Frikadellen portions and ground-meat endpoints are explicit in five locales", () => {
  const recipe = get("frikadellen");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 25, 55]);
  everyLocale(step(recipe, "Shape the patties"), {
    en: /8 equal patties[\s\S]*two patties per each of four servings/,
    "zh-hant": /8 個等份肉餅[\s\S]*四人份每人兩個/,
    ja: /8等分[\s\S]*4人分として1人2個/,
    ko: /8등분[\s\S]*네 사람 기준 한 사람당 두 개/,
    th: /8 ชิ้น[\s\S]*สำหรับสี่ที่ คนละสองชิ้น/
  }, "eight patties allocate two per serving");
  everyLocale(step(recipe, "Pan-fry in batches"), {
    en: /5–6 minutes per side[\s\S]*thickest patty in each batch[\s\S]*71°C \(160°F\)[\s\S]*30-second increments and recheck/,
    "zh-hant": /每面約煎 5–6 分鐘[\s\S]*每批[\s\S]*71°C（160°F）[\s\S]*續煎 30 秒再測/,
    ja: /片面約5〜6分[\s\S]*各回[\s\S]*71°C（160°F）[\s\S]*30秒ずつ加熱して再測定/,
    ko: /한 면당 약 5–6분[\s\S]*각 배치[\s\S]*71°C \(160°F\)[\s\S]*30초씩 더 익히고 다시/,
    th: /ด้านละประมาณ 5–6 นาที[\s\S]*แต่ละรอบ[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 30 วินาทีแล้ววัดซ้ำ/
  }, "each batch has a measured ground-meat endpoint and a recheck");
  everyLocaleText(recipe.storage, {
    en: /within 2 hours[\s\S]*up to 3 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*最多 3 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*3日以内[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*3일 안에[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 3 วัน[\s\S]*74°C \(165°F\)/
  }, "leftover reheating has the official temperature in every locale");
  officialSource(recipe, foodSafety);
  officialSource(recipe, chillSafety);
  officialSource(recipe, coldStorage);
});

test("chiles rellenos measure the egg-dish endpoint and leftovers in five locales", () => {
  const recipe = get("chiles-rellenos");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [55, 45, 100]);
  everyLocale(step(recipe, "Fry to a set centre"), {
    en: /In each batch, check the centre of the largest chile[\s\S]*egg dish must reach 71°C \(160°F\)[\s\S]*30-second increments and recheck[\s\S]*160–170°C/,
    "zh-hant": /每批用乾淨溫度計測最大辣椒中心[\s\S]*蛋料理須達 71°C（160°F）[\s\S]*續炸 30 秒再測[\s\S]*160–170°C/,
    ja: /各回で最も大きいチレの中心[\s\S]*71°C（160°F）[\s\S]*30秒ずつ揚げて再測定[\s\S]*160〜170°C/,
    ko: /각 배치에서 가장 큰 고추 중심[\s\S]*71°C \(160°F\)[\s\S]*30초씩 더 튀기고 다시[\s\S]*160–170°C/,
    th: /แต่ละรอบวัดใจกลางพริกชิ้นใหญ่ที่สุด[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 30 วินาทีแล้ววัดซ้ำ[\s\S]*160–170°C/
  }, "egg-dish temperature and corrective frying cue are localized");
  everyLocaleText(recipe.storage, {
    en: /within 2 hours[\s\S]*up to 3 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*最多 3 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*3日以内[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*3일 안에[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 3 วัน[\s\S]*74°C \(165°F\)/
  }, "leftover reheating has the official temperature in every locale");
  officialSource(recipe, foodSafety);
  officialSource(recipe, chillSafety);
  officialSource(recipe, coldStorage);
});
