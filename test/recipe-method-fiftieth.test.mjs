import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["taiwanese-sausage", "milkfish-congee", "larb-moo", "banh-mi-thit"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const urls = {
  temps: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  chill: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  cold: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely",
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
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
function all(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}
function official(recipe, wanted) {
  for (const url of wanted) assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
    `${recipe.id}: official source credited separately: ${url}`);
}

test("fiftieth batch adds four distinct, eligible IDs to the shared five-locale ledger", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 335);
  assert.equal(new Set(covered).size, 335);
  assert.deepEqual(covered.slice(-139, -135), ids);
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 331,
    "the other 331 reviewed IDs remain covered");
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 0);
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

test("Taiwanese sausage aligns long rests, listed browning oil, ten portions, and sausage-specific safety", () => {
  const recipe = get("taiwanese-sausage");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [1875, 30, 1905, 10]);
  assert.equal(recipe.profile, "sausage", "a long cold-rest sausage does not use the quick-stir-fry tips");
  for (const locale of localeOrder) {
    assert.equal(recipe.tips.length, 2);
    assert.equal(recipe.commonMistakes.length, 2);
    assert.ok(recipe.tips.every((note) => note[locale]) && recipe.commonMistakes.every((note) => note[locale]), `${locale}: sausage-specific practical notes are localized`);
  }
  assert.equal(recipe.ingredients.find((row) => row.item.en === "neutral oil, for browning")?.amount, "5 ml");
  const finish = step(recipe, "Brown, rest, and serve");
  all(finish.body, {
    en: /8-minute simmer[\s\S]*3–5 minutes[\s\S]*listed 5 ml neutral oil[\s\S]*estimates[\s\S]*71°C \(160°F\)[\s\S]*3 minutes[\s\S]*4 m casing[\s\S]*28 links[\s\S]*ten portions of 2–3 links[\s\S]*150 g raw pork and fat per person/,
    "zh-hant": /8 分鐘[\s\S]*3–5 分鐘[\s\S]*5 毫升中性油[\s\S]*估算[\s\S]*71°C（160°F）[\s\S]*3 分鐘[\s\S]*4 公尺[\s\S]*28 條[\s\S]*10 份[\s\S]*每人約 150 公克/,
    ja: /8分[\s\S]*3〜5分[\s\S]*植物油5ml[\s\S]*目安です[\s\S]*71°C（160°F）[\s\S]*3分[\s\S]*腸で約28本[\s\S]*10人分[\s\S]*約150g/,
    ko: /8분[\s\S]*3~5분[\s\S]*중성유 5ml[\s\S]*시간은 추정치입니다[\s\S]*71°C\(160°F\)[\s\S]*3분[\s\S]*케이싱 4m[\s\S]*28개[\s\S]*10인분[\s\S]*약 150g/,
    th: /8 นาที[\s\S]*3–5 นาที[\s\S]*น้ำมันรสกลาง 5 มล\.[\s\S]*เวลาเป็นค่าประมาณ[\s\S]*71°C \(160°F\)[\s\S]*3 นาที[\s\S]*ไส้ยาว 4 ม\.[\s\S]*28 ข้อ[\s\S]*10 ที่[\s\S]*ราว 150 กรัม/
  }, "all locales state the finishing estimate, official endpoint, and serving allocation");
  all(recipe.storage, {
    en: /raw pork sausage for 1–2 days[\s\S]*within 24 hours[\s\S]*quality window[\s\S]*official general cooked-leftover guidance is 3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /生豬肉香腸冷藏指引為 1–2 天[\s\S]*24 小時內[\s\S]*品質期限[\s\S]*官方一般熟剩菜指引為 3–4 天[\s\S]*74°C（165°F）/,
    ja: /冷蔵目安は1〜2日[\s\S]*24時間以内[\s\S]*品質の目安[\s\S]*公的な一般の加熱済み残り物の目安は3〜4日[\s\S]*74°C（165°F）/,
    ko: /생 돼지고기 소시지를 냉장 1–2일로 안내합니다[\s\S]*24시간 안에[\s\S]*품질 기준[\s\S]*공식 일반 조리 식품 잔여물 지침은 3–4일[\s\S]*74°C\(165°F\)/,
    th: /ไส้กรอกหมูดิบแช่เย็น 1–2 วัน[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ด้านคุณภาพ[\s\S]*แนวทางทางการสำหรับอาหารปรุงสุกทั่วไปคือ 3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "raw and cooked sausage storage windows are separated in every locale");
  official(recipe, [urls.temps, urls.chill, urls.cold]);
});

test("milkfish congee handles leftover rice, fish doneness, four bowls, and one reheating", () => {
  const recipe = get("milkfish-congee");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [25, 45, 70, 4]);
  all(step(recipe, "Heat rice without breaking it down").body, {
    en: /500 g cooked rice[\s\S]*ideally within 1 hour[\s\S]*no more than 24 hours[\s\S]*one reheating/,
    "zh-hant": /使用 500 公克[\s\S]*最好在 1 小時內[\s\S]*不超過 24 小時[\s\S]*唯一一次回熱/,
    ja: /できれば1時間以内[\s\S]*24時間以内[\s\S]*ご飯500g[\s\S]*一度きりの再加熱/,
    ko: /밥 500g[\s\S]*가능하면 1시간 안에[\s\S]*24시간 이내[\s\S]*한 번뿐인 재가열/,
    th: /ข้าวสุก 500 กรัม[\s\S]*ภายใน 1 ชั่วโมงหากทำได้[\s\S]*เก็บไม่เกิน 24 ชั่วโมง[\s\S]*การอุ่นข้าวครั้งเดียว/
  }, "the rice cooling window and reheating rule are synchronized");
  all(step(recipe, "Poach the milkfish").body, {
    en: /85–90°C[\s\S]*estimates, not the safety test[\s\S]*63°C \(145°F\)[\s\S]*1-minute increments/,
    "zh-hant": /85–90°C[\s\S]*只是估算，不是安全熟度判斷[\s\S]*63°C（145°F）[\s\S]*每次續煮 1 分鐘/,
    ja: /85〜90°C[\s\S]*目安で、安全確認そのものではありません[\s\S]*63°C（145°F）[\s\S]*1分ずつ/,
    ko: /85~90°C[\s\S]*추정 시간이지 안전 확인 기준이 아닙니다[\s\S]*63°C\(145°F\)[\s\S]*1분씩/,
    th: /85–90°C[\s\S]*เป็นเพียงค่าประมาณ ไม่ใช่เกณฑ์ความปลอดภัย[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 1 นาที/
  }, "estimated poaching time stays distinct from the official fish endpoint");
  all(step(recipe, "Finish without stirring").body, {
    en: /four bowls[\s\S]*125 g each[\s\S]*175 g each[\s\S]*325 ml each[\s\S]*45 g portions[\s\S]*7\.5 g celery[\s\S]*6 g fried garlic[\s\S]*0\.5 g white pepper/,
    "zh-hant": /四碗[\s\S]*每碗約 125 公克[\s\S]*每碗約 175 公克[\s\S]*每碗約 325 毫升[\s\S]*四份各 45 公克[\s\S]*7\.5 公克芹菜[\s\S]*6 公克蒜酥[\s\S]*0\.5 公克白胡椒/,
    ja: /4杯[\s\S]*1杯約125g[\s\S]*約175gずつ[\s\S]*約325mlずつ[\s\S]*各45g[\s\S]*セロリ約7\.5g[\s\S]*揚げにんにく約6g[\s\S]*白こしょう0\.5g/,
    ko: /네 그릇[\s\S]*그릇당 약 125g[\s\S]*그릇당 약 175g[\s\S]*그릇당 약 325ml[\s\S]*각 45g씩[\s\S]*셀러리 약 7\.5g[\s\S]*튀긴 마늘 6g[\s\S]*흰 후추 0\.5g/,
    th: /4 ชาม[\s\S]*ชามละราว 125 กรัม[\s\S]*ชามละราว 175 กรัม[\s\S]*ชามละราว 325 มล\.[\s\S]*ส่วนละ 45 กรัม[\s\S]*ขึ้นฉ่ายราว 7\.5 กรัม[\s\S]*กระเทียมเจียว 6 กรัม[\s\S]*พริกไทยขาว 0\.5 กรัม/
  }, "fish, broth, rice, and garnish amounts divide evenly across four portions");
  all(recipe.storage, {
    en: /already been reheated in this recipe[\s\S]*do not reheat the congee again[\s\S]*within 1 hour at 4°C or below[\s\S]*within 24 hours[\s\S]*eat chilled or discard/,
    "zh-hant": /熟飯已在此食譜中回熱一次[\s\S]*不要再次回熱整鍋粥[\s\S]*1 小時內[\s\S]*4°C 以下[\s\S]*24 小時內[\s\S]*冷食或丟棄/,
    ja: /すでに一度再加熱している[\s\S]*粥を再加熱しません[\s\S]*1時間以内[\s\S]*4°C以下[\s\S]*24時間以内[\s\S]*冷たいまま食べるか、廃棄/,
    ko: /이미 한 번 데웠으므로[\s\S]*죽을 다시 데우지 않습니다[\s\S]*1시간 안에[\s\S]*4°C 이하[\s\S]*24시간 안에[\s\S]*차갑게 먹거나 버리세요/,
    th: /ผ่านการอุ่นแล้วหนึ่งครั้ง[\s\S]*ไม่อุ่นโจ๊กซ้ำอีก[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*กินแบบเย็นหรือทิ้ง/
  }, "mixed-soup storage follows the faster cooked-rice rule");
  official(recipe, [urls.temps, urls.seafood, urls.rice, urls.chill]);
});

test("larb uses all measured toasted rice, divides the dressing, and stores mixed pork correctly", () => {
  const recipe = get("larb-moo");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [25, 10, 35, 4]);
  assert.equal(recipe.ingredients.find((row) => row.item.en === "uncooked Thai glutinous rice")?.amount, "18 g");
  all(step(recipe, "Cook pork gently with its juices").body, {
    en: /estimated 5–7 minutes[\s\S]*71°C \/ 160°F[\s\S]*starting estimate, not the doneness test[\s\S]*1-minute increments/,
    "zh-hant": /預估翻炒 5–7 分鐘[\s\S]*71°C／160°F[\s\S]*時間只是起始估算，熟度以溫度為準[\s\S]*續炒 1 分鐘/,
    ja: /5〜7分を目安[\s\S]*71°C \/ 160°F[\s\S]*時間は開始時の目安[\s\S]*1分ずつ/,
    ko: /약 5–7분[\s\S]*71°C \/ 160°F[\s\S]*시간은 시작 추정치[\s\S]*1분씩/,
    th: /ประมาณ 5–7 นาที[\s\S]*71°C \/ 160°F[\s\S]*เวลานี้เป็นเพียงค่าประมาณเริ่มต้น[\s\S]*ครั้งละ 1 นาที/
  }, "ground-pork time is an estimate and the official endpoint controls doneness");
  all(step(recipe, "Season away from the burner").body, {
    en: /45 ml lime juice, 30 ml fish sauce, all 6 g chile flakes, and all 18 g toasted rice powder[\s\S]*remaining 5 ml lime juice and 5 ml fish sauce/,
    "zh-hant": /45 毫升萊姆汁、30 毫升魚露、全部 6 公克辣椒碎及全部 18 公克烘米粉[\s\S]*剩餘 5 毫升萊姆汁和 5 毫升魚露/,
    ja: /ライム果汁45ml、ナンプラー30ml、唐辛子粉6gすべて、米粉18gすべて[\s\S]*ライム果汁5mlとナンプラー5ml/,
    ko: /라임즙 45ml, 피시소스 30ml, 고춧가루 6g 전부와 볶은 쌀가루 18g 전부[\s\S]*라임즙 5ml와 피시소스 5ml/,
    th: /น้ำมะนาว 45 มล\.[\s\S]*น้ำปลา 30 มล\.[\s\S]*พริกป่น 6 กรัมทั้งหมด[\s\S]*ข้าวคั่ว 18 กรัมทั้งหมด[\s\S]*น้ำมะนาว 5 มล\.[\s\S]*น้ำปลา 5 มล\./
  }, "measured ingredients and reserved seasoning amounts add back to the listed totals");
  all(step(recipe, "Serve warm with crisp vegetables").body, {
    en: /200 g total vegetables as 50 g per diner[\s\S]*four equal bowls \(about 125 g raw-pork equivalent each\)/,
    "zh-hant": /200 公克配菜分成四份、每人 50 公克[\s\S]*四碗[\s\S]*每碗約相當於 125 公克生豬肉/,
    ja: /計200gを4人分（1人50g）[\s\S]*4つの器[\s\S]*各約125gの生豚肉相当/,
    ko: /채소 총 200g을 네 사람에게 50g씩[\s\S]*네 그릇[\s\S]*생돼지고기 환산 약 125g/,
    th: /ผักรวม 200 กรัม แบ่ง 4 ที่ ที่ละ 50 กรัม[\s\S]*4 ชาม[\s\S]*หมูดิบประมาณ 125 กรัมต่อที่/
  }, "pork and vegetable amounts are allocated per diner");
  all(recipe.storage, {
    en: /herbs already folded in together in a shallow covered container within 2 hours, at 4°C or below[\s\S]*keep cabbage, cucumber, and any reserved unmixed herbs separate[\s\S]*1-day limit is a conservative quality choice[\s\S]*official guidance allows cooked leftovers 3–4 days[\s\S]*74°C/,
    "zh-hant": /已拌入的香草須一起[\s\S]*2 小時內[\s\S]*4°C 以下[\s\S]*高麗菜、小黃瓜及尚未拌入的保留香草分開[\s\S]*1 天內食用是保守的品質選擇[\s\S]*官方指引[\s\S]*3–4 天[\s\S]*74°C/,
    ja: /すでに混ぜた香草は一緒[\s\S]*2時間以内[\s\S]*4°C以下[\s\S]*キャベツ、きゅうり、混ぜていない取り置きの香草は別[\s\S]*1日以内は品質を重視した保守的な選択[\s\S]*公式指針[\s\S]*3〜4日[\s\S]*74°C/,
    ko: /이미 섞은 허브는 함께[\s\S]*2시간 안에[\s\S]*4°C 이하[\s\S]*양배추, 오이와 섞지 않고 남겨 둔 허브는 따로[\s\S]*1일 이내는 품질을 위한 보수적 선택[\s\S]*공식 지침[\s\S]*3–4일[\s\S]*74°C/,
    th: /สมุนไพรที่คลุกแล้วรวมกัน[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*4°C หรือต่ำกว่า[\s\S]*กะหล่ำ แตงกวา และสมุนไพรที่ยังไม่คลุกแยกกัน[\s\S]*1 วันเป็นการเลือกแบบเผื่อเพื่อคุณภาพ[\s\S]*คำแนะนำทางการ[\s\S]*3–4 วัน[\s\S]*74°C/
  }, "quality preference is distinct from the official leftover window");
  official(recipe, [urls.temps, urls.chill, urls.cold]);
});

test("bánh mì allocates sandwich fillings and separates pickle quality advice from cold-cut guidance", () => {
  const recipe = get("banh-mi-thit");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [70, 5, 75, 4]);
  all(step(recipe, "Finish with pickles and herbs").body, {
    en: /250–300 g drained pickles \(about 63–75 g each\)[\s\S]*25 g cilantro \(about 6 g each\)[\s\S]*15 g chile \(about 4 g each\)[\s\S]*15 ml soy\/Maggi \(3\.75 ml each\)[\s\S]*50 g cucumber/,
    "zh-hant": /四條各分配瀝乾醃菜約 63–75 公克（總量 250–300 公克）[\s\S]*香菜 25 公克（每條約 6 公克）[\s\S]*辣椒 15 公克（每條約 4 公克）[\s\S]*醬油／Maggi 15 毫升（每條 3\.75 毫升）[\s\S]*50 公克小黃瓜/,
    ja: /漬物250〜300g[\s\S]*各約63〜75g[\s\S]*香菜25g（各約6g）[\s\S]*唐辛子15g（各約4g）[\s\S]*各3\.75ml[\s\S]*各50g/,
    ko: /절임 250~300g[\s\S]*각 약 63~75g[\s\S]*고수 25g\(각 약 6g\)[\s\S]*고추 15g\(각 약 4g\)[\s\S]*각 3\.75ml[\s\S]*각 50g/,
    th: /ผักดองสะเด็ดน้ำ 250–300 กรัม[\s\S]*63–75 กรัมต่อชิ้น[\s\S]*ผักชี 25 กรัม[\s\S]*พริก 15 กรัม[\s\S]*3\.75 มล\.ต่อชิ้น[\s\S]*แตงกวาชิ้นละ 50 กรัม/
  }, "all optional fresh fillings are divided over four rolls");
  all(recipe.storage, {
    en: /opened deli-sliced ham keeps 3–5 days refrigerated[\s\S]*5-day limit[\s\S]*conservative quality estimate, not a canning or official safety limit[\s\S]*within 2 hours \(within 1 hour above 32°C \/ 90°F\)[\s\S]*4°C or below/,
    "zh-hant": /開封的熟食切片火腿冷藏 3–5 天[\s\S]*5 天[\s\S]*保守品質估算[\s\S]*2 小時內[\s\S]*32°C[\s\S]*1 小時內[\s\S]*4°C 以下/,
    ja: /開封したスライスハムは冷蔵3〜5日[\s\S]*5日以内[\s\S]*保守的な品質目安[\s\S]*2時間以内[\s\S]*32°C[\s\S]*1時間以内[\s\S]*4°C以下/,
    ko: /개봉한 슬라이스 햄은 냉장 3~5일[\s\S]*5일[\s\S]*보수적인 품질 추정치[\s\S]*2시간 안에[\s\S]*32°C[\s\S]*1시간 안에[\s\S]*4°C 이하/,
    th: /แฮมหั่นสำเร็จที่เปิดแล้วแช่เย็นได้ 3–5 วัน[\s\S]*5 วัน[\s\S]*การประเมินคุณภาพแบบเผื่อ[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่อ[\s\S]*32°C[\s\S]*4°C หรือต่ำกว่า/
  }, "official cold-cut guidance and conservative fresh-pickle advice remain distinct");
  assert.doesNotMatch(step(recipe, "Slice and dry the fillings").body.ko, /소시지와\s*찐 돼지고기 소시지와/,
    "Korean instructions do not repeat the sausage phrase");
  official(recipe, [urls.chill, urls.cold]);
});
