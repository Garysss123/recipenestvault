import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["oyster-omelette", "mandu", "bun-rieu", "cha-gio"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const temperatureSource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const seafoodSource = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
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

function officialSources(recipe, urls) {
  const dishSources = recipe.sources.filter((source) => !source.title.startsWith(officialPrefix));
  assert.ok(dishSources.length >= 2, `${recipe.id}: at least two dish references remain distinct`);
  for (const url of urls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith(officialPrefix)),
      `${recipe.id}: ${url} is credited as official food-safety guidance`);
  }
}

test("thirty-ninth batch retains 353 recipes and 18 exclusions while extending five-locale coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale method regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 260);
  assert.equal(new Set(covered).size, 260);
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 256, "the 256 other reviewed recipes remain");
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "none of the four recipes is excluded");
  assert.ok(ids.every((id) => covered.includes(id)), "all four recipes enter shared route coverage");
  assert.equal(recipes.length - excludedIds.length - covered.length, 75, "75 eligible recipes remain for later review");

  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: method is localized`);
    }
  }
});

test("Taiwanese oyster omelette separately checks the egg and shucked oysters", () => {
  const recipe = get("oyster-omelette");
  assert.equal(recipe.servings, 2);
  const finish = step(recipe, "Add egg and greens");
  everyLocale(finish, {
    en: /egg layer at 71°C \(160°F\)[\s\S]*oyster centre at 63°C \(145°F\)[\s\S]*15-second increments/,
    "zh-hant": /蛋層達 71°C（160°F）[\s\S]*蚵仔中心達 63°C（145°F）[\s\S]*每次再煎 15 秒/,
    ja: /卵の層が完全に固まり71°C（160°F）[\s\S]*牡蠣の中心が63°C（145°F）[\s\S]*15秒ずつ焼き足して/,
    ko: /달걀층이 완전히 굳어 71°C\(160°F\)[\s\S]*굴 중심은 63°C\(145°F\)[\s\S]*15초씩 더 익혀/,
    th: /ชั้นไข่ส่วนหนาสุดให้ถึง 71°C \(160°F\)[\s\S]*หอยตัวใหญ่สุดให้ถึง 63°C \(145°F\)[\s\S]*ครั้งละ 15 วินาที/
  }, "the egg and oyster endpoints and recheck interval are localized");
  everyLocale(step(recipe, "Repeat and sauce"), {
    en: /half the sauce[\s\S]*remaining ingredients/,
    "zh-hant": /一半醬汁[\s\S]*其餘材料再做一份/,
    ja: /たれをかけ[\s\S]*残りも同様に焼いて/,
    ko: /소스를 얹고[\s\S]*나머지도 같은 방식으로 부쳐/,
    th: /ราดซอสครึ่งหนึ่ง[\s\S]*แล้วทำอีกชิ้น/
  }, "two omelettes divide the recipe and sauce evenly");
  officialSources(recipe, [temperatureSource, seafoodSource]);
});

test("mandu uses the official ground-pork endpoint and keeps chicken and reheating endpoints distinct", () => {
  const recipe = get("mandu");
  assert.equal(recipe.servings, 5);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [75, 60, 135]);
  const manduTimedMinutes = 6 + 2 * (12 + 2) + 2 * 3;
  assert.equal(manduTimedMinutes, 40, "tester, two upper steam windows, rechecks, and batch rests are included");
  assert.ok(recipe.cookMinutes >= manduTimedMinutes, "cook estimate leaves time for water heating and steam recovery");
  assert.ok(recipe.ingredients.some((row) => row.amount === "40" && row.item.en === "round Korean dumpling wrappers, 9 cm"));
  everyLocale(step(recipe, "Cook a safety tester"), {
    en: /centre reaches 71°C \(160°F\)/,
    "zh-hant": /中心達 71°C（160°F）/,
    ja: /中心が71°C（160°F）/,
    ko: /중심이 71°C\(160°F\)/,
    th: /ใจกลางถึง 71°C \(160°F\)/
  }, "the raw-pork tester reaches the ground-meat minimum");
  everyLocale(step(recipe, "Steam to 71°C"), {
    en: /centre of the largest mandu reaches 71°C \(160°F\)[\s\S]*add 2 minutes and recheck/,
    "zh-hant": /最大顆中心須達 71°C（160°F）[\s\S]*再蒸 2 分鐘並重新測量/,
    ja: /最大の中心が71°C（160°F）[\s\S]*2分追加して再確認/,
    ko: /가장 큰 만두 중심이 71°C\(160°F\)[\s\S]*2분 더 쪄 다시 잽니다/,
    th: /ตรวจกลางชิ้นใหญ่สุดให้ถึง 71°C \(160°F\)[\s\S]*เพิ่ม 2 นาทีแล้ววัดซ้ำ/
  }, "both pork batches use 71°C with a measured recheck");
  everyLocale(step(recipe, "Steam the second batch"), {
    en: /remaining 20 for 10–12 minutes[\s\S]*largest centre reaches 71°C \(160°F\)[\s\S]*adding 2 minutes and rechecking/,
    "zh-hant": /剩餘 20 顆再蒸 10–12 分鐘[\s\S]*中心達 71°C（160°F）[\s\S]*再蒸 2 分鐘並重新測量/,
    ja: /残り20個を10〜12分蒸し[\s\S]*中心が71°C（160°F）[\s\S]*2分追加して再確認/,
    ko: /나머지 20개를 10–12분 찌고[\s\S]*중심이 71°C\(160°F\)[\s\S]*2분 더 쪄 다시 잽니다/,
    th: /นึ่งอีก 20 ชิ้น 10–12 นาที[\s\S]*ถึง 71°C \(160°F\)[\s\S]*นึ่งเพิ่ม 2 นาทีแล้ววัดซ้ำ/
  }, "the second pork batch also has a timed endpoint and recheck in every locale");
  everyLocale(step(recipe, "Rest briefly and serve"), {
    en: /serve 8 mandu per person/,
    "zh-hant": /五份各 8 顆/,
    ja: /1人8個/,
    ko: /한 사람에 8개씩/,
    th: /คนละ 8 ชิ้น/
  }, "40 measured mandu divide into five servings");
  assert.match(recipe.substitutions[0].en, /ground chicken thigh[\s\S]*74°C/);
  assert.match(recipe.storage.en, /Steam again[\s\S]*74°C/);
  officialSources(recipe, [temperatureSource]);
});

test("bun rieu checks the mixed crab-pork dumpling at 71°C in every locale", () => {
  const recipe = get("bun-rieu");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [35, 130, 165]);
  const bunRieuTimedMinutes = 5 + 75 + 7 + 18 + 5 + 7 + 1;
  assert.equal(bunRieuTimedMinutes, 118, "upper timed stages cover blanching, stock, tomatoes, dumplings, tofu, noodles, and sprouts");
  assert.ok(recipe.cookMinutes >= bunRieuTimedMinutes, "cook estimate covers timed stages plus water heating");
  everyLocale(step(recipe, "Poach the delicate dumplings"), {
    en: /largest dumpling reaches 71°C \(160°F\)[\s\S]*2 minutes and check again/,
    "zh-hant": /最大顆中心需達 71°C（160°F）[\s\S]*再煮 2 分鐘並重新測量/,
    ja: /最大の中心が71°C（160°F）[\s\S]*2分煮て再確認/,
    ko: /가장 큰 완자 중심이 71°C\(160°F\)[\s\S]*2분 더 끓여 다시 잽니다/,
    th: /ก้อนใหญ่สุดถึง 71°C \(160°F\)[\s\S]*2 นาทีแล้วตรวจซ้ำ/
  }, "ground pork and egg in the crab dumpling reach the official endpoint");
  everyLocale(step(recipe, "Ladle without breaking the crab"), {
    en: /four crab dumplings/,
    "zh-hant": /每碗米粉放四顆蟹丸/,
    ja: /蟹つみれを4個ずつ/,
    ko: /면마다 게살 완자 네 개/,
    th: /ชามละสี่ก้อน/
  }, "the 16 dumplings divide into four bowls across locales");
  officialSources(recipe, [temperatureSource, seafoodSource]);
});

test("cha gio time covers four first-fry and crisping batches, and the filling reaches 71°C", () => {
  const recipe = get("cha-gio");
  assert.equal(recipe.servings, 4);
  assert.ok(recipe.ingredients.some((row) => row.amount === "20" && row.item.en === "thin 22 cm rice papers suitable for frying"));
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [55, 60, 115]);
  const rolls = 20;
  const batches = Math.ceil(rolls / 5);
  const timedHighMinutes = batches * 8 + 10 + batches * 2 + 2;
  assert.equal(timedHighMinutes, 52, "upper timed stages include four batches, the rack rest, and draining");
  assert.ok(recipe.cookMinutes >= timedHighMinutes, "cook estimate leaves time for oil heating and recovery");

  everyLocale(step(recipe, "Mix and check the filling"), {
    en: /centre reaches 71°C \(160°F\)/,
    "zh-hant": /中心 71°C（160°F）/,
    ja: /中心71°C（160°F）/,
    ko: /중심 71°C\(160°F\)/,
    th: /ใจกลาง 71°C \(160°F\)/
  }, "the test filling reaches the ground-meat endpoint before tasting");
  everyLocale(step(recipe, "First fry to cook the centre"), {
    en: /filling reaches 71°C \(160°F\)[\s\S]*2-minute increments and recheck/,
    "zh-hant": /餡達 71°C（160°F）[\s\S]*每次續炸 2 分鐘並重新測量/,
    ja: /だねが71°C（160°F）[\s\S]*2分ずつ追加して再確認/,
    ko: /속이 71°C\(160°F\)[\s\S]*2분씩 더 익혀 다시 잽니다/,
    th: /ไส้หมูและกุ้ง.*71°C \(160°F\)[\s\S]*ครั้งละ 2 นาทีแล้วตรวจซ้ำ/
  }, "all filling reaches the target, with a recheck interval, before second frying");
  everyLocale(step(recipe, "Serve with cool greens"), {
    en: /Serve five rolls per person/,
    "zh-hant": /每人五捲/,
    ja: /一人5本/,
    ko: /1인당 5개/,
    th: /คนละห้าชิ้น/
  }, "20 measured rolls divide into four servings");
  officialSources(recipe, [temperatureSource, seafoodSource]);
});
