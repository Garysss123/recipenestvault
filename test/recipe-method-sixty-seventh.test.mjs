import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["steak-and-kidney-pie", "erbsensuppe", "salmorejo-cordobes", "miso-soup"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialSources = [
  "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
];

function recipe(id) {
  const result = byId.get(id);
  assert.ok(result, `${id}: recipe exists`);
  return result;
}

function everyLocale(localized, patternByLocale, label) {
  for (const locale of localeOrder) {
    assert.match(localized[locale], patternByLocale[locale], `${locale}: ${label}`);
  }
}

function hasSafetyReferences(dish, { egg = false } = {}) {
  for (const url of officialSources) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official source listed: ${url}`);
  }
  if (egg) assert.ok(dish.sources.some((source) => source.url.includes("fda.gov") && source.title.startsWith("Official food-safety guidance")),
    `${dish.id}: official FDA egg guidance listed`);
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: two culinary references remain`);
}

test("sixty-seventh batch adds four genuinely unchecked slugs and keeps all 18 exclusions", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const starting = covered.slice(0, -44);
  const afterSixtySeventh = covered.slice(0, -40);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "standing old-patch exclusion list exists");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(starting.length, 264);
  assert.equal(new Set(starting).size, 264);
  assert.equal(afterSixtySeventh.length, 268);
  assert.equal(new Set(afterSixtySeventh).size, 268);
  assert.equal(covered.length, 308);
  assert.equal(new Set(covered).size, 308);
  assert.deepEqual(covered.slice(-44, -40), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - starting.length, 71);
  assert.equal(recipes.length - excluded.length - afterSixtySeventh.length, 67);
  assert.equal(recipes.length - excluded.length - covered.length, 27);
  assert.ok(ids.every((id) => !starting.includes(id)), "the four selections were absent from the exact starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none of the four selections is excluded");
});

