import { brazilianRecipeSources } from './brazilian-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  stew: {
    tips: [
      ml('Build the aromatic base before adding liquid, then hold the pot at a quiet simmer so beans and meat soften without breaking apart.', '先把香料蔬菜底炒出香氣再加液體，之後維持安靜小滾，豆子與肉才會變軟而不散碎。', '液体を加える前に香味野菜を炒め、豆と肉が崩れない静かな煮立ちを保ちます。', '액체를 넣기 전에 향채를 볶고 콩과 고기가 무너지지 않도록 잔잔하게 끓이세요.', 'ผัดฐานเครื่องหอมก่อนเติมของเหลว แล้วเคี่ยวเบา ๆ ให้ถั่วและเนื้อนุ่มโดยไม่แตก'),
      ml('Taste only after salted meats, stock and reduction have contributed their seasoning; add acid or fresh herbs at the end for lift.', '鹹肉、高湯與收汁都釋出味道後才試鹹度，最後用酸味或新鮮香草提亮。', '塩漬け肉、ストック、煮詰まりの味が出てから塩を確認し、最後に酸味や生のハーブで引き締めます。', '염장 고기, 육수와 졸아든 국물의 간이 나온 후 소금을 보고 마지막에 산미나 생 허브로 맛을 살리세요.', 'ชิมเค็มหลังเนื้อเค็ม สต๊อก และน้ำงวดมีรสแล้ว ปิดท้ายด้วยรสเปรี้ยวหรือสมุนไพรสด'),
    ],
    commonMistakes: [
      ml('A hard boil can split beans, toughen meat and evaporate the broth before the flavours have melded.', '大火滾煮會讓豆子裂開、肉變硬，也會在味道融合前把湯汁蒸乾。', '強く沸かすと豆が割れ、肉が硬くなり、味がなじむ前に汁が減ります。', '세게 끓이면 콩이 터지고 고기가 질겨지며 맛이 어우러지기 전에 국물이 줄어듭니다.', 'เดือดแรงทำให้ถั่วแตก เนื้อแข็ง และน้ำลดก่อนรสจะรวมตัว'),
      ml('Adding all salt at the start makes the finished pot difficult to correct once cured meat and stock reduce.', '一開始把鹽全加完，鹹肉與高湯收濃後很難修正鹹度。', '最初に塩をすべて入れると、塩漬け肉とストックが煮詰まった後に調整しにくくなります。', '처음부터 소금을 모두 넣으면 염장 고기와 육수가 졸아든 뒤 간을 고치기 어렵습니다.', 'ใส่เกลือทั้งหมดตั้งแต่แรกทำให้ปรับยากเมื่อเนื้อเค็มและสต๊อกงวด'),
    ],
    substitutions: [
      ml('Use unsalted stock where possible so the final seasoning remains under control.', '盡量使用無鹽高湯，最後的調味才容易掌握。', 'できれば無塩ストックを使い、最後の味付けを調整しやすくします。', '가능하면 무염 육수를 써서 마지막 간을 조절하세요.', 'ใช้น้ำสต๊อกไม่เค็มถ้าเป็นไปได้เพื่อคุมรสตอนจบ'),
      ml('If a regional dried chile or cassava product is unavailable, use the closest mild, unsalted alternative and expect a changed regional accent.', '若買不到特定地區的乾辣椒或木薯製品，可用最接近的溫和、無鹽替代品，但地域風味會改變。', '地域の乾燥チレやキャッサバ製品がなければ、近い辛さで無塩の代用品を使い、地域らしい風味の変化を見込みます。', '지역 말린 고추나 카사바 제품이 없으면 매운맛이 비슷하고 무염인 재료로 바꾸되 지역 풍미는 달라집니다.', 'ถ้าไม่มีพริกแห้งหรือผลิตภัณฑ์มันสำปะหลังประจำถิ่น ใช้ของรสอ่อนและไม่เค็มที่ใกล้เคียง โดยรสภูมิภาคจะเปลี่ยน')
    ]
  },
  seafood: {
    tips: [
      ml('Use firm fish and add delicate seafood late; the sauce should simmer while the fish stays in distinct, moist pieces.', '使用肉質緊實的魚，易熟海鮮後放；醬汁要有小滾，魚肉仍應保持完整濕潤。', '身の締まった魚を使い、火の通りやすい魚介は後から加えます。ソースは煮立てても魚はしっとり形を保ちます。', '살이 단단한 생선을 쓰고 빨리 익는 해산물은 늦게 넣어 소스는 끓되 생선은 촉촉하게 형태를 유지하세요.', 'ใช้ปลาที่เนื้อแน่น ใส่อาหารทะเลที่สุกง่ายทีหลัง ให้ซอสเดือดอ่อนแต่ปลาเป็นชิ้นชุ่มฉ่ำ'),
      ml('Arrange the pot so the seafood is mostly surrounded by liquid, then avoid vigorous stirring once fish has been added.', '讓海鮮大多被湯汁包圍，魚下鍋後避免大力攪拌。', '魚介が液体に包まれるように並べ、魚を加えた後は強く混ぜません。', '해산물이 액체에 충분히 잠기도록 놓고 생선을 넣은 뒤 세게 젓지 마세요.', 'จัดอาหารทะเลให้มีน้ำล้อมรอบ และอย่าคนแรงหลังใส่ปลา'),
    ],
    commonMistakes: [
      ml('Overcooking turns shrimp rubbery and makes fish crumble into the broth.', '煮過頭會讓蝦變橡皮口感，也會讓魚碎進湯裡。', '加熱しすぎるとえびが硬くなり、魚がスープに崩れます。', '너무 익히면 새우가 질겨지고 생선이 국물에 부서집니다.', 'ต้มเกินทำให้กุ้งเหนียวและปลายุ่ยลงในน้ำ'),
      ml('Salting seafood heavily before a long rest can draw out moisture; season lightly and adjust the finished sauce.', '海鮮長時間靜置前若鹽下太重會出水；先輕調味，最後再修正醬汁。', '魚介を長く置く前に塩を強くすると水が出ます。薄く下味を付け、仕上げにソースを整えます。', '해산물을 오래 두기 전에 소금을 많이 치면 수분이 빠집니다. 가볍게 밑간하고 소스를 마지막에 맞추세요.', 'ปรุงเค็มจัดก่อนพักนานทำให้น้ำออก ปรุงอ่อนแล้วค่อยปรับซอสตอนจบ'),
    ],
    substitutions: [
      ml('Replace firm white fish with another boneless firm-fleshed variety of similar thickness and start checking it early.', '可用厚度相近、去骨的其他緊實白肉魚替代，並提早檢查熟度。', '同程度の厚みの骨なし白身魚で代用し、早めに火の通りを確認します。', '비슷한 두께의 뼈 없는 단단한 흰살생선으로 바꾸고 일찍 익힘을 확인하세요.', 'ใช้ปลาขาวเนื้อแน่นไม่มีก้างที่หนาใกล้เคียง และเริ่มเช็กความสุกเร็วขึ้น'),
      ml('Coconut milk can be replaced with an unsweetened plant cream, though the aroma will be less traditional.', '椰奶可改用無糖植物奶油，但香氣會較不傳統。', 'ココナッツミルクは無糖の植物性クリームで代用できますが、香りは伝統的なものより弱くなります。', '코코넛밀크는 무가당 식물성 크림으로 바꿀 수 있지만 향은 덜 전통적입니다.', 'เปลี่ยนกะทิเป็นครีมพืชไม่หวานได้ แต่กลิ่นจะไม่ดั้งเดิมเท่าเดิม')
    ]
  },
  fry: {
    tips: [
      ml('Keep the filling cool and the shaped snacks dry before frying; a firm shell is easier to seal and less likely to burst.', '油炸前讓內餡冷卻、成形點心保持乾燥；外皮夠硬才容易封口，也不易爆開。', '揚げる前に具を冷やし、成形した生地を乾いた状態にします。殻が締まると包みやすく破裂しにくくなります。', '튀기기 전 속을 식히고 빚은 간식을 마르게 두세요. 겉이 단단해야 봉합하기 쉽고 터지지 않습니다.', 'ทำไส้ให้เย็นและให้ขนมที่ขึ้นรูปแห้งก่อนทอด เปลือกจะแน่น ปิดง่าย และแตกยาก'),
      ml('Fry in batches with space around each piece so the oil temperature recovers and the crust browns evenly.', '分批油炸並在每個之間留空間，油溫才能回升，外殼也會均勻上色。', '間隔を空けて少量ずつ揚げ、油温を戻して衣を均一に色付けします。', '간격을 두고 나눠 튀겨 기름 온도를 회복시키고 겉을 고르게 갈색 냅니다.', 'ทอดเป็นชุดโดยเว้นช่องว่าง ให้อุณหภูมิน้ำมันกลับมาและเปลือกสีสม่ำเสมอ'),
    ],
    commonMistakes: [
      ml('Warm or wet filling can steam the crust from inside and cause seams to open in the oil.', '溫熱或濕的內餡會從內部把外皮蒸軟，油炸時接縫容易裂開。', '温かく水分の多い具は内側から衣を蒸し、揚げている間に継ぎ目が開きます。', '따뜻하고 젖은 속은 안에서 껍질을 찌듯 해 기름 속에서 이음새가 벌어집니다.', 'ไส้อุ่นหรือเปียกจะนึ่งเปลือกจากด้านใน ทำให้รอยปิดแยกในน้ำมัน'),
      ml('Crowding the pan drops the oil temperature and leaves a pale, greasy crust.', '鍋中塞太滿會使油溫下降，外皮蒼白又吸油。', '鍋に詰め込みすぎると油温が下がり、衣が白く油っぽくなります。', '팬을 가득 채우면 기름 온도가 내려가 겉이 창백하고 느끼해집니다.', 'ใส่แน่นกระทะทำให้น้ำมันเย็น เปลือกซีดและอมน้ำมัน'),
    ],
    substitutions: [
      ml('Use a neutral high-heat oil for frying; fragrant palm oil is especially important when the recipe identifies it as a defining flavour.', '油炸可用耐高溫中性油；若食譜把棕櫚油列為核心風味，就應盡量保留其香氣。', '揚げ物には高温に耐える中性油を使い、レシピが特徴香として挙げるパーム油はできるだけ残します。', '튀김에는 고온용 중성 기름을 쓰되 레시피의 핵심 향인 팜유는 가능하면 유지하세요.', 'ใช้น้ำมันรสกลางทนความร้อนสูง และคงน้ำมันปาล์มเมื่อเป็นกลิ่นหลักของสูตร'),
      ml('If breadcrumbs are unavailable, use fine dry cassava crumbs or another dry crumb with a similar absorbency.', '沒有麵包粉時可用細乾木薯屑或吸油性相近的乾燥粉屑。', 'パン粉がなければ、吸油性の近い細かな乾燥キャッサバ粉や乾燥クラムを使います。', '빵가루가 없으면 흡수력이 비슷한 고운 건조 카사바 부스러기를 쓰세요.', 'ถ้าไม่มีเกล็ดขนมปัง ใช้เกล็ดมันสำปะหลังแห้งละเอียดที่ดูดซับใกล้เคียง')
    ]
  },
  grill: {
    tips: [
      ml('Dry the surface of the beef and salt it just before grilling so the fat cap can render and the exterior can brown.', '牛肉表面擦乾，剛要烤時才撒鹽，讓脂肪層能析油、表面形成焦香。', '牛肉の表面を乾かし、焼く直前に塩を振って脂を落とし、表面を香ばしく焼きます。', '소고기 표면을 말리고 굽기 직전에 소금을 뿌려 지방을 녹이고 겉을 노릇하게 하세요.', 'ซับเนื้อให้แห้งและโรยเกลือก่อนย่าง เพื่อให้มันละลายและผิวเกรียมหอม'),
      ml('Rest grilled meat before slicing, then cut across the grain so each piece stays juicy and easy to chew.', '烤肉先靜置再切，並逆紋切片，肉汁才留得住、入口也更容易咀嚼。', '焼いた肉を休ませてから繊維を横切るように切ると、肉汁が残り食べやすくなります。', '구운 고기는 쉬었다가 결을 가로질러 썰어 육즙을 보존하고 씹기 쉽게 하세요.', 'พักเนื้อย่างก่อนหั่น แล้วหั่นขวางเส้นใยเพื่อเก็บน้ำและเคี้ยวง่าย'),
    ],
    commonMistakes: [
      ml('Moving the steak constantly prevents the fat cap from rendering and interrupts browning.', '不斷翻動牛排會妨礙脂肪析出，也打斷表面上色。', '肉を絶えず動かすと脂が落ちず、焼き色も途切れます。', '스테이크를 계속 움직이면 지방이 녹지 않고 갈변도 끊깁니다.', 'ขยับสเต๊กตลอดทำให้มันไม่ละลายและสีเกรียมไม่ต่อเนื่อง'),
      ml('Slicing immediately releases the hot juices onto the board instead of keeping them in the meat.', '一出爐就切會讓熱肉汁流到砧板上，而不是留在肉裡。', '焼き上がりをすぐ切ると熱い肉汁がまな板へ流れ、肉に戻りません。', '굽자마자 자르면 뜨거운 육즙이 도마로 흘러 고기 안에 남지 않습니다.', 'หั่นทันทีทำให้น้ำร้อนไหลลงเขียงแทนที่จะอยู่ในเนื้อ'),
    ],
    substitutions: [
      ml('A thick top-sirloin cap or another well-marbled grilling cut can stand in for picanha; keep the fat layer if possible.', '可用厚切上臀蓋或其他油花足的燒烤部位替代 picanha，盡量保留脂肪層。', '厚めのトップサーロインキャップなど脂のある焼き肉用部位で代用し、できれば脂の層を残します。', '두꺼운 등심 캡이나 마블링 좋은 구이용 부위로 대신하되 가능하면 지방층을 남기세요.', 'ใช้เนื้อส่วนสะโพกติดมันหนาหรือชิ้นย่างมันแทรกแทน picanha และคงชั้นมันไว้ถ้าเป็นไปได้'),
      ml('A hot cast-iron grill pan works indoors, but provide ventilation because rendered fat can smoke.', '室內可用高溫鑄鐵烤盤，但要保持通風，因為析出的脂肪可能冒煙。', '室内なら熱した鋳鉄グリルパンでもよいですが、脂が煙るので換気します。', '실내에서는 뜨거운 주철 그릴 팬을 써도 되지만 녹은 지방이 연기 날 수 있어 환기하세요.', 'ใช้กระทะย่างเหล็กหล่อร้อนในบ้านได้ แต่ต้องระบายอากาศเพราะมันอาจเกิดควัน')
    ]
  },
  bake: {
    tips: [
      ml('Measure starches and dairy by weight, and let the hot liquid fully hydrate the starch before shaping or baking.', '澱粉與乳製品用重量量測，讓熱液體充分水合澱粉後再成形或烘烤。', 'でんぷんと乳製品は重量で量り、熱い液体で十分に水和してから成形・焼成します。', '전분과 유제품은 무게로 계량하고 뜨거운 액체가 전분을 충분히 불린 뒤 성형·굽기 하세요.', 'ชั่งแป้งและนมด้วยน้ำหนัก ให้ของเหลวร้อนดูดซึมแป้งเต็มที่ก่อนขึ้นรูปหรืออบ'),
      ml('Preheat the oven and use the texture cue in the method; a browned outside can hide a raw or unset centre.', '烤箱先完整預熱並依步驟觀察質地；外表上色可能掩蓋未熟或未凝固的中心。', 'オーブンを十分に予熱し、手順の質感を目安にします。表面の焼き色だけでは中心の生焼けや未凝固を隠せません。', '오븐을 충분히 예열하고 방법의 질감 신호를 따르세요. 겉이 갈색이어도 속이 덜 익거나 굳지 않을 수 있습니다.', 'อุ่นเตาให้เต็มที่และดูเนื้อสัมผัสตามวิธี เพราะสีด้านนอกอาจบังกลางที่ยังไม่สุกหรือไม่เซ็ต'),
    ],
    commonMistakes: [
      ml('Adding eggs to a piping-hot starch mixture can scramble them and leave lumps.', '把蛋直接加入滾燙澱粉糊會使蛋凝結成塊。', '熱すぎるでんぷん生地に卵を加えると固まり、だまになります。', '너무 뜨거운 전분 반죽에 달걀을 넣으면 익어 덩어리집니다.', 'ใส่ไข่ในแป้งร้อนจัดทำให้ไข่จับตัวเป็นก้อน'),
      ml('Opening the oven early can collapse a delicate rise before the crust has set.', '太早開烤箱會在外殼定型前讓脆弱的膨發塌陷。', '早くオーブンを開けると表面が固まる前に膨らみがしぼみます。', '오븐을 일찍 열면 겉이 굳기 전에 부풀음이 꺼질 수 있습니다.', 'เปิดเตาเร็วเกินทำให้ขนมยุบก่อนผิวจะเซ็ต'),
    ],
    substitutions: [
      ml('Tapioca starch is the defining ingredient in pão de queijo; do not replace it with wheat flour if you want its chewy structure.', '木薯澱粉是 pão de queijo 的關鍵，若要保留 Q 彈結構，不要用小麥麵粉替代。', 'タピオカでんぷんはポン・デ・ケイジョの要です。もちっとした構造を求めるなら小麦粉で代用しません。', '타피오카 전분이 빵의 탄력 있는 구조를 만드니 쫀득함을 원하면 밀가루로 바꾸지 마세요.', 'แป้งมันสำปะหลังเป็นหัวใจของ pão de queijo อย่าใช้แป้งสาลีแทนถ้าต้องการเนื้อหนึบ'),
      ml('A blend of dry, well-flavoured cheeses can replace Brazilian cheese; avoid very wet cheese that loosens the dough.', '可用數種乾燥、風味足的起司混合替代巴西起司；避免太濕的起司讓麵糊變稀。', '乾いた風味のあるチーズの組み合わせで代用できますが、生地をゆるめる水分の多いチーズは避けます。', '브라질 치즈는 풍미 있고 수분 적은 치즈를 섞어 대신하되 반죽을 묽게 하는 젖은 치즈는 피하세요.', 'ใช้ชีสแห้งรสชัดผสมแทนชีสบราซิลได้ แต่เลี่ยงชีสชื้นที่ทำให้แป้งเหลว')
    ]
  },
  rice: {
    tips: [
      ml('Toast the rice briefly in the aromatic fat before adding liquid; separate grains absorb the meat and vegetable flavours more evenly.', '米粒先在香料油脂中短炒再加液體；米粒分明才會均勻吸收肉與蔬菜風味。', '液体を加える前に米を香味油で軽く炒め、粒を分けて肉と野菜の味を均一に吸わせます。', '액체를 넣기 전에 쌀을 향미 기름에 살짝 볶아 알알이 고기와 채소 맛을 고르게 흡수하게 하세요.', 'คั่วข้าวสั้น ๆ ในน้ำมันเครื่องหอมก่อนเติมน้ำ เพื่อให้เมล็ดแยกและรับรสเนื้อผักทั่วถึง'),
      ml('Rest the covered pot off the heat so steam finishes the centre without making the bottom wet.', '鍋子離火加蓋靜置，讓蒸氣完成中心，同時避免鍋底變濕。', '火を止めてふたをし、蒸気で中心を仕上げながら底が水っぽくなるのを防ぎます。', '불을 끄고 덮어 증기로 속을 마무리하되 바닥이 질어지지 않게 하세요.', 'พักหม้อปิดฝานอกไฟ ให้ไอน้ำทำกลางให้สุกและไม่ให้ก้นแฉะ'),
    ],
    commonMistakes: [
      ml('Stirring after the liquid is added releases starch and makes the grains sticky.', '加液體後一直攪拌會釋放澱粉，使米粒黏成一團。', '液体を加えた後に混ぜ続けるとでんぷんが出て米が粘ります。', '물을 넣은 뒤 계속 저으면 전분이 나와 밥알이 끈적해집니다.', 'คนต่อหลังเติมน้ำทำให้แป้งออกและเมล็ดข้าวเหนียวติดกัน'),
      ml('Adding salty dried meat without tasting can push the whole pot past a pleasant seasoning level.', '不先試味就加入鹹乾肉，可能讓整鍋超過舒服的鹹度。', '塩気の強い干し肉を味見せず加えると、鍋全体が塩辛くなります。', '짠 건육을 맛보지 않고 넣으면 냄비 전체가 지나치게 짤 수 있습니다.', 'ใส่เนื้อแห้งเค็มโดยไม่ชิมทำให้ทั้งหม้อเค็มเกิน'),
    ],
    substitutions: [
      ml('Short- or medium-grain rice works, but follow the same liquid ratio and adjust only after checking the texture.', '短粒或中粒米都可使用，但先照相同液體比例煮，再依質地微調。', '短粒米・中粒米のどちらも使えますが、同じ液体比率から始め、食感を見て調整します。', '단립 또는 중립 쌀을 쓸 수 있지만 같은 액체 비율로 시작하고 식감을 본 뒤 조절하세요.', 'ใช้ข้าวเมล็ดสั้นหรือกลางได้ เริ่มด้วยอัตราของเหลวเดิมแล้วค่อยปรับตามเนื้อ'),
      ml('Smoked sausage can replace part of dried beef, but reduce added salt because it is already seasoned.', '燻製香腸可替代部分乾牛肉，但因本身有鹹味要減少額外鹽。', '干し肉の一部は燻製ソーセージで代用できますが、味が付いているので追加の塩を減らします。', '건육 일부는 훈제 소시지로 바꿀 수 있지만 이미 간이 있어 추가 소금을 줄이세요.', 'เปลี่ยนเนื้อแห้งบางส่วนเป็นไส้กรอกรมควันได้ แต่ลดเกลือเพราะมีรสอยู่แล้ว')
    ]
  },
  dessert: {
    tips: [
      ml('Cook condensed milk sweets over steady medium heat and scrape the base continuously so the mixture thickens without scorching.', '煮煉乳甜點時維持穩定中火並持續刮鍋底，讓混合物變稠而不焦。', '練乳菓子は中火を保ち、底を絶えずこすって焦がさずに濃度を出します。', '연유 과자는 중불을 유지하고 바닥을 계속 긁어 타지 않게 농도를 올리세요.', 'กวนขนมจากนมข้นด้วยไฟกลางคงที่ ขูดก้นตลอดให้ข้นโดยไม่ไหม้'),
      ml('For egg-rich custards, mix gently and strain if needed; trapped air makes the surface rough instead of glossy.', '蛋黃比例高的卡士達要輕柔混合，必要時過篩；氣泡會讓表面粗糙而不亮。', '卵の多いカスタードはやさしく混ぜ、必要なら漉します。空気が入ると表面が荒れて艶が失われます。', '달걀이 많은 커스터드는 부드럽게 섞고 필요하면 체에 거르세요. 공기가 갇히면 표면이 거칠고 윤기가 사라집니다.', 'คัสตาร์ดไข่แดงสูงให้ผสมเบา ๆ และกรองถ้าจำเป็น ฟองอากาศทำให้ผิวหยาบไม่เงา'),
    ],
    commonMistakes: [
      ml('Stopping the stir too long lets condensed milk or sugar catch on the bottom and adds a bitter note.', '太久不攪拌會讓煉乳或糖黏底，成品帶苦味。', '長く混ぜないと練乳や砂糖が底に付き、苦味が出ます。', '너무 오래 젓지 않으면 연유나 설탕이 바닥에 눌어붙어 쓴맛이 납니다.', 'หยุดกวนนานทำให้นมข้นหรือน้ำตาลติดก้นและมีรสขม'),
      ml('Unmoulding before the custard is cold can tear the edges and hide the clean layered texture.', '卡士達尚未冷透就脫模，邊緣會破，也看不見俐落層次。', '冷え切る前に型から外すと縁が崩れ、きれいな層が見えません。', '커스터드가 차갑게 식기 전에 빼면 가장자리가 찢어지고 층이 깔끔하지 않습니다.', 'แกะตอนคัสตาร์ดยังไม่เย็นทำให้ขอบขาดและชั้นไม่เรียบ'),
    ],
    substitutions: [
      ml('Unsweetened desiccated coconut is the safest substitute for fresh coconut; avoid sweetened coconut because it changes the set.', '無糖乾燥椰絲最適合替代新鮮椰子；避免加糖椰絲，否則凝固狀態會改變。', '生ココナッツの代わりは無糖の乾燥ココナッツが扱いやすく、加糖品は固まり方が変わるので避けます。', '생 코코넛은 무가당 건조 코코넛으로 대신하는 것이 안전하며 가당 제품은 굳기가 달라져 피하세요.', 'มะพร้าวแห้งไม่หวานใช้แทนมะพร้าวสดได้ดีที่สุด เลี่ยงแบบหวานเพราะทำให้เซ็ตต่างไป'),
      ml('If a mould shape changes, keep its volume similar and begin checking the centre early because depth controls baking time.', '若改用不同模具，容量要接近，並提早檢查中心，因為深度會影響烘烤時間。', '型を変える場合は容量を近づけ、深さで焼き時間が変わるので中心を早めに確認します。', '틀 모양을 바꾸면 용량을 비슷하게 유지하고 깊이가 굽는 시간을 바꾸므로 속을 일찍 확인하세요.', 'ถ้าเปลี่ยนพิมพ์ให้ปริมาตรใกล้เดิมและเช็กกลางเร็ว เพราะความลึกกำหนดเวลาอบ')
    ]
  }
};

export function makeBrazilianRecipe(recipe) {
  const { profile = 'stew', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.stew;
  return {
    cuisine: 'brazilian',
    region: ml('Brazil', '巴西', 'ブラジル', '브라질', 'บราซิล'),
    sources: [...(brazilianRecipeSources[recipe.id] || []), ...additionalSources],
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
