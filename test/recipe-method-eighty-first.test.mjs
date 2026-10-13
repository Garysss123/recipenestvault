import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["tabbouleh", "vegetable-pakora", "gratin-dauphinois", "kelewele"];
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";
const published = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function recipe(id) {
  const found = published.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function allLocales(localized, patterns, label) {
  for (const locale of localeOrder) {
    const pattern = patterns[locale];
    assert.ok(pattern, `${locale}: pattern exists for ${label}`);
    assert.ok(pattern.test(localized[locale]), `${locale}: ${label}; text was ${localized[locale]}`);
  }
}

function official(dish, urls) {
  for (const url of urls) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: ${url} is labeled as official food-safety guidance`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: culinary references remain separately listed`);
}

test("eighty-first batch improves four genuinely unfinished eligible methods and preserves recipe facts", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug review ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -8);
  const throughThisBatch = covered.slice(0, -4);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "standing exclusions exist");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 320);
  assert.equal(new Set(beforeThisBatch).size, 320);
  assert.equal(covered.length, 328);
  assert.equal(new Set(covered).size, 328);
  assert.deepEqual(throughThisBatch.slice(-4), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 15);
  assert.equal(recipes.length - excluded.length - throughThisBatch.length, 11,
    "eleven eligible recipes remained immediately after this historical batch");
  assert.equal(recipes.length - excluded.length - covered.length, 7,
    "seven eligible recipes remain after the next batch");

  for (const id of ids) {
    const dish = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(dish.instructions, draft.instructions, `${id}: publication method was improved`);
    assert.notDeepEqual(dish.sources, draft.sources, `${id}: official safety reference was added`);
    assert.deepEqual(dish.ingredients, draft.ingredients, `${id}: ingredient rows and amounts are preserved`);
    assert.equal(dish.servings, draft.servings, `${id}: servings are preserved`);
    assert.deepEqual([dish.prepMinutes, dish.cookMinutes, dish.totalMinutes],
      [draft.prepMinutes, draft.cookMinutes, draft.totalMinutes], `${id}: recipe times are preserved`);
    assert.equal(dish.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(dish.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: illustration scenes stay mapped to the same stages`);
    for (const locale of localeOrder) {
      assert.ok(dish.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: complete method`);
      assert.ok(dish.tips.every((tip) => tip[locale]) && dish.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: localized tips and recovery notes`);
      assert.ok(dish.storage[locale], `${id}/${locale}: localized storage guidance`);
    }
  }

  const tabbouleh = recipe("tabbouleh");
  official(tabbouleh, [handling]);
  allLocales(tabbouleh.instructions[0].body, {
    en: /45 g fine bulgur[\s\S]*45 ml[\s\S]*10 minutes[\s\S]*gritty centre[\s\S]*5 minutes more[\s\S]*remaining 45 ml/,
    "zh-hant": /45 公克[\s\S]*45 毫升[\s\S]*10 分鐘[\s\S]*砂礫般硬芯[\s\S]*5 分鐘[\s\S]*剩下的 45 毫升/,
    ja: /ブルグル45g[\s\S]*45ml[\s\S]*10分[\s\S]*ざらつく芯[\s\S]*5分追加[\s\S]*残りの45ml/,
    ko: /불구르 45g[\s\S]*45ml[\s\S]*10분[\s\S]*거친 심[\s\S]*5분 더[\s\S]*남은 45ml/,
    th: /บัลเกอร์ชนิดละเอียด 45 กรัม[\s\S]*45 มล\.[\s\S]*10 นาที[\s\S]*แกนสาก[\s\S]*5 นาที[\s\S]*45 มล\.ที่เหลือ/
  }, "bulgur hydration and under-hydration recovery are measured");
  allLocales(tabbouleh.instructions[1].body, {
    en: /under running water[\s\S]*before trimming or cutting[\s\S]*do not use soap/,
    "zh-hant": /流水下沖洗[\s\S]*再修剪或切開[\s\S]*不要用肥皂/,
    ja: /切る前に流水で洗います[\s\S]*石けんや野菜用洗剤は使いません/,
    ko: /자르기 전에 흐르는 물에 씻습니다[\s\S]*비누나 채소 세정제는 쓰지 않습니다/,
    th: /ล้าง.*ใต้ก๊อกน้ำก่อนตัดแต่ง[\s\S]*ห้ามใช้สบู่/
  }, "fresh produce is washed before cutting without soaps");
  allLocales(tabbouleh.storage, {
    en: /within 2 hours[\s\S]*within 1 hour above 32°C\/90°F[\s\S]*4°C\/40°F or colder[\s\S]*within 2 days[\s\S]*smell and appearance cannot confirm safety/,
    "zh-hant": /2 小時內[\s\S]*32°C／90°F 時 1 小時內[\s\S]*4°C／40°F 或以下[\s\S]*2 天內[\s\S]*氣味與外觀不能證明安全/,
    ja: /2時間以内[\s\S]*32°C\/90°Fを超える場合は1時間以内[\s\S]*4°C\/40°F以下[\s\S]*2日以内[\s\S]*においや見た目だけでは安全を確認できません/,
    ko: /2시간 안에[\s\S]*32°C\/90°F보다 높으면 1시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*2일 안에[\s\S]*냄새나 겉모습으로 안전을 확인할 수 없습니다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C\/90°F[\s\S]*4°C\/40°F หรือต่ำกว่า[\s\S]*2 วัน[\s\S]*กลิ่นและรูปลักษณ์ยืนยันความปลอดภัยไม่ได้/
  }, "cold salad handling follows official chill guidance");

  const pakora = recipe("vegetable-pakora");
  official(pakora, [handling, temperatures, rawFlour]);
  allLocales(pakora.instructions[2].body, {
    en: /water 15 ml at a time[\s\S]*0–90 ml range[\s\S]*Do not taste this uncooked mixture[\s\S]*harmful bacteria/,
    "zh-hant": /冷水每次加 15 毫升[\s\S]*0–90 毫升[\s\S]*不要試吃生麵糊[\s\S]*致病細菌/,
    ja: /冷水を15mlずつ[\s\S]*0〜90ml[\s\S]*有害な細菌[\s\S]*生地を味見しません/,
    ko: /찬물을 한 번에 15ml씩[\s\S]*0–90ml[\s\S]*해로운 세균[\s\S]*맛보지 마세요/,
    th: /น้ำเย็นครั้งละ 15 มล\.[\s\S]*0–90 มล\.[\s\S]*ห้ามชิมส่วนผสมดิบ[\s\S]*แบคทีเรียที่เป็นอันตราย/
  }, "raw flour is not tasted and binding water is measured");
  allLocales(pakora.instructions[3].body, {
    en: /175°C\/347°F[\s\S]*165–175°C\/329–347°F[\s\S]*crispness and browning target[\s\S]*not a safe minimum internal temperature[\s\S]*never add water/,
    "zh-hant": /175°C／347°F[\s\S]*165–175°C／329–347°F[\s\S]*酥脆與上色目標[\s\S]*不是安全最低中心溫度[\s\S]*絕不可向熱油加水/,
    ja: /175°C\/347°F[\s\S]*165〜175°C\/329〜347°F[\s\S]*カリッと色よく揚げる目標[\s\S]*安全上の中心温度ではありません[\s\S]*水を入れてはいけません/,
    ko: /175°C\/347°F[\s\S]*165–175°C\/329–347°F[\s\S]*바삭함과 갈변 목표이지[\s\S]*식품 안전 최소 중심 온도가 아닙니다[\s\S]*물을 붓지 마세요/,
    th: /175°C\/347°F[\s\S]*165–175°C\/329–347°F[\s\S]*เป้าหมายเพื่อความกรอบและสี[\s\S]*ไม่ใช่อุณหภูมิภายในขั้นต่ำ[\s\S]*ห้ามเติมน้ำลงในน้ำมันร้อน/
  }, "deep-fry temperature is a quality target and hot-oil recovery is safe");
  allLocales(pakora.instructions[4].body, {
    en: /2 mm potato strands[\s\S]*no damp, paste-like flour[\s\S]*60–90 seconds[\s\S]*cooking-quality cues[\s\S]*no fresh-pakora safety minimum/,
    "zh-hant": /2 毫米馬鈴薯絲[\s\S]*濕黏、糊狀生粉[\s\S]*60–90 秒[\s\S]*料理熟度與品質線索[\s\S]*沒有可套用的新炸巴可拉食安最低溫度/,
    ja: /2mmのじゃがいも[\s\S]*湿ったペースト状の粉[\s\S]*60〜90秒[\s\S]*調理状態と品質の目安[\s\S]*揚げたての食安最低温度はありません/,
    ko: /2mm 감자채[\s\S]*축축하고 풀 같은 생가루 반죽[\s\S]*60–90초[\s\S]*조리 상태와 품질 단서[\s\S]*안전 최소 온도는 따로 정해져 있지 않습니다/,
    th: /เส้นมันฝรั่ง 2 มม\.[\s\S]*แป้งเปียกเหนียว[\s\S]*60–90 วินาที[\s\S]*เกณฑ์ความสุกและคุณภาพ[\s\S]*ไม่ได้มีอุณหภูมิขั้นต่ำ/
  }, "flour and potato are checked by cooking cues without inventing a safety endpoint");
  assert.match(pakora.storage.en, /74°C\/165°F[\s\S]*safety minimum for any leftovers[\s\S]*not safety measurements/);

  const gratin = recipe("gratin-dauphinois");
  official(gratin, [temperatures]);
  allLocales(gratin.instructions[5].body, {
    en: /at least 74°C\/165°F[\s\S]*official safety minimum for meatless casseroles[\s\S]*thin knife[\s\S]*safety floor, not the tenderness cue[\s\S]*5-minute increments/,
    "zh-hant": /至少達 74°C／165°F[\s\S]*無肉砂鍋料理的安全最低溫度[\s\S]*薄刀[\s\S]*安全底線，不代表馬鈴薯已軟[\s\S]*每次 5 分鐘/,
    ja: /安全最低温度[\s\S]*74°C\/165°F以上[\s\S]*薄いナイフ[\s\S]*安全上の下限[\s\S]*5分ずつ焼き/,
    ko: /공식 안전 최소 온도[\s\S]*74°C\/165°F 이상[\s\S]*얇은 칼[\s\S]*안전 하한이지 감자가 부드럽다는 신호는 아닙니다[\s\S]*5분씩 더/,
    th: /อย่างน้อย 74°C\/165°F[\s\S]*อุณหภูมิขั้นต่ำอย่างเป็นทางการ[\s\S]*มีดบาง[\s\S]*ไม่ใช่สัญญาณว่ามันฝรั่งนุ่มแล้ว[\s\S]*ครั้งละ 5 นาที/
  }, "meatless casserole safety floor is distinct from potato tenderness and browning");
  allLocales(gratin.storage, {
    en: /within 2 hours[\s\S]*within 1 hour above 32°C\/90°F[\s\S]*4°C\/40°F or colder[\s\S]*for best quality, use within 3 days[\s\S]*safety minimum for reheated leftovers[\s\S]*not a fresh doneness cue/,
    "zh-hant": /2 小時內[\s\S]*32°C／90°F 時 1 小時內[\s\S]*4°C／40°F 或以下[\s\S]*為保持最佳品質[\s\S]*3 天內[\s\S]*回熱剩食的安全最低溫度[\s\S]*不是新做時的熟度判斷/,
    ja: /2時間以内[\s\S]*32°C\/90°Fを超える場合は1時間以内[\s\S]*4°C\/40°F以下[\s\S]*品質を保つため3日以内[\s\S]*残り物の安全最低温度[\s\S]*作りたての火通りの合図ではありません/,
    ko: /2시간 안에[\s\S]*32°C\/90°F보다 높으면 1시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*최상의 품질을 위해 3일 안에[\s\S]*안전 최소 온도[\s\S]*갓 만든 음식의 익힘 신호는 아닙니다/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C\/90°F[\s\S]*4°C\/40°F หรือต่ำกว่า[\s\S]*เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน[\s\S]*อุณหภูมิขั้นต่ำเพื่อความปลอดภัย[\s\S]*ไม่ใช่เกณฑ์ความสุก/
  }, "cooked dairy and potatoes use prompt chilling and safe leftover reheating");

  const kelewele = recipe("kelewele");
  official(kelewele, [handling, temperatures]);
  allLocales(kelewele.instructions[0].body, {
    en: /under running water[\s\S]*before peeling[\s\S]*2.5 cm cubes[\s\S]*centre check/,
    "zh-hant": /流水下沖洗[\s\S]*再剝皮[\s\S]*2.5 公分方塊[\s\S]*中心熟度/,
    ja: /皮をむく前に流水で洗い[\s\S]*2.5cm角[\s\S]*中心の火通り/,
    ko: /껍질을 벗기기 전에 흐르는 물에 씻고[\s\S]*2.5cm[\s\S]*중심 익힘/,
    th: /ล้าง.*ใต้ก๊อกน้ำ[\s\S]*ก่อนปอก[\s\S]*2.5 ซม\.[\s\S]*แกนสุก/
  }, "plantains are washed before peeling and cut uniformly");
  allLocales(kelewele.instructions[3].body, {
    en: /175°C\/347°F[\s\S]*not a food-safety minimum[\s\S]*centre should be hot and uniformly soft[\s\S]*165°C\/329°F[\s\S]*60–90 seconds[\s\S]*smaller batch/,
    "zh-hant": /175°C／347°F[\s\S]*不是食安最低溫度[\s\S]*中心應熱透、均勻柔軟[\s\S]*165°C／329°F[\s\S]*60–90 秒[\s\S]*減量重炸/,
    ja: /175°C\/347°F[\s\S]*安全上の最低温度ではありません[\s\S]*中心まで熱く、均一に柔らかい[\s\S]*165°C\/329°F[\s\S]*60〜90秒[\s\S]*少量ずつ揚げ直し/,
    ko: /175°C\/347°F[\s\S]*식품 안전 최소 온도가 아닙니다[\s\S]*중심까지 뜨겁고 고르게 부드러우[\s\S]*165°C\/329°F[\s\S]*60–90초[\s\S]*더 적은 양/,
    th: /175°C\/347°F[\s\S]*ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัย[\s\S]*แกนร้อนและนุ่มสม่ำเสมอ[\s\S]*165°C\/329°F[\s\S]*60–90 วินาที[\s\S]*ชุดเล็กลง/
  }, "plantain frying temperature is a texture target with a recoverable centre check");
  allLocales(kelewele.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F or colder[\s\S]*within 2 days[\s\S]*74°C\/165°F[\s\S]*official safety minimum for leftovers of any type/,
    "zh-hant": /2 小時內[\s\S]*4°C／40°F 或以下[\s\S]*2 天內[\s\S]*74°C／165°F[\s\S]*各類剩食的安全最低溫度/,
    ja: /2時間以内[\s\S]*4°C\/40°F以下[\s\S]*2日以内[\s\S]*残り物全般の公式安全最低温度[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*2일 안에[\s\S]*모든 종류의 남은 음식에 대한 공식 안전 최소 온도[\s\S]*74°C\/165°F/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C\/40°F หรือต่ำกว่า[\s\S]*2 วัน[\s\S]*74°C\/165°F[\s\S]*อุณหภูมิขั้นต่ำอย่างเป็นทางการของอาหารเหลือทุกชนิด/
  }, "leftover reheating guidance is separate from the fresh frying target");
});

test("draft-audit commands and recipe source groups remain separate counts", async () => {
  const packageData = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageData.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  assert.equal(auditCommands.length, 20, "package.json has 20 draft-audit commands");
  const registrySource = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = registrySource.match(/export const allRecipeDrafts = \[([\s\S]*?)\];/)?.[1];
  assert.ok(groups, "the registry of recipe source groups exists");
  assert.equal([...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length, 21, "the registry has 21 recipe source groups");
});
