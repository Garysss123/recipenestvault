import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["green-curry-chicken", "boeuf-bourguignon", "boat-noodles", "takoyaki"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialUrls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, id + ": recipe exists");
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, recipe.id + ": " + title + " step exists");
  return found;
}

function everyLocale(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], locale + ": " + label);
}

function official(recipe, extra = []) {
  for (const url of [officialUrls.temperatures, officialUrls.handling, officialUrls.storage, ...extra]) {
    assert.ok(recipe.sources.some((source) =>
      source.url === url && source.title.startsWith("Official food-safety guidance")),
    recipe.id + ": applicable official guidance is credited separately: " + url);
  }
  assert.ok(recipe.sources.filter((source) =>
    !source.title.startsWith("Official food-safety guidance")).length >= 2,
  recipe.id + ": two culinary references remain separate from official guidance");
}

test("fifty-ninth batch adds four unchecked eligible slugs and preserves each illustration-step mapping", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusions = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusions, "standing exclusion list exists");
  const excluded = [...exclusions.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 268);
  assert.equal(new Set(covered).size, 268);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.deepEqual(covered.slice(-36, -32), ids);
  assert.ok(ids.every((id) => !excluded.includes(id)), "selected recipes are not in the old-patch exclusion set");
  assert.equal(recipes.length - excluded.length - covered.length, 67);
  const previous = new Set(covered.slice(0, -36));
  assert.ok(ids.every((id) => !previous.has(id)), "selected slugs were not in the prior 232-ID ledger");

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, id + ": source draft exists");
    assert.equal(recipe.instructions.length, draft.instructions.length, id + ": method length is unchanged");
    assert.deepEqual(recipe.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      id + ": publication edits do not move draft scene mappings");
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, recipe.instructions.length, id + ": one existing illustration remains assigned to every step");
    assert.deepEqual(illustrations.map((entry) => entry.step),
      recipe.instructions.map((_, index) => index + 1), id + ": illustration step numbers still follow method order");
    assert.ok(illustrations.every((entry) => entry.setComplete && entry.visualMatchApproved && entry.nonPhotographic),
      id + ": approved non-photographic illustration metadata is preserved");
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), id + "/" + locale + ": localized ingredient amounts and names exist");
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), id + "/" + locale + ": complete localized method exists");
      assert.ok(recipe.storage[locale], id + "/" + locale + ": localized storage guidance exists");
    }
    assert.notDeepEqual(recipe.instructions, draft.instructions, id + ": publication changes do not mutate the draft instructions");
    assert.notDeepEqual(recipe.storage, draft.storage, id + ": publication changes do not mutate draft storage");
    assert.notDeepEqual(recipe.sources, draft.sources, id + ": official sources do not mutate the draft");
  }
});

