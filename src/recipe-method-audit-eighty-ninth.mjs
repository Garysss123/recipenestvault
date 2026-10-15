// Reimplementation batch 5. Fresh methods are authored from the existing
// recipe records; this file does not restore or represent an unavailable patch.
const porkTemperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const coldStorage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: "Official food-safety guidance — " + label, url });
  }
}

function reviseRecipe(recipe, revision) {
  if (!recipe) throw new Error("Missing recipe for method revision: " + revision.id);
  if (recipe.instructions.length !== revision.titles.length || revision.titles.length !== revision.bodies.length) {
    throw new Error("Step count mismatch for method revision: " + revision.id);
  }
  recipe.instructions = recipe.instructions.map((step, index) => ({
    ...step,
    title: revision.titles[index],
    body: revision.bodies[index]
  }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = revision.tips;
  recipe.commonMistakes = revision.mistakes;
  recipe.storage = revision.storage;
  recipe.prepMinutes = revision.prepMinutes;
  recipe.cookMinutes = revision.cookMinutes;
  recipe.totalMinutes = revision.prepMinutes + revision.cookMinutes;
  for (const [label, url] of revision.safetySources) addOfficialSource(recipe, label, url);
}

function reviseTacosAlPastor(recipe) {
  reviseRecipe(recipe, {
    id: "tacos-al-pastor",
    prepMinutes: 275,
    cookMinutes: 45,
    titles: [
      ml("Soften the guajillos", "泡軟 guajillo 辣椒", "グアヒージョを戻す", "과히요 고추 불리기", "แช่พริกกวาฮีโย"),
      ml("Blend the adobo", "打成醃料糊", "アドボを作る", "아도보 양념 갈기", "ปั่นอะโดโบ"),
      ml("Marinate the pork under refrigeration", "冷藏醃豬肉", "豚肉を冷蔵で漬ける", "돼지고기 냉장 재우기", "หมักหมูในตู้เย็น"),
      ml("Char the pineapple", "炙烤鳳梨", "パイナップルを焼く", "파인애플 굽기", "ย่างสับปะรด"),
      ml("Sear the pork in batches", "分批煎熟豬肉", "豚肉を分けて焼く", "돼지고기를 나누어 굽기", "จี่หมูเป็นชุด"),
      ml("Rest and chop the pork", "靜置並切碎豬肉", "豚肉を休ませて刻む", "돼지고기 휴지 후 썰기", "พักและสับหมู"),
      ml("Dice the pineapple", "切丁鳳梨", "パイナップルを刻む", "파인애플 깍둑썰기", "หั่นสับปะรดเต๋า"),
      ml("Warm the tortillas", "加熱玉米餅", "トルティーヤを温める", "토르티야 데우기", "อุ่นตอร์ติยา"),
      ml("Divide and serve six portions", "分成六份上桌", "6人分に盛り付ける", "6인분으로 나눠 담기", "แบ่งเสิร์ฟ 6 ที่")
    ],
    bodies: [
      ml(
        "Put the 35 g stemmed, seeded guajillos in a heatproof bowl and cover with freshly boiled water. Soak 15 minutes until pliable, then drain well; discard the soaking water.",
        "將去梗、去籽的 35 公克 guajillo 辣椒放入耐熱碗，以剛煮沸的水淹過，浸泡 15 分鐘至柔軟，再充分瀝乾並倒掉泡椒水。",
        "軸と種を除いたグアヒージョ35gを耐熱ボウルに入れ、沸かしたての湯をかぶるまで注ぎます。柔らかくなるまで15分戻し、よく水を切って戻し汁は捨てます。",
        "꼭지와 씨를 뺀 과히요 고추 35g을 내열 볼에 담고 갓 끓인 물로 덮습니다. 부드러워질 때까지 15분 불린 뒤 물기를 잘 빼고 불린 물은 버립니다.",
        "ใส่พริกกวาฮีโยเอาก้านและเมล็ดออก 35 กรัมในชามทนร้อน เทน้ำเดือดใหม่ให้ท่วม แช่ 15 นาทีจนนิ่ม แล้วสะเด็ดให้ดีและทิ้งน้ำแช่"
      ),
      ml(
        "Blend the softened chiles with 30 g achiote paste, 60 ml pineapple juice, 60 ml white vinegar, 3 peeled garlic cloves, 2 g oregano, 2 g cumin, and all 8 g salt. Scrape the sides once and blend to a smooth, spreadable paste.",
        "將泡軟辣椒、30 公克胭脂樹醬、60 毫升鳳梨汁、60 毫升白醋、3 瓣去皮蒜頭、2 公克牛至、2 公克孜然與全部 8 公克鹽放入調理機。刮下側壁一次，再打成滑順、能均勻抹開的醃料糊。",
        "戻した唐辛子、アチョーテペースト30g、パイナップルジュース60ml、白酢60ml、皮をむいたにんにく3片、オレガノ2g、クミン2g、塩8g全量をミキサーに入れます。側面を一度こそげ、塗りやすい滑らかなペーストにします。",
        "불린 고추, 아치오테 페이스트 30g, 파인애플 주스 60ml, 흰 식초 60ml, 껍질 벗긴 마늘 3쪽, 오레가노 2g, 쿠민 2g, 소금 8g 전량을 믹서에 넣습니다. 벽면을 한 번 긁어 내리고 고르게 바를 수 있게 매끈하게 갑니다.",
        "ปั่นพริกที่แช่นิ่มกับอาชิโอเต 30 กรัม น้ำสับปะรด 60 มล. น้ำส้มสายชูขาว 60 มล. กระเทียมปอกเปลือก 3 กลีบ ออริกาโน 2 กรัม ยี่หร่า 2 กรัม และเกลือ 8 กรัมทั้งหมด ปาดข้างโถหนึ่งครั้งแล้วปั่นจนเนียนข้นทาได้"
      ),
      ml(
        "Spread the adobo over all 900 g thin pork steaks in a shallow non-reactive dish, turning so both sides are coated. Cover and refrigerate at 4°C/40°F or below for at least 4 hours; overnight is convenient. Keep raw pork and its marinade away from ready-to-eat toppings.",
        "將醃料抹滿全部 900 公克薄切豬肩肉片，翻面使兩面都沾勻，放入淺的非反應性容器。加蓋並在 4°C／40°F 以下冷藏至少 4 小時，也可醃過夜。生豬肉與醃汁要和即食配料分開。",
        "薄切りの豚肩肉900g全量にアドボを塗り、裏返して両面に行き渡らせます。反応しない浅い容器に入れて覆い、4°C/40°F以下で最低4時間冷蔵します。一晩漬けても構いません。生肉と漬けだれを、食べる直前の薬味から離します。",
        "얇게 썬 돼지 어깨살 900g 전체에 아도보를 바르고 뒤집어 양면에 묻힙니다. 반응하지 않는 얕은 용기에 담아 덮고 4°C/40°F 이하에서 최소 4시간 냉장합니다. 하룻밤 재워도 됩니다. 생고기와 양념은 바로 먹는 고명과 분리하세요.",
        "ทาอะโดโบบนสเต๊กไหล่หมูบาง 900 กรัมทั้งหมด พลิกให้เคลือบทั้งสองด้าน ใส่ภาชนะตื้นที่ไม่ทำปฏิกิริยา ปิดฝาและแช่ที่ 4°C/40°F หรือต่ำกว่าอย่างน้อย 4 ชั่วโมง หรือข้ามคืน แยกหมูดิบและน้ำหมักจากเครื่องเคียงพร้อมกิน"
      ),
      ml(
        "Heat a heavy skillet over medium-high. Sear the 300 g pineapple slices in a single layer, about 3 minutes per side until golden with dark marks and still juicy. Transfer to a clean plate; cut away any tough core later.",
        "厚鍋中大火預熱，將 300 公克鳳梨片單層放入，每面約煎 3 分鐘，至金黃帶深色焦痕但仍多汁。移至乾淨盤上，稍後切除較硬的芯。",
        "厚手のフライパンを中強火で熱し、パイナップル300gを重ならないように並べます。片面約3分ずつ、濃い焼き目がつき、汁気が残るまで焼き、清潔な皿に移します。硬い芯は後で除きます。",
        "두꺼운 팬을 중강불로 달구고 파인애플 300g을 겹치지 않게 놓습니다. 면당 약 3분, 진한 자국이 나고 즙이 남을 때까지 굽고 깨끗한 접시에 옮깁니다. 질긴 심은 나중에 제거합니다.",
        "ตั้งกระทะก้นหนาไฟกลางค่อนแรง วางสับปะรด 300 กรัมชั้นเดียว จี่ด้านละประมาณ 3 นาทีจนเหลืองมีรอยเกรียมเข้มแต่ยังฉ่ำ ย้ายลงจานสะอาด ค่อยตัดแกนแข็งออกภายหลัง"
      ),
      ml(
        "Increase the skillet to high. Shake excess adobo from the pork and discard the used marinade. Sear the 900 g pork in 3 uncrowded batches of about 300 g, 2–3 minutes per side. In each batch, insert a thin-probe thermometer sideways into the thickest steak without touching the pan; it must reach at least 63°C/145°F. Transfer cooked pork with clean tongs to a clean tray.",
        "將鍋轉大火。抖掉豬肉表面多餘醃料，並丟棄用過的醃汁。900 公克豬肉分成 3 批、每批約 300 公克且勿擁擠，每面煎 2–3 分鐘。每批都用細探針溫度計從側邊插入最厚肉片中央，勿碰鍋面，確認至少達 63°C／145°F。用乾淨夾子將熟肉移至乾淨托盤。",
        "火を強火にします。豚肉の余分なアドボを振り落とし、使用済みの漬けだれは捨てます。900gを約300gずつ、重ならない3回に分け、片面2〜3分焼きます。各回で細い温度計を最も厚い肉の側面から中心へ差し、フライパンに触れないようにして63°C/145°F以上を確認します。焼けた肉は清潔なトングで清潔なトレーに移します。",
        "팬을 센 불로 올립니다. 돼지고기의 양념을 털어 내고 사용한 마리네이드는 버립니다. 900g 고기를 약 300g씩 3번, 겹치지 않게 나누어 면당 2–3분 굽습니다. 매 회 가장 두꺼운 스테이크 옆면으로 가는 탐침 온도계를 넣어 팬에 닿지 않게 재고 최소 63°C/145°F인지 확인합니다. 익은 고기는 깨끗한 집게로 깨끗한 쟁반에 옮깁니다.",
        "เร่งไฟเป็นแรง สะบัดอะโดโบส่วนเกินออกจากหมูและทิ้งน้ำหมักที่ใช้แล้ว จี่หมู 900 กรัมแบ่ง 3 ชุด ชุดละราว 300 กรัมไม่ให้แน่นกระทะ ด้านละ 2–3 นาที แต่ละชุดใช้เทอร์โมมิเตอร์หัวเล็กสอดจากด้านข้างเข้ากลางชิ้นที่หนาสุดโดยไม่แตะกระทะ ต้องถึงอย่างน้อย 63°C/145°F ย้ายหมูสุกด้วยคีมสะอาดลงถาดสะอาด"
      ),
      ml(
        "Rest the pork on the clean tray for 5 minutes before chopping; this exceeds the official 3-minute rest for whole pork steaks. Cut across the grain into small pieces, collecting the juices on the tray and returning them to the chopped meat.",
        "豬肉在乾淨托盤上靜置 5 分鐘再切碎；這超過整塊豬排建議的 3 分鐘靜置。逆紋切成小塊，並將托盤肉汁拌回肉中。",
        "豚肉を清潔なトレーで5分休ませてから刻みます。これは豚肉ステーキの推奨3分休ませ時間より長い時間です。繊維を断つ向きに小さく切り、トレーの肉汁も戻して混ぜます。",
        "돼지고기를 깨끗한 쟁반에서 5분 휴지한 뒤 썹니다. 통돼지고기 스테이크의 공식 3분 휴지보다 긴 시간입니다. 결을 가로질러 작게 썰고 쟁반의 육즙도 고기에 다시 섞습니다.",
        "พักหมูบนถาดสะอาด 5 นาทีก่อนสับ ซึ่งนานกว่าช่วงพัก 3 นาทีตามเกณฑ์สเต๊กหมูชิ้นเต็ม หั่นขวางเส้นใยเป็นชิ้นเล็กและคลุกน้ำจากถาดกลับเข้าเนื้อ"
      ),
      ml(
        "Remove the tough core from the charred pineapple, then dice the 300 g into roughly 1 cm pieces so it fits each taco without slipping out.",
        "切除炙烤鳳梨較硬的芯，再將全部 300 公克切成約 1 公分小丁，方便放入玉米餅而不易掉出。",
        "焼いたパイナップルの硬い芯を除き、300g全量を約1cm角に切ります。タコスにのせても落ちにくい大きさにします。",
        "구운 파인애플의 질긴 심을 제거하고 300g 전량을 약 1cm 크기로 깍둑썰기해 타코에서 흘러내리지 않게 합니다.",
        "ตัดแกนแข็งของสับปะรดออก แล้วหั่นทั้งหมด 300 กรัมเป็นเต๋าราว 1 ซม.เพื่อให้วางบนทาโก้ได้พอดีไม่หล่น"
      ),
      ml(
        "Warm the 18 corn tortillas on a dry comal or skillet, about 30 seconds per side in batches, until soft, flexible, and lightly spotted. Stack them in a clean towel and keep covered.",
        "將 18 張玉米餅放在乾燥 comal 或平底鍋上分批加熱，每面約 30 秒，至柔軟可折且略有斑點。疊起放入乾淨布巾並加蓋保溫。",
        "コマルまたはフライパンを乾いたまま使い、トルティーヤ18枚を数枚ずつ、片面約30秒ずつ温めます。柔らかくしなやかで軽い焼き斑がついたら、清潔な布に重ねて覆います。",
        "마른 코말이나 팬에서 옥수수 토르티야 18장을 몇 장씩 나누어 면당 약 30초 데웁니다. 부드럽고 잘 접히며 옅은 반점이 생기면 깨끗한 천에 쌓아 덮습니다.",
        "อุ่นตอร์ติยาข้าวโพด 18 แผ่นบนโคมัลหรือกระทะแห้ง ครั้งละไม่กี่แผ่น ด้านละประมาณ 30 วินาทีจนนุ่ม พับได้ และมีจุดสีอ่อน ซ้อนในผ้าสะอาดแล้วคลุมไว้"
      ),
      ml(
        "Divide the pork among all 18 tortillas, giving 3 tacos per person. Top with all 300 g pineapple, 120 g onion, and 30 g cilantro; serve the wedges from all 3 limes alongside and eat while warm.",
        "將豬肉平均分到全部 18 張玉米餅，每人 3 個。放上全部 300 公克鳳梨、120 公克洋蔥與 30 公克香菜；將 3 顆萊姆切角另附，趁溫熱食用。",
        "豚肉をトルティーヤ18枚に均等に分け、1人3個にします。パイナップル300g全量、玉ねぎ120g、香菜30gをのせ、ライム3個分のくし切りを添えて温かいうちに食べます。",
        "돼지고기를 토르티야 18장에 고르게 나누어 1인당 3개씩 담습니다. 파인애플 300g 전량, 양파 120g, 고수 30g을 얹고 라임 3개의 웨지를 곁들여 따뜻할 때 먹습니다.",
        "แบ่งหมูใส่ตอร์ติยา 18 แผ่นให้เท่ากัน คนละ 3 ชิ้น ใส่สับปะรด 300 กรัมทั้งหมด หอม 120 กรัม และผักชี 30 กรัม เสิร์ฟมะนาว 3 ลูกที่หั่นซีกไว้ข้าง ๆ และกินขณะอุ่น"
      )
    ],
    tips: [
      ml("Use a shallow, non-reactive dish for the vinegar-rich adobo and refrigerate the full marinating time at 4°C/40°F or below.", "醋含量高的醃料請用淺的非反應性容器，整段醃漬都維持 4°C／40°F 以下冷藏。", "酢を含むアドボには浅い非反応性容器を使い、漬けている間ずっと4°C/40°F以下で冷蔵します。", "식초가 든 아도보는 얕은 비반응 용기에 담고 재우는 내내 4°C/40°F 이하로 냉장하세요.", "ใช้อะโดโบที่มีน้ำส้มในภาชนะตื้นที่ไม่ทำปฏิกิริยา และแช่ที่ 4°C/40°F หรือต่ำกว่าตลอดเวลาหมัก"),
      ml("Searing in three uncrowded batches preserves the skillet heat and creates browned edges instead of steaming the pork.", "分三批且不擁擠地煎，可維持鍋溫並煎出焦香邊，不會把豬肉悶熟。", "3回に分けて詰め込まずに焼くと、鍋の温度が保たれ、蒸し焼きではなく焼き色がつきます。", "세 번으로 나누어 팬을 빽빽하게 채우지 않으면 온도가 유지되어 고기가 찌지 않고 갈색으로 구워집니다.", "จี่สามชุดโดยไม่แน่นกระทะช่วยรักษาความร้อนและให้ขอบเกรียม แทนการอบไอน้ำหมู"),
      ml("The 18 tortillas make 3 tacos for each of the 6 servings; put toppings on only when ready to eat so they stay fresh.", "18 張玉米餅剛好讓 6 份各有 3 個；食用前才放配料，保持新鮮。", "トルティーヤ18枚で6人分、1人3個です。薬味は食べる直前にのせると新鮮さを保てます。", "토르티야 18장은 6인분으로 한 명당 3개입니다. 신선함을 위해 먹기 직전에 고명을 올리세요.", "ตอร์ติยา 18 แผ่นแบ่ง 6 ที่ได้คนละ 3 ชิ้น ใส่เครื่องเคียงเมื่อพร้อมกินเพื่อคงความสด")
    ],
    mistakes: [
      ml("If the adobo smokes or blackens before the pork reaches temperature, lower the heat and wipe out burnt bits between batches; never stop before the thermometer endpoint.", "若豬肉尚未達溫度醃料已冒煙或變黑，請調低火力並在每批之間擦掉焦屑；不可未達溫度就停火。", "肉の温度が上がる前にアドボが煙を出したり黒くなったりしたら、火を弱め、各回の間に焦げを拭き取ります。温度計の基準前に止めません。", "고기가 온도에 도달하기 전에 양념이 연기 나거나 검게 타면 불을 낮추고 매 회 사이 탄 조각을 닦으세요. 온도계 기준 전에 멈추지 마세요.", "หากอะโดโบมีควันหรือไหม้ดำก่อนหมูถึงอุณหภูมิ ให้ลดไฟและเช็ดเศษไหม้ระหว่างชุด ห้ามหยุดก่อนถึงเกณฑ์เทอร์โมมิเตอร์"),
      ml("If a steak is below 63°C/145°F, return that piece to the hot skillet and recheck; colour alone cannot prove pork is safely cooked.", "若肉片未達 63°C／145°F，將該片放回熱鍋續煎後再測；顏色不能單獨證明豬肉已安全熟透。", "ステーキが63°C/145°F未満ならその肉だけ熱いフライパンに戻して再確認します。色だけでは安全な火通りを判断できません。", "스테이크가 63°C/145°F 미만이면 그 조각을 뜨거운 팬에 다시 익힌 뒤 재세요. 색만으로 돼지고기의 안전한 익힘을 확인할 수 없습니다.", "หากชิ้นใดต่ำกว่า 63°C/145°F ให้นำชิ้นนั้นกลับลงกระทะร้อนและวัดซ้ำ สีอย่างเดียวบอกไม่ได้ว่าหมูสุกปลอดภัย")
    ],
    storage: ml(
      "Refrigerate pork and toppings in separate covered containers within 2 hours at 4°C/40°F or below; use cooked pork within 3–4 days. Reheat pork to 74°C/165°F. Warm tortillas only as needed; discard any pork or marinade left out longer than 2 hours.",
      "豬肉與配料分開裝入有蓋容器，2 小時內冷藏於 4°C／40°F 以下；熟豬肉 3–4 天內食用。復熱豬肉至 74°C／165°F。玉米餅按需加熱；豬肉或醃汁若在室溫放超過 2 小時便丟棄。",
      "豚肉と薬味は別々の蓋付き容器に入れ、2時間以内に4°C/40°F以下で冷蔵します。調理済みの豚肉は3〜4日以内に食べ、再加熱は74°C/165°Fまで行います。トルティーヤは食べる分だけ温め、室温に2時間を超えて置いた肉や漬けだれは捨てます。",
      "돼지고기와 고명은 덮은 용기에 따로 담아 2시간 안에 4°C/40°F 이하로 냉장하고 익힌 돼지고기는 3–4일 안에 먹습니다. 재가열은 74°C/165°F까지 하세요. 토르티야는 먹을 만큼만 데우고 실온에 2시간 넘게 둔 고기나 양념은 버립니다.",
      "แช่หมูกับเครื่องเคียงในภาชนะปิดฝาแยกกันภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า กินหมูสุกภายใน 3–4 วัน อุ่นหมูให้ถึง 74°C/165°F อุ่นตอร์ติยาเท่าที่จะกิน และทิ้งหมูหรือน้ำหมักที่วางนอกตู้เย็นเกิน 2 ชั่วโมง"
    ),
    safetySources: [
      ["safe internal temperature and rest for pork steaks", porkTemperatures],
      ["refrigerator marinating, two-hour limit, and cross-contamination controls", handling],
      ["cold storage times and reheating leftovers", coldStorage]
    ]
  });
}

function reviseTiramisu(recipe) {
  reviseRecipe(recipe, {
    id: "tiramisu",
    prepMinutes: 400,
    cookMinutes: 10,
    titles: [
      ml("Brew and cool the espresso", "沖煮並放涼濃縮咖啡", "エスプレッソを淹れて冷ます", "에스프레소 내려 식히기", "ชงและพักเอสเปรสโซให้เย็น"),
      ml("Cook the yolk mixture to a safe temperature", "將蛋黃糊加熱至安全溫度", "卵黄液を安全な温度まで加熱する", "노른자 혼합물을 안전 온도까지 익히기", "อุ่นส่วนผสมไข่แดงให้ถึงอุณหภูมิปลอดภัย"),
      ml("Fold the mascarpone cream", "拌合馬斯卡彭奶油餡", "マスカルポーネクリームを合わせる", "마스카르포네 크림 섞기", "ผสมครีมมาสคาร์โปเน"),
      ml("Dip the first biscuits briefly", "快速沾第一層手指餅乾", "最初のビスケットをさっと浸す", "첫 비스킷을 짧게 적시기", "จุ่มบิสกิตชั้นแรกอย่างรวดเร็ว"),
      ml("Build the two layers", "疊出兩層", "2層に重ねる", "두 층으로 쌓기", "ประกอบเป็นสองชั้น"),
      ml("Chill, dust, and cut eight portions", "冷藏、撒可可並切成八份", "冷やしてココアを振り、8人分に切る", "냉장하고 코코아 뿌려 8인분 자르기", "แช่เย็น โรยโกโก้ และตัด 8 ที่")
    ],
    bodies: [
      ml(
        "Brew 300 ml strong espresso and pour it into a shallow dish. Let it cool completely before dipping; the cooling can overlap with preparing the cream. Do not dip the biscuits while the coffee is warm.",
        "沖煮 300 毫升濃縮咖啡並倒入淺盤，完全放涼後再沾餅乾；咖啡放涼時可同步準備奶油餡。咖啡仍溫熱時不要沾餅乾。",
        "濃いエスプレッソ300mlを淹れて浅い皿に注ぎ、完全に冷まします。冷ましている間にクリームを準備できます。コーヒーが温かいうちはビスケットを浸しません。",
        "진한 에스프레소 300ml를 내려 얕은 접시에 붓고 완전히 식힙니다. 식히는 동안 크림을 준비해도 됩니다. 커피가 따뜻할 때 비스킷을 적시지 마세요.",
        "ชงเอสเปรสโซเข้ม 300 มล. เทใส่จานตื้นและพักให้เย็นสนิท ระหว่างนั้นเตรียมครีมได้ อย่าจุ่มบิสกิตขณะที่กาแฟยังอุ่น"
      ),
      ml(
        "Whisk 5 egg yolks, 100 g sugar, and 2 g salt in a heatproof bowl. Set the bowl over barely simmering water without letting its base touch the water; whisk constantly for 6–8 minutes. Check the mixture in several spots with a clean thermometer, not touching the bowl; continue heating until it reaches at least 71°C/160°F. Remove from heat and stir as it cools for 10 minutes. Do not use it uncooked.",
        "耐熱碗中放入 5 顆蛋黃、100 公克糖與 2 公克鹽並打勻。隔著微滾水加熱，碗底不可碰水，持續攪打 6–8 分鐘。用乾淨溫度計在蛋黃糊不同位置測量且勿碰碗，繼續加熱至至少 71°C／160°F。離火後一邊攪拌一邊放涼 10 分鐘；不可生用。",
        "耐熱ボウルで卵黄5個、砂糖100g、塩2gを混ぜます。底が湯に触れないよう、かすかに沸く湯せんにかけ、6〜8分絶えず泡立てます。清潔な温度計をボウルに触れないように差し、数か所を測って71°C/160°F以上になるまで加熱を続けます。火から外し、混ぜながら10分冷まします。生のまま使いません。",
        "내열 볼에 달걀노른자 5개, 설탕 100g, 소금 2g을 넣고 섞습니다. 볼 바닥이 물에 닿지 않게 잔잔히 끓는 물 위에 올려 6–8분 계속 저어 휘핑합니다. 깨끗한 온도계가 볼에 닿지 않게 넣어 여러 곳을 재고 최소 71°C/160°F에 이를 때까지 가열합니다. 불에서 내려 저으면서 10분 식힙니다. 익히지 않은 채 사용하지 마세요.",
        "ตีไข่แดง 5 ฟอง น้ำตาล 100 กรัม และเกลือ 2 กรัมในชามทนร้อน วางเหนือหม้อน้ำเดือดอ่อนโดยก้นชามไม่แตะน้ำ ตีต่อเนื่อง 6–8 นาที ใช้เทอร์โมมิเตอร์สะอาดวัดหลายจุดโดยไม่แตะชาม ให้ความร้อนต่อจนอย่างน้อย 71°C/160°F ยกลงและคนระหว่างพักให้เย็น 10 นาที ห้ามใช้แบบไม่สุก"
      ),
      ml(
        "Beat 500 g cold mascarpone only until smooth. Fold in the cooled cooked-yolk mixture. In a separate chilled bowl whip 250 ml cold heavy cream to medium peaks, then fold it into the mascarpone in 3 additions until no streaks remain; stop before the cream turns grainy.",
        "將冷藏的 500 公克馬斯卡彭乳酪短暫打至滑順，拌入已煮熟並放涼的蛋黃糊。另用冰涼盆將 250 毫升冷鮮奶油打至中性發泡，分 3 次輕輕拌入，直到沒有條紋即可；勿打到顆粒化。",
        "冷たいマスカルポーネ500gを滑らかになるまで短く混ぜ、冷ました加熱済み卵黄液を折り混ぜます。別の冷たいボウルで生クリーム250mlを中程度の角が立つまで泡立て、3回に分けて筋がなくなるまで折り込みます。粒状になる前に止めます。",
        "차가운 마스카르포네 500g을 매끈해질 정도로만 짧게 휘핑하고 식힌 익힌 노른자 혼합물을 접어 섞습니다. 다른 차가운 볼에서 생크림 250ml를 중간 뿔이 설 때까지 휘핑한 뒤 3번에 나누어 줄무늬가 없어질 때까지 접어 섞고 알갱이가 생기기 전에 멈춥니다.",
        "ตีมาสคาร์โปเนเย็น 500 กรัมสั้น ๆ จนเนียน แล้วตะล่อมส่วนผสมไข่แดงที่ปรุงสุกและเย็นแล้วลงไป ตีครีมเย็น 250 มล.ในชามแช่เย็นอีกใบจนตั้งยอดปานกลาง แล้วตะล่อมใส่ 3 ครั้งจนไม่เห็นริ้ว หยุดก่อนครีมจับเป็นเม็ด"
      ),
      ml(
        "Dip each of 12 savoiardi in the cooled espresso for about 1 second per side, just long enough to moisten the outside. Arrange them snugly in one layer in a 20 × 28 cm dish; they should hold their shape and not drip.",
        "將 12 根 savoiardi 每面各快速沾濃縮咖啡約 1 秒，只讓表面吸濕。緊密排成一層放入 20 × 28 公分容器；餅乾應能保持形狀且不滴水。",
        "サヴォイアルディ12本を、冷ましたコーヒーに片面約1秒ずつ、表面が湿る程度にさっと浸します。20×28cmの器に隙間なく一層に並べます。形が保たれ、液だれしない状態が目安です。",
        "사보이아르디 12개를 식힌 커피에 면당 약 1초씩, 겉만 적셔지도록 짧게 담급니다. 20×28cm 그릇에 빈틈없이 한 층으로 놓습니다. 모양을 유지하고 물이 떨어지지 않아야 합니다.",
        "จุ่มซาโวยาร์ดี 12 ชิ้นในกาแฟเย็นด้านละประมาณ 1 วินาที แค่ให้ผิวชุ่ม เรียงชิดเป็นชั้นเดียวในถาด 20×28 ซม. บิสกิตควรคงรูปและไม่มีน้ำหยด"
      ),
      ml(
        "Spread half the mascarpone cream evenly over the first biscuit layer. Quickly dip the remaining 12 savoiardi, arrange a second layer, and cover with all remaining cream. Smooth the surface without pressing down on the biscuits.",
        "將一半馬斯卡彭奶油餡均勻抹在第一層餅乾上。快速沾濕剩下 12 根 savoiardi，排成第二層，再抹上全部剩餘奶油餡。抹平表面但不要壓扁餅乾。",
        "マスカルポーネクリームの半量を1層目のビスケットに均等に広げます。残りのサヴォイアルディ12本も手早くコーヒーに浸して2層目に並べ、残りのクリーム全量を広げます。ビスケットを押さずに表面を平らにします。",
        "마스카르포네 크림 절반을 첫 비스킷 층에 고르게 바릅니다. 남은 사보이아르디 12개도 커피에 빠르게 적셔 두 번째 층으로 놓고 남은 크림을 모두 덮습니다. 비스킷을 누르지 말고 표면을 고르게 합니다.",
        "ปาดครีมมาสคาร์โปเนครึ่งหนึ่งให้ทั่วบิสกิตชั้นแรก จุ่มซาโวยาร์ดีที่เหลือ 12 ชิ้นอย่างรวดเร็ว เรียงเป็นชั้นที่สองและปิดด้วยครีมที่เหลือทั้งหมด เกลี่ยหน้าโดยไม่กดบิสกิต"
      ),
      ml(
        "Cover and refrigerate at 0–4°C/32–40°F for at least 6 hours so the layers set. Just before serving, sift all 15 g cocoa evenly over the top and cut into 8 portions with a clean knife.",
        "加蓋並以 0–4°C／32–40°F 冷藏至少 6 小時，讓層次定型。上桌前將全部 15 公克可可粉均勻篩在表面，並用乾淨刀切成 8 份。",
        "覆って0〜4°C/32〜40°Fで最低6時間冷やし、層を落ち着かせます。提供直前にココア15g全量を均一にふるい、清潔なナイフで8人分に切ります。",
        "덮어서 0–4°C/32–40°F에서 최소 6시간 냉장해 층을 굳힙니다. 내기 직전에 코코아 15g 전량을 고르게 체 치고 깨끗한 칼로 8등분합니다.",
        "ปิดฝาแช่ที่ 0–4°C/32–40°F อย่างน้อย 6 ชั่วโมงให้ชั้นเซ็ต ก่อนเสิร์ฟร่อนโกโก้ 15 กรัมทั้งหมดให้ทั่วหน้า แล้วใช้มีดสะอาดตัด 8 ส่วน"
      )
    ],
    tips: [
      ml("Use an instant-read thermometer in the yolk mixture and whisk continuously so the temperature becomes even without cooking scrambled bits.", "蛋黃糊以即讀溫度計確認，並持續攪打，讓溫度均勻且不結成炒蛋顆粒。", "卵黄液は即読温度計で確認し、絶えず混ぜると温度が均一になり、炒り卵状の粒を防げます。", "노른자 혼합물은 즉시 판독 온도계로 확인하고 계속 저어 온도를 고르게 하며 스크램블 조각이 생기지 않게 하세요.", "ใช้เทอร์โมมิเตอร์อ่านเร็ววัดส่วนผสมไข่แดงและตีต่อเนื่องให้อุณหภูมิสม่ำเสมอโดยไม่เป็นเม็ดไข่คน"),
      ml("Keep mascarpone and cream chilled until you are ready to whip and fold; cold dairy holds a stable, airy texture.", "馬斯卡彭乳酪與鮮奶油在打發、拌合前都保持冷藏，冷乳品較能維持穩定蓬鬆質地。", "マスカルポーネと生クリームは泡立て・混ぜ合わせる直前まで冷やしておくと、軽く安定した質感になります。", "마스카르포네와 생크림은 휘핑하고 섞기 직전까지 차게 두어야 가볍고 안정된 질감을 유지합니다.", "เก็บมาสคาร์โปเนและครีมให้เย็นจนถึงเวลาตีและตะล่อม นมเย็นช่วยให้เนื้อคงตัวและฟู"),
      ml("Dip each biscuit briefly and count them into two groups of 12 before layering; long soaking makes the base collapse.", "餅乾快速沾濕，並在疊層前分成兩組、每組 12 根；泡太久會讓底層塌陷。", "ビスケットは短く浸し、重ねる前に12本ずつ2組に分けます。長く浸すと土台が崩れます。", "비스킷은 짧게 적시고 쌓기 전에 12개씩 두 묶음으로 나누세요. 오래 담그면 바닥이 무너집니다.", "จุ่มบิสกิตเพียงสั้น ๆ และนับแบ่งสองชุด ชุดละ 12 ชิ้นก่อนเรียง แช่นานทำให้ฐานยุบ")
    ],
    mistakes: [
      ml("If the yolks begin to form grains, the water bath is too hot or the bowl is touching water; lift it off the heat, whisk briskly, then resume over gentler steam and verify 71°C/160°F before using.", "蛋黃開始結粒，代表水浴太熱或碗碰到水；先移離熱源快速攪打，再以更小的蒸氣續熱，確認達 71°C／160°F 後才使用。", "卵黄が粒状になり始めたら、湯せんが熱すぎるかボウルが湯に触れています。火から外して手早く混ぜ、弱い蒸気に戻し、使う前に71°C/160°Fを確認します。", "노른자가 알갱이로 굳기 시작하면 물이 너무 끓거나 볼이 물에 닿은 것입니다. 불에서 내려 빠르게 저은 다음 약한 김 위로 돌아가 71°C/160°F를 확인한 뒤 사용하세요.", "หากไข่แดงเริ่มเป็นเม็ด แสดงว่าอ่างน้ำร้อนเกินหรือก้นชามแตะน้ำ ยกลงจากไฟแล้วตีเร็ว ๆ จากนั้นอุ่นเหนือไออ่อนและยืนยัน 71°C/160°F ก่อนใช้"),
      ml("If the ladyfingers turn mushy, shorten each dip to a quick touch and assemble without pressing; the 6-hour chill will soften them further.", "若手指餅乾變糊，每次只快速碰一下咖啡並輕放疊層；6 小時冷藏還會讓餅乾繼續變軟。", "ビスケットが崩れる場合は浸す時間を短くし、押さずに重ねます。6時間の冷却中にもさらに柔らかくなります。", "레이디핑거가 흐물거리면 커피에 닿는 시간을 줄이고 누르지 말고 쌓으세요. 6시간 냉장 중 더 부드러워집니다.", "หากเลดี้ฟิงเกอร์เละ ให้แตะกาแฟเร็วขึ้นและประกอบโดยไม่กด ระหว่างแช่ 6 ชั่วโมงจะนิ่มขึ้นอีก")
    ],
    storage: ml(
      "Cover and refrigerate at 4°C/40°F or below within 2 hours of assembly; keep chilled while serving and return the dish promptly to the refrigerator. Use within 3–4 days. Do not leave this egg-and-dairy dessert at room temperature for more than 2 hours.",
      "組裝後 2 小時內加蓋冷藏於 4°C／40°F 以下；上桌期間持續冰涼，並儘快放回冰箱，3–4 天內食用。含蛋與乳品的甜點在室溫不可超過 2 小時。",
      "組み立て後2時間以内に覆って4°C/40°F以下で冷蔵します。提供中も冷やし、速やかに冷蔵庫へ戻して3〜4日以内に食べます。卵と乳製品を含むデザートを室温に2時間以上置きません。",
      "조립 후 2시간 안에 덮어서 4°C/40°F 이하로 냉장하고, 낼 때도 차게 유지한 뒤 곧바로 냉장고로 돌려보내 3–4일 안에 먹습니다. 달걀과 유제품 디저트를 실온에 2시간 넘게 두지 마세요.",
      "ปิดฝาแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมงหลังประกอบ เก็บให้เย็นระหว่างเสิร์ฟและนำกลับตู้เย็นทันที กินภายใน 3–4 วัน อย่าวางขนมที่มีไข่และนมไว้ที่อุณหภูมิห้องเกิน 2 ชั่วโมง"
    ),
    safetySources: [
      ["egg heating, refrigeration, serving, and leftover guidance", eggSafety],
      ["egg-dish temperature and reheating endpoints", porkTemperatures],
      ["two-hour limit and refrigerator temperature", handling],
      ["cold storage times for cooked egg dishes", coldStorage]
    ]
  });
}

export function refineEightyNinthMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseTacosAlPastor(byId.get("tacos-al-pastor"));
  reviseTiramisu(byId.get("tiramisu"));
}
