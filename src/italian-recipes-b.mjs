import { ml, ingredient as i, step as s, makeItalianRecipe as r, pastaStorage, bakedStorage } from './italian-recipe-helpers.mjs';

export const italianRecipesB = [
  r({
    id: 'pasta-alla-norma', profile: 'pasta',
    name: ml('Pasta alla Norma','諾瑪茄子番茄義大利麵','パスタ・アッラ・ノルマ','파스타 알라 노르마','พาสตา อัลลา นอร์มา'),
    prepMinutes: 25, cookMinutes: 35, totalMinutes: 60, servings: 4,
    description: ml('A Sicilian pasta of fried eggplant, tomato, basil and salty ricotta salata. Browning the eggplant separately keeps its edges rich while the tomato sauce stays bright.','西西里經典麵食，以煎炸茄子、番茄、羅勒與鹹味 ricotta salata 組成；茄子分開上色可保留濃郁邊緣，同時讓番茄醬維持鮮亮。','揚げ焼きしたなす、トマト、バジル、塩味のリコッタ・サラータを合わせるシチリアのパスタ。なすを別に焼くことで香ばしさと鮮やかなトマトソースを両立します。','튀긴 가지, 토마토, 바질, 짭짤한 리코타 살라타를 곁들인 시칠리아 파스타입니다. 가지를 따로 갈색 내면 풍미를 살리면서 토마토 소스 색을 선명하게 유지합니다.','พาสตาซิซิลีที่มีมะเขือม่วงทอด มะเขือเทศ โหระพา และริคอตตาซาลาตารสเค็ม การทำมะเขือม่วงแยกช่วยให้ขอบหอมโดยซอสมะเขือเทศยังสดใส'),
    ingredients: [
      i('360 g','rigatoni or short pasta','Rigatoni 粗管短麵或其他短麵','リガトーニまたはショートパスタ','리가토니 또는 짧은 파스타','ริกาโตนีหรือพาสตาสั้น'),
      i('600 g','eggplant, cut into 2 cm cubes','茄子，切 2 公分丁','なす、2cm角','가지, 2cm 깍둑썰기','มะเขือม่วง หั่นเต๋า 2 ซม.'),
      i('45 ml','extra-virgin olive oil, divided','特級初榨橄欖油，分次使用','エクストラバージンオリーブ油、分けて使う','엑스트라 버진 올리브유, 나눠 사용','น้ำมันมะกอกเอ็กซ์ตร้าเวอร์จิน แบ่งใช้'),
      i('10 g','garlic, thinly sliced','大蒜，切薄片','にんにく、薄切り','마늘, 얇게 썰기','กระเทียม หั่นบาง'),
      i('700 g','crushed tomatoes','壓碎番茄','つぶしトマト','으깬 토마토','มะเขือเทศบด'),
      i('12 g','fresh basil leaves','新鮮羅勒葉','バジルの葉','생바질 잎','ใบโหระพาอิตาเลียนสด'),
      i('100 g','ricotta salata, finely grated','Ricotta salata 鹹乳酪，細刨','リコッタ・サラータ、細かくおろす','리코타 살라타, 곱게 갈기','ริคอตตาซาลาตา ขูดละเอียด'),
      i('3 L','water for boiling pasta','煮麵用水','パスタをゆでる水','면 삶을 물','น้ำสำหรับต้มเส้น'),
      i('24 g','fine salt for pasta water','煮麵水用細鹽','ゆで湯用の塩','면수용 고운 소금','เกลือละเอียดสำหรับน้ำต้มเส้น'),
      i('4 g','fine salt for eggplant and sauce','茄子與醬汁用細鹽','なすとソース用の塩','가지와 소스용 고운 소금','เกลือละเอียดสำหรับมะเขือม่วงและซอส')
    ],
    instructions: [
      s(ml('Brown the eggplant','將茄子煎上色','なすを焼く','가지 굽기','ทำมะเขือม่วงให้ขึ้นสี'), ml('Toss eggplant with 30 ml oil and 2 g salt. Cook in a wide skillet over medium-high heat in two batches for 8–10 minutes each until tender with deep golden edges; set aside.','茄子拌 30 毫升油與 2 公克鹽，寬鍋中大火分兩批各煎 8–10 分鐘，至柔軟且邊緣深金黃，盛出備用。','なすを油30ml、塩2gで和え、広いフライパンで中強火、2回に分けて各8〜10分、柔らかく濃い焼き色が付くまで焼き、取り出す。','가지에 오일 30ml와 소금 2g을 섞어 넓은 팬에서 중강불로 두 번 나눠 각각 8–10분 부드럽고 진한 황금빛 가장자리가 생길 때까지 익혀 둡니다.','คลุกมะเขือม่วงกับน้ำมัน 30 มล. และเกลือ 2 กรัม ผัดกระทะกว้างไฟกลางค่อนแรง 2 รอบ รอบละ 8–10 นาทีจนเนื้อนุ่มและขอบสีทองเข้ม พักไว้'), 'Golden-brown eggplant cubes with soft centres in a wide skillet, with the cooked first batch in a separate bowl.'),
      s(ml('Simmer the tomato sauce','煮番茄醬','トマトソースを煮る','토마토 소스 끓이기','เคี่ยวซอสมะเขือเทศ'), ml('Lower to medium heat, add the remaining 15 ml oil and garlic, and cook 30 seconds. Add tomatoes and 2 g salt; simmer uncovered 15 minutes until slightly thickened. Tear in half the basil.','轉中火，加入剩餘 15 毫升油與蒜片炒 30 秒；加番茄與 2 公克鹽，開蓋煮 15 分鐘至略濃，撕入一半羅勒。','中火にして残りの油15mlとにんにくを30秒炒める。トマトと塩2gを加え、ふたなしで15分煮て少し濃くし、バジル半量をちぎって加える。','중불로 낮춰 남은 오일 15ml와 마늘을 30초 익히고 토마토와 소금 2g을 넣어 뚜껑 없이 15분 약간 걸쭉하게 끓인 뒤 바질 절반을 찢어 넣습니다.','ลดเป็นไฟกลาง ใส่น้ำมันที่เหลือ 15 มล. กับกระเทียม 30 วินาที เติมมะเขือเทศและเกลือ 2 กรัม เคี่ยวเปิดฝา 15 นาทีจนข้นเล็กน้อย ฉีกโหระพาครึ่งหนึ่งใส่'), 'Bright red tomato sauce simmering with thin garlic slices and torn basil, with browned eggplant waiting separately.'),
      s(ml('Boil the pasta','煮義大利麵','パスタをゆでる','파스타 삶기','ต้มพาสตา'), ml('Boil 3 L water with 24 g salt. Cook pasta until 2 minutes short of package al dente. Reserve 250 ml pasta water and drain.','3 公升水加 24 公克鹽煮滾，麵煮至比包裝 al dente 少 2 分鐘；留 250 毫升煮麵水後瀝乾。','水3Lに塩24gを加え、表示のアルデンテより2分短くゆでる。ゆで汁250mlを取り分けて湯切りする。','물 3L에 소금 24g을 넣고 파스타를 포장 알덴테보다 2분 짧게 삶아 면수 250ml를 남기고 건집니다.','ต้มน้ำ 3 ลิตรกับเกลือ 24 กรัม ต้มพาสตาสั้นกว่าเวลาอัลเดนเต 2 นาที เก็บน้ำต้มเส้น 250 มล. แล้วสะเด็ด'), 'Short pasta boiling in salted water, with a measuring jug of reserved cloudy pasta water nearby.'),
      s(ml('Finish with eggplant','加入茄子完成','なすと仕上げる','가지와 마무리','จบด้วยมะเขือม่วง'), ml('Add pasta to the tomato sauce with 100 ml pasta water and toss over medium heat for 2 minutes. Fold in three quarters of the browned eggplant without crushing it.','麵加入番茄醬與 100 毫升煮麵水，中火翻拌 2 分鐘；輕柔拌入四分之三的煎茄子，不要壓碎。','パスタをソースへ入れ、ゆで汁100mlを加えて中火で2分和える。焼いたなすの4分の3をつぶさないように混ぜる。','파스타를 소스에 넣고 면수 100ml와 중불에서 2분 버무린 뒤 구운 가지의 4분의 3을 으깨지 않게 섞습니다.','ใส่พาสตาลงซอสกับน้ำต้มเส้น 100 มล. คลุกไฟกลาง 2 นาที แล้วพับมะเขือม่วงสีน้ำตาลสามในสี่ส่วนเข้าไปเบา ๆ ไม่ให้เละ'), 'Rigatoni coated in red tomato sauce with intact golden eggplant cubes folded through.'),
      s(ml('Add ricotta salata','撒鹹乳酪上桌','リコッタ・サラータで仕上げる','리코타 살라타로 마무리','โรยริคอตตาซาลาตา'), ml('Divide into warm bowls. Top with the remaining eggplant, ricotta salata and remaining basil; serve immediately.','分入溫碗，放上剩餘茄子、ricotta salata 與羅勒，立即上桌。','温めた器に盛り、残りのなす、リコッタ・サラータ、バジルをのせてすぐ供する。','따뜻한 그릇에 담고 남은 가지, 리코타 살라타와 바질을 올려 바로 냅니다.','แบ่งใส่ชามอุ่น วางมะเขือม่วงที่เหลือ โรยริคอตตาซาลาตาและโหระพาที่เหลือ เสิร์ฟทันที'), 'Finished Pasta alla Norma with red-sauced short pasta, golden eggplant cubes, white grated ricotta salata and basil leaves.'),
    ], storage: pastaStorage,
    cultureNote: ml('Pasta alla Norma is associated with Catania in Sicily, where eggplant, tomato and ricotta salata form a characteristic local combination.','Pasta alla Norma 與西西里卡塔尼亞密切相關，茄子、番茄與 ricotta salata 是其代表性地方組合。','パスタ・アッラ・ノルマはシチリアのカターニアを代表し、なす、トマト、リコッタ・サラータの組み合わせが特徴です。','파스타 알라 노르마는 시칠리아 카타니아와 관련이 깊으며 가지, 토마토, 리코타 살라타의 조합이 특징입니다.','พาสตาอัลลานอร์มาเชื่อมโยงกับคาตาเนียในซิซิลี โดยมะเขือม่วง มะเขือเทศ และริคอตตาซาลาตาเป็นชุดรสท้องถิ่นเด่น'),
    imageAlt: ml('Pasta alla Norma with tomato, golden eggplant, ricotta salata and basil','諾瑪義大利麵，番茄醬、金黃茄子、ricotta salata 與羅勒','トマト、焼きなす、リコッタ・サラータ、バジルのパスタ・アッラ・ノルマ','토마토, 황금빛 가지, 리코타 살라타와 바질의 파스타 알라 노르마','พาสตาอัลลานอร์มากับมะเขือเทศ มะเขือม่วงสีทอง ริคอตตาซาลาตา และโหระพา'),
    visualSpec: 'Short pasta in bright tomato sauce with distinct golden eggplant cubes, finely grated white ricotta salata and fresh basil; no meat or cream.'
  }),

  r({
    id: 'trofie-al-pesto', profile: 'pasta',
    name: ml('Trofie al Pesto Genovese','熱那亞青醬 Trofie 麵','トロフィエ・アル・ペスト・ジェノヴェーゼ','트로피에 알 페스토 제노베제','โทรฟีเอ อัล เปสโต เจโนเวเซ'),
    prepMinutes: 20, cookMinutes: 20, totalMinutes: 40, servings: 4,
    description: ml('Liguria’s twisted trofie coated in a fresh basil pesto of pine nuts, garlic, Parmigiano and Pecorino, with potato and green beans cooked in the pasta pot.','利古里亞扭紋 Trofie 麵裹上由羅勒、松子、蒜、帕瑪森與佩科里諾製成的新鮮青醬，並搭配同鍋煮熟的馬鈴薯與四季豆。','リグーリアのねじれたトロフィエに、バジル、松の実、にんにく、パルミジャーノ、ペコリーノのペストを絡め、じゃがいもといんげんも同じ鍋でゆでます。','리구리아의 꼬인 트로피에 면에 바질, 잣, 마늘, 파르미자노와 페코리노로 만든 신선한 페스토를 입히고 감자와 그린빈도 같은 냄비에서 익힙니다.','โทรฟีเอเส้นบิดของลิกูเรียคลุกเพสโตสดจากโหระพา เมล็ดสน กระเทียม พาร์มิจาโน และเปโกรีโน พร้อมมันฝรั่งและถั่วแขกที่ต้มในหม้อเดียวกัน'),
    ingredients: [
      i('360 g','trofie pasta','Trofie 扭紋麵','トロフィエ','트로피에 파스타','พาสตาโทรฟีเอ'),
      i('120 g','fresh basil leaves','新鮮羅勒葉','バジルの葉','생바질 잎','ใบโหระพาอิตาเลียนสด'),
      i('35 g','pine nuts','松子','松の実','잣','เมล็ดสน'),
      i('8 g','garlic','大蒜','にんにく','마늘','กระเทียม'),
      i('60 g','Parmigiano Reggiano, finely grated','帕瑪森起司，細刨','パルミジャーノ・レッジャーノ、細かくおろす','파르미자노 레자노, 곱게 갈기','พาร์มิจาโนเรจจาโน ขูดละเอียด'),
      i('30 g','Pecorino, finely grated','佩科里諾起司，細刨','ペコリーノ、細かくおろす','페코리노, 곱게 갈기','เปโกรีโน ขูดละเอียด'),
      i('120 ml','extra-virgin olive oil','特級初榨橄欖油','エクストラバージンオリーブ油','엑스트라 버진 올리브유','น้ำมันมะกอกเอ็กซ์ตร้าเวอร์จิน'),
      i('200 g','waxy potatoes, peeled and diced 1.5 cm','蠟質馬鈴薯，去皮切 1.5 公分丁','メークイン系じゃがいも、皮をむき1.5cm角','단단한 감자, 껍질 벗겨 1.5cm 깍둑썰기','มันฝรั่งเนื้อแน่น ปอกแล้วหั่นเต๋า 1.5 ซม.'),
      i('160 g','green beans, trimmed and cut 4 cm','四季豆，去頭尾切 4 公分','さやいんげん、4cm','그린빈, 다듬어 4cm','ถั่วแขก ตัดปลายแล้วหั่น 4 ซม.'),
      i('3 L','water for boiling','煮麵與蔬菜用水','ゆで湯','น้ำต้ม','น้ำสำหรับต้ม'),
      i('24 g','fine salt for cooking water','煮水用細鹽','ゆで湯用の塩','삶는 물용 소금','เกลือละเอียดสำหรับน้ำต้ม')
    ],
    instructions: [
      s(ml('Make the pesto cool','低溫打青醬','ペストを低温で作る','차갑게 페스토 만들기','ทำเพสโตให้เย็น'), ml('Pulse basil, pine nuts and garlic in a chilled processor bowl until finely chopped. Add both cheeses, then drizzle in olive oil and pulse just until creamy; do not let the pesto heat up.','羅勒、松子與蒜放冷藏過的調理機杯中打至細碎，加入兩種起司，再淋橄欖油短打至濃滑；不要讓青醬升溫。','冷やしたフードプロセッサーでバジル、松の実、にんにくを細かくし、2種のチーズを加える。オリーブ油を流し入れ、熱を持たせずクリーム状になるまで短く回す。','차갑게 한 푸드프로세서에 바질, 잣, 마늘을 잘게 간 뒤 두 치즈와 올리브유를 넣어 페스토가 뜨거워지지 않도록 짧게 돌려 크림처럼 만듭니다.','ปั่นโหระพา เมล็ดสน และกระเทียมในโถเย็นให้ละเอียด ใส่ชีสทั้งสองแล้วค่อย ๆ รินน้ำมัน ปั่นสั้น ๆ จนครีมมี่โดยไม่ให้เพสโตร้อน'), 'Bright green basil pesto in a chilled processor bowl with a creamy but slightly textured consistency; no pasta yet.'),
      s(ml('Start the potatoes','เริ่มต้ม馬鈴薯','じゃがいもをゆで始める','감자 먼저 삶기','เริ่มต้มมันฝรั่ง'), ml('Bring 3 L water with 24 g salt to a boil. Add potatoes and cook 5 minutes before adding anything else.','3 公升水加 24 公克鹽煮滾，先加入馬鈴薯煮 5 分鐘。','水3Lに塩24gを加えて沸かし、じゃがいもを入れてまず5分ゆでる。','물 3L에 소금 24g을 넣고 끓인 뒤 감자를 먼저 5분 삶습니다.','ต้มน้ำ 3 ลิตรกับเกลือ 24 กรัมให้เดือด ใส่มันฝรั่งต้ม 5 นาทีก่อน'), 'Small potato cubes gently boiling in salted water, with green beans and dry trofie waiting separately.'),
      s(ml('Add beans and trofie','加入四季豆與麵','いんげんとトロフィエを加える','그린빈과 트로피에 넣기','ใส่ถั่วแขกและโทรฟีเอ'), ml('Add green beans and trofie to the same pot. Cook until the pasta is al dente and the potatoes are tender, usually 8–10 minutes more. Reserve 250 ml cooking water, then drain.','同鍋加入四季豆與 Trofie，再煮約 8–10 分鐘至麵 al dente、馬鈴薯柔軟；保留 250 毫升煮水後瀝乾。','同じ鍋にいんげんとトロフィエを加え、さらに8〜10分、麺がアルデンテでじゃがいもが柔らかくなるまでゆでる。ゆで汁250mlを取り分けて湯切りする。','같은 냄비에 그린빈과 트로피에를 넣고 8–10분 더 삶아 면은 알덴테, 감자는 부드럽게 익힙니다. 삶은 물 250ml를 남기고 건집니다.','ใส่ถั่วแขกและโทรฟีเอในหม้อเดียว ต้มต่อ 8–10 นาทีจนเส้นอัลเดนเตและมันฝรั่งนุ่ม เก็บน้ำต้ม 250 มล. แล้วสะเด็ด'), 'Cooked twisted trofie, tender potato cubes and bright green beans draining together in a colander.'),
      s(ml('Loosen the pesto','調整青醬濃度','ペストをのばす','페스토 풀기','คลายเพสโต'), ml('Put pesto in a large warm—not hot—bowl and stir in 60 ml cooking water. Add drained pasta and vegetables and toss gently; add more water 15 ml at a time until every piece is glossy and coated.','青醬放入溫熱但不燙的盆中，拌入 60 毫升煮水；加入瀝乾的麵與蔬菜輕柔翻拌，再每次加 15 毫升煮水至每一塊都亮澤裹醬。','ペストを温かいが熱くない大きなボウルに入れ、ゆで汁60mlを混ぜる。湯切りしたパスタと野菜を加えてやさしく和え、必要なら15mlずつゆで汁を足す。','페스토를 뜨겁지 않은 따뜻한 큰 볼에 넣고 삶은 물 60ml를 섞습니다. 면과 채소를 넣어 부드럽게 버무리고 필요하면 물을 15ml씩 더해 윤기 있게 코팅합니다.','ใส่เพสโตในชามอุ่นแต่ไม่ร้อน คนกับน้ำต้ม 60 มล. ใส่เส้นและผักที่สะเด็ดแล้วคลุกเบา ๆ เติมน้ำทีละ 15 มล. จนทุกชิ้นเงาและเคลือบซอส'), 'Trofie, potato cubes and green beans gently coated in vivid green pesto in a large bowl, no heat under the bowl.'),
      s(ml('Serve without reheating','不再加熱直接上桌','再加熱せず盛る','다시 가열하지 않고 내기','เสิร์ฟโดยไม่อุ่นซ้ำ'), ml('Divide immediately among bowls. Add a small extra grating of Parmigiano if desired; do not return the pesto to direct heat.','立即分碗；需要時可再刨少量帕瑪森，但不要把青醬重新放回直火加熱。','すぐ器に盛り、好みでパルミジャーノを少量追加する。ペストを直火に戻さない。','바로 그릇에 담고 원하면 파르미자노를 조금 더 갈아 올리되 페스토를 직접 불에 다시 올리지 않습니다.','แบ่งใส่ชามทันที โรยพาร์มิจาโนเพิ่มเล็กน้อยถ้าต้องการ และอย่านำเพสโตกลับขึ้นไฟตรง'), 'Finished trofie al pesto with vivid green sauce, small potato cubes and green beans, lightly dusted with hard cheese.'),
    ], storage: pastaStorage,
    cultureNote: ml('Pesto Genovese is rooted in Liguria; serving it with trofie, potato and green beans is a classic regional combination.','熱那亞青醬源自利古里亞；搭配 Trofie、馬鈴薯與四季豆是當地經典組合。','ペスト・ジェノヴェーゼはリグーリアに根付き、トロフィエ、じゃがいも、いんげんを合わせるのは代表的な組み合わせです。','페스토 제노베제는 리구리아에 뿌리를 두고 있으며 트로피에, 감자, 그린빈과 함께 먹는 것이 대표적입니다.','เพสโตเจโนเวเซมีรากในลิกูเรีย การเสิร์ฟกับโทรฟีเอ มันฝรั่ง และถั่วแขกเป็นชุดคลาสสิกของภูมิภาค'),
    imageAlt: ml('Trofie with bright green pesto, potato and green beans','鮮綠青醬 Trofie 麵，搭配馬鈴薯與四季豆','鮮やかな緑のペスト、じゃがいも、いんげんのトロフィエ','선명한 초록 페스토, 감자와 그린빈을 곁들인 트로피에','โทรฟีเอเพสโตสีเขียวสดกับมันฝรั่งและถั่วแขก'),
    visualSpec: 'Twisted trofie coated in vivid green basil pesto with small tender potato cubes and bright green beans; no tomato or cream.'
  }),

  r({
    id: 'tagliatelle-ragu-bolognese', profile: 'braise',
    name: ml('Tagliatelle al Ragù Bolognese','波隆那肉醬寬麵','タリアテッレ・アル・ラグー・ボロネーゼ','탈리아텔레 알 라구 볼로네제','ตาลยาตเลเล อัล รากู โบโลเนเซ'),
    prepMinutes: 25, cookMinutes: 150, totalMinutes: 175, servings: 6,
    description: ml('Wide egg tagliatelle with a slowly cooked Bolognese ragù of beef, pork, soffritto, wine, tomato and milk. Long gentle cooking turns the sauce cohesive rather than tomato-heavy.','蛋製寬麵搭配慢熬波隆那肉醬，以牛肉、豬肉、香味蔬菜、葡萄酒、番茄與牛奶組成；長時間微火燉煮讓醬汁融合，而非只剩濃重番茄味。','牛肉、豚肉、ソフリット、ワイン、トマト、牛乳をゆっくり煮込んだボロネーゼを卵入りタリアテッレに絡めます。長時間の弱火でトマトだけが前に出ない一体感のあるソースになります。','소고기, 돼지고기, 소프리토, 와인, 토마토와 우유를 오래 끓인 볼로네제 라구를 넓은 달걀 탈리아텔레에 곁들입니다. 긴 약불 조리가 토마토 맛만 튀지 않는 응집된 소스를 만듭니다.','ตาลยาตเลเลไข่เส้นกว้างกับรากูโบโลเนเซที่เคี่ยวช้าจากเนื้อวัว หมู ซอฟฟริโต ไวน์ มะเขือเทศ และนม การเคี่ยวนานทำให้ซอสกลมกลืนแทนที่จะเด่นแต่มะเขือเทศ'),
    ingredients: [
      i('500 g','fresh egg tagliatelle','新鮮蛋製 Tagliatelle 寬麵','生の卵入りタリアテッレ','생 달걀 탈리아텔레','ตาลยาตเลเลไข่สด'),
      i('30 ml','extra-virgin olive oil','特級初榨橄欖油','エクストラバージンオリーブ油','엑스트라 버진 올리브유','น้ำมันมะกอกเอ็กซ์ตร้าเวอร์จิน'),
      i('100 g','onion, finely diced','洋蔥，細切丁','玉ねぎ、みじん切り','양파, 잘게 다지기','หอมใหญ่ หั่นเต๋าเล็ก'),
      i('80 g','carrot, finely diced','紅蘿蔔，細切丁','にんじん、みじん切り','당근, 잘게 다지기','แครอต หั่นเต๋าเล็ก'),
      i('80 g','celery, finely diced','西芹，細切丁','セロリ、みじん切り','셀러리, 잘게 다지기','ขึ้นฉ่ายฝรั่ง หั่นเต๋าเล็ก'),
      i('350 g','ground beef','牛絞肉','牛ひき肉','소고기 다짐육','เนื้อวัวบด'),
      i('200 g','ground pork','豬絞肉','豚ひき肉','돼지고기 다짐육','หมูบด'),
      i('180 ml','dry white wine','不甜白酒','辛口白ワイン','드라이 화이트와인','ไวน์ขาวแห้ง'),
      i('250 g','tomato passata','番茄泥 passata','トマトパッサータ','토마토 파사타','มะเขือเทศพาสซาตา'),
      i('250 ml','whole milk','全脂牛奶','全乳','전지우유','นมสดเต็มมันเนย'),
      i('300 ml','low-salt beef stock','低鹽牛高湯','塩分控えめの牛だし','저염 소고기 육수','น้ำสต๊อกเนื้อโซเดียมต่ำ'),
      i('80 g','Parmigiano Reggiano, finely grated','帕瑪森起司，細刨','パルミジャーノ・レッジャーノ、細かくおろす','파르미자노 레자노, 곱게 갈기','พาร์มิจาโนเรจจาโน ขูดละเอียด'),
      i('5 g','fine salt, divided','細鹽，分次使用','塩、分けて使う','고운 소금, 나눠 사용','เกลือละเอียด แบ่งใช้'),
      i('2 g','ground black pepper','黑胡椒粉','黒こしょう','후춧가루','พริกไทยดำป่น')
    ],
    instructions: [
      s(ml('Soften the soffritto','炒軟香味蔬菜','ソフリットを炒める','소프리토 익히기','ผัดซอฟฟริโต'), ml('Heat oil in a heavy pot over medium-low heat. Add onion, carrot, celery and 2 g salt; cook 10–12 minutes until very soft and sweet without browning.','厚鍋中小火加油，放洋蔥、紅蘿蔔、西芹與 2 公克鹽炒 10–12 分鐘，至非常柔軟帶甜香但不焦黃。','厚手鍋で油を中弱火にし、玉ねぎ、にんじん、セロリ、塩2gを10〜12分、色を付けず十分柔らかく甘みが出るまで炒める。','두꺼운 냄비에 오일을 중약불로 데우고 양파, 당근, 셀러리, 소금 2g을 10–12분 갈색 없이 아주 부드럽고 단맛이 날 때까지 익힙니다.','ตั้งหม้อก้นหนาไฟกลางอ่อน ใส่น้ำมัน หอมใหญ่ แครอต เซเลอรี และเกลือ 2 กรัม ผัด 10–12 นาทีจนนุ่มหวานมากโดยไม่ขึ้นสีน้ำตาล'), 'Very soft finely diced onion, carrot and celery in a heavy pot, translucent with no deep browning.'),
      s(ml('Brown the meats','煎香絞肉','肉を焼き付ける','다짐육 갈색 내기','ทำเนื้อให้ขึ้นสี'), ml('Raise to medium-high. Add beef and pork in loose chunks and cook 10–12 minutes, breaking them up, until moisture evaporates and the meat develops browned spots.','轉中大火，加入牛、豬絞肉鬆散鋪開，炒 10–12 分鐘並撥散，至水分蒸發且肉末出現褐色焦香點。','中強火に上げ、牛肉と豚肉を大きめにほぐして加え、10〜12分、水分が飛び焼き色が付くまで崩しながら炒める。','중강불로 올려 소고기와 돼지고기를 넣고 10–12분 부수며 익혀 수분이 날아가고 갈색 반점이 생기게 합니다.','เพิ่มเป็นไฟกลางค่อนแรง ใส่เนื้อวัวและหมูเป็นก้อนหลวม ๆ ผัด 10–12 นาทีพร้อมยีจนความชื้นระเหยและมีจุดสีน้ำตาล'), 'Crumbled beef and pork with browned spots in the soffritto, with no liquid pooling in the pot.'),
      s(ml('Reduce the wine','收乾白酒','ワインを煮詰める','와인 졸이기','เคี่ยวไวน์ให้งวด'), ml('Add wine and scrape the bottom. Boil 4–5 minutes until the sharp alcohol smell fades and only a shallow glossy coating remains.','倒入白酒刮開鍋底，煮 4–5 分鐘至刺鼻酒氣消失，只剩薄薄亮澤液體。','ワインを加えて鍋底をこそげ、4〜5分、強いアルコール臭が消え、薄い艶のある液体だけになるまで煮る。','와인을 넣어 바닥을 긁고 4–5분 끓여 날카로운 알코올 향이 사라지고 얇은 윤기만 남게 합니다.','เติมไวน์ ขูดก้นหม้อ ต้ม 4–5 นาทีจนกลิ่นแอลกอฮอล์แรงหายและเหลือของเหลวเงาบาง ๆ'), 'Browned minced meat and soffritto coated in a shallow glossy wine reduction.'),
      s(ml('Braise slowly','慢火燉煮','ゆっくり煮込む','천천히 끓이기','เคี่ยวช้า ๆ'), ml('Stir in passata, milk, stock, remaining salt and pepper. Bring just to a simmer, then cook uncovered over very low heat for 110–120 minutes, stirring every 15–20 minutes, until thick and cohesive.','拌入番茄泥、牛奶、高湯、剩餘鹽與胡椒，煮至微滾後轉極小火開蓋燉 110–120 分鐘，每 15–20 分鐘攪拌，至濃稠融合。','パッサータ、牛乳、だし、残りの塩、こしょうを加えて静かに沸かし、ふたなしのごく弱火で110〜120分、15〜20分おきに混ぜ、濃く一体化するまで煮る。','파사타, 우유, 육수, 남은 소금과 후추를 넣어 약하게 끓인 뒤 아주 약한 불에서 뚜껑 없이 110–120분, 15–20분마다 저어 걸쭉하고 응집되게 끓입니다.','ใส่พาสซาตา นม สต๊อก เกลือที่เหลือ และพริกไทย พอเดือดอ่อนแล้วเคี่ยวเปิดฝาไฟอ่อนมาก 110–120 นาที คนทุก 15–20 นาทีจนข้นและกลมกลืน'), 'Thick brick-red Bolognese ragù in a heavy pot, finely textured meat suspended in a cohesive sauce with no watery layer.'),
      s(ml('Cook and sauce the tagliatelle','煮寬麵並拌醬','タリアテッレを和える','탈리아텔레에 소스 입히기','ต้มและคลุกตาลยาตเลเล'), ml('Boil the fresh tagliatelle in well-salted water for 2–4 minutes until just tender. Transfer directly to the ragù with 80 ml pasta water and toss 1 minute; loosen only if needed.','新鮮寬麵在充分加鹽的滾水中煮 2–4 分鐘至剛柔軟，直接移入肉醬，加入 80 毫升煮麵水拌 1 分鐘；只在需要時再加水。','生タリアテッレを十分塩をした湯で2〜4分、ちょうど柔らかくなるまでゆでる。ラグーへ直接移し、ゆで汁80mlを加えて1分和える。必要な時だけ追加する。','생 탈리아텔레를 충분히 소금 간한 물에 2–4분 막 부드러워질 때까지 삶아 라구로 바로 옮기고 면수 80ml와 1분 버무립니다. 필요할 때만 물을 더합니다.','ต้มตาลยาตเลเลสดในน้ำเค็มจัด 2–4 นาทีจนพอนุ่ม ย้ายตรงลงรากู เติมน้ำต้มเส้น 80 มล. คลุก 1 นาที เติมเพิ่มเฉพาะเมื่อจำเป็น'), 'Wide ribbons of egg tagliatelle being coated with thick Bolognese ragù in the pot.'),
      s(ml('Finish with Parmigiano','撒帕瑪森上桌','パルミジャーノで仕上げる','파르미자노로 마무리','โรยพาร์มิจาโน'), ml('Divide into warm bowls and finish with Parmigiano. Serve the sauce clinging to the ribbons rather than pooled underneath.','分入溫碗後撒帕瑪森；醬汁應均勻附著在寬麵上，而不是積在碗底。','温めた器に盛り、パルミジャーノを振る。ソースは底にたまらず麺に絡んだ状態で供する。','따뜻한 그릇에 담고 파르미자노를 뿌리며 소스가 바닥에 고이지 않고 넓은 면에 붙은 상태로 냅니다.','แบ่งใส่ชามอุ่น โรยพาร์มิจาโน เสิร์ฟให้ซอสเกาะเส้นกว้างแทนการขังที่ก้นชาม'), 'Finished tagliatelle al ragù Bolognese with broad egg-pasta ribbons evenly coated in thick meat sauce and a light Parmigiano dusting.'),
    ], storage: pastaStorage,
    cultureNote: ml('In Bologna, ragù is traditionally paired with egg tagliatelle rather than treated as a generic tomato sauce for spaghetti.','在波隆那，ragù 傳統上搭配蛋製 Tagliatelle，而不是當作一般番茄肉醬配細長 spaghetti。','ボローニャではラグーは卵入りタリアテッレと合わせるのが伝統で、スパゲッティ用の一般的なトマトミートソースとは別物です。','볼로냐에서는 라구를 일반적인 스파게티 토마토 고기 소스가 아니라 달걀 탈리아텔레와 짝짓는 것이 전통적입니다.','ในโบโลญญา รากูจับคู่กับตาลยาตเลเลไข่ตามธรรมเนียม มากกว่าจะเป็นซอสมะเขือเทศเนื้อทั่วไปสำหรับสปาเกตตี'),
    imageAlt: ml('Wide tagliatelle ribbons coated in Bolognese ragù with Parmigiano','寬版 Tagliatelle 裹波隆那肉醬並撒帕瑪森','幅広タリアテッレにボロネーゼとパルミジャーノ','넓은 탈리아텔레에 볼로네제 라구와 파르미자노','ตาลยาตเลเลเส้นกว้างเคลือบรากูโบโลเนเซและพาร์มิจาโน'),
    visualSpec: 'Broad egg tagliatelle ribbons evenly coated in thick brick-red Bolognese meat ragù with a restrained Parmigiano dusting; no watery tomato pool.'
  }),

  r({
    id: 'lasagne-bolognese', profile: 'baked',
    name: ml('Lasagne alla Bolognese','波隆那千層麵','ラザーニェ・アッラ・ボロネーゼ','라자냐 알라 볼로네제','ลาซานญา อัลลา โบโลเนเซ'),
    prepMinutes: 45, cookMinutes: 75, totalMinutes: 120, servings: 8,
    description: ml('Layered egg pasta with Bolognese ragù, béchamel and Parmigiano, baked until the corners are browned and the centre holds clean layers after resting.','蛋製麵皮層層夾入波隆那肉醬、白醬與帕瑪森，烤到邊角焦香；出爐靜置後切面仍能保有清楚層次。','卵入りパスタにボロネーゼ、ベシャメル、パルミジャーノを重ね、角が香ばしく色づくまで焼く。休ませると断面の層がきれいに保てます。','달걀 파스타에 볼로네제 라구, 베샤멜, 파르미자노를 겹쳐 가장자리가 갈색이 될 때까지 굽고 쉬게 해 단면 층을 또렷하게 유지합니다.','พาสตาไข่ซ้อนชั้นกับรากูโบโลเนเซ เบชาเมล และพาร์มิจาโน อบจนมุมเป็นสีน้ำตาล พักแล้วตัดเห็นชั้นชัด'),
    ingredients: [
      i(ml('12 sheets / about 300 g','12 張 / 約 300 g','12枚 / 約300 g','12장 / 약 300 g','12 แผ่น / ประมาณ 300 g'),'fresh lasagne sheets','新鮮千層麵皮','生ラザーニャシート','생 라자냐 시트','แผ่นลาซานญาสด'),
      i('900 g','prepared Bolognese ragù','煮好的波隆那肉醬','作っておいたボロネーゼ','준비한 볼로네제 라구','รากูโบโลเนเซที่เตรียมไว้'),
      i('60 g','unsalted butter','無鹽奶油','無塩バター','무염버터','เนยจืด'),
      i('60 g','plain flour','中筋麵粉','薄力粉または中力粉','중력분','แป้งสาลีอเนกประสงค์'),
      i('750 ml','whole milk, warm','全脂牛奶，溫熱','全乳、温める','전지우유, 따뜻하게','นมสดเต็มมันเนย อุ่น'),
      i('2 g','fine salt','細鹽','塩','고운 소금','เกลือละเอียด'),
      i('0.5 g','ground nutmeg','肉豆蔻粉','ナツメグ','넛맥가루','ลูกจันทน์เทศป่น'),
      i('120 g','Parmigiano Reggiano, finely grated','帕瑪森起司，細刨','パルミジャーノ・レッジャーノ、細かくおろす','파르미자노 레자노, 곱게 갈기','พาร์มิจาโนเรจจาโน ขูดละเอียด'),
      i('10 g','butter for the baking dish','烤皿抹油用奶油','型に塗るバター','오븐 용기용 버터','เนยสำหรับทาถาด')
    ],
    instructions: [
      s(ml('Cook the béchamel','煮白醬','ベシャメルを作る','베샤멜 만들기','ทำเบชาเมล'), ml('Melt 60 g butter over medium-low heat. Whisk in flour for 2 minutes without browning, then gradually whisk in warm milk. Simmer 6–8 minutes until it coats a spoon; season with salt and nutmeg.','中小火融化 60 公克奶油，拌入麵粉煮 2 分鐘但不上色，再分次攪入溫牛奶；微滾 6–8 分鐘至能薄掛湯匙，以鹽與肉豆蔻調味。','バター60gを中弱火で溶かし、粉を加えて色を付けず2分混ぜる。温かい牛乳を少しずつ加え、6〜8分、とろみがつくまで煮て塩とナツメグで調味する。','버터 60g을 중약불에 녹이고 밀가루를 넣어 갈색 없이 2분 익힌 뒤 따뜻한 우유를 조금씩 넣어 저어 6–8분 숟가락에 얇게 코팅될 때까지 끓이고 소금과 넛맥으로 간합니다.','ละลายเนย 60 กรัมไฟกลางอ่อน คนแป้ง 2 นาทีโดยไม่ให้ขึ้นสี ค่อย ๆ ตีนมอุ่นลงไป เคี่ยว 6–8 นาทีจนเคลือบช้อน ปรุงเกลือและลูกจันทน์เทศ'), 'Smooth pale béchamel in a saucepan coating a spoon, with no browned roux or lumps.'),
      s(ml('Prepare the pan','準備烤皿','型を準備する','팬 준비','เตรียมถาด'), ml('Heat the oven to 190°C. Butter a 23 × 33 cm baking dish and spread a thin layer of ragù over the base.','烤箱預熱 190°C。23 × 33 公分烤皿抹奶油，底部薄鋪一層肉醬。','オーブンを190°Cに予熱する。23×33cmの耐熱皿にバターを塗り、底にラグーを薄く敷く。','오븐을 190°C로 예열하고 23×33cm 용기에 버터를 바른 뒤 바닥에 라구를 얇게 폅니다.','อุ่นเตา 190°C ทาเนยในถาด 23 × 33 ซม. แล้วเกลี่ยรากูบาง ๆ ที่ก้นถาด'), 'A buttered rectangular baking dish with only a thin first layer of Bolognese ragù on the bottom.'),
      s(ml('Build the layers','堆疊層次','層を重ねる','층 쌓기','ซ้อนชั้น'), ml('Layer lasagne sheets, one quarter of the remaining ragù, one quarter of the béchamel and one quarter of the Parmigiano. Repeat to make four pasta layers, finishing with béchamel and cheese.','鋪麵皮，再放剩餘肉醬四分之一、白醬四分之一與帕瑪森四分之一；重複至四層麵皮，最上層以白醬與起司收尾。','ラザーニャ、残りのラグー4分の1、ベシャメル4分の1、パルミジャーノ4分の1を順に重ね、4層にする。最後はベシャメルとチーズで終える。','라자냐 시트, 남은 라구 1/4, 베샤멜 1/4, 파르미자노 1/4 순서로 겹쳐 파스타 4층을 만들고 베샤멜과 치즈로 마무리합니다.','วางแผ่นลาซานญา รากูที่เหลือหนึ่งในสี่ เบชาเมลหนึ่งในสี่ และพาร์มิจาโนหนึ่งในสี่ ทำซ้ำให้ครบ 4 ชั้น ปิดท้ายด้วยเบชาเมลและชีส'), 'Unbaked lasagne in a rectangular dish with neat alternating layers and a pale béchamel-Parmesan top.'),
      s(ml('Bake until bubbling','烤至冒泡上色','焼いて色を付ける','보글보글 굽기','อบจนเดือดและขึ้นสี'), ml('Bake uncovered for 35–40 minutes until bubbling around the edges and deeply golden in spots. If the top darkens too fast, loosely tent with foil.','不加蓋烤 35–40 分鐘，至邊緣冒泡、表面出現深金黃斑點；若上色太快，鬆蓋鋁箔。','ふたをせず35〜40分、縁が泡立ち表面に濃い焼き色が付くまで焼く。色づきが早ければホイルをゆるくかぶせる。','덮지 않고 35–40분 가장자리가 끓고 표면에 진한 황금색 반점이 생길 때까지 굽고, 너무 빨리 짙어지면 호일을 느슨하게 덮습니다.','อบเปิดฝา 35–40 นาทีจนขอบเดือดและผิวมีจุดสีทองเข้ม หากเข้มเร็วเกินให้คลุมฟอยล์หลวม ๆ'), 'Freshly baked lasagne with bubbling edges, deeply golden béchamel and browned cheese spots in the rectangular dish.'),
      s(ml('Rest before cutting','靜置再切','休ませてから切る','쉬었다 자르기','พักก่อนตัด'), ml('Rest 20 minutes before cutting into 8 pieces. The layers should hold while remaining moist and creamy inside.','出爐靜置 20 分鐘再切成 8 份；切面應能保持層次，內部仍濕潤滑順。','20分休ませてから8切れに切る。層が崩れず、中はしっとりクリーミーな状態にする。','20분 쉬었다 8조각으로 자르며 층은 유지되고 속은 촉촉하고 크리미해야 합니다.','พัก 20 นาทีก่อนตัดเป็น 8 ชิ้น ชั้นควรอยู่ตัวแต่ด้านในยังชุ่มและครีมมี่'), 'A clean square slice of lasagne showing distinct pasta, ragù and béchamel layers, with a browned top and moist interior.'),
    ], storage: bakedStorage,
    cultureNote: ml('Lasagne alla Bolognese layers Emilia-Romagna’s egg pasta with ragù, béchamel and Parmigiano; the resting period is part of getting a clean slice.','波隆那千層麵把艾米利亞—羅馬涅的蛋麵皮與 ragù、白醬、帕瑪森層層組合；出爐後靜置也是切出整齊層次的重要步驟。','ラザーニェ・アッラ・ボロネーゼはエミリア＝ロマーニャの卵入りパスタにラグー、ベシャメル、パルミジャーノを重ねます。休ませる時間も美しい断面のための工程です。','라자냐 알라 볼로네제는 에밀리아로마냐의 달걀 파스타에 라구, 베샤멜, 파르미자노를 겹치며 쉬는 시간도 깔끔한 단면을 위한 조리 과정입니다.','ลาซานญาโบโลเนเซซ้อนพาสตาไข่แบบเอมีเลีย-โรมัญญากับรากู เบชาเมล และพาร์มิจาโน การพักหลังอบเป็นส่วนหนึ่งของการตัดให้ชั้นสวย'),
    imageAlt: ml('Baked lasagne with distinct ragù, béchamel and pasta layers','烤好的波隆那千層麵，切面可見肉醬、白醬與麵皮層次','ラグー、ベシャメル、パスタの層が見える焼きラザーニャ','라구, 베샤멜과 파스타 층이 선명한 구운 라자냐','ลาซานญาอบที่เห็นชั้นรากู เบชาเมล และแผ่นพาสตาชัดเจน'),
    visualSpec: 'Square serving of lasagne with distinct egg-pasta, brick-red ragù and pale béchamel layers, browned cheesy top and moist interior; no ricotta blobs or extra garnish.'
  })
];
