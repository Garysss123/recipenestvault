import { britishRecipeSources } from './british-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const profiles = {
  fried: {
    tips: [
      ml('Dry the food thoroughly before coating or frying; surface water weakens browning and makes hot oil spit.', '裹粉或油炸前要把食材表面徹底擦乾；水分會削弱上色，也會讓熱油大量噴濺。', '衣を付けたり揚げたりする前に食材の表面を十分に乾かします。水分があると色づきが悪くなり、油もはねます。', '튀김옷을 입히거나 튀기기 전에 재료 표면의 물기를 충분히 제거하세요. 수분은 갈변을 방해하고 기름을 튀게 합니다.', 'ซับวัตถุดิบให้แห้งสนิทก่อนชุบแป้งหรือทอด เพราะน้ำทำให้สีไม่สวยและน้ำมันกระเด็น'),
      ml('Work in modest batches and let the oil recover to the target temperature before adding the next batch.', '少量分批油炸，每批之間都讓油溫回到目標值，再放下一批。', '少量ずつ揚げ、次の回を入れる前に油温を目標まで戻します。', '한 번에 많이 넣지 말고 나눠 튀기며, 다음 재료를 넣기 전에 기름 온도를 목표치로 회복시키세요.', 'ทอดทีละไม่มาก และรอให้น้ำมันกลับสู่อุณหภูมิเป้าหมายก่อนใส่ชุดต่อไป')
    ],
    commonMistakes: [
      ml('Crowding the fryer drops the oil temperature sharply and gives a greasy, pale crust instead of a crisp one.', '炸鍋塞得太滿會讓油溫驟降，外皮就會偏白又吸油，而不是酥脆。', '鍋に詰め込みすぎると油温が急低下し、衣がカリッとせず白っぽく油を吸います。', '튀김 냄비를 너무 채우면 기름 온도가 급격히 내려가 바삭하지 않고 창백하며 기름진 튀김옷이 됩니다.', 'ใส่ของทอดแน่นเกินไปทำให้อุณหภูมิน้ำมันตกฮวบ ผิวจึงซีด อมน้ำมัน และไม่กรอบ'),
      ml('Holding fried food in a covered container traps steam and softens the crust; drain it in a single uncovered layer.', '把炸物蓋住保溫會困住蒸氣、讓外皮回軟；應單層、不要覆蓋地瀝油。', '揚げ物を蓋付き容器に入れると蒸気で衣が柔らかくなるため、重ねず蓋をせずに油を切ります。', '튀긴 음식을 덮어 두면 수증기가 갇혀 튀김옷이 눅눅해지므로 겹치지 말고 열린 상태로 기름을 빼세요.', 'การปิดฝาของทอดกักไอน้ำและทำให้ผิวนิ่ม ควรวางชั้นเดียวแบบไม่ปิดฝาให้สะเด็ดน้ำมัน')
    ],
    substitutions: [
      ml('Use another neutral high-heat frying oil when the specified oil is unavailable; keep the same temperature targets.', '指定油品買不到時可換成其他耐高溫中性油，但維持相同油溫目標。', '指定の油がなければ高温向けの中性油で代用し、温度目標は同じにします。', '지정한 기름이 없으면 고온용 중성유를 사용하되 같은 온도 기준을 유지하세요.', 'หากไม่มีน้ำมันที่ระบุ ใช้น้ำมันรสกลางที่ทนความร้อนสูงแทน โดยคงอุณหภูมิเดิม'),
      ml('For white fish, substitute a similarly thick firm fillet so the coating and cooking time remain predictable.', '白肉魚替換時選厚度相近、肉質結實的魚排，裹衣與熟成時間才容易維持。', '白身魚は同程度の厚みで身の締まった切り身に替えると、衣と加熱時間を合わせやすくなります。', '흰살생선은 비슷한 두께의 단단한 필렛으로 바꾸면 튀김옷과 조리 시간을 예측하기 쉽습니다.', 'ถ้าเปลี่ยนปลาเนื้อขาว ให้ใช้ชิ้นที่แน่นและหนาใกล้เคียงกันเพื่อให้เวลาทอดคาดเดาได้')
    ]
  },
  pastry: {
    tips: [
      ml('Cool moist fillings completely before they touch pastry; trapped steam and warm fat quickly soften the crust.', '含水餡料碰到酥皮前一定要完全放涼；熱氣與溫熱油脂會迅速讓麵皮變軟。', '水分の多い具はパイ生地に触れる前に完全に冷まします。温かい蒸気と脂は生地をすぐ柔らかくします。', '수분 있는 속재료는 페이스트리에 닿기 전에 완전히 식히세요. 따뜻한 증기와 지방은 반죽을 금방 눅눅하게 만듭니다.', 'ปล่อยไส้ที่มีความชื้นให้เย็นสนิทก่อนสัมผัสแป้งพาย เพราะไอน้ำและไขมันอุ่นทำให้แป้งนิ่มเร็ว'),
      ml('Keep pastry cold until baking and use a fully preheated oven so the fat sets the layers before it leaks out.', '麵皮入爐前保持低溫，烤箱要完全預熱，讓油脂先撐起層次而不是先流出。', '焼く直前まで生地を冷たく保ち、十分に予熱したオーブンで脂が流れ出す前に層を立ち上げます。', '굽기 직전까지 페이스트리를 차갑게 유지하고 오븐을 충분히 예열해 지방이 새기 전에 층이 형성되게 하세요.', 'เก็บแป้งพายให้เย็นจนเข้าอบ และอุ่นเตาให้เต็มที่เพื่อให้ชั้นแป้งเซ็ตก่อนที่ไขมันจะไหลออก')
    ],
    commonMistakes: [
      ml('Rolling or handling pastry repeatedly warms the fat and makes the baked shell dense rather than flaky.', '反覆擀壓、把玩麵皮會讓油脂升溫，烤後會偏密實而不是酥鬆分層。', '生地を何度も伸ばしたり触ったりすると脂が温まり、焼き上がりが層にならず詰まった食感になります。', '페이스트리를 반복해서 밀거나 만지면 지방이 따뜻해져 구웠을 때 결이 살지 않고 조밀해집니다.', 'รีดหรือจับแป้งซ้ำ ๆ ทำให้ไขมันอุ่นและแป้งอบออกมาแน่นแทนที่จะเป็นชั้นกรอบ'),
      ml('Sealing a pie with wet or greasy edges prevents a reliable bond; wipe the rim and use only a light egg or water seal.', '派邊若濕又油會黏不牢；先擦乾邊緣，只薄薄刷蛋液或水來封口。', '縁が濡れていたり脂っぽいと接着しにくいため、縁を拭き、卵液か水を薄く使って閉じます。', '파이 가장자리가 젖거나 기름지면 잘 붙지 않으니 닦아낸 뒤 달걀물이나 물을 얇게 발라 봉하세요.', 'ขอบพายที่เปียกหรือมันจะติดไม่ดี ให้เช็ดขอบแล้วใช้น้ำหรือไข่บาง ๆ ช่วยปิด')
    ],
    substitutions: [
      ml('Ready-rolled all-butter puff pastry is a practical substitute when homemade puff pastry is not the focus of the dish.', '若重點不在自製酥皮，可用現成全奶油千層酥皮替代。', '自家製パイ生地が主役でない場合は、市販のオールバターのパフペストリーで代用できます。', '직접 퍼프 페이스트리를 만드는 것이 핵심이 아니라면 시판 올버터 퍼프 페이스트리를 써도 좋습니다.', 'ถ้าไม่ได้เน้นทำพัฟเพสตรีเอง ใช้พัฟเพสตรีเนยล้วนแบบสำเร็จรูปได้'),
      ml('When a recipe uses ale or wine in the filling, unsalted stock can replace it; reduce the stock enough to avoid a watery filling.', '餡料中的啤酒或葡萄酒可改成無鹽高湯，但要充分收汁，避免餡料過水。', '具のエールやワインは無塩のだしに替えられますが、水っぽくならないよう十分に煮詰めます。', '속재료의 에일이나 와인은 무염 육수로 바꿀 수 있지만 물기가 많지 않도록 충분히 졸이세요.', 'เอลหรือไวน์ในไส้เปลี่ยนเป็นสต๊อกไม่เค็มได้ แต่ต้องเคี่ยวให้พองวดเพื่อไม่ให้ไส้แฉะ')
    ]
  },
  roast: {
    tips: [
      ml('Use an instant-read thermometer for large joints; time alone cannot account for shape, starting temperature and oven variation.', '大塊烤肉用即時溫度計判斷；單靠時間無法補償肉形、起始溫度與烤箱差異。', '大きな塊肉は即読温度計で確認します。時間だけでは形、開始温度、オーブン差を補えません。', '큰 고기 덩어리는 즉석 온도계로 확인하세요. 시간만으로는 모양, 시작 온도, 오븐 차이를 반영할 수 없습니다.', 'เนื้อชิ้นใหญ่ควรใช้เทอร์โมมิเตอร์อ่านเร็ว เพราะเวลาอย่างเดียวชดเชยรูปทรง อุณหภูมิเริ่มต้น และความต่างของเตาไม่ได้'),
      ml('Rest roasted meat before carving so the temperature evens out and less juice escapes onto the board.', '烤肉切片前要充分靜置，讓溫度均勻，也能減少肉汁流到砧板上。', 'ロースト肉は切る前に休ませ、温度を均一にして肉汁がまな板へ流れ出る量を減らします。', '구운 고기는 썰기 전에 휴지시켜 온도를 고르게 하고 육즙이 도마로 빠지는 양을 줄이세요.', 'พักเนื้อย่างก่อนหั่นเพื่อให้อุณหภูมิกระจายตัวและลดน้ำที่ไหลออกบนเขียง')
    ],
    commonMistakes: [
      ml('Putting a wet, cold joint straight into a crowded pan slows browning; dry it well and leave room for hot air to circulate.', '濕冷的大塊肉直接塞進擁擠烤盤會拖慢上色；先擦乾並留足熱風流通空間。', '濡れた冷たい塊肉を狭い天板に入れると焼き色が遅れるため、よく拭き、熱気が回る空間を取ります。', '젖고 차가운 고기를 비좁은 팬에 바로 넣으면 갈변이 느려지므로 잘 말리고 뜨거운 공기가 돌 공간을 남기세요.', 'เนื้อชื้นและเย็นที่ยัดลงถาดแน่นจะขึ้นสีช้า ควรซับให้แห้งและเว้นที่ให้อากาศร้อนหมุนเวียน'),
      ml('Carving immediately after roasting releases more juice and gives uneven slices; respect the stated resting time.', '烤好立刻切會流失更多肉汁，切面也較不均；要遵守食譜的靜置時間。', '焼き上がってすぐ切ると肉汁が多く流れ、切り口も不均一になるため、指定の休ませ時間を守ります。', '굽자마자 썰면 육즙이 더 많이 빠지고 단면이 고르지 않으므로 제시된 휴지 시간을 지키세요.', 'หั่นทันทีหลังอบทำให้น้ำเนื้อไหลมากและชิ้นไม่สม่ำเสมอ ควรพักตามเวลาที่ระบุ')
    ],
    substitutions: [
      ml('Choose another roasting cut of similar thickness and tenderness, then judge the finish by internal temperature rather than copying time blindly.', '可換厚度與嫩度相近的烘烤部位，並以中心溫度判定，不要直接照搬烤時。', '同程度の厚みと柔らかさのロースト用部位に替え、時間をそのまま写さず中心温度で仕上がりを判断します。', '두께와 연도가 비슷한 로스팅 부위로 바꾸고 시간만 그대로 따르지 말고 중심 온도로 익힘을 판단하세요.', 'เปลี่ยนเป็นชิ้นเนื้อย่างที่หนาและนุ่มใกล้เคียงกันได้ แล้วดูความสุกจากอุณหภูมิแกนแทนการยึดเวลาเดิม'),
      ml('Beef dripping can be replaced with a neutral high-heat oil, though the roast and Yorkshire pudding will lose some traditional savoury flavour.', '牛油滴脂可換成耐高溫中性油，但烤肉與 Yorkshire pudding 會少一些傳統肉香。', '牛脂は高温向けの中性油に替えられますが、ローストとヨークシャープディングの伝統的な香ばしさは少し弱まります。', '소기름은 고온용 중성유로 바꿀 수 있지만 로스트와 요크셔 푸딩의 전통적인 고소한 풍미가 조금 줄어듭니다.', 'ไขมันวัวใช้แทนน้ำมันรสกลางทนความร้อนสูงได้ แต่กลิ่นคาวหวานแบบดั้งเดิมของโรสต์และยอร์กเชียร์พุดดิ้งจะลดลง')
    ]
  },
  breakfast: {
    tips: [
      ml('Cook components in a deliberate order and hold only the sturdy items warm; eggs and toast should be finished last.', '按耐放程度安排順序，只把耐保溫的配料先完成；蛋與吐司最後才做。', '調理順を決め、保温に強い品だけ先に温かく保ちます。卵とトーストは最後に仕上げます。', '조리 순서를 정해 보온에 강한 재료만 먼저 따뜻하게 두고 달걀과 토스트는 마지막에 마무리하세요.', 'จัดลำดับการปรุงและพักอุ่นเฉพาะสิ่งที่ทนได้ ไข่กับขนมปังควรทำเป็นอย่างสุดท้าย'),
      ml('Use separate zones or pans when possible so bacon, mushrooms, tomatoes and eggs keep their own texture instead of steaming together.', '可以的話分鍋或分區煮，讓培根、蘑菇、番茄與蛋各自保留質地，不要全部互相蒸軟。', '可能なら鍋や場所を分け、ベーコン、きのこ、トマト、卵を一緒に蒸し状態にせず、それぞれの食感を保ちます。', '가능하면 팬이나 구역을 나눠 베이컨, 버섯, 토마토, 달걀이 함께 쪄지지 않고 각자의 식감을 유지하게 하세요.', 'ถ้าเป็นไปได้แบ่งกระทะหรือพื้นที่ปรุง เพื่อให้เบคอน เห็ด มะเขือเทศ และไข่คงเนื้อสัมผัสของตัวเองแทนการนึ่งรวมกัน')
    ],
    commonMistakes: [
      ml('Trying to finish every component in one pan at the same moment usually leaves some items cold and others overcooked.', '想在同一鍋、同一時間點完成所有配料，通常會變成有些冷、有些過熟。', 'すべてを同じ鍋で同時に完成させようとすると、一部が冷たく、一部が過加熱になりがちです。', '모든 구성요소를 한 팬에서 동시에 끝내려 하면 일부는 식고 일부는 과하게 익기 쉽습니다.', 'พยายามทำทุกอย่างในกระทะเดียวให้เสร็จพร้อมกันมักทำให้บางอย่างเย็นและบางอย่างสุกเกิน'),
      ml('Salting mushrooms too early can draw out water before they brown; let them colour first, then season.', '蘑菇太早加鹽會先出水、妨礙上色；先煎出顏色再調味。', 'きのこに早く塩をすると水が出て焼き色が付きにくいため、色づいてから調味します。', '버섯에 너무 일찍 소금을 치면 물이 나와 갈변이 늦으므로 먼저 색을 낸 뒤 간하세요.', 'ใส่เกลือเห็ดเร็วเกินไปจะดึงน้ำออกมาก่อนขึ้นสี ควรผัดให้มีสีก่อนแล้วค่อยปรุง')
    ],
    substitutions: [
      ml('Use a good coarse pork sausage when a specific regional British sausage is unavailable.', '買不到特定英國地方香腸時，可用質地粗、肉味明顯的優質豬肉香腸。', '特定地域の英国ソーセージがなければ、粗挽きで質のよい豚ソーセージを使います。', '특정 영국 지역 소시지가 없으면 굵게 간 좋은 품질의 돼지고기 소시지를 쓰세요.', 'ถ้าไม่มีไส้กรอกอังกฤษเฉพาะถิ่น ใช้ไส้กรอกหมูเนื้อหยาบคุณภาพดีแทน'),
      ml('If black pudding is unavailable, omit it rather than replacing it with a sweet or strongly spiced sausage that changes the breakfast profile.', '買不到血腸時寧可省略，不要用甜味或重香料香腸亂替，會改變整盤早餐風格。', 'ブラックプディングがなければ、甘いソーセージや強い香辛料のものに置き換えず省きます。', '블랙푸딩이 없으면 달거나 향신료가 강한 소시지로 바꾸기보다 생략하는 편이 전체 아침의 성격을 지킵니다.', 'ถ้าไม่มีแบล็กพุดดิ้ง ควรงดแทนการใช้ไส้กรอกหวานหรือเครื่องเทศจัดที่เปลี่ยนบุคลิกของจาน')
    ]
  },
  simmered: {
    tips: [
      ml('Brown or toast flavour-building ingredients before adding the main liquid; simmering cannot recreate that roasted depth later.', '先把建立風味的材料煎香或烘香，再加入主要液體；進入燉煮後很難補回這層焦香。', '風味の土台になる材料は主な液体を加える前に焼き付けたり炒ったりします。煮始めてからではその香ばしさを作れません。', '향을 만드는 재료는 주된 액체를 넣기 전에 볶거나 구워 풍미를 내세요. 끓이기 시작한 뒤에는 그 구수한 깊이를 만들기 어렵습니다.', 'ทำสีหรือคั่ววัตถุดิบสร้างรสก่อนเติมของเหลวหลัก เพราะพอเคี่ยวแล้วจะสร้างความหอมคั่วแบบนั้นกลับมาไม่ได้'),
      ml('Keep the simmer gentle once dairy, fish or tender meat is present so the texture stays intact and the sauce does not split.', '加入乳製品、魚或嫩肉後維持溫和小滾，避免質地破碎或醬汁分離。', '乳製品、魚、柔らかい肉が入ったら穏やかな煮立ちにし、身崩れやソースの分離を防ぎます。', '유제품, 생선, 부드러운 고기가 들어간 뒤에는 약하게 끓여 식감이 무너지거나 소스가 분리되지 않게 하세요.', 'เมื่อมีนม ปลา หรือเนื้อนุ่มแล้ว ให้เคี่ยวเบา ๆ เพื่อรักษาเนื้อสัมผัสและไม่ให้ซอสแตกมัน')
    ],
    commonMistakes: [
      ml('Boiling hard after dairy is added can split the sauce or toughen fish and chicken; reduce the heat before the final simmer.', '加入乳製品後大滾容易讓醬汁分離，也會讓魚或雞肉變柴；最後燉煮前先降火。', '乳製品を加えてから強く沸騰させるとソースが分離し、魚や鶏肉も硬くなるため、仕上げの煮込み前に火を弱めます。', '유제품을 넣은 뒤 세게 끓이면 소스가 분리되고 생선이나 닭고기가 질겨질 수 있으니 마지막 끓임 전에 불을 낮추세요.', 'ต้มแรงหลังใส่นมทำให้ซอสแตกและปลา/ไก่แข็ง ควรลดไฟก่อนเคี่ยวช่วงท้าย'),
      ml('Seasoning only at the end can leave the base flat; season in restrained stages, then make the final adjustment after reduction.', '只在最後一次加鹽會讓底味空；分階段保守調味，收汁後再做最後修正。', '最後だけで調味すると土台が弱くなるため、控えめに段階調味し、煮詰まってから最終調整します。', '마지막에만 간하면 기본 맛이 밋밋해질 수 있으니 단계마다 조금씩 간하고 졸인 뒤 최종 조정하세요.', 'ปรุงรสเฉพาะท้ายสุดทำให้ฐานรสจืด ควรปรุงทีละน้อยเป็นช่วง ๆ แล้วปรับสุดท้ายหลังงวด')
    ],
    substitutions: [
      ml('Use an unsalted stock when replacing another cooking liquid so you retain control of the final salt concentration.', '替換燉煮液時優先用無鹽高湯，才能控制最後收汁後的鹹度。', '別の煮汁に替える場合は無塩のだしを使い、煮詰めた後の塩分を調整できるようにします。', '조리 액체를 바꿀 때는 무염 육수를 써서 졸인 뒤 최종 염도를 조절할 수 있게 하세요.', 'เมื่อเปลี่ยนของเหลวปรุง ใช้สต๊อกไม่เค็มเพื่อควบคุมความเค็มหลังเคี่ยวให้งวด'),
      ml('When a particular smoked fish or chilli is unavailable, choose a substitute with similar smoke level or heat rather than simply matching colour.', '買不到特定燻魚或辣椒時，要匹配煙燻強度或辣度，不要只看顏色替換。', '特定の燻製魚や唐辛子がなければ、色ではなく燻香や辛さが近いものを選びます。', '특정 훈제 생선이나 고추가 없으면 색보다 훈연 강도나 매운맛이 비슷한 것으로 고르세요.', 'หากไม่มีปลารมหรือพริกเฉพาะ ให้เลือกตามระดับกลิ่นควันหรือความเผ็ดที่ใกล้เคียง ไม่ใช่ดูแค่สี')
    ]
  },
  toast: {
    tips: [
      ml('Toast the bread before adding the topping so it stays crisp underneath the hot cheese mixture.', '先把麵包烤脆再加起司醬，底部才不會被熱餡料泡軟。', '熱いチーズをのせる前にパンを焼き、下面のカリッとした食感を保ちます。', '뜨거운 치즈 혼합물을 올리기 전에 빵을 구워 밑면의 바삭함을 유지하세요.', 'ปิ้งขนมปังก่อนโปะชีสเพื่อให้ด้านล่างยังกรอบเมื่อเจอส่วนผสมร้อน'),
      ml('Use a mature, flavourful cheese and melt it gently; high heat can make aged cheese oily before it becomes smooth.', '用成熟、風味濃的起司並溫和融化；火太大會讓熟成起司先出油、還沒變滑順。', '熟成した風味の強いチーズを弱めの火で溶かします。強火だと滑らかになる前に油が分離します。', '숙성되고 풍미가 진한 치즈를 약한 불에서 녹이세요. 센 불은 매끈해지기 전에 기름을 분리시킵니다.', 'ใช้ชีสรสเข้มที่บ่มดีและละลายไฟอ่อน ไฟแรงทำให้ชีสมันแยกก่อนเนียน')
    ],
    commonMistakes: [
      ml('A thin cheese mixture runs off the toast under the grill; cook it until spreadable and cohesive before topping the bread.', '起司醬太稀進烤架就會流掉；先煮到能抹開、但有黏合力，再塗麵包。', 'チーズ液が薄いとグリルで流れるため、パンにのせる前に塗れる程度のまとまりまで煮ます。', '치즈 혼합물이 너무 묽으면 그릴에서 흘러내리므로 빵에 올리기 전에 발릴 정도로 한 덩어리감 있게 조리하세요.', 'ส่วนผสมชีสที่เหลวจะไหลจากขนมปังใต้เตาย่าง ควรทำให้ข้นพอปาดได้ก่อนโปะ'),
      ml('Walking away under a hot grill is risky; the surface can go from bubbling to burnt very quickly.', '高溫上火不能離開；表面從冒泡到焦黑可能非常快。', '強いグリルでは目を離さず、泡立ちから焦げまで非常に速く進むことがあります。', '센 그릴 아래에서는 자리를 비우지 마세요. 표면이 보글거리다 타는 과정이 매우 빠를 수 있습니다.', 'อย่าละสายตาจากเตาย่างร้อน ผิวหน้าจากเดือดเป็นไหม้อาจเกิดขึ้นเร็วมาก')
    ],
    substitutions: [
      ml('A sharp mature cheddar is a practical stand-in for a Welsh farmhouse cheese when the latter is unavailable.', '買不到威爾斯農莊起司時，可用味道尖銳的熟成 cheddar 實用替代。', 'ウェールズの農家製チーズがなければ、熟成したシャープなチェダーが実用的な代用になります。', '웨일스 팜하우스 치즈가 없으면 풍미가 선명한 숙성 체더를 쓰면 좋습니다.', 'ถ้าไม่มีชีสฟาร์มเวลส์ ใช้เชดดาร์บ่มรสเข้มแทนได้ดี'),
      ml('Use a malty non-alcoholic beer or a little milk plus extra mustard when ale is unsuitable, adjusting gradually for thickness.', '不適合用 ale 時，可改麥芽味無酒精啤酒，或少量牛奶加一點芥末，分次加入控制稠度。', 'エールが使えない場合は麦芽風味のノンアルコールビール、または少量の牛乳とマスタードを使い、濃度を見ながら加えます。', '에일을 쓰기 어렵다면 몰트 향의 무알코올 맥주나 우유 소량과 머스터드를 쓰고 농도를 보며 조금씩 넣으세요.', 'หากใช้เอลไม่ได้ ใช้เบียร์ไร้แอลกอฮอล์รสมอลต์ หรือใส่นมนิดหน่อยกับมัสตาร์ดเพิ่ม โดยค่อย ๆ ปรับความข้น')
    ]
  },
  dessert: {
    tips: [
      ml('Weigh flour and sugar rather than measuring by volume; small ratio errors are much more obvious in baked puddings and custards.', '麵粉與糖用秤重，不要靠體積量；烤布丁與卡士達對比例小誤差很敏感。', '小麦粉と砂糖は容量でなく重量を量ります。焼き菓子やカスタードでは小さな配合差が大きく出ます。', '밀가루와 설탕은 부피보다 무게로 재세요. 구운 푸딩과 커스터드는 작은 비율 오차가 크게 드러납니다.', 'ชั่งแป้งและน้ำตาลแทนตวงด้วยปริมาตร เพราะพุดดิ้งอบและคัสตาร์ดเห็นความคลาดเคลื่อนเล็ก ๆ ชัดเจน'),
      ml('Let hot sponge or custard cool for the stated time before assembly so cream, jelly or sauce keeps the intended texture.', '熱蛋糕或卡士達要依指定時間降溫再組裝，鮮奶油、果凍或醬汁才不會被熱度破壞質地。', '熱いスポンジやカスタードは指定時間冷ましてから組み立て、クリーム、ゼリー、ソースの食感を守ります。', '뜨거운 스펀지나 커스터드는 제시된 시간만큼 식힌 뒤 조립해 크림, 젤리, 소스의 식감을 유지하세요.', 'ปล่อยสปอนจ์หรือคัสตาร์ดร้อนให้เย็นตามเวลาที่กำหนดก่อนประกอบ เพื่อให้ครีม เยลลี หรือซอสคงเนื้อสัมผัส')
    ],
    commonMistakes: [
      ml('Overmixing after flour is added develops too much gluten and makes a pudding or sponge heavy.', '加入麵粉後過度攪拌會形成太多麵筋，讓布丁蛋糕或海綿蛋糕偏重。', '小麦粉を加えてから混ぜすぎるとグルテンが出すぎ、プディングやスポンジが重くなります。', '밀가루를 넣은 뒤 너무 많이 섞으면 글루텐이 과하게 생겨 푸딩이나 스펀지가 무거워집니다.', 'คนมากเกินไปหลังใส่แป้งทำให้กลูเตนมากและพุดดิ้งหรือสปอนจ์แน่น'),
      ml('Adding warm custard or sauce directly to whipped cream collapses the air and gives a loose finish; cool the cooked component first.', '溫熱卡士達或醬汁直接碰鮮奶油會讓氣泡塌掉、成品鬆垮；熟成材料要先降溫。', '温かいカスタードやソースをホイップクリームに直接合わせると気泡が潰れて緩くなるため、加熱した部分を先に冷まします。', '따뜻한 커스터드나 소스를 휘핑크림에 바로 넣으면 공기가 꺼져 묽어지므로 익힌 재료를 먼저 식히세요.', 'ใส่คัสตาร์ดหรือซอสอุ่นลงวิปครีมตรง ๆ ทำให้อากาศยุบและเนื้อเหลว จึงต้องพักส่วนที่ปรุงให้เย็นก่อน')
    ],
    substitutions: [
      ml('Use full-fat dairy with a similar fat content when replacing cream or milk so the set and richness remain predictable.', '替換鮮奶油或牛奶時，用脂肪含量接近的全脂乳製品，凝固與濃郁度才可預測。', '生クリームや牛乳を替える場合は脂肪分の近い全脂乳製品を使い、固まり方とコクを保ちます。', '크림이나 우유를 바꿀 때는 지방 함량이 비슷한 전지 유제품을 써서 굳기와 풍미를 예측 가능하게 하세요.', 'ถ้าเปลี่ยนครีมหรือนม ให้ใช้ผลิตภัณฑ์นมไขมันเต็มที่ที่มีไขมันใกล้เคียง เพื่อให้การเซ็ตและความเข้มข้นคงเดิม'),
      ml('If alcohol is omitted from a dessert, replace only the needed moisture with juice or syrup rather than adding an equal amount blindly.', '甜點省略酒精時，只補回實際需要的水分，可用果汁或糖漿，不要機械式等量替換。', '菓子から酒を省く場合は、同量を機械的に足さず、必要な水分だけ果汁やシロップで補います。', '디저트에서 술을 빼면 같은 양을 무조건 넣지 말고 필요한 수분만 주스나 시럽으로 보충하세요.', 'ถ้าตัดแอลกอฮอล์ออกจากของหวาน ให้เติมเฉพาะความชื้นที่จำเป็นด้วยน้ำผลไม้หรือน้ำเชื่อม ไม่ต้องแทนเท่ากันทั้งหมด')
    ]
  }
};

