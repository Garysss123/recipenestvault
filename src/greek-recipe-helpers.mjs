import { greekRecipeSources } from './greek-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  baked: {
    tips: [
      ml('Drain or reduce wet fillings before assembly so the baked layers set cleanly instead of steaming.', '組裝前先把濕餡瀝乾或收乾，烘烤後層次才會穩定，不會被蒸氣泡軟。', '水分の多い具は組み立て前にしっかり切り、焼成後の層を崩れにくくします。', '수분 많은 속재료는 조립 전에 충분히 빼서 구운 층이 눅눅해지지 않게 하세요.', 'สะเด็ดหรือเคี่ยวไส้ที่ชื้นก่อนประกอบ เพื่อให้ชั้นอาหารเซ็ตตัวและไม่แฉะจากไอน้ำ'),
      ml('Rest layered bakes before slicing; the short cooling period lets starch, cheese and sauces firm enough for clean portions.', '多層烘烤料理出爐後先靜置，讓澱粉、起司與醬汁稍微定型，切片會更完整。', '層状の料理は焼き上がり後に休ませると、でんぷんやチーズ、ソースが落ち着き、きれいに切れます。', '층을 쌓아 구운 요리는 잠시 식혀 전분과 치즈, 소스가 굳은 뒤 썰면 단면이 깔끔합니다.', 'พักอาหารอบเป็นชั้นก่อนหั่น เพื่อให้แป้ง ชีส และซอสเซ็ตตัวพอที่จะตัดได้สวย')
    ],
    commonMistakes: [
      ml('Assembling with watery vegetables makes the centre loose even when the top is browned.', '蔬菜含水過多就直接組裝，即使表面烤上色，中心仍會鬆散出水。', '水分の多い野菜をそのまま重ねると、表面が焼けても中心が水っぽくなります。', '물이 많은 채소를 그대로 조립하면 윗면이 갈색이어도 중심이 묽어집니다.', 'ประกอบด้วยผักที่มีน้ำมากทำให้ตรงกลางเหลวแม้หน้าจะเป็นสีน้ำตาลแล้ว'),
      ml('Cutting immediately after baking collapses the layers and releases hot sauce onto the plate.', '剛出爐就切會讓層次塌陷，也會把熱醬汁全部流到盤上。', '焼きたてをすぐ切ると層が崩れ、熱いソースが流れ出します。', '오븐에서 나오자마자 자르면 층이 무너지고 뜨거운 소스가 흘러나옵니다.', 'หั่นทันทีหลังอบทำให้ชั้นยุบและซอสร้อนไหลออกมา')
    ],
    substitutions: [
      ml('Use a comparable firm salty cheese when the specified Greek cheese is unavailable, then reduce added salt to compensate.', '買不到指定希臘起司時，可用質地結實、鹹味相近的起司替代，並相應減少額外用鹽。', '指定のギリシャチーズがなければ、塩気の近い硬めのチーズを使い、追加の塩を減らします。', '지정된 그리스 치즈가 없으면 비슷하게 단단하고 짭짤한 치즈를 쓰고 추가 소금을 줄이세요.', 'ถ้าไม่มีชีสกรีกที่ระบุ ใช้ชีสเนื้อแน่นเค็มใกล้เคียง แล้วลดเกลือที่เติม'),
      ml('For meat fillings, beef and lamb can be adjusted within the same total weight according to availability and preferred richness.', '肉餡可依取得性與想要的濃郁度調整牛肉與羊肉比例，但總重量維持相同。', '肉だねは牛とラムの比率を好みに合わせて変えても、総重量は同じに保ちます。', '고기 속은 소고기와 양고기 비율을 취향에 맞게 바꾸되 총중량은 유지하세요.', 'ไส้เนื้อสามารถปรับสัดส่วนเนื้อวัวกับแกะได้ตามที่หาได้ แต่คงน้ำหนักรวมเท่าเดิม')
    ]
  },
  simmer: {
    tips: [
      ml('Keep beans and braises at a steady gentle simmer so their centres soften before the liquid reduces too far.', '豆類與燉肉維持穩定小滾，讓中心先煮軟，再讓液體逐步收濃。', '豆や煮込みは穏やかな沸騰を保ち、中まで柔らかくしてから煮汁を詰めます。', '콩과 브레이즈는 잔잔하게 끓여 속이 부드러워진 뒤 국물이 졸게 하세요.', 'เคี่ยวถั่วและสตูว์เบา ๆ ให้ด้านในนุ่มก่อนที่น้ำจะงวดมากเกินไป'),
      ml('Finish acidity and salt near the end of cooking, especially after olives, feta, stock or preserved ingredients have contributed seasoning.', '酸度與鹹度留到後段校正，尤其橄欖、feta、高湯或醃漬食材本身都會帶入鹹味。', 'オリーブやフェタ、ストックなどの塩分が出た後、終盤に酸味と塩味を整えます。', '올리브, 페타, 육수 등에서 간이 나온 뒤 조리 후반에 산미와 소금을 맞추세요.', 'ปรับความเปรี้ยวและเค็มช่วงท้าย หลังมะกอก เฟตา สต๊อก หรือของหมักปล่อยรสแล้ว')
    ],
    commonMistakes: [
      ml('Hard boiling can split beans, tighten meat and reduce the sauce before the centre is tender.', '猛烈沸騰會讓豆子破裂、肉質收緊，還可能在中心變軟前把醬汁收乾。', '強く沸かすと豆が割れ、肉が締まり、柔らかくなる前に煮汁が減りすぎます。', '세게 끓이면 콩이 터지고 고기가 질겨지며 속이 익기 전에 소스가 줄어듭니다.', 'เดือดแรงทำให้ถั่วแตก เนื้อแข็ง และซอสงวดก่อนข้างในนุ่ม'),
      ml('Adding cold liquid late in cooking interrupts the simmer and lengthens the time needed for beans or meat to soften.', '後段加入冷液體會中斷燉煮溫度，讓豆類或肉類需要更久才軟。', '途中で冷たい液体を足すと温度が落ち、豆や肉が柔らかくなるまで時間が延びます。', '조리 후반에 찬 액체를 넣으면 끓는 흐름이 끊겨 콩이나 고기가 부드러워지는 시간이 늘어납니다.', 'เติมของเหลวเย็นช่วงท้ายทำให้อุณหภูมิตกและถั่วหรือเนื้อนุ่มช้าลง')
    ],
    substitutions: [
      ml('Use a similar dried bean of comparable size when the named Greek bean is unavailable and cook to tenderness rather than by the clock.', '買不到指定希臘豆類時，可換成大小相近的乾豆，並以軟嫩程度而非固定時間判斷完成。', '指定のギリシャ豆がなければ大きさの近い乾燥豆を使い、時間より柔らかさで判断します。', '지정된 그리스 콩이 없으면 크기가 비슷한 마른콩을 쓰고 시간보다 부드러움으로 익힘을 판단하세요.', 'ถ้าไม่มีถั่วกรีกที่ระบุ ใช้ถั่วแห้งขนาดใกล้เคียงและดูความนุ่มเป็นหลัก'),
      ml('Unsalted stock can replace part of the water in savoury soups and stews; season only after it has reduced.', '鹹味湯與燉菜可用無鹽高湯替代部分水，收汁後再調整鹽度。', 'スープや煮込みの水の一部は無塩ストックに替えられます。煮詰めてから塩を調整します。', '수프와 스튜의 물 일부는 무염 육수로 바꾸고 졸아든 뒤 간하세요.', 'ใช้น้ำสต๊อกไม่เค็มแทนน้ำบางส่วนได้ แล้วค่อยปรุงเกลือหลังน้ำงวด')
    ]
  },
  grill: {
    tips: [
      ml('Cut meat into even pieces and leave small gaps on skewers so every face can brown instead of steaming.', '肉切成大小一致並在串上留小縫，讓每一面能上色而不是互相蒸熟。', '肉は大きさをそろえ、串では少し間隔を空けて全体に焼き色を付けます。', '고기는 크기를 맞추고 꼬치 사이에 틈을 두어 찌듯 익지 않고 고르게 갈색 내세요.', 'หั่นเนื้อขนาดเท่ากันและเว้นช่องเล็กน้อยบนไม้ เพื่อให้ทุกด้านเกิดสีน้ำตาลแทนการนึ่ง'),
      ml('Rest grilled meat briefly before serving so its juices redistribute while the surface stays hot and aromatic.', '烤肉上桌前短暫靜置，讓肉汁重新分布，同時保留表面熱度與香氣。', '焼いた肉は短く休ませ、肉汁を落ち着かせてから熱いうちに出します。', '구운 고기는 잠깐 휴지시켜 육즙을 고르게 한 뒤 표면이 뜨거울 때 내세요.', 'พักเนื้อย่างสั้น ๆ ให้น้ำกระจายตัวก่อนเสิร์ฟขณะผิวยังร้อนหอม')
    ],
    commonMistakes: [
      ml('Crowding a pan or grill drops the surface temperature and gives pale meat with little char.', '煎鍋或烤架塞太滿會讓表面溫度下降，肉只會變白而缺少焦香。', 'フライパンやグリルを詰め込みすぎると温度が下がり、香ばしい焼き色が付きません。', '팬이나 그릴을 너무 빽빽하게 채우면 표면 온도가 떨어져 갈색과 향이 약해집니다.', 'ใส่กระทะหรือเตาย่างแน่นเกินไปทำให้อุณหภูมิลด เนื้อซีดและไม่หอมเกรียม'),
      ml('Over-marinating small pieces in strong acid can make their outer texture soft and mealy.', '小塊肉在強酸醃料中泡太久，外層可能變得鬆軟粉化。', '小さな肉を強い酸に長く漬けすぎると、表面が柔らかく粉っぽくなります。', '작은 고기를 강한 산성 양념에 너무 오래 재우면 겉면이 물러질 수 있습니다.', 'หมักชิ้นเนื้อเล็กในกรดแรงนานเกินไปทำให้ผิวนิ่มยุ่ย')
    ],
    substitutions: [
      ml('Boneless pork shoulder or neck can replace tenderloin when a juicier, richer skewer is preferred.', '若想要更有油脂、更多汁的肉串，可用去骨豬肩或豬頸取代里肌。', 'よりジューシーな串焼きなら、ヒレの代わりに骨なし肩肉や首肉を使えます。', '더 촉촉하고 진한 꼬치를 원하면 안심 대신 뼈 없는 돼지 어깨나 목살을 쓸 수 있습니다.', 'ถ้าต้องการไม้ย่างฉ่ำและเข้มข้นกว่า ใช้ไหล่หรือคอหมูไร้กระดูกแทนสันในได้'),
      ml('A ridged cast-iron pan can reproduce much of the browning when an outdoor grill is unavailable.', '沒有戶外烤架時，可用有紋鑄鐵烤盤做出接近的焦色。', '屋外グリルがなければ、溝付きの鋳鉄グリルパンで十分な焼き色を作れます。', '야외 그릴이 없으면 무쇠 그릴 팬으로 비슷한 갈색을 낼 수 있습니다.', 'ถ้าไม่มีเตาย่างกลางแจ้ง ใช้กระทะเหล็กร่องสร้างสีเกรียมใกล้เคียงได้')
    ]
  },
  fresh: {
    tips: [
      ml('Use ripe tomatoes and crisp cucumber at serving temperature; the salad depends more on ingredient quality than technique.', '番茄要成熟多汁、黃瓜要爽脆並接近上桌溫度；這道沙拉主要靠食材品質，而不是複雜技巧。', '完熟トマトと歯切れのよいきゅうりを使い、技術より素材の質を生かします。', '잘 익은 토마토와 아삭한 오이를 쓰고 복잡한 기술보다 재료 품질을 살리세요.', 'ใช้มะเขือเทศสุกฉ่ำและแตงกวากรอบ เพราะสลัดนี้พึ่งคุณภาพวัตถุดิบมากกว่าเทคนิค'),
      ml('Salt the vegetables lightly before the feta goes on top because feta and olives already contribute substantial salinity.', 'feta 與橄欖本身已有明顯鹹味，因此起司放上去前，蔬菜只需輕度調鹽。', 'フェタとオリーブに塩気があるので、野菜の塩は控えめにします。', '페타와 올리브가 짜므로 채소에는 소금을 가볍게만 넣으세요.', 'ใส่เกลือผักเพียงเล็กน้อย เพราะเฟตาและมะกอกมีความเค็มอยู่แล้ว')
    ],
    commonMistakes: [
      ml('Cutting the vegetables too small turns a rustic village salad watery and makes the feta dominate each bite.', '蔬菜切太小會讓鄉村沙拉很快出水，也讓 feta 在每口中過度搶味。', '野菜を細かく切りすぎると水が出やすく、フェタの味が強くなりすぎます。', '채소를 너무 작게 자르면 물이 많이 나오고 페타 맛이 지나치게 강해집니다.', 'หั่นผักเล็กเกินไปทำให้สลัดมีน้ำมากและรสเฟตาครอบทุกคำ'),
      ml('Heavy emulsified dressing masks the tomato juices; olive oil, vinegar and oregano should remain simple.', '過度乳化、厚重的沙拉醬會蓋掉番茄汁；橄欖油、醋與奧勒岡保持簡單即可。', '濃い乳化ドレッシングはトマトの汁を隠すので、油、酢、オレガノはシンプルにします。', '진한 유화 드레싱은 토마토 즙을 가리므로 올리브유, 식초, 오레가노를 단순하게 쓰세요.', 'น้ำสลัดข้นแบบอิมัลชันจะกลบรสน้ำมะเขือเทศ ควรใช้น้ำมัน น้ำส้ม และออริกาโนแบบเรียบง่าย')
    ],
    substitutions: [
      ml('Use another brined sheep-and-goat cheese only when true feta is unavailable; keep it in a solid slab rather than crumbling finely.', '只有買不到真正 feta 時才用其他鹽水浸漬羊／山羊乳起司替代，並保留大塊，不要細碎。', '本物のフェタがなければ塩水漬けの羊・山羊乳チーズを使い、細かく崩さず大きくのせます。', '진짜 페타가 없을 때만 염수 숙성 양·염소 치즈를 쓰고 잘게 부수지 말고 큰 조각으로 올리세요.', 'ถ้าไม่มีเฟตาแท้ ใช้ชีสนมแกะ/แพะในน้ำเกลือแทน และวางเป็นก้อนใหญ่ไม่บี้ละเอียด'),
      ml('Kalamata or other good brined olives can be used according to availability, preferably with the pits removed at the table.', '可依取得性使用 Kalamata 或其他品質好的鹽水橄欖，上桌時再處理果核最理想。', 'カラマタなど良質な塩水漬けオリーブを使えます。種は食卓で外しても構いません。', '칼라마타나 다른 좋은 염수 올리브를 쓰되 씨는 먹을 때 빼도 됩니다.', 'ใช้มะกอกคาลามาตาหรือมะกอกน้ำเกลือคุณภาพดีชนิดอื่นได้ตามที่หาได้')
    ]
  },
  dessert: {
    tips: [
      ml('Keep unused phyllo covered while assembling so the thin sheets stay flexible instead of drying and cracking.', '組裝時未使用的 phyllo 要持續覆蓋，薄麵皮才不會乾裂。', '使っていないフィロは覆って乾燥を防ぎ、柔軟なまま扱います。', '쓰지 않는 필로는 덮어 두어 마르고 갈라지지 않게 하세요.', 'คลุมแผ่นฟิลโลที่ยังไม่ใช้ระหว่างประกอบ เพื่อไม่ให้แห้งและแตก'),
      ml('Use a clear hot-and-cold contrast for syrup pastries so syrup penetrates without instantly softening the crisp top layers.', '糖漿甜點要維持明確的冷熱差，才能讓糖漿滲入又不立刻把上層酥皮泡軟。', 'シロップ菓子は熱い生地と冷たいシロップの温度差を作り、上層のパリッと感を保ちます。', '시럽 디저트는 뜨거운 페이스트리와 차가운 시럽의 온도 차를 이용해 바삭함을 살리세요.', 'ขนมราดไซรัปควรใช้ความต่างร้อน-เย็นชัดเจน เพื่อให้ไซรัปซึมโดยไม่ทำให้ชั้นบนอ่อนทันที')
    ],
    commonMistakes: [
      ml('Adding eggs to very hot custard can scramble them; cool or temper the mixture before combining.', '蛋加入過熱卡士達會凝結成蛋花；混合前先降溫或回溫調節。', '熱すぎるカスタードへ卵を加えると固まるので、少し冷ますかテンパリングします。', '너무 뜨거운 커스터드에 달걀을 넣으면 익어 버리므로 식히거나 템퍼링하세요.', 'ใส่ไข่ลงคัสตาร์ดที่ร้อนจัดทำให้ไข่จับตัว ควรลดอุณหภูมิหรือเทมเปอร์ก่อน'),
      ml('Covering syrup pastry while still warm traps steam and softens the phyllo surface.', '糖漿酥皮還溫熱時就覆蓋會困住蒸氣，使 phyllo 表面變軟。', '温かいうちに覆うと蒸気がこもり、フィロの表面が柔らかくなります。', '시럽 페이스트리를 따뜻할 때 덮으면 수증기가 갇혀 필로가 눅눅해집니다.', 'ปิดขนมราดไซรัปขณะยังอุ่นจะกักไอน้ำและทำให้ฟิลโลนิ่ม')
    ],
    substitutions: [
      ml('Fine semolina should stay fine-grained; coarse semolina changes the custard texture and needs different hydration.', '細粒 semolina 應維持使用細粒；粗粒會改變卡士達質地，也需要不同吸水量。', '細粒セモリナは同じ粒度で使い、粗粒へ替えると食感と吸水が変わります。', '고운 세몰리나는 같은 입자를 쓰고 굵은 세몰리나로 바꾸면 질감과 수분 비율이 달라집니다.', 'ควรใช้เซโมลินาละเอียดเหมือนเดิม เพราะชนิดหยาบเปลี่ยนเนื้อคัสตาร์ดและการดูดน้ำ'),
      ml('Good unsalted cow butter can replace traditional sheep-and-cow pastry butter when needed, while keeping the same total fat quantity.', '需要時可用優質無鹽牛奶奶油替代傳統羊牛混合糕點奶油，總油脂量維持不變。', '必要なら良質な無塩牛バターで代用し、総脂肪量は同じに保ちます。', '필요하면 좋은 무염 우유 버터로 바꾸되 총 지방량은 유지하세요.', 'ใช้เนยวัวจืดคุณภาพดีแทนเนยขนมแบบดั้งเดิมได้ โดยคงปริมาณไขมันรวมเท่าเดิม')
    ]
  }
};

