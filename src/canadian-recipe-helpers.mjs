import { canadianRecipeSources } from './canadian-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  fry: {
    tips: [
      ml('Dry potatoes and fry in uncrowded batches so the oil recovers quickly and the outside stays crisp.', '馬鈴薯先擦乾並分批油炸，鍋中不要擠滿，讓油溫迅速恢復、外層保持酥脆。', 'じゃがいもの水気を拭き、詰め込まずに揚げます。油温を戻し、外側をカリッと保ちます。', '감자의 물기를 닦고 팬을 채우지 않게 나눠 튀겨 기름 온도를 회복시키고 겉을 바삭하게 하세요.', 'ซับมันฝรั่งให้แห้งและทอดเป็นชุดไม่แน่น เพื่อให้อุณหภูมิน้ำมันคืนตัวและผิวยังกรอบ'),
      ml('Keep cheese curds cool until assembly, then ladle piping-hot gravy over them just before serving.', '組裝前先讓起司凝乳保持涼爽，上桌前才淋上滾熱肉汁。', '組み立てる直前までチーズカードを冷やし、提供直前に熱々のグレービーをかけます。', '조립 직전까지 치즈 커드를 차게 두고 내기 직전에 뜨거운 그레이비를 붓습니다.', 'เก็บชีสเคิร์ดให้เย็นจนประกอบ แล้วราดเกรวีร้อนจัดก่อนเสิร์ฟ'),
    ],
    commonMistakes: [
      ml('Wet or crowded potatoes steam instead of crisping and can turn limp under the gravy.', '馬鈴薯濕或一次下太多會變成蒸熟而非酥脆，淋肉汁後更容易軟塌。', '濡れたじゃがいもや詰め込みすぎは蒸れ、グレービーをかけるとさらにしんなりします。', '감자가 젖었거나 너무 많이 넣으면 튀겨지지 않고 쪄져 그레이비를 부었을 때 흐물해집니다.', 'มันฝรั่งเปียกหรือใส่แน่นจะนึ่งแทนทอด และนิ่มเละเมื่อราดเกรวี'),
      ml('A thin gravy runs off the fries; reduce it until it lightly coats the back of a spoon.', '肉汁太稀會流到底盤；收濃至能薄薄附著湯匙背面。', '薄すぎるグレービーはポテトから流れます。スプーンの背に薄く絡むまで煮詰めます。', '그레이비가 묽으면 감자에서 흘러내립니다. 숟가락 뒷면에 얇게 묻을 정도로 졸이세요.', 'เกรวีใสจะไหลจากเฟรนช์ฟรายส์ เคี่ยวให้เคลือบหลังช้อนได้บาง ๆ'),
    ],
    substitutions: [
      ml('If fresh cheese curds are unavailable, use small torn pieces of very mild young cheddar; shredded cheese will melt too quickly and is not equivalent.', '買不到新鮮起司凝乳時，可用撕成小塊、風味很淡的年輕切達；刨絲起司會融得太快，口感不同。', '生のチーズカードがなければ、若くて穏やかなチェダーを小さくちぎって使えます。シュレッドチーズは早く溶けて別物になります。', '신선한 치즈 커드가 없으면 순한 어린 체더를 작게 찢어 쓰세요. 슈레드 치즈는 너무 빨리 녹아 식감이 다릅니다.', 'ถ้าไม่มีชีสเคิร์ดสด ใช้เชดดาร์อ่อนอายุน้อยฉีกชิ้นเล็กแทนได้ ชีสขูดละลายเร็วและไม่เหมือนกัน'),
      ml('Bake the fries in a hot oven if deep-frying is impractical; expect a drier, less traditional crust.', '不方便油炸時可用高溫烤箱烤薯條，但外皮會較乾、風味也較不傳統。', '揚げにくい場合は高温のオーブンで焼けますが、衣は乾き、伝統的な食感とは異なります。', '튀김이 어렵다면 뜨거운 오븐에 구울 수 있지만 겉이 더 건조하고 전통적인 식감과 달라집니다.', 'ถ้าทอดน้ำมันท่วมไม่สะดวก ใช้เตาอบร้อนแทนได้ แต่เปลือกจะแห้งและไม่ดั้งเดิมเท่า')
    ]
  },
  pie: {
    tips: [
      ml('Keep pastry ingredients cold and chill the dough before rolling so the crust stays flaky rather than tough.', '派皮材料保持冰涼，擀開前先冷藏麵糰，烤後才會酥而不韌。', '生地の材料を冷たく保ち、伸ばす前に冷やすと、硬くならず層のある生地になります。', '페이스트리 재료를 차게 하고 밀기 전에 반죽을 냉장해 질기지 않고 결이 생기게 하세요.', 'คงวัตถุดิบแป้งให้เย็นและแช่แป้งก่อนรีด เพื่อให้กรอบเป็นชั้นไม่เหนียว'),
      ml('Cool a cooked filling before it goes into the pastry shell; hot filling melts the butter and weakens the base.', '熟餡放涼後再裝入派皮；熱餡會融化奶油，使底部支撐力變弱。', '加熱した具は冷ましてから殻へ入れます。熱い具はバターを溶かし、底を弱くします。', '익힌 속은 식힌 뒤 파이지에 넣으세요. 뜨거운 속은 버터를 녹여 바닥을 약하게 만듭니다.', 'พักไส้ที่ปรุงแล้วให้เย็นก่อนใส่แป้ง ไส้ร้อนทำให้เนยละลายและฐานอ่อน'),
    ],
    commonMistakes: [
      ml('Overworking pastry develops gluten and makes a tough crust; stop as soon as it holds together.', '派皮揉太久會形成過多麩質而變韌；剛好能聚合就停止。', '練りすぎるとグルテンが出て硬くなります。まとまったら止めます。', '페이스트리를 과하게 치대면 글루텐이 생겨 질겨집니다. 뭉쳐지면 멈추세요.', 'นวดแป้งมากไปจะเกิดกลูเตนและเหนียว แค่พอจับตัวได้ก็หยุด'),
      ml('Filling an unchilled shell too full makes the filling bubble over and the pastry stick to the pan.', '派皮未冷卻就填太滿，餡料會溢出並黏住烤盤。', '冷えていない殻に詰めすぎると、具があふれて型に張り付きます。', '차갑지 않은 파이지를 너무 채우면 속이 넘쳐 팬에 달라붙습니다.', 'ใส่ไส้มากและไม่แช่แป้งทำให้ไส้ล้นและติดพิมพ์'),
    ],
    substitutions: [
      ml('Use a chilled all-butter pastry if lard is unavailable; texture will be a little less tender but still flaky.', '買不到豬油時可改用冰涼全奶油派皮，酥鬆度略有不同但仍可起層。', 'ラードがなければ冷たいバターだけの生地でも作れます。ほろさは少し変わりますが層は出ます。', '라드가 없으면 차가운 버터만으로도 만들 수 있습니다. 부드러움은 조금 다르지만 결은 생깁니다.', 'ถ้าไม่มีมันหมู ใช้แป้งพายเนยล้วนที่เย็นจัดได้ เนื้อจะร่วนต่างเล็กน้อยแต่ยังเป็นชั้น'),
      ml('For berries, frozen fruit can go straight into the filling; add a little more thickener if the fruit has thawed and released juice.', '莓果可直接用冷凍果實；若已解凍出汁，需略增加增稠粉。', 'ベリーは冷凍のまま具に使えます。解凍して汁が出た場合は、つなぎを少し足します。', '베리는 냉동 상태로 넣어도 됩니다. 녹아 즙이 나왔다면 전분을 조금 더하세요.', 'ใช้เบอร์รีแช่แข็งได้ทันที หากละลายแล้วมีน้ำออกให้เพิ่มสารทำให้ข้นเล็กน้อย')
    ]
  },
  bake: {
    tips: [
      ml('Measure flour by weight and mix just until a shaggy dough forms; a shorter mix keeps baked goods tender.', '麵粉用重量量測，混合至粗糙成糰即可；少攪拌能保持烘焙品柔軟。', '粉は重量で量り、ぼそぼそした生地になるまで混ぜます。混ぜすぎないと柔らかく仕上がります。', '밀가루는 무게로 재고 거친 반죽이 될 때까지만 섞으세요. 덜 섞어야 부드럽습니다.', 'ชั่งแป้งและผสมแค่จนเป็นโดหยาบ การผสมน้อยช่วยให้เนื้อนุ่ม'),
      ml('Preheat the oven fully and use colour plus a centre doneness cue rather than time alone.', '烤箱完整預熱，依上色與中心熟度判斷，不只看時間。', 'オーブンを十分に予熱し、時間だけでなく焼き色と中心の火通りで判断します。', '오븐을 충분히 예열하고 시간만 보지 말고 색과 중심 익힘을 확인하세요.', 'อุ่นเตาให้เต็มที่และดูสีรวมกับความสุกตรงกลาง ไม่ดูเวลาอย่างเดียว'),
    ],
    commonMistakes: [
      ml('Opening the oven early can collapse a delicate rise before the structure sets.', '太早開烤箱會在結構定型前讓膨發塌陷。', '早くオーブンを開けると構造が固まる前にしぼみます。', '오븐을 일찍 열면 구조가 굳기 전에 부풀음이 꺼집니다.', 'เปิดเตาเร็วเกินทำให้ขนมยุบก่อนโครงสร้างเซ็ต'),
      ml('Cutting hot baked goods can compress the crumb or make a soft centre appear raw; let them rest as directed.', '趁熱切會壓實組織，也可能讓柔軟中心看起來未熟；依指示靜置。', '熱いうちに切ると中身がつぶれたり、生焼けに見えたりします。指示通り休ませます。', '뜨거울 때 자르면 속이 눌리거나 덜 익어 보일 수 있으니 안내대로 쉬게 하세요.', 'หั่นตอนร้อนทำให้เนื้อแน่นหรือดูเหมือนไม่สุก พักตามที่ระบุ'),
    ],
    substitutions: [
      ml('Use frozen wild berries if fresh are out of season; do not thaw first, and expect a few extra minutes of baking.', '新鮮野莓非產季時可用冷凍莓果，不必先解凍，烘烤時間可能略增。', '旬でなければ冷凍ベリーを使えます。解凍せずに使い、焼き時間を少し延ばします。', '제철이 아니면 냉동 베리를 해동하지 않고 사용하세요. 굽는 시간이 약간 늘 수 있습니다.', 'นอกฤดูใช้เบอร์รีแช่แข็งได้โดยไม่ต้องละลาย และอาจเพิ่มเวลาอบเล็กน้อย'),
      ml('If a specialty regional ingredient is unavailable, choose a close-textured substitute and disclose the flavour change.', '買不到地方特色食材時，選口感相近的替代品並說明風味差異。', '地域の食材がなければ食感の近いもので代用し、風味の違いを理解します。', '지역 특산 재료가 없으면 식감이 비슷한 재료로 바꾸고 풍미 차이를 감안하세요.', 'ถ้าไม่มีวัตถุดิบประจำถิ่น ให้ใช้ของเนื้อสัมผัสใกล้กันและยอมรับว่ารสจะเปลี่ยน')
    ]
  },
  sandwich: {
    tips: [
      ml('Steam or warm the sliced meat gently, then assemble immediately so it stays moist without soaking the bread.', '肉片以蒸氣或溫和方式加熱，立刻組裝，讓肉保持濕潤又不把麵包浸軟。', '肉は蒸すかやさしく温め、パンが湿る前にすぐ組み立てます。', '고기는 부드럽게 찌거나 데운 뒤 빵이 젖기 전에 바로 조립하세요.', 'อุ่นหรืออบไอน้ำเนื้อเบา ๆ แล้วประกอบทันทีเพื่อให้ชุ่มแต่ไม่ทำขนมปังแฉะ'),
      ml('For a classic deli profile, keep the bread, mustard, meat and pickle proportions simple and balanced.', '要呈現經典熟食店風味，麵包、芥末、肉與酸黃瓜比例保持簡單均衡。', '定番デリの味にするには、パン、マスタード、肉、ピクルスのバランスをシンプルに保ちます。', '델리 스타일을 원하면 빵, 머스터드, 고기와 피클 비율을 단순하고 균형 있게 하세요.', 'เพื่อรสเดลี่คลาสสิก ให้สัดส่วนขนมปัง มัสตาร์ด เนื้อ และแตงกวาดองเรียบง่ายสมดุล'),
    ],
    commonMistakes: [
      ml('Boiling deli meat directly can make it watery and tough; heat it above steam instead.', '把熟食肉片直接水煮會變水、變韌；隔水蒸熱較合適。', 'デリミートを直接ゆでると水っぽく硬くなります。蒸気で温めます。', '델리 고기를 물에 직접 삶으면 질기고 물러집니다. 증기로 데우세요.', 'ต้มเนื้อเดลี่ในน้ำโดยตรงทำให้จืดและเหนียว ให้อุ่นเหนือไอน้ำ'),
      ml('Overfilling a soft bun makes the sandwich collapse and hides the cornmeal crust or rye flavour.', '軟麵包塞太多會塌陷，也會蓋過玉米粉外皮或黑麥麵包香氣。', '柔らかいパンに詰めすぎると崩れ、コーンミールの衣やライ麦パンの風味が隠れます。', '부드러운 번에 너무 많이 넣으면 무너지고 콘밀 코팅이나 호밀빵 풍미가 묻힙니다.', 'ใส่ไส้มากเกินทำให้ขนมปังยุบและกลบรสแป้งข้าวโพดหรือข้าวไรย์'),
    ],
    substitutions: [
      ml('Use a soft rye loaf for Montreal smoked meat; a dense dark rye can overwhelm the mild deli seasoning.', 'Montreal smoked meat 搭配柔軟黑麥麵包；太濃厚的深色黑麥會壓過肉香。', 'モントリオール風スモークミートには柔らかいライ麦パンを使います。濃い黒パンは肉の風味を覆います。', '몬트리올 스모크 미트에는 부드러운 호밀빵을 쓰세요. 너무 진한 흑빵은 고기 맛을 덮습니다.', 'ใช้ขนมปังข้าวไรย์เนื้อนุ่มกับสโมกมีตมอนทรีออล ขนมปังดำเข้มอาจกลบรสเนื้อ'),
      ml('If Montreal smoked meat is unavailable, pastrami is a workable deli substitute, but it is not identical in cure or spice profile.', '買不到 Montreal smoked meat 時可用 pastrami 熟食肉替代，但醃製與香料風味並不相同。', 'モントリオール風がなければパストラミで代用できますが、塩漬けや香辛料の風味は同じではありません。', '몬트리올 스모크 미트가 없으면 파스트라미로 대체할 수 있지만 염지와 향신료 맛은 다릅니다.', 'ถ้าไม่มีมอนทรีออลสโมกมีต ใช้พาสตรามีแทนได้ แต่การหมักและเครื่องเทศไม่เหมือนกัน')
    ]
  },
  dessert: {
    tips: [
      ml('Chill layered bars thoroughly before cutting; a warm knife wiped between cuts gives clean layers.', '分層甜點充分冷藏再切；刀稍微加熱並每切一刀擦乾淨，切面會整齊。', '層状菓子は十分に冷やしてから切ります。温めた包丁を切るたびに拭くと断面がきれいです。', '층 디저트는 충분히 냉장한 뒤 자르세요. 칼을 살짝 데우고 매번 닦으면 단면이 깔끔합니다.', 'แช่ขนมเป็นชั้นให้เย็นสนิทก่อนตัด อุ่นมีดเล็กน้อยและเช็ดทุกครั้งเพื่อรอยตัดสวย'),
      ml('For taffy, prepare the packed snow or crushed ice before heating syrup; the hot syrup sets quickly on contact.', '楓糖太妃糖要先準備壓實的雪或碎冰再煮糖漿；熱糖一接觸冷面就會快速凝固。', 'メープルタフィーはシロップを加熱する前に雪や砕いた氷を準備します。熱いシロップは触れるとすぐ固まります。', '메이플 태피는 시럽을 데우기 전에 눈이나 잘게 부순 얼음을 준비하세요. 뜨거운 시럽은 닿자마자 굳습니다.', 'เตรียมหิมะอัดแน่นหรือน้ำแข็งบดก่อนอุ่นไซรัป เพราะไซรัปร้อนจะแข็งเร็วเมื่อสัมผัส'),
    ],
    commonMistakes: [
      ml('Cutting bars before the chocolate top is fully set smears the layers.', '巧克力頂層未完全凝固就切，會把層次抹亂。', 'チョコレートが固まる前に切ると層がにじみます。', '초콜릿 윗층이 완전히 굳기 전에 자르면 층이 번집니다.', 'ตัดก่อนช็อกโกแลตเซ็ตทำให้ชั้นเลอะ'),
      ml('Boiling maple syrup past the soft-ball stage can make taffy hard and brittle instead of chewy.', '楓糖漿煮過軟球階段，太妃糖會硬脆而非柔韌。', 'メープルシロップをソフトボール段階より煮すぎると、もちっとせず硬く割れます。', '메이플 시럽을 소프트볼 단계 이상 끓이면 쫀득하지 않고 단단하게 부서집니다.', 'เคี่ยวน้ำเชื่อมเมเปิลเกินขั้นซอฟต์บอลทำให้ทอฟฟี่แข็งกรอบแทนที่จะหนึบ'),
    ],
    substitutions: [
      ml('Use maple syrup with the specified grade or a similar pure syrup; pancake-flavoured table syrup will not set or taste the same.', '使用標示等級的純楓糖漿或相近純糖漿；鬆餅風味糖漿的凝固與風味不同。', '指定の等級または同程度の純メープルシロップを使います。パンケーキシロップでは固まり方も味も異なります。', '지정 등급 또는 비슷한 순수 메이플 시럽을 쓰세요. 팬케이크 시럽은 굳기와 맛이 다릅니다.', 'ใช้เมเปิลไซรัปแท้ตามเกรดหรือใกล้เคียง น้ำเชื่อมแพนเค้กให้การเซ็ตและรสต่างกัน'),
      ml('For butter tarts, currants, raisins or chopped pecans are optional regional and family variations; keep the base filling ratio consistent.', 'Butter tart 的葡萄乾、醋栗乾或核桃可依家庭偏好省略或替換，核心餡料比例要一致。', 'バタータルトのカレンツ、レーズン、ピーカンは家庭差で省略・変更できますが、基本のフィリング比率は保ちます。', '버터 타르트의 커런트·건포도·피칸은 가족 취향에 따라 생략하거나 바꿀 수 있지만 기본 필링 비율은 유지하세요.', 'ลูกเกดหรือพีแคนในบัตเตอร์ทาร์ตปรับตามบ้านได้ แต่คงสัดส่วนไส้พื้นฐาน')
    ]
  },
  braise: {
    tips: [
      ml('Salt meat early and keep the simmer gentle; a covered low simmer tenderizes salt beef without making the vegetables collapse.', '肉類提早調味，之後維持小火；加蓋微滾能燉嫩鹹牛肉，也不會把蔬菜煮散。', '肉に早めに塩味を含ませ、静かな煮立ちを保ちます。ふたをして弱く煮ると肉が柔らかくなり野菜も崩れません。', '고기는 미리 간하고 약하게 끓이세요. 덮어 잔잔히 익히면 소금고기는 부드러워지고 채소는 무너지지 않습니다.', 'ปรุงเนื้อล่วงหน้าและเคี่ยวเบา ๆ ปิดฝาให้เนื้อนุ่มโดยผักไม่เละ'),
      ml('Add vegetables in stages according to their density so potatoes hold their shape while cabbage becomes tender.', '依蔬菜硬度分段下鍋，讓馬鈴薯保持形狀、高麗菜煮軟。', '野菜は硬さに応じて段階的に加え、じゃがいもは形を保ち、キャベツは柔らかくします。', '채소를 단단함에 따라 순서대로 넣어 감자는 모양을 유지하고 양배추는 부드럽게 익히세요.', 'ใส่ผักตามความแข็งเป็นลำดับ ให้มันฝรั่งคงรูปและกะหล่ำสุกนุ่ม'),
    ],
    commonMistakes: [
      ml('Using salt beef without soaking or blanching can over-salt the entire pot.', '鹹牛肉不先浸泡或汆煮，可能讓整鍋過鹹。', '塩漬け牛肉を戻さず使うと、鍋全体が塩辛くなりすぎます。', '염장 소고기를 불리거나 데치지 않으면 냄비 전체가 너무 짤 수 있습니다.', 'ใช้เนื้อเค็มโดยไม่แช่หรือลวกอาจทำให้ทั้งหม้อเค็มเกิน'),
      ml('Adding potatoes too early can make them break apart during the long meat simmer.', '馬鈴薯太早下鍋，長時間燉肉時容易碎散。', 'じゃがいもを早く入れすぎると、肉を長く煮る間に崩れます。', '감자를 너무 일찍 넣으면 고기를 오래 끓이는 동안 부서집니다.', 'ใส่มันฝรั่งเร็วเกินทำให้แตกขณะเคี่ยวเนื้อนาน'),
    ],
    substitutions: [
      ml('Salt pork may replace part of the cured beef; reduce any added salt and taste the cooking liquor before serving.', '部分鹹牛肉可改用鹹豬肉；減少額外鹽，並在上桌前試湯汁鹹度。', '塩漬け牛肉の一部は塩豚で代用できます。追加の塩を減らし、提供前に煮汁を味見します。', '염장 소고기 일부는 염장 돼지고기로 바꿀 수 있습니다. 추가 소금을 줄이고 내기 전 국물 맛을 보세요.', 'ใช้หมูเค็มแทนเนื้อเค็มบางส่วนได้ ลดเกลือและชิมน้ำต้มก่อนเสิร์ฟ'),
      ml('Rutabaga can replace turnip; cut all root vegetables to similar pieces for even cooking.', 'rutabaga 可替代蕪菁；根莖蔬菜切成大小相近，熟度才均勻。', 'カブはルタバガで代用できます。根菜は同じ大きさに切って均一に火を通します。', '순무는 루타바가로 바꿀 수 있습니다. 뿌리채소 크기를 맞춰 고르게 익히세요.', 'ใช้รูตาบากาแทนหัวผักกาดได้ หั่นรากผักขนาดใกล้กันให้สุกสม่ำเสมอ')
    ]
  },
  frybread: {
    tips: [
      ml('Handle the dough gently and avoid adding excess flour; a slightly tacky dough fries tender instead of dense.', '輕柔處理麵糰，不要額外加太多麵粉；略帶黏性的麵糰炸後柔軟、不會緊實。', '生地はやさしく扱い、粉を足しすぎません。少しべたつく生地の方が揚げ上がりは柔らかです。', '반죽을 부드럽게 다루고 밀가루를 과하게 더하지 마세요. 약간 끈적한 반죽이 튀기면 부드럽습니다.', 'จับแป้งเบา ๆ อย่าเติมแป้งมาก โดที่เหนียวนิด ๆ จะทอดออกมานุ่มไม่แน่น'),
      ml('Keep the oil at a steady moderate temperature so the centre cooks before the outside darkens.', '油溫維持穩定中溫，讓中心熟透後外層才不會過深。', '油温を中程度で保ち、外が濃くなる前に中心まで火を通します。', '기름을 중간 온도로 일정하게 유지해 겉이 짙어지기 전에 속까지 익히세요.', 'คุมน้ำมันไฟกลางให้คงที่ เพื่อให้ด้านในสุกก่อนด้านนอกเข้มเกิน'),
    ],
    commonMistakes: [
      ml('Oil that is too hot browns the outside before the centre cooks; oil that is too cool makes the bread greasy.', '油太熱會外焦內生；油太冷則讓麵包吸油。', '油が熱すぎると外だけ色づき中が生になり、低すぎると油を吸います。', '기름이 너무 뜨거우면 겉만 갈색이고 속은 덜 익고, 너무 낮으면 기름집니다.', 'น้ำมันร้อนเกินทำให้ข้างนอกไหม้ก่อนกลางสุก ต่ำเกินทำให้ขนมอมน้ำมัน'),
      ml('Pressing or puncturing after the bread begins to puff can deflate the pocket and create a dense centre.', '麵包開始鼓起後再壓或戳，會洩氣並讓中心變緊實。', '膨らみ始めてから押したり刺したりすると空気が抜け、中が詰まります。', '빵이 부풀기 시작한 뒤 누르거나 찌르면 공기가 빠져 속이 조밀해집니다.', 'กดหรือเจาะหลังแป้งเริ่มพองทำให้อากาศออกและเนื้อแน่น'),
    ],
    substitutions: [
      ml('For the Métis campfire adaptation here, a cast-iron skillet on a stovetop can replace the fire; cook in batches and control heat carefully.', '本食譜呈現的 Métis 營火版本可改用爐上鑄鐵鍋；分批製作並仔細控火。', 'ここで紹介するメティスの焚き火版は、コンロの鋳鉄フライパンでも作れます。少量ずつ焼き火加減を調整します。', '여기서 소개한 메티스 캠프파이어 방식은 가스레인지의 주철 팬으로 대체할 수 있습니다. 나눠 굽고 불을 조절하세요.', 'สูตรแคมป์ไฟแบบเมติสนี้ใช้กระทะเหล็กหล่อบนเตาแทนได้ ทอดเป็นชุดและคุมไฟ'),
      ml('Flour and fat choices vary among communities and families; do not describe this single documented version as universal bannock.', '麵粉與油脂會隨社群和家庭不同；不要把這一個有紀錄的版本說成普遍唯一的 bannock。', '粉や脂はコミュニティや家庭で異なります。この記録された一つの型を普遍的なバノックとして説明しません。', '밀가루와 지방은 공동체·가정마다 다릅니다. 이 기록된 한 가지 버전을 보편적 바녹이라고 단정하지 마세요.', 'แป้งและไขมันต่างกันตามชุมชนและครอบครัว อย่าเรียกสูตรที่บันทึกนี้ว่าเป็น bannock แบบเดียวของทุกคน')
    ]
  }
};

