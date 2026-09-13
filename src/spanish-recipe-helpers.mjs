import { spanishRecipeSources } from './spanish-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const profiles = {
  rice: {
    tips: [
      ml('Use a wide, shallow pan so the rice cooks in a thin layer and liquid can reduce evenly.', '使用寬而淺的鍋，讓米平鋪成薄層，湯汁才能均勻收乾。', '米を薄く広げられる広く浅い鍋を使うと、液体が均一に減って炊き上がります。', '쌀이 얇게 퍼지도록 넓고 얕은 팬을 쓰면 국물이 고르게 줄어듭니다.', 'ใช้กระทะกว้างตื้นเพื่อให้ข้าวเป็นชั้นบางและน้ำงวดสม่ำเสมอ'),
      ml('Once the rice is distributed, avoid repeated stirring; judge doneness from grain texture and remaining liquid.', '米鋪平後不要反覆攪拌；以米粒口感與剩餘湯汁判斷熟度。', '米を広げた後は何度も混ぜず、粒の食感と残った水分で火の通りを判断します。', '쌀을 펼친 뒤에는 계속 젓지 말고 쌀알 식감과 남은 국물로 익힘을 판단하세요.', 'เมื่อกระจายข้าวแล้วอย่าคนซ้ำ ๆ ให้ดูความสุกจากเนื้อข้าวและน้ำที่เหลือ')
    ],
    commonMistakes: [
      ml('Adding rice before the broth is properly seasoned leaves the finished dish flat because the grains absorb that liquid.', '高湯尚未調味完成就下米，米粒吸收後整體味道會偏淡。', 'だしの味を整える前に米を入れると、その液を吸うため仕上がりがぼやけます。', '육수 간을 맞추기 전에 쌀을 넣으면 쌀이 그 국물을 흡수해 완성 맛이 밋밋해집니다.', 'ใส่ข้าวก่อนปรุงน้ำให้ได้รสจะทำให้ข้าวดูดรสที่จืดและจานสุดท้ายอ่อน'),
      ml('Too much liquid or a pan that is too deep steams the rice and prevents the dry, separate texture expected from Spanish rice dishes.', '液體過多或鍋太深會把米蒸得濕軟，失去西班牙米料理應有的乾爽分明口感。', '水分が多すぎたり鍋が深すぎたりすると蒸し飯のようになり、スペイン米料理らしい粒立ちが失われます。', '물이 너무 많거나 팬이 깊으면 쌀이 찌듯 익어 스페인식 쌀 요리의 고슬한 식감이 사라집니다.', 'น้ำมากหรือกระทะลึกเกินไปทำให้ข้าวนึ่งและเสียสัมผัสแห้งร่วนแบบข้าวสเปน')
    ],
    substitutions: [
      ml('If Spanish short-grain rice is unavailable, use another short- or medium-grain rice with strong liquid absorption; avoid long-grain aromatic rice.', '買不到西班牙短米時，可用吸水力強的其他短粒或中粒米；不要改用長粒香米。', 'スペインの短粒米がなければ吸水性の高い短粒〜中粒米で代用し、長粒の香り米は避けます。', '스페인 단립종이 없으면 흡수력이 좋은 단립·중립종을 쓰고 장립 향미는 피하세요.', 'ถ้าไม่มีข้าวเมล็ดสั้นสเปน ใช้ข้าวเมล็ดสั้นหรือกลางที่ดูดน้ำดี และเลี่ยงข้าวหอมเมล็ดยาว'),
      ml('Use unsalted stock only when the recipe allows it, then adjust salt before the rice goes in so the liquid tastes correctly seasoned.', '食譜允許時可用無鹽高湯替代水，但要在下米前把鹹度調到正確。', 'レシピ上問題なければ無塩だしに替えられますが、米を入れる前に塩味を整えます。', '레시피가 허용하면 무염 육수를 쓸 수 있지만 쌀을 넣기 전에 간을 정확히 맞추세요.', 'ใช้สต๊อกไม่เค็มแทนน้ำได้เมื่อสูตรเหมาะสม แล้วปรุงเกลือให้พอดีก่อนใส่ข้าว')
    ]
  },
  egg: {
    tips: [
      ml('Cook potatoes gently so they become tender without forming a hard fried crust; that softness binds naturally with the egg.', '馬鈴薯要溫和煮軟，不要炸出硬殼；柔軟質地才能自然和蛋液結合。', 'じゃがいもは硬い揚げ衣を作らず、やさしく火を入れて柔らかくすると卵となじみます。', '감자는 단단한 튀김 껍질이 생기지 않게 부드럽게 익혀야 달걀과 자연스럽게 어우러집니다.', 'ปรุงมันฝรั่งไฟอ่อนให้นุ่มโดยไม่เกิดเปลือกทอดแข็ง จะจับกับไข่ได้ดี'),
      ml('Use a plate wider than the pan for turning and keep the movement decisive so the tortilla stays intact.', '翻面時使用比平底鍋更寬的盤子，動作要乾脆，蛋餅才不易裂開。', '返すときはフライパンより大きい皿を使い、迷わず一度に返すと形を保ちやすくなります。', '뒤집을 때 팬보다 큰 접시를 쓰고 한 번에 확실히 움직여야 또르띠야가 무너지지 않습니다.', 'ใช้จานกว้างกว่ากระทะตอนกลับด้านและพลิกให้มั่นใจเพื่อไม่ให้ตอร์ติญาแตก')
    ],
    commonMistakes: [
      ml('High heat browns the outside before the potato and egg matrix has set; keep the pan at low to medium-low heat.', '火太大會讓外層先焦而內部尚未凝固；全程維持小火到中小火。', '強火では中が固まる前に外側だけ色づくため、弱火〜中弱火を保ちます。', '센 불은 속이 굳기 전에 겉을 갈색으로 만들므로 약불에서 중약불을 유지하세요.', 'ไฟแรงทำให้ด้านนอกเข้มก่อนเนื้อไข่กับมันฝรั่งเซ็ต ควรใช้ไฟอ่อนถึงกลางอ่อน'),
      ml('Do not leave excess frying oil in the potatoes; drain thoroughly before mixing with eggs or the tortilla becomes greasy and loose.', '馬鈴薯與蛋混合前要充分瀝油，殘油太多會讓成品油膩且鬆散。', '卵と合わせる前に油をよく切ります。油が多いと重く、まとまりにくくなります。', '감자를 달걀과 섞기 전에 기름을 충분히 빼야 기름지고 흐트러지는 것을 막을 수 있습니다.', 'สะเด็ดน้ำมันจากมันฝรั่งให้ดีก่อนผสมไข่ ไม่เช่นนั้นตอร์ติญาจะมันและหลวม')
    ],
    substitutions: [
      ml('Use another waxy or all-purpose potato that holds shape after gentle frying; very floury potatoes can collapse too quickly.', '可改用慢煮後仍能保持形狀的蠟質或通用型馬鈴薯；粉質太高容易過早碎掉。', 'やさしく加熱しても形を保つ粘質系または万能種のじゃがいもを使えます。粉質が強いものは崩れやすいです。', '부드럽게 익혀도 모양이 남는 점질·다목적 감자를 쓰세요. 너무 분질인 감자는 빨리 부서집니다.', 'ใช้มันฝรั่งเนื้อแน่นหรืออเนกประสงค์ที่ยังคงรูปเมื่อทอดอ่อน ๆ มันแป้งจัดอาจเละเร็ว'),
      ml('Onion is traditional in many versions but contested; it can be omitted without changing the egg-to-potato technique.', '許多傳統版本會加洋蔥，但也有不加派；可省略，蛋與馬鈴薯的核心技法不變。', '玉ねぎを入れる伝統的な作り方は多い一方、入れない流派もあります。省いても卵とじゃがいもの基本技法は変わりません。', '양파를 넣는 전통 버전이 많지만 빼는 방식도 있습니다. 생략해도 달걀과 감자 조리법은 같습니다.', 'หลายสูตรดั้งเดิมใส่หัวหอมแต่ก็มีแบบไม่ใส่ จึงตัดออกได้โดยเทคนิคไข่กับมันฝรั่งไม่เปลี่ยน')
    ]
  },
  chilled: {
    tips: [
      ml('Use fully ripe tomatoes; because the soup is uncooked, weak tomatoes cannot be corrected by long simmering.', '一定要用完全成熟的番茄；冷湯不經熬煮，番茄風味不足無法靠長時間加熱補救。', '加熱しないスープなので、十分に熟したトマトを使います。風味の弱さを煮込みで補えません。', '익히지 않는 수프이므로 완전히 익은 토마토를 써야 하며 약한 맛을 오래 끓여 보완할 수 없습니다.', 'ใช้มะเขือเทศสุกเต็มที่ เพราะซุปไม่ผ่านการต้มและแก้รสจางด้วยการเคี่ยวไม่ได้'),
      ml('Chill before final seasoning; acidity and salt perception change when the soup is cold.', '最後調味前先充分冰鎮；溫度降低後，酸味與鹹味感受會改變。', '冷えると酸味と塩味の感じ方が変わるため、十分に冷やしてから最終調味します。', '차가워지면 산미와 짠맛 인지가 달라지므로 충분히 식힌 뒤 마지막 간을 보세요.', 'แช่เย็นก่อนปรุงรสสุดท้าย เพราะความเปรี้ยวและเค็มรับรู้ต่างกันเมื่อซุปเย็น')
    ],
    commonMistakes: [
      ml('Adding all the oil at once can leave a greasy layer; blend it in gradually when the recipe relies on emulsification.', '需要乳化的冷湯不要一次倒入全部油脂，應逐步加入，否則容易浮出油層。', '乳化させるレシピでは油を一度に入れず、少しずつ加えないと油が分離しやすくなります。', '유화가 필요한 수프는 기름을 한꺼번에 넣지 말고 조금씩 넣어야 기름층이 분리되지 않습니다.', 'ซุปที่ต้องอิมัลชันควรค่อย ๆ ใส่น้ำมัน ไม่เททั้งหมดครั้งเดียวเพราะจะแยกชั้นมัน'),
      ml('Too much raw garlic overwhelms chilled soup because its sharpness is not softened by cooking.', '生蒜過多會壓過冷湯其他味道，因為沒有加熱去柔化辛辣感。', '生にんにくは加熱で辛味が和らがないため、入れすぎると冷製スープを支配します。', '생마늘은 익혀 순해지지 않으므로 너무 많이 넣으면 차가운 수프 맛을 압도합니다.', 'กระเทียมดิบมากเกินไปจะกลบรสซุปเย็น เพราะไม่มีความร้อนช่วยลดความฉุน')
    ],
    substitutions: [
      ml('Use a mild wine vinegar when Sherry vinegar is unavailable, adding it gradually because acidity differs by brand.', '買不到雪莉醋時可用溫和葡萄酒醋，因品牌酸度不同要分次加入。', 'シェリービネガーがなければ穏やかなワインビネガーを使い、酸度が違うため少しずつ加えます。', '셰리 식초가 없으면 순한 와인 식초를 조금씩 넣으세요. 제품마다 산도가 다릅니다.', 'ถ้าไม่มีเชอร์รี่วินีการ์ ใช้น้ำส้มสายชูไวน์รสอ่อนและค่อย ๆ เติมเพราะความเปรี้ยวต่างกัน'),
      ml('Day-old white bread can replace rustic country bread; trim very hard crust if it will not blend smooth.', '鄉村白麵包可改用隔夜白麵包；若外殼太硬、難打細可先切除。', '田舎パンの代わりに一日置いた白パンを使えます。硬い耳が滑らかにならない場合は取り除きます。', '시골빵 대신 하루 지난 흰빵을 쓸 수 있고 너무 단단한 껍질은 잘 갈리지 않으면 제거하세요.', 'ใช้ขนมปังขาวค้างคืนแทนขนมปังชนบทได้ ตัดเปลือกแข็งมากออกถ้าปั่นไม่เนียน')
    ]
  },
  fried: {
    tips: [
      ml('Fry in small batches and let the oil return to the stated temperature between batches.', '少量分批油炸，每批之間讓油溫回到食譜指定溫度。', '少量ずつ揚げ、次の回の前に油温を指定温度まで戻します。', '적은 양씩 튀기고 다음 배치 전에 기름 온도를 지정 온도로 회복시키세요.', 'ทอดทีละน้อยและรอให้น้ำมันกลับสู่อุณหภูมิที่กำหนดก่อนรอบถัดไป'),
      ml('Drain fried food in one layer so escaping steam does not soften the crust.', '炸好後單層瀝油，避免堆疊造成蒸氣回軟外皮。', '揚げ物は重ねず一層で油を切り、蒸気で衣が柔らかくならないようにします。', '튀긴 음식은 겹치지 말고 한 겹으로 기름을 빼 수증기로 눅눅해지지 않게 하세요.', 'สะเด็ดของทอดเป็นชั้นเดียวเพื่อไม่ให้ไอน้ำทำให้ผิวนิ่ม')
    ],
    commonMistakes: [
      ml('Oil that is too cool makes food greasy; oil that is too hot darkens the exterior before the centre is ready.', '油溫太低會吸油，太高則外層先焦而中心尚未完成。', '油温が低すぎると油っぽくなり、高すぎると中が整う前に外側だけ濃く色づきます。', '기름이 너무 차가우면 기름지고 너무 뜨거우면 속이 준비되기 전에 겉만 진하게 탑니다.', 'น้ำมันเย็นเกินไปทำให้อมน้ำมัน ร้อนเกินไปทำให้ผิวนอกเข้มก่อนตรงกลางพร้อม'),
      ml('Do not crowd the fryer; the sudden temperature drop prevents crisp browning.', '不要把炸鍋塞滿；油溫突然下降會妨礙酥脆上色。', '一度に詰め込みすぎると油温が急に下がり、カリッと色づきません。', '튀김 냄비를 빽빽하게 채우면 온도가 급격히 떨어져 바삭하게 갈색 나지 않습니다.', 'อย่าใส่ของทอดแน่นหม้อ เพราะอุณหภูมิลดฮวบและผิวไม่กรอบ')
    ],
    substitutions: [
      ml('Use another neutral high-heat frying oil if olive oil is impractical, keeping the same temperature targets.', '若不方便使用橄欖油，可換耐高溫中性油，但維持相同油溫目標。', 'オリーブ油が使いにくい場合は高温向けの中性油に替え、温度目標は同じにします。', '올리브유 사용이 어렵다면 고온용 중성유로 바꾸되 같은 온도 기준을 유지하세요.', 'ถ้าใช้น้ำมันมะกอกไม่สะดวก เปลี่ยนเป็นน้ำมันเป็นกลางทนความร้อนสูงโดยคงอุณหภูมิเดิม'),
      ml('When replacing cured Spanish ham, choose another dry-cured ham and reduce added salt until the filling has been tasted.', '替換西班牙風乾火腿時選其他乾式熟成火腿，並在試過餡料前減少額外加鹽。', 'スペインの生ハムを替えるなら別の乾燥熟成ハムを使い、具を味見するまで追加の塩は控えます。', '스페인 건조 숙성 햄 대신 다른 건조 숙성 햄을 쓰고 속을 맛보기 전까지 추가 소금은 줄이세요.', 'ถ้าเปลี่ยนแฮมสเปน ให้ใช้แฮมบ่มแห้งชนิดอื่นและลดเกลือเพิ่มจนชิมไส้แล้ว')
    ]
  },
  seafood: {
    tips: [
      ml('Dry seafood thoroughly before it reaches hot oil so it sears instead of steaming and splattering.', '海鮮下熱油前徹底擦乾，才能煎香而不是出水蒸煮並大量噴油。', '魚介は熱い油に入れる前にしっかり水気を拭き、蒸し煮や油はねを防いで焼き付けます。', '해산물은 뜨거운 기름에 넣기 전 충분히 말려 찌듯 익거나 기름이 튀지 않고 구워지게 하세요.', 'ซับอาหารทะเลให้แห้งก่อนลงน้ำมันร้อน เพื่อให้จี่แทนนึ่งและลดน้ำมันกระเด็น'),
      ml('Stop cooking as soon as the seafood reaches its doneness cue; carryover heat continues after the pan leaves the burner.', '海鮮達到熟度線索就停火；鍋子離火後餘熱仍會繼續加熱。', '魚介は指定の火の通りに達したら止めます。火から外しても余熱で加熱が続きます。', '해산물이 익힘 기준에 도달하면 바로 불을 끄세요. 팬을 내려도 잔열로 계속 익습니다.', 'หยุดปรุงทันทีเมื่ออาหารทะเลถึงจุดสุก เพราะความร้อนคงค้างยังทำให้สุกต่อหลังยกจากไฟ')
    ],
    commonMistakes: [
      ml('Burnt garlic turns the oil bitter; lower the heat as soon as the slices begin to colour.', '大蒜焦掉會讓油變苦；蒜片一開始上色就要立刻降火。', 'にんにくを焦がすと油が苦くなるため、色づき始めたらすぐ火を弱めます。', '마늘이 타면 기름이 써지므로 색이 나기 시작하면 바로 불을 낮추세요.', 'กระเทียมไหม้ทำให้น้ำมันขม จึงลดไฟทันทีเมื่อเริ่มมีสี'),
      ml('Overcooked prawns curl tightly and become rubbery; cook only until opaque and just firm.', '蝦煮過頭會緊縮成圈並變韌；只煮到不透明且剛有彈性。', 'エビは加熱しすぎると強く丸まり硬くなるので、不透明で弾力が出たところで止めます。', '새우를 너무 익히면 세게 말리고 질겨지므로 불투명하고 막 탄력이 생길 때까지만 익히세요.', 'กุ้งสุกเกินจะงอแน่นและเหนียว ปรุงเพียงจนทึบและเด้งพอดี')
    ],
    substitutions: [
      ml('Use similarly sized raw prawns or shrimp so the cooking time remains predictable.', '可換尺寸相近的生蝦，讓烹調時間維持可預測。', '同じくらいの大きさの生エビなら、加熱時間を合わせやすくなります。', '비슷한 크기의 생새우를 써야 조리 시간을 예측하기 쉽습니다.', 'ใช้กุ้งดิบขนาดใกล้เคียงเพื่อให้เวลาปรุงคาดเดาได้'),
      ml('Use another mild dried chilli when cayenne is unavailable, adjusting the amount to its heat.', '買不到卡宴辣椒時可用其他溫和乾辣椒，依辣度調整份量。', 'カイエンがなければ別の穏やかな乾燥唐辛子を使い、辛さに応じて量を調整します。', '카이엔이 없으면 다른 순한 건고추를 쓰고 매운 정도에 맞춰 양을 조절하세요.', 'ถ้าไม่มีพริกคาเยน ใช้พริกแห้งรสอ่อนชนิดอื่นและปรับปริมาณตามความเผ็ด')
    ]
  },
  bread: {
    tips: [
      ml('Use very ripe tomatoes and sturdy bread; with so few ingredients, quality and texture are the whole dish.', '使用完全成熟的番茄與結實麵包；材料很少，原料品質與口感就是整道料理。', '材料が少ない料理なので、完熟トマトとしっかりしたパンを使い、素材と食感を大切にします。', '재료가 적은 음식이므로 완숙 토마토와 탄탄한 빵을 써야 재료 품질과 식감이 살아납니다.', 'ใช้มะเขือเทศสุกจัดและขนมปังเนื้อแน่น เพราะมีวัตถุดิบน้อย คุณภาพและสัมผัสจึงเป็นหัวใจ'),
      ml('Top the toast immediately before serving so tomato juice flavours the bread without making it soggy.', '上桌前才把番茄放上吐司，讓汁液入味但不把麵包泡軟。', '供する直前にトマトをのせ、汁をなじませつつパンがふやけないようにします。', '내기 직전에 토마토를 올려 즙 맛은 배게 하되 빵이 눅눅해지지 않게 하세요.', 'ใส่มะเขือเทศบนขนมปังก่อนเสิร์ฟทันที ให้น้ำซึมรสแต่ไม่ทำให้ขนมปังแฉะ')
    ],
    commonMistakes: [
      ml('Pale, soft toast cannot support the tomato; toast until the cut surface is dry and distinctly golden.', '麵包若只烤到蒼白柔軟撐不住番茄；切面要烤乾並明顯金黃。', '白く柔らかいままではトマトを支えられないため、切り口が乾いてはっきり金色になるまで焼きます。', '빵이 창백하고 부드러우면 토마토를 받치지 못하므로 자른 면이 마르고 뚜렷한 금빛이 날 때까지 구우세요.', 'ขนมปังที่ยังซีดนุ่มรับมะเขือเทศไม่ไหว ต้องปิ้งจนหน้าตัดแห้งและทองชัด'),
      ml('Too much raw garlic dominates the tomato; rub the toasted surface lightly and taste before adding more.', '生蒜太多會蓋過番茄；在烤面輕擦即可，試味後再決定是否增加。', '生にんにくを強くこすりすぎるとトマトを消すので、軽くこすって味を見てから足します。', '생마늘이 많으면 토마토 맛을 덮으므로 구운 면에 가볍게 문지르고 맛본 뒤 더하세요.', 'กระเทียมดิบมากเกินจะกลบมะเขือเทศ ให้ถูเบา ๆ แล้วชิมก่อนเพิ่ม')
    ],
    substitutions: [
      ml('Use another rustic, open-crumb bread that can toast firmly if Catalan country bread is unavailable.', '買不到加泰隆尼亞鄉村麵包時，可用其他能烤得結實、孔洞較大的鄉村麵包。', 'カタルーニャの田舎パンがなければ、しっかり焼ける気泡のある素朴なパンで代用できます。', '카탈루냐 시골빵이 없으면 단단하게 구워지는 기공 있는 러스틱 빵으로 바꿀 수 있습니다.', 'ถ้าไม่มีขนมปังชนบทคาตาลัน ใช้ขนมปังชนบทเนื้อโปร่งที่ปิ้งให้แข็งได้'),
      ml('Any flavourful extra-virgin olive oil can replace a Spanish oil; avoid neutral refined oil in this uncooked finish.', '可用任何風味佳的特級初榨橄欖油替代西班牙產油；這道生食收尾不要用無味精製油。', 'スペイン産でなくても風味のよいエクストラバージン油を使えます。仕上げには無味の精製油を避けます。', '스페인산이 아니어도 풍미 좋은 엑스트라 버진 올리브유를 쓰고 무향 정제유는 피하세요.', 'ใช้น้ำมันมะกอกเอ็กซ์ตร้าเวอร์จินรสดีจากที่อื่นได้ แต่เลี่ยงน้ำมันกลั่นรสกลางสำหรับราดดิบ')
    ]
  },
  noodlePan: {
    tips: [
      ml('Use a wide shallow pan so the noodles cook in a thin layer and the stock reduces evenly.', '使用寬淺鍋，讓麵條平鋪成薄層，湯汁才能均勻收乾。', '麺を薄く広げられる広く浅い鍋を使い、だしを均一に煮詰めます。', '면이 얇게 퍼지는 넓고 얕은 팬을 써야 육수가 고르게 줄어듭니다.', 'ใช้กระทะกว้างตื้นให้เส้นเป็นชั้นบางและน้ำสต๊อกงวดสม่ำเสมอ'),
      ml('Taste the stock before adding the noodles; once they absorb it, seasoning is difficult to correct evenly.', '下麵前先試高湯味道；麵條吸收後就很難再均勻修正調味。', '麺を入れる前にだしを味見します。吸収された後では均一な味の修正が難しくなります。', '면을 넣기 전에 육수 간을 보세요. 흡수된 뒤에는 고르게 간을 고치기 어렵습니다.', 'ชิมสต๊อกก่อนใส่เส้น เพราะเมื่อเส้นดูดแล้วจะแก้รสให้ทั่วได้ยาก')
    ],
    commonMistakes: [
      ml('Repeated stirring releases starch and breaks seafood; level the noodles once and then leave the pan mostly undisturbed.', '反覆攪拌會釋放過多澱粉並弄碎海鮮；麵條鋪平一次後就盡量不要再翻動。', '何度も混ぜるとでんぷんが出て魚介も崩れるため、一度麺をならしたら基本的に触りません。', '계속 저으면 전분이 많이 나오고 해산물이 부서지므로 면을 한 번 고르게 편 뒤 거의 건드리지 마세요.', 'การคนซ้ำทำให้แป้งออกและอาหารทะเลแตก เกลี่ยเส้นครั้งเดียวแล้วแทบไม่ต้องคน'),
      ml('Too much stock leaves fideuà soupy; add only enough for the noodles to become tender as the pan approaches dry.', '高湯太多會讓 fideuà 變成湯麵；只加入足以讓麵熟且最後接近收乾的份量。', 'だしが多すぎると汁麺になるため、麺が柔らかくなる頃に鍋がほぼ乾く量にします。', '육수가 너무 많으면 국물 면이 되므로 면이 익을 때 팬이 거의 마를 정도만 넣으세요.', 'สต๊อกมากไปทำให้ฟิเดอัวเป็นน้ำ ใส่เพียงพอให้เส้นนุ่มตอนกระทะเกือบแห้ง')
    ],
    substitutions: [
      ml('If fideuà noodles are unavailable, use short thin fideos or break thin spaghetti into 3–4 cm lengths.', '買不到 fideuà 專用麵時，可用短細 fideos，或把細義大利麵折成 3–4 公分。', 'フィデウア用麺がなければ短い細麺を使うか、細いスパゲッティを3〜4cmに折ります。', '피데우아 면이 없으면 짧고 가는 피데오를 쓰거나 가는 스파게티를 3–4cm로 부러뜨리세요.', 'ถ้าไม่มีเส้นฟิเดอัว ใช้ฟิเดโอเส้นสั้นบาง หรือหักสปาเกตตีเส้นเล็กยาว 3–4 ซม.'),
      ml('Use a clean unsalted fish stock if homemade stock is unavailable; avoid strongly flavoured shellfish concentrates that mask saffron and fish.', '沒有自製魚高湯時可用乾淨的無鹽魚高湯；避免味道過強的濃縮海鮮湯蓋過番紅花與魚味。', '自家製がなければ癖のない無塩の魚だしを使い、サフランや魚を消す強い甲殻類濃縮だしは避けます。', '집에서 만든 육수가 없으면 깔끔한 무염 생선 육수를 쓰고 사프란과 생선 맛을 덮는 강한 갑각류 농축액은 피하세요.', 'ถ้าไม่มีสต๊อกทำเอง ใช้สต๊อกปลาไม่เค็มรสสะอาด เลี่ยงหัวเชื้อทะเลรสแรงที่กลบหญ้าฝรั่นและปลา')
    ]
  },
  slowStew: {
    tips: [
      ml('Keep the pot at a lazy simmer rather than a hard boil so beans, meat and vegetables stay intact while the broth develops.', '維持緩慢小滾而不是劇烈沸騰，讓豆類、肉與蔬菜保持完整，同時慢慢建立湯味。', '激しく沸騰させず穏やかな弱い煮立ちを保ち、豆、肉、野菜を崩さずにだしを作ります。', '세게 끓이지 말고 잔잔하게 끓여 콩, 고기, 채소 형태를 유지하며 국물 맛을 냅니다.', 'รักษาเดือดอ่อน ไม่เดือดพล่าน เพื่อให้ถั่ว เนื้อ และผักคงรูปพร้อมให้น้ำซุปพัฒนารส'),
      ml('Add ingredients according to how long they need: long-cooking meats and legumes first, tender vegetables and sausages later.', '依所需熟成時間分批加入：長時間肉類與豆類先下，易熟蔬菜與香腸後下。', '火の通りに応じ、時間のかかる肉や豆を先に、柔らかい野菜やソーセージを後から加えます。', '익는 시간에 따라 오래 익힐 고기와 콩을 먼저, 부드러운 채소와 소시지는 나중에 넣으세요.', 'ใส่วัตถุดิบตามเวลาสุก เนื้อและถั่วที่ใช้เวลานานก่อน ผักนุ่มและไส้กรอกทีหลัง')
    ],
    commonMistakes: [
      ml('Salting heavily before cured meats have seasoned the broth can make the finished stew too salty; adjust near the end.', '風乾肉尚未把鹹味釋入湯中前就重鹹調味，最後容易過鹹；接近完成時再校正。', '塩蔵肉の塩味がだしに出る前に強く塩をすると仕上がりが塩辛くなるため、終盤で調整します。', '절인 고기에서 짠맛이 국물에 나오기 전에 소금을 많이 넣으면 완성 스튜가 짜지므로 후반에 조절하세요.', 'ใส่เกลือหนักก่อนเนื้อบ่มปล่อยรสเค็มจะทำให้สตูว์เค็มเกิน ค่อยปรับช่วงท้าย'),
      ml('Stirring delicate beans aggressively breaks their skins and muddies the broth; move the pot gently instead.', '大力攪拌柔嫩豆子會破皮並讓湯混濁；改成輕晃鍋子。', '柔らかい豆を強く混ぜると皮が破れ汁が濁るので、鍋をやさしく揺すります。', '부드러운 콩을 세게 저으면 껍질이 터지고 국물이 탁해지므로 냄비를 살짝 흔드세요.', 'คนถั่วนุ่มแรง ๆ ทำให้เปลือกแตกและน้ำขุ่น ให้โยกหม้อเบา ๆ แทน')
    ],
    substitutions: [
      ml('For regional beans that are unavailable, choose a similarly large, thin-skinned dried white bean and soak it fully before cooking.', '買不到地區特有豆時，選尺寸相近、皮薄的大型乾白豆並充分浸泡。', '地域の豆がなければ、同程度に大粒で皮の薄い乾燥白いんげんを十分浸水して使います。', '지역 콩이 없으면 비슷하게 크고 껍질 얇은 말린 흰콩을 충분히 불려 쓰세요.', 'ถ้าไม่มีถั่วท้องถิ่น ใช้ถั่วขาวแห้งเม็ดใหญ่เปลือกบางใกล้เคียงและแช่ให้เต็มที่'),
      ml('When replacing a cured meat or sausage, match both smoke level and saltiness, then season the broth only after tasting.', '替換風乾肉或香腸時，要同時匹配煙燻程度與鹹度，並在試湯後才加鹽。', '塩蔵肉やソーセージを替えるときは燻香と塩分の両方を近づけ、だしを味見してから塩を足します。', '절인 고기나 소시지를 바꿀 때는 훈연도와 염도를 함께 맞추고 국물을 맛본 뒤 간하세요.', 'เมื่อเปลี่ยนเนื้อบ่มหรือไส้กรอก ให้ใกล้เคียงทั้งกลิ่นรมควันและความเค็ม แล้วชิมน้ำก่อนปรุงเกลือ')
    ]
  },
  boiledSeafood: {
    tips: [
      ml('Keep the cooking water at a steady simmer after the seafood goes in; a violent boil can damage delicate skin before the centre is tender.', '海鮮下鍋後維持穩定小滾；猛烈沸騰會在中心變嫩前先破壞外皮。', '魚介を入れた後は穏やかな煮立ちを保ち、激しい沸騰で中が柔らかくなる前に皮を傷めないようにします。', '해산물을 넣은 뒤 일정한 약한 끓음을 유지하세요. 세게 끓이면 속이 부드러워지기 전에 껍질이 손상됩니다.', 'หลังใส่อาหารทะเลให้เดือดอ่อนคงที่ การเดือดแรงอาจทำลายผิวก่อนตรงกลางนุ่ม'),
      ml('Judge tenderness at the thickest part rather than by time alone; size and prior freezing change cooking time.', '以最厚部位的嫩度判斷，不只看時間；尺寸與是否曾冷凍都會改變烹調時間。', '時間だけでなく最も厚い部分の柔らかさで判断します。大きさや冷凍歴で加熱時間は変わります。', '시간만 보지 말고 가장 두꺼운 부분의 부드러움으로 판단하세요. 크기와 냉동 여부에 따라 시간이 달라집니다.', 'ตัดสินความนุ่มที่ส่วนหนาสุด ไม่ดูเวลาอย่างเดียว เพราะขนาดและการแช่แข็งเปลี่ยนเวลาสุก')
    ],
    commonMistakes: [
      ml('Slicing before the seafood has drained briefly makes the plate watery and dilutes paprika and olive oil.', '海鮮尚未稍微瀝乾就切，盤中會積水並稀釋紅椒粉與橄欖油。', '水気を少し切る前に切ると皿が水っぽくなり、パプリカとオリーブ油が薄まります。', '잠깐 물기를 빼기 전에 자르면 접시에 물이 생겨 파프리카와 올리브유 맛이 묽어집니다.', 'หั่นก่อนสะเด็ดสักครู่ทำให้จานมีน้ำและเจือจางปาปริกากับน้ำมันมะกอก'),
      ml('Do not keep tender seafood simmering while other components finish; remove it promptly and use the cooking liquid separately if needed.', '海鮮已嫩時不要為等其他配料而繼續煮；應立即取出，需要時另用煮汁處理其他材料。', '魚介が柔らかくなったら他の具を待って煮続けず、すぐ取り出し、必要なら煮汁を別に使います。', '해산물이 부드러워졌는데 다른 재료를 기다리며 계속 끓이지 말고 바로 꺼내고 필요하면 삶은 물을 따로 쓰세요.', 'เมื่ออาหารทะเลนุ่มแล้วอย่าต้มต่อเพื่อรออย่างอื่น ให้ยกออกทันทีและใช้น้ำต้มแยกตามจำเป็น')
    ],
    substitutions: [
      ml('Previously frozen octopus is suitable and often more tender because freezing helps break down the muscle structure.', '曾冷凍的章魚很適合使用，而且冷凍有助破壞肌肉結構，常更容易煮嫩。', '冷凍履歴のあるタコも適し、凍結で筋肉組織が弱くなるため柔らかくなりやすいです。', '냉동했던 문어도 적합하며 냉동이 근육 조직을 약하게 해 더 부드럽게 익는 경우가 많습니다.', 'ปลาหมึกยักษ์ที่เคยแช่แข็งใช้ได้ดี และมักนุ่มขึ้นเพราะการแช่แข็งช่วยทำลายโครงสร้างกล้ามเนื้อ'),
      ml('Use sweet paprika alone for a mild plate, or combine sweet and hot paprika while keeping the total amount unchanged.', '想要溫和可只用甜紅椒粉；也可甜辣混合，但總量維持不變。', '穏やかにするなら甘口パプリカだけ、辛味を足すなら甘口と辛口を合わせ、総量は変えません。', '순하게 하려면 스위트 파프리카만 쓰고, 매콤하게 하려면 스위트와 핫을 섞되 총량은 유지하세요.', 'ถ้าต้องการอ่อนใช้ปาปริกาหวานอย่างเดียว หรือผสมหวานกับเผ็ดโดยคงปริมาณรวมเดิม')
    ]
  },
  fishStew: {
    tips: [
      ml('Cook the potatoes until almost tender before adding fresh fish; the fish needs only a few minutes and should not simmer for the full stew time.', '馬鈴薯先煮到接近熟透再加鮮魚；魚只需要幾分鐘，不應跟整鍋一起長時間燉。', 'じゃがいもがほぼ柔らかくなってから生魚を加えます。魚は数分で火が通るため、煮込み時間全体を一緒に煮ません。', '감자를 거의 익힌 뒤 생선을 넣으세요. 생선은 몇 분이면 익으므로 스튜 전체 시간 동안 끓이면 안 됩니다.', 'ต้มมันฝรั่งเกือบนุ่มก่อนใส่ปลาสด เพราะปลาใช้เวลาเพียงไม่กี่นาทีและไม่ควรเคี่ยวตลอดเวลาสตูว์'),
      ml('Break a few potato edges into the broth to thicken naturally while leaving most pieces intact.', '可壓碎少量馬鈴薯邊角讓湯自然變濃，但大部分薯塊要保持完整。', 'じゃがいもの一部を汁の中で崩して自然にとろみを付け、ほとんどの形は残します。', '감자 일부 가장자리만 국물에 으깨 자연스럽게 걸쭉하게 하고 대부분은 형태를 유지하세요.', 'บี้ขอบมันฝรั่งบางส่วนลงในน้ำให้ข้นตามธรรมชาติ แต่คงชิ้นส่วนใหญ่ไว้')
    ],
    commonMistakes: [
      ml('Boiling tuna or bonito hard makes it dry and chalky; add it at the end and cook at a gentle simmer.', '鮪魚或鰹魚大滾久煮會乾柴；最後才加入，以溫和小滾煮熟。', 'マグロやカツオを強く煮立てると乾いて粉っぽくなるため、最後に加えて弱く火を通します。', '참치나 가다랑어를 세게 끓이면 퍽퍽해지므로 마지막에 넣어 약하게 익히세요.', 'ต้มทูน่าหรือโบนิโตแรง ๆ ทำให้แห้งร่วน ให้ใส่ช่วงท้ายและเคี่ยวอ่อน'),
      ml('Adding all liquid at once without judging the potatoes can leave a thin soup; keep extra stock hot and add only as needed.', '不看馬鈴薯狀態就一次倒入全部液體容易變成稀湯；額外高湯保溫，按需要補。', 'じゃがいもの状態を見ずに液体を全部入れると薄い汁になるため、追加のだしは温めて必要量だけ足します。', '감자 상태를 보지 않고 액체를 한꺼번에 넣으면 묽어지므로 여분 육수는 따뜻하게 두고 필요한 만큼만 넣으세요.', 'เทน้ำทั้งหมดโดยไม่ดูมันฝรั่งอาจทำให้ซุปบาง เก็บสต๊อกเพิ่มให้อุ่นและเติมเท่าที่จำเป็น')
    ],
    substitutions: [
      ml('Use another firm, meaty fresh tuna species if bonito del norte is unavailable; cut pieces to the same size and shorten cooking if they are leaner.', '買不到 bonito del norte 時可用其他肉質結實的新鮮鮪魚；切同樣大小，若較瘦則縮短烹調。', 'ボニート・デル・ノルテがなければ身の締まった別の生マグロを使い、同じ大きさに切って脂が少なければ加熱を短くします。', '보니토 델 노르테가 없으면 단단한 다른 생참치를 같은 크기로 썰어 쓰고 더 마른 생선이면 시간을 줄이세요.', 'ถ้าไม่มี bonito del norte ใช้ทูน่าสดเนื้อแน่นชนิดอื่น หั่นขนาดเท่ากันและลดเวลาถ้าเนื้อไม่มัน'),
      ml('Jarred roasted red pepper can replace freshly roasted pepper; drain it well and choose one without sweet syrup.', '瓶裝烤紅椒可代替現烤紅椒；充分瀝乾並選不含甜糖漿的產品。', '市販のロースト赤ピーマンでも代用でき、よく水を切り甘いシロップ入りは避けます。', '병에 든 구운 홍고추로 바꿀 수 있으며 물기를 잘 빼고 단 시럽 제품은 피하세요.', 'ใช้พริกแดงย่างขวดแทนของย่างสดได้ สะเด็ดดีและเลือกแบบไม่มีน้ำเชื่อมหวาน')
    ]
  },
  pilPil: {
    tips: [
      ml('Keep the oil warm rather than hot when forming pil-pil; the cod gelatin emulsifies most reliably below frying temperature.', '製作 pil-pil 時油要溫而不是燙；鱈魚明膠在低於油炸溫度時最容易乳化。', 'ピルピルを作るとき油は熱くしすぎず温かい程度にし、揚げ物温度より低い方がタラのゼラチンが乳化しやすくなります。', '필필을 만들 때 기름은 뜨겁지 않고 따뜻하게 유지하세요. 대구 젤라틴은 튀김 온도보다 낮을 때 가장 잘 유화됩니다.', 'ตอนทำ pil-pil ให้น้ำมันอุ่นไม่ร้อน เจลาตินจากปลาคอดอิมัลซิไฟได้ดีที่สุดต่ำกว่าอุณหภูมิทอด'),
      ml('Move the pan gently and add oil in small amounts so the fish juices and olive oil combine into a glossy sauce instead of separating.', '輕柔晃鍋並少量分次加油，讓魚汁與橄欖油形成亮澤乳化醬而不是分離。', '鍋をやさしく動かし油を少量ずつ加え、魚の汁とオリーブ油を分離させず艶のあるソースにします。', '팬을 부드럽게 흔들고 기름을 조금씩 넣어 생선즙과 올리브유가 분리되지 않고 윤기 나는 소스가 되게 하세요.', 'โยกกระทะเบา ๆ และเติมน้ำมันทีละน้อยให้ของเหลวปลาและน้ำมันรวมเป็นซอสเงาแทนการแยกชั้น')
    ],
    commonMistakes: [
      ml('Oil that is too hot cooks the gelatin into tight white clumps and prevents a smooth emulsion.', '油太熱會讓明膠凝成緊實白塊，難以形成滑順乳化。', '油が熱すぎるとゼラチンが白い塊に固まり、なめらかな乳化ができません。', '기름이 너무 뜨거우면 젤라틴이 하얀 덩어리로 굳어 매끈한 유화가 되지 않습니다.', 'น้ำมันร้อนเกินทำให้เจลาตินจับเป็นก้อนขาวและอิมัลชันไม่เนียน'),
      ml('Do not keep cooking salt cod after it flakes easily; residual heat continues to firm it while the sauce is finished.', '鹽鱈魚一旦可輕易剝片就不要續煮；完成醬汁期間餘熱仍會讓魚肉變緊。', '塩ダラが簡単にほぐれるようになったら加熱を続けず、ソースを仕上げる間の余熱も考えます。', '염대구가 쉽게 결대로 갈라지면 더 익히지 마세요. 소스를 마무리하는 동안 잔열로 더 단단해집니다.', 'เมื่อปลาคอดเค็มแยกเป็นชิ้นง่ายแล้วอย่าปรุงต่อ ความร้อนคงค้างยังทำให้เนื้อแน่นขึ้นระหว่างทำซอส')
    ],
    substitutions: [
      ml('If only already-desalted salt cod is available, skip the soaking stage but still dry the surface thoroughly before cooking.', '若只能買到已脫鹽鹽鱈，可省略浸泡，但烹調前仍要徹底擦乾表面。', '塩抜き済みの塩ダラなら浸水を省けますが、調理前に表面の水気はしっかり拭きます。', '이미 염분 제거된 염대구라면 불리기를 생략해도 되지만 조리 전 표면 물기는 완전히 닦으세요.', 'ถ้ามีปลาคอดเค็มที่ถอนเกลือแล้ว ข้ามการแช่ได้แต่ยังต้องซับผิวให้แห้งก่อนปรุง'),
      ml('Use a mild dried chilli if guindilla is unavailable; it should perfume the oil without dominating the cod.', '買不到 guindilla 時可用溫和乾辣椒，重點是讓油帶香氣而不是蓋過鱈魚。', 'ギンディージャがなければ穏やかな乾燥唐辛子を使い、タラを圧倒せず油に香りを付けます。', '긴디야가 없으면 순한 건고추를 써 대구 맛을 덮지 않고 기름에 향만 내세요.', 'ถ้าไม่มี guindilla ใช้พริกแห้งรสอ่อน ให้หอมน้ำมันโดยไม่กลบรสปลาคอด')
    ]
  },
  vegetableStew: {
    tips: [
      ml('Cook watery vegetables in stages so each can brown and soften before tomato moisture enters the pan.', '含水多的蔬菜分階段炒，讓每種先上色變軟，再加入番茄水分。', '水分の多い野菜は順番に炒め、トマトの水分を入れる前にそれぞれ色と柔らかさを出します。', '수분 많은 채소는 순서대로 볶아 토마토 수분이 들어오기 전에 각각 갈색과 부드러움을 만드세요.', 'ผัดผักที่มีน้ำมากเป็นขั้น ๆ ให้แต่ละชนิดขึ้นสีและนุ่มก่อนใส่ความชื้นจากมะเขือเทศ'),
      ml('Keep the final simmer uncovered so excess vegetable water evaporates and the pisto becomes spoonable rather than soupy.', '最後不加蓋小火煮，讓多餘蔬菜水分蒸發，pisto 濃到可用湯匙舀而不是湯狀。', '仕上げは蓋をせず煮て余分な野菜の水分を飛ばし、汁物ではなくスプーンですくえる濃さにします。', '마지막은 뚜껑 없이 끓여 채소의 여분 수분을 날리고 국물처럼 되지 않게 숟가락으로 뜰 농도로 만드세요.', 'เคี่ยวช่วงท้ายแบบเปิดฝาให้น้ำผักส่วนเกินระเหย จน pisto ตักได้ไม่เป็นซุป')
    ],
    commonMistakes: [
      ml('Putting all vegetables in at once steams the onions and peppers instead of developing their sweetness.', '所有蔬菜一次下鍋會把洋蔥與甜椒蒸熟，而不是炒出甜味。', '野菜を全部一度に入れると玉ねぎとピーマンが蒸され、甘さを引き出す焼きができません。', '채소를 한꺼번에 넣으면 양파와 피망이 볶이지 않고 쪄져 단맛이 충분히 나오지 않습니다.', 'ใส่ผักทั้งหมดพร้อมกันทำให้หอมกับพริกนึ่งแทนการผัดจนหวาน'),
      ml('Do not correct tomato acidity with sugar before the sauce has reduced; concentration often softens the perceived sharpness.', '番茄醬汁尚未收濃前不要急著用糖修酸；濃縮後酸感常會自然變柔。', 'トマトが煮詰まる前に砂糖で酸味を直さず、濃縮すると鋭さが和らぐことが多いです。', '토마토가 졸기 전에 설탕으로 산미를 고치지 마세요. 농축되면 날카로운 신맛이 줄어드는 경우가 많습니다.', 'อย่าแก้ความเปรี้ยวด้วยน้ำตาลก่อนซอสงวด เพราะเมื่อเข้มข้นความเปรี้ยวคมมักลดลงเอง')
    ],
    substitutions: [
      ml('Use another firm summer squash if courgette is unavailable; keep the pieces the same size so they soften at a similar rate.', '買不到櫛瓜時可用其他結實夏南瓜，切同樣大小以維持相近熟成速度。', 'ズッキーニがなければ別の締まった夏かぼちゃを同じ大きさに切り、火の通りを合わせます。', '주키니가 없으면 다른 단단한 여름호박을 같은 크기로 썰어 익는 속도를 맞추세요.', 'ถ้าไม่มีซูกินี ใช้ฟักฤดูร้อนเนื้อแน่นชนิดอื่น หั่นขนาดเท่ากันให้สุกใกล้เคียง'),
      ml('Egg is a traditional accompaniment but can be omitted; the vegetable pisto itself remains complete.', '雞蛋是傳統搭配但可省略；蔬菜 pisto 本身仍是一道完整料理。', '卵は伝統的な添え物ですが省け、野菜のピストだけでも料理として成立します。', '달걀은 전통 곁들임이지만 생략해도 채소 피스토 자체로 완성됩니다.', 'ไข่เป็นเครื่องเคียงดั้งเดิมแต่ตัดได้ ตัว pisto ผักเองก็เป็นจานสมบูรณ์')
    ]
  },
  batteredSeafood: {
    tips: [
      ml('Keep both squid and batter cold until the oil is ready; cold batter sets quickly into a lighter crust.', '魷魚與麵糊都保持冰冷直到油溫到位；冷麵糊遇熱能更快定型成輕脆外殼。', '油が適温になるまでイカと衣を冷たく保ち、冷たい衣を素早く固めて軽い食感にします。', '기름이 준비될 때까지 오징어와 반죽을 차갑게 유지하면 차가운 반죽이 빨리 굳어 가벼운 튀김옷이 됩니다.', 'เก็บทั้งปลาหมึกและแป้งให้เย็นจนกว่าน้ำมันพร้อม แป้งเย็นจะเซ็ตเร็วเป็นเปลือกเบา'),
      ml('Fry only a few rings at a time so the oil stays hot and the coating seals before squid releases moisture.', '每次只炸少量魷魚圈，讓油溫維持高溫，外殼先封住再避免魷魚出水。', '一度に少量ずつ揚げ、油温を保ってイカが水分を出す前に衣を固めます。', '한 번에 적은 양만 튀겨 기름 온도를 유지하고 오징어 수분이 나오기 전에 튀김옷을 굳히세요.', 'ทอดวงปลาหมึกทีละน้อยให้น้ำมันยังร้อนและผิวเซ็ตก่อนปลาหมึกปล่อยน้ำ')
    ],
    commonMistakes: [
      ml('Wet squid makes batter slide off and causes violent splattering; dry the rings very thoroughly before coating.', '魷魚圈潮濕會讓麵糊滑落並劇烈噴油；裹糊前要徹底擦乾。', 'イカが濡れていると衣が滑り落ち油も激しくはねるため、衣を付ける前に十分乾かします。', '오징어가 젖어 있으면 반죽이 벗겨지고 기름이 심하게 튀므로 입히기 전에 완전히 말리세요.', 'ปลาหมึกเปียกทำให้แป้งไหลและน้ำมันกระเด็นแรง ต้องซับวงให้แห้งมากก่อนชุบ'),
      ml('Long frying makes squid rubbery even if the crust looks good; remove each batch as soon as the coating is evenly golden.', '即使外殼漂亮，炸太久也會讓魷魚變橡皮；外衣均勻金黃就立刻撈起。', '衣がきれいでも長く揚げるとイカが硬くなるため、均一な金色になったらすぐ上げます。', '튀김옷이 좋아 보여도 오래 튀기면 오징어가 질겨지므로 고르게 금빛이 되면 바로 건지세요.', 'ทอดนานทำให้ปลาหมึกเหนียวแม้ผิวสวย ให้ยกทันทีเมื่อแป้งทองสม่ำเสมอ')
    ],
    substitutions: [
      ml('Cold sparkling water can replace part of the egg-based liquid for a lighter batter while keeping the stated total liquid amount.', '想要較輕麵糊，可用冰氣泡水替代部分蛋液液體，但總液體量維持食譜設定。', '軽い衣にしたい場合は卵液の一部を冷たい炭酸水に替え、総液量はレシピ通りに保ちます。', '더 가벼운 반죽은 달걀 기반 액체 일부를 차가운 탄산수로 바꾸되 총 액체량은 유지하세요.', 'ใช้น้ำโซดาเย็นแทนของเหลวไข่บางส่วนได้เพื่อแป้งเบา โดยคงปริมาณของเหลวรวมตามสูตร'),
      ml('Use a neutral high-heat oil if mild olive oil is unavailable; keep the same frying temperature.', '沒有淡味橄欖油時可用中性耐高溫油，維持相同炸油溫度。', '穏やかなオリーブ油がなければ高温向けの中性油を使い、揚げ温度は同じにします。', '순한 올리브유가 없으면 고온용 중성유를 쓰고 같은 튀김 온도를 유지하세요.', 'ถ้าไม่มีน้ำมันมะกอกรสอ่อน ใช้น้ำมันเป็นกลางทนร้อนสูงและรักษาอุณหภูมิทอดเดิม')
    ]
  },
  dessert: {
    tips: [
      ml('Weigh the key ingredients rather than relying on volume measures; custards and cakes are sensitive to ratio changes.', '主要材料請秤重，不只靠容量估算；卡士達與蛋糕對比例變化很敏感。', '主要材料は容量ではなく重量で量ります。カスタードやケーキは配合の変化に敏感です。', '핵심 재료는 부피보다 무게로 재세요. 커스터드와 케이크는 비율 변화에 민감합니다.', 'ชั่งวัตถุดิบหลักแทนการกะปริมาตร เพราะคัสตาร์ดและเค้กไวต่อการเปลี่ยนสัดส่วน'),
      ml('Respect the stated cooling or resting time; many Spanish desserts finish setting after the heat is turned off.', '務必給足冷卻或靜置時間；許多西班牙甜點是在停止加熱後才完成定型。', '指定の冷却・休ませ時間を守ります。スペイン菓子の多くは加熱後に固まります。', '지정된 냉각·휴지 시간을 지키세요. 많은 스페인 디저트는 가열이 끝난 뒤 굳습니다.', 'ให้เวลาพักหรือแช่เย็นตามที่ระบุ เพราะขนมสเปนหลายชนิดเซ็ตตัวหลังหยุดให้ความร้อน')
    ],
    commonMistakes: [
      ml('Do not overheat egg-based mixtures; excessive heat can scramble custard or dry an almond cake before the centre sets.', '蛋液類不要過熱；溫度過高會讓卡士達結塊，或讓杏仁蛋糕中心尚未定型就先變乾。', '卵を使う生地を加熱しすぎないでください。カスタードは分離し、アーモンドケーキは中心が固まる前に乾きます。', '달걀 혼합물을 과열하지 마세요. 커스터드는 응고되고 아몬드 케이크는 중심이 굳기 전에 마를 수 있습니다.', 'อย่าให้ส่วนผสมไข่ร้อนเกินไป คัสตาร์ดอาจจับตัวหรือเค้กอัลมอนด์แห้งก่อนกลางเซ็ต'),
      ml('Do not judge doneness by colour alone; use the stated texture cue, temperature, skewer or set test for the specific dessert.', '不要只看顏色判斷熟度；依該甜點指定的質地、溫度、竹籤或凝固定型線索確認。', '色だけで判断せず、その菓子で指定した食感、温度、串、固まり具合を確認します。', '색만 보고 익힘을 판단하지 말고 해당 디저트의 식감, 온도, 꼬치 또는 굳힘 기준을 확인하세요.', 'อย่าดูสีอย่างเดียว ให้ใช้เนื้อสัมผัส อุณหภูมิ ไม้เสียบ หรือจุดเซ็ตตามที่สูตรระบุ')
    ],
    substitutions: [
      ml('When replacing whole milk, use another full-fat dairy product with similar fat and protein so the texture stays predictable.', '替換全脂牛奶時，選脂肪與蛋白質接近的全脂乳製品，質地才較可預測。', '全乳を替える場合は脂肪分とたんぱく質が近い全脂乳製品を使うと食感を保ちやすくなります。', '전지 우유를 바꿀 때는 지방과 단백질이 비슷한 전지 유제품을 써야 식감을 예측하기 쉽습니다.', 'ถ้าเปลี่ยนนมสด ให้ใช้ผลิตภัณฑ์นมไขมันเต็มที่ที่มีไขมันและโปรตีนใกล้เคียงเพื่อให้เนื้อสัมผัสคงที่'),
      ml('Use fresh citrus zest of the same type when possible; bottled juice changes acidity and cannot replace aromatic peel one-for-one.', '柑橘香氣盡量用同類新鮮果皮；瓶裝果汁的酸度不同，不能一比一取代芳香果皮。', '柑橘の香りは同じ種類の新鮮な皮を使い、酸度の違う市販果汁を香りの皮と同量置換しません。', '감귤 향은 가능하면 같은 종류의 신선한 제스트를 쓰고 산도가 다른 병주스로 향긋한 껍질을 1:1 대체하지 마세요.', 'กลิ่นส้มควรใช้ผิวสดชนิดเดียวกัน น้ำผลไม้ขวดมีความเป็นกรดต่างกันและแทนผิวหอมแบบหนึ่งต่อหนึ่งไม่ได้')
    ]
  }
};

