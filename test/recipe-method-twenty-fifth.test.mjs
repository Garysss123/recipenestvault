import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["katsudon", "tom-yum-goong", "avgolemono", "apple-pie"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const foodSafety = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const seafoodSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const thermometerSafety = "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer";

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id} exists in the published recipe registry`);
  return recipe;
}

function step(recipe, title) {
  const found = recipe.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${recipe.id}: ${title} instruction exists`);
  return found;
}

function matchesEveryLocale(instruction, patterns, label) {
  for (const locale of localeOrder) assert.match(instruction.body[locale], patterns[locale], `${locale}: ${label}`);
}

function hasSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url), `${recipe.id} cites ${url}`);
}

test("twenty-fifth method audit retains the registry, exclusions, and shared five-locale route coverage", async () => {
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
  assert.equal(covered.length, 152, "the shared detail-route regression covers 152 deep-reviewed recipes");
  assert.equal(new Set(covered).size, 152, "all deep-reviewed IDs remain unique");
  assert.equal(covered.filter((id) => !ids.includes(id)).length, 148, "the other 148 reviewed IDs remain present");
  assert.ok(ids.every((id) => covered.includes(id)), "all four new recipes enter the shared route regression");

  for (const id of ids) {
    const recipe = get(id);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredient text exists`);
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), `${id}/${locale}: method text exists`);
    }
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: total time adds up`);
  }
});

test("katsudon allocates each bowl and checks pork and egg against their applicable endpoints", () => {
  const recipe = get("katsudon");
  assert.equal(recipe.servings, 2);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 30, 55]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, eggSafety);
  hasSource(recipe, thermometerSafety);
  assert.ok(recipe.sources.filter((source) => source.title.startsWith("Official food-safety guidance")).length >= 3,
    "official safety references are labeled separately from dish references");

  matchesEveryLocale(step(recipe, "Cook and hold the rice"), {
    en: /360 g cooked short-grain rice[\s\S]*180 g[\s\S]*dry rice[\s\S]*listed estimate/,
    "zh-hant": /360 公克熟短米[\s\S]*180 公克[\s\S]*生米[\s\S]*時間之外另計/,
    ja: /炊いた短粒米360g[\s\S]*180g[\s\S]*生米[\s\S]*時間を加えて/,
    ko: /지은 단립쌀 360g[\s\S]*180g[\s\S]*마른쌀[\s\S]*시간을 더/,
    th: /ข้าวเมล็ดสั้นหุงสุก 360 กรัม[\s\S]*180 กรัม[\s\S]*ข้าวสาร[\s\S]*เวลาหุง/
  }, "each bowl starts with 180 g cooked rice and dry-rice cooking is additional");
  matchesEveryLocale(step(recipe, "Fry and verify the pork"), {
    en: /sideways[\s\S]*63°C \/ 145°F[\s\S]*rest 3 minutes/,
    "zh-hant": /從側面[\s\S]*63°C／145°F[\s\S]*靜置 3 分鐘/,
    ja: /側面から[\s\S]*63°C／145°F[\s\S]*3分休ませ/,
    ko: /옆면에서[\s\S]*63°C \/ 145°F[\s\S]*3분 쉽니다/,
    th: /จากด้านข้าง[\s\S]*63°C \/ 145°F[\s\S]*พัก 3 นาที/
  }, "thin whole-cut pork reaches 63°C and rests for 3 minutes");
  matchesEveryLocale(step(recipe, "Set the egg topping"), {
    en: /75 g shares[\s\S]*71°C \/ 160°F[\s\S]*no liquid egg/,
    "zh-hant": /每份 75 公克[\s\S]*71°C／160°F[\s\S]*沒有液態蛋/,
    ja: /75gずつ[\s\S]*71°C／160°F[\s\S]*液状の卵がなくなる/,
    ko: /75g씩[\s\S]*71°C \/ 160°F[\s\S]*액체 달걀이 남지/,
    th: /ส่วนละ 75 กรัม[\s\S]*71°C \/ 160°F[\s\S]*ไม่มีไข่เหลว/
  }, "the egg topping is portioned and set with no liquid egg");
  matchesEveryLocale(step(recipe, "Assemble and serve"), {
    en: /180 g each[\s\S]*180 g raw-weight cutlet[\s\S]*75 g egg portion[\s\S]*5 g mitsuba per bowl/,
    "zh-hant": /每碗 180 公克[\s\S]*生重 180 公克[\s\S]*75 公克蛋液[\s\S]*5 公克鴨兒芹/,
    ja: /180gずつ[\s\S]*生重量180g[\s\S]*卵75g[\s\S]*みつば5gずつ/,
    ko: /180g씩[\s\S]*생고기 무게 180g[\s\S]*달걀 75g[\s\S]*미쓰바 5g씩/,
    th: /ชามละ 180 กรัม[\s\S]*น้ำหนักดิบ 180 กรัม[\s\S]*ไข่ 75 กรัม[\s\S]*มิตสึบะชามละ 5 กรัม/
  }, "each bowl has a measured rice, pork, egg, and herb share");
});

