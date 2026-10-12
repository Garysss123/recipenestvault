import { ingredient, makeTaiwaneseRecipe, ml, step } from "./taiwanese-recipe-helpers.mjs";

export const taiwaneseRecipesA = [
  makeTaiwaneseRecipe({
    id: "taiwanese-beef-noodle-soup", profile: "braise", prepMinutes: 30, cookMinutes: 150, totalMinutes: 180, servings: 6,
    name: ml("Taiwanese Beef Noodle Soup", "台灣紅燒牛肉麵", "台湾風紅焼牛肉麺", "대만식 홍샤오 우육면", "ก๋วยเตี๋ยวเนื้อตุ๋นไต้หวัน"),
    description: ml("Beef shank is braised until tender in a tomato, doubanjiang, soy, and spice broth, then served with wheat noodles, bok choy, and pickled mustard greens.", "牛腱以番茄、豆瓣醬、醬油與香料慢燉至柔軟，搭配麵條、青江菜與酸菜上桌。", "牛すね肉をトマト、豆板醤、しょうゆ、香辛料のスープで柔らかく煮込み、麺、青梗菜、漬け菜を添えます。", "소 사태를 토마토, 두반장, 간장, 향신료 국물에 부드럽게 삶아 면, 청경채, 절임 갓과 냅니다.", "ตุ๋นเอ็นแก้ววัวกับมะเขือเทศ เต้าเจี้ยวเผ็ด ซีอิ๊ว และเครื่องเทศจนนุ่ม เสิร์ฟกับเส้น ผักกวางตุ้ง และผักกาดดอง"),
    ingredients: [
      ingredient("1.2 kg", "boneless beef shank, cut into 5 cm pieces", "去骨牛腱，切 5 公分塊", "牛すね肉（骨なし、5cm角）", "뼈 없는 소 사태, 5cm 조각", "เนื้อน่องลายไร้กระดูก หั่น 5 ซม."),
      ingredient("30 ml", "neutral oil", "中性油", "植物油", "중성유", "น้ำมันรสกลาง"),
      ingredient("40 g", "ginger, thickly sliced", "薑，切厚片", "しょうが（厚切り）", "생강, 두껍게 썬 것", "ขิง หั่นหนา"),
      ingredient(ml("6 cloves", "6 瓣", "6片", "6쪽", "6 กลีบ"), "garlic, crushed", "大蒜，拍裂", "にんにく（潰す）", "마늘, 으깬 것", "กระเทียม ทุบ"),
      ingredient("6", "scallions, cut into 8 cm lengths", "青蔥，切 8 公分段", "長ねぎ（8cm）", "대파, 8cm", "ต้นหอม หั่น 8 ซม."),
      ingredient("300 g", "ripe tomatoes, wedged", "熟番茄，切角", "完熟トマト（くし切り）", "잘 익은 토마토, 웨지", "มะเขือเทศสุก หั่นเสี้ยว"),
      ingredient("45 g", "spicy broad-bean paste (doubanjiang)", "辣豆瓣醬", "豆板醤", "두반장", "เต้าเจี้ยวพริกโต้วป้านเจี้ยง"),
      ingredient("90 ml", "light soy sauce", "淡醬油", "しょうゆ", "양조간장", "ซีอิ๊วขาว"),
      ingredient("60 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("2.2 L", "water", "水", "水", "물", "น้ำ"),
      ingredient("2", "star anise", "八角", "八角", "팔각", "โป๊ยกั๊ก"),
      ingredient("1", "cinnamon stick, 5 cm", "桂皮，5 公分", "シナモン（5cm）", "계피 스틱 5cm", "อบเชยแท่ง 5 ซม."),
      ingredient("900 g", "fresh wheat noodles", "新鮮小麥麵條", "生中華麺", "생 밀국수", "เส้นข้าวสาลีสด"),
      ingredient("300 g", "baby bok choy, halved", "小青江菜，對半切", "小青梗菜（半分）", "청경채, 반 가름", "กวางตุ้งฮ่องเต้ ผ่าครึ่ง"),
      ingredient("120 g", "pickled mustard greens, rinsed and chopped", "酸菜，沖洗切碎", "高菜漬け（洗って刻む）", "절임 갓, 헹궈 다짐", "ผักกาดดอง ล้างและสับ")
    ],
    instructions: [
      step(ml("Blanch the beef", "汆燙牛腱", "牛肉を下ゆでする", "소고기 데치기", "ลวกเนื้อ"), ml("Cover beef with cold water in a stockpot. Bring to a boil, cook 2 minutes, then drain and rinse every piece under warm water; wash the pot so the broth stays clean.", "牛腱加冷水淹過，煮滾後汆燙 2 分鐘；瀝乾，以溫水沖淨每塊血沫並洗鍋，避免湯頭混濁。", "牛肉を冷水から沸かして2分ゆで、湯を捨ててぬるま湯で洗い、鍋も洗います。", "소고기를 찬물에 담가 끓인 뒤 2분 데치고 따뜻한 물로 씻으며 냄비도 씻습니다.", "ใส่เนื้อในน้ำเย็น ต้มเดือด 2 นาที เทน้ำทิ้ง ล้างเนื้อด้วยน้ำอุ่นและล้างหม้อ")),
      step(ml("Build the aromatic base", "炒出辛香底味", "香味の土台を作る", "향신 베이스 만들기", "ผัดฐานเครื่องหอม"), ml("Heat oil in a heavy 6 L pot over medium. Fry ginger and scallions for 3 minutes; add garlic, tomatoes, and doubanjiang and cook 4 minutes until the tomatoes soften and the paste darkens without burning.", "6 公升厚鍋中火熱油，薑與青蔥炒 3 分鐘；加蒜、番茄與豆瓣醬續炒 4 分鐘，至番茄變軟、醬色加深但不可焦黑。", "厚手の6L鍋で油を熱し、しょうがとねぎを3分、にんにく、トマト、豆板醤を4分炒めます。", "6L 두꺼운 냄비에 생강과 대파를 3분 볶고 마늘, 토마토, 두반장을 넣어 4분 볶습니다.", "ตั้งน้ำมันในหม้อหนา 6 ลิตร ผัดขิงกับต้นหอม 3 นาที เติมกระเทียม มะเขือเทศ และเต้าเจี้ยว ผัด 4 นาที")),
      step(ml("Season the braise", "建立紅燒湯底", "煮込みを調味する", "홍샤오 국물 맞추기", "ปรุงน้ำตุ๋น"), ml("Return beef and turn to coat for 2 minutes. Add soy sauce and rice wine; boil 1 minute, then add 2.2 L water, star anise, and cinnamon. Bring just to a simmer and skim the surface.", "牛腱回鍋翻炒 2 分鐘；加醬油與米酒煮 1 分鐘，再加 2.2 公升水、八角與桂皮。煮至微滾並撇除浮沫。", "牛肉を戻して2分炒め、しょうゆと米酒を1分沸かします。水2.2Lと香辛料を加え、弱く煮立ててアクを取ります。", "소고기를 2분 볶고 간장과 미주를 1분 끓인 뒤 물 2.2L와 향신료를 넣어 약하게 끓이며 거품을 걷습니다.", "ใส่เนื้อกลับคลุก 2 นาที เติมซีอิ๊วและเหล้าข้าวต้ม 1 นาที เติมน้ำ 2.2 ลิตรและเครื่องเทศ แล้วช้อนฟอง")),
      step(ml("Braise until tender", "小火燉至柔軟", "柔らかく煮込む", "부드럽게 끓이기", "ตุ๋นจนนุ่ม"), ml("Cover with the lid slightly ajar and simmer over low heat for 1 hour 45 minutes to 2 hours. Turn the beef twice and stop when a chopstick enters easily but the pieces still hold their shape; add hot water if meat becomes exposed. During the final 10 minutes, bring a separate pot of unsalted water to a boil and set out six warmed bowls.", "鍋蓋留縫，小火燉 1 小時 45 分至 2 小時，中途翻肉兩次；筷子能輕易插入但肉塊仍完整即可，液面下降露肉時補熱水。最後 10 分鐘另燒一鍋無鹽水至沸騰，並備好六個溫熱碗。", "ふたを少しずらし、弱火で1時間45分〜2時間煮ます。牛肉を途中で2回返し、箸がすっと入り、形は保つ状態で止めます。肉が煮汁から出たら熱湯を足します。最後の10分に別鍋で無塩の湯を沸かし、温めた丼を6つ用意します。", "뚜껑을 살짝 열고 약불에서 1시간 45분~2시간 끓입니다. 중간에 소고기를 두 번 뒤집고 젓가락이 쉽게 들어가지만 모양은 유지될 때 멈춥니다. 고기가 국물 위로 드러나면 뜨거운 물을 보충하세요. 마지막 10분 동안 별도 냄비에 무염 물을 끓이고 따뜻한 그릇 여섯 개를 준비합니다.", "แง้มฝาเคี่ยวไฟอ่อน 1 ชั่วโมง 45 นาทีถึง 2 ชั่วโมง พลิกเนื้อสองครั้ง หยุดเมื่อใช้ตะเกียบแทงเข้าได้ง่ายแต่ชิ้นยังคงรูป เติมน้ำร้อนหากเนื้อพ้นน้ำ ในช่วง 10 นาทีสุดท้ายต้มน้ำไม่ใส่เกลือในหม้ออีกใบและเตรียมชามอุ่น 6 ใบ")),
      step(ml("Cook noodles and greens", "煮麵與青菜", "麺と青菜をゆでる", "면과 채소 삶기", "ต้มเส้นและผัก"), ml("Cook all 900 g fresh noodles according to thickness until just tender, drain and divide among six bowls (150 g per bowl). Blanch the 300 g bok choy for 45–60 seconds until bright green and crisp-tender, then place 50 g in each bowl.", "900 g 鮮麵依粗細煮至剛熟，瀝乾後分入六碗（每碗 150 g）。300 g 青江菜汆燙 45–60 秒至翠綠爽嫩，再每碗放 50 g。", "生麺900gを太さに合わせてちょうどよくゆで、水を切って6杯に分けます（1杯150g）。青梗菜300gを45〜60秒、鮮やかな緑で歯ごたえが残るまでゆで、各丼に50gずつ入れます。", "생면 900g을 굵기에 맞게 알맞게 삶아 물을 빼고 여섯 그릇에 나눕니다(그릇당 150g). 청경채 300g을 45–60초 데쳐 선명한 초록색과 아삭한 식감이 남으면 그릇마다 50g씩 담습니다.", "ต้มเส้นสด 900 กรัมตามความหนาจนสุกพอดี สะเด็ดแล้วแบ่ง 6 ชาม (ชามละ 150 กรัม) ลวกผักกวางตุ้ง 300 กรัม 45–60 วินาทีจนเขียวสดและกรอบนุ่ม แล้วใส่ชามละ 50 กรัม")),
      step(ml("Assemble each bowl", "組合每碗牛肉麵", "丼に盛る", "그릇에 담기", "จัดชาม"), ml("Taste the broth and adjust only now with hot water or up to 10 ml soy sauce. Divide the braised beef equally among six bowls, about 200 g raw-beef equivalent per bowl, and ladle in the strained broth evenly. Add 50 g bok choy and 20 g pickled mustard greens to each bowl; serve boiling hot.", "此時才試湯，以熱水或最多 10 ml 醬油微調。燉牛肉平均分成六碗，每碗約相當於 200 g 生牛肉；均勻舀入過濾高湯。每碗再放 50 g 青江菜與 20 g 酸菜，趁滾熱上桌。", "この段階で初めて味を見て、熱湯またはしょうゆ最大10mlで調整します。煮た牛肉を6杯に均等に分け、1杯あたり調理前の牛肉約200g相当とし、こした煮汁も均等に注ぎます。各丼に青梗菜50g、漬け高菜20gを加え、熱々で供します。", "이때 국물을 맛보고 뜨거운 물이나 간장 최대 10ml로만 간을 맞춥니다. 조린 소고기를 여섯 그릇에 고르게 나눠 그릇마다 조리 전 소고기 약 200g에 해당하게 하고, 거른 국물도 고르게 붓습니다. 그릇마다 청경채 50g과 절인 갓 20g을 더해 뜨겁게 냅니다.", "ชิมน้ำซุปและปรับตอนนี้ด้วยน้ำร้อนหรือซีอิ๊วไม่เกิน 10 มล. แบ่งเนื้อตุ๋นเท่า ๆ กัน 6 ชาม เทียบเท่าเนื้อวัวดิบประมาณ 200 กรัมต่อชาม แล้วตักน้ำซุปที่กรองแล้วใส่ให้เท่ากัน เติมผักกวางตุ้ง 50 กรัมและผักกาดดอง 20 กรัมต่อชาม เสิร์ฟร้อนจัด"))
    ],
    substitutions: [
      ml("Beef chuck can replace shank; trim only hard exterior fat and begin checking tenderness after 90 minutes.", "牛腱可換牛肩胛；只修掉外層硬脂，燉 90 分鐘後開始檢查柔軟度。", "牛すねは肩肉に替え、90分から柔らかさを確認します。", "사태 대신 척을 쓰고 90분부터 부드러움을 확인하세요.", "ใช้เนื้อสันคอแทนน่องลายได้ เริ่มเช็กความนุ่มหลัง 90 นาที"),
      ml("For a non-spicy broth, use 30 g non-chile broad-bean paste and omit any chile oil; do not replace doubanjiang with ketchup.", "不辣版本使用 30 公克不辣豆瓣醬並省略辣油；不可用番茄醬取代豆瓣醬。", "辛くしない場合は辛くない豆板醤30gを使い、ケチャップには替えません。", "맵지 않게 하려면 순한 두반장 30g을 쓰고 케첩으로 대체하지 마세요.", "แบบไม่เผ็ดใช้เต้าเจี้ยวไม่เผ็ด 30 กรัมและไม่ใช้ซอสมะเขือเทศแทน")
    ],
    cultureNote: ml("Taiwanese beef noodle soup has many red-braised and clear-broth lineages. This home version follows the tomato-and-doubanjiang red-braised style and keeps noodles separate so the broth stays clean.", "台灣牛肉麵有紅燒與清燉等多種脈絡；此家庭版採番茄豆瓣紅燒風格，麵另外煮以保持湯頭清爽。", "台湾の牛肉麺には紅焼と清燉があり、本レシピはトマトと豆板醤の紅焼タイプです。", "대만 우육면에는 홍샤오와 맑은 국물 계열이 있으며 이 버전은 토마토와 두반장을 쓰는 홍샤오식입니다.", "ก๋วยเตี๋ยวเนื้อไต้หวันมีทั้งน้ำใสและน้ำแดง สูตรนี้เป็นแบบน้ำแดงมะเขือเทศกับเต้าเจี้ยว"),
    imageAlt: ml("Taiwanese red-braised beef noodle soup with beef shank, bok choy, scallions, and pickled mustard greens", "有牛腱、青江菜、蔥花與酸菜的台灣紅燒牛肉麵", "牛すね肉、青梗菜、ねぎ、漬け菜の台湾紅焼牛肉麺", "소 사태, 청경채, 대파, 절임 갓을 올린 대만식 홍샤오 우육면", "ก๋วยเตี๋ยวเนื้อตุ๋นน้ำแดงไต้หวันกับผักกวางตุ้ง ต้นหอม และผักกาดดอง"),
    visualSpec: "Deep reddish-brown clear broth, distinct wheat noodles, large tender beef-shank chunks, halved bok choy, scallions, and dark pickled mustard greens; no egg."
  }),

  makeTaiwaneseRecipe({
    id: "lu-rou-fan", profile: "braise", prepMinutes: 40, cookMinutes: 115, totalMinutes: 155, servings: 4,
    name: ml("Lu Rou Fan", "滷肉飯", "魯肉飯", "루러우판", "ข้าวหน้าหมูพะโล้สับไต้หวัน"),
    description: ml("Finely diced pork belly and shiitake are slowly braised with fried shallots, soy, rice wine, and warm spices, then spooned over rice with egg and greens.", "細切五花肉與香菇以油蔥酥、醬油、米酒和香料慢滷，連滷汁淋在飯上，配滷蛋與青菜。", "細切りの豚バラと椎茸を揚げねぎ、しょうゆ、米酒、香辛料で煮込み、ご飯にかけます。", "잘게 썬 삼겹살과 표고를 튀긴 샬롯, 간장, 미주, 향신료로 조려 밥에 얹습니다.", "ตุ๋นหมูสามชั้นหั่นเต๋ากับเห็ด หอมเจียว ซีอิ๊ว เหล้าข้าว และเครื่องเทศ แล้วราดข้าวกับไข่และผัก"),
    ingredients: [
      ingredient("600 g", "skin-on pork belly, 1 cm dice", "帶皮五花肉，切 1 公分丁", "皮付き豚バラ（1cm角）", "껍질 붙은 삼겹살, 1cm 깍둑", "หมูสามชั้นติดหนัง หั่นเต๋า 1 ซม."),
      ingredient("80 g", "shallots, thinly sliced", "紅蔥頭，切薄片", "エシャロット（薄切り）", "샬롯, 얇게 썬 것", "หอมแดง ซอยบาง"),
      ingredient("20 ml", "neutral oil", "中性油", "植物油", "중성유", "น้ำมันรสกลาง"),
      ingredient("6", "dried shiitake, soaked and diced", "乾香菇，泡軟切丁", "干し椎茸（戻して角切り）", "마른 표고, 불려 깍둑", "เห็ดหอมแห้ง แช่และหั่นเต๋า"),
      ingredient("25 g", "rock sugar", "冰糖", "氷砂糖", "빙탕", "น้ำตาลกรวด"),
      ingredient("60 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("15 ml", "dark soy sauce", "老抽", "たまりしょうゆ", "노두유", "ซีอิ๊วดำ"),
      ingredient("60 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("650 ml", "hot water, including strained mushroom liquid", "熱水，包含過濾香菇水", "湯（椎茸の戻し汁を含む）", "뜨거운 물, 거른 표고물 포함", "น้ำร้อนรวมทั้งน้ำแช่เห็ดที่กรองแล้ว"),
      ingredient("1", "star anise", "八角", "八角", "팔각", "โป๊ยกั๊ก"),
      ingredient("4", "hard-boiled eggs, peeled", "水煮蛋，去殼", "ゆで卵（殻をむく）", "삶은 달걀, 껍질 제거", "ไข่ต้ม ปอกเปลือก"),
      ingredient("800 g", "hot cooked short-grain rice", "熱白飯", "温かいご飯", "따뜻한 밥", "ข้าวสวยร้อน"),
      ingredient("250 g", "blanched seasonal greens", "汆燙時蔬", "ゆで青菜", "데친 제철 채소", "ผักตามฤดูกาลลวก")
    ],
    instructions: [
      step(ml("Fry the shallots", "炸紅蔥酥", "エシャロットを揚げる", "샬롯 튀기기", "เจียวหอมแดง"), ml("Before cooking, cover the dried shiitake with enough of the listed 650 ml hot liquid to submerge them for 20 minutes. Lift them out, dice them, strain the soaking liquid, and top it up with hot water to exactly 650 ml. Have the cooked rice, peeled hard-boiled eggs, and blanched greens ready. Heat all 20 ml oil in a heavy pot over medium-low; fry shallots for 8–10 minutes, stirring constantly once they colour. Remove at deep gold and reserve the crisp shallots and oil separately.", "開始烹煮前，乾香菇用食材表所列 650 毫升熱液體中的一部分浸泡 20 分鐘至軟。撈出切丁，過濾泡菇水，再補熱水至總量 650 毫升。備妥熟飯、剝殼水煮蛋與汆燙青菜。厚鍋中小火加熱全部 20 毫升油，紅蔥頭炸 8–10 分鐘；開始上色後持續攪拌，深金黃立刻撈出，紅蔥酥與油分開保留。", "調理前に、干し椎茸を材料表の熱い液体650mlの一部に20分浸します。取り出して角切りにし、戻し汁をこして湯を足し、全量を650mlにします。炊いたご飯、殻をむいたゆで卵、ゆでた青菜を用意します。厚手鍋で油20mlすべてを中弱火で熱し、エシャロットを8〜10分揚げます。色づき始めたら絶えず混ぜ、濃い金色で取り出し、揚げねぎと油を分けて取っておきます。", "조리 전에 마른 표고를 재료에 적힌 뜨거운 액체 650ml 중 일부에 담가 20분 불립니다. 건져 깍둑썰고 불린 물을 거른 뒤 뜨거운 물을 더해 총 650ml로 맞춥니다. 지은 밥, 껍질을 벗긴 삶은 달걀, 데친 채소를 준비합니다. 두꺼운 냄비에 기름 20ml 전부를 중약불로 달구고 샬롯을 8~10분 튀깁니다. 색이 나기 시작하면 계속 저어 진한 금색에 건져 바삭한 샬롯과 기름을 따로 둡니다.", "ก่อนเริ่มทำอาหาร แช่เห็ดหอมแห้งในของเหลวร้อน 650 มล.ที่ระบุไว้เท่าที่พอท่วม 20 นาที ตักขึ้นหั่นเต๋า กรองน้ำแช่ แล้วเติมน้ำร้อนให้ได้ทั้งหมด 650 มล. เตรียมข้าวสุก ไข่ต้มปอกเปลือก และผักลวกให้พร้อม ตั้งน้ำมันทั้ง 20 มล.ในหม้อหนาไฟกลางอ่อน เจียวหอมแดง 8–10 นาที เมื่อเริ่มมีสีให้คนต่อเนื่อง ตักออกเมื่อเป็นสีทองเข้มและแยกหอมเจียวกับน้ำมันไว้")),
      step(ml("Render and brown pork", "煸炒五花肉", "豚肉を炒める", "삼겹살 볶기", "เจียวหมู"), ml("Return all the reserved shallot-frying oil to the pot, then add the pork. Cook over medium heat for 10–12 minutes, stirring, until fat renders and the edges turn pale gold. Spoon off all but 30 ml fat.", "將保留的炸紅蔥油全部倒回鍋中，再加入五花肉；中火煸 10–12 分鐘並攪拌，至油脂析出、邊緣淡金黃。舀除多餘油脂，鍋中留下 30 毫升。", "取っておいたエシャロット油をすべて鍋に戻して豚肉を加えます。中火で10〜12分炒め、脂を出し、端を薄い金色にします。余分な脂を除き、鍋に30mlだけ残します。", "따로 둔 샬롯 기름을 전부 냄비에 다시 붓고 삼겹살을 넣습니다. 중불에서 10~12분 저어가며 볶아 지방을 내고 가장자리를 연한 금색으로 익힙니다. 기름을 덜어내 냄비에 30ml만 남깁니다.", "เทน้ำมันที่ใช้เจียวหอมแดงซึ่งพักไว้ทั้งหมดกลับลงหม้อ แล้วใส่หมู ผัดไฟกลาง 10–12 นาที คนไปเรื่อย ๆ จนไขมันออกและขอบเป็นสีทองอ่อน ตักไขมันส่วนเกินออกให้เหลือ 30 มล.")),
      step(ml("Caramelize and season", "炒糖並調味", "砂糖と調味料を加える", "설탕과 양념 넣기", "เคี่ยวน้ำตาลและปรุง"), ml("Push pork aside, add rock sugar, and let it melt to amber over medium-low for 2–3 minutes. Stir through pork, then add mushrooms, half the fried shallots, both soy sauces, and rice wine; boil 1 minute.", "豬肉推到一側，冰糖中小火融成琥珀色 2–3 分鐘；拌勻後加入香菇、一半油蔥酥、兩種醬油與米酒，煮滾 1 分鐘。", "氷砂糖を琥珀色に溶かし、肉、椎茸、揚げねぎ、しょうゆ、米酒を加え1分沸かします。", "빙탕을 호박색으로 녹여 고기, 표고, 튀긴 샬롯, 간장, 미주를 넣고 1분 끓입니다.", "ละลายน้ำตาลกรวดเป็นสีอำพัน คลุกหมู เติมเห็ด หอมเจียว ซีอิ๊ว และเหล้าข้าว ต้ม 1 นาที")),
      step(ml("Braise with the eggs", "加入蛋慢滷", "卵と煮込む", "달걀과 조리기", "ตุ๋นพร้อมไข่"), ml("Add 650 ml hot liquid and star anise. Nestle in eggs, cover slightly ajar, and simmer very gently for 70 minutes. Turn eggs and stir the bottom every 20 minutes; pork should be spoon-tender.", "加入 650 毫升熱液體與八角，放入蛋，鍋蓋留縫極小火滷 70 分鐘；每 20 分鐘翻蛋並刮鍋底，至肉可用湯匙切開。", "湯650ml、八角、卵を加え、ふたをずらして70分弱く煮ます。", "뜨거운 물 650ml, 팔각, 달걀을 넣고 뚜껑을 살짝 열어 70분 약하게 조립니다.", "เติมน้ำร้อน 650 มล. โป๊ยกั๊ก และไข่ แง้มฝาเคี่ยวอ่อน 70 นาที")),
      step(ml("Reduce to a glossy sauce", "收至油亮滷汁", "つやのある煮汁にする", "윤기 나게 졸이기", "งวดให้เงา"), ml("Remove the lid and simmer 8–12 minutes, stirring from the bottom, until the sauce lightly coats a spoon but still flows. Discard star anise and taste before adding any salt.", "開蓋續滾 8–12 分鐘並由鍋底攪拌，至滷汁能薄薄覆匙但仍會流動；取出八角，試味後再決定是否加鹽。", "ふたを外して8〜12分、スプーンを薄く覆う濃度まで煮詰めます。", "뚜껑을 열고 8~12분, 숟가락에 얇게 묻을 만큼 졸입니다.", "เปิดฝาเคี่ยว 8–12 นาทีจนซอสเคลือบช้อนบาง ๆ แต่ยังไหลได้")),
      step(ml("Serve over rice", "淋在白飯上", "ご飯にかける", "밥 위에 담기", "ราดข้าว"), ml("Divide 800 g hot rice among four bowls (200 g each). Split the pork and mushrooms evenly, spoon about 45–60 ml sauce over each bowl, then add one halved egg per person. Divide all 250 g blanched greens evenly among the four bowls (about 62–63 g each). Finish with an even share of the remaining crisp shallots.", "800 g 熱飯分四碗（每碗 200 g）。豬肉與香菇平均分配，每碗淋約 45–60 毫升滷汁，再各放一顆對半切的蛋。全部 250 g 汆燙青菜也平均分入四碗（每碗約 62–63 g）。最後平均撒上剩餘油蔥酥。", "温かいご飯800gを4つの丼に分けます（1杯200g）。豚肉と椎茸を均等に分け、煮汁を各45〜60mlかけ、1人につき半分に切った卵1個をのせます。ゆでた青菜250gすべてを4杯に均等に分けます（1杯約62〜63g）。残りの揚げエシャロットも均等に散らします。", "뜨거운 밥 800g을 네 그릇에 나눕니다(한 그릇 200g). 돼지고기와 표고를 고르게 나누고 소스를 그릇마다 약 45~60ml씩 얹은 뒤 1인당 반으로 자른 달걀 1개를 올립니다. 데친 채소 250g 전부를 네 그릇에 고르게 나눕니다(한 그릇 약 62~63g). 남은 바삭한 샬롯도 고르게 뿌립니다.", "แบ่งข้าวร้อน 800 กรัมลง 4 ชาม (ชามละ 200 กรัม) แบ่งหมูกับเห็ดให้เท่า ๆ กัน ราดซอสชามละประมาณ 45–60 มล. แล้วใส่ไข่ต้มผ่าครึ่งคนละ 1 ฟอง แบ่งผักลวกทั้ง 250 กรัมลงสี่ชามเท่า ๆ กัน (ชามละประมาณ 62–63 กรัม) โรยหอมเจียวที่เหลือให้ทั่วเท่ากัน"))
    ],
    substitutions: [
      ml("Use skinless pork shoulder for a leaner bowl; add 15 ml neutral oil and begin checking tenderness after 55 minutes.", "較瘦可用去皮梅花肉，另加 15 毫升中性油，滷 55 分鐘後開始檢查。", "脂を控えるなら豚肩肉と油15mlを使い、55分から確認します。", "더 담백하게는 목살과 기름 15ml를 쓰고 55분부터 확인하세요.", "ใช้สันคอหมูไร้หนังและน้ำมัน 15 มล. เพื่อให้มันน้อยลง"),
      ml("Fresh shiitake can replace dried mushrooms, but use plain hot water because there is no soaking liquid.", "乾香菇可換鮮香菇，但因沒有泡菇水，液體全用熱水。", "生椎茸でもよく、その場合は戻し汁の代わりに湯を使います。", "생표고를 쓰면 불린 물 대신 뜨거운 물을 쓰세요.", "ใช้เห็ดหอมสดได้ โดยใช้น้ำร้อนแทนน้ำแช่เห็ด")
    ],
    cultureNote: ml("Lu rou fan is an everyday rice bowl whose cut and name vary around Taiwan. This version uses small dice rather than ground pork so the sauce remains rich but the meat is still visible.", "滷肉飯是台灣日常小吃，各地切法與稱呼略有差異；此版以小肉丁而非絞肉，保留肉感與膠質。", "魯肉飯は台湾の日常食で、地域により切り方や呼び名が異なります。", "루러우판은 대만의 일상적인 덮밥이며 지역마다 고기 크기와 이름이 다릅니다.", "ลู่โร่วฟ่านเป็นข้าวประจำวันของไต้หวัน แต่ละพื้นที่หั่นหมูและเรียกชื่อต่างกัน"),
    imageAlt: ml("Lu rou fan with diced braised pork, shiitake, egg, greens, and crisp shallots over rice", "白飯上淋滷五花肉丁、香菇，配滷蛋、青菜與油蔥酥的滷肉飯", "豚角煮、椎茸、卵、青菜、揚げねぎの魯肉飯", "밥 위에 조린 돼지고기, 표고, 달걀, 채소와 튀긴 샬롯을 올린 루러우판", "ข้าวหน้าหมูตุ๋นเต๋า เห็ด ไข่ ผัก และหอมเจียว"),
    visualSpec: "Short-grain rice topped with distinct glossy 1 cm pork-belly dice and mushroom, one halved brown egg, green vegetable, and crisp shallots; sauce moist but not soupy."
  }),

  makeTaiwaneseRecipe({
    id: "three-cup-chicken", profile: "quick", prepMinutes: 20, cookMinutes: 30, totalMinutes: 50, servings: 4,
    name: ml("Three Cup Chicken", "三杯雞", "三杯鶏", "삼배계", "ไก่สามถ้วย"),
    description: ml("Bone-in chicken thigh is browned with ginger and garlic, simmered in rice wine and soy, reduced to a glossy glaze, and finished with fresh basil.", "帶骨雞腿與薑蒜煸香，以米酒與醬油燜煮收亮，關火後拌入大量九層塔。", "骨付き鶏ももをしょうが、にんにく、米酒、しょうゆで煮詰め、バジルで仕上げます。", "뼈 있는 닭다리를 생강, 마늘, 미주, 간장에 조려 윤기를 내고 바질로 마무리합니다.", "ผัดสะโพกไก่ติดกระดูกกับขิงกระเทียม ตุ๋นเหล้าข้าวและซีอิ๊วจนเงา แล้วใส่โหระพา"),
    ingredients: [
      ingredient("900 g", "bone-in chicken thigh, 4 cm pieces", "帶骨雞腿，剁 4 公分塊", "骨付き鶏もも（4cm）", "뼈 있는 닭다리, 4cm", "สะโพกไก่ติดกระดูก หั่น 4 ซม."),
      ingredient("45 ml", "black sesame oil", "黑麻油", "黒ごま油", "검은 참기름", "น้ำมันงาดำ"),
      ingredient("70 g", "ginger, 3 mm slices", "老薑，切 3 毫米片", "しょうが（3mm）", "생강, 3mm", "ขิงแก่ หั่น 3 มม."),
      ingredient(ml("12 cloves", "12 瓣", "12片", "12쪽", "12 กลีบ"), "garlic, peeled", "蒜瓣，去皮", "にんにく（皮をむく）", "마늘, 껍질 제거", "กระเทียม ปอก"),
      ingredient("3", "dried red chiles, stems removed", "乾紅辣椒，去蒂", "乾燥赤唐辛子（へたを除く）", "마른 홍고추, 꼭지 제거", "พริกแดงแห้ง เด็ดขั้ว"),
      ingredient("120 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("60 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("15 ml", "dark soy sauce", "老抽", "濃口しょうゆ", "노두유", "ซีอิ๊วดำ"),
      ingredient("20 g", "rock sugar", "冰糖", "氷砂糖", "빙탕", "น้ำตาลกรวด"),
      ingredient("80 ml", "water", "水", "水", "물", "น้ำ"),
      ingredient("40 g", "fresh Taiwan basil leaves", "新鮮九層塔葉", "台湾バジル", "대만 바질 잎", "ใบโหระพาไต้หวัน")
    ],
    instructions: [
      step(ml("Dry and temper the chicken", "擦乾並回溫雞肉", "鶏肉の水気を取る", "닭고기 물기 제거", "ซับไก่และพักอุณหภูมิ"), ml("Pat chicken completely dry and leave at cool room temperature for 15 minutes. Measure every liquid separately and keep basil dry; wet chicken will spit and steam instead of browning.", "雞肉徹底擦乾，在涼爽室溫放 15 分鐘；所有液體分別量好，九層塔保持乾燥，濕雞肉會噴油且只悶不煎。", "鶏肉の水気を拭き15分置き、調味料を量ります。", "닭고기 물기를 닦아 15분 두고 모든 액체를 계량합니다.", "ซับไก่ให้แห้ง พัก 15 นาที และตวงของเหลวทั้งหมด")),
      step(ml("Fry ginger, garlic, and chile", "煸香薑蒜辣椒", "しょうが、にんにく、唐辛子を炒める", "생강, 마늘, 고추 볶기", "ผัดขิง กระเทียม และพริก"), ml("Heat sesame oil in a 28 cm heavy pan over medium-low. Fry ginger 6–8 minutes until the edges curl and turn gold; add garlic and dried chiles and fry 2 minutes without blackening either.", "28 公分厚鍋中小火熱黑麻油，薑片煸 6–8 分鐘至邊緣捲曲金黃；加蒜與乾辣椒再炒 2 分鐘，兩者都不可焦黑。", "ごま油で生姜を6〜8分炒め、にんにくと唐辛子を加えて2分、焦がさず炒めます。", "참기름에 생강을 6~8분 볶고 마늘과 마른 고추를 넣어 타지 않게 2분 더 볶습니다.", "ผัดขิงในน้ำมันงาไฟกลางอ่อน 6–8 นาที เติมกระเทียมกับพริกแห้งผัด 2 นาทีโดยไม่ให้ไหม้")),
      step(ml("Brown the chicken", "煎香雞塊", "鶏肉を焼く", "닭고기 굽기", "จี่ไก่"), ml("Raise to medium-high. Add chicken in one layer and brown for 7–9 minutes, turning so two sides colour. If the pan is crowded, brown in two batches; the centre need not be cooked yet.", "轉中大火，雞塊單層下鍋煎 7–9 分鐘，翻面使兩面上色；鍋太擠就分兩批，此時中心不必熟。", "中強火で鶏肉を一層に並べ7〜9分、二面を焼きます。", "중강불에서 닭고기를 한 겹으로 7~9분 두 면을 굽습니다.", "เพิ่มเป็นไฟกลางแรง วางไก่ชั้นเดียวจี่ 7–9 นาทีให้สองด้านขึ้นสี")),
      step(ml("Simmer in the three-cup sauce", "加入三杯醬燜煮", "たれで煮る", "삼배 소스에 조리기", "ตุ๋นในซอสสามถ้วย"), ml("Add rice wine, both soy sauces, sugar, and water. Bring to a boil, cover, reduce to medium-low, and simmer 12 minutes, turning once, until the thickest chicken reaches 74°C.", "加入米酒、兩種醬油、冰糖與水，煮滾後加蓋轉中小火燜 12 分鐘，中途翻一次，至最厚雞塊中心達 74°C。", "米酒、しょうゆ、砂糖、水を加え、覆って12分、中心74°Cまで煮ます。", "미주, 간장, 설탕, 물을 넣어 덮고 12분, 중심 74°C까지 익힙니다.", "เติมเหล้าข้าว ซีอิ๊ว น้ำตาล และน้ำ ปิดฝาเคี่ยว 12 นาทีจนใจกลางไก่ 74°C")),
      step(ml("Reduce to a glaze", "開蓋收亮", "つやが出るまで煮詰める", "윤기 나게 졸이기", "เปิดฝางวดให้เงา"), ml("Uncover and boil over medium-high for 4–6 minutes, turning constantly near the end, until the sauce bubbles slowly and clings to every piece. Stop before sesame oil separates into a large pool.", "開蓋中大火收 4–6 分鐘，後段持續翻動，至醬汁泡沫變慢並包覆雞塊；黑麻油大量析出前就停。", "ふたを外し4〜6分、たれが全体に絡むまで煮詰めます。", "뚜껑을 열고 4~6분 소스가 닭에 달라붙도록 졸입니다.", "เปิดฝางวดไฟกลางแรง 4–6 นาทีจนซอสเกาะไก่ทุกชิ้น")),
      step(ml("Wilt basil off the heat", "關火拌九層塔", "火を止めてバジルを加える", "불 끄고 바질 넣기", "ปิดไฟใส่โหระพา"), ml("Turn off the heat, add all basil, and fold for 20–30 seconds until just wilted and bright green. Rest 2 minutes in the covered pan, then serve immediately with rice.", "關火後加入全部九層塔，翻拌 20–30 秒至剛萎縮仍翠綠；加蓋靜置 2 分鐘，立即配飯上桌。", "火を止めてバジルを20〜30秒混ぜ、覆って2分休ませます。", "불을 끄고 바질을 20~30초 버무린 뒤 2분 덮어 둡니다.", "ปิดไฟ ใส่โหระพาคลุก 20–30 วินาที ปิดพัก 2 นาทีแล้วเสิร์ฟ"))
    ],
    substitutions: [
      ml("Boneless thigh works, but cut 4 cm pieces and begin checking for 74°C after 8 minutes of covered simmering.", "可用去骨雞腿，仍切 4 公分塊；加蓋燜 8 分鐘後開始測 74°C。", "骨なしもも肉なら8分から74°Cを確認します。", "순살 닭다리는 8분부터 74°C를 확인하세요.", "ใช้สะโพกไก่ไร้กระดูกได้ เริ่มเช็ก 74°C หลังตุ๋น 8 นาที"),
      ml("Thai basil is the closest substitute for Taiwan basil; ordinary sweet basil is milder, so use 50 g and never cook it for long.", "九層塔可用泰國羅勒替代；甜羅勒香氣較弱，可用 50 公克且不可久煮。", "台湾バジルはタイバジルで代用できます。", "대만 바질은 타이 바질로 대체할 수 있습니다.", "ใช้โหระพาไทยแทนได้ ใบโหระพาหวานให้ใช้ 50 กรัมและอย่าต้มนาน")
    ],
    cultureNote: ml("The name describes the classic balance of sesame oil, soy sauce, and rice wine rather than requiring three literal household cups. Modern home recipes scale those liquids to the chicken.", "「三杯」指麻油、醬油與米酒的經典平衡，不是每樣都倒一個家用杯；家庭版會依雞肉份量縮放。", "三杯はごま油、しょうゆ、米酒のバランスを表し、実際に各1杯を使う意味ではありません。", "삼배는 참기름, 간장, 미주의 균형을 뜻하며 실제로 한 컵씩 쓰는 뜻은 아닙니다.", "ชื่อสามถ้วยหมายถึงสมดุลน้ำมันงา ซีอิ๊ว และเหล้าข้าว ไม่จำเป็นต้องใช้ถ้วยละหนึ่งถ้วยจริง"),
    imageAlt: ml("Glossy three cup chicken with ginger, whole garlic, red chile, and fresh Taiwan basil", "油亮三杯雞塊配薑片、整粒蒜頭、紅辣椒與新鮮九層塔", "しょうが、にんにく、赤唐辛子、台湾バジルの三杯鶏", "생강, 통마늘, 붉은 고추와 대만 바질을 곁들인 윤기 나는 삼배계", "ไก่สามถ้วยเงางามกับขิง กระเทียม พริกแดง และโหระพาไต้หวัน"),
    visualSpec: "Glossy dark amber bone-in chicken pieces with curled ginger slices, whole garlic cloves, red chiles, wilted green basil, and a small amount of reduced sauce."
  }),

  makeTaiwaneseRecipe({
    id: "oyster-omelette", profile: "quick", prepMinutes: 25, cookMinutes: 20, totalMinutes: 45, servings: 2,
    name: ml("Taiwanese Oyster Omelette", "台灣蚵仔煎", "台湾風牡蠣オムレツ", "대만식 굴전", "ออส่วนไต้หวัน"),
    description: ml("Small oysters, a translucent sweet-potato-starch layer, egg, and crisp greens are pan-fried and finished with a smooth sweet-savory red sauce.", "小蚵、半透明地瓜粉漿、蛋與爽脆青菜煎成軟 Q 蚵仔煎，再淋滑順甜鹹紅醬。", "小粒の牡蠣、さつまいもでんぷん、卵、青菜を焼き、甘辛いたれをかけます。", "작은 굴, 투명한 고구마 전분층, 달걀과 채소를 부쳐 달콤짭짤한 붉은 소스를 얹습니다.", "ทอดหอยนางรมตัวเล็กกับแป้งมันหวาน ไข่ และผัก แล้วราดซอสแดงหวานเค็ม"),
    ingredients: [
      ingredient("180 g", "small shucked oysters, drained", "小顆剝殼蚵仔，瀝乾", "小粒むき牡蠣（水切り）", "작은 생굴, 물기 제거", "หอยนางรมแกะตัวเล็ก สะเด็ด"),
      ingredient("55 g", "Taiwan sweet potato starch", "台灣地瓜粉", "さつまいもでんぷん", "고구마 전분", "แป้งมันหวานไต้หวัน"),
      ingredient("15 g", "tapioca starch", "樹薯粉", "タピオカでんぷん", "타피오카 전분", "แป้งมันสำปะหลัง"),
      ingredient("180 ml", "cold water", "冷水", "冷水", "찬물", "น้ำเย็น"),
      ingredient("4", "large eggs, lightly beaten", "大型雞蛋，輕輕打散", "大きい卵（軽く溶く）", "큰 달걀, 가볍게 풀기", "ไข่ไก่ฟองใหญ่ ตีพอแตก"),
      ingredient("120 g", "Taiwan lettuce or baby bok choy, 4 cm pieces", "A 菜或小青江菜，切 4 公分", "台湾レタスまたは青梗菜", "대만 상추 또는 청경채", "ผักกาดไต้หวันหรือกวางตุ้ง หั่น 4 ซม."),
      ingredient("30 ml", "neutral oil, divided", "中性油，分次使用", "植物油（分ける）", "중성유, 나눔", "น้ำมันรสกลาง แบ่งใช้"),
      ingredient("120 ml", "water for sauce", "醬汁用水", "たれ用の水", "소스용 물", "น้ำสำหรับซอส"),
      ingredient("35 g", "sweet chile sauce", "甜辣醬", "スイートチリソース", "스위트 칠리소스", "ซอสพริกหวาน"),
      ingredient("25 g", "ketchup", "番茄醬", "ケチャップ", "케첩", "ซอสมะเขือเทศ"),
      ingredient("10 ml", "soy sauce", "醬油", "しょうゆ", "간장", "ซีอิ๊ว"),
      ingredient("10 ml", "rice vinegar", "米醋", "米酢", "쌀식초", "น้ำส้มสายชูข้าว"),
      ingredient("8 g", "cornstarch mixed with 15 ml water", "玉米澱粉加 15 毫升水", "コーンスターチと水15ml", "옥수수전분과 물 15ml", "แป้งข้าวโพดผสมน้ำ 15 มล.")
    ],
    instructions: [
      step(ml("Cook the red sauce", "煮甜鹹紅醬", "赤いたれを作る", "붉은 소스 만들기", "ทำซอสแดง"), ml("Combine 120 ml water, sweet chile sauce, ketchup, soy, and vinegar in a small pan. Simmer 3 minutes, whisk in the cornstarch slurry, and cook 45 seconds until glossy; cover and keep warm.", "小鍋混合 120 毫升水、甜辣醬、番茄醬、醬油與米醋，小滾 3 分鐘；拌入玉米粉水煮 45 秒至滑亮，加蓋保溫。", "たれの材料を3分煮て、水溶きでんぷんを加え45秒とろみを付けます。", "소스 재료를 3분 끓이고 전분물을 넣어 45초 윤기 나게 끓입니다.", "ต้มส่วนผสมซอส 3 นาที ใส่น้ำแป้ง คน 45 วินาทีจนข้นเงา")),
      step(ml("Drain oysters and mix slurry", "瀝蚵並調粉漿", "牡蠣と生地を準備する", "굴과 반죽 준비", "เตรียมหอยและแป้ง"), ml("Rinse oysters once in lightly salted cold water, inspect for shell, drain 10 minutes, and pat gently. Whisk sweet potato starch, tapioca starch, and 180 ml water until no dry lumps remain; whisk again before pouring.", "蚵仔以淡鹽冷水輕洗一次，檢查碎殼，瀝 10 分鐘後輕拍乾；地瓜粉、樹薯粉與 180 毫升水攪至無乾粉，下鍋前再攪。", "牡蠣を塩水で洗って10分水切りし、でんぷんと水を混ぜます。", "굴을 소금물에 씻어 10분 물기 빼고 전분과 물을 섞습니다.", "ล้างหอยในน้ำเกลืออ่อน สะเด็ด 10 นาที แล้วคนแป้งทั้งสองกับน้ำ")),
      step(ml("Sear the oysters", "煎蚵仔", "牡蠣を焼く", "굴 굽기", "จี่หอย"), ml("Heat a 24 cm nonstick skillet over medium-high for 90 seconds. Add 10 ml oil and half the oysters; sear 45 seconds, turn, and cook 30 seconds more so the centres are barely opaque.", "24 公分不沾鍋中大火預熱 90 秒，加 10 毫升油與一半蚵仔；煎 45 秒後翻面再 30 秒，中心剛轉不透明。", "フライパンで牡蠣の半量を片面45秒、裏30秒焼きます。", "팬에서 굴 절반을 45초, 뒤집어 30초 익힙니다.", "จี่หอยครึ่งหนึ่ง 45 วินาที พลิกอีก 30 วินาที")),
      step(ml("Set the starch layer", "煎至粉漿透明", "でんぷん生地を固める", "전분층 익히기", "ทำชั้นแป้งให้ใส"), ml("Whisk slurry and pour half around the oysters. Cook 60–90 seconds until the rim turns translucent while the centre remains glossy; drizzle 5 ml oil around the edge to release it.", "粉漿再攪勻，倒一半繞住蚵仔；煎 60–90 秒至邊緣轉透明、中心仍有光澤，沿邊補 5 毫升油幫助脫鍋。", "生地の半量を流し、縁が透明になるまで60〜90秒焼きます。", "반죽 절반을 부어 가장자리가 투명해질 때까지 60~90초 익힙니다.", "เทแป้งครึ่งหนึ่งรอบหอย ทอด 60–90 วินาทีจนขอบใส")),
      step(ml("Add egg and greens", "加蛋與青菜翻煎", "卵と青菜を加える", "달걀과 채소 넣기", "ใส่ไข่และผัก"), ml("Pour over half the eggs and scatter half the greens. Cook 60 seconds, loosen the base, fold or flip in sections, and cook 60–90 seconds more. Check the thickest egg layer at 71°C (160°F), fully set, and the largest oyster centre at 63°C (145°F), opaque and firm; if either target is low, continue in 15-second increments and recheck.", "淋一半蛋液並撒一半青菜，煎 60 秒；鏟鬆底部，分段翻折或翻面再煎 60–90 秒。檢查最厚蛋層達 71°C（160°F）且完全凝固，最大蚵仔中心達 63°C（145°F）且不透明、結實；任一未達就每次再煎 15 秒並重新測量。", "卵と青菜を加え、返して60〜90秒焼きます。最も厚い卵の層が完全に固まり71°C（160°F）に達し、最も大きな牡蠣の中心が63°C（145°F）で不透明かつしっかりしていることを確認します。どちらか未達なら15秒ずつ焼き足して再確認します。", "달걀과 채소를 넣고 뒤집어 60~90초 더 익힙니다. 가장 두꺼운 달걀층이 완전히 굳어 71°C(160°F)에 도달하고 가장 큰 굴 중심은 63°C(145°F)이며 불투명하고 단단한지 확인합니다. 둘 중 하나라도 미달이면 15초씩 더 익혀 다시 잽니다.", "เทไข่และใส่ผัก พลิกทอดอีก 60–90 วินาที ตรวจชั้นไข่ส่วนหนาสุดให้ถึง 71°C (160°F) และสุกอยู่ตัว ส่วนกลางของหอยตัวใหญ่สุดให้ถึง 63°C (145°F) ทึบและแน่น หากข้อใดยังต่ำให้ทอดเพิ่มครั้งละ 15 วินาทีแล้วตรวจซ้ำ")),
      step(ml("Repeat and sauce", "完成第二份並淋醬", "もう一枚焼いてたれをかける", "한 장 더 부쳐 소스 얹기", "ทำอีกชิ้นและราดซอส"), ml("Slide onto a warm plate and spoon over half the sauce. Wipe loose starch from the skillet and repeat with remaining ingredients; serve immediately while the edges are crisp and centres chewy.", "滑入溫盤並淋一半醬汁；擦掉鍋中散粉，以其餘材料再做一份，趁邊緣微脆、中心軟 Q 立即上桌。", "皿に盛りたれをかけ、残りも同様に焼いてすぐ供します。", "접시에 담아 소스를 얹고 나머지도 같은 방식으로 부쳐 바로 냅니다.", "ใส่จานอุ่น ราดซอสครึ่งหนึ่ง แล้วทำอีกชิ้น เสิร์ฟทันที"))
    ],
    substitutions: [
      ml("Baby bok choy is a practical substitute for Taiwan lettuce; slice the stems thin so they cook with the leaves.", "買不到 A 菜可用小青江菜，梗要切薄才會與葉同時熟。", "台湾レタスは青梗菜で代用し、茎を薄く切ります。", "대만 상추 대신 청경채를 쓰고 줄기는 얇게 써세요.", "ใช้ผักกวางตุ้งแทนผักกาดไต้หวันได้ โดยหั่นก้านบาง"),
      ml("For shellfish allergy, omit oysters and use 120 g firm tofu dice, but label the result an egg-and-tofu starch pancake rather than oyster omelette.", "甲殼類過敏可省略蚵仔，改 120 公克硬豆腐丁，但成品應稱蛋豆腐粉煎，不再是蚵仔煎。", "牡蠣を豆腐120gに替えた場合は牡蠣オムレツとは呼びません。", "굴 알레르기에는 단단한 두부 120g을 쓰되 굴전이라고 부르지 않습니다.", "ผู้แพ้หอยใช้เต้าหู้แข็ง 120 กรัมได้ แต่ไม่ควรเรียกว่าออส่วนหอย")
    ],
    cultureNote: ml("Taiwanese oyster omelette is defined by its contrast: briny oysters, chewy translucent starch, tender egg, fresh greens, and a sweet-savory sauce. It is not a dry Western omelette.", "台灣蚵仔煎的核心是海味蚵仔、透明軟 Q 粉漿、嫩蛋、青菜與甜鹹醬的對比，不是乾爽的西式歐姆蛋。", "台湾風牡蠣オムレツは、牡蠣、もちっとしたでんぷん、卵、青菜、甘辛だれの対比が特徴です。", "대만식 굴전은 굴, 쫄깃한 전분, 부드러운 달걀, 채소와 달콤짭짤한 소스의 대비가 핵심입니다.", "ออส่วนไต้หวันเด่นที่หอยเค็มหวาน แป้งใสหนึบ ไข่นุ่ม ผักสด และซอสหวานเค็ม"),
    imageAlt: ml("Taiwanese oyster omelette with translucent starch, egg, greens, and glossy red sauce", "有透明粉漿、蛋、青菜與油亮紅醬的台灣蚵仔煎", "透明なでんぷん、卵、青菜、赤いたれの台湾風牡蠣オムレツ", "투명한 전분층, 달걀, 채소와 붉은 소스의 대만식 굴전", "ออส่วนไต้หวันกับแป้งใส ไข่ ผัก และซอสแดงเงา"),
    visualSpec: "Irregular folded oyster omelette with visible small oysters, translucent chewy starch edges, yellow egg, wilted green lettuce, and a smooth brick-red sauce; not a fluffy Western omelet."
  }),

  makeTaiwaneseRecipe({
    id: "taiwanese-popcorn-chicken", profile: "quick", prepMinutes: 45, cookMinutes: 20, totalMinutes: 65, servings: 4,
    name: ml("Taiwanese Popcorn Chicken", "台灣鹽酥雞", "台湾風鶏唐揚げ", "대만식 옌수지", "ไก่ทอดป๊อปคอร์นไต้หวัน"),
    description: ml("Marinated chicken thigh is coated in coarse sweet potato starch, fried until craggy and juicy, then tossed with fried basil, white pepper, salt, and chile.", "醃過雞腿裹粗粒地瓜粉，炸至外殼凹凸酥脆、中心多汁，再拌炸九層塔、白胡椒、鹽與辣椒。", "下味を付けた鶏ももに粗いさつまいもでんぷんをまぶし、バジルと香辛料で仕上げます。", "양념한 닭다리에 굵은 고구마 전분을 묻혀 바삭하게 튀기고 바질과 흰 후추로 마무리합니다.", "หมักสะโพกไก่ คลุกแป้งมันหวานเม็ดหยาบ ทอดให้กรอบฉ่ำ แล้วคลุกโหระพาทอด พริกไทยขาว เกลือ และพริก"),
    ingredients: [
      ingredient("700 g", "boneless skinless chicken thigh, 3 cm pieces", "去骨去皮雞腿，切 3 公分塊", "鶏もも肉（3cm）", "순살 닭다리, 3cm", "สะโพกไก่ไร้กระดูกหนัง หั่น 3 ซม."),
      ingredient("30 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("30 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("12 g", "garlic, finely grated", "蒜，磨泥", "にんにく（すりおろす）", "마늘, 곱게 간 것", "กระเทียม ขูดละเอียด"),
      ingredient("5 g", "fresh ginger, finely grated", "薑，磨泥", "しょうが（すりおろす）", "생강, 곱게 간 것", "ขิง ขูดละเอียด"),
      ingredient("4 g", "five-spice powder", "五香粉", "五香粉", "오향분", "ผงพะโล้ห้าอย่าง"),
      ingredient("3 g", "white pepper, divided", "白胡椒粉，分次", "白こしょう（分ける）", "흰 후추, 나눔", "พริกไทยขาว แบ่งใช้"),
      ingredient("180 g", "coarse sweet potato starch", "粗粒地瓜粉", "粗いさつまいもでんぷん", "굵은 고구마 전분", "แป้งมันหวานเม็ดหยาบ"),
      ingredient("1.5 L", "neutral frying oil", "中性炸油", "揚げ油", "튀김유", "น้ำมันทอด"),
      ingredient("25 g", "dry Taiwan basil leaves", "擦乾九層塔葉", "乾いた台湾バジル", "물기 없는 대만 바질", "ใบโหระพาไต้หวัน ซับแห้ง"),
      ingredient("4 g", "fine salt", "細鹽", "細塩", "고운 소금", "เกลือละเอียด"),
      ingredient("2 g", "ground chile, optional", "辣椒粉，可選", "唐辛子粉（好みで）", "고춧가루, 선택", "พริกป่น ตามชอบ")
    ],
    instructions: [
      step(ml("Marinate the chicken", "醃雞腿", "鶏肉に下味を付ける", "닭고기 재우기", "หมักไก่"), ml("Mix chicken with soy, rice wine, garlic, ginger, five-spice, and 1 g white pepper. Cover and refrigerate 30 minutes, then drain off any free liquid; do not marinate at room temperature.", "雞腿拌醬油、米酒、蒜、薑、五香粉與 1 公克白胡椒，密封冷藏 30 分鐘；取出瀝掉游離醃汁，不可室溫醃肉。", "鶏肉を調味料に30分冷蔵し、余分な汁を切ります。", "닭고기를 양념에 30분 냉장 재운 뒤 남은 액체를 뺍니다.", "หมักไก่กับเครื่องปรุงในตู้เย็น 30 นาที แล้วเทน้ำหมักส่วนเกินออก")),
      step(ml("Build the craggy coating", "裹出粗粒外殼", "衣を付ける", "거친 튀김옷 묻히기", "คลุกแป้งให้เป็นเกล็ด"), ml("Put starch in a wide tray. Press each chicken piece firmly into it, turn, and press again. Arrange separately on a rack and rest 10 minutes until the coating develops damp patches; press once more in dry starch.", "地瓜粉放寬盤，每塊雞肉用力壓粉、翻面再壓；分開排架靜置 10 分鐘至表面出現濕斑，再薄壓一次乾粉。", "鶏肉をでんぷんに押し付け、10分休ませてもう一度薄くまぶします。", "닭고기를 전분에 눌러 묻혀 10분 둔 뒤 한 번 더 얇게 묻힙니다.", "กดไก่ลงแป้งให้ทั่ว พัก 10 นาทีจนมีจุดชื้น แล้วกดแป้งแห้งอีกครั้ง")),
      step(ml("Heat oil safely", "把油加熱到正確溫度", "油を適温にする", "기름 온도 맞추기", "ตั้งอุณหภูมิน้ำมัน"), ml("Fill a deep heavy wok no more than halfway with oil and heat to 175°C. Keep a lid and thermometer nearby, dry the basil completely, and prepare a wire rack; never add wet leaves to hot oil.", "深厚鍋加油不超過一半，加熱至 175°C；旁備鍋蓋、溫度計與瀝油架，九層塔必須全乾，濕葉不可下熱油。", "深鍋の半分以下まで油を入れ175°Cにし、バジルを完全に乾かします。", "깊은 냄비 절반 이하로 기름을 넣어 175°C로 맞추고 바질을 완전히 말립니다.", "ใส่น้ำมันไม่เกินครึ่งหม้อ อุ่นถึง 175°C และซับโหระพาให้แห้งสนิท")),
      step(ml("Fry in small batches", "分批炸熟雞肉", "少量ずつ揚げる", "소량씩 튀기기", "ทอดทีละน้อย"), ml("Fry chicken in three batches for 3½–4½ minutes, stirring only after the coating sets. Hold oil at 165–175°C and remove when deep gold and the thickest piece reaches 74°C; drain on the rack.", "雞肉分三批各炸 3½–4½ 分鐘，外殼定型後才翻動；油溫維持 165–175°C，深金黃且最厚處達 74°C 即上架瀝油。", "3回に分け3分半〜4分半、油を165〜175°Cに保ち、中心74°Cまで揚げます。", "세 번에 나눠 3분30초~4분30초, 기름을 165~175°C로 유지하고 중심 74°C까지 튀깁니다.", "ทอด 3 รอบ รอบละ 3½–4½ นาที รักษา 165–175°C จนใจกลาง 74°C")),
      step(ml("Flash-fry the basil", "快速炸九層塔", "バジルをさっと揚げる", "바질 빠르게 튀기기", "ทอดโหระพาเร็ว ๆ"), ml("Let oil return to 175°C. Lower basil in a long-handled mesh strainer, cover with a splatter screen, and fry 8–12 seconds until crisp and vivid green; lift immediately and drain.", "油溫回到 175°C；九層塔放長柄網勺並蓋防噴網，炸 8–12 秒至酥脆翠綠，立刻撈起瀝油。", "油を175°Cに戻し、バジルを8〜12秒だけ揚げます。", "기름을 175°C로 올려 바질을 8~12초만 튀깁니다.", "ให้น้ำมันกลับ 175°C ทอดโหระพาในตะแกรง 8–12 วินาทีแล้วตักทันที")),
      step(ml("Season while hot", "趁熱撒香料", "熱いうちに調味する", "뜨거울 때 간하기", "ปรุงขณะร้อน"), ml("Put hot chicken and basil in a large metal bowl. Sprinkle salt, remaining white pepper, and optional chile from high enough to distribute evenly; toss 10 seconds and serve at once without trapping steam under a cover.", "熱雞肉與九層塔放大金屬盆，均勻撒鹽、其餘白胡椒與辣椒粉，拋拌 10 秒；不可加蓋悶住蒸氣，立即上桌。", "熱いうちに塩、白こしょう、唐辛子を10秒和え、すぐ供します。", "뜨거울 때 소금, 흰 후추, 고춧가루를 10초 버무려 바로 냅니다.", "คลุกไก่ร้อนกับเกลือ พริกไทยขาว และพริก 10 วินาที เสิร์ฟทันทีไม่ปิดฝา"))
    ],
    substitutions: [
      ml("Chicken breast can be used, but cut 3 cm pieces and remove each batch as soon as the centre reaches 74°C to avoid dryness.", "可用雞胸，仍切 3 公分塊；每批中心一到 74°C 就撈出，避免乾柴。", "鶏むね肉なら中心74°Cですぐ取り出します。", "닭가슴살은 중심 74°C가 되자마자 건져 마르지 않게 하세요.", "ใช้อกไก่ได้ แต่ตักขึ้นทันทีเมื่อใจกลาง 74°C เพื่อไม่ให้แห้ง"),
      ml("Fine potato starch works when coarse sweet potato starch is unavailable, but the crust will be smoother and less characteristically craggy.", "買不到粗粒地瓜粉可用馬鈴薯澱粉，但外殼會較平滑，少了典型顆粒感。", "粗いでんぷんがなければ片栗粉でもよいですが、衣は滑らかになります。", "굵은 고구마 전분이 없으면 감자전분을 쓰되 껍질이 더 매끈해집니다.", "ใช้แป้งมันฝรั่งแทนได้ แต่เปลือกจะเรียบและมีเกล็ดน้อยลง")
    ],
    cultureNote: ml("Yan su ji is a broad Taiwanese fried-snack tradition; the chicken version is recognised by sweet potato starch, five-spice and pepper, and the brief shower of fried basil.", "鹽酥雞也指一整套台式炸物文化；雞肉版本的辨識點是地瓜粉、五香白胡椒與最後快炸九層塔。", "鹽酥雞は台湾の揚げ物文化を代表し、でんぷん、五香粉、白こしょう、揚げバジルが特徴です。", "옌수지는 대만 튀김 문화로, 고구마 전분, 오향, 흰 후추와 튀긴 바질이 특징입니다.", "เหยียนซูจีเป็นวัฒนธรรมของทอดไต้หวัน จุดเด่นคือแป้งมันหวาน ผงพะโล้ พริกไทยขาว และโหระพาทอด"),
    imageAlt: ml("Craggy Taiwanese popcorn chicken with fried basil and white-pepper seasoning", "外殼凹凸酥脆、拌炸九層塔與白胡椒的台灣鹽酥雞", "揚げバジルと白こしょうの台湾風鶏唐揚げ", "튀긴 바질과 흰 후추를 곁들인 거친 껍질의 대만식 옌수지", "ไก่ทอดป๊อปคอร์นไต้หวันเปลือกเกล็ดกับโหระพาทอดและพริกไทยขาว"),
    visualSpec: "Small irregular deep-golden chicken nuggets with distinctly craggy sweet-potato-starch crust, crisp green basil leaves, and fine pepper seasoning; no sauce or lemon."
  })
];
