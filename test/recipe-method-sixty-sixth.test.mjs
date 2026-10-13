import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["jjajangmyeon", "bun-bo-nam-bo", "escondidinho-de-carne-seca", "french-onion-soup"];
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
    `${dish.id}: at least two culinary sources remain`);
}

test("sixty-sixth batch extends the exact slug ledger by four unchecked, non-excluded recipes", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const previous = covered.slice(0, -16);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "standing exclusion list exists");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(previous.length, 260);
  assert.equal(new Set(previous).size, 260);
  assert.equal(covered.length, 276);
  assert.equal(new Set(covered).size, 276);
  assert.deepEqual(covered.slice(-16, -12), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - previous.length, 75);
  assert.equal(recipes.length - excluded.length - covered.length, 59);
  assert.ok(ids.every((id) => !previous.includes(id)), "selected IDs were absent from the exact starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "no selected ID is excluded");
});

test("the four methods keep their source drafts, step counts, and existing illustration mappings", () => {
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
    hasOfficialReferences(published);
  }
});

test("jjajangmyeon distinguishes whole-cut pork, allocates oil and portions, and separates quality from safety", () => {
  const dish = recipe("jjajangmyeon");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 30, 39, 69]);
  assert.match(dish.ingredients.find((row) => row.item.en.startsWith("skinless pork belly"))?.item.en ?? "", /intact, unground/);
  everyLocale(dish.instructions[2].body, {
    en: /remaining 20 ml oil[\s\S]*intact-cut, unground[\s\S]*63°C \(145°F\)[\s\S]*rest at least 3 minutes[\s\S]*30 ml remains/,
    "zh-hant": /剩餘的 20 毫升油[\s\S]*整塊切丁、未絞製[\s\S]*63°C（145°F）[\s\S]*至少靜置 3 分鐘[\s\S]*留 30 毫升/,
    ja: /残りの油20ml[\s\S]*ひき肉ではない[\s\S]*63°C（145°F）[\s\S]*少なくとも3分休ませ[\s\S]*30mlだけ残し/,
    ko: /남은 기름 20ml[\s\S]*갈지 않은 통삼겹살[\s\S]*63°C \(145°F\)[\s\S]*최소 3분 쉰다[\s\S]*30ml만 남기고/,
    th: /น้ำมันที่เหลือ 20 มล\.[\s\S]*ชิ้นเต็มและไม่บด[\s\S]*63°C \(145°F\)[\s\S]*พักอย่างน้อย 3 นาที[\s\S]*เหลือ 30 มล\./
  }, "whole-cut pork uses the 63°C endpoint and rest, not the ground-meat category");
  everyLocale(dish.instructions[6].body, {
    en: /all 30 g potato starch[\s\S]*all 60 ml cold water[\s\S]*39-minute cook estimate[\s\S]*not the browning time/,
    "zh-hant": /全部 30 公克馬鈴薯澱粉[\s\S]*全部 60 毫升冷水[\s\S]*39 分鐘烹調估時[\s\S]*不以煎色或時間判定/,
    ja: /片栗粉30g全量[\s\S]*冷水60ml全量[\s\S]*調理時間39分[\s\S]*焼き色や時間ではなく/,
    ko: /감자전분 30g 전량[\s\S]*찬물 60ml 전량[\s\S]*조리 시간 추정 39분[\s\S]*갈색이나 시간 대신/,
    th: /แป้งมันฝรั่ง 30 กรัมทั้งหมด[\s\S]*น้ำเย็น 60 มล\.ทั้งหมด[\s\S]*ประมาณ 39 นาที[\s\S]*ไม่ใช่สีหรือเวลา/
  }, "the measured slurry and cook estimate are explicit and separate from safety");
  everyLocale(dish.instructions[9].body, {
    en: /four bowls \(150 g each\)[\s\S]*75 g raw-weight equivalent[\s\S]*four 25 g portions/,
    "zh-hant": /4 個碗（每碗 150 公克）[\s\S]*生重換算 75 公克[\s\S]*每份 25 公克/,
    ja: /4つの器に150gずつ[\s\S]*生の豚肉換算約75g[\s\S]*25gずつ/,
    ko: /네 그릇에 150g씩[\s\S]*생고기 기준 약 75g[\s\S]*25g씩/,
    th: /4 ชาม ชามละ 150 กรัม[\s\S]*หมูดิบเทียบเท่าประมาณ 75 กรัม[\s\S]*ส่วนละ 25 กรัม/
  }, "noodles, pork, sauce, vegetables, and garnish are divided across servings");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Two days is a noodle-texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*麵條建議 2 天內食用是口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*麺の食感のため2日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*면 식감을 위한 2일[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*เส้นภายใน 2 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "the quality window is separate from official leftover and reheating guidance");
});

