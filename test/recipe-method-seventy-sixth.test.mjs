import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeOrder } from "../src/data.mjs";
import { allRecipeDrafts, recipes } from "../src/recipes.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const ids = ["madeleines", "focaccia-genovese", "gazpacho-andaluz", "tarte-tatin"];
const urls = {
  egg: "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety",
  flour: "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know",
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

test("seventy-sixth batch adds four genuinely incomplete eligible slugs to exact five-locale coverage", async () => {
  const ledgerSource = await readFile(new URL("./recipe-method-regressions.test.mjs", import.meta.url), "utf8");
  const ledgerBody = ledgerSource.match(/const auditedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(ledgerBody, "shared exact-slug ledger exists");
  const covered = [...ledgerBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);
  const beforeThisBatch = covered.slice(0, -20);

  const exclusionSource = await readFile(new URL("./recipe-method-fiftieth.test.mjs", import.meta.url), "utf8");
  const exclusionBody = exclusionSource.match(/const excludedIds = \[([\s\S]*?)\n\];/)?.[1];
  assert.ok(exclusionBody, "standing exclusion list exists");
  const excluded = [...exclusionBody.matchAll(/"([a-z0-9-]+)"/g)].map(([, id]) => id);

  assert.equal(recipes.length, 353);
  assert.equal(new Set(recipes.map((entry) => entry.id)).size, 353);
  assert.equal(beforeThisBatch.length, 300);
  assert.equal(new Set(beforeThisBatch).size, 300);
  assert.equal(covered.length, 320);
  assert.equal(new Set(covered).size, 320);
  assert.deepEqual(covered.slice(-20, -16), ids);
  assert.equal(excluded.length, 18);
  assert.equal(new Set(excluded).size, 18);
  assert.equal(recipes.length - excluded.length - beforeThisBatch.length, 35);
  assert.equal(recipes.length - excluded.length - covered.length, 15);
  assert.ok(ids.every((id) => !beforeThisBatch.includes(id)), "all four were absent from the exact 300-ID starting ledger");
  assert.ok(ids.every((id) => !excluded.includes(id)), "none overlaps the standing exclusions");
});

test("audit-command and source-group counts are checked separately", async () => {
  const packageData = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const auditCommands = Object.keys(packageData.scripts).filter((name) => /^audit:.+-drafts$/.test(name));
  assert.equal(auditCommands.length, 20, "npm wires 20 draft-audit commands");
  const registrySource = await readFile(new URL("../src/recipes.mjs", import.meta.url), "utf8");
  const groups = registrySource.match(/export const allRecipeDrafts = \[([\s\S]*?)\];/)?.[1];
  assert.ok(groups, "recipe source-group registry exists");
  assert.equal([...groups.matchAll(/\.\.\.[A-Za-z]+RecipeDrafts/g)].length, 21, "the registry contains 21 recipe source groups");
});

test("the four publication revisions preserve source drafts, ingredient facts, natural steps, and illustration mappings", () => {
  for (const id of ids) {
    const published = recipe(id);
    const draft = drafts.get(id);
    assert.ok(draft, `${id}: source draft exists`);
    assert.notDeepEqual(published.instructions, draft.instructions, `${id}: publication method was improved`);
    assert.notDeepEqual(published.sources, draft.sources, `${id}: applicable official safety references were added`);
    assert.deepEqual(published.ingredients, draft.ingredients, `${id}: source ingredients and amounts are unchanged`);
    assert.equal(published.instructions.length, draft.instructions.length, `${id}: natural step count is preserved`);
    assert.deepEqual(published.instructions.map((entry) => entry.imageScene), draft.instructions.map((entry) => entry.imageScene),
      `${id}: illustration scenes are unchanged`);
    const illustrations = recipeStepIllustrations.filter((entry) => entry.recipeId === id);
    assert.equal(illustrations.length, published.instructions.length, `${id}: illustration count matches the method`);
    assert.deepEqual(illustrations.map((entry) => entry.step), published.instructions.map((_, index) => index + 1));
    assert.equal(published.totalMinutes, published.prepMinutes + published.cookMinutes, `${id}: time fields add up`);
    for (const locale of localeOrder) {
      assert.ok(published.instructions.every((entry) => entry.title[locale] && entry.body[locale]), `${id}/${locale}: full method is localized`);
      assert.ok(published.storage[locale], `${id}/${locale}: storage guidance is localized`);
      assert.ok(draft.instructions.every((entry) => entry.body[locale]), `${id}/${locale}: source draft remains intact`);
    }
  }
  assert.deepEqual([recipe("tarte-tatin").prepMinutes, recipe("tarte-tatin").cookMinutes, recipe("tarte-tatin").totalMinutes], [30, 60, 90]);
});

test("madeleines have an egg-and-flour endpoint and protected re-bake path", () => {
  const dish = recipe("madeleines");
  allLocales(step(dish, "Finish the batter").body, {
    en: /Do not taste this raw flour-and-egg batter[\s\S]*Wash hands[\s\S]*work surface/,
    "zh-hant": /不要試吃含生麵粉和生蛋的麵糊[\s\S]*清洗雙手[\s\S]*工作檯/,
    ja: /小麦粉と卵を含む生地を味見しません[\s\S]*手、ボウル[\s\S]*作業台/,
    ko: /날밀가루와 달걀이 든 반죽을 맛보지 마세요[\s\S]*손, 볼[\s\S]*작업대/,
    th: /อย่าชิมแป้งดิบที่มีแป้งสาลีและไข่[\s\S]*ล้างมือ[\s\S]*พื้นเตรียมอาหาร/
  }, "raw flour and egg batter are handled safely");
  allLocales(step(dish, "Bake and unmould").body, {
    en: /largest cake[\s\S]*71°C \(160°F\)[\s\S]*below 71°C[\s\S]*2 minutes more[\s\S]*180°C/,
    "zh-hant": /最大顆[\s\S]*71°C（160°F）[\s\S]*低於 71°C[\s\S]*續烤 2 分鐘[\s\S]*180°C/,
    ja: /最も大きいケーキ[\s\S]*71°C（160°F）[\s\S]*71°C未満[\s\S]*2分追加[\s\S]*180°C/,
    ko: /가장 큰 케이크[\s\S]*71°C \(160°F\)[\s\S]*71°C보다 낮거나[\s\S]*2분 더[\s\S]*180°C/,
    th: /ชิ้นที่ใหญ่ที่สุด[\s\S]*71°C \(160°F\)[\s\S]*ต่ำกว่า 71°C[\s\S]*อบเพิ่ม 2 นาที[\s\S]*180°C/
  }, "egg-containing cake reaches its applicable endpoint with a lower-heat recovery");
  allLocales(dish.storage, {
    en: /within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*3–4 days/,
    "zh-hant": /2 小時內[\s\S]*32°C／90°F 時 1 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天/,
    ja: /2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日/,
    ko: /2시간 안에[\s\S]*32°C\/90°F보다 높은 환경에서는 1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน/
  }, "egg cakes are cooled and stored safely");
  official(dish, [urls.egg, urls.flour, urls.temperatures, urls.handling, urls.storage]);
});

test("focaccia checks baked-through texture and repairs uneven browning without a meat temperature", () => {
  const dish = recipe("focaccia-genovese");
  allLocales(step(dish, "Mix the soft dough").body, {
    en: /Do not taste raw dough[\s\S]*flour is uncooked[\s\S]*Wash hands/,
    "zh-hant": /不要試吃生麵糰[\s\S]*麵粉尚未烹熟[\s\S]*清洗雙手/,
    ja: /生地を味見しません[\s\S]*小麦粉は未加熱[\s\S]*手、ボウル/,
    ko: /생반죽을 맛보지 마세요[\s\S]*밀가루는 익지 않은 상태[\s\S]*손, 볼/,
    th: /อย่าชิมโดดิบ[\s\S]*แป้งยังไม่สุก[\s\S]*ล้างมือ/
  }, "raw flour is not tasted and surfaces are cleaned");
  allLocales(step(dish, "Bake until golden").body, {
    en: /underside is golden[\s\S]*no damp, gummy band[\s\S]*foil[\s\S]*210°C[\s\S]*3-minute increments[\s\S]*lower rack[\s\S]*3–5 minutes/,
    "zh-hant": /底部也應呈金黃色[\s\S]*沒有濕黏的生麵糰帶[\s\S]*鋁箔[\s\S]*210°C[\s\S]*續烤 3 分鐘[\s\S]*下層[\s\S]*3–5 分鐘/,
    ja: /底面も色づく[\s\S]*湿ったねばつく生地の筋がない[\s\S]*ホイル[\s\S]*210°C[\s\S]*3分ずつ[\s\S]*下段[\s\S]*3〜5分/,
    ko: /바닥도 황금색[\s\S]*축축하고 질척한 반죽 줄이 없어야[\s\S]*포일[\s\S]*210°C[\s\S]*3분씩[\s\S]*아래 선반[\s\S]*3–5분/,
    th: /ด้านล่างเป็นสีทอง[\s\S]*ไม่มีแถบแป้งเปียกเหนียว[\s\S]*คลุมฟอยล์[\s\S]*210°C[\s\S]*ครั้งละ 3 นาที[\s\S]*ชั้นล่าง[\s\S]*3–5 นาที/
  }, "the bread is checked by texture and corrected by heat placement only");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(dish, "Bake until golden").body[locale], /71°C|74°C|160°F|165°F/,
      `${locale}: no egg or meat internal temperature is applied to flour-and-water bread`);
  }
  official(dish, [urls.flour]);
});

