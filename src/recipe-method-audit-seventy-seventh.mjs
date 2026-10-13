const flourSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const produceSafety = "https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function preparePublicationCopy(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
}

function addOfficialSource(recipe, label, url) {
  const title = `Official food-safety guidance — ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function reviseFinanciers(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 2, ml(
    "Stir the pasteurized egg whites, honey, and vanilla into the dry mix without whipping. Fold in the warm brown butter until glossy and uniform. Do not taste the batter: pasteurized whites do not make raw flour safe. After handling flour or batter, wash hands, bowls, utensils, moulds, and the work surface with warm, soapy water.",
    "巴氏殺菌蛋白、蜂蜜與香草拌入粉類，不需打發；再拌入溫焦化奶油至光亮均勻。不要試吃麵糊：巴氏殺菌蛋白並不能讓生麵粉變安全。處理麵粉或麵糊後，以溫熱肥皂水清洗雙手、碗盆、器具、模具與工作檯。",
    "低温殺菌済み卵白、はちみつ、バニラを泡立てずに粉類へ混ぜます。温かい焦がしバターを艶が出るまで折り込みます。低温殺菌卵白でも生の小麦粉は安全にならないため、生地を味見しません。粉や生地を扱った後は、手、ボウル、器具、型、作業台を温かい石けん水で洗います。",
    "살균 난백, 꿀, 바닐라를 휘핑하지 않고 가루에 섞습니다. 따뜻한 브라운 버터를 윤기가 날 때까지 접어 넣습니다. 살균 난백을 써도 생밀가루가 안전해지는 것은 아니므로 반죽을 맛보지 마세요. 밀가루나 반죽을 다룬 뒤 손, 볼, 도구, 틀과 작업대를 따뜻한 비눗물로 씻습니다.",
    "คนไข่ขาวพาสเจอไรซ์ น้ำผึ้ง และวานิลลากับของแห้งโดยไม่ตีฟู แล้วตะล่อมบราวน์บัตเตอร์อุ่นจนเงา อย่าชิมแป้งดิบ เพราะไข่ขาวพาสเจอไรซ์ไม่ได้ทำให้แป้งสาลีดิบปลอดภัย หลังจับแป้งหรือส่วนผสม ให้ล้างมือ ชาม อุปกรณ์ พิมพ์ และพื้นเตรียมอาหารด้วยน้ำอุ่นผสมน้ำยาล้างจาน"
  ));
  body(recipe, 4, ml(
    "Heat the oven to 200°C. Lightly butter eight shallow rectangular financier moulds and divide the batter evenly. Bake 12 minutes before checking the largest cake: the edges should be deep golden, the top set, and the centre should spring back lightly; a thin skewer may carry a few moist crumbs but no glossy batter. As a separate food-safety check, insert a clean thin instant-read thermometer from the side into the centre of the largest cake; an egg dish should reach 71°C (160°F). If the centre is wet or below 71°C, bake 2 minutes more and recheck. If the rims darken first, tent loosely with foil and reduce to 180°C. Once safe and tender, remove the cakes so their centres stay moist rather than dry.",
    "烤箱預熱至 200°C。8 個淺長方費南雪模薄抹奶油，麵糊平均分入。先烤 12 分鐘再檢查最大顆：邊緣應深金黃、表面已定型，中央輕按會微微回彈；細竹籤可帶少量濕潤碎屑，但不可沾到發亮的生麵糊。另作食安檢查時，用乾淨細探針從側面插入最大顆中央；含蛋點心應達 71°C（160°F）。若中央仍有濕麵糊或低於 71°C，每次續烤 2 分鐘後重測。若邊緣先變深，鬆蓋鋁箔並降至 180°C。確認安全且仍柔嫩就出爐，避免把中心烤乾。",
    "オーブンを200°Cに温めます。浅い長方形のフィナンシェ型8個に薄くバターを塗り、生地を均等に分けます。まず12分焼いて最大のケーキを確認します。縁は濃いきつね色、表面は固まり、中心は軽く押すと少し戻る状態にします。細い竹串には湿った細かな屑が少し付いてもよいですが、光沢のある生地は付けません。食の安全は別に確認します。清潔で細い即読式温度計を最大のケーキの側面から中心へ差し、卵入り料理の基準である71°C（160°F）に達させます。中心に湿った生地がある、または71°C未満なら2分ずつ追加して再確認します。縁が先に濃くなる場合はホイルをふんわりかけ、180°Cに下げます。安全で柔らかいうちに取り出し、中心を乾かしません。",
    "오븐을 200°C로 예열합니다. 얕은 직사각 피낭시에 틀 8개에 버터를 얇게 바르고 반죽을 고르게 나눕니다. 먼저 12분 구운 뒤 가장 큰 케이크를 확인합니다. 가장자리는 짙은 금빛이고 윗면은 굳었으며 가운데는 가볍게 눌렀을 때 살짝 되돌아와야 합니다. 가는 꼬치에 촉촉한 부스러기가 조금 묻을 수 있지만 윤기 나는 생반죽은 묻으면 안 됩니다. 식품 안전은 별도로 확인합니다. 깨끗하고 가는 즉시 판독 온도계를 가장 큰 케이크 옆면에서 가운데로 넣어 달걀이 든 음식의 기준인 71°C (160°F)에 도달하게 합니다. 가운데가 젖었거나 71°C보다 낮으면 2분씩 더 굽고 다시 확인합니다. 가장자리가 먼저 짙어지면 포일을 느슨하게 덮고 180°C로 낮춥니다. 안전하고 부드러울 때 꺼내 가운데가 마르지 않게 합니다.",
    "อุ่นเตาอบที่ 200°C ทาเนยบาง ๆ ในพิมพ์ฟินองเซียสี่เหลี่ยมตื้น 8 ช่อง แล้วแบ่งแป้งเท่า ๆ กัน อบ 12 นาทีก่อนตรวจชิ้นที่ใหญ่ที่สุด ขอบควรเป็นสีทองเข้ม ผิวหน้าเซ็ตตัว และตรงกลางเด้งกลับเล็กน้อยเมื่อกด ไม้ทดสอบปลายเล็กอาจมีเศษขนมชุ่มชื้นติดเล็กน้อย แต่ต้องไม่มีแป้งดิบเงา ๆ การตรวจความปลอดภัยเป็นอีกขั้นหนึ่ง ใช้เทอร์โมมิเตอร์อ่านเร็วปลายเล็กที่สะอาดแทงจากด้านข้างเข้าไปกลางชิ้นใหญ่ที่สุด อาหารที่มีไข่ควรถึง 71°C (160°F) หากกลางขนมยังเปียกหรืออุณหภูมิต่ำกว่า 71°C ให้อบเพิ่มครั้งละ 2 นาทีแล้วตรวจซ้ำ หากขอบเข้มก่อน ให้คลุมฟอยล์หลวม ๆ และลดเตาเป็น 180°C เมื่อสุกปลอดภัยและยังนุ่มให้นำออก เพื่อไม่ให้ตรงกลางแห้ง"
  ));
  body(recipe, 5, ml(
    "Rest in the moulds for 5 minutes, then turn onto a rack. Cool completely until the edges feel crisp and the centres are tender, not wet. If the undersides soften as they cool, return the cakes to a 150°C oven for 3–4 minutes, then cool on the rack again; do not keep baking just to remove the tender crumb.",
    "在模具中放 5 分鐘，再脫模至網架。完全放涼至邊緣摸起來酥脆、中心柔嫩但不濕黏。若放涼時底部變軟，放回 150°C 烤箱 3–4 分鐘，再回網架放涼；不要為了消除柔軟蛋糕心而持續烘烤。",
    "型で5分休ませてから網に外します。縁はさくっとし、中心は湿っていないのに柔らかい状態まで完全に冷まします。冷める間に底が柔らかくなったら150°Cのオーブンで3〜4分温め直し、再び網で冷まします。しっとりした食感をなくすために焼き続けないでください。",
    "틀에서 5분 둔 뒤 식힘망에 꺼냅니다. 가장자리는 바삭하고 가운데는 젖지 않으면서 부드러운 상태로 완전히 식힙니다. 식으면서 밑면이 눅눅해지면 150°C 오븐에 3–4분 다시 넣었다가 망에서 식히세요. 촉촉한 케이크 속을 없애려고 계속 굽지 마세요.",
    "พักในพิมพ์ 5 นาทีแล้วแกะลงตะแกรง พักให้เย็นสนิทจนขอบกรอบและกลางขนมนุ่มแต่ไม่เปียก หากก้นขนมนิ่มลงระหว่างพัก ให้นำกลับเข้าเตา 150°C อีก 3–4 นาที แล้วพักบนตะแกรงอีกครั้ง อย่าอบต่อเพียงเพื่อไล่ความชุ่มนุ่มของเนื้อขนม"
  ));
  recipe.storage = ml(
    "Cool on a rack and refrigerate within 2 hours of baking, or within 1 hour when the room is above 32°C (90°F), at 4°C (40°F) or colder. Use within 3–4 days; freeze airtight for longer storage.",
    "在網架放涼，烤好後 2 小時內冷藏；室溫高於 32°C（90°F）時 1 小時內冷藏，冰箱保持 4°C（40°F）或以下。3–4 天內食用；久放請密封冷凍。",
    "網で冷まし、焼いてから2時間以内（室温が32°C／90°Fを超える場合は1時間以内）に4°C（40°F）以下で冷蔵します。3〜4日以内に食べ、長く保存する場合は密閉して冷凍します。",
    "식힘망에서 식히고 굽고 2시간 안에, 실내가 32°C (90°F)보다 높으면 1시간 안에 4°C (40°F) 이하로 냉장합니다. 3–4일 안에 먹고 더 오래 보관하려면 밀폐해 냉동합니다.",
    "พักบนตะแกรงและแช่เย็นภายใน 2 ชั่วโมงหลังอบ หรือภายใน 1 ชั่วโมงเมื่ออุณหภูมิห้องสูงกว่า 32°C (90°F) โดยแช่ที่ 4°C (40°F) หรือต่ำกว่า กินภายใน 3–4 วัน หากเก็บนานให้แช่แข็งในภาชนะปิดสนิท"
  );
  addOfficialSource(recipe, "FDA — Handling Flour Safely", flourSafety);
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseSaskatoonBerryPie(recipe) {
  preparePublicationCopy(recipe);
  recipe.cookMinutes = 185;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 0, ml(
    "Whisk flour and salt. Cut in the cold butter and shortening until coarse crumbs with pea-sized pieces remain. Add ice water gradually just until the dough holds together; stop before it feels sticky. Do not taste raw pastry dough. Flour is uncooked, so keep it away from ready-to-eat food and, after handling it, wash hands, utensils, bowl, board, and counter with warm, soapy water.",
    "麵粉與鹽拌勻，切入冰奶油與酥油至粗屑中仍有豌豆大小顆粒。冰水分次加入，剛好能聚合即可；麵糰發黏前就停止。不要試吃生派皮；麵粉尚未烹熟，應與即食食物分開。處理後以溫熱肥皂水清洗雙手、器具、盆、砧板與檯面。",
    "粉と塩を混ぜ、冷たいバターとショートニングを豆粒大が残る粗い状態まで切り込みます。氷水はまとまる分だけ加え、べたつく前に止めます。生のパイ生地を味見しません。未加熱の小麦粉はすぐ食べる食品から離し、扱った後は手、器具、ボウル、まな板、作業台を温かい石けん水で洗います。",
    "밀가루와 소금을 섞고 차가운 버터와 쇼트닝을 잘라 완두콩 크기 조각이 남는 거친 상태로 만듭니다. 반죽이 뭉칠 만큼만 얼음물을 넣고 끈적해지기 전에 멈춥니다. 생 파이지를 맛보지 마세요. 익지 않은 밀가루는 바로 먹는 음식과 분리하고, 다룬 뒤 손, 도구, 볼, 도마와 작업대를 따뜻한 비눗물로 씻습니다.",
    "คนแป้งกับเกลือ ตัดเนยและชอร์ตเทนนิงเย็นจนเป็นเศษหยาบที่ยังเห็นชิ้นขนาดเมล็ดถั่ว เติมน้ำเย็นจัดทีละน้อยแค่พอให้แป้งจับตัว แล้วหยุดก่อนแป้งเหนียว อย่าชิมแป้งพายดิบ แป้งสาลียังไม่สุกและต้องแยกจากอาหารพร้อมกิน หลังจับแป้งให้ล้างมือ อุปกรณ์ ชาม เขียง และเคาน์เตอร์ด้วยน้ำอุ่นผสมน้ำยาล้างจาน"
  ));
  body(recipe, 2, ml(
    "Toss the berries with sugar, cornstarch, lemon juice, and zest. If using fresh berries, rinse them under running water before sorting and dry well; do not use soap or produce wash. If using frozen berries, keep them frozen until mixing so they release less liquid.",
    "莓果與糖、玉米澱粉、檸檬汁和皮屑拌勻。若用新鮮莓果，先在流動清水下沖洗，再挑除雜質並充分瀝乾；不要使用肥皂或蔬果清潔劑。若用冷凍莓果，拌餡前保持冷凍，以減少出水。",
    "ベリーに砂糖、コーンスターチ、レモン汁、皮を混ぜます。生のベリーを使う場合は、選り分ける前に流水で洗ってよく乾かします。石けんや野菜用洗剤は使いません。冷凍ベリーは水が出にくいよう、混ぜる直前まで凍ったままにします。",
    "베리에 설탕, 옥수수전분, 레몬즙과 제스트를 섞습니다. 생베리를 쓰면 골라내기 전에 흐르는 물에 씻고 잘 말립니다. 비누나 채소 세척제를 쓰지 마세요. 냉동 베리는 물이 덜 생기도록 섞기 직전까지 얼린 상태로 둡니다.",
    "คลุกเบอร์รีกับน้ำตาล แป้งข้าวโพด น้ำเลมอน และผิวเลมอน หากใช้เบอร์รีสด ให้ล้างใต้ก๊อกน้ำไหลก่อนคัดเศษและซับให้แห้ง อย่าใช้สบู่หรือน้ำยาล้างผักผลไม้ หากใช้เบอร์รีแช่แข็ง ให้คงความแข็งไว้จนกว่าจะคลุกเพื่อลดน้ำที่ออกมา"
  ));
  body(recipe, 4, ml(
    "Roll the second disc and lay it over the fruit. Trim, fold, and crimp the edges to seal; cut 5 vents in the top. Beat the egg with the listed 15 ml water in a clean bowl, brush a thin coat over the pastry, and sprinkle with coarse sugar. Keep the raw egg and brush away from ready-to-eat foods, then wash hands and utensils with warm, soapy water.",
    "第二片麵糰擀開覆在莓果上，修邊、折起並壓緊封口；表面切 5 道排氣口。用乾淨碗將雞蛋與材料列出的 15 毫升水打勻，薄刷派皮並撒粗糖。生蛋與刷子遠離即食食物，之後以溫熱肥皂水清洗雙手與器具。",
    "もう1枚の生地を伸ばして果物にかぶせます。縁を切り整え、折ってしっかり留め、上面に5か所の蒸気穴を切ります。清潔なボウルで卵と材料にある水15mlを溶き、生地に薄く塗って粗糖を振ります。生卵と刷毛はすぐ食べる食品から離し、作業後は手と器具を温かい石けん水で洗います。",
    "두 번째 반죽을 밀어 과일 위에 덮습니다. 가장자리를 자르고 접어 눌러 봉한 뒤 윗면에 증기 구멍 5개를 냅니다. 깨끗한 볼에서 달걀과 재료에 적힌 물 15ml를 풀어 파이지에 얇게 바르고 굵은 설탕을 뿌립니다. 생달걀과 붓은 바로 먹는 음식에서 멀리 두고, 작업 후 손과 도구를 따뜻한 비눗물로 씻습니다.",
    "รีดแป้งอีกแผ่นคลุมผลไม้ ตัดขอบ พับและบีบให้ปิดสนิท เจาะช่องระบายไอน้ำ 5 ช่องด้านบน ตีไข่กับน้ำ 15 มล. ตามรายการส่วนผสมในชามสะอาด ทาบาง ๆ บนแป้งแล้วโรยน้ำตาลเม็ด แยกไข่ดิบและแปรงออกจากอาหารพร้อมกิน จากนั้นล้างมือและอุปกรณ์ด้วยน้ำอุ่นผสมน้ำยาล้างจาน"
  ));
  body(recipe, 5, ml(
    "Bake on the lower rack at 190°C for 80 minutes before checking. Through a centre vent, look for thick filling bubbles that keep rising for several minutes; the crust should be deep golden and baked through. If the rim darkens before the centre bubbles, shield the rim loosely with foil, reduce to 180°C, and continue in 10-minute increments, checking the centre again; the 80–95-minute range is an estimate, so continue if needed. If the filling is bubbling but the top is still pale, uncover and move the pie to the upper third for 3–5 minutes, watching closely.",
    "放在下層烤架以 190°C 烤 80 分鐘後再檢查。從中央排氣口觀察，餡料應冒出濃稠氣泡並持續數分鐘；派皮應深金黃且烤透。若邊緣在中央餡料冒泡前已變深，鬆鬆以鋁箔護住邊緣、降至 180°C，再每次續烤 10 分鐘並檢查中央；80–95 分鐘只是估計，必要時繼續烤。若餡料已冒泡但表面仍偏淡，移除鋁箔，將派移至烤箱上層再烤 3–5 分鐘並密切觀察。",
    "下段で190°C、まず80分焼いてから確認します。中央の蒸気穴から、とろみのあるフィリングが数分間続けて泡立つか見ます。生地は濃いきつね色で、中まで焼けている状態にします。中央が泡立つ前に縁が濃くなったら、縁をホイルでゆるく覆い、180°Cに下げ、10分ずつ追加して中央を再確認します。80〜95分は目安なので、必要なら続けます。フィリングは泡立つのに表面がまだ薄い場合はホイルを外し、上段に移して3〜5分、焦げないよう見守ります。",
    "오븐 아래 선반에서 190°C로 80분 구운 뒤 확인합니다. 가운데 증기 구멍으로 걸쭉한 속이 몇 분 동안 계속 보글거리는지 봅니다. 파이지는 짙은 금빛이고 속까지 익어야 합니다. 가운데가 끓기 전에 가장자리가 짙어지면 가장자리를 포일로 느슨하게 가리고 180°C로 낮춰 10분씩 더 구운 뒤 중앙을 다시 확인합니다. 80–95분은 예상 시간이므로 필요하면 계속 굽습니다. 속은 끓지만 윗면이 옅으면 포일을 벗기고 오븐 위쪽 선반에서 3–5분 더 굽되 잘 지켜봅니다.",
    "อบบนชั้นล่างที่ 190°C ให้ครบ 80 นาทีก่อนตรวจ ดูผ่านช่องกลางว่ามีไส้ข้นเดือดปุด ๆ ต่อเนื่องหลายนาที เปลือกพายควรเป็นสีทองเข้มและสุกทั่ว หากขอบเข้มก่อนตรงกลางเดือด ให้คลุมขอบด้วยฟอยล์หลวม ๆ ลดเตาเป็น 180°C แล้วอบเพิ่มครั้งละ 10 นาที พร้อมตรวจตรงกลางซ้ำ ช่วง 80–95 นาทีเป็นเพียงเวลาโดยประมาณ จึงอบต่อได้หากจำเป็น หากไส้เดือดแล้วแต่หน้าพายยังซีด ให้เอาฟอยล์ออกและย้ายพายไปชั้นบน 3–5 นาที โดยเฝ้าดูใกล้ชิด"
  ));
  recipe.storage = ml(
    "Cool on a rack. Refrigerate within 2 hours of baking, or within 1 hour when the room is above 32°C (90°F), at 4°C (40°F) or colder; use within 3 days. Reheat only the slices being served.",
    "在網架放涼。烤好後 2 小時內冷藏；室溫高於 32°C（90°F）時 1 小時內冷藏，冰箱保持 4°C（40°F）或以下，3 天內食用。只回熱要吃的切片。",
    "網で冷まします。焼いてから2時間以内（室温が32°C／90°Fを超える場合は1時間以内）に4°C（40°F）以下で冷蔵し、3日以内に食べます。食べる分だけ温め直します。",
    "식힘망에서 식힙니다. 굽고 2시간 안에, 실내가 32°C (90°F)보다 높으면 1시간 안에 4°C (40°F) 이하로 냉장하고 3일 안에 먹습니다. 먹을 조각만 다시 데웁니다.",
    "พักบนตะแกรง แช่เย็นภายใน 2 ชั่วโมงหลังอบ หรือภายใน 1 ชั่วโมงเมื่ออุณหภูมิห้องสูงกว่า 32°C (90°F) โดยแช่ที่ 4°C (40°F) หรือต่ำกว่า กินภายใน 3 วัน อุ่นเฉพาะชิ้นที่จะเสิร์ฟ"
  );
  addOfficialSource(recipe, "FDA — Handling Flour Safely", flourSafety);
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FDA — 7 Tips for Cleaning Fruits and Vegetables", produceSafety);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseHoriatiki(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Before cutting, rinse the whole tomatoes, cucumber, green pepper, and onion under cool running water; gently rub them and scrub the firm cucumber with a clean produce brush. Do not use soap, bleach, or produce wash. Dry with a clean towel, then core the tomatoes over the serving bowl and cut into 30–40 mm wedges so their juice is caught.",
    "切之前先以流動冷水沖洗完整番茄、小黃瓜、青椒與洋蔥，輕輕搓洗，並用乾淨蔬果刷刷洗較硬的小黃瓜。不要用肥皂、漂白水或蔬果清潔劑。以乾淨毛巾擦乾，再在上菜碗上方去蒂並切成 30–40 毫米楔形，接住番茄汁。",
    "切る前にトマト、きゅうり、ピーマン、玉ねぎを流水ですすぎ、やさしくこすります。硬いきゅうりは清潔な野菜用ブラシで洗います。石けん、漂白剤、野菜用洗剤は使いません。清潔な布で水気を取り、盛り付けるボウルの上でトマトのへたを取り、30〜40mmのくし形に切って汁を受けます。",
    "자르기 전에 토마토, 오이, 피망, 양파를 흐르는 찬물에 헹구고 부드럽게 문지릅니다. 단단한 오이는 깨끗한 채소용 솔로 문지릅니다. 비누, 표백제, 채소 세척제를 쓰지 마세요. 깨끗한 수건으로 말린 뒤 서빙 볼 위에서 토마토 꼭지를 자르고 30–40mm 쐐기 모양으로 썰어 즙을 받습니다.",
    "ก่อนหั่น ล้างมะเขือเทศ แตงกวา พริกหวาน และหอมหัวใหญ่ทั้งผลใต้ก๊อกน้ำไหล ถูเบา ๆ และใช้แปรงผักสะอาดขัดแตงกวาที่เปลือกแข็ง ห้ามใช้สบู่ น้ำยาฟอกขาว หรือน้ำยาล้างผัก เช็ดให้แห้งด้วยผ้าสะอาด จากนั้นคว้านขั้วมะเขือเทศเหนือชามเสิร์ฟและหั่นเป็นชิ้นลิ่มขนาด 30–40 มม. เพื่อรองรับน้ำ"
  ));
  body(recipe, 1, ml(
    "Cut the cucumber into 10 mm half-moons, the pepper into 5 mm rings, and the onion into 3 mm half-rings. Add them to the tomatoes using a clean board and knife; keep washed ready-to-eat vegetables and tools away from raw meat, poultry, and seafood.",
    "小黃瓜切成 10 毫米半月片、青椒切成 5 毫米圈、洋蔥切成 3 毫米半圈。用乾淨砧板和刀具加入番茄；洗好的即食蔬菜與器具要遠離生肉、家禽和海鮮。",
    "きゅうりは10mmの半月切り、ピーマンは5mmの輪切り、玉ねぎは3mmの半月切りにします。清潔なまな板と包丁を使ってトマトに加えます。洗った野菜やすぐ食べる食品の器具は、生肉、鶏肉、魚介から離します。",
    "오이는 10mm 반달 모양, 피망은 5mm 링 모양, 양파는 3mm 반달 모양으로 자릅니다. 깨끗한 도마와 칼을 써서 토마토에 넣습니다. 씻은 채소와 바로 먹는 음식에 쓰는 도구는 생고기, 가금류, 해산물과 분리합니다.",
    "หั่นแตงกวาเป็นครึ่งวงหนา 10 มม. พริกหวานเป็นแว่น 5 มม. และหอมหัวใหญ่เป็นครึ่งวง 3 มม. ใส่รวมกับมะเขือเทศโดยใช้เขียงและมีดสะอาด แยกผักที่ล้างแล้วพร้อมกินและอุปกรณ์ออกจากเนื้อดิบ สัตว์ปีก และอาหารทะเล"
  ));
  body(recipe, 3, ml(
    "Keep the feta refrigerated at 4°C (40°F) or colder until just before plating. Place the 200 g feta slab over the vegetables, scatter the olives around it, and crush the oregano between your fingers over the cheese.",
    "Feta 起司放在 4°C（40°F）或以下冷藏，直到準備上桌前才取出。將 200 公克 feta 整塊放在蔬菜上，橄欖散在周圍，再以手指捏碎奧勒岡撒在起司上。",
    "フェタは盛り付ける直前まで4°C（40°F）以下で冷蔵します。フェタ200gを野菜の上に置き、周りにオリーブを散らし、指でオレガノを砕いてチーズに振ります。",
    "페타 200g은 접시에 담기 직전까지 4°C (40°F) 이하로 냉장합니다. 채소 위에 페타 덩어리를 올리고 올리브를 둘러 놓은 뒤 오레가노를 손가락으로 비벼 치즈 위에 뿌립니다.",
    "แช่เฟตาที่ 4°C (40°F) หรือต่ำกว่าจนกว่าจะจัดจาน วางเฟตาก้อน 200 กรัมบนผัก กระจายมะกอกรอบ ๆ แล้วขยี้ออริกาโนด้วยนิ้วโรยบนชีส"
  ));
  body(recipe, 4, ml(
    "Pour all 60 ml olive oil over the feta and vegetables just before serving. Do not remix aggressively; spoon a little pooled tomato juice over each portion. If the dressed salad has to wait, cover and keep it at 4°C (40°F) or colder; discard it if left out longer than 2 hours, or 1 hour above 32°C (90°F). This uncooked salad has no cooking-temperature endpoint.",
    "上桌前將 60 毫升橄欖油全部淋在 feta 和蔬菜上。不要大力重新翻拌；舀少量碗底番茄汁淋在各份沙拉上。若調味後需要等候，請加蓋並保持在 4°C（40°F）或以下；室溫超過 2 小時，或高於 32°C（90°F）超過 1 小時就丟棄。這道生食沙拉沒有烹調溫度終點。",
    "食べる直前にオリーブ油60mlをフェタと野菜にかけます。強く混ぜ直さず、たまったトマト汁を少しずつ各皿にかけます。味付け後に待つ必要があれば蓋をして4°C（40°F）以下に保ちます。室温で2時間を超えた場合、または32°C（90°F）を超える環境で1時間を超えた場合は廃棄します。この生のサラダには加熱温度の基準はありません。",
    "먹기 직전에 올리브유 60ml를 페타와 채소 위에 모두 붓습니다. 세게 다시 섞지 말고 그릇 바닥의 토마토즙을 조금씩 각 접시에 끼얹습니다. 양념한 샐러드를 기다려야 하면 덮어 4°C (40°F) 이하로 보관합니다. 실온에 2시간 넘게, 또는 32°C (90°F)보다 높은 곳에 1시간 넘게 두었다면 버립니다. 이 생샐러드에는 조리 온도 기준이 없습니다.",
    "ก่อนเสิร์ฟ ราดน้ำมันมะกอก 60 มล. ทั้งหมดลงบนเฟตาและผัก อย่าคลุกแรง ๆ ใช้ช้อนตักน้ำมะเขือเทศที่ก้นชามราดแต่ละจานเล็กน้อย หากต้องรอหลังปรุง ให้ปิดฝาและเก็บที่ 4°C (40°F) หรือต่ำกว่า ทิ้งหากวางไว้นานกว่า 2 ชั่วโมง หรือเกิน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C (90°F) สลัดดิบนี้ไม่มีอุณหภูมิสำหรับการปรุงให้สุก"
  ));
  recipe.storage = ml(
    "For best texture, serve immediately. Keep undressed vegetables covered at 4°C (40°F) or colder for up to 1 day. Refrigerate a dressed salad within 2 hours, or 1 hour above 32°C (90°F), and eat it the same day.",
    "為保持最佳口感，現拌現吃。未調味蔬菜加蓋後在 4°C（40°F）或以下冷藏最多 1 天。調味後 2 小時內冷藏；室溫高於 32°C（90°F）時 1 小時內冷藏，並於當天食用。",
    "食感を保つため、作ったらすぐ食べます。味付け前の野菜は蓋をして4°C（40°F）以下で1日まで冷蔵します。味付け後は2時間以内（32°C／90°Fを超える環境では1時間以内）に冷蔵し、当日中に食べます。",
    "가장 좋은 식감을 위해 바로 먹습니다. 양념하지 않은 채소는 덮어서 4°C (40°F) 이하로 최대 1일 냉장합니다. 양념한 샐러드는 2시간 안에, 32°C (90°F)보다 높으면 1시간 안에 냉장하고 당일 먹습니다.",
    "เพื่อให้เนื้อสัมผัสดีที่สุดให้เสิร์ฟทันที ผักที่ยังไม่ปรุงให้ปิดฝาและแช่ที่ 4°C (40°F) หรือต่ำกว่าได้ไม่เกิน 1 วัน สลัดที่ปรุงแล้วให้แช่เย็นภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C (90°F) และกินภายในวันเดียวกัน"
  );
  addOfficialSource(recipe, "FDA — 7 Tips for Cleaning Fruits and Vegetables", produceSafety);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseKaesespaetzle(recipe) {
  preparePublicationCopy(recipe);
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
  body(recipe, 1, ml(
    "Whisk the eggs, milk, and sparkling water together. Add the flour, half the remaining salt, and nutmeg, then beat vigorously for 5 minutes until elastic, glossy, and full of large bubbles. Do not taste the raw egg-and-flour dough. Wash hands, bowl, whisk, press, and work surface with warm, soapy water after contact; keep the raw mixture away from ready-to-eat food.",
    "雞蛋、牛奶與氣泡水攪勻，加入麵粉、剩餘鹽的一半與肉豆蔻，用力攪打 5 分鐘，至麵糰有彈性、發亮並形成大氣泡。不要試吃含生蛋與生麵粉的麵糰。接觸後以溫熱肥皂水清洗雙手、盆、打蛋器、壓麵器與工作檯；生麵糰應遠離即食食物。",
    "卵、牛乳、炭酸水を混ぜます。小麦粉、残った塩の半量、ナツメグを加え、5分力強く混ぜて弾力と艶が出て大きな泡が立つまで練ります。生卵と小麦粉を含む生地を味見しません。触れた後は手、ボウル、泡立て器、プレス器具、作業台を温かい石けん水で洗い、生地をすぐ食べる食品から離します。",
    "달걀, 우유와 탄산수를 섞습니다. 밀가루, 남은 소금의 절반, 넛맥을 넣고 5분 힘차게 저어 반죽이 탄력 있고 윤기 나며 큰 기포가 생기게 합니다. 날달걀과 생밀가루가 든 반죽을 맛보지 마세요. 닿은 뒤 손, 볼, 거품기, 프레스와 작업대를 따뜻한 비눗물로 씻고 생반죽을 바로 먹는 음식과 분리합니다.",
    "ตีไข่ นม และน้ำโซดาให้เข้ากัน ใส่แป้ง เกลือที่เหลือครึ่งหนึ่ง และลูกจันทน์ ตีแรง 5 นาทีจนแป้งยืดหยุ่น เงา และมีฟองใหญ่ อย่าชิมแป้งดิบที่มีไข่และแป้งสาลี ล้างมือ ชาม ตะกร้อมือ ที่กดแป้ง และพื้นเตรียมอาหารด้วยน้ำอุ่นผสมน้ำยาล้างจานหลังสัมผัส และแยกแป้งดิบจากอาหารพร้อมกิน"
  ));
  body(recipe, 2, ml(
    "Cover the dough and rest at room temperature for 15 minutes while a large pot of water comes to a gentle boil. If the water is not ready after 15 minutes, refrigerate the covered egg dough until it is; do not leave it at room temperature for more than 2 hours, or 1 hour above 32°C (90°F).",
    "麵糰加蓋後在室溫休息 15 分鐘，同時把一大鍋水加熱至溫和沸騰。若 15 分鐘後水還沒準備好，將有蓋蛋麵糰冷藏等候；室溫放置不可超過 2 小時，環境高於 32°C（90°F）時不可超過 1 小時。",
    "生地に蓋をして室温で15分休ませ、その間に大鍋の湯を穏やかに沸かします。15分後も湯が準備できていなければ、生地を覆って冷蔵します。室温に置くのは2時間以内、32°C（90°F）を超える環境では1時間以内にします。",
    "반죽을 덮어 실온에서 15분 휴지시키며 큰 냄비의 물을 부드럽게 끓입니다. 15분 뒤에도 물이 준비되지 않았다면 덮은 달걀 반죽을 냉장합니다. 실온에 2시간 넘게, 32°C (90°F)보다 높은 곳에서는 1시간 넘게 두지 마세요.",
    "ปิดแป้งพักที่อุณหภูมิห้อง 15 นาที ระหว่างต้มน้ำหม้อใหญ่ให้เดือดอ่อน หากน้ำยังไม่พร้อมหลัง 15 นาที ให้ปิดฝาแป้งไข่และแช่เย็นรอ อย่าวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง หรือเกิน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C (90°F)"
  ));
  body(recipe, 4, ml(
    "Press one third of the dough through a Spätzle press or scraper into gently boiling water. Stir once so pieces separate and keep the water at a steady simmer. Cook 2–3 minutes until the pieces float, then split the largest test piece: the centre should be set, springy, and free of wet or floury paste. If it is gummy inside, simmer 1 minute more and check again; wait for the water to return to a simmer before adding the next batch.",
    "把三分之一麵糰以 Spätzle 壓麵器或刮板壓入溫和沸水中，攪拌 1 次使麵疙瘩分開，並讓水保持穩定微滾。煮 2–3 分鐘至浮起，再剖開最大顆測試：中心應定型、有彈性，沒有濕黏或粉糊狀麵心。若內部仍黏糊，每次續煮 1 分鐘再檢查；下一批下鍋前先等水恢復微滾。",
    "生地の3分の1をシュペッツレプレスなどで穏やかに沸く湯へ落とします。1回混ぜて離し、湯を安定した弱い沸騰に保ちます。2〜3分ゆでて浮いたら、最も大きいものを割って確認します。中心が固まり、弾力があり、湿った粉状の生地が残らない状態にします。中がねばつく場合は1分ずつ追加して再確認します。次の分を入れる前に湯が再び沸くのを待ちます。",
    "반죽 3분의 1을 슈페츨레 프레스나 스크레이퍼로 부드럽게 끓는 물에 넣습니다. 한 번 저어 분리하고 물이 계속 약하게 끓게 합니다. 2–3분 익혀 떠오르면 가장 큰 조각을 갈라 확인합니다. 가운데가 굳고 탄력이 있으며 젖은 밀가루 반죽이 없어야 합니다. 속이 질척하면 1분 더 끓이고 다시 확인합니다. 다음 반죽을 넣기 전에 물이 다시 끓을 때까지 기다립니다.",
    "กดแป้งหนึ่งในสามผ่านที่กดชเปทซ์เลอหรือใช้พายกดลงน้ำเดือดอ่อน คนหนึ่งครั้งให้แยกและรักษาให้น้ำเดือดเบา ๆ สม่ำเสมอ ต้ม 2–3 นาทีจนชิ้นแป้งลอย แล้วผ่าชิ้นที่ใหญ่ที่สุดทดสอบ ตรงกลางควรเซ็ตตัว ยืดหยุ่น และไม่มีเนื้อแป้งเปียกหรือเป็นผง หากด้านในยังเหนียว ให้ต้มเพิ่มครั้งละ 1 นาทีแล้วตรวจซ้ำ รอให้น้ำกลับมาเดือดอ่อนก่อนใส่รอบถัดไป"
  ));
  recipe.commonMistakes[1] = ml(
    "Relying on floating alone can leave a thick piece floury inside; split the largest piece and simmer another minute if its centre is still gummy.",
    "只看麵疙瘩浮起可能讓較厚的中心仍有粉糊感；剖開最大顆檢查，若中心黏糊就再煮 1 分鐘。",
    "浮いたことだけで判断すると、厚いものの中心に粉っぽさが残ることがあります。大きいものを割り、中がねばつけば1分追加でゆでます。",
    "떠오른 것만 보고 꺼내면 두꺼운 조각 가운데가 밀가루처럼 질척할 수 있습니다. 가장 큰 조각을 갈라 보고 속이 질척하면 1분 더 익히세요.",
    "การดูแค่ว่าชิ้นแป้งลอยอาจทำให้ชิ้นหนาตรงกลางยังเป็นแป้งเหนียว ผ่าชิ้นที่ใหญ่ที่สุด หากด้านในยังเหนียวให้ต้มเพิ่มอีก 1 นาที"
  );
  recipe.storage = ml(
    "Cool leftovers promptly in shallow containers and refrigerate within 2 hours at 4°C (40°F) or colder; use within 3–4 days. Reheat only the portion needed until it reaches 74°C (165°F) throughout.",
    "剩食盡快分裝至淺容器降溫，2 小時內放入 4°C（40°F）或以下冰箱，3–4 天內食用。只取需要的份量回熱至中心達 74°C（165°F）。",
    "残りは浅い容器に分けて速やかに冷まし、2時間以内に4°C（40°F）以下で冷蔵して3〜4日以内に食べます。必要な分だけ全体が74°C（165°F）に達するまで再加熱します。",
    "남은 음식은 얕은 용기에 나누어 빨리 식히고 2시간 안에 4°C (40°F) 이하로 냉장해 3–4일 안에 먹습니다. 필요한 양만 속까지 74°C (165°F)에 도달하도록 다시 데웁니다.",
    "แบ่งอาหารที่เหลือใส่ภาชนะตื้นเพื่อให้เย็นเร็ว แล้วแช่เย็นภายใน 2 ชั่วโมงที่ 4°C (40°F) หรือต่ำกว่า กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะกินจนร้อนทั่วถึง 74°C (165°F)"
  );
  addOfficialSource(recipe, "FDA — Handling Flour Safely", flourSafety);
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

export function refineSeventySeventhMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseFinanciers(byId.get("financiers"));
  reviseSaskatoonBerryPie(byId.get("saskatoon-berry-pie"));
  reviseHoriatiki(byId.get("horiatiki"));
  reviseKaesespaetzle(byId.get("kaesespaetzle"));
  return recipes;
}
