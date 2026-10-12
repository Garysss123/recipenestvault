import assert from "node:assert/strict";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const foodSafetySource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafetySource = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const crossContaminationSource = "https://www.gov.uk/government/publications/why-avoiding-cross-contamination-is-important/why-avoiding-cross-contamination-is-important";

function recipe(id) {
  const value = recipes.find((entry) => entry.id === id);
  assert.ok(value, `${id}: recipe exists`);
  for (const locale of localeOrder) {
    assert.ok(value.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: ingredients are localized`);
    assert.ok(value.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: method is localized`);
  }
  assert.equal(value.totalMinutes, value.prepMinutes + value.cookMinutes, `${id}: total time adds up`);
  return value;
}

function step(value, title) {
  const found = value.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${value.id}: ${title} step exists`);
  return found;
}

test("khao man gai times parallel prep, separates broth and rice amounts, and apportions all six plates", () => {
  const value = recipe("khao-man-gai");
  assert.equal(value.servings, 6);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [45, 110, 155]);
  assert.ok(value.sources.some((source) => source.url === "https://www.eatingthaifood.com/chicken-rice-khao-man-gai-recipe/"));
  assert.ok(value.sources.some((source) => source.url === "https://ianbenites.com/hainanese-chicken-rice-khao-man-gai/"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov poultry endpoint is credited");
  assert.ok(value.sources.some((source) => source.url === crossContaminationSource), "official cross-contamination guidance is credited");

  const prep = step(value, "Salt and warm the chicken");
  const chicken = step(value, "Verify and chill the chicken skin");
  const sauce = step(value, "Make the fermented soybean sauce");
  const rice = step(value, "Cook the chicken-fat rice");
  const soup = step(value, "Clarify the serving broth");
  const riceServe = step(value, "Fluff and portion the rice");
  const serve = step(value, "Assemble the complete set");
  const noRinse = {
    en: /Do not rinse raw chicken/,
    "zh-hant": /生雞不要沖水/,
    ja: /生の鶏肉は水で洗わず/,
    ko: /생닭은 물로 씻지 말고/,
    th: /ห้ามล้างไก่ดิบด้วยน้ำ/
  };
  const sauceSplit = {
    en: /one half as six dipping portions[\s\S]*refrigerate the other half/,
    "zh-hant": /醬汁平均分成兩半[\s\S]*一半分成六份[\s\S]*儘快冷藏/,
    ja: /たれを半分ずつ[\s\S]*6人分[\s\S]*冷蔵/,
    ko: /소스를 반으로[\s\S]*여섯 사람[\s\S]*냉장/,
    th: /น้ำจิ้มเป็นสองส่วนเท่ากัน[\s\S]*หกคน[\s\S]*แช่เย็น/
  };
  const riceBatch = {
    en: /450 g dry rice[\s\S]*six plates[\s\S]*75 g dry-rice equivalent/,
    "zh-hant": /450 g 生米[\s\S]*六份[\s\S]*75 g 生米/,
    ja: /450gの生米[\s\S]*6等分[\s\S]*75g/,
    ko: /마른 쌀 450g[\s\S]*여섯 접시[\s\S]*마른 쌀 75g/,
    th: /ข้าวดิบ 450 กรัม[\s\S]*6 ส่วน[\s\S]*75 กรัม/
  };
  const portions = {
    en: /six plates[\s\S]*140–160 g cooked meat[\s\S]*200 g cucumber[\s\S]*200 ml/,
    "zh-hant": /六份[\s\S]*140–160 g 熟雞肉[\s\S]*200 g 小黃瓜[\s\S]*200 ml/,
    ja: /6皿[\s\S]*140〜160g[\s\S]*きゅうり200g[\s\S]*200ml/,
    ko: /여섯 접시[\s\S]*140–160g[\s\S]*오이 200g[\s\S]*200ml/,
    th: /6 จาน[\s\S]*140–160 กรัม[\s\S]*แตงกวา 200 กรัม[\s\S]*200 มล/
  };

  for (const locale of localeOrder) {
    assert.match(prep.body[locale], noRinse[locale], `${locale}: avoid rinsing raw chicken`);
    assert.match(chicken.body[locale], /74°C/, `${locale}: whole poultry reaches its safe endpoint`);
    assert.doesNotMatch(chicken.body[locale], /63°C|71°C/, `${locale}: poultry is not assigned another food's endpoint`);
    assert.match(sauce.body[locale], sauceSplit[locale], `${locale}: half sauce is apportioned and the reserve is chilled`);
    assert.match(rice.body[locale], /900\s*ml|900 毫升|900 มล/, `${locale}: measured broth for rice`);
    assert.match(soup.body[locale], /1\.2\s*L|1\.2L|1\.2 公升|1\.2 ลิตร/, `${locale}: measured broth for soup`);
    assert.match(riceServe.body[locale], riceBatch[locale], `${locale}: the entire rice batch is apportioned`);
    assert.match(serve.body[locale], portions[locale], `${locale}: chicken, cucumber and soup reach all six servings`);
  }
});

