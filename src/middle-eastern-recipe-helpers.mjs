import { middleEasternRecipeSources } from './middle-eastern-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  dip: {
    tips: [
      ml('Blend the tahini and lemon first until pale and fluffy, then add chickpeas gradually for a lighter, smoother dip.', '先將芝麻醬與檸檬汁打至顏色變淡、質地蓬鬆，再分次加入鷹嘴豆，口感會更輕柔滑順。', '先にタヒニとレモン汁を淡い色でふんわりするまで撹拌し、ひよこ豆を少しずつ加えると軽く滑らかなディップになります。', '타히니와 레몬즙을 먼저 색이 옅고 폭신해질 때까지 갈고 병아리콩을 나누어 넣으면 더 가볍고 부드럽습니다.', 'ปั่นทาฮินีกับน้ำมะนาวก่อนจนสีอ่อนและฟู แล้วค่อยเติมถั่วลูกไก่ทีละส่วนจะได้ดิปที่เบาและเนียน'),
      ml('Reserve a little cooking liquid and add it by the spoonful only if the mixture needs loosening.', '保留少量煮豆水，只有質地太稠時才以湯匙少量加入調整。', 'ゆで汁を少し取り置き、固いときだけスプーンで少量ずつ加えて調整します。', '삶은 물을 조금 남겨 두고 농도가 너무 되직할 때만 숟가락으로 조금씩 넣습니다.', 'เก็บน้ำต้มถั่วไว้เล็กน้อย เติมทีละช้อนเฉพาะเมื่อเนื้อข้นเกินไป')
    ],
    commonMistakes: [
      ml('Adding all the chickpeas at once can overwhelm a small food processor and leave coarse pieces.', '一次倒入全部鷹嘴豆，可能讓小型食物調理機負荷過重並留下粗顆粒。', 'ひよこ豆を一度に全部入れると、小型フードプロセッサーに負荷がかかり粒が残ることがあります。', '병아리콩을 한꺼번에 넣으면 작은 푸드프로세서에 부담을 주고 거친 알갱이가 남을 수 있습니다.', 'ใส่ถั่วลูกไก่ทั้งหมดพร้อมกันอาจทำให้เครื่องเล็กทำงานหนักและเหลือเนื้อหยาบ'),
      ml('Using bitter tahini or old garlic can dominate the mild chickpea flavor; taste each before blending.', '芝麻醬若有苦味或大蒜不新鮮，會蓋過鷹嘴豆溫和風味；打製前先試味。', '苦みのあるタヒニや古いにんにくは豆の穏やかな風味を覆います。撹拌前に味を確かめます。', '쓴 타히니나 오래된 마늘은 담백한 병아리콩 맛을 덮을 수 있으니 갈기 전에 맛을 봅니다.', 'ทาฮินีขมหรือกระเทียมเก่าอาจกลบรสถั่วอ่อน ๆ ควรชิมก่อนปั่น')
    ],
    substitutions: [
      ml('Use canned chickpeas for a quick batch, rinsing them well and warming briefly to soften their skins.', '趕時間時可用罐頭鷹嘴豆，充分沖洗並稍微加熱，讓豆皮軟化。', '急ぐときは缶詰のひよこ豆をよくすすぎ、皮を柔らかくするため軽く温めます。', '급할 때는 통조림 병아리콩을 잘 헹구고 껍질이 부드러워지도록 잠깐 데웁니다.', 'ใช้ถั่วลูกไก่กระป๋องได้เมื่อรีบ ล้างให้ดีและอุ่นสั้น ๆ เพื่อให้เปลือกนุ่ม'),
      ml('If tahini is unavailable, unsweetened sunflower-seed butter works, though the flavor will differ from the Levantine staple.', '買不到芝麻醬時可用無糖葵花籽醬替代，但風味會不同於黎凡特常見版本。', 'タヒニがなければ無糖のひまわり種バターで代用できますが、レバントの定番とは風味が異なります。', '타히니가 없으면 무가당 해바라기씨 버터로 대체할 수 있지만 레반트식 고유의 맛과는 다릅니다.', 'หากไม่มีทาฮินีใช้เนยเมล็ดทานตะวันไม่หวานแทนได้ แต่รสจะต่างจากแบบเลวานต์')
    ]
  },
  fry: {
    tips: [
      ml('Soak dried chickpeas until fully hydrated, then drain and dry them very well before grinding.', '乾鷹嘴豆須充分浸泡至飽水，磨碎前瀝乾並徹底擦乾。', '乾燥ひよこ豆は十分に戻し、挽く前にしっかり水気を切って乾かします。', '마른 병아리콩을 충분히 불린 뒤 갈기 전에 물기를 잘 빼고 말립니다.', 'แช่ถั่วลูกไก่แห้งให้ดูดน้ำเต็มที่ แล้วสะเด็ดและซับให้แห้งก่อนบด'),
      ml('Fry one test ball first and adjust the mixture with a spoonful of flour only if it crumbles.', '先炸一顆測試；只有在散開時才加少量麵粉調整。', 'まず試しに一つ揚げ、崩れる場合に限って粉を少量加えます。', '먼저 한 개를 시험 튀김하고 부서질 때만 밀가루를 조금 넣어 조정합니다.', 'ทอดหนึ่งชิ้นทดสอบก่อน หากแตกค่อยเติมแป้งทีละน้อย')
    ],
    commonMistakes: [
      ml('Canned or cooked chickpeas are too soft and wet for the classic raw falafel mixture and can make it fall apart.', '罐頭或熟鷹嘴豆對經典生豆泥而言太軟、含水太多，成品容易散開。', '缶詰や加熱済みの豆は伝統的な生地には柔らかく水分が多すぎ、崩れやすくなります。', '통조림이나 익힌 병아리콩은 전통 반죽에 너무 무르고 수분이 많아 쉽게 부서집니다.', 'ถั่วกระป๋องหรือถั่วสุกนิ่มและชื้นเกินไปสำหรับส่วนผสมฟาลาเฟลแบบดั้งเดิม ทำให้แตกง่าย'),
      ml('Crowding the pot drops the oil temperature and makes the crust greasy instead of crisp.', '鍋內一次放太多會使油溫下降，外皮變得油膩而非酥脆。', '鍋に入れすぎると油温が下がり、衣がカリッとせず油っぽくなります。', '냄비에 너무 많이 넣으면 기름 온도가 떨어져 겉이 바삭하지 않고 기름집니다.', 'ใส่ลงหม้อมากเกินทำให้อุณหภูมิน้ำมันลด เปลือกอมน้ำมันแทนที่จะกรอบ')
    ],
    substitutions: [
      ml('A mix of chickpeas and fava beans is traditional in several regional styles; keep the legumes soaked but uncooked.', '多種地區版本會混用鷹嘴豆與蠶豆；無論選哪種，豆子都須浸泡但不可先煮熟。', '地域によってはひよこ豆とそら豆を混ぜます。どちらも水で戻しますが、先にゆでません。', '여러 지역 방식에서 병아리콩과 잠두를 섞습니다. 어떤 콩을 쓰든 불리되 익히지는 않습니다.', 'บางภูมิภาคผสมถั่วลูกไก่กับถั่วปากอ้า ไม่ว่าจะใช้ชนิดใดให้แช่แต่ไม่ต้มก่อน'),
      ml('For a lighter result, shape small patties and shallow-fry in a generous film of oil, turning once.', '想要較清爽口感，可塑成小圓餅並用較多油半煎炸，中途翻面一次。', '軽めにするなら小さなパティにし、多めの油で揚げ焼きして一度返します。', '가볍게 만들려면 작은 패티로 빚어 넉넉한 기름에 지지고 한 번 뒤집습니다.', 'หากต้องการแบบเบา ปั้นเป็นแผ่นเล็กแล้วทอดน้ำมันท่วมตื้น กลับด้านหนึ่งครั้ง')
    ]
  },
  grain: {
    tips: [
      ml('Cook the lentils until just tender before adding rice so both grains finish together without turning mushy.', '扁豆先煮至剛軟，再加入米，讓兩者同時完成且不會糊爛。', '米を加える前にレンズ豆をちょうど柔らかくし、両方が同時に仕上がるようにします。', '쌀을 넣기 전에 렌틸을 막 부드러워질 때까지만 익혀 함께 마무리할 때 뭉개지지 않게 합니다.', 'ต้มเลนทิลให้เพิ่งนุ่มก่อนใส่ข้าว เพื่อให้สุกพร้อมกันโดยไม่เละ'),
      ml('Let the rice rest covered after cooking, then fluff gently before adding the crisp onions.', '米飯煮好後加蓋靜置，再輕輕翻鬆，最後才鋪上酥脆洋蔥。', '炊き上がったら蓋をしたまま休ませ、やさしくほぐしてからカリカリの玉ねぎをのせます。', '밥이 익으면 뚜껑을 덮은 채 뜸 들이고 살살 풀어 바삭한 양파를 올립니다.', 'พักข้าวโดยปิดฝาหลังหุง แล้วค่อย ๆ ซุยก่อนใส่หอมทอดกรอบ')
    ],
    commonMistakes: [
      ml('Adding all the water without checking the lentils can overcook the rice while the pulses are still firm.', '未確認扁豆熟度便一次加完水，可能讓米飯過熟、豆子仍偏硬。', '豆の硬さを確かめず水を全部入れると、豆が硬いまま米が煮えすぎることがあります。', '렌틸의 익힘을 확인하지 않고 물을 전부 넣으면 콩은 단단한데 쌀은 퍼질 수 있습니다.', 'เติมน้ำทั้งหมดโดยไม่เช็กถั่วอาจทำให้ข้าวสุกเกินทั้งที่ถั่วยังแข็ง'),
      ml('Stirring repeatedly after the rice is covered breaks the grains and releases starch.', '米飯加蓋後反覆攪拌會弄碎米粒並釋出澱粉。', '蓋をした後に何度も混ぜると米粒が壊れてでんぷんが出ます。', '뚜껑을 덮은 뒤 자꾸 저으면 쌀알이 깨지고 전분이 나옵니다.', 'คนซ้ำหลังปิดฝาจะทำให้เมล็ดข้าวแตกและปล่อยแป้ง')
    ],
    substitutions: [
      ml('Fine bulgur can replace rice in some Levantine mujadara styles; follow its shorter cooking time and liquid needs.', '部分黎凡特 mujadara 會用細布格麥取代米；依其較短烹煮時間與吸水量調整。', 'レバントのムジャッダラには米の代わりに細挽きブルグルを使う型もあります。短い加熱時間と必要な水分に合わせます。', '레반트 무자다라 일부는 쌀 대신 고운 불구르를 씁니다. 더 짧은 조리 시간과 필요한 수분에 맞추세요.', 'มูจาดาราบางแบบของเลวานต์ใช้บัลเกอร์ละเอียดแทนข้าว ปรับเวลาที่สั้นกว่าและปริมาณน้ำให้เหมาะ'),
      ml('Brown basmati may replace white long-grain rice, but add more cooking liquid and time according to the package.', '可改用糙米印度香米，但須依包裝增加液體與烹煮時間。', '白い長粒米の代わりに玄米バスマティも使えますが、包装に従って水分と加熱時間を増やします。', '백미 장립종 대신 현미 바스마티를 쓸 수 있지만 포장지에 따라 물과 시간을 늘리세요.', 'ใช้ข้าวบาสมาตีไม่ขัดสีแทนข้าวขาวได้ แต่เพิ่มน้ำและเวลาตามฉลาก')
    ]
  },
  salad: {
    tips: [
      ml('Dry the herbs thoroughly after washing so the lemon dressing clings instead of pooling.', '香草洗淨後徹底瀝乾，檸檬醬汁才能附著而不積在碗底。', '洗ったハーブはよく水気を切り、レモンドレッシングがなじむようにします。', '허브를 씻은 뒤 물기를 완전히 빼야 레몬 드레싱이 묽게 고이지 않고 잘 묻습니다.', 'ซับสมุนไพรให้แห้งหลังล้าง เพื่อให้น้ำสลัดเกาะใบแทนการขังที่ก้นชาม'),
      ml('Add toasted pita or bulgur near serving time to preserve its texture.', '接近上桌時才加入烤脆皮塔或布格麥，才能保留口感。', '食感を保つため、焼いたピタやブルグルは食べる直前に加えます。', '식감을 살리려면 구운 피타나 불구르는 먹기 직전에 넣습니다.', 'ใส่ขนมปังพิต้าปิ้งหรือบัลเกอร์ใกล้เวลาเสิร์ฟเพื่อคงเนื้อสัมผัส')
    ],
    commonMistakes: [
      ml('Using too much bulgur overwhelms tabbouleh; the herbs should remain the visual and textural focus.', '布格麥放太多會壓過 tabbouleh；香草應是視覺與口感主角。', 'ブルグルを入れすぎるとタブーリらしさが薄れます。ハーブを見た目と食感の主役にします。', '불구르를 너무 많이 넣으면 타불레의 균형이 무너집니다. 허브가 색과 식감의 중심이어야 합니다.', 'ใส่บัลเกอร์มากไปจะกลบรสทาบูเลห์ สมุนไพรควรเป็นจุดเด่นทั้งหน้าตาและสัมผัส'),
      ml('Dressing the salad far ahead wilts herbs and softens crisp pita.', '太早拌入醬汁會使香草萎軟，也會讓脆皮塔回軟。', '早くからドレッシングをかけるとハーブがしおれ、ピタも柔らかくなります。', '너무 일찍 드레싱하면 허브가 숨이 죽고 피타도 눅눅해집니다.', 'คลุกน้ำสลัดล่วงหน้านานเกินทำให้สมุนไพรเหี่ยวและพิต้านิ่ม')
    ],
    substitutions: [
      ml('Flat-leaf parsley is traditional for tabbouleh; if using curly parsley, chop it especially finely.', '扁葉巴西里是 tabbouleh 常用香草；若用捲葉巴西里，切得更細一些。', 'タブーリにはイタリアンパセリがよく使われます。カーリーパセリを使う場合は特に細かく刻みます。', '타불레에는 이탈리안 파슬리가 흔합니다. 컬리 파슬리를 쓸 때는 특히 곱게 다지세요.', 'ทาบูเลห์มักใช้พาร์สลีย์ใบแบน หากใช้ใบหยิกให้สับละเอียดเป็นพิเศษ'),
      ml('If sumac is unavailable in fattoush, use extra lemon zest and juice for tartness, noting the flavor will differ.', 'fattoush 買不到 sumac 時，可增加檸檬皮屑與汁提酸，但風味會不同。', 'ファットゥーシュにスマックがなければ、酸味を補うためレモンの皮と果汁を増やしますが風味は変わります。', '팻투시에 수맥이 없으면 레몬 제스트와 즙을 더해 산미를 내되 풍미는 달라집니다.', 'หากไม่มีซูแมคในฟัตตูช เพิ่มผิวและน้ำเลมอนเพื่อความเปรี้ยวได้ แต่รสจะแตกต่าง')
    ]
  },
  grill: {
    tips: [
      ml('Chill the seasoned meat mixture briefly before shaping so the skewered kebabs hold together on the grill.', '調味肉餡先稍微冰鎮再塑形，串烤時較能保持完整。', '味付けした肉だねを少し冷やしてから成形すると、串焼き中に崩れにくくなります。', '양념한 고기 반죽을 잠시 차게 한 뒤 모양을 잡으면 구울 때 꼬치에서 잘 떨어지지 않습니다.', 'แช่ส่วนผสมเนื้อที่ปรุงรสให้เย็นสักครู่ก่อนปั้น เพื่อให้เคบับเกาะไม้ขณะย่าง'),
      ml('Oil the grill grates lightly and turn the kebabs only after a browned crust releases easily.', '烤網薄刷油，等表面上色且肉串能自然脫離後再翻面。', '焼き網に薄く油を塗り、焼き色が付き自然にはがれるまで返しません。', '석쇠에 기름을 얇게 바르고 겉면이 갈색으로 익어 쉽게 떨어질 때 뒤집습니다.', 'ทาน้ำมันบนตะแกรงบาง ๆ พลิกเมื่อผิวเป็นสีน้ำตาลและหลุดจากตะแกรงง่ายแล้วเท่านั้น')
    ],
    commonMistakes: [
      ml('Lean-only meat can make kofta dry; a modest amount of fat keeps the skewers juicy.', '只用瘦肉會讓 kofta 偏乾；適量脂肪能保持肉串多汁。', '赤身だけではコフタが乾きやすく、適度な脂が串焼きをジューシーにします。', '살코기만 쓰면 코프타가 퍽퍽해질 수 있어 적당한 지방이 촉촉함을 유지합니다.', 'ใช้เนื้อไม่ติดมันอย่างเดียวทำให้โคฟตาแห้ง ไขมันพอเหมาะช่วยให้ฉ่ำ'),
      ml('Packing meat loosely onto skewers creates air gaps and causes the kebabs to split while turning.', '肉餡沒有緊密貼合烤串，翻面時容易因空隙而裂開。', '肉だねを串に緩く付けると隙間ができ、返すときに割れやすくなります。', '고기를 꼬치에 느슨하게 붙이면 틈이 생겨 뒤집을 때 갈라질 수 있습니다.', 'กดเนื้อหลวม ๆ บนไม้จะเกิดช่องว่างและแตกขณะพลิก')
    ],
    substitutions: [
      ml('Ground beef may replace some lamb, but retain enough fat and keep the spice blend balanced.', '部分羊肉可換成牛絞肉，但仍保留足夠脂肪並維持香料平衡。', 'ラムの一部を牛ひき肉に替えられますが、脂を適度に残し香辛料のバランスを保ちます。', '양고기 일부를 소고기로 바꿀 수 있지만 지방을 적당히 유지하고 향신료 균형을 맞추세요.', 'ใช้เนื้อบดแทนแกะบางส่วนได้ แต่คงไขมันพอเหมาะและปรับเครื่องเทศให้สมดุล'),
      ml('For oven cooking, arrange the kebabs on a rack over a rimmed tray and broil, turning once for even browning.', '改用烤箱時，把肉串放在有邊烤盤上的架子，使用上火烘烤並翻面一次上色。', 'オーブンなら縁付き天板の網に並べ、上火で焼き色を付け、途中で一度返します。', '오븐에서는 테두리 있는 팬 위의 석쇠에 올리고 그릴 기능으로 굽다가 한 번 뒤집어 고르게 색을 냅니다.', 'อบด้วยเตาอบได้โดยวางบนตะแกรงเหนือถาดมีขอบ ใช้ไฟบนและกลับครั้งหนึ่งให้สีทั่ว')
    ]
  },
  bread: {
    tips: [
      ml('The dough should feel soft and supple, not stiff; add flour only a little at a time while kneading.', '麵糰應柔軟有延展性、不僵硬；揉麵時只少量逐次補麵粉。', '生地は硬くせず、柔らかく伸びやすい状態にします。こねながら粉を少しずつ足します。', '반죽은 뻣뻣하지 않고 부드럽고 탄력 있어야 하며, 치댈 때 밀가루는 조금씩만 더합니다.', 'โดควรนุ่มและยืดหยุ่น ไม่แข็ง เติมแป้งทีละน้อยขณะนวดเท่านั้น'),
      ml('Dimple the dough with oiled fingertips so the za’atar oil stays on the surface instead of running off.', '用抹油指尖在麵糰壓出凹痕，讓 za’atar 油留在表面而不流走。', '油を付けた指先で生地にくぼみを作ると、ザアタルオイルが流れず表面に残ります。', '기름을 바른 손끝으로 반죽에 눌러 자국을 내면 자타르 오일이 흘러내리지 않고 표면에 머뭅니다.', 'ใช้นิ้วทาน้ำมันกดหลุมบนแป้ง เพื่อให้น้ำมันซาอ์ตาร์อยู่บนหน้าไม่ไหลออก')
    ],
    commonMistakes: [
      ml('A cold baking surface slows the bake and can leave the flatbread pale and doughy underneath.', '烤盤不夠熱會拖慢烘烤，使扁麵包底部蒼白且帶生麵感。', '焼き面が冷たいと焼成が遅れ、底が白く生っぽく残ることがあります。', '굽는 면이 차가우면 시간이 늘고 납작빵 밑면이 창백하고 덜 익을 수 있습니다.', 'พื้นอบเย็นทำให้สุกช้าและก้นขนมปังซีดหรือเป็นแป้งดิบได้'),
      ml('Overloading za’atar topping can make the centre oily and prevent the bread from setting.', 'za’atar 鋪太厚會讓中心過油並妨礙麵包定型。', 'ザアタルをのせすぎると中心が油っぽくなり、生地が固まりにくくなります。', '자타르 토핑을 너무 많이 올리면 가운데가 기름지고 빵이 제대로 익지 않습니다.', 'ใส่หน้าซาอ์ตาร์มากเกินทำให้กลางมันและแป้งเซ็ตตัวยาก')
    ],
    substitutions: [
      ml('A mix of thyme, toasted sesame, sumac and salt approximates za’atar if a prepared blend is unavailable.', '若沒有現成 za’atar，可用百里香、烘香芝麻、sumac 與鹽混合近似。', '市販のザアタルがなければ、タイム、炒りごま、スマック、塩を合わせて近い味にできます。', '준비된 자타르가 없으면 타임, 볶은 참깨, 수맥과 소금을 섞어 비슷하게 만들 수 있습니다.', 'หากไม่มีซาอ์ตาร์สำเร็จรูป ผสมไทม์ งาคั่ว ซูแมคและเกลือเพื่อให้ใกล้เคียง'),
      ml('Whole-wheat flour can replace some white flour; add liquid gradually because it absorbs more.', '可用全麥粉取代部分白麵粉；因吸水較多，液體需逐步加入。', '白い小麦粉の一部を全粒粉に替えられます。吸水が多いので水分は少しずつ加えます。', '흰 밀가루 일부를 통밀가루로 바꿀 수 있습니다. 흡수율이 높으니 액체를 조금씩 넣으세요.', 'ใช้แป้งโฮลวีตแทนแป้งขาวบางส่วนได้ แต่เติมน้ำทีละน้อยเพราะดูดซึมมากกว่า')
    ]
  },
  eggs: {
    tips: [
      ml('Let the tomato and pepper base reduce until spoonable before adding eggs; loose sauce will flood the whites.', '先將番茄甜椒底醬收至可用湯匙舀起，再加入雞蛋；醬汁太稀會淹過蛋白。', '卵を加える前にトマトとピーマンのソースをスプーンですくえる濃さまで煮詰めます。緩いと白身が広がります。', '달걀을 넣기 전 토마토·피망 소스를 숟가락에 얹힐 정도로 졸입니다. 묽으면 흰자가 퍼집니다.', 'เคี่ยวฐานมะเขือเทศกับพริกหวานให้ข้นก่อนใส่ไข่ หากเหลวเกินไข่ขาวจะแผ่'),
      ml('Cover the pan briefly to set the whites while keeping yolks soft, and uncover for the final visual check.', '短暫蓋鍋讓蛋白凝固、蛋黃保持軟嫩，最後打開檢查熟度。', '短時間蓋をして白身を固め黄身は柔らかく保ち、最後に開けて火の通りを確かめます。', '잠시 뚜껑을 덮어 흰자는 익히고 노른자는 부드럽게 둔 뒤 마지막에 열어 익힘을 확인합니다.', 'ปิดฝาชั่วครู่ให้ไข่ขาวเซ็ตและไข่แดงยังนุ่ม จากนั้นเปิดตรวจความสุกช่วงท้าย')
    ],
    commonMistakes: [
      ml('Cracking the eggs into a watery sauce lets them drift and overcook before the base thickens.', '番茄醬還很稀就打蛋，蛋會漂移並在醬底收濃前過熟。', 'ソースが水っぽいうちに卵を割り入れると広がり、ベースが煮詰まる前に火が通りすぎます。', '소스가 묽을 때 달걀을 넣으면 흰자가 퍼지고 소스가 졸기 전에 과하게 익습니다.', 'ตอกไข่ลงในซอสที่ยังเหลวทำให้ไข่ไหลและสุกเกินก่อนซอสข้น'),
      ml('High heat after adding eggs makes the bottoms tough before the tops gently set.', '加蛋後火力太大會讓底部變硬，而表面尚未柔和凝固。', '卵を加えた後に火が強いと、上が固まる前に底が硬くなります。', '달걀을 넣은 뒤 불이 세면 윗면이 익기 전에 바닥이 질겨집니다.', 'ไฟแรงหลังใส่ไข่ทำให้ก้นแข็งก่อนด้านบนจะค่อย ๆ เซ็ต')
    ],
    substitutions: [
      ml('Use ripe fresh tomatoes when in season, reducing them longer; canned tomatoes provide consistent texture year-round.', '當季可用熟番茄，但需多收汁；罐頭番茄則全年質地穩定。', '旬の完熟トマトも使えますが、長めに煮詰めます。缶詰は一年を通じて安定した質感になります。', '제철 완숙 토마토를 써도 되지만 더 오래 졸입니다. 통조림은 사계절 일정한 질감을 줍니다.', 'ใช้มะเขือเทศสดสุกตามฤดูได้แต่เคี่ยวนานขึ้น มะเขือเทศกระป๋องให้เนื้อสัมผัสคงที่ตลอดปี'),
      ml('For a dairy variation, crumble feta over the sauce before adding eggs; leave it out for a dairy-free pan.', '想要乳製品變化，可在加蛋前撒碎 feta；不加則維持無乳版本。', '乳製品を加えるなら卵の前にフェタを散らします。省けば乳製品不使用です。', '유제품 변형은 달걀을 넣기 전 페타를 부숴 넣고, 생략하면 유제품 없이 만들 수 있습니다.', 'หากต้องการใส่นมให้โรยเฟตาก่อนตอกไข่ งดได้สำหรับแบบไม่มีนม')
    ]
  },
  stew: {
    tips: [
      ml('Toast walnuts until fragrant, then grind finely so they thicken the sauce while releasing their oils.', '核桃烘至有香氣再磨細，燉煮時才能釋出油脂並自然濃稠醬汁。', 'くるみは香りが立つまで炒り、細かく挽くと油分が出てソースにとろみがつきます。', '호두는 향이 날 때까지 볶고 곱게 갈아야 기름이 나오며 소스가 걸쭉해집니다.', 'คั่ววอลนัตจนหอมแล้วบดละเอียด เพื่อให้ปล่อยน้ำมันและช่วยให้ซอสข้น'),
      ml('Balance pomegranate molasses gradually; the finished sauce should taste pleasantly tart, not harsh or sugary.', '石榴糖蜜逐步調整，成品應帶舒服酸香，而非刺酸或過甜。', 'ザクロ糖蜜は少しずつ加え、仕上がりは心地よい酸味にして、尖ったり甘すぎたりしないようにします。', '석류 당밀은 조금씩 조절해 완성된 소스가 기분 좋은 새콤함을 내고 지나치게 시거나 달지 않게 합니다.', 'เติมกากน้ำตาลทับทิมทีละน้อย ซอสควรเปรี้ยวหวานนุ่มนวล ไม่เปรี้ยวจัดหรือหวานเกิน')
    ],
    commonMistakes: [
      ml('A hard boil can scorch the walnut sauce and break its silky emulsion; keep a gentle simmer and scrape the pot.', '大滾容易讓核桃醬燒焦、油水分離；維持小滾並刮拌鍋底。', '強く煮立てるとくるみソースが焦げたり分離したりします。弱く煮て鍋底をこそげます。', '세게 끓이면 호두 소스가 타거나 분리될 수 있으니 약하게 끓이며 냄비 바닥을 긁어 줍니다.', 'เดือดแรงอาจทำให้ซอสวอลนัตไหม้และแยกชั้น เคี่ยวเบา ๆ พร้อมขูดก้นหม้อ'),
      ml('Adding all the pomegranate molasses before tasting can make the stew overly sharp.', '未試味就加入全部石榴糖蜜，可能讓燉菜酸得過頭。', '味見をせずザクロ糖蜜を全部入れると、酸味が強くなりすぎることがあります。', '맛을 보기 전에 석류 당밀을 전부 넣으면 지나치게 시어질 수 있습니다.', 'ใส่กากน้ำตาลทับทิมทั้งหมดโดยไม่ชิมก่อนอาจทำให้เปรี้ยวจัด')
    ],
    substitutions: [
      ml('Bone-in chicken can be replaced with duck for a richer, longer-cooking regional variation; cook until tender.', '可用帶骨鴨肉替代雞肉，做成更濃郁且需久燉的變化；燉至柔嫩即可。', '骨付き鶏肉は鴨肉でも代用でき、より濃厚で長く煮る地方風になります。柔らかく煮込みます。', '뼈 있는 닭고기 대신 오리를 쓰면 더 진하고 오래 끓이는 지역식 변형이 됩니다. 부드러울 때까지 익힙니다.', 'ใช้เป็ดติดกระดูกแทนไก่ได้ เป็นแบบเข้มข้นที่ใช้เวลาตุ๋นนานขึ้น เคี่ยวจนนุ่ม'),
      ml('If pomegranate molasses is unavailable, simmer unsweetened pomegranate juice to reduce it, then adjust with lemon for acidity.', '沒有石榴糖蜜時，可將無糖石榴汁煮濃，再以檸檬調整酸度。', 'ザクロ糖蜜がなければ無糖ザクロジュースを煮詰め、レモンで酸味を調整します。', '석류 당밀이 없으면 무가당 석류 주스를 졸이고 레몬으로 산미를 조절합니다.', 'หากไม่มีกากน้ำตาลทับทิม เคี่ยวน้ำทับทิมไม่หวานให้ลดลง แล้วปรับเปรี้ยวด้วยเลมอน')
    ]
  },
  soup: {
    tips: [
      ml('Rinse red lentils until the water is nearly clear to remove dust and keep the soup flavor clean.', '紅扁豆沖洗至水近乎清澈，去除粉塵並保持湯味乾淨。', '赤レンズ豆は水がほぼ澄むまで洗い、ほこりを落としてすっきり仕上げます。', '붉은 렌틸은 물이 거의 맑아질 때까지 헹궈 먼지를 씻고 깔끔한 맛을 냅니다.', 'ล้างเลนทิลแดงจนเกือบใส เพื่อเอาฝุ่นออกและให้รสน้ำซุปสะอาด'),
      ml('Blend only after the vegetables and lentils are fully tender, then loosen with hot broth to the texture you like.', '蔬菜與扁豆全熟後才攪打，再用熱高湯調成喜歡濃度。', '野菜とレンズ豆が十分に柔らかくなってから撹拌し、熱いだしで好みの濃さにします。', '채소와 렌틸이 완전히 부드러워진 뒤 갈고 뜨거운 육수로 원하는 농도를 맞춥니다.', 'ปั่นหลังผักและเลนทิลนุ่มทั่วแล้ว จากนั้นเติมน้ำซุปร้อนให้ได้ความข้นตามชอบ')
    ],
    commonMistakes: [
      ml('Acid added too early can slow lentil softening; finish with lemon just before serving.', '太早加酸可能讓扁豆較難煮軟；上桌前再擠檸檬。', '酸味を早く加えすぎると豆が柔らかくなるのが遅れます。レモンは提供直前に加えます。', '산을 너무 일찍 넣으면 렌틸이 부드러워지는 데 오래 걸릴 수 있으니 레몬은 내기 직전에 넣습니다.', 'เติมกรดเร็วเกินไปอาจทำให้เลนทิลนุ่มช้า ค่อยบีบเลมอนก่อนเสิร์ฟ'),
      ml('An immersion blender held above the liquid can splatter hot soup; submerge the head before switching it on.', '手持攪拌棒未浸入湯液就啟動，可能噴濺熱湯；先浸入再開機。', 'ハンドブレンダーの先端を液面上で動かすと熱いスープが飛び散ります。浸してから作動させます。', '핸드블렌더 헤드를 국물 위에 둔 채 켜면 뜨거운 수프가 튈 수 있습니다. 먼저 담근 뒤 작동하세요.', 'เปิดเครื่องปั่นมือถือโดยหัวยังอยู่เหนือซุปอาจกระเด็นลวกได้ จุ่มหัวลงก่อนเปิด')
    ],
    substitutions: [
      ml('Vegetable broth keeps the soup vegetarian; chicken broth makes it fuller without changing the Turkish spice profile.', '用蔬菜高湯可維持素食；雞高湯則更醇厚，不會改變土耳其香料風格。', '野菜だしならベジタリアンに、鶏だしならトルコの香辛料の風味を変えずにコクが出ます。', '채수는 채식으로 만들 수 있고 닭육수는 터키 향신료 풍미를 유지하면서 더 진하게 합니다.', 'น้ำซุปผักทำให้เป็นมังสวิรัติ ส่วนน้ำซุปไก่เพิ่มความเข้มข้นโดยไม่เปลี่ยนกลิ่นเครื่องเทศตุรกี'),
      ml('Yellow lentils can replace red lentils, but simmer until fully soft before blending.', '可用黃扁豆替代紅扁豆，但攪打前須煮至全軟。', '赤レンズ豆は黄レンズ豆で代用できますが、撹拌前に完全に柔らかく煮ます。', '붉은 렌틸은 노란 렌틸로 대체할 수 있지만 갈기 전 완전히 부드럽게 익히세요.', 'ใช้เลนทิลเหลืองแทนเลนทิลแดงได้ แต่ต้มให้นุ่มเต็มที่ก่อนปั่น')
    ]
  },
  pastry: {
    tips: [
      ml('Keep unused filo covered with a barely damp towel so the delicate sheets do not dry and crack.', '未使用的 phyllo 蓋上微濕毛巾，避免薄片乾裂。', '使わないフィロ生地は軽く湿らせた布で覆い、乾燥やひび割れを防ぎます。', '사용하지 않는 필로 반죽은 살짝 젖은 천으로 덮어 마르거나 갈라지지 않게 합니다.', 'คลุมแป้งฟิโลที่ยังไม่ใช้ด้วยผ้าชื้นหมาด ๆ เพื่อไม่ให้แห้งและแตก'),
      ml('Brush each filo layer lightly and rotate the pan once if the oven browns unevenly.', '每層 phyllo 輕刷奶油；若烤箱上色不均，中途轉盤一次。', 'フィロの各層にはバターを薄く塗り、焼き色にむらがあれば天板を一度回します。', '필로 각 층에 버터를 얇게 바르고 오븐 색이 고르지 않으면 팬을 한 번 돌립니다.', 'ทาเนยบาง ๆ ทุกชั้นฟิโล และหมุนถาดหนึ่งครั้งหากเตาอบทำให้สีไม่สม่ำเสมอ')
    ],
    commonMistakes: [
      ml('Leaving filo exposed even briefly dries it and makes the sheets tear while layering.', 'phyllo 即使短暫裸露也會變乾，疊層時容易破。', 'フィロを短時間でも空気にさらすと乾き、重ねるときに破れやすくなります。', '필로를 잠깐이라도 덮지 않으면 말라 층을 쌓을 때 찢어집니다.', 'ปล่อยฟิโลไม่คลุมแม้ไม่นานก็แห้งและฉีกขณะเรียงชั้น'),
      ml('Pouring syrup over hot baklava with hot syrup can soften the pastry excessively; keep one warm and the other cool.', '熱糖漿淋在熱 baklava 上，可能讓酥皮過度軟化；一熱一涼即可。', '熱いバクラヴァに熱いシロップをかけると生地が柔らかくなりすぎます。片方を温かく、もう片方を冷まします。', '뜨거운 바클라바에 뜨거운 시럽을 부으면 페이스트리가 지나치게 눅눅해질 수 있으니 한쪽은 식혀 둡니다.', 'ราดน้ำเชื่อมร้อนบนบักลาวาร้อนทำให้แป้งนิ่มเกินไป ให้ส่วนหนึ่งอุ่นและอีกส่วนเย็น')
    ],
    substitutions: [
      ml('Walnuts can replace part of the pistachios; chop the nuts finely but do not grind them into paste.', '部分開心果可改用核桃；堅果切細即可，不要磨成醬。', 'ピスタチオの一部はくるみで代用できます。細かく刻みますがペースト状にはしません。', '피스타치오 일부는 호두로 바꿀 수 있습니다. 곱게 다지되 페이스트로 갈지 마세요.', 'ใช้วอลนัตแทนพิสตาชิโอบางส่วนได้ สับให้ละเอียดแต่อย่าบดเป็นเนยถั่ว'),
      ml('Orange blossom water can be omitted or replaced with rose water in a different regional aromatic profile.', '橙花水可省略，或改用玫瑰水呈現不同地區的香氣版本。', 'オレンジ花水は省略でき、別の地域風の香りならローズウォーターに替えられます。', '오렌지꽃물은 생략하거나 다른 지역 향을 원하면 장미수로 바꿀 수 있습니다.', 'ละน้ำดอกส้มหรือใช้น้ำกุหลาบแทนได้เพื่อกลิ่นหอมแบบภูมิภาคอื่น')
    ]
  }
};

