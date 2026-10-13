import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["churros-con-chocolate", "gozleme", "brigadeiro", "che-ba-mau"];
const urls = {
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"
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
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function official(dish, wanted) {
  for (const url of wanted) {
    assert.ok(dish.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${dish.id}: official guidance is labelled separately: ${url}`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: culinary references remain distinct from official guidance`);
}

test("seventy-second batch adds four unchecked, non-excluded recipes to five-locale coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -40);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 284);
  assert.equal(new Set(beforeThisBatch).size, 284);
  assert.equal(covered.length, 324);
  assert.equal(new Set(covered).size, 324);
  assert.deepEqual(covered.slice(-40, -36), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 51);
  assert.equal(recipes.length - excluded.length - covered.length, 11);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the 284-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("the four publication revisions preserve drafts, servings, natural steps, and illustration mappings", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: original recipe draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: published method changed`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: published storage guidance changed`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official safety source was added`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: source illustration mapping is unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration count matches the method`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: method is complete`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage advice is localized`);
    }
    assert.equal(published.ingredients.length, draft.ingredients.length, `${id}: ingredient rows are preserved`);
  }
});

test("churros use a centre test, a lower-temperature recovery, and safe chocolate storage", () => {
  const dish = recipe("churros-con-chocolate");
  allLocales(step(dish, "Pipe and fry in small batches").body, {
    en: /175–185°C[\s\S]*first churro is the test[\s\S]*dry and set[\s\S]*170–175°C[\s\S]*10–12 cm[\s\S]*30–45 seconds longer[\s\S]*20-second increments/,
    "zh-hant": /175–185°C[\s\S]*先炸一根作測試[\s\S]*乾爽定型[\s\S]*170–175°C[\s\S]*10–12 公分[\s\S]*30–45 秒[\s\S]*20 秒/,
    ja: /175〜185°C[\s\S]*最初の1本を試し[\s\S]*乾いて固まり[\s\S]*170〜175°C[\s\S]*10〜12cm[\s\S]*30〜45秒[\s\S]*20秒/,
    ko: /175–185°C[\s\S]*첫 번째 츄로를 시험[\s\S]*마르고 익어야[\s\S]*170–175°C[\s\S]*10–12cm[\s\S]*30–45초[\s\S]*20초/,
    th: /175–185°C[\s\S]*ชิ้นแรกเป็นชิ้นทดสอบ[\s\S]*แห้งและสุก[\s\S]*170–175°C[\s\S]*10–12 ซม\.[\s\S]*30–45 วินาที[\s\S]*20 วินาที/
  }, "frying distinguishes time estimates from centre doneness and gives a recovery");
  allLocales(dish.storage, {
    en: /shallow covered container[\s\S]*4°C\/40°F or below[\s\S]*within 2 hours[\s\S]*2 days[\s\S]*quality preference[\s\S]*74°C\/165°F/,
    "zh-hant": /淺而有蓋的容器(?=[\s\S]*4°C\/40°F 以下)(?=[\s\S]*2 小時內)(?=[\s\S]*2 天內)(?=[\s\S]*品質建議)(?=[\s\S]*74°C\/165°F)/,
    ja: /浅い蓋付き容器(?=[\s\S]*4°C\/40°F以下)(?=[\s\S]*2時間以内)(?=[\s\S]*2日以内)(?=[\s\S]*品質上の目安)(?=[\s\S]*74°C\/165°F)/,
    ko: /얕은 뚜껑 용기(?=[\s\S]*4°C\/40°F 이하)(?=[\s\S]*2시간 안에)(?=[\s\S]*2일 안에)(?=[\s\S]*품질 권장 기간)(?=[\s\S]*74°C\/165°F)/,
    th: /ภาชนะตื้นมีฝาปิด(?=[\s\S]*4°C\/40°F หรือต่ำกว่า)(?=[\s\S]*ภายใน 2 ชั่วโมง)(?=[\s\S]*ภายใน 2 วัน)(?=[\s\S]*คำแนะนำด้านคุณภาพ)(?=[\s\S]*74°C\/165°F)/
  }, "the dairy chocolate sauce is refrigerated and reheated to the official leftover endpoint");
  official(dish, [urls.handling, urls.temperatures]);
});

