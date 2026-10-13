import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["panang-curry", "kimchi-jjigae", "sopa-de-tortilla", "palak-paneer"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialUrls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
};

function recipe(id) {
  const result = byId.get(id);
  assert.ok(result, `${id}: published recipe exists`);
  return result;
}

function everyLocale(value, patterns, message) {
  for (const locale of localeOrder) assert.match(value[locale], patterns[locale], `${locale}: ${message}`);
}

function hasOfficialReferences(dish, includeTemperature = true) {
  for (const key of includeTemperature ? Object.keys(officialUrls) : ["handling", "storage"]) {
    const url = officialUrls[key];
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official ${key} source is listed`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: at least two culinary sources remain`);
}

test("sixty-fifth batch extends the exact slug ledger by four unchecked, non-excluded recipes", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const previous = covered.slice(0, -8);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "standing exclusion list exists");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(previous.length, 256);
  assert.equal(new Set(previous).size, 256);
  assert.equal(covered.length, 264);
  assert.equal(new Set(covered).size, 264);
  assert.deepEqual(covered.slice(-8, -4), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - previous.length, 79);
  assert.equal(recipes.length - excluded.length - covered.length, 71);
  assert.ok(ids.every((id) => !previous.includes(id)), "selected IDs were absent from the exact starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "no selected ID is excluded");
});

