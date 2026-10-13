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

function ingredient(recipe, startsWith, amount, localized) {
  const row = recipe.ingredients.find((entry) => entry.item.en.startsWith(startsWith));
  if (!row) throw new Error(`${recipe.id}: missing ingredient beginning with ${startsWith}`);
  if (amount) row.amount = amount;
  row.item = localized;
}

function step(title, body, imageScene) {
  return imageScene ? { title, body, imageScene } : { title, body };
}

function setMethod(recipe, entries) {
  const imageScenes = recipe.instructions.map((entry) => entry.imageScene);
  recipe.instructions = entries.map(([titles, bodies], index) => step(titles, bodies, imageScenes[index]));
}

function addOfficial(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${title}`, url });
  }
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const seafood = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const rice = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";

function reviseThreeCupChicken(recipe) {
  recipe.prepMinutes = 20;
  recipe.cookMinutes = 45;
  recipe.totalMinutes = 65;
  ingredient(recipe, "bone-in chicken thigh", null, ml(
    "bone-in chicken thigh, cut into 4 cm pieces; keep refrigerated until the pan is ready",
    "帶骨雞腿肉，切成 4 公分塊；炒鍋備妥前先冷藏",
    "骨付き鶏もも肉、4cmに切る。鍋の準備ができるまで冷蔵する",
    "뼈 있는 닭다리살, 4cm 크기로 자르고 팬을 준비할 때까지 냉장 보관",
    "เนื้อน่องไก่ติดกระดูก หั่นชิ้น 4 ซม. แช่เย็นไว้จนกว่ากระทะจะพร้อม"
  ));

  setMethod(recipe, [
    [
      ml("Set up and dry the chicken", "備料並擦乾雞肉", "材料をそろえ、鶏肉の水気を取る", "재료를 준비하고 닭고기 물기를 닦는다", "เตรียมของและซับไก่ให้แห้ง"),
      ml(
        "Measure the 120 ml rice wine, both soy sauces, sugar, and 80 ml water before heating. Pat the 900 g chicken dry with paper towels and keep it separate from the basil and ready-to-eat items; do not leave it out to temper. Wash and dry the 40 g basil. The listed 20-minute prep is a planning estimate for cutting, measuring, and drying.",
        "加熱前先量好 120 毫升米酒、兩種醬油、糖與 80 毫升水。用紙巾擦乾 900 公克雞肉，與羅勒及即食食材分開；不必放在室溫回溫。洗淨並擦乾 40 公克羅勒。備料欄的 20 分鐘是切料、量取與擦乾的估時。",
        "加熱前に米酒120ml、2種類のしょうゆ、砂糖、水80mlを量ります。鶏肉900gをペーパーでよく拭き、バジルやそのまま食べる食材と分けます。室温に戻す必要はありません。バジル40gを洗って水気を取ります。準備時間20分は切る、量る、水気を取る作業の目安です。",
        "가열 전에 쌀술 120ml, 두 종류의 간장, 설탕, 물 80ml를 계량한다. 닭고기 900g을 키친타월로 말리고 바질 및 바로 먹는 재료와 분리한다. 실온에 두어 미리 온도를 높일 필요는 없다. 바질 40g을 씻어 물기를 제거한다. 준비 20분은 자르고 계량하고 닦는 시간의 추정치다.",
        "ก่อนตั้งเตา ตวงเหล้าข้าว 120 มล. ซีอิ๊วทั้งสองชนิด น้ำตาล และน้ำ 80 มล. ซับไก่ 900 กรัมให้แห้งและแยกจากโหระพากับอาหารพร้อมกิน ไม่ต้องวางทิ้งไว้ให้คลายเย็น ล้างและซับโหระพา 40 กรัม เวลาเตรียม 20 นาทีเป็นค่าประมาณสำหรับหั่น ตวง และซับให้แห้ง."
      )
    ],
    [
      ml("Infuse the sesame oil with ginger", "用麻油煸香薑片", "ごま油にしょうがの香りを移す", "참기름에 생강 향을 낸다", "เจียวขิงให้หอมในน้ำมันงา"),
      ml(
        "Heat all 45 ml black sesame oil in a wide, heavy pan over medium-low heat. Add all 70 g ginger in a single layer and cook for 6–8 minutes, turning once, until the edges curl and turn golden but do not blacken. This is a flavor stage; the time is an estimate and the oil should not smoke.",
        "厚底寬鍋以中小火加熱全部 45 毫升黑麻油，放入全部 70 公克薑片單層鋪開，煸 6–8 分鐘，中途翻動一次，至邊緣捲起呈金黃但不可焦黑。這是提香步驟，時間為估值，麻油不可冒煙。",
        "厚手の広い鍋に黒ごま油45mlすべてを入れ、中弱火で熱します。しょうが70gすべてを一層に並べ、途中で一度返しながら6〜8分、縁が反ってきつね色になるまで加熱します。焦がさず、油を煙らせないでください。これは香りを出す工程で、時間は目安です。",
        "바닥이 두꺼운 넓은 팬에 검은 참기름 45ml 전량을 넣고 중약불로 가열한다. 생강 70g 전량을 한 겹으로 펼쳐 6–8분 익히며 한 번 뒤집어 가장자리가 말리고 노릇해지게 한다. 검게 태우지 말고 기름에서 연기가 나지 않게 한다. 향을 내는 단계이며 시간은 추정치다.",
        "ตั้งกระทะก้นหนาใบกว้างด้วยไฟกลางอ่อน ใส่น้ำมันงาดำทั้งหมด 45 มล. วางขิงทั้งหมด 70 กรัมชั้นเดียว เจียว 6–8 นาที พลิกหนึ่งครั้งจนขอบงอและเป็นสีทอง แต่อย่าให้ไหม้ดำ ขั้นนี้เป็นการทำกลิ่น เวลาเป็นค่าประมาณและอย่าให้น้ำมันมีควัน"
      )
    ],
    [
      ml("Add garlic and dried chile", "加入蒜與乾辣椒", "にんにくと乾燥唐辛子を加える", "마늘과 건고추를 넣는다", "ใส่กระเทียมและพริกแห้ง"),
      ml(
        "Add all 12 peeled garlic cloves and the 3 dried chiles. Stir over medium-low heat for 1–2 minutes until the garlic just begins to colour and the chile smells fragrant. Keep everything moving; scorched garlic will make the sauce bitter.",
        "加入全部 12 瓣去皮蒜頭與 3 根乾辣椒，中小火翻炒 1–2 分鐘，至蒜頭剛開始上色、辣椒出香。持續翻動，蒜頭焦黑會讓醬汁發苦。",
        "皮をむいたにんにく12片すべてと乾燥唐辛子3本を加えます。中弱火で1〜2分、にんにくが色づき始め、唐辛子の香りが立つまで混ぜます。焦がすとソースが苦くなるため、手を止めません。",
        "깐 마늘 12쪽 전량과 건고추 3개를 넣는다. 중약불에서 1–2분 저으며 마늘 가장자리가 막 노릇해지고 고추 향이 날 때까지 볶는다. 마늘을 태우면 소스가 써지므로 계속 움직인다.",
        "ใส่กระเทียมปอกเปลือกทั้ง 12 กลีบและพริกแห้ง 3 เม็ด ผัดไฟกลางอ่อน 1–2 นาทีจนกระเทียมเริ่มเปลี่ยนสีและพริกหอม คนตลอดเพื่อไม่ให้กระเทียมไหม้จนซอสขม"
      )
    ],
    [
      ml("Brown the chicken in uncrowded batches", "分批煎上色雞肉", "鶏肉を詰め込まずに焼き付ける", "닭고기를 나누어 굽는다", "จี่ไก่เป็นชุดโดยไม่วางแน่น"),
      ml(
        "Raise the heat to medium-high. Add the chicken in one uncrowded layer, keeping the aromatics to the side; brown for about 4–5 minutes, turning once. If 900 g does not fit without touching, brown in two batches, about 4–5 minutes each, and return all pieces to the pan. The centres are not cooked yet; use a clean plate for the raw chicken and wash hands and tools after handling it.",
        "轉中大火，雞肉單層放入且彼此留空，香料先撥到一旁，煎約 4–5 分鐘並翻面一次。若 900 公克無法不重疊地放入，就分兩批各煎約 4–5 分鐘，再將雞肉全數放回鍋中。此時中心尚未熟；生雞肉使用乾淨盤子，處理後洗手並清潔器具。",
        "中強火に上げます。鶏肉を重ならない一層に入れ、香味野菜を脇に寄せ、約4〜5分焼いて一度返します。900gを重ならないよう置けない場合は2回に分け、各回約4〜5分焼いてから鍋に戻します。中心はまだ生です。生肉用の清潔な皿を使い、触れた後は手と器具を洗います。",
        "중강불로 올린다. 닭고기를 겹치지 않게 한 겹으로 넣고 향신료는 가장자리로 옮긴 뒤 약 4–5분 굽고 한 번 뒤집는다. 900g이 겹치지 않게 들어가지 않으면 두 번에 나눠 각각 약 4–5분 굽고 모두 팬에 다시 넣는다. 아직 속은 익지 않았다. 생닭은 깨끗한 접시에 담고 만진 뒤 손과 도구를 씻는다.",
        "เพิ่มเป็นไฟกลางค่อนแรง วางไก่ชั้นเดียวโดยไม่เบียดกัน เลื่อนเครื่องหอมไปด้านข้าง จี่ประมาณ 4–5 นาทีแล้วพลิกหนึ่งครั้ง หากไก่ 900 กรัมวางไม่พอ ให้แบ่งเป็น 2 ชุด ชุดละประมาณ 4–5 นาทีแล้วใส่กลับลงกระทะ ตอนนี้ตรงกลางยังไม่สุก ใช้จานสะอาดรองไก่ดิบและล้างมือกับอุปกรณ์หลังจับ"
      )
    ],
    [
      ml("Braise to the poultry safety endpoint", "燉至禽肉食安熟度", "鶏肉を安全温度まで蒸し煮する", "닭고기를 안전 온도까지 졸인다", "ตุ๋นไก่จนถึงอุณหภูมิความปลอดภัย"),
      ml(
        "Pour in all 120 ml rice wine, 60 ml light soy sauce, 15 ml dark soy sauce, 20 g rock sugar, and 80 ml water; scrape up the browned bits. Bring to a boil, cover, and lower to a steady gentle simmer for an estimated 15–20 minutes. Start checking the largest thigh piece at 15 minutes with a clean thermometer in its thickest part, away from bone: chicken must reach 74°C (165°F). Continue in 2-minute increments if needed. The time is only a cooking estimate, not the safety test.",
        "倒入全部 120 毫升米酒、60 毫升生抽、15 毫升老抽、20 公克冰糖及 80 毫升水，刮起鍋底焦香。煮沸後加蓋，轉為穩定微滾，估煮 15–20 分鐘。15 分鐘時先用乾淨溫度計測最大雞腿塊最厚處，避開骨頭；雞肉必須達 74°C（165°F）。未達時每次續煮 2 分鐘再測。時間只是烹調估值，安全檢查應以溫度計為準。",
        "米酒120ml、薄口しょうゆ60ml、濃口しょうゆ15ml、氷砂糖20g、水80mlをすべて加え、鍋底の焼き付きもこそげます。沸騰したら蓋をして、安定した弱い煮立ちで目安15〜20分煮ます。15分で最大のもも肉の最も厚い部分を骨に触れないよう清潔な温度計で測ります。鶏肉は74°C（165°F）に達する必要があります。未達なら2分ずつ追加して再測定します。時間は目安で、安全確認は温度で行います。",
        "쌀술 120ml, 양조간장 60ml, 진간장 15ml, 각설탕 20g, 물 80ml를 전량 넣고 바닥의 갈색 풍미를 긁어낸다. 끓으면 뚜껑을 덮고 일정한 약불로 추정 15–20분 끓인다. 15분부터 가장 큰 닭다리 조각의 가장 두꺼운 곳을 깨끗한 온도계로 재되 뼈에 닿지 않게 한다. 닭고기는 74°C (165°F)에 도달해야 한다. 미달이면 2분씩 더 익혀 다시 잰다. 시간은 조리 추정치이고 안전 확인은 온도계로 한다.",
        "เติมเหล้าข้าว 120 มล. ซีอิ๊วขาว 60 มล. ซีอิ๊วดำ 15 มล. น้ำตาลกรวด 20 กรัม และน้ำ 80 มล.ทั้งหมด ขูดเศษหอมที่ก้นกระทะ ต้มให้เดือด ปิดฝาและลดเป็นไฟอ่อนที่เดือดเบา ๆ ประมาณ 15–20 นาที เริ่มตรวจเมื่อครบ 15 นาที โดยใช้เทอร์โมมิเตอร์สะอาดวัดส่วนที่หนาที่สุดของชิ้นน่องที่ใหญ่ที่สุดและไม่ให้แตะกระดูก ไก่ต้องถึง 74°C (165°F) หากยังไม่ถึงให้ต้มเพิ่มครั้งละ 2 นาทีแล้ววัดซ้ำ เวลาเป็นเพียงค่าประมาณ ไม่ใช่การตรวจความปลอดภัย"
      )
    ],
    [
      ml("Reduce the glaze and finish with basil", "收濃醬汁並拌入羅勒", "たれを煮詰め、バジルを加える", "소스를 졸이고 바질을 넣는다", "เคี่ยวซอสให้ข้นแล้วใส่โหระพา"),
      ml(
        "Uncover and simmer over medium-high heat for about 4–6 minutes, turning the chicken often, until the sauce coats the pieces and leaves a slow trail when a spoon crosses the pan. This is a texture cue; stop before the sauce turns sticky or the sesame oil pools. Turn off the heat, fold in all 40 g basil for 20–30 seconds, cover for 2 minutes, then divide all chicken and sauce among four servings.",
        "開蓋轉中大火約 4–6 分鐘，經常翻動雞肉，至醬汁能包裹每塊雞肉，湯匙劃過鍋底會慢慢合攏。這是口感指標；醬汁開始黏稠或麻油浮成一層前就要停火。關火後拌入全部 40 公克羅勒 20–30 秒，加蓋靜置 2 分鐘，再把雞肉和醬汁平均分成四份。",
        "蓋を外し、中強火で約4〜6分煮詰めながら鶏肉をよく返します。ソースが鶏肉に絡み、スプーンで鍋底をなぞるとゆっくり戻る濃さが目安です。これは食感の合図です。べたつく前、油が大きく分離する前に止めます。火を止め、バジル40gすべてを20〜30秒混ぜ、蓋をして2分置き、鶏肉とソースを4人分に均等に分けます。",
        "뚜껑을 열고 중강불에서 약 4–6분 졸이며 닭고기를 자주 뒤집어 소스가 고기에 묻고 숟가락으로 바닥을 그었을 때 천천히 다시 흐를 정도로 만든다. 이는 식감 기준이다. 소스가 끈적해지거나 참기름이 크게 분리되기 전에 멈춘다. 불을 끄고 바질 40g 전량을 20–30초 섞고 뚜껑을 덮어 2분 둔 뒤 닭고기와 소스를 네 몫으로 나눈다.",
        "เปิดฝาแล้วเคี่ยวไฟกลางค่อนแรงประมาณ 4–6 นาที พลิกไก่บ่อย ๆ จนซอสเคลือบชิ้นไก่และรอยที่ลากช้อนบนกระทะค่อย ๆ ไหลกลับ นี่เป็นสัญญาณด้านเนื้อสัมผัส ให้หยุดก่อนซอสเหนียวหรือน้ำมันงาแยกเป็นแอ่ง ปิดไฟ ใส่โหระพาทั้งหมด 40 กรัม คลุก 20–30 วินาที ปิดฝาพัก 2 นาที แล้วแบ่งไก่และซอสเป็น 4 ส่วนเท่า ๆ กัน"
      )
    ]
  ]);

  recipe.storage = ml(
    "For the freshest basil aroma, serve promptly. Cool leftovers in shallow containers and refrigerate within 2 hours at 4°C (40°F) or below. FoodSafety.gov lists cooked meat and poultry leftovers for 3–4 days; reheat only the portion needed to 74°C (165°F) throughout. The 45-minute cook field is an estimate for the listed pieces and pan; use the thermometer endpoint even if cooking takes longer.",
    "為保留羅勒香氣，完成後盡快上桌。剩菜分裝淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 對熟肉與熟禽剩菜列出的冷藏期為 3–4 天；只取要吃的份量回熱至各處達 74°C（165°F）。烹煮欄 45 分鐘是依所列肉塊與鍋具估算；即使超時仍須達溫度計熟度標準。",
    "バジルの香りを保つため、できたら早めに提供します。残りは浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govの目安では、調理済み肉・鶏肉の残りは3〜4日保存できます。食べる分だけ取り分け、全体が74°C（165°F）に達するまで温め直します。調理時間45分は肉の大きさと鍋による目安で、長くかかっても温度計の基準を満たしてください。",
    "바질 향을 가장 잘 살리려면 바로 낸다. 남은 음식은 얕은 용기에 나눠 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov는 조리한 고기와 가금류 남은 음식을 3–4일 보관하도록 안내한다. 먹을 만큼만 덜어 전체가 74°C (165°F)에 도달하도록 다시 데운다. 조리시간 45분은 표시한 크기와 팬에 대한 추정치이며 더 걸리더라도 온도계 기준을 충족해야 한다.",
    "เพื่อให้ได้กลิ่นโหระพาสด ให้เสิร์ฟทันที อาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า FoodSafety.gov ระบุว่าอาหารเหลือประเภทเนื้อและสัตว์ปีกที่ปรุงสุกเก็บได้ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F) เวลาเคี่ยว 45 นาทีเป็นค่าประมาณตามขนาดชิ้นและกระทะ หากใช้เวลานานกว่าก็ยังต้องถึงอุณหภูมิที่กำหนด"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (poultry and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (raw poultry separation and chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (cooked meat and poultry)", storage);
}

function reviseChiayiTurkeyRice(recipe) {
  recipe.prepMinutes = 25;
  recipe.cookMinutes = 75;
  recipe.totalMinutes = 100;
  ingredient(recipe, "strained turkey stock", "280 ml", ml(
    "strained turkey stock; reserve 30 ml for the shredded meat and use 250 ml for the gravy",
    "過濾火雞高湯；預留 30 毫升拌肉，250 毫升製作醬汁",
    "濾した七面鳥のゆで汁。30mlは肉用、250mlはたれ用に取り分ける",
    "거른 칠면조 육수. 30ml는 고기에, 250ml는 소스에 덜어 둔다",
    "น้ำต้มไก่งวงที่กรองแล้ว แบ่ง 30 มล.ไว้คลุกเนื้อ และ 250 มล.ทำเกรวี"
  ));
  ingredient(recipe, "neutral oil", "80 ml", ml(
    "neutral oil for frying the shallots; strain and measure 45 ml shallot oil for the gravy and bowls",
    "中性油，用來炸紅蔥頭；濾出後量取 45 毫升紅蔥油供醬汁與飯碗使用",
    "エシャロットを揚げる中性油。揚げた後に濾し、たれと丼用にエシャロット油45mlを量る",
    "샬롯을 튀길 중성유. 튀긴 뒤 거르고 소스와 밥그릇용 샬롯 오일 45ml를 계량한다",
    "น้ำมันรสกลางสำหรับเจียวหอมแดง หลังทอดให้กรองและตวงน้ำมันหอมเจียว 45 มล.สำหรับเกรวีกับข้าว"
  ));

  recipe.sources = recipe.sources.map((source) => source.url === "https://cookinginchinglish.com/taiwanese-chicken-rice/"
    ? { title: "Serious Eats — Taiwanese Turkey Rice", url: "https://www.seriouseats.com/taiwan-eats-turkey-rice-with-or-without-leftovers-recipe" }
    : source);

  setMethod(recipe, [
    [
      ml("Poach the turkey to a thermometer endpoint", "以溫度計確認火雞肉熟度", "温度計で確認しながら七面鳥をゆでる", "온도계로 확인하며 칠면조를 삶는다", "ต้มไก่งวงโดยตรวจด้วยเทอร์โมมิเตอร์"),
      ml(
        "Put the 900 g bone-in turkey breast, 1.5 L water, all 25 g ginger, and all 4 bruised scallions in a snug pot. Bring just to a simmer over medium heat, about 15–20 minutes depending on the pot, then lower the heat and cover partly. Gently poach for an estimated 28–35 minutes; begin checking at 28 minutes in the thickest part without touching bone. Turkey must reach 74°C (165°F). Continue in 3-minute increments if needed; the time is a planning estimate, not the safety test.",
        "將 900 公克帶骨火雞胸、1.5 公升水、全部 25 公克薑片及 4 支拍裂青蔥放入大小合適的鍋。中火加熱至剛微滾，依鍋具約需 15–20 分鐘，再轉小火並半掩鍋蓋。以微滾估煮 28–35 分鐘；第 28 分鐘起測量最厚處，避開骨頭。火雞肉必須達 74°C（165°F）；未達時每次續煮 3 分鐘再測。時間是安排估值，不是安全檢查。",
        "骨付き七面鳥胸肉900g、水1.5L、しょうが25gすべて、叩いた青ねぎ4本を鍋に入れます。中火で静かに煮立つまで約15〜20分（鍋による）加熱し、火を弱めて蓋を少しずらします。目安28〜35分ゆで、28分から骨に触れない最も厚い部分を測ります。七面鳥は74°C（165°F）に達する必要があります。未達なら3分ずつ追加します。時間は目安で、安全確認は温度計で行います。",
        "뼈 있는 칠면조 가슴살 900g, 물 1.5L, 생강 25g 전량, 으깬 대파 4대를 냄비에 넣는다. 중불로 약 15–20분(냄비에 따라 다름) 가열해 살짝 끓기 시작하면 불을 낮추고 뚜껑을 조금 열어 둔다. 약 28–35분 부드럽게 삶고 28분부터 뼈에 닿지 않게 가장 두꺼운 곳을 잰다. 칠면조는 74°C (165°F)에 도달해야 한다. 미달이면 3분씩 더 익힌다. 시간은 계획을 위한 추정치이며 안전 검사는 온도계로 한다.",
        "ใส่อกไก่งวงติดกระดูก 900 กรัม น้ำ 1.5 ลิตร ขิงทั้งหมด 25 กรัม และต้นหอมบุบทั้งหมด 4 ต้นลงหม้อพอดีใบ ตั้งไฟกลางจนเริ่มเดือดอ่อนประมาณ 15–20 นาทีตามหม้อ แล้วลดไฟและปิดฝาแง้มไว้ เคี่ยวเบา ๆ ประมาณ 28–35 นาที เริ่มวัดส่วนที่หนาที่สุดโดยไม่แตะกระดูกเมื่อครบ 28 นาที เนื้อไก่งวงต้องถึง 74°C (165°F) หากยังไม่ถึงให้ต้มเพิ่มครั้งละ 3 นาที เวลาเป็นค่าประมาณสำหรับวางแผน ไม่ใช่การตรวจความปลอดภัย"
      )
    ],
    [
      ml("Rest and shred while the shallots cook", "靜置火雞肉並同步炸紅蔥頭", "休ませて裂き、同時にエシャロットを揚げる", "칠면조를 쉬게 하고 샬롯을 튀긴다", "พักและฉีกเนื้อพร้อมเจียวหอมแดง"),
      ml(
        "Transfer the cooked turkey to a clean tray, tent loosely, and rest for 15 minutes while you fry the shallots in the next step. Remove skin and bone, then pull all meat along the grain into thin shreds. Measure 30 ml hot strained stock from the poaching pot and toss it through the meat; keep the shredded meat covered. Reserve 280 ml strained stock for this recipe (30 ml for the meat and 250 ml for the gravy); cool, refrigerate, freeze, or discard any extra stock separately.",
        "將熟火雞胸移至乾淨托盤，鬆鬆蓋住靜置 15 分鐘，這段時間可依下一步炸紅蔥頭。去皮去骨，順紋理撕成細絲。從鍋中過濾的高湯量出 30 毫升，拌入肉絲並加蓋保溫。此食譜預留過濾高湯共 280 毫升（30 毫升拌肉、250 毫升做醬）；多餘高湯另行冷藏、冷凍或丟棄。",
        "火が通った七面鳥を清潔なトレーに移し、ふんわり覆って15分休ませます。その間に次の手順でエシャロットを揚げます。皮と骨を取り、繊維に沿って細く裂きます。ゆで汁を濾して30ml量り、肉にからめて蓋をします。このレシピでは濾したゆで汁を計280ml使用します（肉用30ml、たれ用250ml）。残りは別に冷蔵・冷凍するか廃棄します。",
        "익힌 칠면조를 깨끗한 쟁반으로 옮겨 느슨하게 덮고 15분 둔다. 그동안 다음 단계에서 샬롯을 튀긴다. 껍질과 뼈를 제거하고 결을 따라 가늘게 찢는다. 삶은 물을 거른 뒤 30ml를 재어 고기에 버무리고 덮어 둔다. 이 요리에는 거른 육수 280ml를 쓴다(고기용 30ml, 소스용 250ml). 남은 육수는 따로 식혀 냉장·냉동하거나 버린다.",
        "ย้ายไก่งวงที่สุกแล้วลงถาดสะอาด คลุมหลวม ๆ พัก 15 นาที ระหว่างนี้เจียวหอมแดงตามขั้นตอนถัดไป เอาหนังและกระดูกออก ฉีกเนื้อตามแนวเส้นใยเป็นเส้นบาง ตวงน้ำต้มที่กรองแล้ว 30 มล.คลุกกับเนื้อและปิดไว้ สูตรนี้ใช้น้ำต้มที่กรองแล้ว 280 มล. (30 มล.คลุกเนื้อ และ 250 มล.ทำเกรวี) น้ำต้มที่เหลือให้แยกเก็บในตู้เย็น แช่แข็ง หรือทิ้ง"
      )
    ],
    [
      ml("Fry and portion the shallots and oil", "炸紅蔥頭並分配蔥油", "エシャロットを揚げて油を取り分ける", "샬롯을 튀기고 오일을 나눈다", "เจียวหอมแดงและแบ่งน้ำมัน"),
      ml(
        "Heat all 80 ml neutral oil in a small, heavy pan over medium-low. Add all 100 g sliced shallots and stir for 9–11 minutes until deep golden; remove promptly because they darken as they drain. Strain the scented oil through a fine sieve and measure 45 ml for this dish. Keep every crisp shallot for the bowls. Any strained oil beyond the measured 45 ml may be cooled and saved for another cooking use or discarded; it is not needed for this recipe.",
        "小厚鍋以中小火加熱全部 80 毫升中性油，加入全部 100 公克紅蔥頭片，翻動 9–11 分鐘至深金黃；立刻撈起，因瀝油時顏色仍會加深。用細篩濾出香蔥油，量取 45 毫升供本食譜使用。酥紅蔥頭全部留作配料。超過量取 45 毫升的過濾油可冷卻後另作烹調或丟棄，本食譜不再使用。",
        "小さく厚手の鍋に中性油80mlすべてを入れ、中弱火で熱します。薄切りエシャロット100gすべてを加え、濃いきつね色まで9〜11分混ぜます。油を切る間にも色づくため、すぐに取り出します。香りのついた油を細かい網で濾し、この料理用に45ml量ります。揚げエシャロットは全量を丼用に取っておきます。45mlを超える濾した油は冷まして別の調理に使うか廃棄します。この料理では使いません。",
        "작고 두꺼운 팬에 중성유 80ml 전량을 넣고 중약불로 가열한다. 얇게 썬 샬롯 100g 전량을 넣어 9–11분 짙은 황금색이 될 때까지 저어 튀긴다. 건지는 동안 색이 더 진해지므로 바로 건진다. 향이 밴 기름을 고운 체에 걸러 이 요리용으로 45ml 계량한다. 바삭한 샬롯은 전량 그릇에 올리도록 남긴다. 45ml보다 많이 남은 기름은 식혀 다른 요리에 쓰거나 버리며 이 요리에는 더 넣지 않는다.",
        "ตั้งกระทะใบเล็กก้นหนาด้วยไฟกลางอ่อน ใส่น้ำมันรสกลางทั้งหมด 80 มล. เติมหอมแดงซอยทั้งหมด 100 กรัม เจียว 9–11 นาทีจนเป็นสีทองเข้ม คนเรื่อย ๆ และรีบตักขึ้นเพราะสีจะเข้มต่อระหว่างสะเด็ดน้ำมัน กรองน้ำมันหอมเจียวด้วยตะแกรงละเอียดและตวง 45 มล.สำหรับเมนูนี้ เก็บหอมแดงกรอบทั้งหมดไว้ใส่ชาม น้ำมันที่กรองแล้วเกิน 45 มล.ให้ปล่อยเย็นแล้วเก็บไว้ใช้อย่างอื่นหรือทิ้ง ไม่ต้องใช้ในสูตรนี้"
      )
    ],
    [
      ml("Reduce the measured gravy", "煮濃定量醬汁", "分量を決めたたれを煮詰める", "계량한 소스를 졸인다", "เคี่ยวเกรวีตามปริมาณ"),
      ml(
        "In a saucepan combine all 250 ml reserved stock, 25 ml light soy sauce, 8 g sugar, and 15 ml of the 45 ml shallot oil. Simmer uncovered for an estimated 8–10 minutes, stirring occasionally, until glossy and about 180 ml remains. This reduction time and volume are texture estimates, not a safety endpoint. Set aside 45 ml gravy per bowl; use 24 ml of the remaining oil to drizzle 6 ml over each of the four bowls, and keep the final 6 ml to adjust the gravy or reserve for another use.",
        "小鍋中加入預留的全部 250 毫升高湯、25 毫升生抽、8 公克糖及 45 毫升紅蔥油中的 15 毫升。開蓋微滾約 8–10 分鐘，偶爾攪拌，至醬汁發亮且約剩 180 毫升。收汁時間與體積是口感估值，不是食安熟度標準。每碗預留約 45 毫升醬汁；用剩餘紅蔥油中的 24 毫升分到四碗，每碗淋 6 毫升，最後 6 毫升可視需要調整醬汁或另作他用。",
        "鍋に取り分けたストック250mlすべて、薄口しょうゆ25ml、砂糖8g、エシャロット油45mlのうち15mlを入れます。蓋をせず、時々混ぜながら目安8〜10分煮て、つやが出て約180mlになるまで煮詰めます。時間と仕上がり量は食感の目安で、安全基準ではありません。たれは丼1杯につき約45ml取り分けます。残りの油30mlから24mlを使い、4杯に6mlずつかけます。最後の6mlはたれの調整または別用途に取っておきます。",
        "냄비에 덜어 둔 육수 250ml 전량, 양조간장 25ml, 설탕 8g, 샬롯 오일 45ml 중 15ml를 넣는다. 뚜껑을 열고 가끔 저으며 약 8–10분 졸여 윤기가 나고 약 180ml가 남도록 한다. 졸이는 시간과 양은 식감 추정치이지 안전 기준이 아니다. 한 그릇당 소스 약 45ml를 남긴다. 남은 오일 30ml 중 24ml를 써 네 그릇에 6ml씩 두르고, 마지막 6ml는 소스 농도 조절이나 다른 용도로 둔다.",
        "ใส่น้ำต้มที่แบ่งไว้ 250 มล.ทั้งหมด ซีอิ๊วขาว 25 มล. น้ำตาล 8 กรัม และน้ำมันหอมเจียว 15 มล.จากทั้งหมด 45 มล.ลงหม้อ เคี่ยวเปิดฝาประมาณ 8–10 นาที คนเป็นครั้งคราวจนมันวาวและเหลือประมาณ 180 มล. เวลาและปริมาตรเป็นค่าประมาณด้านเนื้อสัมผัส ไม่ใช่เกณฑ์ความปลอดภัย ตักเกรวีประมาณ 45 มล.ต่อชาม ใช้น้ำมันที่เหลือ 30 มล.จำนวน 24 มล.ราดชามละ 6 มล.และเก็บอีก 6 มล.ไว้ปรับเกรวีหรือใช้อย่างอื่น"
      )
    ],
    [
      ml("Warm the turkey without drying it", "溫熱火雞肉絲並保留肉汁", "七面鳥を乾かさずに温める", "칠면조 살을 마르지 않게 데운다", "อุ่นเนื้อไก่งวงโดยไม่ให้แห้ง"),
      ml(
        "Just before serving, put all freshly poached shredded turkey in a small pan with the 30 ml stock already assigned to the meat. Cover and warm over low heat for 2–3 minutes until steaming; it is already cooked to the poultry safety endpoint, so this short time is for serving texture. If the turkey was cooked and chilled earlier, reheat the centre to 74°C (165°F) as a leftover. Keep raw-meat utensils away from the cooked turkey.",
        "上桌前將剛煮好並撕好的火雞肉全數放入小鍋，加入已分配給肉絲的 30 毫升高湯，加蓋以小火溫熱 2–3 分鐘至冒熱氣；肉已煮達禽肉食安熟度，這段短時間是為了上桌口感。若火雞肉曾先煮好冷藏，回熱剩菜時中心須達 74°C（165°F）。生肉器具不可接觸熟火雞肉。",
        "提供直前に、ゆでた七面鳥の肉をすべて小鍋に入れ、肉用に取り分けたストック30mlを加えます。蓋をして弱火で2〜3分、湯気が出るまで温めます。すでに鶏肉の安全温度に達しているため、この短時間は提供時の食感のためです。先に調理して冷蔵した肉を使う場合は、残り物として中心を74°C（165°F）まで再加熱します。生肉用の器具を使い回さないでください。",
        "내기 직전에 갓 삶아 찢은 칠면조 살 전량과 고기용으로 덜어 둔 육수 30ml를 작은 팬에 넣는다. 뚜껑을 덮고 약불에서 2–3분 김이 날 때까지 데운다. 이미 가금류 안전 온도까지 조리했으므로 이 짧은 시간은 식감을 위한 것이다. 미리 조리해 냉장한 고기를 쓸 경우 남은 음식 기준으로 중심이 74°C (165°F)에 도달하도록 다시 데운다. 생고기 도구를 익힌 고기에 쓰지 않는다.",
        "ก่อนเสิร์ฟ ใส่เนื้อไก่งวงที่ต้มและฉีกใหม่ทั้งหมดกับน้ำต้ม 30 มล.ที่แบ่งไว้สำหรับเนื้อลงกระทะเล็ก ปิดฝาและอุ่นไฟอ่อน 2–3 นาทีจนมีไอ เนื้อสุกถึงเกณฑ์สัตว์ปีกแล้ว เวลาสั้นนี้มีไว้รักษาเนื้อสัมผัสขณะเสิร์ฟ หากใช้เนื้อที่ปรุงและแช่เย็นไว้ก่อน ให้อุ่นอาหารเหลือจนตรงกลางถึง 74°C (165°F) อย่าใช้เครื่องมือที่สัมผัสเนื้อดิบกับเนื้อสุก"
      )
    ],
    [
      ml("Assemble four bowls and serve fresh rice", "組成四碗並搭配現煮白飯", "4人分を盛り、炊きたてのご飯を添える", "네 그릇에 담고 갓 지은 밥을 곁들인다", "จัด 4 ชามและเสิร์ฟกับข้าวสวยร้อน"),
      ml(
        "Time the 800 g hot cooked rice to finish close to serving; divide it into four bowls, 200 g each. Divide all turkey evenly, spoon about 45 ml gravy over each bowl, drizzle 6 ml shallot oil per bowl, and use all 80 g pickled radish and all crisp shallots across the four bowls. Serve while the rice is hot. For any leftover rice, follow the rice-specific card below rather than leaving it in a cooker or pan to cool.",
        "安排 800 公克熱飯接近上桌時煮好，分成四碗，每碗 200 公克。火雞肉平均分配，每碗淋約 45 毫升醬汁及 6 毫升紅蔥油，並將全部 80 公克醃蘿蔔與炸紅蔥頭分到四碗。趁飯熱上桌。若有剩飯，依下方米飯專用保存卡處理，不要留在電鍋或鍋中慢慢冷卻。",
        "熱い炊きたてご飯800gを提供直前に4等分し、1杯200gにします。七面鳥を均等に分け、各丼にたれ約45mlとエシャロット油6mlをかけます。たくあん80gすべてと揚げエシャロットすべてを4杯に分けます。ご飯が熱いうちに提供します。残りのご飯は下記の米専用保存案内に従い、炊飯器や鍋の中で冷まさないでください。",
        "뜨거운 밥 800g은 서빙 직전에 완성되도록 하고 네 그릇에 200g씩 나눈다. 칠면조를 고르게 나누고 각 그릇에 소스 약 45ml, 샬롯 오일 6ml를 두른다. 단무지 80g 전량과 튀긴 샬롯 전량을 네 그릇에 나눈다. 밥이 뜨거울 때 낸다. 남은 밥은 아래 쌀 전용 보관 지침을 따르고 밥솥이나 냄비에서 식히지 않는다.",
        "หุงข้าวสุกพร้อมกิน 800 กรัมให้เสร็จใกล้เวลาเสิร์ฟ แบ่ง 4 ชาม ชามละ 200 กรัม แบ่งไก่งวงเท่า ๆ กัน ราดเกรวีประมาณ 45 มล.และน้ำมันหอมเจียว 6 มล.ต่อชาม ใช้หัวไชเท้าดองทั้งหมด 80 กรัมและหอมเจียวทั้งหมดแบ่งให้ครบ 4 ชาม เสิร์ฟขณะข้าวร้อน หากมีข้าวเหลือให้ทำตามคำแนะนำเฉพาะข้าวด้านล่าง อย่าปล่อยให้เย็นในหม้อหุงข้าวหรือหม้อ"
      )
    ]
  ]);

  recipe.storage = ml(
    "Because this bowl contains cooked rice, divide leftovers into small shallow containers and cool as quickly as possible, ideally refrigerating within 1 hour at 4°C (40°F) or below. Keep refrigerated and eat within 24 hours; reheat rice only once, until steaming hot throughout. Reheat the turkey in the same portion to 74°C (165°F) as the official leftover endpoint. The rice-specific 1-hour/24-hour/one-reheat advice is a safety rule; poultry stored without rice follows the general 3–4-day leftover chart.",
    "這道飯含熟米，剩菜應分裝小份淺盒並盡快冷卻，最好於 1 小時內冷藏在 4°C（40°F）以下。持續冷藏並於 24 小時內食用；米飯只回熱一次，直到各處冒熱氣。火雞肉隨同該份餐點回熱至官方剩食標準 74°C（165°F）。米飯專用的 1 小時／24 小時／僅回熱一次是食安規則；不與米飯同存的禽肉依一般熟禽剩食 3–4 天指引。",
    "炊いた米を含むため、残りは小分けして浅い容器に入れ、できるだけ早く冷まし、できれば1時間以内に4°C（40°F）以下で冷蔵します。冷蔵を保ち、24時間以内に食べます。ご飯の再加熱は1回だけ、全体から湯気が出るまで行います。同じ分量の七面鳥は、残り物の公式基準74°C（165°F）まで再加熱します。米の1時間・24時間・1回再加熱は安全指針です。米と分けた鶏肉は一般の調理済み鶏肉の3〜4日保存案内に従います。",
    "이 음식에는 지은 쌀이 들어 있으므로 남은 것은 작은 얕은 용기에 나눠 최대한 빨리 식히고 가능하면 1시간 안에 4°C (40°F) 이하로 냉장한다. 계속 냉장하고 24시간 안에 먹는다. 밥은 김이 전체에서 날 때까지 한 번만 다시 데운다. 칠면조도 같은 분량으로 함께 데워 공식 남은 음식 기준인 74°C (165°F)에 맞춘다. 쌀의 1시간·24시간·1회 재가열은 안전 지침이며, 밥과 따로 보관한 가금류는 일반 조리 가금류 남은 음식 3–4일 기준을 따른다.",
    "เพราะชามนี้มีข้าวสุก ให้แบ่งอาหารเหลือเป็นส่วนเล็ก ๆ ในภาชนะตื้นและทำให้เย็นเร็วที่สุด โดยแช่เย็นภายใน 1 ชั่วโมงหากทำได้ที่ 4°C (40°F) หรือต่ำกว่า เก็บในตู้เย็นและกินภายใน 24 ชั่วโมง อุ่นข้าวซ้ำได้ครั้งเดียวจนมีไอทั่วถึง อุ่นไก่งวงในส่วนเดียวกันให้ถึงเกณฑ์ทางการของอาหารเหลือที่ 74°C (165°F) คำแนะนำข้าว 1 ชั่วโมง/24 ชั่วโมง/อุ่นครั้งเดียวเป็นข้อกำหนดด้านความปลอดภัย ส่วนสัตว์ปีกที่เก็บแยกจากข้าวให้ทำตามคำแนะนำอาหารเหลือทั่วไป 3–4 วัน"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (poultry and leftovers)", temperatures);
  addOfficial(recipe, "UK Food Standards Agency: Home Food Fact Checker (cooked-rice cooling, 24-hour storage, and one reheating)", rice);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (prompt chilling and shallow containers)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (cooked poultry)", storage);
}

function reviseBanhXeo(recipe) {
  recipe.prepMinutes = 40;
  recipe.cookMinutes = 55;
  recipe.totalMinutes = 95;
  ingredient(recipe, "pork shoulder", "250 g", ml(
    "pork shoulder, unground, in 2.5 cm thick steaks; slice thinly after cooking and resting",
    "未絞碎豬肩肉，切成 2.5 公分厚肉排；煮熟靜置後再切薄片",
    "未挽きの豚肩肉、厚さ2.5cmのステーキ状。加熱して休ませた後に薄切りにする",
    "다지지 않은 돼지 어깨살, 2.5cm 두께 스테이크로 익히고 쉰 뒤 얇게 썬다",
    "หมูส่วนไหล่ไม่บด หั่นเป็นสเต๊กหนา 2.5 ซม. ปรุงและพักแล้วค่อยหั่นบาง"
  ));

  setMethod(recipe, [
    [
      ml("Rest and portion the batter", "靜置麵糊並分配用量", "生地を休ませ、使う量を決める", "반죽을 휴지시키고 분량을 나눈다", "พักแป้งและแบ่งสัดส่วน"),
      ml(
        "Whisk 180 g rice flour, 45 g cornstarch, 2 g turmeric, 3 g salt, 150 ml coconut milk, and exactly 350 ml of the listed water until smooth; keep the other 100 ml for the dip. Rest 30 minutes, then stir in all 30 g scallions. Stir from the bottom before every pour because rice flour settles. The 40-minute prep includes this rest and about 10 minutes of active measuring and cutting.",
        "將 180 公克米粉、45 公克玉米澱粉、2 公克薑黃、3 公克鹽、150 毫升椰奶及清單中恰好 350 毫升水攪勻；另 100 毫升留作沾醬。靜置 30 分鐘後拌入全部 30 公克青蔥。每次舀麵糊前都從底部攪起，因米粉會沉澱。備料 40 分鐘包含這段靜置及約 10 分鐘切料、量取時間。",
        "米粉180g、コーンスターチ45g、ターメリック2g、塩3g、ココナッツミルク150ml、表示した水のうち350mlを滑らかになるまで混ぜます。残りの水100mlはたれ用です。30分休ませ、青ねぎ30gすべてを混ぜます。米粉が沈むため、注ぐ前に毎回底から混ぜます。準備40分には休ませる30分と、計量・切る作業約10分が含まれます。",
        "쌀가루 180g, 옥수수전분 45g, 강황 2g, 소금 3g, 코코넛밀크 150ml, 표시된 물 중 정확히 350ml를 부드럽게 섞고 나머지 100ml는 소스용으로 둔다. 30분 휴지한 뒤 쪽파 30g 전량을 섞는다. 쌀가루가 가라앉으므로 부을 때마다 바닥부터 젓는다. 준비 40분에는 휴지 30분과 계량·손질 약 10분이 포함된다.",
        "คนแป้งข้าวเจ้า 180 กรัม แป้งข้าวโพด 45 กรัม ขมิ้น 2 กรัม เกลือ 3 กรัม กะทิ 150 มล. และน้ำตามรายการ 350 มล.ให้เนียน เก็บน้ำอีก 100 มล.ไว้ทำน้ำจิ้ม พัก 30 นาทีแล้วใส่ต้นหอมทั้งหมด 30 กรัม คนจากก้นชามก่อนตักทุกครั้งเพราะแป้งข้าวเจ้าจะตกตะกอน เวลาเตรียม 40 นาทีรวมการพักนี้และเวลาออกแรงประมาณ 10 นาทีสำหรับตวงกับหั่น"
      )
    ],
    [
      ml("Make the dip and prepare separate boards", "調沾醬並分開處理生熟食材", "たれを作り、生・加熱済み食材を分ける", "소스를 만들고 생식재료와 익힌 재료를 분리한다", "ทำน้ำจิ้มและแยกเขียงอาหารดิบกับสุก"),
      ml(
        "Dissolve all 25 g sugar in the reserved 100 ml warm water, then stir in 40 ml of the listed fish sauce, all 40 ml lime juice, 8 g minced garlic, and 5 g chile. Keep the dip covered. Wash and thoroughly dry all 250 g bean sprouts, 250 g lettuce, and 40 g herbs; store them away from raw pork and shrimp. Set out a separate clean plate for cooked filling.",
        "將全部 25 公克糖溶於預留的 100 毫升溫水，再加入清單中 40 毫升魚露、全部 40 毫升萊姆汁、8 公克蒜末及 5 公克辣椒拌勻，加蓋備用。洗淨並徹底擦乾全部 250 公克豆芽、250 公克生菜及 40 公克香草，與生豬肉、生蝦分開。另備乾淨盤子盛放熟餡料。",
        "取り分けた温水100mlに砂糖25gすべてを溶かし、表示した魚醤40ml、ライム汁40mlすべて、刻んだにんにく8g、唐辛子5gを混ぜて蓋をします。もやし250g、レタス250g、ハーブ40gをすべて洗い、十分に乾かし、生の豚肉やえびと離しておきます。加熱済みの具を置く清潔な皿を別に用意します。",
        "덜어 둔 따뜻한 물 100ml에 설탕 25g 전량을 녹이고 표시된 피시소스 40ml, 라임즙 40ml 전량, 다진 마늘 8g, 고추 5g을 섞어 덮어 둔다. 숙주 250g, 양상추 250g, 허브 40g 전량을 씻어 완전히 말리고 생돼지고기·새우와 분리한다. 익힌 속재료를 놓을 깨끗한 접시를 따로 준비한다.",
        "ละลายน้ำตาลทั้งหมด 25 กรัมในน้ำอุ่นที่แบ่งไว้ 100 มล. จากนั้นใส่น้ำปลา 40 มล.ตามรายการ น้ำมะนาวทั้งหมด 40 มล. กระเทียมสับ 8 กรัม และพริก 5 กรัม คนแล้วปิดฝา ล้างและสะเด็ดถั่วงอก 250 กรัม ผักกาดหอม 250 กรัม และสมุนไพร 40 กรัมทั้งหมดให้แห้ง แยกจากหมูกับกุ้งดิบ เตรียมจานสะอาดอีกใบสำหรับอาหารที่ปรุงสุก"
      )
    ],
    [
      ml("Cook the pork and let it rest", "煎熟豬肉並靜置", "豚肉を加熱して休ませる", "돼지고기를 익혀 휴지시킨다", "ปรุงหมูให้สุกแล้วพัก"),
      ml(
        "Heat 10 ml oil in a 28–30 cm skillet over medium-high. Add all 150 g onion and cook for an estimated 2 minutes until softened; transfer it to the clean cooked-food plate. Add the 250 g unground pork shoulder steak in one uncrowded layer with 10 ml fish sauce and all 1 g pepper. Cook for an estimated 8–12 minutes, turning once or twice; begin checking the thickest centre at 8 minutes with a clean thermometer. The applicable official endpoint for this intact pork cut is 63°C (145°F), followed by a 3-minute rest on a clean plate. Continue in 2-minute increments if needed. After the rest, slice the pork thinly across the grain for the crêpes. Pan time and colour are quality cues, not the safety test.",
        "28–30 公分平底鍋以中大火加熱 10 毫升油，將全部 150 公克洋蔥炒約 2 分鐘至軟，移至乾淨熟食盤。放入 250 公克未絞碎豬肩肉排，單層留空，加入 10 毫升魚露及全部 1 公克胡椒。估煎 8–12 分鐘，中途翻面一兩次；第 8 分鐘起用乾淨溫度計測最厚處中心。完整豬肉塊適用的官方熟度為 63°C（145°F），接著在乾淨盤子靜置 3 分鐘。未達時每次續煎 2 分鐘再測。靜置後逆紋切薄片放入煎餅。鍋中時間與顏色是口感線索，不是安全檢查。",
        "28〜30cmのフライパンに油10mlを入れ、中強火で熱します。玉ねぎ150gすべてを目安2分、柔らかくなるまで炒め、清潔な加熱済み食品用の皿に移します。未挽きの豚肩肉ステーキ250gを重ならないように置き、魚醤10ml、こしょう1gすべてを加えます。目安8〜12分、途中で1〜2回返します。8分から清潔な温度計で最も厚い中心を測ります。この未加工の豚肉に適用される公式基準は63°C（145°F）で、その後清潔な皿で3分休ませます。未達なら2分ずつ加熱を続けます。休ませた後、繊維を断つよう薄切りにしてクレープに使います。時間や色は品質の目安で、安全確認ではありません。",
        "28–30cm 팬에 기름 10ml를 두르고 중강불로 달군다. 양파 150g 전량을 약 2분 부드러워질 때까지 볶아 깨끗한 익힌 음식용 접시에 옮긴다. 다지지 않은 돼지 어깨살 스테이크 250g을 겹치지 않게 놓고 피시소스 10ml와 후추 1g 전량을 더한다. 약 8–12분 익히며 한두 번 뒤집고, 8분부터 깨끗한 온도계로 가장 두꺼운 중심을 잰다. 이 통돼지고기에 적용되는 공식 기준은 63°C (145°F)이며, 이후 깨끗한 접시에서 3분 쉰다. 미달이면 2분씩 더 익혀 다시 잰다. 쉰 뒤 결을 가로질러 얇게 썰어 전병에 넣는다. 팬 시간과 색은 식감 기준이지 안전 검사가 아니다.",
        "ตั้งกระทะ 28–30 ซม.ด้วยไฟกลางค่อนแรง ใส่น้ำมัน 10 มล. ผัดหอมหัวใหญ่ทั้งหมด 150 กรัมประมาณ 2 นาทีจนนุ่ม แล้วย้ายลงจานสะอาดสำหรับอาหารสุก ใส่สเต๊กหมูส่วนไหล่ไม่บด 250 กรัมชั้นเดียวไม่ให้แน่น เติมน้ำปลา 10 มล.และพริกไทยทั้งหมด 1 กรัม ปรุงประมาณ 8–12 นาที พลิกหนึ่งหรือสองครั้ง เริ่มใช้เทอร์โมมิเตอร์สะอาดวัดตรงกลางส่วนที่หนาที่สุดเมื่อครบ 8 นาที เกณฑ์ทางการที่ใช้กับหมูชิ้นเต็มนี้คือ 63°C (145°F) จากนั้นพักบนจานสะอาด 3 นาที หากยังไม่ถึงให้ปรุงเพิ่มครั้งละ 2 นาทีแล้ววัดซ้ำ หลังพักให้หั่นขวางแนวเส้นใยเป็นชิ้นบางสำหรับแผ่นแป้ง เวลาในกระทะและสีเป็นสัญญาณด้านคุณภาพ ไม่ใช่การตรวจความปลอดภัย"
      )
    ],
    [
      ml("Cook the shrimp by its shellfish cue", "依蝦類外觀熟度煮熟", "えびは貝類の見た目の目安で火を通す", "새우는 갑각류에 맞는 외관 기준으로 익힌다", "ปรุงกุ้งตามสัญญาณสุกที่ใช้กับกุ้ง"),
      ml(
        "Wipe the skillet clean if it contains raw pork residue, then add 10 ml oil over medium-high heat. Cook all 250 g peeled, deveined shrimp in a single layer for about 1–2 minutes per side, until the flesh is pearly white and opaque throughout. FoodSafety.gov gives shrimp this visual endpoint rather than a numeric temperature; do not transfer the fish temperature or the leftover-reheating temperature to raw shrimp. Move the cooked shrimp to the clean plate and divide it, the rested pork, and the onions into four equal portions: about 62.5 g each of pork and shrimp and 37.5 g onion per crêpe.",
        "若鍋中有生豬肉殘渣先擦淨，再以中大火加入 10 毫升油。將全部 250 公克去殼去腸泥蝦仁單層煎約每面 1–2 分鐘，至蝦肉全身珍珠白且不透明。FoodSafety.gov 對蝦類列的是外觀熟度而非數字溫度；不要把魚類溫度或剩菜回熱溫度套用在生蝦上。熟蝦移到乾淨盤子，與靜置完的豬肉、洋蔥平均分成四份：每張煎餅約 62.5 公克豬肉、62.5 公克蝦及 37.5 公克洋蔥。",
        "生の豚肉の残りがあればフライパンを拭き、中強火で油10mlを熱します。殻と背わたを取ったえび250gすべてを一層に並べ、片面約1〜2分ずつ、身全体が真珠のような白色で不透明になるまで加熱します。FoodSafety.govはえびについて数値温度ではなく見た目の目安を示しています。魚の温度や残り物の再加熱温度を生えびに当てはめないでください。清潔な皿に移し、休ませた豚肉と玉ねぎと合わせて4等分します。1枚あたり豚肉約62.5g、えび約62.5g、玉ねぎ37.5gです。",
        "생돼지고기 잔여물이 있으면 팬을 닦고 중강불에 기름 10ml를 넣는다. 껍질과 내장을 제거한 새우 250g 전량을 한 겹으로 놓고 한 면당 약 1–2분 익혀 살 전체가 진주빛 흰색이고 불투명해지게 한다. FoodSafety.gov는 새우를 숫자 온도가 아닌 이 시각적 기준으로 안내한다. 생새우에 생선 온도나 남은 음식 재가열 온도를 적용하지 않는다. 익힌 새우를 깨끗한 접시에 옮기고 3분 쉰 돼지고기와 양파를 네 몫으로 나눈다. 전병 한 장당 돼지고기 약 62.5g, 새우 62.5g, 양파 37.5g이다.",
        "หากมีกากหมูดิบในกระทะให้เช็ดก่อน แล้วเติมน้ำมัน 10 มล. ตั้งไฟกลางค่อนแรง วางกุ้งปอกเปลือกเอาเส้นดำออกทั้งหมด 250 กรัมชั้นเดียว ปรุงด้านละประมาณ 1–2 นาทีจนเนื้อทั่วทั้งตัวเป็นสีขาวมุกและทึบแสง FoodSafety.gov ให้เกณฑ์กุ้งนี้ด้วยลักษณะภายนอก ไม่ใช่อุณหภูมิตัวเลข อย่านำอุณหภูมิของปลาหรืออาหารเหลือมาใช้กับกุ้งดิบ ย้ายกุ้งที่สุกแล้วลงจานสะอาด แบ่งกุ้ง หมูที่พักแล้ว และหอมหัวใหญ่เป็น 4 ส่วนเท่า ๆ กัน ต่อแผ่นมีหมูประมาณ 62.5 กรัม กุ้ง 62.5 กรัม และหอม 37.5 กรัม"
      )
    ],
    [
      ml("Spread one thin crêpe", "攤開一張薄煎餅", "薄いクレープを一枚広げる", "얇은 전병 한 장을 펼친다", "แผ่แป้งบางหนึ่งแผ่น"),
      ml(
        "Wipe the skillet clean and heat 10 ml oil over medium-high for this crêpe. Stir the batter from the bottom, pour one quarter into the 28–30 cm pan, and tilt it quickly into a thin, even layer. Keep the other batter covered between batches; the quarter measure yields four crêpes.",
        "擦淨平底鍋，以中大火加熱本張煎餅用的 10 毫升油。從麵糊底部攪勻，倒入四分之一，立即轉鍋攤成均勻薄層。批次之間將其餘麵糊加蓋；四分之一份量可做四張煎餅。",
        "フライパンをきれいに拭き、この1枚分の油10mlを中強火で熱します。生地を底から混ぜ、4分の1量を流して素早く傾け、薄く均一に広げます。残りの生地は焼く間、蓋をしておきます。4分の1ずつで4枚できます。",
        "팬을 깨끗이 닦고 이 전병용 기름 10ml를 중강불로 달군다. 반죽을 바닥부터 저어 4분의 1을 붓고 팬을 빠르게 기울여 얇고 고르게 편다. 나머지 반죽은 다음 전병을 부칠 때까지 덮어 둔다. 4분의 1씩 나누면 네 장이 나온다.",
        "เช็ดกระทะให้สะอาด ตั้งน้ำมัน 10 มล.สำหรับแผ่นนี้ด้วยไฟกลางค่อนแรง คนแป้งจากก้นชาม ตักหนึ่งในสี่ลงกระทะแล้วเอียงเร็ว ๆ ให้เป็นแผ่นบางสม่ำเสมอ ปิดฝาแป้งส่วนที่เหลือระหว่างทอด แบ่งหนึ่งในสี่จะได้ทั้งหมด 4 แผ่น"
      )
    ],
    [
      ml("Fill and briefly steam", "放入餡料並短暫加蓋", "具をのせ、短時間蒸し焼きにする", "속을 넣고 잠깐 덮어 익힌다", "ใส่ไส้และปิดฝานึ่งสั้น ๆ"),
      ml(
        "Place one quarter of the cooked pork, shrimp, and onion on one half of the crêpe, then add 50 g sprouts. Cover and cook over medium heat for about 2 minutes, until the batter has set and the sprouts are hot. The fillings were already cooked to their own safety cues; this short covered stage warms the sprouts and sets the shell.",
        "將熟豬肉、蝦及洋蔥各四分之一放在煎餅半邊，再加 50 公克豆芽。轉中火加蓋約 2 分鐘，至麵糊凝固且豆芽熱透。餡料已分別煮至適用的食安熟度；這段短暫加蓋是讓豆芽熱透、煎餅定形。",
        "加熱済みの豚肉、えび、玉ねぎを各4分の1量、クレープの片側にのせ、もやし50gを加えます。中火で約2分蓋をし、生地が固まり、もやしが熱くなるまで蒸し焼きにします。具はそれぞれ適切な安全基準まで加熱済みです。この短い加熱はもやしを温め、生地を固める工程です。",
        "익힌 돼지고기·새우·양파를 각각 4분의 1씩 전병 한쪽에 올리고 숙주 50g을 더한다. 중불에서 약 2분 덮어 반죽이 굳고 숙주가 뜨거워지게 한다. 속재료는 각각 알맞은 안전 기준에 맞춰 이미 익혔다. 이 짧은 덮개 단계는 숙주를 데우고 전병을 굳히기 위한 것이다.",
        "วางหมู กุ้ง และหอมที่ปรุงสุกแล้วอย่างละหนึ่งในสี่ไว้ครึ่งแผ่น เติมถั่วงอก 50 กรัม ปิดฝาและปรุงไฟกลางประมาณ 2 นาทีจนแป้งเซ็ตและถั่วงอกร้อน ไส้ผ่านเกณฑ์ความปลอดภัยของแต่ละชนิดแล้ว ขั้นปิดฝาสั้น ๆ นี้ใช้ทำให้ถั่วงอกร้อนและแผ่นแป้งเซ็ตตัว"
      )
    ],
    [
      ml("Dry the shell, fold, and transfer", "收乾煎餅、對折並移盤", "皮をパリッとさせ、折って皿に移す", "전병을 바삭하게 굽고 접어 옮긴다", "ทำแผ่นให้กรอบ พับ แล้วย้ายจาน"),
      ml(
        "Uncover, lower to medium-low, and cook for 4–6 minutes until steam escapes and the underside is golden and crisp. These are texture cues, not safety readings. Fold the crêpe over the filling without pressing and transfer it to a clean plate.",
        "開蓋轉中小火再煎 4–6 分鐘，讓蒸氣散去、底面呈金黃酥脆。這些是口感指標，不是安全溫度。將煎餅對折包住餡料，不要壓，再移至乾淨盤子。",
        "蓋を外して中弱火にし、4〜6分、蒸気が抜けて底が黄金色でパリッとするまで焼きます。これは食感の目安で、安全温度の確認ではありません。具を押さないように折り、清潔な皿に移します。",
        "뚜껑을 열고 중약불로 낮춰 4–6분 더 구워 수증기가 빠지고 밑면이 노릇하고 바삭해지게 한다. 이는 식감 기준이지 안전 온도 확인이 아니다. 속을 누르지 않게 접어 깨끗한 접시로 옮긴다.",
        "เปิดฝา ลดเป็นไฟกลางอ่อน ทอดต่อ 4–6 นาทีให้ไอน้ำระบายและด้านล่างเป็นสีทองกรอบ นี่เป็นสัญญาณด้านเนื้อสัมผัส ไม่ใช่การวัดความปลอดภัย พับแผ่นคลุมไส้โดยไม่กด แล้ววางบนจานสะอาด"
      )
    ],
    [
      ml("Repeat all four crêpes and serve crisp", "完成四張煎餅並趁酥脆上桌", "4枚を焼き、パリッとしたうちに提供する", "전병 네 장을 완성해 바삭할 때 낸다", "ทอดครบ 4 แผ่นและเสิร์ฟขณะกรอบ"),
      ml(
        "Repeat the spread, fill, and crisp stages three more times, using 10 ml oil and one quarter of the filling for each crêpe: four crêpes total, with about 50 g sprouts per piece. One skillet takes about 32–40 minutes for the four crêpes. Divide all 250 g lettuce and 40 g mint, cilantro, and perilla among four plates, with one quarter of the dip per diner. Serve promptly while crisp. The 55-minute cook field includes the pork and shrimp plus this one-skillet estimate; all listed times are planning and texture estimates, never substitutes for the meat and shrimp safety cues in the earlier steps.",
        "攤麵糊、放餡與收乾三個步驟再重複三次，每張用 10 毫升油及四分之一餡料：共四張，每張約 50 公克豆芽。單鍋煎四張約需 32–40 分鐘。將全部 250 公克生菜及 40 公克薄荷、香菜與紫蘇分成四份，每人搭配四分之一沾醬。趁酥脆盡快上桌。烹煮欄 55 分鐘包含豬肉、蝦及單鍋煎餅估時；所列時間都是安排與口感估值，不能取代前述豬肉和蝦的食安熟度檢查。",
        "生地を広げ、具をのせ、パリッと焼く手順をあと3回繰り返します。各回に油10mlと具の4分の1を使い、計4枚（各もやし約50g）にします。フライパン1つで4枚焼く時間は約32〜40分です。レタス250gすべてとミント、香菜、しそ40gを4人分に分け、たれも1人4分の1ずつ添えます。パリッとしたうちに早めに提供します。調理時間55分には豚肉、えびとこのフライパン1つの目安を含みます。時間は計画と食感の目安で、先の豚肉とえびの安全確認の代わりにはなりません。",
        "반죽을 펴고 속을 넣고 바삭하게 굽는 단계를 세 번 더 반복한다. 매번 기름 10ml와 속재료 4분의 1을 써서 전병 네 장을 완성하고 각 장에 숙주 약 50g을 넣는다. 팬 하나로 네 장을 굽는 데 약 32–40분 걸린다. 양상추 250g 전량과 민트·고수·깻잎 40g을 네 사람 몫으로 나누고 소스도 한 사람당 4분의 1씩 낸다. 바삭할 때 바로 낸다. 조리시간 55분에는 돼지고기, 새우와 팬 하나로 굽는 추정 시간이 포함된다. 표시된 시간은 계획과 식감을 위한 추정치이며 앞 단계의 돼지고기·새우 안전 기준을 대신하지 않는다.",
        "ทำซ้ำขั้นตอนแผ่แป้ง ใส่ไส้ และทอดให้กรอบอีก 3 รอบ ใช้น้ำมัน 10 มล.และไส้หนึ่งในสี่ต่อแผ่น รวม 4 แผ่นและถั่วงอกประมาณ 50 กรัมต่อแผ่น หากใช้กระทะเดียวทอด 4 แผ่นใช้เวลาประมาณ 32–40 นาที แบ่งผักกาดหอม 250 กรัมและสะระแหน่ ผักชี ใบชิโซะ 40 กรัมเป็น 4 ส่วน พร้อมน้ำจิ้มคนละหนึ่งในสี่ เสิร์ฟทันทีขณะกรอบ เวลา 55 นาทีในช่องปรุงรวมการทำหมู กุ้ง และเวลาโดยประมาณสำหรับกระทะเดียว เวลาทั้งหมดเป็นค่าประมาณเพื่อวางแผนและเนื้อสัมผัส ไม่ใช้แทนเกณฑ์ความปลอดภัยของหมูและกุ้งในขั้นก่อนหน้า"
      )
    ]
  ]);

  recipe.storage = ml(
    "Serve freshly cooked crêpes promptly for crispness; this is a quality preference. Keep cooked crêpes and filling separate from fresh greens and dip. Refrigerate cooked crêpes and leftover pork and shrimp filling in shallow containers within 2 hours at 4°C (40°F) or below. FoodSafety.gov does not list a storage duration for cooked shrimp or crêpes; the 2-day window here is for best texture, not an official safety cutoff. Reheat only the amount needed to 74°C (165°F) throughout. Discard any perishable food left out longer than 2 hours.",
    "煎好的薄餅趁酥脆盡快上桌，這是品質偏好。熟薄餅與餡料、生菜及沾醬分開保存。熟薄餅及剩下的豬肉蝦餡放入淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 未列熟蝦或熟薄餅的冷藏期限；本食譜建議 2 天內食用是為了口感，不是官方安全期限。只取要吃的份量回熱至各處達 74°C（165°F）。易腐食物置於室溫超過 2 小時應丟棄。",
    "クレープはパリッとしたうちに早めに提供します。これは品質上の希望です。焼いたクレープと具は、生の野菜やたれと分けて保存します。焼いたクレープと豚肉・えびの残りは浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govは調理済みえびやクレープの保存期間を示していません。ここでの2日以内は食感の目安で、公式の安全期限ではありません。食べる分だけ全体が74°C（165°F）に達するまで温め直します。要冷蔵食品を2時間以上室温に置いた場合は廃棄します。",
    "바삭할 때 바로 내는 것이 좋으며 이는 품질상 권장이다. 익힌 전병과 속재료는 생채소·소스와 분리한다. 익힌 전병과 남은 돼지고기·새우 속재료는 얕은 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov는 익힌 새우나 전병의 보관 기간을 제시하지 않는다. 여기의 2일 권장은 식감 기준이지 공식 안전 기한이 아니다. 먹을 만큼만 전체가 74°C (165°F)에 도달할 때까지 다시 데운다. 상하기 쉬운 음식을 실온에 2시간 넘게 두었다면 버린다.",
    "เสิร์ฟแผ่นที่ทอดใหม่ทันทีเพื่อความกรอบ ซึ่งเป็นความชอบด้านคุณภาพ เก็บแผ่นแป้งและไส้สุกแยกจากผักสดกับน้ำจิ้ม แช่แผ่นแป้งสุกและไส้หมูกุ้งที่เหลือในภาชนะตื้นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า FoodSafety.gov ไม่ระบุระยะเวลาเก็บกุ้งหรือแผ่นแป้งที่ปรุงสุก คำแนะนำ 2 วันในสูตรนี้มีไว้เพื่อเนื้อสัมผัส ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F) หากอาหารเสียง่ายอยู่นอกตู้เย็นเกิน 2 ชั่วโมงให้ทิ้ง"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (whole-cut pork and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (separation and prompt chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (refrigerated temperature)", storage);
}

function revisePolloAllaCacciatora(recipe) {
  recipe.prepMinutes = 20;
  recipe.cookMinutes = 65;
  recipe.totalMinutes = 85;
  ingredient(recipe, "fine salt", null, ml(
    "fine salt, divided: 3 g for the chicken and 2 g for the sauce",
    "細鹽，分次使用：3 公克調味雞肉、2 公克加入醬汁",
    "塩、分けて使用：鶏肉用3g、ソース用2g",
    "고운 소금, 나누어 사용: 닭고기용 3g, 소스용 2g",
    "เกลือละเอียด แบ่งใช้: 3 กรัมสำหรับไก่ และ 2 กรัมสำหรับซอส"
  ));

  setMethod(recipe, [
    [
      ml("Season and brown the chicken", "調味並煎香雞肉", "鶏肉に下味をつけ、焼き色をつける", "닭고기에 밑간하고 노릇하게 굽는다", "ปรุงรสและจี่ไก่ให้เหลือง"),
      ml(
        "Pat all 1.2 kg skin-on, bone-in chicken thighs dry. Season with 3 g of the listed 5 g salt and all 2 g black pepper; reserve the remaining 2 g salt for the sauce. Measure the 150 ml wine, 500 g tomatoes, 120 ml stock, and 25 ml olive oil. Heat all the oil in a wide heavy pan over medium-high; brown the thighs skin-side down for 6–8 minutes, then turn and brown about 2 minutes. If they touch, brown in batches without adding oil. Transfer with clean tongs to a clean plate; the centres are not cooked yet. These are browning estimates, not a poultry safety check.",
        "將全部 1.2 公斤帶皮帶骨雞腿肉擦乾，以清單 5 公克鹽中的 3 公克及全部 2 公克黑胡椒調味；剩下 2 公克鹽留給醬汁。量好 150 毫升葡萄酒、500 公克番茄、120 毫升高湯及 25 毫升橄欖油。厚底寬鍋以中大火加熱全部橄欖油，雞皮朝下煎 6–8 分鐘，再翻面約煎 2 分鐘。若肉塊互相接觸就分批煎，不另加油。用乾淨夾子移至乾淨盤子；此時中心尚未熟。這些是煎上色估時，不是禽肉食安檢查。",
        "皮付き骨付き鶏もも肉1.2kgすべての水気を取り、表示した塩5gのうち3gと黒こしょう2gすべてで下味をつけます。残りの塩2gはソース用に取っておきます。ワイン150ml、トマト500g、ストック120ml、オリーブ油25mlを量ります。厚手の広い鍋で油すべてを中強火で熱し、皮目を下にして6〜8分焼き、返して約2分焼きます。肉が触れる場合は油を足さずに分けて焼きます。清潔なトングで清潔な皿に移します。中心はまだ生です。焼き時間は目安で、鶏肉の安全確認ではありません。",
        "껍질과 뼈가 있는 닭다리살 1.2kg 전량의 물기를 닦는다. 표시된 소금 5g 중 3g과 후추 2g 전량으로 밑간하고 남은 소금 2g은 소스용으로 둔다. 와인 150ml, 토마토 500g, 육수 120ml, 올리브유 25ml를 계량한다. 두꺼운 넓은 팬에서 기름 전량을 중강불로 달구고 닭고기를 껍질 쪽부터 6–8분 굽고 뒤집어 약 2분 더 굽는다. 서로 닿으면 기름을 더하지 말고 나누어 굽는다. 깨끗한 집게로 깨끗한 접시에 옮긴다. 속은 아직 익지 않았다. 이 시간은 갈색 내기 추정치이며 닭고기 안전 확인이 아니다.",
        "ซับน่องไก่ติดหนังติดกระดูกทั้งหมด 1.2 กก.ให้แห้ง ปรุงด้วยเกลือ 3 กรัมจากทั้งหมด 5 กรัมและพริกไทยดำ 2 กรัมทั้งหมด เก็บเกลือ 2 กรัมที่เหลือไว้ใส่ซอส ตวงไวน์ 150 มล. มะเขือเทศ 500 กรัม น้ำสต็อก 120 มล. และน้ำมันมะกอก 25 มล. ตั้งกระทะก้นหนาใบกว้าง ใส่น้ำมันทั้งหมดใช้ไฟกลางค่อนแรง จี่ด้านหนัง 6–8 นาที พลิกแล้วจี่อีกด้านประมาณ 2 นาที หากชิ้นไก่เบียดกันให้แบ่งทำโดยไม่เติมน้ำมัน ใช้คีมสะอาดย้ายลงจานสะอาด ตรงกลางยังไม่สุก เวลานี้เป็นค่าประมาณการทำสี ไม่ใช่การตรวจความปลอดภัยของไก่"
      )
    ],
    [
      ml("Cook the vegetables", "炒軟蔬菜", "野菜を炒める", "채소를 익힌다", "ผัดผักให้นุ่ม"),
      ml(
        "Lower the heat to medium. Add all 150 g onion and 100 g carrot to the pan drippings; scrape the browned fond and cook for an estimated 6–8 minutes until the onion is translucent and the carrot begins to soften. Add all 10 g garlic and 2 g rosemary; stir for 30 seconds until fragrant without browning the garlic.",
        "轉中火，將全部 150 公克洋蔥與 100 公克紅蘿蔔放入鍋中雞油，刮起鍋底焦香並炒約 6–8 分鐘，至洋蔥透明、紅蘿蔔開始變軟。加入全部 10 公克蒜末與 2 公克迷迭香，翻炒 30 秒至出香，不要炒焦蒜頭。",
        "中火に下げ、玉ねぎ150gすべてとにんじん100gを鶏の脂が残る鍋に入れます。鍋底の焼き付きをこそげながら目安6〜8分炒め、玉ねぎが透き通り、にんじんが柔らかくなり始めるまで加熱します。にんにく10gすべてとローズマリー2gを加え、焦がさずに30秒炒めて香りを出します。",
        "중불로 낮춘다. 양파 150g 전량과 당근 100g을 닭고기 기름이 남은 팬에 넣는다. 바닥의 갈색 풍미를 긁으며 약 6–8분 볶아 양파가 투명해지고 당근이 부드러워지기 시작하게 한다. 다진 마늘 10g 전량과 로즈마리 2g을 넣고 태우지 않으면서 30초 향을 낸다.",
        "ลดเป็นไฟกลาง ใส่หอมหัวใหญ่ทั้งหมด 150 กรัมและแครอท 100 กรัมลงในน้ำมันที่เหลือจากไก่ ขูดเศษหอมที่ก้นกระทะและผัดประมาณ 6–8 นาทีจนหอมหัวใหญ่ใสและแครอทเริ่มนุ่ม ใส่กระเทียมทั้งหมด 10 กรัมและโรสแมรี 2 กรัม ผัด 30 วินาทีจนหอมโดยไม่ให้กระเทียมเป็นสีน้ำตาล"
      )
    ],
    [
      ml("Deglaze and add tomato", "以葡萄酒刮鍋並加入番茄", "ワインで鍋底をこそげ、トマトを加える", "와인으로 팬 바닥을 긁고 토마토를 넣는다", "เติมไวน์ขูดก้นกระทะและใส่มะเขือเทศ"),
      ml(
        "Pour in all 150 ml wine and scrape the bottom. Boil for an estimated 3–4 minutes until reduced by about half and the sharp aroma fades; this is a flavor cue, not a guarantee that alcohol has evaporated or a food-safety check. Add all 500 g crushed tomatoes, 120 ml stock, and the reserved 2 g salt. Stir and bring to a gentle simmer.",
        "倒入全部 150 毫升葡萄酒並刮起鍋底，估煮 3–4 分鐘至約減半、刺鼻酒味淡去；這是風味指標，不保證酒精已揮發，也不是食安檢查。加入全部 500 公克番茄碎、120 毫升高湯及預留的 2 公克鹽，攪拌後煮至微滾。",
        "ワイン150mlすべてを注ぎ、鍋底をこそげます。目安3〜4分、量が約半分になり刺激臭が弱まるまで煮ます。これは風味の目安で、アルコールが飛んだ保証や安全確認ではありません。トマト500gすべて、ストック120ml、取っておいた塩2gを加え、混ぜて静かに煮立てます。",
        "와인 150ml 전량을 붓고 팬 바닥을 긁는다. 약 3–4분 끓여 절반 정도로 줄고 톡 쏘는 향이 약해지게 한다. 이는 풍미 기준이지 알코올 증발의 보증이나 안전 확인이 아니다. 토마토 500g 전량, 육수 120ml, 남겨 둔 소금 2g을 넣고 저어 약하게 끓인다.",
        "เทไวน์ทั้งหมด 150 มล.และขูดเศษหอมที่ก้นกระทะ ต้มประมาณ 3–4 นาทีจนเหลือราวครึ่งหนึ่งและกลิ่นฉุนจางลง นี่เป็นเกณฑ์ด้านรสชาติ ไม่ใช่หลักฐานว่าแอลกอฮอล์ระเหยหมดหรือเป็นการตรวจความปลอดภัย ใส่มะเขือเทศบดทั้งหมด 500 กรัม น้ำสต็อก 120 มล. และเกลือ 2 กรัมที่แบ่งไว้ คนให้เข้ากันและต้มอ่อน"
      )
    ],
    [
      ml("Braise gently", "小火燉煮雞肉", "鶏肉を静かに煮込む", "닭고기를 부드럽게 조린다", "ตุ๋นไก่ด้วยไฟอ่อน"),
      ml(
        "Return the chicken and its juices skin-side up, keeping most skin above the sauce. Cover loosely and simmer gently for an estimated 25–30 minutes, turning the pieces once without submerging the skin. Begin checking at the low end of that estimate: insert a clean thermometer into the thickest part of each large thigh without touching bone. All chicken must reach 74°C (165°F). If any piece is below that, continue in 5-minute increments and recheck. Tenderness and the timer are quality cues; 74°C is the poultry safety endpoint.",
        "雞肉連同肉汁放回鍋中，皮面朝上並盡量露在醬汁上方。半掩鍋蓋小火微滾約 25–30 分鐘，中途翻面一次但不要把皮泡在醬裡。估時接近下限時開始檢查：用乾淨溫度計測每塊較大雞腿肉最厚處，避開骨頭。所有雞肉都須達 74°C（165°F）。若有肉塊未達，每次續煮 5 分鐘再測。柔嫩度與計時是口感線索；74°C 才是禽肉食安熟度。",
        "鶏肉と肉汁を戻し、皮目を上にして皮の大半がソースから出るようにします。蓋を少しずらし、目安25〜30分弱く煮ます。途中で一度返しますが、皮をソースに沈めません。目安時間の短い方に近づいたら、骨に触れないよう清潔な温度計で大きなもも肉それぞれの最も厚い部分を測ります。鶏肉はすべて74°C（165°F）に達する必要があります。未達の肉があれば5分ずつ追加して再測定します。柔らかさと時間は食感の目安で、安全基準は鶏肉に適用される74°Cです。",
        "닭고기와 나온 육즙을 껍질 쪽이 위로 오게 되돌리고 껍질 대부분이 소스 위로 나오게 한다. 뚜껑을 느슨하게 덮고 약 25–30분 약불로 끓이며 중간에 한 번 뒤집되 껍질은 잠기지 않게 한다. 추정 시간의 짧은 쪽에 가까워지면 뼈에 닿지 않도록 깨끗한 온도계로 큰 닭다리 조각 각각의 두꺼운 곳을 잰다. 모든 닭고기는 74°C (165°F)에 도달해야 한다. 미달된 조각은 5분씩 더 익혀 다시 잰다. 부드러움과 시간은 식감 기준이고 닭고기 안전 기준은 74°C다.",
        "ใส่ไก่และน้ำจากจานกลับลงหม้อโดยหงายหนังขึ้น ให้หนังส่วนใหญ่อยู่เหนือซอส ปิดฝาแง้มและเคี่ยวไฟอ่อนประมาณ 25–30 นาที กลับชิ้นไก่หนึ่งครั้งโดยไม่จุ่มหนัง เมื่อใกล้ช่วงต้นของเวลาประมาณ ให้เริ่มใช้เทอร์โมมิเตอร์สะอาดวัดส่วนที่หนาที่สุดของน่องชิ้นใหญ่แต่ละชิ้นโดยไม่แตะกระดูก ไก่ทุกชิ้นต้องถึง 74°C (165°F) หากชิ้นใดต่ำกว่าให้เคี่ยวต่อครั้งละ 5 นาทีแล้ววัดซ้ำ ความนุ่มและเวลาเป็นสัญญาณด้านคุณภาพ ส่วน 74°C เป็นเกณฑ์ความปลอดภัยสำหรับไก่"
      )
    ],
    [
      ml("Reduce with olives", "加入橄欖收濃醬汁", "オリーブを加えてソースを煮詰める", "올리브를 넣고 소스를 졸인다", "ใส่มะกอกแล้วเคี่ยวซอสให้ข้น"),
      ml(
        "Add all 80 g pitted olives and simmer uncovered for an estimated 8–10 minutes until the sauce coats the back of a spoon. This is a texture estimate, not a safety endpoint. Remove rosemary stems and rest off heat for 5 minutes. Divide all chicken and sauce among four plates, about 300 g raw-chicken equivalent per serving. The 65-minute cook field is a planning value based on these stages after the pan heats; thermometer checks may add time.",
        "加入全部 80 公克去核橄欖，開蓋估煮 8–10 分鐘至醬汁能薄薄附著湯匙背面。這是口感估時，不是食安熟度。取出迷迭香梗，離火靜置 5 分鐘。將全部雞肉及醬汁分成四盤，每份約相當於 300 公克生雞肉。食譜欄的 65 分鐘是鍋子加熱後依這些步驟估算的安排時間；溫度計檢查可能讓時間延長。",
        "オリーブ80gすべてを加え、蓋を外して目安8〜10分、ソースがスプーンの背に薄く絡むまで煮ます。これは食感の目安で、安全確認ではありません。ローズマリーの枝を取り除き、火を止めて5分休ませます。鶏肉とソースすべてを4皿に分け、1人分は生鶏肉換算で約300gです。鍋が温まってからの65分という調理欄は、これらの工程に基づく計画値です。温度確認で長くなる場合があります。",
        "올리브 80g 전량을 넣고 뚜껑을 열어 약 8–10분 졸여 소스가 숟가락 뒷면에 얇게 묻게 한다. 이는 식감 추정치이며 안전 기준이 아니다. 로즈마리 줄기를 건지고 불을 끈 뒤 5분 둔다. 닭고기와 소스 전체를 네 접시에 나누며 1인분은 생닭 약 300g에 해당한다. 조리시간 65분은 팬이 달궈진 뒤 이 단계들을 기준으로 한 계획용 값이며 온도계 확인으로 더 걸릴 수 있다.",
        "ใส่มะกอกเอาเมล็ดออกทั้งหมด 80 กรัม เคี่ยวเปิดฝาประมาณ 8–10 นาทีจนซอสเคลือบหลังช้อนได้ นี่เป็นค่าประมาณด้านเนื้อสัมผัส ไม่ใช่เกณฑ์ความปลอดภัย ปิดไฟ เอาก้านโรสแมรีออกและพัก 5 นาที แบ่งไก่และซอสทั้งหมดเป็น 4 จาน แต่ละที่เทียบเท่าไก่ดิบประมาณ 300 กรัม เวลา 65 นาทีในช่องปรุงเป็นค่าที่ใช้วางแผนตามขั้นตอนเหล่านี้หลังตั้งกระทะให้ร้อน การตรวจด้วยเทอร์โมมิเตอร์อาจทำให้ใช้เวลานานขึ้น"
      )
    ]
  ]);

  recipe.storage = ml(
    "Cool leftovers in shallow containers and refrigerate within 2 hours at 4°C (40°F) or below. FoodSafety.gov lists cooked meat and poultry leftovers for 3–4 days. Reheat only the portion needed to 74°C (165°F) throughout. The braise and sauce may be prepared ahead; the 25–30-minute covered stage and 8–10-minute reduction are estimates for tenderness and texture, while the thermometer endpoint is the safety check.",
    "剩菜分裝淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 對熟肉與熟禽剩菜列出的冷藏期為 3–4 天。只取要吃的份量回熱至各處達 74°C（165°F）。燉肉與醬汁可預先做好；加蓋 25–30 分鐘與收汁 8–10 分鐘是柔嫩度與口感估時，溫度計熟度才是食安檢查。",
    "残りは浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govの目安では、調理済み肉・鶏肉の残りは3〜4日保存できます。食べる分だけ全体が74°C（165°F）に達するまで温め直します。煮込みとソースは作り置きできます。蓋をした25〜30分と煮詰める8〜10分は柔らかさや食感の目安で、安全確認は温度計で行います。",
    "남은 음식은 얕은 용기에 나눠 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov는 조리한 고기와 가금류 남은 음식을 3–4일 보관하도록 안내한다. 먹을 만큼만 덜어 전체가 74°C (165°F)에 도달하도록 다시 데운다. 조림과 소스는 미리 만들 수 있다. 뚜껑을 덮은 25–30분과 소스를 졸이는 8–10분은 부드러움과 식감의 추정치이며 안전 확인은 온도계로 한다.",
    "อาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า FoodSafety.gov ระบุว่าอาหารเหลือประเภทเนื้อและสัตว์ปีกที่ปรุงสุกเก็บได้ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F) สามารถทำไก่ตุ๋นและซอสล่วงหน้าได้ เวลา 25–30 นาทีที่ปิดฝาและ 8–10 นาทีที่เคี่ยวซอสเป็นค่าประมาณด้านความนุ่มและเนื้อสัมผัส ส่วนเทอร์โมมิเตอร์ใช้ตรวจความปลอดภัย"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (all poultry cuts and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (raw poultry separation and prompt chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (cooked meat and poultry)", storage);
}

export function refineFiftyFifthMethods(recipes) {
  const revisions = new Map([
    ["three-cup-chicken", reviseThreeCupChicken],
    ["chiayi-turkey-rice", reviseChiayiTurkeyRice],
    ["banh-xeo", reviseBanhXeo],
    ["pollo-alla-cacciatora", revisePolloAllaCacciatora]
  ]);

  for (const [id, revise] of revisions) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error(`${id}: missing published recipe for fifty-fifth method review`);
    recipes[index] = cloneForPublication(recipes[index]);
    revise(recipes[index]);
    for (const locale of ["en", "zh-hant", "ja", "ko", "th"]) {
      if (!recipes[index].storage?.[locale]) throw new Error(`${id}: missing ${locale} storage card`);
      if (!recipes[index].ingredients.every((row) => row.item?.[locale])) throw new Error(`${id}: missing ${locale} ingredient text`);
      if (!recipes[index].instructions.every((entry) => entry.title?.[locale] && entry.body?.[locale])) {
        throw new Error(`${id}: incomplete ${locale} method after refinement`);
      }
    }
  }
}
