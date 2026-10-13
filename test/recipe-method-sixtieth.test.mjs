import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["scallion-pancakes", "okonomiyaki", "baked-mac-and-cheese", "salade-lyonnaise"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialUrls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-to-know-about-egg-safety",
  flour: "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, id + ": recipe exists");
  return recipe;
}

function step(recipe, index) {
  const found = recipe.instructions[index];
  assert.ok(found, recipe.id + ": step " + (index + 1) + " exists");
  return found;
}

function everyLocale(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], locale + ": " + label);
}

function official(recipe, urls) {
  for (const url of urls) {
    assert.ok(recipe.sources.some((source) =>
      source.url === url && source.title.startsWith("Official food-safety guidance")),
    recipe.id + ": applicable official guidance is credited separately: " + url);
  }
  assert.ok(recipe.sources.filter((source) =>
    !source.title.startsWith("Official food-safety guidance")).length >= 2,
  recipe.id + ": two culinary references remain separate from official guidance");
}

test("sixtieth recovery selects four unchecked eligible slugs and keeps the 353-recipe registry", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "the shared five-locale detail-route ledger exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusions = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusions, "the standing exclusion list exists");
  const excluded = [...exclusions.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 260);
  assert.equal(new Set(covered).size, 260);
  assert.deepEqual(covered.slice(-24, -20), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !excluded.includes(id)), "selected slugs are not in the standing exclusions");
  assert.equal(recipes.length - excluded.length - covered.length, 75);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, id + ": source draft exists");
    if (recipe.instructions.length === draft.instructions.length) {
      assert.deepEqual(recipe.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
        id + ": every imageScene remains on its original step");
    } else {
      assert.ok(recipe.instructions.every((entry) => !entry.imageScene),
        id + ": methods without imageScene metadata retain the index-based illustration mapping");
    }
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, recipe.instructions.length, id + ": every step retains one illustration");
    assert.deepEqual(illustrations.map((entry) => entry.step),
      recipe.instructions.map((_, index) => index + 1), id + ": illustration steps remain in method order");
    assert.ok(illustrations.every((entry) => entry.setComplete && entry.visualMatchApproved && entry.nonPhotographic),
      id + ": existing illustration metadata remains approved");
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), id + "/" + locale + ": localized ingredients exist");
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), id + "/" + locale + ": localized instructions exist");
      assert.ok(recipe.storage[locale], id + "/" + locale + ": localized storage guidance exists");
    }
    assert.notDeepEqual(recipe.instructions, draft.instructions, id + ": publication edits leave the source draft unchanged");
    assert.notDeepEqual(recipe.storage, draft.storage, id + ": storage edits leave the source draft unchanged");
    assert.notDeepEqual(recipe.sources, draft.sources, id + ": official references are publication-only");
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, id + ": total time adds up");
  }
});