test("Goan fish curry has a measured fish endpoint, source-specific doneness fallback, and four rice portions", () => {
  const value = recipe("goan-fish-curry");
  assert.equal(value.servings, 4);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [25, 40, 65]);
  assert.equal(value.ingredients.find((row) => row.item.en.includes("fish fillets"))?.amount, "700 g");
  const rice = value.ingredients.find((row) => row.item.en.startsWith("steamed rice"));
  assert.equal(rice?.amount, "600 g");
  assert.ok(value.sources.some((source) => source.url === "https://theyummydelights.com/goan-fish-curry/"));
  assert.ok(value.sources.some((source) => source.url === "https://veenapatwardhan.com/pat-a-cake/2023/02/03/authenticeasygoanfishcurryrecipe/"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov finfish endpoint is credited");
  const poach = step(value, "Poach the fish gently");
  const serve = step(value, "Rest before serving");
  const endpoint = {
    en: /63°C[\s\S]*1-minute intervals/,
    "zh-hant": /63°C[\s\S]*每次續煮 1 分鐘/,
    ja: /63°C[\s\S]*1分ずつ追加/,
    ko: /63°C[\s\S]*1분씩 더/,
    th: /63°C[\s\S]*ครั้งละ 1 นาที/
  };
  const portions = {
    en: /700 g fish among four servings[\s\S]*175 g raw fish per person[\s\S]*150 g cooked rice each/,
    "zh-hant": /700 g 魚分成四份[\s\S]*175 g 生魚重量[\s\S]*150 g 熟飯/,
    ja: /700gの魚を4人分[\s\S]*生の重量で1人約175g[\s\S]*150g/,
    ko: /생선 700g을 네 몫[\s\S]*조리 전 무게로 1인 약 175g[\s\S]*150g/,
    th: /ปลา 700 กรัมเป็น 4 ที่[\s\S]*น้ำหนักดิบประมาณ 175 กรัม[\s\S]*150 กรัม/
  };
  for (const locale of localeOrder) {
    assert.match(poach.body[locale], endpoint[locale], `${locale}: finfish reaches 63°C with a timed recheck`);
    assert.doesNotMatch(poach.body[locale], /71°C|74°C/, `${locale}: no ground-meat or poultry endpoint is imposed on fish`);
    assert.match(serve.body[locale], portions[locale], `${locale}: fish and rice amounts form four servings`);
    assert.ok(rice.item[locale], `${locale}: serving rice is localized`);
  }
  assert.ok(value.cookMinutes >= 30, "40-minute estimate covers the masala simmer, fish poach, covered rest and return-to-simmer allowance");
});

test("Sri Lankan egg hoppers time covered cooking and reserve soft yolks for treated shell eggs", () => {
  const value = recipe("sri-lankan-egg-hoppers");
  assert.equal(value.servings, 4);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [260, 20, 280]);
  const eggs = value.ingredients.find((row) => row.item.en.startsWith("eggs ("));
  assert.equal(eggs?.amount, "4");
  assert.match(eggs?.item.en ?? "", /pasteurized or otherwise treated shell eggs for soft yolks/);
  assert.ok(value.sources.some((source) => source.url === "https://www.australianeggs.org.au/recipes-and-cooking/egg-hoppers"));
  assert.ok(value.sources.some((source) => source.url === "https://www.hungrylankan.com/recipes/sri-lankan-hoppers/"));
  assert.ok(value.sources.some((source) => source.url === eggSafetySource), "FDA egg safety guidance is credited");
  const cook = step(value, "Add the egg and cover");
  const patterns = {
    en: /3–4 minutes[\s\S]*white is fully set[\s\S]*treated shell eggs[\s\S]*both white and yolk are firm/,
    "zh-hant": /3–4 分鐘[\s\S]*蛋白完全凝固[\s\S]*處理的帶殼蛋[\s\S]*蛋白與蛋黃都凝固/,
    ja: /3〜4分[\s\S]*白身が完全に固まり[\s\S]*処理済みの殻付き卵[\s\S]*白身と黄身の両方が固まる/,
    ko: /3–4분[\s\S]*흰자가 완전히 굳고[\s\S]*처리된 껍데기 달걀[\s\S]*흰자와 노른자가 모두 단단히 익을/,
    th: /3–4 นาที[\s\S]*ไข่ขาวสุกเซ็ต[\s\S]*ไข่เปลือกที่พาสเจอไรซ์[\s\S]*ทั้งไข่ขาวและไข่แดงสุกแข็ง/
  };
  for (const locale of localeOrder) {
    assert.match(cook.body[locale], patterns[locale], `${locale}: covered cook time and safe yolk option`);
    assert.doesNotMatch(cook.body[locale], /63°C|71°C|74°C/, `${locale}: no unrelated meat/fish temperature is assigned to eggs`);
    assert.ok(eggs.item[locale], `${locale}: egg guidance is localized`);
  }
});

