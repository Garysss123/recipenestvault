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

const taiwanese = {
  en: {
    eyebrow: "Curated Taiwanese cooking",
    title: "Taiwanese recipes from breakfast counters to family tables",
    intro: "Cook through red-braised noodles and rice bowls, breakfast egg crepes, night-market snacks, warming soups, sticky rice, tea eggs, pineapple cakes, taro balls, and shaved ice. Every recipe measures the soy, rice wine, starch, heat, and texture that make the dish recognisably Taiwanese, with safe temperatures and visual doneness cues where timing alone is not enough.",
    recipeEyebrow: "Taiwanese recipe",
    backToCollection: "Back to Taiwanese recipes"
  },
  "zh-hant": {
    eyebrow: "精選台灣料理",
    title: "從早餐店、夜市到家常餐桌的台灣料理食譜",
    intro: "從紅燒牛肉麵、滷肉飯、早餐蛋餅，到夜市炸物、暖湯、油飯、茶葉蛋、鳳梨酥、芋圓與剉冰，依照今天想吃的台灣味挑選。每道食譜把醬油、米酒、澱粉、火力與口感拆成可量化步驟，並在時間不足以判斷時補上安全中心溫度與外觀終點。",
    recipeEyebrow: "台灣料理食譜",
    backToCollection: "返回台灣料理食譜"
  },
  ja: {
    eyebrow: "厳選した台湾料理",
    title: "朝食店、夜市、家庭の食卓から選ぶ台湾料理レシピ",
    intro: "紅焼牛肉麺、魯肉飯、蛋餅、夜市の揚げ物、温かいスープ、油飯、茶葉卵、鳳梨酥、芋圓、かき氷まで作れます。しょうゆ、米酒、でんぷん、火加減、食感を計量し、時間だけで足りない場面には安全な中心温度と見た目の基準を示します。",
    recipeEyebrow: "台湾料理レシピ",
    backToCollection: "台湾料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 대만 요리",
    title: "아침 식당과 야시장부터 집밥까지 만드는 대만 요리 레시피",
    intro: "홍샤오 우육면, 루러우판, 단빙, 야시장 튀김, 따뜻한 국물, 유판, 차예단, 펑리수, 타로볼, 빙수까지 골라 만들 수 있습니다. 간장, 미주, 전분, 불 세기와 식감을 정확히 계량하고 시간만으로 부족한 단계에는 안전 중심 온도와 시각적 완성 기준을 제공합니다.",
    recipeEyebrow: "대만 요리 레시피",
    backToCollection: "대만 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารไต้หวันที่คัดสรร",
    title: "สูตรอาหารไต้หวันตั้งแต่ร้านอาหารเช้า ตลาดกลางคืน ถึงโต๊ะครอบครัว",
    intro: "ทำได้ตั้งแต่ก๋วยเตี๋ยวเนื้อตุ๋น ข้าวหมูพะโล้ เครปไข่ ของทอดตลาดกลางคืน ซุปอุ่น ข้าวเหนียวน้ำมัน ไข่ชา ขนมสับปะรด ลูกเผือก และน้ำแข็งไส ทุกสูตรตวงซีอิ๊ว เหล้าข้าว แป้ง ไฟ และเนื้อสัมผัสอย่างชัดเจน พร้อมอุณหภูมิใจกลางและจุดสังเกตเมื่อเวลาอย่างเดียวไม่พอ",
    recipeEyebrow: "สูตรอาหารไต้หวัน",
    backToCollection: "กลับไปสูตรอาหารไต้หวัน"
  }
};

const indian = {
  en: {
    eyebrow: "Curated Indian cooking",
    title: "Indian recipes from everyday dal to festive biryani",
    intro: "Cook across India's home kitchens, tiffin counters, street snacks, grills, breads, curries, and sweets: dal tadka, chana and rajma masala, dosa and idli, biryani, tandoori chicken, Goan fish curry, samosa, naan, gulab jamun, and more. Every recipe separates whole spices, ground spices, heat stages, texture cues, and safe doneness so layered flavour comes from technique rather than guesswork.",
    recipeEyebrow: "Indian recipe",
    backToCollection: "Back to Indian recipes"
  },
  "zh-hant": {
    eyebrow: "精選印度料理",
    title: "從日常豆湯、街頭小吃到節慶香飯的印度料理食譜",
    intro: "從 dal tadka、鷹嘴豆與紅腰豆 masala、dosa、idli，到香料飯、坦都里烤雞、果阿魚咖哩、samosa、naan 與 gulab jamun，循著印度各地的家常餐桌、早餐攤、街頭小吃與節慶料理下廚。每道食譜都把整粒香料、粉狀香料、火力階段、口感終點與安全熟度分開說明，讓層次來自技法而不是猜測。",
    recipeEyebrow: "印度料理食譜",
    backToCollection: "返回印度料理食譜"
  },
  ja: {
    eyebrow: "厳選したインド料理",
    title: "日々のダルから祝祭のビリヤニまで作るインド料理レシピ",
    intro: "ダル・タドカ、チャナとラジマのマサラ、ドーサ、イドゥリ、ビリヤニ、タンドリーチキン、ゴア風魚カレー、サモサ、ナン、グラブジャムンまで、家庭料理、ティフィン、屋台、炭火料理、パン、カレー、菓子を横断します。ホールスパイスと粉末スパイス、火加減、食感、安全な火通りを分けて示し、勘に頼らず香りを重ねます。",
    recipeEyebrow: "インド料理レシピ",
    backToCollection: "インド料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 인도 요리",
    title: "일상의 달부터 축제 비리야니까지 만드는 인도 요리 레시피",
    intro: "달 타드카, 차나와 라즈마 마살라, 도사와 이들리, 비리야니, 탄두리 치킨, 고아식 생선 커리, 사모사, 난, 굴랍 자문까지 가정식과 티핀, 길거리 간식, 구이, 빵, 커리, 디저트를 두루 만듭니다. 통향신료와 가루 향신료, 불 단계, 식감, 안전한 익힘을 나눠 설명해 추측 없이 향을 쌓습니다.",
    recipeEyebrow: "인도 요리 레시피",
    backToCollection: "인도 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารอินเดียที่คัดสรร",
    title: "สูตรอาหารอินเดียตั้งแต่ดาลประจำวันถึงบริยานีงานฉลอง",
    intro: "ทำตั้งแต่ดาลตัดกา จานามาซาลา ราชมามาซาลา โดซา อิดลี บริยานี ไก่ทันดูรี แกงปลาโกอา ซาโมซา นาน ไปจนถึงกุหลาบจามุน ครอบคลุมครัวบ้าน อาหารทิฟฟิน ของว่างริมทาง เตาย่าง ขนมปัง แกง และขนมหวาน ทุกสูตรแยกเครื่องเทศเม็ด เครื่องเทศผง ช่วงไฟ จุดเนื้อสัมผัส และความสุกปลอดภัย จึงสร้างกลิ่นรสเป็นชั้นได้โดยไม่ต้องเดา",
    recipeEyebrow: "สูตรอาหารอินเดีย",
    backToCollection: "กลับไปสูตรอาหารอินเดีย"
  }
};

