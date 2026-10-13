const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const flourSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know";
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

function reviseDalTadka(recipe) {
  body(recipe, 0, ml(
    "Combine the dal, 750 ml water, tomato, ginger, turmeric, and 3 g salt in the pressure cooker and lock the lid according to its instructions. Bring it to high pressure; start a 10-minute timer only when high pressure is reached, keeping it steady. Turn off the heat and let the pressure fall naturally for 10 minutes. Release any remaining pressure as the cooker maker directs and open only when its pressure indicator is down. Test three lentils from different parts of the cooker: each should mash creamy with no firm or chalky centre. If any remain firm, stir in 30 ml hot water, reseal, return to high pressure for 2 minutes, allow a 5-minute natural release, and test again; repeat if needed.",
    "將扁豆、750 毫升水、番茄、薑、薑黃和 3 公克鹽放入壓力鍋，依說明鎖好鍋蓋。加熱至高壓後才開始計時 10 分鐘，期間維持穩定高壓。關火並自然洩壓 10 分鐘；依壓力鍋說明排出剩餘壓力，確認壓力指示下降後才開蓋。從鍋中不同位置取三顆扁豆測試：每顆都應能壓成綿滑泥狀，沒有硬芯或粉硬感。若仍有硬豆，拌入 30 毫升熱水、重新鎖蓋並升至高壓續煮 2 分鐘，自然洩壓 5 分鐘後再測；必要時重複。",
    "ダル、750mlの水、トマト、しょうが、ターメリック、塩3gを圧力鍋に入れ、取扱説明書どおりに蓋をロックします。高圧になってから10分計り、圧力を安定させます。火を止め、10分自然減圧します。残圧はメーカーの説明に従って抜き、圧力表示が下がってから蓋を開けます。鍋の別々の場所からレンズ豆を3粒取り、クリーミーにつぶれ、硬い芯や粉っぽさがないことを確認します。硬い豆が残っていれば熱湯30mlを混ぜ、蓋をして再び高圧にし、2分加圧した後5分自然減圧して再確認します。必要なら繰り返します。",
    "달, 물 750ml, 토마토, 생강, 강황, 소금 3g을 압력솥에 넣고 설명서에 따라 뚜껑을 잠급니다. 고압에 도달한 뒤부터 10분을 재고 압력을 안정적으로 유지합니다. 불을 끄고 10분 자연 감압합니다. 남은 압력은 제조사 설명에 따라 빼고 압력 표시가 내려간 뒤 뚜껑을 엽니다. 솥의 서로 다른 위치에서 렌틸콩 3개를 골라 크리미하게 으깨지고 단단하거나 가루 같은 심이 없는지 확인합니다. 단단한 콩이 있으면 뜨거운 물 30ml를 섞고 다시 잠근 뒤 고압에서 2분 더 익힙니다. 5분 자연 감압한 후 다시 확인하고 필요하면 반복합니다.",
    "ใส่ถั่วดาล น้ำ 750 มล. มะเขือเทศ ขิง ขมิ้น และเกลือ 3 กรัมลงหม้ออัดแรงดัน ล็อกฝาตามคู่มือ เมื่อหม้อถึงแรงดันสูงแล้วจึงเริ่มจับเวลา 10 นาทีและรักษาแรงดันให้คงที่ ปิดไฟและปล่อยแรงดันตามธรรมชาติ 10 นาที ระบายแรงดันที่เหลือตามคำแนะนำของผู้ผลิต และเปิดฝาเมื่อมาตรวัดแรงดันลดลงแล้ว เลือกถั่ว 3 เม็ดจากคนละตำแหน่งในหม้อ เนื้อควรบดเป็นครีมได้โดยไม่มีแกนแข็งหรือเป็นผง หากยังมีเม็ดแข็ง ให้เติมน้ำร้อน 30 มล. คน แล้วปิดฝาเพิ่มแรงดันสูงอีก 2 นาที ปล่อยแรงดันตามธรรมชาติ 5 นาทีแล้วตรวจซ้ำ ทำซ้ำได้หากจำเป็น"
  ));
  recipe.storage = ml(
    "Divide leftovers into shallow containers and refrigerate at 4°C (40°F) or colder within 2 hours, or within 1 hour above 32°C (90°F). Use within 3 days. Reheat only the serving needed until it reaches 74°C (165°F) throughout.",
    "剩餘扁豆分裝淺容器，2 小時內冷藏於 4°C（40°F）或以下；環境高於 32°C（90°F）時須於 1 小時內冷藏。3 天內食用。只回熱需要的份量，並確認各處達 74°C（165°F）。",
    "残りは浅い容器に分け、2時間以内に4°C（40°F）以下で冷蔵します。32°C（90°F）を超える環境では1時間以内に冷蔵します。3日以内に使い、食べる分だけ全体が74°C（165°F）になるまで再加熱します。",
    "남은 달은 얕은 용기에 나눠 담아 2시간 안에 4°C (40°F) 이하로 냉장합니다. 32°C (90°F)가 넘는 환경에서는 1시간 안에 냉장합니다. 3일 안에 먹고 필요한 양만 전체가 74°C (165°F)가 되도록 다시 데웁니다.",
    "แบ่งถั่วดาลที่เหลือใส่ภาชนะตื้นและแช่เย็นที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F)"
  );
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — Cold Food Storage Chart", storageChart);
}

