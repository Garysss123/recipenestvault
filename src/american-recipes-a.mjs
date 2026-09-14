import { ml, ingredient as i, step as s, makeAmericanRecipe as r, cookedStorage } from './american-recipe-helpers.mjs';

export const americanRecipesA = [
  r({
    id: 'cheeseburger', profile: 'griddle',
    region: ml('United States diner and griddle tradition', '美國餐館與鐵板漢堡傳統', 'アメリカのダイナーとグリドル文化', '미국 다이너·철판 버거 전통', 'วัฒนธรรมเบอร์เกอร์ไดเนอร์และแผ่นย่างอเมริกัน'),
    name: ml('Classic Cheeseburger', '經典美式起司漢堡', 'クラシック・チーズバーガー', '클래식 치즈버거', 'ชีสเบอร์เกอร์คลาสสิก'),
    prepMinutes: 20, cookMinutes: 15, totalMinutes: 35, servings: 4,
    description: ml(
      'A griddle-style American cheeseburger built around deeply browned beef, a soft toasted bun, melting cheese and cold crisp toppings. The method keeps the beef loose until it hits the hot pan so the crust develops without making the centre dense.',
      '這款美式鐵板起司漢堡以焦香牛肉、柔軟烤麵包、融化起司與冰涼爽脆配料組成。牛肉下熱鍋前保持鬆散，能形成焦殼又不會把中心壓得緊實。',
      '香ばしく焼いた牛肉、軽く焼いた柔らかなバンズ、溶けるチーズ、冷たい野菜を重ねるアメリカン・チーズバーガー。肉は焼く直前まで練らず、表面を香ばしく中は硬くしません。',
      '진하게 구운 소고기, 부드럽게 구운 번, 녹는 치즈와 차가운 아삭한 토핑을 쌓는 미국식 철판 치즈버거입니다. 고기는 팬에 닿기 전까지 느슨하게 두어 속이 단단해지지 않게 크러스트를 만듭니다.',
      'ชีสเบอร์เกอร์อเมริกันแบบแผ่นย่าง เนื้อวัวผิวเกรียมเข้ม ขนมปังนุ่มปิ้ง ชีสละลาย และผักเย็นกรอบ เก็บเนื้อให้ร่วนจนลงกระทะร้อนเพื่อให้เกิดผิวเกรียมโดยกลางไม่แน่น'
    ),
    ingredients: [
      i('720 g', 'ground beef, about 20% fat', '牛絞肉，脂肪約 20%', '牛挽肉、脂肪約20%', '소고기 다짐육, 지방 약 20%', 'เนื้อวัวบด ไขมันประมาณ 20%'),
      i('8 g', 'fine salt', '細鹽', '細塩', '고운 소금', 'เกลือละเอียด'),
      i('2 g', 'black pepper', '黑胡椒', '黒こしょう', '후추', 'พริกไทยดำ'),
      i('80 g', 'American cheese, 4 slices', '美式起司，4 片', 'アメリカンチーズ、4枚', '아메리칸 치즈 4장', 'ชีสอเมริกัน 4 แผ่น'),
      i('260 g', 'soft burger buns, 4', '柔軟漢堡麵包，4 個', '柔らかいバーガーバンズ、4個', '부드러운 버거 번 4개', 'ขนมปังเบอร์เกอร์นุ่ม 4 ชิ้น'),
      i('30 g', 'unsalted butter, softened', '無鹽奶油，軟化', '無塩バター、柔らかくする', '무염 버터, 부드럽게', 'เนยจืด นิ่ม'),
      i('80 g', 'yellow onion, very thinly sliced', '黃洋蔥，極薄切', '黄玉ねぎ、極薄切り', '노란 양파, 아주 얇게', 'หอมใหญ่สีเหลือง ซอยบางมาก'),
      i('120 g', 'ripe tomato, sliced', '熟番茄，切片', '完熟トマト、薄切り', '잘 익은 토마토, 슬라이스', 'มะเขือเทศสุก หั่นแว่น'),
      i('80 g', 'dill pickle slices', '蒔蘿酸黃瓜片', 'ディルピクルス、薄切り', '딜 피클 슬라이스', 'แตงกวาดองดิลล์ หั่นแว่น'),
      i('60 g', 'crisp lettuce leaves', '爽脆生菜葉', '歯切れのよいレタス', '아삭한 상추 잎', 'ใบผักกาดกรอบ'),
      i('40 g', 'ketchup', '番茄醬', 'ケチャップ', '케첩', 'ซอสมะเขือเทศ'),
      i('30 g', 'yellow mustard', '黃芥末', 'イエローマスタード', '옐로 머스터드', 'มัสตาร์ดเหลือง')
    ],
    instructions: [
      s(ml('Prepare the cold toppings', '準備冰涼配料', '冷たい具を準備する', '차가운 토핑 준비하기', 'เตรียมเครื่องเย็น'), ml('Slice the onion and tomato, separate the lettuce and pickles, and keep all toppings chilled while the griddle heats.', '洋蔥與番茄切好，生菜與酸黃瓜分開，鐵板加熱期間所有配料保持冰涼。', '玉ねぎとトマトを切り、レタスとピクルスを分け、鉄板を温める間は冷やしておく。', '양파와 토마토를 썰고 상추와 피클을 나눠 철판을 달구는 동안 차갑게 둡니다.', 'หั่นหอมและมะเขือเทศ แยกผักกาดกับแตงดอง และเก็บเครื่องทั้งหมดให้เย็นระหว่างอุ่นแผ่นย่าง'), 'Neatly arranged sliced tomato, paper-thin onion, pickle rounds and crisp lettuce on a chilled tray.'),
      s(ml('Portion the beef loosely', '鬆散分割牛肉', '牛肉を軽く分ける', '소고기 느슨하게 나누기', 'แบ่งเนื้อแบบหลวม'), ml('Divide the beef into 4 loose portions without kneading or compressing. Season the outside evenly with the salt and pepper just before cooking.', '牛肉分成 4 份，不揉、不壓緊；下鍋前才在外層均勻撒鹽與胡椒。', '牛肉を練らず4等分し、焼く直前に表面へ塩とこしょうを均一に振る。', '소고기를 치대거나 누르지 않고 4등분한 뒤 굽기 직전에 겉면에 소금과 후추를 고르게 뿌립니다.', 'แบ่งเนื้อเป็น 4 ก้อนแบบไม่กดหรือนวด ปรุงผิวนอกด้วยเกลือและพริกไทยให้ทั่วก่อนปรุงทันที'), 'Four loose craggy portions of seasoned ground beef on a tray, visibly not compressed into dense patties.'),
      s(ml('Toast the buns', '烤香麵包', 'バンズを焼く', '번 굽기', 'ปิ้งขนมปัง'), ml('Heat a heavy griddle over medium-high. Butter the cut faces of the buns and toast cut-side down for 1–2 minutes until evenly golden, then set aside.', '厚鐵板以中大火加熱，麵包切面抹奶油，切面朝下烤 1–2 分鐘至均勻金黃後取出。', '厚手の鉄板を中強火で熱し、バンズの切り口にバターを塗って1〜2分、均一な金色まで焼いて取り出す。', '두꺼운 철판을 중강불로 달구고 번 절단면에 버터를 발라 아래로 놓아 1–2분 고르게 금빛이 될 때까지 굽고 꺼냅니다.', 'อุ่นแผ่นย่างหนักไฟกลางแรง ทาเนยด้านตัดของขนมปังแล้วคว่ำปิ้ง 1–2 นาทีจนทองสม่ำเสมอ จากนั้นพักไว้'), 'Four split burger buns toasted cut-side down on a hot griddle, the cut surfaces evenly golden.'),
      s(ml('Sear the first side', '煎出第一面焦殼', '片面を強く焼く', '첫 면 크러스트 내기', 'ย่างด้านแรกให้เกรียม'), ml('Increase the griddle to high heat. Set the beef portions down with space between them and press each once into a patty about 15 mm thick. Leave untouched for 2–3 minutes until a dark crust forms.', '鐵板調到大火，牛肉份量彼此留空放下，各壓一次成約 15 毫米厚肉排；2–3 分鐘不要移動，直到形成深色焦殼。', '鉄板を強火にし、肉を離して置き、一度だけ押して約15mm厚にする。2〜3分触らず、濃い焼き面を作る。', '철판을 센 불로 올리고 고기를 간격 두어 놓은 뒤 한 번만 눌러 약 15mm 두께로 만듭니다. 2–3분 건드리지 않아 진한 크러스트를 만듭니다.', 'เร่งแผ่นย่างเป็นไฟแรง วางเนื้อเว้นระยะ กดแต่ละก้อนครั้งเดียวให้หนาประมาณ 15 มม. ทิ้งไว้ 2–3 นาทีจนเกิดผิวเกรียมเข้ม'), 'Four beef patties on a very hot flat griddle with deeply browned lacy crusts forming on the first side.'),
      s(ml('Flip and melt the cheese', '翻面並融化起司', '返してチーズを溶かす', '뒤집고 치즈 녹이기', 'พลิกและละลายชีส'), ml('Scrape firmly under each patty, flip once, and immediately add a cheese slice. Cook another 2–3 minutes until the cheese slumps over the beef and the centre is safely cooked.', '鏟子完整鏟進焦殼下方，翻面一次並立刻各放 1 片起司；再煎 2–3 分鐘，至起司覆住牛肉且中心安全熟透。', '焼き面を崩さないようにへらを差し込み、一度返してすぐチーズをのせる。さらに2〜3分、チーズが溶けて中心まで安全に火を通す。', '크러스트 아래로 주걱을 단단히 넣어 한 번 뒤집고 즉시 치즈를 올립니다. 2–3분 더 익혀 치즈가 흘러내리고 중심까지 안전하게 익힙니다.', 'สอดตะหลิวใต้ผิวเกรียม พลิกครั้งเดียวและวางชีสทันที ปรุงอีก 2–3 นาทีจนชีสคลุมเนื้อและตรงกลางสุกปลอดภัย'), 'Four flipped beef patties with glossy melting cheese draped over their dark browned crusts.'),
      s(ml('Sauce the toasted buns', '麵包抹醬', 'バンズにソースを塗る', '번에 소스 바르기', 'ทาซอสขนมปัง'), ml('Spread ketchup and mustard across the toasted bun interiors while the patties rest briefly off the heat.', '肉排離火短暫靜置時，把番茄醬與黃芥末均勻抹在烤好的麵包內側。', 'パティを短く休ませる間に、焼いたバンズの内側へケチャップとマスタードを塗る。', '패티를 불에서 잠깐 휴지시키는 동안 구운 번 안쪽에 케첩과 머스터드를 바릅니다.', 'ระหว่างพักเนื้อสั้น ๆ นอกไฟ ทาซอสมะเขือเทศและมัสตาร์ดด้านในขนมปังปิ้ง'), 'Four toasted burger buns opened on a board with thin even layers of ketchup and yellow mustard.'),
      s(ml('Assemble and serve immediately', '組裝後立刻上桌', '組み立ててすぐ供する', '조립해 바로 내기', 'ประกอบและเสิร์ฟทันที'), ml('Put lettuce on each bottom bun, add the hot cheeseburger patty, then tomato, pickles and onion. Close with the top bun and serve while the cheese is still molten and the crust is hot.', '每個底麵包先放生菜，再放熱起司肉排，接著番茄、酸黃瓜與洋蔥；蓋上頂麵包，趁起司仍融化、焦殼仍熱時立刻上桌。', '下のバンズにレタス、熱いチーズパティ、トマト、ピクルス、玉ねぎを重ね、上のバンズをかぶせてすぐ供する。', '아래 번에 상추, 뜨거운 치즈 패티, 토마토, 피클, 양파를 올리고 위 번을 덮어 치즈와 크러스트가 뜨거울 때 바로 냅니다.', 'วางผักกาดบนขนมปังล่าง ตามด้วยเนื้อชีสร้อน มะเขือเทศ แตงดอง และหอม ปิดขนมปังบนแล้วเสิร์ฟขณะชีสยังละลายและผิวเนื้อยังร้อน'), 'A finished classic cheeseburger with a deeply browned beef patty, melted cheese, lettuce, tomato, pickles and thin onion in a soft toasted bun.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('The cheeseburger grew from the American hamburger-counter tradition, with several early twentieth-century restaurants claiming versions of the idea. The combination of griddled beef, processed melting cheese and a soft bun became a defining diner and fast-food format.', '起司漢堡源自美國漢堡櫃檯文化，20 世紀早期有多家餐館都聲稱發展出類似做法。鐵板牛肉、易融化加工起司與柔軟麵包後來成為美式 diner 與速食的代表組合。', 'チーズバーガーはアメリカのハンバーガー・カウンター文化から発展し、20世紀初頭には複数の店が起源を主張しました。鉄板焼きの牛肉、よく溶けるチーズ、柔らかなバンズがダイナー文化の定番になりました。', '치즈버거는 미국 햄버거 카운터 문화에서 발전했고 20세기 초 여러 식당이 기원을 주장합니다. 철판 소고기, 잘 녹는 가공 치즈와 부드러운 번의 조합은 다이너와 패스트푸드의 상징이 됐습니다.', 'ชีสเบอร์เกอร์เติบโตจากวัฒนธรรมเคาน์เตอร์แฮมเบอร์เกอร์อเมริกัน โดยหลายร้านต้นศตวรรษที่ 20 อ้างแนวคิดนี้ เนื้อย่างแผ่น ชีสละลายง่าย และขนมปังนุ่มกลายเป็นรูปแบบเด่นของไดเนอร์'),
    imageAlt: ml('American cheeseburger with browned beef, melted cheese and crisp toppings', '美式起司漢堡，焦香牛肉、融化起司與爽脆配料', '焼き色の牛肉と溶けたチーズ、野菜のアメリカン・チーズバーガー', '갈색 소고기와 녹은 치즈, 아삭한 토핑의 미국식 치즈버거', 'ชีสเบอร์เกอร์อเมริกัน เนื้อเกรียม ชีสละลาย และเครื่องกรอบ'),
    visualSpec: 'A classic American cheeseburger in a soft toasted bun with one deeply browned beef patty, clearly melted yellow cheese, lettuce, tomato, pickle and thin onion; casual diner presentation, no oversized novelty stack.'
  }),

  r({
    id: 'buffalo-wings', profile: 'fry',
    region: ml('Buffalo, New York', '紐約州水牛城', 'ニューヨーク州バッファロー', '뉴욕주 버펄로', 'บัฟฟาโล รัฐนิวยอร์ก'),
    name: ml('Buffalo Wings', '水牛城辣雞翅', 'バッファローウィング', '버펄로 윙', 'บัฟฟาโลวิงส์'),
    prepMinutes: 25, cookMinutes: 35, totalMinutes: 60, servings: 4,
    description: ml(
      'Crisp fried chicken wings tossed in a glossy butter-and-cayenne hot sauce, served hot with celery and a cool blue-cheese dip. The contrast depends on dry wings, stable frying oil and tossing only after the crust is fully crisp.',
      '酥脆炸雞翅拌上亮澤奶油卡宴辣醬，熱騰騰搭配西洋芹與冰涼藍紋起司沾醬。關鍵在雞翅夠乾、油溫穩定，以及外殼完全酥脆後才拌醬。',
      'カリッと揚げた手羽をバターとカイエン系ホットソースで和え、セロリと冷たいブルーチーズディップを添えるバッファロー名物です。',
      '바삭하게 튀긴 닭날개를 버터와 카옌 핫소스에 버무리고 셀러리와 차가운 블루치즈 딥을 곁들이는 버펄로식 윙입니다.',
      'ปีกไก่ทอดกรอบคลุกซอสเนยกับพริกคาเยนน์เงาวาว เสิร์ฟร้อนกับขึ้นฉ่ายและดิปบลูชีสเย็น ความกรอบมาจากปีกแห้ง น้ำมันคงอุณหภูมิ และคลุกซอสหลังทอดกรอบแล้ว'
    ),
    ingredients: [
      i('1500 g', 'chicken wings, split into flats and drumettes', '雞翅，分成二節翅與小腿翅', '手羽、フラットとドラムに分ける', '닭날개, 플랫과 드러멧으로 분리', 'ปีกไก่ แยกกลางปีกและดรัมเมต'),
      i('12 g', 'fine salt', '細鹽', '細塩', '고운 소금', 'เกลือละเอียด'),
      i('3 g', 'black pepper', '黑胡椒', '黒こしょう', '후추', 'พริกไทยดำ'),
      i('1500 ml', 'neutral frying oil', '中性炸油', '中性揚げ油', '중성 튀김유', 'น้ำมันทอดรสกลาง'),
      i('120 ml', 'cayenne-pepper hot sauce', '卡宴辣椒辣醬', 'カイエン系ホットソース', '카옌 핫소스', 'ซอสพริกคาเยนน์'),
      i('90 g', 'unsalted butter', '無鹽奶油', '無塩バター', '무염 버터', 'เนยจืด'),
      i('15 ml', 'white vinegar', '白醋', '白ワインビネガー', '화이트 식초', 'น้ำส้มสายชูขาว'),
      i('2 g', 'garlic powder', '蒜粉', 'ガーリックパウダー', '마늘가루', 'ผงกระเทียม'),
      i('120 g', 'sour cream', '酸奶油', 'サワークリーム', '사워크림', 'ซาวร์ครีม'),
      i('80 g', 'mayonnaise', '美乃滋', 'マヨネーズ', '마요네즈', 'มายองเนส'),
      i('100 g', 'blue cheese, crumbled', '藍紋起司，捏碎', 'ブルーチーズ、粗く崩す', '블루치즈, 부수기', 'บลูชีส บิ'),
      i('15 ml', 'lemon juice', '檸檬汁', 'レモン汁', '레몬즙', 'น้ำเลมอน'),
      i('200 g', 'celery sticks', '西洋芹條', 'セロリスティック', '셀러리 스틱', 'ก้านขึ้นฉ่าย')
    ],
    instructions: [
      s(ml('Dry and season the wings', '擦乾並調味雞翅', '手羽を乾かして味付けする', '윙 말리고 간하기', 'ซับและปรุงปีก'), ml('Pat the wing pieces thoroughly dry, then season evenly with salt and black pepper. Leave uncovered while the oil heats.', '雞翅徹底擦乾後均勻撒鹽與黑胡椒，油加熱期間保持不覆蓋。', '手羽の水気をしっかり拭き、塩とこしょうを均一に振り、油を熱する間は覆わない。', '윙을 완전히 닦아 소금과 후추로 고르게 간하고 기름이 데워지는 동안 덮지 않습니다.', 'ซับปีกให้แห้งสนิท ปรุงเกลือและพริกไทยทั่ว แล้ววางไม่ปิดระหว่างอุ่นน้ำมัน'), 'Dry seasoned chicken wing flats and drumettes spread in one layer on a rack with matte, moisture-free skin.'),
      s(ml('Mix the blue-cheese dip', '拌藍紋起司沾醬', 'ブルーチーズディップを作る', '블루치즈 딥 만들기', 'ผสมดิปบลูชีส'), ml('Stir the sour cream, mayonnaise, blue cheese and lemon juice together, leaving some small cheese pieces intact. Chill until serving.', '酸奶油、美乃滋、藍紋起司與檸檬汁拌勻，保留一些小起司塊，冷藏至上桌。', 'サワークリーム、マヨネーズ、ブルーチーズ、レモン汁を混ぜ、チーズの小さな塊を残して冷やす。', '사워크림, 마요네즈, 블루치즈, 레몬즙을 섞되 작은 치즈 덩어리를 남기고 차갑게 둡니다.', 'คนซาวร์ครีม มายองเนส บลูชีส และน้ำเลมอนโดยเหลือก้อนชีสเล็ก ๆ แล้วแช่เย็นจนเสิร์ฟ'), 'A chilled bowl of thick off-white blue-cheese dip with visible small blue-veined cheese crumbles.'),
      s(ml('Make the Buffalo sauce', '製作水牛城辣醬', 'バッファローソースを作る', '버펄로 소스 만들기', 'ทำซอสบัฟฟาโล'), ml('Melt the butter over low heat, then whisk in the hot sauce, vinegar and garlic powder until glossy and uniform. Keep warm without boiling.', '奶油以小火融化，加入辣醬、白醋與蒜粉攪至亮澤均勻，保溫但不要煮沸。', '弱火でバターを溶かし、ホットソース、酢、ガーリックパウダーを混ぜて艶を出し、沸かさず温める。', '약불에서 버터를 녹인 뒤 핫소스, 식초, 마늘가루를 섞어 윤기 나게 만들고 끓이지 않고 따뜻하게 둡니다.', 'ละลายเนยไฟอ่อน ตีซอสพริก น้ำส้ม และผงกระเทียมจนเนียนเงา อุ่นไว้โดยไม่ให้เดือด'), 'A small saucepan of smooth glossy orange-red Buffalo butter sauce, uniform with no separated fat.'),
      s(ml('Heat the frying oil', '加熱炸油', '揚げ油を熱する', '튀김 기름 데우기', 'อุ่นน้ำมันทอด'), ml('Heat the oil in a deep heavy pot to 180°C. Set a wire rack over a tray beside the pot for draining.', '深厚鍋中把炸油加熱至 180°C，旁邊準備架在烤盤上的網架瀝油。', '深い厚手鍋の油を180°Cにし、横に網を置いたトレーを準備する。', '깊고 두꺼운 냄비의 기름을 180°C로 데우고 옆에 트레이 위 랙을 준비합니다.', 'อุ่นน้ำมันในหม้อหนักลึกถึง 180°C วางตะแกรงบนถาดข้างหม้อสำหรับพัก'), 'A deep heavy pot of clear frying oil at cooking temperature beside an empty wire draining rack.'),
      s(ml('Fry the wings in batches', '分批炸雞翅', '手羽を分けて揚げる', '윙 나눠 튀기기', 'ทอดปีกเป็นรอบ'), ml('Fry the wings in 3 batches for 9–11 minutes each, letting the oil recover to 180°C between batches. Cook until the skin is deep golden and the thickest pieces reach at least 74°C.', '雞翅分 3 批，每批炸 9–11 分鐘；每批之間讓油溫回到 180°C。炸至外皮深金黃，最厚部位至少達 74°C。', '3回に分け各9〜11分揚げ、毎回油を180°Cへ戻す。皮が濃い金色で、厚い部分が74°C以上になるまで火を通す。', '3번 나눠 각 9–11분 튀기고 배치 사이마다 기름을 180°C로 회복시킵니다. 껍질이 진한 금빛이고 두꺼운 부분이 최소 74°C가 되게 익힙니다.', 'ทอด 3 รอบ รอบละ 9–11 นาที ให้น้ำมันกลับ 180°C ระหว่างรอบ จนหนังทองเข้มและส่วนหนาสุดอย่างน้อย 74°C'), 'Crisp deep-golden chicken wings frying in hot oil with plenty of open space around each piece.'),
      s(ml('Drain until the skin stays crisp', '瀝油至外皮穩定酥脆', '網でしっかり油を切る', '랙에서 바삭하게 기름 빼기', 'พักบนตะแกรงให้หนังกรอบ'), ml('Move each finished batch to the wire rack for 3 minutes. Do not stack or cover the wings.', '每批炸好移到網架瀝 3 分鐘，不要堆疊也不要覆蓋。', '揚がった手羽は網で3分油を切り、重ねたり覆ったりしない。', '튀긴 윙은 랙에서 3분 기름을 빼고 겹치거나 덮지 않습니다.', 'ย้ายปีกที่ทอดเสร็จลงตะแกรง 3 นาที ไม่วางซ้อนและไม่ปิด'), 'Deep-golden fried wings resting in a single layer on a wire rack, their blistered skin visibly crisp.'),
      s(ml('Toss with warm sauce', '拌上溫熱辣醬', '温かいソースで和える', '따뜻한 소스에 버무리기', 'คลุกซอสอุ่น'), ml('Put all hot wings in a large bowl, pour over the warm Buffalo sauce and toss just until every piece is evenly glazed.', '全部熱雞翅放入大碗，淋上溫熱水牛城辣醬，只翻拌到每塊均勻裹亮即可。', '熱い手羽を大きなボウルへ入れ、温かいソースを加えて全体が艶よく覆われるまで短く和える。', '뜨거운 윙을 큰 볼에 넣고 따뜻한 버펄로 소스를 부어 모든 조각이 고르게 코팅될 정도만 버무립니다.', 'ใส่ปีกไก่ร้อนทั้งหมดในชามใหญ่ เทซอสบัฟฟาโลอุ่นแล้วคลุกพอเคลือบเงาทุกชิ้น'), 'A large bowl of crisp fried wings freshly coated in a shiny orange-red Buffalo sauce.'),
      s(ml('Serve with celery and dip', '搭西洋芹與沾醬上桌', 'セロリとディップを添える', '셀러리와 딥 곁들여 내기', 'เสิร์ฟกับขึ้นฉ่ายและดิป'), ml('Pile the sauced wings onto a platter and serve immediately with cold celery sticks and the chilled blue-cheese dip.', '拌醬雞翅堆上餐盤，立刻搭冰涼西洋芹條與冷藏藍紋起司沾醬上桌。', 'ソースをまとった手羽を皿に盛り、冷たいセロリとブルーチーズディップを添えてすぐ供する。', '소스 윙을 플래터에 담고 차가운 셀러리 스틱과 블루치즈 딥을 곁들여 바로 냅니다.', 'จัดปีกคลุกซอสบนจาน เสิร์ฟทันทีพร้อมขึ้นฉ่ายเย็นและดิปบลูชีสแช่เย็น'), 'A platter of glossy orange-red Buffalo wings with crisp celery sticks and a small bowl of chunky blue-cheese dip.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Buffalo wings are closely associated with Buffalo, New York, where the modern hot-sauce-and-butter style became a bar-food signature in the 1960s. Celery and blue-cheese dressing became the classic cooling accompaniments.', 'Buffalo wings 與紐約州水牛城密切相連，現代辣醬加奶油的做法在 1960 年代成為當地酒吧代表小吃；西洋芹與藍紋起司醬則成為經典降辣搭配。', 'バッファローウィングはニューヨーク州バッファローと結びつき、1960年代にホットソースとバターのスタイルがバー料理として定着しました。', '버펄로 윙은 뉴욕주 버펄로와 강하게 연결되며 1960년대 핫소스와 버터 조합이 바 음식의 상징으로 자리 잡았습니다.', 'บัฟฟาโลวิงส์ผูกกับเมืองบัฟฟาโล รัฐนิวยอร์ก รูปแบบซอสเผ็ดผสมเนยกลายเป็นอาหารบาร์เด่นในทศวรรษ 1960 ขึ้นฉ่ายและบลูชีสเป็นเครื่องเคียงคลายเผ็ดแบบคลาสสิก'),
    imageAlt: ml('Buffalo wings glazed with hot sauce beside celery and blue-cheese dip', '水牛城辣雞翅，搭西洋芹與藍紋起司沾醬', 'ホットソースをまとったバッファローウィング、セロリとブルーチーズディップ添え', '핫소스 버펄로 윙과 셀러리, 블루치즈 딥', 'บัฟฟาโลวิงส์เคลือบซอสเผ็ดกับขึ้นฉ่ายและดิปบลูชีส'),
    visualSpec: 'A casual platter of classic Buffalo wings: crisp chicken flats and drumettes evenly coated in glossy orange-red hot sauce, with pale-green celery sticks and a small bowl of chunky blue-cheese dressing.'
  }),

  r({
    id: 'southern-fried-chicken', profile: 'fry',
    region: ml('Southern United States', '美國南方', 'アメリカ南部', '미국 남부', 'ภาคใต้ของสหรัฐอเมริกา'),
    name: ml('Southern Fried Chicken', '美式南方炸雞', 'サザン・フライドチキン', '서던 프라이드 치킨', 'ไก่ทอดอเมริกันใต้'),
    prepMinutes: 500, cookMinutes: 45, totalMinutes: 545, servings: 6,
    description: ml(
      'Buttermilk-brined Southern fried chicken with a craggy seasoned-flour crust and juicy bone-in meat. A long cold soak seasons the chicken, while resting the dredged pieces helps the flour hydrate into the irregular flakes that fry especially crisp.',
      '以酪乳長時間冷藏醃漬的美式南方炸雞，外層是凹凸酥脆的香料麵衣，帶骨雞肉保持多汁。裹粉後靜置可讓麵粉吸濕形成不規則薄片，炸後特別酥。',
      'バターミルクに漬けた骨付き鶏へ味付き小麦粉をまとわせ、凹凸のある衣をカリッと揚げる南部風フライドチキンです。',
      '버터밀크에 오래 재운 뼈 있는 닭에 양념 밀가루를 입혀 거칠고 바삭한 껍질과 촉촉한 속을 만드는 미국 남부식 프라이드치킨입니다.',
      'ไก่ทอดแบบใต้หมักบัตเตอร์มิลค์ เนื้อติดกระดูกฉ่ำและแป้งปรุงรสผิวขรุขระกรอบ การพักไก่ชุบแป้งช่วยให้แป้งดูดความชื้นและเกิดเกล็ดกรอบ'
    ),
    ingredients: [
      i('1800 g', 'bone-in chicken pieces', '帶骨雞塊', '骨付き鶏肉', '뼈 있는 닭 조각', 'ชิ้นไก่ติดกระดูก'),
      i('1000 ml', 'buttermilk', '酪乳', 'バターミルク', '버터밀크', 'บัตเตอร์มิลค์'),
      i('24 g', 'fine salt, divided', '細鹽，分用', '細塩、分けて使う', '고운 소금, 나눠 사용', 'เกลือละเอียด แบ่งใช้'),
      i('10 ml', 'hot sauce', '辣醬', 'ホットソース', '핫소스', 'ซอสพริก'),
      i('400 g', 'plain flour', '中筋麵粉', '薄力粉', '중력분', 'แป้งสาลีอเนกประสงค์'),
      i('30 g', 'cornstarch', '玉米澱粉', 'コーンスターチ', '옥수수전분', 'แป้งข้าวโพด'),
      i('8 g', 'sweet paprika', '甜紅椒粉', 'パプリカパウダー', '파프리카 가루', 'ปาปริกาหวาน'),
      i('6 g', 'garlic powder', '蒜粉', 'ガーリックパウダー', '마늘가루', 'ผงกระเทียม'),
      i('6 g', 'onion powder', '洋蔥粉', 'オニオンパウダー', '양파가루', 'ผงหอม'),
      i('4 g', 'black pepper', '黑胡椒', '黒こしょう', '후추', 'พริกไทยดำ'),
      i('3 g', 'cayenne pepper', '卡宴辣椒粉', 'カイエンペッパー', '카옌페퍼', 'พริกคาเยนน์'),
      i('2000 ml', 'peanut or neutral frying oil', '花生油或中性炸油', 'ピーナッツ油または中性揚げ油', '땅콩유 또는 중성 튀김유', 'น้ำมันถั่วลิสงหรือน้ำมันทอดรสกลาง')
    ],
    instructions: [
      s(ml('Season the chicken', '先調味雞塊', '鶏に下味を付ける', '닭 밑간하기', 'ปรุงไก่'), ml('Pat the chicken dry and season it evenly with half of the salt, working around joints and both sides of each piece.', '雞塊擦乾，用一半的鹽均勻調味，關節周圍與兩面都要撒到。', '鶏の水気を拭き、塩の半量を両面と関節まわりへ均一に振る。', '닭을 닦고 소금 절반을 관절 주변과 양면에 고르게 뿌립니다.', 'ซับไก่แห้งแล้วใช้เกลือครึ่งหนึ่งปรุงให้ทั่วทั้งสองด้านและรอบข้อต่อ'), 'Raw bone-in chicken pieces arranged on a tray with a light even salt seasoning and dry surfaces.'),
      s(ml('Brine in buttermilk', '酪乳冷藏醃漬', 'バターミルクに漬ける', '버터밀크에 재우기', 'หมักบัตเตอร์มิลค์'), ml('Mix the buttermilk with the hot sauce, add the chicken and refrigerate for 8 hours, turning the pieces once halfway through.', '酪乳與辣醬混合後放入雞塊，冷藏醃 8 小時，中途翻面一次。', 'バターミルクとホットソースを混ぜて鶏を入れ、冷蔵で8時間、途中一度返す。', '버터밀크와 핫소스를 섞어 닭을 넣고 8시간 냉장하며 중간에 한 번 뒤집습니다.', 'ผสมบัตเตอร์มิลค์กับซอสพริก ใส่ไก่ แช่เย็น 8 ชั่วโมง พลิกหนึ่งครั้งกลางทาง'), 'Bone-in chicken pieces submerged in a pale buttermilk marinade in a covered nonreactive bowl.'),
      s(ml('Build the seasoned flour', '調製香料麵粉', '味付き粉を作る', '양념 밀가루 만들기', 'ผสมแป้งปรุงรส'), ml('Whisk the flour, cornstarch, paprika, garlic powder, onion powder, black pepper, cayenne and remaining salt until the seasoning is uniform.', '麵粉、玉米澱粉、甜紅椒粉、蒜粉、洋蔥粉、黑胡椒、卡宴辣椒與剩餘鹽攪勻至香料均勻。', '小麦粉、コーンスターチ、パプリカ、ガーリック、オニオン、黒こしょう、カイエン、残りの塩を均一に混ぜる。', '밀가루, 옥수수전분, 파프리카, 마늘가루, 양파가루, 후추, 카옌, 남은 소금을 고르게 섞습니다.', 'ตีแป้ง แป้งข้าวโพด ปาปริกา ผงกระเทียม ผงหอม พริกไทย คาเยนน์ และเกลือที่เหลือให้ทั่ว'), 'A wide shallow tray of evenly blended pale seasoned flour with fine red and black spice speckles.'),
      s(ml('Drain the marinated chicken', '瀝掉多餘醃液', '漬け汁を切る', '닭 양념물 빼기', 'สะเด็ดน้ำหมัก'), ml('Lift the chicken from the buttermilk and let excess marinade drip away for 2 minutes; keep a thin wet coating on the meat.', '雞塊從酪乳取出，瀝 2 分鐘去除多餘醃液，但表面保留薄薄濕潤層。', '鶏を取り出して2分余分な液を落とし、表面には薄い湿り気を残す。', '닭을 꺼내 2분 동안 과한 양념물을 빼되 표면에는 얇은 수분층을 남깁니다.', 'ยกไก่ออกจากบัตเตอร์มิลค์ ปล่อยน้ำส่วนเกินหยด 2 นาที โดยให้ผิวยังชื้นบาง ๆ'), 'Buttermilk-marinated chicken draining on a rack, still lightly coated but with no heavy liquid dripping.'),
      s(ml('Dredge firmly in seasoned flour', '充分裹上香料麵粉', '粉をしっかりまぶす', '양념 밀가루 입히기', 'คลุกแป้งให้แน่น'), ml('Press each chicken piece into the seasoned flour, turning and squeezing flour onto every recess so a rough, irregular coating forms. Shake off only loose powder.', '每塊雞肉壓進香料麵粉中，翻面並把粉壓入凹處，形成粗糙不規則外衣；只抖掉鬆散浮粉。', '鶏を粉へ押し付け、くぼみにも粉を付けて凹凸の衣を作り、余分な粉だけ落とす。', '닭을 양념 밀가루에 눌러 모든 틈에 밀가루를 붙여 거친 코팅을 만들고 느슨한 가루만 털어냅니다.', 'กดไก่ลงแป้งปรุงรส พลิกและกดแป้งเข้าทุกร่องให้ผิวขรุขระ สะบัดเฉพาะแป้งหลวมออก'), 'Bone-in chicken pieces heavily dredged in craggy seasoned flour with visible irregular flakes clinging to the surface.'),
      s(ml('Rest the coating', '靜置麵衣', '衣を休ませる', '코팅 휴지시키기', 'พักแป้งเคลือบ'), ml('Set the dredged chicken on a rack for 15 minutes until the flour darkens slightly where it absorbs moisture and clings securely.', '裹粉雞塊放網架靜置 15 分鐘，直到麵粉吸濕處略變深並牢固黏附。', '粉を付けた鶏を網で15分休ませ、粉が水分を吸って少し濃くなり密着するまで待つ。', '밀가루 입힌 닭을 랙에서 15분 두어 수분을 흡수한 부분이 약간 어두워지고 단단히 붙게 합니다.', 'พักไก่ชุบแป้งบนตะแกรง 15 นาทีจนแป้งดูเข้มขึ้นเล็กน้อยจากความชื้นและเกาะแน่น'), 'Craggy flour-coated chicken resting on a wire rack, with dampened flour patches beginning to bind into flakes.'),
      s(ml('Heat the frying oil', '加熱炸油', '揚げ油を熱する', '튀김 기름 데우기', 'อุ่นน้ำมันทอด'), ml('Heat the oil in a large heavy pot to 175°C. Keep the pot no more than half full and set a clean draining rack nearby.', '大厚鍋中把油加熱至 175°C，油量不超過鍋深一半，旁邊準備乾淨瀝油架。', '大きな厚手鍋の油を175°Cにし、油は鍋の半分以下にする。横に網を準備する。', '크고 두꺼운 냄비의 기름을 175°C로 데우고 기름은 냄비 절반 이하로 유지하며 옆에 랙을 준비합니다.', 'อุ่นน้ำมันในหม้อหนักใหญ่ถึง 175°C เติมไม่เกินครึ่งหม้อ และเตรียมตะแกรงสะอาดข้าง ๆ'), 'A large deep heavy pot of clear frying oil at temperature beside a clean wire draining rack.'),
      s(ml('Fry the dark-meat pieces', '先炸深色肉部位', 'もも肉から揚げる', '다리살 먼저 튀기기', 'ทอดชิ้นเนื้อเข้มก่อน'), ml('Lower thighs and drumsticks into the oil without crowding. Fry for 13–16 minutes, turning as needed, while keeping the oil near 165–175°C; cook the thickest centre to at least 74°C.', '雞腿與腿排不擁擠地下鍋，炸 13–16 分鐘並視需要翻面，油溫維持約 165–175°C；最厚中心至少達 74°C。', 'ももとドラムを詰めずに入れ、油を165〜175°Cに保ちながら13〜16分返して揚げ、中心74°C以上にする。', '허벅지와 드럼스틱을 붐비지 않게 넣고 기름을 165–175°C로 유지하며 13–16분 뒤집어 튀겨 가장 두꺼운 중심이 최소 74°C가 되게 합니다.', 'ใส่น่องและสะโพกไม่ให้แน่น ทอด 13–16 นาที พลิกตามต้องการ รักษาน้ำมันราว 165–175°C และกลางส่วนหนาสุดอย่างน้อย 74°C'), 'Dark-meat chicken pieces frying in deep oil with a rough golden crust, spaced apart in a heavy pot.'),
      s(ml('Fry the breast and wing pieces', '再炸雞胸與翅', '胸と手羽を揚げる', '가슴살과 날개 튀기기', 'ทอดอกและปีก'), ml('Let the oil return to 175°C, then fry the breast and wing pieces for 9–12 minutes, adjusting heat to stay near 165–175°C, until deep golden and at least 74°C at the thickest point.', '油溫回到 175°C 後放入雞胸與雞翅，炸 9–12 分鐘並調火維持約 165–175°C，至深金黃且最厚處至少 74°C。', '油を175°Cへ戻し、胸と手羽を9〜12分、165〜175°Cを保って揚げ、濃い金色で厚い部分を74°C以上にする。', '기름을 175°C로 회복시킨 뒤 가슴살과 날개를 9–12분, 165–175°C를 유지하며 튀겨 진한 금빛이고 두꺼운 곳이 최소 74°C가 되게 합니다.', 'ให้น้ำมันกลับ 175°C แล้วทอดอกและปีก 9–12 นาที ปรับไฟให้อยู่ราว 165–175°C จนทองเข้มและจุดหนาสุดอย่างน้อย 74°C'), 'Breast and wing pieces frying in clean hot oil, their craggy coating turning evenly deep golden.'),
      s(ml('Drain, rest and serve', '瀝油靜置後上桌', '油を切って休ませる', '기름 빼고 휴지 후 내기', 'สะเด็ด พัก และเสิร์ฟ'), ml('Drain all fried chicken on a wire rack for 10 minutes before serving. Keep the pieces uncovered so the crust remains crisp while the juices settle.', '所有炸雞放網架瀝油並靜置 10 分鐘後上桌；全程不要覆蓋，讓外殼保持酥脆、肉汁重新穩定。', '揚げた鶏は網で10分休ませ、覆わずに衣をカリッと保ちながら肉汁を落ち着かせる。', '튀긴 닭을 랙에서 10분 휴지시킨 뒤 내고 덮지 않아 껍질을 바삭하게 유지하며 육즙을 안정시킵니다.', 'พักไก่ทอดทั้งหมดบนตะแกรง 10 นาทีก่อนเสิร์ฟ ไม่ปิด เพื่อให้เปลือกกรอบและน้ำในเนื้อกระจายตัว'), 'A platter of deeply golden Southern fried chicken pieces with a rugged flaky crust, resting uncovered on a wire rack.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Fried chicken traditions in the American South reflect multiple culinary lineages, including African American cooks whose seasoning and frying expertise helped shape the dish into a regional and national icon.', '美國南方炸雞融合多條飲食傳統，其中非裔美國廚師對調味與油炸技法的發展尤其重要，使這道菜成為南方乃至全美代表料理。', 'アメリカ南部のフライドチキンは複数の食文化が重なって発展し、とりわけアフリカ系アメリカ人の味付けと揚げ技術が地域を代表する料理へ形作る上で大きな役割を果たしました。', '미국 남부 프라이드치킨은 여러 음식 전통이 합쳐져 발전했으며 특히 아프리카계 미국인 요리사들의 양념과 튀김 기술이 지역과 전국의 상징으로 만드는 데 큰 역할을 했습니다.', 'ไก่ทอดภาคใต้ของสหรัฐเกิดจากหลายสายอาหาร โดยฝีมือการปรุงรสและทอดของชาวแอฟริกันอเมริกันมีบทบาทสำคัญต่อการทำให้อาหารนี้เป็นสัญลักษณ์ระดับภูมิภาคและประเทศ'),
    imageAlt: ml('Southern fried chicken with a deeply golden craggy crust', '深金黃凹凸酥殼的美式南方炸雞', '濃い黄金色で凹凸の衣のサザン・フライドチキン', '진한 금빛 거친 크러스트의 서던 프라이드치킨', 'ไก่ทอดใต้ผิวขรุขระสีทองเข้ม'),
    visualSpec: 'A generous platter of bone-in Southern fried chicken pieces—drumsticks, thighs, breast and wings—with an irregular craggy deep-golden crust, dry and crisp rather than sauce-coated.'
  }),

  r({
    id: 'memphis-style-ribs', profile: 'bake',
    region: ml('Memphis, Tennessee', '田納西州孟菲斯', 'テネシー州メンフィス', '테네시주 멤피스', 'เมมฟิส รัฐเทนเนสซี'),
    name: ml('Memphis-Style Dry-Rub Ribs', '孟菲斯乾擦香料烤肋排', 'メンフィス風ドライラブ・リブ', '멤피스식 드라이럽 립', 'ซี่โครงแห้งแบบเมมฟิส'),
    prepMinutes: 90, cookMinutes: 240, totalMinutes: 330, servings: 6,
    description: ml(
      'Memphis-style pork ribs emphasize smoke, pork and a dry spice crust rather than a thick sticky sauce. The racks cook low and slow over indirect heat, receive a light vinegar mop for moisture, then finish with a fresh dusting of dry rub.',
      '孟菲斯風豬肋排強調煙燻、豬肉與乾香料外殼，不靠厚重黏甜醬汁。肋排以間接低溫慢烤，中途薄刷醋汁保濕，最後再補一層新鮮乾擦香料。',
      'メンフィス風ポークリブは濃いソースより、燻香、豚肉、ドライスパイスの皮膜を重視します。間接火でゆっくり焼き、酢のモップを薄く塗り、最後にドライラブを振ります。',
      '멤피스식 돼지갈비는 끈적한 소스보다 연기 향, 돼지고기와 드라이 스파이스 크러스트를 강조합니다. 간접 저온으로 천천히 익히고 식초 몹을 얇게 바른 뒤 마지막에 드라이럽을 다시 뿌립니다.',
      'ซี่โครงหมูแบบเมมฟิสเน้นกลิ่นควัน เนื้อหมู และเปลือกเครื่องเทศแห้งมากกว่าซอสข้นเหนียว ย่างไฟอ้อมต่ำช้า ทาน้ำส้มบาง ๆ และจบด้วยดรายรับสด'
    ),
    ingredients: [
      i('2700 g', 'pork spare ribs, 2 racks', '豬肋排，2 扇', '豚スペアリブ、2ラック', '돼지 스페어립 2랙', 'ซี่โครงหมู 2 แผง'),
      i('35 g', 'light brown sugar', '淺色紅糖', 'ライトブラウンシュガー', '황설탕', 'น้ำตาลทรายแดงอ่อน'),
      i('24 g', 'sweet paprika', '甜紅椒粉', 'パプリカパウダー', '파프리카 가루', 'ปาปริกาหวาน'),
      i('18 g', 'fine salt', '細鹽', '細塩', '고운 소금', 'เกลือละเอียด'),
      i('8 g', 'black pepper', '黑胡椒', '黒こしょう', '후추', 'พริกไทยดำ'),
      i('6 g', 'garlic powder', '蒜粉', 'ガーリックパウダー', '마늘가루', 'ผงกระเทียม'),
      i('6 g', 'onion powder', '洋蔥粉', 'オニオンパウダー', '양파가루', 'ผงหอม'),
      i('5 g', 'dry mustard', '乾芥末粉', 'ドライマスタード', '머스터드 가루', 'ผงมัสตาร์ด'),
      i('3 g', 'cayenne pepper', '卡宴辣椒粉', 'カイエンペッパー', '카옌페퍼', 'พริกคาเยนน์'),
      i('2 g', 'celery seed, ground', '芹菜籽，磨粉', 'セロリシード、粉末', '셀러리 씨, 갈기', 'เมล็ดขึ้นฉ่าย บด'),
      i('180 ml', 'apple-cider vinegar', '蘋果醋', 'りんご酢', '사과식초', 'น้ำส้มสายชูแอปเปิล'),
      i('120 ml', 'water', '水', '水', '물', 'น้ำ'),
      i('20 g', 'yellow mustard', '黃芥末', 'イエローマスタード', '옐로 머스터드', 'มัสตาร์ดเหลือง')
    ],
    instructions: [
      s(ml('Trim and remove the membrane', '修整並撕除筋膜', '整形して膜を外す', '손질하고 막 제거하기', 'แต่งและลอกพังผืด'), ml('Trim loose fat and ragged edges from the racks. Slide a blunt knife under the membrane on the bone side and peel the membrane away in one sheet.', '修掉鬆散脂肪與不整齊邊緣；在骨面筋膜下插入鈍刀，再把筋膜整片撕除。', '余分な脂と端を整え、骨側の膜へ鈍いナイフを入れて一枚に剥がす。', '느슨한 지방과 거친 가장자리를 다듬고 뼈 쪽 막 아래에 무딘 칼을 넣어 한 장으로 벗깁니다.', 'ตัดไขมันหลวมและขอบรุ่ย สอดมีดทื่อใต้พังผืดด้านกระดูกแล้วลอกออกเป็นแผ่น'), 'Two trimmed pork rib racks bone-side up, one showing the membrane partly peeled away cleanly.'),
      s(ml('Mix the dry rub', '混合乾擦香料', 'ドライラブを混ぜる', '드라이럽 섞기', 'ผสมดรายรับ'), ml('Mix the brown sugar, paprika, salt, black pepper, garlic, onion, dry mustard, cayenne and celery seed until evenly distributed.', '紅糖、甜紅椒粉、鹽、黑胡椒、蒜粉、洋蔥粉、乾芥末、卡宴與芹菜籽混合均勻。', 'ブラウンシュガー、パプリカ、塩、黒こしょう、ガーリック、オニオン、マスタード、カイエン、セロリシードを均一に混ぜる。', '황설탕, 파프리카, 소금, 후추, 마늘, 양파, 머스터드, 카옌, 셀러리 씨를 고르게 섞습니다.', 'ผสมน้ำตาลแดง ปาปริกา เกลือ พริกไทย กระเทียม หอม มัสตาร์ด คาเยนน์ และเมล็ดขึ้นฉ่ายให้ทั่ว'), 'A small bowl of brick-red Memphis dry rub with fine even spice texture and no wet ingredients.'),
      s(ml('Season and rest the ribs', '抹香料並靜置', 'ラブを塗って休ませる', '럽 바르고 휴지시키기', 'ทาเครื่องและพัก'), ml('Brush the ribs very thinly with yellow mustard, then press most of the dry rub evenly over both sides. Refrigerate uncovered for 1 hour; reserve the remaining rub for finishing.', '肋排極薄刷一層黃芥末，再把大部分乾擦香料均勻壓上兩面；不覆蓋冷藏 1 小時，剩餘香料保留最後使用。', 'リブへマスタードを薄く塗り、ラブの大半を両面に押し付ける。覆わず冷蔵で1時間休ませ、残りは仕上げ用に取る。', '립에 머스터드를 아주 얇게 바르고 드라이럽 대부분을 양면에 눌러 붙입니다. 덮지 않고 1시간 냉장하며 남은 럽은 마무리용으로 둡니다.', 'ทามัสตาร์ดบางมากบนซี่โครง กดดรายรับส่วนใหญ่ให้ทั่วสองด้าน แช่เย็นไม่ปิด 1 ชั่วโมง เก็บรับที่เหลือไว้จบ'), 'Two rib racks evenly coated in a dry reddish spice crust on a rack, resting uncovered before smoking.'),
      s(ml('Set up indirect smoke', '建立間接煙燻火區', '間接燻煙を準備する', '간접 훈연 준비하기', 'เตรียมไฟอ้อมรมควัน'), ml('Prepare a smoker or covered grill for indirect cooking at 120°C. Add smoking wood to the heat source and place a drip pan under the cool side.', '煙燻爐或有蓋烤爐設定間接火 120°C，在熱源加入煙燻木，冷區下方放滴油盤。', 'スモーカーまたは蓋付きグリルを間接120°Cにし、燻煙材を熱源へ加え、低温側に受け皿を置く。', '스모커나 덮개 있는 그릴을 120°C 간접열로 준비하고 열원에 훈연목을 더해 차가운 쪽 아래에 드립 팬을 둡니다.', 'เตรียมสโมกเกอร์หรือเตามีฝาไฟอ้อม 120°C ใส่ไม้รมควันที่แหล่งความร้อนและวางถาดรองใต้ฝั่งเย็น'), 'A covered barbecue set for indirect low heat with glowing coals and smoking wood on one side and an empty drip pan on the cool side.'),
      s(ml('Start the low-and-slow cook', '開始低溫慢烤', '低温で焼き始める', '저온 천천히 굽기 시작', 'เริ่มย่างต่ำช้า'), ml('Lay the ribs meat-side up over indirect heat, close the lid and smoke at 120°C for 90 minutes without flipping.', '肋排肉面朝上放間接火區，蓋上，以 120°C 煙燻 90 分鐘，不翻面。', 'リブを肉側を上にして間接火へ置き、蓋をして120°Cで90分、返さず燻す。', '립을 살 쪽이 위로 가게 간접열에 놓고 뚜껑을 덮어 120°C에서 90분 뒤집지 않고 훈연합니다.', 'วางซี่โครงด้านเนื้อขึ้นเหนือไฟอ้อม ปิดฝา รมควัน 120°C 90 นาทีโดยไม่พลิก'), 'Two spice-coated rib racks smoking meat-side up over indirect heat, their surface beginning to darken and dry.'),
      s(ml('Mix and apply the vinegar mop', '混合並薄刷醋汁', 'ビネガーモップを塗る', '식초 몹 바르기', 'ผสมและทาน้ำส้ม'), ml('Mix the apple-cider vinegar and water. Brush the ribs lightly with the mop, close the lid and continue cooking; repeat the light brushing every 45 minutes.', '蘋果醋與水混合，肋排薄刷一層後蓋回；之後每 45 分鐘薄刷一次。', 'りんご酢と水を混ぜ、リブへ薄く塗って蓋を戻し、その後45分ごとに軽く塗る。', '사과식초와 물을 섞어 립에 얇게 바르고 뚜껑을 닫은 뒤 45분마다 가볍게 반복합니다.', 'ผสมน้ำส้มแอปเปิลกับน้ำ ทาบาง ๆ บนซี่โครง ปิดฝา แล้วทาซ้ำเบา ๆ ทุก 45 นาที'), 'Darkening smoked ribs being lightly glazed with a thin clear vinegar mop, the spice crust still visible and dry-looking.'),
      s(ml('Smoke until tender with some bite', '煙燻至嫩而仍有咬感', '柔らかくなるまで燻す', '부드럽되 식감 남게 훈연', 'รมจนเนื้อนุ่มแต่ยังมีแรงกัด'), ml('Continue smoking at 120°C for another 2–2.5 hours, maintaining clean smoke, until the rack bends easily and the meat has pulled back from the bone tips but does not fall apart.', '繼續以 120°C 煙燻 2–2.5 小時並維持乾淨煙氣，直到肋排容易彎曲、肉從骨端縮回，但還不會整片脫骨。', '120°Cでさらに2〜2.5時間、きれいな煙を保ち、ラックがよく曲がり骨端から肉が縮むが崩れない程度まで燻す。', '120°C에서 2–2.5시간 더 깨끗한 연기를 유지해 랙이 쉽게 휘고 뼈 끝에서 살이 물러나되 떨어지지는 않을 때까지 훈연합니다.', 'รมต่อที่ 120°C อีก 2–2.5 ชั่วโมง รักษาควันสะอาด จนแผงโค้งง่ายและเนื้อร่นจากปลายกระดูกแต่ยังไม่หลุดร่อน'), 'Fully smoked rib racks with a dark mahogany dry crust, exposed bone tips and a gentle bend without falling apart.'),
      s(ml('Finish with fresh dry rub', '補上新鮮乾擦香料', '仕上げのラブを振る', '마무리 드라이럽 뿌리기', 'โรยดรายรับสดจบ'), ml('Move the ribs off the heat and dust both sides lightly with the reserved dry rub while the surface is still hot.', '肋排離火，趁表面仍熱時在兩面薄薄撒上保留的乾擦香料。', '火から外し、表面が熱いうちに取っておいたラブを両面へ薄く振る。', '립을 불에서 내리고 표면이 뜨거울 때 남겨 둔 드라이럽을 양면에 얇게 뿌립니다.', 'ยกซี่โครงออกจากไฟ ขณะผิวยังร้อนโรยดรายรับที่เก็บไว้บาง ๆ ทั้งสองด้าน'), 'Hot smoked ribs on a board receiving a light final dusting of reddish dry rub over their dark bark.'),
      s(ml('Rest, slice and serve dry', '靜置切開乾式上桌', '休ませて切る', '휴지 후 잘라 드라이로 내기', 'พัก หั่น และเสิร์ฟแบบแห้ง'), ml('Rest the racks uncovered for 15 minutes. Slice cleanly between the bones and serve without thick barbecue sauce so the smoke and dry rub remain prominent.', '肋排不覆蓋靜置 15 分鐘，沿骨縫乾淨切開；不淋厚重烤肉醬上桌，保留煙燻與乾香料主調。', '覆わず15分休ませ、骨の間を切り、濃いバーベキューソースをかけずに供する。', '랙을 덮지 않고 15분 휴지한 뒤 뼈 사이를 잘라 진한 바비큐 소스 없이 내어 연기와 럽 맛을 살립니다.', 'พักแผงแบบไม่ปิด 15 นาที หั่นระหว่างกระดูก แล้วเสิร์ฟโดยไม่ราดซอสบาร์บีคิวข้น เพื่อให้ควันและดรายรับเด่น'), 'Sliced Memphis-style ribs on a platter with dark smoky bark and a visible dry spice crust, no glossy sauce coating.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Memphis barbecue is especially known for pork, and ribs are commonly served either wet with sauce or dry with a spice rub. The dry style puts smoke, rendered pork fat and the seasoned bark at the centre of the plate.', '孟菲斯烤肉以豬肉聞名，肋排常分成醬汁型 wet 與乾擦香料型 dry；乾式做法把煙燻、豬油脂與香料 bark 放在主角位置。', 'メンフィス・バーベキューは豚肉で知られ、リブにはソースを塗るウェットと、スパイスで仕上げるドライがあります。ドライは燻香とバークを前面に出します。', '멤피스 바비큐는 돼지고기로 유명하고 립은 소스를 바르는 웻과 스파이스를 강조하는 드라이 방식이 있습니다. 드라이는 연기 향과 바크를 중심에 둡니다.', 'บาร์บีคิวเมมฟิสขึ้นชื่อเรื่องหมู ซี่โครงมีทั้งแบบเปียกทาซอสและแบบแห้งใช้เครื่องเทศ แบบแห้งเน้นควัน ไขมันหมู และเปลือกเครื่องปรุง'),
    imageAlt: ml('Memphis dry-rub pork ribs with a dark smoky spice crust', '深色煙燻香料外殼的孟菲斯乾擦豬肋排', '濃い燻香とスパイス皮のメンフィス風ドライリブ', '진한 훈연 향신료 크러스트의 멤피스식 드라이립', 'ซี่โครงหมูเมมฟิสแบบแห้ง เปลือกเครื่องเทศรมควันเข้ม'),
    visualSpec: 'Memphis-style dry ribs: sliced pork spare ribs with a dark reddish-mahogany smoky bark and visible dry spice coating, moist meat inside, no thick glossy barbecue sauce.'
  })
];