const vietnamese = {
  en: {
    eyebrow: "Curated Vietnamese cooking",
    title: "Vietnamese recipes from fragrant phở to crisp bánh xèo",
    intro: "Explore clear noodle broths, smoky grilled pork, fresh rice-paper rolls, crisp crêpes, Hội An noodles, caramelized fish, sweet-sour soup, and cooling desserts. Build each dish with measured sauces, carefully prepared herbs, and practical guidance for simmering, grilling, steaming, and frying. Choose a quick noodle bowl or take time over a rich weekend broth.",
    recipeEyebrow: "Vietnamese recipe",
    backToCollection: "Back to Vietnamese recipes"
  },
  "zh-hant": {
    eyebrow: "精選越南料理",
    title: "從清香河粉、酥脆煎餅到家常餐桌的越南料理食譜",
    intro: "從牛肉河粉、香茅烤肉、鮮蝦生春捲、酥脆煎餅與會安高樓麵，到焦糖滷魚、酸甜魚湯、三色冰與焦糖布丁，挑一份今天想吃的越南味。每道都清楚說明醬汁比例、香草處理、熬湯火力與煎烤蒸炸的熟度線索；平日做一碗清爽拌麵，週末也能慢慢熬一鍋好湯。",
    recipeEyebrow: "越南料理食譜",
    backToCollection: "返回越南料理食譜"
  },
  ja: {
    eyebrow: "厳選したベトナム料理",
    title: "香り高いフォーからパリッとしたバインセオまで作るベトナム料理",
    intro: "澄んだ麺スープ、香ばしい焼き豚、生春巻き、薄焼き、ホイアンの麺、魚のカラメル煮、甘酸っぱいスープ、冷たいデザートを楽しめます。たれの分量、ハーブの準備、煮込みや焼き物、蒸し物、揚げ物の仕上がりを具体的に案内。平日のさっぱりした麺から週末にじっくり作るだしまで選べます。",
    recipeEyebrow: "ベトナム料理レシピ",
    backToCollection: "ベトナム料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 베트남 요리",
    title: "향긋한 퍼부터 바삭한 반쎄오까지 만드는 베트남 요리",
    intro: "맑은 쌀국수, 향긋한 돼지구이, 생춘권, 바삭한 크레페, 호이안 국수, 캐러멜 생선조림, 새콤달콤한 국물과 시원한 디저트를 골라 보세요. 소스 비율과 허브 손질부터 끓이기, 굽기, 찌기, 튀기기의 익힘 기준까지 구체적으로 안내합니다. 평일에는 산뜻한 국수 한 그릇, 주말에는 오래 우린 육수를 준비할 수 있습니다.",
    recipeEyebrow: "베트남 요리 레시피",
    backToCollection: "베트남 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารเวียดนามที่คัดสรร",
    title: "สูตรเวียดนามตั้งแต่เฝอหอมกรุ่นถึงบั๋นแส่วกรอบ",
    intro: "เลือกทำก๋วยเตี๋ยวน้ำใส หมูย่างหอมตะไคร้ เปาะเปี๊ยะสด แป้งทอดกรอบ เส้นฮอยอัน ปลาตุ๋นคาราเมล ซุปเปรี้ยวหวาน และขนมเย็น แต่ละสูตรบอกสัดส่วนซอส การเตรียมสมุนไพร และจุดสุกของการเคี่ยว ย่าง นึ่ง และทอดอย่างชัดเจน วันทำงานทำเส้นสดชื่นหนึ่งชาม ส่วนวันหยุดค่อยใช้เวลากับน้ำซุปเข้มข้น",
    recipeEyebrow: "สูตรอาหารเวียดนาม",
    backToCollection: "กลับไปสูตรอาหารเวียดนาม"
  }
};

const french = {
  en: {
    eyebrow: "Curated French cooking",
    title: "French recipes from bistro classics to home-baked desserts",
    intro: "Cook through onion soup, beef and chicken braises, gratins, quiche, croque monsieur, sole meunière, mussels, composed salads, crêpes, and classic pastries and desserts. Each recipe measures the butter, wine, stock, heat, resting time, and doneness cues that make French technique repeatable in a home kitchen.",
    recipeEyebrow: "French recipe",
    backToCollection: "Back to French recipes"
  },
  "zh-hant": {
    eyebrow: "精選法國料理",
    title: "從小酒館經典、慢燉主菜到法式甜點的完整食譜",
    intro: "從焗烤洋蔥湯、紅酒燉牛肉與雞肉、焗烤馬鈴薯、洛林鹹派、火腿起司三明治，到香煎鰨魚、白酒淡菜、尼斯沙拉、可麗餅、烤布蕾、反烤蘋果塔與費南雪。每道都把奶油、葡萄酒、高湯、火力、休息時間與熟度線索寫清楚，讓法式技法在家也能穩定重現。",
    recipeEyebrow: "法國料理食譜",
    backToCollection: "返回法國料理食譜"
  },
  ja: {
    eyebrow: "厳選したフランス料理",
    title: "ビストロの定番から家庭で焼けるデザートまでのフランス料理",
    intro: "オニオンスープ、牛肉や鶏肉の煮込み、グラタン、キッシュ、クロックムッシュ、舌平目、ムール貝、サラダ、クレープ、クレームブリュレや焼き菓子まで作ります。バター、ワイン、だし、火加減、休ませる時間、火の通りを具体的に示し、家庭でも再現しやすくしています。",
    recipeEyebrow: "フランス料理レシピ",
    backToCollection: "フランス料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 프랑스 요리",
    title: "비스트로 클래식부터 집에서 굽는 디저트까지 프랑스 요리 레시피",
    intro: "양파 수프, 소고기와 닭고기 브레이즈, 그라탱, 키슈, 크로크무슈, 솔 뫼니에르, 홍합, 샐러드, 크레프와 크렘 브륄레, 타르트 타탱, 피낭시에까지 만듭니다. 버터, 와인, 육수, 불 세기, 휴지 시간과 익힘 신호를 구체적으로 적어 집에서도 프랑스 조리법을 반복하기 쉽게 했습니다.",
    recipeEyebrow: "프랑스 요리 레시피",
    backToCollection: "프랑스 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารฝรั่งเศสที่คัดสรร",
    title: "สูตรอาหารฝรั่งเศสตั้งแต่เมนูบิสโทรคลาสสิกถึงขนมอบทำที่บ้าน",
    intro: "ทำตั้งแต่ซุปหัวหอม เนื้อและไก่ตุ๋น กราแตง คีช คร็อกเมอซิเออร์ ปลาโซล มูสเซล สลัด เครป ไปจนถึงเครมบรูเล ทาร์ตตาแต็ง และฟินองเซีย ทุกสูตรระบุเนย ไวน์ น้ำสต๊อก ระดับไฟ เวลาพัก และจุดสุกอย่างชัดเจน เพื่อให้เทคนิคฝรั่งเศสทำซ้ำได้ในครัวบ้าน",
    recipeEyebrow: "สูตรอาหารฝรั่งเศส",
    backToCollection: "กลับไปสูตรอาหารฝรั่งเศส"
  }
};

