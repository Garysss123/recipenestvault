import { mexicanRecipeSources } from './mexican-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  griddle: {
    tips: [
      ml('Preheat the cooking surface fully before the food goes down; a properly hot skillet or griddle creates browning before moisture can steam the surface.', '食材下鍋前先把煎面徹底預熱；鍋面夠熱才能在水分把表面蒸軟前先形成焦香。', '食材をのせる前に鉄板やフライパンを十分に予熱し、蒸れる前に香ばしい焼き色を付けます。', '음식을 올리기 전에 팬이나 철판을 충분히 달궈 수분 때문에 찌듯 익기 전에 갈색을 냅니다.', 'อุ่นกระทะหรือแผ่นย่างให้ร้อนจริงก่อนลงอาหาร เพื่อให้เกิดสีน้ำตาลก่อนความชื้นจะทำให้ผิวนึ่ง'),
      ml('Have tortillas, salsa and fresh garnishes ready before the last hot component finishes so everything can be served while the tortilla is supple and the filling is hot.', '最後一個熱食部件完成前，先把玉米餅、莎莎醬與新鮮配料備好，讓餅皮仍柔軟、餡料仍熱時就能立刻上桌。', '最後の熱い具材が仕上がる前にトルティーヤ、サルサ、生の薬味を用意し、トルティーヤが柔らかく具が熱いうちに提供します。', '마지막 뜨거운 재료가 완성되기 전에 토르티야, 살사, 신선한 고명을 준비해 토르티야가 부드럽고 속이 뜨거울 때 바로 냅니다.', 'เตรียมตอร์ติญา ซัลซา และเครื่องสดไว้ก่อนส่วนร้อนชิ้นสุดท้ายเสร็จ เพื่อเสิร์ฟตอนแผ่นยังนุ่มและไส้ยังร้อน')
    ],
    commonMistakes: [
      ml('Crowding the cooking surface lowers the temperature and produces grey, steamed meat instead of a browned crust.', '鍋面塞太滿會快速降溫，肉會灰白像蒸熟而不是形成焦脆外殼。', '詰め込みすぎると温度が下がり、焼き色ではなく蒸したような肉になります。', '팬을 너무 빽빽하게 채우면 온도가 내려가 갈색 껍질 대신 회색으로 찌듯 익습니다.', 'ใส่อาหารแน่นเกินไปทำให้อุณหภูมิลด เนื้อซีดเหมือนนึ่งแทนที่จะมีผิวเกรียม'),
      ml('Pressing or stirring continuously after browning starts prevents a stable crust from forming.', '開始上色後還一直壓、一直翻動，會讓穩定焦殼難以形成。', '焼き色が付き始めてから触り続けると、しっかりした焼き面ができません。', '갈색이 나기 시작한 뒤 계속 누르거나 저으면 단단한 크러스트가 생기지 않습니다.', 'กดหรือคนตลอดหลังเริ่มเป็นสีน้ำตาลทำให้ผิวเกรียมไม่ก่อตัว')
    ],
    substitutions: [
      ml('A heavy cast-iron skillet can replace a flat-top griddle; cook in batches so the pan stays hot.', '沒有平面鐵板時可用厚重鑄鐵鍋，分批煎以維持鍋溫。', 'フラットトップがなければ厚手の鋳鉄フライパンを使い、温度が落ちないよう分けて焼きます。', '플랫탑이 없으면 무쇠 팬을 쓰고 팬 온도가 떨어지지 않게 나눠 익히세요.', 'ใช้กระทะเหล็กหล่อหนักแทนแผ่นย่างได้ และทำเป็นรอบเพื่อให้กระทะร้อน'),
      ml('Fresh corn tortillas give the most characteristic flavour; small flour tortillas can substitute when needed, although the finished texture will be softer and less corn-forward.', '新鮮玉米餅最能呈現典型風味；必要時可用小張麵粉餅替代，但口感會更柔軟、玉米香也較弱。', '香りは新鮮なコーントルティーヤが最も特徴的です。必要なら小さなフラワートルティーヤでも代用できますが、より柔らかくトウモロコシの風味は弱くなります。', '신선한 옥수수 토르티야가 가장 특징적인 맛을 내며, 필요하면 작은 밀가루 토르티야로 바꿀 수 있지만 더 부드럽고 옥수수 풍미는 약해집니다.', 'ตอร์ติญาข้าวโพดสดให้รสเด่นที่สุด หากจำเป็นใช้ตอร์ติญาแป้งขนาดเล็กแทนได้ แต่เนื้อจะนุ่มกว่าและกลิ่นข้าวโพดน้อยลง')
    ]
  },
  fry: {
    tips: [
      ml('Keep the frying oil steadily hot and work in small batches; tortillas and chile batter should sizzle immediately without darkening before the centre is ready.', '油炸時維持穩定熱度並分小批操作；玉米餅或辣椒麵衣下鍋應立刻滋滋作響，但不能在內部完成前就過度變黑。', '油は安定して熱い状態を保ち少量ずつ揚げます。トルティーヤやチレの衣は入れた瞬間に泡立ち、中心が整う前に濃く色づきすぎない火加減が目安です。', '기름은 안정적으로 뜨겁게 유지하고 소량씩 조리하세요. 토르티야나 고추 반죽은 넣자마자 지글거려야 하지만 속이 익기 전에 너무 짙게 색 나면 안 됩니다.', 'รักษาน้ำมันให้ร้อนสม่ำเสมอและทอดทีละน้อย ตอร์ติญาหรือแป้งชุบพริกควรดังฉ่าทันทีแต่ไม่คล้ำก่อนด้านในพร้อม'),
      ml('Drain fried food on a rack rather than stacking it; trapped steam softens a crisp crust quickly.', '炸好後放網架瀝油，不要堆疊；困住的蒸氣會很快讓脆殼回軟。', '揚げ物は重ねず網で油を切り、蒸気で衣が湿るのを防ぎます。', '튀긴 음식은 겹치지 말고 랙에서 기름을 빼 수증기로 껍질이 눅눅해지지 않게 하세요.', 'พักของทอดบนตะแกรงไม่วางซ้อน เพราะไอน้ำจะทำให้เปลือกกรอบนิ่มเร็ว')
    ],
    commonMistakes: [
      ml('Adding too much food at once crashes the oil temperature and gives greasy, pale coating.', '一次下太多食材會讓油溫暴跌，外衣吸油、顏色蒼白。', '一度に入れすぎると油温が落ち、衣が油っぽく色も付きません。', '한꺼번에 너무 많이 넣으면 기름 온도가 급락해 튀김옷이 기름지고 창백해집니다.', 'ใส่อาหารมากเกินไปครั้งเดียวทำให้อุณหภูมิน้ำมันตก เปลือกซีดและอมน้ำมัน'),
      ml('Covering hot fried food traps steam and removes the crisp texture you worked to build.', '熱炸物立刻加蓋會困住蒸氣，把好不容易形成的酥脆口感弄軟。', '熱い揚げ物をすぐ覆うと蒸気がこもり、せっかくのカリッと感が失われます。', '뜨거운 튀김을 바로 덮으면 수증기가 갇혀 바삭함이 사라집니다.', 'ปิดของทอดร้อนทันทีจะกักไอน้ำและทำให้ความกรอบหายไป')
    ],
    substitutions: [
      ml('A neutral high-heat oil such as canola, peanut or refined sunflower oil can be used for frying.', '油炸可使用芥花油、花生油或精製葵花油等耐高溫中性油。', '揚げ油には菜種油、ピーナッツ油、精製ひまわり油など高温向きの油を使えます。', '카놀라유, 땅콩유, 정제 해바라기유처럼 고온용 중성유를 쓸 수 있습니다.', 'ใช้น้ำมันรสกลางทนความร้อนสูง เช่น คาโนลา ถั่วลิสง หรือทานตะวันกลั่นได้'),
      ml('When a recipe calls for briefly softening corn tortillas in oil, warming them on a comal is a lighter alternative; expect a less silky, slightly drier fold.', '若食譜只是要用油快速軟化玉米餅，也可改在 comal 平烤盤上加熱；成品會少一點油潤柔滑，折起來略乾。', 'コーントルティーヤを油で短く柔らかくする工程は、コマルで温める方法でも代用できます。油のなめらかさが減り、折った食感は少し乾きます。', '옥수수 토르티야를 기름에 잠깐 부드럽게 하는 단계는 코말에서 데우는 방식으로 바꿀 수 있지만, 덜 매끈하고 접었을 때 조금 더 건조합니다.', 'ขั้นที่ทำให้ตอร์ติญาข้าวโพดนุ่มด้วยน้ำมันสั้น ๆ ใช้อุ่นบนโคมาลแทนได้ แต่จะมันลื่นน้อยลงและพับแล้วแห้งกว่าเล็กน้อย')
    ]
  },
  bake: {
    tips: [
      ml('Preheat the oven and pan fully so the stated bake time begins from a stable temperature.', '烤箱與烤盤都先完整預熱，標示烘烤時間才是從穩定溫度開始計算。', 'オーブンと型を十分に予熱し、安定した温度から焼き時間を始めます。', '오븐과 팬을 충분히 예열해 안정된 온도에서 굽는 시간을 시작하세요.', 'อุ่นเตาและพิมพ์ให้ถึงอุณหภูมิก่อน เพื่อให้เวลาการอบเริ่มจากอุณหภูมิที่คงที่'),
      ml('Let slow-roasted meat rest in its wrapped cooking juices before shredding so the fibres relax and the rendered juices can be folded back through the meat.', '慢烤肉完成後先在包裹與原汁中靜置再撕肉，讓纖維放鬆，也能把析出的肉汁重新拌回肉中。', 'ゆっくり焼いた肉は包みと肉汁の中で休ませてからほぐし、繊維を落ち着かせて出た肉汁を戻します。', '천천히 구운 고기는 포장과 육즙 속에서 잠시 휴지한 뒤 찢어 섬유를 이완시키고 나온 육즙을 다시 섞으세요.', 'พักเนื้ออบช้าไว้ในห่อและน้ำปรุงก่อนฉีก เพื่อให้เส้นใยคลายตัวและคลุกน้ำที่ออกมากลับเข้าเนื้อ')
    ],
    commonMistakes: [
      ml('Overbaking to chase darker colour can dry the centre before the surface looks dramatically brown.', '為了追求更深顏色而過度烘烤，常會在表面變得很深前就先把中心烤乾。', '濃い焼き色を求めて焼きすぎると、表面より先に中心が乾きます。', '더 진한 색을 내려고 오래 구우면 표면보다 먼저 속이 마릅니다.', 'อบนานเพื่อไล่สีเข้มอาจทำให้ตรงกลางแห้งก่อนหน้าจะเข้มมาก'),
      ml('Cutting while piping hot makes fillings and sauces run before they have time to set.', '滾燙時立刻切會讓內餡與醬汁在定型前流出。', '熱々のまま切ると、具やソースが固まる前に流れ出します。', '아주 뜨거울 때 자르면 속과 소스가 굳기 전에 흘러나옵니다.', 'หั่นขณะร้อนจัดทำให้ไส้และซอสไหลก่อนเซ็ตตัว')
    ],
    substitutions: [
      ml('Use a baking vessel of similar volume if the specified pan is unavailable and begin checking doneness early when its shape differs.', '沒有指定烤模時可用容量相近容器；若形狀不同，要提早開始檢查熟度。', '指定の型がなければ容量の近い型を使い、形が違う場合は早めに焼き上がりを確認します。', '지정 팬이 없으면 비슷한 용량을 쓰고 모양이 다르면 일찍부터 익힘을 확인하세요.', 'ถ้าไม่มีพิมพ์ที่ระบุ ใช้ภาชนะปริมาตรใกล้เคียง และเริ่มเช็กความสุกเร็วขึ้นหากรูปทรงต่างกัน'),
      ml('If banana leaves are unavailable, seal the meat tightly in baking parchment and foil; it will stay moist, though the finished dish will lose some of the leaf aroma.', '若買不到香蕉葉，可用烘焙紙加鋁箔緊密包住肉；保濕效果仍在，但成品會少一些葉片香氣。', 'バナナの葉がなければオーブンペーパーとアルミホイルで密封します。しっとり仕上がりますが、葉の香りは弱くなります。', '바나나잎이 없으면 유산지와 포일로 고기를 단단히 밀봉하세요. 촉촉함은 유지되지만 잎 향은 줄어듭니다.', 'ถ้าไม่มีใบตอง ให้ห่อเนื้อแน่นด้วยกระดาษอบและฟอยล์ เนื้อยังชุ่มแต่กลิ่นใบตองจะลดลง')
    ]
  },
  stew: {
    tips: [
      ml('Build colour in the early stages, then keep the finished pot at a gentle simmer so meat stays tender and starches do not catch.', '前段先把焦香與顏色建立起來，後段維持小滾，肉才會嫩，澱粉也不容易黏底。', '前半でしっかり焼き色を作り、後半は穏やかに煮て肉を柔らかくし、焦げ付きを防ぎます。', '초반에 갈색을 충분히 내고 이후에는 잔잔하게 끓여 고기를 부드럽게 하고 전분이 눌어붙지 않게 하세요.', 'สร้างสีน้ำตาลช่วงต้น แล้วเคี่ยวเบา ๆ ช่วงท้ายให้เนื้อนุ่มและแป้งไม่ติดก้น'),
      ml('Taste for salt only after smoked meat, stock and reducing liquid have contributed their seasoning.', '煙燻肉、高湯與收汁都帶入鹹味後，再做最後鹽度調整。', '燻製肉、ストック、煮詰まりの塩分が出てから最後に塩を調整します。', '훈제 고기, 육수, 졸아든 국물의 간이 나온 뒤 마지막에 소금을 맞추세요.', 'ชิมเกลือหลังเนื้อรมควัน สต๊อก และน้ำที่งวดปล่อยความเค็มแล้ว')
    ],
    commonMistakes: [
      ml('A hard boil can toughen meat and reduce the liquid before the flavours have time to meld.', '猛烈沸騰會讓肉變硬，也可能在味道融合前就把湯汁收乾。', '強く沸かすと肉が硬くなり、味がなじむ前に汁が減りすぎます。', '세게 끓이면 고기가 질겨지고 맛이 어우러지기 전에 국물이 줄어듭니다.', 'เดือดแรงทำให้เนื้อแข็งและน้ำงวดก่อนรสจะกลมกลืน'),
      ml('Letting a thick chile sauce sit unstirred over direct heat can scorch the bottom quickly and turn the whole pot bitter.', '濃厚辣椒醬在直火上放著不攪，很快就會焦底，並把整鍋味道帶苦。', '濃いチレソースを直火で混ぜずに置くと底がすぐ焦げ、鍋全体に苦味が移ります。', '걸쭉한 고추 소스를 직화에서 젓지 않고 두면 바닥이 금방 타서 냄비 전체가 써질 수 있습니다.', 'ซอสพริกข้นที่ตั้งไฟตรงโดยไม่คนจะไหม้ก้นเร็วและทำให้ทั้งหม้อขม')
    ],
    substitutions: [
      ml('Use unsalted or low-sodium stock when possible so you can control seasoning after chiles, roasted vegetables and reduced cooking liquid have concentrated.', '盡量使用無鹽或低鈉高湯，等辣椒、烤蔬菜與收汁味道濃縮後再精準調整鹹度。', '無塩か低塩のストックを使うと、チレ、焼き野菜、煮詰まった汁の味が濃くなった後に塩分を調整できます。', '가능하면 무염 또는 저염 육수를 써서 고추, 구운 채소, 졸아든 국물 맛이 농축된 뒤 간을 조절하세요.', 'ใช้น้ำสต๊อกไม่เค็มหรือโซเดียมต่ำเพื่อคุมรสหลังพริก ผักย่าง และน้ำต้มที่งวดมีรสเข้มขึ้น'),
      ml('If the exact dried chile is unavailable, choose another Mexican dried chile with similar heat and fruitiness; the dish will remain workable but its regional flavour will shift.', '若買不到指定乾辣椒，可選辣度與果香相近的其他墨西哥乾辣椒；料理仍可成立，但地域風味會有所改變。', '指定の乾燥チレがなければ、辛さと果実味が近い別のメキシコ産乾燥チレで代用できますが、地域らしい風味は変わります。', '지정한 말린 고추가 없으면 매운맛과 과실향이 비슷한 다른 멕시코 말린 고추를 쓸 수 있지만 지역 특유의 풍미는 달라집니다.', 'ถ้าไม่มีพริกแห้งชนิดที่ระบุ ใช้พริกแห้งเม็กซิกันที่เผ็ดและหอมผลไม้ใกล้เคียงได้ แต่รสประจำภูมิภาคจะเปลี่ยนไป')
    ]
  },
  dessert: {
    tips: [
      ml('Measure baking ingredients by weight and keep butter, eggs and dairy at the temperature the method calls for.', '烘焙原料用重量量測，奶油、雞蛋與乳製品保持在步驟指定溫度。', '材料は重量で量り、バター、卵、乳製品は手順どおりの温度にそろえます。', '베이킹 재료는 무게로 계량하고 버터, 달걀, 유제품은 방법에 맞는 온도로 맞추세요.', 'ชั่งวัตถุดิบอบด้วยน้ำหนัก และใช้อุณหภูมิของเนย ไข่ และนมตามที่วิธีกำหนด'),
      ml('Cool baked desserts gradually before cutting; residual heat finishes the centre and a clean slice needs time to set.', '烘焙甜點先逐步降溫再切；餘熱會繼續完成中心，整齊切面也需要時間定型。', '焼き菓子はゆっくり冷ましてから切り、余熱で中心を仕上げて形を安定させます。', '구운 디저트는 천천히 식힌 뒤 자르세요. 잔열이 중심을 마저 익히고 단면이 안정됩니다.', 'ปล่อยขนมอบเย็นลงช้า ๆ ก่อนตัด เพราะความร้อนคงเหลือช่วยให้ตรงกลางสุกและเซ็ตตัว')
    ],
    commonMistakes: [
      ml('Overmixing after flour or eggs are added can toughen pastry, inflate cheesecake or make cookies cakey.', '加入麵粉或蛋後過度攪拌，可能讓派皮變韌、乳酪蛋糕充氣，或讓餅乾變成蛋糕口感。', '粉や卵を加えた後に混ぜすぎると、生地が硬くなったりチーズケーキに空気が入りすぎたりします。', '밀가루나 달걀을 넣은 뒤 과하게 섞으면 페이스트리가 질겨지고 치즈케이크가 부풀거나 쿠키가 케이크처럼 됩니다.', 'ผสมมากเกินหลังใส่แป้งหรือไข่ทำให้แป้งแข็ง ชีสเค้กฟูเกิน หรือคุกกี้เหมือนเค้ก'),
      ml('Cutting before the centre is fully cool makes custards, fruit fillings and soft cookies appear under-set.', '中心尚未完全冷卻就切，卡士達、水果餡與軟餅乾都會看起來像沒定型。', '中心が冷える前に切ると、カスタードや果物のフィリングが落ち着きません。', '속이 완전히 식기 전에 자르면 커스터드와 과일 필링, 부드러운 쿠키가 덜 굳어 보입니다.', 'ตัดก่อนกลางเย็นสนิททำให้คัสตาร์ด ไส้ผลไม้ และคุกกี้นุ่มดูยังไม่เซ็ต')
    ],
    substitutions: [
      ml('Use the same type of flour where structure matters; changing protein level can noticeably alter crust, cake or cookie texture.', '結構重要時盡量使用同類麵粉；蛋白質含量改變會明顯影響派皮、蛋糕或餅乾口感。', '構造に影響するので同じ種類の粉を使い、たんぱく量の違いによる食感変化を避けます。', '구조가 중요할 때는 같은 종류의 밀가루를 쓰세요. 단백질 함량 차이가 식감을 크게 바꿉니다.', 'ใช้แป้งชนิดเดียวกันเมื่อโครงสร้างสำคัญ เพราะระดับโปรตีนเปลี่ยนเนื้อสัมผัสชัดเจน'),
      ml('Unsalted butter is easiest to control in baking; if using salted butter, reduce the added salt to compensate.', '烘焙用無鹽奶油最容易控制；若改用有鹽奶油，要相應減少額外鹽。', '無塩バターが調整しやすく、有塩を使う場合は追加の塩を減らします。', '베이킹은 무염 버터가 조절하기 쉽고 가염 버터를 쓰면 추가 소금을 줄이세요.', 'เนยจืดควบคุมรสง่ายที่สุด ถ้าใช้เนยเค็มให้ลดเกลือที่เติม')
    ]
  }
};

