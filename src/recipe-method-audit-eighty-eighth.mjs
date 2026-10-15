// Reimplementation batch 4. These methods are newly authored from the
// existing recipe records; this module does not restore unavailable patches.
const temperatureChart = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handlingGuide = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const coldStorageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const seafoodGuide = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: "Official food-safety guidance — " + label, url });
  }
}

function reviseRecipe(recipe, revision) {
  if (!recipe) throw new Error("Missing recipe for method revision: " + revision.id);
  if (recipe.instructions.length !== revision.titles.length || revision.titles.length !== revision.bodies.length) {
    throw new Error("Step count mismatch for method revision: " + revision.id);
  }
  recipe.instructions = recipe.instructions.map((step, index) => ({
    ...step,
    title: revision.titles[index],
    body: revision.bodies[index]
  }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = revision.tips;
  recipe.commonMistakes = revision.mistakes;
  recipe.storage = revision.storage;
  recipe.prepMinutes = revision.prepMinutes;
  recipe.cookMinutes = revision.cookMinutes;
  recipe.totalMinutes = revision.prepMinutes + revision.cookMinutes;
  for (const [label, url] of revision.safetySources) addOfficialSource(recipe, label, url);
}

function revisePadThai(recipe) {
  reviseRecipe(recipe, {
    id: "pad-thai",
    prepMinutes: 45,
    cookMinutes: 15,
    titles: [
      ml("Soak and drain the noodles", "泡軟並瀝乾河粉", "麺を戻して水を切る", "면 불리고 물기 빼기", "แช่และสะเด็ดเส้น"),
      ml("Dissolve the sauce", "煮溶醬汁", "たれを溶かす", "소스 녹이기", "ละลายซอส"),
      ml("Set up the wok station", "備妥炒鍋材料", "中華鍋の材料を並べる", "웍 재료 준비하기", "จัดวัตถุดิบข้างกระทะ"),
      ml("Brown tofu and cook shrimp", "煎香豆腐並煮熟鮮蝦", "豆腐を焼き、海老を加熱する", "두부를 굽고 새우 익히기", "จี่เต้าหู้และปรุงกุ้ง"),
      ml("Cook the aromatics and eggs", "炒香辛料並將蛋炒熟", "香味野菜と卵を炒める", "향과 달걀 익히기", "ผัดเครื่องหอมและไข่"),
      ml("Toss the noodles with sauce", "河粉拌炒醬汁", "麺にたれを絡める", "면에 소스 입히기", "คลุกเส้นกับซอส"),
      ml("Return the tofu and shrimp", "放回豆腐與鮮蝦", "豆腐と海老を戻す", "두부와 새우 다시 넣기", "ใส่เต้าหู้และกุ้งกลับ"),
      ml("Cook the sprouts and chives", "炒熟豆芽與韭菜", "もやしとにらを炒める", "숙주와 부추 익히기", "ผัดถั่วงอกและกุยช่าย"),
      ml("Divide and garnish", "分盤並加配料", "盛り分けて薬味を添える", "나누어 담고 고명 얹기", "แบ่งจานและโรยหน้า")
    ],
    bodies: [
      ml(
        "Cover the 200 g noodles with cool water by about 5 cm. Soak 40–50 minutes while you prepare the other ingredients; drain when a strand bends without snapping but still has a firm centre. Do not soak until soft.",
        "用冷水淹過 200 公克河粉約 5 公分，浸泡 40–50 分鐘，趁此備料；麵條能彎而不斷、中心仍偏硬時瀝乾，不要泡到全軟。",
        "乾麺200gが約5cm浸るまで冷水を注ぎ、ほかの材料を準備する間40〜50分戻します。折れずに曲がり、中心に硬さが残る状態で水を切り、柔らかくなるまで浸けません。",
        "마른 면 200g이 약 5cm 잠기도록 찬물을 붓고 다른 재료를 준비하는 동안 40–50분 불립니다. 끊어지지 않고 휘지만 중심은 단단할 때 물을 빼고 완전히 부드러워질 때까지 불리지 마세요.",
        "เทน้ำเย็นให้ท่วมเส้น 200 กรัมประมาณ 5 ซม. แช่ 40–50 นาทีระหว่างเตรียมของอื่น สะเด็ดเมื่อเส้นงอได้โดยไม่ขาดแต่กลางยังแน่น อย่าแช่จนนิ่ม"
      ),
      ml(
        "Combine 60 ml tamarind paste, 45 g finely chopped palm sugar, 30 ml fish sauce, and the listed 15 ml water in a small pan. Warm on low for 3–4 minutes, stirring until the sugar dissolves; use all of this sauce rather than measuring a larger yield.",
        "小鍋加入 60 毫升羅望子醬、45 公克切細棕櫚糖、30 毫升魚露和食材表所列的 15 毫升水。小火攪拌 3–4 分鐘至糖溶，使用全部醬汁，不要另量出不存在的較大份量。",
        "小鍋にタマリンドペースト60ml、細かく刻んだパームシュガー45g、ナンプラー30ml、材料表の水15mlを入れます。弱火で3〜4分混ぜて砂糖を溶かし、できたたれを全量使います。",
        "작은 냄비에 타마린드 페이스트 60ml, 잘게 썬 팜슈거 45g, 피시소스 30ml, 재료표의 물 15ml를 넣습니다. 약불에서 3–4분 저어 설탕을 녹이고 만든 소스를 전부 사용하세요.",
        "ใส่น้ำมะขาม 60 มล. น้ำตาลมะพร้าวสับ 45 กรัม น้ำปลา 30 มล. และน้ำ 15 มล.ตามรายการลงหม้อเล็ก อุ่นไฟอ่อน 3–4 นาที คนให้น้ำตาลละลาย แล้วใช้ซอสทั้งหมด"
      ),
      ml(
        "Pat the peeled shrimp, tofu, and 100 g bean sprouts dry. Beat the 2 eggs; keep the shallots, rinsed dried shrimp, noodles, sauce, chives, peanuts, lime, and chile in separate bowls in cooking order. Set a clean plate beside the wok for the cooked shrimp and tofu.",
        "將去殼鮮蝦、豆腐與 100 公克豆芽擦乾，打散 2 顆蛋；紅蔥頭、沖洗過的蝦米、河粉、醬汁、韭菜、花生、萊姆與辣椒分碗依下鍋順序排好，並在炒鍋旁放一只乾淨盤子盛熟蝦與豆腐。",
        "殻をむいた海老と豆腐の水分を拭き、卵2個を溶きます。エシャロット、洗って刻んだ干し海老、麺、たれ、もやし100g、にら、ピーナッツ、ライム、唐辛子を使用順に別々の器へ並べ、加熱済みの具を置く清潔な皿を用意します。",
        "껍질 벗긴 새우와 두부의 물기를 닦고 달걀 2개를 풉니다. 샬롯, 헹군 건새우, 면, 소스, 물기 뺀 숙주 100g, 부추, 땅콩, 라임, 고추를 넣는 순서대로 따로 담고 익힌 재료를 놓을 깨끗한 접시를 둡니다.",
        "ซับกุ้งแกะเปลือกและเต้าหู้ให้แห้ง ตีไข่ 2 ฟอง จัดหอมแดง กุ้งแห้งที่ล้างแล้ว เส้น ซอส ถั่วงอกสะเด็ดน้ำ 100 กรัม กุยช่าย ถั่วลิสง มะนาว และพริกแยกถ้วยตามลำดับเตรียมจานสะอาดไว้ใส่กุ้งกับเต้าหู้ที่สุกแล้ว"
      ),
      ml(
        "Heat a 32 cm wok over medium-high for 2 minutes. Add 20 ml of the oil and brown the tofu for 3–4 minutes, turning once. Add shrimp in one layer; cook about 1–2 minutes per side until firm, pearly, and opaque, or 63°C/145°F at the thickest point. Move both to the clean plate.",
        "32 公分炒鍋中大火預熱 2 分鐘，加入 20 毫升油，豆腐煎 3–4 分鐘並翻面一次。鮮蝦單層下鍋，每面約 1–2 分鐘，至結實、珍珠白且不透明；或以溫度計確認最厚處達 63°C／145°F。兩者移至乾淨盤。",
        "直径32cmの中華鍋を中強火で2分熱し、油20mlで豆腐を3〜4分、途中で一度返して焼きます。海老を重ならないように入れ、片面約1〜2分ずつ、身が締まり真珠色で不透明になるまで、または最も厚い部分が63°C/145°Fになるまで加熱し、清潔な皿へ移します。",
        "32cm 웍을 중강불에서 2분 달구고 기름 20ml를 넣어 두부를 3–4분, 한 번 뒤집어 노릇하게 굽습니다. 새우를 겹치지 않게 넣고 면당 약 1–2분, 단단하고 진주빛을 띠며 불투명해질 때까지 또는 가장 두꺼운 곳이 63°C/145°F가 될 때까지 익힌 뒤 깨끗한 접시에 옮깁니다.",
        "อุ่นกระทะ 32 ซม.ไฟกลางค่อนแรง 2 นาที ใส่น้ำมัน 20 มล. จี่เต้าหู้ 3–4 นาที พลิกหนึ่งครั้ง วางกุ้งชั้นเดียว ผัดด้านละราว 1–2 นาทีจนเนื้อแน่น สีมุกและทึบ หรือจุดหนาสุดถึง 63°C/145°F แล้วย้ายลงจานสะอาด"
      ),
      ml(
        "Add the remaining 25 ml oil, shallots, and dried shrimp; stir for 45 seconds until fragrant. Push them aside and pour the beaten eggs onto the clear part of the wok. Scramble into soft curds until no liquid egg remains and the thickest curds reach 71°C/160°F; break into bite-size pieces.",
        "加入剩餘 25 毫升油、紅蔥頭與蝦米，炒 45 秒至香。推到一側，將蛋液倒在空出的鍋面炒成嫩蛋塊；炒至沒有流動蛋液，且較厚的蛋塊達 71°C／160°F，再撥成入口大小。",
        "残りの油25ml、エシャロット、干し海老を加え、香りが出るまで45秒炒めます。片側へ寄せ、空いた場所に溶き卵を流して柔らかなそぼろ状にし、液状の卵がなくなり、厚い部分が71°C/160°Fに達したら食べやすくほぐします。",
        "남은 기름 25ml, 샬롯, 건새우를 넣고 향이 날 때까지 45초 볶습니다. 한쪽으로 밀고 빈 곳에 달걀물을 부어 부드러운 덩어리로 볶습니다. 흐르는 달걀이 없고 두꺼운 부분이 71°C/160°F에 도달하면 한입 크기로 풉니다.",
        "ใส่น้ำมันที่เหลือ 25 มล. หอมแดง และกุ้งแห้ง ผัด 45 วินาทีจนหอม เขี่ยไปด้านหนึ่ง เทไข่ลงบนพื้นที่ว่างของกระทะ ผัดเป็นก้อนนุ่มจนไม่มีไข่เหลวและก้อนหนาถึง 71°C/160°F แล้วแบ่งเป็นชิ้นพอดีคำ"
      ),
      ml(
        "Add the drained noodles and all the sauce. Toss over high heat for 2 minutes, then cover for 1 minute so the noodles steam in their soaking moisture and sauce. Uncover and test a strand: it should be supple, chewy, and have no chalky white core.",
        "加入瀝乾河粉與全部醬汁，大火翻炒 2 分鐘，再加蓋 1 分鐘，讓麵條利用浸泡後的水分與醬汁蒸熟。開蓋試一根：應柔韌有嚼勁，中心沒有粉白硬芯。",
        "水を切った麺とたれ全量を加え、強火で2分混ぜます。ふたをして1分蒸し、戻し水分とたれで火を通します。麺を一本試し、しなやかで弾力があり、白く粉っぽい芯がないことを確認します。",
        "물기를 뺀 면과 소스 전량을 넣고 센 불에서 2분 볶은 뒤 뚜껑을 덮어 1분 찝니다. 불린 면의 수분과 소스로 익힙니다. 한 가닥 먹어 보고 부드럽게 탄력 있으며 하얀 가루심이 없는지 확인하세요.",
        "ใส่เส้นที่สะเด็ดแล้วและซอสทั้งหมด ผัดไฟแรง 2 นาที ปิดฝา 1 นาทีให้เส้นสุกด้วยความชื้นที่ติดจากการแช่และซอส เปิดฝาชิมเส้นหนึ่งเส้น ควรยืดหยุ่น เคี้ยวหนึบ และไม่มีไส้ขาวแข็ง"
      ),
      ml(
        "Return the tofu, shrimp, and any juices from the plate. Toss gently for 60–90 seconds until everything is hot and the sauce clings instead of pooling. If the centre of a noodle is still firm, cover for another 30 seconds before checking again.",
        "將豆腐、鮮蝦及盤中肉汁放回鍋裡，輕柔翻拌 60–90 秒，直到整鍋熱透、醬汁附著而不積在鍋底。若麵芯仍硬，再加蓋 30 秒後檢查。",
        "豆腐、海老、皿に出た汁を戻し、60〜90秒やさしく混ぜ、全体が熱く、たれが底にたまらず絡むまで加熱します。麺の芯がまだ硬ければ、さらに30秒ふたをしてから確認します。",
        "두부와 새우, 접시에 나온 육즙을 다시 넣고 부드럽게 60–90초 볶아 전체가 뜨겁고 소스가 고이지 않고 면에 붙게 합니다. 면 중심이 여전히 단단하면 뚜껑을 덮어 30초 더 익힌 뒤 확인하세요.",
        "ใส่เต้าหู้ กุ้ง และน้ำจากจานกลับลงกระทะ คลุกเบา ๆ 60–90 วินาทีจนร้อนทั่วและซอสเกาะเส้นไม่ขังก้นกระทะ หากกลางเส้นยังแข็ง ปิดฝาอีก 30 วินาทีก่อนตรวจซ้ำ"
      ),
      ml(
        "Add all 100 g bean sprouts and all 40 g chives. Toss over heat for 1–2 minutes until the sprouts are hot throughout and the chives wilt but stay green; do not reserve raw sprouts as garnish.",
        "加入全部 100 公克豆芽與 40 公克韭菜，持續翻炒 1–2 分鐘，至豆芽整體熱透、韭菜軟化但仍翠綠；不要保留生豆芽作配料。",
        "もやし100g全量とにら40g全量を加え、1〜2分炒めます。もやし全体が熱くなり、にらが緑を保ったまましんなりしたら火を止めます。生もやしは薬味に残しません。",
        "숙주 100g 전량과 부추 40g 전량을 넣고 1–2분 볶아 숙주 속까지 뜨겁고 부추는 초록색을 유지하며 숨이 죽게 합니다. 생숙주를 고명으로 남기지 마세요.",
        "ใส่ถั่วงอก 100 กรัมและกุยช่าย 40 กรัมทั้งหมด ผัดอีก 1–2 นาทีจนถั่วงอกร้อนทั่วและกุยช่ายอ่อนแต่ยังเขียว อย่าเหลือถั่วงอกดิบไว้โรยหน้า"
      ),
      ml(
        "Divide immediately among 4 warm plates. Sprinkle with the 30 g peanuts and optional chile; serve wedges from both limes on the side so each person can squeeze them over the noodles.",
        "立即平均分到 4 個溫盤，撒上 30 公克花生與可選辣椒碎；將 2 顆萊姆切角另放，讓各人自行擠汁。",
        "温めた4皿にすぐ均等に盛り、ピーナッツ30gと好みで唐辛子を散らします。ライム2個分はくし形にして添え、各自で麺に搾ります。",
        "따뜻한 접시 4개에 바로 고르게 담고 땅콩 30g과 선택한 고춧가루를 뿌립니다. 라임 2개는 웨지로 곁들여 각자 면에 짜 먹게 합니다.",
        "แบ่งใส่จานอุ่น 4 ใบทันที โรยถั่วลิสง 30 กรัมและพริกป่นตามชอบ เสิร์ฟมะนาว 2 ลูกที่หั่นซีกแยกให้แต่ละคนบีบใส่เส้น"
      )
    ],
    tips: [
      ml("Have every bowl ready before the wok is hot; the whole stir-fry takes only about 10 minutes.", "炒鍋加熱前先備齊所有材料；整段快炒約 10 分鐘。", "鍋を熱する前に材料をすべて並べます。炒め時間は約10分です。", "웍을 달구기 전에 재료를 모두 준비하세요. 볶는 시간은 약 10분입니다.", "จัดวัตถุดิบทุกอย่างให้พร้อมก่อนตั้งกระทะ ช่วงผัดใช้เวลาราว 10 นาที"),
      ml("Drain noodles while they still have a firm centre; they finish softening in the covered wok.", "河粉中心仍有硬度時就瀝乾；之後在加蓋炒鍋中完成軟化。", "麺は中心に硬さが残るうちに水を切り、ふたをした鍋で仕上げます。", "면 중심이 단단할 때 물을 빼세요. 뚜껑 덮은 웍에서 마저 익습니다.", "สะเด็ดเส้นขณะที่กลางยังแน่น แล้วให้สุกต่อในกระทะปิดฝา"),
      ml("Cook all bean sprouts in the wok and keep raw seafood tools separate from ready-to-eat garnishes.", "豆芽全部在鍋中炒熟，生海鮮用具與即食配料分開。", "もやしはすべて鍋で加熱し、生の魚介を扱った道具をそのまま薬味に使いません。", "숙주는 전부 웍에서 익히고 생해산물에 쓴 도구를 바로 고명에 사용하지 마세요.", "ผัดถั่วงอกทั้งหมดให้สุก และแยกอุปกรณ์อาหารทะเลดิบจากเครื่องเคียงพร้อมกิน")
    ],
    mistakes: [
      ml("If noodles snap in the wok, they were soaked too long or stirred roughly; soak only until bendable and lift-turn with tongs.", "河粉在鍋中折斷，多半是泡太久或翻動太粗；只泡到能彎，之後用夾子提翻。", "麺が鍋で切れる場合は戻しすぎか混ぜ方が強すぎます。曲がる程度で水を切り、トングで持ち上げて返します。", "웍에서 면이 끊어지면 너무 오래 불렸거나 거칠게 저은 것입니다. 휘어질 정도만 불리고 집게로 들어 올려 뒤집으세요.", "หากเส้นขาดในกระทะ แช่นานไปหรือคลุกแรงเกิน แช่แค่งอได้แล้วใช้คีมยกพลิก"),
      ml("If the sauce is watery, keep tossing uncovered for 30–60 seconds; if it tastes harsh, balance it with lime at the table instead of adding unmeasured sugar.", "若醬汁太稀，開蓋再翻炒 30–60 秒；若味道太銳，讓食客上桌後加萊姆平衡，不要未量測便加糖。", "たれが水っぽければふたを外して30〜60秒炒めます。味が強ければ計量外の砂糖を足さず、食卓でライムを搾って調整します。", "소스가 묽으면 뚜껑을 열고 30–60초 더 볶으세요. 맛이 강하면 계량하지 않은 설탕을 더하지 말고 식탁에서 라임으로 조절하세요.", "หากซอสเหลวให้ผัดเปิดฝาอีก 30–60 วินาที หากรสจัดให้บีบมะนาวตอนเสิร์ฟแทนการเติมน้ำตาลนอกสูตร")
    ],
    storage: ml(
      "Refrigerate in shallow covered containers within 2 hours, keeping the refrigerator at 4°C/40°F or below; use within 2 days for best quality. Reheat once, stirring, until steaming and 74°C/165°F throughout.",
      "2 小時內分裝淺盒加蓋冷藏，冰箱維持 4°C／40°F 以下；為保最佳品質於 2 天內食用。復熱一次並攪拌，直到冒蒸氣且各處達 74°C／165°F。",
      "浅い容器に入れて覆い、2時間以内に4°C/40°F以下で冷蔵し、品質のため2日以内に食べます。一度だけ、混ぜながら湯気が立ち、全体が74°C/165°Fになるまで再加熱します。",
      "얕은 밀폐 용기에 나눠 담아 2시간 안에 4°C/40°F 이하로 냉장하고 품질을 위해 2일 안에 먹습니다. 한 번만 저어 가며 김이 나고 전체가 74°C/165°F가 될 때까지 재가열하세요.",
      "แบ่งใส่ภาชนะตื้นปิดฝา แช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า และกินภายใน 2 วันเพื่อคุณภาพที่ดี อุ่นซ้ำครั้งเดียว คนให้ทั่วจนมีไอและถึง 74°C/165°F ทุกส่วน"
    ),
    safetySources: [
      ["shrimp doneness, seafood handling, and serving limits", seafoodGuide],
      ["safe internal temperatures, including eggs and leftovers", temperatureChart],
      ["refrigeration and cross-contamination controls", handlingGuide],
      ["cold storage temperatures and times", coldStorageChart]
    ]
  });
}

function revisePannaCotta(recipe) {
  reviseRecipe(recipe, {
    id: "panna-cotta",
    prepMinutes: 335,
    cookMinutes: 10,
    titles: [
      ml("Bloom the gelatin", "泡發吉利丁", "ゼラチンをふやかす", "젤라틴 불리기", "แช่เจลาตินให้อิ่มน้ำ"),
      ml("Warm and infuse the cream", "加熱並浸出香草奶油", "クリームを温めて香りを移す", "크림을 데워 바닐라 향 내기", "อุ่นครีมและแช่กลิ่นวานิลลา"),
      ml("Dissolve the gelatin", "溶解吉利丁", "ゼラチンを溶かす", "젤라틴 녹이기", "ละลายเจลาติน"),
      ml("Fill, cool, and chill", "分杯、放涼並冷藏", "型に注ぎ、冷まして冷やす", "틀에 붓고 식혀 냉장하기", "เทใส่พิมพ์ พักให้เย็นและแช่"),
      ml("Unmould and serve", "脫模上桌", "型から外して供する", "틀에서 빼서 내기", "แกะพิมพ์และเสิร์ฟ")
    ],
    bodies: [
      ml(
        "Pour 60 ml of the measured cold milk into a small bowl. Sprinkle 6 g powdered gelatin evenly over it and leave for 5 minutes until the granules swell and no dry powder remains.",
        "取已量好的冷牛奶 60 毫升放入小碗，將 6 公克吉利丁粉均勻撒在表面，靜置 5 分鐘，直到顆粒吸水膨脹、沒有乾粉。",
        "計量した冷たい牛乳60mlを小鉢に入れ、粉ゼラチン6gを全体に振り入れます。粒がふくらみ、乾いた粉が残らなくなるまで5分置きます。",
        "계량한 차가운 우유 60ml를 작은 볼에 붓고 젤라틴 가루 6g을 골고루 뿌립니다. 알갱이가 불고 마른 가루가 남지 않도록 5분 둡니다.",
        "เทนมเย็นที่ตวงไว้ 60 มล.ลงชามเล็ก โรยเจลาตินผง 6 กรัมให้ทั่ว พัก 5 นาทีจนเม็ดพองและไม่เหลือผงแห้ง"
      ),
      ml(
        "Put 500 ml cream, the remaining 90 ml milk, 75 g sugar, 1 g salt, vanilla seeds, and the pod in a saucepan. Warm over medium-low to 75–80°C, stirring until the sugar dissolves; do not boil. Remove from heat and steep 5 minutes.",
        "將 500 毫升鮮奶油、剩餘 90 毫升牛奶、75 公克糖、1 公克鹽、香草籽與莢放入鍋中。中小火加熱至 75–80°C，攪至糖溶但不可煮沸；離火浸香 5 分鐘。",
        "生クリーム500ml、残りの牛乳90ml、砂糖75g、塩1g、バニラの種とさやを鍋に入れます。中弱火で75〜80°Cまで温め、砂糖を溶かします。沸騰させず、火から外して5分香りを移します。",
        "냄비에 크림 500ml, 남은 우유 90ml, 설탕 75g, 소금 1g, 바닐라 씨와 꼬투리를 넣습니다. 중약불에서 75–80°C까지 저어 설탕을 녹이되 끓이지 마세요. 불에서 내려 5분 우립니다.",
        "ใส่ครีม 500 มล. นมที่เหลือ 90 มล. น้ำตาล 75 กรัม เกลือ 1 กรัม เมล็ดและฝักวานิลลาลงหม้อ อุ่นไฟกลางอ่อนถึง 75–80°C คนให้น้ำตาลละลายแต่ห้ามเดือด ยกลงพัก 5 นาที"
      ),
      ml(
        "Remove the vanilla pod. Whisk the bloomed gelatin into the warm cream for 30–45 seconds until fully dissolved. Lift a spoonful to check for grains; if any remain, stir gently over low heat without letting the mixture boil.",
        "取出香草莢，將泡發吉利丁拌入溫熱奶油液 30–45 秒至完全溶解。舀起檢查是否有顆粒；若仍有，開小火輕攪至溶解，勿讓液體沸騰。",
        "バニラのさやを取り出し、ふやかしたゼラチンを温かいクリームに加えて30〜45秒、完全に溶けるまで混ぜます。スプーンですくって粒がないか確認し、残っていれば沸騰させず弱火でやさしく混ぜます。",
        "바닐라 꼬투리를 건져내고 불린 젤라틴을 따뜻한 크림에 넣어 30–45초 완전히 녹을 때까지 젓습니다. 한 숟가락 떠서 알갱이가 없는지 확인하고 남아 있으면 끓이지 말고 약불에서 부드럽게 저으세요.",
        "ตักฝักวานิลลาออก ใส่เจลาตินที่แช่แล้วลงในครีมอุ่น คน 30–45 วินาทีจนละลายหมด ตักขึ้นตรวจว่าไม่มีเม็ด หากยังมีให้อุ่นไฟอ่อนและคนเบา ๆ โดยไม่ให้เดือด"
      ),
      ml(
        "Pour evenly into 6 lightly oiled moulds or glasses of about 120 ml each. Let stand 20 minutes, cover, then refrigerate at 0–4°C/32–40°F for at least 5 hours, preferably overnight, until gently set.",
        "平均倒入 6 個薄抹油、容量約 120 毫升的模具或玻璃杯，靜置 20 分鐘後加蓋，置於 0–4°C／32–40°F 冷藏至少 5 小時，最好冷藏過夜至柔嫩定型。",
        "薄く油を塗った約120mlの型またはグラス6個に均等に注ぎます。20分置いてから覆い、0〜4°C/32〜40°Fで最低5時間、できれば一晩、やわらかく固まるまで冷やします。",
        "얇게 기름칠한 약 120ml 몰드나 잔 6개에 고르게 붓습니다. 20분 둔 뒤 덮고 0–4°C/32–40°F에서 최소 5시간, 가능하면 하룻밤 부드럽게 굳을 때까지 냉장합니다.",
        "เทแบ่งเท่า ๆ กันลงพิมพ์หรือแก้วประมาณ 120 มล. 6 ใบที่ทาน้ำมันบาง ๆ พัก 20 นาทีแล้วปิดฝา แช่ที่ 0–4°C/32–40°F อย่างน้อย 5 ชั่วโมง หรือข้ามคืนจนเซ็ตนุ่ม"
      ),
      ml(
        "For moulds, dip the base in warm water for 5–8 seconds, loosen the rim with a thin blade, and invert onto a chilled plate. The panna cotta should release as a smooth dome and tremble gently; serve cold.",
        "使用模具時，底部浸溫水 5–8 秒，以薄刀沿邊緣劃開，再倒扣到冰涼盤子上。成品應順利脫出成光滑圓頂並輕柔晃動；冷食。",
        "型の場合は底を温水に5〜8秒浸し、薄い刃で縁をはがして冷たい皿に返します。なめらかなドーム状に外れ、やさしく揺れる状態が目安です。冷たいまま供します。",
        "몰드형은 바닥을 따뜻한 물에 5–8초 담그고 얇은 칼로 가장자리를 떼어 차가운 접시에 뒤집습니다. 매끈한 돔 모양으로 빠져 부드럽게 흔들리면 되며 차게 냅니다.",
        "ถ้าใช้พิมพ์ จุ่มก้นพิมพ์ในน้ำอุ่น 5–8 วินาที ใช้มีดบางคลายขอบแล้วคว่ำลงจานเย็น ควรหลุดเป็นโดมเรียบและสั่นนุ่ม เสิร์ฟเย็น"
      )
    ],
    tips: [
      ml("Sprinkle gelatin over cold milk instead of dumping it in a heap; an even bloom prevents rubbery clumps.", "吉利丁粉要均勻撒在冷牛奶上，不要整堆倒入；均勻泡發可避免橡皮狀結塊。", "ゼラチンは冷たい牛乳に均一に振り入れ、一か所に固めて落とさないようにします。むらなくふやかすと塊を防げます。", "젤라틴을 차가운 우유 위에 고르게 뿌리고 한곳에 쏟지 마세요. 고르게 불려야 고무 같은 덩어리가 생기지 않습니다.", "โรยเจลาตินให้ทั่วนมเย็น อย่าเทกองเดียว การบลูมสม่ำเสมอช่วยป้องกันก้อนเหนียว"),
      ml("Use six similar-size glasses so the 5-hour chill sets every portion at the same rate.", "使用大小相近的 6 個杯子，讓 5 小時冷藏能使每份同時定型。", "同じ大きさのグラス6個を使うと、5時間の冷却で均等に固まります。", "크기가 비슷한 잔 6개를 사용하면 5시간 동안 고르게 굳습니다.", "ใช้แก้วขนาดใกล้กัน 6 ใบเพื่อให้ทุกส่วนเซ็ตพร้อมกันใน 5 ชั่วโมง"),
      ml("Keep the dessert cold through unmoulding and serving; warm water is only for loosening the mould briefly.", "脫模與上桌前都維持冷藏；溫水只短暫用來鬆開模具。", "型外しと提供まで冷たい状態を保ちます。温水は型を短時間ゆるめるためだけに使います。", "틀에서 빼고 낼 때까지 차갑게 두세요. 따뜻한 물은 몰드를 잠깐 느슨하게 하는 용도뿐입니다.", "เก็บขนมให้เย็นจนถึงเวลาแกะและเสิร์ฟ น้ำอุ่นใช้คลายพิมพ์เพียงชั่วครู่")
    ],
    mistakes: [
      ml("If the cream mixture boils, it can scorch and develop a skin; keep it at a gentle steaming temperature and take it off the heat at 75–80°C.", "奶油液煮沸容易焦底並結皮；只加熱到輕冒蒸氣，達 75–80°C 就離火。", "クリームを沸騰させると焦げや膜の原因になります。軽く湯気が立つ程度にし、75〜80°Cで火を止めます。", "크림을 끓이면 눌어붙거나 막이 생길 수 있습니다. 약하게 김이 날 정도로만 데우고 75–80°C에서 불을 끄세요.", "หากครีมเดือดอาจไหม้และเกิดแผ่นหน้า ให้อุ่นเพียงมีไออ่อน ๆ และยกลงเมื่อถึง 75–80°C"),
      ml("If it will not unmould, dip the mould 2 seconds longer and loosen the edge again; an overlong warm-water dip melts the outer layer.", "若脫不下來，模具再浸溫水 2 秒並重新鬆邊；浸太久會融化外層。", "外れにくい場合は温水にさらに2秒浸し、縁をもう一度ゆるめます。長く浸すと外側が溶けます。", "잘 빠지지 않으면 따뜻한 물에 2초 더 담그고 가장자리를 다시 풉니다. 오래 담그면 바깥층이 녹습니다.", "หากยังไม่หลุด ให้จุ่มน้ำอุ่นเพิ่ม 2 วินาทีแล้วคลายขอบอีกครั้ง การจุ่มนานเกินทำให้ผิวละลาย")
    ],
    storage: ml(
      "Cover and refrigerate at 4°C/40°F or below; return servings to the refrigerator within 2 hours and use within 3 days. Keep the dessert chilled until serving and do not refreeze after it has thawed.",
      "加蓋冷藏於 4°C／40°F 以下；每份離開冷藏後 2 小時內放回冰箱，並於 3 天內食用。上桌前持續冷藏，解凍後不要再次冷凍。",
      "覆って4°C/40°F以下で冷蔵し、盛り付けた分も2時間以内に冷蔵庫へ戻して3日以内に食べます。提供まで冷やし、解凍後は再冷凍しません。",
      "덮어서 4°C/40°F 이하로 냉장하고, 꺼낸 분량은 2시간 안에 냉장고로 돌려보내 3일 안에 먹습니다. 낼 때까지 차게 두고 해동한 뒤 다시 얼리지 마세요.",
      "ปิดฝาแช่เย็นที่ 4°C/40°F หรือต่ำกว่า นำส่วนที่ยกออกกลับเข้าตู้เย็นภายใน 2 ชั่วโมงและกินภายใน 3 วัน เก็บให้เย็นจนเสิร์ฟและอย่าแช่แข็งซ้ำหลังละลาย"
    ),
    safetySources: [
      ["refrigeration and the two-hour limit for perishable food", handlingGuide],
      ["cold storage temperature guidance", coldStorageChart]
    ]
  });
}

function revisePizzaMargherita(recipe) {
  reviseRecipe(recipe, {
    id: "pizza-margherita",
    prepMinutes: 175,
    cookMinutes: 10,
    titles: [
      ml("Mix, rest, and knead the dough", "混合、靜置並揉麵糰", "生地を混ぜて休ませ、こねる", "반죽 섞고 휴지한 뒤 치대기", "ผสม พัก และนวดแป้ง"),
      ml("Bulk-ferment and divide", "第一次發酵並分割", "一次発酵して分割する", "1차 발효 후 나누기", "หมักรอบแรกและแบ่งก้อน"),
      ml("Preheat the stone and ready the toppings", "預熱石板並備好配料", "石板を予熱し、具材を準備する", "스톤 예열하고 토핑 준비하기", "อุ่นหินอบและเตรียมหน้า"),
      ml("Stretch and top two rounds", "拉開麵糰並完成兩張披薩", "生地を広げて2枚に具をのせる", "도우를 펴서 두 장 토핑하기", "ยืดแป้งและใส่หน้าสองถาด"),
      ml("Bake and check the crust", "烘烤並確認餅皮熟度", "焼いてクラストを確認する", "굽고 크러스트 익힘 확인하기", "อบและตรวจแป้ง")
    ],
    bodies: [
      ml(
        "Mix 500 g flour, 2 g instant yeast, and 325 ml cool water until no dry flour remains. Cover and rest 15 minutes. Add 12 g salt and knead 8–10 minutes until smooth, elastic, and slightly tacky rather than wet.",
        "將 500 公克麵粉、2 公克速發酵母與 325 毫升涼水混合至沒有乾粉，蓋起靜置 15 分鐘。加入 12 公克鹽揉 8–10 分鐘，直到麵糰光滑、有彈性且略帶黏性、不濕爛。",
        "小麦粉500g、インスタントドライイースト2g、冷水325mlを混ぜ、粉気がなくなったら覆って15分休ませます。塩12gを加え、なめらかで弾力があり、べたつきすぎない状態まで8〜10分こねます。",
        "밀가루 500g, 인스턴트 이스트 2g, 찬물 325ml를 마른 가루가 없게 섞고 덮어 15분 둡니다. 소금 12g을 넣고 매끈하고 탄력 있으며 질척이지 않을 때까지 8–10분 치댑니다.",
        "ผสมแป้ง 500 กรัม ยีสต์แห้ง 2 กรัม และน้ำเย็น 325 มล.จนไม่เหลือแป้งแห้ง ปิดพัก 15 นาที ใส่เกลือ 12 กรัม นวด 8–10 นาทีจนเรียบ ยืดหยุ่น และเหนียวเล็กน้อยแต่ไม่แฉะ"
      ),
      ml(
        "Cover the dough and ferment at 20–24°C for about 90 minutes, until visibly expanded by roughly half and softly aerated. Divide into 2 equal balls, tuck each seam underneath, cover, and rest another 45 minutes until relaxed.",
        "蓋好麵糰，在 20–24°C 發酵約 90 分鐘，直到明顯膨大約一半且內部有柔軟氣孔。平均分成 2 球，收口朝下，蓋好再醒 45 分鐘至鬆弛。",
        "生地を覆い、20〜24°Cで約90分、目に見えて約1.5倍にふくらみ気泡ができるまで発酵させます。2等分して丸め、綴じ目を下にして覆い、さらに45分休ませます。",
        "반죽을 덮고 20–24°C에서 약 90분, 눈에 띄게 약 1.5배 부풀고 공기가 찰 때까지 발효합니다. 두 개로 똑같이 나누어 둥글리고 이음매를 아래로 놓아 덮은 뒤 45분 더 둡니다.",
        "ปิดแป้ง หมักที่ 20–24°C ราว 90 นาทีจนพองขึ้นประมาณครึ่งหนึ่งและมีอากาศ แบ่งเท่า ๆ กัน 2 ก้อน เก็บรอยต่อไว้ด้านล่าง ปิดพักอีก 45 นาทีจนคลายตัว"
      ),
      ml(
        "Set a pizza stone or steel on an upper-middle rack and preheat the oven at its maximum setting, ideally 250–290°C, for at least 45 minutes; this can overlap the dough rest. Crush the 400 g tomatoes and stir in 3 g salt. Drain the 250 g mozzarella well, then tear it into small pieces; keep the basil and 20 ml oil ready.",
        "將披薩石或鋼板放在烤箱中上層，以最高溫預熱，理想為 250–290°C，至少 45 分鐘；可與麵糰醒發重疊進行。壓碎 400 公克番茄並拌入 3 公克鹽。250 公克莫札瑞拉充分瀝乾後撕小塊，並備好羅勒與 20 毫升橄欖油。",
        "ピザストーンまたはスチールを上段寄りの中段に置き、オーブンを最高温度（理想は250〜290°C）で45分以上予熱します。生地の休ませ時間と重ねられます。トマト400gをつぶして塩3gを混ぜ、モッツァレラ250gはよく水を切って小さくちぎります。バジルと油20mlも用意します。",
        "피자 스톤이나 스틸을 위쪽 중간 선반에 놓고 오븐을 최고 온도, 이상적으로 250–290°C로 최소 45분 예열합니다. 도우 휴지와 겹쳐 진행할 수 있습니다. 토마토 400g을 으깨 소금 3g과 섞고 모차렐라 250g은 물기를 충분히 빼 잘게 찢습니다. 바질과 기름 20ml도 준비합니다.",
        "วางหินหรือเหล็กอบพิซซ่าที่ชั้นกลางค่อนไปทางบน อุ่นเตาที่อุณหภูมิสูงสุด โดยเหมาะที่ 250–290°C อย่างน้อย 45 นาที ระหว่างพักแป้งได้ บี้มะเขือเทศ 400 กรัมแล้วคลุกเกลือ 3 กรัม สะเด็ดมอสซาเรลลา 250 กรัมให้แห้งแล้วฉีกชิ้นเล็ก เตรียมโหระพาและน้ำมัน 20 มล."
      ),
      ml(
        "On a lightly floured surface, press one dough ball from the centre outward and stretch to about 30 cm, leaving a 2 cm rim. Spread half the salted tomato thinly, then add half the mozzarella, basil, and oil. Repeat with the second ball; keep toppings light so the centres bake through.",
        "在薄撒麵粉的檯面上，從一球麵糰中央向外壓開並拉至約 30 公分，保留 2 公分餅邊。薄薄鋪上一半鹽漬番茄，再放一半莫札瑞拉、羅勒與橄欖油。另一球同樣操作；配料勿放太厚，讓中心能烤熟。",
        "打ち粉をした台で生地1個を中央から外へ押し広げ、約30cmに伸ばして縁を2cm残します。塩を混ぜたトマトの半量を薄く広げ、モッツァレラ、バジル、油も半量ずつのせます。2個目も同様にし、中央まで焼けるよう具を盛りすぎません。",
        "가볍게 밀가루를 뿌린 곳에서 도우 한 덩이를 가운데에서 바깥으로 눌러 약 30cm로 펴고 가장자리 2cm는 남깁니다. 간한 토마토 절반을 얇게 바르고 모차렐라, 바질, 기름도 절반씩 올립니다. 두 번째 도우도 반복하되 가운데까지 익도록 토핑을 과하게 올리지 마세요.",
        "บนโต๊ะโรยแป้งบาง ๆ กดแป้งหนึ่งก้อนจากกลางออกแล้วดึงให้ได้ราว 30 ซม. เหลือขอบ 2 ซม. ทามะเขือเทศปรุงเกลือครึ่งหนึ่งบาง ๆ แล้วใส่มอสซาเรลลา โหระพา และน้ำมันครึ่งหนึ่ง ทำซ้ำกับแป้งอีกก้อน อย่าใส่หน้าแน่นเพื่อให้ตรงกลางสุก"
      ),
      ml(
        "Slide one pizza onto the fully heated stone or steel and bake at maximum heat for 4–6 minutes, turning once if one side colours faster. The rim should puff and blister, the underside should show brown spots, and the cheese should be melted with no wet centre. Bake the second and serve both hot.",
        "將一張披薩滑到完全預熱的石板或鋼板上，以最高溫烤 4–6 分鐘；若一側先上色就轉向一次。餅邊應膨起並有焦斑，底部出現褐色斑點，起司融化且中心不濕。第二張照做，兩張趁熱上桌。",
        "ピザを1枚、十分に熱したストーンまたはスチールへ滑らせ、最高温度で4〜6分焼きます。一方が先に色づけば一度回します。縁はふくらみ斑点状に焦げ、底に焼き色がつき、中心が水っぽくなくチーズが溶けている状態が目安です。2枚目も焼き、熱いうちに供します。",
        "피자 한 장을 충분히 달군 스톤이나 스틸에 밀어 넣고 최고 온도에서 4–6분 굽습니다. 한쪽이 먼저 색나면 한 번 돌립니다. 가장자리는 부풀어 점박이로 그을리고 바닥에는 갈색 반점이 생기며 가운데가 질척이지 않고 치즈가 녹아야 합니다. 두 번째도 구워 뜨거울 때 냅니다.",
        "เลื่อนพิซซ่าหนึ่งถาดลงบนหินหรือเหล็กที่ร้อนเต็มที่ อบไฟสูงสุด 4–6 นาที หมุนหนึ่งครั้งหากด้านหนึ่งสีเข้มเร็ว ขอบควรพองและมีจุดเกรียม ใต้แป้งมีจุดน้ำตาล ชีสละลายและตรงกลางไม่แฉะ อบอีกถาดและเสิร์ฟร้อน"
      )
    ],
    tips: [
      ml("A scale makes the low 2 g yeast dose reliable; weigh it rather than estimating from a spoon.", "酵母只有 2 公克，用秤量才可靠，不要用湯匙估計。", "イーストは2gと少量なので、スプーンで推測せず秤で量ります。", "이스트는 2g으로 적으니 숟가락으로 어림잡지 말고 저울로 계량하세요.", "ยีสต์มีเพียง 2 กรัม ควรชั่งแทนการกะด้วยช้อน"),
      ml("Use dough expansion and a relaxed feel as the fermentation cues; cooler rooms need more time and warmer rooms less.", "以麵糰膨脹程度與鬆弛觸感判斷發酵；室溫較低需更久，較高則更快。", "発酵は膨らみと生地のゆるみで判断します。室温が低ければ時間がかかり、高ければ短くなります。", "발효는 부피와 반죽의 이완감으로 판단하세요. 방이 차가우면 더 걸리고 따뜻하면 빨라집니다.", "ดูปริมาตรและความคลายของแป้งเป็นหลัก ห้องเย็นใช้เวลานาน ห้องอุ่นใช้เวลาน้อย"),
      ml("Drain mozzarella thoroughly and keep the tomato layer thin to prevent a soggy centre.", "莫札瑞拉務必瀝乾，番茄層也要薄，避免中心濕軟。", "モッツァレラは十分に水を切り、トマトを薄く塗ると中心が水っぽくなりません。", "모차렐라 물기를 충분히 빼고 토마토를 얇게 발라야 가운데가 질척해지지 않습니다.", "สะเด็ดมอสซาเรลลาให้ดีและทามะเขือเทศบาง ๆ เพื่อป้องกันกลางแฉะ")
    ],
    mistakes: [
      ml("If dough springs back while stretching, cover and rest it 10 minutes; forcing it tears the gluten skin.", "若麵糰拉開時回縮，蓋起再休息 10 分鐘；硬拉會撕裂麵筋表面。", "伸ばすと生地が戻る場合は覆って10分休ませます。無理に引くと表面が裂けます。", "도우가 펴다가 되돌아오면 덮어 10분 쉬게 하세요. 억지로 당기면 표면이 찢어집니다.", "หากแป้งหดกลับขณะยืด ให้คลุมพัก 10 นาที การฝืนดึงจะทำให้ผิวแป้งฉีก"),
      ml("If the base is pale or soft, the stone was not fully heated or the topping was too wet; extend the preheat and drain the cheese again.", "若底部蒼白或軟塌，通常是石板未熱透或配料太濕；延長預熱並重新瀝乾起司。", "底が白く柔らかい場合はストーンの予熱不足か具の水分過多です。予熱を延ばし、チーズを再度水切りします。", "바닥이 창백하거나 부드러우면 스톤 예열이 부족하거나 토핑이 젖은 것입니다. 예열을 늘리고 치즈 물기를 다시 빼세요.", "หากฐานซีดหรือนิ่ม หินยังไม่ร้อนพอหรือหน้าเปียกเกิน ให้อุ่นต่อและสะเด็ดชีสอีกครั้ง")
    ],
    storage: ml(
      "Cool leftover slices briefly and refrigerate in a covered container within 2 hours at 4°C/40°F or below; use within 3 days. Reheat until steaming hot throughout (74°C/165°F); an uncovered hot oven helps restore the crust.",
      "剩下披薩稍放涼後，2 小時內加蓋冷藏於 4°C／40°F 以下，3 天內食用。復熱至整片冒蒸氣、中心達 74°C／165°F；用不加蓋的熱烤箱可恢復餅皮口感。",
      "残りは少し冷まして覆い、2時間以内に4°C/40°F以下で冷蔵し、3日以内に食べます。全体が湯気を立て、中心74°C/165°Fになるまで再加熱します。覆わずに高温のオーブンで温めるとクラストが戻ります。",
      "남은 피자는 잠깐 식힌 뒤 덮어 2시간 안에 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 전체가 김이 나고 중심이 74°C/165°F가 되게 재가열하세요. 덮지 않고 뜨거운 오븐에 데우면 크러스트가 살아납니다.",
      "พักพิซซ่าที่เหลือให้คลายร้อนเล็กน้อย ปิดฝาแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วัน อุ่นจนมีไอทั่วและกลางถึง 74°C/165°F อุ่นในเตาร้อนแบบไม่คลุมช่วยให้แป้งกรอบ"
    ),
    safetySources: [
      ["two-hour refrigeration limit and safe reheating", handlingGuide],
      ["cold storage guidance for pizza", coldStorageChart],
      ["safe internal temperature for reheated leftovers", temperatureChart]
    ]
  });
}

function reviseSauerbraten(recipe) {
  reviseRecipe(recipe, {
    id: "sauerbraten",
    prepMinutes: 4365,
    cookMinutes: 220,
    titles: [
      ml("Make the cold marinade", "調製冷藏醃汁", "冷たい漬けだれを作る", "차가운 마리네이드 만들기", "ทำน้ำหมักเย็น"),
      ml("Marinate the beef safely", "安全冷藏醃牛肉", "牛肉を安全に漬ける", "소고기 안전하게 재우기", "หมักเนื้อในตู้เย็นอย่างปลอดภัย"),
      ml("Drain and season", "瀝乾並調味", "水気を切って下味をつける", "건져 물기 닦고 간하기", "ยกขึ้น ซับแห้ง และปรุงรส"),
      ml("Brown the roast", "將牛肉煎上色", "牛肉に焼き色をつける", "고기 갈색 내기", "จี่เนื้อให้เป็นสีน้ำตาล"),
      ml("Brown the vegetables", "炒香蔬菜", "野菜を炒める", "채소 볶기", "ผัดผักให้หอม"),
      ml("Braise until fork-tender", "燉至叉子可輕易插入", "フォークが通るまで煮込む", "포크가 쉽게 들어갈 때까지 브레이즈하기", "ตุ๋นจนส้อมจิ้มได้ง่าย"),
      ml("Rest the beef", "靜置牛肉", "牛肉を休ませる", "고기 휴지하기", "พักเนื้อ"),
      ml("Strain and finish the gravy", "過濾並完成肉汁醬", "こしてグレービーを仕上げる", "체에 걸러 그레이비 완성하기", "กรองและเคี่ยวน้ำราด"),
      ml("Slice and serve six portions", "切片並分成六份上桌", "切り分けて6人分に盛る", "썰어 6인분 담기", "หั่นและแบ่งเสิร์ฟ 6 ที่")
    ],
    bodies: [
      ml(
        "In a non-reactive glass or food-safe container, combine all 750 ml red wine and 375 ml vinegar with half the onions, all the carrots and celeriac, bay leaves, crushed juniper, cloves, and allspice. Choose a snug container so the liquid can surround the roast.",
        "在玻璃或食品級非反應容器中，混合全部 750 毫升紅酒、375 毫升醋、半份洋蔥、全部紅蘿蔔與芹菜根、月桂葉、壓碎杜松子、丁香和多香果。容器選緊密尺寸，讓液體能包圍肉塊。",
        "ガラスまたは食品用の非反応性容器で、赤ワイン750ml全量、酢375ml、玉ねぎ半量、にんじんとセロリアック全量、ローリエ、軽くつぶしたジュニパーベリー、クローブ、オールスパイスを合わせます。肉を液に包める大きさの容器を使います。",
        "유리 또는 식품용 비반응 용기에 레드와인 750ml 전량, 식초 375ml, 양파 절반, 당근과 셀러리악 전량, 월계수잎, 으깬 주니퍼베리, 정향, 올스파이스를 섞습니다. 고기를 액체가 감쌀 수 있는 알맞은 크기의 용기를 고르세요.",
        "ผสมไวน์แดง 750 มล.ทั้งหมด น้ำส้มสายชู 375 มล. หอมครึ่งหนึ่ง แครอตและเซเลอริแอกทั้งหมด ใบกระวาน จูนิเปอร์บด กานพลู และออลสไปซ์ในภาชนะแก้วหรือภาชนะอาหารที่ไม่ทำปฏิกิริยา เลือกภาชนะพอดีให้ของเหลวโอบเนื้อได้"
      ),
      ml(
        "Place the 1.5 kg roast in the marinade, cover, and refrigerate at 4°C/40°F or below for 3 days (72 hours). Turn it once every 24 hours with clean tongs so all sides contact the marinade; never leave it to marinate on the counter.",
        "將 1.5 公斤牛肉放入醃汁，蓋好並以 4°C／40°F 以下冷藏 3 天（72 小時）。每 24 小時用乾淨夾子翻面一次，使各面接觸醃汁；不可放在室溫醃漬。",
        "牛肉1.5kgを漬けだれに入れ、覆って4°C/40°F以下で3日（72時間）冷蔵します。清潔なトングで24時間ごとに一度返し、全体にたれを行き渡らせます。室温では漬けません。",
        "소고기 1.5kg를 마리네이드에 담가 덮고 4°C/40°F 이하에서 3일(72시간) 냉장합니다. 깨끗한 집게로 24시간마다 한 번 뒤집어 모든 면에 양념이 닿게 하며 실온에서 재우지 마세요.",
        "ใส่เนื้อ 1.5 กก.ลงในน้ำหมัก ปิดฝาและแช่ที่ 4°C/40°F หรือต่ำกว่า 3 วัน (72 ชั่วโมง) ใช้คีมสะอาดพลิกทุก 24 ชั่วโมงให้ทุกด้านสัมผัสน้ำหมัก อย่าหมักบนเคาน์เตอร์"
      ),
      ml(
        "Lift the roast onto a tray and pat it completely dry. Strain the marinade, keeping the vegetables separate from the liquid; measure 750 ml liquid for the braise. Season the beef with 8 g salt and all 4 g pepper; reserve the remaining 6 g salt for the gravy.",
        "將牛肉取出放在托盤上並徹底擦乾。醃汁過濾後，蔬菜與液體分開；量取 750 毫升液體供燉煮。牛肉先用 8 公克鹽與全部 4 公克胡椒調味，剩下 6 公克鹽留給醬汁。",
        "肉をトレーに上げて完全に水分を拭きます。漬けだれをこし、野菜と液体を分けて、液体750mlを煮込み用に量ります。牛肉に塩8gとこしょう4g全量をまぶし、残りの塩6gはソース用に取っておきます。",
        "고기를 쟁반에 올려 완전히 물기를 닦습니다. 마리네이드를 걸러 채소와 액체를 분리하고 액체 750ml를 브레이즈용으로 계량합니다. 고기에 소금 8g과 후추 4g 전량을 뿌리고 남은 소금 6g은 그레이비용으로 둡니다.",
        "ยกเนื้อวางถาดและซับให้แห้งสนิท กรองน้ำหมักแยกผักกับของเหลว ตวงของเหลว 750 มล.สำหรับตุ๋น ปรุงเนื้อด้วยเกลือ 8 กรัมและพริกไทย 4 กรัมทั้งหมด เก็บเกลืออีก 6 กรัมไว้ปรุงน้ำราด"
      ),
      ml(
        "Heat 35 g clarified butter in a heavy Dutch oven over medium-high heat. Brown the roast on all sides for about 10–12 minutes total, turning with tongs; if the pot is crowded, sear the broad sides first and the ends last.",
        "厚重荷蘭鍋中大火加熱 35 公克澄清奶油。牛肉各面煎上色，總共約 10–12 分鐘，用夾子翻動；若鍋子太擠，先煎寬面，再煎兩端。",
        "厚手のダッチオーブンで澄ましバター35gを中強火で熱します。トングで返しながら全ての面に合計10〜12分焼き色をつけます。鍋が狭ければ広い面から焼き、端は最後に焼きます。",
        "두꺼운 더치오븐에 정제버터 35g을 넣고 중강불로 달굽니다. 집게로 돌려 가며 모든 면을 총 10–12분 갈색으로 굽습니다. 냄비가 좁으면 넓은 면부터 굽고 끝부분은 마지막에 굽습니다.",
        "อุ่นเนยใส 35 กรัมในหม้อดัตช์โอเวนก้นหนาไฟกลางค่อนแรง จี่เนื้อทุกด้านรวมราว 10–12 นาที พลิกด้วยคีม หากหม้อแคบให้จี่ด้านกว้างก่อนแล้วค่อยจี่ปลาย"
      ),
      ml(
        "Transfer the roast to a plate. Add the reserved marinade vegetables and the remaining onions to the same pot; cook about 8 minutes, scraping up browned bits, until the onions soften and the vegetables pick up colour.",
        "牛肉先移至盤中。將醃汁蔬菜與剩餘洋蔥放入原鍋，炒約 8 分鐘並刮起焦香鍋底，直到洋蔥變軟、蔬菜上色。",
        "肉を皿に移します。同じ鍋に漬けだれの野菜と残りの玉ねぎを入れ、焼き付きをこそげながら約8分、玉ねぎがやわらかく野菜に色がつくまで炒めます。",
        "고기를 접시에 옮깁니다. 같은 냄비에 마리네이드 채소와 남은 양파를 넣고 눌어붙은 갈색 조각을 긁어내며 약 8분, 양파가 부드럽고 채소에 색이 날 때까지 볶습니다.",
        "ย้ายเนื้อลงจาน ใส่ผักจากน้ำหมักและหอมที่เหลือลงหม้อเดิม ผัดราว 8 นาที ขูดเศษสีน้ำตาลก้นหม้อจนหอมอ่อนและผักมีสี"
      ),
      ml(
        "Heat the oven to 160°C. Return the roast to the pot with the 750 ml reserved marinade, 80 g crumbled gingerbread, 30 g raisins, and 25 g beet syrup. Bring the liquid to a full boil on the hob, cover, and braise in the oven for 2½–3 hours, turning once. Use a thermometer to confirm the roast reaches at least 63°C/145°F and remains there for 3 minutes during the braise; this is the safety minimum, so continue until a fork enters with little resistance.",
        "烤箱預熱至 160°C。牛肉放回鍋中，加入量好的 750 毫升醃汁、80 公克碎薑餅、30 公克葡萄乾和 25 公克甜菜糖漿。爐上將液體煮至充分沸騰後加蓋，入烤箱燉 2.5–3 小時，中途翻面一次。用溫度計確認牛肉至少達 63°C／145°F，並在燉煮期間維持至少 3 分鐘；這是安全最低熟度，之後仍須續燉至叉子幾乎無阻力即可插入。",
        "オーブンを160°Cに予熱します。肉を鍋に戻し、漬けだれ750ml、砕いたジンジャーブレッド80g、レーズン30g、ビートシロップ25gを加えます。コンロで液体を十分に沸騰させてから蓋をし、オーブンで2時間半〜3時間、途中で一度返して煮込みます。温度計で肉が63°C/145°F以上に達し、煮込み中に3分保たれることを確認します。これは安全上の最低基準なので、その後もフォークがほとんど抵抗なく入るまで煮込みます。",
        "오븐을 160°C로 예열합니다. 고기를 냄비에 되돌리고 마리네이드 750ml, 부순 진저브레드 80g, 건포도 30g, 비트 시럽 25g을 넣습니다. 액체를 가스레인지에서 완전히 끓인 뒤 덮고 오븐에서 2시간 30분–3시간, 중간에 한 번 뒤집어 브레이즈합니다. 온도계로 고기가 최소 63°C/145°F에 도달해 조리 중 3분 유지되는지 확인하세요. 이는 안전 최소 기준이므로 포크가 거의 저항 없이 들어갈 때까지 계속 익힙니다.",
        "อุ่นเตาอบที่ 160°C ใส่เนื้อกลับหม้อ เติมน้ำหมัก 750 มล. ขนมปังขิงบด 80 กรัม ลูกเกด 30 กรัม และน้ำเชื่อมหัวบีต 25 กรัม ต้มของเหลวให้เดือดเต็มที่บนเตาก่อนปิดฝา นำเข้าอบตุ๋น 2½–3 ชั่วโมง พลิกหนึ่งครั้ง ใช้เทอร์โมมิเตอร์ยืนยันว่าเนื้อถึงอย่างน้อย 63°C/145°F และคงระดับนี้ระหว่างตุ๋น 3 นาที นี่เป็นขั้นต่ำด้านความปลอดภัย จึงตุ๋นต่อจนส้อมแทงเข้าได้แทบไม่มีแรงต้าน"
      ),
      ml(
        "Move the tender roast to a board, tent loosely with foil, and rest 20 minutes while you finish the sauce. Keep it whole so the juices settle before slicing.",
        "將軟嫩牛肉移到砧板，鬆鬆覆上鋁箔，靜置 20 分鐘，同時完成醬汁。先保持整塊，讓肉汁穩定再切。",
        "柔らかくなった肉をまな板へ移し、アルミホイルをふんわりかけて20分休ませます。その間にソースを仕上げます。肉汁が落ち着くまで切らずに塊のままにします。",
        "부드러워진 고기를 도마에 옮겨 포일을 느슨하게 덮고 20분 둡니다. 그동안 소스를 마무리하세요. 육즙이 자리 잡도록 썰기 전까지 통째로 둡니다.",
        "ย้ายเนื้อนุ่มลงเขียง คลุมฟอยล์หลวม ๆ พัก 20 นาทีระหว่างทำน้ำราดให้เสร็จ คงเนื้อไว้ทั้งชิ้นเพื่อให้น้ำในเนื้อเข้าที่ก่อนหั่น"
      ),
      ml(
        "Strain the braising liquid into a saucepan, pressing the softened vegetables lightly. Add the remaining 30 g raisins and simmer uncovered for 10–15 minutes until glossy and thinly coats a spoon. Taste, then use up to the remaining 6 g salt as needed.",
        "燉汁過濾到小鍋，輕壓軟化蔬菜。加入剩餘 30 公克葡萄乾，開蓋小滾 10–15 分鐘，直到表面發亮且薄薄附著湯匙。試味後視需要加入剩下最多 6 公克鹽。",
        "煮汁を小鍋にこし、柔らかい野菜を軽く押します。残りのレーズン30gを加え、つやが出てスプーンに薄く絡むまで、ふたをせず10〜15分煮詰めます。味を見て必要なら残りの塩6gまで加えます。",
        "브레이즈 국물을 냄비에 걸러 부드러워진 채소를 가볍게 누릅니다. 남은 건포도 30g을 넣고 뚜껑 없이 10–15분 윤기 나고 숟가락에 얇게 묻을 때까지 끓입니다. 맛을 보고 필요하면 남은 소금 최대 6g을 넣습니다.",
        "กรองน้ำตุ๋นลงหม้อเล็ก กดผักนุ่มเบา ๆ ใส่ลูกเกดที่เหลือ 30 กรัม เคี่ยวเปิดฝา 10–15 นาทีจนเงาและเคลือบช้อนบาง ๆ ชิมแล้วเติมเกลือที่เหลือได้ไม่เกิน 6 กรัมตามต้องการ"
      ),
      ml(
        "Slice the rested roast across the grain into 8–10 mm pieces. Divide the beef among 6 warm plates and spoon over enough gravy to coat. Serve with potato dumplings or boiled potatoes and braised red cabbage.",
        "將靜置後的牛肉逆紋切成 8–10 毫米片。平均分到 6 個溫盤，淋上足以裹住肉片的肉汁醬，搭配馬鈴薯丸子或水煮馬鈴薯及燉紫甘藍。",
        "休ませた肉を繊維に逆らって8〜10mmに切ります。6枚の温めた皿に均等に盛り、肉を覆う程度にソースをかけます。じゃがいも団子またはゆでじゃがいもと赤キャベツ煮を添えます。",
        "휴지한 고기를 결 반대 방향으로 8–10mm 두께로 썹니다. 따뜻한 접시 6개에 고르게 나누고 고기를 덮을 만큼 그레이비를 붓습니다. 감자 만두나 삶은 감자, 적양배추 조림과 냅니다.",
        "หั่นเนื้อที่พักแล้วขวางเส้นใยหนา 8–10 มม. แบ่งลงจานอุ่น 6 ใบ ราดน้ำเกรวีให้เคลือบเนื้อ เสิร์ฟกับเกี๊ยวมันฝรั่งหรือมันต้มและกะหล่ำปลีแดงตุ๋น"
      )
    ],
    tips: [
      ml("Use a small non-reactive vessel and keep it at or below 4°C/40°F for the full 72-hour marinade; turn the roast daily.", "使用大小合適的非反應容器，完整 72 小時都維持 4°C／40°F 以下冷藏，並每天翻面。", "肉に合う非反応性容器を使い、72時間全て4°C/40°F以下に保って毎日返します。", "고기에 맞는 비반응 용기를 쓰고 72시간 내내 4°C/40°F 이하로 두며 매일 뒤집으세요.", "ใช้ภาชนะไม่ทำปฏิกิริยาขนาดพอดี แช่ต่ำกว่า 4°C/40°F ตลอด 72 ชั่วโมงและพลิกทุกวัน"),
      ml("Drying the beef before searing helps it brown; keep the braise at a gentle simmer after the initial boil so the sauce does not reduce too quickly.", "煎之前擦乾牛肉較容易上色；初次煮沸後讓燉汁維持溫和小滾，避免醬汁太快收乾。", "焼く前に肉を乾かすと焼き色がつきます。最初に沸騰させた後は穏やかな煮立ちを保ち、煮汁が早く減りすぎないようにします。", "굽기 전에 고기를 말리면 갈색이 잘 납니다. 처음 끓인 뒤에는 약하게 끓여 소스가 너무 빨리 졸지 않게 하세요.", "ซับเนื้อก่อนจี่ช่วยให้ขึ้นสี หลังต้มเดือดครั้งแรกให้ตุ๋นเบา ๆ เพื่อไม่ให้น้ำราดงวดเร็วเกินไป"),
      ml("Cut across the grain and serve the gravy separately as well; thinner slices stay tender and make six portions easy to divide.", "逆紋切片，並另附醬汁；薄片口感較嫩，也較容易分成六份。", "繊維に逆らって切り、ソースも別添えにします。薄切りは柔らかく、6人分に分けやすくなります。", "결을 가로질러 썰고 그레이비도 따로 곁들이세요. 얇은 조각이 부드럽고 6인분으로 나누기 쉽습니다.", "หั่นขวางเส้นใยและเสิร์ฟน้ำราดแยกด้วย ชิ้นบางจะนุ่มและแบ่ง 6 ที่ง่าย")
    ],
    mistakes: [
      ml("If the roast is still chewy after 3 hours, keep it covered at a gentle braise and check every 20 minutes; time alone cannot confirm collagen tenderness.", "若燉 3 小時後仍韌，保持加蓋溫和燉煮，每 20 分鐘檢查；單靠時間不能判斷膠原是否軟化。", "3時間後も肉が硬ければ、蓋をして穏やかに煮続け、20分ごとに確認します。時間だけではコラーゲンの柔らかさは判断できません。", "3시간 뒤에도 질기면 덮은 채 약하게 계속 끓이고 20분마다 확인하세요. 시간만으로 콜라겐의 부드러움을 판단할 수 없습니다.", "หากครบ 3 ชั่วโมงแล้วยังเหนียว ให้ปิดฝาตุ๋นเบา ๆ ต่อและตรวจทุก 20 นาที เวลาอย่างเดียวบอกไม่ได้ว่าคอลลาเจนนุ่มแล้ว"),
      ml("If the gravy is too thin, simmer it uncovered in 2-minute intervals; add the reserved salt only after reducing because the wine and vinegar concentrate.", "若醬汁太稀，開蓋每次再煮 2 分鐘；紅酒與醋收濃後再加保留的鹽，避免過鹹。", "ソースが薄ければ、ふたを外して2分ずつ煮詰めます。ワインと酢が濃縮するので、塩は煮詰めた後に加えます。", "그레이비가 묽으면 뚜껑을 열고 2분씩 더 졸이세요. 와인과 식초가 농축되므로 소금은 졸인 뒤 넣습니다.", "หากน้ำราดเหลวให้เคี่ยวเปิดฝาครั้งละ 2 นาที ไวน์กับน้ำส้มจะเข้มข้นขึ้น จึงค่อยเติมเกลือหลังเคี่ยว")
    ],
    storage: ml(
      "Cool leftovers promptly in shallow containers and refrigerate within 2 hours at 4°C/40°F or below; use within 3–4 days. Reheat portions until steaming throughout and 74°C/165°F. Store the roast and gravy together or separately, covered.",
      "剩食盡快分裝淺盒，2 小時內冷藏於 4°C／40°F 以下，3–4 天內食用。每次將份量復熱至冒蒸氣且各處達 74°C／165°F。牛肉與醬汁可分開或一起加蓋保存。",
      "残りは速やかに浅い容器へ分け、2時間以内に4°C/40°F以下で冷蔵し、3〜4日以内に食べます。食べる分を全体が湯気を立て74°C/165°Fになるまで再加熱します。肉とソースは一緒でも別でも覆って保存します。",
      "남은 음식은 얕은 용기에 나눠 빠르게 식히고 2시간 안에 4°C/40°F 이하로 냉장해 3–4일 안에 먹습니다. 먹을 분량을 전체에 김이 나고 74°C/165°F가 될 때까지 데웁니다. 고기와 소스는 함께 또는 따로 덮어 보관하세요.",
      "แบ่งของเหลือใส่ภาชนะตื้นให้เย็นเร็วและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3–4 วัน อุ่นส่วนที่จะกินจนมีไอทั่วและถึง 74°C/165°F เก็บเนื้อกับน้ำราดรวมกันหรือแยกกันโดยปิดฝา"
    ),
    safetySources: [
      ["refrigerator temperature and safe marinating practices", handlingGuide],
      ["whole-cut beef minimum temperature and rest", temperatureChart],
      ["cold storage guidance for soups and leftovers", coldStorageChart]
    ]
  });
}

export function refineEightyEighthMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  revisePadThai(byId.get("pad-thai"));
  revisePannaCotta(byId.get("panna-cotta"));
  revisePizzaMargherita(byId.get("pizza-margherita"));
  reviseSauerbraten(byId.get("sauerbraten"));
}
