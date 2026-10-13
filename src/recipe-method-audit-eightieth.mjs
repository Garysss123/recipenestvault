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

function note(list, index, localized) {
  list[index] = localized;
}

function addOfficialSource(recipe, label, url) {
  const title = "Official food-safety guidance — " + label;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function addHandlingSource(recipe) {
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

function setLeftoverStorage(recipe, dish, bestTexture) {
  recipe.storage = ml(
    "For best " + bestTexture + ", serve freshly made. If keeping leftovers, divide into shallow clean containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 3 days. Reheat only the portion to eat, stirring or turning as needed, until it reaches 74°C/165°F throughout. This is the safety minimum for reheated leftovers; it is not the fresh " + dish + " quality cue.",
    "現做現吃的" + bestTexture + "最好。若要保存剩食，分裝於乾淨淺盒，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持在 4°C／40°F 或以下，3 天內食用。只取要吃的份量，視需要攪拌或翻動，回熱至整體達 74°C／165°F。這是剩食回熱的安全最低溫度，不是新做" + dish + "的口感判斷。",
    bestTexture + "を楽しむなら作りたてを供します。残りは清潔な浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3日以内に食べます。食べる分だけ、必要に応じて混ぜたり返したりしながら全体が74°C/165°Fに達するまで再加熱します。これは温め直す残り物の安全最低温度で、作りたての" + dish + "の食感の目安ではありません。",
    bestTexture + "을 즐기려면 갓 만들어 바로 냅니다. 남길 음식은 깨끗하고 얕은 용기에 나눠 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 먹을 양만 필요에 따라 저어 주거나 뒤집으며 속까지 74°C/165°F에 도달하도록 다시 데웁니다. 이는 남은 음식을 다시 데울 때의 안전 최소 온도이며 갓 만든 " + dish + "의 식감 기준은 아닙니다.",
    "หากต้องการ" + bestTexture + "ให้เสิร์ฟหลังทำเสร็จ หากเก็บของเหลือ ให้แบ่งใส่ภาชนะตื้นที่สะอาด แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า และกินภายใน 3 วัน อุ่นเฉพาะส่วนที่จะกิน คนหรือกลับด้านตามจำเป็นจนร้อนทั่วถึง 74°C/165°F นี่คืออุณหภูมิขั้นต่ำเพื่อความปลอดภัยของของเหลือที่อุ่นซ้ำ ไม่ใช่เกณฑ์เนื้อสัมผัสของ" + dish + "ที่ทำใหม่"
  );
}

function reviseJiufenTaroBalls(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Cut the peeled taro and sweet potato into the listed 3 cm pieces and steam them in separate shallow dishes for 20–25 minutes; the time is an estimate. Test the largest piece from each dish with a skewer: it should pass through the centre without resistance and the pieces should feel dry, not waterlogged. Keep condensation out of the dishes. If a centre is still firm, steam 3 minutes more and test again.",
    "芋頭與地瓜切成材料所列的 3 公分塊，分別放入淺盤蒸 20–25 分鐘；時間是估算。各盤挑最大塊，以竹籤刺到中心確認全程毫無阻力，塊體摸起來乾爽而非水汪汪。避免蒸氣凝水滴進盤中；若中心仍硬，再蒸 3 分鐘後重測。",
    "皮をむいたタロイモとさつまいもを材料欄どおり3cm角に切り、浅い器に分けて20〜25分蒸します。時間は目安です。各器の最も大きい一片に串を刺し、中心まで抵抗なく通ること、水っぽくなく乾いた状態を確認します。器に水滴が入らないようにします。中心が硬ければ3分追加して再確認します。",
    "껍질을 벗긴 토란과 고구마를 재료에 적힌 3cm 크기로 잘라 얕은 접시에 따로 담아 20–25분 찝니다. 시간은 추정치입니다. 각 접시에서 가장 큰 조각을 골라 꼬치가 중심까지 저항 없이 들어가는지, 물에 젖지 않고 보송한지 확인합니다. 접시에 물방울이 들어가지 않게 합니다. 중심이 단단하면 3분 더 찌고 다시 확인합니다.",
    "หั่นเผือกกับมันเทศที่ปอกแล้วเป็นชิ้น 3 ซม.ตามรายการวัตถุดิบ วางแยกในจานตื้นและนึ่ง 20–25 นาที โดยถือว่าเวลาเป็นค่าประมาณ ใช้ไม้เสียบชิ้นใหญ่ที่สุดของแต่ละจาน ต้องแทงถึงกลางได้โดยไม่มีแรงต้านและเนื้อไม่แฉะ ระวังน้ำควบแน่นหยดลงจาน หากกลางยังแข็งให้นึ่งเพิ่ม 3 นาทีแล้วตรวจอีกครั้ง"
  ));
  body(recipe, 1, ml(
    "While the roots are hot, weigh exactly 350 g cooked taro into one bowl and 350 g cooked sweet potato into another. Mash each until no hard lumps remain, then mix 25 g sugar into each. Keep the two colours separate; if a mash cools and stiffens, cover it while you finish the other bowl, then knead it warm rather than adding unmeasured liquid.",
    "趁根莖仍熱，分別秤出 350 公克熟芋頭和 350 公克熟地瓜，各放一碗。分別壓成沒有硬塊的泥，再各拌入 25 公克糖。兩種顏色分開處理；若其中一碗變涼而硬，先蓋好，完成另一碗後再趁溫揉開，不要任意加水。",
    "熱いうちに、蒸したタロイモ350gとさつまいも350gを別々の器に量ります。それぞれ硬い塊がなくなるまでつぶし、砂糖25gずつを混ぜます。2色は分けておきます。片方が冷めて固くなったら、もう片方を作る間に覆い、温かいうちに練り直します。量を決めずに水を加えません。",
    "따뜻할 때 익힌 토란 350g과 고구마 350g을 각각 따로 잽니다. 단단한 덩어리가 남지 않게 으깬 뒤 설탕을 각각 25g씩 섞습니다. 두 색 반죽은 따로 둡니다. 한쪽이 식어 굳으면 다른 쪽을 만드는 동안 덮어 두었다가 따뜻할 때 다시 치대고, 물을 눈대중으로 넣지 않습니다.",
    "ขณะยังร้อน ชั่งเผือกสุก 350 กรัมใส่ชามหนึ่งและมันเทศสุก 350 กรัมอีกชาม บดแต่ละชามจนไม่มีก้อนแข็ง แล้วผสมน้ำตาลชามละ 25 กรัม แยกสองสีไว้ หากส่วนใดเย็นและแข็ง ให้คลุมไว้ระหว่างทำอีกชามแล้วนวดตอนอุ่น อย่าเติมน้ำโดยไม่ตวง"
  ));
  body(recipe, 2, ml(
    "Work 100 g tapioca starch into each mash and knead each for 2–3 minutes until smooth, flexible and only faintly tacky. If the rope cracks at its edges, knead in boiling water 10 ml at a time; stop as soon as it bends without splitting. If it sticks to your fingers, dust lightly with the tapioca starch already set aside for shaping, not a large extra handful.",
    "每碗泥各揉入 100 公克樹薯粉，各揉 2–3 分鐘，直到光滑、有延展性且只有微微黏手。若搓長條時邊緣裂開，每次加 10 毫升沸水揉勻；麵糰能彎折而不裂就停止。若黏手，以預留整形用樹薯粉薄薄防沾，不要一次撒入大量粉。",
    "それぞれのマッシュにタピオカ粉100gを混ぜ、各2〜3分、滑らかで柔軟、わずかに手につく程度まで練ります。棒状にしたとき端が割れる場合は、沸騰した湯を10mlずつ練り込み、割れずに曲がるところで止めます。手にべたつく場合は、成形用に取り分けたタピオカ粉を薄くまぶし、一度に大量に加えません。",
    "각 으깬 뿌리에 타피오카 전분 100g씩 넣고 2–3분 치대어 매끈하고 유연하며 살짝만 끈적한 상태로 만듭니다. 가느다란 막대로 굴릴 때 가장자리가 갈라지면 끓는 물을 10ml씩 넣어 치댑니다. 갈라지지 않고 휘어지는 즉시 멈춥니다. 손에 달라붙으면 성형용으로 남겨 둔 타피오카 전분을 얇게 묻히고 한꺼번에 많이 넣지 않습니다.",
    "นวดแป้งมันสำปะหลัง 100 กรัมลงในเนื้อบดแต่ละสี นวดสีละ 2–3 นาทีจนเนียน ยืดหยุ่น และติดมือเพียงเล็กน้อย หากขอบแตกตอนคลึงเป็นเส้น ให้เติมน้ำเดือดครั้งละ 10 มล.แล้วนวด หยุดทันทีเมื่อแป้งโค้งได้โดยไม่ปริ หากติดมือ ให้โรยแป้งมันที่กันไว้สำหรับคลุกบาง ๆ อย่าเทเพิ่มทีละมาก"
  ));
  body(recipe, 3, ml(
    "Keep the unused dough covered with a barely damp clean cloth. Roll each colour into 1.5 cm ropes and cut 2 cm pillows; cover the cut pieces as you work so their surfaces do not dry and split. Toss very lightly in the listed dusting starch, then shake off loose powder so it does not cloud the water.",
    "未操作的麵糰用微濕乾淨布巾覆蓋。兩種麵糰各搓成直徑 1.5 公分長條，切成 2 公分小枕塊；操作時隨手蓋住切好的芋圓，避免表面乾裂。以材料所列的防沾粉薄薄裹一層，再抖掉多餘粉末，避免煮水混濁。",
    "使わない生地は、清潔でごく軽く湿らせた布で覆います。各色を直径1.5cmの棒に伸ばし、2cm幅に切ります。作業中は切った団子を覆い、表面が乾いて割れないようにします。材料欄の打ち粉を薄くまぶし、湯が濁らないよう余分な粉を払います。",
    "쓰지 않는 반죽은 깨끗하게 살짝 적신 천으로 덮습니다. 각 색을 지름 1.5cm 막대로 굴려 2cm 길이로 자릅니다. 작업하는 동안 잘라 둔 조각을 덮어 표면이 마르고 갈라지지 않게 합니다. 재료에 적힌 덧가루를 얇게 묻히고 물이 탁해지지 않도록 남은 가루를 털어 냅니다.",
    "คลุมแป้งส่วนที่ยังไม่ใช้ด้วยผ้าสะอาดที่ชื้นเพียงเล็กน้อย คลึงแต่ละสีเป็นเส้นเส้นผ่านศูนย์กลาง 1.5 ซม.แล้วตัดยาว 2 ซม. คลุมชิ้นที่ตัดแล้วระหว่างทำเพื่อไม่ให้ผิวแห้งและแตก คลุกแป้งนวลตามรายการวัตถุดิบเพียงบาง ๆ แล้วสะบัดส่วนเกินออกเพื่อไม่ให้น้ำขุ่น"
  ));
  body(recipe, 4, ml(
    "Bring a large pot of water to a steady boil and cook the balls in two uncrowded batches, stirring once so none stick to the bottom. When all the pieces float, simmer 2 minutes more; cut one of the largest pieces open to check that the centre is hot and evenly chewy, with no dry, chalky starch core. If a centre is still pasty, simmer 1 minute more and test again. Transfer with a slotted spoon to ice water for 2 minutes, drain well and toss with 15 ml prepared syrup.",
    "大鍋水保持穩定沸騰，分兩批、不擁擠地煮芋圓；下鍋後輕攪一次以免黏底。所有芋圓浮起後再小滾 2 分鐘；切開最大的一顆，確認中心熱透、口感均勻軟 Q，沒有乾粉狀澱粉芯。若中心仍糊黏，再煮 1 分鐘重測。用漏勺撈入冰水 2 分鐘，瀝乾後拌入 15 毫升煮好的糖漿。",
    "大きな鍋の湯を安定して沸騰させ、団子を詰め込まず2回に分けてゆでます。底につかないよう一度だけ混ぜます。全部浮いてからさらに2分弱く沸かし、最も大きいものを一つ割って、中心まで熱く、均一にもっちりし、乾いた粉状の芯がないか確かめます。中心がまだねっとりする場合は1分追加して再確認します。穴あきお玉で氷水に移して2分冷やし、よく水を切ってシロップ15mlを絡めます。",
    "큰 냄비의 물을 계속 끓이고, 경단이 서로 붙지 않도록 두 번에 나누어 넉넉하게 삶습니다. 한 번 저어 바닥에 붙지 않게 합니다. 모두 떠오른 뒤 약한 끓음으로 2분 더 익힙니다. 가장 큰 것 하나를 잘라 중심까지 뜨겁고 균일하게 쫄깃하며 마르고 가루 같은 전분 심이 없는지 확인합니다. 속이 아직 질척하면 1분 더 삶고 다시 확인합니다. 구멍 국자로 얼음물에 옮겨 2분 식힌 뒤 물을 잘 빼고 준비한 시럽 15ml를 버무립니다.",
    "ต้มน้ำในหม้อใบใหญ่ให้เดือดสม่ำเสมอ แบ่งต้มสองชุดโดยไม่ใส่แน่น คนหนึ่งครั้งไม่ให้ติดก้นหม้อ เมื่อลูกทั้งหมดลอยแล้วให้เดือดอ่อนต่ออีก 2 นาที ผ่าลูกที่ใหญ่ที่สุดหนึ่งลูกดูว่าแกนร้อนและเหนียวนุ่มสม่ำเสมอ ไม่มีแกนแป้งแห้งเป็นผง หากกลางยังเละ ให้ต้มเพิ่ม 1 นาทีแล้วตรวจอีกครั้ง ตักด้วยกระชอนลงน้ำแข็ง 2 นาที สะเด็ดให้ดีแล้วคลุกน้ำเชื่อมที่เตรียมไว้ 15 มล."
  ));
  body(recipe, 5, ml(
    "While the balls cook, simmer the listed 1 L water, brown sugar and ginger for 12 minutes, stirring until the sugar dissolves; the syrup should taste rounded and lightly gingered, not thick like candy. Cool it to warm or chill it. Divide 150 g mixed balls and 180 ml syrup per bowl. For the best springy chew, serve within 2 hours; if saving any, follow the refrigerated leftover guidance below.",
    "煮芋圓時，將材料所列的 1 公升水、黑糖和薑小火煮 12 分鐘，攪至糖溶解；糖漿應甜味圓潤、帶淡淡薑香，不需煮成糖膏。放至溫熱或冷藏。每碗盛 150 公克混合芋圓與 180 毫升糖漿。要有彈 Q 口感，最好 2 小時內食用；若要保存，依下方剩食指引冷藏。",
    "団子をゆでる間に、材料欄の水1L、黒糖、しょうがを12分煮て、砂糖が溶けるまで混ぜます。飴のように濃くせず、丸みのある甘さとほのかな生姜の香りにします。温かくなるまで冷ますか、冷蔵します。器に団子150gとシロップ180mlを盛ります。弾力のある食感は2時間以内が最良です。保存する場合は下記の残り物の案内に従います。",
    "경단을 삶는 동안 재료에 적힌 물 1L, 흑설탕, 생강을 12분 끓여 설탕을 녹입니다. 시럽은 사탕처럼 되직하지 않고 부드러운 단맛과 은은한 생강 향이 나야 합니다. 따뜻해질 때까지 식히거나 차게 둡니다. 그릇마다 모둠 경단 150g과 시럽 180ml를 담습니다. 쫄깃한 식감은 2시간 안에 먹을 때 가장 좋습니다. 남길 것은 아래 냉장 보관 안내를 따릅니다.",
    "ระหว่างต้มลูก บั้งน้ำ 1 ลิตร น้ำตาลทรายแดง และขิงตามรายการวัตถุดิบ 12 นาที คนจนน้ำตาลละลาย น้ำเชื่อมควรหวานกลมกล่อมและหอมขิงอ่อน ๆ ไม่ข้นเป็นลูกอม พักให้เหลืออุ่นหรือแช่เย็น ตักลูกผสม 150 กรัมกับน้ำเชื่อม 180 มล.ต่อชาม หากต้องการความหนึบเด้งให้กินภายใน 2 ชั่วโมง หากเก็บให้ทำตามคำแนะนำของเหลือด้านล่าง"
  ));
  note(recipe.tips, 0, ml(
    "The steamed-root weights matter: measure 350 g of each cooked mash before adding the 100 g starch so the dough stays tender instead of rubbery.",
    "蒸熟後先各秤 350 公克，再各加 100 公克樹薯粉；比例準確，芋圓才軟 Q 不會橡皮般韌。",
    "蒸した後にそれぞれ350gを量ってから粉を100g加えます。この比率を守るとゴムのようにならず柔らかく仕上がります。",
    "찐 뒤 각각 350g을 잰 다음 전분 100g씩 넣어야 고무처럼 질기지 않고 부드럽습니다.",
    "ชั่งเนื้อที่นึ่งแล้วสีละ 350 กรัมก่อนใส่แป้งมันสีละ 100 กรัม สัดส่วนนี้ช่วยให้หนึบพอดีไม่เหนียวเหมือนยาง"
  ));
  note(recipe.tips, 1, ml(
    "Cover the dough and cut pieces between batches; exposed surfaces dry quickly and can split before they reach the pot.",
    "分批操作時蓋好麵糰與切塊；裸露表面很快變乾，入鍋前就可能裂開。",
    "作業の合間は生地と切った団子を覆います。露出した面はすぐ乾き、鍋に入れる前に割れることがあります。",
    "작업 중 반죽과 자른 조각을 덮어 둡니다. 표면이 금세 말라 냄비에 넣기 전에 갈라질 수 있습니다.",
    "คลุมแป้งและชิ้นที่ตัดแล้วระหว่างทำ ผิวที่เปิดไว้จะแห้งเร็วและอาจปริก่อนลงหม้อ"
  ));
  note(recipe.commonMistakes, 0, ml(
    "A wet mash or extra starch added all at once makes dense, rubbery balls. Weigh the cooked roots, add the listed starch, then correct only dry cracks with boiling water in 10 ml increments.",
    "芋泥太濕或一次多加粉，芋圓會變得緊實橡皮。熟芋頭秤重後加入配方粉量；只有麵糰乾裂時才每次加 10 毫升沸水修正。",
    "水っぽいマッシュや粉の一度入れすぎは、硬くゴムのような団子になります。蒸した根菜を量って表示の粉を加え、乾いて割れる場合だけ沸騰した湯を10mlずつ足します。",
    "물기 많은 으깬 재료나 전분을 한꺼번에 많이 넣으면 경단이 단단하고 고무처럼 됩니다. 익힌 뿌리채소를 잰 뒤 정량의 전분을 넣고, 마른 균열이 있을 때만 끓는 물을 10ml씩 넣어 보정합니다.",
    "เนื้อบดที่แฉะหรือเติมแป้งรวดเดียวมากเกินไปทำให้ลูกแข็งเหนียวเหมือนยาง ชั่งหัวที่สุกแล้ว ใส่แป้งตามสูตร และแก้เฉพาะรอยแตกแห้งด้วยน้ำเดือดครั้งละ 10 มล."
  ));
  note(recipe.commonMistakes, 1, ml(
    "Floating is only the first timing cue. Give the whole batch the extra 2 minutes, then cut the largest ball; if its centre is pasty, continue in 1-minute increments instead of serving it by colour alone.",
    "浮起只是開始計時的訊號。全數浮起後再煮 2 分鐘，切開最大一顆；若中心仍糊，就每次再煮 1 分鐘，不要只看顏色上桌。",
    "浮くのは時間を数え始める合図にすぎません。全て浮いてから2分ゆで、最も大きい団子を割ります。中心がねっとりしていれば、色だけで判断して供さず1分ずつ追加します。",
    "떠오르는 것은 익힘 시간을 세기 시작하는 신호일 뿐입니다. 모두 뜬 뒤 2분 더 삶고 가장 큰 경단을 잘라 봅니다. 중심이 질척하면 색만 보고 내지 말고 1분씩 더 익힙니다.",
    "การลอยเป็นเพียงสัญญาณเริ่มจับเวลา ต้มต่ออีก 2 นาทีหลังลูกลอยทั้งหมด แล้วผ่าลูกใหญ่ที่สุด หากแกนยังเละให้ต้มเพิ่มครั้งละ 1 นาที อย่าตัดสินจากสีภายนอกอย่างเดียว"
  ));
  setLeftoverStorage(recipe, "Jiufen taro balls", "springy chew");
  addHandlingSource(recipe);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
}

