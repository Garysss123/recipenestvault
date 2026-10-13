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

function body(recipe, index, value) {
  recipe.instructions[index].body = value;
}

function official(recipe, label, url) {
  const title = "Official food-safety guidance — FoodSafety.gov: " + label;
  const found = recipe.sources.find((source) => source.url === url);
  if (found) found.title = title;
  else recipe.sources.push({ title, url });
}

function addWater(recipe, amount, item) {
  recipe.ingredients.push({ amount, item });
}

function revisePanang(recipe) {
  recipe.ingredients.find((row) => row.item.en.startsWith("beef sirloin")).item = ml(
    "beef sirloin, cut across the grain into 12 mm-thick, 4–5 cm strips",
    "牛西冷逆紋切成厚 12 毫米、長 4–5 公分的條狀",
    "牛サーロインは繊維を断ち、厚さ12mm、長さ4〜5cmの細長い形に切る",
    "소고기 등심을 결 반대로 두께 12mm, 길이 4–5cm로 썬다",
    "เนื้อสันนอกหั่นขวางเส้นใยเป็นเส้นหนา 12 มม. ยาว 4–5 ซม."
  );
  recipe.cookMinutes = 38;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 0, ml(
    "Chill the 500 g sirloin for an estimated 20 minutes so it is firm enough to cut. Slice across the grain into even 12 mm-thick, 4–5 cm strips; pat dry and keep covered in the refrigerator while preparing the curry. The chill is included in the 25-minute prep estimate.",
    "將 500 公克西冷牛肉冷藏約 20 分鐘，讓肉稍硬、容易切。逆紋切成厚 12 毫米、長 4–5 公分的均勻肉條，擦乾後覆蓋冷藏，備好咖哩前保持低溫。這段冷藏時間已計入 25 分鐘備料估時。",
    "牛サーロイン500gを目安として20分冷やし、切りやすくします。繊維を断って厚さ12mm、長さ4〜5cmにそろえて切り、水気を拭き、カレーを準備する間は覆って冷蔵します。この冷却時間は下ごしらえ25分の目安に含みます。",
    "소고기 등심 500g을 자르기 쉽도록 추정 20분 냉장한다. 결 반대로 두께 12mm, 길이 4–5cm로 고르게 썰어 물기를 닦고 커리를 준비하는 동안 덮어 냉장한다. 냉각 시간은 준비 시간 추정 25분에 포함된다.",
    "แช่เนื้อสันนอก 500 กรัมประมาณ 20 นาทีให้เนื้อแน่นและหั่นง่าย หั่นขวางเส้นใยเป็นเส้นหนา 12 มม. ยาว 4–5 ซม. ซับให้แห้งและปิดฝาแช่เย็นระหว่างเตรียมแกง เวลาพักเย็นรวมอยู่ในเวลาเตรียมโดยประมาณ 25 นาที"
  ));
  body(recipe, 1, ml(
    "Spoon 180 ml of the 500 ml coconut milk into a wide pan and simmer over medium heat for an estimated 5–7 minutes until glossy. Add all 80 g Panang paste and fry about 4 minutes, stirring, until aromatic and small red oil beads appear.",
    "從 500 毫升椰奶中取 180 毫升濃稠部分放入寬鍋，中火微滾約 5–7 分鐘至油亮。加入全部 80 公克帕能咖哩醬，持續攪拌約 4 分鐘至香氣明顯、表面出現細小紅油珠。",
    "500mlのココナッツミルクから濃い部分を180ml取り、広い鍋で中火にかけ、つやが出るまで目安として5〜7分煮ます。パネーンペースト80g全量を加え、香りが立って赤い油滴が出るまで混ぜながら約4分炒めます。",
    "코코넛밀크 500ml 중 진한 부분 180ml를 넓은 팬에 넣고 중불에서 윤기가 날 때까지 추정 5–7분 끓인다. 파낭 페이스트 80g 전량을 넣고 향이 나며 붉은 기름방울이 생길 때까지 저으며 약 4분 볶는다.",
    "ตักหัวกะทิ 180 มล.จากกะทิ 500 มล.ใส่กระทะกว้าง เคี่ยวไฟกลางประมาณ 5–7 นาทีจนมันวาว ใส่พริกแกงพะแนง 80 กรัมทั้งหมด ผัดประมาณ 4 นาทีพร้อมคนจนหอมและมีหยดน้ำมันสีแดงเล็ก ๆ"
  ));
  body(recipe, 2, ml(
    "Stir in all 50 g ground peanuts and 60 ml coconut milk. Cook over medium-low for an estimated 2 minutes until smooth; scrape the pan so the peanuts do not catch.",
    "加入全部 50 公克花生粉與 60 毫升椰奶，中小火煮約 2 分鐘至滑順；不時刮鍋底，避免花生黏焦。",
    "ピーナッツ粉50g全量とココナッツミルク60mlを加え、中弱火で滑らかになるまで目安として約2分煮ます。焦げないよう鍋底をこそげます。",
    "땅콩가루 50g 전량과 코코넛밀크 60ml를 넣는다. 중약불에서 부드러워질 때까지 추정 2분 익히고 땅콩이 눌어붙지 않게 팬 바닥을 긁는다.",
    "ใส่ถั่วลิสงบด 50 กรัมทั้งหมดกับกะทิ 60 มล. เคี่ยวไฟกลางอ่อนประมาณ 2 นาทีจนเนียน คอยขูดก้นกระทะไม่ให้ถั่วติดไหม้"
  ));
  body(recipe, 3, ml(
    "Add the remaining 260 ml coconut milk, all 200 ml stock, 30 ml fish sauce, all 20 g palm sugar, and half the 8 shredded lime leaves. Simmer uncovered for an estimated 8–10 minutes, until reduced by about one quarter and thick enough to coat a spoon. Keep up to 10 ml extra fish sauce for final adjustment only.",
    "加入其餘 260 毫升椰奶、全部 200 毫升高湯、30 毫升魚露、20 公克棕櫚糖及一半（4 片）切絲萊姆葉。敞鍋微滾約 8–10 分鐘，估計收濃約四分之一且醬汁能薄薄裹住湯匙；另外最多 10 毫升魚露留待最後調味。",
    "残りのココナッツミルク260ml、スープ200ml全量、ナンプラー30ml、パームシュガー20g全量、細切りライムリーフ8枚の半量を加えます。ふたをせず目安として8〜10分煮て、約4分の1まで煮詰まり、ソースがスプーンに絡む濃さにします。追加用のナンプラーは最大10ml残します。",
    "남은 코코넛밀크 260ml, 육수 200ml 전량, 피시소스 30ml, 팜슈거 20g 전량, 채 썬 라임잎 8장의 절반을 넣는다. 뚜껑 없이 추정 8–10분 끓여 약 4분의 1 줄고 숟가락에 소스가 얇게 묻을 때까지 졸인다. 피시소스 추가분 최대 10ml는 마지막 간을 위해 남긴다.",
    "เติมกะทิที่เหลือ 260 มล. น้ำสต็อก 200 มล.ทั้งหมด น้ำปลา 30 มล. น้ำตาลโตนด 20 กรัมทั้งหมด และใบมะกรูดซอยครึ่งหนึ่งจาก 8 ใบ เคี่ยวเปิดฝาประมาณ 8–10 นาทีจนลดลงราวหนึ่งในสี่และข้นเคลือบช้อน เตรียมน้ำปลาเพิ่มได้ไม่เกิน 10 มล.ไว้ปรุงรสตอนท้าย"
  ));
  body(recipe, 4, ml(
    "Lower the curry to a gentle simmer and add the chilled beef in a single layer; cook in two batches if crowded. Turn once and cook for an estimated 6–9 minutes. Check several of the thickest strips by inserting a clean thin-tip thermometer sideways into the centre, away from the pan. Each checked intact-beef strip must reach 63°C (145°F); if any is below, simmer 1 minute and recheck. The time is an estimate; temperature controls safety.",
    "將咖哩調至小火微滾，冷藏牛肉單層放入，若擁擠就分兩批。翻面一次，約煮 6–9 分鐘。用乾淨細探針溫度計從側面插入數條最厚肉條中心，避開鍋底測量。每條受測整塊牛肉須達 63°C（145°F）；若有低於標準者，每次再煮 1 分鐘並複測。時間是估計值，安全以溫度為準。",
    "カレーを静かに煮立つ状態にし、冷やした牛肉を一層に加えます。混み合う場合は2回に分けます。一度返し、目安として6〜9分煮ます。清潔な細い先端の温度計を横から最も厚い数本の中心へ差し、鍋に触れないよう測ります。確認した塊肉の牛肉は全て63°C（145°F）に達する必要があります。低ければ1分ずつ煮て再確認します。時間は目安で、安全性は温度で判断します。",
    "커리를 약하게 끓이고 냉장한 소고기를 한 겹으로 넣는다. 붐비면 두 번 나눠 익힌다. 한 번 뒤집어 추정 6–9분 익힌다. 깨끗한 가는 탐침 온도계를 옆에서 가장 두꺼운 고기 몇 점의 중심에 넣고 팬에 닿지 않게 잰다. 확인한 통고기 소고기는 모두 63°C (145°F)에 도달해야 한다. 낮은 것이 있으면 1분씩 더 끓여 다시 잰다. 시간은 추정치이며 안전은 온도로 판단한다.",
    "ลดแกงให้เดือดอ่อน ใส่เนื้อเย็นเรียงชั้นเดียว หากแน่นให้แบ่งสองรอบ พลิกหนึ่งครั้งและเคี่ยวประมาณ 6–9 นาที ใช้เทอร์โมมิเตอร์ปลายเล็กที่สะอาดแทงจากด้านข้างเข้ากลางเส้นที่หนาที่สุดหลายชิ้นโดยไม่โดนกระทะ เนื้อวัวชิ้นเต็มทุกชิ้นที่ตรวจต้องถึง 63°C (145°F) หากมีชิ้นใดต่ำให้เคี่ยวต่อครั้งละ 1 นาทีแล้ววัดซ้ำ เวลาเป็นเพียงค่าประมาณ ความปลอดภัยตัดสินด้วยอุณหภูมิ"
  ));
  body(recipe, 5, ml(
    "When the beef reaches 63°C, move it with clean tongs to a clean plate and rest it for at least 3 minutes. Meanwhile taste the sauce and add up to 10 ml reserved fish sauce only if needed. Turn off the heat, fold in all 30 g basil and half the chile. After the full rest, return the beef and its juices to the hot curry for about 30 seconds.",
    "牛肉達 63°C 後，用乾淨夾子移至乾淨盤子靜置至少 3 分鐘。同時試味，僅在需要時加入預留、最多 10 毫升魚露。關火，拌入全部 30 公克羅勒與一半辣椒。完整靜置後將牛肉及肉汁放回熱咖哩約 30 秒。",
    "牛肉が63°Cに達したら清潔なトングで清潔な皿へ移し、少なくとも3分休ませます。その間にソースを味見し、必要な場合のみ残しておいたナンプラーを最大10ml加えます。火を止め、バジル30g全量と唐辛子の半量を混ぜます。休ませ終えたら肉と肉汁を熱いカレーに戻し、約30秒温めます。",
    "소고기가 63°C에 도달하면 깨끗한 집게로 깨끗한 접시에 옮겨 최소 3분 쉰다. 그동안 소스를 맛보고 필요할 때만 남겨 둔 피시소스를 최대 10ml 넣는다. 불을 끄고 바질 30g 전량과 고추 절반을 섞는다. 3분 휴지가 끝나면 소고기와 육즙을 뜨거운 커리에 돌려 약 30초 데운다.",
    "เมื่อเนื้อถึง 63°C ใช้คีมสะอาดย้ายลงจานสะอาดและพักอย่างน้อย 3 นาที ระหว่างนั้นชิมซอสและเติมน้ำปลาที่สำรองไว้ไม่เกิน 10 มล.เฉพาะเมื่อจำเป็น ปิดไฟใส่ใบโหระพา 30 กรัมทั้งหมดกับพริกครึ่งหนึ่ง เมื่อพักครบให้นำเนื้อและน้ำจากจานกลับลงแกงร้อนประมาณ 30 วินาที"
  ));
  body(recipe, 6, ml(
    "Divide all beef and curry evenly among 4 shallow bowls: about 125 g raw-beef equivalent per serving. Scatter the remaining 4 lime leaves and chile over the bowls. Serve with all 600 g hot cooked rice, 150 g per person. This formula makes a thick curry; spoon the sauce over the rice rather than adding unlisted liquid.",
    "將全部牛肉與咖哩平均分入 4 個淺碗，每份約相當於 125 公克生牛肉。撒上剩餘 4 片萊姆葉與辣椒。搭配全部 600 公克熱熟米飯，每人 150 公克。本配方是濃稠咖哩；將醬汁淋在飯上，不另加未列出的液體。",
    "牛肉とカレー全量を4つの浅い器に均等に分けます。1人分は生の牛肉換算約125gです。残りのライムリーフ4枚と唐辛子を散らします。炊いた温かいご飯600g全量（1人150g）を添えます。この配合は濃いカレーなので、記載のない液体は足さず、ご飯にソースをかけます。",
    "소고기와 커리 전량을 얕은 네 그릇에 똑같이 나눈다. 한 그릇은 생고기 기준 약 125g이다. 남은 라임잎 4장과 고추를 뿌린다. 뜨겁게 지은 밥 600g 전량을 1인 150g씩 곁들인다. 이 배합은 걸쭉한 커리이므로 목록에 없는 액체를 더하지 말고 밥 위에 소스를 얹는다.",
    "แบ่งเนื้อและแกงทั้งหมดเท่า ๆ กันใส่ชามตื้น 4 ใบ แต่ละที่เทียบเท่าเนื้อดิบประมาณ 125 กรัม โรยใบมะกรูดอีก 4 ใบกับพริกที่เหลือ เสิร์ฟข้าวสวยร้อน 600 กรัมทั้งหมด คนละ 150 กรัม สูตรนี้เป็นแกงข้น ให้ราดซอสบนข้าวโดยไม่เติมของเหลวที่ไม่ได้ระบุ"
  ));
  recipe.storage = ml(
    "Cool leftovers in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Two days is a texture preference for the beef; FoodSafety.gov lists cooked meat leftovers at 3–4 days. Reheat only the serving needed until the beef and sauce reach 74°C/165°F throughout.",
    "剩食分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。建議牛肉 2 天內食用是口感偏好；FoodSafety.gov 對熟肉剩食列為 3–4 天。只復熱要吃的份量，直至牛肉與醬汁各處達 74°C/165°F。",
    "残りは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。牛肉の食感を考えた2日以内の推奨は品質上の目安で、FoodSafety.govの加熱済み肉の残り物は3〜4日です。食べる分だけ、肉とソース全体が74°C/165°Fになるまで再加熱します。",
    "남은 음식은 얕은 용기에 나눠 2시간 안에 4°C/40°F 이하로 냉장한다. 소고기 식감을 위한 2일 권장은 품질 기준이며 FoodSafety.gov의 익힌 고기 leftovers 기준은 3–4일이다. 먹을 만큼만 소고기와 소스 전체가 74°C/165°F가 되도록 재가열한다.",
    "แบ่งอาหารที่เหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 2 วันเป็นคำแนะนำด้านเนื้อสัมผัสของเนื้อวัว ส่วน FoodSafety.gov ระบุอาหารเนื้อที่ปรุงแล้ว 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้เนื้อและซอสทั่วถึง 74°C/165°F"
  );
  official(recipe, "Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "4 Steps to Food Safety", handling);
  official(recipe, "Cold Food Storage Charts", storageChart);
}

