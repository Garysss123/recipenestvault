import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["gimbap", "rice-kheer", "gua-bao", "spanakopita"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
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
    `${recipe.id}: official safety reference remains separately labelled`);
}

test("forty-second batch adds four eligible recipes and preserves registry, exclusions, and prior coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale method regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353, "the existing registry is unchanged");
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
      `${id}: two dish references remain separate from safety guidance`);
  }
});

test("gimbap states prompt serving and safe rice holding in all five locales", () => {
  const recipe = get("gimbap");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [55, 35, 90]);
  const neutralOil = recipe.ingredients.find((row) => row.item.en.startsWith("neutral cooking oil"));
  assert.equal(neutralOil?.amount, "15 ml");
  assert.equal(15, 5 + 5 + 5, "all listed neutral oil is allocated to egg, ham, and carrot");
  const oilPatterns = {
    en: /5 ml/, "zh-hant": /5 毫升/, ja: /油5ml/, ko: /기름 5ml/, th: /น้ำมัน 5 มล\./
  };
  for (const title of ["Cook the egg sheet through", "Brown the ham safely", "Sauté the carrot"]) {
    everyLocale(step(recipe, title), oilPatterns, `${title}: uses one of three 5 ml portions`);
  }
  everyLocale(step(recipe, "Oil, rest, and slice"), {
    en: /within 2 hours of cooking the rice[\s\S]*shallow covered container[\s\S]*within 1 hour[\s\S]*within 24 hours[\s\S]*more than 2 hours/,
    "zh-hant": /飯煮好後 2 小時內食用[\s\S]*淺且有蓋的容器[\s\S]*1 小時內冷藏[\s\S]*24 小時內食用[\s\S]*超過 2 小時/,
    ja: /炊飯から2時間以内[\s\S]*浅い蓋付き容器[\s\S]*1時間以内に冷蔵[\s\S]*24時間以内[\s\S]*2時間を超えて/,
    ko: /밥을 지은 뒤 2시간 안에[\s\S]*얕고 뚜껑 있는 용기[\s\S]*1시간 안에 냉장[\s\S]*24시간 안에[\s\S]*2시간 넘게/,
    th: /ภายใน 2 ชั่วโมงหลังหุงข้าว[\s\S]*ภาชนะตื้นมีฝา[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*เกิน 2 ชั่วโมง/
  }, "serving and rice storage limits are localized");
  officialSource(recipe, riceSafety);
});

