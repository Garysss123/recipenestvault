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

function replaceSource(recipe, oldUrl, source) {
  const index = recipe.sources.findIndex((entry) => entry.url === oldUrl);
  if (index < 0) throw new Error(`${recipe.id}: source to replace was not found: ${oldUrl}`);
  recipe.sources[index] = source;
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const riceGuidance = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";

function reviseChanaMasala(recipe) {
  recipe.prepMinutes = 500;
  recipe.cookMinutes = 100;
  recipe.totalMinutes = 600;
  body(recipe, 0, ml(
    "Rinse the 250 g dried chickpeas, cover with at least three times their volume of cool water, and refrigerate for 8 hours. This 480-minute soak is included in the 500-minute prep estimate, along with about 20 minutes of active preparation. Drain, rinse, and discard any shrivelled or discoloured beans.",
    "將 250 公克乾鷹嘴豆洗淨，以至少三倍體積的冷水覆蓋並冷藏浸泡 8 小時。這 480 分鐘浸泡已計入 500 分鐘備料估時，另含約 20 分鐘操作。瀝乾沖洗，丟棄乾皺或變色的豆子。",
    "乾燥ひよこ豆250gを洗い、豆の3倍以上の冷水に浸して冷蔵庫で8時間置きます。この480分の浸水は、作業約20分と合わせて準備時間500分に含まれます。水を切って洗い、しわや変色のある豆は除きます。",
    "마른 병아리콩 250g을 씻고 콩 부피의 최소 세 배인 찬물을 부어 냉장고에서 8시간 불린다. 이 480분 불림은 약 20분의 실제 준비와 함께 준비 시간 500분에 포함된다. 물을 빼고 헹군 뒤 쭈글거나 변색된 콩은 버린다.",
    "ล้างถั่วลูกไก่แห้ง 250 กรัม เติมน้ำเย็นอย่างน้อยสามเท่าของปริมาตรถั่วแล้วแช่เย็น 8 ชั่วโมง การแช่ 480 นาทีนี้รวมอยู่ในเวลาเตรียม 500 นาที พร้อมเวลาลงมือประมาณ 20 นาที สะเด็ด ล้าง และทิ้งเม็ดที่เหี่ยวหรือสีผิดปกติ"
  ));
  body(recipe, 1, ml(
    "Put the drained chickpeas and 1.1 L fresh water in a pressure cooker. Allow about 5–10 minutes for the cooker to reach pressure, then cook at high pressure for 22 minutes and let the pressure fall naturally for 15 minutes. A chickpea should crush creamy, not chalky; if firm in the centre, pressure-cook 3–5 minutes more and check again. Reserve 500 ml cooking liquid. The 100-minute cook estimate covers the pressure stage, natural release, masala cooking, and final rest; cooker models vary.",
    "瀝乾鷹嘴豆與 1.1 公升新水放入壓力鍋。約需 5–10 分鐘升至壓力，再高壓煮 22 分鐘，自然洩壓 15 分鐘。豆子應可壓成綿泥、沒有粉硬豆心；若中心仍硬，再高壓煮 3–5 分鐘後檢查。保留 500 毫升煮豆水。100 分鐘烹調估時包含升壓、加壓、自然洩壓、煮 masala 與最後靜置；不同鍋具所需時間略有差異。",
    "水を切ったひよこ豆と新しい水1.1Lを圧力鍋に入れます。加圧まで約5〜10分かけ、高圧で22分、その後15分自然に減圧します。豆は粉っぽさなくクリーミーにつぶれる状態が目安です。中心が硬ければさらに3〜5分加圧して確認します。煮汁を500ml取っておきます。調理時間100分の目安には、加圧までの時間、加圧調理、自然減圧、マサラの調理、最後の休ませ時間を含みます。機種により異なります。",
    "물기를 뺀 병아리콩과 새 물 1.1L를 압력솥에 넣는다. 압력이 오르는 데 약 5–10분, 고압 조리 22분, 자연 감압 15분을 잡는다. 콩은 가루 같은 심 없이 크리미하게 으깨져야 한다. 가운데가 단단하면 고압으로 3–5분 더 익힌 뒤 다시 확인한다. 삶은 물 500ml를 남긴다. 조리 시간 100분은 압력 도달, 고압 조리, 자연 감압, 마살라 조리와 마지막 휴지를 포함한 추정치이며 기종에 따라 달라진다.",
    "ใส่ถั่วที่สะเด็ดกับน้ำใหม่ 1.1 ลิตรในหม้อแรงดัน เผื่อเวลาประมาณ 5–10 นาทีให้หม้อขึ้นแรงดัน จากนั้นต้มแรงดันสูง 22 นาทีและปล่อยแรงดันตามธรรมชาติ 15 นาที ถั่วควรบี้ได้เนียนครีม ไม่เป็นไตแป้ง หากแกนยังแข็งให้ต้มแรงดันต่อ 3–5 นาทีแล้วตรวจอีกครั้ง เก็บน้ำต้ม 500 มล. เวลาเคี่ยว 100 นาทีเป็นค่าประมาณที่รวมเวลาขึ้นแรงดัน ช่วงแรงดัน การลดแรงดัน การปรุงมาซาลา และการพักท้ายหม้อ ซึ่งแตกต่างตามรุ่นหม้อ"
  ));
  body(recipe, 2, ml(
    "Heat all 30 ml oil over medium heat. Sizzle the 4 g cumin seeds for 20 seconds, then add all 220 g onion. Cook 10–12 minutes, stirring often, until evenly medium-gold; this browning time is a flavour cue.",
    "中火加熱全部 30 毫升油，孜然籽 4 公克爆香 20 秒，再加入全部 220 公克洋蔥。常攪炒 10–12 分鐘至均勻中金色；上色時間是風味指標。",
    "油30ml全量を中火で熱し、クミンシード4gを20秒はじかせます。玉ねぎ220g全量を加え、よく混ぜながら10〜12分、均一な中金色になるまで炒めます。この時間は風味の目安です。",
    "중불에서 기름 30ml 전량을 데우고 커민씨 4g을 20초 볶는다. 양파 220g 전량을 넣고 자주 저으며 10–12분 고르게 중간 금색이 될 때까지 볶는다. 이 시간은 풍미를 위한 기준이다.",
    "ตั้งน้ำมันทั้งหมด 30 มล.ด้วยไฟกลาง ผัดเมล็ดยี่หร่า 4 กรัม 20 วินาที ใส่หอมทั้งหมด 220 กรัม ผัดและคนบ่อย 10–12 นาทีจนสีทองกลางสม่ำเสมอ เวลานี้เป็นเกณฑ์ด้านรสชาติ"
  ));
  body(recipe, 3, ml(
    "Add all 20 g ginger-garlic paste and cook for 60 seconds. Stir in 300 g tomato purée, 6 g ground coriander, 4 g Kashmiri chile powder, 2 g turmeric, and 5 g of the listed 8 g salt. Cook over medium-low heat for 10–12 minutes until thick, with a little oil visible at the edge.",
    "加入全部 20 公克薑蒜泥炒 60 秒，再拌入 300 公克番茄泥、6 公克芫荽粉、4 公克喀什米爾辣椒粉、2 公克薑黃與所列 8 公克鹽中的 5 公克。中小火煮 10–12 分鐘至濃稠，邊緣微微泛油。",
    "しょうがにんにくペースト20g全量を加えて60秒炒めます。トマトピューレ300g、コリアンダー粉6g、カシミールチリ4g、ターメリック2g、塩8gのうち5gを加え、中弱火で10〜12分、濃くなり縁に少し油が浮くまで煮ます。",
    "생강 마늘 페이스트 20g 전량을 넣어 60초 볶는다. 토마토 퓌레 300g, 고수 가루 6g, 카슈미르 고춧가루 4g, 강황 2g과 표시된 소금 8g 중 5g을 넣고 중약불에서 10–12분 걸쭉해지고 가장자리에 기름이 조금 보일 때까지 익힌다.",
    "ใส่ขิงกระเทียมบด 20 กรัมทั้งหมด ผัด 60 วินาที เติมมะเขือเทศปั่น 300 กรัม ผงผักชี 6 กรัม พริกแคชเมียร์ 4 กรัม ขมิ้น 2 กรัม และเกลือ 5 กรัมจากทั้งหมด 8 กรัม เคี่ยวไฟกลางอ่อน 10–12 นาทีจนข้นและมีน้ำมันเล็กน้อยตรงขอบ"
  ));
  body(recipe, 4, ml(
    "Add the drained chickpeas and 400 ml of the reserved cooking liquid. Bring to a simmer, cover partly, and cook 15 minutes. Mash about 60 g chickpeas against the pot to thicken naturally; keep the remaining 100 ml liquid for adjusting the gravy.",
    "加入瀝乾鷹嘴豆與保留煮豆水中的 400 毫升，煮至微滾，半加蓋煮 15 分鐘。把約 60 公克豆子壓在鍋壁成泥自然增稠；剩餘 100 毫升煮豆水留待調整濃度。",
    "ひよこ豆と取っておいた煮汁のうち400mlを加え、煮立ったらふたを少しずらして15分煮ます。約60gの豆を鍋肌でつぶして自然なとろみを付け、残りの煮汁100mlは濃度調整用に取っておきます。",
    "물기를 뺀 콩과 남겨 둔 삶은 물 중 400ml를 넣고 끓기 시작하면 뚜껑을 살짝 열어 15분 익힌다. 콩 약 60g을 냄비 벽에 눌러 으깨 자연스럽게 걸쭉하게 하고, 남은 물 100ml는 농도 조절용으로 둔다.",
    "ใส่ถั่วที่สะเด็ดกับน้ำต้มที่เก็บไว้ 400 มล. ต้มให้เริ่มเดือด ปิดฝาแง้ม 15 นาที บี้ถั่วราว 60 กรัมกับข้างหม้อให้ข้นตามธรรมชาติ เก็บน้ำต้มอีก 100 มล.ไว้ปรับความข้น"
  ));
  body(recipe, 5, ml(
    "Stir in the 4 g garam masala, 5 g amchur, and the remaining 3 g salt. Simmer uncovered for 4–6 minutes until the gravy coats the chickpeas. If too thick, add the reserved cooking liquid 30 ml at a time; about 100 ml remains available.",
    "拌入 4 公克 garam masala、5 公克芒果粉與剩餘 3 公克鹽，不加蓋煮 4–6 分鐘至醬汁包住豆子。若太稠，每次加入 30 毫升保留煮豆水；約有 100 毫升可供調整。",
    "ガラムマサラ4g、アムチュール5g、残りの塩3gを加えます。ふたをせず4〜6分、ソースが豆に絡むまで煮ます。濃すぎれば取っておいた煮汁を30mlずつ加えます。約100mlを調整用に残しています。",
    "가람 마살라 4g, 암추르 5g, 남은 소금 3g을 넣는다. 뚜껑을 열고 4–6분 소스가 콩에 묻을 때까지 끓인다. 너무 되직하면 남긴 삶은 물을 한 번에 30ml씩 넣는다. 조절용으로 약 100ml 남아 있다.",
    "ใส่การัมมาซาลา 4 กรัม อัมชูร์ 5 กรัม และเกลือที่เหลือ 3 กรัม เคี่ยวเปิดฝา 4–6 นาทีจนเกรวีเคลือบถั่ว หากข้นไปให้เติมน้ำต้มที่เก็บไว้ครั้งละ 30 มล. มีน้ำเหลือราว 100 มล.สำหรับปรับ"
  ));
  body(recipe, 6, ml(
    "Turn off the heat, cover, and rest 10 minutes so the chickpeas absorb the seasoning. Fold in all 20 g chopped cilantro, then divide the curry among four bowls: each has about a 62.5 g dry-chickpea share before soaking. Serve with separately prepared rice or flatbread if desired.",
    "關火加蓋靜置 10 分鐘，讓鷹嘴豆吸收調味。拌入全部 20 公克香菜，再平均分成四碗；每碗約相當於浸泡前 62.5 公克乾豆。可另備米飯或餅搭配。",
    "火を止めてふたをし、豆に味がなじむよう10分休ませます。刻んだ香菜20g全量を混ぜ、4杯に均等に分けます。各杯は浸水前の乾燥豆約62.5g分です。好みで別に用意したご飯やパンを添えます。",
    "불을 끄고 뚜껑을 덮어 10분 두어 콩에 간이 배게 한다. 다진 고수 20g 전량을 섞고 네 그릇에 똑같이 나눈다. 한 그릇은 불리기 전 마른 콩 약 62.5g 분량이다. 원하면 따로 준비한 밥이나 빵을 곁들인다.",
    "ปิดไฟ ปิดฝาพัก 10 นาทีให้ถั่วดูดเครื่องปรุง คลุกผักชีสับทั้งหมด 20 กรัม แล้วแบ่งแกงเท่ากันสี่ชาม แต่ละชามเทียบเท่าถั่วแห้งก่อนแช่ประมาณ 62.5 กรัม หากต้องการให้เสิร์ฟกับข้าวหรือแผ่นแป้งที่เตรียมแยก"
  ));
  recipe.storage = ml(
    "Cool the chickpea curry in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. For best texture, use within 3 days; FoodSafety.gov lists refrigerated vegetable stews at 3–4 days. Reheat only the portion needed to 74°C/165°F throughout.",
    "鷹嘴豆咖哩分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。為保持最佳口感，建議 3 天內食用；FoodSafety.gov 對冷藏蔬菜燉菜列為 3–4 天。只取要吃的份量復熱至中心各處達 74°C/165°F。",
    "ひよこ豆カレーは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。食感のため3日以内がおすすめです。FoodSafety.govは冷蔵した野菜シチューを3〜4日としています。食べる分だけ取り分け、全体が74°C/165°Fに達するまで再加熱します。",
    "병아리콩 카레는 얕은 용기에 나누어 담고 2시간 안에 4°C/40°F 이하로 냉장한다. 식감은 3일 안에 먹는 것이 가장 좋다. FoodSafety.gov는 냉장 채소 스튜를 3–4일로 안내한다. 먹을 만큼만 덜어 전체가 74°C/165°F가 되도록 다시 데운다.",
    "แบ่งแกงถั่วใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า เพื่อเนื้อสัมผัสดีที่สุดแนะนำให้กินภายใน 3 วัน ส่วน FoodSafety.gov ระบุสตูผักแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C/165°F"
  );
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseRedCurryPork(recipe) {
  recipe.prepMinutes = 25;
  recipe.cookMinutes = 37;
  recipe.totalMinutes = 62;
  body(recipe, 0, ml(
    "Chill the 550 g boneless pork shoulder for about 20 minutes so it is easier to slice, then cut 6 mm slices across the grain. Pat dry and keep covered in the refrigerator while preparing the curry base. Keep the raw-pork board and utensils separate from the basil and serving bowls; the 20-minute chill is included in the 25-minute prep estimate.",
    "將 550 公克去骨豬肩冷藏約 20 分鐘，使肉稍硬、較好切，再逆紋切 6 毫米片。擦乾後加蓋冷藏，趁此準備咖哩底。生豬肉砧板與器具須和羅勒、盛碗器具分開；這 20 分鐘冷藏已計入 25 分鐘備料估時。",
    "骨なし豚肩肉550gを約20分冷蔵して少し硬くし、繊維を断つ6mm厚に切ります。水気を拭いて覆い、カレーのベースを準備する間は冷蔵します。生肉用のまな板と器具をバジルや盛り付け用の器具と分けます。この20分の冷却は準備時間25分に含まれます。",
    "뼈 없는 돼지 어깨살 550g을 약 20분 냉장해 단단하게 만든 뒤 결 반대로 6mm 두께로 썬다. 물기를 닦고 덮어 카레 베이스를 준비하는 동안 냉장한다. 생돼지고기 도마와 도구는 바질 및 그릇용 도구와 분리한다. 20분 냉장은 준비 시간 25분에 포함된다.",
    "แช่สันคอหมูไร้กระดูก 550 กรัมประมาณ 20 นาทีให้แข็งขึ้นเพื่อหั่นง่าย ตัดขวางเส้นหนา 6 มม. ซับแห้ง ปิดฝาแช่เย็นระหว่างเตรียมฐานแกง แยกเขียงและอุปกรณ์หมูดิบจากโหระพาและชามเสิร์ฟ เวลาพักเย็น 20 นาทีรวมในเวลาเตรียม 25 นาที"
  ));
  body(recipe, 1, ml(
    "Spoon 180 ml of the thick coconut cream from the undisturbed 500 ml can into a wide pot. Simmer 5–7 minutes until glossy, then add all 75 g red curry paste and fry 4 minutes, stirring, until fragrant and small red oil beads appear.",
    "從未搖勻的 500 毫升椰漿中舀出 180 毫升濃椰乳，放入寬鍋小滾 5–7 分鐘至油亮，再加入全部 75 公克紅咖哩醬，邊攪邊炒 4 分鐘至香氣散出、表面浮出小紅油珠。",
    "振らずにおいたココナッツミルク500mlから濃いクリーム180mlを広い鍋にすくい、5〜7分静かに煮てつやを出します。レッドカレーペースト75g全量を加え、混ぜながら4分、香りが立ち赤い油の粒が出るまで炒めます。",
    "흔들지 않은 코코넛밀크 500ml 캔에서 진한 크림 180ml를 넓은 냄비에 떠 넣어 5–7분 윤기가 날 때까지 끓인다. 레드 커리 페이스트 75g 전량을 넣고 저으며 4분 향이 나고 붉은 기름 방울이 보일 때까지 볶는다.",
    "ตักครีมกะทิข้น 180 มล.จากกระป๋อง 500 มล.ที่ยังไม่เขย่าใส่หม้อกว้าง เคี่ยว 5–7 นาทีจนเงา ใส่พริกแกงแดงทั้งหมด 75 กรัม ผัดและคน 4 นาทีจนหอมและมีหยดน้ำมันสีแดง"
  ));
  body(recipe, 2, ml(
    "Cook the pork in two batches for 2–3 minutes each, just until the outside loses its raw look and is coated with curry paste; do not treat this browning stage as the final doneness check. Return both batches to the pot using a clean utensil.",
    "豬肉分兩批，每批炒 2–3 分鐘，至表面不再呈生肉色並裹上咖哩醬即可；此上色階段不是最後熟度檢查。用乾淨器具將兩批豬肉都放回鍋中。",
    "豚肉を2回に分け、各2〜3分炒めます。表面の生肉らしさが消えてペーストが絡むまでで止め、この焼き付け工程を最終的な火通り確認とはしません。清潔な器具で両方の肉を鍋に戻します。",
    "돼지고기를 두 번에 나눠 한 번마다 2–3분 볶아 겉의 생고기 색이 사라지고 페이스트가 묻게 한다. 이 갈변 단계만으로 익힘을 판단하지 않는다. 깨끗한 도구로 두 번 볶은 고기를 모두 냄비에 되돌린다.",
    "ผัดหมูสองรอบ รอบละ 2–3 นาที แค่จนผิวไม่ดูดิบและเคลือบพริกแกง ขั้นตอนนี้ยังไม่ใช่การตรวจความสุกสุดท้าย ใช้อุปกรณ์สะอาดใส่หมูทั้งสองรอบกลับลงหม้อ"
  ));
  body(recipe, 3, ml(
    "Add the remaining 320 ml coconut milk, all 250 ml chicken stock, the listed 35 ml fish sauce, 20 g palm sugar, and 4 torn makrut lime leaves. Scrape the base, bring to a gentle simmer, cover slightly ajar, and cook about 7 minutes.",
    "加入剩餘 320 毫升椰漿、全部 250 毫升雞高湯、所列 35 毫升魚露、20 公克棕櫚糖與 4 片撕裂馬蜂橙葉。刮起鍋底，煮至小滾，鍋蓋留縫煮約 7 分鐘。",
    "残りのココナッツミルク320ml、チキンストック250ml全量、表示したナンプラー35ml、パームシュガー20g、裂いたこぶみかんの葉4枚を加えます。鍋底をこそげ、静かな煮立ちにしてふたを少しずらし、約7分煮ます。",
    "남은 코코넛밀크 320ml, 닭육수 250ml 전량, 표시된 피시소스 35ml, 팜슈거 20g, 찢은 마크루트 라임 잎 4장을 넣는다. 바닥을 긁고 약하게 끓여 뚜껑을 살짝 열고 약 7분 익힌다.",
    "เติมกะทิที่เหลือ 320 มล. น้ำสต๊อกไก่ทั้งหมด 250 มล. น้ำปลา 35 มล.ตามสูตร น้ำตาลมะพร้าว 20 กรัม และใบมะกรูดฉีก 4 ใบ ขูดก้นหม้อให้ทั่ว ต้มเดือดอ่อน ปิดฝาแง้มประมาณ 7 นาที"
  ));
  body(recipe, 4, ml(
    "Drain the quartered eggplants and rinse the bamboo shoots. Add both and simmer uncovered 8–10 minutes until the eggplant is tender but still holds its shape. This is a vegetable-texture estimate. Check several pork slices, including the thickest, with a thermometer: these are whole-muscle shoulder slices, not ground pork, so use 63°C (145°F) followed by a 3-minute rest. If needed, keep the curry simmering and recheck.",
    "泰國茄子瀝掉鹽水，竹筍沖洗後瀝乾，一起加入鍋中，不加蓋煮 8–10 分鐘至茄子軟而仍保持形狀；這是蔬菜口感估時。用溫度計檢查數片豬肉，包括最厚片：這是整塊豬肩切片、不是絞肉，依官方標準達 63°C（145°F）後靜置 3 分鐘。未達時繼續小滾並複測。",
    "タイなすの塩水を切り、たけのこをすすいで水を切ります。両方を加え、ふたをせず8〜10分、なすが柔らかく形を保つまで煮ます。これは野菜の食感の目安です。豚肩肉はひき肉ではなく塊肉を切ったものなので、最も厚いものを含む複数枚を温度計で測り、63°C（145°F）に達してから3分休ませます。未達なら煮続けて再確認します。",
    "태국 가지는 소금물에서 건지고 죽순은 헹궈 물기를 뺀다. 함께 넣어 뚜껑을 열고 8–10분 가지가 부드럽지만 모양을 유지할 때까지 끓인다. 이는 채소 식감 예상 시간이다. 돼지고기는 간 고기가 아닌 통근육 어깨살 조각이므로 가장 두꺼운 것을 포함해 여러 조각을 온도계로 확인한다. 63°C (145°F)에 도달한 뒤 3분 쉰다. 미달이면 계속 끓이고 다시 잰다.",
    "สะเด็ดมะเขือที่แช่น้ำเกลือและล้างหน่อไม้ ใส่ทั้งคู่ เคี่ยวเปิดฝา 8–10 นาทีจนมะเขือนุ่มแต่ยังคงรูป เวลานี้เป็นค่าประมาณด้านเนื้อสัมผัสผัก หมูเป็นชิ้นจากเนื้อไหล่เต็ม ไม่ใช่หมูบด ใช้เทอร์โมมิเตอร์ตรวจหลายชิ้นรวมชิ้นหนาสุดให้ถึง 63°C (145°F) แล้วพัก 3 นาที หากยังไม่ถึงให้เคี่ยวต่อและวัดซ้ำ"
  ));
  body(recipe, 5, ml(
    "Turn off the heat after the pork check and rest the curry, covered, for at least 3 minutes. Fold in all 35 g Thai basil, the remaining 2 lime leaves, and up to 10 ml extra fish sauce only if the broth needs it. The 36-minute cook estimate covers the staged curry and this rest; the 5–7, 4, 7, and 8–10-minute stages are estimates, not separate safety rules.",
    "豬肉達標後關火，加蓋至少靜置 3 分鐘。拌入全部 35 公克泰國羅勒與剩餘 2 片馬蜂橙葉；只有湯汁需要時才補最多 10 毫升魚露。36 分鐘烹調估時涵蓋分段煮咖哩與這段靜置；5–7、4、7、8–10 分鐘均為估時，不是各自的安全標準。",
    "豚肉の温度確認後に火を止め、ふたをして最低3分休ませます。タイバジル35g全量と残りのこぶみかんの葉2枚を混ぜ、必要な場合のみナンプラーを最大10ml足します。調理時間36分は各工程と休ませ時間を含む目安です。5〜7分、4分、7分、8〜10分は質感の目安で、安全基準そのものではありません。",
    "돼지고기 온도를 확인한 뒤 불을 끄고 뚜껑을 덮어 최소 3분 둔다. 타이 바질 35g 전량과 남은 라임 잎 2장을 넣고 국물 맛이 부족할 때만 피시소스를 최대 10ml 더한다. 조리 시간 36분은 단계별 조리와 이 휴지를 포함한 추정치다. 각 단계의 5–7분, 4분, 7분, 8–10분은 식감 시간이지 별도 안전 기준이 아니다.",
    "หลังตรวจอุณหภูมิหมูแล้วปิดไฟ ปิดฝาพักอย่างน้อย 3 นาที คลุกโหระพาไทยทั้งหมด 35 กรัมกับใบมะกรูดที่เหลือ 2 ใบ เติมน้ำปลาเพิ่มไม่เกิน 10 มล.เฉพาะเมื่อรสยังไม่พอ เวลาเคี่ยว 36 นาทีรวมการปรุงเป็นช่วงและการพักนี้ เวลา 5–7, 4, 7 และ 8–10 นาทีเป็นค่าประมาณด้านคุณภาพ ไม่ใช่เกณฑ์ความปลอดภัยแยกกัน"
  ));
  body(recipe, 6, ml(
    "Divide the curry evenly among four bowls, giving each about 137.5 g raw-pork equivalent, 50 g eggplant, 50 g bamboo shoots, and 150 g hot cooked jasmine rice. Spoon the sauce evenly over the bowls and serve at once while the basil is fragrant.",
    "咖哩平均分成四碗，每碗約含 137.5 公克生豬肉等量、50 公克茄子、50 公克竹筍與 150 公克熱熟茉莉香米。醬汁平均舀入各碗，趁羅勒香氣仍鮮明時上桌。",
    "カレーを4杯に均等に分けます。各杯に生肉換算で約137.5gの豚肉、なす50g、たけのこ50g、温かいジャスミンライス150gが入るようにします。ソースも均等にかけ、バジルの香りが新鮮なうちに出します。",
    "카레를 네 그릇에 똑같이 나눈다. 한 그릇마다 생고기 기준 약 137.5g의 돼지고기, 가지 50g, 죽순 50g, 뜨거운 재스민밥 150g을 담는다. 소스도 고르게 끼얹고 바질 향이 살아 있을 때 낸다.",
    "แบ่งแกงเท่ากันสี่ชาม แต่ละชามมีหมูเทียบเท่าน้ำหนักดิบประมาณ 137.5 กรัม มะเขือ 50 กรัม หน่อไม้ 50 กรัม และข้าวหอมมะลิหุงสุกอุ่น 150 กรัม ราดซอสเท่ากันและเสิร์ฟขณะโหระพายังหอม"
  ));
  recipe.storage = ml(
    "Refrigerate the curry in shallow containers within 2 hours at 4°C/40°F or below. Three days is a quality preference; FoodSafety.gov lists refrigerated soups and stews at 3–4 days. Reheat only the needed curry portion to 74°C/165°F throughout, then add fresh basil if desired. Store leftover rice separately: cool quickly, refrigerate within 1 hour, use within 24 hours, and reheat only once until steaming hot throughout.",
    "咖哩分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 3 天內食用是口感偏好；FoodSafety.gov 對冷藏湯與燉菜列為 3–4 天。只取需要的咖哩份量復熱至中心各處達 74°C/165°F；喜歡的話復熱後再加新鮮羅勒。剩飯須另行存放：快速冷卻、1 小時內冷藏、24 小時內使用，只復熱一次至全份冒蒸氣。",
    "カレーは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。3日以内は品質上のおすすめで、FoodSafety.govは冷蔵スープとシチューを3〜4日としています。食べる分だけカレーを74°C/165°Fまで再加熱し、好みで新しいバジルを加えます。残ったご飯は別に保存し、速やかに冷まして1時間以内に冷蔵、24時間以内に使い、湯気が立つまで一度だけ再加熱します。",
    "카레는 얕은 용기에 나누어 2시간 안에 4°C/40°F 이하로 냉장한다. 3일은 품질을 위한 권장 기간이고 FoodSafety.gov는 냉장 수프와 스튜를 3–4일로 안내한다. 먹을 만큼만 카레를 전체가 74°C/165°F가 되도록 데우고 원하면 새 바질을 넣는다. 남은 밥은 따로 보관한다. 빠르게 식혀 1시간 안에 냉장하고 24시간 안에 사용하며 김이 날 때까지 한 번만 재가열한다.",
    "แบ่งแกงใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 3 วันเป็นคำแนะนำด้านคุณภาพ ส่วน FoodSafety.gov ระบุซุปและสตูแช่เย็น 3–4 วัน อุ่นเฉพาะแกงที่จะกินให้ทั่วถึง 74°C/165°F แล้วเติมโหระพาสดได้ตามชอบ เก็บข้าวที่เหลือแยก ทำให้เย็นเร็ว แช่เย็นภายใน 1 ชั่วโมง ใช้ภายใน 24 ชั่วโมง และอุ่นครั้งเดียวจนมีไอทั่วถึง"
  );
  replaceSource(recipe, "https://hot-thai-kitchen.com/red-curry-chicken-squash/", {
    title: "Paint the Kitchen Red — Thai Red Curry Pork",
    url: "https://www.paintthekitchenred.com/thai-red-curry-pork/"
  });
  replaceSource(recipe, "https://thailandfoundation.or.th/secrets-to-thai-cooking/", {
    title: "BBC Good Food — Thai pork & peanut curry",
    url: "https://www.bbcgoodfood.com/recipes/thai-pork-peanut-curry"
  });
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "UK Food Standards Agency: Home food fact checker (rice)", riceGuidance);
}

function reviseBlanquette(recipe) {
  body(recipe, 2, ml(
    "Return the 1 kg veal cubes to the clean pot with the remaining 1.5 L water, 150 ml wine, 250 g carrots, 180 g leek whites, 150 g onion with the 2 cloves, 80 g celery, 10 g garlic, 2 g thyme, 1 bay leaf, and 4 g of the 6 g salt. Bring just to a simmer, cover loosely, and poach gently for an estimated 90–110 minutes until a fork enters easily; this is a tenderness estimate, not the safety endpoint. Check the centre of the thickest veal cube with a thermometer for 63°C (145°F), then keep it hot for a 3-minute rest before lifting it out. If below temperature, continue poaching and recheck.",
    "將 1 公斤小牛肉塊放回乾淨鍋，加入剩餘 1.5 公升水、150 毫升白酒、250 公克紅蘿蔔、180 公克韭蔥白、150 公克洋蔥與 2 顆丁香、80 公克芹菜、10 公克蒜、2 公克百里香、1 片月桂葉，以及 6 公克鹽中的 4 公克。煮至剛微滾，鬆蓋小火燉約 90–110 分鐘至叉子容易刺入；這是柔軟度估時，不是安全熟度標準。用溫度計測最厚小牛肉塊中心達 63°C（145°F），再保持熱度靜置 3 分鐘才撈出；未達時繼續燉煮並複測。",
    "子牛肉1kgを洗った鍋に戻し、残りの水1.5L、白ワイン150ml、にんじん250g、ポロねぎの白い部分180g、クローブ2個を刺した玉ねぎ150g、セロリ80g、にんにく10g、タイム2g、ローリエ1枚、塩6gのうち4gを加えます。沸騰直前まで温め、ふたを少しずらして約90〜110分、フォークが通る柔らかさまで静かに煮ます。これは柔らかさの目安で、安全確認ではありません。最も厚い子牛肉の中心が63°C（145°F）か温度計で確認し、その温度を保って3分休ませてから取り出します。未達なら煮続けて再測定します。",
    "깨끗이 씻은 냄비에 송아지 고기 1kg과 남은 물 1.5L, 화이트와인 150ml, 당근 250g, 리크 흰 부분 180g, 정향 2개를 꽂은 양파 150g, 셀러리 80g, 마늘 10g, 타임 2g, 월계수잎 1장, 소금 6g 중 4g을 넣는다. 막 끓을 때까지 데우고 뚜껑을 느슨하게 덮어 약 90–110분 포크가 쉽게 들어갈 때까지 부드럽게 익힌다. 이는 부드러움 추정 시간이지 안전 기준이 아니다. 가장 두꺼운 송아지 고기 중심이 63°C (145°F)인지 온도계로 확인하고 그 온도를 3분 유지한 뒤 건진다. 미달이면 더 익히고 다시 잰다.",
    "ใส่เนื้อลูกวัว 1 กก.กลับหม้อสะอาด เติมน้ำที่เหลือ 1.5 ลิตร ไวน์ขาว 150 มล. แครอท 250 กรัม ต้นกระเทียมส่วนขาว 180 กรัม หอมหัวใหญ่ 150 กรัมที่เสียบกานพลู 2 ดอก ขึ้นฉ่าย 80 กรัม กระเทียม 10 กรัม ไธม์ 2 กรัม ใบกระวาน 1 ใบ และเกลือ 4 กรัมจากทั้งหมด 6 กรัม ตั้งจนเริ่มเดือดอ่อน ปิดฝาหลวม เคี่ยวเบา ๆ ราว 90–110 นาทีจนส้อมจิ้มง่าย เวลานี้เป็นค่าประมาณความนุ่ม ไม่ใช่เกณฑ์ความปลอดภัย ใช้เทอร์โมมิเตอร์วัดกลางก้อนที่หนาที่สุดให้ถึง 63°C (145°F) แล้วคงอุณหภูมิและพัก 3 นาทีก่อนตักออก หากยังต่ำกว่าให้เคี่ยวต่อแล้วตรวจซ้ำ"
  ));
  body(recipe, 7, ml(
    "Whisk the 2 egg yolks with 150 ml cream and 20 ml lemon juice, then gradually whisk in 100 ml hot velouté to temper. Return this liaison to the pan over low heat and stir constantly to 80–82°C (176–180°F) for 1 minute; do not boil or the eggs may curdle. FoodSafety.gov lists 71°C (160°F) for egg dishes, so this measured sauce stage exceeds that safety endpoint; the 80–82°C target is for this sauce method and texture.",
    "將 2 顆蛋黃與 150 毫升鮮奶油、20 毫升檸檬汁打勻，再逐漸加入 100 毫升熱白醬調溫。倒回鍋中以小火持續攪拌，達 80–82°C（176–180°F）並維持 1 分鐘；不可煮沸，以免蛋液凝結。FoodSafety.gov 對蛋料理列出的安全標準為 71°C（160°F），此處量測的醬汁溫度已高於該標準；80–82°C 是此白醬的操作與質地目標。",
    "卵黄2個、生クリーム150ml、レモン汁20mlを混ぜ、熱い白いソース100mlを少しずつ加えて温度をなじませます。鍋に戻して弱火で絶えず混ぜ、80〜82°C（176〜180°F）で1分保ちます。沸騰させると卵が固まることがあります。FoodSafety.govの卵料理の安全基準は71°C（160°F）で、このソース工程の実測温度はそれを上回ります。80〜82°Cはこのソースの調理・食感の目標です。",
    "달걀노른자 2개와 크림 150ml, 레몬즙 20ml를 섞고 뜨거운 벨루테 100ml를 조금씩 저어 넣어 온도를 맞춘다. 냄비에 다시 넣고 약불에서 계속 저으며 80–82°C (176–180°F)에서 1분 유지한다. 끓이면 달걀이 응고될 수 있다. FoodSafety.gov의 달걀 요리 안전 기준은 71°C (160°F)이므로 이 소스 단계의 측정 온도는 그 기준을 넘는다. 80–82°C는 이 소스의 조리와 질감을 위한 목표다.",
    "ตีไข่แดง 2 ฟองกับครีม 150 มล.และน้ำเลมอน 20 มล. ค่อย ๆ ตีน้ำซอสเวลูเตร้อน 100 มล.ลงไปปรับอุณหภูมิ เทกลับหม้อใช้ไฟอ่อน คนตลอดให้อยู่ที่ 80–82°C (176–180°F) 1 นาที ห้ามต้มเดือดเพราะไข่อาจจับตัว FoodSafety.gov ระบุเกณฑ์ความปลอดภัยสำหรับเมนูไข่ที่ 71°C (160°F) ดังนั้นอุณหภูมิซอสที่วัดได้ในขั้นนี้สูงกว่าเกณฑ์นั้น ส่วน 80–82°C เป็นเป้าหมายด้านวิธีทำและเนื้อซอส"
  ));
  body(recipe, 8, ml(
    "Fold in the rested veal, carrots, leek, and cooked mushrooms. Warm gently for an estimated 4–5 minutes until the sauce is hot and fluid, without boiling. This is a finishing and sauce-quality stage: the veal has already met its whole-cut endpoint, and the egg liaison has passed its dish-specific endpoint. Do not use 74°C here as though freshly cooked veal were a reheated leftover. Taste before adding the reserved 2 g salt.",
    "拌入已靜置的小牛肉、紅蘿蔔、韭蔥與炒熟蘑菇。小火溫熱約 4–5 分鐘至醬汁熱而流動，不要煮沸。這是完成與白醬品質階段：小牛肉已達整塊肉熟度，蛋黃白醬也已超過蛋料理標準。不要把新煮熟的小牛肉套用剩菜復熱用的 74°C。加保留的 2 公克鹽前先試味。",
    "休ませた子牛肉、にんじん、ポロねぎ、火を通したきのこを加えます。ソースが熱く流れる状態になるまで約4〜5分、沸騰させずに温めます。これは仕上げとソースの品質の工程です。子牛肉は塊肉の安全基準をすでに満たし、卵の liaison も卵料理の基準を超えています。出来たての子牛肉に、残り物再加熱用の74°Cを当てはめないでください。残りの塩2gを加える前に味見します。",
    "쉬게 둔 송아지 고기, 당근, 리크, 익힌 버섯을 넣는다. 소스가 뜨겁고 부드럽게 흐를 때까지 약 4–5분 약불로 데우되 끓이지 않는다. 이는 마무리와 소스 품질 단계다. 송아지 고기는 통고기 기준을 이미 충족했고 달걀 소스도 달걀 요리 기준을 넘었다. 갓 조리한 고기에 남은 음식 재가열용 74°C를 적용하지 않는다. 남겨 둔 소금 2g을 넣기 전에 맛본다.",
    "ใส่เนื้อลูกวัว แครอท ต้นกระเทียม และเห็ดที่พักไว้ อุ่นเบา ๆ ประมาณ 4–5 นาทีจนซอสร้อนและไหลได้ ห้ามต้มเดือด ขั้นนี้เป็นการจบจานและรักษาคุณภาพซอส เนื้อลูกวัวผ่านเกณฑ์เนื้อเต็มชิ้นแล้ว และซอสไข่ผ่านเกณฑ์เฉพาะเมนูไข่ ไม่ต้องนำ 74°C สำหรับอุ่นอาหารเหลือมาใช้กับเนื้อที่เพิ่งปรุง ชิมก่อนเติมเกลือที่เหลือ 2 กรัม"
  ));
  body(recipe, 9, ml(
    "Serve with 600 g hot cooked rice, dividing 150 g rice and an equal share of veal, vegetables, mushrooms, and sauce among four plates. Rice cooked for this meal should be kept hot until serving. For safely stored leftover rice, chill quickly in shallow portions, refrigerate within 1 hour, use within 24 hours, and reheat only once until steaming hot throughout and 74°C (165°F).",
    "搭配 600 公克熱熟白飯，四盤各分 150 公克飯，再平均分配小牛肉、蔬菜、蘑菇與白醬。當餐新煮的米飯應保溫至上桌。若使用妥善保存的剩飯，應分成淺份快速冷卻，1 小時內冷藏、24 小時內使用，只復熱一次至全份冒蒸氣且達 74°C（165°F）。",
    "温かいご飯600gを添え、4皿に150gずつ分け、子牛肉、野菜、きのこ、ソースも均等に盛ります。この食事用に炊いたご飯は提供まで温かく保ちます。適切に保存した残りご飯を使う場合は、浅い容器に分けて速やかに冷まし、1時間以内に冷蔵し、24時間以内に使い、一度だけ全体が湯気の立つ状態かつ74°C（165°F）まで再加熱します。",
    "뜨겁게 지은 밥 600g을 곁들여 네 접시에 밥 150g씩 나누고 송아지 고기, 채소, 버섯, 소스도 균등하게 담는다. 이번 식사용으로 지은 밥은 낼 때까지 따뜻하게 둔다. 안전하게 보관한 남은 밥을 쓸 경우 얕은 용기에 나눠 빠르게 식히고 1시간 안에 냉장, 24시간 안에 사용하며, 한 번만 전체가 김이 나고 74°C (165°F)가 되도록 재가열한다.",
    "เสิร์ฟกับข้าวสวยร้อน 600 กรัม แบ่งข้าวจานละ 150 กรัมในสี่จาน แล้วแบ่งเนื้อลูกวัว ผัก เห็ด และซอสเท่ากัน ข้าวที่หุงใหม่สำหรับมื้อนี้ควรเก็บให้อุ่นจนเสิร์ฟ หากใช้ข้าวเหลือที่เก็บอย่างปลอดภัย ให้แบ่งภาชนะตื้นเพื่อให้เย็นเร็ว แช่เย็นภายใน 1 ชั่วโมง ใช้ภายใน 24 ชั่วโมง และอุ่นเพียงครั้งเดียวจนร้อนมีไอทั่วถึงและถึง 74°C (165°F)"
  ));
  recipe.storage = ml(
    "For the stew without rice, cool in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Three days is a sauce-quality preference; FoodSafety.gov lists refrigerated soups and stews at 3–4 days. Reheat only the needed stew portion to 74°C/165°F throughout. Store cooked rice separately: cool quickly, refrigerate within 1 hour, use within 24 hours, and reheat only once until steaming hot throughout; if stored together, follow the shorter rice window.",
    "白燉肉不含飯的部分分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 3 天內食用是白醬品質偏好；FoodSafety.gov 對冷藏湯與燉菜列為 3–4 天。只取要吃的燉肉復熱至中心各處達 74°C/165°F。熟飯須另行存放：快速冷卻、1 小時內冷藏、24 小時內使用，只復熱一次至全份冒蒸氣；若與燉肉混存，依較短的米飯期限。",
    "ご飯を除いたシチューは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。3日以内はソースの品質上のおすすめで、FoodSafety.govは冷蔵スープとシチューを3〜4日としています。食べる分だけ全体が74°C/165°Fになるまで再加熱します。炊いたご飯は別に保存し、速やかに冷まして1時間以内に冷蔵、24時間以内に使用し、湯気が立つまで一度だけ再加熱します。一緒に保存した場合は短い方の米の期限に従います。",
    "밥을 뺀 스튜는 얕은 용기에 나누어 2시간 안에 4°C/40°F 이하로 냉장한다. 3일은 소스 품질을 위한 권장 기간이며 FoodSafety.gov는 냉장 수프와 스튜를 3–4일로 안내한다. 먹을 만큼만 전체가 74°C/165°F가 되도록 재가열한다. 밥은 따로 보관한다. 빠르게 식혀 1시간 안에 냉장하고 24시간 안에 사용하며 김이 날 때까지 한 번만 재가열한다. 함께 보관하면 더 짧은 밥 보관 기간을 따른다.",
    "สตูที่แยกจากข้าวให้แบ่งภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 3 วันเป็นคำแนะนำด้านคุณภาพซอส ส่วน FoodSafety.gov ระบุซุปและสตูแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C/165°F เก็บข้าวสุกแยกต่างหาก ทำให้เย็นเร็ว แช่เย็นภายใน 1 ชั่วโมง ใช้ภายใน 24 ชั่วโมง และอุ่นครั้งเดียวจนมีไอทั่วถึง หากเก็บรวมกันให้ใช้ระยะที่สั้นกว่าของข้าว"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "UK Food Standards Agency: Home food fact checker (rice)", riceGuidance);
}

function reviseMiyeokGuk(recipe) {
  recipe.prepMinutes = 20;
  recipe.cookMinutes = 40;
  recipe.totalMinutes = 60;
  const beef = recipe.ingredients.find((row) => row.item.en.startsWith("beef brisket"));
  if (beef) beef.item = ml(
    "beef brisket, sliced 4 mm across the grain",
    "牛胸肉，逆紋切 4 毫米片",
    "牛ブリスケット（繊維を断って4mm）",
    "소고기 양지, 결 반대로 4mm",
    "เนื้อหน้าอกวัว หั่นขวางเส้น 4 มม."
  );
  body(recipe, 0, ml(
    "Cover all 30 g dried seaweed with at least 1.5 L cold water for 15 minutes, or until pliable. Drain, squeeze gently, and cut into 5 cm lengths; discard the soaking water. The 15-minute soak is included in the 20-minute prep estimate.",
    "全部 30 公克乾海帶以至少 1.5 公升冷水浸泡 15 分鐘至柔軟，瀝乾輕擠後切 5 公分段，泡水丟棄。這 15 分鐘已計入 20 分鐘備料估時。",
    "乾燥わかめ30g全量を冷水1.5L以上に15分、または柔らかくなるまで浸します。水を切って軽く絞り、5cmに切ります。戻し水は捨てます。この15分は準備時間20分に含まれます。",
    "마른 미역 30g 전량을 찬물 1.5L 이상에 15분 또는 부드러워질 때까지 불린다. 물을 빼고 살짝 짜 5cm 길이로 자른 뒤 불린 물은 버린다. 15분 불림은 준비 시간 20분에 포함된다.",
    "แช่สาหร่ายแห้งทั้งหมด 30 กรัมในน้ำเย็นอย่างน้อย 1.5 ลิตร 15 นาทีหรือจนนิ่ม สะเด็ด บีบเบา ๆ ตัดยาว 5 ซม. และทิ้งน้ำแช่ เวลานี้รวมในเวลาเตรียม 20 นาที"
  ));
  body(recipe, 1, ml(
    "Toss the 250 g brisket slices with 10 ml of the listed 30 ml soup soy sauce, 5 ml of the 20 ml sesame oil, and the black pepper. Cover and refrigerate 10 minutes while heating the pot; keep the raw-meat plate separate from the soaked seaweed and clean utensils.",
    "牛胸肉片拌所列 30 毫升湯醬油中的 10 毫升、20 毫升芝麻油中的 5 毫升與黑胡椒，加蓋冷藏 10 分鐘，同時熱鍋。生肉盤須與泡發海帶及乾淨器具分開。",
    "ブリスケット250gに、表示した薄口しょうゆ30mlのうち10ml、ごま油20mlのうち5ml、黒こしょうを混ぜます。覆って10分冷蔵する間に鍋を熱します。生肉の皿を戻したわかめや清潔な器具と分けます。",
    "양지 250g에 표시된 국간장 30ml 중 10ml, 참기름 20ml 중 5ml, 후추를 버무린다. 덮어 10분 냉장하는 동안 냄비를 달군다. 생고기 접시는 불린 미역과 깨끗한 도구에서 분리한다.",
    "คลุกเนื้อหน้าอก 250 กรัมกับซีอิ๊วซุป 10 มล.จากทั้งหมด 30 มล. น้ำมันงา 5 มล.จากทั้งหมด 20 มล. และพริกไทย ปิดฝาแช่เย็น 10 นาทีระหว่างอุ่นหม้อ แยกจานเนื้อดิบจากสาหร่ายและอุปกรณ์สะอาด"
  ));
  body(recipe, 2, ml(
    "Heat a heavy pot over medium-high heat. Add the remaining 15 ml sesame oil and all beef; stir-fry about 3 minutes until the surfaces brown. Add all soaked seaweed and 15 g minced garlic and cook 4 minutes until glossy deep green. The listed oil is now fully allocated: 5 ml for the beef seasoning and 15 ml for the pot.",
    "厚鍋中大火燒熱，加入剩餘 15 毫升芝麻油與全部牛肉，炒約 3 分鐘至表面上色。加入全部泡發海帶與 15 公克蒜末，再炒 4 分鐘至深綠亮澤。芝麻油已分配完：5 毫升拌牛肉、15 毫升炒鍋底。",
    "厚手鍋を中強火で熱し、残りのごま油15mlと牛肉全量を加え、表面に焼き色が付くまで約3分炒めます。戻したわかめ全量とにんにく15gを加え、濃い緑でつやが出るまで4分炒めます。ごま油は下味用5ml、鍋用15mlで全量使います。",
    "두꺼운 냄비를 중강불로 달군다. 남은 참기름 15ml와 소고기 전량을 넣어 겉이 갈색이 될 때까지 약 3분 볶는다. 불린 미역 전량과 다진 마늘 15g을 넣어 짙은 초록으로 윤기 날 때까지 4분 더 볶는다. 참기름은 밑간 5ml, 냄비 15ml로 전량 사용한다.",
    "อุ่นหม้อหนาไฟกลางค่อนแรง ใส่น้ำมันงาที่เหลือ 15 มล.กับเนื้อทั้งหมด ผัดประมาณ 3 นาทีจนผิวเป็นสีน้ำตาล ใส่สาหร่ายแช่ทั้งหมดและกระเทียมสับ 15 กรัม ผัดอีก 4 นาทีจนเขียวเข้มเงา ใช้น้ำมันงาครบแล้ว: 5 มล.คลุกเนื้อและ 15 มล.ในหม้อ"
  ));
  body(recipe, 3, ml(
    "Pour in all 1.6 L water and scrape the browned base. Bring to a boil, allowing about 4 minutes depending on pot and burner, skim grey foam, then lower to a gentle simmer and cover slightly ajar. Keep the simmer quiet so the broth stays clear.",
    "倒入全部 1.6 公升水並刮起焦香鍋底。約煮 4 分鐘至沸騰（時間視鍋具與爐火而異），撈除灰沫，轉小滾、鍋蓋留縫。維持輕柔沸騰，讓湯汁清澈。",
    "水1.6L全量を加えて鍋底をこそげます。鍋や火力により異なりますが約4分で沸騰させ、灰色の泡を取り、静かな煮立ちにしてふたを少しずらします。穏やかに煮て汁を澄ませます。",
    "물 1.6L 전량을 붓고 바닥을 긁는다. 냄비와 화력에 따라 다르지만 약 4분 끓여 거품을 걷고 약하게 끓이며 뚜껑을 살짝 연다. 국물이 맑도록 잔잔한 끓음을 유지한다.",
    "เติมน้ำทั้งหมด 1.6 ลิตร ขูดก้นหม้อ เผื่อเวลาประมาณ 4 นาทีให้น้ำเดือด ทั้งนี้ขึ้นกับหม้อและเตา ช้อนฟองเทา ลดเป็นเดือดอ่อนและปิดฝาแง้ม รักษาไฟเบาให้น้ำซุปใส"
  ));
  body(recipe, 4, ml(
    "Simmer about 25 minutes until the brisket is tender and the seaweed silky; this is a texture estimate, not the meat-safety check. Near the end, measure the centre of several beef strips, including the thickest. Because these are slices from whole-muscle beef rather than ground meat, the FoodSafety.gov endpoint is 63°C (145°F) followed by a 3-minute rest. If any tested piece is below temperature, keep simmering and recheck.",
    "小滾約 25 分鐘至牛肉柔軟、海帶滑嫩；這是口感估時，不是肉類安全檢查。接近完成時測量數片牛肉中心，包括最厚片。這是整塊牛肉切片、不是絞肉，FoodSafety.gov 標準為 63°C（145°F）後靜置 3 分鐘。若任一測量低於標準，繼續小滾並複測。",
    "約25分、ブリスケットが柔らかくわかめがなめらかになるまで煮ます。これは食感の目安で、安全確認そのものではありません。終盤に最も厚いものを含む数枚の中心温度を測ります。ひき肉ではなく牛肉塊から切った肉なので、FoodSafety.govの基準は63°C（145°F）に達してから3分休ませることです。未達の肉片があれば煮続けて再測定します。",
    "약 25분 끓여 양지가 부드럽고 미역이 매끄러워질 때까지 익힌다. 이는 식감 예상 시간이지 고기 안전 확인이 아니다. 거의 다 익으면 가장 두꺼운 것을 포함해 여러 소고기 조각의 중심을 잰다. 다진 고기가 아닌 통근육을 썬 고기이므로 FoodSafety.gov 기준은 63°C (145°F)에 도달한 뒤 3분 휴지다. 측정한 조각이 기준보다 낮으면 더 끓이고 다시 잰다.",
    "เคี่ยวประมาณ 25 นาทีจนเนื้อหน้าอกนุ่มและสาหร่ายลื่นนุ่ม เวลานี้เป็นค่าประมาณเนื้อสัมผัส ไม่ใช่การตรวจความปลอดภัยของเนื้อ ช่วงท้ายวัดกลางเนื้อหลายชิ้นรวมชิ้นหนาสุด เนื้อเป็นชิ้นจากกล้ามเนื้อเต็มไม่ใช่เนื้อบด ตาม FoodSafety.gov ให้ถึง 63°C (145°F) แล้วพัก 3 นาที หากชิ้นที่ตรวจยังต่ำกว่าให้เคี่ยวต่อแล้ววัดซ้ำ"
  ));
  body(recipe, 5, ml(
    "Stir in the remaining 20 ml soup soy sauce and taste; add up to the listed 5 g salt only if needed. Simmer 1 minute, then turn off the heat, cover, and rest the soup for 3 minutes to complete the whole-cut beef rest. Divide into four bowls, each with about 62.5 g raw-beef equivalent and 7.5 g dried-seaweed equivalent, plus an equal share of broth.",
    "加入剩餘 20 毫升湯醬油試味，只在需要時加入所列最多 5 公克鹽。再煮 1 分鐘後關火加蓋靜置 3 分鐘，完成整塊牛肉的靜置時間。平均分四碗，每碗約含生牛肉等量 62.5 公克、乾海帶等量 7.5 公克與等量湯汁。",
    "残りの薄口しょうゆ20mlを加えて味見し、必要な場合のみ表示した塩5gまで加えます。1分煮て火を止め、ふたをして3分休ませ、塊肉の休ませ時間を取ります。4杯に均等に分け、各杯に生の牛肉換算約62.5g、乾燥わかめ換算7.5g、同量の汁を入れます。",
    "남은 국간장 20ml를 넣어 맛보고 필요할 때만 표시된 소금 최대 5g을 넣는다. 1분 끓인 뒤 불을 끄고 덮어 3분 쉬어 통고기 휴지 시간을 채운다. 네 그릇에 나누며 한 그릇마다 생고기 기준 약 62.5g, 마른 미역 기준 7.5g과 국물을 똑같이 담는다.",
    "เติมซีอิ๊วซุปที่เหลือ 20 มล. ชิม แล้วเติมเกลือที่ระบุไม่เกิน 5 กรัมเฉพาะเมื่อจำเป็น ต้ม 1 นาที ปิดไฟ ปิดฝาพักซุป 3 นาทีให้ครบเวลาพักเนื้อเต็มชิ้น แบ่งสี่ชามเท่ากัน แต่ละชามเทียบเท่าเนื้อดิบประมาณ 62.5 กรัม สาหร่ายแห้ง 7.5 กรัม และน้ำซุปเท่ากัน"
  ));
  recipe.substitutions[0] = ml(
    "Use boneless beef chuck at the same weight, sliced 4 mm across the grain. Keep the same tenderness estimate; as a whole-muscle cut it also uses the 63°C (145°F) endpoint plus a 3-minute rest.",
    "可用等重無骨牛肩肉逆紋切 4 毫米替代，柔軟度估時相同；整塊牛肉切片同樣採 63°C（145°F）並靜置 3 分鐘。",
    "同量の骨なし牛肩肉を繊維を断って4mmに切って使えます。柔らかさの目安は同じで、塊肉からの切り身なので63°C（145°F）到達後3分休ませます。",
    "같은 무게의 뼈 없는 소고기 척을 결 반대로 4mm로 썰어 쓴다. 부드러움 예상 시간은 같고, 통근육 조각이므로 63°C (145°F) 도달 후 3분 쉰다.",
    "ใช้เนื้อหัวไหล่วัวไร้กระดูกน้ำหนักเท่ากัน หั่นขวางเส้น 4 มม. ใช้เวลาความนุ่มประมาณเดิมและใช้เกณฑ์เนื้อเต็มชิ้น 63°C (145°F) พร้อมพัก 3 นาที"
  );
  recipe.substitutions[1] = ml(
    "For a beef-free soup, use 250 g shiitake and 1.6 L kelp stock; omit the meat thermometer endpoint and simmer the mushrooms about 15 minutes until tender.",
    "無牛版本用 250 公克香菇與 1.6 公升昆布高湯；省略肉類溫度標準，香菇煮約 15 分鐘至柔軟。",
    "牛肉なしならしいたけ250gと昆布だし1.6Lを使い、肉の温度確認は省き、きのこを柔らかくなるまで約15分煮ます。",
    "소고기 없이 만들려면 표고버섯 250g과 다시마 육수 1.6L를 쓰고 고기 온도 확인은 생략하며 버섯이 부드러워질 때까지 약 15분 끓인다.",
    "หากทำแบบไม่มีเนื้อ ใช้เห็ดหอม 250 กรัมกับน้ำซุปคอมบุ 1.6 ลิตร งดเกณฑ์อุณหภูมิเนื้อและต้มเห็ดประมาณ 15 นาทีจนนุ่ม"
  );
  recipe.storage = ml(
    "Cool the soup in shallow containers and refrigerate within 2 hours at 4°C/40°F or below. Three days is a texture preference; FoodSafety.gov lists refrigerated soups and stews at 3–4 days. Reheat only the portion needed to 74°C/165°F throughout; avoid repeatedly reheating the whole pot.",
    "湯分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。建議 3 天內食用是口感偏好；FoodSafety.gov 對冷藏湯與燉菜列為 3–4 天。只取要吃的份量復熱至中心各處達 74°C/165°F，避免整鍋反覆復熱。",
    "スープは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。3日以内は食感上のおすすめで、FoodSafety.govは冷蔵スープとシチューを3〜4日としています。食べる分だけ全体が74°C/165°Fになるまで再加熱し、鍋全体を何度も温め直さないでください。",
    "국은 얕은 용기에 나누어 2시간 안에 4°C/40°F 이하로 냉장한다. 3일은 식감을 위한 권장 기간이고 FoodSafety.gov는 냉장 수프와 스튜를 3–4일로 안내한다. 먹을 만큼만 전체가 74°C/165°F가 되도록 재가열하고 냄비 전체를 반복해 데우지 않는다.",
    "แบ่งซุปใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า 3 วันเป็นคำแนะนำด้านเนื้อสัมผัส ส่วน FoodSafety.gov ระบุซุปและสตูแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C/165°F หลีกเลี่ยงการอุ่นทั้งหม้อซ้ำหลายรอบ"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

export function refineSixtyThirdMethods(recipes) {
  const targets = ["chana-masala", "red-curry-pork", "blanquette-de-veau", "miyeok-guk"];
  const revisions = [reviseChanaMasala, reviseRedCurryPork, reviseBlanquette, reviseMiyeokGuk];
  targets.forEach((id, index) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex < 0) throw new Error("Recipe method audit 63: missing recipe " + id);
    const revised = cloneForPublication(recipes[recipeIndex]);
    revisions[index](revised);
    recipes[recipeIndex] = revised;
  });
  return recipes;
}