test("bun bo Nam Bo uses the whole-cut beef endpoint and apportions the salad", () => {
  const dish = recipe("bun-bo-nam-bo");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 35, 18, 53]);
  everyLocale(dish.instructions[5].body, {
    en: /remaining 20 ml oil[\s\S]*intact beef must reach 63°C \(145°F\)[\s\S]*rest at least 3 minutes/,
    "zh-hant": /剩餘 20 毫升油[\s\S]*整塊牛肉須達 63°C（145°F）[\s\S]*至少靜置 3 分鐘/,
    ja: /残りの油20ml[\s\S]*塊肉の牛肉は63°C（145°F）[\s\S]*少なくとも3分休ませ/,
    ko: /남은 기름 20ml[\s\S]*통고기 소고기는 63°C \(145°F\)[\s\S]*최소 3분 쉰다/,
    th: /น้ำมัน 10 มล\.จาก 20 มล\.ที่เหลือ[\s\S]*เนื้อวัวชิ้นเต็มต้องถึง 63°C \(145°F\)[\s\S]*พักอย่างน้อย 3 นาที/
  }, "each thin-beef batch has a thermometer endpoint and rest, independent of the time estimate");
  everyLocale(dish.instructions[6].body, {
    en: /18-minute cook estimate/,
    "zh-hant": /18 分鐘烹調估時/,
    ja: /調理時間18分の目安/,
    ko: /조리 시간 추정 18분/,
    th: /เวลาเคี่ยวประมาณ 18 นาที/
  }, "the complete cooking estimate is localized");
  everyLocale(dish.instructions[6].body, {
    en: /four bowls[\s\S]*125 g raw-beef equivalent per bowl[\s\S]*40 g peanuts[\s\S]*25 g fried shallots/,
    "zh-hant": /4 碗[\s\S]*約相當於 125 公克生牛肉[\s\S]*40 公克花生[\s\S]*25 公克炸紅蔥酥/,
    ja: /4つの器[\s\S]*生肉換算約125g[\s\S]*ピーナッツ40g[\s\S]*フライドエシャロット25g/,
    ko: /네 그릇[\s\S]*생고기 기준 약 125g[\s\S]*땅콩 40g[\s\S]*튀긴 샬롯 25g/,
    th: /4 ชาม[\s\S]*เนื้อดิบประมาณ 125 กรัมต่อชาม[\s\S]*ถั่วลิสง 40 กรัม[\s\S]*หอมเจียว 25 กรัม/
  }, "beef, nuts, shallots, herbs, and dressing are divided consistently");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*3–4 days[\s\S]*within 1 day[\s\S]*quality preference[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*3–4 天[\s\S]*1 天內組裝[\s\S]*品質偏好[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*3〜4日[\s\S]*1日以内[\s\S]*品質上の目安[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*3–4일[\s\S]*하루 안에[\s\S]*품질 기준[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*3–4 วัน[\s\S]*ภายใน 1 วัน[\s\S]*คุณภาพ[\s\S]*74°C\/165°F/
  }, "official beef-leftover storage and reheating are distinct from a short crispness preference");
});

