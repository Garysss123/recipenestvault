import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["financiers", "saskatoon-berry-pie", "horiatiki", "kaesespaetzle"];
const urls = {
  flour: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know",
  egg: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  produce: "https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables"
};
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const drafts = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));

function recipe(id) {
  const found = byId.get(id);
  assert.ok(found, `${id}: published recipe exists`);
  return found;
}

function step(dish, title) {
  const found = dish.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${dish.id}: ${title} step exists`);
  return found;
}

function allLocales(localized, patterns, label) {
  for (const locale of localeOrder) {
    const pattern = patterns[locale];
    const flags = pattern.flags.includes("i") ? pattern.flags : `${pattern.flags}i`;
    assert.match(localized[locale], new RegExp(pattern.source, flags), `${locale}: ${label}`);
  }
}

function official(dish, wanted) {
  for (const url of wanted) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: applicable official guidance is credited: ${url}`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: two culinary references remain separate from official guidance`);
}

test("seventy-seventh batch adds four genuinely incomplete eligible slugs to five-locale coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -12);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 304);
  assert.equal(new Set(beforeThisBatch).size, 304);
  assert.equal(covered.length, 316);
  assert.equal(new Set(covered).size, 316);
  assert.deepEqual(covered.slice(-12, -8), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 31);
  assert.equal(recipes.length - excluded.length - covered.length, 19);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the exact 304-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("npm draft-audit commands and recipe source groups are counted separately", async () => {
  const packageData = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageData.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  assert.equal(auditCommands.length, 20, "npm wires 20 draft-audit commands");
  const registrySource = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = registrySource.match(/export const allRecipeDrafts = \[([\s\S]*?)\];/)?.[1];
  assert.ok(groups, "recipe source-group registry exists");
  assert.equal([...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length, 21, "the registry contains 21 recipe source groups");
});

test("the revisions preserve source drafts, ingredient facts, natural steps, timing, and illustrations", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: the published method was improved`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official safety guidance was added`);
    assert.deepEqual(published.ingredients, draft.ingredients, `${id}: ingredient rows and amounts are unchanged`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: the natural step count is preserved`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: illustration scenes are unchanged`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    for (const locale of localeOrder) {
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: full method is localized`);
      assert.ok(draft.instructions.every((entry) => entry.body[locale]), `${id}/${locale}: source draft remains intact`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage guidance exists`);
    }
  }
  assert.notDeepEqual(recipe("kaesespaetzle").commonMistakes, drafts.get("kaesespaetzle").commonMistakes,
    "the unrelated filled-pasta mistake is replaced without mutating the source draft");
});

test("financiers separate tender cake texture from egg safety and recover from underbaking", () => {
  const dish = recipe("financiers");
  allLocales(step(dish, "Make the batter").body, {
    en: /pasteurized egg whites[\s\S]*Do not taste[\s\S]*raw flour safe[\s\S]*wash hands/,
    "zh-hant": /巴氏殺菌蛋白[\s\S]*不要試吃[\s\S]*生麵粉變安全[\s\S]*清洗雙手/,
    ja: /低温殺菌済み卵白[\s\S]*生の小麦粉は安全にならない[\s\S]*生地を味見しません[\s\S]*手、ボウル/,
    ko: /살균 난백[\s\S]*생밀가루가 안전해지는 것은 아니므로[\s\S]*반죽을 맛보지 마세요[\s\S]*손, 볼/,
    th: /ไข่ขาวพาสเจอไรซ์[\s\S]*อย่าชิมแป้งดิบ[\s\S]*แป้งสาลีดิบปลอดภัย[\s\S]*ล้างมือ/
  }, "raw flour is not made safe by pasteurized egg whites");
  allLocales(step(dish, "Bake until golden").body, {
    en: /deep golden[\s\S]*spring back lightly[\s\S]*moist crumbs[\s\S]*no glossy batter[\s\S]*separate food-safety check[\s\S]*71°C \(160°F\)[\s\S]*2 minutes[\s\S]*180°C[\s\S]*centres stay moist rather than dry/,
    "zh-hant": /深金黃[\s\S]*微微回彈[\s\S]*濕潤碎屑[\s\S]*發亮的生麵糊[\s\S]*另作食安檢查[\s\S]*71°C（160°F）[\s\S]*續烤 2 分鐘[\s\S]*180°C[\s\S]*避免把中心烤乾/,
    ja: /濃いきつね色[\s\S]*少し戻る[\s\S]*湿った細かな屑[\s\S]*光沢のある生地[\s\S]*食の安全は別に確認[\s\S]*71°C（160°F）[\s\S]*2分ずつ[\s\S]*180°C[\s\S]*中心を乾かしません/,
    ko: /짙은 금빛[\s\S]*살짝 되돌아와야[\s\S]*촉촉한 부스러기[\s\S]*윤기 나는 생반죽[\s\S]*식품 안전은 별도로 확인[\s\S]*71°C \(160°F\)[\s\S]*2분씩[\s\S]*180°C[\s\S]*가운데가 마르지 않게/,
    th: /สีทองเข้ม[\s\S]*เด้งกลับเล็กน้อย[\s\S]*เศษขนมชุ่มชื้น[\s\S]*แป้งดิบเงา ๆ[\s\S]*การตรวจความปลอดภัยเป็นอีกขั้นหนึ่ง[\s\S]*71°C \(160°F\)[\s\S]*ครั้งละ 2 นาที[\s\S]*180°C[\s\S]*ตรงกลางแห้ง/
  }, "visual and crumb cues define quality while 71°C remains a separate egg-safety check");
  allLocales(dish.storage, {
    en: /within 2 hours[\s\S]*within 1 hour when the room is above 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*3–4 days/,
    "zh-hant": /2 小時內[\s\S]*32°C（90°F）時 1 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天/,
    ja: /2時間以内[\s\S]*32°C／90°Fを超える場合は1時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日/,
    ko: /2시간 안에[\s\S]*32°C \(90°F\)보다 높으면 1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออุณหภูมิห้องสูงกว่า 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน/
  }, "egg-containing cakes are chilled on time");
  official(dish, [urls.flour, urls.egg, urls.temperatures, urls.handling, urls.storage]);
});

test("Saskatoon pie handles flour, berries, and egg wash and corrects a pale or slow-setting pie", () => {
  const dish = recipe("saskatoon-berry-pie");
  assert.deepEqual([dish.prepMinutes, dish.cookMinutes, dish.totalMinutes], [45, 185, 230],
    "the published total includes the 90-minute setting cool after the 95-minute baking estimate");
  allLocales(step(dish, "Make the pastry dough").body, {
    en: /Do not taste raw pastry dough[\s\S]*Flour is uncooked[\s\S]*ready-to-eat food[\s\S]*wash hands/,
    "zh-hant": /不要試吃生派皮[\s\S]*麵粉尚未烹熟[\s\S]*即食食物分開[\s\S]*清洗雙手/,
    ja: /生のパイ生地を味見しません[\s\S]*未加熱の小麦粉[\s\S]*すぐ食べる食品から離し[\s\S]*手、器具/,
    ko: /생 파이지를 맛보지 마세요[\s\S]*익지 않은 밀가루[\s\S]*바로 먹는 음식과 분리[\s\S]*손, 도구/,
    th: /อย่าชิมแป้งพายดิบ[\s\S]*แป้งสาลียังไม่สุก[\s\S]*แยกจากอาหารพร้อมกิน[\s\S]*ล้างมือ/
  }, "raw pastry is not tasted and flour cleanup is explicit");
  allLocales(step(dish, "Mix the berry filling").body, {
    en: /fresh berries, rinse them under running water[\s\S]*do not use soap[\s\S]*frozen berries, keep them frozen/,
    "zh-hant": /新鮮莓果[\s\S]*流動清水下沖洗[\s\S]*不要使用肥皂[\s\S]*冷凍莓果[\s\S]*保持冷凍/,
    ja: /生のベリー[\s\S]*流水で洗って[\s\S]*石けん[\s\S]*冷凍ベリー[\s\S]*凍ったまま/,
    ko: /생베리[\s\S]*흐르는 물에 씻고[\s\S]*비누[\s\S]*냉동 베리[\s\S]*얼린 상태/,
    th: /เบอร์รีสด[\s\S]*ล้างใต้ก๊อกน้ำไหล[\s\S]*สบู่[\s\S]*เบอร์รีแช่แข็ง[\s\S]*คงความแข็ง/
  }, "fresh and frozen fruit get method-specific handling");
  allLocales(step(dish, "Bake until the centre bubbles").body, {
    en: /190°C for 80 minutes[\s\S]*centre vent[\s\S]*thick filling bubbles[\s\S]*rim darkens[\s\S]*foil[\s\S]*180°C[\s\S]*10-minute increments[\s\S]*80–95-minute range is an estimate[\s\S]*upper third[\s\S]*3–5 minutes/,
    "zh-hant": /190°C 烤 80 分鐘[\s\S]*中央排氣口[\s\S]*濃稠氣泡[\s\S]*邊緣[\s\S]*鋁箔[\s\S]*180°C[\s\S]*10 分鐘[\s\S]*80–95 分鐘只是估計[\s\S]*烤箱上層[\s\S]*3–5 分鐘/,
    ja: /190°C、まず80分[\s\S]*中央の蒸気穴[\s\S]*とろみのあるフィリング[\s\S]*縁が濃く[\s\S]*ホイル[\s\S]*180°C[\s\S]*10分ずつ[\s\S]*80〜95分は目安[\s\S]*上段[\s\S]*3〜5分/,
    ko: /190°C로 80분[\s\S]*가운데 증기 구멍[\s\S]*걸쭉한 속[\s\S]*가장자리가 짙어지면[\s\S]*포일[\s\S]*180°C[\s\S]*10분씩[\s\S]*80–95분은 예상 시간[\s\S]*위쪽 선반[\s\S]*3–5분/,
    th: /190°C ให้ครบ 80 นาที[\s\S]*ช่องกลาง[\s\S]*ไส้ข้น[\s\S]*ขอบเข้ม[\s\S]*ฟอยล์[\s\S]*180°C[\s\S]*ครั้งละ 10 นาที[\s\S]*80–95 นาทีเป็นเพียงเวลาโดยประมาณ[\s\S]*ชั้นบน[\s\S]*3–5 นาที/
  }, "fruit-pie doneness uses centre bubbling and colour recovery rather than a meat or egg endpoint");
  for (const locale of localeOrder) assert.doesNotMatch(step(dish, "Bake until the centre bubbles").body[locale], /71°C|74°C|160°F|165°F/,
    `${locale}: no minimum egg or meat temperature is used as the pie's texture cue`);
  allLocales(dish.storage, {
    en: /within 2 hours[\s\S]*within 1 hour when the room is above 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*within 3 days/,
    "zh-hant": /2 小時內[\s\S]*32°C（90°F）時 1 小時內[\s\S]*4°C（40°F）[\s\S]*3 天內/,
    ja: /2時間以内[\s\S]*32°C／90°Fを超える場合は1時間以内[\s\S]*4°C（40°F）[\s\S]*3日以内/,
    ko: /2시간 안에[\s\S]*32°C \(90°F\)보다 높으면 1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3일 안에/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออุณหภูมิห้องสูงกว่า 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*ภายใน 3 วัน/
  }, "the baked pie is chilled within the holding window");
  official(dish, [urls.flour, urls.egg, urls.produce, urls.handling, urls.storage]);
});

