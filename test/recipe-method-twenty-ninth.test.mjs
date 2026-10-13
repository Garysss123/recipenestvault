import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["roast-beef-yorkshire-pudding", "buffalo-wings", "meatloaf", "pescado-a-la-veracruzana"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const officialPrefix = "Official food-safety guidance";

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} exists in the published recipe registry`);
  return recipe;
}

function stepByTitle(recipe, title) {
  const step = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(step, `${recipe.id}: ${title} instruction exists`);
  return step;
}

function matchesEveryLocale(step, patterns, label) {
  for (const locale of localeOrder) {
    assert.match(step.body[locale], patterns[locale], `${locale}: ${label}`);
  }
}

function assertSourceSeparation(recipe) {
  const dishSources = recipe.sources.filter((source) => !source.title.startsWith(officialPrefix));
  const safetySources = recipe.sources.filter((source) => source.title.startsWith(officialPrefix));
  assert.equal(dishSources.length, 2, `${recipe.id} keeps two dish-method references`);
  assert.equal(safetySources.length, 1, `${recipe.id} has one separately labelled official safety reference`);
  assert.equal(safetySources[0].url, foodSafety, `${recipe.id} uses FoodSafety.gov for the safety endpoint`);
}

test("twenty-ninth method audit keeps 353 recipes, the 18 exclusions, and retains 224 current shared review IDs", async () => {
  assert.equal(recipes.length, 353, "the published registry remains at 353 existing recipes");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4, "the batch has four distinct existing recipe IDs");
  assert.equal(excludedIds.length, 18, "the standing exclusion list remains 18 recipes");
  assert.equal(new Set(excludedIds).size, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "no excluded recipe enters this batch");

  const regressionSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = regressionSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "the shared all-locale detail-route list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 224, "shared detail-route regression covers 224 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 224, "all deep-reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 220, "the 220 other reviewed IDs remain present");
  assert.ok(ids.every((id) => covered.includes(id)), "all four recipes enter the shared route regression");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: method is localized`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
  }
});

test("roast beef reaches the official whole-cut endpoint, rests, and serves six measured portions", () => {
  const recipe = get("roast-beef-yorkshire-pudding");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [35, 130, 165]);
  assertSourceSeparation(recipe);

  matchesEveryLocale(stepByTitle(recipe, "Finish the roast gently"), {
    en: /45–55 minutes as an initial guide[\s\S]*thermometer after 45 minutes[\s\S]*63°C \(145°F\)[\s\S]*5-minute increments/,
    "zh-hant": /45–55 分鐘作為起始參考[\s\S]*溫度計[\s\S]*63°C（145°F）[\s\S]*續烤 5 分鐘/,
    ja: /45〜55分を目安[\s\S]*温度計[\s\S]*63°C（145°F）[\s\S]*5分ずつ追加/,
    ko: /45–55분을 기준[\s\S]*온도계[\s\S]*63°C \(145°F\)[\s\S]*5분씩 더/,
    th: /45–55 นาทีเป็นเวลาเริ่มต้น[\s\S]*เทอร์โมมิเตอร์[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 5 นาที/
  }, "the roast endpoint is measured and roast time is only a guide");

  matchesEveryLocale(stepByTitle(recipe, "Rest the beef"), {
    en: /30 minutes[\s\S]*official 3-minute rest/,
    "zh-hant": /30 分鐘[\s\S]*至少 3 分鐘/,
    ja: /30分[\s\S]*公式最低3分/,
    ko: /30분[\s\S]*공식 최소 3분/,
    th: /30 นาที[\s\S]*ขั้นต่ำ 3 นาที/
  }, "the 30-minute rest exceeds the whole-cut minimum");

  matchesEveryLocale(stepByTitle(recipe, "Carve and serve"), {
    en: /1\.8 kg raw beef[\s\S]*six portions[\s\S]*300 g raw-beef equivalent[\s\S]*two hot Yorkshire puddings/,
    "zh-hant": /1\.8 公斤牛肉[\s\S]*六份[\s\S]*300 公克生牛肉[\s\S]*兩個熱約克郡布丁/,
    ja: /牛肉1\.8kg[\s\S]*6等分[\s\S]*約300g[\s\S]*2個/,
    ko: /소고기 1\.8kg[\s\S]*여섯 등분[\s\S]*약 300g[\s\S]*푸딩 2개/,
    th: /เนื้อวัวก่อนอบ 1\.8 กก\.[\s\S]*6 ส่วน[\s\S]*300 กรัม[\s\S]*คนละ 2 ชิ้น/
  }, "beef and puddings are divided among six portions");
});

