const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({
      ...row,
      amount: typeof row.amount === "object" ? { ...row.amount } : row.amount,
      item: typeof row.item === "object" ? { ...row.item } : row.item
    })),
    instructions: recipe.instructions.map((step) => ({
      ...step,
      title: { ...step.title },
      body: { ...step.body }
    })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function setBody(recipe, index, body) {
  recipe.instructions[index].body = body;
}

function addOfficial(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: "Official food-safety guidance — " + title, url });
  }
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";

function reviseMassaman(recipe) {
  recipe.cookMinutes = 165;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  setBody(recipe, 4, ml(
    "Add the remaining 600 ml coconut milk, 500 ml stock, toasted spices, and bay leaves. Bring just to a gentle simmer, cover slightly ajar, and start a 75-minute estimate once small bubbles return. Keep the braise gently bubbling, not rolling; add a little hot water only if the beef becomes exposed.",
    "加入其餘 600 毫升椰奶、500 毫升高湯、烤香香料與月桂葉。只煮至輕微沸騰，鍋蓋留縫，待小泡重新出現後開始計約 75 分鐘。保持小滾而非大沸；只有牛肉露出液面時才補少量熱水。",
    "残りのココナッツミルク600ml、スープ500ml、炒ったスパイス、ローリエを加えます。静かな煮立ちまで温め、ふたを少しずらします。小さな泡が戻ってから75分を目安に煮込みます。強く沸騰させず、牛肉が液面から出る場合だけ熱湯を少量足します。",
    "남은 코코넛밀크 600ml, 육수 500ml, 볶은 향신료와 월계수잎을 넣는다. 약하게 끓기 시작하면 뚜껑을 살짝 열어 두고 작은 기포가 다시 생긴 뒤부터 약 75분 끓인다. 세게 끓이지 말고, 소고기가 잠기지 않을 때만 뜨거운 물을 조금 보충한다.",
    "เติมกะทิที่เหลือ 600 มล. น้ำสต๊อก 500 มล. เครื่องเทศที่คั่วไว้ และใบกระวาน ตั้งจนเริ่มเดือดเบา ๆ ปิดฝาแง้มไว้ แล้วเริ่มจับเวลาประมาณ 75 นาทีเมื่อมีฟองเล็ก ๆ กลับมา เคี่ยวเบา ๆ ไม่ให้เดือดแรง เติมน้ำร้อนเล็กน้อยเฉพาะเมื่อเนื้อโผล่พ้นน้ำ"
  ));
  setBody(recipe, 5, ml(
    "Add the potatoes, onions, and peanuts, pushing them below the liquid. Return to a gentle simmer and cook an estimated 35–45 minutes. Check a potato with a knife and a beef cube with a fork: the potato should be easily pierced and the beef should yield without falling apart. These are texture checks, not thermometer readings.",
    "加入馬鈴薯、洋蔥與花生，壓入液面下。恢復小滾後再煮約 35–45 分鐘。用刀測馬鈴薯、用叉子測牛肉塊：馬鈴薯應可輕易刺穿，牛肉應柔軟但不散碎。這些是口感判斷，不是溫度讀數。",
    "じゃがいも、玉ねぎ、ピーナッツを加え、液面下に沈めます。静かな煮立ちに戻して35〜45分を目安に煮ます。じゃがいもにはナイフ、牛肉にはフォークを刺して確認します。じゃがいもは簡単に刺さり、牛肉は崩れずにほぐれる柔らかさが目安です。これは食感の確認で、温度測定ではありません。",
    "감자, 양파, 땅콩을 넣고 국물 아래로 눌러 담는다. 약한 끓음으로 돌아오면 약 35–45분 더 익힌다. 감자는 칼로, 소고기는 포크로 확인한다. 감자는 쉽게 찔리고 소고기는 부서지지 않으면서 부드럽게 들어가야 한다. 이는 식감 확인이지 온도 측정이 아니다.",
    "ใส่มันฝรั่ง หอมหัวใหญ่ และถั่วลิสง กดให้จมในน้ำ เคี่ยวเบา ๆ ต่อประมาณ 35–45 นาที ใช้มีดทดสอบมันฝรั่งและใช้ส้อมทดสอบเนื้อ มันฝรั่งควรแทงผ่านง่าย ส่วนเนื้อควรนุ่มแต่ยังไม่แตกยุ่ย นี่เป็นการเช็กเนื้อสัมผัส ไม่ใช่การวัดอุณหภูมิ"
  ));
  setBody(recipe, 6, ml(
    "The chuck is cut into 4 cm cubes, not ground. Keep the pot at a steady simmer through the full braise; the 75-minute first stage and 35–45 minutes after adding vegetables are estimates, not safety endpoints. Ground meat's 71°C (160°F) rule does not apply to these beef cubes. Fork tenderness is a quality cue; if they remain chewy, continue in 10–15-minute increments and add each interval to the elapsed cook time.",
    "這裡使用切成 4 公分塊的牛肩肉，不是絞肉。整段燉煮期間保持穩定小滾；先燉 75 分鐘、加入蔬菜後再燉 35–45 分鐘都是估時，不是安全熟度標準。絞肉的 71°C（160°F）標準不適用於這些牛肉塊。叉子能否插入是口感指標；若仍韌，每次續燉 10–15 分鐘，並把延長時間加進總烹煮時間。",
    "4cm角に切った牛肩肉を使い、ひき肉は使いません。煮込み中は安定した弱い沸騰を保ちます。最初の75分、野菜を加えた後の35〜45分は目安で、安全基準の時間ではありません。ひき肉の71°C（160°F）基準をこの牛肉の塊に当てはめません。フォークでほぐれるかは食感の目安です。まだ硬ければ10〜15分ずつ煮込み、延長分を調理時間に加えます。",
    "4cm 크기로 자른 소고기 덩어리를 사용하며 다짐육이 아니다. 전체 조림 동안 일정하게 약하게 끓인다. 처음 75분과 채소를 넣은 뒤 35–45분은 예상 시간이지 안전 기준이 아니다. 다짐육의 71°C (160°F) 기준을 이 소고기 덩어리에 적용하지 않는다. 포크가 부드럽게 들어가는지는 식감 기준이다. 질기면 10–15분씩 더 끓이고 추가 시간을 조리 시간에 더한다.",
    "ใช้เนื้อวัวส่วนหัวไหล่หั่นเต๋า 4 ซม. ไม่ใช่เนื้อบด รักษาการเคี่ยวให้สม่ำเสมอตลอด ช่วงแรก 75 นาทีและอีก 35–45 นาทีหลังใส่ผักเป็นเวลาโดยประมาณ ไม่ใช่เกณฑ์ความปลอดภัย เกณฑ์ 71°C (160°F) สำหรับเนื้อบดไม่ใช้กับเนื้อวัวชิ้นเหล่านี้ ใช้ส้อมตรวจความนุ่มเพื่อคุณภาพ หากยังเหนียวให้เคี่ยวต่อครั้งละ 10–15 นาทีและบวกเวลานั้นในเวลารวม"
  ));
  setBody(recipe, 7, ml(
    "Stir in all 60 ml tamarind paste, 60 ml fish sauce, and 70 g palm sugar. Simmer uncovered for about 10 minutes, stirring twice, until the sauce lightly coats a spoon. Taste, then add up to the extra 15 ml fish sauce only if needed; this seasoning time is an estimate.",
    "加入全部 60 毫升羅望子醬、60 毫升魚露與 70 公克棕櫚糖。開蓋小滾約 10 分鐘，中途攪拌兩次，至醬汁薄薄附著湯匙。先試味，只有需要時才加最多 15 毫升額外魚露；這段調味時間是估計值。",
    "タマリンドペースト60ml、ナンプラー60ml、パームシュガー70gをすべて加えます。ふたをせず約10分煮て、途中で2回混ぜ、ソースがスプーンに薄く絡むまで煮詰めます。味見し、必要な場合だけ追加のナンプラーを最大15ml加えます。この時間は目安です。",
    "타마린드 페이스트 60ml, 피시소스 60ml, 팜슈거 70g을 모두 넣는다. 뚜껑을 열고 약 10분 끓이며 두 번 저어 소스가 숟가락에 얇게 묻게 한다. 맛을 본 뒤 필요할 때만 추가 피시소스를 최대 15ml 넣는다. 이 시간은 예상치다.",
    "ใส่มะขามเปียก 60 มล. น้ำปลา 60 มล. และน้ำตาลโตนด 70 กรัมทั้งหมด เคี่ยวเปิดฝาประมาณ 10 นาที คนสองครั้งจนซอสเคลือบช้อนบาง ๆ ชิมก่อน แล้วเติมน้ำปลาเพิ่มได้ไม่เกิน 15 มล.เฉพาะเมื่อจำเป็น เวลานี้เป็นเพียงประมาณการ"
  ));
  setBody(recipe, 9, ml(
    "Divide all the curry equally among six bowls. The listed 600 g cooked jasmine rice provides 100 g per bowl; give each bowl one-sixth of the beef, potatoes, onions, peanuts, and sauce. The finished beef yield varies after braising, so divide the cooked pieces evenly rather than promising a fixed cooked weight.",
    "將全部咖哩平均分成六碗。所列 600 公克熟茉莉香米每碗分 100 公克；每碗分得六分之一的牛肉、馬鈴薯、洋蔥、花生與醬汁。牛肉燉後重量會變化，因此平均分配熟牛肉塊，不保證固定熟重。",
    "カレー全量を6つの器に等分します。表示の炊いたジャスミンライス600gは1杯100gです。牛肉、じゃがいも、玉ねぎ、ピーナッツ、ソースも各器に6分の1ずつ分けます。煮込み後の肉の重量は変わるため、調理済みの塊を均等に分け、固定の重量は約束しません。",
    "카레 전체를 여섯 그릇에 고르게 나눈다. 표시된 밥 600g은 그릇당 100g이다. 소고기, 감자, 양파, 땅콩과 소스도 각 그릇에 6분의 1씩 나눈다. 조린 뒤 고기 무게는 달라지므로 익힌 고기 덩어리를 고르게 나누고 고정된 익힌 중량을 약속하지 않는다.",
    "แบ่งแกงทั้งหมดเท่า ๆ กันใน 6 ชาม ข้าวหอมมะลิสุก 600 กรัมที่ระบุให้ชามละ 100 กรัม แบ่งเนื้อ มันฝรั่ง หอมหัวใหญ่ ถั่วลิสง และซอสให้เท่ากันชามละหนึ่งในหก น้ำหนักเนื้อหลังตุ๋นเปลี่ยนได้ จึงแบ่งชิ้นที่สุกแล้วให้เท่ากันโดยไม่ระบุน้ำหนักสุกตายตัว"
  ));
  recipe.storage = ml(
    "Cool the curry in shallow containers and refrigerate within 2 hours at or below 4°C (40°F). Use within 3 days for best texture; that shorter period is a quality preference, while FoodSafety.gov lists cooked meat leftovers at 3–4 days. Reheat only the portion needed to 74°C (165°F) throughout, stirring the sauce so it heats evenly. The 74°C value is for reheating leftovers, not the braised beef's tenderness cue.",
    "將咖哩分裝於淺容器，2 小時內冷藏至 4°C（40°F）以下。為保持口感，建議 3 天內食用；較短期限是品質偏好，FoodSafety.gov 對熟肉剩菜列為 3–4 天。只取要吃的份量復熱至各處 74°C（165°F），並攪拌醬汁使受熱均勻。74°C 是剩菜復熱標準，不是燉牛肉柔嫩度指標。",
    "カレーは浅い容器に小分けし、2時間以内に4°C（40°F）以下で冷蔵します。食感を保つため3日以内の使用を勧めますが、これは品質上の目安です。FoodSafety.govの調理済み肉の残り物の冷蔵目安は3〜4日です。食べる分だけ取り分け、ソースを混ぜながら全体を74°C（165°F）まで再加熱します。74°Cは残り物の再加熱基準で、煮込んだ牛肉の柔らかさの目安ではありません。",
    "카레는 얕은 용기에 나눠 담아 2시간 이내에 4°C (40°F) 이하로 냉장한다. 식감을 위해 3일 이내 사용을 권하지만 이는 품질 선호다. FoodSafety.gov는 조리된 고기 남은 음식을 3–4일로 안내한다. 먹을 양만 덜어 소스를 저어 가며 전체가 74°C (165°F)가 되도록 재가열한다. 74°C는 남은 음식 재가열 기준이지 조림 소고기의 부드러움 기준이 아니다.",
    "แบ่งแกงใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่อุณหภูมิไม่เกิน 4°C (40°F) เพื่อรักษาเนื้อสัมผัสให้ใช้ภายใน 3 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุอาหารเนื้อสัตว์ปรุงสุกแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F) โดยคนซอสให้ร้อนเสมอกัน ค่า 74°C ใช้กับการอุ่นอาหารเหลือ ไม่ใช่เกณฑ์ความนุ่มของเนื้อตุ๋น"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseMulNaengmyeon(recipe) {
  setBody(recipe, 2, ml(
    "Simmer the brisket gently for an estimated 60–75 minutes, turning once. Check the centre of the thickest part with a clean thermometer: intact beef roasts use 63°C (145°F) followed by a 3-minute rest. After that safety check, continue simmering if needed until a skewer enters with light resistance; tenderness is a separate quality cue. Do not use the 71°C ground-meat value for this whole brisket.",
    "以小火將牛胸肉燉約 60–75 分鐘，中途翻面一次。用乾淨溫度計測最厚處中心：完整牛肉烤肉塊的標準為 63°C（145°F），並靜置 3 分鐘。達到安全標準後，若需要可繼續燉至竹籤輕易插入；柔嫩度是另一項口感指標。整塊牛胸肉不使用絞肉的 71°C 標準。",
    "ブリスケットを静かに60〜75分煮込み、途中で一度返します。清潔な温度計で最も厚い部分の中心を測ります。塊のままの牛肉ローストは63°C（145°F）に達した後、3分休ませます。安全基準を満たした後も必要なら串が軽く通るまで煮込み、柔らかさは別の品質目安として確認します。このブリスケットにひき肉の71°C基準は使いません。",
    "양지머리를 약하게 약 60–75분 끓이고 중간에 한 번 뒤집는다. 깨끗한 온도계로 가장 두꺼운 부분의 중심을 잰다. 통째로 조리하는 소고기 로스트는 63°C (145°F)에 도달한 뒤 3분 쉰다. 안전 기준을 충족한 뒤에도 필요하면 꼬챙이가 가볍게 들어갈 때까지 끓인다. 부드러움은 별도의 품질 기준이며, 이 양지머리에 다짐육의 71°C 기준을 적용하지 않는다.",
    "เคี่ยวเนื้ออกวัวเบา ๆ ประมาณ 60–75 นาที พลิกหนึ่งครั้ง ใช้เทอร์โมมิเตอร์สะอาดวัดกลางส่วนที่หนาที่สุด เนื้อวัวที่ปรุงเป็นชิ้นใหญ่ใช้ 63°C (145°F) แล้วพัก 3 นาที หลังผ่านเกณฑ์ความปลอดภัยแล้ว หากยังต้องการให้นุ่มให้เคี่ยวต่อจนไม้เสียบผ่านได้ง่าย ความนุ่มเป็นเกณฑ์คุณภาพแยกต่างหาก ไม่ใช้ค่า 71°C ของเนื้อบดกับเนื้ออกชิ้นนี้"
  ));
  setBody(recipe, 4, ml(
    "Set the metal bowl in an ice-water bath using the listed 800 g ice. Stir and cool the broth promptly; if the bowl is deep, divide the broth between shallow metal containers. Chill it to 4°C (40°F) or colder before the covered 3-hour seasoning chill. Do not leave the broth on the counter during this wait.",
    "將金屬碗放入冰水浴，使用所列 800 公克冰塊。攪拌並儘快降溫；若碗太深，將湯分入淺金屬容器。加蓋冷藏至 4°C（40°F）以下後，再進行 3 小時調味冷藏。等待期間不可把湯留在室溫。",
    "表示の氷800gを使った氷水浴に金属ボウルを置き、混ぜながら速やかに冷まします。ボウルが深い場合は浅い金属容器に分けます。ふたをして味をなじませる3時間の冷蔵前に、4°C（40°F）以下まで冷やします。この間、室温に置かないでください。",
    "표시된 얼음 800g을 사용해 금속 그릇을 얼음물에 담그고 저어 빠르게 식힌다. 그릇이 깊으면 얕은 금속 용기에 나눠 담는다. 뚜껑을 덮어 3시간 맛을 들이기 전에 4°C (40°F) 이하로 냉장한다. 기다리는 동안 실온에 두지 않는다.",
    "วางชามโลหะในอ่างน้ำแข็งโดยใช้น้ำแข็ง 800 กรัมตามที่ระบุ คนและทำให้น้ำซุปเย็นเร็ว หากชามลึกให้แบ่งใส่ภาชนะโลหะตื้น แช่เย็นจนไม่เกิน 4°C (40°F) ก่อนพักปรุงรสในตู้เย็น 3 ชั่วโมง ห้ามวางน้ำซุปไว้ที่อุณหภูมิห้องระหว่างรอ"
  ));
  setBody(recipe, 6, ml(
    "Once cold, slice the entire cooked brisket 2 mm across the grain. Divide all the slices evenly among four bowls; the cooked yield varies, so remove the former 60 g-per-bowl estimate. Keep the covered slices at 4°C (40°F) or colder until serving.",
    "牛肉冷卻後，逆紋切成 2 毫米薄片。將整份熟牛肉平均分配到四碗；熟重會有差異，因此不再固定為每碗 60 公克。上桌前加蓋冷藏於 4°C（40°F）以下。",
    "冷えたら、煮たブリスケット全量を繊維に逆らって2mmに薄切りします。調理後の重量は変わるため、以前の1杯60gという固定目安をやめ、全量を4杯に等分します。提供までふたをして4°C（40°F）以下で冷やします。",
    "식힌 양지머리 전체를 결 반대로 2mm 두께로 썬다. 조리 후 무게는 달라지므로 그릇당 60g이라는 고정량 대신 모든 고기를 네 그릇에 고르게 나눈다. 먹기 전까지 덮어 4°C (40°F) 이하로 냉장한다.",
    "เมื่อเนื้อเย็นแล้วหั่นเนื้ออกวัวที่สุกทั้งหมดขวางเส้นใยหนา 2 มม. น้ำหนักหลังสุกแปรผัน จึงเลิกกำหนดตายตัวที่ชามละ 60 กรัม และแบ่งเนื้อทั้งหมดเท่า ๆ กันใน 4 ชาม ปิดฝาแช่เย็นไม่เกิน 4°C (40°F) จนกว่าจะเสิร์ฟ"
  ));
  setBody(recipe, 7, ml(
    "Lower the two eggs into boiling water and cook for about 10 minutes, then cool in ice water for 5 minutes. Check that both whites and yolks are firm; the 10-minute time is an estimate and a 74°C thermometer reading is not the safety check for a hard-cooked shell egg. Peel, halve, and refrigerate promptly.",
    "將兩顆蛋放入沸水煮約 10 分鐘，再以冰水冷卻 5 分鐘。確認蛋白與蛋黃都已凝固；10 分鐘是估計時間，帶殼全熟蛋不以 74°C 溫度讀數作安全判定。剝殼、對切並儘快冷藏。",
    "卵2個を沸騰した湯に入れて約10分ゆで、氷水で5分冷やします。白身と黄身がどちらも固まっていることを確認します。10分は目安で、殻付きの固ゆで卵を74°Cの温度測定で判定しません。殻をむき、半分に切り、すぐ冷蔵します。",
    "달걀 두 개를 끓는 물에 넣고 약 10분 삶은 뒤 얼음물에서 5분 식힌다. 흰자와 노른자가 모두 단단히 익었는지 확인한다. 10분은 예상 시간이며 껍질째 완숙한 달걀의 안전을 74°C 온도 측정으로 판단하지 않는다. 껍질을 벗겨 반으로 자르고 바로 냉장한다.",
    "ต้มไข่ 2 ฟองในน้ำเดือดประมาณ 10 นาที แล้วแช่น้ำแข็ง 5 นาที ตรวจให้ไข่ขาวและไข่แดงสุกแข็ง เวลา 10 นาทีเป็นค่าประมาณ และไม่ใช้การวัด 74°C เป็นเกณฑ์ความปลอดภัยของไข่ต้มทั้งเปลือก ปอก ผ่าครึ่ง และแช่เย็นทันที"
  ));
  setBody(recipe, 9, ml(
    "Keep all cold garnishes, beef, and eggs covered at 4°C (40°F) or colder. Mix the 20 g mustard with the remaining 20 ml rice vinegar just before serving. Divide the listed 200 g cucumber and 200 g pear as 50 g each per bowl; the 100 g pickled radish is 25 g per bowl, and each bowl gets half an egg.",
    "所有冷配料、牛肉與雞蛋都加蓋冷藏於 4°C（40°F）以下。上桌前才將 20 公克芥末與剩餘 20 毫升米醋拌勻。所列 200 公克小黃瓜和 200 公克梨各分成每碗 50 公克；100 公克醃蘿蔔每碗 25 公克，每碗再放半顆蛋。",
    "冷たい具材、牛肉、卵はすべてふたをして4°C（40°F）以下で保管します。提供直前にマスタード20gと残りの米酢20mlを混ぜます。きゅうり200gと梨200gは各杯50g、漬け大根100gは各杯25gに分け、卵は半分ずつ添えます。",
    "차가운 고명, 소고기, 달걀은 모두 덮어 4°C (40°F) 이하로 보관한다. 내기 직전에 겨자 20g과 남은 쌀식초 20ml를 섞는다. 오이 200g과 배 200g은 그릇마다 각각 50g, 절인 무 100g은 그릇마다 25g씩 나누고 달걀은 반 개씩 올린다.",
    "ปิดฝาแช่เครื่องเคียงเย็น เนื้อ และไข่ทั้งหมดที่ไม่เกิน 4°C (40°F) ผสมมัสตาร์ด 20 กรัมกับน้ำส้มสายชูข้าว 20 มล.ที่เหลือก่อนเสิร์ฟ แตงกวา 200 กรัมและลูกแพร์ 200 กรัมแบ่งอย่างละ 50 กรัมต่อชาม หัวไชเท้าดอง 100 กรัมแบ่งชามละ 25 กรัม และใส่ไข่ครึ่งฟองต่อชาม"
  ));
  setBody(recipe, 12, ml(
    "Divide the cold noodles among four chilled bowls and pour 400 ml cold broth into each. Top each bowl with one-quarter of the cooked brisket, 50 g cucumber, 50 g pear, 25 g pickled radish, and half an egg. Serve the mustard vinegar separately and eat promptly while all components remain cold.",
    "將冷麵分入四個冰鎮碗，每碗倒入 400 毫升冷湯。每碗放四分之一熟牛肉、50 公克小黃瓜、50 公克梨、25 公克醃蘿蔔與半顆蛋。芥末醋另放，上桌後儘快食用並保持配料冰涼。",
    "冷やした麺を4つの器に分け、冷たいスープを各400ml注ぎます。各器に煮たブリスケットの4分の1、きゅうり50g、梨50g、漬け大根25g、卵半分をのせます。マスタード酢は別添えにし、すべて冷たい状態のうちに早めに食べます。",
    "차갑게 식힌 면을 네 그릇에 나누고 차가운 육수를 그릇마다 400ml씩 붓는다. 각 그릇에 익힌 양지머리의 4분의 1, 오이 50g, 배 50g, 절인 무 25g, 달걀 반 개를 올린다. 겨자 식초는 따로 내고 재료가 차가울 때 바로 먹는다.",
    "แบ่งเส้นเย็นในชามแช่เย็น 4 ใบ เติมน้ำซุปเย็นชามละ 400 มล. ใส่เนื้อที่สุกแล้วหนึ่งในสี่ แตงกวา 50 กรัม ลูกแพร์ 50 กรัม หัวไชเท้าดอง 25 กรัม และไข่ครึ่งฟองต่อชาม เสิร์ฟน้ำส้มมัสตาร์ดแยกและกินทันทีขณะที่ทุกอย่างยังเย็น"
  ));
  recipe.storage = ml(
    "Keep broth, cooked beef, hard-cooked eggs, washed garnishes, and noodles in separate covered containers at or below 4°C (40°F). Use this cold-noodle set within 2 days for best texture; that is a quality preference, while FoodSafety.gov lists refrigerated cooked meat and soup for 3–4 days and FDA lists hard-cooked eggs for 1 week. Serve cold; no reheating is needed. If a cooked component is reheated for another use, leftovers should reach 74°C (165°F), then be cooled promptly before returning to this cold dish.",
    "將湯、熟牛肉、全熟蛋、洗好的配料與麵分開加蓋，冷藏於 4°C（40°F）以下。為保持冷麵口感，建議 2 天內食用；這是品質偏好，FoodSafety.gov 對熟肉與湯品列為 3–4 天，FDA 對全熟蛋列為 1 週。此冷麵直接冷食，不需復熱。若熟食另作熱食復熱，剩菜應達 74°C（165°F），再儘快冷卻後才放回這道冷食。",
    "スープ、調理済み牛肉、固ゆで卵、洗った具材、麺は別々のふた付き容器に入れ、4°C（40°F）以下で保管します。冷麺の食感のため2日以内を勧めますが、これは品質上の目安です。FoodSafety.govは調理済み肉とスープを3〜4日、FDAは固ゆで卵を1週間としています。この料理は冷たいまま食べ、再加熱は不要です。別の用途で加熱する場合は残り物を74°C（165°F）まで再加熱し、この冷菜に戻す前に速やかに冷やします。",
    "육수, 익힌 소고기, 완숙 달걀, 씻은 고명과 면은 덮어 4°C (40°F) 이하에서 따로 보관한다. 냉면 식감을 위해 2일 이내 사용을 권하지만 이는 품질 선호다. FoodSafety.gov는 익힌 고기와 수프를 3–4일, FDA는 완숙 달걀을 1주로 안내한다. 이 요리는 차갑게 먹으므로 재가열하지 않는다. 다른 용도로 익힌 재료를 데울 때는 남은 음식을 74°C (165°F)까지 재가열한 뒤 이 냉면에 넣기 전에 빠르게 식힌다.",
    "แยกน้ำซุป เนื้อสุก ไข่ต้ม เครื่องเคียงที่ล้างแล้ว และเส้นในภาชนะปิดที่ไม่เกิน 4°C (40°F) เพื่อรักษาเนื้อสัมผัสของเมนูเย็นให้ใช้ภายใน 2 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุเนื้อสุกและซุปแช่เย็น 3–4 วัน และ FDA ระบุไข่ต้ม 1 สัปดาห์ เมนูนี้เสิร์ฟเย็น ไม่ต้องอุ่น หากอุ่นส่วนประกอบสุกเพื่อใช้อย่างอื่น อาหารเหลือต้องถึง 74°C (165°F) แล้วทำให้เย็นเร็วก่อนนำกลับมาใช้ในเมนูเย็นนี้"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: What You Need to Know About Egg Safety", eggSafety);
}

function reviseKhaoSoi(recipe) {
  recipe.cookMinutes = 90;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  setBody(recipe, 0, ml(
    "Keep the six chicken drumsticks refrigerated at or below 4°C (40°F) while setting up the curry. Pat dry immediately before cooking and make one 1 cm-deep slash on the thickest side of each; use a separate raw-chicken board and wash hands and tools before handling garnishes. Do not leave the chicken out to temper.",
    "備料時將六支雞小腿保持冷藏於 4°C（40°F）以下。烹煮前才擦乾，在每支最厚處劃一道約 1 公分深的刀口；生雞肉使用專用砧板，接觸配料前洗手並清潔器具。不要把雞肉留在室溫回溫。",
    "カレーの準備中、鶏ドラムスティック6本は4°C（40°F）以下で冷蔵しておきます。調理直前に水気を拭き、各本の最も厚い側に深さ約1cmの切り込みを入れます。生鶏肉用のまな板を分け、具材に触れる前に手と器具を洗います。室温に置いて戻しません。",
    "카레를 준비하는 동안 닭다리 6개는 4°C (40°F) 이하로 냉장 보관한다. 조리 직전에 물기를 닦고 가장 두꺼운 쪽에 깊이 1cm 칼집을 하나 낸다. 생닭 전용 도마를 사용하고 고명을 만지기 전에 손과 도구를 씻는다. 실온에 꺼내 두지 않는다.",
    "ระหว่างเตรียมแกง เก็บน่องไก่ 6 ชิ้นในตู้เย็นที่ไม่เกิน 4°C (40°F) ซับให้แห้งก่อนปรุงและบั้งด้านที่หนาที่สุดชิ้นละหนึ่งรอยลึก 1 ซม. ใช้เขียงสำหรับไก่ดิบแยกต่างหาก ล้างมือและอุปกรณ์ก่อนจับเครื่องเคียง ไม่วางไก่ไว้ที่อุณหภูมิห้อง"
  ));
  setBody(recipe, 5, ml(
    "Partly cover and simmer gently for an estimated 35–45 minutes, turning once halfway. Measure the thickest drumstick in the deepest meat near, but not touching, the bone; all poultry must reach 74°C (165°F). The simmer time and easy fork entry describe tenderness, not the safety check. If below 74°C, continue in 2-minute increments and recheck.",
    "半掩鍋蓋小火燉約 35–45 分鐘，中途翻面一次。用溫度計測最厚雞小腿靠近骨頭但不碰骨的深層肉；禽肉都須達 74°C（165°F）。燉煮時間與叉子能否插入是柔嫩度線索，不是安全檢查。未達 74°C 時每次續煮 2 分鐘再測。",
    "ふたを少しずらして静かに35〜45分煮込み、途中で一度返します。最も太いドラムスティックの骨に触れない深い肉の部分を測定し、鶏肉はすべて74°C（165°F）に達させます。煮込み時間やフォークの通りやすさは柔らかさの目安で、安全確認の代わりではありません。74°C未満なら2分ずつ追加して測り直します。",
    "뚜껑을 살짝 열고 약 35–45분 부드럽게 끓이며 중간에 한 번 뒤집는다. 가장 두꺼운 닭다리의 뼈에 닿지 않는 깊은 살 부분을 재어 모든 가금류가 74°C (165°F)에 도달해야 한다. 끓이는 시간과 포크가 쉽게 들어가는 정도는 부드러움 기준이지 안전 확인이 아니다. 74°C보다 낮으면 2분씩 더 익혀 다시 잰다.",
    "ปิดฝาแง้มและเคี่ยวเบา ๆ ประมาณ 35–45 นาที พลิกหนึ่งครั้งครึ่งทาง วัดเนื้อส่วนลึกที่สุดของน่องชิ้นหนาสุดโดยไม่ให้หัววัดแตะกระดูก เนื้อสัตว์ปีกต้องถึง 74°C (165°F) เวลาเคี่ยวและการใช้ส้อมจิ้มง่ายเป็นเกณฑ์ความนุ่ม ไม่ใช่การยืนยันความปลอดภัย หากต่ำกว่า 74°C ให้ปรุงต่อครั้งละ 2 นาทีแล้ววัดซ้ำ"
  ));
  setBody(recipe, 9, ml(
    "Pat dry 180 g of the fresh noodles and fry in six loose 30 g nests, about 45–60 seconds each, turning once until puffed and golden. Drain on a rack; this range is a crispness estimate. Keep the remaining 720 g noodles refrigerated until boiling, then divide them into six 120 g portions.",
    "將 180 公克鮮麵擦乾，分成六份、每份 30 公克，鬆鬆放入油中，每份炸約 45–60 秒並翻面一次，至膨鬆金黃。放網架瀝油；時間是酥脆度估計。其餘 720 公克麵冷藏至下鍋，之後分成六份、每份 120 公克。",
    "生麺180gの水気を拭き、30gずつ6つのゆるい巣状にして、各45〜60秒を目安に一度返しながら膨らんで金色になるまで揚げます。網に上げ、時間は食感の目安とします。残り720gはゆでるまで冷蔵し、6等分して各120gにします。",
    "생면 180g의 물기를 닦고 30g씩 여섯 묶음으로 느슨하게 만들어 한 묶음당 약 45–60초씩 한 번 뒤집어 부풀고 노릇해질 때까지 튀긴다. 망에 올려 기름을 뺀다. 시간은 바삭함을 위한 예상치다. 남은 면 720g은 삶기 전까지 냉장하고 여섯 몫으로 나눠 각 120g씩 준비한다.",
    "ซับเส้นสด 180 กรัมให้แห้ง แบ่งเป็นรังหลวม ๆ 6 กอง กองละ 30 กรัม ทอดกองละประมาณ 45–60 วินาที พลิกหนึ่งครั้งจนพองและสีทอง พักบนตะแกรงให้สะเด็ดน้ำมัน ช่วงเวลานี้เป็นค่าประมาณเพื่อความกรอบ เก็บเส้นอีก 720 กรัมในตู้เย็นจนกว่าจะต้ม แล้วแบ่งหกส่วน ส่วนละ 120 กรัม"
  ));
  setBody(recipe, 10, ml(
    "Bring 4 L water to a full boil. Loosen and boil the remaining 720 g noodles in six 120 g batches for an estimated 60–90 seconds each, until just tender and springy. Drain each batch for about 20 seconds straight into a warm bowl; finish all six while the curry rests so the noodles do not clump.",
    "將 4 公升水煮至沸騰。把其餘 720 公克麵分成六批、每批 120 公克，逐批煮約 60–90 秒，至剛好柔韌。每批瀝約 20 秒後直接放入溫碗；趁咖哩靜置時完成六碗，避免麵條黏結。",
    "水4Lをしっかり沸騰させます。残り720gの麺を120gずつ6回に分け、各60〜90秒を目安に、ちょうど柔らかく弾力が出るまでゆでます。各回約20秒水を切って温めた器に直接入れます。カレーの休ませ時間中に6杯分を仕上げ、麺が固まらないようにします。",
    "물 4L를 팔팔 끓인다. 남은 면 720g을 120g씩 여섯 번 나눠 매회 약 60–90초 삶아 부드럽고 탄력 있게 익힌다. 매회 약 20초 물을 뺀 뒤 따뜻한 그릇에 바로 담는다. 카레를 쉬게 하는 동안 여섯 그릇을 모두 준비해 면이 뭉치지 않게 한다.",
    "ต้มน้ำ 4 ลิตรให้เดือดจัด แบ่งเส้นที่เหลือ 720 กรัมเป็น 6 รอบ รอบละ 120 กรัม ต้มรอบละประมาณ 60–90 วินาทีจนสุกนุ่มแต่ยังเด้ง สะเด็ดน้ำรอบละประมาณ 20 วินาทีแล้วใส่ชามอุ่นทันที ทำให้ครบหกชามระหว่างพักแกงเพื่อไม่ให้เส้นจับตัว"
  ));
  setBody(recipe, 12, ml(
    "Divide the boiled noodles and one drumstick among each of six bowls, then ladle the curry evenly over them. Top each with one 30 g crisp noodle nest. Divide the 240 g mustard greens as 40 g per bowl; serve the shallots, lime, and chile oil on the side so the crisp noodles stay crisp.",
    "六碗各放一份熟麵與一支雞小腿，再平均舀入咖哩。每碗放一份 30 公克炸脆麵巢。240 公克酸菜每碗分 40 公克；紅蔥頭、萊姆與辣椒油另外上桌，保持脆麵酥脆。",
    "6つの器にゆで麺とドラムスティックを1本ずつ入れ、カレーを等分して注ぎます。各器に揚げ麺の巣を30gずつのせます。高菜漬け240gは1杯40gずつに分けます。揚げ麺の食感を保つため、エシャロット、ライム、チリオイルは別添えにします。",
    "여섯 그릇마다 삶은 면 한 몫과 닭다리 하나를 담고 카레를 고르게 붓는다. 각 그릇에 튀긴 면 둥지 30g씩 올린다. 갓절임 240g은 그릇마다 40g씩 나눈다. 바삭한 면을 유지하도록 샬롯, 라임, 칠리 오일은 곁들여 낸다.",
    "ใส่เส้นต้มหนึ่งส่วนและน่องไก่หนึ่งชิ้นในแต่ละชามทั้งหก ตักแกงแบ่งเท่ากัน วางรังเส้นทอดกรอบชามละ 30 กรัม แบ่งผักกาดดอง 240 กรัมชามละ 40 กรัม เสิร์มหอมแดง มะนาว และน้ำมันพริกแยกไว้เพื่อให้เส้นทอดยังกรอบ"
  ));
  recipe.storage = ml(
    "Cool curry and chicken in shallow containers and refrigerate within 2 hours at or below 4°C (40°F). Keep boiled noodles, crisp noodle nests, and garnishes separate; the nests are best the same day. Use the curry within 2 days for best texture (a quality preference); FoodSafety.gov lists cooked meat leftovers for 3–4 days. Reheat only the curry portion to 74°C (165°F), stirring it evenly. This dish contains noodles, not rice.",
    "將咖哩與雞肉分裝於淺容器，2 小時內冷藏至 4°C（40°F）以下。熟麵、炸脆麵巢與配料分開保存；脆麵當天口感最好。為保持咖哩口感，建議 2 天內食用（品質偏好）；FoodSafety.gov 對熟肉剩菜列為 3–4 天。只取要吃的咖哩復熱至各處 74°C（165°F），並攪拌均勻。這道料理配麵，不含米飯。",
    "カレーと鶏肉は浅い容器に分け、2時間以内に4°C（40°F）以下で冷蔵します。ゆで麺、揚げ麺、具材は別々に保管し、揚げ麺は当日が最良です。食感のためカレーは2日以内の使用を勧めます（品質上の目安）。FoodSafety.govは調理済み肉の残り物を3〜4日としています。食べるカレーだけを混ぜながら74°C（165°F）まで再加熱します。この料理は麺を使い、ご飯は含みません。",
    "카레와 닭고기는 얕은 용기에 나눠 담아 2시간 이내에 4°C (40°F) 이하로 냉장한다. 삶은 면, 바삭한 튀김 면 둥지와 고명은 따로 보관하며 튀김 면은 당일 먹는 것이 가장 좋다. 식감을 위해 카레는 2일 이내 사용을 권한다(품질 선호). FoodSafety.gov는 조리된 고기 남은 음식을 3–4일로 안내한다. 먹을 카레만 저어 가며 74°C (165°F)까지 재가열한다. 이 요리에는 밥이 아니라 면이 들어간다.",
    "แบ่งแกงและไก่ใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมงที่ไม่เกิน 4°C (40°F) แยกเส้นต้ม รังเส้นทอดกรอบ และเครื่องเคียง โดยเส้นทอดกรอบอร่อยที่สุดในวันเดียวกัน เพื่อรักษาเนื้อสัมผัสให้ใช้แกงภายใน 2 วัน (เป็นความชอบด้านคุณภาพ) ส่วน FoodSafety.gov ระบุเนื้อสุกเหลือ 3–4 วัน อุ่นเฉพาะแกงที่จะกินให้ทั่วถึง 74°C (165°F) โดยคนให้สม่ำเสมอ เมนูนี้ใช้เส้น ไม่ใช่ข้าว"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function revisePorkBallSoup(recipe) {
  recipe.cookMinutes = 76;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const balls = recipe.ingredients.find((row) => row.item.en.startsWith("Taiwan pork balls"));
  if (balls) {
    balls.item = ml(
      "Taiwanese pork balls, fully cooked; use fresh or frozen as labelled",
      "台灣豬肉貢丸，已熟；新鮮或冷凍品依包裝標示使用",
      "台湾風豚肉団子（加熱済み。生または冷凍品は表示に従う）",
      "대만식 돼지고기 완자, 완전히 익힌 제품; 생물 또는 냉동은 포장 지침에 따름",
      "ลูกชิ้นหมูไต้หวันที่ปรุงสุกแล้ว ใช้แบบสดหรือแช่แข็งตามฉลาก"
    );
  }
  setBody(recipe, 0, ml(
    "Cover the 900 g pork bones with cold water, bring to a boil, and blanch for 4 minutes. Discard this liquid, rinse the bones under warm running water, and scrub the pot before adding the listed 2.2 L fresh broth water. This blanch is a clarity step, not the soup's cooking-time estimate.",
    "將 900 公克豬骨加冷水淹過，煮沸後汆燙 4 分鐘。倒掉汆燙水，以溫水沖洗豬骨並刷洗鍋子，再加入所列 2.2 公升新水煮湯。汆燙是澄清湯頭的步驟，仍須計入烹煮時間。",
    "豚骨900gを冷水で覆い、沸騰させて4分下ゆでします。湯を捨て、骨をぬるま湯で洗い、鍋も洗ってから表示の新しい水2.2Lを加えます。この下ゆではスープを澄ませる工程で、調理時間には含めます。",
    "돼지뼈 900g이 잠기도록 찬물을 붓고 끓여 4분 데친다. 물을 버리고 뼈를 미지근한 흐르는 물에 씻은 뒤 냄비를 닦고 표시된 새 물 2.2L를 넣는다. 이 데치기는 국물을 맑게 하는 단계이며 조리 시간에 포함한다.",
    "ใส่น้ำเย็นให้ท่วมกระดูกหมู 900 กรัม ต้มให้เดือดแล้วลวก 4 นาที เทน้ำทิ้ง ล้างกระดูกด้วยน้ำอุ่นและขัดหม้อก่อนเติมน้ำใหม่ 2.2 ลิตรตามที่ระบุ ขั้นตอนนี้ช่วยให้น้ำซุปใสและต้องนับรวมในเวลาปรุง"
  ));
  setBody(recipe, 1, ml(
    "Add 2.2 L fresh water to the cleaned pot and bring the bones just to a simmer. Skim for about 10 minutes, then keep an uncovered gentle bubble for 35 minutes. Start the 35-minute estimate after the broth settles at a simmer; do not count the earlier blanching water as soup.",
    "將 2.2 公升新水倒入洗淨的鍋中，豬骨煮至剛開始小滾。撇沫約 10 分鐘，再保持開蓋輕微冒泡 35 分鐘。待湯恢復小滾後才開始計 35 分鐘；汆燙水不作為湯底使用。",
    "洗った鍋に新しい水2.2Lを入れ、骨を静かな煮立ちまで温めます。約10分あくを取り、その後ふたをせず弱く35分煮ます。スープが煮立ちに戻ってから35分を計ります。最初の下ゆで湯はスープに使いません。",
    "씻은 냄비에 새 물 2.2L를 넣고 뼈를 약하게 끓인다. 약 10분 거품을 걷어낸 뒤 뚜껑 없이 잔잔하게 35분 더 끓인다. 국물이 다시 약하게 끓기 시작한 때부터 35분을 잰다. 처음 데친 물은 육수로 쓰지 않는다.",
    "เติมน้ำใหม่ 2.2 ลิตรลงในหม้อที่ล้างแล้ว ตั้งกระดูกจนเริ่มเดือดอ่อน ช้อนฟองประมาณ 10 นาที แล้วเคี่ยวเบา ๆ โดยไม่ปิดฝาอีก 35 นาที เริ่มนับ 35 นาทีเมื่อซุปกลับมาเดือดอ่อน น้ำลวกครั้งแรกไม่ใช้เป็นน้ำซุป"
  ));
  setBody(recipe, 2, ml(
    "Strain the broth into a clean pot and measure 1.8 L, topping up with boiling water only if short. Add the daikon and simmer for an estimated 15 minutes until its edges turn translucent. Add the listed 400 g fully cooked pork balls and heat gently for 7–9 minutes, following the package directions if they give a longer time. For chilled cooked balls, check the centre of the largest one reaches 74°C (165°F); that is a reheating check. If using a raw ground-pork ball product instead, cook its centre to 71°C (160°F), the separate ground-pork standard.",
    "將湯過濾到乾淨鍋中並量取 1.8 公升；不足時只用沸水補足。加入白蘿蔔小火煮約 15 分鐘，至邊緣半透明。加入所列 400 公克已熟豬肉丸，以小火加熱 7–9 分鐘；若包裝要求更久，依其標示。冷藏熟肉丸需測最大丸中心達 74°C（165°F），這是復熱檢查。若改用生絞豬肉丸，則中心須達 71°C（160°F），這是不同的絞肉標準。",
    "スープを清潔な鍋にこし、1.8Lを量ります。足りない場合だけ沸騰した湯を足します。大根を加え、縁が透き通るまで15分を目安に煮ます。表示の加熱済み豚肉団子400gを加えて7〜9分温めます。包装により長い加熱時間があれば従います。冷蔵済みの加熱済み団子は最大のものの中心が74°C（165°F）に達したか確認します。これは再加熱の確認です。生の豚ひき肉団子を使う場合は別基準として中心を71°C（160°F）まで加熱します。",
    "육수를 깨끗한 냄비에 거르고 1.8L를 잰다. 부족할 때만 끓는 물로 보충한다. 무를 넣고 가장자리가 투명해질 때까지 약 15분 끓인다. 완전히 익힌 돼지고기 완자 400g을 넣고 약하게 7–9분 데운다. 포장에 더 긴 조리 지침이 있으면 따른다. 냉장된 익힌 완자는 가장 큰 것의 중심이 74°C (165°F)에 도달하는지 확인한다. 이는 재가열 기준이다. 생 다진 돼지고기 완자를 쓰면 별도 기준으로 중심을 71°C (160°F)까지 익힌다.",
    "กรองน้ำซุปใส่หม้อสะอาดและตวง 1.8 ลิตร หากขาดให้เติมน้ำเดือดเท่านั้น ใส่หัวไชเท้าเคี่ยวประมาณ 15 นาทีจนขอบเริ่มใส เติมลูกชิ้นหมูปรุงสุกแล้ว 400 กรัม อุ่นเบา ๆ 7–9 นาที หากฉลากระบุเวลานานกว่านี้ให้ทำตาม สำหรับลูกชิ้นสุกที่แช่เย็น ให้วัดกลางลูกที่ใหญ่ที่สุดให้ถึง 74°C (165°F) ซึ่งเป็นการตรวจการอุ่นซ้ำ หากใช้ลูกชิ้นหมูบดดิบ ให้อุ่นกลางลูกถึง 71°C (160°F) ตามเกณฑ์เนื้อหมูบดที่แยกต่างหาก"
  ));
  setBody(recipe, 3, ml(
    "Soak the 240 g dry rice vermicelli in cool water for 10 minutes, then drain. Boil in a separate pot for an estimated 60–90 seconds until flexible but still springy. Drain well; the 10-minute soak is prep time, while the brief boil is cook time.",
    "將 240 公克乾米粉以冷水浸泡 10 分鐘後瀝乾。另鍋沸水煮約 60–90 秒，至柔軟但仍有彈性。充分瀝乾；10 分鐘浸泡計入備料時間，短暫煮麵計入烹煮時間。",
    "乾燥ビーフン240gを冷水に10分浸し、水を切ります。別鍋の沸騰湯で約60〜90秒、しなやかで弾力が残るまでゆでます。よく水を切ります。10分の浸水は準備時間、短いゆで時間は調理時間に含めます。",
    "마른 쌀국수 240g을 찬물에 10분 불린 뒤 물기를 뺀다. 별도 냄비에서 약 60–90초 삶아 유연하지만 탄력이 남게 한다. 잘 건진다. 10분 불리기는 준비 시간, 짧은 삶기는 조리 시간에 포함한다.",
    "แช่วุ้นเส้นแห้ง 240 กรัมในน้ำเย็น 10 นาทีแล้วสะเด็ดน้ำ ต้มในหม้อแยกประมาณ 60–90 วินาทีจนเส้นนิ่มแต่ยังเด้ง สะเด็ดให้ดี เวลาการแช่ 10 นาทีรวมในเวลาเตรียม ส่วนเวลาต้มสั้น ๆ รวมในเวลาปรุง"
  ));
  setBody(recipe, 5, ml(
    "Divide the 240 g cooked vermicelli among four warm bowls (about 60 g dry noodles per bowl). Add about 100 g pork balls and one-quarter of the cooked daikon to each. Ladle 400 ml broth into each bowl; reserve the remaining 200 ml broth for topping up, or chill it separately. Finish with one-quarter of the celery and fried shallots.",
    "將煮好的米粉分入四個溫碗（每碗約用 60 公克乾米粉）。每碗放約 100 公克豬肉丸與四分之一白蘿蔔。每碗舀入 400 毫升湯；剩餘 200 毫升保留作添湯或另行冷藏。芹菜與油蔥酥各分四分之一上桌。",
    "ゆでたビーフンを4つの温めた器に分けます（乾麺で1杯約60g）。各器に豚肉団子約100gと煮た大根の4分の1を入れます。スープを各400ml注ぎ、残りの200mlは足し湯用に取っておくか別に冷蔵します。セロリと揚げエシャロットも各4分の1ずつ添えます。",
    "삶은 쌀국수를 따뜻한 그릇 네 개에 나눈다(마른 면 기준 그릇당 약 60g). 각 그릇에 돼지고기 완자 약 100g과 익힌 무의 4분의 1을 담는다. 육수는 그릇마다 400ml씩 붓고 남은 200ml는 추가용으로 남기거나 따로 냉장한다. 셀러리와 튀긴 샬롯도 각각 4분의 1씩 나눈다.",
    "แบ่งเส้นที่ต้มแล้วในชามอุ่น 4 ใบ (เส้นแห้งประมาณ 60 กรัมต่อชาม) ใส่ลูกชิ้นหมูประมาณ 100 กรัมและหัวไชเท้าสุกหนึ่งในสี่ต่อชาม ตักน้ำซุปชามละ 400 มล. เก็บอีก 200 มล.ไว้เติมหรือแช่เย็นแยก ปิดท้ายด้วยขึ้นฉ่ายและหอมเจียวอย่างละหนึ่งในสี่"
  ));
  recipe.storage = ml(
    "Cool broth, daikon, and pork balls in shallow containers and refrigerate within 2 hours at or below 4°C (40°F). Store cooked vermicelli separately and use it the same day for best texture. This soup is best within 3 days (a quality preference); FoodSafety.gov lists soups and cooked meat leftovers for 3–4 days. Reheat only the portion needed until the broth is steaming and the meatballs reach 74°C (165°F), stirring to heat evenly.",
    "將湯、白蘿蔔與豬肉丸分裝於淺容器，2 小時內冷藏至 4°C（40°F）以下。熟米粉分開保存，為保持口感建議當天食用。此湯建議 3 天內食用（品質偏好）；FoodSafety.gov 對湯品與熟肉剩菜列為 3–4 天。只取要吃的份量復熱，攪拌至湯熱氣蒸騰且肉丸中心達 74°C（165°F）。",
    "スープ、大根、豚肉団子を浅い容器に小分けし、2時間以内に4°C（40°F）以下で冷蔵します。ゆでたビーフンは別に保存し、食感のため当日中に使います。このスープは3日以内が品質上の目安です。FoodSafety.govはスープと調理済み肉を3〜4日としています。食べる分だけ均一に混ぜながら温め、湯気が立ち、肉団子の中心が74°C（165°F）に達するまで再加熱します。",
    "육수, 무와 돼지고기 완자는 얕은 용기에 나눠 2시간 이내에 4°C (40°F) 이하로 냉장한다. 삶은 쌀국수는 따로 보관하고 식감을 위해 당일 사용한다. 이 국은 3일 이내가 품질 선호이며 FoodSafety.gov는 수프와 익힌 고기 남은 음식을 3–4일로 안내한다. 먹을 양만 저어 가며 김이 나고 완자 중심이 74°C (165°F)에 도달하도록 재가열한다.",
    "แบ่งน้ำซุป หัวไชเท้า และลูกชิ้นใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมงที่ไม่เกิน 4°C (40°F) เก็บเส้นที่ต้มแล้วแยกและใช้ในวันเดียวกันเพื่อเนื้อสัมผัสดีที่สุด ซุปนี้แนะนำให้ใช้ภายใน 3 วันซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุซุปและเนื้อปรุงสุกเหลือ 3–4 วัน อุ่นเฉพาะส่วนที่จะกิน คนให้ทั่วจนมีไอร้อนและลูกชิ้นถึง 74°C (165°F)"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

export function refineFiftyEighthMethods(recipes) {
  const selected = new Set(["massaman-curry", "mul-naengmyeon", "khao-soi", "pork-ball-rice-vermicelli-soup"]);
  for (const id of selected) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error("Recipe method audit 58: missing recipe " + id);
    const revised = cloneForPublication(recipes[index]);
    if (id === "massaman-curry") reviseMassaman(revised);
    if (id === "mul-naengmyeon") reviseMulNaengmyeon(revised);
    if (id === "khao-soi") reviseKhaoSoi(revised);
    if (id === "pork-ball-rice-vermicelli-soup") revisePorkBallSoup(revised);
    recipes[index] = revised;
  }
  return recipes;
}
