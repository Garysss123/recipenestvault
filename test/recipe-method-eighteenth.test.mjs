import assert from "node:assert/strict";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const foodSafetySource = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";

function recipe(id) {
  const value = recipes.find((entry) => entry.id === id);
  assert.ok(value, `${id}: existing recipe exists`);
  for (const locale of localeOrder) {
    assert.ok(value.ingredients.every((row) => row.amount && row.item[locale]), `${id}/${locale}: all ingredients are localized`);
    assert.ok(value.instructions.every((step) => step.title[locale] && step.body[locale]), `${id}/${locale}: all method steps are localized`);
  }
  assert.equal(value.totalMinutes, value.prepMinutes + value.cookMinutes, `${id}: total time adds up`);
  return value;
}

function step(value, title) {
  const found = value.instructions.find((entry) => entry.title.en === title);
  assert.ok(found, `${value.id}: ${title} step exists`);
  return found;
}

test("eighteenth batch covers four more existing recipes and preserves the registry", () => {
  const additions = ["tourtiere", "cocido-madrileno", "enchiladas-verdes", "taiwanese-beef-noodle-soup"];
  assert.equal(recipes.length, 353, "the batch does not add recipes");
  assert.equal(new Set(additions).size, 4, "the four reviewed IDs are distinct");
  for (const id of additions) assert.ok(recipes.some((entry) => entry.id === id), `${id}: registered recipe exists`);
});

test("tourtiere checks ground meat and reheated pie at their respective endpoints and divides eight portions", () => {
  const value = recipe("tourtiere");
  assert.equal(value.servings, 8);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [55, 102, 157]);
  assert.equal(value.ingredients.find((row) => row.item.en === "ground pork")?.amount, "500 g");
  assert.equal(value.ingredients.find((row) => row.item.en === "ground beef")?.amount, "250 g");
  assert.ok(value.sources.some((source) => source.url === "https://parks.canada.ca/culture/gourmand-gourmet/recette-recipe08"));
  assert.ok(value.sources.some((source) => source.url === "https://www.canadianliving.com/food/food-tips/recipe/tourtiere-recipe-and-instructions"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource), "official ground-meat and reheating guidance is credited separately");
  const filling = step(value, "Add potatoes and seasoning");
  const bake = step(value, "Bake until golden");
  const serve = step(value, "Slice and serve");
  const portions = {
    en: /eight equal wedges[\s\S]*eight servings[\s\S]*about 94 g/,
    "zh-hant": /八等份[\s\S]*八人份[\s\S]*94 g/,
    ja: /8人分[\s\S]*8等分[\s\S]*94g/,
    ko: /8인분[\s\S]*8조각[\s\S]*94g/,
    th: /8 ชิ้น[\s\S]*8 ที่[\s\S]*94 กรัม/
  };
  for (const locale of localeOrder) {
    assert.match(filling.body[locale], /71°C/, `${locale}: ground pork and beef reach 71°C`);
    assert.match(filling.body[locale], /2/, `${locale}: the filling has a timed recheck`);
    assert.match(bake.body[locale], /74°C/, `${locale}: baked filling reaches the 74°C reheating endpoint`);
    assert.match(serve.body[locale], portions[locale], `${locale}: eight equal wedges allocate the meat amount`);
  }
  assert.ok(value.cookMinutes >= 25 + 2 + 60 + 15, "cook time covers the 25-minute filling, thickening, longest bake, and rest");
});

test("enchiladas verdes reheats chilled cooked chicken safely and allocates filling and toppings", () => {
  const value = recipe("enchiladas-verdes");
  assert.equal(value.servings, 6);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [35, 35, 70]);
  assert.equal(value.ingredients.find((row) => row.item.en === "cooked chicken, shredded")?.amount, "500 g");
  assert.equal(value.ingredients.find((row) => row.item.en === "corn tortillas")?.amount, "18");
  assert.equal(value.ingredients.find((row) => row.item.en === "Mexican crema")?.amount, "180 g");
  assert.equal(value.ingredients.find((row) => row.item.en === "queso fresco, crumbled")?.amount, "180 g");
  assert.ok(value.sources.some((source) => source.url === "https://patijinich.com/es/enchiladas-verdes/"));
  assert.ok(value.sources.some((source) => source.url === "https://www.mexicoinmykitchen.com/swiss-green-enchiladas/"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource), "official leftover reheating guidance is credited separately");
  const chicken = step(value, "Warm and portion the chicken");
  const filling = step(value, "Fill and roll");
  const finish = step(value, "Finish with cool toppings");
  const chickenAmounts = {
    en: /18 equal portions of about 28 g each \(three portions, about 83 g, per serving\)/,
    "zh-hant": /18 等份、每份約 28 g（每人三份、約 83 g）/,
    ja: /18等分[\s\S]*約28g[\s\S]*1人3個、約83g/,
    ko: /18등분[\s\S]*약 28g[\s\S]*1인당 세 몫, 약 83g/,
    th: /18 ส่วนเท่ากัน[\s\S]*28 กรัม[\s\S]*3 ส่วน รวมประมาณ 83 กรัม/
  };
  for (const locale of localeOrder) {
    assert.match(chicken.body[locale], /74°C/, `${locale}: chilled cooked chicken is reheated to 74°C`);
    assert.match(chicken.body[locale], chickenAmounts[locale], `${locale}: all chicken is divided across 18 tortillas and six servings`);
    assert.match(filling.body[locale], /28/, `${locale}: each tortilla receives one measured share`);
    assert.match(finish.body[locale], /30/, `${locale}: crema and cheese portions are explicit`);
    assert.match(finish.body[locale], /17/, `${locale}: onion portion is explicit`);
  }
});

