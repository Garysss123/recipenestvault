const ml = (en, zh, ja, ko, th) => ({ en, "zh-hant": zh, ja, ko, th });
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";

function clone(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({
      ...row,
      amount: typeof row.amount === "object" ? { ...row.amount } : row.amount,
      item: typeof row.item === "object" ? { ...row.item } : row.item
    })),
    instructions: recipe.instructions.map((step) => ({ ...step, title: { ...step.title }, body: { ...step.body } })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function body(recipe, index, localized) {
  recipe.instructions[index].body = localized;
}

function official(recipe, label, url, publisher = "FoodSafety.gov") {
  const title = `Official food-safety guidance — ${publisher}: ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function addSafetySources(recipe, { egg = false } = {}) {
  official(recipe, "Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "4 Steps to Food Safety", handling);
  official(recipe, "Cold Food Storage Charts", storageChart);
  if (egg) official(recipe, "What You Need to Know About Egg Safety", eggSafety, "FDA");
}

function reviseSteakAndKidneyPie(recipe) {
  recipe.cookMinutes = 160;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 6, ml(
    "Add the seared kidney and simmer uncovered for an estimated 15–20 minutes, stirring occasionally, until the beef is fork-tender, the kidney is cooked through, and the gravy coats the meat. Time and tenderness guide quality; the baked meat pie still needs its measured 74°C (165°F) casserole check. Taste and add up to the remaining 4 g salt and 1 g pepper only as needed.",
    "加入煎過的腰子，不加蓋小滾約 15–20 分鐘並偶爾攪拌，至牛肉可用叉子分開、腰子熟透、肉汁能裹住肉塊。時間與軟嫩度只供品質判斷；肉派烘烤後仍須以溫度計確認中心達 74°C（165°F）的焗烤安全標準。試味後才視需要加入剩餘最多 4 公克鹽與 1 公克胡椒。",
    "焼いた腎臓を加え、目安として15〜20分、時々混ぜながら蓋をせず煮ます。牛肉がフォークでほぐれるほど柔らかく、腎臓に火が通り、グレイビーが肉に絡む状態にします。時間と柔らかさは品質の目安です。焼き上がったミートパイは中心を測り、キャセロールの安全基準74°C（165°F）も確認します。味を見て残りの塩最大4g、こしょう1gを必要な分だけ加えます。",
    "시어링한 신장을 넣고 추정 15–20분 뚜껑 없이 가끔 저으며 끓입니다. 소고기가 포크로 부드럽게 찢어지고 신장이 익으며 그레이비가 고기에 묻을 때까지 조리합니다. 시간과 부드러움은 품질 기준입니다. 구운 고기 파이는 가운데를 재어 캐서롤 안전 기준인 74°C (165°F)도 확인해야 합니다. 맛을 보고 남은 소금 최대 4g과 후추 1g을 필요한 만큼만 넣습니다.",
    "ใส่ไตที่จี่ไว้ เคี่ยวเปิดฝาประมาณ 15–20 นาที คนเป็นครั้งคราวจนเนื้อวัวนุ่มใช้ส้อมแยกได้ ไตสุกทั่ว และเกรวีเคลือบเนื้อ เวลาและความนุ่มเป็นเกณฑ์ด้านคุณภาพ พายเนื้อที่อบแล้วต้องวัดตรงกลางให้ถึงเกณฑ์หม้ออบ 74°C (165°F) ด้วย ชิมแล้วเติมเกลือที่เหลือไม่เกิน 4 กรัมกับพริกไทย 1 กรัมเท่าที่จำเป็น"
 ));
  body(recipe, 7, ml(
    "Spread the filling in a shallow tray and let it stop steaming for about 45 minutes as a pastry-quality estimate. Refrigerate it within 2 hours of cooking, even if it is still a little warm; do not leave it out until fully cold. Keep the raw-meat bowl and utensils away from the cooled filling. Chilling the filling firms the gravy and prevents steam from softening the pastry lid.",
    "餡料攤入淺盤，約放涼 45 分鐘至蒸氣散去；這是為了酥皮品質的估時。無論是否仍微溫，都須在烹煮後 2 小時內冷藏，不要放在室溫等到完全冷透。生肉用過的碗具要與冷卻餡料分開。冷藏能讓肉汁凝稠，也避免蒸氣弄軟派皮。",
    "具を浅いトレーに広げ、パイ生地の品質のための目安として約45分、湯気が収まるまで冷まします。まだ少し温かくても調理後2時間以内に冷蔵し、完全に冷めるまで室温に置かないでください。生肉に使ったボウルや器具は冷めた具から離します。具を冷やすとグレイビーが固まり、蒸気でパイの蓋が柔らかくなるのを防げます。",
    "속을 얕은 트레이에 펴고 페이스트리 품질을 위한 추정 시간 약 45분 동안 김이 잦아들게 식힙니다. 아직 약간 따뜻해도 조리 후 2시간 안에 냉장하고 완전히 식을 때까지 실온에 두지 마세요. 생고기에 쓴 그릇과 도구는 식힌 속과 분리합니다. 속을 차게 하면 그레이비가 굳고 증기가 페이스트리 뚜껑을 눅눅하게 만드는 것을 막습니다.",
    "แผ่ไส้บนถาดตื้น พักประมาณ 45 นาทีให้ไอน้ำลดลง ซึ่งเป็นเวลาโดยประมาณเพื่อคุณภาพของแป้งพาย แม้ยังอุ่นเล็กน้อยก็ต้องแช่เย็นภายใน 2 ชั่วโมงหลังปรุง อย่าวางทิ้งไว้จนเย็นสนิท แยกชามและอุปกรณ์ที่สัมผัสเนื้อดิบออกจากไส้ที่เย็นแล้ว การแช่ไส้ให้เย็นช่วยให้เกรวีอยู่ตัวและกันไอน้ำทำให้ฝาพายนิ่ม"
 ));
  body(recipe, 11, ml(
    "Bake at 200°C for an estimated 35–40 minutes until the pastry is fully risen and deep golden. Insert a clean thermometer through a steam slit into the centre of the filling without touching the dish; FoodSafety.gov's meat-casserole endpoint is 74°C (165°F). If it is below 74°C, bake 5 minutes more and recheck. Golden pastry and bubbling gravy are quality cues, not the safety test. After the centre reaches 74°C, rest 15 minutes, then divide into six equal portions; each represents about 133 g raw beef and 42 g raw kidney before cooking. The 160-minute cook estimate includes browning, braising, baking, and this rest; the 45-minute filling cool is in the prep estimate.",
    "以 200°C 烘烤約 35–40 分鐘，至酥皮充分膨起並呈深金色。用乾淨溫度計從蒸氣切口插入餡料中心，勿碰到烤盤；FoodSafety.gov 的含肉焗烤標準為 74°C（165°F）。若未達 74°C，每次續烤 5 分鐘後複測。酥皮金黃和肉汁冒泡是品質指標，不是安全檢查。中心達 74°C 後靜置 15 分鐘，再平均分成 6 份；每份約相當於烹煮前 133 公克牛肉與 42 公克腰子。160 分鐘烹調估時包括煎香、燉煮、烘烤與靜置；餡料放涼的 45 分鐘計入備料估時。",
    "200°Cで目安として35〜40分、ペストリーが十分に膨らみ濃いきつね色になるまで焼きます。清潔な温度計を蒸気穴から具の中心へ差し、皿に触れないよう測ります。FoodSafety.govの肉入りキャセロールの安全基準は74°C（165°F）です。74°C未満なら5分ずつ追加して再測定します。焼き色やグレイビーの泡立ちは品質の目安で、安全確認ではありません。中心が74°Cに達したら15分休ませ、6等分します。1人分は調理前の牛肉約133g、腎臓約42g相当です。調理時間160分の目安には焼き付け、煮込み、焼成、休ませ時間を含み、具を冷ます45分は準備時間に含みます。",
    "200°C에서 추정 35–40분, 페이스트리가 충분히 부풀고 진한 황금색이 될 때까지 굽습니다. 깨끗한 온도계를 김 빠지는 구멍으로 넣어 접시에 닿지 않게 속 가운데를 잽니다. FoodSafety.gov의 고기 캐서롤 안전 기준은 74°C (165°F)입니다. 74°C 미만이면 5분씩 더 굽고 다시 잽니다. 페이스트리 색과 그레이비 거품은 품질 신호이지 안전 확인이 아닙니다. 가운데가 74°C에 도달하면 15분 쉬고 여섯 등분합니다. 한 인분은 조리 전 소고기 약 133g과 신장 약 42g에 해당합니다. 조리 시간 추정 160분에는 굽기, 조림, 오븐 조리, 휴지가 포함되며 속을 식히는 45분은 준비 시간에 포함됩니다.",
    "อบที่ 200°C ประมาณ 35–40 นาทีจนพัฟเพสตรีพองเต็มที่และเป็นสีทองเข้ม ใช้เทอร์โมมิเตอร์สะอาดสอดผ่านช่องไอน้ำไปวัดตรงกลางไส้โดยไม่ให้แตะจาน FoodSafety.gov กำหนดหม้ออบที่มีเนื้อไว้ที่ 74°C (165°F) หากยังไม่ถึง 74°C ให้อบเพิ่มครั้งละ 5 นาทีแล้ววัดซ้ำ สีทองของแป้งและเกรวีที่เดือดเป็นเกณฑ์คุณภาพ ไม่ใช่การตรวจความปลอดภัย เมื่อใจกลางถึง 74°C แล้วพัก 15 นาที จากนั้นแบ่งเป็น 6 ส่วนเท่า ๆ กัน แต่ละส่วนเทียบเท่าเนื้อวัวดิบประมาณ 133 กรัมและไตดิบ 42 กรัม เวลาอบโดยประมาณ 160 นาทีรวมการจี่ การตุ๋น การอบ และการพัก ส่วนการทำไส้ให้เย็น 45 นาทีรวมอยู่ในเวลาเตรียม"
 ));
  recipe.storage = ml(
    "Divide leftovers into shallow containers and refrigerate within 2 hours at or below 4°C/40°F. Three days is a pastry-quality preference; FoodSafety.gov lists cooked leftovers for 3–4 days. Reheat only the portion needed until the centre reaches 74°C/165°F; a crisp crust or steaming gravy alone does not verify the temperature.",
    "剩菜分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。為保持派皮品質而建議 3 天內食用是口感偏好；FoodSafety.gov 將熟食剩菜列為 3–4 天。只取所需份量復熱至中心 74°C/165°F；派皮酥脆或肉汁冒蒸氣都不能單獨證明已達此溫度。",
    "残りは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。パイ生地の品質のため3日以内を勧めますが、これは品質上の好みです。FoodSafety.govは調理済みの残り物を3〜4日としています。食べる分だけ中心が74°C/165°Fになるまで再加熱します。皮の歯ざわりやグレイビーの湯気だけでは温度を確認できません。",
    "남은 음식은 얕은 용기에 나눠 2시간 안에 4°C/40°F 이하로 냉장합니다. 페이스트리 품질을 위한 3일은 선호 기준이며, FoodSafety.gov는 조리된 남은 음식을 3–4일로 안내합니다. 먹을 만큼만 가운데가 74°C/165°F가 될 때까지 재가열합니다. 바삭한 껍질이나 그레이비의 김만으로는 온도를 확인할 수 없습니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า การกินภายใน 3 วันเพื่อคุณภาพของแป้งเป็นความชอบด้านเนื้อสัมผัส ส่วน FoodSafety.gov ระบุอาหารปรุงสุกที่เหลือ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินจนตรงกลางถึง 74°C/165°F ความกรอบของแป้งหรือไอน้ำจากเกรวีอย่างเดียวไม่ยืนยันอุณหภูมิ"
  );
  addSafetySources(recipe);
}

function reviseErbsensuppe(recipe) {
  recipe.cookMinutes = 115;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const sausage = recipe.ingredients.find((row) => row.item.en.startsWith("smoked German sausages"));
  sausage.item = ml(
    "fully cooked smoked German sausages, sliced",
    "已熟製煙燻德式香腸，切片",
    "加熱済みスモークドイツソーセージ、輪切り",
    "완전히 익힌 훈제 독일식 소시지, 썬 것",
    "ไส้กรอกเยอรมันรมควันที่ปรุงสุกแล้ว หั่นแว่น"
  );
  body(recipe, 5, ml(
    "Add the 300 g fully cooked smoked sausage and simmer gently for an estimated 8–10 minutes. Check the soup in more than one spot with a clean thermometer; the pot must reach 74°C (165°F) throughout before serving. Add 2–3 minutes at a time if needed. The estimate allows the sausage to warm without splitting, but time, steam, or colour is not the safety check.",
    "加入 300 公克已熟製煙燻香腸，溫和小滾約 8–10 分鐘。用乾淨溫度計在鍋中不同位置測量；上桌前整鍋須達 74°C（165°F）。若未達，每次再加熱 2–3 分鐘後複測。此估時是為了讓香腸熱透又不破皮；時間、蒸氣或顏色都不是安全檢查。",
    "加熱済みスモークソーセージ300gを加え、目安として8〜10分やさしく煮ます。清潔な温度計で鍋の複数箇所を測り、出す前に全体が74°C（165°F）に達していることを確認します。未達なら2〜3分ずつ加熱して再測定します。時間はソーセージを皮が破れないよう温める目安であり、時間・湯気・色は安全確認の代わりになりません。",
    "완전히 익힌 훈제 소시지 300g을 넣고 추정 8–10분 부드럽게 끓입니다. 깨끗한 온도계로 냄비 여러 곳을 재어 내기 전에 전체가 74°C (165°F)에 도달했는지 확인합니다. 미달이면 2–3분씩 더 끓이고 다시 잽니다. 이 시간은 소시지 껍질이 터지지 않게 데우는 추정치이며, 시간·김·색은 안전 확인 기준이 아닙니다.",
    "ใส่ไส้กรอกรมควันที่ปรุงสุกแล้ว 300 กรัม เคี่ยวเบา ๆ ประมาณ 8–10 นาที ใช้เทอร์โมมิเตอร์สะอาดวัดมากกว่าหนึ่งจุดในหม้อ ก่อนเสิร์ฟทั้งหม้อต้องถึง 74°C (165°F) หากยังไม่ถึงให้เคี่ยวเพิ่มครั้งละ 2–3 นาทีแล้ววัดซ้ำ เวลานี้เป็นค่าประมาณเพื่ออุ่นไส้กรอกโดยไม่ให้หนังแตก เวลา ไอน้ำ หรือสีไม่ใช่การตรวจความปลอดภัย"
  ));
  body(recipe, 7, ml(
    "Remove the bay leaves, taste, then add only as much of the remaining salt and pepper as needed; smoked bacon and sausage vary in saltiness. Stir in half the parsley off heat and rest 5 minutes. Divide among six bowls, giving each about 50 g sausage and an even share of bacon, peas, potatoes, and vegetables; scatter the remaining parsley over the bowls. The 115-minute cook estimate includes the timed simmer stages and 5-minute rest; peas should be tender and potatoes hold their shape, while the thermometer reading sets safety.",
    "取出月桂葉並先試味，再視需要加入剩餘鹽和胡椒；煙燻培根與香腸的鹹度不一。關火後拌入一半巴西里，靜置 5 分鐘。分入 6 碗，每碗約 50 公克香腸，培根、豌豆、馬鈴薯與蔬菜平均分配，最後撒上剩餘巴西里。115 分鐘烹調估時包括各段定時燉煮和 5 分鐘靜置；豌豆應軟熟、馬鈴薯仍保持形狀，安全則以溫度計讀值為準。",
    "ローリエを取り出して味見し、ベーコンとソーセージの塩分に応じて残りの塩・こしょうを必要な分だけ加えます。火を止めてパセリの半量を混ぜ、5分休ませます。6杯に分け、各杯にソーセージ約50gとベーコン、豆、じゃがいも、野菜を均等に盛り、残りのパセリを散らします。調理時間115分の目安には各工程の煮込みと5分の休ませ時間を含みます。豆は柔らかく、じゃがいもは形を保つのが品質の目安で、安全は温度計で判断します。",
    "월계수 잎을 건지고 맛을 본 뒤 남은 소금과 후추는 필요한 만큼만 넣습니다. 훈제 베이컨과 소시지의 염도가 다를 수 있습니다. 불을 끄고 파슬리 절반을 섞어 5분 둡니다. 여섯 그릇에 나누고 각 그릇에 소시지 약 50g과 베이컨, 완두콩, 감자, 채소를 고르게 담은 뒤 나머지 파슬리를 뿌립니다. 조리 시간 추정 115분에는 각 단계의 정해진 끓이는 시간과 5분 휴지가 포함됩니다. 완두콩은 부드럽고 감자는 모양을 유지해야 하며 안전은 온도계로 확인합니다.",
    "นำใบกระวานออก ชิมก่อนเติมเกลือและพริกไทยที่เหลือเท่าที่จำเป็น เพราะเบคอนรมควันและไส้กรอกมีความเค็มต่างกัน ปิดไฟแล้วคนพาร์สลีย์ครึ่งหนึ่ง พัก 5 นาที แบ่งใส่ 6 ชาม แต่ละชามได้ไส้กรอกราว 50 กรัม และแบ่งเบคอน ถั่วลันเตา มันฝรั่ง และผักให้เท่า ๆ กัน โรยพาร์สลีย์ที่เหลือ เวลาเคี่ยวโดยประมาณ 115 นาทีรวมช่วงเคี่ยวที่ระบุและพัก 5 นาที ถั่วควรนุ่ม มันฝรั่งยังคงรูปซึ่งเป็นเกณฑ์คุณภาพ ส่วนความปลอดภัยให้ใช้เทอร์โมมิเตอร์"
  ));
  recipe.storage = ml(
    "Divide leftovers into shallow containers and refrigerate within 2 hours at or below 4°C/40°F. Three days is a flavour and texture preference; FoodSafety.gov lists soups and stews for 3–4 days. Reheat only the amount needed, stirring, until the coolest part reaches 74°C/165°F. Do not use steaming or a simmering edge as a substitute for checking the centre.",
    "剩菜分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。為風味和口感而建議 3 天內食用是品質偏好；FoodSafety.gov 將湯與燉菜列為 3–4 天。只取需要的份量，邊攪拌邊復熱，至最冷處達 74°C/165°F。不能以冒蒸氣或鍋邊小滾代替測量中心。",
    "残りは浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。風味と食感のため3日以内を勧めますが、これは品質上の好みです。FoodSafety.govはスープとシチューを3〜4日としています。必要な分だけ混ぜながら再加熱し、最も冷たい部分が74°C/165°Fになるまで温めます。湯気や鍋の縁の泡立ちだけで中心温度を判断しないでください。",
    "남은 음식은 얕은 용기에 나눠 2시간 안에 4°C/40°F 이하로 냉장합니다. 풍미와 식감을 위한 3일은 품질 기준이며, FoodSafety.gov는 수프와 스튜를 3–4일로 안내합니다. 필요한 양만 저으면서 재가열해 가장 차가운 부분이 74°C/165°F에 도달하게 합니다. 김이 나거나 냄비 가장자리가 끓는 것만으로 가운데 온도를 대신 확인할 수 없습니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า การกินภายใน 3 วันเพื่อรสและเนื้อสัมผัสเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุซุปและสตูว์ 3–4 วัน อุ่นเฉพาะปริมาณที่จะกินพร้อมคนจนส่วนที่เย็นที่สุดถึง 74°C/165°F อย่าใช้ไอน้ำหรือฟองเดือดริมหม้อแทนการวัดตรงกลาง"
  );
  addSafetySources(recipe);
}

function reviseSalmorejo(recipe) {
  body(recipe, 0, ml(
    "Lower the 2 eggs into gently simmering water and cook for an estimated 10 minutes, until both whites and yolks are firm; the time is a guide, not the safety test. Transfer them to cold water to stop cooking, then refrigerate within 2 hours. While they cook, blend the cored tomatoes for 45–60 seconds until liquid and pass through a fine sieve to remove coarse skin and seeds.",
    "將 2 顆蛋放入微滾水中，約煮 10 分鐘至蛋白與蛋黃都凝固；時間僅供估計，不是安全檢查。撈入冷水停止加熱，並在 2 小時內冷藏。煮蛋同時將去蒂番茄攪打 45–60 秒至液化，再過細篩去除粗皮與籽。",
    "卵2個を静かな沸騰湯に入れ、目安として10分、白身と黄身の両方が固まるまでゆでます。時間は目安で、安全確認そのものではありません。冷水に移して余熱を止め、2時間以内に冷蔵します。ゆでている間にトマトを45〜60秒、液状になるまで攪拌し、細かいこし器で粗い皮と種を除きます。",
    "달걀 2개를 약하게 끓는 물에 넣고 추정 10분, 흰자와 노른자가 모두 단단해질 때까지 삶습니다. 시간은 참고치이지 안전 확인 기준이 아닙니다. 찬물에 옮겨 익힘을 멈춘 뒤 2시간 안에 냉장합니다. 달걀을 삶는 동안 꼭지를 제거한 토마토를 45–60초 액체가 되도록 갈고 고운 체에 걸러 거친 껍질과 씨를 제거합니다.",
    "ใส่ไข่ 2 ฟองลงในน้ำเดือดอ่อน ๆ ต้มประมาณ 10 นาทีจนทั้งไข่ขาวและไข่แดงแข็งตัว เวลานี้เป็นค่าประมาณ ไม่ใช่การตรวจความปลอดภัย ย้ายลงน้ำเย็นเพื่อหยุดสุก แล้วแช่เย็นภายใน 2 ชั่วโมง ระหว่างต้มไข่ ปั่นมะเขือเทศที่เอาขั้วออก 45–60 วินาทีจนเป็นน้ำ แล้วกรองผ่านตะแกรงละเอียดเพื่อเอาเปลือกหยาบและเมล็ดออก"
  ));
  body(recipe, 4, ml(
    "Cover and chill the salmorejo for at least 1 hour. Keep the peeled hard-cooked eggs refrigerated until serving; dice the 2 eggs and 80 g Serrano ham just before plating. Stir the soup, then divide among four cold bowls: each gets one-quarter of the tomato-bread base, about 25 ml olive oil from the recipe, half an egg, and 20 g ham. Serve at 6–10°C. The one-hour chill and 6–10°C serving range are quality instructions, not substitutes for keeping the eggs and soup refrigerated.",
    "加蓋冷藏 salmorejo 至少 1 小時。剝殼的全熟蛋要持續冷藏至上桌；擺盤前才切碎 2 顆蛋和 80 公克 Serrano 火腿。將湯攪勻後分入 4 個冰涼碗，每碗含四分之一番茄麵包底、約 25 毫升橄欖油、半顆蛋和 20 公克火腿。以 6–10°C 上桌。一小時冷藏與 6–10°C 上桌是品質指引，不能取代湯和雞蛋持續冷藏。",
    "サルモレホにふたをして少なくとも1時間冷やします。殻をむいた固ゆで卵は盛り付けまで冷蔵し、卵2個とセラーノハム80gは盛る直前に細かく切ります。スープを混ぜて冷たい器4つに分けます。各器にはトマトとパンのベースの4分の1、レシピ分量からオリーブ油約25ml、卵半個、ハム20gを盛ります。6〜10°Cで出します。1時間の冷却と6〜10°Cの提供温度は品質の目安で、卵やスープを冷蔵保存する代わりにはなりません。",
    "살모레호를 덮어 최소 1시간 냉장합니다. 껍질을 깐 완숙 달걀은 낼 때까지 냉장하고, 달걀 2개와 하몬 세라노 80g은 담기 직전에 잘게 썹니다. 수프를 저어 차가운 그릇 네 개에 나눕니다. 각 그릇에 토마토·빵 베이스 4분의 1, 레시피 전체 올리브유 중 약 25ml, 달걀 반 개, 하몬 20g을 담습니다. 6–10°C로 냅니다. 한 시간 냉장과 6–10°C 제공 온도는 품질 지침이며 달걀과 수프를 냉장 보관하는 것을 대신하지 않습니다.",
    "ปิดฝาแช่ซัลโมเรโฆอย่างน้อย 1 ชั่วโมง เก็บไข่ต้มสุกที่ปอกแล้วในตู้เย็นจนกว่าจะเสิร์ฟ หั่นไข่ 2 ฟองและแฮมเซร์ราโน 80 กรัมก่อนจัดจาน คนซุปแล้วแบ่งใส่ชามเย็น 4 ใบ แต่ละชามได้ฐานมะเขือเทศกับขนมปังหนึ่งในสี่ น้ำมันมะกอกจากสูตรประมาณ 25 มล. ไข่ครึ่งฟอง และแฮม 20 กรัม เสิร์ฟที่ 6–10°C เวลาแช่เย็นหนึ่งชั่วโมงและอุณหภูมิเสิร์ฟ 6–10°C เป็นคำแนะนำด้านคุณภาพ ไม่ใช่สิ่งทดแทนการเก็บไข่และซุปในตู้เย็น"
  ));
  recipe.storage = ml(
    "Keep the soup and cooked egg/ham garnish covered at or below 4°C/40°F; refrigerate within 2 hours and keep toppings separate until serving. Two days is a freshness and texture preference; FoodSafety.gov's general refrigerated-leftover window is 3–4 days. Hard-cooked eggs kept separately are listed for up to 1 week, but once diced with the soup or ham, use the combined portions within 3–4 days. Serve cold; if any egg-containing leftovers are reheated, bring them to 74°C/165°F throughout.",
    "湯和熟蛋、火腿配料都要加蓋冷藏於 4°C/40°F 以下，2 小時內冷藏，上桌前分開保存。為了新鮮度和口感建議 2 天內食用是品質偏好；FoodSafety.gov 的一般冷藏熟食剩菜期限為 3–4 天。分開保存的全熟蛋可按指引保存最多 1 週，但切碎並與湯或火腿混合後，合併份量須在 3–4 天內食用。冷食；若復熱含蛋剩菜，需使全體達 74°C/165°F。",
    "スープと固ゆで卵・ハムのトッピングは、2時間以内に4°C/40°F以下で冷蔵し、ふたをして提供まで別々に保管します。新鮮さと食感のため2日以内を勧めますが、これは品質上の好みです。FoodSafety.govの一般的な冷蔵残り物の目安は3〜4日です。固ゆで卵を別に保管する場合は1週間までですが、刻んでスープやハムと合わせたら、合わせた分を3〜4日以内に使います。冷たいまま出します。卵入りの残り物を温め直す場合は、全体を74°C/165°Fにします。",
    "수프와 완숙 달걀·하몬 토핑은 덮어 4°C/40°F 이하로 보관하고 2시간 안에 냉장합니다. 낼 때까지 토핑은 따로 둡니다. 신선도와 식감을 위한 2일은 품질 기준이며, FoodSafety.gov의 일반 냉장 조리식품 보관 기간은 3–4일입니다. 따로 둔 완숙 달걀은 최대 1주로 안내되지만, 수프나 하몬과 함께 썰어 섞은 뒤에는 합친 음식을 3–4일 안에 먹습니다. 차갑게 내고, 달걀이 든 남은 음식을 다시 데울 경우 전체가 74°C/165°F가 되게 합니다.",
    "เก็บซุปและเครื่องโรยไข่ต้มสุกกับแฮมปิดฝาที่ 4°C/40°F หรือต่ำกว่า แช่เย็นภายใน 2 ชั่วโมงและแยกเครื่องโรยไว้จนเสิร์ฟ การกินภายใน 2 วันเพื่อความสดและเนื้อสัมผัสเป็นเกณฑ์คุณภาพ ส่วน FoodSafety.gov ระบุอาหารปรุงสุกแช่เย็นทั่วไป 3–4 วัน ไข่ต้มสุกที่เก็บแยกมีคำแนะนำไม่เกิน 1 สัปดาห์ แต่เมื่อหั่นรวมกับซุปหรือแฮมแล้วให้กินภายใน 3–4 วัน เสิร์ฟแบบเย็น หากอุ่นอาหารเหลือที่มีไข่ให้ทั่วถึง 74°C/165°F"
  );
  addSafetySources(recipe, { egg: true });
}

function reviseMisoSoup(recipe) {
  body(recipe, 5, ml(
    "Rest the soup for 1 minute and, if serving it fresh, let it settle to about 70–75°C for a gentle sip. Divide among four bowls: each gets about 150 ml clear dashi, 62.5 g of the listed tofu, one-quarter of the rehydrated wakame (from 1 g dried), and 15 g miso. The 70–75°C serving range is a flavour preference, not a safety check for stored soup; never boil after adding miso.",
    "讓湯靜置 1 分鐘；現煮現吃時可降至約 70–75°C，口感較溫和。分入 4 碗，每碗約 150 毫升清高湯、配料表豆腐的四分之一（62.5 公克）、四分之一泡發裙帶菜（乾重 1 公克）及 15 公克味噌。70–75°C 是適口溫度偏好，不是冷藏湯品的安全復熱檢查；加入味噌後不可煮沸。",
    "1分休ませます。作りたてを出す場合は、口当たりを穏やかにするため70〜75°Cほどに落ち着かせます。4杯に分け、各杯に澄んだだし約150ml、豆腐約62.5g、戻したわかめの4分の1（乾燥時1g相当）、味噌15gを入れます。70〜75°Cは風味の好みで、保存したスープの安全確認ではありません。味噌を加えた後は沸騰させないでください。",
    "1분 둡니다. 갓 끓인 수프를 낼 때는 부드럽게 마시도록 약 70–75°C로 식힙니다. 네 그릇에 나눠 담고 각 그릇에 맑은 다시 약 150ml, 목록의 두부 약 62.5g, 불린 미역 4분의 1(건조 상태 1g 분량), 미소 15g씩 담습니다. 70–75°C 제공 온도는 풍미 선호 기준이지 보관한 수프의 안전 확인 기준이 아닙니다. 미소를 넣은 뒤 끓이지 마세요.",
    "พักซุป 1 นาที หากเสิร์ฟทันทีให้ปล่อยอุณหภูมิลดลงราว 70–75°C เพื่อให้ดื่มนุ่มนวล แบ่งใส่ 4 ชาม แต่ละชามได้ดาชิใสประมาณ 150 มล. เต้าหู้ตามรายการ 62.5 กรัม วากาเมะที่แช่แล้วหนึ่งในสี่ (เทียบเท่าวากาเมะแห้ง 1 กรัม) และมิโซะ 15 กรัม อุณหภูมิเสิร์ฟ 70–75°C เป็นความชอบด้านรสชาติ ไม่ใช่การตรวจความปลอดภัยของซุปที่เก็บไว้ หลังใส่มิโซะห้ามต้ม"
  ));
  recipe.storage = ml(
    "Divide the soup into shallow containers and refrigerate within 2 hours at or below 4°C/40°F. Two days is a wakame-texture preference; FoodSafety.gov lists refrigerated soups and stews for 3–4 days. Reheat only the portion needed, stirring, until the coolest part reaches 74°C/165°F. Then take it off the heat and avoid boiling after the miso is in; the fresh serving temperature is a flavour choice, not the reheating safety target.",
    "湯分裝淺容器，2 小時內冷藏至 4°C/40°F 以下。為保持裙帶菜口感而建議 2 天內食用是品質偏好；FoodSafety.gov 將冷藏湯與燉菜列為 3–4 天。只取所需份量，邊攪拌邊復熱至最冷處達 74°C/165°F。之後離火，加入味噌後不要煮沸；現煮湯的上桌溫度是風味選擇，不是復熱安全標準。",
    "スープを浅い容器に分け、2時間以内に4°C/40°F以下で冷蔵します。わかめの食感のため2日以内を勧めますが、これは品質上の好みです。FoodSafety.govは冷蔵したスープとシチューを3〜4日としています。食べる分だけ混ぜながら再加熱し、最も冷たい部分が74°C/165°Fになるまで温めます。その後火から外し、味噌を加えてから沸騰させません。作りたての提供温度は風味の好みで、再加熱の安全基準ではありません。",
    "수프를 얕은 용기에 나눠 2시간 안에 4°C/40°F 이하로 냉장합니다. 미역 식감을 위한 2일은 품질 기준이며, FoodSafety.gov는 냉장 수프와 스튜를 3–4일로 안내합니다. 먹을 만큼만 저으며 재가열해 가장 차가운 부분이 74°C/165°F에 도달하게 합니다. 이후 불에서 내리고 미소를 넣은 뒤 끓이지 않습니다. 갓 만든 수프의 제공 온도는 풍미 선호이지 재가열 안전 기준이 아닙니다.",
    "แบ่งซุปใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า การกินภายใน 2 วันเพื่อเนื้อสัมผัสของวากาเมะเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุซุปและสตูว์แช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินพร้อมคนจนจุดที่เย็นที่สุดถึง 74°C/165°F จากนั้นยกลงจากเตาและอย่าต้มหลังใส่มิโซะ อุณหภูมิเสิร์ฟของซุปทำใหม่เป็นเรื่องรสชาติ ไม่ใช่เกณฑ์ความปลอดภัยของการอุ่นซ้ำ"
  );
  addSafetySources(recipe);
}

export function refineSixtySeventhMethods(recipes) {
  const targets = ["steak-and-kidney-pie", "erbsensuppe", "salmorejo-cordobes", "miso-soup"];
  const revise = {
    "steak-and-kidney-pie": reviseSteakAndKidneyPie,
    erbsensuppe: reviseErbsensuppe,
    "salmorejo-cordobes": reviseSalmorejo,
    "miso-soup": reviseMisoSoup
  };
  for (const id of targets) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error("Recipe method audit 67: missing recipe " + id);
    const revised = clone(recipes[index]);
    revise[id](revised);
    recipes[index] = revised;
  }
  return recipes;
}
