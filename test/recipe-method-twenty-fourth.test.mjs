import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["gyudon", "jiaozi", "tamagoyaki", "yakitori"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
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

test("twenty-fourth method audit extends five-locale coverage while retaining the registry and exclusions", async () => {
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
  assert.equal(covered.length, 220, "the shared detail-route regression covers 220 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 220, "all deep-reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 216, "the other 216 reviewed IDs remain present");
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

test("gyudon allocates each bowl and applies the whole-cut beef endpoint and rest", () => {
  const recipe = get("gyudon");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [15, 15, 30]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, thermometerSafety);

  matchesEveryLocale(step(recipe, "Prepare the rice, beef, and onion"), {
    en: /two bowls at 180 g each[\s\S]*150 g raw beef and 100 g onion/,
    "zh-hant": /兩碗各 180 公克[\s\S]*150 公克生牛肉與 100 公克洋蔥/,
    ja: /2杯に180gずつ[\s\S]*生の牛肉150g、玉ねぎ100g/,
    ko: /두 그릇에 180g씩[\s\S]*생소고기 150g, 양파 100g/,
    th: /สองชาม ชามละ 180 กรัม[\s\S]*เนื้อดิบ 150 กรัมและหอมใหญ่ 100 กรัม/
  }, "the rice, beef, and onion are divided across two bowls");
  matchesEveryLocale(step(recipe, "Make the cold-pan broth"), {
    en: /120 ml dashi[\s\S]*22\.5 ml soy sauce[\s\S]*9 g sugar per bowl/,
    "zh-hant": /120 毫升高湯[\s\S]*22\.5 毫升醬油[\s\S]*9 公克糖/,
    ja: /だし120ml[\s\S]*しょうゆ22\.5ml[\s\S]*砂糖9g/,
    ko: /다시 120ml[\s\S]*간장 22\.5ml[\s\S]*설탕 9g/,
    th: /ดาชิ 120 มล\.[\s\S]*ซีอิ๊ว 22\.5 มล\.[\s\S]*น้ำตาล 9 กรัม/
  }, "the broth amounts have a measured starting share per bowl");
  matchesEveryLocale(step(recipe, "Simmer the beef"), {
    en: /from the side[\s\S]*63°C \(145°F\)[\s\S]*1-minute increments/,
    "zh-hant": /從側面[\s\S]*63°C（145°F）[\s\S]*續煮 1 分鐘/,
    ja: /横から[\s\S]*63°C（145°F）[\s\S]*1分ずつ/,
    ko: /옆에서[\s\S]*63°C \(145°F\)[\s\S]*1분씩/,
    th: /จากด้านข้าง[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 1 นาที/
  }, "thin whole-cut beef uses the 63°C endpoint");
  matchesEveryLocale(step(recipe, "Settle the broth"), {
    en: /covered hot broth for a full 3-minute rest/,
    "zh-hant": /熱湯汁中完整靜置 3 分鐘/,
    ja: /熱いつゆに入れたまま3分間休ませ/,
    ko: /뜨거운 국물에 소고기와 양파를 둔 채 3분간/,
    th: /น้ำซอสร้อนให้ครบ 3 นาที/
  }, "the three-minute rest follows the endpoint");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(recipe, "Simmer the beef").body[locale], /71°C|160°F|71℃|160℉/,
      `${locale}: the ground-meat endpoint is not applied to sliced beef`);
  }
});

test("jiaozi portions its filling and servings and checks each pork batch at 71°C", () => {
  const recipe = get("jiaozi");
  assert.equal(recipe.servings, 4);
  assert.deepEqual(recipe.yield, {
    en: "48 dumplings (4 servings)",
    "zh-hant": "48 顆（4 份）",
    ja: "48個（4人分）",
    ko: "48개(4인분)",
    th: "48 ชิ้น (4 ที่)"
  });
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [90, 40, 130]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, thermometerSafety);

  matchesEveryLocale(step(recipe, "Fill and seal"), {
    en: /48 equal portions, about 16–17 g each/,
    "zh-hant": /平均分成 48 份[\s\S]*約 16–17 公克/,
    ja: /48等分[\s\S]*約16～17g/,
    ko: /48등분[\s\S]*약 16–17g/,
    th: /48 ส่วน[\s\S]*ประมาณ 16–17 กรัม/
  }, "weighed filling is spread evenly without a false exact 15 g claim");
  matchesEveryLocale(step(recipe, "Boil in three 16-piece batches"), {
    en: /16 dumplings per batch[\s\S]*largest dumpling in every batch[\s\S]*ground-pork centre reach 71°C \(160°F\)[\s\S]*1-minute increments/,
    "zh-hant": /每批煮 16 顆[\s\S]*每批都檢查最大顆[\s\S]*豬絞肉餡心達 71°C（160°F）[\s\S]*續煮 1 分鐘/,
    ja: /1回16個ずつ[\s\S]*各回で最も大きい餃子[\s\S]*豚ひき肉の中心が71°C（160°F）[\s\S]*1分ずつ/,
    ko: /한 번에 16개씩[\s\S]*매번 가장 큰 만두[\s\S]*다진 돼지고기 중심이 71°C \(160°F\)[\s\S]*1분씩/,
    th: /ครั้งละ 16 ชิ้น[\s\S]*ชิ้นใหญ่สุดในทุกชุด[\s\S]*หมูบดถึง 71°C \(160°F\)[\s\S]*ครั้งละ 1 นาที/
  }, "each ground-pork batch uses the applicable endpoint and recheck");
  matchesEveryLocale(step(recipe, "Lift and serve boiled jiaozi"), {
    en: /four servings at 12 each[\s\S]*about 100 g raw pork[\s\S]*11\.25 ml black rice vinegar[\s\S]*3\.75 ml chili oil/,
    "zh-hant": /四份、每份 12 顆[\s\S]*100 公克生豬肉[\s\S]*11\.25 毫升黑米醋[\s\S]*3\.75 毫升辣油/,
    ja: /4人分に12個ずつ[\s\S]*生の豚肉約100g[\s\S]*黒米酢11\.25ml[\s\S]*ラー油3\.75ml/,
    ko: /네 몫으로 나눠 한 사람당 12개씩[\s\S]*생돼지고기 약 100g[\s\S]*흑미식초 11\.25ml[\s\S]*고추기름 3\.75ml/,
    th: /สี่ส่วน ส่วนละ 12 ชิ้น[\s\S]*หมูดิบประมาณ 100 กรัม[\s\S]*11\.25 มล\.[\s\S]*3\.75 มล\./
  }, "each serving gets twelve dumplings and measured side sauces");
  matchesEveryLocale(step(recipe, "Steam-fry and crisp"), {
    en: /ground-pork centre for 71°C \(160°F\)[\s\S]*15 ml water[\s\S]*1-minute increments/,
    "zh-hant": /豬絞肉餡心達 71°C（160°F）[\s\S]*15 毫升水[\s\S]*每次續煮 1 分鐘/,
    ja: /豚ひき肉の中心が71°C（160°F）[\s\S]*水15ml[\s\S]*1分ずつ/,
    ko: /다진 돼지고기 중심이 71°C \(160°F\)[\s\S]*물 15ml[\s\S]*1분씩/,
    th: /ใจกลางหมูบด[\s\S]*71°C \(160°F\)[\s\S]*น้ำ 15 มล\.[\s\S]*ครั้งละ 1 นาที/
  }, "the optional pan-fry path uses the same pork endpoint");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(recipe, "Boil in three 16-piece batches").body[locale], /74°C|165°F|74℃|165℉/,
      `${locale}: the poultry or leftover endpoint is not applied to ground pork`);
  }
});

