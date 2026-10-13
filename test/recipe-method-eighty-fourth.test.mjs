import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { localeOrder } from "../src/data.mjs";

const ids = ["zaalouk", "imam-bayildi", "halloumi-saganaki"];
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

function parseIds(source, declaration) {
  const body = source.match(declaration)?.[1];
  assert.ok(body, "coverage declaration exists");
  return [...body.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
}

function official(dish, urls) {
  for (const url of urls) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: ${url} is separately attributed as official food-safety guidance`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: the culinary references remain separate`);
}

const eggplantSteamPatterns = {
  en: /knife[\s\S]*centre[\s\S]*easily[\s\S]*spongy[\s\S]*2–3 minutes more/,
  "zh-hant": /薄刀[\s\S]*輕鬆刺到中心[\s\S]*海綿般硬芯[\s\S]*再蒸 2–3 分鐘/,
  ja: /ナイフ[\s\S]*中心[\s\S]*抵抗なく[\s\S]*スポンジ状[\s\S]*2〜3分/,
  ko: /칼[\s\S]*중심[\s\S]*쉽게[\s\S]*스펀지처럼 질긴 속[\s\S]*2–3분/,
  th: /มีดบาง[\s\S]*กลาง[\s\S]*ง่าย[\s\S]*พรุนแข็ง[\s\S]*2–3 นาที/
};

const imamDonenessPatterns = {
  en: /thickest eggplant[\s\S]*knife[\s\S]*little resistance[\s\S]*silky and very tender[\s\S]*5–8 minutes more/,
  "zh-hant": /薄刀[\s\S]*最厚的茄子[\s\S]*幾乎不費力[\s\S]*滑嫩極軟[\s\S]*5–8 分鐘後重測/,
  ja: /最も厚いなす[\s\S]*ナイフ[\s\S]*抵抗なく[\s\S]*とろりと非常に柔らかく[\s\S]*5〜8分追加/,
  ko: /가장 두꺼운 가지[\s\S]*얇은 칼[\s\S]*거의 저항 없이[\s\S]*매우 부드럽고 촉촉[\s\S]*5–8분 더/,
  th: /มีดบาง[\s\S]*ส่วนที่หนาที่สุด[\s\S]*แทบไม่มีแรงต้าน[\s\S]*นุ่มละมุนมาก[\s\S]*5–8 นาที/
};

const halloumiPatterns = {
  en: /2–3 minutes per side[\s\S]*deep golden[\s\S]*warm and springy[\s\S]*lower the heat[\s\S]*30–60 second increments/,
  "zh-hant": /每面 2–3 分鐘[\s\S]*深金黃[\s\S]*溫熱有彈性[\s\S]*轉小火[\s\S]*30–60 秒/,
  ja: /片面2〜3分[\s\S]*濃いきつね色[\s\S]*温かく弾力[\s\S]*火を弱め[\s\S]*30〜60秒/,
  ko: /한 면당 2–3분[\s\S]*진한 황금빛[\s\S]*따뜻하고 탄력[\s\S]*불을 낮추고[\s\S]*30–60초/,
  th: /ด้านละ 2–3 นาที[\s\S]*สีทองเข้ม[\s\S]*อุ่นเด้ง[\s\S]*ลดไฟ[\s\S]*30–60 วินาที/
};

const zaaloukConsistencyPatterns = {
  en: /not a food-safety temperature/,
  "zh-hant": /不是食安溫度/,
  ja: /食品安全温度ではありません/,
  ko: /식품 안전 온도가 아닙니다/,
  th: /ไม่ใช่อุณหภูมิเพื่อความปลอดภัย/
};

