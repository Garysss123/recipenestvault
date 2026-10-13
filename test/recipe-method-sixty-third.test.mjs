import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["chana-masala", "red-curry-pork", "blanquette-de-veau", "miyeok-guk"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialUrls = {
  meatTemperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker"
};

function recipe(id) {
  const result = byId.get(id);
  assert.ok(result, `${id}: published recipe exists`);
  return result;
}

function everyLocale(value, patterns, message) {
  for (const locale of localeOrder) assert.match(value[locale], patterns[locale], `${locale}: ${message}`);
}

function hasOfficial(recipe, ...keys) {
  for (const key of keys) {
    const url = officialUrls[key];
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: distinct official reference for ${key}`);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${recipe.id}: at least two culinary references remain listed`);
}

test("sixty-third batch adds four unchecked, non-excluded slugs to the shared five-locale ledger", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledger = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledger, "shared exact-slug ledger exists");
  const covered = [...ledger.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionList = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionList, "standing old-patch exclusion list exists");
  const excluded = [...exclusionList.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(covered.length, 296);
  assert.equal(new Set(covered).size, 296);
  assert.deepEqual(covered.slice(-48, -44), ids);
  assert.equal(covered.slice(0, -48).length, 248);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !covered.slice(0, -48).includes(id)), "all four were unchecked at the exact starting baseline");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none is among the 18 standing exclusions");
  assert.equal(recipes.length - excluded.length - covered.length, 39);

  for (const id of ids) {
    const published = recipe(id);
    const draft = draftById.get(id);
    assert.ok(draft, `${id}: original recipe draft exists`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: method length is unchanged`);
    assert.deepEqual(published.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: scene-to-step illustration mapping is unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration mapping count is retained`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    assert.ok(illustrations.every((entry) => entry.setComplete && entry.visualMatchApproved && entry.nonPhotographic),
      `${id}: illustration metadata is still approved`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: publication method changed without mutating draft`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: publication storage changed without mutating draft`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: publication references changed without mutating draft`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: total estimate adds up`);
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: translated ingredients are complete`);
      assert.ok(published.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: translated method is complete`);
      assert.ok(published.storage[locale], `${id}/${locale}: translated storage guidance exists`);
    }
  }
});

