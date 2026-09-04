import { ingredient, makeIndianRecipe, ml, step } from "./indian-recipe-helpers.mjs";

export const indianRecipesA = [
  makeIndianRecipe({
    id: "butter-chicken", profile: "curry", prepMinutes: 390, cookMinutes: 50, totalMinutes: 440, servings: 4,
    name: ml("Butter Chicken", "印度奶油雞", "バターチキン", "버터 치킨", "บัตเตอร์ชิกเกน"),
    description: ml("Yogurt-marinated chicken is roasted until lightly charred, then finished in a smooth tomato, cashew, butter, cream, and fenugreek sauce.", "優格醃雞烤至微焦，再放入滑順番茄、腰果、奶油、鮮奶油與乾葫蘆巴醬汁中完成。", "ヨーグルトで漬けた鶏肉を香ばしく焼き、トマト、カシューナッツ、バター、生クリーム、フェヌグリークのなめらかなソースで仕上げます。", "요거트에 재운 닭고기를 살짝 그을려 구운 뒤 토마토, 캐슈, 버터, 크림, 페누그릭 소스에 마무리합니다.", "ไก่หมักโยเกิร์ตอบให้เกรียมเล็กน้อย แล้วเคี่ยวในซอสมะเขือเทศ เม็ดมะม่วงหิมพานต์ เนย ครีม และใบเมธีแห้ง"),
    ingredients: [
      ingredient("700 g", "boneless chicken thigh, 4 cm pieces", "去骨雞腿，切 4 公分塊", "鶏もも肉（4cm）", "순살 닭다리, 4cm", "สะโพกไก่ไร้กระดูก หั่น 4 ซม."),
      ingredient("120 g", "thick plain yogurt", "濃稠原味優格", "濃いプレーンヨーグルト", "진한 플레인 요거트", "โยเกิร์ตรสธรรมชาติข้น"),
      ingredient("20 g", "ginger-garlic paste, divided", "薑蒜泥，分次使用", "しょうがにんにくペースト", "생강 마늘 페이스트, 나눔", "ขิงกระเทียมบด แบ่งใช้"),
      ingredient("8 g", "Kashmiri chile powder, divided", "喀什米爾辣椒粉，分次", "カシミール唐辛子粉", "카슈미르 고춧가루, 나눔", "พริกแคชเมียร์ป่น แบ่งใช้"),
      ingredient("15 ml", "lemon juice", "檸檬汁", "レモン汁", "레몬즙", "น้ำเลมอน"),
      ingredient("45 g", "unsalted butter, divided", "無鹽奶油，分次", "無塩バター", "무염버터, 나눔", "เนยจืด แบ่งใช้"),
      ingredient("600 g", "ripe tomatoes, chopped", "熟番茄，切碎", "完熟トマト（刻む）", "잘 익은 토마토, 다짐", "มะเขือเทศสุก สับ"),
      ingredient("50 g", "raw cashews, soaked 20 minutes", "生腰果，浸泡 20 分鐘", "生カシューナッツ（20分浸水）", "생캐슈, 20분 불림", "เม็ดมะม่วงหิมพานต์ดิบ แช่ 20 นาที"),
      ingredient("250 ml", "water, divided", "水，分次", "水", "물, 나눔", "น้ำ แบ่งใช้"),
      ingredient("120 ml", "heavy cream", "動物性鮮奶油", "生クリーム", "생크림", "ครีมสด"),
      ingredient("4 g", "garam masala", "印度綜合香料 garam masala", "ガラムマサラ", "가람 마살라", "การัมมาซาลา"),
      ingredient("3 g", "dried fenugreek leaves, crushed", "乾葫蘆巴葉，搓碎", "乾燥フェヌグリーク葉", "말린 페누그릭 잎, 부숨", "ใบเมธีแห้ง บด"),
      ingredient("7 g", "fine salt, divided", "細鹽，分次", "塩", "고운 소금, 나눔", "เกลือละเอียด แบ่งใช้")
    ],
    instructions: [
      step(ml("Marinate the chicken", "冷藏醃雞", "鶏肉を漬ける", "닭고기 재우기", "หมักไก่"), ml("Mix yogurt, half the ginger-garlic paste, 5 g chile powder, lemon juice, and 4 g salt. Coat chicken, cover, and refrigerate 6–12 hours; keep below 4°C.", "優格、半量薑蒜泥、5 公克辣椒粉、檸檬汁與 4 公克鹽拌勻，裹住雞肉後密封冷藏 6–12 小時，保持低於 4°C。", "ヨーグルト、半量のペースト、唐辛子5g、レモン、塩4gで鶏肉を覆い、4°C未満で6〜12時間冷蔵します。", "요거트, 페이스트 절반, 고춧가루 5g, 레몬즙, 소금 4g에 닭을 버무려 4°C 아래에서 6~12시간 냉장합니다.", "ผสมโยเกิร์ต ขิงกระเทียมครึ่งหนึ่ง พริก 5 กรัม น้ำเลมอน และเกลือ 4 กรัม คลุกไก่ ปิดแช่ต่ำกว่า 4°C 6–12 ชั่วโมง")),
      step(ml("Roast to light char", "烤至微焦熟透", "香ばしく焼く", "살짝 그을려 굽기", "อบให้เกรียมเล็กน้อย"), ml("Heat the oven to 230°C with a rack over a tray. Shake excess marinade from chicken, arrange in one layer, and roast 14–18 minutes, turning once, until charred at the edges and every piece reaches 74°C.", "烤箱連烤架預熱至 230°C，雞肉抖掉多餘醃料後單層排放，烤 14–18 分鐘並翻面一次，至邊緣微焦且每塊達 74°C。", "オーブンを230°Cに熱し、鶏肉を一層に並べ14〜18分、一度返して縁を焦がし、全て74°Cにします。", "오븐을 230°C로 예열해 닭을 한 겹으로 놓고 14~18분 한 번 뒤집어 가장자리를 그을리고 모두 74°C로 익힙니다.", "อุ่นเตา 230°C วางไก่ชั้นเดียวบนตะแกรง อบ 14–18 นาที พลิกหนึ่งครั้งจนขอบเกรียมและทุกชิ้นถึง 74°C")),
      step(ml("Cook the tomato base", "炒煮番茄底", "トマトの土台を煮る", "토마토 베이스 익히기", "ปรุงฐานมะเขือเทศ"), ml("Melt 25 g butter over medium. Add remaining ginger-garlic paste for 45 seconds, then tomatoes, remaining chile powder, and 3 g salt. Cook 12–15 minutes until pulpy and reduced by about one-third.", "中火融化 25 公克奶油，餘下薑蒜泥炒 45 秒，再加番茄、餘下辣椒粉與 3 公克鹽，煮 12–15 分鐘至糊化並收掉約三分之一。", "バター25gでしょうがにんにくを45秒炒め、トマト、残りの唐辛子、塩を12〜15分、3分の1減るまで煮ます。", "버터 25g에 남은 생강 마늘을 45초 볶고 토마토, 남은 고춧가루, 소금을 넣어 12~15분 3분의 1 줄입니다.", "ละลายเนย 25 กรัม ผัดขิงกระเทียมที่เหลือ 45 วินาที เติมมะเขือเทศ พริกที่เหลือ และเกลือ เคี่ยว 12–15 นาทีจนเละและงวดหนึ่งในสาม")),
      step(ml("Blend and strain the sauce", "攪打並過濾醬汁", "ソースを撹拌してこす", "소스 갈아 거르기", "ปั่นและกรองซอส"), ml("Blend the tomato mixture with drained cashews and 150 ml water until completely smooth. Pass through a fine sieve into a clean pan, pressing the pulp; discard coarse skins and spice fragments.", "番茄糊、瀝乾腰果與 150 毫升水打至完全滑順，以細篩壓入乾淨鍋中，粗皮與香料碎片丟棄。", "トマト、カシューナッツ、水150mlをなめらかに撹拌し、細かいこし器で清潔な鍋へこします。", "토마토 혼합물, 물 뺀 캐슈, 물 150ml를 곱게 갈아 고운 체로 깨끗한 팬에 거릅니다.", "ปั่นมะเขือเทศ เม็ดมะม่วงที่สะเด็ด และน้ำ 150 มล. ให้เนียน กรองผ่านตะแกรงละเอียดลงหม้อสะอาด")),
      step(ml("Simmer to a silky consistency", "小滾至絲滑濃度", "なめらかに煮詰める", "매끈하게 끓이기", "เคี่ยวจนเนียน"), ml("Add the remaining 100 ml water and simmer over low heat for 8 minutes, stirring often. The sauce should coat a spoon but flow; add hot water 15 ml at a time if it becomes paste-like.", "加入餘下 100 毫升水，小火常攪 8 分鐘；醬汁應能覆匙但仍流動，若像糊則每次補 15 毫升熱水。", "残りの水100mlを加え弱火で8分、スプーンを覆って流れる濃度まで煮ます。", "남은 물 100ml를 넣어 약불에서 8분, 숟가락에 묻되 흐르는 농도로 끓입니다.", "เติมน้ำที่เหลือ 100 มล. เคี่ยวไฟอ่อน 8 นาที คนบ่อย ให้ซอสเคลือบช้อนแต่ยังไหล เติมน้ำร้อนครั้งละ 15 มล. หากข้นเป็นแป้ง")),
      step(ml("Return the roasted chicken", "放回烤雞", "焼いた鶏肉を戻す", "구운 닭 넣기", "ใส่ไก่อบกลับ"), ml("Add roasted chicken and all tray juices. Simmer gently for 5–7 minutes, stirring from the bottom, until the sauce reaches 74°C and clings to the chicken without separating.", "加入烤雞與烤盤肉汁，溫和小滾 5–7 分鐘並刮鍋底，至醬汁達 74°C 且附著雞肉、不油水分離。", "焼いた鶏肉と肉汁を加え5〜7分、ソースが74°Cになり分離せず絡むまで煮ます。", "구운 닭과 육즙을 넣어 5~7분, 소스가 74°C가 되고 분리 없이 닭에 묻게 끓입니다.", "ใส่ไก่อบและน้ำจากถาด เคี่ยวอ่อน 5–7 นาทีจนซอส 74°C และเกาะไก่ไม่แยกมัน")),
      step(ml("Finish with cream and fenugreek", "加入鮮奶油與葫蘆巴", "生クリームとフェヌグリークで仕上げる", "크림과 페누그릭 마무리", "ปิดท้ายด้วยครีมและใบเมธี"), ml("Lower the heat to minimum. Stir in cream, garam masala, fenugreek, and 15 g butter; warm 2 minutes without boiling hard, which can split the cream and flatten the spice aroma.", "轉最小火，拌入鮮奶油、garam masala、葫蘆巴與 15 公克奶油；加熱 2 分鐘但不可大滾，以免奶油分離、香氣變鈍。", "弱火にし、生クリーム、ガラムマサラ、フェヌグリーク、バター15gを加え、強く沸かさず2分温めます。", "최약불로 줄여 크림, 가람 마살라, 페누그릭, 버터 15g을 넣고 세게 끓이지 않으며 2분 데웁니다.", "ลดไฟต่ำสุด ใส่ครีม การัมมาซาลา ใบเมธี และเนย 15 กรัม อุ่น 2 นาทีโดยไม่เดือดแรง")),
      step(ml("Rest and serve", "靜置後上桌", "休ませて供する", "쉬었다 내기", "พักและเสิร์ฟ"), ml("Turn off the heat, swirl in the final 5 g butter, cover, and rest 5 minutes. Taste only now, then serve with rice or naan while the sauce remains glossy and fluid.", "關火拌入最後 5 公克奶油，加蓋靜置 5 分鐘；此時才試味，趁醬汁油亮流動搭飯或 naan 上桌。", "火を止め、残りのバター5gを混ぜ、覆って5分休ませてから味を調え、ご飯やナンと供します。", "불을 끄고 남은 버터 5g을 섞어 5분 덮어 쉰 뒤 간을 보고 밥이나 난과 냅니다.", "ปิดไฟ คนเนย 5 กรัมสุดท้าย ปิดพัก 5 นาที ชิมแล้วเสิร์ฟกับข้าวหรือนานขณะซอสยังเงาและไหล"))
    ],
    substitutions: [
      ml("For a nut-free sauce, replace cashews with 60 g hulled sunflower seeds soaked in hot water; the flavour will be less sweet.", "無堅果版本以 60 公克去殼葵花籽熱水浸泡後取代腰果，甜潤度會較低。", "ナッツなしは熱湯で戻したひまわりの種60gに替えます。", "견과류 없이 하려면 뜨거운 물에 불린 해바라기씨 60g을 쓰세요.", "แบบไม่มีถั่วใช้เมล็ดทานตะวันกะเทาะ 60 กรัมแช่น้ำร้อนแทน รสจะหวานมันน้อยลง"),
      ml("Boneless chicken breast can replace thigh; roast only until 74°C and shorten the sauce simmer to 3 minutes to prevent dryness.", "可換去骨雞胸，烤到 74°C 就取出，回醬只煮 3 分鐘避免乾柴。", "鶏胸肉なら74°Cですぐ取り出し、ソースでは3分だけ煮ます。", "닭가슴살은 74°C가 되면 바로 꺼내 소스에서는 3분만 끓이세요.", "ใช้อกไก่ได้ อบถึง 74°C แล้วเคี่ยวในซอสเพียง 3 นาทีเพื่อไม่ให้แห้ง")
    ],
    cultureNote: ml("Butter chicken, or murgh makhani, emerged from Delhi's restaurant tradition and uses roasted chicken in a mild, buttery tomato gravy. It is distinct from onion-forward chicken tikka masala.", "奶油雞又稱 murgh makhani，源自德里餐館傳統，以烤雞配溫和奶油番茄汁，與洋蔥味較重的 chicken tikka masala 不同。", "ムルグマカニはデリーのレストラン文化から生まれ、焼いた鶏肉を穏やかなバタートマトソースで仕上げます。", "무르그 마카니는 델리 식당 전통에서 나온 구운 닭과 부드러운 버터 토마토 소스 요리입니다.", "บัตเตอร์ชิกเกนหรือมูร์กมาคานีเกิดจากวัฒนธรรมร้านอาหารเดลี ใช้ไก่อบกับเกรวีมะเขือเทศเนยรสนุ่ม"),
    imageAlt: ml("Butter chicken in silky orange-red tomato cream sauce with charred chicken pieces and fenugreek", "帶微焦雞塊與葫蘆巴、浸在絲滑橘紅番茄奶油醬中的印度奶油雞", "香ばしい鶏肉とフェヌグリークのオレンジ色のバターチキン", "그을린 닭과 페누그릭이 든 매끈한 주황빛 버터 치킨", "บัตเตอร์ชิกเกนซอสครีมมะเขือเทศสีส้มแดงกับไก่เกรียมและใบเมธี"),
    visualSpec: "Charred boneless chicken pieces in a smooth glossy orange-red tomato cream sauce, a subtle cream swirl and crushed fenugreek; no onion chunks or green peas."
  }),

  makeIndianRecipe({
    id: "palak-paneer", profile: "curry", prepMinutes: 25, cookMinutes: 30, totalMinutes: 55, servings: 4,
    name: ml("Palak Paneer", "菠菜乾酪咖哩", "パラクパニール", "팔락 파니르", "ปาลักปานีร์"),
    description: ml("Paneer cubes sit in a vivid spinach sauce balanced with cumin, ginger, garlic, tomato, garam masala, and a restrained amount of cream.", "印度乾酪丁浸在鮮綠菠菜醬中，以孜然、薑、蒜、番茄、garam masala 與少量鮮奶油平衡。", "パニールを鮮やかなほうれん草ソースに入れ、クミン、しょうが、にんにく、トマト、ガラムマサラで整えます。", "파니르 큐브를 선명한 시금치 소스에 넣고 커민, 생강, 마늘, 토마토, 가람 마살라와 소량 크림으로 맞춥니다.", "ก้อนปานีร์อยู่ในซอสผักโขมสีสด ปรุงสมดุลด้วยยี่หร่า ขิง กระเทียม มะเขือเทศ การัมมาซาลา และครีมเล็กน้อย"),
    ingredients: [
      ingredient("500 g", "fresh spinach, tough stems removed", "新鮮菠菜，去粗梗", "ほうれん草（硬い茎を除く）", "생시금치, 굵은 줄기 제거", "ผักโขมสด เอาก้านแข็งออก"),
      ingredient("250 g", "paneer, 2.5 cm cubes", "印度乾酪 paneer，切 2.5 公分丁", "パニール（2.5cm角）", "파니르, 2.5cm", "ปานีร์ หั่นเต๋า 2.5 ซม."),
      ingredient("30 ml", "neutral oil or ghee, divided", "中性油或酥油，分次", "油またはギー", "중성유 또는 기, 나눔", "น้ำมันหรือกี แบ่งใช้"),
      ingredient("4 g", "cumin seeds", "孜然籽", "クミンシード", "커민씨", "เมล็ดยี่หร่า"),
      ingredient("120 g", "onion, finely chopped", "洋蔥，切細", "玉ねぎ（みじん）", "양파, 잘게 다짐", "หอมใหญ่ สับละเอียด"),
      ingredient("15 g", "ginger-garlic paste", "薑蒜泥", "しょうがにんにくペースト", "생강 마늘 페이스트", "ขิงกระเทียมบด"),
      ingredient("180 g", "ripe tomato, finely chopped", "熟番茄，切細", "完熟トマト（細かく刻む）", "잘 익은 토마토, 잘게 다짐", "มะเขือเทศสุก สับละเอียด"),
      ingredient("1", "green chile, slit", "青辣椒，劃開", "青唐辛子（切れ目を入れる）", "풋고추, 갈라 놓기", "พริกเขียว กรีด"),
      ingredient("3 g", "garam masala", "garam masala", "ガラムマサラ", "가람 마살라", "การัมมาซาลา"),
      ingredient("100–180 ml", "hot water", "熱水", "湯", "뜨거운 물", "น้ำร้อน"),
      ingredient("60 ml", "heavy cream", "動物性鮮奶油", "生クリーム", "생크림", "ครีมสด"),
      ingredient("6 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด")
    ],
    instructions: [
      step(ml("Blanch the spinach briefly", "快速汆燙菠菜", "ほうれん草を短くゆでる", "시금치 짧게 데치기", "ลวกผักโขมสั้น ๆ"), ml("Bring 3 L water to a full boil, add spinach, and blanch 60–75 seconds until wilted and bright green. Transfer immediately to ice water for 2 minutes, then drain thoroughly.", "3 公升水煮至大滾，菠菜汆 60–75 秒至萎縮翠綠，立刻移冰水 2 分鐘，再徹底瀝乾。", "湯3Lでほうれん草を60〜75秒、鮮緑になるまでゆで、氷水で2分冷やして水切りします。", "물 3L를 끓여 시금치를 60~75초 선명한 초록이 되게 데친 뒤 얼음물에 2분 식혀 물을 뺍니다.", "ต้มน้ำ 3 ลิตรให้เดือด ลวกผักโขม 60–75 วินาทีจนยุบสีเขียวสด ช็อกน้ำแข็ง 2 นาทีแล้วสะเด็ด")),
      step(ml("Blend a vivid puree", "打成鮮綠菠菜泥", "鮮やかなピューレにする", "선명한 퓌레 만들기", "ปั่นเป็นพิวเรสีสด"), ml("Squeeze spinach gently and blend with 100 ml hot water until smooth but not foamy. Stop and scrape twice; over-blending warms the puree and dulls its colour.", "菠菜輕擠水分，加 100 毫升熱水打滑但不起大量泡沫，中途停機刮壁兩次；過度攪打升溫會使顏色變暗。", "ほうれん草を軽く絞り、湯100mlとなめらかに撹拌します。泡立てすぎないようにします。", "시금치를 가볍게 짜 뜨거운 물 100ml와 거품 나지 않게 곱게 갈고 두 번 멈춰 벽을 긁습니다.", "บีบผักโขมเบา ๆ ปั่นกับน้ำร้อน 100 มล. ให้เนียนไม่เป็นฟอง หยุดขูดโถสองครั้ง")),
      step(ml("Lightly brown the paneer", "輕煎 paneer", "パニールを軽く焼く", "파니르 살짝 굽기", "จี่ปานีร์เบา ๆ"), ml("Heat 15 ml oil in a wide pan over medium. Brown paneer for 60–90 seconds per broad side, then transfer to a plate; do not make a hard crust or the cheese becomes rubbery.", "寬鍋中火熱 15 毫升油，paneer 大面各煎 60–90 秒後盛盤；不可煎出硬殼，否則口感橡皮。", "油15mlでパニールの広い面を各60〜90秒だけ焼き、硬い皮を作らず取り出します。", "기름 15ml에 파니르 넓은 면을 각각 60~90초만 구워 딱딱한 껍질 없이 꺼냅니다.", "จี่ปานีร์ในน้ำมัน 15 มล. ด้านกว้างละ 60–90 วินาทีแล้วตัก อย่าให้เปลือกแข็ง")),
      step(ml("Build the cumin masala", "炒孜然 masala", "クミンマサラを作る", "커민 마살라 만들기", "ทำมาซาลายี่หร่า"), ml("Add remaining oil and cumin seeds; let them sizzle 20 seconds. Add onion and cook 7–9 minutes until pale gold, then ginger-garlic and green chile for 60 seconds.", "加入餘油與孜然籽爆 20 秒，洋蔥炒 7–9 分鐘至淡金，再加薑蒜泥與青辣椒炒 60 秒。", "残りの油でクミンを20秒はじかせ、玉ねぎを7〜9分薄い金色まで炒め、ペーストと青唐辛子を1分加えます。", "남은 기름에 커민을 20초 튀기고 양파를 7~9분 옅은 금색으로 볶은 뒤 페이스트와 풋고추를 1분 볶습니다.", "ใส่น้ำมันที่เหลือและยี่หร่าผัด 20 วินาที เติมหอมผัด 7–9 นาทีจนทองอ่อน แล้วขิงกระเทียมกับพริก 60 วินาที")),
      step(ml("Cook the tomato completely", "把番茄炒熟", "トマトを十分に炒める", "토마토 완전히 익히기", "ผัดมะเขือเทศให้สุก"), ml("Add tomato and 4 g salt. Cook over medium-low for 7–9 minutes, mashing, until the tomato is pulpy, no raw smell remains, and oil glistens around the edge.", "加番茄與 4 公克鹽，中小火邊壓邊炒 7–9 分鐘，至番茄糊化、無生味且邊緣泛油。", "トマトと塩4gを加え、潰しながら7〜9分、青臭さが消え油が縁に浮くまで炒めます。", "토마토와 소금 4g을 넣어 으깨며 7~9분, 날향이 사라지고 가장자리에 기름이 돌게 볶습니다.", "ใส่มะเขือเทศกับเกลือ 4 กรัม ผัดไฟกลางอ่อน 7–9 นาที บดจนเละ กลิ่นดิบหาย และมีน้ำมันที่ขอบ")),
      step(ml("Simmer the spinach gently", "溫和煮菠菜醬", "ほうれん草を静かに煮る", "시금치 소스 부드럽게 끓이기", "เคี่ยวซอสผักโขมเบา ๆ"), ml("Lower the heat, stir in spinach puree and garam masala, and simmer uncovered for 4 minutes. Add hot water only as needed for a thick but flowing sauce; prolonged boiling turns it brown.", "轉小火拌入菠菜泥與 garam masala，不加蓋小滾 4 分鐘；只視需要補熱水至濃稠仍流動，久煮會變褐。", "弱火でほうれん草とガラムマサラを4分だけ煮て、必要なら湯を加えます。長く煮ると褐色になります。", "약불에서 시금치 퓌레와 가람 마살라를 4분만 끓이고 필요한 만큼만 물을 넣습니다.", "ลดไฟ ใส่พิวเรผักโขมและการัมมาซาลา เคี่ยวเปิด 4 นาที เติมน้ำร้อนเท่าที่ต้องการ อย่าต้มนานจนสีน้ำตาล")),
      step(ml("Warm paneer and finish", "回溫 paneer 並完成", "パニールを温めて仕上げる", "파니르 데워 마무리", "อุ่นปานีร์และปิดท้าย"), ml("Return paneer and fold gently for 2–3 minutes. Turn off heat, stir in cream and remaining salt, rest covered 3 minutes, and serve while the sauce stays green and the paneer tender.", "paneer 回鍋輕翻 2–3 分鐘，關火拌入鮮奶油與餘鹽，加蓋靜置 3 分鐘；趁醬色鮮綠、乾酪柔嫩上桌。", "パニールを戻し2〜3分温め、火を止め生クリームと残りの塩を混ぜ、覆って3分休ませます。", "파니르를 넣어 2~3분 데우고 불을 꺼 크림과 남은 소금을 섞어 3분 덮어 쉽니다.", "ใส่ปานีร์กลับพับเบา 2–3 นาที ปิดไฟ คนครีมและเกลือที่เหลือ ปิดพัก 3 นาที เสิร์ฟขณะซอสยังเขียว"))
    ],
    substitutions: [
      ml("Extra-firm tofu can replace paneer; press 30 minutes, cut 2.5 cm cubes, and brown gently before adding.", "可用超硬豆腐取代 paneer；壓水 30 分鐘、切 2.5 公分丁並輕煎後加入。", "パニールは木綿豆腐に替え、30分水切りして2.5cm角にし軽く焼きます。", "파니르 대신 단단한 두부를 30분 눌러 2.5cm로 잘라 살짝 구울 수 있습니다.", "ใช้เต้าหู้แข็งพิเศษแทนปานีร์ได้ กดน้ำ 30 นาที หั่น 2.5 ซม. และจี่เบา ๆ"),
      ml("For dairy-free sauce, use neutral oil and unsweetened cashew cream; disclose the adaptation because paneer is still dairy unless replaced.", "無乳醬汁可用中性油與無糖腰果奶油；若 paneer 未替換仍含乳，需清楚標示。", "乳製品なしは油と無糖カシュークリームを使い、パニールも豆腐に替えます。", "유제품 없이 하려면 중성유와 무가당 캐슈크림을 쓰고 파니르도 두부로 바꾸세요.", "แบบไร้นมใช้น้ำมันกับครีมเม็ดมะม่วงไม่หวาน และต้องเปลี่ยนปานีร์ด้วย")
    ],
    cultureNote: ml("Palak paneer is a North Indian spinach-and-fresh-cheese dish. Its appeal is the contrast between vivid green sauce and soft white paneer, not an overcooked brown puree.", "Palak paneer 是北印度菠菜與新鮮乾酪料理，重點在鮮綠醬汁與柔白 paneer 的對比，不是久煮褐色泥。", "北インドのほうれん草とフレッシュチーズ料理で、鮮緑のソースと白いパニールの対比が特徴です。", "북인도의 시금치와 생치즈 요리로 선명한 초록 소스와 흰 파니르의 대비가 핵심입니다.", "ปาลักปานีร์เป็นอาหารเหนืออินเดียจากผักโขมและชีสสด จุดเด่นคือซอสเขียวสดตัดกับปานีร์ขาวนุ่ม"),
    imageAlt: ml("Palak paneer with white paneer cubes in vivid green spinach sauce and a restrained cream swirl", "白色 paneer 丁浸在鮮綠菠菜醬、帶少量鮮奶油紋的 palak paneer", "白いパニール角切りと鮮緑のほうれん草ソース", "흰 파니르 큐브와 선명한 초록 시금치 소스", "ปาลักปานีร์ก้อนชีสขาวในซอสผักโขมเขียวสดและครีมเล็กน้อย"),
    visualSpec: "Distinct white paneer cubes in a smooth vivid dark-green spinach sauce with a restrained cream swirl; no red oil pool or large onion pieces."
  }),

  makeIndianRecipe({
    id: "chana-masala", profile: "curry", prepMinutes: 500, cookMinutes: 55, totalMinutes: 555, servings: 4,
    name: ml("Chana Masala", "北印度鷹嘴豆咖哩", "チャナマサラ", "차나 마살라", "จานามาซาลา"),
    description: ml("Soaked chickpeas are cooked until creamy, then simmered in a tangy onion-tomato masala with ginger, garlic, cumin, coriander, amchur, and garam masala.", "泡發鷹嘴豆煮至綿軟，再放入酸香洋蔥番茄 masala，以薑、蒜、孜然、芫荽、芒果粉與 garam masala 調味。", "柔らかく煮たひよこ豆を、玉ねぎ、トマト、しょうが、にんにく、クミン、コリアンダー、アムチュールのマサラで煮ます。", "불린 병아리콩을 부드럽게 익혀 양파 토마토 마살라와 생강, 마늘, 커민, 고수씨, 암추르에 조립니다.", "ต้มถั่วลูกไก่แช่จนนุ่ม แล้วเคี่ยวในมาซาลาหอมมะเขือเทศรสเปรี้ยวกับขิง กระเทียม ยี่หร่า ผักชี อัมชูร์ และการัมมาซาลา"),
    ingredients: [
      ingredient("250 g", "dried chickpeas, soaked 8 hours", "乾鷹嘴豆，浸泡 8 小時", "乾燥ひよこ豆（8時間浸水）", "마른 병아리콩, 8시간 불림", "ถั่วลูกไก่แห้ง แช่ 8 ชั่วโมง"),
      ingredient("1.1 L", "water for pressure cooking", "壓力鍋用水", "圧力調理用の水", "압력조리용 물", "น้ำสำหรับหม้อแรงดัน"),
      ingredient("30 ml", "neutral oil", "中性油", "植物油", "중성유", "น้ำมันรสกลาง"),
      ingredient("4 g", "cumin seeds", "孜然籽", "クミンシード", "커민씨", "เมล็ดยี่หร่า"),
      ingredient("220 g", "onion, finely chopped", "洋蔥，切細", "玉ねぎ（みじん）", "양파, 잘게 다짐", "หอมใหญ่ สับละเอียด"),
      ingredient("20 g", "ginger-garlic paste", "薑蒜泥", "しょうがにんにくペースト", "생강 마늘 페이스트", "ขิงกระเทียมบด"),
      ingredient("300 g", "tomatoes, pureed", "番茄，打泥", "トマトピューレ", "토마토 퓌레", "มะเขือเทศ ปั่น"),
      ingredient("6 g", "ground coriander", "芫荽籽粉", "コリアンダー粉", "고수씨 가루", "ลูกผักชีป่น"),
      ingredient("4 g", "Kashmiri chile powder", "喀什米爾辣椒粉", "カシミール唐辛子粉", "카슈미르 고춧가루", "พริกแคชเมียร์ป่น"),
      ingredient("2 g", "turmeric", "薑黃粉", "ターメリック", "강황", "ขมิ้น"),
      ingredient("4 g", "garam masala", "garam masala", "ガラムマサラ", "가람 마살라", "การัมมาซาลา"),
      ingredient("5 g", "amchur (dried mango powder)", "芒果粉 amchur", "アムチュール", "암추르", "ผงมะม่วงแห้งอัมชูร์"),
      ingredient("8 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("20 g", "cilantro, chopped", "香菜，切碎", "香菜", "고수, 다짐", "ผักชี สับ")
    ],
    instructions: [
      step(ml("Soak and rinse the chickpeas", "浸泡並沖洗鷹嘴豆", "ひよこ豆を浸す", "병아리콩 불리기", "แช่และล้างถั่ว"), ml("Cover chickpeas with at least three times their volume of cool water and soak 8–12 hours in a cool place. Drain, rinse, and discard any shrivelled or discoloured beans.", "鷹嘴豆加至少三倍冷水，在涼處泡 8–12 小時；瀝乾沖洗，丟棄乾皺或變色豆。", "ひよこ豆を3倍以上の冷水で8〜12時間浸し、水切りして洗い、傷んだ豆を除きます。", "병아리콩을 세 배 이상의 찬물에 8~12시간 불려 씻고 쭈글거나 변색된 콩은 버립니다.", "แช่ถั่วในน้ำเย็นอย่างน้อยสามเท่า 8–12 ชั่วโมง สะเด็ด ล้าง และทิ้งเม็ดเหี่ยวหรือสีผิดปกติ")),
      step(ml("Pressure-cook until creamy", "壓煮至綿軟", "圧力鍋で柔らかく煮る", "압력으로 부드럽게 익히기", "ต้มแรงดันจนนุ่มครีม"), ml("Add soaked chickpeas and 1.1 L fresh water to a pressure cooker. Cook at high pressure 22 minutes, release naturally 15 minutes, and check that a bean crushes creamy between fingers; reserve 500 ml cooking liquid.", "泡豆與 1.1 公升清水入壓力鍋，高壓 22 分鐘，自然洩壓 15 分鐘；豆子應可在指間壓成綿泥，保留 500 毫升煮豆水。", "ひよこ豆と水1.1Lを高圧で22分、自然減圧15分。指でなめらかに潰れることを確認し、煮汁500mlを取ります。", "불린 콩과 물 1.1L를 고압 22분, 자연 배출 15분 익혀 손가락 사이에서 부드럽게 으깨지고 삶은 물 500ml를 보관합니다.", "ใส่ถั่วกับน้ำใหม่ 1.1 ลิตร ต้มแรงดันสูง 22 นาที ปล่อยธรรมชาติ 15 นาที เม็ดต้องบี้ครีมได้ เก็บน้ำต้ม 500 มล.")),
      step(ml("Brown cumin and onion", "爆孜然並炒洋蔥", "クミンと玉ねぎを炒める", "커민과 양파 볶기", "ผัดยี่หร่าและหอม"), ml("Heat oil over medium, sizzle cumin 20 seconds, then add onion. Cook 10–12 minutes, stirring often, until evenly medium-gold; pale onion leaves the masala sweet and raw.", "中火熱油，孜然籽爆 20 秒後加洋蔥，常攪 10–12 分鐘至均勻中金色；洋蔥太白會留下甜生味。", "油でクミンを20秒はじかせ、玉ねぎを10〜12分均一な金色まで炒めます。", "기름에 커민을 20초 튀기고 양파를 10~12분 고르게 중간 금색까지 볶습니다.", "ผัดยี่หร่าในน้ำมัน 20 วินาที เติมหอม ผัด 10–12 นาทีจนสีทองกลางสม่ำเสมอ")),
      step(ml("Cook down the tomato masala", "炒乾番茄 masala", "トマトマサラを煮詰める", "토마토 마살라 졸이기", "ผัดมาซาลามะเขือเทศ"), ml("Add ginger-garlic for 60 seconds. Stir in tomato, coriander, chile, turmeric, and 5 g salt; cook medium-low 10–12 minutes until thick and oil appears at the edge.", "加薑蒜泥炒 60 秒，再拌番茄、芫荽粉、辣椒粉、薑黃與 5 公克鹽；中小火 10–12 分鐘至濃稠泛油。", "しょうがにんにくを1分、トマトと粉末スパイス、塩5gを10〜12分、油が縁に出るまで炒めます。", "생강 마늘을 1분 볶고 토마토, 가루 향신료, 소금 5g을 중약불에서 10~12분 기름이 돌게 익힙니다.", "ผัดขิงกระเทียม 60 วินาที ใส่มะเขือเทศ ผักชี พริก ขมิ้น และเกลือ 5 กรัม ผัดไฟกลางอ่อน 10–12 นาทีจนข้นมีน้ำมันขอบ")),
      step(ml("Simmer chickpeas in the masala", "讓鷹嘴豆吸收 masala", "ひよこ豆をマサラで煮る", "콩을 마살라에 조리기", "เคี่ยวถั่วในมาซาลา"), ml("Add drained chickpeas and 400 ml reserved liquid. Bring to a simmer, cover partly, and cook 15 minutes; mash about 60 g chickpeas against the pot to thicken without flour.", "加入瀝乾鷹嘴豆與 400 毫升煮豆水，煮至微滾，半加蓋煮 15 分鐘；把約 60 公克豆壓在鍋壁成泥，自然增稠。", "ひよこ豆と煮汁400mlを加え、半分覆って15分煮、約60gの豆を鍋肌で潰してとろみを付けます。", "콩과 삶은 물 400ml를 넣어 반쯤 덮고 15분 끓이며 약 60g을 냄비 벽에 으깨 농도를 냅니다.", "ใส่ถั่วกับน้ำต้ม 400 มล. เคี่ยวปิดฝาแง้ม 15 นาที บี้ถั่วราว 60 กรัมกับข้างหม้อให้ข้น")),
      step(ml("Balance tang and spice", "調整酸香與香料", "酸味と香りを整える", "산미와 향 맞추기", "ปรับเปรี้ยวและเครื่องเทศ"), ml("Stir in garam masala, amchur, and remaining salt. Simmer uncovered 4–6 minutes until the gravy coats the chickpeas; add reserved liquid 30 ml at a time if too thick.", "拌入 garam masala、芒果粉與餘鹽，不加蓋煮 4–6 分鐘至醬汁包住豆子；過稠時每次補 30 毫升煮豆水。", "ガラムマサラ、アムチュール、残りの塩を加え、覆わず4〜6分煮て豆に絡めます。", "가람 마살라, 암추르, 남은 소금을 넣어 뚜껑 없이 4~6분 콩에 소스가 묻게 끓입니다.", "ใส่การัมมาซาลา อัมชูร์ และเกลือที่เหลือ เคี่ยวเปิด 4–6 นาทีจนเกรวีเคลือบถั่ว เติมน้ำต้มครั้งละ 30 มล. หากข้น")),
      step(ml("Rest before garnishing", "靜置後加香菜", "休ませて香菜を加える", "쉬었다 고수 넣기", "พักก่อนโรยผักชี"), ml("Turn off heat, cover, and rest 10 minutes so the chickpeas absorb seasoning. Fold in cilantro, taste, and serve with rice or flatbread; the gravy should be thick but spoonable.", "關火加蓋靜置 10 分鐘讓鷹嘴豆吸味，拌入香菜後試味，搭飯或餅上桌；醬汁應濃而可舀。", "火を止め覆って10分休ませ、香菜を混ぜ、濃くてもスプーンですくえる状態で供します。", "불을 끄고 10분 덮어 쉬어 간이 배게 한 뒤 고수를 섞어 밥이나 납작빵과 냅니다.", "ปิดไฟ ปิดพัก 10 นาทีให้ถั่วดูดรส พับผักชี ชิม แล้วเสิร์ฟกับข้าวหรือแผ่นแป้ง เกรวีต้องข้นแต่ตักได้"))
    ],
    substitutions: [
      ml("Use 600 g drained canned chickpeas for a faster version; rinse well and begin at the onion step with 450 ml unsalted water.", "快速版可用 600 公克瀝乾罐頭鷹嘴豆，洗淨後從炒洋蔥開始，另用 450 毫升無鹽水。", "時短は水切り缶詰ひよこ豆600gを洗い、玉ねぎの工程から無塩水450mlで作ります。", "빠른 버전은 물 뺀 통조림 병아리콩 600g을 씻어 양파 단계부터 무염 물 450ml와 만드세요.", "แบบเร็วใช้ถั่วกระป๋องสะเด็ด 600 กรัม ล้าง แล้วเริ่มขั้นหอมกับน้ำไม่เค็ม 450 มล."),
      ml("If amchur is unavailable, add 15 ml lemon juice after switching off the heat; do not boil fresh citrus.", "無芒果粉可在關火後加 15 毫升檸檬汁；新鮮柑橘汁不要煮。", "アムチュールがなければ火を止めてレモン汁15mlを加え、煮立てません。", "암추르가 없으면 불을 끈 뒤 레몬즙 15ml를 넣고 끓이지 마세요.", "ไม่มีอัมชูร์ให้ใส่น้ำเลมอน 15 มล. หลังปิดไฟ ห้ามต้มส้มสด")
    ],
    cultureNote: ml("Chana masala is a broad North Indian chickpea family with regional differences in souring agents and spice blends. This version uses amchur for a clear dry-mango tang.", "Chana masala 是北印度廣泛的鷹嘴豆料理，各地酸味與香料不同；此版用芒果粉帶出清楚果酸。", "北インドのひよこ豆料理で、地域ごとに酸味と香辛料が異なり、本レシピはアムチュールを使います。", "북인도의 병아리콩 요리로 지역마다 산미와 향신료가 다르며 이 버전은 암추르를 씁니다.", "จานามาซาลาเป็นตระกูลแกงถั่วเหนืออินเดียที่รสเปรี้ยวและเครื่องเทศต่างตามพื้นที่ สูตรนี้ใช้อัมชูร์") ,
    imageAlt: ml("Chana masala with tender chickpeas in thick reddish-brown onion-tomato gravy and cilantro", "綿軟鷹嘴豆裹濃厚紅褐洋蔥番茄醬並撒香菜的 chana masala", "濃い赤褐色のソースと香菜のチャナマサラ", "진한 적갈색 소스와 고수의 차나 마살라", "จานามาซาลาถั่วนุ่มในเกรวีหอมมะเขือเทศสีน้ำตาลแดงข้นกับผักชี"),
    visualSpec: "Tender whole chickpeas in a thick reddish-brown onion-tomato gravy with a small cilantro garnish; no cream, paneer, or large tomato wedges."
  }),

  makeIndianRecipe({
    id: "dal-tadka", profile: "curry", prepMinutes: 15, cookMinutes: 40, totalMinutes: 55, servings: 4,
    name: ml("Dal Tadka", "印度香料油黃扁豆", "ダールタルカ", "달 타드카", "ดาลตัดกา"),
    description: ml("Creamy pigeon-pea lentils are seasoned with tomato, turmeric, and garam masala, then finished with a sizzling ghee tempering of cumin, garlic, and dried chile.", "綿滑木豆以番茄、薑黃與 garam masala 調味，最後淋上孜然、蒜與乾辣椒的滾熱酥油香料油。", "クリーミーな豆にトマト、ターメリック、ガラムマサラを加え、クミン、にんにく、唐辛子の熱いギーをかけます。", "부드러운 투르달에 토마토, 강황, 가람 마살라를 넣고 커민, 마늘, 마른 고추를 지글거린 기를 붓습니다.", "ถั่วตูร์เนียนปรุงมะเขือเทศ ขมิ้น และการัมมาซาลา ปิดท้ายด้วยกีร้อนผัดยี่หร่า กระเทียม และพริกแห้ง"),
    ingredients: [
      ingredient("220 g", "toor dal (split pigeon peas), rinsed", "木豆瓣 toor dal，洗淨", "トゥールダル（洗う）", "투르달, 씻은 것", "ถั่วตูร์ผ่าซีก ล้าง"),
      ingredient("850 ml", "water, plus more to adjust", "水，另備調整用", "水", "물, 조절용 추가", "น้ำ และสำหรับปรับ"),
      ingredient("120 g", "tomato, finely chopped", "番茄，切細", "トマト（細かく刻む）", "토마토, 잘게 다짐", "มะเขือเทศ สับละเอียด"),
      ingredient("8 g", "ginger, finely chopped", "薑，切細", "しょうが（みじん）", "생강, 잘게 다짐", "ขิง สับละเอียด"),
      ingredient("2 g", "turmeric", "薑黃粉", "ターメリック", "강황", "ขมิ้น"),
      ingredient("5 g", "fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("3 g", "garam masala", "garam masala", "ガラムマサラ", "가람 마살라", "การัมมาซาลา"),
      ingredient("20 g", "cilantro, chopped", "香菜，切碎", "香菜", "고수, 다짐", "ผักชี สับ"),
      ingredient("30 g", "ghee", "酥油 ghee", "ギー", "기", "กี"),
      ingredient("4 g", "cumin seeds", "孜然籽", "クミンシード", "커민씨", "เมล็ดยี่หร่า"),
      ingredient("15 g", "garlic, thinly sliced", "蒜，切薄片", "にんにく（薄切り）", "마늘, 얇게 썬 것", "กระเทียม ซอยบาง"),
      ingredient("2", "dried red chiles, broken", "乾紅辣椒，折段", "乾燥赤唐辛子", "마른 홍고추, 자른 것", "พริกแดงแห้ง หัก"),
      ingredient("2 g", "Kashmiri chile powder", "喀什米爾辣椒粉", "カシミール唐辛子粉", "카슈미르 고춧가루", "พริกแคชเมียร์ป่น")
    ],
    instructions: [
      step(ml("Cook the lentils until collapsing", "把木豆煮至化開", "豆を崩れるまで煮る", "렌틸이 풀어지게 익히기", "ต้มถั่วจนแตกตัว"), ml("Combine dal, 750 ml water, tomato, ginger, turmeric, and 3 g salt in a pressure cooker. Cook at high pressure 10 minutes and release naturally 10 minutes; the lentils should collapse when stirred.", "木豆、750 毫升水、番茄、薑、薑黃與 3 公克鹽入壓力鍋，高壓 10 分鐘、自然洩壓 10 分鐘；攪動時豆子應化開。", "ダル、水750ml、トマト、しょうが、ターメリック、塩3gを高圧10分、自然減圧10分。混ぜると崩れる状態にします。", "달, 물 750ml, 토마토, 생강, 강황, 소금 3g을 고압 10분, 자연 배출 10분 익혀 저으면 풀어지게 합니다.", "ใส่ถั่ว น้ำ 750 มล. มะเขือเทศ ขิง ขมิ้น และเกลือ 3 กรัม ต้มแรงดันสูง 10 นาที ปล่อยธรรมชาติ 10 นาที ถั่วต้องแตกเมื่อคน")),
      step(ml("Whisk to a creamy base", "攪成綿滑豆泥", "クリーミーに混ぜる", "부드럽게 휘젓기", "คนให้เนียนครีม"), ml("Whisk the hot dal for 60 seconds, leaving a few soft grains. Add 100 ml water and simmer uncovered 4–6 minutes until it falls from a ladle in a broad, steady ribbon.", "熱 dal 攪 60 秒並保留少量軟豆粒，加 100 毫升水，不加蓋煮 4–6 分鐘，至可從湯勺寬帶穩定流下。", "熱いダルを1分混ぜ、水100mlを加えて4〜6分、広い帯状に流れる濃度まで煮ます。", "뜨거운 달을 60초 저어 약간의 알갱이를 남기고 물 100ml를 넣어 4~6분 넓은 띠처럼 흐르게 끓입니다.", "ตีดาลร้อน 60 วินาทีให้เหลือเม็ดนุ่มเล็กน้อย เติมน้ำ 100 มล. เคี่ยวเปิด 4–6 นาทีจนไหลเป็นสายกว้าง")),
      step(ml("Season the dal base", "調味 dal 底", "ダルを調味する", "달 베이스 간하기", "ปรุงฐานดาล"), ml("Stir in garam masala, half the cilantro, and remaining salt. Keep the dal at a bare simmer over the lowest heat while making the tadka; add hot water if a skin begins forming.", "拌入 garam masala、一半香菜與餘鹽，以最小火維持極小滾並製作 tadka；表面開始結皮就補少量熱水。", "ガラムマサラ、香菜半量、残りの塩を混ぜ、最弱火で保温します。膜が張るなら湯を足します。", "가람 마살라, 고수 절반, 남은 소금을 섞어 최약불에서 유지하고 막이 생기면 뜨거운 물을 보충합니다.", "คนการัมมาซาลา ผักชีครึ่งหนึ่ง และเกลือที่เหลือ รักษาเดือดปุดต่ำสุดระหว่างทำตัดกา เติมน้ำร้อนหากเริ่มเป็นผิว")),
      step(ml("Bloom cumin in ghee", "以酥油爆香孜然", "ギーでクミンをはじかせる", "기에 커민 향내기", "ผัดยี่หร่าในกี"), ml("Heat ghee in a small tadka pan over medium until shimmering. Add cumin seeds and cook 20–30 seconds until fragrant and actively sizzling, but still brown rather than black.", "小 tadka 鍋中火加熱酥油至閃亮，孜然籽爆 20–30 秒至出香、積極冒泡，但仍是褐色不可變黑。", "小鍋でギーを熱し、クミンを20〜30秒、香りが立ち焦げないようにはじかせます。", "작은 팬에 기를 달궈 커민을 20~30초 향이 나고 활발히 지글거리되 검게 타지 않게 볶습니다.", "อุ่นกีในกระทะตัดกาเล็กไฟกลาง ใส่ยี่หร่า 20–30 วินาทีจนหอมและซู่ แต่ยังน้ำตาลไม่ดำ")),
      step(ml("Brown garlic and chile", "煸金蒜片與辣椒", "にんにくと唐辛子を炒める", "마늘과 고추 볶기", "ผัดกระเทียมและพริก"), ml("Add garlic and dried chiles. Fry 45–60 seconds until garlic is pale gold, then switch off heat and immediately stir in chile powder for 5 seconds so it blooms without burning.", "加蒜片與乾辣椒炸 45–60 秒至蒜淡金，關火後立刻拌入辣椒粉 5 秒，只出香不燒焦。", "にんにくと唐辛子を45〜60秒、にんにくが薄金色まで炒め、火を止めて粉唐辛子を5秒混ぜます。", "마늘과 마른 고추를 45~60초 옅은 금색으로 볶고 불을 끈 뒤 고춧가루를 5초 섞습니다.", "ใส่กระเทียมและพริกแห้ง ทอด 45–60 วินาทีจนกระเทียมทองอ่อน ปิดไฟแล้วคนพริกป่น 5 วินาที")),
      step(ml("Pour the sizzling tadka", "淋入滾熱 tadka", "熱いタルカをかける", "지글거리는 타드카 붓기", "ราดตัดการ้อน"), ml("Pour the entire sizzling ghee mixture over the hot dal and cover for 60 seconds to trap the aroma. Uncover, garnish with remaining cilantro, and serve immediately with rice or roti.", "把整鍋滾熱酥油香料淋上熱 dal，加蓋 60 秒鎖香；開蓋撒餘下香菜，立即搭飯或 roti 上桌。", "熱いギーをダルに全て注ぎ、60秒覆って香りを閉じ込め、残りの香菜を添えます。", "지글거리는 기 혼합물을 뜨거운 달에 모두 붓고 60초 덮어 향을 가둔 뒤 남은 고수를 올립니다.", "ราดกีร้อนทั้งหมดบนดาลร้อน ปิด 60 วินาทีกักกลิ่น เปิดโรยผักชีที่เหลือ เสิร์ฟทันทีกับข้าวหรือโรตี"))
    ],
    substitutions: [
      ml("Split red lentils can replace up to half the toor dal and shorten pressure cooking to 8 minutes; the flavour will be lighter.", "最多可用紅扁豆瓣替代一半木豆，高壓時間縮至 8 分鐘，風味較輕。", "トゥールダルの半量まで赤レンズ豆に替え、高圧8分にします。", "투르달 절반까지 붉은 렌틸로 바꾸고 고압 8분으로 줄일 수 있습니다.", "ใช้ถั่วเลนทิลแดงแทนตูร์ได้ไม่เกินครึ่ง ลดแรงดันเหลือ 8 นาที รสจะเบากว่า"),
      ml("For dairy-free tadka, use neutral oil instead of ghee; the cumin-garlic technique stays the same.", "無乳版本以中性油取代酥油，孜然蒜片爆香步驟相同。", "乳製品なしはギーを植物油に替え、同じ手順で香りを出します。", "유제품 없이 하려면 기 대신 중성유를 쓰고 같은 방식으로 향을 냅니다.", "แบบไร้นมใช้น้ำมันรสกลางแทนกี วิธีผัดยี่หร่ากระเทียมเหมือนเดิม")
    ],
    cultureNote: ml("Dal describes many lentil dishes; tadka is the final hot-fat tempering that defines this version. Pouring it at the table-side moment preserves its aroma.", "Dal 泛指多種豆料理；tadka 是此版本的最後熱油爆香，接近上桌才淋能保留香氣。", "ダルは豆料理の総称で、タルカは仕上げの熱い油の香り付けです。直前に注ぐと香りが残ります。", "달은 다양한 렌틸 요리를 뜻하고 타드카는 이 버전을 정의하는 마지막 뜨거운 기름 향내기입니다.", "ดาลหมายถึงอาหารถั่วหลายแบบ ตัดกาคือการราดไขมันร้อนปรุงกลิ่นช่วงท้าย ยิ่งราดใกล้เสิร์ฟยิ่งหอม"),
    imageAlt: ml("Creamy yellow dal tadka topped with red chile ghee, cumin, browned garlic, dried chiles, and cilantro", "綿滑黃色 dal 上淋紅辣酥油、孜然、金黃蒜片、乾辣椒與香菜", "赤いギー、クミン、にんにく、唐辛子、香菜をのせた黄色いダールタルカ", "붉은 기, 커민, 갈색 마늘, 마른 고추와 고수를 올린 노란 달 타드카", "ดาลตัดกาสีเหลืองเนียน ราดกีพริกแดง ยี่หร่า กระเทียมทอง พริกแห้ง และผักชี"),
    visualSpec: "Creamy flowing yellow dal in a metal or ceramic bowl with a visible red-ghee tempering, cumin seeds, pale-golden garlic, two dried chiles, and cilantro; no rice mixed in."
  })
];
