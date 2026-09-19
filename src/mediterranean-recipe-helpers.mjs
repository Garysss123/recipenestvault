import { mediterraneanRecipeSources } from './mediterranean-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  seafood: {
    tips: [
      ml('Use a mix of firm and delicate seafood, adding the fragile pieces last so they stay whole.', '搭配較緊實與較細嫩的海鮮，脆弱的魚肉最後才下鍋，形狀較完整。', '身の締まった魚介と繊細な魚介を合わせ、崩れやすいものは最後に加えて形を保ちます。', '단단한 해산물과 부드러운 해산물을 섞고, 쉽게 부서지는 재료는 마지막에 넣어 모양을 지킵니다.', 'ผสมอาหารทะเลเนื้อแน่นและเนื้อนุ่ม ใส่ชนิดที่เปราะบางทีหลังเพื่อคงรูป'),
      ml('Build flavor from the vegetables and fish stock first, then poach seafood gently in the simmering broth.', '先以蔬菜與魚高湯建立底味，再將海鮮放入微滾湯汁中溫和燉熟。', '野菜と魚のだしで先に味を作り、魚介は静かに煮立つスープでやさしく火を通します。', '채소와 생선 육수로 먼저 풍미를 쌓고, 해산물은 보글거리는 국물에서 부드럽게 익힙니다.', 'สร้างรสจากผักและน้ำสต็อกปลาก่อน แล้วค่อยตุ๋นอาหารทะเลเบา ๆ ในน้ำซุปเดือดอ่อน')
    ],
    commonMistakes: [
      ml('A rolling boil can break delicate fish and make shellfish tough; keep the broth at a gentle simmer.', '大滾會弄碎細嫩魚肉，也會讓貝類變韌；讓湯汁維持小滾即可。', '激しく沸かすと繊細な魚が崩れ、貝も硬くなります。静かな煮立ちを保ちます。', '팔팔 끓이면 부드러운 생선이 부서지고 조개가 질겨질 수 있으니 약하게 끓입니다.', 'เดือดแรงทำให้ปลาเนื้อนุ่มแตกและหอยเหนียว รักษาไฟให้เดือดอ่อน'),
      ml('Adding every seafood type at the same time overcooks the small shrimp and thin fillets.', '所有海鮮同時下鍋，會讓小蝦與薄魚片過熟。', '魚介を一度に入れると、小さなえびや薄い切り身に火が入りすぎます。', '모든 해산물을 한꺼번에 넣으면 작은 새우와 얇은 생선살이 과하게 익습니다.', 'ใส่อาหารทะเลทุกชนิดพร้อมกันทำให้กุ้งตัวเล็กและปลาแผ่นบางสุกเกิน')
    ],
    substitutions: [
      ml('Choose local firm white fish, adding delicate fillets near the end of cooking.', '可選當地白肉魚；較細嫩的魚片接近起鍋時再加入。', '手に入る白身魚を使い、繊細な切り身は仕上げ近くに加えます。', '구하기 쉬운 흰살생선을 쓰고 부드러운 필렛은 조리 마지막에 넣습니다.', 'เลือกปลาเนื้อขาวในท้องถิ่น โดยใส่ชิ้นที่นุ่มใกล้จบการปรุง'),
      ml('If shellfish is unavailable, increase the fish and enrich the broth with extra fish stock.', '買不到貝類時可增加魚肉，並以更多魚高湯補足湯底。', '貝がなければ魚を増やし、魚だしを足してスープを補います。', '조개류가 없으면 생선 양을 늘리고 생선 육수를 더해 국물을 보충합니다.', 'หากไม่มีหอย เพิ่มปลาและเติมน้ำสต็อกปลาให้รสซุปเข้มขึ้น')
    ]
  },
  tart: {
    tips: [
      ml('Cook the onions slowly until they are soft and sweet before spreading them over the dough.', '洋蔥先慢慢炒至柔軟甘甜，再鋪到麵糰上。', '玉ねぎを柔らかく甘くなるまでゆっくり炒めてから生地に広げます。', '양파를 부드럽고 달게 천천히 익힌 다음 반죽 위에 펼칩니다.', 'ผัดหอมใหญ่ช้า ๆ จนนุ่มหวานก่อนเกลี่ยลงบนแป้ง'),
      ml('Dry anchovies and olives on a towel before topping so extra brine does not wet the crust.', '鋪料前以紙巾擦乾鯷魚與橄欖，避免多餘鹽水弄濕餅底。', 'トッピング前にアンチョビとオリーブの水気を拭き、生地が濡れないようにします。', '토핑 전에 멸치와 올리브 물기를 닦아 여분의 절임물이 도우를 적시지 않게 합니다.', 'ซับแอนโชวีและมะกอกก่อนวางหน้า เพื่อไม่ให้น้ำดองทำให้แป้งแฉะ')
    ],
    commonMistakes: [
      ml('Hot onion filling can soften the dough before baking; cool it until just warm first.', '熱洋蔥餡會讓麵糰入爐前就變軟；先放至微溫。', '熱い玉ねぎをのせると焼く前に生地が柔らかくなります。先に少し冷まします。', '뜨거운 양파 토핑은 굽기 전에 도우를 눅눅하게 만들 수 있으니 먼저 미지근하게 식힙니다.', 'ไส้หอมร้อนทำให้แป้งนิ่มก่อนอบ ควรพักจนเพียงอุ่นก่อน'),
      ml('Overloading the topping prevents the bread base from baking through and crisping.', '餡料鋪得太厚會妨礙底層烤熟、烤脆。', '具をのせすぎると底まで火が通らず、カリッとしません。', '토핑을 너무 많이 올리면 빵 바닥이 익고 바삭해지기 어렵습니다.', 'ใส่หน้าแน่นเกินไปทำให้ฐานขนมปังสุกและกรอบไม่ทั่ว')
    ],
    substitutions: [
      ml('If pissalat is unavailable, anchovy fillets give a similar salty depth.', '沒有 pissalat 時，可用鯷魚片帶出近似的鹹鮮風味。', 'ピサラがなければアンチョビで似た塩味とうま味を補えます。', '피살라가 없으면 멸치 필렛으로 비슷한 짠 감칠맛을 냅니다.', 'หากไม่มีพิสซาลา ใช้แอนโชวีเพิ่มรสเค็มกลมกล่อมใกล้เคียงได้'),
      ml('Use a store-bought pizza dough for convenience, while keeping the onion-ancho­vy-olive topping.', '方便時可用市售披薩麵糰，但保留洋蔥、鯷魚與橄欖的經典鋪料。', '手軽に市販のピザ生地を使っても、玉ねぎ、アンチョビ、オリーブの具は保ちます。', '간편하게 시판 피자 도우를 사용하되 양파·멸치·올리브 토핑은 유지합니다.', 'ใช้แป้งพิซซ่าสำเร็จรูปได้เพื่อความสะดวก แต่คงหน้าหอมใหญ่ แอนโชวีและมะกอกไว้')
    ]
  },
  caponata: {
    tips: [
      ml('Salt the diced eggplant briefly and pat it dry before frying so it browns instead of steaming.', '茄子丁先略撒鹽並擦乾，再下鍋煎，才會上色而不是蒸軟。', '角切りなすに軽く塩をし、拭いてから炒めると蒸れずに焼き色が付きます。', '깍둑썬 가지에 잠깐 소금을 뿌리고 물기를 닦은 뒤 볶으면 찌지 않고 노릇해집니다.', 'โรยเกลือบนมะเขือยาวหั่นเต๋าสั้น ๆ แล้วซับก่อนทอด จะได้สีน้ำตาลแทนการนึ่ง'),
      ml('Taste the agrodolce balance after the vegetables cool slightly; the sweet-sour notes become clearer at room temperature.', '蔬菜稍涼後再試 agrodolce 酸甜平衡；常溫時味道更明確。', '野菜を少し冷ましてからアグロドルチェの甘酸っぱさを味見すると、室温での味が分かりやすくなります。', '채소를 조금 식힌 뒤 아그로돌체의 새콤달콤한 균형을 보면 실온에서 맛이 더 잘 느껴집니다.', 'พักผักให้คลายร้อนก่อนชิมสมดุลอะโกรโดลเช รสหวานเปรี้ยวจะชัดขึ้นเมื่ออุณหภูมิห้อง')
    ],
    commonMistakes: [
      ml('Cooking all vegetables together from the beginning makes them release water and lose their separate textures.', '所有蔬菜一開始就一起煮會大量出水，口感也會混在一起。', '野菜を最初から全部一緒に煮ると水分が出て、それぞれの食感が失われます。', '채소를 처음부터 모두 함께 익히면 물이 생기고 각각의 식감이 사라집니다.', 'ผัดผักทุกอย่างรวมกันตั้งแต่แรกทำให้น้ำออกและเสียเนื้อสัมผัสแยกชนิด'),
      ml('Too much vinegar added at once can make the sweet-sour sauce harsh; add and taste gradually.', '醋一次加太多會讓酸味尖銳；應分次加入並試味。', '酢を一度に加えすぎると酸味が強くなります。少しずつ加えて味を見ます。', '식초를 한 번에 너무 많이 넣으면 신맛이 날카로워지므로 조금씩 넣고 맛봅니다.', 'เติมน้ำส้มสายชูมากทีเดียวทำให้เปรี้ยวแหลม ค่อย ๆ เติมและชิม')
    ],
    substitutions: [
      ml('Green olives can replace some of the capers, but reduce added salt because both are briny.', '部分酸豆可改用綠橄欖，但兩者都鹹，須減少額外鹽。', 'ケッパーの一部をグリーンオリーブに替えられますが、どちらも塩気があるので追加の塩を減らします。', '케이퍼 일부를 그린 올리브로 바꿀 수 있지만 둘 다 짭짤하니 추가 소금을 줄입니다.', 'ใช้มะกอกเขียวแทนเคเปอร์บางส่วนได้ แต่ทั้งคู่เค็มจึงลดเกลือเพิ่ม'),
      ml('Red wine vinegar can replace white wine vinegar for a rounder, deeper agrodolce.', '可用紅酒醋替代白酒醋，做出較圓潤濃厚的酸甜味。', 'より丸みのある深いアグロドルチェには、白ワイン酢の代わりに赤ワイン酢を使えます。', '더 둥글고 깊은 아그로돌체를 원하면 화이트와인 식초 대신 레드와인 식초를 씁니다.', 'ใช้น้ำส้มสายชูไวน์แดงแทนไวน์ขาวเพื่อรสหวานเปรี้ยวที่กลมและลึกขึ้น')
    ]
  },
  pasta: {
    tips: [
      ml('Reserve a ladle of fennel cooking water for the pasta; its flavor helps bind the sauce to the noodles.', '保留一勺茴香煮汁煮麵，香氣能幫助醬汁附著在麵條上。', 'フェンネルのゆで汁をお玉一杯ほど取り置いてパスタに使うと、香りがソースを麺に絡めます。', '펜넬 삶은 물을 국자 한 번 분량 남겨 파스타에 사용하면 향이 소스와 면을 잘 이어 줍니다.', 'เก็บน้ำต้มเฟนเนลไว้หนึ่งทัพพีใช้ต้มเส้น กลิ่นช่วยให้ซอสเกาะเส้น'),
      ml('Soak raisins and pine nuts while you prepare the fennel so both plump up before joining the sauce.', '準備茴香時同步浸泡葡萄乾與松子，入醬前會更飽滿。', 'フェンネルを準備する間にレーズンと松の実を戻すと、ソースに加えるときふっくらします。', '펜넬을 준비하는 동안 건포도와 잣을 불려 소스에 넣을 때 통통하게 합니다.', 'แช่ลูกเกดกับถั่วไพน์ระหว่างเตรียมเฟนเนล เพื่อให้พองก่อนใส่ซอส')
    ],
    commonMistakes: [
      ml('Overcooking fresh sardines makes them dry and breaks them into flakes; fold them through gently near the end.', '鮮沙丁魚煮太久會變乾、散成碎片；接近完成時再輕柔拌入。', '生のサーディンを煮すぎると乾いてほぐれます。仕上げ近くにやさしく混ぜます。', '생정어리를 너무 익히면 마르고 부서지므로 마무리 무렵 부드럽게 섞습니다.', 'ปรุงปลาซาร์ดีนสดนานเกินทำให้แห้งและแตกเป็นชิ้น คลุกเบา ๆ ช่วงท้าย'),
      ml('Skipping fennel leaves and cooking liquid removes the signature anise aroma from the pasta.', '省略茴香葉與煮汁，會失去這道義大利麵標誌性的茴香香氣。', 'フェンネルの葉とゆで汁を省くと、このパスタらしいアニスの香りがなくなります。', '펜넬 잎과 삶은 물을 빼면 파스타의 특징인 아니스 향이 사라집니다.', 'ไม่ใส่ใบเฟนเนลและน้ำต้มจะขาดกลิ่นหอมคล้ายโป๊ยกั๊กซึ่งเป็นเอกลักษณ์ของจานนี้')
    ],
    substitutions: [
      ml('If wild fennel is unavailable, use cultivated fennel fronds and a small pinch of fennel seed.', '買不到野茴香時，可用栽培茴香葉並加少許茴香籽。', '野生フェンネルがなければ、栽培フェンネルの葉と少量のフェンネルシードで代用します。', '야생 펜넬이 없으면 재배 펜넬 잎과 펜넬 씨 약간을 사용합니다.', 'หากไม่มีเฟนเนลป่า ใช้ใบเฟนเนลปลูกและเมล็ดเฟนเนลเล็กน้อย'),
      ml('Canned sardines are a pantry fallback; drain them and add late so they do not disintegrate.', '罐頭沙丁魚可作備用選擇；瀝乾並接近完成才加入，避免碎散。', '缶詰サーディンも使えます。水気を切り、崩れないよう仕上げ近くに加えます。', '통조림 정어리도 대체할 수 있습니다. 물기를 빼고 부서지지 않게 마무리 단계에 넣습니다.', 'ใช้ปลาซาร์ดีนกระป๋องแทนได้ สะเด็ดน้ำและใส่ช่วงท้ายเพื่อไม่ให้เละ')
    ]
  },
  stew: {
    tips: [
      ml('Build the fish stock from fish bones and aromatics, simmering long enough to extract flavor before straining.', '以魚骨與辛香蔬菜熬煮魚高湯，充分釋味後再過濾。', '魚の骨と香味野菜でだしを取り、十分に煮出してからこします。', '생선 뼈와 향채로 육수를 내고 충분히 끓여 맛을 우린 뒤 거릅니다.', 'ต้มน้ำสต็อกจากก้างปลากับผักหอมให้นานพอจนได้รสก่อนกรอง'),
      ml('Serve rouille and bread separately so each diner can stir them into the broth to taste.', 'rouille 與麵包分開上桌，讓每位食客依口味拌入湯中。', 'ルイユとパンは別に添え、食べる人が好みでスープに混ぜます。', '루이유와 빵은 따로 내어 각자 취향에 맞게 국물에 섞도록 합니다.', 'เสิร์ฟรูยกับขนมปังแยก ให้แต่ละคนผสมลงน้ำซุปตามชอบ')
    ],
    commonMistakes: [
      ml('Boiling the final seafood aggressively turns the fish tough and can break delicate fillets.', '最後加入海鮮後大滾會使魚肉變韌，也可能弄碎細嫩魚片。', '魚介を加えてから激しく沸かすと身が硬くなり、繊細な切り身も崩れます。', '해산물을 넣은 뒤 세게 끓이면 생선이 질겨지고 부드러운 살이 부서질 수 있습니다.', 'ต้มแรงหลังใส่อาหารทะเลทำให้ปลาเหนียวและเนื้อบางแตก'),
      ml('A weak stock leaves the soup thin; use plenty of fish bones and roast the aromatics until fragrant.', '高湯太淡會讓湯頭單薄；魚骨要充足，辛香蔬菜先炒至有香氣。', 'だしが薄いとスープも物足りません。魚の骨を十分に使い、香味野菜を香りが立つまで炒めます。', '육수가 약하면 수프 맛이 밋밋합니다. 생선 뼈를 충분히 쓰고 향채를 향이 날 때까지 볶습니다.', 'น้ำสต็อกอ่อนไปทำให้ซุปจืด ใช้ก้างปลาให้พอและผัดผักหอมจนมีกลิ่น')
    ],
    substitutions: [
      ml('Use firm white fish and a small mix of mussels or shrimp available locally; the exact catch varies by season.', '使用當地買得到的白肉魚，搭配少量淡菜或蝦；魚獲會依季節而異。', '手に入る白身魚に、ムール貝かえびを少し組み合わせます。魚種は季節で変わります。', '구할 수 있는 흰살생선에 홍합이나 새우를 조금 섞습니다. 어획물은 계절마다 달라집니다.', 'เลือกปลาเนื้อขาวในท้องถิ่นผสมหอยแมลงภู่หรือกุ้งเล็กน้อย ชนิดปลาขึ้นกับฤดูกาล'),
      ml('If making a weeknight version, use good prepared fish stock, but still poach the seafood gently in the finished broth.', '平日簡化版可用品質好的現成魚高湯，但海鮮仍要在完成的湯底中溫和燉熟。', '平日の簡易版なら良質な市販魚だしを使えますが、魚介は仕上がったスープでやさしく火を通します。', '평일 간편형은 좋은 시판 생선 육수를 써도 되지만 해산물은 완성된 국물에서 부드럽게 익힙니다.', 'แบบทำวันธรรมดาใช้สต็อกปลาคุณภาพดีได้ แต่อาหารทะเลควรตุ๋นเบา ๆ ในน้ำซุปที่เสร็จแล้ว')
    ]
  },
  fry: {
    tips: [
      ml('Keep the oil at a steady medium temperature; a small piece of pastry should sizzle immediately without darkening at once.', '讓油溫穩定在中溫；小片餅皮下鍋應立即起泡，但不會瞬間變深褐色。', '油を中温で安定させます。小さな生地片を入れるとすぐ泡立ちますが、すぐ濃い色にはなりません。', '기름을 중간 온도로 일정하게 유지합니다. 작은 반죽 조각을 넣으면 바로 거품이 나지만 곧바로 진한 색이 되지는 않습니다.', 'รักษาน้ำมันที่ไฟกลางให้คงที่ แป้งชิ้นเล็กควรมีฟองทันทีแต่ไม่เข้มสีอย่างรวดเร็ว'),
      ml('Seal the pastry firmly around the filling and fry only a few pieces at a time so the oil temperature recovers.', '餅皮沿餡料邊緣確實壓合，每次少量油炸，油溫較能回穩。', '具を包んだ生地の縁をしっかり閉じ、油温が戻るよう一度に少量ずつ揚げます。', '속을 감싼 반죽 가장자리를 단단히 붙이고 기름 온도가 회복되도록 조금씩 튀깁니다.', 'ปิดขอบแป้งรอบไส้ให้แน่นและทอดครั้งละไม่มากเพื่อให้อุณหภูมิน้ำมันกลับมา')
    ],
    commonMistakes: [
      ml('A wet or overfilled wrapper can split and release filling into the oil; drain the filling and leave a clear border.', '餅皮太濕或塞太滿容易破裂、漏餡；餡料先瀝乾並留出邊緣。', '生地が濡れていたり具を詰めすぎたりすると破れて油に漏れます。具の水気を切り、縁を空けます。', '반죽이 젖거나 속이 너무 많으면 터져 기름에 샐 수 있습니다. 속 물기를 빼고 가장자리를 비워 둡니다.', 'แป้งเปียกหรือใส่ไส้แน่นเกินไปอาจแตกและไส้หลุดลงน้ำมัน ซับไส้และเว้นขอบไว้'),
      ml('Oil that is too cool makes pastry greasy; oil that smokes browns the outside before the filling warms.', '油溫太低會讓餅皮吸油；冒煙的油則會讓外皮先焦、餡料還沒熱。', '油温が低すぎると生地が油っぽくなり、煙が出るほど高いと中身が温まる前に外が焦げます。', '기름이 너무 낮으면 반죽이 기름지고, 연기가 날 정도로 높으면 속이 데워지기 전에 겉이 탑니다.', 'น้ำมันเย็นไปทำให้แป้งอมน้ำมัน ส่วนที่ร้อนจนควันขึ้นจะทำให้ด้านนอกไหม้ก่อนที่ไส้จะร้อน')
    ],
    substitutions: [
      ml('Use thin spring-roll pastry if malsouka is unavailable, keeping the sheet covered so it does not dry out.', '買不到 malsouka 時可用薄春捲皮，未使用的餅皮要蓋好避免乾裂。', 'マルスーカがなければ薄い春巻きの皮を使い、乾燥しないよう使わない分は覆います。', '말수카가 없으면 얇은 춘권피를 쓰고 마르지 않도록 남은 피를 덮어 둡니다.', 'หากไม่มีแผ่นมัลซูกา ใช้แผ่นปอเปี๊ยะบางและคลุมแผ่นที่ยังไม่ใช้ไม่ให้แห้ง'),
      ml('Tuna can be omitted for a simple egg-and-caper filling; keep the egg pasteurized if serving the yolk soft.', '簡單蛋與酸豆餡可省略鮪魚；若蛋黃要保持半熟，請使用巴氏殺菌蛋。', 'ツナを省いて卵とケッパーだけの具にもできます。黄身を柔らかく仕上げる場合は殺菌済み卵を使います。', '참치를 빼고 달걀과 케이퍼만 넣을 수 있습니다. 노른자를 부드럽게 낼 때는 살균란을 씁니다.', 'ตัดทูน่าออกทำไส้ไข่กับเคเปอร์อย่างง่ายได้ หากเสิร์ฟไข่แดงนิ่มให้ใช้ไข่พาสเจอไรซ์')
    ]
  },
  soup: {
    tips: [
      ml('Cook the aromatic base until the onion is fully softened before adding liquid; this gives the broth a rounded, sweet depth.', '加入液體前先把洋蔥炒至全軟，湯底才有圓潤甜香。', '液体を加える前に玉ねぎを十分に柔らかく炒めると、丸みのある甘いだしになります。', '물을 넣기 전에 양파를 충분히 부드럽게 익히면 국물에 둥글고 달큰한 맛이 납니다.', 'ผัดหอมหัวใหญ่ให้นุ่มเต็มที่ก่อนเติมของเหลว น้ำซุปจะมีรสหวานกลมขึ้น'),
      ml('Add quick-cooking pasta or herbs near the end so they retain shape and fresh aroma.', '容易熟的麵與香草接近完成才加入，才能保持形狀與清新香氣。', '火の通りが早い麺やハーブは仕上げ近くに加え、形と香りを残します。', '빨리 익는 면이나 허브는 마무리 무렵 넣어 모양과 향을 살립니다.', 'ใส่เส้นหรือสมุนไพรที่สุกเร็วช่วงท้ายเพื่อคงรูปและกลิ่นสด'),
    ],
    commonMistakes: [
      ml('A hard boil can split lentils and reduce the broth too quickly; keep a quiet simmer and stir the bottom occasionally.', '大滾會煮散扁豆，也會讓湯汁太快收乾；維持小滾並偶爾刮拌鍋底。', '強く沸かすと豆が割れ、汁も早く煮詰まります。静かに煮立て、時々鍋底を混ぜます。', '세게 끓이면 렌틸이 으깨지고 국물이 빨리 졸아드니 잔잔하게 끓이며 가끔 바닥을 저어 줍니다.', 'เดือดแรงทำให้ถั่วเละและน้ำงวดเร็ว รักษาไฟอ่อนและคนก้นหม้อเป็นครั้งคราว'),
      ml('Adding all the lemon before tasting can make a long-simmered soup too sharp; finish with part, then adjust.', '試味前一次加完檸檬會讓久煮的湯過酸；先加部分，最後再調整。', '味見前にレモンをすべて加えると、煮込んだスープが酸っぱくなりすぎます。一部を加え、最後に調整します。', '맛보기 전에 레몬을 전부 넣으면 오래 끓인 수프가 너무 시어질 수 있으니 일부만 넣고 마무리합니다.', 'ใส่มะนาวทั้งหมดก่อนชิมอาจทำให้ซุปเคี่ยวนานเปรี้ยวเกิน เติมบางส่วนและปรับตอนท้าย'),
    ],
    substitutions: [
      ml('Canned chickpeas can replace dried chickpeas; rinse and add them after the lentils are nearly tender.', '乾鷹嘴豆可改用罐頭；沖洗後等扁豆快軟時再下鍋。', '乾燥ひよこ豆は缶詰で代用できます。洗ってレンズ豆がほぼ柔らかくなってから加えます。', '마른 병아리콩 대신 통조림을 쓰고 헹군 뒤 렌틸이 거의 익었을 때 넣습니다.', 'ใช้ถั่วลูกไก่กระป๋องแทนแบบแห้ง ล้างแล้วใส่เมื่อลูกเดือยใกล้นุ่ม'),
      ml('Use rice in place of vermicelli for a gluten-free finish, allowing extra simmer time until tender.', '需要無麩質版本時可用米取代細麵，並多煮至米粒軟熟。', 'グルテンを避ける場合は春雨の代わりに米を使い、柔らかくなるまで煮ます。', '글루텐을 피하려면 버미첼리 대신 쌀을 쓰고 부드러워질 때까지 더 끓입니다.', 'ใช้ข้าวแทนเส้นวุ้นเส้นเพื่อหลีกเลี่ยงกลูเตน และเคี่ยวเพิ่มจนข้าวนุ่ม'),
    ]
  },
  dip: {
    tips: [
      ml('Cook the eggplant until its flesh collapses easily; a few browned edges add depth without leaving raw, spongy centres.', '茄子要煮到果肉容易塌軟；略帶焦褐邊緣可增加香氣，又不會留下生硬海綿口感。', 'なすの果肉が簡単につぶれるまで火を通します。少し焼き色が付くと、生っぽいスポンジ状の中心を残さず深みが出ます。', '가지 속이 쉽게 으깨질 만큼 익힙니다. 가장자리를 조금 노릇하게 익히면 생것처럼 스펀지 같은 중심 없이 깊은 맛이 납니다.', 'ปรุงมะเขือยาวจนเนื้อยุบง่าย ขอบเกรียมเล็กน้อยเพิ่มรสลึกโดยไม่เหลือเนื้อดิบพรุน'),
      ml('Reduce the tomato moisture before mashing so the finished salad is spoonable, not watery.', '搗拌前先收乾番茄水分，成品才好舀、不會水水的。', 'つぶす前にトマトの水分を煮詰めると、水っぽくならずすくいやすく仕上がります。', '으깨기 전에 토마토 수분을 졸이면 완성품이 묽지 않고 떠먹기 좋습니다.', 'เคี่ยวน้ำจากมะเขือเทศก่อนบด สลัดที่ได้จะข้นพอตัก ไม่แฉะ'),
    ],
    commonMistakes: [
      ml('Leaving large wet eggplant pieces makes the texture uneven; chop or mash while warm, stopping before it becomes a purée.', '留下大片且含水茄子會讓口感不均；趁溫熱切碎或搗碎，但不要打成泥。', '大きくて水っぽいなすが残ると食感が不均一です。温かいうちに刻むかつぶし、ピューレになる手前で止めます。', '크고 물기 많은 가지 조각이 남으면 식감이 고르지 않습니다. 따뜻할 때 다지거나 으깨되 퓌레가 되기 전에 멈춥니다.', 'ชิ้นมะเขือยาวใหญ่และเปียกทำให้เนื้อสัมผัสไม่สม่ำเสมอ สับหรือบดตอนอุ่นแต่หยุดก่อนเป็นเนื้อเนียน'),
      ml('Adding lemon before the dip has reduced can flatten the aroma; adjust the acidity after cooking.', '沾醬還沒收濃就加檸檬會讓香氣變平；完成烹煮後再調酸度。', '煮詰める前にレモンを入れると香りが弱くなります。加熱後に酸味を整えます。', '딥을 졸이기 전에 레몬을 넣으면 향이 둔해질 수 있으니 조리 후 산미를 맞춥니다.', 'เติมเลมอนก่อนเคี่ยวข้นทำให้กลิ่นไม่สด ปรับความเปรี้ยวหลังปรุง'),
    ],
    substitutions: [
      ml('Roast whole eggplants under a hot grill if an open flame is unavailable; turn often until the skin is blistered and the centre is soft.', '沒有明火時可用高溫烤箱烤整條茄子，常翻面至表皮起泡、中心柔軟。', '直火が使えない場合は高温のグリルで丸ごとのなすを焼き、皮が膨らみ中心が柔らかくなるまで頻繁に返します。', '직화가 없으면 센 그릴에서 통가지를 굽고 껍질에 물집이 생기고 속이 부드러워질 때까지 자주 뒤집습니다.', 'หากไม่มีไฟเปิด ให้อบมะเขือยาวทั้งลูกด้วยเตาย่างร้อน พลิกบ่อยจนผิวพองและด้านในนุ่ม'),
      ml('Parsley can replace cilantro for a milder herb finish; keep the cumin and paprika for the characteristic savoury profile.', '香菜可改用巴西里，風味較溫和；孜然與紅椒粉仍保留標誌性的鹹香。', '穏やかな香りにしたい場合はパクチーをパセリに替えられます。クミンとパプリカは特徴的なうま味のため残します。', '더 순한 허브 맛을 원하면 고수를 파슬리로 바꾸되 특징적인 감칠맛을 위해 큐민과 파프리카는 유지합니다.', 'ใช้พาร์สลีย์แทนผักชีเพื่อกลิ่นสมุนไพรอ่อนลง แต่คงยี่หร่าและปาปริกาไว้ให้รสเด่น'),
    ]
  },
  stuffedEggplant: {
    tips: [
      ml('Pre-cook the eggplant until pliable, then open a shallow lengthwise pocket without cutting through the base.', '茄子先預煮至柔軟，再沿長邊劃開淺口袋，底部不要切穿。', 'なすを先に柔らかく火を通し、底を切り離さないよう縦に浅い切れ目を入れてポケットにします。', '가지를 먼저 부드럽게 익힌 뒤 밑부분은 자르지 않고 세로로 얕게 갈라 주머니를 만듭니다.', 'ปรุงมะเขือยาวให้เริ่มนิ่มก่อน แล้วกรีดตามยาวเป็นช่องตื้นโดยไม่ตัดทะลุฐาน'),
      ml('Cook the onion filling slowly until glossy and fully tender; this dish relies on soft olive-oil-rich vegetables rather than crispness.', '洋蔥餡慢煮至油亮全軟；這道菜重點是柔軟、橄欖油豐潤的蔬菜，而非脆口。', '玉ねぎの具をつやが出て完全に柔らかくなるまでゆっくり炒めます。カリッとした食感ではなく、オリーブ油を含んだ柔らかさが要点です。', '양파 속을 윤기 나고 완전히 부드러워질 때까지 천천히 익힙니다. 바삭함보다 올리브오일을 머금은 부드러운 채소가 핵심입니다.', 'เคี่ยวไส้หอมหัวใหญ่ช้า ๆ จนเงาและนุ่มทั่ว เมนูนี้เน้นผักนุ่มชุ่มน้ำมันมะกอก ไม่ใช่ความกรอบ'),
    ],
    commonMistakes: [
      ml('Overfilling the eggplant makes the pocket split during braising; mound the filling lightly and keep the seam upward.', '茄子塞太滿會在燉煮時裂開；餡料輕輕堆起並讓切口朝上。', 'なすに具を詰めすぎると煮込む間に割れます。軽く盛り、切れ目を上に向けます。', '가지를 너무 채우면 조림 중 갈라집니다. 속은 가볍게 담고 갈라진 면이 위로 오게 둡니다.', 'ยัดไส้มากเกินทำให้มะเขือแตกตอนตุ๋น ตักพูนเพียงเบา ๆ และหงายรอยกรีดขึ้น'),
      ml('A vigorous boil breaks the tender eggplant; keep the tomato braising liquid at a gentle simmer.', '大滾會把柔軟茄子煮裂；番茄燉汁維持小滾即可。', '激しく沸かすとなすが崩れます。トマトの煮汁は静かに煮立てます。', '팔팔 끓이면 부드러운 가지가 무너지므로 토마토 조림 국물을 잔잔하게 끓입니다.', 'เดือดแรงทำให้มะเขือที่นุ่มแตก รักษาน้ำตุ๋นมะเขือเทศให้เดือดอ่อน'),
    ],
    substitutions: [
      ml('Small globe eggplants work best; if only large ones are available, halve them crosswise and shorten the initial searing.', '小型圓茄最合適；若只有大型茄子，可橫切成半並縮短初煎時間。', '小さな丸なすが最適です。大きななすしかない場合は横半分に切り、最初の焼き時間を短くします。', '작은 둥근 가지가 가장 좋습니다. 큰 가지만 있으면 가로로 반 갈라 처음 굽는 시간을 줄입니다.', 'มะเขือยาวลูกกลมเล็กเหมาะที่สุด หากมีแต่ลูกใหญ่ให้ผ่าขวางครึ่งและลดเวลาจี่ตอนแรก'),
      ml('Use a covered 180°C oven instead of the stovetop for the final braise, checking that the pan stays gently bubbling.', '最後燉煮可改用加蓋 180°C 烤箱，並確認鍋中維持微微冒泡。', '最後の煮込みはふたをして180°Cのオーブンでもできます。鍋の中が静かに泡立つ状態を保ちます。', '마지막 조림은 뚜껑을 덮고 180°C 오븐에서 해도 됩니다. 팬 안이 잔잔히 끓는지 확인합니다.', 'ตุ๋นขั้นสุดท้ายในเตาอบ 180°C แบบปิดฝาได้ ตรวจให้แน่ใจว่าในภาชนะยังเดือดเบา ๆ'),
    ]
  },
  flatbread: {
    tips: [
      ml('Knead until the dough becomes supple, then rest it covered so it rolls thin without springing back.', '揉至麵糰柔軟後加蓋靜置，擀薄時才不會一直回縮。', '生地がしなやかになるまでこね、覆って休ませると、伸ばしても縮みにくくなります。', '반죽이 부드러워질 때까지 치대고 덮어 휴지하면 얇게 밀 때 되돌아오지 않습니다.', 'นวดแป้งจนนุ่มยืดหยุ่นแล้วคลุมพัก เพื่อให้รีดบางได้โดยไม่หดกลับ'),
      ml('Cook on a fully heated dry griddle, flipping when pale blisters form; brush lightly with oil only after cooking.', '乾鍋烤盤要充分預熱，表面冒淡色小泡再翻面；煎好後才薄刷油。', '油をひかない鉄板を十分に熱し、淡い斑点が出たら返します。油は焼いた後に薄く塗ります。', '기름 없는 철판을 충분히 달군 뒤 옅은 반점이 생기면 뒤집습니다. 기름은 다 구운 후 얇게 바릅니다.', 'อุ่นกระทะแห้งให้ร้อนเต็มที่ พลิกเมื่อเกิดจุดพองสีอ่อน ทาน้ำมันบาง ๆ หลังสุกแล้ว'),
    ],
    commonMistakes: [
      ml('Wet spinach makes the centre gummy; squeeze it thoroughly and keep the filling in a thin even layer.', '菠菜太濕會讓餅心黏爛；確實擠乾並把餡料鋪成薄而均勻的一層。', 'ほうれん草の水分が多いと中がべたつきます。しっかり絞り、具を薄く均一に広げます。', '시금치 물기가 많으면 속이 질척해집니다. 충분히 짜고 속을 얇고 고르게 폅니다.', 'ผักโขมน้ำมากทำให้ด้านในแฉะ บีบน้ำออกให้ดีและเกลี่ยไส้เป็นชั้นบางสม่ำเสมอ'),
      ml('A cold pan cooks the bread slowly and dries it before browning; preheat until a drop of water skitters.', '鍋不夠熱會讓餅慢慢乾掉卻不上色；先預熱至水滴落下會滑動。', 'フライパンが冷たいと焼き色が付く前に乾きます。水滴が走る程度まで予熱します。', '팬이 차가우면 갈색이 나기 전에 빵이 마릅니다. 물방울이 튈 정도로 예열합니다.', 'กระทะเย็นทำให้ขนมปังแห้งก่อนเป็นสีน้ำตาล อุ่นจนหยดน้ำกลิ้งบนผิว'),
    ],
    substitutions: [
      ml('Use a mix of feta and mozzarella if beyaz peynir is unavailable; drain the cheese and keep the filling modest.', '買不到 beyaz peynir 時可混合 feta 與 mozzarella；先瀝乾乳酪，餡料也不要太多。', 'ベヤズ・ペイニルがなければフェタとモッツァレラを混ぜ、チーズの水気を切って具を控えめにします。', '베야즈 페이니르가 없으면 페타와 모차렐라를 섞고 치즈 물기를 뺀 뒤 속을 적당히 넣습니다.', 'หากไม่มีเบยาซ์เพย์นิร์ ใช้เฟตากับมอสซาเรลลาผสมกัน สะเด็ดน้ำชีสและใส่ไส้ไม่มาก'),
      ml('A mild chard or finely chopped kale can replace spinach; briefly wilt and squeeze dry first.', '菠菜可改用味道溫和的瑞士甜菜或切細羽衣甘藍；先略燙軟並擠乾。', 'ほうれん草は風味の穏やかなフダンソウや細かく刻んだケールで代用でき、軽くしんなりさせて水気を絞ります。', '시금치는 향이 순한 근대나 잘게 썬 케일로 바꿀 수 있으며 먼저 살짝 숨을 죽여 물기를 짭니다.', 'ใช้ชาร์ดรสอ่อนหรือเคลสับแทนผักโขมได้ ลวกให้สลดเล็กน้อยแล้วบีบน้ำออก'),
    ]
  },
  cheese: {
    tips: [
      ml('Pat the halloumi completely dry and heat the pan before adding it; dry surfaces brown faster and release less whey.', '哈魯米起鍋前擦乾並先熱鍋；乾燥表面較快上色，也較不會釋出乳清。', 'ハルーミの水気を拭き取り、フライパンを熱してから焼きます。表面が乾いていると色づきやすく、乳清も出にくくなります。', '할루미를 완전히 닦고 팬을 달군 뒤 올립니다. 표면이 마르면 더 빨리 노릇해지고 유청도 덜 나옵니다.', 'ซับฮัลลูมีให้แห้งและอุ่นกระทะก่อนใส่ ผิวแห้งจะเกรียมเร็วและปล่อยเวย์น้อยกว่า'),
      ml('Serve immediately with lemon so the crust stays browned and the centre remains pleasantly springy.', '趁熱搭配檸檬上桌，才能保留焦香表面與彈嫩中心。', '焼き色の付いた表面と弾力のある中心を保つため、レモンを添えてすぐに供します。', '겉의 갈색 크러스트와 속의 쫄깃함을 살리려면 레몬과 함께 바로 냅니다.', 'เสิร์ฟทันทีพร้อมเลมอนเพื่อคงผิวเกรียมและเนื้อด้านในที่เด้งนุ่ม'),
    ],
    commonMistakes: [
      ml('Moving the slices too soon tears the browned crust; let the first side release naturally before turning.', '太早移動起司片會撕破焦脆表面；等第一面自然離鍋再翻。', '早く動かすと焼き目が剥がれます。最初の面が自然にはがれるまで待ってから返します。', '너무 일찍 움직이면 갈색 껍질이 찢어집니다. 첫 면이 자연스럽게 떨어질 때까지 기다렸다 뒤집습니다.', 'พลิกเร็วเกินไปทำให้ผิวเกรียมฉีก รอให้ด้านแรกคลายจากกระทะเองก่อนพลิก'),
      ml('Very thin slices can turn rubbery; cut even pieces thick enough to keep a soft centre.', '切得太薄會變得橡皮口感；切成厚薄一致且中心仍柔軟的片。', '薄すぎるとゴムのような食感になります。中心が柔らかく残る厚さに均等に切ります。', '너무 얇으면 고무처럼 질겨집니다. 속이 부드럽게 남도록 일정한 두께로 자릅니다.', 'หั่นบางเกินทำให้เหนียวเหมือนยาง หั่นชิ้นหนาเท่ากันให้ด้านในยังนุ่ม'),
    ],
    substitutions: [
      ml('If halloumi is unavailable, use a firm grilling cheese that holds its shape when heated; check salt before seasoning.', '買不到哈魯米時可用加熱後仍能定型的燒烤起司；調味前先試鹹度。', 'ハルーミがなければ、加熱しても形を保つ焼き用チーズを使います。味付け前に塩分を確認します。', '할루미가 없으면 가열해도 모양을 유지하는 구이용 치즈를 쓰고 간하기 전에 짠맛을 확인합니다.', 'หากไม่มีฮัลลูมี ใช้ชีสสำหรับย่างที่คงรูปเมื่อร้อน ชิมความเค็มก่อนปรุง'),
      ml('A cast-iron grill pan gives grill marks; a flat heavy skillet works just as well for even browning.', '鑄鐵烤盤可烙出紋路；厚底平底鍋也能均勻上色。', '鋳鉄のグリルパンなら焼き目が付きますが、厚手の平鍋でも均一に焼けます。', '주철 그릴팬은 줄무늬를 내고, 두꺼운 평팬은 고르게 노릇하게 굽습니다.', 'กระทะย่างเหล็กหล่อทำรอยย่างได้ ส่วนกระทะก้นหนาแบนก็ทำให้เหลืองทั่วได้'),
    ]
  },
  risotto: {
    tips: [
      ml('Keep warm stock beside the pan and add it in small ladles; the rice should simmer gently rather than sit under a deep boil.', '將熱高湯放在鍋旁，以小勺分次加入；米粒應輕柔翻滾，不要被大滾湯汁淹沒。', '温かいだしをそばに置き、お玉で少しずつ加えます。米は静かに煮立たせ、激しく沸かしません。', '따뜻한 육수를 팬 옆에 두고 국자로 조금씩 넣습니다. 쌀은 잔잔하게 끓여야 하며 세게 끓이지 않습니다.', 'วางน้ำสต็อกร้อนไว้ข้างกระทะและเติมทีละทัพพี ข้าวควรเดือดเบา ๆ ไม่ใช่เดือดพล่าน'),
      ml('Stir often enough to keep rice from catching, while leaving brief pauses so it can absorb the liquid and release starch.', '時常攪拌避免黏底，但也要稍停讓米吸收液體並釋出澱粉。', '米が焦げ付かない程度に混ぜつつ、液体を吸いでんぷんが出るよう少し間を置きます。', '쌀이 눌지 않게 자주 저으면서도 액체를 흡수하고 전분을 내도록 잠깐씩 멈춥니다.', 'คนบ่อยพอไม่ให้ข้าวติดก้น แต่เว้นจังหวะให้ดูดซึมน้ำและปล่อยแป้ง'),
    ],
    commonMistakes: [
      ml('Adding cold stock stalls the simmer and can cook the rice unevenly; keep the next ladle warm.', '加入冷高湯會中斷小滾、讓米粒受熱不均；下一勺高湯要保持溫熱。', '冷たいだしを加えると煮立ちが止まり、米に均一に火が通りません。次の一杯も温めておきます。', '찬 육수를 넣으면 끓는 상태가 멈춰 쌀이 고르게 익지 않습니다. 다음 육수도 따뜻하게 유지합니다.', 'เติมน้ำสต็อกเย็นทำให้การเคี่ยวหยุดและข้าวสุกไม่สม่ำเสมอ ควรรักษาทัพพีถัดไปให้อุ่น'),
      ml('Adding all the stock at once produces boiled rice instead of a creamy risotto; let each addition absorb before the next.', '一次倒入全部高湯會變成水煮飯而非濃滑燉飯；每次先讓米吸收再加下一次。', 'だしを一度に全部加えるとクリーミーなリゾットではなく炊き込みご飯になります。一度に加えた分を吸わせてから次を加えます。', '육수를 한꺼번에 넣으면 크리미한 리소토 대신 밥처럼 됩니다. 한 번 넣은 양이 흡수된 뒤 다음을 더합니다.', 'เทน้ำสต็อกทั้งหมดทีเดียวจะได้ข้าวต้มแทนริซอตโตเนียนข้น รอให้ซึมก่อนเติมรอบถัดไป'),
    ],
    substitutions: [
      ml('If cuttlefish is unavailable, use cleaned squid and add a little bottled cuttlefish ink for the dark colour.', '買不到墨魚時可用清理好的魷魚，並加少量瓶裝墨魚汁上色。', 'コウイカがなければ下処理済みのイカと少量の市販イカ墨で色を補います。', '갑오징어가 없으면 손질한 오징어와 병에 든 오징어 먹물을 조금 써 색을 냅니다.', 'หากไม่มีหมึกกระดอง ใช้ปลาหมึกที่ทำความสะอาดแล้วและเติมหมึกบรรจุขวดเล็กน้อย'),
      ml('Arborio rice is an accessible substitute for short-grain Croatian varieties; add stock gradually and stop while the centre is gently firm.', '買不到克羅埃西亞短米時可用 Arborio 米；高湯分次加入，米心保留微韌時停火。', 'クロアチアの短粒米がなければアルボリオ米を使えます。だしを少しずつ加え、芯に軽い歯ごたえが残るところで止めます。', '크로아티아 단립종 쌀이 없으면 아르보리오 쌀을 쓰고 육수를 조금씩 넣어 속에 약간 탄력이 남을 때 멈춥니다.', 'ใช้ข้าวอาร์โบริโอแทนข้าวเมล็ดสั้นโครเอเชียได้ เติมน้ำสต็อกทีละน้อยและหยุดเมื่อใจกลางยังแน่นเล็กน้อย'),
    ]
  },
  braise: {
    tips: [
      ml('Brown the rabbit in batches with space between pieces; a crowded pan steams the meat and weakens the sauce.', '兔肉分批煎上色且彼此留空；擠滿鍋會讓肉出水，醬汁風味也較弱。', 'うさぎ肉は間隔を空けて数回に分けて焼きます。鍋が混むと蒸れてソースの風味も弱くなります。', '토끼고기는 간격을 두고 나누어 갈색으로 굽습니다. 팬이 붐비면 고기가 찌듯 익어 소스 맛이 약해집니다.', 'จี่เนื้อกระต่ายเป็นรอบโดยเว้นช่อง หากแน่นกระทะจะนึ่งเนื้อและทำให้ซอสไม่เข้ม'),
      ml('Braise at a quiet simmer with the lid slightly ajar; turn pieces once so they cook evenly in the wine and tomato.', '鍋蓋留縫小火燉煮；中途翻動一次，讓兔肉在酒與番茄中均勻受熱。', 'ふたを少しずらし、静かに煮込みます。途中で一度返し、ワインとトマトで均一に火を通します。', '뚜껑을 살짝 열고 잔잔하게 조립니다. 중간에 한 번 뒤집어 와인과 토마토에 고르게 익힙니다.', 'ตุ๋นไฟอ่อนโดยแง้มฝาเล็กน้อย พลิกชิ้นเนื้อหนึ่งครั้งให้สุกทั่วในไวน์และมะเขือเทศ'),
    ],
    commonMistakes: [
      ml('A rolling boil tightens lean rabbit before it becomes tender; lower the heat and extend the covered braise instead.', '大滾會讓瘦兔肉在軟嫩前先緊縮；應降低火力並延長加蓋燉煮。', '強く沸かすとうさぎ肉が柔らかくなる前に締まります。火を弱め、ふたをして長めに煮込みます。', '팔팔 끓이면 토끼고기가 부드러워지기 전에 조여 듭니다. 불을 낮추고 덮어 더 오래 익힙니다.', 'เดือดแรงทำให้เนื้อกระต่ายหดก่อนนุ่ม ลดไฟและตุ๋นแบบปิดฝาให้นานขึ้น'),
      ml('Adding peas too early makes them dull and mushy; fold them in near the end of cooking.', '豌豆太早加入會變暗、變爛；接近完成時再拌入。', '豆を早く加えると色がくすみ、柔らかくなりすぎます。仕上げ近くで加えます。', '완두콩을 일찍 넣으면 색이 탁해지고 물러지니 조리 끝 무렵에 넣습니다.', 'ใส่ถั่วลันเตาเร็วเกินไปทำให้สีหม่นและเละ ควรใส่ช่วงท้ายของการปรุง'),
    ],
    substitutions: [
      ml('Chicken thighs can replace rabbit; shorten the braise and check the thickest piece reaches 74°C.', '兔肉可改用雞腿；縮短燉煮時間，並確認最厚處達 74°C。', 'うさぎ肉は鶏もも肉で代用できます。煮込み時間を短くし、最も厚い部分が74°Cに達したことを確認します。', '토끼고기는 닭다리살로 바꿀 수 있습니다. 조림 시간을 줄이고 가장 두꺼운 부분이 74°C에 도달하는지 확인합니다.', 'ใช้สะโพกไก่แทนกระต่ายได้ ลดเวลาตุ๋นและตรวจส่วนที่หนาที่สุดให้ถึง 74°C'),
      ml('A dry white wine may replace red wine for a lighter version; use an unsalted stock if you omit wine.', '想要較清爽版本可用白酒取代紅酒；若不加酒，請用無鹽高湯補液體。', '軽い仕上がりには赤ワインの代わりに白ワインを使えます。ワインを省く場合は無塩のだしを使います。', '가벼운 맛에는 레드와인 대신 화이트와인을 쓰고 와인을 빼면 무염 육수로 보충합니다.', 'ใช้ไวน์ขาวแทนไวน์แดงเพื่อรสเบาลง หากไม่ใส่ไวน์ให้ใช้น้ำสต็อกไม่เค็มแทน'),
    ]
  }
};

