const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, item: { ...row.item } })),
    instructions: recipe.instructions.map((entry) => ({
      ...entry,
      title: { ...entry.title },
      body: { ...entry.body }
    })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function ingredient(recipe, startsWith, localized) {
  const row = recipe.ingredients.find((entry) => entry.item.en.startsWith(startsWith));
  if (!row) throw new Error(`${recipe.id}: missing ingredient beginning with ${startsWith}`);
  row.item = localized;
}

function step(recipe, title, body) {
  const target = recipe.instructions.find((entry) => entry.title.en === title);
  if (!target) throw new Error(`${recipe.id}: missing step for fifty-third method review: ${title}`);
  target.body = body;
}

function addOfficial(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${title}`, url });
  }
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const seafood = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const flour = "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know";

function reviseTodMunPla(recipe) {
  recipe.prepMinutes = 50;
  recipe.cookMinutes = 25;
  recipe.totalMinutes = 75;
  ingredient(recipe, "skinless boneless very cold white-fish fillet", ml(
    "skinless boneless very cold white-fish fillet, 2 cm cubes; 700 g raw fish is about 117 g per serving",
    "去皮去骨白肉魚柳，切 2 公分塊；700 公克生魚約每份 117 公克",
    "皮と骨を除いた冷たい白身魚の切り身、2cm角。生魚700gは1人分約117g",
    "껍질과 뼈를 제거해 차갑게 한 흰살생선 필레, 2cm 깍둑썰기. 생선 700g은 1인분 약 117g",
    "เนื้อปลาขาวเย็นจัดเอาหนังและก้างออก หั่นเต๋า 2 ซม. ปลา 700 กรัมคิดเป็นประมาณ 117 กรัมต่อที่"
  ));

  step(recipe, "Fry one safety tester", ml(
    "Heat the listed 1 L oil in a deep pot no more than one-third full to 170°C; this is a frying-process setting for puffing and browning, not a food-safety temperature. Shape a separate 20 g, 1 cm-thick tester and fry for an estimated 2–3 minutes, turning once. Check its centre reaches the official fish endpoint of 63°C (145°F), or that the flesh is opaque and separates easily with a fork. Only then taste it to adjust seasoning; this tester is separate from the 24 cakes.",
    "將清單中的 1 公升油倒入深鍋，油面不可超過鍋深三分之一，加熱至 170°C；這是讓魚餅膨起上色的油炸設定，不是食安溫度。另取 20 公克魚漿壓成 1 公分厚試炸餅，翻面炸約 2–3 分鐘（估值）。測量中心達官方魚類熟度 63°C（145°F），或確認魚肉不透明且可用叉子輕易剝開後，才品嚐調味；試炸餅不計入 24 個魚餅中。",
    "表示の揚げ油1Lを深鍋に入れ、鍋の深さの3分の1を超えないようにし、170°Cに熱します。これは膨らみと焼き色のための油温設定で、安全温度ではありません。別に20gのたねを厚さ1cmに成形し、目安として2〜3分、途中で返して揚げます。中心が魚の公式基準63°C（145°F）に達したこと、または身が不透明でフォークで簡単にほぐれることを確認します。その後で味を見て調味を調整します。この試食用は24個には含めません。",
    "표시된 튀김유 1L를 깊은 냄비에 붓되 냄비 깊이의 3분의 1을 넘기지 않게 하고 170°C로 가열한다. 이 기름 온도는 부풀고 노릇하게 튀기기 위한 공정 설정이지 식품 안전 온도가 아니다. 별도로 반죽 20g을 두께 1cm 패티로 만들어 약 2–3분(추정치) 튀기고 한 번 뒤집는다. 중심이 생선 공식 안전 기준인 63°C (145°F)에 도달했거나 살이 불투명하고 포크로 쉽게 갈라지는지 확인한다. 그 뒤에만 맛을 보고 간을 조절한다. 이 시험용 패티는 24개에 포함하지 않는다.",
    "ใส่น้ำมันทอดตามรายการ 1 ลิตรในหม้อลึก โดยน้ำมันสูงไม่เกินหนึ่งในสามของหม้อ ตั้งถึง 170°C ค่านี้เป็นการตั้งน้ำมันเพื่อให้พองและเหลือง ไม่ใช่อุณหภูมิความปลอดภัย ปั้นส่วนทดสอบแยก 20 กรัม หนา 1 ซม. ทอดประมาณ 2–3 นาที (เป็นค่าประมาณ) พลิกหนึ่งครั้ง ตรวจตรงกลางให้ถึงเกณฑ์ทางการของปลาที่ 63°C (145°F) หรือเนื้อทึบแสงและแยกออกง่ายด้วยส้อม แล้วจึงชิมเพื่อปรับรส ชิ้นทดสอบนี้ไม่นับรวมใน 24 ชิ้น"
  ));

  step(recipe, "Shape equal thin cakes", ml(
    "After setting aside the separate 20 g tester, weigh and divide all remaining paste evenly into 24 portions (about 40–42 g each with the listed ingredients). Flatten each to 6 cm wide and 1 cm thick. This makes four cakes per each of 6 servings; keep shaped cakes chilled in one layer until frying.",
    "另取 20 公克試炸餅後，將剩餘魚漿秤重並平均分成 24 份（依所列材料，每份約 40–42 公克），壓成直徑 6 公分、厚 1 公分薄餅。六份餐點各有四個；待炸的魚餅單層冷藏。",
    "別に20gの試食用を取り分けた後、残りのたねを量って24等分します（記載の材料なら1個約40〜42g）。直径6cm、厚さ1cmに平らにします。6人分として1人4個になり、揚げるまでは一層に並べて冷蔵します。",
    "별도 시험용 20g을 덜어 둔 뒤 남은 반죽을 재서 24등분한다(표시된 재료 기준 한 개 약 40–42g). 지름 6cm, 두께 1cm로 납작하게 만든다. 6인분으로 한 사람당 4개이며, 튀기기 전까지 한 층으로 냉장한다.",
    "แยกชิ้นทดสอบ 20 กรัมไว้ก่อน ชั่งและแบ่งเนื้อปลาที่เหลือเป็น 24 ส่วนเท่า ๆ กัน (ประมาณ 40–42 กรัมต่อชิ้นตามวัตถุดิบที่ระบุ) กดให้กว้าง 6 ซม. หนา 1 ซม. ได้ 6 ที่ ที่ละ 4 ชิ้น วางชั้นเดียวและแช่เย็นจนถึงเวลาทอด"
  ));

  step(recipe, "Fry at a stable 170°C", ml(
    "Fry six cakes at a time in four batches. The 3–4 minutes per batch is an estimate for 1 cm cakes, not a safety test; turn once and check the thickest cake in each batch at the centre for 63°C (145°F), or opaque flesh that separates easily with a fork. Keep cakes cold until each batch enters the oil, let the oil return to the recipe setting between batches, and drain on a rack so steam does not soften the crust.",
    "每次炸六個，共四批。每批 3–4 分鐘是 1 公分魚餅的估時，不是熟度測試；翻面一次，並測量每批最厚魚餅中心達 63°C（145°F），或確認魚肉不透明且可用叉子輕易剝開。每批下鍋前都讓魚餅維持冷藏，批次間讓油溫回到食譜設定，炸好放網架瀝油，避免蒸氣弄軟外皮。",
    "6個ずつ4回に分けて揚げます。1cm厚なら1回3〜4分が目安ですが、安全確認ではありません。途中で一度返し、各回の最も厚い魚餅の中心が63°C（145°F）に達したこと、または身が不透明でフォークで簡単にほぐれることを確認します。各回の直前まで魚餅を冷蔵し、次の回の前に油を設定温度へ戻します。蒸気で衣が柔らかくならないよう網で油を切ります。",
    "한 번에 6개씩 네 번 튀긴다. 1cm 두께 기준 3–4분은 추정 조리 시간이지 안전 확인이 아니다. 한 번 뒤집고 각 배치에서 가장 두꺼운 어묵 중심이 63°C (145°F)에 도달했거나 살이 불투명하고 포크로 쉽게 갈라지는지 확인한다. 각 배치 직전까지 어묵을 차갑게 두고, 다음 배치 전 기름 온도를 설정값으로 되돌린다. 증기로 튀김옷이 눅눅해지지 않도록 망에서 기름을 뺀다.",
    "ทอดครั้งละ 6 ชิ้น รวม 4 รอบ เวลา 3–4 นาทีต่อรอบเป็นค่าประมาณสำหรับชิ้นหนา 1 ซม. ไม่ใช่การทดสอบความปลอดภัย พลิกหนึ่งครั้งและตรวจชิ้นที่หนาที่สุดของแต่ละรอบตรงกลางให้ถึง 63°C (145°F) หรือเนื้อทึบแสงและแยกง่ายด้วยส้อม เก็บชิ้นที่รอทอดให้เย็นจนถึงแต่ละรอบ และรอให้น้ำมันกลับสู่อุณหภูมิตามสูตรก่อนรอบถัดไป พักบนตะแกรงเพื่อไม่ให้ไอน้ำทำให้ผิวนิ่ม"
  ));

  step(recipe, "Mix fresh sauce and serve", ml(
    "Just before serving, mix the 120 ml sweet chile sauce with all 120 g cucumber, 40 g peanuts, and half of the 20 g cilantro; keep the rest of the cilantro for garnish. Divide the mixture six ways: each serving gets about 20 ml of the listed sauce, 20 g cucumber, and 6–7 g peanuts, with the mixed-in cilantro shared evenly. Serve the 24 hot cakes four per person (about 117 g raw fish per serving). Serve promptly for crisp edges; that short window is for texture.",
    "上桌前才將 120 毫升甜辣醬、全部 120 公克小黃瓜、40 公克花生與一半 20 公克香菜拌勻，剩餘香菜留作裝飾。醬料配料平均分成六份：每份約 20 毫升甜辣醬、20 公克小黃瓜及 6–7 公克花生，拌入的香菜也平均分配。24 個熱魚餅每人四個（每份約含 117 公克生魚）。趁外緣酥脆盡快上桌；這個時間是口感建議。",
    "提供直前にスイートチリソース120ml、きゅうり120g、ピーナッツ40g、香菜20gの半量を混ぜ、残りの香菜は飾りに取っておきます。たれを6等分し、1人分はソース約20ml、きゅうり20g、ピーナッツ約6〜7gとし、混ぜた香菜も均等に分けます。熱い魚餅24個は1人4個ずつです（生魚換算で約117g/人）。縁の食感のため早めに提供します。この時間は品質上の目安です。",
    "내기 직전에 스위트 칠리소스 120ml, 오이 120g, 땅콩 40g, 고수 20g의 절반을 섞고 나머지 고수는 고명으로 남긴다. 소스 재료를 여섯 몫으로 나누면 1인분에 소스 약 20ml, 오이 20g, 땅콩 약 6–7g이며 섞은 고수도 고르게 나눈다. 뜨거운 어묵 24개는 한 사람당 4개씩 낸다(1인분에 생선 약 117g 사용). 바삭한 가장자리를 위해 바로 낸다. 이 시간 안내는 식감에 관한 것이다.",
    "ก่อนเสิร์ฟจึงผสมน้ำจิ้มไก่หวาน 120 มล. แตงกวา 120 กรัม ถั่วลิสง 40 กรัม และผักชีครึ่งหนึ่งจากทั้งหมด 20 กรัม เก็บผักชีที่เหลือไว้โรยหน้า แบ่งส่วนผสมน้ำจิ้มเป็น 6 ส่วน แต่ละที่ได้ฐานน้ำจิ้มประมาณ 20 มล. แตงกวา 20 กรัม และถั่วลิสงประมาณ 6–7 กรัม พร้อมแบ่งผักชีที่ผสมไว้ให้เท่า ๆ กัน เสิร์ฟทอดมันร้อน 24 ชิ้น ที่ละ 4 ชิ้น (คิดเป็นปลาดิบประมาณ 117 กรัมต่อที่) เสิร์ฟทันทีเพื่อให้ขอบกรอบ ช่วงเวลานี้เป็นคำแนะนำด้านเนื้อสัมผัส"
  ));

  recipe.storage = ml(
    "For crisp edges, serve within about 15 minutes; this is a quality preference. Put fish cakes and any cucumber sauce in separate shallow containers and refrigerate within 2 hours at 4°C (40°F) or below. FoodSafety.gov's cold-storage chart lists finfish refrigerator categories but no cooked-fish leftover window; this recipe's 2-day suggestion is for texture, not an official safety cutoff. Reheat only the amount needed until steaming and 74°C (165°F) throughout.",
    "為保持外緣酥脆，建議約 15 分鐘內上桌，這是品質選擇。魚餅與小黃瓜醬汁分別放入淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 的冷藏表列出魚類冷藏項目，但沒有列熟魚剩食期限；本食譜的 2 天建議是口感偏好，不是官方食安期限。只回熱要吃的份量，直到各處冒熱氣且達 74°C（165°F）。",
    "縁の食感のため約15分以内に提供するのがおすすめです。魚餅ときゅうりだれを別々の浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govの冷蔵表には魚の保存項目がありますが、調理済み魚の残り物期間は記載していません。このレシピの2日以内という目安は食感のためで、公式の安全期限ではありません。食べる分だけ、全体が湯気を立て74°C（165°F）に達するまで温め直します。",
    "바삭함을 위해 약 15분 안에 내는 것이 좋으며 이는 품질상 권장이다. 어묵과 오이 소스는 얕은 용기에 따로 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov 냉장 보관표에는 생선 냉장 항목은 있지만 조리한 생선 남은 음식의 기간은 없다. 이 레시피의 2일 권장은 식감을 위한 것이며 공식 안전 기한이 아니다. 먹을 만큼만 전체에서 김이 나고 74°C (165°F)에 도달할 때까지 다시 데운다.",
    "เพื่อให้ขอบกรอบควรเสิร์ฟภายในประมาณ 15 นาที ซึ่งเป็นคำแนะนำด้านคุณภาพ ใส่ทอดมันและน้ำจิ้มแตงกวาในภาชนะตื้นแยกกัน แล้วแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า ตารางแช่เย็นของ FoodSafety.gov มีรายการปลา แต่ไม่ได้ระบุช่วงเก็บอาหารเหลือที่ปรุงจากปลา คำแนะนำ 2 วันของสูตรนี้จึงมีไว้เรื่องเนื้อสัมผัส ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ อุ่นเฉพาะส่วนที่จะกินจนมีไอและทั่วถึง 74°C (165°F)"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (fish and leftovers)", temperatures);
  addOfficial(recipe, "FDA: Selecting and Serving Fresh and Frozen Seafood Safely", seafood);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (separation and chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Chart (raw finfish storage categories)", storage);
}

function revisePouletBasquaise(recipe) {
  recipe.prepMinutes = 20;
  recipe.cookMinutes = 55;
  recipe.totalMinutes = 75;
  ingredient(recipe, "boneless skinless chicken breasts", ml(
    "boneless skinless chicken breasts, 4 similar pieces of about 200 g each",
    "去骨去皮雞胸肉，切成大小相近的 4 塊，每塊約 200 公克",
    "皮と骨を除いた鶏むね肉、約200gずつの大きさをそろえた4枚",
    "뼈와 껍질을 제거한 닭가슴살, 약 200g씩 비슷한 크기 4조각",
    "อกไก่เอาหนังและกระดูกออก 4 ชิ้นขนาดใกล้เคียงกัน ชิ้นละประมาณ 200 กรัม"
  ));

  step(recipe, "Finish cooking the chicken", ml(
    "Nestle the chicken and any juices from its clean plate into the sauce. Cover and simmer gently for an estimated 12–18 minutes; thickness and pan shape change the time. Check the centre of the thickest breast with a food thermometer for the official poultry endpoint of 74°C (165°F). If it is lower, continue at a gentle simmer in 2-minute increments and recheck; colour and the clock are not safety tests.",
    "將雞肉及乾淨盤中流出的肉汁放回醬汁。加蓋以微滾火力煮約 12–18 分鐘（估值）；肉塊厚度與鍋具會影響時間。用食物溫度計測量最厚雞胸中心，達官方禽肉熟度 74°C（165°F）。若未達，維持微滾每次續煮 2 分鐘後再測；顏色與計時都不是食安檢查。",
    "鶏肉と清潔な皿に出た肉汁をソースに戻します。ふたをして静かに煮る時間は目安として12〜18分です。厚みや鍋で変わります。最も厚い胸肉の中心を食品用温度計で測り、鶏肉の公式基準74°C（165°F）に達したことを確認します。低ければ静かな煮立ちを保ち、2分ずつ追加して再測定します。色や時間だけでは安全を判定できません。",
    "닭고기와 깨끗한 접시에 나온 육즙을 소스에 넣는다. 뚜껑을 덮고 약하게 끓이는 시간은 약 12–18분으로 추정하며 두께와 팬 모양에 따라 달라진다. 가장 두꺼운 닭가슴살 중심을 식품용 온도계로 재어 공식 가금류 기준인 74°C (165°F)에 도달했는지 확인한다. 낮으면 약한 끓임을 유지하며 2분씩 더 익히고 다시 잰다. 색과 시간만으로 안전을 판단하지 않는다.",
    "ใส่ไก่และน้ำจากจานสะอาดกลับลงในซอส ปิดฝาเคี่ยวเบา ๆ ประมาณ 12–18 นาที ซึ่งเป็นค่าประมาณและเวลาจะแปรตามความหนาและรูปทรงกระทะ ใช้เทอร์โมมิเตอร์วัดตรงกลางอกไก่ชิ้นที่หนาที่สุดให้ถึงเกณฑ์ทางการของสัตว์ปีกที่ 74°C (165°F) หากยังต่ำให้เคี่ยวเบา ๆ ต่อครั้งละ 2 นาทีแล้ววัดซ้ำ สีและเวลาไม่ใช่การตรวจความปลอดภัย"
  ));

  step(recipe, "Reunite and serve", ml(
    "Return the cooked chicken to the sauce for 2 minutes over low heat, then rest off the heat for 3 minutes. Divide among four bowls: one roughly 200 g raw-chicken piece per person, about 125 g peppers and 150 g tomatoes per person, with the onion and sauce shared evenly. These are raw-ingredient allocations, not cooked weights.",
    "雞肉回鍋與醬汁以小火煮 2 分鐘，離火靜置 3 分鐘。平均分成四碗：每人一塊約 200 公克生雞肉、約 125 公克甜椒與 150 公克番茄，洋蔥及醬汁平均分配。這些是生料分配量，不是熟食重量。",
    "鶏肉をソースに戻して弱火で2分温め、火を止めて3分休ませます。4人分に均等に分けます。1人分は生の鶏肉約200g相当、ピーマン約125g、トマト約150gで、玉ねぎとソースも均等にします。これは加熱前の材料配分で、調理後の重量ではありません。",
    "익힌 닭고기를 소스에 다시 넣고 약불에서 2분 데운 뒤 불을 끄고 3분 둔다. 네 그릇에 나눈다. 한 사람당 생닭 약 200g에 해당하는 조각 하나, 피망 약 125g, 토마토 150g씩 담고 양파와 소스도 고르게 나눈다. 이 수치는 조리 전 재료 배분량이며 조리 후 무게가 아니다.",
    "ใส่ไก่ที่สุกแล้วกลับลงซอส ใช้ไฟอ่อน 2 นาที แล้วยกลงพัก 3 นาที แบ่งเป็น 4 ชาม แต่ละคนได้ไก่ดิบเทียบเท่าชิ้นละประมาณ 200 กรัม พริกหวานประมาณ 125 กรัม และมะเขือเทศ 150 กรัม แบ่งหอมและซอสให้เท่า ๆ กัน ตัวเลขนี้เป็นสัดส่วนวัตถุดิบก่อนปรุง ไม่ใช่น้ำหนักหลังสุก"
  ));

  recipe.storage = ml(
    "Divide leftovers into shallow containers and refrigerate within 2 hours at 4°C (40°F) or below. FoodSafety.gov lists 3–4 days for cooked meat and poultry leftovers; this recipe suggests using the sauce within 3 days for best quality, a preference within that official window. Reheat only the portion needed until it reaches 74°C (165°F) throughout.",
    "剩菜分裝入淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 對熟肉與禽肉剩食列出 3–4 天；本食譜建議 3 天內吃完以保持醬汁風味，這是官方期限內的品質偏好。只回熱要吃的份量，直到各處達 74°C（165°F）。",
    "残りは浅い容器に小分けし、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govは調理済みの肉・鶏肉の残り物を3〜4日保存できると案内しています。このレシピではソースの品質のため3日以内を勧めますが、公式期間内の品質上の目安です。食べる分だけ全体が74°C（165°F）に達するまで温め直します。",
    "남은 음식은 얕은 용기에 나누어 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov는 조리한 육류와 가금류 남은 음식을 3~4일 보관할 수 있다고 안내한다. 이 레시피는 소스 품질을 위해 3일 안에 먹기를 권하며 이는 공식 기간 안의 품질상 권장이다. 먹을 만큼만 전체가 74°C (165°F)에 도달하게 데운다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า FoodSafety.gov ระบุว่าอาหารเนื้อและสัตว์ปีกปรุงสุกเก็บได้ 3–4 วัน สูตรนี้แนะนำให้กินภายใน 3 วันเพื่อคุณภาพซอส เป็นคำแนะนำด้านคุณภาพภายในช่วงทางการ อุ่นเฉพาะส่วนที่จะกินจนทั่วถึง 74°C (165°F)"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (poultry and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Chart (cooked meat and poultry leftovers)", storage);
}

function reviseChocolateChipCookies(recipe) {
  recipe.prepMinutes = 45;
  recipe.cookMinutes = 30;
  recipe.totalMinutes = 75;
  ingredient(recipe, "dark chocolate chips or chunks", ml(
    "dark chocolate chips or chunks; fold all 280 g through the dough",
    "黑巧克力豆或巧克力塊；280 公克全數拌入麵糰",
    "ダークチョコチップまたは刻んだチョコレート、280gすべてを生地に混ぜる",
    "다크 초콜릿 칩 또는 청크, 280g 전량 반죽에 섞기",
    "ช็อกโกแลตดาร์กชิปหรือช็อกโกแลตหั่นชิ้น ใช้ทั้งหมด 280 กรัมผสมในแป้ง"
  ));
  step(recipe, "Fold in flour and chocolate", ml(
    "Fold in the dry ingredients only until the last flour streaks disappear, then fold in all 280 g chocolate just until evenly distributed. Do not taste raw dough or batter: the flour and eggs are uncooked. Wash hands, bowl, utensils, and the counter after handling the raw mixture.",
    "乾料拌至最後一點麵粉痕跡消失，再拌入全部 280 公克巧克力，剛好分布均勻即可。生麵糰和麵糊含未熟麵粉與雞蛋，不要品嚐；接觸後清洗雙手、攪拌盆、器具與檯面。",
    "粉類は粉の筋が消えるまで混ぜ、チョコレート280gすべてを加えて均一になったところで止めます。生地やバッターは未加熱の小麦粉と卵を含むため味見しないでください。扱った後は手、ボウル、器具、台を洗います。",
    "마지막 밀가루 자국이 사라질 때까지만 섞고 초콜릿 280g 전량을 넣어 고르게 퍼지면 멈춘다. 생반죽에는 익히지 않은 밀가루와 달걀이 있으므로 맛보지 않는다. 반죽을 만진 뒤 손, 볼, 도구, 조리대를 씻는다.",
    "ผสมของแห้งเพียงจนรอยแป้งสุดท้ายหายไป แล้วใส่ช็อกโกแลตทั้งหมด 280 กรัม คลุกแค่ให้กระจายทั่ว อย่าชิมแป้งหรือส่วนผสมดิบ เพราะยังมีแป้งและไข่ที่ไม่สุก หลังสัมผัสส่วนผสมดิบให้ล้างมือ ชาม อุปกรณ์ และพื้นเคาน์เตอร์"
  ));

  step(recipe, "Portion and bake", ml(
    "Divide all chilled dough into 24 equal portions (about 46 g each). Arrange 12 on each of two lined trays with at least 5 cm between them. Bake at 190°C for an estimated 10–12 minutes per batch; if using two oven racks, rotate and swap the trays halfway, or bake in two rounds on one rack. Edges should be set and golden, with centres soft but no wet, raw-looking batter. Time and colour guide chewy texture; neither is an internal-temperature safety endpoint. Bake the flour-and-egg dough fully, then rest the cookies on the hot tray for 5 minutes before moving them to a rack.",
    "冷藏麵糰全部平均分成 24 份（每份約 46 公克），每張鋪紙烤盤放 12 份，間隔至少 5 公分。以 190°C 烘烤約 10–12 分鐘（每盤估時）；若同時用兩層烤架，烘至一半時交換烤盤位置並轉向；若只有一層，分兩批烤。邊緣應定型呈金黃，中心仍柔軟但不可有濕亮生麵糊。時間和顏色是柔軟有嚼勁的口感指標，不是中心溫度食安標準。麵粉與雞蛋麵糰要烤熟，出爐後留在熱烤盤 5 分鐘再移到網架。",
    "冷やした生地をすべて24等分します（約46gずつ）。オーブンシートを敷いた天板2枚に12個ずつ、5cm以上間隔を空けて並べます。190°Cで目安として1回10〜12分焼きます。2段で焼く場合は途中で天板の上下と前後を入れ替え、1段なら2回に分けます。縁が固まりきつね色で、中心は柔らかくても濡れた生の生地に見えない状態にします。時間と色は柔らかく噛みごたえのある食感の目安で、中心温度の安全基準ではありません。小麦粉と卵を含む生地に十分火を通し、焼き上がり後は熱い天板で5分置いてから網に移します。",
    "차가워진 반죽 전체를 24등분한다(한 개 약 46g). 유산지를 깐 팬 두 장에 12개씩 놓고 간격은 최소 5cm로 둔다. 190°C에서 한 판당 약 10–12분 굽는다(추정치). 오븐 두 단을 쓰면 중간에 팬의 위아래와 앞뒤를 바꾸고, 한 단이면 두 번에 나눠 굽는다. 가장자리는 노릇하게 굳고 가운데는 부드럽되 젖은 생반죽처럼 보이지 않아야 한다. 시간과 색은 쫀득한 식감을 위한 기준이지 중심 안전온도가 아니다. 밀가루와 달걀이 든 반죽을 완전히 익힌 뒤 뜨거운 팬에서 5분 두었다가 망으로 옮긴다.",
    "แบ่งแป้งเย็นทั้งหมดเป็น 24 ส่วนเท่า ๆ กัน (ประมาณ 46 กรัมต่อชิ้น) วางถาดรองกระดาษอบสองถาด ถาดละ 12 ชิ้น ห่างกันอย่างน้อย 5 ซม. อบที่ 190°C ประมาณ 10–12 นาทีต่อรอบ (เป็นค่าประมาณ) หากใช้สองชั้นให้สลับตำแหน่งและหมุนถาดเมื่ออบไปครึ่งเวลา หรืออบสองรอบบนชั้นเดียว ขอบควรเซ็ตและเป็นสีทอง ตรงกลางยังนุ่มแต่ไม่ควรมีแป้งดิบเปียกเงา เวลาและสีเป็นเกณฑ์เนื้อนุ่มหนึบ ไม่ใช่เกณฑ์อุณหภูมิความปลอดภัย อบแป้งที่มีแป้งสาลีและไข่ให้สุก แล้วพักบนถาดร้อน 5 นาทีก่อนย้ายขึ้นตะแกรง"
  ));

  recipe.storage = ml(
    "Cool fully before storing airtight at room temperature for up to 3 days for the best chewy texture; that is a quality recommendation, not an official safety cutoff. Freeze baked cookies, well wrapped, for longer storage. Keep any unbaked dough covered in the refrigerator until baking, and never taste it raw.",
    "完全放涼後密封，常溫保存最多 3 天以維持柔軟有嚼勁的口感；這是品質建議，不是官方食安期限。要保存更久可將烤好的餅乾包好冷凍。尚未烤的麵糰要覆蓋冷藏至烘烤，切勿生吃或試味。",
    "完全に冷ましてから密閉し、常温で最長3日保存すると柔らかく噛みごたえのある食感を保ちやすくなります。これは品質上の目安で、公式の安全期限ではありません。長く保存する場合は焼いたクッキーを包んで冷凍します。焼く前の生地は覆って冷蔵し、生で味見しないでください。",
    "완전히 식힌 뒤 밀폐해 실온에서 최대 3일 보관하면 쫀득한 식감을 유지하기 좋다. 이는 품질 권장이지 공식 안전 기한이 아니다. 더 오래 보관하려면 구운 쿠키를 잘 싸서 냉동한다. 굽기 전 반죽은 덮어서 냉장하고 날것으로 맛보지 않는다.",
    "พักให้เย็นสนิทก่อนเก็บในภาชนะปิดสนิทที่อุณหภูมิห้องได้ถึง 3 วันเพื่อเนื้อหนึบ ซึ่งเป็นคำแนะนำด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ หากเก็บนานกว่านั้นให้ห่อคุกกี้ที่อบแล้วและแช่แข็ง แป้งดิบที่ยังไม่อบให้ปิดฝาและแช่เย็นไว้จนอบ ห้ามชิมดิบ"
  );

  addOfficial(recipe, "FDA: Handling Flour Safely (raw flour, egg, and dough handling)", flour);
}

function reviseJapchae(recipe) {
  ingredient(recipe, "Korean soy sauce, divided", ml(
    "Korean soy sauce, divided exactly: 55 ml for noodles, 5 ml for chives, and 20 ml for enoki",
    "韓式醬油，精確分成麵條 55 毫升、韭菜 5 毫升、金針菇 20 毫升",
    "韓国しょうゆ（麺用55ml、にら用5ml、えのき用20mlに分ける）",
    "한국 간장, 면 양념용 55ml·부추용 5ml·팽이버섯용 20ml로 정확히 나눔",
    "ซีอิ๊วเกาหลี แบ่งชัดเจน: 55 มล.สำหรับเส้น 5 มล.สำหรับกุยช่าย และ 20 มล.สำหรับเห็ดเข็มทอง"
  ));

  step(recipe, "Mix the noodle seasoning", ml(
    "Stir 55 ml soy sauce, all 35 g brown sugar, 20 ml sesame oil, 10 g garlic, and pepper until the sugar dissolves. Keep the remaining 25 ml soy sauce separate: 5 ml goes to the chives and 20 ml to the enoki. This accounts for the full listed 80 ml.",
    "將 55 毫升醬油、全部 35 公克黑糖、20 毫升麻油、10 公克蒜與黑胡椒攪拌至糖溶解。剩下 25 毫升醬油先分開：5 毫升給韭菜，20 毫升給金針菇。清單中的 80 毫升全數有用途。",
    "しょうゆ55ml、黒砂糖35gすべて、ごま油20ml、にんにく10g、こしょうを砂糖が溶けるまで混ぜます。残りのしょうゆ25mlは分けておき、にらに5ml、えのきに20ml使います。記載した80mlをすべて使います。",
    "간장 55ml, 흑설탕 35g 전량, 참기름 20ml, 마늘 10g, 후추를 설탕이 녹을 때까지 섞는다. 남은 간장 25ml는 따로 둔다. 부추에 5ml, 팽이버섯에 20ml 쓴다. 표시된 80ml를 모두 사용한다.",
    "คนซีอิ๊ว 55 มล. น้ำตาลทรายแดงทั้งหมด 35 กรัม น้ำมันงา 20 มล. กระเทียม 10 กรัม และพริกไทยจนน้ำตาลละลาย แยกซีอิ๊วที่เหลือ 25 มล.ไว้: ใช้กับกุยช่าย 5 มล. และเห็ดเข็มทอง 20 มล. ใช้ซีอิ๊ว 80 มล.ตามรายการครบทั้งหมด"
  ));

  step(recipe, "Cook the glass noodles", ml(
    "Boil the 300 g dry noodles in at least 3 L water, stirring twice. Start checking at 7 minutes; 7–8 minutes or the package time is an estimate because brands vary. Drain when the strands are translucent and chewy with no hard centre; this is a texture cue, not a food-safety temperature.",
    "將 300 公克乾粉絲放入至少 3 公升沸水，攪拌兩次。從第 7 分鐘開始檢查；7–8 分鐘或包裝時間都是估值，品牌不同會有差異。麵條透明有彈性且沒有硬芯時瀝乾；這是口感判斷，不是食安溫度。",
    "乾燥麺300gを少なくとも3Lの湯でゆで、途中で2回混ぜます。7分から確認します。7〜8分または袋の表示時間はメーカーによって異なるため目安です。麺が透明で弾力があり、芯が硬くなければ湯を切ります。これは食感の目安で、安全温度ではありません。",
    "마른 당면 300g을 물 3L 이상에서 삶으며 두 번 젓는다. 7분부터 확인한다. 7–8분 또는 포장지 시간은 제품마다 달라 추정치다. 면이 투명하고 쫄깃하며 딱딱한 심이 없으면 건진다. 이는 식감 기준이지 식품 안전 온도가 아니다.",
    "ต้มเส้นแห้ง 300 กรัมในน้ำอย่างน้อย 3 ลิตร คนสองครั้ง เริ่มตรวจเมื่อครบ 7 นาที เวลา 7–8 นาทีหรือเวลาบนบรรจุภัณฑ์เป็นค่าประมาณเพราะแต่ละยี่ห้อต่างกัน สะเด็ดเมื่อเส้นโปร่งใส เหนียวนุ่ม และไม่มีไส้แข็ง นี่เป็นเกณฑ์เนื้อสัมผัส ไม่ใช่อุณหภูมิความปลอดภัย"
  ));

  step(recipe, "Cook the enoki", ml(
    "Add the remaining 10 ml neutral oil and all enoki. Cook for an estimated 2–3 minutes until flexible with a few pale-gold edges. Add the reserved 20 ml soy sauce and remaining 3 g garlic; stir for about 30 seconds, then transfer everything to the noodle bowl. Use the entire enoki portion and seasoning.",
    "加入剩下 10 毫升中性油與全部金針菇，炒約 2–3 分鐘（估值），至柔軟並略有淡金色邊緣。加入預留的 20 毫升醬油及剩餘 3 公克蒜，拌炒約 30 秒，再全部倒入麵條碗中。金針菇與調味料全數使用。",
    "残りの植物油10mlとえのきすべてを加え、目安として2〜3分、しんなりして縁に薄く焼き色が付くまで炒めます。取り置いたしょうゆ20mlと残りのにんにく3gを加えて約30秒混ぜ、すべて麺のボウルに移します。えのきと調味料を使い切ります。",
    "남은 중성유 10ml와 팽이버섯 전량을 넣고 약 2–3분 볶는다(추정치). 버섯이 유연해지고 가장자리에 옅은 갈색이 조금 나면 남겨 둔 간장 20ml와 남은 마늘 3g을 넣어 약 30초 볶고 전부 면 볼에 옮긴다. 팽이버섯과 양념을 모두 사용한다.",
    "ใส่น้ำมันรสกลางที่เหลือ 10 มล.และเห็ดเข็มทองทั้งหมด ผัดประมาณ 2–3 นาที (เป็นค่าประมาณ) จนเห็ดนิ่มและมีขอบสีทองอ่อนเล็กน้อย เติมซีอิ๊วที่พักไว้ 20 มล.กับกระเทียมอีก 3 กรัม ผัดประมาณ 30 วินาที แล้วย้ายทั้งหมดลงชามเส้น ใช้เห็ดและเครื่องปรุงให้หมด"
  ));

  step(recipe, "Balance while warm", ml(
    "Taste one noodle with a piece of vegetable, then wait 2 minutes and taste again because the strands continue absorbing seasoning. Stop when balanced; the listed soy sauce has already been fully allocated, so do not add more by default.",
    "取一根麵條和一片蔬菜試味，等 2 分鐘再嚐一次，讓麵條吸收調味。味道平衡即可停止；清單中的醬油已全數分配，原則上不要再加。",
    "麺と野菜を一緒に味見し、麺がたれを吸うため2分待ってからもう一度確認します。味が整えば止めます。しょうゆは記載分をすべて配分済みなので、原則として追加しません。",
    "면과 채소를 함께 맛본 뒤 면이 양념을 더 흡수하도록 2분 기다려 다시 맛본다. 균형이 맞으면 멈춘다. 표시된 간장은 모두 배분했으므로 기본적으로 더 넣지 않는다.",
    "ชิมเส้นพร้อมผักหนึ่งคำ แล้วรอ 2 นาทีและชิมอีกครั้งเพราะเส้นยังดูดซึมเครื่องปรุง หยุดเมื่อรสสมดุล ซีอิ๊วตามรายการแบ่งใช้หมดแล้ว โดยทั่วไปไม่ต้องเติมเพิ่ม"
  ));

  step(recipe, "Finish with sesame", ml(
    "Fold in the remaining 10 ml sesame oil and all 10 g sesame seeds. Divide the entire pan evenly among 6 servings, giving each about 50 g dry-noodle equivalent with vegetables and seasoning shared evenly. Serve warm or at room temperature within 2 hours; the strand separation and colour cues are for quality, not a safety-temperature test.",
    "拌入剩下 10 毫升麻油及全部 10 公克芝麻。整鍋平均分成六份，每份約相當於 50 公克乾粉絲，蔬菜與調味平均分配。趁溫熱或室溫在 2 小時內上桌；麵條分明與色澤是品質指標，不是食安測溫。",
    "残りのごま油10mlとごま10gすべてを混ぜます。全量を6人分に均等に分け、1人分は乾麺約50g相当とし、野菜と味付けも均等にします。温かいまま、または室温で2時間以内に提供します。麺のほぐれや色は品質の目安で、安全温度を測るものではありません。",
    "남은 참기름 10ml와 참깨 10g 전량을 섞는다. 팬의 음식 전체를 여섯 몫으로 고르게 나누며 1인분은 마른 당면 약 50g에 해당하고 채소와 양념도 고르게 배분한다. 따뜻하거나 실온으로 두 시간 안에 낸다. 면이 풀린 정도와 색은 품질 기준이지 안전 온도 측정이 아니다.",
    "คลุกน้ำมันงาอีก 10 มล.และงาทั้งหมด 10 กรัม แบ่งอาหารทั้งกระทะเป็น 6 ที่เท่า ๆ กัน แต่ละที่เทียบเท่าเส้นแห้งประมาณ 50 กรัม พร้อมแบ่งผักและเครื่องปรุงให้เท่ากัน เสิร์ฟอุ่นหรือที่อุณหภูมิห้องภายใน 2 ชั่วโมง การแยกเส้นและสีเป็นเกณฑ์คุณภาพ ไม่ใช่การวัดอุณหภูมิความปลอดภัย"
  ));

  recipe.storage = ml(
    "Put leftovers in shallow covered containers and refrigerate within 2 hours at 4°C (40°F) or below. The 2-day suggestion is for noodle texture and vegetable colour, not an official safety cutoff. FoodSafety.gov's 74°C (165°F) endpoint applies when reheating leftovers; it is not a cooking target for this vegetable-and-noodle dish. Reheat only the portion needed until hot throughout.",
    "剩菜放入有蓋淺盒，於 2 小時內冷藏在 4°C（40°F）以下。建議 2 天內吃完是為了麵條口感和蔬菜色澤，不是官方食安期限。FoodSafety.gov 的 74°C（165°F）標準適用於剩菜回熱，不是這道蔬菜粉絲的烹調熟度目標。只回熱要吃的份量，並加熱至各處燙熱。",
    "残りはふた付きの浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。2日以内という目安は麺の食感と野菜の色のためで、公式の安全期限ではありません。FoodSafety.govの74°C（165°F）は残り物を温め直す場合の基準で、この野菜麺料理を調理する目標温度ではありません。食べる分だけ全体が熱くなるまで再加熱します。",
    "남은 음식은 얕은 밀폐 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. 2일 권장은 면 식감과 채소 색을 위한 것이며 공식 안전 기한이 아니다. FoodSafety.gov의 74°C (165°F)는 남은 음식을 다시 데울 때 적용되며 이 채소 당면 요리의 조리 목표 온도가 아니다. 먹을 만큼만 전체가 뜨거워지도록 데운다.",
    "ใส่อาหารเหลือในภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า คำแนะนำ 2 วันมีไว้รักษาเนื้อสัมผัสของเส้นและสีผัก ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ ค่า 74°C (165°F) ของ FoodSafety.gov ใช้เมื่ออุ่นอาหารเหลือ ไม่ใช่เป้าหมายการปรุงของเมนูเส้นกับผักนี้ อุ่นเฉพาะส่วนที่จะกินจนร้อนทั่ว"
  );

  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (prompt chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (leftovers only)", temperatures);
}

export function refineFiftyThirdMethods(recipes) {
  const revisions = new Map([
    ["tod-mun-pla", reviseTodMunPla],
    ["poulet-basquaise", revisePouletBasquaise],
    ["chocolate-chip-cookies", reviseChocolateChipCookies],
    ["japchae", reviseJapchae]
  ]);
  for (const [id, revise] of revisions) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error(`${id}: missing published recipe for fifty-third method review`);
    recipes[index] = cloneForPublication(recipes[index]);
    revise(recipes[index]);
    for (const locale of ["en", "zh-hant", "ja", "ko", "th"]) {
      if (!recipes[index].storage?.[locale]) throw new Error(`${id}: missing ${locale} storage card`);
      if (!recipes[index].ingredients.every((row) => row.item?.[locale])) throw new Error(`${id}: missing ${locale} ingredient text`);
      if (!recipes[index].instructions.every((entry) => entry.title?.[locale] && entry.body?.[locale])) {
        throw new Error(`${id}: incomplete ${locale} method after refinement`);
      }
    }
  }
}
