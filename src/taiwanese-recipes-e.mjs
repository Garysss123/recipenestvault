import { ingredient, makeTaiwaneseRecipe, ml, step } from "./taiwanese-recipe-helpers.mjs";

export const taiwaneseRecipesE = [
  makeTaiwaneseRecipe({
    id: "jiufen-taro-balls", profile: "dessert", prepMinutes: 35, cookMinutes: 35, totalMinutes: 70, servings: 6,
    name: ml("Jiufen Taro Balls", "九份芋圓地瓜圓", "九份タロイモ団子", "지우펀 타로볼", "บัวลอยเผือกจิ่วเฟิ่น"),
    description: ml("Steamed taro and sweet potato are kneaded with tapioca starch, cut into small chewy balls, boiled, shocked, and served in ginger syrup.", "蒸熟芋頭與地瓜分別揉入樹薯粉，切成小顆軟 Q 芋圓與地瓜圓，煮熟冰鎮後配薑糖水。", "蒸したタロイモとさつまいもをタピオカでんぷんと練り、もちっとした団子にして生姜蜜で供します。", "찐 토란과 고구마에 타피오카 전분을 넣어 쫄깃한 작은 볼로 삶아 생강 시럽과 냅니다.", "นวดเผือกและมันหวานนึ่งกับแป้งมันสำปะหลัง ตัดเป็นลูกหนึบ ต้ม ช็อกน้ำเย็น และเสิร์ฟน้ำขิงหวาน"),
    ingredients: [
      ingredient("400 g", "peeled taro, 3 cm pieces", "去皮芋頭，切 3 公分塊", "里芋（3cm）", "껍질 벗긴 토란, 3cm", "เผือกปอก หั่น 3 ซม."),
      ingredient("400 g", "peeled orange sweet potato, 3 cm pieces", "去皮紅肉地瓜，切 3 公分塊", "さつまいも（3cm）", "주황 고구마, 3cm", "มันหวานสีส้มปอก หั่น 3 ซม."),
      ingredient("200 g", "tapioca starch, divided, plus dusting", "樹薯粉，分次使用，另備防沾", "タピオカでんぷん", "타피오카 전분", "แป้งมันสำปะหลัง แบ่งใช้และสำหรับนวล"),
      ingredient("50 g", "sugar for dough, divided", "麵糰用糖，分次", "生地用砂糖", "반죽용 설탕", "น้ำตาลสำหรับแป้ง แบ่งใช้"),
      ingredient("0–80 ml", "boiling water, as needed", "沸水，視需要 0–80 毫升", "熱湯（必要に応じ0〜80ml）", "끓는 물, 필요 시 0~80ml", "น้ำเดือด 0–80 มล. ตามจำเป็น"),
      ingredient("1 L", "water for syrup", "糖水用水", "蜜用の水", "시럽용 물", "น้ำสำหรับน้ำเชื่อม"),
      ingredient("150 g", "dark brown sugar", "黑糖", "黒糖", "흑설탕", "น้ำตาลทรายแดงเข้ม"),
      ingredient("35 g", "ginger, sliced", "薑，切片", "しょうが", "생강", "ขิง หั่น")
    ],
    instructions: [
      step(ml("Steam roots until dry-tender", "蒸至乾鬆熟透", "芋を蒸す", "뿌리채소 찌기", "นึ่งหัวพืชจนสุกแห้ง"), ml("Steam taro and sweet potato in separate shallow dishes for 20–25 minutes until a skewer passes through without resistance. Keep condensation out of the dishes; excess water makes the starch ratio unreliable.", "芋頭與地瓜分開放淺盤蒸 20–25 分鐘，竹籤可無阻力穿過即熟；避免鍋蓋水滴入盤，過多水分會破壞粉量判斷。", "別々の皿で20〜25分、串が楽に通るまで蒸し、水滴を入れません。", "토란과 고구마를 따로 20~25분, 꼬치가 쉽게 들어가게 찌고 응축수가 닿지 않게 합니다.", "นึ่งเผือกและมันแยกจาน 20–25 นาทีจนไม้แทงง่าย ป้องกันหยดน้ำลงจาน")),
      step(ml("Mash while hot", "趁熱壓泥調糖", "熱いうちにつぶす", "뜨거울 때 으깨기", "บดขณะร้อน"), ml("Weigh 350 g cooked taro and 350 g cooked sweet potato into separate bowls. Mash completely while hot and mix 25 g sugar into each; leave no hard lumps that could tear the ropes.", "各秤 350 公克熟芋頭與熟地瓜入不同碗，趁熱壓成完全細泥，各拌 25 公克糖；不可留硬塊，以免搓條時裂開。", "各350gを熱いうちになめらかにつぶし、砂糖25gずつ混ぜます。", "각각 익힌 뿌리 350g을 뜨거울 때 곱게 으깨 설탕 25g씩 섞습니다.", "ชั่งเผือกและมันสุกอย่างละ 350 กรัม บดร้อนให้เนียน ใส่น้ำตาลอย่างละ 25 กรัม")),
      step(ml("Knead two flexible doughs", "分別揉成柔韌麵糰", "二種類の生地を練る", "두 반죽 만들기", "นวดแป้งสองสี"), ml("Work 100 g tapioca starch into each mash. Knead 2–3 minutes; add boiling water 10 ml at a time only if the dough cracks, stopping when it is smooth, flexible, and not sticky.", "每份泥揉入 100 公克樹薯粉 2–3 分鐘；只有麵糰裂時才每次加 10 毫升沸水，至光滑可彎、不黏手即停。", "各100gのでんぷんを練り、割れる場合だけ熱湯を10mlずつ加えます。", "각 반죽에 전분 100g을 넣고 갈라질 때만 끓는 물을 10ml씩 추가합니다.", "นวดแป้งมันอย่างละ 100 กรัม เติมน้ำเดือดครั้งละ 10 มล. เฉพาะเมื่อแป้งแตก หยุดเมื่อเนียนยืดหยุ่นไม่ติด")),
      step(ml("Roll, cut, and dust", "搓條切粒防沾", "棒状にして切る", "굴려 잘라 가루 묻히기", "คลึง ตัด และคลุกแป้ง"), ml("Keep one dough covered while working with the other. Roll into 1.5 cm ropes, cut 2 cm pillows, and toss very lightly in tapioca starch; shake off all loose powder before boiling.", "處理一色時另一色加蓋。搓成直徑 1.5 公分長條，切 2 公分小枕，極薄拌樹薯粉防沾；下鍋前篩掉所有浮粉。", "直径1.5cmの棒にし2cmに切り、薄くでんぷんをまぶします。", "지름 1.5cm 줄로 굴려 2cm로 자르고 전분을 아주 얇게 묻힙니다.", "คลึงเส้นผ่านศูนย์กลาง 1.5 ซม. ตัด 2 ซม. คลุกแป้งบาง ๆ และร่อนแป้งส่วนเกิน")),
      step(ml("Boil and shock", "煮浮後冰鎮", "ゆでて冷やす", "삶아 차게 식히기", "ต้มและช็อกน้ำเย็น"), ml("Boil in two batches in abundant water. Stir once after adding; when all balls float, cook 2 minutes more. Transfer directly to ice water for 2 minutes, drain, and toss with 15 ml prepared syrup.", "大量滾水分兩批煮，下鍋後攪一次；全部浮起再煮 2 分鐘。立刻冰水鎮 2 分鐘，瀝乾後拌 15 毫升已煮糖水。", "たっぷりの湯で浮いてから2分ゆで、氷水で2分冷やします。", "넉넉한 물에 떠오른 뒤 2분 더 삶아 얼음물에 2분 식힙니다.", "ต้มสองรอบในน้ำมาก คนหนึ่งครั้ง เมื่อลอยทั้งหมดต้มต่อ 2 นาที ช็อกน้ำแข็ง 2 นาที")),
      step(ml("Make ginger syrup and serve", "煮薑糖水上桌", "生姜蜜で供する", "생강 시럽에 내기", "ทำน้ำขิงหวานและเสิร์ฟ"), ml("Simmer 1 L water, brown sugar, and ginger for 12 minutes; cool to warm or chill. Divide 150 g mixed balls per bowl and add 180 ml syrup. Serve within 2 hours for the best chew.", "1 公升水、黑糖與薑片小滾 12 分鐘，放至溫熱或冷藏。每碗放 150 公克混合芋圓地瓜圓，加 180 毫升糖水；2 小時內食用口感最佳。", "水、黒糖、生姜を12分煮て、団子150gと蜜180mlを各器に盛ります。", "물, 흑설탕, 생강을 12분 끓여 볼 150g과 시럽 180ml를 담습니다.", "เคี่ยวน้ำ 1 ลิตร น้ำตาล และขิง 12 นาที ใส่ลูกผสมชามละ 150 กรัมกับน้ำเชื่อม 180 มล."))
    ],
    substitutions: [
      ml("Purple sweet potato can replace orange sweet potato, but it is often drier; add boiling water only by the 10 ml test.", "紫地瓜可替代紅肉地瓜，但通常較乾；仍只依每次 10 毫升測試補沸水。", "紫芋でもよく、乾きやすいので熱湯は10mlずつ加えます。", "자색 고구마는 더 건조할 수 있어 끓는 물을 10ml씩만 보충하세요.", "ใช้มันม่วงแทนได้ แต่มักแห้งกว่า ให้เติมน้ำเดือดทีละ 10 มล."),
      ml("Potato starch gives a softer, less bouncy ball; replace no more than half the tapioca starch.", "馬鈴薯澱粉會較軟、彈性較低，最多只替代一半樹薯粉。", "片栗粉は半量までにし、食感は柔らかくなります。", "감자전분은 절반까지만 대체하며 더 부드러워집니다.", "แป้งมันฝรั่งทำให้นุ่มเด้งน้อย ใช้แทนไม่เกินครึ่งหนึ่ง")
    ],
    storage: ml("Uncooked dusted balls freeze in one layer, then bag for up to 1 month and boil from frozen. Cooked balls are best within 2 hours and become hard when refrigerated.", "生芋圓防沾後單層冷凍，再裝袋可放 1 個月，免退冰直接煮；熟芋圓 2 小時內最佳，冷藏會變硬。", "生は一層で冷凍後1か月、凍ったままゆでます。ゆでたものは2時間以内が最良です。", "생 볼은 한 겹으로 얼려 1개월, 해동 없이 삶고 익힌 것은 2시간 안에 먹습니다.", "ลูกดิบแช่แข็งชั้นเดียวแล้วใส่ถุงได้ 1 เดือน ต้มจากแข็ง ลูกสุกดีที่สุดภายใน 2 ชั่วโมง"),
    cultureNote: ml("Jiufen is especially associated with taro balls, whose 'Q' texture means pleasantly resilient, not rubbery. Root moisture determines the final starch and water adjustment.", "九份與芋圓特別密切；所謂「Q」是舒服的回彈，不是橡皮硬。根莖含水量決定最後粉與水的微調。", "九份の芋圓は、ゴム状ではなく心地よい弾力が特徴です。", "지우펀 타로볼의 Q 식감은 고무처럼 질긴 것이 아니라 기분 좋은 탄력입니다.", "จิ่วเฟิ่นขึ้นชื่อเรื่องลูกเผือก เนื้อ Q หมายถึงเด้งพอดีไม่ใช่เหนียวเหมือนยาง"),
    imageAlt: ml("Grey-purple taro balls and golden sweet potato balls in ginger brown-sugar syrup", "灰紫芋圓與金黃地瓜圓泡在薑味黑糖水中", "灰紫のタロイモ団子と黄金色のさつまいも団子の生姜黒蜜", "회보라 타로볼과 금빛 고구마볼이 든 생강 흑설탕 시럽", "ลูกเผือกสีม่วงเทาและลูกมันสีทองในน้ำขิงน้ำตาลแดง"),
    visualSpec: "Small irregular pillow-shaped grey-purple taro balls and orange-gold sweet potato balls in clear amber ginger syrup; visibly chewy, not perfect factory spheres."
  }),

  makeTaiwaneseRecipe({
    id: "coffin-bread", profile: "dough", prepMinutes: 25, cookMinutes: 30, totalMinutes: 55, servings: 4,
    name: ml("Tainan Coffin Bread", "台南棺材板", "台南棺材パン", "타이난 관차이반", "ขนมปังโลงศพไถหนาน"),
    description: ml("Thick crisp-fried milk-bread boxes are hollowed, filled with creamy chicken-and-vegetable stew, and capped with their toast lids.", "厚切牛奶吐司炸成酥脆盒，挖空後裝入奶香雞肉蔬菜濃湯，再蓋回吐司蓋，是台南棺材板。", "厚切りミルクパンを揚げてくり抜き、クリーム煮を詰めてふたを戻します。", "두꺼운 우유식빵을 바삭하게 튀겨 속을 파고 크리미한 닭고기 채소 스튜를 채워 뚜껑을 덮습니다.", "ทอดขนมปังนมหนาเป็นกล่องกรอบ คว้านไส้ เติมสตูว์ไก่ผักครีม และปิดฝาขนมปัง"),
    ingredients: [
      ingredient("4", "milk-bread blocks, 10 × 10 × 6 cm", "牛奶吐司厚塊，10 × 10 × 6 公分", "ミルクパン（10×10×6cm）", "우유식빵 블록 10×10×6cm", "ก้อนขนมปังนม 10×10×6 ซม."),
      ingredient("600 ml", "neutral frying oil", "中性炸油", "揚げ油", "튀김유", "น้ำมันทอด"),
      ingredient("300 g", "boneless chicken thigh, 2 cm pieces", "去骨雞腿，切 2 公分塊", "鶏もも肉（2cm）", "순살 닭다리, 2cm", "สะโพกไก่ไร้กระดูก หั่น 2 ซม."),
      ingredient("120 g", "carrot, 1 cm dice", "胡蘿蔔，切 1 公分丁", "にんじん（1cm角）", "당근, 1cm", "แครอต หั่นเต๋า 1 ซม."),
      ingredient("120 g", "peas", "豌豆", "グリーンピース", "완두콩", "ถั่วลันเตา"),
      ingredient("150 g", "mushrooms, quartered", "蘑菇，切四瓣", "きのこ（4等分）", "버섯, 4등분", "เห็ด ผ่าสี่"),
      ingredient("45 g", "unsalted butter", "無鹽奶油", "無塩バター", "무염버터", "เนยจืด"),
      ingredient("45 g", "all-purpose flour", "中筋麵粉", "中力粉", "중력분", "แป้งอเนกประสงค์"),
      ingredient("500 ml", "unsalted chicken stock, hot", "無鹽雞高湯，熱", "無塩チキンスープ", "무염 닭육수, 뜨거운 것", "น้ำสต๊อกไก่ไม่เค็ม ร้อน"),
      ingredient("200 ml", "whole milk, hot", "全脂牛奶，熱", "牛乳", "전지우유, 뜨거운 것", "นมสด ร้อน"),
      ingredient("6 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("2 g", "ground white pepper", "白胡椒粉", "白こしょう", "흰 후추", "พริกไทยขาว")
    ],
    instructions: [
      step(ml("Cook the chicken and vegetables", "炒熟雞肉蔬菜", "鶏肉と野菜を炒める", "닭고기와 채소 익히기", "ผัดไก่และผัก"), ml("Melt 15 g butter in a saucepan over medium-high. Brown chicken 4 minutes, add carrot and mushrooms for 4 minutes, then peas for 1 minute; chicken need not yet reach final temperature.", "中大火融 15 公克奶油，雞肉煎 4 分鐘；加胡蘿蔔與蘑菇再炒 4 分鐘，豌豆最後 1 分鐘，此時雞肉不必已達最終溫度。", "バター15gで鶏肉4分、にんじんときのこ4分、豆1分炒めます。", "버터 15g에 닭고기 4분, 당근과 버섯 4분, 완두콩 1분 볶습니다.", "ผัดไก่ในเนย 15 กรัม 4 นาที เติมแครอตและเห็ด 4 นาที ถั่ว 1 นาที")),
      step(ml("Build a smooth cream sauce", "煮滑順奶油醬", "クリームソースを作る", "크림 소스 만들기", "ทำซอสครีมเนียน"), ml("Add remaining 30 g butter and flour; cook, stirring, 2 minutes. Whisk in hot stock in four additions, then milk, and simmer 5–7 minutes until smooth and thick enough to mound softly.", "加其餘 30 公克奶油與麵粉，攪炒 2 分鐘；熱高湯分四次拌入，再加牛奶，小滾 5–7 分鐘至滑順、可柔軟堆起。", "残りのバターと粉を2分炒め、熱いスープを4回に分け、牛乳を加えて5〜7分煮ます。", "남은 버터와 밀가루를 2분 볶고 뜨거운 육수를 네 번 나눠 넣은 뒤 우유를 넣어 5~7분 끓입니다.", "ใส่เนยที่เหลือกับแป้งผัด 2 นาที คนสต๊อกร้อน 4 ครั้ง เติมนม เคี่ยว 5–7 นาทีจนข้นเนียน")),
      step(ml("Finish the filling safely", "完成安全熟度內餡", "具を仕上げる", "소 안전하게 완성", "ทำไส้ให้สุกปลอดภัย"), ml("Return chicken and vegetables, add salt and pepper, and simmer 4–6 minutes until every chicken piece reaches 74°C. Hold over very low heat; if it becomes pasty, whisk in hot stock 15 ml at a time.", "雞肉蔬菜回鍋，加鹽與白胡椒，小滾 4–6 分鐘至每塊雞 74°C；極小火保溫，若過稠就每次拌入 15 毫升熱高湯。", "具を戻し4〜6分、鶏肉74°Cまで煮て保温します。", "닭고기와 채소를 넣어 4~6분, 닭이 74°C가 되게 끓입니다.", "ใส่ไก่และผักกลับ ปรุงเกลือพริกไทย เคี่ยว 4–6 นาทีจนไก่ทุกชิ้น 74°C")),
      step(ml("Fry the bread blocks", "炸酥吐司厚塊", "パンを揚げる", "식빵 튀기기", "ทอดก้อนขนมปัง"), ml("Heat oil in a deep skillet to 175°C. Fry one bread block at a time for 45–60 seconds per broad face and 20 seconds per edge until evenly deep gold; drain upright on a rack.", "深鍋油溫 175°C，吐司每次一塊，兩大面各炸 45–60 秒、四邊各約 20 秒，至均勻深金黃；直立放網架瀝油。", "油175°Cでパンを一つずつ、広い面45〜60秒、側面20秒ずつ揚げます。", "기름 175°C에서 식빵을 하나씩 넓은 면 45~60초, 옆면 20초씩 튀깁니다.", "ทอดก้อนขนมปังทีละก้อนที่ 175°C ด้านกว้างละ 45–60 วินาที ขอบละ 20 วินาที")),
      step(ml("Cut lids and hollow", "切蓋挖空", "ふたを切ってくり抜く", "뚜껑 잘라 속 파기", "ตัดฝาและคว้าน"), ml("Rest bread 2 minutes. Cut a 1 cm inset square through only three sides of the top to make a hinged lid. Lift it and remove soft crumb, leaving a 1.5 cm wall and base; do not puncture the box.", "吐司靜置 2 分鐘，頂面內縮 1 公分只切三邊做鉸鏈蓋；掀開後挖掉軟心，四壁與底保留 1.5 公分，不可刺穿。", "2分休ませ、上面を三辺だけ切ってふたにし、壁と底を1.5cm残してくり抜きます。", "2분 쉬고 윗면 세 변만 잘라 뚜껑을 만들고 벽과 바닥 1.5cm를 남겨 속을 팝니다.", "พัก 2 นาที ตัดด้านบนสามด้านเป็นฝาพับ คว้านไส้ เหลือผนังและฐาน 1.5 ซม. ไม่ให้ทะลุ")),
      step(ml("Fill and cap at once", "填餡蓋回立即上桌", "詰めてすぐ供する", "채워 바로 내기", "เติมและปิดเสิร์ฟทันที"), ml("Spoon 220–240 g hot filling into each crisp bread box, stopping below the rim. Close the toast lid and serve within 5 minutes so the walls remain crisp and the filling stays above 60°C.", "每個酥脆吐司盒填 220–240 公克熱餡，低於盒緣；蓋回吐司蓋，5 分鐘內上桌，使外壁保持酥脆且內餡高於 60°C。", "各パンに60°C以上の熱い具220〜240gを詰め、ふたを閉じ5分以内に供します。", "각 식빵 상자에 60°C 이상인 소 220~240g을 넣어 뚜껑을 덮고 5분 안에 냅니다.", "ตักไส้ร้อนอย่างน้อย 60°C ปริมาณ 220–240 กรัมต่อกล่อง ปิดฝาและเสิร์ฟภายใน 5 นาที"))
    ],
    substitutions: [
      ml("Peeled shrimp can replace chicken; add it only during the final simmer and cook to 63°C so it does not toughen.", "去殼蝦可替代雞肉，只在最後小滾時加入並煮至 63°C，避免變硬。", "鶏肉はむき海老に替え、最後に63°Cまで煮ます。", "닭고기 대신 새우를 마지막에 넣어 63°C까지만 익힙니다.", "ใช้กุ้งแกะแทนไก่ได้ ใส่ตอนเคี่ยวสุดท้ายและปรุงถึง 63°C"),
      ml("For a baked version, brush bread with melted butter and bake at 200°C for 10–14 minutes, turning once; it will be lighter but less uniformly crisp.", "烘烤版可刷融化奶油，200°C 烤 10–14 分鐘並翻一次；較清爽但酥脆度不如油炸均勻。", "軽くするならバターを塗り200°Cで10〜14分、途中で返して焼きます。", "구운 버전은 녹인 버터를 발라 200°C에서 10~14분 한 번 뒤집어 굽습니다.", "แบบอบทาเนยละลาย อบ 200°C 10–14 นาที พลิกหนึ่งครั้ง จะเบากว่าแต่กรอบไม่เท่ากัน")
    ],
    cultureNote: ml("Coffin bread originated in Tainan and is defined by the playful hinged toast box filled with savoury cream stew. The name refers to its shape, not an ingredient or ritual.", "棺材板源自台南，特色是有鉸鏈蓋的吐司盒裝鹹奶油濃湯；名稱只形容外形，與食材或儀式無關。", "棺材パンは台南発祥で、ふた付きの揚げパン箱にクリーム煮を詰めた形から名付けられました。", "관차이반은 타이난에서 시작된 뚜껑 달린 튀긴 식빵 상자 요리로 이름은 모양을 뜻합니다.", "ขนมปังโลงศพมีต้นกำเนิดไถหนาน เป็นกล่องขนมปังทอดมีฝาใส่สตูว์ครีม ชื่อเรียกตามรูปทรง"),
    imageAlt: ml("Tainan coffin bread with a crisp toast lid opened over creamy chicken-and-vegetable filling", "酥脆吐司蓋掀開、內裝奶香雞肉蔬菜餡的台南棺材板", "ふたを開けた揚げパン箱に鶏肉と野菜のクリーム煮を詰めた台南棺材パン", "바삭한 식빵 뚜껑을 열어 닭고기 채소 크림 소가 보이는 타이난 관차이반", "ขนมปังโลงศพไถหนานเปิดฝา เห็นไส้ครีมไก่และผัก"),
    visualSpec: "A deep-golden thick toast box with a hinged square lid propped open, filled to the rim with creamy white chicken stew, carrot, peas, and mushrooms."
  }),

  makeTaiwaneseRecipe({
    id: "taiwanese-oil-rice", profile: "braise", prepMinutes: 390, cookMinutes: 60, totalMinutes: 450, servings: 8,
    name: ml("Taiwanese Oil Rice", "台灣油飯", "台湾おこわ", "대만식 유판", "ข้าวเหนียวน้ำมันไต้หวัน"),
    description: ml("Steamed long-grain sticky rice is folded with pork belly, dried shrimp, shiitake, ginger, fried shallots, soy, five-spice, and mushroom stock.", "蒸熟長糯米拌入五花肉、蝦米、香菇、薑、油蔥酥、醬油、五香與香菇水，粒粒油亮軟 Q。", "蒸した長粒もち米に豚バラ、干し海老、椎茸、しょうが、揚げねぎ、しょうゆ、五香粉を混ぜます。", "찐 장립 찹쌀에 삼겹살, 건새우, 표고, 생강, 튀긴 샬롯, 간장과 오향을 섞습니다.", "คลุกข้าวเหนียวยาวนึ่งกับหมูสามชั้น กุ้งแห้ง เห็ดหอม ขิง หอมเจียว ซีอิ๊ว และผงพะโล้"),
    ingredients: [
      ingredient("600 g", "long-grain glutinous rice, soaked 6 hours", "長糯米，浸泡 6 小時", "長粒もち米（6時間浸水）", "장립 찹쌀, 6시간 불림", "ข้าวเหนียวเมล็ดยาว แช่ 6 ชั่วโมง"),
      ingredient("300 g", "pork belly, 1 cm strips", "五花肉，切 1 公分條", "豚バラ（1cm幅）", "삼겹살, 1cm", "หมูสามชั้น หั่นเส้น 1 ซม."),
      ingredient("8", "dried shiitake, soaked, sliced; liquid reserved", "乾香菇，泡軟切片，保留泡菇水", "干し椎茸（戻して薄切り）", "마른 표고, 불려 썰고 물 보관", "เห็ดหอมแห้ง แช่ ซอย เก็บน้ำ"),
      ingredient("45 g", "dried shrimp, rinsed and chopped", "蝦米，沖洗切碎", "干し海老", "건새우, 헹궈 다짐", "กุ้งแห้ง ล้างและสับ"),
      ingredient("25 g", "ginger, julienned", "薑，切絲", "しょうが（千切り）", "생강, 채 썬 것", "ขิง ซอยเส้น"),
      ingredient("60 g", "fried shallots", "油蔥酥", "揚げねぎ", "튀긴 샬롯", "หอมเจียว"),
      ingredient("60 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("15 ml", "dark soy sauce", "老抽", "濃口しょうゆ", "노두유", "ซีอิ๊วดำ"),
      ingredient("30 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("12 g", "sugar", "糖", "砂糖", "설탕", "น้ำตาล"),
      ingredient("3 g", "five-spice powder", "五香粉", "五香粉", "오향분", "ผงพะโล้ห้าอย่าง"),
      ingredient("500 ml", "strained mushroom soaking liquid, hot", "過濾香菇水，熱", "椎茸の戻し汁", "거른 표고물, 뜨거운 것", "น้ำแช่เห็ดกรอง ร้อน")
    ],
    instructions: [
      step(ml("Soak and steam the rice", "浸泡並蒸糯米", "もち米を蒸す", "찹쌀 불려 찌기", "แช่และนึ่งข้าว"), ml("Rinse rice, soak in cool water 6 hours, and drain 30 minutes. Spread 3 cm deep in a cloth-lined steamer, poke six steam holes, and steam over strong steam 25–30 minutes until translucent but still pleasantly chewy.", "長糯米洗淨冷水泡 6 小時，瀝 30 分鐘；鋪在墊濕布蒸籠中厚 3 公分，戳六個透氣孔，旺蒸 25–30 分鐘至透明仍有 Q 度。", "もち米を6時間浸し30分水切りし、強い蒸気で25〜30分蒸します。", "찹쌀을 6시간 불려 30분 물 뺀 뒤 센 증기로 25~30분 찝니다.", "ล้างแช่ข้าว 6 ชั่วโมง สะเด็ด 30 นาที ปูหนา 3 ซม. เจาะรูไอน้ำ 6 รู นึ่งแรง 25–30 นาที")),
      step(ml("Render the pork belly", "煸出五花肉油脂", "豚バラの脂を出す", "삼겹살 기름 내기", "เจียวมันหมู"), ml("Cook pork belly in a large wok over medium-low for 8–10 minutes until fat renders and edges colour. Spoon off all but 35 ml fat and keep the pork in the wok.", "五花肉大炒鍋中小火煸 8–10 分鐘，至油脂析出、邊緣上色；鍋中只留 35 毫升油，豬肉留鍋。", "豚バラを8〜10分炒め、脂を35mlだけ残します。", "삼겹살을 8~10분 볶아 기름을 내고 35ml만 남깁니다.", "ผัดหมูสามชั้นไฟกลางอ่อน 8–10 นาทีให้มันออก เหลือมันในกระทะ 35 มล.")),
      step(ml("Fry the aromatic ingredients", "炒香配料", "香味材料を炒める", "향 재료 볶기", "ผัดเครื่องหอม"), ml("Add dried shrimp and ginger for 60 seconds, then shiitake for 3 minutes until fragrant and lightly browned. Add half the fried shallots and stir 30 seconds.", "加蝦米與薑絲炒 60 秒，再加香菇炒 3 分鐘至出香微上色；拌入一半油蔥酥 30 秒。", "干し海老としょうがを1分、椎茸を3分炒め、揚げねぎの半量を加えます。", "건새우와 생강을 1분, 표고를 3분 볶고 튀긴 샬롯 절반을 넣습니다.", "ผัดกุ้งแห้งกับขิง 60 วินาที เติมเห็ด 3 นาที แล้วใส่หอมเจียวครึ่งหนึ่ง 30 วินาที")),
      step(ml("Concentrate the seasoning liquid", "濃縮調味湯汁", "調味液を煮詰める", "양념 국물 농축", "เคี่ยวน้ำปรุง"), ml("Add both soy sauces, rice wine, sugar, five-spice, and 500 ml hot mushroom liquid. Cover and simmer 12 minutes, then uncover and reduce until 220–250 ml concentrated liquid remains.", "加入兩種醬油、米酒、糖、五香與 500 毫升熱香菇水，加蓋小滾 12 分鐘；開蓋收至剩 220–250 毫升濃縮湯汁。", "調味料と椎茸水500mlを覆って12分煮て、220〜250mlまで煮詰めます。", "양념과 표고물 500ml를 덮어 12분 끓인 뒤 220~250ml로 졸입니다.", "เติมซีอิ๊ว เหล้าข้าว น้ำตาล ผงพะโล้ และน้ำเห็ด 500 มล. ปิดเคี่ยว 12 นาที เปิดงวดเหลือ 220–250 มล.")),
      step(ml("Fold rice through the sauce", "把糯米拌入醬汁", "もち米をたれに混ぜる", "찹쌀을 소스에 섞기", "คลุกข้าวกับซอส"), ml("Add hot steamed rice in three additions, folding and breaking clumps without mashing grains. Continue over low heat 3–5 minutes until every grain is glossy and all visible liquid is absorbed.", "熱糯米分三次加入，由底部翻拌並拆散結塊，不壓爛米粒；小火續拌 3–5 分鐘，至每粒油亮且看不到游離湯汁。", "蒸した米を3回に分けて加え、粒を潰さず3〜5分混ぜ、汁を吸わせます。", "찐 찹쌀을 세 번 나눠 넣어 알을 으깨지 않고 3~5분 섞어 국물을 흡수시킵니다.", "ใส่ข้าวนึ่งร้อน 3 ครั้ง พับแยกก้อนโดยไม่บด ผัดไฟอ่อน 3–5 นาทีจนทุกเมล็ดเงาและดูดน้ำหมด")),
      step(ml("Final steam and rest", "回蒸並靜置", "仕上げに蒸して休ませる", "마지막 찌고 쉬기", "นึ่งซ้ำและพัก"), ml("Return the mixture to the lined steamer and steam 10 minutes. Turn off heat and rest covered 10 minutes, then fluff gently and finish with remaining fried shallots; serve with sweet chile sauce separately if desired.", "油飯回鋪蒸籠再蒸 10 分鐘；關火加蓋靜置 10 分鐘，輕輕翻鬆，撒其餘油蔥酥；甜辣醬可另放。", "蒸し器に戻して10分蒸し、覆って10分休ませ、残りの揚げねぎを加えます。", "찜기에 돌려 10분 찌고 10분 덮어 쉬며 남은 샬롯을 올립니다.", "ใส่กลับลังถึง นึ่ง 10 นาที ปิดพัก 10 นาที คุ้ยเบา ๆ และโรยหอมเจียวที่เหลือ"))
    ],
    substitutions: [
      ml("Diced chicken thigh can replace pork belly; add 30 ml neutral oil and cook chicken to 74°C before adding aromatics.", "五花肉可換雞腿丁，另加 30 毫升中性油，雞肉先炒至 74°C 再加辛香料。", "豚バラは鶏ももに替え、油30mlを加えて74°Cまで炒めます。", "삼겹살 대신 닭다리를 쓰면 기름 30ml를 더하고 74°C까지 익힙니다.", "ใช้สะโพกไก่แทนหมูได้ เติมน้ำมัน 30 มล. และผัดไก่ถึง 74°C ก่อนใส่เครื่องหอม"),
      ml("For a shellfish-free version, omit dried shrimp and add 20 g finely chopped dried shiitake; the flavour changes but the rice method remains.", "無甲殼類版本省略蝦米，另加 20 公克切細乾香菇；風味不同但米飯操作不變。", "干し海老は干し椎茸20gに替えられます。", "건새우 대신 잘게 썬 마른 표고 20g을 쓸 수 있습니다.", "แบบไม่มีกุ้งให้ตัดกุ้งแห้งและเพิ่มเห็ดหอมแห้งสับ 20 กรัม")
    ],
    cultureNote: ml("Oil rice appears at Taiwanese celebrations, temple events, and family tables, including traditional one-month baby gifts. Its name refers to aromatic fat coating the grains, not greasy pooled oil.", "油飯常見於台灣喜慶、廟會與家庭餐桌，也包含傳統彌月贈禮；名稱指油香包覆米粒，不是盤底積油。", "油飯は台湾の祝い、廟会、家庭、出産一か月の贈り物に登場し、油は米粒を香らせます。", "유판은 대만 잔치, 사원 행사, 가족 식탁과 돌 전 선물에 쓰이며 기름이 쌀알을 향긋하게 감싸는 음식입니다.", "ข้าวน้ำมันอยู่ในงานฉลอง งานวัด โต๊ะครอบครัว และของขวัญเด็กครบเดือน ชื่อหมายถึงไขมันหอมเคลือบเมล็ด ไม่ใช่น้ำมันขัง"),
    imageAlt: ml("Glossy Taiwanese oil rice with pork belly, shiitake, dried shrimp, ginger, and fried shallots", "油亮台灣油飯，拌五花肉、香菇、蝦米、薑絲與油蔥酥", "豚バラ、椎茸、干し海老、しょうが、揚げねぎの台湾おこわ", "삼겹살, 표고, 건새우, 생강과 튀긴 샬롯의 윤기 나는 대만 유판", "ข้าวเหนียวน้ำมันไต้หวันเงา กับหมูสามชั้น เห็ดหอม กุ้งแห้ง ขิง และหอมเจียว"),
    visualSpec: "Separate glossy brown-tinted long sticky-rice grains with visible pork-belly strips, shiitake slices, tiny dried shrimp, ginger threads, and crisp shallots; no wet sauce pool."
  }),

  makeTaiwaneseRecipe({
    id: "peanut-shaved-ice", profile: "dessert", prepMinutes: 95, cookMinutes: 25, totalMinutes: 120, servings: 4,
    name: ml("Taiwanese Peanut Shaved Ice", "台式花生黑糖剉冰", "台湾ピーナッツ黒糖かき氷", "대만식 땅콩 흑당 빙수", "น้ำแข็งไสถั่วลิสงน้ำตาลแดงไต้หวัน"),
    description: ml("Fine shaved ice is layered with cooled dark-brown-sugar syrup, tender braised peanuts, and a little condensed milk for a classic Taiwanese dessert-shop bowl.", "細緻剉冰分層淋上放涼黑糖漿、煮軟花生與少量煉乳，做出台灣冰店熟悉的花生黑糖冰。", "細かなかき氷に冷たい黒蜜、柔らかな煮ピーナッツ、少量の練乳を重ねます。", "고운 빙수에 식힌 흑당 시럽, 부드럽게 조린 땅콩과 소량의 연유를 올립니다.", "น้ำแข็งไสละเอียดราดน้ำตาลแดงเย็น ถั่วลิสงตุ๋นนุ่ม และนมข้นเล็กน้อย"),
    ingredients: [
      ingredient("200 g", "raw skin-on peanuts, soaked 8 hours", "帶皮生花生，浸泡 8 小時", "生ピーナッツ（8時間浸水）", "껍질 있는 생땅콩, 8시간 불림", "ถั่วลิสงดิบติดผิว แช่ 8 ชั่วโมง"),
      ingredient("1.2 L", "water for peanuts", "煮花生用水", "ピーナッツ用の水", "땅콩 삶을 물", "น้ำต้มถั่ว"),
      ingredient("80 g", "sugar for peanuts", "煮花生用糖", "ピーナッツ用砂糖", "땅콩용 설탕", "น้ำตาลสำหรับถั่ว"),
      ingredient("180 g", "dark brown sugar", "黑糖", "黒糖", "흑설탕", "น้ำตาลทรายแดงเข้ม"),
      ingredient("220 ml", "water for syrup", "糖漿用水", "黒蜜用の水", "시럽용 물", "น้ำสำหรับน้ำเชื่อม"),
      ingredient("1 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("1.2 kg", "clear ice made from potable water", "飲用水製透明冰塊", "飲用水の氷", "식수로 만든 맑은 얼음", "น้ำแข็งใสจากน้ำดื่ม"),
      ingredient("60 ml", "sweetened condensed milk, optional", "煉乳，可選", "練乳（好みで）", "연유, 선택", "นมข้นหวาน ตามชอบ"),
      ingredient("40 g", "roasted peanuts, coarsely crushed", "烤花生，粗碎", "炒りピーナッツ（粗く砕く）", "볶은 땅콩, 굵게 부숨", "ถั่วลิสงคั่ว บดหยาบ")
    ],
    instructions: [
      step(ml("Soak and rinse the peanuts", "浸泡並沖洗花生", "ピーナッツを浸す", "땅콩 불리기", "แช่และล้างถั่ว"), ml("Soak raw peanuts in three times their volume of cool water for 8 hours in the refrigerator. Drain, rinse, and discard any shrivelled or discoloured nuts.", "生花生以三倍冷水放冰箱浸泡 8 小時；瀝乾沖洗，丟棄乾皺或變色顆粒。", "生ピーナッツを冷蔵庫で8時間浸し、洗って傷んだものを除きます。", "생땅콩을 물 세 배에 냉장 8시간 불려 씻고 변색된 것은 버립니다.", "แช่ถั่วดิบในน้ำเย็นสามเท่าในตู้เย็น 8 ชั่วโมง ล้างและทิ้งเม็ดเหี่ยวหรือสีผิดปกติ")),
      step(ml("Braise until creamy-tender", "煮至綿軟", "柔らかく煮る", "부드럽게 삶기", "ตุ๋นถั่วให้นุ่มครีม"), ml("Cover soaked peanuts with 1.2 L fresh water, bring to a boil, then simmer covered 55–75 minutes until a nut crushes smoothly between fingers. Add hot water if needed to keep them submerged.", "泡好花生加 1.2 公升清水煮滾，加蓋小滾 55–75 分鐘，至一顆可在指間平滑壓碎；需要時補熱水保持淹沒。", "水1.2Lで覆い55〜75分、指で簡単につぶれるまで煮ます。", "물 1.2L에 덮어 55~75분, 손가락으로 부드럽게 으깨질 때까지 삶습니다.", "เติมน้ำใหม่ 1.2 ลิตร ต้มแล้วปิดเคี่ยว 55–75 นาทีจนบี้ระหว่างนิ้วได้เนียน")),
      step(ml("Sweeten only after tender", "軟後才加糖", "柔らかくなってから甘くする", "부드러워진 뒤 당 넣기", "ใส่น้ำตาลหลังถั่วนุ่ม"), ml("Add 80 g sugar only after the peanuts are tender and simmer uncovered 12 minutes. Cool peanuts in their liquid, then refrigerate at least 1 hour; sugar added early can keep skins firm.", "花生軟後才加 80 公克糖，不加蓋再煮 12 分鐘；連汁放涼後冷藏至少 1 小時，太早加糖會使皮變硬。", "柔らかくなってから砂糖80gを加え12分煮て、煮汁ごと冷やします。", "땅콩이 부드러워진 뒤 설탕 80g을 넣어 12분 끓이고 국물째 식힙니다.", "ใส่น้ำตาล 80 กรัมหลังถั่วนุ่มเท่านั้น เคี่ยวเปิด 12 นาที แล้วพักเย็นในน้ำอย่างน้อย 1 ชั่วโมง")),
      step(ml("Cook and chill brown-sugar syrup", "煮黑糖漿並冷卻", "黒蜜を作って冷やす", "흑당 시럽 끓여 식히기", "ทำน้ำเชื่อมน้ำตาลแดงและแช่เย็น"), ml("Simmer brown sugar, 220 ml water, and salt for 6–8 minutes until fully dissolved and lightly syrupy. Cool to room temperature, cover, and refrigerate until cold; warm syrup melts fine ice.", "黑糖、220 毫升水與鹽小滾 6–8 分鐘至完全溶解、略有稠度；放至室溫後加蓋冷藏，溫糖漿會迅速融冰。", "黒糖、水220ml、塩を6〜8分煮て冷蔵します。", "흑설탕, 물 220ml, 소금을 6~8분 끓여 차게 식힙니다.", "เคี่ยวน้ำตาลแดง น้ำ 220 มล. และเกลือ 6–8 นาที พักถึงอุณหภูมิห้องแล้วแช่เย็น")),
      step(ml("Shave dry, fine ice", "刨出乾鬆細冰", "細かな氷を削る", "고운 얼음 갈기", "ไสน้ำแข็งให้ละเอียดแห้ง"), ml("Chill four bowls. Shave 300 g ice per bowl into fine, dry ribbons, rotating the bowl to build a compact mound. Stop if the machine warms or the ice turns wet and coarse.", "四個碗先冷藏；每碗刨 300 公克冰成乾鬆細片，轉動碗形成緊實冰山。機器變熱或冰變濕粗時就停。", "冷やした器に氷300gずつ細かく削ります。", "차가운 그릇마다 얼음 300g을 가늘고 마르게 갈아 봉우리를 만듭니다.", "แช่ชามให้เย็น ไสน้ำแข็งชามละ 300 กรัมเป็นริบบิ้นละเอียดแห้ง หมุนชามให้เป็นกอง")),
      step(ml("Layer quickly and serve", "快速分層上桌", "すぐに重ねて供する", "빠르게 올려 내기", "จัดชั้นเร็วและเสิร์ฟ"), ml("Drizzle 35 ml cold syrup over each mound, add 80 g drained sweet peanuts and 10 g crushed roasted peanuts, then optional 15 ml condensed milk. Serve within 2 minutes with a spoon wide enough to combine ice and toppings.", "每座冰淋 35 毫升冷黑糖漿，放 80 公克瀝汁甜花生與 10 公克烤花生碎，可再淋 15 毫升煉乳；2 分鐘內上桌。", "各氷に冷たい黒蜜35ml、煮ピーナッツ80g、砕いた豆10g、好みで練乳15mlをかけます。", "얼음마다 찬 시럽 35ml, 단 땅콩 80g, 볶은 땅콩 10g, 선택 연유 15ml를 올려 2분 안에 냅니다.", "ราดน้ำเชื่อมเย็น 35 มล. ใส่ถั่วหวาน 80 กรัม ถั่วคั่วบด 10 กรัม และนมข้น 15 มล. ตามชอบ เสิร์ฟภายใน 2 นาที"))
    ],
    substitutions: [
      ml("Cooked unsweetened red beans can replace peanuts for allergy needs; sweeten after tender using the same method and prevent cross-contact.", "花生過敏可改無糖熟紅豆，仍在煮軟後才加糖，並避免交叉接觸。", "アレルギー対応ではピーナッツを煮小豆に替え、交差接触を避けます。", "땅콩 알레르기에는 삶은 팥으로 대체하고 교차 접촉을 막습니다.", "ผู้แพ้ถั่วลิสงใช้ถั่วแดงต้มไม่หวานแทน เติมน้ำตาลหลังนุ่มและป้องกันการสัมผัสข้าม"),
      ml("Condensed milk is optional; omit it for a clearer brown-sugar flavour rather than replacing it with a watery milk.", "煉乳可直接省略，黑糖味會更清楚；不要換稀薄牛奶把冰沖水。", "練乳は省略でき、牛乳で薄めません。", "연유는 생략할 수 있으며 묽은 우유로 대체하지 않습니다.", "ตัดนมข้นได้เพื่อให้รสน้ำตาลชัด อย่าใช้นมเหลวแทนจนละลายน้ำแข็ง")
    ],
    storage: ml("Refrigerate peanuts in their liquid up to 3 days and syrup up to 7 days. Ice must be shaved and assembled to order; never refreeze melted shaved ice.", "甜花生連汁冷藏 3 天、黑糖漿冷藏 7 天；冰必須現刨現組合，融化剉冰不可再冷凍。", "ピーナッツは煮汁ごと冷蔵3日、蜜は7日。氷は注文ごとに削り、再冷凍しません。", "땅콩은 국물째 냉장 3일, 시럽은 7일 보관하고 얼음은 즉석에서 갈며 녹은 빙수는 재냉동하지 않습니다.", "เก็บถั่วในน้ำ 3 วัน น้ำเชื่อม 7 วัน น้ำแข็งต้องไสตามสั่งและห้ามแช่แข็งน้ำแข็งไสที่ละลายแล้ว"),
    cultureNote: ml("Tshuah-ping is a broad Taiwanese shaved-ice tradition whose toppings change by shop and season. This version centres the common pairing of brown sugar and tender peanuts.", "剉冰是台灣多樣的冰品傳統，配料會隨店家與季節變化；此版聚焦常見黑糖與煮花生組合。", "台湾のかき氷は店や季節で具が変わり、本レシピは黒糖と柔らかなピーナッツを主役にします。", "대만 빙수는 가게와 계절마다 토핑이 달라지며 이 버전은 흑당과 부드러운 땅콩 조합입니다.", "น้ำแข็งไสไต้หวันมีเครื่องต่างกันตามร้านและฤดู สูตรนี้เน้นน้ำตาลแดงกับถั่วลิสงตุ๋นนุ่ม"),
    imageAlt: ml("Taiwanese shaved ice with brown-sugar syrup, tender peanuts, crushed roasted peanuts, and condensed milk", "淋黑糖漿、煮花生、烤花生碎與煉乳的台式剉冰", "黒蜜、煮ピーナッツ、砕いた豆、練乳の台湾かき氷", "흑당 시럽, 부드러운 땅콩, 볶은 땅콩과 연유의 대만식 빙수", "น้ำแข็งไสไต้หวันกับน้ำตาลแดง ถั่วตุ๋นนุ่ม ถั่วคั่วบด และนมข้น"),
    visualSpec: "A mound of fine white shaved ice soaked unevenly with dark brown-sugar syrup, topped with soft skin-on peanuts, crushed roasted peanuts, and a thin optional condensed-milk ribbon."
  })
];
