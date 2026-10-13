import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["moo-satay", "biscuits-and-gravy", "sesame-oil-chicken", "quiche-lorraine"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
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

function everyLocale(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function official(recipe) {
  for (const url of Object.values(urls)) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: applicable official guidance is credited separately: ${url}`);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${recipe.id}: two culinary references remain separate from official guidance`);
}

test("fifty-seventh batch adds exactly four eligible IDs and preserves the previous exact-slug ledger", async () => {
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
  assert.equal(covered.length, 320);
  assert.equal(new Set(covered).size, 320);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.slice(0, -96).length, 224);
  assert.deepEqual(covered.slice(-96, -92), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.ok(ids.every((id) => !covered.slice(0, -96).includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 15);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft remains present`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: time fields add up`);
    assert.deepEqual(recipe.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: existing illustrations remain mapped to the same method steps`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: name exists`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(recipe.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: complete method exists`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: storage is localized`);
    }
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: published method does not mutate the source draft`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: published storage does not mutate the source draft`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: official sources do not mutate the source draft`);
    official(recipe);
  }
});

test("moo satay distinguishes intact pork strips from ground meat and counts the marinade wait", () => {
  const recipe = get("moo-satay");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [285, 30, 315]);
  assert.equal(recipe.instructions.length, 10);
  everyLocale(step(recipe, "Cut even pork strips").body, {
    en: /800 g pork shoulder[\s\S]*6 × 2\.5 × 0\.75 cm[\s\S]*about 11 g[\s\S]*roughly 72 strips[\s\S]*24 skewers/,
    "zh-hant": /800 公克豬肩肉[\s\S]*6 × 2\.5 × 0\.75 公分[\s\S]*約 11 公克[\s\S]*約可切 72 條[\s\S]*24 串/,
    ja: /豚肩肉800g[\s\S]*約6×2\.5×0\.75cm[\s\S]*約11g[\s\S]*約72枚[\s\S]*竹串24本/,
    ko: /돼지 어깨살 800g[\s\S]*약 6 × 2\.5 × 0\.75cm[\s\S]*약 11g[\s\S]*약 72조각[\s\S]*꼬치 24개/,
    th: /หมูไหล่ 800 กรัม[\s\S]*6 × 2\.5 × 0\.75 ซม\.[\s\S]*ประมาณ 11 กรัม[\s\S]*ราว 72 ชิ้น[\s\S]*ไม้เสียบ 24 ไม้/
  }, "the listed meat weight divides across the stated number of skewers");
  everyLocale(step(recipe, "Thread the pork and discard raw marinade").body, {
    en: /24 bamboo skewers[\s\S]*about three[\s\S]*roughly 11 g[\s\S]*all 72 strips evenly/,
    "zh-hant": /24 根竹籤[\s\S]*約串 3 條[\s\S]*約 11 公克[\s\S]*約 72 條平均分配/,
    ja: /竹串24本[\s\S]*約11gの豚肉を各串に3枚ほど[\s\S]*約72枚を均等に分け/,
    ko: /대나무 꼬치 24개[\s\S]*약 11g 돼지고기[\s\S]*꼬치마다 약 3장씩[\s\S]*약 72조각을 고르게 나누/,
    th: /ไม้ไผ่ 24 ไม้[\s\S]*ประมาณ 11 กรัม[\s\S]*ราว 3 ชิ้นต่อไม้[\s\S]*ราว 72 ชิ้น/
  }, "all measured pork is portioned across the skewers");
  everyLocale(step(recipe, "Check whole-cut pork and rest").body, {
    en: /intact shoulder cut is not ground meat[\s\S]*63°C \(145°F\)[\s\S]*rest[\s\S]*3 minutes[\s\S]*time and browning alone do not establish safety/,
    "zh-hant": /完整豬肩肉切成的肉條，不是絞肉[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*時間與上色不能單獨證明安全/,
    ja: /塊のままの豚肩肉を切ったもので、ひき肉ではありません[\s\S]*63°C（145°F）[\s\S]*3分休ませます[\s\S]*時間や焼き色だけで安全とは判断しません/,
    ko: /통째 어깨살에서 자른 것이며 다짐육이 아니다[\s\S]*63°C \(145°F\)[\s\S]*3분 쉰다[\s\S]*시간과 갈색빛만으로 안전을 판단하지 않는다/,
    th: /หั่นจากไหล่หมูทั้งชิ้น ไม่ใช่เนื้อบด[\s\S]*63°C \(145°F\)[\s\S]*พักบนถาดสะอาด 3 นาที[\s\S]*เวลาและสีเกรียมเพียงอย่างเดียวไม่ยืนยันความปลอดภัย/
  }, "whole-cut endpoint, rest, and quality estimate are distinct");
  everyLocale(recipe.storage, {
    en: /[Ww]ithin 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*not leftover reheating/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*不是剩菜復熱標準/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*残り物の再加熱基準ではありません/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*남은 음식 재가열 기준이 아니다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*ไม่ใช่เกณฑ์อุ่นอาหารเหลือ/
  }, "fresh whole-cut resting and leftover reheating are separate instructions");
  official(recipe);
});

test("sausage gravy measures ground pork at its own endpoint and allocates six plates", () => {
  const recipe = get("biscuits-and-gravy");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 35, 60]);
  assert.equal(recipe.instructions.length, 9);
  assert.deepEqual(recipe.ingredients.find((row) => row.item.en.startsWith("raw pork breakfast sausage"))?.amount, "450 g");
  everyLocale(step(recipe, "Cook ground pork sausage to its own endpoint").body, {
    en: /450 g raw pork breakfast sausage[\s\S]*7–9 minutes[\s\S]*ground pork sausage must reach 71°C \(160°F\)[\s\S]*browning and time alone are not the safety check/,
    "zh-hant": /450 公克生豬肉早餐香腸[\s\S]*7–9 分鐘[\s\S]*豬絞肉香腸須達 71°C（160°F）[\s\S]*上色與時間不能單獨作為安全判定/,
    ja: /豚肉ソーセージ450g[\s\S]*7〜9分[\s\S]*71°C（160°F）[\s\S]*色や時間だけでは安全と判断しません/,
    ko: /생 돼지고기 소시지 450g[\s\S]*7–9분[\s\S]*71°C \(160°F\)[\s\S]*색과 시간만으로 안전을 판단하지 않는다/,
    th: /ไส้กรอกหมูดิบ 450 กรัม[\s\S]*7–9 นาที[\s\S]*71°C \(160°F\)[\s\S]*สีและเวลาเพียงอย่างเดียวไม่ยืนยันความปลอดภัย/
  }, "ground sausage temperature is not confused with whole-cut pork");
  everyLocale(step(recipe, "Divide into six biscuits with gravy").body, {
    en: /one biscuit[\s\S]*six plates[\s\S]*one sixth of the gravy/,
    "zh-hant": /六個盤子[\s\S]*一個餅乾[\s\S]*六分之一/,
    ja: /6皿[\s\S]*1個ずつ[\s\S]*6分の1ずつ/,
    ko: /접시 6개[\s\S]*하나씩[\s\S]*6분의 1씩/,
    th: /หนึ่งชิ้น[\s\S]*6 ใบ[\s\S]*หนึ่งในหก/
  }, "six biscuits and gravy are portioned evenly");
  everyLocale(recipe.storage, {
    en: /[Ww]ithin 2 hours[\s\S]*shallow containers[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*71°C ground-sausage cooking endpoint is not the 74°C leftover-reheating endpoint/,
    "zh-hant": /2 小時內[\s\S]*淺容器[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*71°C[\s\S]*不同標準/,
    ja: /2時間以内[\s\S]*浅い容器[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*71°C[\s\S]*別です/,
    ko: /2시간 이내[\s\S]*얕은 용기[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*71°C[\s\S]*서로 다르다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภาชนะตื้น[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*71°C[\s\S]*ต่างจาก/
  }, "ground-meat cooking and leftover reheating endpoints remain distinct");
  official(recipe);
});

test("sesame-oil chicken checks poultry at 74°C and includes every timed cooking stage", () => {
  const recipe = get("sesame-oil-chicken");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [15, 50, 65]);
  assert.equal(recipe.instructions.length, 6);
  everyLocale(step(recipe, "Simmer until the thickest chicken reaches 74°C").body, {
    en: /500 ml water[\s\S]*20 minutes[\s\S]*5 minutes[\s\S]*near the bone without touching it[\s\S]*74°C \(165°F\)[\s\S]*2 minutes/,
    "zh-hant": /500 毫升水[\s\S]*20 分鐘[\s\S]*5 分鐘[\s\S]*靠近骨頭但不碰骨[\s\S]*74°C（165°F）[\s\S]*2 分鐘/,
    ja: /水500ml[\s\S]*約20分[\s\S]*約5分[\s\S]*骨に触れない[\s\S]*74°C（165°F）[\s\S]*2分ずつ/,
    ko: /물 500ml[\s\S]*약 20분[\s\S]*약 5분[\s\S]*뼈에 닿지 않게[\s\S]*74°C \(165°F\)[\s\S]*2분씩/,
    th: /น้ำ 500 มล\.[\s\S]*ประมาณ 20 นาที[\s\S]*ประมาณ 5 นาที[\s\S]*ไม่ให้แตะกระดูก[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 2 นาที/
  }, "bone-in poultry thermometer placement and timing estimate are clear");
  everyLocale(step(recipe, "Simmer the rice wine briefly").body, {
    en: /5 minutes[\s\S]*does not mean all alcohol has boiled away/,
    "zh-hant": /約 5 分鐘[\s\S]*不代表酒精已全部揮發/,
    ja: /約5分[\s\S]*アルコールがすべて飛ぶわけではありません/,
    ko: /약 5분[\s\S]*알코올이 모두 날아간다는 뜻은 아니다/,
    th: /ประมาณ 5 นาที[\s\S]*ไม่ได้หมายความว่าแอลกอฮอล์ระเหยหมด/
  }, "a short simmer is not described as removing all alcohol");
  everyLocale(recipe.storage, {
    en: /[Ww]ithin 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*20-minute simmer is an estimate/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*20 分鐘燉煮是估時/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*20分煮るのは目安/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*20분 끓이기는 예상 시간/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*เวลาเคี่ยว 20 นาทีเป็นเพียงประมาณการ/
  }, "poultry storage and reheating remain separate from initial cook timing");
  official(recipe);
});

test("quiche uses the egg-dish endpoint and keeps the leftover reheating value separate", () => {
  const recipe = get("quiche-lorraine");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [75, 90, 165]);
  assert.equal(recipe.instructions.length, 10);
  everyLocale(step(recipe, "Bake the custard to the egg-dish endpoint").body, {
    en: /estimated 35–45 minutes[\s\S]*egg dish such as quiche must reach 71°C \(160°F\)[\s\S]*texture cue[\s\S]*71°C is the safety endpoint[\s\S]*5-minute intervals/,
    "zh-hant": /估計烘烤 35–45 分鐘[\s\S]*quiche 這類蛋料理須達 71°C（160°F）[\s\S]*口感線索[\s\S]*71°C 才是安全熟度[\s\S]*5 分鐘再測/,
    ja: /目安35〜45分[\s\S]*キッシュのような卵料理は71°C（160°F）[\s\S]*食感の目安[\s\S]*71°Cが安全基準[\s\S]*5分ずつ/,
    ko: /약 35–45분[\s\S]*키슈 같은 달걀 요리는 71°C \(160°F\)[\s\S]*식감 기준[\s\S]*안전 기준은 71°C[\s\S]*5분씩/,
    th: /ประมาณ 35–45 นาที[\s\S]*เมนูไข่อย่างคีชต้องถึง 71°C \(160°F\)[\s\S]*เกณฑ์ด้านเนื้อสัมผัส[\s\S]*71°C เป็นเกณฑ์ความปลอดภัย[\s\S]*ครั้งละ 5 นาที/
  }, "egg-dish safety endpoint is distinct from wobble and bake-time estimates");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*freshly cooked quiche is 71°C \(160°F\)[\s\S]*reheated leftovers use 74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*新鮮 quiche[\s\S]*71°C（160°F）[\s\S]*剩菜復熱[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*焼きたてキッシュ[\s\S]*71°C（160°F）[\s\S]*残り物の再加熱[\s\S]*74°C（165°F）/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*갓 구운 키슈[\s\S]*71°C \(160°F\)[\s\S]*남은 음식 재가열[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*คีชใหม่[\s\S]*71°C \(160°F\)[\s\S]*อาหารเหลือที่อุ่นซ้ำ[\s\S]*74°C \(165°F\)/
  }, "egg-dish cooking and leftover reheating endpoints remain separate");
  official(recipe);
});
