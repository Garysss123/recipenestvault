import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["beef-chow-fun", "clay-pot-rice", "taiwanese-tea-eggs", "moules-marinieres"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const beefSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const chillSafety = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const officialPrefix = "Official food-safety guidance";
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: existing recipe remains in the registry`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: step exists: ${title}`);
  return found;
}

function everyLocale(instruction, patterns, label) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${label}`);
}

function everyLocaleText(texts, patterns, label) {
  for (const locale of localeOrder) assert.match(texts[locale], patterns[locale], `${locale}: ${label}`);
}

function officialSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith(officialPrefix)),
    `${recipe.id}: official guidance is separately labelled`);
}

test("forty-fifth batch adds four eligible methods and preserves the shared coverage registry", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale method regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353, "the existing recipe registry is unchanged");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353, "all recipe IDs remain unique");
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 288, "shared detail routes cover 288 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 288, "all reviewed IDs remain unique");
  assert.equal(covered.slice(0, -112).length, 176, "the 176 IDs that preceded this batch remain");
  assert.deepEqual(covered.slice(-112, -108), ids, "the four verified slugs remain in shared coverage");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "none of the new IDs is excluded");
  assert.equal(recipes.length - excludedIds.length - covered.length, 47, "47 eligible existing recipes remain");

  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: all ingredients are localized`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: all method steps are localized`);
    }
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith(officialPrefix)).length >= 2,
      `${id}: two dish references remain separate from official safety guidance`);
  }
});

test("beef chow fun measures whole-cut beef, portions four bowls, and matches leftover handling", () => {
  const recipe = get("beef-chow-fun");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [40, 14, 54]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("flank steak"))?.amount, "280 g");
  everyLocale(step(recipe, "Velvet the beef"), {
    en: /sliced 6 mm[\s\S]*marinate 30 minutes[\s\S]*While it marinates[\s\S]*20 minutes/,
    "zh-hant": /切成 6 毫米厚片[\s\S]*冷藏醃 30 分鐘[\s\S]*醃漬期間[\s\S]*20 分鐘/,
    ja: /6mm厚[\s\S]*30分漬ける[\s\S]*その間[\s\S]*20分/,
    ko: /6mm 두께[\s\S]*30분 재운다[\s\S]*재우는 동안[\s\S]*20분/,
    th: /หนา 6 มม\.[\s\S]*หมักในตู้เย็น 30 นาที[\s\S]*ระหว่างหมัก[\s\S]*20 นาที/
  }, "the thermometer-friendly cut and parallel prep are clear in every locale");
  const sear = step(recipe, "Sear and rest the beef");
  everyLocale(sear, {
    en: /two uncrowded batches[\s\S]*6 mm beef[\s\S]*63°C \(145°F\)[\s\S]*15-second bursts[\s\S]*rest for at least 3 minutes/,
    "zh-hant": /兩批不擁擠[\s\S]*6 毫米牛肉[\s\S]*63°C（145°F）[\s\S]*每次續煎 15 秒[\s\S]*至少靜置 3 分鐘/,
    ja: /油15mlを2回[\s\S]*6mm厚[\s\S]*63°C（145°F）[\s\S]*15秒ずつ[\s\S]*3分以上休ませ/,
    ko: /두 번의 여유 있는 배치[\s\S]*6mm 두께[\s\S]*63°C \(145°F\)[\s\S]*15초씩 더[\s\S]*최소 3분 쉬게/,
    th: /สองชุดที่ไม่แน่น[\s\S]*6 มม\.[\s\S]*63°C \(145°F\)[\s\S]*15 วินาที[\s\S]*อย่างน้อย 3 นาที/
  }, "whole-cut endpoint and rest are consistent in each locale");
  everyLocale(step(recipe, "Return beef and sprouts"), {
    en: /four servings, about 70 g raw-beef equivalent per serving/,
    "zh-hant": /平均分成四份[\s\S]*每份約相當於 70 公克生牛肉/,
    ja: /4人分[\s\S]*生牛肉約70g相当/,
    ko: /네 인분[\s\S]*생고기 약 70g 분량/,
    th: /สี่ที่[\s\S]*ประมาณ 70 กรัมต่อที่/
  }, "the beef allocation is explicit");
  everyLocaleText(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C[\s\S]*within 2 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C[\s\S]*2 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C以下[\s\S]*2日以内[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*4°C 이하[\s\S]*2일[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*ภายใน 2 วัน[\s\S]*74°C \(165°F\)/
  }, "refrigeration and reheating are localized");
  officialSource(recipe, beefSafety);
  officialSource(recipe, chillSafety);
});

test("clay-pot rice divides two servings and uses the FSA rice-specific storage rule", () => {
  const recipe = get("clay-pot-rice");
  assert.equal(recipe.servings, 2);
  everyLocale(step(recipe, "Rest and fold from the bottom"), {
    en: /divide evenly between two bowls[\s\S]*within 1 hour[\s\S]*4°C \(40°F\)[\s\S]*24 hours[\s\S]*only once[\s\S]*steaming hot throughout/,
    "zh-hant": /平均分入兩碗[\s\S]*1 小時內冷藏[\s\S]*4°C[\s\S]*24 小時內食用[\s\S]*最多回熱一次[\s\S]*整體冒蒸氣/,
    ja: /均等に2つ[\s\S]*1時間以内[\s\S]*4°C以下[\s\S]*24時間以内[\s\S]*一度だけ[\s\S]*全体から湯気/,
    ko: /두 그릇에 고르게[\s\S]*1시간 안에[\s\S]*4°C 이하[\s\S]*24시간 안에[\s\S]*전체에서 김[\s\S]*한 번만/,
    th: /สองชามเท่า ๆ กัน[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*เพียงครั้งเดียว[\s\S]*มีไอทั่วถึง/
  }, "yield and rice handling match the method");
  everyLocaleText(recipe.storage, {
    en: /within 1 hour of cooking[\s\S]*4°C \(40°F\)[\s\S]*within 24 hours[\s\S]*only once[\s\S]*steaming hot throughout/,
    "zh-hant": /1 小時內冷藏[\s\S]*4°C[\s\S]*24 小時內食用[\s\S]*最多回熱一次[\s\S]*整體冒蒸氣/,
    ja: /1時間以内[\s\S]*4°C以下[\s\S]*24時間以内[\s\S]*一度だけ[\s\S]*全体から湯気/,
    ko: /1시간 안에[\s\S]*4°C 이하[\s\S]*24시간 안에[\s\S]*전체에서 김[\s\S]*한 번만/,
    th: /ภายใน 1 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*เพียงครั้งเดียว[\s\S]*มีไอทั่วถึง/
  }, "recipe-card storage matches the method in every locale");
  officialSource(recipe, riceSafety);
  officialSource(recipe, chillSafety);
});

test("Taiwanese tea eggs sets the yolks, portions one each, and chills/reheats safely", () => {
  const recipe = get("taiwanese-tea-eggs");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [735, 55, 790],
    "the displayed prep estimate covers the 12-hour steep plus handling");
  everyLocale(step(recipe, "Simmer the eggs for eight minutes"), {
    en: /eight eggs[\s\S]*one for each of eight servings[\s\S]*both whites and yolks are firm/,
    "zh-hant": /8 顆蛋[\s\S]*8 份各 1 顆[\s\S]*蛋白與蛋黃都凝固/,
    ja: /卵8個[\s\S]*8人分に1個ずつ[\s\S]*白身と黄身が固まる/,
    ko: /달걀 8개[\s\S]*8인분에 한 개씩[\s\S]*흰자와 노른자가 모두 단단/,
    th: /ไข่ 8 ฟอง[\s\S]*8 ที่[\s\S]*ไข่ขาวและไข่แดงแข็ง/
  }, "yield and hard-cooked egg endpoint are explicit");
  everyLocale(step(recipe, "Chill in the broth"), {
    en: /two clean, shallow containers[\s\S]*ice bath[\s\S]*4°C \(40°F\) or below within 2 hours[\s\S]*8–12 hours[\s\S]*within 3 days[\s\S]*conservative recipe limit[\s\S]*discard the broth after day 3/,
    "zh-hant": /兩個乾淨淺盒[\s\S]*冰水浴[\s\S]*2 小時內[\s\S]*4°C（40°F）以下[\s\S]*8–12 小時[\s\S]*3 天內食用[\s\S]*保守期限[\s\S]*第 3 天後丟棄滷汁/,
    ja: /清潔な浅い容器2つ[\s\S]*氷水[\s\S]*2時間以内[\s\S]*4°C以下[\s\S]*8〜12時間[\s\S]*3日以内に食べ[\s\S]*保守的な期限[\s\S]*3日目以降は煮汁を捨て/,
    ko: /얕은 용기 두 개[\s\S]*얼음물[\s\S]*2시간 안에[\s\S]*4°C 이하[\s\S]*8–12시간[\s\S]*조리 후 3일 안에 먹[\s\S]*보수적 기준[\s\S]*3일이 지나면 국물을 버린다/,
    th: /ภาชนะตื้นสะอาดสองใบ[\s\S]*อ่างน้ำแข็ง[\s\S]*4°C หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*8–12 ชั่วโมง[\s\S]*กินภายใน 3 วัน[\s\S]*เกณฑ์เผื่อความปลอดภัยของสูตร[\s\S]*ทิ้งน้ำชาเมื่อพ้นวันที่ 3/
  }, "eggs remain submerged while cooling and steeping");
  everyLocale(step(recipe, "Reheat gently or serve cool"), {
    en: /74°C \(165°F\)[\s\S]*one whole egg per serving/,
    "zh-hant": /74°C（165°F）[\s\S]*每份一整顆/,
    ja: /74°C（165°F）[\s\S]*1人分は卵1個/,
    ko: /74°C \(165°F\)[\s\S]*한 인분에 달걀 한 개/,
    th: /74°C \(165°F\)[\s\S]*หนึ่งฟองต่อที่/
  }, "warm portions reach the leftover egg endpoint");
  everyLocaleText(recipe.storage, {
    en: /4°C \(40°F\) or below[\s\S]*up to 3 days[\s\S]*conservative recipe limit[\s\S]*74°C \(165°F\)/,
    "zh-hant": /4°C（40°F）以下[\s\S]*最多 3 天[\s\S]*保守期限[\s\S]*74°C（165°F）/,
    ja: /4°C以下[\s\S]*最長3日[\s\S]*保守的な期限[\s\S]*74°C（165°F）/,
    ko: /4°C 이하[\s\S]*최대 3일[\s\S]*보수적 기한[\s\S]*74°C \(165°F\)/,
    th: /4°C หรือต่ำกว่า[\s\S]*ไม่เกิน 3 วัน[\s\S]*เผื่อความปลอดภัย[\s\S]*74°C \(165°F\)/
  }, "refrigeration and reheating match the method");
  officialSource(recipe, eggSafety);
});

test("moules marinières preserves cold handling, open-shell doneness, and portions", () => {
  const recipe = get("moules-marinieres");
  assert.equal(recipe.servings, 4);
  everyLocale(step(recipe, "Sort and clean the mussels"), {
    en: /4°C \(40°F\) or below[\s\S]*do not soak in fresh water/,
    "zh-hant": /4°C（40°F）以下[\s\S]*不泡在淡水/,
    ja: /4°C以下[\s\S]*真水に浸けません/,
    ko: /4°C 이하[\s\S]*민물에 담그지/,
    th: /4°C หรือต่ำกว่า[\s\S]*ไม่แช่น้ำจืด/
  }, "live mussels stay chilled before cooking");
  everyLocale(step(recipe, "Add wine and steam"), {
    en: /5–7 minutes as a guide[\s\S]*Shells opening during cooking[\s\S]*discard any that stay closed/,
    "zh-hant": /約 5–7 分鐘[\s\S]*時間僅供參考[\s\S]*烹煮時開殼[\s\S]*仍閉合者丟棄/,
    ja: /5～7分は目安[\s\S]*時間だけで判断せず[\s\S]*加熱中に殻が開く[\s\S]*閉じたままの貝は捨て/,
    ko: /5–7분은 기준 시간[\s\S]*시간만으로 판단하지 말고[\s\S]*조리 중 껍데기가 열리는지[\s\S]*닫힌 것은 버린다/,
    th: /5–7 นาทีเป็นแนวทาง[\s\S]*เปลือกที่เปิดระหว่างปรุง[\s\S]*ไม่ใช่เวลาอย่างเดียว[\s\S]*ทิ้งตัวที่ยังปิด/
  }, "shell opening, not the timer alone, establishes doneness");
  everyLocale(step(recipe, "Serve with the cooking broth"), {
    en: /four warm bowls[\s\S]*375 g per serving before discards/,
    "zh-hant": /四個溫碗[\s\S]*每份 375 公克/,
    ja: /器4つ[\s\S]*1人分約375g/,
    ko: /그릇 네 개[\s\S]*1인분당 약 375g/,
    th: /สี่ชามอุ่น[\s\S]*375 กรัมต่อที่/
  }, "shell-in portion allocation is explicit");
  everyLocaleText(recipe.storage, {
    en: /shallow container[\s\S]*within 2 hours[\s\S]*4°C \(40°F\) or below[\s\S]*within 1 day[\s\S]*74°C \(165°F\)/,
    "zh-hant": /分裝淺盒[\s\S]*2 小時內[\s\S]*4°C（40°F）以下[\s\S]*1 天[\s\S]*74°C（165°F）/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*4°C以下[\s\S]*1日以内[\s\S]*74°C（165°F）/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*4°C 이하[\s\S]*1일[\s\S]*74°C \(165°F\)/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*ภายใน 1 วัน[\s\S]*74°C \(165°F\)/
  }, "leftovers are cooled and reheated once");
  officialSource(recipe, seafoodSafety);
  officialSource(recipe, beefSafety);
});
