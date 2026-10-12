const localeKeys = ["en", "zh-hant", "ja", "ko", "th"];
const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, item: { ...row.item } })),
    instructions: recipe.instructions.map((step) => ({ ...step })),
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function addOfficial(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) recipe.sources.push({ title, url });
}

function setStep(recipe, index, titles, bodies) {
  const step = recipe.instructions[index];
  if (!step) throw new Error(`${recipe.id}: missing method step ${index + 1}`);
  step.title = ml(...titles);
  step.body = ml(...bodies);
}

function setStorage(recipe, values) {
  recipe.storage = ml(...values);
}

function reviseTaiwanesePopcornChicken(recipe) {
  const basil = recipe.ingredients.find((row) => row.item.en.startsWith("dry Taiwan basil leaves"));
  if (!basil) throw new Error("taiwanese-popcorn-chicken: missing basil ingredient");
  basil.item = ml(
    "fresh Taiwanese basil leaves, washed and completely dried",
    "新鮮台灣九層塔葉，洗淨並徹底擦乾",
    "台湾バジルの生葉、洗って完全に乾かす",
    "생 대만 바질 잎, 씻어 완전히 말리기",
    "ใบโหระพาไต้หวันสด ล้างและซับให้แห้งสนิท"
  );
  setStep(recipe, 1,
    ["Press on the first starch coat", "壓上第一層地瓜粉", "最初のでんぷん衣を付ける", "첫 전분옷 누르기", "กดแป้งชั้นแรก"],
    [
      "Spread the listed 180 g coarse sweet potato starch in a wide tray, using only what is needed to coat. Press each drained chicken piece into it separately on every face, turn, and press again; never toss a wet pile together. Discard starch that has touched raw chicken.",
      "將列出的 180 公克粗粒地瓜粉鋪在寬盤，只取足以裹雞的用量。瀝乾雞塊逐塊放入，每面壓粉、翻面再壓；不可把濕雞肉堆一起拌。接觸過生雞肉的粉要丟棄。",
      "記載の粗いさつまいもでんぷん180gを広い皿に広げ、衣に必要な分だけ使う。汁気を切った鶏肉を一切れずつ全体に押し付け、裏返してもう一度押す。濡れた鶏肉をまとめて混ぜず、生肉に触れたでんぷんは捨てる。",
      "표기된 굵은 고구마 전분 180g을 넓은 쟁반에 펴고 필요한 만큼만 씁니다. 물기를 뺀 닭을 한 조각씩 모든 면에 눌러 묻히고 뒤집어 다시 누릅니다. 젖은 닭을 한꺼번에 섞지 말고 생닭에 닿은 전분은 버립니다.",
      "เกลี่ยแป้งมันหวานเม็ดหยาบ 180 กรัมตามรายการบนถาดกว้าง ใช้เท่าที่ต้องใช้คลุกไก่ กดไก่ที่สะเด็ดทีละชิ้นให้ทั่วทุกด้าน พลิกแล้วกดอีกครั้ง อย่าคลุกไก่เปียกเป็นกอง และทิ้งแป้งที่สัมผัสไก่ดิบ"
    ]);
  setStep(recipe, 3,
    ["Heat oil safely", "安全加熱炸油", "油を安全に熱する", "기름 안전하게 데우기", "อุ่นน้ำมันอย่างปลอดภัย"],
    [
      "Use a heavy wok or pot that will stay less than half full; 1.5 L is the listed supply, not a requirement to pour it all in. Heat enough oil to 175°C, a recipe-selected frying target rather than a food-safety endpoint. Keep a lid and thermometer nearby, wash the fresh 25 g basil, dry it completely, and never add wet leaves to hot oil.",
      "使用厚重炒鍋或深鍋，油面不得超過鍋身一半；1.5 公升是備用量，不代表必須全倒入。炸油加熱到 175°C，這是本食譜選用的炸製目標，不是食安熟度標準。旁備鍋蓋與溫度計；25 公克九層塔須完全擦乾，濕葉不可下熱油。",
      "油が鍋の半分未満に収まる厚手の中華鍋または深鍋を使います。1.5Lは用意量で、全量を入れる必要はありません。油を175°Cまで熱します。この温度はレシピ上の揚げ始めの目安で、食の安全を判定する温度ではありません。ふたと温度計を用意し、バジル25gを完全に乾かしてから揚げます。濡れた葉は熱い油に入れません。",
      "기름이 냄비 절반 아래에 머무는 두꺼운 웍이나 냄비를 씁니다. 1.5L는 준비량이며 전부 부을 필요는 없습니다. 기름을 175°C로 데우세요. 이 온도는 레시피에서 정한 튀김 기준이지 식품 안전을 판정하는 온도가 아닙니다. 뚜껑과 온도계를 가까이 두고 바질 25g을 완전히 말립니다. 젖은 잎은 뜨거운 기름에 넣지 마세요.",
      "ใช้กระทะจีนหรือหม้อก้นหนาที่น้ำมันสูงไม่ถึงครึ่งภาชนะ น้ำมัน 1.5 ลิตรเป็นปริมาณที่เตรียมไว้ ไม่จำเป็นต้องเททั้งหมด อุ่นน้ำมันถึง 175°C ซึ่งเป็นอุณหภูมิทอดที่สูตรเลือก ไม่ใช่เกณฑ์ตัดสินความปลอดภัย เตรียมฝาหม้อและเทอร์โมมิเตอร์ ซับโหระพา 25 กรัมให้แห้งสนิท ห้ามใส่ใบเปียกลงในน้ำมันร้อน"
    ]);
  setStep(recipe, 4,
    ["Fry in small batches and verify the centre", "分批油炸並確認中心熟度", "少量ずつ揚げて中心温度を確認する", "나눠 튀기고 중심 온도 확인하기", "ทอดเป็นชุดและตรวจอุณหภูมิด้านใน"],
    [
      "Divide the 700 g raw chicken into three frying batches of about 233 g each; across four servings that is about 175 g raw chicken per diner. Fry each batch for an estimated 3½–4½ minutes, stirring only after the coating sets and keeping oil at 165–175°C. Time and colour are starting estimates; check the thickest piece away from bone with a thermometer. Remove only at 74°C (165°F); if low, fry in 30-second increments and recheck.",
      "將 700 公克生雞肉分成三批油炸，每批約 233 公克；四人分食時，每人約分到相當於 175 公克生雞肉的份量。每批預估炸 3½–4½ 分鐘，外衣定型後再翻動，油溫維持 165–175°C。時間與顏色只是起始估算；用溫度計測最厚、避開骨頭處，達 74°C（165°F）才撈起；未達就每次續炸 30 秒再測。",
      "生の鶏肉700gを約233gずつ3回に分けて揚げます。4人分に盛ると、1人あたり生鶏肉換算で約175gです。各回の揚げ時間は3分半〜4分半を目安とし、衣が固まってから返し、油を165〜175°Cに保ちます。時間と色は開始時の目安です。骨を避けて最も厚い部分を測り、74°C（165°F）に達したものだけ取り出します。未達なら30秒ずつ揚げて再測定します。",
      "생닭 700g을 약 233g씩 세 번에 나눠 튀깁니다. 네 인분으로 나누면 1인당 생닭 약 175g 분량입니다. 각 배치는 3분 30초~4분 30초를 시작 추정치로 튀기고, 튀김옷이 굳은 뒤에만 저으며 기름은 165~175°C로 유지합니다. 시간과 색은 시작 추정치입니다. 뼈를 피해 가장 두꺼운 곳을 재고 74°C(165°F)에 도달한 것만 건집니다. 낮으면 30초씩 더 튀기고 다시 잽니다.",
      "แบ่งไก่ดิบ 700 กรัมทอด 3 รอบ รอบละประมาณ 233 กรัม เมื่อนำมาแบ่ง 4 ที่จะเทียบเท่าไก่ดิบประมาณ 175 กรัมต่อคน ทอดรอบละประมาณ 3½–4½ นาที โดยให้แป้งเซ็ตก่อนค่อยคน และรักษาน้ำมันที่ 165–175°C เวลาและสีเป็นเพียงค่าประมาณเริ่มต้น ใช้เทอร์โมมิเตอร์วัดส่วนที่หนาที่สุดโดยไม่โดนกระดูก ยกขึ้นเมื่อถึง 74°C (165°F) เท่านั้น หากยังต่ำให้ทอดเพิ่มครั้งละ 30 วินาทีแล้วตรวจซ้ำ"
    ]);
  setStep(recipe, 5,
    ["Flash-fry the basil", "快速炸九層塔", "バジルをさっと揚げる", "바질 빠르게 튀기기", "ทอดโหระพาอย่างรวดเร็ว"],
    [
      "Let the oil return to 175°C. Divide the 25 g fresh, washed, thoroughly dried basil leaves into two or three small handfuls; lower each in a long-handled mesh strainer under a splatter screen for an estimated 8–12 seconds, until crisp and vivid green. Lift each handful at once and drain.",
      "讓油溫回到 175°C。將 25 公克洗淨並徹底擦乾的新鮮九層塔葉分成兩至三小把，放入長柄網勺並用防噴網遮擋，每把預估炸 8–12 秒至酥脆翠綠；立刻撈起瀝油。",
      "油を175°Cに戻します。洗って完全に乾かした生の台湾バジル25gを2〜3回に分け、長柄の網に入れて油はね防止網の下で、カリッと鮮やかな緑色になるまで各回8〜12秒を目安に揚げ、すぐに引き上げて油を切ります。",
      "기름을 175°C로 다시 올립니다. 씻어 완전히 말린 생 대만 바질 잎 25g을 두세 번으로 나눠 긴 손잡이 망에 담고 튐 방지망 아래에서 한 번에 8~12초 정도 바삭하고 선명한 초록색이 될 때까지 튀긴 뒤 즉시 건져 기름을 뺍니다.",
      "ให้น้ำมันกลับถึง 175°C แบ่งใบโหระพาไต้หวันสด 25 กรัมที่ล้างและซับแห้งสนิทเป็น 2–3 กำมือเล็ก ใส่ตะแกรงด้ามยาวทอดใต้ตะแกรงกันกระเด็นรอบละประมาณ 8–12 วินาทีจนกรอบเขียวสด แล้วยกขึ้นสะเด็ดทันที"
    ]);
  setStorage(recipe, [
    "Best eaten immediately. If saved, refrigerate in a shallow covered container within 2 hours at 4°C or below. FoodSafety.gov allows cooked leftovers 3–4 days; this recipe recommends 1 day as a conservative crispness-quality choice, not an official safety limit. Reheat only the portion needed in a 190°C oven until the thickest chicken piece reaches 74°C; the crust will soften.",
    "最好現炸現吃。若保存，2 小時內分裝淺盒加蓋，冷藏於 4°C 以下。FoodSafety.gov 對熟剩菜的官方冷藏期限為 3–4 天；本食譜為保留酥度，保守建議 1 天內食用，這是品質選擇而非官方食安期限。只取需要的份量，以 190°C 烤箱回熱至最厚雞塊中心達 74°C；外皮仍會變軟。",
    "揚げたてが最良です。保存する場合は2時間以内に浅いふた付き容器に入れ、4°C以下で冷蔵します。FoodSafety.govの公式な調理済み残り物の冷蔵目安は3〜4日です。このレシピでは食感を優先し、公式の安全期限ではなく品質上の保守的な選択として1日以内を勧めます。食べる分だけ190°Cのオーブンで、最も厚い鶏肉が74°Cになるまで温め直します。衣は柔らかくなります。",
    "바로 먹는 것이 가장 좋습니다. 남기면 2시간 안에 얕은 밀폐 용기에 담아 4°C 이하로 냉장합니다. FoodSafety.gov의 공식 조리 식품 냉장 기간은 3~4일입니다. 이 레시피는 바삭한 식감을 위한 보수적 품질 선택으로 1일 이내 섭취를 권하며, 이는 공식 안전 기한이 아닙니다. 먹을 만큼만 190°C 오븐에서 가장 두꺼운 닭 조각이 74°C가 될 때까지 데우세요. 튀김옷은 부드러워집니다.",
    "ควรกินทันที หากเก็บ ให้ใส่ภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C หรือต่ำกว่า FoodSafety.gov ระบุว่าอาหารสุกแช่เย็นได้ 3–4 วัน สูตรนี้แนะนำให้กินภายใน 1 วันเพื่อรักษาความกรอบ เป็นการเลือกเผื่อด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ อุ่นเฉพาะส่วนที่จะกินในเตา 190°C จนชิ้นไก่ที่หนาที่สุดถึง 74°C เปลือกจะนุ่มลง"
  ]);
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures (poultry and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: 4 Steps to Food Safety", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Cold Food Storage Charts", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts");
}

function reviseRajma(recipe) {
  recipe.prepMinutes = 750;
  recipe.cookMinutes = 145;
  recipe.totalMinutes = 895;
  const water = recipe.ingredients.find((row) => row.item.en.startsWith("water for pressure cooking"));
  if (!water) throw new Error("rajma-masala: missing bean water ingredient");
  water.amount = "1.5 L + 3 L";
  water.item = ml(
    "cool water for soaking (discard) + fresh water for boiling (reserve 500 ml)",
    "浸泡用冷水（倒掉）＋汆煮用新水（保留 500 毫升）",
    "浸水用の冷水（捨てる）＋ゆで用の新しい水（500mlを取っておく）",
    "불림용 찬물(버림) + 삶기용 새 물(500ml 남겨 두기)",
    "น้ำเย็นสำหรับแช่ (ทิ้ง) + น้ำใหม่สำหรับต้ม (เก็บไว้ 500 มล.)"
  );
  setStep(recipe, 0,
    ["Soak and inspect the beans", "浸泡並檢查紅腰豆", "豆を浸水して選別する", "콩을 불리고 골라내기", "แช่และตรวจถั่ว"],
    [
      "Rinse 300 g dried red kidney beans and remove stones or damaged beans. Cover with at least 1.5 L cool water for 8–12 hours; this recipe's longer overnight soak is a selected method, while FDA guidance calls for at least 5 hours. Drain, rinse, and discard all soaking water.",
      "沖洗 300 公克乾紅腰豆並挑除石粒或破損豆。加至少 1.5 公升冷水浸泡 8–12 小時；8–12 小時是本食譜選擇的過夜做法，FDA 指引要求至少浸泡 5 小時。瀝乾、沖洗並倒掉全部浸泡水。",
      "乾燥赤インゲン豆300gを洗い、石や傷んだ豆を取り除きます。冷水を少なくとも1.5L注いで8〜12時間浸します。このレシピが選んだ一晩の浸水時間に対し、FDAの案内は最低5時間です。水を切り、洗って浸水液はすべて捨てます。",
      "마른 붉은 강낭콩 300g을 헹구고 돌이나 상한 콩을 골라냅니다. 찬물 1.5L 이상을 붓고 8~12시간 불립니다. 8~12시간은 이 레시피가 선택한 밤새 불림 시간이며 FDA 지침은 최소 5시간입니다. 물을 버리고 헹군 뒤 불림물은 모두 버립니다.",
      "ล้างถั่วแดงแห้ง 300 กรัม คัดหินและเมล็ดเสียออก เติมน้ำเย็นอย่างน้อย 1.5 ลิตร แช่ 8–12 ชั่วโมง ช่วงแช่ค้างคืน 8–12 ชั่วโมงเป็นวิธีที่สูตรเลือก ส่วนคำแนะนำ FDA ระบุอย่างน้อย 5 ชั่วโมง เทน้ำแช่ทิ้ง ล้าง และสะเด็ด"
    ]);
  setStep(recipe, 1,
    ["Boil the soaked beans in fresh water", "用新水煮透浸泡後的豆子", "浸水した豆を新しい水で煮る", "불린 콩을 새 물에 삶기", "ต้มถั่วที่แช่แล้วในน้ำใหม่"],
    [
      "Put the drained beans and 3 L fresh water in a large uncovered pot with 4 g of the salt. Bring to a full rolling boil and keep boiling for 30 minutes, the FDA recommendation for red kidney beans; do not use a slow cooker. Then simmer steadily for an estimated 25–40 minutes until several beans are completely tender with no hard or chalky centre, adding hot water if needed. Keep 500 ml cooking liquid for the gravy and drain the rest.",
      "瀝乾的豆子與 3 公升新水放入大鍋，加入 4 公克鹽，不加蓋煮至大滾並維持 30 分鐘，這是 FDA 對紅腰豆的建議；不可用慢燉鍋。接著穩定小滾，預估再煮 25–40 分鐘，抽查數顆豆子須完全軟透、沒有硬心或粉心；需要時加熱水。保留 500 毫升煮豆水做咖哩汁，其餘瀝掉。",
      "水を切った豆と新しい水3L、塩4gを大きな鍋に入れ、ふたをせず強く沸騰させます。赤インゲン豆についてFDAが示す30分間の煮沸を守り、スロークッカーは使いません。その後、25〜40分を目安に安定した弱い沸騰で煮て、数粒を確認し、硬さや粉っぽい芯がなく完全に柔らかくなるまで続けます。必要なら熱湯を足します。ゆで汁500mlをカレー用に取り、残りは切ります。",
      "물기를 뺀 콩과 새 물 3L, 소금 4g을 큰 냄비에 넣고 뚜껑 없이 팔팔 끓입니다. 붉은 강낭콩에 대한 FDA 권고에 따라 30분 끓이고 슬로쿠커는 사용하지 않습니다. 이후 약 25~40분 안정적으로 약하게 끓이며 여러 알을 확인해 단단하거나 가루 같은 심 없이 완전히 부드러워질 때까지 익힙니다. 필요하면 뜨거운 물을 더합니다. 국물 500ml는 그레이비용으로 남기고 나머지는 따라냅니다.",
      "ใส่ถั่วที่สะเด็ดน้ำกับน้ำใหม่ 3 ลิตรและเกลือ 4 กรัมลงหม้อใหญ่ ต้มเดือดพล่านโดยไม่ปิดฝา 30 นาทีตามคำแนะนำ FDA สำหรับถั่วแดง ห้ามใช้หม้อหุงช้า จากนั้นเคี่ยวเดือดอ่อนคงที่ประมาณ 25–40 นาที ตรวจหลายเมล็ดให้สุกนุ่มทั่ว ไม่มีแกนแข็งหรือร่วน เติมน้ำร้อนหากจำเป็น เก็บน้ำต้มถั่ว 500 มล. ไว้ทำเกรวีและเทส่วนที่เหลือทิ้ง"
    ]);
  setStep(recipe, 2,
    ["Brown the cumin and onion", "炒香孜然與洋蔥", "クミンと玉ねぎを炒める", "큐민과 양파 볶기", "ผัดยี่หร่ากับหอมใหญ่"],
    [
      "Heat all 35 ml oil in a heavy pan over medium heat. Add all 4 g cumin seeds and stir for about 20 seconds until fragrant. Add all 250 g onion and cook 12–15 minutes, stirring and scraping, until deep golden but not burnt.",
      "厚鍋中火加熱全部 35 毫升油，加入全部 4 公克孜然籽翻炒約 20 秒至出香。加入全部 250 公克洋蔥，翻炒並刮鍋 12–15 分鐘，至深金黃但不可焦黑。",
      "厚手鍋に油35mlすべてを中火で熱し、クミンシード4gすべてを加えて香りが立つまで約20秒炒めます。玉ねぎ250gすべてを加え、混ぜながら12〜15分、焦がさず濃いきつね色まで炒めます。",
      "두꺼운 팬에 기름 35ml 전부를 중불로 달굽니다. 큐민씨 4g 전부를 넣고 향이 날 때까지 약 20초 볶습니다. 양파 250g 전부를 넣고 저으며 바닥을 긁어 12~15분 진한 황금색이 되되 타지 않게 볶습니다.",
      "ตั้งกระทะหนาไฟกลาง ใส่น้ำมัน 35 มล. ทั้งหมด เติมเมล็ดยี่หร่า 4 กรัมทั้งหมด ผัดประมาณ 20 วินาทีจนหอม ใส่หอมใหญ่ 250 กรัมทั้งหมด ผัดและขูดก้นกระทะ 12–15 นาทีจนเหลืองทองเข้มแต่ไม่ไหม้"
    ]);
  setStep(recipe, 3,
    ["Cook the tomato-spice masala", "炒熟番茄香料醬", "トマトとスパイスを炒め煮にする", "토마토 향신료 마살라 익히기", "เคี่ยวมาซาลามะเขือเทศกับเครื่องเทศ"],
    [
      "Stir in all 20 g ginger-garlic paste for 1 minute. Add all 350 g tomato puree, 7 g coriander, 4 g Kashmiri chile, 2 g turmeric, and 3 g salt. Cook over medium-low heat for an estimated 12–15 minutes, stirring often, until thick and glossy with no raw-tomato smell or watery ring of oil.",
      "拌入全部 20 公克薑蒜泥炒 1 分鐘。加入全部 350 公克番茄泥、7 公克芫荽粉、4 公克喀什米爾辣椒粉、2 公克薑黃與 3 公克鹽。中小火預估煮 12–15 分鐘並常攪拌，至濃稠油亮、沒有生番茄味或一圈水油。",
      "しょうがにんにくペースト20gすべてを加えて1分炒めます。トマトピューレ350g、コリアンダー7g、カシミールチリ4g、ターメリック2g、塩3gを加えます。中弱火で12〜15分を目安に頻繁に混ぜ、濃く艶が出て生トマトの香りや水っぽい油の輪がなくなるまで煮ます。",
      "생강마늘 페이스트 20g 전부를 넣고 1분 볶습니다. 토마토 퓌레 350g, 고수 가루 7g, 카슈미르 고추 4g, 강황 2g, 소금 3g을 넣습니다. 중약불에서 약 12~15분 자주 저어 생토마토 냄새와 물기 많은 기름 테두리가 사라지고 걸쭉하고 윤기 날 때까지 익힙니다.",
      "ใส่ขิงกระเทียมบด 20 กรัมทั้งหมด ผัด 1 นาที เติมมะเขือเทศบด 350 กรัม ผงผักชี 7 กรัม พริกแคชเมียร์ 4 กรัม ขมิ้น 2 กรัม และเกลือ 3 กรัม เคี่ยวไฟกลางอ่อนประมาณ 12–15 นาที คนบ่อยจนข้นเงา ไม่มีกลิ่นมะเขือเทศดิบหรือวงน้ำมันที่เจือจาง"
    ]);
  setStep(recipe, 4,
    ["Simmer beans in the gravy", "讓豆子在咖哩汁中燉煮", "豆をグレービーで煮込む", "콩을 그레이비에 넣어 끓이기", "เคี่ยวถั่วในเกรวี"],
    [
      "Add the cooked beans and 500 ml reserved cooking liquid. Simmer partly covered for 20 minutes, stirring every 5 minutes. Mash about 80 g beans against the pot and stir them back in; the gravy should thicken but still flow. Add a little hot water only if it becomes pasty.",
      "加入煮熟的豆子與保留的 500 毫升煮豆水，半加蓋小滾 20 分鐘，每 5 分鐘攪一次。取約 80 公克豆子壓碎後拌回；咖哩汁應變濃但仍能流動。只有太稠成糊時才加少量熱水。",
      "ゆでた豆と取っておいたゆで汁500mlを加え、ふたを少しずらして20分煮ます。5分ごとに混ぜ、豆約80gを鍋肌でつぶして戻します。ソースは濃くても流れる状態にし、ペースト状になった場合だけ熱湯を少量加えます。",
      "익힌 콩과 남겨 둔 콩 삶은 물 500ml를 넣습니다. 뚜껑을 약간 열고 20분 끓이며 5분마다 젓습니다. 콩 약 80g을 냄비 옆에서 으깨 다시 넣습니다. 그레이비는 걸쭉하되 흘러야 하며 되직한 반죽처럼 될 때만 뜨거운 물을 조금 넣습니다.",
      "ใส่ถั่วสุกและน้ำต้มถั่วที่เก็บไว้ 500 มล. เคี่ยวโดยแง้มฝา 20 นาที คนทุก 5 นาที บดถั่วประมาณ 80 กรัมกับข้างหม้อแล้วคนกลับ เกรวีควรข้นแต่ยังไหลได้ เติมน้ำร้อนเล็กน้อยเฉพาะเมื่อข้นเป็นเนื้อแป้ง"
    ]);
  setStep(recipe, 5,
    ["Finish the aroma", "完成香料收尾", "香りを仕上げる", "향신료로 마무리하기", "เติมกลิ่นเครื่องเทศขั้นสุดท้าย"],
    [
      "Stir in all 4 g garam masala, all 2 g crushed dried fenugreek leaves, and the remaining 2 g salt. Simmer uncovered for 5 minutes until the gravy coats a spoon but still falls in a slow ribbon; taste before adding anything else.",
      "拌入全部 4 公克 garam masala、全部 2 公克捏碎乾燥葫蘆巴葉與剩下的 2 公克鹽。不加蓋小滾 5 分鐘至醬汁能附著湯匙、但仍慢慢流下；再加其他調味前先試味。",
      "ガラムマサラ4gすべて、砕いた乾燥フェヌグリークの葉2gすべて、残りの塩2gを混ぜます。ふたをせず5分煮て、ソースがスプーンに付く一方でゆっくり流れる濃度にします。追加で調味する前に味見します。",
      "가람 마살라 4g 전부, 부순 말린 페누그릭 잎 2g 전부와 남은 소금 2g을 넣습니다. 뚜껑 없이 5분 끓여 숟가락에 묻되 천천히 흘러내리는 농도로 만듭니다. 더 간하기 전에 맛을 봅니다.",
      "คนการัมมาซาลา 4 กรัมทั้งหมด ใบเฟนูกรีกแห้งบด 2 กรัมทั้งหมด และเกลือ 2 กรัมที่เหลือ เคี่ยวเปิดฝา 5 นาทีจนเกรวีเคลือบช้อนแต่ยังไหลเป็นสายช้า ๆ ชิมก่อนปรุงเพิ่ม"
    ]);
  setStep(recipe, 6,
    ["Rest and portion six servings", "靜置並分成六份", "休ませて6人分に分ける", "잠시 두고 여섯 인분으로 나누기", "พักและแบ่งหกที่"],
    [
      "Turn off the heat, cover, and rest for 15 minutes so the beans finish absorbing the gravy. Divide the curry into six equal bowls and scatter all 20 g chopped cilantro across them (about 3 g each). Rice is not included in this recipe's ingredient list.",
      "關火加蓋靜置 15 分鐘，讓豆子吸收咖哩汁。咖哩平均分成六碗，將全部 20 公克香菜撒在各碗（每碗約 3 公克）。本食譜配料表未包含米飯。",
      "火を止めてふたをし、豆にソースを吸わせるため15分休ませます。6人分に均等に盛り、刻んだパクチー20gすべて（各約3g）を散らします。このレシピの材料に米は含みません。",
      "불을 끄고 뚜껑을 덮어 15분 두어 콩이 그레이비를 흡수하게 합니다. 여섯 그릇에 똑같이 나누고 다진 고수 20g 전부를 뿌립니다(각 약 3g). 이 레시피 재료에는 밥이 포함되지 않습니다.",
      "ปิดไฟ ปิดฝาพัก 15 นาทีให้ถั่วดูดซึมเกรวี แบ่งแกงเท่ากัน 6 ชาม โรยผักชีสับ 20 กรัมทั้งหมด (ประมาณ 3 กรัมต่อชาม) สูตรนี้ไม่ได้รวมข้าวไว้ในรายการวัตถุดิบ"
    ]);
  setStorage(recipe, [
    "Cool promptly in shallow containers and refrigerate within 2 hours at 4°C or below. FoodSafety.gov lists 3–4 days for cooked leftovers; this recipe uses 3 days as a conservative quality choice. Reheat only the amount needed until it reaches 74°C throughout.",
    "盡快分裝淺盒降溫，2 小時內冷藏於 4°C 以下。FoodSafety.gov 列出的熟剩菜官方保存期為 3–4 天；本食譜採較保守的 3 天品質選擇。只取需要份量回熱，並使整體達 74°C。",
    "浅い容器に分けて速やかに冷まし、2時間以内に4°C以下で冷蔵します。FoodSafety.govの調理済み残り物の公式目安は3〜4日ですが、このレシピでは品質を考慮した保守的な選択として3日以内とします。食べる量だけ全体が74°Cになるまで温め直します。",
    "얕은 용기에 나눠 빠르게 식히고 2시간 안에 4°C 이하로 냉장합니다. FoodSafety.gov의 공식 조리 식품 보관 기간은 3~4일이며, 이 레시피는 보수적인 품질 선택으로 3일을 권합니다. 먹을 양만 전체가 74°C가 될 때까지 데우세요.",
    "แบ่งใส่ภาชนะตื้นให้เย็นเร็วและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C หรือต่ำกว่า FoodSafety.gov ระบุอาหารสุก 3–4 วัน สูตรนี้เลือก 3 วันแบบเผื่อเพื่อคุณภาพ อุ่นเฉพาะปริมาณที่จะกินจนทั่วถึง 74°C"
  ]);
  addOfficial(recipe, "Official food-safety guidance — FDA: Bad Bug Book (red kidney bean lectin)", "https://www.fda.gov/food/foodborne-pathogens/bad-bug-book-second-edition");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: 4 Steps to Food Safety", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Cold Food Storage Charts", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures (leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
}

function revisePhoGa(recipe) {
  recipe.cookMinutes = 130;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  setStep(recipe, 2,
    ["Poach the chicken safely", "安全汆煮全雞", "鶏肉を安全にポーチする", "닭 안전하게 포칭하기", "ต้มไก่ให้สุกอย่างปลอดภัย"],
    [
      "Put the 1.5 kg chicken, 3 L water, all 8 g salt, roasted aromatics, and spice pouch in a snug 6 L pot. Bring to a boil, skim, and lower to a gentle simmer. The 35–45-minute poach is a starting estimate: check the thickest breast and thigh away from bone with a thermometer; both must reach 74°C (165°F). Continue in 5-minute increments if needed.",
      "將 1.5 公斤全雞、3 公升水、全部 8 公克鹽、烤香的辛香料與香料袋放入合適的 6 公升鍋。煮滾撇沫後轉小火微滾。汆煮 35–45 分鐘只是起始估算：以溫度計避開骨頭測最厚胸肉與腿肉，兩處都須達 74°C（165°F）；未達就每次續煮 5 分鐘再測。",
      "鶏1.5kg、水3L、塩8gすべて、焼いた香味野菜、スパイス袋を6Lの鍋に入れます。沸騰させてアクを取り、静かな煮立ちにします。35〜45分は開始時の目安です。骨を避けて最も厚い胸肉と腿肉を温度計で測り、両方が74°C（165°F）になるまで煮ます。未達なら5分ずつ追加します。",
      "닭 1.5kg, 물 3L, 소금 8g 전부, 구운 향신채와 향신료 주머니를 6L 냄비에 넣습니다. 끓여 거품을 걷고 약하게 끓입니다. 35~45분은 시작 추정치입니다. 뼈를 피해 가장 두꺼운 가슴과 허벅지를 재어 둘 다 74°C(165°F)에 도달해야 합니다. 낮으면 5분씩 더 끓이고 다시 잽니다.",
      "ใส่ไก่ทั้งตัว 1.5 กก. น้ำ 3 ลิตร เกลือ 8 กรัมทั้งหมด เครื่องหอมย่าง และถุงเครื่องเทศลงหม้อ 6 ลิตรที่พอดี ต้มให้เดือด ช้อนฟอง แล้วลดเป็นเดือดอ่อน เวลา 35–45 นาทีเป็นค่าประมาณเริ่มต้น ใช้เทอร์โมมิเตอร์วัดอกและสะโพกส่วนหนาที่สุดโดยไม่โดนกระดูก ทั้งสองจุดต้องถึง 74°C (165°F) หากต่ำให้ต้มเพิ่มครั้งละ 5 นาทีแล้วตรวจซ้ำ"
    ]);
  setStep(recipe, 6,
    ["Reheat and portion the chicken", "回熱雞肉並分配份量", "鶏肉を温め直して分ける", "닭고기 다시 데워 나누기", "อุ่นไก่และแบ่งส่วน"],
    [
      "Bring the broth to a simmer and submerge only the chicken needed for this meal. The 1–3-minute warm-up is an estimate; check several thick slices and reheat to 74°C (165°F). Lift them out promptly so the breast does not overcook. Divide 320 g dry noodles as 80 g per bowl; divide the chicken and cooked toppings evenly among four warm bowls.",
      "將湯煮至微滾，只放入這餐要吃的雞肉。回熱 1–3 分鐘只是估算；抽查數片較厚雞肉並加熱至 74°C（165°F）。一達標便撈起，避免雞胸煮老。320 公克乾河粉分成每碗 80 公克；雞肉與熟配料平均分入四只溫碗。",
      "スープを静かに煮立て、この食事に使う分だけ鶏肉を沈めます。1〜3分は温め時間の目安です。厚めの切り身を数枚測り、74°C（165°F）まで温めます。鶏むねが煮え過ぎないようすぐ引き上げます。乾麺320gは1杯80gに分け、鶏肉と加熱済みの具も4つの器に均等に盛ります。",
      "육수를 약하게 끓이고 이번 식사에 먹을 닭고기만 담급니다. 1~3분은 데우기 추정치입니다. 두꺼운 조각 몇 개를 확인해 74°C(165°F)까지 데우세요. 가슴살이 과하게 익지 않도록 바로 건집니다. 마른 쌀국수 320g을 그릇마다 80g씩 나누고 닭고기와 익힌 고명도 네 그릇에 고르게 나눕니다.",
      "ตั้งน้ำซุปให้เดือดอ่อนแล้วใส่เฉพาะไก่ที่จะกินมื้อนี้ เวลาอุ่น 1–3 นาทีเป็นค่าประมาณ ตรวจชิ้นหนาหลายชิ้นและอุ่นถึง 74°C (165°F) ยกขึ้นทันทีเพื่อไม่ให้อกไก่สุกเกิน แบ่งเส้นแห้ง 320 กรัม ชามละ 80 กรัม แล้วแบ่งไก่กับเครื่องที่สุกแล้วให้เท่ากัน 4 ชาม"
    ]);
  setStep(recipe, 7,
    ["Finish four bowls", "完成四碗河粉", "4人分を仕上げる", "네 그릇 마무리하기", "จัดให้ครบสี่ชาม"],
    [
      "Top each bowl with one quarter of the chicken and the listed onion, scallions, cilantro, and pepper. Bring the strained broth to a full boil, then measure about 600 ml into each bowl (2.4 L total). Serve at once with lime and the optional chile, hoisin, and Sriracha kept separately.",
      "每碗放四分之一雞肉，再平均分配配料表中的洋蔥、蔥、香菜與胡椒。過濾後的湯煮至大滾，總共量取約 2.4 公升，每碗約 600 毫升。立刻搭萊姆上桌；可選辣椒、海鮮醬與是拉差醬另放。",
      "各器に鶏肉の4分の1と、記載した玉ねぎ、ねぎ、パクチー、こしょうを等分にのせます。こしたスープをしっかり沸騰させ、合計2.4Lを各約600mlずつ注ぎます。ライムを添えてすぐ供し、好みの唐辛子、ホイシン、シラチャーは別添えにします。",
      "각 그릇에 닭고기의 4분의 1과 목록에 있는 양파, 파, 고수, 후추를 고르게 올립니다. 거른 육수를 완전히 끓인 뒤 총 2.4L를 그릇마다 약 600ml씩 붓습니다. 라임과 함께 바로 내고 선택 고추, 호이신, 스리라차는 따로 둡니다.",
      "แบ่งไก่หนึ่งในสี่และหอมใหญ่ ต้นหอม ผักชี พริกไทยตามรายการใส่แต่ละชาม ต้มน้ำซุปที่กรองแล้วให้เดือดเต็มที่ ตวงรวม 2.4 ลิตร ชามละประมาณ 600 มล. เสิร์ฟทันทีพร้อมมะนาว ส่วนพริก ฮอยซิน และศรีราชาที่เลือกได้ให้แยกไว้"
    ]);
  setStorage(recipe, [
    "Cool broth and meat separately in shallow containers and refrigerate within 2 hours at 4°C or below; keep noodles and fresh herbs separate. FoodSafety.gov allows cooked leftovers 3–4 days; this recipe's 3-day limit is a conservative quality choice. Reheat only the needed portion: bring broth to a boil and check the chicken reaches 74°C before serving.",
    "湯與雞肉分開裝入淺盒降溫，2 小時內冷藏於 4°C 以下；河粉與新鮮香草另放。FoodSafety.gov 對熟剩菜的官方期限為 3–4 天；本食譜採保守的 3 天品質選擇。只回熱需要份量：湯煮至沸騰，並確認雞肉達 74°C 再上桌。",
    "スープと鶏肉は別々に浅い容器へ入れて2時間以内に4°C以下で冷蔵し、麺と生の香草は分けて保存します。FoodSafety.govの調理済み残り物の公式目安は3〜4日ですが、このレシピでは品質を考え保守的に3日以内とします。食べる分だけ温め、スープを沸騰させ、鶏肉が74°Cになったことを確認して供します。",
    "국물과 고기를 얕은 용기에 따로 담아 2시간 안에 4°C 이하로 냉장하고 면과 생허브는 따로 보관합니다. FoodSafety.gov의 공식 조리 식품 냉장 기간은 3~4일이며 이 레시피의 3일은 보수적인 품질 선택입니다. 먹을 만큼만 데우고 국물을 끓이며 닭고기가 74°C에 도달했는지 확인한 뒤 냅니다.",
    "แยกน้ำซุปกับเนื้อใส่ภาชนะตื้นให้เย็นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C หรือต่ำกว่า เก็บเส้นและสมุนไพรสดแยกกัน FoodSafety.gov ระบุอาหารสุก 3–4 วัน สูตรนี้เลือก 3 วันแบบเผื่อเพื่อคุณภาพ อุ่นเฉพาะส่วนที่จะกิน ต้มน้ำซุปและตรวจไก่ให้ถึง 74°C ก่อนเสิร์ฟ"
  ]);
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures (poultry and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: 4 Steps to Food Safety", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Cold Food Storage Charts", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts");
}

function reviseBacalao(recipe) {
  recipe.cookMinutes = 35;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  setStep(recipe, 0,
    ["Desalt the cod for 36 hours", "浸泡鱈魚 36 小時去鹽", "塩抜きに36時間かける", "대구 소금기 36시간 빼기", "แช่ปลาค็อดลดเค็ม 36 ชั่วโมง"],
    [
      "Put the 800 g salt cod skin-side up in a covered, non-reactive container with 3 L cold water; keep it on the refrigerator's lowest shelf at 4°C or below. Desalt for 36 hours in four 9-hour periods, using 3 L each time: change the water after the first three periods (12 L total). This 36-hour schedule is this recipe's desalting choice, not a government safety limit. Drain and pat the loins completely dry.",
      "將 800 公克鹽漬鱈魚皮面朝上放進非反應性有蓋容器，加入 3 公升冷水，置於冰箱下層並保持 4°C 以下。分四段各 9 小時浸泡，共 36 小時；前三段結束時換水，每次 3 公升（總計 12 公升）。36 小時是本食譜選擇的去鹽時間，不是政府食安期限。瀝乾並徹底拍乾魚柳。",
      "塩蔵タラ800gを皮を上にして、冷水3Lとともにふた付きの非反応性容器へ入れます。冷蔵庫の最下段で4°C以下に保ちます。9時間ずつ4回、計36時間塩抜きし、最初の3回の後に各3Lの水を交換します（合計12L）。この36時間はレシピが選んだ塩抜き時間で、政府の安全基準時間ではありません。水を切り、切り身を完全に拭きます。",
      "염장 대구 800g을 껍질이 위로 오게 비반응성 밀폐 용기에 담고 찬물 3L를 붓습니다. 냉장고 아래 칸에서 4°C 이하로 둡니다. 9시간씩 네 번, 총 36시간 염분을 빼며 처음 세 번이 끝날 때마다 물 3L를 갈아 총 12L를 씁니다. 36시간은 이 레시피가 선택한 염분 제거 시간이지 정부의 안전 기준 시간이 아닙니다. 물기를 빼고 필레를 완전히 닦습니다.",
      "วางปลาค็อดเค็ม 800 กรัมโดยหงายด้านหนังในภาชนะไม่ทำปฏิกิริยาที่มีฝาปิด เติมน้ำเย็น 3 ลิตร เก็บชั้นล่างของตู้เย็นที่ 4°C หรือต่ำกว่า แช่ลดเค็ม 4 ช่วง ช่วงละ 9 ชั่วโมง รวม 36 ชั่วโมง เปลี่ยนน้ำหลังสามช่วงแรก ครั้งละ 3 ลิตร (รวม 12 ลิตร) ระยะ 36 ชั่วโมงเป็นวิธีลดเค็มที่สูตรเลือก ไม่ใช่กำหนดความปลอดภัยของทางการ สะเด็ดและซับชิ้นปลาให้แห้งสนิท"
    ]);
  setStep(recipe, 2,
    ["Poach the cod and check its centre", "低溫汆煮鱈魚並測中心熟度", "タラを低温で煮て中心を確認する", "대구 저온 포칭 후 중심 확인하기", "ลวกปลาค็อดเบา ๆ และตรวจด้านใน"],
    [
      "Keep the infused oil at 68–70°C, a recipe-selected texture range above the fish safety endpoint. Lay the cod skin-side up in the oil for an estimated 8–10 minutes, turning once. Check the thickest centre with a thermometer: FDA guidance for finfish is 63°C (145°F). If it is below that, continue in 2-minute increments and recheck; the flesh should then separate into moist flakes without browning.",
      "將浸香油維持在 68–70°C，這是高於魚肉食安端點、為口感選擇的食譜油溫。鱈魚皮面朝上放入油中，預估汆煮 8–10 分鐘，中途翻一次。用溫度計測最厚中心：FDA 對魚肉的建議是 63°C（145°F）。未達就每次續煮 2 分鐘再測；達標後魚肉應能濕潤分片且不焦黃。",
      "香りを移した油を68〜70°Cに保ちます。魚の安全基準より高いこの温度は、食感のためレシピが選んだ範囲です。タラを皮を上にして油へ入れ、8〜10分を目安に一度返して煮ます。最も厚い中心を測ります。FDAの魚の基準は63°C（145°F）です。未達なら2分ずつ追加して再測定し、身が焦げずにしっとりほぐれる状態にします。",
      "향을 낸 기름을 68~70°C로 유지합니다. 생선 안전 기준보다 높은 이 온도 범위는 식감을 위해 레시피가 선택한 값입니다. 대구를 껍질이 위로 오게 넣고 약 8~10분 포칭하며 한 번 뒤집습니다. 가장 두꺼운 중심을 잽니다. 지느러미 생선에 대한 FDA 기준은 63°C(145°F)입니다. 낮으면 2분씩 더 익히고 다시 잽니다. 살은 갈색이 되지 않고 촉촉하게 결대로 풀려야 합니다.",
      "รักษาน้ำมันที่ปรุงกลิ่นไว้ที่ 68–70°C ซึ่งเป็นช่วงที่สูตรเลือกเพื่อเนื้อสัมผัสและสูงกว่าจุดความปลอดภัยของปลา วางปลาค็อดด้านหนังขึ้น ต้มในน้ำมันประมาณ 8–10 นาที พลิกหนึ่งครั้ง วัดตรงกลางส่วนหนาที่สุดด้วยเทอร์โมมิเตอร์ คำแนะนำ FDA สำหรับปลาครีบคือ 63°C (145°F) หากต่ำให้ทำต่อครั้งละ 2 นาทีแล้วตรวจซ้ำ เนื้อควรแยกเป็นเกล็ดชุ่มโดยไม่เป็นสีน้ำตาล"
    ]);
  setStep(recipe, 5,
    ["Warm, portion, and serve", "回溫、分份並上桌", "温めて盛り付ける", "데워 나눠 담아 내기", "อุ่น แบ่ง และเสิร์ฟ"],
    [
      "Return the four cod loins to the finished emulsion and warm gently without boiling. Divide one loin (about 200 g before soaking) and one quarter of the pil-pil sauce per diner; top with the reserved garlic and chilli. Serve immediately while the emulsion is glossy.",
      "將四塊鱈魚放回乳化醬汁中，不煮沸地輕柔回溫。每人分一塊魚柳（浸泡前約 200 公克）與四分之一 pil-pil 醬，放上保留的蒜片與辣椒。趁醬汁光亮立即上桌。",
      "4切れのタラを仕上がった乳化ソースへ戻し、沸騰させずにやさしく温めます。1人に1切れ（浸水前約200g）とソースの4分の1を盛り、取っておいたにんにくと唐辛子を添えます。ソースに艶があるうちにすぐ供します。",
      "대구 네 조각을 완성된 유화 소스에 돌려 넣고 끓이지 않게 부드럽게 데웁니다. 한 사람당 대구 한 조각(불리기 전 약 200g)과 필필 소스의 4분의 1을 나누고 남겨 둔 마늘과 고추를 올립니다. 소스가 윤기 있을 때 바로 냅니다.",
      "นำปลาค็อดทั้งสี่ชิ้นกลับลงในซอสอิมัลชันที่เสร็จแล้ว อุ่นเบา ๆ โดยไม่ต้ม แบ่งปลาหนึ่งชิ้น (ประมาณ 200 กรัมก่อนแช่น้ำ) และซอส pil-pil หนึ่งในสี่ต่อคน โรยกระเทียมและพริกที่พักไว้ เสิร์ฟทันทีขณะซอสยังเงา"
    ]);
  setStorage(recipe, [
    "This fish is best served immediately. If there are leftovers, cool in a shallow container and refrigerate within 2 hours at 4°C or below. FoodSafety.gov lists 3–4 days for cooked fish leftovers; the 2-day limit here is a conservative quality choice, not an official safety limit. Reheat only the needed portion gently until it reaches 74°C throughout; the cod may firm and the emulsion may split.",
    "本魚料理最好現做現吃。若有剩食，放入淺盒並於 2 小時內冷藏至 4°C 以下。FoodSafety.gov 列出的熟魚剩菜官方冷藏期為 3–4 天；本食譜採 2 天保守品質選擇，並非官方食安期限。只取需要份量輕柔回熱至各處達 74°C；鱈魚可能變緊實、乳化醬可能分離。",
    "できたてが最良です。残った場合は浅い容器で冷まし、2時間以内に4°C以下で冷蔵します。FoodSafety.govの調理済み魚の公式冷蔵目安は3〜4日です。このレシピの2日以内は保守的な品質上の選択で、安全期限としての公式基準ではありません。必要分だけ全体が74°Cになるまでやさしく温めます。タラは締まり、乳化ソースが分離する場合があります。",
    "바로 먹는 것이 가장 좋습니다. 남으면 얕은 용기에 담아 2시간 안에 4°C 이하로 냉장합니다. FoodSafety.gov의 공식 조리 생선 냉장 기간은 3~4일이며, 여기의 2일은 보수적인 품질 선택이지 공식 안전 기한이 아닙니다. 먹을 양만 전체가 74°C가 될 때까지 부드럽게 데우세요. 대구 살이 단단해지고 유화 소스가 분리될 수 있습니다.",
    "ควรกินทันที หากเหลือให้พักในภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C หรือต่ำกว่า FoodSafety.gov ระบุปลาสุกแช่เย็น 3–4 วัน สูตรนี้เลือก 2 วันแบบเผื่อเพื่อคุณภาพ ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ อุ่นเฉพาะส่วนที่จะกินอย่างเบาจนทั่วถึง 74°C เนื้อปลาค็อดอาจแน่นขึ้นและซอสอิมัลชันอาจแยกตัว"
  ]);
  addOfficial(recipe, "Official food-safety guidance — FDA: Selecting and Serving Fresh and Frozen Seafood Safely", "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures (fish and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: 4 Steps to Food Safety", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
  addOfficial(recipe, "Official food-safety guidance — FoodSafety.gov: Cold Food Storage Charts", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts");
}

export function refineFiftyFirstMethods(recipes) {
  const updates = {
    "taiwanese-popcorn-chicken": reviseTaiwanesePopcornChicken,
    "rajma-masala": reviseRajma,
    "pho-ga": revisePhoGa,
    "bacalao-al-pil-pil": reviseBacalao
  };
  for (const [id, revise] of Object.entries(updates)) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error(`${id}: missing published recipe for fifty-first method review`);
    recipes[index] = cloneForPublication(recipes[index]);
    revise(recipes[index]);
    for (const locale of localeKeys) {
      if (!recipes[index].storage?.[locale]) throw new Error(`${id}: missing ${locale} storage card`);
      if (!recipes[index].instructions.every((step) => step.title?.[locale] && step.body?.[locale])) {
        throw new Error(`${id}: incomplete ${locale} method after refinement`);
      }
    }
  }
  return recipes;
}