test("eighty-fourth batch improves the final three eligible methods and preserves source facts", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const covered = parseIds(ledgerSource, /const auditedIds = \[([\s\S]*?)\n\];/);
  const beforeThisBatch = covered.slice(0, -3);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const excluded = parseIds(exclusionsSource, /const excludedIds = \[([\s\S]*?)\n\];/);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 332);
  assert.equal(new Set(beforeThisBatch).size, 332);
  assert.equal(covered.length, 335);
  assert.equal(new Set(covered).size, 335);
  assert.deepEqual(covered.slice(-3), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id) && !excluded.includes(id)),
    "all three selected slugs were uncovered and eligible");
  assert.equal(recipes.length - excluded.length - covered.length, 0,
    "335 completed methods plus 18 separate exclusions account for the 353-recipe registry");

  for (const id of ids) {
    const dish = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: original source draft remains present`);
    assert.notDeepEqual(dish.instructions, draft.instructions, `${id}: published five-language method is refined`);
    assert.notDeepEqual(dish.sources, draft.sources, `${id}: official handling guidance is separately added`);
    assert.deepEqual(dish.ingredients, draft.ingredients, `${id}: ingredient rows and amounts are unchanged`);
    assert.equal(dish.servings, draft.servings, `${id}: servings are unchanged`);
    assert.equal(dish.instructions.length, draft.instructions.length, `${id}: natural step count is unchanged`);
    assert.deepEqual(dish.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: illustration stages stay aligned`);
    assert.equal(dish.totalMinutes, dish.prepMinutes + dish.cookMinutes, `${id}: total time adds up`);
    for (const locale of localeOrder) {
      assert.ok(dish.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: all steps are localized`);
      assert.ok(dish.tips.every((tip) => tip[locale]) && dish.commonMistakes.every((mistake) => mistake[locale]),
        `${id}/${locale}: tips and recovery guidance are localized`);
      assert.ok(dish.storage[locale], `${id}/${locale}: storage guidance is localized`);
      assert.match(dish.storage[locale], /74°C/,
        `${id}/${locale}: the official reheating minimum is stated`);
      assert.doesNotMatch(dish.instructions.map((step) => step.body[locale]).join(" "), /74°C|165°F/,
        `${id}/${locale}: no reheating minimum is misapplied as fresh-dish doneness`);
    }
  }

  assert.deepEqual([recipe("zaalouk").prepMinutes, recipe("zaalouk").cookMinutes, recipe("zaalouk").totalMinutes],
    [15, 35, 50], "zaalouk's estimate covers steaming, simultaneous tomato reduction, and final thickening");
  assert.deepEqual([recipe("imam-bayildi").prepMinutes, recipe("imam-bayildi").cookMinutes, recipe("imam-bayildi").totalMinutes],
    [25, 80, 105], "imam bayildi's estimate covers the staged filling, braise, and covered rest");
  assert.deepEqual([recipe("halloumi-saganaki").prepMinutes, recipe("halloumi-saganaki").cookMinutes, recipe("halloumi-saganaki").totalMinutes],
    [10, 15, 25], "halloumi's estimate allows pan preheating and frying in batches");

  official(recipe("zaalouk"), [handling, temperatures]);
  official(recipe("imam-bayildi"), [handling, temperatures]);
  official(recipe("halloumi-saganaki"), [handling, temperatures, rawFlour]);

  for (const locale of localeOrder) {
    assert.match(recipe("zaalouk").instructions[0].body[locale], eggplantSteamPatterns[locale], `${locale}: zaalouk tenderness and rescue`);
    assert.match(recipe("imam-bayildi").instructions[4].body[locale], imamDonenessPatterns[locale], `${locale}: imam bayildi tenderness and rescue`);
    assert.match(recipe("halloumi-saganaki").instructions[3].body[locale], halloumiPatterns[locale], `${locale}: halloumi browning, spring, and rescue`);
    assert.match(recipe("zaalouk").instructions[3].body[locale], zaaloukConsistencyPatterns[locale],
      `${locale}: zaalouk consistency is distinguished from a safety endpoint`);
  }

  const flour = recipe("halloumi-saganaki").instructions[1].body;
  for (const locale of localeOrder) {
    const rawFlourPatterns = {
      en: /Do not taste the dry flour/,
      "zh-hant": /不要試吃乾麵粉/,
      ja: /乾いた小麦粉.*味見しません/,
      ko: /마른 밀가루.*맛보지/,
      th: /อย่าชิมแป้งแห้ง/
    };
    assert.match(flour[locale], rawFlourPatterns[locale],
      `${locale}: raw flour is not tasted`);
  }
});

test("the exact coverage snapshot deduplicates 335 reviewed slugs and keeps 18 exclusions separate", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const reviewed = parseIds(ledgerSource, /const auditedIds = \[([\s\S]*?)\n\];/);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const excluded = parseIds(exclusionsSource, /const excludedIds = \[([\s\S]*?)\n\];/);
  const snapshot = JSON.parse(await readFile(new URL("../docs/research/recipe-method-coverage-20261013.json", import.meta.url), "utf8"));
  const reviewedSorted = [...reviewed].sort();
  const excludedSorted = [...excluded].sort();

  assert.equal(reviewed.length, 335);
  assert.equal(new Set(reviewed).size, 335, "each reviewed slug appears once");
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18, "each excluded slug appears once");
  assert.ok(excluded.every((id) => !reviewed.includes(id)), "exclusions are never counted as completed reviews");
  assert.equal(new Set([...reviewed, ...excluded]).size, 353, "reviewed and excluded sets are disjoint and complete");
  assert.deepEqual([...reviewedSorted, ...excludedSorted].sort(), recipes.map((entry) => entry.id).sort(),
    "every registry slug appears exactly once in either reviewed or excluded coverage");
  assert.deepEqual(snapshot.reviewedIds, reviewedSorted);
  assert.deepEqual(snapshot.excludedIds, excludedSorted);
  assert.deepEqual(snapshot.counts, { registry: 353, reviewed: 335, excluded: 18, unclassified: 0 });

  const packageData = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageData.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  const registrySource = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = registrySource.match(/export const allRecipeDrafts = \[([\s\S]*?)\];/)?.[1];
  assert.ok(groups, "recipe source-group registry exists");
  const sourceGroupCount = [...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length;
  assert.equal(auditCommands.length, 20, "package.json has 20 draft-audit commands");
  assert.equal(sourceGroupCount, 21, "recipes.mjs assembles 21 source groups, a separate count");
  assert.deepEqual(snapshot.counts, { registry: recipes.length, reviewed: reviewed.length, excluded: excluded.length, unclassified: 0 });
  assert.equal(snapshot.draftAuditCommandCount, 20);
  assert.equal(snapshot.recipeSourceGroupCount, 21);
});
