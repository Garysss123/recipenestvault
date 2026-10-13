const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const flourSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url) {
  const title = `Official food-safety guidance — ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function revisePineappleCakes(recipe) {
  body(recipe, 3, ml(
    "Beat in the yolk, then fold in the sifted flour, milk powder, and salt just until combined; do not taste the raw dough. Flour is raw and must be fully cooked before eating. Wash hands, tools, and the work surface after handling raw flour and egg.",
    "拌入蛋黃，再拌入過篩的麵粉、奶粉和鹽，剛好混合即可；不要試吃生麵糰。麵粉屬生食，必須徹底烹熟才可食用。處理生麵粉和蛋後清洗雙手、器具與工作檯。",
    "卵黄を混ぜ、ふるった薄力粉、スキムミルク、塩を加えて、粉気が消えるまで混ぜます。生地を味見しません。小麦粉は生の食品なので、食べる前に十分加熱します。生の粉と卵を扱った後は手、器具、作業台を洗います。",
    "노른자를 섞고 체 친 박력분, 분유, 소금을 넣어 막 섞일 때까지만 접듯이 섞습니다. 생반죽을 맛보지 마세요. 밀가루는 익히지 않은 식품이므로 먹기 전에 완전히 익혀야 합니다. 날밀가루와 달걀을 다룬 뒤 손과 도구, 작업대를 씻습니다.",
    "ตีไข่แดงให้เข้ากัน แล้วพับแป้งที่ร่อน นมผง และเกลือลงไปจนพอเข้ากัน อย่าชิมแป้งดิบ เพราะแป้งยังไม่ผ่านความร้อนและต้องปรุงให้สุกทั่ว ล้างมือ อุปกรณ์ และพื้นเตรียมอาหารหลังสัมผัสแป้งดิบกับไข่"
  ));
  body(recipe, 6, ml(
    "Bake the chilled filled molds at 170°C for 12 minutes. Wearing heatproof gloves, turn each mold over and bake 10–12 minutes more. Check the largest cake: insert a clean thin thermometer from the side into its thickest pastry wall, clear of the filling; the egg-containing pastry must reach 71°C (160°F), and a skewer should show no wet dough. If it is below 71°C or the pastry is still pasty, bake in 2-minute increments and recheck. If the pastry browns before the centre sets, shield the molds loosely with foil, lower the oven to 160°C, and continue in 2-minute increments.",
    "將冷藏過的包餡模具以 170°C 烤 12 分鐘。戴隔熱手套將模具翻面，再烤 10–12 分鐘。檢查最大顆鳳梨酥：從側面把乾淨細探針插入最厚的外皮，避開內餡；含蛋外皮須達 71°C（160°F），竹籤也不應沾有濕麵糰。若低於 71°C 或外皮仍糊黏，每次續烤 2 分鐘並重測。若外皮比中心更早上色，將模具鬆鬆蓋上鋁箔、烤箱降至 160°C，每次續烤 2 分鐘。",
    "冷やした詰め物入りの型を170°Cで12分焼きます。耐熱手袋を着用して型を裏返し、さらに10〜12分焼きます。最も大きいケーキを確認します。清潔な細い温度計を側面から最も厚い生地部分へ差し、餡を避けます。卵入りの生地は71°C（160°F）に達し、竹串に湿った生地が付かないことを確認します。71°C未満、または生地がねっとりしていれば2分ずつ追加して再確認します。中心が固まる前に生地が色づく場合は、型にホイルをふんわりかけ、オーブンを160°Cに下げて2分ずつ焼きます。",
    "차갑게 식힌 속을 넣은 틀을 170°C에서 12분 굽습니다. 오븐 장갑을 끼고 틀을 뒤집어 10–12분 더 굽습니다. 가장 큰 케이크를 확인합니다. 깨끗하고 가는 온도계를 옆에서 가장 두꺼운 페이스트리 부분에 넣되 속은 피합니다. 달걀이 든 페이스트리는 71°C (160°F)에 도달하고 꼬치에 젖은 반죽이 묻지 않아야 합니다. 71°C보다 낮거나 반죽이 질척하면 2분씩 더 굽고 다시 확인합니다. 중심이 익기 전에 겉이 갈색이 되면 틀을 포일로 느슨하게 덮고 오븐을 160°C로 낮춰 2분씩 더 굽습니다.",
    "อบขนมในพิมพ์ที่แช่เย็นไว้ที่ 170°C นาน 12 นาที ใช้ถุงมือกันความร้อนพลิกพิมพ์แล้วอบต่อ 10–12 นาที ตรวจชิ้นที่ใหญ่ที่สุด แทงเทอร์โมมิเตอร์ปลายเล็กที่สะอาดจากด้านข้างเข้าไปในส่วนแป้งที่หนาที่สุดโดยไม่โดนไส้ แป้งที่มีไข่ต้องถึง 71°C (160°F) และไม้ทดสอบไม่ควรมีแป้งเปียกติด หากต่ำกว่า 71°C หรือแป้งยังเหนียวเป็นแป้งดิบ ให้อบเพิ่มครั้งละ 2 นาทีแล้วตรวจซ้ำ หากผิวเป็นสีก่อนตรงกลางเซ็ต ให้คลุมพิมพ์ด้วยฟอยล์หลวม ๆ ลดเตาเป็น 160°C และอบต่อครั้งละ 2 นาที"
  ));
  recipe.storage = ml(
    "Cool the cakes in a single layer, then refrigerate in a covered shallow container at 4°C (40°F) or colder within 2 hours of baking, or within 1 hour above 32°C (90°F). Use within 3–4 days. Reheat only the portion being served until it reaches 74°C (165°F) throughout; freeze airtight for up to 1 month for longer storage.",
    "鳳梨酥單層放涼，再放入有蓋淺容器，烤好後 2 小時內（環境高於 32°C／90°F 時 1 小時內）冷藏於 4°C（40°F）或以下，3–4 天內食用。只回熱要吃的份量，確認各處達 74°C（165°F）。久放可密封冷凍最多 1 個月。",
    "ケーキを1段に並べて冷まし、蓋付きの浅い容器に入れて、焼いてから2時間以内（32°C／90°Fを超える環境では1時間以内）に4°C（40°F）以下で冷蔵します。3〜4日以内に使います。食べる分だけ全体が74°C（165°F）になるまで再加熱します。長期保存は密閉して1か月まで冷凍します。",
    "케이크를 한 겹으로 식힌 뒤 뚜껑 있는 얕은 용기에 담아 굽고 2시간 안에(32°C/90°F보다 높은 환경에서는 1시간 안에) 4°C (40°F) 이하로 냉장합니다. 3–4일 안에 먹습니다. 먹을 양만 전체가 74°C (165°F)에 도달하도록 다시 데웁니다. 더 오래 보관하려면 밀폐해 최대 1개월 냉동합니다.",
    "วางขนมเรียงชั้นเดียวให้เย็น แล้วแช่ในภาชนะตื้นมีฝาที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมงหลังอบ หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะเสิร์ฟให้ทั่วถึง 74°C (165°F) หากเก็บนานให้แช่แข็งในภาชนะปิดสนิทได้ไม่เกิน 1 เดือน"
  );
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FDA — Handling Flour Safely: What You Need to Know", flourSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseMontrealBagels(recipe) {
  body(recipe, 0, ml(
    "Stir the warm water, 60 ml of the honey, yeast, egg, and oil together. Add the flour and salt and mix to a stiff dough, then knead for 8 minutes until smooth and springy. Do not taste the raw dough: flour is raw and must be fully cooked. Wash hands, utensils, and the work surface after handling the flour and egg.",
    "將溫水、60 毫升蜂蜜、酵母、蛋和油拌勻。加入麵粉和鹽，揉成偏硬麵糰，再揉 8 分鐘至光滑有彈性。不要試吃生麵糰：麵粉屬生食，必須徹底烹熟。處理麵粉和生蛋後清洗雙手、器具與工作檯。",
    "ぬるま湯、はちみつ60ml、イースト、卵、油を混ぜます。粉と塩を加えて硬めの生地にし、なめらかで弾力が出るまで8分こねます。生地を味見しません。小麦粉は生の食品なので十分に加熱します。粉と卵を扱った後は手、器具、作業台を洗います。",
    "미지근한 물, 꿀 60ml, 이스트, 달걀, 기름을 함께 섞습니다. 밀가루와 소금을 넣어 단단한 반죽을 만든 뒤 매끈하고 탄력 있을 때까지 8분 치댑니다. 생반죽을 맛보지 마세요. 밀가루는 익히지 않은 식품이므로 완전히 익혀야 합니다. 밀가루와 달걀을 다룬 뒤 손과 도구, 작업대를 씻습니다.",
    "คน น้ำอุ่น น้ำผึ้ง 60 มล. ยีสต์ ไข่ และน้ำมันให้เข้ากัน ใส่แป้งกับเกลือ นวดเป็นโดค่อนข้างแน่น แล้วนวด 8 นาทีจนเนียนและยืดหยุ่น อย่าชิมโดดิบ เพราะแป้งยังไม่ผ่านความร้อนและต้องปรุงให้สุกทั่ว ล้างมือ อุปกรณ์ และพื้นเตรียมอาหารหลังสัมผัสแป้งกับไข่"
  ));
  body(recipe, 7, ml(
    "Bake at 230°C for 16–20 minutes, turning the tray once, until the crust is deep golden. Check the largest bagel with a clean instant-read thermometer inserted from the side into the centre of the crumb; this egg-containing dough must reach 71°C (160°F), and the crumb should be set and chewy with no wet stripe. If it is below 71°C or still tacky inside, bake 3 minutes more and check again. If the crust or sesame darkens before the centre is ready, lower the oven to 200°C and continue in 3-minute increments, tenting loosely with foil if needed.",
    "以 230°C 烤 16–20 分鐘，中途轉動烤盤一次，直到外皮呈深金黃色。用乾淨即讀溫度計從最大顆側面插入中心麵包屑；此含蛋麵糰須達 71°C（160°F），內部應定型、有嚼勁且沒有濕黏夾層。若低於 71°C 或中心仍黏，每次續烤 3 分鐘並重測。若外皮或芝麻比中心更早變深色，將烤箱降至 200°C，每次續烤 3 分鐘，必要時鬆鬆蓋上鋁箔。",
    "230°Cで16〜20分焼き、途中で天板を1回回し、皮が濃いきつね色になるまで焼きます。最も大きいベーグルの側面から清潔な即読式温度計を中心のクラムへ差します。卵入り生地は71°C（160°F）に達し、内側がむっちりと固まり、湿った筋がない状態にします。71°C未満、または内側がねっとりしていれば3分追加して再確認します。中心が焼ける前に皮やごまが濃くなる場合は、オーブンを200°Cに下げて3分ずつ焼き、必要ならホイルをふんわりかぶせます。",
    "230°C에서 16–20분 굽고 중간에 팬을 한 번 돌려 껍질이 짙은 황금색이 되게 합니다. 가장 큰 베이글의 옆에서 깨끗한 즉시 판독 온도계를 넣어 중심 속을 잽니다. 달걀이 든 반죽은 71°C (160°F)에 도달해야 하고, 속은 젖은 줄 없이 탄력 있게 익어야 합니다. 71°C보다 낮거나 속이 끈적하면 3분 더 굽고 다시 확인합니다. 중심이 익기 전에 껍질이나 참깨가 짙어지면 오븐을 200°C로 낮춰 3분씩 더 굽고 필요하면 포일을 느슨하게 덮습니다.",
    "อบที่ 230°C นาน 16–20 นาที หมุนถาดหนึ่งครั้งจนเปลือกเป็นสีทองเข้ม ตรวจเบเกิลชิ้นใหญ่ที่สุดโดยแทงเทอร์โมมิเตอร์อ่านเร็วที่สะอาดจากด้านข้างเข้าสู่กลางเนื้อขนม แป้งที่มีไข่ต้องถึง 71°C (160°F) และเนื้อด้านในควรเซ็ต เหนียวนุ่ม ไม่มีแถบแป้งเปียก หากต่ำกว่า 71°C หรือด้านในยังเหนียว ให้เพิ่ม 3 นาทีแล้วตรวจซ้ำ หากเปลือกหรืองาเข้มก่อนตรงกลางสุก ให้ลดเตาเป็น 200°C และอบต่อครั้งละ 3 นาที คลุมฟอยล์หลวม ๆ หากจำเป็น"
  ));
  recipe.storage = ml(
    "Cool the bagels on a rack, then refrigerate in a covered shallow container at 4°C (40°F) or colder within 2 hours of baking, or within 1 hour above 32°C (90°F). Use within 3–4 days. Reheat only the portion being served until it reaches 74°C (165°F) throughout; freeze airtight for longer storage.",
    "貝果放在網架上散熱，再放入有蓋淺容器，烤好後 2 小時內（環境高於 32°C／90°F 時 1 小時內）冷藏於 4°C（40°F）或以下，3–4 天內食用。只回熱要吃的份量，確認各處達 74°C（165°F）。久放可密封冷凍。",
    "ベーグルを網の上で冷まし、蓋付きの浅い容器に入れて、焼いてから2時間以内（32°C／90°Fを超える環境では1時間以内）に4°C（40°F）以下で冷蔵します。3〜4日以内に使います。食べる分だけ全体が74°C（165°F）になるまで温めます。長期保存は密閉して冷凍します。",
    "베이글을 식힘망에서 식힌 뒤 뚜껑 있는 얕은 용기에 담아 굽고 2시간 안에(32°C/90°F보다 높은 환경에서는 1시간 안에) 4°C (40°F) 이하로 냉장합니다. 3–4일 안에 먹습니다. 먹을 양만 전체가 74°C (165°F)에 도달하도록 다시 데웁니다. 더 오래 보관하려면 밀폐해 냉동합니다.",
    "พักเบเกิลบนตะแกรงให้เย็น แล้วแช่ในภาชนะตื้นมีฝาที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมงหลังอบ หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะเสิร์ฟให้ทั่วถึง 74°C (165°F) หากเก็บนานให้แช่แข็งในภาชนะปิดสนิท"
  );
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FDA — Handling Flour Safely: What You Need to Know", flourSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseAlooGobi(recipe) {
  body(recipe, 4, ml(
    "Add the potatoes and cauliflower and fold to coat. Cover tightly and cook over low heat for 10–12 minutes, stirring gently twice. Test the largest potato cube and the thickest cauliflower stem: a small knife should reach the centre easily, with no hard or chalky core, while the pieces still hold their shape. If either is firm after 12 minutes, add 15 ml of the reserved hot water, cover, and cook 3 minutes more; repeat in 15 ml and 3-minute increments, up to 30 ml water total, until tender.",
    "加入馬鈴薯和花椰菜拌勻。緊蓋鍋蓋，以小火煮 10–12 分鐘，中途輕輕翻拌兩次。測試最大塊馬鈴薯及最粗的花椰菜梗：小刀應能輕易插到中心，沒有硬芯或粉硬感，同時蔬菜仍能保持形狀。若 12 分鐘後仍硬，加入預留熱水 15 毫升，蓋上續煮 3 分鐘；每次再加 15 毫升、續煮 3 分鐘，最多共 30 毫升，直到軟熟。",
    "じゃがいもとカリフラワーを加えて全体にからめます。蓋をしっかり閉め、弱火で10〜12分、途中で2回やさしく混ぜます。最も大きいじゃがいもと最も太いカリフラワーの軸を確認します。小さなナイフが中心まで抵抗なく入り、硬い芯や粉っぽさがなく、形は保っている状態が目安です。12分後も硬ければ、取り分けた熱湯15mlを加えて蓋をし、3分追加します。合計30mlまで、15mlと3分ずつ追加して柔らかくなるまで確認します。",
    "감자와 콜리플라워를 넣고 양념이 묻게 접듯이 섞습니다. 뚜껑을 꼭 덮고 약불에서 10–12분 익히며 중간에 부드럽게 두 번 섞습니다. 가장 큰 감자와 가장 굵은 콜리플라워 줄기를 확인합니다. 작은 칼이 중심까지 쉽게 들어가고 단단하거나 가루 같은 심이 없어야 하지만 조각은 형태를 유지해야 합니다. 12분 뒤에도 단단하면 남겨 둔 뜨거운 물 15ml를 넣고 덮어 3분 더 익힙니다. 물은 총 30ml까지 15ml씩, 조리는 3분씩 늘려 부드러워질 때까지 확인합니다.",
    "ใส่มันฝรั่งกับกะหล่ำดอกแล้วคลุกให้เคลือบเครื่องเทศ ปิดฝาให้สนิทและปรุงด้วยไฟอ่อน 10–12 นาที คนเบา ๆ สองครั้ง ตรวจมันฝรั่งชิ้นใหญ่ที่สุดและก้านกะหล่ำดอกที่หนาที่สุด มีดเล็กควรแทงถึงกลางได้ง่าย ไม่มีแกนแข็งหรือเป็นผง แต่ชิ้นยังคงรูป หากผ่าน 12 นาทีแล้วยังแข็ง ให้เติมน้ำร้อนที่แบ่งไว้ 15 มล. ปิดฝาและปรุงต่อ 3 นาที เติมน้ำครั้งละ 15 มล. และปรุงเพิ่มครั้งละ 3 นาที รวมไม่เกิน 30 มล. จนผักนุ่ม"
  ));
  recipe.ingredients.push({
    amount: "0–45 ml",
    item: ml(
      "water, up to 15 ml for the spice pan and up to 30 ml reserved hot for the covered finish",
      "水，炒香料最多 15 毫升，另預留最多 30 毫升熱水供蓋鍋續熟",
      "水（スパイスが焦げそうな場合は最大15ml、蓋をして仕上げるための熱湯を最大30ml取り分ける）",
      "물 (향신료가 눌어붙을 때 최대 15ml, 뚜껑 덮어 마무리할 뜨거운 물 최대 30ml는 따로 남김)",
      "น้ำ โดยใช้ไม่เกิน 15 มล.ในกระทะเครื่องเทศ และแบ่งน้ำร้อนไว้ไม่เกิน 30 มล.สำหรับปิดฝาปรุงต่อ"
    )
  });
  recipe.storage = ml(
    "Cool in shallow containers and refrigerate at 4°C (40°F) or colder within 2 hours, or within 1 hour above 32°C (90°F). Use within 3 days. Reheat only the portion needed in a wide pan, stirring, until it reaches 74°C (165°F) throughout; add a spoonful of water if it sticks.",
    "分裝在淺容器中，2 小時內（環境高於 32°C／90°F 時 1 小時內）冷藏於 4°C（40°F）或以下，3 天內食用。只取需要的份量放入寬鍋並翻拌，回熱至各處達 74°C（165°F）；若黏鍋可加一匙水。",
    "浅い容器に分け、2時間以内（32°C／90°Fを超える環境では1時間以内）に4°C（40°F）以下で冷蔵します。3日以内に使います。食べる分だけ広いフライパンで混ぜながら、全体が74°C（165°F）になるまで温めます。焦げつく場合は水を少量加えます。",
    "얕은 용기에 나누어 담고 2시간 안에(32°C/90°F보다 높은 환경에서는 1시간 안에) 4°C (40°F) 이하로 냉장합니다. 3일 안에 먹습니다. 먹을 양만 넓은 팬에서 저어가며 전체가 74°C (165°F)가 될 때까지 다시 데웁니다. 눌어붙으면 물을 한 숟가락 넣습니다.",
    "แบ่งใส่ภาชนะตื้นและแช่ที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3 วัน อุ่นเฉพาะส่วนที่จะกินในกระทะกว้าง คนให้ทั่วจนถึง 74°C (165°F) หากติดกระทะให้เติมน้ำหนึ่งช้อน"
  );
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseFasolada(recipe) {
  body(recipe, 1, ml(
    "Put the drained beans in a pot with 1.5 L fresh water. Bring to a boil, lower to a steady simmer, and cook 30–35 minutes. Test three of the largest beans: their centres should just begin to yield when pressed but remain firm enough to hold together. If they are still hard throughout, simmer 10 minutes more and retest before draining; this is a texture check, not a meat-style temperature endpoint.",
    "將瀝乾的豆子和 1.5 公升新水放入鍋中。煮沸後轉穩定小滾，煮 30–35 分鐘。取最大豆子三顆測試：按壓時中心剛開始變軟，但豆子仍能保持完整。若仍從中心到外層都硬，續煮 10 分鐘再測，確認後才瀝乾；這是口感檢查，不是肉類式溫度標準。",
    "水を切った豆を鍋に入れ、新しい水1.5Lを注ぎます。沸騰させてから安定した弱い沸騰にし、30〜35分煮ます。最も大きい豆を3粒確認します。押すと中心が少し崩れ始めるものの、形を保つ硬さが目安です。全体がまだ硬ければ10分追加して再確認してから湯を切ります。これは食感の確認で、肉のような温度基準ではありません。",
    "물기를 뺀 콩을 냄비에 넣고 새 물 1.5L를 붓습니다. 끓으면 안정적인 약한 끓음으로 낮춰 30–35분 익힙니다. 가장 큰 콩 3개를 눌러 확인합니다. 중심이 눌리기 시작하지만 콩 모양은 유지되어야 합니다. 속까지 여전히 단단하면 10분 더 끓이고 다시 확인한 뒤 물을 뺍니다. 이는 식감 확인이며 고기처럼 내부 온도를 재는 단계가 아닙니다.",
    "ใส่ถั่วที่สะเด็ดน้ำลงหม้อ เติมน้ำใหม่ 1.5 ลิตร ต้มให้เดือดแล้วลดเป็นไฟเคี่ยวสม่ำเสมอ 30–35 นาที ตรวจถั่วเม็ดใหญ่ที่สุด 3 เม็ด เนื้อควรเริ่มนิ่มเมื่อกดแต่ยังคงรูป หากยังแข็งทั่วทั้งเม็ด ให้เคี่ยวต่อ 10 นาทีแล้วตรวจซ้ำก่อนเทน้ำออก นี่เป็นการตรวจเนื้อสัมผัส ไม่ใช่การวัดอุณหภูมิแบบเนื้อสัตว์"
  ));
  recipe.ingredients.push({
    amount: "0–300 ml",
    item: ml(
      "boiling water held back for the final bean simmer, as needed",
      "預留供最後燉豆使用的沸水，視需要添加",
      "仕上げの豆煮用に取り分ける熱湯（必要に応じて）",
      "마지막 콩 끓임에 필요할 때 사용할 뜨거운 물",
      "น้ำเดือดที่แบ่งไว้เติมระหว่างเคี่ยวถั่วช่วงท้ายตามจำเป็น"
    )
  });
  body(recipe, 5, ml(
    "Partially cover and simmer gently for 40–50 minutes, stirring occasionally. Test three of the largest beans from different parts of the pot: each should crush creamy between two spoons with no hard or chalky centre, while most beans keep their shape. If any are firm, continue at a gentle simmer in 10-minute increments and retest. If the liquid falls below halfway up the beans before they soften, add up to 300 ml of the reserved boiling water, 100 ml at a time. Do not raise the heat to force them tender.",
    "半蓋鍋蓋小火燉 40–50 分鐘，偶爾攪拌。從鍋中不同位置取最大豆子三顆測試：每顆都應能在兩匙間壓成綿滑狀，沒有硬芯或粉硬感，同時多數豆子仍保持形狀。若仍有硬豆，以穩定小滾每次續煮 10 分鐘並重測。若豆子變軟前液面低於豆子高度一半，每次加入預留沸水 100 毫升，總量最多 300 毫升。不要為了催軟而調大火。",
    "蓋を少しずらして弱く40〜50分煮て、ときどき混ぜます。鍋の別々の場所から最も大きい豆を3粒取り、2本のスプーンでクリーミーにつぶれ、硬い芯や粉っぽさがないことを確認します。多くの豆は形を保つ状態が目安です。硬い豆があれば弱い沸騰を保って10分ずつ追加し、その都度確認します。豆が柔らかくなる前に水位が豆の半分より下がったら、取り分けた熱湯を100mlずつ、最大300mlまで加えます。火を強めて無理に柔らかくしません。",
    "뚜껑을 살짝 덮고 약하게 40–50분 끓이며 가끔 저어 줍니다. 냄비 여러 곳에서 가장 큰 콩 3개를 골라 두 숟가락 사이에서 크리미하게 으깨지고 단단하거나 가루 같은 심이 없는지 확인합니다. 대부분의 콩은 모양을 유지해야 합니다. 단단한 콩이 있으면 약하게 끓는 상태를 유지하며 10분씩 더 익히고 매번 다시 확인합니다. 콩이 부드러워지기 전에 국물이 콩 높이의 절반 아래로 줄면 남겨 둔 끓는 물을 100ml씩, 최대 300ml까지 넣습니다. 불을 세게 올려 억지로 익히지 마세요.",
    "ปิดฝาแง้มไว้และเคี่ยวเบา ๆ 40–50 นาที คนเป็นครั้งคราว เลือกถั่วเม็ดใหญ่ที่สุด 3 เม็ดจากคนละตำแหน่งในหม้อ แต่ละเม็ดควรบดเป็นเนื้อครีมได้ระหว่างช้อนสองคัน โดยไม่มีแกนแข็งหรือเป็นผง และถั่วส่วนใหญ่ยังคงรูป หากยังมีเม็ดแข็ง ให้เคี่ยวเบา ๆ ต่อครั้งละ 10 นาทีแล้วตรวจซ้ำ หากระดับน้ำลดต่ำกว่าครึ่งเม็ดก่อนถั่วนิ่ม ให้เติมน้ำเดือดที่แบ่งไว้ครั้งละ 100 มล. รวมไม่เกิน 300 มล. อย่าเร่งให้เปื่อยด้วยการเพิ่มไฟ"
  ));
  recipe.storage = ml(
    "Cool promptly in shallow containers and refrigerate at 4°C (40°F) or colder within 2 hours, or within 1 hour above 32°C (90°F). Use within 3 days; the 3-day limit is a conservative recipe target within the official 3–4-day window for vegetable soups and stews. Reheat only the serving needed, stirring until it reaches 74°C (165°F) throughout.",
    "盡快分裝在淺容器中，2 小時內（環境高於 32°C／90°F 時 1 小時內）冷藏於 4°C（40°F）或以下。3 天內食用；這是本食譜較保守的建議，官方蔬菜湯與燉菜冷藏期限為 3–4 天。只回熱要吃的份量並持續攪拌，確認各處達 74°C（165°F）。",
    "速やかに浅い容器に分け、2時間以内（32°C／90°Fを超える環境では1時間以内）に4°C（40°F）以下で冷蔵します。3日以内に使います。これは野菜スープやシチューの公式な冷蔵期間3〜4日の範囲内で、より保守的なレシピ上の目安です。食べる分だけ混ぜながら温め、全体が74°C（165°F）に達したことを確認します。",
    "얕은 용기에 빠르게 나누어 담고 2시간 안에(32°C/90°F보다 높은 환경에서는 1시간 안에) 4°C (40°F) 이하로 냉장합니다. 3일 안에 먹습니다. 이는 채소 수프와 스튜의 공식 냉장 보관기간인 3–4일 안에서 더 보수적으로 정한 조리법 권장치입니다. 먹을 양만 저어가며 전체가 74°C (165°F)에 도달할 때까지 다시 데웁니다.",
    "รีบแบ่งใส่ภาชนะตื้นและแช่ที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3 วัน ซึ่งเป็นคำแนะนำที่ระมัดระวังกว่าภายในช่วง 3–4 วันตามแนวทางทางการสำหรับซุปและสตูว์ผัก อุ่นเฉพาะส่วนที่จะกิน คนจนทั่วถึง 74°C (165°F)"
  );
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

export function refineSeventyFifthMethods(recipes) {
  const byId = new Map();
  for (const id of ["pineapple-cakes", "montreal-style-bagels", "fasolada", "aloo-gobi"]) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) continue;
    const original = recipes[index];
    const publicationCopy = {
      ...original,
      ingredients: original.ingredients.map((row) => ({ ...row, item: { ...row.item } })),
      instructions: original.instructions.slice(),
      sources: original.sources.map((source) => ({ ...source })),
      storage: { ...original.storage }
    };
    recipes[index] = publicationCopy;
    byId.set(id, publicationCopy);
  }
  revisePineappleCakes(byId.get("pineapple-cakes"));
  reviseMontrealBagels(byId.get("montreal-style-bagels"));
  reviseFasolada(byId.get("fasolada"));
  reviseAlooGobi(byId.get("aloo-gobi"));
}