test("the four methods keep the source drafts, step counts, and existing illustration mappings", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = draftById.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: publication method was revised`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: publication storage guidance was revised`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: publication references were reviewed`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time estimate adds up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: original number of steps is retained`);
    assert.deepEqual(published.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: imageScene mappings are unchanged`);
    const art = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(art.length, published.instructions.length, `${id}: each original step keeps its mapped illustration`);
    assert.deepEqual(art.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient amount/name exists`);
      assert.ok(published.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: localized steps exist`);
      assert.ok(published.storage[locale], `${id}/${locale}: localized storage guidance exists`);
    }
  }
});

test("Panang beef uses the whole-cut endpoint, a real rest, divided portions, and separate timing estimates", () => {
  const dish = recipe("panang-curry");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 25, 38, 63]);
  assert.equal(dish.ingredients.find((row) => row.item.en.startsWith("beef sirloin"))?.amount, "500 g");
  everyLocale(dish.instructions[4].body, {
    en: /estimated 6–9 minutes[\s\S]*several of the thickest strips[\s\S]*63°C \(145°F\)[\s\S]*1 minute[\s\S]*temperature controls safety/,
    "zh-hant": /約煮 6–9 分鐘[\s\S]*數條最厚肉條[\s\S]*63°C（145°F）[\s\S]*再煮 1 分鐘[\s\S]*安全以溫度為準/,
    ja: /目安として6〜9分[\s\S]*最も厚い数本[\s\S]*63°C（145°F）[\s\S]*1分ずつ[\s\S]*安全性は温度/,
    ko: /추정 6–9분[\s\S]*가장 두꺼운 고기 몇 점[\s\S]*63°C \(145°F\)[\s\S]*1분씩[\s\S]*안전은 온도/,
    th: /ประมาณ 6–9 นาที[\s\S]*เส้นที่หนาที่สุดหลายชิ้น[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 1 นาที[\s\S]*ความปลอดภัยตัดสินด้วยอุณหภูมิ/
  }, "intact beef reaches 63°C and the cooking time remains an estimate");
  everyLocale(dish.instructions[5].body, {
    en: /reaches 63°C[\s\S]*rest it for at least 3 minutes/,
    "zh-hant": /達 63°C[\s\S]*靜置至少 3 分鐘/,
    ja: /63°Cに達したら[\s\S]*少なくとも3分休ませ/,
    ko: /63°C에 도달하면[\s\S]*최소 3분 쉰다/,
    th: /ถึง 63°C[\s\S]*พักอย่างน้อย 3 นาที/
  }, "whole-cut beef receives the official three-minute rest");
  everyLocale(dish.instructions[6].body, {
    en: /4 shallow bowls[\s\S]*125 g raw-beef equivalent[\s\S]*150 g per person/,
    "zh-hant": /4 個淺碗[\s\S]*125 公克生牛肉[\s\S]*每人 150 公克/,
    ja: /4つの浅い器[\s\S]*生の牛肉換算約125g[\s\S]*1人150g/,
    ko: /얕은 네 그릇[\s\S]*생고기 기준 약 125g[\s\S]*1인 150g/,
    th: /ชามตื้น 4 ใบ[\s\S]*เนื้อดิบประมาณ 125 กรัม[\s\S]*คนละ 150 กรัม/
  }, "all beef, sauce, garnishes, and rice are allocated across four servings");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Two days is a texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*품질 기준[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*คำแนะนำด้านเนื้อสัมผัส[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality preference, official storage, and reheating standard remain distinct");
  hasOfficialReferences(dish);
});

test("kimchi jjigae distinguishes whole pork from ground meat and separates tenderness time from safety", () => {
  const dish = recipe("kimchi-jjigae");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 20, 47, 67]);
  assert.equal(dish.ingredients.find((row) => row.item.en.startsWith("skinless pork belly"))?.amount, "250 g");
  everyLocale(dish.instructions[4].body, {
    en: /estimated 15 minutes[\s\S]*tenderness estimate only[\s\S]*safe endpoint after all simmering/,
    "zh-hant": /約燉 15 分鐘[\s\S]*軟嫩度估時[\s\S]*全部燉煮後/,
    ja: /目安として15分[\s\S]*柔らかさの目安[\s\S]*最後の煮込み後/,
    ko: /추정 15분[\s\S]*연육 시간의 추정치[\s\S]*마지막 끓임 뒤/,
    th: /ประมาณ 15 นาที[\s\S]*ค่าประมาณความนุ่ม[\s\S]*ขั้นสุดท้าย/
  }, "the simmer estimate is not confused with a safe endpoint");
  everyLocale(dish.instructions[6].body, {
    en: /intact, non-ground pork cut[\s\S]*63°C \(145°F\)[\s\S]*rest at least 3 minutes[\s\S]*1-minute increments/,
    "zh-hant": /未絞製整塊豬肉[\s\S]*63°C（145°F）[\s\S]*靜置至少 3 分鐘[\s\S]*續煮 1 分鐘/,
    ja: /未加工の塊肉[\s\S]*63°C（145°F）[\s\S]*少なくとも3分休ませ[\s\S]*1分ずつ/,
    ko: /갈지 않은 통고기[\s\S]*63°C \(145°F\)[\s\S]*최소 3분 쉰다[\s\S]*1분씩/,
    th: /ชิ้นเต็มไม่บด[\s\S]*63°C \(145°F\)[\s\S]*พักอย่างน้อย 3 นาที[\s\S]*ครั้งละ 1 นาที/
  }, "whole-cut pork reaches its endpoint, rests, and has a timed recheck path");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*目安[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*권장 기간[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*คำแนะนำด้านเนื้อสัมผัส[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality, official storage, and reheating remain distinct");
  hasOfficialReferences(dish);
});

test("sopa de tortilla assigns every stock, salt, frying oil, and bowl portion", () => {
  const dish = recipe("sopa-de-tortilla");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [6, 30, 50, 80]);
  assert.ok(dish.ingredients.some((row) => row.amount === "1.5 L" && row.item.en.includes("water for simmering")));
  const oil = dish.ingredients.find((row) => row.amount === "300 ml");
  assert.match(oil.item.en, /250 ml for tortilla strips and 50 ml for dried chile garnish/);
  everyLocale(dish.instructions[2].body, {
    en: /exactly 250 ml[\s\S]*remaining 1,250 ml/,
    "zh-hant": /恰好 250 毫升[\s\S]*其餘 1,250 毫升/,
    ja: /250ml[\s\S]*残り1,250ml/,
    ko: /정확히 250ml[\s\S]*남은 육수 1,250ml/,
    th: /250 มล\.พอดี[\s\S]*อีก 1,250 มล\./
  }, "the 1,500 ml stock is fully split between blending and the pot");
  everyLocale(dish.instructions[7].body, {
    en: /6 bowls[\s\S]*220 g avocado[\s\S]*180 g queso fresco[\s\S]*160 g crema[\s\S]*all hot soup/,
    "zh-hant": /6 碗[\s\S]*220 公克酪梨[\s\S]*180 公克 queso fresco[\s\S]*160 公克 crema[\s\S]*全部熱湯/,
    ja: /6杯[\s\S]*アボカド220g[\s\S]*ケソ・フレスコ180g[\s\S]*クレマ160g[\s\S]*スープ全量/,
    ko: /여섯 그릇[\s\S]*아보카도 220g[\s\S]*케소 프레스코 180g[\s\S]*크레마 160g[\s\S]*수프 전량/,
    th: /6 ชาม[\s\S]*อะโวคาโด 220 กรัม[\s\S]*เคโซเฟรสโก 180 กรัม[\s\S]*เครมา 160 กรัม[\s\S]*ซุปร้อนทั้งหมด/
  }, "all listed toppings and the broth are allocated across six bowls");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Store tortilla strips[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*玉米餅條[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*トルティーヤ[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*또르띠야[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*เส้นตอร์ติยา[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "the broth is stored separately and reheated to the official leftover endpoint");
  hasOfficialReferences(dish);
});

test("palak paneer accounts for every water, oil, salt, portion, and reheat", () => {
  const dish = recipe("palak-paneer");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 25, 35, 60]);
  assert.ok(dish.ingredients.some((row) => row.amount === "3 L" && row.item.en.includes("blanching the spinach")));
  assert.ok(dish.ingredients.some((row) => row.amount === "2 L" && row.item.en.includes("spinach cooling bath")));
  assert.equal(dish.ingredients.find((row) => row.item.en.startsWith("hot water"))?.amount, "100–180 ml");
  everyLocale(dish.instructions[5].body, {
    en: /15 ml at a time[\s\S]*no more than 80 ml/,
    "zh-hant": /每次加 15 毫升[\s\S]*最多 80 毫升/,
    ja: /15mlずつ[\s\S]*最大80ml/,
    ko: /한 번에 15ml씩 최대 80ml/,
    th: /ครั้งละ 15 มล\.[\s\S]*ไม่เกิน 80 มล\./
  }, "the variable water amount has a measured destination and cap");
  everyLocale(dish.instructions[6].body, {
    en: /final 2 g salt[\s\S]*all 60 ml cream[\s\S]*4 bowls[\s\S]*125 g raw-spinach equivalent[\s\S]*62\.5 g paneer/,
    "zh-hant": /最後 2 公克鹽[\s\S]*全部 60 毫升鮮奶油[\s\S]*4 碗[\s\S]*125 公克生菠菜[\s\S]*62.5 公克 paneer/,
    ja: /残りの塩2g[\s\S]*クリーム60ml全量[\s\S]*4皿[\s\S]*生ほうれん草換算約125g[\s\S]*パニール62.5g/,
    ko: /남은 소금 2g[\s\S]*크림 60ml 전량[\s\S]*네 그릇[\s\S]*생시금치 기준 약 125g[\s\S]*파니르 62.5g/,
    th: /เกลือ 2 กรัมสุดท้าย[\s\S]*ครีม 60 มล\.[\s\S]*4 ชาม[\s\S]*ผักโขมดิบประมาณ 125 กรัม[\s\S]*ปานีร์ 62.5 กรัม/
  }, "all ingredients and raw-weight serving equivalents are accounted for");
  everyLocale(dish.storage, {
    en: /Two days is a green-colour and paneer-texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*not a food-safety temperature/,
    "zh-hant": /2 天內食用[\s\S]*口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*不是食安溫度/,
    ja: /2日以内[\s\S]*目安[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*食品安全温度ではありません/,
    ko: /2일은[\s\S]*권장 기간[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*안전 온도가 아니다/,
    th: /2 วันเป็นคำแนะนำ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*ไม่ใช่อุณหภูมิความปลอดภัย/
  }, "fresh-cook timing remains separate from official leftover reheat safety");
  hasOfficialReferences(dish, false);
});
