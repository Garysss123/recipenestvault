const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function preparePublicationCopy(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = recipe.tips.map((tip) => ({ ...tip }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
}

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url) {
  const title = `Official food-safety guidance — ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function setStorage(recipe) {
  recipe.storage = ml(
    "Cool leftovers in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 3 days. For the best pasta texture, eat within 2 days. Reheat only the portion needed, stirring, until it reaches 74°C/165°F throughout. That safety minimum is for leftovers, not the al dente target for freshly cooked pasta.",
    "剩食分裝淺盒，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持在 4°C／40°F 或以下，3 天內食用。若重視麵條口感，最好 2 天內吃完。只取要吃的份量，邊攪拌邊回熱至整體達 74°C／165°F。這是剩食安全最低回熱溫度，不是新煮麵條的 al dente 口感目標。",
    "残りは浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3日以内に食べます。パスタの食感を優先するなら2日以内がおすすめです。食べる分だけ混ぜながら全体が74°C/165°Fに達するまで再加熱します。この安全最低温度は残り物用で、作りたてのパスタのアルデンテの目安ではありません。",
    "남은 음식은 얕은 용기에 나눠 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 파스타 식감을 가장 좋게 즐기려면 2일 안에 먹습니다. 먹을 양만 저으면서 속까지 74°C/165°F에 도달하도록 다시 데웁니다. 이 안전 최소 온도는 남은 음식에 적용되며 갓 삶은 파스타의 알덴테 기준은 아닙니다.",
    "แบ่งของเหลือใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า และกินภายใน 3 วัน หากต้องการเนื้อพาสตาดีที่สุดให้กินภายใน 2 วัน อุ่นเฉพาะส่วนที่จะกิน คนไปด้วยจนร้อนทั่วถึง 74°C/165°F อุณหภูมิขั้นต่ำเพื่อความปลอดภัยนี้ใช้กับของเหลือ ไม่ใช่ระดับอัลเดนเตของพาสต้าที่เพิ่งต้ม"
  );
}

function addFoodSafetySources(recipe) {
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
}

function reviseCacioEPepe(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 1, ml(
    "Bring 3 L water and 20 g salt to a boil. Cook the pasta for about 3 minutes less than the package time; treat that time as a starting estimate and bite a strand. It should be flexible with a firm, not chalky, centre. Reserve 400 ml cloudy pasta water before draining.",
    "3 公升水加 20 公克鹽煮滾。麵條先比包裝時間少煮約 3 分鐘；時間只是起點，咬一條確認麵身已可彎折，中心仍有嚼勁但不硬粉。瀝麵前保留 400 毫升混濁的煮麵水。",
    "水3Lに塩20gを加えて沸かします。表示時間より約3分短くゆでますが、時間は目安です。1本かじり、しなやかで中心に歯ごたえがあり、粉っぽく硬くない状態を確かめます。湯を切る前に白濁したゆで汁を400ml取ります。",
    "물 3L에 소금 20g을 넣어 끓입니다. 포장 시간보다 약 3분 짧게 삶되, 시간은 시작 추정치입니다. 면 한 가닥을 씹어 휘어지면서 중심에 단단한 식감은 남고 가루처럼 딱딱하지 않은지 확인합니다. 물을 버리기 전에 뿌연 면수 400ml를 남깁니다.",
    "ต้มน้ำ 3 ลิตรกับเกลือ 20 กรัม ต้มเส้นให้สั้นกว่าเวลาบนห่อประมาณ 3 นาที โดยถือว่าเวลาเป็นเพียงจุดเริ่มต้น ชิมเส้นหนึ่งเส้น ควรงอได้และมีแกนแน่นแต่ไม่แข็งเป็นแป้ง ตักน้ำต้มเส้นขุ่น ๆ เก็บไว้ 400 มล.ก่อนสะเด็ด"
  ));
  body(recipe, 2, ml(
    "Transfer the pasta to the pepper skillet with 180 ml reserved water. Cook over medium heat for 2–3 minutes, tossing often, until nearly al dente and coated in a glossy starchy film. If the pan dries while the centre is still hard, add reserved water 15 ml at a time and keep tossing; stop when the strand has a firm bite without a chalky core.",
    "麵條放入胡椒鍋，加入 180 毫升保留的煮麵水，中火翻拌 2–3 分鐘，至接近 al dente、表面裹有亮澤澱粉薄膜。若中心仍硬而鍋底先乾，每次加 15 毫升保留煮麵水並持續翻拌；麵條有嚼勁但沒有粉硬芯時即可停火。",
    "パスタをこしょうのフライパンに移し、取っておいたゆで汁180mlを加えます。中火で2〜3分、よく混ぜながら、アルデンテに近づき表面にでんぷんの膜がつやよく絡むまで加熱します。中心がまだ硬いのに鍋が乾いたら、ゆで汁を15mlずつ加えて混ぜます。粉っぽい芯がなく、歯ごたえが残るところで止めます。",
    "면을 후추 팬에 옮기고 남겨 둔 면수 180ml를 넣습니다. 중불에서 2–3분 자주 뒤집어 알덴테에 가까워지고 전분기가 윤기 있게 묻을 때까지 익힙니다. 중심이 아직 딱딱한데 팬이 마르면 면수를 15ml씩 넣고 계속 섞습니다. 가루 같은 심 없이 탄력이 남으면 멈춥니다.",
    "ย้ายเส้นลงกระทะพริกไทย เติมน้ำต้มเส้นที่เก็บไว้ 180 มล. ผัดไฟกลาง 2–3 นาทีจนเกือบอัลเดนเตและมีแป้งเคลือบเงา หากกระทะแห้งทั้งที่แกนเส้นยังแข็ง ให้เติมน้ำต้มเส้นครั้งละ 15 มล.แล้วคลุกต่อ หยุดเมื่อเส้นยังแน่นแต่ไม่มีแกนแข็งเป็นผง"
  ));
  body(recipe, 3, ml(
    "Take the skillet completely off the burner and wait 45 seconds. Stir 120 g finely grated Pecorino with 100 ml warm—not boiling—reserved water into a smooth paste, then fold it through the pasta. Add more reserved water 15 ml at a time until the sauce is glossy and clings to each strand. If the cheese tightens into small clumps, keep the pan off the heat and toss in another 15 ml warm water; do not boil the cheese sauce.",
    "平底鍋完全離火，等 45 秒。120 公克細刨 Pecorino 加 100 毫升溫熱但不沸騰的保留煮麵水，攪成滑順糊，再拌入麵條。每次加 15 毫升煮麵水，直到醬汁有光澤並均勻附著。若起司收緊結小粒，鍋保持離火，再拌入 15 毫升溫水；不要把起司醬煮沸。",
    "フライパンを完全に火から外し、45秒待ちます。細かくおろしたペコリーノ120gに、沸騰していない温かいゆで汁100mlを混ぜて滑らかなペーストにし、パスタに和えます。ソースがつやよく麺に絡むまで、ゆで汁を15mlずつ加えます。チーズが締まって小さな塊になったら、火から外したまま温かい水を15ml加えて和えます。チーズソースを沸騰させません。",
    "팬을 완전히 불에서 내리고 45초 기다립니다. 곱게 간 페코리노 120g에 끓지 않는 따뜻한 면수 100ml를 섞어 매끈한 반죽을 만든 뒤 면에 버무립니다. 소스가 윤기 나며 면에 붙을 때까지 면수를 15ml씩 더합니다. 치즈가 조여 작은 덩어리로 뭉치면 불에서 내린 상태로 따뜻한 물 15ml를 더해 버무리고, 치즈 소스를 끓이지 않습니다.",
    "ยกกระทะออกจากเตาให้พ้นความร้อน รอ 45 วินาที ผสมเพโคริโนขูดละเอียด 120 กรัมกับน้ำต้มเส้นอุ่นที่ไม่เดือด 100 มล.ให้เป็นครีมเนียน แล้วคลุกกับเส้น เติมน้ำต้มเส้นครั้งละ 15 มล.จนซอสเงาและเคลือบเส้น หากชีสจับเป็นเม็ดเล็ก ให้คงกระทะไว้นอกเตา เติมน้ำอุ่นอีก 15 มล.แล้วคลุก อย่าต้มซอสชีส"
  ));
  body(recipe, 4, ml(
    "Divide among warm bowls, finish with the remaining 40 g Pecorino and a little pepper, and serve at once. The freshly cooked pasta is done when pleasantly firm; do not keep heating it to the 74°C leftover-reheating safety minimum.",
    "分入溫碗，撒上剩餘 40 公克 Pecorino 和少許胡椒，立即上桌。新煮麵條以爽口有嚼勁為熟度；不要為了達到剩食回熱安全最低溫度 74°C 而繼續加熱。",
    "温めた器に分け、残りのペコリーノ40gと少量のこしょうをかけてすぐ供します。作りたての麺は心地よい歯ごたえがあれば完成です。残り物の安全最低再加熱温度74°Cまで加熱し続ける必要はありません。",
    "따뜻한 그릇에 나누고 남은 페코리노 40g과 후추를 약간 뿌려 바로 냅니다. 갓 만든 면은 기분 좋은 탄력이 있으면 완성입니다. 남은 음식의 안전 최소 재가열 온도인 74°C까지 계속 익히지 마세요.",
    "แบ่งใส่ชามอุ่น โรยเพโคริโนที่เหลือ 40 กรัมกับพริกไทยเล็กน้อย แล้วเสิร์ฟทันที พาสต้าที่เพิ่งทำเสร็จให้ดูความแน่นอร่อย ไม่ต้องอุ่นต่อจนถึงอุณหภูมิขั้นต่ำ 74°C ซึ่งใช้เพื่อความปลอดภัยของของเหลือ"
  ));
  recipe.tips[0] = ml(
    "Grate Pecorino very finely so it disperses into warm pasta water instead of forming strings.",
    "Pecorino 刨得越細，越容易和溫熱煮麵水融合，不會結成長絲。",
    "ペコリーノは細かくおろすと、温かいゆで汁になじみ、糸状に固まりにくくなります。",
    "페코리노를 아주 곱게 갈면 따뜻한 면수에 잘 풀려 실처럼 뭉치지 않습니다.",
    "ขูดเพโคริโนให้ละเอียดมาก จะละลายเข้ากับน้ำต้มเส้นอุ่นแทนที่จะจับเป็นเส้น"
  );
  recipe.tips[1] = ml(
    "Keep the cheese off direct heat and thin the sauce gradually; the al dente bite comes from the pasta, not from a thick sauce.",
    "起司離火後再拌，煮麵水逐次加入；麵條嚼勁來自麵本身，不是醬汁越稠越好。",
    "チーズは直火から外して和え、ゆで汁は少しずつ加えます。アルデンテの歯ごたえは麺の状態で決まり、ソースを濃くして作るものではありません。",
    "치즈는 불에서 내린 뒤 섞고 면수는 조금씩 더합니다. 알덴테의 식감은 면에서 나오며 소스를 되직하게 만들어 얻는 것이 아닙니다.",
    "ยกชีสออกจากความร้อนตรงแล้วค่อยคลุก เติมน้ำต้มเส้นทีละน้อย ความแน่นแบบอัลเดนเตมาจากเส้น ไม่ใช่การทำซอสให้ข้น"
  );
  recipe.commonMistakes[0] = ml(
    "Adding Pecorino while the pan is still very hot can make the cheese stringy or grainy. Take the pan off the burner, wait 45 seconds, and use warm starchy water; if small clumps appear, toss with 15 ml more warm water off heat.",
    "鍋太熱時加 Pecorino 會讓起司拉絲或結粒。先離火等 45 秒，再用溫熱澱粉水拌；若已出現小結粒，離火多加 15 毫升溫水翻拌。",
    "フライパンが熱すぎるうちにペコリーノを加えると、糸を引いたり粒になったりします。火から外して45秒待ち、温かいでんぷん水を使います。小さな塊ができたら、火から外したまま温水を15ml加えて和えます。",
    "팬이 너무 뜨거울 때 페코리노를 넣으면 치즈가 늘어나거나 알갱이집니다. 불에서 내리고 45초 기다린 뒤 따뜻한 전분 면수를 씁니다. 작은 덩어리가 생기면 불을 끈 채 따뜻한 물 15ml를 더해 섞습니다.",
    "การใส่เพโคริโนขณะกระทะร้อนจัดทำให้ชีสยืดหรือเป็นเม็ด ยกลงจากเตารอ 45 วินาทีแล้วใช้น้ำต้มเส้นอุ่น หากเริ่มเป็นเม็ดเล็ก ให้เติมน้ำอุ่น 15 มล.แล้วคลุกนอกเตา"
  );
  recipe.commonMistakes[1] = ml(
    "Do not pour in all the pasta water at once. Add it 15 ml at a time, stopping when the sauce clings to the pasta; if it becomes too loose, toss off heat with a little more finely grated Pecorino.",
    "不要一次倒入全部煮麵水。每次加 15 毫升，醬汁能附著麵條就停；若太稀，離火後拌入少量細刨 Pecorino。",
    "ゆで汁を一度に全部入れません。15mlずつ加え、麺に絡んだら止めます。ゆるくなりすぎたら火から外したまま、細かくおろしたペコリーノを少量混ぜます。",
    "면수를 한꺼번에 모두 붓지 마세요. 15ml씩 넣어 소스가 면에 붙으면 멈춥니다. 너무 묽어지면 불에서 내린 상태로 곱게 간 페코리노를 조금 섞습니다.",
    "อย่าเทน้ำต้มเส้นทั้งหมดทีเดียว เติมครั้งละ 15 มล.และหยุดเมื่อซอสเกาะเส้น หากเหลวเกินไป ให้คลุกเพโคริโนขูดละเอียดเล็กน้อยขณะยกออกจากเตา"
  );
  setStorage(recipe);
  addFoodSafetySources(recipe);
}

function reviseAmatriciana(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Cook the guanciale in a wide skillet over medium-low heat for 8–10 minutes, turning occasionally, until the edges are golden and crisp and the fat has rendered. The time is an estimate, not a safety-temperature test. If the edges darken before the fat renders, lower the heat and continue slowly. Transfer half the crisp pieces to a plate; leave the rendered fat in the skillet.",
    "寬鍋中小火煸 guanciale 8–10 分鐘，偶爾翻動，至邊緣金黃酥脆、脂肪析出。時間是估算，不是安全溫度檢查。若邊緣先變深而脂肪尚未析出，轉小火慢煸。先盛出一半酥脆肉片，鍋中留析出的油脂。",
    "広いフライパンでグアンチャーレを弱めの中火で8〜10分、時々返しながら、脂が出て縁が黄金色でカリッとするまで炒めます。時間は目安で、安全温度の判定ではありません。脂が出る前に縁が濃くなったら火を弱めます。カリッとした半量を取り出し、脂はフライパンに残します。",
    "넓은 팬에서 관찰레를 중약불로 8–10분 가끔 뒤집어 지방이 녹고 가장자리가 노릇하고 바삭해질 때까지 굽습니다. 시간은 추정치이며 안전 온도 검사가 아닙니다. 지방이 녹기 전에 가장자리가 짙어지면 불을 낮춰 천천히 익힙니다. 바삭한 조각의 절반을 접시에 덜고 녹은 지방은 팬에 둡니다.",
    "ผัดกวานชาเลในกระทะกว้างไฟกลางอ่อน 8–10 นาที พลิกเป็นครั้งคราวจนไขมันออกและขอบเป็นสีทองกรอบ เวลานี้เป็นเพียงค่าประมาณ ไม่ใช่การตรวจอุณหภูมิความปลอดภัย หากขอบเข้มก่อนที่ไขมันจะออก ให้ลดไฟและผัดช้า ๆ ตักชิ้นกรอบครึ่งหนึ่งพักไว้ เหลือไขมันในกระทะ"
  ));
  body(recipe, 1, ml(
    "Stir chile flakes into the rendered fat for 20 seconds, then add the crushed tomatoes. Simmer uncovered over medium-low heat for 12–15 minutes until the sauce coats a spoon but still flows. If it remains watery, simmer 3 minutes longer before adding pasta; if it becomes pasty, loosen it with 15 ml water. Taste before adding any salt because guanciale and Pecorino are salty.",
    "辣椒碎加入析出的油脂炒 20 秒，再加壓碎番茄。中小火不加蓋煮 12–15 分鐘，至醬汁能薄裹湯匙但仍會流動。若仍稀水，多煮 3 分鐘再加麵；若變成糊狀，加 15 毫升水調開。guanciale 與 Pecorino 都偏鹹，先試味再決定是否加鹽。",
    "唐辛子を出た脂に加えて20秒炒め、つぶしたトマトを加えます。蓋をせず弱めの中火で12〜15分、スプーンを薄く覆うが流れる濃度まで煮ます。水っぽければパスタを加える前に3分煮詰め、ペースト状なら水を15ml加えてのばします。グアンチャーレとペコリーノは塩気があるので、塩を足す前に味を見ます。",
    "녹은 지방에 고춧가루를 넣어 20초 볶고 으깬 토마토를 넣습니다. 뚜껑을 열고 중약불로 12–15분 끓여 소스가 숟가락에 얇게 묻되 흐르는 농도로 만듭니다. 묽으면 면을 넣기 전에 3분 더 졸이고, 되직한 페이스트가 되면 물 15ml를 넣어 풉니다. 관찰레와 페코리노가 짜므로 소금을 더하기 전에 맛봅니다.",
    "ผัดพริกป่นในไขมันที่ออกมา 20 วินาที ใส่มะเขือเทศบด เคี่ยวเปิดฝาไฟกลางอ่อน 12–15 นาทีจนซอสเคลือบช้อนบาง ๆ แต่ยังไหลได้ หากยังเหลว ให้เคี่ยวเพิ่ม 3 นาทีก่อนใส่เส้น หากข้นเป็นเนื้อแป้ง เติมน้ำ 15 มล. กวานชาเลกับเพโคริโนมีความเค็มอยู่แล้ว ให้ชิมก่อนเติมเกลือ"
  ));
  body(recipe, 2, ml(
    "Boil 3 L water with 24 g salt. Cook the bucatini about 2 minutes less than the package time; use the time as a guide and bite a strand. It should bend easily but retain a firm centre without a hard, chalky core. Reserve 250 ml pasta water before draining.",
    "3 公升水加 24 公克鹽煮滾。bucatini 比包裝時間少煮約 2 分鐘；時間僅供參考，咬一條確認可彎折、中心仍堅實但沒有硬粉芯。瀝麵前保留 250 毫升煮麵水。",
    "水3Lに塩24gを加えて沸かします。ブカティーニは表示時間より約2分短くゆでます。時間は目安として、1本かじって確かめます。しなやかに曲がるが中心には歯ごたえがあり、硬く粉っぽい芯がない状態にします。湯を切る前にゆで汁250mlを取ります。",
    "물 3L에 소금 24g을 넣어 끓입니다. 부카티니는 포장 시간보다 약 2분 짧게 삶되 시간은 참고로만 씁니다. 한 가닥을 씹어 쉽게 휘면서 중심은 탄탄하고 딱딱한 가루 심이 없는지 확인합니다. 물을 버리기 전에 면수 250ml를 남깁니다.",
    "ต้มน้ำ 3 ลิตรกับเกลือ 24 กรัม ต้มบูคาตินีให้สั้นกว่าเวลาบนห่อประมาณ 2 นาที โดยใช้เวลาเป็นแนวทาง ชิมเส้นหนึ่งเส้น ควรงอได้ง่ายแต่ยังแน่นตรงกลางโดยไม่มีแกนแข็งเป็นแป้ง เก็บน้ำต้มเส้นไว้ 250 มล.ก่อนสะเด็ด"
  ));
  body(recipe, 3, ml(
    "Add the drained bucatini to the tomato sauce with 100 ml reserved water. Toss over medium heat for about 2 minutes until al dente and the sauce clings inside and outside the tubes. If the skillet tightens before the pasta is ready, add reserved water 15 ml at a time; if a puddle remains, toss 30 seconds longer. Keep the pasta moving so the sauce does not catch.",
    "瀝乾 bucatini 放入番茄醬，加入 100 毫升保留煮麵水。中火翻拌約 2 分鐘至 al dente，醬汁附著在管麵內外。若麵還沒好鍋中醬汁已收乾，每次加 15 毫升煮麵水；若鍋底仍有一灘液體，再翻拌 30 秒。持續翻動避免醬汁黏底。",
    "ブカティーニをトマトソースに加え、取っておいたゆで汁100mlを入れます。中火で約2分和え、アルデンテにして、ソースが麺の外側と穴の中に絡むまで加熱します。麺が仕上がる前に鍋が乾いたら、ゆで汁を15mlずつ加えます。水分がたまっていたら30秒長く和えます。焦げつかないよう混ぜ続けます。",
    "물기를 뺀 부카티니를 토마토 소스에 넣고 남겨 둔 면수 100ml를 붓습니다. 중불에서 약 2분 버무려 알덴테가 되고 소스가 관 안팎에 붙게 합니다. 면이 익기 전에 팬이 마르면 면수를 15ml씩 넣고, 바닥에 물이 고이면 30초 더 섞습니다. 소스가 눌어붙지 않게 계속 움직입니다.",
    "ใส่บูคาตินีที่สะเด็ดแล้วลงในซอสมะเขือเทศ เติมน้ำต้มเส้นที่เก็บไว้ 100 มล. คลุกไฟกลางประมาณ 2 นาทีจนเป็นอัลเดนเตและซอสเกาะทั้งด้านนอกและด้านในเส้น หากกระทะแห้งก่อนเส้นได้ที่ ให้เติมน้ำต้มเส้นครั้งละ 15 มล. หากยังมีน้ำขัง ให้คลุกต่อ 30 วินาที คนเส้นตลอดไม่ให้ซอสติดก้น"
  ));
  body(recipe, 4, ml(
    "Remove the skillet from the heat and toss with 60 g Pecorino. Divide among warm bowls, add the remaining 30 g cheese and the reserved crisp guanciale, and serve. Judge the fresh pasta by its firm bite and the sauce coating the tubes; the 74°C/165°F minimum applies only when reheating leftovers.",
    "平底鍋離火，拌入 60 公克 Pecorino。分入溫碗，撒上剩餘 30 公克起司與保留的酥脆 guanciale 後上桌。新煮麵以堅實嚼勁與醬汁是否裹住管麵判斷；74°C／165°F 安全最低溫只適用於回熱剩食。",
    "フライパンを火から外し、ペコリーノ60gを和えます。温めた器に分け、残りのチーズ30gと取り置いたカリッとしたグアンチャーレをのせて供します。作りたては歯ごたえとソースの絡みで判断します。74°C/165°Fの安全最低温度は残り物の再加熱にのみ適用されます。",
    "팬을 불에서 내리고 페코리노 60g을 섞습니다. 따뜻한 그릇에 나눠 담고 남은 치즈 30g과 따로 둔 바삭한 관찰레를 올려 냅니다. 갓 만든 면은 탄력과 소스가 관 안팎에 붙는지로 판단하며 74°C/165°F 안전 최소 온도는 남은 음식 재가열에만 적용됩니다.",
    "ยกกระทะออกจากเตาแล้วคลุกเพโคริโน 60 กรัม แบ่งใส่ชามอุ่น โรยชีสที่เหลือ 30 กรัมกับกวานชาเลกรอบที่พักไว้ เสิร์ฟโดยดูความแน่นของเส้นและซอสที่เคลือบรูเส้น อุณหภูมิขั้นต่ำ 74°C/165°F ใช้เฉพาะการอุ่นของเหลือ"
  ));
  recipe.tips[0] = ml(
    "Render guanciale slowly over medium-low heat; crisp edges and clear rendered fat matter more than rushing to a high flame.",
    "guanciale 用中小火慢慢煸；邊緣酥脆、脂肪清澈析出，比大火趕時間重要。",
    "グアンチャーレは弱めの中火でゆっくり脂を出します。強火で急ぐより、縁のカリッと感と脂の出方を優先します。",
    "관찰레는 중약불에서 천천히 지방을 냅니다. 센 불로 서두르는 것보다 바삭한 가장자리와 맑은 지방이 중요합니다.",
    "เจียวกวานชาเลช้า ๆ ด้วยไฟกลางอ่อน ให้ขอบกรอบและไขมันใสสำคัญกว่าการเร่งด้วยไฟแรง"
  );
  recipe.tips[1] = ml(
    "The guanciale and Pecorino season the sauce. Taste after the cheese is added before deciding whether the pasta needs more salt.",
    "guanciale 和 Pecorino 都會替醬汁調味；起司拌入後先試味，再決定麵條是否還需加鹽。",
    "グアンチャーレとペコリーノに塩気があります。チーズを加えてから味見し、塩を足すか決めます。",
    "관찰레와 페코리노가 소스에 간을 더합니다. 치즈를 넣은 뒤 맛보고 소금이 더 필요한지 결정합니다.",
    "กวานชาเลกับเพโคริโนช่วยปรุงรสซอส ชิมหลังใส่ชีสแล้วค่อยตัดสินใจว่าต้องเติมเกลือหรือไม่"
  );
  recipe.commonMistakes[0] = ml(
    "A hard boil can make the guanciale dark before its fat renders. Lower the heat and keep turning it; if the fat is smoking, move the skillet off the burner briefly.",
    "大火猛煎會讓 guanciale 尚未出油就變深焦黑。轉小火並持續翻動；若油脂冒煙，先把鍋短暫移離爐口。",
    "強火では脂が出る前にグアンチャーレが濃く焦げます。火を弱めて返し続け、脂が煙を出したら一度フライパンを火から外します。",
    "센 불은 지방이 녹기 전에 관찰레를 짙게 태울 수 있습니다. 불을 낮추고 계속 뒤집으세요. 지방에서 연기가 나면 팬을 잠시 불에서 내립니다.",
    "ไฟแรงทำให้กวานชาเลเข้มก่อนที่ไขมันจะออก ลดไฟและพลิกต่อ หากไขมันเริ่มมีควันให้ยกกระทะออกจากเตาชั่วคราว"
  );
  recipe.commonMistakes[1] = ml(
    "Do not use the generic cream-sauce fix of adding pasta water without checking the pan. Add it only when the sauce is tight, 15 ml at a time; simmer an excess puddle away before serving.",
    "不要照搬奶油醬的通用做法而不看鍋況就加煮麵水。只有醬汁太乾時才每次加 15 毫升；若剩下過多液體，先煮掉再上桌。",
    "鍋の状態を見ずに、クリームソース向けのようにゆで汁を足しません。ソースが詰まった時だけ15mlずつ加え、水分が多く残ったら供する前に煮詰めます。",
    "팬 상태를 보지 않고 크림 소스처럼 면수를 넣지 마세요. 소스가 뻑뻑할 때만 15ml씩 넣고, 물이 많이 남으면 내기 전에 졸입니다.",
    "อย่าเติมน้ำต้มเส้นตามสูตรซอสครีมโดยไม่ดูสภาพกระทะ เติมครั้งละ 15 มล.เฉพาะเมื่อซอสแห้งแน่น หากมีน้ำมากเกินให้เคี่ยวออกก่อนเสิร์ฟ"
  );
  setStorage(recipe);
  addFoodSafetySources(recipe);
}

function revisePastaAllaNorma(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Toss the eggplant with 30 ml of the listed oil and 2 g salt. Cook in two uncrowded batches over medium-high heat for 8–10 minutes each, turning the cubes so several faces become deep golden and the centres soften. If the pan smokes or edges blacken before the cubes soften, lower the heat one setting. Transfer to a rack; do not pile the batches together.",
    "茄子拌入 30 毫升配方油與 2 公克鹽。分兩批不擁擠下鍋，中大火各煎 8–10 分鐘，翻動讓多面深金黃、中心變軟。若茄子尚硬而鍋冒煙或邊角焦黑，轉小一檔火力。盛到網架上，不要把兩批堆在一起。",
    "なすに分量の油30mlと塩2gを絡めます。中強火で混み合わないよう2回に分け、各8〜10分、角切りを返しながら複数の面を濃いきつね色にし、中まで柔らかくします。柔らかくなる前に煙が出たり縁が黒くなったりしたら火を一段弱めます。網に移し、重ねません。",
    "가지에 정량의 기름 30ml와 소금 2g을 버무립니다. 팬을 붐비지 않게 두 번 나누어 중강불에서 각각 8–10분 굽고 뒤집어 여러 면이 진한 금빛이 되고 속이 부드러워지게 합니다. 속이 부드러워지기 전에 팬에서 연기가 나거나 모서리가 검게 되면 불을 한 단계 낮춥니다. 망에 옮겨 쌓지 않습니다.",
    "คลุกมะเขือยาวกับน้ำมันตามสูตร 30 มล.และเกลือ 2 กรัม ผัดเป็นสองชุดไม่ให้แน่น ใช้ไฟกลางค่อนแรงชุดละ 8–10 นาที พลิกให้หลายด้านเป็นสีทองเข้มและเนื้อนุ่ม หากกระทะมีควันหรือขอบดำก่อนเนื้อนุ่ม ให้ลดไฟลงหนึ่งระดับ ตักพักบนตะแกรง ไม่กองซ้อนกัน"
  ));
  body(recipe, 1, ml(
    "Lower the heat to medium and add the remaining 15 ml oil and garlic. Stir for 30 seconds without browning it, then add tomatoes and the remaining 2 g salt. Simmer uncovered 15–20 minutes until the sauce is thick enough to leave a brief track when a spoon is drawn across the pan. If liquid still runs back immediately, cook 3 minutes more before adding pasta. Tear in half the basil.",
    "轉中火，加入剩餘 15 毫升油與蒜，拌 30 秒但不要炒焦；加入番茄與剩下 2 公克鹽。揭蓋煮 15–20 分鐘，直到湯匙劃過鍋底會短暫留下痕跡。若液體立刻流回，先多煮 3 分鐘再加麵。撕入一半羅勒。",
    "中火に下げ、残りの油15mlとにんにくを加えて、色づかないよう30秒炒めます。トマトと残りの塩2gを加え、蓋をせず15〜20分煮ます。スプーンで鍋底をなぞると跡が少し残る濃さにします。すぐ液が戻る場合はパスタを加える前に3分煮足します。バジルの半量をちぎり入れます。",
    "불을 중불로 낮추고 남은 기름 15ml와 마늘을 넣어 갈색이 되지 않게 30초 볶습니다. 토마토와 남은 소금 2g을 넣고 뚜껑을 열어 15–20분 끓입니다. 숟가락으로 팬 바닥을 그었을 때 자국이 잠시 남을 만큼 졸입니다. 바로 액체가 차오르면 면을 넣기 전에 3분 더 끓입니다. 바질 절반을 찢어 넣습니다.",
    "ลดเป็นไฟกลาง ใส่น้ำมันที่เหลือ 15 มล.กับกระเทียม ผัด 30 วินาทีโดยไม่ให้เหลือง ใส่มะเขือเทศและเกลือที่เหลือ 2 กรัม เคี่ยวเปิดฝา 15–20 นาทีจนลากช้อนบนก้นกระทะแล้วเกิดรอยชั่วครู่ หากน้ำไหลกลับทันที ให้เคี่ยวเพิ่ม 3 นาทีก่อนใส่เส้น ฉีกใบโหระพาครึ่งหนึ่งใส่"
  ));
  body(recipe, 2, ml(
    "Boil 3 L water with 24 g salt. Cook the pasta about 2 minutes less than the package time; bite a piece to check rather than relying on the clock. It should be flexible with a firm centre, not chalky. Reserve 250 ml pasta water, then drain.",
    "3 公升水加 24 公克鹽煮滾。麵條比包裝時間少煮約 2 分鐘；咬一口確認，不只看計時。麵身應可彎折、中心堅實但不粉硬。保留 250 毫升煮麵水後瀝乾。",
    "水3Lに塩24gを加えて沸かします。表示時間より約2分短くゆでますが、時計だけに頼らず一口食べて確かめます。しなやかで中心には歯ごたえがあり、粉っぽくない状態にします。ゆで汁250mlを取り、湯を切ります。",
    "물 3L에 소금 24g을 넣어 끓입니다. 포장 시간보다 약 2분 짧게 삶되 시계에만 의존하지 말고 한 입 먹어 확인합니다. 면은 휘어지면서 중심은 탄탄하고 가루처럼 딱딱하지 않아야 합니다. 면수 250ml를 남긴 뒤 물을 뺍니다.",
    "ต้มน้ำ 3 ลิตรกับเกลือ 24 กรัม ต้มเส้นให้สั้นกว่าเวลาบนห่อประมาณ 2 นาที ชิมหนึ่งคำแทนการดูนาฬิกาอย่างเดียว เส้นควรงอได้และแกนแน่นแต่ไม่เป็นแป้ง เก็บน้ำต้มเส้นไว้ 250 มล.แล้วสะเด็ด"
  ));
  body(recipe, 3, ml(
    "Add pasta to the tomato sauce with 100 ml reserved water and toss over medium heat for 2 minutes. Fold in three quarters of the eggplant gently so the cubes keep their shape. If the sauce is too thick to coat the pasta, add reserved water 15 ml at a time; if it is loose, keep tossing uncovered for 30–60 seconds. Stop when each piece is coated and the pasta still has a firm bite.",
    "麵條加入番茄醬與 100 毫升保留煮麵水，中火翻拌 2 分鐘。輕輕拌入四分之三茄子，保留方塊形狀。若醬汁太稠裹不上麵，每次加 15 毫升煮麵水；若太稀，揭蓋翻拌 30–60 秒。至麵條有嚼勁、茄子各面沾醬即停。",
    "パスタをトマトソースに加え、取っておいたゆで汁100mlと中火で2分和えます。なすの4分の3を形が崩れないようやさしく混ぜます。ソースが濃すぎて絡まない場合は、ゆで汁を15mlずつ加えます。ゆるければ蓋をせず30〜60秒混ぜます。麺に歯ごたえがあり、具にソースが絡んだら止めます。",
    "면을 토마토 소스에 넣고 남겨 둔 면수 100ml를 부어 중불에서 2분 섞습니다. 가지의 4분의 3을 조각이 부서지지 않게 부드럽게 섞습니다. 소스가 너무 되직해 면에 붙지 않으면 면수를 15ml씩 넣고, 묽으면 뚜껑을 열고 30–60초 더 섞습니다. 면에 탄력이 있고 가지가 소스로 코팅되면 멈춥니다.",
    "ใส่เส้นลงในซอสมะเขือเทศ เติมน้ำต้มเส้นที่เก็บไว้ 100 มล. คลุกไฟกลาง 2 นาที พับมะเขือยาวสามในสี่ส่วนอย่างเบามือให้คงรูป หากซอสข้นจนเคลือบเส้นไม่ได้ ให้เติมน้ำต้มเส้นครั้งละ 15 มล. หากเหลวให้คลุกเปิดฝาอีก 30–60 วินาที หยุดเมื่อซอสเคลือบเส้นและมะเขือยาว โดยเส้นยังแน่น"
  ));
  body(recipe, 4, ml(
    "Divide among warm bowls. Top with the remaining eggplant, ricotta salata and basil; serve immediately. The pasta is done when it is pleasantly firm and the sauce clings; the 74°C/165°F safety minimum is for reheating leftovers, not the freshly cooked pasta texture.",
    "分入溫碗，放上剩餘茄子、ricotta salata 與羅勒，立即上桌。麵條以爽口嚼勁、醬汁能附著判斷；74°C／165°F 安全最低溫只用於回熱剩食，不是新煮麵條的口感標準。",
    "温めた器に分け、残りのなす、リコッタ・サラータ、バジルをのせてすぐ供します。心地よい歯ごたえとソースの絡みで仕上がりを判断します。74°C/165°Fの安全最低温度は残り物の再加熱用で、作りたての麺の食感基準ではありません。",
    "따뜻한 그릇에 나누고 남은 가지, 리코타 살라타와 바질을 올려 바로 냅니다. 기분 좋은 탄력과 소스가 붙는지로 완성을 판단합니다. 74°C/165°F 안전 최소 온도는 남은 음식 재가열용이며 갓 만든 면의 식감 기준이 아닙니다.",
    "แบ่งใส่ชามอุ่น โรยมะเขือยาวที่เหลือ ริคอตตาซาลาตา และใบโหระพา เสิร์ฟทันที ดูความแน่นอร่อยและซอสที่เคลือบเส้น อุณหภูมิขั้นต่ำเพื่อความปลอดภัย 74°C/165°F ใช้กับของเหลืออุ่นซ้ำ ไม่ใช่เนื้อสัมผัสของเส้นที่เพิ่งทำ"
  ));
  recipe.tips[0] = ml(
    "Keep the eggplant batches uncrowded and let the first face brown before turning; space and patience produce colour without crushing the cubes.",
    "煎茄子不要擁擠，先讓第一面上色再翻動；留空間並耐心煎，方塊才會上色且不碎。",
    "なすは詰め込まず、最初の面に焼き色がついてから返します。間隔をあけて待つと、角切りを崩さず色づきます。",
    "가지 팬을 붐비게 하지 말고 첫 면이 갈색이 된 뒤 뒤집습니다. 공간을 두고 기다려야 조각을 으깨지 않고 색을 냅니다.",
    "อย่าใส่มะเขือยาวแน่นกระทะ รอให้ด้านแรกมีสีแล้วค่อยพลิก เว้นที่และรอเพื่อให้สีสวยโดยไม่ทำให้ชิ้นแตก"
  );
  recipe.tips[1] = ml(
    "Reduce the tomato sauce before adding the pasta. A spoon-track cue helps keep the eggplant and noodles from being overcooked while watery sauce evaporates.",
    "番茄醬先收濃再加麵；以湯匙劃痕判斷，可避免為了蒸發水分而煮過茄子和麵條。",
    "パスタを加える前にトマトソースを煮詰めます。スプーンの跡を目安にすると、水分を飛ばすためになすや麺を煮すぎずに済みます。",
    "면을 넣기 전에 토마토 소스를 졸입니다. 숟가락 자국으로 농도를 보면 물을 날리느라 가지와 면을 지나치게 익히지 않아도 됩니다.",
    "เคี่ยวซอสมะเขือเทศให้ได้ที่ก่อนใส่เส้น ใช้รอยช้อนเป็นสัญญาณ จะได้ไม่ต้องต้มมะเขือยาวและเส้นนานเกินไปเพื่อไล่น้ำ"
  );
  recipe.commonMistakes[0] = ml(
    "Crowding the skillet steams the eggplant and prevents browning. Cook the two batches separately; if moisture gathers, let it evaporate before adding the next batch.",
    "鍋裡太擠會讓茄子變成蒸煮而不上色。分兩批煎；若鍋裡積水，先讓水分蒸發再下下一批。",
    "フライパンに詰め込みすぎるとなすが蒸され、焼き色がつきません。2回に分け、水分がたまったら次の分を入れる前に蒸発させます。",
    "팬을 너무 채우면 가지가 쪄져 갈색이 나지 않습니다. 두 번 나누어 굽고 물기가 고이면 다음 배치를 넣기 전에 날립니다.",
    "ใส่มะเขือยาวแน่นเกินไปจะกลายเป็นการนึ่งและไม่เกิดสี แบ่งทำสองชุด หากมีน้ำขังให้ระเหยก่อนใส่ชุดถัดไป"
  );
  recipe.commonMistakes[1] = ml(
    "If the finished pan looks watery, lift out the tender eggplant and simmer the sauce uncovered for 1–2 minutes before returning it. Do not keep boiling the pasta and eggplant just to reduce the liquid.",
    "若完成時鍋底仍水水的，先撈出軟茄子，揭蓋把醬汁煮 1–2 分鐘再放回。不要為了收乾液體而持續煮麵與茄子。",
    "仕上がりが水っぽければ、柔らかいなすをいったん取り出し、ソースだけを蓋なしで1〜2分煮てから戻します。水分を飛ばすために麺となすを煮続けません。",
    "완성된 팬에 물기가 많으면 부드러운 가지를 잠시 건져 소스만 뚜껑을 열고 1–2분 졸인 뒤 다시 넣습니다. 물을 줄이려고 면과 가지를 계속 끓이지 마세요.",
    "หากกระทะที่ทำเสร็จยังมีน้ำ ให้ตักมะเขือยาวที่นุ่มแล้วออก เคี่ยวซอสเปิดฝา 1–2 นาทีแล้วใส่กลับ อย่าต้มเส้นและมะเขือยาวต่อเพียงเพื่อให้น้ำงวด"
  );
  setStorage(recipe);
  addFoodSafetySources(recipe);
}

function reviseTrofieAlPesto(recipe) {
  preparePublicationCopy(recipe);
  body(recipe, 0, ml(
    "Pulse basil, pine nuts and garlic in a chilled processor bowl just until finely chopped. Add both cheeses, then drizzle in the olive oil and pulse only until creamy. Stop if the bowl or pesto begins to feel warm; prolonged blending dulls the fresh basil flavour.",
    "冰過的食物調理機中放入羅勒、松子與蒜，短暫打碎即可。加入兩種起司，再淋入橄欖油，僅打至細滑。若調理杯或青醬開始變溫就停；長時間攪打會削弱羅勒的清香。",
    "冷やしたフードプロセッサーにバジル、松の実、にんにくを入れ、細かくなるまで短く回します。2種類のチーズを加え、オリーブ油を垂らしてクリーミーになるまで軽く回します。器やペーストが温かくなり始めたら止めます。長く回すとバジルの風味が鈍ります。",
    "차갑게 식힌 푸드프로세서 볼에 바질, 잣, 마늘을 넣고 잘게 될 때까지만 짧게 돌립니다. 치즈 두 종류를 넣고 올리브오일을 부어 크리미해질 때까지만 돌립니다. 볼이나 페스토가 따뜻해지기 시작하면 멈춥니다. 오래 갈면 바질 향이 둔해집니다.",
    "ปั่นใบโหระพา ถั่วสน และกระเทียมในโถที่แช่เย็นให้ละเอียดโดยใช้เวลาสั้น ใส่ชีสทั้งสองชนิด แล้วรินน้ำมันมะกอก ปั่นเพียงจนเป็นครีม หยุดหากโถหรือเพสโตเริ่มอุ่น การปั่นนานทำให้กลิ่นสดของโหระพาหายไป"
  ));
  body(recipe, 1, ml(
    "Bring 3 L water and 24 g salt to a boil. Add the potatoes and simmer 5 minutes, until a knife enters the outside but meets a little resistance at the centre. If the potato pieces are larger than 2 cm, give them 2 more minutes before adding the beans and pasta.",
    "3 公升水加 24 公克鹽煮滾，放入馬鈴薯小滾 5 分鐘，至刀尖能進入外層、中心仍有些阻力。若薯塊大於 2 公分，先多煮 2 分鐘再加豆莢和麵。",
    "水3Lに塩24gを加えて沸かします。じゃがいもを入れて5分、外側にナイフが入り中心には少し抵抗が残るまで煮ます。2cmより大きい場合は、いんげんとパスタを加える前に2分追加します。",
    "물 3L에 소금 24g을 넣어 끓입니다. 감자를 넣고 5분 삶아 칼이 겉에는 들어가지만 중심에는 약간 저항이 남게 합니다. 감자 조각이 2cm보다 크면 콩과 면을 넣기 전에 2분 더 삶습니다.",
    "ต้มน้ำ 3 ลิตรกับเกลือ 24 กรัม ใส่มันฝรั่งต้ม 5 นาทีจนมีดแทงผ่านด้านนอกได้แต่ตรงกลางยังต้านเล็กน้อย หากชิ้นใหญ่กว่า 2 ซม.ให้ต้มเพิ่ม 2 นาทีก่อนใส่ถั่วกับเส้น"
  ));
  body(recipe, 2, ml(
    "Add the green beans and trofie. Cook until the potatoes are fork-tender, the beans are bright green with a slight bite, and the trofie are al dente; package times are only estimates. Bite one piece of pasta: it should be firm but not chalky in the centre. If the potatoes need longer, lift out the beans with a slotted spoon and add them back at the end. Reserve 250 ml cooking water, then drain.",
    "加入四季豆與 trofie，煮至馬鈴薯可用叉子穿透、豆莢翠綠且略帶脆度、trofie 達 al dente；包裝時間只是估算。咬一口麵條，中心應堅實但不粉硬。若馬鈴薯還需時間，用漏勺撈出四季豆，最後再放回。保留 250 毫升煮麵水後瀝乾。",
    "いんげんとトロフィエを加えます。じゃがいもはフォークが通り、いんげんは鮮やかな緑で少し歯ごたえがあり、トロフィエはアルデンテになるまで煮ます。表示時間は目安です。パスタを一つ食べ、中心が硬すぎず粉っぽくないか確認します。じゃがいもに時間がかかる場合はいんげんを穴あきスプーンですくい、最後に戻します。ゆで汁250mlを取り、湯を切ります。",
    "그린빈과 트로피에를 넣습니다. 감자는 포크가 들어갈 만큼 부드럽고, 콩은 선명한 초록색에 약간 아삭하며, 트로피에는 알덴테가 될 때까지 익힙니다. 포장 시간은 추정치일 뿐입니다. 면 한 조각을 씹어 중심이 탄탄하되 가루처럼 딱딱하지 않은지 확인합니다. 감자가 더 익어야 하면 구멍 국자로 콩을 건져 두었다가 마지막에 다시 넣습니다. 면수 250ml를 남기고 물을 뺍니다.",
    "ใส่ถั่วแขกกับโทรฟีเอ ต้มจนมันฝรั่งนุ่มเมื่อใช้ส้อมจิ้ม ถั่วเขียวสดและยังกรุบเล็กน้อย และเส้นเป็นอัลเดนเต เวลาบนห่อเป็นเพียงค่าประมาณ ชิมเส้นหนึ่งชิ้นให้แน่ใจว่าแกนแน่นแต่ไม่เป็นแป้ง หากมันฝรั่งต้องใช้เวลานานกว่านี้ ให้ช้อนถั่วขึ้นแล้วใส่กลับตอนท้าย เก็บน้ำต้มเส้นไว้ 250 มล.แล้วสะเด็ด"
  ));
  body(recipe, 3, ml(
    "Put the pesto in a large warm—not hot—bowl. Let 60 ml reserved pasta water cool until it is warm and no longer steaming, then stir it into the pesto. Add the drained pasta, potatoes and beans and toss gently off the heat. If the pesto is too thick, add more cooled pasta water 15 ml at a time; if it is loose, toss briefly with a little finely grated cheese. Do not return the bowl to direct heat.",
    "青醬放入溫熱而非燙熱的大碗。保留的 60 毫升煮麵水先放涼至溫溫、不再冒蒸氣，再拌入青醬。加入瀝乾的麵、馬鈴薯和四季豆，離火輕柔拌勻。若青醬太稠，每次加 15 毫升放涼的煮麵水；若太稀，拌入少量細刨起司。不要把碗放回直火上。",
    "ペーストは温かいが熱くない大きなボウルに入れます。取っておいたゆで汁60mlは、湯気が立たない温かさまで冷ましてからペーストに混ぜます。湯を切ったパスタ、じゃがいも、いんげんを加え、火から外してやさしく和えます。濃すぎる場合は冷ましたゆで汁を15mlずつ加え、ゆるい場合は細かくおろしたチーズを少量混ぜます。ボウルを直火に戻しません。",
    "페스토를 따뜻하지만 뜨겁지 않은 큰 볼에 담습니다. 남겨 둔 면수 60ml는 김이 나지 않을 만큼 따뜻해질 때까지 식힌 뒤 페스토에 섞습니다. 물기를 뺀 면, 감자, 콩을 넣고 불에서 내려 부드럽게 버무립니다. 페스토가 너무 되직하면 식힌 면수를 15ml씩 넣고, 묽으면 곱게 간 치즈를 조금 섞습니다. 볼을 직접 불에 다시 올리지 마세요.",
    "ใส่เพสโตในชามใบใหญ่ที่อุ่นแต่ไม่ร้อน ปล่อยน้ำต้มเส้นที่เก็บไว้ 60 มล.ให้เย็นจนแค่อุ่นและไม่มีไอ แล้วคนเข้ากับเพสโต ใส่เส้น มันฝรั่ง และถั่วที่สะเด็ดแล้ว คลุกเบา ๆ นอกเตา หากเพสโตข้นไป เติมน้ำต้มเส้นที่เย็นลงครั้งละ 15 มล. หากเหลว ให้คลุกชีสขูดละเอียดเล็กน้อย อย่านำชามกลับไปตั้งไฟตรง"
  ));
  body(recipe, 4, ml(
    "Divide immediately among bowls. Add only a little extra Parmigiano if desired. The sauce should lightly coat the trofie and vegetables while the pasta remains springy; if the bowl cools before serving, loosen with a spoonful of warm water rather than heating the basil pesto on the burner.",
    "立即分入碗中；可依喜好少量加 Parmigiano。醬汁應薄薄裹住 trofie 與蔬菜，麵條仍有彈性；若上桌前變涼，加一匙溫水調開，不要把羅勒青醬放回爐上加熱。",
    "すぐに器に分けます。好みでパルミジャーノを少量加えます。ソースはトロフィエと野菜に薄く絡み、麺には弾力が残る状態にします。供する前に冷めた場合は、バジルペーストを火にかけず、温水をスプーン1杯加えてのばします。",
    "바로 그릇에 나눕니다. 원하면 파르미자노를 조금 더합니다. 소스는 트로피에와 채소에 얇게 묻고 면은 탄력이 있어야 합니다. 내기 전에 식었다면 바질 페스토를 불에 올리지 말고 따뜻한 물 한 숟가락으로 풀어 줍니다.",
    "แบ่งใส่ชามทันที โรยพาร์มิจาโนเพิ่มเล็กน้อยได้ตามชอบ ซอสควรเคลือบเส้นกับผักบาง ๆ โดยเส้นยังเด้ง หากเย็นก่อนเสิร์ฟ ให้เติมน้ำอุ่นหนึ่งช้อนเพื่อให้ซอสคลาย อย่าอุ่นเพสโตใบโหระพาบนเตา"
  ));
  recipe.tips[0] = ml(
    "Keep the pesto and bowl cool, and pulse only briefly. A warm, overworked pesto loses its fresh basil aroma and colour.",
    "青醬與調理杯保持涼爽，短暫攪打即可；過度攪打變溫會失去羅勒清香和翠綠色。",
    "ペーストと器を冷たく保ち、短く回します。温かくなるまで回すと、バジルの香りと色が損なわれます。",
    "페스토와 볼을 차갑게 유지하고 짧게 돌립니다. 따뜻해질 때까지 과하게 갈면 바질 향과 색이 사라집니다.",
    "รักษาเพสโตและโถให้เย็น ปั่นสั้น ๆ เพสโตที่อุ่นและปั่นนานจะเสียกลิ่นสดและสีเขียวของโหระพา"
  );
  recipe.tips[1] = ml(
    "Let the reserved pasta water cool until warm before it touches the basil pesto; keep the bowl off the burner while tossing.",
    "保留煮麵水先放到溫熱再碰羅勒青醬；拌麵時碗要離火。",
    "取っておいたゆで汁は温かい程度まで冷ましてからバジルペーストに加え、和える間は火から外します。",
    "남겨 둔 면수는 따뜻한 정도로 식힌 뒤 바질 페스토에 넣고, 버무릴 때는 불에서 내립니다.",
    "พักน้ำต้มเส้นให้เหลือแค่อุ่นก่อนผสมกับเพสโต และคลุกโดยยกชามออกจากเตา"
  );
  recipe.commonMistakes[0] = ml(
    "Pouring steaming pasta water straight into pesto can dull the basil and warm the sauce too much. Cool the measured water until it stops steaming first; if the pesto has already warmed, stop blending and toss it with the pasta off heat.",
    "把冒蒸氣的煮麵水直接倒進青醬，會讓羅勒香氣變淡、醬汁過熱。先把量好的水放到不再冒蒸氣；若青醬已變溫，停止攪打並離火拌麵。",
    "湯気の立つゆで汁をそのまま加えると、バジルの香りが鈍りソースが温まりすぎます。分量を量ったゆで汁は湯気が消えるまで冷まします。ペーストがすでに温まったら回すのをやめ、火から外してパスタと和えます。",
    "김이 나는 면수를 페스토에 바로 부으면 바질 향이 둔해지고 소스가 너무 따뜻해집니다. 계량한 면수는 김이 사라질 때까지 식힙니다. 페스토가 이미 따뜻해졌다면 갈기를 멈추고 불에서 내려 면과 버무립니다.",
    "เทน้ำต้มเส้นที่ยังมีไอลงเพสโตทันทีจะทำให้กลิ่นโหระพาจางและซอสร้อนเกินไป พักน้ำที่ตวงไว้จนไม่มีไอก่อน หากเพสโตอุ่นแล้วให้หยุดปั่นและคลุกกับเส้นนอกเตา"
  );
  recipe.commonMistakes[1] = ml(
    "Do not thin the pesto with hot water or add oil repeatedly. If it is thick, add cooled pasta water 15 ml at a time; if the emulsion looks oily, toss off heat with 15 ml cooled starchy water until it turns glossy.",
    "不要用熱水調稀青醬，也不要反覆加油。太稠時每次加 15 毫升放涼的煮麵水；若油水分離顯油，離火拌入 15 毫升放涼的澱粉水，至恢復光澤。",
    "熱い湯でのばしたり、油を何度も足したりしません。濃ければ冷ましたゆで汁を15mlずつ加え、油っぽく分離したら火から外して冷ましたでんぷん水を15ml和え、つやが戻るまで混ぜます。",
    "뜨거운 물로 페스토를 묽게 하거나 기름을 계속 더하지 마세요. 되직하면 식힌 면수를 15ml씩 넣고, 기름이 분리돼 보이면 불에서 내려 식힌 전분 면수 15ml를 섞어 윤기가 돌아올 때까지 버무립니다.",
    "อย่าใช้น้ำร้อนทำให้เพสโตเหลวหรือเติมน้ำมันซ้ำ ๆ หากข้น ให้เติมน้ำต้มเส้นที่เย็นแล้วครั้งละ 15 มล. หากเห็นน้ำมันแยก ให้คลุกน้ำแป้งจากเส้นที่เย็นแล้ว 15 มล.นอกเตาจนกลับมาเงา"
  );
  setStorage(recipe);
  addFoodSafetySources(recipe);
}

export function refineSeventyNinthMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseCacioEPepe(byId.get("cacio-e-pepe"));
  reviseAmatriciana(byId.get("bucatini-amatriciana"));
  revisePastaAllaNorma(byId.get("pasta-alla-norma"));
  reviseTrofieAlPesto(byId.get("trofie-al-pesto"));
  return recipes;
}
