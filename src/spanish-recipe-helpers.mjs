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
