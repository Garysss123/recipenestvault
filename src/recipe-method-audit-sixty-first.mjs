const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, amount: typeof row.amount === "object" ? { ...row.amount } : row.amount, item: typeof row.item === "object" ? { ...row.item } : row.item })),
    instructions: recipe.instructions.map((step) => ({ ...step, title: { ...step.title }, body: { ...step.body } })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function body(recipe, index, localized) {
  recipe.instructions[index].body = localized;
}

function addOfficial(recipe, label, url) {
  const title = "Official food-safety guidance — " + label;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const flourSafety = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";

function revisePadSeeEw(recipe) {
  body(recipe, 0, ml(
    "Bring all 700 g fresh wide rice noodles to room temperature for about 20 minutes, then separate the sheets gently. If stuck, warm them covered for 20 seconds once and separate by hand; do not soak. This is a quality step, not a reason to leave the noodles out during cooking.",
    "將全部 700 公克新鮮寬米粉回溫約 20 分鐘，再輕輕分開麵片。若黏住，蓋好加熱 20 秒一次後用手分開；不要浸泡。這是口感步驟，不代表烹調時可久放室溫。",
    "生の幅広米麺700g全量を約20分室温に置いてから、麺をやさしくほぐします。くっついている場合は覆って20秒だけ温め、手で分けます。水に浸しません。これは食感のための工程で、調理中に長時間室温に置く意味ではありません。",
    "생 넓은 쌀국수 700g 전량을 약 20분 실온에 두어 풀기 쉽게 한 뒤 가닥을 부드럽게 분리한다. 붙어 있으면 덮어 20초만 데우고 손으로 푼다. 물에 담그지 않는다. 이는 식감을 위한 과정이지 조리 중 오래 실온에 두라는 뜻은 아니다.",
    "พักเส้นข้าวสดเส้นกว้าง 700 กรัมทั้งหมดที่อุณหภูมิห้องประมาณ 20 นาทีแล้วค่อยแยกแผ่นเบา ๆ หากติดกันให้ปิดฝาอุ่นเพียง 20 วินาทีหนึ่งครั้งแล้วแยกด้วยมือ อย่าแช่น้ำ ขั้นตอนนี้ช่วยเรื่องเนื้อสัมผัส ไม่ใช่การวางเส้นทิ้งไว้นอกตู้เย็นระหว่างทำอาหาร"
  ));
  body(recipe, 1, ml(
    "Whisk all 35 ml oyster sauce, 25 ml light soy, 15 ml Thai black soy, 10 ml fish sauce, 10 g sugar, and the listed 45 ml water until the sugar dissolves. Cut the 300 g Chinese broccoli stems into 5 mm pieces and keep them separate from the 6 cm leaves so each cooks for the right time.",
    "將全部 35 毫升蠔油、25 毫升淡醬油、15 毫升泰式黑醬油、10 毫升魚露、10 公克糖與所列 45 毫升水攪至糖溶。把 300 公克芥蘭梗切成 5 毫米片，與 6 公分葉片分開，讓兩者按所需時間下鍋。",
    "オイスターソース35ml全量、薄口しょうゆ25ml、タイの黒しょうゆ15ml、ナンプラー10ml、砂糖10g、水45ml全量を砂糖が溶けるまで混ぜます。芥藍300gの茎は5mm幅に切り、6cmの葉と分けて火の通り方に合わせます。",
    "굴소스 35ml 전량, 연간장 25ml, 태국식 흑간장 15ml, 피시소스 10ml, 설탕 10g, 물 45ml 전량을 설탕이 녹을 때까지 섞는다. 중국 브로콜리 300g의 줄기는 5mm로 썰고 6cm 잎과 따로 둬 익는 시간을 맞춘다.",
    "คนซอสหอยนางรม 35 มล.ทั้งหมด ซีอิ๊วขาว 25 มล. ซีอิ๊วดำไทย 15 มล. น้ำปลา 10 มล. น้ำตาล 10 กรัม และน้ำ 45 มล.ทั้งหมดจนละลาย หั่นก้านคะน้า 300 กรัมเป็นชิ้น 5 มม.และแยกจากใบยาว 6 ซม.เพื่อให้ลงกระทะตามเวลาที่เหมาะสม"
  ));
  body(recipe, 2, ml(
    "Heat a 32 cm wok over high heat for 2 minutes. Use 15 ml of the listed 45 ml oil for the pork. Divide the 350 g intact pork-loin slices into two 175 g batches; stir-fry each for an estimated 90 seconds per side. Time is only a starting estimate: check the thickest slice with a food thermometer at 63°C (145°F), then rest that batch on a clean plate for 3 minutes. These are whole-cut slices, not ground pork; if any piece is below the endpoint, return it to the wok in 30-second increments. Keep raw-pork utensils away from cooked food.",
    "以大火預熱 32 公分炒鍋 2 分鐘。所列 45 毫升油中取 15 毫升炒豬肉。將 350 公克完整豬里肌切片分成兩批，每批 175 公克，估計每面炒 90 秒。時間只是起始估算：用食物溫度計確認最厚肉片達 63°C（145°F），再放在乾淨盤上靜置 3 分鐘。這是完整肉塊切片，並非絞豬肉；未達標的肉片每次回鍋 30 秒再測。生豬肉器具不可接觸熟食。",
    "中華鍋を強火で2分予熱します。表示した油45mlのうち15mlを豚肉用に使います。豚ロースの薄切り350gを175gずつ2回に分け、片面約90秒ずつ炒めます。時間は開始時の目安です。食品用温度計で最も厚い肉片が63°C（145°F）に達したことを確認し、清潔な皿で3分休ませます。これはひき肉ではなく、塊肉を切ったものです。未達の肉片は30秒ずつ追加で炒めて再測定します。生肉用の器具を加熱済み食品に使いません。",
    "웍을 센 불로 2분 예열한다. 표시된 기름 45ml 중 15ml를 돼지고기에 쓴다. 통살 돼지 등심 350g을 175g씩 두 번 나누어 한 면당 약 90초 볶는다. 시간은 시작 추정치다. 식품용 온도계로 가장 두꺼운 조각이 63°C (145°F)에 도달했는지 확인한 뒤 깨끗한 접시에서 3분 쉰다. 이는 통살을 썬 것이며 다진 돼지고기가 아니다. 기준에 못 미친 조각은 30초씩 더 볶아 다시 잰다. 생고기 도구를 익힌 음식에 쓰지 않는다.",
    "ตั้งกระทะจีนไฟแรง 2 นาที ใช้น้ำมัน 15 มล.จากทั้งหมด 45 มล.กับหมู แบ่งเนื้อสันนอกหมูชิ้นเต็ม 350 กรัมเป็นสองชุด ชุดละ 175 กรัม ผัดด้านละประมาณ 90 วินาที เวลานี้เป็นเพียงค่าประมาณเริ่มต้น ใช้เทอร์โมมิเตอร์อาหารวัดชิ้นที่หนาที่สุดให้ถึง 63°C (145°F) แล้วพักบนจานสะอาด 3 นาที นี่คือหมูชิ้นเต็มที่หั่น ไม่ใช่หมูบด หากชิ้นใดยังไม่ถึงเกณฑ์ให้ผัดต่อครั้งละ 30 วินาทีแล้ววัดซ้ำ แยกอุปกรณ์หมูดิบจากอาหารสุก"
 ));
  body(recipe, 3, ml(
    "Add another 15 ml oil and the 20 g garlic; stir for about 15 seconds. Crack in all 3 eggs, wait 20 seconds, then fold into curds for an estimated 2–3 minutes until no liquid egg remains and the egg reaches 71°C (160°F). Add the 300 g broccoli stems and stir-fry 60–90 seconds until bright green and crisp-tender. The timer and colour guide texture; the egg-dish temperature is the safety check.",
    "再加 15 毫升油與全部 20 公克蒜末，炒約 15 秒。打入全部 3 顆蛋，等 20 秒後翻炒成蛋塊，估計 2–3 分鐘，至沒有流動蛋液且蛋達 71°C（160°F）。加入 300 公克芥蘭梗炒 60–90 秒，至鮮綠且脆嫩。計時與顏色只判斷口感；蛋料理溫度才是安全檢查。",
    "油15mlとにんにく20g全量を加え、約15秒炒めます。卵3個全量を割り入れ、20秒待ってからほぐし、液状の卵が残らず71°C（160°F）に達するまで約2〜3分を目安に炒めます。芥藍の茎300gを加え、鮮やかな緑で歯ごたえが残るまで60〜90秒炒めます。時間と色は食感の目安で、卵料理の温度が安全確認です。",
    "기름 15ml와 다진 마늘 20g 전량을 넣고 약 15초 볶는다. 달걀 3개 전량을 넣고 20초 둔 뒤 크게 저어 약 2–3분, 묽은 달걀이 남지 않고 71°C (160°F)에 도달할 때까지 익힌다. 중국 브로콜리 줄기 300g을 넣고 선명한 초록색과 아삭한 식감이 남도록 60–90초 볶는다. 시간과 색은 식감 기준이고 달걀 요리 온도가 안전 확인 기준이다.",
    "เติมน้ำมันอีก 15 มล.และกระเทียม 20 กรัมทั้งหมด ผัดประมาณ 15 วินาที ตอกไข่ 3 ฟองทั้งหมด รอ 20 วินาทีแล้วผัดให้เป็นก้อนประมาณ 2–3 นาทีจนไม่มีไข่เหลวและอุณหภูมิถึง 71°C (160°F) ใส่ก้านคะน้า 300 กรัม ผัด 60–90 วินาทีจนเขียวสดและกรอบนุ่ม เวลาและสีใช้ดูเนื้อสัมผัส ส่วนอุณหภูมิของเมนูไข่เป็นเกณฑ์ความปลอดภัย"
 ));
  body(recipe, 4, ml(
    "Use the remaining 15 ml oil for the noodles, measuring 7.5 ml for each of two rounds. Lay half of the 700 g noodles (350 g) flat in the hot wok; leave 45 seconds, turn once, then leave 30 seconds for dark blisters without breaking the strands. Repeat with the second half. These short times are texture estimates and depend on the wok recovering its heat.",
    "剩下的 15 毫升油用於炒麵，分兩次各量 7.5 毫升。將 700 公克麵條的一半（350 公克）平鋪入熱鍋，先不動 45 秒，翻一次再煎 30 秒，至有深色焦斑但麵條未斷。另一半同樣處理。短時間是口感估算，會受炒鍋回溫速度影響。",
    "残りの油15mlを麺に使い、2回分として各7.5mlに分けます。熱した中華鍋に麺700gの半量（350g）を広げ、45秒置き、一度返してさらに30秒焼き、麺を切らずに濃い焼き目を付けます。残りも同様にします。この短い時間は食感の目安で、鍋の温度の戻り方に左右されます。",
    "남은 기름 15ml는 면에 쓰고 두 번에 각각 7.5ml씩 나눈다. 뜨거운 웍에 면 700g의 절반(350g)을 펼쳐 45초 두고 한 번 뒤집어 30초 더 두어 면이 끊어지지 않게 짙은 그을림을 낸다. 나머지도 반복한다. 짧은 시간은 식감 추정치이며 웍이 다시 달궈지는 정도에 따라 달라진다.",
    "ใช้น้ำมันที่เหลือ 15 มล.กับเส้น แบ่งเป็นสองรอบ รอบละ 7.5 มล. วางเส้น 350 กรัมจากทั้งหมด 700 กรัมให้แบนในกระทะร้อน พัก 45 วินาที พลิกครั้งเดียวแล้วพักอีก 30 วินาทีให้เกิดรอยเกรียมเข้มโดยเส้นไม่ขาด ทำซ้ำกับเส้นที่เหลือ เวลาสั้นนี้เป็นค่าประมาณด้านเนื้อสัมผัสและขึ้นอยู่กับการคืนความร้อนของกระทะ"
  ));
  body(recipe, 5, ml(
    "Return all rested pork to the wok with the noodles. Add the 300 g broccoli leaves and pour in all prepared sauce around the hot edge. Toss over high heat for an estimated 60–90 seconds, until the leaves wilt and sauce coats the noodles with no pool at the bottom. If liquid remains, cook in 15-second increments; do not add extra sauce or water.",
    "將所有已靜置的豬肉與麵條放回鍋中。加入 300 公克芥蘭葉，沿鍋邊倒入全部醬汁。大火拌炒估計 60–90 秒，至葉片萎軟、醬汁裹住麵條且鍋底沒有積液。若仍有湯汁，每次續炒 15 秒；不要另加醬汁或水。",
    "休ませた豚肉を麺とともに鍋へ戻します。芥藍の葉300gを加え、用意したソース全量を鍋肌から注ぎます。強火で約60〜90秒炒め、葉がしんなりし、麺にソースが絡んで鍋底に液体が残らないようにします。水分が残る場合は15秒ずつ加熱します。ソースや水を追加しません。",
    "휴지한 돼지고기를 면과 함께 웍에 다시 넣는다. 중국 브로콜리 잎 300g을 넣고 준비한 소스 전량을 뜨거운 가장자리를 따라 붓는다. 센 불에서 약 60–90초 볶아 잎이 숨이 죽고 소스가 면에 코팅되어 바닥에 국물이 고이지 않게 한다. 액체가 남으면 15초씩 더 볶고 소스나 물을 추가하지 않는다.",
    "ใส่หมูที่พักแล้วกลับลงกระทะพร้อมเส้น ใส่ใบคะน้า 300 กรัมและราดซอสที่เตรียมไว้ทั้งหมดรอบขอบกระทะ ผัดไฟแรงประมาณ 60–90 วินาทีจนใบสลด ซอสเคลือบเส้นและไม่มีน้ำขังที่ก้นกระทะ หากยังมีน้ำให้ผัดต่อครั้งละ 15 วินาที อย่าเติมซอสหรือน้ำเพิ่ม"
  ));
  body(recipe, 6, ml(
    "Turn off the heat and fold in all 3 g white pepper. Divide among four warm plates: each gets about 175 g noodles, 87.5 g raw-weight pork before cooking, 75 g Chinese broccoli, and one quarter of the cooked eggs and sauce. Serve immediately while the noodle edges remain charred and the egg curds are set.",
    "關火，拌入全部 3 公克白胡椒。平均分成四盤：每盤約有 175 公克麵條、烹調前生重 87.5 公克豬肉、75 公克芥蘭，以及四分之一熟蛋與醬汁。趁麵條邊緣仍焦香、蛋塊已凝固時立即上桌。",
    "火を止め、白こしょう3g全量を混ぜます。温めた皿4枚に等分します。1皿あたり麺約175g、加熱前重量で豚肉87.5g、芥藍75g、炒めた卵とソース各4分の1です。麺の縁に焼き目が残り、卵が固まっているうちにすぐ出します。",
    "불을 끄고 흰 후추 3g 전량을 섞는다. 따뜻한 접시 네 개에 나눈다. 한 접시마다 면 약 175g, 조리 전 무게 기준 돼지고기 87.5g, 중국 브로콜리 75g, 익힌 달걀과 소스의 4분의 1씩 담는다. 면 가장자리에 그을림이 남고 달걀이 익었을 때 바로 낸다.",
    "ปิดไฟและคลุกพริกไทยขาว 3 กรัมทั้งหมด แบ่งใส่จานอุ่น 4 จานเท่า ๆ กัน แต่ละจานมีเส้นประมาณ 175 กรัม หมูดิบก่อนปรุง 87.5 กรัม คะน้า 75 กรัม และไข่กับซอสที่ปรุงแล้วอย่างละหนึ่งในสี่ เสิร์ฟทันทีขณะที่ขอบเส้นยังเกรียมและไข่เซตตัว"
  ));
  recipe.storage = ml(
    "Cool leftovers in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. For noodle texture, use within 2 days; this is a quality preference. FoodSafety.gov lists refrigerated cooked leftovers at 3–4 days. Reheat only the portion needed until the centre reaches 74°C/165°F; stir midway if microwaving.",
    "剩菜放入淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。為保持麵條口感，建議 2 天內食用；這是品質偏好。FoodSafety.gov 對冷藏熟食列為 3–4 天。只取所需份量復熱至中心 74°C/165°F；微波時中途攪拌。",
    "残りは浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。麺の食感を保つには2日以内がおすすめですが、これは品質上の目安です。FoodSafety.govは冷蔵した調理済み残り物を3〜4日としています。食べる分だけ中心が74°C/165°Fになるまで再加熱し、電子レンジなら途中で混ぜます。",
    "남은 음식은 얕은 용기에 나눠 담아 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 면 식감을 위해 2일 안에 먹는 것을 권하는데 이는 품질 선호다. FoodSafety.gov는 냉장 조리 음식 남은 것을 3–4일로 안내한다. 먹을 양만 중심이 74°C/165°F가 될 때까지 데우고 전자레인지라면 중간에 젓는다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เพื่อให้เส้นมีเนื้อสัมผัสดีควรกินภายใน 2 วัน ซึ่งเป็นคำแนะนำด้านคุณภาพ FoodSafety.gov ระบุอาหารปรุงสุกแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่ต้องการจนตรงกลางถึง 74°C/165°F หากใช้ไมโครเวฟให้คนกลางทาง"
  );
  recipe.sources.push({ title: "RecipeTin Eats — Pad See Ew (Thai Stir Fried Noodles)", url: "https://www.recipetineats.com/thai-stir-fried-noodles-pad-see-ew/" });
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: Egg Safety", eggSafety);
}

function reviseKalguksu(recipe) {
  body(recipe, 0, ml(
    "Dissolve 5 g of the listed 10 g salt in all 185 ml water. Mix with all 400 g flour and 10 ml oil until no dry patches remain. Flour is raw: do not taste the dough, wash hands and tools after handling it, and keep the dough covered.",
    "將所列 10 公克鹽中的 5 公克溶於全部 185 毫升水，再與全部 400 公克麵粉及 10 毫升油拌至沒有乾粉。麵粉是生食材：不要試吃麵糰，處理後洗手並清潔器具，麵糰要加蓋。",
    "表示した塩10gのうち5gを水185ml全量に溶かします。小麦粉400g全量と油10mlを加え、粉気がなくなるまで混ぜます。小麦粉は生の食材です。生地を味見せず、扱った後は手と器具を洗い、生地に覆いをします。",
    "표시된 소금 10g 중 5g을 물 185ml 전량에 녹인다. 밀가루 400g 전량과 기름 10ml를 넣어 마른 부분이 없을 때까지 섞는다. 밀가루는 날것이다. 생반죽을 맛보지 말고 다룬 뒤 손과 도구를 씻으며 반죽을 덮어 둔다.",
    "ละลายเกลือ 5 กรัมจากทั้งหมด 10 กรัมในน้ำ 185 มล.ทั้งหมด ผสมกับแป้ง 400 กรัมทั้งหมดและน้ำมัน 10 มล.จนไม่มีแป้งแห้ง แป้งดิบไม่ใช่อาหารพร้อมกิน อย่าชิมแป้ง ล้างมือและอุปกรณ์หลังสัมผัส และปิดคลุมแป้งไว้"
  ));
  body(recipe, 3, ml(
    "While the covered dough rests, place all 1.2 kg bone-in chicken thighs in a large pot with all 2.5 L cold water. Bring to a boil over medium heat; about 20 minutes is an estimate that varies with pot and burner. Skim the grey foam with a clean spoon before adding aromatics. Keep raw-chicken tools separate from the dough and vegetables.",
    "麵糰加蓋休息時，將全部 1.2 公斤帶骨雞腿與 2.5 公升冷水放入大鍋。中火煮至沸騰，約 20 分鐘只是估算，會隨鍋具與爐火而變。加入香料前用乾淨湯匙撇去灰色浮沫。生雞肉器具要與麵糰和蔬菜分開。",
    "生地を覆って休ませている間に、骨付き鶏もも肉1.2kg全量と冷水2.5L全量を大鍋に入れます。中火で沸騰させます。約20分は鍋や火力で変わる目安です。香味野菜を加える前に清潔なおたまで灰色の泡を取ります。生鶏肉の器具は生地や野菜と分けます。",
    "반죽을 덮어 쉬게 하는 동안 뼈 있는 닭다리 1.2kg 전량과 찬물 2.5L 전량을 큰 냄비에 넣는다. 중불로 끓인다. 약 20분은 냄비와 화력에 따라 달라지는 추정치다. 향채를 넣기 전에 깨끗한 숟가락으로 회색 거품을 걷는다. 생닭 도구를 반죽이나 채소와 분리한다.",
    "ระหว่างพักแป้งที่ปิดคลุม ใส่ไก่ติดกระดูก 1.2 กก.ทั้งหมดกับน้ำเย็น 2.5 ลิตรทั้งหมดลงหม้อใหญ่ ต้มไฟกลางจนเดือด ประมาณ 20 นาทีเป็นเพียงค่าประมาณซึ่งขึ้นกับหม้อและเตา ช้อนฟองสีเทาด้วยช้อนสะอาดก่อนเติมเครื่องหอม แยกอุปกรณ์ไก่ดิบจากแป้งและผัก"
  ));
  body(recipe, 4, ml(
    "Add 150 g of the listed onion, all garlic, and all ginger. Lower to a gentle simmer, cover slightly ajar, and cook for an estimated 35–45 minutes. Check the thickest thigh at the centre without touching bone: poultry must reach 74°C (165°F). If it is below that, simmer in 5-minute increments and recheck; easy-moving joints are a tenderness cue, not the safety check.",
    "加入所列洋蔥中的 150 公克、全部蒜頭與全部薑。轉小火微滾，鍋蓋留縫，估計煮 35–45 分鐘。用溫度計測最厚雞腿中心且不碰骨頭；禽肉須達 74°C（165°F）。若未達，每次續煮 5 分鐘再測；關節容易活動是嫩度指標，不是安全檢查。",
    "表示した玉ねぎのうち150g、にんにく全量、しょうが全量を加えます。弱い沸騰にし、ふたを少しずらして35〜45分を目安に煮ます。骨に触れないよう、最も厚いももの中心を測ります。鶏肉は74°C（165°F）が必要です。未達なら5分ずつ煮て再測定します。関節の動きやすさは柔らかさの目安で、安全確認ではありません。",
    "표시된 양파 중 150g, 마늘 전량, 생강 전량을 넣는다. 약하게 끓이고 뚜껑을 살짝 열어 35–45분을 추정치로 익힌다. 뼈에 닿지 않게 가장 두꺼운 닭다리 중심을 잰다. 가금류는 74°C (165°F)에 도달해야 한다. 미달이면 5분씩 더 끓여 다시 잰다. 관절이 쉽게 움직이는 것은 부드러움 기준이지 안전 확인 기준이 아니다.",
    "ใส่หอมหัวใหญ่ 150 กรัมจากที่ระบุ กระเทียมทั้งหมด และขิงทั้งหมด ลดเป็นไฟอ่อนให้เดือดปุด ปิดฝาแง้มและเคี่ยวประมาณ 35–45 นาที วัดตรงกลางชิ้นสะโพกที่หนาที่สุดโดยไม่ให้หัววัดแตะกระดูก เนื้อสัตว์ปีกต้องถึง 74°C (165°F) หากยังไม่ถึงให้เคี่ยวเพิ่มครั้งละ 5 นาทีแล้ววัดซ้ำ ข้อต่อที่ขยับง่ายเป็นสัญญาณความนุ่ม ไม่ใช่การตรวจความปลอดภัย"
 ));
  body(recipe, 6, ml(
    "Once the chicken is cooked, move it with clean tongs to a clean tray. When cool enough to handle, remove skin and bones and shred all meat into 1 cm strands. Keep it covered; wash hands and sanitize the board and knife used for raw chicken before using them again.",
    "雞肉煮熟後用乾淨夾子移到乾淨托盤。降至可用手處理時去皮去骨，將全部肉撕成 1 公分細絲並加蓋。再次使用生雞肉的砧板與刀具前，先洗手並清潔消毒。",
    "鶏肉に火が通ったら清潔なトングで清潔なトレーへ移します。触れる温度まで冷めたら皮と骨を取り除き、肉全量を1cm幅に裂いて覆います。生鶏肉に使ったまな板と包丁を再使用する前に手を洗い、器具を洗浄・消毒します。",
    "닭이 익으면 깨끗한 집게로 깨끗한 쟁반에 옮긴다. 만질 수 있을 만큼 식으면 껍질과 뼈를 제거하고 모든 살을 1cm 가닥으로 찢어 덮어 둔다. 생닭에 쓴 도마와 칼을 다시 쓰기 전에 손을 씻고 도구를 세척·소독한다.",
    "เมื่อไก่สุกแล้วใช้คีมสะอาดย้ายลงถาดสะอาด พอเย็นพอจับได้ให้เอาหนังและกระดูกออก ฉีกเนื้อทั้งหมดเป็นเส้นกว้าง 1 ซม.แล้วปิดคลุม ล้างมือและล้างฆ่าเชื้อเขียงกับมีดที่ใช้กับไก่ดิบก่อนนำกลับมาใช้"
  ));
  body(recipe, 9, ml(
    "Bring all 1.8 L strained broth back to a boil. Add all 250 g potato half-moons and the remaining 100 g onion; simmer 6 minutes, until a knife enters the potato with slight resistance. This is the vegetable timing cue; keep the broth hot while the noodles are cut.",
    "將全部 1.8 公升過濾高湯重新煮沸。加入全部 250 公克馬鈴薯半月片及剩下 100 公克洋蔥，煮 6 分鐘，至刀尖插入馬鈴薯仍略有阻力。這是蔬菜熟度指標；切麵期間保持高湯熱度。",
    "こしたスープ1.8L全量を再び沸騰させます。じゃがいも250g全量と残りの玉ねぎ100gを加え、ナイフが少し抵抗を感じながら入るまで6分煮ます。これは野菜の火通りの目安です。麺を切る間もスープを熱く保ちます。",
    "거른 육수 1.8L 전량을 다시 끓인다. 감자 반달 250g 전량과 남은 양파 100g을 넣고 칼이 약간 저항을 느끼며 들어갈 때까지 6분 끓인다. 이는 채소 익힘 기준이다. 면을 자르는 동안 육수를 뜨겁게 유지한다.",
    "ต้มน้ำซุปที่กรองแล้ว 1.8 ลิตรทั้งหมดให้เดือดอีกครั้ง ใส่มันฝรั่งครึ่งวง 250 กรัมทั้งหมดกับหอมหัวใหญ่ที่เหลือ 100 กรัม เคี่ยว 6 นาทีจนมีดแทงมันฝรั่งได้แต่ยังมีแรงต้านเล็กน้อย นี่เป็นเกณฑ์ความสุกของผักและให้รักษาน้ำซุปให้ร้อนระหว่างตัดเส้น"
  ));
  body(recipe, 10, ml(
    "Shake excess dusting flour from all cut noodles. Add them in two equal batches to the boiling broth, scattering each batch gradually and stirring once from the base. After the first batch is fully submerged, wait for the boil to return before adding the second; this keeps the broth from cooling and the noodles from clumping.",
    "抖掉所有切好麵條多餘的手粉。分兩等份加入沸騰高湯，每次慢慢撒入並從鍋底攪一次。第一批完全浸入後，等高湯再次沸騰才加第二批，避免湯降溫及麵條結團。",
    "切った麺全量の余分な打ち粉を振り落とします。沸騰したスープに2等分して入れ、各回少しずつ散らし、鍋底から一度混ぜます。1回目が完全に沈んだら、再沸騰してから2回目を加えます。スープの温度低下と麺のかたまりを防げます。",
    "잘라 둔 면 전체의 여분 덧가루를 털어낸다. 끓는 육수에 두 번으로 똑같이 나눠 조금씩 흩뿌려 넣고 바닥을 한 번 젓는다. 첫 번째 면이 모두 잠긴 뒤 다시 끓어오르면 두 번째 면을 넣어 육수가 식거나 면이 뭉치지 않게 한다.",
    "สะบัดแป้งนวลส่วนเกินออกจากเส้นที่ตัดทั้งหมด แบ่งเป็นสองชุดเท่า ๆ กัน ใส่ทีละน้อยลงในน้ำซุปเดือดและคนจากก้นหม้อหนึ่งครั้ง เมื่อชุดแรกจมหมดแล้วรอให้น้ำซุปกลับมาเดือดก่อนใส่ชุดที่สอง เพื่อไม่ให้น้ำซุปเย็นลงและเส้นจับตัวกัน"
  ));
  body(recipe, 11, ml(
    "Once the broth returns to a steady boil, simmer the noodles for an estimated 4–6 minutes, stirring gently once a minute. Test a thick strand: it should be tender with a resilient centre and no pale raw-flour line. The clock is a texture estimate, not a safety endpoint; add 60 ml hot water only if the broth thickens before the noodles are ready.",
    "高湯恢復穩定沸騰後，麵條估計再煮 4–6 分鐘，每分鐘輕攪一次。試一條較粗的麵：應熟軟有彈性，中心沒有白色生粉線。計時是口感估算，不是安全熟度標準；若麵熟前湯已變稠，只加 60 毫升熱水。",
    "スープが安定して沸騰したら麺を4〜6分を目安に煮て、1分ごとにやさしく混ぜます。太めの麺を試し、中心に白い生粉の筋がなく、しなやかで弾力がある状態にします。時間は食感の目安で、安全基準ではありません。麺が煮える前に濃くなった場合のみ熱湯60mlを加えます。",
    "육수가 다시 안정적으로 끓으면 면을 약 4–6분 익히고 매분 부드럽게 한 번 젓는다. 굵은 면 한 가닥을 시험해 가운데에 흰 생밀가루 선이 없고 부드럽고 탄력이 있어야 한다. 시간은 식감 추정치이지 안전 기준이 아니다. 면이 익기 전에 국물이 너무 걸쭉해질 때만 뜨거운 물 60ml를 넣는다.",
    "เมื่อน้ำซุปกลับมาเดือดสม่ำเสมอ เคี่ยวเส้นประมาณ 4–6 นาที คนเบา ๆ ทุกนาที ลองเส้นที่หนาที่สุด เส้นควรนุ่มแต่ยังยืดหยุ่นและไม่มีเส้นแป้งดิบสีซีดตรงกลาง เวลาเป็นค่าประมาณด้านเนื้อสัมผัส ไม่ใช่เกณฑ์ความปลอดภัย เติมน้ำร้อน 60 มล.เฉพาะเมื่อน้ำซุปข้นก่อนเส้นสุก"
  ));
  body(recipe, 12, ml(
    "Add all 220 g zucchini and all shredded chicken. Simmer about 3 minutes until the zucchini is just tender. If the cooked chicken has cooled before this step, stir until the chicken throughout reaches 74°C (165°F); this is the reheating endpoint. If it stayed hot, keep it at a simmer. Do not judge the chicken by the 3-minute estimate alone.",
    "加入全部 220 公克櫛瓜與全部雞絲，約煮 3 分鐘至櫛瓜剛熟。若熟雞肉在此步驟前已冷卻，攪拌加熱至雞肉各處達 74°C（165°F）；這是復熱標準。若雞肉仍熱，維持微滾即可。不可只以 3 分鐘估算雞肉安全。",
    "ズッキーニ220g全量と裂いた鶏肉全量を加え、ズッキーニがちょうど柔らかくなるまで約3分煮ます。鶏肉がこの工程前に冷めていた場合は、全体が74°C（165°F）になるまで混ぜながら再加熱します。これは再加熱の基準です。まだ熱ければ弱く煮立てます。3分という目安だけで鶏肉の安全を判断しません。",
    "애호박 220g 전량과 찢은 닭고기 전량을 넣고 애호박이 막 부드러워질 때까지 약 3분 끓인다. 이 단계 전에 익힌 닭고기가 식었다면 전체가 74°C (165°F)에 도달할 때까지 저어가며 데운다. 이는 재가열 기준이다. 아직 뜨거우면 약하게 끓는 상태를 유지한다. 3분 추정치만으로 닭고기 안전을 판단하지 않는다.",
    "ใส่ซูกินี 220 กรัมทั้งหมดและเนื้อไก่ฉีกทั้งหมด เคี่ยวประมาณ 3 นาทีจนซูกินีนุ่มพอดี หากไก่ที่ปรุงสุกเย็นลงก่อนขั้นตอนนี้ ให้คนระหว่างอุ่นจนไก่ทั่วถึง 74°C (165°F) ซึ่งเป็นเกณฑ์การอุ่นซ้ำ หากยังร้อนให้รักษาไฟให้น้ำซุปเดือดปุด อย่าใช้เวลา 3 นาทีเพียงอย่างเดียวตัดสินความปลอดภัยของไก่"
  ));
  body(recipe, 13, ml(
    "Stir in all 25 ml soup soy sauce, the remaining 5 g salt, all 2 g pepper, and all 60 g scallions; simmer 1 minute. Divide into four bowls. Each receives one quarter of the homemade noodles and cooked chicken, about 450 ml broth, 62.5 g potato, 55 g zucchini, and 15 g scallions; the 1.2 kg bone-in chicken is measured before cooking. Serve immediately so the noodles stay springy.",
    "拌入全部 25 毫升湯用醬油、剩下 5 公克鹽、全部 2 公克胡椒與全部 60 公克蔥花，煮 1 分鐘。分成四碗：每碗各取四分之一自製麵條與雞肉、約 450 毫升高湯、62.5 公克馬鈴薯、55 公克櫛瓜及 15 公克蔥花；1.2 公斤帶骨雞肉為烹調前重量。立即上桌，保持麵條彈性。",
    "スープ用しょうゆ25ml全量、残りの塩5g、こしょう2g全量、ねぎ60g全量を加え、1分煮ます。4杯に分け、各杯に手打ち麺と鶏肉の4分の1、スープ約450ml、じゃがいも62.5g、ズッキーニ55g、ねぎ15gを入れます。骨付き鶏肉1.2kgは加熱前の重量です。麺の弾力を保つためすぐに出します。",
    "국간장 25ml 전량, 남은 소금 5g, 후추 2g 전량, 대파 60g 전량을 넣고 1분 끓인다. 네 그릇에 나눈다. 각 그릇에 수제 면과 익힌 닭고기의 4분의 1, 육수 약 450ml, 감자 62.5g, 애호박 55g, 대파 15g씩 담는다. 뼈 있는 닭고기 1.2kg은 조리 전 무게다. 면이 탄력 있을 때 바로 낸다.",
    "คนซีอิ๊วสำหรับซุป 25 มล.ทั้งหมด เกลือที่เหลือ 5 กรัม พริกไทย 2 กรัมทั้งหมด และต้นหอม 60 กรัมทั้งหมดลงไป เคี่ยว 1 นาที แบ่งเป็น 4 ชาม แต่ละชามได้เส้นทำเองและไก่ที่ปรุงแล้วอย่างละหนึ่งในสี่ น้ำซุปประมาณ 450 มล. มันฝรั่ง 62.5 กรัม ซูกินี 55 กรัม และต้นหอม 15 กรัม ไก่ติดกระดูก 1.2 กก.เป็นน้ำหนักก่อนปรุง เสิร์ฟทันทีเพื่อให้เส้นยังเหนียวนุ่ม"
 ));
  recipe.storage = ml(
    "For the best noodle texture, store noodles separately from broth, chicken, and vegetables. Cool components in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. Use within 2 days for quality; FoodSafety.gov lists cooked soups and leftovers at 3–4 days. Reheat broth and chicken until the centre reaches 74°C/165°F, then add freshly cooked noodles.",
    "為保持麵條口感，麵條與高湯、雞肉、蔬菜分開保存。各組分裝淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。為口感建議 2 天內食用；FoodSafety.gov 對熟湯與剩菜列為 3–4 天。高湯與雞肉復熱至中心 74°C/165°F，再加入現煮麵條。",
    "麺の食感を保つため、麺はスープ、鶏肉、野菜と分けて保存します。各材料を浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質のため2日以内がおすすめですが、FoodSafety.govは調理済みスープと残り物を3〜4日としています。スープと鶏肉は中心が74°C/165°Fになるまで再加熱し、新しくゆでた麺を合わせます。",
    "면 식감을 위해 면을 육수·닭고기·채소와 따로 보관한다. 재료를 얕은 용기에 나눠 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 품질을 위해 2일 안에 먹는 것이 좋지만 FoodSafety.gov는 조리된 수프와 남은 음식을 3–4일로 안내한다. 육수와 닭고기는 중심이 74°C/165°F가 될 때까지 데운 뒤 새로 삶은 면을 넣는다.",
    "เพื่อรักษาเนื้อสัมผัสให้เก็บเส้นแยกจากน้ำซุป ไก่ และผัก แบ่งส่วนประกอบใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เพื่อคุณภาพที่ดีควรกินภายใน 2 วัน ส่วน FoodSafety.gov ระบุซุปปรุงสุกและอาหารเหลือ 3–4 วัน อุ่นน้ำซุปและไก่จนตรงกลางถึง 74°C/165°F แล้วใส่เส้นที่ต้มใหม่"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: Flour Is a Raw Food", flourSafety);
}

function revisePhoBo(recipe) {
  const sirloin = recipe.ingredients.find((row) => row.item.en.startsWith("beef sirloin"));
  if (!sirloin) throw new Error("Recipe method audit 61: pho-bo is missing sirloin");
  sirloin.item = ml(
    "beef sirloin, one intact 2.5 cm steak; slice after cooking",
    "牛沙朗整塊厚 2.5 公分；煮熟後再切片",
    "牛サーロイン1枚（厚さ2.5cm）；加熱後に薄切り",
    "소 채끝살 통스테이크 1장(두께 2.5cm); 익힌 뒤 얇게 썬다",
    "เนื้อสันนอกวัวชิ้นเต็มหนา 2.5 ซม. หั่นบางหลังปรุงสุก"
  );
  body(recipe, 1, ml(
    "Return all 1.5 kg blanched bones to the clean pot with the 700 g whole brisket and all 4.5 L stock water. Bring just to a boil, skim, then keep a gentle 90–95°C simmer for about 6 hours, topping up only with hot water to keep bones submerged. Six hours is a broth-flavour estimate, not a meat-safety endpoint; use a thermometer for the beef checks below.",
    "將全部 1.5 公斤汆燙骨頭、700 公克整塊牛胸肉與全部 4.5 公升煮湯用水放回乾淨鍋中。煮至剛沸騰後撇沫，以 90–95°C 微滾約 6 小時，若要補水只加熱水並保持骨頭浸沒。六小時是湯味估算，不是肉類安全熟度標準；下列牛肉需用溫度計確認。",
    "下処理した骨1.5kg全量、ブリスケット700g一塊、水4.5L全量を清潔な鍋に戻します。沸騰直前まで熱して泡を取り、90〜95°Cの弱い沸騰で約6時間煮ます。骨が浸かるよう補水する場合は熱湯だけを使います。6時間はスープの風味の目安で、肉の安全基準ではありません。以下の牛肉確認には温度計を使います。",
    "손질한 뼈 1.5kg 전량, 통 양지 700g, 육수용 물 4.5L 전량을 깨끗한 냄비에 다시 넣는다. 끓기 직전까지 올려 거품을 걷고 90–95°C로 약하게 약 6시간 끓인다. 뼈가 잠기도록 보충할 때는 뜨거운 물만 쓴다. 6시간은 육수 풍미 추정치이지 고기 안전 기준이 아니다. 아래 고기 확인에는 온도계를 사용한다.",
    "ใส่กระดูกที่ลวกแล้ว 1.5 กก.ทั้งหมด เนื้ออกวัวชิ้นเต็ม 700 กรัม และน้ำสำหรับน้ำซุป 4.5 ลิตรทั้งหมดกลับลงหม้อสะอาด ต้มจนเกือบเดือด ช้อนฟอง แล้วเคี่ยวเบา ๆ ที่ 90–95°C ประมาณ 6 ชั่วโมง หากเติมน้ำให้ใช้แต่น้ำร้อนเพื่อให้กระดูกจม เวลา 6 ชั่วโมงเป็นค่าประมาณเพื่อรสน้ำซุป ไม่ใช่เกณฑ์ความปลอดภัยของเนื้อ ตรวจเนื้อด้วยเทอร์โมมิเตอร์ตามขั้นตอนถัดไป"
  ));
  body(recipe, 2, ml(
    "After an estimated 2½–3 hours, check the brisket: a skewer should enter with little resistance (tenderness cue). Also measure the thickest centre; intact whole-cut beef must reach 63°C (145°F), then rest 3 minutes. Lift it with clean tongs into a shallow container with a little broth and refrigerate promptly, within 2 hours of removal; do not wait for it to cool fully on the counter. The bones continue simmering.",
    "估計燉 2½–3 小時後檢查牛胸肉：竹籤應可輕易插入（嫩度指標）。也要測量最厚中心；完整牛肉須達 63°C（145°F），再靜置 3 分鐘。用乾淨夾子取出，放入淺容器並加少量高湯，取出後 2 小時內盡快冷藏；不要在檯面等完全冷卻。骨頭繼續燉煮。",
    "約2時間半〜3時間煮た後、ブリスケットを確認します。串がほとんど抵抗なく入ることが柔らかさの目安です。最も厚い中心温度も測り、塊のままの牛肉は63°C（145°F）に達した後3分休ませます。清潔なトングで少量のスープとともに浅い容器へ移し、取り出してから2時間以内に速やかに冷蔵します。室温で完全に冷めるまで待ちません。骨は煮続けます。",
    "약 2시간 반–3시간 끓인 뒤 양지에 꼬치가 거의 저항 없이 들어가는지 확인한다(부드러움 기준). 가장 두꺼운 중심 온도도 잰다. 통살 소고기는 63°C (145°F)에 도달한 뒤 3분 휴지한다. 깨끗한 집게로 국물을 조금 담은 얕은 용기에 옮겨 꺼낸 후 2시간 안에 바로 냉장한다. 조리대에서 완전히 식기를 기다리지 않는다. 뼈는 계속 끓인다.",
    "หลังเคี่ยวประมาณ 2½–3 ชั่วโมง ให้ตรวจอกวัว ไม้เสียบควรแทงเข้าได้โดยแทบไม่มีแรงต้าน (เกณฑ์ความนุ่ม) และวัดตรงกลางส่วนที่หนาที่สุดด้วย เนื้อวัวชิ้นเต็มต้องถึง 63°C (145°F) แล้วพัก 3 นาที ใช้คีมสะอาดย้ายใส่ภาชนะตื้นพร้อมน้ำซุปเล็กน้อยและแช่เย็นทันทีภายใน 2 ชั่วโมงหลังนำออก อย่ารอให้เย็นสนิทบนเคาน์เตอร์ ส่วนกระดูกเคี่ยวต่อ"
  ));
  body(recipe, 5, ml(
    "After 6 hours total, strain the broth without pressing the solids. Skim excess fat but leave a thin sheen. Measure 3 L broth for six bowls, adding hot water only if needed; stir in all 35 ml fish sauce and 15 g rock sugar, then simmer 5 minutes to dissolve. The 3 L yield is about 500 ml broth per serving.",
    "總燉煮 6 小時後過濾高湯，不要擠壓固形物。撈除多餘油脂但保留薄薄油層。量出六碗所需 3 公升高湯，不足時只加熱水；加入全部 35 毫升魚露與 15 公克冰糖，再煮 5 分鐘至溶解。3 公升約為每份 500 毫升。",
    "合計6時間煮たら、固形物を押さずにスープをこします。脂は取り過ぎず、薄い膜を残します。6杯分として3Lを量り、不足時は熱湯のみ加えます。ナンプラー35ml全量と氷砂糖15g全量を混ぜ、溶けるまで5分煮ます。3Lは1人約500mlです。",
    "총 6시간 끓인 뒤 건더기를 누르지 말고 육수를 거른다. 기름을 너무 많이 걷지 말고 얇은 막은 남긴다. 여섯 그릇에 쓸 육수 3L를 재고 부족하면 뜨거운 물만 보충한다. 피시소스 35ml 전량과 각설탕 15g 전량을 섞고 녹도록 5분 끓인다. 3L는 한 그릇당 약 500ml다.",
    "เมื่อเคี่ยวครบ 6 ชั่วโมง กรองน้ำซุปโดยไม่กดของแข็ง ช้อนไขมันส่วนเกินแต่เหลือฟิล์มบาง ๆ ตวงน้ำซุป 3 ลิตรสำหรับ 6 ชาม หากไม่พอให้เติมแต่น้ำร้อน ใส่น้ำปลา 35 มล.ทั้งหมดและน้ำตาลกรวด 15 กรัมทั้งหมด เคี่ยว 5 นาทีให้ละลาย น้ำซุป 3 ลิตรคิดเป็นประมาณ 500 มล.ต่อที่"
  ));
  body(recipe, 6, ml(
    "Cook all 450 g dried pho noodles in a separate pot for the package time (usually 4–6 minutes), until pliable with no hard centre. Drain and divide into six warm bowls: 75 g dry noodles per serving. Blanch all 200 g sprouts in fresh boiling water for 60 seconds, drain, and keep them away from the raw-beef plate.",
    "將全部 450 公克乾河粉另鍋依包裝時間煮熟（通常 4–6 分鐘），至柔軟且中心沒有硬芯。瀝乾後分入六個溫碗，每份烹煮前 75 公克乾麵。全部 200 公克豆芽以新沸水汆燙 60 秒後瀝乾，並與生牛肉盤分開。",
    "乾燥フォー450g全量を別鍋で表示時間（通常4〜6分）ゆで、硬い芯がなく柔らかくなったら湯を切ります。温めた6杯に分け、乾麺で1杯75gです。もやし200g全量は新しい湯で60秒ゆでて湯を切り、生の牛肉の皿から離しておきます。",
    "마른 포 쌀국수 450g 전량을 별도 냄비에서 포장 시간(보통 4–6분) 삶아 딱딱한 심이 없이 부드러워지면 물을 뺀다. 따뜻한 그릇 여섯 개에 나눈다. 건면 기준 한 그릇에 75g이다. 숙주 200g 전량을 새 끓는 물에 60초 데쳐 물을 빼고 생고기 접시와 분리해 둔다.",
    "ต้มเส้นเฝอแห้ง 450 กรัมทั้งหมดในหม้อแยกตามเวลาบนห่อ (โดยทั่วไป 4–6 นาที) จนนุ่มและไม่มีไตแข็ง สะเด็ดน้ำและแบ่งใส่ชามอุ่น 6 ใบ เส้นแห้งก่อนต้มชามละ 75 กรัม ลวกถั่วงอก 200 กรัมทั้งหมดในน้ำเดือดใหม่ 60 วินาที สะเด็ดน้ำและแยกจากจานเนื้อดิบ"
  ));
  body(recipe, 7, ml(
    "Slice the chilled cooked 700 g brisket about 3 mm across the grain. Keep the intact 250 g sirloin steak on a separate covered plate in the refrigerator until cooking. Prepare the 100 g sliced onion, scallions, herbs, lime, and optional chile with clean tools; never put ready-to-eat garnishes on the raw-beef plate.",
    "將冷藏熟牛胸肉 700 公克逆紋切成約 3 毫米片。250 公克完整牛沙朗另放有蓋盤冷藏至烹調。用乾淨器具備好 100 公克洋蔥絲、蔥花、香草、萊姆與可選辣椒；即食配料不可放在生牛肉盤上。",
    "冷やした調理済みブリスケット700gを繊維に逆らって約3mmに切ります。サーロイン250gの塊肉は別の覆い付き皿に載せ、調理するまで冷蔵します。薄切り玉ねぎ100g、ねぎ、香草、ライム、好みで唐辛子を清潔な器具で準備し、すぐ食べる薬味を生肉の皿に置きません。",
    "차갑게 식힌 익힌 양지 700g을 결 반대로 약 3mm로 썬다. 통 등심 250g은 덮은 별도 접시에 두고 조리 전까지 냉장한다. 양파채 100g, 대파, 허브, 라임, 선택 고추를 깨끗한 도구로 준비하고 바로 먹는 고명을 생고기 접시에 놓지 않는다.",
    "หั่นอกวัวสุกที่แช่เย็น 700 กรัมขวางเส้นใยหนาประมาณ 3 มม. วางเนื้อสันนอกชิ้นเต็ม 250 กรัมบนจานที่ปิดคลุมแยกต่างหากและแช่เย็นจนกว่าจะปรุง เตรียมหอมหัวใหญ่ซอย 100 กรัม ต้นหอม สมุนไพร มะนาว และพริกตามชอบด้วยอุปกรณ์สะอาด อย่าวางเครื่องเคียงพร้อมกินบนจานเนื้อดิบ"
 ));
  body(recipe, 8, ml(
    "Bring the seasoned broth to a boil, then lower it to a steady simmer. Reheat the cooked brisket in a small batch until it reaches 74°C (165°F); this is the leftover-reheating endpoint. Separately poach the intact, non-ground 250 g sirloin steak, about 2.5 cm thick, in the simmering broth for an estimated 8–12 minutes, turning once. Time is only a tenderness estimate: while the steak is still whole, measure its thickest centre with a food thermometer; it must reach 63°C (145°F), then rest on a clean plate for 3 minutes. If below the endpoint, return it to the simmer in 1-minute increments and recheck. Slice thinly across the grain after resting; never treat hot broth poured over raw slices as cooking.",
    "將調味高湯煮沸後轉為穩定小滾。分批放入熟牛胸肉復熱至 74°C（165°F）；這是熟剩菜復熱標準。另將完整、非絞肉、厚約 2.5 公分的 250 公克牛沙朗整塊放入小滾高湯汆煮，估計 8–12 分鐘，中途翻面一次。時間只是嫩度估算：牛肉仍為整塊時用食物溫度計測最厚中心；須達 63°C（145°F），再放在乾淨盤上靜置 3 分鐘。未達標則每次回鍋續煮 1 分鐘並重測。靜置後逆紋切薄片；不可把熱高湯淋在生肉片上當作烹煮。",
    "味付けしたスープを沸騰させてから、安定した弱火の沸騰にします。調理済みブリスケットは少量ずつ入れ、74°C（165°F）まで再加熱します。これは残り物の再加熱基準です。別に、ひき肉ではない厚さ約2.5cmのサーロイン250gを塊のまま弱く煮ます。途中で一度返し、約8〜12分を目安にします。時間は柔らかさの目安にすぎません。肉が塊のままのうちに食品用温度計で最も厚い中心を測り、63°C（145°F）に達した後、清潔な皿で3分休ませます。未達なら1分ずつ追加して再測定します。休ませてから繊維を断つよう薄切りにします。生肉に熱いスープを注ぐだけでは調理になりません。",
    "간을 맞춘 육수를 끓인 뒤 계속 끓는 약불로 낮춘다. 익힌 양지는 소량씩 넣어 74°C (165°F)까지 데운다. 이는 남은 음식 재가열 기준이다. 별도로 다진 고기가 아닌 두께 약 2.5cm의 등심 250g 통스테이크를 약불 육수에서 약 8–12분 추정치로 삶고 중간에 한 번 뒤집는다. 시간은 부드러움 추정치일 뿐이다. 스테이크가 통살인 상태에서 식품용 온도계로 가장 두꺼운 중심을 재어 63°C (145°F)에 도달했는지 확인한 뒤 깨끗한 접시에서 3분 쉰다. 미달이면 1분씩 더 끓여 다시 잰다. 휴지 후 결 반대로 얇게 썬다. 생고기 조각 위에 뜨거운 육수를 붓는 것만으로 조리했다고 보지 않는다.",
    "ต้มน้ำซุปที่ปรุงรสแล้ว จากนั้นลดเป็นเคี่ยวเบา ๆ อย่างสม่ำเสมอ อุ่นอกวัวที่ปรุงสุกแล้วทีละชุดจนถึง 74°C (165°F) ซึ่งเป็นเกณฑ์การอุ่นอาหารเหลือ แยกกันต้มเนื้อสันนอกชิ้นเต็ม 250 กรัม หนาประมาณ 2.5 ซม.ในน้ำซุปที่เคี่ยวเบา ๆ ประมาณ 8–12 นาทีเป็นค่าประมาณ และกลับด้านหนึ่งครั้ง เวลาเป็นเพียงค่าประมาณเพื่อความนุ่ม ขณะเนื้อยังเป็นชิ้นเต็ม ใช้เทอร์โมมิเตอร์อาหารวัดตรงกลางส่วนที่หนาที่สุดให้ถึง 63°C (145°F) แล้วพักบนจานสะอาด 3 นาที หากยังไม่ถึงเกณฑ์ให้นำกลับไปเคี่ยวครั้งละ 1 นาทีแล้ววัดใหม่ หลังพักให้หั่นบางขวางเส้นใย อย่าถือว่าการราดน้ำซุปร้อนบนเนื้อดิบที่หั่นบางคือการปรุงสุก"
  ));
  body(recipe, 9, ml(
    "While the sirloin rests, bring the serving broth back to a boil. Divide the cooked brisket and rested sirloin among six noodle bowls, about 117 g brisket and 42 g raw-weight sirloin per serving before cooking. Add sprouts, all 100 g thin onion, scallions, herbs, and pepper. Ladle 500 ml boiling broth into each bowl; serve lime and optional chile alongside. Assemble only after both meats have passed their separate checks.",
    "牛里肌靜置時，將供應用高湯重新煮沸。將熟牛胸肉與靜置好的牛里肌分配至六碗麵，每份烹調前約有 117 公克牛胸肉與 42 公克牛里肌。加入豆芽、全部 100 公克洋蔥絲、蔥花、香草與胡椒。每碗淋入 500 毫升沸騰高湯，旁邊附萊姆及可選辣椒。兩種肉分別確認熟度後才組碗。",
    "サーロインを休ませている間に、提供用のスープを再び沸騰させます。調理済みブリスケットと休ませたサーロインを6杯に分けます。加熱前の重量で、1杯あたりブリスケット約117g、サーロイン約42gです。もやし、薄切り玉ねぎ100g全量、ねぎ、香草、こしょうを加えます。各杯に沸騰したスープ500mlを注ぎ、ライムと好みで唐辛子を添えます。2種類の肉をそれぞれ確認してから盛り付けます。",
    "등심을 휴지하는 동안 그릇에 부을 육수를 다시 끓인다. 익힌 양지와 휴지한 등심을 면 여섯 그릇에 나눈다. 조리 전 무게 기준 한 그릇에 양지 약 117g, 등심 42g이다. 숙주, 양파채 100g 전량, 대파, 허브, 후추를 넣는다. 각 그릇에 끓는 육수 500ml를 붓고 라임과 선택 고추를 곁들인다. 두 고기를 각각 확인한 뒤에만 그릇을 완성한다.",
    "ระหว่างพักเนื้อสันนอก ให้นำน้ำซุปสำหรับเสิร์ฟกลับมาต้มจนเดือด แบ่งอกวัวสุกและเนื้อสันนอกที่พักแล้วลงในชามเส้น 6 ใบ แต่ละที่มีอกวัวประมาณ 117 กรัมและเนื้อสันนอก 42 กรัมตามน้ำหนักก่อนปรุง ใส่ถั่วงอก หอมหัวใหญ่ซอยทั้งหมด 100 กรัม ต้นหอม สมุนไพร และพริกไทย ตักน้ำซุปเดือด 500 มล.ใส่แต่ละชาม เสิร์ฟมะนาวและพริกตามชอบไว้ข้าง ๆ ประกอบชามหลังตรวจเนื้อทั้งสองชนิดแยกกันแล้วเท่านั้น"
  ));
  recipe.storage = ml(
    "Cool broth and all cooked beef in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. Keep cooked brisket, cooked sirloin, raw garnishes, and noodles separate. Use within 3 days for best broth and noodle quality; FoodSafety.gov lists cooked soups and leftovers at 3–4 days. Reheat only the needed broth and cooked beef to 74°C/165°F.",
    "高湯與全部熟牛肉分裝淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。熟牛胸肉、熟牛里肌、生配料與麵條分開保存。為保持湯與麵品質建議 3 天內食用；FoodSafety.gov 對熟湯與剩菜列為 3–4 天。只取所需高湯與熟牛肉復熱至 74°C/165°F。",
    "スープと調理済み牛肉は浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。調理済みブリスケット、調理済みサーロイン、生の薬味、麺を分けて保存します。スープと麺の品質のため3日以内がおすすめですが、FoodSafety.govは調理済みスープと残り物を3〜4日としています。必要な分だけスープと調理済み牛肉を74°C/165°Fまで再加熱します。",
    "육수와 익힌 소고기는 얕은 용기에 나눠 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 익힌 양지, 익힌 등심, 생고명, 면을 따로 보관한다. 육수와 면 품질을 위해 3일 안에 먹는 것을 권하지만 FoodSafety.gov는 조리된 수프와 남은 음식을 3–4일로 안내한다. 필요한 육수와 익힌 고기만 74°C/165°F까지 재가열한다.",
    "แบ่งน้ำซุปและเนื้อวัวสุกทั้งหมดใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F แยกอกวัวสุก เนื้อสันนอกสุก เครื่องเคียงดิบ และเส้น เพื่อคุณภาพที่ดีที่สุดควรกินภายใน 3 วัน ส่วน FoodSafety.gov ระบุซุปปรุงสุกและอาหารเหลือ 3–4 วัน อุ่นเฉพาะน้ำซุปและเนื้อสุกที่ต้องการถึง 74°C/165°F"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseMiQuang(recipe) {
  body(recipe, 1, ml(
    "Remove the heads and shells from all 500 g shrimp, reserving both for stock; devein the bodies. Keep shrimp covered and refrigerated below 4°C. Separately refrigerate the 350 g pork belly with 10 ml fish sauce, 2 g turmeric, 6 g sugar, and pepper for 20 minutes; start the timer only after it is chilled. Use separate plates and utensils for raw pork and shrimp.",
    "處理全部 500 公克蝦，去頭去殼並保留作高湯，蝦身去腸泥。蝦子加蓋冷藏於 4°C 以下。另將 350 公克五花肉與 10 毫升魚露、2 公克薑黃、6 公克糖及胡椒拌勻冷藏 20 分鐘；冷藏後才開始計時。生豬肉與蝦子使用不同盤子及器具。",
    "えび500g全量の頭と殻を外し、だし用に取っておき、身の背わたを取ります。覆って4°C以下で冷蔵します。豚バラ350gはナンプラー10ml、ターメリック2g、砂糖6g、こしょうと別に和え、20分冷蔵します。冷蔵してから時間を測ります。生の豚肉とえびは別の皿と器具を使います。",
    "새우 500g 전량의 머리와 껍질을 벗겨 육수용으로 남기고 몸통의 내장을 제거한다. 덮어서 4°C 이하로 냉장한다. 삼겹살 350g은 피시소스 10ml, 강황 2g, 설탕 6g, 후추와 따로 버무려 20분 냉장한다. 냉장한 뒤부터 시간을 잰다. 생돼지고기와 새우는 접시와 도구를 분리한다.",
    "แกะหัวและเปลือกกุ้ง 500 กรัมทั้งหมด เก็บไว้ทำน้ำซุปและเอาเส้นดำออกจากตัวกุ้ง ปิดคลุมและแช่เย็นต่ำกว่า 4°C แยกหมูสามชั้น 350 กรัมคลุกกับน้ำปลา 10 มล. ขมิ้น 2 กรัม น้ำตาล 6 กรัม และพริกไทย แล้วแช่เย็น 20 นาที เริ่มจับเวลาหลังแช่เย็น ใช้จานและอุปกรณ์แยกสำหรับหมูดิบกับกุ้ง"
  ));
  body(recipe, 2, ml(
    "Use 10 ml of the listed 30 ml oil to fry all reserved shrimp heads and shells for 3 minutes, pressing gently. Add all 700 g blanched pork bones, the 150 g halved onion, 1.5 L stock water, and the 4 g stock salt. Bring to a boil, skim, then simmer uncovered for an estimated 60 minutes; the timer develops broth flavour and does not replace the meat checks in the next steps.",
    "所列 30 毫升油中取 10 毫升，將保留的蝦頭蝦殼全部炒 3 分鐘並輕壓。加入全部 700 公克汆燙豬骨、150 公克對切洋蔥、1.5 公升煮湯水與 4 公克湯用鹽。煮沸撇沫後不加蓋估計煮 60 分鐘；時間用來煮出湯味，不能取代下列肉類熟度檢查。",
    "表示した油30mlのうち10mlを使い、取っておいたえびの頭と殻全量を軽く押しながら3分炒めます。下処理した豚骨700g全量、半割り玉ねぎ150g全量、だし用の水1.5L、スープ用塩4gを加えます。沸騰させて泡を取り、ふたをせず約60分煮ます。この時間はだしの風味の目安で、次の肉の安全確認に代わるものではありません。",
    "표시된 기름 30ml 중 10ml를 써서 남겨 둔 새우 머리와 껍질 전량을 가볍게 누르며 3분 볶는다. 데친 돼지뼈 700g 전량, 반으로 자른 양파 150g, 육수용 물 1.5L, 육수 소금 4g을 넣는다. 끓어오르면 거품을 걷고 뚜껑을 덮지 않은 채 약 60분 끓인다. 이 시간은 육수 풍미를 위한 추정치이며 다음 단계의 고기 안전 확인을 대신하지 않는다.",
    "ใช้น้ำมัน 10 มล.จากทั้งหมด 30 มล.ผัดหัวและเปลือกกุ้งที่เก็บไว้ทั้งหมด 3 นาที กดเบา ๆ เติมกระดูกหมูที่ลวกแล้ว 700 กรัมทั้งหมด หอมหัวใหญ่ผ่าครึ่ง 150 กรัม น้ำสำหรับน้ำซุป 1.5 ลิตร และเกลือสำหรับน้ำซุป 4 กรัม ต้มให้เดือด ช้อนฟองแล้วเคี่ยวเปิดฝาประมาณ 60 นาที เวลานี้เป็นค่าประมาณเพื่อให้ได้น้ำซุป ไม่ใช่สิ่งทดแทนการตรวจเนื้อในขั้นตอนถัดไป"
  ));
  body(recipe, 3, ml(
    "Near the end of the stock simmer, heat another 10 ml oil over medium-high. Cook half the shallots and garlic for 30 seconds, then add all marinated pork and its juices. Stir-fry about 5 minutes until the slices are browned at the edges; 5 minutes is an estimate, so use a thermometer on the thickest intact slice before it goes into the broth.",
    "高湯快煮好時，以中大火加熱另外 10 毫升油。先炒一半紅蔥頭與蒜末 30 秒，再加入全部醃豬肉及肉汁。估計炒 5 分鐘至肉片邊緣上色；5 分鐘只是估算，放入高湯前須測最厚的完整肉片。",
    "だしの煮込みが終わる頃、油10mlを中強火で熱します。エシャロットとにんにくの半量を30秒炒め、漬けた豚肉全量と汁を加えます。縁に焼き色が付くまで約5分炒めます。5分は目安なので、スープに加える前に最も厚い肉片を温度計で確認します。",
    "육수 끓이기가 끝나갈 때 기름 10ml를 중강불로 달군다. 샬롯과 마늘 절반을 30초 볶은 뒤 양념한 돼지고기 전량과 즙을 넣는다. 가장자리가 갈색이 될 때까지 약 5분 볶는다. 5분은 추정치이므로 육수에 넣기 전에 가장 두꺼운 통살 조각을 온도계로 확인한다.",
    "ใกล้ครบเวลาต้มน้ำซุป ตั้งน้ำมันอีก 10 มล.ด้วยไฟกลางค่อนแรง ผัดหอมแดงและกระเทียมครึ่งหนึ่ง 30 วินาที แล้วใส่หมูหมักทั้งหมดพร้อมน้ำหมัก ผัดประมาณ 5 นาทีจนขอบหมูเริ่มเกรียม เวลา 5 นาทีเป็นค่าประมาณ ต้องวัดชิ้นหมูเต็มที่หนาที่สุดก่อนใส่ลงในน้ำซุป"
  ));
  body(recipe, 4, ml(
    "Strain the stock and discard the cooked bones and shells. Measure 1 L broth and add hot water only if short. Return it to a clean pot with all pork and skillet juices. These 5 mm pork-belly slices are intact whole-cut meat, not ground pork: verify 63°C (145°F) in the thickest slice, then keep the pork in simmering broth for at least 3 minutes. The further 20–25 minute simmer is a tenderness estimate; continue until fork-tender and reduce the liquid to about 800 ml. Add all 20 ml fish sauce, 1 g turmeric, 6 g sugar, and the remaining salt.",
    "過濾高湯並丟棄煮過的豬骨與蝦殼。量出 1 公升高湯，不足時只加熱水。倒回乾淨鍋中，加入全部豬肉及炒鍋肉汁。這些 5 毫米五花肉片是完整肉塊切片，並非絞肉：測最厚肉片達 63°C（145°F）後，讓豬肉在微滾高湯中至少煮 3 分鐘。之後再燉 20–25 分鐘是嫩度估算；繼續煮至叉子可輕鬆刺入且湯量約 800 毫升。加入全部 20 毫升魚露、1 公克薑黃、6 公克糖與剩餘鹽。",
    "だしをこし、煮た骨と殻を捨てます。スープを1L量り、不足時は熱湯だけ足します。清潔な鍋に戻して豚肉全量と炒め汁を加えます。豚バラの5mm切りはひき肉ではなく塊肉です。最も厚い肉片が63°C（145°F）になったことを確認し、豚肉を弱く煮立つスープで少なくとも3分加熱します。さらに20〜25分煮る時間は柔らかさの目安です。フォークが通るまで煮て、汁を約800mlに減らします。ナンプラー20ml全量、ターメリック1g、砂糖6g、残りの塩を加えます。",
    "육수를 거르고 익힌 뼈와 껍질을 버린다. 육수 1L를 재고 부족할 때만 뜨거운 물을 보충한다. 깨끗한 냄비에 붓고 돼지고기 전량과 팬의 즙을 넣는다. 삼겹살 5mm 조각은 다진 고기가 아니라 통살이다. 가장 두꺼운 조각이 63°C (145°F)에 도달했는지 확인한 뒤 약하게 끓는 육수에서 최소 3분 더 익힌다. 이후 20–25분은 부드러움 추정치다. 포크가 쉽게 들어갈 때까지 익히고 국물이 약 800ml가 되도록 줄인다. 피시소스 20ml 전량, 강황 1g, 설탕 6g, 남은 소금을 넣는다.",
    "กรองน้ำซุปและทิ้งกระดูกกับเปลือกที่ต้มแล้ว ตวงน้ำซุป 1 ลิตร หากไม่พอให้เติมแต่น้ำร้อน เทกลับลงหม้อสะอาดพร้อมหมูทั้งหมดและน้ำจากกระทะ หมูสามชั้นหั่น 5 มม.เป็นเนื้อชิ้นเต็ม ไม่ใช่หมูบด วัดชิ้นที่หนาที่สุดให้ถึง 63°C (145°F) แล้วเคี่ยวหมูในน้ำซุปเดือดปุดอย่างน้อย 3 นาที เวลาเคี่ยวต่ออีก 20–25 นาทีเป็นค่าประมาณเพื่อความนุ่ม เคี่ยวต่อจนใช้ส้อมจิ้มได้ง่ายและน้ำเหลือประมาณ 800 มล. เติมน้ำปลา 20 มล.ทั้งหมด ขมิ้น 1 กรัม น้ำตาล 6 กรัม และเกลือที่เหลือ"
  ));
  body(recipe, 5, ml(
    "Heat the remaining 10 ml oil over medium-high and cook the remaining shallots and garlic for 30 seconds. Add all marinated shrimp and cook in one uncrowded layer for an estimated 1–2 minutes per side, turning once. Shrimp are ready when pearly or white and opaque; FoodSafety.gov gives this visual cue for shrimp, not the 63°C fish-fillet endpoint. Remove promptly so they stay springy.",
    "以中大火加熱剩下 10 毫升油，將剩餘紅蔥頭與蒜末炒 30 秒。加入全部醃蝦，單層不擁擠地估計每面煎 1–2 分鐘並翻一次。蝦肉呈珍珠白或白色且不透明即熟；FoodSafety.gov 對蝦採用此外觀指標，不是魚片的 63°C 標準。立即盛出以保持彈嫩。",
    "残りの油10mlを中強火で熱し、残りのエシャロットとにんにくを30秒炒めます。漬けたえび全量を重ならないように並べ、片面1〜2分を目安に焼き、一度返します。えびは真珠色または白く不透明になれば加熱済みです。FoodSafety.govのえびの目安は見た目で、魚の切り身の63°C基準とは異なります。弾力を保つためすぐ取り出します。",
    "남은 기름 10ml를 중강불로 달구고 남은 샬롯과 마늘을 30초 볶는다. 양념한 새우 전량을 겹치지 않게 넣고 한 면당 약 1–2분씩 한 번 뒤집어 익힌다. 새우는 진주빛 또는 흰색으로 불투명해지면 익은 것이다. FoodSafety.gov의 새우 기준은 이 시각적 신호이며 생선 필렛의 63°C 기준과 다르다. 탱글한 식감을 위해 즉시 꺼낸다.",
    "ตั้งน้ำมันที่เหลือ 10 มล.ด้วยไฟกลางค่อนแรง ผัดหอมแดงและกระเทียมที่เหลือ 30 วินาที ใส่กุ้งหมักทั้งหมดเรียงชั้นเดียวไม่ให้แน่น ผัดด้านละประมาณ 1–2 นาที พลิกหนึ่งครั้ง กุ้งสุกเมื่อเป็นสีขาวมุกหรือขาวขุ่น แนวทาง FoodSafety.gov ใช้สัญญาณนี้กับกุ้ง ไม่ใช่เกณฑ์ 63°C ของเนื้อปลา ตักขึ้นทันทีเพื่อให้ยังเด้ง"
  ));
  body(recipe, 6, ml(
    "Lower all 8 quail eggs into gently boiling water and cook for 5 minutes for set whites and yolks. Cool in cold water for 3 minutes, peel, and cut one egg to confirm both white and yolk are firm. Keep chilled until plating; divide as two whole eggs per bowl or halve four eggs for each of four servings.",
    "將全部 8 顆鵪鶉蛋放入微滾水中煮 5 分鐘，使蛋白與蛋黃凝固。以冷水降溫 3 分鐘後剝殼，切開一顆確認蛋白蛋黃皆凝固。上桌前冷藏；四份各放兩顆整蛋，或每份放半顆四個蛋。",
    "うずら卵8個全量を静かに沸く湯に入れ、白身と黄身が固まるまで5分ゆでます。冷水で3分冷やして殻をむき、1個切って白身と黄身の両方が固まっていることを確認します。盛り付けるまで冷蔵し、1杯に丸ごと2個、または各皿に4個分を半割りにして分けます。",
    "메추리알 8개 전량을 약하게 끓는 물에 넣고 흰자와 노른자가 굳도록 5분 삶는다. 찬물에 3분 식혀 껍질을 벗긴 뒤 하나를 잘라 흰자와 노른자가 모두 단단히 익었는지 확인한다. 담기 전까지 냉장하고 그릇마다 통알 2개씩 또는 네 그릇에 네 알씩 반으로 나눠 담는다.",
    "ใส่ไข่นกกระทา 8 ฟองทั้งหมดลงในน้ำเดือดอ่อน ๆ ต้ม 5 นาทีให้ไข่ขาวและไข่แดงสุกแข็ง แช่น้ำเย็น 3 นาที ปอกเปลือกและผ่าหนึ่งฟองเพื่อตรวจว่าไข่ขาวและไข่แดงแข็งทั่วถึง แช่เย็นจนกว่าจะจัดชาม แบ่งชามละ 2 ฟองทั้งฟองหรือผ่าครึ่งไข่ 4 ฟองแบ่งให้ทั้ง 4 ที่"
  ));
  body(recipe, 7, ml(
    "Cook all 320 g dried yellow rice noodles in plenty of fresh boiling water for the package time, usually 8–12 minutes, until tender but resilient; drain and rinse briefly with warm water. Divide into four portions of 80 g dry noodles each. Blanch all 160 g sprouts in a separate fresh pot for 1 minute. The package time is a texture estimate, not a food-safety temperature.",
    "將全部 320 公克乾黃米粉以大量新沸水依包裝時間煮熟，通常 8–12 分鐘，至熟軟有彈性；瀝乾並以溫水快速沖洗。分成四份，每份烹煮前 80 公克乾麵。全部 160 公克豆芽另鍋汆燙 1 分鐘。包裝時間是口感估算，不是食安溫度。",
    "乾燥の黄色い米麺320g全量をたっぷりの新しい湯で表示時間（通常8〜12分）ゆで、柔らかく弾力が出たら湯を切り、温水で手早くすすぎます。乾麺80gずつ4人分に分けます。もやし160g全量は別の新しい湯で1分ゆでます。表示時間は食感の目安で、食品安全温度ではありません。",
    "마른 노란 쌀국수 320g 전량을 넉넉한 새 끓는 물에 포장 시간(보통 8–12분) 삶아 부드럽고 탄력이 생기면 물을 빼고 따뜻한 물에 짧게 헹군다. 건면 80g씩 네 몫으로 나눈다. 숙주 160g 전량은 별도의 새 냄비에서 1분 데친다. 포장 시간은 식감 추정치이지 식품 안전 온도가 아니다.",
    "ต้มเส้นข้าวสีเหลืองแห้ง 320 กรัมทั้งหมดในน้ำเดือดใหม่ปริมาณมากตามเวลาบนห่อ โดยทั่วไป 8–12 นาทีจนนุ่มแต่ยังเหนียว สะเด็ดน้ำและล้างเร็ว ๆ ด้วยน้ำอุ่น แบ่งเป็น 4 ส่วน ส่วนละเส้นแห้ง 80 กรัม ลวกถั่วงอก 160 กรัมทั้งหมดในหม้อใหม่แยกต่างหาก 1 นาที เวลาบนห่อเป็นค่าประมาณด้านเนื้อสัมผัส ไม่ใช่อุณหภูมิความปลอดภัยอาหาร"
  ));
  body(recipe, 9, ml(
    "Divide lettuce, drained sprouts, and noodles among four wide bowls. Add one quarter of all cooked pork and shrimp and two fully cooked quail eggs per bowl. Spoon about 200 ml simmering broth into each bowl, below noodle level. Each serving also gets about 10 g peanuts, 15 g sesame rice crackers, and 5 g fried shallots; keep crackers dry and serve lime and chile alongside.",
    "將萵苣、瀝乾豆芽與麵條分入四個寬碗。每碗加入四分之一熟豬肉與蝦，以及兩顆全熟鵪鶉蛋。舀入約 200 毫升微滾高湯至麵條高度以下。每份另有約 10 公克花生、15 公克芝麻米餅及 5 公克油蔥酥；米餅保持乾燥，萊姆與辣椒放旁邊。",
    "レタス、湯を切ったもやし、麺を幅広い4杯に分けます。調理済み豚肉とえびの各4分の1、固ゆでうずら卵2個ずつをのせます。麺より下まで、弱く沸いたスープ約200mlを注ぎます。各人にピーナッツ約10g、ごま入りライスクラッカー15g、揚げエシャロット5gも添えます。クラッカーは乾燥させたまま、ライムと唐辛子は別添えにします。",
    "양상추, 물 뺀 숙주, 면을 넓은 그릇 네 개에 나눈다. 익힌 돼지고기와 새우의 4분의 1씩, 완숙 메추리알 두 개씩 올린다. 면 높이 아래까지 약 200ml의 끓는 육수를 붓는다. 한 그릇마다 땅콩 약 10g, 참깨 쌀과자 15g, 튀긴 샬롯 5g도 곁들인다. 쌀과자는 바삭하게 마른 상태로 두고 라임과 고추는 따로 낸다.",
    "แบ่งผักกาดหอม ถั่วงอกที่สะเด็ดน้ำ และเส้นใส่ชามกว้าง 4 ใบ ใส่หมูและกุ้งสุกอย่างละหนึ่งในสี่และไข่นกกระทาสุกแข็ง 2 ฟองต่อชาม ตักน้ำซุปเดือดปุดประมาณ 200 มล.ใส่แต่ละชามโดยให้อยู่ต่ำกว่าระดับเส้น แต่ละที่มีถั่วลิสงประมาณ 10 กรัม ข้าวเกรียบงา 15 กรัม และหอมเจียว 5 กรัม วางข้าวเกรียบแห้งไว้ข้างชามและเสิร์ฟมะนาวกับพริกแยก"
  ));
  recipe.storage = ml(
    "Cool broth and pork in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. Store cooked shrimp and hard-boiled quail eggs separately; keep noodles, fresh greens, and crackers apart. Use within 2 days for the best shrimp, egg, and noodle quality; FoodSafety.gov lists cooked soups and leftovers at 3–4 days. Reheat only the needed broth and proteins to 74°C/165°F, then add freshly cooked noodles and cold toppings.",
    "高湯與豬肉分裝淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。熟蝦與水煮鵪鶉蛋分開保存；麵條、鮮蔬與米餅另放。為蝦、蛋、麵口感建議 2 天內食用；FoodSafety.gov 對熟湯與剩菜列為 3–4 天。只取所需高湯與肉類復熱至 74°C/165°F，再加入現煮麵及冷配料。",
    "スープと豚肉は浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。調理済みえびと固ゆでうずら卵は別に保存し、麺、生野菜、クラッカーも分けます。えび、卵、麺の品質のため2日以内がおすすめですが、FoodSafety.govは調理済みスープと残り物を3〜4日としています。必要な分だけスープとたんぱく質を74°C/165°Fまで再加熱し、新しくゆでた麺と冷たい薬味を加えます。",
    "육수와 돼지고기는 얕은 용기에 나눠 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 익힌 새우와 완숙 메추리알은 따로 보관하고 면·생채소·쌀과자도 분리한다. 새우·달걀·면의 품질을 위해 2일 안에 먹는 것을 권하지만 FoodSafety.gov는 조리된 수프와 남은 음식을 3–4일로 안내한다. 필요한 육수와 단백질만 74°C/165°F까지 재가열하고 새로 삶은 면과 차가운 고명을 넣는다.",
    "แบ่งน้ำซุปและหมูใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เก็บกุ้งสุกและไข่นกกระทาต้มแยกกัน แยกเส้น ผักสด และข้าวเกรียบด้วย เพื่อคุณภาพของกุ้ง ไข่ และเส้นควรกินภายใน 2 วัน ส่วน FoodSafety.gov ระบุซุปปรุงสุกและอาหารเหลือ 3–4 วัน อุ่นเฉพาะน้ำซุปและโปรตีนที่ต้องการถึง 74°C/165°F แล้วเติมเส้นที่ต้มใหม่กับเครื่องเคียงเย็น"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: Egg Safety", eggSafety);
}

export function refineSixtyFirstMethods(recipes) {
  const targets = ["pad-see-ew", "kalguksu", "pho-bo", "mi-quang"];
  const revisions = [revisePadSeeEw, reviseKalguksu, revisePhoBo, reviseMiQuang];
  targets.forEach((id, index) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex < 0) throw new Error("Recipe method audit 61: missing recipe " + id);
    const revised = cloneForPublication(recipes[recipeIndex]);
    revisions[index](revised);
    recipes[recipeIndex] = revised;
  });
  return recipes;
}
