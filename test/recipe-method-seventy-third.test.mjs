import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["gigantes-plaki", "pao-de-queijo", "sticky-toffee-pudding", "campfire-bannock"];
const urls = {
  eggs: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  flour: "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts",
  temperatures: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
  handling: "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety"
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
    `${dish.id}: two culinary references remain separate from official guidance`);
}

test("seventy-third batch appends four unchecked, non-excluded slugs to exact historical coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -36);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 288);
  assert.equal(new Set(beforeThisBatch).size, 288);
  assert.equal(covered.length, 324);
  assert.equal(new Set(covered).size, 324);
  assert.deepEqual(covered.slice(-36, -32), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 47);
  assert.equal(recipes.length - excluded.length - covered.length, 11);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the exact 288-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("the four publication revisions preserve source drafts, ingredient facts, natural steps, and illustrations", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: published method changed`);
    assert.deepEqual(published.ingredients, draft.ingredients, `${id}: no ingredient row or amount changed`);
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: source illustration mapping is unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration count matches the method`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    for (const locale of localeOrder) {
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: method is complete`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage guidance is localized`);
    }
    if (id === "campfire-bannock") {
      assert.deepEqual(published.storage, draft.storage, `${id}: untouched storage remains intact`);
    } else {
      assert.notDeepEqual(published.storage, draft.storage, `${id}: publication storage change did not alter its source draft`);
    }
  }
});

