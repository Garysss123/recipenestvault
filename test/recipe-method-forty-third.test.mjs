import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["acaraje", "new-england-clam-chowder", "croquetas-de-jamon", "arroz-carreteiro"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";
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

test("forty-third batch adds four eligible methods and preserves registry, exclusions, and prior coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale method regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353, "the existing recipe registry is unchanged");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353, "all recipe IDs remain unique");
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 328, "shared detail routes cover 328 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 328, "all reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 324, "all 324 other reviewed IDs remain");
  assert.ok(ids.every((id) => covered.includes(id)), "all four new IDs enter shared coverage");
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "none of the new IDs is excluded");
  assert.equal(recipes.length - excludedIds.length - covered.length, 7, "7 eligible existing recipes remain after this batch");

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

test("acaraje checks the thickest shrimp at the official seafood temperature", () => {
  const recipe = get("acaraje");
  assert.equal(recipe.servings, 12);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [520, 35, 555]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("raw shrimp"))?.amount, "250 g");
  everyLocale(step(recipe, "Sauté the shrimp"), {
    en: /3–5 minutes, turning once[\s\S]*thickest shrimp reaches 63°C \(145°F\)[\s\S]*firm, pearly and opaque[\s\S]*30-second increments and recheck/,
    "zh-hant": /炒 3–5 分鐘並翻動一次[\s\S]*最厚蝦身中心至 63°C（145°F）[\s\S]*結實、珍珠白且不透明[\s\S]*續炒 30 秒再測/,
    ja: /3〜5分炒める[\s\S]*最も厚いえびの中心が63°C（145°F）[\s\S]*締まって真珠色で不透明[\s\S]*30秒ずつ加熱して再測定/,
    ko: /한 번 뒤집으며 3–5분[\s\S]*가장 두꺼운 새우의 중심이 63°C \(145°F\)[\s\S]*단단하며 진주빛을 띠고 불투명[\s\S]*30초씩 더 익혀 다시/,
    th: /พลิกหนึ่งครั้ง[\s\S]*3–5 นาที[\s\S]*กุ้งตัวหนาที่สุดวัดแกนกลางได้ 63°C \(145°F\)[\s\S]*เนื้อแน่น สีมุก และทึบแสง[\s\S]*ครั้งละ 30 วินาทีแล้ววัดซ้ำ/
  }, "shrimp time, temperature, visual cue, and recheck are localized");
  officialSource(recipe, seafoodSafety);
  officialSource(recipe, foodSafety);
});

test("clam chowder reheats the chilled clam meat to 74°C throughout", () => {
  const recipe = get("new-england-clam-chowder");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 45, 75]);
  everyLocale(step(recipe, "Steam the clams open"), {
    en: /5–8 minutes[\s\S]*discarding any that remain shut/,
    "zh-hant": /5–8 分鐘[\s\S]*仍緊閉者丟棄/,
    ja: /5〜8分[\s\S]*閉じたままのものは捨てる/,
    ko: /5–8분[\s\S]*끝까지 닫힌 것은 버립니다/,
    th: /5–8 นาที[\s\S]*ทิ้งตัวที่ยังปิดสนิท/
  }, "closed shellfish are discarded in every locale");
  everyLocale(step(recipe, "Return clams and bacon"), {
    en: /2–4 minutes[\s\S]*at least 74°C \(165°F\) throughout[\s\S]*several places[\s\S]*30-second increments and recheck/,
    "zh-hant": /小滾 2–4 分鐘[\s\S]*數處測量[\s\S]*整鍋濃湯至少達 74°C（165°F）[\s\S]*續煮 30 秒並重測/,
    ja: /2〜4分静かに煮る[\s\S]*複数箇所[\s\S]*全体が少なくとも74°C（165°F）[\s\S]*30秒ずつ煮て再測定/,
    ko: /2–4분 끓입니다[\s\S]*여러 곳[\s\S]*최소 74°C \(165°F\)[\s\S]*30초씩 더 끓여 다시/,
    th: /เคี่ยว 2–4 นาที[\s\S]*วัดหลายจุด[\s\S]*ทั้งหม้อถึงอย่างน้อย 74°C \(165°F\)[\s\S]*ครั้งละ 30 วินาทีแล้ววัดซ้ำ/
  }, "chilled clam meat and soup are safely reheated and rechecked");
  officialSource(recipe, foodSafety);
});

