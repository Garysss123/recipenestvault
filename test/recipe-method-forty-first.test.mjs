import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["pineapple-fried-rice", "fideua", "bun-cha", "cao-lau"];
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

function officialSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith(officialPrefix)),
    `${recipe.id}: official safety reference remains separately labelled`);
}

test("forty-first batch adds four eligible recipes and preserves registry, exclusions, and prior coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale method regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353, "the existing registry is unchanged");
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353, "all recipe IDs remain unique");
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(ids.length, 4);
  assert.equal(new Set(ids).size, 4);
  assert.equal(covered.length, 188, "shared detail routes cover 188 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 188, "all reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 184, "all 184 prior reviewed IDs remain");
  assert.ok(ids.every((id) => covered.includes(id)), "all four new IDs enter shared coverage");
  assert.ok(ids.every((id) => !excludedIds.includes(id)), "none of the new IDs is excluded");
  assert.equal(recipes.length - excludedIds.length - covered.length, 147, "147 eligible recipes remain after this batch");

  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: localized name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: all ingredients are localized`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: all method steps are localized`);
    }
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith(officialPrefix)).length >= 2,
      `${id}: two dish references remain separate from safety guidance`);
  }
});

test("pineapple fried rice gives the rice cooling, storage, reheating, and serving instructions", () => {
  const recipe = get("pineapple-fried-rice");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [35, 20, 55]);
  const rice = recipe.ingredients.find((row) => row.item.en.startsWith("cold cooked jasmine rice"));
  assert.equal(rice?.amount, "700 g");
  for (const locale of localeOrder) {
    assert.match(rice.item[locale], /1 hour|1 小時|1時間|1시간|1 ชั่วโมง/, `${locale}: rice is cooled and chilled promptly`);
    assert.match(rice.item[locale], /24 hours|24 小時|24時間|24시간|24 ชั่วโมง/, `${locale}: rice is used within one day`);
  }
  everyLocale(step(recipe, "Dry the rice and shrimp"), {
    en: /shallow container[\s\S]*within 1 hour[\s\S]*within 24 hours[\s\S]*only once[\s\S]*74°C/,
    "zh-hant": /淺容器[\s\S]*1 小時內冷藏[\s\S]*24 小時內使用[\s\S]*只回熱一次[\s\S]*74°C/,
    ja: /浅い容器[\s\S]*1時間以内に冷蔵[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*74°C/,
    ko: /얕은 용기[\s\S]*1시간 안에 냉장[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*74°C/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*74°C/
  }, "rice safety instructions and the reheating endpoint are localized");
  officialSource(recipe, riceSafety);
  officialSource(recipe, foodSafety);
  const serving = step(recipe, "Fold pineapple briefly and serve");
  everyLocale(serving, {
    en: /four servings[\s\S]*175 g cooked rice[\s\S]*75 g raw-shrimp equivalent/,
    "zh-hant": /均分四份[\s\S]*175 公克熟飯[\s\S]*75 公克生蝦/,
    ja: /4人分[\s\S]*ご飯約175g[\s\S]*生エビ換算約75g/,
    ko: /네 몫[\s\S]*밥 약 175g[\s\S]*생새우 환산 약 75g/,
    th: /4 ที่[\s\S]*ข้าวสุกประมาณ 175 กรัม[\s\S]*กุ้งดิบ 75 กรัม/
  }, "the four portions state the cooked-rice and raw-shrimp equivalents");
  assert.equal(700 / recipe.servings, 175);
  assert.equal(300 / recipe.servings, 75);
});

test("fideua checks every seafood type and divides the existing ingredients across six servings", () => {
  const recipe = get("fideua");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 45, 70]);
  const amount = (name) => recipe.ingredients.find((row) => row.item.en.startsWith(name))?.amount;
  assert.equal(amount("large raw prawns"), "300 g");
  assert.equal(amount("monkfish fillet"), "300 g");
  assert.equal(amount("cleaned cuttlefish or squid"), "200 g");
  assert.equal(amount("short fideuà noodles"), "400 g");
  everyLocale(step(recipe, "Sear the prawns"), {
    en: /clean tongs[\s\S]*clean plate[\s\S]*finish cooking with the noodles/,
    "zh-hant": /乾淨夾子[\s\S]*乾淨盤[\s\S]*麵一起煮熟/,
    ja: /清潔なトング[\s\S]*清潔な皿[\s\S]*最後まで加熱/,
    ko: /깨끗한 집게[\s\S]*깨끗한 접시[\s\S]*마저 익힙니다/,
    th: /คีมสะอาด[\s\S]*จานสะอาด[\s\S]*ปรุงต่อกับเส้น/
  }, "partially cooked prawns are kept off raw-seafood contact surfaces");
  everyLocale(step(recipe, "Cook the noodles and return the prawns"), {
    en: /thickest monkfish[\s\S]*largest cuttlefish or squid pieces reach 63°C \(145°F\)[\s\S]*largest prawns are firm, pearly, and opaque[\s\S]*2-minute increments and recheck/,
    "zh-hant": /最厚的鮟鱇魚塊[\s\S]*最大的墨魚或魷魚塊須達 63°C（145°F）[\s\S]*最大蝦仁須緊實、珠白且不透明[\s\S]*每次 2 分鐘後重測/,
    ja: /最も厚いアンコウ[\s\S]*最大のコウイカまたはイカの中心が63°C（145°F）[\s\S]*最も大きいエビが締まり、真珠色で不透明[\s\S]*2分ずつ追加して再確認/,
    ko: /가장 두꺼운 아귀살[\s\S]*가장 큰 갑오징어 또는 오징어 조각은 63°C \(145°F\)[\s\S]*가장 큰 새우는 단단하고 진주빛이며 불투명[\s\S]*2분씩 더 익힌 뒤 다시 잽니다/,
    th: /ส่วนหนาสุดของปลา monkfish[\s\S]*ชิ้นหมึกกระดองหรือปลาหมึกที่ใหญ่สุดถึง 63°C \(145°F\)[\s\S]*กุ้งตัวใหญ่สุดแน่น สีมุกและทึบ[\s\S]*ครั้งละ 2 นาทีแล้วตรวจซ้ำ/
  }, "fish, cuttlefish or squid, and prawns all have a localized doneness cue");
  officialSource(recipe, seafoodSafety);
  everyLocale(step(recipe, "Rest before serving"), {
    en: /six servings[\s\S]*67 g dry-noodle equivalent[\s\S]*50 g raw prawns[\s\S]*50 g raw monkfish[\s\S]*33 g raw cuttlefish or squid/,
    "zh-hant": /均分六份[\s\S]*67 公克乾麵[\s\S]*50 公克生蝦[\s\S]*50 公克生鮟鱇魚[\s\S]*33 公克生墨魚或魷魚/,
    ja: /6人分[\s\S]*乾麺換算約67g[\s\S]*生エビ約50g[\s\S]*生アンコウ約50g[\s\S]*約33g/,
    ko: /여섯 몫[\s\S]*마른 면 환산 약 67g[\s\S]*생새우 50g[\s\S]*생아귀 50g[\s\S]*33g/,
    th: /แบ่ง 6 ที่[\s\S]*เส้นแห้งประมาณ 67 กรัม[\s\S]*กุ้งดิบ 50 กรัม[\s\S]*ปลา monkfish ดิบ 50 กรัม[\s\S]*หมึกดิบ 33 กรัม/
  }, "six servings make the site allocation explicit");
  assert.equal(400 / recipe.servings, 400 / 6);
  assert.equal(300 / recipe.servings, 50);
  assert.equal(200 / recipe.servings, 200 / 6);
});