export function makeSpanishRecipe(recipe) {
  const { additionalSources = [], profile = 'chilled', ...data } = recipe;
  const defaults = profiles[profile] || profiles.chilled;
  return {
    cuisine: 'spanish',
    region: ml('Spain', '西班牙', 'スペイン', '스페인', 'สเปน'),
    sources: [...(spanishRecipeSources[recipe.id] || []), ...additionalSources],
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

export const tortillaStorage = ml(
  'Cool within 2 hours, cover, and refrigerate at 0–4°C for up to 2 days. Serve chilled, at room temperature for no more than 2 hours, or reheat gently until hot.',
  '2 小時內降溫，加蓋置 0–4°C 冰箱最多 2 天；可冷食、室溫放置不超過 2 小時，或溫和回熱至熱透。',
  '2時間以内に冷まし、覆って0–4°Cで2日まで冷蔵します。冷たいまま、室温なら2時間以内、またはやさしく十分に温めて食べます。',
  '2시간 안에 식혀 덮고 0–4°C에서 2일까지 냉장하세요. 차갑게 먹거나 실온 2시간 이내에 먹고, 데울 때는 부드럽게 속까지 가열하세요.',
  'ทำให้เย็นภายใน 2 ชั่วโมง ปิดฝาแช่ 0–4°C ไม่เกิน 2 วัน กินเย็น วางอุณหภูมิห้องไม่เกิน 2 ชั่วโมง หรืออุ่นเบา ๆ ให้ร้อนทั่ว'
);

export const coldSoupStorage = ml(
  'Keep covered at 0–4°C and use within 2 days. Stir or briefly re-blend before serving if the emulsion separates; do not leave at room temperature for more than 2 hours.',
  '加蓋置 0–4°C 冰箱並於 2 天內食用；若乳化分層，上桌前攪勻或短暫再打勻，室溫不要放超過 2 小時。',
  '覆って0–4°Cで保存し2日以内に使います。分離したら供する前に混ぜるか短く再攪拌し、室温に2時間以上置きません。',
  '덮어서 0–4°C에 보관해 2일 안에 드세요. 분리되면 내기 전에 젓거나 짧게 다시 갈고 실온에 2시간 넘게 두지 마세요.',
  'ปิดฝาเก็บที่ 0–4°C และใช้ภายใน 2 วัน ถ้าแยกชั้นให้คนหรือปั่นสั้น ๆ ก่อนเสิร์ฟ และอย่าวางอุณหภูมิห้องเกิน 2 ชั่วโมง'
);
