const ml = (en, zh, ja, ko, th) => ({ en, "zh-hant": zh, ja, ko, th });
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url, publisher = "FoodSafety.gov") {
  const title = "Official food-safety guidance — " + publisher + ": " + label;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function addSafetySources(recipe, { egg = false } = {}) {
  addOfficialSource(recipe, "Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "Cold Food Storage Charts", storageChart);
  if (egg) addOfficialSource(recipe, "What You Need to Know About Egg Safety", eggSafety, "FDA");
}

function reviseKitsuneUdon(recipe) {
  recipe.prepMinutes = 15;
  recipe.cookMinutes = 25;
  recipe.totalMinutes = 40;
  body(recipe, 0, ml(
    "Bring the listed 1 L blanching water to a boil. Add all 240 g aburaage for 30 seconds, drain, cool until safe to handle, and press gently between clean towels to remove surface oil. Keep the separate 150 ml simmering water for the sweet seasoning; do not use the 1 L blanching water in the broth.",
    "將列出的 1 公升汆燙水煮沸，加入全部 240 公克油豆皮汆燙 30 秒後瀝乾，放至可安全拿取，再用乾淨毛巾輕壓吸去表面油分。另留 150 毫升燉煮用水做甜鹹醬汁；汆燙用的 1 公升水不可倒入湯底。",
    "表示した下ゆで用の湯1Lを沸かします。油揚げ240gすべてを30秒ゆでて湯を切り、触れる温度まで冷ましてから清潔な布巾でやさしく押さえ、表面の油を取ります。甘辛煮用の水150mlは別に使い、下ゆで湯1Lはだしに入れません。",
    "표시된 데치기용 물 1L를 끓입니다. 유부 240g 전량을 30초 데쳐 물기를 빼고 안전하게 만질 수 있을 때까지 식힌 뒤 깨끗한 행주로 가볍게 눌러 표면 기름을 제거합니다. 양념 조림용 물 150ml는 따로 두고, 데친 물 1L는 국물에 넣지 않습니다.",
    "ต้มน้ำลวก 1 ลิตรตามรายการ ใส่อะบุระอาเกะ 240 กรัมทั้งหมด ลวก 30 วินาทีแล้วสะเด็ด พักจนจับได้อย่างปลอดภัยและซับน้ำมันผิวเบา ๆ ด้วยผ้าสะอาด แยกน้ำ 150 มล.สำหรับเคี่ยวปรุงรสไว้ต่างหาก ห้ามใช้น้ำลวก 1 ลิตรทำซุป"
  ));
  body(recipe, 1, ml(
    "Put the drained pouches in a small pan with the separate 150 ml water, all 30 ml soy sauce, 30 ml mirin, and 20 g sugar. Simmer gently over medium-low heat for an estimated 10–12 minutes, turning once, until the pouches are tender and most liquid has been absorbed into a light glaze. Keep the pouches covered off heat while you finish the broth.",
    "瀝乾的油豆皮放入小鍋，加入另備的 150 毫升水、全部 30 毫升醬油、30 毫升味醂及 20 公克糖。以中小火輕煮約 10–12 分鐘，中途翻面一次，至豆皮柔軟且大部分湯汁吸收成薄薄的光澤醬汁。離火加蓋保溫，接著完成湯底。",
    "湯を切った油揚げを小鍋に入れ、別に用意した水150ml、しょうゆ30ml、みりん30ml、砂糖20gをすべて加えます。弱めの中火で目安として10〜12分、途中で一度返しながら静かに煮て、油揚げが柔らかくなり煮汁の大半が薄い照りになるまで含ませます。火を止めて蓋をし、だしを仕上げる間保温します。",
    "물기를 뺀 유부를 작은 팬에 넣고 따로 둔 물 150ml, 간장 30ml 전량, 미림 30ml, 설탕 20g을 모두 넣습니다. 중약불에서 약 10–12분 부드럽게 끓이고 중간에 한 번 뒤집어 유부가 부드러워지고 국물이 대부분 흡수되어 얇은 윤기가 돌 때까지 졸입니다. 불을 끄고 덮어 국물을 마칠 동안 따뜻하게 둡니다.",
    "ใส่อะบุระอาเกะที่สะเด็ดแล้วในกระทะเล็ก เติมน้ำ 150 มล.ที่แยกไว้ ซีอิ๊ว 30 มล.ทั้งหมด มิริน 30 มล.และน้ำตาล 20 กรัม เคี่ยวไฟกลางอ่อนประมาณ 10–12 นาที พลิกหนึ่งครั้งจนเต้าหู้นุ่มและน้ำซึมไปเกือบหมดเป็นเงาบาง ๆ ปิดไฟแล้วปิดฝาพักให้อุ่นระหว่างทำซุป"
  ));
  body(recipe, 2, ml(
    "Warm all 1 L unsalted dashi with the 60 ml soy sauce, 45 ml mirin, 10 g sugar, and 2 g salt in a saucepan. Stir until the sugar dissolves and heat until steaming, about 85–90°C; avoid a hard boil so the broth stays clear. Divide the broth into four portions of about 250 ml each. This temperature is a serving-quality guide, not a raw-meat safety endpoint.",
    "將全部 1 公升無鹽高湯、60 毫升醬油、45 毫升味醂、10 公克糖及 2 公克鹽放入湯鍋加熱，攪拌至糖溶解並加熱至冒蒸氣，約 85–90°C；避免大滾以保持湯色清澈。湯底分為四份，每份約 250 毫升。此溫度是上桌品質參考，不是生肉安全熟度標準。",
    "無塩だし1Lすべてに、しょうゆ60ml、みりん45ml、砂糖10g、塩2gを加えて鍋で温めます。砂糖を溶かし、湯気が立つ85〜90°C程度まで加熱します。澄んだつゆにするため強く沸騰させません。だしは約250mlずつ4人分に分けます。この温度は提供時の品質の目安で、生肉の安全加熱温度ではありません。",
    "무염 다시 1L 전량에 간장 60ml, 미림 45ml, 설탕 10g, 소금 2g을 넣어 냄비에서 데웁니다. 설탕을 녹이고 김이 나는 약 85–90°C까지 데우되 국물이 맑도록 세게 끓이지 않습니다. 국물을 약 250ml씩 네 몫으로 나눕니다. 이 온도는 제공 품질 기준이며 생고기의 안전 조리 온도가 아닙니다.",
    "อุ่นดาชิไม่เค็ม 1 ลิตรทั้งหมดกับซีอิ๊ว 60 มล. มิริน 45 มล. น้ำตาล 10 กรัม และเกลือ 2 กรัม คนให้น้ำตาลละลายและอุ่นจนมีไอประมาณ 85–90°C อย่าให้เดือดแรงเพื่อคงน้ำซุปให้ใส แบ่งซุปประมาณ 250 มล.ต่อ 4 ที่ อุณหภูมินี้เป็นแนวทางคุณภาพขณะเสิร์ฟ ไม่ใช่อุณหภูมิความปลอดภัยสำหรับเนื้อดิบ"
  ));
  body(recipe, 3, ml(
    "Bring the separate 2 L noodle water to a boil. Cook the four 200 g frozen udon portions according to the package; 2–3 minutes is a starting estimate for frozen blocks. They are ready when fully hot, smooth, and springy. Drain thoroughly so excess water does not dilute the dashi. Package directions and texture, not the estimate, determine the noodle time.",
    "另將 2 公升煮麵水煮沸。四份冷凍烏龍麵每份 200 公克，依包裝指示烹煮；冷凍麵塊可先以 2–3 分鐘估算。麵條完全熱透、滑順且有彈性即可，充分瀝乾以免多餘水分稀釋高湯。實際時間依產品包裝及口感判斷，估時不是安全標準。",
    "別鍋で麺用の水2Lを沸騰させます。冷凍うどん4玉、各200gを袋の表示どおりにゆでます。冷凍麺は2〜3分を開始目安とし、全体が熱く、なめらかで弾力が出たら湯を切ります。だしが薄まらないよう水気をしっかり切ります。実際の時間は表示と麺の状態に従い、目安の時間を安全基準とはしません。",
    "별도의 면 삶는 물 2L를 끓입니다. 냉동 우동 네 봉지(각 200g)는 포장 지침에 따라 익힙니다. 냉동 면은 2–3분을 시작 추정치로 삼고 전체가 뜨겁고 매끈하며 탄력이 있으면 건집니다. 여분의 물이 다시를 묽게 하지 않도록 충분히 물기를 뺍니다. 실제 시간은 포장 표시와 면 상태를 따르며 추정 시간은 안전 기준이 아닙니다.",
    "ต้มน้ำต้มเส้น 2 ลิตรแยกต่างหาก ต้มอุด้งแช่แข็ง 4 ส่วน ส่วนละ 200 กรัมตามฉลาก ใช้ 2–3 นาทีเป็นค่าเริ่มต้นสำหรับก้อนแช่แข็ง ตรวจให้ร้อนทั่ว ลื่นและเด้ง แล้วสะเด็ดให้ดีเพื่อไม่ให้น้ำส่วนเกินทำให้ดาชิจืด เวลาจริงให้ยึดฉลากและสภาพเส้น ไม่ใช้เวลาโดยประมาณเป็นเกณฑ์ความปลอดภัย"
  ));
  body(recipe, 4, ml(
    "Slice all 80 g ready-to-eat narutomaki into thin rounds and cut all 40 g scallions into fine rings. Check the fish-cake package and follow its serving directions; do not treat prepared narutomaki as raw fish. Keep the 40 g tenkasu dry and separate. Divide each topping into four equal piles: about 20 g fish cake, 10 g scallions, and 10 g tenkasu per bowl.",
    "將可即食的 80 公克鳴門卷切成薄片，40 公克青蔥切細圈。依魚板包裝的食用說明操作；已製作完成的鳴門卷不可當作生魚處理。40 公克天婦羅酥屑保持乾燥並分開放。每種配料各分成四份：每碗約 20 公克魚板、10 公克青蔥、10 公克酥屑。",
    "そのまま食べられるなると巻80gを薄切りにし、ねぎ40gを細い小口切りにします。かまぼこの袋に食べ方の指示があれば従い、加工済みのなると巻を生魚として扱わないでください。天かす40gは乾燥したまま別にしておきます。具は4等分し、1杯あたり魚肉練り製品約20g、ねぎ10g、天かす10gです。",
    "바로 먹을 수 있는 나루토마키 80g을 얇게 썰고 대파 40g은 가늘게 썹니다. 어묵 포장에 섭취 지침이 있으면 따르며, 가공된 나루토마키를 생선회처럼 다루지 않습니다. 덴카스 40g은 마른 채 따로 둡니다. 각 고명을 네 등분해 그릇마다 어묵 약 20g, 대파 10g, 덴카스 10g씩 준비합니다.",
    "หั่นนารูโตะมากิพร้อมกิน 80 กรัมเป็นแว่นบางและซอยต้นหอม 40 กรัมเป็นวงเล็ก ตรวจฉลากลูกชิ้นปลาและทำตามวิธีเสิร์ฟ ไม่ถือว่านารูโตะมากิที่ปรุงแล้วเป็นปลาดิบ แยกเท็นคาสุ 40 กรัมให้แห้ง แบ่งเครื่องแต่ละชนิดเป็น 4 ส่วน ที่ละลูกชิ้นปลาประมาณ 20 กรัม ต้นหอม 10 กรัม และเท็นคาสุ 10 กรัม"
  ));
  body(recipe, 5, ml(
    "Set out four warmed bowls. Divide the drained udon evenly, one 200 g frozen portion per bowl, then pour about 250 ml hot broth into each. Keep noodles and broth separate until this point so the noodles stay springy and the measured broth is not lost in the pot.",
    "備好四個溫熱的碗，平均分入瀝乾的烏龍麵，每碗對應一份 200 公克冷凍麵，再各倒入約 250 毫升熱湯。到這一步才將麵與湯合併，能保留麵條彈性，也可確保湯底平均分配。",
    "温めた器を4つ用意します。湯を切ったうどんを均等に盛り、1杯に冷凍麺1玉分の200gを入れて、熱いつゆを約250mlずつ注ぎます。ここで初めて麺とつゆを合わせると、麺の弾力を保ち、つゆも均等に分けられます。",
    "따뜻하게 데운 그릇 네 개를 준비합니다. 물기를 뺀 우동을 고르게 담고 한 그릇에 냉동 면 한 몫인 200g씩 넣은 뒤 뜨거운 국물을 약 250ml씩 붓습니다. 이때 면과 국물을 합쳐야 면의 탄력을 유지하고 국물도 고르게 나눌 수 있습니다.",
    "เตรียมชามอุ่น 4 ใบ แบ่งอุด้งที่สะเด็ดแล้วเท่า ๆ กัน ชามละเทียบเท่าเส้นแช่แข็ง 200 กรัมหนึ่งส่วน แล้วเติมซุปร้อนประมาณ 250 มล.ต่อชาม ค่อยรวมเส้นกับซุปในขั้นนี้เพื่อให้เส้นยังเด้งและแบ่งซุปได้เท่ากัน"
  ));
  body(recipe, 6, ml(
    "Top each bowl with one quarter of the simmered tofu pouches (about 60 g), 20 g fish cake, 10 g scallions, and 10 g tenkasu. Use all the listed toppings, but add the tenkasu last so it stays crisp. Use clean utensils for the ready-to-eat toppings.",
    "每碗放入燉煮豆皮的四分之一（約 60 公克）、20 公克魚板、10 公克青蔥和 10 公克天婦羅酥屑。配料全部用完；酥屑最後才放，以保持酥脆。處理可即食配料時使用乾淨器具。",
    "煮含めた油揚げを4等分し、1杯に約60gずつのせます。かまぼこ20g、ねぎ10g、天かす10gも各杯に分け、具をすべて使い切ります。天かすは食感を保つため最後に加え、そのまま食べる具には清潔な器具を使います。",
    "조린 유부를 네 등분해 그릇마다 약 60g씩 올립니다. 어묵 20g, 대파 10g, 덴카스 10g도 그릇마다 나누어 고명을 모두 사용합니다. 바삭함을 위해 덴카스는 마지막에 올리고 바로 먹는 고명은 깨끗한 도구로 다룹니다.",
    "แบ่งอะบุระอาเกะที่เคี่ยวแล้วเป็น 4 ส่วน ชามละประมาณ 60 กรัม เติมลูกชิ้นปลา 20 กรัม ต้นหอม 10 กรัม และเท็นคาสุ 10 กรัมต่อชาม ใช้เครื่องที่เตรียมไว้ทั้งหมด ใส่เท็นคาสุเป็นอย่างสุดท้ายเพื่อคงความกรอบ และใช้ช้อนส้อมสะอาดกับเครื่องที่พร้อมกิน"
  ));
  body(recipe, 7, ml(
    "Serve immediately while the broth is steaming, ideally around 70–75°C at the table. The springy noodles, tender tofu, clear broth, and crisp tenkasu are quality cues. The serving temperature and estimated noodle time do not replace food-safety guidance; reheat refrigerated leftovers throughout to 74°C/165°F.",
    "趁湯底冒蒸氣時立即上桌，碗中約 70–75°C 是較理想的食用溫度。麵條有彈性、豆皮柔軟、湯底清澈、酥屑酥脆都是品質指標。上桌溫度與估計煮麵時間不取代食安指引；冷藏剩菜復熱時須使各處達 74°C/165°F。",
    "つゆから湯気が立つうちにすぐ出します。食卓で70〜75°C程度が食べやすい温度の目安です。麺の弾力、油揚げの柔らかさ、澄んだつゆ、天かすの歯ごたえは品質の目安です。提供温度や麺のゆで時間は安全基準の代わりにはなりません。冷蔵した残り物は全体を74°C/165°Fまで再加熱します。",
    "국물에서 김이 날 때 바로 내며, 식탁에서 약 70–75°C가 먹기 좋은 온도 기준입니다. 면의 탄력, 유부의 부드러움, 맑은 국물, 덴카스의 바삭함은 품질 기준입니다. 제공 온도와 면 조리 시간은 식품 안전 기준을 대신하지 않습니다. 냉장한 남은 음식은 전체가 74°C/165°F가 되도록 다시 데웁니다.",
    "เสิร์ฟทันทีขณะซุปยังมีไอ อุณหภูมิประมาณ 70–75°C ที่โต๊ะเป็นช่วงที่กินอร่อย เส้นเด้ง เต้าหู้นุ่ม น้ำซุปใสและเท็นคาสุกรอบเป็นเกณฑ์คุณภาพ อุณหภูมิเสิร์ฟและเวลาต้มโดยประมาณไม่ใช้แทนแนวทางความปลอดภัย หากเก็บเหลือให้อุ่นทั่วถึงจนได้ 74°C/165°F"
  ));
  recipe.storage = ml(
    "For best texture, keep the noodles, broth, simmered tofu, and toppings separate. Refrigerate perishable cooked components in shallow covered containers within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or below. FoodSafety.gov lists 3–4 days for soup and stew leftovers; using udon by the next day is this site's texture preference, not a safety limit. Reheat leftover broth, tofu, and noodles separately until each reaches 74°C/165°F throughout, then assemble. Follow the narutomaki package directions and add tenkasu at serving; do not reheat it.",
    "為保留最佳口感，麵、湯底、燉豆皮及配料分開保存。易腐熟食須在 2 小時內（環境高於 32°C/90°F 時 1 小時內）放入淺而有蓋的容器，冷藏於 4°C/40°F 以下。FoodSafety.gov 對湯與燉菜剩菜的建議保存期為 3–4 天；隔日內用完烏龍麵是本網站的口感偏好，不是安全期限。湯底、豆皮及麵條分開復熱，並確認每樣各處均達 74°C/165°F，再組合。魚板依包裝指示保存；天婦羅酥屑上桌前再加，不要復熱。",
    "食感を保つため、麺、つゆ、煮た油揚げ、薬味を分けて保存します。傷みやすい加熱済み食品は、室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に、浅く蓋のできる容器に入れて4°C以下で冷蔵します。FoodSafety.govはスープや煮込み料理の残りを3〜4日としています。うどんを翌日までに使うのは食感のための当サイトの推奨で、安全期限ではありません。残ったつゆ、油揚げ、麺は別々に再加熱し、それぞれ全体を74°C/165°Fまで温めてから盛ります。なるとは包装表示に従い、天かすは提供時に加えて再加熱しません。",
    "식감을 위해 면, 국물, 조린 유부와 고명을 따로 보관합니다. 상하기 쉬운 조리 음식은 실내가 32°C보다 더우면 1시간 안에, 그 외에는 2시간 안에 얕고 뚜껑 있는 용기에 담아 4°C 이하로 냉장합니다. FoodSafety.gov는 수프와 스튜 남은 음식의 보관 기간을 3–4일로 안내합니다. 우동을 다음 날까지 먹으라는 것은 이 사이트의 식감 권장사항이지 안전 기한이 아닙니다. 남은 국물, 유부와 면은 따로 데워 각각 전체가 74°C/165°F에 도달하게 한 뒤 담습니다. 나루토마키는 포장 지침을 따르고 덴카스는 낼 때 넣으며 다시 데우지 않습니다.",
    "เพื่อคงเนื้อสัมผัสให้เก็บเส้น ซุป อะบุระอาเกะที่เคี่ยว และเครื่องแยกกัน อาหารสุกที่เสียง่ายให้ใส่ภาชนะตื้นมีฝาและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F FoodSafety.gov แนะนำให้อาหารเหลือประเภทซุปและสตูว์เก็บ 3–4 วัน การใช้เส้นอุด้งภายในวันถัดไปเป็นคำแนะนำด้านเนื้อสัมผัสของเว็บไซต์ ไม่ใช่กำหนดความปลอดภัย อุ่นซุป เต้าหู้และเส้นที่เหลือแยกกันจนแต่ละอย่างถึง 74°C/165°F ทั่วถึง แล้วจึงจัดชาม ทำตามฉลากนารูโตะมากิและใส่เท็นคาสุตอนเสิร์ฟโดยไม่อุ่นซ้ำ"
  );
  addSafetySources(recipe);
}

function reviseVadaPav(recipe) {
  recipe.prepMinutes = 40;
  recipe.cookMinutes = 60;
  recipe.totalMinutes = 100;
  if (!recipe.ingredients.some((row) => row.item.en === "water, for boiling potatoes")) {
    recipe.ingredients.push({
      amount: ml("2 L", "2 公升", "2L", "2L", "2 ลิตร"),
      item: ml("water, for boiling potatoes", "煮馬鈴薯用水", "じゃがいもをゆでる水", "감자 삶는 물", "น้ำสำหรับต้มมันฝรั่ง")
    });
  }
  body(recipe, 0, ml(
    "Scrub the 800 g potatoes and place them whole in a saucepan with the listed 2 L water, adding enough extra tap water only if needed to cover them by about 3 cm. Bring to a boil, then simmer for an estimated 20–25 minutes until a knife slides through the largest potato with little resistance. Drain and leave uncovered for 10 minutes so surface steam escapes; this dry texture helps the filling hold together.",
    "刷洗全部 800 公克馬鈴薯，整顆放入鍋中並加入列出的 2 公升水；若未淹過馬鈴薯約 3 公分，再補足自來水。煮沸後轉小火，估計煮 20–25 分鐘，直到刀尖幾乎不費力即可刺穿最大顆。瀝乾後不加蓋靜置 10 分鐘散去表面蒸氣，較乾的口感能讓內餡成形。",
    "じゃがいも800gを洗い、丸ごと鍋に入れて表示した水2Lを注ぎます。じゃがいもが水面から約3cm下になるよう、足りなければ水道水を足します。沸騰したら弱火にし、目安として20〜25分ゆで、最も大きな芋にナイフがほとんど抵抗なく入るまで加熱します。湯を切り、蓋をせず10分置いて表面の蒸気を飛ばします。水っぽくない方が具をまとめやすくなります。",
    "감자 800g을 씻어 통째로 냄비에 넣고 표시된 물 2L를 붓습니다. 감자 위로 물이 약 3cm 올라오지 않으면 수돗물을 더합니다. 끓으면 불을 낮춰 약 20–25분 삶아 가장 큰 감자에 칼이 거의 저항 없이 들어갈 때까지 익힙니다. 물을 버리고 뚜껑을 열어 10분 두어 겉의 수증기를 날립니다. 표면이 덜 젖어야 속이 잘 뭉칩니다.",
    "ขัดมันฝรั่ง 800 กรัมแล้วใส่ทั้งหัวในหม้อ เติมน้ำ 2 ลิตรตามรายการ หากน้ำไม่ท่วมเหนือหัวประมาณ 3 ซม.ให้เติมน้ำประปาเพิ่ม ต้มจนเดือดแล้วลดไฟเคี่ยวประมาณ 20–25 นาทีจนมีดแทงหัวใหญ่สุดได้แทบไม่ติด สะเด็ดน้ำและพักเปิดฝา 10 นาทีให้ไอน้ำผิวออก เนื้อที่ไม่แฉะจะช่วยให้ไส้จับตัว"
  ));
  body(recipe, 1, ml(
    "Peel the drained potatoes while warm and crush them into coarse 1–2 cm pieces; do not puree. Heat all 30 ml filling oil over medium heat. Add all 4 g mustard seeds and wait until they pop, then add all 12 curry leaves and 20 g ginger-garlic-green-chile paste; stir for 45 seconds. Add all 3 g turmeric, 6 g of the 10 g salt, the potatoes, and all 25 g cilantro. Cook and fold for 3–4 minutes until the filling is cohesive and no liquid pools in the pan.",
    "馬鈴薯瀝乾後趁溫熱去皮，壓成粗略 1–2 公分的小塊，不要打成泥。中火加熱全部 30 毫升內餡用油，加入全部 4 公克芥末籽，待籽爆開後加入全部 12 片咖哩葉和 20 公克薑蒜辣椒醬，炒 45 秒。加入全部 3 公克薑黃粉、10 公克鹽中的 6 公克、馬鈴薯及全部 25 公克香菜，拌炒 3–4 分鐘至內餡黏合且鍋底沒有積液。",
    "湯を切ったじゃがいもは温かいうちに皮をむき、1〜2cmほどの粗いかたまりにつぶします。ペースト状にはしません。中火でフィリング用油30mlすべてを熱し、マスタードシード4gすべてを加え、はじけたらカレーリーフ12枚とジンジャー・ガーリック・青唐辛子ペースト20gを加えて45秒炒めます。ターメリック3g、塩10gのうち6g、じゃがいも、香菜25gすべてを加え、3〜4分混ぜ合わせ、鍋底に水分がたまらずまとまるまで炒めます。",
    "물기를 뺀 감자는 따뜻할 때 껍질을 벗겨 1–2cm 크기로 굵게 으깨고 퓌레로 만들지 않습니다. 중불에서 속 재료용 기름 30ml 전량을 달굽니다. 겨자씨 4g을 모두 넣어 톡톡 튀면 카레잎 12장과 생강-마늘-풋고추 페이스트 20g을 넣고 45초 볶습니다. 강황 3g, 소금 10g 중 6g, 감자와 고수 25g 전량을 넣고 3–4분 섞어 팬 바닥에 물기가 고이지 않고 속이 뭉칠 때까지 볶습니다.",
    "ปอกมันฝรั่งที่สะเด็ดน้ำขณะยังอุ่น บดหยาบเป็นชิ้น 1–2 ซม. อย่าบดเป็นเนื้อเนียน ตั้งน้ำมันสำหรับไส้ 30 มล.ทั้งหมดด้วยไฟกลาง ใส่เมล็ดมัสตาร์ด 4 กรัมทั้งหมด รอจนแตกป๊อปแล้วใส่ใบแกง 12 ใบกับเครื่องขิง-กระเทียม-พริก 20 กรัม ผัด 45 วินาที ใส่ขมิ้น 3 กรัม เกลือ 6 กรัมจากทั้งหมด 10 กรัม มันฝรั่ง และผักชี 25 กรัมทั้งหมด ผัดคลุก 3–4 นาทีจนไส้เกาะตัวและไม่มีน้ำขังในกระทะ"
  ));
  body(recipe, 2, ml(
    "Spread the filling no deeper than 2.5 cm on a clean shallow tray and cool for about 20–30 minutes, until easy to shape. Divide into eight equal portions and roll each into a compact 5–6 cm ball. If you will not batter and fry them within 2 hours, cover and refrigerate at 4°C/40°F or below; if the room is above 32°C/90°F, refrigerate within 1 hour. A chilled portion will be reheated during frying, so its centre must later reach 74°C/165°F.",
    "將內餡鋪在乾淨淺盤中，厚度不超過 2.5 公分，放涼約 20–30 分鐘至容易塑形。平均分成八份，每份揉成直徑 5–6 公分的球。若無法在 2 小時內裹漿油炸，請加蓋冷藏於 4°C/40°F 以下；環境高於 32°C/90°F 時須在 1 小時內冷藏。冷藏過的內餡接下來屬於復熱，油炸後中心須達 74°C/165°F。",
    "清潔な浅いトレーにフィリングを厚さ2.5cm以下に広げ、成形しやすくなるまで20〜30分ほど冷まします。8等分し、直径5〜6cmのボールにまとめます。2時間以内に衣を付けて揚げない場合は蓋をして4°C以下で冷蔵します。室温が32°Cを超える場合は1時間以内に冷蔵します。冷蔵したフィリングは揚げるときに再加熱するため、仕上がり時に中心を74°C/165°Fまで温めます。",
    "깨끗하고 얕은 쟁반에 속을 2.5cm보다 두껍지 않게 펴고 빚기 쉬워질 때까지 약 20–30분 식힙니다. 여덟 등분해 각각 지름 5–6cm 공 모양으로 뭉칩니다. 2시간 안에 튀기지 않을 경우 덮어 4°C 이하로 냉장합니다. 실내가 32°C보다 더우면 1시간 안에 냉장합니다. 냉장한 속은 튀기는 동안 다시 데우는 것이므로 완성 시 중심이 74°C/165°F에 도달해야 합니다.",
    "เกลี่ยไส้ในถาดตื้นสะอาดให้หนาไม่เกิน 2.5 ซม. พักประมาณ 20–30 นาทีจนปั้นง่าย แบ่งเป็น 8 ส่วนเท่ากัน ปั้นแต่ละส่วนเป็นก้อนเส้นผ่านศูนย์กลาง 5–6 ซม. หากยังไม่ชุบแป้งและทอดภายใน 2 ชั่วโมง ให้ปิดฝาแช่เย็นที่ 4°C/40°F หรือต่ำกว่า หรือภายใน 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F ไส้ที่แช่เย็นจะถูกอุ่นซ้ำขณะทอด จึงต้องให้ใจกลางถึง 74°C/165°F"
  ));
  body(recipe, 3, ml(
    "Whisk all 220 g besan, 25 g rice flour, 3 g Kashmiri chile powder, and the remaining 4 g salt in a bowl. Stir in 260 ml cold water and rest 10 minutes to hydrate the flour. Add the remaining water from the listed 260–300 ml in 10 ml increments only until a thick, smooth batter coats the back of a spoon; stop before it runs off in a thin sheet.",
    "碗中混合全部 220 公克鷹嘴豆粉、25 公克米粉、3 公克喀什米爾辣椒粉及剩下 4 公克鹽。先拌入 260 毫升冷水，靜置 10 分鐘讓粉類吸水。若仍太稠，再從列出的 260–300 毫升總量中每次加 10 毫升，直到濃稠滑順、能裹住湯匙背面；不要稀到漿液成薄片流下。",
    "ボウルにひよこ豆粉220g、米粉25g、カシミールチリパウダー3g、残りの塩4gをすべて入れて混ぜます。冷水260mlを加えて混ぜ、粉に水分がなじむまで10分休ませます。衣が厚すぎる場合のみ、表示した水量260〜300mlの範囲で10mlずつ足し、スプーンの背を覆う滑らかな濃さにします。薄く流れ落ちる前に止めます。",
    "그릇에 병아리콩가루 220g, 쌀가루 25g, 카슈미르 고춧가루 3g, 남은 소금 4g을 모두 넣고 섞습니다. 찬물 260ml를 넣고 가루가 수분을 흡수하도록 10분 둡니다. 반죽이 너무 되면 표시된 총량 260–300ml 범위에서 10ml씩만 더해 숟가락 뒷면을 덮는 걸쭉하고 매끈한 농도로 맞춥니다. 얇게 흘러내리기 전에 멈춥니다.",
    "ผสมแป้งเบซัน 220 กรัม แป้งข้าว 25 กรัม ผงพริกแคชเมียร์ 3 กรัม และเกลือที่เหลือ 4 กรัมทั้งหมดในชาม เติมน้ำเย็น 260 มล. คนและพัก 10 นาทีให้แป้งดูดน้ำ หากยังข้นเกินไปค่อยเติมจากปริมาณรวม 260–300 มล.ครั้งละ 10 มล.จนแป้งข้นเนียนเคลือบหลังช้อนได้ หยุดก่อนที่แป้งจะไหลเป็นแผ่นบาง"
  ));
  body(recipe, 4, ml(
    "Pour all 1.5 L frying oil into a deep, heavy 16–18 cm saucepan, leaving the pot no more than half full. Heat to 170°C and set a rack over a tray. Keep the oil between 165–175°C during frying; this range controls browning and crispness, not food safety. Let the oil return to 170°C between batches.",
    "將全部 1.5 公升炸油倒入厚重深鍋，油面不可超過鍋身一半。加熱至 170°C，另在烤盤上架好瀝油網。油炸期間保持 165–175°C，以控制上色與酥脆度；這是品質範圍，不是食安熟度標準。每批之間等油溫回到 170°C 再下鍋。",
    "揚げ油1.5Lすべてを厚手の深鍋（直径16〜18cm）に入れ、鍋の半分以上にならないようにします。170°Cまで熱し、トレーに網を置きます。揚げている間は165〜175°Cを保ちます。これは色づきと食感のための温度で、安全基準ではありません。次のバッチの前に油温を170°Cへ戻します。",
    "튀김용 기름 1.5L 전량을 바닥이 두꺼운 깊은 16–18cm 냄비에 붓고 기름이 냄비 절반을 넘지 않게 합니다. 170°C까지 데우고 쟁반 위에 망을 올립니다. 튀기는 동안 165–175°C를 유지합니다. 이는 색과 바삭함을 위한 품질 범위이지 식품 안전 기준이 아닙니다. 다음 묶음을 넣기 전에 기름이 170°C로 돌아오게 합니다.",
    "เทน้ำมันทอด 1.5 ลิตรทั้งหมดในหม้อก้นหนาลึกเส้นผ่านศูนย์กลาง 16–18 ซม. อย่าเติมน้ำมันเกินครึ่งหม้อ ตั้งให้ถึง 170°C และวางตะแกรงเหนือถาด รักษาน้ำมันที่ 165–175°C ระหว่างทอด ช่วงนี้ควบคุมสีและความกรอบ ไม่ใช่เกณฑ์ความปลอดภัย รอให้น้ำมันกลับถึง 170°C ก่อนทอดชุดถัดไป"
  ));
  body(recipe, 5, ml(
    "Dip two potato balls at a time in the batter, turn to coat every side, lift with a spoon, and let excess drip for 3 seconds. Lower them carefully into the oil and fry in four batches of two for an estimated 4–5 minutes each, turning once, until the coating is set, crisp, and deep gold. If the formed filling was refrigerated, check the largest centre with a clean thermometer and continue frying until it reaches 74°C/165°F; otherwise, use the crust and hot-centre cues for quality. Time and colour alone do not prove reheating temperature.",
    "每次取兩顆馬鈴薯球裹漿，翻動使各面沾滿，提起後用湯匙瀝掉多餘麵漿 3 秒。小心放入油鍋，分四批、每批兩顆估計炸 4–5 分鐘，中途翻面一次，直到外皮定型、酥脆且呈深金色。若成形內餡曾冷藏，使用乾淨溫度計測量最大顆中心，繼續油炸至 74°C/165°F；若未冷藏，外皮酥脆及中心熱透是品質判斷。單靠時間與顏色無法證明復熱溫度。",
    "じゃがいもボールを2個ずつ衣にくぐらせ、全体に付けます。スプーンで持ち上げて3秒余分な衣を落とします。油へ静かに入れ、2個ずつ4回に分けて、片面だけでなく途中で返しながら各4〜5分を目安に揚げます。衣が固まり、カリッとして濃いきつね色になったら引き上げます。成形した具を冷蔵していた場合は、最大のボールの中心を清潔な温度計で測り、74°C/165°Fまで揚げます。冷蔵していない場合は、衣と中心の熱さを品質の目安にします。時間や色だけでは再加熱温度を確認できません。",
    "감자 공을 한 번에 두 개씩 반죽에 담가 모든 면을 입힙니다. 숟가락으로 들어 올려 여분의 반죽을 3초 떨어뜨립니다. 기름에 조심히 넣고 두 개씩 네 번 나누어 한 번 뒤집으며 약 4–5분씩 튀겨 겉옷이 굳고 바삭하며 짙은 금색이 되면 건집니다. 빚은 속을 냉장했다면 가장 큰 공의 중심을 깨끗한 온도계로 재고 74°C/165°F에 이를 때까지 계속 튀깁니다. 냉장하지 않았다면 바삭한 겉옷과 뜨거운 중심은 품질 기준입니다. 시간과 색만으로 재가열 온도를 확인할 수 없습니다.",
    "ชุบลูกมันฝรั่งครั้งละ 2 ลูก พลิกให้เคลือบทุกด้าน ยกด้วยช้อนและพักให้แป้งส่วนเกินหยด 3 วินาที ค่อย ๆ หย่อนลงน้ำมัน ทอด 4 ชุด ชุดละ 2 ลูก ประมาณ 4–5 นาที พลิกหนึ่งครั้งจนแป้งเซ็ต กรอบและสีทองเข้ม หากไส้ที่ปั้นไว้เคยแช่เย็น ให้ใช้เทอร์โมมิเตอร์สะอาดวัดใจกลางลูกใหญ่สุดและทอดต่อจนถึง 74°C/165°F หากไม่ได้แช่เย็นให้ใช้ความกรอบและใจกลางที่ร้อนเป็นเกณฑ์คุณภาพ เวลาและสีเพียงอย่างเดียวไม่ยืนยันอุณหภูมิการอุ่นซ้ำ"
  ));
  body(recipe, 6, ml(
    "Split all eight pav rolls almost through, leaving a hinge. If using the optional 15 g butter, divide it thinly over the eight rolls; otherwise use a dry pan. Warm cut-side down over medium-low heat for 30–45 seconds until just flexible and lightly toasted, not crisp. Keep the warmed rolls covered in a clean towel while finishing the batches.",
    "將全部八個 pav 麵包幾乎切開但保留一側相連。若使用可選的 15 公克奶油，薄薄分塗在八個麵包上；也可用乾鍋。以中小火將切面朝下加熱 30–45 秒，至柔軟可彎且略上色，不要烤脆。其他批次完成前，將熱麵包以乾淨毛巾覆蓋保溫。",
    "pavロール8個すべてに、片側を残して切り込みを入れます。好みでバター15gを8個に薄く塗るか、油を引かないフライパンを使います。弱めの中火で切り口を下にし、柔らかく少し焼き色がつくまで30〜45秒温めます。カリカリにしません。揚げ終わるまで清潔な布巾で覆っておきます。",
    "파브 롤 여덟 개를 한쪽이 붙어 있도록 거의 끝까지 가릅니다. 선택 재료인 버터 15g을 쓴다면 여덟 개에 얇게 나눠 바르고, 아니면 마른 팬을 사용합니다. 중약불에서 자른 면을 아래로 해 30–45초 부드럽고 살짝 구워지되 바삭해지지 않을 때까지 데웁니다. 나머지 튀김을 마칠 동안 깨끗한 행주로 덮어 둡니다.",
    "ผ่าโรล pav ทั้ง 8 ชิ้นเกือบขาดแต่ให้ยังติดกันด้านหนึ่ง หากใช้เนย 15 กรัมที่เป็นตัวเลือกให้ทาบาง ๆ ให้ทั่วทั้ง 8 ชิ้น หรือใช้กระทะแห้ง อุ่นด้านที่ผ่าลงบนกระทะไฟกลางอ่อน 30–45 วินาทีจนยังนุ่มและมีรอยปิ้งเล็กน้อย ไม่กรอบ คลุมโรลด้วยผ้าสะอาดระหว่างทอดชุดที่เหลือ"
  ));
  body(recipe, 7, ml(
    "For eight sandwiches, spread 15 g dry garlic chutney and 15 g green cilantro chutney inside each pav, using all 120 g of each chutney. Put one hot vada in each roll, close gently, and serve at once before steam softens the crust. The vada portion is one of eight equal potato balls; no extra fried chile or garnish is included in this recipe.",
    "製作八份：每個 pav 內各抹 15 公克乾蒜辣椒醬與 15 公克香菜青醬，兩種醬料各用完 120 公克。每個麵包放入一顆熱 vada，輕輕闔起並立即上桌，避免蒸氣讓外皮變軟。每份使用八顆馬鈴薯球之一；本食譜不含額外炸辣椒或其他裝飾。",
    "8人分として、各pavにドライガーリックチャツネ15g、コリアンダーチャツネ15gを塗り、それぞれ120gすべてを使い切ります。温かいバタタ・バーダーを1個ずつ挟み、軽く閉じ、蒸気で衣が柔らかくなる前にすぐ出します。1人分は8等分したじゃがいもボール1個です。このレシピに追加の青唐辛子や飾りは含まれません。",
    "여덟 개 샌드위치에 각 파브 안쪽으로 마른 마늘 처트니 15g과 고수 처트니 15g씩 바릅니다. 두 처트니 120g씩 전량을 사용합니다. 뜨거운 바다타 바다 한 개씩 넣고 부드럽게 닫은 뒤 김 때문에 튀김옷이 눅눅해지기 전에 바로 냅니다. 1인분은 감자 공 여덟 개 중 하나이며 이 레시피에는 별도의 고추 튀김이나 장식이 포함되지 않습니다.",
    "สำหรับ 8 ชิ้น ทาชัตนีย์กระเทียมแห้ง 15 กรัมและชัตนีย์ผักชี 15 กรัมด้านใน pav แต่ละชิ้น ใช้ชัตนีย์ทั้งสองอย่างอย่างละ 120 กรัมทั้งหมด ใส่วาดาร้อนชิ้นละหนึ่งลูก ประกบเบา ๆ แล้วเสิร์ฟทันที ก่อนที่ไอน้ำจะทำให้แป้งนุ่ม หนึ่งที่คือมันฝรั่งหนึ่งลูกจาก 8 ลูก ไม่มีพริกทอดหรือของตกแต่งเพิ่มเติมในสูตรนี้"
  ));
  recipe.storage = ml(
    "For crispness, fry and assemble just before serving; refrigerate unassembled cooked vadas and perishable chutneys separately in shallow covered containers within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or below. Using vadas within 2 days is this site's crispness preference, not a cited safety shelf-life. Reheat only the vadas you need in a 190°C oven for an estimated 8–10 minutes, checking the largest centre reaches 74°C/165°F. The oven time is a quality estimate, not the safety check. Keep bread and chutneys chilled and follow package directions after opening; do not store assembled pav, which becomes soggy.",
    "為保持酥脆，建議現炸現組裝；未組裝的熟 vada 與易腐青醬分別放入淺而有蓋的容器，2 小時內（環境高於 32°C/90°F 時 1 小時內）冷藏於 4°C/40°F 以下。兩天內食用是本網站的酥脆度偏好，並非引用的食安保存期限。只取所需份量，以 190°C 烤箱估計加熱 8–10 分鐘，並確認最大顆中心達 74°C/165°F。烤箱時間是品質估計，不是安全檢查。麵包與醬料冷藏並依開封後包裝指示保存；組裝好的 pav 會變濕軟，不宜留存。",
    "カリッと仕上げるには食べる直前に揚げて組み立てます。揚げたバーダーと傷みやすいチャツネは組み立てずに別々の浅い蓋付き容器に入れ、室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に4°C以下で冷蔵します。2日以内に使うのは食感のための当サイトの推奨で、引用した安全上の保存期間ではありません。必要な分だけ190°Cのオーブンで目安として8〜10分温め、最大のものの中心を74°C/165°Fにします。時間は品質の目安で、安全確認は温度で行います。パンとチャツネも冷蔵し、開封後は包装表示に従います。組み立てたpavは湿るため保存しません。",
    "바삭함을 위해 먹기 직전에 튀기고 조립합니다. 조리한 바다와 상하기 쉬운 처트니는 조립하지 않은 채 얕고 뚜껑 있는 용기에 따로 담아 실내가 32°C보다 더우면 1시간 안에, 그 외에는 2시간 안에 4°C 이하로 냉장합니다. 바다를 2일 안에 먹으라는 것은 이 사이트의 바삭함 권장사항이지 인용된 안전 보관 기간은 아닙니다. 필요한 바다만 190°C 오븐에서 약 8–10분 데우고 가장 큰 것의 중심이 74°C/165°F에 도달하는지 확인합니다. 오븐 시간은 품질 추정치이고 안전 확인은 온도로 합니다. 빵과 처트니도 냉장하고 개봉 후 포장 지침을 따릅니다. 조립한 파브는 눅눅해지므로 보관하지 않습니다.",
    "เพื่อให้กรอบควรทอดและประกอบก่อนเสิร์ฟ เก็บวาดาที่ปรุงแล้วและชัตนีย์ที่เสียง่ายแยกกันในภาชนะตื้นมีฝาภายใน 2 ชั่วโมง หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F และแช่ที่ 4°C/40°F หรือต่ำกว่า การกินวาดาภายใน 2 วันเป็นคำแนะนำด้านความกรอบของเว็บไซต์ ไม่ใช่อายุความปลอดภัยที่อ้างจากแหล่งทางการ อุ่นเฉพาะวาดาที่ต้องการในเตา 190°C ประมาณ 8–10 นาที และตรวจใจกลางชิ้นใหญ่สุดให้ถึง 74°C/165°F เวลาอบเป็นค่าประมาณด้านคุณภาพ ไม่ใช่การตรวจความปลอดภัย เก็บขนมปังและชัตนีย์ในตู้เย็นและทำตามฉลากหลังเปิด อย่าเก็บ pav ที่ประกอบแล้วเพราะจะนิ่มแฉะ"
  );
  recipe.sources.push({ title: "Ministry of Curry — Mumbai Vada Pav", url: "https://ministryofcurry.com/vada-pav/" });
  addSafetySources(recipe);
}

function reviseBlackForestCake(recipe) {
  recipe.prepMinutes = 225;
  recipe.cookMinutes = 40;
  recipe.totalMinutes = 265;
  body(recipe, 0, ml(
    "Heat the oven to 175°C and line the base of a 24 cm springform pan. Whip all 6 room-temperature eggs with all 180 g sponge sugar for 8–10 minutes until very pale, thick, and falling in a ribbon. Sift together the 120 g flour, 45 g sponge cornstarch, 45 g cocoa, and 6 g baking powder; fold in gently, then fold in the 60 g melted, cooled butter. Bake for an estimated 30–35 minutes. Check the centre with a food thermometer for at least 71°C/160°F, the official egg-dish minimum; for sponge quality, the centre should spring back and a skewer should emerge with dry crumbs. If either check is short, bake 3–5 minutes more and recheck. The clock and spring-back cue are estimates, not the food-safety endpoint.",
    "烤箱預熱至 175°C，並在 24 公分活動底模底部鋪紙。全部 6 顆室溫雞蛋與 180 公克蛋糕用糖打發 8–10 分鐘，直到顏色很淡、濃稠且提起可呈帶狀落下。將 120 公克麵粉、45 公克蛋糕用玉米澱粉、45 公克可可粉及 6 公克泡打粉過篩拌合，輕柔折入蛋糊，再拌入融化並放涼的 60 公克奶油。估計烘烤 30–35 分鐘。用食物溫度計測量中心至少 71°C/160°F，這是官方蛋料理最低溫度；蛋糕品質則看中心回彈、竹籤抽出只有乾屑。若任一檢查未達，再烤 3–5 分鐘並複測。時鐘與回彈是估計品質線索，不是食安終點。",
    "オーブンを175°Cに予熱し、直径24cmの底取れ型の底に紙を敷きます。室温に戻した卵6個すべてとスポンジ用砂糖180gを8〜10分泡立て、色が淡く、もったりしてリボン状に落ちる状態にします。薄力粉120g、スポンジ用コーンスターチ45g、ココア45g、ベーキングパウダー6gを合わせてふるい、泡をつぶさないよう混ぜ、溶かして冷ましたバター60gも折り込みます。目安として30〜35分焼きます。食品用温度計で中心が卵料理の公的最低温度71°C/160°F以上か確認します。スポンジの品質は中心が弾み、串に乾いた細かな生地だけが付く状態で判断します。どちらか足りなければ3〜5分追加して再確認します。時間と弾力は品質の目安で、安全終点は温度で確認します。",
    "오븐을 175°C로 예열하고 지름 24cm 스프링폼 팬 바닥에 종이를 깝니다. 실온 달걀 6개 전량과 시트용 설탕 180g을 8–10분 휘핑해 색이 매우 옅고 되직하며 들어 올리면 리본처럼 떨어지게 합니다. 밀가루 120g, 시트용 전분 45g, 코코아 45g, 베이킹파우더 6g을 함께 체쳐 부드럽게 접어 넣고 녹여 식힌 버터 60g도 섞습니다. 약 30–35분 굽습니다. 식품용 온도계로 중심이 달걀 요리의 공식 최저 온도인 71°C/160°F 이상인지 확인합니다. 케이크 품질은 중심이 되돌아오고 꼬치에 마른 부스러기만 묻는지 봅니다. 둘 중 하나가 부족하면 3–5분 더 굽고 다시 확인합니다. 시간과 탄력은 품질 기준이고 안전 종점은 온도로 확인합니다.",
    "อุ่นเตาอบที่ 175°C และรองกระดาษเฉพาะก้นพิมพ์ถอดฐานขนาด 24 ซม. ตีไข่อุณหภูมิห้อง 6 ฟองทั้งหมดกับน้ำตาลสำหรับสปันจ์ 180 กรัม 8–10 นาทีจนสีซีด ข้นและไหลเป็นริบบิ้น ร่อนแป้ง 120 กรัม แป้งข้าวโพดสำหรับสปันจ์ 45 กรัม โกโก้ 45 กรัม และผงฟู 6 กรัมเข้าด้วยกัน แล้วตะล่อมเบา ๆ ตามด้วยเนยละลายที่เย็นแล้ว 60 กรัม อบประมาณ 30–35 นาที ใช้เทอร์โมมิเตอร์อาหารตรวจใจกลางให้ถึงอย่างน้อย 71°C/160°F ซึ่งเป็นอุณหภูมิขั้นต่ำทางการสำหรับอาหารประเภทไข่ ส่วนคุณภาพของสปันจ์ให้ดูว่าใจกลางเด้งกลับและไม้เสียบออกมามีเพียงเศษแห้ง หากข้อใดไม่ผ่านให้อบเพิ่ม 3–5 นาทีแล้วตรวจซ้ำ เวลาและการเด้งเป็นเกณฑ์คุณภาพ ไม่ใช่จุดสิ้นสุดด้านความปลอดภัย"
  ));
  body(recipe, 1, ml(
    "Leave the sponge in the pan for 10 minutes, then release it onto a wire rack and cool for at least 60 minutes, until no warmth remains in the centre. Do not cut or brush a warm cake; trapped heat softens the layers and melts the cream later.",
    "蛋糕出爐後留在模具中 10 分鐘，再脫模移至網架，至少放涼 60 分鐘，直到中心也不再溫熱。不可切開或刷溫熱蛋糕；殘餘熱度會讓蛋糕層變軟，也會使後續奶油融化。",
    "焼き上がったスポンジは型に入れたまま10分置き、型から外して網にのせ、中心まで熱がなくなるまで少なくとも60分冷まします。温かいうちに切ったりシロップを塗ったりしません。余熱で層が崩れ、後でクリームが溶けます。",
    "구운 시트를 팬에 10분 둔 뒤 틀에서 빼 철망 위에서 최소 60분 식혀 중심까지 따뜻함이 남지 않게 합니다. 따뜻한 케이크를 자르거나 시럽을 바르지 않습니다. 남은 열은 층을 무르게 하고 나중에 크림을 녹입니다.",
    "พักสปันจ์ในพิมพ์ 10 นาที จากนั้นถอดพิมพ์วางบนตะแกรงให้เย็นอย่างน้อย 60 นาทีจนใจกลางไม่อุ่น ห้ามตัดหรือทาน้ำเชื่อมขณะเค้กยังอุ่น ความร้อนค้างจะทำให้ชั้นเค้กนิ่มและละลายครีมภายหลัง"
  ));
  body(recipe, 2, ml(
    "Drain all 700 g jarred cherries and reserve exactly 400 ml of their juice. Whisk 45 g filling cornstarch and 70 g filling sugar into 100 ml juice until smooth. Bring the remaining 300 ml juice to a simmer, whisk in the slurry, and cook about 2 minutes until glossy and thick enough to leave a brief trail on the pan. Fold in all the drained cherries. Spread the filling in a shallow dish and cool for about 30 minutes; refrigerate it at 4°C/40°F or below within 2 hours if assembly is delayed.",
    "瀝乾全部 700 公克罐裝酸櫻桃，精確保留 400 毫升櫻桃汁。將 45 公克內餡玉米澱粉及 70 公克內餡糖與 100 毫升櫻桃汁拌至無粉粒。剩餘 300 毫升果汁煮至微滾，邊攪拌邊倒入粉漿，煮約 2 分鐘至有光澤、濃稠且鍋鏟劃過會短暫留痕。拌入全部瀝乾櫻桃。將餡料鋪在淺盤中放涼約 30 分鐘；若延後組裝，須在 2 小時內冷藏於 4°C/40°F 以下。",
    "瓶詰めのサワーチェリー700gすべてを水切りし、汁を400ml正確に取っておきます。フィリング用コーンスターチ45gと砂糖70gを汁100mlで滑らかに溶きます。残りの汁300mlを煮立つ直前まで温め、混ぜながら水溶き粉を加え、約2分、つやが出てへらで鍋底を引くと跡が少し残る濃度まで煮ます。水切りしたチェリーをすべて混ぜます。浅い容器に広げて約30分冷まし、組み立てを待つ場合は2時間以内に4°C以下で冷蔵します。",
    "병에 든 사워체리 700g 전량의 물기를 빼고 체리 주스 400ml를 정확히 남깁니다. 필링용 전분 45g과 설탕 70g을 주스 100ml에 풀어 매끈하게 만듭니다. 남은 주스 300ml를 끓기 직전까지 데우고 전분물을 저으며 부어 약 2분 윤기 나고 주걱으로 팬을 그었을 때 잠시 자국이 남을 정도로 되직해질 때까지 익힙니다. 물기를 뺀 체리를 모두 섞습니다. 얕은 접시에 펴서 약 30분 식히고 조립을 미룬다면 2시간 안에 4°C 이하로 냉장합니다.",
    "สะเด็ดเชอร์รีเปรี้ยวกระป๋อง 700 กรัมทั้งหมดและตวงน้ำเชอร์รีไว้ 400 มล.ให้พอดี คนแป้งข้าวโพดสำหรับไส้ 45 กรัมและน้ำตาลสำหรับไส้ 70 กรัมกับน้ำเชอร์รี 100 มล.จนเนียน ต้มน้ำเชอร์รีที่เหลือ 300 มล.จนเริ่มเดือด ค่อย ๆ ตีส่วนผสมแป้งลงไปและปรุงประมาณ 2 นาทีจนเงาและข้นพอให้รอยพายอยู่ชั่วครู่ ใส่เชอร์รีที่สะเด็ดแล้วทั้งหมด เกลี่ยไส้ในจานตื้นและพักประมาณ 30 นาที หากยังไม่ประกอบให้แช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง"
  ));
  body(recipe, 3, ml(
    "When the sponge is completely cool, use a long serrated knife to cut it horizontally into three even layers. Set the flattest layer aside for the top and keep the layers in order so the cake stacks level.",
    "蛋糕完全放涼後，用長鋸齒刀橫切成厚度相近的三層。最平整的一層留作頂層，並依原順序擺放，方便蛋糕疊平。",
    "スポンジが完全に冷めたら、長い波刃ナイフで水平に3枚へ均等に切り分けます。一番平らな層は上用に取り分け、重ねたとき平らになるよう順番を保ちます。",
    "시트가 완전히 식으면 긴 톱니칼로 가로로 세 장을 균일하게 자릅니다. 가장 평평한 층은 맨 위용으로 따로 두고 케이크가 고르게 쌓이도록 층의 순서를 유지합니다.",
    "เมื่อสปันจ์เย็นสนิท ใช้มีดฟันเลื่อยยาวหั่นแนวนอนเป็น 3 ชั้นหนาเท่ากัน เก็บชั้นที่เรียบที่สุดไว้ด้านบนและเรียงลำดับชั้นไว้เพื่อให้ซ้อนแล้วได้ระดับ"
  ));
  body(recipe, 4, ml(
    "Brush all 100 ml Kirsch over the four exposed cut faces: about 25 ml on each face. The bottom and top layers each have one cut face; the middle layer has two. Let the liqueur soak in for 5 minutes before adding cream. Keep the bottle away from the hot stove and do not pour it into the cherry pan.",
    "將全部 100 毫升 Kirsch 刷在四個切面上，每面約 25 毫升。底層與頂層各有一個切面，中層有兩個。靜置 5 分鐘讓酒吸收，再加奶油。酒瓶遠離熱爐具，也不可倒入櫻桃鍋。",
    "キルシュ100mlすべてを4つの切り口に塗り、各面約25mlずつ使います。下段と上段は切り口が1面ずつ、中段は2面です。クリームを重ねる前に5分置いて吸わせます。酒瓶は熱いコンロから離し、チェリーの鍋に注ぎません。",
    "키르슈 100ml 전량을 네 개의 자른 면에 바르고 면마다 약 25ml씩 사용합니다. 맨 아래와 맨 위 시트는 자른 면이 한쪽씩이고 가운데 시트는 두 면입니다. 크림을 올리기 전 5분 흡수시킵니다. 술병은 뜨거운 가스레인지에서 멀리 두고 체리 팬에 붓지 않습니다.",
    "ทาคีร์ช 100 มล.ทั้งหมดบนผิวตัดทั้ง 4 ด้าน ด้านละประมาณ 25 มล. ชั้นล่างและชั้นบนมีผิวตัดชั้นละด้าน ส่วนชั้นกลางมีสองด้าน พัก 5 นาทีให้ซึมก่อนเติมครีม วางขวดเหล้าให้ห่างจากเตาร้อนและอย่าเทลงในหม้อเชอร์รี"
  ));
  body(recipe, 5, ml(
    "Whip all 900 ml very cold double cream with all 75 g icing sugar and 5 ml vanilla for an estimated 3–5 minutes until smooth, firm peaks hold their shape, and the cream is still glossy. Stop as soon as it holds; grainy cream is overwhipped. If the kitchen is warm, keep the bowl over ice while whipping.",
    "將全部 900 毫升冰涼鮮奶油、75 公克糖粉及 5 毫升香草精打發約 3–5 分鐘，直到細緻、有光澤且挺立的硬性發泡。剛能保持形狀就停止，出現顆粒表示打過頭。若廚房較熱，打發時將攪拌盆放在冰塊上。",
    "冷たい生クリーム900mlすべてに粉砂糖75g、バニラ5mlを加え、目安として3〜5分泡立てます。なめらかでつやがあり、角がしっかり立つ状態で止めます。粒状になったら泡立てすぎです。室温が高い場合は、ボウルを氷に当てながら泡立てます。",
    "차가운 더블크림 900ml 전량에 슈거파우더 75g과 바닐라 5ml를 넣고 약 3–5분 휘핑해 매끈하고 윤기가 있으며 단단한 봉우리가 유지되면 멈춥니다. 모양이 잡히는 즉시 멈추고 알갱이가 생기면 과하게 휘핑한 것입니다. 주방이 따뜻하면 휘핑하는 동안 볼을 얼음 위에 둡니다.",
    "ตีดับเบิลครีมเย็นจัด 900 มล.ทั้งหมดกับน้ำตาลไอซิง 75 กรัมและวานิลลา 5 มล.ประมาณ 3–5 นาทีจนเนียน เงาและยอดตั้งอยู่ตัว หยุดทันทีเมื่อครีมอยู่รูป หากเริ่มเป็นเม็ดแปลว่าตีนานเกินไป หากครัวร้อนให้วางชามบนอ่างน้ำแข็งขณะตี"
  ));
  body(recipe, 6, ml(
    "Place the bottom sponge on a cake board. Spread a thin bed of whipped cream over it, then pipe a ring near the edge using about one third of the cream. Fill the centre with half the cooled cherry mixture, keeping it inside the ring, and cover with a thin layer of cream so the next sponge sits level.",
    "將底層蛋糕放在蛋糕板上，先薄抹一層打發奶油，再用約三分之一奶油沿邊緣擠成一圈。中央放入一半已放涼的櫻桃餡，保持在奶油圈內，再薄抹奶油，使下一層蛋糕可以平穩放置。",
    "下段のスポンジをケーキ台に置き、泡立てクリームを薄く塗ります。クリームの約3分の1を使って縁に輪を絞り、冷ましたチェリーの半量を輪の内側に広げます。薄くクリームを重ねて、中段のスポンジが水平に置けるようにします。",
    "맨 아래 시트를 케이크 보드에 올립니다. 휘핑크림을 얇게 바른 뒤 크림 약 3분의 1로 가장자리 둘레에 링을 짭니다. 식힌 체리 필링 절반을 링 안쪽 중앙에 넣고 얇게 크림을 덮어 다음 시트가 평평하게 놓이도록 합니다.",
    "วางสปันจ์ชั้นล่างบนฐานเค้ก ปาดวิปครีมบาง ๆ แล้วบีบครีมประมาณหนึ่งในสามเป็นวงใกล้ขอบ ใส่ไส้เชอร์รีที่เย็นแล้วครึ่งหนึ่งไว้กลางวงโดยไม่ให้ล้น แล้วปาดครีมบาง ๆ ให้ชั้นถัดไปวางได้เรียบ"
  ));
  body(recipe, 7, ml(
    "Set the middle sponge in place; all four cut faces have already received their 25 ml share of the 100 ml Kirsch. Use the next portion of cream to pipe a border, add the remaining cherry filling inside it, and cover with a thin cream layer. Keep the fruit level and inside the edge so the cake does not slide.",
    "放上中層蛋糕；四個切面已各刷約 25 毫升 Kirsch，總量 100 毫升已用完。再取一份奶油沿邊擠圈，放入剩餘櫻桃餡並薄抹奶油。餡料保持平整且不超出邊緣，蛋糕才不會滑動。",
    "中段のスポンジを重ねます。4つの切り口にはキルシュを約25mlずつ塗り、合計100mlすべて使い終えています。クリームをもう一部使って縁に輪を絞り、残りのチェリーを入れて薄くクリームを塗ります。果物を平らにし、縁からはみ出さないようにしてずれを防ぎます。",
    "가운데 시트를 올립니다. 자른 면 네 곳에 키르슈를 약 25ml씩 발라 총 100ml를 모두 사용했습니다. 크림 다음 분량으로 가장자리 링을 짜고 남은 체리 필링을 넣은 뒤 얇게 크림을 바릅니다. 과일을 평평하게 담고 가장자리 밖으로 넘치지 않게 해야 케이크가 밀리지 않습니다.",
    "วางสปันจ์ชั้นกลาง ผิวตัดทั้ง 4 ด้านทาคีร์ชด้านละประมาณ 25 มล.ครบ 100 มล.แล้ว ใช้ครีมส่วนถัดไปบีบเป็นวงขอบ ใส่ไส้เชอร์รีที่เหลือแล้วปาดครีมบาง ๆ เกลี่ยผลไม้ให้เรียบและอยู่ด้านในขอบเพื่อไม่ให้เค้กเลื่อน"
  ));
  body(recipe, 8, ml(
    "Add the flattest sponge layer with its flat side facing up. Spread a thin crumb coat over the top and sides, using about half of the cream left after the two fillings. Refrigerate the cake for 20 minutes so the layers set before the final coating.",
    "放上最平整的蛋糕層，平面朝上。取兩層夾餡後剩餘奶油約一半，薄薄塗滿頂部和側面作為封屑層。冷藏 20 分鐘讓蛋糕定型，再做最後裝飾。",
    "一番平らなスポンジを平らな面を上にして重ねます。2段のフィリングに使った後のクリームの約半量で、上面と側面に薄い下塗りをします。冷蔵庫で20分冷やし、層を落ち着かせてから仕上げます。",
    "가장 평평한 시트를 평평한 면이 위로 오게 올립니다. 두 층 필링에 쓴 뒤 남은 크림의 약 절반으로 윗면과 옆면에 얇게 크럼 코트를 바릅니다. 층이 고정되도록 20분 냉장한 뒤 마무리합니다.",
    "วางสปันจ์ที่เรียบที่สุดโดยหงายด้านเรียบขึ้น ใช้ครีมที่เหลือหลังทำไส้สองชั้นประมาณครึ่งหนึ่งปาดบาง ๆ ด้านบนและด้านข้างเป็นชั้นเก็บเศษเค้ก แช่เย็น 20 นาทีให้ชั้นเค้กอยู่ตัวก่อนเคลือบขั้นสุดท้าย"
  ));
  body(recipe, 9, ml(
    "Spread the remaining cream smoothly over the chilled cake. Reserve about 150 ml whipped cream in a piping bag for 12 rosettes; divide the rest evenly over the top and sides. Keep the cake chilled while you prepare the chocolate curls.",
    "將剩餘奶油均勻抹在冰涼蛋糕外層。另取約 150 毫升打發奶油裝入擠花袋，留作 12 朵奶油花；其餘平均塗在頂部及側面。準備巧克力刨屑時，蛋糕保持冷藏。",
    "残りのクリームを冷えたケーキの上面と側面に滑らかに塗ります。絞り袋に泡立てクリーム約150mlを取り分け、12個のロゼット用にします。残りは上面と側面に均等に使います。チョコレートを削る間もケーキは冷蔵しておきます。",
    "남은 크림을 차가운 케이크 위와 옆면에 매끈하게 바릅니다. 휘핑크림 약 150ml는 짤주머니에 남겨 장미 모양 12개를 만들고 나머지는 윗면과 옆면에 고르게 사용합니다. 초콜릿 컬을 준비하는 동안 케이크는 냉장합니다.",
    "ปาดครีมที่เหลือให้เรียบบนเค้กที่เย็นแล้ว ตักวิปครีมประมาณ 150 มล.ใส่ถุงบีบสำหรับบีบโรเซตต์ 12 ดอก แบ่งครีมที่เหลือทาด้านบนและด้านข้างให้เท่ากัน แช่เค้กไว้ระหว่างเตรียมช็อกโกแลตขูด"
  ));
  body(recipe, 10, ml(
    "Shave all 120 g dark chocolate into curls with a vegetable peeler. Press the curls gently onto the sides and centre of the cake. Pipe 12 rosettes around the top edge and place one of the 12 reserved sour cherries on each; use all 12 cherries and keep them cold until decorating.",
    "用削皮器將全部 120 公克黑巧克力刨成捲屑，輕壓在蛋糕側面及中央。沿頂部邊緣擠出 12 朵奶油花，每朵放一顆預留的酸櫻桃；12 顆櫻桃全部用完，裝飾前保持冷藏。",
    "ピーラーでダークチョコレート120gすべてを削ってカールを作り、ケーキの側面と中央にそっと付けます。上端にロゼットを12個絞り、取り分けたサワーチェリーを1個ずつのせます。12個すべて使い、飾る直前まで冷蔵しておきます。",
    "필러로 다크초콜릿 120g 전량을 컬로 깎아 케이크 옆면과 가운데에 가볍게 붙입니다. 윗 가장자리에 크림 장미 12개를 짜고 남겨 둔 사워체리 12개를 하나씩 올립니다. 체리 12개를 모두 사용하며 장식 직전까지 차갑게 둡니다.",
    "ใช้ที่ปอกผักขูดดาร์กช็อกโกแลต 120 กรัมทั้งหมดเป็นเส้นม้วน กดเบา ๆ ให้ติดด้านข้างและตรงกลางเค้ก บีบโรเซตต์ 12 ดอกตามขอบด้านบนแล้ววางเชอร์รีเปรี้ยวที่เก็บไว้ดอกละหนึ่งลูก ใช้ให้ครบ 12 ลูกและแช่เย็นไว้จนแต่งหน้า"
  ));
  body(recipe, 11, ml(
    "Chill the finished cake for at least 60 minutes before cutting so the cream and cherry layers hold. Refrigerate it in a covered cake carrier at 4°C/40°F or below and return it to the refrigerator within 2 hours of serving (within 1 hour above 32°C/90°F). For best cream texture, serve within 2 days; this is a quality preference. Serve cold and do not reheat.",
    "完成後至少冷藏 60 分鐘再切，讓奶油與櫻桃層固定。將蛋糕放入有蓋蛋糕盒，冷藏於 4°C/40°F 以下；上桌後 2 小時內放回冰箱，環境高於 32°C/90°F 時 1 小時內放回。為保持奶油口感，建議 2 天內食用，這是品質偏好。冷食，不要復熱。",
    "完成したケーキはクリームとチェリーの層を安定させるため、切る前に少なくとも60分冷やします。蓋付きケーキケースに入れて4°C以下で冷蔵し、提供後は室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に冷蔵庫へ戻します。クリームの食感を保つため2日以内に食べるのは品質上の目安です。冷たいまま提供し、再加熱しません。",
    "완성한 케이크는 크림과 체리 층이 고정되도록 자르기 전에 최소 60분 냉장합니다. 뚜껑 있는 케이크 용기에 담아 4°C 이하로 냉장하고, 실내가 32°C보다 더우면 1시간 안에, 그 외에는 2시간 안에 냉장고로 돌려놓습니다. 크림 식감을 위해 2일 안에 먹으라는 것은 품질 권장사항입니다. 차갑게 내고 다시 데우지 않습니다.",
    "แช่เค้กที่ตกแต่งแล้วอย่างน้อย 60 นาทีก่อนตัดเพื่อให้ชั้นครีมและเชอร์รีอยู่ตัว เก็บในกล่องเค้กมีฝาที่ 4°C/40°F หรือต่ำกว่า และนำกลับเข้าตู้เย็นภายใน 2 ชั่วโมงหลังเสิร์ฟ หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F แนะนำให้กินภายใน 2 วันเพื่อเนื้อครีมที่ดีที่สุด ซึ่งเป็นความชอบด้านคุณภาพ เสิร์ฟเย็นและไม่ต้องอุ่นซ้ำ"
  ));
  recipe.storage = ml(
    "Keep the cream cake covered at 4°C/40°F or below. Return it to the refrigerator within 2 hours after serving, or within 1 hour if the room is above 32°C/90°F. For the best cream and sponge texture, use it within 2 days; that is a quality preference, not an official safety limit. Serve cold.",
    "奶油蛋糕須加蓋冷藏於 4°C/40°F 以下。上桌後 2 小時內放回冰箱；環境高於 32°C/90°F 時，須於 1 小時內冷藏。為保持奶油與蛋糕體的最佳口感，建議 2 天內食用；這是品質偏好，不是官方安全期限。冷食。",
    "クリームケーキは蓋をして4°C/40°F以下で冷蔵します。提供後は2時間以内、室温が32°Cを超える場合は1時間以内に冷蔵庫へ戻します。クリームとスポンジの食感を保つため2日以内に食べるのは品質上の目安で、公的な安全期限ではありません。冷たいまま提供します。",
    "크림 케이크는 덮어서 4°C/40°F 이하로 냉장합니다. 낸 뒤 2시간 안에 냉장고로 돌려놓고, 실내 온도가 32°C/90°F보다 높으면 1시간 안에 넣습니다. 크림과 시트의 식감을 위해 2일 안에 먹으라는 것은 품질 권장사항이며 공식 안전 기한이 아닙니다. 차갑게 냅니다.",
    "เก็บเค้กครีมแบบปิดฝาที่ 4°C/40°F หรือต่ำกว่า นำกลับเข้าตู้เย็นภายใน 2 ชั่วโมงหลังเสิร์ฟ หรือภายใน 1 ชั่วโมงหากอุณหภูมิห้องสูงกว่า 32°C/90°F แนะนำให้กินภายใน 2 วันเพื่อเนื้อครีมและสปันจ์ที่ดีที่สุด ซึ่งเป็นคำแนะนำด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัยทางการ เสิร์ฟเย็น"
  );
  addSafetySources(recipe, { egg: true });
}

function reviseMontrealSmokedMeat(recipe) {
  recipe.prepMinutes = 15;
  recipe.cookMinutes = 15;
  recipe.totalMinutes = 30;
  body(recipe, 0, ml(
    "Pour all 750 ml steaming water into a saucepan and bring it to a steady simmer. Set a steamer basket at least 2 cm above the water so the meat is heated by steam, not boiled. Keep the lid nearby and have a clean platter ready for the warmed meat.",
    "將全部 750 毫升蒸煮用水倒入鍋中，煮至穩定的小滾。蒸架至少高於水面 2 公分，讓肉片以蒸氣加熱而非浸煮。備好鍋蓋與乾淨盤子，盛放熱肉。",
    "蒸し水750mlすべてを鍋に入れ、安定した弱い沸騰にします。蒸し器を水面から少なくとも2cm上に置き、肉を湯に浸さず蒸気で温めます。蓋と温めた肉を受ける清潔な皿を用意します。",
    "찜용 물 750ml 전량을 냄비에 붓고 잔잔하게 끓입니다. 찜기는 물에 잠기지 않도록 수면보다 최소 2cm 위에 놓아 고기를 삶지 않고 수증기로 데웁니다. 뚜껑과 데운 고기를 받을 깨끗한 접시를 준비합니다.",
    "เทน้ำสำหรับนึ่ง 750 มล.ทั้งหมดลงหม้อและต้มให้เดือดอ่อนสม่ำเสมอ วางตะแกรงนึ่งให้สูงกว่าผิวน้ำอย่างน้อย 2 ซม.เพื่อให้เนื้อโดนไอน้ำ ไม่ต้มในน้ำ เตรียมฝาหม้อและจานสะอาดสำหรับใส่เนื้อที่อุ่นแล้ว"
  ));
  body(recipe, 1, ml(
    "Loosen all 600 g ready-to-eat smoked meat and spread it in a shallow layer in the basket; if it will be tightly packed, steam it in two 300 g batches. Cover and steam for an estimated 5–8 minutes, turning once halfway, until hot and supple for serving. This time and texture are quality cues for a cooked ready-to-eat product, not a universal safety endpoint. Keep the warmed meat covered while you toast the bread.",
    "將全部 600 公克可即食煙燻牛肉撥鬆並平鋪在蒸籃中；若放入後會擠得太密，分成兩批、每批 300 公克蒸。加蓋估計蒸 5–8 分鐘，中途翻動一次，至熱透柔軟、適合上桌。這段時間與口感是熟食的品質指標，不是通用食安終點。麵包加熱時將肉片覆蓋保溫。",
    "そのまま食べられるスモークミート600gすべてをほぐして浅く広げます。詰まりすぎる場合は300gずつ2回に分けます。蓋をして目安として5〜8分蒸し、途中で一度返し、食べやすく熱く柔らかくします。この時間と食感は加熱済み製品の品質の目安で、共通の安全温度ではありません。パンを温める間、肉は蓋をしておきます。",
    "바로 먹을 수 있는 훈제 고기 600g 전량을 풀어 찜기에 얇게 펼칩니다. 너무 빽빽하면 300g씩 두 번 나눠 찝니다. 뚜껑을 덮고 약 5–8분 쪄서 중간에 한 번 뒤집고 먹기 좋게 뜨겁고 부드러워지면 마칩니다. 이 시간과 식감은 이미 조리된 제품의 품질 기준이지 보편적인 안전 온도가 아닙니다. 빵을 데우는 동안 고기는 덮어 둡니다.",
    "คลายเนื้อรมควันพร้อมกิน 600 กรัมทั้งหมดแล้วเกลี่ยเป็นชั้นตื้นในตะแกรง หากแน่นเกินไปให้นึ่งสองชุด ชุดละ 300 กรัม ปิดฝานึ่งประมาณ 5–8 นาที พลิกหนึ่งครั้งช่วงครึ่งทางจนร้อนและนุ่มเหมาะเสิร์ฟ เวลาและเนื้อสัมผัสนี้เป็นเกณฑ์คุณภาพสำหรับผลิตภัณฑ์ที่ปรุงสุกแล้ว ไม่ใช่อุณหภูมิความปลอดภัยทั่วไป คลุมเนื้อไว้ระหว่างอุ่นขนมปัง"
  ));
  body(recipe, 2, ml(
    "Warm the eight rye slices in batches on a dry skillet or in a toaster, about 20–30 seconds per side in a pan, until flexible and lightly warm rather than crisp. If using the optional 15 g butter, spread it thinly across all eight slices; otherwise leave them plain.",
    "將八片黑麥麵包分批放入乾鍋或烤麵包機加熱；平底鍋每面約 20–30 秒，至柔軟微溫而非酥脆。若使用可選的 15 公克奶油，薄薄塗抹在八片麵包上；不使用則保持原味。",
    "ライ麦パン8枚を数回に分け、油を引かないフライパンまたはトースターで温めます。フライパンなら片面20〜30秒を目安に、カリカリではなく柔らかく温かい状態にします。好みでバター15gを8枚すべてに薄く塗り、使わない場合はそのままにします。",
    "호밀빵 여덟 장을 나누어 마른 팬이나 토스터에서 데웁니다. 팬에서는 한 면당 약 20–30초, 바삭하지 않고 부드럽게 따뜻해질 때까지 굽습니다. 선택 재료 버터 15g을 쓴다면 여덟 장 전체에 얇게 바르고, 쓰지 않으면 그대로 둡니다.",
    "อุ่นขนมปังไรย์ 8 แผ่นเป็นชุด ๆ ในกระทะแห้งหรือเครื่องปิ้ง หากใช้กระทะให้อุ่นด้านละประมาณ 20–30 วินาทีจนยืดหยุ่นและอุ่นเล็กน้อย ไม่กรอบ หากใช้เนย 15 กรัมที่เป็นตัวเลือกให้ทาบาง ๆ ทั่วทั้ง 8 แผ่น มิฉะนั้นไม่ต้องทา"
  ));
  body(recipe, 3, ml(
    "Divide the full 60 ml mustard into four 15 ml portions. Spread one portion inside each sandwich, across the two faces of its bread, so each serving gets the same amount without making the bread soggy before assembly.",
    "將全部 60 毫升芥末醬分成四份、每份 15 毫升。每份均勻抹在一個三明治的兩個麵包內側，使每人分量相同，也避免組裝前麵包吸濕。",
    "マスタード60mlすべてを15mlずつ4人分に分けます。各サンドのパンの内側2面に1人分を塗り、量をそろえ、組み立て前にパンが湿らないようにします。",
    "머스터드 60ml 전량을 15ml씩 네 몫으로 나눕니다. 샌드위치마다 빵 안쪽 두 면에 한 몫씩 발라 1인분 양을 맞추고 조립 전 빵이 눅눅해지지 않게 합니다.",
    "แบ่งมัสตาร์ด 60 มล.ทั้งหมดเป็น 4 ส่วน ส่วนละ 15 มล.ทาด้านในของขนมปังสองแผ่นของแซนด์วิชแต่ละชิ้นให้ทั่ว เพื่อให้ได้ปริมาณเท่ากันและไม่ทำให้ขนมปังแฉะก่อนประกอบ"
  ));
  body(recipe, 4, ml(
    "Divide the hot smoked meat into four equal 150 g portions. Pile one portion loosely on each of four bottom rye slices; do not compress the meat, so steam can escape and the slices stay tender. Set one dill pickle spear beside each portion.",
    "將熱煙燻牛肉平均分成四份，每份 150 公克。每份鬆鬆堆在四片底層黑麥麵包上；不要壓緊，讓蒸氣散出並保持肉片柔嫩。每份旁放一根酸黃瓜。",
    "温めたスモークミートを150gずつ4人分に分けます。下側のライ麦パン4枚に1人分ずつふんわり盛り、肉を押し固めないようにします。蒸気が抜け、肉が柔らかいままになります。ピクルスを1本ずつ添えます。",
    "따뜻한 훈제 고기 600g을 150g씩 네 몫으로 나눕니다. 호밀빵 아래쪽 네 장에 한 몫씩 느슨하게 쌓고 고기를 누르지 않아야 김이 빠지고 부드럽습니다. 피클 오이 한 개씩 곁들입니다.",
    "แบ่งเนื้อรมควันร้อนเป็น 4 ส่วนเท่ากัน ส่วนละ 150 กรัม วางหลวม ๆ บนขนมปังไรย์แผ่นล่าง 4 แผ่น อย่ากดเนื้อแน่นเพื่อให้ไอน้ำระบายและเนื้อยังนุ่ม เสิร์ฟแตงกวาดองคนละ 1 ชิ้น"
  ));
  body(recipe, 5, ml(
    "Close each sandwich with one of the remaining rye slices. Cut in half with a serrated knife and serve while the meat is warm, with the pickle on the side. Use clean plates and utensils for the assembled sandwiches.",
    "每份用剩下的一片黑麥麵包蓋上，組成三明治。用鋸齒刀切半，趁肉溫熱搭配旁邊的酸黃瓜上桌。盛放完成三明治時使用乾淨盤子與器具。",
    "残りのライ麦パン1枚ずつを重ねてサンドイッチを閉じます。波刃ナイフで半分に切り、肉が温かいうちにピクルスを添えて出します。完成したサンドには清潔な皿と器具を使います。",
    "남은 호밀빵 한 장씩 덮어 샌드위치를 닫습니다. 톱니칼로 반을 자르고 고기가 따뜻할 때 피클을 곁들여 냅니다. 완성한 샌드위치는 깨끗한 접시와 도구를 사용합니다.",
    "ปิดแซนด์วิชด้วยขนมปังไรย์ที่เหลือชิ้นละหนึ่งแผ่น ใช้มีดฟันเลื่อยผ่าครึ่งและเสิร์ฟขณะเนื้อยังอุ่นพร้อมแตงกวาดอง ใช้จานและอุปกรณ์สะอาดกับแซนด์วิชที่ประกอบแล้ว"
  ));
  recipe.storage = ml(
    "Refrigerate leftover smoked meat in a shallow covered container within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or below, separately from bread and pickles. Follow the mustard label for storage after opening. Use cooked meat leftovers within the official 3–4-day window. Reheat only the portion needed to 74°C/165°F throughout; stirring or turning helps eliminate cold spots. The original 5–8-minute steaming time is a serving-quality estimate for ready-to-eat smoked meat, not the leftover safety check. Assemble sandwiches just before serving.",
    "剩餘煙燻牛肉須放入淺而有蓋的容器，2 小時內（環境高於 32°C/90°F 時 1 小時內）冷藏於 4°C/40°F 以下，並與麵包、酸黃瓜分開。芥末醬開封後依包裝標示保存。熟肉剩菜依官方指引於 3–4 天內食用。只取所需份量復熱至各處 74°C/165°F；攪拌或翻動可減少冷點。原本蒸 5–8 分鐘是可即食煙燻肉的上桌品質估時，不是剩菜安全檢查。三明治上桌前再組裝。",
    "残ったスモークミートは浅い蓋付き容器に入れてパンやピクルスと分け、室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に4°C以下で冷蔵します。開封後のマスタードは包装表示に従って保存します。加熱済みの肉は公的な目安の3〜4日以内に使います。必要な分だけ全体が74°C/165°Fになるまで再加熱し、途中で混ぜたり返したりして冷たい部分をなくします。最初の5〜8分の蒸し時間は、そのまま食べられる肉の提供品質の目安で、残り物の安全確認ではありません。サンドイッチは出す直前に組み立てます。",
    "남은 훈제 고기는 얕고 뚜껑 있는 용기에 담아 빵과 피클에서 분리하고, 실내가 32°C보다 더우면 1시간 안에 그 외에는 2시간 안에 4°C 이하로 냉장합니다. 머스터드는 개봉 후 포장 표시를 따릅니다. 조리된 고기 남은 음식은 공식 지침의 3–4일 안에 사용합니다. 필요한 만큼만 전체가 74°C/165°F가 되도록 다시 데우고 차가운 부분이 없도록 저어 주거나 뒤집습니다. 처음 찌는 5–8분은 바로 먹을 수 있는 훈제 고기의 제공 품질 추정치이지 남은 음식의 안전 확인이 아닙니다. 샌드위치는 내기 직전에 조립합니다.",
    "แช่เนื้อรมควันที่เหลือในภาชนะตื้นมีฝาที่ 4°C/40°F หรือต่ำกว่า ภายใน 2 ชั่วโมง หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F โดยแยกจากขนมปังและแตงกวาดอง เก็บมัสตาร์ดหลังเปิดตามฉลาก ใช้เนื้อสุกที่เหลือภายในช่วงทางการ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C/165°F คนหรือพลิกระหว่างอุ่นเพื่อลดจุดเย็น เวลาอบไอน้ำ 5–8 นาทีแรกเป็นค่าคุณภาพสำหรับเนื้อรมควันที่พร้อมกิน ไม่ใช่การตรวจความปลอดภัยของอาหารเหลือ ประกอบแซนด์วิชก่อนเสิร์ฟ"
  );
  addSafetySources(recipe);
}

export function refineSixtyNinthMethods(recipes) {
  const selected = new Set(["kitsune-udon", "vada-pav", "black-forest-cake", "montreal-smoked-meat-sandwich"]);
  for (let index = 0; index < recipes.length; index += 1) {
    const recipe = recipes[index];
    if (!selected.has(recipe.id)) continue;
    recipes[index] = {
      ...recipe,
      ingredients: recipe.ingredients.map((row) => ({ ...row })),
      instructions: recipe.instructions.map((instruction) => ({ ...instruction })),
      sources: recipe.sources.map((source) => ({ ...source })),
      storage: { ...recipe.storage }
    };
  }
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseKitsuneUdon(byId.get("kitsune-udon"));
  reviseVadaPav(byId.get("vada-pav"));
  reviseBlackForestCake(byId.get("black-forest-cake"));
  reviseMontrealSmokedMeat(byId.get("montreal-smoked-meat-sandwich"));
}
