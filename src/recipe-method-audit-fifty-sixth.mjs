const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, item: { ...row.item } })),
    instructions: recipe.instructions.map((entry) => ({
      ...entry,
      title: { ...entry.title },
      body: { ...entry.body }
    })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function ingredient(recipe, startsWith, localized) {
  const row = recipe.ingredients.find((entry) => entry.item.en.startsWith(startsWith));
  if (!row) throw new Error(`${recipe.id}: missing ingredient beginning with ${startsWith}`);
  row.item = localized;
}

function setMethod(recipe, entries) {
  const imageScenes = recipe.instructions.map((entry) => entry.imageScene);
  recipe.instructions = entries.map(([title, body], index) => ({
    title,
    body,
    ...(imageScenes[index] ? { imageScene: imageScenes[index] } : {})
  }));
}

function addOfficial(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${title}`, url });
  }
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";

function reviseSundubu(recipe) {
  recipe.cookMinutes = 27;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  ingredient(recipe, "Korean soup soy sauce", ml(
    "Korean soup soy sauce; add gradually, up to 10 ml",
    "韓式湯醬油；分次加入，最多 10 毫升",
    "韓国の薄口しょうゆ（味を見ながら最大10mlまで加える）",
    "국간장, 맛을 보며 최대 10ml까지 나누어 넣기",
    "ซีอิ๊วเกาหลีสำหรับซุป ค่อย ๆ เติมได้ไม่เกิน 10 มล."
  ));
  recipe.storage = ml(
    "Cool in shallow containers and refrigerate within 2 hours at or below 4°C (40°F). Use within 3–4 days. Reheat only the portion you need, stirring until the centre reaches 74°C (165°F).",
    "分裝入淺容器，並在 2 小時內冷藏於 4°C（40°F）以下。3–4 天內食用。只取需要的份量，邊攪拌邊復熱至中心達 74°C（165°F）。",
    "浅い容器に小分けし、2時間以内に4°C（40°F）以下で冷蔵します。3〜4日以内に食べます。必要な分だけ取り分け、混ぜながら中心が74°C（165°F）に達するまで再加熱します。",
    "얕은 용기에 나누어 담고 2시간 이내에 4°C (40°F) 이하로 냉장합니다. 3–4일 안에 먹습니다. 필요한 양만 덜어 저으면서 중심이 74°C (165°F)에 도달하도록 재가열합니다.",
    "แบ่งใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่อุณหภูมิไม่เกิน 4°C (40°F) กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะกิน คนให้ทั่วจนตรงกลางถึง 74°C (165°F)"
  );

  setMethod(recipe, [
    [
      ml("Bloom the chile in sesame oil", "以芝麻油煸香辣椒粉", "ごま油で粉唐辛子の香りを出す", "참기름에 고춧가루 향을 낸다", "เจียวพริกป่นให้หอมในน้ำมันงา"),
      ml(
        "Put all 15 ml sesame oil and 20 g gochugaru in a cold 1.5 L pot. Set over medium-low heat and stir for 60–90 seconds, until the oil turns brick red and smells fragrant. Do not let the flakes blacken; this time is a flavor guide.",
        "將全部 15 毫升芝麻油與 20 公克韓式辣椒粉放入 1.5 公升冷鍋。以中小火加熱並攪拌 60–90 秒，至油色轉磚紅、聞到香氣即可。辣椒粉不可炒黑；時間是風味估值。",
        "冷たい1.5L鍋にごま油15mlすべてと粉唐辛子20gを入れます。中弱火にかけ、油が赤レンガ色になり香りが立つまで60〜90秒混ぜます。唐辛子を焦がさないようにします。時間は風味の目安です。",
        "차가운 1.5L 냄비에 참기름 15ml와 고춧가루 20g 전량을 넣습니다. 중약불에서 60–90초 저어 기름이 벽돌빛이 되고 향이 나면 멈춥니다. 고춧가루를 검게 태우지 않습니다. 시간은 풍미 기준입니다.",
        "ใส่น้ำมันงา 15 มล.ทั้งหมดกับพริกป่นเกาหลี 20 กรัมลงในหม้อเย็น 1.5 ลิตร ตั้งไฟกลางอ่อนและคน 60–90 วินาทีจนเป็นสีแดงอิฐและหอม อย่าให้พริกไหม้ดำ เวลานี้เป็นเกณฑ์ด้านกลิ่นรส"
      )
    ],
    [
      ml("Cook the ground pork to its own endpoint", "絞肉依絞肉熟度煮透", "豚ひき肉はひき肉の基準まで加熱する", "돼지고기 다짐육을 해당 안전 기준까지 익힌다", "ปรุงหมูบดตามเกณฑ์ของเนื้อบด"),
      ml(
        "Add all 150 g ground pork and break it into clumps no larger than 1 cm. Cook over medium heat for about 4–5 minutes, turning the pieces, until no pink remains. Check the centre of the largest clump with a clean thermometer: ground pork must reach 71°C (160°F). The time and colour are cues, not the safety check; continue in 1-minute increments if needed.",
        "加入全部 150 公克豬絞肉，撥成不超過 1 公分的小塊。中火煮約 4–5 分鐘並翻動，至看不見粉紅色。用乾淨溫度計測最大肉塊中心：豬絞肉須達 71°C（160°F）。時間與顏色只是線索，不是安全檢查；未達時每次續煮 1 分鐘再測。",
        "豚ひき肉150gすべてを加え、1cm以下の塊にほぐします。中火で約4〜5分、返しながらピンク色がなくなるまで炒めます。清潔な温度計で最大の塊の中心を測り、豚ひき肉は71°C（160°F）に達させます。時間や色だけで安全とは判断せず、未達なら1分ずつ追加します。",
        "다진 돼지고기 150g 전량을 넣고 1cm 이하 덩어리로 풉니다. 중불에서 약 4–5분 뒤집어 가며 분홍색이 남지 않게 익힙니다. 깨끗한 온도계로 가장 큰 덩어리 중심을 재어 다진 돼지고기를 71°C (160°F)까지 익힙니다. 시간과 색만으로 안전을 판단하지 말고, 미달이면 1분씩 더 익혀 다시 잽니다.",
        "ใส่หมูบด 150 กรัมทั้งหมด แบ่งเป็นก้อนขนาดไม่เกิน 1 ซม. ผัดไฟกลางประมาณ 4–5 นาที พลิกจนไม่เห็นสีชมพู ใช้เทอร์โมมิเตอร์สะอาดวัดกลางก้อนใหญ่ที่สุด หมูบดต้องถึง 71°C (160°F) เวลาและสีเป็นเพียงตัวช่วย ไม่ใช่การยืนยันความปลอดภัย หากยังต่ำให้ปรุงต่อครั้งละ 1 นาทีแล้ววัดซ้ำ"
      )
    ],
    [
      ml("Soften the kimchi and garlic", "炒軟泡菜與蒜", "キムチとにんにくを炒める", "김치와 마늘을 볶아 부드럽게 한다", "ผัดกิมจิกับกระเทียมให้นุ่ม"),
      ml(
        "Add all 150 g chopped kimchi and 12 g minced garlic. Stir-fry for about 3 minutes, scraping the pot, until the cabbage softens and the red oil coats it evenly.",
        "加入全部 150 公克切好的泡菜與 12 公克蒜末，翻炒約 3 分鐘並刮拌鍋底，至菜梗稍軟、紅油均勻裹住泡菜。",
        "刻んだキムチ150gすべてと、みじん切りにんにく12gを加えます。鍋底をこそげながら約3分炒め、白菜が柔らかくなり赤い油が均一に絡むまで炒めます。",
        "썬 김치 150g 전량과 다진 마늘 12g을 넣습니다. 냄비 바닥을 긁어 가며 약 3분 볶아 배추가 부드러워지고 붉은 기름이 고르게 묻게 합니다.",
        "ใส่กิมจิหั่น 150 กรัมทั้งหมดกับกระเทียมสับ 12 กรัม ผัดประมาณ 3 นาที ขูดก้นหม้อจนผักนุ่มและน้ำมันสีแดงเคลือบทั่ว"
      )
    ],
    [
      ml("Build and simmer the broth", "加入高湯並燉煮", "だしを加えて煮る", "육수를 넣고 끓인다", "เติมน้ำซุปแล้วเคี่ยว"),
      ml(
        "Pour in all 500 ml anchovy-kelp stock and 60 ml kimchi brine. Bring to a full boil, then lower to a steady gentle simmer for 6 minutes so the pork juices and broth combine. This simmer time is for the soup's flavor, not a replacement for the ground-pork thermometer check.",
        "倒入全部 500 毫升鯷魚昆布高湯與 60 毫升泡菜汁，煮至沸騰後轉穩定小滾 6 分鐘，讓肉汁與湯頭融合。這是風味燉煮時間，不能取代絞肉溫度檢查。",
        "いりこ昆布だし500mlすべてとキムチの汁60mlを注ぎます。しっかり沸騰させたら静かな煮立ちに下げ、肉汁とだしがなじむまで6分煮ます。この時間は味をまとめるためのもので、ひき肉の温度確認の代わりにはなりません。",
        "멸치다시마육수 500ml 전량과 김칫국물 60ml를 붓습니다. 끓어오르면 잔잔하게 낮춰 6분 끓여 고기 육즙과 국물이 어우러지게 합니다. 이 시간은 국물 맛을 위한 것이며 다짐육 온도 확인을 대신하지 않습니다.",
        "เทน้ำซุปแอนโชวีคอมบุ 500 มล.ทั้งหมดกับน้ำกิมจิ 60 มล. ต้มให้เดือดแล้วลดเป็นเดือดอ่อน 6 นาทีให้รสเนื้อกับน้ำซุปเข้ากัน เวลานี้เป็นการปรุงรส ไม่ใช้แทนการวัดอุณหภูมิหมูบด"
      )
    ],
    [
      ml("Add the tofu and enoki", "加入嫩豆腐與金針菇", "豆腐とえのきを加える", "순두부와 팽이버섯을 넣는다", "ใส่เต้าหู้อ่อนและเห็ดเข็มทอง"),
      ml(
        "Open both 350 g tofu tubes over the pot and slide in large spoonfuls, keeping the soft curds about 5 cm wide. Add all 120 g separated enoki between the tofu. Simmer gently for 5 minutes without stirring through the curds; spoon broth over them instead so they stay intact.",
        "在鍋上方打開兩條各 350 公克的豆腐管，用大湯匙將豆腐滑入鍋中，保留約 5 公分的大塊。把全部 120 公克撥散的金針菇放在豆腐間，小火煮 5 分鐘，不要在豆腐塊間攪拌，改以湯匙舀湯淋上。",
        "豆腐の袋2本（各350g）を鍋の上で開き、大きめの塊を滑らせるように入れます。ほぐしたえのき120gすべてを豆腐の間に加えます。豆腐を崩さないよう混ぜずに弱く5分煮て、上から汁をかけます。",
        "두부 350g 튜브 두 개를 냄비 위에서 열고 5cm 정도의 큰 덩어리로 넣습니다. 풀어 둔 팽이버섯 120g 전량을 두부 사이에 넣습니다. 두부를 휘젓지 말고 약하게 5분 끓이며 국물을 위에 끼얹어 모양을 유지합니다.",
        "เปิดเต้าหู้หลอด 350 กรัมทั้งสองหลอดเหนือหม้อ แล้วใส่เป็นก้อนใหญ่ราว 5 ซม. เติมเห็ดเข็มทองที่แยกไว้ 120 กรัมทั้งหมดระหว่างก้อนเต้าหู้ เคี่ยวเบา ๆ 5 นาทีโดยไม่คนผ่านก้อน ใช้ช้อนราดน้ำซุปแทนเพื่อให้ก้อนอยู่ทรง"
      )
    ],
    [
      ml("Season gradually", "分次調味", "少しずつ味を調える", "간을 조금씩 맞춘다", "ปรุงรสทีละน้อย"),
      ml(
        "Taste the broth, then add the Korean soup soy sauce gradually, using up to the listed 10 ml. Simmer for 1 minute so the seasoning disperses. Kimchi brine varies in saltiness, so add only what the broth needs.",
        "先試湯，再分次加入韓式湯醬油，最多用完配方所列 10 毫升。續煮 1 分鐘讓味道融合。泡菜汁鹹度不一，按湯頭需要添加即可。",
        "汁を味見してから、韓国の薄口しょうゆを少しずつ加えます。分量の最大10mlまで使い、味をなじませるため1分煮ます。キムチの汁は塩分が商品で異なるので、必要な分だけ加えます。",
        "국물을 맛본 뒤 국간장을 조금씩 넣습니다. 표시된 10ml까지 사용하고 간이 퍼지도록 1분 끓입니다. 김칫국물 염도는 제품마다 다르니 필요한 만큼만 넣습니다.",
        "ชิมน้ำซุปก่อน แล้วค่อย ๆ เติมซีอิ๊วเกาหลีสำหรับซุปได้ถึง 10 มล.ตามที่ระบุ เคี่ยวอีก 1 นาทีให้รสกระจาย น้ำกิมจิแต่ละชนิดเค็มไม่เท่ากัน จึงเติมเท่าที่จำเป็น"
      )
    ],
    [
      ml("Set the eggs safely", "安全地煮熟雞蛋", "卵を安全に加熱する", "달걀을 안전하게 익힌다", "ทำไข่ให้สุกอย่างปลอดภัย"),
      ml(
        "Make two wells between the tofu and crack in the 2 pasteurized eggs. Cover and gently simmer for about 3 minutes, until the whites are opaque and the yolks are warm with the soft set you prefer. That time is a texture guide and is intended for pasteurized eggs. If using ordinary unpasteurized shell eggs, cook until both whites and yolks are firm; do not serve them runny.",
        "在豆腐間挖兩個小洞，打入 2 顆巴氏殺菌蛋。蓋鍋小火煮約 3 分鐘，至蛋白不透明、蛋黃溫熱並達喜歡的柔嫩度。這是口感估時，且僅適用巴氏殺菌蛋。若改用一般未殺菌帶殼蛋，須煮到蛋白與蛋黃都凝固，不可流心供食。",
        "豆腐の間に2か所くぼみを作り、低温殺菌済み卵2個を割り入れます。蓋をして約3分静かに煮ます。白身が不透明になり、黄身が温まり好みの柔らかさになればよいでしょう。この時間は食感の目安で、低温殺菌卵を使う場合です。通常の未殺菌殻付き卵を使う場合は、白身と黄身がともに固まるまで加熱し、半熟で出さないでください。",
        "두부 사이에 두 곳을 만들고 살균란 2개를 깨 넣습니다. 덮고 약 3분 잔잔하게 끓여 흰자가 불투명해지고 노른자가 따뜻하게 원하는 정도로 부드러워지게 합니다. 이 시간은 식감 기준이며 살균란에 적용됩니다. 일반 비살균 껍질 달걀을 쓰면 흰자와 노른자가 모두 단단히 익을 때까지 조리하고 반숙으로 내지 않습니다.",
        "ทำหลุมสองจุดระหว่างเต้าหู้แล้วตอกไข่พาสเจอไรซ์ 2 ฟอง ปิดฝาเคี่ยวเบา ๆ ประมาณ 3 นาทีจนไข่ขาวทึบและไข่แดงอุ่นนุ่มตามชอบ เวลานี้เป็นเกณฑ์ด้านเนื้อสัมผัสสำหรับไข่พาสเจอไรซ์ หากใช้ไข่เปลือกธรรมดาที่ไม่พาสเจอไรซ์ ต้องปรุงจนทั้งไข่ขาวและไข่แดงแข็งตัว ไม่เสิร์ฟแบบไข่แดงไหล"
      )
    ],
    [
      ml("Finish with scallions and divide", "加入青蔥後分碗", "青ねぎを加えて盛り分ける", "대파를 넣고 나누어 담는다", "ใส่ต้นหอมแล้วแบ่งเสิร์ฟ"),
      ml(
        "Scatter all 30 g sliced scallions over the stew and turn off the heat. Rest covered for 2 minutes, then divide between two hot bowls, giving each bowl one egg and half of the tofu and mushrooms. Serve immediately.",
        "將全部 30 公克青蔥片撒在鍋中後關火，蓋鍋靜置 2 分鐘。分入兩個熱碗，每碗一顆蛋以及一半豆腐與菇類，立即上桌。",
        "青ねぎ30gすべてを散らして火を止め、蓋をして2分休ませます。温めた器2つに分け、各器に卵1個と豆腐、きのこを半量ずつ盛り、すぐに供します。",
        "썬 대파 30g 전량을 뿌리고 불을 끕니다. 덮어 2분 둔 뒤 따뜻한 그릇 두 개에 나누어 담아 각 그릇에 달걀 하나와 두부·버섯 절반씩 담아 바로 냅니다.",
        "โรยต้นหอมหั่น 30 กรัมทั้งหมดแล้วปิดไฟ พักปิดฝา 2 นาที แบ่งใส่ชามอุ่นสองใบ ให้แต่ละชามมีไข่หนึ่งฟองและเต้าหู้กับเห็ดครึ่งหนึ่ง เสิร์ฟทันที"
      )
    ]
  ]);
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (ground pork and leftovers)", temperatures);
  addOfficial(recipe, "FDA: What You Need to Know About Egg Safety", eggSafety);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (chilling and handling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (soups and stews)", storage);
}

function reviseComTam(recipe) {
  recipe.prepMinutes = 200;
  recipe.cookMinutes = 45;
  recipe.totalMinutes = 245;
  recipe.storage = ml(
    "Refrigerate pork and rice separately in shallow containers at or below 4°C (40°F). Cool rice quickly, ideally within 1 hour; use it within 24 hours and reheat it only once until steaming hot throughout. Cooked pork keeps 3–4 days; reheat it to 74°C (165°F). Keep the vegetables and dipping sauce chilled separately. For best texture, assemble just before serving.",
    "豬排與米飯分開放入淺容器，冷藏於 4°C（40°F）以下。米飯應盡快降溫，最好 1 小時內冷藏；24 小時內食用，且只復熱一次至全份冒熱氣。熟豬排可冷藏 3–4 天，復熱至 74°C（165°F）。蔬菜與沾醬另行冷藏。為保持最佳口感，請上桌前再組裝。",
    "豚肉とご飯は別々の浅い容器に入れ、4°C（40°F）以下で冷蔵します。ご飯はできるだけ早く、理想的には1時間以内に冷やして冷蔵し、24時間以内に食べ、再加熱は一度だけ、全体が湯気の立つ状態にします。加熱済みの豚肉は3〜4日保存でき、再加熱時は74°C（165°F）にします。野菜とたれは別に冷蔵し、食感を保つには食べる直前に盛り付けます。",
    "돼지고기와 밥을 얕은 용기에 따로 담아 4°C (40°F) 이하로 냉장합니다. 밥은 빠르게 식혀 이상적으로 1시간 안에 냉장하고 24시간 안에 먹으며, 재가열은 한 번만 하고 전체가 김이 날 때까지 가열합니다. 조리한 돼지고기는 3–4일 보관할 수 있고 다시 데울 때 74°C (165°F)에 도달시킵니다. 채소와 소스는 따로 냉장하고 최상의 식감을 위해 먹기 직전에 담습니다.",
    "แช่หมูกับข้าวแยกกันในภาชนะตื้นที่อุณหภูมิไม่เกิน 4°C (40°F) ทำให้ข้าวเย็นเร็วและแช่เย็นภายใน 1 ชั่วโมงถ้าเป็นไปได้ กินภายใน 24 ชั่วโมงและอุ่นซ้ำได้ครั้งเดียวจนร้อนมีไอทั่ว หมูสุกเก็บได้ 3–4 วันและอุ่นซ้ำให้ถึง 74°C (165°F) แช่ผักกับน้ำจิ้มแยกกัน เพื่อคงเนื้อสัมผัสให้จัดจานก่อนเสิร์ฟ"
  );

  setMethod(recipe, [
    [
      ml("Marinate the pork under refrigeration", "冷藏醃製豬排", "豚肉を冷蔵して漬ける", "돼지고기를 냉장해 재운다", "หมักหมูในตู้เย็น"),
      ml(
        "Notch the fat edge of each of the four 1–1.5 cm chops three times without cutting into the meat. Mix 50 g minced tender lemongrass, 30 g shallot, 12 g of the garlic, 30 ml of the fish sauce, all 20 ml soy sauce, 30 g of the sugar, 2 g pepper, and 25 ml of the oil. Coat the 800 g chops, cover, and marinate in the refrigerator at or below 4°C (40°F) for 3 hours. The 200-minute prep field includes this chill plus about 20 minutes of active preparation; never marinate pork on the counter.",
        "四片厚 1–1.5 公分豬排的脂肪邊各剪三刀，不切到肉。混合 50 公克香茅嫩芯末、30 公克紅蔥頭、12 公克蒜、30 毫升魚露、全部 20 毫升醬油、30 公克糖、2 公克胡椒與 25 毫升油。將 800 公克豬排裹上醃料，覆蓋後在 4°C（40°F）以下冷藏醃 3 小時。備料欄 200 分鐘包含這段冷藏時間與約 20 分鐘實際備料；不可在室溫醃豬肉。",
        "厚さ1〜1.5cmの豚肉4枚の脂身に、肉まで切らないよう3か所切り込みを入れます。レモングラスの柔らかい芯50g、エシャロット30g、にんにく12g、魚醤30ml、しょうゆ20mlすべて、砂糖30g、こしょう2g、油25mlを混ぜます。豚肉800gに絡めて覆い、4°C（40°F）以下の冷蔵庫で3時間漬けます。準備欄の200分にはこの冷蔵時間と約20分の作業時間を含みます。室温で漬けないでください。",
        "두께 1–1.5cm 돼지고기 네 장의 지방 가장자리에 살을 자르지 않도록 세 군데 칼집을 냅니다. 다진 연한 레몬그라스 50g, 샬롯 30g, 마늘 12g, 피시소스 30ml, 간장 20ml 전량, 설탕 30g, 후추 2g, 기름 25ml를 섞습니다. 돼지고기 800g에 바르고 덮어 4°C (40°F) 이하 냉장고에서 3시간 재웁니다. 준비 시간 200분에는 이 냉장 시간과 약 20분의 실제 손질 시간이 포함됩니다. 실온에서 재우지 않습니다.",
        "บั้งขอบมันของพอร์กชอป 4 ชิ้น หนา 1–1.5 ซม. ชิ้นละสามรอยโดยไม่บาดเนื้อ ผสมแกนตะไคร้อ่อนสับ 50 กรัม หอมแดง 30 กรัม กระเทียม 12 กรัม น้ำปลา 30 มล. ซีอิ๊ว 20 มล.ทั้งหมด น้ำตาล 30 กรัม พริกไทย 2 กรัม และน้ำมัน 25 มล. คลุกกับหมู 800 กรัม ปิดฝาและหมักในตู้เย็นไม่เกิน 4°C (40°F) เป็นเวลา 3 ชั่วโมง เวลาเตรียม 200 นาทีรวมเวลาหมักเย็นกับงานเตรียมจริงราว 20 นาที ห้ามหมักหมูบนเคาน์เตอร์"
      )
    ],
    [
      ml("Cook the broken rice", "煮碎米飯", "砕きジャスミン米を炊く", "깨진 쌀을 밥 짓는다", "หุงข้าวหอมมะลิหัก"),
      ml(
        "Rinse 300 g broken jasmine rice gently three times and drain. Put it in a lidded saucepan with 400 ml of the measured water; reserve the other 120 ml for the dipping sauce. Bring to a boil, cover, and cook on the lowest heat for 15 minutes. Turn off the heat and leave covered for 10 minutes, then fluff. These are cooking estimates; the grains should be tender with no hard centre.",
        "將 300 公克碎茉莉香米輕柔洗三次並瀝乾，放入有蓋鍋中，加入量好的 400 毫升水；另 120 毫升留給沾醬。煮沸後加蓋，以最小火煮 15 分鐘，關火再加蓋燜 10 分鐘後翻鬆。這些是烹煮估時；米粒應熟軟，中心不可硬。",
        "砕いたジャスミン米300gをやさしく3回洗って水を切ります。蓋付き鍋に入れ、計量した水のうち400mlを加え、残り120mlはたれ用に取っておきます。沸騰したら蓋をし、最弱火で15分炊きます。火を止めて蓋をしたまま10分蒸らしてからほぐします。時間は目安で、芯がなく柔らかく炊けていることを確認します。",
        "깨진 재스민쌀 300g을 부드럽게 세 번 씻어 물기를 뺍니다. 뚜껑 있는 냄비에 넣고 계량한 물 중 400ml를 붓고 나머지 120ml는 소스용으로 남깁니다. 끓으면 덮고 가장 약한 불에서 15분 짓습니다. 불을 끄고 덮은 채 10분 뜸을 들인 뒤 밥을 풉니다. 시간은 추정치이며 쌀알에 딱딱한 심 없이 익어야 합니다.",
        "ล้างข้าวหอมมะลิหัก 300 กรัมเบา ๆ สามครั้งแล้วสะเด็ดน้ำ ใส่หม้อมีฝาพร้อมน้ำที่ตวงไว้ 400 มล. เก็บอีก 120 มล.ไว้ทำน้ำจิ้ม เมื่อน้ำเดือดปิดฝาและหุงไฟอ่อนที่สุด 15 นาที ปิดไฟพักปิดฝาอีก 10 นาทีแล้วซุย เวลาเป็นค่าประมาณ ข้าวควรนุ่มและไม่มีไตแข็ง"
      )
    ],
    [
      ml("Mix four bowls of lime fish sauce", "調好四碗萊姆魚露沾醬", "ライム魚醤だれを4人分作る", "라임 피시소스 4인분을 만든다", "ทำน้ำปลามะนาวสี่ถ้วย"),
      ml(
        "Dissolve the remaining 25 g sugar in the reserved 120 ml warm water. Stir in the remaining 40 ml fish sauce, all 40 ml lime juice, the remaining 8 g garlic, and 5 g minced chile. Divide the sauce equally among four small bowls; each gets about 50 ml. Cool and refrigerate if it will not be served promptly.",
        "將剩餘 25 公克糖溶於預留的 120 毫升溫水，拌入剩餘 40 毫升魚露、全部 40 毫升萊姆汁、剩下 8 公克蒜末與 5 公克辣椒末。平均分入四個小碗，每碗約 50 毫升。若不立即供應，放涼後冷藏。",
        "残りの砂糖25gを、取っておいた温水120mlに溶かします。残りの魚醤40ml、ライム汁40mlすべて、残りのにんにく8g、刻んだ唐辛子5gを混ぜます。小さな器4つに等分し、各約50mlにします。すぐに出さない場合は冷まして冷蔵します。",
        "남은 설탕 25g을 남겨 둔 따뜻한 물 120ml에 녹입니다. 남은 피시소스 40ml, 라임즙 40ml 전량, 남은 마늘 8g, 다진 고추 5g을 섞습니다. 작은 그릇 네 개에 똑같이 나누면 한 그릇당 약 50ml입니다. 바로 내지 않을 경우 식혀 냉장합니다.",
        "ละลายน้ำตาลที่เหลือ 25 กรัมในน้ำอุ่น 120 มล.ที่เก็บไว้ ใส่น้ำปลาที่เหลือ 40 มล. น้ำมะนาว 40 มล.ทั้งหมด กระเทียมที่เหลือ 8 กรัม และพริกสับ 5 กรัม แบ่งเท่ากันในถ้วยเล็ก 4 ใบ ใบละประมาณ 50 มล. หากยังไม่เสิร์ฟให้พักจนเย็นแล้วแช่เย็น"
      )
    ],
    [
      ml("Wilt the scallions in oil", "以油略炒青蔥", "ねぎを油でさっとしんなりさせる", "파를 기름에 살짝 익힌다", "ทำต้นหอมให้นุ่มในน้ำมัน"),
      ml(
        "Heat all 30 ml scallion oil in a small pan over medium heat for 1 minute. Add all 40 g scallions and 1 g salt; stir for 20–30 seconds until bright green and just wilted. Remove to a heatproof bowl before the greens brown. The 30 ml portion is for scallions; 25 ml went into the pork marinade and 5 ml is for the grill.",
        "小鍋以中火加熱全部 30 毫升蔥油 1 分鐘，加入全部 40 公克青蔥與 1 公克鹽，翻炒 20–30 秒至鮮綠略軟即移入耐熱碗，避免炒褐。60 毫升總油量中，30 毫升用於蔥油、25 毫升已入醃料、5 毫升用於烤架。",
        "小鍋でねぎ用の油30mlすべてを中火で1分温めます。青ねぎ40gすべてと塩1gを加え、鮮やかな緑色で軽くしんなりするまで20〜30秒混ぜ、茶色くなる前に耐熱ボウルへ移します。油60mlのうち30mlはねぎ、25mlは漬けだれ、5mlは網用です。",
        "작은 팬에서 파기름 30ml 전량을 중불로 1분 데웁니다. 쪽파 40g 전량과 소금 1g을 넣어 선명한 초록색으로 살짝 숨이 죽을 때까지 20–30초 볶고 갈색이 되기 전에 내열 그릇에 옮깁니다. 기름 60ml 중 30ml는 파, 25ml는 양념, 5ml는 석쇠용입니다.",
        "อุ่นน้ำมันส่วนต้นหอม 30 มล.ทั้งหมดในกระทะเล็กไฟกลาง 1 นาที ใส่ต้นหอม 40 กรัมทั้งหมดกับเกลือ 1 กรัม ผัด 20–30 วินาทีจนเขียวสดและเพิ่งนุ่ม ย้ายใส่ชามทนความร้อนก่อนเป็นสีน้ำตาล น้ำมัน 60 มล.แบ่งเป็นส่วนต้นหอม 30 หมักหมู 25 และทาตะแกรง 5 มล."
      )
    ],
    [
      ml("Prepare a clean two-zone grill", "準備乾淨的雙區烤架", "清潔し、火力を二段階に分けて網を準備する", "깨끗한 2구역 그릴을 준비한다", "เตรียมเตาย่างสะอาดสองโซน"),
      ml(
        "Heat a clean grill to medium-high, about 220°C, with a cooler zone for moving chops away from flare-ups. Brush the grate with the reserved 5 ml oil. Lift the pork from its marinade and discard the raw marinade; do not brush it onto cooked food. Keep the cucumber, tomato, and drained 160 g pickles on a separate clean plate. Slice the 200 g cucumber and 200 g tomato.",
        "將乾淨烤架加熱至中大火、約 220°C，並保留較冷區，方便避開火焰。用預留 5 毫升油刷烤網。豬排自醃料取出後丟棄生醃料，不可刷回熟食。小黃瓜、番茄及瀝乾的 160 公克醃菜放在另一個乾淨盤；切片 200 公克小黃瓜與 200 公克番茄。",
        "清潔したグリルを中強火、約220°Cに熱し、炎が上がったときに肉を移せる弱火側も作ります。取っておいた油5mlを網に塗ります。豚肉を漬けだれから取り出し、生の漬けだれは捨て、加熱後の食品には塗りません。きゅうり200gとトマト200gを切り、水を切った漬物160gと別の清潔な皿に置きます。",
        "깨끗한 그릴을 중강불 약 220°C로 예열하고 불꽃을 피해 고기를 옮길 수 있는 약한 구역도 둡니다. 남겨 둔 기름 5ml를 석쇠에 바릅니다. 돼지고기를 양념에서 꺼내고 생양념은 버립니다. 익힌 음식에 바르지 않습니다. 오이 200g과 토마토 200g을 썰고 물기를 뺀 절임무 160g과 별도의 깨끗한 접시에 둡니다.",
        "อุ่นเตาย่างสะอาดไฟกลางค่อนแรงประมาณ 220°C และเตรียมโซนไฟอ่อนสำหรับย้ายหมูหนีเปลวไฟ ทาน้ำมัน 5 มล.ที่เก็บไว้บนตะแกรง ยกหมูออกจากน้ำหมักและทิ้งน้ำหมักดิบ ห้ามทาบนอาหารสุก หั่นแตงกวา 200 กรัมกับมะเขือเทศ 200 กรัม วางแยกบนจานสะอาดจากผักดอง 160 กรัมที่สะเด็ดน้ำแล้ว"
      )
    ],
    [
      ml("Grill to the whole-cut pork endpoint", "烤整塊豬排至熟度標準", "塊肉の豚肉を基準温度まで焼く", "통돼지고기 기준으로 굽는다", "ย่างหมูชิ้นเต็มตามเกณฑ์ความสุก"),
      ml(
        "Grill the 1–1.5 cm chops for an estimated 3–4 minutes per side, turning once, until browned. Because these are intact pork chops rather than ground pork, insert a clean thermometer from the side into the thickest centre without touching bone: reach 63°C (145°F), then rest for 3 minutes in the next step. The grill time is only an estimate. If any chop is below 63°C, keep cooking and recheck before resting; move it to the cooler zone if the sugar-darkened edges char.",
        "豬排每面估烤 3–4 分鐘並翻一次，至表面上色。這是完整豬排而非絞肉，用乾淨溫度計從側面插入最厚中心且避開骨頭，達 63°C（145°F）後於下一步靜置 3 分鐘。烤製時間只是估值。若有豬排未達 63°C，續烤並在靜置前重新測量；糖色邊緣太快焦黑時移至較冷區。",
        "豚肉を片面あたり目安3〜4分、一度返して焼き色を付けます。これは挽き肉ではなく塊の豚肉チョップなので、清潔な温度計を横から最も厚い中心に差し、骨に触れず63°C（145°F）に達したら次の手順で3分休ませます。焼き時間は目安です。63°C未満なら焼き続けてから測り直し、砂糖の縁が焦げそうなら弱火側へ移します。",
        "돼지갈비를 한 면당 약 3–4분씩 한 번 뒤집어 갈색이 나도록 굽습니다. 이 고기는 다짐육이 아니라 통돼지고기 찹이므로 깨끗한 온도계를 옆에서 가장 두꺼운 중심에 넣고 뼈를 피해서 63°C (145°F)에 도달시킨 뒤 다음 단계에서 3분 둡니다. 굽는 시간은 추정치입니다. 63°C 미만이면 더 굽고 쉬기 전에 다시 잽니다. 설탕 묻은 가장자리가 타면 약한 구역으로 옮깁니다.",
        "ย่างพอร์กชอปด้านละประมาณ 3–4 นาที พลิกหนึ่งครั้งจนมีสีน้ำตาล เนื้อชิ้นนี้เป็นพอร์กชอปไม่บด ให้ใช้เทอร์โมมิเตอร์สะอาดสอดจากด้านข้างเข้ากลางส่วนที่หนาที่สุดโดยไม่แตะกระดูก ให้ถึง 63°C (145°F) แล้วพัก 3 นาทีในขั้นต่อไป เวลาเป็นค่าประมาณ หากชิ้นใดยังต่ำกว่า 63°C ให้ย่างต่อและวัดซ้ำก่อนพัก ย้ายไปโซนไฟอ่อนถ้าขอบน้ำตาลไหม้เร็ว"
      )
    ],
    [
      ml("Rest the chops and brush with scallion oil", "靜置豬排並刷上蔥油", "豚肉を休ませ、ねぎ油をかける", "돼지고기를 쉬게 하고 파기름을 바른다", "พักหมูและราดน้ำมันต้นหอม"),
      ml(
        "Move the cooked chops with clean tongs to a clean plate and rest for at least 3 minutes so the whole-cut pork endpoint is complete. Spoon half of the scallion oil over them. Keep the cooked rice covered and warm; keep raw-meat tools away from the plate and rice.",
        "用乾淨夾子將熟豬排移到乾淨盤上，靜置至少 3 分鐘，完成整塊豬肉的安全靜置時間。舀一半蔥油淋在豬排上。米飯加蓋保溫；生肉用具不可接觸熟肉盤或米飯。",
        "清潔なトングで焼けた豚肉を清潔な皿に移し、塊肉の安全な休ませ時間として少なくとも3分置きます。ねぎ油の半量をかけます。ご飯は蓋をして温かく保ち、生肉用の道具を皿やご飯に近づけません。",
        "깨끗한 집게로 익은 돼지고기를 깨끗한 접시에 옮겨 통돼지고기의 안전한 휴지 시간으로 최소 3분 둡니다. 파기름 절반을 끼얹습니다. 밥은 덮어 따뜻하게 두고 생고기 도구를 익은 고기 접시와 밥에 닿지 않게 합니다.",
        "ใช้คีมสะอาดย้ายหมูสุกลงจานสะอาด พักอย่างน้อย 3 นาทีเพื่อให้ครบเวลาพักตามเกณฑ์ของเนื้อชิ้น ราดน้ำมันต้นหอมครึ่งหนึ่ง ปิดฝาข้าวให้อุ่นและแยกอุปกรณ์ที่สัมผัสเนื้อดิบจากจานหมูกับข้าว"
      )
    ],
    [
      ml("Build four broken-rice plates", "組成四份碎米飯餐盤", "砕き米の皿を4人分盛る", "깨진 쌀밥 접시 네 개를 만든다", "จัดข้าวหอมมะลิหักสี่จาน"),
      ml(
        "Divide the rice among four plates and top with the remaining scallion oil. Add one chop, one quarter of the cucumber, tomato, and drained pickles to each. Serve with one bowl of lime fish sauce per person. The recipe yields four portions; add the sauce at the table to taste.",
        "將米飯分成四盤，淋上剩餘蔥油。每盤放一片豬排，以及四分之一的小黃瓜、番茄與瀝乾醃菜。每人配一碗萊姆魚露沾醬。此食譜為四人份，沾醬上桌後按口味添加。",
        "ご飯を4皿に分け、残りのねぎ油をかけます。各皿に豚肉1枚と、きゅうり、トマト、水を切った漬物をそれぞれ4分の1ずつ盛ります。ライム魚醤だれを1人1杯添えます。4人分です。たれは食卓で好みに合わせて加えます。",
        "밥을 네 접시에 나누고 남은 파기름을 올립니다. 각 접시에 돼지고기 한 장과 오이, 토마토, 물기를 뺀 절임무를 각각 4분의 1씩 담습니다. 라임 피시소스를 한 사람당 한 그릇씩 곁들입니다. 4인분이며 소스는 식탁에서 취향대로 더합니다.",
        "แบ่งข้าวใส่ 4 จาน ราดน้ำมันต้นหอมที่เหลือ ใส่หมูจานละ 1 ชิ้น พร้อมแตงกวา มะเขือเทศ และผักดองสะเด็ดน้ำอย่างละหนึ่งในสี่ เสิร์ฟน้ำปลามะนาวคนละถ้วย สูตรนี้ได้ 4 ที่ เติมน้ำจิ้มตามชอบที่โต๊ะ"
      )
    ]
  ]);
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (whole pork chops and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (raw meat handling and chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (cooked pork leftovers)", storage);
  addOfficial(recipe, "UK Food Standards Agency: Home Food Fact Checker (cooked rice)", riceSafety);
}

function reviseCanhChua(recipe) {
  recipe.storage = ml(
    "Refrigerate the soup in shallow containers within 2 hours at or below 4°C (40°F). Use within 3–4 days for safety; the fish has its best texture within 2 days, which is a quality preference rather than a safety cutoff. Reheat each portion to 74°C (165°F) throughout.",
    "將湯分裝於淺容器，並在 2 小時內冷藏於 4°C（40°F）以下。食安保存期限為 3–4 天；魚肉在 2 天內口感最佳，這是品質偏好而非安全期限。每次取用的份量都須復熱至整份達 74°C（165°F）。",
    "浅い容器に小分けして2時間以内に4°C（40°F）以下で冷蔵します。安全上は3〜4日以内に食べます。魚の食感は2日以内が最良ですが、これは品質上の好みで安全期限ではありません。食べる分は中心まで74°C（165°F）に再加熱します。",
    "얕은 용기에 나누어 담아 2시간 이내에 4°C (40°F) 이하로 냉장합니다. 안전을 위해 3–4일 안에 먹습니다. 생선 식감은 2일 안이 가장 좋지만 이는 품질 선호이며 안전 기한은 아닙니다. 먹을 양마다 전체가 74°C (165°F)에 도달하도록 재가열합니다.",
    "แบ่งซุปใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่อุณหภูมิไม่เกิน 4°C (40°F) เพื่อความปลอดภัยให้กินภายใน 3–4 วัน เนื้อปลามีสัมผัสดีที่สุดภายใน 2 วัน ซึ่งเป็นความชอบด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัย อุ่นแต่ละส่วนให้ทั่วถึง 74°C (165°F)"
  );

  setMethod(recipe, [
    [
      ml("Steep and strain the tamarind", "泡開並過濾羅望子", "タマリンドを戻して濾す", "타마린드를 불려 거른다", "แช่มะขามแล้วกรอง"),
      ml(
        "Soak all 40 g seedless tamarind pulp in 200 ml hot water for 10 minutes. Mash with a spoon, then strain into a bowl, pressing to extract the liquid. Discard the fibres and reserve all strained tamarind water for the broth. Ten minutes is a soaking estimate; soften the pulp enough to press easily.",
        "將全部 40 公克去籽羅望子果肉浸入 200 毫升熱水 10 分鐘，用湯匙壓碎後過濾入碗並壓出汁液。纖維丟棄，全部羅望子水留作湯底。10 分鐘是浸泡估時；果肉應軟到容易壓出汁。",
        "種なしタマリンド果肉40gすべてを熱湯200mlに10分浸します。スプーンでつぶし、ボウルに濾しながら押して汁を出します。繊維は捨て、濾したタマリンド液はすべてスープ用に取っておきます。10分は目安で、押し出せる柔らかさにします。",
        "씨 없는 타마린드 과육 40g 전량을 뜨거운 물 200ml에 10분 담급니다. 숟가락으로 으깨고 눌러 즙을 그릇에 거릅니다. 섬유질은 버리고 걸러진 타마린드 물은 모두 국물용으로 둡니다. 10분은 추정치이며 쉽게 눌릴 만큼 부드러워야 합니다.",
        "แช่เนื้อมะขามไร้เมล็ด 40 กรัมทั้งหมดในน้ำร้อน 200 มล. 10 นาที บี้ด้วยช้อนแล้วกรองลงชาม กดเอาน้ำออก ทิ้งเส้นใยและเก็บน้ำมะขามที่กรองได้ทั้งหมดไว้ทำซุป 10 นาทีเป็นค่าประมาณ เนื้อมะขามควรนิ่มพอให้กดง่าย"
      )
    ],
    [
      ml("Prepare the fish and vegetables", "備妥魚肉與蔬菜", "魚と野菜を準備する", "생선과 채소를 준비한다", "เตรียมปลาและผัก"),
      ml(
        "Pat the 600 g catfish or basa steaks dry; keep the 3 cm steaks chilled until the broth is ready. Prepare the 200 g pineapple, 250 g tomatoes, and 150 g okra as listed. Peel and cut the 100 g edible bạc hà stems into 3 cm pieces, then blanch them in the separate 1 L boiling water for 5 minutes and drain. Keep the 100 g rinsed sprouts and 15 g chopped herbs separate from the raw fish.",
        "將 600 公克鯰魚或巴沙魚段擦乾，3 公分厚魚段先冷藏至湯底備妥。按配料切好 200 公克鳳梨、250 公克番茄與 150 公克秋葵。100 公克食用 bạc hà 芋莖去皮切 3 公分，另用 1 公升沸水汆燙 5 分鐘並瀝乾。100 公克洗淨豆芽與 15 公克切碎香草分開放，勿與生魚接觸。",
        "ナマズまたはバサの切り身600gの水気を拭き、厚さ3cmの切り身はだしの準備ができるまで冷蔵します。パイナップル200g、トマト250g、オクラ150gを記載どおりに切ります。食用バクハーの茎100gは皮をむいて3cmに切り、別に沸かした水1Lで5分下ゆでして水を切ります。洗ったもやし100gと刻んだハーブ15gは生魚と分けておきます。",
        "메기 또는 바사 600g의 물기를 닦고 두께 3cm 생선 조각은 국물이 준비될 때까지 냉장합니다. 파인애플 200g, 토마토 250g, 오크라 150g을 표기대로 손질합니다. 식용 박하 줄기 100g은 껍질을 벗겨 3cm로 썬 뒤 별도 물 1L에 5분 데쳐 물기를 뺍니다. 씻은 숙주 100g과 다진 허브 15g은 생선과 분리해 둡니다.",
        "ซับปลาดุกหรือบาซา 600 กรัมให้แห้งและแช่ชิ้นหนา 3 ซม.ไว้จนกว่าน้ำซุปพร้อม เตรียมสับปะรด 200 กรัม มะเขือเทศ 250 กรัม และกระเจี๊ยบ 150 กรัมตามรายการ ปอกก้านบักห่ากินได้ 100 กรัม หั่น 3 ซม.แล้วลวกในน้ำเดือดแยก 1 ลิตร 5 นาที สะเด็ดน้ำ แยกถั่วงอกล้าง 100 กรัมและสมุนไพรสับ 15 กรัมจากปลาดิบ"
      )
    ],
    [
      ml("Make the golden garlic oil", "製作金黃蒜油", "にんにく油をきつね色にする", "마늘기름을 노릇하게 만든다", "ทำกระเทียมน้ำมันสีทอง"),
      ml(
        "Put all 20 ml neutral oil and 15 g minced garlic in a small pan over medium-low heat. Stir for an estimated 2–3 minutes until the garlic is pale gold, then immediately transfer both oil and garlic to a heatproof bowl so residual heat does not darken it. Do not let the garlic turn brown or bitter.",
        "小鍋以中小火加熱全部 20 毫升中性油與 15 公克蒜末，估煮 2–3 分鐘至淡金黃，立即連油帶蒜移入耐熱碗，避免餘溫繼續上色。不可炒成褐色或苦味。",
        "小鍋に植物油20mlすべてとみじん切りにんにく15gを入れ、中弱火にかけます。目安2〜3分、薄いきつね色になったらすぐに油ごと耐熱ボウルに移し、余熱で色が濃くならないようにします。茶色く焦がして苦くしないでください。",
        "작은 팬에 중성유 20ml 전량과 다진 마늘 15g을 넣고 중약불에서 약 2–3분 연한 금빛이 될 때까지 볶습니다. 잔열로 더 익지 않도록 기름과 마늘을 즉시 내열 그릇에 옮깁니다. 갈색이 되어 쓴맛이 나지 않게 합니다.",
        "ใส่น้ำมันรสกลาง 20 มล.ทั้งหมดกับกระเทียมสับ 15 กรัมลงกระทะเล็ก ใช้ไฟกลางอ่อนประมาณ 2–3 นาทีจนเหลืองอ่อน แล้วย้ายทั้งน้ำมันและกระเทียมใส่ชามทนความร้อนทันทีเพื่อไม่ให้สีเข้มต่อด้วยความร้อนค้าง อย่าให้เป็นสีน้ำตาลหรือขม"
      )
    ],
    [
      ml("Build the broth and cook the fish to its endpoint", "煮湯並將魚煮至適當熟度", "スープを作り、魚を基準まで加熱する", "국물을 만들고 생선을 안전 기준까지 익힌다", "เคี่ยวน้ำซุปและปรุงปลาให้ถึงเกณฑ์"),
      ml(
        "In a wide pot, combine the remaining 1.3 L water, all the strained tamarind liquid, 200 g pineapple, 35 ml fish sauce, and 25 g sugar. Bring to a boil and simmer for 5 minutes. Add the chilled 3 cm fish steaks in one layer and gently simmer for an estimated 4–6 minutes. Check the thickest part: catfish and basa must reach 63°C (145°F), or the flesh must be opaque and separate easily with a fork. Continue in 1-minute increments if needed, then lift cooked steaks to a clean plate so they do not overcook while the vegetables simmer. Time is an estimate, not the fish endpoint.",
        "寬鍋中加入剩餘 1.3 公升水、全部過濾羅望子水、200 公克鳳梨、35 毫升魚露與 25 公克糖，煮沸後小滾 5 分鐘。將冷藏的 3 公分魚段單層放入，微滾估煮 4–6 分鐘。測最厚處：鯰魚或巴沙魚須達 63°C（145°F），或魚肉不透明且可用叉子輕易分開。若未達，每次續煮 1 分鐘再測；熟魚移到乾淨盤上，避免與蔬菜同煮過久。時間是估值，不是魚肉熟度標準。",
        "広い鍋に残りの水1.3L、濾したタマリンド液すべて、パイナップル200g、魚醤35ml、砂糖25gを入れ、沸騰後5分煮ます。冷やしておいた厚さ3cmの魚を重ならないように加え、目安4〜6分静かに煮ます。最も厚い部分を測り、ナマズまたはバサは63°C（145°F）に達するか、身が不透明になってフォークで簡単にほぐれることを確認します。未達なら1分ずつ追加します。火が通った魚は清潔な皿に取り、野菜を煮る間に加熱しすぎないようにします。時間は目安で、魚の加熱基準ではありません。",
        "넓은 냄비에 남은 물 1.3L, 걸러 둔 타마린드 물 전량, 파인애플 200g, 피시소스 35ml, 설탕 25g을 넣습니다. 끓으면 5분 약하게 끓입니다. 차갑게 둔 두께 3cm 생선 조각을 한 겹으로 넣고 약 4–6분 잔잔하게 익힙니다. 가장 두꺼운 곳을 확인해 메기와 바사는 63°C (145°F)에 도달하거나 살이 불투명해지고 포크로 쉽게 갈라져야 합니다. 미달이면 1분씩 더 익힙니다. 익은 생선은 깨끗한 접시에 건져 채소를 끓이는 동안 과하게 익지 않게 합니다. 시간은 추정치이지 생선 익힘 기준이 아닙니다.",
        "ใส่น้ำที่เหลือ 1.3 ลิตร น้ำมะขามที่กรองแล้วทั้งหมด สับปะรด 200 กรัม น้ำปลา 35 มล. และน้ำตาล 25 กรัมในหม้อกว้าง ต้มแล้วเคี่ยว 5 นาที ใส่ปลาหนา 3 ซม.ที่แช่เย็นเรียงชั้นเดียว เคี่ยวเบา ๆ ประมาณ 4–6 นาที วัดตรงส่วนที่หนาที่สุด ปลาดุกและบาซาต้องถึง 63°C (145°F) หรือเนื้อทึบและแยกง่ายด้วยส้อม หากยังไม่ถึงให้ปรุงเพิ่มครั้งละ 1 นาที แล้วยกปลาสุกใส่จานสะอาดเพื่อไม่ให้สุกเกินระหว่างเคี่ยวผัก เวลาเป็นค่าประมาณ ไม่ใช่เกณฑ์ความสุกของปลา"
      )
    ],
    [
      ml("Simmer the vegetables, then return the fish", "燉煮蔬菜後放回魚肉", "野菜を煮てから魚を戻す", "채소를 끓인 뒤 생선을 다시 넣는다", "เคี่ยวผักแล้วใส่ปลากลับ"),
      ml(
        "Add all 250 g tomato wedges, 150 g okra, and the drained 100 g blanched edible stems to the broth. Simmer for about 5 minutes until the tomatoes soften and the okra is tender but still holds its shape. Add all 100 g bean sprouts for the final 2 minutes. Return the cooked fish for the last 30 seconds only to warm it through; keep the steaks intact.",
        "將全部 250 公克番茄瓣、150 公克秋葵與瀝乾的 100 公克汆燙芋莖加入湯中。小滾約 5 分鐘，至番茄變軟、秋葵熟嫩但仍保持形狀。最後 2 分鐘加入全部 100 公克豆芽。熟魚僅在最後 30 秒放回溫熱，保持魚段完整。",
        "トマト250gすべて、オクラ150g、水を切った下ゆで済みの茎100gを汁に加えます。トマトが柔らかくなり、オクラが形を保ったまま柔らかくなるまで約5分煮ます。最後の2分にもやし100gすべてを加えます。火の通った魚は最後の30秒だけ戻して温め、切り身を崩さないようにします。",
        "토마토 웨지 250g 전량, 오크라 150g, 물기를 뺀 데친 줄기 100g을 국물에 넣습니다. 토마토가 부드럽고 오크라가 모양을 유지하면서 익을 때까지 약 5분 끓입니다. 마지막 2분에 숙주 100g 전량을 넣습니다. 익힌 생선은 마지막 30초만 넣어 데우고 조각이 부서지지 않게 합니다.",
        "ใส่มะเขือเทศหั่นเสี้ยว 250 กรัมทั้งหมด กระเจี๊ยบ 150 กรัม และก้านที่ลวกสะเด็ดน้ำ 100 กรัมลงในน้ำซุป เคี่ยวประมาณ 5 นาทีจนมะเขือเทศนุ่มและกระเจี๊ยบสุกแต่ยังอยู่ทรง ใส่ถั่วงอก 100 กรัมทั้งหมดใน 2 นาทีสุดท้าย ใส่ปลาที่สุกแล้วกลับลงไปเพียง 30 วินาทีสุดท้ายให้อุ่น โดยคงชิ้นปลาให้ครบ"
      )
    ],
    [
      ml("Finish with herbs and garlic oil", "加入香草與蒜油完成", "ハーブとにんにく油で仕上げる", "허브와 마늘기름으로 마무리한다", "เติมสมุนไพรกับน้ำมันกระเทียม"),
      ml(
        "Turn off the heat. Add all 15 g chopped rice paddy herb and sawtooth coriander and the 5 g sliced chile. Spoon over all the reserved golden garlic and its oil. Divide the fish and vegetables evenly among four bowls and ladle in the sour broth. Serve hot; the fresh herbs should remain bright.",
        "關火，加入全部 15 公克切碎稻田香草與刺芫荽，以及 5 公克辣椒片。淋上預留的全部金黃蒜片與蒜油。將魚肉與蔬菜平均分入四碗，再舀入酸湯熱食；新鮮香草應保持鮮綠。",
        "火を止めます。刻んだライスパディハーブとノコギリコリアンダー15gすべて、唐辛子5gを加えます。取っておいたにんにくと油をすべて回しかけます。魚と野菜を4つの器に等分し、酸味のある汁を注いで熱いうちに供します。ハーブの色は鮮やかに保ちます。",
        "불을 끕니다. 다진 논허브와 쿨란트로 15g 전량, 홍고추 5g을 넣습니다. 남겨 둔 노릇한 마늘과 기름을 모두 끼얹습니다. 생선과 채소를 네 그릇에 똑같이 나누고 새콤한 국물을 붓습니다. 허브색이 선명할 때 뜨겁게 냅니다.",
        "ปิดไฟ ใส่ผักแขยงและผักชีฝรั่งสับ 15 กรัมทั้งหมดกับพริกแดง 5 กรัม ราดกระเทียมสีทองกับน้ำมันที่เก็บไว้ทั้งหมด แบ่งปลาและผักเท่ากันใน 4 ชามแล้วตักน้ำซุปรสเปรี้ยวร้อน ๆ ใส่ เสิร์ฟทันทีโดยให้สมุนไพรยังมีสีสด"
      )
    ]
  ]);
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (fish and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (cooling and refrigeration)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (soups and stews)", storage);
}

function reviseSaladeNicoise(recipe) {
  recipe.storage = ml(
    "Keep the egg, fish, vegetables, and dressing covered and refrigerated at or below 4°C (40°F); refrigerate leftovers within 2 hours. Prepared egg- or tuna-salad leftovers keep 3–4 days under refrigeration. For crisp lettuce, assemble and eat the salad the same day (a quality preference, not a safety cutoff). Discard it if left out longer than 2 hours.",
    "雞蛋、魚肉、蔬菜與醬汁分開加蓋冷藏於 4°C（40°F）以下；剩菜須在 2 小時內冷藏。冷藏的熟蛋或鮪魚沙拉可保存 3–4 天。為保持生菜清脆，最好當天組裝食用（這是品質偏好，不是安全期限）。室溫放置超過 2 小時即丟棄。",
    "卵、魚、野菜、ドレッシングは覆って4°C（40°F）以下で冷蔵し、残りは2時間以内に冷蔵します。調理済み卵またはツナのサラダは冷蔵で3〜4日保存できます。レタスの歯ごたえを保つには当日組み立てて食べるのがおすすめです（品質上の好みで安全期限ではありません）。室温に2時間を超えて置いた場合は廃棄します。",
    "달걀, 생선, 채소, 드레싱은 덮어 4°C (40°F) 이하로 냉장하고 남은 음식은 2시간 안에 냉장합니다. 조리한 달걀 또는 참치 샐러드는 냉장 상태에서 3–4일 보관할 수 있습니다. 상추의 아삭함을 위해 당일 조립해 먹는 것이 좋습니다(품질 선호이며 안전 기한은 아님). 실온에 2시간 넘게 둔 것은 버립니다.",
    "ปิดฝาแช่เย็นไข่ ปลา ผัก และน้ำสลัดที่อุณหภูมิไม่เกิน 4°C (40°F) และแช่เย็นของเหลือภายใน 2 ชั่วโมง สลัดไข่หรือทูน่าสุกเก็บในตู้เย็นได้ 3–4 วัน เพื่อให้ผักกาดกรอบควรประกอบและกินในวันเดียวกัน (เป็นความชอบด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัย) ทิ้งหากวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง"
  );

  setMethod(recipe, [
    [
      ml("Cook the eggs until both yolks are firm", "將雞蛋煮至蛋黃凝固", "卵黄まで固くゆでる", "노른자까지 단단히 삶는다", "ต้มไข่ให้ไข่แดงสุกแข็ง"),
      ml(
        "Start with 4 refrigerated, uncracked large eggs covered by the measured 1 L cold water. Bring to a boil, then lower to a gentle simmer for about 10 minutes. Check one egg: both white and yolk must be firm; the time is an estimate, so simmer 1–2 minutes more if any yolk is soft. Cool in fresh cold water for 5 minutes, peel with clean hands, quarter, and refrigerate at or below 4°C (40°F) until plating. Do not use colour or the timer alone as the egg safety check.",
        "將 4 顆冷藏、無裂痕的大雞蛋放入鍋中，加入量好的 1 公升冷水淹過。煮沸後轉小滾約 10 分鐘。檢查一顆：蛋白與蛋黃都須凝固；時間是估值，若蛋黃仍軟就再小滾 1–2 分鐘。換冷水浸 5 分鐘，以乾淨雙手剝殼、切四瓣，並冷藏於 4°C（40°F）以下至組盤。不可只以顏色或計時判斷雞蛋安全。",
        "冷蔵していた殻にひびのない大きめの卵4個を、計量した冷水1Lで覆います。沸騰したら弱い煮立ちにし、目安約10分ゆでます。1個を確認し、白身と黄身の両方が固まっていることを確かめます。時間は目安なので、黄身が柔らかければさらに1〜2分ゆでます。新しい冷水で5分冷まし、清潔な手で殻をむいて4等分し、盛り付けまで4°C（40°F）以下で冷蔵します。色や時間だけで安全性を判断しません。",
        "냉장 보관했고 껍질이 깨지지 않은 큰 달걀 4개에 계량한 찬물 1L를 부어 잠기게 합니다. 끓으면 약하게 낮춰 약 10분 삶습니다. 하나를 확인해 흰자와 노른자가 모두 단단히 익었는지 봅니다. 시간은 추정치이므로 노른자가 무르면 1–2분 더 삶습니다. 새 찬물에서 5분 식히고 깨끗한 손으로 껍질을 벗겨 4등분한 뒤 담을 때까지 4°C (40°F) 이하로 냉장합니다. 색이나 시간만으로 안전을 판단하지 않습니다.",
        "ใส่ไข่ฟองใหญ่ 4 ฟองที่แช่เย็นและเปลือกไม่ร้าวลงหม้อ เติมน้ำเย็นที่ตวงไว้ 1 ลิตรให้ท่วม พอเดือดลดเป็นเดือดอ่อนประมาณ 10 นาที ตรวจหนึ่งฟองให้ไข่ขาวและไข่แดงแข็งทั่ว เวลานี้เป็นค่าประมาณ หากไข่แดงยังนิ่มให้ต้มเพิ่ม 1–2 นาที แช่น้ำเย็นใหม่ 5 นาที ปอกด้วยมือสะอาด หั่นสี่ส่วนและแช่เย็นที่ไม่เกิน 4°C (40°F) จนจัดจาน อย่าใช้สีหรือเวลาเพียงอย่างเดียวตัดสินความปลอดภัยของไข่"
      )
    ],
    [
      ml("Wash, dry, and cut the vegetables", "洗淨擦乾並切蔬菜", "野菜を洗って水気を取り切る", "채소를 씻고 말려 썬다", "ล้าง ซับ และหั่นผัก"),
      ml(
        "Wash and thoroughly dry all 200 g lettuce. Cut the 400 g tomatoes into wedges, the 150 g cucumber into 5 mm half-moons, the 120 g green pepper into thin strips, and the 80 g white onion into 3 mm rings. Keep the vegetables covered and chilled while preparing the fish and dressing; use clean produce utensils separate from any raw eggshells.",
        "洗淨並徹底擦乾全部 200 公克生菜。400 公克番茄切瓣、150 公克小黃瓜切 5 毫米半月片、120 公克青甜椒切細條、80 公克白洋蔥切 3 毫米圈。準備魚肉與醬汁時，蔬菜加蓋冷藏；使用乾淨蔬果用具，並與蛋殼分開。",
        "レタス200gすべてを洗って完全に水気を取ります。トマト400gはくし形、きゅうり150gは厚さ5mmの半月切り、緑パプリカ120gは細切り、白玉ねぎ80gは厚さ3mmの輪切りにします。魚とドレッシングを準備する間は覆って冷蔵し、卵殻とは別の清潔な野菜用具を使います。",
        "상추 200g 전량을 씻고 완전히 말립니다. 토마토 400g은 웨지, 오이 150g은 5mm 반달, 초록 피망 120g은 가는 채, 흰 양파 80g은 3mm 링으로 썹니다. 생선과 드레싱을 준비하는 동안 덮어 냉장하고 달걀 껍질과 분리된 깨끗한 채소 도구를 씁니다.",
        "ล้างและซับใบผักกาด 200 กรัมทั้งหมดให้แห้ง หั่นมะเขือเทศ 400 กรัมเป็นเสี้ยว แตงกวา 150 กรัมเป็นครึ่งวงหนา 5 มม. พริกหวานเขียว 120 กรัมเป็นเส้น และหัวหอมขาว 80 กรัมเป็นวงหนา 3 มม. ปิดฝาแช่เย็นระหว่างเตรียมปลาและน้ำสลัด ใช้อุปกรณ์ผักสะอาดแยกจากเปลือกไข่"
      )
    ],
    [
      ml("Drain and portion the fish and preserved vegetables", "瀝乾並分配魚肉與醃漬蔬菜", "魚と調理済み野菜を水切りする", "생선과 절임 채소의 물기를 뺀다", "สะเด็ดปลาและผักที่เตรียมไว้"),
      ml(
        "Drain all 240 g cooked canned tuna, 50 g ready-to-eat anchovy fillets, 150 g prepared artichoke hearts, and 80 g pitted olives. Break the tuna into large flakes, not a paste. Cover these ready-to-eat ingredients and keep refrigerated at or below 4°C (40°F) until assembly; keep their utensils away from raw eggshells.",
        "將全部 240 公克熟鮪魚罐頭、50 公克即食鯷魚片、150 公克處理好的洋薊心與 80 公克去核橄欖瀝乾。鮪魚剝成大塊，不要壓成泥。這些即食食材加蓋冷藏於 4°C（40°F）以下至組盤；用具與生雞蛋殼分開。",
        "加熱済みツナ缶240gすべて、アンチョビ50g、調理済みアーティチョーク150g、種なしオリーブ80gの汁を切ります。ツナはペーストにせず大きめにほぐします。盛り付けまで覆って4°C（40°F）以下で冷蔵し、道具を生卵の殻から分けます。",
        "익힌 참치 통조림 240g 전량, 안초비 50g, 준비된 아티초크 150g, 씨 뺀 올리브 80g의 물기를 뺍니다. 참치는 으깨지 말고 큰 덩어리로 풉니다. 담을 때까지 덮어 4°C (40°F) 이하로 냉장하고 도구를 생달걀 껍질과 분리합니다.",
        "สะเด็ดทูน่ากระป๋องสุก 240 กรัมทั้งหมด แอนโชวีพร้อมกิน 50 กรัม หัวใจอาร์ติโชก 150 กรัม และมะกอกคว้านเมล็ด 80 กรัม ยีทูน่าเป็นชิ้นใหญ่ ไม่บดเป็นเนื้อ ปิดฝาแช่เย็นที่ไม่เกิน 4°C (40°F) จนจัดจาน และแยกอุปกรณ์จากเปลือกไข่ดิบ"
      )
    ],
    [
      ml("Whisk the lemon-mustard dressing", "拌勻檸檬芥末醬", "レモンマスタードドレッシングを混ぜる", "레몬 머스터드 드레싱을 젓는다", "ผสมน้ำสลัดเลมอนมัสตาร์ด"),
      ml(
        "Whisk all 20 ml lemon juice with 5 g Dijon mustard, 3 g finely grated garlic, and 0.5 g black pepper. Slowly whisk in all 60 ml olive oil until lightly emulsified. Taste and add up to the listed 1 g salt only if needed because anchovies and olives are salty. Divide the dressing into four equal portions, about 21 ml each.",
        "將全部 20 毫升檸檬汁與 5 公克第戎芥末、3 公克細磨蒜與 0.5 公克黑胡椒攪勻，再慢慢拌入全部 60 毫升橄欖油至略乳化。先試味，鯷魚與橄欖已有鹹味，僅在需要時加入最多 1 公克鹽。醬汁分成四份，每份約 21 毫升。",
        "レモン汁20mlすべて、ディジョンマスタード5g、すりおろしたにんにく3g、黒こしょう0.5gを混ぜます。オリーブ油60mlすべてを少しずつ加え、軽く乳化するまで混ぜます。アンチョビとオリーブに塩分があるので味見し、必要な場合だけ塩を最大1g加えます。4等分すると各約21mlです。",
        "레몬즙 20ml 전량, 디종 머스터드 5g, 곱게 간 마늘 3g, 후추 0.5g을 섞습니다. 올리브유 60ml 전량을 천천히 넣어 가볍게 유화되도록 젓습니다. 안초비와 올리브가 짜므로 맛을 보고 필요할 때만 소금을 최대 1g 넣습니다. 네 등분하면 한 사람당 약 21ml입니다.",
        "ตี น้ำเลมอน 20 มล.ทั้งหมดกับมัสตาร์ดดิฌง 5 กรัม กระเทียมขูด 3 กรัม และพริกไทยดำ 0.5 กรัม ค่อย ๆ ตีน้ำมันมะกอก 60 มล.ทั้งหมดจนเข้ากันเล็กน้อย ชิมก่อนเพราะแอนโชวีและมะกอกเค็ม เติมเกลือได้ไม่เกิน 1 กรัมเท่าที่จำเป็น แบ่งน้ำสลัดเป็น 4 ส่วนเท่า ๆ กัน ส่วนละประมาณ 21 มล."
      )
    ],
    [
      ml("Arrange the vegetable bases", "排好蔬菜底層", "野菜を皿に盛る", "채소 바탕을 담는다", "จัดผักรองจาน"),
      ml(
        "Divide the 200 g lettuce among four wide plates, about 50 g each. Arrange the tomato, cucumber, green pepper, and onion evenly over the leaves, leaving room for the tuna, anchovies, artichokes, olives, and eggs. Keep the plates chilled if serving will be delayed; do not dress them yet.",
        "將 200 公克生菜分成四盤，每盤約 50 公克。把番茄、小黃瓜、青椒與洋蔥平均排在葉片上，留位置給鮪魚、鯷魚、洋薊、橄欖和雞蛋。若延後上桌，將盤子冷藏；此時先不要拌醬。",
        "レタス200gを4皿に分け、各約50gにします。トマト、きゅうり、緑パプリカ、玉ねぎを葉の上に均等に並べ、ツナ、アンチョビ、アーティチョーク、オリーブ、卵の場所を空けます。すぐに出さない場合は皿ごと冷やし、まだドレッシングはかけません。",
        "상추 200g을 네 접시에 나누어 접시마다 약 50g씩 담습니다. 토마토, 오이, 초록 피망, 양파를 잎 위에 고르게 놓고 참치, 안초비, 아티초크, 올리브, 달걀 자리를 남깁니다. 바로 내지 않을 경우 접시를 차게 두고 아직 드레싱을 뿌리지 않습니다.",
        "แบ่งผักกาด 200 กรัมลงจานกว้าง 4 ใบ ใบละประมาณ 50 กรัม เรียงมะเขือเทศ แตงกวา พริกหวาน และหัวหอมให้ทั่วโดยเว้นที่สำหรับทูน่า แอนโชวี อาร์ติโชก มะกอก และไข่ หากยังไม่เสิร์ฟให้แช่จานไว้และยังไม่ราดน้ำสลัด"
      )
    ],
    [
      ml("Add the fish and eggs just before serving", "上桌前才放魚肉與雞蛋", "食べる直前に魚と卵をのせる", "내기 직전에 생선과 달걀을 올린다", "ใส่ปลาและไข่ก่อนเสิร์ฟ"),
      ml(
        "Top each plate with 60 g tuna, about 12.5 g anchovies, 37.5 g artichoke hearts, 20 g olives, and one quartered hard-cooked egg. Scatter 2 g torn basil and drizzle about 21 ml dressing over each serving. Serve immediately. Keep perishable leftovers refrigerated within 2 hours at or below 4°C (40°F); same-day assembly is for crispness, not the safety storage limit.",
        "每盤放 60 公克鮪魚、約 12.5 公克鯷魚、37.5 公克洋薊心、20 公克橄欖與一顆切四瓣的全熟蛋。每份撒 2 公克撕碎羅勒並淋約 21 毫升醬汁，立即上桌。易腐食物須在 2 小時內冷藏於 4°C（40°F）以下；當天組裝是為了清脆口感，不是安全保存期限。",
        "各皿にツナ60g、アンチョビ約12.5g、アーティチョーク37.5g、オリーブ20g、固ゆで卵1個分をのせます。ちぎったバジルを各2g散らし、ドレッシング約21mlをかけてすぐに供します。傷みやすい残りは2時間以内に4°C（40°F）以下で冷蔵します。当日組み立てるのは歯ごたえのためで、安全な保存期限とは別です。",
        "각 접시에 참치 60g, 안초비 약 12.5g, 아티초크 37.5g, 올리브 20g, 단단히 익혀 4등분한 달걀 한 개 분량을 올립니다. 찢은 바질 2g씩 뿌리고 드레싱 약 21ml씩 둘러 즉시 냅니다. 부패하기 쉬운 남은 음식은 2시간 안에 4°C (40°F) 이하로 냉장합니다. 당일 조립은 아삭함을 위한 것이며 안전 저장 기한과는 다릅니다.",
        "วางทูน่า 60 กรัม แอนโชวีประมาณ 12.5 กรัม อาร์ติโชก 37.5 กรัม มะกอก 20 กรัม และไข่ต้มสุกหั่นสี่ส่วนหนึ่งฟองต่อจาน โรยโหระพาฉีก 2 กรัมและราดน้ำสลัดประมาณ 21 มล.ต่อที่ เสิร์ฟทันที ของเหลือที่เสียง่ายต้องแช่เย็นภายใน 2 ชั่วโมงที่ไม่เกิน 4°C (40°F) การจัดและกินในวันเดียวกันเพื่อความกรอบ ไม่ใช่กำหนดอายุความปลอดภัย"
      )
    ]
  ]);
  addOfficial(recipe, "FDA: What You Need to Know About Egg Safety (firm yolks and chilling)", eggSafety);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (cold holding and two-hour rule)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (egg and tuna salads)", storage);
}

export function refineFiftySixthMethods(recipes) {
  const revisions = new Map([
    ["sundubu-jjigae", reviseSundubu],
    ["com-tam-suon-nuong", reviseComTam],
    ["canh-chua-ca", reviseCanhChua],
    ["salade-nicoise", reviseSaladeNicoise]
  ]);
  for (const [id, revise] of revisions) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) throw new Error(`Missing recipe for fifty-sixth method audit: ${id}`);
    const recipe = cloneForPublication(recipes[index]);
    revise(recipe);
    recipes[index] = recipe;
  }
}