test("Buffalo wings account for three batches, use a poultry thermometer endpoint, and divide four portions", () => {
  const recipe = get("buffalo-wings");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 55, 80]);
  assertSourceSeparation(recipe);

  matchesEveryLocale(stepByTitle(recipe, "Fry the wings in batches"), {
    en: /3 batches[\s\S]*9–11 minutes each as a guide[\s\S]*180°C[\s\S]*largest flat and drumette from each batch[\s\S]*74°C \(165°F\)[\s\S]*1-minute increments/,
    "zh-hant": /3 批[\s\S]*9–11 分鐘作為參考[\s\S]*180°C[\s\S]*每批[\s\S]*74°C（165°F）[\s\S]*續炸 1 分鐘/,
    ja: /3回[\s\S]*9〜11分を目安[\s\S]*180°C[\s\S]*各回[\s\S]*74°C（165°F）[\s\S]*1分ずつ追加/,
    ko: /3번[\s\S]*9–11분을 기준[\s\S]*180°C[\s\S]*각 배치[\s\S]*74°C \(165°F\)[\s\S]*1분씩 더/,
    th: /3 รอบ[\s\S]*9–11 นาทีเป็นแนวทาง[\s\S]*180°C[\s\S]*แต่ละรอบ[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 1 นาที/
  }, "oil temperature and fry time are separated from poultry doneness");

  matchesEveryLocale(stepByTitle(recipe, "Serve with celery and dip"), {
    en: /1,500 g raw wings[\s\S]*4 servings[\s\S]*375 g raw bone-in wings/,
    "zh-hant": /1,500 公克生雞翅[\s\S]*4 份[\s\S]*375 公克（含骨生重）/,
    ja: /生の手羽1.5kg[\s\S]*4人分[\s\S]*約375g/,
    ko: /생 닭날개 1.5kg[\s\S]*4인분[\s\S]*약 375g/,
    th: /ปีกไก่ดิบ 1,500 กรัม[\s\S]*4 ที่[\s\S]*375 กรัม/
  }, "the raw bone-in wing amount is divided into four servings");
});

test("meatloaf checks ground-beef doneness and divides the loaf into eight portions", () => {
  const recipe = get("meatloaf");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 75, 100]);
  assertSourceSeparation(recipe);

  matchesEveryLocale(stepByTitle(recipe, "Bake and reglaze"), {
    en: /40 minutes[\s\S]*15–20 minutes as a guide[\s\S]*thickest centre[\s\S]*71°C \(160°F\)[\s\S]*5-minute increments/,
    "zh-hant": /40 分鐘[\s\S]*15–20 分鐘作為參考[\s\S]*最厚處中心[\s\S]*71°C（160°F）[\s\S]*續烤 5 分鐘/,
    ja: /40分[\s\S]*15〜20分は目安[\s\S]*最も厚い中心[\s\S]*71°C（160°F）[\s\S]*5分ずつ追加/,
    ko: /40분[\s\S]*15–20분 더 굽는 시간은 기준[\s\S]*가장 두꺼운 중심[\s\S]*71°C \(160°F\)[\s\S]*5분씩 더/,
    th: /40 นาที[\s\S]*15–20 นาทีเป็นเวลาแนวทาง[\s\S]*ส่วนที่หนาที่สุด[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 5 นาที/
  }, "the ground-meat endpoint is measured and timed bake is a guide");

  matchesEveryLocale(stepByTitle(recipe, "Slice and serve"), {
    en: /eight equal thick slices[\s\S]*1,200 g raw ground beef[\s\S]*150 g raw-beef equivalent per serving/,
    "zh-hant": /八片等厚切片[\s\S]*1,200 公克生絞牛肉[\s\S]*150 公克/,
    ja: /8枚[\s\S]*牛ひき肉1.2kg[\s\S]*約150g/,
    ko: /8조각[\s\S]*다진 소고기 1.2kg[\s\S]*약 150g/,
    th: /8 ชิ้น[\s\S]*เนื้อบดดิบ 1,200 กรัม[\s\S]*150 กรัม/
  }, "the ground beef is divided into eight portions");
});

