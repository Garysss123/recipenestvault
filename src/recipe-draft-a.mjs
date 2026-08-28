const ml = (en, zhHant, ja, ko, th) => ({
  en,
  "zh-hant": zhHant,
  ja,
  ko,
  th
});

const ingredient = (amount, item) => ({ amount, item });

export const recipeDraftA = [
  {
    id: "mapo-tofu",
    cuisine: "chinese",
    region: ml("Sichuan, China", "中國四川", "中国・四川", "중국 쓰촨", "เสฉวน ประเทศจีน"),
    prepMinutes: 20,
    cookMinutes: 15,
    totalMinutes: 35,
    servings: 3,
    name: ml("Mapo tofu", "麻婆豆腐", "麻婆豆腐", "마파두부", "เต้าหู้มาโป"),
    description: ml(
      "Tender tofu and pork are folded through a fragrant, chile-red Sichuan sauce.",
      "嫩豆腐與豬肉拌入香麻帶紅的四川風味醬汁，麻辣下飯。",
      "やわらかな豆腐と豚ひき肉を、香り高い赤い四川風ソースでまとめます。",
      "부드러운 두부와 돼지고기를 향긋하고 붉은 쓰촨식 소스에 담아낸 요리입니다.",
      "เต้าหู้นุ่มกับหมูสับคลุกซอสเสฉวนสีแดง หอมเผ็ดชาและเข้ากับข้าว"
    ),
    ingredients: [
      ingredient("400 g", ml("soft tofu, cut into 2 cm cubes", "嫩豆腐，切成 2 公分方塊", "絹ごし豆腐（2cm角）", "연두부 또는 부드러운 두부, 2cm 깍둑썰기", "เต้าหู้อ่อน หั่นเต๋า 2 ซม.")),
      ingredient("120 g", ml("ground pork", "豬絞肉", "豚ひき肉", "돼지고기 다짐육", "หมูบด")),
      ingredient("30 g", ml("doubanjiang", "豆瓣醬", "豆板醤", "두반장", "โต้วป้านเจี้ยง")),
      ingredient("10 g", ml("fermented black beans, roughly chopped", "豆豉，略切碎", "豆鼓（粗く刻む）", "발효 검은콩, 굵게 다지기", "ถั่วดำหมัก สับหยาบ")),
      ingredient("15 g", ml("garlic, finely chopped", "蒜末", "にんにく（みじん切り）", "다진 마늘", "กระเทียมสับละเอียด")),
      ingredient("10 g", ml("fresh ginger, finely chopped", "薑末", "しょうが（みじん切り）", "다진 생강", "ขิงสดสับละเอียด")),
      ingredient("3 g", ml("Sichuan peppercorns, ground", "花椒，磨碎", "花椒（すりつぶす）", "화자오, 갈기", "พริกหอมเสฉวนบด")),
      ingredient("25 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("250 ml", ml("unsalted chicken or vegetable stock", "無鹽雞高湯或蔬菜高湯", "無塩の鶏ガラスープまたは野菜だし", "무염 닭 육수 또는 채소 육수", "น้ำสต๊อกไก่หรือผักแบบไม่เค็ม")),
      ingredient("15 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("15 ml", ml("Shaoxing wine", "紹興酒", "紹興酒", "소흥주", "เหล้าเส้าซิง")),
      ingredient("3 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("8 g plus 20 ml water", ml("cornstarch slurry", "玉米澱粉與 20 毫升水調成芡汁", "コーンスターチを水20mlで溶いたもの", "옥수수전분과 물 20ml로 만든 전분물", "แป้งข้าวโพดผสมน้ำ 20 มล.")),
      ingredient("30 g", ml("scallions, thinly sliced", "青蔥，切薄片", "長ねぎ（薄切り）", "대파, 얇게 썰기", "ต้นหอมซอยบาง"))
    ],
    instructions: [
      ml(
        "Soak the tofu in 70°C lightly salted water for 5 minutes, then drain gently. Stir the cornstarch with 20 ml water.",
        "豆腐放入約 70°C 的淡鹽水浸 5 分鐘，再輕輕瀝乾；玉米澱粉加 20 毫升水調勻。",
        "豆腐を70℃の薄い塩水に5分浸してから、くずさないように水気を切ります。コーンスターチを水20mlで溶きます。",
        "두부를 약 70°C의 옅은 소금물에 5분 담갔다가 조심히 건집니다. 옥수수전분을 물 20ml에 풉니다.",
        "แช่เต้าหู้ในน้ำเกลืออ่อนอุณหภูมิประมาณ 70°C นาน 5 นาที แล้วสะเด็ดน้ำอย่างเบามือ ผสมแป้งข้าวโพดกับน้ำ 20 มล."
      ),
      ml(
        "Heat a wok over medium-high heat. Add the oil and pork; stir-fry for 3 minutes until browned and the centre reaches 71°C. Add garlic and ginger for 30 seconds.",
        "炒鍋以中大火預熱，加入油與豬肉炒 3 分鐘至上色，中心達 71°C；加入蒜末、薑末炒 30 秒。",
        "中強火で中華鍋を熱し、油と豚肉を3分炒めて焼き色を付け、中心温度を71℃にします。にんにくとしょうがを加えて30秒炒めます。",
        "웍을 중강불로 달군 뒤 기름과 돼지고기를 3분 볶아 갈색이 나고 중심 온도가 71°C가 되게 합니다. 마늘과 생강을 넣어 30초 볶습니다.",
        "ตั้งกระทะก้นกลมด้วยไฟกลางค่อนแรง ใส่น้ำมันกับหมูผัด 3 นาทีจนเป็นสีน้ำตาลและแกนกลางถึง 71°C ใส่กระเทียมกับขิงผัด 30 วินาที"
      ),
      ml(
        "Reduce the heat to medium. Stir in doubanjiang, black beans, and half of the ground peppercorns for 45 seconds, until the oil turns red.",
        "轉中火，加入豆瓣醬、豆豉與一半花椒粉炒 45 秒，直到油色變紅。",
        "中火に落とし、豆板醤、豆鼓、花椒の半量を加えて45秒炒め、油が赤くなるまで香りを出します。",
        "불을 중불로 낮추고 두반장, 발효 검은콩, 간 화자오의 절반을 넣어 45초 볶아 기름이 붉어지게 합니다.",
        "ลดเป็นไฟกลาง ใส่โต้วป้านเจี้ยง ถั่วดำหมัก และพริกหอมบดครึ่งหนึ่ง ผัด 45 วินาทีจนน้ำมันเปลี่ยนเป็นสีแดง"
      ),
      ml(
        "Pour in the stock, soy sauce, Shaoxing wine, and sugar. Slide in the tofu and simmer uncovered for 5 minutes, shaking the wok instead of stirring.",
        "倒入高湯、生抽、紹興酒與砂糖，滑入豆腐；開蓋煮 5 分鐘，以晃動炒鍋代替翻拌。",
        "スープ、しょうゆ、紹興酒、砂糖を加え、豆腐をそっと入れます。ふたをせず5分煮て、混ぜずに鍋を揺すります。",
        "육수, 간장, 소흥주, 설탕을 붓고 두부를 조심히 넣습니다. 뚜껑을 열어 5분 끓이며 젓지 말고 웍을 흔듭니다.",
        "เติมน้ำสต๊อก ซีอิ๊วขาว เหล้าเส้าซิง และน้ำตาล ค่อย ๆ ใส่เต้าหู้ เคี่ยวเปิดฝา 5 นาที โดยเขย่ากระทะแทนการคน"
      ),
      ml(
        "Stir the slurry once, add half, and simmer for 30 seconds. Add enough of the rest for a sauce that clings to the tofu without becoming stiff.",
        "再攪勻芡汁，先倒入一半煮 30 秒；視濃度補入其餘芡汁，讓醬汁裹住豆腐但不凝滯。",
        "水溶き片栗粉を再び混ぜ、半量を加えて30秒煮ます。豆腐にまとわりつく程度まで残りを少しずつ加え、固くしすぎません。",
        "전분물을 다시 저어 절반을 넣고 30초 끓입니다. 소스가 두부에 걸쭉하게 붙을 만큼만 나머지를 조금씩 넣고 너무 굳히지 않습니다.",
        "คนแป้งอีกครั้ง เติมครึ่งหนึ่งแล้วเคี่ยว 30 วินาที เติมส่วนที่เหลือทีละน้อยจนซอสเคลือบเต้าหู้ แต่ไม่ข้นจนแข็ง"
      ),
      ml(
        "Turn off the heat. Fold in the remaining pepper and scallions, rest for 1 minute, and serve with rice.",
        "關火，拌入剩餘花椒粉與青蔥，靜置 1 分鐘後配飯上桌。",
        "火を止め、残りの花椒と長ねぎを混ぜて1分休ませ、ご飯と一緒に盛ります。",
        "불을 끄고 남은 화자오와 대파를 섞어 1분 두었다가 밥과 함께 냅니다.",
        "ปิดไฟ คลุกพริกหอมบดที่เหลือกับต้นหอม พัก 1 นาที แล้วเสิร์ฟกับข้าว"
      )
    ],
    tips: [
      ml("Use soft tofu but handle it with a wok spatula so the cubes remain distinct.", "選用嫩豆腐，並用炒鍋鏟輕推，豆腐才不會碎成泥。", "絹ごし豆腐を使い、木べらで押さずに鍋を揺すって形を保ちます。", "부드러운 두부를 쓰되 주걱으로 누르지 말고 웍을 흔들어 모양을 지키세요.", "ใช้เต้าหู้อ่อนและเขย่ากระทะแทนการกดด้วยตะหลิว เพื่อให้ชิ้นยังสวย"),
      ml("Taste the sauce after the stock goes in; doubanjiang varies widely in saltiness.", "加入高湯後先試味，豆瓣醬的鹹度差異很大。", "スープを加えた段階で味見します。豆板醤は商品によって塩分が大きく違います。", "육수를 넣은 뒤 간을 보세요. 두반장은 제품마다 염도가 크게 다릅니다.", "ชิมหลังเติมน้ำสต๊อก เพราะความเค็มของโต้วป้านเจี้ยงแต่ละยี่ห้อต่างกันมาก")
    ],
    commonMistakes: [
      ml("Boiling hard can break the tofu and split the sauce; keep the simmer gentle.", "大火滾煮會使豆腐碎裂、醬汁分離，請維持溫和的沸騰。", "強く煮立てると豆腐が崩れ、ソースが分離します。静かな煮立ちを保ちます。", "세게 끓이면 두부가 부서지고 소스가 분리됩니다. 잔잔하게 끓이세요.", "การเดือดแรงทำให้เต้าหู้แตกและซอสแยกชั้น ควรเคี่ยวเบา ๆ"),
      ml("Adding all of the slurry at once can make a gluey sauce.", "一次倒完所有芡汁，醬汁容易變得黏稠如膠。", "水溶き片栗粉を一度に全部入れると、のりのように重くなります。", "전분물을 한꺼번에 넣으면 소스가 풀처럼 뻑뻑해집니다.", "การเติมแป้งทั้งหมดครั้งเดียวทำให้ซอสเหนียวเป็นก้อน")
    ],
    substitutions: [
      ml("Replace pork with finely chopped shiitake mushrooms for a vegetarian version, using vegetable stock.", "豬肉可改用細切香菇，並搭配蔬菜高湯做成素食版本。", "豚肉は細かく刻んだしいたけに替え、野菜だしを使えば植物性にできます。", "돼지고기를 잘게 다진 표고버섯으로 바꾸고 채소 육수를 쓰면 채식으로 만들 수 있습니다.", "เปลี่ยนหมูเป็นเห็ดหอมสับละเอียดและใช้น้ำสต๊อกผักเพื่อทำแบบมังสวิรัติ"),
      ml("Use firm tofu if soft tofu is unavailable, adding 1 minute to the simmer.", "沒有嫩豆腐時可用板豆腐，燉煮時間增加 1 分鐘。", "絹ごし豆腐がなければ木綿豆腐を使い、煮る時間を1分延ばします。", "연두부가 없으면 단단한 두부를 쓰고 끓이는 시간을 1분 늘리세요.", "ถ้าไม่มีเต้าหู้อ่อน ใช้เต้าหู้แข็งและเพิ่มเวลาเคี่ยว 1 นาที")
    ],
    storage: ml("Refrigerate in a sealed container for up to 3 days. Reheat gently with a splash of stock; do not freeze the tofu.", "密封冷藏最多 3 天。復熱時加少量高湯並溫和加熱；豆腐不建議冷凍。", "密閉容器で冷蔵し、3日以内に食べます。少量のスープを足して弱火で温め、豆腐は冷凍しません。", "밀폐 용기에 담아 냉장하고 3일 안에 먹습니다. 육수를 조금 넣어 약하게 데우며 두부는 냉동하지 마세요.", "เก็บในภาชนะปิดสนิทแช่เย็นไม่เกิน 3 วัน อุ่นเบา ๆ พร้อมเติมน้ำสต๊อกเล็กน้อย และไม่ควรแช่แข็งเต้าหู้"),
    cultureNote: ml("The name refers to a pockmarked woman said to have sold this chile-and-bean tofu in Chengdu; modern versions balance heat, aroma, and numbing pepper.", "相傳名稱來自成都一位臉上有麻子的婦人所售的辣豆瓣豆腐；現代版本講究辣、香與花椒麻感的平衡。", "名の由来は、成都で唐辛子と豆板醤の豆腐を売った、あばた顔の女性にちなむとされます。現代の味は辛さ、香り、花椒のしびれの均衡が要です。", "이름은 청두에서 고추와 콩 소스 두부를 팔았다는 곰보 자국 여성의 이야기에서 유래했다고 전해집니다. 오늘날에는 매운맛, 향, 화자오의 얼얼함 균형이 중요합니다.", "เชื่อกันว่าชื่อนี้มาจากหญิงที่มีรอยบนใบหน้าซึ่งขายเต้าหู้ผัดพริกกับถั่วหมักในเฉิงตู ปัจจุบันเน้นสมดุลระหว่างเผ็ด หอม และชาลิ้นจากพริกหอม"),
    sources: [
      { title: "The Woks of Life — Mapo Tofu", url: "https://thewoksoflife.com/ma-po-tofu-real-deal/" },
      { title: "China Sichuan Food — Mapo Tofu", url: "https://www.chinasichuanfood.com/mapo-tofu/" }
    ],
    imageAlt: ml("Mapo tofu with intact tofu cubes, minced pork, red chile sauce, and scallions in a shallow bowl", "淺碗中盛著完整豆腐塊、豬絞肉、紅色辣醬與青蔥的麻婆豆腐", "浅い器に盛った、形を保った豆腐、豚ひき肉、赤い辛味ソース、長ねぎの麻婆豆腐", "얕은 그릇에 담긴 온전한 두부 조각과 돼지고기, 붉은 칠리 소스, 대파를 곁들인 마파두부", "เต้าหู้มาโปในชามตื้น มีชิ้นเต้าหู้ หมูสับ ซอสพริกสีแดง และต้นหอม"),
    visualSpec: "Shallow bowl of intact tofu cubes coated in red chile-bean sauce, visible minced pork, and sliced scallions; no extra garnish."
  },

  {
    id: "kung-pao-chicken",
    cuisine: "chinese",
    region: ml("Sichuan, China", "中國四川", "中国・四川", "중국 쓰촨", "เสฉวน ประเทศจีน"),
    prepMinutes: 20,
    cookMinutes: 12,
    totalMinutes: 32,
    servings: 3,
    name: ml("Kung Pao chicken", "宮保雞丁", "宮保鶏丁", "궁보계정", "ไก่ผัดกงเปา"),
    description: ml(
      "Juicy chicken thigh, dried chiles, peanuts, and scallions meet in a bright sweet-sour wok sauce.",
      "嫩雞腿肉與乾辣椒、花生、青蔥在酸甜明亮的炒鍋醬汁中快速合味。",
      "鶏もも肉、乾燥唐辛子、ピーナッツ、長ねぎを、甘酸っぱい香りのよい炒めソースでまとめます。",
      "촉촉한 닭다리살에 말린 고추, 땅콩, 대파를 달콤새콤한 웍 소스로 빠르게 볶습니다.",
      "เนื้อไก่ส่วนสะโพก พริกแห้ง ถั่วลิสง และต้นหอมผัดเร็ว ๆ กับซอสหวานเปรี้ยวหอมสดใส"
    ),
    ingredients: [
      ingredient("500 g", ml("boneless, skinless chicken thigh, 2 cm pieces", "去骨去皮雞腿肉，切 2 公分塊", "鶏もも肉（骨なし・皮なし、2cm角）", "뼈와 껍질을 제거한 닭다리살, 2cm 크기", "เนื้อสะโพกไก่เลาะกระดูกและหนัง หั่น 2 ซม.")),
      ingredient("10 ml", ml("light soy sauce for the chicken", "醃雞肉用生抽", "鶏肉用の薄口しょうゆ", "닭고기 밑간용 양조간장", "ซีอิ๊วขาวสำหรับหมักไก่")),
      ingredient("10 ml", ml("Shaoxing wine for the chicken", "醃雞肉用紹興酒", "鶏肉用の紹興酒", "닭고기 밑간용 소흥주", "เหล้าเส้าซิงสำหรับหมักไก่")),
      ingredient("8 g", ml("cornstarch for the chicken", "醃雞肉用玉米澱粉", "鶏肉用のコーンスターチ", "닭고기 밑간용 옥수수전분", "แป้งข้าวโพดสำหรับหมักไก่")),
      ingredient("25 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("25 g", ml("dried red chiles, snipped into pieces", "乾紅辣椒，剪成段", "乾燥赤唐辛子（輪切り）", "말린 홍고추, 잘라서 준비", "พริกแดงแห้ง ตัดเป็นท่อน")),
      ingredient("10 g", ml("Sichuan peppercorns", "花椒", "花椒", "화자오", "พริกหอมเสฉวน")),
      ingredient("15 g", ml("garlic, sliced", "蒜片", "にんにく（薄切り）", "마늘 슬라이스", "กระเทียมหั่นแว่น")),
      ingredient("10 g", ml("fresh ginger, matchsticks", "薑絲", "しょうが（細切り）", "생강 채", "ขิงซอยเป็นเส้น")),
      ingredient("40 g", ml("scallions, 3 cm pieces", "青蔥，切 3 公分段", "長ねぎ（3cm長さ）", "대파, 3cm 길이", "ต้นหอมหั่นท่อน 3 ซม.")),
      ingredient("50 g", ml("roasted unsalted peanuts", "烘烤無鹽花生", "無塩ローストピーナッツ", "볶은 무염 땅콩", "ถั่วลิสงคั่วไม่เค็ม")),
      ingredient("20 ml", ml("light soy sauce for the sauce", "調味醬用生抽", "たれ用の薄口しょうゆ", "소스용 양조간장", "ซีอิ๊วขาวสำหรับซอส")),
      ingredient("20 ml", ml("Chinkiang vinegar", "鎮江香醋", "黒酢", "진강식 흑식초", "น้ำส้มสายชูดำจีน")),
      ingredient("15 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("5 ml", ml("toasted sesame oil", "香油", "ごま油", "참기름", "น้ำมันงาคั่ว")),
      ingredient("30 ml", ml("water for the sauce", "調味醬用清水", "たれ用の水", "소스용 물", "น้ำสำหรับซอส")),
      ingredient("5 g", ml("cornstarch for the sauce", "調味醬用玉米澱粉", "たれ用のコーンスターチ", "소스용 옥수수전분", "แป้งข้าวโพดสำหรับซอส"))
    ],
    instructions: [
      ml(
        "Toss the chicken with soy sauce, Shaoxing wine, and cornstarch; rest for 10 minutes. Mix the sauce ingredients in a cup.",
        "雞肉拌入生抽、紹興酒與玉米澱粉，靜置 10 分鐘；將調味醬材料在杯中混勻。",
        "鶏肉にしょうゆ、紹興酒、コーンスターチをもみ込み、10分置きます。たれの材料をカップで混ぜます。",
        "닭고기에 간장, 소흥주, 옥수수전분을 버무려 10분 둡니다. 소스 재료를 컵에 섞습니다.",
        "คลุกไก่กับซีอิ๊วขาว เหล้าเส้าซิง และแป้งข้าวโพด พัก 10 นาที ผสมส่วนผสมซอสในถ้วย"
      ),
      ml(
        "Heat a wok over medium-high heat. Add half the oil and stir-fry the chicken for 3 minutes, turning often, until the thickest piece reaches 74°C; remove.",
        "炒鍋以中大火加熱，加入一半油，雞肉快炒 3 分鐘並頻繁翻動，最厚處達 74°C 後盛出。",
        "中強火で中華鍋を熱し、油の半量で鶏肉を3分、よく返しながら炒めます。最も厚い部分が74℃になったら取り出します。",
        "웍을 중강불로 달구고 기름 절반을 넣어 닭고기를 3분 자주 뒤집어 볶습니다. 가장 두꺼운 부분이 74°C가 되면 덜어 둡니다.",
        "ตั้งกระทะไฟกลางค่อนแรง ใส่น้ำมันครึ่งหนึ่ง ผัดไก่ 3 นาทีโดยกลับบ่อย ๆ จนส่วนหนาที่สุดถึง 74°C แล้วตักออก"
      ),
      ml(
        "Add the remaining oil, dried chiles, and peppercorns. Stir for 20 seconds until fragrant, keeping the chiles from blackening.",
        "加入剩餘油、乾辣椒與花椒炒 20 秒至出香，避免辣椒炒黑。",
        "残りの油、乾燥唐辛子、花椒を加え、唐辛子を黒く焦がさないよう20秒炒めます。",
        "남은 기름과 말린 고추, 화자오를 넣고 고추가 까맣게 타지 않도록 20초 향을 냅니다.",
        "ใส่น้ำมันที่เหลือ พริกแห้ง และพริกหอม ผัด 20 วินาทีจนหอม ระวังไม่ให้พริกดำไหม้"
      ),
      ml(
        "Add garlic, ginger, and the scallion whites; stir-fry for 30 seconds. Pour in the mixed sauce and let it bubble for 60 seconds.",
        "加入蒜片、薑絲與蔥白炒 30 秒，倒入調好的醬汁煮至冒泡 60 秒。",
        "にんにく、しょうが、ねぎの白い部分を加えて30秒炒め、混ぜたたれを注いで60秒煮立てます。",
        "마늘, 생강, 대파 흰 부분을 넣어 30초 볶고 섞어 둔 소스를 부어 60초 끓입니다.",
        "ใส่กระเทียม ขิง และโคนต้นหอม ผัด 30 วินาที เทซอสที่ผสมไว้ลงไป เดือด 60 วินาที"
      ),
      ml(
        "Return the chicken and toss for 1 minute until the sauce coats every piece. If it tightens too quickly, add 15 ml water.",
        "放回雞肉翻炒 1 分鐘，讓醬汁裹住每塊肉；若收得太快，加 15 毫升水調整。",
        "鶏肉を戻し、1分炒めてたれを全体に絡めます。煮詰まりが早ければ水15mlを足します。",
        "닭고기를 다시 넣고 1분 볶아 소스가 고루 묻게 합니다. 너무 빨리 졸아들면 물 15ml를 넣습니다.",
        "ใส่ไก่กลับลงไปคลุก 1 นาทีจนซอสเคลือบทั่ว ถ้าซอสข้นเร็วเกินไปเติมน้ำ 15 มล."
      ),
      ml(
        "Turn off the heat and fold in the scallion greens and peanuts. Serve immediately while the peanuts are crisp.",
        "關火，拌入蔥綠與花生，趁花生仍酥脆立即上桌。",
        "火を止め、ねぎの青い部分とピーナッツを混ぜます。ピーナッツが香ばしいうちにすぐ盛ります。",
        "불을 끄고 대파 초록 부분과 땅콩을 섞습니다. 땅콩이 바삭할 때 바로 냅니다.",
        "ปิดไฟ คลุกต้นหอมส่วนใบกับถั่วลิสง เสิร์ฟทันทีขณะที่ถั่วยังกรอบ"
      )
    ],
    tips: [
      ml("Cut every chicken piece to a similar size so it reaches 74°C together.", "雞肉切成相近大小，才會同時熟到 74°C。", "鶏肉の大きさをそろえると、全体が同時に74℃へ達します。", "닭고기를 같은 크기로 썰어야 함께 74°C까지 익습니다.", "หั่นไก่ให้ขนาดใกล้กันเพื่อให้สุกถึง 74°C พร้อมกัน"),
      ml("Keep the chiles moving in the oil; their aroma should bloom before their color darkens.", "乾辣椒要持續翻動，應先炒出香氣，不要等到顏色變黑。", "唐辛子は油の中で動かし続け、色が濃くなる前に香りを引き出します。", "고추는 기름에서 계속 움직여 색이 짙어지기 전에 향을 내세요.", "ขยับพริกในน้ำมันตลอด ให้หอมก่อนสีจะเข้มหรือไหม้")
    ],
    commonMistakes: [
      ml("Overcrowding the wok steams the chicken and prevents browning; cook in two batches if needed.", "炒鍋太擁擠會讓雞肉出水蒸熟，必要時分兩批炒。", "鍋に詰め込みすぎると鶏肉が蒸し焼きになり、焼き色が付きません。必要なら2回に分けます。", "웍을 가득 채우면 닭고기가 쪄져 갈색이 나지 않습니다. 필요하면 두 번 나눠 볶으세요.", "ใส่ไก่มากเกินไปจะกลายเป็นนึ่งและไม่เกรียม หากจำเป็นให้ผัดสองรอบ"),
      ml("Adding peanuts early makes them soft; fold them in only after the heat is off.", "太早加入花生會使它回軟，請熄火後才拌入。", "ピーナッツを早く入れるとしんなりするため、火を止めてから混ぜます。", "땅콩을 일찍 넣으면 눅눅해지므로 불을 끈 뒤 섞으세요.", "ใส่ถั่วลิสงเร็วเกินไปจะทำให้นิ่ม ควรคลุกหลังปิดไฟ")
    ],
    substitutions: [
      ml("Boneless chicken breast works, but marinate it for 15 minutes and stop cooking as soon as it reaches 74°C.", "可用去骨雞胸肉，但醃 15 分鐘，達 74°C 就立即停火避免乾柴。", "鶏むね肉でも作れますが、15分下味を付け、74℃になったらすぐ火を止めて乾燥を防ぎます。", "닭가슴살도 가능하지만 15분 밑간하고 74°C가 되면 바로 불을 꺼 퍽퍽해지지 않게 하세요.", "ใช้อกไก่ไม่มีกระดูกได้ หมัก 15 นาทีและหยุดความร้อนทันทีที่ถึง 74°C เพื่อไม่ให้แห้ง"),
      ml("Use roasted cashews instead of peanuts for a similar crunch and a milder flavor.", "花生可換成烘烤腰果，口感相近、風味更溫和。", "ピーナッツはローストカシューナッツに替えると、似た食感で穏やかな味になります。", "땅콩 대신 볶은 캐슈너트를 쓰면 비슷하게 바삭하고 맛이 더 부드럽습니다.", "เปลี่ยนถั่วลิสงเป็นเม็ดมะม่วงหิมพานต์คั่ว ได้ความกรอบใกล้เคียงและรสนุ่มกว่า")
    ],
    storage: ml("Refrigerate covered for up to 3 days. Reheat once in a hot pan; the peanuts will soften, so add fresh roasted peanuts only if listed in the ingredients.", "密封冷藏最多 3 天。只復熱一次；花生會回軟，若要恢復酥脆請另備烘烤花生，但不可視為未列食材的裝飾。", "密閉して冷蔵し、3日以内に食べます。再加熱は一度だけ。ピーナッツは柔らかくなるため、必要なら材料として別にローストしたものを用意します。", "밀폐해 냉장하고 3일 안에 먹습니다. 한 번만 재가열하세요. 땅콩은 눅눅해지므로 필요하면 재료로 따로 볶은 땅콩을 준비합니다.", "ปิดฝาแช่เย็นไม่เกิน 3 วัน อุ่นซ้ำครั้งเดียว ถั่วจะนิ่มลง หากต้องการความกรอบให้เตรียมถั่วคั่วใหม่เป็นส่วนผสมเพิ่มเติม ไม่ใช่ของตกแต่ง"),
    cultureNote: ml("Kung Pao chicken is linked to Sichuan cooking and the Qing-era official Ding Baozhen; the familiar restaurant version is one interpretation among many regional styles.", "宮保雞丁與四川料理及清代官員丁寶楨有關；常見餐館版本只是眾多地域做法中的一種。", "宮保鶏丁は四川料理と清代の官僚・丁宝楨に結び付けられます。店で親しまれる形は、地域ごとの多様な作り方の一つです。", "궁보계정은 쓰촨 요리와 청나라 관료 딩바오전과 관련된 이름으로 알려져 있습니다. 익숙한 식당식은 여러 지역 방식 중 하나입니다.", "ไก่ผัดกงเปาเชื่อมโยงกับอาหารเสฉวนและขุนนางสมัยราชวงศ์ชิงชื่อ ติง เป่าเจิน สูตรที่คุ้นเคยในร้านอาหารเป็นเพียงหนึ่งในหลายรูปแบบตามภูมิภาค"),
    sources: [
      { title: "The Woks of Life — Kung Pao Chicken", url: "https://thewoksoflife.com/kung-pao-chicken/" },
      { title: "China Sichuan Food — Kung Pao Chicken", url: "https://www.chinasichuanfood.com/kung-pao-chicken/" }
    ],
    imageAlt: ml("Kung Pao chicken with chicken pieces, dried red chiles, peanuts, and scallions in a glossy brown sauce", "光亮醬汁中的雞丁、乾紅辣椒、花生與青蔥宮保雞丁", "つやのあるたれに鶏肉、乾燥赤唐辛子、ピーナッツ、長ねぎが見える宮保鶏丁", "윤기 나는 갈색 소스에 닭고기, 말린 홍고추, 땅콩, 대파가 보이는 궁보계정", "ไก่ผัดกงเปาซอสเงา มีชิ้นไก่ พริกแดงแห้ง ถั่วลิสง และต้นหอม"),
    visualSpec: "Wok-tossed chicken pieces in glossy brown sauce with visible dried red chiles, whole peanuts, and scallion segments; no extra garnish."
  },

  {
    id: "twice-cooked-pork",
    cuisine: "chinese",
    region: ml("Sichuan, China", "中國四川", "中国・四川", "중국 쓰촨", "เสฉวน ประเทศจีน"),
    prepMinutes: 20,
    cookMinutes: 25,
    totalMinutes: 45,
    servings: 3,
    name: ml("Twice-cooked pork", "回鍋肉", "回鍋肉", "회과육", "หมูผัดสองครั้ง"),
    description: ml(
      "Pork belly is gently cooked, sliced, and wok-fried with chile bean paste, peppers, and leeks.",
      "豬五花先煮後切片，再與豆瓣醬、青椒和蒜苗回鍋快炒。",
      "豚バラ肉を下ゆでして薄切りにし、豆板醤、ピーマン、ねぎと二度炒めにします。",
      "삼겹살을 먼저 익혀 얇게 썬 뒤 두반장, 피망, 대파와 다시 볶습니다.",
      "หมูสามชั้นต้มก่อน หั่นบาง แล้วผัดซ้ำกับโต้วป้านเจี้ยง พริกหวาน และต้นกระเทียม"
    ),
    ingredients: [
      ingredient("500 g", ml("pork belly, one piece", "整條豬五花肉", "豚バラ肉（塊）", "통삼겹살", "หมูสามชั้นเป็นชิ้น")),
      ingredient("10 g", ml("fresh ginger, sliced", "薑片", "しょうが（薄切り）", "생강 슬라이스", "ขิงหั่นแว่น")),
      ingredient("20 g", ml("scallions for simmering", "煮肉用青蔥", "下ゆで用の長ねぎ", "삶는 용도의 대파", "ต้นหอมสำหรับต้ม")),
      ingredient("20 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("30 g", ml("doubanjiang", "豆瓣醬", "豆板醤", "두반장", "โต้วป้านเจี้ยง")),
      ingredient("10 g", ml("fermented black beans, chopped", "豆豉，切碎", "豆鼓（刻む）", "발효 검은콩, 다지기", "ถั่วดำหมักสับ")),
      ingredient("120 g", ml("green bell pepper, 3 cm strips", "青椒，切 3 公分條", "ピーマン（3cm幅）", "풋고추 또는 피망, 3cm 길이", "พริกหวานสีเขียวหั่นเส้น 3 ซม.")),
      ingredient("80 g", ml("Chinese garlic chives or leek, 4 cm pieces", "蒜苗或韭蒜，切 4 公分段", "にんにくの芽またはねぎ（4cm長さ）", "마늘종 또는 대파, 4cm 길이", "ต้นกระเทียมหรือต้นหอมหั่นท่อน 4 ซม.")),
      ingredient("10 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("5 ml", ml("Shaoxing wine", "紹興酒", "紹興酒", "소흥주", "เหล้าเส้าซิง")),
      ingredient("3 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("1 l", ml("water for simmering", "煮肉用清水", "下ゆで用の水", "삶는 물", "น้ำสำหรับต้ม"))
    ],
    instructions: [
      ml(
        "Put the pork, ginger, simmering scallions, and water in a pot. Bring to a gentle simmer and cook for 15 minutes, until the centre reaches 71°C.",
        "豬肉、薑片、煮肉用青蔥與清水入鍋，溫和煮 15 分鐘，中心達 71°C。",
        "豚肉、しょうが、ねぎ、水を鍋に入れ、静かに煮立てて15分、中心温度が71℃になるまで加熱します。",
        "돼지고기, 생강, 대파, 물을 냄비에 넣고 잔잔하게 15분 끓여 중심 온도 71°C까지 익힙니다.",
        "ใส่หมู ขิง ต้นหอม และน้ำลงหม้อ เคี่ยวเบา ๆ 15 นาทีจนแกนกลางถึง 71°C"
      ),
      ml(
        "Transfer the pork to a plate and cool for 10 minutes, then pat dry and slice into 3 mm pieces.",
        "豬肉盛出放涼 10 分鐘，擦乾後切成 3 毫米薄片。",
        "豚肉を皿に取り出して10分冷まし、水気を拭いて3mm厚さに切ります。",
        "돼지고기를 접시에 옮겨 10분 식힌 뒤 물기를 닦고 3mm 두께로 썹니다.",
        "ตักหมูใส่จาน พักให้เย็น 10 นาที ซับให้แห้ง แล้วหั่นหนา 3 มม."
      ),
      ml(
        "Heat a wok over medium-high heat. Add the oil and pork slices; stir-fry for 4 minutes until some fat renders and the edges curl.",
        "炒鍋以中大火加熱，加入油與肉片炒 4 分鐘，炒出部分油脂並使邊緣微捲。",
        "中強火で中華鍋を熱し、油と豚肉を4分炒めて脂を少し出し、端を軽く反らせます。",
        "웍을 중강불로 달군 뒤 기름과 돼지고기를 4분 볶아 지방을 조금 빼고 가장자리를 살짝 말아 줍니다.",
        "ตั้งกระทะไฟกลางค่อนแรง ใส่น้ำมันกับหมูผัด 4 นาทีจนรีดไขมันออกบางส่วนและขอบงอเล็กน้อย"
      ),
      ml(
        "Push the pork aside. Add doubanjiang and black beans to the oil and fry for 45 seconds until the oil is red and aromatic.",
        "將肉推到一旁，豆瓣醬與豆豉下油炒 45 秒，直到油色變紅且香氣出來。",
        "豚肉を端に寄せ、油の部分で豆板醤と豆鼓を45秒炒め、油が赤く香るまで加熱します。",
        "돼지고기를 한쪽으로 밀고 기름에 두반장과 발효 검은콩을 넣어 45초 붉고 향긋해질 때까지 볶습니다.",
        "ดันหมูไปด้านหนึ่ง ใส่โต้วป้านเจี้ยงกับถั่วดำหมักลงในน้ำมัน ผัด 45 วินาทีจนน้ำมันแดงและหอม"
      ),
      ml(
        "Add the bell pepper, soy sauce, Shaoxing wine, and sugar. Toss for 2 minutes, keeping the pepper just tender.",
        "加入青椒、生抽、紹興酒與砂糖，翻炒 2 分鐘，讓青椒保持爽脆。",
        "ピーマン、しょうゆ、紹興酒、砂糖を加え、ピーマンが少し歯ごたえを残すよう2分炒めます。",
        "피망, 간장, 소흥주, 설탕을 넣고 피망이 살짝 아삭하도록 2분 볶습니다.",
        "ใส่พริกหวาน ซีอิ๊วขาว เหล้าเส้าซิง และน้ำตาล ผัด 2 นาทีให้พริกยังหวานกรอบเล็กน้อย"
      ),
      ml(
        "Add the garlic chives or leek and stir-fry for 1 minute until just wilted. Serve hot.",
        "加入蒜苗或韭蒜炒 1 分鐘至剛軟化，趁熱上桌。",
        "にんにくの芽またはねぎを加え、しんなりするまで1分炒めて熱いうちに盛ります。",
        "마늘종 또는 대파를 넣고 숨이 살짝 죽을 때까지 1분 볶아 뜨겁게 냅니다.",
        "ใส่ต้นกระเทียมหรือต้นหอม ผัด 1 นาทีจนเริ่มนิ่ม แล้วเสิร์ฟร้อน ๆ"
      )
    ],
    tips: [
      ml("Cool the boiled pork before slicing; firm meat gives thinner, cleaner slices.", "煮好的豬肉放涼後再切，肉質變緊才能切得薄而整齊。", "ゆでた豚肉を冷ましてから切ると、締まって薄くきれいに切れます。", "삶은 돼지고기를 식힌 뒤 썰면 살이 단단해져 얇고 깔끔하게 썰립니다.", "พักหมูต้มให้เย็นก่อนหั่น เนื้อจะกระชับและหั่นบางได้เรียบ"),
      ml("Use a wide wok so rendered fat can coat the paste without pooling around the meat.", "使用寬炒鍋，炒出的油脂才能包住豆瓣醬，不會積在肉片周圍。", "幅の広い中華鍋なら、出た脂が豆板醤を包み、肉の周りにたまりません。", "넓은 웍을 쓰면 나온 지방이 두반장을 고루 감싸고 고기 주변에 고이지 않습니다.", "ใช้กระทะกว้าง ไขมันที่ออกมาจะเคลือบเครื่องแกงแทนการขังรอบหมู")
    ],
    commonMistakes: [
      ml("Slicing hot pork makes it crumble and uneven; give it the full 10-minute cooling rest.", "熱肉直接切會碎且厚薄不均，請完整放涼 10 分鐘。", "熱いまま切ると崩れて厚さがそろいません。10分しっかり冷まします。", "뜨거울 때 썰면 부서지고 두께가 고르지 않습니다. 10분 충분히 식히세요.", "หั่นหมูร้อน ๆ จะร่วนและหนาไม่เท่ากัน ต้องพักให้เย็นครบ 10 นาที"),
      ml("Burning the bean paste gives bitterness; keep it moving for 45 seconds and lower the heat if needed.", "豆瓣醬炒焦會發苦，炒 45 秒間持續翻動，必要時轉小火。", "豆板醤を焦がすと苦みが出ます。45秒間動かし続け、必要なら火を弱めます。", "두반장을 태우면 쓴맛이 납니다. 45초 동안 계속 저으며 필요하면 불을 낮추세요.", "ถ้าโต้วป้านเจี้ยงไหม้จะขม ผัดให้ขยับตลอด 45 วินาทีและลดไฟเมื่อจำเป็น")
    ],
    substitutions: [
      ml("Use thick-cut pork shoulder if belly is too rich; add 5 ml extra oil before frying.", "若不想太肥，可用厚切豬肩肉，炒肉前多加 5 毫升油。", "豚バラが重いときは厚切りの豚肩肉に替え、炒める前に油を5ml足します。", "삼겹살이 너무 기름지면 두껍게 썬 돼지 앞다리살을 쓰고 볶기 전 기름 5ml를 추가하세요.", "ถ้าหมูสามชั้นมันมาก ใช้สันคอหรือหัวไหล่หมูหั่นหนา และเพิ่มน้ำมัน 5 มล. ก่อนผัด"),
      ml("Green bell pepper can be replaced with celery sticks for a crisp, aromatic variation.", "青椒可改用西芹條，保留爽脆口感並增加香氣。", "ピーマンはセロリの棒切りに替えると、歯ごたえと香りが加わります。", "풋고추는 셀러리 스틱으로 바꾸면 아삭한 식감과 향을 살릴 수 있습니다.", "เปลี่ยนพริกหวานเป็นขึ้นฉ่ายหั่นแท่ง ได้ความกรอบและกลิ่นหอม")
    ],
    storage: ml("Refrigerate sealed for up to 3 days. Reheat in a skillet until steaming hot; the rendered fat may firm when chilled.", "密封冷藏最多 3 天。用平底鍋加熱至冒蒸氣；冷藏後析出的油脂變硬是正常現象。", "密閉して冷蔵し、3日以内に食べます。フライパンで湯気が立つまで温め、冷蔵で脂が固まるのは正常です。", "밀폐해 냉장하고 3일 안에 먹습니다. 팬에서 김이 날 때까지 데우며 냉장 중 지방이 굳는 것은 정상입니다.", "ปิดฝาแช่เย็นไม่เกิน 3 วัน อุ่นในกระทะจนร้อนมีไอ ไขมันที่แข็งตัวเมื่อแช่เย็นเป็นเรื่องปกติ"),
    cultureNote: ml("Hui guo rou means pork returned to the wok; pre-cooking the pork made it practical to transform leftovers into a richly seasoned second dish.", "「回鍋肉」意指把肉再次回到鍋中；先煮後炒也讓剩肉能轉化為香味濃郁的新菜。", "回鍋肉は「肉を鍋に戻す」という意味です。先にゆでてから炒める知恵で、残り肉を香り豊かな別の一皿に変えられます。", "회과육은 ‘고기를 다시 웍에 넣는다’는 뜻입니다. 먼저 익힌 고기를 다시 볶아 남은 고기를 풍미 있는 한 접시로 바꾸는 지혜가 담겼습니다.", "หุยกัวโหรวหมายถึงการนำหมูกลับลงกระทะอีกครั้ง การต้มก่อนผัดช่วยเปลี่ยนหมูเหลือให้เป็นจานใหม่ที่เข้มข้น"),
    sources: [
      { title: "The Woks of Life — Twice Cooked Pork", url: "https://thewoksoflife.com/twice-cooked-pork/" },
      { title: "China Sichuan Food — Twice Cooked Pork", url: "https://www.chinasichuanfood.com/twice-cooked-pork/" }
    ],
    imageAlt: ml("Twice-cooked pork with curled pork belly slices, green pepper, garlic chives, and red bean-paste sauce", "回鍋肉片微捲，搭配青椒、蒜苗與紅色豆瓣醬汁", "反りのある豚バラ薄切り、ピーマン、にんにくの芽、赤い豆板醤ソースの回鍋肉", "살짝 말린 돼지고기와 피망, 마늘종, 붉은 두반장 소스가 보이는 회과육", "หมูผัดสองครั้งมีหมูสามชั้นหั่นบางงอเล็กน้อย พริกหวาน ต้นกระเทียม และซอสถั่วหมักสีแดง"),
    visualSpec: "Plate of curled pork belly slices coated in red bean-paste sauce with visible green pepper strips and garlic chive or leek pieces; no extra garnish."
  },

  {
    id: "fish-fragrant-eggplant",
    cuisine: "chinese",
    region: ml("Sichuan, China", "中國四川", "中国・四川", "중국 쓰촨", "เสฉวน ประเทศจีน"),
    prepMinutes: 15,
    cookMinutes: 18,
    totalMinutes: 33,
    servings: 3,
    name: ml("Fish-fragrant eggplant", "魚香茄子", "魚香茄子", "어향가지", "มะเขือยาวผัดรสหอมปลา"),
    description: ml(
      "Silky eggplant absorbs a sweet-sour, garlicky Sichuan sauce whose name evokes fish seasoning, not fish.",
      "柔軟茄子吸收酸甜蒜香的四川魚香醬汁；名稱指的是調味風格，並非加入魚。",
      "とろりとしたなすに、甘酸っぱくにんにくが香る四川の魚香だれを含ませます。魚は使いません。",
      "부드러운 가지에 달콤새콤하고 마늘 향이 나는 쓰촨식 어향 소스를 배게 합니다. 생선은 넣지 않습니다.",
      "มะเขือนุ่มดูดซอสเสฉวนเปรี้ยวหวานหอมกระเทียม ชื่อรสปลาแต่สูตรนี้ไม่ใส่ปลา"
    ),
    ingredients: [
      ingredient("500 g", ml("Chinese or Japanese eggplant, 5 cm batons", "中式或日式茄子，切 5 公分長條", "中国なすまたは米なす（5cmの棒状）", "중국식 또는 일본식 가지, 5cm 막대 모양", "มะเขือยาวจีนหรือญี่ปุ่นหั่นแท่ง 5 ซม.")),
      ingredient("5 g", ml("fine salt for draining", "瀝水用細鹽", "水抜き用の塩", "물 빼기용 고운 소금", "เกลือป่นสำหรับไล่น้ำ")),
      ingredient("30 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("15 g", ml("garlic, finely chopped", "蒜末", "にんにく（みじん切り）", "다진 마늘", "กระเทียมสับละเอียด")),
      ingredient("15 g", ml("fresh ginger, finely chopped", "薑末", "しょうが（みじん切り）", "다진 생강", "ขิงสับละเอียด")),
      ingredient("25 g", ml("scallion whites, finely chopped", "蔥白末", "長ねぎの白い部分（みじん切り）", "대파 흰 부분 다지기", "โคนต้นหอมสับละเอียด")),
      ingredient("30 g", ml("doubanjiang", "豆瓣醬", "豆板醤", "두반장", "โต้วป้านเจี้ยง")),
      ingredient("150 ml", ml("unsalted vegetable or chicken stock", "無鹽蔬菜或雞高湯", "無塩の野菜だしまたは鶏ガラスープ", "무염 채소 육수 또는 닭 육수", "น้ำสต๊อกผักหรือไก่แบบไม่เค็ม")),
      ingredient("15 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("20 ml", ml("Chinkiang vinegar", "鎮江香醋", "黒酢", "진강식 흑식초", "น้ำส้มสายชูดำจีน")),
      ingredient("12 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("10 ml", ml("Shaoxing wine", "紹興酒", "紹興酒", "소흥주", "เหล้าเส้าซิง")),
      ingredient("8 g plus 20 ml water", ml("cornstarch slurry", "玉米澱粉與 20 毫升水調成芡汁", "コーンスターチを水20mlで溶いたもの", "옥수수전분과 물 20ml로 만든 전분물", "แป้งข้าวโพดผสมน้ำ 20 มล.")),
      ingredient("15 g", ml("scallion greens, sliced", "蔥綠，切片", "長ねぎの青い部分（薄切り）", "대파 초록 부분, 썰기", "ใบต้นหอมซอย"))
    ],
    instructions: [
      ml(
        "Toss the eggplant with salt and leave for 10 minutes. Pat it dry thoroughly, then whisk the stock, soy, vinegar, sugar, and Shaoxing wine.",
        "茄子拌鹽靜置 10 分鐘，徹底擦乾；將高湯、生抽、香醋、砂糖與紹興酒拌勻。",
        "なすに塩をまぶして10分置き、しっかり水気を拭きます。だし、しょうゆ、黒酢、砂糖、紹興酒を混ぜます。",
        "가지에 소금을 버무려 10분 둔 뒤 물기를 완전히 닦습니다. 육수, 간장, 식초, 설탕, 소흥주를 섞습니다.",
        "คลุกมะเขือกับเกลือพัก 10 นาที ซับให้แห้งสนิท ผสมน้ำสต๊อก ซีอิ๊วขาว น้ำส้มสายชู น้ำตาล และเหล้าเส้าซิง"
      ),
      ml(
        "Heat half the oil in a wide skillet over medium-high heat. Fry the eggplant for 6–8 minutes, turning, until lightly browned and tender; remove.",
        "寬平底鍋以中大火加熱一半油，茄子煎炒 6–8 分鐘並翻面，至微上色變軟後盛出。",
        "広いフライパンで油の半量を中強火に熱し、なすを返しながら6～8分、薄く焼き色が付き柔らかくなるまで炒めて取り出します。",
        "넓은 팬을 중강불로 달구고 기름 절반을 넣습니다. 가지를 뒤집어 가며 6~8분 노릇하고 부드러워질 때까지 볶아 덜어 둡니다.",
        "ตั้งกระทะกว้างด้วยไฟกลางค่อนแรง ใส่น้ำมันครึ่งหนึ่ง ผัดมะเขือ 6–8 นาทีโดยกลับด้านจนมีสีอ่อนและนุ่ม แล้วตักออก"
      ),
      ml(
        "Add the remaining oil, garlic, ginger, scallion whites, and doubanjiang. Stir-fry for 45 seconds until the paste releases red oil.",
        "加入剩餘油、蒜末、薑末、蔥白與豆瓣醬，炒 45 秒至醬料釋出紅油。",
        "残りの油、にんにく、しょうが、ねぎの白い部分、豆板醤を加え、45秒炒めて赤い油を出します。",
        "남은 기름, 마늘, 생강, 대파 흰 부분, 두반장을 넣고 45초 볶아 붉은 기름을 냅니다.",
        "ใส่น้ำมันที่เหลือ กระเทียม ขิง โคนต้นหอม และโต้วป้านเจี้ยง ผัด 45 วินาทีจนเครื่องแกงปล่อยน้ำมันสีแดง"
      ),
      ml(
        "Pour in the mixed liquid and bring it to a simmer for 2 minutes. Return the eggplant and simmer for 4 minutes, turning once.",
        "倒入調好的液體，小火煮 2 分鐘；放回茄子再煮 4 分鐘，中途翻一次。",
        "合わせた液体を注いで2分煮立てます。なすを戻し、途中で一度返しながら4分煮ます。",
        "섞은 액체를 붓고 2분 끓입니다. 가지를 다시 넣어 중간에 한 번 뒤집으며 4분 끓입니다.",
        "เทของเหลวที่ผสมไว้ลงไป เคี่ยว 2 นาที ใส่มะเขือกลับลงไปเคี่ยวอีก 4 นาที โดยกลับหนึ่งครั้ง"
      ),
      ml(
        "Stir the slurry and add it gradually. Simmer for 30–60 seconds until the sauce lightly coats the eggplant.",
        "攪勻芡汁後分次加入，煮 30–60 秒，直到醬汁薄薄裹住茄子。",
        "水溶き片栗粉を混ぜ直して少しずつ加え、30～60秒煮てソースをなすに薄く絡めます。",
        "전분물을 다시 저어 조금씩 넣고 30~60초 끓여 소스가 가지에 얇게 묻게 합니다.",
        "คนแป้งให้เข้ากันแล้วเติมทีละน้อย เคี่ยว 30–60 วินาทีจนซอสเคลือบมะเขือบาง ๆ"
      ),
      ml(
        "Turn off the heat, fold in the scallion greens, and rest for 1 minute before serving.",
        "關火，拌入蔥綠，靜置 1 分鐘後上桌。",
        "火を止め、ねぎの青い部分を混ぜて1分置いてから盛ります。",
        "불을 끄고 대파 초록 부분을 섞어 1분 둔 뒤 냅니다.",
        "ปิดไฟ คลุกใบต้นหอม พัก 1 นาที แล้วเสิร์ฟ"
      )
    ],
    tips: [
      ml("A wide pan lets the eggplant brown rather than stew; work in two batches if the pieces overlap.", "用寬鍋讓茄子煎上色而不是燜煮；若重疊就分兩批處理。", "広い鍋でなすを重ねずに焼くと、蒸さずに焼き色が付きます。重なるなら2回に分けます。", "넓은 팬에서 가지가 겹치지 않아야 찌지 않고 노릇해집니다. 겹치면 두 번 나눠 조리하세요.", "ใช้กระทะกว้างให้มะเขือเกรียมแทนการตุ๋น หากชิ้นซ้อนกันให้ทำสองรอบ"),
      ml("The sauce should taste slightly sharp before meeting the eggplant; the vegetable will mellow it.", "醬汁單獨試味時可略偏酸，茄子加入後味道會變柔和。", "なすを入れる前のたれは少し酸味が強いくらいで大丈夫です。なすが味を丸くします。", "가지 넣기 전 소스는 약간 새콤해도 괜찮습니다. 가지가 맛을 부드럽게 합니다.", "ซอสก่อนใส่มะเขือควรเปรี้ยวนำเล็กน้อย เพราะมะเขือจะทำให้รสนุ่มลง")
    ],
    commonMistakes: [
      ml("Wet eggplant splatters and steams; pat it dry after salting.", "茄子帶水會噴油並變成蒸煮口感，鹽漬後務必擦乾。", "水分の多いなすは油がはね、蒸し煮になります。塩をした後は必ず拭きます。", "물기 많은 가지는 기름이 튀고 쪄집니다. 소금에 절인 뒤 꼭 닦으세요.", "มะเขือเปียกจะทำให้น้ำมันกระเด็นและกลายเป็นนึ่ง ต้องซับให้แห้งหลังโรยเกลือ"),
      ml("Vinegar added too early can lose its fresh aroma; keep the sauce simmer brief.", "醋太早久煮會失去清香，醬汁只需短暫煮沸。", "酢を早くから長く煮ると香りが飛びます。たれの煮立ちは短くします。", "식초를 너무 일찍 오래 끓이면 상쾌한 향이 사라집니다. 소스는 짧게 끓이세요.", "ต้มซอสนานเกินไปหลังเติมน้ำส้มสายชูจะเสียกลิ่นสด ควรเคี่ยวเพียงสั้น ๆ")
    ],
    substitutions: [
      ml("Use zucchini batons for a different vegetable; reduce the first fry to 4–5 minutes.", "可用櫛瓜條代替茄子，第一次煎炒縮短為 4–5 分鐘。", "なすの代わりにズッキーニを棒状にし、最初の炒め時間を4～5分に短縮します。", "가지 대신 주키니를 막대 모양으로 썰고 첫 볶음 시간을 4~5분으로 줄이세요.", "ใช้ซูกินีหั่นแท่งแทนมะเขือ ลดเวลาผัดรอบแรกเหลือ 4–5 นาที"),
      ml("Replace doubanjiang with 20 g fermented chili paste plus 5 g miso for a gentler bean flavor.", "豆瓣醬可改成 20 克發酵辣椒醬加 5 克味噌，豆味會更柔和。", "豆板醤は発酵唐辛子ペースト20gと味噌5gに替えると、豆の風味が穏やかになります。", "두반장은 발효 고추장 20g과 된장 5g으로 바꾸면 콩 풍미가 부드러워집니다.", "เปลี่ยนโต้วป้านเจี้ยงเป็นพริกหมัก 20 กรัมกับมิโสะ 5 กรัม รสถั่วจะนุ่มลง")
    ],
    storage: ml("Refrigerate in a sealed container for up to 3 days. Reheat gently in a pan; the eggplant will soften further.", "密封冷藏最多 3 天。用鍋子溫和復熱，茄子會比現做更軟。", "密閉して冷蔵し、3日以内に食べます。フライパンでやさしく温めると、なすはさらに柔らかくなります。", "밀폐해 냉장하고 3일 안에 먹습니다. 팬에서 부드럽게 데우면 가지가 더 물러집니다.", "เก็บในภาชนะปิดสนิทแช่เย็นไม่เกิน 3 วัน อุ่นเบา ๆ ในกระทะ มะเขือจะนิ่มขึ้นอีก"),
    cultureNote: ml("Fish-fragrant is a traditional Sichuan flavor profile built from aromatics, fermented chile-bean paste, vinegar, and sugar; the name describes the seasoning family, not an ingredient.", "魚香是四川傳統味型，以辛香料、發酵辣豆瓣醬、醋與糖組成；名稱描述的是調味系統，不是食材。", "魚香は香味野菜、発酵唐辛子豆板醤、酢、砂糖で作る四川の味付けの系統で、魚を使うという意味ではありません。", "어향은 향신 채소, 발효 고추콩장, 식초, 설탕으로 만드는 쓰촨식 맛의 계열이며 생선이 들어간다는 뜻은 아닙니다.", "รสหอมปลาเป็นกลุ่มการปรุงแบบเสฉวนจากเครื่องหอม เต้าเจี้ยวพริกหมัก น้ำส้มสายชู และน้ำตาล ชื่อบอกตระกูลรส ไม่ได้หมายถึงส่วนผสมปลา"),
    sources: [
      { title: "The Woks of Life — Fish Fragrant Eggplant", url: "https://thewoksoflife.com/fish-fragrant-eggplant-yuxiang-qiezi/" },
      { title: "China Sichuan Food — Fish Fragrant Eggplant", url: "https://www.chinasichuanfood.com/fish-fragrant-eggplant/" }
    ],
    imageAlt: ml("Soft eggplant batons coated in red sweet-sour sauce with visible scallion pieces in a shallow bowl", "淺碗中盛著裹滿紅色酸甜醬汁、看得見青蔥的軟嫩茄子條", "浅い器に盛った、赤い甘酸っぱいたれと長ねぎが見える柔らかななす", "얕은 그릇에 담긴 붉은 달콤새콤 소스와 대파가 보이는 부드러운 가지", "มะเขือยาวนุ่มเคลือบซอสหวานเปรี้ยวสีแดง มีชิ้นต้นหอมในชามตื้น"),
    visualSpec: "Soft eggplant batons in a red sweet-sour sauce with visible minced aromatics and sliced scallion greens; no fish and no extra garnish."
  },

  {
    id: "dan-dan-noodles",
    cuisine: "chinese",
    region: ml("Sichuan, China", "中國四川", "中国・四川", "중국 쓰촨", "เสฉวน ประเทศจีน"),
    prepMinutes: 15,
    cookMinutes: 15,
    totalMinutes: 30,
    servings: 2,
    name: ml("Dan dan noodles", "擔擔麵", "担担麺", "탄탄면", "บะหมี่ตันตัน"),
    description: ml(
      "Springy wheat noodles are layered over sesame-chile sauce and topped with savory pork and preserved greens.",
      "彈牙麵條鋪在芝麻辣醬上，再覆以鹹香豬肉與榨菜碎。",
      "歯ごたえのある麺にごまラー油だれを絡め、香ばしい豚肉と漬物をのせます。",
      "탄력 있는 밀면에 참깨와 칠리 소스를 깔고 감칠맛 나는 돼지고기와 절임채소를 올립니다.",
      "บะหมี่เส้นเด้งคลุกซอสงาและพริก ท็อปด้วยหมูผัดรสเค็มหอมกับผักดอง"
    ),
    ingredients: [
      ingredient("240 g", ml("fresh wheat noodles", "新鮮小麥麵", "生の中華麺", "생 밀면", "บะหมี่ข้าวสาลีสด")),
      ingredient("150 g", ml("ground pork", "豬絞肉", "豚ひき肉", "돼지고기 다짐육", "หมูบด")),
      ingredient("15 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("15 g", ml("ya cai or preserved mustard greens, minced", "芽菜或榨菜，切碎", "芽菜またはザーサイ（みじん切り）", "야차이 또는 자차이, 다지기", "ผักกาดดองยาไฉ่หรือซาไฉ่สับ")),
      ingredient("10 ml", ml("Shaoxing wine", "紹興酒", "紹興酒", "소흥주", "เหล้าเส้าซิง")),
      ingredient("8 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("20 g", ml("tahini or Chinese sesame paste", "芝麻醬或中式麻醬", "タヒニまたは中華ごまペースト", "타히니 또는 중국식 참깨장", "ทาฮินีหรือซอสงาจีน")),
      ingredient("15 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("15 ml", ml("Chinkiang vinegar", "鎮江香醋", "黒酢", "진강식 흑식초", "น้ำส้มสายชูดำจีน")),
      ingredient("20 ml", ml("chile oil", "辣椒油", "ラー油", "고추기름", "น้ำมันพริก")),
      ingredient("1 g", ml("Sichuan peppercorns, ground", "花椒粉", "花椒（粉）", "화자오 가루", "พริกหอมเสฉวนบด")),
      ingredient("10 g", ml("garlic, finely grated", "蒜泥", "にんにく（すりおろし）", "간 마늘", "กระเทียมขูดละเอียด")),
      ingredient("120 ml", ml("hot noodle water", "煮麵熱水", "麺のゆで汁（熱いもの）", "뜨거운 면수", "น้ำลวกเส้นร้อน")),
      ingredient("30 g", ml("scallions, thinly sliced", "青蔥，切薄片", "長ねぎ（薄切り）", "대파, 얇게 썰기", "ต้นหอมซอยบาง")),
      ingredient("15 g", ml("roasted peanuts, crushed", "烘烤花生，壓碎", "ローストピーナッツ（粗く砕く）", "볶은 땅콩, 굵게 부수기", "ถั่วลิสงคั่วบดหยาบ"))
    ],
    instructions: [
      ml(
        "Divide sesame paste, soy sauce, vinegar, chile oil, sugar, pepper, and garlic between two serving bowls.",
        "將芝麻醬、生抽、香醋、辣椒油、砂糖、花椒粉與蒜泥分到兩個麵碗中。",
        "ごまペースト、しょうゆ、黒酢、ラー油、砂糖、花椒、にんにくを2つの器に分けます。",
        "참깨장, 간장, 식초, 고추기름, 설탕, 화자오, 마늘을 두 그릇에 나눠 담습니다.",
        "แบ่งซอสงา ซีอิ๊วขาว น้ำส้มสายชู น้ำมันพริก น้ำตาล พริกหอม และกระเทียมใส่ชามเสิร์ฟสองใบ"
      ),
      ml(
        "Heat oil in a skillet over medium-high. Stir-fry the pork for 3–4 minutes, breaking it up, until browned and the centre reaches 71°C.",
        "平底鍋以中大火加熱油，豬肉炒 3–4 分鐘並炒散，至上色且中心達 71°C。",
        "フライパンを中強火で熱し、油と豚肉をほぐしながら3～4分炒め、焼き色を付けて中心温度を71℃にします。",
        "팬을 중강불로 달구고 기름과 돼지고기를 풀어 가며 3~4분 볶아 갈색이 나고 중심 온도 71°C가 되게 합니다.",
        "ตั้งกระทะไฟกลางค่อนแรง ใส่น้ำมันกับหมู ผัด 3–4 นาทีพร้อมยีให้ร่วนจนเป็นสีน้ำตาลและแกนกลางถึง 71°C"
      ),
      ml(
        "Add the preserved greens, Shaoxing wine, and sugar. Stir-fry for 1 minute until the topping is dry and fragrant.",
        "加入榨菜、紹興酒與砂糖炒 1 分鐘，讓肉餡乾香。",
        "漬物、紹興酒、砂糖を加え、1分炒めて具を乾いた香ばしい状態にします。",
        "절임채소, 소흥주, 설탕을 넣고 1분 볶아 토핑을 보슬보슬하고 향긋하게 만듭니다.",
        "ใส่ผักดอง เหล้าเส้าซิง และน้ำตาล ผัด 1 นาทีจนเครื่องหมูแห้งหอม"
      ),
      ml(
        "Cook the noodles in boiling water according to the packet, usually 2–4 minutes. Reserve 120 ml noodle water before draining.",
        "麵條依包裝在沸水中煮熟，通常 2–4 分鐘；瀝麵前留起 120 毫升麵水。",
        "袋の表示に従い、麺を沸騰した湯で通常2～4分ゆでます。湯切り前にゆで汁120mlを取ります。",
        "포장지에 따라 면을 끓는 물에 보통 2~4분 삶습니다. 건지기 전에 면수 120ml를 남깁니다.",
        "ต้มเส้นในน้ำเดือดตามฉลาก โดยทั่วไป 2–4 นาที ตวงน้ำลวกเส้น 120 มล. ก่อนสะเด็ดน้ำ"
      ),
      ml(
        "Loosen each bowl of sauce with 60 ml hot noodle water. Add the drained noodles and toss until every strand is coated.",
        "每碗醬汁加入 60 毫升熱麵水調開，放入瀝乾麵條拌至每條都裹上醬。",
        "各器に熱いゆで汁60mlを加えてたれをのばし、湯切りした麺を入れて全体に絡めます。",
        "각 그릇의 소스에 뜨거운 면수 60ml를 넣어 풀고, 건진 면을 넣어 모든 면발에 묻힙니다.",
        "เติมน้ำลวกเส้นร้อน 60 มล. ลงในซอสแต่ละชาม คนให้คลาย ใส่เส้นแล้วคลุกให้ซอสเคลือบทั่ว"
      ),
      ml(
        "Top with the pork mixture, scallions, and crushed peanuts. Serve immediately without letting the noodles sit.",
        "放上豬肉餡、青蔥與碎花生，立即上桌，避免麵條久放變乾。",
        "豚肉の具、ねぎ、砕いたピーナッツをのせ、麺が乾く前にすぐ出します。",
        "돼지고기 토핑, 대파, 부순 땅콩을 올리고 면이 마르기 전에 바로 냅니다.",
        "วางหมูผัด ต้นหอม และถั่วลิสงบด เสิร์ฟทันทีเพื่อไม่ให้เส้นแห้ง"
      )
    ],
    tips: [
      ml("Keep the sauce fairly loose before the noodles arrive; noodles absorb liquid quickly.", "麵條加入前醬汁要調得稍稀，麵會很快吸收水分。", "麺を入れる前のたれはややゆるめにします。麺がすぐ水分を吸います。", "면을 넣기 전 소스는 약간 묽게 하세요. 면이 액체를 빠르게 흡수합니다.", "ทำซอสให้ค่อนข้างเหลวก่อนใส่เส้น เพราะเส้นจะดูดน้ำเร็ว"),
      ml("Taste the sauce at the table and adjust vinegar or chile oil individually.", "上桌前可在各碗自行補香醋或辣椒油，方便調整酸辣度。", "卓上で黒酢やラー油を足せるようにすると、酸味と辛味を各自調整できます。", "식탁에서 식초나 고추기름을 더해 각자 새콤하고 매운 정도를 조절하세요.", "ชิมที่โต๊ะแล้วเติมน้ำส้มสายชูหรือน้ำมันพริกตามชอบ เพื่อปรับเปรี้ยวเผ็ดแต่ละชาม"),
    ],
    commonMistakes: [
      ml("Overcooking the noodles makes them absorb the sauce and turn heavy; drain at a springy texture.", "麵煮過頭會吸光醬汁而變厚重，煮到彈牙就要瀝出。", "麺をゆですぎるとたれを吸って重くなります。歯ごたえが残るところで湯切りします。", "면을 너무 익히면 소스를 모두 흡수해 무거워집니다. 탄력 있을 때 건지세요.", "ต้มเส้นนานเกินไปจะดูดซอสจนหนัก ควรสะเด็ดตอนยังเด้ง"),
      ml("A dry pork topping tastes flat; keep the 15 ml oil and add the preserved greens only after browning.", "豬肉餡完全無油會乾澀，保留 15 毫升油，肉上色後再加榨菜。", "豚肉の具を油なしで炒めるとぱさつきます。油15mlを守り、焼き色が付いてから漬物を加えます。", "돼지고기 토핑을 기름 없이 볶으면 퍽퍽합니다. 기름 15ml를 쓰고 갈색이 난 뒤 절임채소를 넣으세요.", "ผัดหมูโดยไม่ใช้น้ำมันจะฝืด ควรใช้น้ำมัน 15 มล. และใส่ผักดองหลังหมูเป็นสีน้ำตาล"),
    ],
    substitutions: [
      ml("Use minced mushrooms or crumbled firm tofu instead of pork; sauté until the mixture is dry before seasoning.", "豬肉可改用香菇末或板豆腐碎，先炒乾再調味。", "豚肉は刻んだしいたけや木綿豆腐のそぼろに替え、味付け前に水分を飛ばします。", "돼지고기는 다진 버섯이나 으깬 단단한 두부로 바꾸고 양념 전 수분을 날립니다.", "เปลี่ยนหมูเป็นเห็ดสับหรือเต้าหู้แข็งบด ผัดให้แห้งก่อนปรุง"),
      ml("Tahini can replace Chinese sesame paste; add 5 ml water if it is especially thick.", "芝麻醬可用塔希尼取代，若太稠可多加 5 毫升水。", "中華ごまペーストはタヒニで代用できます。固ければ水を5ml足します。", "중국식 참깨장은 타히니로 바꿀 수 있습니다. 특히 되직하면 물 5ml를 추가하세요.", "ใช้ทาฮินีแทนซอสงาจีนได้ ถ้าข้นมากเติมน้ำ 5 มล.")
    ],
    storage: ml("Keep sauce and noodles separate in the refrigerator for up to 2 days. Reheat the pork once and boil fresh noodles for the best texture.", "醬汁與麵條分開冷藏最多 2 天。豬肉餡只復熱一次，麵條最好重新煮。", "たれと麺は分けて冷蔵し、2日以内に食べます。豚肉の具は一度だけ温め、麺は新しくゆでると食感が保てます。", "소스와 면을 따로 냉장해 2일 안에 먹습니다. 돼지고기 토핑은 한 번만 데우고 면은 새로 삶는 것이 좋습니다.", "เก็บซอสกับเส้นแยกกันในตู้เย็นไม่เกิน 2 วัน อุ่นหมูผัดครั้งเดียว และต้มเส้นใหม่เพื่อเนื้อสัมผัสที่ดี"),
    cultureNote: ml("Dan dan noodles began as a portable street-vendor food in Sichuan; the carrying pole traditionally held noodles at one end and the sauce ingredients at the other.", "擔擔麵源自四川挑擔販售的街頭食物；傳統扁擔一端放麵條，另一端帶著調味材料。", "担担麺は四川の担ぎ売りから生まれたとされます。天秤棒の一端に麺、もう一端にたれの材料を載せました。", "탄탄면은 쓰촨의 지게식 노점 음식에서 시작되었다고 전해집니다. 전통 운반대 한쪽에는 면, 다른 쪽에는 양념 재료를 실었습니다.", "บะหมี่ตันตันเริ่มจากอาหารริมทางในเสฉวนที่หาบเร่ขาย โดยคานหาบแบบดั้งเดิมวางเส้นไว้ด้านหนึ่งและเครื่องปรุงอีกด้าน"),
    sources: [
      { title: "The Woks of Life — Dan Dan Noodles", url: "https://thewoksoflife.com/dan-dan-noodles/" },
      { title: "China Sichuan Food — Dan Dan Noodles", url: "https://www.chinasichuanfood.com/dan-dan-noodles/" }
    ],
    imageAlt: ml("Dan dan noodles coated in sesame-chile sauce with a pork topping, scallions, and crushed peanuts", "裹著芝麻辣醬、鋪有豬肉餡、青蔥與碎花生的擔擔麵", "ごまラー油だれに豚肉、長ねぎ、砕いたピーナッツをのせた担担麺", "참깨 칠리 소스에 돼지고기, 대파, 부순 땅콩을 올린 탄탄면", "บะหมี่ตันตันคลุกซอสงาพริก ท็อปด้วยหมูผัด ต้นหอม และถั่วลิสงบด"),
    visualSpec: "Bowl of wheat noodles coated in reddish sesame-chile sauce, topped with browned minced pork, sliced scallions, and crushed peanuts; no extra garnish."
  },

  {
    id: "hot-and-sour-soup",
    cuisine: "chinese",
    region: ml("Sichuan, China", "中國四川", "中国・四川", "중국 쓰촨", "เสฉวน ประเทศจีน"),
    prepMinutes: 15,
    cookMinutes: 20,
    totalMinutes: 35,
    servings: 3,
    name: ml("Hot-and-sour soup", "酸辣湯", "酸辣湯", "산라탕", "ซุปเผ็ดเปรี้ยว"),
    description: ml(
      "A warming bowl of stock, pork, tofu, mushrooms, and bamboo shoots sharpened with vinegar and white pepper.",
      "高湯中加入豬肉、豆腐、香菇與竹筍，再以香醋和白胡椒提起酸辣風味。",
      "スープに豚肉、豆腐、きのこ、たけのこを合わせ、黒酢と白こしょうで酸味と辛味を立てます。",
      "육수에 돼지고기, 두부, 버섯, 죽순을 넣고 식초와 흰 후추로 새콤하고 얼얼하게 맛을 냅니다.",
      "น้ำสต๊อกใส่หมู เต้าหู้ เห็ด และหน่อไม้ ปรุงเปรี้ยวเผ็ดด้วยน้ำส้มสายชูและพริกไทยขาว"
    ),
    ingredients: [
      ingredient("1 l", ml("unsalted chicken or vegetable stock", "無鹽雞高湯或蔬菜高湯", "無塩の鶏ガラスープまたは野菜だし", "무염 닭 육수 또는 채소 육수", "น้ำสต๊อกไก่หรือผักแบบไม่เค็ม")),
      ingredient("120 g", ml("pork loin, cut into thin strips", "豬里肌，切細絲", "豚ロース（細切り）", "돼지 등심, 가늘게 채 썰기", "สันนอกหมูหั่นเส้นบาง")),
      ingredient("150 g", ml("firm tofu, cut into 1 cm strips", "板豆腐，切 1 公分條", "木綿豆腐（1cm幅）", "단단한 두부, 1cm 채", "เต้าหู้แข็งหั่นเส้น 1 ซม.")),
      ingredient("100 g", ml("shiitake mushrooms, sliced", "香菇，切片", "しいたけ（薄切り）", "표고버섯, 슬라이스", "เห็ดหอมสดหั่นแว่น")),
      ingredient("80 g", ml("bamboo shoots, julienned", "竹筍，切絲", "たけのこ（細切り）", "죽순, 채 썰기", "หน่อไม้ซอยเส้น")),
      ingredient("10 g", ml("fresh ginger, julienned", "薑絲", "しょうが（細切り）", "생강 채", "ขิงซอย")),
      ingredient("15 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("5 ml", ml("Shaoxing wine", "紹興酒", "紹興酒", "소흥주", "เหล้าเส้าซิง")),
      ingredient("30 ml", ml("Chinkiang vinegar", "鎮江香醋", "黒酢", "진강식 흑식초", "น้ำส้มสายชูดำจีน")),
      ingredient("2 g", ml("ground white pepper", "白胡椒粉", "白こしょう（粉）", "흰 후추 가루", "พริกไทยขาวป่น")),
      ingredient("10 ml", ml("toasted sesame oil", "香油", "ごま油", "참기름", "น้ำมันงาคั่ว")),
      ingredient("1 large egg, about 50 g", ml("egg, beaten", "雞蛋，打散約 50 克", "卵（溶く、約50g）", "달걀, 풀어서 약 50g", "ไข่ไก่ตีแล้วประมาณ 50 กรัม")),
      ingredient("15 g plus 30 ml water", ml("cornstarch slurry", "玉米澱粉與 30 毫升水調成芡汁", "コーンスターチを水30mlで溶いたもの", "옥수수전분과 물 30ml로 만든 전분물", "แป้งข้าวโพดผสมน้ำ 30 มล.")),
      ingredient("20 g", ml("scallions, sliced", "青蔥，切片", "長ねぎ（薄切り）", "대파, 썰기", "ต้นหอมซอย"))
    ],
    instructions: [
      ml(
        "Whisk the cornstarch with 30 ml water and beat the egg in a separate cup. Keep both beside the stove.",
        "玉米澱粉加 30 毫升水調勻，雞蛋另放杯中打散，兩者都放在爐邊備用。",
        "コーンスターチを水30mlで溶き、卵を別のカップで溶きます。どちらもコンロのそばに置きます。",
        "옥수수전분을 물 30ml에 풀고 달걀은 별도 컵에 풉니다. 둘 다 불 옆에 준비합니다.",
        "ผสมแป้งข้าวโพดกับน้ำ 30 มล. ตีไข่ในถ้วยแยก แล้ววางทั้งสองอย่างไว้ข้างเตา"
      ),
      ml(
        "Bring the stock, ginger, pork, mushrooms, and bamboo shoots to a gentle boil. Simmer for 8 minutes until the pork centre reaches 71°C.",
        "高湯、薑絲、豬肉、香菇與竹筍煮至微滾，續煮 8 分鐘，豬肉中心達 71°C。",
        "スープ、しょうが、豚肉、しいたけ、たけのこを静かに煮立て、豚肉の中心が71℃になるまで8分煮ます。",
        "육수, 생강, 돼지고기, 표고버섯, 죽순을 잔잔하게 끓여 돼지고기 중심 온도 71°C까지 8분 익힙니다.",
        "ต้มน้ำสต๊อก ขิง หมู เห็ด และหน่อไม้จนเดือดเบา ๆ เคี่ยว 8 นาทีจนแกนกลางหมูถึง 71°C"
      ),
      ml(
        "Add the tofu, soy sauce, and Shaoxing wine. Simmer for 3 minutes, keeping the tofu intact.",
        "加入豆腐、生抽與紹興酒，煮 3 分鐘，保持豆腐完整。",
        "豆腐、しょうゆ、紹興酒を加え、豆腐を崩さないよう3分煮ます。",
        "두부, 간장, 소흥주를 넣고 두부가 부서지지 않게 3분 끓입니다.",
        "ใส่เต้าหู้ ซีอิ๊วขาว และเหล้าเส้าซิง เคี่ยว 3 นาทีโดยไม่ให้เต้าหู้แตก"
      ),
      ml(
        "Stir the slurry and stream it into the simmering soup while stirring. Boil for 1 minute until lightly thickened.",
        "攪勻芡汁，邊攪湯邊慢慢倒入，煮 1 分鐘至略微濃稠。",
        "水溶き片栗粉を混ぜ直し、スープを混ぜながら細く注ぎます。1分煮て軽くとろみを付けます。",
        "전분물을 다시 저어 국물을 저으면서 가늘게 붓습니다. 1분 끓여 살짝 걸쭉하게 합니다.",
        "คนแป้งแล้วค่อย ๆ รินลงในซุปพร้อมคน เคี่ยว 1 นาทีจนข้นเล็กน้อย"
      ),
      ml(
        "Lower the heat. Pour in the beaten egg in a thin stream while drawing one slow circle with chopsticks; wait 20 seconds for ribbons to set.",
        "轉小火，細流倒入蛋液，同時用筷子慢慢畫一圈；等待 20 秒讓蛋花定型。",
        "火を弱め、溶き卵を細く流し入れ、箸でゆっくり一周します。20秒待って卵を固めます。",
        "불을 약하게 낮추고 푼 달걀을 가늘게 부으면서 젓가락으로 천천히 한 바퀴 젓습니다. 20초 두어 달걀을 익힙니다.",
        "ลดไฟ รินไข่เป็นสายบาง ๆ พร้อมใช้ตะเกียบวนช้า ๆ หนึ่งรอบ รอ 20 วินาทีให้ไข่เป็นเส้นสุก"
      ),
      ml(
        "Turn off the heat and stir in vinegar, white pepper, sesame oil, and scallions. Taste and serve immediately.",
        "關火，拌入香醋、白胡椒、香油與青蔥，試味後立即上桌。",
        "火を止め、黒酢、白こしょう、ごま油、ねぎを加え、味を見てすぐに盛ります。",
        "불을 끄고 식초, 흰 후추, 참기름, 대파를 넣습니다. 간을 보고 바로 냅니다.",
        "ปิดไฟ ใส่น้ำส้มสายชู พริกไทยขาว น้ำมันงา และต้นหอม ชิมแล้วเสิร์ฟทันที"
      )
    ],
    tips: [
      ml("Add vinegar near the end to preserve its clean aroma and bright acidity.", "接近完成時才加醋，酸香會更清爽明亮。", "酢は最後近くに加えると、きれいな香りと酸味が残ります。", "식초는 마지막에 가까워서 넣어야 깔끔한 향과 산미가 살아납니다.", "เติมน้ำส้มสายชูช่วงท้ายเพื่อรักษากลิ่นและความเปรี้ยวสด"),
      ml("Slice the pork and vegetables uniformly so each spoonful cooks and feels balanced.", "豬肉與蔬菜切成一致粗細，每一匙才會熟度均衡。", "豚肉と具材の太さをそろえると、ひとさじごとの火通りと食感が整います。", "돼지고기와 채소를 같은 굵기로 썰면 한 숟갈마다 익기와 식감이 균형 잡힙니다.", "หั่นหมูและผักให้หนาเท่ากัน เพื่อให้แต่ละคำสุกและมีเนื้อสัมผัสดี")
    ],
    commonMistakes: [
      ml("Boiling after the egg goes in breaks the ribbons into crumbs; keep the heat low.", "蛋液入鍋後持續大滾會把蛋花打碎，請維持小火。", "卵を入れた後に強く煮立てると卵が細かく崩れます。弱火を保ちます。", "달걀을 넣은 뒤 세게 끓이면 달걀실이 부서집니다. 약한 불을 유지하세요.", "เดือดแรงหลังใส่ไข่จะทำให้ไข่แตกเป็นเศษ ควรใช้ไฟอ่อน"),
      ml("Adding slurry without stirring first leaves dense starch at the bottom.", "芡汁未重新攪勻就倒入，澱粉會沉底結塊。", "水溶き片栗粉を混ぜずに入れると、でんぷんが底で固まります。", "전분물을 다시 젓지 않고 넣으면 전분이 바닥에 뭉칩니다.", "ถ้าไม่คนแป้งก่อนเติม แป้งจะจมก้นหม้อและจับตัวเป็นก้อน")
    ],
    substitutions: [
      ml("For a vegetarian bowl, replace pork with extra mushrooms and use vegetable stock.", "素食版本可把豬肉換成更多香菇，並使用蔬菜高湯。", "植物性にするなら豚肉をきのこに替え、野菜だしを使います。", "채식으로 만들려면 돼지고기를 버섯으로 바꾸고 채소 육수를 쓰세요.", "ทำแบบมังสวิรัติโดยเปลี่ยนหมูเป็นเห็ดเพิ่มและใช้น้ำสต๊อกผัก"),
      ml("Fresh bamboo shoots can replace canned shoots; simmer them separately until tender first.", "新鮮竹筍可替代罐頭竹筍，但要先另鍋煮軟。", "缶詰のたけのこは生たけのこに替えられますが、先に別鍋で柔らかく煮ます。", "통조림 죽순은 생죽순으로 바꿀 수 있지만 먼저 따로 부드럽게 삶으세요.", "ใช้หน่อไม้สดแทนหน่อไม้กระป๋องได้ แต่ต้องต้มแยกจนเปื่อยนุ่มก่อน")
    ],
    storage: ml("Cool quickly, refrigerate sealed for up to 3 days, and reheat until steaming hot. The egg texture will be softer after reheating.", "快速放涼後密封冷藏最多 3 天，復熱至冒蒸氣；蛋花復熱後會更柔軟。", "早く冷まして密閉冷蔵し、3日以内に食べます。再加熱は湯気が立つまで行い、卵は柔らかくなります。", "빠르게 식혀 밀폐 냉장하고 3일 안에 먹습니다. 김이 날 때까지 데우며 달걀 식감은 더 부드러워집니다.", "รีบทำให้เย็น ปิดฝาแช่เย็นไม่เกิน 3 วัน อุ่นจนมีไอ ไข่จะนุ่มขึ้นหลังอุ่น"),
    cultureNote: ml("Hot-and-sour soup is a northern and Sichuan-influenced family of soups; households adjust the balance of vinegar, white pepper, tofu, and other fillings.", "酸辣湯融合北方與四川風味，不同家庭會調整香醋、白胡椒、豆腐及其他配料的比例。", "酸辣湯は北方と四川の影響を受けたスープの系統で、酢、白こしょう、豆腐、具材の割合は家庭ごとに異なります。", "산라탕은 북방과 쓰촨의 영향을 받은 국물 요리로, 식초·흰 후추·두부와 건더기의 비율은 집마다 다릅니다.", "ซุปเผ็ดเปรี้ยวเป็นกลุ่มซุปที่ได้รับอิทธิพลจากภาคเหนือและเสฉวน แต่ละครอบครัวปรับสัดส่วนน้ำส้มสายชู พริกไทยขาว เต้าหู้ และเครื่องต่างกัน"),
    sources: [
      { title: "The Woks of Life — Hot and Sour Soup", url: "https://thewoksoflife.com/hot-sour-soup/" },
      { title: "China Sichuan Food — Hot and Sour Soup", url: "https://www.chinasichuanfood.com/hot-and-sour-soup/" }
    ],
    imageAlt: ml("Hot-and-sour soup with egg ribbons, tofu strips, pork, mushrooms, bamboo shoots, and scallions", "酸辣湯中可見蛋花、豆腐絲、豬肉、香菇、竹筍與青蔥", "卵の細いリボン、豆腐、豚肉、きのこ、たけのこ、長ねぎが見える酸辣湯", "달걀실, 두부채, 돼지고기, 버섯, 죽순, 대파가 보이는 산라탕", "ซุปเผ็ดเปรี้ยวมีเส้นไข่ เต้าหู้ หมู เห็ด หน่อไม้ และต้นหอม"),
    visualSpec: "Lightly thickened brown soup in a bowl with visible egg ribbons, tofu strips, pork strips, sliced shiitake, bamboo shoots, and scallions; no extra garnish."
  },

  {
    id: "tomato-egg-stir-fry",
    cuisine: "chinese",
    region: ml("Home-style Chinese cooking", "中國家常菜", "中国の家庭料理", "중국 가정식", "อาหารจีนแบบบ้าน ๆ"),
    prepMinutes: 10,
    cookMinutes: 10,
    totalMinutes: 20,
    servings: 2,
    name: ml("Tomato and egg stir-fry", "番茄炒蛋", "トマトと卵の炒め物", "토마토 달걀볶음", "ไข่ผัดมะเขือเทศ"),
    description: ml(
      "Soft curds of egg meet juicy tomato wedges in a fast, comforting home-style stir-fry.",
      "滑嫩蛋塊與多汁番茄快速相炒，是酸甜開胃的家常菜。",
      "ふんわりした卵とジューシーなトマトを手早く炒める、親しみやすい家庭料理です。",
      "부드러운 달걀과 즙 많은 토마토를 빠르게 볶아 내는 편안한 가정식입니다.",
      "ไข่นุ่มผัดกับมะเขือเทศฉ่ำ ๆ เป็นอาหารบ้าน ๆ ทำเร็ว รสเปรี้ยวหวานสบาย ๆ"
    ),
    ingredients: [
      ingredient("500 g", ml("ripe tomatoes, cut into wedges", "熟番茄，切瓣", "完熟トマト（くし形切り）", "잘 익은 토마토, 웨지로 썰기", "มะเขือเทศสุกหั่นเสี้ยว")),
      ingredient("4 large eggs, about 200 g", ml("eggs, beaten", "雞蛋，打散約 200 克", "卵（溶く、約200g）", "달걀, 풀어서 약 200g", "ไข่ไก่ตีแล้วประมาณ 200 กรัม")),
      ingredient("30 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("3 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือป่น")),
      ingredient("8 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("10 ml", ml("water for the eggs", "拌蛋用清水", "卵用の水", "달걀용 물", "น้ำสำหรับไข่")),
      ingredient("1 g", ml("ground white pepper", "白胡椒粉", "白こしょう（粉）", "흰 후추 가루", "พริกไทยขาวป่น")),
      ingredient("20 g", ml("scallions, sliced", "青蔥，切片", "長ねぎ（薄切り）", "대파, 썰기", "ต้นหอมซอย"))
    ],
    instructions: [
      ml(
        "Cut the tomatoes into 3 cm wedges. Beat the eggs with water, half the salt, and white pepper.",
        "番茄切成 3 公分瓣；雞蛋加水、一半鹽與白胡椒打散。",
        "トマトを3cmのくし形に切ります。卵に水、塩の半量、白こしょうを加えて溶きます。",
        "토마토를 3cm 웨지로 썹니다. 달걀에 물, 소금 절반, 흰 후추를 넣어 풉니다.",
        "หั่นมะเขือเทศเป็นเสี้ยว 3 ซม. ตีไข่กับน้ำ เกลือครึ่งหนึ่ง และพริกไทยขาว"
      ),
      ml(
        "Heat a wok over medium-high heat with 15 ml oil. Pour in the eggs and stir slowly for 30–45 seconds until softly set; remove while still glossy.",
        "炒鍋以中大火加熱 15 毫升油，倒入蛋液慢慢推 30–45 秒至剛凝固、仍有光澤時盛出。",
        "中強火で油15mlを熱し、卵を流してゆっくり30～45秒混ぜ、半熟のつやがあるうちに取り出します。",
        "웍을 중강불로 달궈 기름 15ml를 넣습니다. 달걀을 부어 천천히 30~45초 저어 부드럽게 굳으면 윤기가 있을 때 덜어 둡니다.",
        "ตั้งกระทะไฟกลางค่อนแรง ใส่น้ำมัน 15 มล. เทไข่ลงไปคนช้า ๆ 30–45 วินาทีจนเริ่มเซ็ตแต่ยังเงา แล้วตักออก"
      ),
      ml(
        "Add the remaining oil and tomatoes. Stir-fry for 3–4 minutes until the skins wrinkle and juices collect.",
        "加入剩餘油與番茄炒 3–4 分鐘，直到番茄皮微皺並出汁。",
        "残りの油とトマトを加え、皮が少ししわになり、汁が出るまで3～4分炒めます。",
        "남은 기름과 토마토를 넣고 껍질이 살짝 주름지고 즙이 나올 때까지 3~4분 볶습니다.",
        "ใส่น้ำมันที่เหลือกับมะเขือเทศ ผัด 3–4 นาทีจนผิวย่นเล็กน้อยและมีน้ำออกมา"
      ),
      ml(
        "Season with the remaining salt and sugar. Toss for 1 minute so the tomato juices become lightly syrupy.",
        "加入剩餘鹽與砂糖翻炒 1 分鐘，讓番茄汁略微收成薄薄的糖漿狀。",
        "残りの塩と砂糖で調味し、トマトの汁が少しシロップ状になるまで1分炒めます。",
        "남은 소금과 설탕으로 간하고 토마토 즙이 살짝 시럽처럼 되도록 1분 볶습니다.",
        "ปรุงด้วยเกลือที่เหลือและน้ำตาล ผัด 1 นาทีให้น้ำมะเขือเทศข้นคล้ายไซรัปบาง ๆ"
      ),
      ml(
        "Return the eggs and fold for 1 minute until hot throughout and the thickest curd reaches 74°C.",
        "放回蛋塊輕輕翻拌 1 分鐘，整體熱透且最厚蛋塊達 74°C。",
        "卵を戻し、全体が熱くなり、最も厚い部分が74℃になるまで1分やさしく混ぜます。",
        "달걀을 다시 넣고 1분 부드럽게 섞어 전체가 뜨겁고 가장 두꺼운 부분이 74°C가 되게 합니다.",
        "ใส่ไข่กลับลงไปคลุกเบา ๆ 1 นาทีจนร้อนทั่วและก้อนที่หนาที่สุดถึง 74°C"
      ),
      ml(
        "Turn off the heat, fold in the scallions, and serve over steamed rice.",
        "關火拌入青蔥，配白飯上桌。",
        "火を止め、ねぎを混ぜて、炊いたご飯に添えます。",
        "불을 끄고 대파를 섞어 따뜻한 밥 위에 냅니다.",
        "ปิดไฟ คลุกต้นหอม แล้วเสิร์ฟราดบนข้าวสวย"
      )
    ],
    tips: [
      ml("Take the eggs out while they still look slightly underdone; they finish when folded into the hot tomatoes.", "蛋液看起來略未熟時就先盛出，回鍋與熱番茄拌合會繼續熟成。", "卵が少し半熟に見えるうちに取り出します。熱いトマトと合わせる間に火が入ります。", "달걀이 약간 덜 익어 보일 때 덜어 내세요. 뜨거운 토마토와 섞으며 더 익습니다.", "ตักไข่ออกตอนยังดูไม่สุกเต็มที่ ไข่จะสุกต่อเมื่อคลุกกับมะเขือเทศร้อน"),
      ml("Use tomatoes with both firm flesh and ripe juice for a sauce that is not watery.", "選用果肉仍挺、但已熟透多汁的番茄，醬汁才不會太水。", "果肉がしっかりしていて、熟して汁のあるトマトを使うと水っぽくなりません。", "과육은 단단하고 충분히 익어 즙이 있는 토마토를 써야 물처럼 되지 않습니다.", "ใช้มะเขือเทศที่เนื้อยังแน่นแต่สุกฉ่ำ ซอสจะไม่เหลวเกินไป")
    ],
    commonMistakes: [
      ml("Stirring the eggs aggressively makes fine crumbs; use slow, broad sweeps.", "用力快速攪蛋會變成碎屑，請用寬幅慢慢推動。", "卵を強く細かく混ぜるとぼろぼろになります。大きくゆっくり動かします。", "달걀을 세게 저으면 잘게 부서집니다. 넓고 천천히 움직이세요.", "คนไข่แรงเกินไปจะเป็นเศษเล็ก ๆ ใช้การกวาดตะหลิวช้า ๆ เป็นวงกว้าง"),
      ml("Salting tomatoes too early pulls out excess water; season after they begin to soften.", "太早替番茄加鹽會逼出過多水分，等番茄開始變軟再調味。", "トマトに早く塩をすると水が出すぎます。柔らかくなり始めてから調味します。", "토마토에 너무 일찍 소금 간을 하면 물이 많이 나옵니다. 부드러워지기 시작한 뒤 간하세요.", "ใส่เกลือให้มะเขือเทศเร็วเกินไปจะดึงน้ำออกมาก รอให้เริ่มนิ่มแล้วค่อยปรุง"),
    ],
    substitutions: [
      ml("Use cherry tomatoes cut in half; cook them for 2–3 minutes less.", "可用對半切的小番茄，番茄段炒煮時間縮短 2–3 分鐘。", "ミニトマトを半分に切って使う場合は、トマトを炒める時間を2～3分短くします。", "방울토마토를 반으로 써도 되며 토마토 볶는 시간을 2~3분 줄이세요.", "ใช้มะเขือเทศเชอร์รีผ่าครึ่งได้ ลดเวลาผัดมะเขือเทศ 2–3 นาที"),
      ml("Replace scallions with 10 g minced coriander stems for a different fresh aroma; the stems are an ingredient, not a garnish.", "青蔥可換成 10 克香菜梗末，帶來不同清香；香菜梗是食材而非裝飾。", "ねぎは刻んだパクチーの茎10gに替えられます。茎も材料として使い、飾りにはしません。", "대파는 다진 고수 줄기 10g으로 바꿀 수 있습니다. 고수 줄기도 재료로 쓰며 장식이 아닙니다.", "เปลี่ยนต้นหอมเป็นก้านผักชีสับ 10 กรัมเพื่อกลิ่นสดแบบใหม่ โดยใช้เป็นส่วนผสมไม่ใช่ของตกแต่ง"),
    ],
    storage: ml("Refrigerate sealed for up to 2 days. Reheat once in a covered skillet until steaming; the eggs will become firmer.", "密封冷藏最多 2 天。蓋鍋復熱一次至冒蒸氣，蛋會變得更緊實。", "密閉して冷蔵し、2日以内に食べます。ふたをしたフライパンで一度だけ湯気が立つまで温め、卵は固めになります。", "밀폐해 냉장하고 2일 안에 먹습니다. 뚜껑을 덮은 팬에서 김이 날 때까지 한 번만 데우면 달걀이 더 단단해집니다.", "ปิดฝาแช่เย็นไม่เกิน 2 วัน อุ่นซ้ำครั้งเดียวในกระทะมีฝาจนมีไอ ไข่จะแน่นขึ้น"),
    cultureNote: ml("Tomato and egg stir-fry is a widely loved Chinese home dish because its short ingredient list turns pantry staples into a complete meal with rice.", "番茄炒蛋是許多中國家庭喜愛的家常菜，食材簡單，卻能把常備食材變成配飯的一餐。", "トマトと卵の炒め物は、身近な材料でご飯に合う一皿になるため、中国の家庭で広く親しまれています。", "토마토 달걀볶음은 흔한 재료만으로 밥과 어울리는 한 끼를 만들 수 있어 중국 가정에서 널리 사랑받습니다.", "ไข่ผัดมะเขือเทศเป็นอาหารบ้านยอดนิยมของจีน เพราะวัตถุดิบไม่กี่อย่างก็เปลี่ยนของติดครัวให้เป็นมื้อที่กินกับข้าวได้"),
    sources: [
      { title: "The Woks of Life — Chinese Tomato Egg Stir-Fry", url: "https://thewoksoflife.com/stir-fried-tomato-and-egg/" },
      { title: "China Sichuan Food — Chinese Tomato and Egg Stir Fry", url: "https://www.chinasichuanfood.com/chinese-tomato-and-egg-stir-fry/" }
    ],
    imageAlt: ml("Tomato and egg stir-fry with soft yellow curds, juicy tomato wedges, and sliced scallions in a shallow bowl", "淺碗中盛著柔嫩黃色蛋塊、多汁番茄瓣與青蔥的番茄炒蛋", "浅い器に盛った、柔らかな黄色い卵、ジューシーなトマト、長ねぎの炒め物", "얕은 그릇에 담긴 부드러운 노란 달걀, 즙 많은 토마토 웨지, 대파가 보이는 토마토 달걀볶음", "ไข่ผัดมะเขือเทศในชามตื้น มีไข่สีเหลืองนุ่ม มะเขือเทศฉ่ำ และต้นหอมซอย"),
    visualSpec: "Shallow bowl of soft yellow egg curds and red tomato wedges with visible tomato juices and sliced scallions; no extra garnish."
  },

  {
    id: "red-braised-pork",
    cuisine: "chinese",
    region: ml("Jiangnan, China", "中國江南", "中国・江南", "중국 장난", "เจียงหนาน ประเทศจีน"),
    prepMinutes: 20,
    cookMinutes: 100,
    totalMinutes: 120,
    servings: 4,
    name: ml("Red-braised pork", "紅燒肉", "紅焼肉", "홍샤오러우", "หมูตุ๋นแดงแบบจีน"),
    description: ml(
      "Pork belly is slowly braised with caramelized sugar, soy, Shaoxing wine, and warm spices until lacquered and tender.",
      "豬五花以焦糖化砂糖、生抽、紹興酒與溫暖香料慢燉，收成紅亮軟嫩的家常菜。",
      "豚バラ肉を砂糖、しょうゆ、紹興酒、香辛料でゆっくり煮込み、つややかで柔らかく仕上げます。",
      "돼지고기를 설탕, 간장, 소흥주, 따뜻한 향신료와 천천히 졸여 윤기와 부드러움을 살립니다.",
      "หมูสามชั้นตุ๋นช้า ๆ กับน้ำตาลเคี่ยว ซีอิ๊ว เหล้าเส้าซิง และเครื่องเทศจนเงานุ่ม"
    ),
    ingredients: [
      ingredient("700 g", ml("pork belly, skin on, cut into 4 cm cubes", "帶皮豬五花，切 4 公分方塊", "皮付き豚バラ肉（4cm角）", "껍질 붙은 통삼겹살, 4cm 깍둑썰기", "หมูสามชั้นติดหนังหั่นเต๋า 4 ซม.")),
      ingredient("20 g", ml("fresh ginger, sliced", "薑片", "しょうが（薄切り）", "생강 슬라이스", "ขิงหั่นแว่น")),
      ingredient("30 g", ml("scallions, 5 cm pieces", "青蔥，切 5 公分段", "長ねぎ（5cm長さ）", "대파, 5cm 길이", "ต้นหอมหั่นท่อน 5 ซม.")),
      ingredient("10 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("25 g", ml("rock sugar or granulated sugar", "冰糖或砂糖", "氷砂糖または砂糖", "빙당 또는 설탕", "น้ำตาลกรวดหรือน้ำตาลทราย")),
      ingredient("30 ml", ml("Shaoxing wine", "紹興酒", "紹興酒", "소흥주", "เหล้าเส้าซิง")),
      ingredient("30 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("15 ml", ml("dark soy sauce", "老抽", "たまりしょうゆまたは濃口しょうゆ", "노두유", "ซีอิ๊วดำจีน")),
      ingredient("2 g", ml("star anise", "八角", "八角", "팔각", "โป๊ยกั๊ก")),
      ingredient("2 g", ml("cassia bark", "桂皮", "シナモンまたは桂皮", "계피", "อบเชยจีน")),
      ingredient("1", ml("bay leaf", "月桂葉", "ローリエ", "월계수 잎", "ใบกระวาน")),
      ingredient("800 ml", ml("hot water", "熱水", "熱湯", "뜨거운 물", "น้ำร้อน"))
    ],
    instructions: [
      ml(
        "Put the pork in a pot, cover with cool water, and bring to a boil. Blanch for 5 minutes, drain, rinse, and pat dry.",
        "豬肉入鍋加冷水煮滾，汆燙 5 分鐘後瀝乾、沖洗並擦乾。",
        "豚肉を鍋に入れて水から沸かし、5分下ゆでします。水を切り、洗って水気を拭きます。",
        "돼지고기를 냄비에 넣고 찬물을 부어 끓입니다. 5분 데친 뒤 건져 씻고 물기를 닦습니다.",
        "ใส่หมูลงหม้อ เติมน้ำเย็นแล้วต้มจนเดือด ลวก 5 นาที เทน้ำทิ้ง ล้าง และซับให้แห้ง"
      ),
      ml(
        "Heat a heavy pot over medium. Add oil and the pork; sear for 5 minutes, turning, until the skin and sides take on color.",
        "厚底鍋以中火加熱，加入油與豬肉煎 5 分鐘，翻面至外皮與各面上色。",
        "厚手の鍋を中火で熱し、油と豚肉を5分、返しながら皮と側面に焼き色を付けます。",
        "두꺼운 냄비를 중불로 달구고 기름과 돼지고기를 5분 뒤집어 가며 껍질과 면을 노릇하게 굽습니다.",
        "ตั้งหม้อก้นหนาด้วยไฟกลาง ใส่น้ำมันกับหมูจี่ 5 นาทีโดยกลับด้านจนหนังและด้านต่าง ๆ มีสี"
      ),
      ml(
        "Push the pork aside. Add the sugar to the oil and stir for about 2 minutes until amber; do not let it smoke.",
        "將豬肉推到一旁，砂糖下油炒約 2 分鐘至琥珀色，不要炒到冒煙。",
        "豚肉を端に寄せ、油に砂糖を加えて約2分、琥珀色になるまで混ぜます。煙を出さないようにします。",
        "돼지고기를 한쪽으로 밀고 기름에 설탕을 넣어 약 2분 호박색이 될 때까지 저읍니다. 연기가 나지 않게 합니다.",
        "ดันหมูไปด้านหนึ่ง ใส่น้ำตาลลงในน้ำมัน คนประมาณ 2 นาทีจนเป็นสีอำพัน อย่าให้เกิดควัน"
      ),
      ml(
        "Add ginger, scallions, star anise, cassia, and bay leaf. Pour in Shaoxing wine and stir for 30 seconds.",
        "加入薑、青蔥、八角、桂皮與月桂葉，倒入紹興酒炒 30 秒。",
        "しょうが、ねぎ、八角、桂皮、ローリエを加え、紹興酒を注いで30秒炒めます。",
        "생강, 대파, 팔각, 계피, 월계수 잎을 넣고 소흥주를 부어 30초 볶습니다.",
        "ใส่ขิง ต้นหอม โป๊ยกั๊ก อบเชย และใบกระวาน เทเหล้าเส้าซิง ผัด 30 วินาที"
      ),
      ml(
        "Add hot water, light soy, and dark soy. Cover and simmer very gently for 70 minutes, until fork-tender and the pork centre is at least 71°C.",
        "加入熱水、生抽與老抽，蓋上鍋蓋小火溫和燉 70 分鐘，至筷子可穿透且豬肉中心至少 71°C。",
        "熱湯、しょうゆ、たまりしょうゆを加え、ふたをしてごく弱火で70分、箸が通り中心温度が71℃以上になるまで煮ます。",
        "뜨거운 물, 양조간장, 노두유를 넣고 뚜껑을 덮어 아주 약하게 70분 끓입니다. 젓가락이 들어가고 돼지고기 중심이 71°C 이상이 되게 합니다.",
        "เติมน้ำร้อน ซีอิ๊วขาว และซีอิ๊วดำ ปิดฝาเคี่ยวไฟอ่อนมาก 70 นาทีจนใช้ตะเกียบแทงได้และแกนกลางหมูอย่างน้อย 71°C"
      ),
      ml(
        "Uncover and reduce for 15–20 minutes until the sauce is glossy and clings to the pork. Remove whole spices and serve with rice.",
        "開蓋收汁 15–20 分鐘，直到醬汁光亮並裹住豬肉；取出整粒香料後配飯上桌。",
        "ふたを外して15～20分煮詰め、たれがつややかに豚肉へ絡むまでにします。ホールスパイスを取り出し、ご飯と盛ります。",
        "뚜껑을 열고 15~20분 졸여 소스가 윤기 나고 돼지고기에 붙게 합니다. 통향신료를 건져 밥과 함께 냅니다.",
        "เปิดฝาเคี่ยวต่อ 15–20 นาทีจนซอสเงาเคลือบหมู ตักเครื่องเทศทั้งชิ้นออก แล้วเสิร์ฟกับข้าว"
      )
    ],
    tips: [
      ml("Use hot water when braising so the pot does not lose heat after the caramel forms.", "形成糖色後加入熱水，鍋內溫度不會突然下降。", "カラメルを作った後は熱湯を加え、鍋の温度を急に下げないようにします。", "카라멜을 만든 뒤 뜨거운 물을 넣어 냄비 온도가 갑자기 떨어지지 않게 하세요.", "ใช้น้ำร้อนหลังทำน้ำตาลเคี่ยว เพื่อไม่ให้อุณหภูมิในหม้อลดฮวบ"),
      ml("Keep the final sauce just thick enough to coat; it will thicken more as it cools.", "最後醬汁只需能裹住豬肉即可，冷卻時還會再變濃。", "最後のたれは肉に絡む程度で十分です。冷めるとさらに濃くなります。", "마지막 소스는 고기에 묻을 정도면 충분합니다. 식으면서 더 걸쭉해집니다.", "ซอสช่วงท้ายควรข้นพอเคลือบหมู เพราะจะข้นขึ้นอีกเมื่อเย็น"),
    ],
    commonMistakes: [
      ml("Adding water to smoking-hot caramel can splatter; take the pot off the heat for a few seconds first if needed.", "滾燙糖色遇水會劇烈噴濺，必要時先離火數秒再加水。", "熱いカラメルに水を加えるとはねます。必要なら数秒火から外してから注ぎます。", "뜨거운 카라멜에 물을 넣으면 튑니다. 필요하면 몇 초 불에서 내린 뒤 물을 부으세요.", "น้ำกระทบน้ำตาลเคี่ยวที่ร้อนจัดจะกระเด็น หากจำเป็นยกหม้อลงจากไฟสักครู่ก่อนเติมน้ำ"),
      ml("A rolling boil toughens pork and evaporates the braising liquid too quickly; keep only small bubbles.", "大滾會使豬肉變韌、湯汁過快蒸發，請維持小泡沸騰。", "激しく煮立てると豚肉が硬くなり、煮汁も早く減ります。小さな泡だけに保ちます。", "팔팔 끓이면 돼지고기가 질겨지고 국물이 빨리 줄어듭니다. 작은 기포만 올라오게 하세요.", "เดือดพล่านจะทำให้หมูเหนียวและน้ำตุ๋นแห้งเร็ว ควรให้เดือดเป็นฟองเล็ก ๆ เท่านั้น"),
    ],
    substitutions: [
      ml("Use pork shoulder cut into 4 cm cubes if belly is unavailable; add 5 ml oil when searing.", "沒有五花肉時可用豬肩肉切 4 公分塊，煎肉時多加 5 毫升油。", "豚バラがなければ豚肩肉を4cm角にし、焼くとき油を5ml足します。", "삼겹살이 없으면 돼지 앞다리살을 4cm로 썰고 굽기 전 기름 5ml를 추가하세요.", "ถ้าไม่มีหมูสามชั้น ใช้หัวไหล่หมูหั่น 4 ซม. และเพิ่มน้ำมัน 5 มล. ตอนจี่"),
      ml("For an alcohol-free version, replace Shaoxing wine with 30 ml unsalted stock and 5 ml rice vinegar.", "無酒精版本可用 30 毫升無鹽高湯與 5 毫升米醋取代紹興酒。", "酒を使わない場合は紹興酒を無塩だし30mlと米酢5mlに替えます。", "무알코올로 만들려면 소흥주를 무염 육수 30ml와 쌀식초 5ml로 바꾸세요.", "แบบไม่ใส่แอลกอฮอล์ เปลี่ยนเหล้าเส้าซิงเป็นน้ำสต๊อกไม่เค็ม 30 มล. กับน้ำส้มสายชูข้าว 5 มล.")
    ],
    storage: ml("Refrigerate sealed for up to 4 days. Reheat gently with a spoonful of water; freeze portions for up to 2 months if cooled quickly.", "密封冷藏最多 4 天。復熱時加一匙水溫和加熱；快速放涼後分裝冷凍最多 2 個月。", "密閉冷蔵で4日以内に食べます。水を少量加えて弱火で温め、早く冷ませば小分け冷凍は2か月まで可能です。", "밀폐 냉장해 4일 안에 먹습니다. 물 한 숟갈을 넣어 약하게 데우며, 빠르게 식혀 나누면 최대 2개월 냉동할 수 있습니다.", "ปิดฝาแช่เย็นไม่เกิน 4 วัน อุ่นเบา ๆ พร้อมน้ำหนึ่งช้อน หากทำให้เย็นเร็วและแบ่งส่วนแช่แข็งเก็บได้ไม่เกิน 2 เดือน"),
    cultureNote: ml("Red-braising is a Chinese family of techniques that builds a mahogany color and savory-sweet depth with caramel, soy, and aromatic spices; exact seasoning varies by region.", "紅燒是一系列中式家常技法，以糖色、生抽與香料煮出紅褐色和鹹甜深度，各地調味不盡相同。", "紅焼は、カラメル、しょうゆ、香辛料で赤褐色と甘じょっぱい深みを作る中国の調理法の総称で、地域によって味付けが異なります。", "홍샤오는 카라멜, 간장, 향신료로 적갈색과 달콤짭짤한 깊이를 만드는 중국식 조리법의 한 계열이며 지역마다 양념이 다릅니다.", "การตุ๋นแดงเป็นกลุ่มวิธีปรุงของจีนที่ใช้น้ำตาลเคี่ยว ซีอิ๊ว และเครื่องเทศสร้างสีแดงน้ำตาลกับรสเค็มหวานเข้มข้น แต่ละภูมิภาคปรุงต่างกัน"),
    sources: [
      { title: "The Woks of Life — Shanghai-Style Red Braised Pork", url: "https://thewoksoflife.com/red-cooked-pork/" },
      { title: "China Sichuan Food — Red Braised Pork", url: "https://www.chinasichuanfood.com/red-braised-pork/" }
    ],
    imageAlt: ml("Red-braised pork with lacquered 4 cm pork belly cubes, ginger, and scallion in a shallow serving bowl", "淺碗中盛著裹上紅亮醬汁、搭配薑片與青蔥的 4 公分紅燒肉塊", "浅い器に盛った、つややかな豚バラ角煮、しょうが、長ねぎの紅焼肉", "얕은 그릇에 윤기 나는 4cm 돼지고기 큐브와 생강, 대파를 담은 홍샤오러우", "หมูตุ๋นแดงในชามตื้น เป็นหมูสามชั้นเต๋า 4 ซม. เคลือบซอสเงา มีขิงและต้นหอม"),
    visualSpec: "Shallow bowl of lacquered pork belly cubes in dark red-brown sauce with visible ginger slices and scallion pieces; no extra garnish."
  },

  {
    id: "lions-head-meatballs",
    cuisine: "chinese",
    region: ml("Huaiyang, Jiangsu, China", "中國江蘇淮揚", "中国・江蘇の淮揚料理", "중국 장쑤 화이양", "หวยหยาง มณฑลเจียงซู ประเทศจีน"),
    prepMinutes: 30,
    cookMinutes: 45,
    totalMinutes: 75,
    servings: 4,
    name: ml("Lion's head meatballs", "獅子頭", "獅子頭", "사자머리 완자", "ลูกชิ้นหัวสิงโต"),
    description: ml(
      "Large, tender pork meatballs are braised with napa cabbage in a clear, savory broth.",
      "大顆嫩滑豬肉丸與娃娃菜在清鮮高湯中慢燉，形似獅頭。",
      "大きくふんわりした豚肉団子を白菜とともに澄んだうま味のスープで煮ます。",
      "큼직하고 부드러운 돼지고기 완자를 배추와 맑고 감칠맛 나는 국물에 천천히 끓입니다.",
      "ลูกชิ้นหมูก้อนใหญ่เนื้อนุ่มตุ๋นกับผักกาดขาวในน้ำซุปใสรสกลมกล่อม"
    ),
    ingredients: [
      ingredient("500 g", ml("ground pork, about 30% fat", "約三成肥的豬絞肉", "脂身約30％の豚ひき肉", "지방 약 30% 돼지고기 다짐육", "หมูบดมีไขมันประมาณ 30%")),
      ingredient("60 ml", ml("cold water", "冰水", "冷水", "찬물", "น้ำเย็น")),
      ingredient("15 ml", ml("Shaoxing wine", "紹興酒", "紹興酒", "소흥주", "เหล้าเส้าซิง")),
      ingredient("15 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("5 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือป่น")),
      ingredient("1 g", ml("ground white pepper", "白胡椒粉", "白こしょう（粉）", "흰 후추 가루", "พริกไทยขาวป่น")),
      ingredient("15 g", ml("fresh ginger, finely minced", "薑末", "しょうが（みじん切り）", "다진 생강", "ขิงสับละเอียด")),
      ingredient("30 g", ml("scallions, finely sliced", "青蔥，切細", "長ねぎ（細切り）", "대파, 잘게 썰기", "ต้นหอมซอยละเอียด")),
      ingredient("15 g", ml("cornstarch", "玉米澱粉", "コーンスターチ", "옥수수전분", "แป้งข้าวโพด")),
      ingredient("300 g", ml("napa cabbage, large leaves", "娃娃菜或大白菜葉", "白菜の大きな葉", "배추 큰 잎", "ใบผักกาดขาวแผ่นใหญ่")),
      ingredient("700 ml", ml("unsalted chicken stock", "無鹽雞高湯", "無塩の鶏ガラスープ", "무염 닭 육수", "น้ำสต๊อกไก่แบบไม่เค็ม")),
      ingredient("10 ml", ml("dark soy sauce", "老抽", "たまりしょうゆまたは濃口しょうゆ", "노두유", "ซีอิ๊วดำจีน")),
      ingredient("5 ml", ml("toasted sesame oil", "香油", "ごま油", "참기름", "น้ำมันงาคั่ว"))
    ],
    instructions: [
      ml(
        "Combine pork, cold water, Shaoxing wine, soy, salt, white pepper, ginger, scallions, and cornstarch. Stir in one direction for 3–4 minutes until sticky.",
        "豬肉加入冰水、紹興酒、生抽、鹽、白胡椒、薑、青蔥與玉米澱粉，朝同一方向攪拌 3–4 分鐘至黏稠。",
        "豚肉に冷水、紹興酒、しょうゆ、塩、白こしょう、しょうが、ねぎ、コーンスターチを加え、一方向に3～4分練って粘りを出します。",
        "돼지고기에 찬물, 소흥주, 간장, 소금, 흰 후추, 생강, 대파, 옥수수전분을 넣고 한 방향으로 3~4분 끈기 있게 섞습니다.",
        "ผสมหมูกับน้ำเย็น เหล้าเส้าซิง ซีอิ๊วขาว เกลือ พริกไทยขาว ขิง ต้นหอม และแป้งข้าวโพด คนทิศทางเดียว 3–4 นาทีจนเหนียว"
      ),
      ml(
        "Wet your hands and shape the mixture into four large balls, about 125 g each. Chill for 10 minutes while preparing the pot.",
        "雙手沾水，將肉餡分成 4 顆、每顆約 125 克的大肉丸；準備鍋具時冷藏 10 分鐘。",
        "手を濡らし、肉だねを約125gずつ4個の大きな団子にします。鍋を準備する間10分冷やします。",
        "손에 물을 묻혀 반죽을 약 125g씩 네 개의 큰 완자로 빚습니다. 냄비를 준비하는 동안 10분 냉장합니다.",
        "ทำมือให้เปียก ปั้นส่วนผสมเป็นลูกใหญ่ 4 ลูก ลูกละประมาณ 125 กรัม แช่เย็น 10 นาทีระหว่างเตรียมหม้อ"
      ),
      ml(
        "Heat a thin film of oil in a skillet over medium heat. Brown the meatballs for 8 minutes, turning carefully; they need not be cooked through yet.",
        "平底鍋以中火加少量油，肉丸小心翻面煎 8 分鐘至上色，此時不必完全熟透。",
        "フライパンに油を薄く引き中火で熱し、肉団子を8分、慎重に返しながら焼き色を付けます。中まで火が通らなくても構いません。",
        "팬에 기름을 얇게 두르고 중불로 달궈 완자를 조심히 굴리며 8분 노릇하게 굽습니다. 아직 속까지 익힐 필요는 없습니다.",
        "เคลือบน้ำมันบาง ๆ ในกระทะ ตั้งไฟกลาง จี่ลูกชิ้น 8 นาทีโดยกลับอย่างระวังให้มีสี ไม่ต้องสุกถึงข้างในตอนนี้"
      ),
      ml(
        "Line a heavy pot with the napa cabbage. Place the meatballs on top, pour in the stock and dark soy, and bring to a gentle simmer.",
        "厚底鍋鋪娃娃菜，放上肉丸，倒入高湯與老抽，煮至溫和沸騰。",
        "厚手の鍋に白菜を敷き、肉団子を置きます。スープとたまりしょうゆを注ぎ、静かに煮立てます。",
        "두꺼운 냄비 바닥에 배추를 깔고 완자를 올립니다. 육수와 노두유를 부어 잔잔하게 끓입니다.",
        "รองก้นหม้อด้วยผักกาดขาว วางลูกชิ้น เติมน้ำสต๊อกกับซีอิ๊วดำ แล้วเคี่ยวจนเดือดเบา ๆ"
      ),
      ml(
        "Cover and simmer on low for 30 minutes. Turn the meatballs once halfway; the centre of each should reach 71°C.",
        "蓋上鍋蓋小火煮 30 分鐘，中途翻動肉丸一次；每顆中心都應達 71°C。",
        "ふたをして弱火で30分煮ます。途中で一度返し、各団子の中心を71℃まで加熱します。",
        "뚜껑을 덮고 약불로 30분 끓입니다. 중간에 한 번 뒤집고 각 완자의 중심 온도가 71°C가 되게 합니다.",
        "ปิดฝาเคี่ยวไฟอ่อน 30 นาที กลับลูกชิ้นหนึ่งครั้งระหว่างทาง และให้แกนกลางแต่ละลูกถึง 71°C"
      ),
      ml(
        "Uncover and simmer for 5 minutes. Stir in sesame oil, taste the broth, and serve each meatball over the softened cabbage.",
        "開蓋再煮 5 分鐘，拌入香油並試味；將肉丸放在軟化的娃娃菜上，淋上湯汁。",
        "ふたを外して5分煮ます。ごま油を加えて味を見て、柔らかな白菜の上に団子を盛り、スープを注ぎます。",
        "뚜껑을 열고 5분 더 끓입니다. 참기름을 넣고 간을 본 뒤 부드러워진 배추 위에 완자를 담고 국물을 붓습니다.",
        "เปิดฝาเคี่ยวต่อ 5 นาที ใส่น้ำมันงา ชิมน้ำซุป แล้วเสิร์ฟลูกชิ้นบนผักกาดขาวนุ่ม ๆ ราดน้ำซุป"
      )
    ],
    tips: [
      ml("Stirring in one direction develops a sticky mixture that holds the large balls together.", "朝同一方向攪拌能形成黏性，讓大肉丸保持完整。", "一方向に練ると粘りが出て、大きな団子が崩れにくくなります。", "한 방향으로 저어야 끈기가 생겨 큰 완자가 부서지지 않습니다.", "คนไปทางเดียวจะสร้างความเหนียว ช่วยให้ลูกชิ้นก้อนใหญ่ไม่แตก"),
      ml("Keep the stock at a quiet simmer; vigorous boiling can crack the meatballs.", "高湯只需安靜小滾，大火翻滾可能使肉丸裂開。", "スープは静かに煮立てます。激しく沸かすと団子が割れます。", "육수는 잔잔하게 끓이세요. 세게 끓이면 완자가 갈라질 수 있습니다.", "ให้น้ำซุปเดือดเบา ๆ การเดือดแรงอาจทำให้ลูกชิ้นแตก"),
    ],
    commonMistakes: [
      ml("Skipping the water and mixing step makes dense meatballs; the cold water keeps the texture light.", "省略加水與攪拌會使肉丸緊實，冰水能讓口感更鬆嫩。", "水を加えて練る工程を省くと団子が詰まります。冷水が軽い食感を作ります。", "물을 넣고 섞는 과정을 생략하면 완자가 딱딱해집니다. 찬물이 가벼운 식감을 만듭니다.", "ถ้าไม่เติมน้ำและไม่คนให้เหนียว ลูกชิ้นจะแน่น น้ำเย็นช่วยให้เนื้อเบานุ่ม"),
      ml("Turning the meatballs with tongs too early can tear them; let a crust form before moving.", "太早用夾子翻動會扯裂肉丸，先讓表面形成薄殼再移動。", "早くトングで動かすと割れます。表面に皮ができてから返します。", "너무 일찍 집게로 움직이면 찢어집니다. 겉면이 굳은 뒤 뒤집으세요.", "กลับลูกชิ้นเร็วเกินไปด้วยคีมจะทำให้ฉีก รอให้ผิวก่อตัวก่อน"),
    ],
    substitutions: [
      ml("Use ground chicken thigh for a lighter version, checking that each centre reaches 74°C.", "可用雞腿絞肉做清爽版本，並確認每顆中心達 74°C。", "軽く仕上げるなら鶏ももひき肉に替え、中心温度を74℃まで確認します。", "가볍게 만들려면 닭다리살 다짐육을 쓰고 중심 온도 74°C를 확인하세요.", "ใช้ไก่ส่วนสะโพกบดเพื่อรสเบาลง และตรวจให้แกนกลางแต่ละลูกถึง 74°C"),
      ml("Savoy cabbage can replace napa cabbage; use the same weight and add 5 minutes if the leaves are thick.", "皺葉甘藍可替代大白菜，份量相同；葉片厚時多煮 5 分鐘。", "白菜はちりめんキャベツに替えられます。同量を使い、葉が厚ければ5分延ばします。", "배추는 사보이 양배추로 바꿀 수 있습니다. 같은 양을 쓰고 잎이 두꺼우면 5분 늘리세요.", "ใช้กะหล่ำปลีซาวอยแทนผักกาดขาวได้ในน้ำหนักเท่ากัน และเพิ่ม 5 นาทีถ้าใบหนา")
    ],
    storage: ml("Refrigerate meatballs and broth sealed for up to 3 days. Reheat gently until steaming; freeze without the cabbage for up to 1 month.", "肉丸與湯汁密封冷藏最多 3 天，溫和復熱至冒蒸氣；要冷凍請去除白菜，最多 1 個月。", "団子とスープは密閉冷蔵で3日以内に食べます。湯気が立つまで温め、冷凍するなら白菜を外して1か月以内にします。", "완자와 국물을 밀폐 냉장해 3일 안에 먹습니다. 김이 날 때까지 부드럽게 데우고, 냉동하려면 배추를 빼고 한 달 안에 드세요.", "เก็บลูกชิ้นกับน้ำซุปปิดสนิทแช่เย็นไม่เกิน 3 วัน อุ่นจนมีไอ หากแช่แข็งให้แยกผักกาดขาวและใช้ภายใน 1 เดือน"),
    cultureNote: ml("Lion's head meatballs are associated with Huaiyang cuisine; the oversized meatballs are said to resemble the rounded mane of a guardian lion.", "獅子頭與淮揚菜系相關；大顆肉丸據說形似守護獅子圓潤的鬃毛。", "獅子頭は淮揚料理の代表で、大きな肉団子が守護獅子の丸い鬣に似ることから名付けられたとされます。", "사자머리 완자는 화이양 요리와 관련이 있으며, 큼직한 완자가 수호 사자의 둥근 갈기를 닮았다는 데서 이름이 유래했다고 합니다.", "ลูกชิ้นหัวสิงโตเชื่อมโยงกับอาหารหวยหยาง ลูกชิ้นก้อนใหญ่มีรูปร่างคล้ายแผงคอกลมของสิงโตผู้พิทักษ์"),
    sources: [
      { title: "The Woks of Life — Lion's Head Meatballs", url: "https://thewoksoflife.com/lions-head-meatballs/" },
      { title: "China Sichuan Food — Lion's Head Meatballs", url: "https://www.chinasichuanfood.com/lion-head-meatballs/" }
    ],
    imageAlt: ml("Four large pork meatballs resting on napa cabbage in a clear brown broth", "四顆大豬肉丸放在娃娃菜上，浸在清亮褐色高湯中", "白菜の上に大きな豚肉団子4個を盛った、澄んだ茶色いスープの獅子頭", "맑은 갈색 국물과 배추 위에 큼직한 돼지고기 완자 네 개를 담은 사자머리 완자", "ลูกชิ้นหมูก้อนใหญ่ 4 ลูกวางบนผักกาดขาวในน้ำซุปใสสีน้ำตาลอ่อน"),
    visualSpec: "Four large browned pork meatballs on softened napa cabbage in a clear light-brown broth, with visible scallion pieces; no extra garnish."
  },

  {
    id: "scallion-oil-noodles",
    cuisine: "chinese",
    region: ml("Shanghai, China", "中國上海", "中国・上海", "중국 상하이", "เซี่ยงไฮ้ ประเทศจีน"),
    prepMinutes: 10,
    cookMinutes: 15,
    totalMinutes: 25,
    servings: 2,
    name: ml("Scallion-oil noodles", "蔥油拌麵", "ねぎ油まぜ麺", "파기름 비빔면", "บะหมี่คลุกน้ำมันต้นหอม"),
    description: ml(
      "Wheat noodles are tossed with slow-cooked scallion oil, soy sauce, sugar, vinegar, and toasted sesame.",
      "小麥麵拌入慢煸青蔥油、醬油、砂糖、醋與烘香芝麻，簡單卻有層次。",
      "小麦麺をじっくり作ったねぎ油、しょうゆ、砂糖、酢、炒りごまで和えます。",
      "밀면에 천천히 낸 파기름, 간장, 설탕, 식초, 볶은 참깨를 버무립니다.",
      "บะหมี่ข้าวสาลีคลุกน้ำมันต้นหอมที่เจียวช้า ๆ กับซีอิ๊ว น้ำตาล น้ำส้มสายชู และงาคั่ว"
    ),
    ingredients: [
      ingredient("300 g", ml("fresh wheat noodles", "新鮮小麥麵", "生の中華麺", "생 밀면", "บะหมี่ข้าวสาลีสด")),
      ingredient("150 g", ml("scallions, whites and greens separated", "青蔥，蔥白與蔥綠分開", "長ねぎ（白い部分と青い部分を分ける）", "대파, 흰 부분과 초록 부분 분리", "ต้นหอมแยกส่วนโคนกับใบ")),
      ingredient("80 ml", ml("neutral cooking oil", "中性食用油", "くせのない油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("30 ml", ml("light soy sauce", "生抽", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("15 ml", ml("dark soy sauce", "老抽", "たまりしょうゆまたは濃口しょうゆ", "노두유", "ซีอิ๊วดำจีน")),
      ingredient("15 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("10 ml", ml("rice vinegar", "米醋", "米酢", "쌀식초", "น้ำส้มสายชูข้าว")),
      ingredient("10 g", ml("toasted sesame seeds", "烘香白芝麻", "炒り白ごま", "볶은 흰깨", "งาขาวคั่ว"))
    ],
    instructions: [
      ml(
        "Slice the scallion whites into 5 cm pieces and the greens into 5 cm strips. Pat them dry so the oil does not splatter.",
        "蔥白切 5 公分段，蔥綠切 5 公分條，擦乾以免下油時噴濺。",
        "ねぎの白い部分を5cm、青い部分を5cm幅に切ります。油はねを防ぐため水気を拭きます。",
        "대파 흰 부분은 5cm, 초록 부분은 5cm 길이로 썹니다. 기름이 튀지 않도록 물기를 닦습니다.",
        "หั่นโคนต้นหอมเป็นท่อน 5 ซม. และใบเป็นเส้นยาว 5 ซม. ซับให้แห้งเพื่อป้องกันน้ำมันกระเด็น"
      ),
      ml(
        "Warm the oil in a small skillet over low heat, about 120°C. Add the scallion whites and cook for 4 minutes until pale golden.",
        "小平底鍋以小火將油加熱至約 120°C，加入蔥白煸 4 分鐘至淡金色。",
        "小さなフライパンで油を弱火、約120℃に温め、ねぎの白い部分を4分、薄いきつね色まで煮出します。",
        "작은 팬에 기름을 약불로 약 120°C까지 데우고 대파 흰 부분을 4분 연한 금빛이 될 때까지 익힙니다.",
        "อุ่นน้ำมันในกระทะเล็กด้วยไฟอ่อนประมาณ 120°C ใส่โคนต้นหอมเจียว 4 นาทีจนเหลืองอ่อน"
      ),
      ml(
        "Add the scallion greens and continue on low for 5 minutes until the pieces are golden at the edges but not burnt. Turn off the heat.",
        "加入蔥綠以小火續煸 5 分鐘，至邊緣金黃但不焦黑後關火。",
        "ねぎの青い部分を加え、端がきつね色になるが焦げないよう弱火で5分続け、火を止めます。",
        "대파 초록 부분을 넣고 가장자리가 노릇하지만 타지 않도록 약불로 5분 더 익힌 뒤 불을 끕니다.",
        "ใส่ใบต้นหอม เจียวไฟอ่อนต่อ 5 นาทีจนขอบเป็นสีทองแต่ไม่ไหม้ แล้วปิดไฟ"
      ),
      ml(
        "Stir the light soy, dark soy, sugar, and rice vinegar into the warm scallion oil until the sugar dissolves.",
        "將生抽、老抽、砂糖與米醋拌入溫熱蔥油，直到砂糖溶解。",
        "温かいねぎ油にしょうゆ、たまりしょうゆ、砂糖、米酢を混ぜ、砂糖を溶かします。",
        "따뜻한 파기름에 양조간장, 노두유, 설탕, 쌀식초를 섞어 설탕을 녹입니다.",
        "คนซีอิ๊วขาว ซีอิ๊วดำ น้ำตาล และน้ำส้มสายชูข้าวลงในน้ำมันต้นหอมอุ่น ๆ จนน้ำตาลละลาย"
      ),
      ml(
        "Boil the noodles according to the packet, usually 2–3 minutes. Drain well; reserve 30 ml noodle water if the sauce needs loosening.",
        "麵條依包裝在沸水中煮熟，通常 2–3 分鐘，充分瀝乾；若醬汁太濃可留 30 毫升麵水。",
        "麺を袋の表示どおり、通常2～3分ゆでます。よく湯切りし、たれが濃ければゆで汁30mlを取ります。",
        "포장지에 따라 보통 2~3분 면을 삶아 물기를 뺍니다. 소스가 되직하면 면수 30ml를 남깁니다.",
        "ต้มเส้นตามฉลาก โดยทั่วไป 2–3 นาที สะเด็ดให้ดี ถ้าซอสข้นเกินไปเก็บน้ำลวกเส้น 30 มล."
      ),
      ml(
        "Toss the hot noodles with the scallion oil for 1–2 minutes. Add a splash of noodle water only if needed, then finish with sesame seeds.",
        "熱麵拌入蔥油 1–2 分鐘；只有醬汁太濃時才加少量麵水，最後拌入芝麻。",
        "熱い麺をねぎ油と1～2分和えます。必要なときだけゆで汁を少量加え、最後にごまを混ぜます。",
        "뜨거운 면을 파기름과 1~2분 버무립니다. 필요할 때만 면수를 조금 넣고 마지막에 참깨를 섞습니다.",
        "คลุกเส้นร้อนกับน้ำมันต้นหอม 1–2 นาที เติมน้ำลวกเส้นเล็กน้อยเฉพาะถ้าซอสข้น แล้วคลุกงาเป็นขั้นสุดท้าย"
      )
    ],
    tips: [
      ml("Low heat is the key to fragrant scallion oil; the greens should turn golden slowly, never black.", "小火慢煸才能有香氣；蔥綠應慢慢變金黃，不能炒黑。", "弱火でゆっくり煮出すと香りが立ちます。青い部分は黒くせず、ゆっくり金色にします。", "약한 불로 천천히 내야 파기름이 향긋합니다. 초록 부분은 검게 태우지 말고 서서히 금빛으로 익히세요.", "เจียวน้ำมันต้นหอมด้วยไฟอ่อนจึงหอม ใบควรค่อย ๆ เป็นสีทอง ห้ามไหม้ดำ"),
      ml("Warm the sauce in the residual oil rather than boiling it; this keeps the soy aroma clean.", "用餘溫拌開醬汁，不要把醬油煮沸，香氣會更乾淨。", "残った油の温度でたれを溶かし、煮立てないとしょうゆの香りがきれいに残ります。", "남은 기름의 온도로 소스를 풀고 끓이지 않아야 간장 향이 깔끔합니다.", "ใช้ความร้อนที่เหลือในน้ำมันละลายซอสแทนการต้ม กลิ่นซีอิ๊วจะใสกว่า"),
    ],
    commonMistakes: [
      ml("Wet scallions make hot oil spit; dry every piece before it goes into the pan.", "青蔥帶水會讓熱油噴濺，下鍋前每段都要擦乾。", "ねぎが濡れていると油がはねます。鍋に入れる前に一片ずつ水気を取ります。", "대파에 물기가 있으면 뜨거운 기름이 튑니다. 팬에 넣기 전 모두 닦으세요.", "ต้นหอมเปียกจะทำให้น้ำมันเดือดกระเด็น ต้องซับทุกชิ้นก่อนลงกระทะ"),
      ml("Leaving noodles uncoated while the oil cools causes clumps; toss while they are still hot.", "蔥油變涼時才拌麵容易結塊，麵條要趁熱拌勻。", "油が冷めてから麺を和えると固まりやすいので、熱いうちに絡めます。", "기름이 식은 뒤 면을 버무리면 뭉치므로 뜨거울 때 섞으세요.", "คลุกเส้นหลังน้ำมันเย็นจะทำให้จับก้อน ต้องคลุกขณะเส้นยังร้อน"),
    ],
    substitutions: [
      ml("Fresh thick noodles can be replaced with dried wheat noodles; cook them 1 minute longer if needed.", "新鮮粗麵可換成乾小麥麵，依包裝需要多煮約 1 分鐘。", "生の太麺は乾燥した小麦麺に替えられます。必要ならゆで時間を1分延ばします。", "생 굵은 면은 건 밀면으로 바꿀 수 있으며 필요하면 삶는 시간을 1분 늘리세요.", "ใช้บะหมี่ข้าวสาลีแห้งแทนเส้นสดได้ เพิ่มเวลาต้มประมาณ 1 นาทีตามความเหมาะสม"),
      ml("Use shallot oil plus 80 g sliced scallions if scallions are scarce; fry the scallions with the same low-heat method.", "青蔥不足時可用紅蔥油搭配 80 克蔥片，仍以同樣小火方法煸香。", "ねぎが少ない場合はエシャロット油と薄切りねぎ80gを使い、同じ弱火で煮出します。", "대파가 부족하면 샬롯 오일과 대파 80g을 쓰고 같은 약불 방식으로 익히세요.", "ถ้าต้นหอมหายาก ใช้น้ำมันหอมแดงกับต้นหอมหั่น 80 กรัม เจียวไฟอ่อนแบบเดียวกัน"),
    ],
    storage: ml("Refrigerate scallion oil and sauce separately for up to 5 days. Cook fresh noodles when serving; do not store tossed noodles if a springy texture matters.", "蔥油醬密封冷藏最多 5 天並與麵分開；食用時重新煮麵，想保留彈性就不要保存已拌好的麵。", "ねぎ油だれは麺と分けて密閉冷蔵し、5日以内に使います。食べるときに麺をゆで、歯ごたえを保ちたいなら和えた麺は保存しません。", "파기름 소스는 면과 따로 밀폐 냉장해 5일 안에 씁니다. 먹을 때 새로 면을 삶고 탄력을 원하면 버무린 면은 보관하지 마세요.", "เก็บน้ำมันต้นหอมกับซอสแยกจากเส้นในภาชนะปิดสนิทแช่เย็นไม่เกิน 5 วัน ต้มเส้นใหม่เวลาเสิร์ฟ และไม่ควรเก็บเส้นที่คลุกแล้วหากต้องการความเด้ง"),
    cultureNote: ml("Scallion-oil noodles are closely associated with Shanghai home cooking, where a few pantry staples and carefully rendered aromatics make a satisfying bowl.", "蔥油拌麵常與上海家常菜相連，幾樣常備食材加上耐心煸香，就能成為滿足的一碗麵。", "ねぎ油まぜ麺は上海の家庭料理と深く結び付き、身近な材料と丁寧に煮出した香味油で満足感のある一杯になります。", "파기름 비빔면은 상하이 가정식과 밀접하며, 흔한 재료와 정성껏 낸 향미유만으로 든든한 한 그릇을 만듭니다.", "บะหมี่คลุกน้ำมันต้นหอมเชื่อมโยงกับอาหารบ้านเซี่ยงไฮ้ ใช้วัตถุดิบติดครัวไม่กี่อย่างกับน้ำมันหอมที่เจียวอย่างใจเย็นก็ได้หนึ่งชามที่อิ่มใจ"),
    sources: [
      { title: "The Woks of Life — Shanghai Scallion Oil Noodles", url: "https://thewoksoflife.com/soy-scallion-noodles-cong-ban-mian/" },
      { title: "China Sichuan Food — Scallion Oil Noodles", url: "https://www.chinasichuanfood.com/scallion-oil-noodles/" }
    ],
    imageAlt: ml("Glossy wheat noodles coated in scallion oil with golden scallion pieces and toasted sesame seeds", "裹著蔥油、帶金黃蔥段與烘香芝麻的光亮小麥麵", "ねぎ油でつややかに和え、金色のねぎと炒りごまを散らした小麦麺", "파기름으로 윤기 나게 버무리고 노릇한 대파 조각과 볶은 참깨를 넣은 밀면", "บะหมี่ข้าวสาลีเงาคลุกน้ำมันต้นหอม มีชิ้นต้นหอมสีทองและงาคั่ว"),
    visualSpec: "Bowl of glossy wheat noodles coated in dark soy scallion oil with visible golden scallion pieces and toasted sesame seeds; no extra garnish."
  }
];
