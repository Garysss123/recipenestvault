import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["tom-kha-gai", "ba-wan", "philly-cheesesteak", "bun-bo-hue"];
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

function hasOfficialReferences(dish) {
  for (const [key, url] of Object.entries(officialUrls)) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official ${key} source is listed`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: two culinary sources remain`);
}

test("sixty-fourth batch extends the exact ledger by four unchecked, non-excluded slugs", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledger = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledger, "shared exact-slug ledger exists");
  const covered = [...ledger.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusions = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusions, "standing exclusion list exists");
  const excluded = [...exclusions.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(covered.length, 300);
  assert.equal(new Set(covered).size, 300);
  assert.deepEqual(covered.slice(-48, -44), ids);
  assert.equal(covered.slice(0, -48).length, 252);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - covered.slice(0, -44).length, 79);
  assert.equal(recipes.length - excluded.length - covered.slice(0, -40).length, 75);
  assert.equal(recipes.length - excluded.length - covered.length, 35);
  assert.ok(ids.every((id) => !covered.slice(0, -48).includes(id)), "the selected slugs were absent from the exact starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "no selected slug is on the standing exclusion list");
});

test("the four revisions keep source drafts and illustration mapping while completing five-locale methods", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = draftById.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: publication method was revised`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: publication storage guidance was revised`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: publication references were reviewed`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time estimate adds up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: original step count is retained`);
    assert.deepEqual(published.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: each step retains its original illustration scene mapping`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: each step still has an illustration`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient amounts and names exist`);
      assert.ok(published.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: every method step exists`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage and reheating guidance exists`);
    }
    hasOfficialReferences(published);
  }
});

test("tom kha gai marks the poultry endpoint, serving allocation, timing estimate, and leftover standard", () => {
  const dish = recipe("tom-kha-gai");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 20, 30, 50]);
  everyLocale(dish.instructions[2].body, {
    en: /estimated 6–8 minutes[\s\S]*thickest slices[\s\S]*poultry must reach 74°C \(165°F\)[\s\S]*check again/,
    "zh-hant": /約 6–8 分鐘[\s\S]*最厚處[\s\S]*禽肉每片都須達 74°C（165°F）[\s\S]*再測/,
    ja: /目安として6〜8分[\s\S]*最も厚い部分[\s\S]*鶏肉は全て74°C（165°F）[\s\S]*再確認/,
    ko: /추정 6–8분[\s\S]*가장 두꺼운 조각[\s\S]*모든 가금류 조각은 74°C \(165°F\)[\s\S]*다시 잰다/,
    th: /ประมาณ 6–8 นาที[\s\S]*ส่วนหนาที่สุด[\s\S]*ไก่ทุกชิ้นที่ตรวจต้องถึง 74°C \(165°F\)[\s\S]*วัดซ้ำ/
  }, "time and appearance are estimates; poultry has its own safe endpoint");
  everyLocale(dish.instructions[5].body, {
    en: /125 g raw-chicken equivalent[\s\S]*62\.5 g raw mushrooms[\s\S]*250 ml each[\s\S]*15 g cilantro/,
    "zh-hant": /125 公克生雞肉[\s\S]*62\.5 公克生菇[\s\S]*250 毫升[\s\S]*15 公克香菜/,
    ja: /生の鶏肉換算約125g[\s\S]*約62\.5g[\s\S]*約250ml[\s\S]*パクチー15g全量/,
    ko: /생닭 기준 약 125g[\s\S]*62\.5g[\s\S]*약 250ml[\s\S]*고수 15g 전량/,
    th: /ไก่ดิบประมาณ 125 กรัม[\s\S]*เห็ดดิบ 62\.5 กรัม[\s\S]*250 มล\.[\s\S]*ผักชี 15 กรัมทั้งหมด/
  }, "four bowl allocations are explicit");
  everyLocale(dish.storage, {
    en: /texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /食感を重視[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /식감을 위한[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ด้านเนื้อสัมผัส[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality preference is distinct from safe storage and reheat guidance");
});

test("ba-wan allocates the dough and sauce, checks pork pieces rather than wrapper, and reheats safely", () => {
  const dish = recipe("ba-wan");
  assert.equal(dish.servings, 8);
  assert.equal(dish.ingredients.find((row) => row.amount === "520 ml").item.en, "water for dough: 220 ml cold and 300 ml boiling");
  assert.equal(dish.ingredients.find((row) => row.amount === "30 ml").item.en, "neutral oil for dough, plus a measured 5 ml for the molds");
  assert.ok(dish.ingredients.some((row) => row.amount === "3 g" && row.item.en === "granulated sugar for filling"));
  assert.ok(dish.ingredients.some((row) => row.amount === "2 g" && row.item.en === "ground white pepper for filling"));
  everyLocale(dish.instructions[3].body, {
    en: /all of it into 8 equal portions[\s\S]*two-thirds[\s\S]*4–5 mm[\s\S]*lid/,
    "zh-hant": /全量平均分成 8 份[\s\S]*三分之二[\s\S]*4–5 毫米[\s\S]*封口/,
    ja: /全量を8等分[\s\S]*約3分の2[\s\S]*4〜5mm厚[\s\S]*ふた/,
    ko: /전부 8등분[\s\S]*약 3분의 2[\s\S]*4–5mm[\s\S]*덮개/,
    th: /แบ่งทั้งหมดเป็น 8 ส่วน[\s\S]*สองในสาม[\s\S]*4–5 มม\.[\s\S]*ปิดหน้า/
  }, "all wrapper dough and mold oil are divided");
  everyLocale(dish.instructions[5].body, {
    en: /estimated 28–32 minutes[\s\S]*centre of several[\s\S]*not just the wrapper or filling mixture[\s\S]*63°C \(145°F\)[\s\S]*not ground pork[\s\S]*rest at least 3 minutes/,
    "zh-hant": /估計蒸 28–32 分鐘[\s\S]*測量數個[\s\S]*不要只量外皮或整團餡料[\s\S]*63°C（145°F）[\s\S]*不是豬絞肉[\s\S]*靜置至少 3 分鐘/,
    ja: /目安28〜32分[\s\S]*皮や具全体ではなく[\s\S]*角切りを複数[\s\S]*63°C（145°F）[\s\S]*ひき肉ではなく[\s\S]*少なくとも3分/,
    ko: /추정 28–32분[\s\S]*피나 속 전체가 아니라[\s\S]*조각 여러 개의 중심[\s\S]*63°C \(145°F\)[\s\S]*다진 돼지고기가 아닌[\s\S]*최소 3분/,
    th: /ประมาณ 28–32 นาที[\s\S]*หมูไหล่หั่นเต๋า[\s\S]*ไม่ใช่วัดแค่แป้งหรือไส้รวม[\s\S]*63°C \(145°F\)[\s\S]*ไม่ใช่หมูบด[\s\S]*อย่างน้อย 3 นาที/
  }, "safety thermometer reads pork pieces; wrapper texture and cook time are not endpoints");
  everyLocale(dish.instructions[7].body, {
    en: /full batch of sauce evenly[\s\S]*50 ml per serving/,
    "zh-hant": /整批醬汁平均分配[\s\S]*50 毫升/,
    ja: /たれ全量を均等に分け[\s\S]*約50ml/,
    ko: /소스 전체를 균등하게 나눠[\s\S]*약 50ml/,
    th: /แบ่งซอสทั้งหมดเท่ากัน[\s\S]*50 มล\./
  }, "all sauce is allocated among the eight portions");
  everyLocale(dish.storage, {
    en: /wrapper-quality preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /外皮口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /皮の食感[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /피 식감[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /คุณภาพของแป้ง[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "wrapper quality is separate from leftover safety and reheating");
});

test("Philly cheesesteak keeps whole-cut beef distinct from ground beef and splits four portions", () => {
  const dish = recipe("philly-cheesesteak");
  everyLocale(dish.instructions[0].body, {
    en: /about 6 mm thick[\s\S]*thermometer can be inserted from the side/,
    "zh-hant": /約 6 毫米[\s\S]*溫度計可從側面插入中心/,
    ja: /約6mm[\s\S]*温度計を横から中心まで差し込める/,
    ko: /약 6mm[\s\S]*온도계 탐침을 옆에서 중심까지/,
    th: /ประมาณ 6 มม\.[\s\S]*เทอร์โมมิเตอร์จากด้านข้างถึงตรงกลาง/
  }, "thin slice thickness permits a centre temperature check");
  everyLocale(dish.instructions[3].body, {
    en: /thin-probe thermometer sideways[\s\S]*whole-muscle cut, not ground beef[\s\S]*63°C \(145°F\)[\s\S]*3 minutes[\s\S]*30-second increments/,
    "zh-hant": /細探針溫度計從側面[\s\S]*不是牛絞肉[\s\S]*63°C（145°F）[\s\S]*3 分鐘[\s\S]*30 秒/,
    ja: /細い温度計を横から[\s\S]*ひき肉ではなく[\s\S]*63°C（145°F）[\s\S]*3分[\s\S]*30秒/,
    ko: /얇은 온도계 탐침을 옆에서[\s\S]*다진 고기가 아니므로[\s\S]*63°C \(145°F\)[\s\S]*3분[\s\S]*30초/,
    th: /หัววัดเทอร์โมมิเตอร์สะอาดจากด้านข้าง[\s\S]*ไม่ใช่เนื้อบด[\s\S]*63°C \(145°F\)[\s\S]*3 นาที[\s\S]*30 วินาที/
  }, "a thickest-slice probe replaces colour or time as the whole-cut endpoint");
  everyLocale(dish.instructions[4].body, {
    en: /all 7 g salt and all 2 g pepper[\s\S]*175 g raw-beef equivalent and 55 g raw onion/,
    "zh-hant": /全部 7 公克鹽和全部 2 公克胡椒[\s\S]*175 公克生牛肉[\s\S]*55 公克生洋蔥/,
    ja: /塩7g全量とこしょう2g全量[\s\S]*約175g[\s\S]*約55g/,
    ko: /소금 7g과 후추 2g 전량[\s\S]*약 175g[\s\S]*55g/,
    th: /เกลือ 7 กรัมและพริกไทย 2 กรัมทั้งหมด[\s\S]*175 กรัม[\s\S]*55 กรัม/
  }, "salt and pepper are fully allocated to four sandwiches");
  everyLocale(dish.instructions[5].body, {
    en: /all 160 g provolone[\s\S]*40 g each/,
    "zh-hant": /全部 160 公克[\s\S]*40 公克/,
    ja: /160g全量[\s\S]*各約40g/,
    ko: /160g 전량[\s\S]*약 40g/,
    th: /160 กรัมทั้งหมด[\s\S]*40 กรัม/
  }, "cheese is allocated to the four portions");
  everyLocale(dish.storage, {
    en: /quality choice[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /品質選擇[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /品質を重視[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /품질을 위한[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "leftover storage and reheating are not in service-time estimates");
});

test("bun bo hue keeps pork, whole-beef, and chilled-meat endpoints separate", () => {
  const dish = recipe("bun-bo-hue");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [6, 40, 240, 280]);
  everyLocale(dish.instructions[2].body, {
    en: /75–90 minutes[\s\S]*thickest pork piece away from bone[\s\S]*non-ground pork pieces[\s\S]*63°C \(145°F\)[\s\S]*3 minutes[\s\S]*within 2 hours/,
    "zh-hant": /75–90 分鐘[\s\S]*最厚的豬腳肉塊[\s\S]*非絞肉豬肉[\s\S]*63°C（145°F）[\s\S]*3 分鐘[\s\S]*2 小時內/,
    ja: /75〜90分[\s\S]*最も厚い豚肉片[\s\S]*ひき肉ではない[\s\S]*63°C（145°F）[\s\S]*3分[\s\S]*2時間以内/,
    ko: /75–90분[\s\S]*가장 두꺼운 돼지 족 조각[\s\S]*다진 고기가 아닌[\s\S]*63°C \(145°F\)[\s\S]*3분[\s\S]*2시간 안에/,
    th: /75–90 นาที[\s\S]*ชิ้นหมูส่วนที่หนาที่สุด[\s\S]*ไม่ใช่หมูบด[\s\S]*63°C \(145°F\)[\s\S]*3 นาที[\s\S]*ภายใน 2 ชั่วโมง/
  }, "pork hock pieces have the non-ground pork endpoint, rest, and cooling time");
  everyLocale(dish.instructions[6].body, {
    en: /3–3½ hours is a tenderness estimate[\s\S]*whole beef cut[\s\S]*63°C \(145°F\)[\s\S]*3 minutes/,
    "zh-hant": /3–3½ 小時是軟嫩度估時[\s\S]*整塊牛肉[\s\S]*63°C（145°F）[\s\S]*3 分鐘/,
    ja: /3〜3時間半は[\s\S]*目安[\s\S]*塊肉の牛肉[\s\S]*63°C（145°F）[\s\S]*3分/,
    ko: /3–3½시간은[\s\S]*추정치[\s\S]*통고기 소고기[\s\S]*63°C \(145°F\)[\s\S]*3분/,
    th: /3–3½ ชั่วโมงเป็นเวลา[\s\S]*ประมาณ[\s\S]*เนื้อวัวชิ้นเต็ม[\s\S]*63°C \(145°F\)[\s\S]*3 นาที/
  }, "beef endpoint is separate from braising tenderness time");
  everyLocale(dish.instructions[9].body, {
    en: /only the chilled pork hock[\s\S]*reheat this previously cooked, chilled meat to 74°C \(165°F\)[\s\S]*fresh beef already reached its whole-cut endpoint/,
    "zh-hant": /只有冷藏過的豬腳[\s\S]*已煮熟再冷藏的肉，復熱須達 74°C（165°F）[\s\S]*新鮮牛腱已達整塊肉安全標準/,
    ja: /冷蔵した豚肉だけ[\s\S]*74°C（165°F）まで再加熱[\s\S]*牛肉は塊肉の基準/,
    ko: /냉장했던 돼지 족만[\s\S]*74°C \(165°F\)까지 재가열[\s\S]*생 소고기는 통고기 기준/,
    th: /เฉพาะคากิหมูที่แช่เย็น[\s\S]*74°C \(165°F\)[\s\S]*เนื้อวัวเพิ่งสุกและพักตามเกณฑ์ชิ้นเต็ม/
  }, "only chilled cooked pork is brought to the leftover reheat endpoint");
  everyLocale(dish.storage, {
    en: /texture preference[\s\S]*3–4 days[\s\S]*every meat piece reach 74°C\/165°F/,
    "zh-hant": /口感偏好[\s\S]*3–4 天[\s\S]*每塊肉都達 74°C\/165°F/,
    ja: /食感の目安[\s\S]*3〜4日[\s\S]*全ての肉片が74°C\/165°F/,
    ko: /식감 기준[\s\S]*3–4일[\s\S]*모든 고기 조각이 74°C\/165°F/,
    th: /ด้านเนื้อสัมผัส[\s\S]*3–4 วัน[\s\S]*เนื้อทุกชิ้นถึง 74°C\/165°F/
  }, "soup storage texture preference is distinct from reheat requirement");
});
