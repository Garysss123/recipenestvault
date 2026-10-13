import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["chicken-tikka-masala", "pad-kra-pao", "gambas-al-ajillo", "churrasco-picanha"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const officialPrefix = "Official food-safety guidance";

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

function hasOfficialSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith(officialPrefix)),
    `${recipe.id} labels ${url} as official food-safety guidance`);
}

function assertSourceSeparation(recipe, safetyUrls) {
  const dishSources = recipe.sources.filter((source) => !source.title.startsWith(officialPrefix));
  assert.ok(dishSources.length >= 2, `${recipe.id} retains at least two dish-method references`);
  for (const url of safetyUrls) hasOfficialSource(recipe, url);
  assert.ok(recipe.sources.filter((source) => source.title.startsWith(officialPrefix)).length >= safetyUrls.length,
    `${recipe.id} keeps official safety references distinct from dish references`);
}

test("twenty-sixth method audit retains the registry, exclusions, and shared five-locale route coverage", async () => {
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
  assert.equal(covered.length, 308, "the shared detail-route regression covers 308 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 308, "all deep-reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 304, "the other 304 reviewed IDs remain present");
  assert.ok(ids.every((id) => covered.includes(id)), "all four new recipes enter the shared route regression");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient text exists`);
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), `${id}/${locale}: method text exists`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
  }
});

test("chicken tikka masala overlaps the marinade prep and checks chicken before allocating six bowls", () => {
  const recipe = get("chicken-tikka-masala");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [45, 60, 105]);
  assertSourceSeparation(recipe, [foodSafety]);

  matchesEveryLocale(step(recipe, "Marinate the chicken"), {
    en: /800 g chicken[\s\S]*200 g yoghurt[\s\S]*at least 30 minutes[\s\S]*While it chills[\s\S]*separate from ready-to-eat food/,
    "zh-hant": /800 公克雞肉[\s\S]*200 公克優格[\s\S]*至少 30 分鐘[\s\S]*冷藏期間[\s\S]*即食食物分開/,
    ja: /鶏肉800g[\s\S]*ヨーグルト200g[\s\S]*少なくとも30分[\s\S]*冷やしている間[\s\S]*そのまま食べる食品から離し/,
    ko: /닭고기 800g[\s\S]*요거트 200g[\s\S]*최소 30분[\s\S]*차가워지는 동안[\s\S]*바로 먹는 식품과 분리/,
    th: /ไก่ 800 กรัม[\s\S]*โยเกิร์ต 200 กรัม[\s\S]*อย่างน้อย 30 นาที[\s\S]*ระหว่างนั้น[\s\S]*อาหารพร้อมกิน/
  }, "measured marinade and prep overlap are explicit in all locales");
  matchesEveryLocale(step(recipe, "Char the chicken"), {
    en: /12–15 minutes[\s\S]*several of the thickest pieces[\s\S]*2-minute increments[\s\S]*74°C \(165°F\)/,
    "zh-hant": /12–15 分鐘[\s\S]*數塊最厚雞塊[\s\S]*74°C／165°F[\s\S]*每次續烤 2 分鐘/,
    ja: /12〜15分[\s\S]*最も厚いものを数個[\s\S]*74°C（165°F）[\s\S]*2分ずつ追加/,
    ko: /12–15분[\s\S]*가장 두꺼운 조각 몇 개[\s\S]*74°C \(165°F\)[\s\S]*2분씩 더/,
    th: /12–15 นาที[\s\S]*ชิ้นหนาหลายชิ้น[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 2 นาที/
  }, "thick chicken pieces reach the poultry safety endpoint");
  matchesEveryLocale(step(recipe, "Rest briefly and finish"), {
    en: /six bowls[\s\S]*800 g raw chicken[\s\S]*about 133 g per serving/,
    "zh-hant": /六碗[\s\S]*800 公克生雞肉[\s\S]*每份烹煮前約 133 公克/,
    ja: /6皿[\s\S]*生の鶏肉800g[\s\S]*1人分約133g/,
    ko: /여섯 그릇[\s\S]*생닭 800g[\s\S]*1인분 약 133g/,
    th: /6 ชาม[\s\S]*ไก่ดิบ 800 กรัม[\s\S]*ประมาณ 133 กรัมต่อที่/
  }, "six bowls receive an equal raw-chicken share");
});

test("pad kra pao allocates the oil, cooks ground pork safely, and gives an egg doneness choice", () => {
  const recipe = get("pad-kra-pao");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 20, 40]);
  assertSourceSeparation(recipe, [foodSafety, eggSafety]);
  assert.deepEqual(recipe.instructions.map((entry) => entry.title.en), [
    "Mix the sauce and pound aromatics", "Fry crisp-edged eggs", "Sear the pork",
    "Bloom garlic and chile", "Reduce the savoury sauce", "Wilt basil and serve"
  ], "the reviewed step order stays aligned with the existing illustration sequence");

  const oil = recipe.ingredients.find((row) => row.item.en.startsWith("neutral high-heat oil"));
  assert.equal(oil?.amount, "60 ml");
  for (const locale of localeOrder) {
    assert.match(oil.item[locale], /20/);
    assert.match(oil.item[locale], /40/);
  }
  matchesEveryLocale(step(recipe, "Fry crisp-edged eggs"), {
    en: /40 ml oil[\s\S]*four eggs[\s\S]*fully set[\s\S]*edges are crisp[\s\S]*yolk is firm[\s\S]*pasteurized eggs/,
    "zh-hant": /40 毫升油[\s\S]*四顆蛋[\s\S]*蛋白凝固[\s\S]*邊緣酥脆[\s\S]*蛋黃凝固[\s\S]*巴氏殺菌蛋/,
    ja: /油40ml[\s\S]*卵4個[\s\S]*白身が固まり[\s\S]*縁がカリッ[\s\S]*黄身が固まる[\s\S]*殺菌済み卵/,
    ko: /기름 40ml[\s\S]*달걀 네 개[\s\S]*흰자가 익고[\s\S]*가장자리가 바삭[\s\S]*노른자가 단단[\s\S]*살균란/,
    th: /น้ำมัน 40 มล\.[\s\S]*ไข่ 4 ฟอง[\s\S]*ไข่ขาวจนสุก[\s\S]*ขอบกรอบ[\s\S]*ไข่แดงแข็ง[\s\S]*ไข่พาสเจอร์ไรส์/
  }, "egg whites set, yolk choice, and the 40 ml egg share are clear");
  matchesEveryLocale(step(recipe, "Sear the pork"), {
    en: /20 ml oil[\s\S]*500 g pork[\s\S]*two 250 g batches[\s\S]*71°C \(160°F\)[\s\S]*continue cooking and recheck/,
    "zh-hant": /20 毫升油[\s\S]*500 公克豬絞肉[\s\S]*每批 250 公克[\s\S]*71°C／160°F[\s\S]*續炒後再測/,
    ja: /油20ml[\s\S]*豚ひき肉500g[\s\S]*250gずつ2回[\s\S]*71°C（160°F）[\s\S]*加熱を続けて再確認/,
    ko: /기름 20ml[\s\S]*돼지고기 500g[\s\S]*250g씩 두 번[\s\S]*71°C \(160°F\)[\s\S]*더 익힌 뒤 다시 잽니다/,
    th: /น้ำมัน 20 มล\.[\s\S]*หมู 500 กรัม[\s\S]*สองรอบ รอบละ 250 กรัม[\s\S]*71°C \(160°F\)[\s\S]*ปรุงต่อและตรวจซ้ำ/
  }, "pork is browned in workable batches and rechecked at the ground-meat endpoint");
  matchesEveryLocale(step(recipe, "Wilt basil and serve"), {
    en: /35 g holy basil[\s\S]*600 g hot cooked rice[\s\S]*four plates \(150 g each\)[\s\S]*one egg[\s\S]*125 g raw pork/,
    "zh-hant": /35 公克打拋葉[\s\S]*600 公克熱熟飯[\s\S]*四盤（每盤 150 公克）[\s\S]*一顆蛋[\s\S]*125 公克生豬肉/,
    ja: /ホーリーバジル35g[\s\S]*温かいご飯600g[\s\S]*4皿に150gずつ[\s\S]*卵1個[\s\S]*約125g/,
    ko: /홀리 바질 35g[\s\S]*밥 600g[\s\S]*네 접시에 150g씩[\s\S]*달걀 한 개[\s\S]*약 125g/,
    th: /ใบกะเพรา 35 กรัม[\s\S]*ข้าวสุก 600 กรัม[\s\S]*4 จาน จานละ 150 กรัม[\s\S]*ไข่หนึ่งฟอง[\s\S]*ประมาณ 125 กรัม/
  }, "each plate receives a measured rice, egg, and raw-pork share");
});

test("gambas al ajillo chills the prawns, sequences garlic oil first, and stops at visual doneness", () => {
  const recipe = get("gambas-al-ajillo");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [10, 8, 18]);
  assertSourceSeparation(recipe, [seafoodSafety]);
  assert.deepEqual(recipe.instructions.map((entry) => entry.title.en), [
    "Dry and season the prawns", "Infuse the garlic and chilli oil", "Cook the prawns briefly", "Finish and serve sizzling"
  ]);

  matchesEveryLocale(step(recipe, "Cook the prawns briefly"), {
    en: /60–90 seconds[\s\S]*thickest prawns are firm, pearly and opaque throughout[\s\S]*no grey translucent centre[\s\S]*visual endpoint/,
    "zh-hant": /60–90 秒[\s\S]*最厚的蝦肉緊實、呈珍珠白且全身不透明[\s\S]*沒有灰色半透明中心[\s\S]*外觀熟度/,
    ja: /60〜90秒[\s\S]*身が締まり、真珠色で全体が不透明[\s\S]*灰色の半透明な中心[\s\S]*この状態/,
    ko: /60–90초[\s\S]*가장 두꺼운 새우가 단단하고 진주빛이며 속까지 불투명[\s\S]*회색 반투명한 중심[\s\S]*이 상태/,
    th: /60–90 วินาที[\s\S]*กุ้งส่วนหนาสุดแน่น สีมุก และทึบทั่ว[\s\S]*แกนสีเทาโปร่งแสง[\s\S]*เมื่อถึงสภาพนี้/
  }, "shrimp use FDA visual cues without an unrelated numeric temperature");
  const shrimp = step(recipe, "Cook the prawns briefly");
  for (const locale of localeOrder) {
    assert.doesNotMatch(shrimp.body[locale], /\d+\s*°\s*[CF]|\d+\s*℃|\d+\s*℉/, `${locale}: no fixed shrimp temperature is imposed`);
  }
  matchesEveryLocale(step(recipe, "Finish and serve sizzling"), {
    en: /200 g rustic bread[\s\S]*four portions[\s\S]*125 g raw prawns, 40 ml olive oil and 50 g bread/,
    "zh-hant": /200 公克鄉村麵包[\s\S]*四份[\s\S]*125 公克生蝦、40 毫升橄欖油和 50 公克麵包/,
    ja: /田舎パン200g[\s\S]*4人分[\s\S]*えび約125g、オリーブ油40ml、パン50g/,
    ko: /시골빵 200g[\s\S]*네 몫[\s\S]*생새우 약 125g, 올리브유 40ml, 빵 50g/,
    th: /ขนมปังชนบท 200 กรัม[\s\S]*4 ที่[\s\S]*กุ้งดิบประมาณ 125 กรัม น้ำมันมะกอก 40 มล\. และขนมปัง 50 กรัม/
  }, "the pan's ingredients are divided into four measured servings");
});

test("picanha observes the whole-cut beef rest, sets the farofa eggs, and portions four plates", () => {
  const recipe = get("churrasco-picanha");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 35, 55]);
  assertSourceSeparation(recipe, [foodSafety, eggSafety]);
  assert.deepEqual(recipe.instructions.map((entry) => entry.title.en), [
    "Prepare the grill and beef", "Render the fat cap", "Grill the meat", "Rest the beef",
    "Make the egg farofa", "Finish the fresh relish", "Slice and serve"
  ]);

  matchesEveryLocale(step(recipe, "Prepare the grill and beef"), {
    en: /While it heats[\s\S]*150 g tomatoes, 80 g red onion, 30 ml red wine vinegar and 15 g parsley[\s\S]*separate clean bowl[\s\S]*at least 5 minutes while the beef cooks[\s\S]*raw-beef board and utensils separate from the relish/,
    "zh-hant": /等待時[\s\S]*乾淨的另一個碗[\s\S]*150 公克番茄、80 公克紅洋蔥、30 毫升紅酒醋與 15 公克巴西里[\s\S]*至少靜置 5 分鐘[\s\S]*生牛肉用的砧板與器具/,
    ja: /予熱中に[\s\S]*トマト150g、赤玉ねぎ80g、赤ワインビネガー30ml、パセリ15g[\s\S]*清潔な別のボウル[\s\S]*少なくとも5分[\s\S]*生肉用のまな板/,
    ko: /예열하는 동안[\s\S]*깨끗한 별도 그릇[\s\S]*토마토 150g, 적양파 80g, 레드와인 식초 30ml와 파슬리 15g[\s\S]*최소 5분[\s\S]*생고기용 도마와 도구/,
    th: /ระหว่างเตาร้อน[\s\S]*มะเขือเทศ 150 กรัม หอมแดง 80 กรัม น้ำส้มสายชูไวน์แดง 30 มล\.[\s\S]*ชามสะอาดแยกไว้[\s\S]*อย่างน้อย 5 นาที[\s\S]*แยกเขียงและอุปกรณ์เนื้อดิบ/
  }, "the relish rests while beef cooks and stays clear of raw-beef tools");
  matchesEveryLocale(step(recipe, "Finish the fresh relish"), {
    en: /prepared during grill preheating[\s\S]*clean bowl and serving spoon[\s\S]*separate from the raw-beef/,
    "zh-hant": /預熱時拌好的番茄佐料[\s\S]*乾淨的碗與上菜湯匙[\s\S]*和生牛肉砧板、器具分開/,
    ja: /予熱中に作った薬味[\s\S]*清潔なボウルと取り分け用スプーン[\s\S]*生肉用のまな板や器具とは分け/,
    ko: /예열하며 준비한 렐리시[\s\S]*깨끗한 그릇과 서빙용 숟가락[\s\S]*생고기용 도마 및 도구와 분리/,
    th: /เตรียมไว้ระหว่างอุ่นเตา[\s\S]*ชามและช้อนเสิร์ฟสะอาด[\s\S]*แยกจากเขียงและอุปกรณ์เนื้อดิบ/
  }, "the ready relish is finished with clean serving tools");

  matchesEveryLocale(step(recipe, "Grill the meat"), {
    en: /thickest centre[\s\S]*63°C \(145°F\)[\s\S]*2-minute increments[\s\S]*time is a guide/,
    "zh-hant": /最厚處中心[\s\S]*63°C／145°F[\s\S]*每次續烤 2 分鐘[\s\S]*時間僅供參考/,
    ja: /最も厚い部分の中心[\s\S]*63°C（145°F）[\s\S]*2分ずつ追加[\s\S]*時間は目安/,
    ko: /가장 두꺼운 중심[\s\S]*63°C \(145°F\)[\s\S]*2분씩 더[\s\S]*시간은 참고용/,
    th: /ส่วนที่หนาที่สุด[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 2 นาที[\s\S]*เวลาเป็นเพียงแนวทาง/
  }, "whole-cut beef uses its applicable minimum temperature and additional checks");
  matchesEveryLocale(step(recipe, "Rest the beef"), {
    en: /rest for 10 minutes[\s\S]*minimum 3-minute rest[\s\S]*Make the egg farofa during this rest/,
    "zh-hant": /靜置 10 分鐘[\s\S]*至少 3 分鐘的靜置[\s\S]*趁靜置時製作蛋 farofa/,
    ja: /10分休ませます[\s\S]*最低3分間[\s\S]*この間に卵ファロファ/,
    ko: /10분 쉽니다[\s\S]*최소 3분 휴지[\s\S]*쉬는 동안 달걀 파로파/,
    th: /พัก 10 นาที[\s\S]*อย่างน้อย 3 นาที[\s\S]*ทำฟาโรฟาไข่ระหว่างพัก/
  }, "the full rest includes the official minimum and overlaps side preparation");
  matchesEveryLocale(step(recipe, "Make the egg farofa"), {
    en: /60 g butter[\s\S]*180 g onion[\s\S]*2 eggs[\s\S]*completely set with no liquid egg[\s\S]*180 g toasted cassava flour/,
    "zh-hant": /60 公克奶油[\s\S]*180 公克洋蔥[\s\S]*2 顆蛋[\s\S]*沒有液態蛋[\s\S]*180 公克烤過的木薯粉/,
    ja: /バター60g[\s\S]*玉ねぎ180g[\s\S]*卵2個[\s\S]*液状部分がなく完全に固まる[\s\S]*キャッサバ粉180g/,
    ko: /버터 60g[\s\S]*양파 180g[\s\S]*달걀 2개[\s\S]*액체가 남지 않고 완전히 익을[\s\S]*카사바 가루 180g/,
    th: /เนย 60 กรัม[\s\S]*หอม 180 กรัม[\s\S]*ไข่ 2 ฟอง[\s\S]*สุกแข็งไม่มีไข่เหลว[\s\S]*แป้งมันสำปะหลังคั่ว 180 กรัม/
  }, "the egg and cassava flour amounts are measured and the egg is fully set");
  matchesEveryLocale(step(recipe, "Slice and serve"), {
    en: /four equal portions[\s\S]*225 g raw-beef equivalent[\s\S]*150 g cooked white rice[\s\S]*one quarter/,
    "zh-hant": /四等份[\s\S]*225 公克生牛肉[\s\S]*150 公克熟白飯[\s\S]*四分之一份/,
    ja: /4等分[\s\S]*加熱前で約225g[\s\S]*炊いた白ご飯150g[\s\S]*4分の1ずつ/,
    ko: /네 등분[\s\S]*조리 전 기준 약 225g[\s\S]*지은 흰밥 150g[\s\S]*각각 4분의 1씩/,
    th: /4 ส่วนเท่ากัน[\s\S]*ก่อนปรุงประมาณ 225 กรัม[\s\S]*ข้าวขาวสุก 150 กรัม[\s\S]*อย่างละหนึ่งในสี่ส่วน/
  }, "each plate receives equal shares of beef, rice, farofa, and relish");
});
