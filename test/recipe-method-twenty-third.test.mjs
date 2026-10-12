import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["gyeran-jjim", "omurice", "samgyeopsal", "wonton-soup"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const thermometerSafety = "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer";

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} exists in the published recipe registry`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} instruction exists`);
  return found;
}

function matchesEveryLocale(instruction, patterns, label) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${label}`);
}

function hasSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url), `${recipe.id} cites ${url}`);
}

test("twenty-third method audit extends the five-locale route coverage without changing the registry or exclusions", async () => {
  assert.equal(recipes.length, 353, "the published registry remains at 353 existing recipes");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4, "the new batch IDs are distinct");
  assert.equal(excludedIds.length, 18, "the standing exclusion list remains 18 recipes");
  assert.equal(new Set(excludedIds).size, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "no excluded recipe enters this batch");

  const regressionSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = regressionSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "the shared all-locale detail-route list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 144, "the shared detail-route regression covers 144 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 144, "all deep-reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 140, "the other 140 reviewed IDs remain present");
  assert.ok(ids.every((id) => covered.includes(id)), "all four new recipes enter the shared route regression");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient text exists`);
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), `${id}/${locale}: method text exists`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    assert.ok(recipe.sources.filter((source) => source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: official safety guidance is labeled separately from dish references`);
  }
});

test("gyeran-jjim allocates the shared pot and uses the egg-dish endpoint", () => {
  const recipe = get("gyeran-jjim");
  assert.equal(recipe.servings, 3);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [10, 16, 26]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, eggSafety);

  matchesEveryLocale(step(recipe, "Measure the three shared portions"), {
    en: /6 eggs and 300 ml stock[\s\S]*2 eggs and 100 ml stock per serving/,
    "zh-hant": /6 顆蛋與 300 毫升高湯[\s\S]*每份 2 顆蛋、100 毫升高湯/,
    ja: /卵6個とだし300ml[\s\S]*卵2個・だし100ml/,
    ko: /달걀 6개와 육수 300ml[\s\S]*달걀 2개와 육수 100ml/,
    th: /ไข่ 6 ฟองกับน้ำซุป 300 มล\.[\s\S]*คนละไข่ 2 ฟองและน้ำซุป 100 มล\./
  }, "the shared batch divides into three measured servings");
  matchesEveryLocale(step(recipe, "Set the egg custard safely"), {
    en: /no liquid egg[\s\S]*71°C \(160°F\)/,
    "zh-hant": /沒有流動蛋液[\s\S]*71°C（160°F）/,
    ja: /液状でなく[\s\S]*71°C（160°F）/,
    ko: /액체 없이[\s\S]*71°C \(160°F\)/,
    th: /ไม่มีไข่เหลว[\s\S]*71°C \(160°F\)/
  }, "the custard reaches the official egg-dish endpoint");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(recipe, "Set the egg custard safely").body[locale], /74°C|165°F|74℃|165℉/,
      `${locale}: the poultry endpoint is not applied to the egg dish`);
  }
});

test("omurice portions its chicken rice and eggs and separates their endpoints", () => {
  const recipe = get("omurice");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [15, 25, 40]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, eggSafety);

  matchesEveryLocale(step(recipe, "Portion the chicken, onion, and eggs"), {
    en: /90 g raw chicken and 60 g onion each[\s\S]*two 100 g portions/,
    "zh-hant": /90 公克生雞肉與 60 公克洋蔥[\s\S]*每份 100 公克/,
    ja: /生鶏肉約90gと玉ねぎ60g[\s\S]*卵200gを溶いて100gずつ/,
    ko: /생닭 약 90g과 양파 60g[\s\S]*달걀 200g을 풀어 100g씩/,
    th: /ไก่ดิบประมาณ 90 กรัมและหอมใหญ่ 60 กรัม[\s\S]*แบ่งสองส่วน ส่วนละ 100 กรัม/
  }, "the raw chicken, onion, and egg quantities are split between two plates");
  matchesEveryLocale(step(recipe, "Fold in the rice"), {
    en: /180 g rice[\s\S]*about 90 g raw-chicken equivalent[\s\S]*60 g onion/,
    "zh-hant": /180 公克米飯[\s\S]*90 公克生雞肉[\s\S]*60 公克洋蔥/,
    ja: /ご飯180g[\s\S]*生鶏肉約90g相当[\s\S]*玉ねぎ60g/,
    ko: /밥 180g[\s\S]*생닭 약 90g 상당[\s\S]*양파 60g/,
    th: /ข้าว 180 กรัม[\s\S]*ไก่ดิบเทียบเท่าประมาณ 90 กรัม[\s\S]*หอมใหญ่ 60 กรัม/
  }, "each serving receives one measured portion of rice and filling");
  matchesEveryLocale(step(recipe, "Cook fully set omelettes"), {
    en: /7.5 g for each omelette[\s\S]*one 100 g egg portion[\s\S]*71°C \(160°F\)/,
    "zh-hant": /每張蛋皮用 7.5 公克[\s\S]*100 公克蛋液[\s\S]*71°C（160°F）/,
    ja: /1枚につき7.5g[\s\S]*卵液100g[\s\S]*71°C（160°F）/,
    ko: /한 장당 7.5g[\s\S]*달걀물 100g[\s\S]*71°C \(160°F\)/,
    th: /แผ่นละ 7.5 กรัม[\s\S]*ไข่ส่วนละ 100 กรัม[\s\S]*71°C \(160°F\)/
  }, "each thin omelette uses its measured egg and butter share and reaches 71°C");
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Cook the chicken and onion").body[locale], /74(?:°C|℃)/,
      `${locale}: chicken retains its poultry endpoint`);
    assert.doesNotMatch(step(recipe, "Cook fully set omelettes").body[locale], /74°C|165°F|74℃|165℉/,
      `${locale}: the poultry endpoint is not applied to the egg`);
  }
  matchesEveryLocale(step(recipe, "Cut open and add one ketchup stripe"), {
    en: /remaining 15 g ketchup equally[\s\S]*7.5 g per plate/,
    "zh-hant": /15 公克番茄醬平均分配[\s\S]*每盤約 7.5 公克/,
    ja: /ケチャップ15gを均等に分け[\s\S]*約7.5g/,
    ko: /케첩 15g을 똑같이 나눠[\s\S]*약 7.5g/,
    th: /ซอสมะเขือเทศ 15 กรัมที่เหลือเท่า ๆ กัน[\s\S]*7.5 กรัม/
  }, "the finishing ketchup is split evenly between two plates");
});

test("samgyeopsal divides wraps and uses the whole-cut pork endpoint with a thin-food probe", () => {
  const recipe = get("samgyeopsal");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 30, 50]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, thermometerSafety);

  matchesEveryLocale(step(recipe, "Portion the pork"), {
    en: /800 g into four raw portions of about 200 g/,
    "zh-hant": /800 公克平均分成四份，每份約 200 公克生肉/,
    ja: /800gを生肉約200gずつ4人分/,
    ko: /800g을 생고기 약 200g씩 네 몫/,
    th: /หมูดิบ 800 กรัมเป็น 4 ส่วน ส่วนละประมาณ 200 กรัม/
  }, "the pork is divided into four raw portions");
  matchesEveryLocale(step(recipe, "Make four dipping portions"), {
    en: /four dishes[\s\S]*5 ml oil, 1 g salt, 0.5 g pepper, and 1 g seeds[\s\S]*15 g portions/,
    "zh-hant": /分四碟[\s\S]*每碟 5 毫升油、1 公克鹽、0.5 公克胡椒與 1 公克芝麻[\s\S]*每份 15 公克/,
    ja: /4皿に分け[\s\S]*油5ml、塩1g、こしょう0.5g、ごま1g[\s\S]*15gずつ4人分/,
    ko: /네 접시에 나눕니다[\s\S]*기름 5ml, 소금 1g, 후추 0.5g, 참깨 1g[\s\S]*15g씩 네 몫/,
    th: /แบ่งสี่ถ้วย[\s\S]*น้ำมัน 5 มล. เกลือ 1 กรัม พริกไทย 0.5 กรัม และงา 1 กรัม[\s\S]*ส่วนละ 15 กรัม/
  }, "dipping oil and ssamjang are divided into four servings");
  matchesEveryLocale(step(recipe, "Grill to the whole-cut endpoint"), {
    en: /from the side[\s\S]*63°C \(145°F\)[\s\S]*1-minute increments[\s\S]*3 minutes/,
    "zh-hant": /從側面[\s\S]*63°C（145°F）[\s\S]*每次再煎 1 分鐘[\s\S]*靜置 3 分鐘/,
    ja: /側面から[\s\S]*63°C（145°F）[\s\S]*1分ずつ[\s\S]*3分休ませ/,
    ko: /옆면으로[\s\S]*63°C \(145°F\)[\s\S]*1분씩[\s\S]*3분 쉬게/,
    th: /จากด้านข้าง[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 1 นาที[\s\S]*3 นาที/
  }, "thin pork is checked from its side and rested for three minutes");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(recipe, "Grill to the whole-cut endpoint").body[locale], /71°C|160°F|71℃|160℉/,
      `${locale}: the ground-meat endpoint is not assigned to whole-cut pork`);
  }
  matchesEveryLocale(step(recipe, "Serve four measured wraps"), {
    en: /four servings[\s\S]*200 g raw-pork equivalent, 60 g lettuce, 15 g ssamjang/,
    "zh-hant": /分成四份[\s\S]*200 公克生豬肉[\s\S]*60 公克生菜、15 公克包飯醬/,
    ja: /4人分[\s\S]*生肉約200g相当[\s\S]*レタス60g、サムジャン15g/,
    ko: /네 몫[\s\S]*생고기 약 200g 상당[\s\S]*상추 60g, 쌈장 15g/,
    th: /แบ่งสี่ส่วน[\s\S]*หมูดิบประมาณ 200 กรัม[\s\S]*ผักกาด 60 กรัม ซัมจัง 15 กรัม/
  }, "each wrap serving has a measured pork, leaf, and sauce share");
});

test("wonton soup divides the filling and broth and uses the controlling ground-pork endpoint", () => {
  const recipe = get("wonton-soup");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [60, 25, 85]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, seafoodSafety);
  assert.equal((225 + 225 + 15 + 30 + 15 + 30 + 30 + 3) / 48, 11.9375,
    "the measured filling totals about 11.9 g per wonton");

  matchesEveryLocale(step(recipe, "Fill and seal 48 wontons"), {
    en: /about 573 g[\s\S]*about 11.9 g each/,
    "zh-hant": /總重約 573 公克[\s\S]*每張約 11.9 公克/,
    ja: /合計は約573g[\s\S]*約11.9gずつ/,
    ko: /총 약 573g[\s\S]*약 11.9g씩/,
    th: /รวมประมาณ 573 กรัม[\s\S]*ประมาณ 11.9 กรัม/
  }, "the filling mass matches the 48 wrappers");
  matchesEveryLocale(step(recipe, "Check doneness and lift promptly"), {
    en: /pork centre must reach 71°C \(160°F\)[\s\S]*shrimp should be firm and opaque[\s\S]*ground-pork endpoint/,
    "zh-hant": /豬肉中心達 71°C（160°F）[\s\S]*蝦肉則緊實不透明[\s\S]*豬絞肉的熟度/,
    ja: /豚肉の中心が71°C（160°F）[\s\S]*えびが締まって不透明[\s\S]*豚ひき肉の温度/,
    ko: /돼지고기 중심이 71°C \(160°F\)[\s\S]*새우는 단단하고 불투명[\s\S]*다진 돼지고기 기준 온도/,
    th: /หมูถึง 71°C \(160°F\)[\s\S]*กุ้งแน่นทึบแสง[\s\S]*เกณฑ์หมูบด/
  }, "the stricter ground-pork endpoint governs the mixed filling");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(recipe, "Check doneness and lift promptly").body[locale], /74°C|165°F|74℃|165℉/,
      `${locale}: the poultry or leftover endpoint is not imposed on the mixed wonton filling`);
  }
  matchesEveryLocale(step(recipe, "Divide the bowls"), {
    en: /12 wontons[\s\S]*375 ml broth[\s\S]*5 g per bowl[\s\S]*56 g raw pork[\s\S]*56 g raw shrimp/,
    "zh-hant": /12 顆餛飩[\s\S]*375 毫升高湯[\s\S]*每碗 5 公克[\s\S]*56 公克生豬肉[\s\S]*56 公克生蝦/,
    ja: /12個ずつ[\s\S]*各375ml[\s\S]*各器5g[\s\S]*豚肉約56g[\s\S]*えび約56g/,
    ko: /12개씩[\s\S]*375ml씩[\s\S]*5g씩[\s\S]*돼지고기 약 56g[\s\S]*생새우 약 56g/,
    th: /12 ชิ้น[\s\S]*375 มล\.[\s\S]*ชามละ 5 กรัม[\s\S]*หมูดิบประมาณ 56 กรัม[\s\S]*กุ้งดิบประมาณ 56 กรัม/
  }, "each bowl receives equal wontons, broth, scallions, and filling equivalents");
});
