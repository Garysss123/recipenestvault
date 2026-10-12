import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["char-siu", "hyderabadi-chicken-biryani", "tempura", "lamingtons"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const officialPrefix = "Official food-safety guidance";

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} exists in the published recipe registry`);
  return recipe;
}

function bodyAt(recipe, index, locale) {
  const step = recipe.instructions[index];
  return step?.body?.[locale] ?? step?.[locale] ?? "";
}

function stepByTitle(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title?.en === title);
  assert.ok(found, `${recipe.id}: ${title} instruction exists`);
  return found;
}

function matchesEveryLocale(step, patterns, label) {
  for (const locale of localeOrder) assert.match(body(step, locale), patterns[locale], `${locale}: ${label}`);
}

function body(step, locale) {
  return step?.body?.[locale] ?? step?.[locale] ?? "";
}

function assertSourceSeparation(recipe, safetyUrls = []) {
  const dishSources = recipe.sources.filter((source) => !source.title.startsWith(officialPrefix));
  assert.ok(dishSources.length >= 2, `${recipe.id} retains two dish-method references`);
  for (const url of safetyUrls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith(officialPrefix)),
      `${recipe.id} labels ${url} as official food-safety guidance`);
  }
  assert.equal(recipe.sources.filter((source) => source.title.startsWith(officialPrefix)).length, safetyUrls.length,
    `${recipe.id} lists official safety guidance separately from dish references`);
}

test("twenty-seventh method audit keeps the registry, exclusions, and current 200-recipe shared route coverage", async () => {
  assert.equal(recipes.length, 353, "the published registry remains at 353 existing recipes");
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4, "the four batch IDs are distinct");
  assert.equal(excludedIds.length, 18, "the standing exclusion list remains 18 recipes");
  assert.equal(new Set(excludedIds).size, 18);
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "no excluded recipe enters this batch");

  const regressionSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = regressionSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "the shared all-locale detail-route list exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  assert.equal(covered.length, 204, "shared detail-route regression covers 204 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 204, "all deep-reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 200, "the other 200 reviewed IDs remain present");
  assert.ok(ids.every((id) => covered.includes(id)), "all four batch recipes enter the shared route regression");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((_, index) => bodyAt(recipe, index, locale)), `${id}/${locale}: method is localized`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
  }
});

test("char siu includes active prep in the estimate, checks pork temperature, rests, and allocates six portions", () => {
  const recipe = get("char-siu");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [490, 50, 540]);
  assertSourceSeparation(recipe, [foodSafety]);

  matchesEveryLocale(stepByTitle(recipe, "Marinate and discard the used sauce"), {
    en: /8–24 hours[\s\S]*490-minute prep estimate[\s\S]*8-hour minimum marinade[\s\S]*10 minutes[\s\S]*Discard every drop/,
    "zh-hant": /8–24 小時[\s\S]*490 分鐘備料時間[\s\S]*最低 8 小時醃漬[\s\S]*約 10 分鐘[\s\S]*所有接觸過生豬肉的醃料都要丟棄/,
    ja: /8〜24時間[\s\S]*準備時間490分[\s\S]*最低8時間[\s\S]*約10分[\s\S]*生肉に触れたたれはすべて捨て/,
    ko: /8–24시간[\s\S]*준비 시간 490분[\s\S]*최소 8시간[\s\S]*약 10분[\s\S]*생고기에 닿은 양념은 모두 버리/,
    th: /8–24 ชั่วโมง[\s\S]*490 นาที[\s\S]*ขั้นต่ำ 8 ชั่วโมง[\s\S]*ประมาณ 10 นาที[\s\S]*ทิ้งซอสทุกหยด/
  }, "the prep estimate includes the marinade and active handling in all locales");

  matchesEveryLocale(stepByTitle(recipe, "Lacquer with honey"), {
    en: /5–8 minutes as a guide[\s\S]*63°C \(145°F\)[\s\S]*2-minute increments[\s\S]*3-minute rest/,
    "zh-hant": /5–8 分鐘作為參考[\s\S]*63°C（145°F）[\s\S]*每次再烤 2 分鐘[\s\S]*3 分鐘靜置/,
    ja: /5〜8分焼き[\s\S]*63°C（145°F）[\s\S]*2分ずつ追加[\s\S]*3分/,
    ko: /5–8분 굽되[\s\S]*63°C \(145°F\)[\s\S]*2분씩 더[\s\S]*3분/,
    th: /5–8 นาทีเป็นแนวทาง[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 2 นาที[\s\S]*3 นาที/
  }, "the oven time is a guide and pork uses its relevant minimum endpoint and rest");

  matchesEveryLocale(stepByTitle(recipe, "Rest and slice"), {
    en: /10 minutes[\s\S]*official minimum 3-minute rest/,
    "zh-hant": /靜置 10 分鐘[\s\S]*官方至少 3 分鐘/,
    ja: /10分[\s\S]*最低休ませ時間3分/,
    ko: /10분[\s\S]*최소 휴지 시간 3분/,
    th: /10 นาที[\s\S]*ขั้นต่ำ 3 นาที/
  }, "the actual rest meets the official minimum in all locales");

  matchesEveryLocale(stepByTitle(recipe, "Serve with the listed parsley"), {
    en: /six servings[\s\S]*900 g raw pork[\s\S]*150 g raw-meat equivalent per serving/,
    "zh-hant": /六份[\s\S]*900 公克生豬肉[\s\S]*每份約 150 公克/,
    ja: /6人分[\s\S]*生の豚肉900g[\s\S]*約150g相当/,
    ko: /6인분[\s\S]*생돼지고기 900g[\s\S]*약 150g/,
    th: /6 ที่[\s\S]*หมูดิบ 900 กรัม[\s\S]*150 กรัมต่อที่/
  }, "six servings receive an equal raw-pork share");
});

test("Hyderabadi biryani overlaps prep safely and verifies chicken and rice before allocating six servings", () => {
  const recipe = get("hyderabadi-chicken-biryani");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [180, 75, 255]);
  assertSourceSeparation(recipe, [foodSafety]);

  for (const locale of localeOrder) {
    const marinade = bodyAt(recipe, 0, locale);
    const finish = bodyAt(recipe, 8, locale);
    assert.match(marinade, /2[–〜-]4/ , `${locale}: marinade is 2–4 hours`);
    assert.match(finish, /74°C/, `${locale}: chicken reaches the poultry endpoint`);
    assert.match(finish, /5/ , `${locale}: a recheck interval is present`);
  }
  assert.match(bodyAt(recipe, 0, "en"), /180-minute prep estimate uses 3 hours[\s\S]*While it chills/);
  assert.match(bodyAt(recipe, 8, "en"), /without touching bone[\s\S]*5-minute increments[\s\S]*clock is only a guide/);
  assert.match(bodyAt(recipe, 8, "en"), /six servings[\s\S]*167 g raw bone-in chicken equivalent[\s\S]*83 g dry-rice equivalent/);
  assert.match(bodyAt(recipe, 8, "zh-hant"), /六份[\s\S]*167 公克帶骨生雞肉份量[\s\S]*83 公克乾米份量/);
  assert.match(bodyAt(recipe, 8, "ja"), /6人分[\s\S]*約167g[\s\S]*約83g/);
  assert.match(bodyAt(recipe, 8, "ko"), /여섯 몫[\s\S]*약 167g[\s\S]*약 83g/);
  assert.match(bodyAt(recipe, 8, "th"), /6 ที่[\s\S]*167 กรัม[\s\S]*83 กรัม/);
});

test("tempura chills and separates raw shrimp, uses visual doneness, and serves one shrimp per person", () => {
  const recipe = get("tempura");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 20, 50]);
  assertSourceSeparation(recipe, [seafoodSafety]);

  const shrimpPrep = bodyAt(recipe, 0, "en");
  assert.match(shrimpPrep, /Keep the shrimp covered and refrigerated[\s\S]*separate clean board and utensils/);
  const donenessPatterns = {
    en: /firm, pearly white, and opaque throughout[\s\S]*Do not use a fixed internal temperature/,
    "zh-hant": /結實、呈珍珠白且完全不透明[\s\S]*不套用固定內部溫度/,
    ja: /身が締まり、真珠色で全体が不透明[\s\S]*一律の内部温度は当てはめません/,
    ko: /단단하고 진주빛을 띠며 전체가 불투명[\s\S]*일률적인 내부 온도를 적용하지 않는다/,
    th: /แน่น มีสีขาวมุกและทึบแสงทั่ว[\s\S]*ไม่กำหนดอุณหภูมิภายในแบบตายตัว/
  };
  const servingPatterns = {
    en: /two shrimp between two plates, one per serving/,
    "zh-hant": /兩尾蝦分成兩份，每份一尾/,
    ja: /えび2尾を2人分に1尾ずつ/,
    ko: /새우 두 마리를 두 접시에 한 마리씩/,
    th: /กุ้ง 2 ตัวใส่ 2 จาน ที่ละ 1 ตัว/
  };
  for (const locale of localeOrder) {
    assert.match(bodyAt(recipe, 6, locale), donenessPatterns[locale], `${locale}: shrimp use the FDA visual endpoint`);
    assert.doesNotMatch(bodyAt(recipe, 6, locale), /63°C|145°F/, `${locale}: no fixed shrimp internal temperature`);
    assert.match(bodyAt(recipe, 7, locale), servingPatterns[locale], `${locale}: one shrimp is allocated per serving`);
  }
});

test("lamingtons gives the sponge a pan, doneness cue, cooling schedule, and sixteen measured jam portions", () => {
  const recipe = get("lamingtons");
  assert.equal(recipe.servings, 16);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [165, 25, 190]);
  assertSourceSeparation(recipe);

  for (const locale of localeOrder) {
    assert.match(bodyAt(recipe, 0, locale), /20/ , `${locale}: the pan dimension is stated`);
    assert.match(bodyAt(recipe, 2, locale), /180°C/ , `${locale}: the oven setting is stated`);
    assert.match(bodyAt(recipe, 2, locale), /20[–〜-]25/ , `${locale}: the bake time is a guide`);
    assert.match(bodyAt(recipe, 2, locale), /3/ , `${locale}: the bake can continue in checks`);
    assert.match(bodyAt(recipe, 3, locale), /45/ , `${locale}: the cooling time is stated`);
    assert.match(bodyAt(recipe, 3, locale), /1 hour|1 小時|1時間|1시간|1 ชั่วโมง/ , `${locale}: the chill time is stated`);
    assert.match(bodyAt(recipe, 4, locale), /sixteen|16/ , `${locale}: the batch is divided into sixteen squares`);
    assert.match(bodyAt(recipe, 6, locale), /30/ , `${locale}: the coating set time is stated`);
  }
  assert.match(bodyAt(recipe, 2, "en"), /springy centre[\s\S]*edges that begin to pull/);
  assert.match(bodyAt(recipe, 4, "en"), /180 g jam[\s\S]*about 11 g jam on average/);
  assert.match(bodyAt(recipe, 6, "en"), /sixteen equal pieces, one per serving/);
});
