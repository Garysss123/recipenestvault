export const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body) => ({ title, body });

const thailand = ml("Thailand", "泰國", "タイ", "태국", "ประเทศไทย");

const profileNotes = {
  "hot-pan": {
    tips: [
      ml("Measure the sauce and prepare every garnish before heating the wok; Thai stir-fries move too quickly to pause once cooking starts.", "炒鍋開火前先量好醬汁並備齊配料；泰式快炒開始後節奏很快，不適合中途停下找材料。", "中華鍋を熱する前にたれと薬味をすべて用意します。タイの炒め物は始まると速く進みます。", "웍을 달구기 전에 소스와 고명을 모두 준비하세요. 태국식 볶음은 시작하면 멈출 틈이 없습니다.", "ตวงซอสและเตรียมเครื่องทั้งหมดก่อนตั้งกระทะ เพราะผัดไทยทำเร็วและหยุดกลางทางไม่ได้"),
      ml("Use the stated texture and safe centre temperature as the finish line; pan size and burner strength can shift the clock by several minutes.", "以步驟指定的口感與安全中心溫度判斷完成；鍋徑與爐火可能讓時間前後差數分鐘。", "記載した食感と安全な中心温度で仕上がりを判断し、時間だけに頼りません。", "표시된 식감과 안전 중심 온도로 완성을 판단하세요. 팬 크기와 화력에 따라 시간은 달라집니다.", "ยึดเนื้อสัมผัสและอุณหภูมิใจกลางที่ระบุเป็นหลัก เพราะขนาดกระทะและไฟทำให้เวลาเปลี่ยนได้")
    ],
    commonMistakes: [
      ml("Crowding a cool pan makes meat and noodles release water instead of browning; cook protein in batches when it cannot lie in one layer.", "冷鍋塞太滿會讓肉與麵出水而不上色；蛋白質無法單層平放時要分批。", "低温の鍋に詰め込むと水が出るため、一層に並ばない場合は分けて炒めます。", "덜 달군 팬을 가득 채우면 물이 나옵니다. 단백질이 한 겹으로 놓이지 않으면 나눠 익히세요.", "ใส่ของแน่นในกระทะที่ยังไม่ร้อนทำให้คายน้ำ หากเนื้อวางชั้นเดียวไม่ได้ให้แบ่งผัด"),
      ml("Do not keep adding fish sauce before the liquid reduces; make the final salt adjustment only after the sauce coats the food.", "湯汁尚未收濃前不要一直補魚露；醬汁能包覆食材後再做最後鹹度調整。", "煮汁が絡む前にナンプラーを足し続けず、仕上げに塩味を調整します。", "소스가 졸기 전에 피시소스를 계속 넣지 말고 재료를 코팅한 뒤 마지막 간을 맞추세요.", "อย่าเติมน้ำปลาซ้ำก่อนน้ำงวด ปรับเค็มสุดท้ายเมื่อซอสเคลือบอาหารแล้ว")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 2 days, and reheat only once until steaming and the centre reaches 74°C.", "2 小時內放涼，密封冷藏最多 2 天；只回熱一次，直到冒蒸氣且中心達 74°C。", "2時間以内に冷まし、密閉冷蔵2日以内にします。再加熱は一度だけ、湯気が立ち中心74°Cまで温めます。", "2시간 안에 식혀 밀폐 냉장 2일 이내 보관하고 한 번만, 김이 나며 중심 74°C까지 데우세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 2 วัน และอุ่นเพียงครั้งเดียวจนมีไอและใจกลางถึง 74°C")
  },
  "curry-soup": {
    tips: [
      ml("Fry curry paste in the thick coconut cream until fragrant and glossy before adding thin liquid; this builds aroma without scorching the paste.", "先用濃椰漿把咖哩醬炒到出香發亮，再加入較稀液體；能建立香氣又不把醬炒焦。", "濃いココナッツミルクでペーストを香りよく艶が出るまで炒めてから液体を加えます。", "진한 코코넛밀크에 커리 페이스트를 향긋하고 윤기 나게 볶은 뒤 묽은 액체를 넣으세요.", "ผัดพริกแกงกับหัวกะทิจนหอมและขึ้นเงาก่อนเติมของเหลว เพื่อดึงกลิ่นโดยไม่ให้ไหม้"),
      ml("Balance salty, sweet, sour, and heat only after the main ingredients are tender; reduction changes all four.", "主食材軟熟後才平衡鹹、甜、酸、辣；收汁會同時改變四種味道。", "主材料が柔らかくなってから塩味、甘味、酸味、辛味を整えます。煮詰まりで味が変わります。", "주재료가 부드러워진 뒤 짠맛, 단맛, 신맛, 매운맛을 맞추세요. 졸면서 네 맛이 모두 변합니다.", "ปรับเค็ม หวาน เปรี้ยว เผ็ดหลังวัตถุดิบหลักนุ่ม เพราะการเคี่ยวทำให้ทั้งสี่รสเปลี่ยน")
    ],
    commonMistakes: [
      ml("A violent boil can split coconut milk and toughen meat; keep the pot at the steady simmer specified in each step.", "猛烈沸騰會讓椰漿油水分離、肉變硬；依步驟維持穩定小滾。", "激しく沸騰させるとココナッツミルクが分離し肉が硬くなるため、指定の煮立ちを守ります。", "세게 끓이면 코코넛밀크가 분리되고 고기가 질겨집니다. 단계에 적힌 잔잔한 끓임을 유지하세요.", "การเดือดพล่านทำให้กะทิแตกมันและเนื้อเหนียว รักษาเดือดปุดตามที่ระบุ"),
      ml("Adding lime juice while boiling dulls its fresh aroma; turn off the heat first whenever the method calls for lime.", "萊姆汁遇大滾會失去清香；步驟要求加萊姆時務必先關火。", "ライム果汁は沸騰中に入れると香りが弱くなるため、火を止めてから加えます。", "라임즙은 끓일 때 넣으면 향이 죽습니다. 라임을 넣는 단계에서는 먼저 불을 끄세요.", "น้ำมะนาวที่ต้มจะเสียกลิ่นสด ปิดไฟก่อนเสมอเมื่อวิธีระบุให้ใส่มะนาว")
    ],
    storage: ml("Cool within 2 hours and refrigerate airtight for up to 3 days. Reheat to a steady simmer and at least 74°C throughout; add fresh lime only after reheating.", "2 小時內放涼並密封冷藏最多 3 天。回熱至穩定小滾且各處至少 74°C；萊姆汁在回熱完成後再補。", "2時間以内に冷まし密閉冷蔵3日以内にします。全体を74°C以上まで温め、ライムは再加熱後に加えます。", "2시간 안에 식혀 밀폐 냉장 3일 이내 보관하세요. 전체가 74°C 이상 되게 끓이고 라임은 데운 뒤 넣으세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 3 วัน อุ่นให้เดือดปุดและทั่วถึงอย่างน้อย 74°C แล้วค่อยเติมมะนาวสด")
  },
  fresh: {
    tips: [
      ml("Dry washed produce thoroughly so the measured dressing stays concentrated instead of turning watery.", "洗過的蔬果要徹底瀝乾，量好的醬汁才不會被水分稀釋。", "洗った野菜は十分に水気を切り、たれが薄まらないようにします。", "씻은 채소의 물기를 완전히 빼 계량한 드레싱이 묽어지지 않게 하세요.", "ซับผักที่ล้างให้แห้งสนิท น้ำปรุงที่ตวงไว้จะได้ไม่จาง"),
      ml("Pound or toss only until the vegetables bruise and absorb dressing; they should still snap when bitten.", "只搗拌到蔬菜輕微破壁並吸收醬汁，入口仍應爽脆。", "野菜に軽く味が入り、噛むと歯切れが残るところで止めます。", "채소에 살짝 멍이 들어 양념이 배되 씹을 때 아삭함이 남을 정도만 버무리세요.", "ตำหรือคลุกแค่ให้ผักช้ำและรับน้ำปรุง แต่ยังกัดกรอบ")
    ],
    commonMistakes: [
      ml("Overworking papaya, herbs, or shallots makes the salad limp and bitter; use controlled strokes and stop as soon as it is seasoned.", "過度搗打青木瓜、香草或紅蔥會軟爛發苦；力道要控制，入味即停。", "青パパイヤや香草を潰しすぎるとしんなりして苦くなるため、味がなじんだら止めます。", "파파야, 허브, 샬롯을 지나치게 치대면 축 처지고 씁니다. 간이 배면 멈추세요.", "ตำมะละกอ สมุนไพร หรือหอมมากไปทำให้เหี่ยวและขม ใช้แรงพอดีและหยุดเมื่อรสเข้า"),
      ml("Do not leave lime-dressed salad at room temperature; serve promptly and discard after 2 hours.", "拌入萊姆汁的沙拉不要久放室溫；立即上桌，超過 2 小時即丟棄。", "ライムで和えたサラダは常温に置かず、すぐ供し、2時間を超えたら廃棄します。", "라임으로 무친 샐러드는 실온에 두지 말고 바로 내며 2시간이 지나면 버리세요.", "อย่าวางยำที่คลุกมะนาวไว้ที่อุณหภูมิห้อง เสิร์ฟทันทีและทิ้งเมื่อเกิน 2 ชั่วโมง")
    ],
    storage: ml("Best served immediately. If needed, refrigerate airtight for up to 1 day; keep dressing separate when the method allows and do not freeze.", "最好立即食用；必要時密封冷藏最多 1 天，做法允許時醬汁分開保存，不可冷凍。", "できたてが最良です。必要なら密閉冷蔵1日以内にし、可能ならたれを別にして冷凍しません。", "바로 먹는 것이 가장 좋습니다. 필요하면 밀폐 냉장 1일 이내 보관하고 가능할 때 소스는 따로 두며 냉동하지 마세요.", "ดีที่สุดเมื่อเสิร์ฟทันที หากจำเป็นแช่เย็นปิดสนิทได้ 1 วัน แยกน้ำปรุงเมื่อทำได้และไม่แช่แข็ง")
  },
  grill: {
    tips: [
      ml("Keep skewers or chicken pieces the stated size so the outside can caramelize before the centre overcooks.", "肉串或雞塊維持指定尺寸，才能在中心過熟前讓表面焦糖化。", "串や鶏肉を指定サイズにそろえ、中心が加熱しすぎる前に表面を香ばしくします。", "꼬치나 닭고기 크기를 표시대로 맞춰 속이 지나치게 익기 전에 겉을 캐러멜화하세요.", "ทำชิ้นเนื้อหรือไก่ตามขนาดที่ระบุ เพื่อให้ผิวเกรียมก่อนด้านในสุกเกิน"),
      ml("Use a thermometer at the thickest point and move browned pieces to a cooler zone while they finish cooking.", "在最厚處量中心溫度；表面已上色的肉移到較低溫區完成熟成。", "最も厚い部分で温度を測り、焼き色が付いたら弱い場所で中まで加熱します。", "가장 두꺼운 곳의 온도를 재고, 갈색이 난 조각은 약한 쪽에서 속까지 익히세요.", "วัดอุณหภูมิจุดหนาสุด และย้ายชิ้นที่เกรียมแล้วไปโซนไฟอ่อนจนสุก")
    ],
    commonMistakes: [
      ml("Sugary marinades burn over constant high heat; sear first, then reduce or move the food away from direct flame.", "含糖醃料持續大火會焦黑；先上色，再降火或移離直火。", "糖分のあるたれは強火で焦げるため、焼き色を付けたら火を弱めます。", "당분 있는 양념은 계속 센 불에 두면 탑니다. 먼저 색을 낸 뒤 불을 낮추세요.", "น้ำหมักหวานไหม้เมื่อโดนไฟแรงตลอด ย่างให้สีแล้วลดไฟหรือย้ายออกจากเปลวตรง"),
      ml("Never brush cooked food with marinade that touched raw meat unless that marinade has boiled for at least 1 minute.", "接觸過生肉的醃汁不可直接刷在熟食上，除非先煮沸至少 1 分鐘。", "生肉に触れたたれは1分以上沸騰させない限り、加熱済みの肉に塗りません。", "생고기에 닿은 양념은 최소 1분 끓이지 않았다면 익힌 음식에 바르지 마세요.", "อย่าทาน้ำหมักที่สัมผัสเนื้อดิบลงบนของสุก เว้นแต่ต้มเดือดอย่างน้อย 1 นาที")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 3 days, and reheat covered until the centre reaches 74°C. Store sauces separately.", "2 小時內放涼，密封冷藏最多 3 天；加蓋回熱至中心 74°C，醬汁分開保存。", "2時間以内に冷まし密閉冷蔵3日以内にし、覆って中心74°Cまで温めます。たれは別に保存します。", "2시간 안에 식혀 밀폐 냉장 3일 이내 보관하고 덮어 중심 74°C까지 데우며 소스는 따로 보관하세요.", "ทำให้เย็นใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 3 วัน อุ่นปิดจนใจกลาง 74°C และเก็บซอสแยก")
  },
  starch: {
    tips: [
      ml("Prepare sauce, protein, vegetables, and garnish before cooking rice or noodles; the target texture will not wait.", "米飯或麵開始下鍋前先備好醬汁、蛋白質、蔬菜與配料；理想口感不耐久等。", "ご飯や麺を加熱する前に、たれ、肉、野菜、薬味を用意します。", "밥이나 면을 익히기 전에 소스, 단백질, 채소, 고명을 모두 준비하세요.", "เตรียมซอส เนื้อ ผัก และเครื่องก่อนทำข้าวหรือเส้น เพราะเนื้อพอดีรอไม่ได้"),
      ml("Judge noodles by flexibility and bite, not packet time alone; brand, width, and humidity change absorption.", "麵條以柔韌度與咬感判斷，不只看包裝時間；品牌、寬度與濕度都會改變吸水速度。", "袋の時間だけでなく、しなやかさと歯ごたえで判断します。", "봉지 시간만 보지 말고 유연함과 씹힘으로 판단하세요. 제품과 굵기에 따라 달라집니다.", "ดูความยืดหยุ่นและการกัดของเส้น ไม่ยึดเวลาบนซองอย่างเดียว เพราะยี่ห้อ ความกว้าง และความชื้นมีผล")
    ],
    commonMistakes: [
      ml("Over-soaked noodles break in the wok; stop soaking while the centre is still slightly firm because sauce finishes the cooking.", "麵泡到全軟會在炒鍋裡斷裂；中心仍略硬時就瀝乾，後續由醬汁完成熟成。", "麺は中心が少し硬いうちに水切りし、たれで仕上げます。", "면을 완전히 불리면 웍에서 끊어집니다. 가운데가 약간 단단할 때 건져 소스에서 마저 익히세요.", "เส้นที่แช่นิ่มเกินขาดในกระทะ สะเด็ดตอนกลางยังแข็งเล็กน้อยแล้วให้ซอสทำให้สุกต่อ"),
      ml("Warm rice clumps steam instead of fry; cool it uncovered, then separate every grain before it reaches the pan.", "溫熱飯糰會在鍋裡悶蒸而非炒香；先攤涼，再把米粒撥散下鍋。", "温かい塊のご飯は蒸れてしまうため、冷まして粒をほぐします。", "따뜻하게 뭉친 밥은 볶이지 않고 찝니다. 식힌 뒤 알알이 풀어 넣으세요.", "ข้าวอุ่นเป็นก้อนจะนึ่งแทนผัด พักให้เย็นและคลายเมล็ดก่อนลงกระทะ")
    ],
    storage: ml("Cool within 2 hours and refrigerate airtight for up to 2 days. Reheat only once until steaming and 74°C throughout; do not keep cooked rice at room temperature.", "2 小時內放涼並密封冷藏最多 2 天。只回熱一次，直到冒蒸氣且各處達 74°C；熟飯不可留在室溫。", "2時間以内に冷まし密閉冷蔵2日以内にします。一度だけ全体74°Cまで再加熱し、ご飯を常温に置きません。", "2시간 안에 식혀 밀폐 냉장 2일 이내 보관하고 한 번만 전체 74°C까지 데우며 익힌 밥을 실온에 두지 마세요.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 2 วัน อุ่นเพียงครั้งเดียวให้ทั่วถึง 74°C และอย่าวางข้าวสุกที่อุณหภูมิห้อง")
  },
  dessert: {
    tips: [
      ml("Use Thai glutinous rice and soak it fully; ordinary jasmine rice cannot reproduce the chewy, separate grains.", "使用泰國糯米並完整浸泡；一般茉莉香米無法做出帶嚼感又粒粒分明的質地。", "タイのもち米を十分浸水し、ジャスミン米で代用しません。", "태국 찹쌀을 충분히 불리세요. 일반 재스민 쌀로는 쫄깃하고 분리된 식감이 나지 않습니다.", "ใช้ข้าวเหนียวไทยและแช่ให้เต็มที่ ข้าวหอมมะลิธรรมดาให้เนื้อหนึบแยกเมล็ดแบบเดียวไม่ได้"),
      ml("Pour warm coconut mixture over hot steamed rice, then cover and rest so absorption happens without crushing the grains.", "溫椰漿倒入剛蒸好的熱糯米後加蓋靜置，讓米粒完整吸收而不被攪碎。", "温かいココナッツ液を蒸したての熱い米に注ぎ、覆って吸わせます。", "따뜻한 코코넛물을 갓 찐 뜨거운 쌀에 붓고 덮어 두어 알을 으깨지 않고 흡수시키세요.", "เทกะทิอุ่นลงบนข้าวเหนียวนึ่งร้อน ปิดพักให้ดูดซึมโดยไม่บดเมล็ด")
    ],
    commonMistakes: [
      ml("Boiling coconut milk hard makes it oily and dull; warm only until sugar and salt dissolve.", "椰漿猛烈沸騰會油水分離、香氣變鈍；只加熱到糖鹽溶解。", "ココナッツミルクは激しく沸かさず、砂糖と塩が溶けるまで温めます。", "코코넛밀크를 세게 끓이면 기름지고 향이 둔해집니다. 설탕과 소금이 녹을 만큼만 데우세요.", "อย่าต้มกะทิแรงจนแตกมัน อุ่นแค่น้ำตาลและเกลือละลาย"),
      ml("Cut mango only when the rice is ready; exposed slices soften, darken, and leak juice.", "糯米完成後再切芒果；切片久放會軟化、變色並出汁。", "米が仕上がってからマンゴーを切り、変色と水分流出を防ぎます。", "밥이 준비된 뒤 망고를 자르세요. 미리 자르면 물러지고 색이 변하며 즙이 나옵니다.", "หั่นมะม่วงเมื่อข้าวพร้อมแล้ว ชิ้นที่เปิดไว้นานจะนิ่ม คล้ำ และคายน้ำ")
    ],
    storage: ml("Best the day it is made. Refrigerate rice and coconut sauce separately for up to 1 day; re-steam rice until hot and add freshly cut mango. Do not freeze assembled portions.", "當天食用最佳。糯米與椰漿分開冷藏最多 1 天；糯米回蒸至熱後再配現切芒果，不可冷凍組合成品。", "当日が最良です。米とソースを別に冷蔵1日以内にし、米を蒸し直して切りたてのマンゴーを添えます。", "만든 날 먹는 것이 가장 좋습니다. 밥과 코코넛 소스를 따로 냉장 1일 보관하고 밥을 다시 찐 뒤 갓 자른 망고를 곁들이세요.", "ดีที่สุดในวันที่ทำ แช่ข้าวกับซอสกะทิแยกกันได้ 1 วัน นึ่งข้าวให้ร้อนแล้วใส่มะม่วงหั่นใหม่ ไม่แช่แข็งทั้งชุด")
  }
};

const foundation = ["Thailand Foundation — Secrets to Thai Cooking", "https://thailandfoundation.or.th/secrets-to-thai-cooking/"];
const thaiTable = ["ThaiTable — Authentic Thai recipes", "https://www.thaitable.com/recipes"];
const recipeSources = {
  "pad-thai": [["Hot Thai Kitchen — Pad Thai", "https://hot-thai-kitchen.com/best-pad-thai/"], ["Thailand Foundation — Pad Thai", "https://thailandfoundation.or.th/th/853/"]],
  "tom-yum-goong": [["Hot Thai Kitchen — Tom Yum Goong", "https://hot-thai-kitchen.com/tom-yum-goong/"], ["Thailand Foundation — Tom Yum Kung", "https://thailandfoundation.or.th/tom-yum-kung-the-symbol-of-thai-culinary-spirit/"]],
  "green-curry-chicken": [["Hot Thai Kitchen — Green Curry", "https://hot-thai-kitchen.com/green-curry-new-2/"], foundation],
  "massaman-curry": [["Hot Thai Kitchen — Beef Massaman Curry", "https://hot-thai-kitchen.com/beef-massaman-curry/"], foundation],
  "pad-kra-pao": [["Hot Thai Kitchen — Pad Kra Pao", "https://hot-thai-kitchen.com/pad-kra-pao-anything/"], ["Eating Thai Food — Pad Kra Pao", "https://www.eatingthaifood.com/thai-basil-chicken-recipe-pad-kra-pao-gai/"]],
  "som-tam": [["Hot Thai Kitchen — Green Papaya Salad", "https://hot-thai-kitchen.com/papaya-salad-v3/"], ["Eating Thai Food — Green Papaya Salad", "https://www.eatingthaifood.com/thai-green-papaya-salad-recipe/"]],
  "khao-pad": [["ThaiTable — Thai Fried Rice", "https://www.thaitable.com/recipes/fried-rice"], foundation],
  "khao-man-gai": [["Hot Thai Kitchen — Hainanese Chicken Rice", "https://hot-thai-kitchen.com/hainanese-chicken-rice/"], ["Eating Thai Food — Khao Man Gai", "https://www.eatingthaifood.com/chicken-rice-khao-man-gai-recipe/"]],
  "mango-sticky-rice": [["Hot Thai Kitchen — Mango Sticky Rice", "https://hot-thai-kitchen.com/mango-sticky-rice/"], ["ThaiTable — Mango on Sticky Rice", "https://www.thaitable.com/recipes/mango-on-sticky-rice"]],
  "larb-moo": [["Hot Thai Kitchen — Laab Moo", "https://hot-thai-kitchen.com/laab-moo/"], ["Eating Thai Food — Larb", "https://www.eatingthaifood.com/thai-larb-recipe/"]],
  "pad-see-ew": [["Hot Thai Kitchen — Pad See Ew", "https://hot-thai-kitchen.com/pad-see-ew-new/"], ["ThaiTable — Pad See Ew", "https://www.thaitable.com/recipes/pad-see-ew"]],
  "khao-soi": [["Hot Thai Kitchen — Khao Soi", "https://hot-thai-kitchen.com/kao-soi/"], foundation],
  "tom-kha-gai": [["Hot Thai Kitchen — Tom Kha Gai", "https://hot-thai-kitchen.com/tom-ka-gai/"], ["Eating Thai Food — Tom Kha Gai", "https://www.eatingthaifood.com/tom-kha-gai-recipe-%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%97%E0%B8%B3-%E0%B8%95%E0%B9%89%E0%B8%A1%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88/"]],
  "panang-curry": [["Hot Thai Kitchen — Panang Curry", "https://hot-thai-kitchen.com/panang-curry/"], ["Thailand Foundation — Phanaeng Curry", "https://thailandfoundation.or.th/phanaeng-curry-a-thai-culinary-delight/"]],
  "red-curry-pork": [["Hot Thai Kitchen — Thai Red Curry", "https://hot-thai-kitchen.com/red-curry-chicken-squash/"], foundation],
  "moo-satay": [["Hot Thai Kitchen — Satay and Peanut Sauce", "https://hot-thai-kitchen.com/satay-and-peanut-sauce/"], ["Thailand Foundation — Thai New Year Feast", "https://thailandfoundation.or.th/thai-recipes-for-your-new-year-feast/"]],
  "moo-ping": [["Hot Thai Kitchen — Thai BBQ Pork Skewers", "https://hot-thai-kitchen.com/bbq-pork-skewers/"], ["ThaiTable — Grilled Pork Moo Ping", "https://www.thaitable.com/recipes/grilled-pork"]],
  "gai-yang": [["Hot Thai Kitchen — Thai BBQ Chicken", "https://hot-thai-kitchen.com/ultimate-bbq-chicken/"], ["Thailand Foundation — Thai New Year Feast", "https://thailandfoundation.or.th/thai-recipes-for-your-new-year-feast/"]],
  "tod-mun-pla": [["Hot Thai Kitchen — Thai Fish Cakes", "https://hot-thai-kitchen.com/fish-cakes/"], ["ThaiTable — Tod Mun", "https://www.thaitable.com/recipes/tod-mun"]],
  "boat-noodles": [["Hot Thai Kitchen — Boat Noodles", "https://hot-thai-kitchen.com/boat-noodles/"], thaiTable],
  "pineapple-fried-rice": [["Hot Thai Kitchen — Pineapple Fried Rice", "https://hot-thai-kitchen.com/pineapple-fried-rice/"], thaiTable]
};

export function makeThaiRecipe(recipe) {
  const notes = profileNotes[recipe.profile];
  if (!notes) throw new Error(`${recipe.id}: unknown Thai recipe profile ${recipe.profile}`);
  const sources = recipeSources[recipe.id];
  if (!sources) throw new Error(`${recipe.id}: missing Thai recipe sources`);
  return {
    cuisine: "thai",
    region: thailand,
    ...recipe,
    tips: recipe.tips ?? notes.tips,
    commonMistakes: recipe.commonMistakes ?? notes.commonMistakes,
    substitutions: recipe.substitutions,
    storage: recipe.storage ?? notes.storage,
    sources: sources.map(([title, url]) => ({ title, url }))
  };
}
