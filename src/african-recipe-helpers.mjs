import { africanRecipeSources } from './african-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const practical = {
  rice: {
    tips: [
      ml('Measure the liquid after the sauce or stock is ready, then let the rice finish covered over low heat so steam cooks the top evenly.', '醬汁或高湯完成後再量液體；米飯加蓋以小火收乾，讓蒸氣均勻煮熟表層。', 'ソースやだしを整えてから液量を量り、ふたをして弱火で仕上げると蒸気で上まで均一に炊けます。', '소스나 육수를 준비한 뒤 액체 양을 맞추고 뚜껑을 덮어 약불로 마무리하면 수증기가 밥 윗부분까지 고르게 익힙니다.', 'เตรียมซอสหรือน้ำสต็อกแล้วค่อยกะปริมาณของเหลว ปิดฝาหุงไฟอ่อนให้ไอน้ำทำให้ข้าวสุกทั่วถึง'),
      ml('Rest the covered pot off heat before fluffing; this lets excess surface moisture settle without breaking the grains.', '離火加蓋靜置後再翻鬆，讓表面多餘水氣回落，也不會把米粒攪碎。', '火を止めてふたをしたまま休ませてからほぐすと、表面の余分な水分が落ち着き、米粒も崩れません。', '불을 끄고 덮은 채 뜸을 들인 다음 풀어 주면 겉의 수분이 정리되고 쌀알이 부서지지 않습니다.', 'พักหม้อโดยปิดฝาหลังยกลงจากไฟก่อนคุ้ยข้าว ความชื้นส่วนเกินจะนิ่งและเมล็ดข้าวไม่แตก'),
    ],
    commonMistakes: [
      ml('Repeatedly lifting the lid releases steam and leaves the top layer undercooked; keep the lid closed until the stated check.', '一直掀蓋會跑掉蒸氣，表層容易夾生；到指定檢查點前保持加蓋。', '何度もふたを開けると蒸気が逃げて上の米に芯が残ります。確認時まで閉じておきます。', '뚜껑을 자주 열면 수증기가 빠져 윗부분이 설익으니 확인 시점까지 닫아 둡니다.', 'เปิดฝาบ่อยทำให้ไอน้ำหายและข้าวชั้นบนยังแข็ง จึงควรปิดไว้จนถึงเวลาตรวจ'),
      ml('A strong boil scorches the sauce before the rice absorbs it; lower the heat as soon as the pot returns to a simmer.', '大火會在米吸收醬汁前把鍋底燒焦；重新微滾後立刻轉小火。', '強く沸かすと米が吸う前にソースが焦げます。再び煮立ったらすぐ弱火にします。', '센불로 계속 끓이면 쌀이 흡수하기 전에 소스가 탑니다. 다시 끓어오르면 바로 약불로 낮춥니다.', 'ไฟแรงทำให้ซอสไหม้ก่อนข้าวดูดซึม เมื่อน้ำกลับมาเดือดอ่อนให้ลดไฟทันที'),
    ],
    substitutions: [
      ml('Long-grain parboiled rice gives separate grains; if using basmati, reduce the liquid slightly and check it earlier.', '長米 parboiled rice 煮出較分明的米粒；若用 basmati，液體略減並提早檢查。', '長粒のパーボイルド米は粒立ちよく炊けます。バスマティを使う場合は液量を少し減らし、早めに確認します。', '장립종 파보일드 쌀은 밥알이 잘 살아납니다. 바스마티를 쓰면 액체를 조금 줄이고 일찍 확인합니다.', 'ข้าวเมล็ดยาวพาร์บอยล์ให้เมล็ดร่วน หากใช้บาสมาติให้ลดของเหลวเล็กน้อยและตรวจเร็วขึ้น'),
      ml('Vegetable stock can replace chicken stock for a vegetarian pot; use a low-salt stock because the tomato base is already seasoned.', '素食版本可用蔬菜高湯取代雞高湯；番茄底已有調味，請選低鹽高湯。', 'ベジタリアンなら鶏だしを野菜だしに替えられます。トマトベースに味があるため減塩タイプを使います。', '채식으로 만들 때 닭육수 대신 채소육수를 쓸 수 있습니다. 토마토 베이스에 이미 간이 있으니 저염 제품을 고릅니다.', 'ใช้สต็อกผักแทนสต็อกไก่สำหรับสูตรมังสวิรัติ เลือกชนิดโซเดียมต่ำเพราะฐานมะเขือเทศปรุงรสแล้ว'),
    ]
  },
  stew: {
    tips: [
      ml('Cook the onion base until soft and sweet before adding liquid; a patient start creates body without needing extra thickeners.', '先把洋蔥底煮至柔軟回甘再加液體；耐心炒煮即可形成濃度，不需額外勾芡。', '液体を加える前に玉ねぎを柔らかく甘くなるまで炒めると、追加のとろみ材なしでもコクが出ます。', '물을 넣기 전에 양파를 부드럽고 달게 익히면 별도 농도 재료 없이도 깊이가 생깁니다.', 'ผัดฐานหอมหัวใหญ่ให้นุ่มหวานก่อนเติมของเหลว จะได้ความข้นโดยไม่ต้องใช้สารเพิ่มความหนืด'),
      ml('Add delicate leafy vegetables near the end so they stay green and retain a fresh texture.', '細嫩葉菜接近完成時才下鍋，才能保持翠綠與清新口感。', '柔らかい葉野菜は仕上げ近くに加え、緑色とみずみずしい食感を保ちます。', '부드러운 잎채소는 마무리 무렵 넣어 초록색과 산뜻한 식감을 살립니다.', 'ใส่ผักใบอ่อนช่วงท้ายเพื่อคงสีเขียวและเนื้อสัมผัสสด'),
    ],
    commonMistakes: [
      ml('A hard boil can break down the sauce and toughen meat; keep a steady gentle simmer instead.', '大滾會讓醬汁散掉、肉質變韌；應保持穩定小滾。', '強く沸かすとソースが分離し、肉も硬くなります。静かな煮立ちを保ちます。', '팔팔 끓이면 소스가 분리되고 고기가 질겨집니다. 잔잔한 불을 유지합니다.', 'เดือดแรงทำให้ซอสแตกและเนื้อเหนียว ควรเคี่ยวเบา ๆ อย่างสม่ำเสมอ'),
      ml('Ground seeds or legume flour can settle and catch on the bottom; stir often after adding them and lower the heat.', '磨碎的種子或豆粉容易沉底黏鍋；加入後勤攪拌並降低火力。', '粉末状の種や豆粉は沈んで鍋底に付きやすいので、加えた後はよく混ぜて火を弱めます。', '간 씨앗이나 콩가루는 가라앉아 눌기 쉬우니 넣은 뒤 자주 저으며 불을 낮춥니다.', 'เมล็ดบดหรือแป้งถั่วตกก้นและติดหม้อง่าย หลังใส่ให้คนบ่อยและลดไฟ'),
    ],
    substitutions: [
      ml('Bone-in chicken thighs can replace a whole chicken; keep the pieces similar in size so they finish together.', '可用帶骨雞腿取代全雞；切塊大小接近，才會同時熟透。', '鶏もも肉で丸鶏を代用できます。大きさを揃えると均一に火が通ります。', '통닭 대신 뼈 있는 닭다리살을 써도 됩니다. 크기를 비슷하게 맞추면 함께 익습니다.', 'ใช้สะโพกไก่ติดกระดูกแทนไก่ทั้งตัวได้ หั่นให้ขนาดใกล้กันเพื่อให้สุกพร้อมกัน'),
      ml('A mild leafy green such as spinach or kale can replace local greens; add it only when the stew is nearly ready.', '菠菜或羽衣甘藍等溫和葉菜可替代當地青菜；燉菜快完成時再加。', 'ほうれん草やケールなど穏やかな葉野菜で代用し、煮込みの終盤に加えます。', '시금치나 케일 같은 순한 잎채소로 바꾸고 스튜가 거의 완성될 때 넣습니다.', 'ใช้ผักใบอ่อนรสไม่แรงอย่างผักโขมหรือเคลแทนได้ ใส่เมื่อสตูว์ใกล้เสร็จ'),
    ]
  },
  fry: {
    tips: [
      ml('Use very ripe but still firm plantains: the peel should be mostly black and the flesh sweet, while the cut cubes still hold their corners.', '選熟透但仍結實的大蕉：外皮大多轉黑、果肉甘甜，但切丁後仍能保持稜角。', 'よく熟していてもまだしっかりしたプランテンを使います。皮はほぼ黒く、果肉は甘く、切った角が保てる状態が目安です。', '잘 익었지만 단단함이 남은 플랜틴을 씁니다. 껍질은 대부분 검고 과육은 달지만 자른 모서리는 유지되어야 합니다.', 'เลือกกล้วยแพลนเทนสุกมากแต่ยังแน่น เปลือกเกือบดำ เนื้อหวาน แต่หั่นเต๋าแล้วยังเป็นมุมอยู่'),
      ml('Fry in small batches and let the oil return to temperature between batches so the coating browns instead of steaming.', '分批少量油炸，每批之間等油溫回升，香料外層才會上色而非蒸軟。', '少量ずつ揚げ、毎回油温が戻るのを待つと、蒸れずに衣が色づきます。', '조금씩 튀기고 매번 기름 온도가 회복되도록 기다려야 양념 겉면이 찌지 않고 노릇해집니다.', 'ทอดครั้งละน้อยและรอให้น้ำมันกลับมาร้อนระหว่างรอบ เพื่อให้ผิวเกรียมแทนการนึ่ง'),
    ],
    commonMistakes: [
      ml('Watery spice paste slides off the plantain and makes the oil spit; grind the aromatics thick and pat the fruit dry first.', '香料糊太稀會從大蕉滑落並讓油噴濺；辛香料磨濃稠，果肉先擦乾。', 'スパイスペーストが水っぽいとプランテンから落ちて油が跳ねます。香味野菜は濃く挽き、果肉の水気を拭きます。', '양념장이 묽으면 플랜틴에서 흘러내려 기름이 튑니다. 향신료를 되직하게 갈고 과일 물기를 먼저 닦습니다.', 'เครื่องเทศเหลวเกินจะไหลจากกล้วยและทำให้น้ำมันกระเด็น บดเครื่องเทศให้ข้นและซับกล้วยก่อน'),
      ml('Crowding the pan drops the oil temperature and makes the outside greasy before the cubes caramelize.', '鍋中塞太滿會使油溫下降，外層變油卻還沒焦香。', '鍋に詰め込みすぎると油温が下がり、焼き色が付く前に油っぽくなります。', '팬을 가득 채우면 기름 온도가 내려가 겉이 캐러멜화되기 전에 기름져집니다.', 'ใส่แน่นกระทะทำให้อุณหภูมิน้ำมันลดและชิ้นอาหารอมน้ำมันก่อนจะเกรียมหวาน'),
    ],
    substitutions: [
      ml('If fresh ginger is unavailable, use a small pinch of ground ginger, but the fresh aromatic paste gives the closest flavor.', '沒有新鮮薑時可用少許薑粉，但新鮮辛香料糊風味最接近。', '生しょうががなければ少量の粉末しょうがを使えますが、生の香味ペーストが最も近い風味です。', '생강이 없으면 생강가루를 조금 쓰되 신선한 향신료 페이스트가 가장 비슷한 맛을 냅니다.', 'หากไม่มีขิงสด ใช้ขิงผงเล็กน้อยได้ แต่เครื่องเทศสดบดจะให้รสใกล้เคียงที่สุด'),
      ml('A neutral oil with a high smoke point works well; avoid strongly flavored oils that mask the ginger and pepper.', '使用發煙點高的中性油；避免濃味油脂蓋過薑與辣椒香。', '発煙点の高い中性油が適しています。しょうがや唐辛子の香りを隠す強い風味の油は避けます。', '발연점이 높은 중성 기름이 좋고 생강과 고추 향을 가리는 향 강한 기름은 피합니다.', 'ใช้น้ำมันรสกลางที่ทนความร้อนสูง หลีกเลี่ยงน้ำมันกลิ่นแรงที่กลบขิงและพริก'),
    ]
  },
  fermentedFlatbread: {
    tips: [
      ml('Use a clean, roomy container and mark the batter level before fermenting; a lively batter develops bubbles and a pleasantly tangy aroma.', '使用乾淨且空間足夠的容器，發酵前標記麵糊高度；活躍麵糊會出現氣泡與清爽酸香。', '清潔で余裕のある容器を使い、発酵前に生地の高さを印します。元気な生地は泡が出て心地よい酸味の香りになります。', '깨끗하고 넉넉한 용기를 쓰고 발효 전에 반죽 높이를 표시합니다. 잘 발효되면 기포와 산뜻한 새콤한 향이 납니다.', 'ใช้ภาชนะสะอาดและใหญ่พอ ทำเครื่องหมายระดับแป้งก่อนหมัก แป้งที่หมักดีจะมีฟองและกลิ่นเปรี้ยวหอม'),
      ml('Dilute the fermented batter gradually until it pours in a thin, steady ribbon; a short rest after mixing lets the texture even out.', '發酵完成後分次加水，調至能連續流下的薄稠度；混合後稍歇讓質地均勻。', '発酵後の生地は少しずつ水で薄め、細く安定して流れる濃さにします。混ぜた後少し休ませると質感が整います。', '발효 반죽에 물을 조금씩 넣어 가늘고 일정하게 흐르는 농도로 맞춥니다. 섞은 뒤 잠시 두면 질감이 고르게 됩니다.', 'ค่อย ๆ เติมน้ำหลังหมักจนแป้งไหลเป็นสายบางสม่ำเสมอ พักสั้น ๆ หลังผสมให้เนื้อเนียนขึ้น'),
    ],
    commonMistakes: [
      ml('A pan that is not fully heated produces a dense centre and few characteristic holes; preheat and test one small injera first.', '鍋子不夠熱會讓中心厚實、表面孔洞不足；充分預熱並先試做一張小餅。', '鍋が十分に熱くないと中心が重くなり、特徴的な穴もできません。予熱し、小さな一枚で試します。', '팬이 충분히 달궈지지 않으면 가운데가 묵직하고 구멍이 적습니다. 예열한 뒤 작은 한 장을 먼저 구워 봅니다.', 'กระทะไม่ร้อนพอทำให้กลางหนาและรูตาไม่ขึ้น อุ่นให้ทั่วและลองทำแผ่นเล็กก่อน'),
      ml('Do not seal the container airtight while the batter ferments; trapped gas can build pressure and the culture needs a way to vent.', '發酵容器不可完全密封；氣體會累積壓力，發酵也需要適度排氣。', '発酵中は容器を密閉しません。ガスが圧力となってたまり、適度に逃がす必要があります。', '발효 중 용기를 완전히 밀폐하지 않습니다. 가스가 압력을 만들고 배출될 틈이 필요합니다.', 'อย่าปิดภาชนะหมักสนิท ก๊าซจะสะสมแรงดันและควรมีทางระบาย'),
    ],
    substitutions: [
      ml('A portion of sorghum flour can replace teff for a more accessible home version; flavour and colour will differ from all-teff injera.', '在家較容易取得時，可用部分高粱粉取代 teff；風味和顏色會與純 teff injera 不同。', '家庭で入手しやすいソルガム粉を一部使えますが、全量テフのインジェラとは風味と色が異なります。', '구하기 쉬운 수수 가루를 일부 대체할 수 있지만 테프만 쓴 인제라와 맛과 색은 다릅니다.', 'ใช้แป้งข้าวฟ่างแทนเทฟบางส่วนได้หากหาซื้อง่ายกว่า แต่รสและสีจะแตกต่างจากอินเจราที่ใช้เทฟทั้งหมด'),
      ml('If no ersho starter is available, an established teff sourdough starter can inoculate the batter; allow fermentation to follow its aroma and bubbles.', '沒有 ersho 時可用成熟的 teff 酸種引發發酵；依氣泡與香氣判斷進度。', 'エルショがなければ、育ったテフ種で発酵を始められます。泡と香りを目安に進み具合を見ます。', '에르쇼가 없으면 잘 자리 잡은 테프 사워도우 스타터로 발효를 시작하고 기포와 향으로 진행을 봅니다.', 'หากไม่มีเออร์โช ใช้หัวเชื้อซาวร์โดว์เทฟที่แข็งแรงแทน และดูฟองกับกลิ่นประกอบการหมัก'),
    ]
  },
  grill: {
    tips: [
      ml('Build a two-zone charcoal fire so thick pieces can cook gently before a final direct-heat char.', '炭火分成兩區，讓厚肉先以間接熱慢慢熟，再移到直火上色。', '炭火を二つのゾーンに分け、厚い肉は穏やかに火を通してから最後に直火で焼き色を付けます。', '숯불을 두 구역으로 나눠 두꺼운 고기는 먼저 간접열로 천천히 익히고 마지막에 직화로 색을 냅니다.', 'แบ่งเตาถ่านเป็นสองโซน ให้ชิ้นหนาสุกช้า ๆ ด้วยไฟอ้อมก่อนย้ายมาเกรียมด้วยไฟตรง'),
      ml('Rest the grilled meat before chopping so juices redistribute and the board does not flood.', '烤肉靜置後再切，肉汁才能回流，不會一切就流滿砧板。', '焼いた肉は切る前に休ませます。肉汁が落ち着き、まな板に流れ出しません。', '구운 고기는 자르기 전 휴지해 육즙이 퍼지게 하면 도마에 흥건히 흐르지 않습니다.', 'พักเนื้อย่างก่อนสับเพื่อให้น้ำในเนื้อกระจายตัวและไม่ไหลนองบนเขียง'),
    ],
    commonMistakes: [
      ml('Flames licking the meat burn the outside before a thick cut is safely cooked; move it away from flare-ups and check the centre.', '火焰直接舔肉會讓厚切外焦內未熟；避開火舌並確認中心熟度。', '炎が肉に当たると厚切りは中に火が通る前に焦げます。火の噴き上がりを避け、中心を確認します。', '불꽃이 고기에 닿으면 두꺼운 부위는 속이 익기 전에 겉이 탑니다. 불꽃을 피하고 중심 익힘을 확인합니다.', 'เปลวไฟโดนเนื้อทำให้ด้านนอกไหม้ก่อนชิ้นหนาจะสุกด้านใน เลี่ยงไฟลุกและตรวจส่วนกลาง'),
      ml('Cutting immediately makes the meat dry; rest under loose foil while preparing the relish.', '立刻切肉會流失肉汁；準備沙拉醬時可鬆鬆覆鋁箔靜置。', 'すぐに切ると肉汁が逃げます。薬味を用意する間、ふんわりアルミ箔をかけて休ませます。', '바로 자르면 육즙이 빠집니다. 곁들임을 준비하는 동안 호일을 느슨하게 덮어 둡니다.', 'หั่นทันทีทำให้น้ำเนื้อไหลออก พักโดยคลุมฟอยล์หลวม ๆ ระหว่างเตรียมเครื่องเคียง'),
    ],
    substitutions: [
      ml('Beef short ribs or shoulder can replace goat; choose a cut with some connective tissue for a juicy, grill-friendly result.', '牛小排或肩肉可代替山羊肉；挑選帶些筋膜的部位，烤後較多汁。', 'ヤギ肉の代わりに牛ショートリブや肩肉を使えます。筋のある部位なら焼いてもジューシーです。', '염소고기 대신 소갈비나 어깨살을 써도 됩니다. 결합조직이 조금 있는 부위가 구웠을 때 촉촉합니다.', 'ใช้ซี่โครงหรือไหล่เนื้อแทนแพะได้ เลือกส่วนที่มีพังผืดบ้างเพื่อให้ย่างแล้วฉ่ำ'),
      ml('A grill pan or hot oven broiler can stand in for an outdoor charcoal grill; add smoked paprika only if a hint of smoke is desired.', '沒有戶外炭烤爐時可用烤盤或高溫烤箱上火；若想要煙香，可少量加煙燻紅椒粉。', '屋外の炭火が使えない場合はグリルパンや高温のオーブン上火で代用し、煙香が欲しければ燻製パプリカを少量使います。', '야외 숯불이 없으면 그릴 팬이나 오븐 브로일러를 쓰고, 훈연 향을 원할 때만 훈제 파프리카를 조금 더합니다.', 'ใช้กระทะย่างหรือไฟบนเตาอบร้อนแทนเตาถ่านกลางแจ้งได้ เติมปาปริการมควันเล็กน้อยเฉพาะเมื่อต้องการกลิ่นควัน'),
    ]
  },
  layeredBake: {
    tips: [
      ml('Squeeze soaked bread well before mixing it into the mince; it binds the filling while keeping the baked layer tender.', '麵包浸泡後充分擠乾再拌入絞肉；它能結合內餡並讓烤層柔軟。', '浸したパンはよく絞ってからひき肉に混ぜます。具をまとめ、焼き上がりを柔らかく保ちます。', '불린 빵은 물기를 꼭 짜고 다진 고기에 섞습니다. 속을 결합하면서 구운 층을 부드럽게 해 줍니다.', 'บีบขนมปังที่แช่แล้วให้แห้งก่อนคลุกหมู ช่วยยึดไส้และคงความนุ่มหลังอบ'),
      ml('Pour the egg custard over a level meat surface and bake until the centre is set, not just browned at the edges.', '蛋奶糊倒在平整肉餡上，烤到中心凝固，不只看邊緣上色。', '肉の表面を平らにして卵液を注ぎ、縁だけでなく中心まで固まるよう焼きます。', '고기층을 평평하게 하고 달걀 커스터드를 부어 가장자리뿐 아니라 가운데까지 굳도록 굽습니다.', 'เกลี่ยชั้นเนื้อให้เรียบแล้วเทคัสตาร์ดไข่ อบจนตรงกลางเซ็ต ไม่ใช่ดูแค่ขอบเป็นสีน้ำตาล'),
    ],
    commonMistakes: [
      ml('A wet filling makes the custard slide and the slices collapse; simmer away excess liquid before it goes into the baking dish.', '內餡水分太多會讓蛋奶層滑動、切片塌散；入烤盤前先收乾多餘湯汁。', '具の水分が多いとカスタードが滑り、切り分けたとき崩れます。オーブン皿に入れる前に余分な汁を煮詰めます。', '속의 수분이 많으면 커스터드가 미끄러지고 썰 때 무너집니다. 오븐에 넣기 전에 여분의 국물을 졸입니다.', 'ไส้เปียกเกินทำให้ชั้นไข่เลื่อนและชิ้นแตก เคี่ยวของเหลวส่วนเกินก่อนใส่ถาดอบ'),
      ml('Overbaking turns the egg layer rubbery; remove it once the centre is just set and let residual heat finish the custard.', '烤過頭會讓蛋層變韌；中心剛凝固就取出，利用餘溫完成。', '焼きすぎると卵の層が硬くなります。中心が固まったら取り出し、余熱で仕上げます。', '너무 오래 구우면 달걀층이 질겨집니다. 가운데가 막 굳으면 꺼내 잔열로 마무리합니다.', 'อบนานเกินชั้นไข่จะแข็งเหนียว นำออกเมื่อกลางเพิ่งเซ็ตแล้วให้ความร้อนคงเหลือทำต่อ'),
    ],
    substitutions: [
      ml('Minced lamb can replace beef for a richer Cape Malay variation; drain excess fat before adding the soaked bread.', '牛肉可改用羊絞肉做較濃厚的 Cape Malay 版本；加入麵包前先瀝掉多餘油脂。', 'より濃厚なケープ・マレー風には牛肉の代わりにラムひき肉を使えます。パンを加える前に余分な脂を切ります。', '더 진한 케이프 말레이식으로 소고기 대신 양고기 다짐육을 쓰고 불린 빵을 넣기 전에 기름을 걷습니다.', 'ใช้เนื้อแกะบดแทนวัวเพื่อรสเข้มแบบเคปมาเลย์ได้ สะเด็ดไขมันส่วนเกินก่อนใส่ขนมปัง'),
      ml('If dried apricot is unavailable, chopped sultanas add the familiar sweet fruit note; reduce added sugar to taste.', '沒有杏桃乾時可用切碎葡萄乾補上熟悉的果甜；額外糖量依口味減少。', '干し杏がなければ刻んだサルタナで甘い果実味を補い、砂糖は味を見て減らします。', '말린 살구가 없으면 술타나 건포도를 다져 과일 단맛을 더하고 설탕은 기호에 따라 줄입니다.', 'หากไม่มีแอปริคอตแห้ง ใช้ลูกเกดสุลตานาสับเพิ่มความหวานผลไม้และลดน้ำตาลตามชอบ'),
    ]
  },
  curryBread: {
    tips: [
      ml('Keep the curry thick enough to cling to bread but loose enough to spoon into the hollow loaf; include potato and gravy in each portion.', '咖哩要濃到能附著麵包，又要保留足夠醬汁舀入空心麵包；每份都要有馬鈴薯與醬汁。', 'パンに絡む濃さを保ちながら、くり抜いたパンにすくい入れられるゆるさも残します。各皿にじゃがいもとソースを入れます。', '빵에 묻을 만큼 되직하면서 파낸 빵에 숟가락으로 담을 수 있게 국물도 남깁니다. 감자와 소스를 각 몫에 담습니다.', 'เคี่ยวแกงให้ข้นพอเกาะขนมปังแต่ยังตักลงก้อนได้ ใส่มันฝรั่งและน้ำแกงทุกส่วน'),
      ml('Hollow the loaf close to serving and keep the removed bread as a lid or dipping pieces.', '接近上桌時再挖空麵包，挖出的麵包可當蓋子或沾咖哩吃。', 'パンは出す直前にくり抜き、取り出した中身はふたやディップ用に取っておきます。', '빵은 내기 직전에 속을 파내고 파낸 빵은 뚜껑이나 찍어 먹는 조각으로 둡니다.', 'ควักขนมปังใกล้เวลาเสิร์ฟ เก็บเนื้อขนมปังไว้ปิดฝาหรือจิ้มแกง'),
    ],
    commonMistakes: [
      ml('Filling bread too early lets the loaf soak through before serving; assemble at the last moment.', '太早把咖哩裝進麵包會讓麵包上桌前就泡軟；最後一刻再組裝。', '早く詰めると供する前にパンが汁を吸ってしまいます。出す直前に盛り付けます。', '미리 채우면 내기 전에 빵이 눅눅해집니다. 마지막 순간에 담습니다.', 'ใส่แกงเร็วเกินไปทำให้ขนมปังแฉะก่อนเสิร์ฟ ประกอบตอนท้ายสุด'),
      ml('Too little gravy makes the curry dry and the bread hard to scoop; add warm stock gradually until it is spoonable.', '醬汁太少會讓咖哩乾澀、麵包難舀；逐次加入溫高湯調到可舀取。', '汁が少ないとカレーが乾き、パンですくえません。温かいだしを少しずつ加え、すくえる濃さにします。', '국물이 너무 적으면 카레가 마르고 빵으로 뜨기 어렵습니다. 따뜻한 육수를 조금씩 더해 숟가락으로 뜰 수 있게 합니다.', 'น้ำแกงน้อยเกินทำให้แห้งและตักด้วยขนมปังยาก เติมน้ำสต็อกร้อนทีละน้อยให้ตักได้'),
    ],
    substitutions: [
      ml('A firm white bean curry is a classic meat-free option; keep it thick and season it with the same Durban-style aromatics.', '白豆咖哩是經典無肉選擇；保持濃稠並用同樣的德班辛香料調味。', '白いんげん豆のカレーは定番の肉なし版です。濃さを保ち、同じダーバン風の香味で調えます。', '흰강낭콩 카레는 대표적인 고기 없는 선택지입니다. 되직하게 만들고 같은 더반식 향신료로 간합니다.', 'แกงถั่วขาวเป็นตัวเลือกไร้เนื้อสัตว์ที่นิยม เคี่ยวให้ข้นและปรุงเครื่องเทศสไตล์เดอร์บันเหมือนเดิม'),
      ml('If no unsliced loaf is available, use sturdy crusty rolls and shorten the curry simmer so the filling stays moist.', '買不到整條未切片白麵包時，可用結實硬皮圓麵包，並縮短咖哩收汁時間保持濕潤。', '食パンがなければ、固めの丸パンを使い、具が乾かないようカレーの煮詰め時間を短くします。', '통째 식빵이 없으면 단단한 롤빵을 쓰고 속이 마르지 않게 카레 졸이는 시간을 줄입니다.', 'หากไม่มีขนมปังก้อน ใช้โรลเปลือกแข็งและลดเวลางวดแกงให้ไส้ยังชุ่ม'),
    ]
  },
  pudding: {
    tips: [
      ml('Mix the batter only until smooth after adding flour; a little air in the sponge helps it take up the hot sauce.', '麵粉加入後只拌到滑順；海綿體保留些空氣，才吸得進熱醬汁。', '粉を加えた後は滑らかになるまで混ぜます。スポンジに少し空気を含ませると熱いソースを吸いやすくなります。', '밀가루를 넣은 뒤 매끈해질 때까지만 섞습니다. 스펀지에 공기가 조금 있어야 뜨거운 소스를 잘 흡수합니다.', 'หลังใส่แป้งคนแค่จนเนียน เนื้อสปันจ์ที่มีอากาศเล็กน้อยจะดูดซอสอุ่นได้ดี'),
      ml('Pour the hot butter-cream sauce over the pudding as soon as it comes out of the oven, then allow a short soak before serving.', '布丁出爐後立刻淋上熱奶油醬，再稍微浸潤後上桌。', 'オーブンから出したらすぐ熱いバタークリームソースをかけ、少し吸わせてから供します。', '오븐에서 나오자마자 뜨거운 버터 크림 소스를 붓고 잠시 흡수시킨 뒤 냅니다.', 'ราดซอสครีมเนยร้อนทันทีที่พุดดิ้งออกจากเตา แล้วพักให้ซึมก่อนเสิร์ฟ'),
    ],
    commonMistakes: [
      ml('Overmixing after the flour goes in makes a tight sponge that absorbs sauce poorly; stop once the dry streaks disappear.', '麵粉加入後過度攪拌會使蛋糕緊實、吸汁不佳；乾粉痕跡消失就停。', '粉を加えた後に混ぜすぎると生地が締まり、ソースを吸いにくくなります。粉気が消えたら止めます。', '밀가루를 넣고 너무 섞으면 스펀지가 단단해져 소스를 잘 흡수하지 못합니다. 마른 가루 자국이 사라지면 멈춥니다.', 'คนหลังใส่แป้งมากเกินทำให้เนื้อแน่นและซึมซอสยาก หยุดเมื่อไม่เห็นผงแห้ง'),
      ml('Letting the sauce cool before pouring leaves a puddle on top instead of soaking through the warm crumb.', '醬汁冷掉再淋會留在表面，不易滲入溫熱蛋糕體。', 'ソースが冷めてからかけると温かい生地に染みず、上にたまってしまいます。', '소스가 식은 뒤 부으면 따뜻한 케이크 속에 스며들지 않고 위에 고입니다.', 'ราดซอสที่เย็นแล้วจะไม่ซึมเข้าเนื้ออุ่นแต่จะขังบนผิว'),
    ],
    substitutions: [
      ml('Apricot jam is characteristic; smooth peach jam can substitute if needed, with a slightly milder fruit aroma.', '杏桃果醬最具代表性；必要時可用滑順桃子果醬代替，果香會較溫和。', 'アプリコットジャムが特徴ですが、なければ滑らかな桃ジャムで代用でき、果実の香りは少し穏やかになります。', '살구잼이 전형적이지만 없으면 복숭아잼을 쓸 수 있고 과일 향은 조금 더 부드럽습니다.', 'แยมแอปริคอตเป็นเอกลักษณ์ หากไม่มีใช้แยมพีชเนียนแทนได้ กลิ่นผลไม้จะอ่อนกว่าเล็กน้อย'),
      ml('Serve with custard, pouring cream or vanilla ice cream; choose one cool accompaniment to balance the warm pudding.', '可搭配卡士達、鮮奶油或香草冰淇淋；選一種冷配料平衡溫熱布丁。', 'カスタード、クリーム、バニラアイスのいずれかを添え、温かいプディングと温度を対比させます。', '커스터드, 생크림 또는 바닐라 아이스크림 중 하나를 곁들여 따뜻한 푸딩과 온도를 대비합니다.', 'เสิร์ฟกับคัสตาร์ด ครีมเหลว หรือไอศกรีมวานิลลา เลือกอย่างใดอย่างหนึ่งมาตัดกับพุดดิ้งอุ่น'),
    ]
  }
};

