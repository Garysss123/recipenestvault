const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function prepare(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = recipe.tips.map((tip) => ({ ...tip }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
}

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${label}`, url });
  }
}

function bainganBharta(recipe) {
  prepare(recipe);
  recipe.cookMinutes = 70;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 0, ml(
    "Rinse the whole eggplants under running water and dry them before trimming; do not use soap or produce wash. Choose firm eggplants, pierce each six times with a small knife, and inspect the holes for spoilage. Rub with the listed 15 ml oil and set a tray nearby for juices.",
    "整顆茄子先在流水下沖洗並擦乾，再修切；不要用肥皂或蔬果清潔劑。挑選結實的茄子，用小刀各刺六處並查看刺孔有無腐壞，再抹上材料所列 15 毫升油，旁邊備好接汁的托盤。",
    "なすは切る前に流水で洗い、乾かします。石けんや野菜用洗剤は使いません。張りのあるものを選び、小さな包丁で各6か所刺して傷みがないか確認します。材料の油15mlを塗り、汁を受けるトレーを用意します。",
    "가지 통째로 흐르는 물에 씻고 손질 전에 말립니다. 비누나 채소 세정제는 사용하지 않습니다. 단단한 가지를 골라 작은 칼로 각각 여섯 군데 찌르고 구멍에 상한 부분이 없는지 확인합니다. 재료에 적힌 기름 15ml를 바르고 즙을 받을 쟁반을 둡니다.",
    "ล้างมะเขือยาวทั้งลูกใต้ก๊อกน้ำแล้วเช็ดให้แห้งก่อนตัดแต่ง ห้ามใช้สบู่หรือน้ำยาล้างผัก เลือกลูกที่แน่น ใช้มีดเล็กจิ้มลูกละ 6 จุด ตรวจรูว่าไม่มีส่วนเสีย ทาน้ำมัน 15 มล.ตามรายการวัตถุดิบ และเตรียมถาดรองน้ำ"
  ));
  body(recipe, 1, ml(
    "Set over a medium gas flame or under a hot broiler and turn every 2–3 minutes for an estimated 18–25 minutes. The skin should blister and blacken all over, while a thin skewer slides through the thickest centre without resistance; the charred skin is a flavour layer, not a doneness test. If the skin is dark but the centre is firm, lower the flame or move the eggplant to a 200°C oven for 5–8 minutes, then test again. This knife test is a tenderness target; no separate numeric safe-minimum temperature is specified for this whole vegetable.",
    "以中火瓦斯爐或高溫烤爐烤，約 18–25 分鐘，每 2–3 分鐘翻面。外皮應全面起泡焦黑，細竹籤則要能毫無阻力地穿過最厚中心；焦黑外皮是風味，不是熟度判準。若皮已深色但中心仍硬，轉小火或移入 200°C 烤箱烤 5–8 分鐘後再測。竹籤測試是柔軟度目標；整顆蔬菜沒有另訂數字型安全最低中心溫度。",
    "中火の直火または高温のブロイラーで、目安18〜25分、2〜3分ごとに返します。皮全体に水ぶくれと黒い焦げができ、細い串が最も厚い中心まで抵抗なく通ればよい状態です。焦げた皮は風味の層で、火通りの判定ではありません。皮が黒くても中心が硬ければ火を弱めるか200°Cのオーブンに移し、5〜8分追加して再確認します。この串の確認は柔らかさの目標で、丸ごとの野菜に別個の数値安全最低温度は定められていません。",
    "중간 불의 가스불이나 강한 브로일러에서 약 18–25분 굽고 2–3분마다 뒤집습니다. 껍질 전체에 물집이 생기고 검게 그을려야 하며, 가는 꼬치가 가장 두꺼운 중심을 저항 없이 통과해야 합니다. 그을린 껍질은 풍미를 위한 것이지 익힘 판정 기준이 아닙니다. 껍질은 검지만 중심이 단단하면 불을 낮추거나 200°C 오븐에 옮겨 5–8분 더 구운 뒤 다시 확인합니다. 꼬치 검사는 부드러움 목표이며 통가지에 별도의 수치 안전 최소 온도가 정해져 있지는 않습니다.",
    "ย่างบนเปลวไฟแก๊สระดับกลางหรือใต้ไฟบนแรงประมาณ 18–25 นาที พลิกทุก 2–3 นาที ผิวควรพองและไหม้ทั่วทั้งลูก ส่วนไม้เสียบแหลมควรแทงผ่านใจกลางส่วนที่หนาที่สุดได้โดยไม่ติดขัด ผิวไหม้เป็นชั้นให้กลิ่น ไม่ใช่เกณฑ์ความสุก หากผิวคล้ำแล้วแต่กลางยังแข็ง ให้ลดไฟหรือย้ายเข้าเตา 200°C อีก 5–8 นาทีแล้วทดสอบซ้ำ การจิ้มนี้เป็นเป้าหมายความนุ่ม ไม่ได้กำหนดอุณหภูมิขั้นต่ำเพื่อความปลอดภัยเป็นตัวเลขสำหรับผักทั้งลูกชนิดนี้"
  ));
  body(recipe, 2, ml(
    "Place the hot eggplants in a covered bowl for 8 minutes so the skins loosen. Split them on a clean board, scoop out the flesh, discard charred skin and only the densest seed pockets, then drain in a sieve for 5 minutes. If liquid still pools underneath, drain for 5 more minutes; do not squeeze away the smoky pulp.",
    "熱茄子放入有蓋碗中靜置 8 分鐘，讓外皮鬆開。在乾淨砧板上剖開、挖出果肉，丟掉焦皮與較密的籽團，再用濾網瀝 5 分鐘。若下方仍積水，再多瀝 5 分鐘；不要把帶煙燻香的果肉擠乾。",
    "熱いなすをふた付きのボウルに8分置き、皮をむきやすくします。清潔なまな板で割って果肉を取り出し、焦げた皮と固まった種の部分だけを除き、ざるで5分水切りします。下に水がたまる場合はさらに5分置きます。燻香のある果肉を絞りすぎません。",
    "뜨거운 가지를 뚜껑 있는 그릇에 8분 두어 껍질을 느슨하게 합니다. 깨끗한 도마에서 갈라 속살을 긁어내고 탄 껍질과 씨가 단단히 뭉친 부분만 버린 뒤 체에 5분 둡니다. 아래에 물이 고이면 5분 더 물기를 빼되 훈연 향이 나는 속살을 짜내지 않습니다.",
    "ใส่มะเขือย่างร้อนในชามมีฝาปิด 8 นาทีให้ลอกเปลือกง่าย ผ่าบนเขียงสะอาด ตักเนื้อออก ทิ้งเปลือกไหม้และก้อนเมล็ดแน่น ๆ เท่านั้น แล้วพักในกระชอน 5 นาที หากยังมีน้ำขังด้านล่างให้พักต่ออีก 5 นาที อย่าบีบเนื้อที่มีกลิ่นควันออกจนแห้ง"
  ));
  body(recipe, 5, ml(
    "Add the tomato, chile powder, and 5 g of the salt to the onion pan. Cook 8–10 minutes, stirring and scraping the base, until the tomato is pulpy, no watery ring remains, and oil glistens at the edge. If it is still loose, simmer uncovered in 2-minute increments; if it catches, lower the heat and stir rather than letting the garlic or tomato scorch.",
    "洋蔥鍋中加入番茄、辣椒粉與 5 公克鹽，邊攪拌並刮鍋底邊煮 8–10 分鐘，直到番茄成泥、周圍沒有水圈且邊緣泛油光。若仍稀，就不加蓋每次續煮 2 分鐘；若開始黏鍋，轉小火並攪拌，別讓蒜或番茄燒焦。",
    "玉ねぎの鍋にトマト、唐辛子粉、塩5gを加えます。鍋底をこそげながら8〜10分炒め、トマトが崩れ、水の輪がなくなり、縁に油が光るまで煮詰めます。まだ水っぽければふたをせず2分ずつ追加します。鍋底に付く場合は火を弱めて混ぜ、にんにくやトマトを焦がしません。",
    "양파 팬에 토마토, 고춧가루, 소금 5g을 넣습니다. 바닥을 긁으며 8–10분 저어 토마토가 풀리고 물기가 고이지 않으며 가장자리에 기름이 반짝일 때까지 익힙니다. 묽으면 뚜껑을 열고 2분씩 더 졸입니다. 눌어붙기 시작하면 불을 낮추고 저어 마늘이나 토마토를 태우지 않습니다.",
    "ใส่มะเขือเทศ พริกป่น และเกลือ 5 กรัมลงในกระทะหอมใหญ่ ผัด 8–10 นาที คนและขูดก้นกระทะจนมะเขือเทศเละ ไม่มีน้ำใสขัง และเห็นน้ำมันเงาที่ขอบ หากยังเหลวให้เคี่ยวเปิดฝาครั้งละ 2 นาที หากเริ่มติดกระทะให้ลดไฟและคน อย่าปล่อยให้กระเทียมหรือมะเขือเทศไหม้"
  ));
  body(recipe, 6, ml(
    "Fold in the drained eggplant and remaining 2 g salt. Sauté over medium-low for 6–8 minutes until steaming hot, cohesive, and smoky, with soft strands still visible rather than a smooth paste. If liquid reappears, cook uncovered for 2 minutes more; if it begins to dry on the base before hot, lower the heat and cover for 2 minutes. Turn off the heat before adding the optional garam masala, cilantro, and lemon juice; rest 3 minutes.",
    "拌入瀝乾茄子與剩餘 2 公克鹽，以中小火炒 6–8 分鐘，直到熱氣上升、融合且帶煙燻香，仍看得出柔軟纖維，不要炒成滑泥。若又出水，開蓋多炒 2 分鐘；若尚未熱透鍋底已變乾，轉小火加蓋 2 分鐘。關火後才加入可選的葛拉姆馬薩拉、香菜與檸檬汁，靜置 3 分鐘。",
    "水を切ったなすと残りの塩2gを加え、中弱火で6〜8分炒めます。湯気が立ち、まとまり、燻香がありながら柔らかな繊維が残り、滑らかなペーストにならない状態にします。水が戻ったらふたをせず2分追加します。熱くなる前に鍋底が乾きそうなら火を弱めて2分ふたをします。火を止めてから好みでガラムマサラ、香菜、レモン汁を加え、3分休ませます。",
    "물기를 뺀 가지와 남은 소금 2g을 넣고 중약불에서 6–8분 볶습니다. 김이 나고 잘 어우러지며 훈연 향이 나되 부드러운 결이 보이고 매끈한 페이스트가 되지 않게 합니다. 물이 다시 생기면 뚜껑을 열고 2분 더 익힙니다. 뜨거워지기 전에 팬 바닥이 마르기 시작하면 불을 낮추고 2분 덮어 둡니다. 불을 끈 다음 선택 재료인 가람 마살라, 고수, 레몬즙을 넣고 3분 쉽니다.",
    "ใส่มะเขือที่สะเด็ดน้ำและเกลืออีก 2 กรัม คลุกบนไฟกลางอ่อน 6–8 นาทีจนร้อนมีไอ เข้ากันและมีกลิ่นควัน แต่ยังเห็นเส้นเนื้อนุ่มไม่กลายเป็นเพสต์ หากมีน้ำออกมาอีกให้ผัดเปิดฝาเพิ่ม 2 นาที หากก้นกระทะเริ่มแห้งก่อนร้อนทั่วให้ลดไฟและปิดฝา 2 นาที ปิดไฟก่อนใส่การัมมาซาลา ผักชี และน้ำเลมอนตามชอบ พัก 3 นาที"
  ));
  recipe.storage = ml(
    "Cool leftovers in a shallow container and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. For best quality, use within 3 days. Reheat the portion to 74°C/165°F throughout, the official minimum for leftovers; the fresh eggplant's skewer tenderness is a separate texture target.",
    "剩食分裝淺盒並於 2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），冰箱保持 4°C／40°F 或以下；為維持最佳品質，3 天內食用。回熱份量各處須達 74°C／165°F，此為官方剩食最低溫度；現做茄子的竹籤柔軟度則是另一項口感目標。",
    "残りは浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質を保つため3日以内に食べます。食べる分は残り物の公式最低温度74°C/165°Fまで全体を再加熱します。作りたてのなすの串の通りやすさは別の食感目標です。",
    "남은 음식은 얕은 용기에 나눠 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장합니다. 최상의 품질을 위해 3일 안에 먹습니다. 먹을 분량은 남은 음식의 공식 최소 온도인 74°C/165°F까지 전체를 재가열합니다. 갓 조리한 가지의 꼬치 부드러움은 별도의 식감 목표입니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นส่วนที่จะกินให้ทั่วถึง 74°C/165°F ซึ่งเป็นอุณหภูมิขั้นต่ำทางการสำหรับอาหารเหลือ ส่วนความนุ่มที่ใช้ไม้เสียบตรวจมะเขือทำใหม่เป็นเป้าหมายด้านเนื้อสัมผัสแยกต่างหาก"
  );
  recipe.tips[0] = ml(
    "Roast until a skewer passes the thickest centre without resistance; blackened skin alone does not mean the flesh has softened.",
    "烤到竹籤能毫無阻力地穿過最厚中心；外皮焦黑不代表果肉已軟。",
    "最も厚い中心に串が抵抗なく通るまで焼きます。皮が黒いだけでは果肉が柔らかくなったとは限りません。",
    "가장 두꺼운 중심에 꼬치가 저항 없이 들어갈 때까지 굽습니다. 껍질이 검게 탔다고 속살까지 부드러운 것은 아닙니다.",
    "ย่างจนไม้เสียบแทงผ่านกลางส่วนที่หนาที่สุดได้โดยไม่ติดขัด ผิวดำอย่างเดียวไม่ได้แปลว่าเนื้อนุ่มแล้ว"
  );
  recipe.commonMistakes[0] = ml(
    "If the tomato masala is still watery, reduce it before adding eggplant; otherwise the finished bharta turns loose and loses its smoky concentration.",
    "番茄香料醬若仍出水，先收乾再加茄子，否則成品會稀並失去濃縮煙燻香。",
    "トマトのマサラが水っぽいままなら、なすを加える前に煮詰めます。仕上がりが緩くなり、燻香も薄まります。",
    "토마토 마살라가 묽으면 가지를 넣기 전에 졸이세요. 완성된 바르타가 묽어지고 훈연 향이 약해집니다.",
    "หากมาซาลามะเขือเทศยังเหลว ให้เคี่ยวลดก่อนใส่มะเขือ มิฉะนั้นภารตาจะเหลวและกลิ่นควันไม่เข้ม"
  );
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
}

function butterNaan(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Stir the instant yeast and sugar into 230 ml water at 35–38°C. Leave 8–10 minutes until creamy foam appears. This checks yeast activity, not food safety; if there is no foam, discard the mixture and start again with fresh yeast and correctly warm water.",
    "速發酵母與糖拌入 35–38°C 的 230 毫升水，靜置 8–10 分鐘至表面出現奶油狀泡沫。這是確認酵母活性，不是食安熟度；若沒有泡沫，倒掉並以新酵母和溫度正確的水重做。",
    "インスタントイーストと砂糖を35〜38°Cの水230mlに混ぜ、クリーム状の泡が出るまで8〜10分置きます。これは酵母の活動確認で、安全温度の確認ではありません。泡が出なければ捨て、新しいイーストと適温の水でやり直します。",
    "인스턴트 이스트와 설탕을 35–38°C 물 230ml에 섞고 크림색 거품이 날 때까지 8–10분 둡니다. 이는 이스트 활성 확인이지 식품 안전 온도 검사가 아닙니다. 거품이 없으면 버리고 새 이스트와 알맞은 온도의 물로 다시 만듭니다.",
    "คนยีสต์สำเร็จรูปกับน้ำตาลในน้ำ 230 มล.ที่ 35–38°C พัก 8–10 นาทีจนมีฟองคล้ายครีม ขั้นนี้ตรวจการทำงานของยีสต์ ไม่ใช่การตรวจความปลอดภัย หากไม่มีฟองให้ทิ้งแล้วเริ่มใหม่ด้วยยีสต์ใหม่และน้ำอุณหภูมิที่ถูกต้อง"
  ));
  body(recipe, 1, ml(
    "Combine the flour and salt, then add yogurt, oil, and the yeast water. Knead and add the remaining listed water 10 ml at a time only until the dough is soft and slightly tacky. Do not taste raw dough: uncooked flour can carry harmful bacteria. Wash hands, bowl, and work surface after handling it.",
    "麵粉與鹽拌勻，加入優格、油與酵母水揉合。剩餘材料水每次加 10 毫升，只加到麵糰柔軟且微黏即可。不要試吃生麵糰：未熟麵粉可能帶有有害細菌。接觸後洗手並清洗碗與工作檯面。",
    "粉と塩を混ぜ、ヨーグルト、油、イースト水を加えてこねます。材料の残りの水は10mlずつ加え、生地が柔らかく少しだけ手に付くところで止めます。生地を味見しません。未加熱の粉には有害な細菌が含まれることがあります。扱った後は手、ボウル、作業台を洗います。",
    "밀가루와 소금을 섞고 요거트, 기름, 이스트 물을 넣어 반죽합니다. 남은 재료의 물은 10ml씩 넣어 부드럽고 약간만 끈적할 때 멈춥니다. 생반죽을 맛보지 마세요. 익히지 않은 밀가루에는 해로운 세균이 있을 수 있습니다. 반죽을 만진 뒤 손, 그릇, 작업대를 씻습니다.",
    "ผสมแป้งกับเกลือ ใส่โยเกิร์ต น้ำมัน และน้ำยีสต์ นวดแล้วเติมน้ำส่วนที่เหลือตามรายการครั้งละ 10 มล.จนแป้งนุ่มและเหนียวติดมือเล็กน้อย ห้ามชิมแป้งดิบ เพราะแป้งที่ยังไม่สุกอาจมีแบคทีเรียอันตราย ล้างมือ ชาม และพื้นผิวหลังจับแป้ง"
  ));
  body(recipe, 3, ml(
    "Cover and proof at 26–28°C for an estimated 75–100 minutes until doubled. A floured fingertip dent should return slowly and remain slightly visible; the time and temperature are rise and texture targets, not a safe-cooking endpoint. If it has not doubled at 100 minutes, keep it covered in a warm place and check every 15 minutes; if it has already doubled, shape it then rather than waiting for collapse.",
    "加蓋在 26–28°C 發酵約 75–100 分鐘，直到體積約兩倍。沾粉手指按下的凹痕應慢慢回彈且稍留痕；時間與溫度是發酵口感目標，不是安全熟度終點。100 分鐘仍未膨脹一倍就保持覆蓋並置暖處，每 15 分鐘查看；若已膨脹則立即整形，不要等到塌陷。",
    "覆って26〜28°Cで目安75〜100分発酵し、体積が約2倍になるまで待ちます。粉を付けた指の跡はゆっくり戻り、少し残る状態にします。この時間と温度は発酵と食感の目標で、加熱の安全基準ではありません。100分で膨らまなければ覆ったまま暖かい場所に置き、15分ごとに確認します。すでに2倍なら、しぼむまで待たず成形します。",
    "덮어 26–28°C에서 약 75–100분 발효해 부피가 두 배가 되게 합니다. 밀가루 묻힌 손가락 자국이 천천히 돌아오고 살짝 남는 상태가 좋습니다. 이 시간과 온도는 발효와 식감 목표이지 안전 조리 종점이 아닙니다. 100분에도 두 배가 되지 않으면 덮은 채 따뜻한 곳에 두고 15분마다 확인합니다. 이미 두 배면 꺼질 때까지 기다리지 말고 모양을 잡습니다.",
    "คลุมและพักแป้งที่ 26–28°C ประมาณ 75–100 นาทีจนมีปริมาตรเป็นสองเท่า รอยนิ้วที่โรยแป้งควรคืนตัวช้า ๆ และยังเห็นรอยเล็กน้อย เวลาและอุณหภูมินี้เป็นเป้าหมายการขึ้นฟูและเนื้อสัมผัส ไม่ใช่จุดสุกเพื่อความปลอดภัย หากครบ 100 นาทีแล้วยังไม่ขึ้นสองเท่า ให้คลุมไว้ในที่อุ่นและตรวจทุก 15 นาที หากขึ้นแล้วให้ขึ้นรูปทันที อย่ารอจนยุบ"
  ));
  body(recipe, 5, ml(
    "Heat a dry cast-iron pan over high heat for 5 minutes. Roll one ball into a 22 × 14 cm teardrop, add optional seeds, and lay it in the pan. Cook 45–60 seconds until large bubbles form. Bubbling and blistering are browning targets; if no bubbles appear after 60 seconds, lift the bread and heat the pan longer, while dark spots appearing too fast mean the pan needs less heat.",
    "乾燒鑄鐵鍋以大火預熱 5 分鐘。麵糰球擀成 22 × 14 公分水滴形，撒可選芝麻後放入鍋中，煎 45–60 秒至大泡鼓起。鼓泡與烙斑是上色口感目標；60 秒仍沒泡就先取出麵餅、延長預熱，若斑點很快變深則降低火力。",
    "鋳鉄の乾いたフライパンを強火で5分予熱します。生地を22×14cmの涙形に伸ばし、好みで種を散らしてフライパンに置きます。大きな気泡が出るまで45〜60秒焼きます。気泡と焼き色は食感の目標です。60秒で気泡がなければパンを一度持ち上げ、さらに予熱します。斑点がすぐ濃くなるなら火を弱めます。",
    "마른 무쇠 팬을 센 불에서 5분 예열합니다. 반죽 한 덩이를 22 × 14cm 물방울 모양으로 밀고 선택한 씨앗을 뿌린 뒤 팬에 놓습니다. 큰 기포가 생길 때까지 45–60초 굽습니다. 기포와 그을림은 색과 식감 목표입니다. 60초가 지나도 기포가 없으면 빵을 들어 팬을 더 달구고, 반점이 너무 빨리 진해지면 불을 낮춥니다.",
    "ตั้งกระทะเหล็กแห้งไฟแรง 5 นาที รีดแป้งหนึ่งก้อนเป็นรูปหยดน้ำ 22 × 14 ซม. โรยเมล็ดตามชอบแล้ววางลงกระทะ ย่าง 45–60 วินาทีจนเกิดฟองใหญ่ ฟองและรอยเกรียมเป็นเป้าหมายสีและเนื้อสัมผัส หากครบ 60 วินาทีแล้วยังไม่มีฟองให้ยกแผ่นออกแล้วอุ่นกระทะต่อ หากจุดสีเข้มขึ้นเร็วเกินไปให้ลดไฟ"
  ));
  body(recipe, 6, ml(
    "Flip and cook 35–50 seconds until the second face has dark blisters and the centre puffs. Check the thickest part: it should be set and steamy with no wet, paste-like raw dough. These visible cues indicate the naan is cooked through; there is no separate numeric minimum internal temperature for this bread. If the outside darkens before the centre sets, lower the heat and cook 20–30 seconds more, then check again. Brush with 7–8 g butter and keep under a loose cloth while repeating.",
    "翻面再煎 35–50 秒，直到另一面有深色烙斑且中心鼓起。檢查最厚處：麵心應定型、冒熱氣，不留濕黏糊狀生麵糰。這些可見線索代表 naan 已熟透；此麵包沒有另訂數字型安全最低中心溫度。若外層先變深而中心尚未定型，轉小火再煎 20–30 秒後重查。取出抹 7–8 公克奶油，完成一張就鬆鬆蓋布保溫。",
    "裏返して35〜50秒焼き、もう片面に濃い焼き色が付き、中心が膨らむまで加熱します。最も厚いところを確かめ、湿ったペースト状の生地がなく、固まり湯気が立つ状態にします。これらは十分に焼けたことを示す目安で、このパンに別個の数値安全最低温度はありません。中心が固まる前に外側が濃くなる場合は火を弱め、20〜30秒追加して再確認します。7〜8gのバターを塗り、次を焼く間は布をふんわりかけます。",
    "뒤집어 35–50초 더 구워 반대쪽에 진한 그을림이 생기고 중심이 부풀게 합니다. 가장 두꺼운 부분을 확인해 축축하고 풀 같은 생반죽이 남지 않고 속이 굳어 김이 나야 합니다. 이 가시적 단서는 난이 완전히 익었음을 보여 주며 별도의 수치 안전 최소 중심 온도는 정해져 있지 않습니다. 속이 굳기 전에 겉이 진해지면 불을 낮춰 20–30초 더 굽고 다시 확인합니다. 꺼내 7–8g 버터를 바르고 다음 것을 굽는 동안 천을 느슨하게 덮어 둡니다.",
    "กลับด้านและย่างอีก 35–50 วินาทีจนอีกด้านมีรอยเกรียมเข้มและกลางแผ่นพอง ตรวจส่วนที่หนาที่สุด เนื้อควรเซ็ตและมีไอ ไม่มีแป้งดิบเปียกเป็นก้อน สัญญาณที่เห็นนี้บอกว่านานสุกทั่ว ไม่มีอุณหภูมิขั้นต่ำเพื่อความปลอดภัยเป็นตัวเลขแยกสำหรับขนมปังชนิดนี้ หากผิวนอกเข้มก่อนกลางเซ็ต ให้ลดไฟและย่างเพิ่ม 20–30 วินาทีแล้วตรวจซ้ำ ทาเนย 7–8 กรัมและคลุมผ้าหลวม ๆ ระหว่างทำแผ่นถัดไป"
  ));
  recipe.storage = ml(
    "Cool promptly and refrigerate leftovers within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder, wrapped airtight; use within 3 days for best quality. Reheat the portion throughout to 74°C/165°F, the official minimum for leftovers, then keep covered briefly to soften. A pliable crumb is a texture goal, separate from the reheating safety minimum.",
    "儘快放涼並於 2 小時內冷藏剩食（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下並密封；為最佳品質請於 3 天內食用。回熱份量各處達 74°C／165°F，此為官方剩食最低溫度，再短暫覆蓋使麵餅柔軟。麵心柔韌是口感目標，與回熱安全最低值分開。",
    "早めに冷まし、残りは2時間以内（32°C/90°Fを超える場合は1時間以内）に密閉して4°C/40°F以下で冷蔵します。品質のため3日以内に食べます。食べる分は残り物の公式最低温度74°C/165°Fまで全体を再加熱し、短く覆って柔らかくします。しっとりした食感は再加熱の安全基準とは別の目標です。",
    "빠르게 식혀 남은 난은 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 밀폐해 4°C/40°F 이하로 냉장합니다. 최상의 품질을 위해 3일 안에 먹습니다. 먹을 분량은 남은 음식의 공식 최소 온도인 74°C/165°F까지 전체를 재가열한 뒤 잠시 덮어 부드럽게 합니다. 말랑한 속살은 재가열 안전 기준과 별개의 식감 목표입니다.",
    "พักให้เย็นโดยเร็วและแช่เย็นส่วนที่เหลือภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า โดยห่อปิดสนิท เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นส่วนที่จะกินให้ทั่วถึง 74°C/165°F ซึ่งเป็นอุณหภูมิขั้นต่ำทางการของอาหารเหลือ แล้วคลุมสั้น ๆ ให้นุ่ม เนื้อขนมปังนุ่มเป็นเป้าหมายด้านสัมผัส แยกจากอุณหภูมิความปลอดภัยในการอุ่น"
  );
  recipe.tips[0] = ml(
    "Weigh the flour and add the listed water gradually; never taste the raw dough while checking its hydration.",
    "麵粉秤重，材料水分段加入；檢查吸水狀態時不要試吃生麵糰。",
    "粉を計量し、材料の水を少しずつ加えます。水分を確認するときも生地を味見しません。",
    "밀가루를 계량하고 재료의 물은 조금씩 넣으세요. 수분을 확인할 때도 생반죽을 맛보지 마세요.",
    "ชั่งแป้งและเติมน้ำตามรายการทีละน้อย อย่าชิมแป้งดิบเพื่อตรวจความชื้น"
  );
  recipe.commonMistakes[0] = ml(
    "A fast proof can overinflate the dough; shape it as soon as it doubles instead of waiting for the full estimate or a collapse.",
    "發酵可能提早完成；體積一倍就整形，不必等滿估計時間，更不要等它塌陷。",
    "早く発酵することがあります。2倍になったら予定時間を待たず成形し、しぼむまで放置しません。",
    "발효가 예상보다 빨리 끝날 수 있습니다. 두 배가 되면 시간을 채우거나 꺼질 때까지 기다리지 말고 모양을 잡으세요.",
    "แป้งอาจขึ้นเร็วกว่าเวลา เมื่อเป็นสองเท่าให้ขึ้นรูปทันที ไม่ต้องรอครบเวลาโดยประมาณหรือรอให้ยุบ"
  );
  addOfficialSource(recipe, "FDA: Flour Is a Raw Food and Other Safety Facts", rawFlour);
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
}

function melanzaneParmigiana(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Rinse the whole eggplants under running water and dry them before slicing. Arrange the 8 mm slices in layers with 4 g salt and rest 30 minutes to draw out water. Blot both faces very dry with clean towels so they brown rather than steam; do not rinse unless the surface tastes excessively salty.",
    "整顆茄子先在流水下沖洗並擦乾，再切成 8 毫米片。分層撒上 4 公克鹽，靜置 30 分鐘使水分滲出。用乾淨布巾將兩面徹底吸乾，避免煎時變蒸煮；除非表面鹹得過頭，不要沖洗。",
    "なすは丸ごと流水で洗って乾かしてから8mm厚に切ります。4gの塩を層ごとに振り、30分置いて水分を出します。清潔な布で両面をよく拭き、蒸れずに焼き色が付くようにします。表面が塩辛すぎる場合以外は洗い流しません。",
    "가지 통째로 흐르는 물에 씻어 말린 뒤 8mm 두께로 썹니다. 소금 4g을 층마다 뿌려 30분 두어 수분을 뺍니다. 깨끗한 천으로 양면을 완전히 눌러 닦아 굽지 않고 찌듯 익는 것을 막습니다. 표면이 지나치게 짠 경우가 아니면 씻어내지 않습니다.",
    "ล้างมะเขือทั้งลูกใต้ก๊อกน้ำและเช็ดให้แห้งก่อนหั่นหนา 8 มม. เรียงเป็นชั้น โรยเกลือ 4 กรัม พัก 30 นาทีให้คายน้ำ ซับทั้งสองด้านให้แห้งสนิทด้วยผ้าสะอาดเพื่อให้ขึ้นสีแทนการนึ่ง ไม่ต้องล้างเว้นแต่ผิวเค็มเกินไป"
  ));
  body(recipe, 1, ml(
    "Brush the slices with the listed 45 ml oil. Brown in a single layer on a hot griddle or skillet, in batches, for 2–3 minutes per side until flexible with deep golden patches; use a rack so steam escapes. If the pan is dry, brush on oil from the measured amount rather than pouring in more. If slices are still firm, cook another minute per side before layering.",
    "用材料所列 45 毫升油刷茄片。平底烤盤或鍋燒熱後單層分批煎，每面 2–3 分鐘至柔軟並有深金斑，放網架讓蒸氣散出。若鍋乾，用刷子取用已量好的油，不要另加；茄片若仍硬，每面再煎 1 分鐘再疊層。",
    "材料の油45mlをなすに塗ります。熱したグリドルまたはフライパンに一層に並べ、数回に分けて片面2〜3分ずつ、柔らかく深いきつね色の斑点が付くまで焼きます。網に移して蒸気を逃がします。鍋が乾いたら計量済みの油を刷毛で塗り、追加で注ぎません。まだ硬ければ重ねる前に各面を1分追加します。",
    "재료에 적힌 기름 45ml를 가지에 바릅니다. 뜨거운 그릴 팬이나 프라이팬에 한 겹으로 놓고 나누어 각 면을 2–3분씩 구워 유연해지고 짙은 황금빛 자국이 나면 망에 올려 김을 뺍니다. 팬이 마르면 계량한 기름을 붓지 말고 붓으로 발라 씁니다. 가지가 여전히 단단하면 쌓기 전에 양면을 1분 더 굽습니다.",
    "ทาน้ำมัน 45 มล.ตามรายการวัตถุดิบบนมะเขือ ย่างบนกระทะแบนร้อนเป็นชั้นเดียว แบ่งทำครั้งละชุด ด้านละ 2–3 นาทีจนยืดหยุ่นและมีรอยสีน้ำตาลทองเข้ม พักบนตะแกรงให้ไอน้ำออก หากกระทะแห้งให้ใช้แปรงทาน้ำมันที่ตวงไว้ ไม่เทเพิ่ม หากยังแข็งให้ย่างด้านละอีก 1 นาทีก่อนนำไปเรียง"
  ));
  body(recipe, 2, ml(
    "Heat the remaining 15 ml oil over medium. Cook the garlic for about 30 seconds only until fragrant, then add crushed tomatoes and the remaining 2 g salt. Simmer uncovered for an estimated 15–20 minutes, stirring occasionally, until thick enough to mound on a spoon with no watery pool; tear in half the basil. If it reduces too fast or catches, lower the heat and stir; if loose, simmer in 3-minute increments.",
    "剩餘 15 毫升油以中火加熱，蒜炒約 30 秒至出香即可，加入碎番茄與剩下 2 公克鹽。不加蓋小煮約 15–20 分鐘，偶爾攪拌，直到醬能堆在湯匙上且沒有水窪；撕入一半羅勒。若太快收乾或黏鍋，轉小火並攪拌；若仍稀，每次續煮 3 分鐘。",
    "残りの油15mlを中火で熱し、にんにくは香りが出るまで約30秒だけ炒めます。つぶしたトマトと残りの塩2gを加え、目安15〜20分、ふたをせず時々混ぜて煮ます。水たまりがなく、スプーンに盛れる濃さになったらバジルの半量をちぎり入れます。急に煮詰まる、または鍋に付く場合は火を弱めて混ぜます。緩ければ3分ずつ煮詰めます。",
    "남은 기름 15ml를 중불로 달구고 마늘은 향이 날 때까지만 약 30초 볶습니다. 으깬 토마토와 남은 소금 2g을 넣고 뚜껑을 열어 약 15–20분 가끔 저으며 졸입니다. 물이 고이지 않고 숟가락에 얹힐 만큼 걸쭉해지면 바질 절반을 찢어 넣습니다. 너무 빨리 줄거나 눌어붙으면 불을 낮추고 젓습니다. 묽으면 3분씩 더 졸입니다.",
    "ตั้งน้ำมันอีก 15 มล.ไฟกลาง ผัดกระเทียมประมาณ 30 วินาทีแค่จนหอม ใส่มะเขือเทศบดและเกลืออีก 2 กรัม เคี่ยวเปิดฝาประมาณ 15–20 นาที คนเป็นครั้งคราวจนข้นพูนบนช้อนได้และไม่มีน้ำใสขัง ฉีกใบโหระพาครึ่งหนึ่งใส่ หากงวดเร็วหรือติดก้นให้ลดไฟและคน หากยังเหลวให้เคี่ยวเพิ่มครั้งละ 3 นาที"
  ));
  body(recipe, 4, ml(
    "Bake uncovered at 190°C for an estimated 30–35 minutes. The dish must reach at least 74°C/165°F at the centre; this is the official safety minimum for meatless casseroles. Use a thermometer in the centre, while treating bubbling cheese and browned spots as appearance targets. If the top browns before the centre reaches 74°C, tent loosely with foil and bake at 180°C in 5-minute increments. Once it reaches 74°C, check that a thin knife also slips easily through the eggplant; if not, keep it covered and bake another 5 minutes. Rest at least 20 minutes before cutting and add the remaining fresh basil. The knife test and browning are texture targets, not substitutes for the minimum temperature.",
    "不加蓋以 190°C 烤約 30–35 分鐘。中心須至少達 74°C／165°F，這是官方對無肉焗烤的安全最低值；用溫度計測中心，起泡起司和烤斑只是外觀目標。若頂部先上色而中心未達 74°C，鬆鬆蓋鋁箔並降至 180°C，每次續烤 5 分鐘。達 74°C 後，再以細刀測茄子是否容易穿透；若仍硬，蓋著多烤 5 分鐘。出爐至少靜置 20 分鐘再切，撒上剩下的新鮮羅勒。刀測和焦斑是口感目標，不能取代最低溫度。",
    "190°Cで目安30〜35分、覆わずに焼きます。中心は少なくとも74°C/165°Fに達させます。これは肉を使わないキャセロールの公式安全最低温度です。中心に温度計を差し、チーズの泡立ちや焼き色は見た目の目標として確認します。中心が74°Cになる前に表面が色づいたら、ホイルをゆるくかぶせて180°Cに下げ、5分ずつ焼きます。74°Cに達した後、細いナイフがなすを楽に通るかも確認します。まだ硬ければ覆ったまま5分追加します。少なくとも20分休ませてから切り、残りの生バジルを散らします。ナイフの通りと焼き色は食感の目標で、最低温度の代わりにはなりません。",
    "190°C에서 뚜껑 없이 약 30–35분 굽습니다. 중심은 최소 74°C/165°F에 도달해야 하며 이는 고기가 없는 캐서롤의 공식 안전 최소 온도입니다. 중심에 온도계를 꽂고, 치즈가 보글거리고 갈색 반점이 나는 것은 외관 목표로 봅니다. 중심이 74°C에 도달하기 전에 윗면이 갈색이 되면 호일을 느슨하게 덮고 180°C로 낮춰 5분씩 더 굽습니다. 74°C에 도달한 뒤 얇은 칼이 가지를 쉽게 통과하는지도 확인합니다. 아직 단단하면 덮은 채 5분 더 굽습니다. 최소 20분 쉬었다 자르고 남은 생바질을 올립니다. 칼 테스트와 갈변은 식감 목표이며 최소 온도를 대신하지 않습니다.",
    "อบแบบไม่ปิดฝาที่ 190°C ประมาณ 30–35 นาที ตรงกลางต้องถึงอย่างน้อย 74°C/165°F ซึ่งเป็นอุณหภูมิขั้นต่ำทางการเพื่อความปลอดภัยของแคสเซอโรลที่ไม่มีเนื้อ ใช้เทอร์โมมิเตอร์วัดตรงกลาง ส่วนชีสเดือดและจุดสีน้ำตาลเป็นเป้าหมายด้านหน้าตา หากหน้าด้านบนเกรียมก่อนกลางถึง 74°C ให้คลุมฟอยล์หลวม ๆ ลดเหลือ 180°C และอบเพิ่มครั้งละ 5 นาที เมื่อถึง 74°C แล้วให้ใช้มีดบางตรวจว่าทะลุเนื้อมะเขือได้ง่ายหรือไม่ หากยังแข็งให้คลุมและอบต่ออีก 5 นาที พักอย่างน้อย 20 นาทีก่อนตัดแล้วโรยโหระพาสดที่เหลือ การทดสอบด้วยมีดและสีเกรียมเป็นเป้าหมายเนื้อสัมผัส ไม่ใช่สิ่งทดแทนอุณหภูมิขั้นต่ำ"
  ));
  recipe.storage = ml(
    "Cool in shallow portions and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best quality. Reheat leftovers to 74°C/165°F throughout. For a fresh bake, 74°C/165°F is the safety minimum; tender eggplant, a set centre, and browned cheese are separate texture and appearance goals.",
    "分裝淺盒並於 2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下；為最佳品質請於 3 天內食用。剩食各處回熱至 74°C／165°F。現烤時，74°C／165°F 是安全最低值；茄子軟嫩、中心定型與起司上色則是另外的口感和外觀目標。",
    "浅い容器に小分けし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質のため3日以内に食べます。残りは全体を74°C/165°Fまで再加熱します。焼きたてでは74°C/165°Fが安全最低温度で、なすの柔らかさ、中心の固まり、チーズの焼き色は別の食感・見た目の目標です。",
    "얕은 용기에 나눠 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장합니다. 최상의 품질을 위해 3일 안에 먹습니다. 남은 음식은 전체를 74°C/165°F까지 재가열합니다. 갓 구울 때 74°C/165°F는 안전 최소 온도이고 가지의 부드러움, 속의 굳음, 치즈의 갈변은 별도의 식감과 외관 목표입니다.",
    "แบ่งเป็นส่วนใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นอาหารเหลือให้ทั่วถึง 74°C/165°F สำหรับการอบใหม่ 74°C/165°F คืออุณหภูมิขั้นต่ำเพื่อความปลอดภัย ส่วนมะเขือนุ่ม ตรงกลางเซ็ต และชีสมีสีน้ำตาลเป็นเป้าหมายเนื้อสัมผัสและรูปลักษณ์แยกต่างหาก"
  );
  recipe.tips[0] = ml(
    "Use the thermometer at the casserole centre for safety, then use a thin knife to judge whether the eggplant layers are tender.",
    "用溫度計確認焗烤中心安全熟度，再用細刀判斷茄子層是否柔軟。",
    "中心は温度計で安全を確認し、その後、細いナイフでなすの柔らかさを確かめます。",
    "캐서롤 중심은 온도계로 안전 여부를 확인한 다음 얇은 칼로 가지가 부드러운지 확인합니다.",
    "ใช้เทอร์โมมิเตอร์ตรวจความปลอดภัยตรงกลางก่อน แล้วใช้มีดบางตรวจว่าชั้นมะเขือนุ่มหรือยัง"
  );
  recipe.commonMistakes[0] = ml(
    "A browned, bubbling top can still hide a cool centre. Cover loosely and continue baking until the centre reaches 74°C/165°F, then check tenderness separately.",
    "頂部上色起泡時中心仍可能偏冷。鬆蓋鋁箔續烤至中心達 74°C／165°F，再另行確認軟嫩度。",
    "表面に焼き色が付き泡立っていても中心は冷たいことがあります。ゆるく覆って中心が74°C/165°Fになるまで焼き、柔らかさは別に確認します。",
    "윗면이 갈색이고 끓어도 중심은 차가울 수 있습니다. 느슨하게 덮어 중심이 74°C/165°F가 될 때까지 굽고 부드러움은 따로 확인하세요.",
    "หน้าด้านบนมีสีและเดือดแล้วแต่ตรงกลางอาจยังเย็น คลุมหลวม ๆ และอบต่อจนใจกลางถึง 74°C/165°F แล้วตรวจความนุ่มแยกต่างหาก"
  );
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
}

function patatasBravas(recipe) {
  prepare(recipe);
  recipe.cookMinutes = 90;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 2, ml(
    "Rinse whole potatoes under running water before peeling or cutting, then cut into even 3 cm chunks. Rinse the cut pieces under cold water for 30 seconds to remove loose starch, drain, and dry extremely well with clean towels. Any surface moisture can splatter in hot oil; keep wet hands and water away from the fryer.",
    "馬鈴薯整顆先在流水下沖洗，再削皮切成均勻 3 公分塊。切塊後再用冷水沖 30 秒去除浮澱粉，瀝乾後用乾淨布巾徹底擦乾。表面水分會使熱油噴濺，濕手與水都要遠離炸鍋。",
    "じゃがいもは皮をむいたり切ったりする前に流水で洗い、均一な3cm角に切ります。切った後は冷水で30秒すすいで表面のでんぷんを落とし、水を切って清潔な布で完全に乾かします。表面の水分は油はねの原因になるため、濡れた手や水を揚げ油に近づけません。",
    "감자는 껍질을 벗기거나 자르기 전에 흐르는 물에 씻고 균일한 3cm 크기로 자릅니다. 자른 조각은 찬물에 30초 헹궈 겉전분을 제거하고 물기를 뺀 뒤 깨끗한 천으로 완전히 말립니다. 표면 물기는 뜨거운 기름을 튀게 하므로 젖은 손과 물을 튀김 기름 가까이 두지 않습니다.",
    "ล้างมันฝรั่งทั้งหัวใต้ก๊อกก่อนปอกหรือหั่น แล้วหั่นเป็นชิ้นขนาด 3 ซม.เท่า ๆ กัน ล้างชิ้นมันฝรั่งด้วยน้ำเย็น 30 วินาทีเพื่อล้างแป้งผิวออก สะเด็ดน้ำและเช็ดให้แห้งสนิทด้วยผ้าสะอาด ความชื้นบนผิวทำให้น้ำมันกระเด็น เก็บมือเปียกและน้ำให้ห่างจากหม้อทอด"
  ));
  body(recipe, 3, ml(
    "Heat frying oil to 110°C and fry in two batches for an estimated 18–22 minutes each, keeping the oil between 105–115°C. The oil range is a first-fry texture target, not a safe internal temperature. The largest potato should be pale outside and admit a thin knife easily at the centre. If the centre is still hard at 22 minutes, continue in 2-minute increments before draining; never judge by the timer alone.",
    "油加熱至 110°C，馬鈴薯分兩批各炸約 18–22 分鐘，油溫維持 105–115°C。這個油溫範圍是第一炸的口感目標，不是安全中心溫度。最大塊應外表仍淡色，細刀可輕鬆穿過中心。若 22 分鐘後仍硬，每次續炸 2 分鐘再瀝油；不要只看計時器判斷。",
    "揚げ油を110°Cにし、じゃがいもを2回に分けて各目安18〜22分、油温105〜115°Cを保って揚げます。この油温は一度揚げの食感目標で、安全上の中心温度ではありません。最大のものは表面が薄い色で、中心に細いナイフが楽に通る状態にします。22分後も硬ければ2分ずつ追加してから油を切り、時間だけで判断しません。",
    "튀김 기름을 110°C로 달구고 감자를 두 번으로 나눠 각 약 18–22분, 기름은 105–115°C로 유지하며 튀깁니다. 이 기름 온도 범위는 1차 튀김 식감 목표이지 안전 중심 온도가 아닙니다. 가장 큰 조각은 겉이 옅은 색이고 가는 칼이 중심까지 쉽게 들어가야 합니다. 22분 뒤에도 중심이 단단하면 2분씩 더 튀긴 뒤 건지며 타이머만으로 판단하지 않습니다.",
    "ตั้งน้ำมันทอดที่ 110°C แบ่งมันฝรั่งทอด 2 ชุด ชุดละประมาณ 18–22 นาที โดยรักษาน้ำมันที่ 105–115°C ช่วงอุณหภูมิน้ำมันนี้เป็นเป้าหมายเนื้อสัมผัสของการทอดรอบแรก ไม่ใช่อุณหภูมิภายในเพื่อความปลอดภัย ชิ้นใหญ่สุดควรมีสีอ่อนและมีดบางแทงกลางได้ง่าย หากครบ 22 นาทีแล้วยังแข็งให้ทอดเพิ่มครั้งละ 2 นาทีก่อนสะเด็ดน้ำ อย่าดูเวลาอย่างเดียว"
  ));
  body(recipe, 4, ml(
    "Spread the first-fried potatoes uncovered in one layer for 20 minutes until visible steam stops and the surfaces feel dry. This rest helps form a crisp shell and counts as room-temperature holding, so keep the whole preparation within the official 2-hour limit before refrigeration. If a delay will exceed that window, refrigerate promptly and finish later; do not leave the potatoes out to dry indefinitely.",
    "第一炸馬鈴薯單層攤開、不加蓋靜置 20 分鐘，直到不再冒明顯蒸氣且表面摸起來乾爽。這段靜置有助形成脆殼，也計入室溫放置時間；整個備餐須遵守官方 2 小時限時。若延誤會超過該時限，請立刻冷藏、稍後再完成；不可無限期放在外面風乾。",
    "一度揚げしたじゃがいもを重ねず一層に広げ、覆わず20分置きます。目に見える湯気が止まり、表面が乾いた感触になるまで待ちます。休ませる時間は皮をカリッとさせるためですが、室温放置時間にも含まれるので、準備全体を公式の2時間以内に収めます。遅れてその時間を超えそうならすぐ冷蔵し、後で仕上げます。出しっぱなしで乾かし続けません。",
    "1차로 튀긴 감자를 겹치지 않게 한 겹으로 펴고 덮지 않은 채 20분 둡니다. 눈에 보이는 김이 멈추고 표면이 마른 느낌이 들면 됩니다. 이 휴지는 바삭한 껍질을 만드는 과정이지만 실온 방치 시간에도 포함되므로 전체 조리 준비는 공식 2시간 한도 안에서 끝냅니다. 지연으로 한도를 넘길 것 같으면 즉시 냉장하고 나중에 마무리합니다. 감자를 밖에 무기한 두어 말리지 마세요.",
    "แผ่มันฝรั่งทอดรอบแรกเป็นชั้นเดียวโดยไม่ปิดฝา 20 นาทีจนไม่มีไอให้เห็นและผิวแห้ง การพักนี้ช่วยให้เปลือกกรอบและนับรวมเวลาอยู่อุณหภูมิห้อง ดังนั้นการเตรียมทั้งหมดต้องอยู่ในกรอบ 2 ชั่วโมงตามคำแนะนำทางการ หากล่าช้าจนจะเกินเวลาให้แช่เย็นทันทีแล้วมาทอดต่อภายหลัง อย่าทิ้งไว้นอกตู้เย็นเพื่อผึ่งให้แห้งนานเกินไป"
  ));
  body(recipe, 5, ml(
    "Raise the oil to 175°C and fry in two batches for 4–5 minutes each, letting it return to 175°C between batches. This temperature and the deep-golden crisp shell are texture targets, not a food-safety minimum. If the outside darkens before the centre is hot and soft, lower the oil to about 165°C and fry 2 minutes more, then check a second large piece. If the batch looks pale and greasy, remove it, let the oil recover fully, and fry the next batch without crowding. Drain in one layer, season with the remaining 5 g salt, add warm brava sauce and parsley, and serve promptly.",
    "油升至 175°C，分兩批各炸 4–5 分鐘，批次之間讓油溫回到 175°C。此油溫和深金酥脆外殼是口感目標，不是食安最低溫度。若外層先變深而中心尚未熱軟，將油降至約 165°C 再炸 2 分鐘，並切開另一塊大馬鈴薯確認。若成品淡色又油膩，先撈出、等油溫完全回升，下一批減量再炸。單層瀝油，撒上剩餘 5 公克鹽，淋溫熱 brava 醬與香菜，盡快上桌。",
    "油を175°Cに上げ、2回に分けて各4〜5分揚げます。次の回の前に油温を175°Cまで戻します。この油温と濃いきつね色のカリッとした殻は食感の目標で、安全最低温度ではありません。外側だけ色づき、中心が熱く柔らかくなっていない場合は油を約165°Cに下げて2分追加し、別の大きな一つも確認します。色が薄く油っぽい場合は一度取り出し、油温が完全に戻ってから次を少量ずつ揚げます。一層に油を切り、残りの塩5gを振り、温めたブラバスソースとパセリを添えて早めに供します。",
    "기름을 175°C로 올려 두 번으로 나눠 각각 4–5분 튀기고 배치 사이에 175°C로 회복시킵니다. 이 온도와 진한 황금빛의 바삭한 껍질은 식감 목표이지 식품 안전 최소 온도가 아닙니다. 겉이 먼저 짙어졌는데 중심이 뜨겁고 부드럽지 않으면 기름을 약 165°C로 낮춰 2분 더 튀긴 뒤 큰 조각 하나를 더 확인합니다. 색이 옅고 기름지면 건져 기름이 완전히 회복되게 하고 다음 배치는 적은 양으로 튀깁니다. 한 겹으로 기름을 빼고 남은 소금 5g을 뿌린 다음 따뜻한 브라바 소스와 파슬리를 얹어 바로 냅니다.",
    "เร่งน้ำมันถึง 175°C แล้วทอด 2 ชุด ชุดละ 4–5 นาที รอให้น้ำมันกลับถึง 175°C ก่อนชุดถัดไป อุณหภูมินี้และเปลือกกรอบสีทองเข้มเป็นเป้าหมายเนื้อสัมผัส ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัย หากผิวนอกเข้มก่อนกลางร้อนและนุ่ม ให้ลดน้ำมันเหลือประมาณ 165°C ทอดเพิ่ม 2 นาที แล้วผ่าชิ้นใหญ่ชิ้นที่สองตรวจ หากสีซีดและมัน ให้ตักออก รอให้น้ำมันกลับร้อนเต็มที่ แล้วทอดชุดถัดไปให้น้อยชิ้นลง สะเด็ดเป็นชั้นเดียว โรยเกลืออีก 5 กรัม ราดซอสบราวาสอุ่นและพาร์สลีย์ เสิร์ฟทันที"
  ));
  recipe.storage = ml(
    "Cool promptly in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best quality. Reheat leftovers throughout to 74°C/165°F, the official minimum for leftovers, then re-crisp in a 190°C oven. The two frying-oil temperatures and crispness are texture targets, not safety measurements.",
    "剩食盡快分裝淺盒，於 2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），冰箱保持 4°C／40°F 或以下；為最佳品質請於 3 天內食用。回熱至中心各處達 74°C／165°F，此為官方剩食最低值，再用 190°C 烤箱回脆。兩段炸油溫與酥脆度都是口感目標，不是安全測量。",
    "残りは浅い容器に分けて早く冷まし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質のため3日以内に食べます。残り物の公式最低温度74°C/165°Fまで全体を再加熱し、その後190°Cのオーブンで再びカリッとさせます。2段階の油温とカリッと感は食感の目標で、安全の測定値ではありません。",
    "남은 음식은 얕은 용기에 나눠 빠르게 식히고 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장합니다. 최상의 품질을 위해 3일 안에 먹습니다. 남은 음식의 공식 최소 온도인 74°C/165°F까지 전체를 재가열한 뒤 190°C 오븐에서 다시 바삭하게 합니다. 두 단계의 튀김 기름 온도와 바삭함은 식감 목표이지 안전 측정값이 아닙니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและทำให้เย็นเร็ว แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นให้ทั่วถึง 74°C/165°F ซึ่งเป็นอุณหภูมิขั้นต่ำทางการของอาหารเหลือ แล้วอบที่ 190°C ให้กรอบอีกครั้ง อุณหภูมิน้ำมันสองช่วงและความกรอบเป็นเป้าหมายเนื้อสัมผัส ไม่ใช่ค่าความปลอดภัย"
  );
  recipe.tips[0] = ml(
    "Use a thermometer for the oil and let it recover between batches; the readings manage crispness, not the internal safety temperature of the potato.",
    "用溫度計測油並在批次間回溫；讀值用來控制酥度，不是馬鈴薯中心的安全溫度。",
    "油温は温度計で測り、バッチ間に戻します。数値はカリッと感の管理用で、じゃがいもの中心安全温度ではありません。",
    "온도계로 기름을 재고 배치 사이에 온도를 회복시킵니다. 이 수치는 바삭함을 위한 것이지 감자 중심의 안전 온도가 아닙니다.",
    "ใช้เทอร์โมมิเตอร์วัดน้ำมันและรอให้อุณหภูมิกลับระหว่างชุด ค่านี้ควบคุมความกรอบ ไม่ใช่อุณหภูมิความปลอดภัยภายในมันฝรั่ง"
  );
  recipe.commonMistakes[0] = ml(
    "Adding damp potatoes can make hot oil spit. Dry every piece thoroughly and lower batches gently; never add water to hot oil.",
    "濕馬鈴薯會讓熱油噴濺。每塊徹底擦乾再輕放入鍋；絕不可向熱油加水。",
    "濡れたじゃがいもは油はねの原因です。全てをよく乾かし、そっと入れます。熱い油に水を加えてはいけません。",
    "젖은 감자는 뜨거운 기름을 튀게 합니다. 모든 조각을 완전히 말려 조심히 넣고 뜨거운 기름에 물을 붓지 마세요.",
    "มันฝรั่งเปียกทำให้น้ำมันกระเด็น เช็ดทุกชิ้นให้แห้งสนิทแล้วหย่อนลงอย่างระมัดระวัง ห้ามเติมน้ำลงในน้ำมันร้อน"
  );
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
}

export function refineEightySecondMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  for (const [id, refine] of [
    ["baingan-bharta", bainganBharta],
    ["butter-naan", butterNaan],
    ["melanzane-parmigiana", melanzaneParmigiana],
    ["patatas-bravas", patatasBravas]
  ]) {
    const recipe = byId.get(id);
    if (!recipe) throw new Error(`Eighty-second method target is missing: ${id}`);
    refine(recipe);
  }
}
