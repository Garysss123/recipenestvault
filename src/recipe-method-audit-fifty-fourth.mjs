const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, item: { ...row.item } })),
    instructions: recipe.instructions.map((entry) => ({
      ...entry,
      title: { ...entry.title },
      body: { ...entry.body }
    })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function ingredient(recipe, startsWith, amount, localized) {
  const row = recipe.ingredients.find((entry) => entry.item.en.startsWith(startsWith));
  if (!row) throw new Error(`${recipe.id}: missing ingredient beginning with ${startsWith}`);
  if (amount) row.amount = amount;
  row.item = localized;
}

function step(recipe, title, body) {
  const target = recipe.instructions.find((entry) => entry.title.en === title);
  if (!target) throw new Error(`${recipe.id}: missing step for fifty-fourth method review: ${title}`);
  target.body = body;
}

function addOfficial(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${title}`, url });
  }
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const seafood = "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely";
const rice = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";

function reviseRisottoAllaMilanese(recipe) {
  recipe.prepMinutes = 15;
  recipe.cookMinutes = 30;
  recipe.totalMinutes = 45;
  ingredient(recipe, "low-salt chicken or vegetable stock", null, ml(
    "low-salt chicken or vegetable stock, warmed; reserve 120 ml for saffron and use the balance for the rice and final texture",
    "低鹽雞高湯或蔬菜高湯，加熱；預留 120 毫升浸泡番紅花，其餘煮飯並在最後調整口感",
    "低塩の鶏または野菜ブイヨン、温める。120mlはサフラン用に取り分け、残りは米と仕上げの調整に使う",
    "저염 닭고기 또는 채소 육수, 따뜻하게 데움. 120ml는 사프란용으로 덜고 나머지는 쌀 조리와 마무리 농도 조절에 사용",
    "น้ำสต็อกไก่หรือน้ำสต็อกผักโซเดียมต่ำ อุ่นไว้ แบ่ง 120 มล.ไว้แช่หญ้าฝรั่น ส่วนที่เหลือใช้หุงข้าวและปรับเนื้อสัมผัสตอนจบ"
  ));

  step(recipe, "Steep the saffron", ml(
    "Warm all 1.2 L low-salt stock in a second pot and keep it just below a boil. Measure 120 ml into a cup, add all 0.25 g saffron, and steep for 10 minutes; this 120 ml comes from the listed stock, not in addition to it. Keep the remaining 1.08 L hot for the rice.",
    "另鍋將全部 1.2 公升低鹽高湯加熱至將沸未沸。量出 120 毫升加入全部 0.25 公克番紅花，浸泡 10 分鐘；這 120 毫升包含在清單的高湯總量內，不是額外添加。其餘 1.08 公升保持熱度供煮飯使用。",
    "別鍋で低塩ブイヨン1.2Lすべてを沸騰直前まで温めます。120mlをカップに取り、サフラン0.25gすべてを加えて10分浸します。この120mlは表示したブイヨンに含まれ、追加分ではありません。残りの1.08Lは温かく保ちます。",
    "다른 냄비에 저염 육수 1.2L 전량을 끓기 직전까지 데운다. 120ml를 덜어 사프란 0.25g 전량을 넣고 10분 우린다. 이 120ml는 표시된 육수에 포함되며 추가분이 아니다. 남은 1.08L는 밥을 지을 때 쓰도록 따뜻하게 둔다.",
    "อุ่นน้ำสต็อกโซเดียมต่ำทั้งหมด 1.2 ลิตรในหม้ออีกใบให้เกือบเดือด ตวง 120 มล.ใส่ถ้วย เติมหญ้าฝรั่นทั้งหมด 0.25 กรัม แช่ 10 นาที ปริมาณ 120 มล.นี้นับรวมในน้ำสต็อกที่ระบุ ไม่ใช่ส่วนที่เพิ่มมา อุ่นน้ำสต็อกที่เหลือ 1.08 ลิตรไว้สำหรับหุงข้าว"
  ));

  step(recipe, "Add stock gradually", ml(
    "Add the remaining hot stock about 150 ml at a time, stirring often and waiting until each addition is mostly absorbed before adding more. After about 10 minutes, stir in all 120 ml saffron stock, then continue for 6–8 minutes; this stock stage takes about 16–18 minutes total. The time is a texture estimate, not a safety endpoint: stop when the rice is al dente and the risotto flows loosely. Keep any unused measured stock hot and add it in small splashes during the finish only if needed to reach that texture.",
    "將其餘熱高湯每次約 150 毫升加入，經常攪拌，待每次大多吸收後再加下一次。約 10 分鐘後拌入全部 120 毫升番紅花高湯，再續煮 6–8 分鐘；這個高湯階段合計約 16–18 分鐘。時間是口感估時，不是食安熟度標準；米粒仍有彈性、燉飯可緩緩流動即可停止。量好的高湯若有剩，保持熱度，僅在最後調整口感時視需要少量加入。",
    "残りの温かいブイヨンを約150mlずつ加え、よく混ぜながら各回の大半が吸収されてから次を加えます。約10分後、サフランブイヨン120mlすべてを混ぜ、さらに6〜8分加熱します。このストックの工程は合計約16〜18分です。時間は食感の目安で、安全基準ではありません。米に芯が少し残り、リゾットがゆるやかに流れる状態で止めます。測ったブイヨンが残ったら温かく保ち、仕上げで必要な場合だけ少量ずつ加えて食感を整えます。",
    "남은 따뜻한 육수를 약 150ml씩 넣고 자주 저어 각 분량이 대부분 흡수된 뒤 다음 것을 더한다. 약 10분 후 사프란 육수 120ml 전량을 섞고 6–8분 더 끓인다. 이 육수 단계는 모두 합해 약 16–18분 걸린다. 시간은 식감 기준의 추정치이지 안전 기준이 아니다. 쌀이 알덴테이고 리소토가 부드럽게 흐르면 멈춘다. 계량한 육수가 남으면 따뜻하게 두었다가 마무리 단계에서 식감 조절이 필요할 때만 조금씩 넣는다.",
    "ค่อย ๆ เติมน้ำสต็อกที่เหลือครั้งละประมาณ 150 มล. คนบ่อย ๆ และรอให้ซึมไปเกือบหมดก่อนเติมครั้งต่อไป หลังประมาณ 10 นาที ใส่น้ำสต็อกหญ้าฝรั่น 120 มล.ทั้งหมด แล้วเคี่ยวต่อ 6–8 นาที ขั้นตอนน้ำสต็อกนี้ใช้เวลารวมประมาณ 16–18 นาที เวลาเป็นค่าประมาณด้านเนื้อสัมผัส ไม่ใช่เกณฑ์ความปลอดภัย หยุดเมื่อข้าวยังมีแกนเด้งเล็กน้อยและรีซอตโตไหลได้คล่อง หากมีน้ำสต็อกที่ตวงไว้เหลือ ให้อุ่นไว้และเติมทีละน้อยเฉพาะตอนจบเมื่อจำเป็นเพื่อปรับเนื้อสัมผัส"
  ));

  step(recipe, "Mantecare off heat", ml(
    "Remove the pan from the heat. Beat in the remaining 35 g butter and all 70 g Parmigiano for 60–90 seconds. Rest 2 minutes, then check that the risotto slowly spreads on the plate; loosen with a splash of the measured hot stock if needed. Divide the full pan evenly among 4 bowls, about 80 g dry-rice equivalent per serving, and serve promptly.",
    "離火後拌入剩下 35 公克奶油及全部 70 公克帕瑪森起司，攪打 60–90 秒。靜置 2 分鐘，再確認燉飯放在盤上會緩緩攤開；需要時用少量已量取的熱高湯調稀。整鍋平均分成 4 碗，每份約相當於 80 公克乾米，趁熱盡快上桌。",
    "火から下ろし、残りのバター35gとパルミジャーノ70gすべてを加え、60〜90秒混ぜます。2分休ませ、皿に盛ったときゆっくり広がるか確認します。必要なら計量済みの温かいブイヨンを少量加えて調整します。鍋の全量を4皿に均等に分け、1人分は乾燥米約80g相当です。早めに提供します。",
    "불에서 내린 뒤 남은 버터 35g과 파르미지아노 70g 전량을 넣고 60–90초 힘 있게 섞는다. 2분 두었다가 접시에 놓았을 때 천천히 퍼지는지 확인하고, 필요하면 계량한 따뜻한 육수를 조금 넣어 농도를 맞춘다. 냄비의 음식 전체를 네 그릇에 고르게 나누며 1인분은 마른 쌀 약 80g에 해당한다. 바로 낸다.",
    "ยกกระทะลงจากเตา ใส่เนยที่เหลือ 35 กรัมและพาร์มีจาโนทั้งหมด 70 กรัม คนแรง ๆ 60–90 วินาที พัก 2 นาที แล้วตรวจว่ารีซอตโตค่อย ๆ แผ่บนจานหรือไม่ เติมน้ำสต็อกอุ่นที่ตวงไว้ทีละน้อยหากต้องการให้เหลวขึ้น แบ่งอาหารทั้งกระทะเป็น 4 ชามเท่า ๆ กัน แต่ละที่เทียบเท่าข้าวสารประมาณ 80 กรัม เสิร์ฟทันที"
  ));

  recipe.storage = ml(
    "Because this dish contains cooked rice, cool leftovers as quickly as possible in small shallow portions and refrigerate ideally within 1 hour at 4°C (40°F) or below. Keep refrigerated and eat within 24 hours. Reheat only once, adding a splash of water or stock if needed, until steaming hot throughout; serve immediately. The 24-hour limit and one-reheat rule are rice-specific official safety guidance, not texture preferences.",
    "這道料理含熟米飯，剩菜應盡快分裝成小份淺盒冷卻，最好於 1 小時內冷藏在 4°C（40°F）以下。持續冷藏並於 24 小時內食用。只回熱一次，必要時加少量水或高湯，直到各處冒熱氣，並立即食用。24 小時與僅回熱一次是米飯專用的官方食安指引，不是口感偏好。",
    "炊いた米を含むため、残りは小分けして浅い容器に入れ、できるだけ早く冷まし、できれば1時間以内に4°C（40°F）以下で冷蔵します。冷蔵を保ち、24時間以内に食べます。再加熱は1回だけとし、必要なら水かブイヨンを少量加え、全体から湯気が出るまで温めてすぐに食べます。24時間以内と再加熱1回という制限は、食感ではなく米に関する公式の安全指針です。",
    "이 요리는 지은 쌀이 들어 있으므로 남은 음식은 작은 얕은 용기에 나눠 최대한 빨리 식히고 가능하면 1시간 안에 4°C (40°F) 이하로 냉장한다. 계속 냉장하고 24시간 안에 먹는다. 다시 데우기는 한 번만 하며 필요하면 물이나 육수를 조금 넣고 전체에서 김이 날 때까지 데운 뒤 바로 먹는다. 24시간 보관과 한 번 재가열은 식감 권장이 아닌 쌀에 관한 공식 식품 안전 지침이다.",
    "เนื่องจากเมนูนี้มีข้าวสุก ให้แบ่งอาหารเหลือเป็นส่วนเล็ก ๆ ในภาชนะตื้นเพื่อให้เย็นเร็วที่สุด และแช่เย็นที่ 4°C (40°F) หรือต่ำกว่าภายใน 1 ชั่วโมงหากทำได้ เก็บในตู้เย็นและกินภายใน 24 ชั่วโมง อุ่นซ้ำได้เพียงครั้งเดียว เติมน้ำหรือน้ำสต็อกเล็กน้อยหากจำเป็น และอุ่นจนมีไอทั่วถึงแล้วเสิร์ฟทันที ข้อกำหนด 24 ชั่วโมงและการอุ่นซ้ำครั้งเดียวเป็นคำแนะนำความปลอดภัยทางการสำหรับข้าว ไม่ใช่เรื่องเนื้อสัมผัส"
  );

  addOfficial(recipe, "UK Food Standards Agency: Home Food Fact Checker (cooked-rice guidance)", rice);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (prompt chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (refrigerator at or below 4°C)", storage);
}

function reviseLasagneBolognese(recipe) {
  ingredient(recipe, "fresh lasagne sheets", null, ml(
    "fresh lasagne sheets, about 300 g total; use 12 sheets as 3 sheets per each of 4 layers",
    "新鮮千層麵皮，總重約 300 公克；共 12 張，每層 3 張、共 4 層",
    "生ラザニアシート、合計約300g。12枚を4層に分け、各層3枚使う",
    "생 라자냐 시트 총 약 300g; 12장을 4개 층으로 나누어 층마다 3장씩 사용",
    "แผ่นลาซานญาสดรวมประมาณ 300 กรัม ใช้ 12 แผ่น แบ่งเป็น 4 ชั้น ชั้นละ 3 แผ่น"
  ));
  ingredient(recipe, "prepared Bolognese ragù", null, ml(
    "prepared Bolognese ragù, 100 g for the base and the remaining 800 g divided into four 200 g portions",
    "已煮好的波隆那肉醬，100 公克鋪底，其餘 800 公克分成 4 份、每份 200 公克",
    "調理済みボロネーゼラグー。100gを底に使い、残り800gを200gずつ4等分する",
    "미리 조리한 볼로네제 라구. 100g은 바닥에 쓰고 남은 800g은 200g씩 네 몫으로 나눈다",
    "รากูโบโลเนสที่ปรุงสุกแล้ว ใช้ 100 กรัมรองก้นจาน และแบ่ง 800 กรัมที่เหลือเป็น 4 ส่วน ส่วนละ 200 กรัม"
  ));

  step(recipe, "Build the layers", ml(
    "Use all 12 fresh sheets in four layers of three sheets each. Spread the measured 100 g ragù thinly over the dish base. For each pasta layer, add one 200 g portion of the remaining ragù, one quarter of the finished béchamel, and 30 g Parmigiano; repeat until all four portions are used, finishing the top pasta layer with its béchamel and cheese. The ingredient list then accounts for all 900 g ragù, all béchamel, and all 120 g cheese.",
    "12 張新鮮麵皮分成 4 層、每層 3 張。將量好的 100 公克肉醬薄薄鋪在烤皿底部。每鋪一層麵皮，就加入一份 200 公克剩餘肉醬、四分之一完成的白醬及 30 公克帕瑪森起司；重複至四份用完，最上層麵皮以白醬和起司收尾。如此可用完清單中的 900 公克肉醬、全部白醬及 120 公克起司。",
    "生ラザニアシート12枚を各3枚の4層に分けます。計量したラグー100gを皿の底に薄く広げます。パスタを1層重ねるごとに、残りのラグー200g、出来上がったベシャメルの4分の1、パルミジャーノ30gを重ねます。4回繰り返し、最後のパスタ層もベシャメルとチーズで覆います。ラグー900g、ベシャメル全量、チーズ120gをすべて使います。",
    "생 라자냐 시트 12장을 한 층에 3장씩 네 층으로 쌓는다. 계량한 라구 100g을 접시 바닥에 얇게 펴 바른다. 파스타 한 층마다 남은 라구 200g, 완성된 베샤멜소스 4분의 1, 파르미지아노 30g을 올린다. 네 번 반복하며 마지막 파스타 층도 베샤멜과 치즈로 덮는다. 라구 900g, 베샤멜 전량, 치즈 120g을 모두 사용한다.",
    "ใช้แผ่นสดทั้งหมด 12 แผ่น แบ่งเป็น 4 ชั้น ชั้นละ 3 แผ่น ปาดรากูที่ตวงไว้ 100 กรัมบาง ๆ ที่ก้นถาด วางแผ่นพาสต้าแต่ละชั้นแล้วใส่รากูที่เหลือส่วนละ 200 กรัม เบชาเมลที่ทำเสร็จหนึ่งในสี่ และพาร์มีจาโน 30 กรัม ทำซ้ำจนครบ 4 ส่วน โดยปิดชั้นพาสต้าแผ่นสุดท้ายด้วยเบชาเมลและชีส วิธีนี้ใช้รากูทั้งหมด 900 กรัม เบชาเมลทั้งหมด และชีส 120 กรัม"
  ));

  step(recipe, "Bake until bubbling", ml(
    "Bake uncovered at 190°C for an estimated 35–40 minutes, until the edges bubble and the top is deeply golden; those are quality cues. Check the centre of the casserole with a clean food thermometer: it must reach 74°C (165°F), the official casserole endpoint. If the centre is below that point, tent if needed and continue in 5-minute increments, rechecking the centre. If the top darkens too fast, loosely cover it with foil.",
    "以 190°C 不加蓋烘烤約 35–40 分鐘（估時），至邊緣冒泡、表面呈深金色；這些是品質指標。用乾淨食物溫度計測量烤皿中心，須達官方砂鍋／焗烤料理標準 74°C（165°F）。若中心未達，必要時鬆鬆蓋上鋁箔，每次續烤 5 分鐘後重測。若表面太快變深，也可鬆蓋鋁箔。",
    "190°Cで、縁が泡立ち表面が濃いきつね色になるまで目安として35〜40分焼きます。これらは品質の目安です。清潔な食品用温度計で皿の中心を測り、キャセロールの公式基準74°C（165°F）に達したことを確認します。中心が未達なら必要に応じてアルミホイルをふんわりかけ、5分ずつ追加して再測定します。表面が早く濃くなりすぎる場合もホイルをかけます。",
    "190°C에서 뚜껑 없이 약 35–40분 굽는다(추정 시간). 가장자리에 거품이 나고 윗면이 진한 황금색이 되면 품질상 기준이다. 깨끗한 식품 온도계로 캐서롤 중심을 확인해 공식 캐서롤 기준인 74°C (165°F)에 도달해야 한다. 중심 온도가 낮으면 필요할 때 호일을 느슨하게 덮고 5분씩 더 구운 뒤 다시 잰다. 윗면이 너무 빨리 짙어져도 호일을 덮는다.",
    "อบที่ 190°C แบบไม่ปิดฝาประมาณ 35–40 นาที (เป็นค่าประมาณ) จนขอบเดือดปุดและด้านบนเป็นสีน้ำตาลทองเข้ม ซึ่งเป็นเกณฑ์คุณภาพ ใช้เทอร์โมมิเตอร์อาหารที่สะอาดวัดตรงกลางถาดให้ถึงเกณฑ์ทางการของอาหารอบถาดที่ 74°C (165°F) หากตรงกลางยังต่ำกว่า ให้คลุมฟอยล์หลวม ๆ หากจำเป็น อบเพิ่มครั้งละ 5 นาทีแล้ววัดซ้ำ หากด้านบนเข้มเร็วเกินไปให้คลุมฟอยล์หลวม ๆ เช่นกัน"
  ));

  step(recipe, "Rest before cutting", ml(
    "Rest uncovered for 20 minutes so the layers settle. Cut the 23 × 33 cm pan into 8 equal pieces (four rows by two columns); each serving receives about 112.5 g ragù-equivalent from the listed 900 g, with pasta, béchamel, and cheese distributed evenly. Lift each portion with a broad spatula.",
    "不加蓋靜置 20 分鐘，讓層次定型。將 23 × 33 公分烤皿切成 8 等份（四排、每排兩塊）；每份約含清單中 900 公克肉醬所對應的 112.5 公克，麵皮、白醬及起司也平均分配。用寬鍋鏟托起每份。",
    "層を落ち着かせるため、ふたをせず20分休ませます。23×33cmの皿を8等分（4列×2個）に切ります。各人分はラグー900gから約112.5g相当で、パスタ、ベシャメル、チーズも均等に分かれます。幅広のへらで取り分けます。",
    "층이 자리 잡도록 뚜껑을 덮지 않고 20분 둔다. 23 × 33cm 접시를 8등분(네 줄, 두 칸)한다. 한 몫에는 표시된 라구 900g 기준 약 112.5g 상당량이 들어가고 파스타, 베샤멜, 치즈도 고르게 나뉜다. 넓은 주걱으로 들어 올린다.",
    "พักโดยไม่ปิดฝา 20 นาทีให้ชั้นอาหารเซ็ตตัว ตัดถาดขนาด 23 × 33 ซม.เป็น 8 ชิ้นเท่ากัน (4 แถว แถวละ 2 ชิ้น) แต่ละที่เทียบเท่ารากูประมาณ 112.5 กรัมจากทั้งหมด 900 กรัม และแบ่งพาสต้า เบชาเมล และชีสให้เท่ากัน ใช้พายกว้างยกแต่ละชิ้น"
  ));

  recipe.storage = ml(
    "Refrigerate leftovers in shallow covered containers within 2 hours at 4°C (40°F) or below. The FoodSafety.gov chart gives 3–4 days for cooked meat or poultry leftovers; use within 3 days here for best texture. Reheat only the portion needed until the centre reaches 74°C (165°F), the official leftover endpoint. The 35–40 minute bake is an estimate; the centre temperature controls safety.",
    "剩菜放入有蓋淺盒，於 2 小時內冷藏在 4°C（40°F）以下。FoodSafety.gov 冷藏表列熟肉或禽肉剩食可保存 3–4 天；本食譜建議 3 天內食用以維持口感。只回熱要吃的份量，直到中心達官方剩食標準 74°C（165°F）。烘烤 35–40 分鐘是估時，食安以中心溫度為準。",
    "残りはふた付きの浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。FoodSafety.govの表では調理済みの肉・鶏肉の残りは3〜4日保存できます。このレシピでは食感のため3日以内を目安にします。食べる分だけ温め直し、中心を残り物の公式基準74°C（165°F）まで加熱します。35〜40分は目安で、安全性は中心温度で判断します。",
    "남은 음식은 얕은 밀폐 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. FoodSafety.gov 보관표는 조리한 육류·가금류 남은 음식을 3–4일 보관할 수 있다고 안내한다. 이 레시피는 식감을 위해 3일 안에 먹는 것을 권한다. 먹을 만큼만 데워 중심이 공식 남은 음식 기준인 74°C (165°F)에 도달하게 한다. 굽는 35–40분은 추정치이며 안전 여부는 중심 온도로 판단한다.",
    "ใส่อาหารเหลือในภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า ตารางของ FoodSafety.gov ระบุว่าอาหารเหลือประเภทเนื้อหรือสัตว์ปีกที่ปรุงสุกเก็บได้ 3–4 วัน สูตรนี้แนะนำให้กินภายใน 3 วันเพื่อเนื้อสัมผัสที่ดี อุ่นเฉพาะส่วนที่จะกินจนตรงกลางถึงเกณฑ์ทางการสำหรับอาหารเหลือ 74°C (165°F) เวลาอบ 35–40 นาทีเป็นค่าประมาณ ความปลอดภัยให้ยึดอุณหภูมิตรงกลาง"
  );

  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (casseroles and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (prompt chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (cooked meat and poultry leftovers)", storage);
}

function reviseSmallSausageBigSausage(recipe) {
  recipe.cookMinutes = 55;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  ingredient(recipe, "fine salt", "6 g", ml(
    "fine salt, divided: 4 g for rice and 2 g for cucumber",
    "細鹽，分開使用：米飯 4 公克、小黃瓜 2 公克",
    "塩。米用4g、きゅうり用2gに分ける",
    "고운 소금, 나누어 사용: 밥에 4g, 오이에 2g",
    "เกลือละเอียด แบ่งใช้: 4 กรัมสำหรับข้าว และ 2 กรัมสำหรับแตงกวา"
  ));
  ingredient(recipe, "neutral oil", "15 ml", ml(
    "neutral oil, divided: 5 ml for the rice and 10 ml for brushing the rice links",
    "中性油，分開使用：5 毫升拌米飯、10 毫升刷米腸",
    "植物油。米に5ml、米腸に塗る分10mlに分ける",
    "중성유, 나누어 사용: 밥에 5ml, 쌀 소시지에 바르는 데 10ml",
    "น้ำมันรสกลาง แบ่งใช้: 5 มล.คลุกข้าว และ 10 มล.ทาไส้ข้าว"
  ));

  step(recipe, "Soak and season the rice", ml(
    "Rinse all 360 g dry glutinous rice until the water is mostly clear. Soak in cool water for 6 hours, then drain for 20 minutes. Toss with 5 ml of the listed oil and 4 g of the 6 g salt; reserve the remaining 10 ml oil for brushing and 2 g salt for the cucumber. The 6-hour soak is included in the 390-minute prep estimate.",
    "將全部 360 公克乾糯米沖洗至水大致清澈，以冷水浸泡 6 小時後瀝乾 20 分鐘。拌入清單中的 5 毫升油及 6 公克鹽中的 4 公克；其餘 10 毫升油留作刷腸衣，2 公克鹽留給小黃瓜。6 小時浸泡已計入 390 分鐘備料時間。",
    "乾燥もち米360gすべてを水がほぼ透明になるまで洗います。冷水に6時間浸し、20分水切りします。表示した油5mlと塩6gのうち4gを混ぜます。残りの油10mlは米腸に塗り、塩2gはきゅうり用に取っておきます。6時間の浸水は準備時間390分に含まれています。",
    "마른 찹쌀 360g 전량을 물이 거의 맑아질 때까지 씻는다. 찬물에 6시간 담갔다가 20분 물기를 뺀다. 표시된 기름 5ml와 소금 6g 중 4g을 고루 섞는다. 남은 기름 10ml는 쌀 소시지에 바르고 소금 2g은 오이용으로 남긴다. 6시간 불림은 준비 시간 390분에 포함된다.",
    "ล้างข้าวเหนียวแห้งทั้งหมด 360 กรัมจนน้ำค่อนข้างใส แช่น้ำเย็น 6 ชั่วโมงแล้วสะเด็ด 20 นาที คลุกน้ำมันที่ระบุ 5 มล.กับเกลือ 4 กรัมจากทั้งหมด 6 กรัม เก็บน้ำมันอีก 10 มล.ไว้ทาไส้ข้าว และเกลือ 2 กรัมไว้สำหรับแตงกวา เวลาแช่ 6 ชั่วโมงรวมอยู่ในเวลาเตรียม 390 นาทีแล้ว"
  ));

  step(recipe, "Loosely fill the rice casing", ml(
    "Tie one end of the 38–42 mm casing. Divide the soaked rice evenly into six links, each 18 cm long, filling only about 60% so the grains have room to expand. Twist or tie between links, prick trapped air pockets with a clean pin, and close each end firmly. The listed 1.5 m casing gives extra length for tying and trimming.",
    "將 38–42 毫米腸衣一端綁緊。把泡好的米平均分成 6 段，每段長 18 公分，僅填至約六成滿，讓米粒有膨脹空間。每段之間扭轉或綁緊，用乾淨細針刺破氣泡，並牢牢封住兩端。清單所列 1.5 公尺腸衣含打結與修剪所需餘量。",
    "直径38〜42mmの腸衣の片端を結びます。浸水した米を6等分し、長さ18cmずつにします。米が膨らむ余地を残すため、容量の約60%まで詰めます。間をねじるか結び、清潔な針で空気を抜き、両端をしっかり閉じます。表示した腸衣1.5mには結びと切り落とし分を含みます。",
    "지름 38–42mm 케이싱 한쪽 끝을 묶는다. 불린 쌀을 여섯 몫으로 고르게 나누고 각 18cm 길이로 채운다. 쌀이 불어날 공간을 위해 약 60%만 채운다. 각 링크 사이를 비틀거나 묶고 깨끗한 핀으로 공기 주머니를 찔러 빼낸 뒤 양 끝을 단단히 묶는다. 표시된 케이싱 1.5m에는 매듭과 자투리 길이가 포함된다.",
    "มัดปลายด้านหนึ่งของไส้หมูขนาด 38–42 มม. แบ่งข้าวที่แช่แล้วเป็น 6 ส่วนเท่า ๆ กัน ทำเป็นชิ้นยาว 18 ซม. และใส่เพียงประมาณ 60% เพื่อให้ข้าวขยายตัวได้ บิดหรือมัดระหว่างชิ้น ใช้เข็มสะอาดจิ้มฟองอากาศและมัดปลายแต่ละข้างให้แน่น ไส้ 1.5 ม.ตามรายการเผื่อความยาวสำหรับมัดและตัดแต่ง"
  ));

  step(recipe, "Steam until the rice is tender", ml(
    "Arrange the six rice links in one layer above steady medium steam. Cover and steam for an estimated 35–40 minutes, turning once at 20 minutes; the time varies with casing thickness and steamer load. Check a grain from the centre of a test end: it should be fully translucent and chewy with no hard core. Rest covered off heat for 10 minutes. These are rice-texture cues, not an internal-temperature test.",
    "將 6 段米腸單層放在穩定的中火蒸氣上方，加蓋蒸約 35–40 分鐘（估時），第 20 分鐘翻面一次；時間會因腸衣厚度與蒸鍋負載而變。從試切端取一粒中心米粒檢查：應完全透明、有嚼勁且沒有硬芯。離火加蓋靜置 10 分鐘。這些是米飯口感指標，不是中心溫度測試。",
    "米腸6本を蒸し器に一層に並べ、中火の安定した蒸気で目安として35〜40分蒸します。20分で一度返します。時間は腸衣の厚さや蒸し器の量で変わります。端を切って中心の米粒を確認し、完全に透き通ってもちもちし、硬い芯がない状態にします。火を止めてふたをしたまま10分休ませます。これは米の食感の目安で、中心温度を測る工程ではありません。",
    "쌀 소시지 여섯 개를 겹치지 않게 한 층으로 놓고 중간 세기의 일정한 김에 올린다. 뚜껑을 덮고 약 35–40분 찐다(추정치). 20분에 한 번 뒤집는다. 시간은 케이싱 두께와 찜기 양에 따라 달라진다. 끝부분을 조금 잘라 중심의 쌀알을 확인한다. 완전히 투명하고 쫀득하며 딱딱한 심이 없어야 한다. 불을 끄고 덮은 채 10분 둔다. 이는 쌀 식감 기준이며 중심 온도 검사가 아니다.",
    "เรียงไส้ข้าวทั้ง 6 ชิ้นชั้นเดียวเหนือไอน้ำแรงปานกลางที่สม่ำเสมอ ปิดฝานึ่งประมาณ 35–40 นาที (เป็นค่าประมาณ) พลิกหนึ่งครั้งเมื่อครบ 20 นาที เวลาอาจต่างกันตามความหนาของไส้และปริมาณในลังถึง ตรวจเมล็ดข้าวจากปลายชิ้นทดลอง: ควรใสทั่ว เหนียวนุ่ม และไม่มีแกนแข็ง พักโดยปิดฝานอกเตา 10 นาที นี่เป็นเกณฑ์เนื้อสัมผัสของข้าว ไม่ใช่การวัดอุณหภูมิภายใน"
  ));

  step(recipe, "Quick-pickle the cucumber", ml(
    "While the rice steams, mix all 180 g cucumber with 25 ml rice vinegar, 12 g sugar, and the reserved 2 g salt. Massage for 30 seconds and rest 20 minutes, then drain very well. Divide the cucumber into six portions of about 30 g each so it does not soak the rice casing.",
    "米腸蒸煮時，將全部 180 公克小黃瓜與 25 毫升米醋、12 公克糖及預留的 2 公克鹽拌勻。按摩 30 秒，靜置 20 分鐘後充分瀝乾。分成 6 份、每份約 30 公克，避免醃汁浸濕米腸。",
    "米腸を蒸している間に、きゅうり180gすべてを米酢25ml、砂糖12g、取り置いた塩2gと混ぜます。30秒もみ、20分置いてから十分に水を切ります。6等分して1人約30gずつにし、米腸が水っぽくならないようにします。",
    "쌀 소시지를 찌는 동안 오이 180g 전량에 쌀식초 25ml, 설탕 12g, 남겨 둔 소금 2g을 섞는다. 30초 주무르고 20분 둔 다음 물기를 충분히 뺀다. 여섯 몫으로 나누어 1인분 약 30g씩 준비해 쌀 소시지가 물에 젖지 않게 한다.",
    "ระหว่างนึ่งไส้ข้าว คลุกแตงกวาทั้งหมด 180 กรัมกับน้ำส้มสายชูข้าว 25 มล. น้ำตาล 12 กรัม และเกลือ 2 กรัมที่แบ่งไว้ นวด 30 วินาที พัก 20 นาทีแล้วสะเด็ดให้แห้งมาก ๆ แบ่งเป็น 6 ส่วน ส่วนละประมาณ 30 กรัมเพื่อไม่ให้ไส้ข้าวแฉะ"
  ));

  step(recipe, "Grill both sausages", ml(
    "Brush the six rice links with the reserved 10 ml oil and grill or pan-sear over medium heat for an estimated 6–8 minutes, turning to crisp the casing evenly. Warm the six specified fully cooked pork sausages alongside according to their package directions until hot and browned. The rice-link browning time is for texture; no meat cooking endpoint is needed for sausages specified as fully cooked. The combined steaming, covered rest, and browning take about 55 minutes.",
    "用預留的 10 毫升油刷 6 段米腸，以中火烤或煎約 6–8 分鐘（估時），翻面使腸衣均勻酥脆。同時依包裝說明加熱 6 條已全熟豬肉香腸，至熱透並上色。米腸上色時間是口感指標；本食譜指定使用全熟香腸，因此不需套用生肉熟度標準。蒸煮、加蓋靜置及上色合計約 55 分鐘。",
    "取り置いた油10mlを米腸6本に塗り、中火で目安として6〜8分、返しながら皮を均等にカリッと焼きます。指定の加熱済み豚ソーセージ6本は、包装の指示に従って温め、熱く焼き色が付くまで加熱します。米腸を焼く時間は食感のためです。加熱済みと指定したソーセージに生肉用の加熱温度基準を当てはめる必要はありません。蒸し、休ませ、焼き色を付ける工程は合計約55分です。",
    "남겨 둔 기름 10ml를 쌀 소시지 여섯 개에 바르고 중불에서 약 6–8분 굽거나 지진다(추정치). 뒤집어 케이싱을 고르게 바삭하게 만든다. 지정된 완전히 익힌 돼지고기 소시지 여섯 개는 포장 지침에 따라 뜨겁고 노릇해질 때까지 함께 데운다. 쌀 소시지를 굽는 시간은 식감 기준이다. 완전히 익힌 소시지에는 생고기 조리 온도 기준을 적용할 필요가 없다. 찌기, 덮어 두기, 굽기를 합쳐 약 55분 걸린다.",
    "ทาน้ำมัน 10 มล.ที่แบ่งไว้บนไส้ข้าวทั้ง 6 ชิ้น ย่างหรือจี่กระทะด้วยไฟกลางประมาณ 6–8 นาที (เป็นค่าประมาณ) พลิกให้ไส้กรอบทั่ว อุ่นไส้กรอกหมูที่ปรุงสุกแล้วทั้ง 6 ชิ้นตามคำแนะนำบนบรรจุภัณฑ์จนร้อนและเป็นสีน้ำตาล เวลาอบผิวไส้ข้าวเป็นเรื่องเนื้อสัมผัส ไม่ต้องใช้เกณฑ์อุณหภูมิของเนื้อดิบกับไส้กรอกที่ระบุว่าปรุงสุกแล้ว ขั้นนึ่ง พักในลัง และทำผิวกรอบใช้เวลารวมประมาณ 55 นาที"
  ));

  step(recipe, "Split, fill, and serve", ml(
    "Split each rice link lengthwise without cutting through the back. Fill each with one warm pork sausage, one sixth of the garlic and cilantro, about 30 g drained cucumber, and exactly 10 g sweet chile sauce. This uses all 60 g sauce across six servings; serve one filled rice link per person. Keep the remaining pickled cucumber separate until serving.",
    "每段米腸縱向剖開，但不要切穿背面。每段放入 1 條熱豬肉香腸、六分之一的蒜片與香菜、約 30 公克瀝乾小黃瓜，以及剛好 10 公克甜辣醬。6 份共用完 60 公克醬料；每人 1 段米腸。其餘醃小黃瓜分開保存至上桌。",
    "米腸の背まで切らないよう、縦に切れ目を入れます。それぞれに温かい豚ソーセージ1本、にんにくと香菜の6分の1、よく水を切ったきゅうり約30g、スイートチリソース10gを入れます。6人分でソース60gすべてを使い、1人1本ずつ提供します。残りのきゅうりは食べる直前まで別にしておきます。",
    "쌀 소시지를 뒤쪽까지 자르지 않도록 세로로 가른다. 각각 따뜻한 돼지고기 소시지 한 개, 마늘과 고수의 6분의 1, 물기 뺀 오이 약 30g, 스위트 칠리소스 정확히 10g을 채운다. 여섯 몫에 소스 60g 전량을 사용하며 1인당 쌀 소시지 한 개씩 낸다. 남은 오이는 내기 직전까지 따로 둔다.",
    "ผ่าไส้ข้าวตามยาวโดยไม่ตัดทะลุด้านหลัง ใส่ไส้กรอกหมูอุ่นหนึ่งชิ้น กระเทียมและผักชีอย่างละหนึ่งในหก แตงกวาสะเด็ดน้ำประมาณ 30 กรัม และซอสพริกหวาน 10 กรัมพอดี ใช้ซอสทั้งหมด 60 กรัมสำหรับ 6 ที่ เสิร์ฟไส้ข้าวยัดไส้คนละหนึ่งชิ้น เก็บแตงกวาดองที่เหลือแยกไว้จนถึงเวลาเสิร์ฟ"
  ));

  recipe.storage = ml(
    "This dish contains cooked rice. Cool the rice links as quickly as possible in a single layer and refrigerate ideally within 1 hour at 4°C (40°F) or below; do not leave them to cool completely at room temperature. Eat within 24 hours. Reheat only once until steaming hot all the way through and eat immediately. The UK Food Standards Agency gives rice-specific 24-hour and one-reheat guidance; these are safety limits, not crispness preferences. Store cucumber and sauce separately for texture.",
    "本料理含熟米飯。米腸應單層放置盡快冷卻，最好於 1 小時內冷藏在 4°C（40°F）以下；不可在室溫放至完全冷透。24 小時內食用。只回熱一次，直到中心冒熱氣，並立即食用。英國食品標準局對米飯提供 24 小時及僅回熱一次的專門指引，這些是食安限制，不是酥脆口感建議。小黃瓜與醬料分開保存以維持口感。",
    "米を含む料理です。米腸は一層に並べてできるだけ早く冷まし、できれば1時間以内に4°C（40°F）以下で冷蔵します。室温で完全に冷めるまで放置しないでください。24時間以内に食べます。再加熱は1回だけとし、中心まで湯気が出るまで温めてすぐに食べます。英国食品基準庁の24時間以内・再加熱1回という指針は米に関する安全上の制限で、皮の食感の好みではありません。きゅうりとソースは食感のため別に保存します。",
    "이 요리는 지은 쌀이 들어 있다. 쌀 소시지는 한 겹으로 놓아 최대한 빨리 식히고 가능하면 1시간 안에 4°C (40°F) 이하로 냉장한다. 실온에서 완전히 식을 때까지 두지 않는다. 24시간 안에 먹는다. 다시 데우기는 한 번만 하며 중심까지 김이 날 때까지 데운 뒤 바로 먹는다. 영국 식품기준청의 24시간 및 한 번 재가열 지침은 쌀에 관한 안전 제한이지 바삭함을 위한 선호가 아니다. 오이와 소스는 식감을 위해 따로 보관한다.",
    "เมนูนี้มีข้าวสุก ให้เรียงไส้ข้าวชั้นเดียวและทำให้เย็นเร็วที่สุด จากนั้นแช่เย็นที่ 4°C (40°F) หรือต่ำกว่าภายใน 1 ชั่วโมงหากทำได้ อย่าปล่อยไว้ที่อุณหภูมิห้องจนเย็นสนิท กินภายใน 24 ชั่วโมง อุ่นซ้ำได้เพียงครั้งเดียวจนมีไอถึงตรงกลางและกินทันที คำแนะนำ 24 ชั่วโมงและอุ่นซ้ำครั้งเดียวของสำนักงานมาตรฐานอาหารสหราชอาณาจักรเป็นข้อจำกัดด้านความปลอดภัยของข้าว ไม่ใช่ความชอบเรื่องความกรอบ เก็บแตงกวาและซอสแยกกันเพื่อรักษาเนื้อสัมผัส"
  );

  addOfficial(recipe, "UK Food Standards Agency: Home Food Fact Checker (cooked-rice guidance)", rice);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (prompt chilling)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (refrigerator at or below 4°C)", storage);
}

function revisePulpoAGallega(recipe) {
  recipe.cookMinutes = 90;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  ingredient(recipe, "cleaned octopus", null, ml(
    "cleaned octopus, fresh or previously frozen; if frozen, thaw overnight in a leakproof container in the refrigerator",
    "已清理章魚，可用新鮮或曾冷凍品；若冷凍，先置防漏容器於冰箱冷藏隔夜解凍",
    "下処理済みのたこ。生または冷凍品を使用し、冷凍の場合は漏れない容器に入れて冷蔵庫で一晩解凍",
    "손질한 문어, 생물 또는 냉동 제품. 냉동 제품은 새지 않는 용기에 담아 냉장고에서 하룻밤 해동",
    "ปลาหมึกยักษ์ที่ทำความสะอาดแล้ว ใช้สดหรือแช่แข็ง หากแช่แข็งให้ละลายข้ามคืนในภาชนะกันรั่วในตู้เย็น"
  ));
  step(recipe, "Bring the onion water to a boil", ml(
    "If the octopus is frozen, thaw it overnight in a leakproof container in the refrigerator; this thawing time is not included in the 20-minute prep estimate. Keep raw octopus separate from ready-to-eat ingredients and wash hands, scissors, and boards after handling it. Put the listed 4 L water and halved onion in a tall pot; allow about 10–15 minutes for it to reach a full boil, depending on the pot and hob. Do not salt the cooking water; the octopus is seasoned after slicing.",
    "若章魚冷凍，先放在防漏容器中於冰箱冷藏隔夜解凍；解凍時間不計入 20 分鐘備料估時。生章魚與即食材料分開處理，接觸後清洗雙手、剪刀及砧板。將清單中的 4 公升水與對半切的洋蔥放入高鍋；依鍋具與爐火，約需 10–15 分鐘煮至完全沸騰。煮水不加鹽，章魚切好後再調味。",
    "冷凍のたこは漏れない容器に入れて冷蔵庫で一晩解凍します。この解凍時間は準備20分の目安に含みません。生たこはそのまま食べる材料と分けて扱い、触れた後は手、はさみ、まな板を洗います。表示した水4Lと半分に切った玉ねぎを深鍋に入れ、鍋やコンロにもよりますが、沸騰まで約10〜15分を見込みます。ゆで湯には塩を加えず、たこを切った後で味付けします。",
    "냉동 문어는 새지 않는 용기에 담아 냉장고에서 하룻밤 해동한다. 이 해동 시간은 준비 추정치 20분에 포함되지 않는다. 생문어는 바로 먹는 재료와 분리하고 손질 후 손, 가위, 도마를 씻는다. 표시된 물 4L와 반으로 자른 양파를 깊은 냄비에 넣고 냄비와 화력에 따라 약 10–15분 끓여 완전히 끓어오르게 한다. 삶는 물에는 소금을 넣지 않고 문어를 자른 뒤 간한다.",
    "หากใช้ปลาหมึกยักษ์แช่แข็ง ให้ละลายในภาชนะกันรั่วในตู้เย็นข้ามคืน เวลาละลายนี้ไม่รวมในเวลาเตรียมประมาณ 20 นาที แยกปลาหมึกดิบจากวัตถุดิบพร้อมกิน และล้างมือ กรรไกร และเขียงหลังจับ ใส่น้ำ 4 ลิตรตามรายการกับหัวหอมผ่าครึ่งลงหม้อสูง เผื่อเวลาประมาณ 10–15 นาทีให้น้ำเดือดเต็มที่ โดยขึ้นกับหม้อและเตา ไม่ใส่เกลือในน้ำต้ม ปรุงรสปลาหมึกหลังหั่นแล้ว"
  ));

  step(recipe, "Simmer until the thick tentacle is tender", ml(
    "After the water returns to a boil, lower it to a steady gentle simmer. The 40–50 minutes is an estimate for a 1.5 kg octopus. At 40 minutes, use a clean thermometer to check the thickest tentacle reaches 63°C (145°F), the FDA's general minimum for most seafood; that temperature is the safety check. Separately insert a clean skewer into the thickest part for texture: it should enter with light resistance. If the temperature is below 63°C, continue in 5-minute increments and recheck; if it is safe but still tough, keep simmering gently until tender. Drain for 10 minutes.",
    "水再次沸騰後，轉為穩定微滾。1.5 公斤章魚煮 40–50 分鐘是估值。第 40 分鐘用乾淨溫度計測最厚觸腕，達 63°C（145°F）；這是 FDA 對多數海鮮提出的一般最低熟度，也是食安檢查。另用乾淨竹籤插入最厚處判斷口感，應有輕微阻力。若低於 63°C，每次續煮 5 分鐘並重測；若已達安全溫度但仍韌，就繼續微滾至柔嫩。瀝水 10 分鐘。",
    "湯が再び沸騰したら、安定した静かな煮立ちに落とします。1.5kgのたこで40〜50分は目安です。40分後、清潔な温度計で最も太い脚の中心が63°C（145°F）に達したか確認します。これはFDAが多くの魚介類に示す一般的な最低温度で、安全確認に使います。食感は別に、清潔な串を最も太い部分に刺して確認し、軽い抵抗で入る状態にします。63°C未満なら5分ずつ追加して測り直します。安全温度に達していても硬ければ、柔らかくなるまで静かに煮ます。10分水を切ります。",
    "물이 다시 끓으면 일정하게 약하게 끓도록 낮춘다. 문어 1.5kg 기준 40–50분은 추정치다. 40분에 깨끗한 온도계로 가장 두꺼운 다리 중심이 63°C (145°F)에 도달했는지 확인한다. 이는 FDA가 대부분의 해산물에 제시하는 일반 최소 온도로 안전 확인 기준이다. 식감은 별도로 깨끗한 꼬치를 가장 두꺼운 부위에 찔러 약간의 저항으로 들어가는지 본다. 63°C보다 낮으면 5분씩 더 끓여 다시 측정한다. 안전 온도에 도달했어도 질기면 부드러워질 때까지 약하게 더 끓인다. 10분간 물기를 뺀다.",
    "เมื่อน้ำกลับมาเดือด ลดไฟให้เคี่ยวเบา ๆ อย่างสม่ำเสมอ เวลา 40–50 นาทีเป็นค่าประมาณสำหรับปลาหมึกยักษ์ 1.5 กก. เมื่อครบ 40 นาที ใช้เทอร์โมมิเตอร์สะอาดตรวจส่วนที่หนาที่สุดให้ถึง 63°C (145°F) ซึ่งเป็นเกณฑ์ขั้นต่ำทั่วไปของ FDA สำหรับอาหารทะเลส่วนใหญ่และเป็นการตรวจความปลอดภัย แยกตรวจเนื้อสัมผัสโดยใช้ไม้เสียบสะอาดจิ้มส่วนที่หนาที่สุด ควรเข้าได้โดยมีแรงต้านเล็กน้อย หากยังต่ำกว่า 63°C ให้เคี่ยวเพิ่มครั้งละ 5 นาทีและวัดซ้ำ หากถึงอุณหภูมิความปลอดภัยแล้วแต่ยังเหนียว ให้เคี่ยวเบา ๆ ต่อจนเปื่อยนุ่ม สะเด็ดน้ำ 10 นาที"
  ));

  step(recipe, "Cook the potatoes in the octopus water", ml(
    "Measure 2 L of the octopus cooking liquid into a pot and bring it back to a simmer; discard or save the remaining liquid for another use. Cut all 700 g peeled potatoes into 1.5 cm rounds. Simmer for an estimated 15–20 minutes until a knife enters easily but the slices still hold shape. Drain well and divide evenly across six plates, about 117 g raw-potato equivalent per serving.",
    "量出 2 公升章魚高湯放入鍋中重新煮至微滾；其餘高湯可丟棄或另作他用。全部 700 公克去皮馬鈴薯切成 1.5 公分圓片，微滾約 15–20 分鐘（估時），至刀可輕易插入但切片仍能保持形狀。充分瀝乾並平均分到 6 盤，每份約相當於 117 公克生馬鈴薯。",
    "たこのゆで汁を2L量って鍋に移し、再び静かに煮立てます。残りは捨てるか別の用途に使います。皮をむいたじゃがいも700gすべてを1.5cmの輪切りにします。目安として15〜20分、ナイフが楽に入るが形は保つまで煮ます。よく水を切り、6皿に均等に分けます。1人分は生のじゃがいも約117g相当です。",
    "문어 삶은 물 2L를 계량해 냄비에 옮기고 다시 약하게 끓인다. 남은 물은 버리거나 다른 용도로 보관한다. 껍질 벗긴 감자 700g 전량을 1.5cm 원형으로 자른다. 약 15–20분 삶는다(추정치). 칼이 쉽게 들어가지만 조각이 형태를 유지하면 건진다. 물기를 잘 빼고 여섯 접시에 고르게 나누며 1인분은 생감자 약 117g에 해당한다.",
    "ตวงน้ำต้มปลาหมึก 2 ลิตรใส่หม้อและต้มให้เดือดอ่อนอีกครั้ง ส่วนน้ำที่เหลือทิ้งหรือเก็บไว้ใช้อย่างอื่น หั่นมันฝรั่งปอกเปลือกทั้งหมด 700 กรัมเป็นแว่นหนา 1.5 ซม. เคี่ยวประมาณ 15–20 นาที (เป็นค่าประมาณ) จนมีดแทงเข้าได้ง่ายแต่แว่นยังคงรูป สะเด็ดให้ดีแล้วแบ่งเท่า ๆ กันลง 6 จาน แต่ละที่เทียบเท่ามันฝรั่งดิบประมาณ 117 กรัม"
  ));

  step(recipe, "Season in the Galician order", ml(
    "Place the six portions of warm potatoes on plates and divide all cooked octopus evenly over them (about 250 g raw-octopus equivalent per serving). Use all 8 g coarse salt, 4 g sweet paprika, and 1 g hot paprika evenly across the six plates, then drizzle the full 60 ml olive oil (about 10 ml per plate). From first heating the water through cutting and plating, budget about 90 minutes of cook time; the stages are estimates and safety or tenderness checks may require longer. Serve warm for the paprika aroma; serving temperature and the skewer cue are quality indicators, not safety tests.",
    "將 6 份溫熱馬鈴薯鋪在盤上，把煮熟章魚平均分配（每份約相當於 250 公克生章魚）。全部 8 公克粗鹽、4 公克甜紅椒粉及 1 公克辣紅椒粉平均撒在六盤，再淋上全部 60 毫升橄欖油（每盤約 10 毫升）。從開始加熱煮水到切好分盤，烹煮估時約 90 分鐘；各階段時間均為估值，安全或嫩度檢查可能需要更久。趁溫熱上桌以帶出紅椒香氣；上桌溫度與竹籤判斷是口感指標，不是食安檢查。",
    "温かいじゃがいも6人分を皿に並べ、ゆでたこを均等にのせます（生たこ換算で1人約250g）。粗塩8g、甘口パプリカ4g、辛口パプリカ1gを6皿に均等に振り、オリーブオイル60mlすべてを回しかけます（1皿約10ml）。湯を温め始めてから切り分けて盛り付けるまで、調理時間は約90分を見込みます。各段階の時間は目安で、安全性や柔らかさの確認により長くかかる場合があります。パプリカの香りを立てるため温かいうちに提供します。提供温度や串の刺さり具合は食感の目安で、安全確認ではありません。",
    "따뜻한 감자 여섯 몫을 접시에 놓고 익힌 문어를 고르게 나눈다(1인분은 생문어 약 250g에 해당). 굵은소금 8g, 단 파프리카 4g, 매운 파프리카 1g 전량을 여섯 접시에 고르게 뿌리고 올리브유 60ml 전량을 두른다(접시당 약 10ml). 물을 데우기 시작해 썰고 접시에 담기까지 조리 시간은 약 90분으로 잡는다. 각 단계 시간은 추정치이며 안전이나 부드러움 확인에 따라 더 걸릴 수 있다. 파프리카 향을 위해 따뜻하게 낸다. 제공 온도와 꼬치가 들어가는 정도는 식감 기준이지 안전 검사가 아니다.",
    "วางมันฝรั่งอุ่น 6 ส่วนบนจานและแบ่งปลาหมึกที่ปรุงสุกแล้วให้เท่ากัน (แต่ละที่เทียบเท่าปลาหมึกดิบประมาณ 250 กรัม) โรยเกลือเม็ดทั้งหมด 8 กรัม ปาปริก้าหวาน 4 กรัม และปาปริก้าเผ็ด 1 กรัมให้ทั่วทั้ง 6 จาน จากนั้นราดน้ำมันมะกอกทั้งหมด 60 มล. (จานละประมาณ 10 มล.) นับตั้งแต่เริ่มอุ่นน้ำจนหั่นและจัดจาน เผื่อเวลาปรุงประมาณ 90 นาที เวลาของแต่ละขั้นเป็นค่าประมาณ และการตรวจความปลอดภัยหรือความนุ่มอาจทำให้ใช้เวลานานขึ้น เสิร์ฟอุ่นเพื่อให้กลิ่นปาปริก้าหอม อุณหภูมิขณะเสิร์ฟและการจิ้มไม้เป็นเรื่องเนื้อสัมผัส ไม่ใช่การตรวจความปลอดภัย"
  ));

  recipe.storage = ml(
    "Cool leftovers in shallow covered containers and refrigerate within 2 hours at 4°C (40°F) or below; keep raw seafood separate from ready-to-eat foods during preparation. The FDA says seafood intended for use within 2 days of purchase may be refrigerated at 4°C (40°F) or below, but the official cold-storage chart does not give a cooked-octopus window. Use leftovers within 1 day here for quality, not as an official safety cutoff. Reheat only the portion needed to 74°C (165°F), the official all-leftovers endpoint.",
    "剩菜放入有蓋淺盒，於 2 小時內冷藏在 4°C（40°F）以下；備料時生海鮮與即食食物分開。FDA 指引指出，若海鮮預計於購買後 2 天內使用，可冷藏在 4°C（40°F）以下；但官方冷藏表沒有熟章魚保存期限。因此本食譜建議 1 天內吃完是品質考量，不是官方食安期限。只回熱要吃的份量至 74°C（165°F），這是官方所有剩食的回熱標準。",
    "残りはふた付きの浅い容器に入れ、2時間以内に4°C（40°F）以下で冷蔵します。準備中は生の魚介をそのまま食べる食品から分けます。FDAは購入後2日以内に使う魚介は4°C（40°F）以下で冷蔵できるとしていますが、公式の冷蔵表に調理済みたこの保存期間はありません。このレシピの1日以内は品質上の目安で、公式の安全期限ではありません。食べる分だけ残り物の公式基準74°C（165°F）まで温め直します。",
    "남은 음식은 얕은 밀폐 용기에 담아 2시간 안에 4°C (40°F) 이하로 냉장한다. 준비할 때 생해산물은 바로 먹는 음식과 분리한다. FDA는 구매 후 2일 안에 사용할 해산물을 4°C (40°F) 이하로 냉장할 수 있다고 안내하지만 공식 냉장표에는 조리한 문어 보관 기간이 없다. 따라서 이 레시피의 1일 이내 권장은 품질상 기준이지 공식 안전 기한이 아니다. 먹을 만큼만 공식 남은 음식 기준인 74°C (165°F)까지 다시 데운다.",
    "ใส่อาหารเหลือในภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า ระหว่างเตรียมให้แยกอาหารทะเลดิบออกจากอาหารพร้อมกิน FDA ระบุว่าอาหารทะเลที่ตั้งใจจะใช้ภายใน 2 วันหลังซื้อสามารถแช่เย็นที่ 4°C (40°F) หรือต่ำกว่าได้ แต่ตารางแช่เย็นทางการไม่ได้ระบุช่วงเก็บปลาหมึกยักษ์ที่ปรุงสุกแล้ว คำแนะนำให้กินภายใน 1 วันจึงเป็นเรื่องคุณภาพ ไม่ใช่กำหนดความปลอดภัยอย่างเป็นทางการ อุ่นเฉพาะส่วนที่จะกินให้ถึง 74°C (165°F) ซึ่งเป็นเกณฑ์ทางการสำหรับอาหารเหลือทุกชนิด"
  );

  addOfficial(recipe, "FDA: Selecting and Serving Fresh and Frozen Seafood Safely (thawing, separation, and cooking)", seafood);
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures (seafood and leftovers)", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety (time and temperature control)", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts (refrigerator categories)", storage);
}

export function refineFiftyFourthMethods(recipes) {
  const revisions = new Map([
    ["risotto-alla-milanese", reviseRisottoAllaMilanese],
    ["lasagne-bolognese", reviseLasagneBolognese],
    ["small-sausage-big-sausage", reviseSmallSausageBigSausage],
    ["pulpo-a-la-gallega", revisePulpoAGallega]
  ]);

  for (const [id, revise] of revisions) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error(`${id}: missing published recipe for fifty-fourth method review`);
    recipes[index] = cloneForPublication(recipes[index]);
    revise(recipes[index]);
    for (const locale of ["en", "zh-hant", "ja", "ko", "th"]) {
      if (!recipes[index].storage?.[locale]) throw new Error(`${id}: missing ${locale} storage card`);
      if (!recipes[index].ingredients.every((row) => row.item?.[locale])) throw new Error(`${id}: missing ${locale} ingredient text`);
      if (!recipes[index].instructions.every((entry) => entry.title?.[locale] && entry.body?.[locale])) {
        throw new Error(`${id}: incomplete ${locale} method after refinement`);
      }
    }
  }
}