test("bun cha checks every ground-pork patty and states per-person portions", () => {
  const recipe = get("bun-cha");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [100, 30, 130]);
  const pork = recipe.ingredients.find((row) => row.item.en.startsWith("ground pork"));
  const noodles = recipe.ingredients.find((row) => row.item.en === "dried rice vermicelli");
  assert.equal(pork?.amount, "700 g");
  assert.equal(noodles?.amount, "320 g");
  everyLocale(step(recipe, "Grill until charred and cooked"), {
    en: /thickest centre of several large patties[\s\S]*71°C \(160°F\)[\s\S]*1-minute increments[\s\S]*recheck/,
    "zh-hant": /數個大肉餅最厚中心[\s\S]*71°C（160°F）[\s\S]*每次續烤 1 分鐘並重測/,
    ja: /大きめの肉だねを数個[\s\S]*71°C（160°F）[\s\S]*1分ずつ焼き足して再確認/,
    ko: /큰 패티 여러 개[\s\S]*71°C \(160°F\)[\s\S]*1분씩 더 구운 뒤 다시 재고/,
    th: /แพตตีชิ้นใหญ่หลายชิ้น[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 1 นาทีแล้วตรวจซ้ำ/
  }, "ground pork is checked and reheated in a localized interval");
  officialSource(recipe, foodSafety);
  everyLocale(step(recipe, "Serve pork in the dipping bowls"), {
    en: /four patties[\s\S]*175 g raw-pork equivalent[\s\S]*80 g dry vermicelli/,
    "zh-hant": /每人四個肉餅[\s\S]*175 公克生豬肉[\s\S]*80 公克乾米粉/,
    ja: /1人に肉だね4個[\s\S]*約175g[\s\S]*1人約80g/,
    ko: /1인당 패티 네 개[\s\S]*약 175g[\s\S]*1인당 약 80g/,
    th: /4 ชิ้น[\s\S]*175 กรัม[\s\S]*คนละประมาณ 80 กรัม/
  }, "each of four servings has four patties and a measured noodle portion");
  assert.equal(700 / recipe.servings, 175);
  assert.equal(320 / recipe.servings, 80);
  assert.equal(16 / recipe.servings, 4);
});