test("green curry allocates the measured ingredients and distinguishes chicken safety from quality timing", () => {
  const recipe = get("green-curry-chicken");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 35, 60]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("full-fat coconut milk"))?.amount, "400 ml");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("Thai green curry paste"))?.amount, "70 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fish sauce"))?.amount, "30 ml");
  const broth = step(recipe, "Build the coconut broth");
  const chicken = step(recipe, "Cook chicken safely");
  const vegetables = step(recipe, "Set eggplant and bamboo");
  const finish = step(recipe, "Balance and add basil");
  const serve = step(recipe, "Serve with rice or roti");

  everyLocale(broth.body, {
    en: /remaining 280 ml coconut milk[\s\S]*250 ml chicken stock[\s\S]*all 30 ml fish sauce[\s\S]*four torn makrut lime leaves[\s\S]*small bubbles return/,
    "zh-hant": /其餘 280 毫升椰奶[\s\S]*250 毫升雞高湯[\s\S]*全部 30 毫升魚露[\s\S]*四片撕開[\s\S]*小滾/,
    ja: /残りのココナッツミルク280ml[\s\S]*鶏スープ250ml[\s\S]*ナンプラー30ml全量[\s\S]*こぶみかんの葉4枚[\s\S]*小さな泡が戻って/,
    ko: /남은 코코넛밀크 280ml[\s\S]*닭 육수 250ml[\s\S]*피시소스 30ml 전량[\s\S]*라임 잎 4장[\s\S]*기포가 다시 생긴/,
    th: /กะทิที่เหลือ 280 มล.[\s\S]*น้ำสต๊อกไก่ 250 มล.[\s\S]*น้ำปลา 30 มล.[\s\S]*ใบมะกรูดฉีก 4 ใบ[\s\S]*ฟองเล็ก ๆ กลับมา/
  }, "measured sauce amounts and timer cue");
  everyLocale(chicken.body, {
    en: /about 8 minutes[\s\S]*74°C \(165°F\)[\s\S]*2-minute intervals[\s\S]*not the safety endpoint/,
    "zh-hant": /約 8 分鐘[\s\S]*74°C（165°F）[\s\S]*每 2 分鐘複測[\s\S]*安全標準以溫度為準/,
    ja: /約8分[\s\S]*74°C（165°F）[\s\S]*2分ごとに再測定[\s\S]*安全基準は温度/,
    ko: /약 8분[\s\S]*74°C \(165°F\)[\s\S]*2분 간격[\s\S]*안전 기준은 온도/,
    th: /ประมาณ 8 นาที[\s\S]*74°C \(165°F\)[\s\S]*ทุก 2 นาที[\s\S]*เกณฑ์ความปลอดภัยคืออุณหภูมิ/
  }, "poultry temperature rather than a fixed time");
  everyLocale(vegetables.body, {
    en: /Only after the chicken passes its 74°C check[\s\S]*250 g eggplants[\s\S]*150 g bamboo shoots[\s\S]*7–9 minutes/,
    "zh-hant": /雞肉確認達 74°C 後[\s\S]*250 公克茄子[\s\S]*150 公克竹筍[\s\S]*7–9 分鐘/,
    ja: /鶏肉が74°Cに達したことを確認してから[\s\S]*なす250g[\s\S]*たけのこ150g[\s\S]*7〜9分/,
    ko: /닭고기가 74°C에 도달한 것을 확인한 다음[\s\S]*가지 250g[\s\S]*죽순 150g[\s\S]*7–9분/,
    th: /ยืนยันว่าไก่ถึง 74°C แล้ว[\s\S]*มะเขือ 250 กรัม[\s\S]*หน่อไม้ 150 กรัม[\s\S]*7–9 นาที/
  }, "vegetables enter after chicken passes safety check");
  everyLocale(finish.body, {
    en: /up to the optional extra 10 ml fish sauce[\s\S]*all 40 g Thai basil[\s\S]*remaining two lime leaves[\s\S]*2 minutes/,
    "zh-hant": /最多 10 毫升額外魚露[\s\S]*全部 40 公克泰國羅勒[\s\S]*剩下兩片萊姆葉[\s\S]*2 分鐘/,
    ja: /追加のナンプラーを最大10ml[\s\S]*タイバジル40g全量[\s\S]*残りのこぶみかんの葉2枚[\s\S]*2分/,
    ko: /추가 피시소스를 최대 10ml[\s\S]*타이 바질 40g 전량[\s\S]*남은 라임 잎 2장[\s\S]*2분/,
    th: /น้ำปลาเพิ่มได้ไม่เกิน 10 มล\.[\s\S]*ใบโหระพาไทย 40 กรัมทั้งหมด[\s\S]*ใบมะกรูดที่เหลือ 2 ใบ[\s\S]*2 นาที/
  }, "optional seasoning and divided lime leaves");
  everyLocale(serve.body, {
    en: /whole curry evenly among four bowls[\s\S]*600 g cooked jasmine rice is 150 g per bowl[\s\S]*four listed roti/,
    "zh-hant": /整鍋咖哩平均分成四碗[\s\S]*600 公克熟茉莉香米為每碗 150 公克[\s\S]*四張烤餅/,
    ja: /カレー全量を4つの器に等分[\s\S]*ジャスミンライス600gは1杯150g[\s\S]*ロティ4枚/,
    ko: /카레 전체를 네 그릇[\s\S]*재스민쌀밥 600g은 그릇당 150g[\s\S]*로티 4장/,
    th: /แบ่งแกงทั้งหมดเท่า ๆ กันใน 4 ชาม[\s\S]*ข้าวหอมมะลิสุก 600 กรัมคือชามละ 150 กรัม[\s\S]*โรตี 4 แผ่น/
  }, "four portions");
  assert.ok(recipe.cookMinutes >= 3 + 3 + 4 + 8 + 9 + 2 + 4, "cook estimate covers maximum timed stages and simmer return");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*Store rice separately[\s\S]*3 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*separate from the 74°C poultry check/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*米飯另行保存[\s\S]*3 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*與烹煮雞肉時/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*ご飯は別に保存[\s\S]*3日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*鶏肉の74°C/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*밥은 따로 보관[\s\S]*3일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*닭고기 74°C 확인 기준/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*เก็บข้าวแยกกัน[\s\S]*3 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*เกณฑ์ 74°C ของไก่/
  }, "quality window and reheating are distinct from poultry endpoint");
  official(recipe);
});