test("tom yum goong divides shrimp and stock by serving and uses visual shrimp doneness cues", () => {
  const recipe = get("tom-yum-goong");
  assert.equal(recipe.servings, 4);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [25, 32, 57]);
  hasSource(recipe, seafoodSafety);
  hasSource(recipe, foodSafety);
  assert.ok(recipe.sources.filter((source) => source.title.startsWith("Official food-safety guidance")).length >= 2,
    "official seafood and substitution safety references are clearly labeled");

  matchesEveryLocale(step(recipe, "Peel and chill the shrimp"), {
    en: /four equal 125 g piles[\s\S]*below 4°C[\s\S]*separate utensils/,
    "zh-hant": /四份、每份 125 公克[\s\S]*4°C 以下[\s\S]*另一套乾淨工具/,
    ja: /4等分し、1人分125gずつ[\s\S]*4°C未満[\s\S]*別の清潔な器具/,
    ko: /4등분해 1인분씩 125g[\s\S]*4°C 아래[\s\S]*별도의 깨끗한 도구/,
    th: /4 ส่วน ส่วนละ 125 กรัม[\s\S]*ต่ำกว่า 4°C[\s\S]*อุปกรณ์สะอาดแยก/
  }, "raw shrimp portions and safe chilling are explicit");
  matchesEveryLocale(step(recipe, "Infuse the aromatics"), {
    en: /900 ml strained stock \(225 ml per serving[\s\S]*8 minutes/,
    "zh-hant": /900 毫升過濾高湯[\s\S]*每份 225 毫升[\s\S]*8 分鐘/,
    ja: /だし900ml[\s\S]*1人分225ml[\s\S]*8分/,
    ko: /육수\s*900ml[\s\S]*1인분 225ml[\s\S]*8분/,
    th: /900 มล\.[\s\S]*ชามละ 225 มล\.[\s\S]*8 นาที/
  }, "starting stock volume is allocated per serving");
  const shrimp = step(recipe, "Poach shrimp only until opaque");
  matchesEveryLocale(shrimp, {
    en: /2–3 minutes[\s\S]*firm, pearly, and opaque[\s\S]*no grey translucent centre/,
    "zh-hant": /2–3 分鐘[\s\S]*緊實、呈珍珠白且全體不透明[\s\S]*灰色半透明中心/,
    ja: /約2〜3分[\s\S]*身が締まり、真珠色で全体が不透明[\s\S]*灰色の半透明な中心/,
    ko: /약 2–3분[\s\S]*단단하고 진주빛이며 전체가 불투명[\s\S]*회색 반투명한 중심/,
    th: /ประมาณ 2–3 นาที[\s\S]*แน่น สีขาวมุก และทึบทั่ว[\s\S]*แกนสีเทาโปร่งแสง/
  }, "shrimp use FDA-aligned visual cues rather than a forced temperature");
  for (const locale of localeOrder) {
    assert.doesNotMatch(shrimp.body[locale], /\d+\s*°\s*[CF]|\d+\s*℃|\d+\s*℉/,
      `${locale}: no unnecessary numeric shrimp temperature is introduced`);
  }
  matchesEveryLocale(step(recipe, "Serve without eating the stalks"), {
    en: /four hot bowls[\s\S]*one quarter of the 500 g shell-on shrimp and 200 g mushrooms \(about 50 g mushrooms\)/,
    "zh-hant": /四個熱碗[\s\S]*500 公克帶殼蝦與 200 公克菇的四分之一[\s\S]*50 公克/,
    ja: /4つの熱い器[\s\S]*殻付き海老500gときのこ200gの各4分の1[\s\S]*約50g/,
    ko: /뜨거운 네 그릇[\s\S]*새우 500g과 버섯 200g의 4분의 1[\s\S]*약 50g/,
    th: /4 ชามร้อน[\s\S]*กุ้งทั้งเปลือก 500 กรัมและเห็ด 200 กรัม[\s\S]*ประมาณ 50 กรัม/
  }, "each serving receives one quarter of the listed shrimp and mushrooms");
});