test("rice kheer timing matches the soak and drain, with rice storage and reheating limits", () => {
  const recipe = get("rice-kheer");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 65, 95]);
  everyLocale(step(recipe, "Rinse and soak the rice"), {
    en: /soak in cool water 20 minutes, then drain 10 minutes/,
    "zh-hant": /冷水泡 20 分鐘再瀝 10 分鐘/,
    ja: /20分浸し、10分水切り/,
    ko: /20분 불리고 10분 물 뺀/,
    th: /แช่ 20 นาที สะเด็ด 10 นาที/
  }, "prep duration covers the stated soak and drain");
  everyLocale(step(recipe, "Cool safely and garnish"), {
    en: /shallow covered containers[\s\S]*within 1 hour[\s\S]*within 24 hours[\s\S]*only once[\s\S]*74°C/,
    "zh-hant": /淺且有蓋的容器[\s\S]*1 小時內[\s\S]*24 小時內[\s\S]*只回熱一次[\s\S]*74°C/,
    ja: /浅い蓋付き容器[\s\S]*1時間以内[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*74°C/,
    ko: /얕고 뚜껑 있는 용기[\s\S]*1시간 안에[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*74°C/,
    th: /ภาชนะตื้นมีฝา[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*74°C/
  }, "chilling, use-by, and single-reheat directions are localized");
  officialSource(recipe, riceSafety);
  officialSource(recipe, foodSafety);
});

test("gua bao distinguishes official whole-pork safety from the editorial tenderness estimate", () => {
  const recipe = get("gua-bao");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [150, 130, 280]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("skin-on pork belly"))?.amount, "800 g");
  everyLocale(step(recipe, "Braise until spoon-tender"), {
    en: /official minimum for whole-cut pork is 63°C \(145°F\)[\s\S]*3-minute rest[\s\S]*85°C \(185°F\)[\s\S]*site estimate[\s\S]*not an official safety guarantee[\s\S]*10-minute increments[\s\S]*recheck both cues/,
    "zh-hant": /官方整塊豬肉安全最低溫為 63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*85°C（185°F）[\s\S]*本站估算[\s\S]*非官方食安保證[\s\S]*每次 10 分鐘[\s\S]*重新檢查兩項指標/,
    ja: /公式な最低安全温度は63°C（145°F）[\s\S]*3分休ませます[\s\S]*85°C（185°F）[\s\S]*当サイトの目安[\s\S]*公式の安全保証ではありません[\s\S]*10分ずつ[\s\S]*再確認/,
    ko: /공식 최소 안전 온도는 63°C \(145°F\)[\s\S]*3분 휴지[\s\S]*85°C \(185°F\)[\s\S]*사이트 추정치[\s\S]*공식 식품안전 보증이 아닙니다[\s\S]*10분씩[\s\S]*다시 확인/,
    th: /มาตรฐานความปลอดภัยขั้นต่ำอย่างเป็นทางการ[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที[\s\S]*85°C \(185°F\)[\s\S]*ค่าประมาณของเว็บไซต์[\s\S]*ไม่ใช่การรับรองความปลอดภัยอย่างเป็นทางการ[\s\S]*ครั้งละ 10 นาที[\s\S]*ตรวจทั้งสองอย่างซ้ำ/
  }, "safety minimum and texture target remain distinct with rechecks");
  everyLocale(step(recipe, "Fill immediately before serving"), {
    en: /eight portions, about 100 g raw-pork equivalent per bun[\s\S]*25 g mustard greens, about 12 g peanut sugar/,
    "zh-hant": /分成八份[\s\S]*每個約相當於 100 公克生豬肉[\s\S]*25 公克酸菜、約 12 公克花生糖粉/,
    ja: /8等分[\s\S]*生の豚肉約100g相当[\s\S]*漬け菜25g、ピーナッツ砂糖約12g/,
    ko: /여덟 몫[\s\S]*생돼지고기 약 100g 분량[\s\S]*절임 겨자채 25g, 땅콩 설탕 약 12g/,
    th: /8 ส่วน[\s\S]*หมูดิบประมาณ 100 กรัมต่อชิ้น[\s\S]*ผักกาดดอง 25 กรัม ถั่วลิสงน้ำตาลประมาณ 12 กรัม/
  }, "each bun's serving allocation is explicit");
  officialSource(recipe, foodSafety);
});

test("spanakopita checks the egg filling temperature and rechecks while baking", () => {
  const recipe = get("spanakopita");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [45, 60, 105]);
  everyLocale(step(recipe, "Score and bake"), {
    en: /35–40 minutes as a site estimate[\s\S]*thickest centre of the spinach-and-egg filling[\s\S]*71°C \(160°F\)[\s\S]*5-minute increments and recheck/,
    "zh-hant": /35–40 分鐘，這是本站估時[\s\S]*最厚處菠菜蛋餡中心[\s\S]*71°C（160°F）[\s\S]*每次續烤 5 分鐘後重測/,
    ja: /35〜40分焼きます（当サイトの目安）[\s\S]*ほうれん草と卵の具の最も厚い中心[\s\S]*71°C（160°F）[\s\S]*5分ずつ追加で焼いて再測定/,
    ko: /35–40분 굽습니다\(사이트 추정 시간\)[\s\S]*시금치와 달걀 속의 가장 두꺼운 중심[\s\S]*71°C \(160°F\)[\s\S]*5분씩 더 굽고 다시 잽니다/,
    th: /35–40 นาทีตามเวลาโดยประมาณของเว็บไซต์[\s\S]*ไส้ผักโขมกับไข่ส่วนที่หนาที่สุด[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 5 นาทีแล้วตรวจซ้ำ/
  }, "oven time is labelled as an estimate and egg filling has a measured endpoint");
  everyLocale(step(recipe, "Rest before cutting"), {
    en: /Rest the pie uncovered for 15 minutes/,
    "zh-hant": /靜置 15 分鐘/,
    ja: /15分休ませて/,
    ko: /15분 휴지시켜/,
    th: /พักพายแบบไม่ปิด 15 นาที/
  }, "rest time is reflected in cook minutes");
  officialSource(recipe, foodSafety);
});
