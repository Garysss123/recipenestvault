import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["sweet-sour-pork", "japanese-gyoza", "beef-wellington", "fish-and-chips"];
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
  const found = recipe.instructions.find((entry) => entry.title?.en === title);
  assert.ok(found, `${recipe.id}: ${title} instruction exists`);
  return found;
}

function body(step, locale) {
  return step?.body?.[locale] ?? step?.[locale] ?? "";
}

function matchesEveryLocale(step, patterns, label) {
  for (const locale of localeOrder) assert.match(body(step, locale), patterns[locale], `${locale}: ${label}`);
}

function assertSourceSeparation(recipe) {
  const dishSources = recipe.sources.filter((source) => !source.title.startsWith(officialPrefix));
  const safetySources = recipe.sources.filter((source) => source.title.startsWith(officialPrefix));
  assert.ok(dishSources.length >= 2, `${recipe.id} retains two dish-method references`);
  assert.equal(safetySources.length, 1, `${recipe.id} has one separately labelled official safety source`);
  assert.equal(safetySources[0].url, foodSafety, `${recipe.id} uses FoodSafety.gov for its safety endpoint`);
}

test("twenty-eighth method audit keeps 353 recipes, 18 exclusions, and retains 168 current shared review IDs", async () => {
  assert.equal(recipes.length, 353, "the published registry remains at 353 existing recipes");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4, "the four batch IDs are distinct");
  assert.equal(excludedIds.length, 18, "the standing exclusion list remains 18 recipes");
  assert.equal(new Set(excludedIds).size, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "no excluded recipe enters this batch");

  const regressionSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = regressionSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "the shared all-locale detail-route list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 168, "shared detail-route regression covers 168 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 168, "all deep-reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 164, "the previous 164 reviewed IDs remain present");
  assert.ok(ids.every((id) => covered.includes(id)), "all four batch recipes enter the shared route regression");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((step) => step.title[locale] && body(step, locale)), `${id}/${locale}: method is localized`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
  }
});

test("sweet-and-sour pork accounts for prep, final doneness, a whole-cut rest, and four portions", () => {
  const recipe = get("sweet-sour-pork");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [45, 30, 75]);
  assertSourceSeparation(recipe);

  matchesEveryLocale(stepByTitle(recipe, "Marinate the pork"), {
    en: /30 minutes[\s\S]*45-minute prep estimate[\s\S]*15 minutes of active handling/,
    "zh-hant": /冷藏 30 分鐘[\s\S]*45 分鐘備料時間[\s\S]*約 15 分鐘實際處理/,
    ja: /30分冷蔵[\s\S]*準備時間45分[\s\S]*約15分の作業時間/,
    ko: /30분 냉장[\s\S]*준비 시간 45분[\s\S]*약 15분의 실제 손질 시간/,
    th: /แช่เย็น 30 นาที[\s\S]*เวลาเตรียมที่แสดง 45 นาที[\s\S]*ประมาณ 15 นาที/
  }, "the 45-minute prep estimate includes the refrigerated marinade and active work");

  matchesEveryLocale(stepByTitle(recipe, "Refry for crispness"), {
    en: /60–90 seconds as a guide[\s\S]*thin-probe thermometer[\s\S]*63°C \(145°F\)[\s\S]*30-second increments[\s\S]*at least 3 minutes/,
    "zh-hant": /60–90 秒[\s\S]*細探針溫度計[\s\S]*63°C（145°F）[\s\S]*每次續炸 30 秒[\s\S]*至少靜置 3 分鐘/,
    ja: /60〜90秒を目安[\s\S]*細いプローブ温度計[\s\S]*63°C（145°F）[\s\S]*30秒ずつ[\s\S]*3分以上休ませ/,
    ko: /60–90초 기준[\s\S]*얇은 탐침 온도계[\s\S]*63°C \(145°F\)[\s\S]*30초씩[\s\S]*최소 3분/,
    th: /60–90 วินาที[\s\S]*เทอร์โมมิเตอร์ปลายเล็ก[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 30 วินาที[\s\S]*อย่างน้อย 3 นาที/
  }, "the whole-cut endpoint and rest are applied after the final fry, with time treated as a guide");

  matchesEveryLocale(stepByTitle(recipe, "Toss and serve immediately"), {
    en: /four servings[\s\S]*500 g raw tenderloin[\s\S]*125 g per serving/,
    "zh-hant": /四份[\s\S]*500 公克生里肌[\s\S]*每份約 125 公克/,
    ja: /4人分[\s\S]*生の豚ヒレ肉500g[\s\S]*約125g相当/,
    ko: /네 몫[\s\S]*생 돼지 안심 500g[\s\S]*약 125g/,
    th: /4 ที่[\s\S]*หมูสันในดิบ 500 กรัม[\s\S]*125 กรัมต่อที่/
  }, "the 500 g raw pork is divided into four equal servings");
});