test("tamagoyaki portions the egg mixture and uses the egg-dish endpoint", () => {
  const recipe = get("tamagoyaki");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [10, 15, 25]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, eggSafety);

  matchesEveryLocale(step(recipe, "Mix the egg base"), {
    en: /75 g egg, 7\.5 ml dashi, 4\.5 g sugar, 0\.5 g salt, and 2\.5 ml soy sauce per person/,
    "zh-hant": /每份約相當於 75 公克蛋、7\.5 毫升高湯、4\.5 公克糖、0\.5 公克鹽與 2\.5 毫升醬油/,
    ja: /1人あたり卵75g、だし7\.5ml、砂糖4\.5g、塩0\.5g、しょうゆ2\.5ml/,
    ko: /한 사람당 달걀 75g, 다시 7\.5ml, 설탕 4\.5g, 소금 0\.5g, 간장 2\.5ml/,
    th: /ไข่ 75 กรัม ดาชิ 7\.5 มล. น้ำตาล 4\.5 กรัม เกลือ 0\.5 กรัม และซีอิ๊ว 2\.5 มล\./
  }, "each of four servings has an explicit egg-base share");
  matchesEveryLocale(step(recipe, "Set the centre safely"), {
    en: /71°C \(160°F\)[\s\S]*no liquid egg/,
    "zh-hant": /71°C（160°F）[\s\S]*不可殘留流動蛋液/,
    ja: /71°C（160°F）[\s\S]*液状の卵が残っていない/,
    ko: /71°C \(160°F\)[\s\S]*흐르는 달걀물이 남지 않았/,
    th: /71°C \(160°F\)[\s\S]*ไม่มีไข่เหลวเหลือ/
  }, "the egg dish uses its own endpoint and visual cue");
  matchesEveryLocale(step(recipe, "Rest and slice"), {
    en: /eight thick pieces[\s\S]*two pieces per person/,
    "zh-hant": /切成 8 片厚片[\s\S]*每人分 2 片/,
    ja: /8切れに厚く切り、1人2切れずつ/,
    ko: /두껍게 여덟 조각으로 썰어 한 사람당 두 조각씩/,
    th: /หั่นหนา 8 ชิ้น เสิร์ฟคนละ 2 ชิ้น/
  }, "the finished roll divides into four servings");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(recipe, "Set the centre safely").body[locale], /74°C|165°F|74℃|165℉/,
      `${locale}: the poultry endpoint is not applied to the egg dish`);
  }
});