export const cookedStorage = ml(
  'Cool promptly and refrigerate within 2 hours at 0–4°C; use within 3 days and reheat until steaming throughout.',
  '盡快放涼，2 小時內以 0–4°C 冷藏；3 天內食用，回熱至全份冒熱氣。',
  '速やかに冷まし、2時間以内に0–4°Cで冷蔵します。3日以内に食べ、全体が湯気立つまで再加熱します。',
  '빠르게 식혀 2시간 안에 0–4°C로 냉장하세요. 3일 안에 먹고 전체에서 김이 날 때까지 재가열합니다.',
  'ทำให้เย็นเร็วและแช่ที่ 0–4°C ภายใน 2 ชั่วโมง กินภายใน 3 วันและอุ่นให้ร้อนมีไอทั่วถึง'
);
export const chilledStorage = ml(
  'Keep covered at 0–4°C and use within 4 days. Freeze airtight for longer storage and thaw in the refrigerator.',
  '加蓋以 0–4°C 冷藏並於 4 天內食用；久放請密封冷凍，再放冰箱解凍。',
  '覆って0–4°Cで冷蔵し、4日以内に食べます。長期保存は密閉冷凍し、冷蔵庫で解凍します。',
  '덮어서 0–4°C에 보관하고 4일 안에 먹습니다. 더 오래 보관하려면 밀폐 냉동하고 냉장고에서 해동합니다.',
  'ปิดฝาแช่ที่ 0–4°C และกินภายใน 4 วัน หากเก็บนานให้แช่แข็งแบบปิดสนิทแล้วละลายในตู้เย็น'
);
export const roomTempStorage = ml(
  'Keep covered in a cool dry place and use the same day; refrigerate leftovers in a sealed container.',
  '加蓋置於陰涼乾燥處並於當天食用；剩餘部分密封冷藏。',
  '涼しく乾いた場所で覆って保管し、当日中に食べます。残りは密閉して冷蔵します。',
  '덮어 서늘하고 건조한 곳에 두고 당일 먹습니다. 남은 것은 밀폐해 냉장합니다.',
  'ปิดฝาเก็บในที่เย็นแห้งและกินในวันเดียวกัน แช่เย็นส่วนที่เหลือในภาชนะปิดสนิท'
);

export function makeMediterraneanRecipe(recipe) {
  const { profile = 'seafood', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.seafood;
  return {
    cuisine: 'mediterranean',
    region: ml('Mediterranean basin (see dish-specific context)', '地中海沿岸（詳見各菜色的具體脈絡）', '地中海沿岸（料理ごとの地域背景を参照）', '지중해 연안(요리별 지역 맥락 참조)', 'แถบเมดิเตอร์เรเนียน (ดูบริบทเฉพาะเมนู)'),
    sources: [...(mediterraneanRecipeSources[recipe.id] || []), ...additionalSources],
    tips: data.tips || defaults.tips,
    commonMistakes: data.commonMistakes || defaults.commonMistakes,
    substitutions: data.substitutions || defaults.substitutions,
    ...data
  };
}
