import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { recipes } from "../src/recipes.mjs";

const regressionListPath = fileURLToPath(new URL("./recipe-method-regressions.test.mjs", import.meta.url));
const addedIds = ["iraqi-lamb-kofta", "currywurst", "feijao-tropeiro", "vatapa"];
const exclusions = [
  "mapo-tofu", "koshari", "cheeseburger", "tacos-al-pastor", "tiramisu", "creme-brulee",
  "new-york-cheesecake", "chicken-teriyaki", "pizza-margherita", "pad-thai", "butter-chicken",
  "sauerbraten", "panna-cotta", "mango-sticky-rice", "gulab-jamun", "masala-dosa",
  "coffin-bread", "nanaimo-bars"
];
const safetySources = {
  groundMeat: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  seafood: "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely"
};
const newRecipes = new Map(addedIds.map((id) => [id, recipes.find((recipe) => recipe.id === id)]));

function step(recipe, title) {
  const found = recipe.instructions.find((candidate) => candidate.title.en === title);
  assert.ok(found, `${recipe.id}: step exists: ${title}`);
  return found;
}

function officialSource(recipe, url) {
  assert.ok(recipe.sources.some((source) => source.url === url && source.title.startsWith("Official food-safety guidance")),
    `${recipe.id}: official safety source is labelled separately`);
}

function localizedComplete(recipe) {
  for (const locale of localeOrder) {
    assert.ok(recipe.name[locale], `${recipe.id}/${locale}: localized name`);
    assert.ok(recipe.ingredients.every((item) => item.amount && item.item[locale]), `${recipe.id}/${locale}: localized ingredients`);
    assert.ok(recipe.instructions.every((instruction) => instruction.title[locale] && instruction.body[locale]), `${recipe.id}/${locale}: localized method`);
  }
  assert.equal(recipe.totalMinutes, recipe.prepMinutes + recipe.cookMinutes, `${recipe.id}: total time is internally consistent`);
}

