import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const ids = ["idli-sambar", "shoyu-ramen", "koenigsberger-klopse", "traditional-trifle"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];
const src = {
  rice: "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker",
  chill: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  temps: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  cold: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
function get(id) { const recipe = byId.get(id); assert.ok(recipe, id + ": recipe exists"); return recipe; }
function step(recipe, title) {
  const found = recipe.instructions.find((item) => item.title.en === title);
  assert.ok(found, recipe.id + ": " + title + " step exists");
  return found;
}
function all(text, patterns, label) {
  for (const locale of localeOrder) assert.match(text[locale], patterns[locale], locale + ": " + label);
}
function official(recipe, urls) {
  for (const url of urls) assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
    recipe.id + ": separately credited official source " + url);
}

test("forty-seventh batch appends four eligible recipes to shared five-locale coverage", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(excludedIds.length, 18);
  assert.equal(new Set(excludedIds).size, 18);
  assert.equal(covered.length, 188);
  assert.equal(new Set(covered).size, 188);
  assert.deepEqual(covered.slice(-4), ids);
  assert.equal(recipes.length - excludedIds.length - covered.length, 147);
  assert.ok(ids.every((id) => !excludedIds.includes(id)));
  for (const id of ids) {
    const recipe = get(id);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, id + ": total time adds up");
    for (const locale of localeOrder) {
      assert.ok(recipe.name[locale], id + "/" + locale + ": name");
      assert.ok(recipe.ingredients.every((item) => item.amount && item.item[locale]), id + "/" + locale + ": ingredients");
      assert.ok(recipe.instructions.every((item) => item.title[locale] && item.body[locale]), id + "/" + locale + ": method");
      assert.ok(recipe.storage[locale], id + "/" + locale + ": storage card");
    }
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      id + ": recipe references remain separate from official guidance");
  }
});

