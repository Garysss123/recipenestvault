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

export const cuisineCollections = { chinese, japanese, korean };