test("Veracruz fish uses the official fish endpoint or full opaque-and-fork cue and four portions", () => {
  const recipe = get("pescado-a-la-veracruzana");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 35, 55]);
  assertSourceSeparation(recipe);

  matchesEveryLocale(stepByTitle(recipe, "Season the fish"), {
    en: /cover it and keep it refrigerated while you prepare the sauce[\s\S]*lime juice just before the fish goes into the pan in Step 5/,
    "zh-hant": /覆蓋冷藏並先準備醬汁[\s\S]*下鍋前才淋上萊姆汁/,
    ja: /覆い[\s\S]*ソースを準備する間は冷蔵[\s\S]*魚を加える直前にかけます/,
    ko: /덮어 냉장[\s\S]*소스를 준비하는 동안 차갑게[\s\S]*넣기 직전에 라임즙/,
    th: /ปิดคลุมแล้วแช่เย็นระหว่างเตรียมซอส[\s\S]*ก่อนใส่ปลาลงกระทะ/
  }, "the raw fish stays chilled and receives lime just before cooking");

  matchesEveryLocale(stepByTitle(recipe, "Cover and cook gently"), {
    en: /7–9 minutes as a guide[\s\S]*thickest part[\s\S]*63°C \(145°F\)[\s\S]*opaque[\s\S]*fork[\s\S]*2-minute increments/,
    "zh-hant": /7–9 分鐘僅供參考[\s\S]*最厚魚排[\s\S]*63°C（145°F）[\s\S]*全不透明[\s\S]*叉子[\s\S]*每次 2 分鐘/,
    ja: /7〜9分は目安[\s\S]*最も厚い部分[\s\S]*63°C（145°F）[\s\S]*不透明[\s\S]*フォーク[\s\S]*2分ずつ追加/,
    ko: /7–9분은 기준[\s\S]*가장 두꺼운 부분[\s\S]*63°C \(145°F\)[\s\S]*불투명[\s\S]*포크[\s\S]*2분씩 더/,
    th: /7–9 นาทีเป็นแนวทาง[\s\S]*ส่วนที่หนาที่สุด[\s\S]*63°C \(145°F\)[\s\S]*ทึบแสง[\s\S]*ส้อม[\s\S]*ครั้งละ 2 นาที/
  }, "fish time is a guide with thermometer and official visual endpoints");

  matchesEveryLocale(stepByTitle(recipe, "Plate with plenty of sauce"), {
    en: /700 g raw fish[\s\S]*4 equal portions[\s\S]*175 g raw fish per serving/,
    "zh-hant": /700 公克生魚肉[\s\S]*4 份[\s\S]*175 公克/,
    ja: /生の魚700g[\s\S]*4等分[\s\S]*約175g/,
    ko: /생선 700g[\s\S]*4등분[\s\S]*약 175g/,
    th: /ปลาดิบ 700 กรัม[\s\S]*4 ส่วน[\s\S]*175 กรัม/
  }, "the raw fish amount is divided into four portions");
});