test("idli sambar separates its soak and grinding water and accounts for its batch yield", () => {
  const recipe = get("idli-sambar");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [990, 70, 1060, 6]);
  assert.equal(recipe.ingredients.find((item) => item.item.en === "ground turmeric for the sambar dal")?.amount, "1 g");
  all(step(recipe, "Soak rice and urad separately").body, {
    en: /5–6-hour soak[\s\S]*at the same time[\s\S]*soak it separately for 4 hours/,
    "zh-hant": /浸泡 5–6 小時[\s\S]*同時[\s\S]*另碗浸泡 4 小時/,
    ja: /5〜6時間浸します[\s\S]*同時に[\s\S]*別々に4時間浸します/,
    ko: /5~6시간 불립니다[\s\S]*동시에[\s\S]*따로 4시간 불리고/,
    th: /แช่ 5–6 ชั่วโมง[\s\S]*พร้อมกันนั้น[\s\S]*แช่แยก 4 ชั่วโมง/
  }, "the longer soak runs concurrently, not serially");
  all(step(recipe, "Grind and combine the batter").body, {
    en: /220–280 ml[\s\S]*430–500 ml[\s\S]*full 650–780 ml batter-water amount/,
    "zh-hant": /220–280 毫升[\s\S]*430–500 毫升[\s\S]*麵糊所列 650–780 毫升/,
    ja: /220〜280ml[\s\S]*430〜500ml[\s\S]*水の合計は生地用の650〜780ml/,
    ko: /220~280ml[\s\S]*430~500ml[\s\S]*650~780ml/,
    th: /220–280 มล\.[\s\S]*430–500 มล\.[\s\S]*650–780 มล\./
  }, "all batter water has an assigned use");
  all(step(recipe, "Combine and simmer the sambar").body, {
    en: /550 ml cooking liquid[\s\S]*300 ml water[\s\S]*850 ml sambar water in full[\s\S]*do not add unmeasured water/,
    "zh-hant": /550 毫升煮豆液[\s\S]*300 毫升用水[\s\S]*850 毫升水已全數分配[\s\S]*不再加未計量的水/,
    ja: /煮汁550ml[\s\S]*水300ml[\s\S]*水850mlをすべて使い[\s\S]*水を足しません/,
    ko: /조리액 550ml[\s\S]*물 300ml[\s\S]*물 850ml를 모두 배분[\s\S]*계량하지 않은 물은 더 넣지 않습니다/,
    th: /น้ำต้ม 550 มล\.[\s\S]*น้ำ 300 มล\.[\s\S]*น้ำซัมบาร์ที่ระบุครบ 850 มล\.[\s\S]*ไม่เติมน้ำที่ไม่ได้ตวง/
  }, "sambar liquid is assigned exactly once");
  all(step(recipe, "Steam the idli").body, {
    en: /18 pieces[\s\S]*each batch[\s\S]*10–12 minutes[\s\S]*rest each batch 2 minutes/,
    "zh-hant": /蒸 18 個[\s\S]*分批[\s\S]*10–12 分鐘[\s\S]*每批靜置 2 分鐘/,
    ja: /イドゥリ18個[\s\S]*各回10〜12分[\s\S]*各回2分/,
    ko: /이들리 틀 18개 분량[\s\S]*한 번에 10~12분[\s\S]*각 회차 2분/,
    th: /พอ 18 ชิ้น[\s\S]*ทีละชุด[\s\S]*10–12 นาที[\s\S]*พักแต่ละชุด 2 นาที/
  }, "mold yield and batch timing are explicit");
  all(step(recipe, "Serve soft idli with hot sambar").body, {
    en: /six servings[\s\S]*three warm idli on each plate \(18 total\)[\s\S]*40 g coconut chutney per person/,
    "zh-hant": /六人份[\s\S]*18 個 idli[\s\S]*每盤放 3 個[\s\S]*每人 40 公克椰子 chutney/,
    ja: /6人分[\s\S]*計18個[\s\S]*3個ずつ[\s\S]*1人40gずつ/,
    ko: /6인분[\s\S]*총 18개[\s\S]*3개씩[\s\S]*1인당 40g씩/,
    th: /6 ที่[\s\S]*จานละ 3 ชิ้น[\s\S]*รวม 18 ชิ้น[\s\S]*คนละ 40 กรัม/
  }, "servings divide evenly");
  all(recipe.storage, {
    en: /cooked idli[\s\S]*within 1 hour[\s\S]*24 hours[\s\S]*only once[\s\S]*sambar[\s\S]*within 2 hours[\s\S]*conservative choice[\s\S]*74°C[\s\S]*fermented batter separate[\s\S]*not an official/,
    "zh-hant": /熟 idli[\s\S]*1 小時內[\s\S]*24 小時內[\s\S]*只回熱一次[\s\S]*sambar[\s\S]*2 小時內[\s\S]*保守期限[\s\S]*74°C[\s\S]*發酵麵糊另[\s\S]*不是官方/,
    ja: /調理済みイドゥリ[\s\S]*1時間以内[\s\S]*24時間以内[\s\S]*一度だけ[\s\S]*サンバル[\s\S]*2時間以内[\s\S]*保守的[\s\S]*74°C[\s\S]*発酵生地は別[\s\S]*公式/,
    ko: /익힌 이들리[\s\S]*1시간 안에[\s\S]*24시간 안에[\s\S]*한 번만[\s\S]*삼바르[\s\S]*2시간 안에[\s\S]*보수적[\s\S]*74°C[\s\S]*발효 반죽은 따로[\s\S]*공식/,
    th: /อิดลีสุก[\s\S]*1 ชั่วโมง[\s\S]*24 ชั่วโมง[\s\S]*ครั้งเดียว[\s\S]*ซัมบาร์[\s\S]*2 ชั่วโมง[\s\S]*เผื่อความปลอดภัย[\s\S]*74°C[\s\S]*แยกแป้งหมักไว้[\s\S]*ไม่ใช่ระยะเก็บ.*อย่างเป็นทางการ/
  }, "official cooked-rice guidance is not extended to fermenting batter");
  official(recipe, [src.rice, src.chill, src.temps]);
});

