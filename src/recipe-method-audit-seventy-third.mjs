const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const flourSafety = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";

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

function reviseGigantes(recipe) {
  body(recipe, 1, ml(
    "Put the drained beans in a large pot with fresh water from the listed 2.5 L. Bring to a full boil, reduce to a steady simmer, and cook 45–55 minutes. Test three of the largest beans from different parts of the pot: each centre should press creamy between two fingers while the skin stays intact. If any centre is chalky or firm, keep simmering in 10-minute increments, adding boiling water to keep the beans covered. Do not add the acidic tomato sauce until all three tests are creamy; older beans may take longer.",
    "將瀝乾的豆子放入大鍋，加入所列 2.5 公升水中的新鮮水量。煮至大滾後轉穩定小滾，煮 45–55 分鐘。從鍋中不同位置挑三顆最大豆子測試：中心應可用兩指壓成綿軟泥狀，外皮仍完整。若任一顆中心粉硬或有硬芯，每次續煮 10 分鐘，並以滾水補至豆子浸沒。三顆都通過測試前不要加入酸性的番茄醬汁；較老的豆子可能需要更久。",
    "水に浸して水を切った豆を大鍋に入れ、材料に記載した2.5Lのうち新しい水を加えます。しっかり沸騰させてから安定した弱めの沸騰にし、45〜55分煮ます。鍋の別々の場所から最も大きい豆を3粒取り、中心を指で押します。皮は破れず、中はクリーミーにつぶれる状態が目安です。粉っぽい芯や硬さが残る豆があれば、豆が浸るよう熱湯を足し、10分ずつ追加で煮ます。3粒すべてが柔らかくなるまで酸味のあるトマトソースを加えません。古い豆はさらに時間がかかることがあります。",
    "불린 뒤 물기를 뺀 콩을 큰 냄비에 넣고 재료에 적힌 물 2.5L 중 새 물을 붓습니다. 완전히 끓인 다음 안정적으로 보글거리는 약불로 낮춰 45–55분 익힙니다. 냄비의 서로 다른 위치에서 가장 큰 콩 3개를 골라 눌러 봅니다. 껍질은 온전하고 속은 손가락 사이에서 크리미하게 으깨져야 합니다. 속이 가루처럼 퍽퍽하거나 단단하면 콩이 잠기도록 끓는 물을 보충하고 10분씩 더 끓입니다. 세 알 모두 부드러워질 때까지 산성 토마토 소스를 넣지 마세요. 오래된 콩은 더 오래 걸릴 수 있습니다.",
    "ใส่ถั่วที่สะเด็ดน้ำลงหม้อใหญ่ เติมน้ำใหม่จากปริมาณ 2.5 ลิตรที่ระบุไว้ ต้มให้เดือดเต็มที่แล้วลดเป็นไฟอ่อนที่เดือดสม่ำเสมอ ต้ม 45–55 นาที เลือกถั่วเม็ดใหญ่ 3 เม็ดจากคนละตำแหน่งในหม้อ เปลือกควรยังอยู่ครบและเนื้อด้านในควรกดแล้วเละนุ่มเป็นครีม หากยังเป็นไตแข็งหรือเป็นผง ให้เติมน้ำเดือดพอท่วมและต้มต่อครั้งละ 10 นาที อย่าใส่ซอสมะเขือเทศที่มีกรดจนกว่าทั้ง 3 เม็ดจะนุ่ม ถั่วเก่าอาจใช้เวลานานกว่า"
  ));
  body(recipe, 5, ml(
    "Heat the oven to 180°C. Fold the drained beans, 270 ml of the reserved cooking liquid, parsley, dill and 30 ml olive oil into the sauce without crushing the beans. Keep the remaining 30 ml hot as a moisture reserve for baking.",
    "烤箱預熱至 180°C。將瀝乾豆子、保留煮汁中的 270 毫升、巴西里、蒔蘿和 30 毫升橄欖油輕拌入醬汁，不要壓破豆子。剩下 30 毫升煮汁保溫，留作烘烤時補濕用。",
    "オーブンを180°Cに予熱します。水を切った豆、取り分けたゆで汁270ml、パセリ、ディル、オリーブ油30mlを豆を崩さないようソースに混ぜます。残りの30mlは焼くときの水分補給用に温かく保ちます。",
    "오븐을 180°C로 예열합니다. 물기를 뺀 콩, 남겨 둔 삶은 물 270ml, 파슬리, 딜, 올리브유 30ml를 콩이 으깨지지 않게 소스에 섞습니다. 남은 삶은 물 30ml는 굽는 동안 수분을 보충할 수 있도록 따뜻하게 둡니다.",
    "อุ่นเตาอบที่ 180°C ค่อย ๆ ผสมถั่วที่สะเด็ดน้ำ น้ำต้มที่แบ่งไว้ 270 มล. พาร์สลีย์ ผักชีลาว และน้ำมันมะกอก 30 มล.ลงในซอสโดยไม่บดถั่ว เก็บน้ำต้มอีก 30 มล.ให้อุ่นไว้เติมความชุ่มชื้นระหว่างอบ"
  ));
  body(recipe, 7, ml(
    "Bake uncovered at 180°C for an estimated 35–40 minutes until the sauce bubbles at the edges and the top has browned spots while the centre remains moist. This is a meatless bean casserole: insert a clean thermometer into the middle of the bean-and-sauce mixture, away from the pan, and check for 74°C (165°F). If the top browns before the centre reaches 74°C, cover loosely with foil and continue in 5-minute increments, rechecking the centre each time. If the sauce looks dry, spoon in 15 ml of the reserved hot bean liquid around the edges. If it dries again, add the final 15 ml.",
    "以 180°C 不加蓋烤約 35–40 分鐘，直到邊緣醬汁冒泡、表面有褐色斑點而中心仍濕潤。這是無肉豆類砂鍋：將乾淨溫度計插入豆子與醬汁混合物的中央，避開烤盤，確認達 74°C（165°F）。若表面先上色而中心未達 74°C，鬆鬆蓋上鋁箔，每次續烤 5 分鐘並重測中心。若醬汁看起來太乾，先沿著邊緣舀入 15 毫升預留熱豆水；若再次變乾，再加入最後 15 毫升。",
    "180°Cで35〜40分を目安に、ふたをせず焼きます。端のソースが泡立ち、表面に焼き色がつき、中心は乾かずしっとりしていればよい状態です。これは肉を使わない豆のキャセロールです。清潔な温度計を器に触れないよう豆とソースの中央に差し、74°C（165°F）を確認します。中心が74°Cになる前に表面が濃く色づいたら、アルミホイルをふんわりかぶせ、5分ずつ追加で焼いてその都度中心を測ります。ソースが乾いて見えたら、取り分けた熱い豆のゆで汁15mlを器の縁から加えます。再び乾いた場合だけ、残りの15mlを加えます。",
    "180°C에서 뚜껑 없이 약 35–40분 굽습니다. 가장자리 소스가 보글거리고 윗면에 갈색 자국이 생기며 가운데는 촉촉해야 합니다. 이 요리는 고기가 없는 콩 캐서롤입니다. 깨끗한 온도계를 냄비에 닿지 않게 콩과 소스의 중앙에 꽂아 74°C(165°F)를 확인합니다. 중앙이 74°C에 도달하기 전에 윗면이 갈색으로 짙어지면 포일을 느슨하게 덮고 5분씩 더 구우며 매번 중앙 온도를 다시 잽니다. 소스가 말라 보이면 남겨 둔 뜨거운 콩 삶은 물 15ml를 가장자리에 넣습니다. 다시 마를 때만 남은 15ml를 넣습니다.",
    "อบที่ 180°C โดยไม่ปิดฝาประมาณ 35–40 นาที จนซอสเดือดปุดที่ขอบและด้านบนมีรอยเกรียม ขณะที่ตรงกลางยังชุ่ม นี่คือแคสเซอโรลถั่วที่ไม่มีเนื้อสัตว์ ใช้เทอร์โมมิเตอร์สะอาดจิ้มตรงกลางส่วนผสมถั่วกับซอสโดยไม่ให้แตะถาด และตรวจให้ได้ 74°C (165°F) หากด้านบนเกรียมก่อนตรงกลางถึง 74°C ให้คลุมฟอยล์หลวม ๆ อบต่อครั้งละ 5 นาทีและวัดตรงกลางซ้ำทุกครั้ง หากซอสแห้ง ให้เติมน้ำต้มถั่วร้อนที่แบ่งไว้ 15 มล.รอบขอบถาด หากแห้งอีกครั้งจึงเติม 15 มล.สุดท้าย"
  ));
  recipe.storage = ml(
    "Divide leftovers into shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best texture; this is a recipe quality target. Reheat only the portion being served to 74°C/165°F throughout.",
    "剩食分裝在淺容器中，於 2 小時內冷藏；環境高於 32°C/90°F 時須於 1 小時內冷藏，冰箱保持 4°C/40°F 以下。為保持最佳口感，建議 3 天內食用；這是本食譜的品質建議。只復熱要吃的份量，並讓整體達到 74°C/165°F。",
    "残りは浅い容器に小分けし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。食感を保つため3日以内の使用をおすすめします。これはレシピ上の品質目安です。食べる分だけ、全体が74°C/165°Fに達するまで再加熱します。",
    "남은 음식은 얕은 용기에 나누어 2시간 안에(주변 온도가 32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장합니다. 가장 좋은 식감을 위해 3일 안에 먹는 것을 권하며, 이는 레시피 품질 기준입니다. 먹을 양만 덜어 전체가 74°C/165°F에 도달하도록 다시 데웁니다.",
    "แบ่งของเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วันเพื่อเนื้อสัมผัสที่ดีที่สุด ซึ่งเป็นเป้าหมายด้านคุณภาพของสูตรนี้ อุ่นเฉพาะส่วนที่จะเสิร์ฟให้ร้อนถึง 74°C/165°F ทั่วทั้งส่วน"
  );
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

function revisePaoDeQueijo(recipe) {
  body(recipe, 0, ml(
    "Combine the milk, oil, salt and 65 ml of the listed 80 ml water in a saucepan and bring to a full boil. Keep the remaining 15 ml hot for adjusting the dough. Heat the oven to 200°C and lightly grease a baking tray with the listed 20 ml oil.",
    "將牛奶、油、鹽和所列 80 毫升水中的 65 毫升放入鍋中，煮至大滾；剩下 15 毫升先保溫，留待調整麵糰。將烤箱加熱至 200°C，並用所列 20 毫升油薄薄抹在烤盤上。",
    "牛乳、油、塩、材料の水80mlのうち65mlを鍋に入れてしっかり沸騰させます。残りの15mlは生地調整用に温かく保ちます。オーブンを200°Cに熱し、材料の油20mlで天板に薄く油を塗ります。",
    "냄비에 우유, 기름, 소금과 재료에 적힌 물 80ml 중 65ml를 넣고 완전히 끓입니다. 남은 15ml는 반죽 조절용으로 따뜻하게 둡니다. 오븐을 200°C로 예열하고 재료에 적힌 기름 20ml로 베이킹 트레이에 얇게 기름칠합니다.",
    "ใส่นม น้ำมัน เกลือ และน้ำ 65 มล.จากทั้งหมด 80 มล.ที่ระบุไว้ลงหม้อ ต้มให้เดือดเต็มที่ เก็บน้ำอีก 15 มล.ให้อุ่นไว้ปรับแป้ง อุ่นเตาอบที่ 200°C และทาน้ำมันที่ระบุไว้ 20 มล.บาง ๆ บนถาดอบ"
  ));
  body(recipe, 1, ml(
    "Put 225 g of the listed 240 g tapioca starch in a heatproof bowl and keep the remaining 15 g dry for correction. Pour the boiling liquid over the 225 g starch and stir firmly until no dry pockets remain. Rest for 10 minutes, until warm rather than hot.",
    "將所列 240 公克樹薯粉中的 225 公克放入耐熱碗，剩下 15 公克保持乾燥作為調整用。把滾燙液體倒在 225 公克樹薯粉上，用力攪拌至沒有乾粉團。靜置 10 分鐘，降至溫熱而不燙手。",
    "材料のタピオカでんぷん240gのうち225gを耐熱ボウルに入れ、残り15gは調整用に乾いたまま取っておきます。沸騰した液体を225gに注ぎ、粉のかたまりがなくなるまで力強く混ぜます。10分置き、熱くなく温かい状態まで冷まします。",
    "재료에 적힌 타피오카 전분 240g 중 225g을 내열 그릇에 담고, 나머지 15g은 조절용으로 따로 둡니다. 끓는 액체를 225g 전분에 붓고 마른 덩어리가 남지 않도록 힘 있게 섞습니다. 10분 두어 뜨겁지 않고 따뜻한 상태로 식힙니다.",
    "ใส่แป้งมันสำปะหลัง 225 กรัมจากทั้งหมด 240 กรัมลงชามทนร้อน แยกอีก 15 กรัมไว้ปรับแป้ง เทของเหลวเดือดลงบนแป้ง 225 กรัม คนแรง ๆ จนไม่เหลือผงแห้งเป็นก้อน พัก 10 นาทีให้คลายร้อนจนแค่อุ่น"
  ));
  body(recipe, 2, ml(
    "Beat the 2 eggs and add them to the warm dough in 3 additions, mixing smooth after each; fold in all 140 g cheese. The dough should be shiny, elastic and hold a soft mound on a spoon. If it cracks, knead in the reserved hot water 5 ml at a time, up to 15 ml. If it spreads, knead in the reserved starch 5 g at a time, up to 15 g; stop as soon as the mound holds, so the buns stay chewy.",
    "將 2 顆蛋打勻，分 3 次加入溫熱麵糰，每次拌勻後再加下一次；拌入全部 140 公克起司。麵糰應光亮、有彈性，並能在湯匙上保持柔軟小丘。若麵糰裂開，每次加入 5 毫升預留熱水，最多 15 毫升。若攤流，則每次揉入 5 公克預留樹薯粉，最多 15 公克；一旦小丘能定型就停止，以免麵包失去 Q 彈口感。",
    "卵2個を溶き、温かい生地に3回に分けて加え、その都度なめらかに混ぜます。チーズ140g全量を混ぜ込みます。生地につやと弾力があり、スプーンの上で柔らかな山を保てばよい状態です。ひび割れる場合は取り分けた熱い水を5mlずつ、最大15mlまで練り込みます。広がる場合は取り分けたでんぷんを5gずつ、最大15gまで練り込みます。山が保てたら止め、もちもち感を残します。",
    "달걀 2개를 풀어 따뜻한 반죽에 3번 나누어 넣고 매번 매끈하게 섞은 뒤 치즈 140g을 모두 넣습니다. 반죽은 윤기와 탄력이 있고 숟가락 위에서 부드러운 봉우리를 유지해야 합니다. 갈라지면 남겨 둔 뜨거운 물을 5ml씩 최대 15ml까지 넣어 치댑니다. 퍼지면 남겨 둔 전분을 5g씩 최대 15g까지 넣어 치댑니다. 봉우리가 유지되면 멈춰 쫄깃함을 살립니다.",
    "ตีไข่ 2 ฟองให้เข้ากัน ใส่ลงในแป้งอุ่น 3 รอบ คนให้เนียนทุกครั้ง แล้วพับชีส 140 กรัมทั้งหมดลงไป แป้งควรเงา ยืดหยุ่น และตั้งเป็นก้อนนุ่มบนช้อนได้ หากแป้งแตกร้าว ให้นวดน้ำร้อนที่แบ่งไว้ครั้งละ 5 มล. ได้ไม่เกิน 15 มล. หากแผ่เหลว ให้นวดแป้งมันที่แบ่งไว้ครั้งละ 5 กรัม ได้ไม่เกิน 15 กรัม หยุดทันทีที่แป้งตั้งก้อนได้ เพื่อให้ขนมปังยังหนึบ"
  ));
  body(recipe, 3, ml(
    "Weigh the full dough and divide it into 18 equal portions, about 40 g each. Roll with lightly oiled hands and set the balls 3–4 cm apart so they can expand without joining.",
    "秤量全部麵糰並平均分成 18 份，每份約 40 公克。雙手薄抹油後搓圓，球與球間隔 3–4 公分，讓麵包膨起時不會黏在一起。",
    "生地全量を量って18等分し、1個約40gにします。手に薄く油を塗って丸め、膨らんでもくっつかないよう3〜4cm間隔で並べます。",
    "반죽 전체 무게를 재고 18등분합니다. 한 개당 약 40g입니다. 손에 기름을 얇게 바르고 둥글게 빚어, 부풀 때 붙지 않도록 3–4cm 간격으로 놓습니다.",
    "ชั่งแป้งทั้งหมดแล้วแบ่งเป็น 18 ส่วนเท่า ๆ กัน ส่วนละประมาณ 40 กรัม ใช้มือที่ทาน้ำมันบาง ๆ คลึงเป็นก้อน วางห่างกัน 3–4 ซม.เพื่อให้ขยายตัวโดยไม่ติดกัน"
  ));
  body(recipe, 4, ml(
    "Bake at 200°C for 20–25 minutes until puffed and lightly golden. Probe the centre of the largest bun; this egg-containing dish should reach 71°C (160°F), and the cut centre should be set and stretchy, not wet or pasty. If it is below 71°C or still gummy, continue baking in 3-minute increments and recheck. If the tops brown before the centres are ready, lower the oven to 180°C and continue in 3-minute increments.",
    "以 200°C 烤 20–25 分鐘，直到膨起並略呈金黃色。用溫度計測最大麵包的中心；這道含蛋料理須達 71°C（160°F），切開後中心應定型且有延展性，不可濕黏或糊口。若未達 71°C 或仍黏糊，每次續烤 3 分鐘並重測。若表面先上色而中心尚未熟，將烤箱降至 180°C，再以 3 分鐘為單位續烤。",
    "200°Cで20〜25分、膨らんで薄い焼き色がつくまで焼きます。最大のパンの中心に温度計を差します。卵を含む料理なので中心を71°C（160°F）まで加熱し、切った内側は生地状に湿らず、弾力があって火が通っている状態にします。71°C未満またはべたつく場合は3分ずつ追加で焼いて再確認します。表面が先に色づく場合は180°Cに下げ、中心ができるまで3分ずつ焼きます。",
    "200°C에서 20–25분 부풀고 옅은 황금색이 될 때까지 굽습니다. 가장 큰 빵의 중심을 온도계로 잽니다. 달걀이 들어간 음식이므로 중심이 71°C(160°F)에 도달해야 하며, 잘랐을 때 속은 촉촉한 생반죽이나 풀처럼 끈적이지 않고 탄력 있게 익어야 합니다. 71°C보다 낮거나 질척하면 3분씩 더 굽고 다시 확인합니다. 윗면이 먼저 갈색이 되면 오븐을 180°C로 낮춰 속이 익을 때까지 3분씩 더 굽습니다.",
    "อบที่ 200°C นาน 20–25 นาทีจนพองและเป็นสีทองอ่อน ใช้เทอร์โมมิเตอร์วัดตรงกลางขนมปังก้อนใหญ่ที่สุด อาหารที่มีไข่ต้องถึง 71°C (160°F) และเมื่อผ่าดูตรงกลางควรเซ็ตและยืดหยุ่น ไม่เปียกหรือเป็นแป้งเหนียว หากยังต่ำกว่า 71°C หรือยังเหนียว ให้เพิ่มครั้งละ 3 นาทีแล้ววัดซ้ำ หากด้านบนเป็นสีก่อนด้านในสุก ให้ลดเตาเหลือ 180°C และอบต่อครั้งละ 3 นาที"
  ));
  recipe.storage = ml(
    "These buns contain egg and cheese. Cool in a single layer and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best chew; FDA guidance allows cooked egg dishes 3–4 days refrigerated. Reheat only the portion needed to 74°C/165°F throughout. Freeze cooled buns airtight for longer storage.",
    "麵包含蛋與起司。單層放涼後，於 2 小時內冷藏；環境高於 32°C/90°F 時須於 1 小時內冷藏，冰箱保持 4°C/40°F 以下。為保持最佳 Q 彈口感，建議 3 天內食用；FDA 指引的熟蛋料理冷藏期限為 3–4 天。只復熱要吃的份量，並讓整體達到 74°C/165°F。完全放涼後可密封冷凍保存更久。",
    "卵とチーズを含みます。1段に並べて冷まし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。もちもち感を保つには3日以内がおすすめです。FDAの案内では、調理済みの卵料理は冷蔵で3〜4日保存できます。食べる分だけ全体が74°C/165°Fになるまで再加熱します。完全に冷まして密閉すれば長期保存用に冷凍できます。",
    "달걀과 치즈가 들어 있습니다. 한 겹으로 식힌 뒤 2시간 안에(32°C/90°F보다 높은 곳에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 가장 쫄깃한 식감을 위해 3일 안에 먹는 것을 권합니다. FDA 지침에서 익힌 달걀 요리는 냉장 3–4일 보관할 수 있습니다. 먹을 양만 덜어 전체가 74°C/165°F에 도달하도록 다시 데웁니다. 완전히 식힌 뒤 밀폐해 장기 보관용으로 냉동할 수 있습니다.",
    "ขนมปังนี้มีไข่และชีส วางเรียงชั้นเดียวให้เย็นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วันเพื่อความหนึบที่ดีที่สุด แนวทาง FDA ระบุว่าอาหารไข่ที่ปรุงสุกเก็บแช่เย็นได้ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ร้อนถึง 74°C/165°F ทั่วถึง แช่แข็งขนมปังที่เย็นสนิทในภาชนะปิดหากต้องการเก็บนานขึ้น"
  );
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

function reviseStickyToffee(recipe) {
  body(recipe, 4, ml(
    "Spread the batter in the prepared tin and bake at 180°C for an estimated 35–40 minutes. The centre should spring back lightly and a skewer should show moist crumbs but no raw batter. Because this pudding contains egg, also probe the centre for 71°C (160°F). If the centre is below 71°C or the skewer shows raw batter, bake 3 minutes longer and test again; if the top is already dark, tent it loosely with foil while it finishes.",
    "將麵糊倒入備好的烤模，以 180°C 烤約 35–40 分鐘。中心輕壓應回彈，竹籤應沾濕潤碎屑但沒有生麵糊。因布丁含蛋，也要測量中心達 71°C（160°F）。若中心未達 71°C 或竹籤沾到生麵糊，再烤 3 分鐘後重測；若表面已深色，烤熟時鬆鬆蓋上鋁箔。",
    "準備した型に生地を入れ、180°Cで35〜40分を目安に焼きます。中心を軽く押すと戻り、竹串にはしっとりしたくずが付いても生の生地は付かない状態が目安です。卵を含むプディングなので、中心が71°C（160°F）に達したことも確認します。71°C未満、または竹串に生地が付く場合は3分追加して再確認します。上面に濃い焼き色がついていたら、焼き上がるまでアルミホイルをふんわりかぶせます。",
    "준비한 틀에 반죽을 펴 담고 180°C에서 약 35–40분 굽습니다. 가운데를 가볍게 눌렀을 때 되돌아오고 꼬치에는 촉촉한 부스러기만 묻으며 생반죽은 묻지 않아야 합니다. 푸딩에 달걀이 들어가므로 중심 온도도 71°C(160°F)에 도달했는지 확인합니다. 71°C보다 낮거나 꼬치에 생반죽이 묻으면 3분 더 굽고 다시 확인합니다. 윗면이 이미 진하게 갈색이면 다 익을 때까지 포일을 느슨하게 덮습니다.",
    "เทแป้งลงพิมพ์ที่เตรียมไว้ อบที่ 180°C ประมาณ 35–40 นาที ตรงกลางควรเด้งกลับเบา ๆ และไม้เสียบควรมีเศษชุ่มเล็กน้อยแต่ไม่มีแป้งดิบติด เนื่องจากพุดดิ้งนี้มีไข่ ให้ตรวจอุณหภูมิตรงกลางด้วย ต้องถึง 71°C (160°F) หากยังต่ำกว่า 71°C หรือไม้เสียบมีแป้งดิบ ให้อบต่อ 3 นาทีแล้วตรวจอีกครั้ง หากด้านบนเข้มแล้ว ให้คลุมฟอยล์หลวม ๆ ระหว่างอบให้สุก"
  ));
  body(recipe, 5, ml(
    "While the sponge bakes, melt the butter with the muscovado sugar over medium-low heat. Reserve 15 ml of the listed 200 ml cream; whisk in the remaining 185 ml and simmer gently for 5–6 minutes until glossy and smooth. If sugar grains remain, keep the sauce at a gentle simmer for 1 minute and whisk. If it becomes too thick as it cools, whisk in the reserved warm cream 5 ml at a time.",
    "蛋糕烘烤時，以中小火融化奶油與黑糖。從所列 200 毫升鮮奶油中預留 15 毫升，其餘 185 毫升拌入後小火煮 5–6 分鐘，直到光亮滑順。若仍有糖粒，再維持小滾 1 分鐘並攪拌。若冷卻後太稠，每次拌入 5 毫升預留溫鮮奶油調整。",
    "スポンジを焼いている間に、バターとマスコバド糖を中弱火で溶かします。材料のクリーム200mlから15mlを取り分け、残りの185mlを混ぜ入れます。弱く煮立てながら5〜6分、つやが出てなめらかになるまで混ぜます。砂糖の粒が残る場合は弱い沸騰を保って1分混ぜます。冷めて濃くなりすぎたら、取り分けた温かいクリームを5mlずつ加えて混ぜます。",
    "스펀지가 구워지는 동안 버터와 머스코바도 설탕을 중약불에서 녹입니다. 재료에 적힌 크림 200ml 중 15ml는 남기고, 나머지 185ml를 저어 넣어 5–6분 부드럽게 끓여 윤기 나고 매끈하게 만듭니다. 설탕 알갱이가 남으면 약하게 끓이며 1분 더 저어 줍니다. 식으면서 너무 되직해지면 남겨 둔 따뜻한 크림을 5ml씩 넣어 섞습니다.",
    "ระหว่างอบสปันจ์ ละลายเนยกับน้ำตาลมัสโควาโดด้วยไฟกลางอ่อน แบ่งครีมที่ระบุไว้ 200 มล.ออก 15 มล. ใส่ครีมที่เหลือ 185 มล.และเคี่ยวเบา ๆ 5–6 นาทีจนเงาและเนียน หากยังมีเม็ดน้ำตาล ให้เคี่ยวอ่อน ๆ ต่อ 1 นาทีพร้อมคน หากข้นเกินไปเมื่อเย็น ให้คนครีมอุ่นที่แบ่งไว้ลงไปครั้งละ 5 มล."
  ));
  recipe.storage = ml(
    "The pudding and cream sauce contain egg and dairy. Cool promptly in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best texture; FDA guidance allows cooked egg dishes 3–4 days refrigerated. Reheat only the portion needed until both pudding and sauce reach 74°C/165°F throughout.",
    "布丁與奶油醬含蛋及乳製品。盡快分裝在淺容器中降溫，於 2 小時內冷藏；環境高於 32°C/90°F 時須於 1 小時內冷藏，冰箱保持 4°C/40°F 以下。為保持最佳口感，建議 3 天內食用；FDA 指引的熟蛋料理冷藏期限為 3–4 天。只復熱要吃的份量，讓布丁與醬汁整體都達到 74°C/165°F。",
    "プディングとクリームソースには卵と乳製品が含まれます。浅い容器に入れて速やかに冷まし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。食感を保つため3日以内がおすすめです。FDAの案内では、調理済みの卵料理は冷蔵で3〜4日保存できます。食べる分だけ、プディングとソースの両方を全体が74°C/165°Fになるまで再加熱します。",
    "푸딩과 크림소스에는 달걀과 유제품이 들어 있습니다. 얕은 용기에 나누어 빠르게 식힌 뒤 2시간 안에(32°C/90°F보다 높은 곳에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 가장 좋은 식감을 위해 3일 안에 먹는 것을 권하며, FDA 지침상 익힌 달걀 요리는 냉장 3–4일 보관할 수 있습니다. 먹을 양만 덜어 푸딩과 소스 모두 전체가 74°C/165°F에 도달하도록 데웁니다.",
    "พุดดิ้งและซอสครีมมีไข่กับผลิตภัณฑ์นม รีบแบ่งใส่ภาชนะตื้นให้เย็นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วันเพื่อคุณภาพที่ดีที่สุด แนวทาง FDA ระบุว่าอาหารไข่ที่ปรุงสุกเก็บแช่เย็นได้ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั้งพุดดิ้งและซอสถึง 74°C/165°F ทั่วถึง"
  );
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

function reviseCampfireBannock(recipe) {
  body(recipe, 2, ml(
    "Stir in 250 ml water and the oil or melted lard. Add the remaining listed water a tablespoon at a time only until no dry flour remains, then knead gently for about 1 minute. The dough should feel soft and slightly tacky, not wet. Do not taste the raw dough: untreated flour can carry harmful bacteria and must be cooked fully.",
    "拌入 250 毫升水及油或融化豬油。所列剩餘水量每次以一湯匙加入，只加到看不見乾粉；再輕揉約 1 分鐘。麵糰應柔軟、略黏但不濕。不要試吃生麵糰：未經處理的麵粉可能帶有害菌，必須徹底烹熟。",
    "水250mlと油または溶かしたラードを混ぜます。材料の残りの水は大さじ1ずつ加え、粉っぽさがなくなった時点で止めます。約1分やさしくこね、生地が柔らかく少しだけ手に付く状態にします。生の生地は味見しません。未処理の小麦粉には有害な細菌が含まれることがあり、十分に加熱する必要があります。",
    "물 250ml와 기름 또는 녹인 라드를 섞습니다. 재료에 적힌 나머지 물은 마른 밀가루가 보이지 않을 때까지만 한 번에 한 큰술씩 넣고 약 1분 부드럽게 반죽합니다. 반죽은 부드럽고 약간 끈적해야 하지만 질면 안 됩니다. 생반죽은 맛보지 마세요. 처리되지 않은 밀가루에는 유해 세균이 있을 수 있으므로 완전히 익혀야 합니다.",
    "คนใส่น้ำ 250 มล.กับน้ำมันหรือมันหมูละลาย เติมน้ำส่วนที่เหลือตามสูตรครั้งละ 1 ช้อนโต๊ะจนไม่เห็นแป้งแห้ง แล้วนวดเบา ๆ ประมาณ 1 นาที แป้งควรนุ่มและเหนียวนิด ๆ แต่ไม่แฉะ อย่าชิมแป้งดิบ เพราะแป้งที่ยังไม่ผ่านความร้อนอาจมีแบคทีเรียที่เป็นอันตรายและต้องปรุงให้สุกทั่ว"
  ));
  body(recipe, 3, ml(
    "Divide into 6 equal pieces. With lightly floured hands, shape each into a round 10 cm wide and about 1.5 cm thick; keep the thickness even so the centre cooks before the crust darkens.",
    "將麵糰平均分成 6 份。雙手薄撒麵粉，將每份整成直徑 10 公分、厚約 1.5 公分的圓餅；厚薄要均勻，中心才能在外皮變深前熟透。",
    "生地を6等分します。手に薄く打ち粉をし、直径10cm、厚さ約1.5cmの円形に整えます。厚みを均一にすると、表面が濃く色づく前に中心まで火が通ります。",
    "반죽을 6등분합니다. 손에 밀가루를 살짝 묻혀 지름 10cm, 두께 약 1.5cm의 둥근 모양으로 빚습니다. 두께를 고르게 해야 겉이 짙게 타기 전에 속까지 익습니다.",
    "แบ่งแป้งเป็น 6 ส่วนเท่ากัน ใช้มือที่โรยแป้งบาง ๆ ปั้นเป็นแผ่นกลมเส้นผ่านศูนย์กลาง 10 ซม. หนาประมาณ 1.5 ซม. ทำให้หนาเท่ากันเพื่อให้ตรงกลางสุกก่อนเปลือกเข้ม"
  ));
  body(recipe, 4, ml(
    "Grease the skillet lightly. Cook the rounds in batches over a bed of steady gentle embers or over medium-low heat on the skillet for 7–9 minutes per side, turning every 2 minutes for even colour. Test the thickest first round by cutting through its centre: the crumb should be matte and set with no wet, gummy stripe. If the outside browns while the centre is gummy, move the pan to cooler embers or lower the burner, turn every 2 minutes, and cook in 2-minute increments until the centre is set. Do not serve raw dough.",
    "平底鍋薄薄抹油。將圓餅分批放在穩定微弱的炭火上，或以平底鍋中小火每面煎 7–9 分鐘；每 2 分鐘翻面一次，讓顏色均勻。先切開第一片最厚處測試：中心麵包屑應乾爽定型，不能有濕黏生麵糰帶。若外層已上色而中心仍黏糊，將鍋移到較弱的炭火處或降低爐火，每 2 分鐘翻面並以 2 分鐘為單位續煎，直到中心定型。不要供應未熟麵糰。",
    "フライパンに薄く油を塗ります。安定した弱い熾火の上、またはフライパンを中弱火にして、円形の生地を数枚ずつ片面7〜9分焼きます。色むらを防ぐため2分ごとに返します。最初の1枚の最も厚い中心を切って確認します。内側は乾いたパン屑のように火が通り、湿った粘りのある生地が残らない状態にします。外側が色づいたのに中心が生なら、より弱い熾火に鍋を移すか火を弱め、2分ごとに返しながら2分ずつ追加で焼き、中心が固まったことを確認します。生の生地は出しません。",
    "팬에 기름을 얇게 바릅니다. 안정된 약한 숯불 위에 굽거나 팬을 중약불로 달궈 반죽을 나누어 한 면당 7–9분 굽습니다. 고르게 색이 나도록 2분마다 뒤집습니다. 첫 조각의 가장 두꺼운 가운데를 잘라 확인합니다. 속은 보송하게 익어야 하며 젖고 끈적한 반죽 줄이 없어야 합니다. 겉은 갈색인데 속이 질척하면 팬을 더 약한 숯불로 옮기거나 불을 낮추고, 2분마다 뒤집으며 2분씩 더 익혀 속이 굳었는지 확인합니다. 생반죽은 내지 않습니다.",
    "ทาน้ำมันบาง ๆ บนกระทะ ย่างแป้งเป็นชุด ๆ เหนือถ่านที่อ่อนและสม่ำเสมอ หรือใช้กระทะไฟกลางอ่อน ด้านละ 7–9 นาที พลิกทุก 2 นาทีให้สีเสมอกัน ผ่าตรงกลางของชิ้นแรกที่หนาที่สุดตรวจ เนื้อในควรสุกแห้งและเซ็ต ไม่มีแถบแป้งเปียกเหนียว หากด้านนอกเป็นสีน้ำตาลแต่ตรงกลางยังเหนียว ให้ย้ายกระทะไปเหนือถ่านที่อ่อนกว่า หรือลดไฟ พลิกทุก 2 นาทีและย่างเพิ่มครั้งละ 2 นาทีจนเนื้อในเซ็ต ห้ามเสิร์ฟแป้งดิบ"
  ));
  addOfficialSource(recipe, "FDA — Flour Is a Raw Food and Other Safety Facts", flourSafety);
}

export function refineSeventyThirdMethods(recipes) {
  const byId = new Map();
  for (const id of ["gigantes-plaki", "pao-de-queijo", "sticky-toffee-pudding", "campfire-bannock"]) {
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
  reviseGigantes(byId.get("gigantes-plaki"));
  revisePaoDeQueijo(byId.get("pao-de-queijo"));
  reviseStickyToffee(byId.get("sticky-toffee-pudding"));
  reviseCampfireBannock(byId.get("campfire-bannock"));
}
