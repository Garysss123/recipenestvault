import { recipeDraftA } from "./recipe-draft-a.mjs";
import { recipeDraftB } from "./recipe-draft-b.mjs";
import { expandedInstructionsA } from "./recipe-expanded-a.mjs";
import { expandedInstructionsB } from "./recipe-expanded-b.mjs";
import { japaneseRecipeDrafts } from "./japanese-recipes.mjs";
import { koreanRecipeDrafts } from "./korean-recipes.mjs";
import { thaiRecipeDrafts } from "./thai-recipes.mjs";
import { taiwaneseRecipeDrafts } from "./taiwanese-recipes.mjs";
import { indianRecipeDrafts } from "./indian-recipes.mjs";
import { vietnameseRecipeDrafts } from "./vietnamese-recipes.mjs";
import { frenchRecipeDrafts } from "./french-recipes.mjs";
import { italianRecipeDrafts } from "./italian-recipes.mjs";
import { spanishRecipeDrafts } from "./spanish-recipes.mjs";
import { britishRecipeDrafts } from "./british-recipes.mjs";
import { germanRecipeDrafts } from "./german-recipes.mjs";
import { greekRecipeDrafts } from "./greek-recipes.mjs";
import { americanRecipeDrafts } from "./american-recipes.mjs";
import { mexicanRecipeDrafts } from "./mexican-recipes.mjs";
import { brazilianRecipeDrafts } from "./brazilian-recipes.mjs";
import { canadianRecipeDrafts } from "./canadian-recipes.mjs";
import { middleEasternRecipeDrafts } from "./middle-eastern-recipes.mjs";
import { mediterraneanRecipeDrafts } from "./mediterranean-recipes.mjs";
import { africanRecipeDrafts } from "./african-recipes.mjs";
import { otherWorldRecipeDrafts } from "./other-world-recipes.mjs";
import { recipePhotoCandidates } from "./recipe-photos.mjs";
import { refineFiftyFirstMethods } from "./recipe-method-audit-fifty-first.mjs";
import { refineFiftySecondMethods } from "./recipe-method-audit-fifty-second.mjs";
import { refineFiftyThirdMethods } from "./recipe-method-audit-fifty-third.mjs";
import { refineFiftyFourthMethods } from "./recipe-method-audit-fifty-fourth.mjs";
import { refineFiftyFifthMethods } from "./recipe-method-audit-fifty-fifth.mjs";
import { refineFiftySixthMethods } from "./recipe-method-audit-fifty-sixth.mjs";
import { refineFiftySeventhMethods } from "./recipe-method-audit-fifty-seventh.mjs";
import { refineFiftyEighthMethods } from "./recipe-method-audit-fifty-eighth.mjs";

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

