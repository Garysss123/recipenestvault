const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url) {
  const title = `Official food-safety guidance — FoodSafety.gov: ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function reviseChurros(recipe) {
  body(recipe, 0, ml(
    "Whisk 15 g cornstarch into 100 ml cold milk until smooth. Heat the remaining 385 ml milk with 20 g sugar until steaming; reserve 15 ml hot milk for adjustment. Whisk in the slurry and cook 2 minutes, then add 180 g chopped chocolate and stir over low heat for 3–4 minutes until glossy and thick enough to coat a spoon. If it becomes too thick, whisk in the reserved milk 5 ml at a time; if it is thin, simmer 30 seconds longer. Keep warm below a simmer.",
    "將 15 公克玉米粉與 100 毫升冷牛奶攪拌至滑順。以 20 公克糖加熱其餘 385 毫升牛奶至冒蒸氣，另留 15 毫升熱牛奶備用。拌入玉米粉糊煮 2 分鐘，再加入 180 公克切碎巧克力，以小火攪拌 3–4 分鐘至光亮濃稠、能附著湯匙。若太稠，每次拌入 5 毫升預留牛奶；若太稀，再小火煮 30 秒。保溫但不要煮沸。",
    "コーンスターチ15gを冷たい牛乳100mlに溶きます。残りの牛乳385mlと砂糖20gを温めて湯気が立ったら、調整用に温かい牛乳15mlを取り分けます。コーンスターチ液を加えて2分煮てから、刻んだチョコレート180gを加え、弱火で3〜4分、つやが出てスプーンに付く濃さまで混ぜます。濃すぎる場合は取り分けた牛乳を5mlずつ加え、薄い場合は30秒ずつ追加で煮ます。沸騰させずに保温します。",
    "옥수수전분 15g을 차가운 우유 100ml에 풀어 둡니다. 남은 우유 385ml와 설탕 20g을 김이 날 때까지 데우고, 조절용으로 따뜻한 우유 15ml를 남겨 둡니다. 전분물을 넣어 2분 끓인 뒤 다진 초콜릿 180g을 넣고 약불에서 3–4분 저어 윤기가 나고 숟가락에 묻을 만큼 걸쭉하게 만듭니다. 너무 되면 남겨 둔 우유를 5ml씩 섞고, 묽으면 30초씩 더 끓입니다. 끓이지 말고 따뜻하게 둡니다.",
    "คนแป้งข้าวโพด 15 กรัมกับนมเย็น 100 มล. ให้เนียน อุ่นนมที่เหลือ 385 มล.กับน้ำตาล 20 กรัมจนมีไอ แล้วตวงนมอุ่น 15 มล.แยกไว้ปรับความข้น ใส่แป้งข้าวโพดที่ละลายไว้และต้ม 2 นาที จากนั้นใส่ช็อกโกแลตสับ 180 กรัม คนไฟอ่อน 3–4 นาทีจนเงาและข้นเคลือบช้อนได้ หากข้นเกินให้เติมนมที่พักไว้ครั้งละ 5 มล. หากเหลวให้เคี่ยวต่อครั้งละ 30 วินาที อุ่นไว้โดยไม่ให้เดือด"
  ));
  body(recipe, 3, ml(
    "Heat the frying oil to 180°C. Pipe 12–15 cm lengths directly over the oil, cut each with scissors, and fry only 4–5 at a time for an estimated 3–4 minutes, turning once; keep the oil between 175–185°C. The first churro is the test: open it across the thickest point. The centre should be dry and set, with no sticky or raw-looking dough. If it is still pasty, lower the oil to 170–175°C and fry the remaining pieces in 10–12 cm lengths for 30–45 seconds longer; if the outside darkens before the centre sets, do the same for the next batch. If a churro is still pale after 4 minutes, continue in 20-second increments. Let the oil return to 180°C between batches.",
    "將炸油加熱至 180°C。直接在油鍋上方擠出 12–15 公分長的麵糊，用剪刀剪斷；每次只炸 4–5 根，預估 3–4 分鐘並翻面一次，油溫維持 175–185°C。先炸一根作測試，在最厚處切開，中心應乾爽定型，不可黏糊或有生麵糊樣。若中心仍糊，將油溫降至 170–175°C，後續每根擠成 10–12 公分並多炸 30–45 秒；若外層先變深色而中心未熟，下一批也照此調整。炸滿 4 分鐘仍偏白時，每次續炸 20 秒。每批之間等油溫回到 180°C。",
    "揚げ油を180°Cに熱します。油の上で生地を12〜15cmに絞り、はさみで切ります。一度に4〜5本だけ、目安3〜4分、途中で一度返して揚げ、油温を175〜185°Cに保ちます。最初の1本を試しに揚げ、最も太い部分を切ります。中心は乾いて固まり、べたついた生地や生のような部分がない状態が目安です。まだ生地状なら油を170〜175°Cに下げ、次から長さを10〜12cmにして30〜45秒長く揚げます。外側が先に濃く色づく場合も次の分は同様に調整します。4分後も白ければ20秒ずつ追加します。次の分を入れる前に油温を180°Cへ戻します。",
    "튀김 기름을 180°C로 달굽니다. 기름 위에 반죽을 12–15cm 길이로 짜고 가위로 자릅니다. 한 번에 4–5개씩만 약 3–4분 튀기며 한 번 뒤집고, 기름은 175–185°C로 유지합니다. 첫 번째 츄로를 시험 삼아 튀겨 가장 두꺼운 부분을 잘라 봅니다. 속은 마르고 익어야 하며 끈적이거나 날반죽처럼 보여서는 안 됩니다. 속이 질척하면 기름을 170–175°C로 낮추고 다음 것은 10–12cm 길이로 짜서 30–45초 더 튀깁니다. 겉이 속보다 먼저 진해져도 다음 배치에 같은 방법을 씁니다. 4분 뒤에도 옅으면 20초씩 더 튀깁니다. 배치 사이에 기름을 다시 180°C로 올립니다.",
    "ตั้งน้ำมันทอดที่ 180°C บีบแป้งยาว 12–15 ซม.เหนือกระทะแล้วใช้กรรไกรตัด ทอดครั้งละ 4–5 ชิ้นประมาณ 3–4 นาที พลิกหนึ่งครั้ง และรักษาน้ำมันที่ 175–185°C ทอดชิ้นแรกเป็นชิ้นทดสอบ ผ่าตรงส่วนที่หนาที่สุด เนื้อด้านในควรแห้งและสุก ไม่มีแป้งเหนียวหรือดูดิบ หากยังแฉะ ให้ลดน้ำมันเป็น 170–175°C แล้วบีบชิ้นถัดไปยาว 10–12 ซม.และทอดเพิ่ม 30–45 วินาที หากด้านนอกเข้มก่อนด้านในสุก ให้ปรับแบบเดียวกันในรอบถัดไป หากครบ 4 นาทีแล้วยังซีด ให้ทอดเพิ่มครั้งละ 20 วินาที รอให้น้ำมันกลับถึง 180°C ก่อนลงชุดต่อไป"
  ));
  recipe.storage = ml(
    "Churros are best eaten immediately; cool and keep them airtight at room temperature for up to 1 day, then re-crisp at 190°C for 4–5 minutes. Refrigerate leftover chocolate in a shallow covered container at 4°C/40°F or below within 2 hours (within 1 hour above 32°C/90°F). Use within 2 days for the best texture; that is a quality preference. Reheat only the amount needed, stirring, until it reaches 74°C/165°F.",
    "吉拿棒現炸現吃最佳；若需保存，冷卻後密封常溫放 1 天內食用，再以 190°C 烤 4–5 分鐘回酥。剩餘巧克力醬放入淺而有蓋的容器，2 小時內冷藏於 4°C/40°F 以下；環境高於 32°C/90°F 時須在 1 小時內冷藏。為保持最佳口感，建議 2 天內使用；這是品質建議。只取需要的份量，邊攪拌邊加熱至 74°C/165°F。",
    "チュロスは揚げたてが最適です。保存する場合は冷まして密閉し、室温で1日以内に食べ、190°Cのオーブンで4〜5分温め直します。残ったチョコレートは浅い蓋付き容器に入れ、2時間以内（32°Cを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。最適な食感のため2日以内に使うのがおすすめです。これは品質上の目安です。食べる分だけをかき混ぜながら74°C/165°Fまで再加熱します。",
    "츄로스는 바로 먹을 때 가장 좋습니다. 보관하려면 식혀 밀폐해 실온에서 하루 안에 먹고 190°C 오븐에서 4–5분 다시 바삭하게 합니다. 남은 초콜릿은 얕은 뚜껑 용기에 담아 2시간 안에(32°C/90°F보다 높은 곳에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 가장 좋은 식감을 위해 2일 안에 쓰는 것이 좋으며 이는 품질 권장 기간입니다. 먹을 만큼만 덜어 저으면서 74°C/165°F까지 다시 데웁니다.",
    "ชูโรสอร่อยที่สุดเมื่อกินทันที หากต้องเก็บ ให้พักจนเย็น ปิดสนิทและเก็บที่อุณหภูมิห้องไม่เกิน 1 วัน แล้วอุ่นให้กรอบในเตาอบ 190°C 4–5 นาที แช่ช็อกโกแลตที่เหลือในภาชนะตื้นมีฝาปิดที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) แนะนำให้ใช้ภายใน 2 วันเพื่อเนื้อสัมผัสที่ดีที่สุด ซึ่งเป็นคำแนะนำด้านคุณภาพ อุ่นเฉพาะส่วนที่จะกินพร้อมคนจนถึง 74°C/165°F"
  );
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "Safe Minimum Internal Temperatures", temperatures);
}

function reviseGozleme(recipe) {
  body(recipe, 1, ml(
    "Divide the dough into 4 equal balls. Use the remaining 5 ml from the listed 30 ml divided olive oil to rub the balls lightly, then cover and rest at room temperature for 25 minutes so the gluten relaxes and the dough rolls without springing back.",
    "將麵糰分成 4 個等份。用所列 30 毫升分配用橄欖油中剩下的 5 毫升薄薄抹在麵糰球上，蓋好後在室溫靜置 25 分鐘，讓麵筋放鬆、擀開時不會回縮。",
    "生地を4等分して丸めます。分量30mlのオリーブ油の残り5mlを薄く塗り、覆って室温で25分休ませます。グルテンが緩み、伸ばすときに縮みにくくなります。",
    "반죽을 같은 크기 4개로 나눠 둥글립니다. 나눠 둔 올리브유 30ml 중 남은 5ml를 얇게 바르고 덮어 실온에서 25분 쉽니다. 글루텐이 풀려 밀 때 다시 줄어들지 않습니다.",
    "แบ่งแป้งเป็น 4 ก้อนเท่ากัน ใช้น้ำมันมะกอก 5 มล.ที่เหลือจากปริมาณ 30 มล.ทาบาง ๆ คลุมและพักที่อุณหภูมิห้อง 25 นาทีเพื่อให้กลูเตนคลายตัวและรีดแล้วไม่หดกลับ"
  ));
  body(recipe, 5, ml(
    "Heat a dry griddle or heavy skillet over medium-high. Cook each folded flatbread for an estimated 2–3 minutes per side, pressing lightly, until brown spots appear, the centre is hot, the cheese softens, and no pale raw-dough line remains at the fold. Brush each with about 3–4 ml from the separately listed 15 ml olive oil. If the bread browns before the centre is hot, lower the heat to medium, cover the pan for 45–60 seconds, then check again; continue in 30-second covered increments if needed. Cut into wedges.",
    "將乾煎台或厚底平底鍋以中大火加熱。每張摺好的餅預估每面煎 2–3 分鐘，輕壓至出現褐色斑點、中心熱透、乳酪變軟，摺邊看不到白色生麵糰。每張用另外列出的 15 毫升橄欖油約 3–4 毫升薄刷表面。若外層先上色而中心還不熱，降至中火並蓋鍋 45–60 秒後再檢查；需要時每次加蓋續煎 30 秒。切成楔形。",
    "乾いたグリドルまたは厚手のフライパンを中強火で熱します。折りたたんだ生地を一枚ずつ、軽く押しながら片面2〜3分を目安に焼きます。焼き色が点々と付き、中心が熱く、チーズが柔らかくなり、折り目に白い生地が残らない状態が目安です。別に記載したオリーブ油15mlから一枚あたり3〜4mlを薄く塗ります。中心が温まる前に表面が色づく場合は中火に下げ、蓋をして45〜60秒焼いて再確認します。必要なら蓋をしたまま30秒ずつ追加します。くさび形に切ります。",
    "마른 그리들이나 두꺼운 팬을 중강불로 달굽니다. 접은 빵을 한 장씩 가볍게 누르며 한 면당 약 2–3분 굽습니다. 갈색 반점이 생기고 가운데가 뜨거우며 치즈가 부드러워지고 접힌 부분에 흰 생반죽 선이 남지 않아야 합니다. 별도로 적힌 올리브유 15ml에서 빵 한 장당 약 3–4ml를 얇게 바릅니다. 가운데가 뜨거워지기 전에 겉이 갈색이 되면 중불로 낮추고 뚜껑을 덮어 45–60초 뒤 다시 확인합니다. 필요하면 덮은 채 30초씩 더 굽습니다. 쐐기 모양으로 자릅니다.",
    "ตั้งกระทะแบนหรือกระทะหนาแห้งด้วยไฟกลางค่อนแรง ทอดแป้งพับทีละชิ้นประมาณ 2–3 นาทีต่อด้าน กดเบา ๆ จนมีจุดสีน้ำตาล ตรงกลางร้อน ชีสนุ่ม และไม่มีเส้นแป้งดิบสีซีดตรงรอยพับ ทาน้ำมันมะกอก 3–4 มล.ต่อชิ้นจากปริมาณ 15 มล.ที่แยกไว้ หากด้านนอกเป็นสีก่อนตรงกลางร้อน ให้ลดเป็นไฟกลาง ปิดฝา 45–60 วินาทีแล้วตรวจอีกครั้ง หากจำเป็นให้ปิดต่อครั้งละ 30 วินาที ตัดเป็นชิ้นสามเหลี่ยม"
  ));
  recipe.storage = ml(
    "For best texture, eat gözleme the day it is cooked. Cool leftovers in a shallow container and refrigerate at 4°C/40°F or below within 2 hours (within 1 hour above 32°C/90°F). Use within 3 days as a quality preference. Reheat until the centre reaches 74°C/165°F.",
    "現煎當天食用口感最佳。剩餘 gözleme 放入淺容器，2 小時內冷藏於 4°C/40°F 以下；環境高於 32°C/90°F 時須在 1 小時內冷藏。3 天內食用是口感建議。回熱至中心達 74°C/165°F。",
    "焼いた当日に食べると最もおいしく楽しめます。残りは浅い容器に入れ、2時間以内（32°Cを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。3日以内は食感を保つための目安です。中心が74°C/165°Fに達するまで再加熱します。",
    "구운 당일 먹을 때 식감이 가장 좋습니다. 남은 괴즐레메는 얕은 용기에 담아 2시간 안에(32°C/90°F보다 높은 곳에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 3일 이내는 식감을 위한 권장 기간입니다. 가운데가 74°C/165°F에 도달할 때까지 다시 데웁니다.",
    "กินในวันที่ทำจะได้เนื้อสัมผัสดีที่สุด ใส่ของเหลือในภาชนะตื้นและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) ควรกินภายใน 3 วันเพื่อคุณภาพ อุ่นซ้ำจนตรงกลางถึง 74°C/165°F"
  );
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "Safe Minimum Internal Temperatures", temperatures);
}

function reviseBrigadeiro(recipe) {
  body(recipe, 0, ml(
    "Reserve 5 g of the listed 30 g butter for the plate and your hands. Put the remaining 25 g butter, condensed milk, cocoa powder and salt in a heavy skillet. Stir over medium heat until no dry cocoa pockets remain.",
    "從所列 30 公克奶油中預留 5 公克，用來抹盤子和雙手。將其餘 25 公克奶油、煉乳、可可粉與鹽放入厚底鍋，以中火攪拌至沒有乾燥可可粉塊。",
    "記載のバター30gから5gを取り分け、皿と手に塗るために使います。残り25gのバター、練乳、ココア、塩を厚手のフライパンに入れ、中火で乾いたココアの塊がなくなるまで混ぜます。",
    "적힌 버터 30g 중 5g을 접시와 손에 바르도록 남겨 둡니다. 남은 버터 25g, 연유, 코코아 가루와 소금을 두꺼운 팬에 넣고 마른 코코아 덩어리가 없어질 때까지 중불에서 저어 줍니다.",
    "แบ่งเนย 5 กรัมจากที่ระบุไว้ 30 กรัมไว้ทาจานและมือ ใส่เนยที่เหลือ 25 กรัม นมข้นหวาน ผงโกโก้ และเกลือลงในกระทะก้นหนา คนด้วยไฟกลางจนไม่เหลือผงโกโก้แห้งเป็นก้อน"
  ));
  body(recipe, 1, ml(
    "Cook for an estimated 8–10 minutes, stirring and scraping the base continuously. It is ready when the mass pulls cleanly from the pan and a spatula drawn across the base leaves a track open for about 2 seconds. If the track closes immediately, cook 1 minute longer and test again; do not rely on time alone.",
    "預估煮 8–10 分鐘，全程攪拌並刮鍋底。當糖糊能整團離鍋，且刮過鍋底的痕跡約 2 秒不合起來，即完成。若痕跡立刻合攏，再煮 1 分鐘後重測；不要只依計時判斷。",
    "目安8〜10分、鍋底を絶えず混ぜてこすりながら加熱します。生地がまとまって鍋からきれいに離れ、底に引いたへらの跡が約2秒残ればでき上がりです。跡がすぐ閉じる場合は1分追加して再確認し、時間だけで判断しません。",
    "약 8–10분 동안 계속 저으며 팬 바닥을 긁어 줍니다. 반죽 덩어리가 팬에서 깨끗이 떨어지고 주걱으로 바닥을 그었을 때 자국이 약 2초 남으면 다 된 것입니다. 자국이 바로 메워지면 1분 더 끓이고 다시 확인합니다. 시간만으로 판단하지 않습니다.",
    "เคี่ยวประมาณ 8–10 นาที คนและกวาดก้นกระทะตลอด เมื่อส่วนผสมรวมเป็นก้อนและล่อนจากกระทะสะอาด รอยที่ลากผ่านก้นกระทะด้วยพายควรเปิดค้างประมาณ 2 วินาที หากรอยปิดทันทีให้เคี่ยวต่อ 1 นาทีแล้วตรวจอีกครั้ง อย่าดูเวลาเพียงอย่างเดียว"
  ));
  body(recipe, 2, ml(
    "Use about 1 g of the reserved butter to grease a plate. Transfer the hot mixture, press parchment directly on its surface, and chill for 30 minutes. If it is still too soft to portion, chill another 15 minutes; if it is firm, let it stand 5 minutes before shaping.",
    "用預留奶油約 1 公克抹盤。將熱糖糊移到盤中，烘焙紙直接貼住表面，冷藏 30 分鐘。若仍太軟而無法分份，再冷藏 15 分鐘；若已很硬，塑形前在室溫放 5 分鐘。",
    "取り分けたバター約1gを皿に塗ります。熱い生地を移し、表面にクッキングシートを直接貼り付けて30分冷蔵します。まだ柔らかすぎて分けられなければ15分追加で冷やします。固ければ成形前に室温で5分置きます。",
    "남겨 둔 버터 약 1g으로 접시에 기름칠합니다. 뜨거운 반죽을 옮기고 표면에 유산지를 바로 붙여 30분 냉장합니다. 여전히 너무 물러 나눌 수 없으면 15분 더 냉장하고, 단단하면 빚기 전에 실온에 5분 둡니다.",
    "ใช้เนยที่แบ่งไว้ประมาณ 1 กรัมทาจาน ย้ายส่วนผสมร้อนลงจานแล้วแนบกระดาษรองอบกับผิวหน้า แช่เย็น 30 นาที หากยังนิ่มเกินจะแบ่ง ให้แช่ต่ออีก 15 นาที หากแข็งแล้ว พักที่อุณหภูมิห้อง 5 นาทีก่อนปั้น"
  ));
  body(recipe, 3, ml(
    "Weigh the cooled mixture and divide all of it into 18 equal portions, about 22–25 g each after evaporation. Lightly butter your hands with the reserved butter and roll each portion smooth; this uses the full batch instead of leaving an unportioned remainder.",
    "秤量冷卻後的糖糊，全部分成 18 等份；水分蒸發後每份約 22–25 公克。用預留奶油薄抹雙手，將每份搓圓，確保整鍋糖糊都分配完，不會剩下一大塊未分份。",
    "冷めた生地の重さを量り、全量を18等分します。水分の蒸発後で1個約22〜25gが目安です。取り分けたバターを手に薄く塗り、各分をなめらかに丸めます。生地を残さず使い切れます。",
    "식힌 반죽의 무게를 재고 전부 18등분합니다. 수분이 증발한 뒤 한 개당 약 22–25g입니다. 남겨 둔 버터를 손에 얇게 바르고 각 조각을 매끈하게 굴려, 반죽을 남기지 않고 모두 씁니다.",
    "ชั่งส่วนผสมที่เย็นแล้วและแบ่งทั้งหมดเป็น 18 ส่วนเท่ากัน หลังน้ำระเหยแต่ละลูกจะหนักประมาณ 22–25 กรัม ทาเนยที่แบ่งไว้บาง ๆ บนมือแล้วคลึงแต่ละส่วนให้กลม เพื่อใช้ส่วนผสมทั้งชุดโดยไม่เหลือก้อนที่ยังไม่ได้แบ่ง"
  ));
  recipe.storage = ml(
    "Keep brigadeiros covered at 4°C/40°F or below and refrigerate within 2 hours (within 1 hour above 32°C/90°F). Use within 3 days for the best fudgy texture; that is a quality preference. Bring out only the portion being served and return the rest to the refrigerator promptly.",
    "Brigadeiro 加蓋冷藏於 4°C/40°F 以下，並在 2 小時內冷藏；環境高於 32°C/90°F 時須在 1 小時內冷藏。為保持最佳軟糯口感，建議 3 天內食用；這是品質建議。只取要上桌的份量，其餘盡快放回冰箱。",
    "ブリガデイロは覆って4°C/40°F以下で保存し、2時間以内（32°Cを超える場合は1時間以内）に冷蔵します。柔らかな食感を保つため3日以内に食べるのがおすすめです。これは品質上の目安です。食べる分だけ出し、残りはすぐ冷蔵庫へ戻します。",
    "브리가데이루는 덮어서 4°C/40°F 이하로 보관하고 2시간 안에(32°C/90°F보다 높은 곳에서는 1시간 안에) 냉장합니다. 가장 부드러운 식감을 위해 3일 안에 먹는 것이 좋으며 이는 품질 권장 기간입니다. 먹을 만큼만 꺼내고 나머지는 바로 냉장고에 돌려놓습니다.",
    "ปิดฝาบริกาเดโรและเก็บที่ 4°C/40°F หรือต่ำกว่า แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) กินภายใน 3 วันเพื่อเนื้อสัมผัสนุ่มหนึบที่สุด ซึ่งเป็นคำแนะนำด้านคุณภาพ นำออกมาเฉพาะส่วนที่จะเสิร์ฟและรีบนำส่วนที่เหลือกลับเข้าตู้เย็น"
  );
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
}

function reviseCheBaMau(recipe) {
  recipe.ingredients[3].item = ml(
    "pure agar-agar powder, not a sweetened jelly mix; keep up to 3 g extra for correction if needed",
    "純寒天粉，不用含糖果凍預拌粉；另備最多 3 公克，凝固不足時調整",
    "純寒天粉（加糖ゼリーミックス不可）；固まらない場合に備え、追加用を最大3g用意",
    "순수 한천가루(설탕 든 젤리 믹스 제외); 굳지 않을 때 조절하도록 최대 3g 추가분 준비",
    "ผงวุ้นบริสุทธิ์ ไม่ใช่ผงวุ้นสำเร็จผสมน้ำตาล; เตรียมเพิ่มได้สูงสุด 3 กรัมไว้ปรับหากไม่เซ็ต"
  );
  body(recipe, 2, ml(
    "Pour the dissolved agar into the shallow dish and skim bubbles. Chill for at least 4 hours until firm; test the edge with a clean spoon. It should cut cleanly and hold its shape. If it is still liquid after chilling, scrape it back into the saucepan and bring it to a full boil for 2 minutes while stirring. If it still will not set after another chill, whisk in extra pure agar 1 g at a time, up to 3 g total; boil for 2 minutes after each addition, pour it into the dish, and chill for 4 hours before retesting. Different agar products can vary in strength.",
    "將溶解的洋菜倒入淺盤並撈除氣泡，冷藏至少 4 小時至凝固；用乾淨湯匙測試邊緣，應能俐落切開並保持形狀。若冷藏後仍呈液態，刮回鍋中，邊攪拌邊煮沸 2 分鐘。若再次冷藏後仍無法凝固，每次拌入 1 公克預留純洋菜粉，最多加 3 公克；每次添加後煮沸 2 分鐘，再倒入淺盤冷藏 4 小時後重測。不同洋菜產品的凝固力可能不同。",
    "溶けた寒天液を浅い容器に注ぎ、泡を取り除きます。4時間以上冷やして固め、清潔なスプーンで端を確認します。きれいに切れて形を保てればよい状態です。冷やしても液体のままなら鍋に戻し、混ぜながら2分間しっかり沸騰させます。再び冷やしても固まらない場合は、追加の純寒天粉を1gずつ、合計3gまで混ぜ入れます。追加ごとに2分沸騰させ、容器に注いで4時間冷やしてから再確認します。寒天製品によって凝固力が異なることがあります。",
    "녹인 한천을 얕은 용기에 붓고 거품을 걷어 냅니다. 최소 4시간 냉장해 굳힌 뒤 깨끗한 숟가락으로 가장자리를 확인합니다. 깔끔하게 잘리고 모양을 유지해야 합니다. 냉장 후에도 액체면 냄비에 긁어 담아 저으면서 2분간 완전히 끓입니다. 다시 냉장한 뒤에도 굳지 않으면 추가 순수 한천가루를 1g씩, 총 3g까지 넣어 휘젓습니다. 추가할 때마다 2분간 끓이고 용기에 부어 4시간 냉장한 뒤 다시 확인합니다. 한천 제품마다 굳는 힘이 다를 수 있습니다.",
    "เทวุ้นที่ละลายแล้วลงภาชนะตื้นและช้อนฟองออก แช่เย็นอย่างน้อย 4 ชั่วโมงจนเซ็ต ทดสอบขอบด้วยช้อนสะอาด ควรตัดได้เรียบและคงรูป หากยังเป็นของเหลวหลังแช่เย็น ให้ขูดกลับลงหม้อ คนและต้มให้เดือดเต็มที่ 2 นาที หากแช่เย็นอีกครั้งแล้วยังไม่เซ็ต ให้คนผงวุ้นบริสุทธิ์ที่เตรียมไว้เพิ่มครั้งละ 1 กรัม รวมไม่เกิน 3 กรัม ต้ม 2 นาทีหลังเติมแต่ละครั้ง เทใส่ภาชนะและแช่เย็น 4 ชั่วโมงก่อนทดสอบอีกครั้ง ผงวุ้นแต่ละยี่ห้ออาจมีความสามารถในการเซ็ตต่างกัน"
  ));
  body(recipe, 6, ml(
    "Transfer the beans and coconut sauce to separate clean, shallow containers no deeper than about 5 cm. Do not wait for them to reach room temperature: refrigerate promptly at 4°C/40°F or below, and always within 2 hours of cooking (within 1 hour above 32°C/90°F). Keep each component covered and separate while chilling.",
    "將紅豆、黑眼豆與椰奶醬分別放入乾淨淺容器，深度不超過約 5 公分。不要等到完全降至室溫才冷藏：煮好後盡快放入 4°C/40°F 以下冰箱，最晚須在 2 小時內；環境高於 32°C/90°F 時須在 1 小時內冷藏。冷藏時各種材料分開並加蓋。",
    "豆とココナッツソースはそれぞれ清潔な浅い容器に入れ、深さを約5cm以下にします。室温まで冷めるのを待たず、調理後できるだけ早く、必ず2時間以内（32°Cを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。冷やす間は別々にして覆います。",
    "콩과 코코넛 소스를 각각 깨끗하고 깊이 약 5cm 이하인 얕은 용기에 담습니다. 실온까지 식을 때까지 기다리지 말고 조리 후 가능한 한 빨리, 늦어도 2시간 안에(32°C/90°F보다 높은 곳에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 식히는 동안 재료를 분리해 덮어 둡니다.",
    "ตักถั่วและซอสมะพร้าวใส่ภาชนะแยกกันที่สะอาดและตื้น ลึกไม่เกินประมาณ 5 ซม. อย่ารอให้เย็นถึงอุณหภูมิห้อง ให้นำเข้าตู้เย็นที่ 4°C/40°F หรือต่ำกว่าโดยเร็ว และภายใน 2 ชั่วโมงหลังปรุงเสมอ (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) ปิดฝาและแยกส่วนประกอบระหว่างแช่เย็น"
  ));
  body(recipe, 8, ml(
    "Divide the red beans and black-eyed peas evenly among four glasses: 60 g of each per glass. Add one quarter of the jelly to each, then 150 g crushed ice and about one quarter (65 ml) of the coconut sauce. Assemble one glass at a time and serve immediately so the ice does not dilute the layers.",
    "紅豆與黑眼豆各分成四份，每杯各放 60 公克。每杯再加入四分之一的洋菜、150 公克碎冰及四分之一椰奶醬（約 65 毫升）。一次組裝一杯並立即上桌，避免冰融化稀釋各層。",
    "小豆と黒目豆はそれぞれ4等分し、各グラスに60gずつ入れます。寒天を4等分して加え、砕いた氷150g、ココナッツソースの4分の1（約65ml）を重ねます。氷で層が薄まらないよう、一杯ずつ組み立ててすぐに提供します。",
    "팥과 동부콩을 각각 4등분해 잔마다 60g씩 담습니다. 한천도 4등분해 넣고 얼음 150g과 코코넛 소스 4분의 1(약 65ml)을 얹습니다. 얼음이 녹아 층이 묽어지지 않도록 한 잔씩 담아 바로 냅니다.",
    "แบ่งถั่วแดงและถั่วตาดำอย่างละ 4 ส่วน ใส่แก้วละ 60 กรัม เติมวุ้นหนึ่งในสี่ของทั้งหมด น้ำแข็งบด 150 กรัม และซอสมะพร้าวหนึ่งในสี่ (ประมาณ 65 มล.) ประกอบทีละแก้วและเสิร์ฟทันทีเพื่อไม่ให้น้ำแข็งละลายเจือจางแต่ละชั้น"
  ));
  recipe.storage = ml(
    "Keep the jelly, each bean layer, and coconut sauce covered in separate shallow containers at 4°C/40°F or below. Refrigerate within 2 hours (within 1 hour above 32°C/90°F). Use within 3 days for best texture; that is a quality preference. Add ice only when serving, and discard an assembled dessert left out longer than 2 hours.",
    "洋菜、兩種豆和椰奶醬分開放入淺容器，加蓋冷藏於 4°C/40°F 以下，並在 2 小時內冷藏；環境高於 32°C/90°F 時須在 1 小時內冷藏。為保持最佳口感，建議 3 天內使用；這是品質建議。上桌時才加冰，組裝後放置超過 2 小時的甜品應丟棄。",
    "寒天、2種類の豆、ココナッツソースはそれぞれ浅い容器に入れて覆い、2時間以内（32°Cを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。食感を保つため3日以内に使うのがおすすめです。これは品質上の目安です。氷は提供時に加え、組み立てたデザートを2時間以上室温に置いた場合は廃棄します。",
    "한천, 각 콩, 코코넛 소스를 얕은 용기에 따로 담아 덮고 2시간 안에(32°C/90°F보다 높은 곳에서는 1시간 안에) 4°C/40°F 이하로 냉장합니다. 가장 좋은 식감을 위해 3일 안에 쓰는 것이 좋으며 이는 품질 권장 기간입니다. 얼음은 낼 때만 넣고 조립한 디저트를 실온에 2시간 넘게 두었다면 버립니다.",
    "เก็บวุ้น ถั่วแต่ละชนิด และซอสมะพร้าวแยกกันในภาชนะตื้นมีฝาปิดที่ 4°C/40°F หรือต่ำกว่า แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงหากอุณหภูมิสูงกว่า 32°C/90°F) ใช้ภายใน 3 วันเพื่อคุณภาพที่ดีที่สุด ซึ่งเป็นคำแนะนำด้านคุณภาพ เติมน้ำแข็งเมื่อเสิร์ฟเท่านั้น และทิ้งของหวานที่ประกอบแล้วหากวางทิ้งไว้นานกว่า 2 ชั่วโมง"
  );
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
}

export function refineSeventySecondMethods(recipes) {
  const byId = new Map();
  for (const id of ["churros-con-chocolate", "gozleme", "brigadeiro", "che-ba-mau"]) {
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
  reviseChurros(byId.get("churros-con-chocolate"));
  reviseGozleme(byId.get("gozleme"));
  reviseBrigadeiro(byId.get("brigadeiro"));
  reviseCheBaMau(byId.get("che-ba-mau"));
}
