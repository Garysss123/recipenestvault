import { italianRecipeSources } from './italian-source-map.mjs';

export const ml = (en, zhHant, ja, ko, th) => ({ en, 'zh-hant': zhHant, ja, ko, th });
export const ingredient = (amount, en, zhHant, ja, ko, th) => ({ amount, item: ml(en, zhHant, ja, ko, th) });
export const step = (title, body, imageScene) => ({ title, body, imageScene });

const profiles = {
  pasta: {
    tips: [
      ml('Reserve pasta water before draining; its starch helps the sauce cling without adding cream.', '瀝麵前先留煮麵水，澱粉能幫助醬汁附著，不必靠鮮奶油增稠。', '湯切り前にゆで汁を取り分けます。でんぷんがソースをつなぎ、生クリームなしでも麺に絡みます。', '면을 건지기 전에 면수를 남기세요. 전분이 크림 없이도 소스를 면에 잘 붙게 합니다.', 'เก็บน้ำต้มเส้นไว้ก่อนสะเด็ด แป้งในน้ำช่วยให้ซอสเกาะเส้นโดยไม่ต้องเติมครีม'),
      ml('Finish the pasta in the sauce and serve at once; the texture changes quickly as it stands.', '麵條最後要在醬汁中完成，拌好立即上桌；放置後口感很快就會改變。', '麺はソースの中で仕上げ、すぐに供します。置くほど食感が急速に変わります。', '면은 소스에서 마무리하고 바로 내세요. 두면 식감이 빠르게 변합니다.', 'คลุกเส้นให้เสร็จในซอสแล้วเสิร์ฟทันที เพราะเนื้อสัมผัสเปลี่ยนเร็วเมื่อพักไว้')
    ],
    commonMistakes: [
      ml('Do not cook the pasta fully in plain water; leave it firm enough to finish in the sauce.', '不要只在清水中把麵煮到全熟；保留硬芯，讓最後熟成在醬汁裡完成。', '湯の中だけで完全にゆで切らず、ソースで仕上げられる硬さを残します。', '맹물에서 완전히 익히지 말고 소스에서 마무리할 정도의 탄력을 남기세요.', 'อย่าต้มเส้นจนสุกเต็มที่ในน้ำเปล่า ให้เหลือความแน่นไว้เพื่อจบในซอส'),
      ml('Add pasta water gradually; too much at once makes the sauce thin and difficult to emulsify.', '煮麵水要少量分次加入，一次加太多會讓醬汁過稀、難以乳化。', 'ゆで汁は少しずつ加えます。一度に多く入れると薄まり、乳化しにくくなります。', '면수는 조금씩 넣으세요. 한꺼번에 많이 넣으면 소스가 묽어져 유화하기 어렵습니다.', 'เติมน้ำต้มเส้นทีละน้อย ถ้าใส่มากครั้งเดียวซอสจะบางและอิมัลชันยาก')
    ],
    substitutions: [
      ml('Use another durum-wheat pasta of similar thickness when the named shape is unavailable.', '找不到指定麵型時，可用粗細相近的杜蘭小麥乾麵替代。', '指定の形がなければ、太さの近いデュラム小麦の乾燥パスタで代用できます。', '지정 면이 없으면 굵기가 비슷한 듀럼밀 건면으로 바꿀 수 있습니다.', 'ถ้าไม่มีทรงพาสต้าที่ระบุ ใช้พาสตาดูรัมขนาดใกล้เคียงแทนได้'),
      ml('Use a well-aged hard Italian-style cheese with similar salt and fat when the specified cheese is unavailable.', '找不到指定起司時，可用鹹度與脂肪相近、熟成充分的義式硬質起司替代。', '指定チーズがなければ、塩分と脂肪分の近い熟成ハードチーズで代用できます。', '지정 치즈가 없으면 염도와 지방이 비슷한 숙성 이탈리아식 하드 치즈로 바꿀 수 있습니다.', 'ถ้าไม่มีชีสที่ระบุ ใช้ชีสแข็งแบบอิตาเลียนที่บ่มดีและมีความเค็มกับไขมันใกล้เคียงแทนได้')
    ]
  },
  baked: {
    tips: [
      ml('Preheat the oven fully before baking so the centre and surface cook on schedule.', '烘烤前務必讓烤箱完全預熱，中心與表面才能依預期同步熟成。', '焼く前にオーブンを十分予熱し、中心と表面を予定どおりに仕上げます。', '굽기 전에 오븐을 충분히 예열해야 속과 표면이 계획대로 익습니다.', 'อุ่นเตาให้ถึงอุณหภูมิก่อนอบ เพื่อให้ตรงกลางและผิวสุกตามเวลา'),
      ml('Rest the finished dish briefly before cutting so steam and juices settle.', '出爐後先短暫靜置再切，讓蒸氣與汁液穩定。', '焼き上がりは少し休ませ、蒸気と汁を落ち着かせてから切ります。', '완성 후 잠시 쉬었다 자르면 수증기와 육즙이 안정됩니다.', 'พักอาหารหลังอบสักครู่ก่อนตัด เพื่อให้ไอน้ำและน้ำในอาหารนิ่งตัว')
    ],
    commonMistakes: [
      ml('Do not rely only on surface colour; check the centre for the stated doneness cue.', '不要只看表面顏色，仍要依食譜指定的熟度線索確認中心。', '表面の色だけで判断せず、指定された火の通りを中心で確認します。', '겉색만 보지 말고 레시피의 익힘 기준으로 중심을 확인하세요.', 'อย่าดูแค่สีผิว ต้องตรวจความสุกตรงกลางตามสัญญาณที่ระบุ'),
      ml('Overfilling the pan traps steam and prevents proper browning.', '烤皿裝得過滿會困住水氣，表面不易正常上色。', '詰め込みすぎると蒸気がこもり、十分な焼き色がつきません。', '팬을 너무 가득 채우면 수증기가 갇혀 제대로 갈색이 나지 않습니다.', 'ใส่ถาดแน่นเกินไปจะกักไอน้ำและทำให้ผิวไม่ขึ้นสีดี')
    ],
    substitutions: [
      ml('A similarly sized metal or ceramic baking dish can be used; adjust the final minutes if browning differs.', '可換用尺寸相近的金屬或陶瓷烤皿；若上色情況不同，最後幾分鐘酌量調整。', '同程度の大きさの金属または陶器の耐熱皿でも作れます。焼き色に応じて最後の数分を調整します。', '비슷한 크기의 금속이나 도자기 오븐 용기를 써도 되며, 갈색 정도에 따라 마지막 몇 분을 조절하세요.', 'ใช้ถาดโลหะหรือเซรามิกขนาดใกล้เคียงได้ และปรับนาทีท้ายตามการขึ้นสี'),
      ml('Use the closest local equivalent of the specified cheese, but keep the quantity unchanged for balance.', '指定起司買不到時，可用最接近的當地品種替代，但份量維持不變以保持平衡。', '指定チーズがなければ近いタイプで代用し、バランスのため量は同じにします。', '지정 치즈가 없으면 가장 비슷한 현지 치즈를 같은 양으로 사용하세요.', 'ถ้าไม่มีชีสที่ระบุ ใช้ชนิดใกล้เคียงในปริมาณเท่าเดิมเพื่อรักษาสมดุล')
    ]
  },
  braise: {
    tips: [
      ml('Brown in batches so the pan stays hot; crowding turns searing into steaming.', '分批煎上色以維持鍋溫；擠在一起會從煎封變成蒸煮。', '鍋の温度を保つため分けて焼きます。詰め込むと焼き付けではなく蒸し煮になります。', '팬 온도를 유지하도록 나눠 굽고, 빽빽하게 넣어 찌듯 익히지 마세요.', 'จี่เป็นรอบเพื่อให้กระทะร้อน หากใส่แน่นจะกลายเป็นนึ่งแทนการจี่'),
      ml('Keep the braise at a gentle simmer; hard boiling can toughen meat and muddy the sauce.', '燉煮保持微滾；大滾會讓肉質變硬，也會使醬汁混濁。', '煮込みは静かな沸騰を保ちます。強く沸かすと肉が締まり、ソースも濁ります。', '브레이즈는 약하게 끓이세요. 세게 끓이면 고기가 질겨지고 소스가 탁해질 수 있습니다.', 'ตุ๋นให้เดือดอ่อน การเดือดแรงทำให้เนื้อแข็งและซอสขุ่น')
    ],
    commonMistakes: [
      ml('Do not rush the browning stage; pale meat gives a flatter sauce.', '不要省略煎上色；肉表面太淡，最後醬汁層次也會較薄。', '焼き付けを急がないでください。肉が白いままだとソースの風味も平坦になります。', '겉면 갈색 내기를 서두르지 마세요. 고기가 창백하면 소스 맛도 밋밋해집니다.', 'อย่ารีบขั้นจี่ หากเนื้อไม่ขึ้นสีน้ำตาล ซอสจะมีรสตื้น'),
      ml('Add salt in stages because stock, cured meat and cheese can concentrate as the liquid reduces.', '鹽要分段加入，因為高湯、醃肉或起司在收汁後鹹度會集中。', 'だし、加工肉、チーズの塩分は煮詰めると濃くなるため、塩は段階的に加えます。', '육수·염장육·치즈의 염분은 졸면서 진해지므로 소금은 나눠 넣으세요.', 'เติมเกลือเป็นช่วง เพราะสต๊อก เนื้อหมัก และชีสจะเค็มขึ้นเมื่อซอสงวด')
    ],
    substitutions: [
      ml('Use an equal amount of unsalted stock when replacing wine, then finish with a small splash of mild vinegar for acidity.', '若不使用酒，可用等量無鹽高湯替代，最後加少量溫和醋補酸度。', 'ワインを使わない場合は同量の無塩だしに替え、最後に穏やかな酢を少量加えて酸味を補います。', '와인을 빼면 같은 양의 무염 육수를 쓰고 마지막에 순한 식초를 조금 넣어 산미를 보완하세요.', 'ถ้าไม่ใช้ไวน์ ให้ใช้น้ำสต๊อกไม่เค็มปริมาณเท่ากัน แล้วเติมน้ำส้มสายชูอ่อนเล็กน้อยตอนท้าย'),
      ml('Choose a cut with similar connective tissue and thickness so the braising time stays predictable.', '換肉時選結締組織與厚度接近的部位，燉煮時間才較可預期。', '代用肉は結合組織と厚みが近い部位を選ぶと、煮込み時間を合わせやすくなります。', '고기를 바꿀 때 결합조직과 두께가 비슷한 부위를 골라야 조리 시간이 예측 가능합니다.', 'เลือกชิ้นเนื้อที่มีเอ็นและความหนาใกล้กันเพื่อให้เวลาตุ๋นคาดเดาได้')
    ]
  },
  fried: {
    tips: [
      ml('Fry in small batches and let the oil return to temperature between batches.', '少量分批炸，每批之間讓油溫重新回升。', '少量ずつ揚げ、次の回の前に油温を戻します。', '적은 양씩 튀기고 다음 배치 전에 기름 온도를 다시 올리세요.', 'ทอดทีละน้อยและรอให้น้ำมันกลับสู่อุณหภูมิก่อนทอดรอบต่อไป'),
      ml('Drain on a rack rather than piling hot pieces together, which softens the crust.', '起鍋後放網架瀝油，不要把熱食堆在一起，以免外皮回軟。', '熱いうちは重ねず、網で油を切ると衣がしんなりしません。', '뜨거운 것을 겹쳐 놓지 말고 랙에서 기름을 빼야 껍질이 눅눅해지지 않습니다.', 'สะเด็ดบนตะแกรง อย่ากองของร้อนซ้อนกันเพราะเปลือกจะนิ่ม')
    ],
    commonMistakes: [
      ml('Oil that is too cool makes the coating greasy; oil that is too hot browns before the centre heats through.', '油溫太低會吸油，太高則外層先焦、中心還沒熱透。', '油温が低すぎると油っぽくなり、高すぎると中が温まる前に表面だけ色づきます。', '기름이 너무 차가우면 기름지고 너무 뜨거우면 속이 데워지기 전에 겉만 갈색이 됩니다.', 'น้ำมันเย็นเกินไปทำให้อมน้ำมัน ร้อนเกินไปทำให้ผิวเข้มก่อนตรงกลางร้อน'),
      ml('Seal fillings completely; exposed moist filling can split the crust and spit in hot oil.', '餡料要完全包緊；濕餡外露容易讓外殼裂開並造成熱油噴濺。', '具は完全に包みます。湿った具が出ると衣が割れ、油がはねます。', '속을 완전히 봉하세요. 젖은 속이 노출되면 껍질이 갈라지고 기름이 튈 수 있습니다.', 'ปิดไส้ให้สนิท ไส้ชื้นที่โผล่ออกมาอาจทำให้เปลือกแตกและน้ำมันกระเด็น')
    ],
    substitutions: [
      ml('Use another neutral high-heat frying oil; avoid strongly flavoured unrefined oils.', '可換其他耐高溫的中性炸油，不要用風味強烈的未精製油。', '別の高温向け無味油でも構いません。香りの強い未精製油は避けます。', '다른 고온용 중성 튀김기름을 써도 되며 향이 강한 비정제유는 피하세요.', 'ใช้น้ำมันทอดรสกลางชนิดอื่นได้ หลีกเลี่ยงน้ำมันไม่ขัดสีที่กลิ่นแรง'),
      ml('Fine dry breadcrumbs can replace coarse crumbs when needed; expect a thinner, smoother crust.', '需要時可用細乾麵包粉替代粗粒麵包粉，外殼會更薄、更平滑。', '粗いパン粉がなければ細かい乾燥パン粉でも作れますが、衣は薄く滑らかになります。', '굵은 빵가루 대신 고운 건식 빵가루를 쓰면 껍질이 더 얇고 매끈해집니다.', 'ใช้เกล็ดขนมปังแห้งละเอียดแทนชนิดหยาบได้ เปลือกจะบางและเรียบขึ้น')
    ]
  },
  dessert: {
    tips: [
      ml('Weigh the key ingredients rather than relying on volume measures; pastry ratios are sensitive.', '主要材料請秤重，不只靠容量估算；甜點比例對誤差較敏感。', '主要材料は容量ではなく重量で量ります。菓子の配合は誤差に敏感です。', '핵심 재료는 부피보다 무게로 재세요. 디저트 비율은 오차에 민감합니다.', 'ชั่งวัตถุดิบหลักแทนการกะปริมาตร เพราะสัดส่วนขนมไวต่อความคลาดเคลื่อน'),
      ml('Allow the stated chilling or resting time; many desserts finish setting after cooking stops.', '務必給足冷藏或靜置時間；許多甜點是在停止加熱後才完成定型。', '指定の冷却・休ませ時間を守ります。菓子は加熱後に固まるものが多くあります。', '지정된 냉각·휴지 시간을 지키세요. 많은 디저트는 가열이 끝난 뒤 굳습니다.', 'ให้เวลาพักหรือแช่เย็นตามที่ระบุ เพราะขนมหลายชนิดเซ็ตตัวหลังหยุดให้ความร้อน')
    ],
    commonMistakes: [
      ml('Do not overheat eggs or dairy; excessive heat can curdle custards and make creams grainy.', '蛋或乳製品不要過熱；溫度過高會讓卡士達凝結、奶霜變顆粒。', '卵や乳製品を加熱しすぎないでください。カスタードが分離し、クリームがざらつきます。', '달걀과 유제품을 과열하지 마세요. 커스터드가 응고되고 크림이 거칠어질 수 있습니다.', 'อย่าให้ไข่หรือนมร้อนเกินไป เพราะคัสตาร์ดอาจจับตัวและครีมเป็นเม็ด'),
      ml('Measure the setting ingredient exactly; extra gelatin, flour or chocolate can make the texture rubbery or dense.', '定型材料要精準量取；吉利丁、麵粉或巧克力過多都可能讓口感過硬或過密。', 'ゼラチン、粉、チョコレートなど固める材料は正確に量ります。多すぎると硬く重い食感になります。', '젤라틴·밀가루·초콜릿 같은 굳힘 재료는 정확히 재세요. 많으면 질기거나 무거워집니다.', 'ตวงวัตถุดิบที่ช่วยให้เซ็ตตัวให้แม่น เจลาติน แป้ง หรือช็อกโกแลตมากไปทำให้เนื้อยางหรือแน่น')
    ],
    substitutions: [
      ml('Use an equivalent full-fat dairy product when substituting; low-fat versions may not set or whip the same way.', '替換乳製品時選脂肪含量相近的全脂品；低脂版本可能無法同樣定型或打發。', '乳製品を替える場合は脂肪分の近い全脂タイプを使います。低脂肪では固まり方や泡立ちが変わります。', '유제품을 바꿀 때는 지방 함량이 비슷한 전지 제품을 쓰세요. 저지방은 굳거나 휘핑되는 방식이 다릅니다.', 'ถ้าเปลี่ยนผลิตภัณฑ์นม ให้ใช้ชนิดไขมันเต็มที่ใกล้เคียง เพราะแบบไขมันต่ำอาจเซ็ตหรือขึ้นฟูไม่เหมือนกัน'),
      ml('A mild citrus zest can replace part of the vanilla or aromatic garnish while keeping the same liquid ratio.', '部分香草或芳香配料可改用溫和柑橘皮屑，但液體比例維持不變。', 'バニラなどの香りの一部は穏やかな柑橘の皮に替えられますが、液体比率は変えません。', '바닐라 같은 향 일부는 순한 감귤 제스트로 바꿀 수 있지만 액체 비율은 유지하세요.', 'เปลี่ยนกลิ่นวานิลลาบางส่วนเป็นผิวส้มอ่อน ๆ ได้ โดยคงสัดส่วนของเหลวเดิม')
    ]
  }
};

