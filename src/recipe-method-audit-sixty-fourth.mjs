const ml = (en, zh, ja, ko, th) => ({ en, "zh-hant": zh, ja, ko, th });
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";

function clone(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, amount: typeof row.amount === "object" ? { ...row.amount } : row.amount, item: typeof row.item === "object" ? { ...row.item } : row.item })),
    instructions: recipe.instructions.map((step) => ({ ...step, title: { ...step.title }, body: { ...step.body } })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function body(recipe, index, value) {
  recipe.instructions[index].body = value;
}

function official(recipe, label, url) {
  const title = "Official food-safety guidance — " + label;
  const found = recipe.sources.find((source) => source.url === url);
  if (found) found.title = title;
  else recipe.sources.push({ title, url });
}

function source(recipe, title, url) {
  if (!recipe.sources.some((entry) => entry.url === url)) recipe.sources.push({ title, url });
}

function reviseTomKha(recipe) {
  recipe.cookMinutes = 30;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 2, ml(
    "Add all 500 g chicken slices without clumping. Simmer gently for an estimated 6–8 minutes, stirring twice. The time and opaque appearance are only cues: use a clean thermometer to check several of the thickest slices; every checked piece of poultry must reach 74°C (165°F). If any is below temperature, simmer 1 minute and check again.",
    "加入全部 500 公克雞肉片，避免結成一團。小火微滾約 6–8 分鐘並攪拌兩次。時間與不透明外觀只是判斷提示：用乾淨溫度計測量數片最厚處，禽肉每片都須達 74°C（165°F）。若低於標準，每次續煮 1 分鐘後再測。",
    "鶏肉500g全量を固まらないよう加えます。弱く煮立て、目安として6〜8分、途中2回混ぜます。時間や白くなった見た目だけでは判断せず、清潔な温度計で最も厚い部分を数枚確認します。確認した鶏肉は全て74°C（165°F）に達する必要があります。低ければ1分ずつ煮て再確認します。",
    "닭고기 500g 전량을 뭉치지 않게 넣는다. 약하게 끓이며 추정 6–8분 익히고 두 번 젓는다. 시간이나 불투명한 모양만으로 판단하지 말고 깨끗한 온도계로 가장 두꺼운 조각 여러 개를 잰다. 확인한 모든 가금류 조각은 74°C (165°F)에 도달해야 한다. 낮으면 1분씩 더 끓여 다시 잰다.",
    "ใส่ไก่ 500 กรัมทั้งหมดไม่ให้จับเป็นก้อน เคี่ยวอ่อนประมาณ 6–8 นาทีและคนสองครั้ง เวลาและสีขาวทึบเป็นเพียงจุดสังเกต ใช้เทอร์โมมิเตอร์สะอาดวัดส่วนหนาที่สุดหลายชิ้น ไก่ทุกชิ้นที่ตรวจต้องถึง 74°C (165°F) หากต่ำให้เคี่ยวต่อครั้งละ 1 นาทีแล้ววัดซ้ำ"
  ));
  body(recipe, 5, ml(
    "Divide the chicken and mushrooms evenly among 4 warmed bowls: about 125 g raw-chicken equivalent and 62.5 g raw mushrooms per serving. Ladle in the broth evenly, about 250 ml each, and divide all 15 g cilantro (about 4 g each). Leave the woody aromatics for fragrance, but do not eat them.",
    "雞肉與菇類平均分入 4 個熱碗，每份約相當於 125 公克生雞肉與 62.5 公克生菇。湯汁平均分配，每碗約 250 毫升；15 公克香菜全部分給四碗，每碗約 4 公克。木質香料留在湯中增香，但不要食用。",
    "鶏肉ときのこを温めた4つの器に均等に分けます。1杯あたり生の鶏肉換算約125g、きのこ約62.5gです。汁を均等に約250mlずつ注ぎ、パクチー15g全量を各約4gずつ散らします。硬い香味野菜は香りづけに残しますが、食べません。",
    "따뜻한 네 그릇에 닭고기와 버섯을 똑같이 나눈다. 한 그릇당 생닭 기준 약 125g, 생버섯 62.5g이다. 국물을 약 250ml씩 고르게 붓고 고수 15g 전량을 그릇당 약 4g씩 나눈다. 질긴 향신채는 향을 위해 남기되 먹지는 않는다.",
    "แบ่งไก่และเห็ดเท่ากันใส่ 4 ชามอุ่น แต่ละที่เทียบเท่าไก่ดิบประมาณ 125 กรัมและเห็ดดิบ 62.5 กรัม ตักน้ำซุปชามละประมาณ 250 มล. แบ่งผักชี 15 กรัมทั้งหมดชามละราว 4 กรัม ทิ้งก้านสมุนไพรแข็งไว้เพิ่มกลิ่นแต่ไม่รับประทาน"
  ));
  recipe.storage = ml(
    "Cool leftover soup in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Three days is a conservative texture preference; FoodSafety.gov lists refrigerated soups and stews at 3–4 days. Reheat only the portion needed to 74°C/165°F throughout. Add any fresh lime after reheating.",
    "剩湯分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 3 天內食用是保守的口感偏好；FoodSafety.gov 對冷藏湯與燉菜列為 3–4 天。只取要吃的份量復熱至各處達 74°C/165°F。若另加新鮮萊姆，請在復熱後加入。",
    "残ったスープは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。3日以内は食感を重視した保守的な目安で、FoodSafety.govの冷蔵スープ・シチューは3〜4日です。食べる分だけ全体が74°C/165°Fになるまで再加熱します。新しいライムは再加熱後に加えます。",
    "남은 국은 얕은 용기에 나눠 2시간 안에 4°C/40°F 이하로 냉장한다. 3일은 식감을 위한 보수적 권장 기간이고 FoodSafety.gov의 냉장 수프·스튜 기준은 3–4일이다. 먹을 만큼만 전체가 74°C/165°F가 되도록 재가열한다. 새 라임은 데운 뒤 넣는다.",
    "แบ่งซุปที่เหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 3 วันเป็นคำแนะนำเผื่อด้านเนื้อสัมผัส ส่วน FoodSafety.gov ระบุซุปและสตูแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C/165°F เติมมะนาวสดหลังอุ่น"
  );
  source(recipe, "The Guardian — Chicken soup with lime leaf, lemongrass and coconut", "https://www.theguardian.com/food/article/2024/may/27/chicken-soup-with-lime-leaf-lemongrass-and-coconut-recipe-by-claire-thomson");
  official(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  official(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseBaWan(recipe) {
  const water = recipe.ingredients.find((row) => row.item.en === "boiling water");
  if (water) water.item = ml("water for dough: 220 ml cold and 300 ml boiling", "麵糰用水：冷水 220 毫升、沸水 300 毫升", "生地用の水（冷水220ml、熱湯300ml）", "반죽용 물: 찬물 220ml, 끓는 물 300ml", "น้ำสำหรับแป้ง: น้ำเย็น 220 มล. และน้ำเดือด 300 มล.");
  const oil = recipe.ingredients.find((row) => row.amount === "30 ml");
  if (oil) oil.item = ml("neutral oil for dough, plus a measured 5 ml for the molds", "中性油：麵糰用，另取 5 毫升塗模", "植物油（生地用、型用に別途5ml）", "반죽용 중성유, 틀에 쓸 5ml 추가", "น้ำมันรสกลางสำหรับแป้ง และอีก 5 มล.สำหรับทาพิมพ์");
  recipe.ingredients.push(
    { amount: "3 g", item: ml("granulated sugar for filling", "內餡用砂糖", "具に使う砂糖", "속에 넣을 설탕", "น้ำตาลสำหรับไส้") },
    { amount: "2 g", item: ml("ground white pepper for filling", "內餡用白胡椒粉", "具に使う白こしょう", "속에 넣을 흰 후추", "พริกไทยขาวป่นสำหรับไส้") }
  );
  body(recipe, 5, ml(
    "Steam over steadily boiling water for an estimated 28–32 minutes. The wrapper should be evenly translucent, but that is only a texture cue. With a clean thermometer, check the centre of several of the thickest 1 cm pork cubes inside the parcels, not just the wrapper or filling mixture; each checked piece must reach 63°C (145°F). These are pork shoulder pieces, not ground pork. Keep the parcels covered and rest at least 3 minutes after reaching temperature; the 8-minute mold rest satisfies this hold. If a checked piece is below temperature, steam 1 minute more and check again.",
    "以穩定沸水估計蒸 28–32 分鐘。外皮均勻透明只是口感提示。用乾淨溫度計測量數個肉圓內最厚的 1 公分豬肉丁中心，不要只量外皮或整團餡料；測量的每塊肉都須達 63°C（145°F）。這是豬肩肉丁，不是豬絞肉。達標後加蓋靜置至少 3 分鐘；留模 8 分鐘已超過此靜置時間。若測到的肉丁未達標，再蒸 1 分鐘後複測。",
    "安定して沸く湯気で目安28〜32分蒸します。皮が均一に透明なのは食感の目安にすぎません。清潔な温度計で、皮や具全体ではなく、肉圓の中の最も厚い1cmの豚肩肉の角切りを複数測ります。測った肉片は63°C（145°F）に達する必要があります。これはひき肉ではなく豚肩肉の角切りです。温度に達したらふたをして少なくとも3分休ませます。型の中で8分休ませればこの時間を満たします。低ければ1分ずつ追加で蒸して再確認します。",
    "끓는 물에서 추정 28–32분 찐다. 피가 고르게 투명한 것은 식감 신호일 뿐이다. 깨끗한 온도계로 피나 속 전체가 아니라 바완 안의 가장 두꺼운 1cm 돼지 어깨살 조각 여러 개의 중심을 잰다. 확인한 각 고기 조각은 63°C (145°F)에 도달해야 한다. 이는 다진 돼지고기가 아닌 돼지 어깨살 조각이다. 온도에 도달한 뒤 덮어 최소 3분 쉬게 한다. 틀에서 8분 쉬면 이 시간을 충족한다. 낮으면 1분 더 찌고 다시 잰다.",
    "นึ่งเหนือน้ำเดือดประมาณ 28–32 นาที แป้งที่ใสทั่วเป็นเพียงสัญญาณด้านเนื้อสัมผัส ใช้เทอร์โมมิเตอร์สะอาดวัดตรงกลางหมูไหล่หั่นเต๋า 1 ซม. ที่หนาที่สุดหลายชิ้นภายในขนม ไม่ใช่วัดแค่แป้งหรือไส้รวม แต่ละชิ้นที่ตรวจต้องถึง 63°C (145°F) นี่คือหมูไหล่หั่นชิ้น ไม่ใช่หมูบด เมื่อถึงอุณหภูมิแล้วปิดฝาพักอย่างน้อย 3 นาที การพักในพิมพ์ 8 นาทีเพียงพอ หากชิ้นที่วัดยังต่ำให้นึ่งต่อครั้งละ 1 นาทีแล้ววัดซ้ำ"
  ));
  body(recipe, 3, ml(
    "Oil eight 10 cm bowls with the measured 5 ml oil, about 0.6 ml each. Weigh the finished dough and divide all of it into 8 equal portions; use about two-thirds of each for a 4–5 mm base and sides and reserve the rest as its lid. Cover unused dough.",
    "用量取的 5 毫升油塗抹八個 10 公分碗，每碗約 0.6 毫升。將完成的麵糰秤重後全量平均分成 8 份；每份約三分之二鋪成 4–5 毫米底與側壁，剩餘作封口。未用麵糰加蓋。",
    "計量した油5mlを10cmの器8個に塗り、1個約0.6mlずつにします。できた生地を量り、全量を8等分します。各分の約3分の2を4〜5mm厚の底と側面に使い、残りをふたにします。使わない生地は覆います。",
    "계량한 기름 5ml를 지름 10cm 그릇 8개에 바른다(각 약 0.6ml). 완성된 반죽 무게를 재어 전부 8등분한다. 각 몫의 약 3분의 2는 4–5mm 두께의 바닥과 옆면으로 펴고 나머지는 덮개로 쓴다. 쓰지 않는 반죽은 덮어 둔다.",
    "ทาน้ำมันที่ตวงไว้ 5 มล.ในชามขนาด 10 ซม. 8 ใบ ใบละประมาณ 0.6 มล. ชั่งแป้งที่ทำเสร็จแบ่งทั้งหมดเป็น 8 ส่วนเท่ากัน ใช้ประมาณสองในสามกรุฐานและขอบหนา 4–5 มม. เหลือส่วนที่เหลือไว้ปิดหน้า คลุมแป้งที่ยังไม่ใช้"
  ));
  body(recipe, 4, ml(
    "Weigh all the filling and divide it into 8 equal portions, roughly 65–70 g each. Put one in each lined bowl; cover and seal with its reserved dough so the pork is enclosed. This uses all of the listed filling.",
    "將全部餡料秤重，平均分成 8 份，每份約 65–70 公克。各取一份放入模具，以預留麵糰覆蓋封合、包住豬肉。如此會用完全部餡料。",
    "具を全て量って8等分し、1つ約65〜70gにします。型に1つずつ入れ、取り置いた生地で覆って閉じ、豚肉を包みます。具を全量使い切ります。",
    "소를 모두 재어 8등분한다(한 몫 약 65–70g). 틀마다 한 몫씩 놓고 남겨 둔 반죽으로 덮어 봉해 돼지고기를 감싼다. 표시된 소를 전부 사용한다.",
    "ชั่งไส้ทั้งหมดแบ่ง 8 ส่วนเท่ากัน ส่วนละประมาณ 65–70 กรัม วางในพิมพ์ใบละหนึ่งส่วนแล้วปิดและซีลด้วยแป้งที่เหลือให้ห่อหมูมิด ใช้ไส้ที่ระบุทั้งหมด"
  ));
  body(recipe, 7, ml(
    "Unmold one ba-wan into each of 8 shallow bowls. Divide the full batch of sauce evenly, about 50 ml per serving, and serve while the wrapper is warm and springy.",
    "每個淺碗放一個肉圓，共 8 份。整批醬汁平均分配，每份約 50 毫升；外皮溫熱有彈性時上桌。",
    "浅い器8つにバーワンを1個ずつ入れます。たれ全量を均等に分け、1人分約50mlかけ、皮が温かく弾力のあるうちに供します。",
    "얕은 그릇 8개에 바완을 하나씩 담는다. 소스 전체를 균등하게 나눠 한 그릇당 약 50ml씩 붓고 피가 따뜻하고 탄력 있을 때 낸다.",
    "ใส่บะวันหนึ่งชิ้นในชามตื้น 8 ใบ แบ่งซอสทั้งหมดเท่ากันประมาณ 50 มล.ต่อที่ เสิร์ฟขณะแป้งยังอุ่นและเด้ง"
  ));
  recipe.storage = ml(
    "Cool leftovers in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Two days is a wrapper-quality preference; FoodSafety.gov lists cooked meat leftovers at 3–4 days. Freeze un-sauced pieces for up to 1 month for best texture. Re-steam refrigerated or thawed portions until the centre reaches 74°C/165°F.",
    "剩餘肉圓分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 2 天內食用是外皮口感偏好；FoodSafety.gov 對熟肉剩菜列為 3–4 天。未淋醬肉圓冷凍 1 個月內口感較佳。冷藏或解凍後蒸至中心達 74°C/165°F。",
    "残りは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。2日以内は皮の食感を重視した目安で、FoodSafety.govは調理済み肉の残りを3〜4日としています。最良の食感にはたれなしで1か月まで冷凍します。冷蔵または解凍後は中心が74°C/165°Fになるまで蒸します。",
    "남은 음식은 얕은 용기에 담아 2시간 안에 4°C/40°F 이하로 냉장한다. 2일은 피 식감 기준이고 FoodSafety.gov는 조리된 고기 남은 음식을 3–4일로 안내한다. 최상의 식감을 위해 소스 없이 1개월까지 냉동한다. 냉장 또는 해동한 것은 가운데가 74°C/165°F가 될 때까지 다시 찐다.",
    "แบ่งของเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 2 วันเป็นคำแนะนำด้านคุณภาพของแป้ง ส่วน FoodSafety.gov ระบุเนื้อปรุงสุกที่เหลือ 3–4 วัน แช่แข็งแบบไม่ราดซอสได้ถึง 1 เดือนเพื่อเนื้อสัมผัสที่ดี นึ่งส่วนที่แช่เย็นหรือละลายจนแกนกลางถึง 74°C/165°F"
  );
  const oldUrl = "https://fae.moa.gov.tw/upload/fae/files/topics/4227/Healthy%20and%20Delicious%20Food%20for%20the%20Senior%20Palate.pdf";
  const sourceIndex = recipe.sources.findIndex((entry) => entry.url === oldUrl);
  if (sourceIndex >= 0) recipe.sources[sourceIndex] = { title: "Yun Hai Taiwan Stories — Bawan Buddies", url: "https://newsletter.yunhai.shop/p/bawan-buddies" };
  official(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  official(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function revisePhilly(recipe) {
  body(recipe, 0, ml(
    "Slice beef thinly: Chill the beef until firm but not frozen, then slice across the grain about 6 mm thick so a thin-probe thermometer can be inserted from the side into the centre. Keep the slices cold until the griddle is ready.",
    "牛肉冷藏至結實但不結冰，逆紋切成約 6 毫米薄片，讓細探針溫度計可從側面插入中心。鐵板備妥前保持冷藏。",
    "牛肉は凍らない程度に冷やして固くし、繊維を断つよう約6mmに薄切りします。細い温度計を横から中心まで差し込める厚さにします。調理台が整うまで冷蔵します。",
    "소고기를 얼지 않을 만큼 단단하게 차게 한 뒤 결 반대로 약 6mm 두께로 얇게 썬다. 얇은 온도계 탐침을 옆에서 중심까지 넣을 수 있게 한다. 철판이 준비될 때까지 차갑게 둔다.",
    "แช่เนื้อให้แข็งแต่ไม่เป็นน้ำแข็ง แล้วหั่นขวางเส้นใยหนาประมาณ 6 มม. เพื่อให้สอดหัววัดเทอร์โมมิเตอร์จากด้านข้างถึงตรงกลางได้ เก็บเย็นจนกระทะพร้อม"
  ));
  body(recipe, 1, ml(
    "Heat the griddle over medium-high with 15 ml of the listed 30 ml oil. Add all 220 g onion and cook about 6–8 minutes until softened and golden at the edges; move it to the cooler side. The oil split and time are estimates for flavour and texture.",
    "煎台中大火加熱，使用所列 30 毫升油中的 15 毫升。加入全部 220 公克洋蔥，約炒 6–8 分鐘至軟化且邊緣金黃，再移到較涼處。油量分配與時間是風味和口感估算。",
    "鉄板を中強火にし、表示した油30mlのうち15mlを使います。玉ねぎ220g全量を約6〜8分、柔らかく縁がきつね色になるまで炒め、温度の低い側へ移します。油の配分と時間は風味・食感の目安です。",
    "철판을 중강불로 달구고 표시된 기름 30ml 중 15ml를 쓴다. 양파 220g 전량을 약 6–8분 부드럽고 가장자리가 노릇해질 때까지 볶아 온도가 낮은 쪽으로 옮긴다. 기름 배분과 시간은 풍미와 식감 추정치다.",
    "ตั้งกระทะไฟกลางค่อนแรง ใช้น้ำมัน 15 มล.จากทั้งหมด 30 มล. ใส่หอมใหญ่ 220 กรัมทั้งหมด ผัดประมาณ 6–8 นาทีจนนุ่มและขอบเป็นสีทอง ย้ายไปด้านที่เย็นกว่า ปริมาณน้ำมันและเวลาเป็นค่าประมาณด้านรสชาติและเนื้อสัมผัส"
  ));
  body(recipe, 3, ml(
    "Raise the griddle to high and use the remaining 15 ml oil. Sear the 700 g rib-eye in two equal batches, about 350 g each, for an estimated 60–90 seconds in a loose layer. Browning time is not the safety test. Insert a clean thin-probe thermometer sideways into the centre of the thickest slice in each batch: this is beef sliced from an intact whole-muscle cut, not ground beef, so it must reach 63°C (145°F) and rest for 3 minutes. If below temperature, cook in 30-second increments and recheck.",
    "煎台轉大火並用剩餘 15 毫升油。將 700 公克肋眼牛排平均分兩批，每批約 350 公克，鬆散鋪開估計煎 60–90 秒。上色時間不是安全熟度檢查。用乾淨細探針溫度計從側面插入每批最厚肉片中心：這是從完整牛肉切出的肉片，不是牛絞肉，須達 63°C（145°F）並靜置 3 分鐘。若未達標，每次續煎 30 秒後複測。",
    "鉄板を強火にし、残りの油15mlを使います。リブアイ700gを約350gずつ2回に分け、ゆるく広げて目安として各60〜90秒焼きます。焼き色は安全確認ではありません。清潔な細い温度計を横から各回で最も厚い肉片の中心に差し込みます。これはひき肉ではなく塊肉から切った牛肉なので、63°C（145°F）に達して3分休ませます。低ければ30秒ずつ焼いて再確認します。",
    "철판을 센 불로 올리고 남은 기름 15ml를 쓴다. 꽃등심 700g을 약 350g씩 두 번 나눠 한 겹으로 느슨하게 펴고 추정 60–90초 굽는다. 갈색은 안전 확인이 아니다. 깨끗한 얇은 온도계 탐침을 옆에서 각 묶음의 가장 두꺼운 고기 조각 중심까지 넣는다. 통근육에서 자른 소고기이며 다진 고기가 아니므로 63°C (145°F)에 도달한 뒤 3분 쉰다. 낮으면 30초씩 더 굽고 다시 잰다.",
    "เร่งไฟแรงและใช้น้ำมันที่เหลือ 15 มล. แบ่งริบอาย 700 กรัมเป็นสองชุด ชุดละประมาณ 350 กรัม กระจายหลวม ๆ ย่างประมาณ 60–90 วินาที สีเกรียมไม่ใช่การตรวจความปลอดภัย สอดหัววัดเทอร์โมมิเตอร์สะอาดจากด้านข้างถึงตรงกลางของชิ้นที่หนาที่สุดในแต่ละชุด เนื้อวัวนี้หั่นมาจากชิ้นเต็ม ไม่ใช่เนื้อบด จึงต้องถึง 63°C (145°F) และพัก 3 นาที หากต่ำให้ย่างต่อครั้งละ 30 วินาทีแล้ววัดซ้ำ"
  ));
  body(recipe, 4, ml(
    "After the beef has rested 3 minutes, return it with the onions. Season with all 7 g salt and all 2 g pepper, chop through with two spatulas, and divide into 4 equal portions. Each sandwich gets about 175 g raw-beef equivalent and 55 g raw onion.",
    "牛肉靜置 3 分鐘後與洋蔥放回煎台。加入全部 7 公克鹽和全部 2 公克胡椒，用兩支鍋鏟切拌後分成 4 份。每份約相當於 175 公克生牛肉及 55 公克生洋蔥。",
    "牛肉を3分休ませてから玉ねぎと一緒に戻します。塩7g全量とこしょう2g全量を加え、ヘラ2本で刻み混ぜて4等分します。1個あたり生の牛肉換算約175g、玉ねぎ約55gです。",
    "소고기를 3분 쉰 뒤 양파와 함께 철판에 되돌린다. 소금 7g과 후추 2g 전량을 넣고 주걱 두 개로 잘게 섞어 네 몫으로 나눈다. 한 샌드위치당 생고기 기준 소고기 약 175g, 생양파 55g이다.",
    "พักเนื้อ 3 นาทีแล้วนำกลับลงกระทะพร้อมหอม ใส่เกลือ 7 กรัมและพริกไทย 2 กรัมทั้งหมด ใช้ตะหลิวสองอันสับคลุกและแบ่ง 4 ส่วน แต่ละชิ้นเทียบเท่าเนื้อดิบประมาณ 175 กรัมและหอมดิบ 55 กรัม"
  ));
  body(recipe, 5, ml(
    "Divide all 160 g provolone among the four portions (about 40 g each). Cover for about 1 minute until it melts into the beef; this is a serving-texture estimate.",
    "將全部 160 公克普羅沃洛內起司分給四份，每份約 40 公克。加蓋約 1 分鐘至融入牛肉；此為上桌口感估時。",
    "プロヴォローネ160g全量を4つに分け、各約40gのせます。ふたをして約1分、牛肉になじむまで溶かします。これは食感の目安です。",
    "프로볼로네 160g 전량을 네 몫에 나눠 각각 약 40g 올린다. 덮고 약 1분 소고기에 녹아들 때까지 둔다. 이는 서빙 질감 추정치다.",
    "แบ่งโพรโวโลน 160 กรัมทั้งหมดใส่ 4 ส่วน ส่วนละประมาณ 40 กรัม ปิดฝาประมาณ 1 นาทีจนละลายเข้ากับเนื้อ เป็นค่าประมาณด้านเนื้อสัมผัสก่อนเสิร์ฟ"
  ));
  recipe.storage = ml(
    "Cool filling and rolls separately in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Three days is a conservative quality choice; FoodSafety.gov lists cooked meat leftovers at 3–4 days. Reheat only the filling being served to 74°C/165°F throughout, warm the roll separately, and assemble.",
    "牛肉餡與麵包分開裝入淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 3 天內食用是保守品質選擇；FoodSafety.gov 對熟肉剩菜列為 3–4 天。只將要吃的牛肉餡復熱至各處達 74°C/165°F，麵包分開加熱後再組裝。",
    "具とパンを別々の浅い容器に入れ、2時間以内に4°C/40°F以下で冷蔵します。3日以内は品質を重視した保守的な目安で、FoodSafety.govは調理済み肉の残りを3〜4日としています。食べる分の具だけ全体が74°C/165°Fになるまで再加熱し、パンは別に温めて組み立てます。",
    "속과 빵을 얕은 용기에 따로 담아 2시간 안에 4°C/40°F 이하로 냉장한다. 3일은 품질을 위한 보수적 선택이고 FoodSafety.gov는 조리된 고기 남은 음식을 3–4일로 안내한다. 먹을 만큼의 속만 전체가 74°C/165°F가 되도록 데우고 빵은 따로 데워 조립한다.",
    "แยกไส้กับขนมปังใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 3 วันเป็นการเลือกเผื่อด้านคุณภาพ ส่วน FoodSafety.gov ระบุเนื้อปรุงสุกที่เหลือ 3–4 วัน อุ่นเฉพาะไส้ที่จะกินให้ทั่วถึง 74°C/165°F อุ่นขนมปังแยกแล้วประกอบ"
  );
  source(recipe, "Serious Eats — Philly Cheesesteaks", "https://www.seriouseats.com/philly-cheesesteak-recipe-7546830");
  official(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  official(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseBunBoHue(recipe) {
  recipe.cookMinutes = 240;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const pork = [
    "Check pork hock after an estimated 75–90 minutes for tenderness; the skin should yield to a skewer but the piece should hold together. Check the thickest pork piece away from bone: these are non-ground pork pieces, which must reach 63°C (145°F), then rest at least 3 minutes. If low, keep simmering and recheck. Move them with a little broth to a shallow container and refrigerate within 2 hours at 4°C/40°F or below while the beef continues to tenderize.",
    "小火燉約 75–90 分鐘後以竹籤檢查豬腳是否軟嫩；皮應容易刺入但肉塊仍完整。避開骨頭測量最厚的豬腳肉塊：這些是非絞肉豬肉，須達 63°C（145°F）後至少靜置 3 分鐘。若未達標，繼續燉煮並複測。豬腳連少量湯汁分裝淺容器，牛腱繼續燉軟時，2 小時內冷藏至 4°C/40°F 以下。",
    "目安として75〜90分後、豚すね肉の皮に串が通るが形は保つ柔らかさか確認します。骨を避けて最も厚い豚肉片を測ります。ひき肉ではない豚肉片は63°C（145°F）に達した後、少なくとも3分休ませます。低ければ煮続けて再確認します。汁を少し添えて浅い容器に移し、牛肉を煮続ける間も2時間以内に4°C/40°F以下で冷蔵します。",
    "추정 75–90분 뒤 돼지 족 껍질에 꼬치가 들어가지만 조각은 형태를 유지하는지 확인한다. 뼈를 피해 가장 두꺼운 돼지 족 조각을 잰다. 다진 고기가 아닌 돼지고기 조각은 63°C (145°F)에 도달한 뒤 최소 3분 쉰다. 낮으면 계속 끓이고 다시 잰다. 육수를 조금 넣어 얕은 용기에 옮기고 소고기가 더 익는 동안 2시간 안에 4°C/40°F 이하로 냉장한다.",
    "ตรวจความนุ่มของคากิหลังเคี่ยวประมาณ 75–90 นาที หนังควรแทงได้ง่ายแต่ชิ้นยังคงรูป วัดชิ้นหมูส่วนที่หนาที่สุดโดยไม่โดนกระดูก หมูชิ้นที่ไม่ใช่หมูบดต้องถึง 63°C (145°F) แล้วพักอย่างน้อย 3 นาที หากต่ำให้เคี่ยวต่อและวัดซ้ำ ย้ายพร้อมน้ำซุปเล็กน้อยใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า ระหว่างที่เนื้อวัวเคี่ยวต่อ"
  ];
  body(recipe, 2, ml(...pork));
  const beef = [
    "Remove the beef shank when a skewer enters easily; 3–3½ hours is a tenderness estimate that varies with the cut and pot. Check its thickest centre with a clean thermometer: this whole beef cut must reach 63°C (145°F), followed by at least 3 minutes of rest. If low, return it to the simmer and recheck. Rest for 15 minutes, discard bones, onion and long lemongrass, adjust the broth to 3 L with hot water, add all fish sauce and sugar, then simmer 5 minutes.",
    "牛腱能被竹籤輕易刺入時取出；3–3½ 小時是軟嫩度估時，視肉塊與鍋具而異。用乾淨溫度計測量最厚中心：整塊牛肉須達 63°C（145°F）後至少靜置 3 分鐘。若未達標，放回小滾湯中續煮並複測。靜置 15 分鐘後，丟棄骨頭、洋蔥和長香茅；用熱水將湯調至 3 公升，加入全部魚露與糖，再煮 5 分鐘。",
    "串がすっと入ったら牛すね肉を取り出します。3〜3時間半は肉や鍋で変わる柔らかさの目安です。清潔な温度計で最も厚い中心を測ります。塊肉の牛肉は63°C（145°F）に達した後、少なくとも3分休ませます。低ければ弱く煮立つ汁へ戻して再確認します。15分休ませ、骨、玉ねぎ、長いレモングラスを除きます。熱湯で汁を3Lに調整し、魚醤と砂糖を全量加えて5分煮ます。",
    "꼬치가 쉽게 들어가면 소 정강이를 꺼낸다. 3–3½시간은 부위와 냄비에 따른 부드러움 추정치다. 깨끗한 온도계로 가장 두꺼운 중심을 잰다. 통고기 소고기는 63°C (145°F)에 도달한 뒤 최소 3분 쉰다. 낮으면 약하게 끓는 육수에 되돌려 다시 잰다. 15분 쉬게 한 뒤 뼈, 양파와 긴 레몬그라스를 버린다. 뜨거운 물로 육수를 3L로 맞추고 피시소스와 설탕 전량을 넣어 5분 끓인다.",
    "ยกเนื้อหน้าแข้งวัวเมื่อไม้เสียบแทงเข้าได้ง่าย 3–3½ ชั่วโมงเป็นเวลาประมาณด้านความนุ่มที่ขึ้นกับชิ้นเนื้อและหม้อ วัดตรงกลางส่วนหนาที่สุดด้วยเทอร์โมมิเตอร์สะอาด เนื้อวัวชิ้นเต็มต้องถึง 63°C (145°F) แล้วพักอย่างน้อย 3 นาที หากต่ำให้นำกลับไปเคี่ยวและวัดซ้ำ พัก 15 นาที ทิ้งกระดูก หอมใหญ่และตะไคร้ก้านยาว เติมน้ำร้อนปรับน้ำซุปเป็น 3 ลิตร ใส่น้ำปลาและน้ำตาลทั้งหมดแล้วเคี่ยว 5 นาที"
  ];
  body(recipe, 6, ml(...beef));
  const reheat = [
    "Slice the rested beef across the grain. Return only the chilled pork hock to the simmering broth for an estimated 3–5 minutes; check its thickest part away from bone and reheat this previously cooked, chilled meat to 74°C (165°F). Continue in 1-minute increments if needed. The fresh beef already reached its whole-cut endpoint and rest; warm it in the broth for about 1 minute. Remove loose bones from the pork.",
    "牛腱靜置後逆紋切片。只有冷藏過的豬腳放回小滾湯中約 3–5 分鐘，避開骨頭測量最厚處；這是已煮熟再冷藏的肉，復熱須達 74°C（165°F）。若未達標，每次續煮 1 分鐘後複測。新鮮牛腱已達整塊肉安全標準並完成靜置，放入湯中約 1 分鐘熱透。移除豬腳鬆脫骨頭。",
    "休ませた牛肉を繊維を断って切ります。弱く煮立つ汁に戻すのは冷蔵した豚肉だけで、目安は3〜5分です。骨を避けて最も厚い部分を測り、調理後に冷蔵した肉は74°C（165°F）まで再加熱します。必要なら1分ずつ続けます。牛肉は塊肉の基準と休ませ時間を満たしているので、汁の中で約1分温めます。豚肉の外れた骨を除きます。",
    "휴지한 소고기를 결 반대로 썬다. 약하게 끓는 육수에는 냉장했던 돼지 족만 추정 3–5분 되돌린다. 뼈를 피해 가장 두꺼운 곳을 재고 조리 후 냉장한 고기는 74°C (165°F)까지 재가열한다. 필요하면 1분씩 더 끓인다. 생 소고기는 통고기 기준과 휴지를 이미 마쳤으므로 육수에서 약 1분 데운다. 돼지고기의 떨어진 뼈는 제거한다.",
    "หั่นเนื้อวัวที่พักแล้วขวางเส้นใย นำเฉพาะคากิหมูที่แช่เย็นกลับลงในน้ำซุปเดือดอ่อนประมาณ 3–5 นาที วัดจุดหนาสุดโดยไม่โดนกระดูกและอุ่นเนื้อที่ปรุงแล้วแช่เย็นให้ถึง 74°C (165°F) หากจำเป็นให้เคี่ยวต่อครั้งละ 1 นาที เนื้อวัวเพิ่งสุกและพักตามเกณฑ์ชิ้นเต็มแล้ว ให้อุ่นในน้ำซุปราว 1 นาที เอากระดูกหมูที่หลุดออก"
  ];
  body(recipe, 9, ml(...reheat));
  body(recipe, 10, ml(
    "Divide all 3 L broth among 6 bowls (about 500 ml each) over the noodles. Share the meats evenly: each bowl represents about 133 g raw beef shank and 100 g raw bone-in pork hock purchase weight, with edible yield reduced by bone. Divide the vegetables evenly; each serving gets about 30 g sprouts, 20 g cabbage, and 10 g red onion.",
    "將全部 3 公升湯平均分入 6 碗，每碗約 500 毫升，淋在麵上。肉類平均分配，每碗約相當於 133 公克生牛腱及 100 公克生帶骨豬腳採購重量，可食肉量會因骨頭而減少。蔬菜平均分，每份約 30 公克豆芽、20 公克高麗菜及 10 公克紅洋蔥。",
    "3Lの汁を6杯に分け、麺に注ぎます（1杯約500ml）。肉も均等に分け、1杯あたり生の牛すね肉換算約133g、骨付き豚肉の購入重量約100g相当です。骨のため可食量は少なくなります。野菜も分け、1人分にもやし約30g、キャベツ20g、赤玉ねぎ10gずつ添えます。",
    "육수 3L 전량을 여섯 그릇에 나눠 면 위에 붓는다(한 그릇 약 500ml). 고기도 균등하게 나눠 한 그릇당 생 소 정강이 기준 약 133g, 뼈 포함 생 돼지 족 구매 중량 약 100g이다. 뼈 때문에 먹는 양은 줄어든다. 채소도 나눠 숙주 약 30g, 양배추 20g, 적양파 10g씩 담는다.",
    "แบ่งน้ำซุป 3 ลิตรทั้งหมดใส่ 6 ชาม ชามละประมาณ 500 มล.ราดบนเส้น แบ่งเนื้อเท่ากัน แต่ละชามเทียบเท่าเนื้อหน้าแข้งวัวดิบประมาณ 133 กรัมและน้ำหนักซื้อคากิหมูดิบติดกระดูก 100 กรัม ปริมาณกินได้ลดลงเพราะกระดูก แบ่งผักชามละถั่วงอกประมาณ 30 กรัม กะหล่ำ 20 กรัมและหอมแดง 10 กรัม"
  ));
  recipe.storage = ml(
    "Cool broth and meat separately in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Three days is a texture preference; FoodSafety.gov lists refrigerated soups and stews at 3–4 days. Keep noodles and herbs separate. Reheat only the portion served until the broth and every meat piece reach 74°C/165°F.",
    "湯與肉分開裝入淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 3 天內食用是口感偏好；FoodSafety.gov 對冷藏湯與燉菜列為 3–4 天。麵和香草分開保存。只復熱要吃的份量，直至湯與每塊肉都達 74°C/165°F。",
    "汁と肉を別々の浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。3日以内は食感の目安で、FoodSafety.govは冷蔵スープ・シチューを3〜4日としています。麺とハーブは別にします。食べる分だけ汁と全ての肉片が74°C/165°Fになるまで再加熱します。",
    "육수와 고기를 얕은 용기에 따로 담아 2시간 안에 4°C/40°F 이하로 냉장한다. 3일은 식감 기준이고 FoodSafety.gov는 냉장 수프·스튜를 3–4일로 안내한다. 면과 허브는 따로 둔다. 먹을 만큼만 육수와 모든 고기 조각이 74°C/165°F가 되도록 데운다.",
    "แบ่งน้ำซุปและเนื้อใส่ภาชนะตื้นแยกกัน แช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 3 วันเป็นคำแนะนำด้านเนื้อสัมผัส ส่วน FoodSafety.gov ระบุซุปและสตูแช่เย็น 3–4 วัน เก็บเส้นและสมุนไพรแยก อุ่นเฉพาะส่วนที่จะกินจนน้ำซุปและเนื้อทุกชิ้นถึง 74°C/165°F"
  );
  official(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  official(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

export function refineSixtyFourthMethods(recipes) {
  const targets = ["tom-kha-gai", "ba-wan", "philly-cheesesteak", "bun-bo-hue"];
  const revisions = [reviseTomKha, reviseBaWan, revisePhilly, reviseBunBoHue];
  targets.forEach((id, index) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex < 0) throw new Error("Recipe method audit 64: missing recipe " + id);
    const revised = clone(recipes[recipeIndex]);
    revisions[index](revised);
    recipes[recipeIndex] = revised;
  });
  return recipes;
}