test("chana masala allocates seasoning and reserved liquid and distinguishes quality from storage safety", () => {
  const dish = recipe("chana-masala");
  assert.deepEqual([dish.prepMinutes, dish.cookMinutes, dish.totalMinutes, dish.servings], [500, 100, 600, 4]);
  everyLocale(dish.instructions[0].body, {
    en: /refrigerate for 8 hours[\s\S]*480-minute soak[\s\S]*500-minute prep estimate/,
    "zh-hant": /冷藏浸泡 8 小時[\s\S]*480 分鐘浸泡[\s\S]*500 分鐘備料估時/,
    ja: /冷蔵庫で8時間[\s\S]*480分の浸水[\s\S]*準備時間500分/,
    ko: /냉장고에서 8시간[\s\S]*480분 불림[\s\S]*준비 시간 500분/,
    th: /แช่เย็น 8 ชั่วโมง[\s\S]*แช่ 480 นาที[\s\S]*เวลาเตรียม 500 นาที/
  }, "soak is refrigerated and included in prep estimate");
  everyLocale(dish.instructions[3].body, {
    en: /6 g ground coriander[\s\S]*4 g Kashmiri chile powder[\s\S]*2 g turmeric[\s\S]*5 g of the listed 8 g salt/,
    "zh-hant": /6 公克芫荽粉[\s\S]*4 公克喀什米爾辣椒粉[\s\S]*2 公克薑黃[\s\S]*8 公克鹽中的 5 公克/,
    ja: /コリアンダー粉6g[\s\S]*カシミールチリ4g[\s\S]*ターメリック2g[\s\S]*塩8gのうち5g/,
    ko: /고수 가루 6g[\s\S]*카슈미르 고춧가루 4g[\s\S]*강황 2g[\s\S]*소금 8g 중 5g/,
    th: /ผงผักชี 6 กรัม[\s\S]*พริกแคชเมียร์ 4 กรัม[\s\S]*ขมิ้น 2 กรัม[\s\S]*เกลือ 5 กรัมจากทั้งหมด 8 กรัม/
  }, "all measured spice and first salt allocation is explicit");
  everyLocale(dish.instructions[4].body, {
    en: /400 ml of the reserved cooking liquid[\s\S]*remaining 100 ml/,
    "zh-hant": /保留煮豆水中的 400 毫升[\s\S]*剩餘 100 毫升/,
    ja: /煮汁のうち400ml[\s\S]*残りの煮汁100ml/,
    ko: /삶은 물 중 400ml[\s\S]*남은 물 100ml/,
    th: /น้ำต้มที่เก็บไว้ 400 มล\.[\s\S]*น้ำต้มอีก 100 มล\./
  }, "reserved liquid is fully allocated");
  everyLocale(dish.instructions[5].body, {
    en: /remaining 3 g salt[\s\S]*30 ml at a time/,
    "zh-hant": /剩餘 3 公克鹽[\s\S]*每次加入 30 毫升/,
    ja: /残りの塩3g[\s\S]*30mlずつ/,
    ko: /남은 소금 3g[\s\S]*30ml씩/,
    th: /เกลือที่เหลือ 3 กรัม[\s\S]*ครั้งละ 30 มล\./
  }, "remaining salt and liquid adjustment are specified");
  everyLocale(dish.storage, {
    en: /best texture, use within 3 days[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /保持最佳口感[\s\S]*3 天內食用[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /食感のため3日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /식감은 3일 안에[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /เนื้อสัมผัสดีที่สุด[\s\S]*ภายใน 3 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality preference is distinct from official storage window and reheating endpoint");
  hasOfficial(dish, "handling", "storage");
});

test("red curry pork uses the whole-cut endpoint and separates leftover rice handling", () => {
  const dish = recipe("red-curry-pork");
  assert.deepEqual([dish.prepMinutes, dish.cookMinutes, dish.totalMinutes, dish.servings], [25, 37, 62, 4]);
  everyLocale(dish.instructions[4].body, {
    en: /vegetable-texture estimate[\s\S]*whole-muscle shoulder slices, not ground pork[\s\S]*63°C \(145°F\)[\s\S]*3-minute rest/,
    "zh-hant": /蔬菜口感估時[\s\S]*整塊豬肩切片、不是絞肉[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘/,
    ja: /野菜の食感の目安[\s\S]*ひき肉ではなく塊肉[\s\S]*63°C（145°F）[\s\S]*3分休ませ/,
    ko: /채소 식감 예상 시간[\s\S]*간 고기가 아닌 통근육[\s\S]*63°C \(145°F\)[\s\S]*3분 쉰다/,
    th: /ค่าประมาณด้านเนื้อสัมผัสผัก[\s\S]*ไม่ใช่หมูบด[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที/
  }, "meat endpoint matches whole-cut pork and differs from quality timing");
  everyLocale(dish.instructions[6].body, {
    en: /137\.5 g raw-pork equivalent[\s\S]*50 g eggplant[\s\S]*50 g bamboo shoots[\s\S]*150 g hot cooked jasmine rice/,
    "zh-hant": /137\.5 公克生豬肉等量[\s\S]*50 公克茄子[\s\S]*50 公克竹筍[\s\S]*150 公克熱熟茉莉香米/,
    ja: /生肉換算で約137\.5g[\s\S]*なす50g[\s\S]*たけのこ50g[\s\S]*ジャスミンライス150g/,
    ko: /생고기 기준 약 137\.5g[\s\S]*가지 50g[\s\S]*죽순 50g[\s\S]*재스민밥 150g/,
    th: /หมูเทียบเท่าน้ำหนักดิบประมาณ 137\.5 กรัม[\s\S]*มะเขือ 50 กรัม[\s\S]*หน่อไม้ 50 กรัม[\s\S]*ข้าวหอมมะลิหุงสุกอุ่น 150 กรัม/
  }, "four plate allocations are explicit");
  everyLocale(dish.storage, {
    en: /2 hours[\s\S]*Three days is a quality preference[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*leftover rice separately[\s\S]*within 1 hour[\s\S]*within 24 hours[\s\S]*only once/,
    "zh-hant": /2 小時內[\s\S]*3 天內食用是口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*剩飯須另行存放[\s\S]*1 小時內[\s\S]*24 小時內[\s\S]*只復熱一次/,
    ja: /2時間以内[\s\S]*3日以内は品質上[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*残ったご飯は別に保存[\s\S]*1時間以内[\s\S]*24時間以内[\s\S]*一度だけ/,
    ko: /2시간 안에[\s\S]*3일은 품질[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*남은 밥은 따로[\s\S]*1시간 안에[\s\S]*24시간 안에[\s\S]*한 번만/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*3 วันเป็นคำแนะนำด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*เก็บข้าวที่เหลือแยก[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*อุ่นครั้งเดียว/
  }, "stew and rice have distinct safe cooling and reheating instructions");
  hasOfficial(dish, "meatTemperatures", "handling", "storage", "rice");
  assert.ok(dish.sources.some((source) => source.url === "https://www.paintthekitchenred.com/thai-red-curry-pork/"));
  assert.ok(dish.sources.some((source) => source.url === "https://www.bbcgoodfood.com/recipes/thai-pork-peanut-curry"));
});

test("blanquette separates tenderness, whole-cut veal, egg sauce, stew storage, and rice safety", () => {
  const dish = recipe("blanquette-de-veau");
  everyLocale(dish.instructions[2].body, {
    en: /remaining 1\.5 L water[\s\S]*250 g carrots[\s\S]*180 g leek whites[\s\S]*4 g of the 6 g salt[\s\S]*90–110 minutes[\s\S]*tenderness estimate[\s\S]*63°C \(145°F\)[\s\S]*3-minute rest/,
    "zh-hant": /剩餘 1\.5 公升水[\s\S]*250 公克紅蘿蔔[\s\S]*180 公克韭蔥白[\s\S]*6 公克鹽中的 4 公克[\s\S]*90–110 分鐘[\s\S]*柔軟度估時[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘/,
    ja: /残りの水1\.5L[\s\S]*にんじん250g[\s\S]*塩6gのうち4g[\s\S]*90〜110分[\s\S]*柔らかさの目安[\s\S]*63°C（145°F）[\s\S]*3分休ませ/,
    ko: /남은 물 1\.5L[\s\S]*당근 250g[\s\S]*소금 6g 중 4g[\s\S]*90–110분[\s\S]*부드러움 추정 시간[\s\S]*63°C \(145°F\)[\s\S]*3분/,
    th: /น้ำที่เหลือ 1\.5 ลิตร[\s\S]*แครอท 250 กรัม[\s\S]*เกลือ 4 กรัมจากทั้งหมด 6 กรัม[\s\S]*90–110 นาที[\s\S]*ค่าประมาณความนุ่ม[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที/
  }, "poaching ingredients, texture timing, and whole-cut endpoint are explicit");
  everyLocale(dish.instructions[7].body, {
    en: /2 egg yolks[\s\S]*80–82°C[\s\S]*do not boil[\s\S]*lists 71°C \(160°F\) for egg dishes[\s\S]*safety endpoint/,
    "zh-hant": /2 顆蛋黃[\s\S]*80–82°C[\s\S]*不可煮沸[\s\S]*對蛋料理列出的安全標準為 71°C（160°F）/,
    ja: /卵黄2個[\s\S]*80〜82°C[\s\S]*沸騰させると卵が固まる[\s\S]*卵料理の安全基準は71°C（160°F）/,
    ko: /달걀노른자 2개[\s\S]*80–82°C[\s\S]*끓이면 달걀이 응고[\s\S]*달걀 요리 안전 기준은 71°C \(160°F\)/,
    th: /ไข่แดง 2 ฟอง[\s\S]*80–82°C[\s\S]*ห้ามต้มเดือด[\s\S]*เกณฑ์ความปลอดภัยสำหรับเมนูไข่ที่ 71°C \(160°F\)/
  }, "egg safety endpoint is separate from sauce method target");
  everyLocale(dish.storage, {
    en: /Three days is a sauce-quality preference[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*cooked rice separately[\s\S]*within 1 hour[\s\S]*within 24 hours[\s\S]*only once/,
    "zh-hant": /3 天內食用是白醬品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*熟飯須另行存放[\s\S]*1 小時內[\s\S]*24 小時內[\s\S]*只復熱一次/,
    ja: /3日以内はソースの品質上[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*炊いたご飯は別に保存[\s\S]*1時間以内[\s\S]*24時間以内[\s\S]*一度だけ/,
    ko: /3일은 소스 품질[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*밥은 따로 보관[\s\S]*1시간 안에[\s\S]*24시간 안에[\s\S]*한 번만/,
    th: /3 วันเป็นคำแนะนำด้านคุณภาพซอส[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*เก็บข้าวสุกแยกต่างหาก[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*อุ่นครั้งเดียว/
  }, "stew quality and rice safety/storage windows are separated");
  hasOfficial(dish, "meatTemperatures", "handling", "storage", "rice");
});

test("miyeok-guk allocates marinade, portions, and whole-cut brisket safety", () => {
  const dish = recipe("miyeok-guk");
  assert.deepEqual([dish.prepMinutes, dish.cookMinutes, dish.totalMinutes, dish.servings], [20, 40, 60, 4]);
  everyLocale(dish.instructions[3].body, {
    en: /about 4 minutes depending on pot and burner/,
    "zh-hant": /約煮 4 分鐘[\s\S]*視鍋具與爐火而異/,
    ja: /鍋や火力により異なりますが約4分/,
    ko: /냄비와 화력에 따라 다르지만 약 4분/,
    th: /ประมาณ 4 นาที[\s\S]*ขึ้นกับหม้อและเตา/
  }, "broth bring-up estimate is included in the cook total");
  everyLocale(dish.instructions[1].body, {
    en: /10 ml of the listed 30 ml soup soy sauce[\s\S]*5 ml of the 20 ml sesame oil[\s\S]*refrigerate 10 minutes/,
    "zh-hant": /30 毫升湯醬油中的 10 毫升[\s\S]*20 毫升芝麻油中的 5 毫升[\s\S]*冷藏 10 分鐘/,
    ja: /薄口しょうゆ30mlのうち10ml[\s\S]*ごま油20mlのうち5ml[\s\S]*10分冷蔵/,
    ko: /국간장 30ml 중 10ml[\s\S]*참기름 20ml 중 5ml[\s\S]*10분 냉장/,
    th: /ซีอิ๊วซุป 10 มล\.[\s\S]*น้ำมันงา 5 มล\.[\s\S]*แช่เย็น 10 นาที/
  }, "marinade liquid and oil are allocated from recipe totals");
  everyLocale(dish.instructions[4].body, {
    en: /texture estimate, not the meat-safety check[\s\S]*whole-muscle beef rather than ground meat[\s\S]*63°C \(145°F\)[\s\S]*3-minute rest/,
    "zh-hant": /口感估時，不是肉類安全檢查[\s\S]*整塊牛肉切片、不是絞肉[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘/,
    ja: /食感の目安で、安全確認そのものではありません[\s\S]*ひき肉ではなく牛肉塊[\s\S]*63°C（145°F）[\s\S]*3分休ませる/,
    ko: /식감 예상 시간이지 고기 안전 확인이 아니다[\s\S]*다진 고기가 아닌 통근육[\s\S]*63°C \(145°F\)[\s\S]*3분 휴지/,
    th: /ค่าประมาณเนื้อสัมผัส ไม่ใช่การตรวจความปลอดภัย[\s\S]*กล้ามเนื้อเต็มไม่ใช่เนื้อบด[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที/
  }, "beef brisket is treated as whole muscle rather than ground meat");
  everyLocale(dish.instructions[5].body, {
    en: /remaining 20 ml soup soy sauce[\s\S]*up to the listed 5 g salt[\s\S]*62\.5 g raw-beef equivalent[\s\S]*7\.5 g dried-seaweed equivalent/,
    "zh-hant": /剩餘 20 毫升湯醬油[\s\S]*最多 5 公克鹽[\s\S]*生牛肉等量 62\.5 公克[\s\S]*乾海帶等量 7\.5 公克/,
    ja: /薄口しょうゆ20ml[\s\S]*塩5gまで[\s\S]*生の牛肉換算約62\.5g[\s\S]*乾燥わかめ換算7\.5g/,
    ko: /국간장 20ml[\s\S]*소금 최대 5g[\s\S]*생고기 기준 약 62\.5g[\s\S]*마른 미역 기준 7\.5g/,
    th: /ซีอิ๊วซุปที่เหลือ 20 มล\.[\s\S]*เกลือที่ระบุไม่เกิน 5 กรัม[\s\S]*เนื้อดิบประมาณ 62\.5 กรัม[\s\S]*สาหร่ายแห้ง 7\.5 กรัม/
  }, "finishing portions, soy sauce, salt, and four-bowl serving are explicit");
  everyLocale(dish.storage, {
    en: /Three days is a texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /建議 3 天內食用是口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /3日以内は食感上のおすすめ[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /3일은 식감을 위한 권장[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /3 วันเป็นคำแนะนำด้านเนื้อสัมผัส[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality horizon and official storage/reheating guidance are distinct");
  hasOfficial(dish, "meatTemperatures", "handling", "storage");
});
