import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["cantucci", "fattoush", "french-crepes", "ribollita"];
const urls = {
  flour: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know",
  egg: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  produce: "https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function recipe(id) {
  const found = byId.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function official(dish, wanted) {
  for (const url of wanted) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: applicable official guidance is credited: ${url}`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: two culinary references remain separate from official guidance`);
}

function allLocales(localized, patterns, label) {
  for (const locale of localeOrder) {
    const pattern = patterns[locale];
    const flags = pattern.flags.includes("i") ? pattern.flags : `${pattern.flags}i`;
    assert.match(localized[locale], new RegExp(pattern.source, flags), `${locale}: ${label}`);
  }
}

test("seventy-eighth batch adds four genuinely unfinished eligible recipes to exact five-locale coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -27);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 308);
  assert.equal(new Set(beforeThisBatch).size, 308);
  assert.equal(covered.length, 335);
  assert.equal(new Set(covered).size, 335);
  assert.deepEqual(covered.slice(-27, -23), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four slugs were absent from the starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 27);
  assert.equal(recipes.length - excluded.length - covered.length, 0);
});

test("npm draft-audit commands and recipe source groups remain separate counts", async () => {
  const packageData = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageData.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  assert.equal(auditCommands.length, 20, "npm wires 20 draft-audit commands");
  const registrySource = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = registrySource.match(/export const allRecipeDrafts = \[([\s\S]*?)\];/)?.[1];
  assert.ok(groups, "recipe source-group registry exists");
  assert.equal([...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length, 21, "the registry contains 21 recipe source groups");
});

test("publication revisions preserve all four source drafts, measured ingredients, step counts, and illustration scenes", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: original source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: published method was improved`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: relevant official safety sources were added`);
    assert.deepEqual(published.ingredients, draft.ingredients, `${id}: ingredient rows and amounts stay unchanged`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(published.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: reviewed illustration mapping is preserved`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: stated times add up`);
    for (const locale of localeOrder) {
      assert.ok(published.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: all steps are translated`);
      assert.ok(draft.instructions.every((step) => step.body[locale]), `${id}/${locale}: source-language draft remains complete`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage advice is translated`);
    }
  }
});