test("gazpacho washes raw produce, stays cold, and uses no cooking endpoint", () => {
  const dish = recipe("gazpacho-andaluz");
  allLocales(step(dish, "Soften the bread and vegetables").body, {
    en: /Rinse the tomatoes, cucumber, and pepper under cool running water[\s\S]*Do not use soap or bleach[\s\S]*Keep ready-to-eat ingredients/,
    "zh-hant": /切菜前以流動冷水沖洗番茄、小黃瓜和青椒[\s\S]*不要使用肥皂或漂白水[\s\S]*即食食材與器具要遠離生肉/,
    ja: /切る前にトマト、きゅうり、ピーマンを流水で洗います[\s\S]*石けんや漂白剤は使いません[\s\S]*すぐ食べる食材や器具は生肉/,
    ko: /자르기 전에 토마토, 오이, 피망을 흐르는 찬물에 씻습니다[\s\S]*비누나 표백제는 사용하지 마세요[\s\S]*바로 먹을 재료와 도구는 생고기/,
    th: /ล้างมะเขือเทศ แตงกวา และพริกหวานใต้ก๊อกน้ำเย็นก่อนหั่น[\s\S]*ห้ามใช้สบู่หรือน้ำยาฟอกขาว[\s\S]*แยกวัตถุดิบพร้อมกิน/,
  }, "uncooked produce is washed without soap and kept separate");
  allLocales(step(dish, "Chill and serve").body, {
    en: /at least 2 hours[\s\S]*4°C \(40°F\) or colder[\s\S]*do not leave[\s\S]*2 hours total[\s\S]*1 hour/,
    "zh-hant": /冷藏至少 2 小時[\s\S]*4°C（40°F）或以下[\s\S]*室溫下累計不可超過 2 小時[\s\S]*1 小時/,
    ja: /2時間以上冷蔵[\s\S]*4°C（40°F）以下[\s\S]*室温に合計2時間を超えて[\s\S]*1時間/,
    ko: /최소 2시간 냉장[\s\S]*4°C \(40°F\) 이하[\s\S]*실온에 총 2시간 넘게[\s\S]*1시간/,
    th: /แช่เย็นอย่างน้อย 2 ชั่วโมง[\s\S]*4°C \(40°F\) หรือต่ำกว่า[\s\S]*รวมเกิน 2 ชั่วโมง[\s\S]*1 ชั่วโมง/
  }, "raw soup is chilled and time-limited outside refrigeration");
  for (const locale of localeOrder) {
    assert.doesNotMatch(dish.instructions.map((entry) => entry.body[locale]).join(" "), /71°C|74°C|63°C|145°F|160°F|165°F/,
      `${locale}: no cooking or reheating endpoint is applied to the uncooked soup`);
  }
  official(dish, [urls.produce, urls.handling, urls.storage]);
});

