import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["sundubu-jjigae", "com-tam-suon-nuong", "canh-chua-ca", "salade-nicoise"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: recipe exists`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} step exists`);
  return found;
}

function everyLocale(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function official(recipe, expectedUrls) {
  for (const url of expectedUrls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: applicable official guidance is credited separately: ${url}`);
  }
}

test("fifty-sixth batch adds four eligible IDs to the shared five-locale ledger without changing coverage history", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \(([\s\S]*?)\n\];/)?.[1]
    ?? source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusions = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusions, "standing 18-slug exclusion list exists");
  const excludedIds = [...exclusions.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 280);
  assert.equal(new Set(covered).size, 280);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.slice(0, -60).length, 220);
  assert.deepEqual(covered.slice(-60, -56), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.ok(ids.every((id) => !covered.slice(0, -60).includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 55);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft remains present`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    assert.deepEqual(recipe.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: existing step illustrations remain on their original steps`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient details are localized`);
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: full method is localized`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: storage card is localized`);
    }
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: published method refinement does not mutate the draft`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: published storage card does not mutate the draft`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: official sources do not mutate the draft`);
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: two dish references remain separate from official guidance`);
  }
});

test("sundubu-jjigae uses the ground-pork endpoint, pasteurized soft eggs, and distinct leftover reheating", () => {
  const recipe = get("sundubu-jjigae");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [20, 27, 47, 2]);
  assert.equal(recipe.instructions.length, 8);
  const pork = step(recipe, "Cook the ground pork to its own endpoint");
  everyLocale(pork.body, {
    en: /150 g ground pork[\s\S]*4–5 minutes[\s\S]*71°C \(160°F\)[\s\S]*not the safety check/,
    "zh-hant": /150 公克豬絞肉[\s\S]*4–5 分鐘[\s\S]*71°C（160°F）[\s\S]*不是安全檢查/,
    ja: /豚ひき肉150g[\s\S]*4〜5分[\s\S]*71°C（160°F）[\s\S]*安全とは判断せず/,
    ko: /다진 돼지고기 150g[\s\S]*4–5분[\s\S]*71°C \(160°F\)[\s\S]*안전[\s\S]*판단하지 말고/,
    th: /หมูบด 150 กรัม[\s\S]*4–5 นาที[\s\S]*71°C \(160°F\)[\s\S]*ไม่ใช่การยืนยันความปลอดภัย/
  }, "ground pork time estimate and applicable endpoint are distinct");
  const egg = step(recipe, "Set the eggs safely");
  everyLocale(egg.body, {
    en: /2 pasteurized eggs[\s\S]*about 3 minutes[\s\S]*texture guide[\s\S]*unpasteurized shell eggs[\s\S]*both whites and yolks are firm/,
    "zh-hant": /2 顆巴氏殺菌蛋[\s\S]*約 3 分鐘[\s\S]*口感估時[\s\S]*未殺菌帶殼蛋[\s\S]*蛋白與蛋黃都凝固/,
    ja: /低温殺菌済み卵2個[\s\S]*約3分[\s\S]*食感の目安[\s\S]*未殺菌殻付き卵[\s\S]*白身と黄身がともに固まる/,
    ko: /살균란 2개[\s\S]*약 3분[\s\S]*식감 기준[\s\S]*비살균 껍질 달걀[\s\S]*흰자와 노른자[\s\S]*단단히/,
    th: /ไข่พาสเจอไรซ์ 2 ฟอง[\s\S]*ประมาณ 3 นาที[\s\S]*เกณฑ์ด้านเนื้อสัมผัส[\s\S]*ไม่พาสเจอไรซ์[\s\S]*ไข่ขาวและไข่แดงแข็งตัว/
  }, "soft yolks are reserved for pasteurized eggs");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "leftover storage and reheating guidance");
  official(recipe, [urls.temperatures, urls.eggs, urls.handling, urls.storage]);
});

