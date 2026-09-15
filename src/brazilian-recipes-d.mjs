import { ml, ingredient as i, step as s, makeBrazilianRecipe as r, chilledDessertStorage } from './brazilian-recipe-helpers.mjs';

export const brazilianRecipesD = [
  r({
    id: 'brigadeiro', profile: 'dessert',
    region: ml('Brazil, especially southeastern Brazil', '巴西，尤其是巴西東南部', 'ブラジル、特に南東部', '브라질, 특히 남동부', 'บราซิล โดยเฉพาะภาคตะวันออกเฉียงใต้'),
    name: ml('Brigadeiro', '巴西可可煉乳巧克力球', 'ブリガデイロ', '브리가데이루', 'บริกาเดโร'),
    prepMinutes: 35, cookMinutes: 10, totalMinutes: 45, servings: 18,
    description: ml('A glossy Brazilian chocolate sweet made by cooking condensed milk, cocoa and butter to a fudgy mass, then rolling it in chocolate sprinkles.', '煉乳、可可與奶油煮成亮澤濃厚的巴西巧克力甜點，再搓成球裹上巧克力米。', '練乳、ココア、バターをファッジ状に煮詰め、チョコレートスプレーをまぶす艶やかなブラジル菓子です。', '연유, 코코아와 버터를 퍼지처럼 졸인 뒤 초콜릿 스프링클을 입히는 윤기 나는 브라질 과자입니다.', 'ขนมช็อกโกแลตบราซิลเงางามจากนมข้น โกโก้ และเนยกวนจนข้น แล้วปั้นคลุกเกล็ดช็อกโกแลต'),
    ingredients: [
      i('395 g', 'sweetened condensed milk', '加糖煉乳', '加糖練乳', '가당 연유', 'นมข้นหวาน'),
      i('30 g', 'unsweetened cocoa powder', '無糖可可粉', '無糖ココアパウダー', '무가당 코코아 가루', 'ผงโกโก้ไม่หวาน'),
      i('30 g', 'unsalted butter', '無鹽奶油', '無塩バター', '무염 버터', 'เนยจืด'),
      i('1 g', 'fine salt', '細鹽', '細塩', '고운 소금', 'เกลือละเอียด'),
      i('120 g', 'chocolate sprinkles', '巧克力米', 'チョコレートスプレー', '초콜릿 스프링클', 'เกล็ดช็อกโกแลต')
    ],
    instructions: [
      s(ml('Combine the base', '混合基底', '土台を合わせる', '베이스 섞기', 'ผสมฐาน'), ml('Put the condensed milk, cocoa powder, butter and salt in a heavy skillet. Stir over medium heat until no dry cocoa pockets remain.', '煉乳、可可粉、奶油與鹽放入厚底平底鍋，中火攪拌至沒有乾可可粉。', '練乳、ココア、バター、塩を厚手のフライパンに入れ、中火で乾いたココアがなくなるまで混ぜます。', '두꺼운 팬에 연유, 코코아 가루, 버터와 소금을 넣고 중불에서 마른 코코아가 보이지 않을 때까지 젓습니다.', 'ใส่นมข้น ผงโกโก้ เนย และเกลือลงกระทะหนา คนไฟกลางจนไม่เหลือผงโกโก้แห้ง'), 'Smooth dark condensed-milk and cocoa mixture in a heavy skillet.'),
      s(ml('Cook to a fudgy mass', '煮成濃厚巧克力糊', 'ファッジ状まで煮る', '퍼지 농도까지 끓이기', 'กวนจนข้นเป็นฟัดจ์'), ml('Cook for 8–10 minutes, stirring and scraping the base continuously, until the mixture pulls away from the sides and leaves a clear track behind the spatula.', '持續攪拌並刮鍋底煮 8–10 分鐘，至混合物脫離鍋邊，刮刀劃過會留下清楚痕跡。', '絶えず混ぜて底をこすりながら8〜10分、側面から離れ、へらの跡がはっきり残るまで煮詰めます。', '계속 저으며 바닥을 긁어 8–10분, 혼합물이 팬 가장자리에서 떨어지고 주걱 자국이 선명하게 남을 때까지 끓입니다.', 'กวนและขูดก้นตลอด 8–10 นาทีจนส่วนผสมล่อนจากขอบและพายลากแล้วเป็นรอยชัด'), 'Thick glossy brigadeiro mass leaving a clean spatula track in the skillet.'),
      s(ml('Chill the mixture', '冷卻巧克力糊', '冷やす', '반죽 식히기', 'ทำให้เย็น'), ml('Transfer the hot mixture to a lightly buttered plate, press parchment directly onto the surface, and chill for 30 minutes until firm enough to shape.', '熱巧克力糊移到薄抹奶油的盤中，將烘焙紙直接貼在表面，加蓋冷藏 30 分鐘至夠硬可塑形。', '熱い生地を薄くバターを塗った皿へ移し、表面にクッキングシートを密着させ、形作れる固さまで30分冷やします。', '뜨거운 혼합물을 버터를 살짝 바른 접시에 옮기고 유산지를 표면에 밀착해 30분, 빚을 수 있을 때까지 식힙니다.', 'ย้ายส่วนผสมร้อนใส่จานทาเนยบาง กดกระดาษรองอบติดผิว แล้วแช่เย็น 30 นาทีจนแข็งพอปั้น'), 'Chilled firm chocolate brigadeiro mixture on a plate under parchment.'),
      s(ml('Portion the sweets', '分割甜糊', '分ける', '분할하기', 'แบ่งก้อน'), ml('Scoop the chilled mixture into 18 portions of about 15 g each. Roll each portion between lightly buttered palms until round.', '冷卻巧克力糊分成 18 份，每份約 15 g；手掌薄抹奶油後搓成圓球。', '冷えた生地を約15gずつ18個に分け、薄くバターを塗った手のひらで丸めます。', '식힌 혼합물을 약 15g씩 18등분합니다. 손바닥에 버터를 살짝 바르고 둥글게 굴립니다.', 'แบ่งส่วนผสมเย็นเป็น 18 ก้อน ก้อนละประมาณ 15 กรัม ใช้ฝ่ามือทาเนยบาง ๆ คลึงเป็นลูกกลม'), 'Even round brigadeiro balls portioned on a parchment-lined tray.'),
      s(ml('Coat with sprinkles', '裹巧克力米', 'スプレーをまぶす', '스프링클 묻히기', 'คลุกเกล็ดช็อกโกแลต'), ml('Roll each ball through the chocolate sprinkles until completely covered, gently pressing so the sprinkles adhere without flattening the shape.', '每顆巧克力球滾過巧克力米至完全覆蓋，輕輕按壓使其附著但不要壓扁。', 'チョコレートスプレーを転がして全面に付け、形をつぶさないよう軽く押さえます。', '각 공을 초콜릿 스프링클에 굴려 완전히 덮고 모양이 눌리지 않게 살짝 누릅니다.', 'กลิ้งลูกขนมในเกล็ดช็อกโกแลตให้เคลือบทั่ว กดเบา ๆ ให้ติดโดยไม่ทำให้แบน'), 'Brigadeiro balls fully coated in dark chocolate sprinkles.'),
      s(ml('Serve chilled or cool', '冷藏或冷涼上桌', '冷やして供する', '차갑게 내기', 'เสิร์ฟเย็น'), ml('Arrange the brigadeiros in small paper cups and serve cool. The centre should be soft and fudgy while the sprinkles retain a slight crunch.', 'Brigadeiro 放入小紙杯，冷涼上桌；中心應柔軟濃厚，巧克力米仍保留些微脆度。', 'ブリガデイロを小さな紙カップに入れて冷たい状態で供します。中は柔らかなファッジ状、スプレーは少し歯ごたえを残します。', '브리가데이루를 작은 종이컵에 담아 차갑게 냅니다. 속은 부드러운 퍼지 질감이고 스프링클은 살짝 바삭해야 합니다.', 'วางบริกาเดโรในถ้วยกระดาษเล็ก เสิร์ฟเย็น ข้างในควรนุ่มเข้มข้นและเกล็ดยังกรอบเล็กน้อย'), 'Warm brigadeiros in small paper cups with a dense fudgy centre and crisp chocolate sprinkles.'),
    ],
    storage: chilledDessertStorage,
    cultureNote: ml('Brigadeiro is an unmistakably Brazilian party sweet, especially familiar at children’s birthdays and celebrations. Its name is linked to the 1946 presidential campaign of Brigadier Eduardo Gomes.', 'Brigadeiro 是極具巴西特色的派對甜點，特別常見於兒童生日與慶祝活動；名稱與 1946 年准將 Eduardo Gomes 的總統競選活動有關。', 'ブリガデイロはブラジルらしいパーティー菓子で、子どもの誕生日や祝い事でおなじみです。名前は1946年のエドゥアルド・ゴメス准将の大統領選運動に結び付いています。', '브리가데이루는 브라질을 대표하는 파티 과자로 아이들 생일과 축하 자리에 익숙합니다. 이름은 1946년 에두아르두 고메스 준장의 대선 캠페인과 연결됩니다.', 'บริกาเดโรเป็นขนมงานเลี้ยงที่เป็นบราซิลอย่างชัดเจน โดยเฉพาะวันเกิดเด็กและงานฉลอง ชื่อเชื่อมโยงกับการหาเสียงประธานาธิบดีปี 1946 ของนายพลจัตวา Eduardo Gomes'),
    imageAlt: ml('Brazilian brigadeiros coated in chocolate sprinkles', '裹滿巧克力米的巴西 Brigadeiro', 'チョコレートスプレーをまぶしたブラジルのブリガデイロ', '초콜릿 스프링클을 입힌 브라질 브리가데이루', 'บริกาเดโรบราซิลคลุกเกล็ดช็อกโกแลต'),
    visualSpec: 'A neat cluster of small glossy dark brigadeiro chocolate balls in paper cups, completely coated with chocolate sprinkles, one cut to show a dense fudgy centre; celebratory Brazilian sweet table, no truffles or cake slices.'
  }),

  r({
    id: 'quindim', profile: 'dessert',
    region: ml('Northeastern and southeastern Brazil', '巴西東北部與東南部', 'ブラジル北東部と南東部', '브라질 북동부와 남동부', 'บราซิลตะวันออกเฉียงเหนือและตะวันออกเฉียงใต้'),
    name: ml('Quindim', '巴西椰香蛋黃奶凍', 'キンジン', '킨딤', 'คินดิม'),
    prepMinutes: 190, cookMinutes: 45, totalMinutes: 235, servings: 12,
    description: ml('Glittering golden Brazilian coconut custards with a firm yolk-rich top and tender coconut layer, baked gently in a water bath and served unmoulded.', '閃耀金黃的巴西椰香蛋黃奶凍，上層紮實濃郁、底部柔軟帶椰香，以水浴溫和烘烤後脫模上桌。', '卵黄の濃厚な上層と柔らかなココナッツの層を持つ、湯せんで穏やかに焼いて型から外すブラジルの黄金色の菓子です。', '노른자 풍부한 단단한 윗층과 부드러운 코코넛 층을 가진 브라질식 황금 커스터드로 중탕해 구워 틀에서 뺍니다.', 'คัสตาร์ดมะพร้าวบราซิลสีทองเงา มีหน้าจากไข่แดงแน่นและชั้นมะพร้าวนุ่ม อบแบบหล่อในน้ำแล้วคว่ำเสิร์ฟ'),
    ingredients: [
      i('12', 'large egg yolks', '大雞蛋黃', '大きな卵黄', '큰 달걀 노른자', 'ไข่แดงฟองใหญ่'),
      i('250 g', 'fine sugar', '細砂糖', 'グラニュー糖', '고운 설탕', 'น้ำตาลทรายละเอียด'),
      i('100 g', 'unsweetened desiccated coconut', '無糖乾燥椰絲', '無糖乾燥ココナッツ', '무가당 건조 코코넛', 'มะพร้าวแห้งไม่หวาน'),
      i('120 ml', 'unsweetened coconut milk', '無糖椰奶', '無糖ココナッツミルク', '무가당 코코넛밀크', 'กะทิไม่หวาน'),
      i('40 g', 'unsalted butter, melted', '融化無鹽奶油', '溶かし無塩バター', '녹인 무염 버터', 'เนยจืดละลาย'),
      i('20 ml', 'water, for the bain-marie', '水，水浴用', '湯せん用の水', '중탕용 물', 'น้ำสำหรับหล่อน้ำ'),
      i('20 g', 'butter, for greasing moulds', '奶油，塗模用', '型用バター', '틀에 바를 버터', 'เนยสำหรับทาพิมพ์'),
      i('30 g', 'fine sugar, for coating moulds', '細砂糖，撒模用', '型にまぶす砂糖', '틀에 뿌릴 고운 설탕', 'น้ำตาลทรายละเอียดสำหรับเคลือบพิมพ์')
    ],
    instructions: [
      s(ml('Prepare the moulds', '準備模具', '型を準備する', '틀 준비하기', 'เตรียมพิมพ์'), ml('Brush 12 small moulds with the butter and coat them with the mould sugar. Heat the oven to 160°C and set a deep roasting tray inside.', '12 個小模具抹奶油並撒上模具用砂糖。烤箱預熱至 160°C，放入深烤盤一起加熱。', '小さな型12個にバターを塗り、型用の砂糖をまぶします。オーブンを160°Cに予熱し、深い天板を入れておきます。', '작은 틀 12개에 버터를 바르고 틀용 설탕을 입힙니다. 오븐을 160°C로 예열하고 깊은 팬을 넣어 둡니다.', 'ทาเนยบนพิมพ์เล็ก 12 ใบแล้วเคลือบน้ำตาล อุ่นเตาอบที่ 160°C และใส่ถาดลึกไว้ด้านใน'), 'Small moulds coated with butter and a fine sugar layer, ready for quindim.'),
      s(ml('Hydrate the coconut', '浸潤椰絲', 'ココナッツを戻す', '코코넛 불리기', 'เติมความชุ่มให้มะพร้าว'), ml('Mix the coconut with the coconut milk and let it stand for 10 minutes until the shreds are moist and flexible.', '椰絲與椰奶拌勻，靜置 10 分鐘至椰絲濕潤柔軟。', 'ココナッツとココナッツミルクを混ぜ、細片がしっとり柔らかくなるまで10分置きます。', '코코넛과 코코넛밀크를 섞고 코코넛 조각이 촉촉하고 부드러워질 때까지 10분 둡니다.', 'ผสมมะพร้าวกับกะทิ พัก 10 นาทีจนเส้นมะพร้าวชุ่มและนิ่ม'), 'Moist coconut shreds resting in coconut milk in a bowl.'),
      s(ml('Mix yolks and sugar gently', '輕柔混合蛋黃與砂糖', '卵黄と砂糖を混ぜる', '노른자와 설탕 부드럽게 섞기', 'ผสมไข่แดงและน้ำตาลเบา ๆ'), ml('Whisk the yolks and 250 g sugar gently just until combined; do not whip in air, because bubbles roughen the custard surface.', '蛋黃與 250 g 砂糖輕輕拌勻即可，不要打入空氣，否則奶凍表面會粗糙。', '卵黄と砂糖250gを空気を含ませないよう、混ざるまでやさしく合わせます。気泡は表面を荒らします。', '노른자와 설탕 250g을 공기가 들어가지 않게 섞일 때까지만 부드럽게 젓습니다. 기포가 커스터드 표면을 거칠게 합니다.', 'คนไข่แดงกับน้ำตาล 250 กรัมเบา ๆ แค่เข้ากัน อย่าตีให้อากาศเข้าเพราะฟองทำให้ผิวหยาบ'), 'Smooth golden egg-yolk and sugar mixture with no visible foam.'),
      s(ml('Combine the custard', '混合奶凍糊', 'カスタードを合わせる', '커스터드 섞기', 'ผสมคัสตาร์ด'), ml('Fold the coconut mixture and melted butter into the yolks. Rest the batter for 12 hours covered in the refrigerator so the coconut settles through the custard.', '將椰絲混合物與融化奶油拌入蛋黃，覆蓋冷藏 12 小時，讓椰絲沉降到奶凍中。', 'ココナッツの混合物と溶かしバターを卵黄へ混ぜます。ふたをして冷蔵庫で12時間休ませ、ココナッツを沈ませます。', '코코넛 혼합물과 녹인 버터를 노른자에 섞습니다. 덮어 냉장고에서 12시간 쉬어 코코넛이 커스터드에 가라앉게 합니다.', 'พับส่วนผสมมะพร้าวและเนยละลายเข้ากับไข่แดง ปิดฝาแช่เย็น 12 ชั่วโมงให้มะพร้าวตกตัวในคัสตาร์ด'), 'Golden quindim batter resting covered in a bowl with coconut distributed through it.'),
      s(ml('Fill the moulds', '填入模具', '型に流す', '틀에 붓기', 'เทใส่พิมพ์'), ml('Stir the rested batter once without foaming and divide it among the 12 prepared moulds. Place them in the heated roasting tray.', '靜置後只攪拌一次且不要起泡，分入 12 個模具，再將模具放進已加熱的深烤盤。', '休ませた生地を泡立てず一度だけ混ぜ、12個の型へ分け、予熱した深い天板に並べます。', '숙성한 반죽을 거품 내지 않고 한 번만 저어 12개 틀에 나눠 담고 예열한 깊은 팬에 놓습니다.', 'คนแป้งที่พักครั้งเดียวโดยไม่ให้เป็นฟอง แบ่งใส่พิมพ์ 12 ใบ แล้ววางในถาดลึกที่อุ่นไว้'), 'Twelve small moulds filled with golden quindim batter in a deep roasting tray.'),
      s(ml('Bake in a water bath', '水浴烘烤', '湯せんで焼く', '중탕해 굽기', 'อบหล่อน้ำ'), ml('Pour the 20 ml water into the roasting tray around the moulds, close the oven and bake at 160°C for 35–40 minutes until the tops are set and glossy.', '將 20 ml 水倒入模具周圍的烤盤，關上烤箱，以 160°C 烘烤 35–40 分鐘，至頂部凝固並有光澤。', '型の周囲の天板へ水20mlを注ぎ、オーブンを閉じて160°Cで35〜40分、上面が固まり艶が出るまで焼きます。', '틀 주변 팬에 물 20ml를 붓고 오븐을 닫아 160°C에서 35–40분, 윗면이 굳고 윤기 날 때까지 굽습니다.', 'เทน้ำ 20 มล. ลงถาดรอบพิมพ์ ปิดเตาอบที่ 160°C 35–40 นาทีจนหน้าเซ็ตและเงา'), 'Glossy golden quindim custards baking in a shallow water bath.'),
      s(ml('Chill and unmould', '冷藏脫模', '冷やして型から外す', '식혀 틀에서 빼기', 'แช่เย็นแล้วคว่ำออก'), ml('Cool the moulds, then chill for 3 hours. Run a thin knife around the edges, invert each quindim onto a plate and serve cold.', '模具放涼後冷藏 3 小時。沿邊緣劃入薄刀，逐個倒扣到盤中，冷食上桌。', '型を冷まし、3時間冷やします。縁に薄いナイフを入れ、皿へ逆さにして冷たい状態で供します。', '틀을 식힌 뒤 3시간 냉장합니다. 얇은 칼을 가장자리에 넣고 접시에 뒤집어 차갑게 냅니다.', 'พักพิมพ์ให้เย็นแล้วแช่เย็น 3 ชั่วโมง ใช้มีดบางแซะขอบ คว่ำคินดิมลงจานและเสิร์ฟเย็น'), 'Unmoulded glossy golden quindim domes on a plate, coconut layer visible at the base.'),
    ],
    storage: chilledDessertStorage,
    cultureNote: ml('Quindim reflects the layered history of Brazilian sweets: Portuguese egg-rich custard traditions meet abundant coconut in Brazil, with the name carrying an African linguistic connection.', 'Quindim 反映巴西甜點的多層歷史：葡萄牙高蛋黃甜點傳統遇上巴西盛產椰子，名稱也帶有非洲語言的連結。', 'キンジンはブラジル菓子の重層的な歴史を映します。ポルトガルの卵菓子の伝統が、ブラジルで豊富なココナッツと出会い、名前にはアフリカの言語的なつながりもあります。', '킨딤은 브라질 과자의 겹겹의 역사를 보여줍니다. 포르투갈의 달걀 디저트 전통이 브라질의 풍부한 코코넛과 만나고 이름에는 아프리카 언어의 연결도 남아 있습니다.', 'คินดิมสะท้อนประวัติซ้อนชั้นของขนมบราซิล ขนมไข่แบบโปรตุเกสพบมะพร้าวที่มีมากในบราซิล และชื่อยังเชื่อมโยงกับภาษาจากแอฟริกา'),
    imageAlt: ml('Glossy golden quindim coconut custard domes', '閃亮金黃的巴西椰香蛋黃奶凍', '艶のある黄金色のココナッツ・カスタード、キンジン', '윤기 나는 황금빛 코코넛 커스터드 킨딤', 'คินดิมคัสตาร์ดมะพร้าวสีทองเงา'),
    visualSpec: 'Several small glossy golden-yellow quindim custard domes arranged on a simple plate, coconut layer subtly visible at the base and a clean unmoulded shape; jewel-like surface, no flan caramel sauce.'
  })
];
