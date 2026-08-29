// Seven Japanese recipes, independently researched and written for publication.
// Photo provenance is kept in japanese-photos-a.mjs so this data file stays recipe-only.

const ml = (en, zhHant, ja, ko, th) => ({
  en,
  "zh-hant": zhHant,
  ja,
  ko,
  th
});

const ingredient = (amount, item) => ({ amount, item });
const step = (title, body) => ({ title, body });

export const japaneseRecipesA = [
  {
    id: "chicken-teriyaki",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 15,
    cookMinutes: 20,
    totalMinutes: 35,
    servings: 2,
    name: ml("Chicken teriyaki", "日式照燒雞", "鶏の照り焼き", "치킨 데리야키", "ไก่เทอริยากิ"),
    description: ml(
      "Pan-seared chicken thighs are glazed with a balanced soy, mirin, sake, and sugar sauce.",
      "雞腿排煎至金黃，再裹上醬油、味醂、清酒與糖調成的平衡照燒醬。",
      "鶏もも肉を香ばしく焼き、しょうゆ、みりん、酒、砂糖のたれを照りよく絡めます。",
      "닭다리살을 노릇하게 구워 간장, 미림, 사케, 설탕 소스를 윤기 나게 입힙니다.",
      "ไก่สะโพกย่างกระทะจนหอม เคลือบซอสสมดุลจากซีอิ๊ว มิริน สาเก และน้ำตาล"
    ),
    ingredients: [
      ingredient("500 g", ml("boneless skin-on chicken thighs", "去骨帶皮雞腿排", "骨なし皮付き鶏もも肉", "뼈 없는 껍질 있는 닭다리살", "สะโพกไก่ติดหนังเลาะกระดูก")),
      ingredient("10 ml", ml("neutral cooking oil", "中性食用油", "くせのない食用油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("45 ml", ml("light soy sauce", "淡醬油", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("45 ml", ml("mirin", "味醂", "みりん", "미림", "มิริน")),
      ingredient("30 ml", ml("sake", "清酒", "酒", "사케", "สาเก")),
      ingredient("18 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("120 g", ml("Japanese long onion, cut into 5 cm pieces", "日本長蔥，切 5 公分段", "長ねぎ（5cm長さ）", "일본 대파, 5cm 길이", "ต้นหอมญี่ปุ่น หั่นท่อน 5 ซม.")),
      ingredient("300 g", ml("cooked Japanese short-grain rice, for serving", "熟日本短米，供上桌", "炊いた日本短粒米（盛り付け用）", "지은 일본 단립쌀, 곁들임", "ข้าวญี่ปุ่นเมล็ดสั้นหุงสุก สำหรับเสิร์ฟ"))
    ],
    instructions: [
      step(
        ml("Mix the teriyaki sauce", "混合照燒醬", "照り焼きだれを混ぜる", "데리야키 소스 섞기", "ผสมซอสเทอริยากิ"),
        ml(
          "Stir the soy sauce, mirin, sake, and sugar until the sugar is mostly dissolved; keep the sauce refrigerated while preparing the chicken.",
          "將淡醬油、味醂、清酒與砂糖攪拌至糖大致溶解；處理雞肉期間將醬汁冷藏。",
          "しょうゆ、みりん、酒、砂糖を砂糖がほぼ溶けるまで混ぜ、鶏肉を準備する間は冷蔵します。",
          "간장, 미림, 사케, 설탕을 설탕이 거의 녹을 때까지 섞고 닭을 준비하는 동안 냉장합니다.",
          "คนซีอิ๊ว มิริน สาเก และน้ำตาลจนเกือบละลาย แล้วแช่เย็นซอสระหว่างเตรียมไก่"
        )
      ),
      step(
        ml("Prepare the chicken", "處理雞腿排", "鶏肉を整える", "닭 손질하기", "เตรียมไก่"),
        ml(
          "Pat the chicken dry, trim loose fat, and pierce the skin several times with a fork so it cooks evenly and lets the glaze cling.",
          "將雞肉擦乾、修掉鬆散脂肪，再用叉子在雞皮上戳數下，使受熱均勻並讓醬汁附著。",
          "鶏肉の水気を拭き、余分な脂を取り、皮をフォークで数か所刺して火通りとたれのなじみをよくします。",
          "닭의 물기를 닦고 늘어진 지방을 정리한 뒤 껍질을 포크로 여러 번 찔러 고르게 익고 소스가 붙게 합니다.",
          "ซับไก่ให้แห้ง ตัดไขมันส่วนเกิน แล้วใช้ส้อมจิ้มหนังหลายครั้งเพื่อให้สุกทั่วและซอสเกาะดี"
        )
      ),
      step(
        ml("Briefly marinate", "短暫醃漬", "短く漬ける", "짧게 재우기", "หมักสั้น ๆ"),
        ml(
          "Place the chicken skin-side up in a covered dish, pour over 30 ml of the sauce, and refrigerate for 10 minutes; reserve the rest for cooking.",
          "雞肉皮面朝上放入有蓋容器，淋入 30 毫升醬汁，冷藏 10 分鐘；其餘醬汁留作烹調。",
          "鶏肉を皮を上にしてふた付き容器に入れ、たれ30mlをかけて10分冷蔵し、残りは加熱用に取っておきます。",
          "닭을 껍질이 위로 오게 밀폐 용기에 넣고 소스 30ml를 부어 10분 냉장합니다. 나머지는 조리에 둡니다.",
          "วางไก่หนังขึ้นในภาชนะมีฝา ราดซอส 30 มล. แช่เย็น 10 นาที แล้วเก็บซอสที่เหลือไว้ปรุง"
        )
      ),
      step(
        ml("Sear the skin", "煎雞皮面", "皮目を焼く", "껍질 굽기", "จี่ด้านหนัง"),
        ml(
          "Preheat a heavy skillet over medium heat, add the oil, and scrape every drop of the 30 ml marinade that touched the raw chicken into the waste bowl; discard it. Place the chicken skin-side down and cook for 6–7 minutes until deeply golden. Sear the long-onion pieces in the open space until lightly browned.",
          "厚底平底鍋以中火預熱後加油；所有接觸過生雞肉的 30 毫升醃汁都刮入廢棄碗並丟棄。雞肉皮面朝下放入，煎 6–7 分鐘至深金黃，同時在空位煎日本長蔥至略上色。",
          "厚手のフライパンを中火で予熱して油を入れ、生の鶏肉に触れた30mlのたれは一滴残さず廃棄容器へ移して捨てます。鶏肉を皮目を下にして6～7分、濃いきつね色まで焼き、空いた場所で長ねぎも軽く焼き色を付けます。",
          "두꺼운 팬을 중불로 예열해 기름을 두르고 생닭에 닿은 양념 30ml는 한 방울도 남기지 말고 폐기 용기에 덜어 버립니다. 닭을 껍질 아래로 놓아 6–7분 진한 황금색이 되게 굽고 빈 공간에서 대파도 살짝 갈색을 냅니다.",
          "อุ่นกระทะหนาด้วยไฟกลาง ใส่น้ำมัน แล้วเทซอสหมัก 30 มล. ที่สัมผัสไก่ดิบทุกหยดลงภาชนะทิ้งและทิ้งไป วางไก่ด้านหนังลงจี่ 6–7 นาทีจนเหลืองเข้ม และจี่ต้นหอมญี่ปุ่นในพื้นที่ว่างให้มีสีเล็กน้อย"
        )
      ),
      step(
        ml("Cook the second side", "煎熟另一面", "裏面を焼く", "반대쪽 익히기", "ปรุงอีกด้าน"),
        ml(
          "Turn the chicken and the onion pieces. Cook the chicken for 3–4 minutes, covering briefly if thick, and check the thickest centre with a thermometer; it must reach 74°C. Remove the browned onion when tender.",
          "翻面並翻動長蔥，雞肉再煎 3–4 分鐘；若較厚可短暫加蓋，並以溫度計測最厚中心，必須達 74°C。長蔥柔軟上色後先取出。",
          "鶏肉と長ねぎを返します。鶏肉を3～4分焼き、厚い部分は短時間ふたをして最厚部を温度計で測り74℃にします。長ねぎは柔らかく焼けたら先に取り出します。",
          "닭과 대파를 뒤집습니다. 닭은 3–4분 익히고 두꺼우면 잠깐 덮어 가장 두꺼운 중심이 74°C인지 온도계로 확인합니다. 부드럽게 구워진 대파는 먼저 덜어냅니다.",
          "กลับไก่และต้นหอม ปรุงไก่อีก 3–4 นาที หากหนาให้ปิดฝาชั่วครู่ ตรวจใจกลางส่วนหนาสุดให้ถึง 74°C ตักต้นหอมที่นุ่มและมีสีออกก่อน"
        )
      ),
      step(
        ml("Reduce the sauce", "收濃醬汁", "たれを煮詰める", "소스 졸이기", "เคี่ยวซอสให้ข้น"),
        ml(
          "Transfer the cooked chicken to a clean plate. Pour the reserved sauce into the same skillet and simmer 2–3 minutes until glossy and lightly syrupy.",
          "將熟雞肉移到乾淨盤中。把預留醬汁倒入原鍋，小火煮 2–3 分鐘至發亮、略呈糖漿狀。",
          "焼けた鶏肉を清潔な皿に移します。同じフライパンに残りのたれを入れ、2～3分、つやが出て軽くとろむまで煮詰めます。",
          "익은 닭을 깨끗한 접시에 옮깁니다. 같은 팬에 남은 소스를 넣고 2–3분 윤기 나고 살짝 시럽처럼 될 때까지 졸입니다.",
          "ย้ายไก่สุกใส่จานสะอาด เทซอสที่เหลือลงกระทะเดิม เคี่ยว 2–3 นาทีจนเงาและข้นเล็กน้อย"
        )
      ),
      step(
        ml("Glaze the chicken", "回鍋裹醬", "たれを絡める", "소스 입히기", "เคลือบซอสบนไก่"),
        ml(
          "Return the chicken skin-side up and spoon the reduced sauce over it for 1–2 minutes. Confirm the thickest centre is still at least 74°C.",
          "雞肉皮面朝上放回鍋中，淋上收濃醬汁 1–2 分鐘；確認最厚中心仍至少達 74°C。",
          "鶏肉を皮目を上にして戻し、1～2分たれをかけながら絡めます。最も厚い中心が74℃以上であることを再確認します。",
          "닭을 껍질이 위로 오게 다시 넣고 1–2분 소스를 끼얹어 입힙니다. 가장 두꺼운 중심이 74°C 이상인지 다시 확인합니다.",
          "ใส่ไก่กลับโดยให้หนังขึ้น ราดซอสเคี่ยว 1–2 นาที ตรวจซ้ำว่าใจกลางส่วนหนาสุดอย่างน้อย 74°C"
        )
      ),
      step(
        ml("Rest and serve", "靜置切片上桌", "休ませて盛る", "쉬었다가 담기", "พักแล้วเสิร์ฟ"),
        ml(
          "Rest the chicken for 3 minutes, slice into 1.5 cm pieces, and serve over or beside the hot short-grain rice with the grilled long onion and remaining glaze.",
          "雞肉靜置 3 分鐘，切成 1.5 公分片，搭配熱短米飯、煎好的日本長蔥與剩餘亮醬盛盤或放在飯上。",
          "鶏肉を3分休ませて1.5cm幅に切り、温かい短粒米、焼いた長ねぎ、残った照りだれと一緒に盛ります。",
          "닭을 3분 쉬게 한 뒤 1.5cm 폭으로 썰어 따뜻한 단립쌀, 구운 대파, 남은 윤기 소스와 함께 담습니다.",
          "พักไก่ 3 นาที หั่นหนา 1.5 ซม. เสิร์ฟกับข้าวเมล็ดสั้นร้อน ๆ ต้นหอมญี่ปุ่นย่าง และซอสเงาที่เหลือ"
        )
      )
    ],
    tips: [
      ml("Preheat a heavy skillet over medium heat before adding oil; this gives the skin an even sear and keeps the onion from steaming.", "厚底鍋先以中火預熱再加油，雞皮才能均勻煎香，也能避免長蔥被蒸軟。", "油を入れる前に厚手のフライパンを中火で予熱すると、皮が均一に焼け、長ねぎが蒸れません。", "기름을 넣기 전 두꺼운 팬을 중불로 예열하면 껍질이 고르게 익고 대파가 찌지 않습니다.", "อุ่นกระทะหนาด้วยไฟกลางก่อนใส่น้ำมัน หนังจะเกรียมสม่ำเสมอและต้นหอมไม่ถูกนึ่ง"),
      ml("Keep the reduction gentle; a hard boil can make the sugar scorch before the glaze coats the chicken.", "收汁保持溫和沸騰；大滾會讓糖先焦掉，醬汁還沒裹住雞肉。", "煮詰めは静かに。強く沸かすと鶏肉に絡む前に砂糖が焦げます。", "소스는 잔잔하게 졸이세요. 세게 끓이면 닭에 입히기 전에 설탕이 탑니다.", "เคี่ยวซอสเบา ๆ การเดือดแรงทำให้น้ำตาลไหม้ก่อนเคลือบไก่")
    ],
    commonMistakes: [
      ml("Leaving a thick layer of marinade on the skin prevents crisp browning and can burn in the pan.", "雞皮留著太厚醃汁會妨礙酥脆上色，也可能在鍋中焦掉。", "皮にたれを厚く残すと焼き色がつかず、フライパンで焦げやすくなります。", "껍질에 양념을 두껍게 남기면 바삭하게 갈변하지 않고 팬에서 탈 수 있습니다.", "ปล่อยซอสหมักหนาบนหนังจะไม่กรอบและอาจไหม้ในกระทะ"),
      ml("Cutting immediately can release the juices; wait the full 3 minutes before slicing.", "立刻切片會流失肉汁，請完整靜置 3 分鐘再切。", "すぐに切ると肉汁が流れるので、3分しっかり休ませてから切ります。", "바로 자르면 육즙이 빠지므로 3분 충분히 쉰 뒤 써세요.", "หั่นทันทีจะเสียน้ำในเนื้อ ควรพักครบ 3 นาทีก่อนหั่น")
    ],
    substitutions: [
      ml("Use boneless skinless thighs and add 5 ml oil to the pan; the glaze will still cling, but the skin will not crisp.", "可改用去骨去皮雞腿排，鍋中增加 5 毫升油；醬汁仍會附著，但不會有雞皮酥脆口感。", "骨なし皮なしもも肉なら油を5ml足します。たれは絡みますが、皮の香ばしさは出ません。", "뼈와 껍질 없는 닭다리살을 쓰면 기름 5ml를 더합니다. 소스는 붙지만 껍질의 바삭함은 없습니다.", "ใช้สะโพกไก่เลาะหนังและกระดูกได้ เติมน้ำมัน 5 มล. ซอสยังเกาะแต่จะไม่มีหนังกรอบ"),
      ml("For a non-alcohol version, replace the sake with 30 ml water and add 3 g extra sugar.", "不使用酒精時，清酒改用 30 毫升水，並增加 3 公克糖。", "酒を使わない場合は酒30mlを水30mlに替え、砂糖を3g増やします。", "무알코올로 만들려면 사케 30ml를 물 30ml로 바꾸고 설탕 3g을 더합니다.", "หากไม่ใช้แอลกอฮอล์ เปลี่ยนสาเก 30 มล. เป็นน้ำ 30 มล. และเพิ่มน้ำตาล 3 กรัม")
    ],
    storage: ml("Refrigerate cooled chicken and rice separately in airtight containers for up to 3 days. Reheat the chicken covered until steaming hot and the centre reaches 74°C.", "雞肉與米飯放涼後分開密封冷藏最多 3 天。雞肉加蓋復熱至冒蒸氣，中心達 74°C。", "冷ました鶏肉とご飯は別々に密閉して冷蔵3日まで。鶏肉はふたをして中心74℃まで熱くします。", "식힌 닭과 밥은 따로 밀폐해 냉장 3일까지 보관합니다. 닭은 덮어 중심 74°C까지 김이 나게 데웁니다.", "แช่ไก่และข้าวที่เย็นแล้วแยกภาชนะปิดสนิทได้ไม่เกิน 3 วัน อุ่นไก่แบบปิดจนร้อนมีไอและใจกลางถึง 74°C"),
    cultureNote: ml("Teriyaki describes the Japanese technique of cooking food with a soy-based tare until the surface has a glossy shine; this recipe follows that balance with chicken thighs.", "照燒指以醬油為基底的醬汁烹煮，收至表面有光澤；本配方以雞腿排呈現這種平衡。", "照り焼きはしょうゆを基調とするたれを絡め、表面に照りを出す日本の調理法です。このレシピは鶏もも肉で仕上げます。", "데리야키는 간장 베이스 타레를 졸여 표면에 윤기를 내는 일본식 조리법이며, 이 레시피는 닭다리살로 만듭니다.", "เทอริยากิหมายถึงวิธีปรุงแบบญี่ปุ่นที่เคี่ยวทาเระจากซีอิ๊วให้ผิวเงา สูตรนี้ใช้สะโพกไก่"),
    sources: [
      { title: "Just One Cookbook — Chicken Teriyaki", url: "https://www.justonecookbook.com/chicken-teriyaki/" },
      { title: "Kikkoman — Teriyaki Chicken", url: "https://www.kikkoman.com/en/cookbook/recipe/00000185.html" }
    ],
    imageAlt: ml("Glossy sliced chicken teriyaki with caramelized skin, sauce, and grilled Japanese long onion", "表皮焦香、裹著亮澤醬汁並配煎日本長蔥的切片照燒雞", "香ばしい皮に照りだれをまとい、焼いた長ねぎを添えた鶏の照り焼きの薄切り", "윤기 나는 소스와 노릇한 껍질, 구운 대파를 곁들인 치킨 데리야키 슬라이스", "ไก่เทอริยากิหั่นชิ้นเคลือบซอสเงาและหนังเกรียม เสิร์ฟกับต้นหอมญี่ปุ่นย่าง"),
    visualSpec: "Real finished-dish brief: sliced pan-seared chicken thigh with caramelized skin, a restrained teriyaki glaze, and grilled Japanese long onion pieces; no rice, sesame, or unlisted garnish visible."
  },

  {
    id: "gyudon",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 15,
    cookMinutes: 15,
    totalMinutes: 30,
    servings: 2,
    name: ml("Gyudon (beef rice bowl)", "牛丼", "牛丼", "규동", "กิวด้ง"),
    description: ml(
      "Paper-thin beef and tender onion simmer in a sweet-savory dashi sauce before covering hot rice.",
      "紙薄牛肉與洋蔥在甘鹹柴魚高湯醬汁中燉煮，再覆蓋於熱米飯上。",
      "薄切り牛肉と玉ねぎを甘辛いだしつゆで煮て、温かいご飯にたっぷりのせます。",
      "얇은 소고기와 양파를 달고 짭짤한 다시 소스에 익혀 따뜻한 밥 위에 올립니다.",
      "เนื้อวัวสไลซ์บางกับหอมใหญ่เคี่ยวในซอสดาชิหวานเค็ม แล้วราดบนข้าวร้อน"
    ),
    ingredients: [
      ingredient("300 g", ml("thinly sliced beef chuck or ribeye", "薄切牛肩或肋眼", "牛肩肉またはリブロース薄切り", "얇게 썬 소고기 목심 또는 립아이", "เนื้อวัวส่วนหัวไหล่หรือริบอายสไลซ์บาง")),
      ingredient("200 g", ml("onion, thinly sliced", "洋蔥，薄片", "玉ねぎ（薄切り）", "양파, 얇게 썬 것", "หอมใหญ่สไลซ์บาง")),
      ingredient("240 ml", ml("dashi stock", "柴魚高湯", "だし", "다시 육수", "น้ำดาชิ")),
      ingredient("30 ml", ml("sake", "清酒", "酒", "사케", "สาเก")),
      ingredient("30 ml", ml("mirin", "味醂", "みりん", "미림", "มิริน")),
      ingredient("45 ml", ml("light soy sauce", "淡醬油", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("18 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("360 g", ml("cooked Japanese short-grain rice", "熟日本短米", "炊いた日本短粒米", "지은 일본 단립쌀", "ข้าวญี่ปุ่นเมล็ดสั้นหุงสุก")),
      
    ],
    instructions: [
      step(
        ml("Keep the rice hot", "保持米飯溫熱", "ご飯を温かく保つ", "밥 따뜻하게 두기", "รักษาข้าวให้ร้อน"),
        ml("Cook the short-grain rice before starting and keep 360 g covered and hot so the beef broth is absorbed immediately.", "先煮好短米，將 360 公克米飯加蓋保溫，讓牛肉湯汁能立即被吸收。", "短粒米を先に炊き、360gをふたをして温かく保ち、牛肉のつゆをすぐ吸わせます。", "단립쌀을 먼저 지어 360g을 덮어 따뜻하게 두어 소고기 국물이 바로 배게 합니다.", "หุงข้าวเมล็ดสั้นก่อน เก็บ 360 กรัมแบบปิดฝาให้ร้อนเพื่อดูดน้ำซอสทันที")
      ),
      step(
        ml("Prepare beef and onion", "處理牛肉與洋蔥", "牛肉と玉ねぎを切る", "소고기와 양파 준비", "เตรียมเนื้อและหอมใหญ่"),
        ml("If needed, chill the beef in the freezer for 10 minutes, then cut it into 7–8 cm pieces; slice the onion thinly.", "若需要，牛肉先放冷凍庫 10 分鐘，再切成 7–8 公分片；洋蔥切薄片。", "必要なら牛肉を冷凍庫で10分冷やし、7～8cmに切ります。玉ねぎは薄切りにします。", "필요하면 소고기를 냉동실에 10분 두었다가 7–8cm로 자르고 양파는 얇게 썹니다.", "หากจำเป็น แช่เนื้อในช่องแข็ง 10 นาทีแล้วหั่นยาว 7–8 ซม. สไลซ์หอมใหญ่บาง ๆ")
      ),
      step(
        ml("Make the cold-pan broth", "冷鍋混合湯汁", "冷たい鍋でつゆを作る", "찬 팬에 국물 만들기", "ทำน้ำซอสในกระทะเย็น"),
        ml("In a cold wide skillet, stir the dashi, sake, mirin, soy sauce, and sugar until evenly combined; do not heat yet.", "在冷的寬鍋中攪拌柴魚高湯、清酒、味醂、淡醬油與砂糖至均勻；先不要加熱。", "冷たい広いフライパンで、だし、酒、みりん、しょうゆ、砂糖を混ぜ、まだ火にかけません。", "차가운 넓은 팬에 다시, 사케, 미림, 간장, 설탕을 넣어 섞고 아직 불을 켜지 않습니다.", "ผสมน้ำดาชิ สาเก มิริน ซีอิ๊ว และน้ำตาลในกระทะเย็นให้เข้ากัน ยังไม่ต้องเปิดไฟ")
      ),
      step(
        ml("Soften the onion", "煮軟洋蔥", "玉ねぎを煮る", "양파 익히기", "ต้มให้หอมนุ่ม"),
        ml("Scatter the onion into the broth, bring it to a gentle simmer over medium heat, and cook for 5–6 minutes until translucent and tender.", "將洋蔥散入湯汁，中火煮至溫和沸騰，續煮 5–6 分鐘至半透明柔軟。", "玉ねぎをつゆに広げ、中火で静かに煮立て、半透明で柔らかくなるまで5～6分煮ます。", "양파를 국물에 펼쳐 넣고 중불에서 잔잔하게 끓여 5–6분, 반투명하고 부드럽게 익힙니다.", "ใส่หอมใหญ่กระจายในน้ำซอส ต้มเดือดอ่อนด้วยไฟกลาง 5–6 นาทีจนนุ่มใส")
      ),
      step(
        ml("Simmer the beef", "燉煮牛肉", "牛肉を煮る", "소고기 끓이기", "เคี่ยวเนื้อวัว"),
        ml("Separate the beef slices and add them in a single layer. Simmer 3–4 minutes, skimming foam, until no pink remains and the thickest piece reaches 71°C.", "將牛肉片分開平鋪加入，煮 3–4 分鐘並撇除浮沫，至不再粉紅且最厚處達 71°C。", "牛肉をほぐして一枚ずつ加え、3～4分煮ます。アクを取り、赤みがなく最も厚い部分が71℃になるまで加熱します。", "소고기 조각을 풀어 한 겹으로 넣고 3–4분 끓이며 거품을 걷습니다. 분홍색이 사라지고 가장 두꺼운 곳이 71°C가 되게 합니다.", "แยกชิ้นเนื้อใส่ให้เป็นชั้นเดียว เคี่ยว 3–4 นาที ช้อนฟองออกจนไม่มีสีชมพูและส่วนหนาสุดถึง 71°C")
      ),
      step(
        ml("Settle the broth", "回穩湯汁", "つゆをなじませる", "국물 배게 하기", "พักให้น้ำซอสซึม"),
        ml("Turn off the heat and leave the beef and onion in the broth, covered, for 2 minutes so the flavour settles without overcooking the beef.", "關火後加蓋，讓牛肉與洋蔥留在湯汁中 2 分鐘，使味道回穩且避免牛肉過熟。", "火を止め、ふたをして牛肉と玉ねぎをつゆに2分置き、味をなじませつつ煮すぎないようにします。", "불을 끄고 덮어 소고기와 양파를 국물에 2분 두어 맛을 안정시키되 너무 익히지 않습니다.", "ปิดไฟปิดฝาพักเนื้อกับหอมใหญ่ในน้ำซอส 2 นาทีให้รสเข้ากันโดยไม่ให้เนื้อสุกเกิน")
      ),
      step(
        ml("Season the bowls", "盛碗淋汁", "丼に盛る", "그릇에 담기", "จัดลงชาม"),
        ml("Divide the hot rice between two donburi bowls and ladle a little broth over it before adding the beef and onion.", "將熱米飯分入兩個丼碗，先淋少量湯汁，再放上牛肉與洋蔥。", "温かいご飯を丼2杯に分け、牛肉と玉ねぎをのせる前につゆを少量かけます。", "뜨거운 밥을 덮밥 두 그릇에 나누고 소고기와 양파를 올리기 전에 국물을 조금 끼얹습니다.", "แบ่งข้าวร้อนใส่ชามด้ง 2 ใบ ราดน้ำซอสเล็กน้อยก่อนวางเนื้อและหอมใหญ่")
      ),
      step(
        ml("Serve without garnish", "不加裝飾上桌", "薬味なしで盛る", "고명 없이 내기", "เสิร์ฟโดยไม่ใส่เครื่องตกแต่ง"),
        ml("Top each bowl with the beef and tender onion, spoon over only enough hot broth to moisten the rice, and serve immediately without additional garnish.", "將牛肉與柔軟洋蔥放在每碗飯上，只淋足以潤濕米飯的熱湯汁，立即上桌，不加其他裝飾。", "牛肉と柔らかな玉ねぎを盛り、ご飯が湿る程度の熱いつゆだけをかけ、薬味を足さずにすぐ出します。", "각 그릇에 소고기와 부드러운 양파를 올리고 밥이 촉촉해질 만큼만 뜨거운 국물을 끼얹어 추가 고명 없이 바로 냅니다.", "วางเนื้อกับหอมใหญ่นุ่มบนข้าว ราดน้ำซอสร้อนแค่พอชุ่ม แล้วเสิร์ฟทันทีโดยไม่เติมเครื่องตกแต่ง")
      )
    ],
    tips: [
      ml("Use well-marbled beef and stop as soon as it loses its pink colour; prolonged boiling makes thin slices tough.", "選用帶適量油花的牛肉，變色即停火；薄片久煮會變韌。", "脂のある牛肉を使い、色が変わったら加熱を止めます。薄切りは煮すぎると硬くなります。", "적당히 마블링 있는 고기를 쓰고 색이 바뀌면 멈추세요. 얇은 고기는 오래 끓이면 질겨집니다.", "ใช้เนื้อมีมันแทรกพอดีและหยุดเมื่อสีเปลี่ยน การต้มนานทำให้เนื้อบางเหนียว"),
      ml("A wide skillet keeps the beef in a shallow layer, so the onion and sauce season it evenly.", "寬鍋能讓牛肉平鋪在淺層湯汁中，洋蔥與醬汁才會均勻入味。", "広いフライパンなら牛肉が浅く広がり、玉ねぎとつゆが均一になじみます。", "넓은 팬에 고기를 얕게 펼치면 양파와 소스가 고르게 배어듭니다.", "กระทะกว้างช่วยให้เนื้ออยู่ในชั้นซอสตื้น ๆ จึงเข้ารสกับหอมใหญ่สม่ำเสมอ")
    ],
    commonMistakes: [
      ml("Adding beef before the broth simmers can leave it clumped and unevenly cooked; separate the slices first.", "高湯未開始微滾就加牛肉，容易結成一團、受熱不均；先把肉片分開。", "つゆが温まる前に牛肉を入れると固まりやすく火が uneven になるので、先にほぐします。", "국물이 끓기 전에 고기를 넣으면 뭉치고 고르게 익지 않으니 먼저 풀어 넣으세요.", "ใส่เนื้อก่อนน้ำซอสเดือดจะจับกันเป็นก้อนและสุกไม่ทั่ว ต้องแยกชิ้นก่อน"),
      ml("Do not drown the rice; add broth gradually so the grains remain distinct.", "不要讓米飯泡在過多湯汁中，逐步加入才能保持米粒分明。", "ご飯をつゆで浸しすぎず、少しずつかけて粒を保ちます。", "밥을 국물에 잠기게 하지 말고 조금씩 부어 밥알을 살리세요.", "อย่าให้น้ำซอสท่วมข้าว ราดทีละน้อยเพื่อให้เมล็ดร่วน")
    ],
    substitutions: [
      ml("Replace dashi with 240 ml unsalted vegetable stock for a fish-free version; keep the soy, mirin, and sugar amounts unchanged.", "無魚版本可用 240 毫升無鹽蔬菜高湯取代柴魚高湯，醬油、味醂與糖量不變。", "魚を使わない場合はだしを無塩の野菜だし240mlに替え、しょうゆ、みりん、砂糖は同量にします。", "생선 없이 만들려면 다시를 무염 채소 육수 240ml로 바꾸고 간장·미림·설탕 양은 그대로 둡니다.", "หากไม่ใช้ปลา เปลี่ยนน้ำดาชิเป็นน้ำสต๊อกผักไม่เค็ม 240 มล. ปริมาณซีอิ๊ว มิริน น้ำตาลเท่าเดิม"),
      ml("Use thinly sliced pork shoulder instead of beef and cook until the thickest slice reaches 71°C.", "可用薄切豬肩肉取代牛肉，煮至最厚肉片達 71°C。", "牛肉の代わりに豚肩肉の薄切りを使い、最も厚い一枚が71℃になるまで煮ます。", "소고기 대신 얇게 썬 돼지 목살을 쓰고 가장 두꺼운 조각이 71°C가 될 때까지 익힙니다.", "ใช้หมูไหล่สไลซ์บางแทนเนื้อวัว เคี่ยวจนชิ้นหนาสุดถึง 71°C")
    ],
    storage: ml("Cool the beef mixture within 2 hours, refrigerate it airtight for up to 3 days, and store rice separately. Reheat the beef to steaming hot before serving.", "牛肉配料 2 小時內放涼，密封冷藏最多 3 天，米飯分開保存；上桌前將牛肉加熱至冒蒸氣。", "牛肉の具は2時間以内に冷まし、密閉して冷蔵3日まで。ご飯は別に保存し、食べる前に具を湯気が出るまで温めます。", "소고기 토핑은 2시간 안에 식혀 밀폐 냉장 3일까지, 밥은 따로 보관합니다. 먹기 전 토핑을 김이 날 때까지 데웁니다.", "ทำส่วนเนื้อให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 3 วัน เก็บข้าวแยก และอุ่นเนื้อจนร้อนมีไอก่อนเสิร์ฟ"),
    cultureNote: ml("Gyudon is a Japanese donburi format: simmered beef and onion are served over rice, with each home or shop adjusting the sweet-savoury broth.", "牛丼是日本丼物形式，將燉煮牛肉與洋蔥放在米飯上；各家會調整甘鹹湯汁比例。", "牛丼は牛肉と玉ねぎを煮てご飯にのせる日本の丼料理で、家庭や店ごとにつゆの甘辛さが異なります。", "규동은 익힌 소고기와 양파를 밥 위에 올리는 일본식 덮밥으로, 집과 가게마다 달고 짠 국물 비율이 다릅니다.", "กิวด้งเป็นด้งแบบญี่ปุ่นที่วางเนื้อและหอมใหญ่เคี่ยวบนข้าว แต่ละครัวหรือร้านปรับรสหวานเค็มต่างกัน"),
    sources: [
      { title: "Just One Cookbook — Gyudon", url: "https://www.justonecookbook.com/gyudon/" },
      { title: "Kikkoman — Gyudon (Beef Bowl)", url: "https://www.kikkoman.com/en/culture/foodforum/recipe/traditional-26-2.html" }
    ],
    imageAlt: ml("Gyudon beef and tender onion simmered in sauce over white rice without garnish", "白飯上盛著醬汁燉牛肉與軟洋蔥、無裝飾的牛丼", "白いご飯に煮た牛肉と柔らかな玉ねぎをのせた薬味なしの牛丼", "고명 없이 흰 밥 위에 소스에 익힌 소고기와 부드러운 양파를 올린 규동", "กิวด้งราดเนื้อวัวและหอมใหญ่นุ่มในซอสบนข้าวขาวแบบไม่ตกแต่ง"),
    visualSpec: "Real finished-dish brief: one patterned donburi bowl of white short-grain rice covered with tender beef and onion in a light glossy broth, with no scallion, pickled ginger, or other garnish."
  },

  {
    id: "oyakodon",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 15,
    cookMinutes: 20,
    totalMinutes: 35,
    servings: 2,
    name: ml("Oyakodon (chicken and egg bowl)", "親子丼", "親子丼", "오야코동", "โอยาโกะด้ง"),
    description: ml(
      "Chicken and onion simmer in dashi, then soft-set egg is layered over hot rice for a comforting donburi.",
      "雞肉與洋蔥在柴魚高湯中燉煮，再覆上柔嫩凝固的蛋，盛在熱米飯上。",
      "鶏肉と玉ねぎをだしで煮て、やわらかく固めた卵を重ねて温かいご飯にのせます。",
      "닭고기와 양파를 다시에 익힌 뒤 부드럽게 익힌 달걀을 올려 따뜻한 밥에 담습니다.",
      "ไก่และหอมใหญ่เคี่ยวในน้ำดาชิ แล้วราดไข่นุ่มที่เซ็ตตัวบนข้าวร้อน"
    ),
    ingredients: [
      ingredient("300 g", ml("boneless skinless chicken thighs, cut into 2.5 cm pieces", "去骨去皮雞腿肉，切 2.5 公分塊", "骨なし皮なし鶏もも肉（2.5cm角）", "뼈·껍질 없는 닭다리살, 2.5cm 조각", "สะโพกไก่เลาะกระดูกและหนัง หั่นชิ้น 2.5 ซม.")),
      ingredient("150 g", ml("onion, thinly sliced", "洋蔥，薄片", "玉ねぎ（薄切り）", "양파, 얇게 썬 것", "หอมใหญ่สไลซ์บาง")),
      ingredient("200 g", ml("large eggs, beaten", "大顆雞蛋，打散", "卵（溶く）", "큰 달걀, 풀기", "ไข่ไก่ฟองใหญ่ ตีให้เข้ากัน")),
      ingredient("180 ml", ml("dashi stock", "柴魚高湯", "だし", "다시 육수", "น้ำดาชิ")),
      ingredient("30 ml", ml("light soy sauce", "淡醬油", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("30 ml", ml("mirin", "味醂", "みりん", "미림", "มิริน")),
      ingredient("15 ml", ml("sake", "清酒", "酒", "사케", "สาเก")),
      ingredient("8 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("360 g", ml("cooked Japanese short-grain rice", "熟日本短米", "炊いた日本短粒米", "지은 일본 단립쌀", "ข้าวญี่ปุ่นเมล็ดสั้นหุงสุก")),
      ingredient("15 g", ml("mitsuba trefoil, roughly chopped", "鴨兒芹，略切", "みつば（粗く刻む）", "미쓰바, 굵게 다진 것", "มิตสึบะ สับหยาบ"))
    ],
    instructions: [
      step(ml("Cook and hold the rice", "煮飯並保溫", "ご飯を炊いて保温する", "밥 짓고 보온하기", "หุงและรักษาข้าวให้ร้อน"), ml("Cook the short-grain rice first and keep 360 g covered and hot while preparing the one-pan topping.", "先煮好短米，處理單鍋配料時將 360 公克米飯加蓋保溫。", "短粒米を先に炊き、具を作る間360gをふたをして温かく保ちます。", "단립쌀을 먼저 지어 토핑을 만드는 동안 360g을 덮어 따뜻하게 둡니다.", "หุงข้าวเมล็ดสั้นก่อน เก็บ 360 กรัมแบบปิดฝาให้ร้อนระหว่างทำหน้า")),
      step(ml("Cut the chicken and onion", "切雞肉與洋蔥", "鶏肉と玉ねぎを切る", "닭과 양파 썰기", "หั่นไก่และหอมใหญ่"), ml("Cut the chicken across the grain into flat 2.5 cm pieces and slice the onion into 6 mm strips; keep the mitsuba aside.", "雞肉逆紋切成扁平 2.5 公分塊，洋蔥切 6 毫米條；鴨兒芹先放一旁。", "鶏肉は繊維を断つ向きに2.5cmの薄い片にし、玉ねぎは6mm幅に切ります。みつばは別にします。", "닭을 결 반대로 납작한 2.5cm 조각으로 자르고 양파는 6mm 폭으로 썹니다. 미쓰바는 따로 둡니다.", "หั่นไก่ขวางเส้นเป็นชิ้นแบน 2.5 ซม. หั่นหอมใหญ่เส้น 6 มม. แยกมิตสึบะไว้")),
      step(ml("Beat the eggs", "打散雞蛋", "卵を溶く", "달걀 풀기", "ตีไข่"), ml("Crack the eggs into a bowl and beat just until the whites and yolks are blended; do not whip in excess air.", "雞蛋打入碗中，僅打至蛋白蛋黃混合，不要打入過多空氣。", "卵をボウルに割り、白身と黄身が混ざるまで溶きます。空気を入れすぎません。", "달걀을 그릇에 깨고 흰자와 노른자가 섞일 정도만 풀어 공기를 과하게 넣지 않습니다.", "ตอกไข่ใส่ชาม ตีแค่ให้ไข่ขาวกับไข่แดงเข้ากัน ไม่ตีให้อากาศมากเกิน")),
      step(ml("Simmer the onion", "燉煮洋蔥", "玉ねぎを煮る", "양파 끓이기", "เคี่ยวหอมใหญ่"), ml("In a small skillet, bring dashi, soy sauce, mirin, sake, and sugar to a simmer. Add the onion and cook 4–5 minutes until tender.", "在小平底鍋中將柴魚高湯、醬油、味醂、清酒與糖煮至微滾，加入洋蔥煮 4–5 分鐘至柔軟。", "小さなフライパンでだし、しょうゆ、みりん、酒、砂糖を煮立て、玉ねぎを4～5分柔らかく煮ます。", "작은 팬에 다시, 간장, 미림, 사케, 설탕을 끓이고 양파를 넣어 4–5분 부드럽게 익힙니다.", "ในกระทะเล็ก ต้มน้ำดาชิ ซีอิ๊ว มิริน สาเก และน้ำตาลให้เดือดอ่อน ใส่หอมใหญ่เคี่ยว 4–5 นาทีจนนุ่ม")),
      step(ml("Cook the chicken", "煮熟雞肉", "鶏肉を煮る", "닭 익히기", "ปรุงไก่"), ml("Add the chicken in one layer, cover, and simmer over medium-low heat for 6–8 minutes, turning once, until no pink remains and the thickest piece reaches 74°C.", "雞肉平鋪加入，加蓋以中小火煮 6–8 分鐘，中途翻一次，至不再粉紅且最厚處達 74°C。", "鶏肉を一枚ずつ加え、ふたをして中弱火で6～8分、途中で一度返します。赤みがなく最厚部74℃にします。", "닭을 한 겹으로 넣고 덮어 중약불에서 6–8분, 한 번 뒤집어 분홍색이 사라지고 가장 두꺼운 곳이 74°C가 되게 합니다.", "ใส่ไก่เป็นชั้นเดียว ปิดฝาเคี่ยวไฟกลางอ่อน 6–8 นาที กลับครั้งหนึ่งจนไม่มีสีชมพูและส่วนหนาสุดถึง 74°C")),
      step(ml("Set the first egg layer", "加入第一層蛋液", "卵の半量を加える", "첫 번째 달걀 넣기", "เติมไข่รอบแรก"), ml("Pour in half the beaten egg around the chicken. Cook uncovered on low heat for 45–60 seconds until softly set at the edges.", "將一半蛋液沿雞肉周圍倒入，開蓋小火煮 45–60 秒，至邊緣柔嫩凝固。", "溶き卵の半量を鶏肉の周りに流し、ふたをせず弱火で45～60秒、縁が柔らかく固まるまで煮ます。", "푼 달걀 절반을 닭 주변에 붓고 뚜껑 없이 약불에서 45–60초, 가장자리가 부드럽게 굳을 때까지 익힙니다.", "เทไข่ที่ตีไว้ครึ่งหนึ่งรอบไก่ เคี่ยวเปิดฝาไฟอ่อน 45–60 วินาทีจนขอบเซ็ตนุ่ม")),
      step(ml("Finish the egg safely", "完成蛋液並確認熟度", "残りの卵を固める", "남은 달걀 익히기", "ทำไข่ให้สุกปลอดภัย"), ml("Add the remaining egg and mitsuba, cover, and cook 30–60 seconds more. The centre should stay tender but the egg mixture must reach 74°C.", "加入剩餘蛋液與鴨兒芹，加蓋再煮 30–60 秒；中心保持柔嫩，但蛋液必須達 74°C。", "残りの卵とみつばを加え、ふたをして30～60秒加熱します。中心は柔らかく保ちつつ、卵液は74℃にします。", "남은 달걀과 미쓰바를 넣고 덮어 30–60초 더 익힙니다. 중심은 부드럽게 두되 달걀은 74°C에 도달해야 합니다.", "เติมไข่ที่เหลือกับมิตสึบะ ปิดฝาปรุงอีก 30–60 วินาที ให้กลางนุ่มแต่ไข่ต้องถึง 74°C")),
      step(ml("Slide over the rice", "覆蓋米飯上桌", "ご飯にのせる", "밥 위에 올리기", "ราดบนข้าว"), ml("Rest the pan off heat for 30 seconds, then slide the chicken-and-egg topping over the hot rice and serve immediately.", "離火靜置平底鍋 30 秒，再將雞蛋配料滑到熱米飯上，立即上桌。", "火を止めて30秒置き、鶏肉と卵を温かいご飯にそっと滑らせ、すぐに出します。", "불을 끄고 30초 둔 뒤 닭과 달걀 토핑을 따뜻한 밥 위로 조심히 미끄러뜨려 바로 냅니다.", "ยกกระทะออกจากไฟพัก 30 วินาที แล้วเลื่อนหน้าไก่ไข่ลงบนข้าวร้อน เสิร์ฟทันที"))
    ],
    tips: [
      ml("A small skillet gives the topping enough depth to stay juicy while it slides onto one bowl.", "小平底鍋能讓配料保持濕潤，也方便整體滑到一碗飯上。", "小さなフライパンなら具に厚みが出て汁気を保ち、丼へ滑らせやすくなります。", "작은 팬을 쓰면 토핑에 깊이가 생겨 촉촉하고 한 그릇에 미끄러뜨리기 쉽습니다.", "ใช้กระทะเล็กช่วยให้หน้ามีความลึกและฉ่ำ เลื่อนลงชามได้ง่าย"),
      ml("Add the eggs in two stages for tender curds rather than one firm omelette.", "分兩次加蛋，才能形成柔嫩蛋塊，而不是一整片硬煎蛋。", "卵を2回に分けると、固い一枚の卵ではなく柔らかな部分ができます。", "달걀을 두 번 나누면 단단한 한 장이 아니라 부드러운 응고가 됩니다.", "เติมไข่สองรอบเพื่อให้เป็นไข่นุ่มเป็นชิ้นแทนไข่แผ่นแข็ง")
    ],
    commonMistakes: [
      ml("Cutting chicken into thick cubes can leave the centre undercooked when the egg has already set; use flat 2.5 cm pieces.", "雞肉切太厚會在蛋已凝固時中心仍未熟，請切成扁平 2.5 公分塊。", "鶏肉を厚い角切りにすると卵が固まっても中心が生なので、薄い2.5cm片にします。", "닭을 두꺼운 큐브로 자르면 달걀이 굳어도 속이 덜 익으니 납작한 2.5cm로 자릅니다.", "หั่นไก่เป็นก้อนหนาจะไม่สุกขณะไข่เซ็ต ควรหั่นชิ้นแบน 2.5 ซม."),
      ml("Do not serve runny egg below 74°C; use a thermometer at the thickest egg-and-chicken area.", "不要供應低於 74°C 的生蛋液；在雞肉與蛋液最厚處使用溫度計。", "74℃未満の生卵は出さず、鶏肉と卵の最も厚い部分を温度計で確認します。", "74°C 미만의 덜 익은 달걀은 내지 말고 닭과 달걀이 겹친 가장 두꺼운 곳을 온도계로 확인하세요.", "อย่าเสิร์ฟไข่เหลวที่ต่ำกว่า 74°C ตรวจบริเวณหนาสุดที่ไก่กับไข่ซ้อนกันด้วยเทอร์โมมิเตอร์")
    ],
    substitutions: [
      ml("Use 180 ml unsalted vegetable stock instead of dashi for a fish-free bowl; keep the soy and mirin amounts unchanged.", "無魚版本可用 180 毫升無鹽蔬菜高湯取代柴魚高湯，醬油與味醂量不變。", "魚を使わない場合はだしを無塩野菜だし180mlに替え、しょうゆとみりんは同量にします。", "생선 없이 만들려면 다시를 무염 채소 육수 180ml로 바꾸고 간장과 미림 양은 그대로 둡니다.", "หากไม่ใช้ปลา เปลี่ยนน้ำดาชิเป็นน้ำสต๊อกผักไม่เค็ม 180 มล. ปริมาณซีอิ๊วและมิรินเท่าเดิม"),
      ml("Chicken breast can replace thigh; slice it flatter and begin checking the centre after 5 minutes so it does not dry out.", "雞胸肉可取代雞腿肉；切薄一點，5 分鐘後開始測中心，避免變乾。", "鶏むね肉でも作れます。薄めに切り、5分後から中心を確認して乾かさないようにします。", "닭가슴살로 바꿀 수 있습니다. 더 납작하게 썰고 5분 뒤부터 중심을 확인해 마르지 않게 하세요.", "ใช้เนื้ออกไก่แทนได้ หั่นให้แบนและเริ่มตรวจกลางหลัง 5 นาทีเพื่อไม่ให้แห้ง")
    ],
    storage: ml("Cool the topping within 2 hours and refrigerate it separately from rice in an airtight container for up to 2 days. Reheat until steaming hot and the chicken and egg reach 74°C.", "配料 2 小時內放涼，與米飯分開密封冷藏最多 2 天；復熱至冒蒸氣且雞肉與蛋達 74°C。", "具は2時間以内に冷まし、ご飯と別に密閉冷蔵2日まで。湯気が出て鶏肉と卵が74℃になるまで再加熱します。", "토핑은 2시간 안에 식혀 밥과 따로 밀폐 냉장 2일까지 보관합니다. 김이 나고 닭과 달걀이 74°C가 될 때까지 데웁니다.", "ทำหน้าให้เย็นภายใน 2 ชั่วโมง แช่เย็นแยกจากข้าวในภาชนะปิดสนิทได้ 2 วัน อุ่นจนมีไอและไก่กับไข่ถึง 74°C"),
    cultureNote: ml("Oyakodon is a Japanese donburi whose name combines parent and child, referring to chicken and egg served together; the name is descriptive rather than a claim about one fixed regional recipe.", "親子丼是日本丼物，名稱把「親」與「子」合在一起，指雞肉與雞蛋同碗；各地配方並非固定單一版本。", "親子丼は鶏肉と卵を一緒に盛る日本の丼料理で、名は「親子」を表します。地域や家庭で作り方は一つに決まりません。", "오야코동은 닭고기와 달걀을 함께 담는 일본식 덮밥으로 이름은 ‘부모와 아이’를 뜻하며 지역·가정별 방식이 하나로 고정되지는 않습니다.", "โอยาโกะด้งเป็นด้งญี่ปุ่นที่ใส่ไก่กับไข่ร่วมกัน ชื่อหมายถึงพ่อแม่กับลูก แต่สูตรต่างกันตามบ้านและพื้นที่"),
    sources: [
      { title: "Just One Cookbook — Oyakodon", url: "https://www.justonecookbook.com/oyakodon/" },
      { title: "Kikkoman — Oyakodon", url: "https://www.kikkoman.com/en/cookbook/washoku/oyakodon.html" },
      { title: "MAFF — Oyakodon", url: "https://www.maff.go.jp/e/policies/market/k_ryouri/search_menu/3539/index.html" }
    ],
    imageAlt: ml("Soft egg and chicken oyakodon topping a bowl of white rice with mitsuba", "柔嫩蛋與雞肉覆在白飯上、點綴鴨兒芹的親子丼", "柔らかな卵と鶏肉を白ご飯にのせ、みつばを添えた親子丼", "부드러운 달걀과 닭고기를 흰 밥에 올리고 미쓰바를 곁들인 오야코동", "โอยาโกะด้งหน้าไข่นุ่มและไก่บนข้าวขาว โรยมิตสึบะ"),
    visualSpec: "Real finished-dish brief: a donburi of white rice covered by softly set egg, bite-size chicken, tender onion, and a small amount of mitsuba trefoil; no unlisted garnish."
  },

  {
    id: "katsudon",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 25,
    cookMinutes: 30,
    totalMinutes: 55,
    servings: 2,
    name: ml("Katsudon (pork cutlet rice bowl)", "豬排丼", "カツ丼", "가츠동", "คัตสึด้ง"),
    description: ml(
      "Crisp pork cutlets are sliced into a dashi-braised onion and softly set egg topping over hot rice.",
      "酥脆豬排切片後放入柴魚高湯洋蔥與柔嫩蛋液中，覆在熱米飯上。",
      "揚げた豚カツを切り、だしで煮た玉ねぎと半熟に固めた卵を温かいご飯にのせます。",
      "바삭한 돈가스를 썰어 다시에 익힌 양파와 부드럽게 굳힌 달걀을 따뜻한 밥 위에 올립니다.",
      "หมูทอดกรอบหั่นชิ้น วางบนข้าวร้อนพร้อมหอมใหญ่เคี่ยวดาชิและไข่เซ็ตนุ่ม"
    ),
    ingredients: [
      ingredient("360 g", ml("boneless pork loin cutlets, 2 pieces", "去骨豬里肌排，2 片", "豚ロースとんかつ用肉（2枚）", "뼈 없는 돼지 등심 돈가스용 2장", "หมูสันนอกเลาะกระดูกสำหรับทอด 2 ชิ้น")),
      ingredient("2 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือป่น")),
      ingredient("0.5 g", ml("white pepper", "白胡椒粉", "白こしょう", "흰 후추", "พริกไทยขาว")),
      ingredient("30 g", ml("all-purpose flour", "中筋麵粉", "薄力粉", "중력분", "แป้งสาลีอเนกประสงค์")),
      ingredient("50 g", ml("large egg for breading", "裹粉用大顆雞蛋", "衣用の卵", "튀김옷용 큰 달걀", "ไข่ฟองใหญ่สำหรับชุบ")),
      ingredient("80 g", ml("panko breadcrumbs", "日式麵包粉", "パン粉", "빵가루", "เกล็ดขนมปังญี่ปุ่น")),
      ingredient("500 ml", ml("neutral frying oil", "中性炸油", "揚げ油", "중성 튀김유", "น้ำมันทอดรสอ่อน")),
      ingredient("150 g", ml("onion, thinly sliced", "洋蔥，薄片", "玉ねぎ（薄切り）", "양파, 얇게 썬 것", "หอมใหญ่สไลซ์บาง")),
      ingredient("180 ml", ml("dashi stock", "柴魚高湯", "だし", "다시 육수", "น้ำดาชิ")),
      ingredient("30 ml", ml("light soy sauce", "淡醬油", "薄口しょうゆ", "양조간장", "ซีอิ๊วขาว")),
      ingredient("30 ml", ml("mirin", "味醂", "みりん", "미림", "มิริน")),
      ingredient("15 ml", ml("sake", "清酒", "酒", "사케", "สาเก")),
      ingredient("12 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("150 g", ml("pasteurized large eggs for the topping, lightly beaten", "淋料用巴氏殺菌大顆雞蛋，略打散", "とじ用の加熱殺菌済み卵（軽く溶く）", "토핑용 살균 처리한 큰 달걀, 살짝 풀기", "ไข่ฟองใหญ่ผ่านการพาสเจอร์ไรซ์สำหรับราด ตีเบา ๆ")),
      ingredient("360 g", ml("cooked Japanese short-grain rice", "熟日本短米", "炊いた日本短粒米", "지은 일본 단립쌀", "ข้าวญี่ปุ่นเมล็ดสั้นหุงสุก")),
      ingredient("10 g", ml("mitsuba trefoil, for serving", "鴨兒芹，供上桌", "みつば（盛り付け用）", "미쓰바, 곁들임", "มิตสึบะ สำหรับเสิร์ฟ"))
    ],
    instructions: [
      step(ml("Cook and hold the rice", "煮飯並保溫", "ご飯を炊いて保温する", "밥 짓고 보온하기", "หุงและรักษาข้าวให้ร้อน"), ml("Cook the short-grain rice first and keep 360 g covered and hot while the cutlets and topping are prepared.", "先煮好短米，處理豬排與淋料時將 360 公克米飯加蓋保溫。", "短粒米を先に炊き、豚カツととじ具を作る間360gをふたをして温かく保ちます。", "단립쌀을 먼저 지어 돈가스와 토핑을 준비하는 동안 360g을 덮어 따뜻하게 둡니다.", "หุงข้าวเมล็ดสั้นก่อน เก็บ 360 กรัมแบบปิดฝาให้ร้อนระหว่างเตรียมหมูและหน้า")),
      step(ml("Prepare the pork", "處理豬排", "豚肉を整える", "돼지고기 손질", "เตรียมหมู"), ml("Pat the pork dry, trim any loose edge fat, and pound each cutlet to an even 1.5 cm thickness. Season both sides with salt and white pepper.", "豬排擦乾，修掉鬆散邊脂，拍打至厚度均勻 1.5 公分，兩面撒細鹽與白胡椒。", "豚肉の水気を拭き、端の余分な脂を除いて1.5cm厚に均します。両面に塩と白こしょうを振ります。", "돼지고기 물기를 닦고 가장자리 지방을 정리해 1.5cm 두께로 고르게 두드립니다. 양면에 소금과 흰 후추를 뿌립니다.", "ซับหมูให้แห้ง ตัดไขมันขอบ แล้วทุบให้หนาเท่ากัน 1.5 ซม. โรยเกลือกับพริกไทยขาวทั้งสองด้าน")),
      step(ml("Bread the cutlets", "裹豬排粉", "衣を付ける", "튀김옷 입히기", "ชุบเกล็ดขนมปัง"), ml("Coat each cutlet in flour, dip it in the beaten breading egg, and press on panko so the surface is completely covered.", "每片豬排依序沾麵粉、裹裹粉蛋液，再按壓日式麵包粉使表面完整覆蓋。", "豚肉に薄力粉、衣用の溶き卵、パン粉の順に付け、表面全体を覆います。", "각 돼지고기에 밀가루, 푼 달걀, 빵가루 순으로 묻혀 표면을 완전히 덮습니다.", "ชุบหมูแต่ละชิ้นด้วยแป้ง ไข่ชุบ และเกล็ดขนมปัง กดให้เคลือบทั่ว")),
      step(ml("Fry and verify the pork", "炸豬排並確認熟度", "揚げて火通りを確認する", "튀기고 익힘 확인", "ทอดและตรวจความสุก"), ml("Heat the frying oil to 175°C. Fry the cutlets 3–4 minutes per side until golden and the pork centre reaches 71°C. Drain and rest for 3 minutes.", "將炸油加熱至 175°C，豬排每面炸 3–4 分鐘至金黃，中心達 71°C；瀝油靜置 3 分鐘。", "揚げ油を175℃に熱し、豚カツを片面3～4分ずつきつね色まで揚げ、中心を71℃にします。油を切り3分休ませます。", "튀김유를 175°C로 달굽니다. 돈가스를 한 면씩 3–4분 황금색이 되고 중심 71°C가 될 때까지 튀긴 뒤 3분 쉽니다.", "ตั้งน้ำมันทอดที่ 175°C ทอดหมูด้านละ 3–4 นาทีจนทองและใจกลางถึง 71°C สะเด็ดน้ำมันพัก 3 นาที")),
      step(ml("Slice the tonkatsu", "切豬排", "とんかつを切る", "돈가스 썰기", "หั่นหมูทอด"), ml("Cut each rested cutlet into 2 cm strips with a clean knife, keeping the crisp crust attached to the tender pork.", "用乾淨刀將每片靜置後豬排切成 2 公分條，讓酥脆外殼貼著嫩肉。", "休ませた豚カツを清潔な包丁で2cm幅に切り、衣を肉に付けたまま保ちます。", "쉰 돈가스를 깨끗한 칼로 2cm 폭으로 썰어 바삭한 튀김옷이 살에 붙어 있게 합니다.", "ใช้มีดสะอาดหั่นหมูทอดที่พักแล้วเป็นชิ้นกว้าง 2 ซม. ให้แป้งกรอบติดเนื้อ")),
      step(ml("Simmer the onion broth", "燉煮洋蔥湯汁", "玉ねぎのつゆを煮る", "양파 국물 끓이기", "เคี่ยวน้ำซอสหอมใหญ่"), ml("Bring the dashi, soy sauce, mirin, sake, and sugar to a gentle simmer in a small skillet. Add the onion and cook 4–5 minutes until tender.", "在小平底鍋中將柴魚高湯、醬油、味醂、清酒與糖煮至微滾，加入洋蔥煮 4–5 分鐘至柔軟。", "小さなフライパンでだし、しょうゆ、みりん、酒、砂糖を静かに煮立て、玉ねぎを4～5分煮ます。", "작은 팬에 다시, 간장, 미림, 사케, 설탕을 잔잔하게 끓이고 양파를 넣어 4–5분 익힙니다.", "ในกระทะเล็ก ต้มน้ำดาชิ ซีอิ๊ว มิริน สาเก และน้ำตาลให้เดือดอ่อน ใส่หอมใหญ่เคี่ยว 4–5 นาทีจนนุ่ม")),
      step(ml("Set the egg topping", "加入蛋液收汁", "卵でとじる", "달걀로 덮기", "ราดไข่ให้เซ็ต"), ml("Place the sliced cutlet in the onion broth. Pour in two-thirds of the topping egg, cook on low for 45 seconds, add the rest and mitsuba, cover, and cook 60–90 seconds until the egg reaches 74°C while staying tender.", "將切片豬排放入洋蔥湯汁，倒入三分之二淋料蛋液，小火煮 45 秒；加入剩餘蛋液與鴨兒芹，加蓋再煮 60–90 秒，蛋達 74°C 但保持柔嫩。", "切った豚カツを玉ねぎのつゆに置き、卵液の3分の2を流して弱火で45秒。残りとみつばを加え、ふたをして60～90秒、卵を74℃まで柔らかく固めます。", "썬 돈가스를 양파 국물에 놓고 토핑 달걀의 2/3를 부어 약불에서 45초 익힙니다. 나머지 달걀과 미쓰바를 넣고 덮어 60–90초, 달걀이 74°C가 되면서 부드럽게 굳게 합니다.", "วางหมูทอดหั่นในน้ำซอสหอมใหญ่ เทไข่ 2 ใน 3 เคี่ยวไฟอ่อน 45 วินาที เติมไข่ที่เหลือกับมิตสึบะ ปิดฝา 60–90 วินาทีจนไข่ถึง 74°C แต่ยังนุ่ม")),
      step(ml("Assemble and serve", "組合丼飯上桌", "丼に盛って仕上げる", "덮밥 담아 내기", "จัดชามและเสิร์ฟ"), ml("Divide the hot rice between two bowls. Slide one cutlet-and-egg portion over each bowl, place the remaining mitsuba on top, and serve immediately; the pork must remain at least 71°C and the egg at least 74°C.", "將熱米飯分入兩碗，把一份豬排蛋料滑到每碗上，放上剩餘鴨兒芹立即上桌；上桌時豬肉須至少 71°C，蛋須至少 74°C。", "温かいご飯を丼2杯に分け、豚カツと卵を一人分ずつ滑らせ、残りのみつばをのせてすぐに出します。提供時、豚肉は71℃以上、卵は74℃以上を保ちます。", "뜨거운 밥을 두 덮밥에 나누고 돈가스와 달걀을 한份씩 미끄러뜨린 뒤 남은 미쓰바를 올려 바로 냅니다. 낼 때 돼지고기는 최소 71°C, 달걀은 최소 74°C여야 합니다.", "แบ่งข้าวร้อนใส่ชามด้ง 2 ใบ เลื่อนหมูทอดกับไข่ลงชามละหนึ่งส่วน วางมิตสึบะที่เหลือด้านบนแล้วเสิร์ฟทันที ขณะเสิร์ฟหมูต้องอย่างน้อย 71°C และไข่อย่างน้อย 74°C"))
    ],
    tips: [
      ml("Resting the fried cutlet for 3 minutes lets its heat settle before it meets the broth, so the crust does not collapse immediately.", "炸好的豬排靜置 3 分鐘再接觸湯汁，熱力回穩，外殼不會立刻軟塌。", "揚げた豚カツを3分休ませてからつゆに入れると、衣がすぐに崩れません。", "튀긴 돈가스를 3분 쉬게 한 뒤 국물에 넣으면 튀김옷이 바로 무너지지 않습니다.", "พักหมูทอด 3 นาทีก่อนลงน้ำซอส ช่วยให้ความร้อนกระจายและแป้งไม่ยุบเร็ว"),
      ml("Use a small skillet so the onion broth reaches the cutlet evenly without submerging the whole crust.", "使用小平底鍋，洋蔥湯汁能均勻接觸豬排，又不會淹沒整層外殼。", "小さなフライパンなら玉ねぎのつゆが均一に絡み、衣全体が浸りません。", "작은 팬을 쓰면 양파 국물이 고르게 닿고 튀김옷 전체가 잠기지 않습니다.", "ใช้กระทะเล็กให้น้ำซอสหอมใหญ่เคลือบทั่วโดยไม่ท่วมแป้งกรอบทั้งหมด")
    ],
    commonMistakes: [
      ml("Oil below 175°C makes the panko absorb fat; oil above it can brown the crust before pork reaches 71°C.", "油溫低於 175°C 會讓麵包粉吸油；過高則外殼先焦、豬肉中心還未達 71°C。", "油温が175℃未満だと衣が油を吸い、以上に高いと中心が71℃になる前に焦げます。", "기름이 175°C보다 낮으면 빵가루가 기름을 먹고, 높으면 돼지고기 중심 71°C 전에 겉이 탑니다.", "น้ำมันต่ำกว่า 175°C ทำให้แป้งอมน้ำมัน สูงเกินไปทำให้แป้งไหม้ก่อนหมูถึง 71°C"),
      ml("Adding all the eggs at once gives a firm sheet; the two additions keep the topping softly set.", "一次倒完蛋液會變成硬蛋片；分兩次加入才能保持柔嫩。", "卵を一度に入れると固い層になるので、2回に分けて柔らかく仕上げます。", "달걀을 한 번에 넣으면 단단한 층이 되니 두 번 나누어 부드럽게 익힙니다.", "เทไข่ทั้งหมดครั้งเดียวจะกลายเป็นแผ่นแข็ง ควรแบ่งสองรอบให้เซ็ตนุ่ม")
    ],
    substitutions: [
      ml("Use chicken cutlets instead of pork and cook the thickest piece to 74°C before slicing.", "可用雞排取代豬排，切片前將最厚處煮至 74°C。", "豚肉を鶏カツに替える場合は、切る前に最も厚い部分を74℃まで加熱します。", "돼지고기 대신 치킨 커틀릿을 쓰고 썰기 전 가장 두꺼운 곳을 74°C까지 익힙니다.", "ใช้ไก่ชุบเกล็ดแทนหมู ปรุงส่วนหนาสุดให้ถึง 74°C ก่อนหั่น"),
      ml("For a fish-free broth, use 180 ml unsalted kombu-shiitake stock and keep the seasoning amounts unchanged.", "無魚湯汁可用 180 毫升無鹽昆布香菇高湯，其他調味量不變。", "魚を使わない場合は無塩の昆布しいたけだし180mlに替え、調味料は同量にします。", "생선 없이 만들려면 무염 다시마·표고 육수 180ml로 바꾸고 양념은 그대로 둡니다.", "หากไม่ใช้ปลา เปลี่ยนน้ำซุปเป็นน้ำสต๊อกคอมบุและเห็ดหอมไม่เค็ม 180 มล. เครื่องปรุงเท่าเดิม")
    ],
    storage: ml("Cool the cutlet topping within 2 hours, refrigerate it separately from rice for up to 2 days, and reheat until pork reaches 71°C and egg 74°C.", "豬排蛋料 2 小時內放涼，與米飯分開密封冷藏最多 2 天；復熱至豬肉 71°C、蛋 74°C。", "カツとじは2時間以内に冷まし、ご飯と別に密閉冷蔵2日まで。豚肉71℃、卵74℃まで再加熱します。", "돈가스 토핑은 2시간 안에 식혀 밥과 따로 밀폐 냉장 2일까지 보관하고 돼지고기 71°C, 달걀 74°C까지 데웁니다.", "ทำหน้าหมูให้เย็นภายใน 2 ชั่วโมง แช่เย็นแยกข้าวได้ 2 วัน อุ่นจนหมูถึง 71°C และไข่ 74°C"),
    cultureNote: ml("Katsudon is a Japanese donburi built from tonkatsu, egg, onion, and a sweet-savory dashi broth; regional and restaurant versions vary.", "豬排丼是以炸豬排、蛋、洋蔥與甘鹹柴魚湯汁組成的日本丼物；地區與店家版本各有差異。", "カツ丼はとんかつ、卵、玉ねぎ、甘辛いだしつゆを組み合わせる日本の丼料理で、地域や店で違いがあります。", "가츠동은 돈가스, 달걀, 양파, 달고 짭짤한 다시 국물을 결합한 일본식 덮밥이며 지역과 가게마다 다릅니다.", "คัตสึด้งเป็นด้งญี่ปุ่นที่ประกอบด้วยหมูทอด ไข่ หอมใหญ่ และน้ำซุปดาชิหวานเค็ม สูตรต่างกันตามพื้นที่และร้าน"),
    sources: [
      { title: "Just One Cookbook — Katsudon", url: "https://www.justonecookbook.com/katsudon/" },
      { title: "Kikkoman — Katsudon (Tonkatsu Rice Bowl)", url: "https://www.kikkoman.com/en/cookbook/recipe/00058703.html" }
    ],
    imageAlt: ml("Katsudon with sliced golden pork cutlet, softly set egg, onion, rice, and mitsuba", "金黃切片豬排、柔嫩蛋、洋蔥、米飯與鴨兒芹組成的豬排丼", "黄金色の豚カツ、柔らかな卵、玉ねぎ、ご飯、みつばを盛ったカツ丼", "황금빛 돈가스와 부드러운 달걀, 양파, 밥, 미쓰바를 올린 가츠동", "คัตสึด้งหมูทอดสีทองหั่นชิ้น ไข่นุ่ม หอมใหญ่ ข้าว และมิตสึบะ"),
    visualSpec: "Real finished-dish brief: a white bowl of rice topped with sliced golden pork cutlet, softly set egg and tender onion, with a restrained mitsuba garnish; no unlisted toppings."
  },

  {
    id: "japanese-curry",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 20,
    cookMinutes: 40,
    totalMinutes: 60,
    servings: 4,
    name: ml("Japanese chicken curry rice", "日式雞肉咖哩飯", "チキンカレーライス", "일본식 치킨 카레라이스", "ข้าวแกงกะหรี่ไก่ญี่ปุ่น"),
    description: ml(
      "Ground chicken and vegetables simmer into a thick Japanese curry roux served beside fluffy white rice and red pickles.",
      "雞絞肉與蔬菜燉成濃郁日式咖哩醬，搭配鬆軟白飯與紅色福神漬。",
      "鶏ひき肉と野菜を濃いカレールウで煮込み、ふっくらした白ご飯と福神漬けを添えます。",
      "다진 닭고기와 채소를 진한 일본식 카레 루로 끓여 흰 밥과 붉은 후쿠진즈케를 곁들입니다.",
      "ไก่บดและผักเคี่ยวกับรูส์แกงกะหรี่ญี่ปุ่นเข้มข้น เสิร์ฟคู่ข้าวขาวนุ่มและฟุกุจินซึเกะสีแดง"
    ),
    ingredients: [
      ingredient("300 g", ml("ground chicken", "雞絞肉", "鶏ひき肉", "닭 다짐육", "ไก่บด")),
      ingredient("250 g", ml("onion, finely diced", "洋蔥，細丁", "玉ねぎ（みじん切り）", "양파, 잘게 다진 것", "หอมใหญ่หั่นเต๋าเล็ก")),
      ingredient("100 g", ml("carrot, finely diced 5–8 mm", "胡蘿蔔，切 5–8 毫米細丁", "にんじん（5～8mmのみじん切り）", "당근, 5–8mm 잘게 깍둑썰기", "แครอตหั่นเต๋าละเอียด 5–8 มม.")),
      ingredient("180 g", ml("potatoes, finely diced 8 mm", "馬鈴薯，切 8 毫米細丁", "じゃがいも（8mmの細かい角切り）", "감자, 8mm 잘게 깍둑썰기", "มันฝรั่งหั่นเต๋าเล็ก 8 มม.")),
      ingredient("10 g", ml("garlic, finely grated", "蒜泥", "にんにく（すりおろし）", "곱게 간 마늘", "กระเทียมขูดละเอียด")),
      ingredient("15 ml", ml("neutral cooking oil", "中性食用油", "くせのない食用油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("600 ml", ml("water", "水", "水", "물", "น้ำ")),
      ingredient("100 g", ml("Japanese curry roux", "日式咖哩塊", "カレールウ", "일본식 카레 루", "รูส์แกงกะหรี่ญี่ปุ่น")),
      ingredient("400 g", ml("cooked Japanese short-grain rice", "熟日本短米", "炊いた日本短粒米", "지은 일본 단립쌀", "ข้าวญี่ปุ่นเมล็ดสั้นหุงสุก")),
      ingredient("80 g", ml("fukujinzuke red pickles, for serving", "福神漬，供上桌", "福神漬け（盛り付け用）", "후쿠진즈케, 곁들임", "ฟุกุจินซึเกะ สำหรับเสิร์ฟ"))
    ],
    instructions: [
      step(ml("Cook and hold the rice", "煮飯並保溫", "ご飯を炊いて保温する", "밥 짓고 보온하기", "หุงและรักษาข้าวให้ร้อน"), ml("Cook the short-grain rice first and keep 400 g covered and hot while the curry simmers.", "先煮好短米，燉咖哩時將 400 公克米飯加蓋保溫。", "短粒米を先に炊き、カレーを煮る間400gをふたをして温かく保ちます。", "단립쌀을 먼저 지어 카레를 끓이는 동안 400g을 덮어 따뜻하게 둡니다.", "หุงข้าวเมล็ดสั้นก่อน เก็บ 400 กรัมแบบปิดฝาให้ร้อนระหว่างเคี่ยวแกง")),
      step(ml("Cut the vegetables", "切蔬菜", "野菜を切る", "채소 썰기", "หั่นผัก"), ml("Dice the onion finely, the carrot into 5–8 mm pieces, and the potatoes into 8 mm pieces so the small ingredients finish together.", "洋蔥切細丁，胡蘿蔔切 5–8 毫米細丁，馬鈴薯切 8 毫米細丁，讓小塊食材同步煮熟。", "玉ねぎは細かく、にんじんは5～8mm、じゃがいもは8mmに切り、細かな具に同時に火が通るようにします。", "양파는 잘게, 당근은 5–8mm, 감자는 8mm로 잘라 작은 재료가 함께 익게 합니다.", "หั่นหอมใหญ่ละเอียด แครอต 5–8 มม. และมันฝรั่ง 8 มม. เพื่อให้ส่วนผสมชิ้นเล็กสุกพร้อมกัน")),
      step(ml("Soften the onion and garlic", "炒軟洋蔥蒜", "玉ねぎとにんにくを炒める", "양파와 마늘 볶기", "ผัดหอมใหญ่กับกระเทียม"), ml("Heat the oil in a heavy pot over medium heat. Cook the onion for 5–6 minutes until translucent, then add the grated garlic for 30 seconds without browning it.", "厚底鍋以中火加熱油，洋蔥炒 5–6 分鐘至半透明，再加蒜泥炒 30 秒，勿炒焦。", "厚手の鍋に油を中火で熱し、玉ねぎを5～6分透き通るまで炒め、にんにくを加えて30秒、焦がさず炒めます。", "두꺼운 냄비에 기름을 중불로 달구고 양파를 5–6분 투명하게 볶은 뒤 마늘을 넣어 30초, 태우지 않습니다.", "ตั้งหม้อหนาด้วยไฟกลาง ใส่น้ำมัน ผัดหอมใหญ่ 5–6 นาทีจนใส แล้วใส่กระเทียมผัด 30 วินาทีไม่ให้ไหม้")),
      step(ml("Brown the chicken", "炒熟雞絞肉", "鶏ひき肉を炒める", "닭고기 볶기", "ผัดไก่บด"), ml("Add the ground chicken and break it into small crumbles. Stir-fry for 4–5 minutes until no pink remains; check that the thickest clump reaches 74°C.", "加入雞絞肉炒散，翻炒 4–5 分鐘至不再粉紅；測最厚肉塊，須達 74°C。", "鶏ひき肉を加えてほぐし、4～5分、赤みがなくなるまで炒めます。最も厚い塊が74℃になることを確認します。", "다진 닭고기를 넣어 풀어 4–5분 분홍색이 사라질 때까지 볶고 가장 두꺼운 덩어리가 74°C인지 확인합니다.", "ใส่ไก่บด ยีให้ร่วน ผัด 4–5 นาทีจนไม่มีสีชมพู ตรวจให้ก้อนหนาสุดถึง 74°C")),
      step(ml("Simmer the vegetables", "燉煮蔬菜", "野菜を煮る", "채소 끓이기", "เคี่ยวผัก"), ml("Add the finely diced carrot, potato, and water. Bring to a boil, skim any foam, then cover and simmer over low heat for 10–12 minutes until the small pieces are tender.", "加入胡蘿蔔細丁、馬鈴薯細丁與水，煮沸後撇沫，加蓋轉小火 10–12 分鐘，直到小丁蔬菜柔軟。", "細かく切ったにんじん、じゃがいも、水を加えて沸かし、アクを取り、ふたをして弱火で10～12分、細かな具が柔らかくなるまで煮ます。", "잘게 썬 당근과 감자, 물을 넣어 끓이고 거품을 걷은 뒤 덮어 약불에서 10–12분 작은 조각이 부드러워질 때까지 끓입니다.", "ใส่แครอตและมันฝรั่งหั่นละเอียดกับน้ำ ต้มเดือดช้อนฟอง ปิดฝาเคี่ยวไฟอ่อน 10–12 นาทีจนชิ้นเล็กนุ่ม")),
      step(ml("Dissolve the roux", "溶解咖哩塊", "ルウを溶かす", "카레 루 녹이기", "ละลายรูส์"), ml("Turn off the heat. Break the curry roux into the hot liquid and stir until completely dissolved; do not add the roux over a hard boil.", "關火，將咖哩塊掰入熱湯汁攪拌至完全溶解；不要在猛烈沸騰時加入。", "火を止め、カレールウを熱い煮汁に割り入れて完全に溶かします。強く沸騰させたまま加えません。", "불을 끄고 카레 루를 뜨거운 국물에 나누어 넣어 완전히 녹입니다. 세게 끓는 중에는 넣지 않습니다.", "ปิดไฟ หักรูส์ใส่น้ำร้อน คนจนละลายหมด ห้ามใส่ขณะเดือดแรง")),
      step(ml("Thicken and verify", "煮稠並確認熟度", "とろみを付けて確認する", "걸쭉하게 하고 확인", "เคี่ยวให้ข้นและตรวจ"), ml("Return the pot to low heat and simmer uncovered for 5–7 minutes until thick and glossy. Confirm the chicken remains at least 74°C and the potatoes pierce easily.", "鍋子回小火開蓋煮 5–7 分鐘至濃稠發亮，確認雞肉仍至少 74°C，馬鈴薯可輕易刺穿。", "鍋を弱火に戻し、ふたをせず5～7分、とろみと照りが出るまで煮ます。鶏肉74℃以上、じゃがいもが簡単に刺さることを確認します。", "냄비를 약불에 다시 올려 뚜껑 없이 5–7분 걸쭉하고 윤기 날 때까지 끓입니다. 닭이 74°C 이상이고 감자가 쉽게 찔리는지 확인합니다.", "นำหม้อกลับเคี่ยวไฟอ่อนเปิดฝา 5–7 นาทีจนข้นเงา ตรวจไก่ให้ยังอย่างน้อย 74°C และมันฝรั่งนิ่มแทงได้ง่าย")),
      step(ml("Serve with rice and pickles", "配飯與福神漬上桌", "ご飯と福神漬けで盛る", "밥과 후쿠진즈케 담기", "เสิร์ฟกับข้าวและผักดอง"), ml("Divide the hot rice between four plates, spoon the fine-textured chicken curry beside it, and add the measured generous portion of red fukujinzuke without any other garnish.", "將熱米飯分入四盤，細緻口感的雞肉咖哩舀在旁邊，加入定量且份量明顯的紅色福神漬，不加其他裝飾。", "温かいご飯を4皿に分け、細かな具のチキンカレーを隣に盛り、分量のある赤い福神漬けだけを添えます。", "뜨거운 밥을 네 접시에 나누고 잘게 익힌 재료의 치킨 카레를 옆에 담은 뒤 넉넉히 잰 붉은 후쿠진즈케만 곁들입니다.", "แบ่งข้าวร้อนใส่ 4 จาน ตักแกงไก่เนื้อเนียนข้าง ๆ เติมฟุกุจินซึเกะสีแดงในปริมาณชัดเจนโดยไม่แต่งอย่างอื่น"))
    ],
    tips: [
      ml("Cook the onion until translucent before adding liquid; this builds sweetness without needing extra sugar.", "洋蔥先炒至半透明再加液體，能建立甜味，不需額外加糖。", "液体を加える前に玉ねぎを透き通るまで炒めると、砂糖を足さずに甘みが出ます。", "액체를 넣기 전 양파를 투명하게 볶으면 설탕을 더하지 않아도 단맛이 납니다.", "ผัดหอมใหญ่จนใสก่อนเติมน้ำ จะได้ความหวานโดยไม่ต้องเติมน้ำตาลเพิ่ม"),
      ml("Turn off the heat before adding roux; residual heat dissolves it smoothly and reduces scorching.", "加入咖哩塊前先關火，餘溫能平順溶解，也降低焦底風險。", "ルウを入れる前に火を止めると余熱で滑らかに溶け、焦げにくくなります。", "루를 넣기 전에 불을 끄면 잔열로 부드럽게 녹고 타는 것을 줄입니다.", "ปิดไฟก่อนใส่รูส์ ความร้อนคงเหลือช่วยละลายเนียนและลดการไหม้ก้นหม้อ")
    ],
    commonMistakes: [
      ml("Cutting the vegetables too large leaves a hard centre while the curry thickens; keep carrot near 5–8 mm and potato near 8 mm.", "蔬菜切太大會在咖哩變稠時中心仍硬；胡蘿蔔約 5–8 毫米、馬鈴薯約 8 毫米即可。", "具が大きすぎるとカレーが濃くなる間に芯が残るので、にんじん5～8mm、じゃがいも8mm程度にします。", "채소를 너무 크게 자르면 카레가 걸쭉해질 때 속이 단단하니 당근 5–8mm, 감자 8mm 정도로 자릅니다.", "หั่นผักใหญ่เกินไปจะยังแข็งขณะแกงข้น ควรให้แครอต 5–8 มม. และมันฝรั่งประมาณ 8 มม."),
      ml("Boiling after the roux is added can scorch the bottom; keep the final simmer low and stir from the base.", "加入咖哩塊後大滾會焦底；最後以小火煮，從鍋底攪拌。", "ルウを入れた後に強く沸かすと底が焦げるので、弱火で鍋底から混ぜます。", "루를 넣은 뒤 세게 끓이면 바닥이 타므로 약불에서 바닥을 저어 주세요.", "หลังใส่รูส์เดือดแรงจะไหม้ก้นหม้อ ควรเคี่ยวไฟอ่อนและคนจากก้นหม้อ")
    ],
    substitutions: [
      ml("Use 300 g boneless chicken thigh cut into 3 cm pieces instead of ground chicken; simmer until the thickest piece reaches 74°C.", "可用 300 公克去骨雞腿肉 3 公分塊取代雞絞肉，燉至最厚處達 74°C。", "鶏ひき肉の代わりに骨なし鶏もも肉300gを3cm角に切って使い、最厚部74℃まで煮ます。", "다진 닭 대신 뼈 없는 닭다리살 300g을 3cm로 썰어 쓰고 가장 두꺼운 곳이 74°C가 될 때까지 끓입니다.", "ใช้สะโพกไก่เลาะกระดูก 300 กรัมหั่น 3 ซม. แทนไก่บด เคี่ยวจนส่วนหนาสุดถึง 74°C"),
      ml("For a vegetarian bowl, replace chicken with 300 g firm tofu and use vegetable stock-free water; keep the roux ingredients label-checked for meat or fish.", "素食版本可用 300 公克板豆腐取代雞肉並以水烹煮；咖哩塊需確認不含肉或魚成分。", "植物性にするなら鶏肉を木綿豆腐300gに替え、水で煮ます。ルウに肉や魚が含まれないことを確認します。", "채식으로는 닭을 단단한 두부 300g으로 바꾸고 물로 끓입니다. 루에 고기·생선 성분이 없는지 확인하세요.", "ทำแบบมังสวิรัติเปลี่ยนไก่เป็นเต้าหู้แข็ง 300 กรัม ใช้น้ำ และตรวจฉลากรูส์ว่าไม่มีเนื้อหรือปลา")
    ],
    storage: ml("Cool curry and rice within 2 hours and refrigerate separately in airtight containers for up to 3 days. Reheat curry until steaming hot and chicken reaches 74°C.", "咖哩與米飯 2 小時內放涼後分開密封冷藏最多 3 天；復熱咖哩至冒蒸氣且雞肉達 74°C。", "カレーとご飯は2時間以内に冷まし、別々に密閉して冷蔵3日まで。カレーは湯気が出て鶏肉74℃になるまで温めます。", "카레와 밥은 2시간 안에 식혀 따로 밀폐 냉장 3일까지 보관합니다. 카레는 김이 나고 닭이 74°C가 될 때까지 데웁니다.", "ทำแกงและข้าวให้เย็นภายใน 2 ชั่วโมง แช่เย็นแยกภาชนะปิดสนิทได้ 3 วัน อุ่นแกงจนมีไอและไก่ถึง 74°C"),
    cultureNote: ml("Japanese curry rice is a yoshoku dish shaped by British-style curry and local Japanese ingredients; this recipe states the influence without claiming a single origin story.", "日式咖哩飯屬於受英式咖哩影響、以日本食材發展出的洋食；此說法不宣稱單一來源故事。", "日本のカレーライスは英国風カレーの影響と日本の食材で形づくられた洋食です。単一の起源説に限定しません。", "일본식 카레라이스는 영국식 카레의 영향과 일본 식재료로 발전한 양식이며, 하나의 기원설로 단정하지 않습니다.", "ข้าวแกงกะหรี่ญี่ปุ่นเป็นโยโชกุที่พัฒนาจากอิทธิพลแกงแบบอังกฤษกับวัตถุดิบญี่ปุ่น โดยไม่อ้างเรื่องต้นกำเนิดเดียว"),
    sources: [
      { title: "Just One Cookbook — Japanese Chicken Curry", url: "https://www.justonecookbook.com/simple-chicken-curry/" },
      { title: "Taste of Japan (JETRO) — Beef Curry", url: "https://japan-food.jetro.go.jp/en/recipe/122.html" },
      { title: "Kikkoman — Japanese Curry Rice feature", url: "https://www.kikkoman.com/en/cookbook/feature/japanese_curry.html" }
    ],
    imageAlt: ml("Fine-textured Japanese chicken curry with white rice and a generous portion of red fukujinzuke pickles", "細碎雞肉與小丁蔬菜咖哩、白飯及份量明顯紅色福神漬的日式咖哩飯", "細かな鶏肉と野菜のチキンカレー、白ご飯、たっぷりの赤い福神漬け", "잘게 익힌 닭고기와 채소 카레, 흰 밥, 넉넉한 붉은 후쿠진즈케를 담은 일본식 카레라이스", "ข้าวแกงกะหรี่ไก่ญี่ปุ่นเนื้อเนียนกับข้าวขาวและฟุกุจินซึเกะสีแดงปริมาณมาก"),
    visualSpec: "Real finished-dish brief: fine-textured Japanese chicken curry with small vegetable pieces, separate white rice, and a generous red fukujinzuke serving; no egg, sesame, salad, or unlisted garnish."
  },

  {
    id: "omurice",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 15,
    cookMinutes: 25,
    totalMinutes: 40,
    servings: 2,
    name: ml("Omurice (chicken ketchup rice omelette)", "雞肉番茄醬蛋包飯", "チキンオムライス", "치킨 오므라이스", "ออมไรซ์ไก่"),
    description: ml(
      "Chicken and onion are folded through ketchup-seasoned rice, enclosed in a thin fully set omelette, and finished with one broad ketchup stripe.",
      "雞肉與洋蔥拌入番茄醬調味炒飯，包進薄而全熟的蛋皮，最後淋一條寬番茄醬。",
      "鶏肉と玉ねぎをケチャップ味のご飯に混ぜ、薄く完全に火を通した卵で包み、ケチャップを一本かけます。",
      "닭고기와 양파를 케첩으로 간한 밥에 섞고 얇게 완전히 익힌 달걀로 감싼 뒤 케첩을 한 줄 올립니다.",
      "ผัดข้าวกับไก่และหอมใหญ่ปรุงซอสมะเขือเทศ ห่อด้วยไข่แผ่นบางที่สุกทั่ว แล้วราดซอสมะเขือเทศเป็นเส้นกว้างหนึ่งเส้น"
    ),
    ingredients: [
      ingredient("180 g", ml("boneless skinless chicken thigh, 1.5 cm dice", "去骨去皮雞腿肉，切 1.5 公分丁", "骨なし皮なし鶏もも肉（1.5cm角）", "뼈·껍질 없는 닭다리살, 1.5cm 깍둑썰기", "สะโพกไก่เลาะกระดูกและหนัง หั่นเต๋า 1.5 ซม.")),
      ingredient("120 g", ml("onion, 5 mm dice", "洋蔥，切 5 毫米丁", "玉ねぎ（5mm角）", "양파, 5mm 깍둑썰기", "หอมใหญ่หั่นเต๋า 5 มม.")),
      ingredient("360 g", ml("cooked Japanese short-grain rice", "熟日本短米", "炊いた日本短粒米", "지은 일본 단립쌀", "ข้าวญี่ปุ่นเมล็ดสั้นหุงสุก")),
      ingredient("75 g", ml("ketchup, 60 g for rice and 15 g for topping", "番茄醬，炒飯 60 公克、表面 15 公克", "ケチャップ（ご飯用60g、仕上げ用15g）", "케첩, 밥용 60g·토핑용 15g", "ซอสมะเขือเทศ 60 กรัมสำหรับข้าวและ 15 กรัมสำหรับราด")),
      ingredient("10 ml", ml("Worcestershire sauce", "伍斯特醬", "ウスターソース", "우스터 소스", "ซอสวูสเตอร์")),
      ingredient("30 g", ml("unsalted butter", "無鹽奶油", "無塩バター", "무염 버터", "เนยจืด")),
      ingredient("200 g", ml("large eggs, beaten", "大顆雞蛋，打散", "卵（溶く）", "큰 달걀, 풀기", "ไข่ไก่ฟองใหญ่ ตีให้เข้ากัน")),
      ingredient("3 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือป่น")),
      ingredient("1 g", ml("black pepper", "黑胡椒粉", "黒こしょう", "후추", "พริกไทยดำ"))
    ],
    instructions: [
      step(ml("Warm and hold the rice", "加熱並保溫米飯", "ご飯を温めて保温する", "밥 데워 보온하기", "อุ่นและรักษาข้าวให้ร้อน"), ml("Warm the cooked short-grain rice until pliable, then keep 360 g covered while preparing the chicken rice and omelettes.", "將熟短米加熱至鬆散可拌，處理雞肉炒飯與蛋皮時將 360 公克加蓋保溫。", "炊いた短粒米をほぐれる程度に温め、鶏肉ご飯と卵を作る間360gをふたをして保温します。", "지은 단립쌀을 잘 풀릴 정도로 데운 뒤 닭밥과 오믈렛을 준비하는 동안 360g을 덮어 보온합니다.", "อุ่นข้าวเมล็ดสั้นให้ร่วน แล้วปิดฝารักษา 360 กรัมให้ร้อนระหว่างเตรียมข้าวไก่และไข่")),
      step(ml("Dice the chicken and onion", "切雞肉與洋蔥", "鶏肉と玉ねぎを切る", "닭과 양파 썰기", "หั่นไก่และหอมใหญ่"), ml("Cut the chicken into 1.5 cm dice and the onion into 5 mm dice; beat the eggs in a separate bowl and keep the salt and pepper ready.", "雞肉切 1.5 公分丁、洋蔥切 5 毫米丁；雞蛋另碗打散，鹽與黑胡椒備妥。", "鶏肉を1.5cm角、玉ねぎを5mm角に切ります。卵は別の器で溶き、塩と黒こしょうを用意します。", "닭은 1.5cm, 양파는 5mm로 깍둑썰고 달걀은 별도 그릇에 풀어 소금과 후추를 준비합니다.", "หั่นไก่เต๋า 1.5 ซม. หอมใหญ่เต๋า 5 มม. ตีไข่ในชามแยก เตรียมเกลือกับพริกไทย")),
      step(ml("Cook the chicken and onion", "炒熟雞肉洋蔥", "鶏肉と玉ねぎを炒める", "닭과 양파 볶기", "ผัดไก่และหอมใหญ่"), ml("Melt 15 g butter in a wide skillet over medium heat. Cook the onion for 2 minutes, add the chicken, and stir-fry 4–5 minutes until no pink remains and the thickest piece reaches 74°C.", "寬鍋中火融化 15 公克奶油，洋蔥炒 2 分鐘，加入雞肉翻炒 4–5 分鐘至不再粉紅，最厚處達 74°C。", "広いフライパンでバター15gを中火で溶かし、玉ねぎを2分炒め、鶏肉を加えて4～5分、赤みがなく最厚部74℃になるまで炒めます。", "넓은 팬에 버터 15g을 중불로 녹여 양파를 2분 볶고 닭을 넣어 4–5분, 분홍색이 사라지고 가장 두꺼운 곳이 74°C가 될 때까지 볶습니다.", "ละลายเนย 15 กรัมในกระทะกว้างไฟกลาง ผัดหอมใหญ่ 2 นาที ใส่ไก่ผัด 4–5 นาทีจนไม่มีสีชมพูและชิ้นหนาสุดถึง 74°C")),
      step(ml("Cook down the tomato seasoning", "炒乾番茄醬調味", "ケチャップを煮詰める", "케첩 졸이기", "เคี่ยวเครื่องปรุงมะเขือเทศ"), ml("Lower the heat slightly. Add 60 g ketchup and the Worcestershire sauce to the chicken and onion, stirring for 1–2 minutes until the excess moisture evaporates.", "略降火，加入 60 公克番茄醬與伍斯特醬，翻炒 1–2 分鐘至多餘水分蒸發。", "火を少し落とし、ケチャップ60gとウスターソースを加え、余分な水分が飛ぶまで1～2分炒めます。", "불을 조금 낮추고 케첩 60g과 우스터 소스를 넣어 1–2분, 남은 수분이 날아갈 때까지 볶습니다.", "ลดไฟเล็กน้อย ใส่ซอสมะเขือเทศ 60 กรัมกับซอสวูสเตอร์ ผัด 1–2 นาทีจนน้ำส่วนเกินระเหย")),
      step(ml("Fold in the rice", "拌入米飯", "ご飯を混ぜる", "밥 섞기", "ผัดรวมข้าว"), ml("Add the warm rice, salt, and pepper. Fold until evenly red and dry rather than wet, cook 2–3 minutes, then divide and shape into two compact ovals.", "加入溫米飯、鹽與黑胡椒，翻拌至均勻紅色且乾爽不濕，炒 2–3 分鐘後分成兩份壓成橢圓。", "温かいご飯、塩、黒こしょうを加え、均一に赤く水っぽくない状態まで2～3分炒め、2つの楕円形に整えます。", "따뜻한 밥, 소금, 후추를 넣고 고르게 붉고 질척하지 않게 2–3분 볶은 뒤 두 덩어리의 타원형으로 빚습니다.", "ใส่ข้าวอุ่น เกลือ พริกไทย ผัด 2–3 นาทีจนแดงทั่วและไม่แฉะ แบ่งสองส่วนปั้นเป็นวงรีแน่น")),
      step(ml("Cook fully set omelettes", "煎全熟蛋皮", "卵を完全に焼く", "달걀 완전히 익히기", "ทำไข่ให้สุกทั่ว"), ml("Use the remaining 15 g butter in a clean nonstick skillet over medium heat. Cook half the beaten egg as a thin sheet for 1–2 minutes until no liquid remains and the centre reaches 74°C; repeat for the second sheet.", "乾淨不沾鍋中火融化剩餘 15 公克奶油，倒入一半蛋液煎成薄蛋皮 1–2 分鐘，至無液體且中心達 74°C；再煎第二張。", "きれいなフッ素加工のフライパンで残りのバター15gを中火で溶かし、卵液の半量を薄く1～2分焼き、液体が残らず中心74℃になれば、もう一枚も焼きます。", "깨끗한 논스틱 팬에 남은 버터 15g을 중불로 녹입니다. 달걀 절반을 얇게 부어 1–2분, 액체가 남지 않고 중심 74°C가 되게 완전히 익힌 뒤 두 번째도 굽습니다.", "ละลายเนย 15 กรัมที่เหลือในกระทะเคลือบสะอาดไฟกลาง ทำไข่ครึ่งหนึ่งเป็นแผ่นบาง 1–2 นาทีจนไม่มีน้ำเหลวและกลางถึง 74°C แล้วทำอีกแผ่น")),
      step(ml("Wrap each rice oval", "包覆橢圓炒飯", "ご飯を包む", "밥 감싸기", "ห่อข้าว"), ml("Place one rice oval in the centre of each fully set omelette. Fold the egg edges over the rice, then turn seam-side down onto a plain plate.", "將一份橢圓炒飯放在每張全熟蛋皮中央，折起蛋皮包住炒飯，接縫朝下翻到素白盤。", "完全に焼いた卵の中央にご飯を一つずつ置き、縁を折って包み、継ぎ目を下にして無地の皿へ返します。", "완전히 익힌 달걀 중앙에 밥 타원 하나씩 놓고 가장자리를 접어 감싼 뒤 이음새가 아래로 가게 무지 접시에 뒤집습니다.", "วางข้าววงรีกลางไข่ที่สุกทั่ว พับขอบห่อข้าว แล้วคว่ำด้านรอยต่อบนจานเรียบ")),
      step(ml("Cut open and add one ketchup stripe", "切開並淋一條番茄醬", "切り開いてケチャップを一本かける", "작게 갈라 케첩 한 줄 올리기", "ผ่าเล็กน้อยแล้วราดซอสหนึ่งเส้น"), ml("Cut one small opening along the top of each omelette to reveal the chicken tomato rice inside. Spoon the remaining 15 g ketchup as one broad, uninterrupted stripe over the centre; do not write, draw, or add garnish.", "沿每個蛋包頂部切開一小口，露出內裡雞肉番茄炒飯；將剩餘 15 公克番茄醬沿中央淋成一條寬而連續的直線，不寫字、不作圖、不加裝飾。", "オムライスの上を小さく切り開いて中のチキンケチャップライスを見せます。残りのケチャップ15gを中央に幅広く一本だけかけ、文字や模様、飾りは加えません。", "오므라이스 윗면을 작게 갈라 속의 치킨 케첩밥을 보입니다. 남은 케첩 15g을 중앙에 넓고 끊김 없는 한 줄로만 올리고 글씨·무늬·고명은 넣지 않습니다.", "ผ่าเล็กน้อยด้านบนให้เห็นข้าวผัดไก่มะเขือเทศ ราดซอสมะเขือเทศ 15 กรัมที่เหลือเป็นเส้นกว้างต่อเนื่องหนึ่งเส้นกลาง ห้ามเขียน วาด หรือเติมเครื่องตกแต่ง"))
    ],
    tips: [
      ml("Cooking the ketchup before adding rice evaporates excess water and keeps the filling separate rather than mushy.", "番茄醬先炒乾再加飯，能蒸發多餘水分，炒飯才不會濕黏。", "ご飯を入れる前にケチャップを煮詰めると余分な水分が飛び、べたつきません。", "밥을 넣기 전에 케첩을 졸이면 수분이 빠져 속이 질척해지지 않습니다.", "เคี่ยวซอสมะเขือเทศก่อนใส่ข้าวช่วยไล่น้ำ ทำไส้ไม่แฉะ"),
      ml("Keep the omelette thin and fully set before wrapping; the small opening is made only after plating.", "蛋皮保持薄且全熟再包飯；上桌前才在盤中切開小口。", "卵は薄く完全に焼いてから包み、切り開くのは盛り付け後にします。", "달걀은 얇고 완전히 익힌 뒤 감싸고, 작은 절개는 담은 다음 만듭니다.", "ทำไข่ให้บางและสุกทั่วก่อนห่อ ผ่าเล็กน้อยหลังจัดลงจานเท่านั้น")
    ],
    commonMistakes: [
      ml("Adding cold, wet rice to the pan can cool the chicken mixture and make the filling gummy; warm and loosen it first.", "冷濕米飯會讓雞肉鍋降溫並使內餡黏糊，請先把米飯加熱鬆散。", "冷たく湿ったご飯は具の温度を下げてべたつくので、温めてほぐしておきます。", "차갑고 젖은 밥은 속의 온도를 낮추고 질척하게 하니 먼저 데워 풀어 둡니다.", "ข้าวเย็นชื้นจะลดอุณหภูมิและทำให้ไส้แฉะ ควรอุ่นและแยกเมล็ดก่อน"),
      ml("A runny ordinary egg is not a safe serving target; cook the centre to 74°C even though the sheet should remain tender.", "一般雞蛋不可只追求流心；即使蛋皮要柔嫩，中心仍須達 74°C 才能安全上桌。", "普通の卵を流し状のまま出さず、薄く柔らかくても中心は74℃まで加熱します。", "일반 달걀을 흐르는 상태로 내지 말고 얇고 부드러워도 중심을 74°C까지 익힙니다.", "อย่าเสิร์ฟไข่ธรรมดาแบบไหล แม้แผ่นไข่จะนุ่ม ศูนย์กลางต้องถึง 74°C เพื่อความปลอดภัย" )
    ],
    substitutions: [
      ml("Use 180 g boneless chicken breast instead of thigh, cut to the same 1.5 cm dice and checked to 74°C.", "可用 180 公克去骨雞胸肉取代雞腿，維持 1.5 公分丁並測至 74°C。", "鶏もも肉は鶏むね肉180gに替えられます。同じ1.5cm角に切り、74℃まで確認します。", "닭다리살은 닭가슴살 180g으로 바꾸되 같은 1.5cm로 썰고 74°C까지 확인합니다.", "เปลี่ยนสะโพกเป็นอกไก่ 180 กรัมได้ หั่น 1.5 ซม. เท่าเดิมและตรวจถึง 74°C"),
      ml("For a vegetarian version, replace chicken with 180 g firm tofu, pressed dry and diced 1.5 cm; brown it before the onion.", "素食版本可用 180 公克板豆腐取代雞肉，壓乾切 1.5 公分丁，先煎上色再炒洋蔥。", "植物性にするなら鶏肉を木綿豆腐180gに替え、水切りして1.5cm角に切り、玉ねぎの前に焼き色を付けます。", "채식으로는 닭을 단단한 두부 180g으로 바꾸고 물기를 눌러 1.5cm로 썰어 양파 전에 갈색을 냅니다.", "แบบมังสวิรัติเปลี่ยนไก่เป็นเต้าหู้แข็ง 180 กรัม กดน้ำหั่น 1.5 ซม. จี่ให้สีก่อนผัดหอมใหญ่")
    ],
    storage: ml("Cool the chicken rice and omelette within 2 hours, refrigerate airtight for up to 2 days, and reheat until the chicken and egg centre reach 74°C. Add fresh ketchup after reheating.", "雞肉炒飯與蛋包 2 小時內放涼，密封冷藏最多 2 天；復熱至雞肉與蛋中心達 74°C，再補淋新番茄醬。", "チキンライスと卵は2時間以内に冷まし、密閉冷蔵2日まで。鶏肉と卵の中心を74℃まで再加熱し、ケチャップは後からかけます。", "치킨밥과 달걀은 2시간 안에 식혀 밀폐 냉장 2일까지 보관합니다. 닭과 달걀 중심을 74°C까지 데운 뒤 케첩을 새로 올립니다.", "ทำข้าวไก่และไข่ให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 2 วัน อุ่นจนไก่และกลางไข่ถึง 74°C แล้วราดซอสมะเขือเทศใหม่"),
    cultureNote: ml("Omurice is a Japanese yoshoku combination of omelette and seasoned rice; ketchup chicken rice is one familiar home-style form, while restaurant shapes and sauces vary.", "蛋包飯是日本洋食中將蛋皮與調味飯結合的形式；番茄醬雞肉飯是常見家常版本，餐廳形狀與醬汁各有差異。", "オムライスは卵と味付けご飯を組み合わせた日本の洋食です。ケチャップチキンライスは家庭で親しまれる一形態で、店により形やソースは異なります。", "오므라이스는 달걀과 양념 밥을 결합한 일본식 양식이며 케첩 치킨밥은 익숙한 가정식 형태로, 가게마다 모양과 소스가 다릅니다.", "ออมไรซ์เป็นโยโชกุญี่ปุ่นที่รวมไข่กับข้าวปรุงรส ข้าวไก่ซอสมะเขือเทศเป็นรูปแบบคุ้นเคยในบ้าน แต่ร้านต่าง ๆ มีรูปทรงและซอสต่างกัน"),
    sources: [
      { title: "Just One Cookbook — Omurice", url: "https://www.justonecookbook.com/omurice-japanese-omelette-rice/" },
      { title: "Taste of Japan (JETRO) — Omurice", url: "https://japan-food.jetro.go.jp/en/recipe/125.html" }
    ],
    imageAlt: ml("Fully set thin omelette cut open to show chicken ketchup rice with one broad ketchup stripe and no garnish", "全熟薄蛋包切開露出雞肉番茄醬炒飯，表面有一條寬番茄醬且無裝飾", "薄く完全に火を通した卵を切り開き、チキンケチャップライスと中央のケチャップ一本を見せた飾りなしのオムライス", "완전히 익힌 얇은 달걀을 갈라 치킨 케첩밥을 보이고 중앙에 넓은 케첩 한 줄만 올린 오므라이스", "ออมไรซ์ไข่แผ่นบางสุกทั่ว ผ่าเห็นข้าวผัดไก่มะเขือเทศ ราดซอสกว้างหนึ่งเส้น ไม่มีเครื่องตกแต่ง"),
    visualSpec: "Real finished-dish brief: a fully set thin yellow omelette cut open to expose chicken-and-tomato ketchup rice, topped with one broad uninterrupted ketchup stripe; plain plate and no garnish."
  },

  {
    id: "nikujaga",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 20,
    cookMinutes: 35,
    totalMinutes: 55,
    servings: 4,
    name: ml("Pork nikujaga", "豬肉馬鈴薯燉煮", "豚肉の肉じゃが", "돼지고기 니쿠자가", "นิกุจากะหมู"),
    description: ml(
      "Thin pork, chunky potatoes, onion, carrot, and shirataki simmer in a sweet soy broth until tender.",
      "薄豬肉、大塊馬鈴薯、洋蔥、紅蘿蔔與蒟蒻絲在甘甜醬油高湯中燉至柔軟。",
      "薄切り豚肉、食べ応えのあるじゃがいも、玉ねぎ、にんじん、しらたきを甘辛い煮汁で柔らかく煮ます。",
      "얇은 돼지고기, 큼직한 감자, 양파, 당근, 시라타키를 달콤한 간장 국물에 부드럽게 끓입니다.",
      "ตุ๋นหมูสไลซ์ มันฝรั่งชิ้นใหญ่ หอมใหญ่ แครอต และเส้นชิราทากิในน้ำซอสถั่วเหลืองหวานจนเปื่อยนุ่ม"
    ),
    ingredients: [
      ingredient("300 g", ml("thinly sliced pork shoulder, cut into 3 cm pieces", "豬肩薄片，切 3 公分段", "豚肩薄切り肉（3cm幅）", "돼지 목살 얇은 조각, 3cm로 자르기", "ไหล่หมูสไลซ์บาง หั่นท่อน 3 ซม.")),
      ingredient("500 g", ml("potatoes, peeled and cut into 4 cm chunks", "馬鈴薯，去皮切 4 公分大塊", "じゃがいも（皮をむき4cmの塊）", "감자, 껍질을 벗겨 4cm 큼직하게 썰기", "มันฝรั่งปอกเปลือกหั่นชิ้นใหญ่ 4 ซม.")),
      ingredient("220 g", ml("onion, cut into 2 cm wedges", "洋蔥，切 2 公分楔形塊", "玉ねぎ（2cm幅のくし形）", "양파, 2cm 쐐기 모양으로 썰기", "หอมใหญ่หั่นเสี้ยวหนา 2 ซม.")),
      ingredient("150 g", ml("carrot, cut into 3 cm rangiri chunks", "紅蘿蔔，切 3 公分亂切塊", "にんじん（3cmの乱切り）", "당근, 3cm 돌려깎기", "แครอตหั่นรันกิริชิ้น 3 ซม.")),
      ingredient("200 g", ml("shirataki konnyaku noodles, rinsed and cut into 5 cm lengths", "蒟蒻絲，沖洗後切 5 公分段", "しらたき（洗って5cm長さ）", "시라타키 곤약면, 헹궈 5cm로 자르기", "เส้นชิราทากิหรือบุก ล้างแล้วหั่นยาว 5 ซม.")),
      ingredient("1 L", ml("cold water for soaking the potatoes", "浸泡馬鈴薯用冷水", "じゃがいもをさらす冷水", "감자를 담글 찬물", "น้ำเย็นสำหรับแช่มันฝรั่ง")),
      ingredient("1 L", ml("water for blanching the shirataki", "汆燙蒟蒻絲用水", "しらたきの下ゆで用の水", "시라타키 데치기용 물", "น้ำสำหรับลวกเส้นชิราทากิ")),
      ingredient("15 ml", ml("neutral cooking oil", "中性食用油", "くせのない食用油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน")),
      ingredient("300 ml", ml("dashi or water", "高湯或水", "だしまたは水", "다시 또는 물", "ดาชิหรือน้ำ")),
      ingredient("45 ml", ml("Japanese soy sauce", "日式醬油", "しょうゆ", "일본 간장", "โชยุญี่ปุ่น")),
      ingredient("45 ml", ml("mirin", "味醂", "みりん", "미림", "มิริน")),
      ingredient("30 ml", ml("sake", "清酒", "酒", "사케", "สาเก")),
      ingredient("18 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย"))
    ],
    instructions: [
      step(ml("Cut and soak the vegetables", "切蔬菜並浸馬鈴薯", "野菜を切ってじゃがいもをさらす", "채소 썰고 감자 담그기", "หั่นผักและแช่มันฝรั่ง"), ml("Cut the potatoes into 4 cm chunks, carrots into 3 cm rangiri pieces, and onion into 2 cm wedges. Soak the potatoes in cold water for 5 minutes, then drain well.", "馬鈴薯切 4 公分大塊、紅蘿蔔切 3 公分亂切塊、洋蔥切 2 公分楔形塊；馬鈴薯浸冷水 5 分鐘後瀝乾。", "じゃがいもを4cmの塊、にんじんを3cmの乱切り、玉ねぎを2cmのくし形に切ります。じゃがいもを冷水に5分さらし、よく水気を切ります。", "감자는 4cm 큼직하게, 당근은 3cm 돌려깎기, 양파는 2cm 쐐기 모양으로 썹니다. 감자를 찬물에 5분 담갔다가 잘 물기를 뺍니다.", "หั่นมันฝรั่งชิ้น 4 ซม. แครอตรันกิริ 3 ซม. และหอมใหญ่เสี้ยว 2 ซม. แช่มันฝรั่งในน้ำเย็น 5 นาทีแล้วสะเด็ดน้ำให้ดี")),
      step(ml("Blanch the shirataki", "汆燙蒟蒻絲", "しらたきを下ゆでする", "시라타키 데치기", "ลวกเส้นชิราทากิ"), ml("Rinse the shirataki, boil it in fresh water for 2 minutes, drain, and cut the noodles into 5 cm lengths so they are easy to portion.", "沖洗蒟蒻絲，用清水煮 2 分鐘後瀝乾，再切成 5 公分段，方便分食。", "しらたきを洗い、新しい湯で2分ゆでて水気を切り、取り分けやすい5cm長さに切ります。", "시라타키를 헹군 뒤 새 물에 2분 삶아 물기를 빼고 먹기 좋은 5cm 길이로 자릅니다.", "ล้างเส้นชิราทากิ ต้มในน้ำใหม่ 2 นาที สะเด็ดน้ำ แล้วหั่นยาว 5 ซม. เพื่อแบ่งเสิร์ฟง่าย")),
      step(ml("Portion the pork and broth", "分切豬肉並量高湯", "豚肉と煮汁を用意する", "돼지고기와 국물 계량하기", "เตรียมหมูและน้ำต้ม"), ml("Keep the pork chilled until cooking, cut any long slices into 3 cm pieces, and measure the dashi, soy sauce, mirin, sake, and sugar before heating the pan.", "豬肉烹調前保持冷藏，長片切成 3 公分段；加熱鍋子前量好高湯、醬油、味醂、清酒與砂糖。", "豚肉は加熱直前まで冷やし、長い薄切りは3cm幅に切ります。鍋を熱する前に、だし、しょうゆ、みりん、酒、砂糖を量ります。", "돼지고기는 조리 직전까지 차갑게 두고 긴 조각은 3cm로 자릅니다. 팬을 달구기 전에 다시, 간장, 미림, 사케, 설탕을 계량합니다.", "เก็บหมูให้เย็นจนก่อนปรุง ตัดชิ้นยาวเป็น 3 ซม. และตวงดาชิ โชยุ มิริน สาเก และน้ำตาลก่อนตั้งกระทะ")),
      step(ml("Brown the pork", "炒豬肉並測溫", "豚肉を炒めて温度を確認する", "돼지고기 볶고 온도 확인하기", "ผัดหมูและตรวจอุณหภูมิ"), ml("Heat the oil in a wide heavy pan over medium heat. Stir-fry the pork for 3–4 minutes until no pink remains; check the thickest piece with a thermometer and continue until it reaches 71°C.", "寬厚鍋以中火加熱油，豬肉翻炒 3–4 分鐘至不再粉紅；用溫度計測最厚處，持續加熱至 71°C。", "幅広い厚手の鍋で油を中火で熱します。豚肉を3～4分炒めて赤みをなくし、最も厚い部分を温度計で測って71℃まで加熱します。", "넓고 두꺼운 팬에 기름을 중불로 달굽니다. 돼지고기를 3–4분 분홍색이 없어질 때까지 볶고 가장 두꺼운 부분을 재어 71°C까지 익힙니다.", "ตั้งกระทะหนากว้างด้วยไฟกลาง ใส่น้ำมัน ผัดหมู 3–4 นาทีจนไม่มีสีชมพู ตรวจชิ้นหนาสุดด้วยเทอร์โมมิเตอร์ให้ถึง 71°C")),
      step(ml("Coat the vegetables", "拌炒蔬菜", "野菜を油で炒める", "채소 코팅하기", "ผัดเคลือบผัก"), ml("Add the drained potatoes, onion, and carrot to the pork. Stir gently for 3–4 minutes so the oil coats the vegetables without breaking the potato chunks.", "將瀝乾的馬鈴薯、洋蔥與紅蘿蔔加入豬肉，輕拌 3–4 分鐘，讓蔬菜裹油但不要弄碎馬鈴薯。", "水気を切ったじゃがいも、玉ねぎ、にんじんを豚肉に加え、いもを崩さないように3～4分やさしく炒めて油をなじませます。", "물기를 뺀 감자, 양파, 당근을 돼지고기에 넣습니다. 감자를 부수지 않게 3–4분 부드럽게 섞어 기름을 입힙니다.", "ใส่มันฝรั่ง หอมใหญ่ และแครอตที่สะเด็ดน้ำลงกับหมู ผัดเบา ๆ 3–4 นาทีให้น้ำมันเคลือบผักโดยไม่ทำมันฝรั่งแตก")),
      step(ml("Sweeten and simmer", "加入甜味液並燉煮", "甘い煮汁で煮る", "달콤한 국물로 끓이기", "เติมน้ำหวานแล้วเคี่ยว"), ml("Pour in the dashi, sake, mirin, and sugar. Bring the liquid to a boil, cover with a drop lid or parchment round, and simmer gently over low heat for 10 minutes.", "倒入高湯、清酒、味醂與砂糖，煮至沸騰；蓋上落し蓋或圓形烘焙紙，轉小火溫和燉煮 10 分鐘。", "だし、酒、みりん、砂糖を注ぎ、沸騰させます。落としぶたまたは丸いクッキングシートをかぶせ、弱火で10分静かに煮ます。", "다시, 사케, 미림, 설탕을 붓고 끓입니다. 오토시부타나 둥근 종이 덮개를 씌워 약불에서 10분 잔잔하게 끓입니다.", "เทดาชิ สาเก มิริน และน้ำตาล ต้มให้เดือด ปิดด้วยฝาลอยหรือกระดาษรองอบกลม แล้วเคี่ยวไฟอ่อน 10 นาที")),
      step(ml("Add soy and shirataki", "加入醬油與蒟蒻絲收汁", "しょうゆとしらたきを加える", "간장과 시라타키 넣기", "ใส่โชยุและเส้นชิราทากิ"), ml("Add the soy sauce and blanched shirataki. Cover and simmer over low heat for 8 minutes, until the potatoes are tender and the thickest pork remains at least 71°C; uncover for the last minute if the broth needs reducing.", "加入醬油與汆燙過的蒟蒻絲，加蓋小火燉 8 分鐘，直到馬鈴薯柔軟且最厚豬肉仍至少 71°C；若湯汁需收濃，最後 1 分鐘開蓋。", "しょうゆと下ゆでしたしらたきを加えます。ふたをして弱火で8分、じゃがいもが柔らかく、最も厚い豚肉が71℃以上になるまで煮ます。汁を詰めるなら最後の1分だけふたを外します。", "간장과 데친 시라타키를 넣습니다. 뚜껑을 덮어 약불에서 8분, 감자가 부드럽고 가장 두꺼운 돼지고기가 71°C 이상이 될 때까지 끓입니다. 국물이 더 필요하면 마지막 1분만 뚜껑을 엽니다.", "ใส่โชยุและเส้นชิราทากิที่ลวกแล้ว ปิดฝาเคี่ยวไฟอ่อน 8 นาทีจนมันฝรั่งนุ่มและหมูชิ้นหนาสุดยังอย่างน้อย 71°C หากต้องการลดน้ำให้เปิดฝาเฉพาะนาทีสุดท้าย")),
      step(ml("Rest and serve", "靜置後上桌", "休ませて盛り付ける", "뜸 들여 담기", "พักแล้วเสิร์ฟ"), ml("Turn off the heat, cover, and rest for 8 minutes so the vegetables absorb the broth. Ladle only the pork, chunky vegetables, and shirataki into a red bowl and serve without peas, scallions, rice, or extra garnish.", "關火加蓋靜置 8 分鐘，讓蔬菜吸收湯汁；只將豬肉、大塊蔬菜與蒟蒻絲舀入紅碗，上桌時不加豌豆、青蔥、米飯或其他裝飾。", "火を止めてふたをし、8分休ませて野菜に煮汁を含ませます。豚肉、具の大きな野菜、しらたきだけを赤い器に盛り、グリーンピース、ねぎ、ご飯などの飾りは添えません。", "불을 끄고 뚜껑을 덮어 8분 뜸 들여 채소에 국물을 배게 합니다. 돼지고기, 큼직한 채소, 시라타키만 빨간 그릇에 담고 완두콩·대파·밥·다른 고명은 올리지 않습니다.", "ปิดไฟ ปิดฝาพัก 8 นาทีให้ผักดูดน้ำซุป ตักเฉพาะหมู ผักชิ้นใหญ่ และเส้นชิราทากิใส่ชามแดง เสิร์ฟโดยไม่ใส่ถั่วลันเตา ต้นหอม ข้าว หรือเครื่องตกแต่งอื่น"))
    ],
    tips: [
      ml("Use a wide pan and a drop lid so the broth reaches every piece while the potato chunks stay intact.", "使用寬鍋與落し蓋，湯汁才能均勻接觸每塊食材，馬鈴薯也不易碎。", "幅広い鍋と落としぶたを使うと煮汁が全体に回り、じゃがいもの塊も崩れにくくなります。", "넓은 팬과 오토시부타를 쓰면 국물이 모든 재료에 닿고 감자 덩어리도 무너지지 않습니다.", "ใช้กระทะกว้างและฝาลอยให้น้ำซุปเคลือบทั่ว ช่วยรักษาชิ้นมันฝรั่งไม่ให้แตก"),
      ml("Let the covered stew rest for 8 minutes; the residual heat carries flavor into the potatoes and onion.", "燉好後加蓋靜置 8 分鐘，餘溫會讓味道深入馬鈴薯與洋蔥。", "煮上がりをふた付きで8分休ませると、余熱でじゃがいもと玉ねぎに味が入ります。", "끓인 뒤 덮어 8분 두면 잔열로 감자와 양파에 맛이 스밉니다.", "พักโดยปิดฝา 8 นาทีหลังเคี่ยว ความร้อนคงเหลือจะพารสเข้าเนื้อมันฝรั่งและหอมใหญ่")
    ],
    commonMistakes: [
      ml("A hard boil can break the potatoes and make the shirataki tangle; keep the liquid at a quiet simmer.", "猛烈沸騰會使馬鈴薯碎裂、蒟蒻絲糾結；請維持安靜的小火沸騰。", "強く沸かすとじゃがいもが崩れ、しらたきが絡むので、静かな煮立ちを保ちます。", "세게 끓이면 감자가 부서지고 시라타키가 엉키므로 잔잔하게 끓이세요.", "การเดือดแรงทำให้มันฝรั่งแตกและเส้นชิราทากิพันกัน ควรเคี่ยวเบา ๆ"),
      ml("Adding soy sauce before the sweet simmer can slow flavor absorption; add it after the first 10 minutes as written.", "在甜味燉煮前加入醬油會降低入味速度；請依步驟先燉 10 分鐘再加醬油。", "甘い煮汁で最初に煮る前にしょうゆを入れると味が入りにくいので、最初の10分後に加えます。", "달콤한 국물로 먼저 끓이기 전에 간장을 넣으면 배임이 늦어지니 처음 10분 뒤에 넣습니다.", "การใส่โชยุก่อนเคี่ยวรสหวานอาจทำให้รสซึมช้า ให้เคี่ยว 10 นาทีแรกก่อนแล้วค่อยใส่โชยุ")
    ],
    substitutions: [
      ml("Replace pork shoulder with 300 g thinly sliced pork belly; still cook the thickest piece to 71°C.", "豬肩肉可改用 300 公克豬五花薄片；最厚處仍須加熱至 71°C。", "豚肩肉は薄切り豚バラ肉300gに替えられます。最も厚い部分は71℃まで加熱します。", "돼지 목살은 얇게 썬 삼겹살 300g으로 바꿀 수 있으며 가장 두꺼운 부분은 71°C까지 익힙니다.", "เปลี่ยนไหล่หมูเป็นหมูสามชั้นสไลซ์ 300 กรัมได้ แต่ชิ้นหนาสุดต้องถึง 71°C"),
      ml("Use 300 ml water instead of dashi and add 2 g kombu powder only if it is already part of your pantry; do not add a visible garnish.", "可用 300 毫升水取代高湯；若家中已有昆布粉可加 2 公克，但不要加入可見裝飾。", "だしは水300mlに替えられます。手元に昆布粉があれば2g加えてもよいですが、見える飾りは加えません。", "다시는 물 300ml로 바꿀 수 있으며 집에 다시마 가루가 있으면 2g 넣어도 됩니다. 보이는 고명은 추가하지 않습니다.", "เปลี่ยนดาชิเป็นน้ำ 300 มล. ได้ หากมีผงคอมบุอยู่แล้วเติม 2 กรัมได้ แต่ห้ามเติมเครื่องตกแต่งที่มองเห็น")
    ],
    storage: ml("Cool within 2 hours, refrigerate the stew in a sealed shallow container for up to 3 days, and reheat until steaming hot with the pork at least 74°C.", "2 小時內放涼，將燉煮物密封放入淺容器冷藏最多 3 天；復熱至冒蒸氣且豬肉至少 74°C。", "2時間以内に冷まし、浅い密閉容器で冷蔵して3日以内に食べます。湯気が立ち、豚肉が74℃以上になるまで再加熱します。", "2시간 안에 식혀 얕은 밀폐 용기에 담아 냉장 3일까지 보관합니다. 김이 나고 돼지고기가 74°C 이상이 될 때까지 재가열합니다.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นในภาชนะตื้นปิดสนิทได้ 3 วัน อุ่นจนมีไอและหมูอย่างน้อย 74°C"),
    cultureNote: ml("Nikujaga is a Japanese simmered home-style dish named for meat and potatoes; pork, soy seasoning, and vegetable choices vary among regional and family versions.", "肉じゃが是以肉與馬鈴薯命名的日式燉煮家常菜；豬肉、醬油調味與蔬菜選擇會因地區與家庭而異。", "肉じゃがは肉とじゃがいもに由来する日本の煮物で、豚肉、しょうゆ味、野菜の選び方は地域や家庭で異なります。", "니쿠자가는 고기와 감자에서 이름이 온 일본식 조림 가정식이며 돼지고기, 간장 양념, 채소 선택은 지역과 가정에 따라 다릅니다.", "นิกุจากะเป็นอาหารตุ๋นแบบบ้านญี่ปุ่นที่ชื่อมาจากเนื้อกับมันฝรั่ง การใช้หมู การปรุงโชยุ และชนิดผักต่างกันตามภูมิภาคและครอบครัว"),
    sources: [
      { title: "Kikkoman — Nikujaga (Japanese Meat and Potato Stew)", url: "https://www.kikkoman.com/en/cookbook/washoku/nikujaga.html" },
      { title: "Just One Cookbook — Nikujaga (Japanese Meat and Potato Stew)", url: "https://www.justonecookbook.com/nikujaga/" }
    ],
    imageAlt: ml("Pork nikujaga in a red bowl with thin pork, chunky potatoes, onion, carrot, and shirataki noodles, tightly cropped away from side dishes", "紅碗豬肉肉じゃが，含薄豬肉、大塊馬鈴薯、洋蔥、紅蘿蔔與蒟蒻絲，裁切避開旁邊小菜", "薄切り豚肉、じゃがいも、玉ねぎ、にんじん、しらたきを赤い器に盛った肉じゃが。脇の料理を避けた寄りの構図", "얇은 돼지고기, 큼직한 감자, 양파, 당근, 시라타키를 빨간 그릇에 담고 곁들임 반찬을 잘라낸 니쿠자가", "นิกุจากะหมูในชามแดง มีหมูสไลซ์ มันฝรั่งชิ้นใหญ่ หอมใหญ่ แครอต และเส้นชิราทากิ ครอปตัดกับข้าวเคียงด้านข้าง"),
    visualSpec: "Real finished-dish brief: tight crop on a red bowl of pork nikujaga showing thin pork, chunky potato, onion, carrot, and translucent shirataki noodles; exclude the unrelated side dishes at left and do not add peas, scallions, rice, or other garnish."
  }
];