function reviseKimchiJjigae(recipe) {
  recipe.ingredients.find((row) => row.item.en.startsWith("skinless pork belly")).item = ml(
    "skinless pork belly, unground, sliced evenly 1 cm thick",
    "未絞製去皮五花豬肉，均勻切成厚 1 公分薄片",
    "未加工の皮なし豚バラ肉、厚さ1cmに均一に切る",
    "갈지 않은 껍질 없는 삼겹살, 두께 1cm로 고르게 썬다",
    "หมูสามชั้นลอกหนัง ไม่บด หั่นชิ้นหนา 1 ซม.ให้สม่ำเสมอ"
  );
  recipe.cookMinutes = 47;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 3, ml(
    "Pour in all 800 ml stock and 120 ml kimchi brine, scraping the browned base. Bring to a full boil over medium-high heat for an estimated 5–7 minutes, then lower to an active simmer. This bring-up time is part of the 47-minute cook estimate.",
    "倒入全部 800 毫升高湯與 120 毫升泡菜汁，刮起鍋底焦香。中大火煮至大滾，約需 5–7 分鐘，再轉為持續小滾。此升溫時間已計入 47 分鐘烹調估時。",
    "スープ800ml全量とキムチ汁120ml全量を注ぎ、鍋底の焼き付きをこそげます。中強火で目安として5〜7分かけてしっかり沸騰させ、活発な弱火にします。この時間は調理47分の目安に含みます。",
    "육수 800ml 전량과 김치 국물 120ml 전량을 붓고 냄비 바닥의 갈색 부분을 긁어 푼다. 중강불에서 추정 5–7분 끓여 완전히 끓으면 활발한 약불로 낮춘다. 끓어오르는 시간은 조리 추정 47분에 포함된다.",
    "เทน้ำสต็อก 800 มล.ทั้งหมดกับน้ำกิมจิ 120 มล.ทั้งหมด ขูดก้นหม้อให้ละลาย ต้มไฟกลางค่อนแรงประมาณ 5–7 นาทีจนเดือดจัดแล้วลดเป็นไฟอ่อนที่เดือดต่อเนื่อง เวลานี้รวมในเวลาเคี่ยวประมาณ 47 นาที"
  ));
  body(recipe, 4, ml(
    "Cover slightly ajar and simmer for an estimated 15 minutes until the 1 cm pork slices and kimchi are tender. This is a tenderness estimate only; check the pork's safe endpoint after all simmering in the final step.",
    "鍋蓋留一條縫，約燉 15 分鐘至 1 公分豬肉片與泡菜軟嫩。這只是軟嫩度估時；豬肉安全熟度須在最後一步完成全部燉煮後再確認。",
    "ふたを少しずらし、豚肉1cmの薄切りとキムチが柔らかくなるまで目安として15分煮ます。これは柔らかさの目安にすぎず、安全温度は最後の煮込み後に確認します。",
    "뚜껑을 살짝 열어 두고 1cm 돼지고기와 김치가 부드러워질 때까지 추정 15분 끓인다. 이는 연육 시간의 추정치일 뿐이며 안전 온도는 마지막 끓임 뒤 확인한다.",
    "ปิดฝาแง้มเล็กน้อย เคี่ยวประมาณ 15 นาทีจนหมูชิ้นหนา 1 ซม.และกิมจินุ่ม เวลานี้เป็นเพียงค่าประมาณความนุ่ม ตรวจอุณหภูมิปลอดภัยหลังเคี่ยวทั้งหมดในขั้นสุดท้าย"
  ));
  body(recipe, 6, ml(
    "Check several of the thickest pork slices from the side with a clean thin-tip thermometer, avoiding the pot. Because this is an intact, non-ground pork cut, every checked slice must reach 63°C (145°F) and then rest at least 3 minutes; simmer in 1-minute increments and recheck if any is low. Transfer the pork with clean tongs to a clean plate for its rest. Meanwhile add up to 10 ml soup soy sauce only if needed, simmer the broth 1 minute, and add all 30 g scallions. Return the rested pork and its juices, divide the stew evenly among 4 bowls, and serve. The 47-minute cook time is an estimate; temperature and rest control safety.",
    "用乾淨細探針溫度計從側面測數片最厚豬肉，避開鍋子。這是未絞製整塊豬肉，受測肉片均須達 63°C（145°F）並靜置至少 3 分鐘；若偏低，每次續煮 1 分鐘後複測。用乾淨夾子移至乾淨盤子靜置。同時視需要加入最多 10 毫升湯醬油，湯汁煮 1 分鐘並加入全部 30 公克青蔥。豬肉靜置完連同肉汁放回，燉菜平均分入 4 碗。47 分鐘烹調時間為估計；安全以溫度與靜置為準。",
    "清潔な細い温度計を横から差し、鍋に触れず最も厚い豚肉を数枚確認します。未加工の塊肉なので、測った豚肉は全て63°C（145°F）に達した後、少なくとも3分休ませます。低ければ1分ずつ煮て再確認します。清潔なトングで豚肉を清潔な皿へ移します。その間に必要ならスープしょうゆを最大10ml加え、汁を1分煮てねぎ30g全量を加えます。休ませた豚肉と肉汁を戻し、4杯に分けます。調理47分は目安で、安全性は温度と休ませ時間で判断します。",
    "깨끗한 가는 탐침 온도계를 옆에서 넣어 냄비에 닿지 않게 가장 두꺼운 돼지고기 몇 점을 잰다. 갈지 않은 통고기이므로 확인한 모든 조각은 63°C (145°F)에 도달한 뒤 최소 3분 쉰다. 낮으면 1분씩 더 끓여 다시 잰다. 깨끗한 집게로 깨끗한 접시에 옮겨 휴지한다. 그동안 필요할 때만 국간장을 최대 10ml 넣고 국물을 1분 끓인 뒤 파 30g 전량을 넣는다. 쉰 돼지고기와 육즙을 되돌리고 네 그릇에 나눈다. 조리 47분은 추정치이며 안전은 온도와 휴지로 판단한다.",
    "ใช้เทอร์โมมิเตอร์ปลายเล็กที่สะอาดวัดหมูชิ้นหนาที่สุดหลายชิ้นจากด้านข้างโดยไม่โดนหม้อ หมูนี้เป็นชิ้นเต็มไม่บด ทุกชิ้นที่ตรวจต้องถึง 63°C (145°F) แล้วพักอย่างน้อย 3 นาที หากต่ำให้เคี่ยวต่อครั้งละ 1 นาทีแล้ววัดซ้ำ ย้ายหมูด้วยคีมสะอาดลงจานสะอาดเพื่อพัก ระหว่างนั้นเติมซีอิ๊วซุปได้ไม่เกิน 10 มล.เฉพาะเมื่อจำเป็น เคี่ยวน้ำซุป 1 นาทีและใส่ต้นหอม 30 กรัมทั้งหมด นำหมูและน้ำจากจานกลับลงหม้อ แบ่ง 4 ชาม เวลา 47 นาทีเป็นค่าประมาณ ความปลอดภัยตัดสินด้วยอุณหภูมิและเวลาพัก"
  ));
  recipe.storage = ml(
    "Cool in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Two days is a kimchi and tofu texture preference; FoodSafety.gov lists soups and stews at 3–4 days. Reheat only the portion needed until the broth and pork reach 74°C/165°F throughout.",
    "分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。2 天是泡菜與豆腐口感偏好；FoodSafety.gov 對湯與燉菜列為 3–4 天。只復熱要吃的份量，直至湯與豬肉各處達 74°C/165°F。",
    "浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。キムチと豆腐の食感を考えた2日以内の目安と、FoodSafety.govのスープ・シチュー3〜4日は別です。食べる分だけ汁と豚肉全体が74°C/165°Fになるまで再加熱します。",
    "얕은 용기에 나눠 2시간 안에 4°C/40°F 이하로 냉장한다. 김치와 두부 식감을 위한 2일 권장 기간과 FoodSafety.gov의 수프·스튜 3–4일은 별개다. 먹을 만큼만 국물과 돼지고기 전체가 74°C/165°F가 되도록 재가열한다.",
    "แบ่งใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 2 วันเป็นคำแนะนำด้านเนื้อสัมผัสของกิมจิและเต้าหู้ ส่วน FoodSafety.gov ระบุซุปและสตู 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้น้ำซุปและหมูถึง 74°C/165°F"
  );
  official(recipe, "Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "4 Steps to Food Safety", handling);
  official(recipe, "Cold Food Storage Charts", storageChart);
}