test("broken-rice pork chops allocate all components and distinguish rice from pork storage rules", () => {
  const recipe = get("com-tam-suon-nuong");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [200, 45, 245, 4]);
  assert.equal(recipe.instructions.length, 8);
  const pork = step(recipe, "Grill to the whole-cut pork endpoint");
  everyLocale(pork.body, {
    en: /3–4 minutes per side[\s\S]*intact pork chops rather than ground pork[\s\S]*63°C \(145°F\)[\s\S]*rest for 3 minutes/,
    "zh-hant": /每面估烤 3–4 分鐘[\s\S]*完整豬排而非絞肉[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘/,
    ja: /片面あたり目安3〜4分[\s\S]*挽き肉ではなく塊の豚肉[\s\S]*63°C（145°F）[\s\S]*3分休ませ/,
    ko: /한 면당 약 3–4분[\s\S]*다짐육이 아니라 통돼지고기[\s\S]*63°C \(145°F\)[\s\S]*3분/,
    th: /ด้านละประมาณ 3–4 นาที[\s\S]*ไม่บด[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที/
  }, "whole-cut pork endpoint and estimate are distinct");
  const rice = step(recipe, "Cook the broken rice");
  everyLocale(rice.body, {
    en: /300 g broken jasmine rice[\s\S]*400 ml[\s\S]*reserve the other 120 ml[\s\S]*15 minutes[\s\S]*10 minutes/,
    "zh-hant": /300 公克碎茉莉香米[\s\S]*400 毫升[\s\S]*另 120 毫升留給沾醬[\s\S]*15 分鐘[\s\S]*10 分鐘/,
    ja: /砕いたジャスミン米300g[\s\S]*400ml[\s\S]*残り120mlはたれ用[\s\S]*15分[\s\S]*10分/,
    ko: /깨진 재스민쌀 300g[\s\S]*400ml[\s\S]*나머지 120ml는 소스용[\s\S]*15분[\s\S]*10분/,
    th: /ข้าวหอมมะลิหัก 300 กรัม[\s\S]*400 มล.[\s\S]*เก็บอีก 120 มล.[\s\S]*15 นาที[\s\S]*10 นาที/
  }, "measured rice and dipping-sauce water allocations");
  everyLocale(recipe.storage, {
    en: /rice[\s\S]*within 1 hour[\s\S]*24 hours[\s\S]*only once[\s\S]*steaming hot[\s\S]*pork[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /米飯[\s\S]*1 小時內[\s\S]*24 小時內[\s\S]*只復熱一次[\s\S]*豬排[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /ご飯[\s\S]*1時間以内[\s\S]*24時間以内[\s\S]*一度だけ[\s\S]*豚肉[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /밥[\s\S]*1시간 안에[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*돼지고기[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /ข้าว[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*หมูสุก[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "rice-specific cooling and pork leftover guidance");
  official(recipe, [urls.temperatures, urls.handling, urls.storage, urls.rice]);
});

test("canh chua fish reaches the fish endpoint before vegetables and separates quality from safe storage", () => {
  const recipe = get("canh-chua-ca");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [20, 30, 50, 4]);
  assert.equal(recipe.instructions.length, 6);
  const fish = step(recipe, "Build the broth and cook the fish to its endpoint");
  everyLocale(fish.body, {
    en: /1\.3 L water[\s\S]*200 g pineapple[\s\S]*35 ml fish sauce[\s\S]*25 g sugar[\s\S]*4–6 minutes[\s\S]*catfish and basa must reach 63°C \(145°F\)[\s\S]*Time is an estimate, not the fish endpoint/,
    "zh-hant": /1\.3 公升水[\s\S]*200 公克鳳梨[\s\S]*35 毫升魚露[\s\S]*25 公克糖[\s\S]*4–6 分鐘[\s\S]*鯰魚或巴沙魚須達 63°C（145°F）[\s\S]*時間是估值，不是魚肉熟度標準/,
    ja: /水1\.3L[\s\S]*パイナップル200g[\s\S]*魚醤35ml[\s\S]*砂糖25g[\s\S]*4〜6分[\s\S]*63°C（145°F）[\s\S]*時間は目安で、魚の加熱基準ではありません/,
    ko: /물 1\.3L[\s\S]*파인애플 200g[\s\S]*피시소스 35ml[\s\S]*설탕 25g[\s\S]*4–6분[\s\S]*63°C \(145°F\)[\s\S]*시간은 추정치이지 생선 익힘 기준이 아닙니다/,
    th: /น้ำที่เหลือ 1\.3 ลิตร[\s\S]*สับปะรด 200 กรัม[\s\S]*น้ำปลา 35 มล.[\s\S]*น้ำตาล 25 กรัม[\s\S]*4–6 นาที[\s\S]*63°C \(145°F\)[\s\S]*เวลาเป็นค่าประมาณ ไม่ใช่เกณฑ์ความสุกของปลา/
  }, "fish doneness and estimate are distinct");
  everyLocale(step(recipe, "Simmer the vegetables, then return the fish").body, {
    en: /250 g tomato[\s\S]*150 g okra[\s\S]*100 g blanched edible stems[\s\S]*final 2 minutes[\s\S]*last 30 seconds/,
    "zh-hant": /250 公克番茄瓣[\s\S]*150 公克秋葵[\s\S]*100 公克汆燙芋莖[\s\S]*最後 2 分鐘[\s\S]*最後 30 秒/,
    ja: /トマト250g[\s\S]*オクラ150g[\s\S]*茎100g[\s\S]*最後の2分[\s\S]*最後の30秒/,
    ko: /토마토 웨지 250g[\s\S]*오크라 150g[\s\S]*줄기 100g[\s\S]*마지막 2분[\s\S]*마지막 30초/,
    th: /มะเขือเทศหั่นเสี้ยว 250 กรัม[\s\S]*กระเจี๊ยบ 150 กรัม[\s\S]*ก้านที่ลวกสะเด็ดน้ำ 100 กรัม[\s\S]*2 นาทีสุดท้าย[\s\S]*30 วินาทีสุดท้าย/
  }, "fish is kept whole and not simmered through the vegetable stage");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days for safety[\s\S]*within 2 days[\s\S]*quality preference rather than a safety cutoff[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*2 天內[\s\S]*品質偏好而非安全期限[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*2日以内[\s\S]*品質上の好みで安全期限ではありません[\s\S]*74°C（165°F）/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*2일 안[\s\S]*품질 선호이며 안전 기한은 아닙니다[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*ภายใน 2 วัน[\s\S]*ความชอบด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัย[\s\S]*74°C \(165°F\)/
  }, "fish-specific safety window and quality preference are distinct");
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("salade niçoise cooks eggs firm and allocates all four plates without adding a temperature that does not apply", () => {
  const recipe = get("salade-nicoise");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [25, 15, 40, 4]);
  assert.equal(recipe.instructions.length, 6);
  const eggs = step(recipe, "Cook the eggs until both yolks are firm");
  everyLocale(eggs.body, {
    en: /4 refrigerated, uncracked large eggs[\s\S]*1 L cold water[\s\S]*about 10 minutes[\s\S]*both white and yolk must be firm[\s\S]*time is an estimate[\s\S]*5 minutes/,
    "zh-hant": /4 顆冷藏、無裂痕的大雞蛋[\s\S]*1 公升冷水[\s\S]*約 10 分鐘[\s\S]*蛋白與蛋黃都須凝固[\s\S]*時間是估值[\s\S]*5 分鐘/,
    ja: /殻にひびのない大きめの卵4個[\s\S]*冷水1L[\s\S]*約10分[\s\S]*白身と黄身の両方が固まって[\s\S]*時間は目安[\s\S]*5分/,
    ko: /껍질이 깨지지 않은 큰 달걀 4개[\s\S]*찬물 1L[\s\S]*약 10분[\s\S]*흰자와 노른자가 모두 단단히 익었는지[\s\S]*시간은 추정치[\s\S]*5분/,
    th: /ไข่ฟองใหญ่ 4 ฟอง[\s\S]*น้ำเย็นที่ตวงไว้ 1 ลิตร[\s\S]*ประมาณ 10 นาที[\s\S]*ไข่ขาวและไข่แดงแข็งทั่ว[\s\S]*เวลานี้เป็นค่าประมาณ[\s\S]*5 นาที/
  }, "egg firmness is the endpoint; time is only an estimate");
  const dressing = step(recipe, "Whisk the lemon-mustard dressing");
  everyLocale(dressing.body, {
    en: /20 ml lemon juice[\s\S]*5 g Dijon mustard[\s\S]*3 g finely grated garlic[\s\S]*0\.5 g black pepper[\s\S]*60 ml olive oil[\s\S]*up to the listed 1 g salt/,
    "zh-hant": /20 毫升檸檬汁[\s\S]*5 公克第戎芥末[\s\S]*3 公克細磨蒜[\s\S]*0\.5 公克黑胡椒[\s\S]*60 毫升橄欖油[\s\S]*最多 1 公克鹽/,
    ja: /レモン汁20ml[\s\S]*マスタード5g[\s\S]*にんにく3g[\s\S]*黒こしょう0\.5g[\s\S]*オリーブ油60ml[\s\S]*塩を最大1g/,
    ko: /레몬즙 20ml[\s\S]*머스터드 5g[\s\S]*마늘 3g[\s\S]*후추 0\.5g[\s\S]*올리브유 60ml[\s\S]*소금을 최대 1g/,
    th: /น้ำเลมอน 20 มล.[\s\S]*มัสตาร์ดดิฌง 5 กรัม[\s\S]*กระเทียมขูด 3 กรัม[\s\S]*พริกไทยดำ 0\.5 กรัม[\s\S]*น้ำมันมะกอก 60 มล.[\s\S]*เกลือได้ไม่เกิน 1 กรัม/
  }, "all dressing ingredients are allocated");
  everyLocale(step(recipe, "Add the fish and eggs just before serving").body, {
    en: /60 g tuna[\s\S]*12\.5 g anchovies[\s\S]*37\.5 g artichoke hearts[\s\S]*20 g olives[\s\S]*one quartered hard-cooked egg[\s\S]*2 g torn basil[\s\S]*21 ml dressing/,
    "zh-hant": /60 公克鮪魚[\s\S]*12\.5 公克鯷魚[\s\S]*37\.5 公克洋薊心[\s\S]*20 公克橄欖[\s\S]*一顆切四瓣的全熟蛋[\s\S]*2 公克撕碎羅勒[\s\S]*21 毫升醬汁/,
    ja: /ツナ60g[\s\S]*約12\.5g[\s\S]*37\.5g[\s\S]*20g[\s\S]*固ゆで卵1個分[\s\S]*2g[\s\S]*約21ml/,
    ko: /참치 60g[\s\S]*약 12\.5g[\s\S]*37\.5g[\s\S]*20g[\s\S]*달걀 한 개 분량[\s\S]*바질 2g씩[\s\S]*드레싱 약 21ml씩/,
    th: /ทูน่า 60 กรัม[\s\S]*แอนโชวีประมาณ 12\.5 กรัม[\s\S]*อาร์ติโชก 37\.5 กรัม[\s\S]*มะกอก 20 กรัม[\s\S]*ไข่ต้มสุกหั่นสี่ส่วนหนึ่งฟอง[\s\S]*โหระพาฉีก 2 กรัม[\s\S]*ประมาณ 21 มล./
  }, "topping portions are divided across four plates");
  const methods = recipe.instructions.map((entry) => entry.body.en).join(" ");
  assert.equal((methods.match(/37\.5 g artichoke hearts/g) ?? []).length, 1,
    "all artichoke hearts are allocated once across four plates");
  assert.equal((methods.match(/20 g olives/g) ?? []).length, 1,
    "all olives are allocated once across four plates");
  everyLocale(recipe.storage, {
    en: /at or below 4°C \(40°F\)[\s\S]*within 2 hours[\s\S]*3–4 days[\s\S]*same day[\s\S]*quality preference, not a safety cutoff/,
    "zh-hant": /4°C（40°F）以下[\s\S]*2 小時內[\s\S]*3–4 天[\s\S]*當天[\s\S]*品質偏好，不是安全期限/,
    ja: /4°C（40°F）以下[\s\S]*2時間以内[\s\S]*3〜4日[\s\S]*当日[\s\S]*品質上の好みで安全期限ではありません/,
    ko: /4°C \(40°F\) 이하[\s\S]*2시간 안에[\s\S]*3–4일[\s\S]*당일[\s\S]*품질 선호이며 안전 기한은 아님/,
    th: /ไม่เกิน 4°C \(40°F\)[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*3–4 วัน[\s\S]*วันเดียวกัน[\s\S]*ความชอบด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัย/
  }, "prepared salad storage limit is separated from texture preference");
  official(recipe, [urls.eggs, urls.handling, urls.storage]);
});
