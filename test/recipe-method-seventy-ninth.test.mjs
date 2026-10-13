import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["cacio-e-pepe", "bucatini-amatriciana", "pasta-alla-norma", "trofie-al-pesto"];
const safety = {
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"
};
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
    const flags = pattern.flags.includes("i") ? pattern.flags : `${pattern.flags}i`;
    assert.match(localized[locale], new RegExp(pattern.source, flags), `${locale}: ${label}`);
  }
}

function official(dish) {
  for (const url of Object.values(safety)) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official handling and leftover guidance is credited separately`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: at least two culinary references remain`);
}

test("seventy-ninth batch selects four unfinished eligible recipes and extends exact five-locale coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug review ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -12);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "standing exclusions exist");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 312);
  assert.equal(new Set(beforeThisBatch).size, 312);
  assert.equal(covered.length, 324);
  assert.equal(new Set(covered).size, 324);
  assert.deepEqual(covered.slice(-12, -8), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 23);
  assert.equal(recipes.length - excluded.length - covered.length, 11);

  for (const id of ids) {
    const dish = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(dish.instructions, draft.instructions, `${id}: publication method was improved`);
    assert.notDeepEqual(dish.sources, draft.sources, `${id}: official safety references were added`);
    assert.deepEqual(dish.ingredients, draft.ingredients, `${id}: ingredient amounts are preserved`);
    assert.equal(dish.servings, draft.servings, `${id}: servings are preserved`);
    assert.deepEqual([dish.prepMinutes, dish.cookMinutes, dish.totalMinutes],
      [draft.prepMinutes, draft.cookMinutes, draft.totalMinutes], `${id}: published timing is preserved`);
    assert.equal(dish.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(dish.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: reviewed illustration mappings are preserved`);
    for (const locale of localeOrder) {
      assert.ok(dish.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: full method`);
      assert.ok(dish.tips.every((tip) => tip[locale]) && dish.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: localized notes`);
      assert.ok(dish.storage[locale], `${id}/${locale}: localized storage`);
    }
    official(dish);
    allLocales(dish.storage, {
      en: /within 2 hours[\s\S]*4°C\/40°F or colder[\s\S]*within 3 days[\s\S]*best pasta texture[\s\S]*74°C\/165°F[\s\S]*safety minimum is for leftovers[\s\S]*not the al dente target/,
      "zh-hant": /2 小時內冷藏[\s\S]*4°C／40°F 或以下[\s\S]*3 天內食用[\s\S]*麵條口感[\s\S]*74°C／165°F[\s\S]*剩食安全最低回熱溫度[\s\S]*不是新煮麵條/,
      ja: /2時間以内[\s\S]*4°C\/40°F以下[\s\S]*3日以内[\s\S]*パスタの食感[\s\S]*74°C\/165°F[\s\S]*残り物用[\s\S]*作りたてのパスタ/,
      ko: /2시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*3일 안에[\s\S]*파스타 식감[\s\S]*74°C\/165°F[\s\S]*남은 음식에 적용[\s\S]*갓 삶은 파스타/,
      th: /ภายใน 2 ชั่วโมง[\s\S]*4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 3 วัน[\s\S]*เนื้อพาสตา[\s\S]*74°C\/165°F[\s\S]*ของเหลือ[\s\S]*พาสต้าที่เพิ่งต้ม/
    }, `${id}: cold holding and leftover safety are separated from fresh pasta texture`);
  }
});

test("npm draft-audit commands and registered recipe source groups are distinct counts", async () => {
  const packageData = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageData.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  assert.equal(auditCommands.length, 20, "the package runs 20 draft-audit commands");
  const registrySource = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = registrySource.match(/export const allRecipeDrafts = \[([\s\S]*?)\];/)?.[1];
  assert.ok(groups, "the recipe source-group registry exists");
  assert.equal([...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length, 21, "the registry has 21 recipe source groups");
});

test("cacio e pepe controls pasta bite and repairs a grainy cheese emulsion", () => {
  const dish = recipe("cacio-e-pepe");
  allLocales(dish.instructions[1].body, {
    en: /3 minutes less[\s\S]*starting estimate[\s\S]*bite a strand[\s\S]*firm, not chalky, centre[\s\S]*400 ml/,
    "zh-hant": /少煮約 3 分鐘[\s\S]*只是起點[\s\S]*咬一條[\s\S]*中心仍有嚼勁但不硬粉[\s\S]*400 毫升/,
    ja: /約3分短く[\s\S]*時間は目安[\s\S]*1本かじり[\s\S]*粉っぽく硬くない[\s\S]*400ml/,
    ko: /약 3분 짧게[\s\S]*시작 추정치[\s\S]*한 가닥을 씹어[\s\S]*가루처럼 딱딱하지 않은[\s\S]*400ml/,
    th: /ประมาณ 3 นาที[\s\S]*จุดเริ่มต้น[\s\S]*ชิมเส้นหนึ่งเส้น[\s\S]*ไม่แข็งเป็นแป้ง[\s\S]*400 มล/
  }, "package time is an estimate and pasta bite is judged directly");
  allLocales(dish.instructions[3].body, {
    en: /off the burner[\s\S]*45 seconds[\s\S]*warm—not boiling[\s\S]*15 ml at a time[\s\S]*small clumps[\s\S]*do not boil/,
    "zh-hant": /完全離火[\s\S]*45 秒[\s\S]*溫熱但不沸騰[\s\S]*每次加 15 毫升[\s\S]*結小粒[\s\S]*不要.*煮沸/,
    ja: /火から外し[\s\S]*45秒[\s\S]*沸騰していない温かい[\s\S]*15mlずつ[\s\S]*小さな塊[\s\S]*沸騰させません/,
    ko: /불에서 내리고[\s\S]*45초[\s\S]*끓지 않는 따뜻한[\s\S]*15ml씩[\s\S]*작은 덩어리[\s\S]*끓이지 않습니다/,
    th: /ออกจากเตา[\s\S]*45 วินาที[\s\S]*อุ่นที่ไม่เดือด[\s\S]*ครั้งละ 15 มล\.[\s\S]*จับเป็นเม็ดเล็ก[\s\S]*อย่าต้ม/
  }, "the sauce is emulsified off heat with a specific rescue for clumping");
  assert.doesNotMatch(dish.commonMistakes[0].en, /cream sauce|cook the pasta fully in plain water/i,
    "generic pasta-profile notes are replaced with cacio-specific recovery advice");
});

test("bucatini all’amatriciana gives sauce recovery without inventing a fresh-cooking safety endpoint", () => {
  const dish = recipe("bucatini-amatriciana");
  allLocales(dish.instructions[1].body, {
    en: /12–15 minutes[\s\S]*coats a spoon[\s\S]*3 minutes longer[\s\S]*pasty[\s\S]*15 ml water[\s\S]*taste before adding any salt/,
    "zh-hant": /12–15 分鐘[\s\S]*薄裹湯匙[\s\S]*多煮 3 分鐘[\s\S]*糊狀[\s\S]*15 毫升水[\s\S]*先試味再決定是否加鹽/,
    ja: /12〜15分[\s\S]*スプーンを薄く覆う[\s\S]*3分煮詰め[\s\S]*ペースト状[\s\S]*水を15ml[\s\S]*味を見ます/,
    ko: /12–15분[\s\S]*숟가락에 얇게[\s\S]*3분 더[\s\S]*페이스트[\s\S]*물 15ml[\s\S]*맛봅니다/,
    th: /12–15 นาที[\s\S]*เคลือบช้อนบาง ๆ[\s\S]*3 นาที[\s\S]*เนื้อแป้ง[\s\S]*น้ำ 15 มล\.[\s\S]*ชิมก่อนเติมเกลือ/
  }, "tomato sauce has thick/thin correction and salt is deferred until tasting");
  allLocales(dish.instructions[0].body, {
    en: /estimate, not a safety-temperature test[\s\S]*lower the heat/,
    "zh-hant": /時間是估算，不是安全溫度檢查[\s\S]*轉小火/,
    ja: /時間は目安で、安全温度の判定ではありません[\s\S]*火を弱め/,
    ko: /시간은 추정치이며 안전 온도 검사가 아닙니다[\s\S]*불을 낮춰/,
    th: /เป็นเพียงค่าประมาณ ไม่ใช่การตรวจอุณหภูมิความปลอดภัย[\s\S]*ลดไฟ/
  }, "rendering and crispness are not mislabeled as a safety-temperature endpoint");
});

test("pasta alla Norma prevents overcooking while correcting watery sauce", () => {
  const dish = recipe("pasta-alla-norma");
  allLocales(dish.instructions[0].body, {
    en: /two uncrowded batches[\s\S]*deep golden[\s\S]*centres soften[\s\S]*lower the heat[\s\S]*do not pile/,
    "zh-hant": /分兩批不擁擠[\s\S]*深金黃[\s\S]*中心變軟[\s\S]*轉小一檔火力[\s\S]*不要.*堆/,
    ja: /2回に分け[\s\S]*濃いきつね色[\s\S]*中まで柔らかく[\s\S]*火を一段弱め[\s\S]*重ねません/,
    ko: /두 번 나누어[\s\S]*진한 금빛[\s\S]*속이 부드러워지게[\s\S]*불을 한 단계 낮춥니다[\s\S]*쌓지 않습니다/,
    th: /สองชุด[\s\S]*สีทองเข้ม[\s\S]*เนื้อนุ่ม[\s\S]*ลดไฟลงหนึ่งระดับ[\s\S]*ไม่กองซ้อน/
  }, "eggplant browning has pan-space, doneness, and over-browning cues");
  allLocales(dish.commonMistakes[1], {
    en: /lift out the tender eggplant[\s\S]*simmer the sauce uncovered for 1–2 minutes[\s\S]*Do not keep boiling the pasta and eggplant/,
    "zh-hant": /先撈出軟茄子[\s\S]*揭蓋把醬汁煮 1–2 分鐘[\s\S]*不要.*持續煮麵與茄子/,
    ja: /柔らかいなすをいったん取り出し[\s\S]*蓋なしで1〜2分[\s\S]*麺となすを煮続けません/,
    ko: /부드러운 가지를 잠시 건져[\s\S]*뚜껑을 열고 1–2분[\s\S]*면과 가지를 계속 끓이지/,
    th: /ตักมะเขือยาวที่นุ่มแล้วออก[\s\S]*เคี่ยวซอสเปิดฝา 1–2 นาที[\s\S]*อย่าต้มเส้นและมะเขือยาวต่อ/
  }, "watery sauce is reduced separately so pasta and eggplant do not overcook");
});

test("trofie al pesto keeps hot cooking water away from basil and gives an emulsified sauce rescue", () => {
  const dish = recipe("trofie-al-pesto");
  allLocales(dish.instructions[2].body, {
    en: /bright green with a slight bite[\s\S]*package times are only estimates[\s\S]*firm but not chalky[\s\S]*lift out the beans/,
    "zh-hant": /翠綠且略帶脆度[\s\S]*包裝時間只是估算[\s\S]*中心應堅實但不粉硬[\s\S]*撈出四季豆/,
    ja: /鮮やかな緑で少し歯ごたえ[\s\S]*表示時間は目安[\s\S]*硬すぎず粉っぽくない[\s\S]*いんげんを穴あきスプーンですくい/,
    ko: /선명한 초록색에 약간 아삭[\s\S]*포장 시간은 추정치[\s\S]*가루처럼 딱딱하지 않[\s\S]*콩을 건져/,
    th: /เขียวสดและยังกรุบเล็กน้อย[\s\S]*เวลาบนห่อเป็นเพียงค่าประมาณ[\s\S]*ไม่เป็นแป้ง[\s\S]*ช้อนถั่วขึ้น/
  }, "potato, beans and pasta each have a sensory endpoint and timing mismatch rescue");
  allLocales(dish.instructions[3].body, {
    en: /cool until it is warm and no longer steaming[\s\S]*toss gently off the heat[\s\S]*15 ml at a time[\s\S]*little finely grated cheese[\s\S]*Do not return.*direct heat/,
    "zh-hant": /放涼至溫溫、不再冒蒸氣[\s\S]*離火輕柔拌勻[\s\S]*每次加 15 毫升[\s\S]*少量細刨起司[\s\S]*不要.*直火/,
    ja: /湯気が立たない温かさまで冷まして[\s\S]*火から外してやさしく和え[\s\S]*15mlずつ[\s\S]*チーズを少量[\s\S]*直火に戻しません/,
    ko: /김이 나지 않을 만큼 따뜻해질 때까지 식힌[\s\S]*불에서 내려[\s\S]*15ml씩[\s\S]*치즈를 조금[\s\S]*직접 불에 다시 올리지/,
    th: /เย็นจนแค่อุ่นและไม่มีไอ[\s\S]*นอกเตา[\s\S]*ครั้งละ 15 มล\.[\s\S]*ชีสขูดละเอียดเล็กน้อย[\s\S]*อย่านำชามกลับไปตั้งไฟ/
  }, "reserved hot water is cooled before fresh pesto is dressed");
  assert.doesNotMatch(dish.commonMistakes[0].en, /samosa|puri|cream sauce/i,
    "inherited generic creamy-pasta advice is replaced with pesto-specific recovery");
});
