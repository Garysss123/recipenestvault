const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({
      ...row,
      amount: typeof row.amount === "object" ? { ...row.amount } : row.amount,
      item: typeof row.item === "object" ? { ...row.item } : row.item
    })),
    instructions: recipe.instructions.map((step) => ({
      ...step,
      title: { ...step.title },
      body: { ...step.body }
    })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function setBody(recipe, index, body) {
  recipe.instructions[index].body = body;
}

function addOfficial(recipe, label, url) {
  const title = "Official food-safety guidance — " + label;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-to-know-about-egg-safety";
const flourSafety = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";

function reviseScallionPancakes(recipe) {
  recipe.prepMinutes = 60;
  recipe.cookMinutes = 30;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  setBody(recipe, 0, ml(
    "Mix all 300 g flour with all 4 g dough salt. Stir in 150 ml boiling water, then all 60 ml room-temperature water; knead for 5 minutes until smooth. Cover and start a 30-minute rest after kneading. Flour is not ready to eat: do not taste the raw dough, and wash hands and tools after handling it.",
    "將全部 300 公克麵粉與 4 公克麵糰用鹽混合。先拌入 150 毫升沸水，再加入全部 60 毫升常溫水；揉 5 分鐘至光滑。加蓋，揉好後開始計時，靜置 30 分鐘。麵粉並非即食食材；不要試吃生麵糰，處理後洗手並清洗器具。",
    "小麦粉300g全量と生地用の塩4g全量を混ぜます。熱湯150mlを混ぜ、続けて常温の水60ml全量を加えます。なめらかになるまで5分こね、覆いをしてこね終わりから30分休ませます。小麦粉はそのまま食べられる食材ではありません。生地を味見せず、扱った後は手と器具を洗います。",
    "밀가루 300g 전량과 반죽용 소금 4g 전량을 섞는다. 끓는 물 150ml를 넣고 이어 실온 물 60ml 전량을 넣는다. 매끈해질 때까지 5분 반죽한 뒤 덮고 반죽이 끝난 시점부터 30분 쉰다. 밀가루는 바로 먹을 수 있는 식품이 아니다. 생반죽을 맛보지 말고 다룬 뒤 손과 도구를 씻는다.",
    "ผสมแป้ง 300 กรัมทั้งหมดกับเกลือสำหรับแป้ง 4 กรัมทั้งหมด เติมน้ำเดือด 150 มล. แล้วตามด้วยน้ำอุณหภูมิห้อง 60 มล.ทั้งหมด นวด 5 นาทีจนเนียน ปิดฝาและพัก 30 นาทีโดยเริ่มจับเวลาหลังนวด แป้งดิบไม่ใช่อาหารพร้อมกิน อย่าชิมแป้งดิบและล้างมือกับอุปกรณ์หลังสัมผัส"
  ));

  setBody(recipe, 1, ml(
    "Make the spreadable paste with all 30 g flour and 45 ml oil. Reserve the other 15 ml of the listed 60 ml oil for frying: measure 3.75 ml for each of the four pancakes.",
    "以全部 30 公克麵粉和 45 毫升油調成可塗抹的油酥。所列 60 毫升油中剩下的 15 毫升留作煎餅用，四張各量 3.75 毫升。",
    "小麦粉30g全量と油45mlで塗りやすいペーストを作ります。表示した油60mlの残り15mlは焼くために取り分け、4枚それぞれに3.75ml使います。",
    "밀가루 30g 전량과 기름 45ml로 바르기 쉬운 페이스트를 만든다. 표시된 기름 60ml 중 남은 15ml는 부침용으로 두고 네 장에 각각 3.75ml씩 쓴다.",
    "ทำแป้งน้ำมันที่ปาดได้โดยใช้แป้ง 30 กรัมและน้ำมัน 45 มล.ทั้งหมด แบ่งน้ำมันที่ระบุ 60 มล.อีก 15 มล.ไว้ทอด โดยใช้แผ่นละ 3.75 มล.สำหรับสี่แผ่น"
  ));

  setBody(recipe, 2, ml(
    "Divide the rested dough into four equal balls. Roll each to a 25 by 15 cm rectangle, spread with one quarter of the paste, and scatter 25 g of the 100 g sliced scallions over it. Roll from the long edge into a rope; repeat so all four portions use the listed scallions and paste.",
    "將醒好的麵糰分成四等份。每份擀成 25 × 15 公分長方形，塗上四分之一油酥，再撒 100 公克蔥花中的 25 公克。從長邊捲成長條；四份都照此操作，用完所列蔥花與油酥。",
    "休ませた生地を4等分します。それぞれ25×15cmに伸ばし、ペーストの4分の1を塗り、刻んだねぎ100gのうち25gを散らします。長い辺から巻いて棒状にします。4つすべて同じように作り、ねぎとペーストを使い切ります。",
    "휴지한 반죽을 네 등분한다. 각 조각을 25×15cm 직사각형으로 밀고 페이스트의 4분의 1을 바른 뒤 썬 파 100g 중 25g을 뿌린다. 긴 변부터 말아 막대 모양으로 만든다. 네 조각 모두 같은 방식으로 만들어 파와 페이스트를 사용한다.",
    "แบ่งแป้งที่พักแล้วเป็น 4 ก้อนเท่า ๆ กัน รีดแต่ละก้อนเป็นสี่เหลี่ยม 25×15 ซม. ทาแป้งน้ำมันหนึ่งในสี่และโรยต้นหอมซอย 25 กรัมจากทั้งหมด 100 กรัม ม้วนจากด้านยาวเป็นแท่ง ทำซ้ำให้ครบสี่ชิ้นโดยใช้ต้นหอมและแป้งน้ำมันตามรายการ"
  ));

  setBody(recipe, 4, ml(
    "Cover every coil and rest each round for at least 10 minutes after it is flattened. The first can rest while the remaining three are shaped, but give the last one its own full 10 minutes before frying.",
    "每個盤好的麵圈都加蓋；壓扁後至少靜置 10 分鐘。前三張可在整形其他麵糰時休息，但最後一張煎前也要完整靜置 10 分鐘。",
    "巻いた生地はすべて覆います。丸く平らにした後、それぞれ少なくとも10分休ませます。最初の生地は残りを成形する間に休ませられますが、最後の1枚も焼く前に10分間休ませます。",
    "모든 말이를 덮는다. 납작하게 편 뒤 각각 최소 10분 쉰다. 첫 번째는 나머지를 빚는 동안 쉴 수 있지만 마지막 것도 굽기 전에 10분을 온전히 쉰다.",
    "ปิดแป้งที่ม้วนทุกชิ้น พักแต่ละแผ่นอย่างน้อย 10 นาทีหลังรีดให้แบน แผ่นแรกพักระหว่างขึ้นรูปแผ่นที่เหลือได้ แต่แผ่นสุดท้ายก็ต้องพักเต็ม 10 นาทีก่อนทอด"
  ));

  setBody(recipe, 5, ml(
    "Heat a skillet over medium heat and brush on the measured 3.75 ml frying oil for one pancake. Start timing when the dough touches the pan; cook each side for about 2–3 minutes, turning as needed, until both layers are crisp and golden and the centre has no raw, floury dough. Repeat with the other three pancakes and their reserved oil.",
    "平底鍋以中火預熱，每張使用量好的 3.75 毫升煎餅油。麵糰接觸鍋面時開始計時，每面約煎 2–3 分鐘，視需要轉動，至兩面金黃酥脆且中心沒有生粉糰。其餘三張同樣煎，每張使用預留油量。",
    "フライパンを中火で熱し、1枚分として計量した油3.75mlを塗ります。生地が鍋に触れた時から時間を測り、必要に応じて回しながら片面2〜3分ずつ焼きます。両面がカリッときつね色になり、中心に生の粉っぽい生地が残らない状態にします。残り3枚も取り分けた油で同様に焼きます。",
    "팬을 중불로 달구고 전 한 장에 계량한 기름 3.75ml를 바른다. 반죽이 팬에 닿는 순간 시간을 재기 시작해 필요하면 돌려가며 양면을 각각 약 2–3분 굽는다. 양면이 바삭하고 노릇하며 가운데에 생밀가루 반죽이 남지 않아야 한다. 남은 세 장도 각자 남겨 둔 기름으로 반복한다.",
    "ตั้งกระทะไฟกลางและทาน้ำมันทอดที่ตวงไว้ 3.75 มล.สำหรับหนึ่งแผ่น เริ่มจับเวลาเมื่อแป้งสัมผัสกระทะ ทอดด้านละประมาณ 2–3 นาที พลิกหรือหมุนตามจำเป็นจนทั้งสองด้านกรอบสีทองและตรงกลางไม่มีแป้งดิบ ทำซ้ำกับอีกสามแผ่นโดยใช้น้ำมันที่แบ่งไว้"
  ));

  setBody(recipe, 6, ml(
    "Whisk all 30 ml soy sauce, 15 ml rice vinegar, and 10 ml chili oil; this makes 55 ml dip, about 14 ml per serving. Keep it in four small cups or one shared bowl so the pancakes stay crisp.",
    "將全部 30 毫升醬油、15 毫升米醋和 10 毫升辣油拌勻，共 55 毫升沾醬，每份約 14 毫升。分裝四個小碟或置於公用碗，避免煎餅受潮。",
    "しょうゆ30ml全量、米酢15ml全量、ラー油10ml全量を混ぜます。合計55ml、1人分は約14mlです。4つの小皿か共有の器に入れ、パンケーキが湿らないよう別にします。",
    "간장 30ml, 쌀식초 15ml, 고추기름 10ml를 전량 섞어 총 55ml 양념장을 만든다. 1인분은 약 14ml다. 네 개의 작은 종지나 공용 그릇에 담아 전이 눅눅해지지 않게 따로 둔다.",
    "ผสมซีอิ๊ว 30 มล. น้ำส้มสายชูข้าว 15 มล. และน้ำมันพริก 10 มล.ทั้งหมด ได้ 55 มล. หรือประมาณ 14 มล.ต่อที่ แบ่งใส่ถ้วยเล็ก 4 ถ้วยหรือถ้วยกลาง แล้วแยกจากแผ่นแป้งเพื่อไม่ให้แฉะ"
  ));

  setBody(recipe, 7, ml(
    "Tap the edge of each hot pancake against the board for 10 seconds to loosen the layers. Cut the four pancakes into wedges and divide one pancake and about 14 ml dip per serving; serve while crisp.",
    "每張熱煎餅的邊緣在砧板上輕敲 10 秒，使層次鬆開。四張切成扇形，每份分到一張煎餅及約 14 毫升沾醬，趁酥脆上桌。",
    "熱いうちに各パンケーキの縁をまな板に10秒ほど軽く当てて層をほぐします。4枚を切り分け、1人に1枚と約14mlのたれを添え、カリッとしている間に出します。",
    "뜨거울 때 각 전의 가장자리를 도마에 10초간 가볍게 두드려 층을 푼다. 네 장을 조각내어 1인당 한 장과 양념장 약 14ml씩 나누고 바삭할 때 낸다.",
    "เคาะขอบแผ่นร้อนแต่ละแผ่นกับเขียงเบา ๆ 10 วินาทีให้ชั้นแป้งแยก ตัดแผ่นทั้งสี่เป็นชิ้น แบ่งคนละหนึ่งแผ่นกับน้ำจิ้มประมาณ 14 มล. เสิร์ฟขณะยังกรอบ"
  ));

  recipe.storage = ml(
    "Cool pancakes in a single layer and refrigerate within 2 hours (within 1 hour if the room is above 32°C/90°F) at or below 4°C/40°F. Use within 3 days for best texture; this is a quality preference, while FoodSafety.gov lists cooked leftovers at 3–4 days. Freeze for up to 2 months for best quality. Reheat only the portion needed in a covered skillet, turning once, until the centre reaches 74°C/165°F; uncover briefly at the end to crisp. Do not taste raw dough.",
    "煎餅單層放涼，2 小時內（室溫高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。為保持口感，建議 3 天內食用；這是品質偏好，FoodSafety.gov 對熟食剩菜列為 3–4 天。冷凍以維持品質最多 2 個月。只取所需份量，以加蓋平底鍋復熱並翻面一次，至中心達 74°C/165°F；最後短暫開蓋回酥。不要試吃生麵糰。",
    "パンケーキは重ねずに冷まし、2時間以内（室温が32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。食感のため3日以内を勧めますが、これは品質上の目安です。FoodSafety.govは調理済みの残り物を3〜4日としています。品質を保つ冷凍は2か月まで。食べる分だけふた付きのフライパンで返しながら再加熱し、中心を74°C/165°Fにします。最後にふたを外して短く焼き、カリッとさせます。生地は味見しません。",
    "전을 겹치지 않게 식힌 뒤 2시간 안에 (실내가 32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 식감을 위해 3일 이내 섭취를 권하지만 이는 품질 선호다. FoodSafety.gov는 조리된 남은 음식을 3–4일로 안내한다. 품질을 위해 최대 2개월 냉동할 수 있다. 먹을 만큼만 뚜껑 덮은 팬에서 한 번 뒤집어 중심이 74°C/165°F가 될 때까지 재가열한다. 마지막에 잠시 뚜껑을 열어 바삭하게 한다. 생반죽을 맛보지 않는다.",
    "วางแผ่นให้เย็นชั้นเดียวและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิห้องเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เพื่อเนื้อสัมผัสที่ดีที่สุดให้ใช้ใน 3 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุอาหารเหลือปรุงสุก 3–4 วัน แช่แข็งได้ถึง 2 เดือนเพื่อคุณภาพ อุ่นเฉพาะส่วนที่จะกินในกระทะมีฝา พลิกหนึ่งครั้งจนตรงกลางถึง 74°C/165°F จากนั้นเปิดฝาสักครู่ให้กรอบ อย่าชิมแป้งดิบ"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: Flour Is a Raw Food and Other Safety Facts", flourSafety);
}

function reviseOkonomiyaki(recipe) {
  recipe.prepMinutes = 30;
  recipe.cookMinutes = 35;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  setBody(recipe, 0, ml(
    "Finely chop all 640 g cabbage and drain it well. Keep it away from raw pork. Cut the 240 g pork belly into eight pieces, two pieces (about 60 g raw pork) for each of four pancakes; use a separate board and wash hands and tools after handling it.",
    "將全部 640 公克高麗菜切細並瀝乾，與生豬肉分開。將 240 公克五花肉切成八片，四張煎餅各放兩片（生肉約 60 公克）；使用不同砧板，處理後洗手並清洗器具。",
    "キャベツ640g全量を細かく刻み、よく水を切って生の豚肉と分けておきます。豚バラ肉240gを8枚に切り、4枚のパンケーキに各2枚（生肉約60g）使います。まな板を分け、扱った後は手と器具を洗います。",
    "양배추 640g 전량을 잘게 썰어 물기를 빼고 생돼지고기와 따로 둔다. 삼겹살 240g을 여덟 조각으로 잘라 팬케이크 네 장에 각각 두 조각(생고기 약 60g)씩 사용한다. 도마를 분리하고 다룬 뒤 손과 도구를 씻는다.",
    "ซอยกะหล่ำปลี 640 กรัมทั้งหมดให้ละเอียดและสะเด็ดน้ำ แยกจากหมูดิบ ตัดหมูสามชั้น 240 กรัมเป็น 8 ชิ้น ใช้ชิ้นละสองชิ้น (หมูดิบประมาณ 60 กรัม) ต่อแพนเค้ก 4 แผ่น ใช้เขียงแยกและล้างมือกับอุปกรณ์หลังสัมผัส"
  ));

  setBody(recipe, 1, ml(
    "Whisk all 120 g flour, 3 g baking powder, 3 g salt, and 3 g sugar with all 180 ml dashi and 160 g grated nagaimo. Cover and chill this base for 15 minutes; start the timer once it is mixed. Keep the eggs and cabbage cold while it rests.",
    "將全部 120 公克麵粉、3 公克泡打粉、3 公克鹽、3 公克糖與 180 毫升高湯、160 公克山藥泥拌勻。加蓋冷藏 15 分鐘，拌好後開始計時；醒麵糊時讓雞蛋與高麗菜保持冷藏。",
    "小麦粉120g、ベーキングパウダー3g、塩3g、砂糖3g全量に、だし180ml全量とすりおろした長芋160gを混ぜます。覆って冷蔵庫で15分休ませ、混ぜ終わりから計ります。休ませる間、卵とキャベツは冷やしておきます。",
    "밀가루 120g, 베이킹파우더 3g, 소금 3g, 설탕 3g 전량에 다시 180ml와 간 마 160g을 섞는다. 덮어 냉장고에서 15분 쉬게 하고 섞은 뒤부터 시간을 잰다. 쉬는 동안 달걀과 양배추는 차게 둔다.",
    "ผสมแป้ง 120 กรัม ผงฟู 3 กรัม เกลือ 3 กรัม และน้ำตาล 3 กรัมทั้งหมดกับดาชิ 180 มล.และมันยามะขูด 160 กรัม ปิดฝาแช่เย็น 15 นาที เริ่มจับเวลาหลังผสม ระหว่างพักให้เก็บไข่กับกะหล่ำปลีไว้เย็น"
  ));

  setBody(recipe, 2, ml(
    "Beat all four eggs into the chilled base, then fold in all 60 g tenkasu, 30 g pickled ginger, and the drained cabbage. Divide the mixture into four equal portions, one per pancake. Keep the raw pork covered and separate until each round is on the griddle.",
    "將四顆蛋打入冷藏麵糊，再拌入全部 60 公克天婦羅花、30 公克紅薑與瀝乾的高麗菜。將麵糊分成四等份，每份做一張。每張麵糊下鍋後才取出兩片生豬肉，平時加蓋分開保存。",
    "冷やした生地に卵4個全量を混ぜ、天かす60g全量、紅しょうが30g、キャベツを折り込みます。4等分して1枚分ずつにします。生の豚肉は覆って分けておき、各パンケーキを鉄板にのせる時まで出しません。",
    "차게 둔 반죽에 달걀 네 개를 풀어 넣고 덴카스 60g, 초생강 30g 전량과 물기를 뺀 양배추를 섞는다. 네 등분해 한 장씩 만든다. 생돼지고기는 덮어서 따로 두고 각 반죽을 철판에 올릴 때까지 꺼내지 않는다.",
    "ตีไข่ 4 ฟองทั้งหมดลงในแป้งที่แช่เย็น แล้วคลุกเทมปุระกรอบ 60 กรัม ขิงดอง 30 กรัม และกะหล่ำปลีที่สะเด็ดน้ำ แบ่งส่วนผสมเป็น 4 ส่วนเท่า ๆ กัน ส่วนละหนึ่งแผ่น ปิดหมูดิบและแยกไว้จนวางแป้งแต่ละส่วนลงบนกระทะ"
  ));

  setBody(recipe, 3, ml(
    "Heat a griddle or wide skillet to about 200°C over medium heat. Measure all 30 ml oil and brush a thin film on the surface, refreshing it between batches as needed. For each of four portions, shape a 15 cm round about 2 cm thick and place two pork slices on top.",
    "以中火將鐵板或寬平底鍋加熱至約 200°C。量取全部 30 毫升油，薄薄刷在鍋面，分批煎時視需要補刷。四份麵糊各整形成直徑 15 公分、厚約 2 公分的圓餅，表面放兩片豬肉。",
    "鉄板か大きなフライパンを中火で約200°Cに熱します。油30ml全量を計り、薄く塗り、必要に応じて回ごとに塗り足します。4等分した生地を直径15cm、厚さ約2cmの円形に整え、それぞれに豚肉を2枚のせます。",
    "철판이나 넓은 팬을 중불에서 약 200°C로 달군다. 기름 30ml 전량을 계량해 얇게 바르고 배치 사이 필요하면 보충한다. 네 부분의 반죽을 각각 지름 15cm, 두께 약 2cm로 둥글게 만들고 위에 돼지고기 두 조각씩 올린다.",
    "ตั้งกระทะแบนหรือกระทะกว้างไฟกลางให้ร้อนประมาณ 200°C ตวงน้ำมัน 30 มล.ทั้งหมดและทาเป็นฟิล์มบาง เติมระหว่างรอบตามจำเป็น ปั้นแป้งทั้ง 4 ส่วนเป็นวงกลมเส้นผ่านศูนย์กลาง 15 ซม.หนาประมาณ 2 ซม. วางหมูสองชิ้นบนแต่ละแผ่น"
  ));

  setBody(recipe, 4, ml(
    "Start a 5-minute estimate when the batter touches the hot griddle. Cover and cook over medium-low heat until the bottom is golden and the pork begins to render. If the griddle cannot hold all four rounds without crowding, cook two at a time and keep the first batch on a rack in a 65°C oven while finishing the second.",
    "麵糊接觸熱鍋時開始計時，這面約煎 5 分鐘。加蓋以中小火煎至底部金黃、豬肉開始出油。若鍋面無法不擁擠地放四張，就分兩張一批；第一批放在 65°C 烤箱內的網架上保溫，直到第二批完成。",
    "生地が熱い鉄板に触れた時から約5分を目安に計ります。ふたをして中弱火で、底がきつね色になり豚肉の脂が出始めるまで焼きます。4枚が重ならずに入らない場合は2枚ずつ焼き、最初の分は65°Cのオーブン内の網に置いて次の分を焼きます。",
    "반죽이 뜨거운 철판에 닿을 때부터 약 5분을 잰다. 덮고 중약불에서 바닥이 노릇해지고 돼지고기 지방이 녹기 시작할 때까지 굽는다. 네 장이 겹치지 않고 들어가지 않으면 두 장씩 굽고 첫 배치는 65°C 오븐의 망 위에 두어 다음 배치를 마친다.",
    "เริ่มจับเวลาประมาณ 5 นาทีเมื่อแป้งสัมผัสกระทะร้อน ปิดฝาและใช้ไฟกลางอ่อนจนด้านล่างเป็นสีทองและหมูเริ่มคายน้ำมัน หากวางทั้งสี่แผ่นได้ไม่พอดี ให้ทอดครั้งละสองแผ่นและพักรอบแรกบนตะแกรงในเตาอบ 65°C ระหว่างทำรอบที่สอง"
  ));

  setBody(recipe, 5, ml(
    "Slide a clean wide spatula fully under each pancake and flip once. Cover and cook pork-side down for about 5 minutes over medium-low heat. Do not press the rounds; the clock is an estimate, and each pancake still needs the thermometer checks in the next step.",
    "用乾淨寬鍋鏟完整插入每張煎餅下方，只翻面一次。加蓋以中小火煎豬肉面約 5 分鐘。不要壓扁；時間只是估計，接著仍須逐張以溫度計確認。",
    "清潔な幅広のへらを各パンケーキの下にしっかり差し入れ、一度だけ返します。ふたをし、中弱火で豚肉側を下にして約5分焼きます。押さえつけません。時間は目安なので、次の工程で1枚ずつ温度を確認します。",
    "깨끗하고 넓은 뒤집개를 각 팬케이크 아래로 완전히 넣어 한 번만 뒤집는다. 덮고 중약불에서 돼지고기 면을 아래로 약 5분 굽는다. 누르지 않는다. 시간은 예상치이므로 다음 단계에서 한 장씩 온도를 확인한다.",
    "สอดตะหลิวกว้างสะอาดใต้แพนเค้กแต่ละแผ่นให้สุดแล้วพลิกครั้งเดียว ปิดฝาและทอดด้านหมูลงประมาณ 5 นาทีด้วยไฟกลางอ่อน อย่ากดแผ่น เวลาเป็นค่าประมาณ ขั้นถัดไปยังต้องวัดอุณหภูมิทีละแผ่น"
  ));

  setBody(recipe, 6, ml(
    "Uncover, flip once more, and cook about 2 minutes. With a clean thin-probe thermometer, check the centre of each pancake: the egg batter must reach 71°C (160°F). Also check the thickest pork slice in each round: intact pork reaches 63°C (145°F) and then rests for 3 minutes. If either reading is short, cook in 1-minute increments and recheck; time and browning alone are not the safety check. Rest all four on clean plates for 3 minutes.",
    "開蓋再翻一次，約煎 2 分鐘。用乾淨細探針溫度計逐張測中心，含蛋麵糊須達 71°C（160°F）；也測每張最厚的豬肉片，完整豬肉須達 63°C（145°F）並靜置 3 分鐘。若任一未達，續煎並每次加 1 分鐘複測；時間和上色都不能代替安全檢查。四張都放在乾淨盤上靜置 3 分鐘。",
    "ふたを外してもう一度返し、約2分焼きます。清潔な細いプローブの温度計で各パンケーキの中心を測ります。卵入り生地は71°C（160°F）に達させます。各枚の最も厚い豚肉も測り、切り身の豚肉は63°C（145°F）に達した後3分休ませます。どちらかの値に届かなければ1分ずつ加熱して測り直します。時間や焼き色だけでは安全確認になりません。4枚とも清潔な皿で3分休ませます。",
    "뚜껑을 열고 다시 한 번 뒤집어 약 2분 굽는다. 깨끗한 가는 탐침 온도계로 팬케이크마다 가운데를 잰다. 달걀 반죽은 71°C (160°F)에 도달해야 한다. 각 장의 가장 두꺼운 돼지고기도 재며, 통돼지고기 조각은 63°C (145°F)에 도달한 뒤 3분 쉰다. 어느 하나라도 미달이면 1분씩 더 익히고 다시 잰다. 시간과 갈색만으로 안전을 확인할 수 없다. 네 장 모두 깨끗한 접시에서 3분 쉰다.",
    "เปิดฝา พลิกอีกครั้งและทอดประมาณ 2 นาที ใช้เทอร์โมมิเตอร์หัวเล็กสะอาดวัดกลางแพนเค้กแต่ละแผ่น แป้งที่มีไข่ต้องถึง 71°C (160°F) และวัดหมูชิ้นหนาที่สุดของแต่ละแผ่นด้วย หมูชิ้นไม่บดต้องถึง 63°C (145°F) แล้วพัก 3 นาที หากค่าใดไม่ถึงให้ทอดต่อครั้งละ 1 นาทีแล้ววัดซ้ำ เวลาและสีเกรียมไม่ใช่การตรวจความปลอดภัย พักทั้งสี่แผ่นบนจานสะอาด 3 นาที"
  ));

  setBody(recipe, 7, ml(
    "For each of the four pancakes, measure 30 g sauce, 20 g mayonnaise, 1 g aonori, and 2 g bonito flakes. This uses the full 120 g sauce, 80 g mayonnaise, 4 g aonori, and 8 g bonito listed. Serve one pancake per person after its 3-minute rest.",
    "四張煎餅各量取 30 公克醬汁、20 公克美乃滋、1 公克海苔粉與 2 公克柴魚片，正好用完所列 120 公克醬汁、80 公克美乃滋、4 公克海苔粉和 8 公克柴魚片。每人一張，靜置 3 分鐘後上桌。",
    "4枚それぞれにソース30g、マヨネーズ20g、青のり1g、かつお節2gを計量します。表示したソース120g、マヨネーズ80g、青のり4g、かつお節8gを使い切ります。3分休ませた後、1人1枚ずつ出します。",
    "네 장마다 소스 30g, 마요네즈 20g, 아오노리 1g, 가쓰오부시 2g씩 계량한다. 표시된 소스 120g, 마요네즈 80g, 아오노리 4g, 가쓰오부시 8g을 모두 사용한다. 3분 쉰 뒤 1인당 한 장씩 낸다.",
    "ตวงซอส 30 กรัม มายองเนส 20 กรัม อาโอโนริ 1 กรัม และปลาโอแห้ง 2 กรัมต่อแพนเค้กทั้งสี่แผ่น ใช้ซอส 120 กรัม มายองเนส 80 กรัม อาโอโนริ 4 กรัม และปลาโอ 8 กรัมตามรายการครบ เสิร์ฟคนละหนึ่งแผ่นหลังพัก 3 นาที"
  ));

  recipe.storage = ml(
    "Refrigerate cooked pancakes and toppings separately in shallow containers within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. Use within 2 days for best texture; this is a quality preference, while official guidance allows cooked leftovers 3–4 days. Reheat only the portion needed until the pancake centre reaches 74°C/165°F, then add fresh measured toppings. The 71°C/160°F egg-dish and 63°C/145°F pork-plus-rest values are cooking standards; 74°C/165°F is for reheating leftovers.",
    "熟煎餅與配料分別裝入淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。為保持口感，建議 2 天內食用；這是品質偏好，官方指引允許熟食剩菜冷藏 3–4 天。只取所需份量復熱至煎餅中心達 74°C/165°F，再加新鮮且量好的配料。71°C/160°F 蛋料理與 63°C/145°F 豬肉加靜置是烹煮標準；74°C/165°F 是剩菜復熱標準。",
    "調理済みのパンケーキとトッピングは浅い容器に別々に入れ、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。食感のため2日以内を勧めますが、これは品質上の目安です。公式指針では調理済みの残り物は3〜4日です。食べる分だけ中心を74°C/165°Fまで再加熱し、新しいトッピングをのせます。卵料理の71°C/160°Fと豚肉の63°C/145°F＋休ませる時間は調理基準で、74°C/165°Fは残り物の再加熱用です。",
    "익힌 팬케이크와 토핑을 얕은 용기에 따로 담아 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 식감을 위해 2일 이내 섭취를 권하지만 이는 품질 선호다. 공식 지침은 익힌 남은 음식을 3–4일 보관하도록 허용한다. 먹을 만큼만 팬케이크 중심이 74°C/165°F가 되게 재가열한 뒤 새 토핑을 올린다. 달걀 요리 71°C/160°F와 돼지고기 63°C/145°F 및 휴지는 조리 기준이고, 74°C/165°F는 남은 음식 재가열 기준이다.",
    "แช่แพนเค้กที่สุกและท็อปปิงแยกกันในภาชนะตื้นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เพื่อเนื้อสัมผัสแนะนำให้ใช้ใน 2 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วนแนวทางทางการระบุอาหารปรุงสุกเหลือได้ 3–4 วัน อุ่นเฉพาะส่วนที่จะกินจนกลางแผ่นถึง 74°C/165°F แล้วเติมท็อปปิงใหม่ ค่า 71°C/160°F สำหรับอาหารไข่และ 63°C/145°F บวกเวลาพักสำหรับหมูเป็นเกณฑ์ปรุง ส่วน 74°C/165°F ใช้กับอาหารเหลือที่นำมาอุ่น"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: What You Need to Know About Egg Safety", eggSafety);
}

function reviseSaladeLyonnaise(recipe) {
  setBody(recipe, 0, ml(
    "Wash and thoroughly dry all 250 g lettuce; keep it chilled and separate from the raw bacon. Cut all 120 g bread into 2 cm cubes, cut 150 g bacon into short strips, and chop 30 g shallot. These amounts make four plates; do not dress the leaves until serving.",
    "將全部 250 公克生菜洗淨並徹底擦乾，冷藏並與生培根分開。全部 120 公克麵包切成 2 公分方塊，150 公克培根切條，30 公克紅蔥頭切碎。份量可做四盤；上桌前才拌醬。",
    "レタス250g全量を洗ってよく乾かし、冷蔵して生のベーコンと分けます。パン120g全量を2cm角に切り、ベーコン150gを短冊に、エシャロット30gをみじん切りにします。4皿分です。葉は盛り付ける直前までドレッシングと和えません。",
    "양상추 250g 전량을 씻어 완전히 말리고 차게 보관하며 생베이컨과 분리한다. 빵 120g은 2cm 큐브로, 베이컨 150g은 짧은 조각으로 자르고 샬롯 30g은 잘게 썬다. 네 접시 분량이며 상에 내기 전까지 잎에 드레싱을 뿌리지 않는다.",
    "ล้างผักสลัด 250 กรัมทั้งหมดและเช็ดให้แห้งสนิท แช่เย็นและแยกจากเบคอนดิบ ตัดขนมปัง 120 กรัมทั้งหมดเป็นลูกเต๋า 2 ซม. หั่นเบคอน 150 กรัมเป็นเส้นสั้นและสับหอมแดง 30 กรัม ปริมาณนี้ทำได้ 4 จาน อย่าคลุกน้ำสลัดจนกว่าจะเสิร์ฟ"
  ));

  setBody(recipe, 2, ml(
    "While the croutons toast, cook all 150 g bacon over medium heat for 6–8 minutes until crisp at the edges. Measure 15 ml rendered fat for the dressing; if the bacon yields less, top it up from the reserved 20 ml olive oil, then add the remaining olive oil to the dressing. Keep cooked bacon on a clean plate.",
    "麵包丁烘烤時，以中火煎全部 150 公克培根 6–8 分鐘，至邊緣酥脆。量取 15 毫升培根油作醬汁；若出油不足，從預留 20 毫升橄欖油中補足，再把剩餘橄欖油加入醬汁。熟培根放在乾淨盤上。",
    "クルトンを焼いている間に、ベーコン150g全量を中火で6〜8分、縁がカリッとするまで焼きます。ドレッシング用に出た脂を15ml計ります。足りなければ取り分けたオリーブ油20mlから補い、残りはドレッシングに加えます。焼いたベーコンは清潔な皿に置きます。",
    "크루통을 굽는 동안 베이컨 150g 전량을 중불에서 가장자리가 바삭해질 때까지 6–8분 익힌다. 드레싱에 쓸 베이컨 기름 15ml를 계량한다. 부족하면 남겨 둔 올리브유 20ml에서 보충하고 나머지 올리브유는 드레싱에 넣는다. 익힌 베이컨은 깨끗한 접시에 둔다.",
    "ระหว่างอบขนมปังกรอบ ทอดเบคอน 150 กรัมทั้งหมดด้วยไฟกลาง 6–8 นาทีจนขอบกรอบ ตวงไขมันที่ได้ 15 มล.สำหรับน้ำสลัด หากได้น้อยให้เติมจากน้ำมันมะกอก 20 มล.ที่แบ่งไว้ แล้วใส่น้ำมันมะกอกที่เหลือลงในน้ำสลัด วางเบคอนสุกบนจานสะอาด"
  ));

  setBody(recipe, 3, ml(
    "Soften all 30 g shallot in the measured bacon fat for 1–2 minutes over low heat. Remove from heat, then whisk in all 20 ml red wine vinegar, all 10 g mustard, and the remainder of the 20 ml olive oil reserved for dressing after any top-up used to measure 15 ml total fat. The separate 10 ml olive oil was used for croutons. Add all 0.5 g pepper; taste before using any of the optional 1 g salt.",
    "以小火用量好的培根油炒軟全部 30 公克紅蔥頭，約 1–2 分鐘。離火後拌入全部 20 毫升紅酒醋、全部 10 公克芥末，以及預留給醬汁的 20 毫升橄欖油扣除剛才用來補足 15 毫升培根油的部分；另有 10 毫升橄欖油已用於麵包丁。加入全部 0.5 公克胡椒；試味後再決定是否使用最多 1 公克鹽。",
    "計量したベーコン脂でエシャロット30g全量を弱火で1〜2分しんなりさせます。火から下ろし、赤ワイン酢20ml全量、マスタード10g全量、ドレッシング用に取り分けたオリーブ油20mlから、脂を合計15mlにするため補った分を除いて混ぜます。別のオリーブ油10mlはクルトンに使いました。こしょう0.5g全量を加え、任意の塩1gは味見後に使います。",
    "계량한 베이컨 기름에 샬롯 30g 전량을 약불에서 1–2분 부드럽게 볶는다. 불에서 내리고 레드와인식초 20ml와 머스터드 10g 전량, 드레싱용으로 남긴 올리브유 20ml 중 베이컨 기름 총 15ml를 맞추기 위해 보충한 양을 뺀 나머지를 섞는다. 별도 올리브유 10ml는 크루통에 썼다. 후추 0.5g 전량을 넣고 선택 소금 1g은 맛을 본 뒤 사용한다.",
    "ผัดหอมแดง 30 กรัมทั้งหมดในไขมันเบคอนที่ตวงไว้ด้วยไฟอ่อน 1–2 นาทีจนใส ยกลงจากไฟแล้วตีผสมน้ำส้มสายชูไวน์แดง 20 มล.และมัสตาร์ด 10 กรัมทั้งหมด จากนั้นเติมน้ำมันมะกอก 20 มล.ที่กันไว้สำหรับน้ำสลัด โดยหักส่วนที่ใช้เติมให้ไขมันเบคอนครบ 15 มล. น้ำมันมะกอกอีก 10 มล.ใช้กับขนมปังกรอบแล้ว ใส่พริกไทย 0.5 กรัมทั้งหมด ชิมก่อนเติมเกลือที่เลือกใช้ได้ไม่เกิน 1 กรัม"
  ));

  setBody(recipe, 4, ml(
    "Use only the four commercially pasteurized shell eggs listed for soft yolks. Keep them refrigerated until poaching; crack each into its own cup and slide gently into water held at 85–90°C with all 15 ml poaching vinegar. Poach two eggs at a time for about 3–4 minutes, until the whites are set and yolks remain soft. That soft-yolk result depends on pasteurized eggs; do not substitute ordinary unpasteurized eggs unless cooking yolks and whites firm.",
    "軟蛋黃只使用所列四顆商用巴氏殺菌帶殼蛋。下鍋前保持冷藏，每顆分別打入小杯，再輕放入維持 85–90°C、含全部 15 毫升水煮醋的水中。每次煮兩顆約 3–4 分鐘，至蛋白凝固、蛋黃仍軟。這種軟蛋黃做法須用巴氏殺菌蛋；普通未殺菌蛋若要替代，必須將蛋白與蛋黃都煮至凝固。",
    "半熟の黄身には、表示した市販の殻付き殺菌済み卵4個だけを使います。ポーチするまで冷蔵し、1個ずつ別々のカップに割り入れます。計量した酢15ml全量を加え85〜90°Cに保った湯に静かに入れ、2個ずつ約3〜4分、白身が固まり黄身が柔らかい状態までゆでます。この半熟仕上げには殺菌済み卵が必要です。通常の未殺菌卵に置き換える場合は黄身と白身を固くなるまで加熱します。",
    "부드러운 노른자를 위해 표시된 시판 살균 껍질 달걀 네 개만 사용한다. 수란을 만들 때까지 냉장하고 하나씩 각각 컵에 깬 뒤, 계량한 식초 15ml 전량을 넣어 85–90°C로 유지한 물에 부드럽게 넣는다. 두 개씩 약 3–4분 익혀 흰자는 굳고 노른자는 부드럽게 둔다. 이런 반숙은 살균 달걀을 사용할 때만 가능하다. 일반 비살균 달걀로 바꾸면 노른자와 흰자를 모두 단단해질 때까지 익힌다.",
    "ใช้เฉพาะไข่เปลือกพาสเจอร์ไรซ์เชิงพาณิชย์ 4 ฟองตามรายการสำหรับไข่แดงนุ่ม แช่เย็นไว้จนจะลวก ตอกแต่ละฟองใส่ถ้วยแยกแล้วค่อย ๆ หย่อนลงในน้ำ 85–90°C ที่ใส่น้ำส้มสายชูสำหรับลวก 15 มล.ทั้งหมด ลวกครั้งละสองฟองประมาณ 3–4 นาทีจนไข่ขาวอยู่ตัวและไข่แดงยังนุ่ม ผลลัพธ์ไข่แดงนุ่มนี้ต้องใช้ไข่พาสเจอร์ไรซ์ หากใช้ไข่ธรรมดาที่ไม่พาสเจอร์ไรซ์ ต้องปรุงไข่แดงและไข่ขาวให้สุกแข็ง"
  ));

  setBody(recipe, 5, ml(
    "Divide the 250 g lettuce among four plates (about 62 g each) and toss lightly with warm, not hot, vinaigrette. Add 30 g croutons and 37.5 g bacon to each plate, then one freshly poached egg. Use all 5 g parsley across the plates and serve immediately; keep any extra dressing separate.",
    "將 250 公克生菜分成四盤（每盤約 62 公克），以溫熱而非燙熱的醬汁輕拌。每盤放 30 公克麵包丁、37.5 公克培根與一顆現煮水波蛋。全部 5 公克巴西里分撒四盤，立即上桌；多餘醬汁另放。",
    "レタス250gを4皿（約62gずつ）に分け、熱すぎない温かいドレッシングで軽く和えます。各皿にクルトン30g、ベーコン37.5g、作りたてのポーチドエッグ1個をのせます。パセリ5g全量を4皿に散らし、すぐに出します。余ったドレッシングは別にします。",
    "양상추 250g을 네 접시(각 약 62g)에 나누고 뜨겁지 않고 따뜻한 드레싱에 가볍게 버무린다. 접시마다 크루통 30g, 베이컨 37.5g, 갓 만든 수란 하나를 올린다. 파슬리 5g 전량을 네 접시에 나눠 뿌리고 바로 낸다. 남은 드레싱은 따로 둔다.",
    "แบ่งผักสลัด 250 กรัมลง 4 จาน (จานละประมาณ 62 กรัม) คลุกน้ำสลัดอุ่นแต่ไม่ร้อนจัดเบา ๆ ใส่ขนมปังกรอบ 30 กรัมและเบคอน 37.5 กรัมต่อจาน ตามด้วยไข่ลวกสดหนึ่งฟอง แบ่งพาร์สลีย์ 5 กรัมทั้งหมดให้ครบสี่จานและเสิร์ฟทันที แยกน้ำสลัดที่เหลือ"
  ));

  recipe.storage = ml(
    "Do not store the assembled, dressed salad. Refrigerate leftover cooked bacon and poached eggs in separate shallow containers within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F; use within 3–4 days. The leaves and croutons keep their best texture for about 1 day when stored separately. Reheat egg and bacon leftovers to 74°C/165°F throughout; the yolk will firm. For the intended soft-yolk texture, poach pasteurized eggs fresh at serving.",
    "不要保存已拌醬的沙拉。剩餘熟培根與水波蛋分別放入淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下，3–4 天內食用。生菜與麵包丁分開保存，口感最佳約 1 天。復熱剩餘蛋與培根至各處達 74°C/165°F；蛋黃會變硬。想保留軟蛋黃口感，請在上桌時新煮巴氏殺菌蛋。",
    "ドレッシングを和えたサラダは保存しません。残ったベーコンとポーチドエッグは別々の浅い容器に入れ、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3〜4日以内に使います。葉とクルトンは別に保存し、食感のため約1日以内が適します。卵とベーコンの残り物は全体を74°C/165°Fまで再加熱します。黄身は固くなります。柔らかい黄身に仕上げるには、提供時に殺菌済み卵を新たにポーチします。",
    "드레싱에 버무린 샐러드는 보관하지 않는다. 남은 익힌 베이컨과 수란은 얕은 용기에 따로 담아 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장하고 3–4일 안에 먹는다. 잎과 크루통은 따로 보관하며 식감을 위해 약 하루 이내가 좋다. 남은 달걀과 베이컨은 전체가 74°C/165°F가 되게 재가열한다. 노른자는 단단해진다. 부드러운 노른자를 원하면 낼 때 살균 달걀을 새로 수란한다.",
    "อย่าเก็บสลัดที่คลุกน้ำสลัดแล้ว เบคอนและไข่ลวกที่เหลือให้แช่ในภาชนะตื้นแยกกันภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F และใช้ภายใน 3–4 วัน ผักและขนมปังกรอบเก็บแยกกันเพื่อคงเนื้อสัมผัสที่ดีที่สุดประมาณ 1 วัน อุ่นไข่และเบคอนที่เหลือให้ทั่วถึง 74°C/165°F ไข่แดงจะแข็ง หากต้องการไข่แดงนุ่ม ให้ลวกไข่พาสเจอร์ไรซ์ใหม่ตอนเสิร์ฟ"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
  addOfficial(recipe, "FDA: What You Need to Know About Egg Safety", eggSafety);
}

function reviseBakedMacAndCheese(recipe) {
  recipe.cookMinutes = 50;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;

  setBody(recipe, 0, ml(
    "Bring a large pot of water to a boil. Use 6 g of the listed 8 g salt in the pasta water and reserve 2 g for the sauce. Cook all 450 g macaroni for 2 minutes less than its package time; the pieces should bend but keep a firm centre because they finish in the oven. Drain well and do not taste uncooked pasta.",
    "將一大鍋水煮沸。所列 8 公克鹽中取 6 公克加入煮麵水，另留 2 公克給醬汁。全部 450 公克通心粉依包裝時間少煮 2 分鐘；麵條可彎但中心仍硬，因為還要入烤箱。瀝乾，不要試吃未煮熟的麵。",
    "大きな鍋で湯を沸かします。表示した塩8gのうち6gをゆで湯に使い、2gはソース用に残します。マカロニ450g全量を表示時間より2分短くゆでます。曲がるが中心に芯が残る程度にし、オーブンで仕上げます。よく湯を切り、生のパスタは味見しません。",
    "큰 냄비에 물을 끓인다. 표시된 소금 8g 중 6g은 면수에 넣고 2g은 소스용으로 남긴다. 마카로니 450g 전량을 포장 조리 시간보다 2분 짧게 삶는다. 구부러지지만 가운데는 단단하게 남겨 오븐에서 익힌다. 물기를 잘 빼고 익히지 않은 파스타를 맛보지 않는다.",
    "ต้มน้ำในหม้อใบใหญ่ ใช้เกลือ 8 กรัมตามรายการ 6 กรัมในน้ำต้มพาสตาและกันไว้ 2 กรัมสำหรับซอส ต้มมักกะโรนี 450 กรัมทั้งหมดให้น้อยกว่าเวลาบนห่อ 2 นาที เส้นควรงอได้แต่ตรงกลางยังแน่นเพราะจะอบต่อ สะเด็ดน้ำให้ดีและอย่าชิมพาสต้าที่ยังไม่สุก"
  ));

  setBody(recipe, 1, ml(
    "Stir all 70 g panko with all 25 g melted butter until lightly coated; keep this crumb mixture for the top. The separate 45 g butter is reserved for the roux.",
    "將全部 70 公克麵包粉與 25 公克融化奶油拌勻，薄薄裹住麵包粉，留作表層；另列的 45 公克奶油留給白醬麵糊。",
    "パン粉70g全量と溶かしバター25g全量を混ぜ、全体に薄くまとわせて上面用に取っておきます。別に表示したバター45gはルーに使います。",
    "판코 70g 전량과 녹인 버터 25g 전량을 섞어 가볍게 코팅하고 윗면용으로 둔다. 따로 표시된 버터 45g은 루용으로 남긴다.",
    "คลุกเกล็ดขนมปัง 70 กรัมทั้งหมดกับเนยละลาย 25 กรัมทั้งหมดให้เคลือบบาง ๆ แล้วพักไว้โรยหน้า เนยอีก 45 กรัมที่แยกไว้ใช้ทำรูซ์"
  ));

  setBody(recipe, 3, ml(
    "Whisk in all 750 ml warm milk gradually, then all 240 ml cream. Bring back to a gentle simmer and start a 5–7-minute estimate when small bubbles return; whisk often until the sauce coats a spoon. Do not boil hard.",
    "逐步拌入全部 750 毫升溫牛奶，再加入全部 240 毫升鮮奶油。恢復小泡後開始估計 5–7 分鐘，常攪拌至醬汁能薄薄裹住湯匙；不要大滾。",
    "温めた牛乳750ml全量を少しずつ混ぜ、クリーム240ml全量を加えます。小さな泡が戻ったら5〜7分を目安に計り、時々混ぜてスプーンに薄くまとわりつく濃度にします。強く沸騰させません。",
    "따뜻한 우유 750ml 전량을 조금씩 휘저어 넣고 크림 240ml 전량을 넣는다. 작은 기포가 다시 생기면 5–7분을 재며 자주 저어 숟가락을 얇게 감싸는 농도로 만든다. 세게 끓이지 않는다.",
    "ค่อย ๆ คนใส่นมอุ่น 750 มล.ทั้งหมด แล้วเติมครีม 240 มล.ทั้งหมด เริ่มจับเวลาประมาณ 5–7 นาทีเมื่อมีฟองเล็ก ๆ กลับมา คนบ่อย ๆ จนซอสเคลือบช้อนบาง ๆ อย่าต้มเดือดแรง"
  ));

  setBody(recipe, 4, ml(
    "Take the pan off the heat. Stir in all 420 g cheddar and 90 g Gruyère a handful at a time until melted. Season with all 2 g pepper and all 2 g dry mustard; add the reserved 2 g salt gradually, tasting before the final pinch because the cheeses are already salty.",
    "離火後分次拌入全部 420 公克切達起司與 90 公克葛瑞爾起司，至融化。加入全部 2 公克胡椒與全部 2 公克芥末粉；預留的 2 公克鹽分次添加，最後再試味，因起司已有鹹度。",
    "火から下ろし、チェダー420g全量とグリュイエール90g全量をひとつかみずつ加えて溶かします。こしょう2g全量とマスタード2g全量を加えます。取り分けた塩2gはチーズの塩気を見ながら少しずつ加え、最後に味見します。",
    "불에서 내리고 체더 420g과 그뤼에르 90g 전량을 한 줌씩 넣어 녹인다. 후추 2g과 마른 머스터드 2g 전량을 넣는다. 남겨 둔 소금 2g은 치즈의 짠맛을 고려해 조금씩 넣고 마지막에 맛을 본다.",
    "ยกหม้อลงจากไฟ ใส่เชดดาร์ 420 กรัมและกรูแยร์ 90 กรัมทั้งหมดทีละกำมือ คนจนละลาย ใส่พริกไทย 2 กรัมและมัสตาร์ดแห้ง 2 กรัมทั้งหมด ค่อย ๆ เติมเกลือ 2 กรัมที่แบ่งไว้โดยชิมก่อนเติมหยิบสุดท้ายเพราะชีสมีรสเค็มอยู่แล้ว"
  ));

  setBody(recipe, 5, ml(
    "Fold all 450 g drained macaroni through the sauce until coated, then transfer to an ovenproof dish without adding unlisted butter. This recipe makes eight portions; 450 g dry pasta is about 56 g per serving before cooking.",
    "將瀝乾的 450 公克通心粉全部拌入醬汁，再移入耐烤容器，不另加未列出的奶油。全份為八人份；每份烹煮前約 56 公克乾麵。",
    "湯を切ったマカロニ450g全量をソースに混ぜて全体を絡め、材料にないバターを加えず耐熱皿に移します。8人分で、調理前の乾麺は1人あたり約56gです。",
    "물기를 뺀 마카로니 450g 전량을 소스에 넣어 고루 코팅한 뒤 목록에 없는 버터를 더하지 않고 오븐용 그릇에 옮긴다. 여덟 인분이며 조리 전 마른 파스타는 1인분 약 56g이다.",
    "คลุกมักกะโรนีที่สะเด็ดน้ำ 450 กรัมทั้งหมดกับซอสให้ทั่ว แล้วย้ายลงภาชนะทนเตาอบโดยไม่เติมเนยที่ไม่ได้ระบุ สูตรนี้แบ่งได้ 8 ที่ พาสตาแห้งก่อนปรุงประมาณ 56 กรัมต่อที่"
  ));

  setBody(recipe, 6, ml(
    "Scatter all buttered panko evenly over the dish. Bake in the preheated 190°C oven for an estimated 20–25 minutes, until the edges bubble. Check the centre with a clean thermometer: a meatless casserole must reach 74°C (165°F). If it has not, bake in 3-minute increments and recheck; golden crumbs and bubbling edges are texture cues, not the safety endpoint.",
    "將全部奶油麵包粉均勻撒在表面。放入預熱至 190°C 的烤箱，估計烤 20–25 分鐘，至邊緣冒泡。用乾淨溫度計測中心；不含肉的焗烤菜須達 74°C（165°F）。未達時每次續烤 3 分鐘再測；金黃表層與冒泡是口感指標，不是安全終點。",
    "バターを混ぜたパン粉全量を上に均等に散らします。190°Cに予熱したオーブンで20〜25分を目安に、縁が泡立つまで焼きます。清潔な温度計で中心を測ります。肉を含まないキャセロールは74°C（165°F）が必要です。未達なら3分ずつ追加して測り直します。パン粉の色と泡は食感の目安で、安全基準ではありません。",
    "버터를 섞은 판코 전량을 위에 고르게 뿌린다. 190°C로 예열한 오븐에서 약 20–25분, 가장자리에 거품이 생길 때까지 굽는다. 깨끗한 온도계로 가운데를 잰다. 고기가 없는 캐서롤은 74°C (165°F)에 도달해야 한다. 미달이면 3분씩 더 굽고 다시 잰다. 빵가루 색과 거품은 식감 지표이지 안전 기준이 아니다.",
    "โรยเกล็ดขนมปังเนยทั้งหมดให้ทั่ว อบในเตา 190°C ที่อุ่นไว้ประมาณ 20–25 นาทีจนขอบเดือดปุด ใช้เทอร์โมมิเตอร์สะอาดวัดตรงกลาง หม้ออบที่ไม่มีเนื้อต้องถึง 74°C (165°F) หากยังไม่ถึงให้อบเพิ่มครั้งละ 3 นาทีแล้ววัดซ้ำ สีทองและฟองที่ขอบเป็นสัญญาณด้านเนื้อสัมผัส ไม่ใช่เกณฑ์ความปลอดภัย"
  ));

  setBody(recipe, 7, ml(
    "After the centre passes 74°C, rest the dish for 10 minutes so the sauce settles. Divide into eight equal portions; the 510 g cheese blend works out to about 64 g per serving before melting. Serve warm.",
    "中心確認達 74°C 後靜置 10 分鐘，讓醬汁定住。平均分成八份；融化前所列 510 公克起司混合物，每份約 64 公克。趁溫熱上桌。",
    "中心が74°Cに達したことを確認してから10分休ませ、ソースを落ち着かせます。8等分します。溶かす前のチーズ510g全量は1人分約64gです。温かいうちに出します。",
    "가운데가 74°C에 도달한 뒤 10분 둬 소스를 안정시킨다. 여덟 등분한다. 녹이기 전 치즈 혼합물 510g 전량은 1인분 약 64g이다. 따뜻하게 낸다.",
    "เมื่อยืนยันว่าตรงกลางถึง 74°C แล้ว พักจาน 10 นาทีให้ซอสเซตตัว แบ่งเป็น 8 ส่วนเท่า ๆ กัน ชีสผสม 510 กรัมก่อนละลายคิดเป็นประมาณ 64 กรัมต่อที่ เสิร์ฟขณะอุ่น"
  ));

  recipe.storage = ml(
    "Cool in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. Use within 3 days for best texture; this is a quality preference, while FoodSafety.gov lists cooked leftovers at 3–4 days. Reheat only the portion needed, covered, until the centre reaches 74°C/165°F; stir midway if microwaving to even the heat.",
    "分裝淺容器放涼，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。為保持口感，建議 3 天內食用；這是品質偏好，FoodSafety.gov 對熟食剩菜列為 3–4 天。只取所需份量加蓋復熱至中心達 74°C/165°F；微波時中途攪拌，使受熱均勻。",
    "浅い容器に分けて冷まし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。食感のため3日以内を勧めますが、これは品質上の目安です。FoodSafety.govは調理済みの残り物を3〜4日としています。食べる分だけふたをして中心を74°C/165°Fまで再加熱します。電子レンジなら途中で混ぜ、熱を均一にします。",
    "얕은 용기에 나눠 담아 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 식감을 위해 3일 이내 섭취를 권하지만 이는 품질 선호다. FoodSafety.gov는 조리된 남은 음식을 3–4일로 안내한다. 먹을 만큼만 덮어서 중심이 74°C/165°F가 될 때까지 재가열한다. 전자레인지를 쓰면 중간에 저어 고르게 데운다.",
    "แบ่งใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เพื่อเนื้อสัมผัสที่ดีที่สุดให้ใช้ใน 3 วัน ซึ่งเป็นความชอบด้านคุณภาพ ส่วน FoodSafety.gov ระบุอาหารเหลือปรุงสุก 3–4 วัน อุ่นเฉพาะส่วนที่ต้องการโดยปิดฝาจนตรงกลางถึง 74°C/165°F หากใช้ไมโครเวฟให้คนกลางทางเพื่อให้ร้อนทั่ว"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

export function refineSixtiethMethods(recipes) {
  const targets = ["scallion-pancakes", "okonomiyaki", "baked-mac-and-cheese", "salade-lyonnaise"];
  for (const id of targets) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error("Recipe method audit 60: missing recipe " + id);
    const revised = cloneForPublication(recipes[index]);
    if (id === "scallion-pancakes") reviseScallionPancakes(revised);
    if (id === "okonomiyaki") reviseOkonomiyaki(revised);
    if (id === "baked-mac-and-cheese") reviseBakedMacAndCheese(revised);
    if (id === "salade-lyonnaise") reviseSaladeLyonnaise(revised);
    recipes[index] = revised;
  }
  return recipes;
}