const italian = {
  en: {
    eyebrow: "Curated Italian cooking",
    title: "Italian recipes from regional pasta classics to celebrated desserts",
    intro: "Cook through Roman pasta, Neapolitan pizza, Ligurian pesto, Milanese risotto and ossobuco, Sicilian aubergine and arancini, Tuscan ribollita, seafood pasta, focaccia, and classic desserts such as tiramisù, panna cotta, cannoli, and cantucci. Each recipe gives precise quantities, heat, timing, texture, and doneness cues so regional Italian techniques are practical in a home kitchen.",
    recipeEyebrow: "Italian recipe",
    backToCollection: "Back to Italian recipes"
  },
  "zh-hant": {
    eyebrow: "精選義大利料理",
    title: "從地方經典義大利麵、披薩到傳統甜點的完整義大利食譜",
    intro: "從羅馬義大利麵、拿坡里披薩、利古里亞青醬，到米蘭燉飯與燉小牛膝、西西里茄子料理與炸飯糰、托斯卡尼蔬菜麵包湯、海鮮義大利麵與佛卡夏，再到提拉米蘇、奶酪、卡諾里與杏仁脆餅。每道食譜都清楚標出份量、火力、時間、口感與熟度線索，讓不同地區的義大利技法在家也能穩定重現。",
    recipeEyebrow: "義大利料理食譜",
    backToCollection: "返回義大利料理食譜"
  },
  ja: {
    eyebrow: "厳選したイタリア料理",
    title: "地方の定番パスタから伝統菓子まで作れるイタリア料理レシピ",
    intro: "ローマのパスタ、ナポリのピッツァ、リグーリアのペスト、ミラノ風リゾットとオッソブーコ、シチリアのナス料理とアランチーニ、トスカーナのリボッリータ、魚介パスタ、フォカッチャ、さらにティラミス、パンナコッタ、カンノーロ、カントゥッチまで作れます。分量、火加減、時間、食感、火の通りを具体的に示し、各地方の技法を家庭でも再現しやすくしています。",
    recipeEyebrow: "イタリア料理レシピ",
    backToCollection: "イタリア料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 이탈리아 요리",
    title: "지역 파스타 클래식부터 전통 디저트까지 만드는 이탈리아 요리 레시피",
    intro: "로마식 파스타, 나폴리 피자, 리구리아 페스토, 밀라노식 리소토와 오소부코, 시칠리아 가지 요리와 아란치니, 토스카나 리볼리타, 해산물 파스타, 포카치아부터 티라미수, 판나코타, 카놀리, 칸투치까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시해 각 지역의 이탈리아 조리법을 집에서도 안정적으로 재현할 수 있습니다.",
    recipeEyebrow: "이탈리아 요리 레시피",
    backToCollection: "이탈리아 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารอิตาเลียนที่คัดสรร",
    title: "สูตรอาหารอิตาเลียนตั้งแต่พาสต้าประจำภูมิภาคถึงขนมหวานคลาสสิก",
    intro: "ทำได้ตั้งแต่พาสตาแบบโรม พิซซ่านาโปลี เพสโตลิกูเรีย ริซอตโตและออสโซบูโกแบบมิลาน มะเขือม่วงและอารันชีนีแบบซิซิลี ริโบลลิตาแบบทัสคานี พาสตาทะเล โฟคัชชา ไปจนถึงทีรามิสุ พันนาคอตตา คันโนลี และคันตุชชี ทุกสูตรระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน เพื่อให้เทคนิคของแต่ละภูมิภาคทำซ้ำได้ในครัวบ้าน",
    recipeEyebrow: "สูตรอาหารอิตาเลียน",
    backToCollection: "กลับไปสูตรอาหารอิตาเลียน"
  }
};