test("cao lau covers the full braise and kitchen schedule, with editorial tenderness and pork safety guidance", () => {
  const recipe = get("cao-lau");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [80, 135, 215]);
  const pork = recipe.ingredients.find((row) => row.item.en.startsWith("boneless pork shoulder"));
  assert.equal(pork?.amount, "600 g");
  const timedUpperStages = 20 + 2 + 65 + 10 + 10 + 5 + 2.25 + 5 + 1 + 1 + 10;
  assert.ok(recipe.cookMinutes >= timedUpperStages, "cook estimate includes searing, the longest braise and reduction, frying, boiling, resting, and one tenderness recheck");
  everyLocale(step(recipe, "Braise until sliceably tender"), {
    en: /50–65 minutes[\s\S]*site estimate[\s\S]*85°C[\s\S]*10-minute increments[\s\S]*63°C \(145°F\)[\s\S]*3-minute rest/,
    "zh-hant": /50–65 分鐘[\s\S]*本站估算[\s\S]*85°C[\s\S]*每次 10 分鐘[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘/,
    ja: /50〜65分[\s\S]*当サイトの目安[\s\S]*85°C[\s\S]*10分ずつ[\s\S]*63°C（145°F）[\s\S]*3分休ませる/,
    ko: /50–65분[\s\S]*사이트 추정치[\s\S]*85°C[\s\S]*10분씩 더[\s\S]*63°C \(145°F\)[\s\S]*3분 휴지/,
    th: /50–65 นาที[\s\S]*ค่าประมาณของเว็บไซต์[\s\S]*85°C[\s\S]*ครั้งละ 10 นาที[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที/
  }, "the measured braise target, continuation interval, and official whole-pork guidance are distinguished");
  officialSource(recipe, foodSafety);
  everyLocale(step(recipe, "Assemble a lightly sauced bowl"), {
    en: /four bowls[\s\S]*150 g raw-pork equivalent[\s\S]*75 ml sauce/,
    "zh-hant": /分四碗[\s\S]*150 公克生豬肉[\s\S]*75 毫升醬/,
    ja: /4つの器[\s\S]*生の豚肉換算150g[\s\S]*約75ml/,
    ko: /네 그릇[\s\S]*생돼지고기 환산 150g[\s\S]*75ml/,
    th: /สี่ชาม[\s\S]*หมูดิบ 150 กรัม[\s\S]*75 มล\./
  }, "the four bowls give the raw-pork and sauce allocation");
  assert.equal(600 / recipe.servings, 150);
});
