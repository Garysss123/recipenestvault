export const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body) => ({ title, body });

const taiwan = ml("Taiwan", "台灣", "台湾", "대만", "ไต้หวัน");

const profiles = {
  braise: {
    tips: [
      ml("Brown aromatics and protein before adding liquid; this keeps the final sauce fragrant instead of merely salty.", "先把辛香料與蛋白質炒香上色再加液體，成品才會有香氣層次，而不是只有鹹味。", "香味野菜と肉を炒めてから液体を加えると、塩味だけでなく香りに奥行きが出ます。", "향신 채소와 단백질을 먼저 볶아 색을 낸 뒤 액체를 넣어야 짠맛뿐 아니라 향의 층이 생깁니다.", "ผัดเครื่องหอมและเนื้อให้ขึ้นสีก่อนเติมของเหลว เพื่อให้รสหอมลึกไม่ใช่เพียงเค็ม"),
      ml("Keep the braise at a bare simmer and judge tenderness with a skewer or chopstick; a hard boil dries meat and clouds broth.", "滷煮維持微滾，以竹籤或筷子測試柔軟度；大滾會讓肉變乾、湯汁混濁。", "弱い煮立ちを保ち、串や箸で柔らかさを確認します。強く沸かすと肉が乾き、煮汁が濁ります。", "약하게 끓이며 꼬치나 젓가락으로 부드러움을 확인하세요. 세게 끓이면 고기가 마르고 국물이 탁해집니다.", "เคี่ยวให้เดือดปุดอ่อนและใช้ไม้จิ้มหรือตะเกียบเช็กความนุ่ม การเดือดแรงทำให้เนื้อแห้งและน้ำขุ่น")
    ],
    commonMistakes: [
      ml("Do not reduce a salty braise before the meat is tender; add hot water if needed, then concentrate only at the end.", "肉還沒軟前不要把偏鹹滷汁收乾；需要時補熱水，最後才集中味道。", "肉が柔らかくなる前に塩辛い煮汁を煮詰めず、必要なら湯を足して最後に濃縮します。", "고기가 부드러워지기 전에 짠 조림장을 졸이지 말고 필요하면 뜨거운 물을 보충한 뒤 마지막에 농축하세요.", "อย่าเคี่ยวน้ำพะโล้เค็มให้แห้งก่อนเนื้อนุ่ม เติมน้ำร้อนได้แล้วค่อยงวดรสตอนท้าย"),
      ml("Measure soy sauce rather than pouring by colour; dark soy changes appearance much faster than salt level.", "醬油務必量取，不要只看顏色倒；老抽上色速度遠快於鹹度增加。", "色だけで判断せず、しょうゆは計量します。濃口の色は塩味より先に強く出ます。", "색만 보고 붓지 말고 간장을 계량하세요. 진간장은 염도보다 색을 훨씬 빨리 바꿉니다.", "ตวงซีอิ๊วแทนการเทตามสี เพราะซีอิ๊วดำทำให้สีเข้มเร็วกว่าความเค็ม")
    ],
    storage: ml("Cool within 2 hours and refrigerate airtight for up to 3 days. Reheat once to a steady simmer and at least 74°C throughout.", "2 小時內放涼，密封冷藏最多 3 天；只回熱一次，煮至穩定微滾且各處至少 74°C。", "2時間以内に冷まし、密閉冷蔵で3日以内。再加熱は一度だけ、全体を74°C以上にします。", "2시간 안에 식혀 밀폐 냉장 3일 이내 보관하고 한 번만 전체 74°C 이상으로 재가열하세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทไม่เกิน 3 วัน และอุ่นครั้งเดียวให้ทั่วถึงอย่างน้อย 74°C")
  },
  quick: {
    tips: [
      ml("Measure every sauce and dry washed ingredients before heating the pan; these dishes move too quickly to pause midway.", "開火前先量好所有醬汁並擦乾洗過的食材；台式快炒節奏很快，不適合中途停下。", "加熱前に調味料を量り、洗った材料の水気を拭きます。途中で止められない料理です。", "팬을 달구기 전에 소스를 모두 계량하고 씻은 재료의 물기를 닦으세요. 조리가 매우 빠릅니다.", "ตวงซอสและซับวัตถุดิบที่ล้างให้แห้งก่อนตั้งกระทะ เพราะเมนูเหล่านี้ทำเร็วมาก"),
      ml("Use texture, internal temperature, and sauce consistency as the finish line; burner strength can shift the clock.", "以口感、中心溫度與醬汁濃度判斷完成，不只看時間；爐火強弱會改變所需分鐘數。", "時間だけでなく、食感、中心温度、たれの濃度で仕上がりを判断します。", "시간만 보지 말고 식감, 중심 온도, 소스 농도로 완성을 판단하세요.", "ยึดเนื้อสัมผัส อุณหภูมิใจกลาง และความข้นของซอสเป็นหลัก ไม่ใช่เวลาอย่างเดียว")
    ],
    commonMistakes: [
      ml("Crowding a cool pan causes steaming; cook in batches whenever protein cannot lie in one layer.", "冷鍋塞太滿只會悶蒸；蛋白質無法單層平放時就分批料理。", "低温の鍋に詰め込むと蒸し煮になるため、一層に並ばなければ分けて加熱します。", "덜 달군 팬을 가득 채우면 찌듯 익습니다. 한 겹으로 놓이지 않으면 나눠 조리하세요.", "กระทะไม่ร้อนและใส่แน่นทำให้อาหารนึ่ง หากวางเนื้อชั้นเดียวไม่ได้ให้แบ่งทำ"),
      ml("Do not keep seasoning before liquid reduces; make the final salt adjustment only when the sauce reaches its serving consistency.", "液體尚未收至上桌濃度前不要一直補鹽；醬汁完成後再做最後調味。", "煮汁が仕上がる前に塩を足し続けず、濃度が整ってから最終調整します。", "국물이 졸기 전에 계속 간하지 말고 소스가 완성 농도가 된 뒤 마지막 간을 맞추세요.", "อย่าปรุงเค็มซ้ำก่อนน้ำงวด ปรับรสสุดท้ายเมื่อซอสได้ความข้นพร้อมเสิร์ฟ")
    ],
    storage: ml("Best served immediately. Refrigerate leftovers within 2 hours for up to 2 days and reheat to 74°C; crisp foods will soften.", "最好立即食用；剩食 2 小時內冷藏最多 2 天，回熱至 74°C，酥脆口感會下降。", "できたてが最良です。2時間以内に冷蔵し2日以内、74°Cまで再加熱します。", "바로 먹는 것이 가장 좋습니다. 2시간 안에 냉장해 2일 이내, 74°C까지 데우세요.", "ดีที่สุดเมื่อเสิร์ฟทันที ของเหลือแช่เย็นภายใน 2 ชั่วโมงไม่เกิน 2 วันและอุ่นถึง 74°C")
  },
  sausage: {
    tips: [
      ml("Keep pork, fat, and grinder parts cold; work in small batches and return the filling to refrigeration whenever you pause.", "豬肉、背脂與絞肉器零件都要保持低溫；分小批操作，停工時把肉餡放回冰箱。", "豚肉、脂、ミンサー部品を冷やし、少量ずつ作業します。中断時は肉だねを冷蔵庫へ戻します。", "돼지고기, 지방, 분쇄기 부품을 차갑게 유지하고 소량씩 작업하세요. 멈출 때마다 속을 냉장고에 돌려놓습니다.", "รักษาหมู มัน และชิ้นส่วนเครื่องบดให้เย็น ทำครั้งละน้อย และนำส่วนผสมกลับตู้เย็นเมื่อหยุด"),
      ml("Let the links dry uncovered on a rack inside the refrigerator; never hang raw sausage at room temperature.", "香腸須放在冰箱內的架上裸放乾燥；不可在室溫吊掛生香腸。", "腸詰めは冷蔵庫内の網に並べて覆わず乾かします。生ソーセージを室温に吊るしてはいけません。", "케이싱은 냉장고 안 선반에 덮지 않고 말리세요. 생소시지를 실온에 걸어 두지 마세요.", "วางไส้กรอกบนตะแกรงในตู้เย็นโดยไม่ปิด ห้ามแขวนไส้กรอกดิบที่อุณหภูมิห้อง")
    ],
    commonMistakes: [
      ml("Do not taste raw pork; cook a weighed sample patty to 71°C / 160°F before adjusting the seasoning.", "不可試吃生豬肉；先取秤重肉餡煎成肉餅並加熱至 71°C／160°F，再試味調整。", "生の豚肉を味見しません。計量した肉だねをパティにし、71°C / 160°Fまで加熱してから味を調整します。", "생돼지고기는 맛보지 마세요. 무게를 잰 패티를 71°C / 160°F까지 익힌 뒤 간을 조절하세요.", "ห้ามชิมหมูดิบ ทอดตัวอย่างที่ชั่งน้ำหนักให้ถึง 71°C / 160°F ก่อนปรับรส"),
      ml("Colour and a firm casing do not prove the centre is done; check the thickest link in each pan load with a thermometer.", "表面上色或腸衣變緊都不能證明中心熟透；每鍋都要測量最粗香腸。", "焼き色や張った腸だけでは中心まで火が通った証拠になりません。各回で最も太い腸詰めを測ります。", "겉색이나 단단해진 케이싱만으로 속까지 익었다고 판단하지 말고 매 팬 분량의 가장 굵은 소시지를 재세요.", "สีและไส้ที่ตึงไม่ได้ยืนยันว่าด้านในสุก วัดไส้ที่หนาที่สุดของแต่ละรอบด้วยเทอร์โมมิเตอร์")
    ],
    storage: ml("Follow the recipe-specific raw-link and cooked-sausage storage card; keep raw links refrigerated and separate from ready-to-eat foods.", "依本食譜的生香腸與熟香腸保存卡操作；生香腸冷藏並與即食食物分開。", "このレシピの生ソーセージと加熱後の保存カードに従い、生は冷蔵してそのまま食べる食品と分けます。", "이 레시피의 생소시지와 익힌 소시지 보관 카드를 따르고, 생소시지는 냉장해 바로 먹는 식품과 분리하세요.", "ทำตามการ์ดเก็บไส้กรอกดิบและสุกของสูตรนี้ แช่ไส้กรอกดิบและแยกจากอาหารพร้อมกิน")
  },
  dough: {
    tips: [
      ml("Weigh flour and starch, then add water in stages; humidity and root moisture can change absorption.", "麵粉與澱粉要秤重，水分段加入；濕度與根莖含水量都會改變吸水。", "粉類は計量し、水は段階的に加えます。湿度や芋の水分で吸水量が変わります。", "가루는 무게를 재고 물은 나눠 넣으세요. 습도와 뿌리채소 수분에 따라 흡수량이 달라집니다.", "ชั่งแป้งและเติมน้ำทีละส่วน เพราะความชื้นและน้ำในหัวพืชทำให้การดูดน้ำต่างกัน"),
      ml("Rest dough for the stated time so hydration and gluten relax before rolling, shaping, or steaming.", "麵糰依指定時間靜置，讓水合與筋性放鬆後再擀、整形或蒸。", "指定時間休ませ、水分をなじませて生地を緩めてから成形します。", "표시된 시간만큼 반죽을 쉬게 해 수분이 고루 퍼지고 글루텐이 이완된 뒤 성형하세요.", "พักแป้งตามเวลาที่กำหนดให้น้ำกระจายและกลูเตนคลายก่อนรีด ขึ้นรูป หรือนึ่ง")
    ],
    commonMistakes: [
      ml("Do not bury hot dough under extra dry flour; correct stickiness with a measured dusting or short rest.", "熱麵糰黏手時不要埋進大量乾粉；只薄撒秤好的粉，或短暫靜置再判斷。", "熱い生地に大量の粉を足さず、計量した打ち粉か短い休ませで調整します。", "뜨거운 반죽에 마른 가루를 많이 넣지 말고 계량한 덧가루나 짧은 휴지로 조절하세요.", "อย่าฝังแป้งร้อนในแป้งแห้งมาก แก้ความเหนียวด้วยแป้งนวลที่ตวงหรือพักสั้น ๆ"),
      ml("Seal fillings without trapping large air pockets; expanding steam can split wrappers and leak juices.", "包餡時排出大氣泡再封口；蒸氣膨脹會撐破外皮並漏汁。", "大きな空気を抜いて閉じます。蒸気が膨らむと皮が破れます。", "큰 공기층을 빼고 봉하세요. 증기가 팽창하면 피가 터지고 육즙이 샙니다.", "ไล่ฟองอากาศใหญ่ก่อนปิดไส้ เพราะไอน้ำที่ขยายตัวทำให้แป้งแตกและน้ำไหล")
    ],
    storage: ml("Cool completely before packing. Refrigerate for up to 2 days or freeze un-sauced portions for up to 1 month; steam until piping hot.", "完全放涼再包裝；無醬成品冷藏最多 2 天或冷凍 1 個月，回蒸至中心燙熱。", "完全に冷ましてから包み、冷蔵2日、たれなしで冷凍1か月。中心まで蒸し直します。", "완전히 식혀 포장하고 냉장 2일 또는 소스 없이 냉동 1개월 보관한 뒤 속까지 뜨겁게 찌세요.", "พักให้เย็นสนิทก่อนเก็บ แช่เย็นไม่เกิน 2 วันหรือแช่แข็งแบบไม่ราดซอส 1 เดือน แล้วนึ่งให้ร้อนถึงกลาง")
  },
  dessert: {
    tips: [
      ml("Weigh sugar and starch and use the stated visual cue; dessert texture changes sharply with small ratio errors.", "糖與澱粉都要秤重並依指定外觀判斷；甜點比例只差一點，口感就會明顯改變。", "砂糖とでんぷんは計量し、記載した見た目で判断します。わずかな比率差で食感が変わります。", "설탕과 전분은 무게를 재고 표시된 시각적 기준으로 판단하세요. 작은 비율 차이도 식감을 크게 바꿉니다.", "ชั่งน้ำตาลและแป้งและดูจุดสังเกตตามที่ระบุ เพราะสัดส่วนคลาดเล็กน้อยก็เปลี่ยนเนื้อสัมผัสมาก"),
      ml("Cool syrups and fillings before assembly so ice stays fine and pastry remains crisp.", "糖漿與餡料放涼後再組合，冰才不會迅速融化，酥皮也能保持乾爽。", "蜜や餡は冷ましてから組み立て、氷や生地の食感を守ります。", "시럽과 소는 식힌 뒤 조립해 얼음과 페이스트리의 식감을 지키세요.", "พักน้ำเชื่อมและไส้ให้เย็นก่อนประกอบเพื่อให้น้ำแข็งละเอียดและขนมยังกรอบ")
    ],
    commonMistakes: [
      ml("Do not guess starch by volume when the recipe gives grams; packed spoonfuls can vary dramatically.", "食譜以公克標示澱粉時不要改用目測匙量；壓實程度會造成很大誤差。", "グラム表記のでんぷんを目分量のさじに替えないでください。", "그램으로 표시된 전분을 부피로 눈대중하지 마세요. 눌러 담는 정도에 따라 크게 달라집니다.", "อย่ากะปริมาณแป้งด้วยช้อนเมื่อสูตรให้เป็นกรัม เพราะการอัดแน่นทำให้ต่างกันมาก"),
      ml("Cover exposed dough or cut fruit immediately; dry skins crack and uncovered fruit discolours.", "裸露麵糰或切開水果要立刻覆蓋；表皮乾燥會裂，水果也會變色。", "生地や切った果物はすぐ覆い、乾燥や変色を防ぎます。", "노출된 반죽과 자른 과일은 바로 덮어 마름과 변색을 막으세요.", "คลุมแป้งและผลไม้ที่หั่นทันที ผิวแห้งจะแตกและผลไม้จะคล้ำ")
    ],
    storage: ml("Follow the recipe-specific note. Keep moist toppings refrigerated, dry pastries airtight, and shaved ice unassembled until serving.", "依各食譜的保存說明；含水配料冷藏、乾燥糕點密封，剉冰到上桌前才組合。", "各レシピの保存法に従い、水分のある具は冷蔵、焼菓子は密閉、かき氷は直前に組み立てます。", "각 레시피 보관법을 따르고 수분 있는 토핑은 냉장, 마른 과자는 밀폐, 빙수는 먹기 직전에 조립하세요.", "ทำตามคำแนะนำเฉพาะ เก็บเครื่องชื้นในตู้เย็น ขนมแห้งปิดสนิท และประกอบน้ำแข็งไสก่อนเสิร์ฟ")
  }
};