export const cookedStorage = ml(
  'Cool promptly and refrigerate within 2 hours at 0–4°C; use within 3 days and reheat until steaming throughout.',
  '盡快放涼，2 小時內以 0–4°C 冷藏；3 天內食用，回熱至全份冒熱氣。',
  '速やかに冷まし、2時間以内に0–4°Cで冷蔵します。3日以内に食べ、全体が湯気立つまで再加熱します。',
  '빠르게 식혀 2시간 안에 0–4°C로 냉장하세요. 3일 안에 먹고 전체에서 김이 날 때까지 재가열합니다.',
  'ทำให้เย็นเร็วและแช่ที่ 0–4°C ภายใน 2 ชั่วโมง กินภายใน 3 วันและอุ่นให้ร้อนมีไอทั่วถึง'
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

export function makeAfricanRecipe(recipe) {
  const { profile = 'stew', additionalSources = [], ...data } = recipe;
  const defaults = practical[profile] || practical.stew;
  return {
    cuisine: 'african',
    region: ml('Africa (see the dish-specific region below)', '非洲（詳見各道料理標示的具體地區）', 'アフリカ（各料理の地域欄に詳細を記載）', '아프리카(각 요리의 지역 항목에 세부 지역 표기)', 'แอฟริกา (ดูภูมิภาคเฉพาะของแต่ละเมนู)'),
    sources: [...(africanRecipeSources[recipe.id] || []), ...additionalSources],
    tips: data.tips || defaults.tips,
    commonMistakes: data.commonMistakes || defaults.commonMistakes,
    substitutions: data.substitutions || defaults.substitutions,
    ...data
  };
}
