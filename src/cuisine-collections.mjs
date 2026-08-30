import { recipeUi } from "./recipe-ui.mjs";

const chinese = Object.fromEntries(Object.entries(recipeUi).map(([locale, ui]) => [locale, {
  eyebrow: ui.collectionEyebrow,
  title: ui.collectionTitle,
  intro: ui.collectionIntro,
  recipeEyebrow: ui.recipeEyebrow,
  backToCollection: ui.backToCollection
}]));

const japanese = {
  en: {
    eyebrow: "Curated Japanese cooking",
    title: "Japanese recipes for everyday kitchens",
    intro: "Craving Japanese food you can actually make at home? Browse comforting rice bowls, crisp fried favorites, noodles, soups, and small dishes. Each complete recipe gives exact quantities and timing, then explains heat, doneness, substitutions, common mistakes, and storage so the result is easier to repeat.",
    recipeEyebrow: "Japanese recipe",
    backToCollection: "Back to Japanese recipes"
  },
  "zh-hant": {
    eyebrow: "精選日本料理",
    title: "在家也能穩定完成的日本料理食譜",
    intro: "想在家做出日式家常味？從丼飯、咖哩與炸物，到麵食、湯品與小菜，依照今天想吃的料理挑選完整作法。每頁先列出精確份量與時間，再說明火候、熟度、替代食材、常見失敗與保存方式，讓第一次做也能抓到重點。",
    recipeEyebrow: "日本料理食譜",
    backToCollection: "返回日本料理食譜"
  },
  ja: {
    eyebrow: "厳選した日本料理",
    title: "毎日の台所で作れる日本料理レシピ",
    intro: "家庭で作りやすい日本料理を探しているなら、丼物、カレー、揚げ物から麺、汁物、小さなおかずまで、食べたい一品から詳しい作り方を選べます。正確な分量と時間を先に確認し、火加減、火の通り、代替材料、失敗しやすい点、保存方法まで順に追えるので、初めてでも要点をつかみやすくなります。",
    recipeEyebrow: "日本料理レシピ",
    backToCollection: "日本料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 일본 요리",
    title: "매일의 주방에서 만들 수 있는 일본 요리 레시피",
    intro: "집에서 만들기 좋은 일본 요리를 찾고 있다면 덮밥, 카레, 튀김부터 면, 국물 요리와 작은 반찬까지 먹고 싶은 메뉴로 자세한 레시피를 골라 보세요. 정확한 분량과 시간을 먼저 확인한 뒤 불 세기, 익힘 기준, 대체 재료, 흔한 실수와 보관법까지 순서대로 따라갈 수 있어 처음 만들어도 핵심을 놓치지 않습니다.",
    recipeEyebrow: "일본 요리 레시피",
    backToCollection: "일본 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารญี่ปุ่นที่คัดสรร",
    title: "สูตรอาหารญี่ปุ่นที่ทำได้จริงในครัวประจำวัน",
    intro: "หากอยากทำอาหารญี่ปุ่นที่บ้าน เลือกได้ตั้งแต่ข้าวหน้าต่าง ๆ แกงกะหรี่ ของทอด ไปจนถึงเมนูเส้น ซุป และจานเล็ก แต่ละสูตรเริ่มด้วยปริมาณและเวลาที่ชัดเจน แล้วอธิบายระดับไฟ จุดสุก วัตถุดิบทดแทน ข้อผิดพลาดที่พบบ่อย และการเก็บรักษา เพื่อให้ครั้งแรกก็จับประเด็นสำคัญได้",
    recipeEyebrow: "สูตรอาหารญี่ปุ่น",
    backToCollection: "กลับไปสูตรอาหารญี่ปุ่น"
  }
};