export function makeMexicanRecipe(recipe) {
  const { profile = 'bake', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.bake;
  return {
    cuisine: 'mexican',
    region: ml('Mexico', '墨西哥', 'メキシコ', '멕시코', 'เม็กซิโก'),
    sources: [...(mexicanRecipeSources[recipe.id] || []), ...additionalSources],
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

export const chilledDessertStorage = ml(
  'Keep covered at 0–4°C and use within 3 days. Return it to the refrigerator promptly after serving and do not leave it at room temperature for more than 2 hours.',
  '加蓋置 0–4°C 冰箱並於 3 天內食用；上桌後盡快放回冰箱，室溫不要放超過 2 小時。',
  '覆って0–4°Cで保存し3日以内に食べます。提供後はすぐ冷蔵庫へ戻し、室温に2時間以上置きません。',
  '덮어서 0–4°C에 보관해 3일 안에 드세요. 낸 뒤에는 빨리 냉장고에 되돌리고 실온에 2시간 넘게 두지 마세요.',
  'ปิดฝาเก็บที่ 0–4°C และกินภายใน 3 วัน หลังเสิร์ฟให้นำกลับเข้าตู้เย็นเร็ว และอย่าวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง'
);

export const roomTempBakedStorage = ml(
  'Cool completely before storing airtight at room temperature for up to 3 days. Freeze well wrapped for longer storage.',
  '完全放涼後密封室溫保存最多 3 天；需要更久則包好冷凍。',
  '完全に冷まして密閉し、室温で3日まで保存します。長期保存は包んで冷凍します。',
  '완전히 식힌 뒤 밀폐해 실온에서 3일까지 보관하고 더 오래 두려면 잘 싸서 냉동하세요.',
  'ปล่อยให้เย็นสนิทแล้วเก็บภาชนะปิดที่อุณหภูมิห้องไม่เกิน 3 วัน หากนานกว่านั้นห่อให้ดีแล้วแช่แข็ง'
);
