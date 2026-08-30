import { ingredient, makeTaiwaneseRecipe, ml, step } from "./taiwanese-recipe-helpers.mjs";

export const taiwaneseRecipesB = [
  makeTaiwaneseRecipe({
    id: "gua-bao", profile: "dough", prepMinutes: 150, cookMinutes: 130, totalMinutes: 280, servings: 8,
    name: ml("Gua Bao", "刈包", "台湾角煮まん", "과바오", "กัวเปา"),
    description: ml("Soft folded steamed buns hold soy-braised pork belly, pickled mustard greens, peanut sugar, and cilantro in the classic Taiwanese combination.", "柔軟荷葉包夾入醬滷五花肉、酸菜、花生糖粉與香菜，組成經典台灣刈包。", "柔らかな蒸しパンに豚角煮、漬け菜、ピーナッツ砂糖、香菜を挟みます。", "부드러운 접이식 찐빵에 간장 조림 삼겹살, 절임 갓, 땅콩 설탕과 고수를 채웁니다.", "หมั่นโถวพับนุ่มสอดหมูสามชั้นตุ๋น ผักกาดดอง ถั่วลิสงผสมน้ำตาล และผักชี"),
    ingredients: [
      ingredient("360 g", "all-purpose flour", "中筋麵粉", "中力粉", "중력분", "แป้งอเนกประสงค์"),
      ingredient("5 g", "instant yeast", "速發酵母", "インスタントドライイースト", "인스턴트 이스트", "ยีสต์แห้งสำเร็จรูป"),
      ingredient("25 g", "sugar for dough", "麵糰用糖", "生地用砂糖", "반죽용 설탕", "น้ำตาลสำหรับแป้ง"),
      ingredient("200 ml", "lukewarm water", "溫水", "ぬるま湯", "미지근한 물", "น้ำอุ่น"),
      ingredient("20 ml", "neutral oil, plus more for brushing", "中性油，另備刷麵用", "植物油（塗り用を含む）", "중성유, 바를 것 추가", "น้ำมันรสกลาง และสำหรับทา"),
      ingredient("800 g", "skin-on pork belly, 4 cm slabs", "帶皮五花肉，切 4 公分厚塊", "皮付き豚バラ（4cm）", "껍질 붙은 삼겹살, 4cm", "หมูสามชั้นติดหนัง หั่นชิ้น 4 ซม."),
      ingredient("70 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("60 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("35 g", "rock sugar", "冰糖", "氷砂糖", "빙탕", "น้ำตาลกรวด"),
      ingredient("700 ml", "hot water", "熱水", "湯", "뜨거운 물", "น้ำร้อน"),
      ingredient("200 g", "pickled mustard greens, rinsed and chopped", "酸菜，沖洗切碎", "高菜漬け（洗って刻む）", "절임 갓, 헹궈 다짐", "ผักกาดดอง ล้างและสับ"),
      ingredient("70 g", "roasted peanuts plus 25 g sugar, finely ground", "烤花生 70 公克加糖 25 公克，磨碎", "炒りピーナッツ70gと砂糖25g", "볶은 땅콩 70g과 설탕 25g", "ถั่วลิสงคั่ว 70 กรัมกับน้ำตาล 25 กรัม บด"),
      ingredient("25 g", "cilantro leaves", "香菜葉", "香菜", "고수 잎", "ใบผักชี")
    ],
    instructions: [
      step(ml("Knead and proof the bun dough", "揉麵並第一次發酵", "生地をこねて発酵する", "반죽하고 1차 발효", "นวดและหมักแป้ง"), ml("Mix flour, yeast, sugar, water, and 20 ml oil. Knead 8–10 minutes until smooth and elastic, cover, and proof at 26–28°C for 60–75 minutes until doubled; do not judge by time alone.", "麵粉、酵母、糖、溫水與 20 毫升油混合，揉 8–10 分鐘至光滑有彈性；加蓋在 26–28°C 發 60–75 分鐘至兩倍大，不只看時間。", "材料を8〜10分こね、26〜28°Cで60〜75分、2倍まで発酵させます。", "재료를 8~10분 반죽해 26~28°C에서 60~75분 두 배로 발효합니다.", "นวดส่วนผสม 8–10 นาทีจนเนียน หมักที่ 26–28°C 60–75 นาทีจนขึ้นสองเท่า")),
      step(ml("Shape and steam the buns", "整形並蒸荷葉包", "成形して蒸す", "성형해 찌기", "ขึ้นรูปและนึ่ง"), ml("Divide into eight 75 g pieces, roll each to a 15 × 8 cm oval, brush very lightly with oil, and fold over parchment. Proof 25 minutes, then steam over medium heat 10 minutes; turn off heat and wait 3 minutes before lifting the lid.", "分成八份各 75 公克，擀成 15 × 8 公分橢圓，薄刷油後隔烘焙紙對折。二發 25 分鐘，中火蒸 10 分鐘；關火等 3 分鐘再掀蓋。", "8個に分け楕円に伸ばして折り、25分発酵、10分蒸し、3分待って開けます。", "8개로 나눠 타원형으로 밀어 접고 25분 발효 후 10분 찌며 3분 기다려 뚜껑을 엽니다.", "แบ่ง 8 ก้อน รีดวงรี ทาน้ำมันพับ พัก 25 นาที นึ่งไฟกลาง 10 นาที ปิดไฟรอ 3 นาที")),
      step(ml("Blanch and season the pork", "汆燙並建立滷汁", "豚肉を下ゆでして調味する", "돼지고기 데쳐 양념하기", "ลวกและปรุงหมู"), ml("Blanch pork in boiling water for 5 minutes, drain, and rinse. Put it in a clean heavy pot with soy, rice wine, sugar, and 700 ml hot water; bring just to a simmer and skim once.", "五花肉滾水汆 5 分鐘，瀝乾沖洗；放乾淨厚鍋，加入醬油、米酒、冰糖與 700 毫升熱水，煮至微滾並撇沫。", "豚肉を5分下ゆでし、調味料と湯700mlで弱く煮立てます。", "돼지고기를 5분 데친 뒤 양념과 뜨거운 물 700ml에 약하게 끓입니다.", "ลวกหมู 5 นาที ล้าง แล้วตุ๋นกับซีอิ๊ว เหล้าข้าว น้ำตาล และน้ำร้อน 700 มล.")),
      step(ml("Braise until spoon-tender", "滷至可用湯匙切開", "柔らかく煮込む", "숟가락으로 잘릴 만큼 조리기", "ตุ๋นจนนุ่ม"), ml("Cover slightly ajar and simmer on low for 90–105 minutes, turning every 25 minutes. Stop when a skewer slides through the lean layer with little resistance and the sauce remains fluid; rest pork in the liquid 15 minutes.", "鍋蓋留縫，小火滷 90–105 分鐘，每 25 分鐘翻面；竹籤能輕鬆穿過瘦肉層且滷汁仍流動即可，關火浸 15 分鐘。", "ふたをずらして90〜105分煮込み、煮汁の中で15分休ませます。", "뚜껑을 살짝 열어 90~105분 조리고 국물에서 15분 쉽니다.", "แง้มฝาเคี่ยว 90–105 นาที พลิกทุก 25 นาที แล้วพักในน้ำตุ๋น 15 นาที")),
      step(ml("Cook the pickled greens", "炒香酸菜", "漬け菜を炒める", "절임 갓 볶기", "ผัดผักกาดดอง"), ml("Squeeze the rinsed mustard greens dry. Cook in 15 ml reserved pork fat or neutral oil over medium heat for 5 minutes, add 5 g sugar and 30 ml braising liquid, and cook until moist but not wet.", "酸菜沖洗後擠乾，以 15 毫升滷肉浮油或中性油中火炒 5 分鐘；加 5 公克糖與 30 毫升滷汁，炒至濕潤但不滴水。", "漬け菜を油で5分炒め、砂糖と煮汁を加えて水分を飛ばします。", "절임 갓을 기름에 5분 볶고 설탕과 조림 국물을 넣어 촉촉하게 만듭니다.", "บีบผักกาดดองให้แห้ง ผัดน้ำมัน 5 นาที เติมน้ำตาลและน้ำตุ๋นให้ชุ่มแต่ไม่แฉะ")),
      step(ml("Fill immediately before serving", "上桌前才組合", "食べる直前に挟む", "먹기 직전 채우기", "ประกอบก่อนเสิร์ฟ"), ml("Re-steam buns 3 minutes if cool. Slice pork across the layers, tuck one warm piece into each bun, then add 25 g mustard greens, 10 g peanut sugar, and cilantro. Spoon in no more than 10 ml sauce so the bun stays soft, not soggy.", "刈包若冷卻先回蒸 3 分鐘。五花肉逆層切片，每個夾一片熱肉、25 公克酸菜、10 公克花生糖粉與香菜；滷汁最多 10 毫升，避免麵皮濕爛。", "温めたパンに豚肉、漬け菜、ピーナッツ砂糖、香菜を挟み、煮汁は10ml以内にします。", "따뜻한 빵에 돼지고기, 절임 갓, 땅콩 설탕, 고수를 넣고 소스는 10ml 이하로 넣습니다.", "อุ่นหมั่นโถว ใส่หมู ผักกาดดอง ถั่วลิสงน้ำตาล และผักชี ราดน้ำตุ๋นไม่เกิน 10 มล."))
    ],
    substitutions: [
      ml("Use 800 g pork shoulder for a leaner filling and begin checking after 70 minutes; the result will be less gelatinous.", "較瘦可用 800 公克梅花肉，滷 70 分鐘後開始檢查，膠質會較少。", "豚肩肉なら70分から確認します。", "목살은 70분부터 확인하며 젤라틴감이 적습니다.", "ใช้สันคอหมู 800 กรัม เริ่มเช็กหลัง 70 นาที เนื้อจะมันน้อยกว่า"),
      ml("Store-bought plain folded bao may replace homemade buns; steam from chilled according to the package and never microwave them uncovered.", "可用市售無餡荷葉包，依包裝冷藏回蒸；不可不加蓋直接微波。", "市販の割包でもよく、表示通り蒸します。", "시판 접이식 바오는 포장대로 찌고 덮지 않은 채 전자레인지에 돌리지 마세요.", "ใช้หมั่นโถวพับสำเร็จได้ ให้นึ่งตามฉลากและอย่าไมโครเวฟโดยไม่คลุม")
    ],
    cultureNote: ml("Gua bao is sometimes nicknamed a 'tiger bites pig' because the folded white bun closes around pork. The peanut sugar and pickled greens are integral, not decorative garnishes.", "刈包因白麵皮夾肉也俗稱「虎咬豬」；花生糖粉與酸菜是完整風味的一部分，不只是裝飾。", "白い蒸しパンが豚肉を挟む姿から「虎咬猪」とも呼ばれ、ピーナッツ砂糖と漬け菜が重要です。", "흰 빵이 돼지고기를 무는 모양이라 '호랑이가 돼지를 문다'고도 하며 땅콩 설탕과 절임 갓이 핵심입니다.", "กัวเปาเรียกเล่น ๆ ว่าเสือกัดหมู เพราะแป้งขาวพับคร่อมหมู ถั่วลิสงน้ำตาลและผักดองเป็นส่วนสำคัญ"),
    imageAlt: ml("Gua bao filled with braised pork belly, pickled mustard greens, peanut sugar, and cilantro", "夾醬滷五花肉、酸菜、花生糖粉與香菜的台灣刈包", "豚角煮、漬け菜、ピーナッツ砂糖、香菜の割包", "조린 삼겹살, 절임 갓, 땅콩 설탕과 고수를 채운 과바오", "กัวเปาสอดหมูสามชั้นตุ๋น ผักกาดดอง ถั่วลิสงน้ำตาล และผักชี"),
    visualSpec: "One bright white folded steamed bun with a thick glossy pork-belly slice, dark chopped mustard greens, beige peanut powder, and fresh cilantro; no extra sauce pool."
  }),

  makeTaiwaneseRecipe({
    id: "dan-bing", profile: "quick", prepMinutes: 15, cookMinutes: 20, totalMinutes: 35, servings: 4,
    name: ml("Taiwanese Dan Bing", "台式蛋餅", "台湾風蛋餅", "대만식 단빙", "เครปไข่ไต้หวัน"),
    description: ml("Thin scallion crepes are cooked until chewy at the centre and crisp at the edges, bonded to soft egg, rolled, and served with soy paste.", "薄蔥粉漿煎成中心軟 Q、邊緣微脆的餅皮，與嫩蛋貼合後捲切，搭配醬油膏。", "ねぎ入りの薄い生地を卵と焼き、巻いてしょうゆだれを添えます。", "얇은 파 전병을 부드러운 달걀과 붙여 말아 간장 페이스트와 냅니다.", "ทอดแผ่นแป้งต้นหอมบางให้หนึบกลางกรอบขอบ ประกบไข่นุ่ม ม้วนหั่น เสิร์ฟซีอิ๊วข้น"),
    ingredients: [
      ingredient("120 g", "all-purpose flour", "中筋麵粉", "中力粉", "중력분", "แป้งอเนกประสงค์"),
      ingredient("25 g", "tapioca starch", "樹薯粉", "タピオカでんぷん", "타피오카 전분", "แป้งมันสำปะหลัง"),
      ingredient("300 ml", "cold water", "冷水", "冷水", "찬물", "น้ำเย็น"),
      ingredient("3 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("35 g", "scallions, finely sliced", "青蔥，切細", "小ねぎ（小口切り）", "대파, 잘게 썬 것", "ต้นหอม ซอยละเอียด"),
      ingredient("8", "large eggs", "大型雞蛋", "大きい卵", "큰 달걀", "ไข่ไก่ฟองใหญ่"),
      ingredient("30 ml", "neutral oil, divided", "中性油，分次使用", "植物油", "중성유", "น้ำมันรสกลาง"),
      ingredient("60 g", "Taiwan soy paste, for serving", "台灣醬油膏，供上桌", "台湾しょうゆだれ", "대만 간장 페이스트", "ซีอิ๊วข้นไต้หวัน")
    ],
    instructions: [
      step(ml("Mix and rest the batter", "調粉漿並靜置", "生地を混ぜて休ませる", "반죽 섞어 휴지", "ผสมและพักแป้ง"), ml("Whisk flour, tapioca starch, salt, and 250 ml water smooth, then whisk in the final 50 ml and half the scallions. Rest 15 minutes and stir from the bottom before every crepe.", "麵粉、樹薯粉、鹽與 250 毫升水攪滑，再拌入最後 50 毫升水與一半蔥花；靜置 15 分鐘，每張下鍋前由底部攪勻。", "粉類と水、ねぎを混ぜ15分休ませ、毎回底から混ぜます。", "가루와 물, 파를 섞어 15분 쉬고 매번 바닥부터 저어 씁니다.", "คนแป้ง เกลือ น้ำ และต้นหอม พัก 15 นาที คนจากก้นชามก่อนทำทุกแผ่น")),
      step(ml("Cook one thin crepe", "煎一張薄餅皮", "薄い生地を焼く", "얇은 전병 굽기", "ทอดแผ่นบาง"), ml("Heat a 24 cm nonstick skillet over medium for 2 minutes and wipe with 4 ml oil. Pour 90 ml batter, rotate immediately into a thin circle, and cook 75–90 seconds until the top loses its wet shine and the edge lifts.", "24 公分不沾鍋中火預熱 2 分鐘，薄抹 4 毫升油；倒 90 毫升粉漿立刻轉成薄圓，煎 75–90 秒至表面失去濕亮、邊緣翹起。", "24cmフライパンに生地90mlを薄く広げ、75〜90秒焼きます。", "24cm 팬에 반죽 90ml를 얇게 펴 75~90초 굽습니다.", "เทแป้ง 90 มล. ลงกระทะ 24 ซม. กลอกบาง ทอด 75–90 วินาที")),
      step(ml("Set the scallion egg", "煎蔥蛋", "ねぎ卵を焼く", "파 달걀 익히기", "ทอดไข่ต้นหอม"), ml("Lift the crepe to a plate. Beat two eggs with one-quarter of the remaining scallions, add 3 ml oil to the pan, pour in egg, and leave 15 seconds before gently spreading it to the crepe diameter.", "餅皮先盛盤；兩顆蛋加四分之一剩餘蔥花打散，鍋加 3 毫升油，倒蛋後靜置 15 秒，再輕推至餅皮大小。", "生地を取り出し、卵2個とねぎを流して15秒置き、同じ大きさに広げます。", "전병을 빼고 달걀 2개와 파를 부어 15초 둔 뒤 같은 크기로 폅니다.", "ยกแผ่นออก ตีไข่ 2 ฟองกับต้นหอม เทลงกระทะ พัก 15 วินาทีแล้วเกลี่ยเท่าแผ่น")),
      step(ml("Bond crepe to egg", "讓餅皮貼合蛋面", "生地を卵に重ねる", "전병을 달걀에 붙이기", "ประกบแผ่นกับไข่"), ml("Lay the cooked side of the crepe onto the still-moist egg and press gently. Cook 45 seconds until bonded, flip as one piece, and cook the crepe side 30–45 seconds until spotted gold but still flexible.", "餅皮熟面朝蛋鋪上並輕壓，煎 45 秒至貼合；整片翻面，再煎餅皮面 30–45 秒至金黃斑點但仍柔軟。", "生地を半熟卵に重ね45秒、返して30〜45秒焼きます。", "전병을 촉촉한 달걀에 올려 45초 붙이고 뒤집어 30~45초 굽습니다.", "วางแผ่นบนไข่ที่ยังชื้น กดทอด 45 วินาที พลิกทอดอีก 30–45 วินาที")),
      step(ml("Roll and brown the seam", "捲起並煎合收口", "巻いて継ぎ目を焼く", "말아 이음새 굽기", "ม้วนและจี่ตะเข็บ"), ml("Roll firmly with a spatula into a 4 cm cylinder. Put the seam down and cook 20 seconds, then roll once to colour another side; transfer to a board and rest 45 seconds before cutting.", "用鍋鏟緊實捲成直徑 4 公分，收口朝下煎 20 秒，再滾一次煎另一面；移砧板靜置 45 秒再切。", "直径4cmに巻き、継ぎ目を20秒焼き、45秒休ませます。", "지름 4cm로 말아 이음새를 20초 굽고 45초 쉽니다.", "ม้วนแน่นเส้นผ่านศูนย์กลาง 4 ซม. จี่ตะเข็บ 20 วินาที พัก 45 วินาที")),
      step(ml("Slice and repeat", "切段並完成其餘蛋餅", "切って残りも焼く", "썰고 나머지 굽기", "หั่นและทำที่เหลือ"), ml("Cut into six pieces with a sharp knife and serve with 15 g soy paste on the side. Wipe browned crumbs from the skillet and repeat three times, stirring batter each time so starch does not settle.", "以利刀切六段，旁放 15 公克醬油膏；擦掉鍋中焦屑，再做三份，每次粉漿都要攪勻避免澱粉沉底。", "6切れにし、しょうゆだれ15gを添え、残り3枚も同様に焼きます。", "6조각으로 썰어 간장 페이스트 15g과 내고 나머지 세 장도 만듭니다.", "หั่น 6 ชิ้น เสิร์ฟซีอิ๊วข้น 15 กรัม แล้วทำอีก 3 ชุด โดยคนแป้งทุกครั้ง"))
    ],
    substitutions: [
      ml("Potato starch can replace tapioca starch gram for gram; the crepe will be slightly less elastic.", "樹薯粉可等重換馬鈴薯澱粉，餅皮彈性會稍低。", "タピオカでんぷんは片栗粉に同量で替えられます。", "타피오카 전분은 감자전분으로 같은 무게 대체할 수 있습니다.", "ใช้แป้งมันฝรั่งแทนแป้งมันสำปะหลังน้ำหนักเท่ากันได้ แต่จะยืดหยุ่นน้อยลง"),
      ml("For a filled version, add at most 25 g grated cheese or cooked corn after bonding; too much filling prevents a tight roll.", "加料版可在貼合後放最多 25 公克刨絲起司或熟玉米；餡太多會捲不緊。", "具はチーズやコーンを25g以内にします。", "치즈나 옥수수는 25g 이하로 넣어야 잘 말립니다.", "เพิ่มชีสขูดหรือข้าวโพดสุกได้ไม่เกิน 25 กรัม เพื่อให้ม้วนแน่น")
    ],
    cultureNote: ml("Dan bing is a Taiwanese breakfast staple. The home-mixed batter version should remain thin and pleasantly chewy; it is neither a thick scallion pancake nor a fluffy omelette.", "蛋餅是台灣早餐基本款；自調粉漿版應薄而軟 Q，不是厚蔥油餅，也不是蓬鬆歐姆蛋。", "蛋餅は台湾朝食の定番で、薄くもちっとし、厚い葱餅やオムレツとは異なります。", "단빙은 대만 아침의 기본이며 얇고 쫄깃해야지 두꺼운 파전이나 폭신한 오믈렛이 아닙니다.", "ตั้นปิ่งเป็นอาหารเช้าไต้หวัน แผ่นต้องบางหนึบ ไม่ใช่แพนเค้กต้นหอมหนาหรือไข่เจียวฟู"),
    imageAlt: ml("Sliced rolled Taiwanese dan bing with scallions and soy paste", "切段台式蔥花蛋餅與旁放醬油膏", "ねぎ入り台湾蛋餅としょうゆだれ", "파가 든 대만식 단빙과 간장 페이스트", "เครปไข่ต้นหอมไต้หวันหั่นชิ้นกับซีอิ๊วข้น"),
    visualSpec: "A tightly rolled, sliced egg crepe with thin pale-golden chewy wrapper, visible yellow egg and green scallion flecks, plus a small dish of dark soy paste."
  }),

  makeTaiwaneseRecipe({
    id: "chiayi-turkey-rice", profile: "quick", prepMinutes: 25, cookMinutes: 55, totalMinutes: 80, servings: 4,
    name: ml("Chiayi Turkey Rice", "嘉義火雞肉飯", "嘉義風七面鳥ご飯", "자이식 칠면조 덮밥", "ข้าวหน้าไก่งวงเจียอี้"),
    description: ml("Juicy shredded turkey, shallot oil, light turkey gravy, crisp shallots, and pickled radish are layered over hot rice in Chiayi's celebrated bowl.", "多汁火雞絲、油蔥香、清爽雞汁、油蔥酥與黃蘿蔔層疊在熱飯上，重現嘉義代表小吃。", "七面鳥、ねぎ油、軽い肉汁、揚げねぎ、たくあんをご飯に重ねます。", "촉촉한 칠면조, 샬롯 기름, 가벼운 육즙, 튀긴 샬롯과 단무지를 밥에 얹습니다.", "วางไก่งวงฉีกฉ่ำ น้ำมันหอมแดง น้ำราดใส หอมเจียว และหัวไชเท้าดองบนข้าวร้อน"),
    ingredients: [
      ingredient("900 g", "bone-in turkey breast", "帶骨火雞胸", "骨付き七面鳥胸肉", "뼈 있는 칠면조 가슴", "อกไก่งวงติดกระดูก"),
      ingredient("1.5 L", "water", "水", "水", "물", "น้ำ"),
      ingredient("25 g", "ginger, sliced", "薑，切片", "しょうが", "생강", "ขิง หั่น"),
      ingredient("4", "scallions, bruised", "青蔥，拍裂", "長ねぎ", "대파", "ต้นหอม ทุบ"),
      ingredient("100 g", "shallots, thinly sliced", "紅蔥頭，切薄片", "エシャロット", "샬롯", "หอมแดง ซอย"),
      ingredient("80 ml", "neutral oil", "中性油", "植物油", "중성유", "น้ำมันรสกลาง"),
      ingredient("250 ml", "strained turkey stock", "過濾火雞高湯", "七面鳥スープ", "거른 칠면조 육수", "น้ำต้มไก่งวงกรอง"),
      ingredient("25 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("8 g", "sugar", "糖", "砂糖", "설탕", "น้ำตาล"),
      ingredient("800 g", "hot cooked rice", "熱白飯", "温かいご飯", "따뜻한 밥", "ข้าวสวยร้อน"),
      ingredient("80 g", "yellow pickled radish, thinly sliced", "黃蘿蔔，切薄片", "たくあん", "단무지", "หัวไชเท้าดองเหลือง")
    ],
    instructions: [
      step(ml("Poach the turkey gently", "低溫煮熟火雞", "七面鳥を静かにゆでる", "칠면조 부드럽게 삶기", "ต้มไก่งวงไฟอ่อน"), ml("Put turkey, water, ginger, and scallions in a snug pot. Bring just to a simmer, cover, and cook over low heat 28–35 minutes until the thickest part reaches 74°C; do not boil hard.", "火雞、水、薑與青蔥放尺寸合適的鍋，煮至微滾後加蓋小火 28–35 分鐘，至最厚處 74°C；不可大滾。", "七面鳥を弱く28〜35分、中心74°Cまでゆでます。", "칠면조를 약하게 28~35분, 중심 74°C까지 삶습니다.", "ต้มไก่งวงเดือดปุดอ่อน 28–35 นาทีจนจุดหนาสุด 74°C")),
      step(ml("Rest and shred", "靜置後手撕", "休ませて裂く", "쉬었다 찢기", "พักและฉีก"), ml("Transfer turkey to a tray, tent loosely, and rest 15 minutes. Remove skin and bone, then pull the meat along the grain into 5–7 cm thin shreds; toss with 30 ml warm stock.", "火雞移盤鬆蓋靜置 15 分鐘；去皮骨，順紋撕成 5–7 公分細絲，再拌 30 毫升溫高湯保濕。", "15分休ませ、皮と骨を除き細く裂いてスープ30mlを和えます。", "15분 쉬고 껍질과 뼈를 제거해 가늘게 찢은 뒤 육수 30ml와 섞습니다.", "พัก 15 นาที เอาหนังและกระดูกออก ฉีกเป็นเส้น 5–7 ซม. คลุกน้ำต้ม 30 มล.")),
      step(ml("Make crisp shallots and oil", "炸油蔥酥與蔥油", "揚げねぎと油を作る", "샬롯과 기름 만들기", "เจียวหอมและเก็บน้ำมัน"), ml("Fry shallots in oil over medium-low for 9–11 minutes. Stir constantly after pale gold and remove at deep gold; they darken after draining. Reserve 45 ml fragrant oil and all crisp shallots.", "紅蔥頭中小火炸 9–11 分鐘，淡金後不停攪拌，深金黃即撈；離油後還會變深。保留 45 毫升蔥油與全部油蔥酥。", "エシャロットを9〜11分揚げ、油45mlと揚げねぎを取っておきます。", "샬롯을 9~11분 튀겨 기름 45ml와 샬롯을 보관합니다.", "เจียวหอม 9–11 นาที เก็บน้ำมันหอม 45 มล. และหอมกรอบ")),
      step(ml("Reduce the light gravy", "煮清爽雞汁", "軽いたれを作る", "가벼운 소스 만들기", "ทำน้ำราดใส"), ml("Simmer 250 ml strained stock, soy sauce, sugar, and 15 ml shallot oil for 8–10 minutes until reduced to 180 ml. It should taste savoury but lighter than braising sauce.", "250 毫升過濾高湯、醬油、糖與 15 毫升蔥油小滾 8–10 分鐘，收至 180 毫升；味道鮮鹹但應比滷汁清淡。", "スープ、しょうゆ、砂糖、ねぎ油を180mlまで煮詰めます。", "육수, 간장, 설탕, 샬롯 기름을 180ml가 되게 졸입니다.", "เคี่ยวน้ำต้ม ซีอิ๊ว น้ำตาล และน้ำมันหอมจนเหลือ 180 มล.")),
      step(ml("Warm without drying", "回溫但不煮乾", "乾かさず温める", "마르지 않게 데우기", "อุ่นโดยไม่ให้แห้ง"), ml("Put shredded turkey in a small pan with 60 ml gravy, cover, and warm over low heat for 2–3 minutes only. Remove as soon as steaming; prolonged simmering makes breast meat chalky.", "火雞絲加 60 毫升雞汁，小火加蓋只回溫 2–3 分鐘；一冒蒸氣就離火，久煮會使胸肉乾粉。", "七面鳥をたれ60mlで2〜3分だけ温めます。", "칠면조를 소스 60ml에 2~3분만 데웁니다.", "อุ่นไก่งวงกับน้ำราด 60 มล. ปิดฝาไฟอ่อนเพียง 2–3 นาที")),
      step(ml("Layer the bowls", "分層組合雞肉飯", "丼に重ねる", "그릇에 층층이 담기", "จัดชามเป็นชั้น"), ml("Divide rice into four bowls. Drizzle each with 7 ml shallot oil, fan 120 g warm turkey over the top, spoon over 25–30 ml gravy, and finish with crisp shallots and pickled radish.", "白飯分四碗，每碗先淋 7 毫升蔥油，鋪 120 公克溫火雞絲，淋 25–30 毫升雞汁，最後放油蔥酥與黃蘿蔔。", "ご飯にねぎ油、七面鳥120g、たれ25〜30ml、揚げねぎ、たくあんを盛ります。", "밥에 샬롯 기름, 칠면조 120g, 소스 25~30ml, 튀긴 샬롯과 단무지를 얹습니다.", "แบ่งข้าว ราดน้ำมันหอม 7 มล. วางไก่งวง 120 กรัม น้ำราด 25–30 มล. หอมเจียวและหัวไชเท้าดอง"))
    ],
    substitutions: [
      ml("Bone-in chicken breast can replace turkey; poach to 74°C and call the result Chiayi-style chicken rice rather than turkey rice.", "可用帶骨雞胸並煮至 74°C，但成品應稱嘉義雞肉飯，不是火雞肉飯。", "骨付き鶏胸肉なら74°Cまでゆで、嘉義風鶏肉飯と呼びます。", "뼈 있는 닭가슴살을 74°C까지 익히고 자이식 닭고기밥으로 부릅니다.", "ใช้อกไก่ติดกระดูกต้มถึง 74°C ได้ แต่ควรเรียกข้าวหน้าไก่แบบเจียอี้ ไม่ใช่ไก่งวง"),
      ml("If fresh shallots are unavailable, use 35 g commercial fried shallots and 30 ml chicken fat or neutral oil; check the label for salt.", "無新鮮紅蔥可用 35 公克市售油蔥酥與 30 毫升雞油或中性油，並先確認產品鹽分。", "市販の揚げねぎ35gと鶏油30mlでも代用できます。", "시판 튀긴 샬롯 35g과 닭기름 30ml를 쓸 수 있습니다.", "ใช้หอมเจียวสำเร็จ 35 กรัมกับมันไก่ 30 มล. ได้ แต่เช็กความเค็ม")
    ],
    cultureNote: ml("Chiayi turkey rice is intentionally restrained: moist turkey, aromatic fat, light gravy, and rice. A dark heavy braise would turn it into a different bowl.", "嘉義火雞肉飯講究節制：濕潤火雞、香油、清雞汁與飯；深色濃滷會變成另一種蓋飯。", "嘉義の七面鳥飯は、しっとりした肉、香味油、軽いたれ、ご飯の控えめなバランスが特徴です。", "자이 칠면조밥은 촉촉한 고기, 향기름, 가벼운 소스와 밥의 절제된 균형이 핵심입니다.", "ข้าวไก่งวงเจียอี้เน้นความเรียบง่าย เนื้อฉ่ำ ไขมันหอม น้ำราดเบา และข้าว"),
    imageAlt: ml("Chiayi turkey rice with shredded turkey, light gravy, crisp shallots, and yellow pickled radish", "鋪火雞絲、清雞汁、油蔥酥與黃蘿蔔的嘉義火雞肉飯", "七面鳥、軽いたれ、揚げねぎ、たくあんの嘉義風ご飯", "칠면조, 가벼운 소스, 튀긴 샬롯과 단무지를 얹은 자이식 덮밥", "ข้าวหน้าไก่งวงเจียอี้กับน้ำราดใส หอมเจียว และหัวไชเท้าดองเหลือง"),
    visualSpec: "White rice covered with neat pale turkey shreds, a translucent light-brown gravy sheen, crisp golden shallots, and a few thin yellow pickled-radish slices; no dark braised pork."
  }),

  makeTaiwaneseRecipe({
    id: "danzai-noodles", profile: "braise", prepMinutes: 35, cookMinutes: 90, totalMinutes: 125, servings: 6,
    name: ml("Tainan Danzai Noodles", "台南擔仔麵", "台南担仔麺", "타이난 단짜이몐", "บะหมี่ตานไจ๋ไถหนาน"),
    description: ml("Small bowls of wheat noodles receive shrimp-and-pork stock, fragrant minced pork sauce, bean sprouts, one shrimp, garlic, and cilantro.", "小碗麵加入蝦殼豬骨湯、香滷肉燥、豆芽、一尾蝦、蒜泥與香菜，呈現台南擔仔麵的精巧份量。", "小ぶりの麺に海老と豚のスープ、肉そぼろ、もやし、海老、にんにく、香菜を添えます。", "작은 그릇에 새우·돼지 육수, 다진 돼지고기 소스, 숙주, 새우 한 마리, 마늘과 고수를 담습니다.", "ชามเล็กใส่เส้น น้ำซุปกุ้งหมู หมูสับตุ๋น ถั่วงอก กุ้งหนึ่งตัว กระเทียม และผักชี"),
    ingredients: [
      ingredient("350 g", "shell-on shrimp", "帶殼蝦", "殻付き海老", "껍질 있는 새우", "กุ้งทั้งเปลือก"),
      ingredient("700 g", "pork neck bones", "豬頸骨", "豚首骨", "돼지 목뼈", "กระดูกคอหมู"),
      ingredient("2.2 L", "water", "水", "水", "물", "น้ำ"),
      ingredient("350 g", "coarsely minced pork shoulder", "粗絞梅花豬", "粗びき豚肩肉", "굵게 간 목살", "หมูสันคอบดหยาบ"),
      ingredient("50 g", "shallots, minced", "紅蔥頭，切末", "エシャロット（みじん）", "샬롯, 다짐", "หอมแดง สับ"),
      ingredient("15 g", "garlic, minced, plus 10 g raw for serving", "蒜末 15 公克，另備生蒜泥 10 公克", "にんにく15g＋生10g", "다진 마늘 15g + 생마늘 10g", "กระเทียมสับ 15 กรัม และดิบ 10 กรัม"),
      ingredient("45 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("30 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("12 g", "rock sugar", "冰糖", "氷砂糖", "빙탕", "น้ำตาลกรวด"),
      ingredient("600 g", "fresh thin wheat noodles", "新鮮細小麥麵", "細い生中華麺", "가는 생 밀국수", "เส้นข้าวสาลีสดเส้นเล็ก"),
      ingredient("180 g", "bean sprouts, trimmed", "豆芽，摘根", "もやし", "숙주", "ถั่วงอก"),
      ingredient("20 g", "cilantro", "香菜", "香菜", "고수", "ผักชี")
    ],
    instructions: [
      step(ml("Make shrimp-pork stock", "熬蝦豬高湯", "海老と豚のスープを取る", "새우 돼지 육수 내기", "ต้มน้ำซุปกุ้งหมู"), ml("Peel shrimp, keeping six whole and refrigerating them. Rinse shells and pork bones, cover with 2.2 L cold water, bring to a bare simmer, skim, and cook uncovered 60 minutes; strain without pressing solids.", "蝦去殼，保留六尾完整蝦仁冷藏。蝦殼與豬骨沖洗，加 2.2 公升冷水煮至微滾，撇沫後不加蓋熬 60 分鐘；過濾時不擠壓固體。", "海老殻と豚骨を水2.2Lで60分弱く煮て、押さずにこします。", "새우 껍질과 돼지뼈를 물 2.2L에 60분 약하게 끓여 누르지 않고 거릅니다.", "ต้มเปลือกกุ้งและกระดูกหมูกับน้ำ 2.2 ลิตรไฟอ่อน 60 นาที แล้วกรองโดยไม่กด")),
      step(ml("Brown the minced pork", "炒香肉燥", "豚そぼろを炒める", "다진 돼지고기 볶기", "ผัดหมูสับ"), ml("Cook pork in a heavy saucepan over medium heat for 8–10 minutes, breaking it into 5 mm crumbles, until moisture evaporates and edges brown. Add shallots and 15 g garlic and cook 3 minutes.", "粗絞肉厚鍋中火炒 8–10 分鐘，拆成約 5 毫米顆粒，至水分蒸發、邊緣上色；加紅蔥與 15 公克蒜末炒 3 分鐘。", "豚肉を8〜10分炒め、ねぎとにんにくを3分加熱します。", "돼지고기를 8~10분 볶고 샬롯과 마늘을 3분 더 볶습니다.", "ผัดหมู 8–10 นาทีให้เป็นเม็ด 5 มม. เติมหอมแดงและกระเทียมผัด 3 นาที")),
      step(ml("Braise the pork sauce", "滷製肉燥", "肉そぼろを煮る", "돼지고기 소스 조리기", "ตุ๋นหมูสับ"), ml("Add soy sauce, rice wine, sugar, and 350 ml strained stock. Simmer uncovered over low heat for 25–30 minutes until pork is tender and the liquid is reduced but still spoonable; keep warm.", "加醬油、米酒、冰糖與 350 毫升過濾高湯，小火不加蓋煮 25–30 分鐘，至肉嫩、湯汁減少但仍可舀取；保溫。", "調味料とスープ350mlを加え25〜30分煮ます。", "양념과 육수 350ml를 넣어 25~30분 조립니다.", "เติมซีอิ๊ว เหล้าข้าว น้ำตาล และน้ำซุป 350 มล. เคี่ยว 25–30 นาที")),
      step(ml("Poach shrimp and blanch sprouts", "汆燙蝦與豆芽", "海老ともやしをゆでる", "새우와 숙주 데치기", "ลวกกุ้งและถั่วงอก"), ml("Bring 500 ml stock to a gentle simmer. Poach the six shrimp 60–90 seconds until opaque and 63°C, remove, then blanch bean sprouts 30 seconds and drain. Keep this stock for the bowls.", "取 500 毫升高湯微滾，六尾蝦仁汆 60–90 秒至不透明且 63°C，撈出；豆芽再汆 30 秒瀝乾，此鍋湯保留供組合。", "スープで海老を60〜90秒、63°Cまで、もやしを30秒ゆでます。", "육수에서 새우를 60~90초, 63°C까지 익히고 숙주를 30초 데칩니다.", "ลวกกุ้งในน้ำซุป 60–90 วินาทีจน 63°C แล้วลวกถั่วงอก 30 วินาที")),
      step(ml("Cook and portion noodles", "煮麵分碗", "麺をゆでて分ける", "면 삶아 나누기", "ต้มและแบ่งเส้น"), ml("Boil noodles in a separate unsalted pot until just tender, usually 90–150 seconds. Drain thoroughly and divide 100 g cooked noodles and 30 g sprouts among six small warm bowls.", "另鍋無鹽水煮麵至剛熟，通常 90–150 秒；徹底瀝乾，每個小溫碗放 100 公克熟麵與 30 公克豆芽。", "別鍋で麺を90〜150秒ゆで、6つの小丼に分けます。", "별도 냄비에서 면을 90~150초 삶아 여섯 작은 그릇에 나눕니다.", "ต้มเส้นในหม้อแยก 90–150 วินาที แบ่งชามเล็ก 6 ใบ")),
      step(ml("Finish each small bowl", "完成每碗擔仔麵", "小丼を仕上げる", "작은 그릇 완성", "จัดชามเล็ก"), ml("Pour 180 ml hot stock into each bowl, add 45 g pork sauce, one shrimp, a small pinch of raw garlic, and cilantro. Serve at once; the bowl is deliberately modest, not a large soup-noodle portion.", "每碗注入 180 毫升熱高湯，加 45 公克肉燥、一尾蝦、少量生蒜泥與香菜，立即上桌；份量刻意小巧，不是大碗湯麵。", "各丼にスープ180ml、肉そぼろ45g、海老1尾、にんにく、香菜を盛ります。", "각 그릇에 육수 180ml, 돼지고기 45g, 새우 한 마리, 생마늘과 고수를 담습니다.", "ใส่น้ำซุป 180 มล. หมูสับ 45 กรัม กุ้งหนึ่งตัว กระเทียมดิบ และผักชีต่อชาม"))
    ],
    substitutions: [
      ml("If pork neck bones are unavailable, use 700 g pork back bones; avoid smoked bones, which change the broth.", "無豬頸骨可用 700 公克豬背骨，不可用煙燻骨，會改變湯味。", "豚首骨は背骨に替えられますが、燻製は使いません。", "목뼈 대신 등뼈를 쓰되 훈제 뼈는 피하세요.", "ใช้กระดูกสันหลังหมูแทนได้ แต่อย่าใช้กระดูกรมควัน"),
      ml("For a shellfish-free version, omit shrimp and shells and make pork stock only; disclose that it is adapted because shrimp characterises danzai broth.", "無甲殼類版本省略蝦仁與蝦殼，只熬豬骨湯；需註明為改編版，因蝦味是擔仔湯的重要特色。", "海老なしは豚骨だけで作り、アレンジ版と明記します。", "새우를 빼면 돼지뼈 육수만 쓰고 변형임을 밝히세요.", "แบบไม่มีกุ้งให้ต้มแต่น้ำซุปหมูและระบุว่าเป็นสูตรดัดแปลง")
    ],
    cultureNote: ml("Danzai noodles began as a compact Tainan snack. The signature bowl combines shrimp-rich stock, pork sauce, garlic, sprouts, and one shrimp; its small scale is part of the experience.", "擔仔麵源自台南的小份點心；蝦鮮湯、肉燥、蒜、豆芽與一尾蝦共同定義味道，小巧份量也是體驗的一部分。", "担仔麺は台南の小さな軽食で、海老スープ、肉そぼろ、にんにく、もやし、海老一尾が特徴です。", "단짜이몐은 타이난의 작은 간식으로 새우 육수, 돼지고기 소스, 마늘, 숙주와 새우 한 마리가 특징입니다.", "ตานไจ๋เมี่ยนเริ่มจากของว่างชามเล็กในไถหนาน มีน้ำซุปกุ้ง หมูสับ กระเทียม ถั่วงอก และกุ้งหนึ่งตัว"),
    imageAlt: ml("Small bowl of Tainan danzai noodles with pork sauce, bean sprouts, one shrimp, garlic, and cilantro", "小碗台南擔仔麵，配肉燥、豆芽、一尾蝦、蒜泥與香菜", "肉そぼろ、もやし、海老、にんにく、香菜の台南担仔麺", "돼지고기 소스, 숙주, 새우 한 마리, 마늘과 고수의 타이난 단짜이몐", "บะหมี่ตานไจ๋ชามเล็กกับหมูสับ ถั่วงอก กุ้งหนึ่งตัว กระเทียม และผักชี"),
    visualSpec: "A deliberately small blue-rim bowl with thin noodles in clear amber broth, fine minced pork sauce, pale bean sprouts, exactly one pink shrimp, garlic, and cilantro."
  })
];
