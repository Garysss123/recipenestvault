import { germanRecipeSources } from './german-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const profiles = {
  braise: {
    tips: [
      ml('Brown meat in uncrowded batches so the pan stays hot enough to build a dark fond before any liquid is added.', '肉類分批煎香，避免鍋面過度擁擠；加入液體前先建立深色鍋底焦香。', '肉は詰め込まず数回に分けて焼き、液体を加える前に濃い焼き付きを作ります。', '고기는 팬을 빽빽하게 채우지 말고 나눠 갈색 내어 액체를 붓기 전에 진한 퐁을 만드세요.', 'จี่เนื้อเป็นรอบ ๆ อย่าแน่นกระทะ เพื่อให้เกิดคราบสีน้ำตาลเข้มก่อนเติมของเหลว'),
      ml('Keep the braise at a gentle simmer; hard boiling tightens meat fibres and can reduce the sauce before the meat becomes tender.', '燉煮維持溫和小滾；猛烈沸騰會讓肉纖維收緊，也可能在肉變軟前就把醬汁收得過頭。', '煮込みは穏やかな沸き方を保ちます。強い沸騰は肉を締め、柔らかくなる前にソースを煮詰めすぎます。', '브레이즈는 약하게 끓이세요. 세게 끓이면 고기가 질겨지고 부드러워지기 전에 소스가 지나치게 졸 수 있습니다.', 'เคี่ยวเบา ๆ เพราะเดือดแรงทำให้เส้นใยเนื้อหดและซอสอาจงวดก่อนเนื้อนุ่ม')
    ],
    commonMistakes: [
      ml('Skipping the final sauce reduction leaves a thin gravy that cannot cling to the meat.', '省略最後收汁會讓肉汁過稀，無法附著在肉上。', '最後の煮詰めを省くとソースが薄く、肉に絡みません。', '마지막 소스 졸이기를 생략하면 묽어서 고기에 잘 붙지 않습니다.', 'ข้ามการเคี่ยวซอสช่วงท้ายจะทำให้น้ำราดเหลวและไม่เกาะเนื้อ'),
      ml('Cutting a long-braised roast immediately can squeeze out moisture; give it a short rest before slicing.', '長時間燉好的大塊肉若立刻切片會流失肉汁；先短暫靜置再切。', '長く煮込んだ塊肉をすぐ切ると肉汁が流れるので、少し休ませてから切ります。', '오래 브레이즈한 고기를 바로 썰면 육즙이 빠지므로 잠시 휴지시킨 뒤 써세요.', 'หั่นเนื้อที่เคี่ยวนานทันทีทำให้น้ำไหลออก ควรพักสั้น ๆ ก่อนหั่น')
    ],
    substitutions: [
      ml('Use unsalted beef stock when wine or part of the braising liquid must be replaced, then correct acidity and salt at the end.', '需要替換葡萄酒或部分燉煮液時，用無鹽牛高湯，最後再校正酸度與鹹度。', 'ワインや煮汁の一部を替える場合は無塩ビーフストックを使い、最後に酸味と塩味を調整します。', '와인이나 브레이징 액체 일부를 바꿀 때는 무염 소고기 육수를 쓰고 마지막에 산미와 염도를 맞추세요.', 'ถ้าต้องแทนไวน์หรือของเหลวบางส่วน ใช้สต๊อกเนื้อไม่เค็มแล้วปรับความเปรี้ยวและเค็มท้ายสุด'),
      ml('A similarly collagen-rich beef cut can replace the specified braising cut; keep the pieces comparable in thickness and cook to tenderness.', '指定燉肉部位可換成膠原較多的相近牛肉部位；厚度維持接近並以軟嫩程度判斷完成。', '指定部位はコラーゲンの多い同様の牛肉に替えられます。厚みをそろえ、時間ではなく柔らかさで判断します。', '비슷하게 콜라겐이 많은 소고기 부위로 바꿀 수 있으며 두께를 맞추고 부드러움으로 익힘을 판단하세요.', 'ใช้เนื้อวัวส่วนที่มีคอลลาเจนใกล้เคียงแทนได้ รักษาความหนาใกล้กันและดูความนุ่มเป็นหลัก')
    ]
  },
  roast: {
    tips: [
      ml('Dry exposed skin thoroughly before roasting; surface moisture is the main enemy of crisp crackling.', '烘烤前把外露豬皮徹底擦乾；表面水分是脆皮最大的敵人。', '焼く前に皮を完全に乾かします。表面の水分はパリパリの皮の最大の敵です。', '굽기 전에 껍질 표면을 완전히 말리세요. 수분은 바삭한 크랙링의 가장 큰 적입니다.', 'ซับหนังให้แห้งสนิทก่อนอบ เพราะความชื้นคือศัตรูหลักของหนังกรอบ'),
      ml('Rest a roast before carving and reduce the pan liquid separately so the meat stays juicy while the gravy concentrates.', '烤肉切片前先靜置，烤盤肉汁另外收濃；這樣肉保持多汁，醬汁也能集中風味。', '切る前に肉を休ませ、その間に肉汁を別に煮詰めると肉はジューシーでソースは濃厚になります。', '로스트는 썰기 전 휴지시키고 팬 주스는 따로 졸여 고기는 촉촉하게, 그레이비는 진하게 만드세요.', 'พักเนื้อก่อนหั่นและเคี่ยวน้ำในถาดแยกกัน เพื่อให้เนื้อฉ่ำและเกรวีเข้มข้น')
    ],
    commonMistakes: [
      ml('Cutting deeply through the rind into the meat lets juice escape; score the skin and fat without carving into the flesh.', '劃豬皮時切進肉層會讓肉汁流失；只切皮與脂肪，不要切入瘦肉。', '皮へ切れ目を入れる時に肉まで深く切ると肉汁が逃げます。皮と脂だけに切れ目を入れます。', '껍질에 칼집을 낼 때 살까지 깊게 자르면 육즙이 빠지므로 껍질과 지방층까지만 자르세요.', 'กรีดลึกถึงเนื้อทำให้น้ำไหลออก ควรกรีดเฉพาะหนังและชั้นไขมัน'),
      ml('Adding all the beer or stock at once can wash seasoning from the rind; keep the skin above the liquid line.', '一次加入全部啤酒或高湯可能沖掉豬皮調味；皮面始終保持在液面以上。', 'ビールやだしを一度に入れすぎると皮の味付けが流れるため、皮は液面より上に保ちます。', '맥주나 육수를 한꺼번에 많이 부으면 껍질의 간이 씻기므로 껍질은 액체 위에 두세요.', 'เติมเบียร์หรือสต๊อกมากเกินไปทีเดียวจะชะเครื่องปรุงจากหนัง ต้องให้หนังอยู่เหนือระดับน้ำ')
    ],
    substitutions: [
      ml('A malty non-alcoholic dark beer can replace dark beer while preserving much of the roasted malt character.', '可用麥芽味明顯的無酒精黑啤替代黑啤，仍能保留多數烘焙麥芽風味。', '濃いモルト香のノンアルコール黒ビールなら、黒ビールの代わりに使えます。', '몰트 향이 진한 무알코올 흑맥주로 바꾸면 구운 맥아 풍미를 상당 부분 유지할 수 있습니다.', 'ใช้เบียร์ดำไร้แอลกอฮอล์รสมอลต์แทนได้ โดยยังคงกลิ่นมอลต์คั่วไว้มาก'),
      ml('Use another skin-on pork shoulder of similar weight rather than a lean loin if crisp rind and long roasting are the goal.', '若目標是脆皮與長時間烘烤，應換成重量相近的帶皮豬肩，而不是瘦豬里肌。', 'パリパリの皮と長時間ローストが目的なら、赤身のロースではなく同重量の皮付き肩肉を使います。', '바삭한 껍질과 장시간 로스팅이 목적이라면 살코기 등심보다 비슷한 무게의 껍질 붙은 어깨살을 쓰세요.', 'ถ้าต้องการหนังกรอบและอบนาน ให้ใช้สันคอ/ไหล่หมูติดหนังน้ำหนักใกล้เคียง แทนสันนอกที่ไม่ติดมัน')
    ]
  },
  pan: {
    tips: [
      ml('Chill shaped patties or drained grated vegetables briefly when the mixture feels loose; a firmer mixture is easier to brown cleanly.', '肉餅或瀝乾的刨絲蔬菜若偏鬆，可短暫冷藏；較穩定的混合物更容易煎出完整焦色。', '成形した肉だねや水切りした野菜が柔らかければ少し冷やすと、崩さず焼き色を付けやすくなります。', '성형한 패티나 물 뺀 채소 반죽이 느슨하면 잠시 차갑게 해 모양을 잡고 깨끗하게 갈색 내세요.', 'ถ้าส่วนผสมเนื้อหรือผักขูดนิ่มเกิน ให้แช่เย็นสั้น ๆ จะขึ้นรูปและทำสีได้ง่ายขึ้น'),
      ml('Give each piece enough pan space to brown; crowding traps steam and softens the surface.', '每一份在鍋中都要留空間上色；塞太滿會困住蒸氣、讓表面變軟。', '鍋に余白を残して焼きます。詰め込みすぎると蒸気がこもり表面が柔らかくなります。', '각 조각 사이에 공간을 두세요. 너무 많이 넣으면 수증기가 갇혀 표면이 눅눅해집니다.', 'เว้นที่ในกระทะให้แต่ละชิ้นมีสี หากแน่นเกินไอน้ำจะทำให้ผิวนิ่ม')
    ],
    commonMistakes: [
      ml('Turning food before a browned crust forms makes it stick and tear; wait until it releases more easily from the pan.', '焦殼尚未形成就翻面容易黏鍋破裂；等表面上色、自然較容易脫離鍋面再翻。', '焼き色が付く前に返すとくっついて崩れます。自然に離れやすくなるまで待ちます。', '갈색 껍질이 생기기 전에 뒤집으면 달라붙고 찢어지므로 팬에서 잘 떨어질 때까지 기다리세요.', 'กลับก่อนเกิดผิวสีน้ำตาลจะติดและแตก ควรรอจนชิ้นอาหารหลุดจากกระทะได้ง่ายขึ้น'),
      ml('Using too little fat for potato pancakes prevents even edge crisping; maintain a shallow, hot layer between batches.', '馬鈴薯煎餅用油太少會讓邊緣無法均勻酥脆；每批之間維持一層淺而熱的油脂。', 'じゃがいもパンケーキは油が少なすぎると縁が均一にカリッとしません。各回で浅い油層を保ちます。', '감자전은 기름이 너무 적으면 가장자리가 고르게 바삭해지지 않으니 배치마다 얕은 기름층을 유지하세요.', 'น้ำมันน้อยเกินไปทำให้ขอบแพนเค้กมันฝรั่งไม่กรอบสม่ำเสมอ ควรรักษาชั้นไขมันตื้น ๆ ให้ร้อน')
    ],
    substitutions: [
      ml('Neutral oil can replace clarified butter for frying, though it gives less buttery aroma.', '煎炸用澄清奶油可換成中性油，但奶油香會較弱。', '揚げ焼きの澄ましバターは中性油で代用できますが、バター香は弱くなります。', '클래리파이드 버터 대신 중성유를 쓸 수 있지만 버터 향은 줄어듭니다.', 'ใช้น้ำมันรสกลางแทนเนยใสได้ แต่กลิ่นเนยจะลดลง'),
      ml('For meat patties, use a beef-and-pork mixture with similar fat content if the exact regional mince is unavailable.', '肉餅若買不到指定地方絞肉，可用脂肪比例接近的牛豬混合絞肉。', '肉だねは地域指定の挽肉がなければ、脂肪分が近い牛豚合挽きで代用できます。', '지역식 다짐육이 없으면 지방 함량이 비슷한 소고기·돼지고기 혼합 다짐육을 쓰세요.', 'ถ้าไม่มีเนื้อบดแบบท้องถิ่น ใช้เนื้อวัวผสมหมูที่มีไขมันใกล้เคียงได้')
    ]
  },
  dough: {
    tips: [
      ml('Let egg dough rest before rolling or pressing; hydration relaxes the gluten and makes shaping more even.', '蛋麵糰整形或壓製前先休息；吸水與鬆弛能讓麵筋放鬆，厚度更容易均勻。', '卵入りの生地は伸ばす前に休ませると水分がなじみ、グルテンが緩んで均一に成形できます。', '달걀 반죽은 밀거나 누르기 전에 휴지시켜 수분이 퍼지고 글루텐이 이완되게 하세요.', 'พักแป้งไข่ก่อนรีดหรือกด เพื่อให้น้ำซึมและกลูเตนคลายตัว ทำให้ขึ้นรูปสม่ำเสมอ'),
      ml('Cook a small test piece first when dough thickness or filling moisture varies, then adjust the simmer before cooking the full batch.', '麵皮厚度或餡料含水量有變化時，先煮一小份測試，再調整火力後煮整批。', '生地の厚みや具の水分が一定でない時は、少量を先にゆでて火加減を調整します。', '반죽 두께나 속재료 수분이 다르면 작은 조각을 먼저 익혀 본 뒤 전체 배치를 조리하세요.', 'ถ้าความหนาแป้งหรือความชื้นไส้ต่างกัน ให้ต้มชิ้นทดลองก่อนแล้วค่อยปรับไฟ')
    ],
    commonMistakes: [
      ml('Overloading boiling water drops the temperature and makes fresh dough stick together; cook in manageable batches.', '一次下太多會讓水溫驟降，新鮮麵糰也容易互黏；請分批煮。', '一度に入れすぎると湯温が下がり、生地同士がくっつくため、適量ずつゆでます。', '한꺼번에 너무 많이 넣으면 물 온도가 떨어지고 생반죽이 서로 붙으니 나눠 익히세요.', 'ใส่แป้งมากเกินไปพร้อมกันทำให้อุณหภูมิน้ำตกและแป้งสดติดกัน ควรต้มเป็นรอบ'),
      ml('A wet filling or loose seal can burst filled pasta during simmering; cool and drain the filling, then press the seams firmly.', '餡料太濕或封口鬆會讓包餡麵在燉煮時爆開；餡料先降溫瀝乾，再把接縫壓緊。', '水分の多い具や甘い閉じ方は煮ている間に破裂するため、具を冷まして水切りし、端をしっかり閉じます。', '속이 젖거나 봉합이 느슨하면 끓이는 동안 터질 수 있으니 속을 식혀 물기를 빼고 가장자리를 단단히 누르세요.', 'ไส้เปียกหรือปิดขอบไม่แน่นทำให้พาสต้าแตกตอนต้ม ควรทำไส้ให้เย็นและแห้งแล้วกดขอบให้แน่น')
    ],
    substitutions: [
      ml('A robust Alpine-style cheese such as Emmentaler, Gruyère or mature mountain cheese can be blended when one regional cheese is unavailable.', '買不到單一地方起司時，可混用 Emmentaler、Gruyère 或熟成山區起司等風味明顯的阿爾卑斯型起司。', '地域のチーズがなければ、エメンタール、グリュイエール、熟成山岳チーズなどを組み合わせられます。', '지역 치즈가 없으면 에멘탈, 그뤼에르, 숙성 마운틴 치즈 같은 알프스 계열 치즈를 섞어 쓰세요.', 'ถ้าไม่มีชีสท้องถิ่น ใช้ชีสสไตล์แอลป์รสเข้ม เช่น เอ็มเมนทาล กรูแยร์ หรือชีสภูเขาบ่มผสมกันได้'),
      ml('For filled pasta, a ready-made fresh egg pasta sheet is practical when homemade dough is not the focus; keep the same filling and simmer gently.', '若重點不在自製麵皮，可用現成新鮮蛋麵皮替代；餡料維持不變並溫和煮熟。', '自家製生地が主役でなければ市販の生卵パスタシートを使えます。具は同じで穏やかにゆでます。', '직접 반죽이 핵심이 아니라면 시판 생달걀 파스타 시트를 쓰고 같은 속을 넣어 약하게 익히세요.', 'ถ้าไม่ได้เน้นทำแป้งเอง ใช้แผ่นพาสต้าไข่สดสำเร็จรูปได้ โดยใช้ไส้เดิมและต้มเบา ๆ')
    ]
  },
  soup: {
    tips: [
      ml('Sweat aromatic vegetables before adding broth so the soup develops sweetness and depth instead of tasting only boiled.', '加入高湯前先炒香蔬菜，湯底才有甜味與層次，不會只剩水煮味。', 'だしを加える前に香味野菜を炒め、単なる煮た味ではなく甘みと深みを作ります。', '육수를 붓기 전에 향채를 볶아 단맛과 깊이를 만들면 단순히 삶은 맛이 나지 않습니다.', 'ผัดผักหอมก่อนเติมสต๊อก เพื่อสร้างความหวานและมิติ แทนรสต้มจืด ๆ'),
      ml('Season dried legumes after they are mostly tender and recheck the soup after smoked meat has released its salt.', '乾豆大致煮軟後再調鹽，煙燻肉釋放鹽分後還要重新品嚐。', '乾燥豆がほぼ柔らかくなってから塩を調整し、燻製肉の塩分が出た後に再確認します。', '말린 콩이 거의 부드러워진 뒤 간하고 훈제 고기에서 소금기가 나온 뒤 다시 맛보세요.', 'ปรุงเกลือเมื่อถั่วแห้งเกือบนุ่ม และชิมใหม่หลังเนื้อรมควันปล่อยความเค็ม')
    ],
    commonMistakes: [
      ml('Boiling split peas aggressively can catch the thickened soup on the bottom; stir more often as the peas break down.', '豌豆裂瓣開始濃稠後若猛烈沸騰容易黏底；豆子逐漸崩解時要更常攪拌。', '豆が崩れて濃くなると強火では底に付きやすいので、後半ほど頻繁に混ぜます。', '완두콩이 풀어져 걸쭉해지면 센 불에서 바닥에 눌어붙기 쉬우니 후반에는 더 자주 저으세요.', 'เมื่อถั่วแตกตัวและข้น การเดือดแรงทำให้ติดก้นหม้อ ต้องคนบ่อยขึ้นช่วงท้าย'),
      ml('Adding delicate herbs too early dulls their aroma; reserve fresh parsley or chives for the final minutes or garnish.', '細嫩香草太早加入會失去香氣；新鮮巴西里或細香蔥留到最後幾分鐘或上桌再加。', '繊細なハーブを早く入れると香りが飛ぶため、パセリやチャイブは最後に加えます。', '부드러운 허브를 너무 일찍 넣으면 향이 죽으니 파슬리나 차이브는 마지막에 넣으세요.', 'ใส่สมุนไพรอ่อนเร็วเกินไปกลิ่นจะหาย ควรใส่พาร์สลีย์หรือกุยช่ายช่วงท้าย')
    ],
    substitutions: [
      ml('A smoked pork hock, smoked pork shoulder or a good smoked sausage can supply the smoky element; adjust salt to the product used.', '煙燻豬腳、煙燻豬肩或優質煙燻香腸都能提供煙燻味；依產品鹹度調整鹽量。', '燻製豚すね、肩肉、良質な燻製ソーセージで燻香を補えます。塩分は製品に合わせます。', '훈제 족발, 어깨살 또는 좋은 훈제 소시지로 훈연 풍미를 낼 수 있으며 제품 염도에 맞춰 소금을 조절하세요.', 'ใช้ขาหมูรมควัน ไหล่หมูรมควัน หรือไส้กรอกรมควันแทนได้ แล้วปรับเกลือตามความเค็มของผลิตภัณฑ์'),
      ml('Green or yellow split peas both work; colour changes, but the long-simmered texture remains similar.', '綠色或黃色豌豆裂瓣都可使用；顏色會不同，但長時間燉煮後的質地相近。', '緑でも黄でも割りえんどうを使えます。色は変わりますが煮込み後の食感は近いです。', '초록색이나 노란색 쪼갠 완두콩 모두 가능하며 색은 달라도 오래 끓인 질감은 비슷합니다.', 'ใช้ถั่วลันเตาแห้งซีกสีเขียวหรือเหลืองก็ได้ สีต่างกันแต่เนื้อสัมผัสหลังเคี่ยวนานใกล้เคียงกัน')
    ]
  },
  cake: {
    tips: [
      ml('Cool cake layers completely before adding cream or custard; residual warmth softens fillings and makes layers slide.', '蛋糕層一定要完全冷卻再加鮮奶油或卡士達；餘熱會讓餡料變軟並造成滑層。', 'ケーキは完全に冷ましてからクリームやカスタードを重ねます。余熱があると緩んでずれます。', '케이크 층을 완전히 식힌 뒤 크림이나 커스터드를 넣으세요. 남은 열은 필링을 묽게 하고 층을 미끄럽게 합니다.', 'ปล่อยชั้นเค้กให้เย็นสนิทก่อนใส่ครีมหรือคัสตาร์ด เพราะความอุ่นทำให้ไส้นิ่มและชั้นเลื่อน'),
      ml('Weigh flour, sugar and starch for layered cakes; small ratio errors are amplified in sponge, custard and yeast dough.', '分層蛋糕的麵粉、糖與澱粉都用秤重；海綿、卡士達與酵母麵糰會放大比例小誤差。', '層菓子は小麦粉、砂糖、でんぷんを計量し、スポンジやカスタード、発酵生地の配合誤差を避けます。', '층 케이크는 밀가루, 설탕, 전분을 무게로 재세요. 스펀지, 커스터드, 이스트 반죽은 작은 비율 오차에도 민감합니다.', 'ชั่งแป้ง น้ำตาล และแป้งสตาร์ช เพราะสปอนจ์ คัสตาร์ด และแป้งยีสต์ไวต่อสัดส่วนคลาดเคลื่อน')
    ],
    commonMistakes: [
      ml('Overwhipping cream until grainy makes spreading difficult and can separate the filling; stop at firm, smooth peaks.', '鮮奶油打到顆粒狀會難抹且可能油水分離；打到堅挺但滑順的尖峰就停。', '生クリームを粒状まで泡立てると塗りにくく分離しやすいため、滑らかな固い角で止めます。', '크림을 알갱이 질 정도로 과하게 휘핑하면 바르기 어렵고 분리될 수 있으니 매끈한 단단한 뿔에서 멈추세요.', 'ตีครีมจนเป็นเม็ดจะปาดยากและแยกตัว ควรหยุดเมื่อยอดตั้งแข็งแต่ยังเนียน'),
      ml('Assembling before fruit filling or custard is cool traps heat inside the cake and weakens the final set.', '水果餡或卡士達未冷卻就組裝會把熱氣困在蛋糕內，最後定型會變差。', '果物フィリングやカスタードが温かいまま組むと熱がこもり、仕上がりが安定しません。', '과일 필링이나 커스터드가 따뜻할 때 조립하면 열이 갇혀 최종 세팅이 약해집니다.', 'ประกอบตอนฟิลลิงผลไม้หรือคัสตาร์ดยังอุ่นจะกักความร้อนและทำให้เซ็ตตัวไม่ดี')
    ],
    substitutions: [
      ml('For alcohol-free versions, replace Kirsch or liqueur only with enough matching fruit juice to supply the needed moisture, then adjust sweetness.', '無酒精版本只用足夠補水分的相應果汁替代 Kirsch 或利口酒，再調整甜度。', 'ノンアルコールではキルシュ等を同量で機械的に替えず、必要な水分だけ果汁で補い甘さを調整します。', '무알코올 버전은 키르슈나 리큐르를 무조건 동량으로 바꾸지 말고 필요한 수분만 과즙으로 보충한 뒤 당도를 맞추세요.', 'แบบไร้แอลกอฮอล์ให้ใช้น้ำผลไม้รสเข้ากันเท่าที่จำเป็นต่อความชื้น แล้วปรับความหวาน'),
      ml('Use full-fat dairy of similar richness when replacing cream, milk or custard components so the filling sets predictably.', '替換鮮奶油、牛奶或卡士達乳製品時，選脂肪濃度相近的全脂產品，餡料才會穩定定型。', '生クリームや牛乳を替える場合は脂肪分の近い全脂乳製品を使い、安定した固まり方を保ちます。', '크림, 우유, 커스터드 유제품은 지방 함량이 비슷한 전지 제품으로 바꿔야 안정적으로 굳습니다.', 'ถ้าเปลี่ยนครีม นม หรือส่วนคัสตาร์ด ใช้นมไขมันเต็มที่ใกล้เคียงเพื่อให้ไส้เซ็ตคาดเดาได้')
    ]
  }
};