function reviseTortillaSoup(recipe) {
  addWater(recipe, "1.5 L", ml(
    "water for simmering the tomatoes, chiles, and garlic",
    "煮番茄、辣椒與大蒜用水",
    "トマト、唐辛子、にんにくを煮る水",
    "토마토, 고추, 마늘을 끓이는 물",
    "น้ำสำหรับเคี่ยวมะเขือเทศ พริก และกระเทียม"
  ));
  const oil = recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil for frying tortilla strips"));
  oil.item = ml(
    "neutral oil for frying: 250 ml for tortilla strips and 50 ml for dried chile garnish",
    "油炸用中性油：250 毫升炸玉米餅條，50 毫升炸乾辣椒裝飾",
    "揚げ油：トルティーヤ用250ml、飾りの乾燥唐辛子用50ml",
    "튀김용 중성유: 또르띠야용 250ml, 말린 고추 고명용 50ml",
    "น้ำมันรสกลางสำหรับทอด: 250 มล.ทอดแผ่นตอร์ติยา และ 50 มล.ทอดพริกแห้ง"
  );
  const salt = recipe.ingredients.find((row) => row.item.en === "fine salt");
  salt.item = ml(
    "fine salt, divided: 4 g for the puree and 5 g for the soup",
    "細鹽，分為泥狀湯底用 4 公克、湯汁用 5 公克",
    "塩、ピューレ用4gとスープ用5gに分ける",
    "고운 소금: 퓌레용 4g, 수프용 5g으로 나눈다",
    "เกลือละเอียด แบ่ง 4 กรัมสำหรับพิวเรและ 5 กรัมสำหรับซุป"
  );
  recipe.cookMinutes = 50;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 1, ml(
    "Cover all 700 g tomatoes, the toasted guajillos, and all 3 garlic cloves with the listed 1.5 L water. Bring to a boil and simmer for an estimated 12 minutes until tomatoes soften and chiles are pliable. Drain and discard this cooking water.",
    "將全部 700 公克番茄、烤過的 guajillo 辣椒與 3 瓣大蒜加入列出的 1.5 公升水。煮沸後微滾約 12 分鐘，至番茄變軟、辣椒回軟。瀝乾並倒掉煮料水。",
    "トマト700g全量、焼いたグアヒージョ、にんにく3片全量に記載の水1.5Lを注ぎます。沸騰後、トマトが柔らかく唐辛子が戻るまで目安として12分煮ます。ざるに上げ、ゆで汁は捨てます。",
    "토마토 700g 전량, 구운 과히요, 마늘 3쪽 전량에 목록의 물 1.5L를 붓는다. 끓인 뒤 토마토가 부드럽고 고추가 유연해질 때까지 추정 12분 끓인다. 건져 물은 버린다.",
    "ใส่มะเขือเทศ 700 กรัมทั้งหมด พริกกวาฮีโยที่คั่วแล้ว และกระเทียม 3 กลีบทั้งหมด เติมน้ำ 1.5 ลิตรตามรายการ ต้มแล้วเคี่ยวประมาณ 12 นาทีจนมะเขือเทศนุ่มและพริกอ่อนตัว กรองและเทน้ำทิ้ง"
  ));
  body(recipe, 2, ml(
    "Blend the drained tomatoes, guajillos, and garlic with all 150 g onion, 4 g of the 9 g salt, and exactly 250 ml of the 1,500 ml chicken stock. Reserve the remaining 1,250 ml stock for the pot.",
    "將瀝乾的番茄、guajillo 辣椒、大蒜、全部 150 公克洋蔥、9 公克鹽中的 4 公克及恰好 250 毫升雞高湯打至滑順。其餘 1,250 毫升高湯留給湯鍋。",
    "水切りしたトマト、グアヒージョ、にんにく、玉ねぎ150g全量、塩9gのうち4g、鶏スープ1,500mlのうち250mlを滑らかになるまで撹拌します。残り1,250mlは鍋用に取っておきます。",
    "물기를 뺀 토마토, 과히요, 마늘, 양파 150g 전량, 소금 9g 중 4g, 닭육수 1,500ml 중 정확히 250ml를 부드러워질 때까지 간다. 남은 육수 1,250ml는 냄비용으로 남긴다.",
    "ปั่นมะเขือเทศที่สะเด็ดน้ำ พริกกวาฮีโย กระเทียม หอมหัวใหญ่ 150 กรัมทั้งหมด เกลือ 4 กรัมจาก 9 กรัม และน้ำสต็อกไก่ 250 มล.พอดีจาก 1,500 มล.จนเนียน เก็บน้ำสต็อกอีก 1,250 มล.ไว้ใส่หม้อ"
  ));
  body(recipe, 3, ml(
    "Heat all 25 ml soup-base oil over medium heat. Add the puree and cook for an estimated 10–12 minutes, stirring often, until darker and noticeably thicker. This is a reduction estimate, not a food-safety endpoint.",
    "中火加熱全部 25 毫升湯底用油，加入泥狀湯底後常攪拌約 10–12 分鐘，至顏色變深、明顯濃稠。此為收濃估時，不是食安熟度標準。",
    "スープ用油25ml全量を中火で熱します。ピューレを加え、色が濃くなり明らかにとろみが付くまで、目安として10〜12分よく混ぜます。時間は煮詰めの目安で、安全温度ではありません。",
    "중불에서 수프 베이스용 기름 25ml 전량을 달군다. 퓌레를 넣고 색이 진해지고 걸쭉해질 때까지 추정 10–12분 자주 저어 졸인다. 이는 농도 추정치이지 안전 종점이 아니다.",
    "ตั้งน้ำมันทำฐานซุป 25 มล.ทั้งหมดไฟกลาง ใส่พิวเรและผัดประมาณ 10–12 นาที คนบ่อยจนสีเข้มและข้นขึ้นชัดเจน เวลานี้เป็นค่าประมาณการเคี่ยว ไม่ใช่เกณฑ์ความปลอดภัย"
  ));
  body(recipe, 4, ml(
    "Whisk in the reserved 1,250 ml stock. Bring to a gentle boil, then simmer for an estimated 10 minutes. Add the remaining 5 g salt, taste, and keep the broth hot while preparing the toppings.",
    "拌入預留的 1,250 毫升高湯，溫和沸騰後微滾約 10 分鐘。加入剩餘 5 公克鹽，試味並在準備配料時保溫。",
    "取り置いたスープ1,250mlを混ぜます。穏やかに沸いたら目安として10分煮ます。残りの塩5gを加えて味を見て、具を準備する間は温かく保ちます。",
    "남겨 둔 육수 1,250ml를 넣는다. 부드럽게 끓어오르면 추정 10분 끓인다. 남은 소금 5g을 넣고 간을 본 뒤 고명을 준비하는 동안 따뜻하게 둔다.",
    "คนเติมน้ำสต็อก 1,250 มล.ที่สำรองไว้ ต้มเดือดอ่อนแล้วเคี่ยวประมาณ 10 นาที ใส่เกลือที่เหลือ 5 กรัม ชิมและรักษาความร้อนไว้ระหว่างเตรียมเครื่อง"
  ));
  body(recipe, 5, ml(
    "Heat 250 ml of the frying oil to 175°C in a wide skillet. Cut all 12 tortillas into strips; fry in small batches for an estimated 2–3 minutes, turning until crisp and golden. Drain well and reserve the remaining 50 ml oil for the dried chile. The temperature and crisp result guide quality.",
    "寬鍋中將炸油的 250 毫升加熱至 175°C。全部 12 張玉米餅切條，分小批炸約 2–3 分鐘並翻動，至金黃酥脆後充分瀝油。剩餘 50 毫升油留炸乾辣椒；溫度與酥脆度是品質提示。",
    "広いフライパンで揚げ油250mlを175°Cに熱します。トルティーヤ12枚全量を細切りにし、小分けにして目安として2〜3分、返しながら黄金色でカリッとするまで揚げます。よく油を切り、残り50mlは乾燥唐辛子用に取っておきます。温度と食感は品質の目安です。",
    "넓은 팬에서 튀김 기름 250ml를 175°C로 가열한다. 또르띠야 12장 전량을 가늘게 썰어 소량씩 추정 2–3분 뒤집어 바삭하고 황금색이 될 때까지 튀겨 잘 뺀다. 남은 기름 50ml는 말린 고추용으로 둔다. 온도와 바삭함은 품질 기준이다.",
    "ตั้งน้ำมันทอด 250 มล.ให้ถึง 175°C ในกระทะกว้าง หั่นตอร์ติยา 12 แผ่นทั้งหมดเป็นเส้น ทอดทีละน้อยประมาณ 2–3 นาที พลิกจนกรอบสีทองและสะเด็ดให้ดี เก็บน้ำมันอีก 50 มล.ไว้ทอดพริกแห้ง อุณหภูมิและความกรอบเป็นจุดสังเกตคุณภาพ"
  ));
  body(recipe, 6, ml(
    "Heat the reserved 50 ml oil to 175°C. Slice the dried ancho or pasilla into thin rings and flash-fry for 5–8 seconds only; lift out immediately before it darkens or turns bitter, then drain.",
    "將預留 50 毫升油加熱至 175°C。乾燥 ancho 或 pasilla 切成細圈，只快炸 5–8 秒；顏色變深或發苦前立即撈起瀝油。",
    "取り置いた油50mlを175°Cに熱します。乾燥アンチョまたはパシージャを薄い輪切りにし、5〜8秒だけさっと揚げます。色が濃くなったり苦くなる前に取り出して油を切ります。",
    "남겨 둔 기름 50ml를 175°C로 가열한다. 말린 안초 또는 파시야를 얇은 고리로 썰어 5–8초만 튀긴 뒤 색이 진해지거나 쓴맛이 나기 전에 즉시 건져 기름을 뺀다.",
    "อุ่นน้ำมันที่เหลือ 50 มล.ให้ถึง 175°C หั่นพริกแอนโชหรือปาซียาแห้งเป็นวงบาง ทอดเร็วเพียง 5–8 วินาที ตักขึ้นก่อนสีเข้มหรือขมแล้วสะเด็ดน้ำมัน"
  ));
  body(recipe, 7, ml(
    "Build 6 bowls at serving time. Divide all tortilla strips, 220 g avocado (about 37 g each), 180 g queso fresco (30 g each), 160 g crema (about 27 g each), and chile evenly. Ladle in all hot soup, about 250 ml stock-equivalent per serving before reduction. Serve at once so the strips stay crisp. The 50-minute cook time is a workflow estimate, not a food-safety endpoint.",
    "上桌時組裝 6 碗。玉米餅條、220 公克酪梨（每碗約 37 公克）、180 公克 queso fresco（每碗 30 公克）、160 公克 crema（每碗約 27 公克）及辣椒平均分配。倒入全部熱湯，每份約相當於收濃前 250 毫升雞高湯。立即上桌以保持餅條酥脆。50 分鐘烹調時間是流程估時，不是食安熟度標準。",
    "提供時に6杯を組み立てます。トルティーヤ、アボカド220g（1杯約37g）、ケソ・フレスコ180g（1杯30g）、クレマ160g（1杯約27g）、唐辛子を均等に分けます。熱いスープ全量を注ぎ、煮詰め前の鶏スープ換算で1杯約250mlです。すぐ供して食感を保ちます。調理時間50分は作業の目安であり、安全温度の基準ではありません。",
    "먹기 직전에 여섯 그릇을 만든다. 또르띠야 전량, 아보카도 220g(그릇당 약 37g), 케소 프레스코 180g(각 30g), 크레마 160g(약 27g), 고추를 고르게 나눈다. 뜨거운 수프 전량을 붓고 한 그릇당 졸이기 전 닭육수 기준 약 250ml로 담아 바로 낸다. 조리 시간 50분은 작업 추정치이며 식품 안전 종점이 아니다.",
    "จัด 6 ชามเมื่อจะเสิร์ฟ แบ่งเส้นตอร์ติยา อะโวคาโด 220 กรัม (ชามละประมาณ 37 กรัม) เคโซเฟรสโก 180 กรัม (ชามละ 30 กรัม) เครมา 160 กรัม (ชามละประมาณ 27 กรัม) และพริกเท่า ๆ กัน ตักซุปร้อนทั้งหมดใส่ ชามละเทียบเท่าน้ำสต็อกก่อนเคี่ยวประมาณ 250 มล. เสิร์ฟทันทีให้เส้นกรอบ เวลา 50 นาทีเป็นเวลาโดยประมาณของขั้นตอน ไม่ใช่เกณฑ์ความปลอดภัยของอาหาร"
  ));
  recipe.storage = ml(
    "Cool soup in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Store tortilla strips, avocado, cheese, crema, and chile separately. Two days is a flavour preference; FoodSafety.gov lists refrigerated soups and stews at 3–4 days. Reheat only the broth portion needed until it reaches 74°C/165°F, then assemble a fresh bowl.",
    "湯底分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。玉米餅條、酪梨、起司、crema 與辣椒分開保存。2 天是風味偏好；FoodSafety.gov 對冷藏湯與燉菜列為 3–4 天。只復熱要吃的湯底至 74°C/165°F，再組裝新的一碗。",
    "スープは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。トルティーヤ、アボカド、チーズ、クレマ、唐辛子は別に保存します。2日以内は風味上の目安で、FoodSafety.govの冷蔵スープ・シチューは3〜4日です。食べる分だけ汁を74°C/165°Fまで再加熱し、新しい具で盛り付けます。",
    "수프는 얕은 용기에 나눠 2시간 안에 4°C/40°F 이하로 냉장한다. 또르띠야, 아보카도, 치즈, 크레마, 고추는 따로 보관한다. 2일은 맛을 위한 권장 기간이고 FoodSafety.gov의 냉장 수프·스튜 기준은 3–4일이다. 먹을 만큼 국물만 74°C/165°F까지 재가열한 뒤 새 고명을 얹는다.",
    "แบ่งน้ำซุปใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า เก็บเส้นตอร์ติยา อะโวคาโด ชีส เครมา และพริกแยกกัน 2 วันเป็นคำแนะนำด้านรสชาติ ส่วน FoodSafety.gov ระบุซุปและสตูแช่เย็น 3–4 วัน อุ่นเฉพาะน้ำซุปที่จะกินให้ถึง 74°C/165°F แล้วจัดชามใหม่"
  );
  official(recipe, "Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "4 Steps to Food Safety", handling);
  official(recipe, "Cold Food Storage Charts", storageChart);
}

