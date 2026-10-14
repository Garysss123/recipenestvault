// Reimplementation batch 1. These newly authored refinements are not recovered
// from the unavailable handoff patches; the current source drafts remain intact.
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${label}`, url });
  }
}

function reviseRecipe(recipe, revision) {
  recipe.instructions = recipe.instructions.map((step, index) => ({
    ...step,
    title: revision.titles[index],
    body: revision.bodies[index]
  }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = revision.tips;
  recipe.commonMistakes = revision.mistakes;
  recipe.storage = revision.storage;
  if (revision.cookMinutes !== undefined) {
    recipe.cookMinutes = revision.cookMinutes;
    recipe.totalMinutes = recipe.prepMinutes + revision.cookMinutes;
  }
  for (const [label, url] of revision.safetySources) addOfficialSource(recipe, label, url);
}

function reviseButterChicken(recipe) {
  reviseRecipe(recipe, {
    cookMinutes: 60,
    titles: [
      ml("Marinate the chicken", "醃雞肉", "鶏肉を漬け込む", "닭고기 재우기", "หมักไก่"),
      ml("Roast to light char", "烤至邊緣微焦", "鶏肉を軽く焦がす", "닭고기 가장자리를 살짝 그을리기", "อบไก่ให้ขอบเกรียมเล็กน้อย"),
      ml("Cook the tomato base", "熬煮番茄底醬", "トマトベースを煮る", "토마토 베이스 익히기", "เคี่ยวฐานมะเขือเทศ"),
      ml("Blend and strain the sauce", "打勻並過濾醬汁", "ソースを攪拌して濾す", "소스를 갈아 거르기", "ปั่นและกรองซอส"),
      ml("Simmer to a silky consistency", "小火煮至絲滑", "なめらかになるまで煮る", "부드러워질 때까지 끓이기", "เคี่ยวจนเนียนข้น"),
      ml("Return the chicken to the sauce", "將雞肉放回醬汁", "鶏肉をソースに戻す", "닭고기를 소스에 다시 넣기", "ใส่ไก่กลับลงซอส"),
      ml("Finish gently with cream and fenugreek", "小火拌入鮮奶油與葫蘆巴", "生クリームとカスリメティで仕上げる", "크림과 페누그릭으로 마무리하기", "เติมครีมและใบเฟนูกรีกอย่างเบามือ"),
      ml("Rest and serve", "靜置後上桌", "休ませて供する", "잠시 두었다가 내기", "พักแล้วเสิร์ฟ")
    ],
    bodies: [
      ml(
        "In a clean bowl, mix 120 g thick yogurt, 10 g ginger-garlic paste, 5 g Kashmiri chile powder, 15 ml lemon juice, and 4 g salt. Coat the 700 g chicken pieces evenly, cover, and refrigerate below 4°C for 6–12 hours; never marinate on the counter.",
        "在乾淨碗中拌勻 120 公克濃稠優格、10 公克薑蒜泥、5 公克喀什米爾辣椒粉、15 毫升檸檬汁與 4 公克鹽。讓 700 公克雞腿肉均勻裹上醃料，加蓋冷藏於 4°C 以下 6–12 小時；不可放在室溫醃製。",
        "清潔なボウルで濃厚なヨーグルト120g、ジンジャーガーリックペースト10g、カシミールチリパウダー5g、レモン汁15ml、塩4gを混ぜます。700gの鶏肉に均一に絡め、ふたをして4°C未満で6〜12時間冷蔵します。室温では漬けません。",
        "깨끗한 그릇에 되직한 요거트 120g, 생강마늘 페이스트 10g, 카슈미르 고춧가루 5g, 레몬즙 15ml, 소금 4g을 섞습니다. 닭고기 700g에 고루 묻혀 덮고 4°C 미만에서 6–12시간 냉장합니다. 실온에서 재우지 않습니다.",
        "ผสมโยเกิร์ตข้น 120 กรัม ขิงกระเทียมบด 10 กรัม พริกแคชเมียร์ป่น 5 กรัม น้ำมะนาว 15 มล. และเกลือ 4 กรัมในชามสะอาด คลุกกับไก่ 700 กรัมให้ทั่ว ปิดฝาและแช่เย็นต่ำกว่า 4°C นาน 6–12 ชั่วโมง ห้ามหมักไว้ที่อุณหภูมิห้อง"
      ),
      ml(
        "Heat the oven to 230°C with a rack over a rimmed tray. Shake thick excess marinade from the chicken and space the pieces apart. Roast 14–18 minutes, turning once halfway. Check the centre of several of the largest pieces with a thermometer; each must reach 74°C. If one is lower, roast in 2-minute increments and recheck.",
        "烤箱連同架子預熱至 230°C，架子下放有邊烤盤。抖掉雞肉上厚重的多餘醃料，肉塊彼此留空隙，烤 14–18 分鐘並於中途翻面一次。用溫度計測量幾塊最大肉塊的中心，每塊都須達 74°C；未達者每次續烤 2 分鐘再測。",
        "天板に網を置き、オーブンを230°Cに予熱します。鶏肉の厚い余分な漬けだれを軽く落とし、間隔を空けて並べます。14〜18分焼き、途中で一度返します。大きめの数片の中心を温度計で測り、すべて74°Cに達していることを確認します。低ければ2分ずつ追加して再測定します。",
        "테두리 있는 팬 위에 석쇠를 놓고 오븐을 230°C로 예열합니다. 닭고기에 두껍게 묻은 양념을 털고 서로 간격을 두어 14–18분 굽습니다. 중간에 한 번 뒤집습니다. 큰 조각 여러 개의 중심을 온도계로 재어 모두 74°C에 도달했는지 확인하고, 낮으면 2분씩 더 구워 다시 잽니다.",
        "วางตะแกรงบนถาดขอบสูงและอุ่นเตาอบที่ 230°C สะบัดน้ำหมักส่วนที่หนาออกจากไก่ วางชิ้นให้ห่างกัน อบ 14–18 นาที พลิกหนึ่งครั้งครึ่งทาง ใช้เทอร์โมมิเตอร์วัดกลางชิ้นใหญ่หลายชิ้น ทุกชิ้นต้องถึง 74°C หากยังต่ำให้อบเพิ่มครั้งละ 2 นาทีแล้ววัดซ้ำ"
      ),
      ml(
        "While the chicken roasts, melt 25 g butter over medium heat. Stir in the remaining 10 g ginger-garlic paste for about 45 seconds, just until fragrant and still pale. Add 600 g chopped tomatoes, the remaining 3 g chile powder, and 3 g salt. Simmer uncovered for 12–15 minutes, stirring every few minutes, until pulpy and reduced by about one-third; lower the heat if the edges catch.",
        "雞肉烘烤時，以中火融化 25 公克奶油。加入剩下的 10 公克薑蒜泥拌約 45 秒，剛有香氣且仍呈淺色即可。加入 600 公克番茄丁、剩下的 3 公克辣椒粉及 3 公克鹽，不加蓋煮 12–15 分鐘，每隔幾分鐘攪拌，至番茄糊化並收濃約三分之一；鍋邊開始黏時轉小火。",
        "鶏肉を焼いている間に、バター25gを中火で溶かします。残りのジンジャーガーリックペースト10gを加え、香りが立つまで約45秒、色づかせないように炒めます。刻んだトマト600g、残りのチリパウダー3g、塩3gを加え、ふたをせず12〜15分、ときどき混ぜながら、トマトが崩れて約3分の1量まで煮詰まるまで加熱します。縁が焦げつきそうなら火を弱めます。",
        "닭고기를 굽는 동안 버터 25g을 중불로 녹입니다. 남은 생강마늘 페이스트 10g을 넣고 향이 날 때까지 약 45초 볶되 갈색이 되지 않게 합니다. 다진 토마토 600g, 남은 고춧가루 3g, 소금 3g을 넣고 뚜껑 없이 12–15분 끓입니다. 몇 분마다 저어 토마토가 풀리고 약 3분의 1 정도 졸아들게 하며, 가장자리가 눌어붙으면 불을 낮춥니다.",
        "ระหว่างอบไก่ ละลายเนย 25 กรัมด้วยไฟกลาง ใส่ขิงกระเทียมบดที่เหลือ 10 กรัม ผัดประมาณ 45 วินาทีจนหอมแต่ยังสีอ่อน เติมมะเขือเทศสับ 600 กรัม พริกป่นที่เหลือ 3 กรัม และเกลือ 3 กรัม เคี่ยวเปิดฝา 12–15 นาที คนทุกสองสามนาทีจนมะเขือเทศเละและงวดลงประมาณหนึ่งในสาม ลดไฟหากขอบกระทะเริ่มติด"
      ),
      ml(
        "Let the bubbling stop before blending the tomato base with the drained 50 g soaked cashews and 150 ml water. If the mixture is hot, work in small batches and vent the blender exactly as its maker directs; never seal hot purée. Strain into a clean saucepan, pressing the soft pulp and leaving coarse skins behind.",
        "番茄底醬停止劇烈冒泡後，與瀝乾的 50 公克浸泡腰果及 150 毫升水分批打勻。若醬料仍燙，少量分批操作並依調理機說明排出蒸氣；不可密封攪打熱泥。過篩倒入乾淨鍋中，壓出軟果肉，留下粗皮。",
        "トマトベースの沸騰が収まってから、水気を切った浸水済みカシューナッツ50gと水150mlを加えて攪拌します。熱い場合は少量ずつ、メーカーの説明どおりに蒸気を逃がして作業し、熱いピューレを密閉しません。清潔な鍋に濾し、柔らかい果肉を押し出して粗い皮を残します。",
        "토마토 베이스의 끓음이 잦아든 뒤 불린 캐슈넛 50g의 물기를 빼고 물 150ml와 함께 갈아줍니다. 뜨거우면 소량씩 나누고 제품 설명에 따라 증기를 배출하세요. 뜨거운 퓌레를 밀폐해 갈지 않습니다. 깨끗한 냄비에 체로 거르며 부드러운 과육을 눌러 내리고 거친 껍질은 남깁니다.",
        "รอให้ฐานมะเขือเทศหยุดเดือดแรงก่อนปั่นกับเม็ดมะม่วงหิมพานต์แช่น้ำที่สะเด็ดแล้ว 50 กรัมและน้ำ 150 มล. หากส่วนผสมยังร้อน ให้ปั่นทีละน้อยและระบายไอตามคู่มือเครื่อง ห้ามปิดสนิทขณะปั่นซอสร้อน กรองลงหม้อสะอาด กดเนื้อนิ่มผ่านตะแกรงและทิ้งเปลือกหยาบไว้"
      ),
      ml(
        "Add the remaining 100 ml water and simmer on low for 8 minutes, stirring often. The sauce should coat a spoon but still flow. If it becomes paste-like, whisk in hot water 5 ml at a time from the measured amount; if it is loose, reduce uncovered in 2-minute increments.",
        "加入剩下的 100 毫升水，以小火煮 8 分鐘並經常攪拌。醬汁應能附著匙面但仍會流動；若濃成糊狀，每次從量好的水中取 5 毫升熱水拌入。若仍偏稀，打開鍋蓋每次續煮 2 分鐘收濃。",
        "残りの水100mlを加え、弱火で8分、ときどき混ぜながら煮ます。スプーンに付くが流れる濃度が目安です。ペースト状になったら、計量した水から熱湯を5mlずつ加えて混ぜます。緩ければふたをせず2分ずつ煮詰めます。",
        "남은 물 100ml를 넣고 약불에서 8분 자주 저으며 끓입니다. 소스가 숟가락에 묻으면서도 흐르는 농도가 알맞습니다. 되직한 반죽처럼 되면 계량한 물에서 뜨거운 물을 5ml씩 넣어 휘젓고, 묽으면 뚜껑을 열어 2분씩 더 졸입니다.",
        "เติมน้ำที่เหลือ 100 มล. เคี่ยวไฟอ่อน 8 นาที คนบ่อย ๆ ซอสควรเคลือบช้อนได้แต่ยังไหล หากข้นเป็นเนื้อแป้ง ให้เติมน้ำร้อนจากปริมาณที่ตวงไว้ครั้งละ 5 มล. หากยังเหลวให้เคี่ยวเปิดฝาเพิ่มครั้งละ 2 นาที"
      ),
      ml(
        "Add the roasted chicken and every bit of tray juice. Simmer gently for 5–7 minutes, stirring from the bottom. Recheck the centre of the largest chicken pieces at 74°C and look for sauce clinging without an oily pool. If the sauce starts to separate, lower the heat and stir slowly.",
        "將烤好的雞肉與烤盤肉汁全部放入醬汁，小火煮 5–7 分鐘並從鍋底攪拌。再次測量最大雞塊中心，確認達 74°C；醬汁應附著肉塊，表面不應浮一圈油。若醬汁開始分離，轉小火慢慢攪拌。",
        "焼いた鶏肉と天板に出た肉汁をすべて加えます。弱く5〜7分煮て、鍋底から混ぜます。最も大きい鶏肉の中心を再度測り74°Cを確認します。ソースが鶏肉に絡み、油だけが浮かない状態が目安です。分離し始めたら火を弱め、ゆっくり混ぜます。",
        "구운 닭고기와 팬에 나온 육즙을 모두 넣습니다. 약하게 5–7분 끓이며 바닥부터 저어줍니다. 가장 큰 닭고기 조각 중심을 다시 재어 74°C인지 확인하고 소스가 고기에 묻되 기름층이 따로 고이지 않는지 봅니다. 분리되기 시작하면 불을 낮추고 천천히 저으세요.",
        "ใส่ไก่ที่อบแล้วและน้ำจากถาดทั้งหมด เคี่ยวเบา ๆ 5–7 นาที คนถึงก้นหม้อ วัดกลางชิ้นไก่ที่ใหญ่ที่สุดอีกครั้งให้ถึง 74°C ซอสควรเกาะไก่โดยไม่มีน้ำมันแยกเป็นแอ่ง หากซอสเริ่มแยกให้ลดไฟและคนช้า ๆ"
      ),
      ml(
        "Lower the heat. Whisk a few spoonfuls of hot sauce into the 120 ml cream, then stir it back into the pan with 4 g garam masala, 3 g crushed dried fenugreek, and 15 g butter. Warm for 2 minutes without a hard boil so the cream stays smooth.",
        "轉小火，先舀幾匙熱醬汁拌入 120 毫升鮮奶油，再倒回鍋中，加入 4 公克印度綜合香料、3 公克捏碎的乾葫蘆巴葉與 15 公克奶油。溫熱 2 分鐘即可，不要大滾，以免鮮奶油變粗。",
        "火を弱めます。熱いソースを数さじ生クリーム120mlに混ぜてから鍋に戻し、ガラムマサラ4g、砕いた乾燥フェヌグリーク3g、バター15gを加えます。強く沸騰させず2分温め、クリームのなめらかさを保ちます。",
        "불을 낮춥니다. 뜨거운 소스 몇 숟가락을 생크림 120ml에 섞은 뒤 팬에 되돌리고 가람 마살라 4g, 으깬 말린 페누그릭 잎 3g, 버터 15g을 넣습니다. 세게 끓이지 않고 2분 데워 크림이 매끄럽게 유지되게 합니다.",
        "ลดไฟ ตักซอสร้อนสองสามช้อนผสมกับครีม 120 มล. แล้วเทกลับหม้อ ใส่การัมมาซาลา 4 กรัม ใบเฟนูกรีกแห้งบด 3 กรัม และเนย 15 กรัม อุ่น 2 นาทีโดยไม่ให้เดือดแรงเพื่อให้ครีมเนียน"
      ),
      ml(
        "Turn off the heat, swirl in the final 5 g butter, cover, and rest for 5 minutes. Taste after the sauce is finished, then serve with rice or naan while glossy and hot.",
        "關火，旋入最後 5 公克奶油，加蓋靜置 5 分鐘。醬汁完成後再試味，趁光亮熱騰時搭配米飯或烤餅上桌。",
        "火を止め、残りのバター5gを溶かし込み、ふたをして5分休ませます。仕上げてから味を確かめ、つやのある熱いうちにご飯やナンと供します。",
        "불을 끄고 남은 버터 5g을 녹여 섞은 뒤 덮어 5분 둡니다. 소스를 완성한 뒤 간을 보고 윤기 있고 뜨거울 때 밥이나 난과 함께 냅니다.",
        "ปิดไฟ คนเนย 5 กรัมที่เหลือลงไป ปิดฝาพัก 5 นาที ชิมหลังซอสเสร็จแล้ว เสิร์ฟร้อนเงากับข้าวหรือแป้งนาน"
      )
    ],
    tips: [
      ml("Use thick yogurt so the marinade clings instead of running off the chicken.", "使用濃稠優格，讓醃料附著雞肉而不流落。", "漬けだれが流れ落ちないよう、濃厚なヨーグルトを使います。", "양념이 흘러내리지 않도록 되직한 요거트를 사용합니다.", "ใช้โยเกิร์ตข้นเพื่อให้น้ำหมักเกาะไก่ไม่ไหลออก"),
      ml("Make the tomato base while the chicken roasts; keep the pieces spaced so they brown rather than steam.", "雞肉烘烤時熬番茄底醬，肉塊留空隙以烤上色而非蒸熟。", "鶏肉を焼く間にトマトベースを作り、鶏肉は間隔を空けて蒸れずに焼き色を付けます。", "닭고기를 굽는 동안 토마토 베이스를 만들고, 닭고기는 서로 띄워 쪄지지 않고 갈색이 나게 합니다.", "ทำฐานมะเขือเทศระหว่างอบไก่ และวางไก่ให้ห่างเพื่อให้เกรียมแทนการอบไอน้ำ")
    ],
    mistakes: [
      ml("A crowded tray steams the chicken; use two trays if the pieces touch.", "烤盤太擠會讓雞肉變成蒸熟；肉塊碰在一起時改用兩盤。", "天板が混むと鶏肉が蒸れてしまいます。触れ合う場合は2枚に分けます。", "팬이 좁아 닭고기가 붙으면 굽기보다 찌게 됩니다. 두 팬으로 나누세요.", "ถาดแน่นเกินไปทำให้ไก่นึ่งแทนการย่าง หากชิ้นแตะกันให้ใช้สองถาด"),
      ml("Sealing hot sauce in a blender can build pressure; vent it as directed and blend in small batches.", "熱醬汁密封攪打會累積壓力；依機器說明排氣並少量分批打。", "熱いソースを密閉して攪拌すると圧力が上がります。説明書どおりに蒸気を逃がし、少量ずつ攪拌します。", "뜨거운 소스를 밀폐해 갈면 압력이 생길 수 있습니다. 설명에 따라 증기를 빼고 소량씩 갈아주세요.", "การปั่นซอสร้อนแบบปิดสนิททำให้แรงดันสะสม ให้ระบายไอตามคู่มือและปั่นทีละน้อย")
    ],
    storage: ml(
      "Cool leftovers in shallow covered containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3–4 days. Reheat only the portion needed until it reaches 74°C/165°F throughout.",
      "剩食分裝淺而有蓋的容器，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），冰箱維持 4°C／40°F 以下，3–4 天內食用。只取需要的份量加熱，中心各處達 74°C／165°F。",
      "残りは浅いふた付き容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。3〜4日以内に食べ、食べる分だけ中心まで74°C/165°Fに再加熱します。",
      "남은 음식은 얕고 뚜껑 있는 용기에 나누어 2시간 이내(32°C/90°F 초과 시 1시간 이내) 4°C/40°F 이하로 냉장합니다. 3–4일 안에 먹고 필요한 양만 중심까지 74°C/165°F로 다시 데웁니다.",
      "แบ่งของเหลือใส่ภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ร้อนถึง 74°C/165°F ทั่วถึง"
    ),
    safetySources: [["safe minimum internal temperatures", temperatures], ["refrigeration and handling", handling]]
  });
}

function reviseCheeseburger(recipe) {
  reviseRecipe(recipe, {
    titles: [
      ml("Prepare the cold toppings", "準備冷配料", "冷たいトッピングを用意", "차가운 토핑 준비", "เตรียมท็อปปิงเย็น"),
      ml("Shape and season the beef", "分份塑形並調味牛肉", "牛肉を分けて形を整え、味付け", "소고기를 나누어 모양을 잡고 간하기", "แบ่ง ปั้น และปรุงรสเนื้อ"),
      ml("Toast the buns", "烤香麵包", "バンズを焼く", "번 굽기", "ปิ้งขนมปัง"),
      ml("Sear the first side", "煎出第一面焦殼", "片面を焼き付ける", "한쪽 면 굽기", "จี่ด้านแรก"),
      ml("Melt the cheese and check doneness", "融化起司並確認熟度", "チーズを溶かして火の通りを確認", "치즈를 녹이고 익힘 확인", "ละลายชีสและตรวจความสุก"),
      ml("Sauce the buns", "塗上醬料", "バンズにソースを塗る", "번에 소스 바르기", "ทาซอสบนขนมปัง"),
      ml("Assemble and serve", "組裝並上桌", "組み立てて供する", "조립해 내기", "ประกอบและเสิร์ฟ")
    ],
    bodies: [
      ml(
        "Rinse the tomato, onion, and lettuce under running water, then dry them. Slice the tomato and onion thinly, separate the lettuce leaves, and drain the pickles. Keep the ready-to-eat toppings chilled and away from the raw-beef board and utensils.",
        "番茄、洋蔥與生菜先用流水沖洗並擦乾。番茄和洋蔥切薄片，拆開生菜葉並瀝乾酸黃瓜。冷配料冷藏保存，與生牛肉使用的砧板和器具分開。",
        "トマト、玉ねぎ、レタスは流水で洗って水気を拭きます。トマトと玉ねぎを薄切りにし、レタスを分け、ピクルスの汁を切ります。生で食べる具材は冷蔵し、生の牛肉を扱うまな板や器具から離します。",
        "토마토, 양파, 상추를 흐르는 물에 씻고 물기를 닦습니다. 토마토와 양파는 얇게 썰고 상추 잎을 떼며 피클은 물기를 뺍니다. 바로 먹는 토핑은 차게 두고 생소고기용 도마와 도구에서 분리합니다.",
        "ล้างมะเขือเทศ หอมใหญ่ และผักกาดใต้ก๊อกน้ำแล้วซับให้แห้ง หั่นมะเขือเทศกับหอมบาง ๆ แยกใบผักกาดและสะเด็ดแตงดอง เก็บท็อปปิงที่กินสดไว้เย็นและแยกจากเขียงกับอุปกรณ์ที่ใช้กับเนื้อดิบ"
      ),
      ml(
        "Divide 720 g beef into four loose 180 g portions. Shape each just to bun width and about 15 mm thick without kneading; make a shallow dimple in the centre. Sprinkle all 8 g salt and 2 g pepper evenly over both sides just before cooking.",
        "將 720 公克牛絞肉分成四份，每份 180 公克，輕輕整成約麵包寬、厚約 15 毫米的肉排，不要揉捏；中央壓一個淺凹。下鍋前才把全部 8 公克鹽與 2 公克胡椒均勻撒在兩面。",
        "牛ひき肉720gを180gずつ4つに分けます。こねずにバンズ幅、厚さ約15mmに軽く形を整え、中央を浅くくぼませます。焼く直前に塩8gとこしょう2gを両面へ均等に振ります。",
        "소고기 720g을 180g씩 네 덩이로 나눕니다. 치대지 말고 번 너비, 두께 약 15mm로 가볍게 빚고 가운데를 얕게 눌러 줍니다. 굽기 직전에 소금 8g과 후추 2g 전량을 양면에 고루 뿌립니다.",
        "แบ่งเนื้อบด 720 กรัมเป็น 4 ส่วน ๆ ละ 180 กรัม ปั้นหลวม ๆ ให้กว้างพอ ๆ กับขนมปัง หนาประมาณ 15 มม. โดยไม่คลุกนวด กดกลางให้บุ๋มตื้น ๆ โรยเกลือ 8 กรัมและพริกไทย 2 กรัมให้ทั่วทั้งสองด้านก่อนลงกระทะ"
      ),
      ml(
        "Heat a heavy dry griddle over medium-high heat. Spread the 30 g softened butter over the cut faces of the four buns. Toast cut-side down for 1–2 minutes until evenly golden, then move them to a clean board.",
        "厚重平煎鍋不加油，以中大火預熱。把 30 公克軟化奶油抹在四個麵包的切面，切面朝下烤 1–2 分鐘至均勻金黃，再移到乾淨砧板。",
        "厚手のグリドルを油なしで中強火に熱します。柔らかくしたバター30gを4個のバンズの切り口に塗り、切り口を下にして1〜2分、均一にきつね色になるまで焼き、清潔な台に移します。",
        "두꺼운 철판을 기름 없이 중강불로 예열합니다. 부드러운 버터 30g을 번 네 개의 자른 면에 바르고 자른 면을 아래로 해 1–2분 고르게 노릇하게 굽습니다. 깨끗한 도마로 옮깁니다.",
        "ตั้งกระทะแผ่นหนาแห้งด้วยไฟกลางค่อนแรง ทาเนยนิ่ม 30 กรัมบนด้านตัดของขนมปังทั้งสี่ชิ้น วางด้านตัดลงย่าง 1–2 นาทีจนเหลืองทั่ว แล้วย้ายไปเขียงสะอาด"
      ),
      ml(
        "Keep the griddle hot. Set the patties down with space between them; cook in batches if they would touch. Press each only once to about 15 mm thick, then leave undisturbed for 2–3 minutes until a deep-brown crust forms. Lower the heat if the surface smokes heavily.",
        "保持鍋面熱度，肉排彼此留空隙；若會碰在一起就分批煎。每片只壓一次至約 15 毫米厚，靜置 2–3 分鐘至深褐色焦殼形成。若鍋面大量冒煙就轉小火。",
        "グリドルの熱を保ち、パティ同士が触れない間隔で置きます。触れるなら数回に分けます。各パティを一度だけ約15mm厚に押し、動かさず2〜3分、濃い焼き色のクラストができるまで焼きます。煙が強ければ火を弱めます。",
        "철판을 뜨겁게 유지하고 패티 사이를 띄웁니다. 서로 닿으면 나누어 굽습니다. 각 패티를 한 번만 약 15mm 두께로 누르고 움직이지 않은 채 2–3분 진한 갈색 껍질이 생길 때까지 굽습니다. 연기가 심하면 불을 낮춥니다.",
        "รักษาความร้อนกระทะ วางแพตตีโดยเว้นระยะ หากจะชนกันให้ทอดเป็นชุด กดแต่ละชิ้นเพียงครั้งเดียวให้หนาประมาณ 15 มม. แล้วอย่าขยับ 2–3 นาทีจนเกิดผิวสีน้ำตาลเข้ม ลดไฟหากมีควันมาก"
      ),
      ml(
        "Scrape fully under each patty and flip once. Top each with one 20 g cheese slice. Cook 2–3 minutes; insert an instant-read thermometer sideways into the centre of every patty. Ground beef must reach 71°C (160°F). Continue cooking any patty below that temperature in 30–60 second increments and recheck; colour alone is not a safety check.",
        "鍋鏟完整鏟入每片肉排下方後翻面，每片放一片 20 公克起司。再煎 2–3 分鐘；把即讀溫度計從側面插入每片肉排的中心。牛絞肉須達 71°C（160°F）；任何一片未達時，每次續煎 30–60 秒再測，不能只看顏色判斷安全。",
        "各パティの下にへらをしっかり差し入れて一度返し、各1枚20gのチーズを載せます。2〜3分焼き、すべてのパティの中心に温度計を横から差して測ります。ひき肉は71°C（160°F）が必要です。低いものは30〜60秒ずつ追加して再測定し、色だけで安全を判断しません。",
        "각 패티 아래를 주걱으로 완전히 긁어 한 번 뒤집고 패티마다 20g 치즈 한 장을 올립니다. 2–3분 더 굽고 순간 온도계를 옆에서 넣어 모든 패티의 중심을 잽니다. 소고기 다짐육은 71°C(160°F)에 도달해야 합니다. 낮은 패티는 30–60초씩 더 익혀 다시 재며 색만으로 안전을 판단하지 않습니다.",
        "สอดตะหลิวใต้แพตตีแต่ละชิ้นให้สุดแล้วพลิกครั้งเดียว วางชีสแผ่นละ 20 กรัมบนแต่ละชิ้น ทอดต่อ 2–3 นาที สอดเทอร์โมมิเตอร์จากด้านข้างเข้ากลางแพตตีทุกชิ้น เนื้อบดต้องถึง 71°C (160°F) ชิ้นใดต่ำกว่าให้ทอดเพิ่มครั้งละ 30–60 วินาทีแล้ววัดซ้ำ สีอย่างเดียวบอกความปลอดภัยไม่ได้"
      ),
      ml(
        "Spread the measured 40 g ketchup and 30 g mustard across the toasted bun interiors while the patties finish. Keep the clean toppings and sauces away from any plate or utensil that held raw beef.",
        "肉排煎熟時，把量好的 40 公克番茄醬與 30 公克黃芥末均勻抹在烤好的麵包內側。冷配料和醬料不得接觸盛過生牛肉的盤子或器具。",
        "パティを焼いている間に、計量したケチャップ40gとマスタード30gを焼いたバンズの内側に広げます。トッピングやソースは生の牛肉を置いた皿や器具に触れさせません。",
        "패티가 익는 동안 계량한 케첩 40g과 머스터드 30g을 구운 번 안쪽에 바릅니다. 토핑과 소스는 생소고기를 올렸던 접시나 도구에 닿지 않게 합니다.",
        "ระหว่างแพตตีกำลังสุก ทาซอสมะเขือเทศ 40 กรัมและมัสตาร์ด 30 กรัมที่ตวงไว้ด้านในขนมปัง อย่าให้ท็อปปิงหรือซอสสัมผัสจานและอุปกรณ์ที่เคยวางเนื้อดิบ"
      ),
      ml(
        "On a clean board, layer 15 g lettuce on each bottom bun, then the hot patty, 30 g tomato, 20 g onion, and 20 g pickles. Close with the top bun and serve immediately while the crust is hot and the cheese is soft.",
        "在乾淨砧板上，每個底麵包先放 15 公克生菜，再放熱肉排、30 公克番茄、20 公克洋蔥與 20 公克酸黃瓜。蓋上頂麵包，趁焦殼仍熱、起司柔軟時立刻上桌。",
        "清潔な台で、下のバンズにレタス15g、熱いパティ、トマト30g、玉ねぎ20g、ピクルス20gを重ねます。上のバンズをかぶせ、クラストが熱くチーズが柔らかいうちにすぐ供します。",
        "깨끗한 도마에서 아래 번마다 상추 15g, 뜨거운 패티, 토마토 30g, 양파 20g, 피클 20g 순으로 올립니다. 위 번을 덮고 겉면이 뜨겁고 치즈가 부드러울 때 바로 냅니다.",
        "บนเขียงสะอาด วางผักกาด 15 กรัมบนขนมปังล่างแต่ละชิ้น ตามด้วยแพตตีร้อน มะเขือเทศ 30 กรัม หอมใหญ่ 20 กรัม และแตงดอง 20 กรัม ปิดด้วยขนมปังบนและเสิร์ฟทันทีขณะผิวยังกรอบและชีสนุ่ม"
      )
    ],
    tips: [
      ml("Prepare every topping and measured sauce before the patties hit the griddle so assembly stays quick.", "肉排下鍋前先備妥所有配料及量好的醬料，才能迅速組裝。", "パティを焼く前にトッピングと計量したソースを用意し、手早く組み立てます。", "패티를 굽기 전에 토핑과 계량한 소스를 모두 준비해 조립을 빠르게 합니다.", "เตรียมท็อปปิงและซอสที่ตวงไว้ก่อนย่างแพตตีเพื่อประกอบได้รวดเร็ว"),
      ml("Let the beef form its crust without repeated pressing or moving.", "讓牛肉靜置形成焦殼，不要反覆按壓或移動。", "何度も押したり動かしたりせず、牛肉に焼き色を付けます。", "반복해 누르거나 옮기지 말고 소고기에 껍질이 생기게 둡니다.", "ปล่อยให้เนื้อสร้างผิวเกรียมโดยไม่กดหรือขยับซ้ำ")
    ],
    mistakes: [
      ml("Crowding cools the griddle and steams the beef; cook in batches and let the surface recover its heat.", "鍋面太擠會降溫並把牛肉蒸灰；分批煎並等鍋面回熱。", "詰め込みすぎると温度が下がり、肉が蒸れます。数回に分け、表面が熱を戻してから焼きます。", "팬을 너무 채우면 온도가 떨어져 고기가 쪄집니다. 나누어 굽고 팬이 다시 뜨거워질 때까지 기다립니다.", "ใส่เนื้อแน่นเกินไปทำให้อุณหภูมิกระทะลดและเนื้อกลายเป็นนึ่ง ให้ทอดเป็นชุดและรอให้กระทะร้อนกลับ"),
      ml("Pressing after the crust forms squeezes out juices; the initial shaping press is enough.", "焦殼形成後再按會擠出肉汁；塑形時壓一次即可。", "焼き色がついた後に押すと肉汁が出ます。成形時の一度だけで十分です。", "껍질이 생긴 뒤 누르면 육즙이 빠집니다. 모양을 잡을 때 한 번이면 충분합니다.", "การกดหลังเกิดผิวเกรียมจะบีบน้ำเนื้อออก กดครั้งเดียวตอนขึ้นรูปก็พอ")
    ],
    storage: ml(
      "Refrigerate cooked patties in a shallow covered container within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 3–4 days. Store lettuce, tomato, pickles, and buns separately. Reheat patties to 74°C/165°F throughout.",
      "熟肉排放入淺而有蓋容器，2 小時內冷藏（高於 32°C／90°F 時 1 小時內），冰箱維持 4°C／40°F 以下，3–4 天內食用。生菜、番茄、酸黃瓜與麵包分開保存。肉排復熱至中心各處 74°C／165°F。",
      "焼いたパティは浅いふた付き容器に入れ、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3〜4日以内に使います。レタス、トマト、ピクルス、バンズは別に保存し、パティは中心まで74°C/165°Fに再加熱します。",
      "익힌 패티는 얕고 뚜껑 있는 용기에 담아 2시간 이내(32°C/90°F 초과 시 1시간 이내) 4°C/40°F 이하로 냉장하고 3–4일 안에 먹습니다. 상추, 토마토, 피클, 번은 따로 보관합니다. 패티는 중심까지 74°C/165°F로 다시 데웁니다.",
      "แช่แพตตีสุกในภาชนะตื้นมีฝาปิดภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า และกินภายใน 3–4 วัน เก็บผักกาด มะเขือเทศ แตงดอง และขนมปังแยกกัน อุ่นแพตตีให้ถึง 74°C/165°F ทั่วถึง"
    ),
    safetySources: [["safe minimum internal temperatures", temperatures], ["refrigeration and handling", handling]]
  });
}

function reviseChickenTeriyaki(recipe) {
  reviseRecipe(recipe, {
    cookMinutes: 25,
    titles: [
      ml("Mix and chill the teriyaki sauce", "調勻並冷藏照燒醬", "たれを混ぜて冷やす", "데리야키 소스 섞어 냉장하기", "ผสมและแช่เย็นซอสเทอริยากิ"),
      ml("Dry, portion, and briefly marinate the chicken", "擦乾雞肉並短暫醃漬", "鶏肉の水気を取り短く漬ける", "닭 물기를 닦고 짧게 재우기", "ซับไก่ให้แห้งและหมักสั้น ๆ"),
      ml("Sear the skin and onion", "煎香雞皮與長蔥", "皮目と長ねぎを焼く", "껍질과 대파 굽기", "จี่ด้านหนังและต้นหอมญี่ปุ่น"),
      ml("Cook the chicken through", "將雞肉煎至全熟", "鶏肉に火を通す", "닭고기 속까지 익히기", "ปรุงไก่ให้สุกทั่ว"),
      ml("Reduce a clean portion of sauce", "收濃未接觸生雞的醬汁", "鶏肉に触れていないたれを煮詰める", "생닭에 닿지 않은 소스 졸이기", "เคี่ยวซอสส่วนที่ไม่สัมผัสไก่ดิบ"),
      ml("Glaze and recheck", "裹醬並再次確認熟度", "たれを絡めて再確認する", "소스를 입히고 다시 확인하기", "เคลือบซอสและตรวจอีกครั้ง"),
      ml("Rest, slice, and serve", "靜置、切片並上桌", "休ませて切り、盛り付ける", "쉬었다가 썰어 담기", "พัก หั่น และเสิร์ฟ")
    ],
    bodies: [
      ml(
        "Stir together all 45 ml soy sauce, 45 ml mirin, 30 ml sake, and 18 g sugar until most of the sugar dissolves. Measure 30 ml into a small covered dish for the raw-chicken marinade; cover the remaining 90 ml separately and refrigerate it for the glaze.",
        "將 45 毫升淡醬油、45 毫升味醂、30 毫升清酒與 18 公克糖攪拌至大部分溶解。另量出 30 毫升放入小型有蓋容器醃生雞；其餘 90 毫升另行加蓋冷藏，留作裹醬。",
        "しょうゆ45ml、みりん45ml、酒30ml、砂糖18gを砂糖がほぼ溶けるまで混ぜます。30mlを生鶏肉用の小さなふた付き容器に取り分け、残り90mlは別にふたをして冷蔵し、仕上げのたれに使います。",
        "간장 45ml, 미림 45ml, 사케 30ml, 설탕 18g을 설탕이 대부분 녹을 때까지 섞습니다. 생닭 양념용으로 30ml를 작은 뚜껑 있는 용기에 덜고, 남은 90ml는 따로 덮어 냉장해 마무리 소스로 씁니다.",
        "คนซีอิ๊ว 45 มล. มิริน 45 มล. สาเก 30 มล. และน้ำตาล 18 กรัมจนเกือบละลาย ตวง 30 มล. ใส่ภาชนะเล็กมีฝาสำหรับหมักไก่ดิบ ปิดฝาซอสที่เหลือ 90 มล. แยกไว้ในตู้เย็นเพื่อใช้เคลือบ"
      ),
      ml(
        "Pat the 500 g chicken thighs dry, trim loose fat, and pierce the skin a few times with a fork. Put them skin-side up in a covered dish, add only the 30 ml marinade, and refrigerate for 10 minutes. Keep the chicken below 4°C while it marinates; do not reuse this chicken-contact portion as the finishing sauce.",
        "將 500 公克雞腿排擦乾並修去鬆散脂肪，用叉子在雞皮戳幾下。皮面朝上放入有蓋容器，只加入分出的 30 毫升醃汁，冷藏 10 分鐘。醃漬時雞肉保持低於 4°C；接觸生雞的這份醃汁不可再作為裹醬。",
        "鶏もも肉500gの水気を拭き、余分な脂を取り、皮にフォークで数か所穴をあけます。皮を上にしてふた付き容器に入れ、取り分けた30mlだけを加えて10分冷蔵します。漬けている間は鶏肉を4°C未満に保ち、生鶏肉に触れたたれを仕上げ用に再利用しません。",
        "닭다리살 500g의 물기를 닦고 늘어진 지방을 정리한 뒤 껍질을 포크로 몇 군데 찌릅니다. 껍질을 위로 해 뚜껑 있는 용기에 넣고 따로 덜어 둔 양념 30ml만 부어 10분 냉장합니다. 재우는 동안 닭은 4°C 미만으로 보관하고 생닭에 닿은 양념은 마무리 소스로 다시 쓰지 않습니다.",
        "ซับสะโพกไก่ 500 กรัมให้แห้ง ตัดไขมันส่วนเกินและใช้ส้อมจิ้มหนังสองสามครั้ง วางหนังขึ้นในภาชนะมีฝา เติมเฉพาะน้ำหมัก 30 มล. ที่แบ่งไว้ แล้วแช่เย็น 10 นาที ระหว่างหมักให้ไก่ต่ำกว่า 4°C ห้ามนำน้ำหมักส่วนที่สัมผัสไก่ดิบไปใช้เป็นซอสตอนจบ"
      ),
      ml(
        "Heat a heavy skillet over medium heat, add the 10 ml oil, and lift the chicken from its marinade, letting excess drip back into the dish. Discard that marinade after handling the raw chicken. Lay the thighs skin-side down with room between them; sear 6–7 minutes until the skin is deep golden. Set the 120 g long-onion pieces in the open space and turn them as they brown lightly.",
        "厚底平底鍋以中火預熱後加入 10 毫升油。把雞肉從醃汁中取出，讓多餘醃汁滴回容器；處理完生雞後將該醃汁丟棄。雞皮朝下放入，彼此留空隙，煎 6–7 分鐘至深金黃。利用空位放入 120 公克長蔥段，略上色時翻面。",
        "厚手のフライパンを中火で熱して油10mlを加えます。鶏肉を漬けだれから取り出し、余分を容器に落とします。生鶏肉を扱った後、そのたれは捨てます。鶏肉を皮目を下にして間隔を空けて置き、6〜7分、濃いきつね色まで焼きます。空いた場所に長ねぎ120gを置き、軽く色づいたら返します。",
        "두꺼운 팬을 중불로 달군 뒤 기름 10ml를 넣습니다. 닭을 양념에서 꺼내 여분은 용기에 떨어뜨립니다. 생닭을 다룬 뒤 그 양념은 버립니다. 닭을 껍질 아래로 간격을 두고 놓아 6–7분 진한 황금색이 되게 굽습니다. 빈 공간에 대파 120g을 놓고 살짝 갈색이 나면 뒤집습니다.",
        "ตั้งกระทะหนาด้วยไฟกลาง ใส่น้ำมัน 10 มล. ยกไก่ออกจากน้ำหมัก ปล่อยส่วนเกินหยดกลับภาชนะ แล้วทิ้งน้ำหมักหลังจัดการไก่ดิบ วางไก่ด้านหนังลงโดยเว้นระยะ จี่ 6–7 นาทีจนหนังเหลืองเข้ม วางต้นหอมญี่ปุ่น 120 กรัมในพื้นที่ว่างและกลับเมื่อเริ่มมีสี"
      ),
      ml(
        "Turn the chicken and cook the second side for 3–4 minutes. If a thigh is thick, lower the heat and cover the pan briefly so the centre cooks without burning the skin. Check the thickest part of each thigh with a clean instant-read thermometer; poultry must reach 74°C. Continue in 1-minute increments and recheck any piece below that temperature. Remove the tender browned onion to a clean plate.",
        "將雞肉翻面，另一面再煎 3–4 分鐘。若雞腿較厚，轉小火短暫加蓋，讓中心熟透而不燒焦雞皮。用乾淨即讀溫度計測量每片雞腿最厚處；禽肉須達 74°C。未達者每次續煎 1 分鐘再測。將柔軟上色的長蔥移至乾淨盤中。",
        "鶏肉を返して反対側を3〜4分焼きます。厚い場合は火を弱め、皮を焦がさず中心まで火を通すため短時間ふたをします。清潔な即読温度計で各もも肉の最も厚い部分を測ります。鶏肉は74°Cが必要です。低いものは1分ずつ追加して再測定します。柔らかく色づいた長ねぎを清潔な皿に取ります。",
        "닭을 뒤집어 반대쪽을 3–4분 익힙니다. 두꺼운 조각은 불을 낮추고 잠깐 덮어 껍질을 태우지 않고 속까지 익힙니다. 깨끗한 순간 온도계로 각 닭다리의 가장 두꺼운 부분을 잽니다. 가금류는 74°C에 도달해야 합니다. 낮은 조각은 1분씩 더 익혀 다시 잽니다. 부드럽고 노릇한 대파를 깨끗한 접시에 옮깁니다.",
        "กลับไก่และปรุงอีกด้าน 3–4 นาที หากชิ้นหนาให้ลดไฟและปิดฝากระทะชั่วครู่เพื่อให้ตรงกลางสุกโดยหนังไม่ไหม้ ใช้เทอร์โมมิเตอร์อ่านเร็วสะอาดวัดส่วนที่หนาที่สุดของไก่แต่ละชิ้น สัตว์ปีกต้องถึง 74°C หากชิ้นใดต่ำกว่าให้ปรุงเพิ่มครั้งละ 1 นาทีแล้ววัดซ้ำ ย้ายต้นหอมที่นุ่มและมีสีลงจานสะอาด"
      ),
      ml(
        "Move the cooked chicken to a clean plate. Pour the separately refrigerated 90 ml sauce into the skillet, not the discarded chicken marinade. Simmer gently for 2–3 minutes, scraping up browned bits, until the sauce looks glossy and lightly syrupy; lower the heat if the sugar begins to darken quickly.",
        "將熟雞肉移至乾淨盤中。把另外冷藏的 90 毫升醬汁倒入鍋中，不可使用已丟棄的生雞醃汁。小火煮 2–3 分鐘並刮起鍋底焦香，至醬汁發亮且略濃如糖漿；糖色變深太快時轉小火。",
        "火の通った鶏肉を清潔な皿に移します。捨てた鶏肉用の漬けだれではなく、別に冷蔵しておいた90mlをフライパンに注ぎます。弱く2〜3分煮て、焼き付いた旨味をこそげ、つやが出て軽くシロップ状になるまで煮詰めます。砂糖の色がすぐ濃くなる場合は火を弱めます。",
        "익힌 닭을 깨끗한 접시에 옮깁니다. 버린 닭 양념이 아니라 따로 냉장한 소스 90ml를 팬에 붓습니다. 약하게 2–3분 끓이며 갈색으로 눌어붙은 맛을 긁어내고 윤기 나며 살짝 시럽처럼 될 때까지 졸입니다. 설탕색이 빨리 짙어지면 불을 낮춥니다.",
        "ย้ายไก่สุกลงจานสะอาด เทซอส 90 มล. ที่แช่เย็นแยกไว้ลงกระทะ ห้ามใช้น้ำหมักไก่ที่ทิ้งแล้ว เคี่ยวเบา ๆ 2–3 นาที ขูดรสที่ติดก้นกระทะจนซอสเงาและข้นคล้ายน้ำเชื่อมเล็กน้อย ลดไฟหากสีน้ำตาลเข้มขึ้นเร็ว"
      ),
      ml(
        "Return the chicken skin-side up and spoon the reduced sauce over it for 1–2 minutes. Recheck the centre of each thigh; it must still be at least 74°C. The glaze should cling in a thin shiny layer rather than pool. Turn off the heat if the sauce starts to scorch.",
        "將雞肉皮面朝上放回鍋中，淋醬 1–2 分鐘。再次測量每片雞腿中心，仍須至少 74°C。醬汁應薄薄發亮地附著，不應積成一灘；若醬汁開始焦化就關火。",
        "鶏肉を皮目を上にして戻し、1〜2分たれをかけます。各もも肉の中心を再測定し、74°C以上であることを確認します。たれは薄くつややかに絡み、溜まらない状態が目安です。焦げ始めたら火を止めます。",
        "닭을 껍질이 위로 오게 다시 넣고 1–2분 소스를 끼얹습니다. 각 닭다리 중심을 다시 재어 74°C 이상인지 확인합니다. 소스는 얇게 윤기 나게 붙고 고이지 않아야 합니다. 타기 시작하면 불을 끕니다.",
        "ใส่ไก่กลับโดยให้หนังขึ้น ราดซอส 1–2 นาที วัดตรงกลางไก่แต่ละชิ้นซ้ำ ต้องยังถึงอย่างน้อย 74°C ซอสควรเคลือบบาง ๆ เป็นเงา ไม่ขังเป็นแอ่ง ปิดไฟหากซอสเริ่มไหม้"
      ),
      ml(
        "Rest the chicken for 3 minutes, then slice it into 1.5 cm pieces. Divide the 300 g hot cooked rice between two bowls and serve with the chicken, grilled long onion, and remaining glaze. Use a clean knife and board after handling raw chicken.",
        "雞肉靜置 3 分鐘後切成 1.5 公分片。將 300 公克熱熟飯分入兩碗，搭配雞肉、煎長蔥與鍋中剩餘醬汁上桌。接觸生雞後須換用乾淨刀具與砧板。",
        "鶏肉を3分休ませてから1.5cm幅に切ります。温かいご飯300gを2杯に分け、鶏肉、焼いた長ねぎ、残ったたれを添えます。生鶏肉に使った包丁とまな板は洗い、清潔なものを使います。",
        "닭을 3분 쉬게 한 뒤 1.5cm 폭으로 썹니다. 따뜻한 밥 300g을 두 그릇에 나누고 닭, 구운 대파, 남은 소스를 곁들입니다. 생닭에 사용한 칼과 도마는 세척한 깨끗한 것으로 바꿉니다.",
        "พักไก่ 3 นาทีแล้วหั่นหนา 1.5 ซม. แบ่งข้าวสุก 300 กรัมที่ยังร้อนลงสองชาม เสิร์ฟกับไก่ ต้นหอมย่าง และซอสที่เหลือ ใช้มีดและเขียงสะอาดหลังจัดการไก่ดิบ"
      )
    ],
    tips: [
      ml("Keep the chicken skin dry and leave space around each thigh; both help the skin brown instead of steam.", "雞皮保持乾燥並讓雞腿彼此留空隙，才會煎上色而非蒸軟。", "皮を乾かし、もも肉同士に間隔を空けると蒸れずに焼き色がつきます。", "닭 껍질을 말리고 조각 사이를 띄워야 찌지 않고 갈색이 납니다.", "ซับหนังให้แห้งและเว้นระหว่างชิ้นเพื่อให้เกรียมแทนการนึ่ง"),
      ml("The sauce portion reserved before touching raw chicken is the only portion used for glazing.", "只有接觸生雞前分開留存的醬汁可用來裹醬。", "生鶏肉に触れる前に取り分けたたれだけを仕上げに使います。", "생닭에 닿기 전에 따로 덜어 둔 소스만 마무리에 사용합니다.", "ใช้เคลือบเฉพาะซอสที่แบ่งไว้ก่อนสัมผัสไก่ดิบ")
    ],
    mistakes: [
      ml("Starting with wet skin or crowded thighs traps steam; pat dry and sear in batches if the pan is too small.", "雞皮未擦乾或鍋中太擠會積蒸氣；擦乾，鍋子太小就分批煎。", "皮が濡れていたり詰め込みすぎたりすると蒸れます。水気を拭き、狭ければ分けて焼きます。", "껍질이 젖었거나 팬이 붐비면 수증기가 찹니다. 물기를 닦고 팬이 작으면 나눠 굽습니다.", "หนังเปียกหรือวางแน่นเกินไปทำให้เกิดไอน้ำ ซับให้แห้งและแบ่งทอดหากกระทะเล็ก"),
      ml("Pouring raw-chicken marinade into the glaze can contaminate the finished dish; discard it and use the clean reserved sauce.", "把接觸生雞的醃汁倒進裹醬會污染成品；應丟棄並使用另存的乾淨醬汁。", "生鶏肉に触れた漬けだれを仕上げに使うと汚染の恐れがあります。捨てて、別に取った清潔なたれを使います。", "생닭에 닿은 양념을 마무리 소스에 넣으면 오염될 수 있습니다. 버리고 따로 보관한 깨끗한 소스를 쓰세요.", "การใส่น้ำหมักที่สัมผัสไก่ดิบลงในซอสสำเร็จอาจปนเปื้อน ให้ทิ้งและใช้ซอสสะอาดที่แยกไว้")
    ],
    storage: ml(
      "Refrigerate the chicken and rice separately in shallow covered containers within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 3 days. Reheat the chicken and rice to 74°C/165°F throughout. Keep unused raw-chicken marinade discarded; refrigerate only the clean sauce portion.",
      "雞肉與米飯分別放入淺而有蓋容器，2 小時內（高於 32°C／90°F 時 1 小時內）冷藏於 4°C／40°F 以下，3 天內食用。雞肉與米飯復熱至各處 74°C／165°F。接觸生雞的醃汁須丟棄；只冷藏乾淨的醬汁部分。",
      "鶏肉とご飯は浅いふた付き容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3日以内に使います。鶏肉とご飯は全体を74°C/165°Fまで再加熱します。生鶏肉に触れた漬けだれは捨て、清潔なたれだけを冷蔵します。",
      "닭과 밥은 얕고 뚜껑 있는 용기에 따로 담아 2시간 이내(32°C/90°F 초과 시 1시간 이내) 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 닭과 밥 모두 전체가 74°C/165°F가 되게 다시 데웁니다. 생닭에 닿은 양념은 버리고 깨끗한 소스만 냉장합니다.",
      "แช่ไก่และข้าวแยกกันในภาชนะตื้นมีฝาปิดภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า และกินภายใน 3 วัน อุ่นไก่และข้าวให้ทั่วถึง 74°C/165°F ทิ้งน้ำหมักที่สัมผัสไก่ดิบ แช่เย็นเฉพาะซอสส่วนที่สะอาด"
    ),
    safetySources: [["safe minimum internal temperatures", temperatures], ["refrigeration and handling", handling]]
  });
}

function reviseCoffinBread(recipe) {
  reviseRecipe(recipe, {
    cookMinutes: 45,
    titles: [
      ml("Brown the chicken and vegetables", "煎香雞肉與蔬菜", "鶏肉と野菜に焼き色を付ける", "닭고기와 채소 갈색 내기", "จี่ไก่และผักให้มีสี"),
      ml("Make a smooth roux sauce", "煮滑順麵糊醬", "なめらかなルーソースを作る", "부드러운 루 소스 만들기", "ทำซอสรูซ์ให้เนียน"),
      ml("Simmer the filling to a safe finish", "燉煮內餡至安全熟度", "具材を安全な状態まで煮る", "속 재료를 안전하게 익히기", "เคี่ยวไส้ให้สุกปลอดภัย"),
      ml("Fry the bread blocks", "炸酥吐司厚塊", "パンを揚げる", "식빵 튀기기", "ทอดก้อนขนมปัง"),
      ml("Cut a lid and hollow each box", "切蓋並挖空吐司盒", "ふたを切って中をくり抜く", "뚜껑을 자르고 속 파기", "ตัดฝาและคว้านกล่องขนมปัง"),
      ml("Fill, cap, and serve promptly", "填餡蓋回並儘快上桌", "詰めてふたをし、すぐ供する", "속을 채우고 덮어 바로 내기", "เติมไส้ ปิดฝา และเสิร์ฟทันที")
    ],
    bodies: [
      ml(
        "Melt 15 g of the butter in a wide saucepan over medium-high heat. Add the 300 g chicken pieces in one layer and brown for about 4 minutes, turning once. Add the 120 g carrot and 150 g mushrooms; cook for 4 minutes, stirring, then add the 120 g peas for 1 minute. The chicken need not be fully cooked yet. Transfer the chicken and vegetables to a clean plate so the roux can be stirred without crowding.",
        "寬鍋以中大火融化 15 公克奶油。將 300 公克雞肉單層放入，煎約 4 分鐘並翻面一次。加入 120 公克胡蘿蔔與 150 公克蘑菇，拌炒 4 分鐘，再加 120 公克豌豆炒 1 分鐘。此時雞肉尚不必全熟。將雞肉與蔬菜移到乾淨盤中，避免鍋中太擠而無法攪拌麵糊。",
        "広い鍋でバター15gを中強火で溶かします。鶏肉300gを一層に入れ、約4分、途中で一度返して焼き色を付けます。にんじん120gときのこ150gを加えて混ぜながら4分炒め、グリーンピース120gを加えて1分炒めます。この時点で鶏肉は完全に火が通っていなくて構いません。ルーを混ぜやすいよう、鶏肉と野菜を清潔な皿に移します。",
        "넓은 냄비에 버터 15g을 중강불로 녹입니다. 닭고기 300g을 한 겹으로 넣고 약 4분 갈색이 나게 굽되 한 번 뒤집습니다. 당근 120g과 버섯 150g을 넣어 저으며 4분 익힌 다음 완두콩 120g을 넣어 1분 더 볶습니다. 이때 닭은 완전히 익지 않아도 됩니다. 루를 여유 있게 저을 수 있도록 닭과 채소를 깨끗한 접시에 옮깁니다.",
        "ละลายเนย 15 กรัมในหม้อกว้างด้วยไฟกลางค่อนแรง ใส่ไก่ 300 กรัมเรียงชั้นเดียว จี่ประมาณ 4 นาที พลิกหนึ่งครั้ง เติมแครอต 120 กรัมกับเห็ด 150 กรัม ผัด 4 นาที แล้วใส่ถั่วลันเตา 120 กรัมอีก 1 นาที ตอนนี้ไก่ยังไม่จำเป็นต้องสุกทั่ว ย้ายไก่และผักใส่จานสะอาดเพื่อให้คนรูซ์ได้สะดวก"
      ),
      ml(
        "Lower the heat to medium and melt the remaining 30 g butter in the same pan. Whisk in the 45 g flour and cook, scraping the base, for 2 minutes until the paste smells lightly toasted but stays pale. Whisk in the 500 ml hot stock in four small additions, smoothing out each addition before adding the next. Pour in the 200 ml hot milk and simmer gently for 5–7 minutes, stirring often, until the sauce is smooth and thick enough to coat a spoon.",
        "轉中火，在原鍋融化剩下的 30 公克奶油。拌入 45 公克麵粉，刮著鍋底攪炒 2 分鐘，直到有淡淡烘烤香但仍呈淺色。將 500 毫升熱高湯分四次加入，每次先攪勻至順滑再加下一次。倒入 200 毫升熱牛奶，小火煮 5–7 分鐘並常攪拌，至醬汁滑順且能附著匙面。",
        "火を中火に下げ、同じ鍋で残りのバター30gを溶かします。小麦粉45gを加え、鍋底をこそげながら2分炒めます。軽く香ばしい香りがし、色は淡いままが目安です。熱いスープ500mlを4回に分けて加え、毎回なめらかにしてから次を加えます。熱い牛乳200mlを注ぎ、弱く5〜7分、ときどき混ぜながら、スプーンに絡むなめらかな濃さにします。",
        "불을 중불로 낮추고 같은 팬에 남은 버터 30g을 녹입니다. 밀가루 45g을 넣고 바닥을 긁어가며 2분 볶아 은은한 고소한 향이 나되 색은 연하게 유지합니다. 뜨거운 육수 500ml를 네 번 나누어 넣고 매번 매끈하게 푼 뒤 다음 분량을 넣습니다. 뜨거운 우유 200ml를 붓고 약불에서 5–7분 자주 저어 숟가락을 코팅할 만큼 부드럽고 걸쭉하게 끓입니다.",
        "ลดไฟเป็นกลาง ละลายเนยที่เหลือ 30 กรัมในหม้อเดิม ใส่แป้ง 45 กรัม คนและขูดก้นหม้อ 2 นาทีจนหอมคั่วอ่อน ๆ แต่ยังสีอ่อน ค่อย ๆ คนสต๊อกร้อน 500 มล. แบ่งใส่สี่ครั้ง คนให้เนียนก่อนเติมครั้งถัดไป เทนมร้อน 200 มล. เคี่ยวเบา ๆ 5–7 นาที คนบ่อยจนซอสเนียนและเคลือบช้อนได้"
      ),
      ml(
        "Return the browned chicken and vegetables, including any plate juices, to the sauce. Add the 6 g salt and 2 g white pepper. Simmer gently for 4–6 minutes, stirring from the bottom, then check the centre of several of the largest chicken pieces with a thermometer; every piece must reach 74°C. Continue in 1-minute increments if needed. The filling should mound softly; if it turns pasty, stir in hot stock 15 ml at a time.",
        "將煎過的雞肉與蔬菜連同盤中肉汁倒回醬汁，加入 6 公克鹽與 2 公克白胡椒。小火煮 4–6 分鐘並從鍋底攪拌，再用溫度計測量幾塊最大雞肉的中心，每一塊都須達 74°C；需要時每次續煮 1 分鐘再測。內餡應可柔軟堆起；若變成糊狀，每次拌入 15 毫升熱高湯調整。",
        "焼いた鶏肉と野菜を皿の肉汁ごとソースに戻します。塩6gと白こしょう2gを加えます。弱く4〜6分、鍋底から混ぜながら煮ます。大きめの鶏肉を数個、中心まで温度計で測り、すべて74°Cに達していることを確認します。必要なら1分ずつ追加して再測定します。具は柔らかく山になる濃さが目安です。ペースト状なら熱いスープを15mlずつ混ぜます。",
        "갈색 낸 닭과 채소를 접시에 나온 육즙까지 소스에 다시 넣습니다. 소금 6g과 흰 후추 2g을 넣습니다. 약불에서 4–6분 바닥부터 저으며 끓인 뒤 큰 닭 조각 여러 개의 중심을 온도계로 재어 모두 74°C인지 확인합니다. 필요하면 1분씩 더 끓여 다시 잽니다. 속은 부드럽게 봉긋한 농도여야 합니다. 풀처럼 되면 뜨거운 육수를 15ml씩 저어 넣습니다.",
        "ใส่ไก่และผักที่จี่ไว้กลับลงซอสพร้อมน้ำจากจาน เติมเกลือ 6 กรัมและพริกไทยขาว 2 กรัม เคี่ยวเบา ๆ 4–6 นาที คนจากก้นหม้อ แล้วใช้เทอร์โมมิเตอร์วัดกลางชิ้นไก่ใหญ่หลายชิ้น ทุกชิ้นต้องถึง 74°C หากจำเป็นให้เคี่ยวเพิ่มครั้งละ 1 นาทีแล้ววัดซ้ำ ไส้ควรข้นนุ่มเป็นกองได้ หากข้นเป็นแป้งให้คนสต๊อกร้อนครั้งละ 15 มล."
      ),
      ml(
        "Heat the 600 ml frying oil in a deep, heavy pan to 175°C, checking with a thermometer. Fry one 10 × 10 × 6 cm bread block at a time; turn it carefully so both broad faces fry for 45–60 seconds each and each of the four edges for about 20 seconds. Keep the oil near 175°C between batches and do not crowd the pan. Lift each block onto a rack to drain; the exterior should be evenly deep gold, not dark brown.",
        "將 600 毫升炸油放入厚重深鍋，加熱至 175°C 並用溫度計確認。吐司厚塊一次炸一個；小心翻動，兩個大面各炸 45–60 秒，四個側邊各約 20 秒。批次間讓油溫回到 175°C，不要塞滿鍋子。每塊炸好後移到網架瀝油；外表應均勻深金黃，不可炸成深褐色。",
        "600mlの揚げ油を厚手の深鍋で175°Cに熱し、温度計で確認します。10×10×6cmのパンを一つずつ揚げます。慎重に返し、広い両面を各45〜60秒、四辺を各約20秒揚げます。次の分を入れる前に油を175°C付近に戻し、鍋に詰め込みません。揚げたパンは網に上げて油を切ります。全体が濃い金色になればよく、濃茶色にしません。",
        "두꺼운 냄비에 튀김유 600ml를 넣고 온도계로 확인하며 175°C까지 데웁니다. 10×10×6cm 식빵 블록은 한 번에 하나씩 튀깁니다. 조심히 돌려 넓은 양면을 각각 45–60초, 네 가장자리를 각각 약 20초씩 튀깁니다. 다음 블록을 넣기 전 기름을 175°C 근처로 되돌리고 냄비를 붐비게 하지 않습니다. 튀긴 블록은 망에 올려 기름을 뺍니다. 겉은 고르게 진한 황금색이어야 하며 짙은 갈색으로 만들지 않습니다.",
        "ตั้งน้ำมันทอด 600 มล. ในหม้อลึกหนาให้ถึง 175°C และตรวจด้วยเทอร์โมมิเตอร์ ทอดขนมปังขนาด 10×10×6 ซม. ครั้งละก้อน ค่อย ๆ พลิกให้ด้านกว้างทั้งสองด้านทอดด้านละ 45–60 วินาที และขอบทั้งสี่ด้านด้านละประมาณ 20 วินาที รอให้น้ำมันกลับใกล้ 175°C ก่อนทอดก้อนถัดไป อย่าใส่แน่น ยกขึ้นพักบนตะแกรงให้สะเด็ดน้ำมัน เปลือกควรเป็นสีทองเข้มสม่ำเสมอ ไม่ใช่น้ำตาลไหม้"
      ),
      ml(
        "Let each bread block drain for 2 minutes. With a serrated knife, cut a square about 1 cm in from the top, through only three sides to make a hinged lid. Lift it and remove the soft crumb, leaving walls and a base about 1.5 cm thick; stop before piercing the box. Work over a tray and keep the lid beside its matching box.",
        "每塊吐司瀝油靜置 2 分鐘。用鋸齒刀在頂面內縮約 1 公分切方形，只切三邊做成鉸鏈蓋。掀起後挖掉柔軟麵包心，四壁與底部保留約 1.5 公分厚；切到快穿透時就停。於托盤上操作，並將蓋子放在對應吐司盒旁。",
        "パンを2分網に置いて油を切ります。波刃包丁で上面から約1cm内側に四角く切り、三辺だけ切ってヒンジ付きのふたにします。ふたを持ち上げ、柔らかい中身を取り除き、壁と底を約1.5cm残します。箱を突き破る前に止めます。トレーの上で作業し、ふたは対応する箱のそばに置きます。",
        "식빵 블록을 망에서 2분 식혀 기름을 뺍니다. 톱니 칼로 윗면에서 약 1cm 안쪽 정사각형을 세 면만 잘라 경첩 뚜껑을 만듭니다. 뚜껑을 들어 부드러운 속을 파내되 벽과 바닥을 약 1.5cm 남기고 상자를 뚫기 전에 멈춥니다. 쟁반 위에서 작업하고 뚜껑은 짝이 맞는 상자 옆에 둡니다.",
        "พักขนมปังแต่ละก้อนบนตะแกรง 2 นาที ใช้มีดฟันเลื่อยตัดสี่เหลี่ยมบนด้านบนโดยเว้นขอบเข้าไปประมาณ 1 ซม. ตัดเพียงสามด้านให้เป็นฝาพับ ยกฝาแล้วคว้านเนื้อนุ่มออก เหลือผนังและฐานหนาประมาณ 1.5 ซม. หยุดก่อนทะลุกล่อง ทำบนถาดและวางฝาไว้ข้างกล่องคู่กัน"
      ),
      ml(
        "Spoon the hot filling into each crisp bread box until it comes just below the rim; divide it evenly rather than forcing in extra. Cap with the matching toast lid and serve within 5 minutes for the best crunch. Use a clean spoon for each box and keep the unused filling covered over very low heat while assembling.",
        "將熱內餡舀入酥脆吐司盒，裝至略低於盒緣即可；平均分配，不要硬塞過量。蓋回對應吐司蓋，5 分鐘內上桌以保持酥脆。每個盒子使用乾淨湯匙，組裝期間未用的內餡加蓋以極小火保溫。",
        "熱い具をパン箱の縁より少し下まで詰めます。無理に押し込まず均等に分けます。対応するふたを戻し、食感を保つため5分以内に供します。箱ごとに清潔なスプーンを使い、盛り付け中の残りの具はふたをしてごく弱火で保温します。",
        "뜨거운 속을 식빵 상자 가장자리보다 약간 아래까지 담습니다. 억지로 더 넣지 말고 고르게 나눕니다. 짝이 맞는 뚜껑을 덮고 바삭함을 위해 5분 안에 냅니다. 상자마다 깨끗한 숟가락을 사용하고 조립 중 남은 속은 덮어 아주 약한 불로 따뜻하게 둡니다.",
        "ตักไส้ร้อนใส่กล่องขนมปังให้ต่ำกว่าขอบเล็กน้อย แบ่งให้เท่ากันโดยไม่อัดแน่น ปิดด้วยฝาที่คู่กันและเสิร์ฟภายใน 5 นาทีเพื่อให้กรอบ ใช้ช้อนสะอาดกับแต่ละกล่อง ระหว่างจัดเสิร์ฟให้ปิดฝาไส้ที่เหลือและอุ่นด้วยไฟต่ำมาก"
      )
    ],
    tips: [
      ml("Transfer the browned chicken and vegetables out before making the roux; this gives the flour room to cook evenly and avoids a lumpy sauce.", "先將煎好的雞肉蔬菜移出再煮麵糊，麵粉才有空間均勻炒熟、醬汁不易結塊。", "ルーを作る前に鶏肉と野菜を取り出すと、粉を均一に炒められ、だまになりにくくなります。", "루를 만들기 전에 닭과 채소를 덜어내면 밀가루가 고르게 익고 소스가 뭉치지 않습니다.", "ย้ายไก่และผักออกก่อนทำรูซ์ แป้งจะสุกทั่วและซอสไม่จับก้อน"),
      ml("A rack lets oil drain from all sides of each bread block, keeping the base crisp while you hollow it.", "網架能讓吐司盒四面瀝油，挖空時底部仍保持酥脆。", "網に置くと全体の油が切れ、くり抜く間も底がサクサクに保てます。", "망에 올리면 사방으로 기름이 빠져 속을 파는 동안 바닥이 바삭합니다.", "พักบนตะแกรงให้น้ำมันไหลออกทุกด้าน ฐานจะกรอบระหว่างคว้าน")
    ],
    mistakes: [
      ml("Adding all the hot stock at once can make flour lumps; whisk in four additions and smooth each before continuing.", "熱高湯一次全倒會讓麵粉結塊；分四次加入，每次攪滑後再加。", "熱いスープを一度に入れると粉がだまになります。4回に分け、毎回なめらかにします。", "뜨거운 육수를 한 번에 넣으면 밀가루가 뭉칩니다. 네 번 나누어 매번 매끈하게 푸세요.", "การเทสต๊อกร้อนรวดเดียวทำให้แป้งจับก้อน แบ่งใส่สี่ครั้งและคนให้เนียนทุกครั้ง"),
      ml("Cutting through the base lets creamy filling leak out; leave the full 1.5 cm base and stop hollowing before the crust feels thin.", "切穿底部會讓奶油內餡漏出；保留完整 1.5 公分底層，外殼變薄前就停止挖空。", "底まで切るとクリームが漏れます。底を1.5cm残し、殻が薄く感じる前にくり抜くのを止めます。", "바닥을 뚫으면 크림 속이 샙니다. 바닥 1.5cm를 남기고 껍질이 얇아지기 전에 파기를 멈춥니다.", "ตัดทะลุฐานทำให้ไส้ครีมรั่ว เหลือฐานเต็ม 1.5 ซม. และหยุดก่อนเปลือกบาง")
    ],
    storage: ml(
      "Refrigerate leftover chicken filling in a shallow covered container within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 3 days. Reheat the filling throughout to 74°C/165°F. Keep bread boxes and lids at room temperature in a dry container and fry fresh for serving; assembled boxes soften quickly.",
      "剩餘雞肉內餡放入淺而有蓋容器，2 小時內（高於 32°C／90°F 時 1 小時內）冷藏於 4°C／40°F 以下，3 天內食用。內餡復熱至各處 74°C／165°F。吐司盒與蓋子放在乾燥容器中室溫保存，上桌時再現炸；組裝後很快會變軟。",
      "残った鶏肉の具は浅いふた付き容器に入れ、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3日以内に使います。具は全体を74°C/165°Fまで再加熱します。パン箱とふたは乾燥した容器に室温保存し、食べるときに揚げます。詰めるとすぐ柔らかくなります。",
      "남은 닭 속은 얕고 뚜껑 있는 용기에 담아 2시간 이내(32°C/90°F 초과 시 1시간 이내) 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 속 전체를 74°C/165°F로 다시 데웁니다. 식빵 상자와 뚜껑은 건조한 용기에 실온 보관하고 낼 때 새로 튀깁니다. 조립한 상자는 빨리 눅눅해집니다.",
      "แช่ไส้ไก่ที่เหลือในภาชนะตื้นมีฝาปิดภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า และกินภายใน 3 วัน อุ่นไส้ให้ทั่วถึง 74°C/165°F เก็บกล่องขนมปังและฝาในภาชนะแห้งที่อุณหภูมิห้อง แล้วทอดใหม่เมื่อจะเสิร์ฟ กล่องที่ประกอบแล้วจะนิ่มเร็ว"
    ),
    safetySources: [["safe minimum internal temperatures", temperatures], ["refrigeration and handling", handling]]
  });
}

export function refineEightyFifthMethods(recipes) {
  for (const recipe of recipes) {
    if (recipe.id === "butter-chicken") reviseButterChicken(recipe);
    if (recipe.id === "cheeseburger") reviseCheeseburger(recipe);
    if (recipe.id === "chicken-teriyaki") reviseChickenTeriyaki(recipe);
    if (recipe.id === "coffin-bread") reviseCoffinBread(recipe);
  }
}