function reviseMapleTaffy(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Pack 2 L clean fresh snow into a shallow metal pan at least 4 cm deep and keep it cold while you cook. Use snow only from a source you can keep free of visible debris and splash; if that is uncertain, use food-grade shaved ice. Set out all 8 sticks and a clean tray before heating the syrup, because the pour and rolling happen quickly.",
    "將 2 公升乾淨新雪壓入淺金屬盤，厚度至少 4 公分，煮糖時保持低溫。只用能避免明顯碎屑和飛濺污染的雪；若無法確認，改用食品級刨冰。加熱糖漿前先備好 8 根木棒與乾淨托盤，因為倒糖和捲糖要迅速完成。",
    "清潔な新雪2Lを浅い金属皿に4cm以上の深さに詰め、シロップを煮る間は冷たく保ちます。目に見えるごみや飛沫で汚れない雪を使い、確かでなければ食品用のかき氷を使います。シロップを加熱する前に、棒8本と清潔なトレーを用意します。流して巻く作業はすぐに行います。",
    "깨끗한 새 눈 2L를 얕은 금속 팬에 최소 4cm 깊이로 눌러 담고 시럽을 끓이는 동안 차갑게 둡니다. 눈에 보이는 이물질이나 튐으로 오염되지 않을 눈을 쓰고, 확실하지 않으면 식품용 빙수를 사용합니다. 시럽을 가열하기 전에 나무 막대 8개와 깨끗한 쟁반을 준비합니다. 붓고 말아야 하므로 빠르게 진행합니다.",
    "อัดหิมะใหม่ที่สะอาด 2 ลิตรในถาดโลหะตื้นให้ลึกอย่างน้อย 4 ซม. และรักษาความเย็นระหว่างต้มน้ำเชื่อม ใช้หิมะจากบริเวณที่แน่ใจว่าไม่มีเศษหรือสิ่งกระเด็นปน หากไม่แน่ใจให้ใช้น้ำแข็งไสสำหรับอาหาร เตรียมไม้ 8 อันกับถาดสะอาดก่อนตั้งน้ำเชื่อม เพราะต้องรินและม้วนอย่างรวดเร็ว"
  ));
  body(recipe, 1, ml(
    "Pour the 500 ml syrup into a tall, heavy saucepan; dissolve the optional 1 g salt before heating. Clip a candy thermometer so its tip sits in the syrup without touching the pan bottom. Bring to a steady boil over medium-high heat without stirring; if foam climbs the sides, lower the heat until it settles. Keep watching the pan.",
    "將 500 毫升糖漿倒入高身厚底鍋；可選的 1 公克鹽先在冷糖漿中溶解。夾上糖果溫度計，探針浸在糖漿中但不碰鍋底。中大火煮至穩定沸騰，之後不要攪拌；若泡沫沿鍋壁升高，先轉小火讓泡沫下降，並全程看顧。",
    "シロップ500mlを背の高い厚手鍋に入れます。塩を使う場合は1gを冷たいシロップに溶かします。キャンディ用温度計を留め、先端はシロップに浸し、鍋底に触れないようにします。中強火で安定して沸かし、沸騰後は混ぜません。泡が鍋の縁に上がったら弱火にして落ち着かせ、目を離しません。",
    "시럽 500ml를 높고 두꺼운 냄비에 붓습니다. 선택 사항인 소금 1g은 가열 전에 녹입니다. 사탕 온도계 끝이 시럽에 잠기되 냄비 바닥에 닿지 않도록 고정합니다. 중강불로 안정적으로 끓이고 끓기 시작하면 젓지 않습니다. 거품이 가장자리로 올라오면 불을 낮춰 가라앉히고 계속 지켜봅니다.",
    "เทน้ำเชื่อม 500 มล.ลงหม้อทรงสูงก้นหนา หากใช้เกลือ 1 กรัมให้ละลายในน้ำเชื่อมเย็นก่อน หนีบเทอร์โมมิเตอร์ทำขนมโดยให้ปลายจุ่มในน้ำเชื่อมแต่ไม่แตะก้นหม้อ ต้มไฟกลางค่อนแรงให้เดือดสม่ำเสมอและอย่าคนเมื่อเดือด หากฟองสูงถึงขอบหม้อให้ลดไฟจนสงบและเฝ้าดูตลอด"
  ));
  body(recipe, 2, ml(
    "At sea level, boil toward 114–116°C/237–240°F, adjusting the heat so the syrup bubbles without boiling over; the time varies with the pan and stove. Local air pressure can shift the thermometer reading, so drip a little syrup into a glass of cold water as well: it should gather into a soft ball that flattens easily when lifted. Remove the pan from the heat once that texture appears. This soft-ball stage is a confectionery texture target for pliable taffy, not a food-safety minimum or proof that another food is safe.",
    "海平面煮至約 114–116°C／237–240°F，調節火力讓糖漿沸騰但不溢鍋；所需時間會因鍋具和爐火而異。當地氣壓會改變溫度計讀數，因此也滴少量糖漿到一杯冷水中確認：應聚成軟球，提起後容易壓扁。出現此口感就離火。軟球階段是柔韌太妃糖的糖果口感目標，不是食安最低溫度，也不能證明其他食物安全。",
    "海面高度では114〜116°C/237〜240°Fを目安に煮ます。鍋や火力で時間は変わるため、吹きこぼれない泡立ちを保つよう調整します。気圧で温度計の値が変わるので、シロップを少量冷水に落としても確認します。柔らかい球になり、持ち上げると簡単につぶれる状態が目安です。その状態になったら火から外します。このソフトボール段階はタフィーの食感目標で、食品安全の最低温度でも、他の食品の安全を示すものでもありません。",
    "해수면에서는 114–116°C/237–240°F를 목표로 끓이되, 냄비와 화력에 따라 시간이 달라지므로 넘치지 않게 불을 조절합니다. 현지 기압에 따라 온도계 값이 달라질 수 있으니 시럽 한 방울을 찬물 컵에 떨어뜨려 확인합니다. 부드러운 공 모양으로 모이고 들어 올리면 쉽게 납작해져야 합니다. 이 질감이 되면 불에서 내립니다. 소프트볼 단계는 태피의 제과 질감 목표이지 식품 안전 최소 온도나 다른 음식의 안전을 증명하는 값이 아닙니다.",
    "ที่ระดับน้ำทะเลให้ต้มใกล้ 114–116°C/237–240°F ปรับไฟให้น้ำเชื่อมเดือดแต่ไม่ล้น เวลาแตกต่างตามหม้อและเตา ความกดอากาศในพื้นที่อาจทำให้ค่าเทอร์โมมิเตอร์เปลี่ยน จึงหยดน้ำเชื่อมเล็กน้อยลงแก้วน้ำเย็นด้วย ควรจับเป็นลูกนุ่มและแบนได้ง่ายเมื่อยกขึ้น เมื่อได้เนื้อสัมผัสนี้ให้ยกลงจากเตา จุดซอฟต์บอลนี้เป็นเป้าหมายเนื้อสัมผัสของทอฟฟี ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัยหรือหลักฐานว่าอาหารอื่นปลอดภัย"
  ));
  body(recipe, 3, ml(
    "Wait about 30 seconds for the strongest bubbling to subside, then pour eight narrow, even ribbons across the cold snow, leaving space between them. Keep the pan close to the surface to avoid splashing. If the first ribbon spreads thinly instead of setting, stop pouring and check that the snow is still cold; do not return snow-contaminated syrup to the saucepan.",
    "等約 30 秒讓大泡沫消退，再在冷雪上平行倒出 8 條細而均勻的糖線，彼此留空。鍋靠近雪面倒，避免濺起。若第一條糖線攤薄而不凝，先停止倒糖並確認雪仍冰冷；沾到雪的糖漿不可倒回鍋中。",
    "約30秒待って大きな泡が落ち着いたら、冷たい雪の上に細く均一な線を8本、間隔を空けて流します。飛び散らないよう鍋を雪面近くで傾けます。最初の線が固まらず薄く広がる場合は注ぐのを止め、雪がまだ冷たいか確かめます。雪に触れたシロップを鍋に戻しません。",
    "약 30초 기다려 큰 거품이 가라앉으면 차가운 눈 위에 가늘고 고른 시럽 줄을 8개 간격을 두고 붓습니다. 튀지 않도록 냄비를 눈 표면 가까이 둡니다. 첫 줄이 굳지 않고 얇게 퍼지면 붓기를 멈추고 눈이 여전히 차가운지 확인합니다. 눈에 닿은 시럽은 냄비에 다시 붓지 않습니다.",
    "พักประมาณ 30 วินาทีให้ฟองใหญ่สงบ แล้วรินเป็นเส้นแคบสม่ำเสมอ 8 เส้นบนหิมะเย็น เว้นระยะกัน ยกหม้อใกล้ผิวหิมะเพื่อไม่ให้กระเด็น หากเส้นแรกแผ่บางและไม่เซ็ตตัว ให้หยุดรินและตรวจว่าหิมะยังเย็น อย่าเทน้ำเชื่อมที่สัมผัสหิมะกลับลงหม้อ"
  ));
  body(recipe, 4, ml(
    "After 15–30 seconds, touch one ribbon with a clean stick: it should feel tacky and bend without flowing. Roll each strip toward you and eat promptly. If it snaps hard, the syrup went past the soft-ball stage; if it smears, the snow may be warm or the syrup undercooked. Adjust the next clean batch rather than judging safety by the candy texture.",
    "15–30 秒後，用乾淨木棒輕碰一條糖線：應有黏性、可彎折而不流動。把糖線朝自己捲起，趁新鮮食用。若一碰就硬脆，糖漿超過軟球階段；若抹開，可能是雪不夠冷或糖漿未煮到位。下一批再調整，不要用糖果口感判斷食安。",
    "15〜30秒後、清潔な棒で1本に触れます。べたつきがあり、流れずに曲がる状態が目安です。手前に巻き、すぐ食べます。触れてすぐ硬く割れるならソフトボール段階を超えています。塗り広がるなら雪が温かいか、煮詰め不足です。安全性を菓子の食感で判断せず、次の清潔な一回で調整します。",
    "15–30초 뒤 깨끗한 막대로 한 줄을 건드려 봅니다. 끈적하고 흐르지 않으면서 휘어져야 합니다. 각 줄을 몸 쪽으로 말아 바로 먹습니다. 닿자마자 딱딱하게 부러지면 소프트볼 단계를 넘긴 것이고, 문질러 퍼지면 눈이 따뜻하거나 시럽이 덜 졸여진 것입니다. 사탕의 식감으로 안전성을 판단하지 말고 다음 깨끗한 배치에서 조정합니다.",
    "หลัง 15–30 วินาที ใช้ไม้สะอาดแตะเส้นหนึ่ง เส้นควรเหนียวและงอได้โดยไม่ไหล ม้วนแต่ละเส้นเข้าหาตัวแล้วกินทันที หากแข็งกรอบเมื่อแตะแสดงว่าต้มเกินจุดซอฟต์บอล หากเลอะเป็นป้าย หิมะอาจอุ่นหรือน้ำเชื่อมยังไม่ข้น อย่าใช้เนื้อสัมผัสของขนมตัดสินความปลอดภัย ให้ปรับชุดใหม่ที่สะอาด"
  ));
  note(recipe.tips, 0, ml(
    "Check that the thermometer tip is immersed but not touching the pan; a false reading changes the pull and chew of the taffy.",
    "確認溫度計探針浸在糖漿中但沒有碰鍋底；讀數失準會改變太妃糖的延展與嚼感。",
    "温度計の先端はシロップに浸し、鍋底には触れさせません。誤った測定はタフィーの伸びや噛みごたえに影響します。",
    "온도계 끝은 시럽에 잠기되 냄비 바닥에 닿지 않게 합니다. 잘못된 측정은 태피의 늘어남과 씹는 식감을 바꿉니다.",
    "ให้ปลายเทอร์โมมิเตอร์จุ่มในน้ำเชื่อมแต่ไม่แตะก้นหม้อ การอ่านค่าคลาดเคลื่อนทำให้ความเหนียวยืดและความหนึบเปลี่ยนไป"
  ));
  note(recipe.tips, 1, ml(
    "Set the cold snow and sticks in place before heating syrup; once it reaches the soft-ball texture stage, the remaining steps move quickly.",
    "糖漿加熱前先備好冷雪與木棒；達到軟球口感階段後，後續動作很快。",
    "シロップを加熱する前に冷たい雪と棒を用意します。ソフトボール段階になってからは手早く進みます。",
    "시럽을 데우기 전에 차가운 눈과 막대를 준비합니다. 소프트볼 질감 단계에 이르면 다음 과정이 빠르게 진행됩니다.",
    "เตรียมหิมะเย็นและไม้ให้พร้อมก่อนต้มน้ำเชื่อม เมื่อถึงจุดเนื้อสัมผัสซอฟต์บอลแล้วต้องทำขั้นตอนต่อไปอย่างรวดเร็ว"
  ));
  note(recipe.commonMistakes, 0, ml(
    "Walking away from a tall pot invites boil-over. If the foam rises, lower the heat and let it settle; do not stir boiling syrup or try to catch an overflow by moving the hot pot.",
    "高鍋煮糖時離開容易溢鍋。泡沫上升就轉小火等它下降；不要攪拌沸騰糖漿，也不要搬動燙鍋來接溢出的糖。",
    "背の高い鍋を放置すると吹きこぼれやすくなります。泡が上がったら火を弱めて落ち着かせ、沸騰中のシロップを混ぜたり、熱い鍋を動かして受け止めたりしません。",
    "높은 냄비를 지켜보지 않으면 넘칠 수 있습니다. 거품이 올라오면 불을 낮춰 가라앉히고, 끓는 시럽을 젓거나 뜨거운 냄비를 옮겨 넘침을 받으려 하지 마세요.",
    "การละสายตาจากหม้อสูงทำให้น้ำเชื่อมล้นได้ หากฟองสูงให้ลดไฟและรอให้สงบ อย่าคนน้ำเชื่อมที่เดือดหรือย้ายหม้อร้อนเพื่อรองน้ำที่ล้น"
  ));
  note(recipe.commonMistakes, 1, ml(
    "A brittle ribbon means the syrup overshot the texture stage; a ribbon that smears points to syrup short of the stage or snow that has warmed. Change one cause at a time on the next batch, and never treat 114–116°C/237–240°F as a microbial safety endpoint.",
    "糖線硬脆表示糖漿超過口感階段；糖線抹開則表示糖漿未達階段或雪已回溫。下一批一次只調整一個原因，且不可把 114–116°C／237–240°F 當成微生物安全終點。",
    "線が硬く割れるなら煮詰めすぎ、線が塗り広がるなら煮詰め不足か雪が温まっています。次の回は原因を一つずつ調整し、114〜116°C/237〜240°Fを微生物学的な安全温度として扱いません。",
    "줄이 딱딱하게 부러지면 질감 단계보다 더 졸인 것이고, 문질러 퍼지면 덜 졸였거나 눈이 따뜻해진 것입니다. 다음 배치에서 원인을 하나씩 조정하고 114–116°C/237–240°F를 미생물 안전 온도로 취급하지 마세요.",
    "เส้นที่แข็งกรอบหมายถึงต้มเกินจุดเนื้อสัมผัส ส่วนเส้นที่เลอะเป็นป้ายหมายถึงยังไม่ถึงจุดหรือหิมะอุ่นขึ้น ปรับทีละสาเหตุในชุดถัดไป และอย่าถือว่า 114–116°C/237–240°F เป็นจุดสิ้นสุดเพื่อฆ่าเชื้อ"
  ));
  recipe.storage = ml(
    "The rolled taffy is best eaten promptly for its pliable texture. Keep any clean syrup that did not touch snow in a separate sealed container and follow the opened-syrup label; never return snow-contact syrup to the pan.",
    "太妃糖現捲現吃最柔韌。未接觸雪的乾淨剩餘糖漿另裝密封容器，依開封糖漿標示保存；接觸過雪的糖漿不可倒回鍋中。",
    "巻いたタフィーは柔らかいうちにすぐ食べます。雪に触れていない清潔なシロップだけを別の密閉容器に入れ、開封後の表示に従って保存します。雪に触れたシロップは鍋に戻しません。",
    "말아 둔 태피는 부드러울 때 바로 먹는 것이 좋습니다. 눈에 닿지 않은 깨끗한 남은 시럽만 별도의 밀폐 용기에 담아 개봉 후 표시를 따릅니다. 눈에 닿은 시럽은 냄비에 다시 붓지 마세요.",
    "ทอฟฟีที่ม้วนแล้วควรกินทันทีขณะยืดหยุ่น น้ำเชื่อมสะอาดที่ยังไม่สัมผัสหิมะให้แยกใส่ภาชนะปิดสนิทและทำตามฉลากหลังเปิด อย่าเทน้ำเชื่อมที่สัมผัสหิมะกลับลงหม้อ"
  );
  addHandlingSource(recipe);
}