test("scallion pancakes allocate the flour, oil, scallions, dip, and four servings", () => {
  const recipe = get("scallion-pancakes");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [60, 30, 90]);
  everyLocale(step(recipe, 1).body, {
    en: /45 ml oil[\s\S]*15 ml[\s\S]*3\.75 ml/,
    "zh-hant": /45 毫升油[\s\S]*15 毫升[\s\S]*3\.75 毫升/,
    ja: /油45ml[\s\S]*残り15ml[\s\S]*3\.75ml/,
    ko: /기름 45ml[\s\S]*남은 15ml[\s\S]*3\.75ml/,
    th: /น้ำมัน 45 มล.[\s\S]*15 มล.[\s\S]*3\.75 มล./
  }, "the 60 ml oil allocation");
  everyLocale(step(recipe, 2).body, {
    en: /four equal balls[\s\S]*25 g[\s\S]*all four portions/,
    "zh-hant": /四等份[\s\S]*25 公克[\s\S]*四份/,
    ja: /4等分[\s\S]*25g[\s\S]*4つすべて/,
    ko: /네 등분[\s\S]*25g[\s\S]*네 조각/,
    th: /4 ก้อนเท่า ๆ กัน[\s\S]*25 กรัม[\s\S]*ครบสี่ชิ้น/
  }, "equal pancake and scallion portions");
  everyLocale(step(recipe, 6).body, {
    en: /55 ml dip[\s\S]*14 ml per serving/,
    "zh-hant": /55 毫升沾醬[\s\S]*每份約 14 毫升/,
    ja: /合計55ml[\s\S]*約14ml/,
    ko: /총 55ml[\s\S]*약 14ml/,
    th: /55 มล.[\s\S]*ประมาณ 14 มล./
  }, "dip yield");
  everyLocale(step(recipe, 5).body, {
    en: /2–3 minutes[\s\S]*no raw, floury dough/,
    "zh-hant": /2–3 分鐘[\s\S]*沒有生粉糰/,
    ja: /2〜3分[\s\S]*生の粉っぽい生地が残らない/,
    ko: /2–3분[\s\S]*생밀가루 반죽이 남지/,
    th: /2–3 นาที[\s\S]*ไม่มีแป้งดิบ/
  }, "estimated pan time and fully cooked flour");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F[\s\S]*3 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F[\s\S]*3 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C\/40°F[\s\S]*3日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F[\s\S]*3일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C\/40°F[\s\S]*3 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "storage and leftover reheating");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage, officialUrls.flour]);
});

test("okonomiyaki checks the egg batter and intact pork against their separate cooking standards", () => {
  const recipe = get("okonomiyaki");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 35, 65]);
  everyLocale(step(recipe, 6).body, {
    en: /egg batter must reach 71°C \(160°F\)[\s\S]*pork reaches 63°C \(145°F\)[\s\S]*rests for 3 minutes[\s\S]*1-minute increments/,
    "zh-hant": /含蛋麵糊須達 71°C（160°F）[\s\S]*完整豬肉須達 63°C（145°F）並靜置 3 分鐘[\s\S]*續煎並每次加 1 分鐘/,
    ja: /卵入り生地は71°C（160°F）[\s\S]*63°C（145°F）に達した後3分[\s\S]*1分ずつ加熱/,
    ko: /달걀 반죽은 71°C \(160°F\)[\s\S]*63°C \(145°F\)[\s\S]*3분 쉰다[\s\S]*1분씩 더 익히고/,
    th: /แป้งที่มีไข่ต้องถึง 71°C \(160°F\)[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที[\s\S]*ครั้งละ 1 นาที/
  }, "egg-dish and intact-pork endpoints are distinct");
  everyLocale(step(recipe, 7).body, {
    en: /30 g sauce[\s\S]*20 g mayonnaise[\s\S]*1 g aonori[\s\S]*2 g bonito/,
    "zh-hant": /30 公克醬汁[\s\S]*20 公克美乃滋[\s\S]*1 公克海苔粉[\s\S]*2 公克柴魚片/,
    ja: /ソース30g[\s\S]*マヨネーズ20g[\s\S]*青のり1g[\s\S]*かつお節2g/,
    ko: /소스 30g[\s\S]*마요네즈 20g[\s\S]*아오노리 1g[\s\S]*가쓰오부시 2g/,
    th: /ซอส 30 กรัม[\s\S]*มายองเนส 20 กรัม[\s\S]*อาโอโนริ 1 กรัม[\s\S]*ปลาโอแห้ง 2 กรัม/
  }, "measured per-pancake toppings");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*71°C\/160°F[\s\S]*63°C\/145°F/,
    "zh-hant": /2 小時內[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*71°C\/160°F[\s\S]*63°C\/145°F/,
    ja: /2時間以内[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*71°C\/160°F[\s\S]*63°C\/145°F/,
    ko: /2시간 안에[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*71°C\/160°F[\s\S]*63°C\/145°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*71°C\/160°F[\s\S]*63°C\/145°F/
  }, "separate leftover reheat and cooking thresholds");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage, officialUrls.eggs]);
});

