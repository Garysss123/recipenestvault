import { ml, ingredient as i, step as s, makeBrazilianRecipe as r, cookedStorage } from './brazilian-recipe-helpers.mjs';

export const brazilianRecipesC = [
  r({
    id: 'escondidinho-de-carne-seca', profile: 'bake',
    region: ml('Northeastern Brazil', '巴西東北部', 'ブラジル北東部', '브라질 북동부', 'บราซิลตะวันออกเฉียงเหนือ'),
    name: ml('Escondidinho de Carne Seca', '巴西鹹牛肉木薯泥焗烤', 'エスコンディジーニョ・デ・カルネセカ', '에스콘지지뉴 지 카르네 세카', 'เอสกงดิจินโญเนื้อเค็ม'),
    prepMinutes: 35, cookMinutes: 55, totalMinutes: 90, servings: 6,
    description: ml('A comforting casserole of seasoned shredded dried beef hidden beneath a creamy cassava purée and a browned layer of queijo coalho and Parmesan.', '調味鹹牛肉絲藏在滑順木薯泥下，表面覆 queijo coalho 與帕馬森起司烤成金黃的家常焗烤。', '味付けした干し牛肉をクリーミーなキャッサバのピューレで覆い、ケイジョ・コアリョとパルメザンを焼き色が付くまで焼く家庭料理です。', '양념한 건육을 크리미한 카사바 퓌레 아래 숨기고 케이주 코알류와 파르메산을 올려 갈색으로 구운 가정식 캐서롤입니다.', 'หม้ออบสบาย ๆ ที่ซ่อนเนื้อเค็มฉีกปรุงรสใต้มันสำปะหลังบดครีม โรย queijo coalho และพาร์เมซานจนเป็นสีน้ำตาล'),
    ingredients: [
      i('1000 g', 'cassava, peeled and cut into chunks', '木薯，去皮切塊', 'キャッサバ、皮をむき塊に切る', '카사바, 껍질 벗겨 덩어리로', 'มันสำปะหลัง ปอกและหั่นชิ้น'),
      i('1800 ml', 'water, for boiling the cassava', '水，煮木薯用', 'キャッサバをゆでる水', '카사바 삶을 물', 'น้ำสำหรับต้มมันสำปะหลัง'),
      i('60 g', 'unsalted butter', '無鹽奶油', '無塩バター', '무염 버터', 'เนยจืด'),
      i('250 ml', 'whole milk', '全脂牛奶', '牛乳', '전유', 'นมสดเต็มมันเนย'),
      i('10 g', 'fine salt, divided', '細鹽，分次使用', '塩、分けて使う', '고운 소금, 나눠 사용', 'เกลือละเอียด แบ่งใช้'),
      i('600 g', 'desalted cooked carne seca, shredded', '去鹽煮熟的 carne seca，撕絲', '塩抜きしてゆでたカルネセカ、ほぐす', '소금 뺀 익힌 카르네 세카, 찢은 것', 'คาร์เนเซกาต้มลดเค็ม ฉีกฝอย'),
      i('30 ml', 'bottled butter or neutral oil', '牛油或中性油', 'バターオイルまたは植物油', '버터 오일 또는 중성유', 'เนยใสหรือน้ำมันรสกลาง'),
      i('180 g', 'red onion, thinly sliced', '紅洋蔥，薄切', '紫玉ねぎ、薄切り', '적양파, 얇게 썬 것', 'หอมแดงใหญ่ ซอยบาง'),
      i('3', 'garlic cloves, minced', '蒜瓣，切末', 'にんにく、みじん切り', '마늘, 다진 것', 'กลีบกระเทียม สับ'),
      i('120 g', 'red bell pepper, thinly sliced', '紅甜椒，薄切', '赤パプリカ、薄切り', '빨간 피망, 얇게 썬 것', 'พริกหวานแดง ซอยบาง'),
      i('150 g', 'ripe tomatoes, chopped', '熟番茄，切碎', '完熟トマト、刻む', '잘 익은 토마토, 다진 것', 'มะเขือเทศสุก สับ'),
      i('15 g', 'parsley and scallion, chopped', '巴西里與青蔥，切碎', 'パセリと青ねぎ、刻む', '파슬리와 쪽파, 다진 것', 'พาร์สลีย์และต้นหอม สับ'),
      i('100 g', 'cream cheese or requeijão', '奶油乳酪或 requeijão', 'クリームチーズまたはレケイジャォン', '크림치즈 또는 헤케이장', 'ครีมชีสหรือ requeijão'),
      i('100 g', 'queijo coalho or Parmesan, grated', 'queijo coalho 或帕馬森，磨碎', 'ケイジョ・コアリョまたはパルメザン、削る', '케이주 코알류 또는 파르메산, 간 것', 'queijo coalho หรือพาร์เมซาน ขูด'),
      i('20 ml', 'olive oil, for the baking dish', '橄欖油，塗烤皿用', '耐熱皿用オリーブ油', '오븐 그릇에 바를 올리브유', 'น้ำมันมะกอกสำหรับทาจานอบ')
    ],
    instructions: [
      s(ml('Boil the cassava', '煮木薯', 'キャッサバをゆでる', '카사바 삶기', 'ต้มมันสำปะหลัง'), ml('Cover the cassava with water and simmer for 20 minutes until a knife slides through easily. Drain, remove the woody central fibres and mash while hot.', '木薯加水小滾煮 20 分鐘，至刀子能輕鬆插入；瀝乾、去除中央木質纖維，趁熱壓泥。', 'キャッサバを水で覆い20分、ナイフが楽に通るまで煮ます。水を切り、硬い中心の筋を除いて熱いうちにつぶします。', '카사바가 잠기게 물을 붓고 20분, 칼이 쉽게 들어갈 때까지 끓입니다. 건져 가운데 질긴 심을 제거하고 뜨거울 때 으깹니다.', 'เติมน้ำให้ท่วมมัน ต้มอ่อน 20 นาทีจนมีดแทงง่าย สะเด็ด เอาเส้นใยแข็งกลางออก แล้วบดตอนร้อน'), 'Tender cassava chunks drained and mashed after the woody fibres are removed.'),
      s(ml('Make the purée', '製作木薯泥', 'ピューレを作る', '퓌레 만들기', 'ทำมันบด'), ml('Warm the milk with the butter and 4 g salt. Beat it into the mashed cassava, then fold in the cream cheese until smooth and spreadable.', '牛奶與奶油、4 g 鹽加熱，拌入木薯泥，再拌入奶油乳酪至滑順可塗抹。', '牛乳、バター、塩4gを温め、つぶしたキャッサバへ混ぜます。クリームチーズを加え、滑らかで広げやすくします。', '우유를 버터와 소금 4g과 함께 데웁니다. 으깬 카사바에 섞고 크림치즈를 넣어 매끈하게 펴 바를 수 있게 합니다.', 'อุ่นนมกับเนยและเกลือ 4 กรัม คนเข้ามันบด แล้วพับครีมชีสจนเนียนปาดได้'), 'Creamy pale cassava purée with a smooth spoon trail in a saucepan.'),
      s(ml('Sauté the dried beef', '炒香鹹牛肉', '干し牛肉を炒める', '건육 볶기', 'ผัดเนื้อเค็ม'), ml('Heat the bottled butter in a skillet. Cook the onion and garlic for 5 minutes until soft, add the pepper and tomato for 5 minutes, then fold in the shredded beef and cook for 5 minutes more.', '平底鍋加熱牛油，洋蔥與蒜炒 5 分鐘至軟，加入甜椒與番茄炒 5 分鐘，再拌入鹹牛肉絲炒 5 分鐘。', 'フライパンでバターオイルを熱し、玉ねぎとにんにくを5分柔らかく炒めます。パプリカとトマトを加えて5分、牛肉を混ぜてさらに5分炒めます。', '팬에 버터 오일을 달구고 양파와 마늘을 5분 부드럽게 볶습니다. 피망과 토마토를 넣어 5분, 찢은 소고기를 넣고 5분 더 볶습니다.', 'อุ่นเนยใสในกระทะ ผัดหอมกับกระเทียม 5 นาทีให้นุ่ม ใส่พริกหวานและมะเขือเทศ 5 นาที แล้วคลุกเนื้อฉีกผัดต่อ 5 นาที'), 'Seasoned shredded dried beef with onion, red pepper and tomato in a skillet.'),
      s(ml('Season the filling', '完成內餡調味', '具の味を整える', '속 간 맞추기', 'ปรุงไส้ให้เสร็จ'), ml('Turn off the heat and fold in the parsley and scallion. Taste and add the remaining 6 g salt only if the beef needs it.', '關火拌入巴西里與青蔥，試味後只有在牛肉需要時才加入剩餘 6 g 鹽。', '火を止めてパセリと青ねぎを混ぜます。味を見て、牛肉に必要な場合だけ残りの塩6gを加えます。', '불을 끄고 파슬리와 쪽파를 섞습니다. 맛을 본 뒤 소고기에 필요할 때만 남은 소금 6g을 넣습니다.', 'ปิดไฟใส่พาร์สลีย์และต้นหอม ชิมแล้วเติมเกลือที่เหลือ 6 กรัมเฉพาะถ้าเนื้อต้องการ'), 'Finished moist carne seca filling with green herbs folded through.'),
      s(ml('Assemble the casserole', '組合焗烤', '重ねる', '캐서롤 조립하기', 'ประกอบหม้ออบ'), ml('Heat the oven to 200°C and oil a baking dish. Spread half the cassava purée, add all the beef filling, then cover with the remaining purée and smooth the top.', '烤箱預熱至 200°C，烤皿抹油；鋪一半木薯泥，加入全部鹹牛肉餡，再蓋上剩餘木薯泥並抹平。', 'オーブンを200°Cに熱し、耐熱皿に油を塗ります。ピューレ半量、牛肉の具、残りのピューレの順に重ねて表面を平らにします。', '오븐을 200°C로 예열하고 그릇에 기름을 바릅니다. 카사바 퓌레 절반, 소고기 속, 남은 퓌레 순으로 펴서 윗면을 고릅니다.', 'อุ่นเตาอบที่ 200°C ทาน้ำมันบนจานอบ ปาดมันบดครึ่งหนึ่ง ใส่ไส้เนื้อทั้งหมด ปิดด้วยมันบดที่เหลือและเกลี่ยหน้า'), 'Layered cassava purée and dried beef filling in a rectangular baking dish.'),
      s(ml('Top and bake', '鋪起司烘烤', 'チーズをのせて焼く', '치즈 올려 굽기', 'โรยชีสแล้วอบ'), ml('Scatter the grated queijo coalho or Parmesan over the surface and bake at 200°C for 20 minutes until bubbling at the edges and browned on top.', '表面撒上 queijo coalho 或帕馬森，以 200°C 烘烤 20 分鐘，至邊緣冒泡、頂部上色。', '表面にケイジョ・コアリョまたはパルメザンを散らし、200°Cで20分、縁が泡立ち上面に焼き色が付くまで焼きます。', '표면에 케이주 코알류 또는 파르메산을 뿌리고 200°C에서 20분, 가장자리가 끓고 위가 갈색이 될 때까지 굽습니다.', 'โรย queijo coalho หรือพาร์เมซาน อบที่ 200°C 20 นาทีจนขอบเดือดและหน้าสีน้ำตาล'), 'Golden cheese-topped escondidinho bubbling gently at the edges.'),
      s(ml('Rest and serve', '靜置上桌', '休ませて供する', '쉬었다 내기', 'พักแล้วเสิร์ฟ'), ml('Rest the casserole for 10 minutes so the layers settle. Spoon out portions showing both the creamy cassava and the savoury beef centre.', '焗烤靜置 10 分鐘讓層次定型，挖取同時看見滑順木薯泥與鹹香牛肉中心的份量。', 'キャセロールを10分休ませて層を落ち着かせます。クリーミーなキャッサバと牛肉の具が見えるように取り分けます。', '캐서롤을 10분 쉬어 층을 안정시킵니다. 크리미한 카사바와 짭짤한 소고기 중심이 보이게 떠냅니다.', 'พักหม้ออบ 10 นาทีให้ชั้นอยู่ตัว แล้วตักให้เห็นมันบดครีมและไส้เนื้อเค็ม'), 'A spooned serving of golden escondidinho showing creamy cassava and shredded dried beef layers.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Escondidinho is especially associated with northeastern Brazilian home cooking. Cassava appears under several regional names—mandioca, aipim or macaxeira—while the filling may change from dried beef to chicken or seafood.', 'Escondidinho 特別與巴西東北部家常料理相連；木薯在不同地區也稱 mandioca、aipim 或 macaxeira，內餡可由鹹牛肉換成雞肉或海鮮。', 'エスコンディジーニョはブラジル北東部の家庭料理と特に結び付きます。キャッサバはマンジョッカ、アイピン、マカシェイラなど地域名があり、具は干し牛肉から鶏や魚介まで変わります。', '에스콘지지뉴는 브라질 북동부 가정식과 특히 연결됩니다. 카사바는 만지오카, 아이핌, 마카셰이라 등 지역 이름이 있고 속은 건육에서 닭이나 해산물로 바뀔 수 있습니다.', 'เอสกงดิจินโญผูกพันกับอาหารบ้านทางตะวันออกเฉียงเหนือของบราซิล มันสำปะหลังมีชื่อท้องถิ่นหลายชื่อ และไส้เปลี่ยนจากเนื้อเค็มเป็นไก่หรืออาหารทะเลได้'),
    imageAlt: ml('Escondidinho with golden cassava purée and shredded dried beef', '金黃木薯泥下的鹹牛肉絲焗烤', '黄金色のキャッサバピューレとほぐし干し牛肉のエスコンディジーニョ', '황금빛 카사바 퓌레와 찢은 건육을 넣은 에스콘지지뉴', 'เอสกงดิจินโญมันบดสีทองกับเนื้อเค็มฉีก'),
    visualSpec: 'Golden rectangular Brazilian escondidinho casserole with a lightly browned cheese top, one serving removed to reveal a creamy cassava layer over moist shredded carne seca; no mashed potato styling.'
  }),

  r({
    id: 'arroz-carreteiro', profile: 'rice',
    region: ml('Rio Grande do Sul, southern Brazil', '巴西南部南里奧格蘭德州', 'ブラジル南部リオグランデ・ド・スル州', '브라질 남부 히우그란지두술주', 'รัฐรีโอกรันดีดูซูล ทางตอนใต้ของบราซิล'),
    name: ml('Arroz Carreteiro', '南里奧格蘭德鹹牛肉燉飯', 'アホース・カヘテイロ', '아호스 카헤테이루', 'อาฮอสคาเรเตโร'),
    prepMinutes: 45, cookMinutes: 50, totalMinutes: 95, servings: 6,
    description: ml('A one-pot gaucho rice dish in which desalted dried beef, bacon and smoked sausage season fluffy grains with onion, carrot and herbs.', '高喬風一鍋飯，以去鹽乾牛肉、培根與煙燻香腸為米飯提味，再加入洋蔥、紅蘿蔔與香草。', '塩抜きした干し牛肉、ベーコン、燻製ソーセージで米を味付けし、玉ねぎ、にんじん、ハーブを加えるガウーショの一鍋料理です。', '소금 뺀 건육, 베이컨과 훈제 소시지로 쌀에 맛을 내고 양파, 당근, 허브를 넣는 가우슈식 한 냄비 요리입니다.', 'ข้าวหม้อเดียวแบบเกาโช ใช้เนื้อแห้งลดเค็ม เบคอน และไส้กรอกรมควันปรุงข้าวกับหอม แครอต และสมุนไพร'),
    ingredients: [
      i('450 g', 'desalted dried beef, finely diced', '去鹽乾牛肉，切細丁', '塩抜きした干し牛肉、細かい角切り', '소금 뺀 건육, 잘게 깍둑썰기', 'เนื้อแห้งลดเค็ม หั่นเต๋าเล็ก'),
      i('150 g', 'thick-cut bacon, diced', '厚切培根，切丁', '厚切りベーコン、角切り', '두꺼운 베이컨, 깍둑썰기', 'เบคอนหนา หั่นเต๋า'),
      i('300 g', 'smoked sausage, sliced', '煙燻香腸，切片', '燻製ソーセージ、輪切り', '훈제 소시지, 썬 것', 'ไส้กรอกรมควัน หั่นแว่น'),
      i('300 g', 'long-grain white rice, rinsed', '長粒白米，洗淨', '長粒白米、洗う', '장립종 흰쌀, 씻은 것', 'ข้าวขาวเมล็ดยาว ล้างแล้ว'),
      i('180 g', 'yellow onion, finely chopped', '黃洋蔥，切細', '黄玉ねぎ、みじん切り', '노란 양파, 잘게 다진 것', 'หอมใหญ่สีเหลือง สับละเอียด'),
      i('100 g', 'carrot, small dice', '紅蘿蔔，小丁', 'にんじん、小さな角切り', '당근, 작게 깍둑썰기', 'แครอต หั่นเต๋าเล็ก'),
      i('3', 'garlic cloves, minced', '蒜瓣，切末', 'にんにく、みじん切り', '마늘, 다진 것', 'กลีบกระเทียม สับ'),
      i('30 g', 'tomato paste', '番茄糊', 'トマトペースト', '토마토 페이스트', 'ซอสมะเขือเทศเข้มข้น'),
      i('750 ml', 'unsalted beef stock', '無鹽牛高湯', '無塩ビーフストック', '무염 소고기 육수', 'น้ำสต๊อกเนื้อไม่เค็ม'),
      i('2', 'bay leaves', '月桂葉', 'ローリエ', '월계수잎', 'ใบกระวาน'),
      i('15 g', 'parsley, chopped', '巴西里，切碎', 'パセリ、刻む', '파슬리, 다진 것', 'พาร์สลีย์ สับ'),
      i('12 g', 'fine salt, or to taste after the beef', '細鹽，依乾牛肉鹹度調整', '塩、牛肉の塩気を見て調整', '고운 소금, 건육 간을 본 뒤 조절', 'เกลือละเอียด ปรับตามความเค็มของเนื้อ'),
      i('20 ml', 'neutral oil, if needed', '中性油，視需要使用', '植物油、必要なら', '중성유, 필요할 때', 'น้ำมันรสกลางถ้าจำเป็น')
    ],
    instructions: [
      s(ml('Desalt the beef', '去除乾牛肉鹹味', '干し牛肉の塩抜きをする', '건육 염분 빼기', 'ลดเค็มเนื้อแห้ง'), ml('Cover the diced dried beef with cold water, boil for 10 minutes, drain and repeat 3 times. Drain well and taste a piece before adding salt later.', '乾牛肉丁加冷水淹過，煮 10 分鐘後瀝乾，重複 3 次；充分瀝乾並先試一塊，再決定之後的鹽量。', '角切りの干し牛肉を冷水で覆い、10分ゆでて湯を捨て、3回繰り返します。よく水を切り、一片を味見して後の塩を決めます。', '깍둑썬 건육이 잠기게 찬물을 붓고 10분 끓여 물을 버리는 과정을 3번 반복합니다. 잘 건져 한 조각 맛본 뒤 나중에 소금을 정합니다.', 'ใส่น้ำเย็นท่วมเนื้อแห้งหั่นเต๋า ต้ม 10 นาที เทน้ำทิ้ง ทำซ้ำ 3 ครั้ง สะเด็ดให้ดีและชิมหนึ่งชิ้นก่อนตัดสินใจเรื่องเกลือ'), 'Small diced dried beef draining after repeated boiling to remove salt.'),
      s(ml('Brown the meats', '煎香肉類', '肉に焼き色を付ける', '고기 갈변시키기', 'ทำเนื้อให้เกรียมหอม'), ml('Heat a heavy pot over medium heat. Cook the bacon for 5 minutes, add the sausage and dried beef, and cook for 5 minutes more until lightly browned.', '厚底鍋中火加熱，培根炒 5 分鐘，加入香腸與乾牛肉再炒 5 分鐘至略上色。', '厚手鍋を中火で熱し、ベーコンを5分炒めます。ソーセージと干し牛肉を加え、さらに5分軽く焼き色を付けます。', '두꺼운 냄비를 중불로 달궈 베이컨을 5분 볶습니다. 소시지와 건육을 넣고 5분 더 볶아 살짝 갈색을 냅니다.', 'ตั้งหม้อหนาไฟกลาง ผัดเบคอน 5 นาที ใส่ไส้กรอกและเนื้อแห้งผัดต่อ 5 นาทีจนมีสีอ่อน'), 'Bacon, smoked sausage and diced dried beef lightly browned in one pot.'),
      s(ml('Cook the aromatics', '炒香蔬菜', '香味野菜を炒める', '향채 볶기', 'ผัดเครื่องหอม'), ml('Add the onion, carrot and garlic and cook for 5 minutes until the onion is translucent. Stir in the tomato paste for 2 minutes.', '加入洋蔥、紅蘿蔔與蒜炒 5 分鐘至洋蔥透明，拌入番茄糊炒 2 分鐘。', '玉ねぎ、にんじん、にんにくを加えて5分、玉ねぎが透き通るまで炒めます。トマトペーストを混ぜて2分炒ります。', '양파, 당근과 마늘을 넣고 5분, 양파가 투명해질 때까지 볶습니다. 토마토 페이스트를 넣고 2분 섞습니다.', 'ใส่หอม แครอต และกระเทียม ผัด 5 นาทีจนหอมใส คนซอสมะเขือเทศเข้มข้น 2 นาที'), 'Translucent onion, carrot and garlic coating the browned meats.'),
      s(ml('Toast the rice', '炒香米粒', '米を炒める', '쌀 볶기', 'คั่วข้าว'), ml('Add the rinsed rice and stir for 2 minutes so every grain is coated with the rendered fat and tomato base.', '加入洗淨米粒拌炒 2 分鐘，讓每一粒都裹上肉脂與番茄底。', '洗った米を加え、2分混ぜて脂とトマトの土台を全粒に絡めます。', '씻은 쌀을 넣고 2분 저어 모든 알이 나온 지방과 토마토 베이스를 입게 합니다.', 'ใส่ข้าวที่ล้างแล้ว ผัด 2 นาทีให้ทุกเมล็ดเคลือบไขมันและฐานมะเขือเทศ'), 'Rinsed long-grain rice toasted with meats, vegetables and tomato paste.'),
      s(ml('Simmer the rice', '燉煮米飯', '米を煮る', '밥 끓이기', 'เคี่ยวข้าว'), ml('Pour in the stock, add the bay leaves and bring to a simmer. Cover and cook for 18–20 minutes until the rice is tender and the liquid is absorbed.', '倒入高湯，加入月桂葉煮至小滾；加蓋煮 18–20 分鐘，至米飯軟熟且液體吸收。', 'ストックとローリエを加え、煮立てます。ふたをして18〜20分、米が柔らかく汁を吸うまで煮ます。', '육수를 붓고 월계수잎을 넣어 끓입니다. 덮어 18–20분, 쌀이 부드럽고 액체가 흡수될 때까지 익힙니다.', 'เทสต๊อก ใส่ใบกระวาน ต้มเดือดอ่อน ปิดฝาเคี่ยว 18–20 นาทีจนข้าวนุ่มและดูดน้ำหมด'), 'Covered pot of arroz carreteiro with fluffy rice and meat visible between the grains.'),
      s(ml('Rest and adjust', '靜置並調味', '休ませて味を整える', '뜸 들이고 간 맞추기', 'พักและปรุงรส'), ml('Turn off the heat and rest covered for 10 minutes. Remove the bay leaves, fluff with a fork, taste and add salt only if needed.', '關火加蓋靜置 10 分鐘，取出月桂葉，用叉子翻鬆，試味後只有需要才加鹽。', '火を止めてふたをしたまま10分休ませます。ローリエを除き、フォークでほぐして味を見て、必要なら塩を加えます。', '불을 끄고 덮어 10분 뜸을 들입니다. 월계수잎을 빼고 포크로 풀어 맛을 본 뒤 필요할 때만 소금을 넣습니다.', 'ปิดไฟพักปิดฝา 10 นาที เอาใบกระวานออก ใช้ส้อมคนให้ฟู ชิมแล้วเติมเกลือถ้าจำเป็น'), 'Fluffy rested arroz carreteiro with distinct grains and tender meat.'),
      s(ml('Finish with herbs', '拌入香草上桌', 'ハーブで仕上げる', '허브로 마무리하기', 'ใส่สมุนไพรปิดท้าย'), ml('Fold in the chopped parsley and serve the rice hot from the pot, keeping the browned meats distributed through every portion.', '拌入切碎巴西里，趁熱盛飯，讓每份都均勻有煎香肉類。', '刻んだパセリを混ぜ、焼いた肉が各部分に行き渡るよう鍋から熱いまま盛ります。', '다진 파슬리를 섞고 갈색 낸 고기가 모든 분량에 고르게 들어가도록 냄비에서 뜨겁게 냅니다.', 'พับพาร์สลีย์สับลงไป ตักเสิร์ฟร้อนจากหม้อให้เนื้อที่เกรียบกระจายทุกส่วน'), 'Rustic serving bowl of arroz carreteiro finished with parsley.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Arroz carreteiro is linked to the gaúcho foodways of Rio Grande do Sul and the practical use of shelf-stable charque with rice. Contemporary versions often include fresh beef, bacon or sausage.', 'Arroz carreteiro 與南里奧格蘭德州的高喬飲食文化相連，原本善用耐保存的 charque 與米；現代版本常加入鮮牛肉、培根或香腸。', 'アホース・カヘテイロはリオグランデ・ド・スル州のガウーショの食文化と結び付き、保存の利くシャルケと米を使う知恵から生まれました。現代は生牛肉、ベーコン、ソーセージも使います。', '아호스 카헤테이루는 히우그란지두술 가우슈 식문화와 연결되며 오래 보관할 수 있는 샤르키와 쌀을 활용한 음식입니다. 요즘은 생소고기, 베이컨이나 소시지도 넣습니다.', 'อาฮอสคาเรเตโรเชื่อมโยงกับวัฒนธรรมอาหารเกาโชของรีโอกรันดีดูซูล และการใช้ charque ที่เก็บได้นานกับข้าว ปัจจุบันมักใส่เนื้อสด เบคอน หรือไส้กรอก'),
    imageAlt: ml('Arroz carreteiro with fluffy rice, dried beef, bacon, sausage and parsley', '米粒分明、含乾牛肉培根香腸與巴西里的 Arroz carreteiro', '干し牛肉、ベーコン、ソーセージ、パセリのアホース・カヘテイロ', '건육, 베이컨, 소시지와 파슬리를 넣은 알알이 익은 아호스 카헤테이루', 'อาฮอสคาเรเตโรข้าวฟูใส่เนื้อแห้ง เบคอน ไส้กรอก และพาร์สลีย์'),
    visualSpec: 'Rustic shallow bowl of fluffy Brazilian arroz carreteiro with separate rice grains, diced dried beef, bacon and smoked sausage distributed throughout, carrot and parsley visible; no stew broth.'
  }),

  r({
    id: 'feijao-tropeiro', profile: 'stew',
    region: ml('Minas Gerais, southeastern Brazil', '巴西東南部米納斯吉拉斯州', 'ブラジル南東部ミナスジェライス州', '브라질 남동부 미나스제라이스주', 'รัฐมีนัสเชไรส์ ทางตะวันออกเฉียงใต้ของบราซิล'),
    name: ml('Feijão Tropeiro', '米納斯香腸培根木薯粉拌豆', 'フェイジャォン・トロペイロ', '페이장 트로페이루', 'เฟเจาทรอเปโร'),
    prepMinutes: 20, cookMinutes: 35, totalMinutes: 55, servings: 6,
    description: ml('A Minas Gerais skillet of tender beans tossed with bacon, sausage, scrambled eggs, collard greens and toasted cassava flour.', '米納斯吉拉斯風格平底鍋料理，把熟豆與培根、香腸、炒蛋、羽衣甘藍及炒香木薯粉拌在一起。', '豆、ベーコン、ソーセージ、炒り卵、コラードグリーン、炒ったキャッサバ粉を合わせるミナスジェライスの料理です。', '콩에 베이컨, 소시지, 스크램블드 에그, 콜라드 그린과 볶은 카사바 가루를 섞는 미나스제라이스식 팬 요리입니다.', 'อาหารกระทะจากมีนัสเชไรส์ คลุกถั่วกับเบคอน ไส้กรอก ไข่คน ผักคอลลาร์ด และแป้งมันสำปะหลังคั่ว'),
    ingredients: [
      i('500 g', 'cooked pinto beans, drained', '熟斑豆，瀝乾', 'ゆでたうずら豆、水気を切る', '익힌 핀토콩, 물기 뺀 것', 'ถั่วปินโตสุก สะเด็ดน้ำ'),
      i('150 g', 'thick-cut bacon, diced', '厚切培根，切丁', '厚切りベーコン、角切り', '두꺼운 베이컨, 깍둑썰기', 'เบคอนหนา หั่นเต๋า'),
      i('250 g', 'smoked sausage, sliced', '煙燻香腸，切片', '燻製ソーセージ、輪切り', '훈제 소시지, 썬 것', 'ไส้กรอกรมควัน หั่นแว่น'),
      i('4', 'large eggs', '大雞蛋', '大きな卵', '큰 달걀', 'ไข่ไก่ฟองใหญ่'),
      i('200 g', 'collard greens, finely sliced', '羽衣甘藍，切細絲', 'コラードグリーン、細切り', '콜라드 그린, 가늘게 썬 것', 'ใบคอลลาร์ด ซอยละเอียด'),
      i('150 g', 'toasted cassava flour', '烘香木薯粉', '炒ったキャッサバ粉', '볶은 카사바 가루', 'แป้งมันสำปะหลังคั่ว'),
      i('180 g', 'yellow onion, finely chopped', '黃洋蔥，切細', '黄玉ねぎ、みじん切り', '노란 양파, 잘게 다진 것', 'หอมใหญ่สีเหลือง สับละเอียด'),
      i('4', 'garlic cloves, minced', '蒜瓣，切末', 'にんにく、みじん切り', '마늘, 다진 것', 'กลีบกระเทียม สับ'),
      i('30 ml', 'neutral oil', '中性油', '植物油', '중성유', 'น้ำมันรสกลาง'),
      i('8 g', 'fine salt, divided', '細鹽，分次使用', '塩、分けて使う', '고운 소금, 나눠 사용', 'เกลือละเอียด แบ่งใช้'),
      i('15 g', 'scallions, chopped', '青蔥，切碎', '青ねぎ、刻む', '쪽파, 다진 것', 'ต้นหอม สับ')
    ],
    instructions: [
      s(ml('Crisp the bacon and sausage', '煎脆培根與香腸', 'ベーコンとソーセージを焼く', '베이컨과 소시지 굽기', 'ทำเบคอนและไส้กรอกให้กรอบ'), ml('Heat the oil in a wide skillet. Cook the bacon for 5 minutes, add the sausage and cook for 5 minutes more until browned at the edges.', '寬平底鍋加熱油，培根炒 5 分鐘，加入香腸再炒 5 分鐘至邊緣上色。', '広いフライパンで油を熱し、ベーコンを5分炒めます。ソーセージを加え、さらに5分、縁に焼き色が付くまで炒めます。', '넓은 팬에 기름을 달구고 베이컨을 5분 볶습니다. 소시지를 넣고 5분 더 가장자리가 갈색이 될 때까지 볶습니다.', 'ตั้งกระทะกว้างใส่น้ำมัน ผัดเบคอน 5 นาที ใส่ไส้กรอกผัดต่อ 5 นาทีจนขอบเป็นสีน้ำตาล'), 'Bacon cubes and smoked sausage slices browned together in a wide skillet.'),
      s(ml('Scramble the eggs', '炒蛋', '卵を炒る', '달걀 스크램블하기', 'ทำไข่คน'), ml('Push the meats to one side. Add the eggs to the clear space, season with 2 g salt and scramble for 3 minutes until softly set; break into large curds.', '把肉推到鍋邊，空處加入雞蛋，以 2 g 鹽調味，炒 3 分鐘至柔軟凝固並撥成大塊。', '肉を片側へ寄せ、空いた所に卵を入れ、塩2gで味付けして3分、柔らかく固まるまで炒り、大きな塊にします。', '고기를 한쪽으로 밀고 빈 공간에 달걀을 넣어 소금 2g으로 간하고 3분 부드럽게 익혀 큰 덩어리로 나눕니다.', 'เขี่ยเนื้อไปด้านหนึ่ง ใส่ไข่ในที่ว่าง ปรุงเกลือ 2 กรัม คน 3 นาทีจนเซ็ตนุ่ม แล้วแบ่งเป็นก้อนใหญ่'), 'Soft scrambled egg curds beside browned bacon and sausage.'),
      s(ml('Sauté onion and garlic', '炒香洋蔥蒜', '玉ねぎとにんにくを炒める', '양파와 마늘 볶기', 'ผัดหอมและกระเทียม'), ml('Add the onion and garlic to the skillet and cook for 5 minutes until translucent, scraping the savoury fat from the base.', '洋蔥與蒜加入鍋中炒 5 分鐘至透明，同時刮起鍋底香味油脂。', '玉ねぎとにんにくを加えて5分、透き通るまで炒め、底の旨味のある脂をこそげます。', '양파와 마늘을 넣고 5분, 투명해질 때까지 볶으며 바닥의 맛있는 지방을 긁어냅니다.', 'ใส่หอมและกระเทียม ผัด 5 นาทีจนใส ขูดไขมันรสอร่อยจากก้นกระทะ'), 'Translucent onion and garlic mixed with the browned meat juices.'),
      s(ml('Fold in the beans', '拌入豆子', '豆を合わせる', '콩 섞기', 'คลุกถั่ว'), ml('Add the drained beans and the remaining 4 g salt. Fold gently for 5 minutes so the beans heat through without mashing.', '加入瀝乾豆子與剩餘 4 g 鹽，輕輕拌 5 分鐘使豆子熱透但不要壓碎。', '水気を切った豆と残りの塩4gを加え、豆をつぶさず5分やさしく混ぜて温めます。', '물기 뺀 콩과 남은 소금 4g을 넣고 콩을 으깨지 않게 5분 부드럽게 섞어 데웁니다.', 'ใส่ถั่วที่สะเด็ดและเกลือที่เหลือ 4 กรัม คลุกเบา ๆ 5 นาทีให้ร้อนโดยไม่บดถั่ว'), 'Whole pinto beans warming among bacon, sausage and onion.'),
      s(ml('Toast with cassava flour', '拌入木薯粉', 'キャッサバ粉を合わせる', '카사바 가루 섞기', 'คลุกแป้งมันคั่ว'), ml('Sprinkle in the cassava flour and fold for 3 minutes until the flour is lightly toasted and the mixture is moist rather than powdery.', '撒入木薯粉拌 3 分鐘，至粉末略烘香，整體濕潤而不是乾粉狀。', 'キャッサバ粉を振り入れ、3分、粉が軽く香ばしくなり、粉っぽさがなくしっとりするまで混ぜます。', '카사바 가루를 뿌리고 3분, 가루가 살짝 볶아지고 전체가 마르지 않고 촉촉할 때까지 섞습니다.', 'โรยแป้งมันคั่ว คลุก 3 นาทีจนแป้งหอมอ่อน ๆ และส่วนผสมชุ่มไม่เป็นผง'), 'Moist beans, meat and eggs coated with toasted cassava flour.'),
      s(ml('Wilt the greens', '拌入青菜', '葉野菜を加える', '잎채소 넣기', 'ใส่ผักใบ'), ml('Fold in the sliced collard greens and cook for 3 minutes until vivid green and tender at the stems. Add the scallions off the heat.', '拌入羽衣甘藍絲炒 3 分鐘，至鮮綠、梗變嫩；離火後加入青蔥。', 'コラードグリーンを加えて3分、鮮やかな緑で茎が柔らかくなるまで炒めます。火を止めて青ねぎを加えます。', '채 썬 콜라드 그린을 넣고 3분, 선명한 초록색과 부드러운 줄기가 될 때까지 볶습니다. 불을 끄고 쪽파를 넣습니다.', 'ใส่คอลลาร์ดซอย ผัด 3 นาทีจนเขียวสดและก้านนุ่ม ยกลงใส่ต้นหอม'), 'Bright collard greens folded through the cassava-coated beans and sausage.'),
      s(ml('Serve warm', '溫熱上桌', '温かく供する', '따뜻하게 내기', 'เสิร์ฟอุ่น'), ml('Rest for 5 minutes, then serve the feijão tropeiro warm as a substantial side or with rice and grilled meat.', '靜置 5 分鐘後溫熱上桌，可作豐盛配菜，搭配白飯與烤肉也很合適。', '5分休ませ、温かいフェイジャォン・トロペイロを主役級の副菜として、ご飯や焼き肉と供します。', '5분 쉬었다가 따뜻한 페이장을 푸짐한 곁들임으로 내고 밥과 구운 고기와 함께 먹습니다.', 'พัก 5 นาทีแล้วเสิร์ฟเฟเจาทรอเปโรอุ่น ๆ เป็นเครื่องเคียงอิ่มท้อง คู่ข้าวและเนื้อย่าง'), 'Warm feijão tropeiro in a shallow serving dish with beans, egg, sausage and greens.'),
    ],
    storage: cookedStorage,
    cultureNote: ml('Feijão tropeiro is strongly associated with Minas Gerais and with the food carried by tropeiros travelling through the interior. Beans, cassava flour, pork and greens make a sturdy meal from practical ingredients.', 'Feijão tropeiro 與米納斯吉拉斯州及內陸旅行的 tropeiros 飲食密切相關；豆子、木薯粉、豬肉與青菜把實用食材組成扎實的一餐。', 'フェイジャォン・トロペイロはミナスジェライス州と、内陸を旅したトロペイロが携えた食文化に深く結び付きます。豆、キャッサバ粉、豚肉、葉野菜で力強い一食になります。', '페이장 트로페이루는 미나스제라이스와 내륙을 이동하던 트로페이루의 음식 문화에 깊이 연결됩니다. 콩, 카사바 가루, 돼지고기와 잎채소로 든든한 한 끼를 만듭니다.', 'เฟเจาทรอเปโรผูกพันกับมีนัสเชไรส์และอาหารของ tropeiros ที่เดินทางในเขตภายใน ถั่ว แป้งมัน หมู และผักใบรวมเป็นมื้อหนักจากวัตถุดิบใช้ได้จริง'),
    imageAlt: ml('Feijão tropeiro with beans, bacon, sausage, egg, collard greens and cassava flour', '豆子、培根、香腸、蛋、羽衣甘藍與木薯粉的 Feijão tropeiro', '豆、ベーコン、ソーセージ、卵、コラードグリーン、キャッサバ粉のフェイジャォン・トロペイロ', '콩, 베이컨, 소시지, 달걀, 콜라드 그린과 카사바 가루를 넣은 페이장 트로페이루', 'เฟเจาทรอเปโรใส่ถั่ว เบคอน ไส้กรอก ไข่ ผักคอลลาร์ด และแป้งมันคั่ว'),
    visualSpec: 'Shallow rustic Brazilian feijão tropeiro with whole beans, browned bacon and sausage, large soft egg curds, bright collard greens and toasted cassava flour visibly coating the mixture; dry-moist skillet texture.'
  })
];