export function makeItalianRecipe(recipe) {
  const { additionalSources = [], profile = 'baked', ...data } = recipe;
  const defaults = profiles[profile] || profiles.baked;
  return {
    cuisine: 'italian',
    region: ml('Italy', '義大利', 'イタリア', '이탈리아', 'อิตาลี'),
    sources: [...(italianRecipeSources[recipe.id] || []), ...additionalSources],
    tips: data.tips || defaults.tips,
    commonMistakes: data.commonMistakes || defaults.commonMistakes,
    substitutions: data.substitutions || defaults.substitutions,
    ...data
  };
}

export const pastaStorage = ml(
  'Cool leftovers promptly and refrigerate within 2 hours at 0–4°C for up to 2 days. Reheat gently with a splash of water; creamy pasta is best eaten fresh.',
  '剩食盡快降溫，2 小時內放入 0–4°C 冰箱，最多保存 2 天；回熱時加少量水輕柔加熱，乳化醬汁義大利麵仍以現做最好。',
  '残りは速やかに冷まし、2時間以内に0–4°Cで冷蔵し2日以内に食べます。少量の水を加えてやさしく温め直し、乳化系パスタは作りたてが最良です。',
  '남은 음식은 빠르게 식혀 2시간 안에 0–4°C로 냉장하고 2일 이내 드세요. 물을 조금 넣어 약하게 데우며, 유화 소스 파스타는 바로 먹는 것이 가장 좋습니다.',
  'ทำให้ของเหลือเย็นเร็วและแช่ที่ 0–4°C ภายใน 2 ชั่วโมง เก็บไม่เกิน 2 วัน อุ่นเบา ๆ พร้อมน้ำเล็กน้อย พาสตาซอสอิมัลชันอร่อยที่สุดเมื่อทำสด'
);