test("cocido madrileño times the batch, checks only the poultry endpoint, and portions three courses", () => {
  const value = recipe("cocido-madrileno");
  assert.equal(value.servings, 6);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [510, 210, 720]);
  assert.ok(value.sources.some((source) => source.url === "https://www.spain.info/en/recipe/cocido-madrileno/"));
  assert.ok(value.sources.some((source) => source.url === "https://www.cocinatis.com/receta/cocido-madrileno.html"));
  assert.ok(value.sources.some((source) => source.url === foodSafetySource), "official poultry guidance is credited separately");
  const finish = step(value, "Add the potatoes and finish the main pot");
  const soup = step(value, "Make the noodle soup");
  const serve = step(value, "Serve in three vuelcos");
  const soupAmounts = {
    en: /1\.5 L broth[\s\S]*120 g fine noodles[\s\S]*six first-course bowls[\s\S]*250 ml broth[\s\S]*20 g dry noodles per person/,
    "zh-hant": /1\.5 L 主湯[\s\S]*120 g 細麵[\s\S]*六碗[\s\S]*250 ml 湯[\s\S]*20 g 乾麵/,
    ja: /煮汁1\.5L[\s\S]*細麺120g[\s\S]*6人分[\s\S]*250ml[\s\S]*20g/,
    ko: /육수 1\.5L[\s\S]*면 120g[\s\S]*여섯 그릇[\s\S]*250ml[\s\S]*20g/,
    th: /น้ำซุป 1\.5 ลิตร[\s\S]*120 กรัม[\s\S]*6 ชาม[\s\S]*250 มล\.[\s\S]*20 กรัม/
  };
  const sixCoursePortions = {
    en: /divide the chickpeas[\s\S]*evenly among six[\s\S]*share them as evenly as practical/,
    "zh-hant": /平均分給六人[\s\S]*盡量平均分配/,
    ja: /6人に均等に分けます[\s\S]*できるだけ均等に骨髄付き骨とともに供します/,
    ko: /여섯 사람에게 고르게 나눕니다[\s\S]*가능한 한 고르게 나누고/,
    th: /เท่ากัน 6 ที่[\s\S]*แบ่งให้ใกล้เคียงกัน/
  };
  for (const locale of localeOrder) {
    assert.match(finish.body[locale], /74°C/, `${locale}: the thickest chicken thigh reaches the poultry endpoint`);
    assert.doesNotMatch(finish.body[locale], /63°C|71°C/, `${locale}: no unrelated beef or ground-meat endpoint is added`);
    assert.match(soup.body[locale], soupAmounts[locale], `${locale}: first-course broth and noodles are divided six ways`);
    assert.match(serve.body[locale], sixCoursePortions[locale], `${locale}: second and third courses are divided among six`);
  }
  assert.ok(value.cookMinutes >= 25 + 150 + 30 + 5, "cook estimate covers the longest serial simmer and noodle stage; sausage and cabbage run alongside it");
});

test("Taiwanese beef noodle soup prepares the bowls during the braise and allocates each bowl without an unrelated temperature", () => {
  const value = recipe("taiwanese-beef-noodle-soup");
  assert.equal(value.servings, 6);
  assert.deepEqual([value.prepMinutes, value.cookMinutes, value.totalMinutes], [30, 150, 180]);
  assert.ok(value.sources.some((source) => source.url === "https://thewoksoflife.com/taiwanese-beef-noodle-soup-instant-pot/"));
  assert.ok(value.sources.some((source) => source.url === "https://tiffycooks.com/taiwanese-beef-noodle-soup-authentic-family-recipe/"));
  const braise = step(value, "Braise until tender");
  const noodles = step(value, "Cook noodles and greens");
  const serve = step(value, "Assemble each bowl");
  const tenderness = {
    en: /chopstick enters easily but the pieces still hold their shape/,
    "zh-hant": /筷子能輕易插入但肉塊仍完整/,
    ja: /箸がすっと入り、形は保つ/,
    ko: /젓가락이 쉽게 들어가지만 모양은 유지/,
    th: /ตะเกียบแทงเข้าได้ง่ายแต่ชิ้นยังคงรูป/
  };
  for (const locale of localeOrder) {
    assert.match(braise.body[locale], /10/, `${locale}: noodle water and bowls are prepared during the final 10 minutes of braising`);
    assert.match(braise.body[locale], tenderness[locale], `${locale}: the long-braised shank uses a tenderness cue`);
    assert.match(noodles.body[locale], /150/, `${locale}: all 900 g noodles are divided into 150 g portions`);
    assert.match(noodles.body[locale], /50/, `${locale}: bok choy is divided into 50 g portions`);
    assert.match(serve.body[locale], /200/, `${locale}: beef allocation is about 200 g raw-weight equivalent per bowl`);
    assert.match(serve.body[locale], /20/, `${locale}: pickled mustard greens are divided into 20 g per bowl`);
    assert.doesNotMatch(`${braise.body[locale]} ${noodles.body[locale]} ${serve.body[locale]}`, /63°C|71°C|74°C/,
      `${locale}: no unrelated internal temperature is imposed on the long braise`);
  }
});
