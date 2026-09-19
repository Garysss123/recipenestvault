import { otherWorldRecipeSources } from './other-world-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  simmer: {
    tips: [
      ml('Brown the aromatics patiently before adding liquid; this builds flavor without needing extra seasoning.', '先耐心炒香辛香料再加入液體；這能建立風味，不必額外加重調味。', '液体を加える前に香味野菜をじっくり炒めると、調味料を増やさずに風味が深まります。', '액체를 넣기 전에 향신채를 충분히 볶으면 양념을 더하지 않아도 풍미가 깊어집니다.', 'ผัดเครื่องหอมให้หอมก่อนเติมของเหลว จะช่วยเพิ่มรสชาติโดยไม่ต้องปรุงเพิ่ม'),
      ml('Keep the pot at a gentle simmer and check the largest piece for tenderness before serving.', '保持微滾，盛盤前確認最大塊食材已燉軟。', '静かな煮立ちを保ち、盛り付け前にいちばん大きな具材の柔らかさを確かめます。', '잔잔하게 끓이고 내기 전에 가장 큰 재료가 부드러운지 확인합니다.', 'เคี่ยวเบา ๆ และตรวจชิ้นที่ใหญ่ที่สุดว่านุ่มก่อนเสิร์ฟ')
    ],
    commonMistakes: [
      ml('A hard boil can toughen meat and break a sauce; lower the heat as soon as the liquid boils.', '大滾會讓肉變韌、醬汁散開；液體沸騰後立即轉小火。', '強く沸かすと肉が硬くなりソースも崩れます。沸いたらすぐ火を弱めます。', '팔팔 끓이면 고기가 질겨지고 소스가 분리될 수 있으니 끓기 시작하면 바로 불을 낮춥니다.', 'เดือดแรงทำให้เนื้อเหนียวและซอสแตก พอเดือดแล้วให้ลดไฟทันที'),
      ml('Adding all the salt at the start can make a reduced sauce too salty; season again only after it thickens.', '一開始加足鹽，醬汁收濃後容易過鹹；收汁後再試味調整。', '最初に塩を入れすぎると煮詰めたソースが塩辛くなります。濃くなってから味を整えます。', '처음부터 소금을 많이 넣으면 졸인 소스가 짤 수 있으니 농축된 뒤 간을 맞춥니다.', 'ใส่เกลือมากตั้งแต่แรกทำให้ซอสเค็มหลังงวด ค่อยชิมปรุงอีกครั้งเมื่อข้นแล้ว')
    ],
    substitutions: [
      ml('Use a similarly sized cut of chicken or beef if the named cut is unavailable, and extend the simmer until tender.', '買不到指定部位時可換成大小相近的雞肉或牛肉部位，並燉至軟嫩。', '指定の部位がなければ同程度の大きさの鶏肉や牛肉を使い、柔らかくなるまで煮込みます。', '지정 부위가 없으면 크기가 비슷한 닭고기나 소고기를 쓰고 부드러워질 때까지 더 끓입니다.', 'หากไม่มีเนื้อส่วนที่ระบุ ใช้ไก่หรือวัวชิ้นขนาดใกล้กันและเคี่ยวจนเปื่อย'),
      ml('Low-sodium stock can replace salted stock; taste at the end because sauces and pastes vary in saltiness.', '低鈉高湯可取代已調味高湯；醬料與香料糊鹹度不同，最後再試味。', '塩分控えめのだしで代用できます。ソースやペーストの塩分は異なるため最後に味を見ます。', '저염 육수로 바꿀 수 있습니다. 소스와 페이스트의 염도가 다르므로 마지막에 간을 봅니다.', 'ใช้น้ำสต็อกโซเดียมต่ำแทนได้ เพราะซอสและเครื่องแกงเค็มไม่เท่ากัน จึงควรชิมตอนท้าย')
    ]
  },
  rice: {
    tips: [
      ml('Rinse rice until the water is nearly clear, then drain it well so the measured cooking liquid stays predictable.', '米洗至水近乎清澈後充分瀝乾，烹煮液體比例才容易掌握。', '米は水がほぼ澄むまですすぎ、よく水を切ると加える液量を正確に保てます。', '쌀을 물이 거의 맑아질 때까지 씻고 충분히 물기를 빼야 조리액 양을 맞추기 쉽습니다.', 'ล้างข้าวจนเกือบใสแล้วสะเด็ดน้ำให้ดี เพื่อควบคุมปริมาณน้ำหุงได้แม่นยำ'),
      ml('Rest the covered rice off the heat before fluffing so steam finishes the centre and the grains stay intact.', '離火加蓋靜置再翻鬆，讓蒸氣完成中心熟度並保持米粒完整。', '火を止めてふたをしたまま蒸らしてからほぐすと、中心まで火が通り粒も崩れません。', '불을 끄고 덮어 뜸을 들인 뒤 풀어 주면 가운데까지 익고 쌀알도 살아납니다.', 'พักข้าวโดยปิดฝาหลังยกลงจากไฟก่อนคุ้ย ไอน้ำจะทำให้สุกถึงกลางและเมล็ดไม่แตก')
    ],
    commonMistakes: [
      ml('Lifting the lid repeatedly releases steam and leaves the top undercooked; wait until the stated check before opening.', '一直掀蓋會讓蒸氣跑掉、上層夾生；到檢查時再開蓋。', '何度もふたを開けると蒸気が逃げ、上の米に芯が残ります。確認時まで開けません。', '뚜껑을 자주 열면 수증기가 빠져 윗부분이 설익습니다. 확인 시점까지 열지 않습니다.', 'เปิดฝาบ่อยทำให้ไอน้ำหายและข้าวด้านบนไม่สุก รอจนถึงเวลาตรวจค่อยเปิด'),
      ml('A strong boil can scorch the base before the grains soften; lower the heat as soon as the pot simmers.', '大火會在米粒煮軟前燒焦鍋底；開始微滾就轉小火。', '強火では米が柔らかくなる前に鍋底が焦げます。煮立ったらすぐ弱火にします。', '센불은 쌀이 익기 전에 바닥을 태울 수 있으니 끓기 시작하면 바로 약불로 낮춥니다.', 'ไฟแรงทำให้ก้นหม้อไหม้ก่อนเมล็ดข้าวนุ่ม เมื่อเดือดอ่อนให้ลดเป็นไฟอ่อน')
    ],
    substitutions: [
      ml('Long-grain rice works well for a fluffy result; follow the package liquid ratio if the variety differs.', '長米適合煮出粒粒分明口感；米種不同時請依包裝液體比例調整。', '長粒米はほぐれやすく仕上がります。品種が異なる場合は袋の液量表示に従います。', '장립종은 고슬고슬하게 익습니다. 다른 품종은 포장지의 물 비율을 따릅니다.', 'ข้าวเมล็ดยาวให้เนื้อร่วน หากใช้พันธุ์อื่นให้ปรับน้ำตามคำแนะนำบนห่อ'),
      ml('Vegetable stock can replace chicken stock in a meat-free version; use unsalted stock and adjust at the end.', '素食版本可用蔬菜高湯取代雞高湯；選無鹽高湯並於最後調味。', '肉を使わない場合は鶏だしを野菜だしに替え、無塩タイプを使って最後に調整します。', '고기 없이 만들 때 닭육수 대신 채소육수를 쓰고 무염 제품을 골라 마지막에 간을 맞춥니다.', 'ใช้สต็อกผักแทนสต็อกไก่ในสูตรมังสวิรัติ เลือกชนิดไม่เค็มและปรุงตอนท้าย')
    ]
  },
  quick: {
    tips: [
      ml('Prepare and portion every topping before heating the pan; once the wok is hot, the cooking moves quickly.', '先備好並分裝所有配料再熱鍋；鍋熱後烹調速度很快。', '鍋を熱する前に具材を切り分けておきます。中華鍋が熱くなったら調理は一気に進みます。', '팬을 달구기 전에 모든 재료를 손질해 둡니다. 웍이 뜨거워지면 조리가 빠르게 진행됩니다.', 'เตรียมและแบ่งเครื่องทั้งหมดก่อนตั้งกระทะ เมื่อกระทะร้อนแล้วจะผัดเร็วมาก'),
      ml('Cook in a wide hot pan and let ingredients make contact with the surface before tossing for better browning.', '使用寬口熱鍋，先讓食材接觸鍋面再翻炒，較容易上色。', '広く熱した鍋を使い、返す前に具材を鍋肌に当てると焼き色が付きます。', '넓고 뜨거운 팬을 쓰고 재료를 뒤집기 전에 팬에 닿게 두어야 잘 볶입니다.', 'ใช้กระทะกว้างที่ร้อน พักวัตถุดิบให้สัมผัสผิวกระทะก่อนคลุกเพื่อให้เกรียมดี')
    ],
    commonMistakes: [
      ml('Overfilling the pan traps moisture and steams the food; split the batch if ingredients stop sizzling.', '鍋裡放太滿會悶出水氣、把食材蒸軟；若聽不到滋滋聲就分批炒。', '鍋に詰めすぎると水分がこもって蒸し焼きになります。音がしなくなったら分けて炒めます。', '팬을 가득 채우면 수분이 갇혀 재료가 쪄집니다. 지글거리는 소리가 멈추면 나눠 볶습니다.', 'ใส่แน่นกระทะทำให้ไอน้ำขังและอาหารนึ่งแทนผัด หากเสียงฉ่าหายไปให้แบ่งเป็นรอบ'),
      ml('Adding a thin sauce too early makes the rice or noodles soggy; toss it in near the end and heat briefly.', '太早加稀醬汁會讓米飯或麵條濕軟；接近完成時才拌入並短暫加熱。', '薄いソースを早く加えるとご飯や麺がべたつきます。仕上げ近くに加えてさっと絡めます。', '묽은 소스를 너무 일찍 넣으면 밥이나 면이 질척해집니다. 마무리 무렵 넣어 짧게 볶습니다.', 'เติมซอสเหลวเร็วเกินทำให้ข้าวหรือเส้นแฉะ ใส่ช่วงท้ายแล้วคลุกให้ร้อนสั้น ๆ')
    ],
    substitutions: [
      ml('Use leftover rice or noodles that have been chilled and loosened; fresh hot rice can clump in the pan.', '可用冷藏後撥鬆的剩飯或麵；熱騰騰的新煮米飯容易黏成團。', '冷蔵してほぐした残りご飯や麺が使えます。炊きたての熱い米は鍋で固まりやすいです。', '차게 식혀 풀어 둔 남은 밥이나 면을 쓰면 됩니다. 갓 지은 뜨거운 밥은 팬에서 뭉치기 쉽습니다.', 'ใช้ข้าวหรือเส้นที่แช่เย็นแล้วคลายตัว ข้าวร้อนที่เพิ่งหุงจะจับเป็นก้อนได้ง่าย'),
      ml('A neutral high-heat oil can replace the named cooking oil; avoid strongly scented oil that masks the aromatics.', '可用耐高溫中性油取代指定油品；避免氣味太重而蓋過辛香料。', '指定の油は発煙点の高い中性油で代用できます。香味を隠す香りの強い油は避けます。', '지정된 기름은 발연점이 높은 중성 기름으로 바꿀 수 있습니다. 향신채 향을 가리는 향 강한 기름은 피합니다.', 'ใช้น้ำมันรสกลางที่ทนความร้อนสูงแทนน้ำมันที่ระบุได้ หลีกเลี่ยงกลิ่นแรงที่กลบเครื่องหอม')
    ]
  },
  dough: {
    tips: [
      ml('Rest the dough or batter covered so the flour hydrates evenly and shaping becomes easier.', '麵糰或麵糊加蓋靜置，讓麵粉均勻吸水、後續更容易整形。', '生地や衣は覆って休ませると粉に水分が行き渡り、成形しやすくなります。', '반죽을 덮어 휴지하면 밀가루가 고르게 수분을 흡수해 빚기 쉬워집니다.', 'คลุมแป้งหรือแบตเทอร์พักไว้เพื่อให้แป้งดูดน้ำทั่วและขึ้นรูปง่าย'),
      ml('Use only enough flour to prevent sticking; too much bench flour makes the cooked wrapper tough.', '只用足夠防沾的手粉；過多會讓熟麵皮變韌。', '打ち粉はくっつかない程度に留めます。多すぎると皮が硬くなります。', '달라붙지 않을 만큼만 덧가루를 씁니다. 너무 많으면 익힌 피가 질겨집니다.', 'ใช้แป้งนวลเพียงพอไม่ให้ติด มากเกินทำให้แป้งที่สุกแล้วเหนียวแข็ง')
    ],
    commonMistakes: [
      ml('Overworking the dough makes it spring back and hard to seal; stop as soon as it is smooth and let it rest.', '揉得過度會讓麵糰回縮、不易封口；揉至平滑就停下並讓它休息。', 'こねすぎると生地が縮んで閉じにくくなります。なめらかになったら止めて休ませます。', '반죽을 지나치게 치대면 되돌아오고 봉하기 어려우니 매끈해지면 멈춰 휴지합니다.', 'นวดแป้งมากเกินทำให้หดและปิดขอบยาก พอเนียนแล้วหยุดและพักแป้ง'),
      ml('Overfilling makes seams burst; use a modest filling and keep the sealing edge clean.', '餡料太多會讓接縫裂開；餡量適中並保持封口邊緣乾淨。', '具を詰めすぎると継ぎ目が開きます。具は控えめにし、縁をきれいに保ちます。', '속을 너무 채우면 이음새가 터집니다. 적당히 넣고 가장자리를 깨끗하게 둡니다.', 'ใส่ไส้มากเกินทำให้รอยปิดแตก ใช้ไส้พอดีและเช็ดขอบให้สะอาด')
    ],
    substitutions: [
      ml('If a specialty cheese is unavailable, blend a mild melting cheese with a little salty brined cheese for balance.', '買不到專用起司時，可用溫和易融起司搭配少量鹹味醃漬起司調出平衡。', '専用チーズがなければ、溶けやすい穏やかなチーズに塩気のあるチーズを少量混ぜて調整します。', '특수 치즈가 없으면 잘 녹는 순한 치즈에 짭짤한 브라인 치즈를 조금 섞어 균형을 맞춥니다.', 'หากไม่มีชีสเฉพาะ ใช้ชีสละลายรสอ่อนผสมชีสเค็มแช่น้ำเกลือเล็กน้อยให้สมดุล'),
      ml('Use a neutral vegetable oil for pan cooking; strongly flavored oils can change the aroma of the dough.', '平底鍋烹調可用中性植物油；濃味油會改變麵糰香氣。', 'フライパン調理には中性の植物油を使います。香りの強い油は生地の風味を変えます。', '팬 조리에는 중성 식물성 기름을 씁니다. 향이 강한 기름은 반죽의 풍미를 바꿀 수 있습니다.', 'ใช้植物油รสกลางสำหรับทอดกระทะ น้ำมันกลิ่นแรงอาจเปลี่ยนกลิ่นแป้ง')
    ]
  },
  coldSeafood: {
    tips: [
      ml('Buy very fresh fish from a trusted seller, keep it chilled, and prepare it with clean tools on a cold surface.', '向可信店家購買新鮮魚肉，冷藏保存，並在冰冷乾淨的檯面與器具上處理。', '信頼できる店で新鮮な魚を買い、冷蔵し、清潔な道具と冷たい作業台で扱います。', '믿을 수 있는 곳에서 신선한 생선을 사고 냉장 보관하며 깨끗하고 차가운 작업대에서 손질합니다.', 'ซื้อปลาสดจากร้านที่เชื่อถือได้ แช่เย็น และเตรียมบนพื้นผิวกับอุปกรณ์ที่สะอาดและเย็น'),
      ml('Cut the fish evenly and serve soon after the citrus dressing is mixed in so the texture stays tender.', '魚肉切成均勻大小，拌入柑橘汁後儘快上桌，口感才保持柔嫩。', '魚を均等に切り、柑橘の汁を合わせたら早めに出すと食感が保てます。', '생선을 고르게 자르고 감귤즙을 섞은 뒤 오래 두지 말고 내야 부드러운 식감이 유지됩니다.', 'หั่นปลาให้เท่ากันและเสิร์ฟไม่นานหลังคลุกน้ำส้ม เพื่อคงเนื้อนุ่ม')
    ],
    commonMistakes: [
      ml('Citrus changes the surface texture but does not make unsafe raw fish safe; use fish intended for raw preparations and keep it cold.', '柑橘汁只會改變表面質地，不能讓不安全的生魚變安全；選適合生食的魚並全程冷藏。', '柑橘は表面の食感を変えるだけで、生食に適さない魚を安全にするものではありません。生食用を選び冷やして扱います。', '감귤즙은 표면 질감만 바꾸며 부적절한 생선을 안전하게 만들지 않습니다. 생식용 생선을 골라 차갑게 보관합니다.', 'น้ำส้มเปลี่ยนแค่ผิวปลา ไม่ได้ทำให้ปลาที่ไม่ปลอดภัยกินดิบได้ เลือกปลาสำหรับกินดิบและรักษาความเย็น'),
      ml('Adding coconut milk too early can mute the citrus; fold it in near serving and season the mixture again.', '太早加椰奶會壓低柑橘清香；接近上桌時拌入並重新調味。', 'ココナッツミルクを早く加えると柑橘の香りが弱まります。盛り付け前に混ぜて味を整えます。', '코코넛밀크를 일찍 넣으면 감귤 향이 약해집니다. 내기 직전에 섞고 간을 다시 맞춥니다.', 'ใส่กะทิเร็วเกินทำให้กลิ่นส้มจาง คลุกตอนใกล้เสิร์ฟแล้วปรุงอีกครั้ง')
    ],
    substitutions: [
      ml('Firm snapper or another mild, firm white fish can replace the local fish; avoid delicate fillets that fall apart.', '可用結實的笛鯛或其他肉質緊實、味道溫和的白肉魚替代；避免易碎魚片。', '現地の魚は身の締まった鯛などの白身魚で代用できます。崩れやすい魚は避けます。', '단단한 도미나 담백한 흰살생선으로 바꿀 수 있습니다. 쉽게 부서지는 생선은 피합니다.', 'ใช้ปลากะพงหรือปลาขาวเนื้อแน่นรสอ่อนแทนได้ หลีกเลี่ยงเนื้อปลาที่แตกง่าย'),
      ml('Lemon can replace lime if needed, though it gives a slightly different aroma.', '必要時可用檸檬取代萊姆，但香氣會略有不同。', '必要ならライムをレモンに替えられますが、香りは少し変わります。', '필요하면 라임 대신 레몬을 쓸 수 있지만 향은 조금 달라집니다.', 'ใช้เลมอนแทนมะนาวได้หากจำเป็น แต่กลิ่นจะแตกต่างเล็กน้อย')
    ]
  },
  baking: {
    tips: [
      ml('Preheat the oven fully and measure the dry ingredients before mixing; an even bake starts with an even batter.', '先讓烤箱充分預熱並量好乾性材料；麵糊均勻才能烤得一致。', 'オーブンを十分に予熱し、粉類を量ってから混ぜます。生地が均一だと焼き上がりも揃います。', '오븐을 충분히 예열하고 가루 재료를 먼저 계량합니다. 반죽이 고르면 굽기도 고르게 됩니다.', 'อุ่นเตาให้ร้อนทั่วและตวงของแห้งก่อนผสม แบตเทอร์ที่สม่ำเสมอช่วยให้อบได้ทั่ว'),
      ml('Cool the cake completely before coating or slicing so the crumb stays together.', '蛋糕完全冷卻後再裹醬或切塊，才不易掉屑。', 'コーティングやカットの前に完全に冷ますと、崩れにくくなります。', '코팅하거나 자르기 전에 케이크를 완전히 식혀야 부스러지지 않습니다.', 'พักเค้กให้เย็นสนิทก่อนชุบหรือหั่น เพื่อให้เนื้อไม่แตก')
    ],
    commonMistakes: [
      ml('Opening the oven early can collapse a light sponge; wait until the centre springs back before checking repeatedly.', '太早打開烤箱會讓輕盈海綿蛋糕塌陷；先等中心按壓回彈再檢查。', '早くオーブンを開けると軽いスポンジがしぼみます。中央が戻るまで何度も確認しません。', '오븐을 일찍 열면 가벼운 스펀지가 꺼질 수 있습니다. 가운데가 다시 올라올 때까지 자주 열지 않습니다.', 'เปิดเตาเร็วเกินทำให้สปันจ์แฟบ รอจนตรงกลางเด้งกลับก่อนตรวจบ่อย ๆ'),
      ml('A warm cake can soften the coating and shed crumbs; cool it completely and work over a tray.', '溫蛋糕會融化外層並掉屑；完全放涼並在托盤上操作。', '温かいケーキはコーティングを溶かしてくずが出ます。完全に冷まし、トレーの上で作業します。', '따뜻한 케이크는 코팅을 녹이고 부스러기를 냅니다. 완전히 식힌 뒤 쟁반 위에서 작업합니다.', 'เค้กอุ่นทำให้เคลือบละลายและมีเศษหลุด พักให้เย็นสนิทแล้วทำบนถาด')
    ],
    substitutions: [
      ml('A neutral-flavored jam can replace raspberry jam; keep the layer thin so the sponge stays easy to coat.', '可用味道溫和的果醬替代覆盆子果醬；薄薄塗抹以免蛋糕難裹醬。', 'ラズベリージャムは穏やかな味のジャムで代用できます。塗りすぎるとコーティングしにくくなるので薄くします。', '라즈베리 잼은 맛이 순한 잼으로 바꿀 수 있습니다. 코팅하기 쉽도록 얇게 바릅니다.', 'ใช้แยมรสอ่อนแทนแยมราสป์เบอร์รีได้ ทาบาง ๆ เพื่อให้ชุบเคลือบง่าย'),
      ml('Unsweetened cocoa gives the closest chocolate coating; adjust sugar to taste if using sweetened cocoa mix.', '無糖可可粉最接近巧克力外層；若用甜可可粉混合物，依口味減糖。', '無糖ココアが最も近い味になります。加糖ココアミックスなら砂糖を調整します。', '무가당 코코아가 초콜릿 코팅에 가장 가깝습니다. 가당 코코아 믹스를 쓰면 설탕을 조절합니다.', 'โกโก้ไม่หวานให้เคลือบรสใกล้เคียงที่สุด หากใช้โกโก้ผสมน้ำตาลให้ลดน้ำตาลตามชอบ')
    ]
  }
};