test("thirty-third audit adds four existing non-excluded recipes to the five-language route regression", async () => {
  const source = await readFile(regressionListPath, "utf8");
  const list = source.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(list, "shared route regression ID list exists");
  const audited = [...list.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  assert.equal(recipes.length, 353, "recipe registry stays at 353");
  assert.equal(exclusions.length, 18, "the existing 18 exclusions remain explicit");
  assert.equal(audited.length, 196, "shared detail-route regression covers 196 reviewed recipes");
  assert.equal(new Set(audited).size, 196, "shared route IDs remain unique");
  for (const id of addedIds) {
    assert.ok(newRecipes.get(id), `${id}: existing recipe is present`);
    assert.ok(!exclusions.includes(id), `${id}: not on the exclusion list`);
    assert.ok(audited.includes(id), `${id}: included in shared five-language regression`);
    localizedComplete(newRecipes.get(id));
  }
});

test("Iraqi lamb kofta allocates eight timed skewers and verifies ground-lamb safety in every locale", () => {
  const recipe = newRecipes.get("iraqi-lamb-kofta");
  const shape = step(recipe, "Shape eight equal kofta");
  const grill = step(recipe, "Grill evenly for 8–10 minutes");
  const doneness = step(recipe, "Check the centre temperature and rest");
  const serving = step(recipe, "Divide four plates and serve hot");
  const shapeMarkers = {
    en: /800 g[\s\S]*8 equal portions of about 100 g[\s\S]*4 servings/,
    "zh-hant": /800 g[\s\S]*8 等份[\s\S]*100 g[\s\S]*4 份/,
    ja: /羊ひき肉800g[\s\S]*約100g[\s\S]*8等分[\s\S]*4人分/,
    ko: /양고기 다짐육 800g[\s\S]*100g[\s\S]*8등분[\s\S]*4인분/,
    th: /เนื้อแกะบด 800 กรัม[\s\S]*8 ส่วน[\s\S]*100 กรัม[\s\S]*4 ที่/
  };
  for (const locale of localeOrder) {
    assert.match(shape.body[locale], shapeMarkers[locale], `${locale}: eight equal 100 g portions for four servings`);
    assert.match(grill.body[locale], /8[–〜-]10|8–10/, `${locale}: timed grill stage`);
    assert.match(doneness.body[locale], /71°C[\s\S]*160°F[\s\S]*2|71°C \(160°F\)[\s\S]*2/, `${locale}: thermometer endpoint and recheck interval`);
    assert.match(serving.body[locale], /two kebabs|2\s*串|2本|2개|2 ไม้/, `${locale}: two kebabs per plate`);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://www.themediterraneandish.com/kofta-kebab-recipe/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.bbcgoodfoodme.com/recipes/iraqi-lamb-kofta-kebabs/"));
  officialSource(recipe, safetySources.groundMeat);
});

test("currywurst overlaps sauce and sausage cook time and allocates four two-sausage plates", () => {
  const recipe = newRecipes.get("currywurst");
  const sausage = step(recipe, "Brown sausages while the sauce simmers");
  const serving = step(recipe, "Slice, portion, sauce and dust");
  assert.equal(recipe.servings, 4);
  for (const locale of localeOrder) {
    assert.match(sausage.body[locale], /8–10|8~10|8〜10/ , `${locale}: sausage cook interval`);
    assert.match(sausage.body[locale], /71°C[\s\S]*160°F[\s\S]*74°C[\s\S]*165°F[\s\S]*2/, `${locale}: ground-meat and reheating endpoints with rechecks`);
    assert.match(serving.body[locale], /2/, `${locale}: two sausages per person`);
    assert.match(serving.body[locale], /2\.5 g|2\.5g|2,5 g|2,5g|2\.5 กรัม/, `${locale}: final curry allocation per plate`);
    assert.match(serving.body[locale], /0\.5 g|0\.5g|0,5 g|0,5g|0\.5 กรัม/, `${locale}: final salt allocation per plate`);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://www.kitchenstories.com/en/recipes/currywurst-berlin-style-bratwurst-with-curry-sauce"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.rewe.de/rezepte/currywurst/"));
  officialSource(recipe, safetySources.groundMeat);
});

test("feijão tropeiro firms all eggs, accounts for remaining salt, six portions, and prompt chilling", () => {
  const recipe = newRecipes.get("feijao-tropeiro");
  const eggs = step(recipe, "Scramble eggs until firm and safe");
  const serving = step(recipe, "Rest, season and divide six servings");
  assert.equal(recipe.servings, 6);
  for (const locale of localeOrder) {
    assert.match(eggs.body[locale], /71°C[\s\S]*160°F[\s\S]*30/, `${locale}: egg endpoint and recheck interval`);
    assert.match(serving.body[locale], /2 g|2g|2 กรัม|2公克|2g|2g/, `${locale}: reserve the final salt for adjustment`);
    assert.match(serving.body[locale], /6|六/, `${locale}: six servings`);
    assert.match(serving.body[locale], /2 hours|2 小時|2時間|2시간|2 ชั่วโมง/, `${locale}: chill leftovers within two hours`);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://anamariabraga.globo.com/receita/feijao-tropeiro/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://www.receitasnestle.com.br/receitas/feijao-tropeiro"));
  officialSource(recipe, safetySources.groundMeat);
  officialSource(recipe, safetySources.eggs);
});

test("vatapá times 60 minutes of cod boiling plus heat-up, safely cooks shrimp, and portions six rice bowls", () => {
  const recipe = newRecipes.get("vatapa");
  const desalt = step(recipe, "Desalt the cod in three measured changes");
  const shrimp = step(recipe, "Cook shrimp to the seafood endpoint and season");
  const serving = step(recipe, "Rest and divide six measured servings");
  assert.deepEqual([recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes, recipe.servings], [45, 146, 191, 6]);
  for (const locale of localeOrder) {
    assert.match(desalt.body[locale], /6 L|6L|6 升|6 litros|6 ลิตร|6リットル/);
    assert.match(desalt.body[locale], /2 L|2L|2 升|2 litros|2 ลิตร|2リットル/);
    assert.match(desalt.body[locale], /60 minutes|60 分鐘|60分|60분|60 นาที/, `${locale}: sixty minutes total desalting boil`);
    assert.match(desalt.body[locale], /10 minutes|10 分鐘|10分|10분|10 นาที/, `${locale}: heat-up estimate for each water change`);
    assert.match(desalt.body[locale], /30 minutes|30 分鐘|30分|30분|30 นาที/, `${locale}: total estimated heat-up time`);
    assert.match(shrimp.body[locale], /63°C[\s\S]*145°F[\s\S]*1/, `${locale}: shrimp endpoint and recheck interval`);
    assert.match(serving.body[locale], /600 g[\s\S]*6[\s\S]*100 g|600g[\s\S]*6[\s\S]*100g|600 กรัม[\s\S]*6[\s\S]*100 กรัม|600g[\s\S]*6[\s\S]*100g/, `${locale}: 600 g rice divided six ways`);
    assert.match(serving.body[locale], /50 g|50g|50 กรัม|50グラム|50g/);
    assert.match(serving.body[locale], /58 g|58g|58 กรัม|58グラム|58g/);
  }
  assert.ok(recipe.sources.some((source) => source.url === "https://www.saveur.com/article/Recipes/Classic-Brazilian-Shrimp-Stew/"));
  assert.ok(recipe.sources.some((source) => source.url === "https://receitas.globo.com/tipos-de-prato/acompanhamentos/vatapa-531a4c174d38854b79000043.ghtml"));
  officialSource(recipe, safetySources.seafood);
});
