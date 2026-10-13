const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function prepare(recipe) {
  recipe.instructions = recipe.instructions.map((step) => ({ ...step }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = recipe.tips.map((tip) => ({ ...tip }));
  recipe.commonMistakes = recipe.commonMistakes.map((mistake) => ({ ...mistake }));
}

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url) {
  const title = "Official food-safety guidance — " + label;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function reviseTabbouleh(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Measure 45 g fine bulgur into a bowl and pour over exactly 45 ml of the listed lemon juice. Cover and stand 10 minutes. Taste a few grains: they should be tender without a gritty centre while still separate. If they remain firm, stir and stand 5 minutes more; do not use the remaining 45 ml, which is reserved for dressing.",
    "細小麥粒秤 45 公克放入碗中，準確淋上材料所列檸檬汁 45 毫升。加蓋靜置 10 分鐘。試嚼幾粒：應已柔軟、沒有砂礫般硬芯，同時仍粒粒分明。若仍偏硬，拌一下再靜置 5 分鐘；剩下的 45 毫升留作沙拉醬汁。",
    "細挽きブルグル45gを量ってボウルに入れ、材料欄のレモン汁45mlを正確に注ぎます。覆って10分置きます。数粒を食べて確認し、ざらつく芯がなく柔らかい一方、粒がくっついていない状態にします。まだ硬ければ混ぜて5分追加で置きます。残りの45mlはドレッシング用に取っておきます。",
    "고운 불구르 45g을 계량해 그릇에 담고 재료에 적힌 레몬즙 45ml를 정확히 붓습니다. 덮어 10분 둡니다. 몇 알을 먹어 보아 거친 심 없이 부드럽고 낱알이 분리된 상태인지 확인합니다. 아직 단단하면 저어 5분 더 둡니다. 남은 45ml는 드레싱용으로 남겨 둡니다.",
    "ตวงบัลเกอร์ชนิดละเอียด 45 กรัมใส่ชาม แล้วเทน้ำเลมอน 45 มล.จากรายการวัตถุดิบให้พอดี ปิดฝาพัก 10 นาที ลองเคี้ยวสองสามเม็ด ควรนุ่มโดยไม่มีแกนสากและยังแยกเม็ด หากยังแข็งให้คนแล้วพักต่อ 5 นาที อย่าใช้น้ำเลมอนอีก 45 มล.ที่เหลือ เพราะเก็บไว้ทำเดรสซิง"
  ));
  body(recipe, 1, ml(
    "Rinse the parsley, mint, tomatoes, cucumber, and green onions under running water before trimming or cutting; do not use soap or produce wash. Dry the herbs thoroughly, then finely chop the parsley and mint with a clean knife. If the herbs are wet, blot again so water will not dilute the dressing.",
    "巴西里、薄荷、番茄、小黃瓜與青蔥先在流水下沖洗，再修剪或切開；不要用肥皂或蔬果清潔劑。香草徹底瀝乾後以乾淨刀具細切。若葉片仍濕，再用乾淨布巾吸乾，避免把醬汁稀釋。",
    "パセリ、ミント、トマト、きゅうり、青ねぎは切る前に流水で洗います。石けんや野菜用洗剤は使いません。清潔な包丁でパセリとミントを細かく刻みます。ハーブが濡れていたら清潔な布で再度水気を取り、ドレッシングが薄まらないようにします。",
    "파슬리, 민트, 토마토, 오이, 대파는 다듬거나 자르기 전에 흐르는 물에 씻습니다. 비누나 채소 세정제는 쓰지 않습니다. 깨끗한 칼로 파슬리와 민트를 곱게 썹니다. 허브가 젖어 있으면 깨끗한 천으로 다시 눌러 물기를 제거해 드레싱이 묽어지지 않게 합니다.",
    "ล้างพาร์สลีย์ สะระแหน่ มะเขือเทศ แตงกวา และต้นหอมใต้ก๊อกน้ำก่อนตัดแต่งหรือหั่น ห้ามใช้สบู่หรือน้ำยาล้างผัก เช็ดสมุนไพรให้แห้งสนิทแล้วสับพาร์สลีย์กับสะระแหน่ด้วยมีดสะอาด หากยังเปียกให้ซับอีกครั้งเพื่อไม่ให้น้ำทำให้เดรสซิงจาง"
  ));
  body(recipe, 2, ml(
    "Seed the tomatoes and cucumber and dice them into 5 mm pieces. Place the tomato in a sieve for 5 minutes; discard the loose juice so the finished salad does not become watery. Slice the green onions thinly. Keep the chopped produce separate from any unwashed items and use a clean board.",
    "番茄與小黃瓜去籽後切成約 5 毫米小丁。番茄放濾網瀝 5 分鐘，倒掉多出的汁液，避免沙拉出水。青蔥切薄片。切好的蔬菜與未清洗食材分開，並使用乾淨砧板。",
    "トマトときゅうりは種を取り、5mm角に切ります。トマトはざるで5分水切りし、サラダが水っぽくならないよう余分な汁を捨てます。青ねぎは薄切りにします。洗っていない食材と分け、清潔なまな板を使います。",
    "토마토와 오이는 씨를 빼고 5mm 크기로 깍둑썹니다. 토마토는 체에 담아 5분 물기를 빼고 샐러드가 질척해지지 않도록 고인 즙은 버립니다. 대파는 얇게 썹니다. 씻지 않은 재료와 분리하고 깨끗한 도마를 사용합니다.",
    "เอาเมล็ดมะเขือเทศกับแตงกวาออกแล้วหั่นเต๋า 5 มม. พักมะเขือเทศในกระชอน 5 นาที เทน้ำส่วนเกินทิ้งเพื่อไม่ให้สลัดแฉะ ซอยต้นหอมบาง ๆ แยกผักที่หั่นแล้วจากวัตถุดิบที่ยังไม่ได้ล้างและใช้เขียงสะอาด"
  ));
  body(recipe, 3, ml(
    "Combine the bulgur, parsley, mint, and green onions. Toss for 30 seconds so the small amount of grain spreads through the herbs instead of collecting at the bottom. If the bulgur has clumped, loosen it with a fork before adding the vegetables; do not mash it.",
    "小麥粒、巴西里、薄荷與青蔥放在大碗中拌合 30 秒，讓少量穀粒均勻分散在香草中，而不是沉在碗底。若小麥粒結塊，加入蔬菜前先用叉子撥鬆，不要壓成泥。",
    "ブルグル、パセリ、ミント、青ねぎを大きなボウルで30秒混ぜ、少量の穀粒が底にたまらずハーブ全体に散るようにします。ブルグルが固まっていたら野菜を加える前にフォークでほぐし、つぶしません。",
    "큰 그릇에 불구르, 파슬리, 민트, 대파를 넣고 30초 섞어 적은 양의 곡물이 허브 사이에 고르게 퍼지게 합니다. 불구르가 뭉쳤으면 채소를 넣기 전에 포크로 풀고 으깨지 않습니다.",
    "ใส่บัลเกอร์ พาร์สลีย์ สะระแหน่ และต้นหอมในชามใหญ่ คลุก 30 วินาทีให้เม็ดธัญพืชปริมาณน้อยกระจายทั่วสมุนไพรไม่กองที่ก้น หากบัลเกอร์จับตัวเป็นก้อนให้ใช้ส้อมแยกก่อนใส่ผัก อย่าบด"
  ));
  body(recipe, 4, ml(
    "Fold in the drained tomato, cucumber, and remaining 45 ml lemon juice. Whisk in the olive oil, salt, and pepper, then toss gently. Taste one spoonful: the herbs should lead, with bright lemon and no pool of liquid. If watery, drain the bottom once; if sharp, add 5 ml olive oil at a time rather than extra bulgur. Cover and chill before serving.",
    "拌入瀝乾的番茄、小黃瓜與剩餘 45 毫升檸檬汁。再拌入橄欖油、鹽和黑胡椒，輕輕混合。試吃一匙：香草應是主體，檸檬清爽，碗底不積水。若出水，先瀝掉底部液體；若太酸，每次加 5 毫升橄欖油調整，不要再加小麥粒。加蓋冷藏後再上桌。",
    "水を切ったトマト、きゅうり、残りのレモン汁45mlを加えます。オリーブ油、塩、こしょうを混ぜ、やさしく和えます。ひと口味見し、ハーブが主役でレモンの酸味が明るく、器の底に水がたまらない状態にします。水っぽければ底の液体を一度切ります。酸味が強ければブルグルを足さず、オリーブ油を5mlずつ加えて調整します。覆って冷やしてから供します。",
    "물기를 뺀 토마토와 오이, 남은 레몬즙 45ml를 넣습니다. 올리브유, 소금, 후추를 섞은 뒤 살살 버무립니다. 한 숟갈 맛보아 허브 맛이 중심이고 레몬 맛이 산뜻하며 그릇 바닥에 물이 고이지 않는지 확인합니다. 물이 생기면 바닥의 액체를 한 번 따라 냅니다. 너무 시면 불구르를 더 넣지 말고 올리브유를 5ml씩 더해 조절합니다. 덮어 냉장한 뒤 냅니다.",
    "ใส่มะเขือเทศและแตงกวาที่สะเด็ดแล้ว พร้อมน้ำเลมอนอีก 45 มล. ตีน้ำมันมะกอก เกลือ และพริกไทยให้เข้ากันแล้วคลุกเบา ๆ ชิมหนึ่งคำ รสสมุนไพรควรเด่น เปรี้ยวสดชื่น และไม่มีน้ำขังที่ก้นชาม หากแฉะให้เทของเหลวที่ก้นออกหนึ่งครั้ง หากเปรี้ยวจัดให้เติมน้ำมันมะกอกครั้งละ 5 มล. แทนการเพิ่มบัลเกอร์ ปิดฝาแช่เย็นก่อนเสิร์ฟ"
  ));
  recipe.storage = ml(
    "Serve chilled for the freshest texture. Refrigerate in a clean, covered shallow container within 2 hours of preparation (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; for best quality, use within 2 days. Discard if it has been left out longer; smell and appearance cannot confirm safety.",
    "冷藏後食用，口感最新鮮。料理完成 2 小時內（環境高於 32°C／90°F 時 1 小時內），分裝至乾淨淺盒加蓋，於 4°C／40°F 或以下冷藏；為保持最佳品質，請於 2 天內食用。若在室溫放置超過上述時間就丟棄；氣味與外觀不能證明安全。",
    "作りたての食感を保つため、冷やして供します。清潔な浅い容器に入れて覆い、調理後2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質を保つため2日以内に食べます。それ以上室温に置いたものは捨てます。においや見た目だけでは安全を確認できません。",
    "가장 신선한 식감을 위해 차게 냅니다. 조리 후 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 깨끗하고 얕은 밀폐 용기에 담아 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 2일 안에 먹습니다. 더 오래 실온에 둔 것은 버리세요. 냄새나 겉모습으로 안전을 확인할 수 없습니다.",
    "เสิร์ฟแบบแช่เย็นเพื่อให้ได้เนื้อสัมผัสสดใหม่ที่สุด เก็บในภาชนะตื้นสะอาดปิดฝาและแช่เย็นภายใน 2 ชั่วโมงหลังทำ (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 2 วัน หากวางนอกตู้เย็นนานกว่านั้นให้ทิ้ง กลิ่นและรูปลักษณ์ยืนยันความปลอดภัยไม่ได้"
  );
  recipe.tips[0] = ml(
    "Use fine bulgur for the measured 10-minute lemon soak; coarse bulgur needs a different hydration method and will stay gritty here.",
    "此處的檸檬汁浸泡比例與 10 分鐘時間適用細小麥粒；粗粒小麥需要不同泡發方法，照此做會留有硬芯。",
    "レモン汁で10分浸す方法は細挽きブルグル用です。粗挽きは別の戻し方が必要で、この方法では芯が残ります。",
    "레몬즙에 10분 불리는 방법은 고운 불구르용입니다. 굵은 불구르는 다른 방법으로 불려야 하며 이 방법대로 하면 심이 남습니다.",
    "วิธีแช่น้ำเลมอน 10 นาทีนี้ใช้กับบัลเกอร์ละเอียด บัลเกอร์หยาบต้องใช้วิธีแช่อีกแบบ มิฉะนั้นแกนจะแข็ง"
  );
  recipe.commonMistakes[0] = ml(
    "Pouring all 90 ml lemon juice onto the bulgur can make the grain overly sharp and leave no acid for the dressing; measure 45 ml for soaking and reserve 45 ml.",
    "把 90 毫升檸檬汁全倒在小麥粒上，會使穀粒過酸且沒有檸檬汁調醬；浸泡秤量 45 毫升，另留 45 毫升。",
    "レモン汁90mlをすべてブルグルに注ぐと酸味が強くなり、ドレッシング用が残りません。浸す分は45mlに量り、残り45mlを取っておきます。",
    "레몬즙 90ml를 전부 불구르에 부으면 곡물이 너무 시고 드레싱용 산미가 남지 않습니다. 불림용 45ml만 계량하고 45ml는 남겨 둡니다.",
    "เทน้ำเลมอน 90 มล.ทั้งหมดลงบนบัลเกอร์จะทำให้เปรี้ยวเกินและไม่มีน้ำเลมอนเหลือทำเดรสซิง ตวง 45 มล.สำหรับแช่และเก็บอีก 45 มล.ไว้"
  );
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  return recipe;
}