test("shoyu ramen separates the pork safety endpoint from estimated braise tenderness", () => {
  const recipe = get("shoyu-ramen");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [30, 85, 115, 4]);
  const braise = step(recipe, "Braise until safe and tender").body;
  all(braise, {
    en: /about 45 minutes[\s\S]*timing estimate[\s\S]*thickest centre[\s\S]*63°C \(145°F\)[\s\S]*3-minute rest[\s\S]*10 minutes more at a time/,
    "zh-hant": /約 45 分鐘[\s\S]*時間估算[\s\S]*最厚處中心[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*10 分鐘/,
    ja: /約45分[\s\S]*目安[\s\S]*最も厚い中心部[\s\S]*63℃（145°F）[\s\S]*3分休ませる[\s\S]*10分ずつ/,
    ko: /약 45분[\s\S]*예상치[\s\S]*가장 두꺼운 중심부[\s\S]*63°C\(145°F\)[\s\S]*3분간 휴지[\s\S]*10분씩/,
    th: /ประมาณ 45 นาที[\s\S]*ค่าประมาณ[\s\S]*ส่วนที่หนาที่สุด[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที[\s\S]*ครั้งละ 10 นาที/
  }, "pork uses the whole-cut endpoint plus rest while tenderness stays a separate estimate");
  all(step(recipe, "Assemble and serve hot").body, {
    en: /four warmed bowls \(150 g each\)[\s\S]*300 ml stock plus 37\.5 ml tare per bowl[\s\S]*125 g raw-pork equivalent[\s\S]*30 g menma[\s\S]*20 g narutomaki[\s\S]*15 g scallions/,
    "zh-hant": /四個溫碗（每碗 150 公克）[\s\S]*300 毫升高湯及 37\.5 毫升 tare[\s\S]*125 公克生豬肉[\s\S]*30 公克筍乾[\s\S]*20 公克鳴門卷[\s\S]*15 公克青蔥/,
    ja: /器4つ[\s\S]*各150g[\s\S]*鶏だし約300mlとたれ37\.5ml[\s\S]*約125g[\s\S]*メンマ30g[\s\S]*なると20g[\s\S]*ねぎ15g/,
    ko: /그릇 네 개[\s\S]*각 150g[\s\S]*육수 약 300ml와 타레 37\.5ml[\s\S]*약 125g[\s\S]*멘마 30g[\s\S]*나루토마키 20g[\s\S]*대파 15g/,
    th: /ชามอุ่นสี่ใบ[\s\S]*ชามละ 150 กรัม[\s\S]*น้ำสต๊อกประมาณ 300 มล\.[\s\S]*ทาเระ 37\.5 มล\.[\s\S]*125 กรัม[\s\S]*เมนมะ 30 กรัม[\s\S]*นารุโตะม้วน 20 กรัม[\s\S]*ต้นหอม 15 กรัม/
  }, "noodle, broth, pork and toppings divide across four bowls");
  all(recipe.storage, {
    en: /Within 2 hours[\s\S]*separate shallow covered containers[\s\S]*4°C \(40°F\) or below[\s\S]*2-day limit is a conservative recipe choice[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*不同淺容器[\s\S]*4°C（40°F）以下[\s\S]*2 天期限[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*別々の浅い容器[\s\S]*4℃（40°F）以下[\s\S]*2日以内[\s\S]*74℃（165°F）/,
    ko: /2시간 안에[\s\S]*얕은 용기[\s\S]*4°C\(40°F\) 이하[\s\S]*2일 한도[\s\S]*74°C\(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภาชนะตื้นแยกกัน[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*ขีดจำกัด 2 วัน[\s\S]*74°C \(165°F\)/
  }, "leftovers are cooled and reheated separately from fresh noodles");
  official(recipe, [src.temps, src.chill]);
});

test("Königsberger Klopse checks the largest meatball and accounts for stock and salt", () => {
  const recipe = get("koenigsberger-klopse");
  const poach = step(recipe, "Poach gently").body;
  all(poach, {
    en: /15–18 minutes[\s\S]*largest meatball reaches 71°C \/ 160°F[\s\S]*official minimum for ground meat[\s\S]*2-minute increments/,
    "zh-hant": /15–18 分鐘[\s\S]*最大肉丸中心[\s\S]*須達 71°C／160°F[\s\S]*官方絞肉最低熟度[\s\S]*每次續煮 2 分鐘/,
    ja: /15〜18分[\s\S]*最大の肉団子の中心[\s\S]*ひき肉の公式最低温度71°C \/ 160°F[\s\S]*71°C未満なら2分ずつ/,
    ko: /15–18분[\s\S]*가장 큰 미트볼의 중심[\s\S]*다짐육의 공식 최소 온도인 71°C \/ 160°F[\s\S]*중심이 71°C보다 낮으면 2분씩/,
    th: /15–18 นาที[\s\S]*ลูกใหญ่ที่สุด[\s\S]*ให้ถึง 71°C \/ 160°F[\s\S]*ขั้นต่ำทางการสำหรับเนื้อบด[\s\S]*หากต่ำกว่า 71°C ให้ต้มต่อครั้งละ 2 นาที/
  }, "ground meat temperature is checked independently of poaching time");
  all(step(recipe, "Make the roux").body, {
    en: /600 ml[\s\S]*remaining 600 ml[\s\S]*do not add it to this sauce/,
    "zh-hant": /600 毫升[\s\S]*其餘 600 毫升[\s\S]*不加入本醬汁/,
    ja: /600ml[\s\S]*残りの600ml[\s\S]*ソースには加えません/,
    ko: /600ml[\s\S]*남은 600ml[\s\S]*이 소스에는 넣지 않습니다/,
    th: /600 มล\.[\s\S]*น้ำต้มที่เหลือ 600 มล\.[\s\S]*ไม่ใส่ในซอสนี้/
  }, "only half the poaching stock enters the sauce");
  all(step(recipe, "Add capers and lemon").body, {
    en: /up to the remaining 6 g salt only after tasting[\s\S]*anchovy and capers already add salt/,
    "zh-hant": /剩餘最多 6 公克鹽[\s\S]*鯷魚與酸豆本身已有鹹味/,
    ja: /残りの塩を最大6g[\s\S]*アンチョビとケッパー/,
    ko: /남은 소금은 최대 6g[\s\S]*앤초비와 케이퍼/,
    th: /เกลือที่เหลือไม่เกิน 6 กรัม[\s\S]*แอนโชวีและเคเปอร์/
  }, "salt is adjusted after tasting the salty ingredients");
  all(step(recipe, "Warm through and serve").body, {
    en: /12 meatballs among four plates, three per serving[\s\S]*optional sides/,
    "zh-hant": /12 顆分到四盤，每盤 3 顆[\s\S]*可另配/,
    ja: /12個を4皿に3個ずつ分けて[\s\S]*任意の付け合わせ/,
    ko: /12개를 네 접시에 3개씩 나누고[\s\S]*선택 사항/,
    th: /แบ่ง 12 ลูกลง 4 จาน จานละ 3 ลูก[\s\S]*เป็นเครื่องเคียงเสริม[\s\S]*ไม่ได้รวมในรายการวัตถุดิบ/
  }, "portion size and unlisted optional sides are explicit");
  all(recipe.storage, {
    en: /shallow containers[\s\S]*within 2 hours[\s\S]*0–4°C[\s\S]*3 days as this recipe’s conservative limit[\s\S]*74°C \/ 165°F[\s\S]*unused 600 ml poaching stock/,
    "zh-hant": /分裝淺盒[\s\S]*2 小時內[\s\S]*0–4°C[\s\S]*保守期限[\s\S]*74°C／165°F[\s\S]*未用的 600 毫升/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*0〜4°C[\s\S]*保守的な設定[\s\S]*74°C \/ 165°F[\s\S]*ゆで汁600ml/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*0–4°C[\s\S]*보수적 한도[\s\S]*74°C \/ 165°F[\s\S]*포칭 육수 600ml/,
    th: /ภาชนะตื้น[\s\S]*0–4°C[\s\S]*2 ชั่วโมง[\s\S]*ขีดจำกัดแบบเผื่อความปลอดภัย[\s\S]*74°C \/ 165°F[\s\S]*น้ำต้มที่เหลือ 600 มล\./
  }, "unused stock receives a storage path as well");
  official(recipe, [src.temps, src.chill, src.cold]);
});

test("traditional trifle overlaps chilling steps while keeping custard and serving portions clear", () => {
  const recipe = get("traditional-trifle");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [405, 15, 420, 10]);
  all(step(recipe, "Pour and set the jelly").body, {
    en: /While the jelly chills[\s\S]*prepare the custard[\s\S]*chill it separately[\s\S]*do not layer it until completely cold/,
    "zh-hant": /果凍冷藏時[\s\S]*接著準備[\s\S]*另行冷藏[\s\S]*完全冰冷前不要疊層/,
    ja: /ゼリーを冷やしている間[\s\S]*カスタードを作り[\s\S]*別に冷やし[\s\S]*完全に冷えるまで重ねません/,
    ko: /젤리가 냉장되는 동안[\s\S]*커스터드를 준비해 따로 식힙니다[\s\S]*완전히 차가워지기 전에는 층을 올리지 않습니다/,
    th: /ระหว่างแช่เยลลี[\s\S]*เตรียมคัสตาร์ด[\s\S]*แช่แยก[\s\S]*อย่าซ้อนชั้นจนกว่าจะเย็นสนิท/
  }, "the custard is prepared during the jelly set and chilled separately");
  all(step(recipe, "Cook the custard").body, {
    en: /about 85°C[\s\S]*texture[\s\S]*official minimum for egg dishes is 71°C \/ 160°F/,
    "zh-hant": /85°C[\s\S]*質地[\s\S]*官方蛋料理最低溫度為 71°C／160°F/,
    ja: /約85°C[\s\S]*食感目標[\s\S]*卵料理の公式最低温度は71°C \/ 160°F/,
    ko: /약 85°C[\s\S]*질감 목표[\s\S]*달걀 요리의 공식 최소 온도는 71°C \/ 160°F/,
    th: /ประมาณ 85°C[\s\S]*เป้าหมายเนื้อสัมผัส[\s\S]*ขั้นต่ำอย่างเป็นทางการสำหรับอาหารไข่คือ 71°C \/ 160°F/
  }, "recipe thickening target is distinguished from official egg safety minimum");
  all(step(recipe, "Cool the custard fully").body, {
    en: /shallow bowl[\s\S]*within 2 hours of cooking/,
    "zh-hant": /淺碗[\s\S]*烹煮後 2 小時內/,
    ja: /浅い容器[\s\S]*調理後2時間以内/,
    ko: /얕은 그릇[\s\S]*조리 후 2시간 안에/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 2 ชั่วโมงหลังปรุง/
  }, "custard cooling clock is anchored to cooking");
  all(step(recipe, "Finish and chill the assembled trifle").body, {
    en: /10 even portions[\s\S]*about 4 g per serving/,
    "zh-hant": /10 等份[\s\S]*每份約 4 公克/,
    ja: /10等分[\s\S]*1人約4g/,
    ko: /10등분[\s\S]*1인분당 약 4g/,
    th: /10 ส่วน[\s\S]*ประมาณ 4 กรัมต่อส่วน/
  }, "optional almonds and serving count divide evenly");
  all(recipe.storage, {
    en: /0–4°C[\s\S]*2 days[\s\S]*recipe’s conservative limit[\s\S]*2 hours[\s\S]*not an official storage period/,
    "zh-hant": /0–4°C[\s\S]*2 天[\s\S]*保守期限[\s\S]*不是官方保存期限[\s\S]*2 小時/,
    ja: /0〜4°C[\s\S]*2日以内[\s\S]*保守的な設定[\s\S]*公式の保存期間ではありません[\s\S]*2時間/,
    ko: /0–4°C[\s\S]*2일 안에[\s\S]*보수적 선택[\s\S]*공식 보관 기간은 아닙니다[\s\S]*2시간/,
    th: /0–4°C[\s\S]*2 วัน[\s\S]*แบบเผื่อความปลอดภัย[\s\S]*ไม่ใช่ระยะเก็บอย่างเป็นทางการ[\s\S]*2 ชั่วโมง/
  }, "conservative storage limit is separated from official refrigeration guidance");
  official(recipe, [src.temps, src.chill, src.cold]);
});