test("tarte tatin tests apple tenderness, repairs caramel sticking, and applies temperature only to leftovers", () => {
  const dish = recipe("tarte-tatin");
  allLocales(step(dish, "Cook the caramel").body, {
    en: /deep amber[\s\S]*30-second intervals[\s\S]*smokes[\s\S]*discard the caramel/,
    "zh-hant": /深琥珀色[\s\S]*續煮 30 秒[\s\S]*冒煙[\s\S]*丟棄焦糖/,
    ja: /濃い琥珀色[\s\S]*30秒ずつ[\s\S]*煙が出[\s\S]*カラメルを捨てます/,
    ko: /짙은 호박색[\s\S]*30초씩[\s\S]*연기가 나거나[\s\S]*캐러멜을 버립니다/,
    th: /สีอำพันเข้ม[\s\S]*ครั้งละ 30 วินาที[\s\S]*มีควัน[\s\S]*ทิ้งคาราเมล/
  }, "caramel colour and burn recovery are specific");
  allLocales(step(dish, "Pack and soften the apples").body, {
    en: /thickest half[\s\S]*thin knife[\s\S]*slight resistance[\s\S]*2 minutes at a time/,
    "zh-hant": /最厚的蘋果[\s\S]*細刀[\s\S]*稍微遇阻[\s\S]*續煮 2 分鐘/,
    ja: /最も厚いりんご[\s\S]*細いナイフ[\s\S]*少し抵抗[\s\S]*2分ずつ/,
    ko: /가장 두꺼운 사과[\s\S]*얇은 칼[\s\S]*약간 저항[\s\S]*2분씩 더/,
    th: /มีดปลายบาง[\s\S]*ชิ้นที่หนาที่สุด[\s\S]*แรงต้านเล็กน้อย[\s\S]*ครั้งละ 2 นาที/
  }, "apple doneness is checked by texture and corrected by gentle simmering");
  allLocales(step(dish, "Invert and serve").body, {
    en: /dry oven mitts[\s\S]*20–30 seconds[\s\S]*thin spatula/,
    "zh-hant": /乾燥隔熱手套[\s\S]*20–30 秒[\s\S]*薄刮刀/,
    ja: /乾いたミトン[\s\S]*20〜30秒[\s\S]*薄いへら/,
    ko: /마른 오븐 장갑[\s\S]*20–30초[\s\S]*얇은 주걱/,
    th: /ถุงมือกันร้อนที่แห้ง[\s\S]*20–30 วินาที[\s\S]*พายบาง/
  }, "stuck fruit is released by safely re-softening the caramel");
  allLocales(dish.storage, {
    en: /within 2 hours[\s\S]*within 1 hour above 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*3–4 days[\s\S]*74°C \(165°F\)/,
    "zh-hant": /2 小時內[\s\S]*32°C／90°F 時 1 小時內[\s\S]*4°C（40°F）[\s\S]*3–4 天[\s\S]*74°C（165°F）/,
    ja: /2時間以内[\s\S]*32°C／90°Fを超える環境では1時間以内[\s\S]*4°C（40°F）[\s\S]*3〜4日[\s\S]*74°C（165°F）/,
    ko: /2시간 안에[\s\S]*32°C\/90°F보다 높은 환경에서는 1시간 안에[\s\S]*4°C \(40°F\)[\s\S]*3–4일[\s\S]*74°C \(165°F\)/,
    th: /ภายใน 2 ชั่วโมง[\s\S]*ภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C \(90°F\)[\s\S]*4°C \(40°F\)[\s\S]*3–4 วัน[\s\S]*74°C \(165°F\)/
  }, "the 74°C value is limited to reheating stored leftovers");
  for (const locale of localeOrder) {
    assert.doesNotMatch(step(dish, "Cook the caramel").body[locale] + step(dish, "Pack and soften the apples").body[locale], /71°C|74°C|63°C|145°F|160°F|165°F/,
      `${locale}: no meat or egg internal endpoint is applied to fruit and caramel`);
  }
  official(dish, [urls.produce, urls.flour, urls.temperatures, urls.handling, urls.storage]);
});
