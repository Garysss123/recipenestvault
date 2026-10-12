import assert from "node:assert/strict";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const foodSafetySource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const newIds = ["doro-wat", "filipino-chicken-adobo", "uzbek-plov", "jamaican-jerk-chicken"];
const excludedIds = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa", "coffin-bread", "nanaimo-bars"
];

function recipe(id) {
  const value = recipes.find((entry) => entry.id === id);
  assert.ok(value, `${id}: existing recipe exists`);
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

function assertLocalized(stepValue, patterns, message) {
  for (const locale of localeOrder) assert.match(stepValue.body[locale], patterns[locale], `${locale}: ${message}`);
}

test("nineteenth batch adds four eligible existing recipes without changing the registry or exclusions", () => {
  assert.equal(recipes.length, 353, "the batch does not add recipes");
  assert.equal(new Set(newIds).size, 4, "the four reviewed IDs are distinct");
  for (const id of newIds) {
    assert.ok(recipes.some((entry) => entry.id === id), `${id}: existing recipe is registered`);
    assert.ok(!excludedIds.includes(id), `${id}: is not in the standing exclusion set`);
  }
});

test("Doro Wat times the onion base, checks poultry, and apportions the six servings", () => {
  const value = recipe("doro-wat");
  assert.equal(value.servings, 6);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [50, 120, 170]);
  assert.ok(value.sources.some((source) => source.url === "https://www.foodnetwork.com/fnk/recipes/doro-wat-stewed-chicken-legs-with-berbere-and-eggs-10035303"));
  assert.ok(value.sources.some((source) => source.url === "https://kokiafrique.com/en/dishes/doro-wat/"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource));

  const marinade = step(value, "Season and marinate the chicken");
  const onions = step(value, "Slow-cook the onions");
  const chicken = step(value, "Simmer chicken until tender");
  const eggs = step(value, "Hard-cook the eggs");
  const serve = step(value, "Finish eggs in the sauce");
  assertLocalized(marinade, {
    en: /30 minutes[\s\S]*dice the onions/,
    "zh-hant": /30 分鐘[\s\S]*切洋蔥/,
    ja: /30分[\s\S]*玉ねぎを切り/,
    ko: /30분[\s\S]*양파를 썰고/,
    th: /30 นาที[\s\S]*หั่นหอม/
  }, "the chilled marinade overlaps onion preparation");
  assertLocalized(onions, {
    en: /25–35 minutes[\s\S]*very soft/,
    "zh-hant": /25–35 分鐘[\s\S]*非常軟/,
    ja: /25～35分[\s\S]*非常に柔らかく/,
    ko: /25~35분[\s\S]*아주 부드러워지고/,
    th: /25–35 นาที[\s\S]*นุ่มมาก/
  }, "the onion stage has an appropriate visual endpoint and time range");
  assertLocalized(chicken, {
    en: /74°C \(165°F\)[\s\S]*5 minutes more/,
    "zh-hant": /74°C（165°F）[\s\S]*再燉 5 分鐘/,
    ja: /74°C（165°F）[\s\S]*5分煮て再確認/,
    ko: /74°C \(165°F\)[\s\S]*5분 더 끓이고/,
    th: /74°C \(165°F\)[\s\S]*5 นาทีแล้วตรวจใหม่/
  }, "the thickest poultry piece has a thermometer endpoint and timed recheck");
  assertLocalized(eggs, {
    en: /all 6 eggs[\s\S]*10–12 minutes[\s\S]*yolks are firm/,
    "zh-hant": /6 顆蛋[\s\S]*10–12 分鐘[\s\S]*蛋黃凝固/,
    ja: /卵6個[\s\S]*黄身が固まるまで10～12分/,
    ko: /달걀 6개[\s\S]*노른자가 단단해질 때까지 10~12분/,
    th: /ไข่ทั้ง 6 ฟอง[\s\S]*10–12 นาที[\s\S]*ไข่แดงแข็ง/
  }, "the eggs cook to a firm endpoint while the stew simmers");
  assertLocalized(serve, {
    en: /six[\s\S]*250 g[\s\S]*1 egg[\s\S]*8 injera[\s\S]*2 extra/,
    "zh-hant": /六人[\s\S]*250 g[\s\S]*每人 1 顆蛋[\s\S]*八張 injera[\s\S]*另兩張/,
    ja: /6人[\s\S]*250g[\s\S]*1人1個[\s\S]*インジェラ8枚[\s\S]*残り2枚/,
    ko: /여섯 명[\s\S]*250g[\s\S]*한 명당 1개[\s\S]*인제라 8장[\s\S]*남은 2장/,
    th: /6 คน[\s\S]*250 กรัม[\s\S]*คนละ 1 ฟอง[\s\S]*อินเจรา 8 แผ่น[\s\S]*อีก 2 แผ่น/
  }, "chicken, eggs, and injera are allocated for six");
});

