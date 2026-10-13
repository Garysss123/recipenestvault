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

function reviseGreenCurry(recipe) {
  recipe.cookMinutes = 35;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  setBody(recipe, 2, ml(
    "Add the 600 g chicken thigh pieces and all 70 g curry paste. Stir over medium heat for about 4 minutes until the outside turns opaque and every piece is coated. The centres are still raw: this colour change is only a searing cue, so keep the chicken in the pot for the measured-temperature check.",
    "加入 600 公克雞腿肉與全部 70 公克綠咖哩醬，以中火翻炒約 4 分鐘，至外層轉白且每塊都裹上醬。中心仍未熟；顏色變化只是煎炒指標，雞肉仍須留在鍋中，之後以溫度計確認。",
    "鶏もも肉600gとカレーペースト70g全量を加え、中火で約4分混ぜます。表面が白くなり全体にペーストが絡みますが、中心はまだ生です。この色は焼き付けの目安にすぎないため、鶏肉は鍋に残して後で温度を測ります。",
    "닭다리살 600g과 카레 페이스트 70g 전량을 넣고 중불에서 약 4분 볶아 겉면이 불투명해지고 모든 조각에 페이스트가 묻게 한다. 속은 아직 익지 않았다. 겉색은 볶음 정도를 보여줄 뿐이므로 닭고기를 냄비에서 빼지 말고 뒤에 온도를 확인한다.",
    "ใส่เนื้อสะโพกไก่ 600 กรัมและเครื่องแกงเขียวหวาน 70 กรัมทั้งหมด ผัดไฟกลางประมาณ 4 นาทีจนผิวด้านนอกทึบและเคลือบเครื่องแกงทุกชิ้น ตรงกลางยังดิบ สีที่เปลี่ยนเป็นเพียงสัญญาณของการผัด จึงต้องเคี่ยวต่อและวัดอุณหภูมิภายหลัง"
  ));

  setBody(recipe, 3, ml(
    "Pour in the remaining 280 ml coconut milk and all 250 ml chicken stock, scraping the pan. Add all 30 ml fish sauce, 15 g palm sugar, and four torn makrut lime leaves. Bring back to a gentle simmer; start the simmer-stage estimate only when small bubbles return.",
    "倒入其餘 280 毫升椰奶與全部 250 毫升雞高湯，刮起鍋底。加入全部 30 毫升魚露、15 公克棕櫚糖與四片撕開的卡菲爾萊姆葉。恢復小滾後才開始計算這段燉煮估時。",
    "残りのココナッツミルク280mlと鶏スープ250ml全量を注ぎ、鍋底をこそげます。ナンプラー30ml全量、パームシュガー15g、裂いたこぶみかんの葉4枚を加えます。小さな泡が戻ってから煮込み時間の目安を数え始めます。",
    "남은 코코넛밀크 280ml와 닭 육수 250ml 전량을 붓고 냄비 바닥을 긁는다. 피시소스 30ml 전량, 팜슈거 15g, 찢은 카피르라임 잎 4장을 넣는다. 약한 기포가 다시 생긴 시점부터 이 단계의 조리 시간을 잰다.",
    "เทกะทิที่เหลือ 280 มล. และน้ำสต๊อกไก่ 250 มล. ทั้งหมดลงไป ขูดก้นหม้อให้ทั่ว ใส่น้ำปลา 30 มล. น้ำตาลโตนด 15 กรัม และใบมะกรูดฉีก 4 ใบ เริ่มนับเวลาช่วงเคี่ยวเมื่อมีฟองเล็ก ๆ กลับมา"
  ));

  setBody(recipe, 4, ml(
    "Partly cover and simmer for about 8 minutes, stirring once. Insert a clean thermometer into the centre of the largest thigh piece without touching the pot; poultry must reach 74°C (165°F). If it has not, keep simmering and recheck in 2-minute intervals. The 8-minute time is an estimate, not the safety endpoint.",
    "半蓋鍋蓋小滾約 8 分鐘，中途攪拌一次。以乾淨溫度計測最大雞腿肉塊中心，勿碰鍋底；禽肉須達 74°C（165°F）。未達時繼續小滾，每 2 分鐘複測。8 分鐘是估時，安全標準以溫度為準。",
    "ふたを少しずらして約8分煮て、途中で一度混ぜます。清潔な温度計を最も大きい鶏肉の中心に差し、鍋に触れないよう測ります。鶏肉は74°C（165°F）に達する必要があります。未達なら煮続け、2分ごとに再測定します。8分は目安で、安全基準は温度です。",
    "뚜껑을 조금 열고 약 8분 끓이며 한 번 저어준다. 깨끗한 온도계를 가장 큰 닭고기 조각의 중심에 넣되 냄비에 닿지 않게 잰다. 가금류는 74°C (165°F)에 도달해야 한다. 미달이면 계속 끓이고 2분 간격으로 다시 잰다. 8분은 예상 시간이며 안전 기준은 온도다.",
    "ปิดฝาแง้มไว้ เคี่ยวประมาณ 8 นาทีและคนหนึ่งครั้ง ใช้เทอร์โมมิเตอร์สะอาดวัดกลางชิ้นไก่ที่ใหญ่ที่สุดโดยไม่ให้แตะหม้อ เนื้อสัตว์ปีกต้องถึง 74°C (165°F) หากยังไม่ถึงให้เคี่ยวต่อและวัดซ้ำทุก 2 นาที เวลา 8 นาทีเป็นค่าประมาณ เกณฑ์ความปลอดภัยคืออุณหภูมิ"
  ));

  setBody(recipe, 5, ml(
    "Only after the chicken passes its 74°C check, drain the 250 g eggplants and add them with all 150 g bamboo shoots. Simmer uncovered for 7–9 minutes, until a knife enters an eggplant piece easily but it still holds its shape. Stir gently twice.",
    "雞肉確認達 74°C 後，才瀝乾全部 250 公克茄子，與全部 150 公克竹筍一起入鍋。開蓋小滾 7–9 分鐘，至刀尖可輕易刺入茄子但仍保持形狀；輕柔攪拌兩次。",
    "鶏肉が74°Cに達したことを確認してから、なす250gの水を切り、たけのこ150g全量と一緒に加えます。ふたをせず7〜9分煮ます。ナイフがなすにすっと入り、形は保つ状態が目安です。やさしく2回混ぜます。",
    "닭고기가 74°C에 도달한 것을 확인한 다음 가지 250g의 물기를 빼고 죽순 150g 전량과 함께 넣는다. 뚜껑을 열고 7–9분 끓여 칼이 가지에 쉽게 들어가되 모양은 유지될 때까지 익힌다. 부드럽게 두 번 젓는다.",
    "เมื่อยืนยันว่าไก่ถึง 74°C แล้ว จึงสะเด็ดมะเขือ 250 กรัมและใส่พร้อมหน่อไม้ 150 กรัมทั้งหมด เคี่ยวเปิดฝา 7–9 นาทีจนมีดจิ้มมะเขือได้ง่ายแต่ยังคงรูป คนเบา ๆ สองครั้ง"
  ));

  setBody(recipe, 6, ml(
    "Taste only after the vegetables are tender. Add up to the optional extra 10 ml fish sauce only if needed. Turn off the heat; fold in all 40 g Thai basil, both sliced chiles, and the remaining two lime leaves. Cover for 2 minutes; this finish is included in the cooking estimate.",
    "蔬菜變軟後再試味；只有需要時才加最多 10 毫升額外魚露。關火，拌入全部 40 公克泰國羅勒、兩根切片辣椒與剩下兩片萊姆葉。加蓋 2 分鐘，這段收尾已計入烹煮估時。",
    "野菜が柔らかくなってから味見し、必要な場合だけ追加のナンプラーを最大10ml加えます。火を止め、タイバジル40g全量、薄切り唐辛子2本、残りのこぶみかんの葉2枚を混ぜ、ふたをして2分置きます。この仕上げ時間も調理時間の見積もりに含みます。",
    "채소가 부드러워진 뒤 맛을 본다. 필요할 때만 추가 피시소스를 최대 10ml 넣는다. 불을 끄고 타이 바질 40g 전량, 썬 고추 2개, 남은 라임 잎 2장을 넣어 섞고 뚜껑을 덮어 2분 둔다. 마무리 시간은 조리 시간 추정에 포함된다.",
    "ชิมหลังผักนุ่มแล้ว เติมน้ำปลาเพิ่มได้ไม่เกิน 10 มล. เฉพาะเมื่อจำเป็น ปิดไฟ ใส่ใบโหระพาไทย 40 กรัมทั้งหมด พริกซอย 2 เม็ด และใบมะกรูดที่เหลือ 2 ใบ คนเบา ๆ แล้วปิดฝา 2 นาที เวลาปิดท้ายนี้รวมในเวลาปรุงแล้ว"
  ));

  setBody(recipe, 7, ml(
    "Divide the whole curry evenly among four bowls; cooked chicken yield varies, so share the pieces rather than promise a cooked weight. The listed 600 g cooked jasmine rice is 150 g per bowl, or serve one of the four listed roti per person. Do not add an unlisted lime garnish.",
    "將整鍋咖哩平均分成四碗；雞肉熟後重量會變化，平均分配肉塊，不承諾固定熟重。所列 600 公克熟茉莉香米為每碗 150 公克；也可每人搭配所列四張烤餅之一。不要添加未列出的萊姆裝飾。",
    "カレー全量を4つの器に等分します。鶏肉の調理後重量は変わるため、固定の重量ではなく肉片を均等に分けます。炊いたジャスミンライス600gは1杯150gです。代わりに表示のロティ4枚を1人1枚添えても構いません。材料にないライムは飾りません。",
    "카레 전체를 네 그릇에 고르게 나눈다. 익힌 닭고기 중량은 달라지므로 조각을 나누고 익힌 중량을 고정해 약속하지 않는다. 표시된 재스민쌀밥 600g은 그릇당 150g이다. 대신 로티 4장을 1인당 한 장씩 곁들일 수 있다. 목록에 없는 라임은 장식하지 않는다.",
    "แบ่งแกงทั้งหมดเท่า ๆ กันใน 4 ชาม น้ำหนักไก่หลังปรุงเปลี่ยนได้ จึงแบ่งชิ้นให้เท่ากันโดยไม่กำหนดน้ำหนักสุก ข้าวหอมมะลิสุก 600 กรัมคือชามละ 150 กรัม หรือเสิร์ฟโรตี 4 แผ่นตามรายการ คนละ 1 แผ่น อย่าเติมมะนาวที่ไม่ได้ระบุไว้"
  ));

  recipe.storage = ml(
    "Cool curry in shallow containers and refrigerate within 2 hours at or below 4°C (40°F). Store rice separately. Use within 3 days for best texture; that is a quality preference, while FoodSafety.gov lists cooked leftovers at 3–4 days. Reheat only the portion needed, stirring until the curry reaches 74°C (165°F) throughout. This is a leftover reheating endpoint, separate from the 74°C poultry check during cooking.",
    "咖哩分裝於淺容器，2 小時內冷藏至 4°C（40°F）以下；米飯另行保存。為保持口感，建議 3 天內食用，這是品質偏好；FoodSafety.gov 對熟食剩菜列為 3–4 天。只取所需份量並持續攪拌，復熱至咖哩各處達 74°C（165°F）。這是剩菜復熱標準，與烹煮雞肉時的 74°C 禽肉標準不同。",
    "カレーは浅い容器に分け、2時間以内に4°C（40°F）以下で冷蔵します。ご飯は別に保存します。食感のため3日以内を勧めますが、これは品質上の目安です。FoodSafety.govは調理済み残り物を3〜4日としています。食べる分だけ取り分け、混ぜながら全体を74°C（165°F）まで再加熱します。これは残り物の基準で、調理中の鶏肉の74°Cとは用途が異なります。",
    "카레는 얕은 용기에 나눠 담아 2시간 안에 4°C (40°F) 이하로 냉장하고 밥은 따로 보관한다. 식감을 위해 3일 이내 섭취를 권하지만 이는 품질 선호다. FoodSafety.gov는 조리된 남은 음식의 냉장 기간을 3–4일로 안내한다. 먹을 만큼만 덜어 저으면서 전체가 74°C (165°F)가 되도록 재가열한다. 이는 남은 음식 재가열 기준이며 조리 중 닭고기 74°C 확인 기준과 용도가 다르다.",
    "แบ่งแกงใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่อุณหภูมิไม่เกิน 4°C (40°F) เก็บข้าวแยกกัน เพื่อรักษาเนื้อสัมผัสแนะนำให้ใช้ใน 3 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุอาหารปรุงสุกแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินและคนจนแกงทั่วถึง 74°C (165°F) นี่คือเกณฑ์อุ่นอาหารเหลือ แยกจากเกณฑ์ 74°C ของไก่ระหว่างปรุง"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseBoeufBourguignon(recipe) {
  recipe.cookMinutes = 205;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  setBody(recipe, 0, ml(
    "Heat the oven to 160°C. Pat the 900 g beef chuck dry and season with 3 g of the listed 5 g stew salt and 1 g of the 2 g pepper. Cut size is 4 cm, not ground meat. Prepare the vegetables; reserve 2 g stew salt and 1 g pepper for the finish, and keep the separate 5 g potato salt aside.",
    "烤箱預熱至 160°C。將 900 公克牛肩肉擦乾，使用所列燉肉鹽 5 公克中的 3 公克與黑胡椒 2 公克中的 1 公克調味。肉塊切成 4 公分，不是絞肉。備好蔬菜；保留 2 公克燉肉鹽與 1 公克胡椒收尾，另將馬鈴薯用的 5 公克鹽分開。",
    "オーブンを160°Cに予熱します。牛肩肉900gの水気を拭き、シチュー用の塩5gのうち3gと、黒こしょう2gのうち1gをまぶします。4cm角の肉で、ひき肉ではありません。野菜を準備し、仕上げ用に塩2gとこしょう1gを残し、じゃがいも用の塩5gは別にします。",
    "오븐을 160°C로 예열한다. 소고기 어깨살 900g의 물기를 닦고 스튜용 소금 5g 중 3g, 후추 2g 중 1g으로 간한다. 고기는 4cm 덩어리이며 다짐육이 아니다. 채소를 준비하고 마무리용 스튜 소금 2g과 후추 1g을 남긴다. 감자용 소금 5g은 따로 둔다.",
    "อุ่นเตาอบที่ 160°C ซับเนื้อหัวไหล่วัว 900 กรัมให้แห้ง ปรุงด้วยเกลือสำหรับสตู 3 กรัมจากทั้งหมด 5 กรัม และพริกไทย 1 กรัมจากทั้งหมด 2 กรัม เนื้อหั่นเต๋า 4 ซม. ไม่ใช่เนื้อบด เตรียมผักและแยกเกลือสตูที่เหลือ 2 กรัมกับพริกไทย 1 กรัมไว้ปรุงท้าย ส่วนเกลือ 5 กรัมสำหรับมันฝรั่งให้แยกไว้"
  ));

  setBody(recipe, 2, ml(
    "Add the listed 20 ml oil and sear the beef in three uncrowded batches, 4–5 minutes per batch, turning several faces brown. The centres are not cooked yet. Move each batch to a clean bowl; do not treat surface browning as a doneness check.",
    "加入所列全部 20 毫升油，牛肉分三批且勿擁擠，每批煎 4–5 分鐘並翻面，使多個切面上色。中心尚未熟。每批放入乾淨碗中；表面上色不是熟度判定。",
    "表示の油20ml全量を加え、肉を詰め込まず3回に分けます。各回4〜5分、複数の面に焼き色が付くよう返します。中心はまだ加熱されていません。各回を清潔な器に移し、表面の焼き色を火の通りの確認に使わないでください。",
    "표시된 기름 20ml 전량을 넣고 소고기를 붐비지 않게 세 번 나누어 굽는다. 한 번에 4–5분씩 여러 면을 갈색으로 익힌다. 중심은 아직 익지 않았다. 각 배치를 깨끗한 그릇에 옮기고 겉면의 갈변을 익음 확인으로 보지 않는다.",
    "ใส่น้ำมัน 20 มล. ตามรายการทั้งหมด แบ่งเนื้อเป็น 3 รอบโดยไม่ให้แน่นกระทะ จี่รอบละ 4–5 นาทีและพลิกให้หลายด้านเป็นสีน้ำตาล ตรงกลางยังไม่สุก ย้ายแต่ละรอบใส่ชามสะอาด สีผิวที่เกรียมไม่ใช่การตรวจความสุก"
  ));

  setBody(recipe, 4, ml(
    "Pour in all 500 ml wine and scrape the fond; boil for 3 minutes. Add all 400 ml stock, thyme, bay, beef, bacon, and their juices. Bring the liquid back to a gentle simmer before covering; the braise timer starts when small bubbles return, not when the pot enters the oven.",
    "倒入全部 500 毫升紅酒並刮起鍋底，沸煮 3 分鐘。加入全部 400 毫升高湯、百里香、月桂葉、牛肉、培根及肉汁。加蓋前先恢復小滾；燉煮計時從小泡重新出現開始，不是從鍋子進烤箱時開始。",
    "ワイン500ml全量を注いで鍋底をこそげ、3分沸かします。スープ400ml全量、タイム、ローリエ、牛肉、ベーコンと肉汁を戻します。ふたをする前に静かな煮立ちに戻し、小さな泡が戻った時点から煮込み時間を数えます。オーブンに入れた時点ではありません。",
    "와인 500ml 전량을 붓고 냄비 바닥의 갈색 찌꺼기를 긁어내며 3분 끓인다. 육수 400ml 전량, 타임, 월계수잎, 소고기, 베이컨과 육즙을 넣는다. 뚜껑을 덮기 전에 약하게 다시 끓인다. 조림 시간은 냄비를 오븐에 넣을 때가 아니라 작은 기포가 돌아온 때부터 잰다.",
    "เทไวน์ 500 มล. ทั้งหมด ขูดคราบก้นหม้อแล้วต้ม 3 นาที ใส่น้ำสต๊อก 400 มล.ทั้งหมด ไทม์ ใบกระวาน เนื้อ เบคอน และน้ำจากเนื้อ รอให้กลับมาเดือดเบา ๆ ก่อนปิดฝา เริ่มจับเวลาเมื่อมีฟองเล็ก ๆ กลับมา ไม่ใช่ตอนยกหม้อเข้าเตาอบ"
  ));

  setBody(recipe, 5, ml(
    "Cover and braise at 160°C for an estimated 2–2½ hours from the gentle simmer. Check after 1 hour: the liquid should barely bubble and nearly cover the 4 cm beef cubes. Add the reserved adjustment water in 50 ml portions only if needed. The duration is a quality estimate for tender cubes, not the 71°C ground-meat rule or a steak-temperature instruction.",
    "加蓋以 160°C 燉約 2–2½ 小時，從小滾恢復後開始計時。1 小時後檢查：湯汁應僅微微冒泡，並幾乎淹過 4 公分牛肉塊。只有需要時才每次加入保留的 50 毫升調整水。此時間是讓肉塊柔嫩的品質估時，不是絞肉 71°C 標準，也不是牛排溫度指示。",
    "ふたをして160°Cで約2〜2時間半、静かな煮立ちから煮込みます。1時間後に確認し、煮汁がかすかに泡立ち、4cm角の肉がほぼ浸っている状態にします。必要な場合だけ、取り置いた調整水を50mlずつ加えます。この時間は肉を柔らかくする品質上の目安で、ひき肉の71°C基準やステーキの温度指示ではありません。",
    "뚜껑을 덮고 160°C에서 약 2–2½시간 조린다. 약하게 다시 끓기 시작한 때부터 잰다. 1시간 뒤 국물이 아주 약하게 끓고 4cm 소고기 덩어리를 거의 덮는지 확인한다. 필요할 때만 남겨 둔 조절용 물을 50ml씩 넣는다. 이 시간은 덩어리를 부드럽게 하기 위한 품질 추정치이며 다짐육 71°C 기준이나 스테이크 온도 지시가 아니다.",
    "ปิดฝาแล้วตุ๋นที่ 160°C ประมาณ 2–2½ ชั่วโมง เริ่มจับเวลาหลังกลับมาเดือดเบา ๆ ตรวจหลัง 1 ชั่วโมง น้ำควรเดือดเพียงเล็กน้อยและเกือบท่วมเนื้อเต๋า 4 ซม. เติมน้ำที่แบ่งไว้ครั้งละ 50 มล. เฉพาะเมื่อจำเป็น เวลานี้เป็นค่าประมาณเพื่อให้เนื้อนุ่ม ไม่ใช่เกณฑ์ 71°C ของเนื้อบดหรือคำแนะนำอุณหภูมิสำหรับสเต๊ก"
  ));

  setBody(recipe, 6, ml(
    "During the braise, use 15 g butter and 150 ml water for the 160 g pearl onions; simmer 15 minutes, uncover, and evaporate the water. In a separate pan, use the remaining 15 g butter to brown all 250 g mushrooms for 8–10 minutes. Both stages fit inside the covered braise.",
    "燉煮期間，取 15 公克奶油與 150 毫升水燉煮全部 160 公克珍珠洋蔥 15 分鐘，再開蓋收乾水分。另鍋用剩餘 15 公克奶油將全部 250 公克蘑菇煎香 8–10 分鐘。兩個配菜階段都可在主鍋燉煮期間完成。",
    "煮込み中に、バター15gと水150mlでパールオニオン160g全量を15分煮て、ふたを外して水分を飛ばします。別のフライパンで残りのバター15gを使い、マッシュルーム250g全量を8〜10分焼きます。どちらも本体の煮込み中に並行できます。",
    "조림 중 버터 15g과 물 150ml로 펄어니언 160g 전량을 15분 끓인 뒤 뚜껑을 열어 물을 증발시킨다. 별도 팬에서 남은 버터 15g으로 버섯 250g 전량을 8–10분 볶는다. 두 단계 모두 본 조림과 병행한다.",
    "ระหว่างตุ๋น ใช้เนย 15 กรัมกับน้ำ 150 มล. เคี่ยวหอมหัวเล็ก 160 กรัมทั้งหมด 15 นาที แล้วเปิดฝาให้น้ำระเหย ใช้เนยที่เหลือ 15 กรัมในกระทะอีกใบ ผัดเห็ด 250 กรัมทั้งหมด 8–10 นาที ทั้งสองขั้นทำระหว่างตุ๋นหม้อหลักได้"
  ));

  setBody(recipe, 7, ml(
    "In the final 25 minutes of braising, boil all 600 g potatoes in 1.5 L water with the separate 5 g potato salt. Simmer 15–20 minutes until easily pierced, drain, and steam-dry for 2 minutes. Divide the potatoes among four plates, about 150 g raw weight per serving.",
    "主鍋燉煮最後 25 分鐘時，以 1.5 公升水和另分的 5 公克馬鈴薯用鹽煮全部 600 公克馬鈴薯。小火煮 15–20 分鐘至容易刺穿，瀝乾並蒸發水氣 2 分鐘。四盤平均分配，生重每份約 150 公克。",
    "煮込みの最後の25分に、じゃがいも600g全量を水1.5Lと別にした塩5gでゆでます。15〜20分、簡単に刺せるまで煮て、水を切り2分蒸らして乾かします。4皿に分け、1人分は生重量で約150gです。",
    "조림 마지막 25분 동안 감자 600g 전량을 물 1.5L와 따로 둔 감자용 소금 5g으로 삶는다. 쉽게 찔릴 때까지 15–20분 끓인 뒤 물을 빼고 2분간 김을 날린다. 네 접시에 나누며 생감자 기준 1인분은 약 150g이다.",
    "ในช่วง 25 นาทีสุดท้ายของการตุ๋น ต้มมันฝรั่ง 600 กรัมทั้งหมดในน้ำ 1.5 ลิตรกับเกลือสำหรับมันฝรั่ง 5 กรัมที่แยกไว้ เคี่ยว 15–20 นาทีจนใช้มีดแทงได้ง่าย สะเด็ดน้ำและผึ่งไอน้ำ 2 นาที แบ่งใส่ 4 จาน จานละประมาณ 150 กรัมเมื่อชั่งดิบ"
  ));

  setBody(recipe, 8, ml(
    "Test a beef cube with a fork: it should yield with little resistance but remain intact. That is the texture target, not a thermometer reading. If it is still chewy, continue the covered simmer in 10-minute increments and add each interval to the elapsed cook time. Remove the bay and thyme; fold in the onions and mushrooms and simmer uncovered 5–8 minutes. Use the reserved 2 g stew salt and 1 g pepper only as needed.",
    "用叉子測牛肉塊：應只需少許力氣即可插入，但仍保持完整。這是口感目標，不是溫度讀數。若仍韌，繼續加蓋小滾，每次 10 分鐘，並把延長時間加進總烹煮時間。取出月桂葉與百里香，拌入洋蔥和蘑菇，開蓋小滾 5–8 分鐘。保留的 2 公克燉肉鹽與 1 公克胡椒視需要調整。",
    "フォークで牛肉を確認します。少し抵抗がある程度で刺さり、形は保つ状態が目標です。これは食感の目安で、温度測定ではありません。まだ硬ければふたをして10分ずつ煮込み、追加分を調理時間に加えます。ローリエとタイムを取り出し、玉ねぎときのこを混ぜ、ふたをせず5〜8分煮ます。残したシチュー用の塩2gとこしょう1gは必要な分だけ加えます。",
    "포크로 소고기 덩어리를 확인한다. 약간의 저항만으로 들어가되 덩어리는 유지되어야 한다. 이는 식감 목표이지 온도 측정값이 아니다. 질기면 뚜껑을 덮고 10분씩 더 끓이며 추가 시간을 조리 시간에 더한다. 월계수잎과 타임을 건져내고 양파와 버섯을 섞은 뒤 뚜껑을 열어 5–8분 끓인다. 남겨 둔 스튜 소금 2g과 후추 1g은 필요한 만큼만 넣는다.",
    "ใช้ส้อมทดสอบเนื้อ ควรแทงเข้าได้โดยมีแรงต้านเล็กน้อยแต่ชิ้นยังคงรูป นี่เป็นเป้าหมายด้านเนื้อสัมผัส ไม่ใช่ค่าจากเทอร์โมมิเตอร์ หากยังเหนียวให้ตุ๋นปิดฝาต่อครั้งละ 10 นาทีและบวกเวลานั้นในเวลารวม นำใบกระวานกับไทม์ออก ใส่หอมหัวเล็กและเห็ด คนแล้วเคี่ยวเปิดฝา 5–8 นาที ปรุงด้วยเกลือสตู 2 กรัมและพริกไทย 1 กรัมที่เหลือเท่าที่จำเป็น"
  ));

  setBody(recipe, 9, ml(
    "Rest off the heat for 10 minutes. Divide all beef, carrots, pearl onions, mushrooms, and sauce among four plates; the cooked beef weight varies, so share the pieces evenly. Add the four equal potato portions and all 8 g parsley. The 205-minute cook estimate covers the timed stages through the rest, with parallel potato and garnish work counted once.",
    "離火靜置 10 分鐘。將牛肉、紅蘿蔔、珍珠洋蔥、蘑菇與醬汁平均分成四盤；牛肉熟重會變化，平均分配肉塊即可。加入四份馬鈴薯及全部 8 公克巴西里。205 分鐘烹煮估時涵蓋各計時階段至靜置結束，平行進行的馬鈴薯與配菜只計一次。",
    "火を止めて10分休ませます。牛肉、にんじん、パールオニオン、きのこ、ソースを4皿に等分します。調理後の牛肉重量は変わるため、肉片を均等に分けます。じゃがいも4等分とパセリ8g全量を添えます。調理時間205分は休ませる工程までを含み、並行するじゃがいもと付け合わせは一度だけ数えています。",
    "불을 끄고 10분 둔다. 소고기, 당근, 펄어니언, 버섯과 소스를 네 접시에 고르게 나눈다. 익힌 소고기 중량은 달라지므로 조각을 고르게 분배한다. 감자 네 몫과 파슬리 8g 전량을 곁들인다. 조리 시간 205분은 휴지까지의 단계 추정치이며 병행한 감자와 곁들임 시간은 한 번만 계산했다.",
    "พักนอกไฟ 10 นาที แบ่งเนื้อ แครอต หอมหัวเล็ก เห็ด และซอสทั้งหมดลง 4 จาน น้ำหนักเนื้อสุกเปลี่ยนได้ จึงแบ่งชิ้นให้เท่ากัน เสิร์ฟมันฝรั่ง 4 ส่วนและพาร์สลีย์ 8 กรัมทั้งหมด เวลาปรุง 205 นาทีครอบคลุมขั้นที่จับเวลาจนถึงการพัก โดยนับเวลามันฝรั่งและเครื่องเคียงที่ทำพร้อมกันเพียงครั้งเดียว"
  ));

  recipe.storage = ml(
    "Divide stew into shallow containers and refrigerate within 2 hours at 4°C (40°F) or below. Use within 3 days for best texture; this is a quality preference, while FoodSafety.gov lists soups, stews, and cooked-meat leftovers at 3–4 days. Reheat only the portion needed until it reaches 74°C (165°F) throughout, stirring the sauce. The beef's fork-tender cue is for texture, not leftover safety.",
    "燉肉分裝於淺容器，2 小時內冷藏至 4°C（40°F）以下。為保持口感，建議 3 天內食用；這是品質偏好，FoodSafety.gov 對湯、燉菜與熟肉剩菜列為 3–4 天。只取所需份量並攪拌醬汁，復熱至各處達 74°C（165°F）。叉子測柔嫩度是口感指標，不是剩菜安全標準。",
    "シチューは浅い容器に分け、2時間以内に4°C（40°F）以下で冷蔵します。食感のため3日以内を勧めますが、これは品質上の目安です。FoodSafety.govはスープ、煮込み料理、調理済み肉の残り物を3〜4日としています。食べる分だけ取り分け、ソースを混ぜながら全体を74°C（165°F）まで再加熱します。フォークでの柔らかさは食感の確認で、残り物の安全基準ではありません。",
    "스튜를 얕은 용기에 나눠 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. 식감을 위해 3일 이내 섭취를 권하지만 이는 품질 선호다. FoodSafety.gov는 수프·스튜와 조리된 고기 남은 음식을 3–4일로 안내한다. 먹을 만큼만 덜어 소스를 저으며 전체가 74°C (165°F)가 되도록 재가열한다. 포크로 확인하는 부드러움은 식감 기준이지 남은 음식 안전 기준이 아니다.",
    "แบ่งสตูใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่อุณหภูมิไม่เกิน 4°C (40°F) เพื่อเนื้อสัมผัสที่ดีที่สุดให้ใช้ใน 3 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุซุป สตู และอาหารเนื้อปรุงสุกแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกิน คนซอสและให้ทั่วถึง 74°C (165°F) ความนุ่มจากส้อมเป็นเกณฑ์เนื้อสัมผัส ไม่ใช่มาตรฐานความปลอดภัยของอาหารเหลือ"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseBoatNoodles(recipe) {
  recipe.cookMinutes = 300;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const noodles = recipe.ingredients.find((row) => row.item.en.startsWith("fresh medium-width rice noodles"));
  const sprouts = recipe.ingredients.find((row) => row.item.en.startsWith("bean sprouts"));
  const garlicOil = recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil for fried garlic"));
  if (noodles) noodles.amount = "640 g";
  if (sprouts) sprouts.amount = "280 g";
  if (garlicOil) garlicOil.amount = "40 ml";

  setBody(recipe, 5, ml(
    "After 2½ hours at a steady simmer, check the centre of the intact whole shank with a clean thermometer: beef roasts use 63°C (145°F), followed by a 3-minute rest. The skewer entering with little resistance is a separate tenderness cue, not the safety test. Lift the shank into a clean shallow dish with a little broth and refrigerate at or below 4°C (40°F) within 2 hours. Allow about 45 minutes in the refrigerator to firm for slicing while the bones continue simmering for 30 minutes; do not leave the shank on the counter for that chill.",
    "穩定小滾 2½ 小時後，以乾淨溫度計測整塊牛腱中心：牛肉烤肉塊標準為 63°C（145°F），並靜置 3 分鐘。竹籤能輕易插入是另外的柔嫩度指標，不是安全檢查。將牛腱與少量湯汁放入乾淨淺盤，2 小時內冷藏至 4°C（40°F）以下。冷藏約 45 分鐘使肉變緊實，期間骨頭繼續煮 30 分鐘；不可把牛腱留在室溫等待變涼。",
    "安定した弱い沸騰で2時間半煮たら、清潔な温度計で塊の牛すね肉の中心を測ります。牛肉のローストは63°C（145°F）に達した後3分休ませます。串が軽く入ることは別の柔らかさの目安で、安全確認ではありません。牛すね肉を少量のスープと一緒に清潔な浅い容器に移し、2時間以内に4°C（40°F）以下で冷蔵します。薄切りしやすくするため冷蔵庫で約45分冷やし、その間に骨はさらに30分煮ます。冷えるまで室温に置かないでください。",
    "약하게 일정하게 끓인 지 2시간 30분 뒤 깨끗한 온도계로 통째로 조리한 소 정강이 중심을 잰다. 소고기 로스트는 63°C (145°F)에 도달한 뒤 3분 쉰다. 꼬챙이가 쉽게 들어가는 것은 별도의 부드러움 지표이지 안전 확인이 아니다. 소 정강이를 소량의 국물과 함께 깨끗하고 얕은 용기에 옮겨 2시간 안에 4°C (40°F) 이하로 냉장한다. 썰기 좋게 약 45분 냉장하고 그동안 뼈는 30분 더 끓인다. 식히려고 실온에 두지 않는다.",
    "หลังเคี่ยวเบา ๆ สม่ำเสมอ 2½ ชั่วโมง ใช้เทอร์โมมิเตอร์สะอาดวัดกลางเนื้อหน้าแข้งวัวทั้งชิ้น เนื้อวัวชิ้นใหญ่ใช้ 63°C (145°F) แล้วพัก 3 นาที การที่ไม้เสียบผ่านง่ายเป็นเกณฑ์ความนุ่มแยกต่างหาก ไม่ใช่การตรวจความปลอดภัย ย้ายเนื้อใส่ภาชนะตื้นสะอาดพร้อมน้ำซุปเล็กน้อย แล้วแช่เย็นไม่เกิน 4°C (40°F) ภายใน 2 ชั่วโมง แช่เย็นประมาณ 45 นาทีให้เนื้อแน่นสำหรับหั่น ระหว่างนั้นเคี่ยวกระดูกต่อ 30 นาที อย่าวางเนื้อไว้ที่อุณหภูมิห้องเพื่อรอให้เย็น"
  ));

  setBody(recipe, 6, ml(
    "Strain without pressing the solids. Measure 3 L broth and reduce it uncovered to 2.6 L over about 20–30 minutes. Reserve exactly 200 ml for the blood mixture; the remaining 2.4 L is eight 300 ml bowl portions. Do this reduction while the shank chills.",
    "過濾時勿擠壓固形物。量取 3 公升湯汁，開蓋煮約 20–30 分鐘濃縮至 2.6 公升。準確取出 200 毫升調血液用，剩下 2.4 公升分成八份、每碗 300 毫升。牛腱冷藏時即可進行濃縮。",
    "固形物を押さずにこします。スープ3Lを量り、ふたをせず20〜30分煮詰めて2.6Lにします。血液の合わせ用に200mlを正確に取り分け、残り2.4Lを8杯分、1杯300mlにします。牛すね肉を冷やしている間に煮詰めます。",
    "건더기를 누르지 말고 거른다. 국물 3L를 계량해 뚜껑을 열고 약 20–30분 졸여 2.6L로 만든다. 혈액 혼합용으로 정확히 200ml를 덜고 남은 2.4L는 8그릇에 300ml씩 나눈다. 정강이를 냉장하는 동안 졸인다.",
    "กรองโดยไม่กดของแข็ง ตวงน้ำซุป 3 ลิตร เคี่ยวเปิดฝาประมาณ 20–30 นาทีให้เหลือ 2.6 ลิตร แบ่ง 200 มล. พอดีไว้ผสมเลือด ส่วนที่เหลือ 2.4 ลิตรแบ่งเป็น 8 ชาม ชามละ 300 มล. เคี่ยวลดระหว่างแช่เนื้อหน้าแข้งให้เย็น"
  ));

  setBody(recipe, 7, ml(
    "Use all 40 ml listed neutral oil to cook the remaining 30 g finely chopped garlic over medium-low for 5–7 minutes, stirring, until pale gold. Strain and cool the garlic on a clean plate; keep the aromatic oil. The serving step uses 5 ml per bowl, 40 ml total.",
    "以所列全部 40 毫升中性油，用中小火將剩餘 30 公克蒜末炒 5–7 分鐘，持續攪拌至淡金色。濾出蒜酥並放在乾淨盤中冷卻，保留香蒜油。上桌每碗使用 5 毫升，共 40 毫升。",
    "表示の中性油40ml全量で、残りのにんにく30gのみじん切りを中弱火で5〜7分、混ぜながら薄いきつね色まで炒めます。こしてにんにくを清潔な皿で冷まし、香味油を取っておきます。仕上げは1杯5ml、全8杯で40mlです。",
    "표시된 중성유 40ml 전량을 사용해 남은 다진 마늘 30g을 중약불에서 5–7분 저어가며 옅은 황금색이 될 때까지 익힌다. 걸러 마늘을 깨끗한 접시에서 식히고 향미유는 보관한다. 마무리에 그릇당 5ml씩 총 40ml를 쓴다.",
    "ใช้น้ำมันรสกลาง 40 มล.ตามรายการทั้งหมดผัดกระเทียมสับที่เหลือ 30 กรัมด้วยไฟกลางอ่อน 5–7 นาที คนจนสีเหลืองทองอ่อน กรองและพักกระเทียมบนจานสะอาด เก็บน้ำมันหอมไว้ ตอนจัดชามใช้ชามละ 5 มล. รวม 40 มล."
  ));

  setBody(recipe, 8, ml(
    "Mix all 120 ml rice vinegar with 10 g of the 20 g chile flakes and leave for about 20 minutes while the broth simmers. Keep the remaining 10 g dry for the table; the chile vinegar is a condiment and is not poured into the shared broth.",
    "將全部 120 毫升米醋與 20 公克辣椒碎中的 10 公克混合，趁湯燉煮時靜置約 20 分鐘。剩餘 10 公克保持乾燥供桌邊調味；辣椒醋是個人佐料，不倒入共用湯鍋。",
    "米酢120ml全量と唐辛子フレーク20gのうち10gを混ぜ、スープを煮ている間に約20分置きます。残り10gは乾燥したまま卓上用にします。唐辛子酢は卓上調味料で、共通のスープには入れません。",
    "쌀식초 120ml 전량과 고춧가루 20g 중 10g을 섞어 국물이 끓는 동안 약 20분 둔다. 나머지 10g은 마른 상태로 식탁에 둔다. 칠리 식초는 각자 쓰는 양념이며 공용 국물에는 넣지 않는다.",
    "ผสมน้ำส้มสายชูข้าว 120 มล.ทั้งหมดกับพริกป่น 10 กรัมจากทั้งหมด 20 กรัม พักประมาณ 20 นาทีระหว่างเคี่ยวน้ำซุป เก็บพริกป่นอีก 10 กรัมไว้แห้งสำหรับโต๊ะ น้ำส้มพริกเป็นเครื่องปรุงแยก ไม่เทลงในหม้อซุปส่วนกลาง"
  ));

  setBody(recipe, 9, ml(
    "Whisk the 200 ml chilled pasteurized beef blood with all 15 g rice flour until smooth. Slowly whisk in the reserved 200 ml broth after it cools to about 60°C (140°F). Return the mixture to the refrigerator and keep it below 4°C (40°F) until the final broth step; use only commercially inspected pasteurized blood.",
    "將冷藏的 200 毫升巴氏殺菌牛血與全部 15 公克米粉攪拌至滑順。保留的 200 毫升湯汁降至約 60°C（140°F）後，緩緩攪入。混合物放回冰箱並保持低於 4°C（40°F），直到最後加入湯中；只使用經商業檢驗的巴氏殺菌牛血。",
    "冷蔵した低温殺菌済み牛血200mlと米粉15g全量をなめらかになるまで混ぜます。取り分けたスープ200mlが約60°C（140°F）まで冷めてから、少しずつ混ぜ入れます。最後にスープへ加えるまで冷蔵庫に戻し4°C（40°F）未満を保ちます。商業検査済みの低温殺菌血液のみを使います。",
    "차게 보관한 저온살균 소 혈액 200ml와 쌀가루 15g 전량을 부드럽게 섞는다. 덜어 둔 국물이 약 60°C (140°F)로 식은 뒤 천천히 섞는다. 마지막 국물 단계까지 혼합물을 냉장고에 넣어 4°C (40°F) 미만으로 보관한다. 상업적으로 검사된 저온살균 혈액만 사용한다.",
    "ตีเลือดวัวพาสเจอไรซ์แช่เย็น 200 มล.กับแป้งข้าวเจ้า 15 กรัมทั้งหมดจนเนียน เมื่อน้ำซุปที่แบ่งไว้เย็นลงเหลือประมาณ 60°C (140°F) ค่อย ๆ ตีผสม จากนั้นนำส่วนผสมกลับเข้าตู้เย็นและเก็บต่ำกว่า 4°C (40°F) จนถึงขั้นใส่ในน้ำซุป ใช้เฉพาะเลือดพาสเจอไรซ์ที่ผ่านการตรวจเชิงพาณิชย์"
  ));

  setBody(recipe, 10, ml(
    "Slice the chilled shank 3 mm across the grain. Its cooked yield varies, so divide the entire amount evenly among eight bowls rather than promise a fixed cooked weight. Keep the slices covered at 4°C (40°F) or below until they are reheated in the broth. Arrange eight portions of 80 g noodles, 50 g fully cooked beef balls, 50 g morning glory, and 35 g sprouts; these amounts use the full listed quantities.",
    "牛腱冷藏後逆紋切成 3 毫米薄片。熟後重量會變化，將全部牛肉平均分到八碗，不承諾固定熟重。上桌前加蓋冷藏於 4°C（40°F）以下，待加入湯中復熱。分好八份：每份 80 公克米粉、50 公克已熟牛肉丸、50 公克空心菜與 35 公克豆芽，正好用完所列份量。",
    "冷えた牛すね肉を繊維に逆らって3mmに切ります。調理後の重量は変わるため、固定重量を約束せず全量を8杯に等分します。スープで温め直すまで4°C（40°F）以下で覆って保管します。米麺80g、加熱済み牛肉団子50g、空心菜50g、もやし35gを各8人分用意し、表示量を使い切ります。",
    "차게 식힌 정강이를 결 반대로 3mm 두께로 썬다. 익힌 뒤 중량이 달라지므로 고정 중량을 약속하지 말고 전체를 여덟 그릇에 고르게 나눈다. 국물에서 다시 데울 때까지 덮어 4°C (40°F) 이하로 냉장한다. 쌀국수 80g, 완전히 익힌 소고기 완자 50g, 공심채 50g, 숙주 35g씩 8인분으로 나누면 표시량을 모두 사용한다.",
    "หั่นเนื้อหน้าแข้งที่แช่เย็นหนา 3 มม. ตามขวางเส้นใย น้ำหนักหลังปรุงเปลี่ยนได้ จึงแบ่งทั้งหมดเท่า ๆ กัน 8 ชามโดยไม่กำหนดน้ำหนักสุกตายตัว ปิดฝาแช่ที่ไม่เกิน 4°C (40°F) จนกว่าจะอุ่นในน้ำซุป เตรียมเส้น 80 กรัม ลูกชิ้นวัวสุกแล้ว 50 กรัม ผักบุ้ง 50 กรัม และถั่วงอก 35 กรัมต่อชาม รวม 8 ส่วน ใช้วัตถุดิบที่ระบุครบ"
  ));

  setBody(recipe, 11, ml(
    "Keep the 4 L blanching water boiling. For each of eight bowls, blanch 80 g noodles, 50 g morning glory, and 35 g sprouts for 30–45 seconds until the noodles are tender and greens are bright; drain for 15 seconds into a warm bowl. This stage takes about 6–8 minutes for eight baskets and runs while the broth is reheated.",
    "保持 4 公升汆燙水沸騰。八碗分別汆燙 80 公克米粉、50 公克空心菜與 35 公克豆芽，每份 30–45 秒，至米粉柔軟、青菜鮮亮；瀝 15 秒後放入溫碗。八份約需 6–8 分鐘，可在湯汁復熱時同步進行。",
    "湯で水4Lを沸騰させます。8杯それぞれに、麺80g、空心菜50g、もやし35gを入れ、麺が柔らかく青菜が鮮やかになるまで30〜45秒ゆで、15秒水を切って温めた器へ移します。8回で約6〜8分かかり、スープの再加熱と並行できます。",
    "데칠 물 4L를 계속 끓인다. 여덟 그릇 각각에 쌀국수 80g, 공심채 50g, 숙주 35g을 넣어 면이 부드럽고 채소가 선명해질 때까지 30–45초 데친 다음 15초 물을 빼 따뜻한 그릇에 담는다. 여덟 번에 약 6–8분 걸리며 국물 재가열과 병행한다.",
    "ต้มน้ำลวก 4 ลิตรให้เดือด สำหรับ 8 ชาม ลวกเส้นชามละ 80 กรัม ผักบุ้ง 50 กรัม และถั่วงอก 35 กรัม นาน 30–45 วินาทีจนเส้นนุ่มและผักสีสด สะเด็ด 15 วินาทีแล้วใส่ชามอุ่น การลวก 8 รอบใช้ประมาณ 6–8 นาที ทำพร้อมกับการอุ่นน้ำซุปได้"
  ));

  setBody(recipe, 12, ml(
    "Bring the dark broth to a steady simmer and reheat all 400 g fully cooked beef balls for about 5 minutes; check a centre reaches 74°C (165°F), the leftover/reheating endpoint. This is a cooked product, so do not substitute the 71°C (160°F) rule for cooking raw ground beef. Lower the heat, whisk in the cold blood mixture gradually, and stir constantly for 3–4 minutes until the whole broth reaches at least 74°C (165°F).",
    "將深色湯汁維持小滾，將全部 400 公克已熟牛肉丸復熱約 5 分鐘；測中心達 74°C（165°F），這是熟食復熱標準。這是已熟產品，不可改用生絞牛肉烹煮的 71°C（160°F）標準。轉小火，逐漸拌入冷藏血液混合物，持續攪拌 3–4 分鐘，至整鍋湯汁至少達 74°C（165°F）。",
    "濃いスープを安定した弱い沸騰にし、加熱済み牛肉団子400g全量を約5分温め直します。中心が74°C（165°F）に達したことを確認します。これは再加熱の基準です。加熱済み製品なので、生のひき肉を調理する71°C（160°F）基準とは区別します。火を弱め、冷たい血液の合わせ液を少しずつ加え、全体が少なくとも74°Cになるまで3〜4分絶えず混ぜます。",
    "진한 국물을 약하게 계속 끓이고 완전히 익힌 소고기 완자 400g 전량을 약 5분 다시 데운다. 중심이 74°C (165°F)에 도달하는지 확인한다. 이는 재가열 기준이다. 익힌 제품이므로 생 다진 소고기를 조리하는 71°C (160°F) 기준을 대신 적용하지 않는다. 불을 낮추고 차가운 혈액 혼합물을 조금씩 저어 넣어 전체 국물이 최소 74°C가 될 때까지 3–4분 계속 젓는다.",
    "ตั้งน้ำซุปเข้มข้นให้เดือดเบา ๆ แล้วอุ่นลูกชิ้นวัวที่สุกแล้ว 400 กรัมทั้งหมดประมาณ 5 นาที ตรวจให้กลางลูกถึง 74°C (165°F) ซึ่งเป็นเกณฑ์อุ่นอาหารสุก นี่เป็นผลิตภัณฑ์ที่สุกแล้ว จึงไม่ใช้เกณฑ์ 71°C (160°F) สำหรับปรุงเนื้อบดดิบ ลดไฟ ค่อย ๆ ใส่ส่วนผสมเลือดเย็นและคนตลอด 3–4 นาทีจนทั้งหม้อมีอุณหภูมิอย่างน้อย 74°C (165°F)"
  ));

  setBody(recipe, 13, ml(
    "Give each of eight bowls the full portion of noodles and vegetables, an even share of cooked shank, and 50 g hot beef balls. Ladle 300 ml hot blood-enriched broth into each bowl (2.4 L total). Divide all 40 g basil, 35 g celery/cilantro, and 30 g fried garlic across the bowls; use 5 ml garlic oil per bowl. Serve the 120 ml chile vinegar and remaining 10 g dry chile at the table. Keep the soup at or above 60°C (140°F) if it is held before serving.",
    "八碗各放一份米粉和蔬菜、平均分配的熟牛腱，以及 50 公克熱牛肉丸。每碗舀入 300 毫升加血濃湯（共 2.4 公升）。將全部 40 公克羅勒、35 公克芹菜／香菜與 30 公克蒜酥分到八碗，每碗淋 5 毫升蒜油。120 毫升辣椒醋與剩餘 10 公克乾辣椒另放桌邊。若上桌前暫放，湯需保持 60°C（140°F）以上。",
    "8杯それぞれに麺と野菜の1人分、牛すね肉を均等に分けた分、熱い牛肉団子50gを盛ります。血液入りの熱いスープを1杯300ml、計2.4L注ぎます。バジル40g全量、セロリ／香菜35g、揚げにんにく30gを8杯に分け、香味油は1杯5ml使います。唐辛子酢120mlと残りの乾燥唐辛子10gは卓上に出します。配膳まで保温する場合は60°C（140°F）以上を保ちます。",
    "여덟 그릇에 면과 채소 한 몫, 익힌 정강이를 고르게 나눈 양, 뜨거운 소고기 완자 50g씩 담는다. 혈액을 넣은 뜨거운 국물은 그릇당 300ml, 총 2.4L를 붓는다. 바질 40g 전량, 셀러리/고수 35g, 튀긴 마늘 30g을 나누고 마늘기름은 그릇당 5ml 쓴다. 칠리 식초 120ml와 마른 고추 10g은 식탁에 따로 낸다. 서빙 전 보온한다면 국물을 60°C (140°F) 이상으로 유지한다.",
    "จัดเส้นและผักหนึ่งส่วน เนื้อหน้าแข้งที่แบ่งเท่ากัน และลูกชิ้นร้อน 50 กรัมลงในแต่ละชามทั้ง 8 ชาม ตักน้ำซุปใส่เลือดร้อนชามละ 300 มล. รวม 2.4 ลิตร แบ่งใบโหระพา 40 กรัม ขึ้นฉ่าย/ผักชี 35 กรัม และกระเทียมเจียว 30 กรัมให้ครบทั้งชาม ใช้น้ำมันกระเทียมชามละ 5 มล. เสิร์ฟน้ำส้มพริก 120 มล.และพริกแห้งที่เหลือ 10 กรัมแยกที่โต๊ะ หากพักรอก่อนเสิร์ฟให้รักษาซุปที่ 60°C (140°F) ขึ้นไป"
  ));

  recipe.storage = ml(
    "Cool broth, cooked shank, and beef balls in separate shallow containers and refrigerate within 2 hours at or below 4°C (40°F). Keep noodles and fresh greens separate. Use within 2 days for best noodle texture; that is a quality preference, while FoodSafety.gov lists soups/stews and cooked meat leftovers at 3–4 days. Reheat only one portion once, stirring until the broth and meatballs reach 74°C (165°F) throughout. No cooked rice is used in this recipe.",
    "湯汁、熟牛腱與牛肉丸分別放入淺容器，2 小時內冷藏至 4°C（40°F）以下；米粉和新鮮青菜分開保存。為保持米粉口感，建議 2 天內食用，這是品質偏好；FoodSafety.gov 對湯／燉菜與熟肉剩菜列為 3–4 天。每次只取一份復熱一次，持續攪拌至湯汁與牛肉丸各處達 74°C（165°F）。本食譜不使用熟飯。",
    "スープ、加熱済み牛すね肉、牛肉団子は別々の浅い容器に分け、2時間以内に4°C（40°F）以下で冷蔵します。麺と生の青菜は別に保管します。麺の食感のため2日以内を勧めますが、これは品質上の目安です。FoodSafety.govはスープ・煮込み料理と調理済み肉の残り物を3〜4日としています。1人分だけ一度再加熱し、混ぜながらスープと団子全体を74°C（165°F）にします。この料理に炊いた米は使いません。",
    "국물, 익힌 정강이, 소고기 완자를 각각 얕은 용기에 나눠 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. 면과 생채소는 따로 보관한다. 면 식감을 위해 2일 이내 섭취를 권하지만 이는 품질 선호다. FoodSafety.gov는 수프·스튜와 조리된 고기 남은 음식을 3–4일로 안내한다. 한 번에 한 몫만 재가열하고 저어가며 국물과 완자 전체가 74°C (165°F)가 되게 한다. 이 요리에는 밥이 들어가지 않는다.",
    "แบ่งน้ำซุป เนื้อหน้าแข้งสุก และลูกชิ้นใส่ภาชนะตื้นแยกกัน แช่เย็นภายใน 2 ชั่วโมงที่อุณหภูมิไม่เกิน 4°C (40°F) เก็บเส้นและผักสดแยกกัน เพื่อรักษาเนื้อสัมผัสของเส้นแนะนำให้ใช้ใน 2 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุซุป/สตูและอาหารเนื้อสุกแช่เย็น 3–4 วัน อุ่นครั้งละหนึ่งส่วนเพียงครั้งเดียว คนจนน้ำซุปและลูกชิ้นทั่วถึง 74°C (165°F) สูตรนี้ไม่มีข้าวสุก"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseTakoyaki(recipe) {
  setBody(recipe, 0, ml(
    "Cut the 180 g fully cooked octopus into 24 equal pieces, about 7.5 g each. Pat dry and keep covered in the refrigerator at or below 4°C (40°F) until filling; this is cooked octopus, not raw seafood.",
    "將 180 公克已熟章魚切成 24 等份，每份約 7.5 公克。擦乾後加蓋冷藏於 4°C（40°F）以下，直到填入麵糊；這是已熟章魚，不是生海鮮。",
    "加熱済みのたこ180gを24等分し、1個約7.5gにします。水気を拭き、具に使うまでふたをして4°C（40°F）以下で冷蔵します。これは加熱済みのたこで、生の魚介類ではありません。",
    "완전히 익힌 문어 180g을 약 7.5g씩 24등분한다. 물기를 닦고 속재료로 쓸 때까지 덮어 4°C (40°F) 이하로 냉장한다. 생해산물이 아니라 익힌 문어다.",
    "หั่นปลาหมึกยักษ์ที่สุกแล้ว 180 กรัมเป็น 24 ชิ้นเท่า ๆ กัน ชิ้นละประมาณ 7.5 กรัม ซับให้แห้ง ปิดฝาแช่เย็นไม่เกิน 4°C (40°F) จนกว่าจะนำไปใส่ นี่คือปลาหมึกที่สุกแล้ว ไม่ใช่อาหารทะเลดิบ"
  ));

  setBody(recipe, 1, ml(
    "Whisk 120 g flour, 4 g baking powder, and 3 g salt with all 360 ml dashi. Beat in the two eggs (100 g total) and 5 ml soy sauce. Cover and rest the batter for 10 minutes in the refrigerator because it contains raw eggs; keep it chilled between batches.",
    "將 120 公克麵粉、4 公克泡打粉與 3 公克鹽，和全部 360 毫升高湯攪勻。加入兩顆蛋（共 100 公克）與 5 毫升醬油打勻。麵糊含生蛋，須加蓋冷藏靜置 10 分鐘，兩批之間也保持冷藏。",
    "小麦粉120g、ベーキングパウダー4g、塩3gをだし360ml全量で混ぜます。卵2個（計100g）としょうゆ5mlを加えて溶きます。生卵を含むため、ふたをして冷蔵庫で10分休ませ、2回目まで冷やしておきます。",
    "밀가루 120g, 베이킹파우더 4g, 소금 3g을 다시마 육수 360ml 전량과 섞는다. 달걀 두 개(총 100g)와 간장 5ml를 풀어 넣는다. 생달걀이 들어 있으므로 덮어 냉장고에서 10분 휴지하고 두 번째 배치까지 차게 보관한다.",
    "ผสมแป้ง 120 กรัม ผงฟู 4 กรัม และเกลือ 3 กรัมกับน้ำดาชิ 360 มล.ทั้งหมด ตีไข่ 2 ฟอง (รวม 100 กรัม) และซีอิ๊ว 5 มล.ลงไป ปิดฝาพักแป้งในตู้เย็น 10 นาทีเพราะมีไข่ดิบ และเก็บให้เย็นระหว่างทำสองรอบ"
  ));

  setBody(recipe, 2, ml(
    "Heat a clean 24-hole pan over medium until its surface is about 200°C, a browning and shaping estimate only. Brush all wells with the listed 30 ml oil across both batches. Keep two clean picks and a food thermometer ready; pan-surface temperature is not the egg-doneness check.",
    "將乾淨的 24 孔章魚燒烤盤以中火加熱至表面約 200°C，這只是上色與成形的估計值。兩批合計使用所列全部 30 毫升油塗刷各孔。備好兩支乾淨竹籤與食物溫度計；烤盤表面溫度不是蛋料理的熟度檢查。",
    "清潔した24穴のたこ焼き器を中火で温め、表面を約200°Cにします。これは焼き色と形作りの目安にすぎません。表示の油30ml全量を2回分に使い、各穴に塗ります。清潔なピック2本と温度計を用意します。鉄板表面の温度は卵の火通り確認ではありません。",
    "깨끗한 24구 팬을 중불로 달궈 표면을 약 200°C로 맞춘다. 이는 갈변과 모양을 위한 예상치일 뿐이다. 표시된 기름 30ml 전량을 두 배치에 나누어 모든 구멍에 바른다. 깨끗한 꼬치 두 개와 식품 온도계를 준비한다. 팬 표면 온도는 달걀 익힘 확인이 아니다.",
    "ตั้งกระทะทาโกะยากิสะอาด 24 หลุมด้วยไฟกลางให้พื้นผิวประมาณ 200°C ซึ่งเป็นเพียงค่าประมาณสำหรับสีและรูปทรง ใช้น้ำมัน 30 มล.ตามรายการทั้งหมดทาหลุมทั้งสองรอบ เตรียมไม้จิ้มสะอาดสองอันและเทอร์โมมิเตอร์ อุณหภูมิผิวกระทะไม่ใช่การตรวจความสุกของไข่"
  ));

  setBody(recipe, 3, ml(
    "Use half the batter, octopus, and 30 g tenkasu for the first 12 wells; reserve the other half covered in the refrigerator. Use one equal octopus piece per well and divide the batter evenly. Keep raw egg batter and cooked octopus in separate covered containers until each batch is filled.",
    "第一批 12 孔使用一半麵糊、章魚與 30 公克天婦羅花；另一半加蓋冷藏。每孔放一塊等份章魚，麵糊平均分配。每批填孔前，生蛋麵糊與熟章魚分別加蓋保存。",
    "最初の12穴には生地、たこ、天かすを半量ずつ使い、残り半分はふたをして冷蔵します。各穴に同じ大きさのたこを1個入れ、生地を均等に分けます。投入する直前まで生卵入り生地と加熱済みのたこは別々に覆って保管します。",
    "첫 12구에는 반죽, 문어, 덴카스를 절반씩 사용하고 나머지 절반은 덮어 냉장한다. 구멍마다 같은 크기의 문어 한 조각을 넣고 반죽을 고르게 나눈다. 각 배치를 채우기 전까지 생달걀 반죽과 익힌 문어를 덮어 따로 보관한다.",
    "ใช้แป้ง ปลาหมึก และเทมปุระกรอบ 30 กรัมครึ่งหนึ่งสำหรับ 12 หลุมแรก อีกครึ่งหนึ่งปิดฝาแช่เย็น ใส่ปลาหมึกชิ้นเท่ากันหลุมละชิ้นและแบ่งแป้งให้เท่ากัน เก็บแป้งไข่ดิบกับปลาหมึกสุกแยกภาชนะมีฝาปิดจนกว่าจะเติมแต่ละรอบ"
  ));

  setBody(recipe, 6, ml(
    "Transfer the first 12 balls to a clean plate. Repeat with the refrigerated second half and the remaining 30 g tenkasu. From each batch, check the centre of one ball with a clean thermometer: an egg dish must reach 71°C (160°F). The octopus starts fully cooked; the 74°C (165°F) value applies when reheating finished leftovers, not to the raw egg-batter cooking category.",
    "第一批 12 顆移至乾淨盤子。以冷藏的另一半麵糊與剩餘 30 公克天婦羅花重複操作。每批各取一顆，以乾淨溫度計測中心：蛋料理須達 71°C（160°F）。章魚原本已熟；74°C（165°F）適用於復熱成品剩菜，不是生蛋麵糊的烹煮類別。",
    "最初の12個を清潔な皿へ移します。冷蔵した残り半量の生地と天かす30g全量で繰り返します。各回から1個選び、清潔な温度計で中心を測ります。卵料理は71°C（160°F）が必要です。たこは初めから加熱済みです。74°C（165°F）は調理済みの残り物を再加熱する基準で、生卵入り生地の調理分類とは別です。",
    "첫 12개를 깨끗한 접시에 옮긴다. 냉장한 나머지 반죽과 남은 덴카스 30g으로 반복한다. 각 배치에서 한 알을 골라 깨끗한 온도계로 중심을 잰다. 달걀 요리는 71°C (160°F)에 도달해야 한다. 문어는 처음부터 익힌 제품이다. 74°C (165°F)는 조리된 남은 음식을 재가열할 때의 기준이며 생달걀 반죽 조리 기준과 다르다.",
    "ย้ายลูกแรก 12 ลูกลงจานสะอาด ทำซ้ำด้วยแป้งที่แช่เย็นและเทมปุระกรอบ 30 กรัมที่เหลือ จากแต่ละรอบเลือกหนึ่งลูกวัดตรงกลางด้วยเทอร์โมมิเตอร์สะอาด อาหารที่มีไข่ต้องถึง 71°C (160°F) ปลาหมึกสุกมาแล้ว ค่า 74°C (165°F) ใช้เมื่ออุ่นทาโกะยากิที่เป็นอาหารเหลือ ไม่ใช่ประเภทการปรุงแป้งไข่ดิบ"
  ));

  setBody(recipe, 7, ml(
    "Divide all 24 hot balls among four plates, six each. Per plate, measure 30 g sauce, 20 g mayonnaise, 1 g aonori, and 2 g katsuobushi; these use the full listed toppings. Serve at once while crisp. Do not add an unlisted garnish.",
    "將全部 24 顆熱章魚燒分成四盤，每盤六顆。每盤量取 30 公克醬汁、20 公克美乃滋、1 公克海苔粉與 2 公克柴魚片，正好用完所列配料。趁外皮酥脆立即上桌，不加未列出的裝飾。",
    "熱いたこ焼き24個を4皿に6個ずつ分けます。各皿にソース30g、マヨネーズ20g、青のり1g、かつお節2gを計量してのせます。表示したトッピングをすべて使い切ります。外側がカリッとしているうちにすぐ出し、材料にない飾りは加えません。",
    "뜨거운 타코야키 24개를 네 접시에 여섯 개씩 나눈다. 접시마다 소스 30g, 마요네즈 20g, 아오노리 1g, 가쓰오부시 2g을 계량한다. 표시된 토핑을 전부 사용한다. 겉이 바삭할 때 바로 내고 목록에 없는 장식은 더하지 않는다.",
    "แบ่งทาโกะยากิร้อนทั้ง 24 ลูกลง 4 จาน จานละ 6 ลูก ตวงซอส 30 กรัม มายองเนส 20 กรัม อาโอโนริ 1 กรัม และคัตสึโอะบุชิ 2 กรัมต่อจาน ใช้ท็อปปิงที่ระบุครบ เสิร์ฟทันทีขณะที่กรอบและไม่เติมของตกแต่งที่ไม่ได้ระบุ"
  ));

  recipe.storage = ml(
    "For best crispness, serve immediately. Refrigerate plain cooked balls without toppings in shallow containers within 2 hours at or below 4°C (40°F). Use within 2 days for texture; this is a quality preference, while FoodSafety.gov lists cooked egg dishes at 3–4 days. Reheat only the portion needed until the centre reaches 74°C (165°F), then add fresh measured toppings. The 71°C (160°F) egg-dish value is for cooking the raw batter, not reheating leftovers.",
    "為保持酥脆，建議立即食用。未加配料的熟章魚燒放入淺容器，2 小時內冷藏至 4°C（40°F）以下。為口感建議 2 天內食用，這是品質偏好；FoodSafety.gov 對熟蛋料理列為 3–4 天。只取所需份量復熱至中心達 74°C（165°F），再加新鮮且量好的配料。71°C（160°F）是生麵糊蛋料理的烹煮標準，不是剩菜復熱標準。",
    "食感を保つため、できたてをすぐに出します。ソースをかけていない加熱済みのたこ焼きは浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。食感のため2日以内を勧めますが、これは品質上の目安です。FoodSafety.govは調理済み卵料理を3〜4日としています。食べる分だけ中心を74°C（165°F）まで再加熱してから、新しいトッピングをのせます。卵料理の71°C（160°F）は生地を調理する基準で、残り物の再加熱基準ではありません。",
    "바삭함을 위해 바로 낸다. 토핑을 올리지 않은 익힌 공은 얕은 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. 식감을 위해 2일 이내 섭취를 권하지만 이는 품질 선호다. FoodSafety.gov는 익힌 달걀 요리를 3–4일로 안내한다. 먹을 만큼만 중심이 74°C (165°F)가 되도록 재가열한 뒤 새 토핑을 계량해 올린다. 달걀 요리 71°C (160°F)는 생반죽 조리 기준이지 남은 음식 재가열 기준이 아니다.",
    "เพื่อความกรอบควรเสิร์ฟทันที เก็บลูกที่สุกแล้วแต่ยังไม่ราดซอสในภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมงที่ไม่เกิน 4°C (40°F) เพื่อเนื้อสัมผัสแนะนำให้ใช้ใน 2 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุอาหารไข่สุกแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ตรงกลางถึง 74°C (165°F) แล้วเติมท็อปปิงที่ตวงใหม่ ค่า 71°C (160°F) ใช้ปรุงแป้งไข่ดิบ ไม่ใช่อุ่นอาหารเหลือ"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: What You Need to Know About Egg Safety", eggSafety);
}

export function refineFiftyNinthMethods(recipes) {
  const targets = ["green-curry-chicken", "boeuf-bourguignon", "boat-noodles", "takoyaki"];
  for (const id of targets) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error("Recipe method audit 59: missing recipe " + id);
    const revised = cloneForPublication(recipes[index]);
    if (id === "green-curry-chicken") reviseGreenCurry(revised);
    if (id === "boeuf-bourguignon") reviseBoeufBourguignon(revised);
    if (id === "boat-noodles") reviseBoatNoodles(revised);
    if (id === "takoyaki") reviseTakoyaki(revised);
    recipes[index] = revised;
  }
  return recipes;
}
