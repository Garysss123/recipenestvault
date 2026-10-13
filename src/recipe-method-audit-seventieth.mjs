const ml = (en, zh, ja, ko, th) => ({ en, "zh-hant": zh, ja, ko, th });
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url, publisher = "FoodSafety.gov") {
  const title = `Official food-safety guidance — ${publisher}: ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function addIngredient(recipe, amount, item) {
  recipe.ingredients.push({ amount, item });
}

function reviseKimchiJeon(recipe) {
  body(recipe, 4, ml(
    "Slide the first pancake onto a flat lid, invert the pan over it, then flip the pancake back into the skillet. Drizzle 10 ml oil around the edge and cook 3–4 minutes over medium heat until the second face is crisp and the centre is set, hot, and no longer glossy with wet batter. If the centre is still soft or damp when cut, lower the heat and cook 1–2 minutes more. Pancake texture is the doneness cue; 74°C is not a required safety endpoint for this meatless batter.",
    "將第一張煎餅滑到平坦鍋蓋上，倒扣鍋子再翻回平底鍋。沿鍋邊淋入 10 毫升油，以中火再煎 3–4 分鐘，直到另一面酥脆、中心定型且熱透，不再有濕亮麵糊。若切開後中心仍軟濕，轉小火續煎 1–2 分鐘。以煎餅口感判斷熟度；這道無肉麵糊不需要以 74°C 作為食安終點。",
    "最初のチヂミを平らなふたに滑らせ、フライパンをかぶせて返し、チヂミをフライパンに戻します。縁から油10mlを回し入れ、中火でさらに3〜4分、裏面がカリッとし、中心まで熱く固まり、濡れた生地のつやがなくなるまで焼きます。切って中心がまだ柔らかく湿っていたら、火を弱めて1〜2分追加します。食感で焼き上がりを判断し、肉を含まない生地に74°Cの安全終点は必要ありません。",
    "첫 전을 평평한 뚜껑에 밀어 올리고 팬을 덮어 뒤집은 다음 전을 팬에 다시 넣습니다. 가장자리에 기름 10ml를 두르고 중불에서 3–4분 더 구워 반대쪽이 바삭하고 가운데가 뜨겁게 익어 젖은 반죽처럼 윤이 나지 않게 합니다. 잘랐을 때 가운데가 여전히 부드럽거나 축축하면 불을 낮추고 1–2분 더 익힙니다. 식감으로 익힘을 판단하며 고기가 없는 반죽에 74°C 안전 기준은 필요하지 않습니다.",
    "เลื่อนแพนเค้กแผ่นแรกลงบนฝาแบน คว่ำกระทะครอบแล้วพลิกแพนเค้กกลับลงกระทะ หยอดน้ำมัน 10 มล.รอบขอบและทอดไฟกลางอีก 3–4 นาทีจนอีกด้านกรอบและตรงกลางเซ็ต ร้อน และไม่มีแป้งเปียกมันวาว หากผ่าดูแล้วยังนุ่มหรือชื้นตรงกลาง ให้ลดไฟและทอดต่อ 1–2 นาที ใช้เนื้อสัมผัสตัดสินความสุก แป้งสูตรนี้ไม่มีเนื้อสัตว์จึงไม่ต้องใช้อุณหภูมิ 74°C เป็นจุดสิ้นสุดด้านความปลอดภัย"
  ));
  recipe.storage = ml(
    "Cool cooked pancakes on a rack and refrigerate in a covered shallow container within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or below. Use within 2 days for the best crisp texture; that is a quality preference. Re-crisp only the portion you plan to eat in a lightly oiled pan until it is steaming hot throughout and reaches 74°C/165°F, the official reheating endpoint for leftovers.",
    "煎好的煎餅放網架降溫，並在 2 小時內（環境高於 32°C/90°F 時 1 小時內）放入有蓋淺容器，冷藏於 4°C/40°F 以下。為保持酥脆，建議 2 天內食用；這是品質偏好。只取要吃的份量，以薄油回煎至整份冒蒸氣且中心達 74°C/165°F，這是官方剩食復熱終點。",
    "焼いたチヂミは網で冷まし、室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に、蓋付きの浅い容器に入れて4°C以下で冷蔵します。食感を保つため2日以内に食べるのは品質上の目安です。食べる分だけ薄く油を引いたフライパンで、全体から湯気が立ち74°C/165°Fに達するまで焼き直します。これは残り物の公式再加熱温度です。",
    "부친 전은 망에서 식힌 뒤 실내가 32°C/90°F보다 더우면 1시간 안에, 그 외에는 2시간 안에 뚜껑 있는 얕은 용기에 담아 4°C/40°F 이하로 냉장합니다. 바삭한 식감을 위해 2일 안에 먹는 것은 품질 권장사항입니다. 먹을 만큼만 기름을 얇게 두른 팬에서 전체에 김이 나고 74°C/165°F에 도달할 때까지 다시 바삭하게 굽습니다. 이는 남은 음식의 공식 재가열 기준입니다.",
    "พักแพนเค้กที่ทอดแล้วบนตะแกรงให้เย็นและแช่ในภาชนะตื้นมีฝาที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F กินภายใน 2 วันเพื่อความกรอบที่ดีที่สุด ซึ่งเป็นคำแนะนำด้านคุณภาพ อุ่นเฉพาะส่วนที่จะกินในกระทะทาน้ำมันบาง ๆ จนมีไอทั่วถึงและถึง 74°C/165°F ซึ่งเป็นอุณหภูมิอุ่นอาหารเหลืออย่างเป็นทางการ"
  );
  addOfficialSource(recipe, "Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
}

function reviseBienenstich(recipe) {
  body(recipe, 7, ml(
    "Heat the 600 ml filling milk with the split vanilla bean until steaming. In a separate bowl whisk the 5 yolks, 110 g filling sugar, and 50 g cornstarch until smooth. Slowly whisk in half the hot milk, return the mixture to the saucepan, and cook over medium-low heat while whisking continuously and scraping the corners. Once thick and bubbling, check the centre of the custard with a clean food thermometer; it must reach at least 71°C/160°F. Do not use thickening or bubbles alone as the egg-safety check. Remove the vanilla bean.",
    "將 600 毫升內餡牛奶與剖開的香草莢加熱至冒蒸氣。另用碗將 5 個蛋黃、110 公克內餡糖及 50 公克玉米澱粉攪拌均勻。邊攪拌邊緩緩倒入一半熱牛奶，再倒回鍋中，以中小火持續攪拌並刮過鍋角。卡士達變濃且冒泡後，用乾淨食物溫度計測量中心，至少須達 71°C/160°F。不能只以變濃或冒泡作為蛋類安全判斷。取出香草莢。",
    "フィリング用牛乳600mlと割いたバニラビーンズを湯気が立つまで温めます。別のボウルで卵黄5個、フィリング用砂糖110g、コーンスターチ50gを滑らかに混ぜます。熱い牛乳の半量を少しずつ混ぜ入れて鍋に戻し、中弱火で鍋の角もこそげながら絶えず混ぜます。濃くなって泡が出たら、清潔な食品用温度計でカスタードの中心を測り、少なくとも71°C/160°Fに達したことを確認します。とろみや泡だけで卵の安全性を判断しません。バニラビーンズを取り出します。",
    "필링용 우유 600ml와 바닐라 빈을 갈라 넣고 김이 날 때까지 데웁니다. 별도 볼에 노른자 5개, 필링용 설탕 110g, 전분 50g을 매끈하게 섞습니다. 뜨거운 우유 절반을 천천히 휘저어 넣고 냄비로 되돌립니다. 중약불에서 냄비 모서리까지 긁어가며 계속 저어 익힙니다. 걸쭉해져 거품이 나면 깨끗한 식품 온도계로 커스터드 가운데를 재어 최소 71°C/160°F인지 확인합니다. 걸쭉함이나 거품만으로 달걀 안전성을 판단하지 않습니다. 바닐라 빈을 꺼냅니다.",
    "อุ่นนมสำหรับไส้ 600 มล.กับฝักวานิลลาที่ผ่าแล้วจนมีไอ ตีไข่แดง 5 ฟอง น้ำตาลสำหรับไส้ 110 กรัม และแป้งข้าวโพด 50 กรัมในชามอีกใบจนเนียน ค่อย ๆ ตีนมร้อนครึ่งหนึ่งลงไป เทกลับหม้อและปรุงไฟกลางอ่อนโดยตีตลอดพร้อมกวาดมุมหม้อ เมื่อข้นและเริ่มเดือดปุด ๆ ให้วัดตรงกลางคัสตาร์ดด้วยเทอร์โมมิเตอร์อาหารที่สะอาด ต้องได้อย่างน้อย 71°C/160°F อย่าใช้ความข้นหรือฟองเพียงอย่างเดียวตัดสินความปลอดภัยของไข่ นำฝักวานิลลาออก"
  ));
  body(recipe, 8, ml(
    "Whisk the 40 g filling butter into the hot custard. Pour it into a clean shallow heatproof dish, spread it no deeper than about 4 cm, and press food-safe wrap directly onto the surface. Refrigerate promptly at 4°C/40°F or below and chill at least 60 minutes, until completely cold, before folding in whipped cream. If it is not cooling quickly, set the shallow dish over an ice bath while stirring with a clean utensil, then refrigerate.",
    "將 40 公克內餡奶油攪入熱卡士達。倒入乾淨淺耐熱盤，厚度約不超過 4 公分，並將食品用保鮮膜貼住表面。盡快放入 4°C/40°F 以下冰箱冷藏，至少 60 分鐘並確認完全冰涼後，才拌入打發鮮奶油。若降溫不夠快，可將淺盤置於冰浴上並用乾淨器具攪拌，再冷藏。",
    "熱いカスタードにフィリング用バター40gを混ぜます。清潔な浅い耐熱容器に移し、深さを約4cm以下に広げ、食品用ラップを表面に直接密着させます。速やかに4°C以下で冷蔵し、少なくとも60分、完全に冷えるまで冷やしてから泡立てクリームを混ぜます。冷めにくい場合は清潔な器具で混ぜながら浅い容器を氷水に当て、その後冷蔵します。",
    "뜨거운 커스터드에 필링용 버터 40g을 저어 넣습니다. 깨끗하고 얕은 내열 접시에 붓고 깊이가 약 4cm를 넘지 않게 편 뒤 식품용 랩을 표면에 밀착합니다. 4°C/40°F 이하로 신속히 냉장하고 최소 60분, 완전히 차가워질 때까지 식힌 뒤 휘핑크림을 섞습니다. 빨리 식지 않으면 깨끗한 도구로 저으며 얕은 접시를 얼음물 위에 올린 후 냉장합니다.",
    "คนเนยสำหรับไส้ 40 กรัมลงในคัสตาร์ดร้อน เทใส่จานทนร้อนที่สะอาดและตื้น เกลี่ยให้ลึกไม่เกินประมาณ 4 ซม.แล้วปิดฟิล์มอาหารให้สัมผัสผิวหน้า แช่เย็นที่ 4°C/40°F หรือต่ำกว่าโดยเร็วอย่างน้อย 60 นาทีจนเย็นสนิทก่อนผสมวิปครีม หากเย็นช้า ให้วางจานตื้นบนอ่างน้ำแข็งและคนด้วยอุปกรณ์สะอาด แล้วจึงแช่เย็น"
  ));
  recipe.storage = ml(
    "Keep the finished cake covered at 4°C/40°F or below. Return it to the refrigerator within 2 hours after serving, or within 1 hour if the room is above 32°C/90°F. Use within 2 days for the best cream and sponge texture; this two-day window is a quality preference, not an official safety limit.",
    "完成的蛋糕須加蓋冷藏於 4°C/40°F 以下；上桌後 2 小時內放回冰箱，環境高於 32°C/90°F 時 1 小時內放回。為保持奶油與蛋糕體口感，建議 2 天內食用；此期限是品質偏好，不是官方食安期限。",
    "完成したケーキは蓋をして4°C/40°F以下で冷蔵します。提供後は2時間以内、室温が32°C/90°Fを超える場合は1時間以内に冷蔵庫へ戻します。クリームとスポンジの食感のため2日以内に食べるのは品質上の目安で、公的な安全期限ではありません。",
    "완성한 케이크는 덮어서 4°C/40°F 이하로 냉장합니다. 낸 뒤 2시간 안에 냉장고로 돌려놓고, 실내가 32°C/90°F보다 높으면 1시간 안에 넣습니다. 크림과 시트 식감을 위해 2일 안에 먹는 것은 품질 권장사항이지 공식 안전 기한이 아닙니다.",
    "เก็บเค้กที่เสร็จแล้วแบบปิดฝาที่ 4°C/40°F หรือต่ำกว่า นำกลับเข้าตู้เย็นภายใน 2 ชั่วโมงหลังเสิร์ฟ หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F กินภายใน 2 วันเพื่อเนื้อครีมและสปันจ์ที่ดีที่สุด ช่วง 2 วันนี้เป็นคำแนะนำด้านคุณภาพ ไม่ใช่กำหนดความปลอดภัยทางการ"
  );
  addOfficialSource(recipe, "Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "What You Need to Know About Egg Safety", eggSafety, "FDA");
}

function addExtraWater(recipe, item) {
  addIngredient(recipe, "0–60 ml", item);
}

function reviseGemista(recipe) {
  addExtraWater(recipe, ml(
    "boiling water, only if the roasting pan dries before the rice is tender",
    "沸水，僅在米飯熟透前烤盤變乾時補加",
    "米が柔らかくなる前に天板が乾いた場合のみ加える熱湯",
    "밥이 익기 전에 팬이 마를 때만 보충하는 끓는 물",
    "น้ำเดือด เติมเฉพาะเมื่อถาดแห้งก่อนข้าวสุก"
  ));
  body(recipe, 5, ml(
    "Take the rice mixture off the heat and spread it on a clean shallow tray for about 10 minutes, just until it stops steaming heavily. Fold in the parsley, mint, dill, and 30 ml olive oil, then fill the vegetables and start roasting promptly. If you need to pause after cooking the rice, cool it quickly in a shallow container and refrigerate within 1 hour; do not leave it in the warm pan.",
    "米飯餡離火後鋪在乾淨淺盤上約 10 分鐘，稍微散去熱氣即可。拌入巴西里、薄荷、蒔蘿及 30 毫升橄欖油，隨即填入蔬菜並開始烘烤。若米飯煮好後需要暫停，須在淺容器中快速降溫並於 1 小時內冷藏，不可留在溫熱鍋中放涼。",
    "米の具を火から下ろし、清潔な浅いトレーに広げて約10分、強い湯気が収まる程度に冷まします。パセリ、ミント、ディル、オリーブ油30mlを混ぜ、すぐ野菜に詰めて焼き始めます。米を加熱した後に作業を中断する場合は、浅い容器で素早く冷まし、1時間以内に冷蔵します。温かい鍋に入れたまま冷まさないでください。",
    "밥소를 불에서 내려 깨끗하고 얕은 쟁반에 펴서 약 10분, 김이 많이 나지 않을 정도로만 식힙니다. 파슬리, 민트, 딜, 올리브유 30ml를 섞은 뒤 곧바로 채소에 채워 굽기 시작합니다. 밥을 익힌 뒤 작업을 멈춰야 하면 얕은 용기에 펴서 빠르게 식히고 1시간 안에 냉장합니다. 따뜻한 팬에 둔 채 식히지 않습니다.",
    "ยกส่วนผสมข้าวลงจากเตา เกลี่ยบนถาดตื้นสะอาดประมาณ 10 นาที แค่ให้ไอแรงลดลง ใส่พาร์สลีย์ สะระแหน่ ดิลล์ และน้ำมันมะกอก 30 มล.แล้วรีบตักใส่ผักและเริ่มอบ หากต้องหยุดหลังหุงข้าว ให้เกลี่ยในภาชนะตื้นเพื่อให้เย็นเร็วและแช่เย็นภายใน 1 ชั่วโมง อย่าปล่อยให้เย็นคาหม้ออุ่น"
  ));
  body(recipe, 9, ml(
    "Remove the foil and roast 35–45 minutes more until the potatoes are browned and tender, the tomato skins wrinkle, and a cut through the largest stuffed vegetable shows fully tender rice with no hard or chalky centre. The time is an estimate. If the rice is still firm and the pan juices have dried, add the listed extra boiling water 30 ml at a time, cover again, and roast for 10-minute increments before checking once more.",
    "取下鋁箔，再烤 35–45 分鐘，直到馬鈴薯上色且鬆軟、番茄皮皺縮；切開最大顆填餡蔬菜，確認米飯完全柔軟，沒有硬心或粉質中心。時間僅為估算。若米飯仍硬且烤盤湯汁已乾，每次加入 30 毫升已列出的額外沸水，重新覆蓋並以 10 分鐘為間隔續烤，再次檢查。",
    "アルミホイルを外し、さらに35〜45分、じゃがいもに焼き色が付き柔らかくなり、トマトの皮にしわが寄るまで焼きます。一番大きな詰め野菜を切り、米に硬い芯や粉っぽい中心がなく、完全に柔らかいことを確認します。時間は目安です。米がまだ硬く、天板の汁がなくなっていたら、追加用の熱湯を30mlずつ加え、再び覆って10分ずつ焼いてから確認します。",
    "호일을 벗기고 35–45분 더 구워 감자가 노릇하고 부드러우며 토마토 껍질이 쭈글해지게 합니다. 가장 큰 속 채운 채소를 잘라 쌀에 딱딱하거나 분가루 같은 심이 없이 완전히 부드러운지 확인합니다. 시간은 추정치입니다. 쌀이 여전히 단단하고 팬 국물이 말랐다면 추가용 끓는 물을 30ml씩 넣고 다시 덮어 10분씩 더 구운 뒤 확인합니다.",
    "นำฟอยล์ออกแล้วอบต่อ 35–45 นาทีจนมันฝรั่งเกรียมและนุ่ม ผิวมะเขือเทศย่น และเมื่อผ่าผักยัดไส้ลูกใหญ่ที่สุดแล้วข้าวต้องนุ่มทั่ว ไม่มีไตแข็งหรือเป็นผง เวลาเป็นค่าประมาณ หากข้าวยังแข็งและน้ำในถาดแห้ง ให้เติมน้ำเดือดที่เตรียมเพิ่มครั้งละ 30 มล. ปิดฟอยล์แล้วอบต่อครั้งละ 10 นาทีก่อนตรวจอีกครั้ง"
  ));
  recipe.storage = ml(
    "Because this dish contains cooked rice, cool leftovers as quickly as possible in shallow portions and refrigerate within 1 hour at 4°C/40°F or below. Use within 24 hours. Reheat only once and until steaming hot throughout; warm only the portions you will eat. These rice-specific limits follow the UK Food Standards Agency and replace the previous three-day general leftover advice.",
    "本菜含熟飯，剩食須盡快分成淺份降溫，並於 1 小時內冷藏在 4°C/40°F 以下；24 小時內食用。只可復熱一次，並須整份冒蒸氣、完全熱透；只加熱要吃的份量。此米飯專屬期限依英國食品標準局指引，取代先前一般剩食三天的建議。",
    "この料理には加熱済みの米が入るため、残りは浅く小分けしてできるだけ早く冷まし、1時間以内に4°C以下で冷蔵します。24時間以内に食べ、再加熱は1回だけ、全体から湯気が立つまで温めます。食べる分だけ温め直してください。この米専用の期限は英国食品基準庁の案内に基づき、従来の一般的な残り物3日という案内に優先します。",
    "조리된 쌀이 들어 있으므로 남은 음식은 얕게 나누어 최대한 빨리 식히고 1시간 안에 4°C/40°F 이하로 냉장합니다. 24시간 안에 먹고 한 번만 다시 데우며 전체에서 김이 날 때까지 뜨겁게 합니다. 먹을 분량만 다시 데우세요. 쌀에 특화된 이 기한은 영국 식품기준청 지침을 따르며 이전의 일반 남은 음식 3일 안내를 대체합니다.",
    "เมนูนี้มีข้าวสุก ของเหลือให้แบ่งใส่ภาชนะตื้นและทำให้เย็นเร็วที่สุด แล้วแช่ที่ 4°C/40°F หรือต่ำกว่าภายใน 1 ชั่วโมง กินภายใน 24 ชั่วโมง อุ่นซ้ำได้เพียงครั้งเดียวและต้องร้อนมีไอทั่วถึง อุ่นเฉพาะส่วนที่จะกิน กำหนดเฉพาะสำหรับข้าวนี้อ้างอิงคำแนะนำของ UK Food Standards Agency และใช้แทนคำแนะนำเดิมที่ให้เก็บอาหารเหลือทั่วไป 3 วัน"
  );
  addOfficialSource(recipe, "Home Food Fact Checker: cooked rice cooling, storage, and reheating", riceSafety, "UK Food Standards Agency");
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
}

function reviseDolmades(recipe) {
  addExtraWater(recipe, ml(
    "boiling water, only if needed to finish the rice after the listed pot liquid is absorbed",
    "沸水，僅在列出的鍋中液體吸收後、米飯仍未熟時補加",
    "表示した煮汁が吸収された後も米が硬い場合のみ加える熱湯",
    "표시된 냄비 액체가 흡수된 뒤에도 쌀이 덜 익었을 때만 보충하는 끓는 물",
    "น้ำเดือด เติมเฉพาะเมื่อของเหลวในหม้อที่ระบุไว้ซึมหมดแต่ข้าวยังไม่สุก"
  ));
  body(recipe, 4, ml(
    "Spread the partially cooked rice mixture on a clean shallow tray and cool for about 15 minutes, only until it is comfortable to handle. Fold in parsley, dill, mint, 40 ml lemon juice, pepper, and 30 ml olive oil, then roll and cook the dolmades without an avoidable pause. If the work is interrupted, cool the rice quickly in a shallow container and refrigerate within 1 hour; do not leave it in the pan at room temperature.",
    "將半熟米飯餡鋪在乾淨淺盤上約 15 分鐘，降至可安全拿取即可。拌入巴西里、蒔蘿、薄荷、40 毫升檸檬汁、胡椒及 30 毫升橄欖油，接著捲製並烹煮葡萄葉卷，不要無故擱置。若製作中斷，須將米飯放在淺容器中快速降溫並於 1 小時內冷藏；不可留在鍋中室溫放涼。",
    "半煮した米の具を清潔な浅いトレーに広げて約15分、無理なく触れられる温度まで冷まします。パセリ、ディル、ミント、レモン汁40ml、こしょう、オリーブ油30mlを混ぜ、間を空けずに葉で巻いて煮ます。作業を中断する場合は米を浅い容器に移して速やかに冷まし、1時間以内に冷蔵します。鍋に入れたまま室温で冷まさないでください。",
    "덜 익힌 쌀소를 깨끗하고 얕은 쟁반에 펴서 약 15분, 편하게 만질 수 있을 정도로만 식힙니다. 파슬리, 딜, 민트, 레몬즙 40ml, 후추, 올리브유 30ml를 섞고 불필요하게 기다리지 말고 잎에 싸서 익힙니다. 작업을 멈춰야 하면 쌀을 얕은 용기에 펴서 빠르게 식히고 1시간 안에 냉장합니다. 팬에 둔 채 실온에서 식히지 않습니다.",
    "เกลี่ยส่วนผสมข้าวที่หุงบางส่วนบนถาดตื้นสะอาดประมาณ 15 นาที แค่ให้จับได้สะดวก ใส่พาร์สลีย์ ดิลล์ สะระแหน่ น้ำมะนาว 40 มล. พริกไทย และน้ำมันมะกอก 30 มล. จากนั้นห่อใบและปรุงต่อโดยไม่พักนาน หากต้องหยุด ให้เกลี่ยข้าวในภาชนะตื้นให้เย็นเร็วและแช่เย็นภายใน 1 ชั่วโมง อย่าปล่อยให้เย็นคาหม้อที่อุณหภูมิห้อง"
  ));
  body(recipe, 8, ml(
    "Pour in the remaining 150 ml hot water, 40 ml lemon juice, 40 ml olive oil, and remaining 6 g salt. Set a heatproof plate over the rolls, cover the pot, and bring it just to a simmer. Cook gently for about 40 minutes. Test a roll from the centre: the rice should be tender with no chalky or hard core. If it is still firm after the listed liquid is absorbed, add the optional boiling water 30 ml at a time, cover, and continue in 5–10 minute increments until tender.",
    "倒入剩餘 150 毫升熱水、40 毫升檸檬汁、40 毫升橄欖油及剩餘 6 公克鹽。用耐熱盤壓住葡萄葉卷，蓋鍋並煮至微滾，轉小火約 40 分鐘。取一顆中央的葉卷檢查：米飯須柔軟，沒有粉質或硬心。若列出的液體已吸收而米仍硬，每次加入 30 毫升選用沸水，蓋好鍋子再以 5–10 分鐘為間隔續煮至柔軟。",
    "残りの熱湯150ml、レモン汁40ml、オリーブ油40ml、塩6gを加えます。耐熱皿をロールの上に置いて重しにし、鍋に蓋をして沸騰直前まで温め、弱火で約40分煮ます。中心のロールを一つ確かめ、米が柔らかく、粉っぽい芯や硬い芯がないことを確認します。表示した煮汁が吸収されても米が硬い場合は、追加用の熱湯を30mlずつ加え、蓋をして5〜10分ずつ追加加熱します。",
    "남은 뜨거운 물 150ml, 레몬즙 40ml, 올리브유 40ml, 소금 6g을 넣습니다. 내열 접시를 말이 위에 올려 누르고 냄비를 덮어 약하게 끓인 뒤 약 40분 익힙니다. 가운데에 있는 말이 하나를 확인해 쌀이 부드럽고 가루 같거나 단단한 심이 없는지 봅니다. 표시된 액체가 흡수된 뒤에도 쌀이 단단하면 추가용 끓는 물을 30ml씩 넣고 덮어 5–10분 간격으로 더 익혀 부드러워질 때까지 확인합니다.",
    "เติมน้ำร้อนที่เหลือ 150 มล. น้ำมะนาว 40 มล. น้ำมันมะกอก 40 มล. และเกลือที่เหลือ 6 กรัม วางจานทนความร้อนกดบนใบที่ม้วนแล้ว ปิดหม้อและอุ่นจนเริ่มเดือดอ่อน เคี่ยวเบา ๆ ประมาณ 40 นาที ทดสอบหนึ่งชิ้นตรงกลาง ข้าวควรนุ่มไม่มีไตแข็งหรือเป็นผง หากของเหลวที่ระบุซึมหมดแล้วแต่ข้าวยังแข็ง ให้เติมน้ำเดือดที่เตรียมไว้ครั้งละ 30 มล. ปิดฝาและปรุงต่อครั้งละ 5–10 นาทีจนข้าวนุ่ม"
  ));
  recipe.storage = ml(
    "This dish contains cooked rice. Keep it hot until served; if saving any, cool the dolmades as quickly as possible in shallow portions and refrigerate within 1 hour at 4°C/40°F or below. Eat within 24 hours. Reheat only once, until steaming hot throughout, and serve promptly. Do not use the previous three-day general leftover window for this rice-filled dish.",
    "本菜含熟飯；上桌前保持熱度。若有剩食，須盡快分成淺份降溫，並於 1 小時內冷藏在 4°C/40°F 以下；24 小時內食用。只可復熱一次，並須整份冒蒸氣、完全熱透，隨即食用。米飯餡料理不適用先前一般剩食三天的期限。",
    "この料理には加熱済みの米が入ります。提供までは温かく保ち、残す場合は浅く小分けしてできるだけ早く冷まし、1時間以内に4°C以下で冷蔵します。24時間以内に食べ、再加熱は1回だけ、全体から湯気が立つまで温めてすぐ提供します。この米料理には一般的な残り物の3日間という期間を適用しません。",
    "이 음식에는 조리된 쌀이 들어 있습니다. 낼 때까지 따뜻하게 두고, 남기면 얕게 나누어 최대한 빨리 식힌 뒤 1시간 안에 4°C/40°F 이하로 냉장합니다. 24시간 안에 먹고 한 번만 다시 데워 전체에서 김이 날 때까지 뜨겁게 한 뒤 바로 냅니다. 쌀이 든 음식에는 이전의 일반 남은 음식 3일 기준을 적용하지 않습니다.",
    "เมนูนี้มีข้าวสุก รักษาให้อุ่นจนเสิร์ฟ หากเก็บเหลือให้แบ่งใส่ภาชนะตื้นและทำให้เย็นเร็วที่สุด แล้วแช่ที่ 4°C/40°F หรือต่ำกว่าภายใน 1 ชั่วโมง กินภายใน 24 ชั่วโมง อุ่นซ้ำได้เพียงครั้งเดียวจนมีไอทั่วถึงและเสิร์ฟทันที อย่าใช้ระยะเก็บอาหารเหลือทั่วไป 3 วันกับเมนูที่มีข้าวนี้"
  );
  addOfficialSource(recipe, "Home Food Fact Checker: cooked rice cooling, storage, and reheating", riceSafety, "UK Food Standards Agency");
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
}

export function refineSeventiethMethods(recipes) {
  const byId = new Map();
  for (const id of ["kimchi-jeon", "bienenstich", "gemista", "dolmades"]) {
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
  reviseKimchiJeon(byId.get("kimchi-jeon"));
  reviseBienenstich(byId.get("bienenstich"));
  reviseGemista(byId.get("gemista"));
  reviseDolmades(byId.get("dolmades"));
}