function reviseGougeres(recipe) {
  body(recipe, 5, ml(
    "Bake for 10 minutes at 200°C, reduce to 180°C without opening the door, and bake 12–15 minutes more until the puffs are deep golden, hollow, and firm. Insert a clean instant-read thermometer through the side of the largest puff into its thick shell; it must reach 71°C (160°F). If it is below 71°C, shield already-dark tops loosely with foil, reduce the oven to 160°C, and bake in 3-minute increments, checking the shell again. Once ready, pierce each puff and return the tray to the switched-off oven for 5 minutes to dry.",
    "先以 200°C 烤 10 分鐘，不開門降至 180°C，再烤 12–15 分鐘，至泡芙深金黃、鼓起且外殼結實。用乾淨即讀溫度計從最大顆側面插入較厚的外殼，確認達 71°C（160°F）。若低於 71°C，已上色較深的表面鬆鬆蓋上鋁箔，烤箱降至 160°C，每次續烤 3 分鐘並重測外殼。達標後在每顆側面刺孔，放回已關火的烤箱 5 分鐘烘乾。",
    "200°Cで10分焼き、扉を開けず180°Cに下げてさらに12〜15分、濃いきつね色で膨らみ、外側がしっかりするまで焼きます。最も大きいものの側面から清潔な即読式温度計を厚い殻の部分に差し、71°C（160°F）を確認します。71°Cに達していなければ、色が濃い部分にホイルをふんわりかけ、オーブンを160°Cに下げて3分ずつ焼き、殻の温度を再確認します。火が通ったら各々の側面に穴を開け、火を止めたオーブンに天板を5分戻して乾かします。",
    "200°C에서 10분 굽고 문을 열지 않은 채 180°C로 낮춰 12–15분 더 구워 짙은 금빛에 속이 비고 껍질이 단단해지게 합니다. 가장 큰 슈의 옆면으로 깨끗한 즉시 판독 온도계를 두꺼운 껍질 부분에 넣어 71°C (160°F)인지 확인합니다. 71°C보다 낮으면 이미 짙게 색난 윗면을 포일로 느슨하게 덮고 오븐을 160°C로 낮춰 3분씩 더 구운 뒤 껍질 온도를 다시 잽니다. 익으면 각 슈 옆에 구멍을 내고 불을 끈 오븐에 팬을 5분 넣어 말립니다.",
    "อบที่ 200°C 10 นาที ลดเหลือ 180°C โดยไม่เปิดเตา แล้วอบต่อ 12–15 นาทีจนพอง สีทองเข้ม และเปลือกแน่น ใช้เทอร์โมมิเตอร์อ่านเร็วที่สะอาดแทงจากด้านข้างของชิ้นที่ใหญ่ที่สุดเข้าเนื้อเปลือกส่วนหนา ตรวจให้ได้ 71°C (160°F) หากอุณหภูมิต่ำกว่า 71°C ให้คลุมส่วนที่สีเข้มด้วยฟอยล์หลวม ๆ ลดเตาเป็น 160°C และอบเพิ่มครั้งละ 3 นาที แล้ววัดเปลือกซ้ำ เมื่อสุกแล้วเจาะรูด้านข้างแต่ละชิ้นและนำถาดกลับเข้าเตาที่ปิดไฟ 5 นาทีให้แห้ง"
  ));
  recipe.storage = ml(
    "These egg-and-cheese puffs are perishable. Cool in one layer and refrigerate at 4°C (40°F) or colder within 2 hours of baking, or within 1 hour above 32°C (90°F); use within 3–4 days. Reheat only the amount needed in a 180°C oven until the centre reaches 74°C (165°F). Freeze airtight for up to 1 month for longer storage.",
    "這款含蛋與起司的泡芙需冷藏。單層散熱，烤好後 2 小時內（環境高於 32°C／90°F 時 1 小時內）放入 4°C（40°F）或以下冰箱，3–4 天內食用。只取需要的份量，以 180°C 烤箱回熱至中心達 74°C（165°F）。久放可密封冷凍最多 1 個月。",
    "卵とチーズを使うため冷蔵が必要です。1層に並べて冷まし、焼いてから2時間以内（32°C／90°Fを超える環境では1時間以内）に4°C（40°F）以下で冷蔵し、3〜4日以内に使います。食べる分だけ180°Cのオーブンで中心が74°C（165°F）になるまで温めます。長期保存は密閉して1か月まで冷凍できます。",
    "달걀과 치즈가 들어 있어 냉장 보관해야 합니다. 한 겹으로 식힌 뒤 굽고 2시간 안에(32°C/90°F를 넘는 환경에서는 1시간 안에) 4°C (40°F) 이하로 냉장하고 3–4일 안에 먹습니다. 필요한 양만 180°C 오븐에서 중심이 74°C (165°F)가 될 때까지 다시 데웁니다. 더 오래 보관하려면 밀폐해 최대 1개월 냉동합니다.",
    "ชูที่มีไข่และชีสต้องแช่เย็น วางเรียงชั้นเดียวให้เย็นและแช่ที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมงหลังอบ หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะกินในเตา 180°C จนตรงกลางถึง 74°C (165°F) หากเก็บนานให้แช่แข็งในภาชนะปิดสนิทได้ไม่เกิน 1 เดือน"
  );
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

function reviseSkilletCornbread(recipe) {
  body(recipe, 5, ml(
    "Bake at 220°C for an estimated 18–22 minutes until deep golden. Insert a clean instant-read thermometer vertically into the centre without touching the cast-iron; the egg-containing bread must reach 71°C (160°F), and a tester should come out without wet batter. If the centre is below 71°C or the tester is streaked, bake 3 minutes more and check again. If the top gets dark before the centre is ready, cover loosely with foil, lower the oven to 200°C, and continue in 3-minute increments. Rest in the skillet for 10 minutes before cutting into wedges.",
    "以 220°C 烤約 18–22 分鐘至深金黃。用乾淨即讀溫度計垂直插入中心，勿碰鑄鐵鍋；含蛋玉米麵包中心須達 71°C（160°F），竹籤也應無濕麵糊。若中心低於 71°C 或竹籤沾有麵糊，再烤 3 分鐘後重測。若中心未熟而表面已變深色，鬆鬆蓋上鋁箔，將烤箱降至 200°C，每次續烤 3 分鐘並確認。留在鍋中靜置 10 分鐘再切楔形。",
    "220°Cで約18〜22分、濃いきつね色になるまで焼きます。清潔な即読式温度計を鋳鉄に触れないよう中心へ垂直に差し、卵入りの生地が71°C（160°F）に達し、竹串に濡れた生地が付かないことを確認します。中心が71°C未満、または竹串に生地が付く場合は3分追加して再確認します。中心が焼ける前に表面が濃くなったらホイルをふんわりかけ、オーブンを200°Cに下げて3分ずつ焼き、再確認します。スキレットで10分休ませてからくさび形に切ります。",
    "220°C에서 약 18–22분간 짙은 금빛이 될 때까지 굽습니다. 깨끗한 즉시 판독 온도계를 무쇠 팬에 닿지 않게 중앙에 수직으로 꽂습니다. 달걀이 든 빵 중심은 71°C (160°F)에 도달하고 꼬치에 젖은 반죽이 묻지 않아야 합니다. 중심이 71°C보다 낮거나 꼬치에 반죽이 묻으면 3분 더 굽고 다시 확인합니다. 중심이 익기 전에 윗면이 짙어지면 포일을 느슨하게 덮고 오븐을 200°C로 낮춰 3분씩 더 구우며 확인합니다. 팬에서 10분 둔 뒤 쐐기 모양으로 자릅니다.",
    "อบที่ 220°C ประมาณ 18–22 นาทีจนสีทองเข้ม แทงเทอร์โมมิเตอร์อ่านเร็วที่สะอาดลงตรงกลางในแนวตั้งโดยไม่แตะกระทะเหล็ก ขนมปังที่มีไข่ต้องมีอุณหภูมิกลางชิ้น 71°C (160°F) และไม้ทดสอบต้องไม่มีแป้งเปียกติด หากกลางชิ้นต่ำกว่า 71°C หรือไม้มีแป้งติด ให้อบเพิ่ม 3 นาทีแล้วตรวจซ้ำ หากหน้าขนมเข้มก่อนตรงกลางสุก ให้คลุมฟอยล์หลวม ๆ ลดเตาเป็น 200°C และอบเพิ่มครั้งละ 3 นาทีพร้อมตรวจซ้ำ พักในกระทะ 10 นาทีก่อนตัดเป็นชิ้นสามเหลี่ยม"
  ));
  recipe.storage = ml(
    "Cut the bread into wedges after its 10-minute rest and refrigerate in shallow containers at 4°C (40°F) or colder within 2 hours, or within 1 hour above 32°C (90°F). Use within 3–4 days. Reheat only the portion needed until it reaches 74°C (165°F) throughout; freeze well wrapped for longer storage.",
    "靜置 10 分鐘後切成楔形，分裝淺容器並於 2 小時內冷藏至 4°C（40°F）或以下；環境高於 32°C（90°F）時須於 1 小時內冷藏。3–4 天內食用。只回熱需要的份量，確認各處達 74°C（165°F）；久放則包好冷凍。",
    "10分休ませてくさび形に切り、浅い容器に入れて2時間以内（32°C／90°Fを超える環境では1時間以内）に4°C（40°F）以下で冷蔵します。3〜4日以内に使います。食べる分だけ全体が74°C（165°F）になるまで再加熱し、長期保存はしっかり包んで冷凍します。",
    "10분 휴지한 뒤 쐐기 모양으로 잘라 얕은 용기에 담고 2시간 안에(32°C/90°F를 넘는 환경에서는 1시간 안에) 4°C (40°F) 이하로 냉장합니다. 3–4일 안에 먹습니다. 필요한 양만 전체가 74°C (165°F)가 될 때까지 다시 데우고 더 오래 보관하려면 잘 싸서 냉동합니다.",
    "พัก 10 นาทีแล้วตัดเป็นชิ้นสามเหลี่ยม แบ่งใส่ภาชนะตื้นและแช่ที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F) หากเก็บนานให้ห่ออย่างดีแล้วแช่แข็ง"
  );
  addOfficialSource(recipe, "FDA — What You Need to Know About Egg Safety", eggSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

function reviseToutons(recipe) {
  body(recipe, 1, ml(
    "Whisk the flour and salt in a large bowl. Stir in the yeast water and cooled melted butter until a soft shaggy dough forms. Do not taste the raw dough: flour is a raw food and must be fully cooked before eating. Wash hands, bowl, and utensils after handling it.",
    "大盆中麵粉與鹽拌勻，加入酵母水與放涼奶油攪拌，至形成柔軟粗糙麵糰。麵粉屬生食，必須徹底烹熟才可食用，不要試吃生麵糰；處理後清洗雙手、盆與器具。",
    "大きなボウルで粉と塩を混ぜ、酵母水と冷ました溶かしバターを加えて柔らかくぼそぼその生地にします。小麦粉は生の食品なので、十分に加熱するまで生地を味見しません。扱った後は手、ボウル、器具を洗います。",
    "큰 볼에 밀가루와 소금을 섞고 이스트 물과 식힌 녹인 버터를 넣어 부드럽고 거친 반죽을 만듭니다. 밀가루는 익히지 않은 식품이므로 반죽을 완전히 익히기 전에는 맛보지 마세요. 반죽을 다룬 뒤 손과 볼, 도구를 씻습니다.",
    "ผสมแป้งกับเกลือในชามใหญ่ ใส่น้ำยีสต์และเนยละลายที่เย็นแล้ว คนจนได้โดนุ่มหยาบ อย่าชิมโดดิบ เพราะแป้งยังไม่ผ่านความร้อนและต้องปรุงให้สุกทั่วก่อนกิน หลังจับโดให้ล้างมือ ชาม และอุปกรณ์"
  ));
  body(recipe, 4, ml(
    "Pour oil to a depth of 1 cm in a heavy skillet and heat over medium-low to 135°C (275°F). Keep it near this temperature; a small dough piece should bubble steadily but not brown quickly. If the oil climbs above 140°C, lower the heat and wait for it to return to 135°C before frying.",
    "厚底鍋倒入深約 1 cm 的油，以中小火加熱至 135°C（275°F）並盡量維持；小麵糰入油應持續緩緩冒泡，不可迅速上色。若油溫升過 140°C，轉小火等降回 135°C 再開始煎。",
    "厚手のフライパンに深さ1cmの油を入れ、中弱火で135°C（275°F）に熱します。この温度を保ち、小さな生地を入れたら安定して泡立つものの、すぐには色づかない状態にします。油が140°Cを超えたら火を弱め、135°Cに戻ってから揚げ焼きします。",
    "두꺼운 팬에 깊이 1cm로 기름을 붓고 중약불에서 135°C (275°F)로 가열합니다. 이 온도를 유지하고 작은 반죽 조각이 꾸준히 거품을 내되 빨리 갈색이 되지 않아야 합니다. 기름이 140°C를 넘으면 불을 낮춰 135°C로 돌아온 뒤 튀깁니다.",
    "เทน้ำมันลึก 1 ซม. ในกระทะหนา อุ่นไฟกลางอ่อนถึง 135°C (275°F) และรักษาอุณหภูมิไว้ เศษโดควรมีฟองสม่ำเสมอแต่ไม่เป็นสีน้ำตาลเร็ว หากน้ำมันเกิน 140°C ให้ลดไฟและรอจนกลับมาที่ 135°C ก่อนทอด"
  ));
  body(recipe, 5, ml(
    "Fry the rounds in batches for about 4 minutes per side, turning once, until golden. Cut the thickest first round through its centre: the crumb should be set and matte, with no wet, gummy stripe. If the centre is gummy while the crust is already dark, move that batch to a lined tray and finish in a 120°C (250°F) oven for about 10 minutes; otherwise lower the oil to 125–130°C and fry in 2-minute increments, checking the centre again.",
    "圓餅分批每面煎約 4 分鐘，中途翻面一次，至金黃。先切開第一批中最厚的一片檢查中心：麵心應定型、呈霧面，不能有濕黏生麵糰帶。若中心仍黏而外殼已深色，將該批移至鋪紙烤盤，以 120°C（250°F）烤箱續烤約 10 分鐘；若外殼尚未太深，將油溫降至 125–130°C，每次續煎 2 分鐘並重切檢查。",
    "数回に分けて片面約4分ずつ、途中で一度返し、きつね色になるまで揚げ焼きします。最初の最も厚い1個を中心まで切り、パンの中が固まり、つや消しで、湿った粘りのある筋がないことを確認します。外側が濃いのに中心がべたつく場合は、天板に移して120°C（250°F）のオーブンで約10分仕上げます。色が濃くなる前なら油を125〜130°Cに下げ、2分ずつ追加して中心を再確認します。",
    "나누어 한 면당 약 4분씩 한 번 뒤집어 노릇하게 튀깁니다. 첫 번째로 가장 두꺼운 조각을 가운데까지 잘라 속살이 보송하게 굳고 젖은 끈적한 줄이 없는지 확인합니다. 겉은 이미 짙은데 속이 질척하면 유산지를 깐 팬으로 옮겨 120°C (250°F) 오븐에서 약 10분 더 익힙니다. 겉색이 아직 괜찮다면 기름을 125–130°C로 낮추고 2분씩 더 튀긴 뒤 속을 다시 확인합니다.",
    "ทอดเป็นชุด ๆ ด้านละประมาณ 4 นาที พลิกหนึ่งครั้งจนเป็นสีทอง ผ่าชิ้นแรกที่หนาที่สุดตรงกลาง เนื้อข้างในควรเซ็ตเป็นเนื้อด้าน ไม่มีแถบแป้งเปียกเหนียว หากด้านนอกเข้มแล้วแต่ข้างในยังเหนียว ให้วางบนถาดรองกระดาษและอบต่อในเตา 120°C (250°F) ประมาณ 10 นาที หากสียังไม่เข้ม ให้ลดน้ำมันเหลือ 125–130°C แล้วทอดเพิ่มครั้งละ 2 นาที ตรวจตรงกลางซ้ำ"
  ));
  recipe.storage = ml(
    "Cool leftovers promptly and refrigerate in a shallow container at 4°C (40°F) or colder within 2 hours, or within 1 hour above 32°C (90°F). Use within 3 days. Reheat only the portion needed until it reaches 74°C (165°F) throughout.",
    "剩食盡快放入淺容器，2 小時內冷藏於 4°C（40°F）或以下；環境高於 32°C（90°F）時須於 1 小時內冷藏。3 天內食用。只回熱需要的份量，確認各處達 74°C（165°F）。",
    "残りは速やかに浅い容器へ入れ、2時間以内（32°C／90°Fを超える環境では1時間以内）に4°C（40°F）以下で冷蔵します。3日以内に使い、食べる分だけ全体が74°C（165°F）になるまで温めます。",
    "남은 음식은 얕은 용기에 담아 2시간 안에(32°C/90°F를 넘는 환경에서는 1시간 안에) 4°C (40°F) 이하로 냉장합니다. 3일 안에 먹고 필요한 양만 전체가 74°C (165°F)가 될 때까지 다시 데웁니다.",
    "ทำให้อาหารที่เหลือเย็นอย่างรวดเร็ว ใส่ภาชนะตื้นและแช่ที่ 4°C (40°F) หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงเมื่ออากาศร้อนเกิน 32°C (90°F) กินภายใน 3 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C (165°F)"
  );
  addOfficialSource(recipe, "FDA — Handling Flour Safely: What You Need to Know", flourSafety);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
}

export function refineSeventyFourthMethods(recipes) {
  const byId = new Map();
  for (const id of ["dal-tadka", "gougeres", "skillet-cornbread", "toutons"]) {
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
  reviseDalTadka(byId.get("dal-tadka"));
  reviseGougeres(byId.get("gougeres"));
  reviseSkilletCornbread(byId.get("skillet-cornbread"));
  reviseToutons(byId.get("toutons"));
}
