import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["birria-de-res", "chilaquiles-verdes", "cullen-skink", "galaktoboureko"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialUrls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: recipe exists`);
  return recipe;
}

function everyLocale(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function official(recipe) {
  for (const url of Object.values(officialUrls)) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: applicable official guidance is listed separately: ${url}`);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${recipe.id}: at least two culinary references remain distinct from official safety guidance`);
}

test("sixty-second batch appends four previously unchecked, non-excluded slugs", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledger = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledger, "shared exact-slug ledger exists");
  const covered = [...ledger.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionList = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionList, "standing exclusion list exists");
  const excluded = [...exclusionList.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 280);
  assert.equal(new Set(covered).size, 280);
  assert.deepEqual(covered.slice(-36, -32), ids);
  assert.equal(covered.slice(0, -36).length, 244);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !covered.slice(0, -36).includes(id)), "each selection was absent from the 244-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "no selection is in the standing exclusions");
  assert.equal(recipes.length - excluded.length - covered.length, 55);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.equal(recipe.instructions.length, draft.instructions.length, `${id}: published step count is preserved`);
    assert.deepEqual(recipe.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: illustration scene mapping remains on its original step`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, recipe.instructions.length, `${id}: one existing illustration per step remains mapped`);
    assert.deepEqual(illustrations.map((entry) => entry.step), recipe.instructions.map((_, index) => index + 1),
      `${id}: illustration order matches the method`);
    assert.ok(illustrations.every((entry) => entry.setComplete && entry.visualMatchApproved && entry.nonPhotographic),
      `${id}: approved non-photographic illustration metadata remains intact`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: localized ingredients remain complete`);
      assert.ok(recipe.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: localized method remains complete`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: localized storage remains complete`);
    }
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: publication edits leave the source draft intact`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: storage edits leave the source draft intact`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: official references remain publication-only`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: time fields add up`);
    official(recipe);
  }
});

test("birria allocates salt, liquid, marinade, eight servings, and whole-cut beef safety", () => {
  const recipe = get("birria-de-res");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [290, 210, 500, 8]);
  everyLocale(recipe.instructions[0].body, {
    en: /2\.2 kg beef[\s\S]*8 g[\s\S]*16 g[\s\S]*4-hour minimum[\s\S]*290-minute prep/,
    "zh-hant": /2\.2 公斤牛肉[\s\S]*16 公克[\s\S]*8 公克[\s\S]*4 小時[\s\S]*290 分鐘/,
    ja: /牛肉2\.2kg[\s\S]*塩16gのうち8g[\s\S]*最低4時間[\s\S]*290分/,
    ko: /소고기 2\.2kg[\s\S]*소금 16g 중 8g[\s\S]*최소 4시간[\s\S]*290분/,
    th: /เนื้อวัว 2\.2 กก\.[\s\S]*เกลือ 8 กรัม[\s\S]*16 กรัม[\s\S]*อย่างน้อย 4 ชั่วโมง[\s\S]*290 นาที/
  }, "marinade is refrigerated and included in elapsed preparation time");
  everyLocale(recipe.instructions[5].body, {
    en: /250 ml[\s\S]*remaining 8 g salt[\s\S]*1,550 ml/,
    "zh-hant": /250 毫升[\s\S]*剩餘 8 公克鹽[\s\S]*1,550 毫升/,
    ja: /250ml[\s\S]*残りの塩8g[\s\S]*1,550ml/,
    ko: /250ml[\s\S]*남은 소금 8g[\s\S]*1,550ml/,
    th: /250 มล\.[\s\S]*เกลือที่เหลือ 8 กรัม[\s\S]*1,550 มล\./
  }, "adobo water, braising water, and salt are allocated");
  everyLocale(recipe.instructions[8].body, {
    en: /2 hours 30 minutes[\s\S]*tenderness estimate, not the safety check[\s\S]*not ground[\s\S]*63°C \(145°F\)[\s\S]*3 minutes/,
    "zh-hant": /2 小時 30 分鐘[\s\S]*嫩度估算，不是安全檢查[\s\S]*並非絞肉[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘/,
    ja: /約2時間30分[\s\S]*柔らかさの目安で、安全確認ではありません[\s\S]*ひき肉ではなく[\s\S]*63°C（145°F）[\s\S]*3分/,
    ko: /약 2시간 30분[\s\S]*부드러워지는 정도의 추정치이지 안전 확인이 아니다[\s\S]*다진 고기가 아니라[\s\S]*63°C \(145°F\)[\s\S]*3분/,
    th: /2 ชั่วโมง 30 นาที[\s\S]*ค่าประมาณความนุ่ม ไม่ใช่การตรวจความปลอดภัย[\s\S]*ไม่ใช่เนื้อบด[\s\S]*63°C \(145°F\)[\s\S]*3 นาที/
  }, "whole-cut endpoint and texture braise are distinct");
  everyLocale(recipe.instructions[11].body, {
    en: /eight bowls[\s\S]*275 g raw beef[\s\S]*15 g onion[\s\S]*4 g cilantro[\s\S]*half a lime/,
    "zh-hant": /八碗[\s\S]*275 公克生牛肉[\s\S]*15 公克洋蔥[\s\S]*4 公克香菜[\s\S]*半顆萊姆/,
    ja: /8杯[\s\S]*生肉換算約275g[\s\S]*玉ねぎ約15g[\s\S]*香菜約4g[\s\S]*半個/,
    ko: /여덟 그릇[\s\S]*생고기 기준 약 275g[\s\S]*양파 약 15g[\s\S]*고수 약 4g[\s\S]*반 개/,
    th: /8 ชาม[\s\S]*เนื้อดิบประมาณ 275 กรัม[\s\S]*หอมหัวใหญ่ประมาณ 15 กรัม[\s\S]*ผักชีประมาณ 4 กรัม[\s\S]*ครึ่งลูก/
  }, "eight-bowl allocation includes garnish portions");
  everyLocale(recipe.storage, {
    en: /separate shallow containers[\s\S]*within 2 hours[\s\S]*3 days[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /分別放入淺容器[\s\S]*2 小時內[\s\S]*3 天[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /別々の浅い容器[\s\S]*2時間以内[\s\S]*3日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /얕은 용기에 따로[\s\S]*2시간 안에[\s\S]*3일 안에[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภาชนะตื้นแยกกัน[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 3 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality preference, official leftover window, and reheating are separated");
});

test("chilaquiles portions chips and toppings and stores components separately", () => {
  const recipe = get("chilaquiles-verdes");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [35, 30, 65, 6]);
  assert.ok(recipe.sources.some((source) => source.url === "https://www.rickbayless.com/recipe/green-chilaquiles/"),
    "the second culinary source covers chilaquiles without an added chicken variant");
  everyLocale(recipe.instructions[0].body, {
    en: /18 tortillas[\s\S]*30 minutes[\s\S]*108 chips/,
    "zh-hant": /18 張玉米餅[\s\S]*30 分鐘[\s\S]*108 片/,
    ja: /トルティーヤ18枚[\s\S]*30分[\s\S]*計108枚/,
    ko: /또르티야 18장[\s\S]*30분[\s\S]*총 108조각/,
    th: /ตอร์ติญา 18 แผ่น[\s\S]*30 นาที[\s\S]*108 ชิ้น/
  }, "tortilla count and drying time");
  everyLocale(recipe.instructions[1].body, {
    en: /350 ml[\s\S]*175°C[\s\S]*2–3 minutes[\s\S]*not assume all 350 ml is absorbed/,
    "zh-hant": /350 毫升[\s\S]*175°C[\s\S]*2–3 分鐘[\s\S]*不代表 350 毫升全被吸收/,
    ja: /350ml[\s\S]*175°C[\s\S]*2〜3分[\s\S]*すべてが吸収されるわけではありません/,
    ko: /350ml[\s\S]*175°C[\s\S]*2–3분[\s\S]*전부 흡수되는 것이 아니다/,
    th: /350 มล\.[\s\S]*175°C[\s\S]*2–3 นาที[\s\S]*ไม่ได้หมายความว่าชิปจะดูดซับทั้งหมด/
  }, "frying oil is a measured medium, not an amount absorbed");
  everyLocale(recipe.instructions[5].body, {
    en: /108 chips[\s\S]*60–90 seconds[\s\S]*texture, not food safety/,
    "zh-hant": /108 片[\s\S]*60–90 秒[\s\S]*口感估計，不是食安標準/,
    ja: /108枚[\s\S]*60〜90秒[\s\S]*食感の目安で食品安全基準ではありません/,
    ko: /칩 108조각[\s\S]*60–90초[\s\S]*식감 추정치이지 식품 안전 기준이 아니다/,
    th: /ชิป 108 ชิ้น[\s\S]*60–90 วินาที[\s\S]*ค่าประมาณเนื้อสัมผัส ไม่ใช่เกณฑ์ความปลอดภัย/
  }, "short toss is a texture cue and happens just before service");
  everyLocale(recipe.instructions[6].body, {
    en: /six dishes[\s\S]*3 tortillas[\s\S]*25 g crema[\s\S]*30 g queso fresco/,
    "zh-hant": /六盤[\s\S]*3 張玉米餅[\s\S]*25 公克 crema[\s\S]*30 公克 queso fresco/,
    ja: /6皿[\s\S]*トルティーヤ3枚分[\s\S]*クレマ約25g[\s\S]*ケソ・フレスコ30g/,
    ko: /여섯 접시[\s\S]*또르티야 3장[\s\S]*크레마 약 25g[\s\S]*케소 프레스코 30g/,
    th: /6 จาน[\s\S]*ตอร์ติญา 3 แผ่น[\s\S]*ครีมา 25 กรัม[\s\S]*เกโซเฟรสโก 30 กรัม/
  }, "six-serving topping split");
  everyLocale(recipe.storage, {
    en: /separately[\s\S]*within 2 hours[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*freshly crisped chips/,
    "zh-hant": /分開保存[\s\S]*2 小時內[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*新炸或回脆玉米片/,
    ja: /別々にし[\s\S]*2時間以内[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*チップス/,
    ko: /따로[\s\S]*2시간 안에[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*칩/,
    th: /แยกกัน[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*ชิป/
  }, "reheat only salsa while chips and cold toppings stay separate");
});

test("Cullen skink uses the fish endpoint, reserves milk, seasons by taste, and reheats gently", () => {
  const recipe = get("cullen-skink");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [20, 35, 55, 4]);
  everyLocale(recipe.instructions[0].body, {
    en: /63°C \(145°F\)[\s\S]*no longer translucent[\s\S]*separates easily with a fork[\s\S]*Time alone is not the safety check/,
    "zh-hant": /63°C（145°F）[\s\S]*不再半透明[\s\S]*叉子輕鬆剝開[\s\S]*不可只靠計時判斷安全/,
    ja: /63°C（145°F）[\s\S]*透き通らず[\s\S]*フォークで簡単にほぐれる[\s\S]*時間だけで安全を判断しません/,
    ko: /63°C \(145°F\)[\s\S]*반투명하지 않고[\s\S]*포크로 쉽게 갈라지는[\s\S]*시간만으로 안전을 판단하지 않는다/,
    th: /63°C \(145°F\)[\s\S]*ไม่โปร่งแสง[\s\S]*แยกออกง่ายด้วยส้อม[\s\S]*เวลาอย่างเดียวไม่ใช่การตรวจความปลอดภัย/
  }, "fish uses its own endpoint and approved fork cue");
  everyLocale(recipe.instructions[3].body, {
    en: /all 600 g potato[\s\S]*all reserved poaching milk[\s\S]*15–18 minutes[\s\S]*tenderness estimate/,
    "zh-hant": /全部 600 公克馬鈴薯[\s\S]*預留的全部煮魚牛奶[\s\S]*15–18 分鐘[\s\S]*軟度估算/,
    ja: /じゃがいも600g全量[\s\S]*ポーチ牛乳全量[\s\S]*約15〜18分[\s\S]*柔らかさの目安/,
    ko: /감자 600g 전량[\s\S]*데친 우유 전량[\s\S]*약 15–18분[\s\S]*부드러움 추정치/,
    th: /มันฝรั่งหั่นเต๋า 600 กรัมทั้งหมด[\s\S]*นมลวกปลาที่เก็บไว้ทั้งหมด[\s\S]*15–18 นาที[\s\S]*ค่าประมาณความนุ่ม/
  }, "potato cut and simmer timing");
  everyLocale(recipe.instructions[5].body, {
    en: /500 g cooked haddock[\s\S]*reserved 4 g salt[\s\S]*four bowls[\s\S]*125 g[\s\S]*150 g[\s\S]*250 ml/,
    "zh-hant": /500 公克熟黑線鱈[\s\S]*預留 4 公克鹽[\s\S]*四碗[\s\S]*125 公克[\s\S]*150 公克[\s\S]*250 毫升/,
    ja: /ハドック500g[\s\S]*塩4g[\s\S]*4杯[\s\S]*約125g[\s\S]*150g[\s\S]*約250ml/,
    ko: /해덕 500g[\s\S]*소금 4g[\s\S]*네 그릇[\s\S]*약 125g[\s\S]*150g[\s\S]*약 250ml/,
    th: /ปลาแฮดด็อกสุก 500 กรัม[\s\S]*เกลือที่เหลือ 4 กรัม[\s\S]*4 ชาม[\s\S]*125 กรัม[\s\S]*150 กรัม[\s\S]*250 มล\./
  }, "four-bowl portions and final seasoning");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*2 days[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*do not boil hard/,
    "zh-hant": /2 小時內[\s\S]*2 天[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*避免劇烈沸騰/,
    ja: /2時間以内[\s\S]*2日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*強く沸騰させません/,
    ko: /2시간 안에[\s\S]*2일 안에[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*세게 끓이지 않는다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 2 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*อย่าต้มแรง/
  }, "fish-soup quality window, official storage period, and gentle reheating");
});

test("galaktoboureko checks the egg custard, accounts for butter, and includes syrup-setting time", () => {
  const recipe = get("galaktoboureko");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [90, 175, 265, 12]);
  everyLocale(recipe.instructions[6].body, {
    en: /71°C \(160°F\)[\s\S]*egg dishes[\s\S]*safety check/,
    "zh-hant": /71°C（160°F）[\s\S]*蛋料理標準[\s\S]*安全檢查/,
    ja: /71°C（160°F）[\s\S]*卵料理の基準[\s\S]*安全確認/,
    ko: /71°C \(160°F\)[\s\S]*달걀 요리 기준[\s\S]*안전 확인/,
    th: /71°C \(160°F\)[\s\S]*เกณฑ์สำหรับเมนูไข่[\s\S]*การตรวจความปลอดภัย/
  }, "egg-custard temperature replaces a timer-only safety claim");
  everyLocale(recipe.instructions[7].body, {
    en: /15 g[\s\S]*60 g[\s\S]*20 g[\s\S]*50 g[\s\S]*15 g/,
    "zh-hant": /15 公克[\s\S]*60 公克[\s\S]*20 公克[\s\S]*50 公克[\s\S]*15 公克/,
    ja: /15g[\s\S]*60g[\s\S]*20g[\s\S]*50g[\s\S]*15g/,
    ko: /15g[\s\S]*60g[\s\S]*20g[\s\S]*50g[\s\S]*15g/,
    th: /15 กรัม[\s\S]*60 กรัม[\s\S]*20 กรัม[\s\S]*50 กรัม[\s\S]*15 กรัม/
  }, "all 200 g butter is allocated");
  everyLocale(recipe.instructions[12].body, {
    en: /180°C[\s\S]*45–50 minutes[\s\S]*pastry-quality cues[\s\S]*71°C/,
    "zh-hant": /180°C[\s\S]*45–50 分鐘[\s\S]*酥皮品質指標[\s\S]*71°C/,
    ja: /180°C[\s\S]*約45〜50分[\s\S]*パイの品質の目安[\s\S]*71°C/,
    ko: /180°C[\s\S]*45–50분[\s\S]*페이스트리 품질 지표[\s\S]*71°C/,
    th: /180°C[\s\S]*45–50 นาที[\s\S]*คุณภาพของแป้ง[\s\S]*71°C/
  }, "bake-time texture cue stays separate from egg safety");
  everyLocale(recipe.instructions[14].body, {
    en: /1 hour[\s\S]*1 hour[\s\S]*175-minute cook\/finish estimate[\s\S]*55-minute bake plus 120-minute rest\/chill[\s\S]*12 pieces/,
    "zh-hant": /1 小時[\s\S]*1 小時[\s\S]*175 分鐘烹調／完成時間[\s\S]*烘烤 55 分鐘加靜置／冷藏 120 分鐘[\s\S]*12 塊/,
    ja: /1時間[\s\S]*1時間[\s\S]*調理・仕上げ175分[\s\S]*焼成55分＋休ませ／冷却120分[\s\S]*12個/,
    ko: /1시간[\s\S]*1시간[\s\S]*완성 175분[\s\S]*굽기 55분\+휴지\/냉장 120분[\s\S]*12조각/,
    th: /1 ชั่วโมง[\s\S]*1 ชั่วโมง[\s\S]*175 นาที[\s\S]*อบ 55 นาทีและพัก\/แช่เย็น 120 นาที[\s\S]*12 ชิ้น/
  }, "two-hour finish is reflected in displayed total time");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*2 days[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*softer phyllo/,
    "zh-hant": /2 小時內[\s\S]*2 天[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*酥皮會較軟/,
    ja: /2時間以内[\s\S]*2日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*フィロが柔らかく/,
    ko: /2시간 안에[\s\S]*2일 안에[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*필로가 부드러워/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 2 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*แป้งอาจนิ่ม/
  }, "custard storage and optional reheating guidance");
});