export function makeGreekRecipe(recipe) {
  const { profile = 'baked', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.baked;
  return {
    cuisine: 'greek',
    region: ml('Greece', '希臘', 'ギリシャ', '그리스', 'กรีซ'),
    sources: [...(greekRecipeSources[recipe.id] || []), ...additionalSources],
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

export const freshStorage = ml(
  'For best texture serve immediately. Refrigerate any undressed vegetables at 0–4°C for up to 1 day; once dressed with salt, oil and feta, eat the same day.',
  '口感最佳是現拌現吃。未調味蔬菜可在 0–4°C 冷藏最多 1 天；一旦加入鹽、油與 feta，請當天吃完。',
  '食感を優先してすぐ食べます。味付け前の野菜は0–4°Cで1日まで、塩、油、フェタを加えた後は当日中に食べます。',
  '가장 좋은 식감은 바로 먹을 때입니다. 양념하지 않은 채소는 0–4°C에서 1일까지, 소금·기름·페타를 넣은 뒤에는 당일 드세요.',
  'เพื่อเนื้อสัมผัสดีที่สุดให้กินทันที ผักที่ยังไม่ปรุงเก็บ 0–4°C ได้ไม่เกิน 1 วัน เมื่อใส่เกลือ น้ำมัน และเฟตาแล้วให้กินภายในวันเดียว'
);

export const chilledDessertStorage = ml(
  'Keep covered at 0–4°C and use within 2 days. Return the pastry to the refrigerator promptly after serving and do not leave it at room temperature for more than 2 hours.',
  '加蓋置 0–4°C 冰箱並於 2 天內食用；上桌後盡快放回冰箱，室溫不要放超過 2 小時。',
  '覆って0–4°Cで保存し2日以内に食べます。提供後はすぐ冷蔵庫へ戻し、室温に2時間以上置きません。',
  '덮어서 0–4°C에 보관해 2일 안에 드세요. 낸 뒤에는 빨리 냉장고에 되돌리고 실온에 2시간 넘게 두지 마세요.',
  'ปิดฝาเก็บที่ 0–4°C และกินภายใน 2 วัน หลังเสิร์ฟให้นำกลับเข้าตู้เย็นเร็ว และอย่าวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง'
);