function reviseVegetablePakora(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Rinse the onion, cabbage, carrot, spinach, and potato under running water before peeling or cutting. Cut to the listed thickness, then spread on clean towels for 10 minutes. The spinach and cabbage should feel dry; if water beads on them, blot again before they go near hot oil.",
    "洋蔥、高麗菜、胡蘿蔔、菠菜與馬鈴薯先在流水下沖洗，再削皮或切開。依材料標示切好後，鋪在乾淨布巾上 10 分鐘。菠菜和高麗菜摸起來應乾爽；若表面仍有水珠，再吸乾後才接近熱油。",
    "玉ねぎ、キャベツ、にんじん、ほうれん草、じゃがいもは皮をむいたり切ったりする前に流水で洗います。材料欄の厚さに切り、清潔な布に広げて10分置きます。ほうれん草とキャベツが乾いた手触りになるまで水気を取り、水滴が残る場合は熱い油に入れる前にもう一度拭きます。",
    "양파, 양배추, 당근, 시금치, 감자는 껍질을 벗기거나 자르기 전에 흐르는 물에 씻습니다. 재료에 적힌 굵기로 썬 뒤 깨끗한 천 위에 10분 펼쳐 둡니다. 시금치와 양배추는 만졌을 때 말라 있어야 합니다. 물방울이 남아 있으면 뜨거운 기름 가까이에 두기 전에 다시 닦습니다.",
    "ล้างหัวหอม กะหล่ำปลี แครอต ผักโขม และมันฝรั่งใต้ก๊อกน้ำก่อนปอกหรือหั่น หั่นตามขนาดในรายการวัตถุดิบ แล้วกระจายบนผ้าสะอาด 10 นาที ผักโขมและกะหล่ำปลีควรแห้งเมื่อจับ หากยังมีหยดน้ำให้ซับอีกครั้งก่อนนำเข้าใกล้น้ำมันร้อน"
  ));
  body(recipe, 1, ml(
    "Toss all the cut vegetables with 8 g salt and rest exactly 10 minutes. Squeeze and mix firmly for 60 seconds over the bowl so the onion and cabbage release moisture into the vegetables rather than onto the counter. The strands should cling when gathered; if liquid pools, drain it before adding flour.",
    "所有切好的蔬菜拌入 8 公克鹽，準確靜置 10 分鐘。在碗上方用力抓拌 60 秒，讓洋蔥與高麗菜釋出的水分留在菜料中。抓起一把應能聚成鬆團；若碗底積水，先倒掉再加粉。",
    "切った野菜すべてに塩8gを混ぜ、正確に10分置きます。ボウルの上で60秒しっかり握るように混ぜ、玉ねぎとキャベツから出た水分を野菜に行き渡らせます。ひとつかみすると粗い塊になる状態が目安です。底に液体がたまったら粉を加える前に捨てます。",
    "자른 채소에 소금 8g을 섞어 정확히 10분 둡니다. 그릇 위에서 60초 세게 쥐듯 섞어 양파와 양배추에서 나온 수분이 채소에 배게 합니다. 한 줌 집었을 때 느슨한 덩어리로 뭉쳐야 합니다. 그릇 바닥에 물이 고이면 밀가루를 넣기 전에 버립니다.",
    "คลุกผักที่หั่นทั้งหมดกับเกลือ 8 กรัม พักให้ครบ 10 นาที บีบและคลุกแรง ๆ เหนือชาม 60 วินาทีให้ความชื้นจากหัวหอมกับกะหล่ำปลีซึมเคลือบผัก เมื่อตักขึ้นหนึ่งกำมือควรเกาะกันเป็นก้อนหลวม ๆ หากมีน้ำขังที่ก้นชามให้เททิ้งก่อนเติมแป้ง"
  ));
  body(recipe, 2, ml(
    "Add the besan, rice flour, cumin, coriander, and chile and mix for 2 minutes. Sprinkle in cold water 15 ml at a time, stopping within the listed 0–90 ml range as soon as a handful holds in loose clumps with no free batter pooling. Do not taste this uncooked mixture: flour is raw and can carry harmful bacteria. Wash hands, utensils, and the work surface after handling it.",
    "加入鷹嘴豆粉、米粉、孜然、芫荽與辣椒粉，拌 2 分鐘。冷水每次加 15 毫升，總量不超過材料所列 0–90 毫升；抓起一把能鬆鬆成團且碗底沒有游離麵糊就停止。不要試吃生麵糊：生粉可能帶有致病細菌。處理後清洗雙手、器具與檯面。",
    "ひよこ豆粉、米粉、クミン、コリアンダー、唐辛子を加え、2分混ぜます。冷水を15mlずつ加え、材料欄の0〜90mlの範囲内で、ひとつかみが緩い塊になり、底に余分な生地がたまらなくなったら止めます。未加熱の粉には有害な細菌が含まれることがあるため、生地を味見しません。扱った後は手、器具、作業台を洗います。",
    "병아리콩가루, 쌀가루, 쿠민, 고수, 고춧가루를 넣고 2분 섞습니다. 찬물을 한 번에 15ml씩 넣되 재료에 적힌 0–90ml 범위 안에서 한 줌이 느슨하게 뭉치고 그릇 바닥에 묽은 반죽이 고이지 않으면 멈춥니다. 익히지 않은 밀가루 반죽에는 해로운 세균이 있을 수 있으므로 맛보지 마세요. 만진 뒤 손, 도구, 작업대를 씻습니다.",
    "ใส่แป้งถั่วลูกไก่ แป้งข้าวเจ้า ยี่หร่า ลูกผักชี และพริกป่น คลุก 2 นาที เติมน้ำเย็นครั้งละ 15 มล. โดยไม่เกินช่วง 0–90 มล.ตามรายการวัตถุดิบ หยุดเมื่อบีบแล้วเกาะเป็นก้อนหลวม ๆ และไม่มีแป้งเหลวขังที่ก้นชาม ห้ามชิมส่วนผสมดิบ เพราะแป้งดิบอาจมีแบคทีเรียที่เป็นอันตราย หลังสัมผัสให้ล้างมือ อุปกรณ์ และพื้นผิวทำงาน"
  ));
  body(recipe, 3, ml(
    "Heat the oil to 175°C/347°F, then keep it between 165–175°C/329–347°F. Fry in repeated batches of six loose 35 g clusters for 3–4 minutes per batch; let the oil recover to 175°C between batches. This range is a crispness and browning target, not a safe minimum internal temperature. Lower clusters carefully and turn only after the crust sets. If the oil smokes, turn off the heat and let it cool before continuing; never add water to hot oil.",
    "油加熱至 175°C／347°F，炸時維持在 165–175°C／329–347°F。分多批炸，每批放 6 個、每個約 35 公克的鬆散菜團，每批 3–4 分鐘；兩批之間等油溫回升至 175°C。此範圍是酥脆與上色目標，不是安全最低中心溫度。輕放菜團，外殼定型後再翻面。若油冒煙，關火並待油降溫後再繼續；絕不可向熱油加水。",
    "油を175°C/347°Fまで熱し、揚げている間は165〜175°C/329〜347°Fに保ちます。35gの粗い団子を6個ずつ複数回に分け、各回3〜4分揚げます。次のバッチの前に油温を175°Cまで戻します。この範囲はカリッと色よく揚げる目標で、安全上の中心温度ではありません。そっと入れ、衣が固まってから返します。油から煙が出たら火を止め、冷めてから再開します。熱い油に水を入れてはいけません。",
    "기름을 175°C/347°F까지 달군 뒤 튀기는 동안 165–175°C/329–347°F로 유지합니다. 35g씩 느슨하게 뭉친 채소전을 한 번에 6개씩 여러 번 나눠 각 배치마다 3–4분 튀깁니다. 다음 배치 전 기름이 175°C로 회복되게 합니다. 이 범위는 바삭함과 갈변 목표이지 식품 안전 최소 중심 온도가 아닙니다. 조심히 넣고 겉이 굳은 뒤에만 뒤집습니다. 기름에서 연기가 나면 불을 끄고 식을 때까지 기다리세요. 뜨거운 기름에 물을 붓지 마세요.",
    "ตั้งน้ำมันให้ถึง 175°C/347°F และรักษาที่ 165–175°C/329–347°F ระหว่างทอด แบ่งทอดหลายชุด ชุดละ 6 ก้อนผักหลวม ๆ ก้อนละ 35 กรัม ทอดชุดละ 3–4 นาที รอให้น้ำมันกลับถึง 175°C ก่อนลงชุดถัดไป ช่วงนี้เป็นเป้าหมายเพื่อความกรอบและสี ไม่ใช่อุณหภูมิภายในขั้นต่ำเพื่อความปลอดภัย ค่อย ๆ หย่อนลงและกลับเมื่อเปลือกเซ็ตแล้ว หากน้ำมันมีควันให้ปิดไฟ รอให้เย็นก่อนทอดต่อ ห้ามเติมน้ำลงในน้ำมันร้อน"
  ));
  body(recipe, 4, ml(
    "Split the thickest pakora from the first batch. The 2 mm potato strands should be hot and tender, and the centre should have no damp, paste-like flour. If the crust is already dark but the centre is still firm or wet, hold the oil near 165°C/329°F and fry another 60–90 seconds, then check a second piece. These are cooking-quality cues; no fresh-pakora safety minimum temperature is specified for this flour mixture.",
    "第一批挑最厚的巴可拉切開檢查。2 毫米馬鈴薯絲應熱透且柔軟，中心不應留有濕黏、糊狀生粉。若外殼已深色但中心仍硬或濕，將油溫維持約 165°C／329°F，再炸 60–90 秒並切開第二個檢查。這些是料理熟度與品質線索；此粉類混合物沒有可套用的新炸巴可拉食安最低溫度。",
    "最初のバッチから最も厚いパコラを割って確認します。2mmのじゃがいもが熱く柔らかく、中心に湿ったペースト状の粉が残っていない状態にします。衣が濃く色づいているのに中心が硬い、または湿っている場合は、油を165°C/329°F付近に保ってさらに60〜90秒揚げ、別の一つも割って確認します。これは調理状態と品質の目安で、この粉の混合物に適用される揚げたての食安最低温度はありません。",
    "첫 번째 튀김에서 가장 두꺼운 파코라를 갈라 확인합니다. 2mm 감자채는 속까지 뜨겁고 부드러워야 하며 중심에 축축하고 풀 같은 생가루 반죽이 없어야 합니다. 겉이 이미 짙게 익었는데 속이 단단하거나 젖어 있으면 기름을 약 165°C/329°F로 유지하고 60–90초 더 튀긴 뒤 두 번째 조각도 확인합니다. 이는 조리 상태와 품질 단서이며 이 밀가루 혼합물에 적용되는 갓 튀긴 음식의 안전 최소 온도는 따로 정해져 있지 않습니다.",
    "ผ่าปาโกราก้อนที่หนาที่สุดจากชุดแรก เส้นมันฝรั่ง 2 มม.ควรร้อนและนุ่ม และกลางก้อนไม่ควรมีแป้งเปียกเหนียว หากผิวนอกสีเข้มแล้วแต่กลางยังแข็งหรือเปียก ให้รักษาน้ำมันใกล้ 165°C/329°F แล้วทอดเพิ่ม 60–90 วินาที จากนั้นผ่าอีกชิ้นตรวจ นี่เป็นเกณฑ์ความสุกและคุณภาพ ไม่ได้มีอุณหภูมิขั้นต่ำเพื่อความปลอดภัยสำหรับปาโกราที่ทอดใหม่จากส่วนผสมแป้งนี้"
  ));
  body(recipe, 5, ml(
    "Drain in one layer on a rack for 3 minutes; do not cover or stack, because trapped steam softens the crust. Serve hot with green chutney while the vegetable edges remain crisp. If a batch softens while waiting, re-crisp it in the oven after reheating it through; do not try to restore crunch by raising the frying oil above the stated range.",
    "瀝油架上單層瀝 3 分鐘，不要覆蓋或堆疊，否則蒸氣會讓外皮變軟。趁蔬菜邊緣仍酥脆時搭配綠醬熱食。若等待時變軟，可先以烤箱充分回熱再烘脆；不要為了恢復酥度而把油溫升過標示範圍。",
    "網に一層に並べて3分油を切ります。蒸気で衣が柔らかくなるため覆ったり重ねたりしません。野菜の端がカリッとしているうちに、グリーンチャツネと熱々で供します。待つ間に柔らかくなった場合は、オーブンで全体を温めてから表面を再度カリッとさせます。揚げ油を指定温度より上げて食感を戻そうとしません。",
    "망 위에 한 겹으로 놓고 3분 기름을 뺍니다. 김이 갇히면 겉이 눅눅해지므로 덮거나 쌓지 않습니다. 채소 가장자리가 바삭할 때 그린 처트니와 뜨겁게 냅니다. 기다리는 동안 눅눅해지면 오븐에서 속까지 데운 뒤 다시 바삭하게 하세요. 바삭함을 되살리려고 기름 온도를 안내 범위보다 높이지 마세요.",
    "พักบนตะแกรงชั้นเดียว 3 นาที อย่าปิดฝาหรือซ้อนกันเพราะไอน้ำจะทำให้แป้งนิ่ม เสิร์ฟร้อนกับชัตนีย์เขียวขณะที่ขอบผักยังกรอบ หากนิ่มระหว่างรอ ให้อุ่นให้ร้อนทั่วในเตาอบแล้วอบต่อให้กรอบ อย่าเพิ่มอุณหภูมิน้ำมันเกินช่วงที่กำหนดเพื่อแก้ความกรอบ"
  ));
  recipe.storage = ml(
    "Best served immediately. If saving, divide into shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; for best quality, use within 2 days. Reheat the centre to 74°C/165°F throughout, the safety minimum for any leftovers, then re-crisp in a 190°C oven. The oil temperature and crisp shell are fresh-quality targets, not safety measurements.",
    "最好立即食用。若要保存，分裝淺盒並於 2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下；為保持最佳品質，請於 2 天內食用。回熱至中心各處達 74°C／165°F，這是各類剩食的安全最低溫度，再以 190°C 烤箱回酥。油溫與酥脆外皮是現做品質目標，不是安全測量值。",
    "できたてをすぐに食べるのが最良です。保存する場合は浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質を保つため2日以内に食べます。再加熱時は残り物全体を安全最低温度の74°C/165°Fにしてから、190°Cのオーブンで再びカリッとさせます。油温や衣の食感は作りたての品質目標で、安全の測定値ではありません。",
    "바로 먹는 것이 가장 좋습니다. 남길 때는 얕은 용기에 나눠 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 2일 안에 먹습니다. 재가열할 때는 모든 남은 음식에 적용되는 안전 최소 온도인 74°C/165°F까지 속을 데운 뒤 190°C 오븐에서 다시 바삭하게 합니다. 기름 온도와 바삭한 껍질은 갓 만든 품질 목표이지 안전 측정값이 아닙니다.",
    "ควรกินทันที หากเก็บให้แบ่งใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 2 วัน อุ่นใจกลางให้ทั่วถึง 74°C/165°F ซึ่งเป็นอุณหภูมิขั้นต่ำเพื่อความปลอดภัยของอาหารเหลือทุกชนิด แล้วนำเข้าเตาอบ 190°C ให้กรอบอีกครั้ง อุณหภูมิน้ำมันและเปลือกกรอบเป็นเป้าหมายคุณภาพของอาหารทำใหม่ ไม่ใช่ค่าความปลอดภัย"
  );
  recipe.tips[0] = ml(
    "Keep the oil at 165–175°C/329–347°F for even browning. This range controls frying quality; it is not a food-safety endpoint.",
    "油溫維持 165–175°C／329–347°F 才能均勻上色。此範圍控制油炸品質，不是食安熟度終點。",
    "均一に色づけるため油温を165〜175°C/329〜347°Fに保ちます。これは揚げ具合の目標で、食品安全の終点温度ではありません。",
    "고르게 갈색이 나도록 기름을 165–175°C/329–347°F로 유지하세요. 이 범위는 튀김 품질 목표이며 식품 안전 종점 온도가 아닙니다.",
    "รักษาน้ำมันที่ 165–175°C/329–347°F เพื่อให้สีสม่ำเสมอ ช่วงนี้เป็นเป้าหมายคุณภาพการทอด ไม่ใช่อุณหภูมิปลายทางเพื่อความปลอดภัย"
  );
  recipe.commonMistakes[0] = ml(
    "Do not taste the besan batter to adjust salt; raw flour is not ready-to-eat and may contain harmful bacteria. Taste only after a pakora is fully fried.",
    "不要試吃鷹嘴豆粉生麵糊來調鹹度；生粉不是即食食品，可能含有致病細菌。必須炸熟後才能試味。",
    "塩加減を見るためにひよこ豆粉の生地を味見しません。生の粉はそのまま食べる食品ではなく、有害な細菌を含むことがあります。パコラを揚げ切ってから味を確認します。",
    "소금 간을 보려고 생 병아리콩가루 반죽을 맛보지 마세요. 생가루는 바로 먹는 식품이 아니며 해로운 세균이 있을 수 있습니다. 파코라를 완전히 튀긴 뒤 맛을 보세요.",
    "อย่าชิมแป้งถั่วลูกไก่ดิบเพื่อปรับเค็ม เพราะแป้งดิบไม่ใช่อาหารพร้อมกินและอาจมีแบคทีเรียที่เป็นอันตราย ชิมได้หลังทอดปาโกราจนสุกทั่วแล้ว"
  );
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "FDA — Flour Is a Raw Food and Other Safety Facts", rawFlour);
  return recipe;
}