test("Horiatiki cleans raw produce, keeps feta cold, and has no cooking endpoint", () => {
  const dish = recipe("horiatiki");
  allLocales(step(dish, "Cut the tomatoes into wedges").body, {
    en: /Before cutting[\s\S]*running water[\s\S]*produce brush[\s\S]*Do not use soap, bleach[\s\S]*clean towel/,
    "zh-hant": /切之前[\s\S]*流動冷水[\s\S]*蔬果刷[\s\S]*不要用肥皂、漂白水[\s\S]*乾淨毛巾/,
    ja: /切る前に[\s\S]*流水[\s\S]*野菜用ブラシ[\s\S]*石けん、漂白剤[\s\S]*清潔な布/,
    ko: /자르기 전에[\s\S]*흐르는 찬물[\s\S]*채소용 솔[\s\S]*비누, 표백제[\s\S]*깨끗한 수건/,
    th: /ก่อนหั่น[\s\S]*ใต้ก๊อกน้ำไหล[\s\S]*แปรงผักสะอาด[\s\S]*ห้ามใช้สบู่ น้ำยาฟอกขาว[\s\S]*ผ้าสะอาด/
  }, "raw salad produce is washed without soap");
  allLocales(step(dish, "Add feta, olives and oregano").body, {
    en: /feta refrigerated at 4°C \(40°F\) or colder[\s\S]*just before plating/,
    "zh-hant": /Feta[\s\S]*4°C（40°F）或以下冷藏[\s\S]*上桌前才取出/,
    ja: /フェタ[\s\S]*盛り付ける直前[\s\S]*4°C（40°F）以下で冷蔵/,
    ko: /페타[\s\S]*접시에 담기 직전[\s\S]*4°C \(40°F\) 이하로 냉장/,
    th: /เฟตา[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*จัดจาน/
  }, "the ready-to-eat dairy stays chilled until serving");
  allLocales(step(dish, "Pour over olive oil and serve").body, {
    en: /just before serving[\s\S]*4°C \(40°F\) or colder[\s\S]*2 hours[\s\S]*1 hour above 32°C \(90°F\)[\s\S]*no cooking-temperature endpoint/,
    "zh-hant": /上桌前[\s\S]*4°C（40°F）或以下[\s\S]*2 小時[\s\S]*32°C（90°F）超過 1 小時[\s\S]*沒有烹調溫度終點/,
    ja: /食べる直前[\s\S]*4°C（40°F）以下[\s\S]*2時間[\s\S]*32°C（90°F）[\s\S]*加熱温度の基準はありません/,
    ko: /먹기 직전에[\s\S]*4°C \(40°F\) 이하[\s\S]*2시간[\s\S]*32°C \(90°F\)[\s\S]*조리 온도 기준이 없습니다/,
    th: /ก่อนเสิร์ฟ[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*2 ชั่วโมง[\s\S]*32°C \(90°F\)[\s\S]*ไม่มีอุณหภูมิสำหรับการปรุง/
  }, "cold holding applies but no cooking temperature is invented for an uncooked salad");
  for (const locale of localeOrder) assert.doesNotMatch(dish.instructions.map((entry) => entry.body[locale]).join(" "), /71°C|74°C|63°C|145°F|160°F|165°F/,
    `${locale}: no cooking endpoint is assigned to the uncooked salad`);
  official(dish, [urls.produce, urls.handling, urls.storage]);
});

test("Käsespätzle protects raw egg-and-flour dough and checks the thickest cooked piece", () => {
  const dish = recipe("kaesespaetzle");
  allLocales(step(dish, "Mix the Spätzle dough").body, {
    en: /Do not taste[\s\S]*raw egg-and-flour dough[\s\S]*Wash hands[\s\S]*ready-to-eat food/,
    "zh-hant": /不要試吃[\s\S]*生蛋與生麵粉[\s\S]*清洗雙手[\s\S]*即食食物/,
    ja: /生卵と小麦粉を含む生地[\s\S]*味見しません[\s\S]*手、ボウル[\s\S]*すぐ食べる食品/,
    ko: /날달걀과 생밀가루[\s\S]*맛보지 마세요[\s\S]*손, 볼[\s\S]*바로 먹는 음식/,
    th: /อย่าชิมแป้งดิบ[\s\S]*ไข่และแป้งสาลี[\s\S]*ล้างมือ[\s\S]*อาหารพร้อมกิน/
  }, "raw dough is not tasted and is kept separate");
  allLocales(step(dish, "Rest the dough").body, {
    en: /15 minutes[\s\S]*refrigerate the covered egg dough[\s\S]*2 hours[\s\S]*1 hour above 32°C \(90°F\)/,
    "zh-hant": /15 分鐘[\s\S]*冷藏等候[\s\S]*2 小時[\s\S]*32°C（90°F）時不可超過 1 小時/,
    ja: /15分[\s\S]*覆って冷蔵[\s\S]*2時間以内[\s\S]*32°C（90°F）を超える環境では1時間以内/,
    ko: /15분[\s\S]*덮은 달걀 반죽을 냉장[\s\S]*2시간[\s\S]*32°C \(90°F\)보다 높은 곳에서는 1시간/,
    th: /15 นาที[\s\S]*ปิดฝาแป้งไข่และแช่เย็น[\s\S]*2 ชั่วโมง[\s\S]*1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C \(90°F\)/
  }, "the covered egg dough is not left warm if the pot is delayed");
  allLocales(step(dish, "Press the first batch").body, {
    en: /steady simmer[\s\S]*2–3 minutes[\s\S]*split the largest test piece[\s\S]*springy[\s\S]*free of wet or floury paste[\s\S]*1 minute more/,
    "zh-hant": /穩定微滾[\s\S]*2–3 分鐘[\s\S]*剖開最大顆[\s\S]*有彈性[\s\S]*沒有濕黏或粉糊狀[\s\S]*續煮 1 分鐘/,
    ja: /弱い沸騰[\s\S]*2〜3分[\s\S]*最も大きいものを割って[\s\S]*弾力[\s\S]*湿った粉状の生地[\s\S]*1分ずつ追加/,
    ko: /약하게 끓게[\s\S]*2–3분[\s\S]*가장 큰 조각을 갈라[\s\S]*탄력이 있으며[\s\S]*젖은 밀가루 반죽[\s\S]*1분 더/,
    th: /เดือดเบา ๆ สม่ำเสมอ[\s\S]*2–3 นาที[\s\S]*ผ่าชิ้นที่ใหญ่ที่สุด[\s\S]*ยืดหยุ่น[\s\S]*แป้งเปียก[\s\S]*ครั้งละ 1 นาที/
  }, "small pasta doneness is checked by texture rather than a misplaced thermometer target");
  for (const locale of localeOrder) assert.doesNotMatch(step(dish, "Press the first batch").body[locale], /71°C|74°C|63°C|145°F|160°F|165°F/,
    `${locale}: the boiling test is a pasta texture cue, not a meat temperature`);
  for (const locale of localeOrder) assert.doesNotMatch(dish.commonMistakes.map((entry) => entry[locale]).join(" "), /filled pasta|filling|餡料|包餡|具|속재료/,
    `${locale}: Käsespätzle notes no longer refer to unrelated filled pasta`);
  allLocales(dish.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\) or colder[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）或以下[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）以下[\s\S]*3〜4日以内[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*4°C \(40°F\) 이하[\s\S]*3–4일 안에[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "leftovers are chilled and reheated at the official endpoint");
  official(dish, [urls.flour, urls.egg, urls.temperatures, urls.handling, urls.storage]);
});
