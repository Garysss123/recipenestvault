export const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body) => ({ title, body });

const korea = ml("South Korea", "韓國", "韓国", "대한민국", "เกาหลีใต้");

const profileNotes = {
  "hot-pan": {
    tips: [
      ml("Cut pieces to an even thickness and preheat the pan before the first batch so the food browns instead of steaming.", "食材厚薄切一致，第一批下鍋前先把鍋預熱，才能上色而不是悶出水。", "厚みをそろえて切り、最初の材料を入れる前に鍋を十分温めると、蒸れずに焼き色が付きます。", "재료 두께를 고르게 맞추고 첫 재료를 넣기 전에 팬을 예열해야 찌듯 익지 않고 갈색이 납니다.", "หั่นให้หนาเท่ากันและอุ่นกระทะก่อนลงชุดแรก เพื่อให้อาหารเกรียมแทนที่จะคายน้ำเหมือนนึ่ง"),
      ml("Keep the stated doneness target beside the stove; heat strength and pan size change the clock more than the recipe does.", "把指定熟度標準放在爐邊核對；爐火與鍋具尺寸造成的時間差，往往比食譜本身更大。", "記載した火の通りの目安を手元で確認してください。火力と鍋の大きさで所要時間は変わります。", "표시된 익힘 기준을 조리대 옆에서 확인하세요. 화력과 팬 크기에 따라 시간은 달라집니다.", "วางเกณฑ์ความสุกไว้ข้างเตา เพราะความแรงไฟและขนาดกระทะทำให้เวลาเปลี่ยนได้มาก")
    ],
    commonMistakes: [
      ml("Crowding the pan drops its temperature and leaves meat pale and watery; cook in batches when the pieces overlap.", "食材重疊會讓鍋溫下降，肉色蒼白又出水；放不下就分批煎。", "材料を重ねると鍋の温度が下がり、水っぽくなるため、重なる場合は分けて焼きます。", "팬을 빽빽하게 채우면 온도가 내려가 고기가 창백하고 물러집니다. 겹치면 나눠 익히세요.", "การใส่แน่นทำให้อุณหภูมิลด เนื้อซีดและมีน้ำ หากชิ้นซ้อนกันให้แบ่งทอด"),
      ml("Do not keep cooking after the listed texture or safe centre temperature is reached; carryover heat continues the cooking.", "達到指定口感或安全中心溫度後不要繼續加熱，餘溫仍會讓食材變熟。", "記載の食感または安全な中心温度に達したら加熱を続けず、余熱も考慮します。", "표시된 식감이나 안전 중심 온도에 도달한 뒤 계속 익히지 마세요. 잔열로도 익습니다.", "อย่าปรุงต่อหลังได้เนื้อสัมผัสหรืออุณหภูมิใจกลางที่กำหนด เพราะความร้อนคงค้างยังทำให้อาหารสุกต่อ")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 3 days, and reheat only once until steaming and the centre reaches 74°C.", "2 小時內放涼，密封冷藏最多 3 天；只回熱一次，直到冒蒸氣且中心達 74°C。", "2時間以内に冷まし、密閉して冷蔵3日以内にします。再加熱は一度だけにし、湯気が立って中心が74°Cになるまで温めます。", "2시간 안에 식혀 밀폐 냉장 3일 이내 보관하고 한 번만, 김이 나며 중심이 74°C가 될 때까지 데우세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 3 วัน และอุ่นเพียงครั้งเดียวจนมีไอและใจกลางถึง 74°C")
  },
  stew: {
    tips: [
      ml("Taste only after the main paste or kimchi has simmered; its salt and acidity become clearer in the broth.", "主醬料或泡菜煮開後再試味，鹹度與酸度融入湯中才準確。", "主なみそやキムチを煮てから味見すると、塩味と酸味を正しく判断できます。", "주된 장이나 김치가 끓은 뒤 맛을 보세요. 국물에 염도와 산미가 퍼진 뒤 간을 판단해야 합니다.", "ชิมหลังต้มพริกแกงหรือกิมจิแล้ว เพราะความเค็มและเปรี้ยวจะชัดขึ้นในน้ำซุป"),
      ml("Keep a lively simmer, not a violent boil, so the broth concentrates without breaking delicate tofu or vegetables.", "維持明顯小滾而非猛烈翻滾，湯味能濃縮又不會把嫩豆腐或蔬菜煮碎。", "激しく沸騰させず、しっかりした弱めの煮立ちを保つと、豆腐や野菜を崩さず味がまとまります。", "세게 끓이지 말고 활발한 약불을 유지하면 국물은 진해지고 연두부나 채소는 부서지지 않습니다.", "ให้เดือดปุดชัดแต่ไม่พล่าน เพื่อให้น้ำซุปเข้มขึ้นโดยไม่ทำให้เต้าหู้หรือผักแตก")
    ],
    commonMistakes: [
      ml("Adding all seasoning before the broth reduces can make the final stew too salty; reserve the last adjustment for the end.", "湯汁收濃前把調味全加完，成品容易過鹹；最後一段調味留到起鍋前。", "煮詰まる前に調味料を全て入れると塩辛くなるため、最後の調整は仕上げにします。", "국물이 졸기 전에 양념을 모두 넣으면 완성 국물이 짤 수 있으니 마지막 간은 끝에 맞추세요.", "ใส่เครื่องปรุงทั้งหมดก่อนน้ำงวดอาจทำให้เค็มเกิน ควรปรับรสสุดท้ายตอนจบ"),
      ml("Once soft tofu is added, stir with a spoon only where necessary; repeated stirring turns the stew cloudy and fragmented.", "嫩豆腐下鍋後只在必要處用湯匙輕推，反覆攪動會讓湯混濁、豆腐碎散。", "柔らかい豆腐を加えた後は必要な所だけスプーンで動かし、混ぜすぎないようにします。", "연두부를 넣은 뒤에는 필요한 곳만 숟가락으로 움직이세요. 계속 저으면 국물이 흐려지고 두부가 부서집니다.", "เมื่อใส่เต้าหู้อ่อนแล้วให้ขยับเฉพาะจำเป็น การคนซ้ำทำให้น้ำขุ่นและเต้าหู้แตก")
    ],
    storage: ml("Cool within 2 hours and refrigerate airtight for up to 3 days. Reheat to a full simmer and at least 74°C throughout; do not repeatedly cool and reheat the same pot.", "2 小時內放涼並密封冷藏最多 3 天。回熱至整鍋明顯沸騰且各處至少 74°C；同一鍋不要反覆冷卻回熱。", "2時間以内に冷まし、密閉冷蔵3日以内にします。全体をしっかり煮立たせ74°C以上にし、同じ鍋を何度も冷却・再加熱しません。", "2시간 안에 식혀 밀폐 냉장 3일 이내 보관하세요. 전체가 끓고 최소 74°C가 되도록 데우며 같은 냄비를 반복해서 식히고 데우지 마세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 3 วัน อุ่นให้เดือดทั่วและอย่างน้อย 74°C อย่าทำหม้อเดิมให้เย็นและอุ่นซ้ำหลายครั้ง")
  },
  starch: {
    tips: [
      ml("Prepare every sauce and garnish before cooking the rice, noodles, or cakes; starch waits badly once it reaches the target texture.", "米飯、麵或年糕開始加熱前先備好醬料與配料；澱粉到達理想口感後不耐久放。", "ご飯、麺、餅を加熱する前にたれと具を用意します。でんぷん質は適度な食感になった後、待たせると劣化します。", "밥, 면, 떡을 익히기 전에 소스와 고명을 모두 준비하세요. 전분은 알맞게 익은 뒤 오래 기다리면 식감이 나빠집니다.", "เตรียมซอสและเครื่องทั้งหมดก่อนทำข้าว เส้น หรือแป้งต็อก เพราะแป้งที่ได้เนื้อพอดีแล้วรอไม่ดี"),
      ml("Use the texture test in the method rather than the packet time alone; thickness, brand, and storage age all matter.", "以步驟中的口感判斷為準，不只看包裝時間；粗細、品牌與存放時間都會影響熟成速度。", "袋の表示時間だけでなく、手順の食感の目安で判断します。太さ、銘柄、保存期間で変わります。", "봉지 시간만 보지 말고 조리법의 식감 기준으로 판단하세요. 두께, 제품, 보관 기간에 따라 달라집니다.", "ใช้การทดสอบเนื้อสัมผัสในวิธีทำ ไม่พึ่งเวลาบนซองอย่างเดียว เพราะความหนา ยี่ห้อ และอายุการเก็บมีผล")
    ],
    commonMistakes: [
      ml("Leaving cooked starch undrained or uncovered too long makes it sticky or dry; move directly to the next stated step.", "煮好的澱粉食材瀝水後久放或長時間裸露，會黏結或乾硬；應立即接續下一步。", "加熱後のでんぷん質を水切りしたまま、またはむき出しで長く置くと、べたつくか乾くため、すぐ次の工程へ進みます。", "익힌 전분을 물에 두거나 그대로 오래 놓으면 붙거나 마릅니다. 바로 다음 단계로 진행하세요.", "การทิ้งแป้งสุกค้างในน้ำหรือเปิดไว้นานทำให้เหนียวหรือแห้ง ควรทำขั้นถัดไปทันที"),
      ml("Adding all liquid at once can make the dish soupy; use the measured amount and reduce to the exact coating described.", "一次倒入過多液體會讓成品水汪汪；按量加入並收至步驟指定的包覆狀態。", "液体を一度に多く入れると水っぽくなるため、計量どおりに加え、記載の絡み具合まで煮詰めます。", "액체를 한꺼번에 많이 넣으면 묽어집니다. 계량한 양을 쓰고 설명된 농도까지 졸이세요.", "การใส่ของเหลวมากทีเดียวทำให้แฉะ ใช้ตามปริมาณและเคี่ยวจนเคลือบตามที่ระบุ")
    ],
    storage: ml("Cool within 2 hours and refrigerate airtight for up to 2 days. Reheat with only enough water to loosen, until steaming and 74°C; cold noodle dishes follow their separate storage note.", "2 小時內放涼並密封冷藏最多 2 天。回熱只加足以鬆開的少量水，直到冒蒸氣且達 74°C；冷麵另依其保存說明。", "2時間以内に冷まし、密閉冷蔵2日以内にします。ほぐれる最小限の水で、湯気が立ち74°Cになるまで温めます。冷たい麺は個別の保存説明に従います。", "2시간 안에 식혀 밀폐 냉장 2일 이내 보관하세요. 풀릴 정도의 물만 넣고 김이 나며 74°C가 될 때까지 데우세요. 냉면은 별도 보관법을 따르세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 2 วัน อุ่นโดยเติมน้ำเพียงให้คลายตัวจนมีไอและถึง 74°C เมนูเส้นเย็นให้ทำตามหมายเหตุเฉพาะ")
  },
  batter: {
    tips: [
      ml("Keep the batter cold and mix only until no dry flour remains; a few small lumps are better than a tough pancake.", "麵糊保持低溫，只拌到看不見乾粉；少量小顆粒比過度攪拌造成韌硬更好。", "生地を冷たく保ち、粉気が消えるまでだけ混ぜます。小さなだまは、混ぜすぎて硬くなるよりよい状態です。", "반죽을 차갑게 유지하고 마른 가루가 사라질 때까지만 섞으세요. 작은 덩어리는 질긴 전보다 낫습니다.", "รักษาแป้งให้เย็นและคนแค่ไม่เห็นผงแห้ง ก้อนเล็กน้อยดีกว่าคนจนแพนเค้กเหนียว"),
      ml("Use enough oil to contact the whole base and wait for a crisp edge before turning; this prevents tearing.", "油量要能接觸整個底面，等邊緣酥脆再翻面，才不會破裂。", "底面全体に油が当たる量を使い、縁がカリッとしてから返すと破れません。", "바닥 전체에 기름이 닿게 하고 가장자리가 바삭해진 뒤 뒤집어야 찢어지지 않습니다.", "ใช้น้ำมันให้สัมผัสฐานทั่วและรอจนขอบกรอบก่อนกลับ จะช่วยไม่ให้ขาด")
    ],
    commonMistakes: [
      ml("A thick pancake burns outside before the centre sets; spread the measured batter into the stated pan size.", "餅身過厚會外焦內生；把指定麵糊攤到步驟所列鍋徑。", "厚すぎると中が固まる前に外側が焦げるため、指定サイズの鍋に計量した生地を広げます。", "전이 두꺼우면 속이 익기 전에 겉이 탑니다. 계량한 반죽을 표시된 팬 크기로 펴세요.", "แผ่นหนาจะไหม้นอกก่อนกลางสุก ให้เกลี่ยแป้งตามปริมาณในกระทะขนาดที่ระบุ"),
      ml("Turning before the underside is firm makes the pancake fold or split; lift one edge and check its colour first.", "底面尚未定型就翻面會折裂；先掀一角確認顏色。", "底が固まる前に返すと折れたり裂けたりするため、端を持ち上げて色を確認します。", "바닥이 굳기 전에 뒤집으면 접히거나 찢어집니다. 한쪽을 들어 색을 먼저 확인하세요.", "กลับก่อนด้านล่างอยู่ตัวทำให้พับหรือแตก ให้ยกขอบตรวจสีก่อน")
    ],
    storage: ml("Cool on a rack within 2 hours, refrigerate airtight for up to 2 days, and re-crisp in a lightly oiled pan until the centre reaches 74°C.", "2 小時內放在網架上冷卻，密封冷藏最多 2 天；以少量油回煎至酥，中心達 74°C。", "2時間以内に網で冷まし、密閉冷蔵2日以内にします。少量の油で焼き直し、中心が74°Cになるまで温めます。", "2시간 안에 식힘망에서 식혀 밀폐 냉장 2일 이내 보관하고 기름을 살짝 두른 팬에서 중심 74°C까지 다시 바삭하게 구우세요.", "พักบนตะแกรงให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 2 วัน แล้วทอดกระทะน้ำมันบาง ๆ ให้กรอบและใจกลางถึง 74°C")
  },
  dumpling: {
    tips: [
      ml("Mix the filling until tacky and keep unused wrappers covered; cohesive filling and flexible skins seal cleanly.", "餡料拌到黏稠，未使用的皮保持覆蓋；有黏性的餡與柔軟外皮才容易封緊。", "あんに粘りが出るまで混ぜ、使っていない皮は覆います。まとまるあんと柔らかい皮ならきれいに閉じられます。", "소는 끈기가 나도록 섞고 쓰지 않는 피는 덮어 두세요. 점성 있는 소와 촉촉한 피가 잘 붙습니다.", "คนไส้จนเหนียวและคลุมแผ่นที่ยังไม่ใช้ ไส้เกาะตัวกับแผ่นนุ่มจะปิดสนิท"),
      ml("Cook one tester first, check seasoning and the 74°C centre, then adjust the raw filling before shaping the rest.", "先煮一顆測試，確認調味與中心 74°C，再調整生餡後包完其餘。", "まず1個加熱して味と中心74°Cを確認し、生のあんを調整してから残りを包みます。", "한 개를 먼저 익혀 간과 중심 74°C를 확인하고 생소를 조절한 뒤 나머지를 빚으세요.", "ปรุงชิ้นทดสอบก่อน ตรวจรสและใจกลาง 74°C แล้วปรับไส้ดิบก่อนห่อที่เหลือ")
    ],
    commonMistakes: [
      ml("Overfilling forces moisture into the seam; use the measured filling per wrapper and press out trapped air.", "餡塞太多會把水分擠進封口；每張皮按指定量包，並排出空氣。", "詰めすぎると水分が合わせ目へ押し出されるため、皮1枚の分量を守り、空気を抜きます。", "소를 너무 많이 넣으면 수분이 이음새로 밀립니다. 피당 계량한 양을 쓰고 공기를 빼세요.", "ใส่ไส้มากเกินดันความชื้นเข้ารอยปิด ใช้ไส้ตามปริมาณต่อแผ่นและไล่อากาศ"),
      ml("Do not stack freshly cooked dumplings; trapped steam softens the skins and makes them stick.", "剛煮好的餃子不要堆疊，蒸氣會使皮變軟黏住。", "加熱直後の餃子は重ねず、蒸気で皮が柔らかくなり貼り付くのを防ぎます。", "갓 익힌 만두를 쌓지 마세요. 갇힌 김 때문에 피가 물러지고 붙습니다.", "อย่าซ้อนเกี๊ยวที่เพิ่งสุก ไอน้ำที่ค้างทำให้แผ่นนิ่มและติดกัน")
    ],
    storage: ml("Cool within 2 hours and refrigerate cooked mandu airtight for up to 2 days. Steam again until the pork centre reaches 74°C; freeze uncooked mandu in one layer before bagging for up to 1 month.", "2 小時內放涼，熟饅頭密封冷藏最多 2 天；再次蒸至豬肉中心 74°C。生饅頭先單層凍硬再裝袋，可冷凍 1 個月。", "2時間以内に冷まし、加熱済みマンドゥは密閉冷蔵2日以内にします。豚あんの中心74°Cまで蒸し直します。生は一層で凍らせてから袋に入れ、1か月保存できます。", "2시간 안에 식혀 익힌 만두를 밀폐 냉장 2일 이내 보관하고 돼지고기 중심 74°C까지 다시 찌세요. 생만두는 한 겹으로 얼린 뒤 봉지에 넣어 1개월 보관합니다.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เกี๊ยวสุกปิดสนิทได้ 2 วัน นึ่งซ้ำจนใจกลางหมูถึง 74°C เกี๊ยวดิบแช่แข็งชั้นเดียวก่อนใส่ถุงได้ 1 เดือน")
  },
  egg: {
    tips: [
      ml("Keep the heat low after the egg enters; gentle steam produces tender curds while high heat makes tunnels and a rubbery edge.", "蛋液入鍋後維持小火；柔和蒸氣形成嫩蛋，高火會產生孔洞與橡膠般邊緣。", "卵を入れた後は弱火にし、穏やかな蒸気で柔らかく仕上げます。強火は穴と硬い縁の原因です。", "달걀을 넣은 뒤 약불을 유지하세요. 부드러운 김은 연하게 익히고 센 불은 구멍과 질긴 가장자리를 만듭니다.", "หลังใส่ไข่ใช้ไฟอ่อน ไอน้ำเบาให้ลิ่มนุ่ม ไฟแรงทำรูและขอบยาง"),
      ml("Check the centre rather than the puffed edge; the centre must be fully set and reach 74°C before serving.", "檢查中心而不是膨起邊緣；上桌前中心須完全定型並達 74°C。", "膨らんだ縁ではなく中心を確認し、完全に固まり74°Cになってから供します。", "부푼 가장자리보다 중심을 확인해 완전히 굳고 74°C가 된 뒤 내세요.", "ตรวจกลางไม่ใช่ขอบฟู กลางต้องอยู่ตัวและถึง 74°C ก่อนเสิร์ฟ")
    ],
    commonMistakes: [
      ml("Whisking air into the raw egg creates large bubbles rather than a fine, even texture; keep the whisk below the surface.", "生蛋液打入過多空氣會形成大泡而非細緻組織；打蛋器保持液面下。", "泡立てると大きな気泡になるため、泡立て器を液面下に保ちます。", "날달걀에 공기를 많이 넣으면 고운 조직 대신 큰 거품이 생기므로 거품기를 액체 아래 둡니다.", "ตีอากาศมากทำฟองใหญ่แทนเนื้อละเอียด ให้ตะกร้ออยู่ใต้ผิว"),
      ml("Leaving the covered pot unattended can make the egg overflow and scorch; begin checking at the earliest stated time.", "加蓋後放著不管會溢鍋燒焦；從步驟所列最短時間開始檢查。", "ふたをした鍋を放置すると吹きこぼれるため、記載の最短時間から確認します。", "덮은 냄비를 방치하면 넘치고 타므로 표시된 가장 이른 시간부터 확인합니다.", "ปล่อยหม้อปิดไว้ทำให้ล้นและไหม้ เริ่มตรวจที่เวลาต่ำสุดที่ระบุ")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 1 day, and reheat gently until the centre reaches 74°C.", "2 小時內放涼，密封冷藏最多 1 天；輕柔回熱至中心 74°C。", "2時間以内に冷まし密閉冷蔵1日以内にし、中心74°Cまで穏やかに温めます。", "2시간 안에 식혀 밀폐 냉장 1일 이내 보관하고 중심 74°C까지 부드럽게 데웁니다.", "ทำให้เย็นใน 2 ชั่วโมง แช่ปิดสนิท 1 วัน อุ่นเบาจนกลาง 74°C")
  },
  boil: {
    tips: [
      ml("Maintain the gentle surface movement specified in the method; a hard boil tightens meat and clouds the cooking liquid.", "維持步驟指定的輕微水面擾動；猛烈沸騰會讓肉緊縮並使湯混濁。", "記載の静かな煮立ちを保ち、強い沸騰で肉を硬くしたり汁を濁らせないようにします。", "조리법의 약한 표면 움직임을 유지하세요. 세게 끓이면 고기가 조여지고 국물이 흐려집니다.", "รักษาผิวขยับเบาตามวิธี เดือดแรงทำเนื้อหดและน้ำขุ่น"),
      ml("Use both tenderness and centre temperature; either test alone can miss a tough or undercooked section in a large block.", "大塊肉同時檢查柔軟度與中心溫度；只看其中一項可能漏掉韌硬或未熟部位。", "大きな塊は柔らかさと中心温度の両方で判断し、硬い部分や生の部分を見逃しません。", "큰 고기는 부드러움과 중심 온도를 함께 확인해야 질기거나 덜 익은 부분을 놓치지 않습니다.", "ก้อนใหญ่ต้องดูทั้งความนุ่มและอุณหภูมิกลาง อย่างเดียวอาจพลาดส่วนเหนียวหรือดิบ")
    ],
    commonMistakes: [
      ml("Slicing immediately releases juices and produces ragged pieces; complete the stated rest before using a sharp knife.", "立刻切片會流失肉汁且切面破碎；按指定時間靜置後再用利刀。", "すぐ切ると肉汁が流れ形が崩れるため、記載どおり休ませてから鋭い包丁を使います。", "바로 썰면 육즙이 빠지고 모양이 흐트러지므로 표시된 만큼 쉰 뒤 날카로운 칼을 씁니다.", "หั่นทันทีทำให้น้ำไหลและชิ้นรุ่ย พักตามเวลาจึงใช้มีดคม"),
      ml("Do not return cooked meat to a board or utensils that touched it raw; prepare a clean slicing station during the simmer.", "熟肉不可放回接觸生肉的砧板或工具；煮肉期間準備乾淨切片區。", "加熱済み肉を生肉用のまな板や道具へ戻さず、煮ている間に清潔な場所を用意します。", "익힌 고기를 생고기에 닿은 도마나 도구에 다시 놓지 말고 삶는 동안 깨끗한 썰기 자리를 준비합니다.", "อย่าวางเนื้อสุกบนเขียงหรืออุปกรณ์ดิบ เตรียมจุดหั่นสะอาดระหว่างต้ม")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 3 days, and reheat covered until the centre reaches 74°C.", "2 小時內放涼，密封冷藏最多 3 天；加蓋回熱至中心 74°C。", "2時間以内に冷まし密閉冷蔵3日以内にし、覆って中心74°Cまで温めます。", "2시간 안에 식혀 밀폐 냉장 3일 이내 보관하고 덮어 중심 74°C까지 데웁니다.", "ทำให้เย็นใน 2 ชั่วโมง แช่ปิดสนิท 3 วัน อุ่นปิดจนกลาง 74°C")
  }
};

const recipeSources = {
  bibimbap: [["Maangchi — Bibimbap", "https://www.maangchi.com/recipe/bibimbap"], ["Korean Bapsang — Bibimbap", "https://www.koreanbapsang.com/bibimbap/"]],
  bulgogi: [["Maangchi — Bulgogi", "https://www.maangchi.com/recipe/bulgogi"], ["Korean Bapsang — Bulgogi", "https://www.koreanbapsang.com/bulgogi-korean-bbq-beef/"]],
  galbi: [["Maangchi — Galbi", "https://www.maangchi.com/recipe/galbi"], ["Korean Bapsang — Galbi", "https://www.koreanbapsang.com/galbikalbi-korean-bbq-short-ribs/"]],
  samgyeopsal: [["Maangchi — Samgyeopsal-gui", "https://www.maangchi.com/recipe/samgyeopsal-gui"], ["Korean Bapsang — Samgyupsal-gui", "https://www.koreanbapsang.com/samgyupsal-gui-grilled-pork-belly-and/"]],
  "kimchi-jjigae": [["Maangchi — Kimchi-jjigae", "https://www.maangchi.com/recipe/kimchi-jjigae"], ["Korean Bapsang — Kimchi jjigae", "https://www.koreanbapsang.com/kimchi-jjigae-kimchi-stew/"]],
  "doenjang-jjigae": [["Maangchi — Doenjang-jjigae", "https://www.maangchi.com/recipe/doenjang-jjigae"], ["Korean Bapsang — Doenjang jjigae", "https://www.koreanbapsang.com/doenjang-jjigae-korean-soy-bean-paste/"]],
  "sundubu-jjigae": [["Maangchi — Sundubu-jjigae", "https://www.maangchi.com/recipe/sundubu-jjigae"], ["Korean Bapsang — Kimchi soondubu jjigae", "https://www.koreanbapsang.com/kimchi-soondubu-jjigae-soft-tofu-stew-kimchi/"]],
  tteokbokki: [["Maangchi — Tteokbokki", "https://www.maangchi.com/recipe/tteokbokki"], ["Korean Bapsang — Tteokbokki", "https://www.koreanbapsang.com/tteokbokki-spicy-stir-fried-rice-cakes/"]],
  japchae: [["Maangchi — Japchae", "https://www.maangchi.com/recipe/japchae"], ["Korean Bapsang — Japchae", "https://www.koreanbapsang.com/japchae-korean-stir-fried-starch/"]],
  "kimchi-fried-rice": [["Maangchi — Kimchi-bokkeumbap", "https://www.maangchi.com/recipe/kimchi-bokkeumbap"], ["Korean Bapsang — Kimchi fried rice", "https://www.koreanbapsang.com/kimchi-fried-rice-kimchi-bokkeum-bap/"]],
  "haemul-pajeon": [["Maangchi — Haemul-pajeon", "https://www.maangchi.com/recipe/haemul-pajeon"], ["Korean Bapsang — Haemul pajeon", "https://www.koreanbapsang.com/haemul-pajeon/"]],
  "kimchi-jeon": [["Maangchi — Kimchijeon", "https://www.maangchi.com/recipe/kimchijeon"], ["My Korean Kitchen — Kimchi pancakes", "https://mykoreankitchen.com/kimchi-pancakes-kimchi-buchimgae/"]],
  mandu: [["Maangchi — Mandu", "https://www.maangchi.com/recipe/mandu"], ["Korean Bapsang — Mandu", "https://www.koreanbapsang.com/mandu-korean-dumplings_20/"]],
  gimbap: [["Maangchi — Gimbap", "https://www.maangchi.com/recipe/gimbap"], ["Korean Bapsang — Gimbap", "https://www.koreanbapsang.com/gimbapkimbap-korean-dried-seaweed-rolls/"]],
  dakgalbi: [["Maangchi — Dakgalbi", "https://www.maangchi.com/recipe/dakgalbi"], ["Korean Bapsang — Dak galbi", "https://www.koreanbapsang.com/dak-galbi/"]],
  jjajangmyeon: [["Maangchi — Jjajangmyeon", "https://www.maangchi.com/recipe/jjajangmyeon"], ["Korean Bapsang — Jajangmyeon", "https://www.koreanbapsang.com/jajangmyeon-noodles-in-black-bean-sauce/"]],
  "mul-naengmyeon": [["Maangchi — Naengmyeon", "https://www.maangchi.com/recipe/naengmyeon"], ["Korean Bapsang — Naengmyeon", "https://www.koreanbapsang.com/naengmyeon-cold-noodles/"]],
  kalguksu: [["Maangchi — Dak-kalguksu", "https://www.maangchi.com/recipe/dak-kalguksu"], ["Korean Bapsang — Dak kalguksu", "https://www.koreanbapsang.com/dak-kalguksu-chicken-noodle-soup/"]],
  "miyeok-guk": [["Maangchi — Miyeokguk", "https://www.maangchi.com/recipe/miyeokguk"], ["Korean Bapsang — Miyeok guk", "https://www.koreanbapsang.com/miyeok-guk-beef-seaweed-soup/"]],
  "gyeran-jjim": [["Maangchi — Ttukbaegi gyeranjjim", "https://www.maangchi.com/recipe/ttukbaegi-gyeranjjim"], ["Korean Bapsang — Gyeranjjim", "https://www.koreanbapsang.com/gyeranjjim-korean-steamed-eggs/"]],
  bossam: [["Maangchi — Bo-ssam", "https://www.maangchi.com/recipe/bo-ssam"], ["Korean Bapsang — Bossam", "https://www.koreanbapsang.com/bossam-boiled-pork-wraps/"]]
};

export function makeKoreanRecipe(recipe) {
  const notes = profileNotes[recipe.profile];
  if (!notes) throw new Error(`${recipe.id}: unknown Korean recipe profile ${recipe.profile}`);
  return {
    cuisine: "korean",
    region: korea,
    ...recipe,
    tips: recipe.tips ?? notes.tips,
    commonMistakes: recipe.commonMistakes ?? notes.commonMistakes,
    substitutions: recipe.substitutions,
    storage: recipe.storage ?? notes.storage,
    sources: recipeSources[recipe.id].map(([title, url]) => ({ title, url }))
  };
}