test("escondidinho aligns the cook estimate, casserole endpoint, six portions, and leftovers", () => {
  const dish = recipe("escondidinho-de-carne-seca");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [6, 35, 65, 100]);
  everyLocale(dish.instructions[5].body, {
    en: /20–25 minutes[\s\S]*74°C \(165°F\)[\s\S]*5 minutes more[\s\S]*quality cues, not the safety endpoint/,
    "zh-hant": /20–25 分鐘[\s\S]*74°C（165°F）[\s\S]*續烤 5 分鐘[\s\S]*不是安全終點/,
    ja: /20〜25分[\s\S]*74°C（165°F）[\s\S]*5分ずつ追加[\s\S]*安全終点ではありません/,
    ko: /20–25분[\s\S]*74°C \(165°F\)[\s\S]*5분씩 더 굽고[\s\S]*안전 기준이 아니다/,
    th: /20–25 นาที[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 5 นาที[\s\S]*ไม่ใช่จุดปลอดภัย/
  }, "the casserole safety endpoint is measured independently of bake time and browning");
  everyLocale(dish.instructions[6].body, {
    en: /six equal portions[\s\S]*about 100 g cooked carne seca[\s\S]*about 167 g before boiling[\s\S]*about 17 g each/,
    "zh-hant": /平均分成 6 份[\s\S]*約 100 公克熟牛肉絲[\s\S]*煮前約 167 公克[\s\S]*各約 17 公克/,
    ja: /6等分[\s\S]*牛肉約100g[\s\S]*ゆでる前で約167g[\s\S]*各約17g/,
    ko: /여섯 등분[\s\S]*카르네 세카 약 100g[\s\S]*삶기 전 약 167g[\s\S]*각각 약 17g씩/,
    th: /6 ส่วนเท่า ๆ กัน[\s\S]*ประมาณ 100 กรัม[\s\S]*ประมาณ 167 กรัมก่อนต้ม[\s\S]*อย่างละประมาณ 17 กรัม/
  }, "cassava, cooked beef, and dairy allocations are stated per serving");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Three days is a cassava-texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*3 天內食用是品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*3日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*3일[\s\S]*품질 기준[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 3 วัน[\s\S]*คุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "the texture preference is separate from official leftovers guidance and reheat temperature");
});

test("French onion soup accounts for oven finishes, bowl portions, and reheating", () => {
  const dish = recipe("french-onion-soup");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 20, 100, 120]);
  everyLocale(dish.instructions[2].body, {
    en: /40–50 minutes[\s\S]*60 ml reserved water[\s\S]*not food-safety endpoints[\s\S]*100-minute cook estimate/,
    "zh-hant": /40–50 分鐘[\s\S]*預留的 60 毫升水[\s\S]*不是食安終點[\s\S]*100 分鐘烹調估時/,
    ja: /40〜50分[\s\S]*取り置き水60ml[\s\S]*食品安全の終点ではありません[\s\S]*調理時間100分/,
    ko: /40–50분[\s\S]*남겨 둔 물 60ml[\s\S]*식품 안전 종점이 아니다[\s\S]*조리 시간 추정 100분/,
    th: /40–50 นาที[\s\S]*น้ำที่สำรองไว้[\s\S]*ไม่ใช่จุดความปลอดภัย[\s\S]*เวลาเคี่ยว 100 นาที/
  }, "caramelization time is labelled as flavour/texture guidance and reconciled with total cook estimate");
  everyLocale(dish.instructions[6].body, {
    en: /four broiler-safe bowls[\s\S]*375 ml per bowl[\s\S]*two of the eight[\s\S]*30 g/,
    "zh-hant": /4 個耐烤碗[\s\S]*每碗約 375 毫升[\s\S]*8 片[\s\S]*30 公克/,
    ja: /器4つ[\s\S]*各約375ml[\s\S]*8切れのうち2切れ[\s\S]*30g/,
    ko: /그릇 네 개[\s\S]*375ml씩[\s\S]*8쪽 중 두 쪽[\s\S]*30g/,
    th: /4 ใบ[\s\S]*ใบละประมาณ 375 มล\.[\s\S]*8 ชิ้น[\s\S]*30 กรัม/
  }, "stock, bread, cheese, and herbs are allocated evenly to four bowls");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*3–4 days[\s\S]*quality preference[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*3–4 天[\s\S]*品質偏好[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*3〜4日[\s\S]*品質上の好み[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*3–4일[\s\S]*품질 선호[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*3–4 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*74°C\/165°F/
  }, "refrigeration and reheating guidance is official while toast texture remains a separate preference");
});