test("gozleme allocates all listed olive oil and corrects browning before the centre cooks", () => {
  const dish = recipe("gozleme");
  allLocales(step(dish, "Rest the dough").body, {
    en: /remaining 5 ml from the listed 30 ml divided olive oil/,
    "zh-hant": /30 毫升分配用橄欖油中剩下的 5 毫升/,
    ja: /30mlのオリーブ油の残り5ml/,
    ko: /올리브유 30ml 중 남은 5ml/,
    th: /น้ำมันมะกอก 5 มล\.ที่เหลือจากปริมาณ 30 มล\./
  }, "the dough-rest oil uses the last measured part of the divided amount");
  allLocales(step(dish, "Griddle until freckled and crisp").body, {
    en: /2–3 minutes per side[\s\S]*centre is hot[\s\S]*no pale raw-dough line[\s\S]*3–4 ml[\s\S]*lower the heat to medium[\s\S]*45–60 seconds[\s\S]*30-second covered increments/,
    "zh-hant": /每面煎 2–3 分鐘[\s\S]*中心熱透[\s\S]*看不到白色生麵糰[\s\S]*3–4 毫升[\s\S]*降至中火[\s\S]*45–60 秒[\s\S]*續煎 30 秒/,
    ja: /片面2〜3分[\s\S]*中心が熱く[\s\S]*白い生地が残らない[\s\S]*3〜4ml[\s\S]*中火に下げ[\s\S]*45〜60秒[\s\S]*30秒ずつ/,
    ko: /한 면당 약 2–3분[\s\S]*가운데가 뜨거우며[\s\S]*흰 생반죽 선이 남지[\s\S]*3–4ml[\s\S]*중불로 낮추고[\s\S]*45–60초[\s\S]*30초씩/,
    th: /2–3 นาทีต่อด้าน[\s\S]*ตรงกลางร้อน[\s\S]*ไม่มีเส้นแป้งดิบสีซีด[\s\S]*3–4 มล\.[\s\S]*ลดเป็นไฟกลาง[\s\S]*45–60 วินาที[\s\S]*ครั้งละ 30 วินาที/
  }, "centre doneness and oil allocation are clear, with a low-heat recovery");
  allLocales(dish.storage, {
    en: /(?=[\s\S]*within 2 hours)(?=[\s\S]*4°C\/40°F or below)(?=[\s\S]*3 days as a quality preference)(?=[\s\S]*74°C\/165°F)/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F 以下[\s\S]*3 天內食用是口感建議[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C\/40°F以下[\s\S]*3日以内は食感を保つための目安[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F 이하[\s\S]*3일 이내는 식감을 위한 권장 기간[\s\S]*74°C\/165°F/,
    th: /(?=[\s\S]*ภายใน 2 ชั่วโมง)(?=[\s\S]*4°C\/40°F หรือต่ำกว่า)(?=[\s\S]*ภายใน 3 วันเพื่อคุณภาพ)(?=[\s\S]*74°C\/165°F)/
  }, "storage clearly separates quality preference from reheating safety");
  official(dish, [urls.handling, urls.temperatures]);
});

test("brigadeiro cooks to a visible set and portions the full yield into 18 sweets", () => {
  const dish = recipe("brigadeiro");
  allLocales(step(dish, "Cook to a fudgy mass").body, {
    en: /8–10 minutes[\s\S]*pulls cleanly from the pan[\s\S]*track open for about 2 seconds[\s\S]*cook 1 minute longer/,
    "zh-hant": /8–10 分鐘[\s\S]*整團離鍋[\s\S]*約 2 秒不合起來[\s\S]*再煮 1 分鐘/,
    ja: /8〜10分[\s\S]*鍋からきれいに離れ[\s\S]*約2秒残れば[\s\S]*1分追加/,
    ko: /8–10분[\s\S]*팬에서 깨끗이 떨어지고[\s\S]*약 2초 남으면[\s\S]*1분 더 끓이고/,
    th: /8–10 นาที[\s\S]*ล่อนจากกระทะสะอาด[\s\S]*ค้างประมาณ 2 วินาที[\s\S]*ต่อ 1 นาที/
  }, "time is an estimate and the pan-track test has a measured correction");
  allLocales(step(dish, "Portion the sweets").body, {
    en: /all of it into 18 equal portions[\s\S]*22–25 g each[\s\S]*full batch/,
    "zh-hant": /全部分成 18 等份[\s\S]*22–25 公克[\s\S]*整鍋糖糊都分配完/,
    ja: /全量を18等分[\s\S]*約22〜25g[\s\S]*生地を残さず使い切れます/,
    ko: /전부 18등분[\s\S]*약 22–25g[\s\S]*반죽을 남기지 않고 모두/,
    th: /แบ่งทั้งหมดเป็น 18 ส่วนเท่ากัน[\s\S]*ประมาณ 22–25 กรัม[\s\S]*ใช้ส่วนผสมทั้งชุด/
  }, "portion weights reconcile the measured batch with the stated yield");
  allLocales(dish.storage, {
    en: /4°C\/40°F or below[\s\S]*within 2 hours[\s\S]*3 days[\s\S]*quality preference/,
    "zh-hant": /4°C\/40°F 以下[\s\S]*2 小時內[\s\S]*3 天內[\s\S]*品質建議/,
    ja: /4°C\/40°F以下[\s\S]*2時間以内[\s\S]*3日以内[\s\S]*品質上の目安/,
    ko: /4°C\/40°F 이하[\s\S]*2시간 안에[\s\S]*3일 안에[\s\S]*품질 권장 기간/,
    th: /4°C\/40°F หรือต่ำกว่า[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 3 วัน[\s\S]*คำแนะนำด้านคุณภาพ/
  }, "chilled dairy confection storage has official holding guidance and a labeled quality target");
  official(dish, [urls.handling]);
});

test("che ba mau checks agar set, recovers failed jelly, and chills portions promptly", () => {
  const dish = recipe("che-ba-mau");
  allLocales(dish.ingredients[3].item, {
    en: /pure agar-agar powder[\s\S]*up to 3 g extra for correction/,
    "zh-hant": /純寒天粉[\s\S]*最多 3 公克/,
    ja: /純寒天粉[\s\S]*追加用を最大3g/,
    ko: /순수 한천가루[\s\S]*최대 3g 추가분/,
    th: /ผงวุ้นบริสุทธิ์[\s\S]*สูงสุด 3 กรัม/
  }, "the reserve agar needed for a low-strength product is listed in every locale");
  allLocales(step(dish, "Set and chill the jelly").body, {
    en: /at least 4 hours[\s\S]*cut cleanly and hold its shape[\s\S]*still liquid[\s\S]*full boil for 2 minutes[\s\S]*extra pure agar 1 g at a time, up to 3 g total/,
    "zh-hant": /至少 4 小時[\s\S]*俐落切開並保持形狀[\s\S]*仍呈液態[\s\S]*煮沸 2 分鐘[\s\S]*每次拌入 1 公克[\s\S]*最多加 3 公克/,
    ja: /4時間以上[\s\S]*きれいに切れて形を保て[\s\S]*液体のまま[\s\S]*2分間しっかり沸騰[\s\S]*追加の純寒天粉を1gずつ、合計3gまで/,
    ko: /최소 4시간[\s\S]*깔끔하게 잘리고 모양을 유지[\s\S]*액체면[\s\S]*2분간 완전히 끓입니다[\s\S]*추가 순수 한천가루를 1g씩, 총 3g까지/,
    th: /อย่างน้อย 4 ชั่วโมง[\s\S]*ตัดได้เรียบและคงรูป[\s\S]*ยังเป็นของเหลว[\s\S]*เดือดเต็มที่ 2 นาที[\s\S]*เพิ่มครั้งละ 1 กรัม รวมไม่เกิน 3 กรัม/
  }, "agar has a physical set test and reboil recovery");
  allLocales(step(dish, "Chill every component").body, {
    en: /separate clean, shallow containers[\s\S]*no deeper than about 5 cm[\s\S]*Do not wait for them to reach room temperature[\s\S]*within 2 hours/,
    "zh-hant": /分別放入乾淨淺容器[\s\S]*不超過約 5 公分[\s\S]*不要等到完全降至室溫[\s\S]*2 小時內/,
    ja: /それぞれ清潔な浅い容器[\s\S]*約5cm以下[\s\S]*室温まで冷めるのを待たず[\s\S]*2時間以内/,
    ko: /각각 깨끗하고 깊이 약 5cm 이하인 얕은 용기[\s\S]*실온까지 식을 때까지 기다리지 말고[\s\S]*2시간 안에/,
    th: /ภาชนะแยกกันที่สะอาดและตื้น[\s\S]*ไม่เกินประมาณ 5 ซม\.[\s\S]*อย่ารอให้เย็นถึงอุณหภูมิห้อง[\s\S]*ภายใน 2 ชั่วโมง/
  }, "cooked bean and coconut layers cool shallow and promptly");
  allLocales(step(dish, "Layer and serve immediately").body, {
    en: /60 g of each per glass[\s\S]*one quarter of the jelly[\s\S]*150 g crushed ice[\s\S]*one quarter \(65 ml\) of the coconut sauce/,
    "zh-hant": /每杯各放 60 公克[\s\S]*四分之一的洋菜[\s\S]*150 公克碎冰[\s\S]*四分之一椰奶醬（約 65 毫升）/,
    ja: /各グラスに60gずつ[\s\S]*寒天を4等分[\s\S]*氷150g[\s\S]*4分の1（約65ml）/,
    ko: /잔마다 60g씩[\s\S]*한천도 4등분[\s\S]*얼음 150g[\s\S]*4분의 1\(약 65ml\)/,
    th: /แก้วละ 60 กรัม[\s\S]*หนึ่งในสี่ของทั้งหมด[\s\S]*150 กรัม[\s\S]*หนึ่งในสี่ \(ประมาณ 65 มล\.\)/
  }, "the four glasses have explicit component portions");
  official(dish, [urls.handling]);
});