const spanish = {
  en: {
    eyebrow: "Curated Spanish cooking",
    title: "Spanish recipes from regional rice and tapas to classic desserts",
    intro: "Cook through Valencian paella and fideuà, tortilla española, Andalusian chilled soups, Madrid tapas and cocido, Asturian fabada, Galician octopus, Basque cod and tuna stews, Catalan pan con tomate and crema catalana, plus churros and almond cake. Each recipe gives precise quantities, heat, timing, texture and doneness cues so regional Spanish techniques are practical in a home kitchen.",
    recipeEyebrow: "Spanish recipe",
    backToCollection: "Back to Spanish recipes"
  },
  "zh-hant": {
    eyebrow: "精選西班牙料理",
    title: "從地方米料理、Tapas 到經典甜點的西班牙食譜",
    intro: "從瓦倫西亞 paella 與 fideuà、西班牙馬鈴薯烘蛋、安達盧西亞冷湯、馬德里 tapas 與 cocido，到阿斯圖里亞斯 fabada、加利西亞章魚、巴斯克鱈魚與鮪魚燉菜、加泰隆尼亞番茄麵包與 crema catalana，再到吉拿棒與杏仁蛋糕。每道食譜都清楚標出份量、火力、時間、口感與熟度線索，讓不同地區的西班牙技法在家也能穩定重現。",
    recipeEyebrow: "西班牙料理食譜",
    backToCollection: "返回西班牙料理食譜"
  },
  ja: {
    eyebrow: "厳選したスペイン料理",
    title: "地方の米料理とタパスから伝統菓子まで作れるスペイン料理レシピ",
    intro: "バレンシアのパエリアとフィデウア、トルティージャ、アンダルシアの冷製スープ、マドリードのタパスとコシード、アストゥリアスのファバーダ、ガリシアのタコ、バスクのタラとマグロ煮込み、カタルーニャのパン・コン・トマテとクレマ・カタラーナ、さらにチュロスやアーモンドケーキまで作れます。分量、火加減、時間、食感、火の通りを具体的に示し、地方ごとの技法を家庭でも再現しやすくしています。",
    recipeEyebrow: "スペイン料理レシピ",
    backToCollection: "スペイン料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 스페인 요리",
    title: "지역 쌀요리와 타파스부터 전통 디저트까지 만드는 스페인 요리 레시피",
    intro: "발렌시아 파에야와 피데우아, 또르띠야 에스파뇰라, 안달루시아 냉수프, 마드리드 타파스와 코시도, 아스투리아스 파바다, 갈리시아 문어, 바스크식 대구와 참치 스튜, 카탈루냐 판 콘 토마테와 크레마 카탈라나부터 추로스와 아몬드 케이크까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시해 지역별 스페인 조리법을 집에서도 안정적으로 재현할 수 있습니다.",
    recipeEyebrow: "스페인 요리 레시피",
    backToCollection: "스페인 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารสเปนที่คัดสรร",
    title: "สูตรอาหารสเปนตั้งแต่ข้าวและทาปาสประจำภูมิภาคถึงขนมหวานคลาสสิก",
    intro: "ทำได้ตั้งแต่ปาเอยาและฟิเดอัวแบบบาเลนเซีย ตอร์ติญาสเปน ซุปเย็นอันดาลูเซีย ทาปาสและโคซิโดแบบมาดริด ฟาบาดาอัสตูเรียส ปลาหมึกกาลิเซีย ปลาคอดและสตูว์ทูน่าแบบบาสก์ ขนมปังมะเขือเทศกับเครมากาตาลานาแบบกาตาลุญญา ไปจนถึงชูโรสและเค้กอัลมอนด์ ทุกสูตรระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน เพื่อให้เทคนิคสเปนแต่ละภูมิภาคทำซ้ำได้ในครัวบ้าน",
    recipeEyebrow: "สูตรอาหารสเปน",
    backToCollection: "กลับไปสูตรอาหารสเปน"
  }
};

const british = {
  en: {
    eyebrow: "Curated British cooking",
    title: "British recipes from roasts and pies to pub classics and puddings",
    intro: "Cook fish and chips, Beef Wellington, roast beef with Yorkshire pudding, shepherd’s pie, toad in the hole, Cornish pasties and a full English breakfast, alongside British South Asian chicken tikka masala, Scottish Cullen skink, Welsh rarebit, sticky toffee pudding, trifle and steak and kidney pie. Each recipe gives precise quantities, heat, timing, texture and doneness cues while keeping the natural number of cooking stages each dish actually needs.",
    recipeEyebrow: "British recipe",
    backToCollection: "Back to British recipes"
  },
  "zh-hant": {
    eyebrow: "精選英國料理",
    title: "從烤肉、鹹派、酒館經典到傳統甜點的英國食譜",
    intro: "從炸魚薯條、威靈頓牛排、約克夏布丁烤牛肉、牧羊人派、香腸約克夏布丁、康瓦爾餡餅與英式早餐，到英國南亞脈絡的雞肉 tikka masala、蘇格蘭 Cullen skink、威爾斯 rarebit，再到太妃糖布丁、trifle 與牛排腰子派。每道食譜都清楚標示份量、火力、時間、口感與熟度，並依真正料理流程保留自然步驟數。",
    recipeEyebrow: "英國料理食譜",
    backToCollection: "返回英國料理食譜"
  },
  ja: {
    eyebrow: "厳選したイギリス料理",
    title: "ローストやパイ、パブの定番から伝統菓子まで作れるイギリス料理レシピ",
    intro: "フィッシュ＆チップス、ビーフ・ウェリントン、ヨークシャー・プディングを添えたローストビーフ、シェパーズパイ、トード・イン・ザ・ホール、コーニッシュ・パスティ、フル・イングリッシュ・ブレックファストに加え、英国南アジア系のチキン・ティッカ・マサラ、スコットランドのカレン・スキンク、ウェールズのレアビット、スティッキー・トフィー・プディング、トライフル、ステーキ＆キドニーパイまで作れます。分量、火加減、時間、食感、火の通りを具体的に示し、それぞれの料理に必要な自然な工程数を保っています。",
    recipeEyebrow: "イギリス料理レシピ",
    backToCollection: "イギリス料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 영국 요리",
    title: "로스트와 파이, 펍 클래식부터 전통 디저트까지 만드는 영국 요리 레시피",
    intro: "피시 앤 칩스, 비프 웰링턴, 요크셔 푸딩을 곁들인 로스트비프, 셰퍼드 파이, 토드 인 더 홀, 코니시 패스티, 풀 잉글리시 브렉퍼스트와 함께 영국 남아시아계 치킨 티카 마살라, 스코틀랜드 컬런 스킹크, 웨일스 레어빗, 스티키 토피 푸딩, 트라이플, 스테이크 앤 키드니 파이까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시하고 각 요리에 실제로 필요한 자연스러운 조리 단계를 그대로 유지합니다.",
    recipeEyebrow: "영국 요리 레시피",
    backToCollection: "영국 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารอังกฤษที่คัดสรร",
    title: "สูตรอาหารอังกฤษตั้งแต่เนื้ออบ พาย และเมนูผับ ไปจนถึงของหวานดั้งเดิม",
    intro: "ทำได้ตั้งแต่ฟิชแอนด์ชิปส์ บีฟเวลลิงตัน เนื้ออบกับยอร์กเชียร์พุดดิง เชพเพิร์ดพาย โทดอินเดอะโฮล คอร์นิชพาสตี และอาหารเช้าอังกฤษเต็มชุด ไปจนถึงชิกเกนทิกกามาซาลาในวัฒนธรรมบริติชเอเชียใต้ ซุป Cullen skink ของสกอตแลนด์ Welsh rarebit สติกกีทอฟฟีพุดดิง ไทรเฟิล และสเต๊กแอนด์คิดนีย์พาย ทุกสูตรระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน พร้อมคงจำนวนขั้นตอนตามธรรมชาติของอาหารแต่ละจาน",
    recipeEyebrow: "สูตรอาหารอังกฤษ",
    backToCollection: "กลับไปสูตรอาหารอังกฤษ"
  }
};