function reviseGratinDauphinois(recipe) {
  prepare(recipe);
  body(recipe, 5, ml(
    "Bake at 180°C for 30–40 minutes until the top is golden. Check two things separately: a food thermometer in the centre must read at least 74°C/165°F, the official safety minimum for meatless casseroles, and a thin knife must slide through the potato layers with almost no resistance for tender texture. The temperature is a safety floor, not the tenderness cue. If the top darkens first, cover loosely with foil; if the centre is still firm after reaching 74°C, continue covered in 5-minute increments and retest the knife.",
    "以 180°C 烘烤 30–40 分鐘，直到表面金黃。分開檢查兩件事：溫度計插入中心須至少達 74°C／165°F，這是官方規定無肉砂鍋料理的安全最低溫度；薄刀也須幾乎無阻力地穿過馬鈴薯層，這才是柔軟口感目標。溫度是安全底線，不代表馬鈴薯已軟。若表面先變深色，鬆鬆蓋上鋁箔；若已達 74°C 但中心仍硬，繼續加蓋烤，每次 5 分鐘再用薄刀重測。",
    "180°Cで30〜40分焼き、表面がきつね色になったら確認します。2つの点を別々に見ます。中心に温度計を差し、肉を含まないキャセロールの公式安全最低温度である74°C/165°F以上を確認します。さらに薄いナイフがじゃがいもの層をほぼ抵抗なく通ることを、柔らかさの目安にします。温度は安全上の下限で、柔らかさの合図ではありません。先に表面が濃く色づいたらアルミホイルをふんわりかぶせます。74°Cに達しても中心が硬ければ、覆ったまま5分ずつ焼き、ナイフで再確認します。",
    "180°C에서 30–40분 구워 윗면이 노릇해질 때까지 익힙니다. 두 가지를 따로 확인합니다. 중심에 온도계를 꽂아 고기가 없는 캐서롤에 대한 공식 안전 최소 온도인 74°C/165°F 이상인지 확인합니다. 또 얇은 칼이 감자 층을 거의 저항 없이 통과해야 부드러운 식감이 됩니다. 온도는 안전 하한이지 감자가 부드럽다는 신호는 아닙니다. 윗면이 먼저 짙어지면 호일을 느슨하게 덮습니다. 74°C에 도달했는데도 중심이 단단하면 덮은 채 5분씩 더 굽고 칼로 다시 확인합니다.",
    "อบที่ 180°C นาน 30–40 นาทีจนหน้าสีทอง ตรวจแยกกันสองอย่าง ใช้เทอร์โมมิเตอร์วัดตรงกลาง ต้องอย่างน้อย 74°C/165°F ซึ่งเป็นอุณหภูมิขั้นต่ำอย่างเป็นทางการเพื่อความปลอดภัยของอาหารอบแบบแคสเซอโรลที่ไม่มีเนื้อสัตว์ และใช้มีดบางจิ้มผ่านชั้นมันฝรั่งได้แทบไม่มีแรงต้านเพื่อให้ได้ความนุ่ม อุณหภูมิเป็นค่าขั้นต่ำด้านความปลอดภัย ไม่ใช่สัญญาณว่ามันฝรั่งนุ่มแล้ว หากหน้าสีเข้มก่อนให้คลุมฟอยล์หลวม ๆ หากถึง 74°C แล้วแต่กลางยังแข็ง ให้อบต่อโดยคลุมครั้งละ 5 นาทีแล้วตรวจด้วยมีดอีกครั้ง"
  ));
  recipe.tips[0] = ml(
    "Slice every potato 3 mm thick. Uniform slices soften at the same rate; the knife test checks texture after the casserole has reached its safety temperature.",
    "馬鈴薯切成一致的 3 毫米薄片，才能同時變軟；砂鍋達安全溫度後，再用薄刀檢查口感。",
    "じゃがいもをすべて3mm厚に切ると同じ速さで柔らかくなります。安全温度に達した後、ナイフで食感を確認します。",
    "감자를 모두 3mm 두께로 썰면 같은 속도로 부드러워집니다. 캐서롤이 안전 온도에 도달한 뒤 칼로 식감을 확인하세요.",
    "หั่นมันฝรั่งทุกชิ้นหนา 3 มม.ให้เท่ากันเพื่อให้นุ่มพร้อมกัน ตรวจเนื้อสัมผัสด้วยมีดหลังอาหารอบถึงอุณหภูมิปลอดภัยแล้ว"
  );
  recipe.commonMistakes[0] = ml(
    "If cream sticks or browns on the saucepan base while pre-cooking, lower the heat and lift the potatoes gently; do not scrape burnt milk into the dish. If a knife still meets resistance after baking, keep the dish covered and continue in 5-minute increments.",
    "預煮時若奶油黏底或鍋底泛褐，先轉小火並輕輕翻動馬鈴薯；不要把燒焦奶液刮進烤盤。烘烤後若薄刀仍遇到阻力，加蓋並每次續烤 5 分鐘。",
    "下ゆで中に鍋底のクリームが貼り付いたり茶色くなったりしたら、火を弱めてじゃがいもをそっと返します。焦げた乳製品を料理にこそげ入れません。焼いた後もナイフが引っかかる場合は覆い、5分ずつ追加で焼きます。",
    "감자를 미리 익힐 때 크림이 냄비 바닥에 붙거나 갈색으로 변하면 불을 낮추고 감자를 조심히 들어 올립니다. 탄 우유를 긁어 넣지 마세요. 구운 뒤에도 칼에 저항이 느껴지면 덮고 5분씩 더 굽습니다.",
    "หากครีมติดหรือเป็นสีน้ำตาลที่ก้นหม้อระหว่างต้มมันฝรั่ง ให้ลดไฟและพลิกมันฝรั่งเบา ๆ อย่าขูดนมที่ไหม้ลงในจาน หากอบแล้วยังมีดติด ให้คลุมและอบต่อครั้งละ 5 นาที"
  );
  recipe.storage = ml(
    "Rest the freshly baked gratin for 15 minutes so the cream settles; the thin-knife test is the texture goal. For leftovers, divide into shallow containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; for best quality, use within 3 days. Reheat only the portion to eat until the centre reaches 74°C/165°F throughout; that is the safety minimum for reheated leftovers, not a fresh doneness cue.",
    "新鮮出爐後靜置 15 分鐘讓奶油醬汁穩定；薄刀測試才是口感目標。剩食分裝淺盒，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下；為保持最佳品質，請於 3 天內食用。只取要吃的份量回熱至中心各處達 74°C／165°F；這是回熱剩食的安全最低溫度，不是新做時的熟度判斷。",
    "焼きたてはクリームが落ち着くよう15分休ませます。薄いナイフで確かめるのが食感の目安です。残りは浅い容器に分け、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質を保つため3日以内に使います。食べる分だけ中心が全体に74°C/165°Fに達するまで温めます。これは温め直す残り物の安全最低温度で、作りたての火通りの合図ではありません。",
    "갓 구운 그라탱은 크림이 자리를 잡도록 15분 둡니다. 얇은 칼 검사가 식감 목표입니다. 남은 음식은 얕은 용기에 나눠 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 3일 안에 먹습니다. 먹을 만큼만 중심까지 74°C/165°F가 되도록 데웁니다. 이는 남은 음식을 다시 데울 때의 안전 최소 온도이지 갓 만든 음식의 익힘 신호는 아닙니다.",
    "พักกราแตงที่เพิ่งอบ 15 นาทีให้ครีมเซ็ต การใช้มีดบางตรวจคือเป้าหมายเนื้อสัมผัส ของเหลือแบ่งใส่ภาชนะตื้น แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 3 วัน อุ่นเฉพาะส่วนที่จะกินให้กลางถึง 74°C/165°F ทั่วถึง ซึ่งเป็นอุณหภูมิขั้นต่ำเพื่อความปลอดภัยของอาหารเหลือที่อุ่นซ้ำ ไม่ใช่เกณฑ์ความสุกของกราแตงที่ทำใหม่"
  );
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  return recipe;
}