export const cookedStorage = ml(
  'Refrigerate leftovers in a covered container within 2 hours and use within 3 days. Reheat once until steaming hot throughout.',
  '剩食在 2 小時內放入有蓋容器冷藏，3 天內吃完。僅復熱一次，並加熱至整體冒熱氣。',
  '残りは2時間以内にふた付き容器に入れて冷蔵し、3日以内に食べます。再加熱は一度だけ、全体が十分熱くなるまで行います。',
  '남은 음식은 2시간 안에 뚜껑 있는 용기에 담아 냉장하고 3일 안에 먹습니다. 한 번만 다시 데워 전체가 김이 날 때까지 가열합니다.',
  'แช่ของเหลือในภาชนะปิดภายใน 2 ชั่วโมงและกินภายใน 3 วัน อุ่นซ้ำเพียงครั้งเดียวจนร้อนทั่วถึง'
);

export const dessertStorage = ml(
  'Keep the coated cakes in an airtight container in a cool place for 2 days, or refrigerate for up to 5 days; bring to room temperature before serving.',
  '裹好外層的蛋糕放入密封盒，在陰涼處保存 2 天，或冷藏最多 5 天；上桌前回溫。',
  'コーティングしたケーキは密閉容器に入れ、涼しい場所で2日、冷蔵なら最長5日保存します。食べる前に室温に戻します。',
  '코팅한 케이크는 밀폐 용기에 담아 서늘한 곳에 2일, 냉장고에서 최대 5일 보관합니다. 내기 전에 실온에 둡니다.',
  'เก็บเค้กเคลือบในภาชนะปิดสนิทในที่เย็น 2 วัน หรือแช่เย็นได้ 5 วัน นำออกมาให้อุณหภูมิห้องก่อนเสิร์ฟ'
);

