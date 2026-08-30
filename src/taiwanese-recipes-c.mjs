import { ingredient, makeTaiwaneseRecipe, ml, step } from "./taiwanese-recipe-helpers.mjs";

export const taiwaneseRecipesC = [
  makeTaiwaneseRecipe({
    id: "ba-wan", profile: "dough", prepMinutes: 45, cookMinutes: 55, totalMinutes: 100, servings: 8,
    name: ml("Changhua Ba-Wan", "彰化肉圓", "彰化肉圓", "장화 바완", "บะหว่านจางฮว่า"),
    description: ml("Translucent, springy sweet-potato-starch dumplings enclose pork, bamboo shoots, and shiitake, then receive a smooth sweet-savory sauce.", "透明軟 Q 的地瓜粉外皮包入豬肉、筍丁與香菇，蒸熟後淋滑順甜鹹醬，呈現彰化肉圓。", "透明でもちっとした皮で豚肉、たけのこ、椎茸を包み、甘辛いたれをかけます。", "투명하고 쫄깃한 고구마 전분 피에 돼지고기, 죽순, 표고를 넣고 달콤짭짤한 소스를 얹습니다.", "แป้งมันหวานใสหนึบห่อหมู หน่อไม้ และเห็ดหอม นึ่งแล้วราดซอสหวานเค็ม"),
    ingredients: [
      ingredient("350 g", "pork shoulder, 1 cm dice", "梅花豬，切 1 公分丁", "豚肩肉（1cm角）", "목살, 1cm 깍둑", "สันคอหมู หั่นเต๋า 1 ซม."),
      ingredient("120 g", "bamboo shoots, 8 mm dice", "竹筍，切 8 毫米丁", "たけのこ（8mm角）", "죽순, 8mm 깍둑", "หน่อไม้ หั่นเต๋า 8 มม."),
      ingredient("5", "dried shiitake, soaked and diced", "乾香菇，泡軟切丁", "干し椎茸（戻して角切り）", "마른 표고, 불려 깍둑", "เห็ดหอมแห้ง แช่และหั่นเต๋า"),
      ingredient("20 ml", "soy sauce", "醬油", "しょうゆ", "간장", "ซีอิ๊ว"),
      ingredient("15 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("400 g", "sweet potato starch", "地瓜粉", "さつまいもでんぷん", "고구마 전분", "แป้งมันหวาน"),
      ingredient("55 g", "rice flour", "在來米粉", "米粉", "쌀가루", "แป้งข้าวเจ้า"),
      ingredient("520 ml", "boiling water", "沸水", "熱湯", "끓는 물", "น้ำเดือด"),
      ingredient("30 ml", "neutral oil, plus oil for molds", "中性油，另備抹模用", "植物油", "중성유", "น้ำมันรสกลาง"),
      ingredient("300 ml", "water for sauce", "醬汁用水", "たれ用の水", "소스용 물", "น้ำสำหรับซอส"),
      ingredient("45 g", "sweet chile sauce", "甜辣醬", "スイートチリソース", "스위트 칠리소스", "ซอสพริกหวาน"),
      ingredient("25 g", "miso", "味噌", "みそ", "미소", "มิโสะ"),
      ingredient("15 g", "cornstarch mixed with 30 ml water", "玉米澱粉加 30 毫升水", "コーンスターチと水30ml", "옥수수전분과 물 30ml", "แป้งข้าวโพดผสมน้ำ 30 มล.")
    ],
    instructions: [
      step(ml("Season and rest the filling", "調味並冷藏肉餡", "具に味を付ける", "소 재워 두기", "ปรุงและพักไส้"), ml("Mix pork, bamboo shoots, shiitake, soy sauce, rice wine, 3 g sugar, and 2 g white pepper. Stir 60 seconds until tacky, cover, and refrigerate 20 minutes while preparing the wrapper.", "豬肉、筍丁、香菇、醬油、米酒、3 公克糖與 2 公克白胡椒拌 60 秒至黏，密封冷藏 20 分鐘，同時做外皮。", "具を60秒練り、20分冷蔵します。", "소 재료를 60초 끈기 나게 섞어 20분 냉장합니다.", "คลุกไส้ 60 วินาทีจนเหนียว ปิดแช่เย็น 20 นาที")),
      step(ml("Scald the starch dough", "燙製地瓜粉皮", "でんぷん生地を作る", "전분 반죽 익반죽", "ลวกแป้งมัน"), ml("Whisk rice flour with 220 ml cold water from the measured total in a heavy pan. Cook over medium-low 4–5 minutes until a thick translucent paste forms. Off heat, work in sweet potato starch, 300 ml boiling water, and 30 ml oil in stages until smooth and very sticky.", "厚鍋將在來米粉與總量中 220 毫升冷水攪勻，中小火煮 4–5 分鐘至濃稠半透明；離火分次揉入地瓜粉、300 毫升沸水與 30 毫升油，至滑順黏稠。", "米粉を水220mlで糊化し、火を止めてでんぷん、熱湯300ml、油を混ぜます。", "쌀가루를 물 220ml에 익혀 풀을 만들고 불을 꺼 전분, 끓는 물 300ml, 기름을 섞습니다.", "กวนแป้งข้าวกับน้ำ 220 มล. จนข้นใส ปิดไฟแล้วใส่แป้งมัน น้ำเดือด 300 มล. และน้ำมันทีละส่วน")),
      step(ml("Line the molds", "抹模並鋪外皮", "型に生地を敷く", "틀에 피 펴기", "กรุแป้งในพิมพ์"), ml("Oil eight 10 cm shallow bowls. With wet or oiled spoons, spread 55 g warm dough over the base and 2 cm up each side, keeping an even 4–5 mm layer; cover unused dough so it does not skin.", "八個 10 公分淺碗抹油；以濕匙或油匙把每份 55 公克溫粉糰鋪底並往側邊 2 公分，厚度均勻 4–5 毫米；其餘粉糰保持覆蓋。", "直径10cmの型8個に油を塗り、生地55gを4〜5mm厚に敷きます。", "10cm 틀 8개에 기름을 바르고 반죽 55g을 4~5mm 두께로 폅니다.", "ทาพิมพ์ตื้น 10 ซม. 8 ใบ กรุแป้งอุ่น 55 กรัม หนา 4–5 มม.")),
      step(ml("Fill and seal", "包餡封頂", "具を入れて閉じる", "소 넣어 봉하기", "ใส่ไส้และปิด"), ml("Place 55 g filling in each centre without touching the rim. Cover with 35 g dough and smooth the top to meet the base layer, expelling large air pockets; the pork filling must be completely enclosed.", "每碗中央放 55 公克餡，不碰碗緣；再覆 35 公克粉糰並抹平與底皮接合，排出大氣泡，生豬肉必須完全包住。", "具55gを入れ、生地35gで完全に閉じます。", "소 55g을 넣고 반죽 35g으로 완전히 덮어 큰 공기를 뺍니다.", "ใส่ไส้ 55 กรัม ปิดด้วยแป้ง 35 กรัม ไล่ฟองอากาศและหุ้มหมูให้มิด")),
      step(ml("Steam until translucent", "蒸至透明熟透", "透明になるまで蒸す", "투명하게 찌기", "นึ่งจนใส"), ml("Steam over steadily boiling water for 28–32 minutes. The wrapper should be evenly translucent and the filling at least 71°C. Rest in molds 8 minutes, then loosen with an oiled spoon.", "以穩定沸水蒸 28–32 分鐘，外皮應均勻透明且餡中心至少 71°C；留模靜置 8 分鐘，再以油匙脫模。", "強い蒸気で28〜32分、皮が透明で具が71°C以上まで蒸し、8分休ませます。", "센 증기로 28~32분, 피가 투명하고 소가 71°C 이상이 되게 찐 뒤 8분 쉽니다.", "นึ่งน้ำเดือด 28–32 นาทีจนแป้งใสทั่วและไส้ถึง 71°C พักในพิมพ์ 8 นาที")),
      step(ml("Cook sauce and serve", "煮醬淋上桌", "たれを作って供する", "소스 끓여 내기", "ทำซอสและเสิร์ฟ"), ml("Simmer 300 ml water, sweet chile sauce, and miso for 3 minutes. Whisk in slurry and cook 1 minute until glossy. Put each ba-wan in a shallow bowl, spoon over 35–40 ml sauce, and serve hot.", "300 毫升水、甜辣醬與味噌小滾 3 分鐘，拌入粉水煮 1 分鐘至滑亮；肉圓放淺碗，每份淋 35–40 毫升醬，趁熱上桌。", "たれを3分煮てとろみを付け、肉圓に35〜40mlかけます。", "소스를 3분 끓여 농도를 내고 바완마다 35~40ml 얹습니다.", "ต้มซอส 3 นาที ใส่น้ำแป้งให้ข้น แล้วราดบะหว่านชิ้นละ 35–40 มล."))
    ],
    substitutions: [
      ml("Tapioca starch can replace up to half the sweet potato starch; using all tapioca makes the wrapper more elastic and less like Changhua ba-wan.", "最多可用樹薯粉替代一半地瓜粉；全用樹薯粉會更彈，較不像彰化肉圓。", "さつまいもでんぷんの半量までタピオカで代用できます。", "고구마 전분 절반까지 타피오카 전분으로 대체할 수 있습니다.", "ใช้แป้งมันสำปะหลังแทนแป้งมันหวานได้ไม่เกินครึ่งหนึ่ง"),
      ml("Firm tofu dice can replace pork for a vegetarian filling, but season separately and steam until the wrapper is fully translucent.", "素食餡可用硬豆腐丁替代豬肉，另行調味，蒸至外皮完全透明即可。", "豚肉は木綿豆腐に替えられます。", "돼지고기 대신 단단한 두부를 쓸 수 있습니다.", "ใช้เต้าหู้แข็งแทนหมูได้ ปรุงแยกและนึ่งจนแป้งใส")
    ],
    cultureNote: ml("Ba-wan styles differ across Taiwan in wrapper ratio, shape, steaming, and frying. This version follows a steamed Changhua-style form with pork, bamboo shoot, and shiitake.", "台灣各地肉圓的粉皮比例、形狀與蒸炸方式不同；此版採蒸製彰化風格，內餡為豬肉、筍與香菇。", "肉圓は地域で皮や調理法が異なり、本レシピは蒸す彰化風です。", "바완은 지역마다 피와 조리법이 다르며 이 버전은 찐 장화식입니다.", "บะหว่านแต่ละพื้นที่ต่างกันทั้งแป้งและวิธีทำ สูตรนี้เป็นแบบนึ่งจางฮว่า"),
    imageAlt: ml("Translucent Changhua ba-wan with pork and bamboo filling under glossy sweet-savory sauce", "透明彰化肉圓，內有豬肉筍丁並淋油亮甜鹹醬", "豚肉とたけのこ入りの透明な彰化肉圓", "돼지고기와 죽순 소가 든 투명한 장화 바완", "บะหว่านจางฮว่าแป้งใส ไส้หมูหน่อไม้ ราดซอสเงา"),
    visualSpec: "One large translucent pale dumpling in a shallow bowl, with the pork-and-bamboo filling faintly visible and a smooth amber-red sauce; not opaque bread dough."
  }),

  makeTaiwaneseRecipe({
    id: "pork-ball-rice-vermicelli-soup", profile: "braise", prepMinutes: 30, cookMinutes: 55, totalMinutes: 85, servings: 4,
    name: ml("Pork Ball Rice Vermicelli Soup", "貢丸米粉湯", "肉団子ビーフンスープ", "궁완 쌀국수탕", "ซุปเส้นหมี่ลูกชิ้นหมูไต้หวัน"),
    description: ml("Springy pork balls, rice vermicelli, daikon, celery, and fried shallots sit in a clear peppery pork broth.", "彈牙貢丸、米粉、白蘿蔔、芹菜與油蔥酥放入清澈胡椒豬骨湯，是台灣小吃店的熟悉組合。", "弾力ある肉団子、ビーフン、大根、セロリ、揚げねぎを澄んだ豚スープに入れます。", "탱글한 돼지고기 완자, 쌀국수, 무, 셀러리와 튀긴 샬롯을 맑은 돼지 육수에 담습니다.", "ลูกชิ้นหมูเด้ง เส้นหมี่ หัวไชเท้า ขึ้นฉ่าย และหอมเจียวอยู่ในน้ำซุปหมูใสพริกไทย"),
    ingredients: [
      ingredient("900 g", "pork neck bones, rinsed", "豬頸骨，沖洗", "豚首骨", "돼지 목뼈", "กระดูกคอหมู"),
      ingredient("2.2 L", "water", "水", "水", "물", "น้ำ"),
      ingredient("450 g", "daikon, 2.5 cm chunks", "白蘿蔔，切 2.5 公分塊", "大根（2.5cm）", "무, 2.5cm", "หัวไชเท้า หั่น 2.5 ซม."),
      ingredient("400 g", "Taiwan pork balls", "台灣貢丸", "台湾肉団子", "대만식 돼지고기 완자", "ลูกชิ้นหมูไต้หวัน"),
      ingredient("240 g", "dry rice vermicelli", "乾米粉", "乾燥ビーフン", "마른 쌀국수", "เส้นหมี่แห้ง"),
      ingredient("20 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("7 g", "fine salt, plus more to taste", "細鹽，另依口味調整", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("3 g", "ground white pepper", "白胡椒粉", "白こしょう", "흰 후추", "พริกไทยขาว"),
      ingredient("30 g", "Chinese celery, finely sliced", "芹菜，切細", "中国セロリ", "중국 셀러리", "ขึ้นฉ่ายจีน ซอย"),
      ingredient("35 g", "fried shallots", "油蔥酥", "揚げねぎ", "튀긴 샬롯", "หอมเจียว")
    ],
    instructions: [
      step(ml("Blanch and rinse the bones", "汆燙洗淨豬骨", "骨を下ゆでする", "돼지뼈 데치기", "ลวกกระดูก"), ml("Cover bones with cold water, bring to a boil, and cook 4 minutes. Drain, rinse away every dark clot under warm water, and scrub the pot before returning the bones.", "豬骨加冷水煮滾 4 分鐘，瀝乾後以溫水沖掉所有深色血塊，並洗鍋再放回骨頭。", "骨を冷水から4分ゆで、洗って鍋も清潔にします。", "뼈를 찬물부터 4분 끓여 씻고 냄비도 닦습니다.", "ต้มกระดูกจากน้ำเย็น 4 นาที เททิ้ง ล้างคราบเลือดและล้างหม้อ")),
      step(ml("Simmer a clear broth", "熬清豬骨湯", "澄んだスープを取る", "맑은 육수 끓이기", "ต้มน้ำซุปใส"), ml("Add 2.2 L fresh water, bring just to a simmer, and skim for 10 minutes. Keep uncovered at the gentlest bubble for 35 minutes; never stir or boil hard, which makes the broth cloudy.", "加 2.2 公升清水煮至微滾，前 10 分鐘撇沫；不加蓋以最小泡熬 35 分鐘，不攪拌也不大滾，避免混濁。", "水2.2Lで10分アクを取り、弱い煮立ちで35分煮ます。", "물 2.2L를 넣고 10분 거품을 걷은 뒤 가장 약한 불로 35분 끓입니다.", "เติมน้ำ 2.2 ลิตร ช้อนฟอง 10 นาที แล้วเคี่ยวฟองเบาสุด 35 นาที")),
      step(ml("Cook daikon and pork balls", "煮蘿蔔與貢丸", "大根と肉団子を煮る", "무와 완자 익히기", "ต้มหัวไชเท้าและลูกชิ้น"), ml("Strain 1.8 L broth into a clean pot. Add daikon and simmer 15 minutes, then add pork balls and cook 7–9 minutes until the daikon is translucent at the edge and the balls are hot to 74°C.", "過濾 1.8 公升高湯入乾淨鍋，白蘿蔔小滾 15 分鐘，再加貢丸煮 7–9 分鐘，至蘿蔔邊緣透明、貢丸中心 74°C。", "こしたスープで大根を15分、肉団子を7〜9分、中心74°Cまで煮ます。", "거른 육수에 무를 15분, 완자를 7~9분 중심 74°C까지 익힙니다.", "ต้มหัวไชเท้าในน้ำซุปกรอง 15 นาที เติมลูกชิ้น 7–9 นาทีจนใจกลาง 74°C")),
      step(ml("Soften the rice vermicelli", "泡軟並汆煮米粉", "ビーフンを戻す", "쌀국수 불려 삶기", "แช่และลวกเส้นหมี่"), ml("Soak vermicelli in cool water for 10 minutes and drain. Boil in a separate pot for 60–90 seconds until flexible but still springy; drain immediately so starch does not cloud the serving broth.", "米粉冷水泡 10 分鐘瀝乾，另鍋滾水煮 60–90 秒至柔韌仍彈，立刻瀝乾，不讓澱粉混濁上桌湯。", "ビーフンを冷水で10分戻し、別鍋で60〜90秒ゆでます。", "쌀국수를 찬물에 10분 불려 별도 냄비에서 60~90초 삶습니다.", "แช่เส้นหมี่น้ำเย็น 10 นาที ต้มหม้อแยก 60–90 วินาทีแล้วสะเด็ดทันที")),
      step(ml("Season only at the end", "最後才調味", "最後に味を調える", "마지막에 간하기", "ปรุงรสตอนท้าย"), ml("Add rice wine, 7 g salt, and 2 g white pepper to the broth. Simmer 1 minute, taste with a piece of pork ball, and adjust salt in 1 g increments; packaged balls vary greatly in saltiness.", "高湯加米酒、7 公克鹽與 2 公克白胡椒，小滾 1 分鐘；配一塊貢丸試味，每次只補 1 公克鹽，因市售貢丸鹹度差很大。", "米酒、塩、白こしょうを加え、肉団子と味見して調整します。", "미주, 소금, 흰 후추를 넣고 완자와 함께 맛본 뒤 소금을 1g씩 조절합니다.", "เติมเหล้าข้าว เกลือ 7 กรัม และพริกไทยขาว ชิมพร้อมลูกชิ้นแล้วเพิ่มเกลือทีละ 1 กรัม")),
      step(ml("Assemble hot bowls", "組合熱湯碗", "熱い丼に盛る", "뜨거운 그릇에 담기", "จัดชามร้อน"), ml("Divide vermicelli among four warm bowls, add daikon and pork balls, and ladle over 400 ml boiling broth each. Finish with celery, fried shallots, and remaining white pepper; serve immediately.", "米粉分四個溫碗，放白蘿蔔與貢丸，每碗注入 400 毫升滾熱湯，撒芹菜、油蔥酥與其餘白胡椒，立即上桌。", "ビーフン、大根、肉団子に熱いスープ400mlを注ぎ、セロリと揚げねぎを添えます。", "면, 무, 완자에 끓는 육수 400ml를 붓고 셀러리와 튀긴 샬롯을 올립니다.", "แบ่งเส้น ใส่หัวไชเท้า ลูกชิ้น และน้ำซุปร้อน 400 มล. โรยขึ้นฉ่าย หอมเจียว และพริกไทย"))
    ],
    substitutions: [
      ml("Fish balls can replace pork balls, but check that they are fully cooked and heat to 74°C; the flavour will be lighter and seafood-forward.", "貢丸可換魚丸，但要確認產品已熟並回熱至 74°C；味道會較清淡、偏海味。", "肉団子は魚団子に替え、74°Cまで温めます。", "돼지고기 완자 대신 어묵 완자를 써 74°C까지 데울 수 있습니다.", "ใช้ลูกชิ้นปลาแทนได้ แต่อุ่นถึง 74°C และรสจะเบากว่า"),
      ml("Chicken stock may replace pork-bone stock for convenience; use unsalted stock and keep the same daikon simmer.", "方便版可用無鹽雞高湯取代豬骨湯，白蘿蔔煮法不變。", "無塩チキンスープでも代用できます。", "무염 닭육수로 대체할 수 있습니다.", "ใช้น้ำสต๊อกไก่ไม่เค็มแทนได้ และต้มไชเท้าเวลาเดิม")
    ],
    cultureNote: ml("Pork ball rice vermicelli soup is a familiar Taiwanese market and snack-shop bowl. Clear broth, resilient Hsinchu-style rice vermicelli, and springy pork balls matter more than heavy seasoning.", "貢丸米粉湯是台灣市場與小吃店常見組合；清湯、新竹米粉的韌度與彈牙貢丸，比重口味更重要。", "台湾の市場や軽食店で親しまれる一杯で、澄んだスープ、弾力あるビーフンと肉団子が要です。", "대만 시장과 간식점의 익숙한 음식으로 맑은 국물, 탄력 있는 쌀국수와 완자가 핵심입니다.", "เป็นชามคุ้นเคยในตลาดและร้านของว่างไต้หวัน จุดสำคัญคือน้ำซุปใส เส้นหนึบ และลูกชิ้นเด้ง"),
    imageAlt: ml("Clear pork ball rice vermicelli soup with daikon, celery, fried shallots, and white pepper", "清澈貢丸米粉湯，含白蘿蔔、芹菜、油蔥酥與白胡椒", "大根、セロリ、揚げねぎ、白こしょうの肉団子ビーフンスープ", "무, 셀러리, 튀긴 샬롯과 흰 후추의 맑은 궁완 쌀국수탕", "ซุปเส้นหมี่ลูกชิ้นหมูใสกับหัวไชเท้า ขึ้นฉ่าย หอมเจียว และพริกไทยขาว"),
    visualSpec: "Clear pale-gold broth with thin white rice vermicelli, round pale pork balls, translucent daikon chunks, chopped celery, fried shallots, and white pepper."
  }),

  makeTaiwaneseRecipe({
    id: "sesame-oil-chicken", profile: "braise", prepMinutes: 15, cookMinutes: 40, totalMinutes: 55, servings: 4,
    name: ml("Taiwanese Sesame Oil Chicken", "台灣麻油雞", "台湾風ごま油鶏", "대만식 마유지", "ไก่น้ำมันงาไต้หวัน"),
    description: ml("Bone-in chicken, old ginger, black sesame oil, and Taiwan rice wine simmer into a warming, aromatic soup with no medicinal claims.", "帶骨雞、老薑、黑麻油與台灣米酒燉成香氣深厚的暖湯；食譜只描述風味，不宣稱療效。", "骨付き鶏、ひねしょうが、黒ごま油、台湾米酒を香り高いスープにします。", "뼈 있는 닭, 묵은 생강, 검은 참기름과 대만 미주를 향긋한 국물로 끓입니다.", "ต้มไก่ติดกระดูก ขิงแก่ น้ำมันงาดำ และเหล้าข้าวไต้หวันเป็นซุปหอมอุ่น"),
    ingredients: [
      ingredient("1 kg", "bone-in chicken thigh, 5 cm pieces", "帶骨雞腿，剁 5 公分塊", "骨付き鶏もも（5cm）", "뼈 있는 닭다리, 5cm", "สะโพกไก่ติดกระดูก หั่น 5 ซม."),
      ingredient("80 g", "old ginger, thinly sliced", "老薑，切薄片", "ひねしょうが（薄切り）", "묵은 생강, 얇게 썬 것", "ขิงแก่ ซอยบาง"),
      ingredient("60 ml", "black sesame oil", "黑麻油", "黒ごま油", "검은 참기름", "น้ำมันงาดำ"),
      ingredient("600 ml", "Taiwan rice wine", "台灣米酒", "台湾米酒", "대만 미주", "เหล้าข้าวไต้หวัน"),
      ingredient("500 ml", "water", "水", "水", "물", "น้ำ"),
      ingredient("10 g", "goji berries, rinsed, optional", "枸杞，沖洗，可選", "クコの実（好みで）", "구기자, 선택", "เก๋ากี้ ล้าง ตามชอบ"),
      ingredient("5 g", "fine salt, or to taste", "細鹽，依口味", "塩", "고운 소금", "เกลือละเอียด"),
      ingredient("400 g", "cooked fine wheat noodles, optional for serving", "熟細麵線，可選", "ゆでそうめん（好みで）", "삶은 가는 면, 선택", "เส้นหมี่สาลีต้ม ตามชอบ")
    ],
    instructions: [
      step(ml("Blanch the chicken", "汆燙雞塊", "鶏肉を下ゆでする", "닭고기 데치기", "ลวกไก่"), ml("Put chicken in boiling water for 2 minutes, drain, and rinse under warm water. Pat dry thoroughly so residual water does not spit when it meets sesame oil.", "雞塊滾水汆 2 分鐘，瀝乾以溫水沖淨，再徹底擦乾，避免殘水遇黑麻油噴濺。", "鶏肉を2分下ゆでし、洗って完全に水気を拭きます。", "닭고기를 2분 데쳐 씻고 완전히 물기를 닦습니다.", "ลวกไก่ 2 นาที ล้างน้ำอุ่นและซับให้แห้งสนิท")),
      step(ml("Slow-fry the ginger", "慢煸老薑", "しょうがをゆっくり炒める", "생강 천천히 볶기", "ผัดขิงช้า ๆ"), ml("Heat sesame oil in a heavy pot over medium-low. Add ginger in one loose layer and cook 8–10 minutes, turning, until dry at the edges and deep gold; do not let the oil smoke.", "厚鍋中小火熱黑麻油，老薑鬆散單層煸 8–10 分鐘並翻面，至邊緣乾縮深金黃；油不可冒煙。", "ごま油でしょうがを8〜10分、濃い金色まで炒めます。", "참기름에 생강을 8~10분 진한 금색으로 볶습니다.", "ผัดขิงในน้ำมันงาไฟกลางอ่อน 8–10 นาทีจนขอบแห้งสีทองเข้ม")),
      step(ml("Brown the chicken", "煎香雞肉", "鶏肉を焼く", "닭고기 굽기", "จี่ไก่"), ml("Raise to medium, add dried chicken, and cook 8 minutes, turning every 2 minutes, until the skin and cut surfaces lightly brown. Work in two batches if the pot bottom is not visible.", "轉中火加入擦乾雞塊，煎 8 分鐘，每 2 分鐘翻動，至雞皮與切面淡金；若看不到鍋底就分兩批。", "中火で鶏肉を8分、表面が薄く色づくまで焼きます。", "중불에서 닭고기를 8분 옅은 갈색이 나게 굽습니다.", "เพิ่มเป็นไฟกลาง จี่ไก่ 8 นาที พลิกทุก 2 นาทีจนผิวขึ้นสีอ่อน")),
      step(ml("Boil off the raw alcohol", "煮散生酒味", "酒の角を飛ばす", "날술 향 날리기", "ต้มกลิ่นแอลกอฮอล์ดิบ"), ml("Add rice wine carefully and bring to a vigorous simmer uncovered for 5 minutes. Keep flames away from the pot and use ventilation; the liquid should smell aromatic rather than sharply alcoholic.", "小心倒入米酒，不加蓋旺盛小滾 5 分鐘；鍋子遠離明火並保持通風，液體應轉為芳香，不再刺鼻。", "米酒を加え、ふたをせず5分強めに煮て酒の角を飛ばします。", "미주를 넣어 뚜껑 없이 5분 세게 끓여 날술 향을 날립니다.", "เติมเหล้าข้าวอย่างระวัง ต้มเปิดฝาแรง 5 นาทีให้กลิ่นแอลกอฮอล์ดิบจาง")),
      step(ml("Simmer to safe tenderness", "加水燉至安全熟嫩", "水を加えて煮る", "물 넣어 부드럽게 끓이기", "เติมน้ำตุ๋นจนสุกนุ่ม"), ml("Add 500 ml water, bring back to a simmer, cover, and cook on low 20 minutes. Add goji if using and simmer uncovered 5 minutes more until every chicken piece reaches 74°C and the broth is lightly emulsified.", "加 500 毫升水煮回微滾，加蓋小火 20 分鐘；可加枸杞，再開蓋煮 5 分鐘，至每塊雞 74°C、湯汁微乳化。", "水500mlを加えて覆い20分、クコを加え5分、鶏肉74°Cまで煮ます。", "물 500ml를 넣어 덮고 20분, 구기자를 넣어 5분 더 끓여 닭이 74°C가 되게 합니다.", "เติมน้ำ 500 มล. ปิดตุ๋น 20 นาที ใส่เก๋ากี้แล้วเปิดเคี่ยว 5 นาทีจนไก่ทุกชิ้น 74°C")),
      step(ml("Season and serve", "調鹹度並上桌", "味を調えて供する", "간 맞춰 내기", "ปรุงเค็มและเสิร์ฟ"), ml("Turn heat to low, add 4 g salt, and taste after 1 minute; add the final gram only if needed. Serve as soup, or put separately cooked fine noodles in bowls and ladle chicken and broth over them.", "轉小火加 4 公克鹽，1 分鐘後試味，需要才補最後 1 公克。可直接當湯，或碗放另煮細麵線再舀雞肉與湯。", "塩4gで味を調え、必要なら1g追加し、スープまたは麺と供します。", "소금 4g을 넣고 필요하면 1g 더해 국물이나 따로 삶은 면과 냅니다.", "ใส่เกลือ 4 กรัม ชิมแล้วเพิ่มอีก 1 กรัมเมื่อจำเป็น เสิร์ฟเป็นซุปหรือราดเส้นต้มแยก"))
    ],
    substitutions: [
      ml("Use boneless chicken thigh and begin checking 74°C after 12 minutes of covered simmering; bone-in chicken gives a fuller broth.", "可用去骨雞腿，加蓋燉 12 分鐘後開始測 74°C；帶骨版本湯味較完整。", "骨なし鶏なら12分から74°Cを確認します。", "순살 닭다리는 12분부터 74°C를 확인하세요.", "ใช้สะโพกไก่ไร้กระดูกได้ เริ่มเช็ก 74°C หลังปิดตุ๋น 12 นาที"),
      ml("For less rice-wine intensity, use 300 ml rice wine plus 800 ml water; do not replace it with sweet cooking wine.", "想降低酒味可用米酒 300 毫升加水 800 毫升；不可換含糖料理酒。", "酒を控えるなら米酒300mlと水800mlにします。", "미주 향을 줄이려면 미주 300ml와 물 800ml를 쓰세요.", "ลดกลิ่นเหล้าด้วยเหล้าข้าว 300 มล. และน้ำ 800 มล. อย่าใช้เหล้าปรุงหวาน")
    ],
    cultureNote: ml("Sesame oil chicken is associated with cool weather and family care in Taiwan. This recipe treats it as food, not medicine, and gives heat and alcohol-handling cues for safe home cooking.", "麻油雞在台灣常與冷天與家人照顧連結；本食譜只把它當料理，不宣稱醫療效果，並明確說明火力與米酒安全。", "台湾では寒い季節と家庭の料理を連想させますが、本レシピは医療効果を主張しません。", "대만에서 추운 날과 가족 돌봄을 떠올리게 하지만 이 레시피는 의학적 효능을 주장하지 않습니다.", "ไก่น้ำมันงาเชื่อมกับอากาศเย็นและการดูแลครอบครัวในไต้หวัน สูตรนี้อธิบายเป็นอาหาร ไม่อ้างสรรพคุณยา"),
    imageAlt: ml("Taiwanese sesame oil chicken soup with bone-in chicken, browned ginger, and goji berries", "有帶骨雞、煸香老薑與枸杞的台灣麻油雞湯", "骨付き鶏、しょうが、クコの台湾風ごま油鶏スープ", "뼈 있는 닭, 볶은 생강과 구기자의 대만식 마유지", "ซุปไก่น้ำมันงาไต้หวันกับไก่ติดกระดูก ขิงทอด และเก๋ากี้"),
    visualSpec: "Clear-to-lightly-emulsified amber sesame-oil broth with bone-in chicken pieces, many curled browned ginger slices, and a few red goji berries; no cloudy cream or herbs."
  }),

  makeTaiwaneseRecipe({
    id: "taiwanese-tea-eggs", profile: "braise", prepMinutes: 495, cookMinutes: 55, totalMinutes: 550, servings: 8,
    name: ml("Taiwanese Tea Eggs", "台灣茶葉蛋", "台湾茶葉卵", "대만식 차예단", "ไข่ต้มชาไต้หวัน"),
    description: ml("Eggshells are cracked into fine webs, then steeped in black tea, soy, star anise, cinnamon, and citrus peel for marbled whites and savoury aroma.", "蛋殼敲出細密裂紋，再以紅茶、醬油、八角、桂皮與橘皮浸滷，形成大理石紋蛋白與茶香鹹味。", "殻に細かいひびを入れ、紅茶、しょうゆ、八角、桂皮、陳皮で煮含めます。", "달걀 껍질에 잔금이 가게 깨고 홍차, 간장, 팔각, 계피, 귤껍질에 담가 대리석 무늬를 냅니다.", "เคาะเปลือกไข่เป็นลายละเอียด แช่ต้มกับชาดำ ซีอิ๊ว โป๊ยกั๊ก อบเชย และผิวส้มให้ไข่ขาวเป็นลายหินอ่อน"),
    ingredients: [
      ingredient("8", "large eggs", "大型雞蛋", "大きい卵", "큰 달걀", "ไข่ไก่ฟองใหญ่"),
      ingredient("1.2 L", "water for tea broth", "茶滷用水", "煮汁用の水", "차 국물용 물", "น้ำสำหรับน้ำชา"),
      ingredient("12 g", "black tea leaves or 4 tea bags", "紅茶葉或 4 包茶包", "紅茶12gまたは4袋", "홍차 12g 또는 티백 4개", "ใบชาดำ 12 กรัมหรือถุงชา 4 ถุง"),
      ingredient("90 ml", "light soy sauce", "淡醬油", "しょうゆ", "간장", "ซีอิ๊วขาว"),
      ingredient("25 ml", "dark soy sauce", "老抽", "濃口しょうゆ", "노두유", "ซีอิ๊วดำ"),
      ingredient("25 g", "rock sugar", "冰糖", "氷砂糖", "빙탕", "น้ำตาลกรวด"),
      ingredient("3", "star anise", "八角", "八角", "팔각", "โป๊ยกั๊ก"),
      ingredient("1", "cinnamon stick, 5 cm", "桂皮，5 公分", "シナモン5cm", "계피 5cm", "อบเชย 5 ซม."),
      ingredient("3 g", "Sichuan peppercorns", "花椒", "花椒", "화자오", "พริกเสฉวน"),
      ingredient("3 g", "dried mandarin peel", "陳皮", "陳皮", "말린 귤껍질", "ผิวส้มแห้ง")
    ],
    instructions: [
      step(ml("Boil the eggs evenly", "均勻煮熟雞蛋", "卵をゆでる", "달걀 고르게 삶기", "ต้มไข่ให้สม่ำเสมอ"), ml("Put eggs in a single layer, cover with cold water by 3 cm, and bring to a boil. Lower to a steady simmer for 8 minutes, then transfer to ice water for 5 minutes to stop cooking.", "蛋單層放鍋，冷水高過 3 公分，煮滾後轉穩定小滾 8 分鐘；立刻移冰水 5 分鐘停止加熱。", "卵を冷水から沸かし8分ゆで、氷水で5分冷やします。", "달걀을 찬물부터 끓여 8분 삶고 얼음물에 5분 식힙니다.", "วางไข่ชั้นเดียว เติมน้ำเย็นสูง 3 ซม. ต้มเดือดแล้วลด 8 นาที แช่น้ำแข็ง 5 นาที")),
      step(ml("Crack a fine web", "敲出細密裂網", "細かなひびを入れる", "잔금 내기", "เคาะลายร้าวละเอียด"), ml("Roll each cooled egg gently on the counter and tap all over with the back of a spoon. Create closely spaced cracks without removing shell or tearing the membrane; large missing patches make blotches, not marbling.", "冷蛋在桌面輕滾，以湯匙背面均勻敲遍；裂紋要密但不剝殼、不破膜，大塊掉殼只會形成色斑，不是大理石紋。", "冷えた卵全体に細かいひびを入れ、殻や膜は外しません。", "식힌 달걀 전체에 잔금을 내되 껍질과 막은 벗기지 않습니다.", "กลิ้งไข่เย็นแล้วใช้หลังช้อนเคาะให้ร้าวถี่ โดยไม่ลอกเปลือกหรือฉีกเยื่อ")),
      step(ml("Brew the spice broth", "煮茶香料滷汁", "茶の煮汁を作る", "차 향신 국물 끓이기", "ต้มน้ำชากับเครื่องเทศ"), ml("Bring 1.2 L water, both soy sauces, sugar, star anise, cinnamon, peppercorns, and peel to a simmer for 8 minutes. Add tea and simmer 3 minutes more; do not boil tea hard or it turns harsh.", "1.2 公升水、兩種醬油、冰糖、八角、桂皮、花椒與陳皮小滾 8 分鐘；加紅茶再小滾 3 分鐘，不可大滾久煮以免苦澀。", "調味料を8分煮、紅茶を加えて3分だけ煮ます。", "양념과 향신료를 8분 끓이고 홍차를 넣어 3분만 더 끓입니다.", "เคี่ยวน้ำ ซีอิ๊ว น้ำตาล และเครื่องเทศ 8 นาที ใส่ชาเคี่ยวอีก 3 นาที อย่าต้มชาแรง")),
      step(ml("Simmer the cracked eggs", "小火滷裂殼蛋", "ひび卵を煮る", "금 낸 달걀 조리기", "เคี่ยวไข่ร้าว"), ml("Lower cracked eggs into the broth, adding hot water if they are not submerged. Simmer at the barest bubble for 25 minutes, turn each egg once, then switch off the heat.", "裂殼蛋放滷汁，未淹沒時補熱水；以最小泡滷 25 分鐘，中途每顆翻一次，再關火。", "卵を煮汁に沈め、弱く25分煮て一度返し、火を止めます。", "달걀을 국물에 잠기게 해 가장 약하게 25분 끓이고 한 번 뒤집어 불을 끕니다.", "ใส่ไข่ให้จมน้ำ เคี่ยวฟองเบาสุด 25 นาที พลิกครั้งหนึ่งแล้วปิดไฟ")),
      step(ml("Chill in the broth", "連滷汁冷藏入味", "煮汁ごと冷やす", "국물째 냉장 숙성", "แช่เย็นในน้ำชา"), ml("Cool eggs and broth to below 21°C within 2 hours using an ice bath, then refrigerate covered for 8–12 hours. Turn eggs once during chilling so the marbling and seasoning stay even.", "蛋與滷汁用冰水浴在 2 小時內降至 21°C 以下，連汁加蓋冷藏 8–12 小時；中途翻蛋一次，使紋路與味道均勻。", "氷水で2時間以内に21°C未満まで冷まし、煮汁ごと8〜12時間冷蔵します。", "얼음물로 2시간 안에 21°C 아래로 식혀 국물째 8~12시간 냉장하고 한 번 뒤집습니다.", "ใช้อ่างน้ำแข็งทำให้ต่ำกว่า 21°C ภายใน 2 ชั่วโมง แล้วแช่เย็นในน้ำชา 8–12 ชั่วโมง พลิกหนึ่งครั้ง")),
      step(ml("Reheat gently or serve cool", "溫熱或冷食上桌", "温めるか冷たいまま供する", "부드럽게 데우거나 차게 내기", "อุ่นเบาหรือเสิร์ฟเย็น"), ml("For warm eggs, heat only the needed eggs in broth at 75–80°C for 8 minutes; do not boil, which makes the whites rubbery. Peel at serving so the marbling is visible and the surface stays moist.", "溫食時只取需要的蛋，在 75–80°C 滷汁中回溫 8 分鐘；不可煮滾，否則蛋白變橡皮。上桌才剝殼，紋路清楚且表面不乾。", "温めるなら75〜80°Cの煮汁で8分、沸かさず、食べる直前に殻をむきます。", "따뜻하게 먹을 것은 75~80°C 국물에서 8분 데우고 끓이지 않으며 먹기 직전 껍질을 벗깁니다.", "อุ่นเฉพาะที่จะกินในน้ำชา 75–80°C 8 นาที ไม่ต้ม แล้วปอกก่อนเสิร์ฟ"))
    ],
    substitutions: [
      ml("Use oolong tea for a floral version, but keep the same 12 g weight and short brewing time.", "可用 12 公克烏龍茶做花香版本，浸煮時間仍相同。", "紅茶は烏龍茶12gに替えられます。", "홍차 대신 우롱차 12g을 같은 시간 사용할 수 있습니다.", "ใช้ชาอู่หลง 12 กรัมแทนได้ โดยคงเวลาต้มสั้นเท่าเดิม"),
      ml("One strip of fresh orange zest can replace dried peel; remove all white pith to avoid bitterness.", "陳皮可換一條新鮮橙皮，只取橙色外皮，白膜要去淨避免苦。", "陳皮は白い部分を除いた生オレンジ皮で代用できます。", "말린 귤껍질 대신 흰 속을 제거한 생오렌지 껍질을 쓸 수 있습니다.", "ใช้ผิวส้มสดแทนได้ แต่เอาเยื่อขาวออกหมดเพื่อไม่ให้ขม")
    ],
    storage: ml("Keep eggs submerged in strained broth in a covered refrigerator container for up to 3 days. Reheat only the portion being served and discard broth after day 3.", "雞蛋浸在過濾滷汁中加蓋冷藏最多 3 天；只回熱當次食用份量，第 3 天後連滷汁一併丟棄。", "こした煮汁に浸して密閉冷蔵3日以内。食べる分だけ温めます。", "거른 국물에 잠기게 밀폐 냉장 3일 이내 보관하고 먹을 양만 데웁니다.", "เก็บไข่จมในน้ำชาที่กรองแล้ว ปิดแช่เย็นไม่เกิน 3 วัน อุ่นเฉพาะที่จะกิน"),
    cultureNote: ml("Tea eggs are a familiar Taiwanese convenience-store and railway snack. Fine shell cracks and a long chilled steep make the marbling; prolonged hard boiling does not.", "茶葉蛋是台灣便利商店與旅途熟悉的小吃；細裂紋與冷藏長浸才形成大理石紋，不靠長時間大滾。", "茶葉卵は台湾のコンビニや旅の軽食で、細かなひびと長い浸漬で模様ができます。", "차예단은 대만 편의점과 여행 간식으로 잔금과 긴 냉장 숙성으로 무늬가 생깁니다.", "ไข่ชาเป็นของว่างคุ้นเคยในร้านสะดวกซื้อและรถไฟไต้หวัน ลายเกิดจากรอยร้าวถี่และการแช่นาน"),
    imageAlt: ml("Peeled Taiwanese tea eggs with dark marbled tea-and-soy patterns", "剝殼後呈深色茶醬油大理石紋的台灣茶葉蛋", "茶としょうゆの濃い大理石模様の台湾茶葉卵", "차와 간장의 짙은 대리석 무늬가 난 대만식 차예단", "ไข่ชาไต้หวันปอกเปลือกมีลายหินอ่อนเข้มจากชาและซีอิ๊ว"),
    visualSpec: "Several peeled whole and halved eggs with fine dark-brown spiderweb marbling on pale whites and set golden yolks, with whole spices nearby but no broth bowl."
  })
];
