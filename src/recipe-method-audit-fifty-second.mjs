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

function step(recipe, title, body) {
  const target = recipe.instructions.find((entry) => entry.title.en === title);
  if (!target) throw new Error(`${recipe.id}: missing step for fifty-second method review: ${title}`);
  target.body = body;
}

function addOfficial(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${title}`, url });
  }
}

function reviseDakgalbi(recipe) {
  recipe.prepMinutes = 45;
  recipe.cookMinutes = 30;
  recipe.totalMinutes = 75;
  const chicken = recipe.ingredients.find((row) => row.item.en.startsWith("boneless skinless chicken thighs"));
  if (!chicken) throw new Error("dakgalbi: missing chicken ingredient");
  chicken.item = ml(
    "boneless skinless chicken thighs, 4 cm pieces; 700 g raw is about 175 g per serving",
    "去骨去皮雞腿肉，切 4 公分塊；700 公克生肉約為每份 175 公克",
    "皮と骨を除いた鶏もも肉、4cm角。生肉700gは1人分約175g",
    "뼈와 껍질을 제거한 닭다리살, 4cm 크기. 생고기 700g은 1인분 약 175g",
    "เนื้อสะโพกไก่ลอกหนังและเอากระดูกออก หั่น 4 ซม. ไก่ดิบ 700 กรัมคิดเป็นประมาณ 175 กรัมต่อที่"
  );

  step(recipe, "Start sweet potato and onion", ml(
    "Heat a 32 cm skillet over medium-high for about 3 minutes. Add the 15 ml neutral oil, all 250 g sweet potato and all 150 g onion; cook about 5 minutes, turning twice. These are starting time estimates: the edges should colour while the centres remain firm. If the pan is crowded, use the largest skillet available and keep the vegetables moving.",
    "32 公分平底鍋以中大火預熱約 3 分鐘，加入全部 15 毫升中性油、250 公克地瓜和 150 公克洋蔥，翻動兩次炒約 5 分鐘。這些時間是起始估值；地瓜邊緣略上色、中心仍硬即可。若鍋子太擠，改用最大的平底鍋並持續翻動蔬菜。",
    "直径32cmのフライパンを中強火で約3分予熱します。中性油15ml、さつまいも250g、玉ねぎ150gをすべて加え、2回返しながら約5分炒めます。時間は目安です。縁に色が付き、中心はまだ固い状態にします。鍋が混み合う場合は、できるだけ大きいフライパンを使い、野菜を動かし続けます。",
    "지름 32cm 프라이팬을 중강불에서 약 3분 예열한다. 중성유 15ml, 고구마 250g, 양파 150g을 모두 넣고 두 번 뒤집어 가며 약 5분 볶는다. 시간은 시작 추정치다. 가장자리는 색이 나고 속은 아직 단단해야 한다. 팬이 너무 좁으면 가능한 가장 큰 팬을 쓰고 채소를 계속 뒤집는다.",
    "ตั้งกระทะแบนขนาด 32 ซม. ด้วยไฟกลางค่อนแรงประมาณ 3 นาที ใส่น้ำมันกลาง 15 มล. มันเทศ 250 กรัม และหอมหัวใหญ่ 150 กรัมทั้งหมด ผัดประมาณ 5 นาที พลิกสองครั้ง เวลานี้เป็นเพียงค่าประมาณเริ่มต้น ขอบมันเทศควรเริ่มมีสีแต่ตรงกลางยังแน่น หากกระทะแน่นเกินไปให้ใช้กระทะใบใหญ่ที่สุดที่มีและคอยขยับผัก"
  ));

  step(recipe, "Add chicken in one layer", ml(
    "Push the vegetables to the edge and add the 700 g marinated chicken to the centre. Keep the 4 cm pieces in one uncrowded layer; if they do not fit, brown them in two batches and return every piece to the pan. Cook about 4 minutes without moving, turn, then cook about 3 minutes. Both times are estimates, not doneness tests; discard any raw marinade left in its bowl.",
    "把蔬菜推到鍋邊，將 700 公克醃好的雞肉放在中央。4 公分雞塊要疏鬆平鋪；若放不下，分兩批煎好後全部回鍋。先不翻動煎約 4 分鐘，再翻面煎約 3 分鐘。這兩段時間都是估值，不是熟度判斷；醃肉碗裡剩下的生醃汁要丟棄。",
    "野菜を鍋の端に寄せ、漬け込んだ鶏肉700gを中央に加えます。4cmの鶏肉を重ならないよう一層に広げます。入りきらない場合は2回に分けて焼き、すべて鍋に戻します。動かさず約4分焼き、返して約3分焼きます。どちらも目安時間で、火の通りの判定には使いません。漬け込みに使ったボウルに残る生のたれは捨てます。",
    "채소를 팬 가장자리로 밀고 양념한 닭고기 700g을 가운데 넣는다. 4cm 크기 조각을 겹치지 않게 한 층으로 놓고, 들어가지 않으면 두 번에 나눠 굽고 모두 팬에 다시 넣는다. 움직이지 않고 약 4분 익힌 뒤 뒤집어 약 3분 더 익힌다. 두 시간은 모두 추정치이며 익힘 판정 기준이 아니다. 생닭 양념 그릇에 남은 양념은 버린다.",
    "ดันผักไปไว้ริมกระทะ ใส่ไก่หมัก 700 กรัมตรงกลาง เรียงชิ้นขนาด 4 ซม. ชั้นเดียวโดยไม่เบียด หากวางไม่พอให้ย่างสองรอบแล้วใส่กลับทั้งหมด ปล่อยไว้ประมาณ 4 นาทีโดยไม่ขยับ พลิกแล้วปรุงต่อประมาณ 3 นาที เวลาทั้งสองเป็นเพียงค่าประมาณ ไม่ใช่เกณฑ์วัดความสุก ทิ้งน้ำหมักดิบที่เหลือในชาม"
  ));

  step(recipe, "Steam the cabbage and rice cakes", ml(
    "Add all 300 g cabbage, all 200 g rice cakes and 60 g of the scallions. Fold twice, cover and cook over medium heat for about 5 minutes; this is an estimate while the cabbage releases steam. Add no water unless the bottom is dry and scorching. Keep the remaining 20 g scallions for the finish.",
    "加入全部 300 公克高麗菜、200 公克年糕和 60 公克青蔥，翻拌兩次後蓋鍋，以中火煮約 5 分鐘；這是讓高麗菜蒸出水氣的估時。除非鍋底乾到焦燒，否則不加水。剩下 20 公克青蔥留到最後。",
    "キャベツ300g、餅200g、ねぎ60gをすべて加え、2回返してふたをし、中火で約5分蒸し煮にします。キャベツの水分を利用する目安時間です。鍋底が乾いて焦げそうな場合以外は水を加えません。残りのねぎ20gは仕上げ用に取っておきます。",
    "양배추 300g, 떡 200g, 대파 60g을 모두 넣고 두 번 섞은 뒤 뚜껑을 덮어 중불에서 약 5분 익힌다. 양배추에서 수증기가 나오도록 하는 추정 시간이다. 바닥이 말라 타려는 경우가 아니면 물을 넣지 않는다. 남은 대파 20g은 마무리용으로 둔다.",
    "ใส่กะหล่ำปลี 300 กรัม ต็อก 200 กรัม และต้นหอม 60 กรัมทั้งหมด คลุกสองครั้ง ปิดฝาแล้วใช้ไฟกลางประมาณ 5 นาที เวลานี้เป็นค่าประมาณให้กะหล่ำปลีคายน้ำ ไม่ต้องเติมน้ำเว้นแต่ก้นกระทะแห้งและเริ่มไหม้ เก็บต้นหอมอีก 20 กรัมไว้ใส่ตอนท้าย"
  ));

  step(recipe, "Cook to safe doneness", ml(
    "Uncover and stir-fry for an estimated 4–6 minutes, until the sweet potato is knife-tender and the sauce coats the food. Check the centres of the largest, thickest chicken pieces with a thermometer, avoiding the pan; every checked piece must reach the official poultry endpoint of 74°C (165°F). If any is lower, keep stir-frying and recheck after 1 minute. Add up to 30 ml hot water only if the rice cakes remain hard.",
    "掀蓋後再炒約 4–6 分鐘（估值），直到地瓜可被刀尖刺穿、醬汁裹住食材。用溫度計測量最大、最厚雞塊的中心，避開鍋面；受測雞塊都必須達官方禽肉安全中心溫度 74°C（165°F）。若有未達者，續炒 1 分鐘後再測。只有年糕仍硬時才加最多 30 毫升熱水。",
    "ふたを外し、目安として4〜6分炒めます。さつまいもにナイフが通り、たれが全体に絡んだら、最大で最も厚い鶏肉の中心を温度計で測ります。鍋に触れないようにし、測った鶏肉はすべて公式の安全温度74°C（165°F）に達している必要があります。低ければ炒め続け、1分後に再測定します。餅がまだ固い場合だけ、熱湯を最大30ml加えます。",
    "뚜껑을 열고 약 4~6분 더 볶는다. 이 시간은 추정치다. 고구마에 칼이 들어가고 양념이 재료에 묻으면 가장 크고 두꺼운 닭 조각의 중심을 팬에 닿지 않게 온도계로 잰다. 확인한 닭 조각은 모두 공식 가금류 안전 중심온도인 74°C (165°F)에 도달해야 한다. 낮으면 1분 더 볶고 다시 잰다. 떡이 여전히 딱딱할 때만 뜨거운 물을 최대 30ml 넣는다.",
    "เปิดฝาแล้วผัดต่อประมาณ 4–6 นาที เวลานี้เป็นค่าประมาณ เมื่อมีดแทงมันเทศได้และซอสเคลือบวัตถุดิบ ให้วัดตรงกลางชิ้นไก่ที่ใหญ่และหนาที่สุดโดยไม่ให้เทอร์โมมิเตอร์โดนกระทะ ชิ้นที่ตรวจทุกชิ้นต้องถึงอุณหภูมิปลอดภัยอย่างเป็นทางการของเนื้อสัตว์ปีกที่ 74°C (165°F) หากยังต่ำให้ผัดต่อ 1 นาทีแล้ววัดซ้ำ เติมน้ำร้อนได้ไม่เกิน 30 มล. เฉพาะเมื่อต็อกยังแข็ง"
  ));

  step(recipe, "Fold in perilla at the end", ml(
    "Turn off the heat. Fold in all 30 g perilla and the reserved 20 g scallions for about 30 seconds, then rest 2 minutes. Divide the pan among four servings: each gets about 175 g raw-chicken equivalent, 50 g rice cakes and 62.5 g sweet potato, with the cabbage and sauce shared evenly. These ingredient weights describe the raw recipe allocation, not cooked weight.",
    "關火後拌入全部 30 公克紫蘇葉及預留的 20 公克青蔥約 30 秒，再靜置 2 分鐘。全鍋分成四份：每份約相當於 175 公克生雞肉、50 公克年糕和 62.5 公克地瓜，高麗菜與醬汁平均分配。這些是生料分配重量，不是熟食重量。",
    "火を止め、えごまの葉30gすべてと取っておいたねぎ20gを約30秒混ぜ、2分休ませます。4人分に均等に分けます。1人分は生の鶏肉換算で約175g、餅50g、さつまいも62.5g相当で、キャベツとたれも均等に分けます。これは生の材料配分であり、加熱後の重量ではありません。",
    "불을 끄고 깻잎 30g 전량과 남겨 둔 대파 20g을 약 30초 섞은 뒤 2분 둔다. 팬의 음식을 네 접시에 나눈다. 한 사람당 생닭 기준 약 175g, 떡 50g, 고구마 62.5g에 해당하며 양배추와 양념도 고르게 나눈다. 이 수치는 조리 전 재료 배분량이며 조리 후 무게가 아니다.",
    "ปิดไฟ ใส่ใบงา 30 กรัมทั้งหมดและต้นหอมที่พักไว้ 20 กรัม คลุกประมาณ 30 วินาทีแล้วพัก 2 นาที แบ่งอาหารในกระทะเป็น 4 ที่ แต่ละที่คิดเป็นไก่ดิบประมาณ 175 กรัม ต็อก 50 กรัม และมันเทศ 62.5 กรัม พร้อมแบ่งกะหล่ำปลีและซอสให้เท่า ๆ กัน ตัวเลขนี้เป็นสัดส่วนวัตถุดิบก่อนปรุง ไม่ใช่น้ำหนักหลังสุก"
  ));

  recipe.storage = ml(
    "Cool in shallow covered containers and refrigerate within 2 hours at 4°C (40°F) or below. FoodSafety.gov lists 3–4 days for cooked meat and poultry leftovers; this recipe prefers eating the rice cakes within 3 days for texture, a quality choice rather than a separate safety limit. Reheat only the portion needed until it reaches 74°C (165°F) throughout.",
    "放入有蓋淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 對熟肉與禽肉剩菜列出的官方冷藏期限為 3–4 天；本食譜建議 3 天內吃完以維持年糕口感，這是品質選擇，不是另一項食安期限。只回熱要吃的份量，並加熱至中心各處達 74°C（165°F）。",
    "浅いふた付き容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govは調理済みの肉・鶏肉の残り物を3〜4日保存できると案内しています。このレシピでは餅の食感を考え、品質上の選択として3日以内に食べることを勧めます。これは別の安全期限ではありません。食べる分だけ温め直し、全体が74°C（165°F）に達するようにします。",
    "얕은 밀폐 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov는 조리한 육류와 가금류 남은 음식을 공식적으로 3~4일 보관할 수 있다고 안내한다. 이 레시피는 떡 식감을 위해 품질상 3일 안에 먹기를 권하며, 이는 별도의 안전 기한이 아니다. 먹을 만큼만 데워 전체가 74°C (165°F)에 도달하게 한다.",
    "ใส่ภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า FoodSafety.gov ระบุว่าอาหารเนื้อและสัตว์ปีกที่ปรุงสุกเก็บแช่เย็นได้ 3–4 วัน สูตรนี้แนะนำให้กินต็อกภายใน 3 วันเพื่อรักษาเนื้อสัมผัส ซึ่งเป็นการเลือกด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัยอีกข้อหนึ่ง อุ่นเฉพาะส่วนที่จะกินจนทั่วถึง 74°C (165°F)"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (poultry and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (chill and cross-contamination)", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Chart (cooked meat and poultry leftovers)", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts");
}

function reviseKeftedes(recipe) {
  recipe.prepMinutes = 45;
  recipe.cookMinutes = 35;
  recipe.totalMinutes = 80;
  const flour = recipe.ingredients.find((row) => row.item.en.startsWith("plain flour"));
  if (!flour) throw new Error("keftedes: missing dusting flour ingredient");
  flour.item = ml(
    "plain flour, for light dusting; use only as needed and discard flour touched by raw meat",
    "普通麵粉，用於薄薄裹粉；按需使用，接觸生肉的剩粉須丟棄",
    "薄くまぶす小麦粉。必要量だけ使い、生肉に触れた残りは捨てる",
    "가볍게 묻힐 밀가루. 필요한 만큼만 쓰고 생고기에 닿은 남은 가루는 버린다",
    "แป้งสาลีสำหรับคลุกบาง ๆ ใช้เท่าที่จำเป็นและทิ้งแป้งที่สัมผัสเนื้อดิบ"
  );
  const oil = recipe.ingredients.find((row) => row.item.en.startsWith("neutral oil"));
  if (!oil) throw new Error("keftedes: missing frying oil ingredient");
  oil.item = ml(
    "neutral oil for shallow frying; about 6–7 mm depth in a 24 cm pan; cool and discard used oil",
    "中性油，用於淺油煎；在 24 公分鍋中約形成 6–7 毫米深油層；用過的油冷卻後丟棄",
    "浅揚げ用の中性油。直径24cmのフライパンで油深さ約6〜7mm。使用後は冷まして廃棄",
    "얕게 튀길 중성유. 지름 24cm 팬에서 깊이 약 6~7mm가 되도록 사용하고, 쓴 기름은 식혀 버린다",
    "น้ำมันรสกลางสำหรับทอดน้ำมันท่วมตื้น ให้ลึกประมาณ 6–7 มม. ในกระทะ 24 ซม. พักน้ำมันใช้แล้วให้เย็นแล้วทิ้ง"
  );

  step(recipe, "Shape and dust the keftedes", ml(
    "Divide the mixture into 24 equal meatballs, about 40–45 g each after draining the bread and onion; the final weight is approximate. This is 4 meatballs per each of 6 servings, with 700 g raw mince or about 117 g per serving before the bread, milk, egg and herbs are added. Lightly dust with only as much of the listed 80 g flour as needed; shake off excess and discard any flour that touched raw meat.",
    "將肉餡分成 24 顆大小相同的肉丸，擠乾麵包和洋蔥後每顆約 40–45 公克，重量為估值。六份各 4 顆；700 公克生絞肉相當於每份約 117 公克，尚未計入麵包、牛奶、雞蛋和香草。從列出的 80 公克麵粉中取足夠薄薄裹一層即可，抖掉多餘粉，接觸生肉的麵粉要丟棄。",
    "肉だねを24等分し、パンと玉ねぎの水分を絞った後で1個約40〜45gを目安に丸めます。これは概算です。6人分で1人4個、ひき肉700gは具材を加える前で1人約117gです。パン、牛乳、卵、ハーブの分は含みません。用意した薄力粉80gは必要な分だけ薄くまぶし、余分を落とします。生肉に触れた粉は捨てます。",
    "빵과 양파의 수분을 짠 뒤 반죽을 같은 크기로 24개로 나눠 미트볼을 빚는다. 한 개는 약 40~45g으로 추정한다. 6인분에 1인당 4개이며, 생고기 700g은 빵·우유·달걀·허브를 넣기 전 기준으로 1인당 약 117g이다. 빵가루를 묻힐 때 준비한 밀가루 80g 중 필요한 만큼만 얇게 사용하고 여분은 털어낸다. 생고기에 닿은 밀가루는 버린다.",
    "แบ่งส่วนผสมเป็นลูกชิ้นขนาดเท่ากัน 24 ลูก หลังบีบน้ำออกจากขนมปังและหอมหัวใหญ่แล้ว ลูกละประมาณ 40–45 กรัม เป็นค่าประมาณ ได้ 6 ที่ ที่ละ 4 ลูก เนื้อบดดิบ 700 กรัมคิดเป็นประมาณ 117 กรัมต่อที่ก่อนรวมขนมปัง นม ไข่ และสมุนไพร ใช้แป้ง 80 กรัมที่เตรียมไว้เท่าที่จำเป็นคลุกบาง ๆ สะบัดแป้งส่วนเกิน และทิ้งแป้งที่สัมผัสเนื้อดิบ"
  ));

  step(recipe, "Shallow-fry in batches", ml(
    "In a wide 24 cm pan, heat the listed 300 ml oil to about 175°C, a recipe-selected frying target for browning, not a food-safety endpoint. It should make roughly a 6–7 mm layer. Fry 8 meatballs at a time for about 5–6 minutes, turning every minute; repeat for 3 batches and let the oil return near 175°C between batches. These times are estimates. Check the centre of the largest meatball in each batch: mixed ground beef and pork must reach the official 71°C (160°F) endpoint. If lower, fry 1 minute more and recheck.",
    "在 24 公分寬鍋中加列出的 300 毫升油，加熱至約 175°C；這是讓表面上色的食譜油炸設定，不是食安熟度終點，油深約 6–7 毫米。每次放 8 顆，煎約 5–6 分鐘並每分鐘翻動；共煎 3 批，每批間讓油溫回到約 175°C。時間都是估值。測量每批最大肉丸的中心：牛豬混合絞肉須達官方安全中心溫度 71°C（160°F）；若不足，再煎 1 分鐘後重測。",
    "直径24cmの広いフライパンに指定の油300mlを入れ、約175°Cに熱します。これは焼き色を付けるためのレシピ上の油温で、安全な火入れ温度ではありません。油深は約6〜7mmです。8個ずつ約5〜6分、毎分返しながら3回に分けて揚げます。各回の間に油温を約175°Cまで戻します。時間は目安です。各回で最大の肉団子の中心を測り、牛豚のひき肉は公式の安全温度71°C（160°F）に達する必要があります。低ければ1分追加して再測定します。",
    "넓은 지름 24cm 팬에 준비한 기름 300ml를 넣고 약 175°C로 가열한다. 이 온도는 갈색을 내기 위한 레시피 조리 설정이지 식품 안전 온도가 아니다. 기름 깊이는 약 6~7mm다. 한 번에 8개씩 약 5~6분, 매분 뒤집으며 3회 튀기고 배치 사이 기름 온도를 약 175°C로 되돌린다. 시간은 추정치다. 각 배치에서 가장 큰 미트볼의 중심을 재고, 소고기·돼지고기 혼합 다짐육은 공식 안전 중심온도인 71°C (160°F)에 도달해야 한다. 낮으면 1분 더 튀기고 다시 잰다.",
    "ใส่น้ำมัน 300 มล. ตามรายการในกระทะกว้าง 24 ซม. ตั้งไว้ประมาณ 175°C นี่คืออุณหภูมิทอดตามสูตรเพื่อให้เกิดสี ไม่ใช่จุดวัดความปลอดภัย น้ำมันจะลึกประมาณ 6–7 มม. ทอดครั้งละ 8 ลูกประมาณ 5–6 นาที พลิกทุกนาที ทำ 3 รอบและรอให้น้ำมันกลับใกล้ 175°C ระหว่างรอบ เวลาเป็นค่าประมาณ วัดตรงกลางลูกที่ใหญ่ที่สุดของแต่ละรอบ เนื้อบดผสมวัวกับหมูต้องถึงอุณหภูมิปลอดภัยอย่างเป็นทางการ 71°C (160°F) หากต่ำให้ทอดเพิ่ม 1 นาทีแล้ววัดซ้ำ"
  ));

  step(recipe, "Drain briefly and serve", ml(
    "Move each batch to a clean wire rack or absorbent paper and drain for about 3 minutes; rest another 5 minutes before serving. These short waits are texture estimates, not safety steps. Serve 4 meatballs per person while warm, with the crust lightly crisp and the centre juicy.",
    "每批肉丸移到乾淨網架或吸油紙上瀝約 3 分鐘，食用前再靜置 5 分鐘。這些短暫等待是口感安排，不是食安步驟。趁溫熱每人上桌 4 顆，外皮略酥、中心多汁。",
    "各回を清潔な網またはペーパータオルに取り、約3分油を切ります。盛り付け前にさらに5分休ませます。この短い待ち時間は食感のための目安で、安全工程ではありません。温かいうちに1人4個ずつ盛り、外は軽くカリッと、中はジューシーに仕上げます。",
    "각 배치를 깨끗한 철망이나 키친타월에 옮겨 약 3분 기름을 빼고, 내기 전 5분 더 둔다. 이 짧은 대기 시간은 식감을 위한 추정치이지 안전 조리 단계가 아니다. 따뜻할 때 1인당 4개씩 내어 겉은 살짝 바삭하고 속은 촉촉하게 한다.",
    "ย้ายแต่ละรอบลงตะแกรงสะอาดหรือกระดาษซับน้ำมัน พักให้สะเด็ดประมาณ 3 นาที แล้วพักต่ออีก 5 นาทีก่อนเสิร์ฟ เวลาพักนี้เป็นค่าประมาณเพื่อเนื้อสัมผัส ไม่ใช่ขั้นตอนความปลอดภัย เสิร์ฟอุ่น ๆ คนละ 4 ลูก ให้เปลือกกรอบเล็กน้อยและข้างในฉ่ำ"
  ));

  recipe.storage = ml(
    "Cool in shallow containers and refrigerate within 2 hours at 4°C (40°F) or below. FoodSafety.gov lists 3–4 days for cooked leftovers; this recipe favours eating within 3 days for the crisp crust, a quality choice rather than a shorter official safety limit. Reheat the portion needed until it reaches 74°C (165°F) throughout.",
    "放入淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 列出的熟食官方冷藏期限為 3–4 天；本食譜為保留酥皮口感，建議 3 天內食用，這是品質選擇，不是較短的官方食安期限。只回熱要吃的份量，並加熱至中心各處達 74°C（165°F）。",
    "浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govは調理済みの残り物を3〜4日保存できると案内しています。このレシピでは衣の食感を考えて3日以内を勧めますが、これは品質上の選択で、公式の安全期限を短縮するものではありません。食べる分だけ温め直し、全体を74°C（165°F）にします。",
    "얕은 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov는 조리한 남은 음식을 공식적으로 3~4일 보관할 수 있다고 안내한다. 이 레시피는 바삭한 겉면을 위해 3일 안에 먹기를 권하며, 이는 품질상 선택이지 공식 안전 기한을 줄인 것이 아니다. 먹을 만큼만 데워 전체가 74°C (165°F)에 도달하게 한다.",
    "ใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า FoodSafety.gov ระบุว่าอาหารปรุงสุกที่เหลือเก็บได้ 3–4 วัน สูตรนี้แนะนำให้กินภายใน 3 วันเพื่อรักษาความกรอบ เป็นการเลือกด้านคุณภาพ ไม่ใช่การลดกำหนดความปลอดภัยอย่างเป็นทางการ อุ่นเฉพาะส่วนที่จะกินจนทั่วถึง 74°C (165°F)"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (ground meat and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (chill and separate)", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Chart (cooked leftovers)", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts");
}

function reviseCaKhoTo(recipe) {
  recipe.prepMinutes = 30;
  recipe.cookMinutes = 45;
  recipe.totalMinutes = 75;
  const fish = recipe.ingredients.find((row) => row.item.en.startsWith("catfish steaks"));
  if (!fish) throw new Error("ca-kho-to: missing catfish ingredient");
  fish.item = ml(
    "four catfish steaks with skin, about 200 g each and 3 cm thick",
    "四片帶皮鯰魚排，每片約 200 公克、厚 3 公分",
    "皮付きのナマズ切り身4切れ。1切れ約200g、厚さ3cm",
    "껍질을 붙인 메기 스테이크 4조각, 각 약 200g, 두께 3cm",
    "สเต๊กปลาดุกติดหนัง 4 ชิ้น ชิ้นละประมาณ 200 กรัม หนา 3 ซม."
  );

  step(recipe, "Make amber caramel", ml(
    "In a wide heavy saucepan, combine all 30 g sugar and 20 ml of the listed water. Heat over medium for an estimated 4–6 minutes, swirling the pan without stirring, until deep amber. The clock is only a guide; remove from the heat before it smokes or smells burnt.",
    "厚底寬鍋中放入全部 30 公克糖和列出的 20 毫升水。中火加熱約 4–6 分鐘（估值），轉動鍋子但不攪拌，直到呈深琥珀色。時間只作參考；冒煙或聞到焦味前就離火。",
    "厚手の広い鍋に砂糖30gすべてと分量の水20mlを入れます。中火で約4〜6分を目安に加熱し、混ぜずに鍋を揺すって濃い琥珀色にします。時間は目安です。煙が出たり焦げ臭くなったりする前に火から下ろします。",
    "두꺼운 넓은 냄비에 설탕 30g 전량과 계량한 물 20ml를 넣는다. 중불에서 약 4~6분 가열하며 젓지 말고 냄비를 흔들어 진한 호박색을 낸다. 시간은 참고치다. 연기가 나거나 탄 냄새가 나기 전에 불에서 내린다.",
    "ใส่น้ำตาล 30 กรัมทั้งหมดกับน้ำ 20 มล. ที่ตวงไว้ลงในหม้อก้นหนาใบกว้าง ใช้ไฟกลางประมาณ 4–6 นาที คอยหมุนหม้อโดยไม่คนจนเป็นสีอำพันเข้ม เวลานี้เป็นค่าประมาณ ยกลงก่อนมีควันหรือกลิ่นไหม้"
  ));

  step(recipe, "Braise gently", ml(
    "Lay the four seasoned steaks in one layer and add all remaining marinade, 200 ml coconut water and the chile. Bring just to a gentle bubble over medium heat, then lower the heat, leave the lid slightly ajar and braise for about 20 minutes. This is a starting estimate for 3 cm steaks. Spoon sauce over the top every 5 minutes and rock the pan instead of stirring.",
    "四片醃好的魚排單層排入鍋中，加入全部剩餘醃汁、200 毫升椰子水和辣椒。中火加熱至微滾後立刻轉小火，鍋蓋留縫，燉約 20 分鐘。這是 3 公分魚排的起始估值。每 5 分鐘舀醬汁淋在魚面，並輕晃鍋子，不要攪拌。",
    "下味を付けた4切れを一層に並べ、残りの漬け汁、ココナッツウォーター200ml、唐辛子をすべて加えます。中火で静かに泡立つまで温めたらすぐ弱火にし、ふたを少しずらして約20分煮ます。厚さ3cmの切り身に対する目安時間です。5分ごとに煮汁をかけ、混ぜずに鍋を揺すります。",
    "양념한 생선 4조각을 한 층으로 놓고 남은 양념, 코코넛워터 200ml, 고추를 모두 넣는다. 중불에서 보글보글 끓기 시작하면 바로 약불로 낮추고 뚜껑을 살짝 열어 약 20분 조린다. 두께 3cm 생선 기준의 시작 추정 시간이다. 5분마다 소스를 생선 위에 끼얹고 젓는 대신 냄비를 흔든다.",
    "วางปลา 4 ชิ้นที่หมักไว้เป็นชั้นเดียว ใส่น้ำหมักที่เหลือ น้ำมะพร้าว 200 มล. และพริกทั้งหมด ตั้งไฟกลางจนเริ่มเดือดเบา ๆ แล้วลดไฟทันที แง้มฝาและเคี่ยวประมาณ 20 นาที เป็นค่าประมาณเริ่มต้นสำหรับปลาหนา 3 ซม. ทุก 5 นาทีตักซอสราดหน้าและโยกหม้อแทนการคน"
  ));

  step(recipe, "Reduce to a glaze", ml(
    "Check the centre of each thick steak with a food thermometer, avoiding the backbone. Fish is safely cooked at 63°C (145°F); the simmer time is an estimate, so if a steak is below that point continue in 2-minute increments and recheck. Once all four steaks reach 63°C, lift them with a broad spatula to a clean warm plate. Simmer the sauce separately, uncovered, for an estimated 5–8 minutes until it coats a spoon; sauce colour and thickness are not safety tests. Return the fish briefly to coat if needed.",
    "用食物溫度計測量每片厚魚排中心，避開脊骨。魚的官方安全熟度為 63°C（145°F）；燉煮時間只是估值，未達時每次再煮 2 分鐘並重測。四片魚都達 63°C 後，用寬鍋鏟移到乾淨的溫盤。醬汁另行不加蓋煮約 5–8 分鐘（估值）至能裹住湯匙；醬色和濃稠度不是食安測試。需要時將魚短暫放回裹醬。",
    "背骨に触れないよう食品用温度計で厚い切り身それぞれの中心を測ります。魚の安全な加熱温度は63°C（145°F）です。煮る時間は目安なので、未達なら2分ずつ加熱して再測定します。4切れすべてが63°Cに達したら、幅広のへらで清潔な温めた皿に移します。煮汁は別にふたをせず、スプーンに絡むまで約5〜8分煮詰めます。色や濃度は安全確認ではありません。必要なら魚を短時間戻してたれを絡めます。",
    "등뼈에 닿지 않게 식품 온도계로 두꺼운 생선 각 조각의 중심을 잰다. 생선의 공식 안전 익힘 온도는 63°C (145°F)다. 조림 시간은 추정치이므로 낮으면 2분씩 더 끓여 다시 잰다. 네 조각 모두 63°C에 도달하면 넓은 주걱으로 깨끗하고 따뜻한 접시에 옮긴다. 소스는 뚜껑을 열고 따로 약 5~8분 졸여 숟가락에 묻을 정도로 만든다. 색과 농도는 안전 판정 기준이 아니다. 필요하면 생선을 잠깐 다시 넣어 소스를 입힌다.",
    "ใช้เทอร์โมมิเตอร์วัดตรงกลางส่วนที่หนาของปลาแต่ละชิ้น โดยไม่ให้โดนกระดูกสันหลัง ปลาได้ความปลอดภัยเมื่อถึง 63°C (145°F) เวลาเคี่ยวเป็นค่าประมาณ หากยังต่ำให้เคี่ยวเพิ่มครั้งละ 2 นาทีแล้ววัดซ้ำ เมื่อปลาทั้ง 4 ชิ้นถึง 63°C แล้วใช้ตะหลิวกว้างย้ายลงจานสะอาดที่อุ่นไว้ เคี่ยวซอสแยกโดยไม่ปิดฝาประมาณ 5–8 นาทีจนเคลือบช้อน สีและความข้นของซอสไม่ใช่เกณฑ์ความปลอดภัย หากจำเป็นนำปลากลับลงไปคลุกซอสสั้น ๆ"
  ));

  step(recipe, "Finish with scallions", ml(
    "Return the four steaks to the glazed sauce only long enough to coat them. Add all 20 g scallions and the remaining 1 g pepper, warm for about 1 minute, then turn off the heat. Divide one steak and 150 g cooked rice per person among four plates; spoon the remaining sauce evenly over the fish and serve at once.",
    "將四片魚排放回收濃的醬汁中，只需短暫裹勻。加入全部 20 公克青蔥和剩下的 1 公克胡椒，再加熱約 1 分鐘後關火。分成四盤，每人一片魚排配 150 公克熟飯，剩餘醬汁平均淋上，立即上桌。",
    "魚4切れを煮詰めたたれに戻し、表面に絡めるだけにします。ねぎ20gすべてと残りのこしょう1gを加え、約1分温めて火を止めます。4皿に切り身を1切れずつ、炊いたご飯150gずつ盛ります。残ったたれも均等にかけ、すぐに供します。",
    "생선 네 조각을 졸인 소스에 잠깐 넣어 겉에 묻힌다. 대파 20g 전량과 남은 후추 1g을 넣고 약 1분 데운 뒤 불을 끈다. 네 접시에 생선 한 조각씩과 지은 밥 150g씩 나누어 담고 남은 소스를 고르게 끼얹어 바로 낸다.",
    "นำปลาทั้ง 4 ชิ้นกลับลงในซอสที่เคี่ยวแล้วเพียงให้ซอสเคลือบ ใส่ต้นหอม 20 กรัมทั้งหมดกับพริกไทยที่เหลือ 1 กรัม อุ่นประมาณ 1 นาทีแล้วปิดไฟ แบ่งปลา 1 ชิ้นและข้าวสวย 150 กรัมต่อคนลง 4 จาน ราดซอสที่เหลือให้ทั่วและเสิร์ฟทันที"
  ));

  recipe.storage = ml(
    "Cool the fish and rice in separate shallow containers and refrigerate within 2 hours at 4°C (40°F) or below. This recipe suggests using the fish within 2 days for best texture; that is a quality choice, not an official seafood storage limit. Reheat only the portion needed until the centre reaches the official leftover temperature of 74°C (165°F).",
    "魚和飯分開放入淺盒，於 2 小時內冷藏在 4°C（40°F）以下。本食譜建議魚肉在 2 天內食用以維持口感，這是品質選擇，不是官方海鮮冷藏期限。只回熱要吃的份量，直到中心達官方剩菜回熱溫度 74°C（165°F）。",
    "魚とご飯は別々の浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。このレシピでは食感を保つため2日以内の使用を勧めますが、これは品質上の選択であり、公式な魚介類の保存期限ではありません。食べる分だけ温め直し、中心が公式の残り物の温度74°C（165°F）に達するようにします。",
    "생선과 밥을 따로 얕은 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. 이 레시피는 좋은 식감을 위해 생선을 2일 안에 먹기를 권한다. 이는 품질상 선택이지 공식 해산물 보관 기한이 아니다. 먹을 만큼만 데워 중심이 공식 남은 음식 재가열 온도인 74°C (165°F)에 도달하게 한다.",
    "ใส่ปลาและข้าวในภาชนะตื้นแยกกันและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า สูตรนี้แนะนำให้กินปลาภายใน 2 วันเพื่อเนื้อสัมผัสที่ดี เป็นการเลือกด้านคุณภาพ ไม่ใช่กำหนดเวลาเก็บอาหารทะเลอย่างเป็นทางการ อุ่นเฉพาะส่วนที่จะกินจนใจกลางถึงอุณหภูมิอุ่นอาหารเหลืออย่างเป็นทางการที่ 74°C (165°F)"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (finfish and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
  addOfficial(recipe, "FDA: Selecting and Serving Fresh and Frozen Seafood Safely", "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely");
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (chill and separate)", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
}

function reviseSamosa(recipe) {
  recipe.prepMinutes = 80;
  recipe.cookMinutes = 65;
  recipe.totalMinutes = 145;
  const fryingOil = recipe.ingredients.find((row) => row.item.en === "neutral frying oil");
  if (!fryingOil) throw new Error("samosa: missing frying oil ingredient");
  fryingOil.item = ml(
    "neutral frying oil; 1.8 L gives about 5.7 cm depth in a 20 cm pot; cool and discard after frying",
    "中性炸油；在 20 公分鍋中倒入 1.8 公升約深 5.7 公分；炸後冷卻並妥善丟棄",
    "揚げ油用の中性油。直径20cmの鍋に1.8L入れると深さ約5.7cm。使用後は冷まして廃棄",
    "튀김용 중성유. 지름 20cm 냄비에 1.8L를 넣으면 깊이가 약 5.7cm다. 사용 후 식혀 버린다",
    "น้ำมันรสกลางสำหรับทอด ใส่ 1.8 ลิตรในหม้อ 20 ซม. จะลึกประมาณ 5.7 ซม. พักให้เย็นแล้วทิ้งหลังทอด"
  );

  step(recipe, "Cook a dry potato filling", ml(
    "Add all 150 g peas and 30 ml water, cover and cook about 3 minutes until the peas are tender. Add all 700 g cooked potato and the remaining 4 g salt; fold gently for an estimated 4–5 minutes until dry enough to hold its shape. Turn off the heat, mix in all 4 g amchur and 3 g garam masala, then spread the filling in a shallow tray. Let steam escape briefly and refrigerate within 2 hours at 4°C (40°F) or below; it must be fully cold before filling the wrappers. Do not leave cooked filling on the counter to cool for an extended period.",
    "加入全部 150 公克豌豆和 30 毫升水，蓋鍋煮約 3 分鐘至豌豆軟。加入全部 700 公克熟馬鈴薯及剩下的 4 公克鹽，輕輕拌炒約 4–5 分鐘（估值），直到餡料夠乾、能保持形狀。關火，拌入全部 4 公克芒果粉和 3 公克印度綜合香料，攤在淺盤上。稍微散熱後於 2 小時內冷藏在 4°C（40°F）以下；包入餅皮前須完全冷卻。不要把熟餡長時間留在室溫散熱。",
    "グリーンピース150gすべてと水30mlを加えてふたをし、豆が柔らかくなるまで約3分煮ます。じゃがいも700gすべてと残りの塩4gを加え、形が保てる程度に水分が飛ぶまで約4〜5分やさしく混ぜます。時間は目安です。火を止め、アムチュール4gとガラムマサラ3gをすべて混ぜ、浅いトレーに広げます。短時間蒸気を逃がし、2時間以内に4°C（40°F）以下で冷蔵します。皮に詰める前に完全に冷やしてください。室温に長く置いて冷まさないでください。",
    "완두콩 150g 전량과 물 30ml를 넣고 뚜껑을 덮어 약 3분 익혀 부드럽게 한다. 삶은 감자 700g 전량과 남은 소금 4g을 넣고 모양이 유지될 만큼 수분이 마를 때까지 약 4~5분 부드럽게 섞는다. 시간은 추정치다. 불을 끄고 암추르 4g과 가람 마살라 3g을 모두 섞은 뒤 얕은 쟁반에 펼친다. 김을 잠깐 빼고 2시간 안에 4°C (40°F) 이하로 냉장한다. 피에 넣기 전에 속을 완전히 식힌다. 익힌 속을 상온에 오래 두어 식히지 않는다.",
    "ใส่ถั่วลันเตา 150 กรัมทั้งหมดและน้ำ 30 มล. ปิดฝาปรุงประมาณ 3 นาทีจนถั่วนุ่ม ใส่มันฝรั่งต้ม 700 กรัมทั้งหมดกับเกลือที่เหลือ 4 กรัม คลุกเบา ๆ ประมาณ 4–5 นาทีจนไส้แห้งพอคงรูป เวลานี้เป็นค่าประมาณ ปิดไฟ ใส่อัมชูร์ 4 กรัมและการัมมาซาลา 3 กรัมทั้งหมด คลุกแล้วเกลี่ยลงถาดตื้น ระบายไอช่วงสั้น ๆ และแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า ต้องเย็นสนิทก่อนห่อ อย่าทิ้งไส้สุกไว้ที่อุณหภูมิห้องนานเพื่อให้เย็น"
  ));

  step(recipe, "Fill and seal", ml(
    "Divide all the cold filling into 12 equal mounds, about 70–75 g each depending on moisture lost during cooking, so none is left unused. Add one mound to each cone, leaving 1.5 cm headspace. Moisten the rim, press out trapped air, fold a small pleat and seal firmly. Keep the shaped samosas covered and fry them promptly; do not taste the raw flour dough.",
    "將冷卻後的全部餡料分成 12 等份，因炒餡蒸發水分，每份約 70–75 公克；全部用完，不要剩餡。每個錐筒放一份，頂端留 1.5 公分空間。沾水潤濕餅皮邊，擠出空氣，摺出小摺並牢牢封口。包好的咖哩角加蓋並儘快油炸；不可試吃生麵粉麵糰。",
    "冷めた具をすべて12等分します。炒めて蒸発した水分によって1個約70〜75gを目安にし、具を残さないようにします。各コーンに1つ分を詰め、縁から1.5cm空けます。縁を水で湿らせ、空気を押し出し、小さなひだを折ってしっかり閉じます。包んだサモサは覆って、なるべく早く揚げます。生の小麦粉生地を味見しないでください。",
    "식힌 속을 전부 12등분한다. 볶는 동안 수분이 줄어 각 몫은 약 70~75g으로 추정되며 남는 속이 없도록 나눈다. 한 몫씩 콘에 넣고 위쪽 1.5cm를 비운다. 가장자리를 물로 적시고 갇힌 공기를 눌러 빼고 작은 주름을 접어 단단히 봉한다. 빚은 사모사는 덮어 두었다가 바로 튀기며 생밀가루 반죽을 맛보지 않는다.",
    "แบ่งไส้ที่เย็นแล้วทั้งหมดเป็น 12 ส่วนเท่า ๆ กัน ส่วนละประมาณ 70–75 กรัม ขึ้นอยู่กับน้ำที่ระเหยระหว่างผัด แบ่งให้หมดไม่ให้เหลือ ใส่หนึ่งส่วนในกรวยแต่ละชิ้นโดยเว้นขอบด้านบน 1.5 ซม. แตะน้ำที่ขอบ ไล่อากาศ พับจีบเล็ก ๆ แล้วกดปิดให้แน่น คลุมซาโมซาที่ขึ้นรูปแล้วและนำไปทอดโดยเร็ว ห้ามชิมแป้งดิบ"
  ));

  step(recipe, "Begin frying at low heat", ml(
    "In a deep 20 cm pot, heat the listed 1.8 L oil to 145–150°C; this is a recipe-selected frying range for a pale, blister-free crust, not a food-safety endpoint. Fry 4 samosas per batch for an estimated 8–10 minutes, moving them gently so they do not stick. Make 3 batches and let the oil return to the same range between batches. The clock and oil reading guide crust texture only; do not taste any undercooked dough.",
    "在 20 公分深鍋中將列出的 1.8 公升油加熱至 145–150°C；這是讓外皮淡色、少起泡的食譜油炸設定，不是食安熟度終點。每批放 4 個，輕輕移動以免黏鍋，估計炸 8–10 分鐘。共炸 3 批，每批之間讓油溫回到相同範圍。計時和油溫只用來控制外皮口感；不要試吃未熟麵糰。",
    "直径20cmの深鍋で指定の油1.8Lを145〜150°Cに熱します。これは白っぽく気泡の少ない皮にするためのレシピ上の油温で、安全確認の温度ではありません。サモサを4個ずつ、くっつかないようそっと動かしながら、目安として8〜10分揚げます。3回に分け、各回の間に油を同じ温度帯に戻します。時間と油温は皮の食感の目安で、生の生地を味見しないでください。",
    "깊은 지름 20cm 냄비에 준비한 기름 1.8L를 145~150°C로 가열한다. 이 온도는 연한 색의 기포 적은 피를 만들기 위한 레시피 조리 범위이지 식품 안전 온도가 아니다. 한 번에 4개씩 넣고 붙지 않도록 부드럽게 움직이며 약 8~10분 튀긴다. 총 3회 나누어 튀기고 매번 기름을 같은 온도 범위로 되돌린다. 시간과 기름 온도는 피의 식감만 안내하며 덜 익은 반죽을 맛보지 않는다.",
    "ตั้งน้ำมัน 1.8 ลิตรตามรายการในหม้อลึกขนาด 20 ซม. ให้ถึง 145–150°C ช่วงนี้เป็นอุณหภูมิทอดตามสูตรเพื่อให้เปลือกสีอ่อนและเกิดฟองน้อย ไม่ใช่จุดวัดความปลอดภัย ทอดครั้งละ 4 ชิ้นประมาณ 8–10 นาที ขยับเบา ๆ ไม่ให้ติดกัน ทำ 3 รอบและรอให้น้ำมันกลับสู่ช่วงเดิมระหว่างรอบ เวลาและอุณหภูมิน้ำมันใช้บอกเนื้อสัมผัสของเปลือกเท่านั้น ห้ามชิมแป้งที่ยังไม่สุก"
  ));

  step(recipe, "Raise heat and crisp", ml(
    "After each low-temperature batch, raise the oil gradually to 165°C, a recipe-selected crisping target rather than a safety value. Fry that batch for an estimated 4–6 minutes, turning, until the pastry is evenly deep gold with no pale, soft seam. Split one test samosa: the pastry layers at the seam must be fully cooked and crisp, and the already-cooked potato-and-pea filling should be steaming hot. If the pastry is still soft inside or the filling is not hot, continue frying in 1-minute increments. Drain upright on a clean rack and rest about 8 minutes before serving; these checks are for complete cooking and texture, not a numeric internal-temperature standard.",
    "每批低溫炸完後，逐漸將油升至 165°C；這是讓外皮酥脆的食譜設定，不是安全溫度。該批續炸約 4–6 分鐘（估值），期間翻動至外皮均勻深金黃、接縫不再蒼白柔軟。切開一個檢查：接縫處麵皮必須完全熟透酥脆，已煮熟的馬鈴薯豌豆餡應燙熱冒氣；若內層麵皮仍軟或餡料不熱，每次續炸 1 分鐘。直立放在乾淨網架瀝油，靜置約 8 分鐘再上桌。這些是確認熟透和口感的檢查，不是數字化中心溫度標準。",
    "低温の各バッチを揚げた後、油をゆっくり165°Cまで上げます。これは皮をカリッとさせるためのレシピ上の目標で、安全温度ではありません。そのバッチを目安として4〜6分、返しながら、皮全体が濃いきつね色で継ぎ目に白く柔らかい部分がなくなるまで揚げます。試しに1個を割り、継ぎ目の皮の層まで完全に火が通ってカリッとしていること、加熱済みのじゃがいもと豆の具から湯気が立つことを確かめます。中の皮が柔らかい、または具が熱くなければ1分ずつ追加で揚げます。清潔な網に立てて油を切り、約8分休ませてから盛り付けます。これは全体に火を通し食感を確認する方法で、数値の中心温度基準ではありません。",
    "저온으로 튀긴 각 배치가 끝나면 기름을 서서히 165°C까지 올린다. 이는 바삭한 피를 위한 레시피 목표이지 안전 온도가 아니다. 해당 배치를 약 4~6분 더 튀기며 뒤집어 피가 고르게 짙은 황금색이 되고 봉합선에 창백하고 부드러운 부분이 없게 한다. 한 개를 갈라 확인한다. 접힌 틈의 피까지 완전히 익어 바삭하고 이미 익힌 감자·완두 속에서 김이 나야 한다. 안쪽 피가 부드럽거나 속이 뜨겁지 않으면 1분씩 더 튀긴다. 깨끗한 철망에 세워 기름을 빼고 약 8분 둔 뒤 낸다. 이는 완전히 익었는지와 식감을 확인하는 방법이며 수치로 정한 중심온도 기준은 아니다.",
    "หลังทอดแต่ละรอบด้วยไฟอ่อน ค่อย ๆ เพิ่มน้ำมันให้ถึง 165°C ซึ่งเป็นเป้าหมายตามสูตรเพื่อให้กรอบ ไม่ใช่ค่าเพื่อความปลอดภัย ทอดรอบนั้นต่อประมาณ 4–6 นาที พลิกจนเปลือกเป็นสีทองเข้มทั่วและรอยปิดไม่มีส่วนซีดนิ่ม ผ่าซาโมซาหนึ่งชิ้นเพื่อตรวจ ชั้นแป้งตรงรอยปิดต้องสุกกรอบ และไส้มันฝรั่งกับถั่วที่ปรุงสุกแล้วควรร้อนมีไอ หากแป้งข้างในยังนิ่มหรือไส้ยังไม่ร้อน ให้ทอดเพิ่มครั้งละ 1 นาที ตั้งบนตะแกรงสะอาดให้สะเด็ดน้ำมัน พักประมาณ 8 นาทีก่อนเสิร์ฟ การตรวจนี้ดูว่าทุกส่วนสุกและได้เนื้อสัมผัส ไม่ใช่มาตรฐานอุณหภูมิใจกลางเป็นตัวเลข"
  ));

  recipe.storage = ml(
    "Serve fresh for the crispest crust. If any remain, cool briefly and refrigerate in a shallow container within 2 hours at 4°C (40°F) or below. This recipe recommends eating within 2 days for texture; that is a quality choice, not an official safety deadline. Reheat leftovers until they reach 74°C (165°F) throughout, the official leftover endpoint, then re-crisp in a 190°C oven if desired. Do not microwave if you want to keep the crust crisp.",
    "現炸現吃最酥。若有剩，稍微散熱後放入淺盒，於 2 小時內冷藏在 4°C（40°F）以下。本食譜建議 2 天內食用以維持口感，這是品質選擇，不是官方食安期限。剩食回熱至各處達官方回熱溫度 74°C（165°F），需要時再用 190°C 烤箱回烤變酥。若要保持酥皮，不要用微波爐。",
    "揚げたてが最もカリッとします。残った場合は短時間冷まし、浅い容器に入れて2時間以内に4°C（40°F）以下で冷蔵します。このレシピでは食感のため2日以内を勧めますが、これは品質上の選択で、公式の安全期限ではありません。残り物は公式の再加熱温度74°C（165°F）に全体が達するまで温め直し、必要なら190°Cのオーブンで再度カリッとさせます。衣を保つには電子レンジを使わないでください。",
    "갓 튀겨 먹는 것이 가장 바삭하다. 남으면 잠깐 식힌 뒤 얕은 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. 이 레시피는 식감을 위해 2일 안에 먹기를 권하며, 이는 품질상 선택이지 공식 안전 기한이 아니다. 남은 음식은 공식 재가열 기준인 74°C (165°F)에 전체가 도달할 때까지 데우고, 원하면 190°C 오븐에서 다시 바삭하게 한다. 바삭한 식감을 원하면 전자레인지를 사용하지 않는다.",
    "ควรกินทันทีเพื่อให้เปลือกกรอบ หากเหลือให้พักคลายร้อนสั้น ๆ ใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า สูตรนี้แนะนำให้กินภายใน 2 วันเพื่อเนื้อสัมผัส เป็นการเลือกด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ อุ่นอาหารเหลือจนทั่วถึงอุณหภูมิอย่างเป็นทางการที่ 74°C (165°F) แล้วนำเข้าเตาอบ 190°C ให้กรอบอีกครั้งได้หากต้องการ อย่าใช้ไมโครเวฟหากต้องการรักษาความกรอบ"
  );

  addOfficial(recipe, "FDA: Handling Flour Safely (do not eat raw dough; cook flour-containing foods)", "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know");
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (cooling and refrigeration)", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety");
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (reheated leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures");
}

export function refineFiftySecondMethods(recipes) {
  const revisions = new Map([
    ["dakgalbi", reviseDakgalbi],
    ["ca-kho-to", reviseCaKhoTo],
    ["keftedes", reviseKeftedes],
    ["samosa", reviseSamosa]
  ]);
  for (const [id, revise] of revisions) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error(`${id}: missing published recipe for fifty-second method review`);
    recipes[index] = cloneForPublication(recipes[index]);
    revise(recipes[index]);
    for (const locale of ["en", "zh-hant", "ja", "ko", "th"]) {
      if (!recipes[index].storage?.[locale]) throw new Error(`${id}: missing ${locale} storage card`);
      if (!recipes[index].instructions.every((entry) => entry.title?.[locale] && entry.body?.[locale])) {
        throw new Error(`${id}: incomplete ${locale} method after refinement`);
      }
    }
  }
}
