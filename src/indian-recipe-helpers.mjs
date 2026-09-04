export const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body) => ({ title, body });

const india = ml("India", "印度", "インド", "인도", "อินเดีย");
const profiles = {
  curry: {
    tips: [
      ml("Measure and stage whole spices, ground spices, aromatics, and finishing ingredients separately; each enters at a different heat stage.", "整粒香料、粉狀香料、辛香料與收尾材料要分開量好；每組下鍋的火力與時機不同。", "ホールスパイス、粉末スパイス、香味野菜、仕上げ材料を別々に計量し、段階ごとに加えます。", "통향신료, 가루 향신료, 향채, 마무리 재료를 따로 계량해 각기 다른 불 단계에 넣으세요.", "ตวงเครื่องเทศเม็ด เครื่องเทศผง เครื่องหอม และของปิดท้ายแยกกัน เพราะใส่คนละช่วงความร้อน"),
      ml("Cook onion-tomato masala until its raw smell disappears and fat glistens at the edge; adding liquid too early leaves a harsh sauce.", "洋蔥番茄 masala 要炒到生味消失、邊緣泛油再加液體；太早加水會留下生澀味。", "玉ねぎとトマトのマサラは青臭さが消え、縁に油が浮くまで炒めてから液体を加えます。", "양파 토마토 마살라는 날향이 사라지고 가장자리에 기름이 돌 때까지 볶은 뒤 물을 넣으세요.", "ผัดมาซาลาหอมมะเขือเทศจนกลิ่นดิบหายและมีน้ำมันเงาที่ขอบก่อนเติมของเหลว" )
    ],
    commonMistakes: [
      ml("Ground spices scorch quickly in a dry pan; lower the heat and add a measured splash of water if the masala catches.", "粉狀香料在乾鍋很快燒焦；masala 黏鍋時先降火並補一小份量好的水。", "粉末スパイスは焦げやすいため、火を弱め、必要なら計量した水を少量加えます。", "가루 향신료는 쉽게 타므로 불을 낮추고 마살라가 붙으면 계량한 물을 조금 넣으세요.", "เครื่องเทศผงไหม้เร็วในกระทะแห้ง ลดไฟและเติมน้ำที่ตวงเล็กน้อยเมื่อมาซาลาติดหม้อ"),
      ml("Do not add garam masala at the beginning unless specified; its volatile aromas are strongest near the end.", "除非步驟指定，不要一開始就放 garam masala；它的揮發香氣在收尾加入最清楚。", "指定がなければガラムマサラは初めに入れず、香りを残すため終盤に加えます。", "지시가 없으면 가람 마살라는 처음부터 넣지 말고 향을 살리도록 끝에 넣으세요.", "อย่าใส่การัมมาซาลาตั้งแต่ต้นเว้นแต่สูตรระบุ กลิ่นหอมจะชัดที่สุดเมื่อใส่ช่วงท้าย")
    ],
    storage: ml("Cool within 2 hours and refrigerate airtight for up to 3 days. Reheat once to a steady simmer and at least 74°C throughout.", "2 小時內放涼，密封冷藏最多 3 天；只回熱一次，煮至穩定微滾且各處至少 74°C。", "2時間以内に冷まし、密閉冷蔵で3日以内。再加熱は一度だけ、全体を74°C以上にします。", "2시간 안에 식혀 밀폐 냉장 3일 이내 보관하고 한 번만 전체 74°C 이상으로 데우세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทไม่เกิน 3 วัน และอุ่นครั้งเดียวให้ทั่วถึงอย่างน้อย 74°C")
  },
  dry: {
    tips: [
      ml("Cut vegetables to the stated size and dry them before the pan so they brown and steam at the same rate.", "蔬菜依指定尺寸切好並擦乾再下鍋，才能同時上色與熟透。", "野菜を指定の大きさにそろえ、水気を拭いてから加熱します。", "채소를 표시된 크기로 썰고 물기를 닦아야 고르게 익고 색이 납니다.", "หั่นผักตามขนาดและซับแห้งก่อนลงกระทะเพื่อให้สุกและขึ้นสีพร้อมกัน"),
      ml("Fold rather than mash once tender pieces are added; the finished sabzi should show distinct vegetables unless the dish is intentionally mashed.", "熟軟材料加入後用翻拌而非壓碎；除非本來就是泥狀料理，成品應看得出各蔬菜。", "柔らかい材料は潰さず返し、意図的なマッシュ料理以外は形を残します。", "부드러운 재료는 으깨지 말고 뒤집어 섞어, 의도한 매시 요리가 아니면 형태를 남기세요.", "เมื่อผักนุ่มแล้วให้พับคลุกไม่บด เว้นแต่เป็นเมนูบดโดยตั้งใจ" )
    ],
    commonMistakes: [
      ml("A crowded, cool pan traps water and turns dry sabzi soggy; use a wide pan and cook in batches when needed.", "冷鍋塞太滿會困住水氣，使乾式 sabzi 濕爛；用寬鍋，必要時分批。", "低温の鍋に詰め込むと水っぽくなるため、広い鍋で必要なら分けて調理します。", "차가운 팬을 가득 채우면 물이 차서 드라이 사브지가 눅눅해집니다. 넓은 팬을 쓰세요.", "กระทะเย็นและแน่นกักน้ำทำให้ซับซีแฉะ ใช้กระทะกว้างและแบ่งทำเมื่อจำเป็น"),
      ml("Salt draws water from vegetables; follow the stated timing instead of seasoning every layer automatically.", "鹽會把蔬菜水分拉出；依步驟指定時間加鹽，不要每層都習慣性調味。", "塩は野菜から水を出すため、各段階で加えず指定のタイミングに従います。", "소금은 채소의 물을 빼므로 매 단계가 아니라 표시된 때에 넣으세요.", "เกลือดึงน้ำจากผัก ให้ใส่ตามจังหวะที่ระบุแทนการปรุงทุกชั้น")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 3 days, and reheat in a wide pan to 74°C so excess moisture can evaporate.", "2 小時內放涼，密封冷藏最多 3 天；以寬鍋回熱至 74°C，讓多餘水分蒸發。", "2時間以内に冷まし密閉冷蔵3日以内。広い鍋で74°Cまで再加熱して水分を飛ばします。", "2시간 안에 식혀 밀폐 냉장 3일, 넓은 팬에서 74°C까지 데워 수분을 날리세요.", "ทำให้เย็นใน 2 ชั่วโมง แช่เย็นปิดสนิท 3 วัน อุ่นในกระทะกว้างถึง 74°C ให้น้ำส่วนเกินระเหย")
  },
  fermented: {
    tips: [
      ml("Fermentation follows batter volume, aroma, and bubbles rather than the clock alone; room temperature changes the schedule.", "發酵要看體積、氣味與氣泡，不只看時間；室溫會改變進度。", "発酵は時間だけでなく、体積、香り、気泡で判断します。室温で時間が変わります。", "발효는 시간만이 아니라 부피, 향, 기포로 판단하며 실온에 따라 달라집니다.", "ดูปริมาตร กลิ่น และฟองของแป้ง ไม่ยึดเวลาอย่างเดียว เพราะอุณหภูมิห้องมีผล"),
      ml("Stir fermented batter gently and remove only the portion needed; rough mixing knocks out the gas that makes idli and dosa light.", "發酵麵糊只輕柔攪拌並取需要份量；用力攪會排掉讓 idli 與 dosa 輕盈的氣體。", "発酵生地はやさしく混ぜ、必要量だけ取ります。強く混ぜると気泡が抜けます。", "발효 반죽은 부드럽게 섞고 필요한 만큼만 덜어 기포를 지키세요.", "คนแป้งหมักเบา ๆ และตักเท่าที่ใช้ การคนแรงทำให้ก๊าซที่ทำให้อิดลีและโดซาเบาหาย")
    ],
    commonMistakes: [
      ml("A pan that is too hot sets dosa batter before it can spread; cool the surface briefly between crepes.", "煎盤過熱會讓 dosa 麵糊來不及推開就凝固；每張之間短暫降溫。", "鉄板が熱すぎると生地を広げる前に固まるため、一枚ごとに少し冷まします。", "팬이 너무 뜨거우면 도사 반죽이 펴지기 전에 굳으므로 한 장마다 잠시 식히세요.", "กระทะร้อนเกินทำให้แป้งโดซาเซ็ตก่อนเกลี่ย ให้ลดอุณหภูมิเล็กน้อยระหว่างแผ่น"),
      ml("Do not seal warm batter in the refrigerator; cool it promptly after fermentation to prevent over-souring.", "發酵完成的溫麵糊不要直接密封冷藏；先迅速降溫，避免過度酸化。", "発酵後の温かい生地をそのまま密閉せず、速やかに冷まして過発酵を防ぎます。", "발효한 따뜻한 반죽을 바로 밀봉하지 말고 빨리 식혀 지나치게 시어지는 것을 막으세요.", "อย่าปิดแป้งอุ่นเข้าตู้เย็นทันที ให้ลดอุณหภูมิเร็วเพื่อไม่ให้เปรี้ยวเกิน")
    ],
    storage: ml("Refrigerate fermented batter at 0–4°C for up to 3 days. Cool cooked accompaniments within 2 hours and refrigerate separately for up to 2 days.", "發酵麵糊在 0–4°C 冷藏最多 3 天；熟配菜 2 小時內放涼，分開冷藏最多 2 天。", "発酵生地は0〜4°Cで3日、加熱した付け合わせは2時間以内に冷まし別容器で2日以内。", "발효 반죽은 0~4°C에서 3일, 익힌 곁들임은 2시간 안에 식혀 따로 2일 보관하세요.", "แช่แป้งหมักที่ 0–4°C ไม่เกิน 3 วัน ของสุกพักเย็นใน 2 ชั่วโมงและแยกแช่ไม่เกิน 2 วัน")
  },
  fried: {
    tips: [
      ml("Use a thermometer and fry small batches; recovering oil temperature is part of the recipe, not idle time.", "使用溫度計並小批炸；等待油溫回升也是食譜的一部分，不是空等。", "温度計を使い少量ずつ揚げ、油温が戻るのを待ちます。", "온도계를 쓰고 소량씩 튀기며 기름 온도가 회복될 시간을 주세요.", "ใช้เทอร์โมมิเตอร์และทอดทีละน้อย การรอให้อุณหภูมิน้ำมันกลับเป็นส่วนหนึ่งของสูตร"),
      ml("Drain on a rack rather than stacking on paper; trapped steam softens samosa, pakora, and puri shells.", "炸物放網架瀝油，不要疊在紙上；困住蒸氣會讓 samosa、pakora 與 puri 外殼變軟。", "紙に重ねず網で油を切り、蒸気で皮が柔らかくなるのを防ぎます。", "종이 위에 쌓지 말고 랙에서 빼야 증기로 껍질이 눅눅해지지 않습니다.", "พักบนตะแกรงไม่ซ้อนบนกระดาษ เพราะไอน้ำทำให้เปลือกซาโมซา ปาโกรา และปูรีนิ่ม")
    ],
    commonMistakes: [
      ml("Very hot oil browns the outside before thick dough or potato filling heats through; stay inside the stated temperature range.", "油太熱會讓厚麵皮或馬鈴薯餡還沒熱透就先上色；維持指定油溫。", "油が熱すぎると中まで温まる前に外側が色づくため、指定温度を守ります。", "기름이 너무 뜨거우면 속이 데기 전에 겉만 갈색이 되므로 지정 온도를 지키세요.", "น้ำมันร้อนเกินทำให้ข้างนอกเข้มก่อนแป้งหนาหรือไส้มันฝรั่งร้อนถึงกลาง ให้อยู่ในช่วงที่ระบุ"),
      ml("Wet herbs and watery vegetables spit in oil and thin gram-flour batter; dry them thoroughly before mixing.", "濕香草與出水蔬菜會讓油噴濺並稀釋鷹嘴豆粉漿；混合前徹底擦乾。", "濡れた香草や水分の多い野菜は油はねと衣の薄まりを招くため、よく乾かします。", "젖은 허브와 물 많은 채소는 기름을 튀게 하고 반죽을 묽게 하므로 잘 말리세요.", "สมุนไพรเปียกและผักมีน้ำทำให้น้ำมันกระเด็นและแป้งถั่วบาง ต้องซับให้แห้งก่อนผสม")
    ],
    storage: ml("Best served immediately. Refrigerate within 2 hours for up to 2 days and re-crisp in a 190°C oven until the centre reaches 74°C; do not microwave.", "最好立即食用；2 小時內冷藏最多 2 天，以 190°C 烤箱回酥至中心 74°C，不要微波。", "できたてが最良。2時間以内に冷蔵し2日以内、190°Cのオーブンで中心74°Cまで温め直します。", "바로 먹는 것이 가장 좋고 2시간 안에 냉장해 2일, 190°C 오븐에서 중심 74°C까지 데우세요.", "ดีที่สุดเมื่อเสิร์ฟทันที แช่เย็นภายใน 2 ชั่วโมงไม่เกิน 2 วัน อบ 190°C จนใจกลาง 74°C ไม่ใช้ไมโครเวฟ")
  },
  bread: {
    tips: [
      ml("Weigh flour and add water gradually; flour age, protein, and humidity change absorption.", "麵粉要秤重，水分段加入；麵粉新舊、蛋白質與濕度都會改變吸水。", "粉は計量し、水を少しずつ加えます。粉の状態や湿度で吸水が変わります。", "밀가루는 무게를 재고 물은 나눠 넣으세요. 밀가루 상태와 습도에 따라 흡수량이 달라집니다.", "ชั่งแป้งและเติมน้ำทีละน้อย เพราะอายุแป้ง โปรตีน และความชื้นมีผลต่อการดูดน้ำ"),
      ml("Preheat the cooking surface fully; naan needs intense heat to puff before the crumb dries.", "煎烤面要充分預熱；naan 必須在麵心乾掉前以強熱鼓起。", "焼き面を十分に予熱し、生地が乾く前に強火で膨らませます。", "조리면을 충분히 예열해 난 속이 마르기 전에 강한 열로 부풀리세요.", "อุ่นพื้นผิวให้ร้อนเต็มที่ นานต้องพองด้วยไฟแรงก่อนเนื้อในแห้ง")
    ],
    commonMistakes: [
      ml("Adding all water at once can create a sticky dough that is corrected with too much flour and becomes dense.", "一次倒完水容易過黏，接著補太多粉就會變紮實。", "水を一度に加えるとべたつき、粉を足しすぎて固くなります。", "물을 한꺼번에 넣으면 질어져 밀가루를 과하게 더해 빵이 빽빽해집니다.", "เติมน้ำทั้งหมดทีเดียวทำให้แป้งเหนียว แล้วเติมแป้งเกินจนเนื้อแน่น"),
      ml("Do not stack unbrushed hot naan tightly; a small amount of butter and a loose cloth keep it soft without steaming it wet.", "熱 naan 不要乾乾緊疊；薄刷奶油並鬆蓋布可保軟，又不會悶濕。", "熱いナンを乾いたまま強く重ねず、薄くバターを塗り布をふんわりかけます。", "뜨거운 난을 마른 채 꽉 쌓지 말고 버터를 얇게 바르고 천을 느슨하게 덮으세요.", "อย่าซ้อนนานร้อนแห้งแน่น ทาเนยบางและคลุมผ้าหลวม ๆ ให้นุ่มโดยไม่แฉะ")
    ],
    storage: ml("Cool completely, wrap airtight, and refrigerate for up to 3 days or freeze for 1 month. Reheat on a hot pan until steaming and pliable.", "完全放涼後密封，冷藏最多 3 天或冷凍 1 個月；熱鍋回烤至冒蒸氣且恢復柔軟。", "完全に冷まして密閉し、冷蔵3日、冷凍1か月。熱い鍋で蒸気が出て柔らかくなるまで温めます。", "완전히 식혀 밀폐해 냉장 3일 또는 냉동 1개월, 뜨거운 팬에서 김이 나고 부드러워질 때까지 데우세요.", "พักให้เย็นสนิท เก็บปิดสนิทในตู้เย็น 3 วันหรือแช่แข็ง 1 เดือน อุ่นบนกระทะร้อนจนมีไอและนุ่ม")
  },
  dessert: {
    tips: [
      ml("Weigh milk solids, rice, sugar, and liquid; small ratio changes strongly affect syrup absorption and pudding texture.", "乳固形物、米、糖與液體都要秤量；比例小幅變動就會明顯影響吸糖與布丁質地。", "乳固形分、米、砂糖、液体を計量し、比率のずれを防ぎます。", "유고형분, 쌀, 설탕과 액체를 계량해 작은 비율 차이가 식감에 미치는 영향을 줄이세요.", "ชั่งนมแห้ง ข้าว น้ำตาล และของเหลว เพราะสัดส่วนคลาดเล็กน้อยมีผลมากต่อการดูดน้ำเชื่อมและเนื้อพุดดิ้ง"),
      ml("Use low heat and the stated visual endpoint; colour and consistency continue changing during cooling.", "用小火並依指定外觀停火；顏色與濃度在冷卻時還會繼續變化。", "弱火で見た目の基準に従い、冷める間も色と濃度が変わることを考慮します。", "약불에서 표시된 시각적 기준으로 멈추고 식는 동안 색과 농도가 계속 변함을 고려하세요.", "ใช้ไฟอ่อนและหยุดตามจุดสังเกต สีและความข้นยังเปลี่ยนต่อเมื่อเย็น")
    ],
    commonMistakes: [
      ml("Hard boiling scorches milk and splits syrup-soaked sweets; keep the heat gentle and scrape the pot corners.", "猛烈沸騰會讓牛奶焦底，也會破壞糖漿甜點；維持溫和火力並刮鍋角。", "強く沸かすと牛乳が焦げ、シロップ菓子が崩れるため、弱火で鍋の角も混ぜます。", "세게 끓이면 우유가 타고 시럽 디저트가 갈라지므로 약불에서 모서리까지 긁으세요.", "การเดือดแรงทำให้นมไหม้และขนมในน้ำเชื่อมแตก ใช้ไฟอ่อนและขูดมุมหม้อ"),
      ml("Do not pack warm sweets airtight; condensation dilutes syrup and shortens storage life.", "溫熱甜點不要直接密封；凝結水會稀釋糖漿並縮短保存期。", "温かい菓子を密閉せず、結露でシロップが薄まるのを防ぎます。", "따뜻한 디저트를 밀폐하지 마세요. 응결수가 시럽을 묽게 하고 보관 기간을 줄입니다.", "อย่าปิดขนมอุ่นสนิท ไอน้ำควบแน่นทำให้น้ำเชื่อมเจือจางและเก็บได้สั้นลง")
    ],
    storage: ml("Follow the recipe-specific cooling note. Refrigerate covered for up to 3 days and keep below 4°C; do not leave milk-based desserts at room temperature over 2 hours.", "依各食譜冷卻說明，加蓋冷藏最多 3 天並保持低於 4°C；乳製甜點不可在室溫超過 2 小時。", "各レシピの冷却法に従い、4°C未満で密閉冷蔵3日以内。乳製品の菓子を常温に2時間以上置きません。", "각 레시피 냉각법을 따르고 4°C 아래에서 덮어 3일 이내 보관하며 유제품 디저트를 실온에 2시간 넘게 두지 마세요.", "ทำตามวิธีพักเย็นของสูตร เก็บปิดต่ำกว่า 4°C ไม่เกิน 3 วัน และอย่าวางขนมนมที่อุณหภูมิห้องเกิน 2 ชั่วโมง")
  }
};

const sourceMap = {
  "butter-chicken": [["Swasthi's Recipes — Butter Chicken", "https://www.indianhealthyrecipes.com/butter-chicken/"], ["BBC Food — Seema's Butter Chicken", "https://www.bbc.co.uk/food/recipes/seemas_butter_chicken_83978"]],
  "palak-paneer": [["Swasthi's Recipes — Palak Paneer", "https://www.indianhealthyrecipes.com/palak-paneer-recipe-easy-paneer-recipes-step-by-step-pics/"], ["Dassana's Veg Recipes — Palak Paneer", "https://www.vegrecipesofindia.com/palak-paneer/" ]],
  "chana-masala": [["Swasthi's Recipes — Chana Masala", "https://www.indianhealthyrecipes.com/chana-masala/"], ["Dassana's Veg Recipes — Chana Masala", "https://www.vegrecipesofindia.com/chana-masala-recipe/"]],
  "dal-tadka": [["Swasthi's Recipes — Dal Tadka", "https://www.indianhealthyrecipes.com/dal-tadka/"], ["Dassana's Veg Recipes — Dal Tadka", "https://www.vegrecipesofindia.com/restaurant-style-dal-tadka/"]],
  "rajma-masala": [["Swasthi's Recipes — Rajma Masala", "https://www.indianhealthyrecipes.com/rajma-recipe-rajma-masala-recipe/"], ["Dassana's Veg Recipes — Rajma Masala", "https://www.vegrecipesofindia.com/rajma-masala-recipe-restaurant-style/"]],
  "aloo-gobi": [["Swasthi's Recipes — Aloo Gobi", "https://www.indianhealthyrecipes.com/aloo-gobi-recipe/"], ["Dassana's Veg Recipes — Aloo Gobi", "https://www.vegrecipesofindia.com/aloo-gobi-recipe-punjabialoo-gobi/"]],
  "baingan-bharta": [["Swasthi's Recipes — Baingan Bharta", "https://www.indianhealthyrecipes.com/baingan-bharta/"], ["Dassana's Veg Recipes — Baingan Bharta", "https://www.vegrecipesofindia.com/baingan-bharta-recipe-punjabi-baingan-bharta-recipe/"]],
  "hyderabadi-chicken-biryani": [["Swasthi's Recipes — Hyderabadi Chicken Biryani", "https://www.indianhealthyrecipes.com/hyderabadi-biryani-recipe/"], ["Sailu's Food — Hyderabadi Chicken Dum Biryani", "https://www.sailusfood.com/hyderabadi-chicken-dum-biryani/"]],
  "masala-dosa": [["Swasthi's Recipes — Masala Dosa", "https://www.indianhealthyrecipes.com/masala-dosa-recipe/"], ["Dassana's Veg Recipes — Masala Dosa", "https://www.vegrecipesofindia.com/masala-dosa-recipe-how-to-make-masala-dosa-recipe/"]],
  "idli-sambar": [["Swasthi's Recipes — Idli Sambar", "https://www.indianhealthyrecipes.com/idli-sambar-recipe-tiffin-sambar/"], ["Dassana's Veg Recipes — Idli Sambar", "https://www.vegrecipesofindia.com/tiffin-sambar-recipe-sambar-recipes/"]],
  "vada-pav": [["Swasthi's Recipes — Vada Pav", "https://www.indianhealthyrecipes.com/vada-pav-recipe/"], ["Dassana's Veg Recipes — Vada Pav", "https://www.vegrecipesofindia.com/vada-pav-recipe-mumbai-vada-pav/"]],
  "pav-bhaji": [["Swasthi's Recipes — Pav Bhaji", "https://www.indianhealthyrecipes.com/pav-bhaji-recipe/"], ["Dassana's Veg Recipes — Pav Bhaji", "https://www.vegrecipesofindia.com/pav-bhaji-recipe-mumbai-pav-bhaji-a-fastfood-recipe-from-mumbai/"]],
  "pani-puri": [["Swasthi's Recipes — Pani Puri", "https://www.indianhealthyrecipes.com/pani-puri-recipe/"], ["Dassana's Veg Recipes — Pani Puri", "https://www.vegrecipesofindia.com/pani-puri-recipe-mumbai-pani-puri-recipe/"]],
  "samosa": [["Swasthi's Recipes — Samosa", "https://www.indianhealthyrecipes.com/samosa-recipe-make-samosa/"], ["Dassana's Veg Recipes — Punjabi Samosa", "https://www.vegrecipesofindia.com/samosa-recipe-punjabi-samosa/"]],
  "vegetable-pakora": [["Swasthi's Recipes — Vegetable Pakora", "https://www.indianhealthyrecipes.com/pakora-recipe-vegetable-pakora-pakoda/"], ["Dassana's Veg Recipes — Mixed Vegetable Pakora", "https://www.vegrecipesofindia.com/mix-veg-pakora-recipe/"]],
  "tandoori-chicken": [["Swasthi's Recipes — Tandoori Chicken", "https://www.indianhealthyrecipes.com/tandoori-chicken-recipe/"], ["Ministry of Curry — Tandoori Chicken", "https://ministryofcurry.com/tandoori-chicken/"]],
  "rogan-josh": [["Swasthi's Recipes — Rogan Josh", "https://www.indianhealthyrecipes.com/rogan-josh/"], ["NDTV Food — Kashmiri Rogan Josh", "https://food.ndtv.com/recipe-kashmiri-rogan-josh-483488"]],
  "goan-fish-curry": [["The Yummy Delights — Goan Fish Curry", "https://theyummydelights.com/goan-fish-curry/"], ["Pat-a-Cake — Authentic Goan Fish Curry", "https://veenapatwardhan.com/pat-a-cake/2023/02/03/authenticeasygoanfishcurryrecipe/"]],
  "butter-naan": [["Swasthi's Recipes — Butter Naan", "https://www.indianhealthyrecipes.com/naan/"], ["Dassana's Veg Recipes — Naan", "https://www.vegrecipesofindia.com/naan-recipe-without-yeast/"]],
  "gulab-jamun": [["Swasthi's Recipes — Gulab Jamun", "https://www.indianhealthyrecipes.com/gulab-jamun-recipe-using-milk-powder/"], ["Dassana's Veg Recipes — Gulab Jamun", "https://www.vegrecipesofindia.com/gulab-jamun-easy-gulab-jamun-recipe/"]],
  "rice-kheer": [["Swasthi's Recipes — Rice Kheer", "https://www.indianhealthyrecipes.com/rice-kheer-recipe-chawal-ki-kheer/"], ["Dassana's Veg Recipes — Rice Kheer", "https://www.vegrecipesofindia.com/rice-kheer-recipe-chawal-ki-kheer/"]]
};

export function makeIndianRecipe(recipe) {
  const notes = profiles[recipe.profile];
  const sources = sourceMap[recipe.id];
  if (!notes) throw new Error(`${recipe.id}: unknown Indian profile ${recipe.profile}`);
  if (!sources) throw new Error(`${recipe.id}: missing Indian sources`);
  return { cuisine: "indian", region: india, ...recipe, tips: recipe.tips ?? notes.tips, commonMistakes: recipe.commonMistakes ?? notes.commonMistakes, storage: recipe.storage ?? notes.storage, sources: sources.map(([title, url]) => ({ title, url })) };
}