test("Japanese gyoza uses the ground-pork endpoint, two timed batches, and measured servings", () => {
  const recipe = get("japanese-gyoza");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [50, 27, 77]);
  assertSourceSeparation(recipe);

  matchesEveryLocale(stepByTitle(recipe, "Mix the pork filling"), {
    en: /50-minute prep estimate[\s\S]*10-minute cabbage rest[\s\S]*15-minute filling chill[\s\S]*25 minutes of active work/,
    "zh-hant": /50 分鐘備料時間[\s\S]*高麗菜靜置 10 分鐘[\s\S]*餡料冷藏 15 分鐘[\s\S]*約 25 分鐘實際操作/,
    ja: /準備時間50分[\s\S]*キャベツの10分置き[\s\S]*15分冷蔵[\s\S]*約25分の作業時間/,
    ko: /준비 시간 50분[\s\S]*10분 두는 시간[\s\S]*15분 냉장[\s\S]*약 25분의 실제 작업 시간/,
    th: /เวลาเตรียมที่แสดง 50 นาที[\s\S]*พักกะหล่ำ 10 นาที[\s\S]*แช่ไส้ 15 นาที[\s\S]*ประมาณ 25 นาที/
  }, "the displayed prep time accounts for waits and active work");

  const steam = stepByTitle(recipe, "Steam until the pork is 71°C");
  matchesEveryLocale(steam, {
    en: /4–5 minutes as a guide[\s\S]*thin-probe thermometer[\s\S]*side into the filling centre[\s\S]*71°C \(160°F\)[\s\S]*1-minute increments/,
    "zh-hant": /4–5 分鐘[\s\S]*細探針溫度計[\s\S]*側邊插入餡心[\s\S]*71°C（160°F）[\s\S]*每次續煮 1 分鐘/,
    ja: /4〜5分を目安[\s\S]*細いプローブ温度計[\s\S]*側面からあんの中心[\s\S]*71°C（160°F）[\s\S]*1分ずつ/,
    ko: /4–5분을 기준[\s\S]*얇은 탐침 온도계[\s\S]*옆면으로 넣어 속 중심[\s\S]*71°C \(160°F\)[\s\S]*1분씩/,
    th: /4–5 นาทีเป็นแนวทาง[\s\S]*เทอร์โมมิเตอร์ปลายเล็ก[\s\S]*ด้านข้างถึงกลางไส้[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 1 นาที/
  }, "the largest dumpling gets a measurable ground-pork endpoint and recheck path");
  for (const locale of localeOrder) assert.doesNotMatch(body(steam, locale), /74°C/, `${locale}: the pork filling does not use the poultry endpoint`);

  matchesEveryLocale(stepByTitle(recipe, "Dry and crisp the first batch"), {
    en: /27-minute cook estimate[\s\S]*both batches[\s\S]*skillet to recover/,
    "zh-hant": /27 分鐘烹煮時間[\s\S]*兩批操作[\s\S]*鍋具回熱/,
    ja: /加熱時間27分[\s\S]*2回分[\s\S]*フライパンを戻す/,
    ko: /조리 시간 27분[\s\S]*두 배치[\s\S]*팬이 다시 달궈지는 시간/,
    th: /เวลาให้ความร้อนที่แสดง 27 นาที[\s\S]*สองชุด[\s\S]*กระทะกลับมาร้อน/
  }, "the cook estimate includes both batches and pan recovery");

  matchesEveryLocale(stepByTitle(recipe, "Serve six with soy-vinegar dip"), {
    en: /six crisp-bottomed gyoza per serving[\s\S]*220 g raw pork[\s\S]*55 g per serving/,
    "zh-hant": /6 顆[\s\S]*220 公克生豬絞肉[\s\S]*每份約 55 公克/,
    ja: /一人6個[\s\S]*生の豚ひき肉220g[\s\S]*約55g相当/,
    ko: /6개씩[\s\S]*생 돼지고기 220g[\s\S]*약 55g/,
    th: /จานละ 6 ชิ้น[\s\S]*หมูบดดิบ 220 กรัม[\s\S]*55 กรัมต่อที่/
  }, "the 24 dumplings and raw pork are allocated into four servings");
});

