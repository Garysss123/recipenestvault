import { ml, ingredient as i, step as s, makeGermanRecipe as r, cookedStorage, friedStorage } from './german-recipe-helpers.mjs';

export const germanRecipesB = [
  r({
    id: 'nuernberger-rostbratwurst', profile: 'pan',
    region: ml('Nuremberg / Franconia', '紐倫堡／法蘭肯', 'ニュルンベルク／フランケン', '뉘른베르크 / 프랑켄', 'นูเรมเบิร์ก / ฟรังโกเนีย'),
    name: ml('Nürnberger Rostbratwürste with Sauerkraut', '紐倫堡烤香腸佐酸菜', 'ニュルンベルガー・ロストブラートヴルストとザワークラウト', '뉘른베르거 로스트브라트부어스트와 사우어크라우트', 'ไส้กรอกนูเรมเบิร์กย่างกับซาวเคราต์'),
    prepMinutes: 15, cookMinutes: 40, totalMinutes: 55, servings: 4,
    description: ml(
      'Small Nuremberg bratwursts grilled or pan-roasted until deeply browned, served with gently braised sauerkraut sharpened by apple, caraway and juniper. The sausages stay the focus: the cabbage should be savoury and bright rather than heavy or sweet.',
      '小巧的紐倫堡香腸煎烤至深金黃，搭配以蘋果、葛縷子與杜松子溫和燉煮的酸菜。主角仍是香腸，因此酸菜應鹹香清爽，而不是厚重或過甜。',
      '小ぶりのニュルンベルクソーセージを香ばしく焼き、りんご、キャラウェイ、ジュニパーで穏やかに煮たザワークラウトを添えます。主役はソーセージなので、キャベツは重く甘くせず爽やかに仕上げます。',
      '작은 뉘른베르크 소시지를 진하게 갈색 내고 사과, 캐러웨이, 주니퍼로 부드럽게 익힌 사우어크라우트를 곁들입니다. 소시지가 주인공이므로 양배추는 무겁거나 지나치게 달지 않고 산뜻해야 합니다.',
      'ไส้กรอกนูเรมเบิร์กชิ้นเล็กย่างจนสีน้ำตาลเข้ม เสิร์ฟกับซาวเคราต์ตุ๋นเบา ๆ ด้วยแอปเปิล ยี่หร่าฝรั่ง และจูนิเปอร์ โดยให้ไส้กรอกเด่นและกะหล่ำมีรสสดใสไม่หวานหนัก'
    ),
    ingredients: [
      i('24 x 25 g', 'Nürnberger Rostbratwürste', '紐倫堡 Rostbratwürste 小香腸', 'ニュルンベルガー・ロストブラートヴルスト', '뉘른베르거 로스트브라트부어스트', 'ไส้กรอก Nürnberger Rostbratwürste'),
      i('700 g', 'sauerkraut, drained', '酸菜，瀝乾', 'ザワークラウト、水気を切る', '사우어크라우트, 물기 제거', 'ซาวเคราต์ สะเด็ดน้ำ'),
      i('150 g', 'onion, thinly sliced', '洋蔥，薄切', '玉ねぎ、薄切り', '양파, 얇게 썰기', 'หอมใหญ่ซอยบาง'),
      i('180 g', 'tart apple, peeled and diced', '酸味蘋果，去皮切丁', '酸味のあるりんご、皮をむいて角切り', '새콤한 사과, 껍질 벗겨 깍둑썰기', 'แอปเปิลรสเปรี้ยว ปอกและหั่นเต๋า'),
      i('25 g', 'unsalted butter', '無鹽奶油', '無塩バター', '무염 버터', 'เนยจืด'),
      i('150 ml', 'dry white wine', '乾白酒', '辛口白ワイン', '드라이 화이트 와인', 'ไวน์ขาวแห้ง'),
      i('150 ml', 'unsalted stock', '無鹽高湯', '無塩ストック', '무염 육수', 'สต๊อกไม่เค็ม'),
      i('5 g', 'caraway seeds', '葛縷子', 'キャラウェイシード', '캐러웨이 씨', 'เมล็ดยี่หร่าฝรั่ง'),
      i('6', 'juniper berries, lightly crushed', '杜松子，輕壓', 'ジュニパーベリー、軽く潰す', '주니퍼베리, 살짝 으깨기', 'จูนิเปอร์เบอร์รี บุบเบา ๆ'),
      i('2', 'bay leaves', '月桂葉', 'ローリエ', '월계수잎', 'ใบกระวาน'),
      i('20 ml', 'neutral oil', '中性油', '中性油', '중성유', 'น้ำมันรสกลาง'),
      i('40 g', 'medium German mustard, for serving', '德式中辣芥末，上桌用', 'ドイツの中辛マスタード、添える', '독일식 미디엄 머스터드, 곁들이기', 'มัสตาร์ดเยอรมันรสกลาง สำหรับเสิร์ฟ'),
      i('6 g', 'fine salt', '細鹽', '細塩', '고운 소금', 'เกลือละเอียด')
    ],
    instructions: [
      s(ml('Soften the onion and apple', '炒軟洋蔥與蘋果', '玉ねぎとりんごを炒める', '양파와 사과 볶기', 'ผัดหอมและแอปเปิล'), ml('Melt the butter in a wide saucepan over medium heat. Add the onion and apple with half the salt and cook for 7 minutes until softened but not deeply browned.', '寬鍋中火融化奶油，加入洋蔥、蘋果與一半鹽炒 7 分鐘，至柔軟但不要煎成深褐色。', '広い鍋にバターを中火で溶かし、玉ねぎ、りんご、塩半量を7分、柔らかくなるまで炒める。濃く色づけない。', '넓은 냄비에 버터를 중불로 녹이고 양파, 사과, 소금 절반을 넣어 7분 부드러워지되 진하게 갈색 나지 않게 볶습니다.', 'ละลายเนยในหม้อกว้างไฟกลาง ใส่หอม แอปเปิล และเกลือครึ่งหนึ่ง ผัด 7 นาทีจนนุ่มแต่ไม่เป็นสีน้ำตาลเข้ม'), 'Softened pale onion and apple pieces glistening in butter in a wide saucepan.'),
      s(ml('Braise the sauerkraut', '燉煮酸菜', 'ザワークラウトを煮る', '사우어크라우트 익히기', 'ตุ๋นซาวเคราต์'), ml('Add the drained sauerkraut, white wine, stock, caraway, juniper and bay leaves. Bring to a gentle simmer, cover loosely and cook for 25 minutes, stirring twice so the cabbage heats evenly.', '加入瀝乾酸菜、白酒、高湯、葛縷子、杜松子與月桂葉。煮至溫和小滾，半蓋燉 25 分鐘，中途攪拌 2 次讓酸菜均勻受熱。', '水気を切ったザワークラウト、白ワイン、ストック、キャラウェイ、ジュニパー、ローリエを加える。弱く沸かし、蓋を少しずらして25分煮、途中2回混ぜる。', '물기 뺀 사우어크라우트, 화이트 와인, 육수, 캐러웨이, 주니퍼, 월계수잎을 넣습니다. 약하게 끓인 뒤 뚜껑을 살짝 열어 25분 익히고 중간에 2번 저어 고르게 데웁니다.', 'ใส่ซาวเคราต์ ไวน์ขาว สต๊อก ยี่หร่าฝรั่ง จูนิเปอร์ และใบกระวาน พอเดือดอ่อน ๆ ปิดฝาแง้ม เคี่ยว 25 นาที คน 2 ครั้งให้ร้อนทั่ว'), 'Sauerkraut gently braising with apple, onion, bay and juniper in a small amount of aromatic liquid.'),
      s(ml('Reduce the cabbage juices', '收乾酸菜汁液', '煮汁を飛ばす', '사우어크라우트 수분 졸이기', 'เคี่ยวน้ำกะหล่ำให้ลด'), ml('Remove the lid and simmer the sauerkraut for 5–8 minutes until moist but no watery liquid pools at the bottom. Remove the bay leaves and season with the remaining salt.', '拿掉鍋蓋，再小滾 5–8 分鐘，至酸菜保持濕潤但鍋底沒有水狀液體；取出月桂葉，以剩餘鹽調味。', '蓋を外して5〜8分、しっとりしているが底に水っぽい汁が残らないまで煮る。ローリエを除き、残りの塩で調える。', '뚜껑을 열고 5–8분 더 끓여 촉촉하지만 바닥에 묽은 액체가 고이지 않게 합니다. 월계수잎을 빼고 남은 소금으로 간합니다.', 'เปิดฝาเคี่ยว 5–8 นาทีจนยังชุ่มแต่ไม่มีน้ำใสขังที่ก้นหม้อ เอาใบกระวานออกและปรุงด้วยเกลือที่เหลือ'), 'Finished sauerkraut looking moist and glossy but with no watery liquid pooling in the pan.'),
      s(ml('Brown the sausages', '煎香小香腸', 'ソーセージを焼く', '소시지 갈색 내기', 'ย่างไส้กรอก'), ml('Heat the oil in a large skillet over medium-high heat. Cook the sausages in 2 batches for 7–9 minutes per batch, turning frequently until evenly deep golden and hot through.', '大煎鍋中大火加熱中性油，香腸分 2 批，每批煎 7–9 分鐘，頻繁翻動至均勻深金黃並熱透。', '大きなフライパンに油を中強火で熱し、ソーセージを2回に分け、各7〜9分、頻繁に返して濃い金色に焼き中心まで熱くする。', '큰 팬에 기름을 중강불로 데우고 소시지를 2번 나눠 각 7–9분 자주 굴려 진한 금빛으로 고르게 익히고 속까지 뜨겁게 합니다.', 'อุ่นน้ำมันในกระทะใหญ่ไฟกลางแรง ย่างไส้กรอก 2 รอบ รอบละ 7–9 นาที พลิกบ่อยจนสีทองเข้มสม่ำเสมอและร้อนทั่ว'), 'Small Nuremberg sausages browning in a skillet with evenly caramelized surfaces and no burnt spots.'),
      s(ml('Rest briefly', '短暫靜置香腸', '少し休ませる', '잠깐 휴지시키기', 'พักสั้น ๆ'), ml('Transfer the browned sausages to a warm plate and rest for 3 minutes while the sauerkraut is given one final stir. Keep them uncovered so the browned surfaces stay dry.', '煎好的香腸移至溫熱盤中，靜置 3 分鐘，同時最後攪拌一次酸菜；不要覆蓋，讓焦香表面維持乾爽。', '焼いたソーセージを温かい皿へ移し、ザワークラウトを最後に混ぜる間3分休ませる。表面を乾いたまま保つため覆わない。', '갈색 낸 소시지를 따뜻한 접시에 옮겨 사우어크라우트를 마지막으로 한 번 젓는 동안 3분 휴지합니다. 표면이 눅눅해지지 않게 덮지 않습니다.', 'ย้ายไส้กรอกที่ย่างแล้วไปจานอุ่น พัก 3 นาทีระหว่างคนซาวเคราต์ครั้งสุดท้าย และไม่ปิดฝาเพื่อให้ผิวยังคงแห้ง'), 'A warm platter of browned small sausages resting uncovered beside a pan of finished sauerkraut.'),
      s(ml('Serve with mustard', '搭芥末上桌', 'マスタードを添える', '머스터드와 내기', 'เสิร์ฟกับมัสตาร์ด'), ml('Divide the sauerkraut among 4 warm plates and arrange 6 sausages on each. Serve the German mustard alongside so it stays distinct from the cabbage juices.', '酸菜分到 4 個溫熱餐盤，每盤放 6 根香腸；德式芥末放在旁邊，不要直接混進酸菜汁。', 'ザワークラウトを温かい4皿へ分け、各皿にソーセージ6本を盛る。ドイツマスタードはキャベツの汁と混ぜず横に添える。', '사우어크라우트를 따뜻한 4접시에 나누고 접시마다 소시지 6개를 놓습니다. 독일식 머스터드는 양배추 국물과 섞이지 않게 옆에 냅니다.', 'แบ่งซาวเคราต์ใส่จานอุ่น 4 จาน วางไส้กรอกจานละ 6 ชิ้น เสิร์ฟมัสตาร์ดเยอรมันข้าง ๆ แยกจากน้ำกะหล่ำ'), 'A traditional plate of six small browned Nuremberg sausages beside pale-gold sauerkraut with a small spoonful of mustard.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Nürnberger Rostbratwürste are a protected Nuremberg specialty with a long local history. They are traditionally small, seasoned with marjoram, and commonly served with sauerkraut or bread and mustard.', 'Nürnberger Rostbratwürste 是具有地理保護的紐倫堡名產，地方歷史悠久；特色是體型小巧、帶有馬鬱蘭香氣，常搭酸菜，或配麵包與芥末。', 'ニュルンベルガー・ロストブラートヴルストは地理的保護を受けるニュルンベルク名物で、小ぶりでマジョラムの香りが特徴です。ザワークラウト、またはパンとマスタードで食べられます。', '뉘른베르거 로스트브라트부어스트는 지리적 보호를 받는 뉘른베르크 특산품으로 작고 마조람 향이 특징이며 사우어크라우트 또는 빵과 머스터드와 함께 먹습니다.', 'Nürnberger Rostbratwürste เป็นของขึ้นชื่อที่ได้รับการคุ้มครองของนูเรมเบิร์ก มีขนาดเล็ก กลิ่นมาร์จอแรม และมักเสิร์ฟกับซาวเคราต์หรือขนมปังกับมัสตาร์ด'),
    imageAlt: ml('Small browned Nuremberg sausages with sauerkraut and German mustard', '金黃紐倫堡小香腸搭酸菜與德式芥末', '焼き色の付いたニュルンベルクソーセージとザワークラウト、マスタード', '갈색 낸 뉘른베르크 소시지와 사우어크라우트, 독일식 머스터드', 'ไส้กรอกนูเรมเบิร์กย่างกับซาวเคราต์และมัสตาร์ดเยอรมัน'),
    visualSpec: 'Traditional Nuremberg serving with several very small deeply browned grilled sausages grouped beside pale braised sauerkraut and a small amount of mustard; rustic Franconian presentation.'
  }),

  r({
    id: 'frikadellen', profile: 'pan',
    region: ml('Germany-wide home cooking', '德國家常傳統', 'ドイツ各地の家庭料理', '독일 전역 가정식', 'อาหารบ้านทั่วเยอรมนี'),
    name: ml('Frikadellen', '德式煎肉餅', 'フリカデレン', '프리카델렌', 'ฟริคาเดลเลน'),
    prepMinutes: 30, cookMinutes: 25, totalMinutes: 55, servings: 4,
    description: ml('German pan-fried meat patties made tender with a milk-soaked bread roll and seasoned with onion, mustard, parsley and marjoram. They should have a dark savoury crust while remaining juicy and springy inside.', '德式平底鍋煎肉餅，以牛奶浸泡的小餐包保持柔嫩，再加入洋蔥、芥末、巴西里與馬鬱蘭調味。外層要有深色焦香，內部仍多汁有彈性。', '牛乳に浸したパンで柔らかさを出し、玉ねぎ、マスタード、パセリ、マジョラムを利かせたドイツの肉団子です。濃い焼き色の外側と、ジューシーで弾力ある中身に仕上げます。', '우유에 불린 빵으로 부드러움을 더하고 양파, 머스터드, 파슬리, 마조람으로 간한 독일식 팬 프라이 고기 패티입니다. 겉은 진하게 갈색 나고 속은 촉촉하고 탄력 있어야 합니다.', 'แพตตีเนื้อทอดกระทะแบบเยอรมัน ใช้ขนมปังแช่นมให้นุ่ม ปรุงด้วยหอม มัสตาร์ด พาร์สลีย์ และมาร์จอแรม ให้ผิวน้ำตาลเข้มแต่ด้านในฉ่ำเด้ง'),
    ingredients: [
      i('600 g', 'mixed beef and pork mince', '牛豬混合絞肉', '牛豚合挽き肉', '소고기·돼지고기 혼합 다짐육', 'เนื้อวัวผสมหมูบด'),
      i('70 g', 'day-old bread roll, torn', '隔夜小餐包，撕碎', '前日のロールパン、ちぎる', '하루 지난 롤빵, 뜯기', 'ขนมปังก้อนเก่าหนึ่งวัน ฉีก'),
      i('120 ml', 'whole milk', '全脂牛奶', '全乳', '전지 우유', 'นมสดเต็มมันเนย'),
      i('140 g', 'onion, finely diced', '洋蔥，細丁', '玉ねぎ、みじん切り', '양파, 잘게 다지기', 'หอมใหญ่หั่นเต๋าเล็ก'),
      i('20 g', 'unsalted butter', '無鹽奶油', '無塩バター', '무염 버터', 'เนยจืด'),
      i('1', 'large egg', '大雞蛋', '大きな卵', '큰 달걀', 'ไข่ไก่ฟองใหญ่'),
      i('25 g', 'medium German mustard', '德式中辣芥末', 'ドイツの中辛マスタード', '독일식 미디엄 머스터드', 'มัสตาร์ดเยอรมันรสกลาง'),
      i('15 g', 'flat-leaf parsley, finely chopped', '平葉巴西里，細切', '平葉パセリ、みじん切り', '이탈리안 파슬리, 잘게 다지기', 'พาร์สลีย์ใบแบน สับละเอียด'),
      i('3 g', 'dried marjoram', '乾燥馬鬱蘭', '乾燥マジョラム', '말린 마조람', 'มาร์จอแรมแห้ง'),
      i('10 g', 'fine salt', '細鹽', '細塩', '고운 소금', 'เกลือละเอียด'),
      i('3 g', 'black pepper', '黑胡椒', '黒こしょう', '후추', 'พริกไทยดำ'),
      i('30 ml', 'neutral oil or clarified butter', '中性油或澄清奶油', '中性油または澄ましバター', '중성유 또는 클래리파이드 버터', 'น้ำมันรสกลางหรือเนยใส')
    ],
    instructions: [
      s(ml('Soak the bread', '浸泡麵包', 'パンを浸す', '빵 불리기', 'แช่ขนมปัง'), ml('Pour the milk over the torn bread and leave it for 10 minutes. Squeeze gently so the bread stays moist but no free milk drips out.', '牛奶倒在撕碎麵包上，靜置 10 分鐘；輕輕擠壓，讓麵包保持濕潤但不再滴出游離牛奶。', 'ちぎったパンに牛乳を注ぎ10分置く。しっとり感を残しつつ、余分な牛乳が滴らない程度に軽く絞る。', '뜯은 빵에 우유를 붓고 10분 둡니다. 촉촉함은 남기되 우유가 떨어지지 않을 정도로 가볍게 짭니다.', 'เทนมบนขนมปังฉีก พัก 10 นาที บีบเบา ๆ ให้ยังชื้นแต่ไม่มีนมหยดออก'), 'A bowl of softened milk-soaked bread squeezed just enough to remain moist without pooled milk.'),
      s(ml('Soften the onion', '炒軟洋蔥', '玉ねぎを炒める', '양파 볶기', 'ผัดหอม'), ml('Melt the butter in a small skillet over medium heat. Cook the onion for 6–8 minutes until translucent and lightly golden, then cool for 5 minutes.', '小煎鍋中火融化奶油，洋蔥炒 6–8 分鐘至透明並微金黃，再放涼 5 分鐘。', '小さなフライパンにバターを中火で溶かし、玉ねぎを6〜8分、透き通って薄く色づくまで炒め、5分冷ます。', '작은 팬에 버터를 중불로 녹이고 양파를 6–8분 투명하고 옅은 금빛이 날 때까지 볶은 뒤 5분 식힙니다.', 'ละลายเนยในกระทะเล็กไฟกลาง ผัดหอม 6–8 นาทีจนใสและเหลืองอ่อน แล้วพักเย็น 5 นาที'), 'Soft translucent onions with a faint golden edge cooling in a small skillet.'),
      s(ml('Mix gently', '輕柔混合肉餡', '肉だねを混ぜる', '고기 반죽 섞기', 'ผสมเนื้อเบา ๆ'), ml('Combine the mince, soaked bread, cooled onion, egg, mustard, parsley, marjoram, salt and pepper. Mix only until evenly combined; overworking makes the patties dense.', '混合絞肉、泡軟麵包、放涼洋蔥、雞蛋、芥末、巴西里、馬鬱蘭、鹽與胡椒，只拌到均勻；過度攪打會讓肉餅變緊實。', '挽肉、浸したパン、冷ました玉ねぎ、卵、マスタード、パセリ、マジョラム、塩、こしょうを均一になるまでだけ混ぜる。練りすぎない。', '다짐육, 불린 빵, 식힌 양파, 달걀, 머스터드, 파슬리, 마조람, 소금, 후추를 고르게 섞일 정도만 섞습니다. 너무 치대면 단단해집니다.', 'ผสมเนื้อบด ขนมปัง หอมที่เย็นแล้ว ไข่ มัสตาร์ด พาร์สลีย์ มาร์จอแรม เกลือ และพริกไทย แค่พอเข้ากัน อย่านวดมากจนแน่น'), 'A cohesive but lightly mixed meat mixture with visible parsley and onion, not compressed into a paste.'),
      s(ml('Shape the patties', '塑形成肉餅', '成形する', '패티 성형하기', 'ขึ้นรูปแพตตี'), ml('Divide the mixture into 8 equal patties about 20 mm thick. Smooth cracked edges lightly without packing the centres too tightly.', '肉餡分成 8 個等份肉餅，厚約 20 毫米；輕輕修整裂邊，不要把中心壓得過實。', '肉だねを8等分し、厚さ約20mmの平たい形にする。ひびだけ軽く整え、中心を強く押し固めない。', '고기 반죽을 8등분해 약 20mm 두께 패티로 만들고 갈라진 가장자리만 가볍게 다듬으며 중심은 너무 세게 누르지 않습니다.', 'แบ่งส่วนผสมเป็นแพตตีเท่ากัน 8 ชิ้น หนาประมาณ 20 มม. เกลี่ยรอยแตกเบา ๆ โดยไม่กดตรงกลางแน่นเกิน'), 'Eight evenly shaped raw oval meat patties about 20 mm thick on a tray, with lightly textured surfaces.'),
      s(ml('Chill to firm', '冷藏定型', '冷やして落ち着かせる', '냉장해 단단하게 만들기', 'แช่เย็นให้เซ็ต'), ml('Refrigerate the shaped patties for 15 minutes. This short rest firms the softened bread and fat so the patties hold together when they hit the pan.', '成形肉餅冷藏 15 分鐘；短暫休息能讓泡軟麵包與脂肪穩定，入鍋時更不容易散開。', '成形した肉だねを15分冷蔵する。パンと脂が落ち着き、焼く時に崩れにくくなる。', '성형한 패티를 15분 냉장합니다. 불린 빵과 지방이 안정되어 팬에 올렸을 때 잘 부서지지 않습니다.', 'แช่แพตตีที่ขึ้นรูปแล้ว 15 นาที ให้ขนมปังและไขมันเซ็ตตัว จึงไม่แตกง่ายตอนลงกระทะ'), 'Eight chilled firm raw patties on a tray, ready to fry and holding clean edges.'),
      s(ml('Pan-fry in batches', '分批煎熟', '分けて焼く', '나눠 팬프라이하기', 'ทอดกระทะเป็นรอบ'), ml('Heat the oil in a wide skillet over medium heat. Fry the patties in 2 batches for 5–6 minutes per side until dark golden and the centres reach 71°C. Add a little extra fat only if the pan becomes dry.', '寬煎鍋中火加熱油脂，肉餅分 2 批，每面煎 5–6 分鐘，至深金黃且中心達 71°C；只有鍋面變乾時才補少量油脂。', '広いフライパンに油を中火で熱し、2回に分けて片面5〜6分ずつ、濃い金色で中心71°Cになるまで焼く。鍋が乾いた時だけ少量の油を足す。', '넓은 팬에 기름을 중불로 데우고 패티를 2번 나눠 한 면당 5–6분씩 진한 금빛이고 중심이 71°C가 될 때까지 굽습니다. 팬이 마를 때만 지방을 조금 보충합니다.', 'อุ่นน้ำมันในกระทะกว้างไฟกลาง ทอดแพตตี 2 รอบ ด้านละ 5–6 นาทีจนทองเข้มและตรงกลางถึง 71°C เติมไขมันเล็กน้อยเฉพาะเมื่อกระทะแห้ง'), 'Deep-golden Frikadellen frying in a skillet, with an even crust and no crowding.'),
      s(ml('Rest and serve', '靜置後上桌', '休ませて盛る', '휴지 후 내기', 'พักและเสิร์ฟ'), ml('Rest the cooked patties uncovered for 5 minutes, then serve hot with potato salad, mustard or bread, or cool completely for a traditional cold snack.', '煎熟肉餅不覆蓋靜置 5 分鐘，再趁熱搭馬鈴薯沙拉、芥末或麵包上桌；也可完全放涼作為傳統冷食。', '焼いた肉だねを覆わず5分休ませ、ポテトサラダ、マスタード、パンと温かく出す。または完全に冷まして軽食にする。', '익힌 패티를 덮지 않고 5분 휴지한 뒤 감자 샐러드, 머스터드 또는 빵과 뜨겁게 내거나 완전히 식혀 전통적인 차가운 간식으로 먹습니다.', 'พักแพตตีสุกแบบไม่ปิด 5 นาที แล้วเสิร์ฟร้อนกับสลัดมันฝรั่ง มัสตาร์ด หรือขนมปัง หรือปล่อยเย็นสนิทเป็นของกินเย็นแบบดั้งเดิม'), 'Finished dark-golden Frikadellen on a simple plate with mustard and German potato salad beside them.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Frikadellen appear across Germany under several regional names, including Bulette and Fleischküchle. They are equally at home as a warm family meal or a cold snack in bread.', 'Frikadellen 在德國各地有多種地方名稱，例如 Bulette 與 Fleischküchle；既能作為熱騰騰的家常主菜，也常放涼夾麵包當點心。', 'フリカデレンは地域によりブレッテやフライシュキューヒレなどとも呼ばれ、温かい家庭料理にも、冷ましてパンにはさむ軽食にもなります。', '프리카델렌은 독일 지역에 따라 Bulette, Fleischküchle 등 여러 이름으로 불리며 따뜻한 가정식으로도, 식혀 빵에 넣는 간식으로도 먹습니다.', 'Frikadellen มีชื่อท้องถิ่นหลายแบบทั่วเยอรมนี เช่น Bulette และ Fleischküchle กินได้ทั้งเป็นอาหารร้อนในบ้านหรือของกินเย็นกับขนมปัง'),
    imageAlt: ml('Golden-brown German Frikadellen meat patties with mustard and potato salad', '金褐色德式 Frikadellen 肉餅搭芥末與馬鈴薯沙拉', '濃い焼き色のドイツ風フリカデレンとマスタード、ポテトサラダ', '진한 금갈색 독일식 프리카델렌과 머스터드, 감자 샐러드', 'ฟริคาเดลเลนเยอรมันสีน้ำตาลทองกับมัสตาร์ดและสลัดมันฝรั่ง'),
    visualSpec: 'Home-style German Frikadellen: thick oval pan-fried meat patties with a dark golden-brown crust and juicy cut interior, served simply with mustard and potato salad or bread.'
  }),

  r({
    id: 'koenigsberger-klopse', profile: 'braise',
    region: ml('East Prussian tradition', '東普魯士傳統', '東プロイセンの伝統', '동프로이센 전통', 'ธรรมเนียมปรัสเซียตะวันออก'),
    name: ml('Königsberger Klopse', '柯尼斯堡酸豆奶油肉丸', 'ケーニヒスベルガー・クロプセ', '쾨니히스베르거 클롭세', 'เคอนิกส์แบร์เกอร์ คลอปเซ'),
    prepMinutes: 35, cookMinutes: 45, totalMinutes: 80, servings: 4,
    description: ml('Tender meatballs poached rather than browned, finished in a pale velvety sauce sharpened with capers and lemon. Anchovy in the meat mixture gives the East Prussian classic its characteristic savoury depth without making it taste overtly fishy.',
      '這道東普魯士經典不是先煎肉丸，而是溫和水煮，再放入淡色絲滑醬汁，以酸豆與檸檬提亮。肉餡中的鯷魚提供鹹鮮深度，但不應吃出明顯魚味。',
      '焼かずに静かにゆでた柔らかな肉団子を、ケッパーとレモンを利かせた淡いクリーミーなソースで仕上げる東プロイセンの名物です。肉だねのアンチョビが魚臭くならず旨味を深めます。',
      '갈색 내지 않고 부드럽게 포칭한 미트볼을 케이퍼와 레몬으로 산미를 준 옅고 벨벳 같은 소스에 마무리하는 동프로이센의 고전입니다. 고기 반죽의 앤초비는 비린 맛 없이 감칠맛을 더합니다.',
      'มีตบอลนุ่มที่ต้มอย่างเบาแทนการจี่ เสิร์ฟในซอสสีอ่อนเนียนที่ได้ความสดจากเคเปอร์และเลมอน แอนโชวีในเนื้อเพิ่มอูมามิแบบปรัสเซียตะวันออกโดยไม่มีกลิ่นปลาชัด'
    ),
    ingredients: [
      i('500 g', 'mixed beef and pork mince', '牛豬混合絞肉', '牛豚合挽き肉', '소고기·돼지고기 혼합 다짐육', 'เนื้อวัวผสมหมูบด'),
      i('70 g', 'day-old bread, crust removed', '隔夜麵包，去硬皮', '前日のパン、耳を除く', '하루 지난 빵, 껍질 제거', 'ขนมปังเก่าหนึ่งวัน ตัดขอบ'),
      i('120 ml', 'whole milk', '全脂牛奶', '全乳', '전지 우유', 'นมสดเต็มมันเนย'),
      i('120 g', 'onion, very finely diced', '洋蔥，極細丁', '玉ねぎ、細かいみじん切り', '양파, 아주 잘게 다지기', 'หอมใหญ่สับละเอียดมาก'),
      i('20 g', 'unsalted butter', '無鹽奶油', '無塩バター', '무염 버터', 'เนยจืด'),
      i('25 g', 'anchovy fillets, finely chopped', '鯷魚片，細切', 'アンチョビ、細かく刻む', '앤초비 필렛, 잘게 다지기', 'แอนโชวี สับละเอียด'),
      i('1', 'large egg', '大雞蛋', '大きな卵', '큰 달걀', 'ไข่ไก่ฟองใหญ่'),
      i('15 g', 'flat-leaf parsley, finely chopped', '平葉巴西里，細切', '平葉パセリ、みじん切り', '이탈리안 파슬리, 잘게 다지기', 'พาร์สลีย์ใบแบน สับละเอียด'),
      i('1.2 L', 'unsalted beef stock', '無鹽牛高湯', '無塩ビーフストック', '무염 소고기 육수', 'สต๊อกเนื้อไม่เค็ม'),
      i('2', 'bay leaves', '月桂葉', 'ローリエ', '월계수잎', 'ใบกระวาน'),
      i('45 g', 'unsalted butter, for sauce', '無鹽奶油，醬汁用', '無塩バター、ソース用', '무염 버터, 소스용', 'เนยจืด สำหรับซอส'),
      i('45 g', 'plain flour', '中筋麵粉', '薄力粉', '중력분', 'แป้งสาลีอเนกประสงค์'),
      i('180 ml', 'double cream', '濃鮮奶油', '生クリーム', '더블 크림', 'ดับเบิลครีม'),
      i('50 g', 'capers, drained', '酸豆，瀝乾', 'ケッパー、水気を切る', '케이퍼, 물기 제거', 'เคเปอร์ สะเด็ดน้ำ'),
      i('30 ml', 'fresh lemon juice', '新鮮檸檬汁', 'レモン汁', '레몬즙', 'น้ำเลมอนสด'),
      i('12 g', 'fine salt, divided', '細鹽，分次使用', '細塩、分けて使う', '고운 소금, 나눠 사용', 'เกลือละเอียด แบ่งใช้'),
      i('3 g', 'white pepper', '白胡椒', '白こしょう', '흰후추', 'พริกไทยขาว')
    ],
    instructions: [
      s(ml('Soak the bread', '浸泡麵包', 'パンを浸す', '빵 불리기', 'แช่ขนมปัง'), ml('Soak the bread in the milk for 10 minutes, then squeeze it gently so it is moist but not dripping.', '麵包以牛奶浸泡 10 分鐘，再輕輕擠壓，保留濕潤但不要滴出牛奶。', 'パンを牛乳に10分浸し、しっとりしているが滴らない程度に軽く絞る。', '빵을 우유에 10분 불린 뒤 촉촉하지만 우유가 떨어지지 않을 정도로 가볍게 짭니다.', 'แช่ขนมปังในนม 10 นาที แล้วบีบเบา ๆ ให้ชื้นแต่ไม่หยด'), 'A small bowl of milk-soaked bread, softened and lightly squeezed with no pooled milk.'),
      s(ml('Sweat and cool the onion', '炒軟並放涼洋蔥', '玉ねぎを炒めて冷ます', '양파 볶아 식히기', 'ผัดหอมแล้วพักเย็น'), ml('Melt the first butter in a skillet and cook the onion over medium-low heat for 6 minutes until translucent. Cool for 5 minutes before mixing it into the meat.', '用第一份奶油以中小火炒洋蔥 6 分鐘至透明，再放涼 5 分鐘後才加入肉餡。', '最初のバターを溶かし、玉ねぎを中弱火で6分、透き通るまで炒める。肉だねへ入れる前に5分冷ます。', '첫 번째 버터를 녹이고 양파를 중약불에서 6분 투명해질 때까지 볶은 뒤 고기 반죽에 넣기 전에 5분 식힙니다.', 'ละลายเนยส่วนแรก ผัดหอมไฟกลางอ่อน 6 นาทีจนใส แล้วพักเย็น 5 นาทีก่อนผสมกับเนื้อ'), 'Translucent finely diced onion cooling in a small skillet, pale with no dark browning.'),
      s(ml('Mix and shape the meatballs', '混合並塑形肉丸', '肉だねを丸める', '미트볼 섞어 성형하기', 'ผสมและปั้นมีตบอล'), ml('Mix the mince, soaked bread, cooled onion, anchovy, egg, parsley, half the salt and all the white pepper only until combined. Shape into 12 equal meatballs.', '絞肉、泡軟麵包、放涼洋蔥、鯷魚、雞蛋、巴西里、一半鹽與全部白胡椒只拌至均勻，塑形成 12 顆等大肉丸。', '挽肉、パン、冷ました玉ねぎ、アンチョビ、卵、パセリ、塩半量、白こしょうを均一になるまでだけ混ぜ、12個の同じ大きさの肉団子にする。', '다짐육, 불린 빵, 식힌 양파, 앤초비, 달걀, 파슬리, 소금 절반, 흰후추를 고르게 섞일 정도만 섞어 같은 크기 미트볼 12개로 만듭니다.', 'ผสมเนื้อ ขนมปัง หอมเย็น แอนโชวี ไข่ พาร์สลีย์ เกลือครึ่งหนึ่ง และพริกไทยขาวพอเข้ากัน ปั้นเป็นมีตบอลเท่ากัน 12 ลูก'), 'Twelve evenly shaped pale raw meatballs on a tray, with fine parsley flecks visible.'),
      s(ml('Poach gently', '溫和水煮肉丸', '静かにゆでる', '부드럽게 포칭하기', 'ต้มเบา ๆ'), ml('Bring the stock and bay leaves to a bare simmer. Lower in the meatballs and poach for 15–18 minutes without a hard boil, until the centres reach 71°C. Lift them out and keep warm.', '高湯與月桂葉加熱至極輕微小滾，放入肉丸，以不猛烈沸騰的狀態煮 15–18 分鐘，至中心達 71°C；撈出保溫。', 'ストックとローリエを弱く沸かし、肉団子を入れて激しく沸騰させず15〜18分、中心71°Cまでゆでる。取り出して保温する。', '육수와 월계수잎을 아주 약하게 끓이고 미트볼을 넣어 세게 끓이지 않은 채 15–18분, 중심이 71°C가 될 때까지 포칭한 뒤 건져 따뜻하게 둡니다.', 'นำสต๊อกกับใบกระวานให้เดือดอ่อนมาก ใส่มีตบอล ต้ม 15–18 นาทีโดยไม่ให้เดือดแรง จนตรงกลางถึง 71°C ตักขึ้นพักอุ่น'), 'Pale cooked meatballs gently poaching in clear stock with bay leaves, no vigorous bubbles.'),
      s(ml('Make the roux', '製作奶油麵糊', 'ルーを作る', '루 만들기', 'ทำรูซ์'), ml('Measure 600 ml of the hot poaching stock. Melt the sauce butter in a clean saucepan, stir in the flour and cook over medium-low heat for 2 minutes without browning.', '量取 600 毫升熱水煮高湯。乾淨醬汁鍋融化醬汁用奶油，拌入麵粉，以中小火炒 2 分鐘但不要上色。', '熱いゆで汁600mlを量る。別鍋にソース用バターを溶かし、小麦粉を混ぜて中弱火で2分、色を付けずに炒める。', '뜨거운 포칭 육수 600ml를 덜어 둡니다. 깨끗한 냄비에 소스용 버터를 녹이고 밀가루를 넣어 중약불에서 2분 갈색 나지 않게 볶습니다.', 'ตวงน้ำต้มร้อน 600 มล. ละลายเนยสำหรับซอสในหม้อสะอาด ใส่แป้ง คนไฟกลางอ่อน 2 นาทีโดยไม่ให้มีสี'), 'A pale butter-and-flour roux in a clean saucepan, smooth and bubbling lightly without browning.'),
      s(ml('Build the cream sauce', '完成奶油醬底', 'クリームソースを作る', '크림 소스 만들기', 'ทำซอสครีม'), ml('Whisk the 600 ml stock gradually into the roux. Simmer for 5 minutes until smooth, then add the cream and simmer for another 3 minutes.', '將 600 毫升高湯分次攪入奶油麵糊，小滾 5 分鐘至滑順，再加入鮮奶油並續煮 3 分鐘。', 'ルーへストック600mlを少しずつ混ぜ、5分煮て滑らかにする。生クリームを加え、さらに3分煮る。', '루에 육수 600ml를 조금씩 휘저어 넣고 5분 매끈하게 끓인 뒤 크림을 넣고 3분 더 끓입니다.', 'ค่อย ๆ ตีสต๊อก 600 มล. ลงในรูซ์ เคี่ยว 5 นาทีจนเนียน เติมครีมแล้วเคี่ยวอีก 3 นาที'), 'A pale smooth cream sauce thickening in a saucepan, glossy and lump-free.'),
      s(ml('Add capers and lemon', '加入酸豆與檸檬', 'ケッパーとレモンを加える', '케이퍼와 레몬 넣기', 'ใส่เคเปอร์และเลมอน'), ml('Stir the capers and lemon juice into the sauce and season with the remaining salt. Keep the sauce below a hard boil so the cream stays smooth.', '把酸豆與檸檬汁拌入醬汁，以剩餘鹽調味；維持低於猛烈沸騰的狀態，避免鮮奶油醬分離。', 'ソースにケッパーとレモン汁を混ぜ、残りの塩で調える。生クリームが分離しないよう強く沸騰させない。', '소스에 케이퍼와 레몬즙을 넣고 남은 소금으로 간합니다. 크림이 매끈하게 유지되도록 세게 끓이지 않습니다.', 'คนเคเปอร์และน้ำเลมอนลงซอส ปรุงด้วยเกลือที่เหลือ และอย่าให้เดือดแรงเพื่อให้ครีมเนียน'), 'Pale cream sauce dotted with capers, glossy and smooth with no separation.'),
      s(ml('Warm through and serve', '回鍋加熱並上桌', '温め直して盛る', '다시 데워 내기', 'อุ่นและเสิร์ฟ'), ml('Return the meatballs to the caper sauce and warm them gently for 5 minutes. Serve 3 meatballs per plate with boiled potatoes or rice and enough sauce to pool around them.', '肉丸放回酸豆奶油醬，溫和加熱 5 分鐘；每盤放 3 顆，搭配水煮馬鈴薯或米飯，淋足量醬汁在周圍。', '肉団子をケッパーソースへ戻し、弱火で5分温める。1皿3個をゆでじゃがいもまたは米と盛り、ソースを周囲にたっぷり添える。', '미트볼을 케이퍼 소스에 되돌려 약하게 5분 데웁니다. 접시마다 3개씩 삶은 감자 또는 밥과 담고 소스를 넉넉히 둘러 냅니다.', 'ใส่มีตบอลกลับลงซอสเคเปอร์ อุ่นเบา ๆ 5 นาที เสิร์ฟจานละ 3 ลูกกับมันต้ม หรือข้าว และราดซอสให้ขังรอบ ๆ'), 'Three pale meatballs on a plate in creamy caper sauce, served beside simple boiled potatoes.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Königsberger Klopse take their name from Königsberg in former East Prussia, today Kaliningrad. The caper sauce is the defining feature that distinguishes the dish from other German meatballs.', 'Königsberger Klopse 得名自昔日東普魯士的柯尼斯堡，也就是今日的加里寧格勒；酸豆醬汁是它與其他德式肉丸最鮮明的差別。', 'ケーニヒスベルガー・クロプセは旧東プロイセンのケーニヒスベルク、現在のカリーニングラードに由来し、ケッパーソースが他のドイツ肉団子との大きな違いです。', '쾨니히스베르거 클롭세는 옛 동프로이센의 쾨니히스베르크, 오늘날 칼리닌그라드에서 이름을 얻었으며 케이퍼 소스가 다른 독일 미트볼과 구별되는 핵심입니다.', 'เคอนิกส์แบร์เกอร์ คลอปเซมีชื่อจากเคอนิกส์แบร์กในอดีตปรัสเซียตะวันออก ปัจจุบันคือคาลินินกราด จุดเด่นที่แยกจากมีตบอลเยอรมันอื่นคือซอสเคเปอร์'),
    imageAlt: ml('Königsberger Klopse meatballs in pale creamy caper sauce with potatoes', 'Königsberger Klopse 肉丸浸在淡色酸豆奶油醬中搭馬鈴薯', '淡いケッパークリームソースとじゃがいものケーニヒスベルガー・クロプセ', '옅은 케이퍼 크림 소스와 감자를 곁들인 쾨니히스베르거 클롭세', 'มีตบอลเคอนิกส์แบร์เกอร์ในซอสครีมเคเปอร์สีอ่อนกับมันฝรั่ง'),
    visualSpec: 'Classic Königsberger Klopse: several pale poached meatballs sitting in a light ivory cream sauce visibly dotted with capers, served with plain boiled potatoes; no browning on the meatballs.'
  })
];