export function makeGermanRecipe(recipe) {
  const { profile = 'braise', additionalSources = [], ...data } = recipe;
  const defaults = profiles[profile] || profiles.braise;
  return {
    cuisine: 'german',
    region: ml('Germany', '德國', 'ドイツ', '독일', 'เยอรมนี'),
    sources: [...(germanRecipeSources[recipe.id] || []), ...additionalSources],
    tips: data.tips || defaults.tips,
    commonMistakes: data.commonMistakes || defaults.commonMistakes,
    substitutions: data.substitutions || defaults.substitutions,
    ...data
  };
}

export const cookedStorage = ml(
  'Cool leftovers promptly and refrigerate within 2 hours at 0–4°C for up to 3 days. Reheat only the portion needed until piping hot throughout.',
  '剩食盡快降溫，2 小時內放入 0–4°C 冰箱，最多保存 3 天；只回熱需要的份量，並加熱至中心完全熱透。',
  '残りは速やかに冷まし、2時間以内に0–4°Cで冷蔵して3日以内に食べます。必要量だけ中心まで十分に再加熱します。',
  '남은 음식은 빠르게 식혀 2시간 안에 0–4°C로 냉장하고 3일 이내 드세요. 필요한 양만 속까지 충분히 뜨겁게 데우세요.',
  'ทำให้อาหารเหลือเย็นเร็วและแช่ 0–4°C ภายใน 2 ชั่วโมง เก็บไม่เกิน 3 วัน อุ่นเฉพาะส่วนที่จะกินให้ร้อนทั่วถึง'
);

