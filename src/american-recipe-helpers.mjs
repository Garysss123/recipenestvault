import { americanRecipeSources } from './american-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  griddle: {
    tips: [
      ml('Preheat the cooking surface fully before the food goes down; a properly hot skillet or griddle creates browning before moisture can steam the surface.', '食材下鍋前先把煎面徹底預熱；鍋面夠熱才能在水分把表面蒸軟前先形成焦香。', '食材をのせる前に鉄板やフライパンを十分に予熱し、蒸れる前に香ばしい焼き色を付けます。', '음식을 올리기 전에 팬이나 철판을 충분히 달궈 수분 때문에 찌듯 익기 전에 갈색을 냅니다.', 'อุ่นกระทะหรือแผ่นย่างให้ร้อนจริงก่อนลงอาหาร เพื่อให้เกิดสีน้ำตาลก่อนความชื้นจะทำให้ผิวนึ่ง'),
      ml('Prepare buns, sauces and toppings before the hot component finishes so the finished sandwich can be assembled and served immediately.', '熱食完成前就先把麵包、醬料與配料準備好，主體一熟就能立刻組裝上桌。', '熱い具材が仕上がる前にパン、ソース、具を準備し、できたてをすぐ組み立てます。', '뜨거운 재료가 완성되기 전에 빵과 소스, 토핑을 준비해 익자마자 바로 조립합니다.', 'เตรียมขนมปัง ซอส และเครื่องไว้ก่อนส่วนร้อนสุก เพื่อประกอบและเสิร์ฟทันที')
    ],
    commonMistakes: [
      ml('Crowding the cooking surface lowers the temperature and produces grey, steamed meat instead of a browned crust.', '鍋面塞太滿會快速降溫，肉會灰白像蒸熟而不是形成焦脆外殼。', '詰め込みすぎると温度が下がり、焼き色ではなく蒸したような肉になります。', '팬을 너무 빽빽하게 채우면 온도가 내려가 갈색 껍질 대신 회색으로 찌듯 익습니다.', 'ใส่อาหารแน่นเกินไปทำให้อุณหภูมิลด เนื้อซีดเหมือนนึ่งแทนที่จะมีผิวเกรียม'),
      ml('Pressing or stirring continuously after browning starts prevents a stable crust from forming.', '開始上色後還一直壓、一直翻動，會讓穩定焦殼難以形成。', '焼き色が付き始めてから触り続けると、しっかりした焼き面ができません。', '갈색이 나기 시작한 뒤 계속 누르거나 저으면 단단한 크러스트가 생기지 않습니다.', 'กดหรือคนตลอดหลังเริ่มเป็นสีน้ำตาลทำให้ผิวเกรียมไม่ก่อตัว')
    ],
    substitutions: [
      ml('A heavy cast-iron skillet can replace a flat-top griddle; cook in batches so the pan stays hot.', '沒有平面鐵板時可用厚重鑄鐵鍋，分批煎以維持鍋溫。', 'フラットトップがなければ厚手の鋳鉄フライパンを使い、温度が落ちないよう分けて焼きます。', '플랫탑이 없으면 무쇠 팬을 쓰고 팬 온도가 떨어지지 않게 나눠 익히세요.', 'ใช้กระทะเหล็กหล่อหนักแทนแผ่นย่างได้ และทำเป็นรอบเพื่อให้กระทะร้อน'),
      ml('Use a comparable melting cheese if the named American cheese is unavailable, while keeping the total cheese weight the same.', '買不到指定美式起司時，可換成融化性相近的起司，總重量維持不變。', '指定のアメリカンチーズがなければ、溶け方の近いチーズを同じ総重量で使います。', '지정한 아메리칸 치즈가 없으면 비슷하게 잘 녹는 치즈를 같은 총중량으로 쓰세요.', 'ถ้าไม่มีชีสอเมริกันที่ระบุ ใช้ชีสที่ละลายใกล้เคียงโดยคงน้ำหนักรวมเท่าเดิม')
    ]
  },
  fry: {
    tips: [
      ml('Use a thermometer and fry in batches so the oil returns to target temperature between loads.', '用溫度計監控並分批油炸，讓每批之間油溫能回到目標值。', '温度計を使い、油温を戻しながら数回に分けて揚げます。', '온도계를 쓰고 나눠 튀겨 각 배치 사이에 기름 온도를 회복시키세요.', 'ใช้เทอร์โมมิเตอร์และทอดเป็นรอบ เพื่อให้น้ำมันกลับสู่อุณหภูมิเป้าหมายทุกครั้ง'),
      ml('Drain fried food on a rack rather than stacking it; trapped steam softens a crisp crust quickly.', '炸好後放網架瀝油，不要堆疊；困住的蒸氣會很快讓脆殼回軟。', '揚げ物は重ねず網で油を切り、蒸気で衣が湿るのを防ぎます。', '튀긴 음식은 겹치지 말고 랙에서 기름을 빼 수증기로 껍질이 눅눅해지지 않게 하세요.', 'พักของทอดบนตะแกรงไม่วางซ้อน เพราะไอน้ำจะทำให้เปลือกกรอบนิ่มเร็ว')
    ],
    commonMistakes: [
      ml('Adding too much food at once crashes the oil temperature and gives greasy, pale coating.', '一次下太多食材會讓油溫暴跌，外衣吸油、顏色蒼白。', '一度に入れすぎると油温が落ち、衣が油っぽく色も付きません。', '한꺼번에 너무 많이 넣으면 기름 온도가 급락해 튀김옷이 기름지고 창백해집니다.', 'ใส่อาหารมากเกินไปครั้งเดียวทำให้อุณหภูมิน้ำมันตก เปลือกซีดและอมน้ำมัน'),
      ml('Covering hot fried food traps steam and removes the crisp texture you worked to build.', '熱炸物立刻加蓋會困住蒸氣，把好不容易形成的酥脆口感弄軟。', '熱い揚げ物をすぐ覆うと蒸気がこもり、せっかくのカリッと感が失われます。', '뜨거운 튀김을 바로 덮으면 수증기가 갇혀 바삭함이 사라집니다.', 'ปิดของทอดร้อนทันทีจะกักไอน้ำและทำให้ความกรอบหายไป')
    ],
    substitutions: [
      ml('A neutral high-heat oil such as canola, peanut or refined sunflower oil can be used for frying.', '油炸可使用芥花油、花生油或精製葵花油等耐高溫中性油。', '揚げ油には菜種油、ピーナッツ油、精製ひまわり油など高温向きの油を使えます。', '카놀라유, 땅콩유, 정제 해바라기유처럼 고온용 중성유를 쓸 수 있습니다.', 'ใช้น้ำมันรสกลางทนความร้อนสูง เช่น คาโนลา ถั่วลิสง หรือทานตะวันกลั่นได้'),
      ml('Boneless cuts can shorten frying time, but use the same coating method and verify doneness rather than relying on colour alone.', '無骨肉可縮短油炸時間，但裹粉方式不變，熟度要另外確認，不能只看顏色。', '骨なし肉なら時間は短くできますが、衣は同じ方法で付け、色だけでなく火の通りを確認します。', '뼈 없는 고기는 시간이 짧아질 수 있지만 같은 코팅법을 쓰고 색만 보지 말고 익힘을 확인하세요.', 'ชิ้นไร้กระดูกทอดสั้นลงได้ แต่ใช้วิธีชุบเหมือนเดิมและตรวจความสุก ไม่ดูสีอย่างเดียว')
    ]
  },
  bake: {
    tips: [
      ml('Preheat the oven and pan fully so the stated bake time begins from a stable temperature.', '烤箱與烤盤都先完整預熱，標示烘烤時間才是從穩定溫度開始計算。', 'オーブンと型を十分に予熱し、安定した温度から焼き時間を始めます。', '오븐과 팬을 충분히 예열해 안정된 온도에서 굽는 시간을 시작하세요.', 'อุ่นเตาและพิมพ์ให้ถึงอุณหภูมิก่อน เพื่อให้เวลาการอบเริ่มจากอุณหภูมิที่คงที่'),
      ml('Let baked dishes rest before slicing so starches, cheese or custards settle into clean portions.', '烘烤料理切片前先靜置，讓澱粉、起司或蛋奶餡定型，切面更完整。', '焼き上がりは少し休ませ、でんぷん、チーズ、カスタードを落ち着かせてから切ります。', '구운 음식은 잠시 휴지해 전분, 치즈, 커스터드가 안정된 뒤 자르세요.', 'พักอาหารอบก่อนหั่น ให้แป้ง ชีส หรือคัสตาร์ดเซ็ตตัวเป็นชิ้นสวย')
    ],
    commonMistakes: [
      ml('Overbaking to chase darker colour can dry the centre before the surface looks dramatically brown.', '為了追求更深顏色而過度烘烤，常會在表面變得很深前就先把中心烤乾。', '濃い焼き色を求めて焼きすぎると、表面より先に中心が乾きます。', '더 진한 색을 내려고 오래 구우면 표면보다 먼저 속이 마릅니다.', 'อบนานเพื่อไล่สีเข้มอาจทำให้ตรงกลางแห้งก่อนหน้าจะเข้มมาก'),
      ml('Cutting while piping hot makes fillings and sauces run before they have time to set.', '滾燙時立刻切會讓內餡與醬汁在定型前流出。', '熱々のまま切ると、具やソースが固まる前に流れ出します。', '아주 뜨거울 때 자르면 속과 소스가 굳기 전에 흘러나옵니다.', 'หั่นขณะร้อนจัดทำให้ไส้และซอสไหลก่อนเซ็ตตัว')
    ],
    substitutions: [
      ml('Use a baking vessel of similar volume if the specified pan is unavailable and begin checking doneness early when its shape differs.', '沒有指定烤模時可用容量相近容器；若形狀不同，要提早開始檢查熟度。', '指定の型がなければ容量の近い型を使い、形が違う場合は早めに焼き上がりを確認します。', '지정 팬이 없으면 비슷한 용량을 쓰고 모양이 다르면 일찍부터 익힘을 확인하세요.', 'ถ้าไม่มีพิมพ์ที่ระบุ ใช้ภาชนะปริมาตรใกล้เคียง และเริ่มเช็กความสุกเร็วขึ้นหากรูปทรงต่างกัน'),
      ml('A comparable full-fat dairy product can replace the named one when necessary, but low-fat versions usually set and brown differently.', '必要時可用脂肪含量相近的全脂乳製品替代；低脂版本通常定型與上色都不同。', '必要なら同程度の全脂肪乳製品で代用できますが、低脂肪では固まり方と焼き色が変わります。', '필요하면 비슷한 전지 유제품으로 바꿀 수 있지만 저지방은 굳는 방식과 갈색이 달라집니다.', 'ใช้ผลิตภัณฑ์นมไขมันเต็มใกล้เคียงแทนได้ แต่ชนิดไขมันต่ำจะเซ็ตและเป็นสีต่างกัน')
    ]
  },
  stew: {
    tips: [
      ml('Build colour in the early stages, then keep the finished pot at a gentle simmer so meat stays tender and starches do not catch.', '前段先把焦香與顏色建立起來，後段維持小滾，肉才會嫩，澱粉也不容易黏底。', '前半でしっかり焼き色を作り、後半は穏やかに煮て肉を柔らかくし、焦げ付きを防ぎます。', '초반에 갈색을 충분히 내고 이후에는 잔잔하게 끓여 고기를 부드럽게 하고 전분이 눌어붙지 않게 하세요.', 'สร้างสีน้ำตาลช่วงต้น แล้วเคี่ยวเบา ๆ ช่วงท้ายให้เนื้อนุ่มและแป้งไม่ติดก้น'),
      ml('Taste for salt only after smoked meat, stock and reducing liquid have contributed their seasoning.', '煙燻肉、高湯與收汁都帶入鹹味後，再做最後鹽度調整。', '燻製肉、ストック、煮詰まりの塩分が出てから最後に塩を調整します。', '훈제 고기, 육수, 졸아든 국물의 간이 나온 뒤 마지막에 소금을 맞추세요.', 'ชิมเกลือหลังเนื้อรมควัน สต๊อก และน้ำที่งวดปล่อยความเค็มแล้ว')
    ],
    commonMistakes: [
      ml('A hard boil can toughen meat and reduce the liquid before the flavours have time to meld.', '猛烈沸騰會讓肉變硬，也可能在味道融合前就把湯汁收乾。', '強く沸かすと肉が硬くなり、味がなじむ前に汁が減りすぎます。', '세게 끓이면 고기가 질겨지고 맛이 어우러지기 전에 국물이 줄어듭니다.', 'เดือดแรงทำให้เนื้อแข็งและน้ำงวดก่อนรสจะกลมกลืน'),
      ml('Adding delicate seafood too early makes it rubbery by the time the rice or stew base is ready.', '海鮮太早下鍋，等米飯或燉煮底完成時往往已經過熟變韌。', '魚介を早く入れすぎると、ご飯や煮込みが仕上がる頃には固くなります。', '해산물을 너무 일찍 넣으면 밥이나 스튜가 완성될 때 질겨집니다.', 'ใส่อาหารทะเลเร็วเกินไปจะเหนียวเมื่อข้าวหรือฐานสตูว์สุก')
    ],
    substitutions: [
      ml('Use unsalted stock when possible so smoked sausage, cured pork and shellfish do not push the final dish too salty.', '盡量使用無鹽高湯，避免煙燻香腸、醃肉與貝類把成品推得過鹹。', '無塩ストックを使うと、燻製ソーセージや塩漬け肉、貝の塩分を調整しやすくなります。', '무염 육수를 쓰면 훈제 소시지, 염장육, 조개류 때문에 너무 짜지는 것을 막기 쉽습니다.', 'ใช้น้ำสต๊อกไม่เค็มเพื่อไม่ให้ไส้กรอกรมควัน เนื้อหมัก และหอยทำให้จานเค็มเกิน'),
      ml('A different smoked sausage can replace andouille when necessary; choose one that is savoury rather than sweet.', '沒有 andouille 時可用其他煙燻香腸，優先選鹹香而不是甜味型。', 'アンドゥイユがなければ甘くない燻製ソーセージで代用できます。', '안두이가 없으면 단맛이 적은 다른 훈제 소시지를 쓰세요.', 'ถ้าไม่มีอันดูอี ใช้ไส้กรอกรมควันชนิดอื่นที่ออกเค็มไม่หวานแทนได้')
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

export function makeAmericanRecipe(recipe) {
  const { profile = 'bake', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.bake;
  return {
    cuisine: 'american',
    region: ml('United States', '美國', 'アメリカ合衆国', '미국', 'สหรัฐอเมริกา'),
    sources: [...(americanRecipeSources[recipe.id] || []), ...additionalSources],
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
