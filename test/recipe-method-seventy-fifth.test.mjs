import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["pineapple-cakes", "montreal-style-bagels", "fasolada", "aloo-gobi"];
const urls = {
  egg: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  flour: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know",
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety",
  storage: "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"
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
      `${dish.id}: official guidance is credited separately: ${url}`);
  }
  assert.ok(dish.sources.filter((source) => !source.title.startsWith("Official food-safety guidance")).length >= 2,
    `${dish.id}: at least two culinary references remain separate from official guidance`);
}

test("seventy-fifth batch adds four genuinely incomplete eligible slugs to exact five-locale coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -39);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 296);
  assert.equal(new Set(beforeThisBatch).size, 296);
  assert.equal(covered.length, 335);
  assert.equal(new Set(covered).size, 335);
  assert.deepEqual(covered.slice(-39, -35), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 39);
  assert.equal(recipes.length - excluded.length - covered.length, 0);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the exact 296-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("the four publication revisions keep source drafts, natural step counts, and illustration mappings intact", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: published method was improved`);
    assert.notDeepEqual(published.storage, draft.storage, `${id}: storage guidance was refined`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: official safety references were added`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural method step count is preserved`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: illustration scenes are unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration count matches the method`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    if (["fasolada", "aloo-gobi"].includes(id)) {
      assert.equal(published.ingredients.length, draft.ingredients.length + 1, `${id}: only a measured water reserve was added`);
      assert.deepEqual(published.ingredients.slice(0, draft.ingredients.length), draft.ingredients, `${id}: existing ingredients and amounts are unchanged`);
      assert.ok(published.ingredients.at(-1).item.en.includes("water"), `${id}: correction water is listed`);
    } else {
      assert.deepEqual(published.ingredients, draft.ingredients, `${id}: ingredients and amounts are unchanged`);
    }
    for (const locale of localeOrder) {
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: full method is localized`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage guidance is localized`);
      assert.ok(draft.instructions.every((entry) => entry.body[locale]), `${id}/${locale}: source draft remains complete`);
    }
  }
});

