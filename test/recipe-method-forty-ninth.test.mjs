import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["peking-duck", "som-tam", "bun-thit-nuong", "goi-cuon"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const urls = {
  temps: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  chill: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  cold: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  produce: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-to-know-about-egg-safety"
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

test("forty-ninth batch appends four unexcluded recipes to the shared five-locale review ledger", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 208);
  assert.equal(new Set(covered).size, 208);
  assert.deepEqual(covered.slice(-16, -12), ids);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  assert.equal(recipes.length - excludedIds.length - covered.length, 127);
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

test("Peking duck separates roast-time estimates from poultry doneness and gives four exact wraps", () => {
  const recipe = get("peking-duck");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [1600, 120, 1720, 4]);
  const roast = step(recipe, "Finish the roast at 180°C");
  all(roast.body, {
    en: /65–70-minute roast[\s\S]*starting estimate[\s\S]*thickest breast[\s\S]*innermost thigh[\s\S]*both must reach 74°C \/ 165°F[\s\S]*5 minutes more/,
    "zh-hant": /65–70 分鐘[\s\S]*起始估算[\s\S]*最厚胸肉[\s\S]*最內側腿肉[\s\S]*兩處都必須達 74°C \/ 165°F[\s\S]*續烤 5 分鐘/,
    ja: /65～70分[\s\S]*目安[\s\S]*胸の最厚部[\s\S]*ももの内側[\s\S]*両方とも74°C \/ 165°F[\s\S]*5分追加/,
    ko: /65–70분[\s\S]*예상 시간[\s\S]*가장 두꺼운 가슴살[\s\S]*허벅지 안쪽[\s\S]*두 곳 모두 74°C \/ 165°F[\s\S]*5분 더/,
    th: /65–70 นาที[\s\S]*เวลาเริ่มต้นโดยประมาณ[\s\S]*ส่วนอกที่หนาที่สุด[\s\S]*ด้านในของสะโพก[\s\S]*ทั้งสองจุดต้องถึง 74°C \/ 165°F[\s\S]*5 นาที/
  }, "the estimated roast and official endpoint are distinct at both poultry sites");
  all(step(recipe, "Rest, carve, and wrap").body, {
    en: /four servings[\s\S]*four of the 16 pancakes[\s\S]*450 g raw whole-duck weight equivalent[\s\S]*20 g scallions[\s\S]*37\.5 g cucumber[\s\S]*30 g sweet bean sauce/,
    "zh-hant": /四份[\s\S]*16 張薄餅[\s\S]*450 公克整鴨生重[\s\S]*20 公克青蔥[\s\S]*37\.5 公克小黃瓜[\s\S]*30 公克甜麵醬/,
    ja: /4人分[\s\S]*16枚のパンケーキ[\s\S]*鴨の生重量換算約450g[\s\S]*ねぎ20g[\s\S]*きゅうり37\.5g[\s\S]*甜麺醤30g/,
    ko: /네 사람 몫[\s\S]*전병 16장[\s\S]*오리 생중량 환산 약 450g[\s\S]*대파 20g[\s\S]*오이 37\.5g[\s\S]*춘장 30g/,
    th: /4 ที่[\s\S]*แผ่นแป้ง 4 จาก 16 แผ่น[\s\S]*น้ำหนักเป็ดดิบทั้งตัวประมาณ 450 กรัม[\s\S]*ต้นหอม 20 กรัม[\s\S]*แตงกวา 37\.5 กรัม[\s\S]*ซอสถั่วหวาน 30 กรัม/
  }, "pancakes and garnish amounts are allocated per diner");
  official(recipe, [urls.temps, urls.chill, urls.cold]);
});

test("Som Tam washes produce, uses the listed dressing amounts, and avoids an irrelevant temperature endpoint", () => {
  const recipe = get("som-tam");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [25, 0, 25, 4]);
  all(step(recipe, "Shred, rinse, and dry papaya").body, {
    en: /Wash the whole papaya and tomatoes under running potable water before cutting[\s\S]*clean board and knife/,
    "zh-hant": /流動飲用水清洗整顆青木瓜與番茄[\s\S]*乾淨砧板與刀/,
    ja: /流水で洗い[\s\S]*清潔なまな板と包丁/,
    ko: /흐르는 식수로 씻고 깨끗한 도마와 칼/,
    th: /ล้างมะละกอทั้งลูกและมะเขือเทศด้วยน้ำดื่มไหลผ่าน[\s\S]*เขียงและมีดสะอาด/
  }, "fresh produce and equipment are handled before cutting");
  all(step(recipe, "Pound the dressing base").body, {
    en: /all 35 g palm sugar[\s\S]*40 ml[\s\S]*25 ml[\s\S]*reserve the remaining 5 ml of each/,
    "zh-hant": /全部 35 公克棕櫚糖[\s\S]*40 毫升[\s\S]*25 毫升[\s\S]*各保留 5 毫升/,
    ja: /パームシュガー35gをすべて[\s\S]*40ml[\s\S]*25ml[\s\S]*残り各5ml/,
    ko: /팜슈거 35g을 모두[\s\S]*40ml[\s\S]*25ml[\s\S]*각각 남은 5ml/,
    th: /น้ำตาลมะพร้าว 35 กรัมทั้งหมด[\s\S]*40 มล\.[\s\S]*25 มล\.[\s\S]*อย่างละ 5 มล\./
  }, "listed sugar is fully used and the final taste adjustment stays within listed liquids");
  all(step(recipe, "Taste, portion, and serve").body, {
    en: /only from the reserved 5 ml[\s\S]*four side plates[\s\S]*125 g papaya[\s\S]*20 g beans[\s\S]*40 g tomatoes/,
    "zh-hant": /只用預留的 5 毫升[\s\S]*四盤[\s\S]*125 公克木瓜[\s\S]*20 公克長豆[\s\S]*40 公克番茄/,
    ja: /取っておいた[\s\S]*5ml[\s\S]*4皿[\s\S]*約125g[\s\S]*20g[\s\S]*40g/,
    ko: /남겨 둔[\s\S]*5ml[\s\S]*네 접시[\s\S]*약 125g[\s\S]*20g[\s\S]*40g/,
    th: /สำรองไว้[\s\S]*5 มล\.[\s\S]*4 จาน[\s\S]*125 กรัม[\s\S]*20 กรัม[\s\S]*40 กรัม/
  }, "portion counts and measured dressing remain consistent");
  assert.ok(recipe.instructions.every((entry) => !Object.values(entry.body).some((body) => /°C|°F/.test(body))),
    "fresh salad method has no unrelated cooking-temperature endpoint");
  official(recipe, [urls.produce, urls.chill]);
});

