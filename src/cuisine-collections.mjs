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

export const cuisineCollections = { chinese, japanese };