const german = {
  en: {
    eyebrow: "Curated German cooking",
    title: "German recipes from braises and sausages to dumplings, noodles and classic cakes",
    intro: "Cook Sauerbraten, Rinderrouladen, Bavarian Krustenbraten, Currywurst, Nürnberger Rostbratwürste with sauerkraut, Frikadellen and Königsberger Klopse, then move through Kartoffelpuffer, Käsespätzle, Maultaschen and Erbsensuppe before finishing with Schwarzwälder Kirschtorte and Bienenstich. Each recipe gives precise quantities, heat, timing, texture and doneness cues while preserving the natural number of stages the dish actually needs.",
    recipeEyebrow: "German recipe",
    backToCollection: "Back to German recipes"
  },
  "zh-hant": {
    eyebrow: "精選德國料理",
    title: "從燉肉、香腸、麵糰料理到經典蛋糕的德國食譜",
    intro: "從酸味燉牛肉 Sauerbraten、牛肉捲 Rinderrouladen、巴伐利亞脆皮烤豬肉、咖哩香腸、紐倫堡烤香腸配酸菜、Frikadellen 與 Königsberger Klopse，到馬鈴薯煎餅、起司 Spätzle、Maultaschen、豌豆湯，再以黑森林蛋糕與蜂螫蛋糕收尾。每道食譜都清楚標示份量、火力、時間、口感與熟度，並保留料理真正需要的自然步驟數。",
    recipeEyebrow: "德國料理食譜",
    backToCollection: "返回德國料理食譜"
  },
  ja: {
    eyebrow: "厳選したドイツ料理",
    title: "煮込み、ソーセージ、粉ものから伝統ケーキまで作れるドイツ料理レシピ",
    intro: "ザウアーブラーテン、リンダールラーデン、バイエルン風クルステンブラーテン、カリーヴルスト、ニュルンベルガー・ロストブラートヴルストとザワークラウト、フリカデレン、ケーニヒスベルガー・クロプセから、カルトッフェルプッファー、ケーゼシュペッツレ、マウルタッシェン、エルブゼンズッペ、シュヴァルツヴェルダー・キルシュトルテ、ビーネンシュティヒまで作れます。分量、火加減、時間、食感、火の通りを具体的に示し、料理ごとに本当に必要な自然な工程数を保っています。",
    recipeEyebrow: "ドイツ料理レシピ",
    backToCollection: "ドイツ料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 독일 요리",
    title: "브레이즈와 소시지부터 면·만두 요리와 전통 케이크까지 만드는 독일 레시피",
    intro: "자우어브라텐, 린더룰라덴, 바이에른식 크루스텐브라텐, 커리부어스트, 사워크라우트를 곁들인 뉘른베르거 로스트브라트부어스트, 프리카델렌과 쾨니히스베르거 클롭세부터 카르토펠푸퍼, 케제슈페츨레, 마울타셴, 에르브젠주페, 슈바르츠벨더 키르슈토르테와 비넨슈티히까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시하고 각 요리에 실제로 필요한 자연스러운 조리 단계를 유지합니다.",
    recipeEyebrow: "독일 요리 레시피",
    backToCollection: "독일 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารเยอรมันที่คัดสรร",
    title: "สูตรอาหารเยอรมันตั้งแต่เนื้อตุ๋นและไส้กรอก ไปจนถึงแป้ง เส้น และเค้กคลาสสิก",
    intro: "ทำได้ตั้งแต่ Sauerbraten, Rinderrouladen, หมูย่างหนังกรอบแบบบาวาเรีย, Currywurst, ไส้กรอก Nürnberger Rostbratwürste กับกะหล่ำปลีดอง, Frikadellen และ Königsberger Klopse ไปจนถึง Kartoffelpuffer, Käsespätzle, Maultaschen, Erbsensuppe, เค้กป่าดำ และ Bienenstich ทุกสูตรระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน พร้อมคงจำนวนขั้นตอนตามธรรมชาติที่อาหารแต่ละจานต้องใช้จริง",
    recipeEyebrow: "สูตรอาหารเยอรมัน",
    backToCollection: "กลับไปสูตรอาหารเยอรมัน"
  }
};

