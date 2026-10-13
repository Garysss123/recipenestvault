import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";

const ids = ["massaman-curry", "mul-naengmyeon", "khao-soi", "pork-ball-rice-vermicelli-soup"];
const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
const draftsById = new Map(allRecipeDrafts.map((recipe) => [recipe.id, recipe]));
const urls = {
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"
};

function get(id) {
  const recipe = byId.get(id);
  assert.ok(recipe, id + ": recipe exists");
  return recipe;
}

function everyLocale(localized, patterns, label) {
  for (const locale of localeOrder) assert.match(localized[locale], patterns[locale], locale + ": " + label);
}

function official(recipe, wanted) {
  for (const url of wanted) {
    assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
      recipe.id + ": applicable official guidance is credited separately: " + url);
  }
  assert.ok(recipe.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    recipe.id + ": at least two culinary references remain separate");
}

test("fifty-eighth batch adds four unchecked eligible slugs, preserves drafts, and maps existing illustrations", async () => {
  const source = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared five-locale detail-route regression exists");
  const covered = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const exclusionsSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusions = exclusionsSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusions, "standing exclusion list exists");
  const excluded = [...exclusions.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((recipe) => recipe.id)).size, 353);
  assert.equal(covered.length, 284);
  assert.equal(new Set(covered).size, 284);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.deepEqual(covered.slice(-56, -52), ids);
  assert.ok(ids.every((id) => !excluded.includes(id)), "no selected recipe is excluded");
  assert.equal(recipes.length - excluded.length - covered.length, 51);

  const previous = new Set(covered.slice(0, -56));
  assert.ok(ids.every((id) => !previous.has(id)), "all selected recipes were absent from the prior 228-ID ledger");
  for (const id of ids) {
    const recipe = get(id);
    const draft = draftsById.get(id);
    assert.ok(draft, id + ": source draft exists");
    assert.equal(recipe.instructions.length, draft.instructions.length, id + ": method length is unchanged");
    assert.deepEqual(recipe.instructions.map((step) => step.imageScene), draft.instructions.map((step) => step.imageScene),
      id + ": each illustration remains mapped to its original method step");
    for (const locale of localeOrder) {
      assert.ok(recipe.ingredients.every((row) => row.amount && row.item[locale]), id + "/" + locale + ": ingredients are localized");
      assert.ok(recipe.instructions.every((step) => step.title[locale] && step.body[locale]), id + "/" + locale + ": method is localized");
      assert.ok(recipe.storage[locale], id + "/" + locale + ": storage is localized");
    }
    assert.notDeepEqual(recipe.instructions, draft.instructions, id + ": publication changes do not mutate the draft");
    assert.notDeepEqual(recipe.storage, draft.storage, id + ": storage changes do not mutate the draft");
    official(recipe, id === "mul-naengmyeon"
      ? [urls.temperatures, urls.handling, urls.storage, urls.eggs]
      : [urls.temperatures, urls.handling, urls.storage]);
  }
});

test("Massaman timing covers every staged braise and separates beef texture from the ground-meat rule", () => {
  const recipe = get("massaman-curry");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 165, 195]);
  everyLocale(recipe.instructions[4].body, {
    en: /75-minute estimate[\s\S]*small bubbles return/,
    "zh-hant": /小泡重新出現[\s\S]*約 75 分鐘/,
    ja: /小さな泡が戻ってから[\s\S]*75分を目安/,
    ko: /작은 기포가 다시 생긴 뒤부터[\s\S]*약 75분/,
    th: /ประมาณ 75 นาที[\s\S]*ฟองเล็ก ๆ กลับมา/
  }, "braise timer starts when the simmer returns");
  everyLocale(recipe.instructions[6].body, {
    en: /not ground[\s\S]*71°C \(160°F\)[\s\S]*not apply[\s\S]*quality cue[\s\S]*10–15-minute increments/,
    "zh-hant": /不是絞肉[\s\S]*71°C（160°F）[\s\S]*不適用[\s\S]*口感指標[\s\S]*10–15 分鐘/,
    ja: /ひき肉は使いません[\s\S]*71°C（160°F）[\s\S]*当てはめません[\s\S]*食感の目安[\s\S]*10〜15分ずつ/,
    ko: /다짐육이 아니다[\s\S]*71°C \(160°F\)[\s\S]*적용하지 않는다[\s\S]*식감 기준[\s\S]*10–15분씩/,
    th: /ไม่ใช่เนื้อบด[\s\S]*71°C \(160°F\)[\s\S]*ไม่ใช้กับ[\s\S]*เพื่อคุณภาพ[\s\S]*10–15 นาที/
  }, "whole-cube braise and ground-meat threshold are distinguished");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*3일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "quality window and leftover safety guidance are separated");
});