test("croquetas allocate three per serving and reheat the chilled centre safely", () => {
  const recipe = get("croquetas-de-jamon");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [300, 30, 330]);
  everyLocale(step(recipe, "Portion and shape"), {
    en: /18 portions of about 40 g, three per serving/,
    "zh-hant": /18 份，每份約 40 公克，每份餐點 3 顆/,
    ja: /約40gずつ18個に分け、1人分3個/,
    ko: /약 40g씩 18개로 나누어 한 사람당 3개씩/,
    th: /18 ส่วน ส่วนละราว 40 กรัม หรือ 3 ชิ้นต่อหนึ่งที่/
  }, "portion count and serving allocation match in all locales");
  everyLocale(step(recipe, "Fry until golden"), {
    en: /175°C[\s\S]*90 seconds to 2 minutes[\s\S]*at least 74°C \(165°F\)[\s\S]*30-second increments[\s\S]*160–170°C/,
    "zh-hant": /175°C[\s\S]*90 秒至 2 分鐘[\s\S]*至少須達 74°C（165°F）[\s\S]*續炸 30 秒再測[\s\S]*160–170°C/,
    ja: /175°C[\s\S]*90秒〜2分[\s\S]*少なくとも74°C（165°F）[\s\S]*30秒ずつ揚げて再測定[\s\S]*160〜170°C/,
    ko: /175°C[\s\S]*90초–2분[\s\S]*최소 74°C \(165°F\)[\s\S]*30초씩 더 튀겨 다시[\s\S]*160–170°C/,
    th: /175°C[\s\S]*90 วินาที–2 นาที[\s\S]*อย่างน้อย 74°C \(165°F\)[\s\S]*ครั้งละ 30 วินาทีแล้ววัดซ้ำ[\s\S]*160–170°C/
  }, "fried croquettes reach a measured safe reheating endpoint");
  officialSource(recipe, foodSafety);
});

test("arroz carreteiro allocates its oil and gives safe rice cooling and reheating limits", () => {
  const recipe = get("arroz-carreteiro");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [45, 50, 95]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil"))?.amount, "20 ml");
  everyLocale(step(recipe, "Brown the meats"), {
    en: /up to 20 ml neutral oil only if the bacon does not render enough fat/,
    "zh-hant": /只有培根油脂不足[\s\S]*最多 20 ml 中性油/,
    ja: /脂が鍋底を薄く覆うのに足りない場合だけ[\s\S]*最大20ml/,
    ko: /지방이 냄비 바닥을 얇게 덮기에 부족할 때만[\s\S]*최대 20ml/,
    th: /ไม่เกิน 20 มล\.[\s\S]*เฉพาะเมื่อไขมันจากเบคอนไม่พอ/
  }, "optional neutral oil is explicitly allocated");
  everyLocale(step(recipe, "Finish with herbs"), {
    en: /six equal portions[\s\S]*shallow containers[\s\S]*within 1 hour[\s\S]*4°C \(40°F\) or below[\s\S]*within 24 hours[\s\S]*only once[\s\S]*steaming hot throughout[\s\S]*74°C \(165°F\)/,
    "zh-hant": /平均分成六份[\s\S]*淺容器[\s\S]*1 小時內[\s\S]*4°C（40°F）以下[\s\S]*24 小時內[\s\S]*只能回熱一次[\s\S]*蒸熱[\s\S]*74°C（165°F）/,
    ja: /6等分[\s\S]*浅い容器[\s\S]*1時間以内[\s\S]*4°C（40°F）以下[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*湯気の立つ熱さ[\s\S]*74°C（165°F）/,
    ko: /여섯 등분[\s\S]*얕은 용기[\s\S]*1시간 안에[\s\S]*4°C \(40°F\) 이하[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*김이 날 정도로 뜨겁고[\s\S]*74°C \(165°F\)/,
    th: /แบ่ง 6 ส่วน[\s\S]*ภาชนะตื้น[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*24 ชั่วโมง[\s\S]*เพียงครั้งเดียว[\s\S]*ร้อนมีไอทั่วถึง[\s\S]*74°C \(165°F\)/
  }, "rice cooling, use-by, and reheating rules are localized");
  everyLocaleText(recipe.storage, {
    en: /^(?=[\s\S]*shallow containers)(?=[\s\S]*0–4°C)(?=[\s\S]*within 1 hour)(?=[\s\S]*within 24 hours)(?=[\s\S]*only once)(?=[\s\S]*steaming hot throughout)(?=[\s\S]*74°C \(165°F\))/,
    "zh-hant": /^(?=[\s\S]*淺容器)(?=[\s\S]*0–4°C)(?=[\s\S]*1 小時內)(?=[\s\S]*24 小時內)(?=[\s\S]*只回熱一次)(?=[\s\S]*全份冒熱氣)(?=[\s\S]*74°C（165°F）)/,
    ja: /^(?=[\s\S]*浅い容器)(?=[\s\S]*0〜4°C)(?=[\s\S]*1時間以内)(?=[\s\S]*24時間以内)(?=[\s\S]*1回だけ)(?=[\s\S]*湯気の立つ熱さ)(?=[\s\S]*74°C（165°F）)/,
    ko: /^(?=[\s\S]*얕은 용기)(?=[\s\S]*0–4°C)(?=[\s\S]*1시간 안에)(?=[\s\S]*24시간 안에)(?=[\s\S]*한 번만)(?=[\s\S]*김이 날 정도로 뜨겁고)(?=[\s\S]*74°C \(165°F\))/,
    th: /^(?=[\s\S]*ภาชนะตื้น)(?=[\s\S]*0–4°C)(?=[\s\S]*ภายใน 1 ชั่วโมง)(?=[\s\S]*ภายใน 24 ชั่วโมง)(?=[\s\S]*เพียงครั้งเดียว)(?=[\s\S]*ร้อนมีไอทั่วถึง)(?=[\s\S]*74°C \(165°F\))/
  }, "recipe-card storage guidance matches the rice method in every locale");
  officialSource(recipe, riceSafety);
  officialSource(recipe, foodSafety);
});