test("Beef Wellington uses the whole-roast endpoint, accounts for chill time, and divides six portions", () => {
  const recipe = get("beef-wellington");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [150, 55, 205]);
  assertSourceSeparation(recipe);

  matchesEveryLocale(stepByTitle(recipe, "Cook the mushroom duxelles dry"), {
    en: /While the beef cools for 15 minutes[\s\S]*cool for about 20 minutes/,
    "zh-hant": /放涼 15 分鐘時[\s\S]*約放涼 20 分鐘/,
    ja: /15分冷ます間に[\s\S]*約20分冷まし/,
    ko: /15분 식히는 동안[\s\S]*약 20분 식혀/,
    th: /พักเนื้อบนตะแกรง 15 นาที[\s\S]*เย็นประมาณ 20 นาที/
  }, "duxelles preparation overlaps the beef rest and its cooling is explicit");

  matchesEveryLocale(stepByTitle(recipe, "Bake to the safe centre temperature"), {
    en: /35–40 minutes as a guide[\s\S]*63°C \(145°F\)[\s\S]*3-minute increments[\s\S]*colour and clock time alone/,
    "zh-hant": /35–40 分鐘[\s\S]*時間僅供參考[\s\S]*63°C（145°F）[\s\S]*每次續烤 3 分鐘[\s\S]*不能單獨判定熟度/,
    ja: /35〜40分を目安[\s\S]*63°C（145°F）[\s\S]*3分ずつ[\s\S]*色や時間だけでは/,
    ko: /35–40분을 기준[\s\S]*63°C \(145°F\)[\s\S]*3분씩[\s\S]*색과 시간만으로/,
    th: /35–40 นาทีเป็นแนวทาง[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 3 นาที[\s\S]*สีแป้งและเวลาเพียงอย่างเดียว/
  }, "the whole-beef endpoint is independent of pastry colour and time");

  matchesEveryLocale(stepByTitle(recipe, "Rest and serve six portions"), {
    en: /15 minutes[\s\S]*official 3-minute rest[\s\S]*six equal servings[\s\S]*150 g raw-beef equivalent/,
    "zh-hant": /靜置 15 分鐘[\s\S]*官方要求的 3 分鐘[\s\S]*六份[\s\S]*150 公克生牛肉/,
    ja: /15分休ませ[\s\S]*公式な3分[\s\S]*6等分[\s\S]*生の牛肉約150g/,
    ko: /15분[\s\S]*공식 최소 3분[\s\S]*여섯 등분[\s\S]*생쇠고기 약 150g/,
    th: /15 นาที[\s\S]*ขั้นต่ำ 3 นาที[\s\S]*6 ที่[\s\S]*เนื้อดิบประมาณ 150 กรัม/
  }, "the 15-minute rest exceeds the official minimum and the 900 g fillet is divided six ways");
});

