import { ingredient, makeTaiwaneseRecipe, ml, step } from "./taiwanese-recipe-helpers.mjs";

export const taiwaneseRecipesD = [
  makeTaiwaneseRecipe({
    id: "taiwanese-sausage", profile: "quick", prepMinutes: 1515, cookMinutes: 25, totalMinutes: 1540, servings: 10,
    name: ml("Homemade Taiwanese Sausage", "自製台灣香腸", "自家製台湾ソーセージ", "수제 대만 소시지", "ไส้กรอกไต้หวันทำเอง"),
    description: ml("Coarsely cut pork is seasoned with sugar, salt, soy, garlic, white pepper, and Kaoliang, stuffed into casings, refrigerated uncovered to dry, then gently pan-cooked.", "粗切豬肉以糖、鹽、醬油、蒜、白胡椒與高粱酒調味，灌入腸衣後全程冷藏裸放乾燥，再以水煎法安全煮熟。", "粗く切った豚肉を砂糖、塩、しょうゆ、にんにく、白こしょう、高粱酒で調味し、腸詰めにして冷蔵乾燥後、焼きます。", "굵게 썬 돼지고기를 설탕, 소금, 간장, 마늘, 흰 후추, 고량주로 양념해 케이싱에 채우고 냉장 건조 후 익힙니다.", "หมูหั่นหยาบปรุงน้ำตาล เกลือ ซีอิ๊ว กระเทียม พริกไทยขาว และเกาเหลียง ยัดไส้ แช่เย็นให้ผิวแห้ง แล้วจี่ให้สุก"),
    ingredients: [
      ingredient("1.2 kg", "pork shoulder, chilled, 8 mm dice", "冷藏梅花豬，切 8 毫米丁", "冷えた豚肩肉（8mm角）", "차가운 목살, 8mm 깍둑", "สันคอหมูแช่เย็น หั่นเต๋า 8 มม."),
      ingredient("300 g", "pork back fat, chilled, 6 mm dice", "冷藏豬背脂，切 6 毫米丁", "豚背脂（6mm角）", "차가운 돼지 등지방, 6mm", "มันหลังหมูแช่เย็น หั่น 6 มม."),
      ingredient("90 g", "sugar", "糖", "砂糖", "설탕", "น้ำตาล"),
      ingredient("24 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("35 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("60 ml", "Kaoliang or Taiwan rice wine", "高粱酒或台灣米酒", "高粱酒または台湾米酒", "고량주 또는 대만 미주", "เกาเหลียงหรือเหล้าข้าวไต้หวัน"),
      ingredient("20 g", "garlic, finely grated", "蒜，磨細", "にんにく（すりおろす）", "마늘, 곱게 간 것", "กระเทียม ขูดละเอียด"),
      ingredient("5 g", "ground white pepper", "白胡椒粉", "白こしょう", "흰 후추", "พริกไทยขาว"),
      ingredient("4 g", "five-spice powder", "五香粉", "五香粉", "오향분", "ผงพะโล้ห้าอย่าง"),
      ingredient("4 m", "30–32 mm natural hog casing, salt-packed", "30–32 毫米鹽漬天然豬腸衣", "豚腸（30〜32mm）", "30~32mm 천연 돈장", "ไส้หมูธรรมชาติ 30–32 มม. หมักเกลือ")
      ,ingredient("20 g", "raw garlic, thinly sliced for serving", "生蒜，切薄片供上桌", "生にんにく（薄切り、添える）", "생마늘, 얇게 썰어 곁들임", "กระเทียมดิบ ซอยบางสำหรับเสิร์ฟ")
    ],
    instructions: [
      step(ml("Sanitise and keep the meat cold", "消毒並維持低溫", "衛生と低温を保つ", "위생과 저온 유지", "รักษาความสะอาดและความเย็น"), ml("Sanitise grinder, stuffer, tray, and needle. Chill meat, fat, and tools to 0–4°C; keep the mixture below 10°C throughout and return it to the refrigerator whenever work pauses.", "絞肉機、灌腸器、托盤與針具消毒。肉、脂與器具降至 0–4°C，全程肉餡低於 10°C；一停工就放回冰箱。", "器具を消毒し、肉と脂を0〜4°C、作業中も10°C未満に保ちます。", "도구를 소독하고 고기와 지방을 0~4°C, 작업 중 10°C 아래로 유지합니다.", "ฆ่าเชื้ออุปกรณ์ แช่เนื้อ มัน และเครื่องมือที่ 0–4°C รักษาส่วนผสมต่ำกว่า 10°C")),
      step(ml("Mix to a sticky bind", "拌出黏性", "粘りが出るまで混ぜる", "끈기 나게 섞기", "คลุกจนเหนียว"), ml("Combine pork, fat, sugar, salt, soy, wine, garlic, pepper, and five-spice. Mix firmly for 3–4 minutes until the mass is tacky and strands cling to the bowl; cover and refrigerate 6–12 hours.", "豬肉、背脂、糖、鹽、醬油、酒、蒜、白胡椒與五香粉用力拌 3–4 分鐘，至肉餡黏手並拉絲附盆；密封冷藏 6–12 小時。", "材料を3〜4分、粘りが出るまで混ぜ、6〜12時間冷蔵します。", "재료를 3~4분 끈기 나게 섞어 6~12시간 냉장합니다.", "คลุกทุกอย่างแรง 3–4 นาทีจนเหนียวติดชาม ปิดแช่เย็น 6–12 ชั่วโมง")),
      step(ml("Test the seasoning", "煎熟試味", "味見用を焼く", "익혀 간 보기", "ทอดชิมรส"), ml("Pan-fry a 30 g patty until its centre reaches 71°C. Cool a bite before tasting, then adjust the raw mixture only by weighed amounts; never taste raw pork.", "取 30 公克肉餡煎至中心 71°C，放涼一口再試味；需要調整時只用秤重份量，絕不生食豬肉。", "30gを中心71°Cまで焼いて味見し、生肉は口にしません。", "30g 패티를 중심 71°C까지 익혀 맛보고 생고기는 먹지 않습니다.", "ทอดไส้ 30 กรัมจนใจกลาง 71°C พักแล้วชิม ห้ามชิมหมูดิบ")),
      step(ml("Prepare and stuff the casing", "處理腸衣並灌製", "腸に詰める", "케이싱 준비해 채우기", "เตรียมไส้และยัด"), ml("Rinse casing inside and out, soak in cool water 30 minutes, and flush again. Stuff loosely enough to bend, twist into 14 cm links, prick only visible air pockets with a sanitised fine needle, and refrigerate immediately.", "腸衣內外沖洗，冷水泡 30 分鐘再灌水沖；肉餡灌至可彎曲、不過緊，扭成 14 公分段，只以消毒細針刺可見氣泡，立刻冷藏。", "腸を洗って30分浸し、ゆるめに詰め14cmにひねり、気泡だけ刺します。", "케이싱을 씻어 30분 불리고 느슨하게 채워 14cm로 꼬아 공기만 찌릅니다.", "ล้างไส้ แช่ 30 นาที ยัดไม่แน่นเกิน บิดข้อ 14 ซม. เจาะเฉพาะฟองอากาศด้วยเข็มสะอาด")),
      step(ml("Dry only under refrigeration", "只在冷藏中乾燥", "冷蔵庫で乾かす", "냉장고에서만 건조", "ทำผิวแห้งในตู้เย็นเท่านั้น"), ml("Arrange links on a rack over a tray, uncovered in a refrigerator at 0–4°C for 12–18 hours, turning once. Do not hang raw sausage at room temperature; freeze if not cooking within 24 hours.", "香腸架在托盤上，0–4°C 冰箱不加蓋冷藏乾燥 12–18 小時，中途翻面；不可室溫吊掛，24 小時內不煮就冷凍。", "0〜4°Cの冷蔵庫で12〜18時間、覆わず乾かします。常温には吊りません。", "0~4°C 냉장고에서 12~18시간 덮지 않고 말리며 실온에 걸지 않습니다.", "วางบนตะแกรงในตู้เย็น 0–4°C ไม่ปิด 12–18 ชั่วโมง พลิกหนึ่งครั้ง ห้ามแขวนที่อุณหภูมิห้อง")),
      step(ml("Water-pan cook safely", "水煎至安全熟度", "水を使って焼く", "물 넣어 안전하게 익히기", "จี่น้ำจนสุกปลอดภัย"), ml("Put sausages in a skillet with 120 ml water, cover, and simmer over medium-low 8 minutes. Uncover, evaporate the water, add 5 ml oil, and turn until browned and every centre reaches 71°C; rest 3 minutes, slice, and serve with the raw garlic separately.", "香腸入鍋加 120 毫升水，中小火加蓋 8 分鐘；開蓋收乾，加 5 毫升油滾動煎上色，至每條中心 71°C。靜置 3 分鐘後切片，生蒜片另放供取用。", "水120mlで覆って8分、乾かして油で焼き、中心71°Cにします。3分休ませて切り、生にんにくを別添えします。", "물 120ml를 넣어 8분 덮어 익힌 뒤 물을 날리고 기름에 갈색을 내 중심 71°C로 익힙니다. 3분 쉬어 썰고 생마늘을 따로 냅니다.", "ใส่ไส้กรอกกับน้ำ 120 มล. ปิดฝา 8 นาที เปิดให้น้ำแห้ง เติมน้ำมัน 5 มล. จี่จนใจกลาง 71°C พัก 3 นาที หั่นและเสิร์ฟกระเทียมดิบแยก") )
    ],
    substitutions: [
      ml("If a stuffer is unavailable, shape the seasoned mixture into small patties and cook to 71°C; do not attempt unsafe improvised pressure stuffing.", "沒有灌腸器可把調味肉餡做成小肉餅並煎至 71°C，不要以危險的臨時加壓工具硬灌。", "詰め器がなければ小判形にして71°Cまで焼きます。", "스터퍼가 없으면 패티로 만들어 71°C까지 익히세요.", "ไม่มีเครื่องยัดให้ปั้นเป็นแผ่นและทอดถึง 71°C อย่าใช้เครื่องอัดดัดแปลงที่ไม่ปลอดภัย"),
      ml("Pork back fat can be replaced with fatty pork belly, but keep total fat close to 20% for a juicy texture.", "豬背脂可換肥五花，但總脂肪仍要接近 20%，口感才多汁。", "背脂は脂の多い豚バラに替え、脂肪約20%を保ちます。", "등지방 대신 기름진 삼겹살을 쓰되 총 지방을 약 20%로 맞춥니다.", "ใช้หมูสามชั้นมันแทนมันหลังได้ โดยคงไขมันรวมราว 20%")
    ],
    storage: ml("Refrigerate raw links at 0–4°C for no more than 24 hours after stuffing or freeze up to 1 month. Refrigerate cooked sausage up to 3 days and reheat to 74°C.", "生香腸灌製後在 0–4°C 冷藏不超過 24 小時，或冷凍最多 1 個月；熟香腸冷藏 3 天，回熱至 74°C。", "生は0〜4°Cで24時間以内、冷凍1か月。加熱後は冷蔵3日、74°Cまで再加熱します。", "생 소시지는 0~4°C에서 24시간 이내 또는 냉동 1개월, 익힌 것은 냉장 3일 후 74°C로 데웁니다.", "ไส้กรอกดิบแช่ 0–4°C ไม่เกิน 24 ชั่วโมงหรือแช่แข็ง 1 เดือน สุกแล้วแช่เย็น 3 วัน อุ่นถึง 74°C"),
    cultureNote: ml("Taiwanese sausage is sweeter, fresher, and less dried than Cantonese lap cheong. This safety-adapted home method dries only the surface under refrigeration and cooks the links fully.", "台灣香腸比廣式臘腸更甜、更新鮮且少乾燥；此安全化家庭法只在冷藏中乾燥表面，並把香腸完全煮熟。", "台湾ソーセージは広東の腊腸より甘く、生に近いタイプです。本レシピは冷蔵乾燥し完全加熱します。", "대만 소시지는 광둥 라창보다 달고 덜 건조하며 이 방식은 냉장 건조 후 완전히 익힙니다.", "ไส้กรอกไต้หวันหวาน สด และแห้งน้อยกว่ากุนเชียงกวางตุ้ง สูตรนี้ทำผิวแห้งในตู้เย็นและปรุงสุกทั่ว"),
    imageAlt: ml("Sliced glossy Taiwanese pork sausage with browned casing, coarse filling, and raw garlic slices", "切片台灣豬肉香腸，腸衣煎上色、粗粒肉餡多汁，旁配生蒜片", "焼き色の付いた台湾ソーセージと生にんにく", "갈색 케이싱과 굵은 소가 보이는 대만 소시지와 생마늘", "ไส้กรอกหมูไต้หวันหั่นกับกระเทียมดิบ"),
    visualSpec: "Plump reddish-brown Taiwanese sausage links, several sliced diagonally to show a juicy coarse filling, with thin raw garlic slices on the plate."
  }),

  makeTaiwaneseRecipe({
    id: "small-sausage-big-sausage", profile: "dough", prepMinutes: 390, cookMinutes: 45, totalMinutes: 435, servings: 6,
    name: ml("Small Sausage in Big Sausage", "大腸包小腸", "台湾もち米ソーセージサンド", "다창바오샤오창", "ไส้กรอกเล็กในไส้กรอกข้าวเหนียว"),
    description: ml("Grilled sweet pork sausage is tucked into a split glutinous-rice sausage with garlic, pickled cucumber, cilantro, and sweet chile sauce.", "烤香甜豬肉香腸夾進剖開的糯米腸，搭配蒜片、小黃瓜漬、香菜與甜辣醬，是台灣夜市經典。", "焼いた甘い豚ソーセージを割ったもち米腸に挟み、にんにく、きゅうり漬け、香菜、甘辛だれを添えます。", "구운 달콤한 돼지 소시지를 찹쌀 소시지에 끼워 마늘, 오이절임, 고수, 스위트 칠리소스를 곁들입니다.", "สอดไส้กรอกหมูหวานย่างในไส้กรอกข้าวเหนียวผ่า ใส่กระเทียม แตงกวาดอง ผักชี และซอสพริกหวาน"),
    ingredients: [
      ingredient("360 g", "long-grain glutinous rice, soaked 6 hours", "長糯米，浸泡 6 小時", "長粒もち米（6時間浸水）", "장립 찹쌀, 6시간 불림", "ข้าวเหนียวเมล็ดยาว แช่ 6 ชั่วโมง"),
      ingredient("500 ml", "water for steaming", "蒸煮用水", "蒸し水", "찜용 물", "น้ำสำหรับนึ่ง"),
      ingredient("15 ml", "neutral oil", "中性油", "植物油", "중성유", "น้ำมันรสกลาง"),
      ingredient("4 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("1.5 m", "38–42 mm natural hog casing, rinsed", "38–42 毫米天然豬腸衣，洗淨", "豚腸38〜42mm", "38~42mm 돈장", "ไส้หมูธรรมชาติ 38–42 มม. ล้าง"),
      ingredient("6", "fully cooked Taiwanese pork sausages", "全熟台灣豬肉香腸", "加熱済み台湾ソーセージ", "완전히 익힌 대만 소시지", "ไส้กรอกหมูไต้หวันสุก"),
      ingredient("180 g", "cucumber, thinly sliced", "小黃瓜，切薄片", "きゅうり（薄切り）", "오이, 얇게 썬 것", "แตงกวา ซอยบาง"),
      ingredient("25 ml", "rice vinegar", "米醋", "米酢", "쌀식초", "น้ำส้มสายชูข้าว"),
      ingredient("12 g", "sugar", "糖", "砂糖", "설탕", "น้ำตาล"),
      ingredient(ml("3 cloves", "3 瓣", "3片", "3쪽", "3 กลีบ"), "garlic, thinly sliced", "蒜頭，切薄片", "にんにく（薄切り）", "마늘, 얇게 썬 것", "กระเทียม ซอยบาง"),
      ingredient("20 g", "cilantro", "香菜", "香菜", "고수", "ผักชี"),
      ingredient("60 g", "Taiwan sweet chile sauce", "台灣甜辣醬", "台湾スイートチリソース", "대만 스위트 칠리소스", "ซอสพริกหวานไต้หวัน")
    ],
    instructions: [
      step(ml("Soak and season the rice", "泡米並調味", "もち米を浸して調味する", "찹쌀 불려 간하기", "แช่และปรุงข้าว"), ml("Rinse glutinous rice until water is mostly clear, soak in cool water 6 hours, and drain 20 minutes. Toss with oil and 4 g salt so the grains season evenly.", "長糯米洗至水大致清澈，冷水泡 6 小時，瀝 20 分鐘；拌油與 4 公克鹽，使米粒均勻調味。", "もち米を6時間浸し20分水切りし、油と塩を混ぜます。", "찹쌀을 6시간 불려 20분 물 빼고 기름과 소금을 섞습니다.", "ล้างข้าวเหนียว แช่ 6 ชั่วโมง สะเด็ด 20 นาที คลุกน้ำมันและเกลือ")),
      step(ml("Loosely fill the rice casing", "鬆鬆灌入糯米", "米をゆるく詰める", "찹쌀 느슨하게 채우기", "ยัดข้าวแบบหลวม"), ml("Tie one end of the rinsed casing and fill only 60% with rice, leaving room for expansion. Twist into six 18 cm links, prick air pockets, and tie firmly; overfilling will split the casing.", "洗淨腸衣一端綁好，只灌約六成糯米，保留膨脹空間；扭成六段各 18 公分，刺掉氣泡並綁緊，灌太滿會爆裂。", "腸に米を6割だけ詰め、18cmを6本作ります。", "케이싱에 찹쌀을 60%만 채워 18cm 여섯 개로 묶습니다.", "มัดปลายไส้ ยัดข้าวเพียง 60% บิด 6 ข้อ ยาว 18 ซม. เจาะฟองและมัดแน่น")),
      step(ml("Steam until the rice is tender", "蒸熟糯米腸", "もち米腸を蒸す", "찹쌀 소시지 찌기", "นึ่งไส้ข้าวจนสุก"), ml("Steam links over steady medium steam for 35–40 minutes, turning once at 20 minutes. Rest covered off heat 10 minutes; a grain from the centre must be fully translucent and chewy with no hard core.", "糯米腸以穩定中火蒸 35–40 分鐘，20 分鐘時翻面；關火加蓋靜置 10 分鐘，中心米粒應全透明軟 Q、無硬芯。", "中火で35〜40分蒸し、10分休ませ、芯がないことを確認します。", "중불로 35~40분 찌고 10분 쉬어 중심 쌀알에 단단한 심이 없게 합니다.", "นึ่งไฟกลาง 35–40 นาที พลิกที่ 20 นาที ปิดไฟพัก 10 นาที เมล็ดกลางต้องใสหนึบไม่มีแกนแข็ง")),
      step(ml("Quick-pickle the cucumber", "快漬小黃瓜", "きゅうりを即席漬けにする", "오이 빠르게 절이기", "ดองแตงกวาเร็ว"), ml("Mix cucumber with vinegar, sugar, and 2 g salt. Massage 30 seconds and rest 20 minutes, then drain very well so it does not soak the rice sausage.", "小黃瓜拌米醋、糖與 2 公克鹽，抓拌 30 秒、靜置 20 分鐘，再徹底瀝乾，避免浸濕米腸。", "きゅうりを酢、砂糖、塩で20分漬け、水気を切ります。", "오이를 식초, 설탕, 소금에 20분 절여 물기를 뺍니다.", "คลุกแตงกวากับน้ำส้ม น้ำตาล และเกลือ พัก 20 นาทีแล้วสะเด็ดมาก ๆ")),
      step(ml("Grill both sausages", "烤香兩種香腸", "二種類を焼く", "두 소시지 굽기", "ย่างไส้กรอกทั้งสอง"), ml("Brush rice sausages lightly with oil and grill or pan-sear over medium for 6–8 minutes until the casing is lightly crisp. Warm cooked pork sausages alongside until browned and 74°C throughout.", "糯米腸薄刷油，中火烤或煎 6–8 分鐘至腸衣微脆；熟豬肉香腸同時加熱上色，並確保各處 74°C。", "もち米腸を6〜8分焼き、豚ソーセージも74°Cまで温めます。", "찹쌀 소시지를 6~8분 굽고 익힌 돼지 소시지도 전체 74°C로 데웁니다.", "ทาน้ำมันบาง ๆ ย่างไส้ข้าว 6–8 นาที และอุ่นไส้หมูสุกจนทั่วถึง 74°C")),
      step(ml("Split, fill, and serve", "剖開夾餡上桌", "割って挟む", "갈라 채워 내기", "ผ่า ใส่ และเสิร์ฟ"), ml("Split each rice sausage lengthwise without cutting through the back. Add drained cucumber, garlic, cilantro, and one pork sausage, then drizzle 10 g sweet chile sauce. Serve immediately while the outside is crisp.", "糯米腸縱切但背面不斷，夾入瀝乾小黃瓜、蒜片、香菜與一條豬肉香腸，再淋 10 公克甜辣醬；趁外皮微脆立即吃。", "もち米腸を割り、きゅうり、にんにく、香菜、豚ソーセージ、たれを挟みます。", "찹쌀 소시지를 갈라 오이, 마늘, 고수, 돼지 소시지와 소스를 넣습니다.", "ผ่าไส้ข้าวไม่ขาด ใส่แตงกวา กระเทียม ผักชี ไส้หมู และซอส 10 กรัม เสิร์ฟทันที"))
    ],
    substitutions: [
      ml("Store-bought fully cooked glutinous-rice sausages may replace homemade ones; steam first, then grill until the centre is 74°C.", "可用市售全熟糯米腸，先蒸熱再烤至中心 74°C。", "市販の加熱済みもち米腸は蒸してから中心74°Cまで焼きます。", "시판 완숙 찹쌀 소시지는 먼저 찐 뒤 중심 74°C까지 굽습니다.", "ใช้ไส้ข้าวเหนียวสุกสำเร็จได้ นึ่งก่อนแล้วย่างจนใจกลาง 74°C"),
      ml("For a casing-free version, press steamed sticky rice into six oiled oval cakes, chill, then pan-sear both sides before splitting.", "無腸衣版可把蒸熟糯米壓成六個抹油橢圓餅，冷藏定型後煎兩面再剖開。", "腸なしなら蒸したもち米を楕円に固めて冷やし、両面を焼きます。", "케이싱 없이 찐 찹쌀을 타원형으로 눌러 식힌 뒤 양면을 굽습니다.", "แบบไม่ใช้ไส้ให้กดข้าวเหนียวนึ่งเป็นก้อนรี 6 ชิ้น แช่เย็นแล้วจี่สองด้าน")
    ],
    cultureNote: ml("The playful name describes a pork sausage nested inside a larger glutinous-rice sausage. Night-market versions vary in pickles and sauces, but the crisp-chewy rice casing and sweet pork link are central.", "名稱就是把小豬肉香腸包進較大的糯米腸；夜市配料各有變化，但外脆內 Q 的米腸與甜香腸是核心。", "小さな豚ソーセージを大きなもち米腸で包むことから名付けられました。", "작은 돼지 소시지를 큰 찹쌀 소시지에 넣는 모습에서 이름이 왔습니다.", "ชื่อนี้มาจากไส้กรอกหมูเล็กอยู่ในไส้กรอกข้าวเหนียวใหญ่ เครื่องดองและซอสแตกต่างกันได้"),
    imageAlt: ml("Taiwanese pork sausage inside a split grilled glutinous-rice sausage with cucumber, garlic, cilantro, and sweet chile sauce", "烤糯米腸剖開夾台灣香腸、小黃瓜、蒜、香菜與甜辣醬的大腸包小腸", "もち米腸に台湾ソーセージ、きゅうり、にんにく、香菜を挟んだ料理", "구운 찹쌀 소시지에 대만 소시지, 오이, 마늘, 고수와 소스를 채운 다창바오샤오창", "ไส้กรอกหมูในไส้ข้าวเหนียวย่างกับแตงกวา กระเทียม ผักชี และซอสพริกหวาน"),
    visualSpec: "A split grilled white glutinous-rice sausage used like a bun around one reddish pork sausage, with visible cucumber pickle, garlic slices, cilantro, and a thin red sauce drizzle."
  }),

  makeTaiwaneseRecipe({
    id: "milkfish-congee", profile: "braise", prepMinutes: 25, cookMinutes: 45, totalMinutes: 70, servings: 4,
    name: ml("Tainan Milkfish Congee", "台南虱目魚鹹粥", "台南サバヒー粥", "타이난 밀크피시 죽", "โจ๊กปลานวลจันทร์ทะเลไถหนาน"),
    description: ml("Boneless milkfish belly, fish-bone stock, cooked rice, ginger, celery, garlic crisp, and optional oysters form a grain-distinct Tainan savoury congee.", "無刺虱目魚肚、魚骨高湯、熟飯、薑、芹菜與蒜酥煮成米粒分明的台南鹹粥，可選加鮮蚵。", "骨なしサバヒー、魚骨スープ、ご飯、しょうが、セロリ、揚げにんにくの粒立つ台南風粥です。", "가시 제거 밀크피시 배, 생선뼈 육수, 밥, 생강, 셀러리와 마늘 튀김으로 쌀알이 살아 있는 타이난식 죽을 만듭니다.", "ปลานวลจันทร์ทะเลไร้ก้าง น้ำซุปกระดูกปลา ข้าวสุก ขิง ขึ้นฉ่าย และกระเทียมเจียวเป็นโจ๊กเค็มไถหนานที่ยังเห็นเมล็ดข้าว"),
    ingredients: [
      ingredient("700 g", "boneless milkfish belly and fillet, skin on", "無刺虱目魚肚與魚柳，帶皮", "骨なしサバヒー（皮付き）", "가시 제거 밀크피시 배와 필렛, 껍질 붙음", "ท้องและเนื้อปลานวลจันทร์ทะเลไร้ก้าง ติดหนัง"),
      ingredient("500 g", "milkfish bones and head, gills removed", "虱目魚骨與魚頭，去鰓", "サバヒーの骨と頭", "밀크피시 뼈와 머리, 아가미 제거", "ก้างและหัวปลา เอาเหงือกออก"),
      ingredient("1.6 L", "water", "水", "水", "물", "น้ำ"),
      ingredient("20 g", "ginger, julienned", "薑，切絲", "しょうが（千切り）", "생강, 채 썬 것", "ขิง ซอยเส้น"),
      ingredient("500 g", "cold cooked rice", "冷熟飯", "冷やご飯", "찬밥", "ข้าวสุกเย็น"),
      ingredient("180 g", "small oysters, drained, optional", "小蚵仔，瀝乾，可選", "小粒牡蠣（好みで）", "작은 굴, 선택", "หอยนางรมตัวเล็ก ตามชอบ"),
      ingredient("20 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("7 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("2 g", "ground white pepper", "白胡椒粉", "白こしょう", "흰 후추", "พริกไทยขาว"),
      ingredient("30 g", "Chinese celery, finely sliced", "芹菜，切細", "中国セロリ", "중국 셀러리", "ขึ้นฉ่ายจีน ซอย"),
      ingredient("25 g", "fried garlic", "蒜酥", "揚げにんにく", "마늘 튀김", "กระเทียมเจียว")
    ],
    instructions: [
      step(ml("Check every fillet for bones", "逐片檢查魚刺", "骨を確認する", "가시 확인하기", "ตรวจทุกชิ้นไม่ให้มีก้าง"), ml("Run clean fingertips across both sides of every fillet and remove pin bones with sanitised tweezers. Cut fish into 5 cm pieces, keep below 4°C, and never rely only on a 'boneless' label.", "乾淨指腹摸遍每片魚肉兩面，以消毒鑷子拔除細刺；切 5 公分塊並保持低於 4°C，不可只相信「無刺」標示。", "切り身の両面を指で確認し、骨を抜き、5cmに切って4°C未満に保ちます。", "필렛 양면을 손끝으로 확인해 잔가시를 제거하고 5cm로 잘라 4°C 아래에 둡니다.", "ลูบเนื้อปลาทั้งสองด้าน ถอนก้างด้วยแหนบสะอาด หั่น 5 ซม. และเก็บต่ำกว่า 4°C")),
      step(ml("Make clean fish stock", "熬清魚骨湯", "魚のスープを取る", "맑은 생선 육수 내기", "ต้มน้ำซุปปลาใส"), ml("Rinse bones and head, blanch 60 seconds, and rinse again. Add 1.6 L fresh water and half the ginger; simmer very gently 20 minutes, skimming, then strain through a fine sieve without pressing.", "魚骨魚頭沖洗、汆 60 秒再洗；加 1.6 公升清水與一半薑絲，極小火煮 20 分鐘並撇沫，再以細網過濾且不擠壓。", "骨を60秒下ゆでし、水1.6Lとしょうがで20分弱く煮てこします。", "뼈를 60초 데쳐 물 1.6L와 생강에 20분 약하게 끓여 거릅니다.", "ลวกก้างและหัว 60 วินาที ล้าง เติมน้ำ 1.6 ลิตรและขิงครึ่งหนึ่ง เคี่ยวอ่อน 20 นาทีแล้วกรอง")),
      step(ml("Heat rice without breaking it down", "煮熱米飯但保留米粒", "米粒を残して温める", "쌀알 살려 데우기", "อุ่นข้าวโดยไม่ให้เละ"), ml("Bring 1.3 L strained stock to a simmer. Add cooked rice, separate clumps gently, and cook 6–8 minutes; stop before the grains burst into a thick porridge.", "1.3 公升過濾高湯煮至微滾，加入熟飯輕輕撥散，煮 6–8 分鐘；米粒爆開成濃糊前就停。", "スープ1.3Lにご飯を加え6〜8分、粒を残して煮ます。", "육수 1.3L에 밥을 넣어 6~8분, 쌀알이 터지기 전까지 끓입니다.", "ใส่ข้าวสุกในน้ำซุป 1.3 ลิตร เคี่ยว 6–8 นาที แยกก้อนเบา ๆ และอย่าให้เมล็ดแตกเป็นโจ๊กข้น")),
      step(ml("Poach the milkfish", "汆熟虱目魚", "魚を静かに煮る", "밀크피시 익히기", "ลวกปลา"), ml("Add remaining ginger and milkfish pieces skin-side down. Hold at 85–90°C for 4–6 minutes without stirring until the thickest fish reaches 63°C and flakes with gentle pressure.", "加其餘薑絲，虱目魚皮面朝下放入，維持 85–90°C、不攪拌煮 4–6 分鐘，至最厚處 63°C 且輕壓會剝片。", "魚を皮目から入れ85〜90°Cで4〜6分、中心63°Cまで煮ます。", "생선을 껍질 아래로 넣어 85~90°C에서 4~6분, 중심 63°C까지 익힙니다.", "ใส่ปลาด้านหนังลง รักษา 85–90°C 4–6 นาทีโดยไม่คนจนจุดหนาสุด 63°C")),
      step(ml("Add oysters last", "最後才加蚵仔", "牡蠣は最後に加える", "굴 마지막에 넣기", "ใส่หอยท้ายสุด"), ml("If using oysters, add them only now and poach 60–90 seconds until opaque and 63°C. Add rice wine and 6 g salt, taste the broth, and add the final gram only if needed.", "若使用蚵仔，此時才加入並汆 60–90 秒至不透明且 63°C；加米酒與 6 公克鹽試味，需要才補最後 1 公克。", "牡蠣は最後に60〜90秒、63°Cまで煮て、米酒と塩で調えます。", "굴은 마지막에 60~90초, 63°C까지 익히고 미주와 소금으로 간합니다.", "ถ้าใช้หอย ใส่ตอนนี้ลวก 60–90 วินาทีจน 63°C เติมเหล้าข้าวและเกลือ 6 กรัม ชิมก่อนเพิ่ม")),
      step(ml("Finish without stirring", "不攪碎完成上桌", "崩さず仕上げる", "부수지 않고 담기", "จัดเสิร์ฟโดยไม่คนแตก"), ml("Ladle rice and broth into warm bowls, lifting fish pieces with a slotted spoon so they stay whole. Finish with celery, fried garlic, and white pepper; serve immediately.", "米飯與湯舀入溫碗，魚塊用漏勺托起保持完整；撒芹菜、蒜酥與白胡椒，立即上桌。", "魚を崩さず丼に盛り、セロリ、揚げにんにく、白こしょうを添えます。", "생선을 부수지 않게 건져 담고 셀러리, 마늘 튀김과 흰 후추를 올립니다.", "ตักข้าวและน้ำซุป ใช้กระชอนยกปลาให้ชิ้นคงรูป โรยขึ้นฉ่าย กระเทียมเจียว และพริกไทย"))
    ],
    substitutions: [
      ml("Boneless sea bass can replace milkfish; the flavour is different, but use the same 63°C doneness cue and disclose the substitution.", "無刺海鱸可替代虱目魚，風味不同但同樣以 63°C 為熟度，並註明替代。", "骨なしスズキでもよく、中心63°Cにします。", "가시 제거 농어를 쓸 수 있으며 중심 63°C로 익힙니다.", "ใช้ปลากะพงไร้ก้างแทนได้ รสต่างกันแต่ปรุงถึง 63°C"),
      ml("Omit oysters without replacement for a simpler bowl; increase milkfish to 850 g rather than adding unrelated seafood.", "不吃蚵可直接省略，虱目魚增至 850 公克，不必加無關海鮮。", "牡蠣は省き、魚を850gに増やせます。", "굴은 빼고 생선을 850g으로 늘릴 수 있습니다.", "ตัดหอยได้และเพิ่มปลาเป็น 850 กรัม ไม่ต้องใส่อาหารทะเลอื่น")
    ],
    storage: ml("Best served immediately. Cool within 1 hour, refrigerate fish and rice broth together for up to 1 day, and reheat gently to 74°C only once.", "最好現煮現吃；1 小時內放涼，魚與飯湯一起冷藏最多 1 天，只溫和回熱一次至 74°C。", "できたてが最良。1時間以内に冷まし冷蔵1日、74°Cまで一度だけ再加熱します。", "바로 먹는 것이 좋으며 1시간 안에 식혀 냉장 1일, 한 번만 74°C로 데웁니다.", "ดีที่สุดเมื่อทำเสร็จ พักเย็นภายใน 1 ชั่วโมง แช่เย็นไม่เกิน 1 วัน และอุ่นครั้งเดียวถึง 74°C"),
    cultureNote: ml("Tainan milkfish savoury congee is closer to rice soup than a broken-down Cantonese congee. Processed boneless milkfish is still checked by hand because the species has many fine bones.", "台南虱目魚鹹粥更接近飯湯，不是米粒完全化開的廣式粥；即使標示無刺仍要手摸檢查，因虱目魚細刺很多。", "台南の粥は米粒を残す飯湯に近く、サバヒーは骨なし表示でも確認します。", "타이난식은 쌀알이 살아 있는 밥국에 가깝고 밀크피시는 무가시 표시여도 확인해야 합니다.", "โจ๊กปลาไถหนานคล้ายข้าวต้มที่ยังเห็นเมล็ด และต้องตรวจปลาที่ระบุไร้ก้างด้วยมือเสมอ"),
    imageAlt: ml("Tainan milkfish savoury congee with intact rice grains, milkfish belly, ginger, celery, and fried garlic", "米粒分明、含虱目魚肚、薑絲、芹菜與蒜酥的台南虱目魚鹹粥", "米粒、サバヒー、しょうが、セロリ、揚げにんにくの台南粥", "쌀알, 밀크피시 배, 생강, 셀러리와 마늘 튀김의 타이난식 죽", "โจ๊กปลาไถหนานเห็นเมล็ดข้าวกับท้องปลา ขิง ขึ้นฉ่าย และกระเทียมเจียว"),
    visualSpec: "A clear savoury rice soup with distinct cooked rice grains, intact skin-on milkfish belly pieces, ginger threads, chopped celery, and fried garlic; not thick white porridge."
  }),

  makeTaiwaneseRecipe({
    id: "pineapple-cakes", profile: "dessert", prepMinutes: 190, cookMinutes: 70, totalMinutes: 260, servings: 18,
    name: ml("Taiwanese Pineapple Cakes", "台灣鳳梨酥", "台湾パイナップルケーキ", "대만 펑리수", "ขนมสับปะรดไต้หวัน"),
    description: ml("A tangy pineapple filling is cooked until moldable, wrapped in tender buttery pastry, pressed into rectangular molds, and baked on two sides.", "酸甜鳳梨餡炒至可塑，包入酥鬆奶油皮，壓入長方模並翻面烘烤，做出台灣鳳梨酥。", "酸味のあるパイナップル餡をバター生地で包み、長方形の型で両面焼きます。", "새콤한 파인애플 소를 버터 반죽으로 감싸 직사각 틀에 눌러 양면을 굽습니다.", "กวนไส้สับปะรดเปรี้ยวหวานจนปั้นได้ ห่อแป้งเนย กดพิมพ์สี่เหลี่ยม และอบสองด้าน"),
    ingredients: [
      ingredient("1.2 kg", "peeled fresh pineapple, finely chopped", "去皮新鮮鳳梨，切細", "生パイナップル（細かく刻む）", "손질한 생파인애플, 잘게 다짐", "สับปะรดสดปอก สับละเอียด"),
      ingredient("160 g", "sugar for filling", "餡用糖", "餡用砂糖", "소용 설탕", "น้ำตาลสำหรับไส้"),
      ingredient("35 g", "maltose", "麥芽糖", "麦芽糖", "맥아당", "มอลโทส"),
      ingredient("15 ml", "lemon juice", "檸檬汁", "レモン汁", "레몬즙", "น้ำมะนาวเลมอน"),
      ingredient("190 g", "unsalted butter, softened", "無鹽奶油，軟化", "無塩バター（柔らかく）", "무염버터, 부드럽게", "เนยจืด นุ่ม"),
      ingredient("70 g", "icing sugar", "糖粉", "粉砂糖", "슈가파우더", "น้ำตาลไอซิง"),
      ingredient("35 g", "egg yolk", "蛋黃", "卵黄", "달걀노른자", "ไข่แดง"),
      ingredient("260 g", "cake flour", "低筋麵粉", "薄力粉", "박력분", "แป้งเค้ก"),
      ingredient("35 g", "milk powder", "奶粉", "粉乳", "분유", "นมผง"),
      ingredient("3 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด")
    ],
    instructions: [
      step(ml("Cook out the pineapple water", "炒乾鳳梨水分", "パイナップルの水分を飛ばす", "파인애플 수분 날리기", "กวนไล่น้ำสับปะรด"), ml("Cook pineapple and sugar in a wide nonreactive pan over medium heat for 25–35 minutes, stirring often, until free liquid evaporates and the fruit gathers into a glossy mass.", "鳳梨與糖放寬面非反應鍋，中火炒 25–35 分鐘並常攪，至游離汁液蒸發、果肉聚成油亮團。", "パイナップルと砂糖を25〜35分、水分がなくなるまで煮ます。", "파인애플과 설탕을 25~35분, 물기가 없어 한 덩어리가 되게 볶습니다.", "กวนสับปะรดกับน้ำตาลในกระทะกว้าง 25–35 นาทีจนน้ำหมดและรวมเป็นก้อนเงา")),
      step(ml("Finish and portion the filling", "完成並分割內餡", "餡を仕上げて分ける", "소 완성해 나누기", "ทำไส้และแบ่ง"), ml("Add maltose and lemon juice and cook over medium-low 8–12 minutes until a spatula leaves a clean path for 2 seconds. Cool completely, chill 60 minutes, then divide into eighteen 28 g balls.", "加麥芽糖與檸檬汁，中小火再炒 8–12 分鐘，鍋鏟劃過痕跡可維持 2 秒；完全放涼、冷藏 60 分鐘，再分十八份各 28 公克。", "麦芽糖とレモンを加え8〜12分煮、冷やして28gを18個にします。", "맥아당과 레몬즙을 넣어 8~12분 볶고 식혀 28g씩 18개로 나눕니다.", "ใส่มอลโทสและน้ำเลมอน กวนอีก 8–12 นาที พักเย็น แช่ 60 นาที แบ่ง 18 ก้อน ก้อนละ 28 กรัม")),
      step(ml("Make the tender pastry", "拌酥鬆外皮", "生地を作る", "부드러운 반죽 만들기", "ทำแป้งร่วน"), ml("Beat butter and icing sugar on medium for 2 minutes until smooth but not fluffy. Mix in yolk. Sift flour, milk powder, and salt, fold just until no dry flour remains, flatten, wrap, and chill 30 minutes.", "奶油與糖粉中速打 2 分鐘至滑順但不蓬鬆，拌入蛋黃；篩入低筋麵粉、奶粉與鹽，只拌到無乾粉，壓扁包好冷藏 30 分鐘。", "バターと砂糖を2分混ぜ、卵黄と粉類を合わせ、30分冷蔵します。", "버터와 설탕을 2분 섞고 노른자와 가루를 넣어 한 덩어리로 만들어 30분 냉장합니다.", "ตีเนยกับไอซิง 2 นาที ใส่ไข่แดงและของแห้ง พอไม่เห็นแป้ง ห่อแช่เย็น 30 นาที")),
      step(ml("Wrap without thin spots", "均勻包餡", "薄い所なく包む", "얇은 곳 없이 감싸기", "ห่อให้หนาเท่ากัน"), ml("Divide pastry into eighteen 32 g pieces. Flatten one to a 9 cm round, place filling in the centre, and bring the edge up evenly; pinch closed and roll lightly so no dark filling shows through.", "外皮分十八份各 32 公克；每份壓成 9 公分圓，中央放餡，四周均勻往上收口，捏合後輕滾，外皮不可透出深色餡。", "生地32gで餡28gを均一に包み、餡が透けないよう閉じます。", "반죽 32g으로 소 28g을 고르게 감싸 소가 비치지 않게 봉합니다.", "แบ่งแป้ง 18 ก้อน ก้อนละ 32 กรัม ห่อไส้ 28 กรัมให้หนาเท่ากันและไม่เห็นไส้")),
      step(ml("Press into molds", "壓入鳳梨酥模", "型に押し込む", "틀에 누르기", "กดลงพิมพ์"), ml("Set eighteen 5 × 4 × 2 cm metal molds on a lined tray. Put one parcel in each and press with a flat tamper to fill corners and create a level top; chill the whole tray 15 minutes.", "十八個 5 × 4 × 2 公分金屬模排烤盤，每模放一顆，以平面壓具壓滿四角並整平頂面；整盤冷藏 15 分鐘。", "5×4×2cmの型に押し込み、角と表面を整えて15分冷やします。", "5×4×2cm 틀에 눌러 모서리와 윗면을 평평하게 하고 15분 냉장합니다.", "กดลงพิมพ์โลหะ 5×4×2 ซม. ให้เต็มมุมและหน้าเรียบ แช่เย็นทั้งถาด 15 นาที")),
      step(ml("Bake, flip, and cool", "烘烤翻面並冷卻", "焼いて返し、冷ます", "굽고 뒤집어 식히기", "อบ พลิก และพักเย็น"), ml("Bake in a preheated 170°C oven for 12 minutes. Wearing gloves, flip every mold and bake 10–12 minutes more until both faces are pale gold. Cool in molds 10 minutes, unmold, and cool completely before packing.", "170°C 預熱烤箱烤 12 分鐘；戴隔熱手套逐模翻面，再烤 10–12 分鐘至兩面淡金。留模 10 分鐘後脫模，完全放涼再包裝。", "170°Cで12分、型ごと返して10〜12分焼き、型で10分冷まして外します。", "170°C에서 12분 굽고 틀째 뒤집어 10~12분 더 구운 뒤 틀에서 10분 식힙니다.", "อบ 170°C 12 นาที พลิกทั้งพิมพ์ อบอีก 10–12 นาที พักในพิมพ์ 10 นาทีแล้วแกะ"))
    ],
    substitutions: [
      ml("For a milder traditional winter-melon blend, replace up to 40% of the drained pineapple weight with finely shredded winter melon and cook to the same endpoint.", "想做較溫和的冬瓜鳳梨餡，可用細絲冬瓜替代瀝乾鳳梨重量最多 40%，並炒到相同終點。", "パイナップルの40%まで冬瓜に替えられます。", "파인애플의 최대 40%를 동아로 대체할 수 있습니다.", "แทนสับปะรดไม่เกิน 40% ด้วยฟักเขียวขูดได้ และกวนถึงจุดเดียวกัน"),
      ml("If rectangular molds are unavailable, use sturdy 6 cm square metal rings; keep total parcel weight and bake by colour, not clock alone.", "無長方模可用堅固 6 公分方形金屬圈，總重量不變，以顏色而不只時間判斷。", "長方形型がなければ6cm角の金属型を使います。", "직사각 틀이 없으면 6cm 정사각 금속 링을 쓰세요.", "ไม่มีพิมพ์สี่เหลี่ยมผืนผ้า ใช้วงสี่เหลี่ยมโลหะ 6 ซม. และดูสีเป็นหลัก")
    ],
    storage: ml("Store completely cool cakes airtight at cool room temperature for up to 4 days or refrigerate up to 7 days. Bring to room temperature before serving; freeze up to 1 month.", "完全冷卻後密封，涼爽室溫最多 4 天或冷藏 7 天；食用前回溫，亦可冷凍 1 個月。", "完全に冷まして密閉し、常温4日、冷蔵7日、冷凍1か月。食べる前に常温へ戻します。", "완전히 식혀 밀폐해 서늘한 실온 4일, 냉장 7일, 냉동 1개월 보관하고 먹기 전 실온에 둡니다.", "พักเย็นสนิท เก็บปิดสนิทอุณหภูมิเย็น 4 วัน ตู้เย็น 7 วัน หรือแช่แข็ง 1 เดือน นำออกให้อุณหภูมิห้องก่อนกิน"),
    cultureNote: ml("Pineapple cakes are a major Taiwanese gift pastry. All-pineapple fillings are brighter and more fibrous, while traditional commercial styles may blend winter melon for a smoother, milder centre.", "鳳梨酥是台灣代表伴手禮；純鳳梨餡酸香纖維較明顯，傳統商業風格也常混冬瓜，口感更滑、味道更柔。", "鳳梨酥は台湾を代表する贈答菓子で、純パイナップル餡と冬瓜入りの穏やかな餡があります。", "펑리수는 대만 대표 선물 과자로 순수 파인애플 소와 동아를 섞은 부드러운 소가 있습니다.", "ขนมสับปะรดเป็นของฝากสำคัญของไต้หวัน ไส้สับปะรดล้วนเปรี้ยวและมีใยกว่า ส่วนแบบดั้งเดิมอาจผสมฟักเขียว"),
    imageAlt: ml("Rectangular Taiwanese pineapple cakes with pale-golden pastry and fibrous pineapple filling", "淡金長方形台灣鳳梨酥，切面可見纖維鳳梨餡", "淡い金色の長方形台湾パイナップルケーキと繊維のある餡", "옅은 금색 직사각 대만 펑리수와 섬유질 파인애플 소", "ขนมสับปะรดไต้หวันทรงสี่เหลี่ยมสีทองอ่อน เห็นไส้สับปะรดเป็นเส้นใย"),
    visualSpec: "Neat small rectangular pale-golden pastries, one cut open to show a dense amber fibrous pineapple filling; matte tender crust, not glossy puff pastry."
  })
];
