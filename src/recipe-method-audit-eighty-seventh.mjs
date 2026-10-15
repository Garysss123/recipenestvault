// Reimplementation batch 3. These are newly authored methods, not restored
// handoff patches; the original recipe records remain the source of portions.
const foodTemps = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const dosaSafety = "https://www.bccdc.ca/resource-gallery/Documents/Educational%20Materials/EH/FPS/Food/Fermented/Fermented%20Foods%20Guideline%20-%203.4%20Dosa%20and%20Idli.pdf";
const leftovers = "https://www.gov.uk/government/publications/student-guide-to-food-safety-and-hygiene/student-guide-to-food-safety-and-hygiene";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${label}`, url });
  }
}

function reviseRecipe(recipe, revision) {
  if (!recipe) throw new Error(`Missing recipe for method revision: ${revision.id}`);
  recipe.instructions = recipe.instructions.map((step, index) => ({
    ...step,
    title: revision.titles[index],
    body: revision.bodies[index]
  }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = revision.tips;
  recipe.commonMistakes = revision.mistakes;
  recipe.storage = revision.storage;
  if (revision.prepMinutes !== undefined) recipe.prepMinutes = revision.prepMinutes;
  if (revision.cookMinutes !== undefined) recipe.cookMinutes = revision.cookMinutes;
  if (revision.prepMinutes !== undefined || revision.cookMinutes !== undefined) {
    recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  }
  if (revision.additionalIngredients?.length) {
    recipe.ingredients = recipe.ingredients.map((row) => ({ ...row, item: { ...row.item } }));
    recipe.ingredients.push(...revision.additionalIngredients);
  }
  for (const [label, url] of revision.safetySources) addOfficialSource(recipe, label, url);
}

function reviseMapoTofu(recipe) {
  reviseRecipe(recipe, {
    id: "mapo-tofu",
    titles: [
      ml("Prepare the tofu and slurry", "處理豆腐與芡汁", "豆腐と水溶き片栗粉を準備", "두부와 전분물 준비", "เตรียมเต้าหู้และแป้งน้ำ"),
      ml("Set out the aromatics", "備好辛香料", "香味野菜と調味料を並べる", "향신 재료와 양념 준비", "เตรียมเครื่องหอมและเครื่องปรุง"),
      ml("Cook the ground pork safely", "將豬絞肉炒熟", "豚ひき肉を安全に炒める", "다진 돼지고기를 안전하게 익히기", "ผัดหมูบดให้สุกปลอดภัย"),
      ml("Bloom the bean seasonings", "炒香豆瓣醬與豆豉", "豆板醤と豆鼓の香りを出す", "두반장과 발효 검은콩 볶기", "ผัดโต้วป้านเจี้ยงกับถั่วหมัก"),
      ml("Build the sauce", "調好醬汁", "ソースを作る", "소스 만들기", "ทำซอส"),
      ml("Simmer the tofu gently", "小火煨煮豆腐", "豆腐を静かに煮る", "두부를 은근히 끓이기", "เคี่ยวเต้าหู้เบา ๆ"),
      ml("Thicken in two additions", "分兩次勾芡", "2回に分けてとろみを付ける", "두 번 나누어 농도 내기", "เติมแป้งให้ข้นสองครั้ง"),
      ml("Finish with pepper and scallions", "以花椒與青蔥收尾", "花椒とねぎで仕上げる", "화자오와 대파로 마무리", "ใส่พริกหอมและต้นหอมปิดท้าย")
    ],
    bodies: [
      ml(
        "Cut all 400 g soft tofu into even 2 cm cubes. Hold the cubes in 70°C lightly salted water for 5 minutes, then lift them out gently and drain. Stir all 8 g cornstarch with its 20 ml water until no dry lumps remain; set aside.",
        "將全部 400 公克嫩豆腐切成均勻的 2 公分方塊，放入約 70°C 的淡鹽水浸 5 分鐘，再輕輕撈起瀝乾。將全部 8 公克玉米澱粉與 20 毫升水攪至沒有乾粉結塊，放旁備用。",
        "絹ごし豆腐400g全量を2cm角に切ります。薄い塩水に入れ、70°Cを保って5分置き、そっと取り出して水気を切ります。コーンスターチ8g全量と水20mlを、粉の塊がなくなるまで混ぜておきます。",
        "부드러운 두부 400g 전량을 2cm 크기로 고르게 깍둑썰기합니다. 옅은 소금물에 넣고 70°C로 5분 유지한 뒤 조심히 건져 물기를 뺍니다. 옥수수전분 8g 전량을 물 20ml와 마른 덩어리 없이 풀어 둡니다.",
        "หั่นเต้าหู้อ่อน 400 กรัมทั้งหมดเป็นเต๋า 2 ซม.เท่า ๆ กัน แช่ในน้ำเกลืออ่อนที่ 70°C นาน 5 นาที แล้วช้อนขึ้นอย่างเบามือและสะเด็ดน้ำ ผสมแป้งข้าวโพด 8 กรัมทั้งหมดกับน้ำ 20 มล.จนไม่เหลือเม็ดแป้งแห้ง พักไว้"
      ),
      ml(
        "Measure the 120 g pork, all 30 g doubanjiang, 10 g black beans, 15 g garlic, 10 g ginger, 3 g ground Sichuan peppercorns, 250 ml stock, 15 ml soy sauce, 15 ml Shaoxing wine, 3 g sugar, and 30 g scallions. Divide the peppercorns in half. Keep raw pork and its utensils separate from the tofu and cooked-food utensils.",
        "量好 120 公克豬絞肉、30 公克豆瓣醬、10 公克豆豉、15 公克蒜、10 公克薑、3 公克花椒粉、250 毫升高湯、15 毫升生抽、15 毫升紹興酒、3 公克砂糖及 30 公克青蔥。花椒粉分成兩份。生豬肉及其器具要與豆腐、熟食器具分開。",
        "豚ひき肉120g、豆板醤30g、豆鼓10g、にんにく15g、しょうが10g、粉山椒3g、スープ250ml、しょうゆ15ml、紹興酒15ml、砂糖3g、ねぎ30gを計量します。山椒は半分ずつに分けます。生肉と器具は豆腐や加熱済み食品の器具から分けておきます。",
        "돼지고기 다짐육 120g, 두반장 30g, 발효 검은콩 10g, 마늘 15g, 생강 10g, 간 화자오 3g, 육수 250ml, 간장 15ml, 소흥주 15ml, 설탕 3g, 대파 30g을 계량합니다. 화자오는 절반씩 나눕니다. 생고기와 사용한 도구는 두부와 조리된 음식에 쓰는 도구와 분리합니다.",
        "ตวงหมูบด 120 กรัม โต้วป้านเจี้ยง 30 กรัม ถั่วดำหมัก 10 กรัม กระเทียม 15 กรัม ขิง 10 กรัม พริกหอมเสฉวนบด 3 กรัม น้ำสต๊อก 250 มล. ซีอิ๊วขาว 15 มล. เหล้าเส้าซิง 15 มล. น้ำตาล 3 กรัม และต้นหอม 30 กรัม แบ่งพริกหอมเป็นสองส่วน แยกหมูดิบและอุปกรณ์ที่สัมผัสหมูออกจากเต้าหู้และอุปกรณ์สำหรับอาหารสุก"
      ),
      ml(
        "Heat a wok over medium-high heat. Add all 25 ml oil and the pork, breaking the mince into small pieces. Stir-fry about 3 minutes, then check several pieces with a clean instant-read thermometer. Continue in 30-second bursts until the pork reaches 71°C (160°F) throughout; browned color alone is not the safety check. Add the garlic and ginger and stir for 30 seconds.",
        "炒鍋以中大火燒熱，加入全部 25 毫升油及豬肉，邊炒邊將肉末分散成小粒。約炒 3 分鐘後，用乾淨的即讀溫度計測幾處；每次續炒 30 秒，直到豬肉各處達 71°C（160°F）。肉色變褐不能代替溫度確認。加入蒜與薑再炒 30 秒。",
        "中強火で中華鍋を熱し、油25ml全量と豚肉を入れ、細かくほぐします。約3分炒めたら、清潔な即読温度計で数か所を測ります。全体が71°C（160°F）に達するまで30秒ずつ追加で炒めます。色だけで安全を判断しません。にんにくとしょうがを加えて30秒炒めます。",
        "웍을 중강불로 달구고 기름 25ml 전량과 돼지고기를 넣어 잘게 풀어 볶습니다. 약 3분 뒤 깨끗한 즉석 온도계로 여러 곳을 잽니다. 돼지고기 전체가 71°C (160°F)에 도달할 때까지 30초씩 더 볶습니다. 갈색이 된 것만으로 안전 여부를 판단하지 않습니다. 마늘과 생강을 넣어 30초 볶습니다.",
        "ตั้งกระทะก้นลึกด้วยไฟกลางค่อนแรง ใส่น้ำมัน 25 มล.ทั้งหมดกับหมู ใช้ตะหลิวยีให้เป็นชิ้นเล็ก ผัดประมาณ 3 นาทีแล้วใช้เทอร์โมมิเตอร์อ่านเร็วที่สะอาดวัดหลายจุด ผัดเพิ่มครั้งละ 30 วินาทีจนหมูทุกส่วนถึง 71°C (160°F) สีที่เป็นน้ำตาลอย่างเดียวใช้ยืนยันความปลอดภัยไม่ได้ ใส่กระเทียมกับขิงและผัด 30 วินาที"
      ),
      ml(
        "Reduce the heat to medium. Add all the doubanjiang and chopped black beans with half the ground peppercorns. Stir for about 45 seconds until the oil turns red and the paste smells fragrant; keep it moving so the fermented beans do not scorch.",
        "轉中火，加入全部豆瓣醬、切碎豆豉及一半花椒粉，翻炒約 45 秒至油色轉紅、醬料散發香氣；持續翻動，避免豆豉炒焦。",
        "中火に落とし、豆板醤と刻んだ豆鼓を全量、粉山椒の半量と加えます。油が赤くなり香りが立つまで約45秒炒め、焦げないよう絶えず混ぜます。",
        "불을 중불로 낮추고 두반장 전량, 다진 발효 검은콩, 간 화자오 절반을 넣습니다. 기름이 붉어지고 향이 날 때까지 약 45초 볶되 발효 콩이 타지 않도록 계속 저어 줍니다.",
        "ลดเป็นไฟกลาง ใส่โต้วป้านเจี้ยงและถั่วดำสับทั้งหมด พร้อมพริกหอมครึ่งหนึ่ง ผัดประมาณ 45 วินาทีจนน้ำมันเป็นสีแดงและเครื่องหอม คนต่อเนื่องไม่ให้ถั่วหมักไหม้"
      ),
      ml(
        "Pour in all 250 ml stock, the 15 ml soy sauce, 15 ml Shaoxing wine, and 3 g sugar. Scrape the wok base and stir until the bean paste dissolves into an even red-brown sauce. Taste before adding anything else; the doubanjiang and soy sauce already supply salt.",
        "倒入全部 250 毫升高湯、15 毫升生抽、15 毫升紹興酒及 3 公克砂糖，刮起鍋底並攪拌，直到豆瓣醬融入均勻的紅褐色醬汁。先試味再決定是否調整；豆瓣醬與生抽本身已有鹹度。",
        "スープ250ml全量、しょうゆ15ml、紹興酒15ml、砂糖3gを加えます。鍋底をこそげ、豆板醤が溶けて均一な赤茶色のソースになるまで混ぜます。塩を足す前に味見します。豆板醤としょうゆに塩分があります。",
        "เติมน้ำสต๊อก 250ml ทั้งหมด ซีอิ๊วขาว 15ml เหล้าเส้าซิง 15ml และน้ำตาล 3g ขูดก้นกระทะแล้วคนจนโต้วป้านเจี้ยงละลายเป็นซอสสีน้ำตาลแดงสม่ำเสมอ ชิมก่อนเติมอย่างอื่น เพราะโต้วป้านเจี้ยงกับซีอิ๊วมีความเค็มอยู่แล้ว",
        "เทน้ำสต๊อก 250 มล.ทั้งหมด ซีอิ๊วขาว 15 มล. เหล้าเส้าซิง 15 มล. และน้ำตาล 3 กรัมลงไป ขูดก้นกระทะและคนจนโต้วป้านเจี้ยงละลายเป็นซอสสีน้ำตาลแดงสม่ำเสมอ ชิมก่อนปรุงเพิ่ม เพราะโต้วป้านเจี้ยงและซีอิ๊วมีความเค็มอยู่แล้ว"
      ),
      ml(
        "Slide in the tofu in one even layer. Bring the sauce back to a gentle simmer and cook uncovered for about 5 minutes, occasionally shaking the wok. Keep bubbles small; hard boiling can break the soft tofu and separate the sauce.",
        "將豆腐輕輕滑入鍋中並鋪成一層，讓醬汁恢復溫和小滾後開蓋煮約 5 分鐘，期間偶爾晃動炒鍋。保持小泡即可；大滾會弄碎嫩豆腐，也可能使醬汁分離。",
        "豆腐を一層にそっと滑り入れます。静かな煮立ちに戻し、ふたをせず約5分煮て、ときどき鍋を揺すります。泡は小さく保ちます。激しく煮ると豆腐が崩れ、ソースも分離しやすくなります。",
        "두부를 한 겹으로 조심히 넣습니다. 소스가 잔잔하게 끓기 시작하면 뚜껑을 열고 약 5분 끓이며 가끔 웍을 흔듭니다. 작은 기포만 유지하세요. 세게 끓이면 부드러운 두부가 부서지고 소스가 분리될 수 있습니다.",
        "ค่อย ๆ เลื่อนเต้าหู้ลงเรียงเป็นชั้นเดียว รอให้ซอสเดือดอ่อน ๆ แล้วเคี่ยวเปิดฝาประมาณ 5 นาที เขย่ากระทะเป็นครั้งคราว ให้มีเพียงฟองเล็ก ๆ การเดือดแรงทำให้เต้าหู้อ่อนแตกและซอสแยกชั้น"
      ),
      ml(
        "Stir the slurry again because the starch settles. Pour in half and simmer for 30 seconds; add the rest in a thin stream, stirring gently, and cook another 30–60 seconds until the sauce lightly coats the tofu. The full measured slurry is for this pan; stop as soon as the sauce is glossy and spoon-coating.",
        "澱粉會沉底，先再次攪勻芡汁。倒入一半煮 30 秒，再將其餘芡汁細細加入並輕輕翻動，續煮 30–60 秒至醬汁薄薄裹住豆腐。這一鍋使用量好的整份芡汁；醬汁呈光澤並能附著湯匙即可停止加熱。",
        "でんぷんが沈むので、水溶き片栗粉をもう一度混ぜます。半量を加えて30秒煮た後、残りを細く加えながらやさしく混ぜ、さらに30〜60秒、豆腐に薄く絡むまで煮ます。この鍋では計量した全量を使い、つやが出てスプーンに薄く付いたら火を止めます。",
        "전분이 가라앉으므로 전분물을 다시 젓습니다. 절반을 넣고 30초 끓인 뒤 나머지를 가늘게 부으며 부드럽게 저어 30–60초 더 끓입니다. 소스가 윤기 나고 두부에 얇게 붙으면 됩니다. 계량한 전분물 전량을 쓰되, 농도가 나면 바로 불을 끕니다.",
        "คนแป้งน้ำอีกครั้งเพราะแป้งตกตะกอน เทครึ่งหนึ่งลงไปเคี่ยว 30 วินาที แล้วค่อย ๆ เติมที่เหลือเป็นสายบางพร้อมคนเบา ๆ เคี่ยวต่อ 30–60 วินาทีจนซอสเคลือบเต้าหู้บาง ๆ ใช้แป้งน้ำที่ตวงไว้ทั้งหมดสำหรับกระทะนี้ และหยุดทันทีเมื่อซอสเงาและเกาะช้อนได้"
      ),
      ml(
        "Turn off the heat. Fold in the remaining peppercorns and all 30 g scallions, then rest for 1 minute. Divide evenly among 3 servings and serve hot. For a less numbing finish, reserve some of the final pepper instead of adding extra salt.",
        "關火，拌入剩餘花椒粉及全部 30 公克青蔥，靜置 1 分鐘。平均分成 3 份趁熱上桌。若想降低麻感，可減少最後加入的花椒，不要以加鹽取代。",
        "火を止め、残りの粉山椒とねぎ30g全量を加えて混ぜ、1分置きます。3人分に均等に分けて熱いうちに出します。しびれを控えたい場合は仕上げの山椒を減らし、塩で置き換えません。",
        "불을 끄고 남은 화자오와 대파 30g 전량을 넣어 섞은 뒤 1분 둡니다. 3인분으로 고르게 나누어 뜨거울 때 냅니다. 얼얼한 맛을 줄이려면 마지막 화자오를 줄이고 소금을 더 넣지 마세요.",
        "ปิดไฟ ใส่พริกหอมที่เหลือและต้นหอม 30 กรัมทั้งหมด คลุกแล้วพัก 1 นาที แบ่งเท่ากัน 3 ที่และเสิร์ฟร้อน หากต้องการลดความชาลิ้น ให้ลดพริกหอมส่วนท้ายแทนการเติมเกลือ"
      )
    ],
    tips: [
      ml("Use a broad wok spatula to lift tofu from underneath; shaking the wok preserves the cubes better than stirring.", "用寬鍋鏟從豆腐底部輕推，並以晃鍋代替翻攪，方塊較不易碎。", "幅広のヘラで豆腐の下から持ち上げ、混ぜる代わりに鍋を揺すると形が保てます。", "넓은 주걱으로 두부 아래를 들어 올리고 젓기보다 웍을 흔들면 모양이 잘 유지됩니다.", "ใช้ตะหลิวกว้างช้อนจากใต้เต้าหู้ และเขย่ากระทะแทนการคนเพื่อให้เต้าหู้คงรูป"),
      ml("Taste after the stock is added: doubanjiang and soy sauce vary in saltiness, while the measured sugar only rounds the sauce.", "加入高湯後再試味；豆瓣醬與生抽鹹度不一，砂糖只用來平衡醬味。", "スープを加えてから味見します。豆板醤としょうゆの塩分は製品で異なり、砂糖は味を整える量です。", "육수를 넣은 뒤 간을 보세요. 두반장과 간장은 제품마다 염도가 다르고, 설탕은 맛의 균형을 맞춥니다.", "ชิมหลังเติมน้ำสต๊อก เพราะความเค็มของโต้วป้านเจี้ยงและซีอิ๊วต่างกัน น้ำตาลที่ตวงไว้ช่วยปรับรสให้กลมกล่อม")
    ],
    mistakes: [
      ml("If the sauce separates or the tofu crumbles, the simmer was too vigorous; lower the heat and shake the wok instead of stirring.", "若醬汁分離或豆腐碎裂，表示火候太猛；轉小火並晃鍋，不要繼續翻攪。", "ソースが分離したり豆腐が崩れたりしたら、煮立ちが強すぎます。弱火にし、混ぜずに鍋を揺すります。", "소스가 분리되거나 두부가 부서지면 너무 세게 끓인 것입니다. 불을 낮추고 젓지 말고 웍을 흔드세요.", "หากซอสแยกชั้นหรือเต้าหู้แตก แสดงว่าเดือดแรงเกินไป ลดไฟและเขย่ากระทะแทนการคน"),
      ml("If the sauce turns gluey, too much slurry was added before it dispersed; whisk a splash of hot water into the pan and fold gently.", "若醬汁變得黏稠如膠，代表芡汁尚未散開就加得太多；加少量熱水並輕柔拌開。", "ソースがのり状に重くなったら、とろみ粉が広がる前に濃くなっています。熱湯を少量加えてやさしく混ぜます。", "소스가 풀처럼 되직해지면 전분물이 고르게 퍼지기 전에 너무 걸쭉해진 것입니다. 뜨거운 물을 조금 넣고 부드럽게 섞으세요.", "หากซอสเหนียวเป็นกาว แป้งข้นก่อนกระจายทั่ว ให้เติมน้ำร้อนเล็กน้อยแล้วคลุกเบา ๆ")
    ],
    storage: ml(
      "Refrigerate leftovers in a shallow covered container within 2 hours, at 4°C/40°F or colder, and use within 3 days. Reheat only the portion needed until steaming hot throughout (74°C/165°F); warming gently with a splash of stock helps keep the tofu tender.",
      "剩菜放入淺的加蓋容器，2 小時內冷藏於 4°C／40°F 以下，並於 3 天內食用。每次只取所需份量，復熱至全份冒熱氣且達 74°C／165°F；加少量高湯溫和加熱可保持豆腐柔嫩。",
      "残りは浅いふた付き容器に入れ、2時間以内に4°C/40°F以下で冷蔵し、3日以内に食べます。必要な分だけ、全体から湯気が立ち74°C/165°Fに達するまで再加熱します。スープを少量足して弱火で温めると豆腐が柔らかく保てます。",
      "남은 음식은 얕은 뚜껑 용기에 담아 2시간 안에 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 필요한 양만 덜어 전체에서 김이 나고 74°C/165°F에 도달할 때까지 재가열합니다. 육수를 조금 더해 약불로 데우면 두부가 부드럽습니다.",
      "เก็บของเหลือในภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วัน อุ่นเฉพาะส่วนที่จะกินจนร้อนมีไอทั่วถึงและถึง 74°C/165°F เติมน้ำสต๊อกเล็กน้อยและอุ่นไฟอ่อนช่วยให้เต้าหู้นุ่ม"
    ),
    safetySources: [["safe minimum temperatures and reheating", foodTemps], ["refrigeration and safe handling", handling]]
  });
}

function reviseMasalaDosa(recipe) {
  reviseRecipe(recipe, {
    id: "masala-dosa",
    prepMinutes: 1130,
    cookMinutes: 65,
    titles: [
      ml("Rinse and soak rice, dal, and poha", "沖洗並浸泡米、豆與 poha", "米、豆、ポハを洗って浸す", "쌀·달·포하 씻어 불리기", "ล้างและแช่ข้าว ถั่ว และโพฮา"),
      ml("Grind the urad dal until airy", "將 urad dal 磨至輕盈細滑", "ウラドダルを軽くなめらかに挽く", "우라드달을 가볍고 곱게 갈기", "โม่อูรัดดาลให้เนียนเบา"),
      ml("Grind the rice and combine the batter", "磨米並混合麵糊", "米を挽いて生地を合わせる", "쌀을 갈아 반죽 합치기", "โม่ข้าวและผสมแป้ง"),
      ml("Ferment until doubled and bubbly", "發酵至約兩倍並出現氣泡", "約2倍に膨らみ泡立つまで発酵", "두 배로 부풀고 거품이 생길 때까지 발효", "หมักจนขึ้นเป็นสองเท่าและมีฟอง"),
      ml("Boil and break the potatoes", "煮熟並掰開馬鈴薯", "じゃがいもをゆでて粗く割る", "감자를 삶아 굵게 으깨기", "ต้มและบิมันฝรั่ง"),
      ml("Temper the potato filling", "爆香馬鈴薯餡的辛香料", "じゃがいもの具にスパイスを加熱する", "감자 속재료 향내기", "ผัดเครื่องเทศสำหรับไส้มันฝรั่ง"),
      ml("Finish the potato masala", "完成馬鈴薯 masala", "じゃがいもマサラを仕上げる", "감자 마살라 완성하기", "ทำไส้มาซาลามันให้เสร็จ"),
      ml("Heat the tawa and spread a dosa", "燒熱 tawa 並攤開 dosa", "タワを熱してドーサを広げる", "타와를 달구고 도사 펴기", "อุ่นทาวาและเกลี่ยโดซา"),
      ml("Cook through, fill, and fold", "煎熟、包餡並折起", "火を通し、具をのせて折る", "속까지 익혀 채우고 접기", "จี่ให้สุก ใส่ไส้ และพับ")
    ],
    bodies: [
      ml(
        "Rinse the 450 g rice until the water is nearly clear. Rinse the 150 g urad dal and 3 g fenugreek seeds separately. Soak rice in fresh potable water for 5–6 hours and dal with fenugreek for 4 hours, both covered in the refrigerator at 4°C/40°F or colder. Soak the 35 g poha separately for only the final 20 minutes; drain all soaking water before grinding. The soaking water is not part of the measured 700–850 ml grinding water.",
        "將 450 公克米沖洗至水大致清澈；另將 150 公克 urad dal 與 3 公克葫蘆巴籽沖洗。米用乾淨飲用水浸泡 5–6 小時，dal 與葫蘆巴籽浸泡 4 小時，容器加蓋並置於 4°C／40°F 以下冰箱。35 公克 poha 另浸最後 20 分鐘。研磨前倒掉所有浸泡水；浸泡水不計入量好的 700–850 毫升研磨用水。",
        "米450gは水がほぼ透明になるまで洗います。ウラドダル150gとフェヌグリーク3gも別々に洗います。米は飲用に適した水に5〜6時間、ダルとフェヌグリークは4時間浸し、どちらも覆って4°C/40°F以下で冷蔵します。ポハ35gは最後の20分だけ別に浸します。挽く前に浸し水を捨てます。浸し水は計量した挽き水700〜850mlに含まれません。",
        "쌀 450g은 물이 거의 맑아질 때까지 씻습니다. 우라드달 150g과 페누그릭씨 3g도 따로 씻습니다. 쌀은 깨끗한 음용수에 5–6시간, 달과 페누그릭은 4시간 불리며, 모두 덮어서 4°C/40°F 이하 냉장고에 둡니다. 포하 35g은 마지막 20분만 따로 불립니다. 갈기 전에 불린 물은 모두 버립니다. 불림 물은 계량한 분쇄용 물 700–850ml에 포함되지 않습니다.",
        "ล้างข้าว 450 กรัมจนเกือบได้น้ำใส ล้างอูรัดดาล 150 กรัมกับเมล็ดเมธี 3 กรัมแยกกัน แช่ข้าวในน้ำสะอาดดื่มได้ 5–6 ชั่วโมง และแช่ดาลกับเมธี 4 ชั่วโมง โดยปิดฝาแช่เย็นที่ 4°C/40°F หรือต่ำกว่า แช่โพฮา 35 กรัมแยกต่างหากเฉพาะ 20 นาทีสุดท้าย เทน้ำแช่ทิ้งก่อนโม่ น้ำแช่ไม่นับรวมในน้ำโม่ที่ตวงไว้ 700–850 มล."
      ),
      ml(
        "Drain the dal and fenugreek. Grind with 250–300 ml from the measured water, adding it gradually, for about 5–7 minutes until very smooth, pale, and aerated. A spoonful should fall in a soft ribbon without gritty bits. Scrape down the blender once if needed; do not let the motor heat the batter.",
        "瀝乾 dal 與葫蘆巴籽。從量好的水中取 250–300 毫升分次加入，研磨約 5–7 分鐘，直到顏色變淡、細滑且帶空氣感。舀起一匙應柔順成帶，不可有砂粒。必要時刮下攪拌杯壁一次，避免攪拌機過熱使麵糊升溫。",
        "ダルとフェヌグリークの水を切ります。計量した水から250〜300mlを少しずつ加え、約5〜7分、白っぽく非常になめらかで空気を含むまで挽きます。スプーンから柔らかな帯状に落ち、ざらつきがないのが目安です。必要なら一度ブレンダーの側面をこそげ、モーターで生地が温まらないようにします。",
        "달과 페누그릭의 물을 뺍니다. 계량한 물 중 250–300ml를 조금씩 넣어 약 5–7분 곱고 밝은 색이며 공기가 든 질감이 될 때까지 갑니다. 한 숟가락 뜨면 부드러운 띠처럼 흘러내리고 거친 알갱이가 없어야 합니다. 필요하면 블렌더 벽을 한 번 긁어 내리고 모터 열로 반죽이 따뜻해지지 않게 합니다.",
        "สะเด็ดน้ำจากดาลกับเมธี ใช้น้ำที่ตวงไว้ 250–300 มล. เติมทีละน้อย แล้วโม่ประมาณ 5–7 นาทีจนเนียนมาก สีอ่อนและมีอากาศ ช้อนขึ้นแล้วควรไหลเป็นสายริบบิ้นนุ่ม ๆ ไม่มีเม็ดสาก ขูดข้างโถหนึ่งครั้งหากจำเป็น อย่าให้ความร้อนจากมอเตอร์ทำให้แป้งอุ่น"
      ),
      ml(
        "Drain the rice and poha. Grind them with the remaining 450–550 ml measured water until smooth with only a faint fine-grain feel. Fold this into the urad batter with 8 g of the salt until uniform and pourable in a thick ribbon. Reserve the remaining 6 g salt for the potato filling; the listed grinding-water total is 700–850 ml.",
        "瀝乾米與 poha，以量好的其餘 450–550 毫升水研磨至滑順，只留極細微的顆粒感。將米糊與 urad 糊拌合，加入 8 公克鹽攪勻；麵糊應能以濃稠帶狀流下。剩餘 6 公克鹽留給馬鈴薯餡；研磨用水總量為 700–850 毫升。",
        "米とポハの水を切ります。残りの計量水450〜550mlで、わずかな細かい粒感だけが残るなめらかさに挽きます。ウラド生地と合わせ、塩8gを加えて均一に混ぜます。生地は濃い帯状に流れる状態にします。残りの塩6gはじゃがいもの具用に残します。挽き水の合計は700〜850mlです。",
        "쌀과 포하의 물을 뺍니다. 계량한 나머지 물 450–550ml와 갈아 아주 고우면서 미세한 알갱이 감만 남게 합니다. 우라드 반죽에 넣고 소금 8g을 더해 고르게 섞습니다. 반죽은 굵은 리본처럼 흘러야 합니다. 남은 소금 6g은 감자 속재료용으로 둡니다. 계량한 분쇄용 물은 총 700–850ml입니다.",
        "สะเด็ดน้ำจากข้าวกับโพฮา ใช้น้ำที่ตวงส่วนที่เหลือ 450–550 มล.โม่จนเนียน เหลือสัมผัสเม็ดละเอียดเพียงเล็กน้อย ผสมกับแป้งอูรัด เติมเกลือ 8 กรัมและคนให้เข้ากัน แป้งควรไหลเป็นสายหนืด เกลือที่เหลือ 6 กรัมเก็บไว้สำหรับไส้มัน น้ำโม่ที่ตวงรวม 700–850 มล."
      ),
      ml(
        "Transfer the batter to a clean, sanitized container that holds at least three times its volume, and cover loosely so gas can escape. Ferment near 30°C for about 12–14 hours until roughly doubled and visibly bubbly. The time and rise are fermentation cues, not a substitute for clean equipment or proper cooking. Refrigerate promptly at 4°C/40°F or colder once it is ready if you are not cooking immediately.",
        "將麵糊倒入乾淨並消毒過、容量至少為麵糊三倍的容器，鬆鬆加蓋讓氣體逸出。約在 30°C 發酵 12–14 小時，直到體積約增至兩倍且可見氣泡。時間與膨脹是發酵進度線索，不能取代器具清潔或充分加熱。不立即煎時，發酵完成就盡快加蓋冷藏於 4°C／40°F 以下。",
        "清潔・消毒した、生地量の3倍以上入る容器に移し、ガスが抜けるようふんわり覆います。30°C前後で約12〜14時間、体積がほぼ2倍になり目に見える泡が出るまで発酵させます。時間や膨らみは発酵の目安であり、器具の衛生や十分な加熱の代わりにはなりません。すぐ焼かない場合は、でき上がったら速やかに4°C/40°F以下で冷蔵します。",
        "깨끗이 세척·살균한, 반죽 부피의 최소 세 배 용량 용기에 옮기고 가스가 빠지도록 느슨하게 덮습니다. 30°C 안팎에서 약 12–14시간 발효해 부피가 거의 두 배가 되고 눈에 보이는 기포가 생기게 합니다. 시간과 부풀기는 발효 진행의 신호일 뿐, 도구 위생이나 충분한 가열을 대신하지 않습니다. 바로 굽지 않으면 발효가 끝난 즉시 4°C/40°F 이하로 냉장합니다.",
        "เทแป้งลงภาชนะที่ล้างและฆ่าเชื้อแล้ว ซึ่งจุได้อย่างน้อยสามเท่าของปริมาตรแป้ง ปิดฝาหลวม ๆ ให้ก๊าซระบาย หมักใกล้ 30°C ประมาณ 12–14 ชั่วโมงจนปริมาตรเกือบสองเท่าและเห็นฟองชัด เวลาและการขึ้นฟูเป็นเพียงสัญญาณการหมัก ไม่ทดแทนการทำความสะอาดอุปกรณ์หรือการปรุงให้สุก หากยังไม่ทอดทันที ให้ปิดฝาและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าทันทีเมื่อได้ที่"
      ),
      ml(
        "While the batter ferments, cover the 900 g whole potatoes with water in a saucepan. Bring to a boil and simmer 20–25 minutes, until a skewer reaches the centre with slight resistance. Drain, cool only until safe to handle, peel, and break into irregular 2–3 cm pieces; keep the chunks intact rather than mashing them smooth.",
        "麵糊發酵時，將 900 公克整顆馬鈴薯放入鍋中，加水蓋過。煮滾後小火煮 20–25 分鐘，直到竹籤可插至中心且略有阻力。瀝乾並放至可安全拿取，去皮後掰成不規則 2–3 公分塊，保留顆粒，不要壓成泥。",
        "生地の発酵中に、じゃがいも900gを鍋に入れ、かぶるまで水を注ぎます。沸騰後20〜25分ゆで、串が中心まで少し抵抗を残して通る状態にします。湯を切り、触れる程度まで冷まして皮をむき、不揃いな2〜3cmに割ります。なめらかにつぶさず形を残します。",
        "반죽이 발효되는 동안 감자 900g을 냄비에 넣고 잠길 만큼 물을 붓습니다. 끓으면 약불로 20–25분 삶아 꼬치가 중심까지 약간 저항을 느끼며 들어갈 때까지 익힙니다. 물을 빼고 다룰 수 있을 만큼 식힌 뒤 껍질을 벗겨 불규칙한 2–3cm 조각으로 쪼갭니다. 매끈한 으깬 감자처럼 만들지 않습니다.",
        "ระหว่างหมักแป้ง ใส่มันฝรั่งทั้ง 900 กรัมลงหม้อ เติมน้ำให้ท่วม ต้มจนเดือดแล้วลดเคี่ยว 20–25 นาที จนไม้เสียบเข้าใจกลางได้แต่ยังต้านเล็กน้อย สะเด็ดน้ำและพักจนจับได้อย่างปลอดภัย ปอกเปลือกแล้วบิเป็นชิ้นไม่สม่ำเสมอ 2–3 ซม. อย่าบดจนเนียน"
      ),
      ml(
        "Heat all 30 ml filling oil over medium heat in a wide pan. Add the 4 g mustard seeds and 2 g tempering urad dal; when the mustard pops and the dal turns pale gold, add all 15 curry leaves carefully, followed by the 250 g sliced onion, 15 g ginger, and 2 slit chiles. Cook 7–9 minutes, stirring, until the onion is soft and translucent but not browned.",
        "寬鍋以中火加熱全部 30 毫升餡料用油，加入 4 公克芥末籽及 2 公克爆香用 urad dal；芥末籽開始爆、dal 呈淡金色時，小心加入全部 15 片咖哩葉，再加入 250 公克洋蔥、15 公克薑及 2 根劃開的青辣椒。翻炒 7–9 分鐘至洋蔥柔軟透明但未上色。",
        "広いフライパンで具用油30ml全量を中火で熱します。マスタードシード4gとテンパリング用ウラドダル2gを加え、種がはじけダルが薄い黄金色になったら、カレーリーフ15枚全量を注意して加えます。玉ねぎ250g、しょうが15g、切れ目を入れた青唐辛子2本を加え、玉ねぎが柔らかく透き通るまで7〜9分炒め、色づかせません。",
        "넓은 팬에 속재료용 기름 30ml 전량을 중불로 달굽니다. 겨자씨 4g과 향내기용 우라드달 2g을 넣고 겨자씨가 튀고 달이 옅은 금색이 되면 카레잎 15장 전량을 조심히 넣습니다. 이어 얇게 썬 양파 250g, 생강 15g, 갈라 둔 풋고추 2개를 넣고 7–9분 볶아 양파가 부드럽고 투명해지되 갈색이 되지 않게 합니다.",
        "ตั้งกระทะกว้างด้วยไฟกลาง ใส่น้ำมันสำหรับไส้ 30 มล.ทั้งหมด ใส่เมล็ดมัสตาร์ดดำ 4 กรัมกับอูรัดดาลสำหรับผัด 2 กรัม เมื่อเมล็ดมัสตาร์ดแตกและดาลเป็นสีทองอ่อน ใส่ใบแกง 15 ใบทั้งหมดอย่างระวัง ตามด้วยหอมใหญ่ซอย 250 กรัม ขิง 15 กรัม และพริกเขียวกรีด 2 เม็ด ผัด 7–9 นาทีจนหอมนุ่มใสแต่ไม่เป็นสีน้ำตาล"
      ),
      ml(
        "Stir in all 3 g turmeric, the potato pieces, the remaining 6 g salt, and the listed 60 ml water for the filling. Cover and cook 5 minutes, folding once halfway; uncover and cook 2 minutes so the water evaporates. The finished masala should be moist and cohesive, not soupy. Keep warm while the tawa heats.",
        "加入全部 3 公克薑黃、馬鈴薯塊、剩餘 6 公克鹽及餡料用 60 毫升水。加蓋煮 5 分鐘，中途輕輕翻拌一次；開蓋再煮 2 分鐘讓水分蒸發。完成的 masala 應濕潤成團但不水汪汪，保溫備用。",
        "ターメリック3g全量、じゃがいも、残りの塩6g、具用の水60mlを加えます。ふたをして5分加熱し、途中で一度やさしく返します。ふたを外してさらに2分、水分を飛ばします。仕上がりはしっとりまとまり、汁気がありません。タワを熱する間、温かく保ちます。",
        "강황 3g 전량, 감자 조각, 남은 소금 6g, 속재료용 물 60ml를 넣습니다. 뚜껑을 덮어 5분 익히며 중간에 한 번 부드럽게 뒤집습니다. 뚜껑을 열고 2분 더 익혀 물기를 날립니다. 완성된 마살라는 촉촉하고 뭉치되 국물이 없어야 합니다. 타와를 달구는 동안 따뜻하게 둡니다.",
        "ใส่ขมิ้น 3 กรัมทั้งหมด ชิ้นมัน เกลือที่เหลือ 6 กรัม และน้ำสำหรับไส้ 60 มล. ปิดฝาปรุง 5 นาที พลิกเบา ๆ หนึ่งครั้งกลางทาง เปิดฝาและปรุงต่อ 2 นาทีให้น้ำระเหย มาซาลาที่เสร็จควรชุ่มและจับตัว ไม่แฉะมีน้ำ พักให้อุ่นระหว่างอุ่นทาวา"
      ),
      ml(
        "Heat a seasoned 28 cm tawa over medium heat. If a drop of water skitters and evaporates immediately, cool the surface briefly with a damp cloth before the first dosa. Stir the fermented batter gently. Ladle about 160–170 ml onto the centre and spiral outward into a thin 24–26 cm circle; a quick even spread is more important than a perfect edge.",
        "28 公分 tawa 以中火燒熱。若水滴一落就迅速滑動蒸發，第一張前用濕布短暫降溫。輕柔攪拌發酵麵糊，舀約 160–170 毫升到中央，從內向外旋轉攤成 24–26 公分薄圓；均勻迅速比邊緣完美更重要。",
        "よくなじませた28cmのタワを中火で熱します。水滴がすぐ踊って蒸発するほど熱ければ、最初の一枚の前に濡れ布巾で少し冷まします。発酵生地をやさしく混ぜ、約160〜170mlを中央に落とし、外側へ渦巻き状に広げて直径24〜26cmの薄い円にします。縁より素早く均一に広げることを優先します。",
        "길들인 28cm 타와를 중불로 달굽니다. 물방울이 닿자마자 튀며 사라질 정도로 뜨거우면 첫 장 전에 젖은 천으로 잠시 식힙니다. 발효 반죽을 부드럽게 저어 약 160–170ml를 가운데 붓고 바깥쪽으로 나선형으로 펴 24–26cm의 얇은 원을 만듭니다. 가장자리 모양보다 빠르고 고르게 펴는 것이 중요합니다.",
        "อุ่นทาวาที่ปรุงผิวแล้วขนาด 28 ซม.ด้วยไฟกลาง หากหยดน้ำกลิ้งและระเหยทันที ให้ใช้ผ้าชุบน้ำหมาดแตะลดความร้อนก่อนแผ่นแรก คนแป้งหมักเบา ๆ ตักประมาณ 160–170 มล.ลงกลางกระทะ แล้ววนเป็นเกลียวออกด้านนอกให้เป็นวงบางขนาด 24–26 ซม. เกลี่ยให้เร็วและสม่ำเสมอสำคัญกว่าขอบที่สมบูรณ์แบบ"
      ),
      ml(
        "Drizzle 8–10 ml of the 80 ml dosa oil or ghee around the edge and across the surface. Cook 2–3 minutes until the underside is evenly golden, the top is dry rather than wet, and the dosa releases. Flip for 30 seconds, then add about one-eighth of the potato masala (roughly 110 g), fold, and check that the centre is fully hot; for a temperature check, a folded centre should reach 74°C/165°F for 15 seconds. Make 8 dosas and serve at once with sambar or chutney.",
        "將 80 毫升煎 dosa 用油或酥油每張分用 8–10 毫升，淋在邊緣及表面。煎 2–3 分鐘至底面均勻金黃、表面不再濕亮且能輕易鏟起。翻面再煎 30 秒，加入約八分之一馬鈴薯餡（約 110 公克）後折起，確認中心熱透；若以溫度計檢查，折疊中心須達 74°C／165°F 並維持 15 秒。共做 8 張，立即搭配 sambar 或 chutney 上桌。",
        "ドーサ用の油またはギー80mlから一枚につき8〜10mlを縁と表面に回しかけます。2〜3分、裏が均一に黄金色になり、表面の湿り気が消えてはがれるまで焼きます。裏返して30秒焼き、じゃがいもマサラ約8分の1（約110g）をのせて折ります。中心まで熱いことを確認し、温度を測る場合は折った中心を74°C/165°Fで15秒保ちます。8枚作り、サンバルやチャツネとすぐに出します。",
        "도사용 기름 또는 기 80ml 중 한 장에 8–10ml를 가장자리와 표면에 두릅니다. 밑면이 고르게 금빛이 되고 윗면의 젖은 광택이 사라져 잘 떨어질 때까지 2–3분 굽습니다. 뒤집어 30초 익힌 뒤 감자 마살라 약 8분의 1(약 110g)을 넣고 접습니다. 속까지 뜨거운지 확인하고 온도를 잴 때는 접힌 가운데가 74°C/165°F에서 15초 유지되어야 합니다. 8장을 만들어 삼바르나 처트니와 즉시 냅니다.",
        "หยดน้ำมันหรือกีสำหรับโดซาจากทั้งหมด 80 มล.แผ่นละ 8–10 มล.รอบขอบและบนผิว จี่ 2–3 นาทีจนด้านล่างเป็นสีทองทั่ว ผิวบนไม่เปียก และแซะออกได้ พลิกจี่อีก 30 วินาที ใส่มาซาลามันประมาณหนึ่งในแปด (ราว 110 กรัม) แล้วพับ ตรวจให้ตรงกลางร้อนทั่ว หากวัดอุณหภูมิ ส่วนกลางที่พับต้องถึง 74°C/165°F นาน 15 วินาที ทำ 8 แผ่นและเสิร์ฟทันทีพร้อมซัมบาร์หรือชัทนีย์"
      )
    ],
    additionalIngredients: [{ amount: "60 ml", item: ml("water for the potato filling", "馬鈴薯餡用水", "じゃがいもの具用の水", "감자 속재료용 물", "น้ำสำหรับไส้มันฝรั่ง") }],
    tips: [
      ml("Judge fermentation by the expected 12–14 hour process near 30°C and the roughly doubled, bubbly batter; chill promptly when it is ready if you are not cooking it.", "以約 30°C 的 12–14 小時發酵流程，以及麵糊約兩倍、可見氣泡作為進度線索；若不立即煎，完成後盡快冷藏。", "30°C前後での12〜14時間を目安にし、生地がほぼ2倍になって泡立ったら発酵の進み具合を確認します。すぐ焼かない場合は速やかに冷蔵します。", "30°C 안팎에서 12–14시간 발효를 기준으로 삼고 반죽이 거의 두 배로 부풀며 거품이 생기는지 봅니다. 바로 굽지 않으면 완성 즉시 냉장하세요.", "ใช้กระบวนการหมักราว 12–14 ชั่วโมงใกล้ 30°C และดูว่าแป้งขึ้นเกือบสองเท่าพร้อมฟองหรือไม่ หากยังไม่ทอดให้แช่เย็นทันทีเมื่อได้ที่"),
      ml("Let the griddle cool briefly between dosas if batter sets before it can spiral outward; spread each dosa in one quick, light pass.", "若麵糊尚未攤開就凝固，表示煎盤太熱；每張之間稍降溫，並以快速輕推攤開。", "広げる前に生地が固まるなら鉄板が熱すぎます。一枚ごとに少し冷まし、軽く素早く一周で広げます。", "반죽을 펴기 전에 굳으면 팬이 너무 뜨거운 것입니다. 한 장마다 잠시 식히고 빠르고 가볍게 한 번에 펴세요.", "หากแป้งเซ็ตก่อนเกลี่ย แสดงว่ากระทะร้อนเกินไป ลดความร้อนเล็กน้อยระหว่างแผ่น แล้วเกลี่ยเบา ๆ อย่างรวดเร็วในรอบเดียว")
    ],
    mistakes: [
      ml("If batter is gritty, the rice was not ground long enough; return it to the grinder with a little of the measured grinding water, not extra water.", "若麵糊有砂粒感，代表米磨得不夠；加少量已量好的研磨用水再磨，不要另加水。", "生地がざらつく場合は米の挽き不足です。追加水ではなく、計量済みの挽き水を少量加えて再度挽きます。", "반죽이 거칠면 쌀을 충분히 갈지 않은 것입니다. 물을 더 붓지 말고 계량한 분쇄용 물을 조금 넣어 다시 갑니다.", "หากแป้งสาก แสดงว่าโม่ข้าวไม่นานพอ ให้นำกลับไปโม่พร้อมน้ำโม่ที่ตวงไว้เล็กน้อย อย่าเติมน้ำใหม่"),
      ml("If dosa tears while spreading, let the batter warm slightly and spread a little less thin; if it sticks, the tawa may need better seasoning or a few more seconds of cooking.", "若攤開時破裂，讓麵糊稍微回溫並不要攤得太薄；若黏鍋，可能是 tawa 養鍋不足或尚未多煎幾秒。", "広げると破れる場合は生地を少し室温に戻し、薄くしすぎないようにします。くっつく場合はタワの油なじみが足りないか、焼き時間を数秒延ばします。", "펴는 중 찢어지면 반죽을 잠시 실온에 두고 너무 얇게 펴지 마세요. 붙으면 타와 길들이기가 부족하거나 몇 초 더 익혀야 합니다.", "หากแป้งฉีกตอนเกลี่ย ให้พักแป้งให้อุ่นขึ้นเล็กน้อยและเกลี่ยไม่ให้บางเกิน หากติดกระทะ อาจเพราะทาวายังไม่ปรุงผิวดีหรือควรจี่เพิ่มอีกไม่กี่วินาที")
    ],
    storage: ml(
      "After fermentation, batter not used within 24 hours should be covered and refrigerated at 4°C/40°F or colder; cook it within 5 days. Keep cooked potato masala and leftover dosa refrigerated within 2 hours and use within 48 hours. Reheat dosa to 74°C/165°F for 15 seconds; refrigerate batter promptly rather than leaving it warm after fermentation.",
      "發酵後 24 小時內未使用的麵糊應加蓋冷藏於 4°C／40°F 以下，並於 5 天內煎熟。馬鈴薯餡與剩餘 dosa 在 2 小時內冷藏，48 小時內食用。復熱 dosa 至 74°C／165°F 並維持 15 秒；發酵完成後應盡快冷藏，不要繼續放在溫暖處。",
      "発酵後24時間以内に使わない生地は覆って4°C/40°F以下で冷蔵し、5日以内に焼きます。じゃがいもの具と残ったドーサは2時間以内に冷蔵し、48時間以内に食べます。ドーサは74°C/165°Fで15秒再加熱します。発酵後も温かい場所に置かず、速やかに冷蔵します。",
      "발효 후 24시간 안에 쓰지 않을 반죽은 덮어 4°C/40°F 이하로 냉장하고 5일 안에 부칩니다. 감자 속재료와 남은 도사는 2시간 안에 냉장하고 48시간 안에 먹습니다. 도사는 74°C/165°F에서 15초 재가열합니다. 발효 후 따뜻한 곳에 두지 말고 바로 냉장하세요.",
      "หลังหมัก หากไม่ใช้แป้งภายใน 24 ชั่วโมง ให้ปิดฝาแช่เย็นที่ 4°C/40°F หรือต่ำกว่า และนำไปทอดภายใน 5 วัน เก็บไส้มันฝรั่งและโดซาที่เหลือในตู้เย็นภายใน 2 ชั่วโมงและกินภายใน 48 ชั่วโมง อุ่นโดซาให้ถึง 74°C/165°F นาน 15 วินาที หลังหมักแล้วอย่าวางไว้ในที่อุ่น ให้นำเข้าตู้เย็นทันที"
    ),
    safetySources: [["Dosa and idli fermentation, soaking, refrigeration, and cooking controls", dosaSafety], ["safe cooling and leftover storage", leftovers]]
  });
}

function reviseNanaimoBars(recipe) {
  reviseRecipe(recipe, {
    id: "nanaimo-bars",
    prepMinutes: 150,
    cookMinutes: 15,
    titles: [
      ml("Line the pan and set up a bain-marie", "鋪好烤盤並準備隔水加熱", "型を敷き、湯せんを準備する", "틀을 깔고 중탕 준비하기", "กรุพิมพ์และเตรียมหม้อตุ๋น"),
      ml("Cook the cocoa and egg base", "煮熟可可蛋糊", "ココアと卵のベースに火を通す", "코코아와 달걀 베이스 익히기", "กวนฐานโกโก้กับไข่ให้สุก"),
      ml("Press and chill the crumb base", "壓實並冷藏餅乾底", "クラムの土台を押して冷やす", "크럼 바닥을 눌러 냉장하기", "กดฐานบิสกิตและแช่เย็น"),
      ml("Beat the custard filling", "打勻奶黃內層", "カスタードフィリングを混ぜる", "커스터드 필링 섞기", "ตีไส้คัสตาร์ด"),
      ml("Spread and firm the filling", "抹平並冷藏內層", "フィリングを広げて固める", "필링 펴고 굳히기", "ปาดและทำให้ไส้เซ็ต"),
      ml("Melt and spread the chocolate top", "融化並抹上巧克力頂層", "チョコレートを溶かして広げる", "초콜릿을 녹여 윗면에 펴기", "ละลายและปาดช็อกโกแลตหน้า"),
      ml("Chill, score, and cut 16 bars", "冷藏、刻痕並切成 16 塊", "冷やし、筋を入れて16個に切る", "냉장해 칼집 내고 16개로 자르기", "แช่เย็น กรีด และตัด 16 ชิ้น")
    ],
    bodies: [
      ml(
        "Line a 20 cm square pan with parchment, leaving two overhanging handles. Set a heatproof bowl over a saucepan with 2–3 cm of barely simmering water; the bowl must not touch the water. Measure the 60 g base butter separately from the other 60 g filling butter and 25 g topping butter.",
        "用烘焙紙鋪好 20 公分方模，兩側留出紙把手。鍋中放 2–3 公分微滾的水，上架耐熱碗，碗底不可碰水。將底層用 60 公克奶油，與內層另用的 60 公克及頂層用的 25 公克奶油分開量好。",
        "20cm角型にオーブンシートを敷き、両側に持ち手を残します。鍋に2〜3cmの静かな湯を沸かし、耐熱ボウルを重ねます。ボウルは湯に触れないようにします。ベース用バター60g、フィリング用60g、上掛け用25gを分けて計量します。",
        "20cm 정사각 팬에 유산지를 깔고 양쪽으로 들어 올릴 여분을 남깁니다. 냄비에 2–3cm의 약한 끓는 물을 넣고 내열 볼을 올리되 볼이 물에 닿지 않게 합니다. 바닥용 버터 60g, 필링용 60g, 토핑용 25g을 각각 따로 계량합니다.",
        "กรุกระดาษรองอบในพิมพ์สี่เหลี่ยม 20 ซม. โดยเหลือชายสองด้านไว้ยก วางชามทนความร้อนเหนือหม้อที่มีน้ำเดือดอ่อน ๆ สูง 2–3 ซม. ก้นชามต้องไม่สัมผัสน้ำ แยกตวงเนยสำหรับฐาน 60 กรัม ออกจากเนยสำหรับไส้ 60 กรัมและหน้า 25 กรัม"
      ),
      ml(
        "Melt the 60 g base butter with all 50 g sugar, 25 g cocoa, and 1 g salt over the bain-marie. Whisk the beaten egg in slowly and continuously, scraping the bowl, until the mixture thickens and a clean thermometer reads 71°C (160°F), usually about 5–8 minutes. Keep the water at a bare simmer so the egg does not scramble; do not serve this mixture uncooked.",
        "以隔水加熱融化底層用 60 公克奶油，加入全部 50 公克砂糖、25 公克可可粉及 1 公克鹽。緩緩加入打散的雞蛋並持續攪拌、刮拌碗底，通常約 5–8 分鐘，直到混合物變稠且乾淨溫度計讀值達 71°C（160°F）。水保持微滾以免蛋炒熟結塊；不可食用未煮熟的混合物。",
        "湯せんでベース用バター60g、砂糖50g全量、ココア25g、塩1gを溶かします。溶き卵をゆっくり加え、ボウルの底をこそげながら絶えず混ぜます。通常約5〜8分、濃くなり清潔な温度計で71°C（160°F）に達するまで加熱します。卵が固まらないよう湯は静かに保ち、生のまま食べません。",
        "중탕으로 바닥용 버터 60g, 설탕 50g 전량, 코코아 25g, 소금 1g을 녹입니다. 풀어 둔 달걀을 천천히 넣으며 볼 바닥을 긁고 계속 저어 보통 약 5–8분 동안 농도가 생기고 깨끗한 온도계로 71°C (160°F)에 도달할 때까지 익힙니다. 달걀이 익어 뭉치지 않도록 물은 약하게 끓이고, 익히지 않은 혼합물은 먹지 않습니다.",
        "ละลายเนยฐาน 60 กรัมกับน้ำตาล 50 กรัมทั้งหมด โกโก้ 25 กรัม และเกลือ 1 กรัมบนหม้อตุ๋น ค่อย ๆ ใส่ไข่ที่ตีไว้พร้อมคนตลอดและขูดก้นชาม ใช้เวลาประมาณ 5–8 นาทีจนส่วนผสมข้นและเทอร์โมมิเตอร์สะอาดอ่านได้ 71°C (160°F) คุมน้ำให้เดือดอ่อนเพื่อไม่ให้ไข่จับตัวเป็นลิ่ม ห้ามเสิร์ฟส่วนผสมนี้ทั้งที่ยังไม่สุก"
      ),
      ml(
        "Take the bowl off the heat. Fold in all 180 g graham crumbs, 70 g coconut, and 50 g walnuts until no dry pockets remain. Press firmly into an even layer in the lined pan, paying attention to the corners, and refrigerate for 20 minutes until set enough to support the filling.",
        "將碗離火，拌入全部 180 公克全麥餅乾屑、70 公克椰絲及 50 公克核桃，直到看不到乾粉。均勻且用力地壓入鋪紙烤模，特別壓實四角，冷藏 20 分鐘至能承托內層。",
        "ボウルを火から外します。グラハムクラム180g全量、ココナッツ70g、くるみ50gを加え、粉気がなくなるまで混ぜます。型の隅まで均一にしっかり押し固め、フィリングを支えられるよう冷蔵庫で20分冷やします。",
        "볼을 불에서 내립니다. 그레이엄 크럼 180g 전량, 코코넛 70g, 호두 50g을 넣고 마른 부분이 없도록 섞습니다. 유산지를 깐 팬에 모서리까지 고르게 단단히 눌러 담고 필링을 받칠 만큼 굳도록 20분 냉장합니다.",
        "ยกชามลงจากความร้อน ใส่เกรแฮมครัมบ์ 180 กรัมทั้งหมด มะพร้าว 70 กรัม และวอลนัต 50 กรัม คลุกจนไม่มีส่วนแห้ง กดให้แน่นและเสมอกันในพิมพ์ โดยเน้นมุม แช่เย็น 20 นาทีจนแข็งพอรองรับไส้"
      ),
      ml(
        "Beat the remaining 60 g butter with all 35 g custard powder until smooth. Beat in the 30 ml cream, then add the 300 g icing sugar gradually in 3 additions, scraping the bowl, until fluffy and spreadable. If it seems stiff, keep beating briefly before adding anything; no extra liquid is listed.",
        "將剩餘 60 公克奶油與全部 35 公克奶黃粉打至滑順。加入 30 毫升鮮奶油拌勻，再分 3 次加入全部 300 公克糖粉，每次刮拌盆底，打至蓬鬆且可抹開。若感覺太硬，先短暫續打，不要另加未列出的液體。",
        "残りのバター60gとカスタードパウダー35g全量をなめらかになるまで混ぜます。クリーム30mlを加え、粉糖300g全量を3回に分けて加え、その都度ボウルをこそげます。ふんわり塗りやすい状態まで混ぜ、固いと感じたら追加材料を入れる前に少し混ぜ続けます。",
        "남은 버터 60g과 커스터드 파우더 35g 전량을 부드럽게 섞습니다. 크림 30ml를 넣고 섞은 뒤 슈거파우더 300g 전량을 세 번에 나누어 넣으며 매번 볼을 긁어 줍니다. 가볍고 펴 바르기 쉬워질 때까지 섞고, 뻑뻑하면 다른 재료를 넣기 전에 잠시 더 휘핑합니다.",
        "ตีเนยที่เหลือ 60 กรัมกับผงคัสตาร์ด 35 กรัมทั้งหมดจนเนียน ใส่ครีม 30 มล. แล้วค่อย ๆ เติมน้ำตาลไอซิง 300 กรัมทั้งหมดเป็น 3 รอบ โดยขูดข้างชามทุกครั้ง ตีจนฟูและปาดได้ หากแข็งเกินให้ตีต่ออีกเล็กน้อยก่อนเติมสิ่งอื่น เพราะสูตรไม่ได้ระบุของเหลวเพิ่ม"
      ),
      ml(
        "Spread the filling over the cold base in one even layer, right into all four corners. Refrigerate for 30 minutes until firm to a light touch; a chilled, level surface helps the warm chocolate stay in a separate top layer.",
        "將內層抹在冰涼底層上，厚薄均勻並填到四角。冷藏 30 分鐘至輕觸時已凝固；冰涼平整的表面能讓溫巧克力維持獨立頂層。",
        "冷えたベースにフィリングを均一に広げ、四隅まで届かせます。軽く触れて固まるまで30分冷蔵します。冷たく平らな表面なら、温かいチョコレートの層が混ざりません。",
        "차가운 바닥 위에 필링을 고르게 펴고 네 모서리까지 채웁니다. 가볍게 만져 단단할 때까지 30분 냉장합니다. 차갑고 평평한 표면이 따뜻한 초콜릿을 별도 층으로 유지해 줍니다.",
        "ปาดไส้บนฐานที่เย็นให้เสมอกันจนถึงทั้งสี่มุม แช่เย็น 30 นาทีจนแตะเบา ๆ แล้วแน่น ผิวที่เย็นและเรียบช่วยให้ช็อกโกแลตอุ่นอยู่เป็นชั้นแยก"
      ),
      ml(
        "In a clean, dry heatproof bowl over hot but not boiling water, melt all 120 g chocolate with the separate 25 g topping butter, usually 3–5 minutes. Stir until glossy, then cool for 3–5 minutes so it is still fluid but not hot. Pour over the firm filling and spread quickly to the edges without pressing down.",
        "用乾淨乾燥的耐熱碗隔熱水融化全部 120 公克巧克力與另備的 25 公克頂層奶油；通常需 3–5 分鐘，水不要沸騰。攪至光亮後放涼 3–5 分鐘，保持可流動但不燙手。倒在凝固內層上，快速抹到邊緣，不要往下壓。",
        "清潔で乾いた耐熱ボウルを熱湯の上に置き（沸騰させない）、チョコレート120g全量と別にした仕上げ用バター25gを約3〜5分で溶かします。つやが出たら流れるが熱すぎないよう3〜5分冷まします。固まったフィリングに注ぎ、押さずに手早く端まで広げます。",
        "깨끗하고 마른 내열 볼에 초콜릿 120g 전량과 따로 둔 토핑용 버터 25g을 담아 끓지 않는 뜨거운 물 위에서 약 3–5분 녹입니다. 윤기가 나면 3–5분 식혀 흐르지만 뜨겁지는 않게 합니다. 굳은 필링 위에 붓고 누르지 말고 가장자리까지 빠르게 폅니다.",
        "ใช้ชามทนความร้อนที่สะอาดและแห้งวางเหนือน้ำร้อนที่ไม่เดือด ละลายช็อกโกแลต 120 กรัมทั้งหมดกับเนยหน้า 25 กรัม ประมาณ 3–5 นาที คนจนเงาแล้วพัก 3–5 นาทีให้ยังไหลได้แต่ไม่ร้อน เทบนไส้ที่เซ็ตแล้วและรีบปาดถึงขอบโดยไม่กดลง"
      ),
      ml(
        "Chill for 30 minutes until the chocolate is almost set but not brittle. Warm and dry a knife, score a 4-by-4 grid, then chill for another 30 minutes. Lift out by the parchment, cut along the scores into 16 bars, wiping and warming the blade between cuts. Refrigerate the bars while the layers finish firming.",
        "冷藏 30 分鐘至巧克力幾乎凝固但尚未變脆。將刀加溫並擦乾，刻出 4×4 格，再冷藏 30 分鐘。提起烘焙紙取出，沿刻痕切成 16 塊；每切一刀都擦淨並溫熱刀面。分層完全定型前持續冷藏。",
        "チョコレートがほぼ固まるが硬く割れない程度まで30分冷やします。包丁を温めて水気を拭き、4×4の切り目を入れ、さらに30分冷やします。シートごと取り出し、切り目に沿って16個に切ります。切るたびに刃を拭いて温め、層が落ち着くまで冷蔵します。",
        "초콜릿이 거의 굳었지만 딱딱하게 부서지기 전까지 30분 냉장합니다. 칼을 따뜻하게 데워 물기를 닦고 4×4 격자로 칼집을 낸 뒤 30분 더 냉장합니다. 유산지를 들어 꺼내 칼집을 따라 16개로 자르고, 매번 칼날을 닦고 데웁니다. 층이 완전히 단단해질 때까지 냉장 보관합니다.",
        "แช่เย็น 30 นาทีจนช็อกโกแลตเกือบเซ็ตแต่ยังไม่เปราะ อุ่นมีดแล้วเช็ดให้แห้ง กรีดเป็นตาราง 4×4 จากนั้นแช่เย็นต่ออีก 30 นาที ยกออกด้วยกระดาษรอง ตัดตามรอยเป็น 16 ชิ้น เช็ดและอุ่นใบมีดระหว่างตัด เก็บในตู้เย็นจนชั้นต่าง ๆ เซ็ตเต็มที่"
      )
    ],
    tips: [
      ml("Let the cooked cocoa-egg mixture reach 71°C/160°F while whisking; the thermometer should touch the mixture, not the bowl.", "攪拌時讓可可蛋糊達 71°C／160°F；溫度計探針要測混合物，不要碰到碗底。", "混ぜながらココア卵液を71°C/160°Fまで加熱します。温度計はボウルではなく中身に当てます。", "저으면서 코코아 달걀 혼합물을 71°C/160°F까지 익힙니다. 온도계는 볼이 아니라 혼합물에 닿아야 합니다.", "คนส่วนผสมโกโก้กับไข่ให้ถึง 71°C/160°F โดยให้หัววัดสัมผัสส่วนผสม ไม่ใช่ก้นชาม"),
      ml("A firm, cold custard layer and chocolate that has cooled a few minutes make clean, distinct stripes.", "奶黃層冷而凝固、巧克力稍微降溫後再抹，切面層次會更分明。", "冷たく固まったカスタード層に、少し冷ましたチョコレートをのせると層がきれいに分かれます。", "커스터드 층을 차갑고 단단하게 굳히고 초콜릿을 잠시 식힌 뒤 부으면 층이 선명합니다.", "ทำชั้นคัสตาร์ดให้เย็นและแน่น แล้วพักช็อกโกแลตให้คลายร้อนเล็กน้อยก่อนราด จะได้ชั้นชัด")
    ],
    mistakes: [
      ml("If the chocolate top cracks when cut, it was too cold or fully set; score it while nearly set and use a warm, dry blade.", "若巧克力頂層切裂，可能太冷或已完全變硬；趁近乎凝固時先刻痕，並使用溫熱乾燥的刀。", "切るとチョコレートが割れる場合、冷やしすぎか完全に固まっています。ほぼ固まった時に筋を入れ、温かく乾いた刃を使います。", "자를 때 초콜릿이 깨지면 너무 차갑거나 완전히 굳은 것입니다. 거의 굳었을 때 칼집을 내고 따뜻하고 마른 칼을 쓰세요.", "หากหน้าช็อกโกแลตแตกตอนตัด แสดงว่าเย็นหรือแข็งเกินไป ให้กรีดตอนเกือบเซ็ตและใช้มีดอุ่นแห้ง"),
      ml("If the custard layer slides, the base or filling was not cold and firm enough; return the pan to the refrigerator before adding chocolate.", "若奶黃層滑動，表示底層或內層尚未充分冷凝；先將整盤放回冰箱再加巧克力。", "カスタード層が滑るなら、ベースかフィリングが十分に冷えて固まっていません。チョコレートをかける前に型を冷蔵庫へ戻します。", "커스터드 층이 밀리면 바닥이나 필링이 충분히 차갑고 굳지 않은 것입니다. 초콜릿을 붓기 전에 팬을 냉장고에 다시 넣으세요.", "หากชั้นคัสตาร์ดเลื่อน แสดงว่าฐานหรือไส้ยังไม่เย็นและแน่นพอ นำพิมพ์กลับเข้าตู้เย็นก่อนราดช็อกโกแลต")
    ],
    storage: ml(
      "Keep covered in the refrigerator at 4°C/40°F or colder and use within 3–4 days. Do not leave the egg- and dairy-containing bars at room temperature for more than 2 hours (1 hour above 32°C/90°F). Let a portion soften briefly in the refrigerator-side serving area, then return the rest to cold storage.",
      "加蓋冷藏於 4°C／40°F 以下，並於 3–4 天內食用。含蛋與乳製品的甜點室溫不可放超過 2 小時（高於 32°C／90°F 時 1 小時）。取出的份量稍微回軟即可，其餘立刻放回冷藏。",
      "ふたをして4°C/40°F以下で冷蔵し、3〜4日以内に食べます。卵と乳製品を含むため、室温に2時間以上（32°C/90°F超では1時間以上）置きません。食べる分だけ短時間出し、残りはすぐ冷蔵庫へ戻します。",
      "덮어서 4°C/40°F 이하 냉장 보관하고 3–4일 안에 먹습니다. 달걀과 유제품이 들어 있으므로 실온에 2시간 넘게(32°C/90°F 초과 시 1시간 넘게) 두지 않습니다. 먹을 만큼만 잠시 꺼내고 나머지는 바로 냉장고에 되돌립니다.",
      "ปิดฝาแช่เย็นที่ 4°C/40°F หรือต่ำกว่าและกินภายใน 3–4 วัน ขนมที่มีไข่และนมไม่ควรวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) นำออกมาเฉพาะส่วนที่จะกิน แล้วรีบเก็บส่วนที่เหลือกลับเข้าตู้เย็น"
    ),
    safetySources: [["egg cooking, refrigeration, and holding guidance", eggSafety]]
  });
}

function reviseNewYorkCheesecake(recipe) {
  reviseRecipe(recipe, {
    id: "new-york-cheesecake",
    prepMinutes: 550,
    cookMinutes: 150,
    titles: [
      ml("Prepare and wrap the springform pan", "準備並包好活動底模", "型を準備して包む", "스프링폼 팬 준비하고 감싸기", "เตรียมและหุ้มพิมพ์ถอดก้น"),
      ml("Mix the graham crust", "拌合全麥餅乾底", "グラハムクラストを混ぜる", "그레이엄 크러스트 섞기", "ผสมฐานเกรแฮม"),
      ml("Press and pre-bake the crust", "壓實並預烤餅底", "押し固めて空焼きする", "눌러 담아 미리 굽기", "กดและอบฐานก่อน"),
      ml("Beat the cream cheese smooth", "將奶油乳酪打至滑順", "クリームチーズをなめらかにする", "크림치즈를 부드럽게 풀기", "ตีครีมชีสให้เนียน"),
      ml("Blend in sugar and flour", "拌入砂糖與麵粉", "砂糖と小麦粉を混ぜる", "설탕과 밀가루 섞기", "ผสมน้ำตาลกับแป้ง"),
      ml("Add sour cream, vanilla, and zest", "加入酸奶油、香草與檸檬皮", "サワークリーム、バニラ、皮を加える", "사워크림·바닐라·제스트 넣기", "ใส่ซาวร์ครีม วานิลลา และผิวเลมอน"),
      ml("Add eggs one at a time", "逐顆加入雞蛋", "卵を一つずつ加える", "달걀을 하나씩 넣기", "ใส่ไข่ทีละฟอง"),
      ml("Fill the crust and release large bubbles", "倒入餅底並排出大氣泡", "生地を流し大きな気泡を抜く", "반죽을 붓고 큰 기포 빼기", "เทลงฐานและไล่ฟองใหญ่"),
      ml("Set up the water bath", "準備水浴烤盤", "湯せんを準備する", "중탕 준비하기", "เตรียมอ่างน้ำ"),
      ml("Bake to the egg-safety endpoint", "烘烤至蛋料理安全熟度", "卵料理の安全温度まで焼く", "달걀 요리 안전 온도까지 굽기", "อบจนถึงอุณหภูมิปลอดภัยของอาหารไข่"),
      ml("Cool gradually in the switched-off oven", "在關火烤箱中緩慢降溫", "電源を切ったオーブンでゆっくり冷ます", "꺼진 오븐에서 천천히 식히기", "ค่อย ๆ พักเย็นในเตาที่ปิดแล้ว"),
      ml("Cool briefly, then chill before slicing", "短暫放涼後冷藏再切", "少し冷ましてから冷蔵し切る", "잠시 식힌 뒤 냉장해 자르기", "พักสั้น ๆ แล้วแช่เย็นก่อนตัด")
    ],
    bodies: [
      ml(
        "Line the base of a 23 cm springform pan with parchment and lock the ring. Wrap the outside tightly in two layers of heavy foil, bringing it well up the sides, so the water bath cannot leak in. Set the pan in a deep roasting tray and keep the tray dry until the batter is ready.",
        "在 23 公分活動底模底部鋪烘焙紙並扣緊模圈。模具外側用兩層厚鋁箔緊密包覆並拉高至側面，避免水浴滲入。先將模具放入深烤盤，待麵糊完成再加水。",
        "23cmのスプリングフォーム型の底にオーブンシートを敷き、リングを閉じます。湯せんの水が入らないよう、型の外側を厚手のアルミホイル2枚で側面の上まできつく包みます。生地ができるまでは深い天板に置き、水は入れません。",
        "23cm 스프링폼 팬 바닥에 유산지를 깔고 링을 잠급니다. 중탕물이 스며들지 않도록 팬 바깥을 두 겹의 두꺼운 포일로 옆면 위까지 단단히 감쌉니다. 반죽이 준비될 때까지 깊은 로스팅 팬에 놓고 물은 붓지 않습니다.",
        "รองกระดาษที่ก้นพิมพ์สปริงฟอร์ม 23 ซม.และล็อกวงพิมพ์ หุ้มด้านนอกให้แน่นด้วยฟอยล์หนาสองชั้นขึ้นมาถึงข้างพิมพ์ เพื่อกันน้ำจากอ่างรั่วเข้าไป วางพิมพ์ในถาดอบลึกและยังไม่เติมน้ำจนกว่าแบตเทอร์จะพร้อม"
      ),
      ml(
        "Mix all 220 g graham crumbs with the 35 g crust sugar and 90 g melted butter until evenly damp like wet sand. Squeeze a handful: it should hold together without shiny pools of butter. Do not add more butter; the listed amount binds the crumbs.",
        "將全部 220 公克全麥餅乾屑、35 公克餅底用砂糖及 90 公克融化奶油拌勻，直到濕潤如沙。抓一把應能捏合，表面不應有亮亮的油池。不要再加奶油；原量足以黏合餅屑。",
        "グラハムクラム220g全量、クラスト用砂糖35g、溶かしバター90gを、湿った砂のように均一に混ぜます。一握りするとまとまり、バターの照りや溜まりがない状態が目安です。クラムをまとめる量は足りているのでバターを増やしません。",
        "그레이엄 크럼 220g 전량, 바닥용 설탕 35g, 녹인 버터 90g을 젖은 모래처럼 고르게 섞습니다. 한 줌 쥐면 뭉치되 버터가 번들거리며 고이지 않아야 합니다. 부스러기를 묶는 양은 충분하므로 버터를 더 넣지 않습니다.",
        "ผสมเกรแฮมครัมบ์ 220 กรัมทั้งหมดกับน้ำตาลฐาน 35 กรัมและเนยละลาย 90 กรัมจนชุ่มทั่วเหมือนทรายเปียก บีบหนึ่งกำมือแล้วควรจับตัวโดยไม่มีเนยเงา ๆ ขังอยู่ อย่าเติมเนยเพิ่ม เพราะปริมาณนี้ช่วยให้เศษบิสกิตเกาะกันได้แล้ว"
      ),
      ml(
        "Press the crumbs firmly over the base and about 2 cm up the sides, keeping the thickness even. Bake at 175°C for 10 minutes until fragrant and just lightly colored. Cool the crust while lowering the oven to 160°C; leave the springform wrapped.",
        "將餅屑用力且均勻壓在模底並沿側邊向上約 2 公分。以 175°C 預烤 10 分鐘，直到香氣出現且略微上色。餅底放涼時將烤箱降至 160°C；鋁箔仍留在模具外。",
        "クラムを型の底と側面約2cmまで、厚みを均等にしながらしっかり押し固めます。175°Cで10分、香りが立ち、ほんのり色づくまで焼きます。クラストを冷ましながらオーブンを160°Cに下げ、型のホイルはそのままにします。",
        "부스러기를 팬 바닥과 옆면 약 2cm까지 두께가 고르게 단단히 누릅니다. 175°C에서 10분 향이 나고 살짝 색이 돌 때까지 미리 굽습니다. 크러스트를 식히는 동안 오븐을 160°C로 낮추고 팬 포일은 그대로 둡니다.",
        "กดเศษบิสกิตให้แน่นทั่วก้นพิมพ์และขึ้นด้านข้างประมาณ 2 ซม.ให้หนาสม่ำเสมอ อบที่ 175°C นาน 10 นาทีจนหอมและเริ่มมีสีอ่อน พักฐานให้เย็นพร้อมลดเตาเหลือ 160°C โดยคงฟอยล์รอบพิมพ์ไว้"
      ),
      ml(
        "Use room-temperature cream cheese. Beat all 1,200 g on low speed for about 2 minutes, stopping to scrape the bowl several times, until no lumps remain. Keep the mixer slow; whipping air into this dense batter makes it rise and crack later.",
        "奶油乳酪需回至室溫。以低速打全部 1,200 公克約 2 分鐘，途中刮盆數次，直到完全沒有顆粒。攪拌器保持低速；大量打入空氣會使濃稠麵糊膨起，之後容易裂開。",
        "クリームチーズは室温に戻します。全量1200gを低速で約2分混ぜ、数回ボウルをこそげ、粒がなくなるまでなめらかにします。低速を保ちます。空気を入れすぎると焼成中に膨らみ、後でひび割れます。",
        "크림치즈는 실온에 둡니다. 1,200g 전량을 저속으로 약 2분 풀고 몇 차례 볼을 긁어 덩어리가 없게 합니다. 믹서는 낮은 속도로 유지합니다. 공기를 많이 넣으면 굽는 중 부풀었다가 식으며 갈라집니다.",
        "พักครีมชีสให้ถึงอุณหภูมิห้อง ตีทั้งหมด 1,200 กรัมด้วยความเร็วต่ำประมาณ 2 นาที หยุดปาดข้างชามหลายครั้งจนไม่มีเม็ด ใช้ความเร็วต่ำต่อไป การตีอากาศเข้าไปมากทำให้แบตเทอร์พองและแตกภายหลัง"
      ),
      ml(
        "Add all 300 g sugar and 25 g flour. Mix on low for about 1 minute, scraping once, until the powder disappears and the batter is smooth. Do not beat to a fluffy cream; a dense, satiny batter gives a close New York-style slice.",
        "加入全部 300 公克砂糖及 25 公克麵粉，以低速攪拌約 1 分鐘並刮拌一次，直到粉料消失、麵糊滑順。不要打成蓬鬆奶霜；濃密且有緞光的麵糊切面才像紐約起司蛋糕。",
        "砂糖300g全量と薄力粉25gを加え、低速で約1分混ぜます。途中で一度こそげ、粉が見えなくなりなめらかにします。ふんわり泡立てず、密でつやのある生地にするとニューヨーク風の食感になります。",
        "설탕 300g 전량과 밀가루 25g을 넣고 저속으로 약 1분 섞으며 한 번 긁어 줍니다. 가루가 사라지고 매끈해지면 멈춥니다. 폭신하게 휘핑하지 말고 조밀하고 매끈한 반죽을 만들어 뉴욕 스타일 질감을 냅니다.",
        "ใส่น้ำตาล 300 กรัมทั้งหมดกับแป้ง 25 กรัม ผสมความเร็วต่ำประมาณ 1 นาทีและปาดชามหนึ่งครั้งจนผงหายและเนียน อย่าตีให้ฟูเป็นครีม แบตเทอร์ที่แน่นและเงาให้เนื้อเค้กแบบนิวยอร์ก"
      ),
      ml(
        "Add all 240 g room-temperature sour cream, 10 ml vanilla, and 10 g lemon zest. Mix on low just until uniform, about 30 seconds. Scrape the bowl bottom once so no cream cheese remains unmixed.",
        "加入全部 240 公克室溫酸奶油、10 毫升香草精及 10 公克檸檬皮屑，以低速拌約 30 秒至均勻即可。刮一次盆底，確認沒有奶油乳酪留在下方未拌入。",
        "室温のサワークリーム240g全量、バニラ10ml、レモン皮10gを加えます。均一になるまで低速で約30秒混ぜます。ボウルの底を一度こそげ、チーズが残らないようにします。",
        "실온 사워크림 240g 전량, 바닐라 10ml, 레몬 제스트 10g을 넣습니다. 고르게 섞일 때까지만 저속으로 약 30초 섞습니다. 볼 바닥을 한 번 긁어 크림치즈가 남지 않게 합니다.",
        "ใส่ซาวร์ครีมอุณหภูมิห้อง 240 กรัมทั้งหมด วานิลลา 10 มล. และผิวเลมอน 10 กรัม ผสมความเร็วต่ำประมาณ 30 วินาทีจนทั่ว ปาดก้นชามหนึ่งครั้งเพื่อไม่ให้มีครีมชีสตกค้าง"
      ),
      ml(
        "Add the 5 room-temperature eggs one at a time on low speed. Let each disappear before adding the next, then scrape the bowl once. Stop as soon as the batter is silky and uniform; do not whip in foam. Wash hands and utensils after contact with raw egg.",
        "5 顆室溫雞蛋以低速逐顆加入，前一顆拌入看不見後再加下一顆，最後刮一次盆底。麵糊絲滑均勻就停止，不要打出泡沫。接觸生蛋後洗手並清洗器具。",
        "室温の卵5個を低速で一つずつ加えます。前の卵が見えなくなってから次を加え、最後に一度こそげます。生地が絹のようになめらかにまとまったら止め、泡立てません。生卵に触れた手や器具は洗います。",
        "실온 달걀 5개를 저속으로 하나씩 넣습니다. 앞 달걀이 보이지 않게 섞인 뒤 다음을 넣고 마지막에 볼을 한 번 긁습니다. 반죽이 매끄럽게 고르게 되면 멈추고 거품을 내지 않습니다. 생달걀을 만진 손과 도구는 씻습니다.",
        "ใส่ไข่อุณหภูมิห้องทั้ง 5 ฟองทีละฟองด้วยความเร็วต่ำ รอให้ฟองก่อนหายไปก่อนใส่ฟองถัดไป แล้วปาดชามหนึ่งครั้ง หยุดเมื่อแบตเทอร์เนียนสม่ำเสมอ อย่าตีให้เป็นฟอง ล้างมือและอุปกรณ์หลังสัมผัสไข่ดิบ"
      ),
      ml(
        "Pour the batter into the cooled crust and level the top. Tap the pan gently on a folded towel three times to release large bubbles; do not bang it hard, which can loosen the crust. Let any remaining surface bubbles pop before baking.",
        "將麵糊倒入已冷卻餅底並抹平。模具放在折起的毛巾上輕敲三次排出大氣泡；不要大力敲擊，以免餅底鬆動。烘烤前讓表面剩餘氣泡自行破掉。",
        "冷めたクラストに生地を流し、表面を平らにします。折ったタオルの上で型を軽く3回たたき、大きな気泡を抜きます。強く打つとクラストが緩むので注意します。焼く前に表面の泡をつぶします。",
        "식힌 크러스트에 반죽을 붓고 윗면을 고릅니다. 접은 수건 위에 팬을 가볍게 세 번 두드려 큰 기포를 빼되 세게 내리쳐 크러스트가 풀리지 않게 합니다. 굽기 전에 표면에 남은 기포를 터뜨립니다.",
        "เทแบตเทอร์ลงบนฐานที่เย็นและเกลี่ยหน้าให้เรียบ เคาะพิมพ์เบา ๆ บนผ้าพับสามครั้งเพื่อไล่ฟองใหญ่ อย่ากระแทกแรงเพราะฐานอาจหลุด ปล่อยให้ฟองที่เหลือบนผิวแตกก่อนอบ"
      ),
      ml(
        "Set the wrapped pan in the roasting tray. Pour hot water into the tray to a depth of about 3 cm; do not splash water over the foil rim. The water bath moderates heat and helps the edge and centre bake more evenly.",
        "將包好鋁箔的模具放入深烤盤，往烤盤倒入熱水至約 3 公分深；不要讓水濺過鋁箔邊緣。水浴能緩和熱度，讓邊緣與中心較均勻烘烤。",
        "ホイルで包んだ型を天板に置きます。天板に熱湯を約3cmの深さまで注ぎ、ホイルの縁を越えて水が入らないようにします。湯せんで熱を穏やかにし、縁と中心を均一に焼きます。",
        "포일로 싼 팬을 로스팅 팬에 놓습니다. 뜨거운 물을 약 3cm 깊이로 붓되 포일 가장자리 위로 튀지 않게 합니다. 중탕은 열을 완화해 가장자리와 가운데가 고르게 익도록 돕습니다.",
        "วางพิมพ์ที่หุ้มฟอยล์ในถาดอบ เทน้ำร้อนลงถาดให้ลึกประมาณ 3 ซม. ระวังอย่าให้น้ำกระเซ็นข้ามขอบฟอยล์ อ่างน้ำช่วยลดความรุนแรงของความร้อนและทำให้ขอบกับกลางสุกสม่ำเสมอขึ้น"
      ),
      ml(
        "Bake at 160°C for about 70–80 minutes, beginning checks at 70 minutes. The outer ring should look set and the centre should move as one soft disk. For egg safety, insert a clean thin-tip thermometer into the centre without touching the pan; continue in 5-minute intervals until it reaches 71°C (160°F). The wobble is a texture cue, not a temperature test.",
        "以 160°C 烘約 70–80 分鐘，70 分鐘開始檢查。外圈應凝固，中心晃動時像一整塊柔軟圓盤。為確認含蛋料理安全熟度，用乾淨細探針插入中心、不要碰模具；若未達 71°C（160°F），每次續烤 5 分鐘再量。中心微晃只是口感線索，不是溫度檢測。",
        "160°Cで約70〜80分焼き、70分から確認します。外側は固まり、中心は柔らかな円盤のように揺れる状態が目安です。卵料理の安全確認として、清潔な細い温度計を型に触れないよう中心へ差し、71°C（160°F）に達するまで5分ずつ追加で焼きます。揺れ具合は食感の目安で、温度検査の代わりではありません。",
        "160°C에서 약 70–80분 굽고 70분부터 확인합니다. 바깥 테두리는 굳고 가운데는 부드러운 원판처럼 함께 흔들려야 합니다. 달걀 요리 안전 확인을 위해 깨끗한 가는 온도계를 팬에 닿지 않게 중심에 꽂아 71°C (160°F)에 도달할 때까지 5분씩 더 굽습니다. 흔들림은 식감 판단일 뿐 온도 검사를 대신하지 않습니다.",
        "อบที่ 160°C ประมาณ 70–80 นาที เริ่มตรวจที่นาที 70 ขอบนอกควรเซ็ตและตรงกลางควรไหวเป็นแผ่นนุ่มเดียวกัน เพื่อความปลอดภัยของอาหารไข่ ใช้เทอร์โมมิเตอร์ปลายเล็กสะอาดวัดตรงกลางโดยไม่แตะพิมพ์ อบเพิ่มครั้งละ 5 นาทีจนถึง 71°C (160°F) การสั่นเป็นเพียงสัญญาณเนื้อสัมผัส ไม่ใช่การวัดอุณหภูมิ"
      ),
      ml(
        "Turn the oven off and crack the door open about 5 cm. Leave the cheesecake in the water bath inside the oven for 60 minutes so the temperature falls gradually; do not move or unmould it while hot. Start the room-temperature cooling clock when it leaves the oven.",
        "關掉烤箱並將爐門打開約 5 公分。起司蛋糕仍留在烤箱水浴中 60 分鐘，讓溫度緩慢下降；趁熱不要移動或脫模。蛋糕離開烤箱後開始計算室溫冷卻時間。",
        "オーブンを切り、扉を約5cm開けます。チーズケーキは湯せんのまま庫内に60分置き、ゆっくり温度を下げます。熱いうちは動かしたり型から外したりしません。室温冷却の時間はオーブンから出した時点で始めます。",
        "오븐을 끄고 문을 약 5cm 엽니다. 치즈케이크를 중탕에 둔 채 오븐 안에서 60분 천천히 식힙니다. 뜨거울 때 움직이거나 틀에서 빼지 않습니다. 오븐에서 꺼내는 순간부터 실온 냉각 시간을 잽니다.",
        "ปิดเตาและแง้มประตูประมาณ 5 ซม. วางชีสเค้กไว้ในอ่างน้ำภายในเตา 60 นาทีให้อุณหภูมิลดลงช้า ๆ อย่าย้ายหรือถอดพิมพ์ขณะร้อน เริ่มนับเวลาพักที่อุณหภูมิห้องเมื่อยกออกจากเตา"
      ),
      ml(
        "Lift the pan from the water bath and cool on a rack for 30 minutes. Cover and refrigerate at 4°C/40°F or colder within 2 hours of the end of baking, then chill at least 8 hours until cold throughout. Release the ring only after chilling. Use a thin warm knife, wiping it between cuts, to make 12 clean portions.",
        "將模具從水浴取出，放網架冷卻 30 分鐘。烘烤結束後 2 小時內加蓋冷藏於 4°C／40°F 以下，再冷藏至少 8 小時至內外冰涼。完全冷藏後才鬆開模圈。刀稍微加溫並每切一刀擦淨，切成 12 份。",
        "型を湯せんから外し、網の上で30分冷まします。焼き終わりから2時間以内に覆って4°C/40°F以下で冷蔵し、全体が冷えるまで少なくとも8時間冷やします。冷えてからリングを外します。温めて拭いた包丁で12等分します。",
        "팬을 중탕에서 꺼내 망 위에서 30분 식힙니다. 굽기가 끝난 뒤 2시간 안에 덮어 4°C/40°F 이하로 냉장하고 속까지 차가워지도록 최소 8시간 둡니다. 충분히 차가워진 뒤 링을 풉니다. 칼을 따뜻하게 하고 매번 닦아 12조각으로 자릅니다.",
        "ยกพิมพ์ออกจากอ่างน้ำและพักบนตะแกรง 30 นาที ปิดฝาและแช่ที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมงหลังอบเสร็จ จากนั้นแช่อย่างน้อย 8 ชั่วโมงจนเย็นทั่ว จึงค่อยปลดวงพิมพ์ ใช้มีดอุ่นและเช็ดทุกครั้งเพื่อตัดเป็น 12 ชิ้นเรียบ"
      )
    ],
    tips: [
      ml("Bring cream cheese, sour cream, and eggs to room temperature before mixing; this lets them combine with less beating.", "奶油乳酪、酸奶油與雞蛋先回到室溫，混合時就不必過度攪打。", "クリームチーズ、サワークリーム、卵は先に室温へ戻すと、混ぜすぎず均一になります。", "크림치즈, 사워크림, 달걀을 미리 실온에 두면 과하게 휘핑하지 않고도 잘 섞입니다.", "พักครีมชีส ซาวร์ครีม และไข่ให้อุณหภูมิห้องก่อนผสม จะเข้ากันได้โดยไม่ต้องตีนานเกินไป"),
      ml("Use the centre thermometer endpoint as the safety check and the gentle wobble only as a texture cue; a water bath and slow cooling reduce, but cannot guarantee against, cracks.", "以中心溫度作為安全確認，微晃只用來判斷口感；水浴及慢速降溫能減少裂痕，但不能保證完全不裂。", "中心温度を安全確認に使い、揺れは食感の目安だけにします。湯せんとゆっくりした冷却でひび割れを減らせますが、完全には防げません。", "중심 온도는 안전 확인에, 흔들림은 식감 판단에만 사용하세요. 중탕과 천천히 식히기는 갈라짐을 줄일 수 있지만 완전히 막지는 못합니다.", "ใช้เทอร์โมมิเตอร์วัดกลางเพื่อความปลอดภัย ส่วนการสั่นดูเนื้อสัมผัสเท่านั้น อ่างน้ำและการพักเย็นช้าช่วยลดรอยแตกได้แต่ไม่รับประกันว่าจะไม่แตกเลย")
    ],
    mistakes: [
      ml("If the top puffs or cracks, the batter likely contained excess air or was overbaked; stop mixing once smooth and use the thermometer endpoint rather than extending time by habit.", "若表面膨起或裂開，常因麵糊空氣太多或烤過頭；打滑順就停止，依溫度計判斷，不要習慣性延長時間。", "表面が膨らんだり割れたりする場合、空気の入れすぎか焼きすぎが考えられます。なめらかになったら混ぜるのを止め、習慣で焼き時間を延ばさず温度で判断します。", "윗면이 부풀거나 갈라지면 공기가 너무 많이 들어갔거나 과하게 구운 것입니다. 매끈해지면 섞기를 멈추고 습관적으로 시간을 늘리지 말고 온도로 판단하세요.", "หากหน้าเค้กพองหรือแตก อาจเพราะมีอากาศมากหรืออบนานเกินไป หยุดผสมเมื่อเนียนและใช้ปลายทางอุณหภูมิ ไม่ยืดเวลาโดยเดา"),
      ml("If the crust is wet, water entered through the foil; dry the pan exterior, replace the foil wrap, and keep the water below the foil rim next time.", "若餅底濕軟，可能是水經鋁箔滲入；先擦乾模具外側並重新包箔，下次水位不要高過鋁箔邊緣。", "クラストが湿っていたら、ホイルの隙間から湯が入った可能性があります。型の外側を拭き、ホイルを巻き直します。次は水位をホイルの縁より低くします。", "크러스트가 젖었다면 포일 틈으로 물이 들어간 것입니다. 팬 바깥을 닦고 포일을 다시 감으세요. 다음에는 물이 포일 가장자리보다 높지 않게 합니다.", "หากฐานเปียก น้ำอาจซึมผ่านฟอยล์ ให้เช็ดด้านนอกและหุ้มใหม่ ครั้งต่อไปอย่าเติมน้ำสูงกว่าขอบฟอยล์")
    ],
    storage: ml(
      "Keep covered in the refrigerator at 4°C/40°F or colder and use within 3–4 days. Refrigerate within 2 hours after baking; do not leave this egg- and dairy-rich cake at room temperature longer. Freeze wrapped slices if holding longer, and thaw in the refrigerator.",
      "加蓋冷藏於 4°C／40°F 以下，並於 3–4 天內食用。烘烤後 2 小時內冷藏；含蛋與乳製品的蛋糕不可在室溫放更久。需保存更久時將切片包好冷凍，並在冰箱解凍。",
      "覆って4°C/40°F以下で冷蔵し、3〜4日以内に食べます。焼き上がりから2時間以内に冷蔵し、卵と乳製品を多く含むケーキを室温に長く置きません。長く保存する場合は一切れずつ包んで冷凍し、冷蔵庫で解凍します。",
      "덮어서 4°C/40°F 이하 냉장 보관하고 3–4일 안에 먹습니다. 굽고 2시간 안에 냉장하며 달걀과 유제품이 많은 케이크를 실온에 더 오래 두지 않습니다. 더 오래 보관하려면 조각을 싸서 냉동하고 냉장고에서 해동합니다.",
      "ปิดฝาแช่เย็นที่ 4°C/40°F หรือต่ำกว่าและกินภายใน 3–4 วัน นำเข้าตู้เย็นภายใน 2 ชั่วโมงหลังอบ อย่าวางเค้กที่มีไข่และนมมากไว้ที่อุณหภูมิห้องนานกว่านั้น หากต้องเก็บนานให้ห่อเป็นชิ้นแช่แข็งและละลายในตู้เย็น"
    ),
    safetySources: [["egg cooking and safe refrigeration", eggSafety], ["safe minimum cooking temperatures", foodTemps]]
  });
}

export function refineEightySeventhMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseMapoTofu(byId.get("mapo-tofu"));
  reviseMasalaDosa(byId.get("masala-dosa"));
  reviseNanaimoBars(byId.get("nanaimo-bars"));
  reviseNewYorkCheesecake(byId.get("new-york-cheesecake"));
}