function addSource(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) recipe.sources.push({ title, url });
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
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  }

  if (recipe.id === "twice-cooked-pork") {
    const greenPepper = recipe.ingredients.find((row) => row.item.en.startsWith("green bell pepper"));
    if (greenPepper) greenPepper.amount = "60 g";
    const index = recipe.ingredients.indexOf(greenPepper);
    recipe.ingredients.splice(index + 1, 0, {
      amount: "60 g",
      item: ml("red bell pepper, 3 cm strips", "紅甜椒，切 3 公分條", "赤ピーマン（3cm幅）", "빨간 피망, 3cm 크기", "พริกหวานแดง หั่นชิ้น 3 ซม.")
    });
    recipe.cookMinutes = 50;
    recipe.totalMinutes = 70;
    recipe.instructions[0] = ml(
      "Put the pork, ginger, simmering scallions, and water in a pot. Bring to a gentle simmer and cook for about 30 minutes. Prepare the vegetables in the next step while it simmers. At about 30 minutes, check the thickest centre with a thermometer; continue in 5-minute increments until it reaches 63°C (145°F) and a chopstick enters with little resistance. Rest off the heat for 10 minutes in the next step.",
      "豬肉、薑片、汆煮用青蔥與水放入鍋中，煮至微滾後續煮約 30 分鐘，並在下一步趁空準備蔬菜。約 30 分鐘時用溫度計測量最厚處中心；每次再煮 5 分鐘，直到達 63°C（145°F）且筷子能以少量阻力插入。下一步將離火靜置 10 分鐘。",
      "豚肉、しょうが、下ゆで用のねぎ、水を鍋に入れ、静かな煮立ちにして約30分ゆで、その間に次の手順で野菜を準備する。約30分後、最も厚い部分の中心を温度計で測る。63°C（145°F）に達し、箸がほぼ抵抗なく入るまで5分ずつ追加で煮る。次の手順で火から下ろして10分休ませる。",
      "냄비에 돼지고기, 생강, 데침용 대파, 물을 넣고 약하게 끓여 약 30분 삶는다. 끓는 동안 다음 단계에서 채소를 손질한다. 약 30분 뒤 가장 두꺼운 중심을 온도계로 재고 63°C (145°F)에 도달하며 젓가락이 큰 저항 없이 들어갈 때까지 5분씩 더 끓인다. 다음 단계에서 불에서 내려 10분 둔다.",
      "ใส่หมู ขิง ต้นหอมสำหรับต้ม และน้ำลงหม้อ ต้มเดือดอ่อนประมาณ 30 นาที ระหว่างนั้นเตรียมผักตามขั้นตอนถัดไป เมื่อครบประมาณ 30 นาที ใช้เทอร์โมมิเตอร์วัดตรงกลางส่วนที่หนาที่สุด เคี่ยวต่อครั้งละ 5 นาทีจนถึง 63°C (145°F) และตะเกียบแทงเข้าได้โดยมีแรงต้านน้อย จากนั้นพักนอกเตา 10 นาทีตามขั้นตอนถัดไป"
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
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
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
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
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
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
    addSource(recipe, "Official food-safety guidance — FDA: What You Need to Know About Egg Safety", "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety");
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
    recipe.prepMinutes = 490;
    recipe.cookMinutes = 50;
    recipe.totalMinutes = 540;
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
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
    recipe.imageAlt = ml(
      "Glossy sliced char siu on a white plate with a small parsley sprig",
      "白盤上盛著亮澤切片叉燒，盤側有一小枝捲葉巴西里",
      "白い皿に盛ったつやのある薄切り叉焼と、小さなカーリーパセリ",
      "흰 접시에 담긴 윤기 나는 차슈 조각과 작은 컬리 파슬리",
      "หมูแดงหั่นชิ้นมันวาวบนจานขาว พร้อมพาร์สลีย์ใบหยิกกิ่งเล็ก"
    );
    recipe.visualSpec = "Glossy sliced char siu on a white plate with a small parsley sprig; no unlisted garnish on the plate.";
  }

  if (recipe.id === "hyderabadi-chicken-biryani") {
    recipe.instructions[0].body = ml(
      "Mix the yogurt, ginger-garlic paste, biryani masala, chile, lemon juice, and 7 g salt. Coat the chicken around the joints, cover, and refrigerate for 2–4 hours; the displayed 180-minute prep estimate uses 3 hours. While it chills, complete the onion, herb, rice, and saffron-milk preparation in the next steps. Keep raw-chicken tools and hands away from ready-to-eat herbs, and wash them before continuing.",
      "將優格、薑蒜泥、biryani 香料、辣椒粉、檸檬汁與 7 公克鹽拌勻，抹勻雞肉關節周圍，加蓋冷藏 2–4 小時；顯示的 180 分鐘備料時間以醃 3 小時計算。冷藏期間依後續步驟準備洋蔥、香草、米與番紅花奶。生雞肉用具和手不可碰即食香草，接續前先清洗。",
      "ヨーグルト、しょうがにんにくペースト、ビリヤニマサラ、唐辛子、レモン汁、塩7gを混ぜ、鶏肉の関節まわりまで絡めます。ふたをして2〜4時間冷蔵します。表示される準備時間180分は3時間の漬け込みを想定しています。冷蔵中に次の手順で玉ねぎ、香草、米、サフランミルクを準備します。生鶏肉の器具や手をそのまま香草に触れさせず、続ける前に洗います。",
      "요거트, 생강마늘 페이스트, 비리야니 마살라, 고춧가루, 레몬즙과 소금 7g을 섞어 닭 관절 주변까지 묻힌다. 덮어 2–4시간 냉장한다. 표시된 준비 시간 180분은 3시간 재우는 경우다. 냉장하는 동안 다음 단계에서 양파, 허브, 쌀, 사프란 우유를 준비한다. 생닭 도구와 손이 바로 먹는 허브에 닿지 않게 하고 다음 작업 전에 씻는다.",
      "ผสมโยเกิร์ต ขิงกระเทียมบด มาซาลาบิริยานี พริกป่น น้ำเลมอน และเกลือ 7 กรัม คลุกให้ทั่วโดยเฉพาะรอบข้อไก่ ปิดฝาแช่เย็น 2–4 ชั่วโมง เวลาเตรียมที่แสดง 180 นาทีคิดจากการหมัก 3 ชั่วโมง ระหว่างแช่เย็นให้เตรียมหอม สมุนไพร ข้าว และนมหญ้าฝรั่นตามขั้นตอนถัดไป แยกอุปกรณ์และมือที่สัมผัสไก่ดิบจากสมุนไพรพร้อมกิน และล้างก่อนทำต่อ"
    );
    recipe.instructions[8].body = ml(
      "Open the pot away from your face. Probe several of the thickest chicken pieces near the bone without touching bone; each must reach 74°C (165°F). If any are lower, reseal and return the pot to the lowest heat in 5-minute increments, then recheck. The clock is only a guide. Confirm the rice has no hard core, rest uncovered for 5 minutes, then divide evenly into six servings: about 167 g raw bone-in chicken equivalent and 83 g dry-rice equivalent per serving, with the onions and herbs shared across the plates.",
      "開蓋時讓蒸氣遠離臉部。用溫度計測量數塊最厚雞肉、靠近骨頭但不要碰到骨頭；每塊都須達 74°C（165°F）。若有未達者，重新封鍋，以最小火每次續煮 5 分鐘後再測。時間只能作為參考。確認米心沒有硬芯，開蓋靜置 5 分鐘，再平均分成六份：每份約含 167 公克帶骨生雞肉份量與 83 公克乾米份量，洋蔥和香草也平均分配。",
      "顔から蒸気を遠ざけてふたを開けます。最も厚い鶏肉を複数、骨に触れないよう骨の近くで測り、すべて74°C（165°F）以上にします。低いものがあれば再び密閉し、ごく弱火で5分ずつ追加加熱して再測定します。時間は目安にすぎません。米に硬い芯がないことを確かめ、ふたを取って5分休ませ、6人分に均等に分けます。1人分は骨付き生鶏肉換算約167g、乾燥米換算約83gで、玉ねぎと香草も分けます。",
      "얼굴에서 증기가 멀어지도록 뚜껑을 연다. 가장 두꺼운 닭고기 여러 조각을 뼈에 닿지 않게 뼈 가까이에서 재고 모두 74°C (165°F)에 도달해야 한다. 낮은 조각이 있으면 다시 밀봉해 가장 약한 불에서 5분씩 더 익힌 뒤 다시 잰다. 시간은 안내일 뿐이다. 쌀에 단단한 심이 없는지 확인하고 뚜껑을 연 채 5분 둔 다음 여섯 몫으로 고르게 나눈다. 1인분은 뼈 포함 생닭 기준 약 167g, 마른쌀 기준 약 83g이며 양파와 허브도 나눈다.",
      "เปิดหม้อโดยหันไอน้ำออกจากใบหน้า ใช้เทอร์โมมิเตอร์วัดไก่ชิ้นหนาที่สุดหลายชิ้นบริเวณใกล้กระดูกโดยไม่ให้หัววัดแตะกระดูก ทุกชิ้นต้องถึง 74°C (165°F) หากชิ้นใดยังต่ำ ให้ปิดผนึกอีกครั้งและปรุงด้วยไฟอ่อนสุดครั้งละ 5 นาทีแล้ววัดใหม่ เวลาเป็นเพียงแนวทาง ตรวจว่าข้าวไม่มีไตแข็ง พักโดยไม่ปิดฝา 5 นาที แล้วแบ่งเท่า ๆ กัน 6 ที่ แต่ละที่เทียบเท่าไก่ดิบติดกระดูกประมาณ 167 กรัมและข้าวสาร 83 กรัม แบ่งหอมและสมุนไพรให้ทั่ว"
    );
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  }

  if (recipe.id === "tempura") {
    recipe.instructions[0].body = ml(
      "Peel and devein the two large shrimp, leave the tails on, and make shallow cuts underneath so they stay straight. Keep the shrimp covered and refrigerated while cutting the vegetables; pat them dry just before dusting. Use a separate clean board and utensils for raw shrimp, then wash your hands and tools before handling cooked food. Cut the sweet potato, green pepper, and zucchini to the listed sizes and pat dry.",
      "剝除兩尾大型蝦的殼與腸泥，保留尾部，並在腹側淺切幾刀讓蝦身保持筆直。切蔬菜時將蝦加蓋冷藏，裹粉前再擦乾。生蝦使用獨立乾淨的砧板與用具，處理熟食前洗手並清洗器具。地瓜、青椒與櫛瓜依標示尺寸切好並擦乾。",
      "大きなえび2尾の殻と背わたを取り、尾を残して腹側に浅く切り込みを入れ、まっすぐにします。野菜を切る間はえびを覆って冷蔵し、粉を付ける直前に水気を拭きます。生えび用の清潔なまな板と器具を分け、調理済み食品に触れる前に手と器具を洗います。さつまいも、ピーマン、ズッキーニを記載の大きさに切って水気を取ります。",
      "큰 새우 두 마리의 껍질과 내장을 제거하되 꼬리는 남기고, 배 쪽에 얕게 칼집을 넣어 곧게 편다. 채소를 자르는 동안 새우를 덮어 냉장하고 튀김옷을 묻히기 직전에 물기를 닦는다. 생새우용 깨끗한 도마와 도구를 따로 쓰고 조리된 음식을 만지기 전 손과 도구를 씻는다. 고구마, 피망, 애호박을 적힌 크기로 자르고 물기를 닦는다.",
      "แกะเปลือกและเอาเส้นดำของกุ้งตัวใหญ่ 2 ตัวออก โดยเก็บหางไว้ กรีดตื้น ๆ ที่ด้านท้องเพื่อให้กุ้งตรง ระหว่างหั่นผักให้ปิดฝาและแช่กุ้งในตู้เย็น ซับให้แห้งก่อนคลุกแป้ง ใช้เขียงและอุปกรณ์สะอาดแยกสำหรับกุ้งดิบ ล้างมือและอุปกรณ์ก่อนจับอาหารสุก หั่นมันหวาน พริกเขียว และซูกินีตามขนาดที่ระบุแล้วซับให้แห้ง"
    );
    recipe.instructions[6].body = ml(
      "Fry a few pieces at a time for about 2–3 minutes for shrimp and 1–2 minutes for vegetables; these times are guides. The shrimp are done when the thickest flesh is firm, pearly white, and opaque throughout, with no translucent centre. Do not use a fixed internal temperature for shrimp. Keep oil between 165–175°C and let it recover between batches; vegetables should be pale golden and tender. Lift each batch to a clean wire rack.",
      "每批少量下鍋，蝦約炸 2–3 分鐘、蔬菜約 1–2 分鐘，時間僅供參考。最厚處蝦肉結實、呈珍珠白且完全不透明、沒有半透明中心即熟；蝦不套用固定內部溫度。油溫維持 165–175°C，批次之間等油溫回升；蔬菜應呈淡金色且熟軟。每批炸好移至乾淨網架瀝油。",
      "一度に少量ずつ揚げます。えびは約2〜3分、野菜は約1〜2分が目安です。最も厚いえびの身が締まり、真珠色で全体が不透明になり、半透明の中心がなくなれば火が通っています。えびに一律の内部温度は当てはめません。油を165〜175°Cに保ち、各回の間に温度を戻します。野菜は淡いきつね色で柔らかく仕上げ、清潔な網に上げます。",
      "한 번에 몇 조각씩 튀긴다. 새우는 약 2–3분, 채소는 약 1–2분이 기준이다. 가장 두꺼운 새우 살이 단단하고 진주빛을 띠며 전체가 불투명하고 반투명한 중심이 없으면 익은 것이다. 새우에 일률적인 내부 온도를 적용하지 않는다. 기름은 165–175°C로 유지하고 배치 사이 온도를 회복시킨다. 채소는 연한 금빛에 부드러워지면 건져 깨끗한 망에 올린다.",
      "ทอดครั้งละไม่กี่ชิ้น กุ้งประมาณ 2–3 นาทีและผัก 1–2 นาทีเป็นแนวทาง กุ้งสุกเมื่อเนื้อส่วนหนาที่สุดแน่น มีสีขาวมุกและทึบแสงทั่ว ไม่มีตรงกลางใสหรือโปร่งแสง ไม่กำหนดอุณหภูมิภายในแบบตายตัวให้กุ้ง รักษาน้ำมันที่ 165–175°C และรอให้อุณหภูมิกลับขึ้นระหว่างชุด ผักควรเป็นสีทองอ่อนและนุ่ม ตักแต่ละชุดขึ้นพักบนตะแกรงสะอาด"
    );
    recipe.instructions[7].body = ml(
      "Divide the two shrimp between two plates, one per serving, and share the vegetables evenly. Serve with the measured tentsuyu, daikon, and ginger on clean dishes; keep the crisp batter uncovered.",
      "兩尾蝦分成兩份，每份一尾，蔬菜平均分配。以乾淨小碟盛裝定量的天婦羅沾汁、白蘿蔔泥與薑；炸衣保持敞開，才不易回軟。",
      "えび2尾を2人分に1尾ずつ分け、野菜も均等に分けます。計量した天つゆ、大根おろし、しょうがを清潔な器に添え、衣が湿らないよう覆わずに出します。",
      "새우 두 마리를 두 접시에 한 마리씩 나누고 채소도 고르게 나눈다. 계량한 덴쓰유, 간 무와 생강은 깨끗한 그릇에 담고 튀김옷이 눅눅해지지 않게 덮지 않는다.",
      "แบ่งกุ้ง 2 ตัวใส่ 2 จาน ที่ละ 1 ตัว และแบ่งผักให้เท่ากัน เสิร์ฟกับเท็นสึยุ หัวไชเท้าขูด และขิงตามปริมาณที่วัดไว้ในภาชนะสะอาด อย่าปิดฝาเพื่อให้แป้งยังกรอบ"
    );
    addSource(recipe, "Official food-safety guidance — FDA: Selecting and Serving Fresh and Frozen Seafood Safely", "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely");
  }

  if (recipe.id === "lamingtons") {
    recipe.prepMinutes = 165;
    recipe.cookMinutes = 25;
    recipe.totalMinutes = 190;
    recipe.instructions[0].body = ml(
      "Heat the oven to 180°C. Grease and line a 20 cm square cake tin with baking paper, leaving an overhang to lift out the sponge; this size gives sixteen 5 cm squares.",
      "烤箱預熱至 180°C。20 公分方形蛋糕模抹油並鋪烘焙紙，留出紙邊方便取出海綿蛋糕；此尺寸可切成 16 個 5 公分方塊。",
      "オーブンを180°Cに予熱します。20cm角の型に油を塗り、取り出しやすいよう紙を余らせて敷きます。この大きさなら5cm角を16個切り分けられます。",
      "오븐을 180°C로 예열한다. 20cm 정사각 틀에 기름을 바르고 스펀지를 꺼내기 쉽도록 종이를 여유 있게 깐다. 이 크기는 5cm 정사각형 16개로 자를 수 있다.",
      "อุ่นเตาอบที่ 180°C ทาไขมันและรองกระดาษอบในพิมพ์สี่เหลี่ยมจัตุรัส 20 ซม. โดยให้กระดาษยื่นเพื่อยกสปันจ์ออก ขนาดนี้ตัดเป็นชิ้น 5 ซม. ได้ 16 ชิ้น"
    );
    recipe.instructions[2].body = ml(
      "Sift the flours over the egg mixture and fold gently. Fold in the boiling water and melted butter, pour into the tin, and bake at 180°C for about 20–25 minutes. Check for a springy centre and edges that begin to pull from the tin; if the centre does not spring back, continue in 3-minute increments. The displayed cook time is a guide, not a substitute for the doneness cue.",
      "麵粉篩入蛋糊中輕柔翻拌，再拌入沸水與融化奶油，倒入烤模，以 180°C 烤約 20–25 分鐘。中心按壓會回彈、邊緣開始離模即可；若中心未回彈，每次再烤 3 分鐘並重查。顯示的烘烤時間僅供參考，仍以熟度判斷為準。",
      "粉類を卵液にふるい入れ、優しく折り混ぜます。熱湯と溶かしバターも混ぜて型に流し、180°Cで約20〜25分焼きます。中央に弾力があり、縁が型から離れ始めたら焼き上がりです。中央が戻らなければ3分ずつ追加して確認します。表示時間は目安で、焼き上がりの状態を優先します。",
      "가루를 달걀 반죽 위에 체쳐 부드럽게 접어 섞는다. 끓는 물과 녹인 버터도 넣고 틀에 부어 180°C에서 약 20–25분 굽는다. 가운데가 탄력 있게 되돌아오고 가장자리가 틀에서 떨어지기 시작하면 된다. 가운데가 돌아오지 않으면 3분씩 더 굽고 확인한다. 표시 시간은 기준이며 익은 상태를 우선한다.",
      "ร่อนแป้งลงในไข่ที่ตีแล้วตะล่อมเบา ๆ ใส่น้ำเดือดกับเนยละลาย เทลงพิมพ์ อบที่ 180°C ประมาณ 20–25 นาที ตรวจว่าตรงกลางเด้งกลับและขอบเริ่มร่อนจากพิมพ์ หากตรงกลางยังไม่เด้ง ให้อบเพิ่มครั้งละ 3 นาทีแล้วตรวจ เวลาอบที่แสดงเป็นแนวทาง ให้ยึดลักษณะสุกเป็นหลัก"
    );
    recipe.instructions[3].body = ml(
      "Cool the sponge completely on a rack, about 45 minutes as a guide, then refrigerate for 1 hour so it cuts cleanly. Split horizontally, spread all 180 g raspberry jam evenly, and replace the top.",
      "蛋糕移至網架放涼至完全冷卻，約 45 分鐘作為參考，再冷藏 1 小時方便切整齊。橫向剖開，將 180 公克覆盆子果醬均勻抹開並蓋回上層。",
      "スポンジを網に移し、目安として約45分、完全に冷まします。きれいに切れるよう1時間冷蔵し、横に切ってラズベリージャム180gを均等に塗り、上を戻します。",
      "스펀지를 망에 옮겨 기준 약 45분 동안 완전히 식힌 뒤 깔끔하게 자르도록 1시간 냉장한다. 가로로 갈라 라즈베리잼 180g을 고르게 바르고 윗장을 덮는다.",
      "พักสปันจ์บนตะแกรงจนเย็นสนิท ประมาณ 45 นาทีเป็นแนวทาง แล้วแช่เย็น 1 ชั่วโมงให้ตัดง่าย ผ่าตามแนวนอน ทาแยมราสป์เบอร์รีทั้งหมด 180 กรัมให้ทั่วแล้วประกบกลับ"
    );
    recipe.instructions[4].body = ml(
      "Cut the filled sponge into sixteen equal 5 cm squares. With the 180 g jam spread evenly, each square contains about 11 g jam on average. Whisk the cocoa and icing sugar with boiling water, then stir in the chopped chocolate until the coating is smooth and pourable.",
      "將夾餡海綿蛋糕切成 16 個均勻的 5 公分方塊。180 公克果醬平均抹開後，每塊平均約有 11 公克。可可粉與糖粉加沸水拌勻，再拌入巧克力至滑順可沾裹。",
      "ジャム入りスポンジを5cm角の16個に均等に切ります。ジャム180gを均等に塗ると、1個あたり平均約11gです。ココアと粉砂糖に熱湯を混ぜ、刻んだチョコを加えて滑らかで流れるコーティングにします。",
      "잼을 넣은 스펀지를 5cm 정사각형 16개로 고르게 자른다. 잼 180g을 균등하게 바르면 한 조각당 평균 약 11g이다. 코코아와 슈가파우더에 끓는 물을 섞고 다진 초콜릿을 넣어 부드럽게 흐르는 코팅을 만든다.",
      "ตัดสปันจ์ประกบแยมเป็นสี่เหลี่ยม 5 ซม. เท่ากัน 16 ชิ้น เมื่อทาแยม 180 กรัมให้ทั่ว จะเฉลี่ยประมาณ 11 กรัมต่อชิ้น ตีโกโก้กับน้ำตาลไอซิงและน้ำเดือด แล้วใส่ช็อกโกแลตสับคนจนเนียนเหลวพอชุบ"
    );
    recipe.instructions[6].body = ml(
      "Let the chocolate coating set on the rack for about 30 minutes before serving. The batch makes sixteen equal pieces, one per serving; store them in a single layer so the coconut stays fluffy.",
      "巧克力糖霜在網架上靜置約 30 分鐘定型後再上桌。此批共 16 個等份，每份一個；單層保存，椰絲才不會壓扁。",
      "チョコレートのコーティングを網の上で約30分固めてから出します。16個でき、1人分は1個です。ココナッツがつぶれないよう一段で保存します。",
      "초콜릿 코팅을 망 위에서 약 30분 굳힌 뒤 낸다. 같은 크기로 16개가 나오며 1인분은 한 개다. 코코넛이 눌리지 않도록 한 겹으로 보관한다.",
      "พักเคลือบช็อกโกแลตบนตะแกรงประมาณ 30 นาทีให้เซ็ตก่อนเสิร์ฟ ได้ 16 ชิ้นเท่ากัน หนึ่งชิ้นต่อที่ เก็บเรียงชั้นเดียวให้มะพร้าวฟู"
    );
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
    recipe.cookMinutes = 40;
    recipe.totalMinutes = 130;
    recipe.yield = ml("48 dumplings (4 servings)", "48 顆（4 份）", "48個（4人分）", "48개(4인분)", "48 ชิ้น (4 ที่)");
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
      "Weigh the finished filling and divide it into 48 equal portions, about 16–17 g each depending on how much water the cabbage releases. Place one portion in each wrapper, pleat and seal firmly with no trapped air.",
      "將完成的餡料秤重後平均分成 48 份；依白菜擠出的水量不同，每份約 16–17 公克。每張皮放入一份，打褶並確實封口、不留空氣。",
      "できたあんを量り、48等分します。白菜から絞れた水分によりますが、1個あたり約16～17gが目安です。皮に1等分を置き、空気を残さずひだを寄せて閉じます。",
      "완성된 소의 무게를 재어 48등분합니다. 배추에서 짜낸 수분량에 따라 한 개당 약 16–17g이 기준입니다. 피마다 한 몫을 넣고 공기가 갇히지 않게 주름을 잡아 단단히 봉합니다.",
      "ชั่งไส้ที่ผสมเสร็จแล้วแบ่งเท่ากัน 48 ส่วน ส่วนละประมาณ 16–17 กรัม ขึ้นกับปริมาณน้ำที่บีบออกจากกะหล่ำ ใส่หนึ่งส่วนต่อแผ่น จับจีบปิดให้แน่นไม่มีอากาศ"
    );
    recipe.instructions[4] = ml(
      "For boiled jiaozi, bring 3 L water to a rolling boil over high heat. Cook 16 dumplings per batch for 6–8 minutes, then check the largest in every batch: it should float, the wrapper turn slightly translucent, and the ground-pork centre reach 71°C (160°F). Continue in 1-minute increments if needed and return the water to a boil between batches.",
      "水餃做法：以大火將 3 公升水煮至大滾，每批煮 16 顆、6–8 分鐘；每批都檢查最大顆：應浮起、外皮略透明，豬絞肉餡心達 71°C（160°F）。若未達標，每次續煮 1 分鐘，並在批次之間讓水恢復沸騰。",
      "水餃子は水3Lを強火で沸かし、1回16個ずつ6～8分ゆでます。各回で最も大きい餃子を確認し、浮き、皮が少し透け、豚ひき肉の中心が71°C（160°F）に達していることを確認します。不足なら1分ずつ追加し、回ごとに湯を沸騰状態へ戻します。",
      "물만두는 물 3L를 센 불로 팔팔 끓이고 한 번에 16개씩 6–8분 삶습니다. 매번 가장 큰 만두를 확인해 떠오르고 피가 살짝 투명하며 다진 돼지고기 중심이 71°C (160°F)에 도달했는지 확인합니다. 부족하면 1분씩 더 익히고 배치 사이에 물을 다시 끓입니다.",
      "สำหรับเกี๊ยวต้ม ต้มน้ำ 3 ลิตรให้เดือดจัดด้วยไฟแรง ต้มครั้งละ 16 ชิ้นนาน 6–8 นาที แล้วตรวจชิ้นใหญ่สุดในทุกชุดให้ลอย แผ่นโปร่งแสงเล็กน้อย และใจกลางหมูบดถึง 71°C (160°F) หากยังไม่ถึงให้ต้มเพิ่มครั้งละ 1 นาที และต้มน้ำให้เดือดอีกครั้งระหว่างชุด"
    );
    recipe.instructions[5] = ml(
      "Lift boiled jiaozi with a slotted spoon after the float, translucency, and 71°C checks. Serve 12 dumplings per person with 11.25 ml black rice vinegar and 3.75 ml chili oil. For each optional 12-dumpling pan-fry batch, brown in 15 ml oil for 2 minutes, add 60 ml water, cover 5 minutes, then uncover for 1 minute; check the largest dumpling's pork centre for 71°C, adding 15 ml water and cooking in 1-minute covered increments if needed.",
      "水餃符合浮起、皮略透明及 71°C 三項判斷後，用漏勺撈起。每人分 12 顆，另備 11.25 毫升黑米醋與 3.75 毫升辣油。若選煎餃，每批 12 顆以 15 毫升油煎 2 分鐘，加入 60 毫升水並加蓋 5 分鐘，再開蓋煎 1 分鐘；檢查最大顆的豬肉中心達 71°C，未達時加 15 毫升水、加蓋每次續煎 1 分鐘。",
      "浮き、皮の透け、中心71°Cを確認した水餃子を穴あきお玉ですくいます。1人12個に分け、黒米酢11.25mlとラー油3.75mlを添えます。焼き餃子は12個ずつ油15mlで2分焼き、水60mlを加えてふたをし5分、ふたを外して1分焼きます。最も大きい餃子の豚肉中心が71°Cか確認し、不足なら水15mlを足してふたをし、1分ずつ追加します。",
      "떠오름, 반투명한 피, 중심 71°C를 확인한 물만두를 구멍 국자로 건집니다. 한 사람당 12개씩 담고 흑미식초 11.25ml와 고추기름 3.75ml를 곁들입니다. 군만두는 한 번에 12개씩 기름 15ml로 2분 굽고 물 60ml를 넣어 덮고 5분, 뚜껑을 열어 1분 굽습니다. 가장 큰 만두의 돼지고기 중심이 71°C인지 확인하고 부족하면 물 15ml를 더해 덮고 1분씩 익힙니다.",
      "ตักเกี๊ยวต้มด้วยกระชอนเมื่อผ่านเกณฑ์ลอย แผ่นกึ่งใส และใจกลาง 71°C เสิร์ฟคนละ 12 ชิ้นกับน้ำส้มข้าวดำ 11.25 มล. และน้ำมันพริก 3.75 มล. สำหรับเกี๊ยวทอดกระทะแต่ละชุด ชุดละ 12 ชิ้น ใช้น้ำมัน 15 มล. จี่ 2 นาที เติมน้ำ 60 มล. ปิดฝา 5 นาที แล้วเปิดฝาอีก 1 นาที ตรวจใจกลางหมูของชิ้นใหญ่สุดให้ถึง 71°C หากยังไม่ถึงให้เติมน้ำ 15 มล. ปิดฝาและปรุงเพิ่มครั้งละ 1 นาที"
    );
    recipe.imageAlt = ml(
      "Plump boiled jiaozi with smooth, lightly translucent wrappers on a white plate",
      "白盤中盛著外皮光滑、略帶透明感的飽滿水餃",
      "白い皿に盛った、皮がなめらかでわずかに透けるふっくらした水餃子",
      "흰 접시에 담긴, 피가 매끈하고 살짝 비치는 통통한 물만두",
      "เกี๊ยวต้มอวบวางบนจานขาว แผ่นแป้งเรียบและโปร่งแสงเล็กน้อย"
    );
    recipe.visualSpec = "Plump boiled jiaozi with smooth, lightly translucent wrappers on a plain white plate; no dip or unlisted garnish visible.";
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
    addSource(recipe, "Official food-safety guidance — USDA FSIS: Correct Food Thermometer Placement", "https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer");
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
    recipe.cookMinutes = 25;
    recipe.totalMinutes = 85;
    recipe.description = ml(
      "Silky square wontons filled with pork, shrimp, ginger, and scallion, served in a clear sesame-scented chicken broth.",
      "方形餛飩皮包入豬肉、蝦仁、薑與青蔥，盛在帶芝麻香的清澈雞湯中。",
      "豚肉、えび、しょうが、ねぎを包んだなめらかなワンタンを、ごま香る澄んだ鶏だしで味わいます。",
      "돼지고기, 새우, 생강, 대파를 채운 매끈한 완탕을 참기름 향의 맑은 닭육수에 담습니다.",
      "เกี๊ยวแผ่นบางไส้หมู กุ้ง ขิง และต้นหอม เสิร์ฟในน้ำซุปไก่ใสหอมน้ำมันงา"
    );
    recipe.instructions[1] = ml(
      "The filling totals about 573 g; divide it evenly among all 48 wrappers at about 11.9 g each. Moisten the edges with water, fold into a triangle, press out all air, then bring the two lower corners together; keep finished wontons covered.",
      "餡料總重約 573 公克，平均分給 48 張餛飩皮，每張約 11.9 公克。邊緣沾水後對折成三角形，擠出空氣，再將下方兩角黏合；包好的餛飩全程蓋好。",
      "あんの合計は約573gです。48枚の皮に均等に分け、1個あたり約11.9gを置きます。縁を水でぬらして三角に折り、空気を抜いてから下の2つの角を合わせます。包んだワンタンは覆っておきます。",
      "소는 총 약 573g이므로 완탕피 48장에 고르게 나누어 한 장당 약 11.9g씩 넣는다. 가장자리에 물을 묻혀 삼각형으로 접고 공기를 모두 뺀 뒤 아래 두 모서리를 붙인다. 완성한 완탕은 덮어 둔다.",
      "ไส้ทั้งหมดประมาณ 573 กรัม แบ่งให้เท่ากันในแผ่นเกี๊ยว 48 แผ่น แผ่นละประมาณ 11.9 กรัม แตะน้ำที่ขอบ พับเป็นสามเหลี่ยม ไล่อากาศออก แล้วประกบมุมล่างทั้งสอง คลุมเกี๊ยวที่ห่อแล้วไว้"
    );
    recipe.instructions[3] = ml(
      "Bring a separate pot with 2 L water to a full boil over high heat while keeping the broth at a bare simmer.",
      "另取一鍋加入 2 公升水，以大火煮至完全沸騰；同時讓湯底維持微滾。",
      "別鍋に2Lの湯を強火で沸かし、その間だしは静かな煮立ちに保つ。",
      "별도 냄비에 물 2L를 센 불로 완전히 끓이고 육수는 약하게 끓는 상태로 유지한다.",
      "ต้มน้ำ 2 ลิตรในหม้ออีกใบด้วยไฟแรงให้เดือดจัด ระหว่างนั้นรักษาน้ำซุปให้เดือดอ่อน ๆ"
    );
    recipe.instructions[4] = ml(
      "Cook 16 wontons per batch at a gentle boil for 3–5 minutes. Check the thickest wonton: it should float, the wrapper look semi-transparent, the pork centre reach 71°C, and the shrimp become firm and opaque. Continue in 1-minute increments if needed, then scoop out promptly.",
      "每批 16 顆，以溫和沸騰煮 3–5 分鐘。檢查最厚的餛飩：應浮起、外皮半透明、豬肉中心達 71°C，蝦肉緊實且不透明；若未達，每次再煮 1 分鐘，隨即撈出。",
      "1回16個ずつ、静かな沸騰で3〜5分ゆでる。最も大きいワンタンが浮き、皮が半透明で、豚肉の中心が71°C、えびが締まって不透明か確認する。不足なら1分ずつ追加し、すぐ取り出す。",
      "한 번에 16개씩 약하게 끓는 물에서 3–5분 삶는다. 가장 큰 완탕이 뜨고 피가 반투명하며 돼지고기 중심이 71°C, 새우가 단단하고 불투명한지 확인한다. 부족하면 1분씩 더 익힌 뒤 바로 건진다.",
      "ต้มครั้งละ 16 ชิ้นในน้ำเดือดอ่อน 3–5 นาที ตรวจชิ้นใหญ่สุดให้ลอย แผ่นกึ่งโปร่งแสง หมูตรงกลางถึง 71°C และกุ้งแน่นทึบแสง หากยังไม่ถึงให้ต้มเพิ่มครั้งละ 1 นาทีแล้วตักทันที"
    );
    recipe.instructions[5] = ml(
      "Place 12 wontons in each of four bowls. Pour 375 ml broth and add 5 g scallion per bowl; each serving represents about 56 g raw pork and 56 g raw shrimp in the filling. Serve within 5 minutes so the wrappers stay silky.",
      "四個碗各放 12 顆餛飩，每碗舀入 375 毫升高湯並撒 5 公克青蔥；每份餡料約相當於 56 公克生豬肉與 56 公克生蝦。5 分鐘內上桌，讓餛飩皮保持滑嫩。",
      "4つの器にワンタンを12個ずつ入れ、だし375mlとねぎ5gを各器に加えます。1人分の具は生の豚肉約56g、えび約56g相当です。皮がなめらかなうちに5分以内に供します。",
      "네 그릇에 완탕을 12개씩 담고 육수 375ml와 대파 5g씩 넣는다. 한 그릇의 소는 생돼지고기 약 56g과 생새우 약 56g 상당이다. 피가 매끈할 때 5분 안에 낸다.",
      "ใส่เกี๊ยวชามละ 12 ชิ้น ราดน้ำซุป 375 มล.และต้นหอม 5 กรัมต่อชาม ไส้ต่อที่เทียบเท่าหมูดิบประมาณ 56 กรัมและกุ้งดิบประมาณ 56 กรัม เสิร์ฟใน 5 นาทีเพื่อให้แผ่นยังนุ่มลื่น"
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
    recipe.prepMinutes = 1600;
    recipe.cookMinutes = 120;
    recipe.totalMinutes = 1720;
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
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: 4 Steps to Food Safety", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
    addSource(recipe, "Official food-safety guidance — FoodSafety.gov: Cold Food Storage Charts", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts");
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
  .map((recipe) => {
    const refined = recipe.id === "tempura" ? refineForPublication(recipe) : recipe;
    return { ...refined, photo: approvedPhotos.get(recipe.id) };
  });

const publishedKoreanRecipes = koreanRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedThaiRecipes = thaiRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedTaiwaneseRecipes = taiwaneseRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedIndianRecipes = indianRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => {
    const refined = recipe.id === "hyderabadi-chicken-biryani" ? refineForPublication(recipe) : recipe;
    return { ...refined, photo: approvedPhotos.get(recipe.id) };
  });

const publishedVietnameseRecipes = vietnameseRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedFrenchRecipes = frenchRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedItalianRecipes = italianRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedSpanishRecipes = spanishRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedBritishRecipes = britishRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedGermanRecipes = germanRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedGreekRecipes = greekRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedAmericanRecipes = americanRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedMexicanRecipes = mexicanRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedBrazilianRecipes = brazilianRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedCanadianRecipes = canadianRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedMiddleEasternRecipes = middleEasternRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedMediterraneanRecipes = mediterraneanRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedAfricanRecipes = africanRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => ({ ...recipe, photo: approvedPhotos.get(recipe.id) }));

const publishedOtherWorldRecipes = otherWorldRecipeDrafts
  .filter((recipe) => approvedPhotos.has(recipe.id))
  .map((recipe) => {
    const refined = recipe.id === "lamingtons" ? refineForPublication(recipe) : recipe;
    return { ...refined, photo: approvedPhotos.get(recipe.id) };
  });

export const recipes = [...publishedChineseRecipes, ...publishedJapaneseRecipes, ...publishedKoreanRecipes, ...publishedThaiRecipes, ...publishedTaiwaneseRecipes, ...publishedIndianRecipes, ...publishedVietnameseRecipes, ...publishedFrenchRecipes, ...publishedItalianRecipes, ...publishedSpanishRecipes, ...publishedBritishRecipes, ...publishedGermanRecipes, ...publishedGreekRecipes, ...publishedAmericanRecipes, ...publishedMexicanRecipes, ...publishedBrazilianRecipes, ...publishedCanadianRecipes, ...publishedMiddleEasternRecipes, ...publishedMediterraneanRecipes, ...publishedAfricanRecipes, ...publishedOtherWorldRecipes];
refineFiftyFirstMethods(recipes);
refineFiftySecondMethods(recipes);
refineFiftyThirdMethods(recipes);
refineFiftyFourthMethods(recipes);
refineFiftyFifthMethods(recipes);
refineFiftySixthMethods(recipes);
refineFiftySeventhMethods(recipes);
refineFiftyEighthMethods(recipes);
export const allRecipeDrafts = [...chineseRecipeDrafts, ...japaneseRecipeDrafts, ...koreanRecipeDrafts, ...thaiRecipeDrafts, ...taiwaneseRecipeDrafts, ...indianRecipeDrafts, ...vietnameseRecipeDrafts, ...frenchRecipeDrafts, ...italianRecipeDrafts, ...spanishRecipeDrafts, ...britishRecipeDrafts, ...germanRecipeDrafts, ...greekRecipeDrafts, ...americanRecipeDrafts, ...mexicanRecipeDrafts, ...brazilianRecipeDrafts, ...canadianRecipeDrafts, ...middleEasternRecipeDrafts, ...mediterraneanRecipeDrafts, ...africanRecipeDrafts, ...otherWorldRecipeDrafts];