test("gigantes tests beans before acid, finishes the meatless casserole safely, and handles undercooking", () => {
  const dish = recipe("gigantes-plaki");
  allLocales(step(dish, "Simmer until almost tender").body, {
    en: /Test three of the largest beans[\s\S]*creamy between two fingers[\s\S]*chalky or firm[\s\S]*10-minute increments[\s\S]*Do not add the acidic tomato sauce/,
    "zh-hant": /挑三顆最大豆子測試[\s\S]*壓成綿軟泥狀[\s\S]*粉硬或有硬芯[\s\S]*續煮 10 分鐘[\s\S]*不要加入酸性的番茄醬汁/,
    ja: /最も大きい豆を3粒[\s\S]*クリーミーにつぶれる[\s\S]*粉っぽい芯や硬さ[\s\S]*10分ずつ[\s\S]*酸味のあるトマトソースを加えません/,
    ko: /콩 3개를 골라[\s\S]*크리미하게 으깨져야[\s\S]*가루처럼 퍽퍽하거나 단단하면[\s\S]*10분씩 더 끓입니다[\s\S]*토마토 소스를 넣지 마세요/,
    th: /ถั่วเม็ดใหญ่ 3 เม็ด[\s\S]*กดแล้วเละนุ่มเป็นครีม[\s\S]*เป็นไตแข็งหรือเป็นผง[\s\S]*ครั้งละ 10 นาที[\s\S]*อย่าใส่ซอสมะเขือเทศ/
  }, "beans are tested before acid can stall softening, with a measured correction");
  allLocales(step(dish, "Bake until caramelized at the edges").body, {
    en: /meatless bean casserole[\s\S]*74°C \(165°F\)[\s\S]*cover loosely with foil[\s\S]*5-minute increments[\s\S]*15 ml of the reserved hot bean liquid[\s\S]*final 15 ml/,
    "zh-hant": /無肉豆類砂鍋[\s\S]*74°C（165°F）[\s\S]*鬆鬆蓋上鋁箔[\s\S]*續烤 5 分鐘[\s\S]*15 毫升預留熱豆水[\s\S]*最後 15 毫升/,
    ja: /肉を使わない豆のキャセロール[\s\S]*74°C（165°F）[\s\S]*アルミホイルをふんわり[\s\S]*5分ずつ[\s\S]*豆のゆで汁15ml[\s\S]*残りの15ml/,
    ko: /고기가 없는 콩 캐서롤[\s\S]*74°C ?\(165°F\)[\s\S]*포일을 느슨하게 덮고[\s\S]*5분씩[\s\S]*삶은 물 15ml[\s\S]*남은 15ml/,
    th: /แคสเซอโรลถั่วที่ไม่มีเนื้อสัตว์[\s\S]*74°C \(165°F\)[\s\S]*คลุมฟอยล์หลวม ๆ[\s\S]*ครั้งละ 5 นาที[\s\S]*น้ำต้มถั่วร้อนที่แบ่งไว้ 15 มล\.[\s\S]*15 มล\.สุดท้าย/
  }, "the official meatless-casserole endpoint is used with a foil and moisture recovery");
  allLocales(step(dish, "Combine beans and sauce").body, {
    en: /270 ml of the reserved cooking liquid[\s\S]*remaining 30 ml hot as a moisture reserve/,
    "zh-hant": /保留煮汁中的 270 毫升[\s\S]*剩下 30 毫升煮汁保溫/,
    ja: /取り分けたゆで汁270ml[\s\S]*残りの30ml/,
    ko: /남겨 둔 삶은 물 270ml[\s\S]*남은 삶은 물 30ml/,
    th: /น้ำต้มที่แบ่งไว้ 270 มล\.[\s\S]*น้ำต้มอีก 30 มล\./
  }, "all 300 ml of listed bean liquid is allocated, with a measured reserve for baking");
  allLocales(dish.storage, {
    en: /shallow containers[\s\S]*within 2 hours[\s\S]*within 1 hour above 32°C\/90°F[\s\S]*3 days[\s\S]*74°C\/165°F/,
    "zh-hant": /淺容器[\s\S]*2 小時內[\s\S]*高於 32°C\/90°F 時須於 1 小時內[\s\S]*3 天內[\s\S]*74°C\/165°F/,
    ja: /浅い容器[\s\S]*2時間以内[\s\S]*32°C\/90°Fを超える場合は1時間以内[\s\S]*3日以内[\s\S]*74°C\/165°F/,
    ko: /얕은 용기[\s\S]*2시간 안에[\s\S]*32°C\/90°F보다 높으면 1시간 안에[\s\S]*3일 안에[\s\S]*74°C\/165°F/,
    th: /ภาชนะตื้น[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมง[\s\S]*32°C\/90°F[\s\S]*ภายใน 3 วัน[\s\S]*74°C\/165°F/
  }, "cooling time and reheating temperature fit cooked beans and casserole");
  official(dish, [urls.temperatures, urls.handling]);
});

test("pão de queijo portions measured corrections and checks the egg-containing centre", () => {
  const dish = recipe("pao-de-queijo");
  assert.equal(dish.ingredients.find((row) => row.item.en.startsWith("tapioca starch"))?.amount, "240 g");
  allLocales(step(dish, "Add eggs and cheese").body, {
    en: /in 3 additions[\s\S]*hold a soft mound[\s\S]*reserved hot water 5 ml at a time, up to 15 ml[\s\S]*reserved starch 5 g at a time, up to 15 g/,
    "zh-hant": /分 3 次[\s\S]*保持柔軟小丘[\s\S]*每次加入 5 毫升預留熱水，最多 15 毫升[\s\S]*每次揉入 5 公克預留樹薯粉，最多 15 公克/,
    ja: /3回に分けて[\s\S]*柔らかな山を保てば[\s\S]*熱い水を5mlずつ、最大15ml[\s\S]*でんぷんを5gずつ、最大15g/,
    ko: /3번 나누어[\s\S]*부드러운 봉우리를 유지[\s\S]*뜨거운 물을 5ml씩 최대 15ml[\s\S]*전분을 5g씩 최대 15g/,
    th: /3 รอบ[\s\S]*ตั้งเป็นก้อนนุ่ม[\s\S]*น้ำร้อนที่แบ่งไว้ครั้งละ 5 มล\. ได้ไม่เกิน 15 มล\.[\s\S]*แป้งมันที่แบ่งไว้ครั้งละ 5 กรัม ได้ไม่เกิน 15 กรัม/
  }, "the dough uses reserved portions of listed ingredients for measured recovery");
  allLocales(step(dish, "Bake until freckled").body, {
    en: /71°C \(160°F\)[\s\S]*not wet or pasty[\s\S]*3-minute increments[\s\S]*lower the oven to 180°C/,
    "zh-hant": /71°C（160°F）[\s\S]*不可濕黏或糊口[\s\S]*每次續烤 3 分鐘[\s\S]*降至 180°C/,
    ja: /71°C（160°F）[\s\S]*生地状に湿らず[\s\S]*3分ずつ[\s\S]*180°Cに下げ/,
    ko: /71°C ?\(160°F\)[\s\S]*생반죽이나 풀처럼 끈적이지 않고[\s\S]*3분씩[\s\S]*180°C로 낮춰/,
    th: /71°C \(160°F\)[\s\S]*ไม่เปียกหรือเป็นแป้งเหนียว[\s\S]*ครั้งละ 3 นาที[\s\S]*ลดเตาเหลือ 180°C/
  }, "the egg dish reaches its official temperature and has a visual texture check");
  allLocales(dish.storage, {
    en: /contain egg and cheese[\s\S]*within 2 hours[\s\S]*FDA guidance allows cooked egg dishes 3–4 days[\s\S]*74°C\/165°F/,
    "zh-hant": /含蛋與起司[\s\S]*2 小時內[\s\S]*FDA 指引[\s\S]*熟蛋料理冷藏期限為 3–4 天[\s\S]*74°C\/165°F/,
    ja: /卵とチーズ[\s\S]*2時間以内[\s\S]*FDAの案内[\s\S]*3〜4日[\s\S]*74°C\/165°F/,
    ko: /달걀과 치즈[\s\S]*2시간 안에[\s\S]*FDA 지침[\s\S]*3–4일[\s\S]*74°C\/165°F/,
    th: /มีไข่และชีส[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*แนวทาง FDA[\s\S]*3–4 วัน[\s\S]*74°C\/165°F/
  }, "room-temperature storage is replaced by egg-appropriate refrigeration and reheating");
  official(dish, [urls.eggs, urls.temperatures, urls.handling]);
});

test("sticky toffee pudding checks egg doneness, rescues over-browning, and repairs sauce thickness", () => {
  const dish = recipe("sticky-toffee-pudding");
  allLocales(step(dish, "Bake the sponge").body, {
    en: /71°C \(160°F\)[\s\S]*skewer[\s\S]*3 minutes longer[\s\S]*tent it loosely with foil/,
    "zh-hant": /71°C（160°F）[\s\S]*竹籤[\s\S]*再烤 3 分鐘[\s\S]*鬆鬆蓋上鋁箔/,
    ja: /71°C（160°F）[\s\S]*竹串[\s\S]*3分追加[\s\S]*アルミホイルをふんわり/,
    ko: /71°C ?\(160°F\)[\s\S]*꼬치[\s\S]*3분 더[\s\S]*포일을 느슨하게 덮습니다/,
    th: /71°C ?\(160°F\)[\s\S]*ไม้เสียบ[\s\S]*อบต่อ 3 นาที[\s\S]*คลุมฟอยล์หลวม ๆ/
  }, "egg safety and cake doneness are checked without drying the top");
  allLocales(step(dish, "Cook the toffee sauce").body, {
    en: /Reserve 15 ml[\s\S]*remaining 185 ml[\s\S]*5–6 minutes[\s\S]*reserved warm cream 5 ml at a time/,
    "zh-hant": /預留 15 毫升[\s\S]*其餘 185 毫升[\s\S]*5–6 分鐘[\s\S]*每次拌入 5 毫升預留溫鮮奶油/,
    ja: /15mlを取り分け[\s\S]*残りの185ml[\s\S]*5〜6分[\s\S]*温かいクリームを5mlずつ/,
    ko: /15ml는 남기고[\s\S]*나머지 185ml[\s\S]*5–6분[\s\S]*따뜻한 크림을 5ml씩/,
    th: /แบ่งครีม[\s\S]*15 มล\.[\s\S]*185 มล\.[\s\S]*5–6 นาที[\s\S]*ครีมอุ่นที่แบ่งไว้ลงไปครั้งละ 5 มล\./
  }, "a measured reserve corrects sauce that thickens as it cools");
  allLocales(dish.storage, {
    en: /egg and dairy[\s\S]*within 2 hours[\s\S]*3 days[\s\S]*74°C\/165°F/,
    "zh-hant": /含蛋及乳製品[\s\S]*2 小時內[\s\S]*3 天內[\s\S]*74°C\/165°F/,
    ja: /卵と乳製品[\s\S]*2時間以内[\s\S]*3日以内[\s\S]*74°C\/165°F/,
    ko: /달걀과 유제품[\s\S]*2시간 안에[\s\S]*3일 안에[\s\S]*74°C\/165°F/,
    th: /ไข่กับผลิตภัณฑ์นม[\s\S]*ภายใน 2 ชั่วโมง[\s\S]*ภายใน 3 วัน[\s\S]*74°C\/165°F/
  }, "perishable egg and cream dessert storage matches the official guidance");
  official(dish, [urls.eggs, urls.temperatures, urls.handling]);
});

test("campfire bannock cooks raw flour through without an unrelated meat temperature", () => {
  const dish = recipe("campfire-bannock");
  allLocales(step(dish, "Make a soft dough").body, {
    en: /Do not taste the raw dough[\s\S]*flour[\s\S]*cooked fully/,
    "zh-hant": /不要試吃生麵糰[\s\S]*麵粉[\s\S]*徹底烹熟/,
    ja: /生の生地は味見しません[\s\S]*小麦粉[\s\S]*十分に加熱/,
    ko: /생반죽은 맛보지 마세요[\s\S]*밀가루[\s\S]*완전히 익혀야/,
    th: /อย่าชิมแป้งดิบ[\s\S]*แป้งที่ยังไม่ผ่านความร้อน[\s\S]*ปรุงให้สุกทั่ว/
  }, "the raw flour warning is actionable and has no inappropriate internal temperature");
  allLocales(step(dish, "Cook slowly until golden").body, {
    en: /7–9 minutes per side[\s\S]*cutting through its centre[\s\S]*no wet, gummy stripe[\s\S]*cooler embers[\s\S]*2-minute increments/,
    "zh-hant": /每面煎 7–9 分鐘[\s\S]*切開第一片最厚處[\s\S]*不能有濕黏生麵糰帶[\s\S]*較弱的炭火[\s\S]*以 2 分鐘為單位/,
    ja: /片面7〜9分[\s\S]*最も厚い中心を切って[\s\S]*湿った粘りのある生地が残らない[\s\S]*弱い熾火[\s\S]*2分ずつ/,
    ko: /한 면당 7–9분[\s\S]*가장 두꺼운 가운데를 잘라[\s\S]*젖고 끈적한 반죽 줄이 없어야[\s\S]*더 약한 숯불[\s\S]*2분씩/,
    th: /ด้านละ 7–9 นาที[\s\S]*ผ่าตรงกลาง[\s\S]*ไม่มีแถบแป้งเปียกเหนียว[\s\S]*ถ่านที่อ่อนกว่า[\s\S]*ครั้งละ 2 นาที/
  }, "the campfire and skillet methods have a centre test and lower-heat recovery");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(dish, "Cook slowly until golden").body[locale], /71°C|74°C|160°F|165°F/,
      `${locale}: a meat or egg endpoint is not applied to flour-only bannock`);
  }
  official(dish, [urls.flour]);
});