export const friedStorage = ml(
  'Fried food is best eaten immediately. Refrigerate cooled leftovers within 2 hours at 0–4°C for up to 1 day and reheat uncovered in a hot oven until crisp and piping hot.',
  '煎炸物最好現吃。剩食 2 小時內降溫並以 0–4°C 冷藏最多 1 天；回熱時不加蓋，用高溫烤箱加熱至表面回脆、中心熱透。',
  '揚げ物は出来たてが最適です。残りは2時間以内に冷まして0–4°Cで1日まで冷蔵し、蓋をせず高温のオーブンでカリッと中心まで熱く戻します。',
  '튀김이나 전은 바로 먹는 것이 가장 좋습니다. 남은 음식은 2시간 안에 식혀 0–4°C에서 1일까지 냉장하고 덮지 않은 채 뜨거운 오븐에서 바삭하고 속까지 뜨겁게 데우세요.',
  'อาหารทอดอร่อยที่สุดเมื่อกินทันที ของเหลือให้เย็นและแช่ 0–4°C ภายใน 2 ชั่วโมงไม่เกิน 1 วัน แล้วอุ่นแบบไม่ปิดฝาในเตาร้อนจนกรอบและร้อนทั่ว'
);

export const chilledCakeStorage = ml(
  'Keep covered at 0–4°C and use within 2 days. Return the cake to the refrigerator promptly after serving and do not leave it at room temperature for more than 2 hours.',
  '加蓋置 0–4°C 冰箱並於 2 天內食用；上桌後盡快放回冰箱，室溫不要放超過 2 小時。',
  '覆って0–4°Cで保存し2日以内に食べます。提供後はすぐ冷蔵庫へ戻し、室温に2時間以上置きません。',
  '덮어서 0–4°C에 보관해 2일 안에 드세요. 낸 뒤에는 빨리 냉장고에 되돌리고 실온에 2시간 넘게 두지 마세요.',
  'ปิดฝาเก็บที่ 0–4°C และกินภายใน 2 วัน หลังเสิร์ฟให้นำกลับเข้าตู้เย็นเร็ว และอย่าวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง'
);