test("boeuf bourguignon separates diced-beef texture, parallel stages, and leftover safety", () => {
  const recipe = get("boeuf-bourguignon");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [25, 205, 230, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("beef chuck"))?.amount, "900 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("unsalted butter"))?.amount, "30 g");
  const seasoning = step(recipe, "Dry and season the beef");
  const braise = step(recipe, "Braise gently in the oven");
  const garnish = step(recipe, "Cook the mushroom and onion garnish");
  const tenderness = step(recipe, "Check tenderness and finish the sauce");
  const serve = step(recipe, "Rest and serve with potatoes");

  everyLocale(seasoning.body, {
    en: /900 g beef chuck[\s\S]*3 g[\s\S]*5 g stew salt[\s\S]*2 g pepper[\s\S]*4 cm[\s\S]*not ground meat/,
    "zh-hant": /900 公克牛肩肉[\s\S]*燉肉鹽 5 公克中的 3 公克[\s\S]*黑胡椒 2 公克中的 1 公克[\s\S]*4 公分[\s\S]*不是絞肉/,
    ja: /牛肩肉900g[\s\S]*塩5gのうち3g[\s\S]*こしょう2gのうち1g[\s\S]*4cm角[\s\S]*ひき肉ではありません/,
    ko: /소고기 어깨살 900g[\s\S]*소금 5g 중 3g[\s\S]*후추 2g 중 1g[\s\S]*4cm 덩어리[\s\S]*다짐육이 아니다/,
    th: /เนื้อหัวไหล่วัว 900 กรัม[\s\S]*เกลือสำหรับสตู 3 กรัมจากทั้งหมด 5 กรัม[\s\S]*พริกไทย 1 กรัมจากทั้งหมด 2 กรัม[\s\S]*4 ซม\.[\s\S]*ไม่ใช่เนื้อบด/
  }, "ingredient allocations and cut form");
  everyLocale(braise.body, {
    en: /2–2½ hours[\s\S]*from the gentle simmer[\s\S]*not the 71°C ground-meat rule/,
    "zh-hant": /2–2½ 小時[\s\S]*從小滾恢復後開始計時[\s\S]*不是絞肉 71°C 標準/,
    ja: /2〜2時間半[\s\S]*静かな煮立ちから[\s\S]*ひき肉の71°C基準/,
    ko: /2–2½시간[\s\S]*약하게 다시 끓기 시작한 때부터[\s\S]*다짐육 71°C 기준/,
    th: /2–2½ ชั่วโมง[\s\S]*หลังกลับมาเดือดเบา ๆ[\s\S]*ไม่ใช่เกณฑ์ 71°C ของเนื้อบด/
  }, "braise timer and non-ground meat context");
  everyLocale(garnish.body, {
    en: /15 g butter[\s\S]*150 ml water[\s\S]*160 g pearl onions[\s\S]*remaining 15 g butter[\s\S]*250 g mushrooms[\s\S]*fit inside the covered braise/,
    "zh-hant": /15 公克奶油[\s\S]*150 毫升水[\s\S]*160 公克珍珠洋蔥[\s\S]*剩餘 15 公克奶油[\s\S]*250 公克蘑菇[\s\S]*燉煮期間/,
    ja: /バター15g[\s\S]*水150ml[\s\S]*パールオニオン160g[\s\S]*残りのバター15g[\s\S]*マッシュルーム250g[\s\S]*並行/,
    ko: /버터 15g[\s\S]*물 150ml[\s\S]*펄어니언 160g[\s\S]*남은 버터 15g[\s\S]*버섯 250g[\s\S]*병행/,
    th: /เนย 15 กรัม[\s\S]*น้ำ 150 มล\.[\s\S]*หอมหัวเล็ก 160 กรัม[\s\S]*เนยที่เหลือ 15 กรัม[\s\S]*เห็ด 250 กรัม[\s\S]*ทำระหว่างตุ๋นหม้อหลักได้/
  }, "divided butter and parallel garnish work");
  everyLocale(tenderness.body, {
    en: /fork[\s\S]*texture target, not a thermometer reading[\s\S]*10-minute increments/,
    "zh-hant": /用叉子測牛肉塊[\s\S]*口感目標，不是溫度讀數[\s\S]*每次 10 分鐘/,
    ja: /フォークで牛肉[\s\S]*食感の目安で、温度測定ではありません[\s\S]*10分ずつ/,
    ko: /포크로 소고기[\s\S]*식감 목표이지 온도 측정값이 아니다[\s\S]*10분씩/,
    th: /ใช้ส้อมทดสอบเนื้อ[\s\S]*ไม่ใช่ค่าจากเทอร์โมมิเตอร์[\s\S]*ครั้งละ 10 นาที/
  }, "texture cue and extension path");
  everyLocale(serve.body, {
    en: /four plates[\s\S]*cooked beef weight varies[\s\S]*205-minute cook estimate[\s\S]*counted once/,
    "zh-hant": /四盤[\s\S]*牛肉熟重會變化[\s\S]*205 分鐘烹煮估時[\s\S]*只計一次/,
    ja: /4皿[\s\S]*調理後の牛肉重量は変わる[\s\S]*調理時間205分[\s\S]*一度だけ/,
    ko: /네 접시[\s\S]*익힌 소고기 중량은 달라지므로[\s\S]*조리 시간 205분[\s\S]*한 번만/,
    th: /4 จาน[\s\S]*น้ำหนักเนื้อสุกเปลี่ยนได้[\s\S]*เวลาปรุง 205 นาที[\s\S]*เพียงครั้งเดียว/
  }, "portioning and the estimate's parallel-time convention");
  assert.ok(recipe.cookMinutes >= 6 + 15 + 5 + 1 + 2 + 3 + 150 + 8 + 10 + 5,
    "cook estimate includes the high end of searing, braise, finish, and rest with a return-to-simmer allowance");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*fork-tender cue is for texture/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*口感指標/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*フォークでの柔らかさ/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*식감 기준/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*เกณฑ์เนื้อสัมผัส/
  }, "quality window and reheating endpoint");
  official(recipe);
});

