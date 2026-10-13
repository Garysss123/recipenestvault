const flourSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const produceSafety = "https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function preparePublicationCopy(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
}

function addOfficialSource(recipe, label, url) {
  const title = `Official food-safety guidance — ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function reviseCantucci(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 1, ml(
    "Whisk the flour, sugar, baking powder, and salt. Beat in the eggs, vanilla, and orange zest, then fold in the cooled almonds. Do not taste the raw egg-and-flour dough. Keep it away from ready-to-eat food, then wash hands, bowl, whisk, tray, and work surface with warm soapy water after contact.",
    "麵粉、糖、泡打粉與鹽拌勻，加入雞蛋、香草精和橙皮屑打勻，再拌入放涼的杏仁。不要試吃含生蛋和生麵粉的麵糰。生麵糰須遠離即食食物；接觸後以溫熱肥皂水清洗雙手、盆、打蛋器、烤盤與工作檯。",
    "小麦粉、砂糖、ベーキングパウダー、塩を混ぜます。卵、バニラ、オレンジの皮を加えて混ぜ、冷めたアーモンドを折り込みます。生卵と小麦粉を含む生地を味見しません。すぐ食べる食品から離し、触れた後は手、ボウル、泡立て器、天板、作業台を温かい石けん水で洗います。",
    "밀가루, 설탕, 베이킹파우더와 소금을 섞습니다. 달걀, 바닐라, 오렌지 제스트를 넣어 섞고 식힌 아몬드를 접어 넣습니다. 날달걀과 생밀가루가 든 반죽을 맛보지 마세요. 바로 먹는 음식과 분리하고, 닿은 뒤 손, 볼, 거품기, 팬과 작업대를 따뜻한 비눗물로 씻습니다.",
    "ผสมแป้ง น้ำตาล ผงฟู และเกลือ ใส่ไข่ วานิลลา และผิวส้มแล้วตีให้เข้ากัน จากนั้นตะล่อมอัลมอนด์ที่เย็นแล้ว อย่าชิมแป้งดิบที่มีไข่และแป้งสาลี แยกจากอาหารพร้อมกิน แล้วล้างมือ ชาม ตะกร้อมือ ถาด และพื้นเตรียมอาหารด้วยน้ำอุ่นผสมน้ำยาล้างจานหลังสัมผัส"
  ));
  body(recipe, 3, ml(
    "Bake at 170°C for 22–25 minutes until the logs are pale gold, set at the edges, and lightly spring back at the centre; the centre may still feel soft, but it must not look wet or glossy. As a separate egg-safety check, insert a clean thin thermometer sideways into the centre of the thickest log; it should reach 71°C (160°F). If it is wet or below 71°C, bake 2 minutes more and recheck. If the edges darken first, tent loosely with foil and lower the oven to 160°C. Rest on the tray for 12 minutes before slicing; the second bake, not this safety check, creates the dry crisp texture.",
    "以 170°C 烤 22–25 分鐘，至長條淡金黃、邊緣定型且中心輕按會微微回彈；中心可以稍軟，但不可濕亮。另作雞蛋食安檢查：用乾淨細探針從側面插入最厚長條的中心，應達 71°C（160°F）。若中心濕亮或低於 71°C，每次續烤 2 分鐘再檢查。若邊緣先變深，鬆蓋鋁箔並降至 160°C。烤盤上靜置 12 分鐘再切；安全溫度不是酥脆度判斷，乾脆口感由第二次烘烤形成。",
    "170°Cで22〜25分焼き、棒が淡いきつね色で縁は固まり、中心を軽く押すと戻る状態にします。中心は少し柔らかくてもよいですが、濡れて光ってはいけません。卵料理の安全確認は別に行います。清潔で細い温度計を最も厚い棒の側面から中心に差し、71°C（160°F）に達させます。濡れている、または71°C未満なら2分ずつ追加して再確認します。縁が先に濃くなったらホイルをふんわりかけ、160°Cに下げます。天板で12分休ませてから切ります。安全温度はカリカリ感の目安ではなく、乾いた食感は二度目の焼成で作ります。",
    "170°C에서 22–25분 구워 로그가 연한 금빛이고 가장자리는 굳으며 가운데를 가볍게 눌렀을 때 살짝 되돌아오게 합니다. 가운데는 약간 부드러워도 되지만 젖거나 윤기 나면 안 됩니다. 달걀 식품 안전은 별도로 확인합니다. 깨끗하고 가는 온도계를 가장 두꺼운 로그 옆면에서 중심으로 넣어 71°C (160°F)에 도달하게 합니다. 젖었거나 71°C보다 낮으면 2분 더 굽고 다시 확인합니다. 가장자리가 먼저 짙어지면 포일을 느슨하게 덮고 160°C로 낮춥니다. 팬에서 12분 둔 뒤 자릅니다. 안전 온도는 바삭함 기준이 아니며, 마른 식감은 두 번째 굽기에서 만듭니다.",
    "อบที่ 170°C 22–25 นาทีจนแท่งเป็นสีทองอ่อน ขอบอยู่ตัว และตรงกลางเด้งกลับเล็กน้อยเมื่อกด ตรงกลางยังนุ่มได้แต่ต้องไม่เปียกหรือเงา ตรวจความปลอดภัยของไข่แยกต่างหาก โดยแทงเทอร์โมมิเตอร์ปลายเล็กที่สะอาดจากด้านข้างเข้าใจกลางแท่งที่หนาที่สุด ให้ถึง 71°C (160°F) หากยังเปียกหรืออุณหภูมิต่ำกว่า 71°C ให้อบเพิ่มครั้งละ 2 นาทีแล้วตรวจซ้ำ หากขอบเข้มก่อน ให้คลุมฟอยล์หลวม ๆ และลดเตาเป็น 160°C พักบนถาด 12 นาทีก่อนหั่น อุณหภูมิความปลอดภัยไม่ใช่ตัววัดความกรอบ ความแห้งกรอบเกิดจากการอบครั้งที่สอง"
  ));
  body(recipe, 4, ml(
    "Lower the oven to 150°C. Use a serrated knife to saw each rested log diagonally into 1.5 cm slices. If a log still bends or smears after the 12-minute rest, wait 3 minutes more before cutting; a slow sawing motion protects the whole almonds and keeps the slices intact.",
    "烤箱降至 150°C。長條靜置後，以鋸齒刀輕柔鋸切，斜切成 1.5 公分厚片。若靜置 12 分鐘後長條仍會彎或切面糊黏，再等 3 分鐘才切；緩慢鋸切可避免整顆杏仁撕裂餅體，保持切片完整。",
    "オーブンを150°Cに下げます。休ませた棒を波刃包丁でゆっくり引き、斜め1.5cm厚に切ります。12分休ませても棒が曲がる、または切り口がつぶれる場合は、さらに3分待ってから切ります。ゆっくり引くと丸ごとのアーモンドで生地が崩れにくくなります。",
    "오븐을 150°C로 낮춥니다. 휴지한 로그를 톱니칼로 천천히 톱질하듯 비스듬히 1.5cm 두께로 자릅니다. 12분 쉬었는데도 로그가 휘거나 단면이 뭉개지면 3분 더 기다렸다 자릅니다. 천천히 자르면 통아몬드가 반죽을 찢지 않아 조각이 잘 유지됩니다.",
    "ลดเตาเหลือ 150°C ใช้มีดฟันเลื่อยค่อย ๆ เลื่อยแท่งที่พักแล้วให้เฉียงหนา 1.5 ซม. หากพักครบ 12 นาทีแล้วยังงอหรือเนื้อเละเมื่อหั่น ให้รออีก 3 นาทีก่อนตัด การเลื่อยช้า ๆ ช่วยไม่ให้อัลมอนด์ทั้งเม็ดฉีกเนื้อขนมและทำให้ชิ้นอยู่ทรง"
  ));
  body(recipe, 5, ml(
    "Lay the slices flat and bake at 150°C for 8 minutes; turn and bake 8–10 minutes more until the faces feel dry and the slices are crisp at the edges. Cool one test slice completely before judging: if it bends or feels chewy, return the tray for 3-minute increments. If almonds begin to darken, lower to 140°C and check every 3 minutes. Cool all slices fully on a rack before storing.",
    "切片平放，以 150°C 烤 8 分鐘，翻面後再烤 8–10 分鐘，至切面乾燥、邊緣酥脆。先讓一片完全放涼再判斷；若仍會彎或有嚼韌感，放回烤箱每次續烤 3 分鐘。杏仁若開始變深，降至 140°C 並每 3 分鐘檢查。所有切片都在網架上完全放涼再收納。",
    "切り口を下にして150°Cで8分焼き、返してさらに8〜10分、断面が乾いて縁がカリッとするまで焼きます。完全に冷ました試しの1枚で確認します。曲がる、または噛み応えが残る場合は、3分ずつ追加します。アーモンドが濃くなり始めたら140°Cに下げ、3分ごとに確認します。すべて網で完全に冷ましてから保存します。",
    "조각을 눕혀 150°C에서 8분 굽고 뒤집어 8–10분 더 구워 단면이 마르고 가장자리가 바삭해지게 합니다. 한 조각을 완전히 식혀 확인합니다. 휘거나 질기면 3분씩 더 굽습니다. 아몬드가 짙어지기 시작하면 140°C로 낮추고 3분마다 확인합니다. 모든 조각은 랙에서 완전히 식힌 뒤 보관합니다.",
    "วางชิ้นราบ อบที่ 150°C 8 นาที พลิกแล้วอบต่อ 8–10 นาทีจนผิวตัดแห้งและขอบกรอบ พักชิ้นทดสอบให้เย็นสนิทก่อนตัดสิน หากยังงอหรือเหนียว ให้อบเพิ่มครั้งละ 3 นาที หากอัลมอนด์เริ่มเข้ม ให้ลดเป็น 140°C และตรวจทุก 3 นาที พักทุกชิ้นบนตะแกรงให้เย็นสนิทก่อนเก็บ"
  ));
  recipe.commonMistakes[0] = ml(
    "Cutting the first-baked logs while too warm makes the slices crumble around whole almonds; wait the full 12 minutes, then saw gently. If the log still bends, rest it 3 minutes more.",
    "第一次烘烤後趁長條太熱就切，整顆杏仁周圍容易碎裂；先靜置足 12 分鐘再輕柔鋸切。若長條仍會彎，再多放 3 分鐘。",
    "一度焼き後に熱いまま切ると、丸ごとのアーモンドの周りが崩れます。12分休ませてからやさしく引いて切り、まだ曲がる場合はさらに3分休ませます。",
    "첫 번째로 구운 로그를 너무 뜨거울 때 자르면 통아몬드 주변이 부서집니다. 12분 충분히 식힌 뒤 부드럽게 톱질하고, 아직 휘면 3분 더 둡니다.",
    "หั่นแท่งที่อบครั้งแรกขณะยังร้อนเกินไปจะร่วนรอบอัลมอนด์ทั้งเม็ด พักให้ครบ 12 นาทีแล้วเลื่อยเบา ๆ หากยังงอให้พักเพิ่มอีก 3 นาที"
  );
  recipe.commonMistakes[1] = ml(
    "Biscotti can feel soft while warm; cool one slice completely before deciding. If it bends, bake the slices in 3-minute increments, lowering to 140°C if the almonds darken.",
    "義式脆餅趁熱時可能仍偏軟；先讓一片完全放涼再判斷。若會彎曲，切片每次續烤 3 分鐘；杏仁變深時降至 140°C。",
    "ビスコッティは温かいうちは柔らかく感じることがあります。1枚を完全に冷まして確認し、曲がる場合は3分ずつ焼き足します。アーモンドが濃くなったら140°Cに下げます。",
    "비스코티는 따뜻할 때 부드럽게 느껴질 수 있습니다. 한 조각을 완전히 식혀 확인하고 휘면 3분씩 더 굽습니다. 아몬드가 짙어지면 140°C로 낮춥니다.",
    "บิสคอตตีอาจยังนิ่มขณะอุ่น ให้พักชิ้นหนึ่งจนเย็นสนิทก่อนตัดสิน หากยังงอให้อบเพิ่มครั้งละ 3 นาที และลดเป็น 140°C หากอัลมอนด์เริ่มเข้ม"
  );
  addOfficialSource(recipe, "FDA — Handling Flour Safely", flourSafety);
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
}

function reviseFattoush(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Tear the pita into bite-size shards. Heat the pita oil in a skillet over medium and fry in a single layer, turning often, about 4 minutes until dry, crisp, and golden but not dark. If a cooled shard bends instead of snapping, return it to the pan for 1 minute; drain in one layer and keep uncovered so steam does not soften it.",
    "皮塔餅撕成一口大小。平底鍋以中火加熱煎脆用油，皮塔餅單層下鍋並常翻，約 4 分鐘至乾爽、酥脆、金黃但不焦深。若放涼後仍會彎而不脆裂，回鍋再煎 1 分鐘；單層瀝油且不加蓋，避免蒸氣讓它回軟。",
    "ピタを一口大にちぎります。フライパンに油を中火で熱し、重ならないように入れて頻繁に返しながら約4分、乾いてカリッとし、濃くなりすぎない黄金色にします。冷めた一片がパリッと割れず曲がる場合は1分焼き足します。一層に広げて油を切り、蒸気で柔らかくならないよう覆いません。",
    "피타를 한입 크기로 찢습니다. 팬에 기름을 중불로 데우고 한 겹으로 넣어 자주 뒤집으며 약 4분간 건조하고 바삭한 금빛이 나게 굽되 너무 짙게 만들지 않습니다. 식은 조각이 부러지지 않고 휘면 1분 더 굽습니다. 한 겹으로 기름을 빼고 김에 눅눅해지지 않도록 덮지 않습니다.",
    "ฉีกพิต้าเป็นชิ้นพอดีคำ ตั้งน้ำมันในกระทะไฟกลาง ใส่ขนมปังชั้นเดียว พลิกบ่อย ๆ ประมาณ 4 นาทีจนแห้งกรอบสีทองแต่ไม่เข้ม หากพักเย็นแล้วชิ้นยังงอไม่หัก ให้ทอดเพิ่ม 1 นาที พักให้สะเด็ดน้ำมันชั้นเดียวและไม่ปิดฝาเพื่อไม่ให้ไอน้ำทำให้นิ่ม"
  ));
  body(recipe, 1, ml(
    "Rinse the lettuce, cucumber, tomatoes, radishes, green onions, parsley, and mint under clean running water before cutting; do not use soap or bleach. Use a clean board and knife, then dry the lettuce and herbs thoroughly. Seed and dice the cucumber and tomatoes, and slice the radishes and onions. If the diced vegetables release a puddle, drain them before dressing so the salad stays crisp.",
    "生菜、小黃瓜、番茄、蘿蔔、青蔥、巴西里與薄荷先在乾淨流動水下沖洗再切；不可用肥皂或漂白水。使用乾淨砧板與刀，並把生菜、香草徹底擦乾。小黃瓜和番茄去籽切丁，蘿蔔與青蔥切片。若切好的蔬菜出水積在碗底，先瀝掉再拌醬，保持爽脆。",
    "レタス、きゅうり、トマト、ラディッシュ、青ねぎ、パセリ、ミントは切る前に清潔な流水で洗います。石けんや漂白剤は使いません。清潔なまな板と包丁を使い、レタスとハーブはよく乾かします。きゅうりとトマトは種を取って角切り、ラディッシュと青ねぎは薄切りにします。切った野菜から水が出て器にたまったら、ドレッシング前に水を切って食感を保ちます。",
    "상추, 오이, 토마토, 래디시, 쪽파, 파슬리와 민트는 자르기 전에 깨끗한 흐르는 물에 씻습니다. 비누나 표백제는 쓰지 않습니다. 깨끗한 도마와 칼을 쓰고 상추와 허브는 완전히 말립니다. 오이와 토마토는 씨를 빼고 깍둑썰며 래디시와 쪽파는 얇게 썹니다. 자른 채소에서 물이 고이면 드레싱 전에 따라내 아삭함을 지킵니다.",
    "ล้างผักกาด แตงกวา มะเขือเทศ หัวไชเท้า ต้นหอม พาร์สลีย์ และมิ้นต์ด้วยน้ำไหลสะอาดก่อนหั่น ห้ามใช้สบู่หรือน้ำยาฟอกขาว ใช้เขียงและมีดสะอาด แล้วซับผักกาดกับสมุนไพรให้แห้ง เอาเมล็ดแตงกวาและมะเขือเทศออกแล้วหั่นเต๋า ส่วนหัวไชเท้าและต้นหอมหั่นบาง หากผักที่หั่นแล้วมีน้ำขัง ให้เทออกก่อนปรุงเพื่อคงความกรอบ"
  ));
  body(recipe, 3, ml(
    "Combine the vegetables and herbs in a large bowl. Pour over most of the dressing and toss gently just until coated. If liquid pools at the bottom, lift the leaves and vegetables out with a slotted spoon and leave the excess behind; add the reserved dressing only if the salad tastes dry.",
    "蔬菜與香草放入大碗，先淋大部分醬汁，輕柔拌至均勻沾附即可。若碗底積水，用漏勺撈起葉菜與蔬菜、留下多餘液體；只有沙拉吃起來偏乾時才補上保留的醬汁。",
    "大きなボウルに野菜とハーブを入れます。ドレッシングの大半をかけ、全体に薄く絡むまでやさしく和えます。底に水分がたまったら穴あきスプーンで野菜をすくい、余分な液は残します。食べて乾いている場合だけ、残りのドレッシングを加えます。",
    "큰 볼에 채소와 허브를 넣습니다. 드레싱 대부분을 붓고 얇게 묻을 정도로 부드럽게 섞습니다. 바닥에 물이 고이면 구멍 난 스푼으로 채소를 건져 여분의 액체는 남깁니다. 샐러드가 퍽퍽할 때만 남겨 둔 드레싱을 더합니다.",
    "ใส่ผักและสมุนไพรในชามใหญ่ ราดน้ำสลัดส่วนใหญ่แล้วคลุกเบา ๆ แค่ให้เคลือบ หากมีน้ำขังที่ก้นชาม ให้ใช้ช้อนโปร่งตักผักขึ้นและทิ้งน้ำส่วนเกินไว้ เติมน้ำสลัดที่เหลือเฉพาะเมื่อชิมแล้วรู้สึกแห้ง"
  ));
  body(recipe, 4, ml(
    "Add the crisp pita just before serving and fold through once; keep extra shards separate. For make-ahead service, refrigerate the undressed vegetables and dressing at 4°C (40°F) or colder and keep pita airtight at room temperature. Dress and add pita at the table. Keep the assembled salad cold; discard it after 2 hours out of refrigeration, or after 1 hour above 32°C (90°F). This raw salad has no cooking-temperature endpoint.",
    "上桌前才加入酥脆皮塔餅，輕拌一次；多餘脆片分開放。若要預先準備，未拌醬的蔬菜與醬汁加蓋冷藏於 4°C（40°F）或以下，皮塔餅則在室溫密封保存。上桌時才拌醬並加脆片。組合後保持冷藏；離開冷藏超過 2 小時，或環境高於 32°C（90°F）超過 1 小時即丟棄。這道生食沙拉沒有烹調溫度終點。",
    "カリッとしたピタは食べる直前に加えて一度だけ混ぜ、余分は別に保ちます。前もって準備する場合、味付け前の野菜とドレッシングは4°C（40°F）以下で冷蔵し、ピタは室温で密閉保存します。食卓で和えてピタを加えます。組み立てたサラダは冷たく保ち、冷蔵外に2時間、または32°C（90°F）を超える環境で1時間置いたら廃棄します。この生サラダには加熱温度の基準はありません。",
    "바삭한 피타는 내기 직전에 넣고 한 번만 가볍게 섞으며 여분은 따로 둡니다. 미리 준비할 때는 양념하지 않은 채소와 드레싱을 덮어 4°C (40°F) 이하로 냉장하고 피타는 실온에서 밀폐 보관합니다. 식탁에서 드레싱과 피타를 섞습니다. 완성된 샐러드는 차갑게 두고 냉장 밖에 2시간, 32°C (90°F)보다 높은 환경에서는 1시간 넘게 두었다면 버립니다. 이 생샐러드에는 조리 온도 기준이 없습니다.",
    "ใส่พิต้ากรอบก่อนเสิร์ฟและคลุกเพียงครั้งเดียว เก็บชิ้นที่เหลือแยกไว้ หากเตรียมล่วงหน้า ให้ปิดฝาผักที่ยังไม่ปรุงและน้ำสลัดแช่ที่ 4°C (40°F) หรือต่ำกว่า ส่วนพิต้าเก็บปิดสนิทที่อุณหภูมิห้อง คลุกน้ำสลัดและใส่พิต้าที่โต๊ะ รักษาสลัดที่ผสมแล้วให้เย็น ทิ้งหากอยู่นอกตู้เย็นเกิน 2 ชั่วโมง หรือเกิน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C (90°F) สลัดดิบนี้ไม่มีอุณหภูมิสำหรับการปรุงให้สุก"
  ));
  recipe.commonMistakes[0] = ml(
    "Fattoush contains no bulgur; too much tomato or undried lettuce can still make it watery. Drain pooled vegetable liquid before dressing and dry the leaves thoroughly.",
    "Fattoush 不含 bulgur；番茄過多或生菜未擦乾仍會讓沙拉出水。拌醬前瀝掉蔬菜積水，並徹底擦乾葉菜。",
    "ファットゥーシュにブルグルは入りません。トマトが多すぎる、またはレタスが乾いていないと水っぽくなります。味付け前にたまった水分を切り、葉をよく乾かします。",
    "파투시는 불구르를 넣지 않습니다. 토마토가 너무 많거나 상추가 덜 마르면 물이 생깁니다. 양념 전에 고인 물을 따라내고 잎채소를 완전히 말리세요.",
    "ฟัตตูชไม่มีบัลเกอร์ มะเขือเทศมากเกินไปหรือผักกาดไม่แห้งก็ทำให้แฉะได้ เทน้ำผักที่ขังก่อนปรุงและซับใบผักให้แห้ง"
  );
  recipe.commonMistakes[1] = ml(
    "Dressing early or storing pita with the salad softens the bread. Keep the two separate and add the crisp shards immediately before serving; re-crisp limp pita in a dry 160°C oven for 3–4 minutes.",
    "太早拌醬或把皮塔餅和沙拉一起收納會使麵包回軟。兩者分開保存，上桌前才加酥脆餅片；變軟的皮塔餅可用 160°C 乾烤箱回烤 3–4 分鐘。",
    "早くから味付けする、またはピタをサラダと一緒に保存すると柔らかくなります。別々に保ち、食べる直前に加えます。しんなりしたピタは160°Cの乾いたオーブンで3〜4分焼き直します。",
    "미리 드레싱하거나 피타를 샐러드와 함께 보관하면 빵이 눅눅해집니다. 따로 두었다가 먹기 직전에 바삭한 피타를 넣으세요. 눅눅해진 피타는 마른 160°C 오븐에서 3–4분 다시 굽습니다.",
    "การปรุงล่วงหน้าหรือเก็บพิต้ารวมกับสลัดทำให้ขนมปังนิ่ม แยกเก็บและใส่พิต้ากรอบก่อนเสิร์ฟ หากพิต้านิ่ม ให้อบซ้ำในเตาแห้งที่ 160°C 3–4 นาที"
  );
  recipe.storage = ml(
    "For best texture, keep the washed and dried vegetables, dressing, and pita separate. Refrigerate the perishable vegetables and dressing at 4°C (40°F) or colder; use cut vegetables within 1 day for crispness. Keep pita airtight at room temperature. Refrigerate assembled leftovers within 2 hours (1 hour above 32°C/90°F), eat the same day, and do not freeze the salad.",
    "為保持口感，洗淨擦乾的蔬菜、醬汁與皮塔餅分開保存。易腐蔬菜與醬汁在 4°C（40°F）或以下冷藏；切好的蔬菜為保持爽脆，1 天內使用。皮塔餅密封室溫保存。組合後的剩食 2 小時內冷藏（高於 32°C／90°F 時 1 小時內），當天食用，不要冷凍沙拉。",
    "食感を保つには、洗って乾かした野菜、ドレッシング、ピタを別々に保管します。傷みやすい野菜とドレッシングは4°C（40°F）以下で冷蔵し、切った野菜は食感のため1日以内に使います。ピタは密閉して室温保存します。組み立てた残りは2時間以内（32°C／90°Fを超える場合は1時間以内）に冷蔵し、当日中に食べます。サラダは冷凍しません。",
    "식감을 위해 씻어 말린 채소, 드레싱과 피타를 따로 보관합니다. 부패하기 쉬운 채소와 드레싱은 4°C (40°F) 이하로 냉장하고 자른 채소는 아삭함을 위해 1일 안에 씁니다. 피타는 밀폐해 실온 보관합니다. 완성된 남은 샐러드는 2시간 안에 (32°C/90°F보다 높으면 1시간 안에) 냉장해 당일 먹고 냉동하지 않습니다.",
    "เพื่อคงความกรอบ ให้เก็บผักที่ล้างและซับแห้ง น้ำสลัด และพิต้าแยกกัน แช่ผักและน้ำสลัดที่เสียง่ายที่ 4°C (40°F) หรือต่ำกว่า ใช้ผักที่หั่นแล้วภายใน 1 วันเพื่อให้กรอบ เก็บพิต้าปิดสนิทที่อุณหภูมิห้อง แช่เย็นสลัดที่ผสมแล้วภายใน 2 ชั่วโมง (1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C/90°F) กินภายในวันเดียว และไม่แช่แข็งสลัด"
  );
  addOfficialSource(recipe, "FDA — 7 Tips for Cleaning Fruits and Vegetables", produceSafety);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

function reviseFrenchCrepes(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Whisk the flour, sugar, and salt. Add the eggs and 150 ml milk, then whisk from the centre outward until smooth with no dry pockets. Do not taste raw batter: both uncooked flour and eggs can carry harmful bacteria. Keep it away from ready-to-eat food and wash hands, bowl, whisk, and work surface after contact.",
    "麵粉、糖與鹽拌勻，加入雞蛋和 150 毫升牛奶，由中心向外攪打至滑順、沒有乾粉結塊。不要試吃生麵糊：生麵粉和雞蛋都可能帶有有害細菌。麵糊應遠離即食食物；接觸後清洗雙手、盆、打蛋器與工作檯。",
    "小麦粉、砂糖、塩を混ぜます。卵と牛乳150mlを加え、中心から外へ混ぜて粉だまりのない滑らかな生地にします。生の小麦粉と卵には有害な細菌が含まれることがあるため、生地を味見しません。すぐ食べる食品から離し、触れた後は手、ボウル、泡立て器、作業台を洗います。",
    "밀가루, 설탕과 소금을 섞습니다. 달걀과 우유 150ml를 넣고 가운데서 바깥쪽으로 저어 마른 가루 없이 매끈하게 만듭니다. 익히지 않은 밀가루와 달걀에는 해로운 세균이 있을 수 있으므로 생반죽을 맛보지 마세요. 바로 먹는 음식과 분리하고 손, 볼, 거품기와 작업대를 씻습니다.",
    "ตีแป้ง น้ำตาล และเกลือให้เข้ากัน ใส่ไข่กับนม 150 มล. แล้วตีจากกลางออกด้านนอกจนเนียนไม่มีก้อนแป้งแห้ง อย่าชิมแป้งดิบ เพราะแป้งสาลีและไข่ที่ยังไม่สุกอาจมีแบคทีเรียอันตราย แยกจากอาหารพร้อมกิน และล้างมือ ชาม ตะกร้อมือ และพื้นเตรียมอาหารหลังสัมผัส"
  ));
  body(recipe, 1, ml(
    "Melt the butter and cool it for 5 minutes. Whisk it into the batter with 170 ml of the remaining milk, reserving the last 30 ml. Cover and refrigerate for 30 minutes. After resting, whisk in the reserved milk 15 ml at a time only if the batter falls in a thick ribbon rather than a thin, pourable stream. Keep batter at 4°C (40°F) or colder if the pan is not ready.",
    "奶油融化後放涼 5 分鐘。與麵糊和剩餘牛奶中的 170 毫升拌勻，保留最後 30 毫升。加蓋冷藏 30 分鐘。靜置後若麵糊落下呈厚帶而非細薄可流動的線條，才每次加入 15 毫升保留牛奶調稀。若平底鍋尚未準備好，麵糊保持在 4°C（40°F）或以下冷藏。",
    "バターを溶かして5分冷まします。残りの牛乳から170mlを生地に混ぜ、最後の30mlは取っておきます。蓋をして30分冷蔵します。休ませた後、生地が細く流れず太い帯状に落ちる場合だけ、取っておいた牛乳を15mlずつ加えて薄めます。フライパンの準備ができていなければ、生地は4°C（40°F）以下で冷蔵します。",
    "버터를 녹여 5분 식힙니다. 남은 우유 중 170ml를 반죽에 섞고 마지막 30ml는 남깁니다. 덮어 30분 냉장 휴지합니다. 휴지 후 반죽이 가늘게 흐르지 않고 굵은 리본처럼 떨어질 때만 남겨 둔 우유를 15ml씩 넣어 묽게 합니다. 팬이 준비되지 않았다면 반죽을 4°C (40°F) 이하로 냉장합니다.",
    "ละลายเนยแล้วพักให้เย็น 5 นาที ตีรวมกับแป้งและนมส่วนที่เหลือ 170 มล. โดยเก็บ 30 มล.สุดท้ายไว้ ปิดฝาแช่เย็น 30 นาที หลังพัก หากแป้งไหลเป็นสายหนาแทนที่จะไหลบาง ๆ จึงค่อยเติมนมที่เก็บไว้ครั้งละ 15 มล. หากกระทะยังไม่พร้อม ให้เก็บแป้งที่ 4°C (40°F) หรือต่ำกว่า"
  ));
  body(recipe, 3, ml(
    "Heat a 24–25 cm nonstick pan over medium for 2 minutes and brush with a thin film of butter. Lift the pan, pour in about 50 ml batter, and tilt at once to cover it in a thin round. Cook 60–90 seconds until the wet shine disappears, the top looks matte, and the edge releases. If the batter sets before it reaches the edge, lower the heat slightly before the next crêpe.",
    "24–25 公分不沾鍋以中火預熱 2 分鐘，薄刷奶油。將鍋稍微離火，倒入約 50 毫升麵糊並立刻傾斜，攤成薄圓片。煎 60–90 秒，至濕亮消失、表面呈霧面且邊緣鬆開。若麵糊還沒流到鍋邊就已定型，下一張前稍微轉小火。",
    "直径24〜25cmのフッ素加工フライパンを中火で2分温め、バターを薄く塗ります。鍋を少し持ち上げて生地約50mlを流し、すぐ傾けて薄い円形に広げます。60〜90秒焼き、濡れた艶が消えて表面がマットになり、縁がはがれるまで待ちます。縁まで広がる前に固まる場合は、次の生地を入れる前に火を少し弱めます。",
    "24–25cm 논스틱 팬을 중불에서 2분 예열하고 버터를 얇게 바릅니다. 팬을 들어 반죽 약 50ml를 붓고 즉시 기울여 얇은 원으로 펼칩니다. 60–90초 익혀 젖은 윤기가 사라지고 윗면이 무광이며 가장자리가 떨어질 때까지 둡니다. 가장자리까지 퍼지기 전에 굳으면 다음 크레페부터 불을 조금 낮춥니다.",
    "อุ่นกระทะไม่ติดขนาด 24–25 ซม. ด้วยไฟกลาง 2 นาที แล้วทาเนยบาง ๆ ยกกระทะขึ้นเล็กน้อย เทแป้งประมาณ 50 มล. แล้วเอียงทันทีให้เป็นแผ่นบางกลม ปรุง 60–90 วินาทีจนความเงาเปียกหาย ผิวด้าน และขอบคลาย หากแป้งเซ็ตก่อนจะไหลถึงขอบ ให้ลดไฟเล็กน้อยก่อนทำแผ่นถัดไป"
  ));
  body(recipe, 4, ml(
    "Slide a broad thin spatula under the released edge and turn the crêpe. Cook 20–30 seconds until lightly golden and set through the centre with no wet batter. If the centre still looks shiny, cook 10 seconds more; if the pan browns the surface before it sets, lower the heat. Transfer to a plate and keep covered loosely with a clean cloth.",
    "用寬而薄的鍋鏟從已鬆開的邊緣下方滑入並翻面。再煎 20–30 秒至淡金黃、中心定型且沒有濕麵糊。若中心仍發亮，再煎 10 秒；若表面尚未定型就先變深，轉小火。移至盤中，鬆鬆蓋上乾淨布巾保溫。",
    "縁がはがれたら幅広で薄いフライ返しを差し込み、裏返します。20〜30秒焼き、薄く色づいて中心まで固まり、生地が濡れて残らない状態にします。中心に艶が残る場合は10秒追加します。固まる前に焼き色が濃くなる場合は火を弱めます。皿に移し、清潔な布をふんわりかけます。",
    "가장자리가 떨어지면 넓고 얇은 뒤집개를 넣어 뒤집습니다. 20–30초 더 구워 옅은 금빛이 나고 가운데까지 익어 젖은 반죽이 없게 합니다. 가운데가 아직 윤기 나면 10초 더 굽고, 익기 전에 표면이 짙어지면 불을 낮춥니다. 접시에 옮겨 깨끗한 천을 느슨하게 덮습니다.",
    "สอดพายแบนกว้างใต้ขอบที่คลายแล้วและพลิก อบอีก 20–30 วินาทีจนเป็นสีทองอ่อน ตรงกลางเซ็ตตัวและไม่มีแป้งเปียก หากกลางแผ่นยังเงา ให้อบเพิ่ม 10 วินาที หากผิวเข้มก่อนแป้งเซ็ต ให้ลดไฟ ย้ายใส่จานและคลุมหลวม ๆ ด้วยผ้าสะอาด"
  ));
  recipe.commonMistakes[0] = ml(
    "Turning while the surface is still glossy tears the crêpe. Wait until it is matte and the edge releases; if it begins to tear, lay it flat again and cook 10 seconds before loosening with a thin spatula.",
    "表面仍濕亮就翻面會撕破可麗餅。等到表面轉霧面、邊緣鬆開再翻；若開始撕裂，先平放回鍋再煎 10 秒，之後用薄鍋鏟鬆開。",
    "表面に艶が残るうちに返すと破れます。表面がマットになり縁がはがれるまで待ちます。破れ始めたら一度平らに戻して10秒焼き、薄いヘラでゆっくりはがします。",
    "윗면에 윤기가 남았을 때 뒤집으면 찢어집니다. 무광이 되고 가장자리가 떨어질 때까지 기다리세요. 찢어지기 시작하면 다시 평평하게 놓고 10초 더 익힌 뒤 얇은 뒤집개로 천천히 떼세요.",
    "การพลิกขณะที่ผิวยังเงาเปียกทำให้เครปฉีก รอให้ผิวด้านและขอบคลาย หากเริ่มฉีก ให้วางกลับลงกระทะและปรุงอีก 10 วินาทีก่อนค่อย ๆ แซะด้วยพายบาง"
  );
  recipe.commonMistakes[1] = ml(
    "A thick batter does not spread before setting. Keep 30 ml of the measured milk in reserve and whisk it in 15 ml at a time until the batter pours in a thin stream; if a crêpe browns before spreading, lower the pan heat.",
    "麵糊太稠會在攤開前就定型。先保留量好的 30 毫升牛奶，每次加入 15 毫升拌勻，直到麵糊能細流；若可麗餅尚未攤開就上色，降低鍋溫。",
    "生地が濃いと広がる前に固まります。計量した牛乳30mlを取っておき、細く流れるまで15mlずつ加えます。広がる前に色づく場合はフライパンの火を弱めます。",
    "반죽이 되직하면 퍼지기 전에 굳습니다. 계량한 우유 30ml를 남겨 두었다가 가는 줄기로 흐를 때까지 15ml씩 넣어 섞으세요. 퍼지기 전에 갈색이 나면 팬의 불을 낮춥니다.",
    "แป้งที่ข้นเกินจะแข็งก่อนแผ่ เก็บนมที่ตวงไว้ 30 มล. แล้วค่อยตีเพิ่มครั้งละ 15 มล.จนแป้งไหลเป็นสายบาง หากเครปเริ่มเข้มก่อนแผ่ ให้ลดไฟกระทะ"
  );
  recipe.storage = ml(
    "Keep raw batter covered at 4°C (40°F) or colder for up to 1 day. Refrigerate cooked crêpes within 2 hours (1 hour above 32°C/90°F) and use within 2 days. Reheat the portion until the centre of the stack reaches 74°C (165°F).",
    "生麵糊加蓋後在 4°C（40°F）或以下冷藏最多 1 天。熟可麗餅於 2 小時內冷藏（高於 32°C／90°F 時 1 小時內），2 天內食用。取需要份量回熱至整疊中心達 74°C（165°F）。",
    "生地は蓋をして4°C（40°F）以下で最長1日冷蔵します。焼いたクレープは2時間以内（32°C／90°Fを超える場合は1時間以内）に冷蔵し、2日以内に食べます。必要な分を重ね、中心が74°C（165°F）に達するまで再加熱します。",
    "생반죽은 덮어 4°C (40°F) 이하에서 최대 1일 냉장합니다. 구운 크레페는 2시간 안에 (32°C/90°F보다 높으면 1시간 안에) 냉장하고 2일 안에 먹습니다. 먹을 만큼 겹쳐 가운데까지 74°C (165°F)에 도달하도록 다시 데웁니다.",
    "ปิดฝาแป้งดิบและแช่ที่ 4°C (40°F) หรือต่ำกว่าได้ไม่เกิน 1 วัน แช่เครปที่สุกแล้วภายใน 2 ชั่วโมง (1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C/90°F) และกินภายใน 2 วัน อุ่นส่วนที่จะกินจนตรงกลางกองถึง 74°C (165°F)"
  );
  addOfficialSource(recipe, "FDA — Handling Flour Safely", flourSafety);
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
}

function reviseRibollita(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 1, ml(
    "Add the tomatoes, half the beans, and vegetable stock to the pot. Mash the remaining beans with 150 ml stock until coarse, then stir them in. Simmer uncovered for 20 minutes, stirring from the bottom twice; stop when the beans begin to break down and the broth lightly coats a spoon. If it thickens before the greens are ready, loosen it with 60 ml hot water or stock.",
    "鍋中加入番茄、一半白豆與蔬菜高湯。其餘白豆和 150 毫升高湯粗略壓碎後拌入。揭蓋燉煮 20 分鐘，其間從鍋底攪拌兩次；白豆開始化開、湯汁可薄薄附著湯匙即合適。若蔬菜尚未準備好湯已過稠，每次加 60 毫升熱水或高湯調稀。",
    "トマト、豆の半量、野菜ブロスを鍋に加えます。残りの豆をブロス150mlで粗くつぶして混ぜ入れます。蓋をせず20分煮て、途中で底から2回混ぜます。豆が少し崩れ始め、スープがスプーンに薄く絡む状態が目安です。青菜が煮える前に濃くなったら、熱湯またはブロスを60mlずつ加えてのばします。",
    "토마토, 콩 절반과 채소 육수를 냄비에 넣습니다. 남은 콩은 육수 150ml와 거칠게 으깨 넣습니다. 뚜껑을 열고 20분 끓이며 두 번 바닥을 저어 줍니다. 콩이 조금씩 풀리고 국물이 숟가락에 얇게 묻을 때까지 끓입니다. 채소가 익기 전에 너무 걸쭉해지면 뜨거운 물이나 육수를 60ml씩 넣어 풉니다.",
    "ใส่มะเขือเทศ ถั่วครึ่งหนึ่ง และน้ำสต็อกผักลงหม้อ บดถั่วที่เหลือกับน้ำสต็อก 150 มล.แบบหยาบแล้วคนลงไป เคี่ยวเปิดฝา 20 นาที คนก้นหม้อสองครั้ง หยุดเมื่อถั่วเริ่มแตกและน้ำซุปเคลือบช้อนบาง ๆ หากข้นก่อนผักใบเขียวสุก ให้เติมน้ำร้อนหรือน้ำสต็อกครั้งละ 60 มล."
  ));
  body(recipe, 2, ml(
    "Add the cavolo nero and savoy cabbage. Simmer uncovered for 20–25 minutes, turning the greens under the broth once or twice, until the thickest stems are tender when pressed with a spoon and the leaves no longer feel tough. If the stems still resist, simmer 5 minutes more before adding bread; add 60 ml hot water if the pot is drying out.",
    "加入黑羽衣甘藍與皺葉甘藍。揭蓋燉 20–25 分鐘，期間把菜葉翻入湯中一兩次，至最粗菜梗可用湯匙壓軟、葉片不再韌硬。若菜梗仍有阻力，先多燉 5 分鐘再加麵包；鍋中若快燒乾，加 60 毫升熱水。",
    "カーボロネロとサボイキャベツを加えます。蓋をせず20〜25分煮て、途中で1〜2回、葉をブロスに沈めます。最も太い茎をスプーンで押して柔らかく、葉が硬く感じなくなるまで煮ます。茎にまだ抵抗があればパンを加える前に5分追加し、鍋が乾きそうなら熱湯を60ml加えます。",
    "케일과 사보이 양배추를 넣습니다. 뚜껑을 열고 20–25분 끓이며 한두 번 잎을 국물 아래로 뒤집습니다. 가장 굵은 줄기를 숟가락으로 눌렀을 때 부드럽고 잎이 질기지 않을 때까지 익힙니다. 줄기가 여전히 단단하면 빵을 넣기 전에 5분 더 끓이고, 냄비가 마르면 뜨거운 물 60ml를 넣습니다.",
    "ใส่คาโวโลเนโรและกะหล่ำปลีซาวอย เคี่ยวเปิดฝา 20–25 นาที พลิกผักลงในน้ำซุปหนึ่งหรือสองครั้งจนก้านที่หนาที่สุดนุ่มเมื่อกดด้วยช้อนและใบไม่เหนียว หากก้านยังต้าน ให้เคี่ยวเพิ่ม 5 นาทีก่อนใส่ขนมปัง เติมน้ำร้อน 60 มล.หากหม้อเริ่มแห้ง"
  ));
  body(recipe, 3, ml(
    "Turn off the heat and fold in the torn stale country bread, pressing it under the broth. Cover and rest 20 minutes so it absorbs the liquid. If the bread is still firm in the centre, rest 5 minutes more; if the soup becomes too stiff to stir, loosen with 60 ml hot stock or water. Do not add more bread until the first pieces soften.",
    "關火後拌入撕碎的隔夜鄉村麵包，壓入湯汁下方。加蓋靜置 20 分鐘讓麵包吸收湯汁。若麵包中心仍硬，再放 5 分鐘；若湯稠到難以攪拌，每次加 60 毫升熱高湯或水調開。第一批麵包變軟前不要再加麵包。",
    "火を止め、ちぎった乾燥したカントリーブレッドを加えてブロスに押し込みます。蓋をして20分休ませ、液を吸わせます。パンの中心がまだ硬ければさらに5分休ませます。混ぜにくいほど固くなったら、熱いブロスまたは水を60mlずつ加えてゆるめます。最初のパンが柔らかくなる前にパンを追加しません。",
    "불을 끄고 찢은 묵은 컨트리 브레드를 넣어 국물 아래로 눌러 줍니다. 덮어 20분 두어 액체를 흡수하게 합니다. 빵 가운데가 아직 단단하면 5분 더 두고, 저을 수 없을 정도로 뻑뻑해지면 뜨거운 육수나 물을 60ml씩 넣어 풉니다. 첫 빵이 부드러워지기 전에 빵을 더 넣지 마세요.",
    "ปิดไฟแล้วใส่ขนมปังชนบทเก่าที่ฉีกเป็นชิ้น กดให้จมในน้ำซุป ปิดฝาพัก 20 นาทีให้ดูดน้ำ หากกลางขนมปังยังแข็ง ให้พักเพิ่ม 5 นาที หากข้นจนคนยาก ให้เติมน้ำสต็อกหรือน้ำร้อนครั้งละ 60 มล. อย่าใส่ขนมปังเพิ่มจนกว่าชิ้นแรกจะนิ่ม"
  ));
  body(recipe, 4, ml(
    "Bring the soup back to a gentle simmer and cook 10 minutes, stirring often, until thick enough to mound softly on a spoon but still moist. If it is loose, simmer uncovered 5 minutes and reassess; if it is stiff, add 60 ml hot stock or water. Taste and adjust salt only after the bread and beans have absorbed the broth. Serve with olive oil and black pepper; this vegetarian recipe contains no meat or cured meat.",
    "重新加熱至溫和微滾，續煮 10 分鐘並常攪拌，至濃稠可柔軟堆在湯匙上但仍保濕。若太稀，揭蓋再煮 5 分鐘後檢查；若太稠，每次加 60 毫升熱高湯或水。等麵包和白豆吸收湯汁後才試味補鹽。淋橄欖油、撒黑胡椒上桌；這道素食食譜不含肉類或醃肉。",
    "穏やかに再沸騰させ、よく混ぜながら10分煮ます。スプーンにふんわり盛れる濃さでも、乾かず湿り気が残る状態にします。ゆるければ蓋をせず5分煮て再確認し、固ければ熱いブロスまたは水を60mlずつ加えます。パンと豆がブロスを吸ってから塩味を調整します。オリーブ油と黒こしょうを添えます。このベジタリアン料理に肉や塩漬け肉は入りません。",
    "다시 약하게 끓이고 자주 저으며 10분 익혀 숟가락 위에 부드럽게 얹히되 촉촉하게 유지합니다. 묽으면 뚜껑을 열고 5분 끓인 뒤 확인하고, 너무 되면 뜨거운 육수나 물을 60ml씩 넣습니다. 빵과 콩이 국물을 흡수한 뒤 소금을 맞춥니다. 올리브오일과 후추를 곁들여 냅니다. 이 채식 요리에는 고기나 염장육이 들어가지 않습니다.",
    "อุ่นซุปจนเดือดอ่อนอีกครั้ง ต้ม 10 นาทีและคนบ่อย ๆ จนข้นพอจะกองนุ่มบนช้อนได้แต่ยังชุ่ม หากเหลวให้ต้มเปิดฝาเพิ่ม 5 นาทีแล้วตรวจ หากแข็งข้นให้เติมน้ำสต็อกหรือน้ำร้อนครั้งละ 60 มล. ชิมและปรับเกลือหลังขนมปังกับถั่วดูดน้ำซุปแล้ว เสิร์ฟกับน้ำมันมะกอกและพริกไทยดำ สูตรมังสวิรัตินี้ไม่มีเนื้อหรือเนื้อหมัก"
  ));
  recipe.commonMistakes[0] = ml(
    "This ribollita contains no meat: the beans give the broth body. If the soup is thin after the bread rests, simmer uncovered for 5 minutes; if it becomes stiff, loosen it with 60 ml hot stock or water.",
    "這道 ribollita 不含肉類，湯的濃厚感來自白豆。麵包靜置後若湯仍稀，揭蓋燉 5 分鐘；若變得太稠，每次加 60 毫升熱高湯或水調開。",
    "このリボッリータに肉は入りません。豆がスープに濃度を与えます。パンを休ませた後も薄ければ蓋をせず5分煮て、固くなりすぎたら熱いブロスまたは水を60mlずつ加えてゆるめます。",
    "이 리볼리타에는 고기가 들어가지 않으며 콩이 국물에 농도를 줍니다. 빵을 불린 뒤에도 묽으면 뚜껑을 열고 5분 끓이고, 너무 되면 뜨거운 육수나 물을 60ml씩 넣어 풉니다.",
    "ริโบลลิตตาสูตรนี้ไม่มีเนื้อ ถั่วช่วยให้น้ำซุปข้น หากพักขนมปังแล้วยังเหลว ให้เคี่ยวเปิดฝา 5 นาที หากข้นแข็งให้เติมน้ำสต็อกหรือน้ำร้อนครั้งละ 60 มล."
  );
  recipe.commonMistakes[1] = ml(
    "Salted or cured meat and cheese are not ingredients in this vegetarian recipe. Season after the beans and bread have absorbed the broth, then add salt gradually so the reduced soup does not become too salty.",
    "這道素食食譜沒有醃肉、肉類或起司。等白豆與麵包吸收湯汁後再調味，並逐次加鹽，避免湯汁濃縮後過鹹。",
    "このベジタリアンレシピには塩漬け肉、肉、チーズは入りません。豆とパンがブロスを吸ってから味を調え、煮詰まって塩辛くならないよう塩は少しずつ加えます。",
    "이 채식 레시피에는 염장육, 고기, 치즈가 들어가지 않습니다. 콩과 빵이 국물을 흡수한 뒤 간을 하고, 졸아 짜지 않도록 소금은 조금씩 더합니다.",
    "สูตรมังสวิรัตินี้ไม่มีเนื้อหมัก เนื้อ หรือชีส ปรุงรสหลังถั่วและขนมปังดูดน้ำซุปแล้ว และเติมเกลือทีละน้อยเพื่อไม่ให้เค็มเกินเมื่อน้ำงวด"
  );
  recipe.storage = ml(
    "Divide leftovers into shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C (40°F) or colder; use within 3–4 days or freeze. Reheat only the portion needed, stirring, until it reaches 74°C (165°F) throughout. This is a leftover reheating target, not the texture test for freshly cooked soup.",
    "剩食分裝至淺容器，2 小時內冷藏（高於 32°C／90°F 時 1 小時內），冰箱保持 4°C（40°F）或以下；3–4 天內食用或冷凍。只取需要份量，邊攪拌邊回熱至整體達 74°C（165°F）。這是剩食回熱目標，不是新煮湯品的口感判斷。",
    "残りは浅い容器に分け、2時間以内（32°C／90°Fを超える場合は1時間以内）に4°C（40°F）以下で冷蔵します。3〜4日以内に食べるか冷凍します。食べる分だけ混ぜながら全体が74°C（165°F）に達するまで再加熱します。これは残りの再加熱目標で、新しく作ったスープの食感基準ではありません。",
    "남은 음식은 얕은 용기에 나누어 2시간 안에 (32°C/90°F보다 높으면 1시간 안에) 4°C (40°F) 이하로 냉장합니다. 3–4일 안에 먹거나 냉동합니다. 먹을 양만 저으면서 속까지 74°C (165°F)에 도달하도록 다시 데웁니다. 이는 남은 음식 재가열 목표이며 갓 끓인 수프의 식감 기준은 아닙니다.",
    "แบ่งของเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C/90°F) ที่ 4°C (40°F) หรือต่ำกว่า กินภายใน 3–4 วันหรือแช่แข็ง อุ่นเฉพาะส่วนที่จะกิน คนไปด้วยจนร้อนทั่วถึง 74°C (165°F) นี่เป็นเป้าหมายการอุ่นของเหลือ ไม่ใช่เกณฑ์เนื้อสัมผัสของซุปที่เพิ่งทำ"
  );
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
}

export function refineSeventyEighthMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseCantucci(byId.get("cantucci"));
  reviseFattoush(byId.get("fattoush"));
  reviseFrenchCrepes(byId.get("french-crepes"));
  reviseRibollita(byId.get("ribollita"));
  return recipes;
}