export function makeBritishRecipe(recipe) {
  const { profile = 'pastry', additionalSources = [], ...data } = recipe;
  const defaults = profiles[profile] || profiles.pastry;
  return {
    cuisine: 'british',
    region: ml('United Kingdom', '英國', 'イギリス', '영국', 'สหราชอาณาจักร'),
    sources: [...(britishRecipeSources[recipe.id] || []), ...additionalSources],
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
  '炸物最好現吃。剩食 2 小時內降溫並以 0–4°C 冷藏最多 1 天；回熱時不加蓋，用高溫烤箱加熱至外皮回脆、中心熱透。',
  '揚げ物は出来たてが最適です。残りは2時間以内に冷まして0–4°Cで1日まで冷蔵し、蓋をせず高温のオーブンでカリッと中心まで熱く戻します。',
  '튀김은 바로 먹는 것이 가장 좋습니다. 남은 음식은 2시간 안에 식혀 0–4°C에서 1일까지 냉장하고 덮지 않은 채 뜨거운 오븐에서 바삭하고 속까지 뜨겁게 데우세요.',
  'ของทอดอร่อยที่สุดเมื่อกินทันที ของเหลือให้เย็นและแช่ 0–4°C ภายใน 2 ชั่วโมงไม่เกิน 1 วัน แล้วอุ่นแบบไม่ปิดฝาในเตาร้อนจนกรอบและร้อนทั่ว'
);

export const chilledDessertStorage = ml(
  'Keep covered at 0–4°C and use within 2 days. Return the dessert to the refrigerator promptly after serving and do not leave it at room temperature for more than 2 hours.',
  '加蓋置 0–4°C 冰箱並於 2 天內食用；上桌後盡快放回冰箱，室溫不要放超過 2 小時。',
  '覆って0–4°Cで保存し2日以内に食べます。提供後はすぐ冷蔵庫へ戻し、室温に2時間以上置きません。',
  '덮어서 0–4°C에 보관해 2일 안에 드세요. 낸 뒤에는 빨리 냉장고에 되돌리고 실온에 2시간 넘게 두지 마세요.',
  'ปิดฝาเก็บที่ 0–4°C และกินภายใน 2 วัน หลังเสิร์ฟให้นำกลับเข้าตู้เย็นเร็ว และอย่าวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง'
);