test("boat noodles uses whole-cut and reheating guidance, with broth and all eight bowls reconciled", () => {
  const recipe = get("boat-noodles");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [60, 300, 360, 8]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("fresh medium-width rice noodles"))?.amount, "640 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("bean sprouts"))?.amount, "280 g");
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil for fried garlic"))?.amount, "40 ml");
  const shank = step(recipe, "Remove and chill the tender shank");
  const reduction = step(recipe, "Strain and reduce the dark broth");
  const portions = step(recipe, "Slice beef and stage eight bowls");
  const finish = step(recipe, "Heat beef balls and finish the blood broth");
  const serve = step(recipe, "Build small intense bowls");

  everyLocale(shank.body, {
    en: /63°C \(145°F\)[\s\S]*3-minute rest[\s\S]*tenderness cue, not the safety test[\s\S]*4°C \(40°F\)[\s\S]*within 2 hours[\s\S]*45 minutes in the refrigerator/,
    "zh-hant": /63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*不是安全檢查[\s\S]*2 小時內冷藏至 4°C（40°F）[\s\S]*冷藏約 45 分鐘/,
    ja: /63°C（145°F）[\s\S]*3分休ませます[\s\S]*安全確認ではありません[\s\S]*2時間以内に4°C（40°F）以下[\s\S]*冷蔵庫で約45分/,
    ko: /63°C \(145°F\)[\s\S]*3분 쉰다[\s\S]*안전 확인이 아니다[\s\S]*2시간 안에 4°C \(40°F\) 이하[\s\S]*약 45분/,
    th: /63°C \(145°F\)[\s\S]*พัก 3 นาที[\s\S]*ไม่ใช่การตรวจความปลอดภัย[\s\S]*4°C \(40°F\)[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ประมาณ 45 นาที/
  }, "whole-cut endpoint, separate tenderness cue, and prompt chilling");
  everyLocale(reduction.body, {
    en: /3 L broth[\s\S]*2.6 L[\s\S]*200 ml[\s\S]*remaining 2.4 L[\s\S]*eight 300 ml bowl portions/,
    "zh-hant": /3 公升[\s\S]*2.6 公升[\s\S]*200 毫升[\s\S]*剩下 2.4 公升[\s\S]*八份、每碗 300 毫升/,
    ja: /スープ3L[\s\S]*2.6L[\s\S]*200ml[\s\S]*残り2.4L[\s\S]*8杯分、1杯300ml/,
    ko: /국물 3L[\s\S]*2.6L[\s\S]*200ml[\s\S]*남은 2.4L[\s\S]*8그릇에 300ml씩/,
    th: /น้ำซุป 3 ลิตร[\s\S]*2.6 ลิตร[\s\S]*200 มล\.[\s\S]*เหลือ 2.4 ลิตร[\s\S]*8 ชาม ชามละ 300 มล\./
  }, "broth allocation");
  everyLocale(portions.body, {
    en: /eight bowls[\s\S]*80 g noodles[\s\S]*50 g fully cooked beef balls[\s\S]*50 g morning glory[\s\S]*35 g sprouts/,
    "zh-hant": /八碗[\s\S]*80 公克米粉[\s\S]*50 公克已熟牛肉丸[\s\S]*50 公克空心菜[\s\S]*35 公克豆芽/,
    ja: /8杯に等分[\s\S]*米麺80g[\s\S]*加熱済み牛肉団子50g[\s\S]*空心菜50g[\s\S]*もやし35g/,
    ko: /쌀국수 80g[\s\S]*완전히 익힌 소고기 완자 50g[\s\S]*공심채 50g[\s\S]*숙주 35g[\s\S]*8인분/,
    th: /เส้น 80 กรัม[\s\S]*ลูกชิ้นวัวสุกแล้ว 50 กรัม[\s\S]*ผักบุ้ง 50 กรัม[\s\S]*ถั่วงอก 35 กรัม[\s\S]*8 ส่วน/
  }, "portion allocations match ingredient totals");
  everyLocale(finish.body, {
    en: /fully cooked beef balls[\s\S]*74°C \(165°F\)[\s\S]*71°C \(160°F\)[\s\S]*raw ground beef[\s\S]*whole broth reaches at least 74°C/,
    "zh-hant": /已熟牛肉丸[\s\S]*74°C（165°F）[\s\S]*生絞牛肉[\s\S]*71°C（160°F）[\s\S]*整鍋湯汁至少達 74°C/,
    ja: /加熱済み牛肉団子[\s\S]*74°C（165°F）[\s\S]*生のひき肉[\s\S]*71°C（160°F）[\s\S]*少なくとも74°C/,
    ko: /완전히 익힌 소고기 완자[\s\S]*74°C \(165°F\)[\s\S]*생 다진 소고기[\s\S]*71°C \(160°F\)[\s\S]*최소 74°C/,
    th: /ลูกชิ้นวัวที่สุกแล้ว[\s\S]*74°C \(165°F\)[\s\S]*71°C \(160°F\)[\s\S]*เนื้อบดดิบ[\s\S]*อย่างน้อย 74°C/
  }, "fully cooked meatballs and reheating are distinct from raw ground meat");
  everyLocale(serve.body, {
    en: /eight bowls[\s\S]*50 g hot beef balls[\s\S]*300 ml hot blood-enriched broth[\s\S]*2.4 L total[\s\S]*5 ml garlic oil/,
    "zh-hant": /八碗[\s\S]*50 公克熱牛肉丸[\s\S]*300 毫升加血濃湯[\s\S]*2.4 公升[\s\S]*5 毫升蒜油/,
    ja: /8杯[\s\S]*牛肉団子50g[\s\S]*1杯300ml[\s\S]*計2.4L[\s\S]*1杯5ml/,
    ko: /여덟 그릇[\s\S]*완자 50g[\s\S]*그릇당 300ml[\s\S]*총 2.4L[\s\S]*그릇당 5ml/,
    th: /ลูกชิ้นร้อน 50 กรัม[\s\S]*8 ชาม[\s\S]*ชามละ 300 มล\.[\s\S]*2.4 ลิตร[\s\S]*ชามละ 5 มล\./
  }, "final eight bowl portions");
  assert.equal(recipe.ingredients.reduce((total, row) => total + (row.item.en.startsWith("fresh medium-width rice noodles") ? Number(row.amount.split(" ")[0]) : 0), 0), 640);
  assert.ok(recipe.cookMinutes >= 45 + 10 + 150 + Math.max(45, 30 + 30) + Math.max(5 + 4, 8) + 5,
    "cook estimate covers the critical path while overlapping broth reduction, chilling, and noodle baskets");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*2 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*No cooked rice/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*2 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*不使用熟飯/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*2日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*炊いた米は使いません/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*2일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*밥이 들어가지 않는다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*2 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*ไม่มีข้าวสุก/
  }, "quality preference, food-safe storage window, and leftover reheating");
  official(recipe);
});