const korean = {
  en: {
    eyebrow: "Curated Korean cooking",
    title: "Korean recipes for bold, comforting home cooking",
    intro: "Choose from sizzling barbecue, bubbling jjigae, chewy noodles and rice cakes, crisp pancakes, rice dishes, dumplings, and cooling naengmyeon. Every recipe gives exact quantities, pan size, heat, timing, texture, and safe doneness checks, so you can move from familiar Korean flavours to a repeatable result without guessing at the crucial moment.",
    recipeEyebrow: "Korean recipe",
    backToCollection: "Back to Korean recipes"
  },
  "zh-hant": {
    eyebrow: "精選韓國料理",
    title: "從暖心鍋物到街頭小吃的韓國料理食譜",
    intro: "從滋滋作響的烤肉、滾燙鍋物、彈牙麵食與年糕，到酥脆煎餅、拌飯、饅頭與冰涼冷麵，先挑選今天真正想吃的一道。每頁清楚列出份量、鍋具、火力、時間、口感與安全熟度，讓關鍵步驟不必靠猜，第一次做也能掌握韓式風味的層次。",
    recipeEyebrow: "韓國料理食譜",
    backToCollection: "返回韓國料理食譜"
  },
  ja: {
    eyebrow: "厳選した韓国料理",
    title: "鍋料理から屋台の味まで作れる韓国料理レシピ",
    intro: "焼肉、熱いチゲ、弾力のある麺と餅、カリッとしたチヂミ、ご飯物、マンドゥ、冷たい冷麺まで、食べたい一品を選べます。各ページで分量、鍋の大きさ、火加減、時間、食感、安全な火の通りを確認できるため、大切な場面を勘に頼らず家庭で再現できます。",
    recipeEyebrow: "韓国料理レシピ",
    backToCollection: "韓国料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 한식",
    title: "따뜻한 찌개부터 길거리 음식까지 만드는 한식 레시피",
    intro: "지글지글 구이, 보글보글 찌개, 쫄깃한 면과 떡, 바삭한 전, 밥 요리, 만두, 시원한 냉면까지 오늘 먹고 싶은 메뉴를 골라 보세요. 각 레시피에 정확한 분량, 팬 크기, 불 세기, 시간, 식감, 안전한 익힘 기준을 담아 중요한 순간을 감으로 넘기지 않고 집에서도 다시 만들 수 있습니다.",
    recipeEyebrow: "한식 레시피",
    backToCollection: "한식 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารเกาหลีที่คัดสรร",
    title: "สูตรอาหารเกาหลีตั้งแต่แกงอุ่นใจถึงของกินข้างทาง",
    intro: "เลือกได้ตั้งแต่เนื้อย่างฉ่า แกงเดือด เส้นและต็อกเหนียวนุ่ม แพนเค้กกรอบ เมนูข้าว เกี๊ยว ไปจนถึงบะหมี่เย็น แต่ละสูตรระบุปริมาณ ขนาดกระทะ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกปลอดภัยอย่างชัดเจน จึงทำรสเกาหลีซ้ำได้โดยไม่ต้องเดาในช่วงสำคัญ",
    recipeEyebrow: "สูตรอาหารเกาหลี",
    backToCollection: "กลับไปสูตรอาหารเกาหลี"
  }
};

const thai = {
  en: {
    eyebrow: "Curated Thai cooking",
    title: "Thai recipes built around balance, heat, and texture",
    intro: "Move from bright salads and fast wok dishes to coconut curries, smoky skewers, northern noodles, slow broths, and mango sticky rice. Each recipe measures the salty, sour, sweet, and spicy elements, then marks the exact texture, heat, timing, and safe doneness that make the dish work—so you can cook Thai food with confidence instead of correcting it by guesswork at the table.",
    recipeEyebrow: "Thai recipe",
    backToCollection: "Back to Thai recipes"
  },
  "zh-hant": {
    eyebrow: "精選泰國料理",
    title: "掌握酸、甜、鹹、辣與口感平衡的泰國料理食譜",
    intro: "從清爽沙拉、快速鍋炒，到椰香咖哩、煙燻烤串、泰北麵食、慢熬濃湯與芒果糯米，依照今天想吃的風味挑選。每道食譜把酸、甜、鹹、辣拆成可量化份量，再標出真正決定成敗的火力、時間、口感與安全熟度，讓你不必等上桌後才憑感覺補救。",
    recipeEyebrow: "泰國料理食譜",
    backToCollection: "返回泰國料理食譜"
  },
  ja: {
    eyebrow: "厳選したタイ料理",
    title: "酸味、甘味、塩味、辛味と食感を整えるタイ料理レシピ",
    intro: "爽やかなサラダと手早い炒め物から、ココナッツカレー、香ばしい串焼き、北部の麺、長時間煮込むスープ、マンゴーもち米まで選べます。各レシピで酸味、甘味、塩味、辛味を計量し、火加減、時間、食感、安全な火の通りを明確にするため、食卓で勘に頼って直す必要がありません。",
    recipeEyebrow: "タイ料理レシピ",
    backToCollection: "タイ料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 태국 요리",
    title: "신맛, 단맛, 짠맛, 매운맛과 식감을 맞추는 태국 요리 레시피",
    intro: "산뜻한 샐러드와 빠른 웍 볶음부터 코코넛 커리, 불향 꼬치, 북부 면 요리, 오래 끓인 국물, 망고 찹쌀밥까지 골라 보세요. 각 레시피가 신맛, 단맛, 짠맛, 매운맛을 계량하고 성공을 결정하는 불 세기, 시간, 식감, 안전 익힘 기준을 표시해 식탁에서 감으로 고치지 않아도 됩니다.",
    recipeEyebrow: "태국 요리 레시피",
    backToCollection: "태국 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารไทยที่คัดสรร",
    title: "สูตรอาหารไทยที่วางสมดุลเปรี้ยว หวาน เค็ม เผ็ด และเนื้อสัมผัส",
    intro: "เลือกจากยำสดและผัดกระทะเร็ว ไปจนถึงแกงกะทิ ไม้ย่างหอมควัน เส้นภาคเหนือ น้ำซุปเคี่ยวนาน และข้าวเหนียวมะม่วง แต่ละสูตรตวงเปรี้ยว หวาน เค็ม เผ็ดอย่างชัดเจน พร้อมระบุไฟ เวลา เนื้อสัมผัส และจุดสุกปลอดภัยที่ตัดสินผลลัพธ์ จึงไม่ต้องรอแก้รสด้วยการเดาที่โต๊ะ",
    recipeEyebrow: "สูตรอาหารไทย",
    backToCollection: "กลับไปสูตรอาหารไทย"
  }
};

export const cuisineCollections = { chinese, japanese, korean, thai };
