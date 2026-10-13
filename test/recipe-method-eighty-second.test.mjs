import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["baingan-bharta", "butter-naan", "melanzane-parmigiana", "patatas-bravas"];
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
    assert.ok(patterns[locale].test(localized[locale]), `${locale}: ${label}; text was ${localized[locale]}`);
  }
}

function official(dish, urls) {
  for (const url of urls) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: ${url} is labeled as official food-safety guidance`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: culinary method references remain separate`);
}

test("eighty-second batch extends exact-slug coverage with four unfinished eligible methods", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug review ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -4);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionsBody = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionsBody, "the standing exclusion list exists");
  const excluded = [...exclusionsBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 324);
  assert.equal(new Set(beforeThisBatch).size, 324);
  assert.equal(covered.length, 328);
  assert.equal(new Set(covered).size, 328);
  assert.deepEqual(covered.slice(-4), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 11);
  assert.equal(recipes.length - excluded.length - covered.length, 7);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id) && !excluded.includes(id)));

  for (const id of ids) {
    const dish = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: unchanged source draft remains present`);
    assert.notDeepEqual(dish.instructions, draft.instructions, `${id}: published method was refined`);
    assert.notDeepEqual(dish.sources, draft.sources, `${id}: official source attribution was added`);
    assert.deepEqual(dish.ingredients, draft.ingredients, `${id}: ingredient rows and amounts are preserved`);
    assert.equal(dish.servings, draft.servings, `${id}: servings are preserved`);
    assert.equal(dish.instructions.length, draft.instructions.length, `${id}: original step count is preserved`);
    assert.deepEqual(dish.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: illustration scenes stay mapped to the same stages`);
    for (const locale of localeOrder) {
      assert.ok(dish.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: complete steps`);
      assert.ok(dish.tips.every((tip) => tip[locale]) && dish.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: localized tips and recovery notes`);
      assert.ok(dish.storage[locale], `${id}/${locale}: localized storage guidance`);
    }
  }

  assert.deepEqual([recipe("baingan-bharta").prepMinutes, recipe("baingan-bharta").cookMinutes, recipe("baingan-bharta").totalMinutes],
    [20, 70, 90], "eggplant roast and finishing stages fit the published estimate");
  assert.deepEqual([recipe("butter-naan").prepMinutes, recipe("butter-naan").cookMinutes, recipe("butter-naan").totalMinutes],
    [135, 25, 160], "naan timing remains aligned with the source draft");
  assert.deepEqual([recipe("melanzane-parmigiana").prepMinutes, recipe("melanzane-parmigiana").cookMinutes, recipe("melanzane-parmigiana").totalMinutes],
    [40, 60, 100], "parallel sauce and eggplant stages fit the source estimate");
  assert.deepEqual([recipe("patatas-bravas").prepMinutes, recipe("patatas-bravas").cookMinutes, recipe("patatas-bravas").totalMinutes],
    [35, 90, 125], "two fry stages, cooling, and oil recovery fit the published estimate");
  for (const id of ids) assert.equal(recipe(id).totalMinutes, recipe(id).prepMinutes + recipe(id).cookMinutes);

  official(recipe("baingan-bharta"), [handling, temperatures]);
  official(recipe("butter-naan"), [handling, temperatures, rawFlour]);
  official(recipe("melanzane-parmigiana"), [handling, temperatures]);
  official(recipe("patatas-bravas"), [handling, temperatures]);

  const bainganRoast = recipe("baingan-bharta").instructions[1].body;
  allLocales(bainganRoast, {
    en: /skewer slides through the thickest centre without resistance[\s\S]*tenderness target[\s\S]*no separate numeric safe-minimum temperature/,
    "zh-hant": /細竹籤則要能毫無阻力地穿過最厚中心[\s\S]*柔軟度目標[\s\S]*沒有另訂數字型安全最低中心溫度/,
    ja: /細い串が最も厚い中心まで抵抗なく通ればよい状態[\s\S]*柔らかさの目標[\s\S]*数値安全最低温度/,
    ko: /가는 꼬치가 가장 두꺼운 중심을 저항 없이 통과[\s\S]*부드러움 목표[\s\S]*수치 안전 최소 온도/,
    th: /ไม้เสียบแหลมควรแทงผ่านใจกลางส่วนที่หนาที่สุดได้โดยไม่ติดขัด[\s\S]*เป้าหมายความนุ่ม[\s\S]*อุณหภูมิขั้นต่ำเพื่อความปลอดภัยเป็นตัวเลข/
  }, "eggplant tenderness is distinguished from a nonexistent numeric minimum");

  const naanHandling = recipe("butter-naan").instructions[1].body;
  allLocales(naanHandling, {
    en: /Do not taste raw dough[\s\S]*uncooked flour can carry harmful bacteria[\s\S]*Wash hands/,
    "zh-hant": /不要試吃生麵糰[\s\S]*未熟麵粉可能帶有有害細菌[\s\S]*洗手/,
    ja: /生地を味見しません[\s\S]*未加熱の粉には有害な細菌[\s\S]*手、ボウル/,
    ko: /생반죽을 맛보지 마세요[\s\S]*익히지 않은 밀가루에는 해로운 세균[\s\S]*손, 그릇/,
    th: /ห้ามชิมแป้งดิบ[\s\S]*แป้งที่ยังไม่สุกอาจมีแบคทีเรียอันตราย[\s\S]*ล้างมือ/
  }, "raw-flour handling follows FDA guidance in every locale");
  allLocales(recipe("butter-naan").instructions[6].body, {
    en: /no wet, paste-like raw dough[\s\S]*no separate numeric minimum internal temperature/,
    "zh-hant": /不留濕黏糊狀生麵糰[\s\S]*沒有另訂數字型安全最低中心溫度/,
    ja: /湿ったペースト状の生地がなく[\s\S]*数値安全最低温度はありません/,
    ko: /축축하고 풀 같은 생반죽이 남지 않고[\s\S]*수치 안전 최소 중심 온도는 정해져 있지 않습니다/,
    th: /ไม่มีแป้งดิบเปียกเป็นก้อน[\s\S]*ไม่มีอุณหภูมิขั้นต่ำเพื่อความปลอดภัยเป็นตัวเลข/
  }, "naan cooked-through cues are separated from numeric temperature standards");

  const parmigianaBake = recipe("melanzane-parmigiana").instructions[4].body;
  allLocales(parmigianaBake, {
    en: /at least 74°C\/165°F[\s\S]*official safety minimum for meatless casseroles[\s\S]*bubbling cheese[\s\S]*not substitutes for the minimum temperature/,
    "zh-hant": /74°C／165°F[\s\S]*官方對無肉焗烤的安全最低值[\s\S]*起泡起司[\s\S]*不能取代最低溫度/,
    ja: /74°C\/165°F[\s\S]*肉を使わないキャセロールの公式安全最低温度[\s\S]*焼き色[\s\S]*代わりにはなりません/,
    ko: /74°C\/165°F[\s\S]*고기가 없는 캐서롤의 공식 안전 최소 온도[\s\S]*갈변[\s\S]*대신하지 않습니다/,
    th: /74°C\/165°F[\s\S]*อุณหภูมิขั้นต่ำทางการเพื่อความปลอดภัยของแคสเซอโรลที่ไม่มีเนื้อ[\s\S]*สีเกรียม[\s\S]*ไม่ใช่สิ่งทดแทนอุณหภูมิขั้นต่ำ/
  }, "meatless-casserole safety minimum is separate from tenderness and browning");

  const bravasFirstFry = recipe("patatas-bravas").instructions[3].body;
  const bravasFinish = recipe("patatas-bravas").instructions[5].body;
  allLocales(bravasFirstFry, {
    en: /105–115°C[\s\S]*not a safe internal temperature[\s\S]*thin knife easily[\s\S]*2-minute increments/,
    "zh-hant": /105–115°C[\s\S]*不是安全中心溫度[\s\S]*細刀可輕鬆穿過中心[\s\S]*續炸 2 分鐘/,
    ja: /105〜115°C[\s\S]*安全上の中心温度ではありません[\s\S]*ナイフが楽に通る[\s\S]*2分ずつ追加/,
    ko: /105–115°C[\s\S]*안전 중심 온도가 아닙니다[\s\S]*칼이 중심까지 쉽게[\s\S]*2분씩 더/,
    th: /105–115°C[\s\S]*ไม่ใช่อุณหภูมิภายในเพื่อความปลอดภัย[\s\S]*มีดบางแทงกลางได้ง่าย[\s\S]*ครั้งละ 2 นาที/
  }, "first-fry range is a texture target with a centre-tenderness recovery check");
  allLocales(bravasFinish, {
    en: /175°C[\s\S]*not a food-safety minimum[\s\S]*lower the oil to about 165°C[\s\S]*2 minutes more/,
    "zh-hant": /175°C[\s\S]*不是食安最低溫度[\s\S]*降至約 165°C 再炸 2 分鐘/,
    ja: /175°C[\s\S]*安全最低温度ではありません[\s\S]*約165°Cに下げて2分追加/,
    ko: /175°C[\s\S]*식품 안전 최소 온도가 아닙니다[\s\S]*약 165°C로 낮춰 2분 더/,
    th: /175°C[\s\S]*ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัย[\s\S]*ลดน้ำมันเหลือประมาณ 165°C ทอดเพิ่ม 2 นาที/
  }, "second-fry rescue lowers oil rather than darkening the exterior further");
});

test("draft-audit commands and recipe source groups remain separate counts", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageJson.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  assert.equal(auditCommands.length, 20, "package.json has 20 draft-audit commands");

  const source = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = source.match(/export const allRecipeDrafts = \[([^\n]+)\];/)?.[1];
  assert.ok(groups, "the registry of recipe source groups exists");
  assert.equal([...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length, 21,
    "the recipe registry has 21 source groups, distinct from the npm command count");
});