test("pineapple cakes verify the egg pastry and recover from pale or early-browning crust", () => {
  const dish = recipe("pineapple-cakes");
  const pastry = step(dish, "Make the tender pastry").body;
  const bake = step(dish, "Bake and flip the molds").body;
  allLocales(pastry, {
    en: /Do not taste the raw dough[\s\S]*flour is raw[\s\S]*Wash hands/,
    "zh-hant": /不要試吃生麵糰[\s\S]*麵粉屬生食[\s\S]*清洗雙手/,
    ja: /生地を味見しません[\s\S]*小麦粉は生の食品[\s\S]*手、器具、作業台を洗います/,
    ko: /생반죽을 맛보지 마세요[\s\S]*밀가루는 익히지 않은 식품[\s\S]*손과 도구, 작업대를 씻습니다/,
    th: /อย่าชิมแป้งดิบ[\s\S]*แป้งยังไม่ผ่านความร้อน[\s\S]*ล้างมือ/,
  }, "raw flour and egg are handled without tasting dough");
  allLocales(bake, {
    en: /71°C \(160°F\)[\s\S]*no wet dough[\s\S]*below 71°C[\s\S]*2-minute increments[\s\S]*160°C/,
    "zh-hant": /71°C（160°F）[\s\S]*濕麵糰[\s\S]*低於 71°C[\s\S]*續烤 2 分鐘[\s\S]*160°C/,
    ja: /71°C（160°F）[\s\S]*湿った生地[\s\S]*71°C未満[\s\S]*2分ずつ[\s\S]*160°C/,
    ko: /71°C \(160°F\)[\s\S]*젖은 반죽[\s\S]*71°C보다 낮거나[\s\S]*2분씩[\s\S]*160°C/,
    th: /71°C \(160°F\)[\s\S]*แป้งเปียก[\s\S]*ต่ำกว่า 71°C[\s\S]*ครั้งละ 2 นาที[\s\S]*160°C/,
  }, "egg-containing pastry has a measured endpoint and protected re-bake path");
  allLocales(dish.storage, {
    en: /4°C \(40°F\)[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*高於 32°C／90°F 時 1 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*32°C\/90°F보다 높은 환경에서는 1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /4°C \(40°F\)[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/,
  }, "egg pastry leftovers are chilled and reheated safely");
  official(dish, [urls.egg, urls.flour, urls.temperatures, urls.handling, urls.storage]);
});

test("Montreal bagels test the crumb and correct an underdone centre without scorching sesame", () => {
  const dish = recipe("montreal-style-bagels");
  allLocales(step(dish, "Mix and knead the dough").body, {
    en: /Do not taste the raw dough[\s\S]*flour is raw[\s\S]*Wash hands/,
    "zh-hant": /不要試吃生麵糰[\s\S]*麵粉屬生食[\s\S]*清洗雙手/,
    ja: /生地を味見しません[\s\S]*小麦粉は生の食品[\s\S]*手、器具、作業台を洗います/,
    ko: /생반죽을 맛보지 마세요[\s\S]*밀가루는 익히지 않은 식품[\s\S]*손과 도구, 작업대를 씻습니다/,
    th: /อย่าชิมโดดิบ[\s\S]*แป้งยังไม่ผ่านความร้อน[\s\S]*ล้างมือ/,
  }, "raw flour and egg are handled safely");
  allLocales(step(dish, "Bake until deep golden").body, {
    en: /71°C \(160°F\)[\s\S]*set and chewy[\s\S]*no wet stripe[\s\S]*below 71°C[\s\S]*200°C[\s\S]*3-minute increments/,
    "zh-hant": /71°C（160°F）[\s\S]*有嚼勁[\s\S]*沒有濕黏夾層[\s\S]*低於 71°C[\s\S]*續烤 3 分鐘[\s\S]*200°C/,
    ja: /71°C（160°F）[\s\S]*むっちりと固まり[\s\S]*湿った筋がない[\s\S]*71°C未満[\s\S]*3分追加[\s\S]*200°C/,
    ko: /71°C \(160°F\)[\s\S]*젖은 줄 없이[\s\S]*탄력 있게 익어야[\s\S]*71°C보다 낮거나[\s\S]*3분 더[\s\S]*200°C/,
    th: /71°C \(160°F\)[\s\S]*เซ็ต[\s\S]*แถบแป้งเปียก[\s\S]*ต่ำกว่า 71°C[\s\S]*3 นาที[\s\S]*200°C/,
  }, "egg-containing dough reaches its endpoint with a lower-heat correction");
  allLocales(dish.storage, {
    en: /4°C \(40°F\)[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*高於 32°C／90°F 時 1 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*32°C\/90°F보다 높은 환경에서는 1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /4°C \(40°F\)[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/,
  }, "egg-containing bagels are cooled, stored, and reheated safely");
  official(dish, [urls.egg, urls.flour, urls.temperatures, urls.handling, urls.storage]);
});

test("Fasolada checks bean centres and extends the simmer by measured amounts", () => {
  const dish = recipe("fasolada");
  assert.equal(dish.ingredients.at(-1).amount, "0–300 ml");
  allLocales(step(dish, "Parboil until partly tender").body, {
    en: /Test three of the largest beans[\s\S]*begin to yield[\s\S]*firm enough[\s\S]*10 minutes more and retest/,
    "zh-hant": /取最大豆子三顆測試[\s\S]*中心剛開始變軟[\s\S]*仍能保持完整[\s\S]*續煮 10 分鐘再測/,
    ja: /最も大きい豆を3粒[\s\S]*中心が少し崩れ始める[\s\S]*形を保つ硬さ[\s\S]*10分追加して再確認/,
    ko: /가장 큰 콩 3개[\s\S]*중심이 눌리기 시작[\s\S]*모양은 유지[\s\S]*10분 더 끓이고 다시 확인/,
    th: /ถั่วเม็ดใหญ่ที่สุด 3 เม็ด[\s\S]*เริ่มนิ่มเมื่อกด[\s\S]*ยังคงรูป[\s\S]*เคี่ยวต่อ 10 นาทีแล้วตรวจซ้ำ/,
  }, "partly cooked white beans have a texture test and correction");
  allLocales(step(dish, "Simmer until creamy inside").body, {
    en: /Test three of the largest beans[\s\S]*no hard or chalky centre[\s\S]*10-minute increments[\s\S]*up to 300 ml[\s\S]*reserved boiling water[\s\S]*100 ml at a time/,
    "zh-hant": /最大豆子三顆測試[\s\S]*沒有硬芯或粉硬感[\s\S]*每次續煮 10 分鐘[\s\S]*預留沸水 100 毫升[\s\S]*總量最多 300 毫升/,
    ja: /最も大きい豆を3粒[\s\S]*硬い芯や粉っぽさがない[\s\S]*10分ずつ追加[\s\S]*熱湯を100mlずつ[\s\S]*最大300ml/,
    ko: /가장 큰 콩 3개[\s\S]*단단하거나 가루 같은 심이 없는지[\s\S]*10분씩 더[\s\S]*끓는 물을 100ml씩[\s\S]*최대 300ml/,
    th: /ถั่วเม็ดใหญ่ที่สุด 3 เม็ด[\s\S]*ไม่มีแกนแข็งหรือเป็นผง[\s\S]*ครั้งละ 10 นาที[\s\S]*น้ำเดือดที่แบ่งไว้ครั้งละ 100 มล\.[\s\S]*รวมไม่เกิน 300 มล\./,
  }, "final white-bean doneness and rescue are explicit");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(dish, "Simmer until creamy inside").body[locale], /71°C|160°F|63°C|145°F/,
      `${locale}: no meat or egg endpoint is applied to white beans`);
    assert.match(dish.storage[locale], /74°C/,
      `${locale}: 74°C is reserved for reheating cooked leftovers`);
  }
  allLocales(dish.storage, {
    en: /shallow containers[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*3 days[\s\S]*official 3–4-day window[\s\S]*74°C \(165°F\)/,
    "zh-hant": /淺容器[\s\S]*2 小時內[\s\S]*高於 32°C／90°F 時 1 小時內[\s\S]*3 天內[\s\S]*官方蔬菜湯與燉菜冷藏期限為 3–4 天[\s\S]*74°C（165°F）/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*3日以内[\s\S]*3〜4日の範囲[\s\S]*74°C（165°F）/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*32°C\/90°F보다 높은 환경에서는 1시간 안에[\s\S]*3일 안에[\s\S]*3–4일 안에서[\s\S]*74°C \(165°F\)/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*ภายใน 3 วัน[\s\S]*ช่วง 3–4 วัน[\s\S]*74°C \(165°F\)/,
  }, "bean soup storage follows general soup and leftover guidance");
  official(dish, [urls.temperatures, urls.handling, urls.storage]);
});

test("Aloo Gobi uses vegetable texture rather than an unrelated internal temperature", () => {
  const dish = recipe("aloo-gobi");
  assert.equal(dish.ingredients.at(-1).amount, "0–45 ml");
  assert.match(dish.ingredients.at(-1).item.en, /up to 15 ml[\s\S]*up to 30 ml/);
  allLocales(step(dish, "Steam-fry until tender").body, {
    en: /largest potato cube[\s\S]*thickest cauliflower stem[\s\S]*no hard or chalky core[\s\S]*if either is firm after 12 minutes[\s\S]*15 ml[\s\S]*3 minutes more[\s\S]*up to 30 ml/,
    "zh-hant": /最大塊馬鈴薯[\s\S]*最粗的花椰菜梗[\s\S]*沒有硬芯或粉硬感[\s\S]*若 12 分鐘後仍硬[\s\S]*15 毫升[\s\S]*續煮 3 分鐘[\s\S]*最多共 30 毫升/,
    ja: /最も大きいじゃがいも[\s\S]*最も太いカリフラワー[\s\S]*硬い芯や粉っぽさ[\s\S]*12分後も硬ければ[\s\S]*15ml[\s\S]*3分追加[\s\S]*合計30mlまで/,
    ko: /가장 큰 감자[\s\S]*가장 굵은 콜리플라워 줄기[\s\S]*단단하거나 가루 같은 심[\s\S]*12분 뒤에도 단단하면[\s\S]*15ml[\s\S]*3분 더[\s\S]*총 30ml/,
    th: /มันฝรั่งชิ้นใหญ่ที่สุด[\s\S]*ก้านกะหล่ำดอกที่หนาที่สุด[\s\S]*ไม่มีแกนแข็งหรือเป็นผง[\s\S]*ผ่าน 12 นาทีแล้วยังแข็ง[\s\S]*15 มล\.[\s\S]*3 นาที[\s\S]*ไม่เกิน 30 มล\./,
  }, "largest vegetable pieces have a texture endpoint and measured steaming correction");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(dish, "Steam-fry until tender").body[locale], /71°C|160°F|63°C|145°F|74°C/,
      `${locale}: no meat or egg cooking temperature is applied to vegetables`);
    assert.match(dish.storage[locale], /74°C/,
      `${locale}: 74°C appears only in cooked-leftover reheating guidance`);
  }
  allLocales(dish.storage, {
    en: /shallow containers[\s\S]*4°C \(40°F\)[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*Use within 3 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /淺容器[\s\S]*2 小時內[\s\S]*高於 32°C／90°F 時 1 小時內[\s\S]*4°C（40°F）[\s\S]*3 天內[\s\S]*74°C（165°F）/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*4°C（40°F）[\s\S]*3日以内[\s\S]*74°C（165°F）/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*32°C\/90°F보다 높은 환경에서는 1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3일 안에[\s\S]*74°C \(165°F\)/,
    th: /ภาชนะตื้น[\s\S]*4°C \(40°F\)[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*ภายใน 3 วัน[\s\S]*74°C \(165°F\)/,
  }, "vegetable leftovers are cooled, refrigerated, and reheated safely");
  official(dish, [urls.temperatures, urls.handling, urls.storage]);
});