function reviseInjera(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Use a clean, roomy fermentation vessel. Whisk 500 g teff flour with 700 ml potable water until no dry pockets remain, then stir in 60 g active ersho starter. The batter should pour in a thick ribbon; scrape the sides above the batter line so dried residue does not fall back in. Wash hands and tools after handling the raw flour.",
    "使用乾淨且容量足夠的發酵容器。500 公克鐵夫粉與 700 毫升可飲用水攪至沒有乾粉，再拌入 60 公克活躍 ersho 酵種。麵糊應能以濃稠細帶流下；刮淨液面以上的容器壁，避免乾掉的殘料掉回麵糊。接觸生麵粉後洗手並清洗器具。",
    "清潔で余裕のある発酵容器を使います。テフ粉500gと飲用水700mlを乾いた粉だまりがなくなるまで混ぜ、活性のあるエルショ種60gを加えます。生地は太めのリボン状に流れる濃度にします。液面より上の容器の側面を拭い、乾いた残りが落ちないようにします。生の粉を扱った後は手と器具を洗います。",
    "깨끗하고 여유 있는 발효 용기를 씁니다. 테프 가루 500g과 마실 수 있는 물 700ml를 마른 가루 덩어리가 없게 섞고 활성 에르쇼 스타터 60g을 넣습니다. 반죽은 굵은 리본처럼 흘러야 합니다. 반죽 높이 위 용기 벽을 긁어 말라붙은 찌꺼기가 다시 들어가지 않게 합니다. 생밀가루를 만진 뒤 손과 도구를 씻습니다.",
    "ใช้ภาชนะหมักที่สะอาดและมีพื้นที่พอ คนแป้งเทฟ 500 กรัมกับน้ำดื่ม 700 มล.จนไม่มีก้อนแป้งแห้ง แล้วคนหัวเชื้อเออร์โชที่ยังทำงาน 60 กรัม แป้งควรไหลเป็นสายหนืด ปาดผนังภาชนะเหนือระดับแป้งไม่ให้คราบแห้งตกกลับลงไป ล้างมือและอุปกรณ์หลังสัมผัสแป้งดิบ"
  ));
  body(recipe, 1, ml(
    "Cover loosely so gas can escape and ferment for the listed 48 hours at a steady cool room temperature; time can vary with the room and starter. Bubbles and a thin liquid layer show fermentation activity, while a clean tang is a flavour cue only—not proof of safety. Do not taste this raw flour batter. Discard the entire batch if mold, pink/orange patches, or a foul odor appears; do not skim the surface.",
    "鬆鬆覆蓋讓氣體能排出，在穩定偏涼的室溫發酵材料所列的 48 小時；實際時間會受室溫與酵種影響。氣泡和薄液層表示發酵正在進行，清爽微酸氣味只是風味訊號，不是安全證明。不要試吃生麵糊。若出現霉、粉紅／橘色斑或腐敗臭味，整批丟棄，不可只撈掉表面。",
    "ガスが抜けるよう緩く覆い、涼しい一定の室温で表示どおり48時間発酵させます。実際の時間は室温と種によって変わります。泡や薄い液層は発酵の進行を示し、爽やかな酸味の香りは風味の合図にすぎず、安全の証明ではありません。生の粉の生地を味見しません。カビ、ピンク・橙色の斑点、腐敗臭があれば表面だけ取らず全量を捨てます。",
    "가스가 빠지도록 느슨하게 덮고 서늘하고 일정한 실온에서 표시된 48시간 발효합니다. 실제 시간은 실내 온도와 스타터 상태에 따라 달라집니다. 기포와 얇은 액체층은 발효 진행 신호이고 산뜻한 신 냄새는 풍미 신호일 뿐 안전을 증명하지 않습니다. 생밀가루 반죽을 맛보지 마세요. 곰팡이, 분홍/주황 반점, 부패취가 생기면 표면만 걷어내지 말고 전량 버립니다.",
    "คลุมหลวม ๆ ให้ก๊าซระบายได้ หมัก 48 ชั่วโมงตามสูตรในอุณหภูมิห้องที่เย็นและคงที่ เวลาอาจต่างตามอุณหภูมิและหัวเชื้อ ฟองและชั้นน้ำบาง ๆ แสดงว่ากำลังหมัก กลิ่นเปรี้ยวสะอาดบอกเรื่องรสชาติเท่านั้น ไม่ได้ยืนยันความปลอดภัย อย่าชิมแป้งดิบ หากมีรา จุดสีชมพู/ส้ม หรือกลิ่นเน่า ให้ทิ้งทั้งชุด อย่าตักเฉพาะผิวหน้าออก"
  ));
  body(recipe, 2, ml(
    "After fermentation, pour off only a visibly excessive thin liquid layer; if there is no layer, keep the batter. Stir from the bottom, then add the remaining listed water gradually until it falls from a spoon in a thin, steady ribbon. Mix in the 6 g salt and rest 30 minutes. If the batter still spreads thickly in a test pour, add the remaining water 15 ml at a time rather than guessing.",
    "發酵後若表面有明顯過多的薄液層才倒掉；沒有液層就保留麵糊。從底部攪勻，再逐次加入剩餘配方水，直到麵糊從湯匙以細而穩定的帶狀流下。拌入 6 公克鹽，靜置 30 分鐘。若試倒仍攤得厚，每次加 15 毫升剩餘水，不要憑感覺一次倒入。",
    "発酵後、薄い液体が目に見えて多い場合だけ少量捨てます。層がなければそのまま使います。底から混ぜ、残りの水を少しずつ加え、スプーンから細く安定したリボン状に落ちる濃度にします。塩6gを混ぜ、30分休ませます。試しに流して厚く広がる場合は、残りの水を15mlずつ加えます。目分量で一度に入れません。",
    "발효 뒤 얇은 액체층이 눈에 띄게 많을 때만 조금 따라냅니다. 층이 없으면 반죽을 그대로 둡니다. 바닥부터 저은 다음 남은 물을 조금씩 넣어 숟가락에서 가늘고 일정한 리본처럼 흐르게 합니다. 소금 6g을 섞어 30분 쉽니다. 시험 삼아 부었을 때 두껍게 퍼지면 남은 물을 15ml씩 넣고 눈대중으로 한꺼번에 붓지 않습니다.",
    "หลังหมัก ให้เทชั้นน้ำบาง ๆ ออกเฉพาะเมื่อมีมากเห็นได้ชัด หากไม่มีชั้นน้ำให้เก็บแป้งไว้ คนจากก้นภาชนะแล้วค่อยเติมน้ำที่เหลือจนไหลจากช้อนเป็นสายบางสม่ำเสมอ ใส่เกลือ 6 กรัม พัก 30 นาที หากลองเทแล้วแผ่หนา ให้เติมน้ำที่เหลือครั้งละ 15 มล. อย่าเทกะเอาทีเดียว"
  ));
  body(recipe, 3, ml(
    "Preheat the clean nonstick skillet or mitad over medium until a teaspoon of batter sets on contact without browning. Wipe the surface with only a trace of oil. If the test sticks or browns before holes form, let the pan heat longer and wipe away excess oil; do not solve sticking by flooding the pan with oil.",
    "乾淨的不沾鍋或 mitad 以中火預熱，滴一茶匙麵糊，應一接觸鍋面就凝住但不變褐色。鍋面只抹極薄一層油。若試麵糊黏鍋或尚未起孔就上色，讓鍋多熱一會並擦掉多餘油；不要倒大量油來解決黏鍋。",
    "清潔なフッ素加工フライパンまたはミタッドを中火で予熱します。生地を小さじ1杯落とし、触れたら固まり、焼き色はつかない状態を目安にします。表面には油をほんの薄く塗ります。試し焼きがくっつく、または穴ができる前に色づく場合は、さらに予熱し余分な油を拭き取ります。油を多く注いで解決しません。",
    "깨끗한 논스틱 팬이나 미타드를 중불로 예열합니다. 반죽 1작은술을 떨어뜨렸을 때 닿자마자 굳지만 갈색이 나지 않아야 합니다. 표면에는 기름을 아주 얇게만 바릅니다. 시험 반죽이 붙거나 구멍이 생기기 전에 갈색이 되면 팬을 더 예열하고 남는 기름을 닦습니다. 기름을 많이 부어 해결하지 마세요.",
    "อุ่นกระทะเคลือบหรือมิตัดที่สะอาดด้วยไฟกลางจนหยดแป้งหนึ่งช้อนชาเซ็ตตัวทันทีแต่ไม่เป็นสีน้ำตาล เช็ดผิวด้วยน้ำมันบางมาก หากแป้งทดลองติดหรือเป็นสีก่อนเกิดรู ให้อุ่นกระทะต่อและเช็ดน้ำมันส่วนเกิน อย่าแก้ปัญหาติดด้วยการเทน้ำมันมาก"
  ));
  body(recipe, 4, ml(
    "Pour a thin round from the outside toward the centre and cover at once. Cook until many small holes open across the top and the surface turns matte and dry, about 1–2 minutes depending on the pan; do not flip. If the top stays glossy with few holes, thin the batter with 15 ml water or adjust the pan heat, then test another small round.",
    "由外往中心繞圈倒出薄圓餅並立刻蓋上。煎約 1–2 分鐘，視鍋具而定；看到表面出現許多小孔、轉為霧面乾爽即可，不要翻面。若表面仍亮濕且孔很少，麵糊每次加 15 毫升水調稀或調整鍋溫，再試煎一小張。",
    "外側から中心へ渦巻き状に薄く流し、すぐ蓋をします。鍋によりますが約1〜2分、表面に小さな穴が多く開き、つやが消えて乾いたら完成です。裏返しません。表面につやが残り穴が少ない場合は、水を15ml加えて薄めるか火加減を調整し、小さく試し焼きします。",
    "바깥쪽에서 중심으로 나선형으로 얇게 붓고 바로 덮습니다. 팬에 따라 약 1–2분 익혀 윗면에 작은 구멍이 많이 생기고 윤기가 사라져 보송해지면 됩니다. 뒤집지 않습니다. 윗면이 계속 번들거리고 구멍이 적으면 물 15ml를 넣어 묽게 하거나 불을 조절한 뒤 작은 한 장을 다시 시험합니다.",
    "รินแป้งเป็นวงบางจากขอบเข้าหาศูนย์กลางแล้วปิดฝาทันที ปรุงประมาณ 1–2 นาทีขึ้นกับกระทะ จนมีรูเล็กจำนวนมากบนหน้าและผิวด้านแห้ง อย่าพลิก หากหน้ายังเงาและมีรูน้อย ให้เติมน้ำ 15 มล.เพื่อให้แป้งบางลงหรือปรับไฟ แล้วลองทำแผ่นเล็กอีกครั้ง"
  ));
  body(recipe, 5, ml(
    "When the top is matte and the edges release, slide a wide flexible spatula underneath and lift the injera without turning it over. Lay it flat on a clean rack or cloth until no steam rises, then stack. If the middle is still glossy, cover and cook 30 seconds more before lifting.",
    "表面霧面、邊緣能離鍋時，用寬而柔軟的鍋鏟從底部托起，不要翻面。平放於乾淨網架或布巾，待不再冒蒸氣後再疊放。若中心仍亮濕，蓋回鍋中再煎 30 秒後取起。",
    "表面がマットになり縁がはがれたら、幅広で柔らかいへらを差し入れ、裏返さずに持ち上げます。清潔な網または布に平らに置き、湯気が出なくなってから重ねます。中心につやが残る場合は蓋を戻し、さらに30秒焼いてから持ち上げます。",
    "윗면이 보송하고 가장자리가 떨어지면 넓고 유연한 주걱을 밑에 넣어 뒤집지 않고 들어 올립니다. 깨끗한 망이나 천에 평평하게 놓고 김이 더 이상 나지 않으면 쌓습니다. 가운데가 아직 번들거리면 뚜껑을 덮고 30초 더 익힌 뒤 들어 올립니다.",
    "เมื่อหน้าด้านและขอบล่อน ให้สอดตะหลิวกว้างและยืดหยุ่นแล้วยกขึ้นโดยไม่พลิก วางแผ่บนตะแกรงหรือผ้าสะอาดจนไม่มีไอแล้วค่อยซ้อน หากกลางยังเงา ให้ปิดฝาและปรุงต่อ 30 วินาทีก่อนยก"
  ));
  body(recipe, 6, ml(
    "Serve one injera flat as the platter and fold the remaining rounds on the side. Tear pieces at the table to scoop the stews. The holes, matte surface and dry-set centre are texture cues for fresh injera, not a thermometer-based safety endpoint.",
    "一張 injera 平鋪作餐盤，其餘摺起放在旁邊。上桌後撕小片搭配燉菜。孔洞、霧面與中心乾凝是新鮮 injera 的口感熟度訊號，不是以溫度計判定的食安終點。",
    "1枚を皿のように平らに敷き、残りは横に折って添えます。食卓でちぎり、煮込み料理をすくいます。穴、マットな表面、乾いて固まった中心は作りたての食感の目安であり、温度計で測る安全基準ではありません。",
    "한 장은 접시처럼 펼치고 나머지는 접어 곁들입니다. 식탁에서 떼어 스튜를 떠먹습니다. 구멍과 보송한 표면, 마른 중심은 갓 만든 인제라의 식감 기준이며 온도계로 확인하는 안전 종점은 아닙니다.",
    "วางแผ่นหนึ่งเป็นจานและพับแผ่นที่เหลือไว้ข้าง ๆ ฉีกชิ้นที่โต๊ะเพื่อกินกับสตู รู ลักษณะผิวด้าน และแกนที่เซ็ตแห้งเป็นสัญญาณเนื้อสัมผัสของอินเจราที่ทำใหม่ ไม่ใช่จุดสิ้นสุดด้านความปลอดภัยที่ตรวจด้วยเทอร์โมมิเตอร์"
  ));
  note(recipe.tips, 0, ml(
    "Mark the batter level and use a clean loose cover. Bubbles and a clean tang help you judge fermentation progress and flavour, but neither one establishes that raw flour batter is safe to eat.",
    "標記麵糊高度並用乾淨布巾鬆鬆覆蓋。氣泡和清爽微酸味可觀察發酵進度與風味，但都不能證明生麵粉麵糊可以食用。",
    "生地の高さに印をつけ、清潔な覆いを緩くかけます。泡や爽やかな酸味は発酵の進み具合や風味の手掛かりですが、生の粉の生地が安全だという証明にはなりません。",
    "반죽 높이를 표시하고 깨끗한 덮개를 느슨하게 씌웁니다. 기포와 산뜻한 신 향은 발효 진행과 풍미를 보는 단서일 뿐, 생밀가루 반죽이 안전하다는 증거는 아닙니다.",
    "ทำเครื่องหมายระดับแป้งและคลุมหลวม ๆ ด้วยผ้าสะอาด ฟองและกลิ่นเปรี้ยวสะอาดช่วยดูความคืบหน้าและรสชาติ แต่ไม่ได้ยืนยันว่าแป้งดิบปลอดภัยที่จะกิน"
  ));
  note(recipe.tips, 1, ml(
    "Make one small test injera before using the full batch. Adjust pan heat and batter thickness one at a time so the holes form before the underside browns.",
    "先用少量麵糊試煎一張，再煎整批。一次只調整鍋溫或麵糊濃度其中一項，讓上層先起孔、底面才不會過度上色。",
    "全量を焼く前に小さな試し焼きを一枚作ります。鍋の温度と生地の濃さは一度に一つずつ調整し、裏面が濃くなる前に穴ができるようにします。",
    "전체 반죽을 쓰기 전에 작은 인제라를 한 장 시험합니다. 팬 온도와 반죽 농도는 한 번에 하나씩 조절해 밑면이 갈색이 되기 전에 구멍이 생기게 합니다.",
    "ลองทำแผ่นเล็กหนึ่งแผ่นก่อนใช้แป้งทั้งหมด ปรับไฟหรือความข้นทีละอย่างเพื่อให้รูเกิดก่อนด้านล่างเป็นสีน้ำตาล"
  ));
  note(recipe.commonMistakes, 0, ml(
    "If no bubbles appear by the 48-hour check, do not taste the batter or leave it out indefinitely. Use a reliable active starter and restart the batch; discard it if activity is absent or anything looks or smells abnormal.",
    "48 小時檢查時若沒有氣泡，不要試吃，也不要無限延長室溫放置。改用可靠且活躍的酵種重新製作；若沒有發酵跡象或外觀、氣味異常，整批丟棄。",
    "48時間の確認時に泡がなければ、生地を味見したり、いつまでも室温に置いたりしません。確かな活性種で作り直し、発酵の兆候がない、または見た目や臭いに異常があれば全量を捨てます。",
    "48시간 확인 때 기포가 없으면 반죽을 맛보거나 계속 실온에 두지 마세요. 활동성 있는 믿을 만한 스타터로 새로 만들고, 발효 징후가 없거나 모양·냄새가 이상하면 전량 버립니다.",
    "หากไม่เกิดฟองเมื่อครบ 48 ชั่วโมง อย่าชิมแป้งหรือวางทิ้งไว้เรื่อย ๆ ให้เริ่มใหม่ด้วยหัวเชื้อที่เชื่อถือได้และยังทำงาน หากไม่มีสัญญาณหมักหรือรูปร่าง/กลิ่นผิดปกติให้ทิ้งทั้งชุด"
  ));
  note(recipe.commonMistakes, 1, ml(
    "A tightly sealed jar can trap fermentation gas. Keep the cover loose, and if mold or coloured patches appear, discard the entire batter; scraping the surface does not make it safe.",
    "容器密封太緊會累積發酵氣體。鬆鬆覆蓋；若出現霉或有顏色的斑點，整批麵糊丟棄，只刮掉表面並不安全。",
    "容器を密閉すると発酵ガスがたまります。覆いは緩くします。カビや色のついた斑点が出たら生地全体を捨てます。表面を削り取っても安全にはなりません。",
    "용기를 꽉 밀폐하면 발효 가스가 갇힙니다. 느슨하게 덮고 곰팡이나 색이 있는 반점이 보이면 반죽 전체를 버립니다. 표면만 긁어내도 안전해지지 않습니다.",
    "การปิดภาชนะสนิททำให้ก๊าซหมักสะสม ปิดหลวม ๆ หากมีราหรือจุดสี ให้ทิ้งแป้งทั้งหมด การขูดเฉพาะผิวหน้าไม่ได้ทำให้ปลอดภัย"
  ));
  setLeftoverStorage(recipe, "injera", "soft, flexible texture");
  addHandlingSource(recipe);
  addOfficialSource(recipe, "FDA — Flour Is a Raw Food and Other Safety Facts", rawFlour);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
}