test("the four revised methods retain source step counts and illustration mappings in all locales", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = draftById.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: method is materially revised`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: storage guidance is revised`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: references include official safety sources`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: original step count is retained`);
    assert.deepEqual(published.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: illustration scene mappings are unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: every step keeps its mapped illustration`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(published.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: method is localized`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage is localized`);
    }
    hasSafetyReferences(published, { egg: id === "salmorejo-cordobes" });
  }
});

test("steak and kidney pie aligns braise and bake estimates with the casserole safety check", () => {
  const dish = recipe("steak-and-kidney-pie");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [6, 90, 160, 250]);
  everyLocale(dish.instructions[6].body, {
    en: /estimated 15–20 minutes[\s\S]*fork-tender[\s\S]*74°C \(165°F\)/,
    "zh-hant": /約 15–20 分鐘[\s\S]*用叉子分開[\s\S]*74°C（165°F）/,
    ja: /目安として15〜20分[\s\S]*フォークでほぐれる[\s\S]*74°C（165°F）/,
    ko: /추정 15–20분[\s\S]*포크로 부드럽게 찢어지고[\s\S]*74°C \(165°F\)/,
    th: /ประมาณ 15–20 นาที[\s\S]*ใช้ส้อมแยกได้[\s\S]*74°C \(165°F\)/
  }, "the beef/kidney texture estimate is separate from the pie safety check");
  everyLocale(dish.instructions[11].body, {
    en: /35–40 minutes[\s\S]*centre of the filling[\s\S]*74°C \(165°F\)[\s\S]*not the safety test[\s\S]*six equal portions[\s\S]*160-minute cook estimate/,
    "zh-hant": /35–40 分鐘[\s\S]*餡料中心[\s\S]*74°C（165°F）[\s\S]*不是安全檢查[\s\S]*6 份[\s\S]*160 分鐘烹調估時/,
    ja: /35〜40分[\s\S]*具の中心[\s\S]*74°C（165°F）[\s\S]*安全確認ではありません[\s\S]*6等分[\s\S]*調理時間160分/,
    ko: /35–40분[\s\S]*속 가운데[\s\S]*74°C \(165°F\)[\s\S]*안전 확인이 아닙니다[\s\S]*여섯 등분[\s\S]*조리 시간 추정 160분/,
    th: /35–40 นาที[\s\S]*ตรงกลางไส้[\s\S]*74°C \(165°F\)[\s\S]*ไม่ใช่การตรวจความปลอดภัย[\s\S]*6 ส่วนเท่า ๆ กัน[\s\S]*160 นาที/
  }, "the estimate, measured centre, and six portions are explicit");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Three days is a pastry-quality preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*口感偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*品質上の好み[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*(?:품질 기준|선호 기준)[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*คุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "pastry quality is distinct from official storage and reheating conditions");
});

test("Erbsensuppe uses cooked sausage, a measured hot-through point, and six portions", () => {
  const dish = recipe("erbsensuppe");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [6, 25, 115, 140]);
  assert.match(dish.ingredients.find((row) => row.item.en.startsWith("fully cooked smoked German sausages"))?.item.en ?? "", /fully cooked/);
  everyLocale(dish.instructions[5].body, {
    en: /fully cooked smoked sausage[\s\S]*8–10 minutes[\s\S]*74°C \(165°F\)[\s\S]*time, steam, or colour is not the safety check/,
    "zh-hant": /已熟製煙燻香腸[\s\S]*8–10 分鐘[\s\S]*74°C（165°F）[\s\S]*時間、蒸氣或顏色都不是安全檢查/,
    ja: /加熱済みスモークソーセージ[\s\S]*8〜10分[\s\S]*74°C（165°F）[\s\S]*時間・湯気・色は安全確認の代わりになりません/,
    ko: /완전히 익힌 훈제 소시지[\s\S]*8–10분[\s\S]*74°C \(165°F\)[\s\S]*시간·김·색은 안전 확인 기준이 아닙니다/,
    th: /ไส้กรอกรมควันที่ปรุงสุกแล้ว[\s\S]*8–10 นาที[\s\S]*74°C \(165°F\)[\s\S]*เวลา ไอน้ำ หรือสีไม่ใช่การตรวจความปลอดภัย/
  }, "the estimated warm-through time is not the temperature test");
  everyLocale(dish.instructions[7].body, {
    en: /six bowls[\s\S]*about 50 g sausage[\s\S]*115-minute cook estimate/,
    "zh-hant": /6 碗[\s\S]*約 50 公克香腸[\s\S]*115 分鐘烹調估時/,
    ja: /6杯[\s\S]*ソーセージ約50g[\s\S]*調理時間115分/,
    ko: /여섯 그릇[\s\S]*소시지 약 50g[\s\S]*조리 시간 추정 115분/,
    th: /6 ชาม[\s\S]*ไส้กรอกราว 50 กรัม[\s\S]*115 นาที/
  }, "the cooking estimate and portion allocation are localized");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Three days is a flavour and texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*品質上の好み[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*품질 기준[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*คุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality preference is separate from the official soup storage and reheat standard");
});

test("salmorejo cooks the egg fully, separates chilled toppings, and apportions four bowls", () => {
  const dish = recipe("salmorejo-cordobes");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 75, 10, 85]);
  everyLocale(dish.instructions[0].body, {
    en: /2 eggs[\s\S]*estimated 10 minutes[\s\S]*whites and yolks are firm[\s\S]*within 2 hours/,
    "zh-hant": /2 顆蛋[\s\S]*約煮 10 分鐘[\s\S]*蛋白與蛋黃都凝固[\s\S]*2 小時內冷藏/,
    ja: /卵2個[\s\S]*目安として10分[\s\S]*白身と黄身の両方が固まる[\s\S]*2時間以内に冷蔵/,
    ko: /달걀 2개[\s\S]*추정 10분[\s\S]*흰자와 노른자가 모두 단단해질[\s\S]*2시간 안에 냉장/,
    th: /ไข่ 2 ฟอง[\s\S]*ประมาณ 10 นาที[\s\S]*ไข่ขาวและไข่แดงแข็งตัว[\s\S]*ภายใน 2 ชั่วโมง/
  }, "egg doneness is stated independently from the time estimate");
  everyLocale(dish.instructions[4].body, {
    en: /at least 1 hour[\s\S]*four cold bowls[\s\S]*about 25 ml olive oil[\s\S]*half an egg[\s\S]*20 g ham[\s\S]*quality instructions/,
    "zh-hant": /至少 1 小時[\s\S]*4 個冰涼碗[\s\S]*約 25 毫升橄欖油[\s\S]*半顆蛋[\s\S]*20 公克火腿[\s\S]*品質指引/,
    ja: /少なくとも1時間[\s\S]*器4つ[\s\S]*約25ml[\s\S]*卵半個[\s\S]*ハム20g[\s\S]*品質の目安/,
    ko: /최소 1시간[\s\S]*그릇 네 개[\s\S]*약 25ml[\s\S]*달걀 반 개[\s\S]*하몬 20g[\s\S]*품질 지침/,
    th: /อย่างน้อย 1 ชั่วโมง[\s\S]*4 ใบ[\s\S]*ประมาณ 25 มล\.[\s\S]*ไข่ครึ่งฟอง[\s\S]*แฮม 20 กรัม[\s\S]*คำแนะนำด้านคุณภาพ/
  }, "cold serving temperature, chill time, and ingredient amounts are clear");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Two days is a freshness and texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*2 天內食用是品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*品質上の好み[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*품질 기준[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*คุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "egg and ham freshness preferences are distinct from official storage guidance");
});

test("miso soup distinguishes flavour serving temperature from safe leftover reheating", () => {
  const dish = recipe("miso-soup");
  assert.deepEqual([dish.servings, dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [4, 35, 15, 50]);
  everyLocale(dish.instructions[5].body, {
    en: /70–75°C[\s\S]*four bowls[\s\S]*150 ml[\s\S]*62\.5 g[\s\S]*15 g miso[\s\S]*flavour preference, not a safety check/,
    "zh-hant": /70–75°C[\s\S]*4 碗[\s\S]*150 毫升[\s\S]*62.5 公克[\s\S]*15 公克味噌[\s\S]*適口溫度偏好，不是冷藏湯品的安全復熱檢查/,
    ja: /70〜75°C[\s\S]*4杯[\s\S]*150ml[\s\S]*62\.5g[\s\S]*味噌15g[\s\S]*風味の好みで、保存したスープの安全確認ではありません/,
    ko: /70–75°C[\s\S]*네 그릇[\s\S]*150ml[\s\S]*62\.5g[\s\S]*미소 15g[\s\S]*풍미 선호 기준이지 보관한 수프의 안전 확인 기준이 아닙니다/,
    th: /70–75°C[\s\S]*4 ชาม[\s\S]*150 มล\.[\s\S]*62\.5 กรัม[\s\S]*มิโซะ 15 กรัม[\s\S]*ไม่ใช่การตรวจความปลอดภัยของซุปที่เก็บไว้/
  }, "each serving allocation and fresh flavour temperature is distinguished from safety");
  everyLocale(dish.storage, {
    en: /within 2 hours[\s\S]*Two days is a wakame-texture preference[\s\S]*3–4 days[\s\S]*74°C\/165°F[\s\S]*not the reheating safety target/,
    "zh-hant": /2 小時內[\s\S]*2 天內食用是品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F[\s\S]*不是復熱安全標準/,
    ja: /2時間以内[\s\S]*品質上の好み[\s\S]*3〜4日[\s\S]*74°C\/165°F[\s\S]*再加熱の安全基準ではありません/,
    ko: /2시간 안에[\s\S]*품질 기준[\s\S]*3–4일[\s\S]*74°C\/165°F[\s\S]*재가열 안전 기준이 아닙니다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*คุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F[\s\S]*ไม่ใช่เกณฑ์ความปลอดภัยของการอุ่นซ้ำ/
  }, "official soup storage and reheat rules remain separate from wakame texture");
});