test("shepherd's pie uses the ground-lamb endpoint, parallel potato work and six portions", () => {
  const value = recipe("shepherds-pie");
  assert.equal(value.servings, 6);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [30, 95, 125]);
  assert.ok(value.sources.some((source) => source.url === "https://www.greatbritishchefs.com/recipes/shepherds-pie-recipe"));
  assert.ok(value.sources.some((source) => source.url === "https://www.theguardian.com/lifeandstyle/2018/apr/19/the-perfect-shepherds-pie-recipe-felicity-cloake"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource), "FoodSafety.gov ground-meat endpoint is credited");
  const filling = step(value, "Build and simmer the filling");
  const bake = step(value, "Bake until browned and bubbling");
  const endpoint = {
    en: /71°C[\s\S]*2-minute intervals/,
    "zh-hant": /71°C[\s\S]*每次續煮 2 分鐘/,
    ja: /71°C[\s\S]*2分ずつ煮て再確認/,
    ko: /71°C[\s\S]*2분씩 더 끓여 다시/,
    th: /71°C[\s\S]*ครั้งละ 2 นาที/
  };
  const bakeTime = {
    en: /25–30 minutes/,
    "zh-hant": /25–30 分鐘/,
    ja: /25〜30分/,
    ko: /25–30분/,
    th: /25–30 นาที/
  };
  for (const locale of localeOrder) {
    assert.match(filling.body[locale], endpoint[locale], `${locale}: minced lamb reaches 71°C with a timed recheck`);
    assert.doesNotMatch(filling.body[locale], /63°C|74°C/, `${locale}: minced lamb does not use a whole-cut or poultry endpoint`);
    assert.match(bake.body[locale], bakeTime[locale], `${locale}: oven timing is localized`);
    assert.match(bake.body[locale], /10 minutes|10 分鐘|10分|10분|10 นาที/, `${locale}: rest before portioning is explicit`);
  }
  assert.ok(value.cookMinutes >= 80, "95-minute estimate covers potato cooking, browned lamb and vegetables, filling, bake, and rest while potato work overlaps the filling");
});