test("yakitori overlaps the skewer soak, measures four portions, and checks every poultry skewer", () => {
  const recipe = get("yakitori");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [35, 20, 55]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, thermometerSafety);

  matchesEveryLocale(step(recipe, "Soak the bamboo skewers"), {
    en: /30 minutes[\s\S]*Prepare and salt the chicken during the soak/,
    "zh-hant": /浸泡 30 分鐘[\s\S]*趁浸泡時處理並調味雞肉/,
    ja: /30分浸け始めます[\s\S]*その間に鶏肉を準備して塩をまぶし/,
    ko: /30분 불리기 시작합니다[\s\S]*그동안 닭을 손질해 소금 간하고/,
    th: /30 นาที[\s\S]*ระหว่างนั้นเตรียมไก่และคลุกเกลือ/
  }, "the 30-minute skewer soak overlaps chicken preparation");
  matchesEveryLocale(step(recipe, "Thread eight skewers"), {
    en: /eight equal piles of about 75 g[\s\S]*two skewers, or about 150 g raw chicken, per serving/,
    "zh-hant": /八份、每份約 75 公克[\s\S]*每人分兩支，約相當於 150 公克生雞肉/,
    ja: /約75gずつ8等分[\s\S]*1人2本[\s\S]*約150g相当/,
    ko: /약 75g씩 여덟 몫[\s\S]*한 사람당 두 꼬치[\s\S]*생닭 약 150g/,
    th: /แปดส่วนเท่า ๆ กัน ส่วนละประมาณ 75 กรัม[\s\S]*หนึ่งคนได้สองไม้[\s\S]*ไก่ดิบประมาณ 150 กรัม/
  }, "each of four servings receives two weighed skewers");
  matchesEveryLocale(step(recipe, "Finish to 74°C"), {
    en: /each skewer[\s\S]*74°C \(165°F\)[\s\S]*1-minute increments/,
    "zh-hant": /每支竹籤[\s\S]*74°C（165°F）[\s\S]*每次續烤 1 分鐘/,
    ja: /各串[\s\S]*74°C（165°F）[\s\S]*1分ずつ/,
    ko: /각 꼬치[\s\S]*74°C \(165°F\)[\s\S]*1분씩/,
    th: /แต่ละไม้[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 1 นาที/
  }, "each skewer reaches the poultry endpoint with a recheck path");
  matchesEveryLocale(step(recipe, "Rest and serve shio"), {
    en: /two skewers per person[\s\S]*1\.5 g per serving/,
    "zh-hant": /每人分兩支[\s\S]*每份 1\.5 公克/,
    ja: /1人2本ずつ[\s\S]*1人分あたり1\.5g/,
    ko: /한 사람당 두 꼬치씩[\s\S]*한 몫당 1\.5g/,
    th: /คนละสองไม้[\s\S]*ส่วนละ 1\.5 กรัม/
  }, "salt shares are explicit at service");
});
