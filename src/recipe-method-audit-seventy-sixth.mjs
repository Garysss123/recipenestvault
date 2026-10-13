const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const flourSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know";
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

function reviseMadeleines(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 1, ml(
    "Whisk the eggs and sugar for 4–5 minutes until thick, pale, and able to leave a ribbon on the surface for 2 seconds. Mix in the salt; a loose foam will not hold the shell's rounded centre as well.",
    "將雞蛋和糖攪打 4–5 分鐘，直到顏色變淡、質地濃稠，提起打蛋器後麵糊落下的紋路可停留約 2 秒。拌入鹽；若泡沫太稀，烤好的貝殼中心較不易鼓起。",
    "卵と砂糖を4〜5分、色が淡くなってとろみがつき、持ち上げた生地の跡が表面に約2秒残るまで泡立てます。塩を混ぜます。泡がゆるいと、焼いたときに中心がふくらみにくくなります。",
    "달걀과 설탕을 4–5분간 휘저어 색이 옅고 걸쭉해지며 들어 올린 반죽 자국이 표면에 약 2초 남을 때까지 거품 냅니다. 소금을 섞습니다. 거품이 묽으면 조개 모양 케이크의 가운데가 잘 솟지 않습니다.",
    "ตีไข่กับน้ำตาล 4–5 นาทีจนข้น สีอ่อนลง และรอยแป้งที่ยกขึ้นมาค้างบนผิวได้ประมาณ 2 วินาที จากนั้นผสมเกลือ หากฟองยังเหลว ตรงกลางของขนมทรงเปลือกหอยจะนูนได้ยากขึ้น"
  ));
  body(recipe, 2, ml(
    "Fold the sifted flour and baking powder in three additions just until no dry streaks remain. Stir in the milk, honey, vanilla, and lemon zest, then fold in the warm melted butter until glossy. Do not taste this raw flour-and-egg batter. Wash hands, bowls, whisk, spatula, and work surface with hot, soapy water after contact with it.",
    "分三次拌入過篩麵粉和泡打粉，剛好看不見乾粉即可。拌入牛奶、蜂蜜、香草和檸檬皮，再拌入溫熱融化奶油至麵糊有光澤。不要試吃含生麵粉和生蛋的麵糊；接觸後以熱肥皂水清洗雙手、盆、打蛋器、刮刀與工作檯。",
    "ふるった小麦粉とベーキングパウダーを3回に分けて加え、粉気が消えたら止めます。牛乳、はちみつ、バニラ、レモンの皮を混ぜ、温かい溶かしバターをつやが出るまで折り込みます。小麦粉と卵を含む生地を味見しません。触れた後は手、ボウル、泡立て器、へら、作業台を熱い石けん水で洗います。",
    "체 친 밀가루와 베이킹파우더를 세 번에 나누어 넣고 마른 가루가 사라질 때까지만 접듯이 섞습니다. 우유, 꿀, 바닐라, 레몬 제스트를 섞은 뒤 따뜻하게 녹인 버터를 윤기가 날 때까지 접어 넣습니다. 날밀가루와 달걀이 든 반죽을 맛보지 마세요. 반죽에 닿은 손, 볼, 거품기, 주걱과 작업대를 뜨거운 비눗물로 씻습니다.",
    "พับแป้งที่ร่อนกับผงฟูลงไป 3 รอบ แค่จนไม่เห็นผงแห้ง คนผสมนม น้ำผึ้ง วานิลลา และผิวเลมอน แล้วพับเนยละลายอุ่น ๆ จนแป้งเงา อย่าชิมแป้งดิบที่มีแป้งสาลีและไข่ ล้างมือ ชาม ตะกร้อมือ พาย และพื้นเตรียมอาหารด้วยน้ำร้อนผสมน้ำยาล้างจานหลังสัมผัสแป้ง"
  ));
  body(recipe, 4, ml(
    "Heat the oven to 200°C for 30 minutes with a heavy baking sheet on the middle rack. Lightly brush the shell wells with the listed 5 ml oil and divide the cold batter evenly, filling each well no more than three-quarters full. Keep the filled pan cold until the oven is ready, then set it on the hot sheet at once.",
    "烤箱中層放入厚烤盤，以 200°C 預熱 30 分鐘。用材料列出的 5 毫升油薄薄刷過貝殼模，再將冷麵糊平均分入各格，每格不超過四分之三滿。烤箱準備好前讓裝好麵糊的模具保持冰涼，接著立刻放到熱烤盤上。",
    "オーブンの中段に厚手の天板を置き、200°Cで30分予熱します。材料にある油5mlを型に薄く塗り、冷たい生地を各くぼみの4分の3まで均等に入れます。予熱が終わるまで型を冷たいまま保ち、すぐに熱い天板へ載せます。",
    "오븐 중간 선반에 두꺼운 베이킹 시트를 놓고 200°C에서 30분 예열합니다. 재료에 적힌 오일 5ml를 조개 틀에 얇게 바르고 차가운 반죽을 각 홈의 4분의 3을 넘지 않게 고르게 나눕니다. 오븐이 준비될 때까지 채운 팬을 차갑게 두었다가 뜨거운 시트 위에 바로 올립니다.",
    "วางถาดอบหนาบนชั้นกลางแล้วอุ่นเตาที่ 200°C นาน 30 นาที ทาน้ำมัน 5 มล. ตามรายการส่วนผสมบาง ๆ ในพิมพ์เปลือกหอย แบ่งแป้งเย็นให้เท่ากันโดยเติมแต่ละช่องไม่เกินสามในสี่ รักษาพิมพ์ที่เติมแล้วให้เย็นจนเตาพร้อม จากนั้นวางบนถาดร้อนทันที"
  ));
  body(recipe, 5, ml(
    "Bake for about 10 minutes until the edges are golden and the centres spring back. Check the largest cake with a clean, thin instant-read thermometer inserted from the side into its centre; an egg-containing cake should reach 71°C (160°F), and a skewer should show no wet batter. If it is below 71°C or still wet inside, bake 2 minutes more and recheck. If the edges darken before the centre reaches 71°C, tent the pan loosely with foil, lower the oven to 180°C, and continue in 2-minute increments.",
    "烤約 10 分鐘，直到邊緣金黃、中心按下能回彈。用乾淨細探針從最大顆側面插入中心測量；含蛋糕點應達 71°C（160°F），竹籤也不應沾有濕麵糊。若低於 71°C 或內部仍濕，每次續烤 2 分鐘並重測。若中心尚未達 71°C 前邊緣已變深色，鬆鬆蓋上鋁箔、將烤箱降至 180°C，再每次續烤 2 分鐘。",
    "約10分焼き、縁がきつね色で中心を押すと戻る状態にします。最も大きいケーキの側面から清潔で細い即読式温度計を中心まで差して確認します。卵入りのケーキは71°C（160°F）に達し、竹串に湿った生地が付かないことが目安です。71°C未満、または中が湿っていれば2分追加して再確認します。中心が71°Cになる前に縁が濃く色づく場合は、型にホイルをふんわりかけ、オーブンを180°Cに下げて2分ずつ焼きます。",
    "약 10분 구워 가장자리가 노릇하고 가운데를 눌렀을 때 되돌아오게 합니다. 가장 큰 케이크 옆면에서 깨끗하고 가는 즉시 판독 온도계를 가운데까지 넣어 확인합니다. 달걀이 든 케이크는 71°C (160°F)에 도달해야 하며 꼬치에 젖은 반죽이 묻지 않아야 합니다. 71°C보다 낮거나 속이 젖어 있으면 2분 더 굽고 다시 확인합니다. 중심이 71°C에 도달하기 전에 가장자리가 짙어지면 팬을 포일로 느슨하게 덮고 오븐을 180°C로 낮춰 2분씩 더 굽습니다.",
    "อบประมาณ 10 นาทีจนขอบเป็นสีทองและตรงกลางเด้งกลับเมื่อกด ตรวจชิ้นที่ใหญ่ที่สุดด้วยเทอร์โมมิเตอร์อ่านเร็วปลายเล็กที่สะอาด แทงจากด้านข้างเข้าไปกลางขนม เค้กที่มีไข่ควรถึง 71°C (160°F) และไม้ทดสอบไม่ควรมีแป้งเปียกติด หากต่ำกว่า 71°C หรือด้านในยังเปียก ให้อบเพิ่ม 2 นาทีแล้วตรวจซ้ำ หากขอบเข้มก่อนตรงกลางถึง 71°C ให้คลุมพิมพ์ด้วยฟอยล์หลวม ๆ ลดเตาเป็น 180°C แล้วอบต่อครั้งละ 2 นาที"
  ));
  recipe.storage = ml(
    "Cool in a single layer. Within 2 hours of baking, or within 1 hour above 32°C (90°F), refrigerate in a covered shallow container at 4°C (40°F) or colder and use within 3–4 days. Freeze airtight for longer storage; thaw in the refrigerator.",
    "單層放涼。烤好後 2 小時內（環境高於 32°C／90°F 時 1 小時內）放入有蓋淺容器，冷藏於 4°C（40°F）或以下，3–4 天內食用。久放可密封冷凍，並在冷藏室解凍。",
    "1段に並べて冷まします。焼いてから2時間以内（32°C／90°Fを超える環境では1時間以内）に蓋付きの浅い容器へ入れ、4°C（40°F）以下で冷蔵し、3〜4日以内に食べます。長期保存は密閉して冷凍し、冷蔵庫で解凍します。",
    "한 겹으로 식힙니다. 굽고 2시간 안에(32°C/90°F보다 높은 환경에서는 1시간 안에) 뚜껑 있는 얕은 용기에 담아 4°C (40°F) 이하로 냉장하고 3–4일 안에 먹습니다. 더 오래 보관하려면 밀폐해 냉동하고 냉장고에서 해동합니다.",
    "พักขนมเรียงชั้นเดียว ภายใน 2 ชั่วโมงหลังอบ หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) ให้แช่ในภาชนะตื้นมีฝาที่ 4°C (40°F) หรือต่ำกว่า และกินภายใน 3–4 วัน หากเก็บนานให้แช่แข็งในภาชนะปิดสนิทและละลายในตู้เย็น"
  );
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FDA — Handling Flour Safely: What You Need to Know", flourSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseFocaccia(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Mix the flour, yeast, 350 ml lukewarm water, and honey until shaggy. Rest 15 minutes, add the salt and 20 ml oil, then knead or fold for about 8 minutes until smooth and stretchy. Do not taste raw dough: flour is uncooked and must be fully baked. Wash hands, bowl, tools, and the work surface with hot, soapy water after handling it.",
    "將麵粉、酵母、350 毫升溫水與蜂蜜拌至粗糙成團。靜置 15 分鐘，加入鹽和 20 毫升油，再揉或折約 8 分鐘至光滑有延展性。不要試吃生麵糰：麵粉尚未烹熟，必須烤透。處理後以熱肥皂水清洗雙手、盆、器具和工作檯。",
    "粉、イースト、ぬるま湯350ml、はちみつを混ぜ、ぼそぼその生地にします。15分休ませ、塩と油20mlを加えて、なめらかで伸びるまで約8分こねるか折ります。生地を味見しません。小麦粉は未加熱なので、十分に焼く必要があります。扱った後は手、ボウル、器具、作業台を熱い石けん水で洗います。",
    "밀가루, 이스트, 미지근한 물 350ml, 꿀을 거친 반죽이 될 때까지 섞습니다. 15분 쉬게 한 뒤 소금과 오일 20ml를 넣고 매끈하고 늘어날 때까지 약 8분 치대거나 접습니다. 생반죽을 맛보지 마세요. 밀가루는 익지 않은 상태이므로 완전히 구워야 합니다. 반죽을 다룬 뒤 손, 볼, 도구와 작업대를 뜨거운 비눗물로 씻습니다.",
    "ผสมแป้ง ยีสต์ น้ำอุ่น 350 มล. และน้ำผึ้งจนเป็นก้อนหยาบ พัก 15 นาที ใส่เกลือกับน้ำมัน 20 มล. แล้วนวดหรือพับประมาณ 8 นาทีจนเนียนและยืดหยุ่น อย่าชิมโดดิบ เพราะแป้งยังไม่สุกและต้องอบให้ทั่ว ล้างมือ ชาม อุปกรณ์ และพื้นเตรียมอาหารด้วยน้ำร้อนผสมน้ำยาล้างจานหลังจับโด"
  ));
  body(recipe, 1, ml(
    "Cover and rise at 22–25°C for 60–75 minutes until the dough is about double in volume and visibly aerated. If it has not doubled at 75 minutes, keep it covered in a draft-free place and check every 15 minutes; do not stretch it into the tray while it is still dense. Fold once halfway through only if the dough spreads very loosely.",
    "蓋好後在 22–25°C 發酵 60–75 分鐘，直到體積約增至兩倍且可見氣孔。若 75 分鐘仍未增至兩倍，放在無風處繼續覆蓋，每 15 分鐘檢查一次；麵糰仍緊實時不要拉入烤盤。只有麵糰攤得很鬆散時，才在中途折疊一次。",
    "蓋をして22〜25°Cで60〜75分発酵させ、約2倍に膨らみ気泡が見える状態にします。75分で2倍にならなければ、風の当たらない場所で蓋をしたまま15分ごとに確認します。まだ詰まった生地を天板に広げません。生地が非常にゆるく広がる場合だけ途中で1回折ります。",
    "덮어서 22–25°C에서 60–75분 발효해 부피가 약 두 배가 되고 기포가 보이게 합니다. 75분이 지나도 두 배가 되지 않았으면 바람이 없는 곳에서 덮은 채 15분마다 확인합니다. 아직 묵직한 반죽을 팬에 펴지 마세요. 반죽이 아주 느슨하게 퍼질 때만 중간에 한 번 접습니다.",
    "คลุมแล้วพักแป้งที่ 22–25°C นาน 60–75 นาทีจนมีปริมาตรประมาณสองเท่าและเห็นฟองอากาศ หากครบ 75 นาทีแล้วยังไม่ถึงสองเท่า ให้คลุมไว้ในที่ไม่มีลมและตรวจทุก 15 นาที อย่ายืดแป้งลงถาดขณะที่ยังแน่น หากแป้งแผ่หลวมมากเท่านั้น ให้พับหนึ่งครั้งเมื่อผ่านไปครึ่งเวลา"
  ));
  body(recipe, 2, ml(
    "Pour 25 ml oil into the 30 × 40 cm rimmed tray. Transfer the dough gently and stretch toward the corners without tearing. If it springs back, cover and rest 10 minutes before trying again; patch a small tear by folding the dough over it rather than pulling harder. Rest 30 minutes, then make the final gentle stretch to fill the tray.",
    "將 25 毫升油倒入 30 × 40 公分有邊烤盤。輕柔移入麵糰，向四角拉開但不要扯破。若麵糰回縮，蓋好靜置 10 分鐘再拉；若有小裂口，折起麵糰蓋住即可，不要更用力拉扯。靜置 30 分鐘後再輕柔拉伸至鋪滿烤盤。",
    "縁付き30×40cmの天板に油25mlを注ぎます。生地をやさしく移し、破らないよう四隅へ伸ばします。縮む場合は覆って10分休ませてから再び伸ばします。小さな裂け目は、強く引かずに生地を折って覆います。30分休ませ、最後にやさしく天板いっぱいまで伸ばします。",
    "เทน้ำมัน 25ml ลงในถาดขอบสูงขนาด 30 × 40 ซม. ย้ายแป้งอย่างเบามือและยืดเข้าหามุมโดยไม่ให้ขาด หากแป้งหด ให้คลุมพัก 10 นาทีก่อนลองอีกครั้ง ถ้าแป้งฉีกเล็กน้อยให้พับแป้งปิดแทนการดึงแรง ๆ พัก 30 นาทีแล้วค่อยยืดเบา ๆ ให้เต็มถาด",
    "테두리 있는 30 × 40cm 팬에 오일 25ml를 붓습니다. 반죽을 조심히 옮겨 찢어지지 않게 모서리 쪽으로 늘립니다. 반죽이 되돌아오면 덮어 10분 쉬게 한 뒤 다시 펴세요. 작은 찢김은 세게 당기지 말고 반죽을 접어 덮습니다. 30분 쉬게 한 다음 마지막으로 부드럽게 펴서 팬을 채웁니다."
  ));
  body(recipe, 4, ml(
    "Bake at 230°C for 20–25 minutes until the top is deep golden and the underside is golden when you lift a corner with a spatula. The centre should feel set and spring back, with no damp, gummy band when cut. If the top browns before the underside and centre are ready, tent loosely with foil, lower the oven to 210°C, and continue in 3-minute increments. If the top is ready but the bottom is pale, slide the focaccia onto a hot sheet on the lower rack for 3–5 minutes, then check again. No meat-style internal temperature applies to this flour-and-water bread.",
    "以 230°C 烤 20–25 分鐘，直到表面呈深金黃色；用鍋鏟掀起一角時，底部也應呈金黃色。中心應已定型並能回彈，切開後沒有濕黏的生麵糰帶。若表面先上色但底部和中心未好，鬆鬆蓋上鋁箔、降至 210°C，每次續烤 3 分鐘。若表面已好而底部仍白，將佛卡夏移到下層的熱烤盤烤 3–5 分鐘，再檢查。這款麵粉與水製成的麵包不適用肉類中心溫度。",
    "230°Cで20〜25分焼き、表面が濃いきつね色になり、へらで角を持ち上げた底面も色づくまで焼きます。中心は固まり、押すと戻り、切っても湿ったねばつく生地の筋がない状態にします。上面だけ先に色づき、底面と中心がまだなら、ホイルをふんわりかけて210°Cに下げ、3分ずつ焼きます。上面は焼けて底が白い場合は、フォカッチャを下段の熱い天板に移して3〜5分焼き、再確認します。この小麦粉と水のパンに肉用の中心温度は適用しません。",
    "230°C에서 20–25분 구워 윗면이 짙은 황금색이 되고 주걱으로 모서리를 들어 올렸을 때 바닥도 황금색인지 확인합니다. 가운데는 형태가 잡혀 눌렀을 때 되돌아오고, 잘랐을 때 축축하고 질척한 반죽 줄이 없어야 합니다. 윗면이 바닥과 속보다 먼저 갈색이 되면 포일을 느슨하게 덮고 210°C로 낮춰 3분씩 더 굽습니다. 윗면은 다 익었는데 바닥이 창백하면 포카치아를 아래 선반의 뜨거운 팬으로 옮겨 3–5분 굽고 다시 확인합니다. 밀가루와 물로 만든 이 빵에는 고기용 중심 온도를 적용하지 않습니다.",
    "อบที่ 230°C นาน 20–25 นาทีจนด้านบนเป็นสีทองเข้ม และด้านล่างเป็นสีทองเมื่อใช้พายยกมุมขึ้น เนื้อกลางควรเซ็ตและเด้งกลับ เมื่อตัดแล้วต้องไม่มีแถบแป้งเปียกเหนียว หากด้านบนเข้มก่อนด้านล่างและตรงกลาง ให้คลุมฟอยล์หลวม ๆ ลดเตาเป็น 210°C แล้วอบเพิ่มครั้งละ 3 นาที หากด้านบนสุกแล้วแต่ก้นยังซีด ให้เลื่อนฟอคคาเชียลงบนถาดร้อนชั้นล่าง 3–5 นาทีแล้วตรวจอีกครั้ง ขนมปังที่ทำจากแป้งกับน้ำนี้ไม่ใช้ค่าอุณหภูมิแกนกลางแบบเนื้อสัตว์"
  ));
  addOfficialSource(recipe, "FDA — Handling Flour Safely: What You Need to Know", flourSafety);
}

