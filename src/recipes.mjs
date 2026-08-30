import { recipeDraftA } from "./recipe-draft-a.mjs";
import { recipeDraftB } from "./recipe-draft-b.mjs";
import { expandedInstructionsA } from "./recipe-expanded-a.mjs";
import { expandedInstructionsB } from "./recipe-expanded-b.mjs";
import { japaneseRecipeDrafts } from "./japanese-recipes.mjs";
import { koreanRecipeDrafts } from "./korean-recipes.mjs";
import { recipePhotoCandidates } from "./recipe-photos.mjs";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });
const approvedPhotos = new Map(recipePhotoCandidates
  .filter((photo) => photo.commercialUseVerified && photo.realPhoto && photo.visualMatchApproved)
  .map((photo) => [photo.id, photo]));
const expandedInstructions = { ...expandedInstructionsA, ...expandedInstructionsB };

function cloneRecipe(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, item: { ...row.item } })),
    instructions: recipe.instructions.map((step) => ({ ...step })),
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function refineForPublication(source) {
  const recipe = cloneRecipe(source);

  if (recipe.id === "mapo-tofu") {
    const slurry = recipe.ingredients.find((row) => row.item.en.startsWith("cornstarch slurry"));
    if (slurry) {
      slurry.amount = "8 g + 20 ml";
      slurry.item = ml("cornstarch slurry", "玉米澱粉芡汁", "コーンスターチの水溶き", "옥수수전분물", "น้ำแป้งข้าวโพด");
    }
    recipe.sources = recipe.sources.map((source) => source.url === "https://www.chinasichuanfood.com/mapo-tofu/"
      ? { ...source, url: "https://www.chinasichuanfood.com/mapo-tofu-recipe/" }
      : source);
  }

  if (recipe.id === "kung-pao-chicken") {
    const driedChiles = recipe.ingredients.find((row) => row.item.en.startsWith("dried red chiles"));
    if (driedChiles) driedChiles.amount = "10 g";
    const peppercorns = recipe.ingredients.find((row) => row.item.en.startsWith("Sichuan peppercorns"));
    if (peppercorns) peppercorns.amount = "3 g";
    recipe.instructions[1] = ml(
      "Heat a wok over medium-high heat. Use half the oil, divided as needed, and stir-fry the chicken in two batches for 2–3 minutes each until lightly browned and the thickest piece reaches 74°C; remove each batch promptly.",
      "炒鍋以中大火燒熱。取一半油並視需要分配，雞丁分兩批各炒 2–3 分鐘，至表面略上色且最厚處達 74°C；每批熟後立即盛出。",
      "中華鍋を中強火で熱する。油の半量を必要に応じて分け、鶏肉を2回に分けて各2〜3分炒める。薄く焼き色が付き、最も厚い部分が74°Cになったら、その都度すぐ取り出す。",
      "웍을 중강불로 달군다. 전체 기름의 절반을 나누어 쓰며 닭고기를 두 번에 나눠 각각 2–3분 볶는다. 겉이 살짝 갈색이 되고 가장 두꺼운 조각이 74°C에 도달하면 즉시 덜어낸다.",
      "ตั้งกระทะจีนด้วยไฟกลางค่อนแรง ใช้น้ำมันครึ่งหนึ่งแบ่งตามจำเป็น ผัดไก่ 2 รอบ รอบละ 2–3 นาทีจนผิวเริ่มเกรียมและชิ้นที่หนาที่สุดถึง 74°C แล้วตักแต่ละรอบออกทันที"
    );
    recipe.instructions[2] = ml(
      "Lower the heat to medium-low. Add the remaining oil, dried chiles, and peppercorns; stir for 20–30 seconds until fragrant, without letting the spices blacken.",
      "轉中小火，加入其餘油、乾辣椒與花椒，翻炒 20–30 秒至出香，香料不可炒黑。",
      "中弱火に落とし、残りの油、乾燥唐辛子、花椒を加える。焦がさないよう20〜30秒、香りが立つまで炒める。",
      "중약불로 낮추고 남은 기름, 말린 고추, 화자오를 넣어 타지 않게 20–30초 향을 낸다.",
      "ลดเป็นไฟกลางอ่อน ใส่น้ำมันที่เหลือ พริกแห้ง และพริกเสฉวน ผัด 20–30 วินาทีจนหอมโดยไม่ให้เครื่องเทศไหม้ดำ"
    );
  }

  if (recipe.id === "twice-cooked-pork") {
    const greenPepper = recipe.ingredients.find((row) => row.item.en.startsWith("green bell pepper"));
    if (greenPepper) greenPepper.amount = "60 g";
    const index = recipe.ingredients.indexOf(greenPepper);
    recipe.ingredients.splice(index + 1, 0, {
      amount: "60 g",
      item: ml("red bell pepper, 3 cm strips", "紅甜椒，切 3 公分條", "赤ピーマン（3cm幅）", "빨간 피망, 3cm 크기", "พริกหวานแดง หั่นชิ้น 3 ซม.")
    });
    recipe.cookMinutes = 40;
    recipe.totalMinutes = 60;
    recipe.instructions[0] = ml(
      "Put the pork, ginger, simmering scallions, and water in a pot. Bring to a gentle simmer and cook for 30 minutes, until a chopstick enters the thickest part with little resistance and the centre reaches at least 71°C.",
      "豬肉、薑片、汆煮用青蔥與水放入鍋中，煮至微滾後續煮 30 分鐘；筷子應能以少量阻力插入最厚處，中心溫度至少達 71°C。",
      "豚肉、しょうが、下ゆで用のねぎ、水を鍋に入れ、静かな煮立ちにして30分ゆでる。最も厚い部分に箸がほぼ抵抗なく入り、中心が71°C以上になることを確認する。",
      "냄비에 돼지고기, 생강, 데침용 대파, 물을 넣고 약하게 끓여 30분 익힌다. 가장 두꺼운 부분에 젓가락이 큰 저항 없이 들어가고 중심 온도가 최소 71°C인지 확인한다.",
      "ใส่หมู ขิง ต้นหอมสำหรับต้ม และน้ำลงหม้อ ต้มเดือดอ่อน 30 นาที จนตะเกียบแทงส่วนหนาที่สุดได้โดยมีแรงต้านเพียงเล็กน้อยและอุณหภูมิใจกลางอย่างน้อย 71°C"
    );
    recipe.instructions[2] = ml(
      "Heat a wok over medium-high heat. Add the oil and pork slices; stir-fry for 2–3 minutes until some fat renders and the edges curl, without drying the meat.",
      "炒鍋以中大火燒熱，加入油與豬肉片翻炒 2–3 分鐘，至部分油脂析出、邊緣捲起即可，不要把肉炒乾。",
      "中華鍋を中強火で熱し、油と豚肉を加えて2〜3分炒める。脂が少し出て縁が反るところで止め、乾かしすぎない。",
      "웍을 중강불로 달군 뒤 기름과 돼지고기 조각을 넣어 2–3분 볶는다. 지방이 일부 빠지고 가장자리가 말리면 멈춰 고기가 마르지 않게 한다.",
      "ตั้งกระทะจีนไฟกลางค่อนแรง ใส่น้ำมันและหมู ผัด 2–3 นาทีจนไขมันออกบางส่วนและขอบม้วน โดยไม่ผัดจนเนื้อแห้ง"
    );
    recipe.sources = recipe.sources.map((source) => source.url === "https://www.chinasichuanfood.com/twice-cooked-pork/"
      ? { ...source, url: "https://www.chinasichuanfood.com/twice-cooked-pork-recipe/" }
      : source);
    recipe.visualSpec = "Curled pork-belly slices with red and green pepper, leek, fermented black beans, and red chile-bean sauce.";
  }

  if (recipe.id === "dan-dan-noodles") {
    const sugar = recipe.ingredients.find((row) => row.item.en.startsWith("granulated sugar"));
    if (sugar) {
      sugar.amount = "6 g";
      sugar.item = ml(
        "granulated sugar, divided: 4 g for sauce and 2 g for topping",
        "細砂糖，分成醬汁 4 公克與肉臊 2 公克",
        "グラニュー糖（たれ用4g、肉みそ用2gに分ける）",
        "설탕, 소스용 4g과 고기 고명용 2g으로 나눔",
        "น้ำตาลทราย แบ่ง 4 กรัมสำหรับซอสและ 2 กรัมสำหรับหน้าหมู"
      );
    }
    const preservedGreens = recipe.ingredients.find((row) => row.item.en.startsWith("ya cai"));
    if (preservedGreens) {
      preservedGreens.amount = "25 g";
      preservedGreens.item = ml(
        "ya cai or preserved mustard greens, minced; rinse first if very salty",
        "芽菜或醃芥菜，切末；若很鹹先沖洗",
        "芽菜または高菜漬け（みじん切り。塩辛ければ先に洗う）",
        "야차이 또는 절인 갓, 다짐; 매우 짜면 먼저 헹굼",
        "หย่าฉ่ายหรือผักกาดดอง สับละเอียด; ล้างก่อนหากเค็มจัด"
      );
    }
    recipe.instructions[0] = ml(
      "Combine the sesame paste, soy sauce, vinegar, chile oil, 4 g sugar, pepper, and garlic, then divide equally between two serving bowls.",
      "芝麻醬、醬油、醋、辣油、4 公克糖、花椒與蒜拌勻，再平均分入兩個上桌碗。",
      "ごまペースト、しょうゆ、酢、ラー油、砂糖4g、花椒、にんにくを混ぜ、2つの器に等分する。",
      "참깨 페이스트, 간장, 식초, 고추기름, 설탕 4g, 화자오, 마늘을 섞어 두 그릇에 똑같이 나눈다.",
      "ผสมงาบด ซีอิ๊ว น้ำส้มสายชู น้ำมันพริก น้ำตาล 4 กรัม พริกเสฉวน และกระเทียม แล้วแบ่งเท่ากันใส่ชามเสิร์ฟ 2 ใบ"
    );
    recipe.instructions[2] = ml(
      "Add the preserved greens, Shaoxing wine, and the remaining 2 g sugar. Stir-fry for 1 minute until the topping is dry and fragrant.",
      "加入醃菜、紹興酒與剩下的 2 公克糖，翻炒 1 分鐘，至肉臊乾爽出香。",
      "漬物、紹興酒、残りの砂糖2gを加え、肉みそが乾いて香り立つまで1分炒める。",
      "절임 채소, 사오싱주, 남은 설탕 2g을 넣고 고명에 수분이 없어지고 향이 날 때까지 1분 볶는다.",
      "ใส่ผักดอง เหล้าเส้าซิง และน้ำตาลที่เหลือ 2 กรัม ผัด 1 นาทีจนหน้าหมูแห้งและหอม"
    );
  }

  if (recipe.id === "tomato-egg-stir-fry") {
    recipe.ingredients = recipe.ingredients.filter((row) => !row.item.en.startsWith("scallions"));
    const eggs = recipe.ingredients.find((row) => row.item.en.startsWith("eggs"));
    if (eggs) {
      eggs.amount = ml("4 large / about 200 g", "4 顆 / 約 200 g", "4個 / 約 200 g", "4개 / 약 200 g", "4 ฟอง / ประมาณ 200 g");
      eggs.item = ml("eggs, beaten", "雞蛋，打散", "卵（溶く）", "달걀, 풀기", "ไข่ไก่ ตีให้เข้ากัน");
    }
    recipe.ingredients.push({
      amount: "45 ml",
      item: ml("water for simmering the tomatoes", "燜煮番茄用水", "トマトを煮る水", "토마토를 익힐 물", "น้ำสำหรับเคี่ยวมะเขือเทศ")
    });
    recipe.instructions[2] = ml(
      "Add the remaining oil and tomatoes. Stir-fry for 2 minutes until the skins begin to wrinkle and juices collect.",
      "加入其餘油與番茄，翻炒 2 分鐘，至表皮開始起皺並釋出汁液。",
      "残りの油とトマトを加え、皮が縮み始めて汁が出るまで2分炒める。",
      "남은 기름과 토마토를 넣고 껍질이 주름지기 시작하며 즙이 나올 때까지 2분 볶는다.",
      "ใส่น้ำมันที่เหลือและมะเขือเทศ ผัด 2 นาทีจนเปลือกเริ่มย่นและมีน้ำออกมา"
    );
    recipe.instructions[3] = ml(
      "Season with the remaining salt and sugar, add 45 ml water, and cover for 1–2 minutes. Uncover and cook for 1 minute so the tomato juices become lightly syrupy.",
      "加入其餘鹽與糖調味，倒入 45 毫升水，加蓋 1–2 分鐘；開蓋再煮 1 分鐘，使番茄汁略呈稠亮。",
      "残りの塩と砂糖で調味し、水45mlを加えて1〜2分ふたをする。ふたを外して1分煮て、トマトの汁に軽いとろみを付ける。",
      "남은 소금과 설탕으로 간하고 물 45ml를 넣어 1–2분 덮어 익힌다. 뚜껑을 열고 1분 더 익혀 토마토 즙에 가벼운 농도를 낸다.",
      "ปรุงด้วยเกลือและน้ำตาลที่เหลือ เติมน้ำ 45 มล. ปิดฝา 1–2 นาที จากนั้นเปิดฝาเคี่ยวอีก 1 นาทีให้น้ำมะเขือเทศข้นเงาเล็กน้อย"
    );
    recipe.instructions[5] = ml(
      "Turn off the heat and serve immediately while the eggs remain tender.",
      "關火後立即上桌，讓蛋塊保持柔嫩。",
      "火を止め、卵が柔らかいうちにすぐ盛る。",
      "불을 끄고 달걀이 부드러울 때 바로 낸다.",
      "ปิดไฟและเสิร์ฟทันทีขณะที่ไข่ยังนุ่ม"
    );
    recipe.visualSpec = "Soft yellow egg curds and chopped ripe tomato with lightly syrupy juices; no garnish.";
  }

  if (recipe.id === "sweet-sour-pork") {
    recipe.name = { ...recipe.name, en: "Sweet & sour pork" };
    recipe.cookMinutes = 30;
    recipe.totalMinutes = 75;
  }

  if (recipe.id === "char-siu") {
    recipe.ingredients = recipe.ingredients.filter((row) => !row.item.en.startsWith("scallion for serving"));
    const beanCurd = recipe.ingredients.find((row) => row.item.en.startsWith("red fermented bean curd"));
    if (beanCurd) beanCurd.amount = ml("20 g / 1 cube", "20 g / 1 塊", "20 g / 1個", "20 g / 1개", "20 g / 1 ก้อน");
    recipe.ingredients.push({
      amount: "350 ml",
      item: ml("hot water for the roasting tray", "烤盤用熱水", "天板に入れる湯", "오븐 팬에 넣을 뜨거운 물", "น้ำร้อนสำหรับถาดอบ")
    });
    recipe.ingredients.push({
      amount: ml("1 small sprig", "1 小枝", "小1枝", "작은 가지 1개", "1 กิ่งเล็ก"),
      item: ml("curly parsley, for serving", "捲葉巴西里，供擺盤", "カーリーパセリ（盛り付け用）", "컬리 파슬리, 곁들임", "พาร์สลีย์ใบหยิก สำหรับเสิร์ฟ")
    });
    recipe.cookMinutes = 50;
    recipe.totalMinutes = 530;
    recipe.instructions[0] = ml(
      "Mash fermented bean curd, hoisin, 30 g honey, maltose, soy, Shaoxing wine, five-spice, garlic, pepper, and sesame oil until smooth. Before the mixture touches raw pork, transfer exactly 30 ml to a clean covered bowl for basting and refrigerate it. Keep the final 15 g honey separate.",
      "紅腐乳、海鮮醬、30 公克蜂蜜、麥芽糖、醬油、紹興酒、五香粉、蒜、白胡椒與麻油拌至均勻。醬料接觸生豬肉前，精確取出 30 毫升放入乾淨有蓋容器冷藏，供後續刷醬；最後用的 15 公克蜂蜜另放。",
      "紅腐乳、海鮮醤、はちみつ30g、麦芽糖、しょうゆ、紹興酒、五香粉、にんにく、白こしょう、ごま油をなめらかに混ぜる。生の豚肉に触れる前に正確に30mlを清潔なふた付き容器へ取り分け、塗りだれ用として冷蔵する。仕上げのはちみつ15gは別にする。",
      "홍유부, 해선장, 꿀 30g, 맥아당, 간장, 사오싱주, 오향분, 마늘, 흰후추, 참기름을 곱게 섞는다. 소스가 생돼지고기에 닿기 전에 정확히 30ml를 깨끗한 뚜껑 용기에 덜어 바르는 용도로 냉장한다. 마무리용 꿀 15g은 따로 둔다.",
      "บดเต้าหู้ยี้แดง ซอสฮอยซิน น้ำผึ้ง 30 กรัม มอลโทส ซีอิ๊ว เหล้าเส้าซิง ผงพะโล้ กระเทียม พริกไทยขาว และน้ำมันงาให้เนียน ก่อนซอสสัมผัสหมูดิบ ตวง 30 มล. ใส่ภาชนะสะอาดมีฝาปิดและแช่เย็นไว้ทาเนื้อ แยกน้ำผึ้ง 15 กรัมสำหรับขั้นสุดท้าย"
    );
    recipe.instructions[1] = ml(
      "Coat the pork strips in the remaining marinade, cover, and refrigerate at least 8 hours and up to 24 hours; turn once halfway. Discard every drop of marinade that has touched the raw pork.",
      "豬肉條裹上其餘醃料，加蓋冷藏至少 8 小時、最多 24 小時，中途翻面一次；所有接觸過生豬肉的醃料一律丟棄。",
      "豚肉に残りの漬けだれを絡め、ふたをして8〜24時間冷蔵し、途中で一度返す。生肉に触れた漬けだれはすべて廃棄する。",
      "돼지고기 조각에 남은 양념을 묻혀 덮고 최소 8시간, 최대 24시간 냉장하며 중간에 한 번 뒤집는다. 생돼지고기에 닿은 양념은 모두 버린다.",
      "คลุกหมูกับซอสหมักที่เหลือ ปิดฝาแช่เย็นอย่างน้อย 8 ชั่วโมงและไม่เกิน 24 ชั่วโมง กลับด้านหนึ่งครั้งระหว่างหมัก แล้วทิ้งซอสหมักทุกส่วนที่สัมผัสหมูดิบ"
    );
    recipe.instructions[2] = ml(
      "Set a rack over a foil-lined tray, pour 350 ml hot water into the tray below the rack, and heat the oven to 230°C. Arrange pork with space between the strips and roast for 15 minutes, until the edges begin to brown.",
      "烤架放在鋪鋁箔的烤盤上，於烤架下方倒入 350 毫升熱水，烤箱預熱至 230°C。豬肉條留出間距排好，烤 15 分鐘至邊緣開始上色。",
      "ホイルを敷いた天板に網を置き、網の下へ湯350mlを注ぎ、オーブンを230°Cに予熱する。豚肉を間隔を空けて並べ、縁に焼き色が付き始めるまで15分焼く。",
      "호일을 깐 팬 위에 랙을 놓고 랙 아래 팬에 뜨거운 물 350ml를 붓는다. 오븐을 230°C로 예열하고 돼지고기 사이를 띄워 15분, 가장자리가 갈색이 되기 시작할 때까지 굽는다.",
      "วางตะแกรงบนถาดที่ปูฟอยล์ เทน้ำร้อน 350 มล. ลงในถาดใต้ตะแกรง และอุ่นเตาอบที่ 230°C วางหมูให้มีช่องว่าง อบ 15 นาทีจนขอบเริ่มเป็นสีน้ำตาล"
    );
    recipe.instructions[3] = ml(
      "Whisk 15 ml warm water into the reserved clean 30 ml marinade. Lower the oven to 190°C, brush the pork with this mixture, and roast for 15 minutes more.",
      "將 15 毫升溫水拌入預留的乾淨 30 毫升醬料。烤箱降至 190°C，將醬料刷在豬肉上，再烤 15 分鐘。",
      "取り分けた清潔なたれ30mlにぬるま湯15mlを混ぜる。オーブンを190°Cに下げ、豚肉に塗ってさらに15分焼く。",
      "따로 둔 깨끗한 양념 30ml에 미지근한 물 15ml를 섞는다. 오븐을 190°C로 낮추고 돼지고기에 바른 뒤 15분 더 굽는다.",
      "ผสมน้ำอุ่น 15 มล. กับซอสสะอาดที่แยกไว้ 30 มล. ลดเตาอบเหลือ 190°C ทาซอสบนหมูแล้วอบต่อ 15 นาที"
    );
    recipe.instructions[5] = ml(
      "Rest the pork on the rack for 10 minutes so the juices settle. Slice across the grain into 5 mm pieces, brush lightly with the tray juices, and serve with the parsley sprig at the side.",
      "豬肉留在烤架靜置 10 分鐘使肉汁穩定，逆紋切成 5 公釐片，薄刷烤盤肉汁，再於盤側放上捲葉巴西里。",
      "網の上で10分休ませて肉汁を落ち着かせ、繊維を断つ向きに5mm厚に切る。天板の肉汁を薄く塗り、皿の端にカーリーパセリを添える。",
      "랙에서 10분 쉬어 육즙을 안정시킨 뒤 결 반대로 5mm 두께로 썬다. 팬의 육즙을 얇게 바르고 접시 옆에 컬리 파슬리를 곁들인다.",
      "พักหมูบนตะแกรง 10 นาทีให้เนื้อเก็บน้ำ หั่นขวางเส้นใยหนา 5 มม. ทาน้ำจากถาดบาง ๆ แล้ววางพาร์สลีย์ใบหยิกไว้ข้างจาน"
    );
    recipe.imageAlt = ml(
      "Glossy sliced char siu on a white plate with a small parsley sprig",
      "白盤上盛著亮澤切片叉燒，盤側有一小枝捲葉巴西里",
      "白い皿に盛ったつやのある薄切り叉焼と、小さなカーリーパセリ",
      "흰 접시에 담긴 윤기 나는 차슈 조각과 작은 컬리 파슬리",
      "หมูแดงหั่นชิ้นมันวาวบนจานขาว พร้อมพาร์สลีย์ใบหยิกกิ่งเล็ก"
    );
    recipe.visualSpec = "Glossy sliced char siu on a white plate with a small parsley sprig; no unlisted garnish on the plate.";
  }

  if (recipe.id === "clay-pot-rice") {
    const sausage = recipe.ingredients.find((row) => row.item.en.startsWith("sweet Chinese sausage"));
    if (sausage) sausage.amount = ml("100 g / 2 links", "100 g / 2 條", "100 g / 2本", "100 g / 2개", "100 g / 2 ชิ้น");
    recipe.prepMinutes = 60;
    recipe.cookMinutes = 30;
    recipe.totalMinutes = 90;
  }

  if (recipe.id === "beef-chow-fun") {
    recipe.instructions[1] = ml(
      "Let the sealed fresh noodles stand at room temperature for 20 minutes, then separate the strands gently by hand. Do not soak or rinse them; discard any pieces that remain hard or smell sour. Mix the wok soy sauces, wine, sesame oil, sugar, and pepper.",
      "新鮮河粉保持密封，在室溫放置 20 分鐘，再用手輕輕分開。不要浸水或沖洗；仍然硬結或帶酸味者丟棄。另將炒製用醬油、紹興酒、麻油、糖與白胡椒拌勻。",
      "密封した生の河粉を室温に20分置き、手でやさしくほぐす。水に浸したり洗ったりせず、硬いまま、または酸っぱいにおいのする部分は使わない。炒め用のしょうゆ、紹興酒、ごま油、砂糖、白こしょうを混ぜる。",
      "밀봉한 생 쌀국수를 실온에 20분 둔 뒤 손으로 부드럽게 가닥을 푼다. 물에 담그거나 헹구지 말고, 계속 딱딱하거나 신 냄새가 나는 부분은 버린다. 볶음용 간장, 사오싱주, 참기름, 설탕, 흰후추를 섞는다.",
      "พักเส้นใหญ่สดทั้งถุงปิดสนิทที่อุณหภูมิห้อง 20 นาที แล้วค่อย ๆ แยกเส้นด้วยมือ ห้ามแช่หรือล้างน้ำ และทิ้งส่วนที่ยังแข็งหรือมีกลิ่นเปรี้ยว ผสมซีอิ๊วสำหรับผัด เหล้าเส้าซิง น้ำมันงา น้ำตาล และพริกไทยขาว"
    );
  }

  if (recipe.id === "jiaozi") {
    recipe.prepMinutes = 90;
    recipe.cookMinutes = 30;
    recipe.totalMinutes = 120;
    const panFryOil = recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil for pan-fry"));
    if (panFryOil) {
      panFryOil.amount = ml("15 ml per 12", "每 12 顆 15 ml", "12個につき 15 ml", "12개당 15 ml", "15 ml ต่อ 12 ชิ้น");
      panFryOil.item = ml(
        "neutral cooking oil for the optional pan-fry method",
        "選用煎餃作法的中性食用油",
        "焼き餃子にする場合の植物油",
        "선택 사항인 군만두용 중성 식용유",
        "น้ำมันรสกลางสำหรับวิธีทอดกระทะ (ตัวเลือก)"
      );
    }
    recipe.ingredients.push({
      amount: ml("60 ml per 12", "每 12 顆 60 ml", "12個につき 60 ml", "12개당 60 ml", "60 ml ต่อ 12 ชิ้น"),
      item: ml(
        "water for the optional pan-fry method",
        "選用煎餃作法用水",
        "焼き餃子にする場合の水",
        "선택 사항인 군만두용 물",
        "น้ำสำหรับวิธีทอดกระทะ (ตัวเลือก)"
      )
    });
    recipe.instructions[2] = ml(
      "Roll the dough into a 3 cm rope, cut 48 equal pieces, and roll each into an 8 cm round with a slightly thicker centre. Keep every piece covered so it does not dry.",
      "麵糰搓成直徑 3 公分長條，平均切成 48 份；每份擀成直徑 8 公分、中心略厚的圓皮。全程蓋好，避免風乾。",
      "生地を直径3cmの棒状にし、48等分する。各生地を直径8cm、中央が少し厚い円形にのばす。乾かないよう常に覆う。",
      "반죽을 지름 3cm 막대로 만든 뒤 48등분한다. 각 조각을 가운데가 조금 더 두꺼운 지름 8cm 원형으로 민다. 마르지 않게 계속 덮어 둔다.",
      "คลึงแป้งเป็นแท่งเส้นผ่านศูนย์กลาง 3 ซม. ตัดเท่ากัน 48 ชิ้น แล้วรีดแต่ละชิ้นเป็นวงกลม 8 ซม. ให้ตรงกลางหนากว่าขอบเล็กน้อย คลุมไว้ตลอดไม่ให้แห้ง"
    );
    recipe.instructions[3] = ml(
      "Place exactly 15 g filling in each wrapper, pleat and seal firmly with no trapped air. Arrange all 48 dumplings on a lightly floured tray without touching.",
      "每張皮放入精確 15 公克餡料，打褶並確實封口，不留空氣；48 顆餃子排在薄撒麵粉的托盤上，彼此不可碰觸。",
      "皮1枚に正確に15gのあんを置き、空気を残さずひだを寄せてしっかり閉じる。48個すべてを薄く打ち粉したトレーに、触れ合わないよう並べる。",
      "피마다 소를 정확히 15g 넣고 공기가 갇히지 않게 주름을 잡아 단단히 봉한다. 48개를 가볍게 밀가루 뿌린 트레이에 서로 닿지 않게 놓는다.",
      "ใส่ไส้ชั่งตรง 15 กรัมต่อแผ่น จับจีบและปิดให้แน่นโดยไม่มีอากาศค้าง วางเกี๊ยวทั้ง 48 ชิ้นบนถาดโรยแป้งบาง ๆ ไม่ให้แตะกัน"
    );
    recipe.instructions[4] = ml(
      "For boiled jiaozi, bring 3 L water to a rolling boil over high heat. Cook 12–16 dumplings per batch for 6–8 minutes; they should float, the wrappers turn slightly translucent, and the centres reach 74°C.",
      "製作水餃時，以大火將 3 公升水煮至大滾；每批煮 12–16 顆、6–8 分鐘，至餃子浮起、外皮略透明且餡心達 74°C。",
      "水餃子は3Lの湯を強火で沸騰させ、1回12〜16個を6〜8分ゆでる。浮き上がり、皮が少し透け、中心が74°Cになることを確認する。",
      "물만두는 물 3L를 센 불로 완전히 끓이고 한 번에 12–16개씩 6–8분 삶는다. 만두가 떠오르고 피가 살짝 투명해지며 속 중심이 74°C가 되어야 한다.",
      "สำหรับเกี๊ยวต้ม ต้มน้ำ 3 ลิตรให้เดือดจัดด้วยไฟแรง ต้มครั้งละ 12–16 ชิ้นนาน 6–8 นาที จนลอย แผ่นแป้งโปร่งแสงเล็กน้อย และไส้ตรงกลางถึง 74°C"
    );
    recipe.instructions[5] = ml(
      "Lift boiled jiaozi out with a slotted spoon and serve with black rice vinegar and chile oil on the side. For each optional 12-dumpling pan-fry batch, brown in 15 ml oil over medium-high heat for 2 minutes, add 60 ml water, cover 5 minutes, then uncover for 1 minute to crisp.",
      "水餃以漏勺撈起，黑米醋與辣油另放供沾食。選用煎餃作法時，每批 12 顆以 15 毫升油中大火煎 2 分鐘，加入 60 毫升水、加蓋 5 分鐘，再開蓋煎 1 分鐘至酥脆。",
      "水餃子は穴あきお玉ですくい、黒米酢とラー油を別添えにする。焼き餃子は12個につき油15mlで中強火2分焼き、水60mlを加えて5分ふたをし、ふたを外して1分焼いてカリッとさせる。",
      "삶은 만두는 구멍 국자로 건져 흑미식초와 고추기름을 따로 곁들인다. 군만두는 12개당 기름 15ml로 중강불에 2분 굽고 물 60ml를 넣어 5분 덮은 뒤 뚜껑을 열어 1분 바삭하게 굽는다.",
      "ตักเกี๊ยวต้มด้วยกระชอน เสิร์ฟน้ำส้มข้าวดำและน้ำมันพริกแยกด้านข้าง สำหรับการทอดกระทะครั้งละ 12 ชิ้น ใช้น้ำมัน 15 มล. ทอดไฟกลางค่อนแรง 2 นาที เติมน้ำ 60 มล. ปิดฝา 5 นาที แล้วเปิดฝาทอดอีก 1 นาทีให้กรอบ"
    );
    recipe.imageAlt = ml(
      "Plump boiled jiaozi with smooth, lightly translucent wrappers on a white plate",
      "白盤中盛著外皮光滑、略帶透明感的飽滿水餃",
      "白い皿に盛った、皮がなめらかでわずかに透けるふっくらした水餃子",
      "흰 접시에 담긴, 피가 매끈하고 살짝 비치는 통통한 물만두",
      "เกี๊ยวต้มอวบวางบนจานขาว แผ่นแป้งเรียบและโปร่งแสงเล็กน้อย"
    );
    recipe.visualSpec = "Plump boiled jiaozi with smooth, lightly translucent wrappers on a plain white plate; no dip or unlisted garnish visible.";
  }

  if (recipe.id === "scallion-pancakes") {
    recipe.cookMinutes = 25;
    recipe.totalMinutes = 70;
    recipe.instructions[4] = ml(
      "Heat a skillet over medium heat with 3.75 ml oil per pancake. Cook each pancake for 2–3 minutes per side, pressing and rotating occasionally, until blistered, crisp, deeply golden, and fully set at the centre.",
      "平底鍋以中火燒熱，每張餅使用 3.75 毫升油；每面煎 2–3 分鐘，期間偶爾輕壓並轉動，至表面起泡酥脆、呈深金黃色且中心完全熟透。",
      "フライパンを中火で熱し、1枚につき油3.75mlを使う。時々押さえて回しながら片面2〜3分ずつ焼き、気泡ができてカリッと濃いきつね色になり、中心まで火を通す。",
      "프라이팬을 중불로 달구고 한 장당 기름 3.75ml를 쓴다. 가끔 누르고 돌리며 면마다 2–3분씩 구워 기포가 생기고 바삭한 짙은 황금빛이 되며 속까지 완전히 익힌다.",
      "ตั้งกระทะแบนด้วยไฟกลาง ใช้น้ำมัน 3.75 มล. ต่อแผ่น ทอดด้านละ 2–3 นาที กดและหมุนเป็นครั้งคราว จนผิวพองกรอบ สีทองเข้ม และตรงกลางสุกทั่ว"
    );
    recipe.imageAlt = ml(
      "Golden scallion-pancake wedges stacked on a plate, with crisp blistered surfaces, flaky layers, and green scallion at the cut edges",
      "盤中堆疊金黃蔥油餅切片，表面酥脆起泡，切面可見層次與綠色蔥花",
      "皿に重ねた黄金色の葱油餅。気泡のあるカリッとした表面と層、切り口の青ねぎが見える",
      "접시에 쌓은 황금빛 파전병 조각으로, 바삭하게 부푼 표면과 결, 단면의 초록 대파가 보인다",
      "ชิ้นแพนเค้กต้นหอมสีทองซ้อนบนจาน ผิวพองกรอบ เห็นชั้นแป้งและต้นหอมสีเขียวตรงรอยตัด"
    );
    recipe.visualSpec = "Golden scallion-pancake wedges stacked on a plate, with crisp blistered surfaces, flaky layers, and green scallion visible at the cut edges; no dipping bowl visible.";
  }

  if (recipe.id === "wonton-soup") {
    recipe.ingredients = recipe.ingredients.filter((row) => !row.item.en.startsWith("baby bok choy"));
    const wrappers = recipe.ingredients.find((row) => row.item.en.startsWith("square wonton wrappers"));
    if (wrappers) {
      wrappers.amount = ml("48 sheets", "48 張", "48枚", "48장", "48 แผ่น");
      wrappers.item = ml("square wonton wrappers, about 384 g total", "方形餛飩皮，總重約 384 公克", "正方形のワンタンの皮（合計約384g）", "사각 완탕피, 총 약 384g", "แผ่นเกี๊ยวสี่เหลี่ยม น้ำหนักรวมประมาณ 384 กรัม");
    }
    recipe.ingredients.push({
      amount: "2 L",
      item: ml("water for boiling the wontons", "煮餛飩用水", "ワンタンをゆでる水", "완탕 삶을 물", "น้ำสำหรับต้มเกี๊ยว")
    });
    recipe.cookMinutes = 20;
    recipe.totalMinutes = 80;
    recipe.description = ml(
      "Silky square wontons filled with pork, shrimp, ginger, and scallion, served in a clear sesame-scented chicken broth.",
      "方形餛飩皮包入豬肉、蝦仁、薑與青蔥，盛在帶芝麻香的清澈雞湯中。",
      "豚肉、えび、しょうが、ねぎを包んだなめらかなワンタンを、ごま香る澄んだ鶏だしで味わいます。",
      "돼지고기, 새우, 생강, 대파를 채운 매끈한 완탕을 참기름 향의 맑은 닭육수에 담습니다.",
      "เกี๊ยวแผ่นบางไส้หมู กุ้ง ขิง และต้นหอม เสิร์ฟในน้ำซุปไก่ใสหอมน้ำมันงา"
    );
    recipe.instructions[1] = ml(
      "Place exactly 12 g filling in each of the 48 wrappers. Moisten the edges with water, fold into a triangle, press out all air, then bring the two lower corners together; keep finished wontons covered.",
      "48 張餛飩皮每張放入精確 12 公克餡料。邊緣沾水後對折成三角形，擠出空氣，再將下方兩角黏合；包好的餛飩全程蓋好。",
      "48枚の皮それぞれに正確に12gのあんを置く。縁を水でぬらして三角に折り、空気を抜いてから下の2つの角を合わせる。包んだワンタンは覆っておく。",
      "완탕피 48장마다 소를 정확히 12g 넣는다. 가장자리에 물을 묻혀 삼각형으로 접고 공기를 모두 뺀 뒤 아래 두 모서리를 붙인다. 완성한 완탕은 덮어 둔다.",
      "ใส่ไส้ชั่งตรง 12 กรัมในแผ่นเกี๊ยวทั้ง 48 แผ่น แตะน้ำที่ขอบ พับเป็นสามเหลี่ยม ไล่อากาศออก แล้วประกบมุมล่างทั้งสอง คลุมเกี๊ยวที่ห่อแล้วไว้"
    );
    recipe.instructions[3] = ml(
      "Bring a separate pot with 2 L water to a full boil over high heat while keeping the broth at a bare simmer.",
      "另取一鍋加入 2 公升水，以大火煮至完全沸騰；同時讓湯底維持微滾。",
      "別鍋に2Lの湯を強火で沸かし、その間だしは静かな煮立ちに保つ。",
      "별도 냄비에 물 2L를 센 불로 완전히 끓이고 육수는 약하게 끓는 상태로 유지한다.",
      "ต้มน้ำ 2 ลิตรในหม้ออีกใบด้วยไฟแรงให้เดือดจัด ระหว่างนั้นรักษาน้ำซุปให้เดือดอ่อน ๆ"
    );
    recipe.instructions[4] = ml(
      "Cook 16 wontons per batch at a gentle boil for 3–5 minutes. They should float, the wrappers look semi-transparent, and the pork-and-shrimp centres reach 74°C; scoop out immediately.",
      "每批 16 顆，以溫和沸騰煮 3–5 分鐘；餛飩應浮起、外皮呈半透明，豬蝦餡心達 74°C，隨即撈出。",
      "1回16個ずつ、静かな沸騰で3〜5分ゆでる。浮き上がり、皮が半透明になり、豚肉とえびの中心が74°Cになったらすぐ取り出す。",
      "한 번에 16개씩 약하게 끓는 물에서 3–5분 삶는다. 완탕이 떠오르고 피가 반투명해지며 돼지고기·새우 속 중심이 74°C가 되면 즉시 건진다.",
      "ต้มครั้งละ 16 ชิ้นด้วยน้ำเดือดอ่อน 3–5 นาที จนลอย แผ่นแป้งกึ่งโปร่งแสง และไส้หมูกุ้งตรงกลางถึง 74°C แล้วตักขึ้นทันที"
    );
    recipe.instructions[5] = ml(
      "Place 12 wontons in each of four bowls, pour over the hot broth, scatter scallion, and serve within 5 minutes so the wrappers stay silky.",
      "四個碗各放 12 顆餛飩，沖入熱湯並撒青蔥；5 分鐘內上桌，讓餛飩皮保持滑嫩。",
      "4つの器にワンタンを12個ずつ入れ、熱いだしを注いでねぎを散らす。皮がなめらかなうちに5分以内に供する。",
      "네 그릇에 완탕을 12개씩 담고 뜨거운 육수를 부어 대파를 뿌린 뒤 피가 매끈할 때 5분 안에 낸다.",
      "ใส่เกี๊ยวชามละ 12 ชิ้นใน 4 ชาม เทน้ำซุปร้อน โรยต้นหอม และเสิร์ฟภายใน 5 นาทีเพื่อให้แผ่นเกี๊ยวยังนุ่มลื่น"
    );
    recipe.visualSpec = "Plump wontons in clear golden broth with fresh scallion rings; no unlisted garnish.";
  }

  if (recipe.id === "peking-duck") {
    recipe.ingredients = recipe.ingredients.filter((row) => !row.item.en.startsWith("room-temperature water for pancakes"));
    const pancakeWater = recipe.ingredients.find((row) => row.item.en.startsWith("boiling water for pancakes"));
    if (pancakeWater) pancakeWater.amount = "180 ml";
    recipe.ingredients.push(
      {
        amount: "3.8 L",
        item: ml("boiling water for scalding the duck", "燙鴨皮用沸水", "鴨の皮にかける熱湯", "오리 껍질 데칠 끓는 물", "น้ำเดือดสำหรับลวกหนังเป็ด")
      },
      {
        amount: "250 ml",
        item: ml("hot water for the roasting tray", "烤盤用熱水", "天板に入れる湯", "오븐 팬에 넣을 뜨거운 물", "น้ำร้อนสำหรับถาดอบ")
      }
    );
    recipe.cookMinutes = 100;
    recipe.totalMinutes = 1540;
    recipe.instructions[1] = ml(
      "Set the chilled duck on a rack in a clean sink and slowly ladle 3.8 L boiling water over every side to tighten the skin; drain well. Stir maltose into the measured 60 ml boiling water with soy sauce and white vinegar, then brush this glaze evenly over the duck.",
      "冷藏鴨放在乾淨水槽內的架上，將 3.8 公升沸水緩慢淋遍各面，使鴨皮收緊並充分瀝乾。麥芽糖以量好的 60 毫升沸水調開，加入醬油與白醋拌勻，再均勻刷遍鴨身。",
      "冷やした鴨を清潔な流しの網に置き、熱湯3.8Lを全体へゆっくりかけて皮を締め、よく水気を切る。麦芽糖を計量した熱湯60mlで溶き、しょうゆと白酢を混ぜ、鴨全体に均一に塗る。",
      "차가운 오리를 깨끗한 싱크대의 랙에 놓고 끓는 물 3.8L를 모든 면에 천천히 끼얹어 껍질을 조인 뒤 충분히 물기를 뺀다. 맥아당을 계량한 끓는 물 60ml에 풀고 간장과 흰식초를 섞어 오리 전체에 고르게 바른다.",
      "วางเป็ดเย็นบนตะแกรงในอ่างล้างที่สะอาด ค่อย ๆ ตักน้ำเดือด 3.8 ลิตรราดทุกด้านให้หนังตึง แล้วสะเด็ดน้ำให้ดี ละลายมอลโทสในน้ำเดือดที่ตวงไว้ 60 มล. ผสมซีอิ๊วและน้ำส้มสายชูขาว แล้วทาเคลือบทั่วเป็ดให้สม่ำเสมอ"
    );
    recipe.instructions[2] = ml(
      "Return the glazed duck to the rack, uncovered, in the refrigerator for 6–8 hours, until the skin feels dry rather than tacky. Meanwhile, mix the pancake flour with 180 ml boiling water, knead for 8 minutes until smooth, cover, and rest for 60 minutes.",
      "刷好糖液的鴨放回烤架，不加覆蓋冷藏 6–8 小時，至鴨皮乾燥、不再黏手。同時將薄餅麵粉與 180 毫升沸水拌合，揉 8 分鐘至光滑，加蓋靜置 60 分鐘。",
      "たれを塗った鴨を網に戻し、覆わずに6〜8時間冷蔵して、皮がべたつかず乾いた状態にする。その間にパンケーキ用の粉へ熱湯180mlを加え、8分こねてなめらかにし、覆って60分休ませる。",
      "윤기를 바른 오리를 랙에 다시 놓아 덮지 않고 6–8시간 냉장해 껍질이 끈적이지 않고 마르게 한다. 그동안 전병용 밀가루에 끓는 물 180ml를 섞어 8분간 매끈하게 반죽하고 덮어 60분 쉰다.",
      "นำเป็ดที่ทาเคลือบกลับวางบนตะแกรง แช่เย็นโดยไม่คลุม 6–8 ชั่วโมงจนหนังแห้งไม่เหนียว ระหว่างนั้นผสมแป้งทำแผ่นกับน้ำเดือด 180 มล. นวด 8 นาทีจนเนียน คลุมและพัก 60 นาที"
    );
    recipe.instructions[4] = ml(
      "Heat the oven to 240°C. Place the duck breast-side up on a rack over a roasting tray, pour 250 ml hot water into the tray below the rack to limit fat spatter, and roast for 15 minutes.",
      "烤箱預熱至 240°C。鴨胸朝上放在烤盤上方的烤架，於烤架下方倒入 250 毫升熱水以減少油脂噴濺，先烤 15 分鐘。",
      "オーブンを240°Cに予熱する。鴨を胸側を上にして天板の網に置き、脂の飛び散りを抑えるため網の下へ湯250mlを注ぎ、15分焼く。",
      "오븐을 240°C로 예열한다. 오리를 가슴이 위로 오게 팬 위 랙에 놓고 지방 튐을 줄이도록 랙 아래 팬에 뜨거운 물 250ml를 부어 15분 굽는다.",
      "อุ่นเตาอบที่ 240°C วางเป็ดอกขึ้นบนตะแกรงเหนือถาด เทน้ำร้อน 250 มล. ลงในถาดใต้ตะแกรงเพื่อลดไขมันกระเด็น แล้วอบ 15 นาที"
    );
    recipe.instructions[5] = ml(
      "Lower the oven to 180°C and roast for 65–70 minutes more, until the skin is deep mahogany and crisp and the thickest part of the thigh reaches 74°C. Tent only fast-darkening areas loosely with foil.",
      "烤箱降至 180°C，再烤 65–70 分鐘，至鴨皮呈深棗紅且酥脆，鴨腿最厚處達 74°C；僅將上色過快的部位鬆蓋鋁箔。",
      "オーブンを180°Cに下げ、さらに65〜70分、皮が濃い赤褐色でパリッとし、ももの最も厚い部分が74°Cになるまで焼く。色づきが早い部分だけ、ホイルをゆるくかぶせる。",
      "오븐을 180°C로 낮추고 65–70분 더 구워 껍질이 짙은 적갈색으로 바삭해지고 허벅지 가장 두꺼운 부분이 74°C가 되게 한다. 너무 빨리 진해지는 부분만 호일로 느슨하게 덮는다.",
      "ลดเตาอบเหลือ 180°C อบต่อ 65–70 นาทีจนหนังเป็นสีน้ำตาลแดงเข้มและกรอบ และส่วนที่หนาที่สุดของน่องถึง 74°C ใช้ฟอยล์คลุมหลวม ๆ เฉพาะจุดที่เข้มเร็วเกินไป"
    );
    if (!recipe.sources.some((source) => source.url === "https://www.bbcgoodfood.com/recipes/peking-duck")) {
      recipe.sources.push({ title: "Good Food — Peking duck by Ken Hom", url: "https://www.bbcgoodfood.com/recipes/peking-duck" });
    }
  }

  return recipe;
}

const chineseRecipeDrafts = [...recipeDraftA, ...recipeDraftB];
const publishedChineseRecipes = chineseRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => {
    const refined = refineForPublication(recipe);
    return {
      ...refined,
      instructions: expandedInstructions[recipe.id] ?? refined.instructions,
      photo: approvedPhotos.get(recipe.id)
    };
  });

const publishedJapaneseRecipes = japaneseRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedKoreanRecipes = koreanRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

export const recipes = [...publishedChineseRecipes, ...publishedJapaneseRecipes, ...publishedKoreanRecipes];
export const allRecipeDrafts = [...chineseRecipeDrafts, ...japaneseRecipeDrafts, ...koreanRecipeDrafts];