function reviseKelewele(recipe) {
  prepare(recipe);
  body(recipe, 0, ml(
    "Rinse the whole plantains under running water and dry them before peeling. Cut each lengthwise, then into even 2.5 cm cubes. Pat the cut faces dry so the spice paste clings; uneven pieces brown at different rates and make the centre check unreliable.",
    "整根大蕉先在流水下沖洗並擦乾，再剝皮。每根縱切後切成大小一致的 2.5 公分方塊。切面擦乾讓香料醬能附著；大小不一會上色速度不同，也難以判斷中心熟度。",
    "プランテンは皮をむく前に流水で洗い、拭いて乾かします。縦半分に切ってから、均一な2.5cm角にします。切り口を拭いて乾かすとスパイスペーストが付きやすくなります。大きさが不揃いだと色づく速さが異なり、中心の火通りも判断しにくくなります。",
    "플랜테인은 껍질을 벗기기 전에 흐르는 물에 씻고 말립니다. 세로로 자른 뒤 2.5cm 크기로 균일하게 깍둑썹니다. 자른 면을 닦아야 향신료 페이스트가 잘 붙습니다. 크기가 들쭉날쭉하면 익는 속도가 달라 중심 익힘을 확인하기 어렵습니다.",
    "ล้างกล้วยแพลนเทนทั้งลูกใต้ก๊อกน้ำและเช็ดให้แห้งก่อนปอก ผ่าตามยาวแล้วหั่นเต๋าขนาด 2.5 ซม.ให้เท่ากัน ซับผิวที่ตัดให้แห้งเพื่อให้เครื่องเทศเกาะดี ชิ้นไม่เท่ากันจะเปลี่ยนสีเร็วต่างกันและตรวจแกนสุกได้ยาก"
  ));
  body(recipe, 1, ml(
    "Blend the ginger, garlic, onion, chile, cloves, pepper, salt, and listed 30 ml water into a thick paste. Stop and scrape the blender once; the paste should cling to a spoon rather than pour. If it is watery, drain it through a fine sieve for 2 minutes before coating so it will not slide off or spit in the oil.",
    "將薑、蒜、洋蔥、辣椒、丁香、胡椒、鹽與材料所列 30 毫升水打成濃稠醬。停下來刮一次攪拌杯；醬應能附在湯匙上，不會流淌。若太稀，先用細網瀝 2 分鐘再裹大蕉，避免醬料滑落或在油中噴濺。",
    "しょうが、にんにく、玉ねぎ、唐辛子、クローブ、こしょう、塩、材料欄の水30mlを、濃いペーストになるまで攪拌します。一度止めてブレンダーの側面をこそげます。スプーンにまとわり、流れ落ちない濃さが目安です。水っぽい場合は細かいざるで2分水切りしてから絡め、油の中で滑ったり跳ねたりしないようにします。",
    "생강, 마늘, 양파, 고추, 정향, 후추, 소금과 재료에 적힌 물 30ml를 걸쭉한 페이스트로 갑니다. 한 번 멈춰 블렌더 벽을 긁어 내세요. 페이스트는 숟가락에 묻어 있고 흘러내리지 않아야 합니다. 묽으면 플랜테인에 바르기 전에 고운 체에 2분 받쳐 기름 속에서 흘러내리거나 튀지 않게 합니다.",
    "ปั่นขิง กระเทียม หัวหอม พริก กานพลู พริกไทย เกลือ และน้ำ 30 มล.ตามรายการวัตถุดิบให้เป็นเพสต์ข้น หยุดปั่นหนึ่งครั้งแล้วปาดขอบโถ เพสต์ควรเกาะช้อนไม่ไหล หากเหลวให้กรองผ่านตะแกรงละเอียด 2 นาทีก่อนคลุก เพื่อไม่ให้หลุดหรือกระเด็นในน้ำมัน"
  ));
  body(recipe, 2, ml(
    "Toss the cubes with the paste until every face is coated and rest for 10 minutes while the oil heats. If a puddle collects in the bowl, lift the plantain out with a slotted spoon rather than pouring liquid into the hot oil. Keep the batches separate until frying so the coating stays on the fruit.",
    "大蕉塊與香料醬拌勻，讓每面都裹到，靜置 10 分鐘並同時加熱油。若碗底積有液體，用漏勺撈出大蕉，不要把液體倒入熱油。分批備炸，讓香料醬留在果肉上。",
    "角切りの全ての面にペーストを絡め、油を熱する間に10分置きます。ボウルの底に液体がたまったら、液体を熱い油に注がず、穴あきお玉でプランテンだけを取り出します。衣が果肉に残るよう、揚げるまでバッチを分けておきます。",
    "플랜테인 큐브의 모든 면에 페이스트를 묻혀 10분 재우는 동안 기름을 달굽니다. 그릇 바닥에 액체가 고이면 뜨거운 기름에 붓지 말고 구멍 국자로 플랜테인만 건져 냅니다. 튀길 때까지 분량별로 나눠 양념이 과육에 붙어 있게 합니다.",
    "คลุกก้อนแพลนเทนกับเพสต์ให้เคลือบทุกด้าน พัก 10 นาทีระหว่างตั้งน้ำมัน หากมีน้ำขังที่ก้นชามให้ใช้กระชอนตักแต่กล้วยขึ้น อย่าเทของเหลวลงในน้ำมันร้อน แยกเป็นชุดไว้จนกว่าจะทอดเพื่อให้เครื่องเทศติดผลไม้"
  ));
  body(recipe, 3, ml(
    "Heat the 1.2 L oil in a heavy pot no more than half full to 175°C/347°F; this is a browning and texture target, not a food-safety minimum. Fry one uncrowded layer for 3–4 minutes, turning once. Split the largest cube: the centre should be hot and uniformly soft but still hold its shape. If the corners darken while the centre is firm, reduce the oil to 165°C/329°F and fry 60–90 seconds more. If the cubes look pale and greasy, remove them, let the oil recover to 175°C, and fry a smaller batch.",
    "厚鍋中的 1.2 公升油最多裝至半鍋，加熱至 175°C／347°F；這是上色與口感目標，不是食安最低溫度。單層、不擁擠炸 3–4 分鐘，中途翻面一次。切開最大塊，中心應熱透、均勻柔軟但仍能定形。若邊角已變深而中心仍硬，降至 165°C／329°F 再炸 60–90 秒。若顏色蒼白且油膩，先撈出大蕉，待油回升至 175°C 再減量重炸。",
    "厚手鍋に油1.2Lを鍋の半分以下まで入れ、175°C/347°Fに熱します。これは色づきと食感の目標で、安全上の最低温度ではありません。詰め込まず一層で3〜4分、途中で一度返します。最も大きい角切りを割り、中心まで熱く、均一に柔らかいが形を保つことを確認します。角が濃く色づいて中心が硬い場合は165°C/329°Fに下げ、さらに60〜90秒揚げます。色が薄く油っぽい場合は取り出し、油が175°Cに戻ってから少量ずつ揚げ直します。",
    "두꺼운 냄비에 기름 1.2L를 냄비 절반 이하로 붓고 175°C/347°F까지 달굽니다. 이는 갈변과 식감 목표이지 식품 안전 최소 온도가 아닙니다. 한 겹으로 여유 있게 담아 3–4분 튀기고 한 번 뒤집습니다. 가장 큰 조각을 잘라 중심까지 뜨겁고 고르게 부드러우면서 형태를 유지하는지 확인합니다. 모서리가 짙어졌는데 중심이 단단하면 기름을 165°C/329°F로 낮춰 60–90초 더 튀깁니다. 색이 흐리고 기름지면 건져 내고 기름이 175°C로 회복된 뒤 더 적은 양으로 튀깁니다.",
    "ตั้งน้ำมัน 1.2 ลิตรในหม้อก้นหนาโดยเติมไม่เกินครึ่งหม้อให้ถึง 175°C/347°F นี่เป็นเป้าหมายด้านสีและเนื้อสัมผัส ไม่ใช่อุณหภูมิขั้นต่ำเพื่อความปลอดภัย ทอดเป็นชั้นเดียวไม่แน่น 3–4 นาที กลับหนึ่งครั้ง ผ่าชิ้นใหญ่ที่สุดดูว่าแกนร้อนและนุ่มสม่ำเสมอแต่ยังคงรูป หากมุมสีเข้มแต่แกนยังแข็ง ให้ลดน้ำมันเหลือ 165°C/329°F แล้วทอดเพิ่ม 60–90 วินาที หากสีซีดและมันเยิ้ม ให้ตักขึ้น รอให้น้ำมันกลับถึง 175°C แล้วทอดชุดเล็กลง"
  ));
  body(recipe, 4, ml(
    "Drain on a rack for 2 minutes so steam can escape, then serve hot with the 80 g roasted peanuts. Keep peanuts out of the frying oil and use a clean serving bowl. If the plantains soften while waiting, re-crisp briefly in a hot oven after reheating them through; avoid a second long fry, which can dry the centre.",
    "放在網架瀝 2 分鐘讓蒸氣散出，再搭配 80 公克烤花生趁熱食用。花生不要碰到炸油，並使用乾淨盛盤。若大蕉等待時變軟，充分回熱後再以熱烤箱短烤回脆；避免長時間二次油炸，否則中心會變乾。",
    "網で2分油を切り、蒸気を逃がしてから、ローストピーナッツ80gと熱々で供します。ピーナッツを揚げ油に入れず、清潔な盛り皿を使います。待つ間に柔らかくなった場合は、全体を温めてから熱いオーブンで短時間カリッとさせます。長く二度揚げすると中心が乾くので避けます。",
    "망 위에서 2분 기름을 빼 김을 날린 뒤 볶은 땅콩 80g과 뜨겁게 냅니다. 땅콩이 튀김 기름에 닿지 않게 하고 깨끗한 그릇을 사용하세요. 기다리는 동안 플랜테인이 눅눅해지면 속까지 데운 뒤 뜨거운 오븐에 잠깐 넣어 다시 바삭하게 합니다. 오래 두 번 튀기면 속이 마르므로 피하세요.",
    "พักบนตะแกรง 2 นาทีให้ไอน้ำออก แล้วเสิร์ฟร้อนกับถั่วลิสงคั่ว 80 กรัม อย่าให้ถั่วโดนน้ำมันทอดและใช้จานสะอาด หากกล้วยนิ่มระหว่างรอ ให้อุ่นให้ร้อนทั่วก่อนแล้วเข้าเตาอบร้อนช่วงสั้น ๆ ให้กลับมากรอบ หลีกเลี่ยงการทอดซ้ำนานเพราะแกนจะแห้ง"
  ));
  recipe.storage = ml(
    "Best served hot. Refrigerate leftovers in a shallow clean container within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; for best quality, use within 2 days. Reheat to 74°C/165°F throughout, the official safety minimum for leftovers of any type, then briefly crisp in a hot oven or air fryer. The 175°C frying oil target is for texture only.",
    "趁熱食用最佳。剩食放入乾淨淺盒，2 小時內冷藏（環境高於 32°C／90°F 時 1 小時內），保持 4°C／40°F 或以下；為保持最佳品質，請於 2 天內食用。回熱至各處達 74°C／165°F，這是官方規定各類剩食的安全最低溫度，再以熱烤箱或氣炸鍋短暫回脆。175°C 炸油目標只關乎口感。",
    "揚げたてを熱いうちに食べるのが最良です。残りは清潔な浅い容器に入れ、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。品質を保つため2日以内に食べます。残り物全般の公式安全最低温度である74°C/165°Fまで全体を再加熱し、その後オーブンかエアフライヤーで短時間カリッとさせます。油の175°Cは食感の目標に限られます。",
    "갓 튀겨 뜨거울 때 먹는 것이 가장 좋습니다. 남은 음식은 깨끗하고 얕은 용기에 담아 2시간 안에(32°C/90°F보다 높으면 1시간 안에) 4°C/40°F 이하로 냉장하고, 최상의 품질을 위해 2일 안에 먹습니다. 모든 종류의 남은 음식에 대한 공식 안전 최소 온도인 74°C/165°F까지 속을 데운 뒤 뜨거운 오븐이나 에어프라이어에서 짧게 바삭하게 합니다. 기름 175°C는 식감 목표일 뿐입니다.",
    "ควรกินตอนร้อน เก็บของเหลือในภาชนะตื้นสะอาด แช่เย็นภายใน 2 ชั่วโมง (ภายใน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า เพื่อคุณภาพที่ดีที่สุดให้กินภายใน 2 วัน อุ่นให้ทั่วถึง 74°C/165°F ซึ่งเป็นอุณหภูมิขั้นต่ำอย่างเป็นทางการของอาหารเหลือทุกชนิด แล้วอบหรือใช้หม้อทอดไร้น้ำมันช่วงสั้น ๆ ให้กรอบ เป้าหมายน้ำมัน 175°C ใช้เพื่อเนื้อสัมผัสเท่านั้น"
  );
  recipe.tips[0] = ml(
    "Use very ripe but firm plantains and keep the cubes even; the peel should be mostly black while the cut pieces still hold their corners.",
    "選外皮大多發黑但果肉仍結實的大蕉，方塊切均勻；切面仍能保持直角才適合油炸。",
    "皮がほとんど黒くても果肉は硬さを保ったプランテンを選び、角切りの大きさを揃えます。切った後も角が保てるものが揚げやすいです。",
    "껍질이 대부분 검지만 과육은 단단한 플랜테인을 고르고 큐브 크기를 맞추세요. 자른 조각의 모서리가 유지되어야 튀기기 좋습니다.",
    "เลือกแพลนเทนสุกจัดแต่ยังแน่น เปลือกดำเกือบทั้งลูกแต่ชิ้นที่หั่นยังคงมุมไว้ได้ และหั่นให้เท่ากัน"
  );
  recipe.commonMistakes[0] = ml(
    "A wet spice paste can slide off and spit in the oil. Keep it thick; drain a watery batch for 2 minutes and lift the coated cubes out without pouring the bowl liquid into the pot.",
    "香料醬太稀會滑落並使熱油噴濺。保持濃稠；若打得太稀，瀝 2 分鐘，再撈出裹醬的大蕉，不要把碗底液體倒進鍋裡。",
    "スパイスペーストが水っぽいと剥がれて油が跳ねます。濃く作り、水っぽい場合は2分水切りし、ボウルの液体を鍋に注がず角切りだけを取り出します。",
    "향신료 페이스트가 묽으면 떨어져 기름이 튑니다. 걸쭉하게 만들고 묽은 경우 2분 체에 받친 뒤 그릇의 액체를 붓지 말고 양념한 플랜테인만 건져 냅니다.",
    "เพสต์ที่เหลวจะหลุดและทำให้น้ำมันกระเด็น ทำให้ข้น หากเหลวให้กรอง 2 นาทีแล้วตักเฉพาะกล้วยที่คลุกแล้ว อย่าเทน้ำก้นชามลงหม้อ"
  );
  addOfficialSource(recipe, "FoodSafety.gov — 4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "FoodSafety.gov — Safe Minimum Internal Temperatures", temperatures);
  return recipe;
}

export function refineEightyFirstMethods(recipes) {
  const revisions = new Map([
    ["tabbouleh", reviseTabbouleh],
    ["vegetable-pakora", reviseVegetablePakora],
    ["gratin-dauphinois", reviseGratinDauphinois],
    ["kelewele", reviseKelewele]
  ]);
  for (let index = 0; index < recipes.length; index += 1) {
    const revise = revisions.get(recipes[index].id);
    if (revise) recipes[index] = revise({ ...recipes[index], ingredients: recipes[index].ingredients.map((row) => ({ ...row, item: { ...row.item } })), storage: { ...recipes[index].storage } });
  }
}
