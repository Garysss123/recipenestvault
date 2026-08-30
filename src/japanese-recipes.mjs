import { japaneseRecipesA } from "./japanese-recipes-a.mjs";
import { japaneseRecipesB } from "./japanese-recipes-b.mjs";
import { japaneseRecipesC } from "./japanese-recipes-c.mjs";

const locales = ["en", "zh-hant", "ja", "ko", "th"];
const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function mergeSteps(instructions, indexes, title) {
  return {
    title,
    body: Object.fromEntries(locales.map((locale) => [locale, indexes.map((index) => instructions[index].body[locale]).join(" ")]))
  };
}

function naturalizeMethod(recipe) {
  const original = recipe.instructions;
  if (recipe.id === "onigiri") {
    return {
      ...recipe,
      instructions: [
        mergeSteps(original, [0, 1], ml("Rinse and soak the rice", "淘洗並浸泡米", "米を洗って浸水する", "쌀을 씻어 불리기", "ล้างและแช่ข้าว")),
        mergeSteps(original, [2, 3], ml("Cook the rice", "煮熟米飯", "ご飯を炊く", "밥 짓기", "หุงข้าว")),
        original[4],
        mergeSteps(original, [5, 6], ml("Season and shape six onigiri", "調味並捏成六顆飯糰", "塩をなじませて6個に握る", "간을 하고 주먹밥 여섯 개 빚기", "ปรุงรสและปั้นโอนิกิริหกลูก")),
        original[7]
      ]
    };
  }
  if (recipe.id === "miso-soup") {
    return {
      ...recipe,
      instructions: [
        mergeSteps(original, [0, 1], ml("Soak and heat the kombu", "浸泡並加熱昆布", "昆布を浸して加熱する", "다시마를 불려 데우기", "แช่และอุ่นคอมบุ")),
        mergeSteps(original, [2, 3], ml("Steep and strain the dashi", "浸泡柴魚並過濾高湯", "かつお節を浸してこす", "가쓰오부시를 우려 거르기", "แช่คัตสึโอะบุชิแล้วกรองดาชิ")),
        original[4],
        original[5],
        original[6],
        original[7]
      ]
    };
  }
  if (recipe.id === "zaru-soba") {
    return {
      ...recipe,
      instructions: [
        mergeSteps(original, [0, 1], ml("Make and chill the mentsuyu", "製作並冷卻麵露", "めんつゆを作って冷やす", "멘쓰유를 만들어 식히기", "ทำและแช่เย็นเมนสึยุ")),
        original[2],
        original[3],
        mergeSteps(original, [4, 5], ml("Rinse, chill, and drain", "沖洗、冰鎮並瀝乾", "洗って冷やし、水気を切る", "헹구고 차갑게 식혀 물 빼기", "ล้าง แช่เย็น และสะเด็ดน้ำ")),
        original[6],
        original[7]
      ]
    };
  }
  if (recipe.id === "gyudon") {
    return {
      ...recipe,
      instructions: [
        mergeSteps(original, [0, 1], ml("Prepare the rice, beef, and onion", "準備米飯、牛肉與洋蔥", "ご飯、牛肉、玉ねぎを準備する", "밥과 소고기, 양파 준비하기", "เตรียมข้าว เนื้อ และหอมใหญ่")),
        original[2],
        original[3],
        original[4],
        original[5],
        mergeSteps(original, [6, 7], ml("Build the bowls and serve", "組合丼飯並上桌", "丼に盛って仕上げる", "덮밥을 담아 내기", "จัดชามและเสิร์ฟ"))
      ]
    };
  }
  if (recipe.id === "chicken-teriyaki") {
    return {
      ...recipe,
      instructions: [
        original[0],
        mergeSteps(original, [1, 2], ml("Prepare and marinate the chicken", "處理並醃漬雞腿排", "鶏肉を整えて漬ける", "닭을 손질해 재우기", "เตรียมและหมักไก่")),
        ...original.slice(3)
      ]
    };
  }
  return recipe;
}

export const japaneseRecipeDrafts = [
  ...japaneseRecipesA,
  ...japaneseRecipesB,
  ...japaneseRecipesC
].map(naturalizeMethod);
