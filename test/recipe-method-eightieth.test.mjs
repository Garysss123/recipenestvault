import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["jiufen-taro-balls", "maple-taffy", "injera", "hummus"];
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
    assert.match(localized[locale], new RegExp(pattern.source, pattern.flags.includes("i") ? pattern.flags : `${pattern.flags}i`),
      `${locale}: ${label}`);
  }
}

function official(dish, urls) {
  for (const url of urls) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: ${url} is listed as official food-safety guidance`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: existing culinary sources remain separate`);
}

test("eightieth batch adds four genuinely unfinished eligible recipes and preserves recipe facts", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug review ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -8);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "standing exclusions exist");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 316);
  assert.equal(new Set(beforeThisBatch).size, 316);
  assert.equal(covered.length, 324);
  assert.equal(new Set(covered).size, 324);
  assert.deepEqual(covered.slice(-8, -4), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 19);
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
      [draft.prepMinutes, draft.cookMinutes, draft.totalMinutes], `${id}: timing is preserved`);
    assert.equal(dish.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(dish.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: illustration scene mappings are preserved`);
    for (const locale of localeOrder) {
      assert.ok(dish.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: full method`);
      assert.ok(dish.tips.every((tip) => tip[locale]) && dish.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: localized notes`);
      assert.ok(dish.storage[locale], `${id}/${locale}: localized storage`);
    }
  }

  const taro = recipe("jiufen-taro-balls");
  official(taro, [handling, temperatures]);
  allLocales(taro.instructions[0].body, {
    en: /20–25 minutes[\s\S]*time is an estimate[\s\S]*skewer[\s\S]*centre without resistance[\s\S]*3 minutes more/,
    "zh-hant": /20–25 分鐘[\s\S]*時間是估算[\s\S]*竹籤[\s\S]*中心.*毫無阻力[\s\S]*再蒸 3 分鐘/,
    ja: /20〜25分[\s\S]*時間は目安[\s\S]*串[\s\S]*中心まで抵抗なく[\s\S]*3分追加/,
    ko: /20–25분[\s\S]*시간은 추정치[\s\S]*꼬치[\s\S]*중심까지 저항 없이[\s\S]*3분 더/,
    th: /20–25 นาที[\s\S]*ค่าประมาณ[\s\S]*ไม้เสียบ[\s\S]*กลางได้โดยไม่มีแรงต้าน[\s\S]*3 นาที/
  }, "root tenderness is judged by skewer, not time alone");
  allLocales(taro.instructions[4].body, {
    en: /all the pieces float[\s\S]*2 minutes more[\s\S]*cut one[\s\S]*dry, chalky starch core[\s\S]*1 minute more/,
    "zh-hant": /所有芋圓浮起[\s\S]*2 分鐘[\s\S]*切開[\s\S]*乾粉狀澱粉芯[\s\S]*再煮 1 分鐘/,
    ja: /全部浮いてからさらに2分[\s\S]*割って[\s\S]*粉状の芯[\s\S]*1分追加/,
    ko: /모두 떠오른 뒤[\s\S]*2분 더[\s\S]*잘라[\s\S]*가루 같은 전분 심[\s\S]*1분 더/,
    th: /ลูกทั้งหมดลอย[\s\S]*2 นาที[\s\S]*ผ่าลูก[\s\S]*แกนแป้งแห้งเป็นผง[\s\S]*เพิ่ม 1 นาที/
  }, "floating is followed by an interior doneness check and timed recovery");
  allLocales(taro.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F or colder[\s\S]*within 3 days[\s\S]*74°C\/165°F[\s\S]*safety minimum[\s\S]*not the fresh/,
    "zh-hant": /2 小時內冷藏[\s\S]*4°C／40°F 或以下[\s\S]*3 天內[\s\S]*74°C／165°F[\s\S]*安全最低溫度[\s\S]*不是新做/,
    ja: /2時間以内[\s\S]*4°C\/40°F以下[\s\S]*3日以内[\s\S]*74°C\/165°F[\s\S]*安全最低温度[\s\S]*作りたて/,
    ko: /2시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*3일 안에[\s\S]*74°C\/165°F[\s\S]*안전 최소 온도[\s\S]*갓 만든/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 3 วัน[\s\S]*74°C\/165°F[\s\S]*ขั้นต่ำเพื่อความปลอดภัย[\s\S]*ทำใหม่/
  }, "leftover safety temperature is separated from fresh chew");
  assert.doesNotMatch(taro.tips[1].en, /pastry|fruit|ice stays fine/i, "unrelated inherited dessert advice is removed");

  const maple = recipe("maple-taffy");
  official(maple, [handling]);
  allLocales(maple.instructions[2].body, {
    en: /114–116°C\/237–240°F[\s\S]*soft-ball[\s\S]*texture target[\s\S]*not a food-safety minimum/,
    "zh-hant": /114–116°C／237–240°F[\s\S]*軟球[\s\S]*口感目標[\s\S]*不是食安最低溫度/,
    ja: /114〜116°C\/237〜240°F[\s\S]*ソフトボール[\s\S]*食感目標[\s\S]*食品安全の最低温度/,
    ko: /114–116°C\/237–240°F[\s\S]*소프트볼 단계[\s\S]*제과 질감 목표[\s\S]*식품 안전 최소 온도/,
    th: /114–116°C\/237–240°F[\s\S]*จุดซอฟต์บอล[\s\S]*เป้าหมายเนื้อสัมผัส[\s\S]*ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัย/
  }, "candy texture stage is not confused with a safety endpoint");
  assert.doesNotMatch(`${maple.tips[0].en} ${maple.tips[1].en} ${maple.commonMistakes.map((x) => x.en).join(" ")}`,
    /chocolate|layered bars|warm knife/i, "unrelated inherited bar-cookie advice is removed");

  const injera = recipe("injera");
  official(injera, [handling, temperatures, rawFlour]);
  allLocales(injera.instructions[1].body, {
    en: /48 hours[\s\S]*Bubbles[\s\S]*not proof of safety[\s\S]*Do not taste[\s\S]*Discard the entire batch/,
    "zh-hant": /48 小時[\s\S]*氣泡[\s\S]*不是安全證明[\s\S]*不要試吃[\s\S]*整批丟棄/,
    ja: /48時間[\s\S]*泡[\s\S]*安全の証明ではありません[\s\S]*味見しません[\s\S]*全量を捨てます/,
    ko: /48시간[\s\S]*기포[\s\S]*안전을 증명하지 않습니다[\s\S]*맛보지 마세요[\s\S]*전량 버립니다/,
    th: /48 ชั่วโมง[\s\S]*ฟอง[\s\S]*ไม่ได้ยืนยันความปลอดภัย[\s\S]*อย่าชิม[\s\S]*ทิ้งทั้งชุด/
  }, "fermentation observations are not presented as food-safety proof");
  allLocales(injera.instructions[4].body, {
    en: /small holes[\s\S]*matte and dry[\s\S]*not flip/,
    "zh-hant": /許多小孔[\s\S]*霧面乾爽[\s\S]*不要翻面/,
    ja: /小さな穴[\s\S]*つやが消えて乾いた[\s\S]*裏返しません/,
    ko: /작은 구멍[\s\S]*보송해지면[\s\S]*뒤집지 않습니다/,
    th: /รูเล็ก[\s\S]*ผิวด้านแห้ง[\s\S]*อย่าพลิก/
  }, "fresh bread is judged by its surface and texture");
  assert.match(injera.storage.en, /74°C\/165°F[\s\S]*safety minimum[\s\S]*not the fresh/);

  const hummus = recipe("hummus");
  official(hummus, [handling]);
  allLocales(hummus.instructions[2].body, {
    en: /about 45 ml[\s\S]*smooth, glossy[\s\S]*thick ribbon[\s\S]*15 ml at a time[\s\S]*not a food-safety test/,
    "zh-hant": /先加約 45 毫升[\s\S]*細滑、有光澤[\s\S]*濃稠細帶[\s\S]*每次加 15 毫升[\s\S]*不是食安檢查/,
    ja: /まず約45ml[\s\S]*滑らかでつや[\s\S]*リボン状[\s\S]*15mlずつ[\s\S]*食品安全の検査ではありません/,
    ko: /약 45ml[\s\S]*매끈하고 윤기[\s\S]*리본처럼[\s\S]*15ml씩[\s\S]*안전 검사 기준은 아닙니다/,
    th: /ประมาณ 45 มล\.[\s\S]*เนียน เงา[\s\S]*เป็นสายหนืด[\s\S]*ครั้งละ 15 มล\.[\s\S]*ไม่ใช่การตรวจความปลอดภัย/
  }, "no-cook hummus has a texture endpoint and measured consistency correction");
  assert.match(hummus.storage.en, /within 2 hours[\s\S]*4°C\/40°F or colder[\s\S]*within 3 days[\s\S]*not a doneness temperature/);
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
