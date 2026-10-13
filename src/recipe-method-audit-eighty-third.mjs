const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${label}`, url });
  }
}

function reviseDoenjangJjigae(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = recipe.tips.map((tip) => ({ ...tip }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
  recipe.cookMinutes = 35;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const bodies = [
    ml(
      "Rinse the potato, zucchini, onion, shiitake, scallions, and chile under running water before cutting, then dry them; use a clean board and knife. Bring the 900 ml anchovy-kelp stock to a boil in a 2.5 L pot over medium-high heat, skim loose particles, then lower to a steady simmer. Reaching the boil usually takes 5–8 minutes, depending on the starting stock and stove.",
      "馬鈴薯、櫛瓜、洋蔥、香菇、蔥與辣椒先在流水下沖洗再切，並擦乾；使用乾淨砧板和刀。900 毫升鯷魚昆布高湯放入 2.5 公升鍋，以中大火煮滾，撈除浮出的碎屑後轉為穩定小滾。依高湯起始溫度和爐具不同，煮滾通常需 5–8 分鐘。",
      "じゃがいも、ズッキーニ、玉ねぎ、しいたけ、ねぎ、青唐辛子は流水で洗ってから切り、水気を拭きます。清潔なまな板と包丁を使います。煮干しと昆布のだし900mlを2.5L鍋に入れ、中強火で沸騰させ、浮いたかけらをすくってから安定した弱い沸騰にします。だしの温度やコンロにより、沸騰までは通常5〜8分です。",
      "감자, 애호박, 양파, 표고버섯, 대파와 풋고추를 흐르는 물에 씻어 자른 뒤 물기를 닦고, 깨끗한 도마와 칼을 사용합니다. 2.5L 냄비에 멸치·다시마 육수 900ml를 넣고 중강불로 끓입니다. 떠오르는 부스러기를 걷고 일정하게 보글거리도록 불을 낮춥니다. 육수의 시작 온도와 화구에 따라 끓기까지 보통 5–8분 걸립니다.",
      "ล้างมันฝรั่ง ซูกินี หอมหัวใหญ่ เห็ดหอม ต้นหอม และพริกใต้ก๊อกน้ำก่อนหั่น แล้วเช็ดให้แห้ง ใช้เขียงและมีดสะอาด ใส่น้ำสต๊อกปลาแอนโชวีและสาหร่ายคอมบุ 900 มล. ในหม้อ 2.5 ลิตร ตั้งไฟกลางค่อนแรงจนเดือด ช้อนเศษที่ลอยขึ้น แล้วลดให้เดือดเบา ๆ สม่ำเสมอ โดยทั่วไปใช้ 5–8 นาที ขึ้นกับอุณหภูมิเริ่มต้นและเตา"
    ),
    ml(
      "Put the 70 g doenjang in a fine sieve and lower it into the simmering stock. Press and stir with a spoon until the paste disperses; stop when only coarse soybean skins remain, or leave those in if you prefer a rustic broth. If a lump resists, loosen it against the sieve with a spoonful of hot stock rather than leaving a salty pocket.",
      "70 公克大醬放入細網篩，浸入小滾高湯中，用湯匙按壓並攪動至醬料散開；只剩粗豆皮時即可停下，喜歡鄉村口感也可留在湯裡。若有醬塊不散，用一匙熱高湯在篩中壓開，避免湯裡留下過鹹的一團。",
      "テンジャン70gを目の細かいざるに入れ、煮立っただしに沈めます。スプーンで押しながら混ぜて溶かし、粗い大豆の皮だけになったら止めます。素朴な口当たりが好みなら皮を残しても構いません。固まりが残る場合は、熱いだしを少量かけてざるの中でほぐし、塩辛い塊が鍋に残らないようにします。",
      "된장 70g을 고운 체에 담아 끓는 육수에 넣고 숟가락으로 누르며 저어 풀어 줍니다. 굵은 콩껍질만 남으면 멈추고, 소박한 식감을 원하면 껍질을 남겨도 됩니다. 덩어리가 남으면 뜨거운 육수 한 숟가락을 부어 체 안에서 풀어 짠 덩어리가 국물에 남지 않게 합니다.",
      "ใส่เต้าเจี้ยวเกาหลี 70 กรัมในกระชอนตาถี่ จุ่มลงในน้ำสต๊อกที่เดือดเบา ๆ แล้วใช้ช้อนกดและคนจนละลาย หยุดเมื่อเหลือเพียงเปลือกถั่วชิ้นใหญ่ หรือจะเก็บไว้เพื่อให้ได้เนื้อสัมผัสแบบบ้าน ๆ ก็ได้ หากยังมีก้อน ให้ตักน้ำสต๊อกร้อนเล็กน้อยราดแล้วกดผ่านกระชอน อย่าปล่อยให้มีก้อนเค็มอยู่ในหม้อ"
    ),
    ml(
      "Add the 2 cm potato cubes and onion, cover with the lid slightly ajar, and simmer 10 minutes. A knife should enter the outer potato easily but still meet slight resistance in the centre; this is a halfway texture check, not the finished tenderness. If the outside is still hard, simmer 2 minutes more before adding the quicker-cooking vegetables.",
      "加入 2 公分馬鈴薯塊和洋蔥，鍋蓋留縫，小火煮 10 分鐘。刀尖應能輕鬆刺入馬鈴薯外層，但中心仍略有阻力；這是中途口感檢查，還不是最後熟度。若外層仍硬，先多煮 2 分鐘再加入較快熟的蔬菜。",
      "2cm角のじゃがいもと玉ねぎを加え、ふたを少しずらして10分煮ます。ナイフは外側にすっと入り、中心には少し抵抗が残る状態が途中の目安です。これは仕上がりの柔らかさではありません。外側もまだ硬ければ、火の通りが早い野菜を加える前に2分追加します。",
      "2cm 크기 감자와 양파를 넣고 뚜껑을 살짝 열어 둔 채 10분 끓입니다. 칼이 감자 바깥쪽에는 쉽게 들어가지만 중심에는 약간 저항이 남아야 합니다. 이는 중간 확인이지 최종 익힘 기준이 아닙니다. 바깥도 여전히 단단하면 더 빨리 익는 채소를 넣기 전에 2분 더 끓입니다.",
      "ใส่มันฝรั่งหั่น 2 ซม. และหอมหัวใหญ่ ปิดฝาแง้มไว้ เคี่ยว 10 นาที มีดควรแทงผ่านด้านนอกของมันฝรั่งได้ง่ายแต่ยังติดเล็กน้อยที่กลาง นี่เป็นการเช็กระหว่างทาง ไม่ใช่ความนุ่มขั้นสุดท้าย หากด้านนอกยังแข็งให้เคี่ยวเพิ่ม 2 นาทีก่อนใส่ผักที่สุกเร็วกว่า"
    ),
    ml(
      "Add the zucchini, shiitake, garlic, and 10 g gochugaru. Simmer uncovered 6 minutes, stirring once from the bottom so the paste does not settle and catch. The mushrooms should be supple and the zucchini just yielding while still holding its half-moon shape. If the paste starts sticking, lower the heat and loosen the base with 30 ml hot water.",
      "加入櫛瓜、香菇、蒜與 10 公克韓國辣椒粉，不加蓋煮 6 分鐘；中途從鍋底攪一次，避免醬料沉底燒黏。香菇應柔軟，櫛瓜略軟但仍保持半月形。若醬料開始黏鍋，轉小火並加 30 毫升熱水把鍋底鬆開。",
      "ズッキーニ、しいたけ、にんにく、コチュカル10gを加え、ふたをせず6分煮ます。途中で一度鍋底から混ぜ、みそが沈んで焦げ付くのを防ぎます。しいたけはしんなりし、ズッキーニは半月形を保ったまま少し柔らかくなれば十分です。みそが鍋底に付き始めたら火を弱め、熱湯30mlで底をゆるめます。",
      "애호박, 표고버섯, 마늘, 고춧가루 10g을 넣고 뚜껑을 열어 6분 끓입니다. 중간에 바닥부터 한 번 저어 된장이 가라앉아 눌어붙지 않게 합니다. 버섯은 부드럽고 애호박은 반달 모양을 유지하면서 살짝 휘어질 정도면 됩니다. 된장이 붙기 시작하면 불을 낮추고 뜨거운 물 30ml를 넣어 바닥을 풀어 줍니다.",
      "ใส่ซูกินี เห็ดหอม กระเทียม และโคชูการู 10 กรัม เคี่ยวเปิดฝา 6 นาที คนจากก้นหม้อหนึ่งครั้งเพื่อไม่ให้เต้าเจี้ยวจมและไหม้ติดก้น เห็ดควรนุ่มและซูกินีสุกพอให้งอได้เล็กน้อยแต่ยังคงรูปครึ่งวง หากเริ่มติดก้นให้ลดไฟและเติมน้ำร้อน 30 มล. เพื่อแซะก้นหม้อ"
    ),
    ml(
      "Slide in the 2 cm tofu cubes and simmer gently 5 minutes; do not stir with a spoon, just swirl the pot once. The potato should now yield to a knife through the centre and the tofu should be hot through without crumbling. If a potato centre is still chalky, keep the pot at a gentle simmer for 2-minute checks; lift out a few zucchini pieces if they are already very soft.",
      "滑入 2 公分豆腐塊，保持小火再煮 5 分鐘；不要用湯匙攪，只輕輕晃鍋一次。此時刀尖應能穿過馬鈴薯中心，豆腐內部也應熱透但不碎裂。若馬鈴薯中心仍粉硬，維持小滾並每 2 分鐘檢查；若櫛瓜已很軟，可先撈出幾片。",
      "2cm角の豆腐をそっと入れ、弱く煮立つ状態で5分加熱します。スプーンで混ぜず、鍋を一度軽く揺すります。じゃがいもの中心までナイフが通り、豆腐も崩れず中まで熱ければよい状態です。じゃがいもの中心が粉っぽく硬ければ2分ずつ煮て確認します。ズッキーニが先に柔らかくなっていれば、数切れ取り出しておきます。",
      "두부를 살며시 넣고 약하게 5분 끓입니다. 숟가락으로 젓지 말고 냄비를 한 번 가볍게 흔듭니다. 이제 칼이 감자 중심까지 들어가고 두부는 부서지지 않으면서 속까지 뜨거워야 합니다. 감자 중심이 분처럼 단단하면 약하게 끓이며 2분마다 확인하고, 애호박이 먼저 아주 부드러워졌다면 몇 조각 건져 둡니다.",
      "ค่อย ๆ ใส่เต้าหู้หั่น 2 ซม. แล้วเคี่ยวเบา ๆ อีก 5 นาที อย่าคนด้วยช้อน ให้ขยับหม้อเบา ๆ หนึ่งครั้ง มันฝรั่งควรนุ่มจนมีดแทงผ่านกลางได้ และเต้าหู้ร้อนทั่วโดยไม่แตก หากกลางมันฝรั่งยังแข็งร่วน ให้เคี่ยวเบา ๆ ต่อและเช็กทุก 2 นาที หากซูกินีนิ่มมากแล้วให้ตักบางชิ้นขึ้นพักไว้ก่อน"
    ),
    ml(
      "Add the scallions and green chile and simmer 2 minutes. Taste with a clean spoon only after the paste has dispersed; if the broth is too strong or salty, add hot water 30 ml at a time and bring it back to a simmer before tasting again. Do not add sugar to hide excess salt. The chile should smell fresh and remain bright, not dull and olive-coloured.",
      "加入蔥與青辣椒再煮 2 分鐘。大醬完全散開後，用乾淨湯匙試味；若湯味太濃或偏鹹，每次加 30 毫升熱水，重新煮至小滾後再試。不要用糖掩蓋過鹹。辣椒應保有清新香氣與亮色，不要煮到暗橄欖色。",
      "ねぎと青唐辛子を加えて2分煮ます。みそが溶けてから清潔なスプーンで味見します。味が濃い、または塩辛い場合は熱湯を30mlずつ加え、その都度再び煮立ててから味を確認します。塩味を砂糖で隠しません。唐辛子は香りと鮮やかな色が残り、くすんだオリーブ色にならないようにします。",
      "대파와 풋고추를 넣고 2분 끓입니다. 된장이 풀린 뒤 깨끗한 숟가락으로 맛봅니다. 국물이 너무 진하거나 짜면 뜨거운 물을 한 번에 30ml씩 넣고 다시 끓인 다음 맛을 봅니다. 짠맛을 설탕으로 감추지 마세요. 고추는 향과 선명한 색이 남고 탁한 올리브색이 되지 않아야 합니다.",
      "ใส่ต้นหอมและพริกเขียว เคี่ยวอีก 2 นาที ชิมด้วยช้อนสะอาดหลังเต้าเจี้ยวละลายแล้วเท่านั้น หากน้ำแกงเข้มหรือเค็มเกินไป เติมน้ำร้อนครั้งละ 30 มล. แล้วนำกลับมาเคี่ยวก่อนชิมอีกครั้ง อย่าเติมน้ำตาลเพื่อกลบรสเค็ม พริกควรมีกลิ่นสดและสีสด ไม่หม่นเป็นสีเขียวมะกอก"
    ),
    ml(
      "Turn off the heat, cover, and rest 3 minutes so the broth settles around the vegetables. Portion into four bowls with similar amounts of potato, tofu, and mushrooms. The finished potato should be tender without falling apart and the broth should taste savoury rather than sharply salty. Do not leave the pot at room temperature while serving; chill any leftovers promptly.",
      "關火加蓋靜置 3 分鐘，讓湯汁均勻包覆蔬菜。分成四碗，平均分配馬鈴薯、豆腐與香菇。成品的馬鈴薯應軟嫩但不散，湯頭鮮鹹而不刺鹹。上桌期間不要讓整鍋長時間留在室溫；剩食應儘快冷藏。",
      "火を止めてふたをし、3分休ませてだしを具になじませます。4つの器に分け、じゃがいも、豆腐、しいたけを均等に盛ります。じゃがいもは崩れない柔らかさ、汁は塩辛さが立たずうま味がある状態が目安です。食卓に出している間、鍋を室温に長く置かず、残りは速やかに冷蔵します。",
      "불을 끄고 뚜껑을 덮어 3분 두어 국물이 채소에 고르게 배게 합니다. 네 그릇에 나누며 감자, 두부, 버섯을 비슷하게 담습니다. 감자는 부서지지 않을 만큼 부드럽고 국물은 짜게 튀지 않고 감칠맛이 나야 합니다. 식사 중 냄비를 실온에 오래 두지 말고 남은 음식은 신속히 냉장합니다.",
      "ปิดไฟ ปิดฝาพัก 3 นาทีให้น้ำซุปซึมทั่วผัก แบ่งใส่ 4 ชามให้มีมันฝรั่ง เต้าหู้ และเห็ดในปริมาณใกล้เคียงกัน มันฝรั่งควรนุ่มแต่ไม่เละ และน้ำซุปควรกลมกล่อมไม่เค็มโดด อย่าวางหม้อไว้ที่อุณหภูมิห้องนานระหว่างกิน รีบนำส่วนที่เหลือไปแช่เย็น"
    )
  ];
  recipe.instructions = recipe.instructions.map((step, index) => ({ ...step, body: bodies[index] }));
  recipe.storage = ml(
    "Cool leftovers in shallow portions and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best quality. Reheat leftovers to 74°C/165°F throughout; the freshly simmered potato and tofu are judged by tenderness and heat, not by that leftover reheating minimum.",
    "剩食分裝淺盒，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），冰箱保持 4°C／40°F 或以下；為維持最佳品質，3 天內食用。剩食各處回熱至 74°C／165°F；現煮馬鈴薯和豆腐則以柔軟度和熱度判斷，不以此剩食回熱最低溫度當作熟度目標。",
    "残りは浅い容器に小分けし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質のため3日以内に食べます。残りは全体を74°C/165°Fまで再加熱します。作りたてのじゃがいもと豆腐は柔らかさと熱さで判断し、この残り物用最低温度を仕上がり目標にはしません。",
    "남은 음식은 얕은 용기에 나눠 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 3일 안에 먹습니다. 남은 음식은 전체를 74°C/165°F까지 재가열합니다. 갓 끓인 감자와 두부는 부드러움과 열감으로 판단하며, 남은 음식 재가열 최소 온도를 신선한 요리의 익힘 기준으로 쓰지 않습니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นอาหารเหลือให้ทั่วถึง 74°C/165°F ส่วนมันฝรั่งและเต้าหู้ที่เพิ่งเคี่ยวให้ดูความนุ่มและความร้อน ไม่ใช้ค่าอุ่นอาหารเหลือนี้เป็นเป้าหมายความสุกของอาหารทำใหม่"
  );
  recipe.tips[0] = ml(
    "Keep the broth at a steady simmer after the paste is dissolved; a hard boil can break the tofu and mash the potato edges.",
    "大醬溶開後維持穩定小滾；大火沸騰會撞碎豆腐，也容易把馬鈴薯邊角煮散。",
    "みそを溶かした後は静かな沸騰を保ちます。強く煮立てると豆腐が崩れ、じゃがいもの角も煮崩れます。",
    "된장을 푼 뒤에는 잔잔하게 끓이세요. 세게 끓이면 두부가 부서지고 감자 모서리도 으깨집니다.",
    "หลังละลายเต้าเจี้ยวแล้วให้เดือดเบา ๆ สม่ำเสมอ การเดือดแรงทำให้เต้าหู้แตกและขอบมันฝรั่งเละ"
  );
  recipe.commonMistakes[0] = ml(
    "If the broth tastes too salty, dilute it with measured hot water after the vegetables are tender; adding sugar hides the flavour without correcting the salt.",
    "蔬菜熟後若湯頭太鹹，以量好的熱水稀釋；加糖只會掩蓋味道，並未修正鹹度。",
    "具が柔らかくなってから汁が塩辛ければ、熱湯を計って加えます。砂糖で隠しても塩味は直りません。",
    "채소가 익은 뒤 국물이 짜면 양을 잰 뜨거운 물로 희석하세요. 설탕은 짠맛을 가릴 뿐 바로잡지 못합니다.",
    "หากน้ำซุปเค็มหลังผักนุ่มแล้ว ให้เติมน้ำร้อนโดยตวงปริมาณ น้ำตาลแค่กลบรสแต่ไม่ได้แก้ความเค็ม"
  );
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  return recipe;
}

function reviseRatatouille(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = recipe.tips.map((tip) => ({ ...tip }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
  recipe.cookMinutes = 60;
  recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  const bodies = [
    ml(
      "Rinse the whole eggplant, zucchini, peppers, tomatoes, and herbs under running water and dry before trimming or cutting; do not use soap or produce wash. Cut eggplant, zucchini, and seeded peppers into even 2 cm pieces and keep them in separate bowls. Dice the onion, chop the tomatoes, and leave the thyme and rosemary whole so they can be lifted out later.",
      "整顆茄子、櫛瓜、甜椒、番茄與香草先在流水下沖洗並擦乾，再修切；不要用肥皂或蔬果清潔劑。茄子、櫛瓜和去籽甜椒切成大小一致的 2 公分塊，分碗放置。洋蔥切丁、番茄切碎，百里香與迷迭香保留整枝，方便稍後取出。",
      "なす、ズッキーニ、パプリカ、トマト、香草は切る前に流水で洗い、水気を拭きます。石けんや野菜用洗剤は使いません。なす、ズッキーニ、種を除いたパプリカを2cm角にそろえ、別々のボウルに分けます。玉ねぎは角切り、トマトは刻み、タイムとローズマリーは後で取り出せるよう枝のままにします。",
      "가지, 애호박, 피망, 토마토와 허브를 흐르는 물에 씻고 물기를 닦은 뒤 손질합니다. 비누나 채소 세정제는 사용하지 않습니다. 가지, 애호박, 씨를 뺀 피망을 2cm 크기로 고르게 썰어 따로 담습니다. 양파는 깍둑썰고 토마토는 다지며, 타임과 로즈마리는 나중에 건지기 쉽도록 통째로 둡니다.",
      "ล้างมะเขือม่วง ซูกินี พริกหวาน มะเขือเทศ และสมุนไพรทั้งลูกใต้ก๊อกน้ำแล้วเช็ดให้แห้งก่อนตัดแต่ง ห้ามใช้สบู่หรือน้ำยาล้างผัก หั่นมะเขือม่วง ซูกินี และพริกหวานที่เอาเมล็ดออกเป็นชิ้น 2 ซม. ขนาดใกล้กัน แยกใส่ชาม หั่นหัวหอมเต๋า สับมะเขือเทศ และเก็บไธม์กับโรสแมรีเป็นกิ่งเพื่อหยิบออกภายหลัง"
    ),
    ml(
      "Heat 30 ml olive oil in a wide, deep skillet over medium-high heat. Add the eggplant in one loose layer and fry 7–8 minutes, turning every couple of minutes, until several faces are lightly golden and the edges begin to soften. If the pieces steam and release water instead of colouring, spread them out or cook in two batches; transfer each batch to a bowl.",
      "寬而深的平底鍋加入 30 毫升橄欖油，中大火加熱。茄子鬆散鋪成單層，翻動幾次煎 7–8 分鐘，直到多面微金黃、邊緣開始變軟。若茄子出水變成蒸煮而不上色，攤開或分兩批煎；每批煎好後盛入碗中。",
      "広く深いフライパンにオリーブ油30mlを入れ、中強火で熱します。なすを重ならないように入れ、ときどき返しながら7〜8分炒めます。数面に薄い焼き色が付き、縁が柔らかくなり始めたらよい状態です。水が出て色づかない場合は広げるか2回に分け、焼けた分はボウルに移します。",
      "넓고 깊은 팬에 올리브유 30ml를 넣어 중강불로 달굽니다. 가지를 겹치지 않게 한 겹으로 넣고 몇 분마다 뒤집으며 7–8분 볶아 여러 면에 옅은 갈색이 나고 가장자리가 부드러워지기 시작하면 덜어냅니다. 물이 나와 색이 나지 않고 찌듯 익으면 펼치거나 두 번 나눠 볶고, 익은 가지는 그릇에 옮깁니다.",
      "ตั้งน้ำมันมะกอก 30 มล. ในกระทะลึกและกว้างด้วยไฟกลางค่อนแรง ใส่มะเขือม่วงให้กระจายเป็นชั้นเดียว ผัด 7–8 นาที พลิกทุกสองสามนาทีจนหลายด้านเป็นสีทองอ่อนและขอบเริ่มนิ่ม หากมีน้ำออกมาจนเหมือนนึ่งแทนการเหลือง ให้เกลี่ยให้กระจายหรือผัดสองรอบ ตักแต่ละรอบใส่ชาม"
    ),
    ml(
      "Add 15 ml oil to the same pan and cook the zucchini and peppers 6–8 minutes, turning gently, until a few edges colour and the pieces bend slightly but still hold their shape. If the pan fills with liquid, raise the heat briefly and let the steam escape before transferring the vegetables beside the eggplant. Keep the pan; the browned bits will season the tomato base.",
      "同鍋加入 15 毫升油，放入櫛瓜與甜椒，輕輕翻動煮 6–8 分鐘，至部分邊緣上色、稍彎但仍保形。若鍋中積水，短暫轉大火讓水氣散去，再將蔬菜盛到茄子旁。保留鍋子，鍋底的褐色焦香物能為番茄底醬增味。",
      "同じフライパンに油15mlを加え、ズッキーニとパプリカを優しく返しながら6〜8分炒めます。少し焼き色が付き、形を保ったまま軽く曲がる程度が目安です。水がたまったら一時的に火を強めて蒸気を飛ばし、なすの横に移します。鍋底に残った焼き付きはトマトの土台に使います。",
      "같은 팬에 기름 15ml를 더하고 애호박과 피망을 부드럽게 뒤집으며 6–8분 볶습니다. 일부 가장자리에 색이 나고 조각이 살짝 휘지만 형태는 유지되어야 합니다. 팬에 물이 고이면 잠시 불을 높여 수증기를 날린 뒤 가지 옆 그릇에 옮깁니다. 팬 바닥의 갈색 풍미는 토마토 소스에 사용합니다.",
      "เติมน้ำมันอีก 15 มล. ในกระทะเดิม ใส่ซูกินีและพริกหวาน ผัดเบา ๆ 6–8 นาทีจนขอบบางส่วนมีสีและผักงอได้เล็กน้อยแต่ยังคงรูป หากมีน้ำขังให้เร่งไฟชั่วครู่เพื่อไล่ไอน้ำก่อนตักใส่ชามเดียวกับมะเขือม่วง เก็บกระทะไว้ เพราะเศษสีน้ำตาลที่ติดก้นจะเพิ่มรสให้ฐานมะเขือเทศ"
    ),
    ml(
      "Add another 15 ml oil and cook the onion over medium heat 5 minutes until translucent, scraping up the browned bits. Add garlic for 1 minute; do not let it turn brown. Add tomatoes, salt, pepper, thyme, rosemary, and bay, then simmer uncovered 10 minutes until juicy and softened. If a watery ring remains, continue in 2-minute increments; if the base catches, lower the heat and stir.",
      "再加 15 毫升油，中火炒洋蔥 5 分鐘至半透明，同時刮起鍋底焦香物。加入蒜炒 1 分鐘，不要炒成褐色。放入番茄、鹽、胡椒、百里香、迷迭香與月桂葉，開蓋小煮 10 分鐘至出汁變軟。若周圍仍有水圈，每次續煮 2 分鐘；若底部黏鍋，轉小火並攪拌。",
      "油をさらに15ml加え、中火で玉ねぎを5分、透き通るまで炒め、鍋底の焼き付きをこそげます。にんにくを加えて1分炒めますが、色づかせません。トマト、塩、こしょう、タイム、ローズマリー、ローリエを加え、ふたをせず10分、汁が出て柔らかくなるまで煮ます。水の輪が残れば2分ずつ追加し、鍋底に付く場合は火を弱めて混ぜます。",
      "기름 15ml를 더 넣고 양파를 중불에서 5분 볶아 투명해질 때까지 익히며 팬 바닥의 갈색 조각을 긁어 냅니다. 마늘을 넣어 1분 볶되 갈색으로 태우지 않습니다. 토마토, 소금, 후추, 타임, 로즈마리와 월계수잎을 넣고 뚜껑 없이 10분 끓여 즙이 나고 부드러워지게 합니다. 물이 고인 테두리가 남으면 2분씩 더 끓이고, 바닥에 붙으면 불을 낮춰 저어 줍니다.",
      "เติมน้ำมันอีก 15 มล. ผัดหัวหอมด้วยไฟกลาง 5 นาทีจนใส พร้อมขูดเศษสีน้ำตาลที่ก้นกระทะ ใส่กระเทียมอีก 1 นาที อย่าให้เป็นสีน้ำตาล เติมมะเขือเทศ เกลือ พริกไทย ไธม์ โรสแมรี และใบกระวาน เคี่ยวเปิดฝา 10 นาทีจนฉ่ำและนุ่ม หากยังมีวงน้ำใสรอบ ๆ ให้เคี่ยวต่อครั้งละ 2 นาที หากเริ่มติดก้นให้ลดไฟและคน"
    ),
    ml(
      "Fold the eggplant, zucchini, and peppers into the tomato base. Cover and simmer on low 15–20 minutes, turning gently twice. Check the thickest eggplant with a thin knife: it should pass through easily, while the zucchini and pepper remain identifiable rather than collapsing. If the vegetables are still firm and the base has dried, add 15 ml hot water, cover, and simmer 5 minutes more before checking again.",
      "把茄子、櫛瓜與甜椒輕拌回番茄底醬，加蓋小火煨 15–20 分鐘，中途輕翻兩次。用細刀檢查最厚的茄子，應能輕易穿過；櫛瓜與甜椒仍要看得出形狀，不應煮垮。若蔬菜仍硬但醬汁已乾，加入 15 毫升熱水、加蓋再煨 5 分鐘後重測。",
      "なす、ズッキーニ、パプリカをトマトの土台に戻し、ふたをして弱火で15〜20分煮ます。途中で2回優しく返します。最も厚いなすに細いナイフを刺し、抵抗なく通るか確認します。ズッキーニとパプリカは煮崩れず形が分かる状態にします。野菜がまだ硬いのに汁がなくなったら、熱湯15mlを加えてふたをし、5分追加してから再確認します。",
      "가지, 애호박과 피망을 토마토 소스에 살살 섞고 뚜껑을 덮어 약불로 15–20분 끓입니다. 중간에 두 번 부드럽게 뒤집습니다. 가장 두꺼운 가지에 얇은 칼이 쉽게 들어가는지 확인합니다. 애호박과 피망은 뭉개지지 않고 모양이 보여야 합니다. 채소가 아직 단단한데 소스가 마르면 뜨거운 물 15ml를 넣고 덮어 5분 더 끓인 뒤 다시 확인합니다.",
      "ใส่มะเขือม่วง ซูกินี และพริกหวานกลับลงในฐานมะเขือเทศ คลุกเบา ๆ ปิดฝาเคี่ยวไฟอ่อน 15–20 นาที พลิกเบา ๆ สองครั้ง ใช้มีดบางทดสอบมะเขือม่วงชิ้นหนาที่สุด ควรแทงผ่านได้ง่าย ส่วนซูกินีและพริกควรยังเห็นรูปทรงไม่เละ หากผักยังแข็งแต่ซอสแห้ง ให้เติมน้ำร้อน 15 มล. ปิดฝาเคี่ยวต่อ 5 นาทีแล้วตรวจซ้ำ"
    ),
    ml(
      "Uncover and simmer 5–8 minutes only if liquid pools around the vegetables. Turn pieces gently instead of stirring hard. Stop when the sauce lightly coats them and no watery puddle remains. If the sauce thickens before the vegetables are tender, lower the heat and add 15 ml hot water; if the vegetables are tender but the sauce is loose, lift them out briefly and reduce the sauce alone for 2 minutes.",
      "只有蔬菜周圍積水時才開蓋續煨 5–8 分鐘。輕翻蔬菜，不要大力攪拌。薄醬能附著且沒有水窪時即可停火。若醬汁先變濃而蔬菜仍硬，轉小火並加 15 毫升熱水；若蔬菜已軟但醬汁太稀，先短暫撈出蔬菜，單獨收汁 2 分鐘。",
      "野菜の周りに水がたまる場合だけ、ふたを外して5〜8分煮詰めます。強く混ぜず、優しく返します。薄いソースが絡み、水たまりがなくなったら止めます。野菜が柔らかくなる前にソースが濃くなったら火を弱め、熱湯15mlを加えます。野菜が柔らかいのにソースが水っぽければ、一度野菜を取り出し、ソースだけを2分煮詰めます。",
      "채소 주변에 물이 고일 때만 뚜껑을 열고 5–8분 졸입니다. 세게 젓지 말고 조각을 부드럽게 뒤집습니다. 묽은 소스가 채소에 얇게 붙고 물웅덩이가 없어지면 멈춥니다. 채소가 부드러워지기 전에 소스가 진해지면 불을 낮추고 뜨거운 물 15ml를 넣습니다. 채소는 부드러운데 소스가 묽으면 채소를 잠시 건져 소스만 2분 졸입니다.",
      "เปิดฝาเคี่ยว 5–8 นาทีเฉพาะเมื่อมีน้ำขังรอบผัก พลิกชิ้นผักเบา ๆ อย่าคนแรง หยุดเมื่อซอสเคลือบผักบาง ๆ และไม่มีแอ่งน้ำ หากซอสข้นก่อนผักนุ่มให้ลดไฟและเติมน้ำร้อน 15 มล. หากผักนุ่มแล้วแต่ซอสยังเหลว ให้ตักผักออกชั่วคราวแล้วเคี่ยวซอสเพียงอย่างเดียว 2 นาที"
    ),
    ml(
      "Turn off the heat, fold in the final 10 ml olive oil, and rest 5 minutes. Lift out the thyme, rosemary, and bay leaf as you serve. The vegetables should be tender but still hold their separate shapes, with a glossy coating rather than a pool of oil. If they have become very soft, do not stir again; spoon them gently from the bottom of the pan.",
      "關火後拌入最後 10 毫升橄欖油，靜置 5 分鐘。盛菜時挑出百里香、迷迭香與月桂葉。蔬菜應軟嫩但仍各自保形，表面油亮而不是浮著一層油。若蔬菜已很軟，不要再攪；從鍋底輕輕舀起即可。",
      "火を止め、最後のオリーブ油10mlを混ぜて5分休ませます。盛り付けながらタイム、ローズマリー、ローリエを取り除きます。野菜は柔らかくても形がそれぞれ残り、油だまりではなく薄い艶がある状態にします。煮崩れそうならもう混ぜず、鍋底からそっとすくいます。",
      "불을 끄고 마지막 올리브유 10ml를 넣어 섞은 뒤 5분 둡니다. 담을 때 타임, 로즈마리와 월계수잎을 건져 냅니다. 채소는 부드럽되 각각의 모양이 남고 기름 웅덩이 대신 윤기가 나야 합니다. 너무 물러졌다면 더 젓지 말고 팬 바닥에서 조심스럽게 떠냅니다.",
      "ปิดไฟ คลุกน้ำมันมะกอก 10 มล. ส่วนสุดท้าย แล้วพัก 5 นาที ตักเสิร์ฟพร้อมหยิบกิ่งไธม์ โรสแมรี และใบกระวานออก ผักควรนุ่มแต่ยังเห็นรูปทรงของแต่ละชนิด เคลือบเงาไม่ใช่มีน้ำมันขัง หากผักนิ่มมากแล้วอย่าคนอีก ให้ตักอย่างเบามือจากก้นกระทะ"
    )
  ];
  recipe.instructions = recipe.instructions.map((step, index) => ({ ...step, body: bodies[index] }));
  recipe.storage = ml(
    "Cool in shallow portions and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best quality. Reheat leftovers to 74°C/165°F throughout. Fresh ratatouille has no separate numeric internal-temperature target; a knife-through eggplant and intact, tender pieces describe texture.",
    "分裝淺盒，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下；為最佳品質請於 3 天內食用。剩食各處回熱至 74°C／165°F。現做蔬菜燉菜沒有另外的數字型中心溫度目標；刀能穿透茄子、蔬菜軟嫩且保形是口感判斷。",
    "浅い容器に小分けし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質のため3日以内に食べ、残りは全体を74°C/165°Fまで再加熱します。作りたての野菜煮込みには別の数値中心温度目標はありません。なすにナイフが通り、野菜が柔らかく形を保つことが食感の目安です。",
    "얕은 용기에 나눠 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 3일 안에 먹습니다. 남은 음식은 전체를 74°C/165°F까지 재가열합니다. 갓 만든 채소 스튜에는 별도의 수치 중심 온도 기준이 없습니다. 칼이 가지에 들어가고 채소가 부드러우면서 모양을 유지하는지가 식감 기준입니다.",
    "แบ่งใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นอาหารเหลือให้ทั่วถึง 74°C/165°F ราตาตูยทำใหม่ไม่มีอุณหภูมิกลางเป็นตัวเลขเฉพาะ การที่มีดแทงผ่านมะเขือม่วงและผักนุ่มแต่ยังคงรูปเป็นเกณฑ์เนื้อสัมผัส"
  );
  recipe.tips[0] = ml(
    "Use a broad skillet and keep the three vegetable groups separate until the tomato base is ready; this lets excess water escape and helps each piece keep its shape.",
    "使用寬鍋，番茄底醬完成前讓三組蔬菜分開煎；多餘水分較易散去，也能保留各自形狀。",
    "広いフライパンを使い、トマトの土台ができるまで3種類の野菜を別々に炒めます。水分が飛びやすく、それぞれの形も保てます。",
    "넓은 팬을 쓰고 토마토 소스가 완성될 때까지 세 종류의 채소를 따로 볶으세요. 수분이 잘 날아가고 모양이 유지됩니다.",
    "ใช้กระทะกว้างและผัดผักสามกลุ่มแยกกันจนฐานมะเขือเทศพร้อม น้ำส่วนเกินจะระเหยง่ายและผักแต่ละชนิดคงรูป"
  );
  recipe.commonMistakes[0] = ml(
    "Crowding the pan traps steam and leaves the eggplant pale. Brown it in a loose layer, then reduce extra tomato liquid only after the vegetables are tender.",
    "鍋中太擠會困住水氣，茄子便不上色。先鬆散鋪開煎上色，等蔬菜軟嫩後再收掉多餘番茄汁。",
    "鍋に詰め込みすぎると蒸気がこもり、なすが色づきません。余裕を持って焼き、野菜が柔らかくなってから余分なトマト汁を煮詰めます。",
    "팬을 너무 꽉 채우면 수증기가 갇혀 가지가 갈색으로 익지 않습니다. 여유 있게 펼쳐 볶고 채소가 부드러워진 다음 토마토 수분을 졸이세요.",
    "การใส่ผักแน่นกระทะทำให้ไอน้ำค้างและมะเขือม่วงไม่เหลือง ผัดโดยเว้นที่ แล้วค่อยลดน้ำมะเขือเทศส่วนเกินหลังผักนุ่ม"
  );
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  return recipe;
}

function revisePanConTomate(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = recipe.tips.map((tip) => ({ ...tip }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
  const bodies = [
    ml(
      "Rinse the 500 g ripe tomatoes under running water and dry them before cutting; do not use soap or produce wash. Halve them across the equator and grate the cut faces over a bowl using the large holes, stopping when only the skin remains. Discard the skins. If the pulp is very watery, let it drain in a sieve for 1–2 minutes so the toast will stay crisp.",
      "500 公克熟番茄先在流水下沖洗並擦乾，再切；不要用肥皂或蔬果清潔劑。從赤道處切半，在碗上用粗孔刨絲器刨切面，刨到只剩外皮即停並丟棄外皮。若番茄泥特別水，可用篩網瀝 1–2 分鐘，讓吐司保持酥脆。",
      "完熟トマト500gは切る前に流水で洗って水気を拭きます。石けんや野菜用洗剤は使いません。赤道で半分に切り、切り口をボウルの上で粗目のおろし金に当て、皮だけになるまでおろします。皮は捨てます。水分が多ければざるで1〜2分水切りし、パンが湿らないようにします。",
      "잘 익은 토마토 500g을 흐르는 물에 씻고 물기를 닦은 뒤 자릅니다. 비누나 채소 세정제는 사용하지 않습니다. 토마토를 가로로 반 잘라 큰 구멍 강판에 자른 면을 대고 껍질만 남을 때까지 갈아 그 껍질은 버립니다. 과육이 너무 묽으면 체에 1–2분 받쳐 빵이 눅눅해지지 않게 합니다.",
      "ล้างมะเขือเทศสุกจัด 500 กรัมใต้ก๊อกน้ำแล้วเช็ดให้แห้งก่อนตัด ห้ามใช้สบู่หรือน้ำยาล้างผัก ผ่าครึ่งตามแนวเส้นศูนย์สูตร แล้วขูดด้านที่ผ่ากับรูใหญ่ของที่ขูดเหนือชาม หยุดเมื่อเหลือแต่เปลือกและทิ้งเปลือก หากเนื้อมะเขือเทศเหลวมากให้พักในกระชอน 1–2 นาทีเพื่อให้ขนมปังยังกรอบ"
    ),
    ml(
      "Heat the oven to 250°C or preheat a hot grill. Toast the four thick bread slices 6–8 minutes, turning once if needed, until both cut faces are dry and distinctly golden while the middle remains chewy. If the surface is still pale or damp, add 1-minute checks; if it darkens too fast, move the rack lower or reduce the grill heat.",
      "烤箱加熱至 250°C，或先預熱高溫烤爐。四片厚麵包烤 6–8 分鐘，必要時翻面一次，直到兩面切口乾爽且明顯金黃、中心仍有嚼勁。若表面仍白或潮軟，每次增加 1 分鐘檢查；若上色太快，將烤架下移或調低烤爐火力。",
      "オーブンを250°Cに予熱するか、グリルを高温にします。厚切りパン4枚を6〜8分焼き、必要なら一度返します。切り口が乾いてはっきり黄金色になり、中心は噛み応えが残る状態が目安です。まだ白く湿っていれば1分ずつ追加し、焦げそうならラックを下げるかグリルを弱めます。",
      "오븐을 250°C로 예열하거나 그릴을 뜨겁게 달굽니다. 두툼한 빵 네 조각을 6–8분 굽고 필요하면 한 번 뒤집습니다. 자른 면이 마르고 뚜렷한 황금빛이 나면서 가운데는 씹는 맛이 남아야 합니다. 아직 창백하거나 축축하면 1분씩 더 확인하고, 너무 빨리 어두워지면 선반을 낮추거나 그릴을 약하게 합니다.",
      "อุ่นเตาอบที่ 250°C หรืออุ่นเตาย่างไฟบนให้ร้อน ปิ้งขนมปังหนา 4 แผ่น 6–8 นาที พลิกหนึ่งครั้งหากจำเป็น จนด้านที่ปิ้งแห้งและเหลืองทองชัดแต่ตรงกลางยังเหนียวนุ่ม หากยังซีดหรือชื้นให้เพิ่มครั้งละ 1 นาที หากสีเข้มเร็วให้ลดชั้นวางหรือปรับไฟย่างให้อ่อนลง"
    ),
    ml(
      "While the toast is hot, rub each cut face with one light pass of the halved garlic; stop before the clove wears down into a strong paste. Drizzle about half of the 40 ml olive oil over the four slices. If the garlic aroma is already strong, leave the remaining clove aside rather than adding more.",
      "吐司趁熱時用半瓣蒜在每片切面輕擦一遍，蒜瓣磨到變成濃泥前就停。將 40 毫升橄欖油約一半淋在四片吐司上。若蒜香已足，剩下的蒜瓣可不再使用，避免味道過強。",
      "トーストが熱いうちに、半分に切ったにんにくを切り口へ軽く一度こすりつけます。にんにくがすり減って濃いペーストになる前に止めます。オリーブ油40mlの半量ほどを4枚に回しかけます。香りが十分なら残りのにんにくは使いません。",
      "토스트가 뜨거울 때 반으로 자른 마늘로 빵 표면을 가볍게 한 번 문지릅니다. 마늘이 닳아 강한 페이스트가 되기 전에 멈춥니다. 올리브유 40ml의 절반 정도를 네 조각에 뿌립니다. 마늘 향이 충분하면 남은 마늘을 더 쓰지 않습니다.",
      "ขณะขนมปังยังร้อน ใช้กระเทียมที่ผ่าครึ่งถูผิวหน้าขนมปังเบา ๆ หนึ่งรอบ หยุดก่อนกระเทียมจะถูกบดเป็นเพสต์รสแรง ราดน้ำมันมะกอกประมาณครึ่งหนึ่งจาก 40 มล. บนขนมปังทั้งสี่แผ่น หากกลิ่นกระเทียมชัดแล้วให้หยุดใช้กลีบที่เหลือ"
    ),
    ml(
      "Spoon about 90 g tomato pulp over each toast, spreading nearly to the edges without wetting the underside. Drizzle the remaining oil and divide the 4 g coarse salt evenly across the tops. Serve within 5 minutes while the bread is crisp. If the pulp starts pooling, drain it briefly before topping; once assembled, the toast cannot be crisped again without losing the fresh tomato topping.",
      "每片吐司舀約 90 公克番茄泥，鋪近邊緣但不要讓底面濕掉。淋上剩餘橄欖油，將 4 公克粗海鹽平均撒在上面。趁麵包酥脆，5 分鐘內上桌。若番茄泥積出汁水，先短暫瀝乾再鋪；組合後無法重新烤脆而不破壞新鮮番茄層。",
      "各トーストにトマトの果肉を約90gずつのせ、端近くまで広げますが、裏面を濡らさないようにします。残りの油を回しかけ、粗塩4gを全体に均等に振ります。パンの歯ごたえが残るうちに5分以内に出します。果肉から汁がたまる場合は、のせる前に短く水切りします。具をのせた後に焼き直すと新鮮なトマトの食感が損なわれます。",
      "토스트마다 토마토 과육 약 90g을 올려 가장자리 가까이 펴되 빵 밑면은 적시지 않습니다. 남은 올리브유를 두르고 굵은 소금 4g을 고르게 뿌립니다. 빵이 바삭할 때 5분 안에 냅니다. 과육에 물이 고이면 올리기 전에 잠시 체에 받칩니다. 올린 뒤에는 신선한 토마토를 망가뜨리지 않고 빵을 다시 바삭하게 만들기 어렵습니다.",
      "ตักเนื้อมะเขือเทศประมาณ 90 กรัมบนขนมปังแต่ละแผ่น เกลี่ยเกือบถึงขอบโดยไม่ให้ด้านล่างเปียก ราดน้ำมันที่เหลือและแบ่งเกลือทะเลเม็ดหยาบ 4 กรัมให้ทั่ว เสิร์ฟภายใน 5 นาทีขณะที่ขนมปังยังกรอบ หากมีน้ำขังในเนื้อมะเขือเทศให้พักสะเด็ดน้ำสั้น ๆ ก่อนวาง เมื่อประกอบแล้วไม่สามารถทำให้ขนมปังกรอบใหม่ได้โดยไม่เสียสัมผัสมะเขือเทศสด"
    )
  ];
  recipe.instructions = recipe.instructions.map((step, index) => ({ ...step, body: bodies[index] }));
  recipe.storage = ml(
    "Refrigerate unused grated tomato promptly in a clean covered container within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 2 days for best quality. Keep the bread separate in a cool, dry place and toast fresh. Fresh tomato pulp and toast have no separate numeric cooking-temperature target.",
    "未用完的番茄泥放入乾淨有蓋容器，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下；為最佳品質請於 2 天內使用。麵包分開放在陰涼乾燥處，食用前再烤。現做番茄泥和吐司沒有另外的數字型烹調溫度目標。",
    "残ったトマトの果肉は清潔なふた付き容器に入れ、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質のため2日以内に使います。パンは別にして涼しく乾燥した場所に置き、食べる直前に焼きます。生のトマト果肉とトーストに別個の数値調理温度目標はありません。",
    "남은 토마토 과육은 깨끗한 뚜껑 있는 용기에 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 2일 안에 씁니다. 빵은 따로 서늘하고 건조한 곳에 두었다가 먹기 직전에 굽습니다. 생 토마토 과육과 토스트에는 별도의 수치 조리 온도 기준이 없습니다.",
    "เก็บเนื้อมะเขือเทศที่เหลือในภาชนะสะอาดมีฝาปิด แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้ใช้ภายใน 2 วัน เก็บขนมปังแยกไว้ในที่เย็นและแห้งแล้วปิ้งใหม่ก่อนกิน เนื้อมะเขือเทศสดและขนมปังปิ้งไม่มีเป้าหมายอุณหภูมิปรุงสุกเป็นตัวเลขแยกต่างหาก"
  );
  recipe.tips[0] = ml(
    "Sturdy country bread and very ripe tomatoes matter most; drain only excess juice so the pulp still tastes fresh and juicy.",
    "結實的鄉村麵包和熟透番茄最重要；只瀝掉多餘汁液，保留番茄泥的新鮮多汁。",
    "しっかりした田舎パンと完熟トマトが要です。余分な汁だけを切り、果肉のみずみずしさは残します。",
    "단단한 컨트리 브레드와 잘 익은 토마토가 핵심입니다. 과육의 신선한 즙은 남기고 넘치는 물만 빼세요.",
    "ขนมปังชนบทเนื้อแน่นและมะเขือเทศสุกจัดสำคัญที่สุด สะเด็ดเฉพาะน้ำส่วนเกินเพื่อให้เนื้อยังฉ่ำสด"
  );
  recipe.commonMistakes[0] = ml(
    "Wet pulp or cool toast makes the bread soggy. Drain excess liquid and spread the tomato only just before serving.",
    "番茄泥太濕或吐司已冷都會讓麵包變軟；先瀝掉多餘汁液，並在上桌前才鋪番茄。",
    "水っぽい果肉や冷めたトーストはパンを湿らせます。余分な汁を切り、出す直前にトマトをのせます。",
    "물기 많은 과육이나 식은 토스트는 빵을 눅눅하게 만듭니다. 물을 빼고 내기 직전에 토마토를 올리세요.",
    "เนื้อมะเขือเทศที่เหลวหรือขนมปังที่เย็นแล้วทำให้ขนมปังแฉะ สะเด็ดน้ำส่วนเกินและวางมะเขือเทศก่อนเสิร์ฟทันที"
  );
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  return recipe;
}

function reviseWelshRarebit(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = recipe.tips.map((tip) => ({ ...tip }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
  const bodies = [
    ml(
      "Heat the grill or broiler. Toast the 8 thick bread slices 2–3 minutes per side until firm, dry, and light golden, working in batches if they do not fit in one layer. Set them on a rack so steam can escape from underneath. If they are still flexible or pale, give them another minute; avoid dark edges because they will grill again with the topping.",
      "加熱烤爐或上火烤箱。8 片厚麵包每面烤 2–3 分鐘至結實、乾爽、淡金黃；若無法單層放入，就分批烤。烤好放在網架上散出底部蒸氣。若仍軟或顏色太淡，再烤 1 分鐘；避免邊緣烤深，因為之後還要連起司醬再烤。",
      "グリルまたはブロイラーを予熱します。厚切りパン8枚を片面2〜3分ずつ、固く乾いて薄いきつね色になるまで焼きます。一段に並ばなければ数回に分けます。網に置いて底の蒸気を逃します。柔らかい、または色が薄ければ1分追加し、後で具をのせて再び焼くので縁を濃く焼きません。",
      "그릴이나 브로일러를 예열합니다. 두툼한 빵 8장을 한 겹에 놓을 수 없으면 나눠 굽고, 각 면을 2–3분씩 구워 단단하고 마른 연한 황금색이 되게 합니다. 빵 밑으로 김이 빠지도록 망에 올립니다. 아직 말랑하거나 색이 옅으면 1분 더 굽되 토핑을 올려 다시 구우므로 가장자리를 진하게 굽지 않습니다.",
      "อุ่นเตาย่างหรือไฟบน ปิ้งขนมปังหนา 8 แผ่นด้านละ 2–3 นาทีจนแน่น แห้ง และเหลืองทองอ่อน หากวางชั้นเดียวไม่พอให้แบ่งปิ้ง วางบนตะแกรงเพื่อให้ไอน้ำออกจากด้านล่าง หากยังอ่อนหรือซีดให้เพิ่มอีก 1 นาที อย่าให้ขอบเข้มเพราะจะนำไปย่างพร้อมหน้าชีสอีกครั้ง"
    ),
    ml(
      "Melt the 30 g butter over medium-low heat. Sprinkle in the 30 g flour and whisk constantly for 2 minutes until the paste is smooth, pale biscuit-coloured, and no dry flour remains. Do not taste it while the flour is still raw. If the roux starts browning quickly, lower the heat; if it smells scorched, discard it and start this step again so the sauce will not taste bitter.",
      "30 公克奶油以中小火融化，撒入 30 公克麵粉並持續攪拌 2 分鐘，直到糊狀物平滑、呈淺餅乾色且沒有乾粉。麵粉尚未煮熟前不要試味。若麵糊很快變褐，轉小火；若聞到焦味，倒掉重做此步，避免醬汁發苦。",
      "バター30gを中弱火で溶かします。小麦粉30gを振り入れ、絶えず泡立て器で混ぜながら2分加熱します。滑らかで薄いビスケット色になり、乾いた粉が残らない状態にします。粉に火が通る前に味見しません。急に色づく場合は火を弱め、焦げ臭くなったら苦みが残るため捨てて作り直します。",
      "버터 30g을 중약불에서 녹입니다. 밀가루 30g을 넣고 2분간 계속 저어 매끄럽고 연한 비스킷색이 되며 마른 밀가루가 남지 않게 합니다. 밀가루가 익기 전에 맛보지 마세요. 빠르게 갈색이 되면 불을 낮추고, 탄 냄새가 나면 소스가 쓰지 않도록 버리고 이 단계를 다시 시작합니다.",
      "ละลายเนย 30 กรัมด้วยไฟกลางอ่อน ใส่แป้ง 30 กรัมแล้วตีตลอด 2 นาทีจนเนียน สีบิสกิตอ่อน และไม่มีแป้งแห้งเหลือ อย่าชิมขณะที่แป้งยังดิบ หากเริ่มเป็นสีน้ำตาลเร็วให้ลดไฟ หากมีกลิ่นไหม้ให้ทิ้งแล้วเริ่มขั้นตอนนี้ใหม่เพื่อไม่ให้ซอสขม"
    ),
    ml(
      "Whisk in the 180 ml ale gradually in three additions, smoothing the sauce after each pour. Simmer 3–4 minutes until glossy and thick enough to coat a spoon; draw a line through the coating with a finger and it should stay open briefly. Whisk in the mustard, Worcestershire sauce, and cayenne. If lumps form, take the pan off the heat and whisk briskly; if the sauce is too thick, loosen it with hot water 15 ml at a time.",
      "180 毫升黑啤分三次慢慢倒入，每次都先攪至平滑再加下一次。小火煮 3–4 分鐘至醬汁發亮、濃到能附著湯匙；手指劃過時痕跡應短暫保持。拌入芥末、伍斯特醬與卡宴辣椒。若結塊，先離火快速攪散；若太濃，每次加 15 毫升熱水調開。",
      "エール180mlを3回に分けて少しずつ加え、その都度なめらかになるまで混ぜます。3〜4分煮て艶が出て、スプーンを覆う濃さにします。指で線を引くと短時間残る程度が目安です。マスタード、ウスターソース、カイエンを混ぜます。だまができたら火から外して手早く泡立て、濃すぎる場合は熱湯を15mlずつ加えてのばします。",
      "에일 180ml를 세 번에 나눠 조금씩 넣고 매번 매끄럽게 푼 뒤 다음 양을 넣습니다. 3–4분 끓여 윤기가 나고 숟가락에 묻을 만큼 걸쭉하게 합니다. 손가락으로 선을 그었을 때 잠시 남아야 합니다. 머스터드, 우스터소스, 카이엔을 섞습니다. 덩어리가 생기면 불에서 내려 빠르게 풀고, 너무 되직하면 뜨거운 물을 15ml씩 넣어 농도를 맞춥니다.",
      "ค่อย ๆ เติมเอล 180 มล. แบ่งสามครั้ง คนให้เนียนทุกครั้งก่อนเติมครั้งต่อไป เคี่ยว 3–4 นาทีจนเงาและข้นพอเคลือบช้อน เมื่อลากนิ้วผ่านเคลือบควรเห็นรอยอยู่ชั่วครู่ ใส่มัสตาร์ด ซอสวูสเตอร์ และพริกคาเยน หากจับตัวเป็นก้อนให้ยกลงจากเตาแล้วตีเร็ว ๆ หากข้นเกินให้เติมน้ำร้อนครั้งละ 15 มล."
    ),
    ml(
      "Lower the heat to very low and add the 400 g grated cheese in three handfuls, stirring until each addition is mostly melted before adding the next. Remove the pan from the heat as soon as the sauce is smooth and glossy; do not let it boil, or the cheese can turn oily and grainy. Taste with a clean spoon and add only as much of the listed 2 g salt as needed. If oil beads appear, take it off the heat and whisk in a spoonful of warm water until it comes together.",
      "轉至極小火，將 400 公克刨絲起司分三把加入；每次先攪至大致融化再加下一把。醬汁平滑發亮後立即離火，不要煮滾，否則起司可能出油、變粗。用乾淨湯匙試味，再視需要加入材料所列最多 2 公克鹽。若表面浮油珠，離火後加一匙溫水攪至重新融合。",
      "弱火に落とし、削ったチーズ400gを3回に分けて加えます。各回ほぼ溶けてから次を加えます。ソースが滑らかで艶が出たらすぐ火から外します。沸騰させると油が分離してざらつきます。清潔なスプーンで味見し、材料にある塩2gは必要な分だけ加えます。油の粒が浮いたら火から外し、ぬるま湯をスプーン1杯混ぜてなじませます。",
      "불을 아주 약하게 낮추고 간 치즈 400g을 세 번에 나눠 넣습니다. 각 양이 대부분 녹은 뒤 다음을 넣습니다. 소스가 매끄럽고 윤기 나면 바로 불에서 내립니다. 끓이면 치즈 기름이 분리되어 거칠어질 수 있습니다. 깨끗한 숟가락으로 맛본 뒤 필요한 만큼만 재료에 적힌 소금 최대 2g을 넣습니다. 기름방울이 보이면 불에서 내려 미지근한 물 한 숟가락을 넣고 다시 유화되도록 젓습니다.",
      "ลดไฟให้อ่อนมาก ใส่ชีสขูด 400 กรัมทีละหนึ่งในสาม คนจนเกือบละลายก่อนใส่ส่วนถัดไป ยกลงจากเตาทันทีเมื่อซอสเนียนและเงา อย่าปล่อยให้เดือดเพราะชีสอาจแยกมันและเป็นเม็ด ชิมด้วยช้อนสะอาดแล้วเติมเกลือที่ระบุไว้ไม่เกิน 2 กรัมเท่าที่จำเป็น หากมีหยดน้ำมันลอยให้ยกลงจากเตา เติมน้ำอุ่นหนึ่งช้อนแล้วคนให้กลับมาเข้ากัน"
    ),
    ml(
      "Spread the hot cheese mixture thickly over all 8 toasts, right to the edges. Grill 2–4 minutes with the tray near the heat, watching continuously, until the topping bubbles and has deep golden-brown blisters. The bubbling and colour are appearance cues, not a separate safe-minimum temperature for this fresh cheese-on-toast dish. If the edges darken before the centre blisters, lower the rack and continue in 30-second checks. Serve at once, with a few extra drops of Worcestershire sauce if desired.",
      "趁熱將起司醬厚厚塗滿 8 片吐司直到邊緣。烤盤靠近熱源烤 2–4 分鐘，全程看著，直到表面冒泡並出現深金褐色斑點。起泡與上色是外觀線索，並非這道現做起司吐司另有的安全最低溫度。若邊緣先變深、中心尚未起泡，將烤架下移並每 30 秒檢查。可依喜好滴幾滴伍斯特醬，立即上桌。",
      "熱いチーズソースをトースト8枚の端まで厚く塗ります。熱源に近い位置で2〜4分、目を離さず焼き、表面が泡立って濃いきつね色の斑点が出たら取り出します。泡立ちと色は見た目の目安で、この作りたてのチーズトーストに別個の安全最低温度を示すものではありません。端だけ先に濃くなり中心が泡立たなければ、ラックを下げて30秒ずつ確認します。好みでウスターソースを少量たらし、すぐに出します。",
      "뜨거운 치즈 소스를 토스트 8장 가장자리까지 두껍게 펴 바릅니다. 열원 가까이에서 2–4분 굽되 계속 지켜보며 윗면에 거품이 나고 진한 황금갈색 반점이 생기면 꺼냅니다. 거품과 색은 외관 기준이며 갓 만든 치즈 토스트의 별도 안전 최소 온도가 아닙니다. 가장자리만 먼저 어두워지고 가운데가 끓지 않으면 선반을 내리고 30초씩 확인합니다. 원하면 우스터소스를 몇 방울 더해 즉시 냅니다.",
      "ปาดซอสชีสร้อนหนา ๆ ให้ทั่วขนมปังทั้ง 8 แผ่นจนถึงขอบ ย่างบนชั้นใกล้ไฟ 2–4 นาทีและเฝ้าดูตลอด จนหน้าเกิดฟองและมีจุดสีน้ำตาลทองเข้ม ฟองและสีเป็นเกณฑ์ด้านรูปลักษณ์ ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัยเฉพาะของชีสโทสต์ทำใหม่ หากขอบเข้มก่อนกลางจะพอง ให้ลดชั้นวางและตรวจทุก 30 วินาที เสิร์ฟทันที จะหยดซอสวูสเตอร์เพิ่มเล็กน้อยก็ได้"
    )
  ];
  recipe.instructions = recipe.instructions.map((step, index) => ({ ...step, body: bodies[index] }));
  recipe.storage = ml(
    "Cool leftovers in shallow portions and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder. Use within 3 days for best quality. Reheat leftovers to 74°C/165°F throughout. For a fresh serving, bubbling cheese and golden blisters are appearance cues; they are not the leftover safety minimum.",
    "剩食分裝淺盒，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下；為最佳品質請於 3 天內食用。剩食各處回熱至 74°C／165°F。現做時，起司起泡和金褐色斑點是外觀線索，不是剩食安全最低溫度。",
    "残りは浅い容器に小分けし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質のため3日以内に食べます。残りは全体を74°C/165°Fまで再加熱します。作りたてはチーズの泡立ちと焼き色が見た目の目安で、残り物の安全最低温度とは別です。",
    "남은 음식은 얕은 용기에 나눠 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 3일 안에 먹습니다. 남은 음식은 전체를 74°C/165°F까지 재가열합니다. 갓 구울 때 치즈 거품과 갈색 반점은 외관 기준이며 남은 음식의 안전 최소 온도와 다릅니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้นและแช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นอาหารเหลือให้ทั่วถึง 74°C/165°F สำหรับจานทำใหม่ ฟองชีสและจุดสีน้ำตาลเป็นเกณฑ์ด้านรูปลักษณ์ ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัยของอาหารเหลือ"
  );
  recipe.tips[0] = ml(
    "Toast the bread first and let it vent on a rack; a dry base stays crisp under the warm cheese topping.",
    "先烤麵包並放網架散熱；乾燥的底部才能在熱起司醬下保持酥脆。",
    "先にパンを焼き、網で蒸気を逃します。底が乾いていると温かいチーズの下でもサクッとします。",
    "빵을 먼저 굽고 망에서 김을 빼세요. 밑면이 말라야 따뜻한 치즈 토핑 아래에서도 바삭함이 유지됩니다.",
    "ปิ้งขนมปังก่อนแล้วพักบนตะแกรงให้ไอน้ำระบาย ฐานที่แห้งจะกรอบอยู่ใต้หน้าชีสร้อน"
  );
  recipe.commonMistakes[0] = ml(
    "Boiling the cheese sauce can make it oily or grainy. Melt the cheese over very low heat and stop as soon as it turns smooth and glossy.",
    "起司醬煮滾會變得出油或粗糙；用極小火融化起司，一平滑發亮就停火。",
    "チーズソースを沸騰させると油っぽく、ざらつきます。ごく弱火で溶かし、滑らかで艶が出たらすぐ止めます。",
    "치즈 소스를 끓이면 기름지거나 거칠어질 수 있습니다. 아주 약한 불에서 녹이고 매끄럽고 윤기 나면 바로 멈추세요.",
    "การต้มซอสชีสทำให้มันเยิ้มหรือเป็นเม็ด ละลายชีสด้วยไฟอ่อนมากและหยุดทันทีเมื่อเนียนเงา"
  );
  addOfficialSource(recipe, "FDA: Flour Is a Raw Food and Other Safety Facts", rawFlour);
  addOfficialSource(recipe, "FoodSafety.gov: 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov: Safe Minimum Internal Temperatures", temperatures);
  return recipe;
}

export function refineEightyThirdMethods(recipes) {
  const revisions = new Map([
    ["doenjang-jjigae", reviseDoenjangJjigae],
    ["ratatouille", reviseRatatouille],
    ["pan-con-tomate", revisePanConTomate],
    ["welsh-rarebit", reviseWelshRarebit]
  ]);
  for (let index = 0; index < recipes.length; index += 1) {
    const revise = revisions.get(recipes[index].id);
    if (revise) {
      recipes[index] = revise({
        ...recipes[index],
        ingredients: recipes[index].ingredients.map((row) => ({ ...row, item: { ...row.item } })),
        storage: { ...recipes[index].storage }
      });
    }
  }
}
