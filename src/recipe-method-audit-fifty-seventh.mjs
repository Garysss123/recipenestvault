const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({
      ...row,
      amount: typeof row.amount === "object" ? { ...row.amount } : row.amount,
      item: typeof row.item === "object" ? { ...row.item } : row.item
    })),
    instructions: recipe.instructions.map((entry) => ({
      ...entry,
      title: { ...entry.title },
      body: { ...entry.body }
    })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
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

function addCulinaryReference(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) recipe.sources.push({ title, url });
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";

function reviseMooSatay(recipe) {
  recipe.prepMinutes = 285;
  recipe.cookMinutes = 30;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  setMethod(recipe, [
    [
      ml("Cut even pork strips", "切成厚度一致的豬肉條", "豚肉を均一な細切りにする", "돼지고기를 고르게 썬다", "หั่นหมูให้เป็นเส้นขนาดสม่ำเสมอ"),
      ml(
        "Chill the 800 g pork shoulder for 20 minutes so it is easier to slice, then cut across the grain into strips about 6 × 2.5 × 0.75 cm. Pat dry and keep the thickness even; each strip weighs about 11 g, so the listed 800 g makes roughly 72 strips for the 24 skewers. The 20-minute chill is included in prep time.",
        "將 800 公克豬肩肉冷藏 20 分鐘，稍微變硬後逆紋切成約 6 × 2.5 × 0.75 公分肉條。擦乾並保持厚度一致；每條約 11 公克，因此 800 公克約可切 72 條，分配到 24 串。這 20 分鐘已計入備料時間。",
        "豚肩肉800gを切りやすくするため20分冷蔵し、繊維を断つ向きに約6×2.5×0.75cmに切ります。水気を拭いて厚みをそろえます。1枚約11gなので、800gで約72枚になり、竹串24本に分けられます。この20分は準備時間に含みます。",
        "돼지 어깨살 800g을 썰기 쉽게 20분 냉장한 뒤 결 반대 방향으로 약 6 × 2.5 × 0.75cm로 썬다. 물기를 닦고 두께를 고르게 맞춘다. 한 조각이 약 11g이므로 800g에서 약 72조각이 나와 꼬치 24개에 나눠 꿸 수 있다. 이 20분은 준비 시간에 포함된다.",
        "แช่หมูไหล่ 800 กรัมในตู้เย็น 20 นาทีให้แข็งขึ้นเล็กน้อย แล้วหั่นขวางเส้นใยเป็นชิ้นขนาดประมาณ 6 × 2.5 × 0.75 ซม. ซับให้แห้งและรักษาความหนาให้สม่ำเสมอ ชิ้นละประมาณ 11 กรัม จึงได้ราว 72 ชิ้นจาก 800 กรัมสำหรับไม้เสียบ 24 ไม้ เวลาพักเย็น 20 นาทีรวมในเวลาเตรียมแล้ว"
      )
    ],
    [
      ml("Measure and reserve clean marinade", "量好醃料並先留出乾淨的一份", "たれを量り、清潔な分を先に取り分ける", "양념을 계량하고 깨끗한 양념을 먼저 덜어 둔다", "ตวงน้ำหมักและแบ่งส่วนสะอาดไว้ก่อน"),
      ml(
        "Whisk 150 ml coconut milk with all 18 g turmeric, 10 g coriander, 4 g cumin, 20 g garlic, 15 ml fish sauce, and 20 g palm sugar. Before raw pork touches it, reserve 40 ml in a clean covered cup for basting. Coat the pork with the remaining 110 ml; keep the other 150 ml coconut milk, 25 ml fish sauce, and 45 g palm sugar for the peanut sauce.",
        "將 150 毫升椰奶與全部 18 公克薑黃、10 公克芫荽粉、4 公克孜然、20 公克蒜、15 毫升魚露及 20 公克棕櫚糖拌勻。生豬肉碰到醃料前，先取 40 毫升放入乾淨有蓋杯中供刷醬。其餘 110 毫升拌豬肉；另外 150 毫升椰奶、25 毫升魚露與 45 公克棕櫚糖留給花生醬。",
        "ココナッツミルク150mlにターメリック18g、コリアンダー10g、クミン4g、おろしにんにく20g、ナンプラー15ml、パームシュガー20gを混ぜます。生肉を入れる前に40mlを清潔なふた付きカップへ取り分け、焼き用にします。残り110mlを豚肉に絡め、別のココナッツミルク150ml、ナンプラー25ml、パームシュガー45gはピーナッツソース用に残します。",
        "코코넛밀크 150ml에 강황 18g, 고수 가루 10g, 큐민 4g, 다진 마늘 20g, 피시소스 15ml, 팜슈거 20g을 섞는다. 생고기를 넣기 전에 깨끗한 뚜껑 있는 컵에 40ml를 덜어 굽는 중 바를 용도로 둔다. 남은 110ml는 돼지고기에 묻히고, 별도의 코코넛밀크 150ml, 피시소스 25ml, 팜슈거 45g은 땅콩 소스용으로 남긴다.",
        "ผสมน้ำกะทิ 150 มล.กับขมิ้น 18 กรัม ผักชีป่น 10 กรัม ยี่หร่า 4 กรัม กระเทียม 20 กรัม น้ำปลา 15 มล. และน้ำตาลโตนด 20 กรัม ก่อนใส่หมูดิบ ตัก 40 มล.ใส่ถ้วยสะอาดมีฝาปิดไว้ทาระหว่างย่าง คลุกหมูกับส่วนที่เหลือ 110 มล. ส่วนน้ำกะทิอีก 150 มล. น้ำปลา 25 มล. และน้ำตาลโตนด 45 กรัมเก็บไว้ทำซอสถั่วลิสง"
      )
    ],
    [
      ml("Marinate in the refrigerator", "放入冰箱冷藏醃漬", "冷蔵庫で漬け込む", "냉장고에서 재운다", "หมักในตู้เย็น"),
      ml(
        "Cover the pork and marinate for at least 4 hours and up to 8 hours at or below 4°C (40°F). Never marinate on the counter. The listed 285-minute prep estimate uses the 4-hour minimum plus the recipe's usual prep; an 8-hour marinade adds 4 hours to the elapsed total. The 30-minute skewer soak overlaps this wait.",
        "將豬肉加蓋，於 4°C（40°F）以下冷藏至少 4 小時、最多 8 小時；不可在室溫醃肉。標示的 285 分鐘備料估時以至少醃 4 小時計，8 小時醃漬會讓總經過時間再增加 4 小時。竹籤浸泡 30 分鐘可與醃肉同時進行。",
        "豚肉にふたをして4°C（40°F）以下で最低4時間、最長8時間漬けます。室温では漬けません。表示の準備時間285分には最低4時間の漬け込みが含まれ、8時間漬ける場合は経過時間がさらに4時間増えます。竹串の30分浸水はこの待ち時間と並行できます。",
        "돼지고기를 덮어 4°C (40°F) 이하 냉장고에서 최소 4시간, 최대 8시간 재운다. 실온에서 재우지 않는다. 표시된 준비 시간 285분은 최소 4시간 재우는 경우를 포함하며, 8시간 재우면 총 경과 시간이 4시간 더 늘어난다. 꼬치 30분 불리기는 이 대기 시간과 함께 할 수 있다.",
        "ปิดฝาหมูและหมักในตู้เย็นที่อุณหภูมิไม่เกิน 4°C (40°F) อย่างน้อย 4 ชั่วโมงและไม่เกิน 8 ชั่วโมง ห้ามหมักที่อุณหภูมิห้อง เวลาเตรียม 285 นาทีใช้การหมักขั้นต่ำ 4 ชั่วโมง หากหมัก 8 ชั่วโมง เวลารวมจะเพิ่มอีก 4 ชั่วโมง แช่ไม้เสียบ 30 นาทีพร้อมช่วงรอนี้ได้"
      )
    ],
    [
      ml("Simmer the peanut sauce", "燉煮花生醬", "ピーナッツソースを煮る", "땅콩 소스를 끓인다", "เคี่ยวซอสถั่วลิสง"),
      ml(
        "Simmer the reserved 150 ml coconut milk over medium heat for about 3 minutes. Stir in 70 g red curry paste and cook 2 minutes. Whisk in 180 g peanut butter, 200 ml water, 45 ml tamarind, 25 ml fish sauce, and 45 g palm sugar; simmer 6–8 minutes, stirring, until glossy and spoon-coating. Thin with up to 30 ml extra water only when reheating if needed.",
        "將保留的 150 毫升椰奶以中火煮約 3 分鐘，加入 70 公克紅咖哩醬再煮 2 分鐘。拌入 180 公克花生醬、200 毫升水、45 毫升羅望子、25 毫升魚露與 45 公克棕櫚糖；攪拌小火煮 6–8 分鐘至發亮並能薄薄附著湯匙。復熱時若太稠，才視需要加最多 30 毫升水。",
        "残しておいたココナッツミルク150mlを中火で約3分煮ます。レッドカレーペースト70gを加え2分炒め、ピーナッツバター180g、水200ml、タマリンド45ml、ナンプラー25ml、パームシュガー45gを泡立て器で混ぜます。かき混ぜながら6〜8分煮て、つやが出てスプーンに薄く絡む状態にします。温め直す際に必要なら水を最大30ml加えます。",
        "남겨 둔 코코넛밀크 150ml를 중불에서 약 3분 끓인다. 레드커리페이스트 70g을 넣어 2분 더 익힌다. 땅콩버터 180g, 물 200ml, 타마린드 45ml, 피시소스 25ml, 팜슈거 45g을 풀어 넣고 저으며 6–8분 끓여 윤기가 나고 숟가락에 얇게 묻을 정도로 만든다. 다시 데울 때 필요하면 물을 최대 30ml 넣어 묽게 한다.",
        "เคี่ยวน้ำกะทิที่แบ่งไว้ 150 มล.ด้วยไฟกลางประมาณ 3 นาที ใส่พริกแกงแดง 70 กรัมและผัด 2 นาที คนเนยถั่ว 180 กรัม น้ำ 200 มล. มะขามเปียก 45 มล. น้ำปลา 25 มล. และน้ำตาลโตนด 45 กรัมลงไป เคี่ยวพร้อมคน 6–8 นาทีจนเงาและเคลือบช้อนได้บาง ๆ หากอุ่นซ้ำแล้วข้นเกินไปค่อยเติมน้ำได้ไม่เกิน 30 มล."
      )
    ],
    [
      ml("Cool and chill the cucumber relish", "冷卻小黃瓜酸甜配料", "きゅうりの甘酢を冷まして冷やす", "오이 초절임을 식혀 냉장한다", "ทำเครื่องเคียงแตงกวาให้เย็น"),
      ml(
        "Bring 80 ml rice vinegar, 60 g sugar, and 3 g salt to a boil for 1 minute, stirring to dissolve. Cool completely, then add 200 g cucumber and 80 g shallots about 20 minutes before serving. Cover and refrigerate; adding them late keeps them crisp.",
        "將 80 毫升米醋、60 公克砂糖與 3 公克鹽煮沸 1 分鐘並攪拌至溶解。完全放涼後，在上桌前約 20 分鐘加入 200 公克小黃瓜與 80 公克紅蔥頭。加蓋冷藏；晚點加入可保持爽脆。",
        "米酢80ml、砂糖60g、塩3gを1分沸騰させ、溶かします。完全に冷ましてから、食べる約20分前にきゅうり200gとエシャロット80gを加えます。ふたをして冷蔵し、具材を遅く加えることで食感を保ちます。",
        "쌀식초 80ml, 설탕 60g, 소금 3g을 1분 끓이며 녹인다. 완전히 식힌 뒤 먹기 약 20분 전에 오이 200g과 샬롯 80g을 넣는다. 덮어 냉장하고, 재료를 늦게 넣어 아삭함을 살린다.",
        "ต้มน้ำส้มสายชูข้าว 80 มล. น้ำตาล 60 กรัม และเกลือ 3 กรัม 1 นาทีพร้อมคนให้ละลาย พักให้เย็นสนิทแล้วใส่แตงกวา 200 กรัมกับหอมแดง 80 กรัมก่อนเสิร์ฟประมาณ 20 นาที ปิดฝาแช่เย็น การใส่ผักทีหลังช่วยให้กรอบ"
      )
    ],
    [
      ml("Thread the pork and discard raw marinade", "將豬肉串起並丟棄生肉醃料", "豚肉を串に刺し、生肉用の漬けだれを捨てる", "돼지고기를 꼬치에 꿰고 생고기 양념은 버린다", "เสียบหมูและทิ้งน้ำหมักที่สัมผัสหมูดิบ"),
      ml(
        "Soak all 24 bamboo skewers for 30 minutes. Thread about three of the roughly 11 g pork strips on each skewer, folding each strip once into a loose S so it lies in one thin plane; divide all 72 strips evenly and leave 5 cm bare as a handle. Discard the pork marinade and wash hands and the raw-meat bowl; use only the clean reserved 40 ml for basting.",
        "24 根竹籤浸泡 30 分鐘。每串約串 3 條、每條約 11 公克的豬肉，鬆鬆折成 S 形並保持單層；將約 72 條平均分配，留 5 公分作握柄。丟棄接觸生肉的醃料，洗手並清洗生肉碗；刷醬只用預留乾淨的 40 毫升。",
        "竹串24本を30分水に浸します。約11gの豚肉を各串に3枚ほど、ゆるいS字に一度折って薄い一層になるよう刺します。約72枚を均等に分け、持ち手を5cm残します。生肉に触れた漬けだれは捨て、手とボウルを洗います。塗るのは取り分けておいた清潔な40mlだけです。",
        "대나무 꼬치 24개를 30분 불린다. 약 11g 돼지고기를 꼬치마다 약 3장씩 느슨한 S자로 접어 한 겹으로 꿴다. 약 72조각을 고르게 나누고 손잡이 5cm를 남긴다. 생고기에 닿은 양념은 버리고 손과 볼을 씻는다. 바르는 것은 따로 덜어 둔 깨끗한 40ml만 사용한다.",
        "แช่ไม้ไผ่ 24 ไม้ 30 นาที เสียบหมูชิ้นละประมาณ 11 กรัม ราว 3 ชิ้นต่อไม้ พับแต่ละชิ้นเป็นรูปตัว S หลวม ๆ ให้เรียงเป็นชั้นเดียว แบ่งหมูราว 72 ชิ้นให้เท่ากันและเหลือด้าม 5 ซม. ทิ้งน้ำหมักที่สัมผัสหมูดิบ ล้างมือและชาม ใช้เฉพาะน้ำหมักสะอาด 40 มล.ที่แบ่งไว้ทา"
      )
    ],
    [
      ml("Set up hot and cooler grill zones", "準備高溫與較低溫的烤區", "強火と弱火の焼き場所を作る", "센 불과 약한 불 구역을 준비한다", "เตรียมบริเวณย่างไฟแรงและไฟอ่อน"),
      ml(
        "Heat one grill zone to medium-high and a second zone to medium-low. Clean and lightly oil the grate. Keep a clean tray and the reserved marinade beside the grill; the cooler zone gives the thin strips time to reach their safety endpoint without scorching.",
        "將烤架一側加熱至中大火，另一側維持中小火。清潔並薄薄抹油。把乾淨托盤與預留醃料放在烤架旁；較低溫區能讓薄肉條達到安全熟度而不焦黑。",
        "グリルの一方を中強火、もう一方を中弱火にします。網をきれいにして薄く油を塗ります。清潔なトレーと取り分けたたれをそばに置きます。弱火側なら薄い肉を焦がさず安全な温度まで加熱できます。",
        "그릴 한쪽은 중강불, 다른 쪽은 중약불로 예열한다. 석쇠를 닦고 기름을 얇게 바른다. 깨끗한 쟁반과 덜어 둔 양념을 옆에 둔다. 약한 불 구역에서 얇은 고기를 태우지 않고 안전 온도까지 익힐 수 있다.",
        "ตั้งบริเวณหนึ่งของเตาย่างไฟกลางค่อนแรงและอีกบริเวณไฟกลางอ่อน ทำความสะอาดและทาน้ำมันบาง ๆ วางถาดสะอาดกับน้ำหมักที่แบ่งไว้ใกล้เตา บริเวณไฟอ่อนช่วยให้เส้นหมูบางถึงอุณหภูมิปลอดภัยโดยไม่ไหม้"
      )
    ],
    [
      ml("Sear, then finish over lower heat", "先煎上色，再以較低火完成", "焼き色を付け、弱い火で仕上げる", "먼저 굽고 약한 불에서 마무리한다", "ย่างให้เกิดสีแล้วทำให้สุกต่อด้วยไฟอ่อน"),
      ml(
        "Grill skewers on the hot zone for about 60–90 seconds per side until marked; this is a browning estimate, not a doneness test. Move to the cooler zone, brush with the clean reserved marinade, and turn every minute for about 3–5 minutes. Cook in uncrowded batches and wash the basting brush after it touches cooked meat.",
        "每串在高溫區每面烤約 60–90 秒至有烤痕；這只是上色估時，不代表已熟。移至低溫區，用乾淨預留醃料刷面，每分鐘翻一次，再烤約 3–5 分鐘。分批且不要擠滿烤架；刷子碰到熟肉後清洗。",
        "強火側で各面約60〜90秒、焼き色が付くまで焼きます。これは焼き色の目安で、火の通りの判定ではありません。弱火側へ移し、清潔な取り分けだれを塗り、約3〜5分、1分ごとに返します。網に詰めずに分けて焼き、刷毛が加熱済みの肉に触れたら洗います。",
        "센 불 구역에서 꼬치 양면을 각각 약 60–90초 구워 자국을 낸다. 이는 색을 내는 예상 시간이지 익힘 확인이 아니다. 약한 불 구역으로 옮겨 깨끗하게 덜어 둔 양념을 바르고 약 3–5분 동안 1분마다 뒤집는다. 석쇠를 꽉 채우지 말고 나누어 굽는다. 붓이 익은 고기에 닿으면 씻는다.",
        "ย่างไม้เสียบด้านละประมาณ 60–90 วินาทีบนไฟแรงจนมีรอยย่าง เวลานี้เป็นเพียงเกณฑ์ให้เกิดสี ไม่ใช่การยืนยันว่าสุก ย้ายไปไฟอ่อน ทาน้ำหมักสะอาดที่แบ่งไว้และพลิกทุกนาทีประมาณ 3–5 นาที ย่างเป็นชุดโดยไม่วางแน่นเกินไป ล้างแปรงหลังสัมผัสเนื้อสุก"
      )
    ],
    [
      ml("Check whole-cut pork and rest", "確認整塊豬肉熟度並靜置", "豚肉の温度を確認して休ませる", "통돼지고기 기준을 확인하고 휴지한다", "ตรวจหมูชิ้นและพักเนื้อ"),
      ml(
        "Use a clean thin-tip thermometer, inserted sideways into the thickest folded pork strip in each batch; check skewers from the cooler grill area too. Pork from an intact shoulder cut is not ground meat: reach 63°C (145°F), then rest the cooked strips on a clean tray for 3 minutes. If any check is below 63°C, return that batch to the grill and recheck; time and browning alone do not establish safety.",
        "用乾淨細探針溫度計，從側面插入每批最厚、折疊處的豬肉條中心；也要測較低溫烤區的肉串。這是由完整豬肩肉切成的肉條，不是絞肉：達 63°C（145°F）後，放在乾淨托盤靜置 3 分鐘。若任何測量未達 63°C，回爐續烤並重測；時間與上色不能單獨證明安全。",
        "清潔な細い温度計を横から差し、各バッチで最も厚い折りたたみ部分を測ります。弱火側の串も確認します。これは塊のままの豚肩肉を切ったもので、ひき肉ではありません。63°C（145°F）に達したら清潔なトレーで3分休ませます。63°C未満ならグリルに戻して再測定し、時間や焼き色だけで安全とは判断しません。",
        "깨끗한 얇은 탐침 온도계를 옆으로 넣어 각 배치에서 가장 두껍게 접힌 돼지고기를 잰다. 약한 불 구역의 꼬치도 확인한다. 이 고기는 통째 어깨살에서 자른 것이며 다짐육이 아니다. 63°C (145°F)에 도달하면 깨끗한 쟁반에서 3분 쉰다. 측정값이 63°C보다 낮으면 그 꼬치를 그릴에 되돌려 익힌 뒤 다시 잰다. 시간과 갈색빛만으로 안전을 판단하지 않는다.",
        "ใช้เทอร์โมมิเตอร์ปลายเล็กที่สะอาดแทงจากด้านข้างตรงส่วนหมูที่พับหนาที่สุดของแต่ละชุด และตรวจไม้เสียบจากบริเวณไฟอ่อนด้วย หมูนี้หั่นจากไหล่หมูทั้งชิ้น ไม่ใช่เนื้อบด เมื่อถึง 63°C (145°F) ให้พักบนถาดสะอาด 3 นาที หากจุดใดต่ำกว่า 63°C ให้นำกลับไปย่างและวัดซ้ำ เวลาและสีเกรียมเพียงอย่างเดียวไม่ยืนยันความปลอดภัย"
      )
    ],
    [
      ml("Serve four equal satay portions", "平均分成四份上桌", "4人分に分けて盛る", "네 접시에 똑같이 나누어 낸다", "แบ่งเสิร์ฟ 4 ที่เท่า ๆ กัน"),
      ml(
        "Serve six skewers per person, with the peanut sauce and cucumber-shallot relish in separate bowls. Keep the hot pork away from the raw-marinade cup and use clean serving tongs. The estimated 30-minute cook time covers sauce cooking, grilling, resting, and serving; the 4-hour minimum marinade is counted in prep time.",
        "每人分 6 串，花生醬與小黃瓜紅蔥頭酸甜配料分開盛裝。熟豬肉遠離生肉醃料杯，並使用乾淨夾具上桌。30 分鐘烹調估時涵蓋煮醬、烤肉、靜置與擺盤；至少 4 小時的醃漬已列入備料時間。",
        "1人6本ずつ盛り、ピーナッツソースときゅうり・エシャロットの甘酢は別の器にします。加熱済みの豚肉を生肉用のたれから離し、清潔なトングを使います。調理時間の目安30分にはソース、焼き、休ませ、盛り付けが含まれ、最低4時間の漬け込みは準備時間に計上しています。",
        "1인당 꼬치 6개씩 담고 땅콩 소스와 오이·샬롯 절임은 따로 낸다. 익은 돼지고기를 생고기 양념 컵과 떨어뜨리고 깨끗한 집게를 사용한다. 예상 조리 시간 30분에는 소스, 굽기, 휴지, 담기가 포함되며 최소 4시간 재우는 시간은 준비 시간에 포함된다.",
        "เสิร์ฟคนละ 6 ไม้ แยกซอสถั่วลิสงกับแตงกวาหอมแดงดองไว้คนละถ้วย วางหมูสุกให้ห่างจากถ้วยน้ำหมักดิบและใช้ที่คีบสะอาด เวลาเคี่ยวและย่างโดยประมาณ 30 นาทีรวมทำซอส ย่าง พัก และจัดเสิร์ฟแล้ว ส่วนเวลาหมักขั้นต่ำ 4 ชั่วโมงนับในเวลาเตรียม"
      )
    ]
  ]);
  recipe.storage = ml(
    "Within 2 hours, divide pork and peanut sauce into separate shallow containers and refrigerate at or below 4°C (40°F); use within 3–4 days. Reheat only the pork portion needed until it reaches 74°C (165°F). Warm sauce separately and keep cucumber relish chilled; the 3-minute rest is for freshly cooked whole-cut pork, not leftover reheating.",
    "在 2 小時內將豬肉與花生醬分別裝入淺容器，冷藏於 4°C（40°F）以下，3–4 天內食用。只取需要的豬肉份量復熱至 74°C（165°F）；醬汁另行加熱，小黃瓜配料持續冷藏。3 分鐘靜置適用於新煮的整塊肉，不是剩菜復熱標準。",
    "2時間以内に豚肉とピーナッツソースを別々の浅い容器に分け、4°C（40°F）以下で冷蔵し、3〜4日以内に使います。必要な分の豚肉だけを74°C（165°F）まで再加熱します。ソースは別に温め、甘酢きゅうりは冷蔵します。3分休ませるのは調理直後の塊肉の基準で、残り物の再加熱基準ではありません。",
    "2시간 이내에 돼지고기와 땅콩 소스를 얕은 용기에 따로 담아 4°C (40°F) 이하로 냉장하고 3–4일 안에 먹는다. 먹을 돼지고기만 덜어 74°C (165°F)까지 재가열한다. 소스는 따로 데우고 오이 절임은 냉장한다. 3분 휴지는 갓 조리한 통고기 기준이며 남은 음식 재가열 기준이 아니다.",
    "ภายใน 2 ชั่วโมง แบ่งหมูกับซอสถั่วลิสงใส่ภาชนะตื้นแยกกันและแช่เย็นไม่เกิน 4°C (40°F) ใช้ภายใน 3–4 วัน อุ่นเฉพาะหมูส่วนที่จะกินให้ถึง 74°C (165°F) อุ่นซอสแยกและเก็บแตงกวาดองให้เย็น การพัก 3 นาทีใช้กับหมูชิ้นที่ปรุงใหม่ ไม่ใช่เกณฑ์อุ่นอาหารเหลือ"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseBiscuitsAndGravy(recipe) {
  recipe.cookMinutes = 35;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const sausage = recipe.ingredients.find((row) => row.item.en.startsWith("American breakfast sausage"));
  if (!sausage) throw new Error("biscuits-and-gravy: breakfast sausage ingredient is missing");
  sausage.item = ml(
    "raw pork breakfast sausage, casings removed",
    "生豬肉早餐香腸，去腸衣",
    "生の豚肉朝食用ソーセージ（皮を除く）",
    "생 돼지고기 아침용 소시지, 케이싱 제거",
    "ไส้กรอกหมูดิบสำหรับมื้อเช้า เอาไส้ออก"
  );
  setMethod(recipe, [
    [
      ml("Heat the oven and keep the dairy cold", "預熱烤箱並保持乳品低溫", "オーブンを温め、乳製品は冷やしておく", "오븐을 예열하고 유제품은 차갑게 둔다", "อุ่นเตาอบและเก็บผลิตภัณฑ์นมให้เย็น"),
      ml(
        "Heat the oven to 220°C and line one baking sheet. Keep the 115 g butter and 300 ml buttermilk refrigerated until the dry ingredients are ready; cold butter helps the six biscuits rise in flaky layers.",
        "烤箱預熱至 220°C，烤盤鋪紙。115 公克奶油與 300 毫升酪乳在乾粉備好前保持冷藏；冷奶油有助六個司康式餅乾層層膨起。",
        "オーブンを220°Cに予熱し、天板に紙を敷きます。粉類の準備が整うまで、バター115gとバターミルク300mlは冷蔵しておきます。冷たいバターが6個のビスケットを層状に膨らませます。",
        "오븐을 220°C로 예열하고 베이킹 시트에 유산지를 깐다. 마른 재료를 준비할 때까지 버터 115g과 버터밀크 300ml를 냉장고에 둔다. 차가운 버터가 비스킷 6개의 층을 살린다.",
        "อุ่นเตาอบที่ 220°C และปูกระดาษบนถาดอบ เก็บเนย 115 กรัมกับบัตเตอร์มิลค์ 300 มล.ในตู้เย็นจนกว่าจะเตรียมของแห้งเสร็จ เนยเย็นช่วยให้บิสกิต 6 ชิ้นฟูเป็นชั้น"
      )
    ],
    [
      ml("Cut the butter into the dry ingredients", "將奶油切入乾粉", "バターを粉類に切り込む", "버터를 마른 재료에 섞는다", "ตัดเนยเข้ากับส่วนผสมแห้ง"),
      ml(
        "Whisk all 360 g flour with 18 g baking powder and 5 g salt. Cut in the cold butter until most pieces are pea-size with a few larger flakes; stop before the mixture becomes a paste.",
        "將全部 360 公克麵粉與 18 公克泡打粉、5 公克鹽拌勻。切入冷奶油，至多數奶油如豌豆大小並留有少量大片；尚未成糊就停手。",
        "薄力粉360g、ベーキングパウダー18g、塩5gを混ぜます。冷たいバターを切り込み、ほとんどがえんどう豆大で少し大きな欠片が残る状態にします。ペースト状になる前に止めます。",
        "밀가루 360g, 베이킹파우더 18g, 소금 5g을 모두 섞는다. 차가운 버터를 잘라 넣어 대부분 완두콩 크기이고 큰 조각도 조금 남을 때 멈춘다. 반죽처럼 뭉치기 전에 멈춘다.",
        "ผสมแป้ง 360 กรัม ผงฟู 18 กรัม และเกลือ 5 กรัมทั้งหมด ตัดเนยเย็นลงไปจนส่วนใหญ่มีขนาดเท่าเม็ดถั่วและยังมีชิ้นใหญ่เหลือบ้าง หยุดก่อนส่วนผสมจะกลายเป็นเนื้อครีม"
      )
    ],
    [
      ml("Add buttermilk and fold gently", "加入酪乳並輕柔折疊", "バターミルクを加えて優しく折り混ぜる", "버터밀크를 넣고 가볍게 접는다", "เติมบัตเตอร์มิลค์แล้วตะล่อมเบา ๆ"),
      ml(
        "Pour in all 300 ml cold buttermilk and mix only until shaggy with no dry pockets. Pat the dough into a rectangle, fold it in thirds three times, and rotate between folds; stop as soon as it holds together so the biscuits stay tender.",
        "倒入全部 300 毫升冷酪乳，拌至粗糙成團、不見乾粉即可。把麵團拍成長方形，像信紙般三折三次，每次折疊間旋轉方向；能成團就停，餅乾才柔嫩。",
        "冷たいバターミルク300mlを全量加え、乾いた粉がなくなり、ぼそぼそまとまるまで混ぜます。生地を長方形にし、三つ折りを3回、折るごとに向きを変えます。まとまったらすぐ止めると柔らかく仕上がります。",
        "차가운 버터밀크 300ml를 전량 붓고 마른 가루가 없어져 거칠게 뭉칠 때까지만 섞는다. 반죽을 직사각형으로 눌러 3등분 접기를 3번 하고 접을 때마다 방향을 바꾼다. 뭉치면 바로 멈춰야 부드럽다.",
        "เทบัตเตอร์มิลค์เย็น 300 มล.ทั้งหมด ผสมเพียงจนจับตัวหยาบและไม่เห็นแป้งแห้ง กดแป้งเป็นสี่เหลี่ยมผืนผ้า พับสามส่วน 3 ครั้งและหมุนทิศทุกครั้ง หยุดทันทีที่แป้งรวมตัวเพื่อให้บิสกิตนุ่ม"
      )
    ],
    [
      ml("Cut and bake six biscuits", "切出六個並烘烤", "6個に切り分けて焼く", "비스킷 6개를 잘라 굽는다", "ตัดและอบบิสกิต 6 ชิ้น"),
      ml(
        "Pat the dough to 25 mm thick and cut six biscuits straight down without twisting. Place them close together on the sheet and bake at 220°C for an estimated 14–17 minutes, until tall and golden. Move them to a rack while you make the gravy.",
        "將麵團拍成 25 毫米厚，直上直下切出六個，不要旋轉切模。彼此靠近放在烤盤上，以 220°C 烘烤估計 14–17 分鐘，至膨起呈金黃色。移至網架，趁此製作肉汁醬。",
        "生地を厚さ25mmに伸ばし、ねじらず真下に押して6個抜きます。天板に間隔を詰めて置き、220°Cで目安14〜17分、背が高くきつね色になるまで焼きます。網に移し、グレービーを作ります。",
        "반죽을 25mm 두께로 눌러 비틀지 말고 곧게 눌러 비스킷 6개를 자른다. 시트에 붙여 놓고 220°C에서 약 14–17분, 높이 부풀고 황금색이 될 때까지 굽는다. 식힘망으로 옮기고 그레이비를 만든다.",
        "กดแป้งหนา 25 มม. ตัดบิสกิต 6 ชิ้นโดยกดตรง ๆ ไม่บิด วางชิดกันบนถาดและอบที่ 220°C ประมาณ 14–17 นาทีจนฟูสูงและสีทอง ย้ายไปพักบนตะแกรงระหว่างทำเกรวี"
      )
    ],
    [
      ml("Cook ground pork sausage to its own endpoint", "絞肉香腸依絞肉標準煮熟", "豚ひき肉ソーセージはひき肉の基準まで加熱する", "돼지고기 다짐 소시지를 해당 기준까지 익힌다", "ปรุงไส้กรอกหมูบดให้ถึงเกณฑ์ของเนื้อบด"),
      ml(
        "While the biscuits bake, crumble all 450 g raw pork breakfast sausage into a wide skillet over medium-high heat. Break it into small pieces and cook about 7–9 minutes, stirring, until browned. Check the largest crumble with a clean thermometer: ground pork sausage must reach 71°C (160°F). If it is below that, cook in 1-minute increments and recheck; browning and time alone are not the safety check.",
        "餅乾烘烤時，將全部 450 公克生豬肉早餐香腸撥入寬鍋，以中大火煮。撥成小碎塊並翻炒估計 7–9 分鐘至上色。用乾淨溫度計測最大肉塊中心：豬絞肉香腸須達 71°C（160°F）。未達時每次續煮 1 分鐘再測；上色與時間不能單獨作為安全判定。",
        "ビスケットを焼いている間に、生の豚肉ソーセージ450gすべてを広いフライパンにほぐし、中強火にかけます。小さく崩して混ぜながら目安7〜9分、焼き色が付くまで炒めます。清潔な温度計で最大の塊を測り、豚ひき肉ソーセージは71°C（160°F）に達させます。未達なら1分ずつ加熱して再測定し、色や時間だけでは安全と判断しません。",
        "비스킷을 굽는 동안 넓은 팬에 생 돼지고기 소시지 450g 전량을 부숴 넣고 중강불로 익힌다. 작은 조각으로 풀어 약 7–9분 저으며 갈색이 나게 볶는다. 깨끗한 온도계로 가장 큰 덩어리 중심을 재어 다진 돼지고기 소시지를 71°C (160°F)까지 익힌다. 미달이면 1분씩 더 익히고 다시 잰다. 색과 시간만으로 안전을 판단하지 않는다.",
        "ระหว่างอบบิสกิต บี้ไส้กรอกหมูดิบ 450 กรัมทั้งหมดลงกระทะกว้าง ใช้ไฟกลางค่อนแรง แยกเป็นชิ้นเล็กและผัดประมาณ 7–9 นาทีจนเป็นสีน้ำตาล ใช้เทอร์โมมิเตอร์สะอาดวัดชิ้นใหญ่ที่สุด ไส้กรอกหมูบดต้องถึง 71°C (160°F) หากยังต่ำให้ปรุงต่อครั้งละ 1 นาทีแล้ววัดซ้ำ สีและเวลาเพียงอย่างเดียวไม่ยืนยันความปลอดภัย"
      )
    ],
    [
      ml("Cook the flour in the sausage fat", "在香腸油脂中炒熟麵粉", "ソーセージの脂で小麦粉を炒める", "소시지 기름에 밀가루를 익힌다", "ผัดแป้งกับไขมันจากไส้กรอก"),
      ml(
        "Keep the cooked sausage in the skillet. Sprinkle over all 45 g gravy flour and stir for 2 minutes so no dry flour remains and the flour loses its raw taste. If the pan contains more than a thin coating of fat, spoon off the excess before adding the flour.",
        "熟香腸留在鍋中，撒入全部 45 公克肉汁醬用麵粉，翻炒 2 分鐘至不見乾粉、生粉味消失。若鍋中油脂多到形成厚層，先舀掉多餘油脂再加麵粉。",
        "加熱済みのソーセージをフライパンに残し、グレービー用の小麦粉45gを全量振り入れます。乾いた粉がなくなり粉っぽさが消えるまで2分混ぜます。脂が厚くたまっている場合は、粉を加える前に余分をすくいます。",
        "익힌 소시지는 팬에 둔다. 그레이비용 밀가루 45g 전량을 뿌리고 마른 가루가 보이지 않고 날가루 맛이 사라질 때까지 2분 젓는다. 팬에 기름이 두껍게 고였으면 밀가루를 넣기 전에 여분을 덜어낸다.",
        "คงไส้กรอกที่สุกไว้ในกระทะ โรยแป้งสำหรับเกรวี 45 กรัมทั้งหมดและคน 2 นาทีจนไม่เห็นผงแห้งและกลิ่นแป้งดิบหาย หากมีไขมันขังเป็นชั้นหนา ให้ช้อนส่วนเกินออกก่อนใส่แป้ง"
      )
    ],
    [
      ml("Whisk in milk and finish the gravy", "拌入牛奶並完成肉汁醬", "牛乳を混ぜてグレービーを仕上げる", "우유를 넣어 그레이비를 완성한다", "เติมนมและทำเกรวีให้เสร็จ"),
      ml(
        "Pour in the 850 ml whole milk gradually while scraping the skillet. Bring to a gentle simmer and cook 6–8 minutes, stirring often, until the gravy thickly coats the sausage and spoon. Stir in all 4 g black pepper. If it becomes too thick, loosen with a splash of milk; no additional salt is listed because the sausage seasons the gravy.",
        "刮拌鍋底並分次倒入全部 850 毫升全脂牛奶。煮至小滾後常攪拌 6–8 分鐘，至肉汁醬能厚厚裹住香腸與湯匙。拌入全部 4 公克黑胡椒。太稠時加少許牛奶調開；香腸本身有鹹味，所以未另列鹽。",
        "フライパンの底をこそげながら牛乳850mlを少しずつ注ぎます。静かに煮立て、よく混ぜながら6〜8分、とろみが付きソーセージとスプーンにしっかり絡むまで煮ます。黒こしょう4gを全量加えます。濃すぎる場合は牛乳を少量加えます。ソーセージに塩味があるため塩は加えません。",
        "팬 바닥을 긁어가며 우유 850ml를 조금씩 붓는다. 약하게 끓이고 자주 저어 6–8분, 그레이비가 소시지와 숟가락에 걸쭉하게 묻을 때까지 끓인다. 후추 4g 전량을 넣는다. 너무 되직하면 우유를 조금 넣어 푼다. 소시지에 간이 있어 소금은 따로 넣지 않는다.",
        "ค่อย ๆ เทนมสด 850 มล. พร้อมขูดก้นกระทะ นำไปเคี่ยวอ่อนและคนบ่อย ๆ 6–8 นาทีจนเกรวีข้นเคลือบไส้กรอกและช้อนได้ ใส่พริกไทยดำ 4 กรัมทั้งหมด หากข้นเกินไปเติมนมเล็กน้อย ไม่ใส่เกลือเพิ่มเพราะไส้กรอกมีรสเค็มอยู่แล้ว"
      )
    ],
    [
      ml("Let the biscuits rest", "讓餅乾稍微靜置", "ビスケットを少し休ませる", "비스킷을 잠시 둔다", "พักบิสกิตสักครู่"),
      ml(
        "Rest the biscuits on a rack for about 5 minutes while the gravy finishes. This short rest sets the crumb; it is not an additional oven step.",
        "餅乾放網架靜置約 5 分鐘，同時完成肉汁醬。短暫靜置能讓內層定型；不需再放回烤箱。",
        "グレービーを仕上げる間、ビスケットを網の上で約5分休ませます。短い休みで中の生地が落ち着きます。オーブンに戻す必要はありません。",
        "그레이비가 완성되는 동안 비스킷을 망에서 약 5분 둔다. 잠깐 두면 속살이 자리 잡는다. 오븐에 다시 넣지 않는다.",
        "พักบิสกิตบนตะแกรงประมาณ 5 นาทีระหว่างทำเกรวีให้เสร็จ การพักสั้น ๆ ช่วยให้เนื้อด้านในอยู่ตัว ไม่ต้องนำกลับเข้าเตาอบ"
      )
    ],
    [
      ml("Divide into six biscuits with gravy", "分成六份餅乾淋上肉汁醬", "6人分に取り分けてグレービーをかける", "6인분으로 나누어 그레이비를 얹는다", "แบ่งเป็น 6 ที่แล้วราดเกรวี"),
      ml(
        "Split one biscuit onto each of six plates. Divide the sausage gravy evenly among them, using about one sixth of the gravy per serving. Serve while hot; if the gravy waits, keep it above 60°C (140°F) and stir so a skin does not form.",
        "六個盤子各放一個餅乾並剖開，將香腸肉汁醬平均分配，每份約為六分之一。趁熱上桌；若需暫候，保持肉汁醬在 60°C（140°F）以上並攪拌，避免表面結皮。",
        "6皿にビスケットを1個ずつ置いて割り、ソーセージグレービーを均等に、各皿へ約6分の1ずつかけます。熱いうちに出します。待たせる場合はグレービーを60°C（140°F）以上に保ち、膜が張らないよう混ぜます。",
        "접시 6개에 비스킷을 하나씩 놓고 가른다. 소시지 그레이비를 똑같이 나누어 한 접시에 약 6분의 1씩 얹는다. 뜨거울 때 낸다. 기다려야 하면 그레이비를 60°C (140°F) 이상으로 유지하고 표면 막이 생기지 않게 젓는다.",
        "วางบิสกิตหนึ่งชิ้นในแต่ละจาน 6 ใบแล้วผ่า ราดเกรวีไส้กรอกแบ่งเท่า ๆ กัน จานละประมาณหนึ่งในหก เสิร์ฟขณะร้อน หากต้องรอให้รักษาเกรวีเหนือ 60°C (140°F) และคนเพื่อไม่ให้ผิวหน้าแห้งเป็นแผ่น"
      )
    ]
  ]);
  recipe.storage = ml(
    "Within 2 hours, refrigerate gravy and biscuits separately in shallow containers at or below 4°C (40°F); use within 3–4 days. Reheat only the gravy portion needed, stirring until it reaches 74°C (165°F); add a splash of milk if needed. Warm the biscuits separately until hot and crisp. The 71°C ground-sausage cooking endpoint is not the 74°C leftover-reheating endpoint.",
    "在 2 小時內將肉汁醬與餅乾分裝淺容器，分開冷藏於 4°C（40°F）以下，3–4 天內食用。只取需要的肉汁醬份量，邊攪拌邊復熱至 74°C（165°F），太稠可加少許牛奶；餅乾另行加熱至熱且酥。豬絞肉香腸的 71°C 熟度與剩菜復熱 74°C 是不同標準。",
    "2時間以内にグレービーとビスケットを別々の浅い容器に分け、4°C（40°F）以下で冷蔵し、3〜4日以内に使います。必要な量のグレービーだけを混ぜながら74°C（165°F）まで再加熱し、必要なら牛乳を少し加えます。ビスケットは別に熱くカリッと温めます。ひき肉ソーセージの調理基準71°Cと残り物の再加熱基準74°Cは別です。",
    "2시간 이내에 그레이비와 비스킷을 얕은 용기에 따로 담아 4°C (40°F) 이하로 냉장하고 3–4일 안에 먹는다. 필요한 그레이비만 저으면서 74°C (165°F)까지 재가열하고 필요하면 우유를 조금 넣는다. 비스킷은 따로 뜨겁고 바삭하게 데운다. 다진 소시지의 조리 기준 71°C와 남은 음식 재가열 기준 74°C는 서로 다르다.",
    "ภายใน 2 ชั่วโมง แบ่งเกรวีกับบิสกิตใส่ภาชนะตื้นแยกกัน แช่เย็นไม่เกิน 4°C (40°F) และใช้ภายใน 3–4 วัน อุ่นเฉพาะเกรวีส่วนที่จะกินพร้อมคนจนถึง 74°C (165°F) เติมนมเล็กน้อยหากจำเป็น อุ่นบิสกิตแยกให้ร้อนและกรอบ เกณฑ์ปรุงไส้กรอกบด 71°C ต่างจากเกณฑ์อุ่นอาหารเหลือ 74°C"
  );
  addCulinaryReference(recipe, "Serious Eats — Biscuits and Gravy", "https://www.seriouseats.com/biscuits-and-gravy-recipe-7369656");
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseSesameOilChicken(recipe) {
  recipe.cookMinutes = 50;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  setMethod(recipe, [
    [
      ml("Blanch and drain the chicken", "汆燙並瀝乾雞肉", "鶏肉を下ゆでして水気を切る", "닭고기를 데쳐 물기를 뺀다", "ลวกไก่แล้วสะเด็ดน้ำ"),
      ml(
        "Bring a pot of water to a full boil, add the 1 kg bone-in chicken thigh pieces, and blanch for 2 minutes. Drain carefully and discard the blanching water; do not rinse under a running tap. Clean the pot and use clean tongs, then pat the chicken very dry so it will not spit in the sesame oil.",
        "一鍋水煮至大滾，加入全部 1 公斤帶骨雞腿塊汆燙 2 分鐘。小心瀝乾並倒掉汆燙水；不要在水龍頭下沖洗。清洗鍋具並換乾淨夾具，再把雞肉徹底擦乾，避免芝麻油噴濺。",
        "湯をしっかり沸騰させ、骨付き鶏もも肉1kgを入れて2分下ゆでします。注意して湯を切り、ゆで湯は捨てます。流水では洗いません。鍋を洗って清潔なトングを使い、鶏肉をよく拭いてごま油の飛び跳ねを防ぎます。",
        "물을 팔팔 끓인 뒤 뼈 있는 닭다리살 1kg을 넣어 2분 데친다. 조심히 건져 데친 물은 버리고 흐르는 물에 씻지 않는다. 냄비를 씻고 깨끗한 집게를 사용한 다음 닭고기의 물기를 완전히 닦아 참기름이 튀지 않게 한다.",
        "ต้มน้ำให้เดือดจัด ใส่ไก่ติดกระดูก 1 กก. ลวก 2 นาที สะเด็ดอย่างระมัดระวังและเทน้ำลวกทิ้ง ไม่ล้างใต้ก๊อก ล้างหม้อและใช้ที่คีบสะอาด จากนั้นซับไก่ให้แห้งสนิทเพื่อไม่ให้น้ำมันงากระเด็น"
      )
    ],
    [
      ml("Slow-fry the ginger", "以小火慢煎薑片", "しょうがを弱火でじっくり炒める", "생강을 약불에서 천천히 볶는다", "ผัดขิงช้า ๆ ด้วยไฟอ่อน"),
      ml(
        "Heat all 60 ml black sesame oil in a heavy pot over medium-low heat. Add all 80 g sliced ginger in one loose layer and cook 8–10 minutes, turning occasionally, until deep gold at the edges and fragrant. Do not let the oil smoke; lower the heat if the ginger darkens too quickly.",
        "厚底鍋以中小火加熱全部 60 毫升黑麻油，加入全部 80 公克薑片，鬆散鋪成一層。煎 8–10 分鐘並偶爾翻面，至邊緣深金黃、香氣出來。油不可冒煙；薑片上色太快就轉小火。",
        "厚手鍋に黒ごま油60mlすべてを入れて中弱火で熱し、薄切りしょうが80gを重ならないよう広げます。時々返しながら8〜10分、縁が濃い金色になり香りが立つまで炒めます。油を煙らせず、しょうがが早く色づいたら火を弱めます。",
        "두꺼운 냄비에 검은 참기름 60ml 전량을 넣고 중약불로 달군다. 생강 편 80g을 겹치지 않게 넣고 가끔 뒤집으며 8–10분, 가장자리가 진한 금색이고 향이 날 때까지 볶는다. 기름에서 연기가 나지 않게 하고 생강이 빨리 진해지면 불을 낮춘다.",
        "ใส่น้ำมันงาดำ 60 มล.ทั้งหมดในหม้อก้นหนา ตั้งไฟกลางอ่อน ใส่ขิงหั่น 80 กรัมให้กระจายเป็นชั้นเดียว ผัด 8–10 นาที พลิกเป็นครั้งคราวจนขอบเป็นสีทองเข้มและหอม อย่าให้น้ำมันมีควัน ลดไฟหากขิงเข้มเร็วเกินไป"
      )
    ],
    [
      ml("Brown the chicken in batches", "分批將雞肉煎上色", "鶏肉を数回に分けて焼き色を付ける", "닭고기를 나누어 노릇하게 굽는다", "แบ่งไก่เป็นชุดแล้วจี่ให้มีสี"),
      ml(
        "Raise the heat to medium. Add the dried chicken in one uncrowded layer (work in two batches if the pot bottom is hidden) and brown for about 8 minutes total, turning every 2 minutes. The centre remains uncooked; this step builds colour and is not the poultry safety check.",
        "轉中火，雞肉乾燥後單層放入，不要擠滿鍋底；若看不見鍋底就分兩批。煎約 8 分鐘、每 2 分鐘翻面，至表面微褐。中心此時仍未熟；這一步為上色，不是禽肉安全熟度檢查。",
        "中火に上げます。水気を取った鶏肉を重ならないように入れ、鍋底が隠れる場合は2回に分けます。合計約8分、2分ごとに返して表面に焼き色を付けます。中心はまだ生で、この工程は焼き色を付けるためであり、鶏肉の安全確認ではありません。",
        "불을 중불로 올린다. 물기를 닦은 닭고기를 겹치지 않게 넣고 냄비 바닥이 보이지 않으면 두 번에 나눠 굽는다. 총 약 8분 동안 2분마다 뒤집어 겉을 노릇하게 한다. 속은 아직 익지 않았으며 이 단계는 색을 내는 과정이지 닭고기 안전 확인이 아니다.",
        "เพิ่มเป็นไฟกลาง ใส่ไก่ที่ซับแห้งแล้วเป็นชั้นเดียว อย่าให้แน่น หากมองไม่เห็นก้นหม้อให้แบ่งสองชุด จี่รวมประมาณ 8 นาที พลิกทุก 2 นาทีให้ผิวมีสี ด้านในยังไม่สุก ขั้นตอนนี้ทำให้เกิดสี ไม่ใช่การตรวจความปลอดภัยของไก่"
      )
    ],
    [
      ml("Simmer the rice wine briefly", "將米酒短暫煮滾", "米酒を短時間煮立てる", "쌀술을 잠시 끓인다", "ต้มเหล้าข้าวช่วงสั้น ๆ"),
      ml(
        "Carefully pour in all 600 ml rice wine, keeping the pot away from open flames. Bring it to a vigorous simmer uncovered for about 5 minutes. This softens the sharp raw-wine aroma; it does not mean all alcohol has boiled away. Keep the area ventilated.",
        "小心倒入全部 600 毫升米酒，鍋具遠離明火。開蓋煮至大滾並維持約 5 分鐘。這會讓生酒的嗆味變柔和，不代表酒精已全部揮發；保持通風。",
        "米酒600mlすべてを注意して注ぎ、鍋を炎から離します。ふたをせず強めに煮立てて約5分加熱します。酒の尖った香りを和らげますが、アルコールがすべて飛ぶわけではありません。換気してください。",
        "쌀술 600ml를 조심히 붓고 냄비를 불꽃에서 떨어뜨린다. 뚜껑을 열고 약 5분 세게 끓인다. 날카로운 술 향을 줄이는 과정이며 알코올이 모두 날아간다는 뜻은 아니다. 환기한다.",
        "ค่อย ๆ เทเหล้าข้าว 600 มล.ทั้งหมด โดยยกหม้อให้ห่างจากเปลวไฟ เปิดฝาเคี่ยวเดือดแรงประมาณ 5 นาที ขั้นตอนนี้ช่วยให้กลิ่นเหล้าดิบลดลง ไม่ได้หมายความว่าแอลกอฮอล์ระเหยหมด ควรระบายอากาศ"
      )
    ],
    [
      ml("Simmer until the thickest chicken reaches 74°C", "燉煮至最厚處雞肉達 74°C", "鶏肉の最も厚い部分が74°Cになるまで煮る", "가장 두꺼운 닭고기가 74°C에 도달할 때까지 끓인다", "เคี่ยวจนส่วนไก่ที่หนาที่สุดถึง 74°C"),
      ml(
        "Add all 500 ml water, bring back to a simmer, cover, and cook over low heat for about 20 minutes. Add the 10 g rinsed goji berries if using, then simmer uncovered about 5 minutes. Check the thickest thigh pieces with a clean thermometer near the bone without touching it; poultry must reach 74°C (165°F). If any checked piece is cooler, simmer 2 minutes and recheck before serving.",
        "加入全部 500 毫升水，再煮至小滾後加蓋，以小火煮約 20 分鐘。若使用，加入洗淨的 10 公克枸杞，再開蓋煮約 5 分鐘。用乾淨溫度計測最厚雞腿肉，探針靠近骨頭但不碰骨：禽肉須達 74°C（165°F）。若測得較低，續煮 2 分鐘後再測，達標才上桌。",
        "水500mlすべてを加え、再び煮立ったらふたをして弱火で約20分煮ます。使う場合は洗ったクコの実10gを加え、ふたを外して約5分煮ます。清潔な温度計を骨に触れないよう骨の近くの最も厚いもも肉に差します。鶏肉は74°C（165°F）に達させます。低ければ2分ずつ煮て再測定します。",
        "물 500ml 전량을 넣고 다시 끓으면 뚜껑을 덮어 약불에서 약 20분 끓인다. 사용한다면 씻은 구기자 10g을 넣고 뚜껑을 열어 약 5분 더 끓인다. 깨끗한 온도계를 뼈에 닿지 않게 뼈 가까이 가장 두꺼운 닭다리살에 꽂아 잰다. 가금류는 74°C (165°F)에 도달해야 한다. 낮으면 2분씩 더 끓이고 다시 잰다.",
        "เติมน้ำ 500 มล.ทั้งหมด ต้มกลับมาแล้วปิดฝาเคี่ยวไฟอ่อนประมาณ 20 นาที หากใช้ให้ใส่เก๋ากี้ 10 กรัมที่ล้างแล้ว จากนั้นเปิดฝาเคี่ยวต่อประมาณ 5 นาที ใช้เทอร์โมมิเตอร์สะอาดวัดเนื้อส่วนที่หนาที่สุดใกล้กระดูกแต่ไม่ให้แตะกระดูก ไก่ต้องถึง 74°C (165°F) หากต่ำกว่าให้เคี่ยวต่อครั้งละ 2 นาทีแล้ววัดซ้ำก่อนเสิร์ฟ"
      )
    ],
    [
      ml("Season and serve four portions", "調味並分成四份上桌", "味を調えて4人分に盛る", "간을 맞추고 4인분으로 낸다", "ปรุงรสและแบ่งเสิร์ฟ 4 ที่"),
      ml(
        "Stir in 4 g salt and simmer 1 minute; taste the broth, then add the remaining 1 g only if needed. Divide the chicken and broth evenly among four bowls. For optional noodles, cook the listed 400 g noodles separately according to their package and ladle the soup over them; never put uncooked noodles into the measured soup pot.",
        "先拌入 4 公克鹽煮 1 分鐘，試喝湯頭後，只有需要時才加入剩下 1 公克。將雞肉與湯平均分入四碗。若搭配麵條，依包裝另煮所列 400 公克麵條，再舀湯淋上；不可將未煮麵條直接放入定量湯鍋。",
        "塩4gを加えて1分煮ます。味を見て、必要な場合だけ残り1gを加えます。鶏肉とスープを4杯に等分します。任意の麺400gは表示通り別鍋でゆで、スープをかけます。乾麺や生麺を計量済みのスープ鍋に直接入れないでください。",
        "소금 4g을 넣고 1분 끓인다. 국물 간을 본 뒤 필요할 때만 남은 1g을 넣는다. 닭고기와 국물을 네 그릇에 똑같이 나눈다. 선택 사항인 면 400g은 포장 안내대로 따로 삶아 국물을 붓는다. 삶지 않은 면을 정량한 국물 냄비에 넣지 않는다.",
        "คนเกลือ 4 กรัมและเคี่ยว 1 นาที ชิมน้ำซุปแล้วเติมเกลือที่เหลือ 1 กรัมเฉพาะเมื่อจำเป็น แบ่งไก่และน้ำซุปเท่า ๆ กัน 4 ชาม หากใช้เส้น 400 กรัม ให้ต้มแยกตามฉลากแล้วตักซุปราด อย่าใส่เส้นดิบลงในหม้อน้ำซุปที่ตวงไว้"
      )
    ]
  ]);
  recipe.storage = ml(
    "Within 2 hours, divide chicken and broth into shallow containers and refrigerate at or below 4°C (40°F); use within 3–4 days. Keep optional cooked noodles separate. Reheat only the portion needed, stirring the broth, until the chicken and soup reach 74°C (165°F). The 20-minute simmer is an estimate; the thermometer endpoint controls poultry safety.",
    "在 2 小時內將雞肉與湯分裝淺容器，冷藏於 4°C（40°F）以下，3–4 天內食用。選配煮熟麵條另行保存。只取需要的份量，攪拌湯汁復熱至雞肉與湯皆達 74°C（165°F）。20 分鐘燉煮是估時；禽肉安全以溫度計為準。",
    "2時間以内に鶏肉とスープを浅い容器に分け、4°C（40°F）以下で冷蔵し、3〜4日以内に使います。任意のゆで麺は別に保存します。必要な分だけを取り分け、スープを混ぜながら鶏肉と汁の両方が74°C（165°F）になるまで再加熱します。20分煮るのは目安で、鶏肉の安全は温度計で確認します。",
    "2시간 이내에 닭고기와 국물을 얕은 용기에 나누어 4°C (40°F) 이하로 냉장하고 3–4일 안에 먹는다. 선택한 삶은 면은 따로 보관한다. 필요한 양만 덜어 국물을 저으면서 닭고기와 국물이 모두 74°C (165°F)에 도달할 때까지 재가열한다. 20분 끓이기는 예상 시간이며 가금류 안전은 온도계로 확인한다.",
    "ภายใน 2 ชั่วโมง แบ่งไก่กับน้ำซุปใส่ภาชนะตื้นและแช่เย็นไม่เกิน 4°C (40°F) ใช้ภายใน 3–4 วัน เก็บเส้นที่ต้มแล้วแยกต่างหาก อุ่นเฉพาะส่วนที่จะกิน คนซุปจนทั้งไก่และน้ำซุปถึง 74°C (165°F) เวลาเคี่ยว 20 นาทีเป็นเพียงประมาณการ ใช้เทอร์โมมิเตอร์ยืนยันความปลอดภัยของไก่"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseQuicheLorraine(recipe) {
  setMethod(recipe, [
    [
      ml("Rub the butter into the flour", "將奶油揉入麵粉", "バターを小麦粉にすり込む", "버터를 밀가루에 섞는다", "ผสมเนยเข้ากับแป้ง"),
      ml(
        "Mix the pastry flour with 3 g salt. Rub or pulse in 125 g cold butter until the mixture resembles coarse crumbs with a few small butter pieces; stop before it turns pasty. Keep the remaining 5 g butter for greasing the tin.",
        "將派皮用麵粉與 3 公克鹽拌勻，揉入或短暫攪打 125 公克冷奶油，至呈粗碎屑並留少量小奶油塊；不可打成糊。其餘 5 公克奶油留作抹烤模。",
        "タルト生地用の小麦粉と塩3gを混ぜます。冷たいバター125gをすり込むか短く攪拌し、粗いパン粉状で小さなバター片が少し残るところで止めます。残り5gは型に塗ります。",
        "파이용 밀가루와 소금 3g을 섞는다. 차가운 버터 125g을 비벼 넣거나 짧게 돌려 굵은 빵가루처럼 만들고 작은 버터 조각을 조금 남긴다. 반죽처럼 되기 전에 멈춘다. 남은 버터 5g은 틀에 바른다.",
        "ผสมแป้งทำแป้งทาร์ตกับเกลือ 3 กรัม ขยำหรือปั่นสั้น ๆ กับเนยเย็น 125 กรัมจนเป็นเกล็ดหยาบและยังมีชิ้นเนยเล็ก ๆ เหลือ หยุดก่อนกลายเป็นเนื้อครีม เก็บเนย 5 กรัมที่เหลือไว้ทาพิมพ์"
      )
    ],
    [
      ml("Add cold water and chill the dough", "加冰水並冷藏麵團", "冷水を加えて生地を冷やす", "찬물을 넣고 반죽을 냉장한다", "เติมน้ำเย็นและแช่เย็นแป้ง"),
      ml(
        "Mix in 60 ml ice-cold water just until the dough holds when pressed. Add the reserved 10 ml only in 5 ml portions if dry patches remain. Press into a disc, wrap, and refrigerate for 30 minutes.",
        "先拌入 60 毫升冰水，至用手按壓能成團即可。若仍有乾粉，才每次加 5 毫升、最多用完保留的 10 毫升。壓成圓餅、包好冷藏 30 分鐘。",
        "氷水60mlを加え、押すと生地がまとまるまで混ぜます。乾いた部分が残る場合だけ、取り分けた10mlを5mlずつ加えます。円盤状にして包み、30分冷蔵します。",
        "얼음물 60ml를 넣고 눌렀을 때 뭉칠 때까지만 섞는다. 마른 부분이 남을 때만 남겨 둔 물 10ml를 5ml씩 넣는다. 둥글납작하게 만들어 싸서 30분 냉장한다.",
        "ผสมน้ำเย็นจัด 60 มล.จนแป้งจับตัวเมื่อกด เติมน้ำที่แบ่งไว้ 10 มล.ครั้งละ 5 มล.เฉพาะเมื่อยังมีส่วนแห้ง กดเป็นแผ่นกลม ห่อและแช่เย็น 30 นาที"
      )
    ],
    [
      ml("Line and chill the tart tin", "鋪入塔模並冷藏", "タルト型に敷き、冷やす", "타르트 틀에 깔고 냉장한다", "กรุพิมพ์ทาร์ตและแช่เย็น"),
      ml(
        "Grease a 23 cm tart tin with all 5 g reserved butter. Roll the dough on the 20 g dusting flour to about 4 mm thick, line the tin without stretching it, trim, and prick the base. Chill the lined tin for 15 minutes while the oven heats to 180°C.",
        "用保留的全部 5 公克奶油塗抹 23 公分塔模。桌面撒用 20 公克麵粉，將麵團擀至約 4 毫米厚，不拉扯地鋪入塔模，修邊並叉孔。塔模冷藏 15 分鐘，同時將烤箱預熱至 180°C。",
        "23cmのタルト型に取り分けたバター5gすべてを塗ります。打ち粉20gを使って生地を約4mmに伸ばし、引っ張らずに型へ敷き、余分を切り、底にフォークで穴を開けます。オーブンを180°Cに温める間、型ごと15分冷やします。",
        "타르트 틀 23cm에 남겨 둔 버터 5g 전량을 바른다. 덧가루 20g을 사용해 반죽을 약 4mm 두께로 밀고 늘리지 않게 틀에 깐 뒤 가장자리를 자르고 바닥을 포크로 찌른다. 오븐을 180°C로 예열하는 동안 틀째 15분 냉장한다.",
        "ทาเนยที่แบ่งไว้ 5 กรัมทั้งหมดบนพิมพ์ทาร์ต 23 ซม. ใช้แป้งนวล 20 กรัมรีดแป้งหนาประมาณ 4 มม. กรุพิมพ์โดยไม่ดึงให้ยืด ตัดขอบและใช้ส้อมจิ้มฐาน แช่พิมพ์ 15 นาทีระหว่างอุ่นเตาที่ 180°C"
      )
    ],
    [
      ml("Blind-bake the crust", "盲烤塔皮", "タルト生地を空焼きする", "타르트지를 블라인드 베이킹한다", "อบฐานทาร์ตแบบถ่วงน้ำหนัก"),
      ml(
        "Line the chilled crust with baking paper and pie weights. Bake at 180°C for 20 minutes, lift out the paper and weights carefully, then bake about 8 minutes more until the base looks dry and lightly golden. These are oven-time estimates; the dry surface is the stage cue.",
        "冷藏塔皮鋪烘焙紙並放派石。以 180°C 烘烤 20 分鐘，小心取出紙與派石，再烤約 8 分鐘，至底部表面乾燥、略呈金黃。這些是烤箱估時；表面乾燥才是階段指標。",
        "冷やした生地にオーブンシートを敷き、重石を載せます。180°Cで20分焼き、シートと重石を注意して外し、さらに約8分、底が乾いて薄く色づくまで焼きます。時間はオーブンの目安で、表面の乾燥が工程の目印です。",
        "차가운 반죽에 유산지를 깔고 파이 추를 올린다. 180°C에서 20분 굽고 종이와 추를 조심히 뺀 뒤 약 8분 더 구워 바닥이 마르고 연한 금빛이 되게 한다. 시간은 오븐별 예상치이며 표면이 마른 상태가 단계 기준이다.",
        "ปูฐานแป้งเย็นด้วยกระดาษอบและวางตุ้มน้ำหนัก อบที่ 180°C 20 นาที ยกกระดาษกับตุ้มออกอย่างระมัดระวังแล้วอบต่อประมาณ 8 นาทีจนฐานแห้งและเป็นสีทองอ่อน เวลานี้เป็นค่าประมาณของเตา สังเกตผิวที่แห้งเป็นหลัก"
      )
    ],
    [
      ml("Cook and drain the bacon", "煎熟並瀝乾培根", "ベーコンを焼いて脂を切る", "베이컨을 익혀 기름을 뺀다", "ปรุงเบคอนและสะเด็ดไขมัน"),
      ml(
        "While the crust bakes, cook all 175 g bacon over medium heat for about 5–6 minutes until cooked and lightly golden, not hard. Drain on a rack or paper towel and let it cool briefly; keep two thirds for the base and one third for the top.",
        "塔皮烘烤時，以中火煎全部 175 公克培根約 5–6 分鐘，至熟且略金黃、不要煎硬。放網架或紙巾瀝油並稍微放涼；三分之二鋪底，三分之一放在上層。",
        "タルトを焼いている間にベーコン175gすべてを中火で約5〜6分、火が通って薄く色づくまで焼きます。硬くしません。網かペーパーで脂を切って少し冷まし、3分の2を底、3分の1を上に使います。",
        "타르트지를 굽는 동안 베이컨 175g 전량을 중불에서 약 5–6분 익혀 살짝 노릇하게 하되 딱딱하게 만들지 않는다. 망이나 종이타월에 기름을 빼고 잠시 식힌다. 3분의 2는 바닥, 3분의 1은 위에 쓴다.",
        "ระหว่างอบฐานทาร์ต ปรุงเบคอน 175 กรัมทั้งหมดด้วยไฟกลางประมาณ 5–6 นาทีจนสุกและเป็นสีทองอ่อน อย่าให้แข็ง พักบนตะแกรงหรือกระดาษซับให้สะเด็ดไขมัน แบ่งสองในสามไว้รองฐานและหนึ่งในสามไว้โรยหน้า"
      )
    ],
    [
      ml("Mix the quiche custard", "調勻鹹派蛋奶餡", "キッシュの卵液を混ぜる", "키슈 커스터드를 섞는다", "ผสมคัสตาร์ดคีช"),
      ml(
        "Whisk the 4 eggs with 200 ml cream, 150 ml milk, the remaining 1 g salt, 1 g pepper, and 0.2 g nutmeg just until combined. Stir in all 75 g grated Gruyère. Do not whip in foam; a smooth custard bakes evenly.",
        "將 4 顆蛋、200 毫升鮮奶油、150 毫升牛奶、剩下 1 公克鹽、1 公克胡椒與 0.2 公克肉豆蔻拌至均勻即可。拌入全部 75 公克葛瑞爾起司。不要打入泡沫，讓蛋奶餡平滑才能均勻烘烤。",
        "卵4個、生クリーム200ml、牛乳150ml、残りの塩1g、こしょう1g、ナツメグ0.2gを混ぜ合わせるだけにします。グリュイエールチーズ75gすべてを混ぜます。泡立てず、なめらかな卵液にすると均一に焼けます。",
        "달걀 4개, 크림 200ml, 우유 150ml, 남은 소금 1g, 후추 1g, 넛맥 0.2g을 섞일 때까지만 푼다. 그뤼에르 치즈 75g 전량을 넣는다. 거품을 내지 않아야 매끈한 커스터드가 고르게 익는다.",
        "ตีไข่ 4 ฟองกับครีม 200 มล. นม 150 มล. เกลือที่เหลือ 1 กรัม พริกไทย 1 กรัม และลูกจันทน์เทศ 0.2 กรัมพอเข้ากัน คนกรูแยร์ชีส 75 กรัมทั้งหมดลงไป อย่าตีจนเกิดฟอง คัสตาร์ดเนียนจะสุกสม่ำเสมอ"
      )
    ],
    [
      ml("Fill the shell in two bacon layers", "將培根分兩層放入塔殼", "ベーコンを二層にして詰める", "베이컨을 두 층으로 넣는다", "ใส่เบคอนเป็นสองชั้น"),
      ml(
        "Set the blind-baked shell on a rimmed tray. Scatter two thirds of the drained bacon over the base, pour in all the custard to just below the rim, then distribute the remaining bacon on top. Leave the tray level so the custard does not spill during transfer.",
        "將盲烤好的塔殼放在有邊烤盤上。底部先鋪瀝乾培根的三分之二，倒入全部蛋奶餡至略低於塔邊，再均勻撒上剩下三分之一培根。搬動時保持烤盤水平，避免蛋奶餡溢出。",
        "空焼きしたタルトを縁のある天板に載せます。水気を切ったベーコンの3分の2を底に散らし、卵液を縁の少し下まで全量注ぎ、残りのベーコンを上に散らします。移動中にこぼれないよう天板を水平に保ちます。",
        "블라인드 베이킹한 파이 껍질을 테두리 있는 팬에 올린다. 물기를 뺀 베이컨의 3분의 2를 바닥에 뿌리고 커스터드를 가장자리 바로 아래까지 전량 붓는다. 남은 베이컨을 위에 고르게 올린다. 옮길 때 커스터드가 넘치지 않게 팬을 수평으로 둔다.",
        "วางฐานทาร์ตที่อบแล้วบนถาดมีขอบ กระจายเบคอนที่สะเด็ดแล้วสองในสามลงฐาน เทคัสตาร์ดทั้งหมดให้ต่ำกว่าขอบเล็กน้อย แล้วโรยเบคอนที่เหลือด้านบน ยกถาดให้ราบเพื่อไม่ให้คัสตาร์ดหก"
      )
    ],
    [
      ml("Bake the custard to the egg-dish endpoint", "將蛋餡烤至蛋料理安全熟度", "卵料理の安全温度まで焼く", "달걀 요리의 안전 온도까지 굽는다", "อบคัสตาร์ดให้ถึงอุณหภูมิปลอดภัยของเมนูไข่"),
      ml(
        "Lower the oven to 170°C and bake for an estimated 35–45 minutes. Check the centre with a clean thermometer; an egg dish such as quiche must reach 71°C (160°F). The custard should also wobble gently as one set layer, with no liquid wave; that is a texture cue, while 71°C is the safety endpoint. If cooler, continue in 5-minute intervals and recheck. Shield the pastry edge with foil if it browns early.",
        "烤箱降至 170°C，估計烘烤 35–45 分鐘。用乾淨溫度計測中心；quiche 這類蛋料理須達 71°C（160°F）。蛋餡也應整層輕輕晃動、不呈液體波浪，這是口感線索；71°C 才是安全熟度。若未達，續烤 5 分鐘再測。塔皮邊緣太早上色時以鋁箔遮蓋。",
        "オーブンを170°Cに下げ、目安35〜45分焼きます。清潔な温度計で中心を測ります。キッシュのような卵料理は71°C（160°F）に達させます。卵液全体が一層のまま穏やかに揺れ、液体の波がないのも食感の目安です。71°Cが安全基準です。低ければ5分ずつ追加して再測定します。縁が早く色づいたらホイルをかぶせます。",
        "오븐을 170°C로 낮추고 약 35–45분 굽는다. 깨끗한 온도계로 가운데를 잰다. 키슈 같은 달걀 요리는 71°C (160°F)에 도달해야 한다. 커스터드가 한 층으로 부드럽게 흔들리고 액체 물결이 없는 것은 식감 기준이며, 안전 기준은 71°C다. 낮으면 5분씩 더 굽고 다시 잰다. 가장자리가 빨리 갈색이 되면 호일을 덮는다.",
        "ลดเตาอบเหลือ 170°C อบประมาณ 35–45 นาที ใช้เทอร์โมมิเตอร์สะอาดวัดตรงกลาง เมนูไข่อย่างคีชต้องถึง 71°C (160°F) เนื้อคัสตาร์ดควรสั่นไหวเบา ๆ เป็นชั้นเดียวโดยไม่มีคลื่นเหลว ซึ่งเป็นเกณฑ์ด้านเนื้อสัมผัส ส่วน 71°C เป็นเกณฑ์ความปลอดภัย หากยังต่ำให้อบต่อครั้งละ 5 นาทีแล้ววัดซ้ำ คลุมขอบด้วยฟอยล์หากสีเข้มเร็ว"
      )
    ],
    [
      ml("Rest before unmoulding", "脫模前靜置", "型から外す前に休ませる", "틀에서 빼기 전에 둔다", "พักก่อนถอดพิมพ์"),
      ml(
        "Set the tin on a rack for 15 minutes so the custard settles. Loosen the edge carefully; remove the outer ring only when the pastry feels firm enough to support the filling.",
        "烤模放網架靜置 15 分鐘，讓蛋餡定型。小心劃開邊緣；塔皮摸起來足以支撐餡料時才取下外圈。",
        "型を網に載せて15分置き、卵液を落ち着かせます。縁を丁寧に緩め、タルト生地が中身を支えられるほど固まってから外枠を外します。",
        "틀을 망 위에 놓고 15분 두어 커스터드를 안정시킨다. 가장자리를 조심스럽게 분리하고 파이지가 속을 지탱할 만큼 단단해진 뒤 바깥 링을 뺀다.",
        "วางพิมพ์บนตะแกรง 15 นาทีให้คัสตาร์ดเซตตัว ค่อย ๆ แซะขอบและถอดวงพิมพ์เมื่อแป้งแข็งพอรับน้ำหนักไส้"
      )
    ],
    [
      ml("Cut six wedges and serve warm", "切成六片趁溫熱上桌", "6切れに分けて温かいうちに出す", "여섯 조각으로 잘라 따뜻할 때 낸다", "ตัด 6 ชิ้นและเสิร์ฟอุ่น"),
      ml(
        "Cut the 23 cm quiche into six wedges with a sharp knife, wiping the blade between cuts. Lift each slice with a broad spatula and serve warm; its centre should hold a soft, even custard around the bacon.",
        "用利刀將 23 公分 quiche 切成六片，每切一刀擦淨刀刃。用寬鏟托起每片並趁溫熱上桌；中心蛋餡應柔嫩均勻地包住培根。",
        "23cmのキッシュを鋭いナイフで6切れにし、切るごとに刃を拭きます。幅広のへらで1切れずつ持ち上げ、温かいうちに出します。中心はベーコンを包む柔らかく均一な卵液です。",
        "날카로운 칼로 23cm 키슈를 여섯 조각으로 자르고 매번 칼날을 닦는다. 넓은 주걱으로 한 조각씩 들어 따뜻할 때 낸다. 가운데 커스터드는 부드럽고 고르게 굳어 베이컨을 감싼다.",
        "ใช้มีดคมตัดคีช 23 ซม.เป็น 6 ชิ้น เช็ดใบมีดระหว่างตัด ใช้พายกว้างยกทีละชิ้นและเสิร์ฟอุ่น ตรงกลางควรเป็นคัสตาร์ดเนื้อนุ่มสม่ำเสมอหุ้มเบคอน"
      )
    ]
  ]);
  recipe.storage = ml(
    "Refrigerate slices in shallow containers within 2 hours at or below 4°C (40°F); use within 3–4 days. Reheat one slice at a time at 160°C for an estimated 12–15 minutes, or longer as needed, until its centre reaches 74°C (165°F). The bake endpoint for a freshly cooked quiche is 71°C (160°F); reheated leftovers use 74°C (165°F).",
    "在 2 小時內將切片放入淺容器，冷藏於 4°C（40°F）以下，3–4 天內食用。一次復熱一片，以 160°C 烤估計 12–15 分鐘，若需要可更久，直到中心達 74°C（165°F）。新鮮 quiche 的烘烤熟度是 71°C（160°F）；剩菜復熱則用 74°C（165°F）。",
    "2時間以内に切り分けたものを浅い容器に入れ、4°C（40°F）以下で冷蔵し、3〜4日以内に使います。1切れずつ160°Cのオーブンで目安12〜15分、必要ならさらに加熱し、中心が74°C（165°F）になるまで温めます。焼きたてキッシュの基準は71°C（160°F）、残り物の再加熱は74°C（165°F）です。",
    "2시간 이내에 조각을 얕은 용기에 담아 4°C (40°F) 이하로 냉장하고 3–4일 안에 먹는다. 한 번에 한 조각씩 160°C 오븐에서 약 12–15분 또는 필요하면 더 오래 데워 중심이 74°C (165°F)에 도달하게 한다. 갓 구운 키슈의 기준은 71°C (160°F), 남은 음식 재가열 기준은 74°C (165°F)다.",
    "ภายใน 2 ชั่วโมง แบ่งชิ้นใส่ภาชนะตื้นและแช่เย็นไม่เกิน 4°C (40°F) ใช้ภายใน 3–4 วัน อุ่นครั้งละหนึ่งชิ้นที่ 160°C ประมาณ 12–15 นาทีหรือนานกว่านั้นจนตรงกลางถึง 74°C (165°F) เกณฑ์อบคีชใหม่คือ 71°C (160°F) ส่วนอาหารเหลือที่อุ่นซ้ำใช้ 74°C (165°F)"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

export function refineFiftySeventhMethods(recipes) {
  const selected = new Set(["moo-satay", "biscuits-and-gravy", "sesame-oil-chicken", "quiche-lorraine"]);
  for (const id of selected) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error(`Recipe method audit 57: missing recipe ${id}`);
    const revised = cloneForPublication(recipes[index]);
    if (id === "moo-satay") reviseMooSatay(revised);
    if (id === "biscuits-and-gravy") reviseBiscuitsAndGravy(revised);
    if (id === "sesame-oil-chicken") reviseSesameOilChicken(revised);
    if (id === "quiche-lorraine") reviseQuicheLorraine(revised);
    recipes[index] = revised;
  }
  return recipes;
}
