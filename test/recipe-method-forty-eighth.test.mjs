import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["bossam", "sole-meuniere", "pani-puri", "banh-cuon"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const urls = {
  temps: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  chill: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  cold: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
function get(id) { const recipe = byId.get(id); assert.ok(recipe, `${id}: recipe exists`); return recipe; }
function step(recipe, title) {
  const found = recipe.instructions.find((item) => item.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} step exists`);
  return found;
}
function all(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}
function official(recipe, wanted) {
  for (const url of wanted) assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
    `${recipe.id}: official source credited separately: ${url}`);
}

test("forty-eighth batch adds four eligible slugs to shared five-locale coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 224);
  assert.equal(new Set(covered).size, 224);
  assert.deepEqual(covered.slice(-36, -32), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 111);
  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: time fields add up`);
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], `${id}/${locale}: name`);
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients`);
      assert.ok(recipe.instructions.every((row) => row.title[locale] && row.body[locale]), `${id}/${locale}: full method`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: storage card`);
    }
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: dish references remain distinct from official guidance`);
  }
});

test("bossam separates whole-cut pork safety from tender texture and portions the meal", () => {
  const recipe = get("bossam");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [145, 80, 225, 6]);
  all(step(recipe, "Prepare the pork block").body, {
    en: /do not rinse raw pork[\s\S]*wash your hands[\s\S]*hot, soapy water/,
    "zh-hant": /不要沖洗生豬肉[\s\S]*洗手[\s\S]*熱肥皂水/,
    ja: /生の豚肉は洗わず[\s\S]*手を洗い[\s\S]*熱い石けん水/,
    ko: /생돼지고기는 헹구지 말고[\s\S]*손을 씻고[\s\S]*뜨거운 비눗물/,
    th: /อย่าล้างหมูดิบ[\s\S]*ล้างมือ[\s\S]*น้ำสบู่ร้อน/
  }, "raw-pork rinse/cross-contamination advice is specific");
  all(step(recipe, "Simmer until tender and 63°C").body, {
    en: /50–60 minutes[\s\S]*estimate[\s\S]*63°C \(145°F\)[\s\S]*at least 3 minutes[\s\S]*10-minute increments/,
    "zh-hant": /50–60 分鐘[\s\S]*時間估算[\s\S]*63°C（145°F）[\s\S]*至少靜置 3 分鐘[\s\S]*每次續煮 10 分鐘/,
    ja: /50〜60分[\s\S]*時間目安[\s\S]*63°C（145°F）[\s\S]*少なくとも3分[\s\S]*10分ずつ/,
    ko: /50–60분[\s\S]*시간은 예상치[\s\S]*63°C \(145°F\)[\s\S]*최소 3분[\s\S]*10분씩/,
    th: /50–60 นาที[\s\S]*เวลาโดยประมาณ[\s\S]*63°C \(145°F\)[\s\S]*อย่างน้อย 3 นาที[\s\S]*ครั้งละ 10 นาที/
  }, "time/tenderness estimate is separate from the whole-cut endpoint and rest");
  all(step(recipe, "Arrange and build one-bite wraps").body, {
    en: /six roughly 200 g raw-weight-equivalent portions[\s\S]*150 g napa[\s\S]*67 g radish salad[\s\S]*3 g pine nuts/,
    "zh-hant": /六份[\s\S]*200 公克生肉重量[\s\S]*150 公克白菜[\s\S]*67 公克蘿蔔絲[\s\S]*3 公克松子/,
    ja: /6等分[\s\S]*約200gの生肉相当量[\s\S]*白菜約150g[\s\S]*約67g[\s\S]*約3g/,
    ko: /여섯 몫[\s\S]*200g 생고기 상당량[\s\S]*배추 약 150g[\s\S]*무생채 67g[\s\S]*잣 3g/,
    th: /หกส่วน[\s\S]*200 กรัมต่อคน[\s\S]*150 กรัม[\s\S]*67 กรัม[\s\S]*3 กรัม/
  }, "six servings have explicit side allocations");
  all(recipe.storage, {
    en: /shallow container[\s\S]*within 2 hours[\s\S]*at or below 4°C[\s\S]*74°C[\s\S]*3 days[\s\S]*2 days[\s\S]*not official storage times/,
    "zh-hant": /淺容器[\s\S]*2 小時內[\s\S]*4°C 或以下[\s\S]*74°C[\s\S]*最多 3 天[\s\S]*最多 2 天[\s\S]*並非官方保存時間/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*4°C以下[\s\S]*74°C[\s\S]*豚肉3日[\s\S]*2日はレシピ独自[\s\S]*公式の保存期間ではありません/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*4°C 이하[\s\S]*74°C[\s\S]*돼지고기 3일[\s\S]*2일은 이 레시피[\s\S]*공식 보관 기간이 아닙니다/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*74°C[\s\S]*หมูเก็บ 3 วัน[\s\S]*2 วัน[\s\S]*ไม่ใช่ระยะเก็บอย่างเป็นทางการ/
  }, "official chilling and conservative recipe limits are distinguished");
  official(recipe, [urls.temps, urls.chill, urls.cold]);
});

test("sole meuniere uses fish doneness guidance and divides whole fish and accompaniments", () => {
  const recipe = get("sole-meuniere");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [15, 25, 40, 2]);
  all(step(recipe, "Turn and check doneness").body, {
    en: /7–10 minutes is an estimate[\s\S]*sideways[\s\S]*central bone[\s\S]*63°C \(145°F\)[\s\S]*opaque and flakes easily/,
    "zh-hant": /7–10 分鐘是依厚度變動的估算[\s\S]*避開中骨[\s\S]*63°C（145°F）[\s\S]*不透明且容易剝落/,
    ja: /7〜10分は厚さによる目安[\s\S]*横から[\s\S]*中骨を避け[\s\S]*63°C（145°F）[\s\S]*不透明になり、ほぐれる/,
    ko: /총 7–10분은 두께에 따른 예상 시간[\s\S]*가운데 뼈를 피해[\s\S]*63°C \(145°F\)[\s\S]*불투명해지고 쉽게 벗겨질/,
    th: /7–10 นาทีเป็นค่าประมาณตามความหนา[\s\S]*ด้านข้าง[\s\S]*ไม่โดนก้างกลาง[\s\S]*63°C \(145°F\)[\s\S]*เนื้อทึบและแกะเป็นเกล็ดง่าย/
  }, "temperature or fish-specific opaque/flaking cue is stated");
  all(step(recipe, "Sauce and serve promptly").body, {
    en: /two plates[\s\S]*350 g raw whole-fish weight[\s\S]*150 g beans[\s\S]*half the brown butter/,
    "zh-hant": /兩盤[\s\S]*350 公克整魚生重[\s\S]*150 公克四季豆[\s\S]*一半褐化奶油/,
    ja: /2皿[\s\S]*約350g相当[\s\S]*いんげん150g[\s\S]*焦がしバター半量/,
    ko: /두 접시[\s\S]*약 350g 상당[\s\S]*그린빈 150g[\s\S]*브라운 버터 절반/,
    th: /สองจาน[\s\S]*ประมาณ 350 กรัม[\s\S]*ถั่ว 150 กรัม[\s\S]*เนยสีน้ำตาลครึ่งหนึ่ง/
  }, "two plates receive equal allocations");
  all(recipe.storage, {
    en: /shallow covered container[\s\S]*within 2 hours[\s\S]*at or below 4°C[\s\S]*within 1 day[\s\S]*not an official storage time[\s\S]*74°C \(165°F\)/,
    "zh-hant": /淺而有蓋容器[\s\S]*2 小時內[\s\S]*4°C 或以下[\s\S]*1 天期限[\s\S]*並非官方保存時間[\s\S]*74°C（165°F）/,
    ja: /浅く蓋のできる容器[\s\S]*2時間以内[\s\S]*4°C以下[\s\S]*1日以内[\s\S]*公式の保存時間ではありません[\s\S]*74°C（165°F）/,
    ko: /얕고 뚜껑 있는 용기[\s\S]*2시간 안에[\s\S]*4°C 이하[\s\S]*1일 한도[\s\S]*공식 보관 시간이 아닙니다[\s\S]*74°C \(165°F\)/,
    th: /ภาชนะตื้นมีฝา[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*1 วัน[\s\S]*ไม่ใช่เวลาเก็บทางการ[\s\S]*74°C \(165°F\)/
  }, "leftover endpoint and conservative storage choice are explicit");
  official(recipe, [urls.temps, urls.seafood, urls.chill, urls.cold]);
});

test("pani puri keeps shell quality estimates apart from chilled perishable fillings", () => {
  const recipe = get("pani-puri");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [75, 35, 110, 6]);
  all(step(recipe, "Fry until fully hollow").body, {
    en: /190°C[\s\S]*5–6 rounds[\s\S]*175–180°C[\s\S]*45–60 seconds[\s\S]*return to 190°C/,
    "zh-hant": /190°C[\s\S]*5–6 片[\s\S]*175–180°C[\s\S]*45–60 秒[\s\S]*回到 190°C/,
    ja: /190°C[\s\S]*5〜6枚[\s\S]*175〜180°C[\s\S]*45〜60秒[\s\S]*190°Cまで戻し/,
    ko: /190°C[\s\S]*5~6장[\s\S]*175~180°C[\s\S]*45~60초[\s\S]*190°C로 돌아온/,
    th: /190°C[\s\S]*5–6 แผ่น[\s\S]*175–180°C[\s\S]*45–60 วินาที[\s\S]*กลับถึง 190°C/
  }, "batch size and oil recovery are clear");
  all(step(recipe, "Fill only at the table").body, {
    en: /about 30 puris[\s\S]*five per each of six servings[\s\S]*20 g filling[\s\S]*8 g sweet chutney[\s\S]*20–25 ml cold pani[\s\S]*2 hours/,
    "zh-hant": /約做 30 顆[\s\S]*六人各五顆[\s\S]*20 公克餡[\s\S]*8 公克[\s\S]*20–25 毫升[\s\S]*2 小時/,
    ja: /約30個[\s\S]*6人に各5個[\s\S]*具約20g[\s\S]*8g[\s\S]*20〜25ml[\s\S]*2時間/,
    ko: /약 30개[\s\S]*6인분에 1인당 5개[\s\S]*약 20g[\s\S]*8g[\s\S]*20~25ml[\s\S]*2시간/,
    th: /ประมาณ 30 ชิ้น[\s\S]*ที่ละห้าชิ้น[\s\S]*ประมาณ 20 กรัม[\s\S]*8 กรัม[\s\S]*20–25 มล\.[\s\S]*2 ชั่วโมง/
  }, "yield and per-piece filling are allocated");
  all(recipe.storage, {
    en: /5 days[\s\S]*quality estimate[\s\S]*not an official shelf life[\s\S]*shallow covered containers[\s\S]*within 2 hours[\s\S]*at or below 4°C[\s\S]*within 1 day[\s\S]*not an official storage time/,
    "zh-hant": /最多 5 天[\s\S]*品質估算[\s\S]*並非官方保存期限[\s\S]*淺而有蓋容器[\s\S]*2 小時內[\s\S]*4°C 或以下[\s\S]*1 天期限[\s\S]*並非官方保存時間/,
    ja: /5日以内[\s\S]*品質の目安[\s\S]*公式の保存期間ではありません[\s\S]*浅い蓋付き容器[\s\S]*2時間以内[\s\S]*4°C以下[\s\S]*1日以内[\s\S]*公式の保存時間ではありません/,
    ko: /최대 5일[\s\S]*품질 예상치[\s\S]*공식 보관 기간이 아닙니다[\s\S]*얕고 뚜껑 있는 용기[\s\S]*2시간 안에[\s\S]*4°C 이하[\s\S]*1일 한도[\s\S]*공식 보관 시간이 아닙니다/,
    th: /ถึง 5 วัน[\s\S]*ค่าประมาณด้านคุณภาพ[\s\S]*ไม่ใช่อายุเก็บทางการ[\s\S]*ภาชนะตื้นมีฝา[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*1 วัน[\s\S]*ไม่ใช่เวลาเก็บทางการ/
  }, "official chilling guidance does not turn editorial shelf-life estimates into official limits");
  official(recipe, [urls.chill, urls.cold]);
});

test("banh cuon aligns batter, roll yield, ground pork doneness, and storage", () => {
  const recipe = get("banh-cuon");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [40, 45, 85, 4]);
  all(step(recipe, "Test one thin sheet").body, {
    en: /35–40 ml[\s\S]*45–60 seconds[\s\S]*translucent[\s\S]*no wet batter/,
    "zh-hant": /35–40 毫升[\s\S]*45–60 秒[\s\S]*半透明[\s\S]*無濕漿/,
    ja: /35〜40ml[\s\S]*45〜60秒[\s\S]*透き通り[\s\S]*液体がなく/,
    ko: /35~40ml[\s\S]*45~60초[\s\S]*반투명[\s\S]*젖은 반죽이 없게/,
    th: /35–40 มล\.[\s\S]*45–60 วินาที[\s\S]*ใส[\s\S]*ไม่มีแป้งเปียก/
  }, "measured sheet amount fits the 750 ml batter allocation");
  all(step(recipe, "Cook a dry, loose filling").body, {
    en: /4–6 minutes[\s\S]*pork reaches 71°C/,
    "zh-hant": /4–6 分鐘[\s\S]*豬肉 71°C/,
    ja: /4〜6分[\s\S]*肉が71°C/,
    ko: /4~6분[\s\S]*고기 71°C/,
    th: /4–6 นาที[\s\S]*หมู 71°C/
  }, "ground pork uses the applicable official endpoint");
  all(step(recipe, "Roll gently and repeat").body, {
    en: /about 20 rolls[\s\S]*five per serving[\s\S]*35–40 ml batter per sheet/,
    "zh-hant": /約做 20 捲[\s\S]*每人五捲[\s\S]*每張用約 35–40 毫升/,
    ja: /約20本[\s\S]*1人5本[\s\S]*約35〜40ml/,
    ko: /약 20개[\s\S]*1인당 5개[\s\S]*약 35~40ml/,
    th: /ประมาณ 20 ชิ้น[\s\S]*ที่ละ 5 ชิ้นต่อคน[\s\S]*ราว 35–40 มล\./
  }, "roll yield divides evenly across four diners");
  all(recipe.storage, {
    en: /shallow covered container[\s\S]*within 2 hours[\s\S]*at or below 4°C[\s\S]*2 days[\s\S]*not an official storage period[\s\S]*74°C \(165°F\)/,
    "zh-hant": /淺而有蓋容器[\s\S]*2 小時內[\s\S]*4°C 或以下[\s\S]*2 天內[\s\S]*並非官方保存時間[\s\S]*74°C（165°F）/,
    ja: /浅く蓋のできる容器[\s\S]*2時間以内[\s\S]*4°C以下[\s\S]*2日以内[\s\S]*公式の保存期間ではありません[\s\S]*74°C（165°F）/,
    ko: /얕고 뚜껑 있는 용기[\s\S]*2시간 안에[\s\S]*4°C 이하[\s\S]*2일 안에[\s\S]*공식 보관 기간은 아닙니다[\s\S]*74°C \(165°F\)/,
    th: /ภาชนะตื้นมีฝา[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*2 วัน[\s\S]*ไม่ใช่ระยะเก็บทางการ[\s\S]*74°C \(165°F\)/
  }, "cooling, conservative hold, and reheating endpoint are explicit");
  official(recipe, [urls.temps, urls.chill, urls.cold]);
});