export function makeCanadianRecipe(recipe) {
  const { profile = 'bake', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.bake;
  return {
    cuisine: 'canadian',
    region: ml('Canada', '加拿大', 'カナダ', '캐나다', 'แคนาดา'),
    sources: [...(canadianRecipeSources[recipe.id] || []), ...additionalSources],
    tips: data.tips || defaults.tips,
    commonMistakes: data.commonMistakes || defaults.commonMistakes,
    substitutions: data.substitutions || defaults.substitutions,
    ...data
  };
}

export const cookedStorage = ml(
  'Cool leftovers promptly and refrigerate within 2 hours at 0–4°C for up to 3 days. Reheat only the portion needed until piping hot throughout.',
  '剩食盡快降溫，2 小時內放入 0–4°C 冰箱，最多保存 3 天；只回熱需要的份量並加熱至中心完全熱透。',
  '残りは速やかに冷まし、2時間以内に0–4°Cで冷蔵して3日以内に食べます。必要量だけ中心まで十分に再加熱します。',
  '남은 음식은 빠르게 식혀 2시간 안에 0–4°C로 냉장하고 3일 이내 드세요. 필요한 양만 속까지 충분히 뜨겁게 데우세요.',
  'ทำให้อาหารเหลือเย็นเร็วและแช่ 0–4°C ภายใน 2 ชั่วโมง เก็บไม่เกิน 3 วัน อุ่นเฉพาะส่วนที่จะกินให้ร้อนทั่วถึง'
);
export const chilledStorage = ml(
  'Keep covered at 0–4°C and use within 4 days. Freeze well wrapped for longer storage; thaw in the refrigerator.',
  '加蓋置 0–4°C 冰箱並於 4 天內食用；需要更久則包好冷凍，並在冰箱中解凍。',
  '覆って0–4°Cで保存し4日以内に食べます。長期保存は包んで冷凍し、冷蔵庫で解凍します。',
  '덮어서 0–4°C에 보관해 4일 안에 드세요. 오래 보관할 때는 잘 싸서 냉동하고 냉장고에서 해동합니다.',
  'ปิดฝาเก็บที่ 0–4°C และกินภายใน 4 วัน หากเก็บนานให้ห่อแช่แข็งและละลายในตู้เย็น'
);
export const roomTempStorage = ml(
  'Store airtight at room temperature for up to 3 days, or refrigerate for up to 5 days. Freeze for longer storage.',
  '密封常溫保存最多 3 天，或冷藏最多 5 天；更久則冷凍。',
  '密閉して室温で3日、または冷蔵で5日まで保存します。長期保存は冷凍します。',
  '밀폐해 실온 3일 또는 냉장 5일까지 보관하고 더 오래 두려면 냉동하세요.',
  'เก็บปิดสนิทที่อุณหภูมิห้องไม่เกิน 3 วัน หรือแช่เย็นไม่เกิน 5 วัน หากนานกว่านั้นให้แช่แข็ง'
);