export const cookedStorage = ml(
  'Cool promptly and refrigerate within 2 hours at 0–4°C; use within 3 days and reheat until steaming throughout.',
  '盡快放涼，2 小時內以 0–4°C 冷藏；3 天內食用，回熱至全份冒熱氣。',
  '速やかに冷まし、2時間以内に0–4°Cで冷蔵します。3日以内に食べ、全体が湯気立つまで再加熱します。',
  '빠르게 식혀 2시간 안에 0–4°C로 냉장하세요. 3일 안에 먹고 전체에서 김이 날 때까지 재가열합니다.',
  'ทำให้เย็นเร็วและแช่เย็นที่ 0–4°C ภายใน 2 ชั่วโมง กินภายใน 3 วันและอุ่นให้ร้อนมีไอทั่วถึง'
);
export const chilledStorage = ml(
  'Keep covered at 0–4°C and use within 4 days. Freeze airtight for longer storage and thaw in the refrigerator.',
  '加蓋以 0–4°C 冷藏並於 4 天內食用；久放請密封冷凍，再放冰箱解凍。',
  '覆って0–4°Cで冷蔵し、4日以内に食べます。長期保存は密閉冷凍し、冷蔵庫で解凍します。',
  '덮어서 0–4°C에 보관하고 4일 안에 먹습니다. 더 오래 보관하려면 밀폐 냉동하고 냉장고에서 해동합니다.',
  'ปิดฝาแช่ที่ 0–4°C และกินภายใน 4 วัน หากเก็บนานให้แช่แข็งแบบปิดสนิทแล้วละลายในตู้เย็น'
);
export const roomTempStorage = ml(
  'Keep covered in a cool dry place and use the same day; refrigerate leftovers in a sealed container.',
  '加蓋置於陰涼乾燥處並於當天食用；剩餘部分密封冷藏。',
  '涼しく乾いた場所で覆って保管し、当日中に食べます。残りは密閉して冷蔵します。',
  '덮어 서늘하고 건조한 곳에 두고 당일 먹습니다. 남은 것은 밀폐해 냉장합니다.',
  'ปิดฝาเก็บในที่เย็นแห้งและกินในวันเดียวกัน แช่เย็นส่วนที่เหลือในภาชนะปิดสนิท'
);

export function makeMiddleEasternRecipe(recipe) {
  const { profile = 'grain', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.grain;
  return {
    cuisine: 'middle-eastern',
    region: ml('Middle East (see dish-specific context)', '中東地區（詳見各菜色的具體脈絡）', '中東（料理ごとの地域背景を参照）', '중동(요리별 지역 맥락 참조)', 'ตะวันออกกลาง (ดูบริบทเฉพาะของแต่ละเมนู)'),
    sources: [...(middleEasternRecipeSources[recipe.id] || []), ...additionalSources],
    tips: data.tips || defaults.tips,
    commonMistakes: data.commonMistakes || defaults.commonMistakes,
    substitutions: data.substitutions || defaults.substitutions,
    ...data
  };
}