test("avgolemono sequences chicken cooldown with broth prep and portions rice, egg, and lemon", () => {
  const recipe = get("avgolemono");
  assert.equal(recipe.servings, 6);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 75, 105]);
  hasSource(recipe, foodSafety);
  hasSource(recipe, eggSafety);
  assert.ok(recipe.sources.filter((source) => source.title.startsWith("Official food-safety guidance")).length >= 2,
    "official poultry and egg safety references are labeled separately");

  matchesEveryLocale(step(recipe, "Build a clear chicken broth"), {
    en: /about 45 minutes[\s\S]*74°C \/ 165°F[\s\S]*5-minute increments/,
    "zh-hant": /約 45 分鐘[\s\S]*74°C／165°F[\s\S]*每次續煮 5 分鐘/,
    ja: /約45分[\s\S]*74°C／165°F[\s\S]*5分ずつ/,
    ko: /약 45분[\s\S]*74°C \/ 165°F[\s\S]*5분씩/,
    th: /ประมาณ 45 นาที[\s\S]*74°C \/ 165°F[\s\S]*ครั้งละ 5 นาที/
  }, "thigh is checked near the bone at the poultry endpoint");
  matchesEveryLocale(step(recipe, "Lift the chicken and strain"), {
    en: /cool for 10 minutes[\s\S]*While it cools[\s\S]*measure 1\.8 L/,
    "zh-hant": /放涼 10 分鐘[\s\S]*等待時[\s\S]*量取 1\.8 公升/,
    ja: /10分冷まします[\s\S]*その間に[\s\S]*1\.8L/,
    ko: /10분 식힙니다[\s\S]*식히는 동안[\s\S]*1\.8L/,
    th: /10 นาที[\s\S]*ระหว่างนั้น[\s\S]*1\.8 ลิตร/
  }, "cooling overlaps straining and measuring the broth and rice");
  matchesEveryLocale(step(recipe, "Cook the rice in broth"), {
    en: /150 g rice \(25 g dry rice per serving\)[\s\S]*15–17 minutes[\s\S]*300 ml starting broth per serving/,
    "zh-hant": /150 公克米（每份以 25 公克生米計）[\s\S]*15–17 分鐘[\s\S]*每份起始高湯約 300 毫升/,
    ja: /米150g（1人分は乾燥米25g）[\s\S]*15〜17分[\s\S]*1人分約300ml/,
    ko: /쌀 150g\(1인분 기준 마른쌀 25g\)[\s\S]*15–17분[\s\S]*1인분 약 300ml/,
    th: /ข้าว 150 กรัม \(ข้าวสาร 25 กรัมต่อคน\)[\s\S]*15–17 นาที[\s\S]*ชามละประมาณ 300 มล\./
  }, "starting broth volume and dry rice share are clear");
  matchesEveryLocale(step(recipe, "Thicken without boiling"), {
    en: /71°C \/ 160°F[\s\S]*below 80°C[\s\S]*without boiling/,
    "zh-hant": /71°C／160°F[\s\S]*低於 80°C[\s\S]*不沸騰/,
    ja: /71°C／160°F[\s\S]*80°C未満[\s\S]*沸騰や凝固を避け/,
    ko: /71°C \/ 160°F[\s\S]*80°C 아래[\s\S]*끓거나 달걀이 뭉치지 않게/,
    th: /71°C \/ 160°F[\s\S]*ต่ำกว่า 80°C[\s\S]*โดยไม่เดือด/
  }, "egg safety and a smooth non-boiling finish are both stated");
  matchesEveryLocale(step(recipe, "Warm the chicken and serve"), {
    en: /six bowls[\s\S]*83 g chicken, 25 g dry-rice equivalent, half a large egg, and 15 ml lemon juice/,
    "zh-hant": /六碗[\s\S]*83 公克雞絲[\s\S]*25 公克生米[\s\S]*半顆大蛋[\s\S]*15 毫升檸檬汁/,
    ja: /6杯[\s\S]*鶏肉約83g[\s\S]*乾燥米換算25g[\s\S]*卵半個[\s\S]*レモン汁15ml/,
    ko: /여섯 그릇[\s\S]*닭고기 약 83g[\s\S]*마른쌀 환산 25g[\s\S]*달걀 반 개[\s\S]*레몬즙 15ml/,
    th: /6 ชาม[\s\S]*ไก่ประมาณ 83 กรัม[\s\S]*ข้าวสารตั้งต้น 25 กรัม[\s\S]*ไข่ครึ่งฟอง[\s\S]*น้ำเลมอน 15 มล\./
  }, "each finished bowl has measured chicken, rice, egg, and lemon shares");
});