test("cantucci separates egg safety from first-bake texture and second-bake crispness", () => {
  const dish = recipe("cantucci");
  allLocales(dish.instructions[1].body, {
    en: /Do not taste[\s\S]*raw egg-and-flour dough[\s\S]*ready-to-eat food[\s\S]*wash hands/,
    "zh-hant": /不要試吃[\s\S]*生蛋和生麵粉[\s\S]*即食食物[\s\S]*清洗雙手/,
    ja: /生卵と小麦粉[\s\S]*味見しません[\s\S]*すぐ食べる食品[\s\S]*手、ボウル/,
    ko: /날달걀과 생밀가루[\s\S]*맛보지 마세요[\s\S]*바로 먹는 음식[\s\S]*손, 볼/,
    th: /อย่าชิมแป้งดิบ[\s\S]*ไข่และแป้งสาลี[\s\S]*อาหารพร้อมกิน[\s\S]*ล้างมือ/
  }, "raw dough is not tasted and cleanup is explicit");
  allLocales(dish.instructions[3].body, {
    en: /pale gold[\s\S]*lightly spring back[\s\S]*not look wet or glossy[\s\S]*separate egg-safety check[\s\S]*71°C \(160°F\)[\s\S]*2 minutes more[\s\S]*lower the oven to 160°C[\s\S]*not this safety check/,
    "zh-hant": /淡金黃[\s\S]*微微回彈[\s\S]*濕亮[\s\S]*食安檢查[\s\S]*71°C（160°F）[\s\S]*續烤 2 分鐘[\s\S]*降至 160°C[\s\S]*不是酥脆度判斷/,
    ja: /淡いきつね色[\s\S]*戻る[\s\S]*濡れて光ってはいけません[\s\S]*安全確認[\s\S]*71°C（160°F）[\s\S]*2分ずつ[\s\S]*160°C[\s\S]*カリカリ感の目安ではなく/,
    ko: /연한 금빛[\s\S]*되돌아오게[\s\S]*젖거나 윤기 나면 안 됩니다[\s\S]*안전은 별도로[\s\S]*71°C \(160°F\)[\s\S]*2분 더[\s\S]*160°C[\s\S]*바삭함 기준이 아니며/,
    th: /สีทองอ่อน[\s\S]*เด้งกลับ[\s\S]*ไม่เปียกหรือเงา[\s\S]*ความปลอดภัยของไข่แยกต่างหาก[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 2 นาที[\s\S]*160°C[\s\S]*ไม่ใช่ตัววัดความกรอบ/
  }, "cake-like log doneness, egg safety, and second-bake quality remain separate");
  allLocales(dish.instructions[5].body, {
    en: /dry and the slices are crisp[\s\S]*Cool one test slice completely[\s\S]*3-minute increments[\s\S]*lower to 140°C/,
    "zh-hant": /切面乾燥、邊緣酥脆[\s\S]*完全放涼[\s\S]*續烤 3 分鐘[\s\S]*降至 140°C/,
    ja: /断面が乾いて縁がカリッと[\s\S]*完全に冷ました[\s\S]*3分ずつ[\s\S]*140°C/,
    ko: /단면이 마르고 가장자리가 바삭[\s\S]*완전히 식혀[\s\S]*3분씩[\s\S]*140°C/,
    th: /ผิวตัดแห้งและขอบกรอบ[\s\S]*เย็นสนิท[\s\S]*ครั้งละ 3 นาที[\s\S]*140°C/
  }, "crispness is checked after cooling with a measured recovery path");
  official(dish, [urls.flour, urls.egg, urls.temperatures]);
});

test("fattoush protects raw produce, keeps pita crisp, and has no invented cooking endpoint", () => {
  const dish = recipe("fattoush");
  allLocales(dish.instructions[1].body, {
    en: /under clean running water before cutting[\s\S]*not use soap or bleach[\s\S]*clean board and knife[\s\S]*dry the lettuce and herbs[\s\S]*drain them before dressing/,
    "zh-hant": /流動水下沖洗再切[\s\S]*不可用肥皂或漂白水[\s\S]*乾淨砧板與刀[\s\S]*徹底擦乾[\s\S]*先瀝掉再拌醬/,
    ja: /切る前に清潔な流水[\s\S]*石けんや漂白剤は使いません[\s\S]*清潔なまな板と包丁[\s\S]*よく乾かします[\s\S]*水を切って/,
    ko: /자르기 전에 깨끗한 흐르는 물[\s\S]*비누나 표백제는 쓰지 않습니다[\s\S]*깨끗한 도마와 칼[\s\S]*완전히 말립니다[\s\S]*따라내/,
    th: /ก่อนหั่น[\s\S]*ห้ามใช้สบู่หรือน้ำยาฟอกขาว[\s\S]*เขียงและมีดสะอาด[\s\S]*ซับผักกาดกับสมุนไพรให้แห้ง[\s\S]*เทออกก่อนปรุง/
  }, "raw vegetables are washed, separated, and dried before cutting");
  allLocales(dish.instructions[4].body, {
    en: /just before serving[\s\S]*4°C \(40°F\) or colder[\s\S]*2 hours out of refrigeration[\s\S]*1 hour above 32°C \(90°F\)[\s\S]*no cooking-temperature endpoint/,
    "zh-hant": /上桌前才加入[\s\S]*4°C（40°F）或以下[\s\S]*超過 2 小時[\s\S]*高於 32°C（90°F）超過 1 小時[\s\S]*沒有烹調溫度終點/,
    ja: /食べる直前に[\s\S]*4°C（40°F）以下[\s\S]*冷蔵外に2時間[\s\S]*32°C（90°F）を超える環境で1時間[\s\S]*加熱温度の基準はありません/,
    ko: /내기 직전에[\s\S]*4°C \(40°F\) 이하[\s\S]*냉장 밖에 2시간[\s\S]*32°C \(90°F\)보다 높은 환경에서는 1시간[\s\S]*조리 온도 기준이 없습니다/,
    th: /ก่อนเสิร์ฟ[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*เกิน 2 ชั่วโมง[\s\S]*เกิน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C \(90°F\)[\s\S]*ไม่มีอุณหภูมิสำหรับการปรุงให้สุก/
  }, "cold holding is not confused with a cooking endpoint");
  allLocales(dish.commonMistakes[0], {
    en: /contains no bulgur[\s\S]*drain pooled vegetable liquid/,
    "zh-hant": /不含 bulgur[\s\S]*瀝掉蔬菜積水/,
    ja: /ブルグルは入りません[\s\S]*水分を切り/,
    ko: /불구르를 넣지 않습니다[\s\S]*고인 물을 따라내/,
    th: /ไม่มีบัลเกอร์[\s\S]*เทน้ำผักที่ขัง/
  }, "Fattoush-specific watery-salad advice replaces the copied Tabbouleh note");
  assert.doesNotMatch(dish.commonMistakes[0].en, /Using too much bulgur overwhelms tabbouleh/i,
    "the copied Tabbouleh mistake is removed");
  for (const locale of localeOrder) {
    assert.doesNotMatch(dish.storage[locale], /Freeze airtight for longer storage|thaw in the refrigerator|久放請密封冷凍|長期保存は密閉冷凍|冷蔵庫で解凍|밀폐 냉동하고 냉장고에서 해동|แช่แข็งแบบปิดสนิทแล้วละลายในตู้เย็น/i,
      `${locale}: the generic freeze-and-thaw instruction is removed`);
  }
  official(dish, [urls.produce, urls.handling]);
});

test("French crêpes give raw-batter controls, thin-sheet cues, and recovery steps", () => {
  const dish = recipe("french-crepes");
  allLocales(dish.instructions[0].body, {
    en: /Do not taste raw batter[\s\S]*uncooked flour and eggs[\s\S]*ready-to-eat food[\s\S]*wash hands/,
    "zh-hant": /不要試吃生麵糊[\s\S]*生麵粉和雞蛋[\s\S]*即食食物[\s\S]*清洗雙手/,
    ja: /生の小麦粉と卵[\s\S]*生地を味見しません[\s\S]*すぐ食べる食品[\s\S]*手/,
    ko: /익히지 않은 밀가루와 달걀[\s\S]*생반죽을 맛보지 마세요[\s\S]*바로 먹는 음식[\s\S]*손/,
    th: /อย่าชิมแป้งดิบ[\s\S]*แป้งสาลีและไข่[\s\S]*อาหารพร้อมกิน[\s\S]*ล้างมือ/
  }, "raw flour and eggs are not tasted and are cleaned up safely");
  allLocales(dish.instructions[1].body, {
    en: /reserving the last 30 ml[\s\S]*refrigerate for 30 minutes[\s\S]*15 ml at a time[\s\S]*4°C \(40°F\) or colder/,
    "zh-hant": /保留最後 30 毫升[\s\S]*冷藏 30 分鐘[\s\S]*每次加入 15 毫升[\s\S]*4°C（40°F）或以下/,
    ja: /最後の30mlは取っておきます[\s\S]*30分冷蔵[\s\S]*15mlずつ[\s\S]*4°C（40°F）以下/,
    ko: /마지막 30ml는 남깁니다[\s\S]*30분 냉장[\s\S]*15ml씩[\s\S]*4°C \(40°F\) 이하/,
    th: /เก็บ 30 มล.สุดท้ายไว้[\s\S]*แช่เย็น 30 นาที[\s\S]*ครั้งละ 15 มล.[\s\S]*4°C \(40°F\) หรือต่ำกว่า/
  }, "measured milk is reserved for a thin pourable batter and cold holding");
  allLocales(dish.instructions[4].body, {
    en: /lightly golden[\s\S]*set through the centre[\s\S]*no wet batter[\s\S]*cook 10 seconds more[\s\S]*lower the heat/,
    "zh-hant": /淡金黃[\s\S]*中心定型[\s\S]*沒有濕麵糊[\s\S]*再煎 10 秒[\s\S]*轉小火/,
    ja: /薄く色づいて中心まで固まり[\s\S]*生地が濡れて残らない[\s\S]*10秒追加[\s\S]*火を弱め/,
    ko: /옅은 금빛[\s\S]*가운데까지 익어[\s\S]*젖은 반죽이 없게[\s\S]*10초 더[\s\S]*불을 낮춥니다/,
    th: /สีทองอ่อน[\s\S]*ตรงกลางเซ็ตตัว[\s\S]*ไม่มีแป้งเปียก[\s\S]*เพิ่ม 10 วินาที[\s\S]*ลดไฟ/
  }, "thin crêpe texture is judged by set batter rather than an unrelated temperature");
  official(dish, [urls.flour, urls.egg, urls.handling, urls.temperatures]);
});

test("ribollita replaces copied meat errors and limits precise safety temperatures to leftovers", () => {
  const dish = recipe("ribollita");
  allLocales(dish.instructions[4].body, {
    en: /mound softly on a spoon[\s\S]*If it is loose, simmer uncovered 5 minutes[\s\S]*if it is stiff, add 60 ml[\s\S]*no meat or cured meat/,
    "zh-hant": /柔軟堆在湯匙上[\s\S]*太稀[\s\S]*揭蓋再煮 5 分鐘[\s\S]*太稠[\s\S]*不含肉類或醃肉/,
    ja: /スプーンにふんわり盛れる[\s\S]*ゆるければ蓋をせず5分[\s\S]*固ければ[\s\S]*肉や塩漬け肉は入りません/,
    ko: /숟가락 위에 부드럽게 얹히되[\s\S]*묽으면[\s\S]*5분[\s\S]*너무 되면[\s\S]*고기나 염장육이 들어가지 않습니다/,
    th: /กองนุ่มบนช้อนได้[\s\S]*เหลวให้ต้มเปิดฝาเพิ่ม 5 นาที[\s\S]*แข็งข้น[\s\S]*ไม่มีเนื้อหรือเนื้อหมัก/
  }, "fresh soup gets recipe-specific texture recovery, not a meat temperature");
  allLocales(dish.storage, {
    en: /shallow containers[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C\/90°F[\s\S]*4°C \(40°F\) or colder[\s\S]*74°C \(165°F\) throughout[\s\S]*leftover reheating target/,
    "zh-hant": /淺容器[\s\S]*2 小時內冷藏[\s\S]*高於 32°C／90°F 時 1 小時內[\s\S]*4°C（40°F）或以下[\s\S]*74°C（165°F）[\s\S]*剩食回熱目標/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*32°C／90°Fを超える場合は1時間以内[\s\S]*4°C（40°F）以下[\s\S]*74°C（165°F）[\s\S]*残りの再加熱目標/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*32°C\/90°F보다 높으면 1시간 안에[\s\S]*4°C \(40°F\) 이하[\s\S]*74°C \(165°F\)[\s\S]*남은 음식 재가열 목표/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C\/90°F[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*74°C \(165°F\)[\s\S]*เป้าหมายการอุ่นของเหลือ/
  }, "the 74°C endpoint applies to reheating leftovers only");
  assert.doesNotMatch(dish.commonMistakes[0].en, /pale meat/i, "the copied pale-meat advice is removed");
  assert.doesNotMatch(dish.commonMistakes[1].en, /stock, cured meat and cheese can concentrate/i,
    "the copied meat-and-cheese salt warning is removed");
  allLocales(dish.commonMistakes[1], {
    en: /Salted or cured meat and cheese are not ingredients/i,
    "zh-hant": /沒有醃肉、肉類或起司/,
    ja: /塩漬け肉、肉、チーズは入りません/,
    ko: /염장육, 고기, 치즈가 들어가지 않습니다/,
    th: /ไม่มีเนื้อหมัก เนื้อ หรือชีส/
  }, "mistake guidance now matches this vegetarian soup");
  official(dish, [urls.handling, urls.temperatures]);
});