test("Bún thịt nướng checks intact pork slices, portions four bowls, and separates optional roll reheating", () => {
  const recipe = get("bun-thit-nuong");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [275, 40, 315, 4]);
  all(step(recipe, "Grill the pork in batches").body, {
    en: /intact pork-shoulder slices[\s\S]*2–3 minutes per side as an estimate[\s\S]*63°C \(145°F\)[\s\S]*3-minute rest/,
    "zh-hant": /完整肉片[\s\S]*每面 2–3 分鐘只是估算[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘/,
    ja: /ひき肉ではない一枚肉[\s\S]*片面2～3分は目安[\s\S]*63°C（145°F）[\s\S]*3分休ませ/,
    ko: /다진 고기가 아닌 통목살[\s\S]*2–3분은 예상 시간[\s\S]*63°C \(145°F\)[\s\S]*3분 쉰다/,
    th: /เนื้อทั้งชิ้นไม่ใช่หมูบด[\s\S]*เป็นเวลาโดยประมาณ[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที/
  }, "whole-cut pork receives its matching official endpoint and rest");
  all(step(recipe, "Crisp the optional cooked rolls").body, {
    en: /If adding chả giò[\s\S]*fully cooked rolls[\s\S]*centre reaches 74°C/,
    "zh-hant": /若加炸春捲[\s\S]*全熟[\s\S]*中心 74°C/,
    ja: /春巻きを添えるなら[\s\S]*加熱済み[\s\S]*中心74°C/,
    ko: /짜조를 곁들이면[\s\S]*완전히 익힌[\s\S]*중심 74°C/,
    th: /หากใส่เปาะเปี๊ยะ[\s\S]*ของสุก[\s\S]*กลาง 74°C/
  }, "the separate endpoint applies only to optional reheated rolls");
  all(step(recipe, "Finish and portion four bowls").body, {
    en: /four bowls[\s\S]*175 g raw-pork-weight equivalent[\s\S]*80 g dry-noodle equivalent[\s\S]*60 g drained pickles[\s\S]*about 60 ml each/,
    "zh-hant": /四碗[\s\S]*175 公克生豬肉重量[\s\S]*80 公克乾米粉[\s\S]*醃菜 60 公克[\s\S]*約 60 毫升/,
    ja: /4杯[\s\S]*生肉換算175g[\s\S]*乾麺換算80g[\s\S]*漬物60g[\s\S]*約60ml/,
    ko: /네 그릇[\s\S]*생고기 환산 175g[\s\S]*마른 면 환산 80g[\s\S]*절임 60g[\s\S]*약 60ml/,
    th: /4 ชาม[\s\S]*หมูเทียบน้ำหนักดิบ 175 กรัม[\s\S]*เส้นแห้งเทียบเท่า 80 กรัม[\s\S]*ผักดองสะเด็ดน้ำ 60 กรัม[\s\S]*60 มล\./
  }, "dry noodle, protein and dressing allocations match the four-serving yield");
  all(recipe.storage, {
    en: /within 2 hours[\s\S]*within 1 hour above 32°C[\s\S]*4°C or below[\s\S]*74°C \(165°F\)[\s\S]*not an official storage period/,
    "zh-hant": /2 小時內[\s\S]*高於 32°C 時 1 小時內[\s\S]*4°C 以下[\s\S]*74°C（165°F）[\s\S]*不是官方保存期限/,
    ja: /2時間以内[\s\S]*32°Cを超える場合は1時間以内[\s\S]*4°C以下[\s\S]*74°C（165°F）[\s\S]*公式の保存期間ではありません/,
    ko: /2시간 안에[\s\S]*32°C를 넘으면 1시간 안에[\s\S]*4°C 이하[\s\S]*74°C \(165°F\)[\s\S]*공식 보관 기간이 아니다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่อ[\s\S]*4°C หรือต่ำกว่า[\s\S]*74°C \(165°F\)[\s\S]*ไม่ใช่ระยะเก็บทางการ/
  }, "official time and temperature guidance is distinct from the two-day quality choice");
  official(recipe, [urls.temps, urls.chill, urls.cold]);
});

test("gỏi cuốn checks intact pork and shrimp separately, portions twelve fresh rolls, and stores them cold", () => {
  const recipe = get("goi-cuon");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [40, 60, 100, 4]);
  all(step(recipe, "Poach the pork until tender").body, {
    en: /Do not rinse the intact pork belly[\s\S]*35–45 minutes as a tenderness estimate[\s\S]*63°C \(145°F\)[\s\S]*5-minute increments[\s\S]*10 minutes[\s\S]*3-minute whole-cut rest/,
    "zh-hant": /完整五花肉不要沖洗[\s\S]*35–45 分鐘[\s\S]*軟嫩度估算[\s\S]*63°C（145°F）[\s\S]*續煮 5 分鐘[\s\S]*靜置 10 分鐘[\s\S]*3 分鐘/,
    ja: /一枚肉の豚バラは洗わず[\s\S]*35～45分[\s\S]*食感の目安[\s\S]*63°C（145°F）[\s\S]*5分ずつ[\s\S]*10分休ませ[\s\S]*3分以上/,
    ko: /통삼겹을 씻지 말고[\s\S]*35–45분[\s\S]*예상 시간[\s\S]*63°C \(145°F\)[\s\S]*5분씩[\s\S]*10분 쉬는데[\s\S]*최소 3분/,
    th: /อย่าล้างหมูสามชั้นทั้งชิ้น[\s\S]*35–45 นาที[\s\S]*เวลาโดยประมาณ[\s\S]*63°C \(145°F\)[\s\S]*ครั้งละ 5 นาที[\s\S]*10 นาที[\s\S]*อย่างน้อย 3 นาที/
  }, "whole-cut pork uses the matched safe endpoint and minimum rest while tenderness time remains an estimate");
  all(step(recipe, "Poach and halve the shrimp").body, {
    en: /shrimp[\s\S]*2–3 minutes[\s\S]*opaque, curled and 63°C/,
    "zh-hant": /蝦[\s\S]*2–3 分鐘[\s\S]*不透明捲曲[\s\S]*63°C/,
    ja: /えび[\s\S]*2–3分[\s\S]*不透明[\s\S]*63°C/,
    ko: /새우[\s\S]*2–3분[\s\S]*불투명[\s\S]*63°C/,
    th: /กุ้ง[\s\S]*2–3 นาที[\s\S]*ขุ่นงอ[\s\S]*63°C/
  }, "shrimp cooking has its own seafood endpoint and visual cues");
  all(step(recipe, "Set out a dry rolling station").body, {
    en: /under running potable water before cutting[\s\S]*clean board and knife[\s\S]*Keep cooked proteins refrigerated/,
    "zh-hant": /流動飲用水清洗[\s\S]*乾淨砧板和刀[\s\S]*持續冷藏/,
    ja: /飲用できる流水で洗い[\s\S]*清潔なまな板と包丁[\s\S]*包むまで冷蔵/,
    ko: /흐르는 식수로 씻어[\s\S]*깨끗한 도마와 칼[\s\S]*싸기 전까지 냉장/,
    th: /น้ำดื่มไหลผ่านก่อนหั่น[\s\S]*เขียงและมีดสะอาด[\s\S]*แช่หมูและกุ้งที่ปรุงสุกให้เย็น/
  }, "fresh produce and ready-to-eat assembly use clean handling");
  all(step(recipe, "Repeat and serve fresh").body, {
    en: /12 rolls, three per person[\s\S]*75 g raw-pork equivalent[\s\S]*90 g raw-shrimp equivalent[\s\S]*22\.5 g dry-vermicelli equivalent[\s\S]*about 75 g peanut sauce/,
    "zh-hant": /12 條[\s\S]*四人各 3 條[\s\S]*75 公克[\s\S]*90 公克[\s\S]*22\.5 公克[\s\S]*每份約 75 公克/,
    ja: /12本[\s\S]*1人3本[\s\S]*75g[\s\S]*90g[\s\S]*22\.5g[\s\S]*1人約75g/,
    ko: /총 12개[\s\S]*1인당 3개[\s\S]*75g[\s\S]*90g[\s\S]*22\.5g[\s\S]*약 75g/,
    th: /12 ชิ้น[\s\S]*คนละ 3 ชิ้น[\s\S]*75 กรัม[\s\S]*90 กรัม[\s\S]*22\.5 กรัม[\s\S]*ประมาณ 75 กรัม/
  }, "yield, per-person protein and noodle amounts, and sauce are allocated");
  all(recipe.storage, {
    en: /shallow covered container[\s\S]*4°C \/ 40°F or below[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \/ 90°F[\s\S]*within 24 hours[\s\S]*not an official storage period/,
    "zh-hant": /淺而有蓋容器[\s\S]*2 小時內[\s\S]*高於 32°C \/ 90°F 時 1 小時內[\s\S]*4°C \/ 40°F 以下[\s\S]*24 小時內[\s\S]*不是官方保存期限/,
    ja: /浅く蓋のできる容器[\s\S]*2時間以内[\s\S]*32°C \/ 90°Fを超える場合は1時間以内[\s\S]*4°C \/ 40°F以下[\s\S]*24時間以内[\s\S]*公式の保存期間ではありません/,
    ko: /얕고 뚜껑 있는 용기[\s\S]*2시간 안에[\s\S]*32°C \/ 90°F를 넘으면 1시간 안에[\s\S]*4°C \/ 40°F 이하[\s\S]*24시간 이내[\s\S]*공식 보관 기간이 아니다/,
    th: /ภาชนะตื้นมีฝา[\s\S]*4°C \/ 40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C \/ 90°F[\s\S]*ภายใน 24 ชั่วโมง[\s\S]*ไม่ใช่ระยะเก็บทางการ/
  }, "official chill timing is separate from the 24-hour texture recommendation");
  official(recipe, [urls.temps, urls.produce, urls.chill]);
});