export const coldSeafoodStorage = ml(
  'This raw-fish dish is best served immediately. Do not keep leftovers at room temperature; discard any portion left out for more than 2 hours.',
  '這道生魚料理宜現做現吃；不可在室溫久放，離開冷藏超過 2 小時的剩食請丟棄。',
  '生魚料理は作りたてをすぐに食べます。室温で保存せず、冷蔵外に2時間以上置いた分は廃棄します。',
  '이 생선 요리는 만들자마자 먹는 것이 좋습니다. 실온에 두지 말고 냉장 밖에 2시간 넘게 둔 것은 버립니다.',
  'ควรกินเมนูปลาดิบทันที อย่าวางไว้ที่อุณหภูมิห้อง และทิ้งส่วนที่อยู่นอกตู้เย็นเกิน 2 ชั่วโมง'
);

export function makeOtherWorldRecipe(recipe) {
  const { profile = 'simmer', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.simmer;
  return {
    cuisine: 'other-world',
    region: ml('World cuisine (see the dish-specific region below)', '其他世界料理（詳見各道料理標示的具體地區）', '世界各地の料理（各料理欄に具体的な地域を記載）', '기타 세계 음식(각 요리 항목에 구체적인 지역 표기)', 'อาหารจากภูมิภาคต่าง ๆ ของโลก (ดูพื้นที่เฉพาะในแต่ละเมนู)'),
    sources: [...(otherWorldRecipeSources[recipe.id] || []), ...additionalSources],
    tips: data.tips || defaults.tips,
    commonMistakes: data.commonMistakes || defaults.commonMistakes,
    substitutions: data.substitutions || defaults.substitutions,
    ...data
  };
}