test("fish and chips fries in serving order, uses fish doneness cues, and allocates four plates", () => {
  const recipe = get("fish-and-chips");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 50, 80]);
  assertSourceSeparation(recipe);

  const fishFryIndex = recipe.instructions.findIndex((step) => step.title.en === "Batter and fry the fish");
  const finalChipsIndex = recipe.instructions.findIndex((step) => step.title.en === "Second-fry the chips");
  const serveIndex = recipe.instructions.findIndex((step) => step.title.en === "Serve four portions immediately");
  assert.ok(fishFryIndex >= 0 && finalChipsIndex > fishFryIndex && serveIndex > finalChipsIndex,
    "fish is cooked before the final chips and both are served after the last batch");

  matchesEveryLocale(stepByTitle(recipe, "Cut and soak the chips"), {
    en: /20 minutes[\s\S]*about 90°C[\s\S]*separate wire racks/,
    "zh-hant": /浸泡 20 分鐘[\s\S]*約 90°C[\s\S]*網架/,
    ja: /20分[\s\S]*約90°C[\s\S]*網を載せたトレー/,
    ko: /20분[\s\S]*약 90°C[\s\S]*랙/,
    th: /20 นาที[\s\S]*ประมาณ 90°C[\s\S]*ตะแกรง/
  }, "the low oven is set up for short, uncovered batch holds");

  matchesEveryLocale(stepByTitle(recipe, "Batter and fry the fish"), {
    en: /6–8 minutes[\s\S]*as a guide[\s\S]*food thermometer[\s\S]*63°C \(145°F\)[\s\S]*fully opaque and separate easily with a fork[\s\S]*20 minutes/,
    "zh-hant": /6–8 分鐘[\s\S]*時間僅供參考[\s\S]*食物溫度計[\s\S]*63°C（145°F）[\s\S]*完全不透明且能用叉子輕易剝開[\s\S]*20 分鐘/,
    ja: /6〜8分[\s\S]*時間は目安[\s\S]*食品用温度計[\s\S]*63°C（145°F）[\s\S]*全体が不透明でフォークで簡単にほぐれる[\s\S]*20分/,
    ko: /6–8분[\s\S]*시간은 기준일 뿐[\s\S]*식품용 온도계[\s\S]*63°C \(145°F\)[\s\S]*완전히 불투명하고 포크로 쉽게 갈라지는[\s\S]*20분/,
    th: /6–8 นาที[\s\S]*เวลานี้เป็นแนวทาง[\s\S]*เทอร์โมมิเตอร์อาหาร[\s\S]*63°C \(145°F\)[\s\S]*ทึบแสงทั่วและแยกง่ายด้วยส้อม[\s\S]*20 นาที/
  }, "fish uses the official temperature or visual endpoint and the time is a guide");

  matchesEveryLocale(stepByTitle(recipe, "Serve four portions immediately"), {
    en: /four plates[\s\S]*180 g raw-fish portion[\s\S]*300 g peeled potatoes[\s\S]*7.5 ml/,
    "zh-hant": /四盤[\s\S]*180 公克生魚排[\s\S]*300 公克去皮生馬鈴薯[\s\S]*7.5 毫升/,
    ja: /4皿[\s\S]*生魚180g[\s\S]*調理前のじゃがいも約300g[\s\S]*7.5ml/,
    ko: /네 접시[\s\S]*생선은 조리 전 180g[\s\S]*감자는 약 300g[\s\S]*7.5ml/,
    th: /4 จาน[\s\S]*ปลาดิบ 180 กรัม[\s\S]*มันฝรั่งปอกเปลือกก่อนทอดประมาณ 300 กรัม[\s\S]*7.5 มล\./
  }, "the four plates receive equal fish, potato, and vinegar portions");
});