test("takoyaki keeps the egg batter cold, applies the egg-dish endpoint, and portions every topping", () => {
  const recipe = get("takoyaki");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [25, 20, 45, 4]);
  assert.equal(recipe.instructions.length, 8);
  const eggs = recipe.ingredients.find((row) => row.item.en === "eggs");
  assert.equal(eggs.amount.en, "2 large / 100 g");
  const batter = step(recipe, "Whisk the batter");
  const pan = step(recipe, "Heat and oil the pan");
  const fill = step(recipe, "Fill the first 12 wells");
  const finish = step(recipe, "Finish the second batch");
  const toppings = step(recipe, "Measure the four toppings");

  everyLocale(batter.body, {
    en: /two eggs \(100 g total\)[\s\S]*10 minutes in the refrigerator[\s\S]*keep it chilled between batches/,
    "zh-hant": /兩顆蛋（共 100 公克）[\s\S]*冷藏靜置 10 分鐘[\s\S]*兩批之間也保持冷藏/,
    ja: /卵2個（計100g）[\s\S]*冷蔵庫で10分[\s\S]*2回目まで冷やして/,
    ko: /달걀 두 개\s*\(총 100g\)[\s\S]*냉장고에서 10분[\s\S]*두 번째 배치까지 차게/,
    th: /ไข่ 2 ฟอง \(รวม 100 กรัม\)[\s\S]*ในตู้เย็น 10 นาที[\s\S]*ระหว่างทำสองรอบ/
  }, "raw egg batter is held cold");
  everyLocale(pan.body, {
    en: /about 200°C[\s\S]*browning and shaping estimate only[\s\S]*30 ml oil[\s\S]*not the egg-doneness check/,
    "zh-hant": /約 200°C[\s\S]*上色與成形的估計值[\s\S]*30 毫升油[\s\S]*不是蛋料理的熟度檢查/,
    ja: /約200°C[\s\S]*焼き色と形作りの目安[\s\S]*油30ml[\s\S]*卵の火通り確認ではありません/,
    ko: /약 200°C[\s\S]*갈변과 모양을 위한 예상치[\s\S]*기름 30ml[\s\S]*달걀 익힘 확인이 아니다/,
    th: /ประมาณ 200°C[\s\S]*ค่าประมาณสำหรับสีและรูปทรง[\s\S]*น้ำมัน 30 มล\.[\s\S]*ไม่ใช่การตรวจความสุกของไข่/
  }, "pan surface estimate is not an internal-safety test");
  everyLocale(fill.body, {
    en: /half the batter, octopus, and 30 g tenkasu[\s\S]*other half covered in the refrigerator[\s\S]*one equal octopus piece per well/,
    "zh-hant": /一半麵糊、章魚與 30 公克天婦羅花[\s\S]*另一半加蓋冷藏[\s\S]*每孔放一塊等份章魚/,
    ja: /生地、たこ、天かすを半量ずつ[\s\S]*残り半分はふたをして冷蔵[\s\S]*各穴に同じ大きさのたこを1個/,
    ko: /반죽, 문어, 덴카스를 절반씩[\s\S]*나머지 절반은 덮어 냉장[\s\S]*구멍마다 같은 크기의 문어 한 조각/,
    th: /แป้ง ปลาหมึก และเทมปุระกรอบ 30 กรัมครึ่งหนึ่ง[\s\S]*อีกครึ่งหนึ่งปิดฝาแช่เย็น[\s\S]*หลุมละชิ้น/
  }, "batch amounts and raw versus cooked staging");
  everyLocale(finish.body, {
    en: /egg dish must reach 71°C \(160°F\)[\s\S]*74°C \(165°F\)[\s\S]*reheating finished leftovers/,
    "zh-hant": /蛋料理須達 71°C（160°F）[\s\S]*74°C（165°F）[\s\S]*復熱成品剩菜/,
    ja: /卵料理は71°C（160°F）[\s\S]*74°C（165°F）[\s\S]*調理済みの残り物を再加熱/,
    ko: /달걀 요리는 71°C \(160°F\)[\s\S]*74°C \(165°F\)[\s\S]*남은 음식을 재가열/,
    th: /อาหารที่มีไข่ต้องถึง 71°C \(160°F\)[\s\S]*74°C \(165°F\)[\s\S]*อุ่นทาโกะยากิที่เป็นอาหารเหลือ/
  }, "egg-dish cooking and leftover reheating use their applicable endpoints");
  everyLocale(toppings.body, {
    en: /24 hot balls[\s\S]*four plates, six each[\s\S]*30 g sauce[\s\S]*20 g mayonnaise[\s\S]*1 g aonori[\s\S]*2 g katsuobushi/,
    "zh-hant": /24 顆熱章魚燒[\s\S]*四盤，每盤六顆[\s\S]*30 公克醬汁[\s\S]*20 公克美乃滋[\s\S]*1 公克海苔粉[\s\S]*2 公克柴魚片/,
    ja: /たこ焼き24個[\s\S]*4皿に6個ずつ[\s\S]*ソース30g[\s\S]*マヨネーズ20g[\s\S]*青のり1g[\s\S]*かつお節2g/,
    ko: /타코야키 24개[\s\S]*네 접시에 여섯 개씩[\s\S]*소스 30g[\s\S]*마요네즈 20g[\s\S]*아오노리 1g[\s\S]*가쓰오부시 2g/,
    th: /ทาโกะยากิร้อนทั้ง 24 ลูก[\s\S]*4 จาน จานละ 6 ลูก[\s\S]*ซอส 30 กรัม[\s\S]*มายองเนส 20 กรัม[\s\S]*อาโอโนริ 1 กรัม[\s\S]*คัตสึโอะบุชิ 2 กรัม/
  }, "topping amounts use the full listed quantities");
  assert.ok(recipe.cookMinutes >= 2 * (3 + 4) + 6,
    "20-minute estimate covers two 7-minute batches plus pan heating and transfer");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*2 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*71°C \(160°F\)[\s\S]*not reheating leftovers/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*2 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*71°C（160°F）[\s\S]*不是剩菜復熱標準/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*2日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*71°C（160°F）[\s\S]*再加熱基準ではありません/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*2일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*71°C \(160°F\)[\s\S]*재가열 기준이 아니다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*2 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*71°C \(160°F\)[\s\S]*ไม่ใช่อุ่นอาหารเหลือ/
  }, "quality window and cooking versus reheating endpoints");
  official(recipe, [officialUrls.eggs]);
});