const greek = {
  en: {
    eyebrow: "Curated Greek cooking",
    title: "Greek recipes from souvlaki and village salads to braises, baked classics and syrup pastries",
    intro: "Cook moussaka, pastitsio, pork souvlaki, spanakopita, dolmades and avgolemono, then move through fasolada, gigantes plaki, gemista, beef stifado and keftedes before finishing with horiatiki and galaktoboureko. Each recipe gives precise quantities, heat, timing, texture and doneness cues while preserving the natural number of stages the dish actually needs.",
    recipeEyebrow: "Greek recipe",
    backToCollection: "Back to Greek recipes"
  },
  "zh-hant": {
    eyebrow: "精選希臘料理",
    title: "從烤肉、鄉村沙拉到焗烤、燉菜與糖漿甜點的希臘食譜",
    intro: "從木莎卡、Pastitsio、豬肉 Souvlaki、菠菜派 Spanakopita、葡萄葉捲 Dolmades、蛋檸檬雞湯 Avgolemono，到 Fasolada 白豆湯、Gigantes Plaki 烤大白豆、Gemista 填餡蔬菜、Stifado 燉牛肉、Keftedes 肉丸，再以 Horiatiki 希臘鄉村沙拉與 Galaktoboureko 奶餡千層甜點收尾。每道都清楚標出份量、火力、時間、口感與熟度線索，並保留料理真正需要的自然步驟數。",
    recipeEyebrow: "希臘料理食譜",
    backToCollection: "返回希臘料理食譜"
  },
  ja: {
    eyebrow: "厳選したギリシャ料理",
    title: "スブラキやホリアティキから煮込み、オーブン料理、シロップ菓子まで作るギリシャ料理",
    intro: "ムサカ、パスティチオ、豚肉のスブラキ、スパナコピタ、ドルマデス、アヴゴレモノをはじめ、ファソラーダ、ギガンテス・プラキ、ゲミスタ、牛肉のスティファド、ケフテデス、ホリアティキ、ガラクトブレコまで作ります。分量、火加減、時間、食感、火の通りを具体的に示し、それぞれの料理に本当に必要な自然な工程数を保っています。",
    recipeEyebrow: "ギリシャ料理レシピ",
    backToCollection: "ギリシャ料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 그리스 요리",
    title: "수블라키와 호리아티키부터 오븐 요리, 스튜, 시럽 디저트까지 만드는 그리스 요리",
    intro: "무사카, 파스티치오, 돼지고기 수블라키, 스파나코피타, 돌마데스, 아브골레모노부터 파솔라다, 기간테스 플라키, 게미스타, 소고기 스티파도, 케프테데스, 호리아티키, 갈락토부레코까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시하면서 각 음식에 실제로 필요한 자연스러운 조리 단계 수를 그대로 유지했습니다.",
    recipeEyebrow: "그리스 요리 레시피",
    backToCollection: "그리스 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารกรีกที่คัดสรร",
    title: "สูตรอาหารกรีกตั้งแต่ซูฟลากีและสลัดหมู่บ้านถึงอาหารอบ สตูว์ และขนมราดน้ำเชื่อม",
    intro: "ทำได้ตั้งแต่มูซากา พาสติตซิโอ ซูฟลากีหมู สปานาโคพิตา ดอลมาเดส และซุปอัฟโกเลโมโน ไปจนถึงฟาโซลาดา กิกันเตสพลากี เกมิสตา สติฟาโดเนื้อ เคฟเตเดส โฮเรียติกี และกาลักโตบูเรโก ทุกสูตรระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน พร้อมคงจำนวนขั้นตอนตามธรรมชาติที่อาหารแต่ละจานต้องใช้จริง",
    recipeEyebrow: "สูตรอาหารกรีก",
    backToCollection: "กลับไปสูตรอาหารกรีก"
  }
};

const american = {
  en: {
    eyebrow: "Curated American cooking",
    title: "American recipes from griddled classics and Southern comfort food to Louisiana pots and iconic bakes",
    intro: "Cook cheeseburgers, Buffalo wings, Southern fried chicken, Memphis dry-rub ribs, baked mac and cheese, New England clam chowder and Philly cheesesteaks, then move through chicken-and-sausage gumbo, jambalaya, biscuits and gravy, meatloaf and skillet cornbread before finishing with New York cheesecake, apple pie and chocolate chip cookies. Each recipe keeps the natural number of stages the dish actually needs, with precise quantities, heat, timing, texture and doneness cues.",
    recipeEyebrow: "American recipe",
    backToCollection: "Back to American recipes"
  },
  "zh-hant": {
    eyebrow: "精選美國料理",
    title: "從鐵板經典、南方舒適料理到路易斯安那燉鍋與代表性烘焙的美國食譜",
    intro: "從經典起司漢堡、水牛城辣雞翅、南方炸雞、孟菲斯乾擦肋排、焗烤通心粉起司、新英格蘭蛤蜊濃湯與費城起司牛肉三明治，到雞肉香腸 Gumbo、Jambalaya、比司吉香腸白醬、肉餅與鑄鐵鍋玉米麵包，最後以紐約乳酪蛋糕、蘋果派和巧克力豆餅乾收尾。每道都保留料理真正需要的自然步驟數，並清楚標示份量、火力、時間、口感與熟度線索。",
    recipeEyebrow: "美國料理食譜",
    backToCollection: "返回美國料理食譜"
  },
  ja: {
    eyebrow: "厳選したアメリカ料理",
    title: "グリドル料理や南部の定番からルイジアナの鍋料理、代表的な焼き菓子まで作るアメリカ料理",
    intro: "チーズバーガー、バッファローウィング、サザン・フライドチキン、メンフィス風ドライリブ、ベイクド・マカロニ＆チーズ、ニューイングランド・クラムチャウダー、フィリー・チーズステーキから、チキン＆ソーセージ・ガンボ、ジャンバラヤ、ビスケット＆グレービー、ミートローフ、スキレット・コーンブレッド、ニューヨーク・チーズケーキ、アップルパイ、チョコレートチップクッキーまで作ります。分量、火加減、時間、食感、火の通りを具体的に示し、それぞれの料理に本当に必要な自然な工程数を保っています。",
    recipeEyebrow: "アメリカ料理レシピ",
    backToCollection: "アメリカ料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 미국 요리",
    title: "철판 클래식과 남부 컴포트 푸드부터 루이지애나 냄비 요리와 대표 베이킹까지 만드는 미국 요리",
    intro: "치즈버거, 버펄로 윙, 서던 프라이드치킨, 멤피스 드라이럽 립, 베이크드 맥앤치즈, 뉴잉글랜드 클램 차우더, 필리 치즈스테이크부터 치킨 소시지 검보, 잠발라야, 비스킷 앤 그레이비, 미트로프, 스킬렛 콘브레드, 뉴욕 치즈케이크, 애플파이, 초콜릿 칩 쿠키까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시하면서 각 음식에 실제로 필요한 자연스러운 조리 단계 수를 유지했습니다.",
    recipeEyebrow: "미국 요리 레시피",
    backToCollection: "미국 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารอเมริกันที่คัดสรร",
    title: "สูตรอาหารอเมริกันตั้งแต่เมนูกระทะย่างและอาหารสบายใจแบบใต้ ไปจนถึงหม้อสไตล์ลุยเซียนาและขนมอบคลาสสิก",
    intro: "ทำตั้งแต่ชีสเบอร์เกอร์ บัฟฟาโลวิงส์ ไก่ทอดใต้ ซี่โครงดรายรับแบบเมมฟิส มักกะโรนีชีสอบ ซุปหอยนิวอิงแลนด์ และฟิลลีชีสสเต๊ก ต่อด้วยกัมโบไก่ไส้กรอก จัมบาลายา บิสกิตกับเกรวี มีตโลฟ คอร์นเบรดกระทะเหล็ก แล้วปิดท้ายด้วยนิวยอร์กชีสเค้ก พายแอปเปิล และคุกกี้ช็อกโกแลตชิป ทุกสูตรคงจำนวนขั้นตอนตามธรรมชาติที่อาหารนั้นต้องใช้จริง พร้อมระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน",
    recipeEyebrow: "สูตรอาหารอเมริกัน",
    backToCollection: "กลับไปสูตรอาหารอเมริกัน"
  }
};

