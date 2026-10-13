import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["risotto-alla-milanese", "lasagne-bolognese", "small-sausage-big-sausage", "pulpo-a-la-gallega"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely",
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: recipe exists`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} step exists`);
  return found;
}

function everyLocale(localized, pattern, label) {
  for (const locale of localeOrder) assert.match(localized[locale], pattern[locale], `${locale}: ${label}`);
}

function official(recipe, expectedUrls) {
  for (const url of expectedUrls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: directly relevant official guidance is credited separately: ${url}`);
  }
}

test("fifty-fourth batch adds four previously unreviewed, non-excluded IDs to the shared five-locale ledger", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusions = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusions, "standing 18-slug exclusion list exists");
  const excludedIds = [...exclusions.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 276);
  assert.equal(new Set(covered).size, 276);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.deepEqual(covered.slice(-64, -60), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.ok(ids.every((id) => !covered.slice(0, -64).includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 59);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft remains present`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient details are localized`);
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: full method is localized`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: storage card is localized`);
    }
    assert.notDeepEqual(recipe.ingredients, draft.ingredients, `${id}: published ingredient refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: published method refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: published storage refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: official sources do not mutate the draft`);
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: at least two dish references remain distinct from official safety guidance`);
  }
});

test("Risotto accounts for the saffron stock and follows rice-specific leftover guidance", () => {
  const recipe = get("risotto-alla-milanese");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [15, 30, 45, 4]);
  const stock = recipe.ingredients.find((row) => row.item.en.startsWith("low-salt chicken or vegetable stock"));
  assert.equal(stock?.amount, "1.2 L");
  everyLocale(step(recipe, "Steep the saffron").body, {
    en: /all 1\.2 L low-salt stock[\s\S]*120 ml[\s\S]*comes from the listed stock[\s\S]*remaining 1\.08 L/,
    "zh-hant": /全部 1\.2 公升[\s\S]*120 毫升[\s\S]*包含在清單的高湯總量內[\s\S]*1\.08 公升/,
    ja: /1\.2L[\s\S]*120ml[\s\S]*追加分ではありません[\s\S]*1\.08L/,
    ko: /1\.2L[\s\S]*120ml[\s\S]*추가분이 아니다[\s\S]*1\.08L/,
    th: /1\.2 ลิตร[\s\S]*120 มล\.[\s\S]*ไม่ใช่ส่วนที่เพิ่มมา[\s\S]*1\.08 ลิตร/
  }, "all stock portions have a defined use");
  assert.match(step(recipe, "Add stock gradually").body.en, /continue for 6–8 minutes; this stock stage takes about 16–18 minutes total[\s\S]*texture estimate, not a safety endpoint/);
  everyLocale(recipe.storage, {
    en: /within 1 hour[\s\S]*4°C \(40°F\)[\s\S]*within 24 hours[\s\S]*Reheat only once[\s\S]*steaming hot throughout/,
    "zh-hant": /1 小時內[\s\S]*4°C（40°F）[\s\S]*24 小時內[\s\S]*只回熱一次[\s\S]*冒熱氣/,
    ja: /1時間以内[\s\S]*4°C（40°F）[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*湯気/,
    ko: /1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*김/,
    th: /4°C \(40°F\)[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*ไอ/
  }, "all locales share the official cooked-rice storage rules");
  official(recipe, [urls.rice, urls.handling, urls.storage]);
});

test("Lasagne allocates all sheets, ragù, béchamel, and cheese and checks casserole doneness", () => {
  const recipe = get("lasagne-bolognese");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [45, 75, 120, 8]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("prepared Bolognese ragù"))?.amount, "900 g");
  assert.match(step(recipe, "Build the layers").body.en, /all 12 fresh sheets[\s\S]*four layers of three[\s\S]*100 g ragù[\s\S]*one 200 g portion[\s\S]*30 g Parmigiano[\s\S]*all four portions[\s\S]*all 900 g ragù/);
  everyLocale(step(recipe, "Bake until bubbling").body, {
    en: /estimated 35–40 minutes[\s\S]*quality cues[\s\S]*centre of the casserole[\s\S]*74°C \(165°F\)[\s\S]*5-minute increments/,
    "zh-hant": /約 35–40 分鐘[\s\S]*品質指標[\s\S]*烤皿中心[\s\S]*74°C（165°F）[\s\S]*5 分鐘/,
    ja: /35〜40分[\s\S]*品質の目安[\s\S]*皿の中心[\s\S]*74°C（165°F）[\s\S]*5分ずつ/,
    ko: /35–40분[\s\S]*품질상 기준[\s\S]*캐서롤 중심[\s\S]*74°C \(165°F\)[\s\S]*5분씩/,
    th: /35–40 นาที[\s\S]*เกณฑ์คุณภาพ[\s\S]*ตรงกลางถาด[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 5 นาที/
  }, "estimated oven time is separate from the official casserole endpoint");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*for best texture[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*維持口感[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*食感[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*식감[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*เนื้อสัมผัส[\s\S]*74°C \(165°F\)/
  }, "official leftover storage and quality preference stay distinct");
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("Small sausage in big sausage resolves salt and oil allocations and applies rice-specific storage", () => {
  const recipe = get("small-sausage-big-sausage");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [390, 55, 445, 6]);
  const salt = recipe.ingredients.find((row) => row.item.en.startsWith("fine salt"));
  const oil = recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil"));
  assert.equal(salt?.amount, "6 g");
  assert.equal(oil?.amount, "15 ml");
  everyLocale(salt.item, {
    en: /4 g for rice and 2 g for cucumber/, "zh-hant": /米飯 4 公克、小黃瓜 2 公克/,
    ja: /米用4g、きゅうり用2g/, ko: /밥에 4g, 오이에 2g/, th: /4 กรัมสำหรับข้าว และ 2 กรัมสำหรับแตงกวา/
  }, "salt uses match the listed 6 g total");
  everyLocale(oil.item, {
    en: /5 ml for the rice and 10 ml for brushing/, "zh-hant": /5 毫升拌米飯、10 毫升刷米腸/,
    ja: /米に5ml、米腸に塗る分10ml/, ko: /밥에 5ml, 쌀 소시지에 바르는 데 10ml/,
    th: /5 มล.คลุกข้าว และ 10 มล.ทาไส้ข้าว/
  }, "oil uses match the listed 15 ml total");
  everyLocale(step(recipe, "Steam until the rice is tender").body, {
    en: /six rice links[\s\S]*35–40 minutes[\s\S]*texture cues, not an internal-temperature test/,
    "zh-hant": /6 段米腸[\s\S]*35–40 分鐘[\s\S]*不是中心溫度測試/,
    ja: /米腸6本[\s\S]*35〜40分[\s\S]*中心温度を測る工程ではありません/,
    ko: /쌀 소시지 여섯 개[\s\S]*35–40분[\s\S]*중심 온도 검사가 아니다/,
    th: /ไส้ข้าวทั้ง 6 ชิ้น[\s\S]*35–40 นาที[\s\S]*ไม่ใช่การวัดอุณหภูมิภายใน/
  }, "rice doneness uses a texture cue, not an unrelated thermometer target");
  assert.doesNotMatch(step(recipe, "Grill both sausages").body.en, /71°C|74°C|160°F|165°F/,
    "fully cooked sausages follow package directions instead of a raw-meat or leftover endpoint");
  assert.match(step(recipe, "Grill both sausages").body.en, /55 minutes/);
  everyLocale(recipe.storage, {
    en: /within 1 hour[\s\S]*4°C \(40°F\)[\s\S]*within 24 hours[\s\S]*Reheat only once[\s\S]*steaming hot all the way through/,
    "zh-hant": /1 小時內[\s\S]*4°C（40°F）[\s\S]*24 小時內[\s\S]*只回熱一次[\s\S]*中心冒熱氣/,
    ja: /1時間以内[\s\S]*4°C（40°F）[\s\S]*24時間以内[\s\S]*1回だけ[\s\S]*湯気/,
    ko: /1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*김/,
    th: /4°C \(40°F\)[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*ไอ/
  }, "all locales share rice-specific cooling, storage, and reheating guidance");
  official(recipe, [urls.rice, urls.handling, urls.storage]);
});

test("Pulpo separates seafood safety temperature from tenderness and portions all measured toppings", () => {
  const recipe = get("pulpo-a-la-gallega");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [20, 90, 110, 6]);
  everyLocale(step(recipe, "Simmer until the thick tentacle is tender").body, {
    en: /The 40–50 minutes is an estimate[\s\S]*63°C \(145°F\)[\s\S]*safety check[\s\S]*skewer[\s\S]*for texture/,
    "zh-hant": /40–50 分鐘是估值[\s\S]*63°C（145°F）[\s\S]*食安檢查[\s\S]*竹籤[\s\S]*口感/,
    ja: /40〜50分は目安[\s\S]*63°C（145°F）[\s\S]*安全確認[\s\S]*食感[\s\S]*串/,
    ko: /40–50분은 추정치[\s\S]*63°C \(145°F\)[\s\S]*안전 확인 기준[\s\S]*식감[\s\S]*꼬치/,
    th: /40–50 นาทีเป็นค่าประมาณ[\s\S]*63°C \(145°F\)[\s\S]*ตรวจความปลอดภัย[\s\S]*เนื้อสัมผัส[\s\S]*ไม้เสียบ/
  }, "seafood safety endpoint is distinct from octopus tenderness");
  assert.doesNotMatch(recipe.instructions.map((entry) => entry.body.en).join(" "), /74°C|165°F/,
    "the leftovers endpoint is not applied to octopus cooking");
  assert.match(step(recipe, "Cook the potatoes in the octopus water").body.en, /Measure 2 L[\s\S]*all 700 g peeled potatoes[\s\S]*six plates/);
  assert.match(step(recipe, "Season in the Galician order").body.en, /all 8 g coarse salt[\s\S]*4 g sweet paprika[\s\S]*1 g hot paprika[\s\S]*full 60 ml olive oil[\s\S]*about 10 ml per plate/);
  assert.match(step(recipe, "Season in the Galician order").body.en, /budget about 90 minutes of cook time[\s\S]*safety or tenderness checks may require longer/);
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*1 day here for quality, not as an official safety cutoff[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*1 天內[\s\S]*品質考量，不是官方食安期限[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*1日以内[\s\S]*品質上の目安[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*1일 이내[\s\S]*품질상 기준이지 공식 안전 기한이 아니다[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*ภายใน 1 วัน[\s\S]*เรื่องคุณภาพ ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ[\s\S]*74°C \(165°F\)/
  }, "cooked-octopus window is labelled as quality; leftovers reheating stays official");
  official(recipe, [urls.seafood, urls.temperatures, urls.handling, urls.storage]);
});