test("Filipino chicken adobo uses the reserved marinade, covers the cook time, and divides rice and chicken", () => {
  const value = recipe("filipino-chicken-adobo");
  assert.equal(value.servings, 4);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [40, 55, 95]);
  assert.ok(value.sources.some((source) => source.url === "https://panlasangpinoy.com/filipino-chicken-adobo-recipe/"));
  assert.ok(value.sources.some((source) => source.url === "https://www.foodnetwork.com/recipes/filipino-chicken-adobo-recipe-1955818"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource));

  const marinade = step(value, "Marinate the chicken");
  const brown = step(value, "Brown the chicken");
  const braise = step(value, "Braise until tender");
  const serve = step(value, "Serve with rice");
  assert.match(marinade.body.en, /all 80 ml soy sauce[\s\S]*Reserve all of this marinade/);
  assertLocalized(brown, {
    en: /two uncrowded batches[\s\S]*3–4 minutes per side/,
    "zh-hant": /分兩批[\s\S]*每面煎約 3–4 分鐘/,
    ja: /2回に分けて[\s\S]*片面約3～4分/,
    ko: /두 번에 나눠[\s\S]*한 면당 약 3~4분/,
    th: /สองรอบ[\s\S]*3–4 นาทีต่อด้าน/
  }, "the chicken is browned in uncrowded batches with a useful time range");
  assertLocalized(braise, {
    en: /all of the reserved soy-garlic marinade[\s\S]*30–35 minutes[\s\S]*74°C \(165°F\)[\s\S]*5 minutes more/,
    "zh-hant": /全部預留的醬油蒜醃汁[\s\S]*30–35 分鐘[\s\S]*74°C（165°F）[\s\S]*再燉 5 分鐘/,
    ja: /漬け汁をすべて[\s\S]*30～35分[\s\S]*74°C（165°F）[\s\S]*5分煮て/,
    ko: /양념장을 전부[\s\S]*30~35분[\s\S]*74°C \(165°F\)[\s\S]*5분 더/,
    th: /น้ำหมักซีอิ๊วและกระเทียมที่เก็บไว้ทั้งหมด[\s\S]*30–35 นาที[\s\S]*74°C \(165°F\)[\s\S]*5 นาที/
  }, "all raw marinade is cooked and the thickest chicken reaches the poultry endpoint");
  assertLocalized(serve, {
    en: /600 g steamed rice[\s\S]*four bowls \(150 g cooked rice each\)[\s\S]*900 g raw bone-in chicken[\s\S]*225 g/,
    "zh-hant": /600 g 熟飯[\s\S]*四碗（每碗 150 g）[\s\S]*900 g 帶骨生雞肉[\s\S]*225 g/,
    ja: /炊いたご飯600g[\s\S]*4杯に分け[\s\S]*150g[\s\S]*900g[\s\S]*225g/,
    ko: /조리된 밥 600g[\s\S]*네 그릇[\s\S]*150g[\s\S]*900g[\s\S]*225g/,
    th: /ข้าวสวย 600 กรัม[\s\S]*4 ชาม[\s\S]*150 กรัม[\s\S]*900 กรัม[\s\S]*225 กรัม/
  }, "cooked rice and raw-weight chicken are divided among four");
});