test("apple pie accounts for the long chill, baking cues, and set time before slicing", () => {
  const recipe = get("apple-pie");
  assert.equal(recipe.servings, 8);
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [320, 70, 390]);
  assert.ok(recipe.sources.length >= 2, "reliable recipe references support the pie method");
  assert.ok(recipe.sources.every((source) => !source.title.startsWith("Official food-safety guidance")),
    "dish-method references remain distinct from safety guidance, with no unrelated endpoint added");

  matchesEveryLocale(step(recipe, "Divide and chill the pastry"), {
    en: /full 60 minutes[\s\S]*Prepare and macerate the apples during this chill/,
    "zh-hant": /完整冷藏 60 分鐘[\s\S]*利用這段冷藏時間準備並浸漬/,
    ja: /60分しっかり冷やして[\s\S]*この冷却時間に/,
    ko: /60분 온전히 냉장[\s\S]*이 냉장 시간 동안/,
    th: /ครบ 60 นาที[\s\S]*ระหว่างแช่เย็น/
  }, "pastry chilling and filling preparation are sequenced to overlap");
  matchesEveryLocale(step(recipe, "Season the sliced apples"), {
    en: /1,400 g apples[\s\S]*150 g granulated sugar[\s\S]*70 g light brown sugar[\s\S]*35 g cornstarch[\s\S]*6 g cinnamon[\s\S]*1 g nutmeg[\s\S]*20 ml lemon juice/,
    "zh-hant": /1,400 公克蘋果片[\s\S]*150 公克砂糖[\s\S]*70 公克淺色紅糖[\s\S]*35 公克玉米澱粉[\s\S]*6 公克肉桂[\s\S]*1 公克肉豆蔻[\s\S]*20 毫升檸檬汁/,
    ja: /りんご1400g[\s\S]*グラニュー糖150g[\s\S]*ライトブラウンシュガー70g[\s\S]*コーンスターチ35g[\s\S]*シナモン6g[\s\S]*ナツメグ1g[\s\S]*レモン汁20ml/,
    ko: /사과 1400g[\s\S]*설탕 150g[\s\S]*황설탕 70g[\s\S]*옥수수전분 35g[\s\S]*시나몬 6g[\s\S]*넛메그 1g[\s\S]*레몬즙 20ml/,
    th: /แอปเปิล 1,400 กรัม[\s\S]*น้ำตาลทราย 150 กรัม[\s\S]*น้ำตาลทรายแดงอ่อน 70 กรัม[\s\S]*แป้งข้าวโพด 35 กรัม[\s\S]*อบเชย 6 กรัม[\s\S]*ลูกจันทน์ 1 กรัม[\s\S]*น้ำเลมอน 20 มล\./
  }, "the complete apple-seasoning allocation matches the ingredient list");
  matchesEveryLocale(step(recipe, "Let the filling macerate"), {
    en: /20 minutes[\s\S]*overlaps the pastry’s 60-minute chill/,
    "zh-hant": /20 分鐘[\s\S]*與派皮 60 分鐘冷藏重疊/,
    ja: /20分[\s\S]*生地の60分冷却と並行/,
    ko: /20분[\s\S]*반죽의 60분 냉장과 겹칩니다/,
    th: /20 นาที[\s\S]*แช่แป้งครบ 60 นาทีได้/
  }, "the 20-minute maceration overlaps the 60-minute pastry chill");
  matchesEveryLocale(step(recipe, "Bake hot, then reduce the heat"), {
    en: /220°C for 20 minutes[\s\S]*190°C[\s\S]*40–50 minutes[\s\S]*deep golden[\s\S]*bubble vigorously through the centre vents[\s\S]*not the clock alone/,
    "zh-hant": /220°C 烤 20 分鐘[\s\S]*190°C[\s\S]*40–50 分鐘[\s\S]*深金黃色[\s\S]*從中央氣孔持續冒泡[\s\S]*不要只看計時/,
    ja: /220°Cで20分[\s\S]*190°C[\s\S]*40〜50分[\s\S]*濃い金色[\s\S]*中央の穴から勢いよく泡立/,
    ko: /220°C에서 20분[\s\S]*190°C[\s\S]*40–50분[\s\S]*진한 금빛[\s\S]*가운데 증기 구멍으로 힘차게 보글/,
    th: /220°C 20 นาที[\s\S]*190°C[\s\S]*40–50 นาที[\s\S]*สีทองเข้ม[\s\S]*ช่องไอตรงกลาง/
  }, "two oven stages are guides and the filling and crust cues determine doneness");
  matchesEveryLocale(step(recipe, "Cool until the filling sets"), {
    en: /at least 4 hours[\s\S]*8 equal slices[\s\S]*175 g/,
    "zh-hant": /至少冷卻 4 小時[\s\S]*8 等份[\s\S]*175 公克/,
    ja: /4時間以上[\s\S]*8等分[\s\S]*約175g/,
    ko: /최소 4시간[\s\S]*8등분[\s\S]*약 175g/,
    th: /อย่างน้อย 4 ชั่วโมง[\s\S]*8 ชิ้นเท่ากัน[\s\S]*175 กรัม/
  }, "the full set time is included before cutting eight servings");
});
