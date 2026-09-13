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