const sourceMap = {
  "taiwanese-beef-noodle-soup": [["The Woks of Life — Taiwanese Beef Noodle Soup", "https://thewoksoflife.com/taiwanese-beef-noodle-soup-instant-pot/"], ["Tiffy Cooks — Taiwanese Beef Noodle Soup", "https://tiffycooks.com/taiwanese-beef-noodle-soup-authentic-family-recipe/"]],
  "lu-rou-fan": [["The Woks of Life — Lu Rou Fan", "https://thewoksoflife.com/2015/06/lu-rou-fan-taiwanese-braised-pork-rice-bowl/"], ["One Happy Bite — Taiwanese Braised Pork Rice", "https://onehappybite.com/easy-taiwanese-braised-pork-rice-lu-rou-fan/"]],
  "three-cup-chicken": [["The Woks of Life — Three Cup Chicken", "https://thewoksoflife.com/three-cup-chicken-san-bei-ji/"], ["Omnivore's Cookbook — Three Cup Chicken", "https://omnivorescookbook.com/three-cup-chicken/"]],
  "oyster-omelette": [["Umami Days — Taiwanese-style Oyster Omelette", "https://cooking.umamidays.com/taiwanese-style-oyster-omelette/"], ["Street to Kitchen Asia — Taiwanese Oyster Omelet", "https://www.streettokitchenasia.com/taiwanese-oyster-omelet-recipe"], ["Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"], ["Official food-safety guidance — FDA: Selecting and Serving Fresh and Frozen Seafood Safely", "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely"]],
  "taiwanese-popcorn-chicken": [["Tiffy Cooks — Taiwanese Popcorn Chicken", "https://tiffycooks.com/taiwanese-popcorn-chicken-extra-crispy-juciy/"], ["Eat the Love — Taiwanese Popcorn Chicken", "https://www.eatthelove.com/taiwanese-popcorn-chicken/"]],
  "gua-bao": [["Omnivore's Cookbook — Gua Bao", "https://omnivorescookbook.com/gua-bao/"], ["Great British Chefs — Gua Bao", "https://www.greatbritishchefs.com/recipes/gua-bao-recipe"]],
  "dan-bing": [["Cooking in Chinglish — Dan Bing", "https://cookinginchinglish.com/dan-bing/"], ["My Formosa Food — Dan Bing", "https://myformosafood.com/taiwanese/dan-bing/"]],
  "chiayi-turkey-rice": [["Epicurious — Taiwanese Turkey Rice", "https://www.epicurious.com/recipes/food/views/taiwanese-turkey-rice-clarissa-wei"], ["Cooking in Chinglish — Taiwanese Chicken Rice", "https://cookinginchinglish.com/taiwanese-chicken-rice/"]],
  "danzai-noodles": [["KYUNU — Taiwanese Danzai Noodles", "https://eatkyunu.com/blogs/recipes/taiwanese-danzai-noodles-deluxe"], ["Taiwan Tourism Bureau — World Cuisine Taiwan Recipes", "https://ciaprochef.com/wp-content/uploads/2024/04/WCA_Taiwan_Recipes.pdf"]],
  "ba-wan": [["Travel Food Atlas — Taiwanese Ba Wan", "https://travelfoodatlas.com/taiwanese-ba-wan-recipe"], ["Taiwan Ministry of Agriculture — Tainan Shrimp Ba-Wan", "https://fae.moa.gov.tw/upload/fae/files/topics/4227/Healthy%20and%20Delicious%20Food%20for%20the%20Senior%20Palate.pdf"]],
  "pork-ball-rice-vermicelli-soup": [["Taiwan Tourism Bureau — World Cuisine Taiwan Recipes", "https://ciaprochef.com/wp-content/uploads/2024/04/WCA_Taiwan_Recipes.pdf"], ["Oh Snap! Let's Eat! — Taiwanese Meatball Soup", "https://ohsnapletseat.com/2026/01/15/taiwanese-meatball-soup-with-daikon/"]],
  "sesame-oil-chicken": [["The Woks of Life — Taiwanese Sesame Oil Chicken Soup", "https://thewoksoflife.com/taiwanese-sesame-oil-chicken-soup/"], ["I Heart Umami — Sesame Oil Chicken Soup", "https://iheartumami.com/sesame-oil-chicken-soup/"]],
  "taiwanese-tea-eggs": [["The Woks of Life — Chinese Tea Eggs", "https://thewoksoflife.com/chinese-tea-eggs/"], ["Omnivore's Cookbook — Chinese Tea Eggs", "https://omnivorescookbook.com/chinese-tea-eggs/"], ["Official food-safety guidance — FDA: What You Need to Know About Egg Safety", "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"]],
  "taiwanese-sausage": [["iCook — Taiwanese Sausage", "https://icook.tw/recipes/213111"], ["The Big Old Smoke — Homemade Taiwanese Sausages", "https://thebigoldsmoke.blogspot.com/2016/01/home-made-taiwanese-sausages_24.html"], ["Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures (sausage and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"], ["Official food-safety guidance — FoodSafety.gov: 4 Steps to Food Safety (clean and chill)", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety"], ["Official food-safety guidance — FoodSafety.gov: Cold Food Storage Charts (raw sausage and cooked leftovers)", "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts"]],
  "small-sausage-big-sausage": [["A Taste of Home Taiwan — Sausage with Sticky Rice", "https://thetasteofhometaiwan.wordpress.com/2014/03/03/taiwanese-sausage-with-sticky-rice-%E5%A4%A7%E8%85%B8%E5%8C%85%E5%B0%8F%E8%85%B8/"], ["Recipe Deck — Sticky Rice Bun with Taiwanese Sausage", "https://recipe-deck.com/recipe/sticky-rice-bun-with-taiwanese-sausage"]],
  "milkfish-congee": [["Taiwan Ministry of Agriculture — Milkfish Congee", "https://epost.moa.gov.tw/theme_data.php?id=484&sub_theme=photo&theme=epost"], ["Food and Agriculture Education Platform — Milkfish Congee", "https://fae.moa.gov.tw/theme_data.php?id=2944&sub_theme=recipe&theme=topics"], ["Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures (fish and leftovers)", "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures"], ["Official food-safety guidance — FDA: Selecting and Serving Fresh and Frozen Seafood Safely", "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely"], ["Official food-safety guidance — UK Food Standards Agency: Home Food Fact Checker (cooked rice)", "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker"], ["Official food-safety guidance — FoodSafety.gov: 4 Steps to Food Safety (cooling and refrigeration)", "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety"]],
  "pineapple-cakes": [["Food Network — Taiwanese Pineapple Cakes", "https://www.foodnetwork.com/recipes/food-network-kitchen/taiwanese-pineapple-cakes-9349291"], ["DayDayCook — Taiwanese Pineapple Cake", "https://www.daydaycook.com/en/recipe/taiwanese-pineapple-cake"]],
  "jiufen-taro-balls": [["Cooking in Chinglish — Taro Balls", "https://cookinginchinglish.com/taro-balls/"], ["VanFoodies — Taiwanese Taro and Yam Balls", "https://vanfoodies.com/2020/05/22/recipe-taiwanese-taro-and-yam-balls/"]],
  "coffin-bread": [["What To Cook Today — Taiwan Coffin Bread", "https://whattocooktoday.com/taiwan-coffin-bread.html"], ["Hawdii — Taiwan Coffin Bread", "https://www.hawdii.com.tw/zh-tw/recipe/163-Taiwan-Coffin-Bread/view"]],
  "taiwanese-oil-rice": [["Cooking in Chinglish — Taiwanese Sticky Rice", "https://cookinginchinglish.com/taiwanese-sticky-rice-you-fan/"], ["The Seasoned Wok — Taiwanese Sticky Rice", "https://www.theseasonedwok.com/taiwanese-sticky-rice-you-fan/"]],
  "peanut-shaved-ice": [["Jen Lin-Liu — Taiwanese Shaved Ice", "https://www.jenlinliu.com/recipes-1/2020/8/27/meet-fresh-style-taiwanese-shaved-ice"], ["The Sound of Cooking — Taiwanese Baobing", "https://thesoundofcooking.com/shaved-ice-taiwanese-baobing/"]]
};

export function makeTaiwaneseRecipe(recipe) {
  const notes = profiles[recipe.profile];
  const sources = sourceMap[recipe.id];
  const { additionalSources = [], ...recipeData } = recipe;
  if (!notes) throw new Error(`${recipe.id}: unknown Taiwanese profile ${recipe.profile}`);
  if (!sources) throw new Error(`${recipe.id}: missing Taiwanese sources`);
  return {
    cuisine: "taiwanese",
    region: taiwan,
    ...recipeData,
    tips: recipe.tips ?? notes.tips,
    commonMistakes: recipe.commonMistakes ?? notes.commonMistakes,
    storage: recipe.storage ?? notes.storage,
    sources: [...sources.map(([title, url]) => ({ title, url })), ...additionalSources]
  };
}
