import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["pad-see-ew", "kalguksu", "pho-bo", "mi-quang"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const officialUrls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  flour: "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, `${id}: recipe exists`);
  return recipe;
}

function everyLocale(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], `${locale}: ${label}`);
}

function official(recipe, urls) {
  for (const url of urls) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      `${recipe.id}: applicable official guidance is listed separately: ${url}`);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${recipe.id}: at least two culinary references remain distinct from official safety guidance`);
}

test("sixty-first batch appends four previously unchecked, non-excluded slugs", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledger = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledger, "shared exact-slug ledger exists");
  const covered = [...ledger.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionList = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionList, "standing exclusion list exists");
  const excluded = [...exclusionList.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 244);
  assert.equal(new Set(covered).size, 244);
  assert.deepEqual(covered.slice(-4), ids);
  assert.equal(covered.slice(0, -4).length, 240);
  assert.equal(new Set(excluded).size, 18);
  assert.ok(ids.every((id) => !covered.slice(0, -4).includes(id)), "each selection was absent from the 240-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "no selection is in the standing exclusions");
  assert.equal(recipes.length - excluded.length - covered.length, 91);

  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.equal(recipe.instructions.length, draft.instructions.length, `${id}: published step count is preserved`);
    assert.deepEqual(recipe.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      `${id}: illustration scene mapping remains on its original step`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, recipe.instructions.length, `${id}: one existing illustration per step remains mapped`);
    assert.deepEqual(illustrations.map((entry) => entry.step), recipe.instructions.map((_, index) => index + 1),
      `${id}: illustration order matches the method`);
    assert.ok(illustrations.every((entry) => entry.setComplete && entry.visualMatchApproved && entry.nonPhotographic),
      `${id}: approved non-photographic illustration metadata remains intact`);
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: localized ingredients remain complete`);
      assert.ok(recipe.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: localized method remains complete`);
      assert.ok(recipe.storage[locale], `${id}/${locale}: localized storage guidance remains complete`);
    }
    assert.notDeepEqual(recipe.instructions, draft.instructions, `${id}: publication method changes leave the source draft intact`);
    assert.notDeepEqual(recipe.storage, draft.storage, `${id}: publication storage changes leave the source draft intact`);
    assert.notDeepEqual(recipe.sources, draft.sources, `${id}: official references remain publication-only`);
    assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${id}: time fields add up`);
    assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
      `${id}: at least two recipe references remain`);
  }
});

