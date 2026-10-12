import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["japanese-curry", "spaghetti-alle-vongole", "arroz-con-leche", "full-english-breakfast"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const src = {
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker",
  chill: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  temps: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  cold: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
function get(id) { const r = byId.get(id); assert.ok(r, id + ": recipe exists"); return r; }
function step(r, title) { const found = r.instructions.find((s) => s.title.en === title); assert.ok(found, r.id + ": " + title + " step exists"); return found; }
function all(text, patterns, label) { for (const locale of localeOrder) assert.match(text[locale], patterns[locale], locale + ": " + label); }
function official(r, urls) { for (const url of urls) assert.ok(r.sources.some((s) => s.url === url && s.title.startsWith("Official food-safety guidance")), r.id + ": separately credited official source " + url); }

test("forty-sixth batch appends four eligible recipes to shared localized coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((r) => r.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 192);
  assert.equal(new Set(covered).size, 192);
  assert.equal(covered.slice(0, 180).length, 180);
  assert.deepEqual(covered.slice(180, 184), ids);
  assert.equal(recipes.length - excludedIds.length - covered.length, 143);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  for (const id of ids) {
    const r = get(id);
    assert.equal(r.totalMinutes, r.prepMinutes + r.cookMinutes, id + ": total time adds up");
    for (const locale of localeOrder) {
      assert.ok(r.name[locale], id + "/" + locale + ": name");
      assert.ok(r.ingredients.every((i) => i.amount && i.item[locale]), id + "/" + locale + ": ingredients");
      assert.ok(r.instructions.every((s) => s.title[locale] && s.body[locale]), id + "/" + locale + ": method");
      assert.ok(r.storage[locale], id + "/" + locale + ": storage card");
    }
    assert.ok(r.sources.filter((s) => !s.title.startsWith("Official food-safety guidance")).length >= 2,
      id + ": recipe references remain separate from official guidance");
  }
});

test("Japanese curry portions rice and separates cooked-rice storage", () => {
  const r = get("japanese-curry");
  all(step(r, "Cook and hold the rice").body, {
    en: /four 100 g portions/, "zh-hant": /四份，每份 100 公克/, ja: /100gずつ4人分/, ko: /100g씩 네 인분/, th: /4 ส่วน ส่วนละ 100 กรัม/
  }, "rice is divided into four portions");
  all(step(r, "Serve with rice and pickles").body, {
    en: /four plates[\s\S]*100 g cooked rice[\s\S]*75 g raw-chicken equivalent[\s\S]*20 g fukujinzuke/,
    "zh-hant": /四盤[\s\S]*100 公克熟飯[\s\S]*75 公克生雞肉[\s\S]*20 公克福神漬/,
    ja: /4皿[\s\S]*ご飯100g[\s\S]*生鶏肉約75g相当[\s\S]*福神漬け20g/,
    ko: /네 접시[\s\S]*밥 100g[\s\S]*생닭 약 75g[\s\S]*후쿠진즈케 20g/,
    th: /4 จาน[\s\S]*ข้าวสุก 100 กรัม[\s\S]*ไก่ดิบประมาณ 75 กรัม[\s\S]*ฟุกุจินซึเกะ 20 กรัม/
  }, "rice, curry, and pickle amounts are per serving");
  all(r.storage, {
    en: /rice[\s\S]*within 1 hour[\s\S]*24 hours[\s\S]*only once[\s\S]*curry separately[\s\S]*conservative 3-day limit[\s\S]*74°C/,
    "zh-hant": /米飯[\s\S]*1 小時內[\s\S]*24 小時內[\s\S]*最多回熱一次[\s\S]*咖哩另[\s\S]*保守的 3 天[\s\S]*74°C/,
    ja: /ご飯[\s\S]*1時間以内[\s\S]*24時間以内[\s\S]*一度だけ[\s\S]*カレーは別[\s\S]*保守的な期限[\s\S]*74°C/,
    ko: /밥은[\s\S]*1시간 안에[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*카레는 별도[\s\S]*보수적 보관 한도[\s\S]*74°C/,
    th: /ข้าว[\s\S]*1 ชั่วโมง[\s\S]*24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*แยกแกง[\s\S]*เกณฑ์เผื่อความปลอดภัย[\s\S]*74°C/
  }, "rice and curry cards have separate limits");
  all(step(r, "Brown the chicken").body, {
    en: /thickest clump reaches 74°C/, "zh-hant": /最厚肉塊，須達 74°C/, ja: /最も厚い塊が74℃/, ko: /가장 두꺼운 덩어리가 74°C/, th: /ก้อนหนาสุดถึง 74°C/
  }, "ground chicken uses its poultry endpoint");
  official(r, [src.rice, src.chill, src.temps]);
});

test("spaghetti alle vongole sorts live clams and uses shell opening as the doneness cue", () => {
  const r = get("spaghetti-alle-vongole");
  all(step(r, "Check and purge the clams").body, {
    en: /shellfish tag[\s\S]*4°C \/ 40°F or below[\s\S]*close when tapped/,
    "zh-hant": /來源標籤[\s\S]*4°C／40°F 以下[\s\S]*輕敲後仍不閉合/,
    ja: /表示付き販売元[\s\S]*4°C／40°F以下[\s\S]*たたいても閉じない/,
    ko: /원산지 표시[\s\S]*4°C \/ 40°F 이하[\s\S]*두드려도 닫히지 않는/,
    th: /ป้ายแหล่งที่มา[\s\S]*4°C \/ 40°F หรือต่ำกว่า[\s\S]*เคาะไม่ปิด/
  }, "live clams are chilled and sorted");
  all(step(r, "Steam the clams open").body, {
    en: /about 3–5 minutes[\s\S]*shells open[\s\S]*discard any still closed[\s\S]*no thermometer/,
    "zh-hant": /約 3–5 分鐘[\s\S]*開殼[\s\S]*仍閉合者丟棄[\s\S]*不需套用測溫/,
    ja: /約3～5分[\s\S]*殻が開いた貝[\s\S]*閉じたままの貝は捨て[\s\S]*温度計は使いません/,
    ko: /약 3–5분[\s\S]*껍데기가 열리는[\s\S]*닫힌 것은 버립니다[\s\S]*온도계를 쓰지 않습니다/,
    th: /ประมาณ 3–5 นาที[\s\S]*เปลือกเปิด[\s\S]*ทิ้งตัวที่ยังปิด[\s\S]*ไม่ต้องใช้เทอร์โมมิเตอร์/
  }, "shell opening, not an unrelated temperature, establishes doneness");
  all(step(r, "Return clams and parsley").body, {
    en: /four warm bowls[\s\S]*90 g dry spaghetti[\s\S]*250 g shell-on clams/,
    "zh-hant": /四個溫碗[\s\S]*90 公克乾麵[\s\S]*250 公克帶殼蛤蜊/,
    ja: /温めた4皿[\s\S]*乾麺約90g[\s\S]*殻付きあさり約250g/,
    ko: /그릇 네 개[\s\S]*마른 면 약 90g[\s\S]*껍데기째 조개 약 250g/,
    th: /ชามอุ่น 4 ใบ[\s\S]*เส้นแห้งประมาณ 90 กรัม[\s\S]*หอยทั้งเปลือกก่อนคัดทิ้งประมาณ 250 กรัม/
  }, "pasta and shell-on clam portions are clear");
  all(r.storage, {
    en: /4°C \/ 40°F or below[\s\S]*within 2 hours[\s\S]*2 days as a conservative recipe limit[\s\S]*74°C \/ 165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C／40°F 以下[\s\S]*保守期限[\s\S]*74°C／165°F/,
    ja: /2時間以内[\s\S]*4°C／40°F以下[\s\S]*保守的な期限[\s\S]*74°C／165°F/,
    ko: /2시간 안에[\s\S]*4°C \/ 40°F 이하[\s\S]*보수적 한도[\s\S]*74°C \/ 165°F/,
    th: /4°C \/ 40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ขีดจำกัดแบบเผื่อความปลอดภัย[\s\S]*74°C \/ 165°F/
  }, "leftover guidance remains distinct from live-clam doneness");
  official(r, [src.seafood, src.chill, src.temps]);
});

test("arroz con leche portions and chills cooked rice on a consistent clock", () => {
  const r = get("arroz-con-leche");
  assert.deepEqual([r.prepMinutes, r.cookMinutes, r.totalMinutes], [90, 115, 205]);
  all(step(r, "Portion and chill").body, {
    en: /six shallow 180 ml dishes[\s\S]*ice-water bath[\s\S]*ideally within 1 hour[\s\S]*at least 1 hour/,
    "zh-hant": /6 個 180 毫升淺碗[\s\S]*冰水浴[\s\S]*1 小時內[\s\S]*至少冷藏 1 小時/,
    ja: /180mlの器6個[\s\S]*氷水浴[\s\S]*1時間以内[\s\S]*少なくとも1時間/,
    ko: /180ml 그릇 여섯 개[\s\S]*얼음물[\s\S]*1시간 안에[\s\S]*최소 1시간/,
    th: /ถ้วยตื้น 180 มล\. 6 ใบ[\s\S]*อ่างน้ำแข็ง[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*อย่างน้อย 1 ชั่วโมง/
  }, "portion size and prompt cooling are explicit");
  all(step(r, "Finish with cinnamon").body, {
    en: /Serve cold[\s\S]*reheat it only once[\s\S]*steaming hot throughout/,
    "zh-hant": /冷食[\s\S]*回熱一次[\s\S]*整體冒蒸氣/,
    ja: /冷たいまま[\s\S]*一度だけ[\s\S]*全体から湯気/,
    ko: /차게 냅니다[\s\S]*한 번만[\s\S]*전체에서 김/,
    th: /เสิร์ฟเย็น[\s\S]*เพียงครั้งเดียว[\s\S]*มีไอทั่วถึง/
  }, "optional reheating is limited to one thorough reheat");
  all(r.storage, {
    en: /shallow portions[\s\S]*0–4°C[\s\S]*within 1 hour[\s\S]*24 hours[\s\S]*reheat only once/,
    "zh-hant": /淺盒[\s\S]*0–4°C[\s\S]*1 小時內[\s\S]*24 小時內[\s\S]*最多回熱一次/,
    ja: /浅い器[\s\S]*1時間以内[\s\S]*0～4°C[\s\S]*24時間以内[\s\S]*一度だけ/,
    ko: /얕은 용기[\s\S]*1시간 안에[\s\S]*0–4°C[\s\S]*24시간 안에[\s\S]*한 번만/,
    th: /ภาชนะตื้น[\s\S]*0–4°C[\s\S]*1 ชั่วโมง[\s\S]*24 ชั่วโมง[\s\S]*ครั้งเดียว/
  }, "recipe card follows cooked-rice-specific guidance");
  official(r, [src.rice, src.chill]);
});

test("full English breakfast coordinates pans and allocates each plate", () => {
  const r = get("full-english-breakfast");
  assert.deepEqual([r.prepMinutes, r.cookMinutes, r.totalMinutes], [20, 45, 65]);
  all(step(r, "Start the sausages in the oven").body, {
    en: /largest sausage[\s\S]*71°C \/ 160°F[\s\S]*beans[\s\S]*tomatoes and mushrooms together[\s\S]*black pudding and bacon at the same time[\s\S]*eggs last[\s\S]*60°C/,
    "zh-hant": /最大根中心[\s\S]*71°C／160°F[\s\S]*焗豆[\s\S]*番茄和蘑菇[\s\S]*黑布丁和培根[\s\S]*最後煎蛋[\s\S]*60°C/,
    ja: /最も太い1本[\s\S]*71°C／160°F[\s\S]*豆[\s\S]*トマトときのこ[\s\S]*ブラックプディングとベーコン[\s\S]*最後に卵[\s\S]*60°C/,
    ko: /가장 굵은 소시지[\s\S]*71°C \/ 160°F[\s\S]*빈[\s\S]*토마토와 버섯[\s\S]*블랙푸딩과 베이컨[\s\S]*달걀은 마지막[\s\S]*60°C/,
    th: /ชิ้นใหญ่สุด[\s\S]*71°C \/ 160°F[\s\S]*ถั่ว[\s\S]*มะเขือเทศและเห็ด[\s\S]*แบล็กพุดดิ้งกับเบคอน[\s\S]*ไข่เป็นอย่างสุดท้าย[\s\S]*60°C/
  }, "sausage endpoint and parallel schedule are localized");
  all(step(r, "Fry the eggs last").body, {
    en: /pasteurized shell eggs[\s\S]*whites are fully set[\s\S]*ordinary unpasteurized eggs[\s\S]*both whites and yolks are firm/,
    "zh-hant": /巴氏殺菌帶殼蛋[\s\S]*蛋白煎至完全凝固[\s\S]*一般未殺菌蛋[\s\S]*蛋白與蛋黃都煮至凝固/,
    ja: /殺菌済み殻付き卵[\s\S]*白身を完全に固め[\s\S]*通常の未殺菌卵[\s\S]*白身も黄身も固く/,
    ko: /살균 껍데기 달걀[\s\S]*흰자는 완전히 익히고[\s\S]*일반 비살균 달걀[\s\S]*흰자와 노른자 모두 단단/,
    th: /ไข่เปลือกพาสเจอไรซ์[\s\S]*ไข่ขาวสุกเต็มที่[\s\S]*ไข่ทั่วไปที่ไม่พาสเจอไรซ์[\s\S]*ไข่ขาวและไข่แดงแข็ง/
  }, "soft yolks use pasteurized eggs; ordinary eggs cook firm");
  all(step(r, "Assemble four hot plates").body, {
    en: /4 warmed plates[\s\S]*2 sausages \(about 120 g\)[\s\S]*75 g mushrooms[\s\S]*100 g tomato[\s\S]*100 g beans/,
    "zh-hant": /4 份[\s\S]*2 根香腸（約 120 公克）[\s\S]*75 公克蘑菇[\s\S]*100 公克番茄[\s\S]*100 公克焗豆/,
    ja: /4皿[\s\S]*ソーセージ2本（約120g）[\s\S]*きのこ75g[\s\S]*トマト100g[\s\S]*豆100g/,
    ko: /접시 4개[\s\S]*소시지 2개\(약 120g\)[\s\S]*버섯 75g[\s\S]*토마토 100g[\s\S]*빈 100g/,
    th: /จานอุ่น 4 จาน[\s\S]*ไส้กรอก 2 ชิ้น \(ประมาณ 120 กรัม\)[\s\S]*เห็ด 75 กรัม[\s\S]*มะเขือเทศ 100 กรัม[\s\S]*ถั่ว 100 กรัม/
  }, "plate amounts match the listed yield");
  all(r.storage, {
    en: /0–4°C[\s\S]*within 2 hours[\s\S]*3 days as a conservative recipe limit[\s\S]*74°C \/ 165°F/,
    "zh-hant": /2 小時內[\s\S]*0–4°C[\s\S]*保守期限[\s\S]*74°C／165°F/,
    ja: /2時間以内[\s\S]*0～4°C[\s\S]*保守的な期限[\s\S]*74°C／165°F/,
    ko: /2시간 안에[\s\S]*0–4°C[\s\S]*보수적 한도[\s\S]*74°C \/ 165°F/,
    th: /0–4°C[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ขีดจำกัดแบบเผื่อความปลอดภัย[\s\S]*74°C \/ 165°F/
  }, "storage card states a conservative limit and reheat endpoint");
  official(r, [src.temps, src.chill, src.cold, src.eggs]);
});