test("Mul naengmyeon applies whole-roast and hard-cooked-egg guidance and allocates the full yield", () => {
  const recipe = get("mul-naengmyeon");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [300, 110, 410]);
  everyLocale(recipe.instructions[2].body, {
    en: /60–75 minutes[\s\S]*63°C \(145°F\)[\s\S]*3-minute rest[\s\S]*not use the 71°C ground-meat value/,
    "zh-hant": /60–75 分鐘[\s\S]*63°C（145°F）[\s\S]*靜置 3 分鐘[\s\S]*不使用絞肉的 71°C/,
    ja: /60〜75分[\s\S]*63°C（145°F）[\s\S]*3分休ませます[\s\S]*ひき肉の71°C基準は使いません/,
    ko: /60–75분[\s\S]*63°C \(145°F\)[\s\S]*3분 쉰다[\s\S]*다짐육의 71°C 기준을 적용하지 않는다/,
    th: /60–75 นาที[\s\S]*63°C \(145°F\)[\s\S]*พัก 3 นาที[\s\S]*ไม่ใช้ค่า 71°C ของเนื้อบด/
  }, "brisket follows the whole-cut context rather than a ground-meat threshold");
  everyLocale(recipe.instructions[7].body, {
    en: /about 10 minutes[\s\S]*both whites and yolks are firm[\s\S]*not the safety check/,
    "zh-hant": /約 10 分鐘[\s\S]*蛋白與蛋黃都已凝固[\s\S]*不以 74°C 溫度讀數作安全判定/,
    ja: /約10分[\s\S]*白身と黄身がどちらも固まっている[\s\S]*判定しません/,
    ko: /약 10분[\s\S]*흰자와 노른자가 모두 단단히 익었는지[\s\S]*판단하지 않는다/,
    th: /ประมาณ 10 นาที[\s\S]*ไข่ขาวและไข่แดงสุกแข็ง[\s\S]*ไม่ใช้การวัด 74°C/
  }, "hard-cooked eggs use firm-white-and-yolk guidance instead of an impractical core reading");
  everyLocale(recipe.instructions[6].body, {
    en: /entire cooked brisket[\s\S]*among four bowls[\s\S]*former 60 g-per-bowl estimate/,
    "zh-hant": /整份熟牛肉[\s\S]*四碗[\s\S]*不再固定為每碗 60 公克/,
    ja: /ブリスケット全量[\s\S]*固定目安をやめ[\s\S]*4杯に等分/,
    ko: /양지머리 전체[\s\S]*고정량 대신[\s\S]*네 그릇/,
    th: /เนื้ออกวัวที่สุกทั้งหมด[\s\S]*เลิกกำหนดตายตัว[\s\S]*4 ชาม/
  }, "all cooked brisket is distributed");
});

test("Khao soi keeps poultry cold until cooking, checks 74°C, and corrects its batch timeline", () => {
  const recipe = get("khao-soi");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [40, 90, 130]);
  everyLocale(recipe.instructions[0].body, {
    en: /refrigerated[\s\S]*4°C \(40°F\)[\s\S]*Do not leave the chicken out to temper/,
    "zh-hant": /保持冷藏於 4°C（40°F）以下[\s\S]*不要把雞肉留在室溫回溫/,
    ja: /4°C（40°F）以下で冷蔵[\s\S]*室温に置いて戻しません/,
    ko: /4°C \(40°F\) 이하로 냉장[\s\S]*실온에 꺼내 두지 않는다/,
    th: /4°C \(40°F\)[\s\S]*ไม่วางไก่ไว้ที่อุณหภูมิห้อง/
  }, "raw chicken stays chilled during setup");
  everyLocale(recipe.instructions[5].body, {
    en: /35–45 minutes[\s\S]*near, but not touching, the bone[\s\S]*74°C \(165°F\)[\s\S]*not the safety check[\s\S]*2-minute increments/,
    "zh-hant": /35–45 分鐘[\s\S]*不碰骨[\s\S]*74°C（165°F）[\s\S]*不是安全檢查[\s\S]*2 分鐘/,
    ja: /35〜45分[\s\S]*骨に触れない[\s\S]*74°C（165°F）[\s\S]*安全確認の代わりではありません[\s\S]*2分ずつ/,
    ko: /35–45분[\s\S]*뼈에 닿지 않는[\s\S]*74°C \(165°F\)[\s\S]*안전 확인이 아니다[\s\S]*2분씩/,
    th: /35–45 นาที[\s\S]*ไม่ให้หัววัดแตะกระดูก[\s\S]*74°C \(165°F\)[\s\S]*ไม่ใช่การยืนยันความปลอดภัย[\s\S]*2 นาที/
  }, "bone-in poultry is checked at its applicable endpoint");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*2 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C \(165°F\)[\s\S]*not rice/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*2 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C（165°F）[\s\S]*不含米飯/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*2日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C（165°F）[\s\S]*ご飯は含みません/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*2일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C \(165°F\)[\s\S]*밥이 아니라 면/,
    th: /2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*2 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)[\s\S]*ไม่ใช่ข้าว/
  }, "leftover window and reheating are distinct from quality, and rice boilerplate is gone");
});

