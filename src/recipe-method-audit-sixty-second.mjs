const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function cloneForPublication(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({ ...row, amount: typeof row.amount === "object" ? { ...row.amount } : row.amount, item: typeof row.item === "object" ? { ...row.item } : row.item })),
    instructions: recipe.instructions.map((step) => ({ ...step, title: { ...step.title }, body: { ...step.body } })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function body(recipe, index, localized) {
  recipe.instructions[index].body = localized;
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

function reviseBirria(recipe) {
  recipe.prepMinutes = 290;
  recipe.cookMinutes = 210;
  recipe.totalMinutes = 500;
  body(recipe, 0, ml(
    "Pat all 2.2 kg beef dry and rub with 8 g of the listed 16 g salt. Refrigerate it while preparing the adobo; the 4-hour minimum chilled marinade is included in the 290-minute prep estimate (about 50 minutes hands-on plus 240 minutes marinating). Keep raw-beef utensils separate from garnish tools.",
    "將 2.2 公斤牛肉擦乾，以所列 16 公克鹽中的 8 公克均勻調味。準備醃醬時將牛肉冷藏；至少冷藏醃 4 小時已計入 290 分鐘備料時間（約 50 分鐘操作加 240 分鐘醃漬）。生牛肉器具與配料器具分開。",
    "牛肉2.2kgの水気を拭き、表示した塩16gのうち8gを全体にすり込みます。アドボを準備する間は冷蔵します。最低4時間の冷蔵マリネを準備時間290分（作業約50分＋漬け込み240分）に含めています。生肉用の器具を薬味用と分けます。",
    "소고기 2.2kg의 물기를 닦고 표시된 소금 16g 중 8g을 골고루 문지른다. 아도보를 준비하는 동안 냉장한다. 최소 4시간 냉장 재우기는 준비 시간 290분(작업 약 50분+재우기 240분)에 포함된다. 생고기 도구는 고명 도구와 분리한다.",
    "ซับเนื้อวัว 2.2 กก.ให้แห้งและถูเกลือ 8 กรัมจากทั้งหมด 16 กรัมให้ทั่ว แช่เย็นระหว่างเตรียมอาโดโบ เวลาหมักเย็นอย่างน้อย 4 ชั่วโมงรวมอยู่ในเวลาเตรียม 290 นาที (ลงมือประมาณ 50 นาทีและหมัก 240 นาที) แยกอุปกรณ์เนื้อดิบจากอุปกรณ์เครื่องเคียง"
  ));
  body(recipe, 5, ml(
    "Blend all softened chiles, the 450 g charred tomatoes, 90 g of the 180 g onion, all 6 garlic cloves, 120 ml vinegar, the toasted spices, oregano, cinnamon, 250 ml of the listed water, and the remaining 8 g salt until smooth. Reserve the other 90 g onion for serving; the remaining 1,550 ml water goes into the braising pot.",
    "將泡軟辣椒、全部 450 公克烤番茄、180 公克洋蔥中的 90 公克、全部 6 瓣蒜、120 毫升醋、烘香香料、牛至、肉桂、所列水中的 250 毫升及剩餘 8 公克鹽打至滑順。另 90 公克洋蔥留作上桌配料；剩餘 1,550 毫升水加入燉鍋。",
    "戻した唐辛子、焼いたトマト450g全量、玉ねぎ180gのうち90g、にんにく6片全量、酢120ml、炒った香辛料、オレガノ、シナモン、表示した水のうち250ml、残りの塩8gをなめらかに攪拌します。残り90gの玉ねぎは盛り付け用に取っておき、残りの水1,550mlは煮込み鍋に使います。",
    "불린 고추, 구운 토마토 450g 전량, 양파 180g 중 90g, 마늘 6쪽 전량, 식초 120ml, 볶은 향신료, 오레가노, 계피, 표시된 물 250ml, 남은 소금 8g을 곱게 간다. 남은 양파 90g은 고명용으로 두고 나머지 물 1,550ml는 냄비에 넣는다.",
    "ปั่นพริกที่แช่นิ่ม มะเขือเทศย่าง 450 กรัมทั้งหมด หอมหัวใหญ่ 90 กรัมจาก 180 กรัม กระเทียม 6 กลีบทั้งหมด น้ำส้มสายชู 120 มล. เครื่องเทศคั่ว ออริกาโน อบเชย น้ำ 250 มล.จากที่ระบุ และเกลือที่เหลือ 8 กรัมจนเนียน เก็บหอมหัวใหญ่ 90 กรัมที่เหลือไว้โรยหน้า และใช้น้ำอีก 1,550 มล.ในหม้อตุ๋น"
  ));
  body(recipe, 6, ml(
    "Coat every beef piece with the adobo, cover, and marinate in the refrigerator for at least 4 hours or overnight. Do not marinate on the counter. The clock time here is elapsed chilling time, not hands-on prep; if making the same day, start early enough for the full 4 hours.",
    "讓醃醬完整包覆每塊牛肉，蓋好冷藏至少 4 小時或隔夜；不可在室溫醃肉。此處時間是冷藏經過時間，不是動手備料時間；若當天製作，請預留完整 4 小時。",
    "アドボを牛肉全体に絡め、覆って冷蔵庫で最低4時間または一晩漬けます。室温では漬けません。ここでの時間は冷蔵の経過時間で、作業時間ではありません。当日作る場合は4時間を確保してください。",
    "아도보가 고기 전체를 덮도록 버무리고 뚜껑을 덮어 냉장고에서 최소 4시간 또는 하룻밤 재운다. 실온에서 재우지 않는다. 이 시간은 실제 작업이 아닌 냉장 경과 시간이다. 당일 만들 경우 4시간을 확보한다.",
    "คลุกอาโดโบให้เคลือบเนื้อทุกชิ้น ปิดฝาและหมักในตู้เย็นอย่างน้อย 4 ชั่วโมงหรือข้ามคืน ห้ามหมักบนเคาน์เตอร์ เวลานี้เป็นเวลาหมักที่ผ่านไป ไม่ใช่เวลาลงมือ หากทำวันเดียวกันให้เผื่อเวลาเต็ม 4 ชั่วโมง"
  ));
  body(recipe, 7, ml(
    "Heat the oven to 175°C. Transfer the chilled beef and all adobo to a heavy covered pot; rinse the marinade bowl with the remaining 1,550 ml water and add it too. Bring just to a simmer on the stove, cover tightly, and move the pot to the oven. Keep the pot covered so the measured liquid does not evaporate too quickly.",
    "烤箱預熱至 175°C。將冷藏牛肉與全部醃醬放入厚重燉鍋；以剩餘 1,550 毫升水沖洗醃肉碗，水也倒入鍋中。爐上加熱至剛開始微滾，緊蓋後移入烤箱。保持鍋蓋密合，避免定量液體過快蒸發。",
    "オーブンを175°Cに予熱します。冷えた牛肉とアドボ全量を厚手の蓋付き鍋に移します。残りの水1,550mlでマリネ容器をすすぎ、その水も加えます。コンロで沸騰直前まで温め、しっかり蓋をしてオーブンに入れます。計量した煮汁が早く蒸発しないよう蓋を保ちます。",
    "오븐을 175°C로 예열한다. 차가운 소고기와 아도보 전량을 두꺼운 뚜껑 있는 냄비에 옮긴다. 남은 물 1,550ml로 양념 그릇을 헹궈 냄비에 붓는다. 가스레인지에서 막 끓기 시작할 때까지 데우고 단단히 덮어 오븐에 넣는다. 계량한 액체가 너무 빨리 증발하지 않도록 뚜껑을 닫아 둔다.",
    "อุ่นเตาอบที่ 175°C ย้ายเนื้อเย็นและอาโดโบทั้งหมดลงหม้อหนามีฝา ใช้น้ำที่เหลือ 1,550 มล.ล้างชามหมักแล้วเทลงหม้อด้วย ตั้งบนเตาจนเริ่มเดือดเบา ๆ ปิดฝาแน่นแล้วนำเข้าเตาอบ ปิดฝาไว้เพื่อไม่ให้ของเหลวที่ตวงไว้ระเหยเร็ว"
  ));
  body(recipe, 8, ml(
    "Braise covered for an estimated 2 hours 30 minutes, turning the large pieces once at about 1 hour 15 minutes. The timer is a tenderness estimate, not the safety check. The beef is in whole-cut pieces, not ground: near the end, check the centre of the thickest piece with a food thermometer for 63°C (145°F), then rest the cooked beef for at least 3 minutes before shredding. If below that point, continue braising and recheck.",
    "加蓋燉約 2 小時 30 分鐘，約 1 小時 15 分鐘時翻動大塊牛肉一次。計時是嫩度估算，不是安全檢查。牛肉是整塊肉切成大塊，並非絞肉；接近完成時用食物溫度計測最厚塊中心，確認達 63°C（145°F），熟肉至少靜置 3 分鐘再撕開。若未達溫度，繼續燉煮後再測。",
    "蓋をして約2時間30分煮込み、約1時間15分で大きな肉を一度返します。時間は柔らかさの目安で、安全確認ではありません。牛肉はひき肉ではなく塊肉を切ったものです。終盤に食品用温度計で最も厚い肉の中心が63°C（145°F）に達したか確認し、調理済みの肉を少なくとも3分休ませてから裂きます。未達なら煮込みを続けて再測定します。",
    "뚜껑을 덮고 약 2시간 30분 끓이며 약 1시간 15분에 큰 고기를 한 번 뒤집는다. 시간은 부드러워지는 정도의 추정치이지 안전 확인이 아니다. 소고기는 다진 고기가 아니라 통살을 자른 조각이다. 거의 다 익었을 때 식품 온도계로 가장 두꺼운 조각 중심이 63°C (145°F)에 도달했는지 확인하고, 익힌 고기는 찢기 전 최소 3분 쉰다. 기준보다 낮으면 더 끓이고 다시 잰다.",
    "ตุ๋นปิดฝาประมาณ 2 ชั่วโมง 30 นาที พลิกชิ้นใหญ่หนึ่งครั้งเมื่อผ่านไปประมาณ 1 ชั่วโมง 15 นาที เวลาเป็นค่าประมาณความนุ่ม ไม่ใช่การตรวจความปลอดภัย เนื้อเป็นชิ้นจากเนื้อเต็ม ไม่ใช่เนื้อบด ช่วงท้ายใช้เทอร์โมมิเตอร์วัดกลางชิ้นที่หนาที่สุดให้ถึง 63°C (145°F) แล้วพักเนื้อสุกอย่างน้อย 3 นาทีก่อนฉีก หากยังต่ำกว่าเกณฑ์ให้ตุ๋นต่อแล้ววัดซ้ำ"
  ));
  body(recipe, 9, ml(
    "Uncover and braise for about 30 minutes more, checking every 10 minutes for fork tenderness and enough broth to partly surround the beef. This extra time is for the chuck and shank to soften and for the consommé to concentrate; it is not a separate temperature target. If the pot becomes dry, add hot water in 100 ml increments.",
    "開蓋再燉約 30 分鐘，每 10 分鐘檢查一次叉子是否容易刺入，以及湯汁是否仍能包住牛肉下半部。這段時間是讓牛肩與牛腱軟化、濃縮清湯，不是另一項溫度目標。若鍋底變乾，每次加 100 毫升熱水。",
    "蓋を外し、さらに約30分煮ます。10分ごとにフォークが通る柔らかさと、肉の下半分を覆う煮汁が残っているかを確認します。この追加時間は肩肉とすね肉を柔らかくし、コンソメを濃縮するためで、別の温度目標ではありません。鍋が乾いてきたら熱湯を100mlずつ加えます。",
    "뚜껑을 열고 약 30분 더 끓인다. 10분마다 포크가 쉽게 들어가는지, 육수가 고기 아래쪽을 덮을 만큼 남았는지 확인한다. 추가 시간은 목심과 사태를 부드럽게 하고 콘소메를 졸이는 식감 과정이지 별도 온도 목표가 아니다. 냄비가 마르면 뜨거운 물을 100ml씩 추가한다.",
    "เปิดฝาแล้วตุ๋นต่อประมาณ 30 นาที ตรวจทุก 10 นาทีว่าใช้ส้อมจิ้มเข้าได้ง่ายและยังมีน้ำซุปคลุมเนื้อส่วนล่าง เวลาที่เพิ่มนี้ช่วยให้เนื้อหัวไหล่กับเอ็นนุ่มและให้น้ำซุปเข้มข้น ไม่ใช่เป้าหมายอุณหภูมิอีกข้อ หากหม้อแห้งให้เติมน้ำร้อนครั้งละ 100 มล."
  ));
  body(recipe, 10, ml(
    "Lift out the beef, keep it covered, and rest for 10 minutes; this also exceeds the 3-minute rest after the whole-cut temperature check. Pull into coarse pieces, return them to the consommé, and taste before adding any remaining salt. Keep the broth hot while plating.",
    "將牛肉取出並蓋好，靜置 10 分鐘；這也超過整塊牛肉溫度檢查後所需的 3 分鐘靜置。撕成粗塊後放回清湯，先試味再決定是否加入剩餘鹽。分裝時保持湯汁熱度。",
    "牛肉を取り出して覆い、10分休ませます。塊肉の温度確認後に必要な3分休ませる時間も満たします。粗くほぐして煮汁に戻し、残りの塩を加える前に味を見ます。盛り付けまで煮汁を温かく保ちます。",
    "고기를 건져 덮고 10분 쉰다. 통살 온도 확인 후 필요한 3분 휴지도 충족한다. 굵게 찢어 콘소메에 되돌리고 남은 소금을 넣기 전에 맛을 본다. 담을 때까지 국물을 따뜻하게 유지한다.",
    "ตักเนื้อออก ปิดไว้และพัก 10 นาที ซึ่งนานกว่าการพัก 3 นาทีหลังตรวจอุณหภูมิเนื้อชิ้นเต็ม ฉีกเป็นชิ้นหยาบแล้วใส่กลับในน้ำซุป ชิมก่อนเติมเกลือที่เหลือ รักษาน้ำซุปให้ร้อนระหว่างจัดเสิร์ฟ"
  ));
  body(recipe, 11, ml(
    "Divide the 2.2 kg raw beef and consommé among eight bowls (about 275 g raw beef per serving). Use the reserved 120 g onion and 30 g cilantro as garnish—about 15 g onion and 4 g cilantro per bowl—and give each person half a lime. Serve hot; keep raw garnish on a clean board away from raw-beef tools.",
    "將 2.2 公斤生牛肉所做的牛肉與清湯分成八碗（每份約相當於 275 公克生牛肉）。以預留的 120 公克洋蔥和 30 公克香菜作配料，每碗約 15 公克洋蔥、4 公克香菜；每人另配半顆萊姆。趁熱上桌，生鮮配料用乾淨砧板處理，遠離生牛肉器具。",
    "生の牛肉2.2kg分の肉と煮汁を8杯に分けます（1人あたり生肉換算約275g）。取っておいた玉ねぎ120gと香菜30gを薬味にし、1杯に玉ねぎ約15g、香菜約4gをのせます。ライムは1人半個です。熱いうちに出し、生の薬味は生肉用器具から離れた清潔なまな板で扱います。",
    "생고기 2.2kg 분량의 고기와 콘소메를 여덟 그릇에 나눈다(1인분당 생고기 기준 약 275g). 남겨 둔 양파 120g과 고수 30g을 고명으로 써 그릇마다 양파 약 15g, 고수 약 4g씩 올리고 라임은 1인당 반 개씩 낸다. 뜨겁게 내며 생고명은 생고기 도구와 떨어진 깨끗한 도마에서 다룬다.",
    "แบ่งเนื้อและน้ำซุปจากเนื้อดิบ 2.2 กก.เป็น 8 ชาม (เทียบเนื้อดิบประมาณ 275 กรัมต่อที่) ใช้หอมหัวใหญ่ 120 กรัมและผักชี 30 กรัมที่เก็บไว้เป็นเครื่องเคียง แต่ละชามใส่หอมหัวใหญ่ประมาณ 15 กรัมและผักชีประมาณ 4 กรัม เสิร์ฟมะนาวครึ่งลูกต่อคน เสิร์ฟร้อนและเตรียมผักสดบนเขียงสะอาดห่างจากอุปกรณ์เนื้อดิบ"
  ));
  recipe.storage = ml(
    "Cool meat and consommé in separate shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. For best texture, use within 3 days; FoodSafety.gov lists cooked soups and stews at 3–4 days. Reheat only the needed meat and broth to 74°C/165°F, stirring the broth; add fresh onion, cilantro, and lime after reheating.",
    "牛肉與清湯分別放入淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。為保持口感，建議 3 天內食用；FoodSafety.gov 對熟湯與燉菜列為 3–4 天。只取需要的牛肉與湯汁，攪拌湯汁並復熱至 74°C/165°F；洋蔥、香菜與萊姆等鮮配料在復熱後加入。",
    "肉と煮汁を別々の浅い容器に入れ、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。食感のため3日以内がおすすめですが、FoodSafety.govは調理済みスープとシチューを3〜4日としています。必要な肉と煮汁だけを取り、煮汁を混ぜながら74°C/165°Fまで再加熱します。玉ねぎ、香菜、ライムは再加熱後に加えます。",
    "고기와 콘소메를 얕은 용기에 따로 담아 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 최상의 식감을 위해 3일 안에 먹는 것을 권하지만 FoodSafety.gov는 조리된 수프와 스튜를 3–4일로 안내한다. 필요한 고기와 국물만 덜고 국물을 저으며 74°C/165°F까지 재가열한다. 양파, 고수, 라임은 데운 뒤 넣는다.",
    "แบ่งเนื้อและน้ำซุปใส่ภาชนะตื้นแยกกัน แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เพื่อเนื้อสัมผัสดีควรกินภายใน 3 วัน ส่วน FoodSafety.gov ระบุซุปและสตูปรุงสุก 3–4 วัน อุ่นเฉพาะเนื้อและน้ำซุปที่ต้องการ คนระหว่างอุ่นจนถึง 74°C/165°F แล้วใส่หอมหัวใหญ่ ผักชี และมะนาวสดหลังอุ่น"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseChilaquiles(recipe) {
  recipe.prepMinutes = 35;
  recipe.cookMinutes = 30;
  recipe.totalMinutes = 65;
  const source = recipe.sources.find((entry) => entry.url === "https://www.mexicoinmykitchen.com/chilaquiles-verdes-with-chicken/");
  if (source) {
    source.title = "Rick Bayless — Green Chilaquiles";
    source.url = "https://www.rickbayless.com/recipe/green-chilaquiles/";
  }
  body(recipe, 0, ml(
    "If the 18 tortillas are fresh, spread them in one layer to air-dry for 30 minutes while you prepare the salsa; count this overlap in the 35-minute prep estimate. Day-old tortillas can be cut at once. Cut every tortilla into 6 triangles, for 108 chips total, and keep them in a single layer until frying.",
    "若 18 張玉米餅是新鮮的，先單層攤開風乾 30 分鐘，同時準備莎莎醬；這段重疊時間已計入 35 分鐘備料估計。隔夜玉米餅可直接切。每張切 6 片，共 108 片，油炸前單層放置。",
    "生のトルティーヤ18枚は1層に広げ、サルサを準備する間に30分乾かします。この並行時間を準備35分に含めています。一晩置いたものはすぐ切れます。すべて6等分し、計108枚の三角形にして、揚げるまで重ねずに置きます。",
    "신선한 또르티야 18장은 한 겹으로 펴 살사를 준비하는 동안 30분 말린다. 이 병행 시간은 준비 시간 35분에 포함된다. 하루 지난 또르티야는 바로 잘라도 된다. 전부 6등분해 총 108조각으로 만들고 튀길 때까지 겹치지 않게 둔다.",
    "หากตอร์ติญา 18 แผ่นยังสด ให้กางเป็นชั้นเดียวผึ่งลม 30 นาทีระหว่างเตรียมซัลซา เวลาที่ทำควบคู่กันนี้นับรวมในเวลาเตรียม 35 นาที ตอร์ติญาที่ทำไว้เมื่อวานตัดได้ทันที ตัดทุกแผ่นเป็น 6 ชิ้น รวม 108 ชิ้น และวางแยกชั้นไว้ก่อนทอด"
  ));
  body(recipe, 1, ml(
    "Heat the 350 ml frying oil in a deep pot to about 175°C. Fry the 108 triangles in uncrowded batches for an estimated 2–3 minutes until crisp and pale gold; the oil is frying medium, so drain the chips well and do not assume all 350 ml is absorbed. Let the oil return to temperature between batches.",
    "將 350 毫升炸油在深鍋中加熱至約 175°C。108 片玉米餅分批、不擁擠地炸約 2–3 分鐘，至酥脆淡金黃；油是油炸介質，瀝乾即可，不代表 350 毫升全被吸收。每批間讓油溫回升。",
    "深鍋の揚げ油350mlを約175°Cに熱します。108枚を詰め込まず数回に分け、約2〜3分、カリッとして薄いきつね色になるまで揚げます。油は揚げるための媒体で、350mlすべてが吸収されるわけではありません。よく油を切り、各回の間に油温を戻します。",
    "깊은 냄비에 튀김용 기름 350ml를 약 175°C로 달군다. 108조각을 냄비가 붐비지 않게 나눠 약 2–3분 바삭하고 옅은 황금색이 되도록 튀긴다. 기름은 튀김 매개이므로 칩에 350ml 전부 흡수되는 것이 아니다. 잘 빼고 회차 사이 기름 온도를 회복시킨다.",
    "ตั้งน้ำมันทอด 350 มล.ในหม้อลึกให้ร้อนประมาณ 175°C ทอดแผ่นสามเหลี่ยม 108 ชิ้นเป็นชุดไม่ให้แน่น ประมาณ 2–3 นาทีจนกรอบและเหลืองอ่อน น้ำมันเป็นตัวกลางสำหรับทอด ไม่ได้หมายความว่าชิปจะดูดซับทั้งหมด 350 มล. สะเด็ดน้ำมันให้ดีและรอให้อุณหภูมิกลับมาระหว่างชุด"
  ));
  body(recipe, 2, ml(
    "Roast all 900 g tomatillos, both serranos, the 2 garlic cloves, and 70 g of the 140 g onion for about 10–12 minutes, turning until softened with browned spots. Keep the other 70 g onion raw and slice it thinly for the six finished portions. Wash hands and the board after handling the chiles.",
    "將全部 900 公克燈籠果、2 根塞拉諾辣椒、2 瓣蒜及 140 公克洋蔥中的 70 公克烤約 10–12 分鐘，中途翻面至軟化並有焦斑。另 70 公克洋蔥保持生鮮，切薄片分作六份配料。處理辣椒後洗手並清洗砧板。",
    "食用ほおずき900g全量、セラーノ唐辛子2本、にんにく2片、玉ねぎ140gのうち70gを約10〜12分焼き、途中で返して柔らかくし、焼き目を付けます。残り70gの玉ねぎは生のまま薄切りにして6人分の薬味にします。唐辛子を扱った後は手とまな板を洗います。",
    "토마티요 900g 전량, 세라노 고추 2개, 마늘 2쪽, 양파 140g 중 70g을 약 10–12분 굽는다. 중간에 뒤집어 부드러워지고 갈색 점이 생기게 한다. 남은 양파 70g은 생으로 얇게 썰어 여섯 인분 고명으로 둔다. 고추를 만진 뒤 손과 도마를 씻는다.",
    "ย่างโทมาทิลโล 900 กรัมทั้งหมด พริกเซอร์ราโน 2 เม็ด กระเทียม 2 กลีบ และหอมหัวใหญ่ 70 กรัมจาก 140 กรัม ประมาณ 10–12 นาที พลิกจนเนื้อนุ่มและมีรอยเกรียม เก็บหอมหัวใหญ่ 70 กรัมที่เหลือไว้ซอยบางเป็นเครื่องเคียง 6 ที่ ล้างมือและเขียงหลังจับพริก"
  ));
  body(recipe, 3, ml(
    "Blend the roasted vegetables with 300 ml stock, 20 g of the 35 g cilantro, and 4.5 g of the 9 g salt. Reserve the remaining 15 g cilantro and 4.5 g salt for finishing. Blend until smooth; if the blender needs help, scrape down the sides rather than adding unlisted liquid.",
    "將烤蔬菜與 300 毫升高湯、35 公克香菜中的 20 公克及 9 公克鹽中的 4.5 公克打勻。剩餘 15 公克香菜與 4.5 公克鹽留待最後調味。打至滑順；若攪拌機卡住，刮下側邊食材，不另加未列出的液體。",
    "焼いた野菜、スープ300ml、香菜35gのうち20g、塩9gのうち4.5gをなめらかに攪拌します。残りの香菜15gと塩4.5gは仕上げ用に取っておきます。滑らかにし、回りにくい場合は側面をこそげ、記載のない液体は加えません。",
    "구운 채소에 육수 300ml, 고수 35g 중 20g, 소금 9g 중 4.5g을 넣고 곱게 간다. 남은 고수 15g과 소금 4.5g은 마무리용으로 둔다. 부드럽게 갈고 블렌더가 막히면 옆면을 긁어 내리며 표시되지 않은 액체는 넣지 않는다.",
    "ปั่นผักย่างกับน้ำสต๊อก 300 มล. ผักชี 20 กรัมจาก 35 กรัม และเกลือ 4.5 กรัมจาก 9 กรัมจนเนียน เก็บผักชี 15 กรัมและเกลือ 4.5 กรัมที่เหลือไว้ปรุงท้าย หากเครื่องปั่นติดให้ปาดส่วนผสมลง ไม่ต้องเติมของเหลวที่ไม่ได้ระบุ"
  ));
  body(recipe, 4, ml(
    "Heat all 20 ml salsa oil in a wide skillet. Pour in the puree carefully and simmer for about 8 minutes, stirring, until slightly reduced and no longer raw-smelling. Taste and use some or all of the reserved 4.5 g salt; the exact amount depends on the stock and queso fresco.",
    "寬鍋中加熱全部 20 毫升莎莎醬用油，小心倒入泥狀蔬菜，邊攪拌邊煮約 8 分鐘，至稍微收濃且生味消失。試味後再加入預留的 4.5 公克鹽，可按高湯和 queso fresco 的鹹度調整用量。",
    "広いフライパンでサルサ用の油20ml全量を熱します。ピューレを注意して加え、混ぜながら約8分、少し煮詰まり生の香りが消えるまで煮ます。味を見て、取っておいた塩4.5gはブロスやケソ・フレスコの塩味に応じて一部または全量を使います。",
    "넓은 팬에 살사 기름 20ml 전량을 달군다. 퓌레를 조심히 붓고 저으며 약 8분 살짝 졸여 생채소 냄새가 사라질 때까지 끓인다. 맛을 보고 육수와 케소 프레스코의 짠맛에 맞춰 남겨 둔 소금 4.5g을 일부 또는 전부 사용한다.",
    "ตั้งน้ำมันซัลซา 20 มล.ทั้งหมดในกระทะกว้าง เทส่วนผสมปั่นลงอย่างระวัง เคี่ยวและคนประมาณ 8 นาทีจนงวดเล็กน้อยและกลิ่นดิบหาย ชิมแล้วใช้เกลือ 4.5 กรัมที่เก็บไว้บางส่วนหรือทั้งหมดตามความเค็มของน้ำสต๊อกและเกโซเฟรสโก"
  ));
  body(recipe, 5, ml(
    "Add the 108 chips to the simmering salsa just before serving. Fold for an estimated 60–90 seconds, until coated and the edges soften while some centres stay crisp. This timing is for texture, not food safety. For six servings, divide the chips and salsa immediately; do not hold the mixed batch in the pan.",
    "上桌前才將 108 片玉米餅加入微滾莎莎醬。輕輕翻拌約 60–90 秒，至裹醬且邊緣稍軟、部分中心仍酥脆。此時間是口感估計，不是食安標準。六份立即分裝，不要讓拌好的整鍋久放。",
    "出す直前に108枚のチップスを煮立ったサルサに加えます。約60〜90秒を目安にやさしく混ぜ、全体に絡め、縁は柔らかく中心は少しカリッと保ちます。この時間は食感の目安で食品安全基準ではありません。6人分にすぐ分け、混ぜたまま鍋で保温しません。",
    "내기 직전에 끓는 살사에 칩 108조각을 넣는다. 약 60–90초 부드럽게 접어 섞어 소스를 입히고 가장자리는 부드럽게, 가운데 일부는 바삭하게 남긴다. 이 시간은 식감 추정치이지 식품 안전 기준이 아니다. 여섯 인분을 바로 나누고 섞은 채 팬에 두지 않는다.",
    "ใส่ชิป 108 ชิ้นลงในซัลซาที่เดือดปุดก่อนเสิร์ฟ คลุกเบา ๆ ประมาณ 60–90 วินาทีจนเคลือบซอส ขอบเริ่มนุ่มแต่ตรงกลางบางส่วนยังกรอบ เวลานี้เป็นค่าประมาณเนื้อสัมผัส ไม่ใช่เกณฑ์ความปลอดภัย แบ่ง 6 ที่ทันที อย่าพักส่วนผสมที่คลุกแล้วไว้ในกระทะ"
  ));
  body(recipe, 6, ml(
    "Plate immediately among six dishes. Each serving starts with 3 tortillas' worth of chips, about 25 g crema, 30 g queso fresco, one sixth of the 70 g raw onion, and about 2.5 g reserved cilantro. Keep dairy toppings chilled until plating and use a clean spoon for each.",
    "立即分成六盤。每份約有 3 張玉米餅做成的玉米片、25 公克 crema、30 公克 queso fresco、六分之一的 70 公克生洋蔥及約 2.5 公克預留香菜。乳製品配料上桌前冷藏，每種用乾淨湯匙取用。",
    "6皿にすぐ分けます。1人分はトルティーヤ3枚分のチップス、クレマ約25g、ケソ・フレスコ30g、生の玉ねぎ70gの6分の1、取っておいた香菜約2.5gです。乳製品の薬味は盛り付けまで冷蔵し、それぞれ清潔なスプーンで取ります。",
    "여섯 접시에 바로 나눈다. 1인분은 또르티야 3장 분량의 칩, 크레마 약 25g, 케소 프레스코 30g, 생양파 70g의 6분의 1, 남겨 둔 고수 약 2.5g이다. 유제품 고명은 담기 전까지 차갑게 두고 깨끗한 숟가락으로 덜어 쓴다.",
    "แบ่งใส่ 6 จานทันที แต่ละที่เริ่มด้วยชิปจากตอร์ติญา 3 แผ่น ครีมา 25 กรัม เกโซเฟรสโก 30 กรัม หอมหัวใหญ่สด 70 กรัมหนึ่งในหก และผักชีที่เก็บไว้ประมาณ 2.5 กรัม แช่เครื่องเคียงนมให้เย็นจนถึงเวลาจัดจานและใช้ช้อนสะอาด"
  ));
  body(recipe, 7, ml(
    "Serve within 5 minutes for crisp centres and tender edges. Do not save assembled chips with the salsa and dairy toppings; the chips soften quickly. If serving over several minutes, bring each small batch of sauce to a simmer and toss only the chips needed for that batch.",
    "拌好後 5 分鐘內上桌，保留中心酥脆、邊緣柔軟。不要將拌好的玉米餅連同莎莎醬與乳製品配料保存，玉米片很快會軟掉。若分批上菜，每次只讓少量莎莎醬微滾，再拌入該批所需玉米片。",
    "混ぜてから5分以内に出すと、中心のカリッとした食感と縁の柔らかさを保てます。サルサや乳製品の薬味と混ぜたチップスは保存しません。すぐ柔らかくなるためです。時間差で出す場合は、ソースを少量ずつ温め、必要分のチップスだけを和えます。",
    "섞은 뒤 5분 안에 내 가운데는 바삭하고 가장자리는 부드럽게 유지한다. 살사와 유제품 고명에 버무린 칩은 금방 눅눅해지므로 보관하지 않는다. 나눠 낼 경우 소스를 소량씩 끓이고 해당 분량에 필요한 칩만 섞는다.",
    "เสิร์ฟภายใน 5 นาทีหลังคลุกเพื่อให้ตรงกลางยังกรอบและขอบนุ่ม อย่าเก็บชิปที่คลุกซัลซาและเครื่องเคียงนมแล้ว เพราะจะนิ่มเร็ว หากทยอยเสิร์ฟให้อุ่นซอสทีละชุดเล็กและคลุกเฉพาะชิปที่ต้องใช้"
  ));
  recipe.storage = ml(
    "Refrigerate leftover cooked salsa, crema, and queso fresco separately within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. FoodSafety.gov lists cooked leftovers at 3–4 days; use opened dairy according to its label. Reheat only the salsa needed to 74°C/165°F, then toss with freshly crisped chips and cold toppings. Keep dry chips sealed separately for best texture.",
    "剩餘熟莎莎醬、crema 與 queso fresco 分開保存，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。FoodSafety.gov 對熟食列為 3–4 天；開封乳製品依標籤保存。只將所需莎莎醬復熱至 74°C/165°F，再拌新炸或回脆玉米片並加冷配料。乾玉米片密封另放以保持口感。",
    "残った加熱済みサルサ、クレマ、ケソ・フレスコは別々にし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。FoodSafety.govは調理済み残り物を3〜4日としています。開封後の乳製品は表示に従います。必要なサルサだけを74°C/165°Fまで再加熱し、カリッとさせ直したチップスと冷たい薬味に合わせます。乾いたチップスは別に密封して食感を保ちます。",
    "남은 익힌 살사, 크레마, 케소 프레스코는 따로 두고 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. FoodSafety.gov는 조리된 남은 음식을 3–4일로 안내하고, 개봉 유제품은 라벨을 따른다. 필요한 살사만 74°C/165°F까지 데운 뒤 다시 바삭하게 만든 칩과 차가운 고명을 섞는다. 마른 칩은 식감을 위해 따로 밀봉한다.",
    "แช่เย็นซัลซาปรุงสุก ครีมา และเกโซเฟรสโกที่เหลือแยกกันภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F FoodSafety.gov ระบุอาหารปรุงสุกเหลือ 3–4 วัน ส่วนผลิตภัณฑ์นมที่เปิดแล้วให้ทำตามฉลาก อุ่นซัลซาเฉพาะส่วนที่ต้องการถึง 74°C/165°F แล้วคลุกกับชิปที่ทำให้กรอบใหม่และเครื่องเคียงเย็น เก็บชิปแห้งปิดสนิทแยกไว้เพื่อรักษาเนื้อสัมผัส"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseCullenSkink(recipe) {
  body(recipe, 0, ml(
    "Lay the 500 g smoked haddock in a wide pan and add all 1 L milk. Warm to a gentle simmer and poach for an estimated 6–8 minutes, turning once if needed. Check the thickest part with a thermometer at 63°C (145°F), or use FoodSafety.gov's fish cue: the flesh is no longer translucent and separates easily with a fork. Time alone is not the safety check.",
    "將全部 500 公克煙燻黑線鱈平放寬鍋，加入全部 1 公升牛奶。加熱至微滾，估計汆煮 6–8 分鐘，視需要翻面一次。用溫度計確認最厚處達 63°C（145°F）；或依 FoodSafety.gov 的魚類熟度指標，魚肉不再半透明且可用叉子輕鬆剝開。不可只靠計時判斷安全。",
    "幅広い鍋にスモークハドック500g全量を並べ、牛乳1L全量を注ぎます。弱く沸くまで温め、約6〜8分を目安にポーチし、必要なら一度返します。最も厚い部分が63°C（145°F）に達したか温度計で確認します。またはFoodSafety.govの魚の目安、身が透き通らずフォークで簡単にほぐれる状態を確認します。時間だけで安全を判断しません。",
    "넓은 팬에 훈제 해덕 500g 전량을 놓고 우유 1L 전량을 붓는다. 약하게 끓기 시작할 때까지 데운 뒤 약 6–8분 익히고 필요하면 한 번 뒤집는다. 가장 두꺼운 부분이 63°C (145°F)에 도달했는지 온도계로 확인한다. 또는 FoodSafety.gov의 생선 익힘 신호인 속이 더 이상 반투명하지 않고 포크로 쉽게 갈라지는 상태를 확인한다. 시간만으로 안전을 판단하지 않는다.",
    "วางปลาแฮดด็อกรมควัน 500 กรัมทั้งหมดในกระทะกว้าง เติมนม 1 ลิตรทั้งหมด อุ่นจนเดือดเบา ๆ แล้วลวกประมาณ 6–8 นาที พลิกหนึ่งครั้งหากจำเป็น ใช้เทอร์โมมิเตอร์วัดส่วนที่หนาที่สุดให้ถึง 63°C (145°F) หรือใช้สัญญาณปลาสุกของ FoodSafety.gov คือเนื้อไม่โปร่งแสงและแยกออกง่ายด้วยส้อม เวลาอย่างเดียวไม่ใช่การตรวจความปลอดภัย"
  ));
  body(recipe, 1, ml(
    "Lift out the cooked haddock onto a clean plate. Strain and reserve all 1 L poaching milk in a jug; remove skin and any pin bones only after the fish is cool enough to handle, then flake into large pieces and cover. Keep the cooked fish away from the raw-fish plate and utensils.",
    "將熟黑線鱈移到乾淨盤中。過濾並把全部 1 公升煮魚牛奶留在量杯；魚稍涼、可安全處理後才去皮與細刺，再剝成大塊並蓋好。熟魚不可接觸盛過生魚的盤子與器具。",
    "加熱済みのハドックを清潔な皿に取り出します。ポーチした牛乳1L全量をこして計量容器に取っておきます。魚が扱える温度になってから皮と小骨を除き、大きくほぐして覆います。加熱済みの魚を生魚用の皿や器具に触れさせません。",
    "익힌 해덕을 깨끗한 접시에 건진다. 데친 우유 1L 전량을 체에 걸러 계량 용기에 보관한다. 생선이 만질 수 있을 정도로 식은 뒤 껍질과 잔가시를 제거하고 큼직하게 찢어 덮어 둔다. 익힌 생선은 생선회용 접시나 도구와 닿지 않게 한다.",
    "ตักปลาแฮดด็อกสุกใส่จานสะอาด กรองและเก็บนมลวกปลา 1 ลิตรทั้งหมดไว้ในเหยือก เอาหนังและก้างเล็กออกเมื่อปลาเย็นพอจับได้ แล้วแกะเป็นชิ้นใหญ่และปิดฝา แยกปลาสุกจากจานและอุปกรณ์ที่ใช้กับปลาดิบ"
  ));
  body(recipe, 2, ml(
    "Melt all 30 g butter over medium-low heat. Add all 200 g onion and 2 g of the listed 6 g salt; cook about 8 minutes, stirring, until soft and translucent without deep browning. Reserve the remaining 4 g salt for tasting after the smoked fish is returned.",
    "中小火融化全部 30 公克奶油，加入全部 200 公克洋蔥及所列 6 公克鹽中的 2 公克，攪拌煮約 8 分鐘至柔軟透明但不深度焦化。剩餘 4 公克鹽留待煙燻魚放回後試味再用。",
    "中弱火でバター30g全量を溶かし、玉ねぎ200g全量と塩6gのうち2gを加えます。混ぜながら約8分、濃く色づけず柔らかく透き通るまで炒めます。残りの塩4gはスモーク魚を戻してから味を見て使います。",
    "중약불에서 버터 30g 전량을 녹이고 양파 200g 전량과 소금 6g 중 2g을 넣는다. 저으며 약 8분 짙게 갈색 내지 않고 부드럽고 투명해질 때까지 익힌다. 남은 소금 4g은 훈제 생선을 다시 넣은 뒤 맛을 보고 쓴다.",
    "ละลายเนย 30 กรัมทั้งหมดด้วยไฟกลางอ่อน ใส่หอมหัวใหญ่ 200 กรัมทั้งหมดและเกลือ 2 กรัมจาก 6 กรัมที่ระบุ ผัดประมาณ 8 นาทีจนใสและนุ่มโดยไม่ให้เป็นสีน้ำตาลเข้ม เก็บเกลือ 4 กรัมที่เหลือไว้ชิมหลังใส่ปลารมควันกลับลงหม้อ"
  ));
  body(recipe, 3, ml(
    "Add all 600 g potato cubes and all reserved poaching milk. Bring to a gentle simmer and cook for an estimated 15–18 minutes, stirring occasionally, until a knife passes through the largest 2 cm cube easily. The time is a tenderness estimate; keep the milk below a hard boil.",
    "加入全部 600 公克馬鈴薯丁與預留的全部煮魚牛奶。加熱至微滾，偶爾攪拌，估計煮 15–18 分鐘，直到刀子可輕鬆穿過最大顆 2 公分馬鈴薯丁。時間是軟度估算；避免牛奶劇烈沸騰。",
    "じゃがいも600g全量と取っておいたポーチ牛乳全量を加えます。弱く沸く状態を保ち、ときどき混ぜながら約15〜18分、最大の2cm角にナイフがすっと通るまで煮ます。時間は柔らかさの目安です。牛乳を強く沸騰させません。",
    "감자 600g 전량과 남겨 둔 데친 우유 전량을 넣는다. 약하게 끓이고 가끔 저으며 약 15–18분, 가장 큰 2cm 감자에 칼이 쉽게 들어갈 때까지 익힌다. 시간은 부드러움 추정치이며 우유를 세게 끓이지 않는다.",
    "ใส่มันฝรั่งหั่นเต๋า 600 กรัมทั้งหมดและนมลวกปลาที่เก็บไว้ทั้งหมด ตั้งจนเดือดเบา ๆ คนเป็นครั้งคราวประมาณ 15–18 นาทีจนมีดแทงมันฝรั่งชิ้นใหญ่สุด 2 ซม.ได้ง่าย เวลานี้เป็นค่าประมาณความนุ่ม อย่าต้มให้นมเดือดแรง"
  ));
  body(recipe, 4, ml(
    "Mash about one third of the tender potatoes against the side of the pan, leaving the rest as visible chunks; this thickens the milk without puréeing the soup. If it is thicker than you like, loosen it with hot water 30 ml at a time, not extra milk that has not been measured.",
    "將約三分之一已軟的馬鈴薯壓在鍋邊，保留其餘為可見塊狀；如此可讓牛奶湯汁變濃而不成泥。若太稠，每次加 30 毫升熱水調整，不另加未計量的牛奶。",
    "柔らかくなったじゃがいもの約3分の1を鍋肌に押しつぶし、残りは形の見える塊で残します。スープをピューレ状にせず、牛乳にとろみを付けます。濃すぎる場合は未計量の牛乳ではなく、熱湯を30mlずつ加えて調整します。",
    "부드러워진 감자의 약 3분의 1을 냄비 옆면에 으깨고 나머지는 덩어리가 보이게 둔다. 수프를 갈지 않고 우유 국물에 농도를 낸다. 너무 되직하면 계량하지 않은 우유 대신 뜨거운 물을 30ml씩 넣어 푼다.",
    "บดมันฝรั่งนุ่มประมาณหนึ่งในสามกับข้างหม้อ เหลือส่วนที่เหลือเป็นชิ้นให้เห็น วิธีนี้ทำให้นมข้นขึ้นโดยไม่ปั่นซุป หากข้นเกินไปให้เติมน้ำร้อนครั้งละ 30 มล. ไม่เติมนมเพิ่มโดยไม่ตวง"
  ));
  body(recipe, 5, ml(
    "Fold in all 500 g cooked haddock and warm gently for about 2–3 minutes, without boiling. Taste before adding some or all of the reserved 4 g salt because smoked fish varies in saltiness; add all 2 g pepper and 15 g chives. Divide into four bowls: about 125 g raw-weight haddock, 150 g potato, and 250 ml milk base per serving.",
    "拌入全部 500 公克熟黑線鱈，輕柔加熱約 2–3 分鐘，不要煮沸。煙燻魚鹹度不同，先試味再決定使用預留 4 公克鹽中的多少；加入全部 2 公克胡椒與 15 公克細香蔥。分成四碗，每份約相當於 125 公克生重魚、150 公克馬鈴薯及 250 毫升奶湯底。",
    "加熱済みハドック500g全量を加え、沸騰させず約2〜3分やさしく温めます。魚の塩分に差があるため、取っておいた塩4gは味見してから一部または全量を使います。こしょう2g全量とチャイブ15gを加えます。4杯に分け、1人分は生魚換算約125g、じゃがいも150g、牛乳ベース約250mlです。",
    "익힌 해덕 500g 전량을 넣고 끓이지 않게 약 2–3분 부드럽게 데운다. 훈제 생선의 염도가 다르므로 남겨 둔 소금 4g은 맛을 본 뒤 일부 또는 전부 넣는다. 후추 2g과 차이브 15g 전량을 넣는다. 네 그릇에 나누면 1인분당 생선은 생중량 기준 약 125g, 감자 150g, 우유 국물 약 250ml다.",
    "ใส่ปลาแฮดด็อกสุก 500 กรัมทั้งหมด คลุกและอุ่นเบา ๆ ประมาณ 2–3 นาทีโดยไม่ให้เดือด ชิมก่อนเติมเกลือที่เหลือ 4 กรัมบางส่วนหรือทั้งหมดเพราะปลาแต่ละชนิดเค็มไม่เท่ากัน ใส่พริกไทย 2 กรัมและกุยช่าย 15 กรัมทั้งหมด แบ่ง 4 ชาม ที่ละประมาณปลา 125 กรัมก่อนปรุง มันฝรั่ง 150 กรัม และฐานนม 250 มล."
  ));
  recipe.storage = ml(
    "Cool in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at or below 4°C/40°F. For fish texture, use within 2 days; FoodSafety.gov lists cooked soups and stews at 3–4 days. Reheat only the needed portion, stirring, until it reaches 74°C/165°F; warm gently and do not boil hard, which can split the milk and break up the fish.",
    "分裝淺容器，2 小時內（高於 32°C/90°F 時 1 小時內）冷藏至 4°C/40°F 以下。為保持魚肉口感，建議 2 天內食用；FoodSafety.gov 對熟湯與燉菜列為 3–4 天。只取所需份量並攪拌復熱至 74°C/165°F；輕柔加熱，避免劇烈沸騰造成奶汁分離與魚肉碎散。",
    "浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。魚の食感には2日以内がおすすめですが、FoodSafety.govは調理済みスープとシチューを3〜4日としています。必要な分だけを混ぜながら74°C/165°Fまで再加熱します。やさしく温め、牛乳が分離したり魚が崩れたりするため強く沸騰させません。",
    "얕은 용기에 나눠 2시간 안에 (32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장한다. 생선 식감을 위해 2일 안에 먹는 것을 권하지만 FoodSafety.gov는 조리된 수프와 스튜를 3–4일로 안내한다. 필요한 양만 저으며 74°C/165°F까지 재가열한다. 우유가 분리되고 생선이 부서질 수 있으므로 살살 데우고 세게 끓이지 않는다.",
    "แบ่งใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออุณหภูมิเกิน 32°C/90°F) ที่ไม่เกิน 4°C/40°F เพื่อเนื้อสัมผัสของปลาแนะนำให้กินภายใน 2 วัน ส่วน FoodSafety.gov ระบุซุปและสตูปรุงสุก 3–4 วัน อุ่นเฉพาะส่วนที่ต้องการและคนจนถึง 74°C/165°F อุ่นอย่างเบามือและอย่าต้มแรงเพราะนมอาจแตกมันและปลาแตกเป็นชิ้นเล็ก"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

function reviseGalaktoboureko(recipe) {
  recipe.prepMinutes = 90;
  recipe.cookMinutes = 175;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  body(recipe, 3, ml(
    "Whisk all 4 eggs with 100 g of the listed 250 g custard sugar for about 2 minutes until smooth and slightly pale. Reserve the remaining 150 g custard sugar for the semolina. Keep the eggs refrigerated until this step and wash the bowl and whisk after use.",
    "將全部 4 顆蛋與所列卡士達用糖 250 公克中的 100 公克攪打約 2 分鐘至滑順、顏色略淡。剩餘 150 公克卡士達用糖留給粗粒小麥粉。蛋使用前冷藏，之後清洗碗與打蛋器。",
    "卵4個全量と、カスタード用砂糖250gのうち100gを約2分、なめらかで少し淡い色になるまで泡立てます。残り150gはセモリナ用に取っておきます。この工程まで卵は冷蔵し、使用後はボウルと泡立て器を洗います。",
    "달걀 4개 전량과 커스터드용 설탕 250g 중 100g을 약 2분 부드럽고 약간 밝아질 때까지 휘젓는다. 남은 커스터드용 설탕 150g은 세몰리나에 쓴다. 이 단계 전까지 달걀은 냉장하고 사용 후 볼과 거품기를 씻는다.",
    "ตีไข่ 4 ฟองทั้งหมดกับน้ำตาลสำหรับคัสตาร์ด 100 กรัมจาก 250 กรัมประมาณ 2 นาทีจนเนียนและสีอ่อนลงเล็กน้อย เก็บน้ำตาลคัสตาร์ดอีก 150 กรัมไว้ผสมเซโมลินา แช่ไข่ไว้จนถึงขั้นตอนนี้และล้างชามกับตะกร้อตีหลังใช้"
  ));
  body(recipe, 4, ml(
    "Whisk the remaining 150 g custard sugar and all 120 g semolina gradually into the steaming 1.2 L milk and 250 ml cream. Cook over medium-low heat for an estimated 6–8 minutes, whisking constantly, until thick and trails briefly remain; the timer and thickness are texture cues, not the egg-safety check.",
    "將剩餘 150 公克卡士達用糖與全部 120 公克粗粒小麥粉慢慢攪入冒蒸氣的 1.2 公升牛奶和 250 毫升鮮奶油。中小火持續攪拌，估計煮 6–8 分鐘至濃稠、刮痕短暫保留；時間和濃度是口感指標，不是蛋類安全檢查。",
    "残りのカスタード用砂糖150gとセモリナ120g全量を、蒸気が立つ牛乳1.2Lと生クリーム250mlに少しずつ混ぜ入れます。中弱火で絶えず混ぜながら約6〜8分、濃くなり泡立て跡が一瞬残るまで加熱します。時間と濃度は食感の目安で、卵の安全確認ではありません。",
    "남은 커스터드용 설탕 150g과 세몰리나 120g 전량을 김이 나는 우유 1.2L와 크림 250ml에 조금씩 휘저어 넣는다. 중약불에서 계속 저으며 약 6–8분 걸쭉해지고 거품기 자국이 잠시 남을 때까지 익힌다. 시간과 농도는 식감 지표이지 달걀 안전 확인이 아니다.",
    "ค่อย ๆ คนเซโมลินา 120 กรัมทั้งหมดและน้ำตาลคัสตาร์ดที่เหลือ 150 กรัมลงในนม 1.2 ลิตรกับครีม 250 มล.ที่มีไอร้อน ตั้งไฟกลางอ่อนและคนตลอดประมาณ 6–8 นาทีจนข้นและรอยตะกร้อค้างชั่วครู่ เวลาและความข้นเป็นสัญญาณเนื้อสัมผัส ไม่ใช่การตรวจความปลอดภัยของไข่"
  ));
  body(recipe, 5, ml(
    "Remove the semolina base from the heat. Whisk about 300 ml of the hot base into the egg mixture in 3 additions of about 100 ml, whisking constantly so the eggs warm gradually and do not form strands.",
    "將粗粒小麥粉底糊離火。分 3 次、每次約 100 毫升，把約 300 毫升熱底糊攪入蛋液；持續攪拌使蛋液逐步升溫、不結蛋絲。",
    "セモリナのベースを火から下ろします。熱いベース約300mlを約100mlずつ3回に分けて卵液に加え、その都度よく混ぜ、卵を徐々に温めて筋状に固まらないようにします。",
    "세몰리나 베이스를 불에서 내린다. 뜨거운 베이스 약 300ml를 약 100ml씩 세 번 달걀물에 넣으며 계속 저어 달걀이 서서히 따뜻해지고 실처럼 익지 않게 한다.",
    "ยกฐานเซโมลินาออกจากเตา ค่อย ๆ ตีฐานร้อนประมาณ 300 มล.ลงในไข่ แบ่ง 3 ครั้ง ครั้งละประมาณ 100 มล. คนตลอดเพื่อให้ไข่อุ่นทีละน้อยและไม่จับเป็นเส้น"
  ));
  body(recipe, 6, ml(
    "Whisk the tempered eggs back into the saucepan, then stir over low heat until the custard reaches 71°C (160°F), the FoodSafety.gov endpoint for egg dishes; stir constantly and do not boil. This temperature is the safety check, while the 2-minute cook in older versions was only a time estimate. Stir in vanilla, lemon zest, and 40 g of the melted butter, then spread in a shallow bowl to cool for 20 minutes.",
    "將回溫蛋液攪回鍋中，以小火持續攪拌至卡士達達 71°C（160°F），這是 FoodSafety.gov 的蛋料理標準；不可煮沸。此溫度才是安全檢查，舊版的 2 分鐘只是時間估計。拌入香草、檸檬皮屑及融化奶油中的 40 公克，再鋪入淺碗冷卻 20 分鐘。",
    "卵液を鍋に戻し、弱火で絶えず混ぜながらカスタードが71°C（160°F）に達するまで加熱します。これはFoodSafety.govの卵料理の基準で、沸騰させません。この温度が安全確認で、以前の2分という時間は加熱時間の目安にすぎません。バニラ、レモンの皮、溶かしバター40gを混ぜ、浅い器に広げて20分冷まします。",
    "온도를 맞춘 달걀물을 냄비에 되돌리고 약불에서 계속 저으며 커스터드가 71°C (160°F)에 도달할 때까지 익힌다. 이는 FoodSafety.gov의 달걀 요리 기준이며 끓이지 않는다. 이 온도가 안전 확인이고 이전 버전의 2분은 시간 추정치일 뿐이다. 바닐라, 레몬 제스트, 녹인 버터 40g을 섞고 얕은 그릇에 펴 20분 식힌다.",
    "เทไข่ที่ปรับอุณหภูมิแล้วกลับลงหม้อ คนบนไฟอ่อนตลอดจนคัสตาร์ดถึง 71°C (160°F) ซึ่งเป็นเกณฑ์สำหรับเมนูไข่ของ FoodSafety.gov และอย่าต้ม อุณหภูมินี้คือการตรวจความปลอดภัย ส่วนเวลา 2 นาทีในวิธีเดิมเป็นเพียงค่าประมาณเวลา คนวานิลลา ผิวเลมอน และเนยละลาย 40 กรัม แล้วเกลี่ยในชามตื้นให้เย็น 20 นาที"
  ));
  body(recipe, 7, ml(
    "Heat the oven to 180°C and brush a 25 × 35 cm metal pan with 15 g of the 200 g melted butter. Keep unused phyllo covered with a clean towel so it does not dry; set out the remaining butter in portions: 60 g for the seven bottom sheets, 20 g for the rim, 50 g for the seven top sheets, and 15 g for the top.",
    "烤箱預熱至 180°C，以 200 公克融化奶油中的 15 公克刷 25 × 35 公分金屬烤盤。未用的酥皮用乾淨布蓋好以免乾裂；其餘奶油分好：60 公克刷七層底皮、20 公克刷邊、50 公克刷七層頂皮、15 公克刷表面。",
    "オーブンを180°Cに予熱し、溶かしバター200gのうち15gで25×35cmの金属型に塗ります。未使用のフィロは乾かないよう清潔な布で覆います。残りのバターは、底の7枚に60g、縁に20g、上の7枚に50g、表面に15gと分けます。",
    "오븐을 180°C로 예열하고 녹인 버터 200g 중 15g으로 25×35cm 금속 팬을 바른다. 쓰지 않는 필로는 마르지 않도록 깨끗한 천으로 덮는다. 나머지 버터는 아래 7장용 60g, 가장자리용 20g, 위 7장용 50g, 표면용 15g으로 나눠 둔다.",
    "อุ่นเตาอบที่ 180°C ทาเนยละลาย 15 กรัมจาก 200 กรัมลงในถาดโลหะ 25 × 35 ซม. คลุมฟีลโลที่ยังไม่ใช้ด้วยผ้าสะอาดเพื่อกันแห้ง แบ่งเนยที่เหลือไว้ 60 กรัมสำหรับแผ่นล่าง 7 ชั้น 20 กรัมสำหรับขอบ 50 กรัมสำหรับแผ่นบน 7 ชั้น และ 15 กรัมสำหรับผิวหน้า"
  ));
  body(recipe, 8, ml(
    "Lay 7 phyllo sheets into the pan one at a time, brushing them with the allotted 60 g butter in total; let their edges overhang. Use only part of each sheet's butter so the layers stay light, and cover the remaining stack between sheets.",
    "將 7 張酥皮逐張鋪入烤盤，合計使用分配好的 60 公克奶油刷層，邊緣留在盤外。每張只刷薄薄一層讓酥皮保持輕盈，鋪片間蓋住剩餘酥皮。",
    "フィロ7枚を1枚ずつ型に敷き、割り当てたバター60g全量を7枚に分けて塗ります。縁は型から垂らします。各シートには薄く塗って層を軽く保ち、作業中は残りのフィロを覆います。",
    "필로 7장을 한 장씩 팬에 깔고 배정한 버터 60g을 전체에 나눠 바른다. 가장자리는 팬 밖으로 늘어뜨린다. 층이 가볍도록 각 장에 얇게 바르고 작업 사이 남은 필로는 덮어 둔다.",
    "วางฟีลโล 7 แผ่นลงถาดทีละแผ่น ใช้เนยที่แบ่งไว้ 60 กรัมทั้งหมดทาบาง ๆ แบ่งให้ครบ ปล่อยขอบแผ่นให้พ้นถาด คลุมแผ่นที่เหลือระหว่างทำเพื่อไม่ให้แห้ง"
  ));
  body(recipe, 9, ml(
    "Spread all cooled custard evenly to the corners. It should be cool or barely warm, not hot; if it is still steaming, wait a few minutes so the bottom phyllo is less likely to soften before baking.",
    "將全部已冷卻卡士達均勻鋪至四角。餡料應是冷的或微溫，不可燙熱；若仍冒蒸氣，稍等幾分鐘，避免烘烤前底層酥皮先變軟。",
    "冷ましたカスタード全量を四隅まで均一に広げます。冷たいか、わずかに温かい程度にし、熱い状態では入れません。湯気が出ている場合は数分待ち、焼く前に底のフィロが柔らかくなるのを防ぎます。",
    "식힌 커스터드 전량을 모서리까지 고르게 편다. 차갑거나 미지근해야 하고 뜨거우면 안 된다. 김이 나면 몇 분 더 식혀 굽기 전에 아래 필로가 눅눅해지는 것을 줄인다.",
    "เกลี่ยคัสตาร์ดที่เย็นแล้วทั้งหมดให้ทั่วถึงมุม ควรเย็นหรืออุ่นเพียงเล็กน้อย ไม่ร้อน หากยังมีไอให้รออีกไม่กี่นาทีเพื่อลดการทำให้ฟีลโลชั้นล่างนิ่มก่อนอบ"
  ));
  body(recipe, 10, ml(
    "Fold the overhanging bottom pastry inward and brush the rim with the allotted 20 g butter. Cover with 7 more sheets, using all 50 g butter across them, then tuck the edges around the custard without pressing the centre. Keep the final 15 g for the surface.",
    "將底層垂出的酥皮向內折，並用分配好的 20 公克奶油刷邊。再鋪 7 張酥皮，合計用完 50 公克奶油，邊緣塞在餡料旁，不要壓扁中央。最後 15 公克留作表面。",
    "垂れた底のフィロを内側に折り込み、縁に割り当てたバター20gを塗ります。さらに7枚を重ね、50g全量を分けて塗り、中心を押さずに端をカスタードの周囲へ折り込みます。残り15gは表面用です。",
    "늘어진 아래 필로를 안으로 접고 배정한 버터 20g을 가장자리에 바른다. 필로 7장을 더 덮고 버터 50g을 나눠 전부 바른 뒤 가운데를 누르지 말고 가장자리를 커스터드 주위에 접어 넣는다. 남은 15g은 윗면에 쓴다.",
    "พับฟีลโลชั้นล่างที่ยื่นเข้าด้านในและทาเนยขอบ 20 กรัมที่แบ่งไว้ วางฟีลโลอีก 7 แผ่น ใช้เนย 50 กรัมทั้งหมดทาแบ่งกัน แล้วพับขอบรอบคัสตาร์ดโดยไม่กดตรงกลาง เก็บเนย 15 กรัมสุดท้ายไว้ทาผิวหน้า"
  ));
  body(recipe, 11, ml(
    "Brush the remaining 15 g butter over the top. Score 12 portions through only the upper phyllo layers, not into the custard; these cuts let steam escape and mark 12 equal servings. Use a sharp knife and wipe it between cuts.",
    "將剩餘 15 公克奶油刷在表面。只劃開上層酥皮，切成 12 份記號，不要切進卡士達；切口讓蒸氣排出並標示 12 等份。使用鋒利刀具並在切線間擦淨。",
    "残りのバター15gを表面に塗ります。上のフィロ層だけに12等分の切れ目を入れ、カスタードまで切らないようにします。蒸気の逃げ道となり、12人分の目印になります。鋭いナイフを使い、切るたびに拭きます。",
    "남은 버터 15g을 윗면에 바른다. 커스터드까지 자르지 말고 위쪽 필로만 12등분으로 칼집을 낸다. 김이 빠지는 길이자 열두 조각 표시가 된다. 날카로운 칼을 쓰고 자를 때마다 닦는다.",
    "ทาเนย 15 กรัมที่เหลือบนหน้า กรีดแบ่ง 12 ส่วนผ่านเฉพาะฟีลโลชั้นบน ไม่กรีดถึงคัสตาร์ด รอยกรีดช่วยให้ไอน้ำออกและกำหนด 12 ชิ้น ใช้มีดคมและเช็ดมีดระหว่างรอย"
  ));
  body(recipe, 12, ml(
    "Bake at 180°C for an estimated 45–50 minutes until the phyllo is crisp, deeply golden, and puffed along the score lines. The oven time and colour are pastry-quality cues; the egg-custard safety check was made before assembly at 71°C. If the top browns early, tent loosely with foil for the remaining bake.",
    "以 180°C 烘烤約 45–50 分鐘，至酥皮酥脆、深金黃且切線處膨起。烤箱時間和顏色是酥皮品質指標；蛋奶餡的安全檢查已在組裝前達 71°C。若表面太早上色，剩餘時間鬆蓋鋁箔。",
    "180°Cで約45〜50分、フィロがカリッと濃いきつね色になり、切れ目が膨らむまで焼きます。時間と色はパイの品質の目安です。卵カスタードの安全確認は組み立て前に71°Cで済ませています。表面が早く色づいたら残り時間はアルミ箔をふんわりかぶせます。",
    "180°C에서 약 45–50분 필로가 바삭하고 짙은 황금색이 되며 칼집이 부풀 때까지 굽는다. 시간과 색은 페이스트리 품질 지표다. 달걀 커스터드 안전 확인은 조립 전 71°C에서 마쳤다. 윗면이 일찍 갈색이 되면 남은 시간 동안 호일을 느슨하게 덮는다.",
    "อบที่ 180°C ประมาณ 45–50 นาทีจนฟีลโลกรอบ สีทองเข้ม และพองตามรอยกรีด เวลาอบและสีเป็นตัวบอกคุณภาพของแป้ง ส่วนการตรวจความปลอดภัยของคัสตาร์ดไข่ทำแล้วที่ 71°C ก่อนประกอบ หากหน้าเข้มเร็วให้คลุมฟอยล์หลวม ๆ ในเวลาที่เหลือ"
  ));
  body(recipe, 13, ml(
    "Set the hot pan on a rack and pour all cooled syrup over the pastry in 4 slow additions over about 2 minutes, letting each soak along the score lines before the next. The syrup is 400 g sugar, 350 ml water, 20 ml lemon juice, one peel strip, and one cinnamon stick; remove the peel and stick before cooling.",
    "將熱烤盤放在架上，分 4 次、約 2 分鐘把全部冷糖漿慢慢淋在酥皮上，每次讓糖漿沿切線吸收後再淋下一次。糖漿由 400 公克糖、350 毫升水、20 毫升檸檬汁、一條檸檬皮與一根肉桂組成；冷卻前取出皮與肉桂。",
    "熱い型をラックに置き、冷ましたシロップ全量を約2分かけて4回に分けてゆっくり注ぎます。次を注ぐ前に切れ目へ染み込ませます。シロップは砂糖400g、水350ml、レモン汁20ml、レモン皮1片、シナモン1本です。冷ます前に皮とシナモンを取り除きます。",
    "뜨거운 팬을 선반에 놓고 식힌 시럽 전량을 약 2분 동안 네 차례 천천히 붓는다. 다음 차례 전에 칼집을 따라 스며들게 한다. 시럽은 설탕 400g, 물 350ml, 레몬즙 20ml, 레몬 껍질 한 조각, 계피 스틱 하나다. 식히기 전에 껍질과 계피를 건진다.",
    "วางถาดร้อนบนตะแกรง แล้วค่อย ๆ ราดน้ำเชื่อมเย็นทั้งหมด 4 ครั้งในเวลาประมาณ 2 นาที ให้ซึมตามรอยกรีดก่อนราดครั้งถัดไป น้ำเชื่อมประกอบด้วยน้ำตาล 400 กรัม น้ำ 350 มล. น้ำเลมอน 20 มล. เปลือกเลมอนหนึ่งชิ้น และอบเชยหนึ่งแท่ง เอาเปลือกกับอบเชยออกก่อนพักให้เย็น"
  ));
  body(recipe, 14, ml(
    "Leave the pan uncovered at room temperature for 1 hour, then cover and refrigerate for 1 hour to let the syrup settle and the custard firm while beginning to chill the perishable filling within 2 hours of baking. This 120-minute finish is included in the 175-minute cook/finish estimate (55-minute bake plus 120-minute rest/chill). Cut through the score lines into 12 pieces when cold. If serving at room temperature, temper only the portions being served and return the pan promptly to the refrigerator.",
    "烤盤不加蓋，室溫靜置 1 小時，再加蓋冷藏 1 小時，讓糖漿分布、卡士達定型，並在烘烤後 2 小時內開始冷藏易腐餡料。這段 120 分鐘收尾計入 175 分鐘烹調／完成時間（烘烤 55 分鐘加靜置／冷藏 120 分鐘）。冷卻後沿切線切成 12 塊。若要室溫食用，只將要吃的份量回溫，並盡快把烤盤放回冰箱。",
    "型を室温で1時間覆わずに置き、その後ふたをして1時間冷蔵します。シロップをなじませカスタードを固めながら、焼成後2時間以内に傷みやすいフィリングの冷却を始めます。この仕上げ120分は調理・仕上げ175分（焼成55分＋休ませ／冷却120分）に含まれます。冷えてから切れ目に沿って12個に切ります。室温で出す場合は食べる分だけを戻し、型は速やかに冷蔵庫へ戻します。",
    "팬을 실온에서 1시간 덮지 않고 둔 뒤 덮어 1시간 냉장한다. 시럽이 스며들고 커스터드가 굳는 동안 굽고 2시간 안에 상하기 쉬운 속을 냉장하기 시작한다. 이 마무리 120분은 조리·완성 175분(굽기 55분+휴지/냉장 120분)에 포함된다. 차가워지면 칼집을 따라 12조각으로 자른다. 실온으로 낼 경우 먹을 양만 잠시 꺼내고 팬은 곧바로 냉장고에 다시 넣는다.",
    "วางถาดโดยไม่ปิดที่อุณหภูมิห้อง 1 ชั่วโมง แล้วปิดฝาและแช่เย็นอีก 1 ชั่วโมงให้น้ำเชื่อมซึมและคัสตาร์ดอยู่ทรง พร้อมเริ่มแช่เย็นไส้ที่เสียง่ายภายใน 2 ชั่วโมงหลังอบ เวลาพัก/ทำให้เย็น 120 นาทีนี้รวมในเวลาทำและเซต 175 นาที (อบ 55 นาทีและพัก/แช่เย็น 120 นาที) เมื่อเย็นแล้วตัดตามรอยเป็น 12 ชิ้น หากเสิร์ฟที่อุณหภูมิห้องให้นำออกมาเฉพาะส่วนที่จะกินและรีบนำถาดกลับเข้าตู้เย็น"
  ));
  recipe.storage = ml(
    "Refrigerate covered at or below 4°C/40°F within 2 hours after serving. For crisp phyllo, use within 2 days; FoodSafety.gov lists baked custard pies at 3–4 days. Return the pan to the refrigerator promptly after cutting. Galaktoboureko is usually served at room temperature, so reheating is optional; if reheating a leftover portion, heat its centre to 74°C/165°F and expect softer phyllo.",
    "上桌後 2 小時內加蓋冷藏至 4°C/40°F 以下。為保持酥皮口感，建議 2 天內食用；FoodSafety.gov 對烤熟卡士達派列為 3–4 天。切片後盡快把烤盤放回冰箱。Galaktoboureko 通常室溫食用，復熱並非必要；若要復熱剩下一份，中心須達 74°C/165°F，但酥皮會較軟。",
    "提供後2時間以内に覆って4°C/40°F以下で冷蔵します。フィロの食感には2日以内がおすすめですが、FoodSafety.govは焼いたカスタードパイを3〜4日としています。切り分けたら型を速やかに冷蔵庫へ戻します。通常は室温で食べるため再加熱は任意です。残りを温める場合は中心を74°C/165°Fにし、フィロが柔らかくなることを見込んでください。",
    "내놓은 뒤 2시간 안에 덮어 4°C/40°F 이하로 냉장한다. 필로의 바삭한 식감을 위해 2일 안에 먹는 것을 권하지만 FoodSafety.gov는 구운 커스터드 파이를 3–4일로 안내한다. 자른 뒤 팬을 바로 냉장고에 돌려놓는다. 갈락토부레코는 보통 실온으로 먹으므로 재가열은 선택이다. 남은 조각을 데울 경우 중심을 74°C/165°F까지 데우고 필로가 부드러워질 수 있음을 감안한다.",
    "หลังเสิร์ฟให้ปิดฝาและแช่เย็นที่ไม่เกิน 4°C/40°F ภายใน 2 ชั่วโมง เพื่อความกรอบของฟีลโลแนะนำให้กินภายใน 2 วัน ส่วน FoodSafety.gov ระบุพายคัสตาร์ดอบสุก 3–4 วัน หลังตัดให้รีบนำถาดกลับเข้าตู้เย็น ปกติกาลักโตบูเรโกเสิร์ฟที่อุณหภูมิห้องจึงไม่จำเป็นต้องอุ่น หากจะอุ่นชิ้นที่เหลือให้ตรงกลางถึง 74°C/165°F และแป้งอาจนิ่มลง"
  );
  addOfficial(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  addOfficial(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficial(recipe, "FoodSafety.gov: Cold Food Storage Charts", storageChart);
}

export function refineSixtySecondMethods(recipes) {
  const targets = ["birria-de-res", "chilaquiles-verdes", "cullen-skink", "galaktoboureko"];
  const revisions = [reviseBirria, reviseChilaquiles, reviseCullenSkink, reviseGalaktoboureko];
  targets.forEach((id, index) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex < 0) throw new Error("Recipe method audit 62: missing recipe " + id);
    const revised = cloneForPublication(recipes[recipeIndex]);
    revisions[index](revised);
    recipes[recipeIndex] = revised;
  });
  return recipes;
}