const mexican = {
  en: {
    eyebrow: "Curated Mexican cooking",
    title: "Mexican recipes from tacos, braises and chile-rich soups to tamales, enchiladas and breakfasts",
    intro: "Cook tacos al pastor, cochinita pibil, mole poblano, pozole rojo and birria, then move through enchiladas verdes, carnitas, chiles rellenos, pescado a la Veracruzana and tortilla soup before finishing with chicken tamales in green salsa, huevos rancheros and chilaquiles verdes. Each recipe keeps the natural number of stages the dish actually needs, with precise quantities, heat, timing, texture and doneness cues.",
    recipeEyebrow: "Mexican recipe",
    backToCollection: "Back to Mexican recipes"
  },
  "zh-hant": {
    eyebrow: "精選墨西哥料理",
    title: "從塔可、慢燉與辣椒湯品到玉米粽、恩琪拉達與早餐的墨西哥食譜",
    intro: "從 Tacos al Pastor、Cochinita Pibil、Mole Poblano、Pozole Rojo、Birria，到 Enchiladas Verdes、Carnitas、Chiles Rellenos、Pescado a la Veracruzana 與 Tortilla Soup，最後以綠莎莎雞肉 Tamales、Huevos Rancheros 和 Chilaquiles Verdes 收尾。每道都保留料理真正需要的自然步驟數，並清楚標示份量、火力、時間、口感與熟度線索。",
    recipeEyebrow: "墨西哥料理食譜",
    backToCollection: "返回墨西哥料理食譜"
  },
  ja: {
    eyebrow: "厳選したメキシコ料理",
    title: "タコスや煮込み、チレのスープからタマレス、エンチラーダ、朝食まで作るメキシコ料理",
    intro: "タコス・アル・パストール、コチニータ・ピビル、モレ・ポブラーノ、ポソレ・ロホ、ビリアから、エンチラーダス・ベルデス、カルニタス、チレ・レジェノス、ペスカード・ア・ラ・ベラクルサーナ、トルティーヤスープ、緑のサルサの鶏肉タマレス、ウエボス・ランチェロス、チラキレス・ベルデスまで作ります。分量、火加減、時間、食感、火の通りを具体的に示し、それぞれの料理に本当に必要な自然な工程数を保っています。",
    recipeEyebrow: "メキシコ料理レシピ",
    backToCollection: "メキシコ料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 멕시코 요리",
    title: "타코와 브레이즈, 고추 수프부터 타말, 엔칠라다와 아침 요리까지 만드는 멕시코 요리",
    intro: "타코스 알 파스토르, 코치니타 피빌, 몰레 포블라노, 포솔레 로호, 비리아부터 엔칠라다스 베르데스, 카르니타스, 칠레스 레예노스, 페스카도 아 라 베라크루사나, 토르티야 수프, 살사 베르데 닭고기 타말, 우에보스 란체로스, 칠라킬레스 베르데스까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시하면서 각 음식에 실제로 필요한 자연스러운 조리 단계 수를 유지했습니다.",
    recipeEyebrow: "멕시코 요리 레시피",
    backToCollection: "멕시코 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารเม็กซิกันที่คัดสรร",
    title: "สูตรอาหารเม็กซิกันตั้งแต่ทาโก้ เมนูตุ๋น และซุปพริก ไปจนถึงทามาเลส เอนชิลาดา และอาหารเช้า",
    intro: "ทำตั้งแต่ทาโก้อัลปาสเตอร์ โกชินิตาปิบิล โมเลโปบลาโน โปโซเลโรโฮ และบีร์เรีย ต่อด้วยเอนชิลาดัสเวร์เดส การ์นิตัส ชิเลสเรเยโนส เปสกาโดอาลาเบรากรูซานา และซุปตอร์ติญา แล้วปิดท้ายด้วยทามาเลสไก่ซัลซาเขียว อูเอโวสรันเชโรส และชิลากิเลสเวร์เดส ทุกสูตรคงจำนวนขั้นตอนตามธรรมชาติที่อาหารนั้นต้องใช้จริง พร้อมระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน",
    recipeEyebrow: "สูตรอาหารเม็กซิกัน",
    backToCollection: "กลับไปสูตรอาหารเม็กซิกัน"
  }
};

const brazilian = {
  en: {
    eyebrow: "Curated Brazilian cooking",
    title: "Brazilian recipes from feijoada and Bahian seafood to churrasco, cassava classics and party sweets",
    intro: "Cook feijoada, moqueca baiana, bobó de camarão, vatapá, acarajé and picanha churrasco, then move through pão de queijo, coxinha, escondidinho, arroz carreteiro and feijão tropeiro before finishing with brigadeiro and quindim. Each recipe keeps its natural cooking stages with precise quantities, heat, timing, texture and doneness cues.",
    recipeEyebrow: "Brazilian recipe",
    backToCollection: "Back to Brazilian recipes"
  },
  "zh-hant": {
    eyebrow: "精選巴西料理",
    title: "從 Feijoada、巴伊亞海鮮到 Churrasco、木薯經典與節慶甜點的巴西食譜",
    intro: "從巴西黑豆燉肉 Feijoada、巴伊亞 Moqueca、木薯蝦燉鍋 Bobó de Camarão、Vatapá、Acarajé 與 Picanha 燒烤，到 Pão de Queijo、Coxinha、鹹牛肉木薯泥焗烤、Arroz Carreteiro 與 Feijão Tropeiro，最後以 Brigadeiro 和 Quindim 收尾。每道都依真正料理流程保留自然步驟，清楚標示份量、火力、時間、口感與熟度線索。",
    recipeEyebrow: "巴西料理食譜",
    backToCollection: "返回巴西料理食譜"
  },
  ja: {
    eyebrow: "厳選したブラジル料理",
    title: "フェイジョアーダ、バイーアの魚介、シュラスコ、キャッサバ料理と祝い菓子まで作るブラジル料理",
    intro: "フェイジョアーダ、モケカ・バイアーナ、ボボ・デ・カマラォン、バタパ、アカラジェ、ピカーニャのシュラスコから、ポン・デ・ケイジョ、コシーニャ、エスコンディジーニョ、アホース・カヘテイロ、フェイジャォン・トロペイロ、ブリガデイロ、キンジンまで作ります。分量、火加減、時間、食感、火の通りを具体的に示し、料理ごとに自然な工程数を保ちます。",
    recipeEyebrow: "ブラジル料理レシピ",
    backToCollection: "ブラジル料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 브라질 요리",
    title: "페이조아다와 바이아 해산물부터 슈하스쿠, 카사바 요리와 파티 디저트까지 만드는 브라질 레시피",
    intro: "페이조아다, 모케카 바이아나, 보보 지 카마랑, 바타파, 아카라제와 피카냐 슈하스쿠부터 팡 지 케이주, 코시냐, 에스콘지지뉴, 아호스 카헤테이루, 페이장 트로페이루, 브리가데이루와 킨딤까지 만듭니다. 정확한 분량, 불 세기, 시간, 식감과 익힘 기준을 제시하고 음식마다 필요한 자연스러운 조리 단계를 유지합니다.",
    recipeEyebrow: "브라질 요리 레시피",
    backToCollection: "브라질 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารบราซิลที่คัดสรร",
    title: "สูตรอาหารบราซิลตั้งแต่เฟโจอาดา อาหารทะเลแบบบาเฮีย ชูฮัสโก มันสำปะหลัง และขนมงานฉลอง",
    intro: "ทำตั้งแต่เฟโจอาดา โมเกกาแบบบาเฮีย โบโบเดกามาเรา วาตาปา อาคาราเฌ และชูฮัสโกพิกันญา ต่อด้วยปัง เดอ เคย์โจ โคชินญา เอสกงดิจินโญ อาฮอสคาเรเตโร และเฟเจาทรอเปโร แล้วปิดท้ายด้วยบริกาเดโรและคินดิม ทุกสูตรคงขั้นตอนตามธรรมชาติ พร้อมระบุปริมาณ ระดับไฟ เวลา เนื้อสัมผัส และจุดสุกอย่างชัดเจน",
    recipeEyebrow: "สูตรอาหารบราซิล",
    backToCollection: "กลับไปสูตรอาหารบราซิล"
  }
};

