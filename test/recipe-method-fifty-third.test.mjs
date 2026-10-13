import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["tod-mun-pla", "poulet-basquaise", "chocolate-chip-cookies", "japchae"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely",
  flour: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: published recipe exists`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} step exists`);
  return found;
}

function official(recipe, wanted) {
  for (const url of wanted) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: directly relevant official guidance is credited: ${url}`);
  }
}

function everyLocale(localized, pattern, label) {
  for (const locale of localeOrder) assert.match(localized[locale], pattern[locale], `${locale}: ${label}`);
}

test("fifty-third batch adds four unreviewed, non-excluded IDs to the shared five-locale ledger", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 284);
  assert.equal(new Set(covered).size, 284);
  assert.deepEqual(covered.slice(-76, -72), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.ok(ids.every((id) => !covered.slice(0, -76).includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 51);

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
    assert.notDeepEqual(recipe.ingredients, draft.ingredients, `${id}: published ingredient-use refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: published method refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: published storage refinements do not mutate the draft`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: official sources do not mutate the draft`);
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: two recipe references remain separate from official guidance`);
  }
});

test("Tod Mun Pla allocates the tester, 24 cakes, six servings, and fish-specific doneness and storage guidance", () => {
  const recipe = get("tod-mun-pla");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [50, 25, 75, 6]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("skinless boneless very cold white-fish fillet"))?.amount, "700 g");
  everyLocale(step(recipe, "Shape equal thin cakes").body, {
    en: /24 portions[\s\S]*40–42 g each[\s\S]*four cakes per each of 6 servings/,
    "zh-hant": /24 份[\s\S]*40–42 公克[\s\S]*六份餐點各有四個/,
    ja: /24等分[\s\S]*40〜42g[\s\S]*6人分として1人4個/,
    ko: /24등분[\s\S]*40–42g[\s\S]*6인분으로 한 사람당 4개/,
    th: /24 ส่วน[\s\S]*40–42 กรัม[\s\S]*6 ที่ ที่ละ 4 ชิ้น/
  }, "tester and serving yield are explicit");
  for (const title of ["Fry one safety tester", "Fry at a stable 170°C"]) {
    everyLocale(step(recipe, title).body, {
      en: /63°C \(145°F\)/,
      "zh-hant": /63°C（145°F）/,
      ja: /63°C（145°F）/,
      ko: /63°C \(145°F\)/,
      th: /63°C \(145°F\)/
    }, `${title}: official fish endpoint`);
  }
  assert.match(step(recipe, "Fry one safety tester").body.en, /170°C[\s\S]*not a food-safety temperature/);
  assert.match(step(recipe, "Fry at a stable 170°C").body.en, /four batches[\s\S]*3–4 minutes[\s\S]*not a safety test/);
  everyLocale(step(recipe, "Mix fresh sauce and serve").body, {
    en: /six ways[\s\S]*20 ml[\s\S]*20 g cucumber[\s\S]*6–7 g peanuts[\s\S]*four per person/,
    "zh-hant": /六份[\s\S]*20 毫升甜辣醬[\s\S]*20 公克小黃瓜[\s\S]*6–7 公克花生[\s\S]*每人四個/,
    ja: /6等分[\s\S]*ソース約20ml[\s\S]*きゅうり20g[\s\S]*約6〜7g[\s\S]*1人4個/,
    ko: /여섯 몫[\s\S]*소스 약 20ml[\s\S]*오이 20g[\s\S]*약 6–7g[\s\S]*한 사람당 4개/,
    th: /6 ส่วน[\s\S]*20 มล\.[\s\S]*แตงกวา 20 กรัม[\s\S]*6–7 กรัม[\s\S]*ที่ละ 4 ชิ้น/
  }, "sauce base and solid garnish allocations are clear per serving");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*chart lists finfish refrigerator categories[\s\S]*no cooked-fish leftover window[\s\S]*2-day suggestion[\s\S]*not an official safety cutoff[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*冷藏表列出魚類冷藏項目[\s\S]*沒有列熟魚剩食期限[\s\S]*2 天[\s\S]*不是官方食安期限[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*冷蔵表には魚の保存項目[\s\S]*調理済み魚の残り物期間は記載していません[\s\S]*2日以内[\s\S]*公式の安全期限ではありません[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\)[\s\S]*생선 냉장 항목은 있지만[\s\S]*조리한 생선 남은 음식의 기간은 없다[\s\S]*2일 권장[\s\S]*공식 안전 기한이 아니다[\s\S]*74°C \(165°F\)/,
    th: /2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*มีรายการปลา[\s\S]*ไม่ได้ระบุช่วงเก็บอาหารเหลือที่ปรุงจากปลา[\s\S]*2 วัน[\s\S]*ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ[\s\S]*74°C \(165°F\)/
  }, "storage safety and texture preference stay separate");
  official(recipe, [urls.temperatures, urls.seafood, urls.handling, urls.storage]);
});

test("Poulet Basquaise aligns the four chicken portions, elapsed time, poultry endpoint, and official leftover window", () => {
  const recipe = get("poulet-basquaise");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [20, 55, 75, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en.startsWith("boneless skinless chicken breasts"))?.amount, "800 g");
  assert.match(recipe.ingredients.find((row) => row.item.en.startsWith("boneless skinless chicken breasts"))?.item.en ?? "", /4 similar pieces of about 200 g each/);
  everyLocale(step(recipe, "Finish cooking the chicken").body, {
    en: /estimated 12–18 minutes[\s\S]*74°C \(165°F\)[\s\S]*2-minute increments/,
    "zh-hant": /12–18 分鐘（估值）[\s\S]*74°C（165°F）[\s\S]*每次續煮 2 分鐘/,
    ja: /目安として12〜18分[\s\S]*74°C（165°F）[\s\S]*2分ずつ追加/,
    ko: /12–18분으로 추정[\s\S]*74°C \(165°F\)[\s\S]*2분씩 더 익히고/,
    th: /12–18 นาที[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 2 นาที/
  }, "estimated simmer time is distinct from the poultry safety endpoint");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*3–4 days[\s\S]*within that official window[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*3–4 天[\s\S]*官方期限內的品質偏好[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*3〜4日[\s\S]*公式期間内の品質上の目安[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*3~4일[\s\S]*공식 기간 안의 품질상 권장[\s\S]*74°C \(165°F\)/,
    th: /2 ชั่วโมง[\s\S]*3–4 วัน[\s\S]*คุณภาพภายในช่วงทางการ[\s\S]*74°C \(165°F\)/
  }, "official storage guidance and three-day quality preference stay distinct");
  official(recipe, [urls.temperatures, urls.handling, urls.storage]);
});

test("Chocolate chip cookies portion the full batch and use flour guidance without inventing an internal-temperature target", () => {
  const recipe = get("chocolate-chip-cookies");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [45, 30, 75, 24]);
  everyLocale(step(recipe, "Portion and bake").body, {
    en: /24 equal portions[\s\S]*46 g each[\s\S]*190°C[\s\S]*10–12 minutes[\s\S]*neither is an internal-temperature safety endpoint/,
    "zh-hant": /24 份[\s\S]*46 公克[\s\S]*190°C[\s\S]*10–12 分鐘[\s\S]*不是中心溫度食安標準/,
    ja: /24等分[\s\S]*約46g[\s\S]*190°C[\s\S]*10〜12分[\s\S]*中心温度の安全基準ではありません/,
    ko: /24등분[\s\S]*약 46g[\s\S]*190°C[\s\S]*10–12분[\s\S]*중심 안전온도가 아니다/,
    th: /24 ส่วน[\s\S]*46 กรัม[\s\S]*190°C[\s\S]*10–12 นาที[\s\S]*ไม่ใช่เกณฑ์อุณหภูมิความปลอดภัย/
  }, "yield, oven setup, and texture estimate are synchronized");
  for (const locale of localeOrder) {
    assert.match(step(recipe, "Fold in flour and chocolate").body[locale], /raw|生|생|ดิบ/i, `${locale}: raw dough is not tasted`);
    assert.doesNotMatch(`${step(recipe, "Portion and bake").body[locale]} ${step(recipe, "Fold in flour and chocolate").body[locale]}`, /74°C|71°C|63°C|165°F|160°F|145°F/,
      `${locale}: no unrelated meat, fish, or leftover endpoint is imposed on a cookie bake`);
  }
  everyLocale(recipe.storage, {
    en: /up to 3 days[\s\S]*quality recommendation, not an official safety cutoff/,
    "zh-hant": /最多 3 天[\s\S]*品質建議，不是官方食安期限/,
    ja: /最長3日[\s\S]*品質上の目安で、公式の安全期限ではありません/,
    ko: /최대 3일[\s\S]*품질 권장이지 공식 안전 기한이 아니다/,
    th: /ถึง 3 วัน[\s\S]*คำแนะนำด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ/
  }, "room-temperature advice is labelled as a quality preference");
  official(recipe, [urls.flour]);
});

test("Vegetable japchae accounts for all listed soy sauce and uses leftover guidance without a cooking thermometer check", () => {
  const recipe = get("japchae");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [35, 30, 65, 6]);
  const soy = recipe.ingredients.find((row) => row.item.en.startsWith("Korean soy sauce"));
  assert.equal(soy?.amount, "80 ml");
  assert.match(soy?.item.en ?? "", /55 ml for noodles, 5 ml for chives, and 20 ml for enoki/);
  assert.match(step(recipe, "Cook the enoki").body.en, /remaining 10 ml neutral oil[\s\S]*20 ml soy sauce[\s\S]*remaining 3 g garlic/);
  everyLocale(step(recipe, "Finish with sesame").body, {
    en: /6 servings[\s\S]*50 g dry-noodle equivalent[\s\S]*within 2 hours/,
    "zh-hant": /六份[\s\S]*50 公克乾粉絲[\s\S]*2 小時內/,
    ja: /6人分[\s\S]*乾麺約50g[\s\S]*2時間以内/,
    ko: /여섯 몫[\s\S]*마른 당면 약 50g[\s\S]*두 시간 안에/,
    th: /6 ที่[\s\S]*เส้นแห้งประมาณ 50 กรัม[\s\S]*ภายใน 2 ชั่วโมง/
  }, "all six servings and room-temperature service window are clear");
  for (const locale of localeOrder) {
    assert.doesNotMatch(recipe.instructions.map((entry) => entry.body[locale]).join(" "), /63°C|71°C|74°C|145°F|160°F|165°F/,
      `${locale}: no internal-temperature endpoint is imposed on the vegetable dish`);
    assert.match(recipe.storage[locale], /74°C|74°C|74°C/);
  }
  assert.match(recipe.storage.en, /74°C \(165°F\)[\s\S]*not a cooking target/);
  official(recipe, [urls.handling, urls.temperatures]);
});
