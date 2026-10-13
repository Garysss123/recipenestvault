const ml = (en, zh, ja, ko, th) => ({ en, "zh-hant": zh, ja, ko, th });
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";

function clone(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({
      ...row,
      amount: typeof row.amount === "object" ? { ...row.amount } : row.amount,
      item: typeof row.item === "object" ? { ...row.item } : row.item
    })),
    instructions: recipe.instructions.map((step) => ({ ...step, title: { ...step.title }, body: { ...step.body } })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function body(recipe, index, localized) {
  recipe.instructions[index].body = localized;
}

function official(recipe, label, url) {
  const title = "Official food-safety guidance — FoodSafety.gov: " + label;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function addCommonSafetySources(recipe) {
  official(recipe, "Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "4 Steps to Food Safety", handling);
  official(recipe, "Cold Food Storage Charts", storageChart);
}

function reviseJjajangmyeon(recipe) {
  recipe.cookMinutes = 39;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  recipe.ingredients.find((row) => row.item.en.startsWith("skinless pork belly")).item = ml(
    "skinless pork belly from an intact, unground cut, cut into 1.5 cm cubes",
    "取自整塊、未絞製去皮豬五花，切成 1.5 公分丁",
    "未加工の塊から切り分けた皮なし豚バラ肉（ひき肉ではない）、1.5cm角切り",
    "갈지 않은 통삼겹살을 껍질 없이 1.5cm 주사위 모양으로 썬 것",
    "หมูสามชั้นเลาะหนังจากชิ้นเต็มที่ไม่บด หั่นเต๋า 1.5 ซม."
  );
  body(recipe, 2, ml(
    "Heat the listed remaining 20 ml oil over medium-high heat. Add the 300 g intact-cut, unground pork belly cubes in one layer, in batches if needed, and brown for an estimated 5–6 minutes. Check the centres of several of the largest cubes with a clean thin-tip thermometer; the whole-cut pork endpoint is 63°C (145°F). If any checked cube is below it, cook 1 minute and recheck. Transfer to a clean plate and rest at least 3 minutes. Spoon rendered fat back into the wok until 30 ml remains; discard excess fat.",
    "以中大火加熱配料表中剩餘的 20 毫升油。放入 300 公克整塊切丁、未絞製的豬五花，單層煎，鍋子擁擠時分批；約煎 5–6 分鐘至上色。用乾淨細探針溫度計測數塊最大肉丁中心；整塊豬肉的安全終點為 63°C（145°F）。若有受測肉丁未達，每次續煎 1 分鐘後複測。移至乾淨盤子，至少靜置 3 分鐘。將鍋中煉出的油脂舀回鍋中，留 30 毫升，倒掉多餘油脂。",
    "残りの油20mlを中強火で熱します。塊から切ったひき肉ではない豚バラ肉300gを重ならないように入れ、混み合う場合は数回に分け、目安として5〜6分焼き色をつけます。清潔な細い先端の温度計で最も大きい数個の中心を測ります。塊肉の豚肉の安全基準は63°C（145°F）です。未達のものがあれば1分ずつ加熱して再測定します。清潔な皿に移し、少なくとも3分休ませます。鍋に出た脂を戻し、鍋に30mlだけ残して余分を捨てます。",
    "남은 기름 20ml를 중강불로 달군다. 갈지 않은 통삼겹살 300g을 한 겹으로 넣고, 팬이 붐비면 나눠서 약 5–6분 갈색이 나도록 굽는다. 깨끗한 가는 탐침 온도계로 가장 큰 고기 몇 점의 중심을 잰다. 통고기 돼지고기의 안전 기준은 63°C (145°F)다. 확인한 조각 중 미달한 것이 있으면 1분씩 더 익혀 다시 잰다. 깨끗한 접시에 옮겨 최소 3분 쉰다. 팬에 나온 기름을 되돌려 30ml만 남기고 나머지는 버린다.",
    "ตั้งน้ำมันที่เหลือ 20 มล.ด้วยไฟกลางค่อนแรง ใส่หมูสามชั้น 300 กรัมที่หั่นจากชิ้นเต็มและไม่บด เรียงชั้นเดียว หากแน่นให้แบ่งทอด ประมาณ 5–6 นาทีจนเกรียม ใช้เทอร์โมมิเตอร์ปลายเล็กสะอาดวัดตรงกลางของชิ้นใหญ่หลายชิ้น เกณฑ์ความปลอดภัยของหมูชิ้นเต็มคือ 63°C (145°F) หากชิ้นที่วัดชิ้นใดยังไม่ถึง ให้ทอดเพิ่มครั้งละ 1 นาทีแล้ววัดซ้ำ ย้ายใส่จานสะอาดพักอย่างน้อย 3 นาที ตักไขมันที่ออกมากลับลงกระทะให้เหลือ 30 มล. แล้วเทส่วนเกินทิ้ง"
 ));
  body(recipe, 4, ml(
    "Add the cabbage and zucchini to the wok and stir-fry for an estimated 3 minutes. Fold in the fried chunjang and all 20 g sugar; cook about 2 minutes until every piece is glossy. Return the rested pork and any clean-plate juices, then stir to coat before adding the stock.",
    "將高麗菜與櫛瓜放入炒鍋，約炒 3 分鐘。拌入炒過的春醬與全部 20 公克糖，再炒約 2 分鐘至每塊食材都油亮。將已靜置的豬肉和乾淨盤中的肉汁倒回鍋中，拌勻裹上醬汁後再加高湯。",
    "キャベツとズッキーニを加え、目安として約3分炒めます。炒めたチュンジャンと砂糖20g全量を混ぜ、全体につやが出るまで約2分炒めます。休ませた豚肉と清潔な皿に出た肉汁を戻し、スープを加える前にソースを絡めます。",
    "양배추와 애호박을 넣고 추정 3분 볶는다. 볶아 둔 춘장과 설탕 20g 전량을 넣고 모든 조각에 윤기가 돌 때까지 약 2분 섞는다. 휴지한 돼지고기와 깨끗한 접시에 나온 육즙을 팬에 되돌려 소스를 입힌 뒤 육수를 붓는다.",
    "ใส่กะหล่ำปลีกับซูกินีลงกระทะ ผัดประมาณ 3 นาที ใส่ชุนจังที่ผัดไว้และน้ำตาล 20 กรัมทั้งหมด ผัดประมาณ 2 นาทีจนทุกชิ้นมันวาว นำหมูที่พักแล้วและน้ำจากจานสะอาดกลับลงกระทะ คลุกซอสให้ทั่วก่อนเติมน้ำสต็อก"
  ));
  body(recipe, 6, ml(
    "Whisk all 30 g potato starch with all 60 ml cold water until smooth. Pour in half while stirring the sauce, then add only enough of the remainder for a spoon-coating consistency; bring to a full boil for 1 minute and turn off the heat. The pork met the whole-cut 63°C endpoint and 3-minute rest before returning to the sauce. The 39-minute cook estimate includes that rest; the thermometer endpoint, not the browning time, determines safety.",
    "將全部 30 公克馬鈴薯澱粉與全部 60 毫升冷水攪勻至無粉粒。一邊攪拌醬汁一邊先倒入一半，再視濃度加入剩餘澱粉水，至醬汁可裹住湯匙；煮至完全沸騰 1 分鐘後關火。豬肉倒回醬汁前已達整塊肉 63°C 安全標準並靜置 3 分鐘。39 分鐘烹調估時包含這段靜置；安全以溫度計讀值為準，不以煎色或時間判定。",
    "片栗粉30g全量と冷水60ml全量を滑らかに混ぜます。ソースを混ぜながら半量を加え、残りはスプーンに絡む濃さになる分だけ加えます。完全に沸騰させて1分煮て火を止めます。豚肉はソースに戻す前に、塊肉の安全基準63°Cに達し、3分休ませています。調理時間39分の目安にはこの休ませ時間を含みます。安全性は焼き色や時間ではなく温度計で判断します。",
    "감자전분 30g 전량과 찬물 60ml 전량을 덩어리 없이 푼다. 소스를 저으며 절반을 붓고, 나머지는 숟가락에 묻을 정도가 되도록 필요한 만큼만 넣는다. 완전히 끓여 1분 익힌 뒤 불을 끈다. 돼지고기는 소스에 돌려놓기 전에 통고기 기준 63°C에 도달하고 3분 휴지했다. 조리 시간 추정 39분에는 이 휴지가 포함된다. 안전은 갈색이나 시간 대신 온도계로 판단한다.",
    "คนแป้งมันฝรั่ง 30 กรัมทั้งหมดกับน้ำเย็น 60 มล.ทั้งหมดจนเนียน เทครึ่งหนึ่งลงในซอสพร้อมคน แล้วเติมส่วนที่เหลือเท่าที่จำเป็นให้ซอสเคลือบช้อน ต้มให้เดือดทั่ว 1 นาทีแล้วปิดไฟ หมูถึงเกณฑ์เนื้อชิ้นเต็ม 63°C และพัก 3 นาทีแล้วก่อนนำกลับลงซอส เวลาเคี่ยวประมาณ 39 นาทีรวมเวลาพักนี้ ใช้อุณหภูมิจากเทอร์โมมิเตอร์ตัดสินความปลอดภัย ไม่ใช่สีหรือเวลา"
 ));
  body(recipe, 9, ml(
    "Divide the 600 g fresh noodles among four bowls (150 g each). Spoon all pork and vegetable sauce evenly over them: each bowl gets about one-quarter of the 300 g raw pork (75 g raw-weight equivalent), vegetables, and sauce. Divide the 100 g cucumber into four 25 g portions and place it on top. Mix each bowl just before eating.",
    "將 600 公克鮮麵平均分入 4 個碗（每碗 150 公克）。把全部豬肉蔬菜醬汁平均淋上：每碗約含 300 公克生豬肉的四分之一（生重換算 75 公克）、四分之一蔬菜與醬汁。100 公克小黃瓜分成 4 份、每份 25 公克，放在麵上。食用前再拌勻。",
    "生麺600gを4つの器に150gずつ分けます。豚肉と野菜のソース全量を均等にかけ、各器に生の豚肉換算約75g（300gの4分の1）、野菜とソースを4分の1ずつ盛ります。きゅうり100gは25gずつ4等分して上にのせます。食べる直前に混ぜます。",
    "생면 600g을 네 그릇에 150g씩 나눈다. 돼지고기와 채소 소스 전량을 고르게 얹는다. 각 그릇에 생고기 기준 약 75g(300g의 4분의 1), 채소와 소스를 각각 4분의 1씩 담는다. 오이 100g은 25g씩 네 몫으로 나눠 위에 올린다. 먹기 직전에 각 그릇을 비빈다.",
    "แบ่งเส้นสด 600 กรัมลง 4 ชาม ชามละ 150 กรัม ตักซอสหมูและผักทั้งหมดแบ่งเท่า ๆ กัน แต่ละชามได้หมูดิบเทียบเท่าประมาณ 75 กรัม (หนึ่งในสี่ของ 300 กรัม) พร้อมผักและซอสหนึ่งในสี่ แตงกวา 100 กรัมแบ่ง 4 ส่วน ส่วนละ 25 กรัมวางด้านบน คลุกแต่ละชามก่อนรับประทาน"
  ));
  recipe.storage = ml(
    "Cool the pork sauce and noodles separately in shallow containers and refrigerate within 2 hours at or below 4°C/40°F. Two days is a noodle-texture preference; FoodSafety.gov lists cooked meat leftovers at 3–4 days. Keep cucumber separate. Reheat only the sauce portion needed until its centre reaches 74°C/165°F, then serve over the noodles with cold cucumber.",
    "將豬肉醬汁與麵分開放入淺容器，2 小時內冷藏至 4°C/40°F 以下。麵條建議 2 天內食用是口感偏好；FoodSafety.gov 將熟肉剩菜列為 3–4 天。小黃瓜另外冷藏。只取所需醬汁復熱至中心 74°C/165°F，再淋在麵上並搭配冷小黃瓜。",
    "豚肉ソースと麺は別々に浅い容器へ入れ、2時間以内に4°C/40°F以下で冷蔵します。麺の食感のため2日以内を勧めますが、これは品質上の目安です。FoodSafety.govの調理済み肉の残り物は3〜4日です。きゅうりは別にします。食べる分のソースだけ中心が74°C/165°Fになるまで再加熱し、麺にかけて冷たいきゅうりを添えます。",
    "돼지고기 소스와 면을 얕은 용기에 따로 담아 2시간 안에 4°C/40°F 이하로 냉장한다. 면 식감을 위한 2일은 품질 기준이며, FoodSafety.gov는 조리된 고기 남은 음식을 3–4일로 안내한다. 오이는 따로 둔다. 먹을 소스만 가운데가 74°C/165°F가 될 때까지 재가열해 면에 얹고 차가운 오이와 낸다.",
    "แบ่งซอสหมูกับเส้นใส่ภาชนะตื้นแยกกันและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า คำแนะนำให้ใช้เส้นภายใน 2 วันเป็นเรื่องเนื้อสัมผัส ส่วน FoodSafety.gov ระบุเนื้อปรุงสุกที่เหลือ 3–4 วัน แยกแตงกวาไว้ อุ่นเฉพาะซอสที่จะกินจนตรงกลางถึง 74°C/165°F แล้วราดบนเส้นพร้อมแตงกวาเย็น"
  );
  addCommonSafetySources(recipe);
}

function reviseBunBoNamBo(recipe) {
  recipe.cookMinutes = 18;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  recipe.ingredients.find((row) => row.item.en.startsWith("beef rump or flank steak")).item = ml(
    "beef rump or flank steak from an intact, unground cut, sliced 2 mm across the grain",
    "取自整塊、未絞製牛臀肉或側腹牛排，逆紋切成 2 毫米薄片",
    "未加工の塊肉の牛ランプまたはフランクステーキ、繊維を断って2mm厚に切る",
    "갈지 않은 통고기 우둔살 또는 플랭크 스테이크를 결 반대로 2mm 두께로 썬 것",
    "เนื้อสะโพกหรือสเต๊กแฟลงก์จากชิ้นเต็มที่ไม่บด หั่นขวางเส้นใยหนา 2 มม."
  );
  body(recipe, 0, ml(
    "Slice 500 g intact, unground rump or flank steak 2 mm thick across the grain. Toss with all 20 g oyster sauce, lemongrass, 10 g garlic, 10 ml fish sauce, 5 ml of the listed oil, and pepper. Cover and refrigerate for an estimated 20 minutes while preparing the other components; this marinating time is included in the 35-minute prep estimate.",
    "將 500 公克整塊、未絞製的牛臀肉或側腹牛排逆紋切成 2 毫米薄片。與全部 20 公克蠔油、香茅、10 公克蒜、10 毫升魚露、配料表中的 5 毫升油及胡椒拌勻。加蓋冷藏約 20 分鐘，同時準備其他配料；這段醃漬時間已計入 35 分鐘備料估時。",
    "牛ランプまたはフランクステーキ500gを繊維を断って厚さ2mmに切ります。オイスターソース20g全量、レモングラス、にんにく10g、ナンプラー10ml、分量にある油5ml、こしょうを混ぜます。覆って冷蔵しながら目安として20分漬け、他の具材を準備します。この漬け時間は下ごしらえ35分の目安に含まれます。",
    "갈지 않은 우둔살 또는 플랭크 스테이크 500g을 결 반대로 2mm 두께로 썬다. 굴소스 20g 전량, 레몬그라스, 마늘 10g, 피시소스 10ml, 목록에 있는 기름 5ml, 후추와 버무린다. 덮어 냉장고에서 약 20분 재우며 다른 재료를 준비한다. 이 재우는 시간은 준비 시간 추정 35분에 포함된다.",
    "หั่นเนื้อสะโพกหรือสเต๊กแฟลงก์ชิ้นเต็มที่ไม่บด 500 กรัมขวางเส้นใยหนา 2 มม. คลุกกับซอสหอยนางรม 20 กรัมทั้งหมด ตะไคร้ กระเทียม 10 กรัม น้ำปลา 10 มล. น้ำมัน 5 มล.ตามรายการ และพริกไทย ปิดฝาแช่เย็นหมักประมาณ 20 นาทีระหว่างเตรียมส่วนอื่น เวลาหมักนี้รวมอยู่ในเวลาเตรียมประมาณ 35 นาที"
 ));
  body(recipe, 5, ml(
    "Heat a wide pan over high heat. Use 10 ml of the remaining 20 ml oil for the first half of the beef; sear for about 45 seconds, then toss for an estimated 1–2 minutes. Insert a clean thin-tip thermometer sideways into several of the thickest slices in each batch: intact beef must reach 63°C (145°F). If any check is low, cook in 30-second increments and recheck. Transfer each batch to a clean plate and rest at least 3 minutes; the cooking times are estimates, while the thermometer and rest determine safety.",
    "寬鍋大火燒熱。剩餘 20 毫升油的一半（10 毫升）用於第一批牛肉；先煎約 45 秒，再翻炒約 1–2 分鐘。用乾淨細探針溫度計從側面插入每批數片最厚肉片中心：整塊牛肉須達 63°C（145°F）。若任何受測肉片未達，每次續炒 30 秒後複測。每批移至乾淨盤子，至少靜置 3 分鐘；烹調時間只是估計，安全以溫度計和靜置時間為準。",
    "大きなフライパンを強火で熱します。残りの油20mlの半量（10ml）を最初の牛肉に使い、約45秒焼いてから目安として1〜2分炒めます。清潔な細い先端の温度計を横から各回の最も厚い数枚に差し、塊肉の牛肉は63°C（145°F）に達させます。未達のものがあれば30秒ずつ加熱して再測定します。各回を清潔な皿に移して少なくとも3分休ませます。時間は目安で、安全性は温度と休ませ時間で判断します。",
    "넓은 팬을 센 불로 달군다. 남은 기름 20ml 중 10ml를 첫 번째 고기에 사용한다. 약 45초 굽고 추정 1–2분 볶는다. 깨끗한 가는 탐침 온도계를 옆에서 각 배치의 가장 두꺼운 고기 여러 점에 넣어 잰다. 통고기 소고기는 63°C (145°F)에 도달해야 한다. 미달한 조각은 30초씩 더 익혀 다시 잰다. 각 배치를 깨끗한 접시에 옮겨 최소 3분 쉰다. 시간은 추정치이며 안전은 온도와 휴지 시간으로 판단한다.",
    "ตั้งกระทะกว้างด้วยไฟแรง ใช้น้ำมัน 10 มล.จาก 20 มล.ที่เหลือกับเนื้อครึ่งแรก จี่ประมาณ 45 วินาทีแล้วผัดต่อประมาณ 1–2 นาที ใช้เทอร์โมมิเตอร์ปลายเล็กสะอาดสอดจากด้านข้างวัดชิ้นที่หนาที่สุดหลายชิ้นในแต่ละรอบ เนื้อวัวชิ้นเต็มต้องถึง 63°C (145°F) หากชิ้นที่วัดชิ้นใดยังต่ำ ให้ผัดเพิ่มครั้งละ 30 วินาทีแล้ววัดซ้ำ ย้ายแต่ละรอบใส่จานสะอาดพักอย่างน้อย 3 นาที เวลาเป็นเพียงค่าประมาณ ความปลอดภัยตัดสินด้วยอุณหภูมิและเวลาพัก"
  ));
  body(recipe, 6, ml(
    "Divide the cooked vermicelli and prepared vegetables evenly among four bowls. Add one-quarter of the cooked beef and juices to each: about 125 g raw-beef equivalent per bowl. Split the 40 g peanuts (10 g each), 25 g fried shallots (about 6 g each), herbs, and all dressing evenly four ways; toss each bowl immediately before serving. The 18-minute cook estimate allows for noodles, sprouts, two beef batches, and the required rest.",
    "將煮好的米粉和備妥蔬菜平均分入 4 碗。每碗加入四分之一熟牛肉與肉汁，約相當於 125 公克生牛肉。40 公克花生（每碗 10 公克）、25 公克炸紅蔥酥（每碗約 6 公克）、香草及全部醬汁都平均分成 4 份；上桌前才拌勻。18 分鐘烹調估時包含煮米粉、燙豆芽、分兩批炒牛肉及必要的靜置時間。",
    "茹でたビーフンと準備した野菜を4つの器に均等に分けます。炒めた牛肉と肉汁を4等分して加え、1人分は生肉換算約125gです。ピーナッツ40g（各10g）、フライドエシャロット25g（各約6g）、ハーブ、ドレッシング全量も4等分します。食べる直前にそれぞれ混ぜます。調理時間18分の目安には麺、もやし、牛肉2回分の炒め、必要な休ませ時間を含みます。",
    "삶은 쌀국수와 준비한 채소를 네 그릇에 고르게 나눈다. 익힌 소고기와 육즙도 4등분해 얹는다. 한 그릇당 생고기 기준 약 125g이다. 땅콩 40g(각 10g), 튀긴 샬롯 25g(각 약 6g), 허브와 드레싱 전량도 네 몫으로 고르게 나눠 담고 내기 직전에 비빈다. 조리 시간 추정 18분은 면과 숙주 익히기, 소고기 두 번 볶기, 필요한 휴지 시간을 포함한다.",
    "แบ่งเส้นหมี่และผักที่เตรียมแล้วลง 4 ชามเท่า ๆ กัน เติมเนื้อวัวปรุงสุกและน้ำจากเนื้อหนึ่งในสี่ต่อชาม คิดเป็นเนื้อดิบประมาณ 125 กรัมต่อชาม แบ่งถั่วลิสง 40 กรัม (ชามละ 10 กรัม) หอมเจียว 25 กรัม (ชามละประมาณ 6 กรัม) สมุนไพรและน้ำราดทั้งหมดเป็น 4 ส่วนเท่า ๆ กัน คลุกก่อนเสิร์ฟ เวลาเคี่ยวประมาณ 18 นาทีเผื่อเวลาต้มเส้น ลวกถั่วงอก ผัดเนื้อสองรอบ และพักเนื้อตามกำหนด"
  ));
  recipe.storage = ml(
    "Keep cooked beef and noodles separate from the fresh greens, herbs, and dressing. Refrigerate in shallow containers within 2 hours at or below 4°C/40°F. Cooked beef leftovers keep 3–4 days under FoodSafety.gov guidance; assemble within 1 day for the best crisp texture (a quality preference). Reheat only the beef to 74°C/165°F, then serve with the cold vegetables and dressing.",
    "熟牛肉、米粉與生菜、香草、醬汁分開存放。放入淺容器，2 小時內冷藏至 4°C/40°F 以下。依 FoodSafety.gov 指引，熟牛肉剩菜可冷藏 3–4 天；為保持爽脆口感，建議 1 天內組裝食用（品質偏好）。只將牛肉復熱至 74°C/165°F，再搭配冷蔬菜和醬汁。",
    "加熱済みの牛肉と麺は、生野菜、ハーブ、ドレッシングと分けます。浅い容器に入れ、2時間以内に4°C/40°F以下で冷蔵します。FoodSafety.govの調理済み肉の残り物は3〜4日保存できます。シャキッとした食感のため1日以内の組み立てを勧めますが、これは品質上の目安です。牛肉だけを74°C/165°Fまで再加熱し、冷たい野菜とドレッシングを添えます。",
    "익힌 소고기와 면은 생채소, 허브, 드레싱과 분리한다. 얕은 용기에 담아 2시간 안에 4°C/40°F 이하로 냉장한다. FoodSafety.gov 지침상 조리된 소고기는 3–4일 보관할 수 있다. 아삭한 식감을 위해 하루 안에 조립하는 것을 권하지만 이는 품질 기준이다. 소고기만 74°C/165°F까지 재가열한 뒤 차가운 채소와 드레싱을 곁들인다.",
    "แยกเนื้อวัวปรุงสุกและเส้นออกจากผักสด สมุนไพร และน้ำราด ใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า ตามแนวทาง FoodSafety.gov เนื้อวัวปรุงสุกเก็บได้ 3–4 วัน หากต้องการความกรอบให้ประกอบภายใน 1 วันซึ่งเป็นคำแนะนำด้านคุณภาพ อุ่นเฉพาะเนื้อวัวถึง 74°C/165°F แล้วเสิร์ฟกับผักและน้ำราดเย็น"
  );
  addCommonSafetySources(recipe);
}

function reviseEscondidinho(recipe) {
  recipe.cookMinutes = 65;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 0, ml(
    "Cover all 1,000 g cassava with the listed 1,800 ml water in a large pot. Bring to a boil, then simmer for an estimated 20 minutes until a knife slides through the thickest pieces easily. If any centre is firm, continue in 5-minute increments and recheck; drain, remove the woody fibres, and mash while hot. The 65-minute cook estimate includes this boil, the filling, baking, and final rest.",
    "將全部 1,000 公克樹薯放入大鍋，以配料表中的 1,800 毫升水覆蓋。煮沸後微滾約 20 分鐘，直到刀尖可輕易穿過最厚的樹薯。若有中心仍硬，每次續煮 5 分鐘後檢查；瀝乾、去除木質中芯，趁熱搗碎。65 分鐘烹調估時包含煮樹薯、製作內餡、烘烤及最後靜置。",
    "キャッサバ1,000g全量を大きな鍋に入れ、分量にある水1,800mlで覆います。沸騰させてから目安として約20分、最も厚い部分にナイフがすっと通るまで煮ます。芯が硬ければ5分ずつ追加して確認します。水を切り、硬い芯を除いて熱いうちにつぶします。調理時間65分の目安には、ゆでる時間、具の調理、焼成、最後の休ませ時間を含みます。",
    "큰 냄비에서 카사바 1,000g 전량을 목록의 물 1,800ml로 덮는다. 끓인 뒤 가장 두꺼운 조각에 칼이 쉽게 들어갈 때까지 추정 20분 약하게 삶는다. 가운데가 단단하면 5분씩 더 삶아 확인한다. 물을 빼고 질긴 심을 제거한 뒤 뜨거울 때 으깬다. 조리 시간 추정 65분은 삶기, 속 재료, 굽기와 마지막 휴지를 포함한다.",
    "ใส่มันสำปะหลัง 1,000 กรัมทั้งหมดในหม้อใบใหญ่ เติมน้ำ 1,800 มล.ตามรายการให้ท่วม ต้มจนเดือดแล้วเคี่ยวประมาณ 20 นาทีจนมีดแทงส่วนที่หนาที่สุดได้ง่าย หากแกนยังแข็งให้ต้มเพิ่มครั้งละ 5 นาทีแล้วตรวจอีกครั้ง สะเด็ดน้ำ เอาแกนแข็งออกและบดขณะร้อน เวลาเคี่ยวประมาณ 65 นาทีรวมการต้ม การทำไส้ การอบ และการพักท้ายจาน"
  ));
  body(recipe, 4, ml(
    "Heat the oven to 200°C (400°F) and brush the baking dish with all 20 ml olive oil. Spread half the cassava purée evenly across the base, distribute all the 600 g cooked shredded carne seca filling over it, then cover with the remaining purée. Smooth the top so the casserole heats evenly.",
    "烤箱預熱至 200°C（400°F），以全部 20 毫升橄欖油薄刷烤盤。將一半樹薯泥均勻鋪在底部，放上全部 600 公克熟牛肉絲內餡，再以剩餘樹薯泥覆蓋。抹平表面使焗烤均勻受熱。",
    "オーブンを200°C（400°F）に予熱し、耐熱皿にオリーブオイル20ml全量を塗ります。キャッサバピューレの半量を底に均一に広げ、調理済みの干し牛肉のほぐし身600g全量をのせます。残りのピューレで覆い、均一に加熱できるよう表面を平らにします。",
    "오븐을 200°C (400°F)로 예열하고 베이킹 접시에 올리브유 20ml 전량을 바른다. 카사바 퓌레 절반을 바닥에 고르게 펴고, 익혀 찢은 카르네 세카 600g 전량을 올린 뒤 남은 퓌레로 덮는다. 고르게 익도록 윗면을 평평하게 다진다.",
    "อุ่นเตาอบไว้ที่ 200°C (400°F) ทาน้ำมันมะกอก 20 มล.ทั้งหมดในถาดอบ เกลี่ยพิวเร่มันสำปะหลังครึ่งหนึ่งให้ทั่วฐาน วางไส้เนื้อคาร์เนเซกา 600 กรัมทั้งหมด แล้วปิดด้วยพิวเร่ที่เหลือ เกลี่ยหน้าให้เรียบเพื่อให้หม้ออบร้อนทั่ว"
  ));
  body(recipe, 5, ml(
    "Scatter all 100 g grated queijo coalho or Parmesan evenly over the top. Bake at 200°C (400°F) for an estimated 20–25 minutes until bubbling at the edges and browned. Measure the centre with a clean thermometer: FoodSafety.gov sets 74°C (165°F) for meat and meatless casseroles. If below 74°C, bake 5 minutes more and recheck; colour and bubbling are quality cues, not the safety endpoint.",
    "將全部 100 公克 queijo coalho 或帕瑪森起司均勻撒在表面。以 200°C（400°F）烘烤約 20–25 分鐘，直到邊緣冒泡且表面上色。用乾淨溫度計測量中心：FoodSafety.gov 對含肉與不含肉焗烤料理的標準為 74°C（165°F）。若未達，每次續烤 5 分鐘後複測，直到中心確認達 74°C；上色和冒泡是品質指標，不是安全終點。",
    "チーズコアーリョまたはパルメザン100g全量を上に均等に散らします。200°C（400°F）で目安として20〜25分、縁が泡立ち焼き色がつくまで焼きます。清潔な温度計で中心を測ります。FoodSafety.govは肉入り・肉なしのキャセロールを74°C（165°F）としています。未達なら74°Cに達するまで5分ずつ追加して再測定します。焼き色や泡立ちは品質の目安で、安全終点ではありません。",
    "퀘이주 코알류 또는 파르메산 치즈 100g 전량을 위에 고르게 뿌린다. 200°C (400°F)에서 약 20–25분 가장자리가 끓고 윗면이 노릇해질 때까지 굽는다. 깨끗한 온도계로 가운데를 잰다. FoodSafety.gov는 고기 포함 및 미포함 캐서롤 모두 74°C (165°F)를 기준으로 한다. 미달이면 가운데가 74°C에 도달할 때까지 5분씩 더 굽고 다시 잰다. 색과 거품은 품질 신호이지 안전 기준이 아니다.",
    "โรยชีสเคโซโคอาลูหรือพาร์เมซาน 100 กรัมทั้งหมดให้ทั่ว อบที่ 200°C (400°F) ประมาณ 20–25 นาทีจนขอบเดือดและหน้ามีสี ใช้เทอร์โมมิเตอร์สะอาดวัดตรงกลาง FoodSafety.gov กำหนดหม้ออบทั้งที่มีและไม่มีเนื้อไว้ที่ 74°C (165°F) หากยังไม่ถึงให้อบเพิ่มครั้งละ 5 นาทีและตรวจซ้ำจนใจกลางถึง 74°C สีและฟองเป็นสัญญาณคุณภาพ ไม่ใช่จุดปลอดภัย"
  ));
  body(recipe, 6, ml(
    "After the centre reaches 74°C (165°F), rest the casserole for 10 minutes so it sets, then divide it into six equal portions. Each portion receives one-sixth of the filling (about 100 g cooked carne seca), one-sixth of the 1,000 g raw cassava amount (about 167 g before boiling), and about 17 g each of the listed cream cheese and grated cheese. The rest is included in the cook-time estimate, not the oven safety check.",
    "中心達 74°C（165°F）後，將焗烤靜置 10 分鐘定型，再平均分成 6 份。每份含六分之一內餡（約 100 公克熟牛肉絲）、六分之一的 1,000 公克生樹薯（煮前約 167 公克），以及各約 17 公克配料表中的奶油乳酪和刨絲起司。這段靜置包含在烹調估時中，不取代烤箱安全溫度檢查。",
    "中心が74°C（165°F）に達したら、形を落ち着かせるため10分休ませ、6等分します。1人分には具の6分の1（調理済み干し牛肉約100g）、生のキャッサバ1,000gの6分の1（ゆでる前で約167g）、クリームチーズと削ったチーズを各約17gずつ含みます。休ませ時間は調理時間の目安に含めますが、オーブンの安全温度確認の代わりにはなりません。",
    "가운데가 74°C (165°F)에 도달한 뒤 10분 쉬어 모양을 잡고 여섯 등분한다. 한 인분에는 속 재료의 6분의 1(익힌 카르네 세카 약 100g), 생 카사바 1,000g의 6분의 1(삶기 전 약 167g), 목록의 크림치즈와 간 치즈가 각각 약 17g씩 들어간다. 휴지 시간은 조리 시간 추정에 포함되지만 오븐 안전 온도 확인을 대신하지 않는다.",
    "เมื่อใจกลางถึง 74°C (165°F) พักหม้ออบ 10 นาทีให้เซตตัว แล้วแบ่งเป็น 6 ส่วนเท่า ๆ กัน แต่ละส่วนได้ไส้หนึ่งในหก (เนื้อคาร์เนเซกาปรุงสุกประมาณ 100 กรัม) มันสำปะหลังดิบหนึ่งในหกจาก 1,000 กรัม (ประมาณ 167 กรัมก่อนต้ม) และครีมชีสกับชีสขูดอย่างละประมาณ 17 กรัม เวลาพักรวมอยู่ในเวลาเคี่ยวโดยประมาณ แต่ไม่ทดแทนการตรวจอุณหภูมิปลอดภัยในเตาอบ"
  ));
  recipe.storage = ml(
    "Divide leftovers into shallow containers and refrigerate within 2 hours at or below 4°C/40°F. Three days is a cassava-texture preference; FoodSafety.gov lists cooked meat leftovers at 3–4 days. Reheat only the portion needed until the centre reaches 74°C/165°F. A browned top is a quality cue, not proof that reheated filling is hot enough.",
    "剩菜分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。為保持樹薯泥口感，建議 3 天內食用是品質偏好；FoodSafety.gov 將熟肉剩菜列為 3–4 天。只取所需份量復熱至中心 74°C/165°F。表面上色是品質指標，不能證明復熱內餡已足夠熱。",
    "残りは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。キャッサバの食感のため3日以内を勧めますが、これは品質上の目安です。FoodSafety.govは調理済み肉の残り物を3〜4日としています。食べる分だけ中心が74°C/165°Fになるまで再加熱します。表面の焼き色は品質の目安で、中心の安全温度を示すものではありません。",
    "남은 음식은 얕은 용기에 나눠 담아 2시간 안에 4°C/40°F 이하로 냉장한다. 카사바 식감을 위한 3일은 품질 기준이며, FoodSafety.gov는 조리된 고기 남은 음식을 3–4일로 안내한다. 먹을 만큼만 가운데가 74°C/165°F가 될 때까지 재가열한다. 노릇한 윗면은 품질 신호일 뿐 속이 충분히 뜨겁다는 증거가 아니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า คำแนะนำให้กินภายใน 3 วันเพื่อเนื้อสัมผัสมันสำปะหลังเป็นเรื่องคุณภาพ ส่วน FoodSafety.gov ระบุเนื้อปรุงสุกที่เหลือ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินจนตรงกลางถึง 74°C/165°F หน้าสีน้ำตาลเป็นสัญญาณคุณภาพ ไม่ใช่หลักฐานว่าไส้ด้านในร้อนพอ"
  );
  addCommonSafetySources(recipe);
}

function reviseFrenchOnionSoup(recipe) {
  body(recipe, 2, ml(
    "Uncover and cook the onions over medium-low for an estimated 40–50 minutes, stirring every 3–5 minutes. When the fond catches, add a little of the listed 60 ml reserved water and scrape; do not let black patches form. Deep-golden colour and the long reduction are flavour and texture cues, not food-safety endpoints. The 100-minute cook estimate covers the onion stages, broth simmer, toast, gratin, and short rest; toast while the soup simmers.",
    "打開鍋蓋，以中小火炒洋蔥約 40–50 分鐘，每 3–5 分鐘攪拌一次。鍋底焦糖色沉澱開始黏鍋時，加入配料表中預留的 60 毫升水少許並刮起；不要炒出黑斑。深金色與長時間收濃是風味和口感指標，不是食安終點。100 分鐘烹調估時包含洋蔥處理、湯汁燉煮、烤麵包、焗烤與短暫靜置；湯燉煮時可同時烤麵包。",
    "ふたを外し、中弱火で目安として40〜50分、3〜5分ごとに混ぜながら炒めます。鍋底の焦げつきが出たら分量にある取り置き水60mlの一部を加えてこそげ、黒い焦げを作らないようにします。濃い金色と長い煮詰め時間は風味・食感の目安で、食品安全の終点ではありません。調理時間100分の目安には、玉ねぎ、スープの煮込み、トースト、グラタン仕上げ、短い休ませ時間を含みます。スープの煮込み中にパンを焼きます。",
    "뚜껑을 열고 중약불에서 추정 40–50분 볶으며 3–5분마다 젓는다. 바닥에 눌어붙기 시작하면 목록의 남겨 둔 물 60ml 중 조금을 넣어 긁어낸다. 검게 타는 부분이 생기지 않게 한다. 진한 황금빛과 오래 졸이는 시간은 풍미와 식감 기준이지 식품 안전 종점이 아니다. 조리 시간 추정 100분에는 양파 조리, 국물 끓이기, 빵 굽기, 그라탱과 짧은 휴지가 포함된다. 국물을 끓이는 동안 빵을 굽는다.",
    "เปิดฝาแล้วผัดหอมด้วยไฟกลางอ่อนประมาณ 40–50 นาที คนทุก 3–5 นาที เมื่อคราบเริ่มติดก้นหม้อให้เติมน้ำที่สำรองไว้ตามรายการ 60 มล.ทีละน้อยแล้วขูดออก อย่าให้เกิดรอยไหม้ดำ สีทองเข้มและการเคี่ยวนานเป็นเกณฑ์ด้านรสและเนื้อสัมผัส ไม่ใช่จุดความปลอดภัยด้านอาหาร เวลาเคี่ยว 100 นาทีเป็นค่าประมาณที่รวมขั้นตอนหอม การเคี่ยวน้ำซุป ปิ้งขนมปัง กราตัง และพักสั้น ๆ ปิ้งขนมปังระหว่างที่น้ำซุปเคี่ยว"
 ));
  body(recipe, 6, ml(
    "Fill four broiler-safe bowls with the full 1.5 L soup, about 375 ml per bowl. Add two of the eight toasted baguette slices (30 g bread) and one-quarter of the 120 g Gruyère (30 g) to each. Broil 2–4 minutes until bubbling and spotted brown; rest 3 minutes with oven gloves. The cheese colour is a quality cue. Finish with one-quarter of the parsley per bowl.",
    "將全部 1.5 公升湯分入 4 個耐烤碗，每碗約 375 毫升。每碗放 8 片烤法棍中的 2 片（麵包 30 公克），再放 120 公克 Gruyère 起司的四分之一（30 公克）。烤上火 2–4 分鐘至冒泡並出現褐色斑點；戴隔熱手套取出，靜置 3 分鐘。起司上色是品質指標。每碗最後撒上四分之一的巴西里。",
    "耐熱の器4つにスープ1.5L全量を分け、各約375ml入れます。焼いたバゲット8切れのうち2切れ（パン30g）と、グリュイエール120gの4分の1（30g）を各器にのせます。上火で2〜4分、泡立って焼き色が点々とつくまで焼きます。ミトンで取り出して3分休ませます。チーズの焼き色は品質の目安です。パセリも4等分して各器に散らします。",
    "오븐용 그릇 네 개에 수프 1.5L 전량을 나눠 담아 한 그릇에 약 375ml씩 넣는다. 구운 바게트 8쪽 중 두 쪽(빵 30g)과 그뤼에르 120g의 4분의 1(30g)을 각각 올린다. 윗불로 2–4분 거품이 나고 갈색 점이 생길 때까지 굽는다. 오븐 장갑을 끼고 꺼내 3분 둔다. 치즈 색은 품질 신호다. 파슬리도 네 몫으로 나눠 각 그릇에 올린다.",
    "แบ่งซุป 1.5 ลิตรทั้งหมดลงชามทนไฟ 4 ใบ ใบละประมาณ 375 มล. วางขนมปังบาแก็ตอบ 2 ชิ้นจาก 8 ชิ้น (ขนมปัง 30 กรัม) และกรูแยร์ 120 กรัมหนึ่งในสี่ (30 กรัม) ต่อชาม ย่างด้านบน 2–4 นาทีจนเดือดปุดและมีจุดสีน้ำตาล ใช้ถุงมือกันร้อนนำออกพัก 3 นาที สีชีสเป็นสัญญาณคุณภาพ แบ่งพาร์สลีย์เป็น 4 ส่วนโรยบนแต่ละชาม"
 ));
  recipe.storage = ml(
    "Store the soup and toasted bread/cheese separately. Divide soup into shallow containers and refrigerate within 2 hours at or below 4°C/40°F. Use within 3–4 days under FoodSafety.gov guidance; add toast and cheese only when serving to keep their texture crisp (a quality preference). Reheat the soup portion needed until it reaches 74°C/165°F throughout, then gratinate with fresh toast and cheese.",
    "湯與烤麵包、起司分開保存。湯分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。依 FoodSafety.gov 指引，3–4 天內食用；為保持麵包酥脆，吃前才加麵包與起司（品質偏好）。只取所需份量，將湯復熱至全體達 74°C/165°F，再以新烤麵包和起司焗烤。",
    "スープとトースト・チーズは別々に保存します。スープを浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。FoodSafety.govの目安では3〜4日以内に使います。パンの食感を保つため、トーストとチーズは食べる時に加えます（品質上の好み）。食べる分のスープを全体が74°C/165°Fになるまで再加熱し、新しいトーストとチーズをのせて焼きます。",
    "수프와 구운 빵·치즈를 따로 보관한다. 수프를 얕은 용기에 나눠 담아 2시간 안에 4°C/40°F 이하로 냉장한다. FoodSafety.gov 지침에 따라 3–4일 안에 먹는다. 바삭한 식감을 위해 빵과 치즈는 먹기 직전에 올린다(품질 선호). 먹을 수프만 전체가 74°C/165°F가 될 때까지 재가열한 뒤 새로 구운 빵과 치즈를 올려 그라탱한다.",
    "เก็บน้ำซุปแยกจากขนมปังและชีส แบ่งน้ำซุปใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า ใช้ภายใน 3–4 วันตามแนวทาง FoodSafety.gov เติมขนมปังและชีสเมื่อจะเสิร์ฟเพื่อคงความกรอบซึ่งเป็นความชอบด้านคุณภาพ อุ่นเฉพาะส่วนของน้ำซุปที่จะกินจนร้อนทั่วถึง 74°C/165°F แล้วกราตังด้วยขนมปังและชีสที่เตรียมใหม่"
  );
  addCommonSafetySources(recipe);
}

export function refineSixtySixthMethods(recipes) {
  const targets = ["jjajangmyeon", "bun-bo-nam-bo", "escondidinho-de-carne-seca", "french-onion-soup"];
  const revise = {
    "jjajangmyeon": reviseJjajangmyeon,
    "bun-bo-nam-bo": reviseBunBoNamBo,
    "escondidinho-de-carne-seca": reviseEscondidinho,
    "french-onion-soup": reviseFrenchOnionSoup
  };
  for (const id of targets) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error("Recipe method audit 66: missing recipe " + id);
    const revised = clone(recipes[index]);
    revise[id](revised);
    recipes[index] = revised;
  }
  return recipes;
}
