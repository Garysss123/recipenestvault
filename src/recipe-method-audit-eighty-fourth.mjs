const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${label}`, url });
  }
}

function reviseRecipe(recipe, { titles, bodies, tips, mistakes, storage, cookMinutes, safetySources }) {
  recipe.instructions = recipe.instructions.map((step, index) => ({
    ...step,
    title: titles[index],
    body: bodies[index]
  }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = tips;
  recipe.commonMistakes = mistakes;
  recipe.storage = storage;
  if (cookMinutes !== undefined) {
    recipe.cookMinutes = cookMinutes;
    recipe.totalMinutes = recipe.prepMinutes + cookMinutes;
  }
  for (const [label, url] of safetySources) addOfficialSource(recipe, label, url);
}

function reviseZaalouk(recipe) {
  reviseRecipe(recipe, {
    cookMinutes: 35,
    titles: [
      ml("Soften the eggplant", "蒸軟茄子", "なすを柔らかく蒸す", "가지를 부드럽게 찌기", "นึ่งมะเขือให้นุ่ม"),
      ml("Reduce tomato and garlic", "煮濃番茄與大蒜", "トマトとにんにくを煮詰める", "토마토와 마늘 졸이기", "เคี่ยวมะเขือเทศกับกระเทียม"),
      ml("Combine and mash", "拌合並粗搗", "合わせて粗くつぶす", "합쳐서 굵게 으깨기", "ผสมและบดหยาบ"),
      ml("Cook off excess moisture", "收乾多餘水分", "余分な水分を飛ばす", "여분 수분 날리기", "เคี่ยวไล่ความชื้น"),
      ml("Season and serve", "調味並上桌", "味を調えて供する", "간을 맞추고 내기", "ปรุงรสและเสิร์ฟ")
    ],
    bodies: [
      ml(
        "Rinse the eggplants under running water before trimming or cutting; do not use soap or produce wash. Cut into the listed 2 cm cubes. Put them in a steamer over simmering water, cover, and steam 12–15 minutes. Check a large cube with a thin knife: it should pass into the centre easily and the flesh should crush with gentle fork pressure. Drain for 2–3 minutes. If a piece is still spongy or resists the knife, steam 2–3 minutes more before chopping it roughly while warm.",
        "茄子先在流水下沖洗，再修蒂或切開；不要用肥皂或蔬果清潔劑。切成食材表所列的 2 公分丁，放入沸水上的蒸籠，加蓋蒸 12–15 分鐘。用薄刀檢查較大的茄子丁：刀尖應能輕鬆刺到中心，叉子輕壓時果肉可壓碎。瀝水 2–3 分鐘；若仍有海綿般硬芯或刀子難以刺入，再蒸 2–3 分鐘，趁熱粗略切碎。",
        "なすはへたを切る前に流水で洗います。石けんや野菜用洗剤は使いません。材料表どおり2cm角に切り、湯気の上がる蒸し器に入れてふたをし、12〜15分蒸します。大きめの一片に細いナイフを刺して確認します。中心まで抵抗なく通り、フォークで軽く押すとつぶれる状態が目安です。2〜3分水を切ります。スポンジ状の硬い部分が残る、またはナイフが通りにくい場合は、さらに2〜3分蒸してから温かいうちに粗く刻みます。",
        "가지는 꼭지나 껍질을 손질하기 전에 흐르는 물에 씻습니다. 비누나 채소 세척제는 쓰지 않습니다. 재료표의 2cm 크기로 썰어 김이 오르는 찜기에 넣고 뚜껑을 덮어 12–15분 찝니다. 큰 조각에 얇은 칼을 넣어 확인하세요. 중심까지 쉽게 들어가고 포크로 살짝 누르면 살이 으깨져야 합니다. 2–3분 물기를 뺍니다. 스펀지처럼 질긴 속이 남거나 칼이 잘 들어가지 않으면 2–3분 더 찐 뒤 따뜻할 때 굵게 다집니다.",
        "ล้างมะเขือใต้ก๊อกน้ำก่อนตัดขั้วหรือหั่น ไม่ใช้สบู่หรือน้ำยาล้างผัก หั่นเต๋าตามขนาด 2 ซม. ในรายการส่วนผสม วางในลังถึงเหนือน้ำเดือด ปิดฝาและนึ่ง 12–15 นาที ใช้มีดบางทดสอบชิ้นใหญ่ มีดควรแทงถึงกลางได้ง่ายและส้อมกดแล้วเนื้อยุบ สะเด็ดน้ำ 2–3 นาที หากยังมีเนื้อพรุนแข็งหรือมีดติด ให้นึ่งเพิ่ม 2–3 นาทีแล้วสับหยาบตอนอุ่น"
      ),
      ml(
        "While the eggplant steams, heat the olive oil in a wide skillet over medium heat. Add the garlic and stir for about 20 seconds, just until fragrant; keep it pale rather than browned. Add the tomatoes, cumin, paprika, and all 4 g salt. Simmer uncovered for 12–15 minutes, stirring now and then, until the tomatoes collapse and look glossy. If clear juice still runs across the pan, simmer 2–3 minutes longer; lower the heat if the garlic or tomato catches.",
        "茄子蒸的同時，寬鍋以中火加熱橄欖油。放入大蒜拌約 20 秒，剛有香氣即可；保持淺色，不要炒褐。加入番茄、孜然、紅椒粉與全部 4 公克鹽。不加蓋煮 12–15 分鐘，偶爾攪拌，至番茄塌軟、表面油亮。若鍋中仍有清水狀汁液流動，再煮 2–3 分鐘；大蒜或番茄開始黏鍋時就轉小火。",
        "なすを蒸している間に、広いフライパンでオリーブ油を中火で熱します。にんにくを加えて約20秒混ぜ、香りが立ったら止めます。焦がさず薄い色を保ちます。トマト、クミン、パプリカ、塩4gすべてを加えます。ふたをせず12〜15分、ときどき混ぜながらトマトが崩れてつやが出るまで煮ます。透明な汁が流れるようなら2〜3分追加し、にんにくやトマトが鍋底に付き始めたら火を弱めます。",
        "가지를 찌는 동안 넓은 팬에 올리브오일을 중불로 달굽니다. 마늘을 넣고 약 20초 향이 날 때까지만 볶습니다. 갈색이 되지 않도록 연한 색을 유지하세요. 토마토, 큐민, 파프리카와 소금 4g 전량을 넣습니다. 뚜껑 없이 12–15분, 가끔 저어 토마토가 무너지고 윤기가 날 때까지 끓입니다. 묽은 즙이 팬을 흐르면 2–3분 더 끓이고, 마늘이나 토마토가 눌어붙기 시작하면 불을 낮춥니다.",
        "ระหว่างนึ่งมะเขือ ตั้งน้ำมันมะกอกในกระทะกว้างไฟกลาง ใส่กระเทียมผัดประมาณ 20 วินาทีจนหอมแต่ยังสีอ่อน อย่าให้เป็นสีน้ำตาล เติมมะเขือเทศ ยี่หร่า ปาปริกาและเกลือ 4 กรัมทั้งหมด เคี่ยวเปิดฝา 12–15 นาที คนเป็นครั้งคราวจนมะเขือเทศยุบและเงา หากยังมีน้ำใสไหลทั่วกระทะให้เคี่ยวเพิ่ม 2–3 นาที ลดไฟหากกระเทียมหรือมะเขือเทศเริ่มติดก้น"
      ),
      ml(
        "Add the drained eggplant to the tomato mixture. Mash with a wooden spoon until spoonable and coarse, leaving small pieces rather than making a smooth purée. Scrape the pan as you stir so the thicker mixture does not scorch. If the eggplant is still in large firm pieces, mash them against the side and continue cooking gently until tender.",
        "把瀝乾的茄子加入番茄鍋。用木匙粗搗至濃稠、可舀取，保留小塊，不要打成滑順泥狀。攪拌時刮過鍋底，避免濃稠部分焦掉。若還有大片偏硬茄子，沿鍋邊壓碎，再以小火續煮至柔軟。",
        "水を切ったなすをトマトに加えます。木べらで粗くつぶしてすくえる濃さにし、小さな塊を残します。滑らかなピューレにはしません。混ぜるときに鍋底をこそげ、濃くなった部分が焦げないようにします。大きく硬いなすが残る場合は鍋肌に押し付けてつぶし、柔らかくなるまで静かに加熱します。",
        "물기를 뺀 가지를 토마토에 넣습니다. 나무주걱으로 떠먹을 수 있을 만큼 굵게 으깨되 작은 조각은 남기고 매끈한 퓌레로 만들지 않습니다. 저을 때 팬 바닥을 긁어 농도가 짙어진 부분이 타지 않게 합니다. 크고 단단한 가지 조각이 남으면 팬 가장자리에 눌러 으깨고 부드러워질 때까지 약하게 더 익힙니다.",
        "ใส่มะเขือที่สะเด็ดน้ำลงในมะเขือเทศ ใช้ช้อนไม้บดหยาบให้ข้นพอตักได้ เหลือชิ้นเล็ก ๆ ไว้ อย่าบดจนเนียนเป็นซอส ขูดก้นกระทะขณะคนเพื่อไม่ให้ส่วนที่ข้นไหม้ หากยังมีชิ้นใหญ่แข็ง ให้กดกับข้างกระทะแล้วเคี่ยวเบา ๆ จนนุ่ม"
      ),
      ml(
        "Cook uncovered over medium-low for 10–12 minutes, stirring and scraping the bottom every minute or two. The texture goal is a clear spoon trail that stays visible briefly, with no watery pool around the edge; this is a consistency cue, not a food-safety temperature. If it is still loose, reduce it in 2–3 minute increments. If it begins sticking before the eggplant is tender, lower the heat and stir in 15 ml hot water, then keep cooking gently.",
        "轉中小火不加蓋續煮 10–12 分鐘，每 1–2 分鐘攪拌並刮鍋底。口感目標是木匙劃過後痕跡短暫保留，邊緣沒有水水液體；這是濃稠度判斷，不是食安溫度。若仍偏稀，每次再收煮 2–3 分鐘。若茄子尚未柔軟便開始黏鍋，轉小火並拌入 15 毫升熱水，再慢慢煮熟。",
        "中弱火でふたをせず10〜12分、1〜2分ごとに混ぜて底をこそげます。へらの跡がしばらく残り、縁に水たまりがない濃さが食感の目安です。これは濃度の確認であり、食品安全温度ではありません。まだ緩ければ2〜3分ずつ煮詰めます。なすが柔らかくなる前に鍋底に付き始めたら火を弱め、熱湯15mlを混ぜてから静かに加熱を続けます。",
        "중약불에서 뚜껑 없이 10–12분 더 익히며 1–2분마다 저어 바닥을 긁습니다. 주걱 자국이 잠시 남고 가장자리에 묽은 물이 고이지 않는 농도가 식감 목표입니다. 이는 농도 확인이지 식품 안전 온도가 아닙니다. 아직 묽으면 2–3분씩 더 졸입니다. 가지가 부드러워지기 전에 눌어붙으면 불을 낮추고 뜨거운 물 15ml를 섞은 뒤 약하게 계속 익힙니다.",
        "เคี่ยวเปิดฝาไฟกลางอ่อน 10–12 นาที คนและขูดก้นทุก 1–2 นาที เป้าหมายคือรอยช้อนค้างชั่วครู่และไม่มีน้ำใสขังขอบ นี่เป็นเกณฑ์ความข้น ไม่ใช่อุณหภูมิเพื่อความปลอดภัย หากยังเหลวให้เคี่ยวเพิ่มครั้งละ 2–3 นาที หากเริ่มติดก่อนมะเขือนุ่ม ลดไฟและคนเติมน้ำร้อน 15 มล. แล้วเคี่ยวเบา ๆ ต่อ"
      ),
      ml(
        "Turn off the heat before stirring in the lemon juice and chopped parsley and cilantro. Taste with a piece of the listed bread and adjust only the lemon using the listed amount; the listed salt is already in the tomato base. Serve warm or cooled briefly, but do not leave this perishable cooked dish at room temperature for more than 2 hours (1 hour above 32°C/90°F).",
        "關火後拌入檸檬汁、巴西里與香菜。搭配食材表中的麵包試味，檸檬只用食材表所列份量調整；食譜所列鹽已全數加入番茄底。溫熱食用或短暫放涼皆可，但這道熟食不可在室溫放超過 2 小時（高於 32°C／90°F 時不超過 1 小時）。",
        "火を止めてからレモン汁、刻んだパセリとパクチーを混ぜます。材料表のパンと一緒に味を見て、レモンは記載量の範囲で調整します。塩はすでにトマトに全量加えています。温かくても少し冷ましても供せますが、加熱済みで傷みやすいため室温に2時間以上（32°C/90°Fを超える環境では1時間以上）置きません。",
        "불을 끈 뒤 레몬즙과 다진 파슬리, 고수를 섞습니다. 재료표의 빵과 함께 맛을 보고 레몬은 표시된 양 안에서 조절합니다. 소금은 토마토에 이미 전량 넣었습니다. 따뜻하게 또는 잠시 식혀 낼 수 있지만 조리된 음식이므로 실온에 2시간 넘게 두지 않습니다(32°C/90°F 초과 환경에서는 1시간).",
        "ปิดไฟก่อนใส่น้ำเลมอน พาร์สลีย์และผักชีสับ ชิมพร้อมขนมปังตามรายการและปรับเฉพาะเลมอนตามปริมาณที่ระบุ เกลือที่ระบุใส่ในฐานมะเขือเทศหมดแล้ว เสิร์ฟอุ่นหรือพักให้เย็นเล็กน้อยได้ แต่อาหารปรุงสุกที่เสียง่ายไม่ควรวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F)"
      )
    ],
    tips: [
      ml("Keep a few soft eggplant pieces intact and reduce the tomato before combining; zaalouk should be coarse and spoonable, not a watery sauce or smooth purée.", "保留一些柔軟茄子小塊，並先把番茄煮濃；zaalouk 應粗粒、可舀取，不該像稀醬或滑順泥。", "柔らかななすを少し形のまま残し、合わせる前にトマトを煮詰めます。ザアルークは粗めですくえる仕上がりで、水っぽいソースや滑らかなピューレにはしません。", "부드러운 가지 조각을 조금 남기고 토마토를 먼저 졸이세요. 잘루크는 굵고 떠먹기 좋아야 하며 묽은 소스나 매끈한 퓌레가 아닙니다.", "เหลือชิ้นมะเขือนุ่มไว้บ้างและเคี่ยวมะเขือเทศก่อนผสม ซาลูกควรบดหยาบและตักได้ ไม่ใช่ซอสเหลวหรือเนื้อเนียน"),
      ml("Steam and reduce concurrently to keep the method near its 35-minute cook estimate; use the knife and spoon-trail checks rather than a made-up internal-temperature target for vegetables.", "蒸茄子與煮番茄可同時進行，讓料理時間接近 35 分鐘；蔬菜以刀刺與匙痕判斷熟度，不另造中心溫度目標。", "なすを蒸しながらトマトを煮詰めると、加熱時間を約35分に収めやすくなります。野菜の火通りはナイフとへらの跡で確認し、根拠のない中心温度目標は設けません。", "가지를 찌는 동안 토마토를 졸이면 조리 시간을 약 35분으로 맞출 수 있습니다. 채소 익힘은 칼과 주걱 자국으로 판단하고 근거 없는 중심 온도 목표를 두지 않습니다.", "นึ่งมะเขือพร้อมกับเคี่ยวมะเขือเทศเพื่อให้เวลาปรุงใกล้ 35 นาที ตรวจความสุกด้วยมีดและรอยช้อน ไม่ตั้งเป้าอุณหภูมิภายในที่ไม่มีหลักฐานสำหรับผัก")
    ],
    mistakes: [
      ml("If the finished mixture is watery, return it to low heat uncovered and reduce for 2–3 minutes at a time. If it catches before the eggplant softens, lower the heat and add 15 ml hot water; do not scrape burnt bits into the dip.", "成品太稀時，回鍋以小火不加蓋每次收煮 2–3 分鐘。茄子尚未軟便黏鍋時，轉小火並加 15 毫升熱水；不要把焦黑屑刮進沙拉。", "仕上がりが水っぽければ、ふたをせず弱火で2〜3分ずつ煮詰めます。なすが柔らかくなる前に鍋に付いたら火を弱め、熱湯15mlを加えます。焦げた部分は混ぜ込みません。", "완성물이 묽으면 뚜껑 없이 약불에서 2–3분씩 졸입니다. 가지가 부드러워지기 전에 눌어붙으면 불을 낮추고 뜨거운 물 15ml를 넣으세요. 탄 부분은 섞지 않습니다.", "หากส่วนผสมเหลว ให้เคี่ยวเปิดฝาไฟอ่อนครั้งละ 2–3 นาที หากเริ่มติดก่อนมะเขือนุ่ม ลดไฟและเติมน้ำร้อน 15 มล. อย่าขูดส่วนไหม้ลงในสลัด"),
      ml("Garlic that turns brown in the first 20 seconds will taste bitter. If it darkens or smells scorched, wipe out the pan, replace the affected oil and garlic from the listed ingredients, then continue at lower heat.", "大蒜若在最初 20 秒就變褐會發苦。若顏色變深或聞到焦味，擦淨鍋子，以食材表所列橄欖油和大蒜重新開始，並降低火力。", "最初の20秒でにんにくが茶色くなると苦くなります。色が濃くなったり焦げ臭くなった場合は鍋を拭き、材料表の油とにんにくを使って火を弱めてやり直します。", "처음 20초 안에 마늘이 갈색이 되면 쓴맛이 납니다. 색이 짙어지거나 탄 냄새가 나면 팬을 닦고 재료표의 기름과 마늘로 다시 시작하되 불을 낮추세요.", "กระเทียมที่เป็นสีน้ำตาลใน 20 วินาทีแรกจะขม หากสีเข้มหรือมีกลิ่นไหม้ ให้เช็ดกระทะ ใช้น้ำมันและกระเทียมตามรายการเริ่มใหม่โดยลดไฟ")
    ],
    storage: ml(
      "Serve without a long room-temperature hold. Refrigerate leftovers in a shallow covered container at 4°C/40°F or colder within 2 hours (1 hour above 32°C/90°F). Use within 2 days for best texture; that is a quality target, not a safe-storage limit. Reheat leftovers throughout to 74°C/165°F, the official safety minimum for reheated leftovers; this is separate from the vegetable tenderness cues.",
      "不要長時間放在室溫。剩菜放入淺而有蓋的容器，於 2 小時內（環境高於 32°C／90°F 時 1 小時內）冷藏在 4°C／40°F 以下。為保留最佳口感，建議 2 天內食用；這是品質目標，不是安全保存期限。回熱剩菜時中心須達 74°C／165°F，這是官方剩菜回熱安全最低值，與蔬菜柔軟度判斷不同。",
      "室温に長く置かず、残りは浅いふた付き容器に入れて2時間以内（32°C/90°Fを超える環境では1時間以内）に4°C/40°F以下で冷蔵します。食感を保つため2日以内の使用を勧めますが、これは品質目標であり安全な保存期限ではありません。残りを温め直すときは中心まで74°C/165°Fにします。これは公式の再加熱最低温度で、なすの柔らかさの目安とは別です。",
      "실온에 오래 두지 말고 남은 음식은 얕은 뚜껑 용기에 담아 2시간 안에(32°C/90°F 초과 환경에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 좋은 식감을 위해 2일 안에 먹는 것을 권하며, 이는 품질 목표이지 안전 보관 기한은 아닙니다. 남은 음식을 다시 데울 때 중심까지 74°C/165°F로 가열합니다. 이는 공식 재가열 안전 최소 온도이며 가지의 부드러움 기준과는 다릅니다.",
      "อย่าวางไว้ที่อุณหภูมิห้องนาน ของเหลือใส่ภาชนะตื้นมีฝาปิดและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) เพื่อเนื้อสัมผัสดีที่สุดควรกินภายใน 2 วัน ซึ่งเป็นเป้าหมายด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัย เมื่อนำของเหลือมาอุ่นให้ถึง 74°C/165°F ตรงกลาง นี่คืออุณหภูมิขั้นต่ำทางการสำหรับการอุ่นของเหลือ แยกจากเกณฑ์ความนุ่มของมะเขือ"
    ),
    safetySources: [
      ["FoodSafety.gov: 4 Steps to Food Safety", handling],
      ["FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures]
    ]
  });
}

function reviseImamBayildi(recipe) {
  reviseRecipe(recipe, {
    cookMinutes: 80,
    titles: [
      ml("Salt and sear the eggplants", "鹽漬並煎香茄子", "なすに塩をして焼く", "가지에 소금 뿌려 굽기", "โรยเกลือและจี่มะเขือ"),
      ml("Soften the onions slowly", "慢慢炒軟洋蔥", "玉ねぎをゆっくり柔らかく炒める", "양파를 천천히 익히기", "ผัดหอมหัวใหญ่ให้ค่อย ๆ นุ่ม"),
      ml("Reduce the tomato filling", "煮濃番茄餡", "トマトの具を煮詰める", "토마토 속재료 졸이기", "เคี่ยวไส้มะเขือเทศ"),
      ml("Fill without tearing", "填入餡料但不要撐裂", "破らないように詰める", "터지지 않게 속 채우기", "ยัดไส้โดยไม่ให้ฉีก"),
      ml("Braise until silky and tender", "燉至滑嫩", "とろりと柔らかく煮込む", "촉촉하고 부드럽게 조리기", "ตุ๋นจนนุ่มละมุน"),
      ml("Rest and garnish", "靜置並撒香草", "休ませてハーブを添える", "잠시 두고 허브 올리기", "พักและโรยสมุนไพร")
    ],
    bodies: [
      ml(
        "Rinse the eggplants and tomatoes under running water before trimming or peeling; do not use soap or produce wash. Keep each stem cap attached. Make one shallow lengthwise slit in each eggplant without cutting through its base, sprinkle the cut with 2 g of the listed salt, and rest 15 minutes while preparing the other ingredients. Pat dry well. Heat 30 ml olive oil in a wide lidded skillet over medium heat and sear the eggplants in a single layer, turning, about 2–3 minutes per side until lightly bronzed and pliable; work in batches if needed. This colour is a flavour target, not a safety endpoint.",
        "茄子和番茄先在流水下沖洗再修切或去皮；不要用肥皂或蔬果清潔劑。保留每條茄子的蒂帽。沿長邊劃一道淺口，不要切穿底部，撒上食材表所列的 2 公克鹽，靜置 15 分鐘，同時準備其他材料。充分擦乾。寬而有蓋的平底鍋以中火加熱 30 毫升橄欖油，茄子單層煎香並翻面，每面約 2–3 分鐘至微褐且可彎軟；需要時分批。這個顏色是風味目標，不是安全熟度標準。",
        "なすとトマトはへたを整えたり皮をむいたりする前に流水で洗います。石けんや野菜用洗剤は使いません。なすのがくは残します。底まで切らないよう縦に浅い切れ目を一本入れ、材料表の塩2gを振って15分置きます。その間に他の材料を準備します。よく水気を拭きます。ふた付きの広いフライパンでオリーブ油30mlを中火で熱し、なすを一段に並べて各面を約2〜3分ずつ焼き、薄く色づいてしなるまで焼きます。必要なら数回に分けます。この焼き色は風味の目標で、安全上の加熱基準ではありません。",
        "가지는 꼭지를 다듬기 전에 흐르는 물에 씻습니다. 비누나 채소 세척제는 사용하지 않습니다. 꼭지 부분은 붙여 둡니다. 밑부분을 자르지 않도록 세로로 얕게 칼집을 하나 내고 재료표의 소금 2g을 뿌려 15분 둡니다. 그동안 다른 재료를 준비합니다. 물기를 잘 닦습니다. 뚜껑이 있는 넓은 팬에 올리브오일 30ml를 중불로 달구고 가지를 한 층으로 놓아 뒤집어가며 한 면당 약 2–3분, 연하게 갈색이 나고 유연해질 때까지 굽습니다. 필요하면 나눠 굽습니다. 이 색은 풍미 목표이지 안전한 익힘 기준은 아닙니다.",
        "ล้างมะเขือยาวและมะเขือเทศใต้ก๊อกน้ำก่อนตัดขั้วหรือปอกเปลือก ไม่ใช้สบู่หรือน้ำยาล้างผัก เก็บขั้วมะเขือไว้ กรีดตามยาวตื้น ๆ หนึ่งรอยโดยไม่ตัดทะลุฐาน โรยเกลือ 2 กรัมตามรายการ พัก 15 นาทีระหว่างเตรียมอย่างอื่น ซับให้แห้งดี อุ่นน้ำมันมะกอก 30 มล. ในกระทะกว้างมีฝาไฟกลาง วางมะเขือชั้นเดียวแล้วกลับด้าน จี่ด้านละประมาณ 2–3 นาทีจนมีสีน้ำตาลอ่อนและงอได้ แบ่งทำหากจำเป็น สีนี้เป็นเป้าหมายด้านรสชาติ ไม่ใช่เกณฑ์ความปลอดภัย"
      ),
      ml(
        "Add another 30 ml olive oil to the same pan. Cook the sliced onions over medium-low heat for 12–15 minutes, stirring every minute or two, until translucent, fully soft, and glossy but not browned. Add the sliced garlic and cook 1 minute until fragrant. If the onion edges colour before the centre softens, lower the heat and stir in 15 ml water; do not rush them over high heat.",
        "同一鍋再加入 30 毫升橄欖油。洋蔥以中小火炒 12–15 分鐘，每 1–2 分鐘攪拌，至半透明、完全柔軟且油亮但未褐化。加入蒜片再炒 1 分鐘至有香氣。若洋蔥中心尚未軟、邊緣已上色，轉小火並拌入 15 毫升水；不要用大火催快。",
        "同じフライパンにオリーブ油30mlを加えます。薄切り玉ねぎを中弱火で12〜15分、1〜2分ごとに混ぜながら、透き通って完全に柔らかく、つやが出るまで炒めます。焼き色は付けません。にんにくを加えて香りが立つまで1分炒めます。中心が柔らかくなる前に縁が色づいたら火を弱め、水15mlを混ぜます。強火で急がせません。",
        "같은 팬에 올리브오일 30ml를 더합니다. 얇게 썬 양파를 중약불에서 12–15분, 1–2분마다 저어가며 투명하고 완전히 부드러우며 윤기가 날 때까지 익힙니다. 갈색이 나지 않게 합니다. 마늘을 넣고 향이 날 때까지 1분 익힙니다. 중심이 부드러워지기 전에 가장자리가 갈색이 되면 불을 낮추고 물 15ml를 섞으세요. 센 불로 서두르지 않습니다.",
        "เติมน้ำมันมะกอกอีก 30 มล. ในกระทะเดิม ผัดหอมหัวใหญ่ไฟกลางอ่อน 12–15 นาที คนทุก 1–2 นาทีจนใส นุ่มทั่วและเงาแต่ไม่เป็นสีน้ำตาล ใส่กระเทียมหั่นแล้วผัด 1 นาทีจนหอม หากขอบเริ่มมีสีทั้งที่ตรงกลางยังไม่นุ่ม ลดไฟและคนเติมน้ำ 15 มล. อย่าเร่งด้วยไฟแรง"
      ),
      ml(
        "Stir in the diced tomatoes, sugar, and the next 2 g salt. Cook uncovered for 10–12 minutes, stirring gently, until the tomato pieces collapse and no thin liquid runs across the pan. Fold in half the parsley off the heat. If the filling is still loose, simmer 2–3 minutes longer; if it becomes dry before the onion is fully soft, add 15 ml water and keep the heat low.",
        "拌入番茄丁、糖與接著使用的 2 公克鹽。不加蓋煮 10–12 分鐘，輕輕攪拌，至番茄塌軟且鍋中沒有稀汁流動。離火拌入一半巴西里。若餡料仍稀，再煮 2–3 分鐘；若洋蔥尚未完全軟化餡料就變乾，加入 15 毫升水並維持小火。",
        "角切りトマト、砂糖、次に使う塩2gを加えます。ふたをせず10〜12分、優しく混ぜながら、トマトが崩れて薄い汁が鍋を流れなくなるまで煮ます。火を止めてパセリの半量を混ぜます。具がまだ緩ければ2〜3分追加し、玉ねぎが柔らかくなる前に乾いてきたら水15mlを加えて弱火を保ちます。",
        "깍둑 썬 토마토, 설탕과 다음에 넣을 소금 2g을 섞습니다. 뚜껑 없이 10–12분 부드럽게 저어 토마토가 무너지고 묽은 국물이 팬을 흐르지 않을 때까지 익힙니다. 불을 끄고 파슬리 절반을 섞습니다. 속이 여전히 묽으면 2–3분 더 끓이고, 양파가 완전히 부드러워지기 전에 마르면 물 15ml를 넣고 약불을 유지합니다.",
        "ใส่มะเขือเทศหั่นเต๋า น้ำตาลและเกลือ 2 กรัมส่วนถัดไป เคี่ยวเปิดฝา 10–12 นาที คนเบา ๆ จนมะเขือเทศยุบและไม่มีน้ำใสไหลทั่วกระทะ ปิดไฟแล้วคลุกพาร์สลีย์ครึ่งหนึ่ง หากไส้ยังเหลวให้เคี่ยวเพิ่ม 2–3 นาที หากแห้งก่อนหอมหัวใหญ่นุ่มทั่ว เติมน้ำ 15 มล. และใช้ไฟอ่อน"
      ),
      ml(
        "Use a spoon to ease each slit into a pocket without cutting through the base. Divide the onion-tomato filling among the four eggplants, piling it lightly rather than packing it tight. Set them snugly in the pan slit-side up so the filling stays in place. If a slit starts to tear, stop opening it and place the remaining filling over the top instead of forcing the pocket wider.",
        "用湯匙輕輕撐開每道切口成口袋，不要切穿底部。將洋蔥番茄餡分給 4 條茄子，輕放堆起即可，不要硬塞。茄子緊密排入鍋中，切口朝上，讓餡料留在裡面。若切口開始裂開，就不要再撐大，將剩餘餡料放在上面，別硬撐口袋。",
        "スプーンで切れ目をそっと広げてポケットにします。底を切り離さないようにします。玉ねぎとトマトの具を4本のなすに分け、押し込まず軽く盛ります。具が落ちないよう切れ目を上にして鍋に並べます。切れ目が裂け始めたら広げるのを止め、残りの具を上に置きます。無理にポケットを広げません。",
        "숟가락으로 칼집을 살살 벌려 밑부분을 자르지 않고 주머니를 만듭니다. 양파·토마토 속을 가지 네 개에 나눠 담되 눌러 채우지 말고 가볍게 얹습니다. 속이 빠지지 않도록 칼집이 위를 향하게 팬에 가지런히 놓습니다. 칼집이 찢어지기 시작하면 더 벌리지 말고 남은 속을 위에 올리세요.",
        "ใช้ช้อนค่อย ๆ เปิดรอยกรีดเป็นช่องโดยไม่ตัดทะลุฐาน แบ่งไส้หอมหัวใหญ่และมะเขือเทศใส่มะเขือทั้ง 4 ลูก วางพูนเบา ๆ ไม่อัดแน่น เรียงชิดกันในกระทะโดยหันรอยกรีดขึ้น หากรอยกรีดเริ่มฉีกให้หยุดเปิดและวางไส้ที่เหลือไว้ด้านบน อย่าฝืนขยายช่อง"
      ),
      ml(
        "Drizzle the remaining 20 ml olive oil over the eggplants and pour the listed 120 ml water around them, not onto the filling. Cover and bring the liquid just to a gentle simmer; maintain small, lazy bubbles for 30–35 minutes. At 30 minutes, test the thickest eggplant beside the filling with a thin knife. The blade should slide through the flesh with little resistance; the flesh should be silky and very tender while the eggplant still holds its shape. This is a texture goal for this meatless stovetop dish, not a numeric safe-minimum temperature. If the centre is still firm, add 15 ml hot water around the vegetables, cover, and simmer 5–8 minutes more before checking again. If the pan is nearly dry, add water the same way rather than increasing the heat.",
        "將剩下的 20 毫升橄欖油淋在茄子上，把食材表所列的 120 毫升水倒在茄子周圍，不要淋到餡料。加蓋煮至小滾，維持細小、緩慢的氣泡 30–35 分鐘。30 分鐘時，用薄刀從餡料旁刺入最厚的茄子測試；刀片應幾乎不費力地穿過果肉，果肉滑嫩極軟，但茄子仍能保持形狀。這是無肉爐上燉菜的口感目標，不是數字型安全最低溫度。若中心仍硬，沿鍋邊加 15 毫升熱水、蓋好再燉 5–8 分鐘後重測。若鍋底快乾，也用同樣方式加水，不要提高火力。",
        "残りのオリーブ油20mlをなすに回しかけ、材料表の水120mlを具ではなく周囲に注ぎます。ふたをして、静かな煮立ちにします。小さな泡を保ちながら30〜35分煮ます。30分で、最も厚いなすの具の横に細いナイフを刺して確認します。刃がほとんど抵抗なく通り、身はとろりと非常に柔らかく、それでも形を保っている状態が目安です。これは肉を使わない鍋煮の食感目標で、数値の安全最低温度ではありません。中心がまだ硬ければ、野菜の周囲に熱湯15mlを加えてふたをし、5〜8分追加してから再確認します。鍋が乾きそうな場合も火を強めず同じように水を足します。",
        "남은 올리브오일 20ml를 가지 위에 두르고 재료표의 물 120ml는 속이 아니라 가지 주변에 붓습니다. 뚜껑을 덮고 약하게 끓기 시작하면 작은 기포가 천천히 올라오는 상태를 유지하며 30–35분 익힙니다. 30분에 가장 두꺼운 가지의 속재료 옆으로 얇은 칼을 넣어 확인하세요. 칼날이 거의 저항 없이 지나가고 속살은 매우 부드럽고 촉촉하지만 가지 모양은 유지되어야 합니다. 이는 고기 없는 팬 조림의 식감 목표이지 수치형 안전 최소 온도가 아닙니다. 중심이 아직 단단하면 채소 주변에 뜨거운 물 15ml를 넣고 덮어 5–8분 더 끓인 뒤 다시 확인합니다. 팬이 거의 마르면 불을 올리지 말고 같은 방식으로 물을 더합니다.",
        "ราดน้ำมันมะกอกที่เหลือ 20 มล. บนมะเขือ เทน้ำ 120 มล.ตามรายการรอบ ๆ ไม่ราดไส้ ปิดฝาและตั้งจนเดือดเบา ๆ รักษาฟองเล็ก ๆ ช้า ๆ เป็นเวลา 30–35 นาที เมื่อครบ 30 นาที ใช้มีดบางแทงตรวจมะเขือส่วนที่หนาที่สุดข้างไส้ ใบมีดควรผ่านเนื้อโดยแทบไม่มีแรงต้าน เนื้อควรนุ่มละมุนมากแต่ลูกยังคงรูป นี่คือเป้าหมายเนื้อสัมผัสของเมนูตุ๋นบนเตาที่ไม่มีเนื้อสัตว์ ไม่ใช่อุณหภูมิขั้นต่ำทางความปลอดภัย หากตรงกลางยังแข็ง เติมน้ำร้อน 15 มล. รอบผัก ปิดฝาและตุ๋นอีก 5–8 นาทีแล้วตรวจซ้ำ หากน้ำในกระทะใกล้แห้งให้เติมน้ำแบบเดียวกัน อย่าเพิ่มไฟ"
      ),
      ml(
        "Turn off the heat and leave the pan covered for 10 minutes so the oil and tomato juices settle. Transfer the eggplants with a wide spatula, spoon the pan juices over them, and add the remaining parsley and lemon wedges. Serve warm or let them cool briefly; do not leave this cooked dish at room temperature for more than 2 hours (1 hour above 32°C/90°F).",
        "關火後加蓋靜置 10 分鐘，讓橄欖油和番茄汁融合。用寬鍋鏟移出茄子，淋上鍋汁，撒上剩餘巴西里並搭配檸檬角。溫熱食用或短暫放涼皆可；熟食不可在室溫放超過 2 小時（高於 32°C／90°F 時不超過 1 小時）。",
        "火を止め、ふたをしたまま10分置いて油とトマトの汁をなじませます。幅広のへらでなすを移し、煮汁をかけ、残りのパセリとレモンを添えます。温かくても少し冷ましても供せますが、加熱済みの料理を室温に2時間以上（32°C/90°Fを超える環境では1時間以上）置きません。",
        "불을 끄고 뚜껑을 덮은 채 10분 두어 기름과 토마토 즙을 어우러지게 합니다. 넓은 뒤집개로 가지를 옮기고 팬의 국물을 끼얹은 뒤 남은 파슬리와 레몬을 곁들입니다. 따뜻하게 또는 잠시 식혀 낼 수 있지만 조리된 음식은 실온에 2시간 넘게 두지 않습니다(32°C/90°F 초과 환경에서는 1시간).",
        "ปิดไฟและพักปิดฝา 10 นาทีให้น้ำมันกับน้ำมะเขือเทศเข้ากัน ใช้ตะหลิวกว้างย้ายมะเขือ ราดน้ำในกระทะ โรยพาร์สลีย์ที่เหลือและเสิร์ฟกับเลมอน จะเสิร์ฟอุ่นหรือพักให้เย็นเล็กน้อยก็ได้ แต่อาหารปรุงสุกไม่ควรวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F)"
      )
    ],
    tips: [
      ml("The onion filling should turn translucent, glossy, and fully soft before the tomatoes go in. Keep the slit shallow and the seam uppermost so each eggplant stays intact during the long braise.", "番茄下鍋前，洋蔥餡應已半透明、油亮且完全柔軟。切口要淺、朝上燉煮，茄子較能在長時間燉煮中保持完整。", "トマトを加える前に、玉ねぎを透き通ってつやが出るまで柔らかくします。切れ目は浅くし、上向きに並べると長い煮込みでも形を保ちやすくなります。", "토마토를 넣기 전에 양파가 투명하고 윤기 나며 완전히 부드러워야 합니다. 칼집은 얕게 내고 위로 향하게 두어 오래 조려도 가지가 온전히 남게 하세요.", "ทำหอมหัวใหญ่ให้ใส เงาและนุ่มทั่วก่อนใส่มะเขือเทศ กรีดตื้นและหงายรอยกรีดขึ้นเพื่อให้มะเขือคงรูปขณะตุ๋นนาน"),
      ml("The knife-through-flesh check and the gentle simmer control the desired silky texture; neither browning nor the 74°C/165°F leftover reheating minimum is a fresh-vegetable doneness target.", "刀子刺入果肉與小火慢燉用來控制滑嫩口感；焦褐色和剩菜回熱最低值 74°C／165°F 都不是新鮮蔬菜的熟度目標。", "ナイフが通る柔らかさと静かな煮立ちで、とろりとした食感を整えます。焼き色も、残り物の再加熱最低温度74°C/165°Fも、生野菜の加熱完了目標ではありません。", "칼이 살을 통과하는지와 약한 끓임으로 부드러운 식감을 맞춥니다. 갈색이나 남은 음식 재가열 최소 온도 74°C/165°F는 신선한 채소의 익힘 목표가 아닙니다.", "ใช้การแทงมีดผ่านเนื้อและการตุ๋นเบาเพื่อให้ได้สัมผัสนุ่มละมุน สีเกรียมและอุณหภูมิขั้นต่ำ 74°C/165°F สำหรับอุ่นของเหลือไม่ใช่เป้าหมายความสุกของผักสด")
    ],
    mistakes: [
      ml("If the eggplants are still firm after 30–35 minutes, do not raise the heat: add 15 ml hot water around them, cover, simmer 5–8 minutes, then test again. If they soften but the filling loosens, lift them out carefully and reduce the pan liquid uncovered for 2–3 minutes.", "燉 30–35 分鐘後若茄子仍硬，不要加大火：沿鍋邊加 15 毫升熱水，加蓋小滾 5–8 分鐘後重測。若茄子已軟但餡料散開，小心取出茄子，再不加蓋收煮鍋汁 2–3 分鐘。", "30〜35分後もなすが硬ければ火を強めず、周囲に熱湯15mlを加えてふたをし、5〜8分静かに煮てから再確認します。なすが柔らかくなったのに具が緩い場合は、そっと取り出し、煮汁だけをふたなしで2〜3分煮詰めます。", "30–35분 뒤에도 가지가 단단하면 불을 높이지 말고 주변에 뜨거운 물 15ml를 넣어 덮고 5–8분 약하게 끓인 뒤 다시 확인하세요. 가지는 부드러운데 속이 묽으면 가지를 조심히 꺼내고 팬 국물만 뚜껑 없이 2–3분 졸입니다.", "หากตุ๋น 30–35 นาทีแล้วยังแข็ง อย่าเพิ่มไฟ เติมน้ำร้อน 15 มล. รอบมะเขือ ปิดฝาเคี่ยว 5–8 นาทีแล้วตรวจอีกครั้ง หากมะเขือนุ่มแต่ไส้เหลว ให้ยกมะเขือออกอย่างระวังและเคี่ยวน้ำในกระทะเปิดฝา 2–3 นาที"),
      ml("A rolling boil or an overfilled pocket can split the eggplants. Keep only small bubbles and mound the filling loosely; if one tears, stop moving it, braise it slit-side up, and serve the escaped filling spooned over the top.", "大滾或口袋塞太滿都會把茄子撐裂。只維持細小氣泡，餡料輕輕堆起即可；若有一條裂開，別再搬動，切口朝上燉煮，盛盤時將漏出的餡料舀回頂部。", "強く煮立てたりポケットに具を詰めすぎたりすると、なすが割れます。泡は小さく保ち、具は軽く盛ります。裂けたら動かさず切れ目を上にして煮込み、流れ出た具を盛り付け時に上からかけます。", "팔팔 끓이거나 속을 너무 꽉 채우면 가지가 찢어집니다. 작은 기포만 유지하고 속은 느슨하게 얹으세요. 찢어지면 더 움직이지 말고 칼집이 위로 오게 조린 뒤 흘러나온 속을 위에 얹어 냅니다.", "การเดือดแรงหรือยัดไส้แน่นเกินทำให้มะเขือแตก รักษาฟองเล็ก ๆ และวางไส้หลวม ๆ หากแตกให้หยุดขยับ ตุ๋นโดยหันรอยกรีดขึ้น แล้วตักไส้ที่ไหลออกมาวางด้านบนตอนเสิร์ฟ")
    ],
    storage: ml(
      "Serve without a long room-temperature hold. Refrigerate leftovers in a shallow covered container at 4°C/40°F or colder within 2 hours (1 hour above 32°C/90°F). Use within 2 days for best texture; that is a quality target, not a safe-storage limit. Reheat leftovers throughout to 74°C/165°F, the official safety minimum for reheated leftovers; this is separate from the eggplant tenderness cue.",
      "不要長時間放在室溫。剩菜放入淺而有蓋的容器，於 2 小時內（環境高於 32°C／90°F 時 1 小時內）冷藏在 4°C／40°F 以下。為保留最佳口感，建議 2 天內食用；這是品質目標，不是安全保存期限。回熱剩菜時中心須達 74°C／165°F，這是官方剩菜回熱安全最低值，與茄子柔軟度判斷不同。",
      "室温に長く置かず、残りは浅いふた付き容器に入れて2時間以内（32°C/90°Fを超える環境では1時間以内）に4°C/40°F以下で冷蔵します。食感を保つため2日以内の使用を勧めますが、これは品質目標であり安全な保存期限ではありません。残りを温め直すときは中心まで74°C/165°Fにします。これは公式の再加熱最低温度で、なすの柔らかさの目安とは別です。",
      "실온에 오래 두지 말고 남은 음식은 얕은 뚜껑 용기에 담아 2시간 안에(32°C/90°F 초과 환경에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 좋은 식감을 위해 2일 안에 먹는 것을 권하며, 이는 품질 목표이지 안전 보관 기한은 아닙니다. 남은 음식을 다시 데울 때 중심까지 74°C/165°F로 가열합니다. 이는 공식 재가열 안전 최소 온도이며 가지의 부드러움 기준과는 다릅니다.",
      "อย่าวางไว้ที่อุณหภูมิห้องนาน ของเหลือใส่ภาชนะตื้นมีฝาปิดและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) เพื่อเนื้อสัมผัสดีที่สุดควรกินภายใน 2 วัน ซึ่งเป็นเป้าหมายด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัย เมื่อนำของเหลือมาอุ่นให้ถึง 74°C/165°F ตรงกลาง นี่คืออุณหภูมิขั้นต่ำทางการสำหรับการอุ่นของเหลือ แยกจากเกณฑ์ความนุ่มของมะเขือ"
    ),
    safetySources: [
      ["FoodSafety.gov: 4 Steps to Food Safety", handling],
      ["FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures]
    ]
  });
}

function reviseHalloumiSaganaki(recipe) {
  reviseRecipe(recipe, {
    cookMinutes: 15,
    titles: [
      ml("Dry and slice the cheese", "擦乾並切片", "チーズの水気を取り切る", "치즈 물기 닦고 썰기", "ซับชีสและหั่น"),
      ml("Dust lightly with flour", "薄薄裹粉", "薄く粉をまぶす", "밀가루 얇게 묻히기", "คลุกแป้งบาง ๆ"),
      ml("Heat the pan gently", "適度預熱平底鍋", "フライパンを適温に熱する", "팬을 알맞게 달구기", "ตั้งกระทะให้ร้อนได้ที่"),
      ml("Fry until golden and springy", "煎至金黃並保有彈性", "きつね色で弾力が出るまで焼く", "노릇하고 탄력이 생길 때까지 굽기", "ทอดจนเหลืองและเด้งนุ่ม"),
      ml("Finish with lemon and serve", "擠檸檬並立即上桌", "レモンを添えてすぐ供する", "레몬을 곁들여 바로 내기", "บีบเลมอนและเสิร์ฟทันที")
    ],
    bodies: [
      ml(
        "Rinse the lemon and optional oregano under running water before cutting; do not use soap. Drain the halloumi from its brine, pat every surface dry, and cut even 1.5 cm slices. Keep the cheese chilled while you prepare the flour and pan, then coat just before frying so the surface stays dry.",
        "檸檬與可選的奧勒岡先在流水下沖洗再切；不要用肥皂。哈魯米自鹽水取出，逐面擦乾，切成厚薄一致的 1.5 公分片。準備麵粉和鍋子時將起司保持冷藏，煎之前才裹粉，讓表面維持乾燥。",
        "レモンと好みで使うオレガノは切る前に流水で洗います。石けんは使いません。ハルーミを塩水から取り出し、全体の水気を拭き、均等な1.5cm厚に切ります。粉とフライパンを準備する間は冷蔵し、表面を乾いた状態に保つため焼く直前に粉をまぶします。",
        "레몬과 선택 재료인 오레가노는 자르기 전에 흐르는 물에 씻고 비누는 쓰지 않습니다. 할루미를 염수에서 꺼내 모든 면의 물기를 닦고 1.5cm 두께로 일정하게 썹니다. 밀가루와 팬을 준비하는 동안 치즈는 차게 두고 표면이 젖지 않도록 굽기 직전에 옷을 입힙니다.",
        "ล้างเลมอนและออริกาโนที่เลือกใช้ใต้ก๊อกน้ำก่อนหั่น ไม่ใช้สบู่ นำฮัลลูมีออกจากน้ำเกลือ ซับทุกด้านให้แห้งและหั่นหนา 1.5 ซม.เท่ากัน ระหว่างเตรียมแป้งและกระทะให้เก็บชีสไว้เย็น แล้วคลุกแป้งก่อนทอดทันทีเพื่อให้ผิวแห้ง"
      ),
      ml(
        "Mix the flour and black pepper on a clean plate. Lightly coat each slice on all faces and tap off loose flour; a thin, even film browns better than a thick layer. Do not taste the dry flour or any uncooked coating. After handling flour, wash hands and the plate and wipe the work surface with hot, soapy water.",
        "在乾淨盤中混合麵粉與黑胡椒。每片起司各面薄薄裹粉，再拍掉鬆散麵粉；均勻薄層比厚粉衣更容易煎香。不要試吃乾麵粉或未煮熟的粉衣。處理麵粉後，以熱肥皂水洗手、清洗盤子並擦拭工作檯面。",
        "清潔な皿で小麦粉と黒こしょうを混ぜます。各面に薄く均一にまぶし、余分な粉を落とします。厚い衣より薄い膜の方がきれいに焼けます。乾いた小麦粉や加熱前の衣を味見しません。粉を扱った後は手を洗い、皿と作業台を熱い石けん水で洗います。",
        "깨끗한 접시에서 밀가루와 후추를 섞습니다. 각 면에 얇고 고르게 묻힌 뒤 남는 가루를 털어냅니다. 두꺼운 옷보다 얇은 막이 더 잘 구워집니다. 마른 밀가루나 익히지 않은 옷을 맛보지 마세요. 밀가루를 다룬 뒤 손을 씻고 접시와 작업대를 뜨거운 비눗물로 닦습니다.",
        "ผสมแป้งกับพริกไทยบนจานสะอาด คลุกชีสทุกด้านบาง ๆ ให้เสมอแล้วเคาะแป้งส่วนเกินออก ชั้นบางเกรียมได้ดีกว่าชั้นหนา อย่าชิมแป้งแห้งหรือแป้งเคลือบที่ยังไม่สุก หลังจับแป้งให้ล้างมือ จานและพื้นทำงานด้วยน้ำร้อนผสมน้ำยาล้างจาน"
      ),
      ml(
        "Heat the olive oil in a heavy skillet over medium to medium-high until it shimmers but does not smoke. Test one slice: it should make a steady gentle sizzle without vigorous spitting. If the oil smokes or the flour browns immediately, lift the pan off the heat briefly and lower the burner; the oil's shimmer is a frying cue, not a food-safety temperature.",
        "厚底鍋以中火至中大火加熱橄欖油，至表面微亮但不冒煙。先放一片測試：應持續溫和滋滋作響，不該劇烈噴濺。若油冒煙或麵粉立刻變褐，先將鍋離火片刻並轉小火；油面閃亮是煎炸狀態提示，不是食安溫度。",
        "厚手のフライパンでオリーブ油を中火〜中強火で熱し、揺らめくが煙は出ない状態にします。1枚試し、激しく跳ねず安定した小さな音がすることを確認します。油から煙が出る、または粉がすぐ茶色くなる場合は一度火から外して弱めます。油の揺らめきは揚げ焼きの目安で、安全温度ではありません。",
        "두꺼운 팬에 올리브오일을 중불에서 중강불로 달궈 반짝이되 연기가 나지 않게 합니다. 한 조각을 시험 삼아 넣어 세게 튀지 않고 일정하게 잔잔한 소리가 나는지 확인합니다. 기름에서 연기가 나거나 밀가루가 바로 갈색이 되면 잠시 불에서 내리고 화력을 낮춥니다. 기름의 반짝임은 굽기 상태 신호이지 식품 안전 온도가 아닙니다.",
        "อุ่นน้ำมันมะกอกในกระทะก้นหนาไฟกลางถึงกลางค่อนแรงจนระยิบแต่ไม่ควัน ลองใส่ชีสหนึ่งชิ้น ควรมีเสียงฉ่าสม่ำเสมอเบา ๆ ไม่กระเด็นแรง หากน้ำมันควันขึ้นหรือแป้งเป็นสีน้ำตาลทันที ยกกระทะออกจากไฟชั่วครู่และลดไฟ ความระยิบของน้ำมันเป็นสัญญาณการทอด ไม่ใช่อุณหภูมิด้านความปลอดภัย"
      ),
      ml(
        "Fry in a single uncrowded layer for 2–3 minutes per side; work in batches so the pan stays hot. Turn a slice only when the first face is deep golden and releases without scraping. The flour should look dry and set with no dusty white patches, while the cheese stays warm and springy rather than melting. These are texture and appearance targets, not a numeric safe-minimum temperature for the cheese. If the crust colours before the centre warms, lower the heat and cook in 30–60 second increments; if the slice sticks, wait 20 seconds and test its edge again instead of tearing the crust.",
        "起司單層不擁擠地煎，每面 2–3 分鐘；分批料理可避免鍋溫下降。第一面呈深金黃且不需刮就能自然離鍋時再翻。麵粉應乾爽定型、不留白色粉末斑，起司中心保持溫熱有彈性而非融化。這些是口感與外觀目標，不是哈魯米起司的數字型安全最低溫度。若外皮先上色而中心仍冷，轉小火，每次續煎 30–60 秒；若起司黏鍋，等 20 秒再試邊緣，不要撕破外皮。",
        "チーズを重ねず一段に並べ、片面2〜3分ずつ焼きます。鍋の温度を保つため数回に分けます。最初の面が濃いきつね色になり、こすらなくても自然にはがれてから返します。衣は乾いて固まり、白い粉が残らず、チーズの中心は溶けずに温かく弾力がある状態にします。これらは食感と見た目の目標で、ハルーミの数値安全最低温度ではありません。表面だけ先に色づき中心が温まらない場合は火を弱め、30〜60秒ずつ追加します。くっつく場合は20秒待って縁を再確認し、衣を破らないようにします。",
        "치즈를 겹치지 않게 한 층으로 놓고 한 면당 2–3분 굽습니다. 팬 온도를 유지하도록 나눠 굽습니다. 첫 면이 진한 황금빛이 되고 긁지 않아도 자연스럽게 떨어질 때 뒤집습니다. 밀가루는 마르고 굳어 흰 가루가 남지 않아야 하며 치즈 중심은 녹지 않고 따뜻하고 탄력이 있어야 합니다. 이는 식감과 겉모양 목표이지 치즈의 수치형 안전 최소 온도가 아닙니다. 겉이 중심보다 먼저 갈색이 되면 불을 낮추고 30–60초씩 더 익힙니다. 달라붙으면 억지로 뜯지 말고 20초 기다린 뒤 가장자리를 다시 확인하세요.",
        "ทอดชีสชั้นเดียวไม่แน่น ด้านละ 2–3 นาที แบ่งทอดเพื่อให้กระทะยังร้อน พลิกเมื่อด้านแรกเป็นสีทองเข้มและคลายออกเองโดยไม่ต้องแซะ แป้งควรแห้งเซ็ต ไม่มีคราบแป้งขาว และชีสด้านในอุ่นเด้งไม่ละลาย นี่คือเป้าหมายด้านเนื้อสัมผัสและรูปลักษณ์ ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัยของฮัลลูมี หากผิวเป็นสีก่อนใจกลางอุ่น ลดไฟและทอดเพิ่มครั้งละ 30–60 วินาที หากติดกระทะ รอ 20 วินาทีแล้วลองขอบอีกครั้ง อย่าฉีกผิวเกรียม"
      ),
      ml(
        "Move the slices to a warm plate, squeeze over the listed lemon, scatter oregano if using, and serve immediately. The crust is crispest just after frying and the centre firms as it cools; no additional cook or internal-temperature target is needed for this cheese-only dish. Refrigerate leftovers promptly and follow the separate reheating guidance below.",
        "移至溫盤，擠上食材表所列的檸檬汁，若使用奧勒岡就撒上，立即上桌。剛煎好時外皮最酥脆，中心冷卻後會變緊實；這道純起司料理不另設烹煮或中心溫度目標。剩菜須盡快冷藏，回熱方式見下方保存說明。",
        "温めた皿に移し、材料表のレモンを絞り、好みでオレガノを散らしてすぐに供します。焼きたてが最もカリッとしており、冷めると中心は締まります。このチーズだけの料理に別の加熱時間や中心温度目標は設けません。残りはすぐ冷蔵し、温め直しは下の保存案内に従います。",
        "따뜻한 접시에 옮겨 재료표의 레몬을 짜고 원하면 오레가노를 뿌려 바로 냅니다. 막 구웠을 때 가장 바삭하고 식으면서 중심은 단단해집니다. 치즈만 있는 이 요리에 별도의 조리 시간이나 중심 온도 목표를 두지 않습니다. 남은 것은 바로 냉장하고 아래 보관 안내에 따라 다시 데웁니다.",
        "ย้ายใส่จานอุ่น บีบเลมอนตามรายการ โรยออริกาโนหากใช้และเสิร์ฟทันที ผิวจะกรอบที่สุดหลังทอดใหม่ ๆ และเนื้อด้านในจะแน่นขึ้นเมื่อเย็น เมนูที่มีแต่ชีสนี้ไม่ตั้งเวลาอบหรือเป้าหมายอุณหภูมิตรงกลางเพิ่มเติม แช่เย็นของเหลือทันทีและดูคำแนะนำการอุ่นด้านล่าง"
      )
    ],
    tips: [
      ml("Dry surfaces and a lightly dusted coating help the halloumi release cleanly and brown before the cheese centre becomes too firm.", "表面擦乾、薄裹粉可讓哈魯米自然離鍋並上色，避免中心先變得過硬。", "表面をよく拭き、薄く粉をまぶすと、中心が硬くなりすぎる前にきれいな焼き色が付きます。", "표면을 잘 말리고 얇게 밀가루를 입히면 치즈 속이 너무 단단해지기 전에 잘 떨어지고 노릇해집니다.", "ซับผิวให้แห้งและคลุกแป้งบาง ๆ ช่วยให้ชีสคลายจากกระทะและเกรียมก่อนที่เนื้อด้านในจะแน่นเกินไป"),
      ml("Cook only as many slices as fit in one layer. The golden crust and springy centre are texture goals; use the listed timing as a starting point and adjust by sight and feel.", "每批只煎能單層排入的份量。金黃外皮和彈嫩中心是口感目標；食材時間只是起點，依顏色和觸感調整。", "一度に焼くのは一段に並ぶ分だけにします。きつね色の表面と弾力のある中心は食感の目標です。記載時間を目安に、見た目と触感で調整します。", "한 번에 한 층으로 놓을 수 있는 양만 굽습니다. 황금빛 껍질과 탄력 있는 속은 식감 목표입니다. 표시 시간은 시작점으로 삼고 색과 느낌으로 조정하세요.", "ทอดครั้งละเท่าที่วางได้ชั้นเดียว ผิวสีทองและเนื้อด้านในเด้งเป็นเป้าหมายด้านสัมผัส ใช้เวลาที่ระบุเป็นจุดเริ่มแล้วปรับตามสีและความรู้สึก")
    ],
    mistakes: [
      ml("If the flour browns before the centre warms, lower the heat and continue in 30–60 second checks. If a slice will not release, give it another 20 seconds; forcing it early tears the crust.", "若麵粉先褐化而中心尚未溫熱，轉小火並每次續煎 30–60 秒檢查。起司片若黏鍋，再等 20 秒；太早硬撬會撕破外皮。", "中心が温まる前に粉が色づいたら火を弱め、30〜60秒ずつ追加して確認します。はがれないときは20秒待ちます。早く無理にはがすと衣が破れます。", "중심이 따뜻해지기 전에 밀가루가 갈색이 되면 불을 낮추고 30–60초씩 더 익혀 확인합니다. 조각이 떨어지지 않으면 20초 더 기다리세요. 억지로 떼면 겉옷이 찢어집니다.", "หากแป้งเป็นสีก่อนใจกลางอุ่น ลดไฟและทอดต่อครั้งละ 30–60 วินาทีแล้วตรวจ หากชีสยังไม่คลายให้รออีก 20 วินาที การแซะฝืนเร็วเกินไปทำให้ผิวฉีก"),
      ml("Crowding or wet cheese traps steam and makes the crust soft. Pat dry again, wipe out wet flour clumps, and fry in smaller batches; if the oil smokes, take the pan off the burner until it stops, then resume at lower heat.", "鍋中太擠或起司表面潮濕會困住蒸氣、讓外皮變軟。再擦乾、抖掉濕結粉塊並分小批煎；若油冒煙，先離火待煙散，再以小火續煎。", "詰め込みすぎや濡れたチーズは蒸気を閉じ込め、衣が柔らかくなります。再度水気を取り、湿った粉の塊を落として少量ずつ焼きます。油から煙が出たら火から外して煙が止まるまで待ち、弱火で再開します。", "팬을 너무 채우거나 치즈가 젖어 있으면 김이 갇혀 껍질이 눅눅해집니다. 다시 닦고 젖은 밀가루 덩어리를 털어 적은 양씩 굽습니다. 기름에서 연기가 나면 팬을 불에서 내려 연기가 멈춘 뒤 낮은 불로 다시 시작하세요.", "การใส่แน่นหรือชีสเปียกทำให้ไอน้ำขังและผิวนิ่ม ซับให้แห้งอีกครั้ง เคาะก้อนแป้งเปียกออกและทอดรอบเล็กลง หากน้ำมันควันขึ้น ยกกระทะออกจากเตาจนควันหยุด แล้วเริ่มใหม่ด้วยไฟต่ำ")
    ],
    storage: ml(
      "Serve immediately for the crispest texture. Refrigerate leftovers in a shallow covered container at 4°C/40°F or colder within 2 hours (1 hour above 32°C/90°F). Use within 2 days for best texture; that is a quality target, not a safe-storage limit. Reheat leftovers throughout to 74°C/165°F, the official safety minimum for reheated leftovers; the cheese may become firmer. The pan-sizzle and golden-colour cues describe frying and texture, not a safety temperature.",
      "外皮最酥時應立即上桌。剩菜放入淺而有蓋的容器，於 2 小時內（環境高於 32°C／90°F 時 1 小時內）冷藏在 4°C／40°F 以下。為保留最佳口感，建議 2 天內食用；這是品質目標，不是安全保存期限。回熱剩菜時中心須達 74°C／165°F，這是官方剩菜回熱安全最低值；起司可能變得較緊實。鍋中滋滋聲和金黃色只描述煎炸及口感，不是安全溫度。",
      "最もカリッとした食感のため、すぐに供します。残りは浅いふた付き容器に入れて2時間以内（32°C/90°Fを超える環境では1時間以内）に4°C/40°F以下で冷蔵します。食感を保つため2日以内の使用を勧めますが、これは品質目標であり安全な保存期限ではありません。残りを温め直すときは中心まで74°C/165°Fにします。これは公式の再加熱最低温度で、チーズは少し硬くなることがあります。焼く音やきつね色は焼き加減と食感の目安で、安全温度ではありません。",
      "가장 바삭할 때 바로 냅니다. 남은 음식은 얕은 뚜껑 용기에 담아 2시간 안에(32°C/90°F 초과 환경에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 좋은 식감을 위해 2일 안에 먹는 것을 권하며, 이는 품질 목표이지 안전 보관 기한은 아닙니다. 남은 음식을 다시 데울 때 중심까지 74°C/165°F로 가열합니다. 이는 공식 재가열 안전 최소 온도이며 치즈가 더 단단해질 수 있습니다. 팬에서 나는 소리와 황금빛은 굽기와 식감 신호이지 안전 온도가 아닙니다.",
      "เสิร์ฟทันทีเพื่อให้กรอบที่สุด ของเหลือใส่ภาชนะตื้นมีฝาปิดและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) เพื่อเนื้อสัมผัสดีที่สุดควรกินภายใน 2 วัน ซึ่งเป็นเป้าหมายด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัย เมื่อนำของเหลือมาอุ่นให้ถึง 74°C/165°F ตรงกลาง นี่คืออุณหภูมิขั้นต่ำทางการสำหรับการอุ่นของเหลือ ชีสอาจแน่นขึ้น เสียงฉ่าและสีทองบอกวิธีทอดและเนื้อสัมผัส ไม่ใช่อุณหภูมิความปลอดภัย"
    ),
    safetySources: [
      ["FoodSafety.gov: 4 Steps to Food Safety", handling],
      ["FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures],
      ["FDA: Flour Is a Raw Food and Other Safety Facts", rawFlour]
    ]
  });
}

export function refineEightyFourthMethods(recipes) {
  for (const recipe of recipes) {
    if (recipe.id === "zaalouk") reviseZaalouk(recipe);
    if (recipe.id === "imam-bayildi") reviseImamBayildi(recipe);
    if (recipe.id === "halloumi-saganaki") reviseHalloumiSaganaki(recipe);
  }
}