const canadian = {
  en: {
    eyebrow: "Curated Canadian cooking",
    title: "Canadian recipes from poutine and Montréal favourites to prairie berries, Newfoundland comfort food and maple treats",
    intro: "Make Québec poutine and tourtière, Montréal smoked meat and hand-rolled bagels, Toronto peameal bacon, Halifax donair, Newfoundland Jiggs dinner and toutons, prairie Saskatoon berry pie, Nanaimo bars, butter tarts, maple taffy and a documented Métis-style campfire bannock. Each recipe includes precise quantities, practical timing and culturally specific context.",
    recipeEyebrow: "Canadian recipe",
    backToCollection: "Back to Canadian recipes"
  },
  "zh-hant": {
    eyebrow: "精選加拿大料理",
    title: "從肉汁起司薯條、蒙特婁經典到草原莓果、紐芬蘭家常菜與楓糖點心",
    intro: "在家做魁北克 Poutine 與 Tourtière、蒙特婁煙燻牛肉和手工貝果、多倫多豌豆裹火腿、哈利法克斯 Donair、紐芬蘭 Jiggs Dinner 與 Toutons、草原 Saskatoon 莓果派、納奈莫方塊、奶油塔、雪上楓糖太妃，以及一款有據可查的 Métis 風營火 Bannock。每道食譜都標示精確用量、實用時間與具體文化背景。",
    recipeEyebrow: "加拿大料理食譜",
    backToCollection: "返回加拿大料理食譜"
  },
  ja: {
    eyebrow: "厳選したカナダ料理",
    title: "プーティンやモントリオールの名物から、大平原のベリー、ニューファンドランドの家庭料理、メープル菓子まで",
    intro: "ケベックのプーティンとトゥルティエール、モントリオールのスモークミートと手成形ベーグル、トロントのピーミールベーコン、ハリファックスのドネア、ニューファンドランドのジッグスディナーとトゥートン、大平原のサスカトゥーンベリーパイ、ナナイモバー、バタータルト、雪上メープルタフィー、記録に基づくメティス風焚き火バノックを作ります。分量、時間、地域文化を丁寧に記します。",
    recipeEyebrow: "カナダ料理レシピ",
    backToCollection: "カナダ料理レシピに戻る"
  },
  ko: {
    eyebrow: "엄선한 캐나다 요리",
    title: "푸틴과 몬트리올 명물부터 대평원 베리, 뉴펀들랜드 가정식과 메이플 간식까지",
    intro: "퀘벡 푸틴과 투르티에르, 몬트리올 스모크 미트와 손으로 빚은 베이글, 토론토 피밀 베이컨, 핼리팩스 도네어, 뉴펀들랜드 지그스 디너와 투턴, 대평원 사스카툰 베리 파이, 너나이모 바, 버터 타르트, 눈 위 메이플 태피, 기록된 메티스식 캠프파이어 바녹을 만듭니다. 정확한 분량과 시간, 지역의 맥락을 담았습니다.",
    recipeEyebrow: "캐나다 요리 레시피",
    backToCollection: "캐나다 요리 레시피로 돌아가기"
  },
  th: {
    eyebrow: "อาหารแคนาดาที่คัดสรร",
    title: "สูตรแคนาดาตั้งแต่พูทีนและอาหารดังมอนทรีออล ไปจนถึงเบอร์รีแพรรี อาหารนิวฟันด์แลนด์ และเมเปิล",
    intro: "ทำพูทีนและตูร์ตีแยร์จากควิเบก เนื้อรมควันและเบเกิลขึ้นรูปมือแบบมอนทรีออล เบคอนถั่วลันเตาโตรอนโต โดแนร์แฮลิแฟกซ์ จิกส์ดินเนอร์กับทูทันส์นิวฟันด์แลนด์ พายเบอร์รีซัสคาทูนจากแพรรี นานาอิโมบาร์ บัตเตอร์ทาร์ต ทอฟฟี่เมเปิลบนหิมะ และบันน็อกแคมป์ไฟแบบเมติสที่มีแหล่งบันทึก แต่ละสูตรระบุปริมาณ เวลา และบริบทท้องถิ่นอย่างชัดเจน",
    recipeEyebrow: "สูตรอาหารแคนาดา",
    backToCollection: "กลับไปสูตรอาหารแคนาดา"
  }
};

export const cuisineCollections = { chinese, japanese, korean, thai, taiwanese, indian, vietnamese, french, italian, spanish, british, german, greek, american, mexican, brazilian, canadian };
