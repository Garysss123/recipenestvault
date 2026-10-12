import assert from "node:assert/strict";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const coldStorage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";

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

function matchesInEveryLocale(stepData, patterns, label) {
  for (const locale of localeOrder) {
    assert.match(stepData.body[locale], patterns[locale], `${locale}: ${label}`);
  }
}

test("twentieth method audit covers four existing recipes in five locales", () => {
  assert.equal(recipes.length, 353, "no recipes were added to the registry");
  const ids = ["oyakodon", "galbi", "bobo-de-camarao", "jiggs-dinner"];
  assert.equal(new Set(ids).size, 4);
  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients localized`);
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), `${id}/${locale}: steps localized`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
  }

  const excludedIds = new Set([
    "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
    "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
    "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
  ]);
  assert.ok(ids.every((id) => !excludedIds.has(id)), "the four additions do not overlap the retained exclusions");

  const oyakodon = get("oyakodon");
  assert.equal(oyakodon.servings, 2);
  assert.deepEqual([oyakodon.prepMinutes, oyakodon.cookMinutes, oyakodon.totalMinutes], [15, 20, 35]);
  hasSource(oyakodon, foodSafety);
  hasSource(oyakodon, eggSafety);
  matchesInEveryLocale(step(oyakodon, "Cook and hold the rice"), {
    en: /360 g cooked Japanese short-grain rice ready[\s\S]*15-minute prep estimate/,
    "zh-hant": /360 g 熟日本短米[\s\S]*15 分鐘備料時間/,
    ja: /炊いた日本短粒米360g[\s\S]*下準備15分/,
    ko: /지은 일본 단립쌀 360g[\s\S]*준비 시간 15분/,
    th: /ข้าวญี่ปุ่นเมล็ดสั้นหุงสุก 360 กรัม[\s\S]*เวลาเตรียมที่ระบุ 15 นาที/
  }, "rice is ready first and dry-rice time is outside prep estimate");
  matchesInEveryLocale(step(oyakodon, "Finish the egg safely"), {
    en: /remaining 100 g[\s\S]*71°C \(160°F\)[\s\S]*no liquid egg remains[\s\S]*check the egg away from the chicken/i,
    "zh-hant": /剩餘 100 g[\s\S]*71°C（160°F）[\s\S]*不再有液態蛋[\s\S]*避開雞肉/,
    ja: /残りの溶き卵100g[\s\S]*71°C（160°F）[\s\S]*液状の卵がなくなる[\s\S]*鶏肉を避けます/,
    ko: /남은 푼 달걀 100g[\s\S]*71°C \(160°F\)[\s\S]*액체 달걀이 남지 않을 때까지[\s\S]*닭고기를 피해 잽니다/,
    th: /ไข่ที่ตีไว้ 100 กรัมที่เหลือ[\s\S]*71°C \(160°F\)[\s\S]*ไม่เหลือไข่เหลว[\s\S]*หลีกเลี่ยงเนื้อไก่/
  }, "egg-dish endpoint is separate from chicken endpoint");
  matchesInEveryLocale(step(oyakodon, "Slide over the rice"), {
    en: /two bowls at 180 g each[\s\S]*150 g raw chicken and 100 g raw egg/,
    "zh-hant": /兩碗，每碗 180 g[\s\S]*150 g 生雞肉與 100 g 生蛋/,
    ja: /180gずつ2杯[\s\S]*鶏肉約150g、卵100g/,
    ko: /두 그릇에 180g씩[\s\S]*닭고기 약 150g과 달걀 100g/,
    th: /สองชาม ชามละ 180 กรัม[\s\S]*ไก่ดิบประมาณ 150 กรัมและไข่ดิบ 100 กรัม/
  }, "two bowls receive equal rice, chicken, and egg portions");

  const galbi = get("galbi");
  assert.equal(galbi.servings, 4);
  hasSource(galbi, foodSafety);
  matchesInEveryLocale(step(galbi, "Turn and reach safe doneness"), {
    en: /every batch must reach 63°C \(145°F\)/i,
    "zh-hant": /每批須達 63°C（145°F）/,
    ja: /各バッチが63°C（145°F）に達/,
    ko: /모든 배치가 63°C \(145°F\)에 도달/,
    th: /ทุกชุดต้องถึง 63°C \(145°F\)/
  }, "whole-cut beef endpoint is used instead of the ground-meat endpoint");
  matchesInEveryLocale(step(galbi, "Rest, cut, and serve"), {
    en: /3 minutes[\s\S]*four diners, about 300 g raw bone-in weight each/,
    "zh-hant": /靜置 3 分鐘[\s\S]*四人，每人約 300 g/,
    ja: /3分休ませ[\s\S]*4人で分け、1人あたり骨付き生重量約300g/,
    ko: /3분 쉬게 한 뒤[\s\S]*네 명에게 나누어 1인당 뼈 포함 생중량 약 300g/,
    th: /พักซี่โครงบนจานสะอาด 3 นาที[\s\S]*สี่คน คนละประมาณ 300 กรัม/
  }, "rest time and raw bone-in portion are explicit");
  assert.ok(galbi.substitutions.some((text) => /25 mm thick/.test(text.en) && /63°C \(145°F\)/.test(text.en)), "thicker boneless substitute allows a practical centre-temperature check");
  for (const instruction of galbi.instructions) {
    for (const locale of localeOrder) assert.doesNotMatch(instruction.body[locale], /71°C|160°F/, `${locale}: galbi is not assigned the ground-meat endpoint`);
  }

  const bobo = get("bobo-de-camarao");
  assert.equal(bobo.servings, 4);
  assert.deepEqual([bobo.prepMinutes, bobo.cookMinutes, bobo.totalMinutes], [30, 50, 80]);
  assert.equal(bobo.ingredients.find((row) => row.item.en.startsWith("fine salt, divided"))?.amount, "8 g");
  hasSource(bobo, foodSafety);
  hasSource(bobo, seafoodSafety);
  matchesInEveryLocale(step(bobo, "Season the shrimp"), {
    en: /3 g salt[\s\S]*chill for 15 minutes/,
    "zh-hant": /3 g 鹽[\s\S]*冷藏 15 分鐘/,
    ja: /塩3g[\s\S]*15分冷やす/,
    ko: /소금 3g[\s\S]*15분 냉장/,
    th: /เกลือ 3 กรัม[\s\S]*แช่เย็น 15 นาที/
  }, "salt allocation and chilled shrimp rest");
  const shrimpEndpoint = step(bobo, "Cook the shrimp gently");
  matchesInEveryLocale(shrimpEndpoint, {
    en: /3–5 minutes[\s\S]*firm, pearly and opaque/,
    "zh-hant": /3–5 分鐘[\s\S]*結實[\s\S]*珍珠白[\s\S]*不透明/,
    ja: /3〜5分[\s\S]*締まり[\s\S]*真珠のような色[\s\S]*不透明/,
    ko: /3–5분[\s\S]*단단하고 진주빛[\s\S]*불투명/,
    th: /3–5 นาที[\s\S]*แน่น สีมุก และทึบแสง/
  }, "shrimp use the official visual endpoint");
  for (const locale of localeOrder) assert.doesNotMatch(shrimpEndpoint.body[locale], /\d+\s*°[CF]/, `${locale}: no irrelevant numeric shrimp temperature`);
  matchesInEveryLocale(step(bobo, "Finish and serve"), {
    en: /remaining 5 g salt[\s\S]*600 g cooked rice[\s\S]*150 g each[\s\S]*175 g raw shrimp[\s\S]*250 g raw cassava/,
    "zh-hant": /剩餘 5 g 鹽[\s\S]*600 g 熟飯[\s\S]*每碗 150 g[\s\S]*175 g 生蝦[\s\S]*250 g 生木薯/,
    ja: /残りの塩5g[\s\S]*炊いたご飯600g[\s\S]*150gずつ[\s\S]*えび約175g[\s\S]*キャッサバ約250g/,
    ko: /남은 소금 5g[\s\S]*지은 밥 600g[\s\S]*150g씩[\s\S]*새우 약 175g[\s\S]*카사바 250g/,
    th: /เกลือที่เหลือ 5 กรัม[\s\S]*ข้าวสุก 600 กรัม[\s\S]*ชามละ 150 กรัม[\s\S]*กุ้งดิบประมาณ 175 กรัม[\s\S]*มันสำปะหลังดิบ 250 กรัม/
  }, "divided salt, shrimp, cassava, and rice portions");
  for (const locale of localeOrder) {
    assert.ok(bobo.commonMistakes[0][locale], `${locale}: shrimp-overcooking warning exists`);
    assert.doesNotMatch(bobo.commonMistakes[0][locale], /fish crumble|魚碎|魚がスープ|생선이 국물|ปลายุ่ย/, `${locale}: no unrelated fish warning`);
  }

  const jiggs = get("jiggs-dinner");
  assert.equal(jiggs.servings, 8);
  assert.deepEqual([jiggs.prepMinutes, jiggs.cookMinutes, jiggs.totalMinutes], [630, 190, 820]);
  hasSource(jiggs, coldStorage);
  matchesInEveryLocale(step(jiggs, "Desalt the beef overnight"), {
    en: /4°C \(40°F\) or below for 10 hours/,
    "zh-hant": /4°C（40°F）以下冷藏 10 小時/,
    ja: /4°C（40°F）以下で10時間冷蔵/,
    ko: /4°C \(40°F\) 이하 냉장고에서 10시간/,
    th: /4°C \(40°F\) หรือต่ำกว่า 10 ชั่วโมง/
  }, "salt beef soak stays refrigerated at or below 4°C");
  matchesInEveryLocale(step(jiggs, "Start the salt beef and peas"), {
    en: /after about 60 minutes[\s\S]*check it[\s\S]*every 10 minutes/,
    "zh-hant": /約 60 分鐘後[\s\S]*每 10 分鐘再檢查/,
    ja: /約60分後[\s\S]*10分ごとに確認/,
    ko: /약 60분 뒤[\s\S]*10분마다 확인/,
    th: /ประมาณ 60 นาที[\s\S]*ตรวจทุก 10 นาที/
  }, "pease pudding is checked and removed at mashable tenderness");
  matchesInEveryLocale(step(jiggs, "Add the rutabaga and carrots"), {
    en: /90–120 minutes total[\s\S]*check every 15 minutes[\s\S]*only then add the rutabaga and carrots[\s\S]*20 minutes/i,
    "zh-hant": /共需 90–120 分鐘[\s\S]*每 15 分鐘檢查[\s\S]*才加入瑞典蕪菁與紅蘿蔔[\s\S]*20 分鐘/,
    ja: /合計90〜120分[\s\S]*15分ごとに確認[\s\S]*ルタバガとにんじんを加え[\s\S]*20分/,
    ko: /총 90–120분[\s\S]*15분마다 확인[\s\S]*루타바가와 당근을 넣고 20분/,
    th: /รวม 90–120 นาที[\s\S]*ตรวจทุก 15 นาที[\s\S]*ใส่รูตาบากากับแครอต[\s\S]*20 นาที/
  }, "beef tenderness precedes root vegetables");
  matchesInEveryLocale(step(jiggs, "Serve the Sunday dinner"), {
    en: /eight plates[\s\S]*about 188 g per person before cooking/,
    "zh-hant": /八盤[\s\S]*每人烹煮前 188 g/,
    ja: /8皿に均等[\s\S]*1人約188g/,
    ko: /여덟 접시에 고르게[\s\S]*1인당 약 188g/,
    th: /8 จาน[\s\S]*ประมาณ 188 กรัมต่อคน/
  }, "eight even servings with raw beef portion stated");
  for (const instruction of jiggs.instructions.slice(1)) {
    for (const locale of localeOrder) assert.doesNotMatch(instruction.body[locale], /\d+\s*°[CF]/, `${locale}: no irrelevant braise endpoint temperature`);
  }
});