test("baked macaroni uses the meatless-casserole endpoint and divides the recipe into eight portions", () => {
  const recipe = get("baked-mac-and-cheese");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 50, 75]);
  everyLocale(step(recipe, 0).body, {
    en: /6 g[\s\S]*reserve 2 g[\s\S]*450 g macaroni[\s\S]*2 minutes less/,
    "zh-hant": /6 公克[\s\S]*留 2 公克[\s\S]*450 公克通心粉[\s\S]*少煮 2 分鐘/,
    ja: /塩8gのうち6g[\s\S]*2gはソース用[\s\S]*マカロニ450g[\s\S]*2分短く/,
    ko: /소금 8g 중 6g[\s\S]*2g은 소스용[\s\S]*마카로니 450g[\s\S]*2분 짧게/,
    th: /เกลือ 8 กรัม[\s\S]*6 กรัม[\s\S]*กันไว้ 2 กรัม[\s\S]*มักกะโรนี 450 กรัม[\s\S]*2 นาที/
  }, "salt and pasta timing");
  everyLocale(step(recipe, 6).body, {
    en: /20–25 minutes[\s\S]*meatless casserole must reach 74°C \(165°F\)[\s\S]*3-minute increments/,
    "zh-hant": /20–25 分鐘[\s\S]*不含肉的焗烤菜須達 74°C（165°F）[\s\S]*每次續烤 3 分鐘/,
    ja: /20〜25分[\s\S]*キャセロールは74°C（165°F）[\s\S]*3分ずつ追加/,
    ko: /20–25분[\s\S]*캐서롤은 74°C \(165°F\)[\s\S]*3분씩 더 굽고/,
    th: /20–25 นาที[\s\S]*หม้ออบที่ไม่มีเนื้อต้องถึง 74°C \(165°F\)[\s\S]*ครั้งละ 3 นาที/
  }, "estimated bake and thermometer recheck");
  everyLocale(step(recipe, 4).body, {
    en: /all 420 g cheddar[\s\S]*90 g Gruyère[\s\S]*all 2 g pepper and all 2 g dry mustard[\s\S]*reserved 2 g salt/,
    "zh-hant": /420 公克切達起司[\s\S]*90 公克葛瑞爾起司[\s\S]*全部 2 公克胡椒與全部 2 公克芥末粉[\s\S]*預留的 2 公克鹽/,
    ja: /チェダー420g全量[\s\S]*グリュイエール90g全量[\s\S]*こしょう2g全量とマスタード2g全量[\s\S]*塩2g/,
    ko: /체더 420g[\s\S]*그뤼에르 90g[\s\S]*후추 2g과 마른 머스터드 2g 전량[\s\S]*소금 2g/,
    th: /เชดดาร์ 420 กรัม[\s\S]*กรูแยร์ 90 กรัม[\s\S]*พริกไทย 2 กรัมและมัสตาร์ดแห้ง 2 กรัมทั้งหมด[\s\S]*เกลือ 2 กรัม/
  }, "cheese and seasoning allocation");
  everyLocale(step(recipe, 5).body, {
    en: /eight portions[\s\S]*about 56 g per serving/,
    "zh-hant": /八人份[\s\S]*每份烹煮前約 56 公克/,
    ja: /8人分[\s\S]*1人あたり約56g/,
    ko: /여덟 인분[\s\S]*1인분 약 56g/,
    th: /8 ที่[\s\S]*ประมาณ 56 กรัมต่อที่/
  }, "yield allocation");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F[\s\S]*3 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F[\s\S]*3 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C\/40°F[\s\S]*3日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F[\s\S]*3일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C\/40°F[\s\S]*3 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "storage and reheating");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage]);
});

