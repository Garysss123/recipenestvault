const courseLabels = {
  dessert: { en: "Dessert", "zh-hant": "甜點", ja: "デザート", ko: "디저트", th: "ของหวาน" },
  soup: { en: "Soup", "zh-hant": "湯品", ja: "スープ", ko: "국물 요리", th: "ซุป" },
  salad: { en: "Salad", "zh-hant": "沙拉", ja: "サラダ", ko: "샐러드", th: "สลัด" },
  bread: { en: "Bread", "zh-hant": "麵包", ja: "パン", ko: "빵", th: "ขนมปัง" },
  breakfast: { en: "Breakfast", "zh-hant": "早餐", ja: "朝食", ko: "아침 식사", th: "อาหารเช้า" }
};

const recipesByCourse = {
  dessert: [
    "peanut-shaved-ice", "pineapple-cakes", "jiufen-taro-balls", "gulab-jamun", "rice-kheer", "che-ba-mau",
    "banh-flan", "creme-brulee", "madeleines", "clafoutis", "chocolate-mousse", "financiers", "panna-cotta",
    "cannoli-siciliani", "cantucci", "churros-con-chocolate", "arroz-con-leche", "tiramisu", "sticky-toffee-pudding",
    "traditional-trifle", "galaktoboureko", "apple-pie", "chocolate-chip-cookies", "new-york-cheesecake", "brigadeiro",
    "quindim", "saskatoon-berry-pie", "nanaimo-bars", "butter-tarts", "maple-taffy", "baklava", "malva-pudding",
    "black-forest-cake", "bienenstich", "tarta-de-santiago", "tarte-tatin", "lamingtons"
  ],
  soup: [
    "wonton-soup", "miso-soup", "shoyu-ramen", "kimchi-jjigae", "doenjang-jjigae", "sundubu-jjigae", "miyeok-guk",
    "taiwanese-beef-noodle-soup", "pork-ball-rice-vermicelli-soup", "tom-yum-goong", "tom-kha-gai", "boat-noodles",
    "pho-bo", "pho-ga", "bun-bo-hue", "bun-rieu", "canh-chua-ca", "french-onion-soup", "cullen-skink", "avgolemono",
    "new-england-clam-chowder", "mercimek-corbasi", "lablabi", "nigerian-egusi-soup", "erbsensuppe", "sopa-de-tortilla",
    "pozole-rojo", "fasolada", "mohinga", "harira", "bouillabaisse"
  ],
  salad: [
    "som-tam", "bun-bo-nam-bo", "salade-nicoise", "salade-lyonnaise", "horiatiki", "tabbouleh", "fattoush", "zaalouk", "lao-chicken-larb"
  ],
  bread: [
    "butter-naan", "focaccia-genovese", "campfire-bannock", "injera", "montreal-style-bagels", "skillet-cornbread",
    "pao-de-queijo", "zaatar-manakish", "gozleme"
  ],
  breakfast: ["dan-bing", "full-english-breakfast", "sri-lankan-egg-hoppers", "masala-dosa", "idli-sambar"]
};

const courseByRecipeId = new Map(Object.entries(recipesByCourse).flatMap(([course, ids]) => ids.map((id) => [id, course])));

const pantryTerms = {
  en: /\b(water|salt|sugar|neutral cooking oil|cooking oil|vegetable oil|olive oil|black pepper|white pepper|ground pepper|plain flour|all-purpose flour)\b/i,
  "zh-hant": /水|鹽|鹽巴|砂糖|白糖|食用油|中性食用油|黑胡椒|白胡椒|麵粉|中筋麵粉/,
  ja: /水|塩|食塩|砂糖|油|サラダ油|こしょう|胡椒|小麦粉/,
  ko: /물|소금|설탕|식용유|기름|후추|밀가루/,
  th: /น้ำ|เกลือ|น้ำตาล|น้ำมัน|พริกไทย|แป้งสาลี/
};

function keywordPhrase(value, locale) {
  let phrase = String(value ?? "").trim();
  if (locale === "en") {
    phrase = phrase.replace(/^(?:boneless|skinless),\s*/i, "").replace(/^(?:boneless|skinless)\s+/i, "");
    phrase = phrase.split(/[,;；（(]/u, 1)[0].replace(/\s+for (?:the )?(?:chicken|pork|beef|fish|sauce|topping).*$/i, "").trim();
  } else if (locale === "zh-hant") {
    phrase = phrase.split(/[,，;；、（(]/u, 1)[0].replace(/^(?:醃(?:製)?雞肉用|醃肉用|雞肉用)/u, "").trim();
  } else if (locale === "ja") {
    phrase = phrase.split(/[,，;；、（(]/u, 1)[0].replace(/^(?:鶏肉用の|下味用の|ソース用の|仕上げ用の)/u, "").trim();
  } else if (locale === "ko") {
    phrase = phrase.split(/[,，;；、（(]/u, 1)[0]
      .replace(/^(?:뼈와 껍질을 제거한\s*|닭고기 밑간용\s*|닭고기용\s*|소스용\s*|볶음용\s*|튀김용\s*)/u, "").trim();
  } else if (locale === "th") {
    phrase = phrase.replace(/\s*สำหรับ(?:หมักไก่|หมัก|ปรุง|ผัด|ทอด).+$/u, "")
      .replace(/หั่น(?:ขวางเส้นใย)?(?:หนา|บาง)?\s*\d+(?:\.\d+)?\s*(?:มม\.|ซม\.).*$/u, "")
      .replace(/\s*(?:อุณหภูมิห้อง|สับละเอียด|หั่นเสี้ยว|หั่นเต๋า|หั่นแว่น)$/u, "").trim();
  }
  return phrase;
}

export function recipeCategory(recipe, locale) {
  const course = courseByRecipeId.get(recipe.id);
  return course ? courseLabels[course][locale] : undefined;
}

export function recipeKeywords(recipe, locale) {
  const phrases = recipe.ingredients
    .map((row) => keywordPhrase(row.item?.[locale] ?? row.item?.en ?? row.item, locale))
    .filter(Boolean);
  const distinctive = phrases.filter((phrase) => !pantryTerms[locale]?.test(phrase));
  return [...new Set((distinctive.length ? distinctive : phrases).slice(0, 3))].join(", ");
}