function reviseHummus(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Add the full 120 g tahini, 60 ml lemon juice and 2 peeled garlic cloves to the processor. Blend 60 seconds, scrape the sides and base, then blend 30 seconds more until the mixture turns paler and holds soft ridges. If it seizes into a stiff paste, add 15 ml of the listed ice water and blend before adding any chickpeas.",
    "將 120 公克芝麻醬、60 毫升檸檬汁和 2 瓣去皮大蒜放入調理機。攪打 60 秒，刮下鍋壁與底部，再打 30 秒，直到顏色變淡並能形成柔軟紋路。若結成僵硬團塊，先加 15 毫升配方冰水攪打，再加入鷹嘴豆。",
    "タヒニ120g、レモン汁60ml、皮をむいたにんにく2片をプロセッサーに入れます。60秒回し、側面と底をこそげてからさらに30秒、色が淡くなり柔らかな筋が残るまで回します。固いペースト状に締まったら、ひよこ豆を加える前に材料欄の冷水を15ml加えて回します。",
    "타히니 120g, 레몬즙 60ml, 껍질 벗긴 마늘 2쪽을 푸드프로세서에 넣습니다. 60초 갈고 볼 옆과 바닥을 긁어 내린 뒤 30초 더 갈아 색이 옅어지고 부드러운 자국이 남게 합니다. 뻑뻑한 덩어리로 뭉치면 병아리콩을 넣기 전에 재료의 얼음물 15ml를 넣고 갈아 줍니다.",
    "ใส่ทาฮินี 120 กรัม น้ำเลมอน 60 มล. และกระเทียมปอก 2 กลีบในเครื่องปั่น ปั่น 60 วินาที ปาดด้านข้างและก้นโถ แล้วปั่นอีก 30 วินาทีจนสีอ่อนและเป็นรอยนุ่ม หากจับเป็นก้อนแข็ง ให้เติมน้ำเย็นตามสูตร 15 มล.แล้วปั่นก่อนใส่ถั่ว"
  ));
  body(recipe, 1, ml(
    "Add 240 g of the drained, rinsed chickpeas and all 4 g cumin. Pulse 5 times to break them up, scrape the bowl once, then blend about 30 seconds until no whole chickpeas remain. If the motor labours, stop it and scrape down instead of holding the switch against a jam.",
    "加入瀝乾、沖洗過的 240 公克鷹嘴豆和全部 4 公克孜然。點打 5 次打碎豆子，刮一次鍋邊，再攪打約 30 秒，直到看不到整顆豆子。若馬達吃力，先停機刮下材料，不要硬按開關。",
    "水を切ってすすいだひよこ豆240gとクミン4gを全量加えます。5回パルスして豆を崩し、一度器をこそげ、丸ごとの豆がなくなるまで約30秒回します。モーターに負荷がかかったら、スイッチを押し続けず止めて材料を落とします。",
    "물기를 빼고 헹군 병아리콩 240g과 커민 4g을 모두 넣습니다. 5번 짧게 돌려 콩을 부수고 볼을 한 번 긁은 뒤 통콩이 보이지 않을 때까지 약 30초 갈아 줍니다. 모터가 버거워하면 스위치를 누른 채 버티지 말고 멈춰 재료를 긁어 내립니다.",
    "ใส่ถั่วลูกไก่ที่สะเด็ดและล้างแล้ว 240 กรัมกับยี่หร่าทั้งหมด 4 กรัม กดปั่นสั้น 5 ครั้งให้ถั่วแตก ปาดโถหนึ่งครั้ง แล้วปั่นประมาณ 30 วินาทีจนไม่เห็นถั่วทั้งเม็ด หากมอเตอร์ฝืดให้หยุดและปาดส่วนผสม อย่ากดค้างขณะเครื่องติดขัด"
  ));
  body(recipe, 2, ml(
    "Add the remaining 240 g chickpeas, 60 ml olive oil and 5 g salt. Blend 2 minutes, scrape once, then blend 1 minute while adding the listed 60 ml ice water in a thin stream, starting with about 45 ml. Stop when the hummus is smooth, glossy and falls from a spoon in a thick ribbon. If it is still coarse, blend 30 seconds more; if too stiff, add the remaining water 15 ml at a time. These are texture cues, not a food-safety test.",
    "加入剩餘 240 公克鷹嘴豆、60 毫升橄欖油和 5 公克鹽。先打 2 分鐘、刮一次，再打 1 分鐘，同時細細加入配方 60 毫升冰水，先加約 45 毫升。鷹嘴豆泥應細滑、有光澤，並以濃稠細帶從湯匙落下即可停。若仍粗糙，再打 30 秒；若太硬，每次加 15 毫升剩餘冰水。這些是口感訊號，不是食安檢查。",
    "残りのひよこ豆240g、オリーブ油60ml、塩5gを加えます。2分回して一度こそげ、さらに1分回しながら、材料欄の冷水60mlを細く加えます。まず約45mlから始めます。滑らかでつやがあり、スプーンから太いリボン状に落ちる状態で止めます。粗ければ30秒追加し、固ければ残りの水を15mlずつ加えます。これらは食感の目安で、食品安全の検査ではありません。",
    "남은 병아리콩 240g, 올리브오일 60ml, 소금 5g을 넣습니다. 2분 갈고 한 번 긁어 내린 뒤 1분 더 갈면서 재료의 얼음물 60ml를 가늘게 붓되 처음에는 약 45ml만 넣습니다. 매끈하고 윤기 나며 숟가락에서 굵은 리본처럼 떨어지면 멈춥니다. 거칠면 30초 더 갈고, 너무 되직하면 남은 물을 15ml씩 넣습니다. 이는 식감 기준이지 식품 안전 검사 기준은 아닙니다.",
    "ใส่ถั่วที่เหลือ 240 กรัม น้ำมันมะกอก 60 มล. และเกลือ 5 กรัม ปั่น 2 นาที ปาดโถหนึ่งครั้ง แล้วปั่นอีก 1 นาทีพร้อมค่อย ๆ รินน้ำเย็นตามสูตร 60 มล. เริ่มที่ประมาณ 45 มล. หยุดเมื่อเนื้อเนียน เงา และไหลจากช้อนเป็นสายหนืด หากยังหยาบให้ปั่นเพิ่ม 30 วินาที หากข้นแข็งให้เติมน้ำที่เหลือครั้งละ 15 มล. นี่คือสัญญาณเนื้อสัมผัส ไม่ใช่การตรวจความปลอดภัย"
  ));
  body(recipe, 3, ml(
    "Taste with a clean spoon, then add lemon or salt in small measured pinches and pulse briefly. If the hummus tastes too sharp, let it stand 10 minutes before adjusting; the lemon softens as it rests. Do not thin a finished batch with extra oil—use the reserved ice water a spoonful at a time if it needs loosening.",
    "用乾淨湯匙試味，再少量分次加檸檬或鹽，短暫點打混合。若覺得酸味太尖，先靜置 10 分鐘再調整；檸檬味會隨靜置變柔和。完成後不要再用油調稀；若太稠，以預留冰水每次一匙調開。",
    "清潔なスプーンで味見し、レモンや塩を少量ずつ加えて短く回します。酸味が強すぎる場合は10分置いてから調整します。休ませるとレモンがなじみます。仕上がった後に油を足して薄めず、固ければ取り置いた冷水をスプーン1杯ずつ加えます。",
    "깨끗한 숟가락으로 맛을 보고 레몬이나 소금을 조금씩 더해 짧게 섞습니다. 너무 시게 느껴지면 10분 두었다가 다시 조절합니다. 쉬는 동안 레몬 맛이 부드러워집니다. 완성된 반죽을 기름으로 묽게 하지 말고, 되직하면 남겨 둔 얼음물을 한 숟가락씩 넣습니다.",
    "ชิมด้วยช้อนสะอาด แล้วเติมเลมอนหรือเกลือทีละน้อยและปั่นสั้น ๆ หากเปรี้ยวจัดให้พัก 10 นาทีก่อนปรับ เพราะรสเลมอนจะนุ่มลงเมื่อพัก อย่าเติมน้ำมันเพื่อทำให้ส่วนผสมเหลว หากข้นให้เติมน้ำเย็นที่กันไว้ทีละช้อน"
  ));
  body(recipe, 4, ml(
    "Spread the hummus in a shallow bowl and make a shallow well with the back of a spoon. Use the listed 2 g sumac and parsley and a small drizzle from the measured olive oil to finish. Serve with warm pita or freshly washed, dried vegetables; the smooth, spoonable texture is the quality endpoint for this no-cook dip.",
    "將鷹嘴豆泥抹入淺碗，用湯匙背面壓出淺槽。以材料所列的 2 公克 sumac、巴西里和少許已量好的橄欖油點綴。搭配溫熱皮塔餅或洗淨擦乾的蔬菜；這道免烹煮沾醬以細滑、可舀取的口感作為品質終點。",
    "浅い器に広げ、スプーンの背で浅いくぼみを作ります。材料欄のスマックとパセリ2g、計量済みのオリーブ油を少量かけます。温かいピタ、または洗って水気を拭いた野菜と供します。火を使わないディップの品質の目安は、滑らかでスプーンですくえることです。",
    "얕은 그릇에 펴 담고 숟가락 뒷면으로 얕은 홈을 냅니다. 재료에 적힌 수맥과 파슬리 2g, 계량한 올리브오일 약간을 마무리로 올립니다. 따뜻한 피타나 씻어 물기를 닦은 채소와 냅니다. 조리하지 않는 딥의 품질 기준은 부드럽고 숟가락으로 뜰 수 있는 질감입니다.",
    "ปาดฮัมมุสลงชามตื้น ใช้หลังช้อนทำแอ่งตื้น โรยซูแมคกับพาร์สลีย์ 2 กรัมตามรายการ และราดน้ำมันมะกอกที่ตวงไว้เล็กน้อย เสิร์ฟกับพิต้าอุ่นหรือผักที่ล้างและซับแห้งแล้ว ดิปที่ไม่ผ่านความร้อนนี้มีคุณภาพดีเมื่อเนียนและตักได้"
  ));
  note(recipe.tips, 0, ml(
    "Scrape the processor walls between additions so chickpeas blend evenly; short pulses and brief pauses also keep a small motor from overheating.",
    "每次加料間刮下調理機鍋壁，讓鷹嘴豆均勻打碎；短暫點打並稍停，也能避免小型馬達過熱。",
    "材料を加える間に器の側面をこそげると豆が均一に混ざります。短く回して少し休むと、小型モーターの過熱も防げます。",
    "재료를 넣는 사이 볼 벽을 긁어 내리면 콩이 고르게 갈립니다. 짧게 돌리고 잠시 쉬면 소형 모터가 과열되는 것도 막을 수 있습니다.",
    "ปาดผนังโถระหว่างเติมส่วนผสมเพื่อให้ถั่วบดสม่ำเสมอ ปั่นสั้น ๆ และพักเป็นช่วงช่วยไม่ให้มอเตอร์ขนาดเล็กร้อนเกินไป"
  ));
  note(recipe.tips, 1, ml(
    "For a very smooth dip, blend the tahini-lemon base until pale before adding chickpeas; reserve the full 60 ml ice water and use only what the texture needs.",
    "想要更細滑，先把芝麻檸檬底打至變淡再加豆；完整保留 60 毫升冰水，依口感需要逐量使用。",
    "より滑らかにするには、ひよこ豆を加える前にタヒニとレモンを淡い色になるまで回します。冷水60mlは全部加えず、濃度に必要な分だけ使います。",
    "더 부드럽게 만들려면 병아리콩을 넣기 전에 타히니와 레몬을 색이 옅어질 때까지 먼저 갑니다. 얼음물 60ml를 전부 넣지 말고 필요한 만큼만 씁니다.",
    "หากต้องการให้เนียนมาก ให้ปั่นฐานทาฮินีกับเลมอนจนสีอ่อนก่อนใส่ถั่ว เตรียมน้ำเย็น 60 มล.ไว้แต่ใช้เท่าที่เนื้อสัมผัสต้องการ"
  ));
  note(recipe.commonMistakes, 0, ml(
    "Adding all the water at once can make hummus runny. Begin with about 45 ml, then add the rest in 15 ml steps; if it loosens too far, chill 20 minutes before deciding whether to adjust again.",
    "一次加完全部冰水會讓鷹嘴豆泥過稀。先加約 45 毫升，再每次加 15 毫升；若一時調得太稀，先冷藏 20 分鐘再決定是否補救。",
    "水を一度に全部加えると緩くなりすぎます。まず約45ml加え、残りは15mlずつ。薄くしすぎたら20分冷やしてから次の調整を考えます。",
    "물을 한꺼번에 모두 넣으면 너무 묽어집니다. 먼저 약 45ml를 넣고 나머지는 15ml씩 더합니다. 너무 묽어졌다면 20분 냉장한 뒤 추가 조정을 결정합니다.",
    "การเติมน้ำทั้งหมดพร้อมกันทำให้เหลวเกินไป เริ่มประมาณ 45 มล.แล้วเติมส่วนที่เหลือครั้งละ 15 มล. หากเหลวเกินให้แช่เย็น 20 นาทีก่อนตัดสินใจปรับอีกครั้ง"
  ));
  note(recipe.commonMistakes, 1, ml(
    "A stiff or grainy hummus usually needs another scrape and a short blend, not more oil. Pause if the motor strains, then loosen with the reserved cold water in small additions.",
    "鷹嘴豆泥太硬或有顆粒，通常要再刮鍋並短暫攪打，不是再加油。馬達吃力時先停機，再以預留冷水少量調開。",
    "固い、またはざらつく場合は、油を足すのではなく、器をこそげて短く回します。モーターに負荷がかかったら止め、取り置いた冷水を少量ずつ加えます。",
    "너무 되직하거나 거칠면 기름을 더하기보다 볼을 긁고 짧게 더 갈아 줍니다. 모터에 무리가 가면 멈춘 뒤 남겨 둔 찬물을 조금씩 넣어 풉니다.",
    "ฮัมมุสที่แข็งหรือเป็นเม็ดมักต้องปาดโถแล้วปั่นเพิ่มสั้น ๆ ไม่ใช่เติมน้ำมัน หากมอเตอร์ฝืดให้หยุดก่อน แล้วเติมน้ำเย็นที่เก็บไว้ทีละน้อย"
  ));
  recipe.storage = ml(
    "Serve freshly blended for the lightest texture. Cover leftovers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 3 days. This is cold-holding guidance for the ready-to-eat dip, not a doneness temperature.",
    "現打現吃口感最輕盈。剩餘部分加蓋，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持在 4°C／40°F 或以下，3 天內食用。這是即食沾醬的冷藏指引，不是熟度溫度。",
    "軽い食感は作りたてが最良です。残りは覆い、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3日以内に食べます。これはそのまま食べるディップの冷蔵指針で、加熱の目安温度ではありません。",
    "가볍고 부드러운 식감은 갓 갈았을 때 가장 좋습니다. 남은 것은 덮어 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 이는 바로 먹는 딥의 냉장 보관 지침이지 익힘 온도가 아닙니다.",
    "เนื้อเบาที่สุดคือทำใหม่ ปิดฝาของเหลือและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วัน นี่คือคำแนะนำการเก็บดิปพร้อมกิน ไม่ใช่อุณหภูมิความสุก"
  );
  addHandlingSource(recipe);
}

export function refineEightiethMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseJiufenTaroBalls(byId.get("jiufen-taro-balls"));
  reviseMapleTaffy(byId.get("maple-taffy"));
  reviseInjera(byId.get("injera"));
  reviseHummus(byId.get("hummus"));
  return recipes;
}
