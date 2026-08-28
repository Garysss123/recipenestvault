// Editorial draft: ten Chinese recipes, standardized from the linked sources.
// This file is intentionally data-only. It contains no image, license, or publication claim.

const ml = (en, zhHant, ja, ko, th) => ({
  en,
  "zh-hant": zhHant,
  ja,
  ko,
  th
});

const ingredient = (amount, item) => ({ amount, item });
const locales = ["en", "zh-hant", "ja", "ko", "th"];

const recipeDraftBSource = [
  {
    id: "sweet-sour-pork",
    cuisine: "chinese",
    name: {
      en: "Cantonese-style sweet-and-sour pork",
      "zh-hant": "廣式糖醋豬肉",
      ja: "広東風酢豚",
      ko: "광둥식 탕수육",
      th: "หมูเปรี้ยวหวานสไตล์กวางตุ้ง"
    },
    description: {
      en: "Crisp, bite-sized pork tossed with red, yellow, and green peppers, onion, and a bright sweet-and-sour glaze.",
      "zh-hant": "酥脆小塊豬肉拌入紅、黃、綠甜椒、洋蔥與酸甜亮澤醬汁。",
      ja: "ひと口大の豚肉をカリッと揚げ、赤・黄・緑のピーマン、玉ねぎと甘酢あんで和えます。",
      ko: "한입 크기의 돼지고기를 바삭하게 튀겨 빨강·노랑·초록 피망, 양파와 새콤달콤한 소스에 버무립니다.",
      th: "หมูชิ้นพอดีคำทอดกรอบ คลุกกับพริกหวานแดงเหลืองเขียว หอมใหญ่ และซอสเปรี้ยวหวานเงางาม"
    },
    prep: "PT45M",
    cook: "PT25M",
    total: "PT1H10M",
    yield: {
      en: "4 servings",
      "zh-hant": "4 份",
      ja: "4人分",
      ko: "4인분",
      th: "4 ที่"
    },
    servings: 4,
    ingredients: {
      en: [
        { item: "pork tenderloin, cut into 2.5 cm cubes", amount: "500 g" },
        { item: "Shaoxing wine", amount: "15 ml" },
        { item: "light soy sauce", amount: "15 ml" },
        { item: "white pepper", amount: "1 g" },
        { item: "egg white", amount: "30 g" },
        { item: "cornstarch for coating", amount: "100 g" },
        { item: "neutral frying oil", amount: "1 L" },
        { item: "ketchup", amount: "60 g" },
        { item: "rice vinegar", amount: "45 ml" },
        { item: "granulated sugar", amount: "50 g" },
        { item: "water for the sauce", amount: "60 ml" },
        { item: "light soy sauce for the glaze", amount: "10 ml" },
        { item: "cornstarch", amount: "8 g" },
        { item: "water for slurry", amount: "15 ml" },
        { item: "red bell pepper, 2.5 cm pieces", amount: "100 g" },
        { item: "yellow bell pepper, 2.5 cm pieces", amount: "100 g" },
        { item: "green bell pepper, 2.5 cm pieces", amount: "100 g" },
        { item: "onion, 2.5 cm pieces", amount: "80 g" },
        { item: "fresh ginger, thinly sliced", amount: "10 g" },
        { item: "scallion, thinly sliced for serving", amount: "10 g" }
      ],
      "zh-hant": [
        { item: "豬里肌，切成 2.5 公分方塊", amount: "500 公克" },
        { item: "紹興酒", amount: "15 毫升" },
        { item: "淡醬油", amount: "15 毫升" },
        { item: "白胡椒粉", amount: "1 公克" },
        { item: "蛋白", amount: "30 公克" },
        { item: "裹粉用玉米粉", amount: "100 公克" },
        { item: "中性炸油", amount: "1 公升" },
        { item: "番茄醬", amount: "60 公克" },
        { item: "米醋", amount: "45 毫升" },
        { item: "砂糖", amount: "50 公克" },
        { item: "醬汁用水", amount: "60 毫升" },
        { item: "醬汁用淡醬油", amount: "10 毫升" },
        { item: "玉米粉", amount: "8 公克" },
        { item: "調粉漿用水", amount: "15 毫升" },
        { item: "紅甜椒，切 2.5 公分塊", amount: "100 公克" },
        { item: "黃甜椒，切 2.5 公分塊", amount: "100 公克" },
        { item: "青甜椒，切 2.5 公分塊", amount: "100 公克" },
        { item: "洋蔥，切 2.5 公分塊", amount: "80 公克" },
        { item: "新鮮薑，薄片", amount: "10 公克" },
        { item: "青蔥，切細絲供上桌", amount: "10 公克" }
      ],
      ja: [
        { item: "豚ヒレ肉（2.5cm角）", amount: "500g" },
        { item: "紹興酒", amount: "15ml" },
        { item: "薄口しょうゆ", amount: "15ml" },
        { item: "白こしょう", amount: "1g" },
        { item: "卵白", amount: "30g" },
        { item: "衣用コーンスターチ", amount: "100g" },
        { item: "揚げ油（無味の油）", amount: "1L" },
        { item: "トマトケチャップ", amount: "60g" },
        { item: "米酢", amount: "45ml" },
        { item: "グラニュー糖", amount: "50g" },
        { item: "たれ用の水", amount: "60ml" },
        { item: "たれ用薄口しょうゆ", amount: "10ml" },
        { item: "コーンスターチ", amount: "8g" },
        { item: "水（溶き用）", amount: "15ml" },
        { item: "赤パプリカ（2.5cm角）", amount: "100g" },
        { item: "黄パプリカ（2.5cm角）", amount: "100g" },
        { item: "緑ピーマン（2.5cm角）", amount: "100g" },
        { item: "玉ねぎ（2.5cm角）", amount: "80g" },
        { item: "しょうが（薄切り）", amount: "10g" },
        { item: "青ねぎ（仕上げ用の細切り）", amount: "10g" }
      ],
      ko: [
        { item: "돼지 안심, 2.5cm 주사위 모양", amount: "500g" },
        { item: "샤오싱주", amount: "15ml" },
        { item: "양조간장", amount: "15ml" },
        { item: "흰 후추", amount: "1g" },
        { item: "달걀흰자", amount: "30g" },
        { item: "튀김옷용 옥수수전분", amount: "100g" },
        { item: "중성 튀김유", amount: "1L" },
        { item: "토마토케첩", amount: "60g" },
        { item: "쌀식초", amount: "45ml" },
        { item: "설탕", amount: "50g" },
        { item: "소스용 물", amount: "60ml" },
        { item: "소스용 양조간장", amount: "10ml" },
        { item: "옥수수전분", amount: "8g" },
        { item: "전분물용 물", amount: "15ml" },
        { item: "빨간 피망, 2.5cm 조각", amount: "100g" },
        { item: "노란 피망, 2.5cm 조각", amount: "100g" },
        { item: "초록 피망, 2.5cm 조각", amount: "100g" },
        { item: "양파, 2.5cm 조각", amount: "80g" },
        { item: "생강, 얇게 썬 것", amount: "10g" },
        { item: "대파, 고명용 채 썬 것", amount: "10g" }
      ],
      th: [
        { item: "สันในหมูหั่นเต๋า 2.5 ซม.", amount: "500 กรัม" },
        { item: "เหล้าจีนเส้าซิง", amount: "15 มล." },
        { item: "ซีอิ๊วขาว", amount: "15 มล." },
        { item: "พริกไทยขาว", amount: "1 กรัม" },
        { item: "ไข่ขาว", amount: "30 กรัม" },
        { item: "แป้งข้าวโพดสำหรับคลุก", amount: "100 กรัม" },
        { item: "น้ำมันรสกลางสำหรับทอด", amount: "1 ลิตร" },
        { item: "ซอสมะเขือเทศ", amount: "60 กรัม" },
        { item: "น้ำส้มสายชูข้าว", amount: "45 มล." },
        { item: "น้ำตาลทราย", amount: "50 กรัม" },
        { item: "น้ำสำหรับซอส", amount: "60 มล." },
        { item: "ซีอิ๊วขาวสำหรับซอส", amount: "10 มล." },
        { item: "แป้งข้าวโพด", amount: "8 กรัม" },
        { item: "น้ำสำหรับละลายแป้ง", amount: "15 มล." },
        { item: "พริกหวานแดงหั่น 2.5 ซม.", amount: "100 กรัม" },
        { item: "พริกหวานเหลืองหั่น 2.5 ซม.", amount: "100 กรัม" },
        { item: "พริกหวานเขียวหั่น 2.5 ซม.", amount: "100 กรัม" },
        { item: "หอมหัวใหญ่หั่น 2.5 ซม.", amount: "80 กรัม" },
        { item: "ขิงสดหั่นบาง", amount: "10 กรัม" },
        { item: "ต้นหอมซอยสำหรับเสิร์ฟ", amount: "10 กรัม" }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Combine pork, Shaoxing wine, soy sauce, white pepper, and egg white. Massage until no liquid pools, then cover and refrigerate 30 minutes; the surface should look tacky." },
        { step: 2, text: "Whisk ketchup, vinegar, sugar, water, and soy sauce in a bowl. Mix cornstarch with water separately; keep both ready while the oil heats." },
        { step: 3, text: "Heat 1 L oil in a wok or Dutch oven over medium-high heat to 175°C. Coat pork thoroughly in cornstarch, shake off loose powder, and fry in batches for 3–4 minutes until pale golden and cooked through (63°C at the center)." },
        { step: 4, text: "Raise the oil to 190°C over high heat and refry the pork for 60–90 seconds until deep golden and audibly crisp; drain on a rack." },
        { step: 5, text: "Pour off all but 10 ml oil. Over medium-high heat, stir-fry ginger, onion, and peppers for 2 minutes; the vegetables should be bright and just tender, not soft." },
        { step: 6, text: "Add the sauce mixture. Bring to a full simmer for 60 seconds, stir in the slurry, and cook 30–45 seconds until the glaze coats a spoon; the measured water balances the vinegar without adding fruit." },
        { step: 7, text: "Return pork to the wok and toss over high heat for 30 seconds, just until every piece is glossy. Scatter scallion and serve immediately while the crust remains crisp." }
      ],
      "zh-hant": [
        { step: 1, text: "將豬肉、紹興酒、淡醬油、白胡椒粉與蛋白拌勻，按摩至沒有液體積在碗底，覆蓋冷藏 30 分鐘；表面應呈黏稠狀。" },
        { step: 2, text: "碗中拌勻番茄醬、米醋、砂糖、水與淡醬油；玉米粉另用水調開，油加熱時備妥。" },
        { step: 3, text: "炒鍋或厚鍋以中大火加熱 1 公升油至 175°C。豬肉均勻裹上玉米粉，抖掉多餘粉，分批炸 3–4 分鐘至淡金色且中心達 63°C。" },
        { step: 4, text: "將油溫以大火升至 190°C，豬肉回鍋復炸 60–90 秒至深金色、外殼發出清脆聲，瀝在網架上。" },
        { step: 5, text: "倒出多餘的油只留 10 毫升；中大火炒薑、洋蔥和彩椒 2 分鐘，蔬菜應鮮亮且剛熟，不能炒軟。" },
        { step: 6, text: "加入調好的醬汁，大火煮至完整沸騰 60 秒，倒入粉漿再煮 30–45 秒，直到醬汁能掛在湯匙上；定量的水可平衡醋味，不加入水果。" },
        { step: 7, text: "豬肉回鍋，以大火拌 30 秒，讓每塊均勻裹上亮醬且仍保持酥脆；撒青蔥立即上桌。" }
      ],
      ja: [
        { step: 1, text: "豚肉、紹興酒、しょうゆ、白こしょう、卵白を混ぜ、底に液体がたまらなくなるまで揉む。覆って冷蔵庫で30分置き、表面がねばり気を帯びればよい。" },
        { step: 2, text: "ケチャップ、酢、砂糖、水、しょうゆを混ぜる。コーンスターチは水で別に溶き、油を温める間に用意する。" },
        { step: 3, text: "鍋に油1Lを入れ、中強火で175℃にする。豚肉にコーンスターチをまぶし、余分を落として3～4分ずつ揚げる。薄いきつね色で中心が63℃以上になればよい。" },
        { step: 4, text: "強火で油を190℃まで上げ、豚肉を60～90秒二度揚げする。濃いきつね色でカリッと音がすれば網に上げる。" },
        { step: 5, text: "油を10mlだけ残す。中強火でしょうが、玉ねぎ、ピーマンを2分炒め、色鮮やかで歯ごたえが残る状態にする。" },
        { step: 6, text: "たれを加え、強く沸かして60秒。水溶きスターチを加え、30～45秒煮てスプーンに薄くからむ濃さにする。分量の水が酢を和らげ、果物は使わない。" },
        { step: 7, text: "豚肉を戻し、強火で30秒だけ和えて全体をつややかにする。青ねぎを散らし、衣がしんなりする前にすぐ盛り付ける。" }
      ],
      ko: [
        { step: 1, text: "돼지고기, 샤오싱주, 간장, 흰 후추, 달걀흰자를 섞고 바닥에 액체가 고이지 않을 때까지 주무른다. 덮어 냉장 30분, 표면이 끈적해지면 된다." },
        { step: 2, text: "케첩, 식초, 설탕, 물, 간장을 섞는다. 옥수수전분은 물에 따로 풀어 기름이 데워지는 동안 준비한다." },
        { step: 3, text: "웍이나 두꺼운 냄비의 기름 1L를 중강불로 175°C까지 가열한다. 고기에 전분을 빈틈없이 묻혀 3–4분씩 나누어 튀긴다. 연한 갈색이며 중심 63°C 이상이면 익은 것이다." },
        { step: 4, text: "강불로 기름을 190°C까지 올리고 고기를 60–90초 다시 튀겨 진한 황금색과 바삭한 소리가 나면 건진다." },
        { step: 5, text: "기름은 10ml만 남긴다. 중강불에서 생강, 양파, 피망을 2분 볶아 색은 선명하고 살짝 아삭한 상태로 둔다." },
        { step: 6, text: "소스를 넣고 센 불에서 60초 완전히 끓인다. 전분물을 넣어 30–45초, 숟가락에 소스가 얇게 붙을 때까지 끓인다. 정량의 물이 식초 맛을 균형 잡고 과일은 넣지 않는다." },
        { step: 7, text: "고기를 다시 넣고 센 불에서 30초만 재빨리 버무려 윤기를 입힌다. 대파를 뿌려 튀김옷이 눅눅해지기 전에 바로 낸다." }
      ],
      th: [
        { step: 1, text: "คลุกหมูกับเหล้าจีน ซีอิ๊วขาว พริกไทยขาว และไข่ขาว นวดจนไม่มีน้ำขังที่ก้นชาม ปิดฝาแช่เย็น 30 นาที; ผิวหมูควรเหนียวเล็กน้อย" },
        { step: 2, text: "คนซอสมะเขือเทศ น้ำส้มสายชู น้ำตาล น้ำ และซีอิ๊วขาวให้เข้ากัน ละลายแป้งข้าวโพดกับน้ำแยกไว้ระหว่างรอน้ำมันร้อน" },
        { step: 3, text: "ตั้งน้ำมัน 1 ลิตรในกระทะหรือหม้อหนาด้วยไฟกลางค่อนแรงให้ถึง 175°C คลุกหมูด้วยแป้งให้ทั่ว สะบัดแป้งส่วนเกิน แล้วทอดเป็นชุด ชุดละ 3–4 นาทีจนสีทองอ่อนและใจกลางถึง 63°C" },
        { step: 4, text: "เร่งเป็นไฟแรงให้น้ำมันถึง 190°C ทอดหมูซ้ำ 60–90 วินาทีจนสีทองเข้มและมีเสียงกรอบ ตักพักบนตะแกรง" },
        { step: 5, text: "เทน้ำมันออกให้เหลือ 10 มล. ผัดขิง หอมใหญ่ และพริกหวานด้วยไฟกลางค่อนแรง 2 นาที ให้สีสดและยังกรอบเล็กน้อย" },
        { step: 6, text: "ใส่ซอส ต้มไฟแรงให้เดือดทั่ว 60 วินาที เติมแป้งละลายน้ำแล้วเคี่ยว 30–45 วินาทีจนซอสเคลือบหลังช้อน โดยใช้น้ำตามปริมาณช่วยสมดุลรสน้ำส้มและไม่ใส่ผลไม้" },
        { step: 7, text: "ใส่หมูกลับลงไป คลุกไฟแรง 30 วินาทีให้เคลือบเงาทั่ว โรยต้นหอมแล้วเสิร์ฟทันทีขณะยังกรอบ" }
      ]
    },
    tips: {
      en: ["A rack keeps the first fry crisp while the vegetables cook.", "Add the slurry only after the sauce boils so its starch thickens evenly."],
      "zh-hant": ["先炸好的豬肉放網架瀝油，炒蔬菜時外殼才不會回軟。", "醬汁先煮沸再加粉漿，澱粉才能均勻糊化。"],
      ja: ["一度揚げの豚肉は網に置き、野菜を炒める間も蒸れさせない。", "たれを沸かしてから水溶きスターチを入れると均一にとろみがつく。"],
      ko: ["1차 튀김 고기는 채소를 익히는 동안 망에 올려 김이 차지 않게 한다.", "소스를 먼저 끓인 뒤 전분물을 넣어야 고르게 걸쭉해진다."],
      th: ["พักหมูทอดครั้งแรกบนตะแกรงเพื่อไม่ให้ไอน้ำทำให้นิ่มระหว่างผัดผัก", "ต้มซอสให้เดือดก่อนใส่แป้งละลายน้ำ แป้งจะข้นสม่ำเสมอ"]
    },
    commonMistakes: {
      en: ["Crowding the oil lowers its temperature and makes the coating greasy.", "Letting the finished pork sit in sauce for several minutes destroys the crunch."],
      "zh-hant": ["一次放太多豬肉會使油溫下降，外衣吸油。", "豬肉在醬汁中放幾分鐘才上桌，酥皮會完全回軟。"],
      ja: ["一度に入れすぎると油温が下がり、衣が油っぽくなる。", "完成後にたれの中で数分置くとカリカリ感が失われる。"],
      ko: ["한꺼번에 너무 많이 넣으면 기름 온도가 내려가 튀김옷이 느끼해진다.", "완성된 고기를 소스에 몇 분 두면 바삭함이 사라진다."],
      th: ["ทอดหมูแน่นกระทะทำให้อุณหภูมิน้ำมันตกและแป้งอมน้ำมัน", "ปล่อยหมูคลุกซอสไว้นานหลาย นาทีจะเสียความกรอบ"]
    },
    substitutions: {
      en: [{ from: "pork tenderloin (500 g)", to: "boneless chicken thigh (500 g)", note: "Use 2.5 cm pieces and cook to 74°C." }, { from: "water (60 ml)", to: "unsalted vegetable stock (60 ml)", note: "The glaze gains a little savory depth." }],
      "zh-hant": [{ from: "豬里肌（500 公克）", to: "去骨雞腿（500 公克）", note: "同樣切 2.5 公分，中心須達 74°C。" }, { from: "水（60 毫升）", to: "無鹽蔬菜高湯（60 毫升）", note: "醬汁會多一點鹹香深度。" }],
      ja: [{ from: "豚ヒレ肉（500g）", to: "鶏もも肉（500g）", note: "2.5cmに切り、中心を74℃まで加熱する。" }, { from: "水（60ml）", to: "無塩野菜スープ（60ml）", note: "たれに少し旨味が加わる。" }],
      ko: [{ from: "돼지 안심(500g)", to: "뼈 없는 닭다리살(500g)", note: "2.5cm로 썰고 중심 74°C까지 익힌다." }, { from: "물(60ml)", to: "무염 채소 육수(60ml)", note: "소스에 감칠맛이 조금 더해진다." }],
      th: [{ from: "สันในหมู (500 กรัม)", to: "สะโพกไก่ไม่มีกระดูก (500 กรัม)", note: "หั่น 2.5 ซม. และทำให้ใจกลางถึง 74°C" }, { from: "น้ำ (60 มล.)", to: "น้ำสต๊อกผักไม่ใส่เกลือ (60 มล.)", note: "ซอสจะมีรสอูมามิเพิ่มเล็กน้อย" }]
    },
    storage: {
      en: "Refrigerate pork and sauce separately in covered containers for up to 3 days. Reheat pork on a 220°C rack for 8–10 minutes, then toss with hot sauce; do not microwave if crispness matters.",
      "zh-hant": "豬肉與醬汁分開密封冷藏最多 3 天。豬肉放 220°C 網架回烤 8–10 分鐘，再拌熱醬；在意酥脆度就不要微波。",
      ja: "豚肉とたれは別々に密閉して冷蔵し、3日以内に使う。豚肉は220℃の網で8～10分温め、熱いたれと和る。カリッと感を保つなら電子レンジは使わない。",
      ko: "고기와 소스를 따로 밀폐해 냉장하고 3일 안에 사용한다. 고기는 220°C 오븐 망에서 8–10분 데운 뒤 뜨거운 소스에 버무린다. 바삭함을 원하면 전자레인지는 피한다.",
      th: "แช่เย็นหมูกับซอสแยกภาชนะปิดสนิทไม่เกิน 3 วัน อุ่นหมูบนตะแกรงที่ 220°C 8–10 นาที แล้วคลุกซอสร้อน; หากต้องการความกรอบอย่าใช้ไมโครเวฟ"
    },
    culturalNotes: {
      en: "Cantonese sweet-and-sour pork (gū lǎo ròu) became especially prominent in overseas Cantonese restaurants; bright peppers and onion are common restaurant-style additions, while regional home versions vary.",
      "zh-hant": "廣式糖醋豬肉（咕咾肉）在海外粵菜館尤其普遍；鮮亮彩椒與洋蔥是常見餐館配料，各地家常版本則有所不同。",
      ja: "広東料理の咕咾肉（グーラオロウ）は海外の広東料理店で広まり、色鮮やかなピーマンと玉ねぎを加える店が多い一方、家庭の地域差も大きい料理です。",
      ko: "광둥식 구라오러우(탕수육)는 해외 광둥 음식점에서 널리 알려졌으며 선명한 피망과 양파를 넣는 식당식 변형이 흔하지만 가정식은 지역마다 다릅니다.",
      th: "หมูเปรี้ยวหวานกวางตุ้งหรือกูเล่าหยกเป็นเมนูที่แพร่หลายในร้านอาหารกวางตุ้งนอกจีน โดยมักใส่พริกหวานสีสดและหอมใหญ่ ส่วนสูตรบ้านแต่ละถิ่นแตกต่างกัน"
    },
    sources: [
      { title: "The Woks of Life — Sweet and Sour Pork: Restaurant Recipe", url: "https://thewoksoflife.com/sweet-and-sour-pork/" },
      { title: "Serious Eats — Chinese Sweet and Sour Pork Recipe", url: "https://www.seriouseats.com/sweet-and-sour-pork-recipe" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: a shallow white bowl of lacquered golden pork cubes with clearly visible red, yellow, and green bell-pepper squares, onion, ginger, and a few scallion slivers; the red sweet-and-sour sauce should glisten without hiding crisp edges.",
      "zh-hant": "實拍成品視覺規格：淺色白碗盛亮澤金黃豬肉塊，清楚可見紅、黃、綠甜椒塊、洋蔥、薑片與少量青蔥絲；紅色酸甜醬有光澤但不能遮住酥脆邊角。",
      ja: "実写完成品の仕様：白い浅鉢に光沢のある黄金色の豚肉を盛り、赤・黄・緑のピーマン、玉ねぎ、しょうが、青ねぎを見せる。赤い甘酢だれは衣の角を隠さず見せる。",
      ko: "실사 완성품 사양: 흰 얕은 그릇에 윤기 나는 황금빛 돼지고기 큐브를 담고 빨강·노랑·초록 피망, 양파, 생강, 채 썬 대파가 보이게 한다. 붉은 새콤달콤 소스는 바삭한 모서리를 가리지 않는다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: ชามตื้นสีขาวใส่หมูชิ้นสีทองเคลือบเงา ให้เห็นพริกหวานแดง เหลือง เขียว หอมใหญ่ ขิง และต้นหอมซอยชัดเจน ซอสเปรี้ยวหวานสีแดงเงาแต่ไม่กลบขอบกรอบ"
    }
  },

  {
    id: "char-siu",
    cuisine: "chinese",
    name: {
      en: "Cantonese char siu (barbecue pork)",
      "zh-hant": "廣式叉燒",
      ja: "広東風チャーシュー（叉焼）",
      ko: "광둥식 차슈(중국식 바비큐 돼지고기)",
      th: "หมูแดงกวางตุ้ง (ชาซิ่ว)"
    },
    description: {
      en: "Tender pork shoulder marinated in fermented bean curd, soy, honey, and warm spices, then roasted until lacquered.",
      "zh-hant": "豬肩肉以腐乳、醬油、蜂蜜與暖香辛料醃漬，再烤至外層油亮、肉質柔嫩。",
      ja: "豚肩肉を腐乳、しょうゆ、はちみつ、香辛料で漬け込み、つややかに焼き上げる叉焼です。",
      ko: "돼지 목살을 홍두부, 간장, 꿀, 따뜻한 향신료에 재워 윤기 나게 구운 광둥식 바비큐입니다.",
      th: "หมูไหล่หมักเต้าหู้ยี้แดง ซีอิ๊ว น้ำผึ้ง และเครื่องเทศหอม แล้วอบจนเคลือบเงานุ่มฉ่ำ"
    },
    prep: "PT8H",
    cook: "PT40M",
    total: "PT8H40M",
    yield: {
      en: "6 servings (about 700 g cooked pork)",
      "zh-hant": "6 份（熟肉約 700 公克）",
      ja: "6人分（焼き上がり約700g）",
      ko: "6인분(익힌 고기 약 700g)",
      th: "6 ที่ (หมูสุกประมาณ 700 กรัม)"
    },
    servings: 6,
    ingredients: {
      en: [
        { item: "boneless pork shoulder, cut into 5 cm-wide strips", amount: "900 g" },
        { item: "red fermented bean curd", amount: "20 g (1 cube)" },
        { item: "hoisin sauce", amount: "45 g" },
        { item: "honey", amount: "30 g" },
        { item: "maltose", amount: "30 g" },
        { item: "light soy sauce", amount: "30 ml" },
        { item: "Shaoxing wine", amount: "15 ml" },
        { item: "Chinese five-spice powder", amount: "2 g" },
        { item: "garlic, finely grated", amount: "15 g" },
        { item: "white pepper", amount: "1 g" },
        { item: "sesame oil", amount: "5 ml" },
        { item: "warm water for thinning glaze", amount: "15 ml" },
        { item: "honey for final glaze", amount: "15 g" },
        { item: "scallion for serving", amount: "15 g" }
      ],
      "zh-hant": [
        { item: "去骨豬肩肉，切成寬 5 公分長條", amount: "900 公克" },
        { item: "紅腐乳", amount: "20 公克（1 塊）" },
        { item: "海鮮醬", amount: "45 公克" },
        { item: "蜂蜜", amount: "30 公克" },
        { item: "麥芽糖", amount: "30 公克" },
        { item: "淡醬油", amount: "30 毫升" },
        { item: "紹興酒", amount: "15 毫升" },
        { item: "五香粉", amount: "2 公克" },
        { item: "蒜泥", amount: "15 公克" },
        { item: "白胡椒粉", amount: "1 公克" },
        { item: "芝麻油", amount: "5 毫升" },
        { item: "調稀醬汁用溫水", amount: "15 毫升" },
        { item: "最後刷醬用蜂蜜", amount: "15 公克" },
        { item: "青蔥，供上桌", amount: "15 公克" }
      ],
      ja: [
        { item: "骨なし豚肩肉（幅5cmの棒状）", amount: "900g" },
        { item: "紅腐乳", amount: "20g（1個）" },
        { item: "甜麺醤（ホイシンソース）", amount: "45g" },
        { item: "はちみつ", amount: "30g" },
        { item: "麦芽糖", amount: "30g" },
        { item: "薄口しょうゆ", amount: "30ml" },
        { item: "紹興酒", amount: "15ml" },
        { item: "五香粉", amount: "2g" },
        { item: "にんにく（すりおろし）", amount: "15g" },
        { item: "白こしょう", amount: "1g" },
        { item: "ごま油", amount: "5ml" },
        { item: "たれをのばすぬるま湯", amount: "15ml" },
        { item: "仕上げ用はちみつ", amount: "15g" },
        { item: "青ねぎ（盛り付け用）", amount: "15g" }
      ],
      ko: [
        { item: "뼈 없는 돼지 목살, 폭 5cm 막대 모양", amount: "900g" },
        { item: "붉은 발효 두부", amount: "20g(1조각)" },
        { item: "해선장", amount: "45g" },
        { item: "꿀", amount: "30g" },
        { item: "맥아당", amount: "30g" },
        { item: "양조간장", amount: "30ml" },
        { item: "샤오싱주", amount: "15ml" },
        { item: "오향분", amount: "2g" },
        { item: "곱게 간 마늘", amount: "15g" },
        { item: "흰 후추", amount: "1g" },
        { item: "참기름", amount: "5ml" },
        { item: "양념을 묽게 할 따뜻한 물", amount: "15ml" },
        { item: "마지막 바름용 꿀", amount: "15g" },
        { item: "대파, 곁들임용", amount: "15g" }
      ],
      th: [
        { item: "สันคอหมูไม่มีกระดูก หั่นเป็นเส้นกว้าง 5 ซม.", amount: "900 กรัม" },
        { item: "เต้าหู้ยี้แดง", amount: "20 กรัม (1 ก้อน)" },
        { item: "ซอสฮอยซิน", amount: "45 กรัม" },
        { item: "น้ำผึ้ง", amount: "30 กรัม" },
        { item: "มอลโทส", amount: "30 กรัม" },
        { item: "ซีอิ๊วขาว", amount: "30 มล." },
        { item: "เหล้าจีนเส้าซิง", amount: "15 มล." },
        { item: "ผงพะโล้จีนห้าเครื่องเทศ", amount: "2 กรัม" },
        { item: "กระเทียมขูดละเอียด", amount: "15 กรัม" },
        { item: "พริกไทยขาว", amount: "1 กรัม" },
        { item: "น้ำมันงา", amount: "5 มล." },
        { item: "น้ำอุ่นสำหรับเจือจางซอส", amount: "15 มล." },
        { item: "น้ำผึ้งสำหรับทาซ้ำ", amount: "15 กรัม" },
        { item: "ต้นหอมสำหรับเสิร์ฟ", amount: "15 กรัม" }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Mash fermented bean curd, hoisin, honey, maltose, soy, Shaoxing wine, five-spice, garlic, pepper, and sesame oil until smooth. Reserve 15 g honey for finishing." },
        { step: 2, text: "Coat pork strips in the marinade, cover, and refrigerate at least 8 hours and up to 24 hours; turn once halfway so every side is seasoned." },
        { step: 3, text: "Set a rack over a foil-lined tray and heat the oven to 230°C. Arrange pork with space between strips and roast 15 minutes; the edges should begin to brown." },
        { step: 4, text: "Whisk warm water into the remaining marinade. Lower oven to 190°C, brush pork with the thinned marinade, and roast 15 minutes more." },
        { step: 5, text: "Brush with honey and roast at 220°C for 5–8 minutes, turning once, until the surface is mahogany and bubbling; the thickest center must reach at least 63°C (or 68°C for a firmer slice)." },
        { step: 6, text: "Rest pork on the rack for 10 minutes so juices settle. Slice across the grain into 5 mm pieces and brush with tray juices; scatter scallion to serve." }
      ],
      "zh-hant": [
        { step: 1, text: "將紅腐乳、海鮮醬、蜂蜜、麥芽糖、醬油、紹興酒、五香粉、蒜泥、白胡椒與芝麻油壓拌至滑順，保留 15 公克蜂蜜最後使用。" },
        { step: 2, text: "豬肉條均勻裹醃料，覆蓋冷藏至少 8 小時、最多 24 小時；中途翻面一次，使每面入味。" },
        { step: 3, text: "烤盤鋪鋁箔並架網，烤箱預熱至 230°C。豬肉條留間隔排好，烤 15 分鐘，邊緣應開始上色。" },
        { step: 4, text: "將溫水拌入剩餘醃料。烤箱降至 190°C，刷上稀釋醬料，再烤 15 分鐘。" },
        { step: 5, text: "刷上蜂蜜，以 220°C 烤 5–8 分鐘，中途翻面一次，直到表面呈棗紅色並冒泡；最厚處須達至少 63°C（想要較紮實口感則達 68°C）。" },
        { step: 6, text: "豬肉在網架上靜置 10 分鐘讓肉汁回穩，逆紋切 5 毫米片並刷上烤盤肉汁，撒青蔥上桌。" }
      ],
      ja: [
        { step: 1, text: "紅腐乳、甜麺醤、はちみつ、麦芽糖、しょうゆ、紹興酒、五香粉、にんにく、こしょう、ごま油をなめらかに混ぜ、仕上げ用はちみつ15gを取り分ける。" },
        { step: 2, text: "豚肉をたれで全面コーティングし、覆って冷蔵庫で最低8時間、最長24時間漬ける。途中で一度裏返す。" },
        { step: 3, text: "アルミホイルを敷いた天板に網を置き、オーブンを230℃に予熱する。豚肉を間隔を空けて並べ15分焼き、縁が色づき始めるまで待つ。" },
        { step: 4, text: "残りのたれにぬるま湯を混ぜる。温度を190℃に下げ、薄めたたれを塗ってさらに15分焼く。" },
        { step: 5, text: "はちみつを塗り、220℃で5～8分、途中で一度返す。表面が赤褐色で泡立ち、最も厚い部分が63℃以上（しっかりめなら68℃）になれば完成。" },
        { step: 6, text: "網の上で10分休ませて肉汁を落ち着かせる。繊維を横切る5mm厚に切り、天板の肉汁を塗り、青ねぎを添える。" }
      ],
      ko: [
        { step: 1, text: "홍두부, 해선장, 꿀, 맥아당, 간장, 샤오싱주, 오향분, 마늘, 후추, 참기름을 곱게 으깨 섞고 마지막용 꿀 15g은 따로 둔다." },
        { step: 2, text: "돼지고기 전체에 양념을 바르고 덮어 최소 8시간, 최대 24시간 냉장한다. 중간에 한 번 뒤집는다." },
        { step: 3, text: "호일을 깐 팬에 망을 올리고 오븐을 230°C로 예열한다. 고기 사이를 띄워 15분 굽고 가장자리가 갈색이 되기 시작할 때까지 둔다." },
        { step: 4, text: "남은 양념에 따뜻한 물을 섞는다. 오븐을 190°C로 낮추고 묽힌 양념을 발라 15분 더 굽는다." },
        { step: 5, text: "꿀을 바르고 220°C에서 5–8분 굽되 한 번 뒤집는다. 표면이 짙은 적갈색으로 보글거리고 가장 두꺼운 곳이 63°C 이상(더 단단한 식감은 68°C)이면 완성이다." },
        { step: 6, text: "망에서 10분 쉬워 육즙을 안정시킨다. 결 반대 방향으로 5mm 두께로 썰고 팬의 육즙을 발라 대파와 낸다." }
      ],
      th: [
        { step: 1, text: "บดเต้าหู้ยี้แดง ซอสฮอยซิน น้ำผึ้ง มอลโทส ซีอิ๊ว เหล้าจีน ผงห้าเครื่องเทศ กระเทียม พริกไทย และน้ำมันงาให้เนียน แยกน้ำผึ้ง 15 กรัมไว้ทาตอนท้าย" },
        { step: 2, text: "คลุกหมูให้เคลือบซอส ปิดฝาแช่เย็นอย่างน้อย 8 ชั่วโมงและไม่เกิน 24 ชั่วโมง กลับหมูหนึ่งครั้งครึ่งเวลา" },
        { step: 3, text: "วางตะแกรงบนถาดปูฟอยล์ อุ่นเตาที่ 230°C เรียงหมูให้มีช่องว่าง อบ 15 นาทีจนขอบเริ่มเป็นสีน้ำตาล" },
        { step: 4, text: "ผสมน้ำอุ่นกับซอสหมักที่เหลือ ลดเตาเหลือ 190°C ทาซอสที่เจือจางแล้วอบต่อ 15 นาที" },
        { step: 5, text: "ทาน้ำผึ้งแล้วอบที่ 220°C อีก 5–8 นาที กลับหนึ่งครั้ง จนผิวสีน้ำตาลแดงเข้มมีฟอง และใจกลางส่วนหนาสุดถึงอย่างน้อย 63°C (ถ้าชอบเนื้อแน่นให้ 68°C)" },
        { step: 6, text: "พักหมูบนตะแกรง 10 นาทีให้น้ำในเนื้อกระจายตัว หั่นขวางเส้นหนา 5 มม. ทาน้ำหมูจากถาดและโรยต้นหอม" }
      ]
    },
    tips: {
      en: ["Use a rack so rendered fat drips away instead of steaming the bottom.", "Warm maltose briefly in hot water if it is too stiff to brush."],
      "zh-hant": ["使用網架讓油脂滴落，避免底部被蒸軟。", "麥芽糖太硬時先用熱水稍微溫熱，就容易刷開。"],
      ja: ["網を使うと脂が落ち、底面が蒸れない。", "麦芽糖が固ければ湯で少し温めると塗りやすい。"],
      ko: ["망을 사용해야 녹은 기름이 빠져 바닥이 찌지 않는다.", "맥아당이 굳었으면 뜨거운 물에 잠깐 데워 바르기 좋게 한다."],
      th: ["ใช้ตะแกรงให้น้ำมันหยดออก ไม่อบไอน้ำด้านล่างหมู", "ถ้ามอลโทสแข็ง ให้อุ่นในน้ำร้อนเล็กน้อยก่อนทา"]
    },
    commonMistakes: {
      en: ["A wet, crowded tray prevents browning; leave space and drain excess marinade.", "Slicing immediately loses juices and makes the center dry."],
      "zh-hant": ["烤盤太濕或肉條擠在一起會不上色；要留間隔並瀝掉多餘醃料。", "剛出爐立刻切會流失肉汁，肉心變乾。"],
      ja: ["天板が濡れたまま、または肉を詰めすぎると焼き色がつかない。間隔を空け余分なたれを落とす。", "焼き上がり直後に切ると肉汁が流れ、中心が乾く。"],
      ko: ["팬이 젖었거나 고기를 빽빽하게 놓으면 갈변하지 않는다. 간격을 두고 양념을 턴다.", "굽자마자 썰면 육즙이 빠져 속이 마른다."],
      th: ["ถาดแฉะหรือวางหมูชิดกันจะไม่เกิดสีเข้ม ต้องเว้นช่องและสะเด็ดซอสส่วนเกิน", "หั่นทันทีที่ออกจากเตาจะเสียน้ำในเนื้อและแห้ง"]
    },
    substitutions: {
      en: [{ from: "maltose (30 g)", to: "extra honey (30 g)", note: "Use a slightly lighter glaze and watch browning." }, { from: "pork shoulder (900 g)", to: "pork belly (900 g)", note: "Trim only the thickest fat and roast until 68°C." }],
      "zh-hant": [{ from: "麥芽糖（30 公克）", to: "額外蜂蜜（30 公克）", note: "醬色會較淡，請留意上色速度。" }, { from: "豬肩肉（900 公克）", to: "豬五花（900 公克）", note: "只修掉最厚脂肪，烤至 68°C。" }],
      ja: [{ from: "麦芽糖（30g）", to: "追加のはちみつ（30g）", note: "色づきが早いので焼き色を見て調整する。" }, { from: "豚肩肉（900g）", to: "豚バラ肉（900g）", note: "厚い脂だけ落とし、中心68℃まで焼く。" }],
      ko: [{ from: "맥아당(30g)", to: "추가 꿀(30g)", note: "색이 빨리 나므로 굽는 정도를 살핀다." }, { from: "돼지 목살(900g)", to: "삼겹살(900g)", note: "두꺼운 지방만 정리하고 중심 68°C까지 굽는다." }],
      th: [{ from: "มอลโทส (30 กรัม)", to: "น้ำผึ้งเพิ่ม (30 กรัม)", note: "ซอสจะสีอ่อนกว่าและไหม้เร็วขึ้น คอยดูสี" }, { from: "หมูไหล่ (900 กรัม)", to: "หมูสามชั้น (900 กรัม)", note: "ตัดไขมันก้อนหนาออกและอบให้ใจกลาง 68°C" }]
    },
    storage: {
      en: "Cool sliced pork within 2 hours, refrigerate airtight for up to 3 days, or freeze up to 2 months. Reheat covered at 160°C until warm, then uncover for 3 minutes to refresh the glaze.",
      "zh-hant": "叉燒切片後 2 小時內冷卻，密封冷藏最多 3 天，或冷凍最多 2 個月。160°C 加蓋回熱至溫，再揭蓋 3 分鐘恢復醬面。",
      ja: "切った叉焼は2時間以内に冷まし、密閉して冷蔵3日、冷凍2か月まで。160℃で覆って温め、最後の3分は覆いを外してたれを戻す。",
      ko: "썬 차슈는 2시간 안에 식혀 밀폐 냉장 3일, 냉동 2개월까지 보관한다. 160°C에서 덮어 데운 뒤 마지막 3분은 뚜껑을 열어 윤기를 살린다.",
      th: "ทำหมูที่หั่นแล้วให้เย็นภายใน 2 ชั่วโมง แช่เย็นภาชนะปิดสนิทได้ 3 วันหรือแช่แข็ง 2 เดือน อุ่นแบบปิดที่ 160°C จนร้อน แล้วเปิดฝา 3 นาทีให้ซอสเงา"
    },
    culturalNotes: {
      en: "Char siu is a Cantonese roast-meat tradition; the name means ‘fork-roasted,’ referring to strips traditionally suspended on forks in a hot oven. Red fermented bean curd supplies traditional color and savoriness.",
      "zh-hant": "叉燒是粵式燒味傳統，「叉燒」意指以叉子懸掛燒烤的肉條；紅腐乳同時帶來傳統紅色與醇厚鹹香。",
      ja: "叉焼は広東の焼味文化で、名は肉を叉に掛けて焼いたことに由来する。紅腐乳が伝統的な赤色とコクを与える。",
      ko: "차슈는 광둥식 구이 요리 전통으로, 이름은 고기 조각을 꼬챙이나 포크에 걸어 구운 방식에서 왔다. 붉은 발효 두부가 전통적인 색과 감칠맛을 더한다.",
      th: "ชาซิ่วเป็นวัฒนธรรมหมูย่างกวางตุ้ง ชื่อหมายถึงการย่างหมูเป็นเส้นแขวนบนส้อมหรือเหล็ก เต้าหู้ยี้แดงให้ทั้งสีแดงแบบดั้งเดิมและรสกลมกล่อม"
    },
    sources: [
      { title: "The Woks of Life — Char Siu (Chinese BBQ Pork)", url: "https://thewoksoflife.com/chinese-bbq-pork-cha-siu/" },
      { title: "RecipeTin Eats — Char Siu Pork (Chinese BBQ Pork)", url: "https://www.recipetineats.com/chinese-barbecue-pork-char-siu/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: several 5 mm slices of mahogany-red char siu on a neutral plate, showing a glossy caramelized rim and pale juicy center; include visible scallion slivers and a small pool of glaze, with no hidden garnishes.",
      "zh-hant": "實拍成品視覺規格：中性餐盤放數片 5 毫米厚棗紅叉燒，顯示亮澤焦糖化邊緣與淡色多汁肉心；可見青蔥絲與少量醬汁，不放未列出的裝飾。",
      ja: "実写完成品の仕様：中立色の皿に厚さ5mmの赤褐色叉焼を数枚並べ、つややかな焦げ縁と淡いジューシーな断面を見せる。青ねぎと少量のたれも見えるようにする。",
      ko: "실사 완성품 사양: 무채색 접시에 5mm 두께의 짙은 적갈색 차슈를 여러 장 놓고 윤기 나는 캐러멜 가장자리와 촉촉한 밝은 속살을 보여준다. 채 썬 대파와 소량의 소스가 보인다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: เรียงหมูแดงหั่นหนา 5 มม. หลายชิ้นบนจานสีเป็นกลาง ให้เห็นขอบเคลือบคาราเมลสีน้ำตาลแดงและเนื้อกลางสีอ่อนฉ่ำ มีต้นหอมซอยและซอสเล็กน้อยที่มองเห็น"
    }
  },

  {
    id: "cantonese-steamed-fish",
    cuisine: "chinese",
    name: {
      en: "Cantonese steamed fish with ginger and scallion",
      "zh-hant": "廣式薑蔥清蒸魚",
      ja: "広東風白身魚のしょうがねぎ蒸し",
      ko: "광둥식 생강·대파 찐 생선",
      th: "ปลานึ่งขิงต้นหอมสไตล์กวางตุ้ง"
    },
    description: {
      en: "A delicate white-fish fillet steamed over a gentle boil, then finished with soy, ginger, scallion, cilantro, and hot oil.",
      "zh-hant": "細嫩白魚片以微滾蒸氣蒸熟，再淋淡醬油、薑、青蔥、香菜與熱油。",
      ja: "白身魚を穏やかな蒸気で蒸し、しょうゆ、しょうが、ねぎ、香菜、熱い油で仕上げます。",
      ko: "부드러운 흰살 생선을 약한 끓음으로 찐 뒤 간장, 생강, 대파, 고수, 뜨거운 기름으로 마무리합니다.",
      th: "เนื้อปลาขาวนึ่งด้วยไอน้ำเดือดอ่อน แล้วราดซีอิ๊ว ขิง ต้นหอม ผักชี และน้ำมันร้อน"
    },
    prep: "PT10M",
    cook: "PT15M",
    total: "PT25M",
    yield: {
      en: "2 servings",
      "zh-hant": "2 份",
      ja: "2人分",
      ko: "2인분",
      th: "2 ที่"
    },
    servings: 2,
    ingredients: {
      en: [
        { item: "delicate white-fish fillet, about 2.5 cm thick", amount: "450 g" },
        { item: "ginger, half julienned and half thinly sliced", amount: "25 g" },
        { item: "scallions, cut into 5 cm lengths", amount: "40 g" },
        { item: "cilantro, roughly chopped", amount: "15 g" },
        { item: "light soy sauce", amount: "30 ml" },
        { item: "hot water", amount: "30 ml" },
        { item: "granulated sugar", amount: "1 g" },
        { item: "fine salt", amount: "1 g" },
        { item: "neutral oil", amount: "30 ml" }
      ],
      "zh-hant": [
        { item: "細嫩白魚魚片，厚約 2.5 公分", amount: "450 公克" },
        { item: "薑，一半切絲、一半切薄片", amount: "25 公克" },
        { item: "青蔥，切 5 公分段", amount: "40 公克" },
        { item: "香菜，粗切", amount: "15 公克" },
        { item: "淡醬油", amount: "30 毫升" },
        { item: "熱水", amount: "30 毫升" },
        { item: "砂糖", amount: "1 公克" },
        { item: "細鹽", amount: "1 公克" },
        { item: "中性油", amount: "30 毫升" }
      ],
      ja: [
        { item: "繊細な白身魚の切り身（厚さ約2.5cm）", amount: "450g" },
        { item: "しょうが（半分は千切り、半分は薄切り）", amount: "25g" },
        { item: "青ねぎ（5cm長さ）", amount: "40g" },
        { item: "香菜（粗く刻む）", amount: "15g" },
        { item: "薄口しょうゆ", amount: "30ml" },
        { item: "熱湯", amount: "30ml" },
        { item: "グラニュー糖", amount: "1g" },
        { item: "細塩", amount: "1g" },
        { item: "無味の油", amount: "30ml" }
      ],
      ko: [
        { item: "부드러운 흰살 생선 필레(두께 약 2.5cm)", amount: "450g" },
        { item: "생강(절반은 채 썰고 절반은 얇게 썬 것)", amount: "25g" },
        { item: "대파(5cm 길이)", amount: "40g" },
        { item: "고수(굵게 다진 것)", amount: "15g" },
        { item: "양조간장", amount: "30ml" },
        { item: "뜨거운 물", amount: "30ml" },
        { item: "설탕", amount: "1g" },
        { item: "고운 소금", amount: "1g" },
        { item: "중성유", amount: "30ml" }
      ],
      th: [
        { item: "เนื้อปลาขาวบอบบางหนาประมาณ 2.5 ซม.", amount: "450 กรัม" },
        { item: "ขิง ครึ่งหนึ่งซอยและอีกครึ่งหั่นบาง", amount: "25 กรัม" },
        { item: "ต้นหอมหั่นยาว 5 ซม.", amount: "40 กรัม" },
        { item: "ผักชีสับหยาบ", amount: "15 กรัม" },
        { item: "ซีอิ๊วขาว", amount: "30 มล." },
        { item: "น้ำร้อน", amount: "30 มล." },
        { item: "น้ำตาลทราย", amount: "1 กรัม" },
        { item: "เกลือป่น", amount: "1 กรัม" },
        { item: "น้ำมันรสกลาง", amount: "30 มล." }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Julienne half the ginger and scallion; reserve one-third of the aromatics for the finish. Stir soy sauce, hot water, sugar, and salt until dissolved." },
        { step: 2, text: "Set a rack in a wok with 2–3 cm water. Bring the water to a boil over high heat, then keep a steady medium heat that produces continuous steam." },
        { step: 3, text: "Place fish on a heatproof plate with sliced ginger underneath. Steam covered over medium heat for 8–10 minutes; a knife should slide through the thickest point and the center should flake opaque (63°C)." },
        { step: 4, text: "Carefully drain the cloudy liquid from the plate. Arrange one-third of the julienned aromatics on the fish while it is still hot." },
        { step: 5, text: "Heat oil in a small pan over medium-high heat to about 180°C. Fry the sliced ginger for 60 seconds, add white scallion for 30 seconds, then add remaining scallion and cilantro for 30 seconds; they should sizzle and wilt." },
        { step: 6, text: "Pour in the soy mixture, let it bubble for 30 seconds, and immediately spoon it over the fish. Serve at once while the flesh is moist and the aromatics fragrant." }
      ],
      "zh-hant": [
        { step: 1, text: "將一半薑與青蔥切絲，保留三分之一香料最後使用。淡醬油、熱水、砂糖與鹽攪拌至溶解。" },
        { step: 2, text: "蒸鍋放架並加 2–3 公分水，大火煮沸後轉中火，維持連續蒸氣。" },
        { step: 3, text: "耐熱盤底放薑片，再放魚片。蓋上以中火蒸 8–10 分鐘；刀子應能滑入最厚處，魚肉中心呈不透明片狀且達 63°C。" },
        { step: 4, text: "小心倒掉盤中混濁魚汁，趁魚仍熱將三分之一薑蔥絲鋪在魚上。" },
        { step: 5, text: "小鍋以中大火加熱油至約 180°C。薑片炸 60 秒，加入蔥白 30 秒，再加剩餘蔥段與香菜 30 秒；應發出滋滋聲並剛好變軟。" },
        { step: 6, text: "倒入醬油混合液，冒泡煮 30 秒後立即淋在魚上；魚肉仍濕嫩、香料正香時馬上上桌。" }
      ],
      ja: [
        { step: 1, text: "しょうがとねぎの半量を千切りにし、3分の1を仕上げ用に取っておく。しょうゆ、熱湯、砂糖、塩を溶かす。" },
        { step: 2, text: "蒸し器の網に2～3cmの水を入れ、強火で沸かす。中火にして絶えず蒸気が出る状態を保つ。" },
        { step: 3, text: "耐熱皿に薄切りしょうがを敷き、魚をのせる。ふたをして中火で8～10分蒸す。最厚部にナイフがすっと入り、中心が白くほぐれて63℃になればよい。" },
        { step: 4, text: "皿に出た濁った汁を注意して捨て、魚が熱いうちに千切り香味野菜の3分の1をのせる。" },
        { step: 5, text: "小鍋の油を中強火で約180℃にする。しょうがを60秒、ねぎの白い部分を30秒、残りのねぎと香菜を30秒炒め、音がしてしんなりしたらよい。" },
        { step: 6, text: "しょうゆ液を注ぎ30秒沸かして、すぐ魚にかける。身がしっとりし、香りが立っているうちに供する。" }
      ],
      ko: [
        { step: 1, text: "생강과 대파의 절반을 채 썰고 3분의 1은 마무리용으로 남긴다. 간장, 뜨거운 물, 설탕, 소금을 녹인다." },
        { step: 2, text: "웍에 찜 망을 놓고 물 2–3cm를 붓는다. 센 불로 끓인 뒤 중불로 낮춰 계속 김이 나게 한다." },
        { step: 3, text: "내열 접시에 생강 슬라이스를 깔고 생선을 올린다. 덮어 중불에서 8–10분 찐다. 가장 두꺼운 곳에 칼이 부드럽게 들어가고 속살이 불투명하게 풀리며 63°C가 되면 익은 것이다." },
        { step: 4, text: "접시의 탁한 물을 조심히 따라낸다. 생선이 뜨거울 때 채 썬 향채의 3분의 1을 올린다." },
        { step: 5, text: "작은 팬의 기름을 중강불로 약 180°C까지 달군다. 생강을 60초, 대파 흰 부분을 30초, 남은 대파와 고수를 30초 볶아 지글거리고 숨이 죽으면 된다." },
        { step: 6, text: "간장물을 붓고 30초 끓인 즉시 생선 위에 숟가락으로 끼얹는다. 살이 촉촉하고 향이 날 때 바로 낸다." }
      ],
      th: [
        { step: 1, text: "ซอยขิงและต้นหอมครึ่งหนึ่ง เก็บเครื่องหอมหนึ่งในสามไว้โรยท้าย ผสมซีอิ๊ว น้ำร้อน น้ำตาล และเกลือจนละลาย" },
        { step: 2, text: "วางตะแกรงในกระทะ เติมน้ำลึก 2–3 ซม. ต้มไฟแรงให้เดือด แล้วลดเป็นไฟกลางให้มีไอน้ำต่อเนื่อง" },
        { step: 3, text: "วางขิงหั่นบางบนจานทนร้อนแล้ววางปลา ปิดฝานึ่งไฟกลาง 8–10 นาที; มีดควรสอดผ่านส่วนหนาสุดได้ เนื้อกลางทึบเป็นชิ้นและถึง 63°C" },
        { step: 4, text: "เทน้ำขุ่นจากจานออกอย่างระวัง ขณะปลายังร้อนวางเครื่องหอมซอยหนึ่งในสามด้านบน" },
        { step: 5, text: "ตั้งน้ำมันในกระทะเล็กไฟกลางค่อนแรงให้ราว 180°C เจียวขิง 60 วินาที ใส่ต้นหอมส่วนขาว 30 วินาที แล้วใส่ต้นหอมที่เหลือกับผักชี 30 วินาทีจนมีเสียงฉ่าและสลด" },
        { step: 6, text: "เทส่วนผสมซีอิ๊วลงไป ต้มให้เดือด 30 วินาที แล้วตักราดปลาทันที เสิร์ฟขณะเนื้อยังชุ่มและเครื่องหอมมีกลิ่นสด" }
      ]
    },
    tips: {
      en: ["Use a plate that fits the steamer with room for steam to circulate.", "Draining the plate liquid before the sauce keeps the final flavor clean."],
      "zh-hant": ["選能放入蒸鍋且四周留有蒸氣通道的盤子。", "先倒掉盤中魚汁再淋醬，成品味道更清爽。"],
      ja: ["蒸気が回る余白を残して蒸し器に入る皿を使う。", "たれをかける前に皿の汁を捨てると味が濁らない。"],
      ko: ["찜통에 들어가면서도 김이 돌 공간이 있는 접시를 사용한다.", "소스를 붓기 전에 접시 물을 따라내야 맛이 깔끔하다."],
      th: ["ใช้จานที่พอดีกับหม้อนึ่งและเหลือช่องให้ไอน้ำไหลเวียน", "เทน้ำจากจานออกก่อนราดซอส รสชาติสุดท้ายจะใสสะอาด"]
    },
    commonMistakes: {
      en: ["A violent boil can splash water onto the fish and dilute its flavor.", "Oversteaming makes lean fillets chalky; start checking at 8 minutes."],
      "zh-hant": ["水沸騰太猛烈會濺到魚，沖淡魚味。", "白魚蒸過頭會粉乾，8 分鐘就開始檢查。"],
      ja: ["沸騰が強すぎると魚に湯がかかり、味が薄まる。", "蒸しすぎると白身が粉っぽくなるので8分から確認する。"],
      ko: ["물이 세게 끓으면 생선에 튀어 맛이 묽어진다.", "너무 오래 찌면 흰살이 퍽퍽해지므로 8분부터 확인한다."],
      th: ["เดือดแรงเกินไปอาจกระเด็นถูกปลาและทำให้รสจาง", "นึ่งนานไปเนื้อปลาขาวจะแห้งร่วน ให้เริ่มเช็กที่ 8 นาที"]
    },
    substitutions: {
      en: [{ from: "delicate white fish (450 g)", to: "whole cleaned sea bass (600–700 g)", note: "Steam 12–16 minutes and check the thickest shoulder." }, { from: "cilantro (15 g)", to: "Chinese celery leaves (15 g)", note: "The aroma is different but remains fresh." }],
      "zh-hant": [{ from: "細嫩白魚片（450 公克）", to: "處理好的整尾鱸魚（600–700 公克）", note: "蒸 12–16 分鐘並檢查魚肩最厚處。" }, { from: "香菜（15 公克）", to: "芹菜葉（15 公克）", note: "香氣不同但仍清新。" }],
      ja: [{ from: "白身魚の切り身（450g）", to: "下処理した丸ごとのスズキ（600～700g）", note: "12～16分蒸し、肩の厚い部分を確認する。" }, { from: "香菜（15g）", to: "中国セロリの葉（15g）", note: "香りは変わるが爽やか。" }],
      ko: [{ from: "흰살 생선 필레(450g)", to: "손질한 농어 한 마리(600–700g)", note: "12–16분 찌고 어깨의 가장 두꺼운 곳을 확인한다." }, { from: "고수(15g)", to: "중국 셀러리 잎(15g)", note: "향은 다르지만 산뜻하다." }],
      th: [{ from: "เนื้อปลาขาว (450 กรัม)", to: "ปลากะพงทั้งตัวทำความสะอาดแล้ว (600–700 กรัม)", note: "นึ่ง 12–16 นาทีและเช็กส่วนไหล่ที่หนาที่สุด" }, { from: "ผักชี (15 กรัม)", to: "ใบขึ้นฉ่ายจีน (15 กรัม)", note: "กลิ่นต่างกันแต่ยังสดชื่น" }]
    },
    storage: {
      en: "Eat immediately for the best texture. Refrigerate leftovers covered for up to 1 day; reheat gently in a covered steamer at 80–90°C for 4–5 minutes and make fresh hot oil, rather than microwaving.",
      "zh-hant": "最佳口感是立即食用。剩魚密封冷藏最多 1 天；以 80–90°C 加蓋蒸 4–5 分鐘溫和回熱，另做新熱油，不建議微波。",
      ja: "食感のため出来たてを食べる。残りは覆って冷蔵1日まで、80～90℃の蒸し器で4～5分やさしく温め、熱い油は作り直す。電子レンジは避ける。",
      ko: "식감이 가장 좋을 때 바로 먹는다. 남은 생선은 덮어 냉장 1일까지 보관하고 80–90°C 찜기에서 4–5분 부드럽게 데운 뒤 뜨거운 기름은 새로 만든다. 전자레인지는 피한다.",
      th: "กินทันทีจะได้เนื้อดีที่สุด เก็บที่เหลือในภาชนะปิดแช่เย็นไม่เกิน 1 วัน อุ่นเบาๆ ในลังถึงปิดฝาที่ 80–90°C 4–5 นาที และทำน้ำมันร้อนใหม่ ไม่ควรใช้ไมโครเวฟ"
    },
    culturalNotes: {
      en: "The Cantonese ideal is to highlight fresh fish with restrained seasoning; whole steamed fish is a familiar banquet course and the fish’s intact shape can symbolize abundance.",
      "zh-hant": "粵菜重視以克制調味凸顯鮮魚；整尾清蒸魚常見於宴席，完整魚形也可象徵年年有餘與豐足。",
      ja: "広東料理では控えめな味付けで魚の鮮度を生かす。丸魚の蒸し物は宴席の定番で、姿を保つ魚は豊かさの象徴にもなる。",
      ko: "광둥 요리는 절제된 양념으로 신선한 생선 맛을 살린다. 통생선 찜은 연회에서 익숙한 코스이며 온전한 생선 모양은 풍요를 상징하기도 한다.",
      th: "ครัวกวางตุ้งเน้นรสปรุงอ่อนเพื่อชูความสดของปลา ปลานึ่งทั้งตัวเป็นเมนูงานเลี้ยงที่คุ้นเคย และปลาที่คงรูปสื่อถึงความอุดมสมบูรณ์ได้"
    },
    sources: [
      { title: "The Woks of Life — Cantonese Steamed Fish", url: "https://thewoksoflife.com/cantonese-steamed-fish/" },
      { title: "The Washington Post — How to steam a whole fish, Cantonese-style", url: "https://www.washingtonpost.com/food/2021/07/22/sizzling-fish-recipe/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: a white oval plate with an intact moist white fillet, clearly visible ginger matchsticks, scallion strips, cilantro leaves, and a thin amber soy sheen; show no lemon or unlisted garnish.",
      "zh-hant": "實拍成品視覺規格：白色橢圓盤盛完整濕潤白魚片，清楚可見薑絲、青蔥絲、香菜葉與薄薄琥珀色醬油光；不要出現檸檬或未列配料。",
      ja: "実写完成品の仕様：白い楕円皿にしっとりした白身魚を崩さず盛り、しょうがの千切り、ねぎ、香菜、薄い琥珀色のしょうゆの光沢を見せる。レモンなど記載外の飾りは置かない。",
      ko: "실사 완성품 사양: 흰 타원 접시에 촉촉한 흰살 필레를 온전하게 담고 생강채, 대파채, 고수 잎, 얇은 호박색 간장 윤기를 분명히 보인다. 레몬이나 목록 밖 고명은 없다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: จานรีสีขาววางเนื้อปลาขาวชุ่มชื้นเป็นชิ้นเต็ม ให้เห็นขิงซอย ต้นหอมซอย ใบผักชี และเงาซีอิ๊วสีอำพันบางๆ ห้ามมีมะนาวหรือเครื่องตกแต่งที่ไม่อยู่ในรายการ"
    }
  },

  {
    id: "clay-pot-rice",
    cuisine: "chinese",
    name: {
      en: "Hong Kong-style clay-pot rice",
      "zh-hant": "港式煲仔飯",
      ja: "香港風土鍋ご飯",
      ko: "홍콩식 뚝배기밥",
      th: "ข้าวอบหม้อดินสไตล์ฮ่องกง"
    },
    description: {
      en: "Jasmine rice steams with Chinese sausage and cured pork belly, finishing with a savory soy dressing and crisped rice at the base.",
      "zh-hant": "茉莉香米與臘腸、臘肉同煮，最後淋鹹香醬汁，鍋底形成薄脆飯焦。",
      ja: "ジャスミン米を中国ソーセージと塩漬け豚バラ肉と炊き、しょうゆだれと鍋底の香ばしいおこげで仕上げます。",
      ko: "자스민 쌀을 중국 소시지와 염장 삼겹살과 함께 익혀 짭짤한 간장 소스와 바닥의 누룽지로 마무리합니다.",
      th: "ข้าวหอมมะลิอบกับกุนเชียงจีนและหมูสามชั้นหมักเกลือ ราดซอสซีอิ๊วเข้มข้นพร้อมข้าวกรอบก้นหม้อ"
    },
    prep: "PT1H10M",
    cook: "PT20M",
    total: "PT1H30M",
    yield: {
      en: "2 servings",
      "zh-hant": "2 份",
      ja: "2人分",
      ko: "2인분",
      th: "2 ที่"
    },
    servings: 2,
    ingredients: {
      en: [
        { item: "jasmine or other long-grain white rice", amount: "200 g" },
        { item: "water for soaking and cooking", amount: "240 ml" },
        { item: "cured pork belly, sliced 5 mm thick", amount: "150 g" },
        { item: "sweet Chinese sausage, sliced 5 mm thick", amount: "100 g (2 links)" },
        { item: "ginger, thinly sliced", amount: "10 g" },
        { item: "scallion, chopped", amount: "25 g" },
        { item: "light soy sauce", amount: "30 ml" },
        { item: "seasoned soy sauce", amount: "15 ml" },
        { item: "dark soy sauce", amount: "7.5 ml" },
        { item: "fish sauce", amount: "15 ml" },
        { item: "granulated sugar", amount: "2 g" },
        { item: "white pepper", amount: "0.5 g" },
        { item: "neutral oil for the pot", amount: "5 ml" }
      ],
      "zh-hant": [
        { item: "茉莉香米或其他長米", amount: "200 公克" },
        { item: "浸米及煮飯用水", amount: "240 毫升" },
        { item: "臘肉，切 5 毫米片", amount: "150 公克" },
        { item: "甜味臘腸，切 5 毫米片", amount: "100 公克（2 條）" },
        { item: "薑，薄片", amount: "10 公克" },
        { item: "青蔥，切碎", amount: "25 公克" },
        { item: "淡醬油", amount: "30 毫升" },
        { item: "調味醬油", amount: "15 毫升" },
        { item: "老抽", amount: "7.5 毫升" },
        { item: "魚露", amount: "15 毫升" },
        { item: "砂糖", amount: "2 公克" },
        { item: "白胡椒粉", amount: "0.5 公克" },
        { item: "抹鍋用中性油", amount: "5 毫升" }
      ],
      ja: [
        { item: "ジャスミン米など長粒米", amount: "200g" },
        { item: "浸水・炊飯用の水", amount: "240ml" },
        { item: "塩漬け豚バラ肉（5mm厚）", amount: "150g" },
        { item: "甘い中国ソーセージ（5mm厚）", amount: "100g（2本）" },
        { item: "しょうが（薄切り）", amount: "10g" },
        { item: "青ねぎ（小口切り）", amount: "25g" },
        { item: "薄口しょうゆ", amount: "30ml" },
        { item: "調味しょうゆ", amount: "15ml" },
        { item: "濃口しょうゆ", amount: "7.5ml" },
        { item: "魚醤", amount: "15ml" },
        { item: "グラニュー糖", amount: "2g" },
        { item: "白こしょう", amount: "0.5g" },
        { item: "鍋用無味の油", amount: "5ml" }
      ],
      ko: [
        { item: "자스민 쌀 또는 장립종 백미", amount: "200g" },
        { item: "불리고 밥할 물", amount: "240ml" },
        { item: "염장 삼겹살, 5mm 두께", amount: "150g" },
        { item: "단맛 중국 소시지, 5mm 두께", amount: "100g(2개)" },
        { item: "생강, 얇게 썬 것", amount: "10g" },
        { item: "대파, 다진 것", amount: "25g" },
        { item: "양조간장", amount: "30ml" },
        { item: "조미 간장", amount: "15ml" },
        { item: "진간장", amount: "7.5ml" },
        { item: "액젓", amount: "15ml" },
        { item: "설탕", amount: "2g" },
        { item: "흰 후추", amount: "0.5g" },
        { item: "냄비에 바를 중성유", amount: "5ml" }
      ],
      th: [
        { item: "ข้าวหอมมะลิหรือข้าวเมล็ดยาว", amount: "200 กรัม" },
        { item: "น้ำสำหรับแช่และหุง", amount: "240 มล." },
        { item: "หมูสามชั้นหมักเกลือหั่นหนา 5 มม.", amount: "150 กรัม" },
        { item: "กุนเชียงจีนรสหวานหั่นหนา 5 มม.", amount: "100 กรัม (2 ชิ้น)" },
        { item: "ขิงหั่นบาง", amount: "10 กรัม" },
        { item: "ต้นหอมสับ", amount: "25 กรัม" },
        { item: "ซีอิ๊วขาว", amount: "30 มล." },
        { item: "ซีอิ๊วปรุงรส", amount: "15 มล." },
        { item: "ซีอิ๊วดำ", amount: "7.5 มล." },
        { item: "น้ำปลา", amount: "15 มล." },
        { item: "น้ำตาลทราย", amount: "2 กรัม" },
        { item: "พริกไทยขาว", amount: "0.5 กรัม" },
        { item: "น้ำมันรสกลางสำหรับทาหม้อ", amount: "5 มล." }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Rinse rice until the water is nearly clear. Add 240 ml water to the clay pot, soak 60 minutes, and lightly oil the inner rim; the grains should be fully hydrated." },
        { step: 2, text: "Set pot over medium heat, uncovered, and bring to a boil in about 5–8 minutes. Lay cured pork and sausage over the rice without stirring." },
        { step: 3, text: "Cover, lower to the lowest heat, and simmer 10 minutes. Listen for a gentle hiss rather than a hard boil; rice should be nearly tender and water mostly absorbed." },
        { step: 4, text: "Mix light soy, seasoned soy, dark soy, fish sauce, sugar, and white pepper. Pour evenly over the rice, cover, and cook on low 3 minutes." },
        { step: 5, text: "Turn heat to medium-high for 2–3 minutes to set a thin crisp rice layer; stop when the bottom smells toasted but before it smells burnt." },
        { step: 6, text: "Lift out the meats, slice them, and return them with scallion. Rest covered off heat for 5 minutes, then fold gently from the bottom so crisp rice remains in pieces." }
      ],
      "zh-hant": [
        { step: 1, text: "米洗至水接近清澈，放入砂鍋加 240 毫升水浸泡 60 分鐘，鍋緣薄抹油；米粒應充分吸水。" },
        { step: 2, text: "砂鍋不加蓋以中火加熱，約 5–8 分鐘煮沸；將臘肉與臘腸鋪在米上，不要攪拌。" },
        { step: 3, text: "加蓋轉最小火煮 10 分鐘。應聽到輕微嘶聲而非猛烈沸騰；米飯接近熟透且水分大致吸收。" },
        { step: 4, text: "混合淡醬油、調味醬油、老抽、魚露、砂糖與白胡椒，均勻淋在米上，加蓋小火再煮 3 分鐘。" },
        { step: 5, text: "轉中大火 2–3 分鐘讓鍋底形成薄脆飯焦；聞到烘烤香就停止，不能出現焦苦味。" },
        { step: 6, text: "取出肉類切片，與青蔥放回鍋中，離火加蓋靜置 5 分鐘；由鍋底輕輕翻拌，保留成片飯焦。" }
      ],
      ja: [
        { step: 1, text: "米をほぼ透明になるまで洗う。土鍋に水240mlを入れて60分浸水し、内側の縁に薄く油を塗る。米が十分吸水した状態にする。" },
        { step: 2, text: "ふたをせず中火にかけ、5～8分で沸騰させる。豚肉とソーセージを米の上に置き、混ぜない。" },
        { step: 3, text: "ふたをして最弱火で10分炊く。激しい沸騰ではなく小さな音がし、米がほぼ柔らかく水が吸われればよい。" },
        { step: 4, text: "しょうゆ、調味しょうゆ、濃口しょうゆ、魚醤、砂糖、白こしょうを混ぜる。米全体に回しかけ、ふたをして弱火で3分炊く。" },
        { step: 5, text: "中強火で2～3分加熱し、薄いおこげを作る。底から香ばしい匂いが立ったら止め、焦げ臭くする前に火を切る。" },
        { step: 6, text: "肉を取り出して切り、ねぎと戻す。火を止めてふたをしたまま5分休ませ、底からそっと混ぜておこげを塊で残す。" }
      ],
      ko: [
        { step: 1, text: "쌀을 물이 거의 맑아질 때까지 씻는다. 뚝배기에 물 240ml를 넣고 60분 불린 뒤 안쪽 가장자리에 기름을 얇게 바른다. 쌀알이 충분히 불어야 한다." },
        { step: 2, text: "뚜껑을 열고 중불에서 약 5–8분 끓인다. 염장 고기와 소시지를 밥 위에 올리고 젓지 않는다." },
        { step: 3, text: "뚜껑을 덮어 불을 최저로 낮추고 10분 끓인다. 세게 끓는 소리 대신 잔잔한 치익 소리가 나고 물이 거의 흡수되면 된다." },
        { step: 4, text: "간장, 조미 간장, 진간장, 액젓, 설탕, 흰 후추를 섞어 밥 전체에 고르게 붓는다. 덮어 약불에서 3분 더 익힌다." },
        { step: 5, text: "중강불에서 2–3분 가열해 얇은 누룽지를 만든다. 바닥에서 구수한 향이 나면 타는 냄새가 나기 전에 멈춘다." },
        { step: 6, text: "고기를 꺼내 썰어 대파와 함께 다시 넣는다. 불을 끄고 덮어 5분 쉰 뒤 바닥부터 살살 섞어 누룽지를 조각으로 남긴다." }
      ],
      th: [
        { step: 1, text: "ล้างข้าวจนเกือบใส ใส่น้ำ 240 มล. ในหม้อดิน แช่ 60 นาที แล้วทาน้ำมันบางๆ ที่ขอบด้านใน เมล็ดข้าวควรอิ่มน้ำทั่วถึง" },
        { step: 2, text: "ตั้งหม้อเปิดฝาด้วยไฟกลาง ต้มให้เดือดภายในประมาณ 5–8 นาที วางหมูหมักและกุนเชียงบนข้าวโดยไม่คน" },
        { step: 3, text: "ปิดฝา ลดเป็นไฟอ่อนสุด เคี่ยว 10 นาที ควรได้ยินเสียงฉ่าเบาๆ ไม่ใช่เดือดแรง ข้าวเกือบสุกและน้ำถูกดูดไปเกือบหมด" },
        { step: 4, text: "ผสมซีอิ๊วขาว ซีอิ๊วปรุงรส ซีอิ๊วดำ น้ำปลา น้ำตาล และพริกไทยขาว ราดให้ทั่ว ปิดฝาเคี่ยวไฟอ่อนอีก 3 นาที" },
        { step: 5, text: "เร่งเป็นไฟกลางค่อนแรง 2–3 นาทีให้ก้นหม้อเกิดข้าวกรอบบางๆ หยุดเมื่อมีกลิ่นหอมคั่วก่อนมีกลิ่นไหม้" },
        { step: 6, text: "ตักเนื้อออกมาหั่น ใส่กลับพร้อมต้นหอม ปิดฝาพักนอกเตา 5 นาที แล้วคลุกเบาๆ จากก้นหม้อเพื่อคงชิ้นข้าวกรอบไว้" }
      ]
    },
    tips: {
      en: ["Exact rice-to-water measurement and the 60-minute soak are more reliable than guessing by pot size.", "A clay pot retains heat; move it off the burner as soon as the crisp layer is ready."],
      "zh-hant": ["精確米水比例與 60 分鐘浸泡，比依鍋子大小猜水量可靠。", "砂鍋蓄熱強，飯焦形成後要立即離火。"],
      ja: ["米と水を正確に量り、60分浸水すると鍋の大きさに左右されにくい。", "土鍋は余熱が強いので、おこげができたらすぐ火から外す。"],
      ko: ["냄비 크기를 감으로 맞추기보다 쌀과 물을 정확히 재고 60분 불린다.", "뚝배기는 잔열이 강하므로 누룽지가 생기면 바로 불에서 내린다."],
      th: ["ตวงข้าวกับน้ำให้แม่นและแช่ 60 นาที จะสม่ำเสมอกว่ากะตามขนาดหม้อ", "หม้อดินเก็บความร้อนสูง พอข้าวกรอบได้ที่ให้ยกออกจากเตาทันที"]
    },
    commonMistakes: {
      en: ["Skipping the soak leaves a hard center before the bottom browns.", "Stirring while the rice cooks breaks grains and prevents a cohesive crust."],
      "zh-hant": ["省略浸泡會在鍋底上色前留下硬米心。", "煮飯時攪拌會弄碎米粒，也無法形成完整飯焦。"],
      ja: ["浸水を省くと底が色づく前に米の芯が残る。", "炊飯中に混ぜると米が崩れ、まとまったおこげができない。"],
      ko: ["불림을 생략하면 바닥이 갈색이 되기 전에 쌀 속이 딱딱하다.", "익는 동안 저으면 쌀알이 깨지고 누룽지가 한 덩어리로 생기지 않는다."],
      th: ["ไม่แช่ข้าวจะเหลือไตแข็งก่อนก้นหม้อเป็นสีทอง", "คนระหว่างหุงทำให้เมล็ดแตกและข้าวกรอบเกาะตัวไม่ได้"]
    },
    substitutions: {
      en: [{ from: "cured pork belly (150 g)", to: "thinly sliced Chinese roast pork (150 g)", note: "Add it during the final 3-minute simmer so it does not dry." }, { from: "clay pot", to: "heavy lidded saucepan", note: "Use the same water ratio but monitor the crisp layer closely." }],
      "zh-hant": [{ from: "臘肉（150 公克）", to: "薄切中式叉燒（150 公克）", note: "最後 3 分鐘才加入，避免變乾。" }, { from: "砂鍋", to: "厚底帶蓋小鍋", note: "水量比例相同，但要密切觀察飯焦。" }],
      ja: [{ from: "塩漬け豚バラ肉（150g）", to: "中国叉焼の薄切り（150g）", note: "乾かないよう最後の3分に加える。" }, { from: "土鍋", to: "厚手のふた付き鍋", note: "水分比は同じで、おこげをよく見張る。" }],
      ko: [{ from: "염장 삼겹살(150g)", to: "얇게 썬 중국식 차슈(150g)", note: "마르지 않게 마지막 3분에 넣는다." }, { from: "뚝배기", to: "두꺼운 뚜껑 냄비", note: "물 비율은 같게 하고 누룽지를 주의 깊게 본다." }],
      th: [{ from: "หมูสามชั้นหมักเกลือ (150 กรัม)", to: "หมูแดงจีนหั่นบาง (150 กรัม)", note: "ใส่ช่วงเคี่ยว 3 นาทีสุดท้ายเพื่อไม่ให้แห้ง" }, { from: "หม้อดิน", to: "หม้อก้นหนามีฝา", note: "ใช้อัตราน้ำเท่าเดิมแต่คอยดูข้าวกรอบใกล้ชิด" }]
    },
    storage: {
      en: "Cool rice within 2 hours and refrigerate airtight for up to 3 days. Reheat covered with 15 ml water at medium-low heat until steaming hot; the crust will soften, so crisp it briefly in the pot afterward.",
      "zh-hant": "米飯 2 小時內放涼並密封冷藏最多 3 天。加 15 毫升水後中小火加蓋回熱至冒蒸氣；飯焦會變軟，可再短暫加熱恢復口感。",
      ja: "2時間以内に冷まして密閉冷蔵3日まで。水15mlを加え中弱火でふたをして蒸気が出るまで温める。おこげは柔らかくなるので最後に短く焼き直す。",
      ko: "밥은 2시간 안에 식혀 밀폐 냉장 3일까지 보관한다. 물 15ml를 넣고 중약불에서 덮어 김이 날 때까지 데운다. 누룽지는 부드러워지므로 마지막에 잠깐 다시 굽는다.",
      th: "ทำข้าวให้เย็นภายใน 2 ชั่วโมงและแช่เย็นภาชนะปิดสนิทไม่เกิน 3 วัน เติมน้ำ 15 มล. อุ่นไฟกลางอ่อนปิดฝาจนร้อนมีไอ ข้าวกรอบจะนิ่ม จึงเร่งไฟสั้นๆ ตอนท้ายได้"
    },
    culturalNotes: {
      en: "Clay-pot rice (bo jai fan) is a Cantonese comfort food associated with Hong Kong street stalls and home kitchens; the prized scorched rice layer is called faan ziu and is scraped up to share.",
      "zh-hant": "煲仔飯是粵式家常與香港街頭熟食文化的代表；鍋底珍貴的飯焦常稱「飯焦」，會刮起來分食。",
      ja: "土鍋飯（ボウジャイファン）は広東の家庭料理で、香港の屋台文化とも結びつく。底の香ばしいおこげは分け合う楽しみ。",
      ko: "뚝배기밥(보자이판)은 광둥 가정식이자 홍콩 노점 문화와 연결된 음식이다. 바닥의 귀한 누룽지는 긁어 나눠 먹는다.",
      th: "ข้าวหม้อดินหรือโบไจ๋ฟานเป็นอาหารสบายๆ แบบกวางตุ้งที่ผูกกับแผงอาหารและครัวบ้านฮ่องกง ชั้นข้าวไหม้หอมก้นหม้อเรียกว่าฟ่านเจียวและมักขูดแบ่งกัน"
    },
    sources: [
      { title: "The Woks of Life — Hong Kong Style Clay Pot Rice Bowl", url: "https://thewoksoflife.com/hong-kong-style-clay-pot-rice/" },
      { title: "Omnivore's Cookbook — Claypot Rice (煲仔饭)", url: "https://omnivorescookbook.com/claypot-rice/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: the clay pot itself or a shallow bowl filled with separate glossy rice grains, sliced red-brown Chinese sausage, cured pork belly, ginger, and chopped scallion; show a distinct golden crisp-rice rim at the bottom edge.",
      "zh-hant": "實拍成品視覺規格：以砂鍋或淺碗呈現粒粒分明亮澤米飯，清楚可見紅褐臘腸片、臘肉、薑與碎青蔥；底邊要露出一圈金黃飯焦。",
      ja: "実写完成品の仕様：土鍋または浅鉢に粒が立ったつややかな米を盛り、赤褐色の中国ソーセージ、塩漬け豚、しょうが、刻みねぎを見せる。底の縁には金色のおこげをはっきり見せる。",
      ko: "실사 완성품 사양: 뚝배기나 얕은 그릇에 윤기 나고 흩어진 밥알을 담고 적갈색 중국 소시지, 염장 삼겹살, 생강, 다진 대파를 보인다. 가장자리 바닥에는 선명한 황금 누룽지 층이 있어야 한다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: เสิร์ฟในหม้อดินหรือชามตื้น เห็นเมล็ดข้าวเรียงตัวเงา กุนเชียงจีนสีน้ำตาลแดง หมูหมักเกลือ ขิง และต้นหอมสับชัดเจน ให้เห็นขอบข้าวกรอบสีทองที่ก้นหม้อ"
    }
  },

  {
    id: "beef-chow-fun",
    cuisine: "chinese",
    name: {
      en: "Dry-fried beef chow fun",
      "zh-hant": "乾炒牛河",
      ja: "牛肉の香港風焼きビーフン（牛河）",
      ko: "광둥식 소고기 차우펀",
      th: "ก๋วยเตี๋ยวเส้นใหญ่ผัดเนื้อแบบกวางตุ้ง"
    },
    description: {
      en: "Wide rice noodles seared with velveted flank steak, bean sprouts, ginger, scallion, and dark-soy seasoning over very high heat.",
      "zh-hant": "寬河粉與滑嫩牛腹肉、豆芽、薑、青蔥及老抽調味，以大火炒出鑊氣。",
      ja: "幅広の米麺を片栗粉でやわらかくした牛肉、もやし、しょうが、ねぎと強火で炒め、濃口しょうゆで香りをつけます。",
      ko: "넓은 쌀국수를 전분으로 부드럽게 한 소고기, 숙주, 생강, 대파와 센 불에 볶고 진간장으로 풍미를 냅니다.",
      th: "เส้นใหญ่ผัดไฟแรงกับเนื้อหมักให้นุ่ม ถั่วงอก ขิง ต้นหอม และซีอิ๊วดำจนมีกลิ่นกระทะ"
    },
    prep: "PT40M",
    cook: "PT10M",
    total: "PT50M",
    yield: {
      en: "4 servings",
      "zh-hant": "4 份",
      ja: "4人分",
      ko: "4인분",
      th: "4 ที่"
    },
    servings: 4,
    ingredients: {
      en: [
        { item: "flank steak, sliced across the grain 3 mm thick", amount: "280 g" },
        { item: "water for the beef marinade", amount: "20 ml" },
        { item: "baking soda", amount: "1 g" },
        { item: "cornstarch", amount: "5 g" },
        { item: "oyster sauce", amount: "10 ml" },
        { item: "Shaoxing wine", amount: "10 ml" },
        { item: "light soy sauce", amount: "5 ml" },
        { item: "fresh wide rice noodles", amount: "340 g" },
        { item: "neutral oil", amount: "45 ml" },
        { item: "scallions, split and cut into 7.5 cm pieces", amount: "80 g" },
        { item: "ginger, thinly sliced", amount: "15 g" },
        { item: "fresh mung bean sprouts", amount: "150 g" },
        { item: "Shaoxing wine for the wok", amount: "30 ml" },
        { item: "light soy sauce for the wok", amount: "30 ml" },
        { item: "dark soy sauce", amount: "10 ml" },
        { item: "sesame oil", amount: "5 ml" },
        { item: "granulated sugar", amount: "2 g" },
        { item: "white pepper", amount: "0.5 g" }
      ],
      "zh-hant": [
        { item: "牛腹肉，逆紋切 3 毫米薄片", amount: "280 公克" },
        { item: "牛肉醃料用水", amount: "20 毫升" },
        { item: "小蘇打", amount: "1 公克" },
        { item: "玉米粉", amount: "5 公克" },
        { item: "蠔油", amount: "10 毫升" },
        { item: "紹興酒", amount: "10 毫升" },
        { item: "淡醬油", amount: "5 毫升" },
        { item: "新鮮寬河粉", amount: "340 公克" },
        { item: "中性油", amount: "45 毫升" },
        { item: "青蔥，剖半切 7.5 公分段", amount: "80 公克" },
        { item: "薑，薄片", amount: "15 公克" },
        { item: "新鮮綠豆芽", amount: "150 公克" },
        { item: "炒鍋用紹興酒", amount: "30 毫升" },
        { item: "炒鍋用淡醬油", amount: "30 毫升" },
        { item: "老抽", amount: "10 毫升" },
        { item: "芝麻油", amount: "5 毫升" },
        { item: "砂糖", amount: "2 公克" },
        { item: "白胡椒粉", amount: "0.5 公克" }
      ],
      ja: [
        { item: "牛フランク（繊維を断つ3mm薄切り）", amount: "280g" },
        { item: "牛肉下味用の水", amount: "20ml" },
        { item: "重曹", amount: "1g" },
        { item: "コーンスターチ", amount: "5g" },
        { item: "オイスターソース", amount: "10ml" },
        { item: "紹興酒", amount: "10ml" },
        { item: "薄口しょうゆ", amount: "5ml" },
        { item: "生の幅広米麺", amount: "340g" },
        { item: "無味の油", amount: "45ml" },
        { item: "青ねぎ（割って7.5cm）", amount: "80g" },
        { item: "しょうが（薄切り）", amount: "15g" },
        { item: "緑豆もやし", amount: "150g" },
        { item: "炒め用紹興酒", amount: "30ml" },
        { item: "炒め用薄口しょうゆ", amount: "30ml" },
        { item: "濃口しょうゆ", amount: "10ml" },
        { item: "ごま油", amount: "5ml" },
        { item: "グラニュー糖", amount: "2g" },
        { item: "白こしょう", amount: "0.5g" }
      ],
      ko: [
        { item: "플랭크 스테이크, 결 반대로 3mm 썬 것", amount: "280g" },
        { item: "소고기 밑간용 물", amount: "20ml" },
        { item: "베이킹소다", amount: "1g" },
        { item: "옥수수전분", amount: "5g" },
        { item: "굴소스", amount: "10ml" },
        { item: "샤오싱주", amount: "10ml" },
        { item: "양조간장", amount: "5ml" },
        { item: "생 넓은 쌀국수", amount: "340g" },
        { item: "중성유", amount: "45ml" },
        { item: "대파, 세로로 갈라 7.5cm", amount: "80g" },
        { item: "생강, 얇게 썬 것", amount: "15g" },
        { item: "숙주", amount: "150g" },
        { item: "볶음용 샤오싱주", amount: "30ml" },
        { item: "볶음용 양조간장", amount: "30ml" },
        { item: "진간장", amount: "10ml" },
        { item: "참기름", amount: "5ml" },
        { item: "설탕", amount: "2g" },
        { item: "흰 후추", amount: "0.5g" }
      ],
      th: [
        { item: "เนื้อสเต๊กส่วนข้างหั่นขวางเส้นหนา 3 มม.", amount: "280 กรัม" },
        { item: "น้ำสำหรับหมักเนื้อ", amount: "20 มล." },
        { item: "เบกกิ้งโซดา", amount: "1 กรัม" },
        { item: "แป้งข้าวโพด", amount: "5 กรัม" },
        { item: "ซอสหอยนางรม", amount: "10 มล." },
        { item: "เหล้าจีนเส้าซิง", amount: "10 มล." },
        { item: "ซีอิ๊วขาว", amount: "5 มล." },
        { item: "เส้นใหญ่สด", amount: "340 กรัม" },
        { item: "น้ำมันรสกลาง", amount: "45 มล." },
        { item: "ต้นหอมผ่าครึ่งหั่นยาว 7.5 ซม.", amount: "80 กรัม" },
        { item: "ขิงหั่นบาง", amount: "15 กรัม" },
        { item: "ถั่วงอกสด", amount: "150 กรัม" },
        { item: "เหล้าจีนสำหรับผัด", amount: "30 มล." },
        { item: "ซีอิ๊วขาวสำหรับผัด", amount: "30 มล." },
        { item: "ซีอิ๊วดำ", amount: "10 มล." },
        { item: "น้ำมันงา", amount: "5 มล." },
        { item: "น้ำตาลทราย", amount: "2 กรัม" },
        { item: "พริกไทยขาว", amount: "0.5 กรัม" }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Mix beef with water, baking soda, cornstarch, oyster sauce, Shaoxing wine, and soy. Massage 2 minutes until tacky, cover, and marinate 30 minutes." },
        { step: 2, text: "Separate chilled noodles gently; if stiff, loosen them in 80°C water for 30 seconds and drain completely. Mix the wok soy sauces, wine, sesame oil, sugar, and pepper." },
        { step: 3, text: "Heat a wok over high heat until a drop of water evaporates instantly. Add 15 ml oil and sear beef in one layer for 60–90 seconds per side; remove when browned and just 80% cooked." },
        { step: 4, text: "Wipe out burnt bits, return wok to high heat, add 30 ml oil, and stir-fry ginger and scallion for 30 seconds until aromatic." },
        { step: 5, text: "Add noodles and toss with a lifting motion for 2 minutes. Pour wok sauce around the hot sides and stir-fry another 1–2 minutes; noodles should be hot, separate, and lightly charred." },
        { step: 6, text: "Return beef, add bean sprouts, and toss 45–60 seconds. Stop when sprouts remain crisp and beef reaches 63°C; serve immediately for wok hei." }
      ],
      "zh-hant": [
        { step: 1, text: "牛肉與水、小蘇打、玉米粉、蠔油、紹興酒及淡醬油拌勻，按摩 2 分鐘至黏稠，覆蓋醃 30 分鐘。" },
        { step: 2, text: "輕輕分開冷藏河粉；若太硬，以 80°C 水泡 30 秒後完全瀝乾。將炒鍋用醬油、酒、芝麻油、砂糖與白胡椒混合。" },
        { step: 3, text: "炒鍋大火加熱至滴水立即蒸發，加入 15 毫升油，牛肉平鋪每面煎 60–90 秒至上色、約八成熟，取出。" },
        { step: 4, text: "擦掉焦黑碎屑，炒鍋回大火加 30 毫升油，薑與青蔥炒 30 秒至出香。" },
        { step: 5, text: "加入河粉，以提起翻動的方式炒 2 分鐘；沿鍋邊倒入醬汁，再炒 1–2 分鐘，河粉應熱透、分明並帶些焦香。" },
        { step: 6, text: "牛肉回鍋，加入豆芽拌炒 45–60 秒；豆芽仍脆、牛肉達 63°C 就停火，立即上桌保留鑊氣。" }
      ],
      ja: [
        { step: 1, text: "牛肉に水、重曹、コーンスターチ、オイスターソース、紹興酒、しょうゆを混ぜ、2分揉んでねばりを出す。覆って30分漬ける。" },
        { step: 2, text: "冷たい米麺をそっとほぐす。硬ければ80℃の湯に30秒通し、完全に水を切る。しょうゆ、酒、ごま油、砂糖、こしょうを混ぜる。" },
        { step: 3, text: "水滴が瞬時に消えるまで強火で鍋を熱す。油15mlを入れ牛肉を一層に並べ、片面60～90秒ずつ焼き色をつけ、8割火が通ったら取り出す。" },
        { step: 4, text: "焦げた粒を拭き、強火に戻して油30ml。しょうがとねぎを30秒炒めて香りを出す。" },
        { step: 5, text: "麺を加え、持ち上げるように2分炒める。鍋肌からたれを回し、さらに1～2分。麺が熱く一本ずつほぐれ、軽く焼ければよい。" },
        { step: 6, text: "牛肉を戻し、もやしを加えて45～60秒炒める。もやしの歯ごたえを残し、牛肉が63℃になったらすぐ盛る。" }
      ],
      ko: [
        { step: 1, text: "소고기에 물, 베이킹소다, 전분, 굴소스, 샤오싱주, 간장을 섞고 2분 주물러 끈기를 낸다. 덮어 30분 재운다." },
        { step: 2, text: "차가운 생 쌀국수를 조심히 분리한다. 뻣뻣하면 80°C 물에 30초 풀고 완전히 물기를 뺀다. 볶음용 간장, 술, 참기름, 설탕, 후추를 섞는다." },
        { step: 3, text: "웍을 센 불로 달궈 물방울이 즉시 증발하게 한다. 기름 15ml를 넣고 소고기를 한 겹으로 60–90초씩 구워 갈색을 내고 80% 익으면 뺀다." },
        { step: 4, text: "탄 부스러기를 닦고 센 불로 돌아와 기름 30ml를 넣는다. 생강과 대파를 30초 볶아 향을 낸다." },
        { step: 5, text: "면을 넣어 들어 올리듯 2분 볶는다. 뜨거운 웍 가장자리에 소스를 둘러 넣고 1–2분 더 볶아 면이 뜨겁고 서로 붙지 않으며 살짝 그을리게 한다." },
        { step: 6, text: "소고기를 돌려 넣고 숙주를 넣어 45–60초 볶는다. 숙주가 아삭하고 소고기 중심이 63°C가 되면 즉시 낸다." }
      ],
      th: [
        { step: 1, text: "คลุกเนื้อกับน้ำ เบกกิ้งโซดา แป้งข้าวโพด ซอสหอยนางรม เหล้าจีน และซีอิ๊ว นวด 2 นาทีจนเหนียว ปิดฝาหมัก 30 นาที" },
        { step: 2, text: "แยกเส้นสดที่เย็นอย่างเบามือ ถ้าแข็งให้นำลงน้ำ 80°C 30 วินาทีแล้วสะเด็ดให้แห้ง ผสมซีอิ๊ว เหล้าจีน น้ำมันงา น้ำตาล และพริกไทยสำหรับผัด" },
        { step: 3, text: "ตั้งกระทะไฟแรงจนหยดน้ำระเหยทันที ใส่น้ำมัน 15 มล. จี่เนื้อชั้นเดียวด้านละ 60–90 วินาทีจนเป็นสีน้ำตาลและสุกประมาณ 80% ตักออก" },
        { step: 4, text: "เช็ดเศษไหม้ ตั้งกระทะไฟแรง ใส่น้ำมัน 30 มล. ผัดขิงและต้นหอม 30 วินาทีจนหอม" },
        { step: 5, text: "ใส่เส้น ผัดโดยยกพลิก 2 นาที ราดซอสที่ขอบกระทะร้อน ผัดต่อ 1–2 นาทีจนเส้นร้อน แยกตัว และมีรอยเกรียมนิดๆ" },
        { step: 6, text: "ใส่เนื้อกลับและถั่วงอก ผัด 45–60 วินาที หยุดเมื่อถั่วงอกยังกรอบและเนื้อถึง 63°C เสิร์ฟทันทีให้ได้กลิ่นกระทะ" }
      ]
    },
    tips: {
      en: ["Cook in batches if the wok is small; a single layer is what creates browning.", "Fresh noodles should be dry on the surface before they touch the wok."],
      "zh-hant": ["炒鍋較小就分批炒，牛肉平鋪才能上色。", "新鮮河粉入鍋前表面要乾爽，才不會黏成團。"],
      ja: ["鍋が小さければ分けて炒め、一層にすると焼き色がつく。", "生麺は表面を乾かしてから鍋に入れると固まらない。"],
      ko: ["웍이 작으면 나누어 볶아야 고기를 한 겹으로 굽고 갈변시킬 수 있다.", "생면은 표면을 말린 뒤 넣어야 서로 달라붙지 않는다."],
      th: ["ถ้ากระทะเล็กให้ผัดเป็นชุด เนื้อชั้นเดียวจึงเกรียมได้", "เช็ดเส้นสดให้ผิวแห้งก่อนลงกระทะ จะไม่จับกันเป็นก้อน"]
    },
    commonMistakes: {
      en: ["Cold or damp noodles steam instead of searing and turn gummy.", "Constant stirring tears wide noodles; lift and turn with a spatula."],
      "zh-hant": ["冰冷或潮濕河粉會被蒸煮，口感黏糊。", "不停攪拌會扯斷寬河粉，應用鏟子提起翻動。"],
      ja: ["冷たく湿った麺は焼けず蒸れて、ねばつく。", "混ぜ続けると幅広麺が切れるので、ヘラで持ち上げて返す。"],
      ko: ["차갑고 젖은 면은 볶이지 않고 쪄져 질척해진다.", "계속 저으면 넓은 면이 찢어지므로 주걱으로 들어 뒤집는다."],
      th: ["เส้นเย็นหรือเปียกจะนึ่งแทนการผัดและเหนียวเละ", "คนตลอดเวลาทำให้เส้นใหญ่ขาด ให้ใช้ตะหลิวตักยกพลิก"]
    },
    substitutions: {
      en: [{ from: "fresh wide rice noodles (340 g)", to: "dried wide rice sticks (225 g)", note: "Soak according to package directions, then drain very dry." }, { from: "oyster sauce (10 ml)", to: "mushroom stir-fry sauce (10 ml)", note: "Use for a vegetarian marinade with tofu or seitan." }],
      "zh-hant": [{ from: "新鮮寬河粉（340 公克）", to: "乾寬米粉（225 公克）", note: "依包裝浸泡後瀝到完全乾爽。" }, { from: "蠔油（10 毫升）", to: "香菇素蠔油（10 毫升）", note: "搭配豆腐或麵筋即可做素食醃料。" }],
      ja: [{ from: "生の幅広米麺（340g）", to: "乾燥幅広ライススティック（225g）", note: "表示通り戻し、十分に水を切る。" }, { from: "オイスターソース（10ml）", to: "きのこ炒めソース（10ml）", note: "豆腐やセイタンのベジタリアン下味に使う。" }],
      ko: [{ from: "생 넓은 쌀국수(340g)", to: "건조 넓은 쌀면(225g)", note: "포장 지침대로 불린 뒤 아주 잘 말린다." }, { from: "굴소스(10ml)", to: "버섯 볶음소스(10ml)", note: "두부나 세이탄을 재우면 채식으로 만들 수 있다." }],
      th: [{ from: "เส้นใหญ่สด (340 กรัม)", to: "เส้นข้าวกว้างแห้ง (225 กรัม)", note: "แช่ตามฉลากแล้วสะเด็ดให้แห้งมาก" }, { from: "ซอสหอยนางรม (10 มล.)", to: "ซอสผัดเห็ด (10 มล.)", note: "ใช้หมักเต้าหู้หรือเซตันสำหรับสูตรมังสวิรัติ" }]
    },
    storage: {
      en: "Serve immediately. Refrigerate leftovers in a shallow airtight container for up to 2 days; reheat once in a hot oiled wok for 2–3 minutes, adding 5 ml water only if the noodles are dry.",
      "zh-hant": "請立即食用。剩河粉放淺密封盒冷藏最多 2 天；以熱油鍋一次回炒 2–3 分鐘，只有太乾時才加 5 毫升水。",
      ja: "出来たてを食べる。残りは浅い密閉容器で冷蔵2日まで。油を熱した鍋で2～3分一度だけ温め、乾いていれば水5mlを足す。",
      ko: "완성 즉시 먹는다. 남은 면은 얕은 밀폐 용기에 담아 냉장 2일까지 보관하고 기름을 두른 뜨거운 웍에서 2–3분 한 번만 데운다. 너무 마르면 물 5ml를 넣는다.",
      th: "เสิร์ฟทันที เก็บที่เหลือในกล่องตื้นปิดสนิทแช่เย็นได้ 2 วัน อุ่นครั้งเดียวในกระทะร้อนใส่น้ำมัน 2–3 นาที เติมน้ำ 5 มล. เฉพาะเมื่อเส้นแห้ง"
    },
    culturalNotes: {
      en: "Gān chǎo niú hé is a Cantonese classic whose defining quality is wok hei—fragrant seared flavor from a very hot wok and quick tossing. ‘Dry-fried’ means no gravy, not dry noodles.",
      "zh-hant": "乾炒牛河是粵菜經典，重點在高溫快炒產生的鑊氣；「乾炒」是沒有芡汁，並不是把河粉炒乾。",
      ja: "乾炒牛河は広東料理の定番で、高温の鍋と素早い返しによる鍋気が要。乾炒はあんがない意味で、麺を乾かす意味ではない。",
      ko: "간초우응아우호(건초우뉴허)는 센 불과 빠른 뒤집기로 생기는 웍헤이가 핵심인 광둥 요리다. ‘건볶음’은 국물이 없다는 뜻이지 면을 말린다는 뜻이 아니다.",
      th: "กานเฉ่าหนิวเหอเป็นคลาสสิกกวางตุ้ง จุดเด่นคือกลิ่นกระทะจากไฟแรงและการพลิกเร็ว คำว่าแห้งหมายถึงไม่มีน้ำราด ไม่ใช่ทำให้เส้นแห้ง"
    },
    sources: [
      { title: "The Woks of Life — Beef Chow Fun: The Traditional Cantonese Way", url: "https://thewoksoflife.com/beef-chow-fun-noodles/" },
      { title: "Omnivore's Cookbook — Beef Chow Fun (干炒牛河)", url: "https://omnivorescookbook.com/beef-chow-fun/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: a dark oval plate of glossy, intact wide noodles with browned beef ribbons, crisp pale bean sprouts, ginger slivers, and scallion sections visibly distributed; no gravy pooling underneath.",
      "zh-hant": "實拍成品視覺規格：深色橢圓盤盛有光澤且完整的寬河粉，牛肉片帶焦色，清楚可見脆嫩豆芽、薑絲與青蔥段；底部不可有湯汁積水。",
      ja: "実写完成品の仕様：濃色の楕円皿に切れずにつやのある幅広麺を盛り、焼き色の牛肉、白く歯ごたえのあるもやし、しょうが、ねぎを均等に見せる。皿に汁だまりは作らない。",
      ko: "실사 완성품 사양: 짙은 타원 접시에 윤기 있고 끊어지지 않은 넓은 면, 갈색으로 구운 소고기 띠, 아삭한 숙주, 생강채, 대파 조각이 고르게 보인다. 밑에 국물이 고이지 않는다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: จานรีสีเข้มใส่เส้นใหญ่เงาไม่ขาด เนื้อวัวเป็นริ้วมีรอยเกรียม ถั่วงอกสีอ่อนกรอบ ขิงซอย และต้นหอมกระจายให้เห็นชัด ห้ามมีน้ำขังใต้จาน"
    }
  },

  {
    id: "wonton-soup",
    cuisine: "chinese",
    name: {
      en: "Pork-and-shrimp wonton soup",
      "zh-hant": "鮮肉蝦雲吞湯",
      ja: "豚肉とえびのワンタンスープ",
      ko: "돼지고기·새우 완탕 수프",
      th: "เกี๊ยวน้ำหมูและกุ้ง"
    },
    description: {
      en: "Silky square wontons filled with pork, shrimp, ginger, and scallion, served in a clear sesame-scented chicken broth with bok choy.",
      "zh-hant": "方形薄皮包入豬肉、蝦、薑與青蔥的滑嫩雲吞，搭配芝麻香清雞湯與青江菜。",
      ja: "豚肉、えび、しょうが、ねぎを包んだなめらかなワンタンを、香ばしいごま油の鶏スープと青梗菜でいただきます。",
      ko: "돼지고기, 새우, 생강, 대파를 얇은 사각 피에 싸서 참기름 향 닭육수와 청경채로 낸 완탕입니다.",
      th: "เกี๊ยวแผ่นบางไส้หมู กุ้ง ขิง และต้นหอม เสิร์ฟในน้ำซุปไกสใสหอมงาพร้อมผักกวางตุ้ง"
    },
    prep: "PT1H",
    cook: "PT10M",
    total: "PT1H10M",
    yield: {
      en: "4 main-course bowls (40 wontons)",
      "zh-hant": "4 碗主餐（40 顆雲吞）",
      ja: "主菜4杯分（ワンタン40個）",
      ko: "주식 4그릇(완탕 40개)",
      th: "4 ชามเป็นมื้อหลัก (เกี๊ยว 40 ชิ้น)"
    },
    servings: 4,
    ingredients: {
      en: [
        { item: "square wonton wrappers", amount: "40 sheets (about 320 g)" },
        { item: "ground pork", amount: "225 g" },
        { item: "peeled shrimp, finely chopped", amount: "225 g" },
        { item: "ginger, finely minced", amount: "15 g" },
        { item: "scallion, finely chopped", amount: "30 g" },
        { item: "light soy sauce", amount: "15 ml" },
        { item: "Shaoxing wine", amount: "30 ml" },
        { item: "sesame oil for filling", amount: "30 ml" },
        { item: "fine salt", amount: "3 g" },
        { item: "chicken stock", amount: "1.5 L" },
        { item: "light soy sauce for broth", amount: "40 ml" },
        { item: "ginger for broth", amount: "15 g" },
        { item: "sesame oil for broth", amount: "20 ml" },
        { item: "white pepper", amount: "1 g" },
        { item: "baby bok choy", amount: "300 g" },
        { item: "water for sealing wrappers", amount: "30 ml" },
        { item: "scallion for garnish", amount: "20 g" }
      ],
      "zh-hant": [
        { item: "方形雲吞皮", amount: "40 張（約 320 公克）" },
        { item: "豬絞肉", amount: "225 公克" },
        { item: "去殼蝦仁，切細", amount: "225 公克" },
        { item: "薑末", amount: "15 公克" },
        { item: "青蔥末", amount: "30 公克" },
        { item: "淡醬油", amount: "15 毫升" },
        { item: "紹興酒", amount: "30 毫升" },
        { item: "餡料用芝麻油", amount: "30 毫升" },
        { item: "細鹽", amount: "3 公克" },
        { item: "雞高湯", amount: "1.5 公升" },
        { item: "湯用淡醬油", amount: "40 毫升" },
        { item: "湯用薑片", amount: "15 公克" },
        { item: "湯用芝麻油", amount: "20 毫升" },
        { item: "白胡椒粉", amount: "1 公克" },
        { item: "小白菜／青江菜", amount: "300 公克" },
        { item: "封口用水", amount: "30 毫升" },
        { item: "裝飾用青蔥", amount: "20 公克" }
      ],
      ja: [
        { item: "正方形ワンタンの皮", amount: "40枚（約320g）" },
        { item: "豚ひき肉", amount: "225g" },
        { item: "むきえび（細かく刻む）", amount: "225g" },
        { item: "しょうが（みじん切り）", amount: "15g" },
        { item: "青ねぎ（みじん切り）", amount: "30g" },
        { item: "薄口しょうゆ", amount: "15ml" },
        { item: "紹興酒", amount: "30ml" },
        { item: "あん用ごま油", amount: "30ml" },
        { item: "細塩", amount: "3g" },
        { item: "鶏がらスープ", amount: "1.5L" },
        { item: "スープ用薄口しょうゆ", amount: "40ml" },
        { item: "スープ用しょうが", amount: "15g" },
        { item: "スープ用ごま油", amount: "20ml" },
        { item: "白こしょう", amount: "1g" },
        { item: "チンゲンサイ（小）", amount: "300g" },
        { item: "皮を閉じる水", amount: "30ml" },
        { item: "飾り用青ねぎ", amount: "20g" }
      ],
      ko: [
        { item: "사각 완탕피", amount: "40장(약 320g)" },
        { item: "다진 돼지고기", amount: "225g" },
        { item: "껍질 벗긴 새우, 잘게 다진 것", amount: "225g" },
        { item: "생강 다진 것", amount: "15g" },
        { item: "대파 다진 것", amount: "30g" },
        { item: "양조간장", amount: "15ml" },
        { item: "샤오싱주", amount: "30ml" },
        { item: "소용 참기름", amount: "30ml" },
        { item: "고운 소금", amount: "3g" },
        { item: "닭 육수", amount: "1.5L" },
        { item: "국물용 양조간장", amount: "40ml" },
        { item: "국물용 생강", amount: "15g" },
        { item: "국물용 참기름", amount: "20ml" },
        { item: "흰 후추", amount: "1g" },
        { item: "어린 청경채", amount: "300g" },
        { item: "피를 붙일 물", amount: "30ml" },
        { item: "고명용 대파", amount: "20g" }
      ],
      th: [
        { item: "แผ่นเกี๊ยวสี่เหลี่ยม", amount: "40 แผ่น (ประมาณ 320 กรัม)" },
        { item: "หมูบด", amount: "225 กรัม" },
        { item: "กุ้งปอกเปลือกสับละเอียด", amount: "225 กรัม" },
        { item: "ขิงสับละเอียด", amount: "15 กรัม" },
        { item: "ต้นหอมสับละเอียด", amount: "30 กรัม" },
        { item: "ซีอิ๊วขาว", amount: "15 มล." },
        { item: "เหล้าจีนเส้าซิง", amount: "30 มล." },
        { item: "น้ำมันงาสำหรับไส้", amount: "30 มล." },
        { item: "เกลือป่น", amount: "3 กรัม" },
        { item: "น้ำสต๊อกไก่", amount: "1.5 ลิตร" },
        { item: "ซีอิ๊วขาวสำหรับน้ำซุป", amount: "40 มล." },
        { item: "ขิงสำหรับน้ำซุป", amount: "15 กรัม" },
        { item: "น้ำมันงาสำหรับน้ำซุป", amount: "20 มล." },
        { item: "พริกไทยขาว", amount: "1 กรัม" },
        { item: "ผักกวางตุ้งฮ่องเต้", amount: "300 กรัม" },
        { item: "น้ำสำหรับแตะแผ่นเกี๊ยว", amount: "30 มล." },
        { item: "ต้นหอมสำหรับโรย", amount: "20 กรัม" }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Mix pork, shrimp, ginger, scallion, soy, Shaoxing wine, sesame oil, and salt in one direction for 3 minutes until sticky and cohesive; refrigerate 15 minutes." },
        { step: 2, text: "Place 10 g filling in each wrapper. Moisten the edges with water, fold into a triangle, press out air, then bring the two lower corners together; keep finished wontons covered." },
        { step: 3, text: "Warm stock, broth soy, ginger, sesame oil, and white pepper in a saucepan over medium heat to 85–90°C; hold at a bare simmer, never a rolling boil." },
        { step: 4, text: "Bring a separate pot of 2 L water to a boil over high heat. Blanch bok choy for 60–90 seconds until bright and just tender; drain." },
        { step: 5, text: "Cook wontons in batches at a gentle boil for 3–5 minutes. They should float, wrappers look semi-transparent, and pork/shrimp center reach 74°C; scoop out immediately." },
        { step: 6, text: "Divide wontons and bok choy among bowls, pour over hot broth, scatter scallion, and serve within 5 minutes so wrappers stay silky." }
      ],
      "zh-hant": [
        { step: 1, text: "豬肉、蝦、薑、青蔥、淡醬油、紹興酒、芝麻油與鹽朝同一方向攪拌 3 分鐘，直到黏稠成團；冷藏 15 分鐘。" },
        { step: 2, text: "每張皮放 10 公克餡料，邊緣沾水，對折成三角形並壓出空氣，再將下方兩角捏合；包好的雲吞覆蓋保濕。" },
        { step: 3, text: "小鍋以中火將高湯、湯用醬油、薑、芝麻油與白胡椒加熱至 85–90°C，保持微滾，不可大沸。" },
        { step: 4, text: "另一鍋加 2 公升水以大火煮沸。青江菜汆燙 60–90 秒至鮮綠且剛熟，瀝乾。" },
        { step: 5, text: "雲吞分批以微滾水煮 3–5 分鐘；浮起、皮呈半透明且豬蝦餡中心達 74°C 就立即撈起。" },
        { step: 6, text: "碗中分放雲吞與青江菜，倒入熱湯，撒青蔥，5 分鐘內食用以保持皮的滑嫩。" }
      ],
      ja: [
        { step: 1, text: "豚肉、えび、しょうが、ねぎ、しょうゆ、紹興酒、ごま油、塩を同じ方向に3分練り、粘りのあるまとまりにする。冷蔵庫で15分冷やす。" },
        { step: 2, text: "皮1枚にあん10gを置く。縁を水で濡らし三角に折って空気を押し出し、下の二角を合わせる。包んだものは乾かさない。" },
        { step: 3, text: "鍋で鶏スープ、しょうゆ、しょうが、ごま油、白こしょうを中火で85～90℃に温め、煮立てずに保つ。" },
        { step: 4, text: "別鍋に水2Lを強火で沸かす。チンゲンサイを60～90秒ゆで、鮮やかで歯ごたえが残るうちに水を切る。" },
        { step: 5, text: "ワンタンを少量ずつ弱い沸騰で3～5分ゆでる。浮き、皮が半透明になり、豚えびの中心が74℃になったらすぐすくう。" },
        { step: 6, text: "器にワンタンと青梗菜を分け、熱いスープを注ぎ、ねぎを散らす。皮がなめらかなうち5分以内に食べる。" }
      ],
      ko: [
        { step: 1, text: "돼지고기, 새우, 생강, 대파, 간장, 샤오싱주, 참기름, 소금을 한 방향으로 3분 저어 끈기 있는 반죽처럼 만든다. 냉장 15분 둔다." },
        { step: 2, text: "피 한 장에 소 10g을 놓는다. 가장자리에 물을 묻혀 삼각형으로 접고 공기를 누른 뒤 아래 두 모서리를 붙인다. 빚은 완탕은 덮어 둔다." },
        { step: 3, text: "냄비에서 육수, 간장, 생강, 참기름, 흰 후추를 중불로 85–90°C까지 데우고 팔팔 끓이지 않는다." },
        { step: 4, text: "다른 냄비의 물 2L를 센 불로 끓인다. 청경채를 60–90초 데쳐 색이 선명하고 살짝 부드러워지면 건진다." },
        { step: 5, text: "완탕을 나누어 약하게 끓는 물에서 3–5분 삶는다. 떠오르고 피가 반투명하며 돼지고기·새우 중심이 74°C이면 즉시 건진다." },
        { step: 6, text: "그릇에 완탕과 청경채를 나누어 담고 뜨거운 육수를 붓는다. 대파를 뿌려 피가 매끈할 때 5분 안에 낸다." }
      ],
      th: [
        { step: 1, text: "ผสมหมู กุ้ง ขิง ต้นหอม ซีอิ๊ว เหล้าจีน น้ำมันงา และเกลือ คนไปทางเดียวกัน 3 นาทีจนเหนียวจับตัว แช่เย็น 15 นาที" },
        { step: 2, text: "วางไส้ 10 กรัมบนแผ่นเกี๊ยว แตะน้ำที่ขอบ พับเป็นสามเหลี่ยมกดไล่อากาศ แล้วนำมุมล่างสองข้างมาติดกัน คลุมเกี๊ยวที่ห่อแล้วไม่ให้แห้ง" },
        { step: 3, text: "อุ่นน้ำสต๊อก ซีอิ๊ว ขิง น้ำมันงา และพริกไทยขาวในหม้อด้วยไฟกลางให้ 85–90°C รักษาให้เดือดอ่อน ห้ามเดือดพล่าน" },
        { step: 4, text: "ต้มน้ำ 2 ลิตรในหม้ออีกใบด้วยไฟแรง ลวกผักกวางตุ้ง 60–90 วินาทีจนสีสดและนุ่มพอดี สะเด็ดน้ำ" },
        { step: 5, text: "ต้มเกี๊ยวเป็นชุดๆ ในน้ำเดือดอ่อน 3–5 นาที เมื่อเกี๊ยวลอย แผ่นกึ่งใส และใจกลางไส้หมูกุ้งถึง 74°C ให้ตักขึ้นทันที" },
        { step: 6, text: "แบ่งเกี๊ยวและผักใส่ชาม ราดน้ำซุปร้อน โรยต้นหอม และเสิร์ฟภายใน 5 นาทีเพื่อให้แผ่นยังลื่นนุ่ม" }
      ]
    },
    tips: {
      en: ["Beat the filling in one direction until it becomes a paste; loose filling leaks during boiling.", "Freeze uncooked wontons in a single layer before bagging if making them ahead."],
      "zh-hant": ["餡料朝同一方向打到成膏狀，鬆散的餡會在煮時漏出。", "要提前製作時，生雲吞先單層冷凍，再裝袋保存。"],
      ja: ["あんを一方向に練ってペースト状にすると、ゆで中に漏れにくい。", "作り置きは生ワンタンを一層で凍らせてから袋に移す。"],
      ko: ["소를 한 방향으로 치대 반죽처럼 만들어야 삶을 때 새지 않는다.", "미리 만들 때는 생 완탕을 한 겹으로 먼저 얼린 뒤 봉지에 담는다."],
      th: ["คนไส้ทางเดียวจนเป็นเนื้อเพสต์ ไส้หลวมจะแตกตอนต้ม", "ถ้าทำล่วงหน้าให้แช่แข็งเกี๊ยวดิบเป็นชั้นเดียวก่อนใส่ถุง"]
    },
    commonMistakes: {
      en: ["Overfilling stretches the wrapper and causes split seams.", "A rolling boil knocks delicate wontons apart; keep the pot at a gentle simmer."],
      "zh-hant": ["餡料放太多會撐破雲吞皮。", "大滾水會撞散薄皮，水要維持微滾。"],
      ja: ["あんを詰めすぎると皮が伸び、合わせ目が裂ける。", "激しく沸かすと皮が崩れるので弱い沸騰を保つ。"],
      ko: ["소를 너무 많이 넣으면 피가 늘어나 이음새가 터진다.", "물이 세게 끓으면 얇은 완탕이 풀리므로 약하게 끓인다."],
      th: ["ใส่ไส้มากไปจะดึงแผ่นจนรอยปริแตก", "น้ำเดือดแรงทำให้เกี๊ยวนิ่มแตก ควรต้มเดือดอ่อน"]
    },
    substitutions: {
      en: [{ from: "ground pork (225 g)", to: "ground chicken thigh (225 g)", note: "Cook the center to 74°C." }, { from: "chicken stock (1.5 L)", to: "vegetable stock (1.5 L)", note: "Use mushroom stir-fry sauce in place of oyster-based seasonings." }],
      "zh-hant": [{ from: "豬絞肉（225 公克）", to: "雞腿絞肉（225 公克）", note: "中心須煮至 74°C。" }, { from: "雞高湯（1.5 公升）", to: "蔬菜高湯（1.5 公升）", note: "調味改用香菇素蠔油類醬汁。" }],
      ja: [{ from: "豚ひき肉（225g）", to: "鶏ももひき肉（225g）", note: "中心を74℃まで加熱する。" }, { from: "鶏がらスープ（1.5L）", to: "野菜スープ（1.5L）", note: "オイスター系調味料はきのこソースに替える。" }],
      ko: [{ from: "다진 돼지고기(225g)", to: "다진 닭다리살(225g)", note: "중심을 74°C까지 익힌다." }, { from: "닭 육수(1.5L)", to: "채소 육수(1.5L)", note: "굴 성분 양념은 버섯 볶음소스로 바꾼다." }],
      th: [{ from: "หมูบด (225 กรัม)", to: "ไก่บดส่วนสะโพก (225 กรัม)", note: "ทำให้ใจกลางถึง 74°C" }, { from: "น้ำสต๊อกไก่ (1.5 ลิตร)", to: "น้ำสต๊อกผัก (1.5 ลิตร)", note: "ใช้ซอสผัดเห็ดแทนเครื่องปรุงที่มีหอยนางรม" }]
    },
    storage: {
      en: "Keep uncooked wrapped wontons refrigerated for up to 1 day or freeze in a single layer up to 2 months; boil from frozen for 5–7 minutes. Refrigerate assembled soup for only 1 day because wrappers soften.",
      "zh-hant": "包好的生雲吞冷藏最多 1 天，或單層冷凍最多 2 個月；冷凍狀態直接煮 5–7 分鐘。煮好的雲吞湯只冷藏 1 天，否則皮會軟爛。",
      ja: "包んだ生ワンタンは冷蔵1日、または一層で冷凍2か月まで。凍ったまま5～7分ゆでる。完成したスープは皮が柔らかくなるため冷蔵1日だけ。",
      ko: "빚은 생 완탕은 냉장 1일, 한 겹으로 냉동 2개월까지 보관하고 얼린 채 5–7분 삶는다. 완성한 완탕 수프는 피가 불므로 냉장 1일만 둔다.",
      th: "เกี๊ยวดิบที่ห่อแล้วแช่เย็นได้ 1 วัน หรือแช่แข็งเป็นชั้นเดียว 2 เดือน ต้มจากแช่แข็ง 5–7 นาที ซุปที่ประกอบแล้วแช่เย็นเพียง 1 วันเพราะแผ่นจะนิ่ม"
    },
    culturalNotes: {
      en: "Wontons have many regional forms; Cantonese versions often use delicate wrappers and clear broth, while northern versions may use more aromatics and shrimp. This bowl combines the classic pork-and-shrimp filling with a simple broth.",
      "zh-hant": "雲吞有許多地方變體；廣式常用薄皮配清湯，北方版本可能加入更多香料與蝦。本碗結合經典豬蝦餡與清簡高湯。",
      ja: "ワンタンには地域差があり、広東風は薄い皮と澄んだスープ、北方風は香味野菜やえびを多く使うことがある。本品は豚えびあんと簡素なスープを組み合わせる。",
      ko: "완탕은 지역별 형태가 다양하다. 광둥식은 얇은 피와 맑은 국물을, 북방식은 향채와 새우를 더 많이 쓰기도 한다. 이 그릇은 돼지고기·새우 소와 담백한 국물을 조합한다.",
      th: "เกี๊ยวมีรูปแบบตามภูมิภาค กวางตุ้งมักใช้แผ่นบางกับน้ำซุปใส ส่วนภาคเหนืออาจใส่เครื่องหอมและกุ้งมากกว่า สูตรนี้รวมไส้หมูกุ้งคลาสสิกกับน้ำซุปเรียบง่าย"
    },
    sources: [
      { title: "The Woks of Life — Simple Wonton Soup", url: "https://thewoksoflife.com/wonton-soup-recipe/" },
      { title: "Omnivore's Cookbook — Wonton Soup", url: "https://omnivorescookbook.com/wonton-soup/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: a deep white bowl with 8–10 plump, semi-translucent wontons in clear golden broth, a whole baby bok choy beside them, ginger threads, and fresh scallion rings floating visibly on top.",
      "zh-hant": "實拍成品視覺規格：深白碗盛 8–10 顆飽滿半透明雲吞與清澈金色湯，旁邊有完整青江菜，表面清楚浮著薑絲與青蔥圈。",
      ja: "実写完成品の仕様：深い白い器に半透明でふっくらしたワンタン8～10個と澄んだ黄金色のスープを入れ、横に青梗菜を置く。しょうがの糸とねぎの輪切りを上に見せる。",
      ko: "실사 완성품 사양: 깊은 흰 그릇에 반투명하고 통통한 완탕 8–10개를 맑은 황금 육수에 담고 옆에 어린 청경채 한 포기를 둔다. 생강채와 대파 링이 위에 보인다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: ชามขาวลึกใส่เกี๊ยวอวบกึ่งใส 8–10 ชิ้นในน้ำซุปสีทองใส วางผักกวางตุ้งฮ่องเต้ทั้งต้นข้างๆ ให้เห็นขิงซอยและต้นหอมวงลอยด้านบน"
    }
  },

  {
    id: "jiaozi",
    cuisine: "chinese",
    name: {
      en: "Northern Chinese pork-and-cabbage jiaozi",
      "zh-hant": "北方豬肉白菜餃子",
      ja: "北方風豚肉と白菜の水餃子",
      ko: "북방식 돼지고기·배추 자오쯔",
      th: "เกี๊ยวจีนเจียวจื่อไส้หมูและกะหล่ำปลีแบบภาคเหนือ"
    },
    description: {
      en: "Hand-pleated wheat dumplings with juicy pork, napa cabbage, ginger, and scallion, boiled and served with vinegar and chili oil.",
      "zh-hant": "手工摺邊的麵皮餃子，包入多汁豬肉、白菜、薑與青蔥，水煮後佐醋與辣油。",
      ja: "小麦の皮で豚肉、白菜、しょうが、ねぎを包み、ゆでて酢とラー油で食べる手包み水餃子です。",
      ko: "밀피에 돼지고기, 배추, 생강, 대파를 넣어 손으로 빚고 삶아 식초와 고추기름을 곁들입니다.",
      th: "เกี๊ยวแป้งสาลีห่อมือไส้หมูฉ่ำ กะหล่ำปลีจีน ขิง และต้นหอม ต้มแล้วจิ้มน้ำส้มสายชูกับน้ำมันพริก"
    },
    prep: "PT1H",
    cook: "PT20M",
    total: "PT1H20M",
    yield: {
      en: "32 dumplings (4 servings)",
      "zh-hant": "32 顆（4 份）",
      ja: "32個（4人分）",
      ko: "32개(4인분)",
      th: "32 ชิ้น (4 ที่)"
    },
    servings: 4,
    ingredients: {
      en: [
        { item: "all-purpose flour", amount: "400 g" },
        { item: "warm water for dough", amount: "210 ml" },
        { item: "fine salt for dough", amount: "2 g" },
        { item: "ground pork", amount: "400 g" },
        { item: "napa cabbage, finely chopped", amount: "300 g" },
        { item: "scallion, finely chopped", amount: "40 g" },
        { item: "ginger, finely minced", amount: "15 g" },
        { item: "light soy sauce", amount: "30 ml" },
        { item: "Shaoxing wine", amount: "15 ml" },
        { item: "sesame oil", amount: "10 ml" },
        { item: "fine salt for filling", amount: "5 g" },
        { item: "white pepper", amount: "1 g" },
        { item: "neutral oil for pan-fry option", amount: "30 ml" },
        { item: "black rice vinegar for dipping", amount: "45 ml" },
        { item: "chili oil for dipping", amount: "15 ml" }
      ],
      "zh-hant": [
        { item: "中筋麵粉", amount: "400 公克" },
        { item: "麵糰用溫水", amount: "210 毫升" },
        { item: "麵糰用細鹽", amount: "2 公克" },
        { item: "豬絞肉", amount: "400 公克" },
        { item: "大白菜，切細", amount: "300 公克" },
        { item: "青蔥末", amount: "40 公克" },
        { item: "薑末", amount: "15 公克" },
        { item: "淡醬油", amount: "30 毫升" },
        { item: "紹興酒", amount: "15 毫升" },
        { item: "芝麻油", amount: "10 毫升" },
        { item: "餡料用細鹽", amount: "5 公克" },
        { item: "白胡椒粉", amount: "1 公克" },
        { item: "煎餃選用中性油", amount: "30 毫升" },
        { item: "沾醬黑米醋", amount: "45 毫升" },
        { item: "沾醬辣油", amount: "15 毫升" }
      ],
      ja: [
        { item: "薄力粉または中力粉", amount: "400g" },
        { item: "皮用のぬるま湯", amount: "210ml" },
        { item: "皮用の細塩", amount: "2g" },
        { item: "豚ひき肉", amount: "400g" },
        { item: "白菜（細かく刻む）", amount: "300g" },
        { item: "青ねぎ（みじん切り）", amount: "40g" },
        { item: "しょうが（みじん切り）", amount: "15g" },
        { item: "薄口しょうゆ", amount: "30ml" },
        { item: "紹興酒", amount: "15ml" },
        { item: "ごま油", amount: "10ml" },
        { item: "あん用の細塩", amount: "5g" },
        { item: "白こしょう", amount: "1g" },
        { item: "焼き餃子用の無味の油", amount: "30ml" },
        { item: "つけだれ用黒米酢", amount: "45ml" },
        { item: "つけだれ用ラー油", amount: "15ml" }
      ],
      ko: [
        { item: "중력분", amount: "400g" },
        { item: "반죽용 따뜻한 물", amount: "210ml" },
        { item: "반죽용 고운 소금", amount: "2g" },
        { item: "다진 돼지고기", amount: "400g" },
        { item: "배추, 잘게 다진 것", amount: "300g" },
        { item: "대파 다진 것", amount: "40g" },
        { item: "생강 다진 것", amount: "15g" },
        { item: "양조간장", amount: "30ml" },
        { item: "샤오싱주", amount: "15ml" },
        { item: "참기름", amount: "10ml" },
        { item: "소용 고운 소금", amount: "5g" },
        { item: "흰 후추", amount: "1g" },
        { item: "군만두 선택용 중성유", amount: "30ml" },
        { item: "찍어 먹을 흑미식초", amount: "45ml" },
        { item: "찍어 먹을 고추기름", amount: "15ml" }
      ],
      th: [
        { item: "แป้งสาลีอเนกประสงค์", amount: "400 กรัม" },
        { item: "น้ำอุ่นสำหรับแป้ง", amount: "210 มล." },
        { item: "เกลือป่นสำหรับแป้ง", amount: "2 กรัม" },
        { item: "หมูบด", amount: "400 กรัม" },
        { item: "กะหล่ำปลีจีนสับละเอียด", amount: "300 กรัม" },
        { item: "ต้นหอมสับละเอียด", amount: "40 กรัม" },
        { item: "ขิงสับละเอียด", amount: "15 กรัม" },
        { item: "ซีอิ๊วขาว", amount: "30 มล." },
        { item: "เหล้าจีนเส้าซิง", amount: "15 มล." },
        { item: "น้ำมันงา", amount: "10 มล." },
        { item: "เกลือป่นสำหรับไส้", amount: "5 กรัม" },
        { item: "พริกไทยขาว", amount: "1 กรัม" },
        { item: "น้ำมันรสกลางสำหรับทอดแบบจี่", amount: "30 มล." },
        { item: "น้ำส้มสายชูข้าวดำสำหรับจิ้ม", amount: "45 มล." },
        { item: "น้ำมันพริกสำหรับจิ้ม", amount: "15 มล." }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Mix flour, dough salt, and warm water into a shaggy dough. Knead 8 minutes until smooth, cover, and rest at room temperature 30 minutes." },
        { step: 2, text: "Salt chopped cabbage with the 5 g filling salt for 10 minutes, squeeze out all visible water, and combine with pork, scallion, ginger, soy, wine, sesame oil, and pepper until sticky." },
        { step: 3, text: "Roll dough into a 3 cm rope, cut 32 pieces, and roll each into an 8 cm round with a slightly thicker rim. Keep rounds covered so they do not dry." },
        { step: 4, text: "Place 15 g filling in each wrapper, pleat and seal firmly with no trapped air. Arrange on a lightly floured tray without touching." },
        { step: 5, text: "For boiled jiaozi, bring 3 L water to a rolling boil over high heat. Add 8–10 dumplings, stir once, and cook 6–8 minutes; they float, skins turn slightly translucent, and the center reaches 74°C." },
        { step: 6, text: "Lift with a slotted spoon and serve with black rice vinegar and chili oil. For pan-fried jiaozi, brown in 15 ml oil over medium-high 2 minutes, add 60 ml water, cover 5 minutes, then uncover 1 minute to crisp." }
      ],
      "zh-hant": [
        { step: 1, text: "中筋麵粉、麵糰用鹽與溫水拌成粗麵糰，揉 8 分鐘至光滑，覆蓋室溫醒 30 分鐘。" },
        { step: 2, text: "白菜加 5 公克餡料鹽醃 10 分鐘，擠出所有可見水分，再與豬肉、青蔥、薑、醬油、酒、芝麻油及白胡椒拌至黏稠。" },
        { step: 3, text: "麵糰搓成直徑 3 公分長條，切 32 段；每段擀成 8 公分圓皮，邊緣略厚。皮要覆蓋防乾。" },
        { step: 4, text: "每張皮放 15 公克餡，摺出褶子並捏緊，不能留空氣；放在薄薄撒粉且互不相碰的托盤。" },
        { step: 5, text: "水餃做法：3 公升水以大火滾沸，放入 8–10 顆後攪一次，煮 6–8 分鐘；餃子浮起、皮略透明且中心達 74°C 即熟。" },
        { step: 6, text: "用漏勺撈出，佐黑米醋與辣油。煎餃做法：中大火以 15 毫升油煎 2 分鐘上色，加 60 毫升水加蓋 5 分鐘，揭蓋再煎 1 分鐘至酥。" }
      ],
      ja: [
        { step: 1, text: "粉、皮用塩、ぬるま湯を混ぜて粗い生地にし、8分こねてなめらかにする。覆って室温で30分休ませる。" },
        { step: 2, text: "刻んだ白菜にあん用塩5gを混ぜ10分置き、見える水分を全て絞る。豚肉、ねぎ、しょうが、しょうゆ、酒、ごま油、こしょうと粘りが出るまで混ぜる。" },
        { step: 3, text: "生地を直径3cmの棒にし32等分する。各片を直径8cmに伸ばし、縁を少し厚くする。乾かさないよう覆う。" },
        { step: 4, text: "皮にあん15gを置き、ひだを寄せて空気を残さず閉じる。薄く粉を振った皿に触れないよう並べる。" },
        { step: 5, text: "水餃子は水3Lを強火で沸騰させ、8～10個ずつ入れて一度混ぜ、6～8分ゆでる。浮き、皮が少し透け、中心74℃なら完成。" },
        { step: 6, text: "穴あき杓子ですくい、黒米酢とラー油で食べる。焼き餃子は油15mlで中強火2分焼き、水60mlを加えふたをして5分、ふたを外し1分焼いてパリッとさせる。" }
      ],
      ko: [
        { step: 1, text: "밀가루, 반죽 소금, 따뜻한 물을 섞어 거친 반죽을 만든다. 8분 치대 매끈하게 한 뒤 덮어 실온 30분 쉰다." },
        { step: 2, text: "다진 배추에 소용 소금 5g을 섞어 10분 두고 보이는 물을 모두 짠다. 돼지고기, 대파, 생강, 간장, 술, 참기름, 후추와 끈기 있게 섞는다." },
        { step: 3, text: "반죽을 지름 3cm 막대로 만들어 32등분한다. 각 조각을 8cm 원으로 밀고 가장자리는 약간 두껍게 한다. 마르지 않게 덮는다." },
        { step: 4, text: "피에 소 15g을 넣고 주름을 잡아 공기 없이 단단히 봉한다. 밀가루를 살짝 뿌린 쟁반에 서로 닿지 않게 둔다." },
        { step: 5, text: "물만두는 물 3L를 센 불로 팔팔 끓이고 8–10개씩 넣어 한 번 저어 6–8분 삶는다. 떠오르고 피가 반투명하며 중심 74°C이면 익은 것이다." },
        { step: 6, text: "건져 흑미식초와 고추기름에 낸다. 군만두는 중강불 기름 15ml에 2분 굽고 물 60ml를 넣어 5분 덮은 뒤 1분 뚜껑 없이 바삭하게 굽는다." }
      ],
      th: [
        { step: 1, text: "ผสมแป้ง เกลือสำหรับแป้ง และน้ำอุ่นเป็นก้อนหยาบ นวด 8 นาทีจนเนียน ปิดฝาพักอุณหภูมิห้อง 30 นาที" },
        { step: 2, text: "คลุกกะหล่ำปลีสับกับเกลือไส้ 5 กรัม พัก 10 นาที บีบน้ำออกให้หมด แล้วผสมกับหมู ต้นหอม ขิง ซีอิ๊ว เหล้าจีน น้ำมันงา และพริกไทยจนเหนียว" },
        { step: 3, text: "คลึงแป้งเป็นเส้นเส้นผ่านศูนย์กลาง 3 ซม. ตัด 32 ชิ้น รีดแต่ละชิ้นเป็นแผ่นกลม 8 ซม. ให้ขอบหนากว่าเล็กน้อย คลุมไม่ให้แห้ง" },
        { step: 4, text: "ใส่ไส้ 15 กรัมบนแผ่น พับจีบและปิดให้แน่นไม่มีอากาศ วางบนถาดโรยแป้งบางๆ โดยไม่ให้แตะกัน" },
        { step: 5, text: "แบบต้ม: ต้มน้ำ 3 ลิตรให้เดือดพล่านด้วยไฟแรง ใส่เกี๊ยว 8–10 ชิ้น คนครั้งเดียว ต้ม 6–8 นาที เมื่อเกี๊ยวลอย แผ่นใสเล็กน้อย และใจกลางถึง 74°C ถือว่าสุก" },
        { step: 6, text: "ตักด้วยกระชอนเสิร์ฟกับน้ำส้มสายชูข้าวดำและน้ำมันพริก แบบจี่กระทะ: จี่ในน้ำมัน 15 มล. ไฟกลางค่อนแรง 2 นาที เติมน้ำ 60 มล. ปิดฝา 5 นาที แล้วเปิดฝาจี่อีก 1 นาทีให้กรอบ" }
      ]
    },
    tips: {
      en: ["Squeeze cabbage very dry; its released water is the main cause of broken wrappers.", "Keep unused dough and wrappers covered with a barely damp towel."],
      "zh-hant": ["白菜一定要擠乾，滲水是餃皮破裂的主要原因。", "未使用的麵糰和餃皮以微濕毛巾覆蓋。"],
      ja: ["白菜をしっかり絞る。出た水分が皮破れの主因になる。", "使わない生地と皮は軽く湿らせた布で覆う。"],
      ko: ["배추 물을 아주 잘 짜야 피가 터지지 않는다.", "쓰지 않는 반죽과 피는 살짝 젖은 행주로 덮어 둔다."],
      th: ["บีบน้ำจากกะหล่ำปลีให้แห้งมาก เพราะน้ำที่ออกมาทำให้แผ่นแตก", "คลุมแป้งและแผ่นที่ยังไม่ใช้ด้วยผ้าชื้นหมาดๆ"]
    },
    commonMistakes: {
      en: ["A thick, uneven wrapper cooks gummy at the seam and tears at the thin side.", "Boiling too many at once drops the water temperature and makes them stick."],
      "zh-hant": ["餃皮擀得厚薄不均會在厚邊黏糊、薄邊破裂。", "一次煮太多會使水溫下降，餃子容易沾底。"],
      ja: ["皮の厚みが不均一だと厚い所がべたつき、薄い所が裂ける。", "一度に入れすぎると湯温が下がり、鍋底にくっつく。"],
      ko: ["피가 고르지 않으면 두꺼운 이음새는 질척하고 얇은 쪽은 터진다.", "한꺼번에 너무 많이 삶으면 물 온도가 내려가 달라붙는다."],
      th: ["แผ่นหนาบางไม่เท่ากันทำให้รอยหนาเหนียวและด้านบางแตก", "ต้มครั้งละมากเกินไปทำให้น้ำเย็นและเกี๊ยวติดก้นหม้อ"]
    },
    substitutions: {
      en: [{ from: "napa cabbage (300 g)", to: "garlic chives (300 g)", note: "Skip salting; mince and squeeze only if visibly wet." }, { from: "pork (400 g)", to: "ground turkey thigh (400 g)", note: "Add 10 ml extra oil and cook the center to 74°C." }],
      "zh-hant": [{ from: "大白菜（300 公克）", to: "韭菜（300 公克）", note: "不用先鹽醃，若出水只需切碎擠乾。" }, { from: "豬肉（400 公克）", to: "火雞腿絞肉（400 公克）", note: "多加 10 毫升油，中心煮至 74°C。" }],
      ja: [{ from: "白菜（300g）", to: "にら（300g）", note: "塩もみせず、濡れていれば刻んで絞る。" }, { from: "豚肉（400g）", to: "七面鳥ももひき肉（400g）", note: "油を10ml足し、中心74℃まで加熱する。" }],
      ko: [{ from: "배추(300g)", to: "부추(300g)", note: "소금에 절이지 말고 젖었을 때만 다져 짠다." }, { from: "돼지고기(400g)", to: "칠면조 다리살 간 것(400g)", note: "기름 10ml를 더하고 중심 74°C까지 익힌다." }],
      th: [{ from: "กะหล่ำปลีจีน (300 กรัม)", to: "กุยช่าย (300 กรัม)", note: "ไม่ต้องคลุกเกลือ สับและบีบเฉพาะเมื่อมีน้ำมาก" }, { from: "หมู (400 กรัม)", to: "ไก่งวงบดส่วนสะโพก (400 กรัม)", note: "เพิ่มน้ำมัน 10 มล. และทำใจกลางถึง 74°C" }]
    },
    storage: {
      en: "Freeze uncooked dumplings on a floured tray until solid, then bag airtight for up to 2 months. Boil from frozen 8–10 minutes; refrigerate cooked dumplings up to 2 days and reheat in a covered pan.",
      "zh-hant": "生餃子在撒粉托盤上單層冷凍至硬，再密封裝袋最多 2 個月。冷凍直接煮 8–10 分鐘；熟餃子冷藏最多 2 天，以加蓋平底鍋回熱。",
      ja: "生餃子は粉を振った皿で固まるまで一層冷凍し、密閉袋で2か月まで。凍ったまま8～10分ゆでる。ゆでた餃子は冷蔵2日、ふた付きフライパンで温める。",
      ko: "생만두는 밀가루 뿌린 쟁반에 한 겹으로 단단히 얼린 뒤 밀폐해 2개월 보관한다. 얼린 채 8–10분 삶고 익힌 만두는 냉장 2일까지 덮은 팬에서 데운다.",
      th: "แช่แข็งเกี๊ยวดิบบนถาดโรยแป้งชั้นเดียวจนแข็ง แล้วใส่ถุงปิดสนิทได้ 2 เดือน ต้มจากแช่แข็ง 8–10 นาที เกี๊ยวสุกแช่เย็นได้ 2 วันและอุ่นในกระทะปิดฝา"
    },
    culturalNotes: {
      en: "Jiaozi are especially associated with northern Chinese family gatherings and Lunar New Year; their folded ingot-like shape is often read as a wish for prosperity. Boiled, steamed, and pan-fried forms all belong to the dumpling tradition.",
      "zh-hant": "餃子尤其與中國北方家庭聚會及農曆新年相連；元寶般的摺形常被寄寓招財意涵。水餃、蒸餃與煎餃都屬餃子傳統。",
      ja: "餃子は中国北方の家族行事や春節と深く結びつき、元宝に似た形は繁栄の願いとされる。水餃子、蒸し餃子、焼き餃子はいずれも伝統の形。",
      ko: "자오쯔는 중국 북방의 가족 모임과 춘절에 특히 연관되며, 주괴를 닮은 모양은 번영의 바람으로 해석된다. 물만두·찐만두·군만두 모두 이 전통에 속한다.",
      th: "เจียวจื่อผูกพันกับการรวมญาติภาคเหนือของจีนและเทศกาลตรุษจีน รูปทรงคล้ายเงินตำลึงมักสื่อคำอวยพรให้มั่งคั่ง ทั้งแบบต้ม นึ่ง และทอดล้วนเป็นประเพณีเดียวกัน"
    },
    sources: [
      { title: "The Woks of Life — The ONLY Dumpling Recipe You'll Ever Need", url: "https://thewoksoflife.com/dumpling-recipe-youll-ever-need/" },
      { title: "China Sichuan Food — How to Make Chinese Chive and Pork Dumplings (Jiaozi)", url: "https://www.chinasichuanfood.com/how-to-make-dumplings/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: a white plate of plump boiled jiaozi with translucent pleated rims, juicy pork-and-cabbage filling subtly visible, and two small dipping dishes showing black vinegar and red chili oil; scallion garnish is visible.",
      "zh-hant": "實拍成品視覺規格：白盤盛飽滿水餃，摺邊略透可見多汁豬肉白菜餡；旁有兩個小碟，分別呈黑米醋與紅辣油，並看得到青蔥點綴。",
      ja: "実写完成品の仕様：白皿にふっくらした水餃子を盛り、半透明のひだ越しに豚肉と白菜のジューシーなあんをほのかに見せる。黒米酢と赤いラー油の小皿、ねぎも見える。",
      ko: "실사 완성품 사양: 흰 접시에 통통한 물만두를 담고 반투명 주름 사이로 촉촉한 돼지고기·배추 소가 은근히 보인다. 흑미식초와 붉은 고추기름 종지 두 개, 대파 고명이 보인다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: จานขาวใส่เจียวจื่อทรงอวบ ขอบจีบกึ่งใสให้เห็นไส้หมูกะหล่ำฉ่ำเล็กน้อย มีถ้วยน้ำจิ้มสองถ้วยเป็นน้ำส้มข้าวดำกับน้ำมันพริกแดง และเห็นต้นหอมโรย"
    }
  },

  {
    id: "scallion-pancakes",
    cuisine: "chinese",
    name: {
      en: "Flaky Chinese scallion pancakes",
      "zh-hant": "蔥油餅",
      ja: "ねぎ油餅（葱油餅）",
      ko: "파기름 전병",
      th: "แพนเค้กต้นหอมจีนกรอบเป็นชั้น"
    },
    description: {
      en: "A chewy, layered wheat pancake rolled with scallions and oil, pan-fried until crisp and blistered, with a soy-vinegar dip.",
      "zh-hant": "麵糰抹油捲入青蔥形成層次，平底鍋煎至酥脆起泡，佐醬油醋沾醬。",
      ja: "油とねぎを巻き込んだ小麦生地を重ね、表面をパリッと焼いた葱油餅。しょうゆ酢だれを添えます。",
      ko: "기름과 대파를 밀가루 반죽에 말아 층을 만들고 겉을 바삭하게 지진 뒤 간장식초 소스를 곁들입니다.",
      th: "แป้งสาลีม้วนชั้นด้วยน้ำมันและต้นหอม จี่กระทะจนกรอบพอง เสิร์ฟกับน้ำจิ้มซีอิ๊วและน้ำส้มสายชู"
    },
    prep: "PT45M",
    cook: "PT20M",
    total: "PT1H5M",
    yield: {
      en: "4 pancakes (4 servings)",
      "zh-hant": "4 張（4 份）",
      ja: "4枚（4人分）",
      ko: "4장(4인분)",
      th: "4 แผ่น (4 ที่)"
    },
    servings: 4,
    ingredients: {
      en: [
        { item: "all-purpose flour", amount: "300 g" },
        { item: "boiling water", amount: "150 ml" },
        { item: "room-temperature water", amount: "60 ml" },
        { item: "fine salt for dough", amount: "4 g" },
        { item: "scallions, finely sliced", amount: "100 g" },
        { item: "neutral oil for layers", amount: "60 ml" },
        { item: "flour for oil paste", amount: "30 g" },
        { item: "light soy sauce for dip", amount: "30 ml" },
        { item: "rice vinegar for dip", amount: "15 ml" },
        { item: "chili oil for dip", amount: "10 ml" }
      ],
      "zh-hant": [
        { item: "中筋麵粉", amount: "300 公克" },
        { item: "沸水", amount: "150 毫升" },
        { item: "室溫水", amount: "60 毫升" },
        { item: "麵糰用細鹽", amount: "4 公克" },
        { item: "青蔥，切細絲", amount: "100 公克" },
        { item: "做層次用中性油", amount: "60 毫升" },
        { item: "油酥用麵粉", amount: "30 公克" },
        { item: "沾醬淡醬油", amount: "30 毫升" },
        { item: "沾醬米醋", amount: "15 毫升" },
        { item: "沾醬辣油", amount: "10 毫升" }
      ],
      ja: [
        { item: "中力粉", amount: "300g" },
        { item: "熱湯", amount: "150ml" },
        { item: "室温の水", amount: "60ml" },
        { item: "生地用の細塩", amount: "4g" },
        { item: "青ねぎ（細切り）", amount: "100g" },
        { item: "層用の無味の油", amount: "60ml" },
        { item: "油だね用の粉", amount: "30g" },
        { item: "つけだれ用薄口しょうゆ", amount: "30ml" },
        { item: "つけだれ用米酢", amount: "15ml" },
        { item: "つけだれ用ラー油", amount: "10ml" }
      ],
      ko: [
        { item: "중력분", amount: "300g" },
        { item: "끓는 물", amount: "150ml" },
        { item: "실온 물", amount: "60ml" },
        { item: "반죽용 고운 소금", amount: "4g" },
        { item: "대파, 가늘게 썬 것", amount: "100g" },
        { item: "층용 중성유", amount: "60ml" },
        { item: "기름 반죽용 밀가루", amount: "30g" },
        { item: "찍어 먹을 양조간장", amount: "30ml" },
        { item: "찍어 먹을 쌀식초", amount: "15ml" },
        { item: "찍어 먹을 고추기름", amount: "10ml" }
      ],
      th: [
        { item: "แป้งสาลีอเนกประสงค์", amount: "300 กรัม" },
        { item: "น้ำเดือด", amount: "150 มล." },
        { item: "น้ำอุณหภูมิห้อง", amount: "60 มล." },
        { item: "เกลือป่นสำหรับแป้ง", amount: "4 กรัม" },
        { item: "ต้นหอมซอยละเอียด", amount: "100 กรัม" },
        { item: "น้ำมันรสกลางสำหรับทำชั้น", amount: "60 มล." },
        { item: "แป้งสำหรับผสมน้ำมัน", amount: "30 กรัม" },
        { item: "ซีอิ๊วขาวสำหรับจิ้ม", amount: "30 มล." },
        { item: "น้ำส้มสายชูข้าวสำหรับจิ้ม", amount: "15 มล." },
        { item: "น้ำมันพริกสำหรับจิ้ม", amount: "10 มล." }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Mix flour and salt. Stir in boiling water, then room-temperature water; knead 5 minutes until smooth. Cover and rest 30 minutes." },
        { step: 2, text: "Stir 30 g flour into 45 ml of the oil to make a spreadable paste; reserve 15 ml oil for frying." },
        { step: 3, text: "Divide dough into 4 balls. Roll one to a 25 cm by 15 cm rectangle, brush with oil paste, scatter 25 g scallion, and roll from the long edge into a rope." },
        { step: 4, text: "Coil the rope, tuck the end underneath, flatten, and roll to a 16 cm round. Rest covered 10 minutes while shaping the other three; this relaxes the gluten." },
        { step: 5, text: "Heat a skillet over medium-low heat with 3.75 ml oil per pancake. Cook each 4–5 minutes per side, pressing and rotating occasionally, until blistered, crisp, and deeply golden; center should be fully set." },
        { step: 6, text: "Whisk soy sauce, rice vinegar, and chili oil. Tap each hot pancake edge against the board for 10 seconds to separate layers, cut into wedges, and serve with dip." }
      ],
      "zh-hant": [
        { step: 1, text: "麵粉與鹽混合，加入沸水拌勻，再加室溫水；揉 5 分鐘至光滑，覆蓋醒 30 分鐘。" },
        { step: 2, text: "將 30 公克麵粉拌入 45 毫升油，調成可塗抹油酥；另留 15 毫升油煎餅。" },
        { step: 3, text: "麵糰分 4 球。一球擀成 25×15 公分長方形，抹油酥、撒 25 公克青蔥，從長邊捲成長條。" },
        { step: 4, text: "長條盤成螺旋，尾端塞底壓扁，再擀成 16 公分圓餅。覆蓋醒 10 分鐘，處理其餘三份，讓麩質放鬆。" },
        { step: 5, text: "平底鍋中小火，每張加入 3.75 毫升油。每面煎 4–5 分鐘，偶爾按壓並轉動，直到起泡、酥脆且深金黃；中心要完全定型。" },
        { step: 6, text: "混合淡醬油、米醋與辣油。熱餅邊緣在砧板上輕敲 10 秒使層次分開，切楔形佐沾醬。" }
      ],
      ja: [
        { step: 1, text: "粉と塩を混ぜ、熱湯、室温水の順に加える。5分こねてなめらかにし、覆って30分休ませる。" },
        { step: 2, text: "粉30gに油45mlを混ぜ、塗れる油だねにする。残り15mlは焼くために取っておく。" },
        { step: 3, text: "生地を4等分。一つを25×15cmに伸ばし、油だねを塗り、ねぎ25gを散らす。長い辺から巻いて棒状にする。" },
        { step: 4, text: "棒を渦巻きにして端を下に入れ、つぶして直径16cmに伸ばす。覆って10分休ませ、残りも成形する。生地が緩む時間になる。" },
        { step: 5, text: "フライパンを中弱火にし、1枚につき油3.75ml。片面4～5分ずつ、時々押して回し、気泡が出て濃いきつね色でカリッとするまで焼く。中心まで固まればよい。" },
        { step: 6, text: "しょうゆ、米酢、ラー油を混ぜる。熱い餅の縁をまな板に10秒軽く打ち付けて層をほぐし、くし形に切ってたれを添える。" }
      ],
      ko: [
        { step: 1, text: "밀가루와 소금을 섞고 끓는 물, 실온 물 순으로 넣는다. 5분 치대 매끈하게 만든 뒤 덮어 30분 쉰다." },
        { step: 2, text: "밀가루 30g에 기름 45ml를 섞어 바를 수 있는 기름 반죽을 만든다. 남은 기름 15ml는 부칠 때 쓴다." },
        { step: 3, text: "반죽을 4등분한다. 한 덩이를 25×15cm 직사각형으로 밀고 기름 반죽을 바른 뒤 대파 25g을 뿌린다. 긴 쪽에서 말아 끈 모양으로 만든다." },
        { step: 4, text: "끈을 달팽이처럼 말아 끝을 밑에 넣고 눌러 16cm 원으로 민다. 덮어 10분 쉬게 하며 나머지도 만든다. 글루텐이 풀리는 시간이다." },
        { step: 5, text: "팬을 중약불로 달구고 한 장당 기름 3.75ml를 쓴다. 한 면 4–5분씩 눌러 돌려 가며 부풀고 바삭한 짙은 황금색이 되게 한다. 속까지 완전히 굳어야 한다." },
        { step: 6, text: "간장, 쌀식초, 고추기름을 섞는다. 뜨거운 전병 가장자리를 도마에 10초 가볍게 두드려 층을 분리한 뒤 쐐기 모양으로 잘라 소스와 낸다." }
      ],
      th: [
        { step: 1, text: "ผสมแป้งกับเกลือ เติมน้ำเดือดแล้วตามด้วยน้ำอุณหภูมิห้อง นวด 5 นาทีจนเนียน ปิดฝาพัก 30 นาที" },
        { step: 2, text: "ผสมแป้ง 30 กรัมกับน้ำมัน 45 มล. เป็นเนื้อน้ำมันสำหรับทา เก็บน้ำมันอีก 15 มล. ไว้ทอด" },
        { step: 3, text: "แบ่งแป้งเป็น 4 ก้อน รีดก้อนหนึ่งเป็นสี่เหลี่ยม 25×15 ซม. ทาน้ำมันผสม โรยต้นหอม 25 กรัม แล้วม้วนจากด้านยาวเป็นเส้น" },
        { step: 4, text: "ขดเส้นเป็นก้นหอย ซ่อนปลายไว้ด้านล่าง กดแบนและรีดเป็นวง 16 ซม. คลุมพัก 10 นาทีระหว่างทำอีกสามก้อนเพื่อให้กลูเตนคลายตัว" },
        { step: 5, text: "ตั้งกระทะไฟกลางอ่อน ใช้น้ำมัน 3.75 มล. ต่อแผ่น จี่ด้านละ 4–5 นาที กดและหมุนเป็นระยะจนพอง กรอบ และสีทองเข้ม ใจกลางต้องสุกตั้งตัว" },
        { step: 6, text: "คนซีอิ๊ว น้ำส้มสายชูข้าว และน้ำมันพริกเข้าด้วยกัน เคาะขอบแผ่นร้อนกับเขียง 10 วินาทีให้ชั้นแยก ตัดเป็นชิ้นสามเหลี่ยมเสิร์ฟกับน้ำจิ้ม" }
      ]
    },
    tips: {
      en: ["Boiling water makes the dough supple; room-temperature water keeps it chewy rather than mushy.", "Pressing and rotating the pancake moves oil through the layers and prevents a raw center."],
      "zh-hant": ["沸水讓麵糰柔軟，室溫水則保留咬勁，不會糊軟。", "煎時按壓並轉動，油才能進入層次且中心不生。"],
      ja: ["熱湯で生地をしなやかにし、室温水で餅の弾力を残す。", "焼きながら押して回すと油が層に回り、中心が生焼けにならない。"],
      ko: ["끓는 물은 반죽을 유연하게 하고 실온 물은 쫄깃함을 남긴다.", "부치며 눌러 돌리면 기름이 층에 퍼지고 속이 설익지 않는다."],
      th: ["น้ำเดือดทำให้แป้งยืดหยุ่น น้ำอุณหภูมิห้องช่วยให้เหนียวนุ่มไม่เละ", "กดและหมุนระหว่างจี่ให้น้ำมันซึมตามชั้นและใจกลางไม่ดิบ"]
    },
    commonMistakes: {
      en: ["Too much filling or scallion at the rim prevents a tight coil.", "High heat burns the outside before the layered center cooks."],
      "zh-hant": ["邊緣放太多油酥或青蔥會讓螺旋捲不緊。", "火太大會外層焦黑而層次中心仍未熟。"],
      ja: ["縁に油だねやねぎを置きすぎると、きつく巻けない。", "強火だと外側だけ焦げ、重なった中心が生焼けになる。"],
      ko: ["가장자리에 기름 반죽이나 대파를 너무 많이 두면 단단히 말리지 않는다.", "불이 세면 겉만 타고 겹친 중심은 익지 않는다."],
      th: ["ใส่น้ำมันผสมหรือต้นหอมมากตรงขอบจะม้วนไม่แน่น", "ไฟแรงทำให้ด้านนอกไหม้ก่อนชั้นในสุก"]
    },
    substitutions: {
      en: [{ from: "all-purpose flour (300 g)", to: "bread flour (300 g)", note: "Add 10 ml more water if the dough feels stiff." }, { from: "chili oil (10 ml)", to: "toasted sesame oil (10 ml)", note: "The dip will be fragrant but not spicy." }],
      "zh-hant": [{ from: "中筋麵粉（300 公克）", to: "高筋麵粉（300 公克）", note: "麵糰太硬時多加 10 毫升水。" }, { from: "辣油（10 毫升）", to: "熟芝麻油（10 毫升）", note: "沾醬有香氣但不辣。" }],
      ja: [{ from: "中力粉（300g）", to: "強力粉（300g）", note: "生地が硬ければ水を10ml追加する。" }, { from: "ラー油（10ml）", to: "煎りごま油（10ml）", note: "香りは出るが辛くない。" }],
      ko: [{ from: "중력분(300g)", to: "강력분(300g)", note: "반죽이 뻣뻣하면 물 10ml를 더한다." }, { from: "고추기름(10ml)", to: "볶은 참기름(10ml)", note: "향은 나지만 맵지 않다." }],
      th: [{ from: "แป้งอเนกประสงค์ (300 กรัม)", to: "แป้งขนมปัง (300 กรัม)", note: "ถ้าแป้งแข็งให้เพิ่มน้ำ 10 มล." }, { from: "น้ำมันพริก (10 มล.)", to: "น้ำมันงาคั่ว (10 มล.)", note: "น้ำจิ้มหอมแต่ไม่เผ็ด" }]
    },
    storage: {
      en: "Cool pancakes on a rack, refrigerate airtight for up to 3 days, or freeze separated by parchment for 2 months. Re-crisp in a 190°C skillet for 2–3 minutes per side; do not microwave.",
      "zh-hant": "蔥油餅放網架冷卻，密封冷藏最多 3 天，或以烘焙紙分隔冷凍最多 2 個月。190°C 平底鍋每面回煎 2–3 分鐘恢復酥脆；不要微波。",
      ja: "網で冷まし、密閉冷蔵3日、またはクッキングシートで分けて冷凍2か月まで。190℃のフライパンで片面2～3分焼き直し、電子レンジは使わない。",
      ko: "전병을 망에서 식혀 밀폐 냉장 3일, 종이로 나눠 냉동 2개월까지 보관한다. 190°C 팬에서 한 면 2–3분씩 다시 바삭하게 굽고 전자레인지는 쓰지 않는다.",
      th: "พักแพนเค้กบนตะแกรง แช่เย็นภาชนะปิดสนิท 3 วัน หรือแช่แข็งคั่นกระดาษ 2 เดือน อุ่นให้กรอบในกระทะ 190°C ด้านละ 2–3 นาที ห้ามใช้ไมโครเวฟ"
    },
    culturalNotes: {
      en: "Cōng yóu bǐng is a savory northern Chinese flatbread found at breakfast stalls and home tables. Its layers come from rolling oil and scallions into the dough, not from a batter.",
      "zh-hant": "蔥油餅是中國北方常見的鹹香麵食，早餐攤與家庭餐桌都可見；層次來自將油與青蔥捲入麵糰，而非麵糊。",
      ja: "葱油餅は中国北方の塩味の平焼きで、朝食屋台や家庭で食べられる。層は生地に油とねぎを巻き込んで作り、衣ではない。",
      ko: "충유빙은 중국 북방의 짭짤한 납작빵으로 아침 노점과 가정에서 먹는다. 반죽에 기름과 대파를 말아 층을 만들며 반죽물을 붓는 방식이 아니다.",
      th: "ชงโหยวปิ่งเป็นแผ่นแป้งเค็มแบบภาคเหนือของจีน พบได้ตามแผงอาหารเช้าและครัวบ้าน ชั้นเกิดจากการม้วนน้ำมันกับต้นหอมเข้าแป้ง ไม่ใช่แป้งเหลว"
    },
    sources: [
      { title: "The Woks of Life — Easy Scallion Pancakes", url: "https://thewoksoflife.com/easy-scallion-pancakes/" },
      { title: "Serious Eats — Extra-Flaky Scallion Pancakes", url: "https://www.seriouseats.com/extra-flaky-scallion-pancakes-recipe" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: four golden, irregularly round scallion pancakes stacked slightly offset, with blistered crisp surfaces, visible green scallion flecks at the torn edges, and a small bowl of soy-vinegar-chili dip.",
      "zh-hant": "實拍成品視覺規格：四張金黃略不規則蔥油餅錯落堆疊，表面有起泡酥皮，撕開邊緣可見綠色蔥花；旁放一小碗醬油醋辣油沾醬。",
      ja: "実写完成品の仕様：黄金色で少し不揃いな葱油餅を4枚ずらして重ね、気泡のあるカリッとした表面と、裂いた縁の緑のねぎを見せる。しょうゆ酢ラー油だれの小鉢を添える。",
      ko: "실사 완성품 사양: 황금빛의 약간 불규칙한 파전병 네 장을 살짝 어긋나게 쌓고 표면의 기포와 찢은 가장자리 속 초록 대파 층을 보인다. 간장·식초·고추기름 소스 종지를 곁들인다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: เรียงแพนเค้กต้นหอมจีนสีทองทรงไม่เท่ากัน 4 แผ่นให้เหลื่อมเล็กน้อย ผิวพองกรอบและขอบฉีกเห็นต้นหอมเขียวด้านใน วางถ้วยน้ำจิ้มซีอิ๊ว น้ำส้ม และน้ำมันพริก"
    }
  },

  {
    id: "peking-duck",
    cuisine: "chinese",
    name: {
      en: "Home-style Peking duck with Mandarin pancakes",
      "zh-hant": "家常北京烤鴨配薄餅",
      ja: "家庭で作る北京ダックとマンダリンパンケーキ",
      ko: "가정식 베이징 덕과 만두피 전병",
      th: "เป็ดปักกิ่งแบบทำที่บ้านกับแผ่นแป้งแมนดาริน"
    },
    description: {
      en: "Air-dried duck roasted upright for crackling skin, sliced with cucumber and scallion, and wrapped in thin Mandarin pancakes with sweet bean sauce.",
      "zh-hant": "鴨子風乾後直立烘烤，皮脆肉嫩，切片搭配小黃瓜、蔥絲與甜麵醬包入薄餅。",
      ja: "鴨を空気乾燥させて立てて焼き、パリパリの皮をきゅうり、ねぎ、甜麺醤と薄いパンケーキで包みます。",
      ko: "오리 껍질을 공기 건조한 뒤 세워 구워 바삭하게 만들고 오이, 대파, 춘장과 얇은 전병에 싸 먹습니다.",
      th: "เป็ดผึ่งลมแล้วอบตั้งตรงให้หนังกรอบ หั่นเสิร์ฟกับแตงกวา ต้นหอม และซอสถั่วหวานในแผ่นแป้งแมนดารินบาง"
    },
    prep: "PT24H",
    cook: "PT1H15M",
    total: "PT25H15M",
    yield: {
      en: "4 servings (one 1.8 kg duck and 16 pancakes)",
      "zh-hant": "4 份（1.8 公斤鴨 1 隻、薄餅 16 張）",
      ja: "4人分（1.8kgの鴨1羽、パンケーキ16枚）",
      ko: "4인분(1.8kg 오리 1마리, 전병 16장)",
      th: "4 ที่ (เป็ด 1.8 กก. 1 ตัวและแผ่นแป้ง 16 แผ่น)"
    },
    servings: 4,
    ingredients: {
      en: [
        { item: "air-chilled Pekin duck, giblets removed", amount: "1.8 kg" },
        { item: "fine salt", amount: "12 g" },
        { item: "baking powder", amount: "8 g" },
        { item: "maltose", amount: "45 g" },
        { item: "boiling water for maltose", amount: "60 ml" },
        { item: "light soy sauce", amount: "15 ml" },
        { item: "white vinegar", amount: "30 ml" },
        { item: "all-purpose flour for pancakes", amount: "240 g" },
        { item: "boiling water for pancakes", amount: "180 ml" },
        { item: "room-temperature water for pancakes", amount: "60 ml" },
        { item: "neutral oil for stacking pancakes", amount: "15 ml" },
        { item: "scallions, cut into 8 cm batons", amount: "80 g" },
        { item: "cucumber, cut into 8 cm batons", amount: "150 g" },
        { item: "sweet bean sauce (tian mian jiang)", amount: "120 g" }
      ],
      "zh-hant": [
        { item: "氣冷北京鴨，去除內臟", amount: "1.8 公斤" },
        { item: "細鹽", amount: "12 公克" },
        { item: "泡打粉", amount: "8 公克" },
        { item: "麥芽糖", amount: "45 公克" },
        { item: "調開麥芽糖用沸水", amount: "60 毫升" },
        { item: "淡醬油", amount: "15 毫升" },
        { item: "白醋", amount: "30 毫升" },
        { item: "薄餅用中筋麵粉", amount: "240 公克" },
        { item: "薄餅用沸水", amount: "180 毫升" },
        { item: "薄餅用室溫水", amount: "60 毫升" },
        { item: "疊餅用中性油", amount: "15 毫升" },
        { item: "青蔥，切 8 公分段", amount: "80 公克" },
        { item: "小黃瓜，切 8 公分條", amount: "150 公克" },
        { item: "甜麵醬", amount: "120 公克" }
      ],
      ja: [
        { item: "内臓を除いたエアチルドの北京ダック", amount: "1.8kg" },
        { item: "細塩", amount: "12g" },
        { item: "ベーキングパウダー", amount: "8g" },
        { item: "麦芽糖", amount: "45g" },
        { item: "麦芽糖を溶く熱湯", amount: "60ml" },
        { item: "薄口しょうゆ", amount: "15ml" },
        { item: "白酢", amount: "30ml" },
        { item: "パンケーキ用中力粉", amount: "240g" },
        { item: "パンケーキ用熱湯", amount: "180ml" },
        { item: "パンケーキ用室温水", amount: "60ml" },
        { item: "重ね用の無味の油", amount: "15ml" },
        { item: "青ねぎ（8cm）", amount: "80g" },
        { item: "きゅうり（8cmの棒状）", amount: "150g" },
        { item: "甜麺醤（甘い豆味噌）", amount: "120g" }
      ],
      ko: [
        { item: "내장을 제거한 공기 냉각 북경오리", amount: "1.8kg" },
        { item: "고운 소금", amount: "12g" },
        { item: "베이킹파우더", amount: "8g" },
        { item: "맥아당", amount: "45g" },
        { item: "맥아당을 풀 뜨거운 물", amount: "60ml" },
        { item: "양조간장", amount: "15ml" },
        { item: "백식초", amount: "30ml" },
        { item: "전병용 중력분", amount: "240g" },
        { item: "전병용 끓는 물", amount: "180ml" },
        { item: "전병용 실온 물", amount: "60ml" },
        { item: "전병 겹칠 때 바를 중성유", amount: "15ml" },
        { item: "대파, 8cm 길이", amount: "80g" },
        { item: "오이, 8cm 막대", amount: "150g" },
        { item: "춘장(단맛 콩 소스)", amount: "120g" }
      ],
      th: [
        { item: "เป็ดปักกิ่งแช่เย็นแบบลม เอาเครื่องในออก", amount: "1.8 กก." },
        { item: "เกลือป่น", amount: "12 กรัม" },
        { item: "ผงฟู", amount: "8 กรัม" },
        { item: "มอลโทส", amount: "45 กรัม" },
        { item: "น้ำเดือดสำหรับละลายมอลโทส", amount: "60 มล." },
        { item: "ซีอิ๊วขาว", amount: "15 มล." },
        { item: "น้ำส้มสายชูขาว", amount: "30 มล." },
        { item: "แป้งสาลีอเนกประสงค์สำหรับแผ่นแป้ง", amount: "240 กรัม" },
        { item: "น้ำเดือดสำหรับแผ่นแป้ง", amount: "180 มล." },
        { item: "น้ำอุณหภูมิห้องสำหรับแผ่นแป้ง", amount: "60 มล." },
        { item: "น้ำมันรสกลางสำหรับทาซ้อนแผ่น", amount: "15 มล." },
        { item: "ต้นหอมหั่นยาว 8 ซม.", amount: "80 กรัม" },
        { item: "แตงกวาหั่นแท่งยาว 8 ซม.", amount: "150 กรัม" },
        { item: "ซอสถั่วหวาน (เถียนเมี่ยนเจี้ยง)", amount: "120 กรัม" }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Pat duck dry. Separate skin from breast and thigh meat with clean fingers without tearing it. Rub salt and baking powder over the skin, set on a rack, and refrigerate uncovered 12–18 hours until dry and taut." },
        { step: 2, text: "Mix maltose with 60 ml boiling water and soy sauce. Pour boiling water over every side of the chilled duck to tighten the skin, then brush with the syrup; the surface should be evenly coated." },
        { step: 3, text: "Return duck to the rack uncovered in the refrigerator for 6–8 hours (or until the skin feels dry, not tacky). Make pancake dough by mixing flour with boiling water and room-temperature water; rest covered 30 minutes." },
        { step: 4, text: "Divide dough into 16 balls. Brush pairs with oil, stack, and roll each pair into a 14 cm round. Cook on a dry skillet over medium heat 30–45 seconds per side until small bubbles appear; separate the paired pancakes while warm and cover." },
        { step: 5, text: "Heat oven to 175°C. Stand duck upright on a heatproof rack over a tray (keep the cavity open) and roast 45 minutes; fat should drip and the skin should bronze." },
        { step: 6, text: "Increase oven to 220°C and roast 20–30 minutes until the skin crackles and the thickest thigh reaches 74°C. If skin darkens too quickly, tent only that area with foil." },
        { step: 7, text: "Rest duck upright 15 minutes. Slice skin and meat into thin pieces with a sharp knife; discard the rack drippings after cooling safely." },
        { step: 8, text: "Spread 7.5 g sweet bean sauce on each warm pancake, add duck, one scallion baton, and one cucumber baton. Fold and serve immediately while the skin is crisp." }
      ],
      "zh-hant": [
        { step: 1, text: "鴨子擦乾，用乾淨手指在不撕破皮的前提下分離胸肉與腿肉的皮。鹽與泡打粉混合抹遍鴨皮，放網架裸露冷藏 12–18 小時，直到皮乾且繃緊。" },
        { step: 2, text: "麥芽糖加 60 毫升沸水與淡醬油調開。將沸水淋遍冰冷鴨子使皮收緊，再刷上糖液；表面應均勻覆蓋。" },
        { step: 3, text: "鴨子回網架裸露冷藏 6–8 小時（或直到表皮乾燥不黏）。麵粉拌入沸水與室溫水成麵糰，覆蓋醒 30 分鐘。" },
        { step: 4, text: "麵糰分 16 球，每兩球抹油疊合，擀成 14 公分圓。乾鍋中火每面煎 30–45 秒至出小泡，趁熱分開雙層薄餅並覆蓋。" },
        { step: 5, text: "烤箱預熱 175°C。鴨子直立放在烤盤上方耐熱網架，保持腹腔開口，烤 45 分鐘；油脂應滴落、鴨皮轉古銅色。" },
        { step: 6, text: "升溫至 220°C 再烤 20–30 分鐘，直到鴨皮喀滋、腿肉最厚處達 74°C。若皮太快變深，只在該處覆鋁箔。" },
        { step: 7, text: "鴨子直立靜置 15 分鐘，用利刀將皮與肉切成薄片；烤盤滴油冷卻後安全丟棄。" },
        { step: 8, text: "每張溫薄餅抹 7.5 公克甜麵醬，放鴨片、1 段蔥絲與 1 段小黃瓜，折起趁皮脆立即食用。" }
      ],
      ja: [
        { step: 1, text: "鴨の水分を拭く。皮を破らないよう指で胸と腿の肉から皮を離す。塩とベーキングパウダーを皮にすり込み、網に置いて覆わず冷蔵12～18時間。乾いて張ればよい。" },
        { step: 2, text: "麦芽糖を熱湯60mlとしょうゆで溶く。冷えた鴨全体に熱湯をかけて皮を締め、糖液を塗る。表面を均一に覆う。" },
        { step: 3, text: "網に戻し、冷蔵庫で覆わず6～8時間（べたつかず乾くまで）。粉に熱湯と室温水を混ぜてパンケーキ生地を作り、覆って30分休ませる。" },
        { step: 4, text: "生地を16個に分ける。2個ずつ油を塗って重ね、14cmに伸ばす。油をひかない中火のフライパンで片面30～45秒、気泡が出るまで焼く。温かいうちに2枚をはがし、覆う。" },
        { step: 5, text: "オーブンを175℃にする。鴨を耐熱網に立て、腹腔を開けたまま天板の上で45分焼く。脂が落ち、皮がブロンズ色になればよい。" },
        { step: 6, text: "220℃に上げて20～30分焼く。皮がパリパリで腿の最厚部が74℃になるまで。色が早く濃くなればその部分だけアルミ箔で覆う。" },
        { step: 7, text: "鴨を立てたまま15分休ませる。鋭い包丁で皮と肉を薄く切り、天板の脂は安全に冷まして捨てる。" },
        { step: 8, text: "温かい皮1枚に甜麺醤7.5gを塗り、鴨、ねぎ1本、きゅうり1本をのせて包む。皮がパリッとしているうちに食べる。" }
      ],
      ko: [
        { step: 1, text: "오리의 물기를 닦는다. 껍질을 찢지 않게 손가락으로 가슴과 다리 살에서 껍질을 분리한다. 소금과 베이킹파우더를 껍질에 문질러 망에 올리고 덮지 않아 냉장 12–18시간, 마르고 팽팽해질 때까지 둔다." },
        { step: 2, text: "맥아당을 끓는 물 60ml와 간장에 푼다. 차가운 오리 모든 면에 끓는 물을 부어 껍질을 조인 뒤 시럽을 고르게 바른다." },
        { step: 3, text: "오리를 망에 되돌려 냉장고에서 덮지 않고 6–8시간(끈적이지 않고 마를 때까지) 둔다. 밀가루에 끓는 물과 실온 물을 섞어 전병 반죽을 만들고 덮어 30분 쉰다." },
        { step: 4, text: "반죽을 16개로 나눈다. 두 개씩 기름을 바르고 겹쳐 14cm로 민다. 마른 팬 중불에서 한 면 30–45초씩 작은 기포가 생길 때 굽고 따뜻할 때 두 장을 분리해 덮어 둔다." },
        { step: 5, text: "오븐을 175°C로 가열한다. 오리를 내열 망에 세워 팬 위에 놓고 속을 열어 둔 채 45분 굽는다. 기름이 빠지고 껍질이 청동색이 되어야 한다." },
        { step: 6, text: "220°C로 올려 20–30분 더 굽는다. 껍질이 바삭하게 갈라지고 다리 가장 두꺼운 곳이 74°C가 되면 된다. 너무 빨리 진해지는 부분만 호일로 덮는다." },
        { step: 7, text: "오리를 세운 채 15분 쉰다. 날카로운 칼로 껍질과 살을 얇게 썬다. 팬의 기름은 안전하게 식힌 후 버린다." },
        { step: 8, text: "따뜻한 전병에 춘장 7.5g을 바르고 오리, 대파 한 조각, 오이 한 조각을 올려 접는다. 껍질이 바삭할 때 즉시 먹는다." }
      ],
      th: [
        { step: 1, text: "ซับเป็ดให้แห้ง ใช้นิ้วแยกหนังออกจากอกและสะโพกโดยไม่ให้ขาด คลุกเกลือกับผงฟูบนหนัง วางบนตะแกรงแช่เย็นเปิดฝา 12–18 ชั่วโมงจนหนังแห้งตึง" },
        { step: 2, text: "ละลายมอลโทสกับน้ำเดือด 60 มล. และซีอิ๊ว ราดน้ำเดือดให้ทั่วเป็ดเย็นเพื่อให้หนังตึง แล้วทาน้ำเชื่อมให้เคลือบสม่ำเสมอ" },
        { step: 3, text: "วางเป็ดกลับบนตะแกรง แช่เย็นเปิดฝาอีก 6–8 ชั่วโมงจนหนังแห้งไม่เหนียว ผสมแป้งกับน้ำเดือดและน้ำอุณหภูมิห้องทำแป้งแผ่น ปิดพัก 30 นาที" },
        { step: 4, text: "แบ่งแป้ง 16 ก้อน ทาน้ำมันบนแป้งสองก้อนซ้อนกัน รีดเป็นวง 14 ซม. จี่กระทะแห้งไฟกลางด้านละ 30–45 วินาทีจนมีฟอง แยกสองแผ่นตอนยังอุ่นแล้วคลุม" },
        { step: 5, text: "อุ่นเตาที่ 175°C ตั้งเป็ดบนตะแกรงทนร้อนเหนือถาด เปิดช่องท้องไว้ อบ 45 นาที ให้น้ำมันหยดและหนังเป็นสีบรอนซ์" },
        { step: 6, text: "เพิ่มเตาเป็น 220°C อบต่อ 20–30 นาทีจนหนังกรอบแตกและส่วนสะโพกหนาสุดถึง 74°C ถ้าหนังเข้มเร็วให้คลุมฟอยล์เฉพาะจุดนั้น" },
        { step: 7, text: "พักเป็ดในท่าตั้ง 15 นาที ใช้มีดคมหั่นหนังและเนื้อบางๆ เทน้ำมันจากถาดทิ้งเมื่อเย็นอย่างปลอดภัย" },
        { step: 8, text: "ทาซอสถั่วหวาน 7.5 กรัมบนแผ่นอุ่น ใส่เป็ด ต้นหอมหนึ่งแท่ง และแตงกวาหนึ่งแท่ง พับแล้วกินทันทีขณะหนังกรอบ" }
      ]
    },
    tips: {
      en: ["Drying is the key step; the skin should feel papery and taut before roasting.", "A vertical rack lets fat drain and avoids a soggy underside; check that the rack is heatproof and stable."],
      "zh-hant": ["風乾是關鍵，入爐前鴨皮應像紙一樣乾且繃緊。", "直立網架讓油脂滴落、避免底部濕軟；確認網架耐熱且穩固。"],
      ja: ["乾燥が要で、焼く前の皮は紙のように乾いて張っているべき。", "立てる網で脂を落とし、底を蒸らさない。網が耐熱で安定しているか確認する。"],
      ko: ["굽기 전 껍질이 종이처럼 마르고 팽팽해야 바삭해진다.", "세운 망은 기름을 빼고 바닥이 눅눅해지는 것을 막으므로 내열성과 안정성을 확인한다."],
      th: ["การผึ่งให้แห้งเป็นหัวใจ หนังควรแห้งตึงเหมือนกระดาษก่อนอบ", "ตะแกรงตั้งช่วยให้น้ำมันหยดและก้นไม่แฉะ ต้องเลือกตะแกรงทนร้อนมั่นคง"]
    },
    commonMistakes: {
      en: ["Putting a damp duck in the oven produces rubbery skin rather than crackle.", "Cutting before the 15-minute rest releases juices and makes thin slices dry."],
      "zh-hant": ["鴨皮未乾就入爐會變韌，不會酥裂。", "未靜置 15 分鐘就切會流失肉汁，薄片變乾。"],
      ja: ["濡れた皮のまま焼くとパリッとせずゴムのようになる。", "15分休ませず切ると肉汁が流れ、薄切りが乾く。"],
      ko: ["젖은 오리를 바로 구우면 껍질이 바삭하지 않고 질기다.", "15분 쉬기 전에 썰면 육즙이 빠져 얇은 살이 마른다."],
      th: ["นำเป็ดที่หนังยังชื้นเข้าเตาจะได้หนังเหนียวไม่กรอบ", "หั่นก่อนพัก 15 นาทีจะเสียน้ำและชิ้นบางแห้ง"]
    },
    substitutions: {
      en: [{ from: "maltose (45 g)", to: "honey (45 g)", note: "Brush a thinner coat and watch the 220°C finish closely." }, { from: "sweet bean sauce (120 g)", to: "hoisin sauce (120 g)", note: "Hoisin is saltier and thicker; spread a thinner layer." }],
      "zh-hant": [{ from: "麥芽糖（45 公克）", to: "蜂蜜（45 公克）", note: "刷薄一點，220°C 最後階段密切觀察。" }, { from: "甜麵醬（120 公克）", to: "海鮮醬（120 公克）", note: "海鮮醬較鹹且濃稠，請薄抹。" }],
      ja: [{ from: "麦芽糖（45g）", to: "はちみつ（45g）", note: "薄く塗り、220℃の仕上げをよく見る。" }, { from: "甜麺醤（120g）", to: "甜麺醤（ホイシンソース）（120g）", note: "塩味と濃さが強いので薄く塗る。" }],
      ko: [{ from: "맥아당(45g)", to: "꿀(45g)", note: "얇게 바르고 220°C 마무리에서 자주 확인한다." }, { from: "춘장(120g)", to: "해선장(120g)", note: "더 짜고 되직하므로 얇게 바른다." }],
      th: [{ from: "มอลโทส (45 กรัม)", to: "น้ำผึ้ง (45 กรัม)", note: "ทาบางลงและดูช่วงอบ 220°C ใกล้ชิด" }, { from: "ซอสถั่วหวาน (120 กรัม)", to: "ซอสฮอยซิน (120 กรัม)", note: "ฮอยซินเค็มและข้นกว่า ให้ทาบาง" }]
    },
    storage: {
      en: "Separate sliced duck, pancakes, and garnishes. Refrigerate duck airtight up to 2 days and pancakes up to 3 days; reheat duck on a 220°C rack for 5–8 minutes and steam pancakes for 2 minutes. Freeze cooked duck up to 1 month.",
      "zh-hant": "鴨片、薄餅與配料分開保存。鴨片密封冷藏最多 2 天、薄餅 3 天；鴨片 220°C 網架回烤 5–8 分鐘，薄餅蒸 2 分鐘。熟鴨可冷凍最多 1 個月。",
      ja: "鴨、パンケーキ、薬味を分ける。鴨は密閉冷蔵2日、パンケーキ3日まで。鴨は220℃の網で5～8分、パンケーキは2分蒸して温める。焼いた鴨は1か月冷凍可。",
      ko: "오리, 전병, 곁들임을 따로 보관한다. 오리는 밀폐 냉장 2일, 전병 3일까지 두고 오리는 220°C 망에서 5–8분, 전병은 2분 찐다. 익힌 오리는 1개월 냉동할 수 있다.",
      th: "เก็บเป็ดหั่น แผ่นแป้ง และเครื่องเคียงแยกกัน เป็ดแช่เย็นปิดสนิท 2 วัน แผ่นแป้ง 3 วัน อุ่นเป็ดบนตะแกรง 220°C 5–8 นาที และนึ่งแผ่นแป้ง 2 นาที เป็ดสุกแช่แข็งได้ 1 เดือน"
    },
    culturalNotes: {
      en: "Peking duck is a Beijing roast-duck tradition built around crisp skin, thin pancakes, scallion, cucumber, and a sweet sauce. Restaurant carving often separates skin and meat; this home method presents both together.",
      "zh-hant": "北京烤鴨是以酥皮、薄餅、青蔥、小黃瓜與甜醬為核心的北京燒鴨傳統；餐館常分切皮與肉，本家常版則一起包食。",
      ja: "北京ダックはパリパリの皮、薄い餅、ねぎ、きゅうり、甘いソースが柱の北京料理。店では皮と肉を分けて切ることが多いが、家庭版は一緒に包む。",
      ko: "베이징 덕은 바삭한 껍질, 얇은 전병, 대파, 오이, 달콤한 소스를 중심으로 한 베이징 전통 구이다. 식당은 껍질과 살을 나눠 썰기도 하지만 가정식은 함께 싼다.",
      th: "เป็ดปักกิ่งเป็นวัฒนธรรมเป็ดย่างปักกิ่งที่เน้นหนังกรอบ แผ่นแป้งบาง ต้นหอม แตงกวา และซอสหวาน ร้านอาหารมักแล่หนังกับเนื้อแยก สูตรบ้านนี้ห่อกินพร้อมกัน"
    },
    sources: [
      { title: "Serious Eats — Peking Duck with Mandarin Pancakes and Plum Sauce", url: "https://www.seriouseats.com/peking-duck-mandarin-pancakes-plum-sauce-recipe" },
      { title: "The Woks of Life — Easy Peking Duck with Mandarin Pancakes", url: "https://thewoksoflife.com/easy-peking-duck-mandarin-pancakes/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: a platter of thin mahogany duck slices with visibly crackled skin, a stack of translucent Mandarin pancakes, cucumber batons, scallion slivers, and an uncovered dish of sweet bean sauce; every wrap component must be visible.",
      "zh-hant": "實拍成品視覺規格：盤中是薄切棗紅鴨片，皮面清楚裂脆；旁有半透明薄餅、小黃瓜條、蔥絲與未遮蓋的甜麵醬，每一種包餅配料都要可見。",
      ja: "実写完成品の仕様：パリパリに裂けた皮を持つ赤褐色の鴨薄切りを盛り、半透明のマンダリンパンケーキ、きゅうり、ねぎ、甜麺醤の器をすべて見せる。",
      ko: "실사 완성품 사양: 껍질이 선명하게 갈라진 적갈색 오리 얇은 조각을 담고 반투명 전병, 오이 막대, 채 썬 대파, 춘장 소스를 모두 보이게 한다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: จานมีเป็ดหั่นบางสีน้ำตาลแดง หนังแตกกรอบชัด พร้อมกองแผ่นแป้งแมนดารินกึ่งใส แตงกวาแท่ง ต้นหอมซอย และถ้วยซอสถั่วหวานที่เปิดให้เห็น เครื่องห่อทุกอย่างต้องปรากฏ"
    }
  },

  {
    id: "yangzhou-fried-rice",
    cuisine: "chinese",
    name: {
      en: "Yangzhou fried rice",
      "zh-hant": "揚州炒飯",
      ja: "揚州炒飯（揚州チャーハン）",
      ko: "양저우 볶음밥",
      th: "ข้าวผัดหยางโจว"
    },
    description: {
      en: "Separate grains of chilled rice stir-fried with shrimp, char siu, egg, peas, carrot, and scallion in a clean, savory style.",
      "zh-hant": "冷藏米飯炒至粒粒分明，加入蝦仁、叉燒、蛋、豌豆、胡蘿蔔與青蔥，風味清爽鹹香。",
      ja: "冷やしたご飯を一粒ずつほぐし、えび、叉焼、卵、グリーンピース、にんじん、ねぎをあっさり香ばしく炒めます。",
      ko: "차갑게 식힌 밥알을 새우, 차슈, 달걀, 완두콩, 당근, 대파와 고슬고슬하게 볶은 담백한 볶음밥입니다.",
      th: "ข้าวเย็นผัดเมล็ดร่วนกับกุ้ง หมูแดงจีน ไข่ ถั่วลันเตา แครอต และต้นหอม รสกลมกล่อมสะอาด"
    },
    prep: "PT4H20M",
    cook: "PT15M",
    total: "PT4H35M",
    yield: {
      en: "4 servings",
      "zh-hant": "4 份",
      ja: "4人分",
      ko: "4인분",
      th: "4 ที่"
    },
    servings: 4,
    ingredients: {
      en: [
        { item: "cooked jasmine rice, chilled at least 4 hours", amount: "600 g" },
        { item: "shrimp, peeled and deveined", amount: "150 g" },
        { item: "char siu, diced 1 cm", amount: "120 g" },
        { item: "large eggs, beaten", amount: "3 (150 g)" },
        { item: "frozen peas, thawed", amount: "80 g" },
        { item: "carrot, 5 mm dice", amount: "80 g" },
        { item: "scallion, finely sliced", amount: "40 g" },
        { item: "neutral oil", amount: "30 ml" },
        { item: "light soy sauce", amount: "15 ml" },
        { item: "Shaoxing wine", amount: "15 ml" },
        { item: "white pepper", amount: "1 g" },
        { item: "fine salt", amount: "3 g" },
        { item: "granulated sugar", amount: "2 g" },
        { item: "sesame oil", amount: "5 ml" }
      ],
      "zh-hant": [
        { item: "熟茉莉香米，至少冷藏 4 小時", amount: "600 公克" },
        { item: "蝦仁，去殼去腸泥", amount: "150 公克" },
        { item: "叉燒，切 1 公分丁", amount: "120 公克" },
        { item: "大雞蛋，打散", amount: "3 顆（150 公克）" },
        { item: "冷凍豌豆，解凍", amount: "80 公克" },
        { item: "胡蘿蔔，切 5 毫米丁", amount: "80 公克" },
        { item: "青蔥，切細絲", amount: "40 公克" },
        { item: "中性油", amount: "30 毫升" },
        { item: "淡醬油", amount: "15 毫升" },
        { item: "紹興酒", amount: "15 毫升" },
        { item: "白胡椒粉", amount: "1 公克" },
        { item: "細鹽", amount: "3 公克" },
        { item: "砂糖", amount: "2 公克" },
        { item: "芝麻油", amount: "5 毫升" }
      ],
      ja: [
        { item: "炊いたジャスミン米（4時間以上冷やす）", amount: "600g" },
        { item: "えび（殻と背わたを除く）", amount: "150g" },
        { item: "叉焼（1cm角）", amount: "120g" },
        { item: "大きな卵（溶く）", amount: "3個（150g）" },
        { item: "冷凍グリーンピース（解凍）", amount: "80g" },
        { item: "にんじん（5mm角）", amount: "80g" },
        { item: "青ねぎ（細切り）", amount: "40g" },
        { item: "無味の油", amount: "30ml" },
        { item: "薄口しょうゆ", amount: "15ml" },
        { item: "紹興酒", amount: "15ml" },
        { item: "白こしょう", amount: "1g" },
        { item: "細塩", amount: "3g" },
        { item: "グラニュー糖", amount: "2g" },
        { item: "ごま油", amount: "5ml" }
      ],
      ko: [
        { item: "지은 자스민 쌀, 최소 4시간 식힌 것", amount: "600g" },
        { item: "새우, 껍질과 내장 제거", amount: "150g" },
        { item: "차슈, 1cm 깍둑썰기", amount: "120g" },
        { item: "큰 달걀, 푼 것", amount: "3개(150g)" },
        { item: "냉동 완두콩, 해동한 것", amount: "80g" },
        { item: "당근, 5mm 깍둑썰기", amount: "80g" },
        { item: "대파, 가늘게 썬 것", amount: "40g" },
        { item: "중성유", amount: "30ml" },
        { item: "양조간장", amount: "15ml" },
        { item: "샤오싱주", amount: "15ml" },
        { item: "흰 후추", amount: "1g" },
        { item: "고운 소금", amount: "3g" },
        { item: "설탕", amount: "2g" },
        { item: "참기름", amount: "5ml" }
      ],
      th: [
        { item: "ข้าวหอมมะลิสุกแช่เย็นอย่างน้อย 4 ชั่วโมง", amount: "600 กรัม" },
        { item: "กุ้งปอกเปลือกผ่าหลัง", amount: "150 กรัม" },
        { item: "หมูแดงจีนหั่นเต๋า 1 ซม.", amount: "120 กรัม" },
        { item: "ไข่ไก่ฟองใหญ่ตีแล้ว", amount: "3 ฟอง (150 กรัม)" },
        { item: "ถั่วลันเตาแช่แข็งละลายแล้ว", amount: "80 กรัม" },
        { item: "แครอตหั่นเต๋า 5 มม.", amount: "80 กรัม" },
        { item: "ต้นหอมซอยบาง", amount: "40 กรัม" },
        { item: "น้ำมันรสกลาง", amount: "30 มล." },
        { item: "ซีอิ๊วขาว", amount: "15 มล." },
        { item: "เหล้าจีนเส้าซิง", amount: "15 มล." },
        { item: "พริกไทยขาว", amount: "1 กรัม" },
        { item: "เกลือป่น", amount: "3 กรัม" },
        { item: "น้ำตาลทราย", amount: "2 กรัม" },
        { item: "น้ำมันงา", amount: "5 มล." }
      ]
    },
    instructions: {
      en: [
        { step: 1, text: "Spread cooked rice on a tray, cool uncovered 20 minutes, then refrigerate at 4°C or below for at least 4 hours; break up clumps with damp fingers before frying." },
        { step: 2, text: "Heat a wok over high heat. Add 10 ml oil and stir-fry shrimp 2–3 minutes until opaque and 63°C; remove. Add carrots and peas with 5 ml oil and cook 2 minutes until just tender." },
        { step: 3, text: "Add 10 ml oil, pour in eggs, and scramble 30–45 seconds until softly set but still glossy; push to the side of the wok." },
        { step: 4, text: "Add remaining 5 ml oil and rice. Toss and press over high heat for 4–5 minutes until every grain is hot and separate; no wet clumps should remain." },
        { step: 5, text: "Return shrimp, add char siu, soy, Shaoxing wine, white pepper, salt, and sugar. Toss 2 minutes until seasoning is evenly distributed and the rice reaches 74°C." },
        { step: 6, text: "Fold in scallion and sesame oil for 30 seconds, turn off heat, and serve immediately. The finish should be dry, fragrant, and lightly glossy rather than oily." }
      ],
      "zh-hant": [
        { step: 1, text: "熟飯攤在烤盤，裸露冷卻 20 分鐘，再以 4°C 以下冷藏至少 4 小時；炒前用濕手指拆散飯團。" },
        { step: 2, text: "炒鍋大火加熱，加 10 毫升油炒蝦仁 2–3 分鐘至不透明且達 63°C，取出。加 5 毫升油炒胡蘿蔔與豌豆 2 分鐘至剛熟。" },
        { step: 3, text: "加 10 毫升油倒入蛋液，炒 30–45 秒至柔軟凝固但仍有光澤，推到鍋邊。" },
        { step: 4, text: "加剩餘 5 毫升油與冷飯，大火提起翻炒並壓散 4–5 分鐘，直到每粒熱透分明，不能有濕飯團。" },
        { step: 5, text: "蝦仁回鍋，加入叉燒、醬油、紹興酒、白胡椒、鹽與砂糖，拌炒 2 分鐘使調味均勻，米飯達 74°C。" },
        { step: 6, text: "拌入青蔥與芝麻油 30 秒，關火立即上桌；成品應乾爽、香氣足、略帶光澤而非油膩。" }
      ],
      ja: [
        { step: 1, text: "ご飯を天板に広げ、覆わず20分冷ます。4℃以下で最低4時間冷やし、炒める前に濡れた指で塊をほぐす。" },
        { step: 2, text: "鍋を強火で熱す。油10mlでえびを2～3分炒め、白くなり63℃になれば取り出す。油5mlを足し、にんじんと豆を2分炒めて少し歯ごたえを残す。" },
        { step: 3, text: "油10mlを加え卵を入れ、30～45秒、柔らかく固まり光沢が残るまで炒めて鍋端に寄せる。" },
        { step: 4, text: "残りの油5mlとご飯を加え、強火で持ち上げて押しながら4～5分炒める。全粒が熱くほぐれ、湿った塊がなくなればよい。" },
        { step: 5, text: "えびを戻し、叉焼、しょうゆ、紹興酒、白こしょう、塩、砂糖を加えて2分炒める。味が均一でご飯が74℃になればよい。" },
        { step: 6, text: "ねぎとごま油を加え30秒混ぜ、火を止めすぐ盛る。乾いて香りがあり、軽い光沢で油っぽくない仕上がりにする。" }
      ],
      ko: [
        { step: 1, text: "지은 밥을 팬에 펼쳐 덮지 않고 20분 식힌 뒤 4°C 이하에서 최소 4시간 냉장한다. 볶기 전에 젖은 손가락으로 덩어리를 푼다." },
        { step: 2, text: "웍을 센 불로 달군다. 기름 10ml에 새우를 2–3분 볶아 불투명하고 63°C가 되면 뺀다. 기름 5ml를 넣고 당근과 완두콩을 2분 볶아 살짝 익힌다." },
        { step: 3, text: "기름 10ml를 넣고 달걀을 부어 30–45초 부드럽게 굳히되 윤기를 남긴다. 웍 한쪽으로 민다." },
        { step: 4, text: "남은 기름 5ml와 밥을 넣고 센 불에서 4–5분 들어 올리고 누르며 볶는다. 모든 밥알이 뜨겁고 흩어져 젖은 덩어리가 없어야 한다." },
        { step: 5, text: "새우를 돌려 넣고 차슈, 간장, 샤오싱주, 흰 후추, 소금, 설탕을 넣는다. 2분 볶아 간이 고루 배고 밥이 74°C가 되게 한다." },
        { step: 6, text: "대파와 참기름을 넣어 30초 섞고 불을 끈다. 기름지지 않고 보송하며 향긋하고 살짝 윤기 나게 즉시 낸다." }
      ],
      th: [
        { step: 1, text: "แผ่ข้าวสุกบนถาด พักเปิดฝา 20 นาที แล้วแช่ที่ 4°C หรือต่ำกว่าอย่างน้อย 4 ชั่วโมง ใช้นิ้วเปียกแยกก้อนก่อนผัด" },
        { step: 2, text: "ตั้งกระทะไฟแรง ใส่น้ำมัน 10 มล. ผัดกุ้ง 2–3 นาทีจนทึบและถึง 63°C ตักออก เติมน้ำมัน 5 มล. ผัดแครอตกับถั่วลันเตา 2 นาทีให้นุ่มพอดี" },
        { step: 3, text: "ใส่น้ำมัน 10 มล. เทไข่ ผัด 30–45 วินาทีจนตั้งตัวนุ่มยังเงา แล้วดันไปข้างกระทะ" },
        { step: 4, text: "ใส่น้ำมัน 5 มล. ที่เหลือและข้าว ผัดไฟแรงโดยยกพลิกและกด 4–5 นาทีจนทุกเมล็ดร้อนแยกตัว ไม่มีข้าวเปียกจับก้อน" },
        { step: 5, text: "ใส่กุ้งกลับ หมูแดง ซีอิ๊ว เหล้าจีน พริกไทยขาว เกลือ และน้ำตาล ผัด 2 นาทีให้รสทั่วและข้าวถึง 74°C" },
        { step: 6, text: "ใส่ต้นหอมและน้ำมันงา คลุก 30 วินาที ปิดไฟเสิร์ฟทันที ข้าวควรแห้งหอมและเงาเล็กน้อยไม่มันเยิ้ม" }
      ]
    },
    tips: {
      en: ["Cold, dry rice is the foundation of separate grains; freshly cooked rice will clump.", "Have every ingredient measured before heating the wok because the final stir-fry takes minutes."],
      "zh-hant": ["冷而乾爽的米飯是粒粒分明的基礎，剛煮好的飯容易結團。", "先量好所有配料再開火，最後炒製只需幾分鐘。"],
      ja: ["冷たく乾いたご飯が一粒ずつほぐれる土台。炊きたては固まりやすい。", "仕上げは数分なので、鍋を熱する前に全材料を量る。"],
      ko: ["차갑고 마른 밥이 고슬고슬한 볶음밥의 기초이며 갓 지은 밥은 뭉친다.", "마지막 볶음은 몇 분뿐이므로 웍을 달구기 전에 재료를 모두 계량한다."],
      th: ["ข้าวเย็นแห้งคือพื้นฐานให้เมล็ดร่วน ข้าวหุงใหม่จะจับก้อน", "เตรียมตวงทุกอย่างก่อนตั้งกระทะ เพราะช่วงผัดท้ายใช้เวลาไม่กี่นาที"]
    },
    commonMistakes: {
      en: ["Adding soy sauce too early makes rice wet and dark before it is separated.", "Overcooking shrimp turns it rubbery; remove it at opaque and return only at the end."],
      "zh-hant": ["太早加醬油會讓米飯未炒散就濕黏變黑。", "蝦仁炒過頭會彈硬，變不透明就先取出，最後再回鍋。"],
      ja: ["早くしょうゆを入れると米がほぐれる前に湿って濃くなる。", "えびを炒めすぎると硬くなるので、白くなったら取り出し最後に戻す。"],
      ko: ["간장을 너무 일찍 넣으면 밥이 풀리기 전에 젖고 짙어진다.", "새우를 오래 익히면 질겨지므로 불투명해질 때 빼고 마지막에 돌려 넣는다."],
      th: ["ใส่ซีอิ๊วเร็วไปทำให้ข้าวเปียกและเข้มก่อนแยกเมล็ด", "ผัดกุ้งนานไปจะแข็ง ให้ตักเมื่อทึบแล้วใส่กลับตอนท้าย"]
    },
    substitutions: {
      en: [{ from: "char siu (120 g)", to: "diced Chinese sausage (120 g)", note: "Brown it with the vegetables; reduce added salt by 1 g." }, { from: "shrimp (150 g)", to: "diced firm tofu (150 g)", note: "Pan-sear until golden before the rice." }],
      "zh-hant": [{ from: "叉燒（120 公克）", to: "切丁臘腸（120 公克）", note: "與蔬菜同炒上色，另加鹽減少 1 公克。" }, { from: "蝦仁（150 公克）", to: "硬豆腐丁（150 公克）", note: "先煎至金黃再炒飯。" }],
      ja: [{ from: "叉焼（120g）", to: "中国ソーセージの角切り（120g）", note: "野菜と焼き色をつけ、塩を1g減らす。" }, { from: "えび（150g）", to: "固い豆腐の角切り（150g）", note: "米を入れる前に黄金色に焼く。" }],
      ko: [{ from: "차슈(120g)", to: "깍둑썬 중국 소시지(120g)", note: "채소와 함께 갈색을 내고 소금은 1g 줄인다." }, { from: "새우(150g)", to: "단단한 두부 깍둑썰기(150g)", note: "밥보다 먼저 노릇하게 굽는다." }],
      th: [{ from: "หมูแดงจีน (120 กรัม)", to: "กุนเชียงจีนหั่นเต๋า (120 กรัม)", note: "ผัดให้สีเข้มพร้อมผักและลดเกลือที่เติม 1 กรัม" }, { from: "กุ้ง (150 กรัม)", to: "เต้าหู้แข็งหั่นเต๋า (150 กรัม)", note: "จี่ให้ทองก่อนใส่ข้าว" }]
    },
    storage: {
      en: "Cool fried rice within 1 hour, refrigerate airtight up to 3 days, and reheat once in a hot skillet until steaming throughout (74°C). Do not repeatedly cool and reheat rice.",
      "zh-hant": "炒飯 1 小時內放涼，密封冷藏最多 3 天；只回熱一次，以熱鍋加熱至全體冒蒸氣（74°C）。米飯不要反覆冷卻回熱。",
      ja: "炒飯は1時間以内に冷まし、密閉冷蔵3日まで。一度だけ熱いフライパンで全体が蒸気を出す（74℃）まで温める。米を何度も冷却・再加熱しない。",
      ko: "볶음밥은 1시간 안에 식혀 밀폐 냉장 3일까지 보관하고 뜨거운 팬에서 김이 날 때(74°C)까지 한 번만 데운다. 밥을 반복해 식히고 데우지 않는다.",
      th: "ทำข้าวผัดให้เย็นภายใน 1 ชั่วโมง แช่เย็นปิดสนิทได้ 3 วัน อุ่นครั้งเดียวในกระทะร้อนจนร้อนทั่วถึง 74°C อย่าทำข้าวเย็นและอุ่นซ้ำหลายรอบ"
    },
    culturalNotes: {
      en: "Yangzhou fried rice belongs to the refined Huaiyang culinary tradition. Outside Yangzhou it is often called ‘Yang Chow’ or ‘Young Chow,’ with versions differing in their mix of shrimp, roast pork, egg, and vegetables.",
      "zh-hant": "揚州炒飯屬於精緻的淮揚菜傳統；離開揚州後常見「楊州／揚州」等不同音譯，蝦、叉燒、蛋與蔬菜比例也各地有別。",
      ja: "揚州炒飯は洗練された淮揚料理の一つ。揚州以外では別の英語表記もあり、えび、叉焼、卵、野菜の組み合わせは地域で異なる。",
      ko: "양저우 볶음밥은 세련된 회양 요리 전통에 속한다. 양저우 밖에서는 ‘양차우’ 등으로도 불리며 새우·차슈·달걀·채소 조합은 지역마다 다르다.",
      th: "ข้าวผัดหยางโจวอยู่ในสายอาหารหวยหยางที่ประณีต นอกหยางโจวมักเรียกยังเชาและมีสัดส่วนกุ้ง หมูแดง ไข่ และผักต่างกันตามพื้นที่"
    },
    sources: [
      { title: "Omnivore's Cookbook — Yang Zhou Fried Rice (扬州炒饭)", url: "https://omnivorescookbook.com/yang-zhou-fried-rice/" },
      { title: "The Woks of Life — Young Chow Fried Rice", url: "https://thewoksoflife.com/young-chow-fried-rice/" }
    ],
    visualSpec: {
      en: "Real finished-dish brief: a shallow white bowl of dry, separate golden rice grains with visible pink shrimp, red-brown char siu cubes, yellow egg pieces, green peas, orange carrot dice, and scallion; no ketchup or gravy.",
      "zh-hant": "實拍成品視覺規格：淺白碗盛乾爽分明的金黃飯粒，清楚看見粉紅蝦仁、紅褐叉燒丁、黃色蛋粒、綠豌豆、橘色胡蘿蔔丁與青蔥；不可有番茄醬或湯汁。",
      ja: "実写完成品の仕様：浅い白鉢に乾いて一粒ずつ立つ黄金色のご飯を盛り、ピンクのえび、赤褐色の叉焼、黄色い卵、緑豆、オレンジのにんじん、ねぎを見せる。ケチャップやあんは置かない。",
      ko: "실사 완성품 사양: 얕은 흰 그릇에 보송하고 흩어진 황금빛 밥알을 담고 분홍 새우, 적갈색 차슈 큐브, 노란 달걀, 초록 완두콩, 주황 당근, 대파가 보이게 한다. 케첩이나 국물은 없다.",
      th: "ข้อกำหนดภาพจานเสร็จจริง: ชามตื้นสีขาวใส่ข้าวสีทองแห้งร่วน เห็นกุ้งสีชมพู หมูแดงเต๋าน้ำตาลแดง ไข่สีเหลือง ถั่วลันเตาเขียว แครอตส้ม และต้นหอมชัดเจน ห้ามมีซอสมะเขือเทศหรือน้ำราด"
    }
  }
];

const durationToMinutes = (duration) => {
  const hours = Number(duration.match(/(\d+)H/)?.[1] || 0);
  const minutes = Number(duration.match(/(\d+)M/)?.[1] || 0);
  return hours * 60 + minutes;
};

const localizedIngredientRows = (groups) => groups.en.map((_, index) => ingredient(
  groups.en[index].amount,
  ml(...locales.map((locale) => groups[locale][index].item))
));

const localizedStepRows = (groups, field = "text") => groups.en.map((_, index) => ml(
  ...locales.map((locale) => groups[locale][index][field])
));

const localizedTips = (groups) => groups.en.map((_, index) => ml(
  ...locales.map((locale) => groups[locale][index])
));

const localizedSubstitutions = (groups) => groups.en.map((_, index) => ml(
  ...locales.map((locale) => {
    const row = groups[locale][index];
    return `${row.from} → ${row.to}: ${row.note}`;
  })
));

const regions = {
  "sweet-sour-pork": ml("Guangdong, China", "中國廣東", "中国・広東", "중국 광둥", "กวางตุ้ง ประเทศจีน"),
  "char-siu": ml("Guangdong, China", "中國廣東", "中国・広東", "중국 광둥", "กวางตุ้ง ประเทศจีน"),
  "cantonese-steamed-fish": ml("Guangdong, China", "中國廣東", "中国・広東", "중국 광둥", "กวางตุ้ง ประเทศจีน"),
  "clay-pot-rice": ml("Hong Kong / Guangdong", "香港／廣東", "香港・広東", "홍콩·광둥", "ฮ่องกงและกวางตุ้ง"),
  "beef-chow-fun": ml("Guangdong, China", "中國廣東", "中国・広東", "중국 광둥", "กวางตุ้ง ประเทศจีน"),
  "wonton-soup": ml("Northern and Cantonese China", "中國北方與廣東", "中国北方・広東", "중국 북방·광둥", "จีนภาคเหนือและกวางตุ้ง"),
  jiaozi: ml("Northern China", "中國北方", "中国北方", "중국 북방", "จีนภาคเหนือ"),
  "scallion-pancakes": ml("Northern China", "中國北方", "中国北方", "중국 북방", "จีนภาคเหนือ"),
  "peking-duck": ml("Beijing, China", "中國北京", "中国・北京", "중국 베이징", "ปักกิ่ง ประเทศจีน"),
  "yangzhou-fried-rice": ml("Yangzhou, Jiangsu, China", "中國江蘇揚州", "中国江蘇省揚州", "중국 장쑤성 양저우", "หยางโจว มณฑลเจียงซู ประเทศจีน")
};

export const recipeDraftB = recipeDraftBSource.map((recipe) => ({
  id: recipe.id,
  cuisine: recipe.cuisine,
  region: regions[recipe.id],
  prepMinutes: durationToMinutes(recipe.prep),
  cookMinutes: durationToMinutes(recipe.cook),
  totalMinutes: durationToMinutes(recipe.total),
  servings: recipe.servings,
  name: ml(...locales.map((locale) => recipe.name[locale])),
  description: ml(...locales.map((locale) => recipe.description[locale])),
  ingredients: localizedIngredientRows(recipe.ingredients),
  instructions: localizedStepRows(recipe.instructions),
  tips: localizedTips(recipe.tips),
  commonMistakes: localizedTips(recipe.commonMistakes),
  substitutions: localizedSubstitutions(recipe.substitutions),
  storage: ml(...locales.map((locale) => recipe.storage[locale])),
  cultureNote: ml(...locales.map((locale) => recipe.culturalNotes[locale])),
  sources: recipe.sources,
  imageAlt: ml(...locales.map((locale) => recipe.visualSpec[locale])),
  visualSpec: recipe.visualSpec.en
}));

export default recipeDraftB;