function revisePalakPaneer(recipe) {
  const water = recipe.ingredients.find((row) => row.item.en.startsWith("hot water"));
  water.item = ml(
    "hot water: 100 ml for blending, plus up to 80 ml to thin the sauce",
    "熱水：100 毫升打菠菜泥，另最多 80 毫升調整醬汁濃度",
    "熱湯：ピューレ用100ml、ソース調整用に最大80ml",
    "뜨거운 물: 퓌레용 100ml, 소스 농도 조절용 최대 80ml 추가",
    "น้ำร้อน: 100 มล.สำหรับปั่น และเพิ่มได้ไม่เกิน 80 มล.เพื่อปรับความข้น"
  );
  addWater(recipe, "3 L", ml(
    "water for blanching the spinach",
    "汆燙菠菜用水",
    "ほうれん草をゆでる水",
    "시금치 데침용 물",
    "น้ำสำหรับลวกผักโขม"
  ));
  addWater(recipe, "2 L", ml(
    "cold water and ice for the spinach cooling bath",
    "菠菜冰鎮用冷水與冰塊",
    "ほうれん草を冷やす冷水と氷",
    "시금치 식힘용 찬물과 얼음",
    "น้ำเย็นและน้ำแข็งสำหรับแช่ผักโขมให้เย็น"
  ));
  recipe.cookMinutes = 35;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 0, ml(
    "Bring the listed 3 L blanching water to a full boil. Blanch all 500 g spinach for an estimated 60–75 seconds, then transfer immediately to the 2 L ice bath for 2 minutes. Drain and squeeze gently; discard both waters. The times are estimates for colour and texture.",
    "將列出的 3 公升汆燙水煮至大滾，全部 500 公克菠菜汆燙約 60–75 秒，立刻移入 2 公升冰水中 2 分鐘。瀝乾並輕輕擠水；兩種用水皆倒掉。時間是保色與口感估計。",
    "記載のゆで水3Lをしっかり沸騰させ、ほうれん草500g全量を目安として60〜75秒ゆで、すぐに2Lの氷水へ移して2分冷やします。水を切ってやさしく絞り、両方の水は捨てます。時間は色と食感の目安です。",
    "목록의 데침물 3L를 팔팔 끓인다. 시금치 500g 전량을 추정 60–75초 데치고 즉시 얼음물 2L에 옮겨 2분 식힌다. 물기를 빼고 부드럽게 짠 뒤 두 물은 버린다. 시간은 색과 식감을 위한 추정치다.",
    "ต้มน้ำลวก 3 ลิตรตามรายการให้เดือดจัด ลวกผักโขม 500 กรัมทั้งหมดประมาณ 60–75 วินาที แล้วย้ายลงอ่างน้ำแข็ง 2 ลิตรทันที 2 นาที สะเด็ดน้ำและบีบเบา ๆ เทน้ำทั้งสองส่วนทิ้ง เวลาเป็นค่าประมาณเพื่อสีและเนื้อสัมผัส"
  ));
  body(recipe, 1, ml(
    "Blend the squeezed spinach with exactly 100 ml hot water until smooth, stopping twice to scrape the bowl. Keep the remaining 0–80 ml hot water for thinning the finished sauce in the later step; do not exceed 180 ml total.",
    "菠菜與恰好 100 毫升熱水打至滑順，中途停兩次刮下杯壁。剩餘 0–80 毫升熱水留待後續調整醬汁，不要超過總量 180 毫升。",
    "絞ったほうれん草と熱湯100mlちょうどを滑らかに撹拌し、途中で2回止めて容器をこそげます。残り0〜80mlは後のソース調整用に取り置き、合計180mlを超えないようにします。",
    "물기를 짠 시금치를 뜨거운 물 정확히 100ml와 부드러워질 때까지 간다. 중간에 두 번 멈춰 용기를 긁는다. 남은 뜨거운 물 0–80ml는 뒤에 소스 농도 조절용으로 남기고 총 180ml를 넘기지 않는다.",
    "ปั่นผักโขมที่บีบน้ำแล้วกับน้ำร้อน 100 มล.พอดีจนเนียน หยุดปั่นสองครั้งเพื่อปาดขอบโถ เก็บน้ำร้อนที่เหลือ 0–80 มล.ไว้ปรับซอสในขั้นถัดไป อย่าใช้รวมเกิน 180 มล."
  ));
  body(recipe, 2, ml(
    "Heat 15 ml of the 30 ml oil or ghee in a wide pan over medium heat. Brown all 250 g paneer for an estimated 60–90 seconds on each broad side, turning gently, then transfer to a clean plate. Keep the remaining 15 ml fat for the masala.",
    "寬鍋中火加熱 30 毫升油或酥油中的 15 毫升。全部 250 公克 paneer 每個寬面各煎約 60–90 秒，輕輕翻面後移至乾淨盤子。剩餘 15 毫升油留給 masala。",
    "広い鍋に油またはギー30mlのうち15mlを入れ、中火で熱します。パニール250g全量を広い面ごとに目安として60〜90秒焼き、やさしく返して清潔な皿へ移します。残り15mlはマサラ用です。",
    "넓은 팬에 기름 또는 기의 30ml 중 15ml를 넣고 중불로 달군다. 파니르 250g 전량을 넓은 면마다 추정 60–90초씩 부드럽게 뒤집어 굽고 깨끗한 접시에 옮긴다. 남은 15ml는 마살라용이다.",
    "ตั้งกระทะกว้างไฟกลางด้วยน้ำมันหรือกี 15 มล.จากทั้งหมด 30 มล. จี่ปานีร์ 250 กรัมทั้งหมดด้านกว้างด้านละประมาณ 60–90 วินาที พลิกเบา ๆ แล้วย้ายลงจานสะอาด เก็บไขมันอีก 15 มล.ไว้ทำมาซาลา"
  ));
  body(recipe, 3, ml(
    "Add the remaining 15 ml oil or ghee and all 4 g cumin seeds. When they sizzle for about 20 seconds, add all 120 g onion and cook an estimated 7–9 minutes until pale gold. Add the 15 g ginger-garlic paste and slit chile; cook about 60 seconds without browning the paste.",
    "加入剩餘 15 毫升油或酥油及全部 4 公克孜然籽，爆香約 20 秒後加入全部 120 公克洋蔥，炒約 7–9 分鐘至淡金色。加入 15 公克薑蒜泥與剖開的辣椒，再炒約 60 秒，不要炒焦薑蒜泥。",
    "残りの油またはギー15mlとクミンシード4g全量を加えます。約20秒はぜたら玉ねぎ120g全量を入れ、薄い金色になるまで目安として7〜9分炒めます。しょうが・にんにくペースト15gと切れ目を入れた唐辛子を加え、焦がさず約60秒炒めます。",
    "남은 기름 또는 기 15ml와 큐민씨 4g 전량을 넣는다. 약 20초 튀듯 향이 나면 양파 120g 전량을 넣고 옅은 금빛이 될 때까지 추정 7–9분 볶는다. 생강마늘 페이스트 15g과 칼집 낸 고추를 넣고 페이스트를 태우지 않게 약 60초 더 볶는다.",
    "ใส่น้ำมันหรือกีที่เหลือ 15 มล.กับเมล็ดยี่หร่า 4 กรัมทั้งหมด ผัดให้แตกประมาณ 20 วินาที ใส่หอมหัวใหญ่ 120 กรัมทั้งหมด ผัดประมาณ 7–9 นาทีจนเหลืองอ่อน ใส่ขิงกระเทียมบด 15 กรัมกับพริกผ่าร่อง ผัดต่อประมาณ 60 วินาทีโดยไม่ให้เครื่องบดไหม้"
  ));
  body(recipe, 4, ml(
    "Add all 180 g tomato and 4 g of the 6 g salt. Cook over medium-low for an estimated 7–9 minutes, mashing, until pulpy and no raw tomato smell remains. Keep the final 2 g salt for the sauce and paneer after they are combined.",
    "加入全部 180 公克番茄與 6 公克鹽中的 4 公克，中小火邊壓碎邊炒約 7–9 分鐘，至番茄糊化且生味消失。最後 2 公克鹽留待菠菜醬與 paneer 合併後調味。",
    "トマト180g全量と塩6gのうち4gを加えます。中弱火でつぶしながら目安として7〜9分炒め、とろりとして生のトマト臭がなくなるまで火を通します。残りの塩2gはパニールと合わせた後に使います。",
    "토마토 180g 전량과 소금 6g 중 4g을 넣는다. 중약불에서 으깨며 추정 7–9분 볶아 걸쭉해지고 생토마토 냄새가 없어질 때까지 익힌다. 남은 소금 2g은 시금치 소스와 파니르를 합친 뒤 쓴다.",
    "ใส่มะเขือเทศ 180 กรัมทั้งหมดกับเกลือ 4 กรัมจาก 6 กรัม ผัดไฟกลางอ่อนพร้อมบดประมาณ 7–9 นาทีจนเละและกลิ่นดิบหาย เก็บเกลือ 2 กรัมสุดท้ายไว้ปรุงหลังผสมซอสกับปานีร์"
  ));
  body(recipe, 5, ml(
    "Lower the heat and stir in the spinach puree and all 3 g garam masala. Simmer uncovered for an estimated 4 minutes. If the sauce is too thick, add the reserved hot water 15 ml at a time, using no more than 80 ml; keep it thick enough to coat a spoon. Prolonged boiling dulls the green colour.",
    "轉小火拌入菠菜泥與全部 3 公克 garam masala，敞鍋微滾約 4 分鐘。若太稠，每次加 15 毫升預留熱水，最多 80 毫升；維持能裹住湯匙的濃度。久煮會使綠色變暗。",
    "弱火にしてほうれん草ピューレとガラムマサラ3g全量を混ぜます。ふたをせず目安として約4分静かに煮ます。濃すぎる場合は取り置いた熱湯を15mlずつ、最大80ml加え、スプーンに絡む濃さに保ちます。長く煮ると緑色がくすみます。",
    "불을 낮추고 시금치 퓌레와 가람 마살라 3g 전량을 섞는다. 뚜껑 없이 추정 4분 약하게 끓인다. 너무 되직하면 남겨 둔 뜨거운 물을 한 번에 15ml씩 최대 80ml 넣어 숟가락에 묻을 정도로 유지한다. 오래 끓이면 녹색이 탁해진다.",
    "ลดไฟแล้วคนพิวเรผักโขมกับการัมมาซาลา 3 กรัมทั้งหมด เคี่ยวเปิดฝาประมาณ 4 นาที หากข้นเกินให้เติมน้ำร้อนที่สำรองไว้ครั้งละ 15 มล. ไม่เกิน 80 มล. ให้ข้นพอเคลือบช้อน การต้มนานทำให้สีเขียวหม่น"
  ));
  body(recipe, 6, ml(
    "Return all paneer and any plate juices to the sauce. Fold gently over low heat for an estimated 2–3 minutes; add the final 2 g salt and all 60 ml cream, then cover off heat for 3 minutes. Divide the curry evenly among 4 bowls: each has about 125 g raw-spinach equivalent and 62.5 g paneer. The fresh-cook time estimate is 35 minutes; it is separate from leftover reheating guidance.",
    "將全部 paneer 及盤中肉汁倒回醬汁，低火輕拌約 2–3 分鐘；加入最後 2 公克鹽與全部 60 毫升鮮奶油，熄火加蓋靜置 3 分鐘。咖哩平均分入 4 碗，每份約相當於 125 公克生菠菜與 62.5 公克 paneer。現煮時間估計 35 分鐘，與剩食復熱標準分開。",
    "パニール全量と皿の汁をソースに戻します。弱火でやさしく目安として2〜3分混ぜ、残りの塩2gとクリーム60ml全量を加えます。火を止めてふたをし、3分置きます。4皿に均等に分け、1人分は生ほうれん草換算約125g、パニール62.5gです。調理時間35分は目安で、残り物の再加熱基準とは別です。",
    "파니르 전량과 접시에 나온 육즙을 소스에 다시 넣는다. 약불에서 추정 2–3분 부드럽게 섞고 남은 소금 2g과 크림 60ml 전량을 넣은 뒤 불을 끄고 덮어 3분 둔다. 네 그릇에 고르게 나누면 한 그릇당 생시금치 기준 약 125g과 파니르 62.5g이다. 새로 조리하는 시간 추정 35분은 남은 음식 재가열 기준과 별개다.",
    "ใส่ปานีร์ทั้งหมดและน้ำจากจานกลับลงซอส คลุกเบา ๆ ไฟอ่อนประมาณ 2–3 นาที เติมเกลือ 2 กรัมสุดท้ายกับครีม 60 มล.ทั้งหมด ปิดไฟปิดฝาพัก 3 นาที แบ่งแกงเท่ากัน 4 ชาม แต่ละที่เทียบเท่าผักโขมดิบประมาณ 125 กรัมและปานีร์ 62.5 กรัม เวลาปรุงสดประมาณ 35 นาทีแยกจากเกณฑ์อุ่นอาหารเหลือ"
  ));
  recipe.storage = ml(
    "Cool in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Two days is a green-colour and paneer-texture preference; FoodSafety.gov lists cooked leftovers at 3–4 days. Reheat only the portion needed, stirring, until every part reaches 74°C/165°F. The 35-minute cooking estimate is not a food-safety temperature.",
    "分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 2 天內食用是菠菜色澤與 paneer 口感偏好；FoodSafety.gov 對熟食剩食列為 3–4 天。只取要吃的份量，邊攪拌邊復熱至各處達 74°C/165°F。35 分鐘烹調估時不是食安溫度。",
    "浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。2日以内は緑色とパニールの食感を考えた目安で、FoodSafety.govの加熱済み残り物は3〜4日です。食べる分だけかき混ぜながら全体が74°C/165°Fになるまで再加熱します。調理時間35分は食品安全温度ではありません。",
    "얕은 용기에 나눠 담아 2시간 안에 4°C/40°F 이하로 냉장한다. 2일은 녹색과 파니르 식감을 위한 권장 기간이고 FoodSafety.gov의 익힌 leftovers 기준은 3–4일이다. 먹을 만큼만 저으면서 전체가 74°C/165°F가 되도록 재가열한다. 조리 시간 추정 35분은 식품 안전 온도가 아니다.",
    "แบ่งใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 2 วันเป็นคำแนะนำด้านสีเขียวและเนื้อสัมผัสปานีร์ ส่วน FoodSafety.gov ระบุอาหารปรุงสุกเหลือ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินพร้อมคนจนทุกส่วนถึง 74°C/165°F เวลาในการปรุง 35 นาทีไม่ใช่อุณหภูมิความปลอดภัย"
  );
  official(recipe, "4 Steps to Food Safety", handling);
  official(recipe, "Cold Food Storage Charts", storageChart);
}

export function refineSixtyFifthMethods(recipes) {
  const targets = ["panang-curry", "kimchi-jjigae", "sopa-de-tortilla", "palak-paneer"];
  const revisions = [revisePanang, reviseKimchiJjigae, reviseTortillaSoup, revisePalakPaneer];
  targets.forEach((id, index) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex < 0) throw new Error("Recipe method audit 65: missing recipe " + id);
    const revised = clone(recipes[recipeIndex]);
    revisions[index](revised);
    recipes[recipeIndex] = revised;
  });
  return recipes;
}