test("Pad See Ew portions oil and sauce, and separates whole-pork, egg, and leftover endpoints", () => {
  const recipe = get("pad-see-ew");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [30, 15, 45, 4]);
  everyLocale(recipe.instructions[2].body, {
    en: /350 g[\s\S]*175 g batches[\s\S]*90 seconds per side[\s\S]*63°C \(145°F\)[\s\S]*rest[\s\S]*3 minutes[\s\S]*not ground pork/,
    "zh-hant": /350 公克[\s\S]*175 公克[\s\S]*每面[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*並非絞豬肉/,
    ja: /豚ロースの薄切り350g[\s\S]*175gずつ[\s\S]*63°C（145°F）[\s\S]*3分休ませます[\s\S]*ひき肉ではなく/,
    ko: /돼지 등심 350g[\s\S]*175g씩[\s\S]*63°C \(145°F\)[\s\S]*3분 쉰다[\s\S]*다진 돼지고기가 아니다/,
    th: /เนื้อสันนอกหมูชิ้นเต็ม 350 กรัม[\s\S]*175 กรัม[\s\S]*63°C \(145°F\)[\s\S]*พักบนจานสะอาด 3 นาที[\s\S]*ไม่ใช่หมูบด/
  }, "intact pork endpoint and separate rest");
  everyLocale(recipe.instructions[3].body, {
    en: /all 3 eggs[\s\S]*2–3 minutes[\s\S]*71°C \(160°F\)[\s\S]*safety check/,
    "zh-hant": /全部 3 顆蛋[\s\S]*2–3 分鐘[\s\S]*71°C（160°F）[\s\S]*安全檢查/,
    ja: /卵3個全量[\s\S]*71°C（160°F）[\s\S]*約2〜3分[\s\S]*安全確認/,
    ko: /달걀 3개 전량[\s\S]*약 2–3분[\s\S]*71°C \(160°F\)[\s\S]*안전 확인/,
    th: /ไข่ 3 ฟองทั้งหมด[\s\S]*2–3 นาที[\s\S]*71°C \(160°F\)[\s\S]*เกณฑ์ความปลอดภัย/
  }, "egg-dish endpoint is not inferred from colour or time");
  everyLocale(recipe.instructions[6].body, {
    en: /four warm plates[\s\S]*175 g noodles[\s\S]*87\.5 g raw-weight pork[\s\S]*75 g Chinese broccoli/,
    "zh-hant": /四盤[\s\S]*175 公克麵條[\s\S]*87\.5 公克豬肉[\s\S]*75 公克芥蘭/,
    ja: /温めた皿4枚[\s\S]*麺約175g[\s\S]*豚肉87\.5g[\s\S]*芥藍75g/,
    ko: /따뜻한 접시 네 개[\s\S]*면 약 175g[\s\S]*돼지고기 87\.5g[\s\S]*중국 브로콜리 75g/,
    th: /จานอุ่น 4 จาน[\s\S]*เส้นประมาณ 175 กรัม[\s\S]*หมูดิบก่อนปรุง 87\.5 กรัม[\s\S]*คะน้า 75 กรัม/
  }, "four-plate ingredient allocation");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F[\s\S]*2 days[\s\S]*quality[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F[\s\S]*2 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C\/40°F[\s\S]*2日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F[\s\S]*2일 안에[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /2 ชั่วโมง[\s\S]*4°C\/40°F[\s\S]*2 วัน[\s\S]*คุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality window and official leftover guidance are separate");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage, officialUrls.eggs]);
});

test("kalguksu distinguishes raw-flour handling, chicken temperature, noodle texture, and reheating", () => {
  const recipe = get("kalguksu");
  everyLocale(recipe.instructions[0].body, {
    en: /185 ml water[\s\S]*all 400 g flour[\s\S]*Flour is raw[\s\S]*do not taste/,
    "zh-hant": /全部 185 毫升水[\s\S]*全部 400 公克麵粉[\s\S]*麵粉是生食材[\s\S]*不要試吃/,
    ja: /水185ml全量[\s\S]*小麦粉400g全量[\s\S]*小麦粉は生の食材[\s\S]*生地を味見せず/,
    ko: /물 185ml 전량[\s\S]*밀가루 400g 전량[\s\S]*밀가루는 날것이다[\s\S]*생반죽을 맛보지/,
    th: /น้ำ 185 มล.ทั้งหมด[\s\S]*แป้ง 400 กรัมทั้งหมด[\s\S]*แป้งดิบ[\s\S]*อย่าชิมแป้ง/
  }, "FDA raw-flour handling");
  everyLocale(recipe.instructions[4].body, {
    en: /35–45 minutes[\s\S]*74°C \(165°F\)[\s\S]*5-minute increments[\s\S]*not the safety check/,
    "zh-hant": /35–45 分鐘[\s\S]*74°C（165°F）[\s\S]*每次續煮 5 分鐘[\s\S]*不是安全檢查/,
    ja: /35〜45分[\s\S]*74°C（165°F）[\s\S]*5分ずつ[\s\S]*安全確認ではありません/,
    ko: /35–45분[\s\S]*74°C \(165°F\)[\s\S]*5분씩[\s\S]*안전 확인 기준이 아니다/,
    th: /35–45 นาที[\s\S]*74°C \(165°F\)[\s\S]*ครั้งละ 5 นาที[\s\S]*ไม่ใช่การตรวจความปลอดภัย/
  }, "bone-in poultry endpoint and timed recheck");
  everyLocale(recipe.instructions[12].body, {
    en: /220 g zucchini[\s\S]*3 minutes[\s\S]*74°C \(165°F\)[\s\S]*reheating endpoint/,
    "zh-hant": /220 公克櫛瓜[\s\S]*3 分鐘[\s\S]*74°C（165°F）[\s\S]*復熱標準/,
    ja: /ズッキーニ220g全量[\s\S]*約3分[\s\S]*74°C（165°F）[\s\S]*再加熱の基準/,
    ko: /애호박 220g 전량[\s\S]*약 3분[\s\S]*74°C \(165°F\)[\s\S]*재가열 기준/,
    th: /ซูกินี 220 กรัมทั้งหมด[\s\S]*ประมาณ 3 นาที[\s\S]*74°C \(165°F\)[\s\S]*เกณฑ์การอุ่นซ้ำ/
  }, "cooked chicken reheat rule");
  everyLocale(recipe.instructions[13].body, {
    en: /four bowls[\s\S]*450 ml broth[\s\S]*62\.5 g potato[\s\S]*55 g zucchini[\s\S]*15 g scallions/,
    "zh-hant": /四碗[\s\S]*450 毫升高湯[\s\S]*62\.5 公克馬鈴薯[\s\S]*55 公克櫛瓜[\s\S]*15 公克蔥花/,
    ja: /4杯[\s\S]*スープ約450ml[\s\S]*じゃがいも62\.5g[\s\S]*ズッキーニ55g[\s\S]*ねぎ15g/,
    ko: /네 그릇[\s\S]*약 450ml[\s\S]*감자 62\.5g[\s\S]*애호박 55g[\s\S]*대파 15g/,
    th: /4 ชาม[\s\S]*450 มล\.[\s\S]*มันฝรั่ง 62\.5 กรัม[\s\S]*ซูกินี 55 กรัม[\s\S]*ต้นหอม 15 กรัม/
  }, "four-bowl portion arithmetic");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F[\s\S]*2 days[\s\S]*quality[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F[\s\S]*口感[\s\S]*2 天[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C\/40°F[\s\S]*品質[\s\S]*2日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F[\s\S]*품질[\s\S]*2일 안에[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /2 ชั่วโมง[\s\S]*4°C\/40°F[\s\S]*คุณภาพ[\s\S]*2 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "separate quality storage and official leftover/reheat guidance");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage, officialUrls.flour]);
});

test("pho separates whole-beef cooking from chilled-brisket reheating and allocates six bowls", () => {
  const recipe = get("pho-bo");
  const sirloin = recipe.ingredients.find((row) => row.item.en.startsWith("beef sirloin"));
  assert.ok(sirloin);
  assert.equal(sirloin.amount, "250 g");
  everyLocale(sirloin.item, {
    en: /intact 2\.5 cm steak; slice after cooking/,
    "zh-hant": /整塊厚 2\.5 公分；煮熟後再切片/,
    ja: /1枚（厚さ2\.5cm）；加熱後に薄切り/,
    ko: /통스테이크 1장\(두께 2\.5cm\); 익힌 뒤 얇게 썬다/,
    th: /ชิ้นเต็มหนา 2\.5 ซม\. หั่นบางหลังปรุงสุก/
  }, "sirloin is measurable as a whole cut before slicing");
  everyLocale(recipe.instructions[2].body, {
    en: /2½–3 hours[\s\S]*skewer[\s\S]*63°C \(145°F\)[\s\S]*rest 3 minutes[\s\S]*within 2 hours/,
    "zh-hant": /2½–3 小時[\s\S]*竹籤[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*2 小時內/,
    ja: /2時間半〜3時間[\s\S]*串[\s\S]*63°C（145°F）[\s\S]*3分休ませます[\s\S]*2時間以内/,
    ko: /2시간 반–3시간[\s\S]*꼬치[\s\S]*63°C \(145°F\)[\s\S]*3분 휴지[\s\S]*2시간 안에/,
    th: /2½–3 ชั่วโมง[\s\S]*ไม้เสียบ[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที[\s\S]*ภายใน 2 ชั่วโมง/
  }, "whole-cut beef endpoint separated from tenderness estimate");
  everyLocale(recipe.instructions[8].body, {
    en: /cooked brisket[\s\S]*74°C \(165°F\)[\s\S]*leftover-reheating endpoint[\s\S]*intact, non-ground 250 g sirloin steak[\s\S]*8–12 minutes[\s\S]*while the steak is still whole[\s\S]*63°C \(145°F\)[\s\S]*3 minutes[\s\S]*1-minute increments[\s\S]*Slice thinly/,
    "zh-hant": /熟牛胸肉[\s\S]*74°C（165°F）[\s\S]*復熱標準[\s\S]*完整、非絞肉[\s\S]*2\.5 公分[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*每次回鍋續煮 1 分鐘[\s\S]*逆紋切薄片/,
    ja: /ブリスケット[\s\S]*74°C（165°F）[\s\S]*再加熱基準[\s\S]*ひき肉ではない[\s\S]*2\.5cm[\s\S]*63°C（145°F）[\s\S]*3分休ませます[\s\S]*1分ずつ追加[\s\S]*薄切りにします/,
    ko: /양지[\s\S]*74°C \(165°F\)[\s\S]*재가열 기준[\s\S]*다진 고기가 아닌[\s\S]*2\.5cm[\s\S]*63°C \(145°F\)[\s\S]*3분 쉰다[\s\S]*1분씩 더 끓여[\s\S]*얇게 썬다/,
    th: /อกวัว[\s\S]*74°C \(165°F\)[\s\S]*เกณฑ์การอุ่นอาหารเหลือ[\s\S]*เนื้อสันนอกชิ้นเต็ม[\s\S]*2\.5 ซม\.[\s\S]*63°C \(145°F\)[\s\S]*พักบนจานสะอาด 3 นาที[\s\S]*ครั้งละ 1 นาที[\s\S]*หั่นบาง/
  }, "separate raw whole-beef and cooked-leftover endpoints");
  everyLocale(recipe.instructions[9].body, {
    en: /six noodle bowls[\s\S]*117 g brisket[\s\S]*42 g raw-weight sirloin[\s\S]*500 ml boiling broth/,
    "zh-hant": /六碗麵[\s\S]*117 公克牛胸肉[\s\S]*42 公克牛里肌[\s\S]*500 毫升/,
    ja: /6杯[\s\S]*ブリスケット約117g[\s\S]*サーロイン約42g[\s\S]*スープ500ml/,
    ko: /여섯 그릇[\s\S]*양지 약 117g[\s\S]*등심 42g[\s\S]*육수 500ml/,
    th: /6 ใบ[\s\S]*อกวัวประมาณ 117 กรัม[\s\S]*สันนอก 42 กรัม[\s\S]*น้ำซุปเดือด 500 มล\./
  }, "six-bowl beef allocation");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F[\s\S]*3 days[\s\S]*quality[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F[\s\S]*品質[\s\S]*3 天[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C\/40°F[\s\S]*品質[\s\S]*3日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F[\s\S]*품질[\s\S]*3일 안에[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /2 ชั่วโมง[\s\S]*4°C\/40°F[\s\S]*คุณภาพ[\s\S]*3 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "quality window remains separate from official leftover range");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage]);
});

test("Mì Quảng assigns pork, shrimp, and quail-egg checks to their respective foods", () => {
  const recipe = get("mi-quang");
  everyLocale(recipe.instructions[4].body, {
    en: /5 mm pork-belly slices[\s\S]*not ground pork[\s\S]*63°C \(145°F\)[\s\S]*at least 3 minutes[\s\S]*20–25 minute simmer[\s\S]*tenderness estimate/,
    "zh-hant": /5 毫米五花肉片[\s\S]*並非絞肉[\s\S]*63°C（145°F）[\s\S]*至少煮 3 分鐘[\s\S]*20–25 分鐘[\s\S]*嫩度估算/,
    ja: /豚バラの5mm切り[\s\S]*ひき肉ではなく[\s\S]*63°C（145°F）[\s\S]*少なくとも3分[\s\S]*20〜25分[\s\S]*柔らかさの目安/,
    ko: /삼겹살 5mm 조각[\s\S]*다진 고기가 아니라[\s\S]*63°C \(145°F\)[\s\S]*최소 3분[\s\S]*20–25분[\s\S]*부드러움 추정치/,
    th: /หมูสามชั้นหั่น 5 มม\.[\s\S]*ไม่ใช่หมูบด[\s\S]*63°C \(145°F\)[\s\S]*อย่างน้อย 3 นาที[\s\S]*20–25 นาที[\s\S]*ค่าประมาณเพื่อความนุ่ม/
  }, "whole-cut pork and simmer tenderness are separate");
  everyLocale(recipe.instructions[5].body, {
    en: /all marinated shrimp[\s\S]*1–2 minutes per side[\s\S]*pearly or white and opaque[\s\S]*not the 63°C fish-fillet endpoint/,
    "zh-hant": /全部醃蝦[\s\S]*每面煎 1–2 分鐘[\s\S]*珍珠白或白色且不透明[\s\S]*不是魚片的 63°C 標準/,
    ja: /えび全量[\s\S]*片面1〜2分[\s\S]*真珠色または白く不透明[\s\S]*魚の切り身の63°C基準とは異なります/,
    ko: /양념한 새우 전량[\s\S]*한 면당 약 1–2분[\s\S]*진주빛 또는 흰색으로 불투명[\s\S]*생선 필렛의 63°C 기준과 다르다/,
    th: /กุ้งหมักทั้งหมด[\s\S]*ด้านละประมาณ 1–2 นาที[\s\S]*สีขาวมุกหรือขาวขุ่น[\s\S]*ไม่ใช่เกณฑ์ 63°C ของเนื้อปลา/
  }, "shrimp visual doneness cue is not confused with fish temperature");
  everyLocale(recipe.instructions[6].body, {
    en: /8 quail eggs[\s\S]*5 minutes[\s\S]*white and yolk are firm/,
    "zh-hant": /全部 8 顆鵪鶉蛋[\s\S]*煮 5 分鐘[\s\S]*蛋白蛋黃皆凝固/,
    ja: /うずら卵8個全量[\s\S]*5分ゆでます[\s\S]*白身と黄身の両方が固まって/,
    ko: /메추리알 8개 전량[\s\S]*5분 삶는다[\s\S]*흰자와 노른자가 모두 단단히 익었는지/,
    th: /ไข่นกกระทา 8 ฟองทั้งหมด[\s\S]*ต้ม 5 นาที[\s\S]*ไข่ขาวและไข่แดงแข็งทั่วถึง/
  }, "quail-egg endpoint uses firm white and yolk");
  everyLocale(recipe.instructions[9].body, {
    en: /four wide bowls[\s\S]*two fully cooked quail eggs[\s\S]*200 ml[\s\S]*10 g peanuts[\s\S]*15 g sesame rice crackers[\s\S]*5 g fried shallots/,
    "zh-hant": /四個寬碗[\s\S]*兩顆全熟鵪鶉蛋[\s\S]*200 毫升[\s\S]*10 公克花生[\s\S]*15 公克芝麻米餅[\s\S]*5 公克油蔥酥/,
    ja: /幅広い4杯[\s\S]*固ゆでうずら卵2個ずつ[\s\S]*約200ml[\s\S]*約10g[\s\S]*15g[\s\S]*5g/,
    ko: /넓은 그릇 네 개[\s\S]*완숙 메추리알 두 개씩[\s\S]*약 200ml[\s\S]*약 10g[\s\S]*15g[\s\S]*5g/,
    th: /ชามกว้าง 4 ใบ[\s\S]*ไข่นกกระทาสุกแข็ง 2 ฟอง[\s\S]*ประมาณ 200 มล\.[\s\S]*10 กรัม[\s\S]*15 กรัม[\s\S]*5 กรัม/
  }, "four bowls receive equal protein, broth, and crunchy toppings");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C\/40°F[\s\S]*2 days[\s\S]*quality[\s\S]*3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /2 小時內[\s\S]*4°C\/40°F[\s\S]*口感[\s\S]*2 天[\s\S]*3–4 天[\s\S]*74°C\/165°F/,
    ja: /2時間以内[\s\S]*4°C\/40°F[\s\S]*品質[\s\S]*2日以内[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /2시간 안에[\s\S]*4°C\/40°F[\s\S]*품질[\s\S]*2일 안에[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /2 ชั่วโมง[\s\S]*4°C\/40°F[\s\S]*คุณภาพ[\s\S]*2 วัน[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "component storage and reheating");
  official(recipe, [officialUrls.temperatures, officialUrls.handling, officialUrls.storage, officialUrls.eggs]);
});