test("salade lyonnaise uses pasteurized eggs for soft yolks and keeps portions and storage explicit", () => {
  const recipe = get("salade-lyonnaise");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [20, 20, 40]);
  everyLocale(step(recipe, 3).body, {
    en: /all 20 ml red wine vinegar[\s\S]*all 10 g mustard[\s\S]*remainder of the 20 ml olive oil[\s\S]*top-up[\s\S]*15 ml total fat[\s\S]*10 ml olive oil was used/,
    "zh-hant": /全部 20 毫升紅酒醋[\s\S]*全部 10 公克芥末[\s\S]*預留給醬汁的 20 毫升橄欖油[\s\S]*補足 15 毫升培根油[\s\S]*10 毫升橄欖油已用於麵包丁/,
    ja: /赤ワイン酢20ml全量[\s\S]*マスタード10g全量[\s\S]*ドレッシング用に取り分けたオリーブ油20ml[\s\S]*合計15ml[\s\S]*オリーブ油10mlはクルトン/,
    ko: /레드와인식초 20ml[\s\S]*머스터드 10g 전량[\s\S]*올리브유 20ml[\s\S]*총 15ml[\s\S]*올리브유 10ml는 크루통/,
    th: /น้ำส้มสายชูไวน์แดง 20 มล.[\s\S]*มัสตาร์ด 10 กรัมทั้งหมด[\s\S]*น้ำมันมะกอก 20 มล.[\s\S]*ไขมันเบคอนครบ 15 มล.[\s\S]*อีก 10 มล.ใช้กับขนมปังกรอบ/
  }, "dressing oil remains allocated when bacon-fat yield varies");
  everyLocale(step(recipe, 4).body, {
    en: /commercially pasteurized shell eggs[\s\S]*85–90°C[\s\S]*two eggs at a time[\s\S]*3–4 minutes[\s\S]*do not substitute ordinary unpasteurized eggs/,
    "zh-hant": /商用巴氏殺菌帶殼蛋[\s\S]*85–90°C[\s\S]*每次煮兩顆[\s\S]*3–4 分鐘[\s\S]*普通未殺菌蛋/,
    ja: /市販の殻付き殺菌済み卵[\s\S]*85〜90°C[\s\S]*2個ずつ[\s\S]*3〜4分[\s\S]*通常の未殺菌卵/,
    ko: /시판 살균 껍질 달걀[\s\S]*85–90°C[\s\S]*두 개씩[\s\S]*3–4분[\s\S]*일반 비살균 달걀/,
    th: /ไข่เปลือกพาสเจอร์ไรซ์เชิงพาณิชย์[\s\S]*85–90°C[\s\S]*ครั้งละสองฟอง[\s\S]*3–4 นาที[\s\S]*ไข่ธรรมดาที่ไม่พาสเจอร์ไรซ์/
  }, "pasteurized eggs and controlled poaching stages");
  everyLocale(step(recipe, 5).body, {
    en: /four plates[\s\S]*62 g each[\s\S]*30 g croutons[\s\S]*37.5 g bacon[\s\S]*one freshly poached egg/,
    "zh-hant": /四盤[\s\S]*每盤約 62 公克[\s\S]*30 公克麵包丁[\s\S]*37.5 公克培根[\s\S]*一顆現煮水波蛋/,
    ja: /4皿[\s\S]*約62gずつ[\s\S]*クルトン30g[\s\S]*ベーコン37.5g[\s\S]*ポーチドエッグ1個/,
    ko: /네 접시[\s\S]*각 약 62g[\s\S]*크루통 30g[\s\S]*베이컨 37.5g[\s\S]*수란 하나/,
    th: /4 จาน[\s\S]*ประมาณ 62 กรัม[\s\S]*30 กรัม[\s\S]*37.5 กรัม[\s\S]*ไข่ลวกสดหนึ่งฟอง/
  }, "four equal plated servings");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*poach pasteurized eggs fresh/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*新煮巴氏殺菌蛋/,
    ja: /2時間以内[\s\S]*4°C\/40°F[\s\S]*3〜4日以内[\s\S]*74°C\/165°F[\s\S]*殺菌済み卵を新たにポーチ/,
    ko: /2시간 안에[\s\S]*4°C\/40°F[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*살균 달걀을 새로 수란/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C\/40°F[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*ลวกไข่พาสเจอร์ไรซ์ใหม่/
  }, "leftover and quality guidance");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage, officialUrls.eggs]);
});