test("Uzbek plov allocates oil and salt, sequences the zirvak and rice, and serves six without an unrelated temperature", () => {
  const value = recipe("uzbek-plov");
  assert.equal(value.servings, 6);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [30, 125, 155]);
  assert.equal(value.ingredients.find((row) => row.item.en === "neutral oil")?.amount, "100 ml");
  assert.equal(value.ingredients.find((row) => row.item.en === "salt")?.amount, "12 g");
  assert.ok(value.sources.some((source) => source.url === "https://foodperestroika.com/2013/10/18/traditional-uzbek-plov/"));
  assert.ok(value.sources.some((source) => source.url === "https://www.177milkstreet.com/recipes/plov-chicken"));

  const rice = step(value, "Rinse and soak the rice");
  const lamb = step(value, "Brown the lamb");
  const vegetables = step(value, "Cook the onion and carrot");
  const zirvak = step(value, "Build the zirvak");
  const layer = step(value, "Layer the rice");
  const steam = step(value, "Steam covered until tender");
  const serve = step(value, "Rest and serve communally");
  assertLocalized(rice, {
    en: /all 400 g rice[\s\S]*20–30 minutes/,
    "zh-hant": /全部 400 g 米[\s\S]*20–30 分鐘/,
    ja: /米400g[\s\S]*20～30分/,
    ko: /쌀 400g[\s\S]*20~30분/,
    th: /ข้าว 400 กรัม[\s\S]*20–30 นาที/
  }, "the rice soak overlaps ingredient preparation");
  for (const locale of localeOrder) {
    assert.match(lamb.body[locale], /60/ , `${locale}: 60 ml of the 100 ml oil is allocated to browning`);
    assert.match(vegetables.body[locale], /20/ , `${locale}: remaining oil is split between onion and carrot`);
    assert.match(zirvak.body[locale], /700/ , `${locale}: all listed water starts the zirvak`);
    assert.match(layer.body[locale], /4/ , `${locale}: the remaining salt is allocated with the rice water`);
    assert.match(steam.body[locale], /15|15～20|15~20|15–20/ , `${locale}: covered steaming has a time range`);
    assert.doesNotMatch(`${zirvak.body[locale]} ${layer.body[locale]} ${steam.body[locale]}`, /(?:63|71|74)°C/,
      `${locale}: the cubed lamb braise gets a tenderness endpoint rather than an unrelated fixed temperature`);
  }
  assertLocalized(zirvak, {
    en: /8 g salt[\s\S]*45–60 minutes[\s\S]*nearly fork-tender/,
    "zh-hant": /8 g 鹽[\s\S]*45–60 分鐘[\s\S]*叉子可輕易刺入/,
    ja: /塩8g[\s\S]*45～60分[\s\S]*フォークがほぼ通る/,
    ko: /소금 8g[\s\S]*45~60분[\s\S]*포크가 거의 들어갈 만큼 부드럽고/,
    th: /เกลือ 8 กรัม[\s\S]*45–60 นาที[\s\S]*ส้อมแทงเนื้อได้เกือบนุ่ม/
  }, "the zirvak has a time range and fork-tender endpoint");
  assertLocalized(layer, {
    en: /remaining 4 g salt[\s\S]*1 cm above the rice[\s\S]*separate from the 700 ml/,
    "zh-hant": /剩餘 4 g 鹽[\s\S]*高於米面約 1 cm[\s\S]*700 ml 分開/,
    ja: /残りの塩4g[\s\S]*約1cm上[\s\S]*700mlとは別/,
    ko: /남은 소금 4g[\s\S]*약 1cm 높게[\s\S]*700ml와 별도/,
    th: /เกลือ 4 กรัม[\s\S]*ประมาณ 1 ซม\.[\s\S]*700 มล\./
  }, "rice water and the second salt allocation are explicit");
  assertLocalized(serve, {
    en: /six servings[\s\S]*83 g raw lamb[\s\S]*67 g dry rice/,
    "zh-hant": /六份[\s\S]*83 g 生羊肉[\s\S]*67 g 乾米/,
    ja: /6人分[\s\S]*83g[\s\S]*67g/,
    ko: /여섯 몫[\s\S]*83g[\s\S]*67g/,
    th: /6 ที่[\s\S]*83 กรัม[\s\S]*67 กรัม/
  }, "raw lamb and dry rice equivalents are divided among six");
});

test("Jamaican jerk chicken allocates oil, times both grill zones, checks poultry, and divides eight pieces", () => {
  const value = recipe("jamaican-jerk-chicken");
  assert.equal(value.servings, 4);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [260, 45, 305]);
  assert.ok(value.sources.some((source) => source.url === "https://www.foodnetwork.com/recipes/ree-drummond/jerk-chicken-3329367"));
  assert.ok(value.sources.some((source) => source.url === "https://www.bonappetit.com/recipe/jamaican-jerk-chicken"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource));

  const blend = step(value, "Blend the jerk seasoning");
  const marinade = step(value, "Coat and marinate");
  const grill = step(value, "Prepare the grill");
  const sear = step(value, "Sear the chicken");
  const indirect = step(value, "Finish over indirect heat");
  const serve = step(value, "Rest and serve");
  for (const locale of localeOrder) {
    assert.match(blend.body[locale], /20/ , `${locale}: 20 ml of the oil is used in the paste`);
    assert.match(blend.body[locale], /5/ , `${locale}: 5 ml oil is reserved for the grate`);
    assert.match(marinade.body[locale], /4/ , `${locale}: the chicken marinates for at least four hours`);
    assert.match(grill.body[locale], /10/ , `${locale}: grill setup has an approximate time`);
    assert.match(sear.body[locale], /10/ , `${locale}: direct-heat sear is timed`);
    assert.match(indirect.body[locale], /15/ , `${locale}: indirect-heat finish is timed`);
    assert.match(indirect.body[locale], /74°C/ , `${locale}: poultry reaches 74°C`);
    assert.match(indirect.body[locale], /3/ , `${locale}: poultry endpoint has an interval recheck`);
  }
  assertLocalized(serve, {
    en: /5 minutes[\s\S]*8 pieces[\s\S]*four servings, two pieces per person[\s\S]*300 g/,
    "zh-hant": /5 分鐘[\s\S]*八塊[\s\S]*四份，每人兩塊[\s\S]*300 g/,
    ja: /5分[\s\S]*8切れ[\s\S]*4人分[\s\S]*1人2切れ[\s\S]*300g/,
    ko: /5분[\s\S]*8조각[\s\S]*네 몫[\s\S]*1인당 두 조각[\s\S]*300g/,
    th: /5 นาที[\s\S]*8 ชิ้น[\s\S]*4 ที่[\s\S]*คนละ 2 ชิ้น[\s\S]*300 กรัม/
  }, "eight pieces are served as two per person");
});