export const cookedStorage = ml(
  'Divide leftovers into shallow containers and refrigerate within 2 hours at 0–4°C for up to 3 days. Reheat only the portion needed until piping hot throughout.',
  '剩食分裝淺盒，2 小時內放入 0–4°C 冰箱，最多保存 3 天；只取需要的份量，回熱至中心完全熱透。',
  '残りは浅い容器に分け、2時間以内に0–4°Cで冷蔵して3日以内に使います。食べる分だけ中心まで十分に再加熱します。',
  '남은 음식은 얕은 용기에 나눠 2시간 안에 0–4°C로 냉장하고 3일 이내 드세요. 필요한 양만 속까지 충분히 뜨겁게 데우세요.',
  'แบ่งอาหารเหลือใส่ภาชนะตื้น แช่เย็นที่ 0–4°C ภายใน 2 ชั่วโมง ไม่เกิน 3 วัน อุ่นเฉพาะส่วนที่จะกินให้ร้อนทั่วถึง'
);

export const bakedStorage = ml(
  'Cool completely, cover, and refrigerate at 0–4°C for up to 3 days. Reheat in a 180°C oven until the centre is hot; crisp breads are best refreshed uncovered.',
  '完全放涼後加蓋，置 0–4°C 冰箱最多 3 天；以 180°C 烤箱回熱至中心熱透，需要酥脆表面的麵包類請不要覆蓋。',
  '完全に冷まして覆い、0–4°Cで3日まで冷蔵します。180°Cのオーブンで中心まで温め、パン類は覆わずに温めると表面が戻ります。',
  '완전히 식혀 덮고 0–4°C에서 3일까지 냉장하세요. 180°C 오븐에서 속까지 데우고, 빵은 덮지 않고 데우면 바삭함이 살아납니다.',
  'ปล่อยให้เย็นสนิท ปิดฝาและแช่ 0–4°C ไม่เกิน 3 วัน อุ่นในเตา 180°C จนร้อนถึงกลาง ขนมปังควรอุ่นแบบไม่คลุมเพื่อคืนความกรอบ'
);

export const dessertStorage = ml(
  'Keep covered at 0–4°C and serve within 3 days unless the recipe specifies otherwise. Do not leave dairy- or egg-based desserts at room temperature for more than 2 hours.',
  '加蓋置 0–4°C 冰箱，除非食譜另有說明，3 天內食用；含乳製品或蛋的甜點室溫放置不要超過 2 小時。',
  '覆って0–4°Cで保存し、特記がなければ3日以内に食べます。乳製品や卵を使うデザートは室温に2時間以上置きません。',
  '덮어서 0–4°C에 보관하고 별도 안내가 없으면 3일 안에 드세요. 유제품이나 달걀이 든 디저트는 실온에 2시간 넘게 두지 마세요.',
  'ปิดฝาเก็บที่ 0–4°C และกินภายใน 3 วันถ้าไม่ได้ระบุเป็นอย่างอื่น ขนมที่มีนมหรือไข่ไม่ควรวางอุณหภูมิห้องเกิน 2 ชั่วโมง'
);