function reviseGazpacho(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Rinse the tomatoes, cucumber, and pepper under cool running water before cutting; scrub the cucumber with a clean produce brush and dry with a clean towel. Do not use soap or bleach. Put the bread, prepared vegetables, garlic, 6 g salt, and 150 ml ice-cold water in a clean bowl. Toss and leave 15 minutes to hydrate the bread. Keep ready-to-eat ingredients and utensils away from raw meat and its juices.",
    "切菜前以流動冷水沖洗番茄、小黃瓜和青椒；用乾淨蔬果刷刷洗小黃瓜，再以乾淨毛巾擦乾。不要使用肥皂或漂白水。將麵包、處理好的蔬菜、大蒜、6 公克鹽和 150 毫升冰水放入乾淨大碗，拌勻靜置 15 分鐘讓麵包吸水。即食食材與器具要遠離生肉及其汁液。",
    "切る前にトマト、きゅうり、ピーマンを流水で洗います。きゅうりは清潔な野菜用ブラシでこすり、清潔な布で水気を取ります。石けんや漂白剤は使いません。パン、下ごしらえした野菜、にんにく、塩6g、氷水150mlを清潔なボウルに入れ、混ぜて15分置きます。すぐ食べる食材や器具は生肉とその汁から離します。",
    "자르기 전에 토마토, 오이, 피망을 흐르는 찬물에 씻습니다. 오이는 깨끗한 채소용 솔로 문질러 씻고 깨끗한 천으로 말립니다. 비누나 표백제는 사용하지 마세요. 빵, 손질한 채소, 마늘, 소금 6g, 얼음물 150ml를 깨끗한 큰 그릇에 담아 섞고 빵이 불도록 15분 둡니다. 바로 먹을 재료와 도구는 생고기와 육즙에서 분리합니다.",
    "ล้างมะเขือเทศ แตงกวา และพริกหวานใต้ก๊อกน้ำเย็นก่อนหั่น ใช้แปรงผักที่สะอาดขัดแตงกวา แล้วซับด้วยผ้าสะอาด ห้ามใช้สบู่หรือน้ำยาฟอกขาว ใส่ขนมปัง ผักที่เตรียมแล้ว กระเทียม เกลือ 6 กรัม และน้ำเย็นจัด 150 มล. ลงในชามสะอาด คลุกและพัก 15 นาทีให้ขนมปังดูดน้ำ แยกวัตถุดิบพร้อมกินและอุปกรณ์ให้ห่างจากเนื้อดิบและน้ำจากเนื้อ"
  ));
  body(recipe, 1, ml(
    "Blend on high for 90 seconds to 2 minutes, stopping once to scrape the jug. The soup should be smooth with no visible vegetable pieces. If skins or seeds remain coarse, pass it through a fine sieve. If it is too thick to pour, add the listed extra cold water 15 ml at a time, stopping at 100 ml total.",
    "以高速攪打 90 秒至 2 分鐘，中途停一次刮下杯壁。湯應細滑，看不見蔬菜塊。若皮或籽仍粗，過細篩。若濃稠到無法倒出，每次加入材料列出的額外冷水 15 毫升，最多共 100 毫升。",
    "高速で90秒〜2分、途中で一度止めて容器の側面をこそげます。野菜のかけらが見えない滑らかなスープにします。皮や種が粗く残る場合は目の細かいざるでこします。濃くて注げない場合は、追加用の冷水を15mlずつ加え、合計100mlまでにします。",
    "고속으로 90초에서 2분간 갈고 중간에 한 번 멈춰 믹서 용기 벽을 긁어 내립니다. 눈에 보이는 채소 조각이 없이 매끈해야 합니다. 껍질이나 씨가 거칠게 남으면 고운 체에 거릅니다. 너무 걸쭉해 따르기 어렵다면 추가로 준비한 찬물을 15ml씩 넣되 총 100ml를 넘기지 않습니다.",
    "ปั่นความเร็วสูง 90 วินาทีถึง 2 นาที หยุดหนึ่งครั้งเพื่อปาดด้านข้างโถ ซุปควรเนียนและไม่มีชิ้นผักให้เห็น หากเปลือกหรือเมล็ดยังหยาบให้กรองผ่านตะแกรงละเอียด ถ้าข้นจนเทไม่ได้ ให้เติมน้ำเย็นส่วนที่ระบุไว้ครั้งละ 15 มล. รวมไม่เกิน 100 มล."
  ));
  body(recipe, 2, ml(
    "With the blender running at medium speed, stream in the 60 ml olive oil over about 45 seconds, then blend in the vinegar. Add the remaining 2 g salt only after tasting the chilled soup. If the oil separates into beads, add 15 ml of the reserved cold water and blend for 15 seconds; repeat once if needed. Do not pour in all the oil at once.",
    "以中速攪打，約 45 秒內緩緩倒入 60 毫升橄欖油，再拌入醋。冷藏後試味，再視需要加入剩餘 2 公克鹽。若油珠分離，加入預留冷水 15 毫升攪打 15 秒；必要時再重複一次。不要一次倒入全部橄欖油。",
    "中速で回しながら、オリーブ油60mlを約45秒かけて細く注ぎ、酢を混ぜます。冷やしてから味見し、必要な場合だけ残りの塩2gを加えます。油が粒状に分離したら、取っておいた冷水15mlを加えて15秒混ぜ、必要ならもう一度繰り返します。油を一度に全部入れません。",
    "ปั่นระดับกลางแล้วค่อย ๆ เทน้ำมันมะกอก 60 มล. ใช้เวลาประมาณ 45 วินาที จากนั้นปั่นน้ำส้มสายชูให้เข้ากัน ชิมหลังแช่เย็นแล้วจึงเติมเกลือที่เหลือ 2 กรัมเท่าที่จำเป็น หากน้ำมันแยกเป็นเม็ด ให้เติมน้ำเย็นที่แบ่งไว้ 15 มล. แล้วปั่น 15 วินาที ทำซ้ำได้อีกครั้งหากจำเป็น อย่าเทน้ำมันทั้งหมดลงไปครั้งเดียว",
    "믹서를 중간 속도로 돌리며 올리브 오일 60ml를 약 45초 동안 가늘게 붓고 식초를 섞습니다. 차게 한 뒤 맛을 보고 남은 소금 2g은 필요한 만큼만 넣습니다. 기름 방울이 분리되면 따로 둔 찬물 15ml를 넣고 15초간 갈며, 필요하면 한 번 더 반복합니다. 기름을 한꺼번에 붓지 마세요."
  ));
  body(recipe, 3, ml(
    "Cover and refrigerate for at least 2 hours until the soup is at 4°C (40°F) or colder. Keep the batch chilled until serving and use clean, chilled bowls. Stir or blend briefly if it separates after chilling. Serve promptly; do not leave this uncooked vegetable soup out for more than 2 hours total, or more than 1 hour when the room is above 32°C (90°F).",
    "加蓋冷藏至少 2 小時，直到湯降至 4°C（40°F）或以下。上桌前讓整批湯保持冷藏，使用乾淨冰涼的碗。冷藏後若分離，拌勻或短暫攪打。儘快上桌；這道未經烹煮的蔬菜湯在室溫下累計不可超過 2 小時，環境高於 32°C／90°F 時不可超過 1 小時。",
    "蓋をして2時間以上冷蔵し、スープが4°C（40°F）以下になるまで冷やします。提供するまで全量を冷蔵し、清潔で冷たい器を使います。冷やした後に分離したら混ぜるか短く再攪拌します。すぐに提供し、この生野菜スープを室温に合計2時間を超えて置きません。室温が32°C／90°Fを超える場合は1時間までです。",
    "덮어서 최소 2시간 냉장해 수프가 4°C (40°F) 이하가 되게 합니다. 상에 내기 전까지 전체를 차갑게 보관하고 깨끗하고 차가운 그릇을 사용합니다. 냉장 후 분리되면 저어 주거나 짧게 다시 갈아 줍니다. 바로 내고, 익히지 않은 채소 수프를 실온에 총 2시간 넘게 두지 마세요. 실내가 32°C/90°F보다 더우면 1시간을 넘기지 않습니다.",
    "ปิดฝาแล้วแช่เย็นอย่างน้อย 2 ชั่วโมงจนซุปมีอุณหภูมิ 4°C (40°F) หรือต่ำกว่า เก็บทั้งชุดไว้ในตู้เย็นจนกว่าจะเสิร์ฟ และใช้ชามสะอาดที่แช่เย็น หากแยกชั้นหลังแช่ ให้คนหรือปั่นสั้น ๆ เสิร์ฟทันที อย่าวางซุปผักดิบนี้ไว้นอกตู้เย็นรวมเกิน 2 ชั่วโมง หรือเกิน 1 ชั่วโมงเมื่ออุณหภูมิห้องสูงกว่า 32°C (90°F)"
  ));
  recipe.storage = ml(
    "Keep covered at 4°C (40°F) or colder and use within 2 days. Refrigerate promptly after serving; discard if the soup has been above 4°C for more than 2 hours, or more than 1 hour above 32°C (90°F). Stir or briefly re-blend before serving if the emulsion separates.",
    "加蓋冷藏於 4°C（40°F）或以下，2 天內食用。上桌後儘快放回冷藏；若高於 4°C 超過 2 小時，或環境高於 32°C／90°F 時超過 1 小時，請丟棄。乳化分離時，上桌前拌勻或短暫重新攪打。",
    "蓋をして4°C（40°F）以下で冷蔵し、2日以内に食べます。提供後は速やかに冷蔵庫へ戻します。4°Cを超えた状態が2時間以上、または32°C／90°Fを超える環境で1時間以上続いた場合は廃棄します。乳化が分離したら提供前に混ぜるか短く再攪拌します。",
    "ปิดฝาเก็บที่ 4°C (40°F) หรือต่ำกว่าและกินภายใน 2 วัน หลังเสิร์ฟให้รีบนำกลับเข้าตู้เย็น ทิ้งหากซุปอยู่เหนือ 4°C นานเกิน 2 ชั่วโมง หรือเกิน 1 ชั่วโมงเมื่ออากาศร้อนกว่า 32°C (90°F) คนหรือปั่นสั้น ๆ ก่อนเสิร์ฟหากส่วนผสมแยกชั้น",
    "뚜껑을 덮어 4°C (40°F) 이하로 보관하고 2일 안에 먹습니다. 상에 낸 뒤에는 바로 냉장고에 넣습니다. 4°C를 넘는 상태로 2시간 이상, 실내가 32°C/90°F보다 더울 때 1시간 이상 있었다면 버립니다. 유화가 분리되면 내기 전에 젓거나 짧게 다시 갈아 줍니다."
  );
  addOfficialSource(recipe, "FDA — 7 Tips for Cleaning Fruits and Vegetables", produceSafety);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseTarteTatin(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Rinse and dry the apples under running water before peeling; do not use soap or produce wash. Peel, halve, remove the cores, and keep the halves intact. Toss lightly with the listed salt and optional cinnamon.",
    "削皮前先以流動水沖洗並擦乾蘋果；不要使用肥皂或蔬果清潔劑。削皮、對切、去除果核並保留完整半顆。與材料列出的鹽和可選肉桂輕拌。",
    "皮をむく前にりんごを流水で洗い、乾かします。石けんや野菜用洗剤は使いません。皮をむいて半分に切り、芯を取り除き、形を保ちます。材料の塩と好みでシナモンを軽くまぶします。",
    "껍질을 벗기기 전에 사과를 흐르는 물에 씻어 말립니다. 비누나 채소 세척제는 사용하지 마세요. 껍질을 벗겨 반으로 자르고 씨를 제거하되 반쪽 모양을 유지합니다. 재료에 적힌 소금과 선택한 계피를 가볍게 버무립니다.",
    "ล้างและเช็ดแอปเปิลให้แห้งใต้ก๊อกน้ำก่อนปอก ห้ามใช้สบู่หรือน้ำยาล้างผักผลไม้ ปอก ผ่าครึ่ง เอาแกนออกและคงชิ้นไว้ทั้งครึ่ง คลุกเบา ๆ กับเกลือและอบเชยที่ใส่ได้ตามรายการส่วนผสม"
  ));
  body(recipe, 1, ml(
    "Melt the butter in a heavy ovenproof pan, add the sugar, and cook over medium heat for 6–8 minutes, swirling the pan occasionally, until clear deep amber. If it is still pale at 8 minutes, continue in 30-second intervals. If it smokes or turns dark brown and bitter, remove it from the heat and discard the caramel rather than trying to cover the burnt taste.",
    "在厚重耐烤鍋中融化奶油，加入糖，以中火煮 6–8 分鐘，偶爾轉動鍋子，直到呈清澈深琥珀色。若 8 分鐘後仍偏淡，每次續煮 30 秒。若冒煙或變成深褐色苦味，離火並丟棄焦糖，不要試圖掩蓋焦味。",
    "耐熱の厚手の鍋でバターを溶かし、砂糖を加えて中火で6〜8分加熱します。時々鍋を回し、透明感のある濃い琥珀色にします。8分経っても薄い場合は30秒ずつ続けます。煙が出たり濃い茶色で苦くなったりしたら火から外し、焦げた味を隠そうとせずカラメルを捨てます。",
    "오븐에 넣을 수 있는 두꺼운 팬에서 버터를 녹이고 설탕을 넣어 중불로 6–8분 가열합니다. 가끔 팬을 돌려 투명한 짙은 호박색이 될 때까지 익힙니다. 8분이 지나도 색이 옅으면 30초씩 더 가열합니다. 연기가 나거나 짙은 갈색으로 변해 쓴맛이 나면 불에서 내려 탄맛을 감추려 하지 말고 캐러멜을 버립니다.",
    "ละลายเนยในกระทะหนาที่เข้าเตาอบได้ ใส่น้ำตาลแล้วเคี่ยวไฟกลาง 6–8 นาที หมุนกระทะเป็นครั้งคราวจนเป็นสีอำพันเข้มใส หากครบ 8 นาทีแล้วยังซีด ให้เคี่ยวต่อครั้งละ 30 วินาที หากมีควันหรือเป็นสีน้ำตาลเข้มและขม ให้ยกลงและทิ้งคาราเมล อย่าพยายามกลบรสไหม้"
  ));
  body(recipe, 2, ml(
    "Arrange the apple halves tightly in the warm caramel and cook over medium heat for 10 minutes, spooning caramel over them once or twice. Test the thickest half with a thin knife: it should enter with slight resistance while the apple still holds its shape. If the centre is hard after 10 minutes, lower the heat and cook 2 minutes at a time until it softens; do not let the caramel smoke.",
    "將蘋果半顆緊密排入溫熱焦糖中，以中火煮 10 分鐘，期間舀焦糖淋在蘋果上 1–2 次。取最厚的蘋果用細刀測試：刀能稍微遇阻地插入，但蘋果仍保持形狀。若 10 分鐘後中心仍硬，轉小火每次續煮 2 分鐘至軟化；不要讓焦糖冒煙。",
    "温かいカラメルにりんごを隙間なく並べ、中火で10分加熱し、途中で1〜2回カラメルをかけます。最も厚いりんごに細いナイフを刺して確認します。少し抵抗を感じながら入るものの、形は保つ状態にします。10分後も中心が硬ければ、カラメルから煙が出ないよう火を弱め、2分ずつ柔らかくなるまで加熱します。",
    "따뜻한 캐러멜에 사과 반쪽을 촘촘히 넣고 중불에서 10분 익히며 한두 번 캐러멜을 끼얹습니다. 가장 두꺼운 사과를 얇은 칼로 확인합니다. 약간 저항이 느껴지면서도 모양은 유지되어야 합니다. 10분 뒤에도 속이 단단하면 불을 낮추고 캐러멜에서 연기가 나지 않도록 살피며 2분씩 더 익혀 부드럽게 합니다.",
    "เรียงแอปเปิลให้แน่นในคาราเมลอุ่น เคี่ยวไฟกลาง 10 นาที ตักคาราเมลราดหนึ่งถึงสองครั้ง ใช้มีดปลายบางตรวจชิ้นที่หนาที่สุด ควรแทงเข้าได้โดยมีแรงต้านเล็กน้อยแต่แอปเปิลยังคงรูป หากครบ 10 นาทีแล้วตรงกลางยังแข็ง ให้ลดไฟและเคี่ยวเพิ่มครั้งละ 2 นาทีจนเนื้อนิ่ม อย่าให้คาราเมลมีควัน"
  ));
  body(recipe, 3, ml(
    "Heat the oven to 190°C. Roll the pastry on only the listed flour into a round slightly larger than the pan, lay it over the apples, and tuck the edge inside with a spoon so you do not touch the hot pan. Cut one small steam vent. Do not taste raw pastry; wash hands, utensils, and the work surface after handling the flour and dough.",
    "烤箱預熱至 190°C。只用材料列出的麵粉將酥皮擀成略大於鍋面的圓片，覆在蘋果上，以湯匙將邊緣塞入鍋內，避免碰觸熱鍋。中央剪一個小排氣孔。不要試吃生酥皮；處理麵粉和麵糰後清洗雙手、器具與工作檯。",
    "オーブンを190°Cに温めます。材料にある粉だけを使って、鍋より少し大きい円形に生地を伸ばし、りんごにかぶせます。熱い鍋に触れないよう、スプーンで縁を内側へ押し込みます。中央に小さな蒸気穴を1つ切ります。生の生地を味見せず、粉や生地を扱った後は手、器具、作業台を洗います。",
    "อุ่นเตาที่ 190°C ใช้แป้งตามรายการส่วนผสมเท่านั้นนวดแป้งพายเป็นแผ่นกลมใหญ่กว่ากระทะเล็กน้อย วางคลุมแอปเปิลแล้วใช้ช้อนสอดขอบลงด้านในโดยไม่แตะกระทะร้อน เจาะรูระบายไอน้ำเล็ก ๆ ตรงกลางหนึ่งรู อย่าชิมแป้งพายดิบ ล้างมือ อุปกรณ์ และพื้นเตรียมอาหารหลังจับแป้งและโด",
    "오븐을 190°C로 예열합니다. 재료에 적힌 밀가루만 사용해 팬보다 약간 큰 원으로 페이스트리를 밀어 사과 위에 덮습니다. 뜨거운 팬을 만지지 않도록 숟가락으로 가장자리를 안쪽에 넣습니다. 가운데에 작은 증기 구멍을 하나 냅니다. 생 페이스트리를 맛보지 말고 밀가루와 반죽을 다룬 뒤 손, 도구, 작업대를 씻습니다."
  ));
  body(recipe, 4, ml(
    "Bake for 25–30 minutes until the pastry is deeply golden and dry at the centre, with caramel bubbling slowly around the rim. If the pastry darkens before the apples and caramel are ready, cover loosely with foil, lower the oven to 180°C, and bake in 5-minute increments until the edge bubbles again. Rest in the pan for 8 minutes before inverting.",
    "烤 25–30 分鐘，直到酥皮呈深金黃色、中央乾爽，鍋邊焦糖緩緩冒泡。若酥皮比蘋果與焦糖更早變深色，鬆鬆蓋上鋁箔、將烤箱降至 180°C，每次續烤 5 分鐘，直到邊緣重新冒泡。倒扣前在鍋中靜置 8 分鐘。",
    "25〜30分焼き、生地が濃いきつね色で中央まで乾き、縁のカラメルがゆっくり泡立つ状態にします。りんごとカラメルが仕上がる前に生地が濃く色づく場合は、ホイルをふんわりかけてオーブンを180°Cに下げ、縁が再び泡立つまで5分ずつ焼きます。ひっくり返す前に鍋の中で8分休ませます。",
    "25–30분 구워 페이스트리가 짙은 황금색이 되고 가운데까지 마르며 가장자리의 캐러멜이 천천히 끓게 합니다. 사과와 캐러멜이 익기 전에 페이스트리가 짙어지면 포일을 느슨하게 덮고 오븐을 180°C로 낮춰 가장자리에 다시 거품이 생길 때까지 5분씩 더 굽습니다. 뒤집기 전에 팬 안에서 8분 둡니다.",
    "อบ 25–30 นาทีจนแป้งพายเป็นสีทองเข้มและแห้งถึงตรงกลาง โดยคาราเมลรอบขอบเดือดช้า ๆ หากแป้งเข้มก่อนแอปเปิลและคาราเมลพร้อม ให้คลุมฟอยล์หลวม ๆ ลดเตาเป็น 180°C และอบต่อครั้งละ 5 นาทีจนขอบกลับมามีฟอง พักในกระทะ 8 นาทีก่อนคว่ำ"
  ));
  body(recipe, 5, ml(
    "Set a rimmed serving plate larger than the pan over it, protect both hands with dry oven mitts, and invert in one controlled motion away from your body. Lift the pan carefully. If an apple sticks, set the pan over low heat for 20–30 seconds to soften the caramel, loosen the edge with a thin spatula, and invert again. Let the tart settle for 5 minutes before slicing.",
    "將比鍋面大的有邊盤蓋在鍋上，雙手戴乾燥隔熱手套，朝身體外側穩定地一次倒扣。小心拿起鍋子。若蘋果黏住，將鍋放回小火 20–30 秒使焦糖回軟，再用薄刮刀沿邊緣鬆開後重新倒扣。切片前靜置 5 分鐘。",
    "鍋より大きく縁のある皿をかぶせ、乾いたミトンを両手にはめ、体から離す方向へ一度で慎重にひっくり返します。鍋を静かに持ち上げます。りんごが張り付いた場合は鍋を弱火に20〜30秒かけてカラメルを柔らかくし、薄いへらで縁を外してからもう一度返します。切る前に5分落ち着かせます。",
    "팬보다 큰 테두리 접시를 팬 위에 덮고 마른 오븐 장갑을 양손에 낀 뒤 몸 바깥쪽으로 한 번에 조심스럽게 뒤집습니다. 팬을 천천히 들어 올립니다. 사과가 붙어 있으면 팬을 약불에 20–30초 올려 캐러멜을 부드럽게 한 다음 얇은 주걱으로 가장자리를 풀고 다시 뒤집습니다. 자르기 전 5분 둡니다.",
    "วางจานมีขอบที่ใหญ่กว่ากระทะครอบไว้ ใช้ถุงมือกันร้อนที่แห้งทั้งสองมือ แล้วคว่ำอย่างมั่นคงในครั้งเดียวโดยหันออกจากตัว ยกกระทะขึ้นอย่างระมัดระวัง หากแอปเปิลติดกระทะ ให้วางกระทะบนไฟอ่อน 20–30 วินาทีเพื่อให้คาราเมลนิ่ม แซะขอบด้วยพายบางแล้วคว่ำใหม่ พักทาร์ต 5 นาทีก่อนตัด"
  ));
  recipe.prepMinutes = 30;
  recipe.cookMinutes = 60;
  recipe.totalMinutes = 90;
  recipe.storage = ml(
    "Cool only until safe to handle. Within 2 hours, or within 1 hour above 32°C (90°F), place leftover slices in a covered shallow container and refrigerate at 4°C (40°F) or colder. Use within 3–4 days. Reheat only the portion being served to 74°C (165°F) throughout, or freeze airtight for longer storage.",
    "放至可安全處理後即可分切。2 小時內（環境高於 32°C／90°F 時 1 小時內）將剩餘切片放入有蓋淺容器，冷藏於 4°C（40°F）或以下；3–4 天內食用。只回熱要吃的份量，確認各處達 74°C（165°F）；久放可密封冷凍。",
    "安全に扱える程度まで冷まします。2時間以内（32°C／90°Fを超える環境では1時間以内）に残りを切り分けて蓋付きの浅い容器へ入れ、4°C（40°F）以下で冷蔵します。3〜4日以内に食べます。食べる分だけ中心まで74°C（165°F）に再加熱するか、長期保存は密閉して冷凍します。",
    "식혀서 안전하게 다룰 수 있을 때 자릅니다. 2시간 안에(32°C/90°F보다 높은 환경에서는 1시간 안에) 남은 조각을 뚜껑 있는 얕은 용기에 담아 4°C (40°F) 이하로 냉장합니다. 3–4일 안에 먹습니다. 먹을 양만 전체가 74°C (165°F)에 도달하도록 다시 데우거나 더 오래 보관하려면 밀폐해 냉동합니다.",
    "พักให้พอจับได้อย่างปลอดภัย ภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) แบ่งชิ้นที่เหลือใส่ภาชนะตื้นมีฝาและแช่ที่ 4°C (40°F) หรือต่ำกว่า กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F) หรือแช่แข็งในภาชนะปิดสนิทหากเก็บนาน"
  );
  addOfficialSource(recipe, "FDA — 7 Tips for Cleaning Fruits and Vegetables", produceSafety);
  addOfficialSource(recipe, "FDA — Handling Flour Safely: What You Need to Know", flourSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

export function refineSeventySixthMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseMadeleines(byId.get("madeleines"));
  reviseFocaccia(byId.get("focaccia-genovese"));
  reviseGazpacho(byId.get("gazpacho-andaluz"));
  reviseTarteTatin(byId.get("tarte-tatin"));
  return recipes;
}