test("Taiwan pork-ball soup distinguishes cooked packaged meatballs, raw ground pork, and reheated leftovers", () => {
  const recipe = get("pork-ball-rice-vermicelli-soup");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes], [30, 76, 106]);
  const balls = recipe.ingredients.find((row) => row.item.en.startsWith("Taiwanese pork balls"));
  assert.match(balls.item.en, /fully cooked/);
  everyLocale(recipe.instructions[2].body, {
    en: /1.8 L[\s\S]*400 g fully cooked pork balls[\s\S]*74°C \(165°F\)[\s\S]*reheating check[\s\S]*raw ground-pork[\s\S]*71°C \(160°F\)/,
    "zh-hant": /1.8 公升[\s\S]*400 公克已熟豬肉丸[\s\S]*74°C（165°F）[\s\S]*復熱檢查[\s\S]*生絞豬肉丸[\s\S]*71°C（160°F）/,
    ja: /1.8L[\s\S]*加熱済み豚肉団子400g[\s\S]*74°C（165°F）[\s\S]*再加熱の確認[\s\S]*生の豚ひき肉団子[\s\S]*71°C（160°F）/,
    ko: /1.8L[\s\S]*완전히 익힌 돼지고기 완자 400g[\s\S]*74°C \(165°F\)[\s\S]*재가열 기준[\s\S]*생 다진 돼지고기 완자[\s\S]*71°C \(160°F\)/,
    th: /1.8 ลิตร[\s\S]*ลูกชิ้นหมูปรุงสุกแล้ว 400 กรัม[\s\S]*74°C \(165°F\)[\s\S]*การอุ่นซ้ำ[\s\S]*ลูกชิ้นหมูบดดิบ[\s\S]*71°C \(160°F\)/
  }, "raw ground pork and cooked-product reheating have separate applicable endpoints");
  everyLocale(recipe.instructions[5].body, {
    en: /four warm bowls[\s\S]*60 g dry noodles per bowl[\s\S]*100 g pork balls[\s\S]*400 ml broth[\s\S]*remaining 200 ml broth/,
    "zh-hant": /四個溫碗[\s\S]*每碗約用 60 公克乾米粉[\s\S]*100 公克豬肉丸[\s\S]*400 毫升湯[\s\S]*剩餘 200 毫升/,
    ja: /4つの温めた器[\s\S]*1杯約60g[\s\S]*約100g[\s\S]*各400ml[\s\S]*残りの200ml/,
    ko: /따뜻한 그릇 네 개[\s\S]*그릇당 약 60g[\s\S]*약 100g[\s\S]*400ml씩[\s\S]*남은 200ml/,
    th: /ชามอุ่น 4 ใบ[\s\S]*60 กรัมต่อชาม[\s\S]*100 กรัม[\s\S]*400 มล\.[\s\S]*อีก 200 มล\./
  }, "noodle, meatball, and broth quantities reconcile to four servings");
  everyLocale(recipe.storage, {
    en: /within 2 hours[\s\S]*4°C \(40°F\)[\s\S]*3 days[\s\S]*quality preference[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*4°C（40°F）[\s\S]*3 天[\s\S]*品質偏好[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*4°C（40°F）[\s\S]*3日以内[\s\S]*品質上の目安[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 이내[\s\S]*4°C \(40°F\)[\s\S]*3일 이내[\s\S]*품질 선호[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /2 ชั่วโมง[\s\S]*4°C \(40°F\)[\s\S]*3 วัน[\s\S]*ความชอบด้านคุณภาพ[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "quality preference, cold storage guidance, and leftover reheating are distinguished");
});
