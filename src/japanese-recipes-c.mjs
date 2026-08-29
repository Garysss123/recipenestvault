const ml = (en, zhHant, ja, ko, th) => ({
  en,
  "zh-hant": zhHant,
  ja,
  ko,
  th
});

const ingredient = (amount, item) => ({ amount, item });

export const japaneseRecipesC = [
  {
    id: "miso-soup",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 35,
    cookMinutes: 15,
    totalMinutes: 50,
    servings: 4,
    name: ml(
      "Classic tofu and wakame miso soup",
      "豆腐裙帶菜味噌湯",
      "豆腐とわかめの味噌汁",
      "두부와 미역 미소된장국",
      "มิโซะซุปเต้าหู้และวากาเมะ"
    ),
    description: ml(
      "A clear kombu-and-katsuobushi dashi with large tofu cubes, tender wakame, and miso stirred in off the heat.",
      "以昆布與柴魚煮成清澈高湯，加入大塊豆腐與裙帶菜，關火後調入味噌。",
      "昆布とかつお節のだしに大きな豆腐とわかめを加え、火を止めて味噌を溶く味噌汁です。",
      "다시마와 가쓰오부시 육수에 큼직한 두부와 미역을 넣고 불을 끈 뒤 미소를 푸는 국입니다.",
      "ซุปมิโซะใสน้ำดาชิจากคอมบุและคัตสึโอะ ใส่เต้าหู้ชิ้นใหญ่กับวากาเมะ แล้วละลายมิโซะหลังปิดไฟ"
    ),
    ingredients: [
      ingredient("700 ml", ml("cold water", "冷水", "冷水", "찬물", "น้ำเย็น")),
      ingredient("8 g", ml("dried kombu", "乾昆布", "乾燥昆布", "말린 다시마", "คอมบุแห้ง")),
      ingredient("12 g", ml("katsuobushi dried bonito flakes", "柴魚片", "かつお節", "가쓰오부시", "ปลาโอแห้งขูด")),
      ingredient("250 g", ml("silken tofu, cut into 3 cm cubes", "嫩豆腐，切 3 公分方塊", "絹ごし豆腐（3cm角）", "연두부, 3cm 깍둑썰기", "เต้าหู้อ่อน หั่นเต๋า 3 ซม.")),
      ingredient("4 g", ml("dried wakame", "乾裙帶菜", "乾燥わかめ", "말린 미역", "วากาเมะแห้ง")),
      ingredient("60 g", ml("awase miso paste", "混合味噌", "合わせ味噌", "아와세 미소", "มิโซะผสม"))
    ],
    instructions: [
      {
        title: ml("Soak the kombu", "浸泡昆布", "昆布を水につける", "다시마 불리기", "แช่คอมบุ"),
        body: ml(
          "Wipe the 8 g kombu with a damp cloth, place it in 700 ml cold water, and soak for 30 minutes. Do not scrub away the pale surface bloom.",
          "用濕布擦拭 8 公克昆布，放入 700 毫升冷水浸泡 30 分鐘；不要刷掉表面的白色結晶。",
          "昆布8gをぬれ布巾で軽く拭き、冷水700mlに30分浸す。表面の白い粉はこすり落とさない。",
          "다시마 8g을 젖은 행주로 가볍게 닦아 찬물 700ml에 30분 담근다. 표면의 흰 가루는 문질러 없애지 않는다.",
          "เช็ดคอมบุ 8 กรัมเบา ๆ ด้วยผ้าชื้น ใส่น้ำเย็น 700 มล. แช่ 30 นาที อย่าขัดคราบขาวบนผิวออก"
        )
      },
      {
        title: ml("Heat the kombu water", "加熱昆布水", "昆布水を温める", "다시마 물 데우기", "อุ่นน้ำคอมบุ"),
        body: ml(
          "Heat the kombu water over medium heat until it reaches 85–90°C and small bubbles gather at the edge. Remove the kombu before the water reaches a full boil.",
          "以中火加熱昆布水至 85–90°C、鍋邊出現細小氣泡；水完全沸騰前取出昆布。",
          "昆布水を中火で85〜90℃まで温め、縁に小さな泡が集まったら沸騰する前に昆布を取り出す。",
          "다시마 물을 중불에서 85–90°C까지 데워 가장자리에 작은 기포가 모이면 완전히 끓기 전에 다시마를 건진다.",
          "อุ่นน้ำคอมบุด้วยไฟกลางจนถึง 85–90°C และมีฟองเล็กริมหม้อ ยกคอมบุออกก่อนเดือดพล่าน"
        )
      },
      {
        title: ml("Steep the bonito", "浸泡柴魚片", "かつお節を浸す", "가쓰오부시 우리기", "แช่คัตสึโอะ"),
        body: ml(
          "Turn off the heat, add 12 g katsuobushi, and steep for 3 minutes without stirring. The liquid should become pale amber and fragrant.",
          "關火後加入 12 公克柴魚片，靜置浸泡 3 分鐘，不要攪拌；液體應呈淡琥珀色並有香氣。",
          "火を止めてかつお節12gを加え、混ぜずに3分置く。だしが淡い琥珀色で香り高くなればよい。",
          "불을 끄고 가쓰오부시 12g을 넣어 젓지 않고 3분 우린다. 국물이 옅은 호박색이고 향이 나야 한다.",
          "ปิดไฟ ใส่คัตสึโอะ 12 กรัม แช่ 3 นาทีโดยไม่คน น้ำดาชิควรเป็นสีอำพันอ่อนและหอม"
        )
      },
      {
        title: ml("Strain the dashi", "過濾高湯", "だしをこす", "다시 거르기", "กรองน้ำดาชิ"),
        body: ml(
          "Strain the dashi through a fine sieve into a clean pot, pressing the flakes only lightly. Return 600 ml clear dashi to the pot and discard the kombu and bonito solids.",
          "將高湯以細網過濾到乾淨鍋中，只輕壓柴魚片；取 600 毫升清澈高湯回鍋，昆布與柴魚渣丟棄。",
          "だしを細かいこし器で清潔な鍋にこし、かつお節は軽く押すだけにする。澄んだだし600mlを鍋に戻し、昆布とかすは捨てる。",
          "고운 체로 육수를 깨끗한 냄비에 거르고 가쓰오부시는 살짝만 누른다. 맑은 육수 600ml를 냄비에 되돌리고 다시마와 찌꺼기는 버린다.",
          "กรองน้ำดาชิด้วยกระชอนถี่ลงหม้อสะอาด กดคัตสึโอะเบา ๆ เท่านั้น เติมน้ำดาชิใส 600 มล. กลับหม้อ แล้วทิ้งคอมบุและกากปลา"
        )
      },
      {
        title: ml("Prepare tofu and wakame", "準備豆腐與裙帶菜", "豆腐とわかめを準備する", "두부와 미역 준비", "เตรียมเต้าหู้และวากาเมะ"),
        body: ml(
          "Soak 4 g dried wakame in cool water for 5 minutes, drain and squeeze it dry, then cut large pieces once. Cut the tofu into even 3 cm cubes.",
          "將 4 公克乾裙帶菜以冷水浸泡 5 分鐘，瀝乾擠去水分，大片只切一刀；豆腐切成均勻 3 公分方塊。",
          "乾燥わかめ4gを冷水に5分浸し、水気を絞って大きいものだけ一度切る。豆腐は3cm角にそろえる。",
          "말린 미역 4g을 찬물에 5분 불리고 물기를 꼭 짠 뒤 큰 조각만 한 번 자른다. 두부는 3cm 크기로 고르게 썬다.",
          "แช่วากาเมะแห้ง 4 กรัมในน้ำเย็น 5 นาที สะเด็ดและบีบให้แห้ง ตัดชิ้นใหญ่เพียงครั้งเดียว หั่นเต้าหู้เป็นเต๋า 3 ซม. เท่ากัน"
        )
      },
      {
        title: ml("Warm tofu and wakame", "加熱豆腐與裙帶菜", "豆腐とわかめを温める", "두부와 미역 데우기", "อุ่นเต้าหู้และวากาเมะ"),
        body: ml(
          "Warm the 600 ml dashi over medium-low heat to 80–85°C. Add the tofu and wakame and heat for 2–3 minutes until the tofu is hot, keeping the broth below a boil.",
          "以中小火將 600 毫升高湯加熱至 80–85°C，加入豆腐與裙帶菜煮 2–3 分鐘至豆腐熱透，湯汁不可沸騰。",
          "だし600mlを中弱火で80〜85℃まで温め、豆腐とわかめを加えて2〜3分、豆腐が熱くなるまで煮る。沸騰させない。",
          "육수 600ml를 중약불에서 80–85°C로 데운다. 두부와 미역을 넣고 2–3분 두부가 뜨거워질 때까지 데우되 끓이지 않는다.",
          "อุ่นน้ำดาชิ 600 มล. ด้วยไฟกลางอ่อนจนถึง 80–85°C ใส่เต้าหู้และวากาเมะ อุ่น 2–3 นาทีจนเต้าหู้ร้อนทั่ว โดยอย่าให้เดือด"
        )
      },
      {
        title: ml("Dissolve the miso off heat", "關火調開味噌", "火を止めて味噌を溶く", "불 끄고 미소 풀기", "ละลายมิโซะนอกไฟ"),
        body: ml(
          "Turn off the heat. Ladle some 75–80°C broth into a small bowl, whisk in all 60 g miso until smooth, then return it to the pot. Never boil after the miso is added.",
          "關火，舀出部分 75–80°C 高湯到小碗，將全部 60 公克味噌攪拌至順滑，再倒回鍋中；加入味噌後不可煮沸。",
          "火を止め、75〜80℃のだしを少量小鉢に取り、味噌60gをなめらかに溶いて鍋へ戻す。味噌を加えてから沸騰させない。",
          "불을 끈다. 75–80°C 육수를 조금 덜어 작은 그릇에서 미소 60g을 매끈하게 푼 뒤 냄비에 돌려 넣는다. 미소를 넣은 뒤 끓이지 않는다.",
          "ปิดไฟ ตักน้ำดาชิอุณหภูมิ 75–80°C เล็กน้อยใส่ถ้วย คนมิโซะ 60 กรัมให้เนียนแล้วเทกลับหม้อ หลังใส่มิโซะห้ามต้ม"
        )
      },
      {
        title: ml("Serve at a gentle temperature", "保持適口湯溫上桌", "適温で盛る", "알맞은 온도로 내기", "เสิร์ฟที่อุณหภูมิพอดี"),
        body: ml(
          "Rest the soup for 1 minute, check that it is about 70–75°C, and serve immediately. The finished broth should look pale and evenly dispersed, with intact tofu and tender rather than swollen wakame.",
          "讓湯靜置 1 分鐘，確認約 70–75°C 後立即上桌；成湯應呈淡色且味噌均勻分散，豆腐完整，裙帶菜柔嫩但不泡脹。",
          "1分休ませ、70〜75℃ほどになったらすぐ盛る。仕上がりは淡い色で味噌が均一に分散し、豆腐は崩れず、わかめは膨らみすぎず柔らかくする。",
          "1분 두었다가 약 70–75°C인지 확인해 바로 낸다. 완성된 국물은 옅고 미소가 고르게 퍼지며 두부는 온전하고 미역은 불어 터지지 않고 부드러워야 한다.",
          "พักซุป 1 นาที ตรวจให้อยู่ราว 70–75°C แล้วเสิร์ฟทันที น้ำซุปควรสีอ่อนและมิโซะกระจายสม่ำเสมอ เต้าหู้ไม่แตก วากาเมะนุ่มไม่พองเกินไป"
        )
      }
    ],
    tips: [
      ml(
        "Add miso off the heat so its aroma stays bright; a thermometer is more reliable than waiting for visible steam.",
        "關火後才加入味噌，香氣會更清爽；用溫度計比只看蒸氣更可靠。",
        "味噌は火を止めてから加えると香りが生きる。湯気だけでなく温度計で確認すると確実です。",
        "미소는 불을 끈 뒤 넣어 향을 살린다. 김보다 온도계를 쓰는 편이 정확하다.",
        "ใส่มิโซะหลังปิดไฟเพื่อรักษากลิ่นหอม ใช้เทอร์โมมิเตอร์ตรวจจะแม่นกว่าดูไอน้ำ"
      ),
      ml(
        "Cut the tofu evenly and squeeze the wakame well so the photographed clear broth is not diluted or crowded with seaweed.",
        "豆腐切得均勻並將裙帶菜擠乾，清湯才不會被稀釋或塞滿海帶。",
        "豆腐を均一に切り、わかめをしっかり絞ると、だしが薄まらず海藻が多すぎません。",
        "두부를 고르게 자르고 미역을 잘 짜야 맑은 육수가 묽어지거나 미역으로 가득 차지 않는다.",
        "หั่นเต้าหู้ให้เท่ากันและบีบวากาเมะให้ดี น้ำซุปจะไม่จางและสาหร่ายไม่แน่นเกินไป"
      )
    ],
    commonMistakes: [
      ml(
        "Boiling the finished soup after adding miso dulls the aroma and can make the tofu break at the edges.",
        "加入味噌後把成湯煮沸會使香氣變鈍，也可能讓豆腐邊緣碎裂。",
        "味噌を入れた後に沸騰させると香りが飛び、豆腐の角も崩れやすくなります。",
        "미소를 넣은 뒤 완성된 국을 끓이면 향이 둔해지고 두부 모서리가 부서질 수 있다.",
        "การต้มซุปหลังใส่มิโซะทำให้กลิ่นหายและขอบเต้าหู้อาจแตก"
      ),
      ml(
        "Leaving wakame in water too long makes it dominate the bowl; drain it when the pieces are just tender and expanded.",
        "裙帶菜泡太久會搶走整碗比例；剛變柔軟、稍微膨脹時就要瀝乾。",
        "わかめを長く戻しすぎると器を占めるので、柔らかく少し戻った時点で水を切ります。",
        "미역을 너무 오래 불리면 그릇을 가득 채우므로 부드럽게 조금 불었을 때 건진다.",
        "แช่วากาเมะนานเกินไปจะเต็มชาม ควรสะเด็ดเมื่อเริ่มนุ่มและพองพอดี"
      )
    ],
    substitutions: [
      ml(
        "Replace awase miso with 60 g white miso for a sweeter soup or 50 g red miso for a stronger soup; taste before serving.",
        "混合味噌可改用 60 公克白味噌做出較甜湯頭，或用 50 公克赤味噌做出較濃風味，最後再試味。",
        "合わせ味噌は白味噌60gなら甘め、赤味噌50gなら濃い味になります。盛る前に味を確認します。",
        "아와세 미소 대신 흰 미소 60g은 달콤하게, 붉은 미소 50g은 진하게 만든다. 내기 전에 간을 본다.",
        "เปลี่ยนมิโซะผสมเป็นมิโซะขาว 60 กรัมเพื่อรสหวาน หรือมิโซะแดง 50 กรัมเพื่อรสเข้ม ชิมก่อนเสิร์ฟ"
      ),
      ml(
        "For a vegetarian dashi, replace the katsuobushi with 10 g dried shiitake and use 600 ml of the strained mushroom-kombu stock.",
        "素食高湯可將柴魚片改為 10 公克乾香菇，過濾後使用 600 毫升香菇昆布高湯。",
        "植物性だしなら、かつお節を干ししいたけ10gに替え、こした昆布しいたけだし600mlを使います。",
        "채식 다시는 가쓰오부시 대신 말린 표고 10g을 쓰고 거른 표고·다시마 육수 600ml를 사용한다.",
        "สำหรับดาชิมังสวิรัติ เปลี่ยนคัตสึโอะเป็นเห็ดหอมแห้ง 10 กรัม ใช้น้ำคอมบุเห็ดที่กรองแล้ว 600 มล."
      )
    ],
    storage: ml(
      "Cool quickly, refrigerate covered for up to 2 days, and reheat gently to 70–75°C without boiling. The wakame will soften after storage.",
      "快速放涼後加蓋冷藏最多 2 天，溫和加熱至 70–75°C 且不要煮沸；裙帶菜冷藏後會變軟。",
      "すぐ冷ましてふたをし、冷蔵2日以内に。沸騰させず70〜75℃までやさしく温め、保存後はわかめが柔らかくなります。",
      "빠르게 식혀 덮어 냉장하고 2일 안에 먹는다. 끓이지 말고 70–75°C까지 부드럽게 데우며 미역은 보관 후 부드러워진다.",
      "ทำให้เย็นเร็ว ปิดฝาแช่เย็นไม่เกิน 2 วัน อุ่นเบา ๆ ถึง 70–75°C โดยไม่ต้ม วากาเมะจะนิ่มลงหลังเก็บ"
    ),
    cultureNote: ml(
      "Miso soup is a daily washoku staple whose dashi, miso and seasonal additions vary by household and region; tofu and wakame are a familiar light combination.",
      "味噌湯是日常和食的重要湯品，各地與家庭會依高湯、味噌及季節食材調整；豆腐與裙帶菜是常見清爽組合。",
      "味噌汁は和食の日常を支える汁物で、だし、味噌、季節の具は家庭や地域で変わります。豆腐とわかめは軽い定番の組み合わせです。",
      "미소된장국은 다시, 미소, 계절 재료를 가정과 지역에 따라 달리하는 일상 와쇼쿠 국이며 두부와 미역은 가벼운 조합이다.",
      "ซุปมิโซะเป็นน้ำซุปประจำของวะโชกุ ดาชิ มิโซะ และเครื่องตามฤดูกาลต่างกันตามบ้านและภูมิภาค เต้าหู้กับวากาเมะเป็นคู่คลาสสิกที่เบา"
    ),
    sources: [
      { title: "Just One Cookbook — Homemade Miso Soup", url: "https://www.justonecookbook.com/homemade-miso-soup/" },
      { title: "Japanese Cooking 101 — Miso Soup Recipe", url: "https://www.japanesecooking101.com/miso-soup-recipe/" }
    ],
    imageAlt: ml(
      "Real photograph of a red bowl of pale miso broth with several large tofu cubes and dark wakame pieces; no scallion garnish.",
      "實拍紅碗味噌湯，淡色湯中有數塊大豆腐與深色裙帶菜，沒有青蔥點綴。",
      "赤い椀に淡い味噌汁を盛り、大きな豆腐と濃い色のわかめが見える実写写真。ねぎの飾りはない。",
      "붉은 그릇의 옅은 미소 국물에 큼직한 두부와 짙은 미역이 보이는 실사 사진이며 대파 고명은 없다.",
      "ภาพถ่ายจริงของซุปมิโซะสีอ่อนในชามแดง มีเต้าหู้ชิ้นใหญ่และวากาเมะสีเข้ม ไม่มีต้นหอมโรย"
    ),
    visualSpec: "Real finished-dish photograph: a red-lacquer bowl of pale miso broth with several large tofu cubes and dark wakame pieces; no scallion, spoon garnish or unlisted topping."
  },

  {
    id: "onigiri",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 35,
    cookMinutes: 30,
    totalMinutes: 65,
    servings: 3,
    name: ml(
      "Plain salted nori onigiri",
      "鹽味海苔飯糰",
      "塩むすびの海苔おにぎり",
      "소금 김 삼각 주먹밥",
      "โอนิกิริเกลือห่อสาหร่าย"
    ),
    description: ml(
      "Soft short-grain rice is lightly salted, shaped into six loose triangles, and wrapped in crisp nori with no visible filling.",
      "短粒米趁溫熱輕鹽調味，捏成六顆鬆軟三角飯糰，包上酥脆海苔，不放可見餡料。",
      "短粒米に塩を軽くまとわせ、具を見せない三角形のおにぎり6個に握って、ぱりっとした海苔で包みます。",
      "단립종 밥에 소금을 가볍게 묻혀 속을 보이지 않는 느슨한 삼각 주먹밥 6개를 만들고 바삭한 김으로 감싼다.",
      "ข้าวเมล็ดสั้นคลุกเกลืออ่อน ๆ ปั้นเป็นสามเหลี่ยมหลวม 6 ก้อนโดยไม่มีไส้ให้เห็น แล้วห่อด้วยสาหร่ายโนริกรอบ"
    ),
    ingredients: [
      ingredient("300 g", ml("Japanese short-grain rice", "日本短粒米", "日本の短粒米", "일본 단립종 쌀", "ข้าวญี่ปุ่นเมล็ดสั้น")),
      ingredient("360 ml", ml("water for cooking the rice", "煮飯用水", "炊飯用の水", "밥 짓는 물", "น้ำสำหรับหุงข้าว")),
      ingredient("1.5 L", ml("water for rinsing the rice", "淘洗米用水", "米を研ぐ水", "쌀 씻는 물", "น้ำสำหรับล้างข้าว")),
      ingredient("4 g", ml("fine salt", "細鹽", "細塩", "고운 소금", "เกลือละเอียด")),
      ingredient(ml("2 sheets / about 5 g", "2 張 / 約 5 公克", "2枚 / 約 5 g", "2장 / 약 5 g", "2 แผ่น / ประมาณ 5 กรัม"), ml("roasted nori, about 5 g", "烘烤海苔，約 5 公克", "焼きのり（約5g）", "구운 김, 약 5g", "โนริย่างประมาณ 5 กรัม"))
    ],
    instructions: [
      {
        title: ml("Rinse the rice", "淘洗米", "米を研ぐ", "쌀 씻기", "ล้างข้าว"),
        body: ml(
          "Rinse the 300 g short-grain rice in the 1.5 L rinsing water three times, rubbing gently, until the water is less cloudy. Drain for 10 minutes.",
          "將 300 公克短粒米用 1.5 公升淘洗水輕輕搓洗三次，直到水色較清，再瀝乾 10 分鐘。",
          "短粒米300gを研ぎ水1.5Lでやさしく3回洗い、水の濁りが減ったら10分水切りする。",
          "단립종 쌀 300g을 씻는 물 1.5L로 부드럽게 세 번 씻어 물이 덜 흐려지면 10분 물기를 뺀다.",
          "ล้างข้าวเมล็ดสั้น 300 กรัมในน้ำล้าง 1.5 ลิตรสามครั้งอย่างเบามือจนขุ่นน้อยลง แล้วสะเด็ด 10 นาที"
        )
      },
      {
        title: ml("Soak before cooking", "煮前浸米", "炊く前に浸水する", "밥 짓기 전 불리기", "แช่ก่อนหุง"),
        body: ml(
          "Put the drained rice and 360 ml cooking water in a heavy pot. Cover and soak at room temperature for 20 minutes so the grains hydrate evenly.",
          "將瀝乾的米與 360 毫升煮飯水放入厚底鍋，加蓋室溫浸泡 20 分鐘，讓米粒均勻吸水。",
          "水を切った米と炊飯用の水360mlを厚手の鍋に入れ、ふたをして室温で20分浸し、均一に吸水させる。",
          "물기를 뺀 쌀과 밥물 360ml를 두꺼운 냄비에 넣고 덮어 실온에서 20분 불려 고르게 수분을 흡수시킨다.",
          "ใส่ข้าวที่สะเด็ดกับน้ำหุง 360 มล. ลงหม้อก้นหนา ปิดฝาแช่อุณหภูมิห้อง 20 นาทีให้เมล็ดดูดน้ำทั่วถึง"
        )
      },
      {
        title: ml("Bring the pot to a boil", "煮至沸騰", "沸騰させる", "끓이기", "ต้มให้เดือด"),
        body: ml(
          "Bring the covered pot to a full boil over high heat, about 4–5 minutes. Keep the lid closed so the steam stays in the pot.",
          "加蓋以大火煮至完全沸騰，約 4–5 分鐘；保持鍋蓋閉合，讓蒸氣留在鍋內。",
          "ふたをした鍋を強火で4〜5分、しっかり沸騰させる。蒸気を逃がさないようふたを開けない。",
          "냄비를 덮은 채 센 불에서 약 4–5분 완전히 끓인다. 증기가 빠지지 않게 뚜껑을 열지 않는다.",
          "นำหม้อปิดฝาต้มด้วยไฟแรงให้เดือดเต็มที่ประมาณ 4–5 นาที อย่าเปิดฝาเพื่อเก็บไอน้ำไว้"
        )
      },
      {
        title: ml("Cook the rice gently", "小火煮飯", "弱火で炊く", "약불로 익히기", "หุงไฟอ่อน"),
        body: ml(
          "As soon as the pot boils, reduce to the lowest heat and cook for 12 minutes. Do not stir or peek; the rice should absorb the water and become fully tender.",
          "一沸騰就轉最小火煮 12 分鐘；不要攪拌或掀蓋，米飯應吸收水分並完全熟透。",
          "沸騰したらすぐ弱火に落とし12分炊く。混ぜたりのぞいたりせず、水を吸って米が完全に柔らかくなるまで待つ。",
          "끓자마자 가장 약한 불로 낮춰 12분 익힌다. 젓거나 들여다보지 말고 쌀이 물을 흡수해 완전히 부드러워지게 한다.",
          "ทันทีที่เดือด ลดเป็นไฟอ่อนสุดหุง 12 นาที ห้ามคนหรือแง้มฝา ข้าวต้องดูดน้ำจนสุกนุ่มทั่ว"
        )
      },
      {
        title: ml("Rest and cool the rice", "燜飯並降溫", "蒸らして冷ます", "뜸 들이고 식히기", "พักและคลายร้อนข้าว"),
        body: ml(
          "Turn off the heat and rest the covered rice for 10 minutes. Transfer it to a wide bowl and cool to about 55–60°C, warm enough to shape but not scalding.",
          "關火加蓋燜 10 分鐘，再把米飯移到寬碗中降至約 55–60°C；要溫熱可塑形，但不可燙手。",
          "火を止めてふたをしたまま10分蒸らす。広い器に移し、握れるが熱すぎない55〜60℃ほどまで冷ます。",
          "불을 끄고 덮은 채 10분 뜸 들인다. 넓은 그릇으로 옮겨 뜨겁지 않고 모양을 잡을 수 있는 약 55–60°C로 식힌다.",
          "ปิดไฟพักข้าวปิดฝา 10 นาที ย้ายลงชามกว้างและคลายร้อนถึงราว 55–60°C อุ่นพอปั้นแต่ไม่ลวกมือ"
        )
      },
      {
        title: ml("Salt six portions", "分六份調鹽", "6等分して塩をする", "여섯 몫에 소금하기", "แบ่งหกส่วนคลุกเกลือ"),
        body: ml(
          "Divide the warm rice into six equal portions and distribute all 4 g salt across the portions. Mix each portion lightly with a rice paddle; do not compress it yet.",
          "將溫米飯分成六等份，將全部 4 公克鹽平均分配；每份用飯匙輕拌，不要先壓緊。",
          "温かいご飯を6等分し、塩4gを均等に分けて各分をしゃもじで軽く混ぜる。まだ押し固めない。",
          "따뜻한 밥을 여섯 등분하고 소금 4g을 고르게 나눠 주걱으로 가볍게 섞는다. 아직 누르지 않는다.",
          "แบ่งข้าวอุ่นเป็นหกส่วนเท่ากัน แบ่งเกลือ 4 กรัมใส่ให้ทั่ว คลุกแต่ละส่วนเบา ๆ ด้วยพาย อย่าเพิ่งกดแน่น"
        )
      },
      {
        title: ml("Shape loose triangles", "捏成鬆三角飯糰", "三角形に握る", "느슨한 삼각형 빚기", "ปั้นสามเหลี่ยมหลวม"),
        body: ml(
          "With clean, slightly damp hands, shape each portion into a loose triangle with three gentle presses and turns. Keep the grains together without squeezing them hard or adding a filling.",
          "雙手洗淨微濕，將每份以三次輕壓與轉向捏成鬆軟三角形；讓米粒聚合即可，不要用力壓或加入餡料。",
          "清潔して少し湿らせた手で、各分を3回やさしく押して回し、ふんわりした三角形に握る。強く締めず具は入れない。",
          "깨끗이 씻어 살짝 적신 손으로 각 밥을 세 번 부드럽게 누르고 돌려 느슨한 삼각형을 만든다. 세게 압축하거나 속을 넣지 않는다.",
          "ใช้มือสะอาดชื้นเล็กน้อย กดและหมุนแต่ละส่วนเบา ๆ สามครั้งให้เป็นสามเหลี่ยมหลวม รวบเมล็ดให้ติดกันโดยไม่บีบแรงและไม่ใส่ไส้"
        )
      },
      {
        title: ml("Wrap with nori and serve", "包上海苔上桌", "海苔を巻いて供する", "김을 둘러 내기", "ห่อโนริแล้วเสิร์ฟ"),
        body: ml(
          "Cut the two nori sheets into six pieces and wrap one piece around each onigiri just before serving. Keep the nori crisp and eat within two hours at room temperature.",
          "將兩張海苔剪成六片，上桌前每顆包一片；保持海苔酥脆，室溫放置兩小時內食用。",
          "焼きのり2枚を6片に切り、食べる直前に1片ずつおにぎりへ巻く。海苔をぱりっと保ち、室温では2時間以内に食べる。",
          "구운 김 두 장을 여섯 조각으로 잘라 먹기 직전에 주먹밥마다 한 조각씩 두른다. 김을 바삭하게 유지하고 실온에서는 두 시간 안에 먹는다.",
          "ตัดโนริสองแผ่นเป็นหกชิ้น ห่อก้อนละหนึ่งชิ้นก่อนเสิร์ฟเพื่อให้กรอบ และกินภายในสองชั่วโมงเมื่ออยู่ที่อุณหภูมิห้อง"
        )
      }
    ],
    tips: [
      ml(
        "Shape while the rice is warm and use only gentle pressure; loose grains make a tender onigiri that still holds its triangle.",
        "米飯溫熱時塑形並只用輕力，米粒鬆散才會柔軟又能保持三角形。",
        "ご飯が温かいうちに弱い力で握る。米粒をつぶさない方が柔らかく、三角形も保てます。",
        "밥이 따뜻할 때 약한 힘으로 빚는다. 쌀알을 으깨지 않아야 부드럽고 삼각형도 유지된다.",
        "ปั้นตอนข้าวอุ่นและใช้แรงเบา ๆ เมล็ดที่ไม่ถูกบดจะนุ่มและยังคงรูปสามเหลี่ยม"
      ),
      ml(
        "Wrap nori at the last moment; wrapping early lets moisture from the rice soften the seaweed.",
        "最後一刻才包海苔，太早包會讓米飯的水氣使海苔變軟。",
        "海苔は最後に巻く。早く巻くとご飯の水分でしんなりします。",
        "김은 마지막에 두른다. 일찍 싸면 밥의 수분으로 김이 눅눅해진다.",
        "ห่อโนริในขั้นสุดท้าย ความชื้นจากข้าวจะทำให้สาหร่ายนิ่มหากห่อเร็ว"
      )
    ],
    commonMistakes: [
      ml(
        "Cold or overcooked rice will not bind cleanly; cool it only to a warm shaping temperature and keep the grains distinct.",
        "冷飯或煮過頭的米都難以漂亮成形；降到溫熱可塑形即可，並保留米粒分明。",
        "冷たいご飯や炊きすぎたご飯はまとまりにくい。温かく握れる温度まで冷まし、粒をつぶさない。",
        "차갑거나 너무 익힌 밥은 잘 뭉치지 않는다. 따뜻하게 빚을 수 있을 때까지 식히고 쌀알을 살린다.",
        "ข้าวเย็นหรือหุงเละจะจับตัวไม่ดี คลายร้อนแค่ให้อุ่นพอปั้นและรักษาเมล็ดให้แยกตัว"
      ),
      ml(
        "Wet hands make the surface gummy and salty water dilutes the rice; dampen hands lightly and portion the salt before shaping.",
        "手太濕會讓表面黏糊，鹽水也會稀釋米飯；手只要微濕，並在塑形前分好鹽。",
        "手を濡らしすぎると表面がべたつき、塩水では味が薄まる。手は軽く湿らせ、握る前に塩を分ける。",
        "손에 물이 많으면 표면이 질척하고 소금물이 밥을 희석한다. 손은 살짝만 적시고 빚기 전에 소금을 나눈다.",
        "มือเปียกมากทำให้ผิวแฉะและน้ำเกลือเจือจางข้าว ชุบน้ำเพียงเล็กน้อยและแบ่งเกลือก่อนปั้น"
      )
    ],
    substitutions: [
      ml(
        "Calrose rice can replace Japanese short-grain rice at 300 g; keep the same water volume but rest it an extra 5 minutes after cooking.",
        "可用 300 公克加州米取代日本短粒米，水量相同，煮好後多燜 5 分鐘。",
        "日本の短粒米はカルローズ米300gに替えられます。水量は同じにし、炊飯後の蒸らしを5分延ばします。",
        "일본 단립종 쌀은 칼로스 쌀 300g으로 바꿀 수 있다. 물은 그대로 쓰고 익힌 뒤 뜸을 5분 늘린다.",
        "ใช้ข้าวคาลโรส 300 กรัมแทนข้าวเมล็ดสั้นญี่ปุ่นได้ ใช้น้ำเท่าเดิมและพักหลังหุงเพิ่ม 5 นาที"
      ),
      ml(
        "If roasted nori is unavailable, use six pieces cut from two sheets of plain toasted laver; avoid seasoned nori because it changes the salt level.",
        "沒有烘烤海苔時，可用兩張原味烤海苔剪成六片；避免調味海苔，以免鹹度改變。",
        "焼きのりがなければ味付けしていない板のり2枚を6片に切る。塩分が変わるので味付けのりは避けます。",
        "구운 김이 없으면 무조미 김 두 장을 여섯 조각으로 자른다. 염도가 달라지므로 조미 김은 피한다.",
        "ถ้าไม่มีโนริย่าง ใช้สาหร่ายแผ่นไม่ปรุงรสสองแผ่นตัดหกชิ้น หลีกเลี่ยงโนริปรุงรสเพราะเค็มต่างกัน"
      )
    ],
    storage: ml(
      "For food safety, keep onigiri at room temperature for no more than two hours. If not eating within two hours, refrigerate airtight for up to 1 day; reheat until steaming hot and the centre reaches 74°C, cool to a warm shaping temperature, and wrap with fresh nori.",
      "為了食品安全，飯糰室溫最多放 2 小時；若 2 小時內不吃，密封冷藏最多 1 天。食用前復熱至冒蒸氣且中心達 74°C，再降至溫熱可塑形的程度並包上新海苔。",
      "安全のため、おにぎりは室温で2時間以内に食べる。2時間以内に食べない場合は密閉冷蔵で1日以内にし、食べる前に湯気が立ち中心74℃まで再加熱し、握れる温度まで冷まして新しい海苔を巻く。",
      "식품 안전을 위해 주먹밥은 실온에서 두 시간 안에 먹는다. 두 시간 안에 먹지 않으면 밀폐 냉장해 하루 안에 먹고, 먹기 전 김이 날 때까지 중심 74°C로 재가열한 뒤 빚을 수 있는 따뜻한 온도로 식혀 새 김을 두른다.",
      "เพื่อความปลอดภัย เก็บโอนิกิริที่อุณหภูมิห้องไม่เกินสองชั่วโมง หากไม่กินภายในสองชั่วโมงให้ปิดสนิทแช่เย็นไม่เกินหนึ่งวัน ก่อนกินอุ่นจนมีไอและใจกลางถึง 74°C แล้วคลายร้อนจนปั้นได้และห่อโนริใหม่"
    ),
    cultureNote: ml(
      "Onigiri are portable Japanese rice foods for journeys, school lunches and everyday meals; a little salt helps the rice taste lively and keeps the plain shape practical.",
      "飯糰是日本便於攜帶的米食，常見於旅途、便當與日常餐桌；少量鹽能提味，也讓樸素造型更實用。",
      "おにぎりは旅や弁当、日々の食事に持ち運べる日本の米料理です。少量の塩がご飯を引き締め、具なしの形にも合います。",
      "주먹밥은 여행·도시락·일상 식사에 휴대하는 일본식 쌀 음식이다. 소금은 밥맛을 살리고 속 없는 모양에도 잘 맞는다.",
      "โอนิกิริเป็นอาหารข้าวญี่ปุ่นที่พกพาได้สำหรับเดินทาง ข้าวกล่อง และมื้อประจำวัน เกลือเล็กน้อยช่วยชูรสและเหมาะกับรูปทรงเรียบง่ายไม่มีไส้"
    ),
    sources: [
      { title: "Just One Cookbook — Onigiri Recipe (4 Easy Fillings)", url: "https://www.justonecookbook.com/onigiri-rice-balls/" },
      { title: "Japanese Cooking 101 — Onigiri (Japanese Rice Balls)", url: "https://japanesecooking101.com/rice-ball-onigiri-recipe/" },
      { title: "Kikkoman — Onigiri", url: "https://www.kikkoman.com/en/cookbook/washoku/onigiri.html" }
    ],
    imageAlt: ml(
      "Real photograph of two plain triangular onigiri wrapped in broad sheets of black nori, with no visible filling or garnish.",
      "實拍兩顆三角鹽飯糰，外包大片黑色海苔，沒有可見餡料或裝飾。",
      "具や飾りが見えない、黒い海苔で包んだ三角形のおにぎり2個の実写写真。",
      "속이나 고명이 보이지 않고 검은 김을 넓게 두른 삼각 주먹밥 두 개의 실사 사진.",
      "ภาพถ่ายจริงของโอนิกิริสามเหลี่ยมสองก้อนห่อโนริสีดำแผ่นกว้าง ไม่มีไส้หรือเครื่องตกแต่งให้เห็น"
    ),
    visualSpec: "Real finished-dish photograph: two plain triangular salted rice balls fully wrapped with broad black nori sheets; no visible filling, sesame, garnish or side dish."
  },

  {
    id: "tamagoyaki",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 10,
    cookMinutes: 10,
    totalMinutes: 20,
    servings: 4,
    name: ml(
      "Classic layered tamagoyaki",
      "經典多層玉子燒",
      "だし入り厚焼き玉子",
      "정통 겹겹 다마고야키",
      "ทามาโกะยากิแบบชั้นคลาสสิก"
    ),
    description: ml(
      "A softly sweet, dashi-enriched rolled omelette cooked in thin layers until tender and fully set, then sliced thickly.",
      "以高湯、糖與淡醬油調味蛋液，分層捲煎至柔嫩並完全凝固，再切厚片。",
      "だし、砂糖、薄口しょうゆで味付けした卵液を薄く重ねて巻き、柔らかく完全に固めて厚切りにする玉子焼きです。",
      "다시와 설탕, 연한 간장으로 간한 달걀물을 얇게 겹쳐 말아 부드럽지만 완전히 익힌 뒤 두껍게 썬다.",
      "ไข่ม้วนชั้นบางปรุงด้วยดาชิ น้ำตาล และซีอิ๊วอ่อน ม้วนจนนุ่มแต่เซ็ตตัวทั่วแล้วหั่นหนา"
    ),
    ingredients: [
      ingredient("300 g", ml("large eggs without shells", "去殼大雞蛋", "殻を除いた卵", "껍데기 없는 큰 달걀", "ไข่ไก่ฟองใหญ่ตอกเปลือกออก")),
      ingredient("30 ml", ml("unsalted dashi", "無鹽高湯", "無塩だし", "무염 다시", "ดาชิไม่เค็ม")),
      ingredient("18 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient("2 g", ml("fine salt", "細鹽", "細塩", "고운 소금", "เกลือละเอียด")),
      ingredient("10 ml", ml("light soy sauce", "淡醬油", "薄口しょうゆ", "연한 간장", "ซีอิ๊วขาวรสอ่อน")),
      ingredient("15 ml", ml("neutral cooking oil", "中性食用油", "くせのない食用油", "향이 약한 식용유", "น้ำมันพืชรสอ่อน"))
    ],
    instructions: [
      {
        title: ml("Mix the egg base", "調和蛋液", "卵液を作る", "달걀물 만들기", "ผสมไข่"),
        body: ml(
          "Whisk the 300 g eggs gently with 30 ml dashi, 18 g sugar, 2 g salt and 10 ml light soy sauce. Use a zigzag motion so the eggs combine without incorporating foam.",
          "將 300 公克蛋液與 30 毫升高湯、18 公克糖、2 公克鹽及 10 毫升淡醬油輕輕拌勻，以鋸齒狀攪拌避免打入泡沫。",
          "卵300gにだし30ml、砂糖18g、塩2g、薄口しょうゆ10mlを加え、泡立てないようジグザグにやさしく混ぜる。",
          "달걀 300g에 다시 30ml, 설탕 18g, 소금 2g, 연한 간장 10ml를 넣고 거품이 생기지 않게 지그재그로 부드럽게 섞는다.",
          "คนไข่ 300 กรัมกับดาชิ 30 มล. น้ำตาล 18 กรัม เกลือ 2 กรัม และซีอิ๊วอ่อน 10 มล. เบา ๆ เป็นแนวซิกแซกไม่ให้เกิดฟอง"
        )
      },
      {
        title: ml("Strain for fine layers", "過濾蛋液", "卵液をこす", "달걀물 거르기", "กรองไข่"),
        body: ml(
          "Pass the seasoned egg mixture through a fine sieve into a spouted cup. Let the foam settle for 2 minutes so each layer cooks evenly and stays smooth.",
          "將調味蛋液過細網倒入尖嘴量杯，靜置 2 分鐘讓泡沫消退，使每層均勻平滑。",
          "味付けした卵液を細かいこし器で注ぎ口のあるカップへこす。泡を落ち着かせるため2分置く。",
          "간한 달걀물을 고운 체로 따르는 컵에 거른다. 거품이 가라앉도록 2분 둬 층이 고르게 익게 한다.",
          "กรองไข่ปรุงรสผ่านกระชอนถี่ลงถ้วยมีปาก เทพัก 2 นาทีให้ฟองยุบเพื่อให้แต่ละชั้นสุกเรียบ"
        )
      },
      {
        title: ml("Warm the square pan", "預熱玉子燒鍋", "四角い鍋を温める", "사각 팬 데우기", "อุ่นกระทะสี่เหลี่ยม"),
        body: ml(
          "Warm a clean square tamagoyaki pan over medium-low heat. Dip folded paper in the 15 ml oil and wipe a thin, even film over the base and sides.",
          "以中小火加熱乾淨玉子燒鍋，將折疊紙巾沾取 15 毫升油，均勻擦過鍋底與鍋壁薄薄一層。",
          "清潔した卵焼き鍋を中弱火で温め、折った紙に油15mlを含ませて底と側面に薄く均一に塗る。",
          "깨끗한 다마고야키 팬을 중약불로 데운다. 접은 종이에 기름 15ml를 묻혀 바닥과 옆면에 얇고 고르게 바른다.",
          "อุ่นกระทะทามาโกะยากิสะอาดด้วยไฟกลางอ่อน ชุบกระดาษพับกับน้ำมัน 15 มล. แล้วทาบาง ๆ ให้ทั่วก้นและด้านข้าง"
        )
      },
      {
        title: ml("Set the first layer", "凝固第一層", "最初の層を固める", "첫 층 굳히기", "ทำชั้นแรกให้เซ็ต"),
        body: ml(
          "Pour in a thin quarter of the egg mixture and tilt the pan to cover the base. Cook until the bottom is set while the top remains glossy and softly wet.",
          "倒入約四分之一蛋液並轉動鍋子鋪滿底部；煎至底面凝固、表面仍有光澤且柔濕。",
          "卵液の約4分の1を流し、鍋を傾けて底全体に広げる。底が固まり、表面はつやのある柔らかな半熟になるまで焼く。",
          "달걀물 약 4분의 1을 붓고 팬을 기울여 바닥을 덮는다. 밑면은 굳고 윗면은 윤기 있게 촉촉한 반숙일 때까지 익힌다.",
          "เทไข่ประมาณหนึ่งในสี่และเอียงกระทะให้คลุมก้น อบจนด้านล่างเซ็ตแต่ด้านบนยังเงาและชื้นนุ่ม"
        )
      },
      {
        title: ml("Roll toward the handle", "向手柄捲起", "手前へ巻く", "손잡이 쪽으로 말기", "ม้วนเข้าหาด้าม"),
        body: ml(
          "Use chopsticks or a thin spatula to fold the set edge toward the handle in three relaxed turns. Leave the roll at the far end and oil the exposed pan again.",
          "用筷子或薄鍋鏟將凝固邊向手柄方向輕捲三次，捲好的蛋留在遠端，再替露出的鍋面薄薄補油。",
          "箸か薄いへらで固まった縁を手前へ3回やさしく折り、巻いた卵を奥へ寄せる。空いた面に再び薄く油を塗る。",
          "젓가락이나 얇은 주걱으로 굳은 가장자리를 손잡이 쪽으로 세 번 부드럽게 접어 말고, 말린 달걀을 먼 쪽으로 민다. 빈 팬에 기름을 다시 얇게 바른다.",
          "ใช้ตะเกียบหรือตะหลิวบางพับขอบที่เซ็ตเข้าหาด้ามสามครั้งอย่างผ่อนแรง ดันม้วนไปด้านไกล แล้วทาน้ำมันบาง ๆ บนพื้นที่ว่าง"
        )
      },
      {
        title: ml("Build the middle layers", "重複分層捲煎", "層を重ねて巻く", "층을 더해 말기", "เติมชั้นและม้วน"),
        body: ml(
          "Add another thin quarter of egg, lifting the existing roll so liquid runs underneath it. When the base sets but the surface is still glossy, roll again and repeat until all the mixture is used.",
          "再倒入四分之一蛋液，抬起已有蛋捲讓蛋液流到下方；底部凝固而表面仍有光澤時再次捲起，重複至蛋液用完。",
          "卵液をさらに4分の1流し、巻いた卵を持ち上げて下へ液を回す。底が固まり表面がつややかなうちに巻き、全量を使うまで繰り返す。",
          "달걀물 4분의 1을 더 붓고 기존 롤을 들어 액체가 아래로 흐르게 한다. 밑면은 굳고 표면은 윤기 있을 때 다시 말아 전량을 쓸 때까지 반복한다.",
          "เติมไข่อีกหนึ่งในสี่ ยกม้วนเดิมให้น้ำไข่ไหลใต้ก้อน เมื่อก้นเซ็ตแต่ผิวยังเงาให้ม้วนซ้ำ ทำจนใช้ไข่หมด"
        )
      },
      {
        title: ml("Set the centre safely", "確認中心凝固", "中心まで固める", "속까지 굳히기", "ทำให้แกนกลางสุก"),
        body: ml(
          "Turn the finished roll on all four sides over low heat until evenly golden. Check the thickest centre with a thermometer: it must reach 74°C with no liquid egg remaining.",
          "以小火將完成蛋捲四面轉動煎至均勻金黃，用溫度計確認最厚中心達 74°C，且不可殘留流動蛋液。",
          "完成した巻きを弱火で四面転がし、均一なきつね色にする。最も厚い中心が74℃に達し、液状の卵が残っていないことを温度計で確認する。",
          "완성된 롤을 약불에서 네 면 모두 굴려 고르게 노릇하게 한다. 온도계로 가장 두꺼운 중심이 74°C이고 흐르는 달걀물이 남지 않았는지 확인한다.",
          "กลิ้งม้วนที่เสร็จแล้วทั้งสี่ด้านด้วยไฟอ่อนจนสีทองสม่ำเสมอ ตรวจใจกลางส่วนหนาสุดด้วยเทอร์โมมิเตอร์ให้ถึง 74°C และไม่มีไข่เหลวเหลือ"
        )
      },
      {
        title: ml("Rest and slice", "靜置切片", "休ませて切る", "쉬었다가 썰기", "พักแล้วหั่น"),
        body: ml(
          "Rest the omelette on a board for 3 minutes, then slice it into thick pieces. Serve plain while warm, showing the clean, tender layers rather than adding a garnish.",
          "將蛋捲放砧板靜置 3 分鐘後切成厚片，趁溫熱原味上桌，呈現整齊柔嫩的層次，不加裝飾。",
          "卵焼きをまな板で3分休ませ、厚めに切る。具や飾りを加えず、整った柔らかな層を見せて温かいうちに供する。",
          "달걀말이를 도마에서 3분 쉬게 한 뒤 두껍게 썬다. 고명 없이 정돈된 부드러운 층을 보이며 따뜻할 때 낸다.",
          "พักไข่ม้วนบนเขียง 3 นาทีแล้วหั่นหนา เสิร์ฟแบบไม่แต่งหน้าเมื่อยังอุ่นเพื่อให้เห็นชั้นนุ่มเรียบ"
        )
      }
    ],
    tips: [
      ml(
        "Keep the heat low enough that each layer sets gently; a glossy top is the cue to roll before the egg becomes dry.",
        "火力要低到讓每層溫和凝固；表面仍有光澤就是要捲起、避免蛋變乾的訊號。",
        "各層が穏やかに固まる弱火を保つ。表面のつやが巻く合図で、乾く前に巻きます。",
        "불을 낮춰 각 층이 부드럽게 굳게 한다. 표면이 윤기 있을 때 말아야 달걀이 마르지 않는다.",
        "ใช้ไฟอ่อนพอให้แต่ละชั้นเซ็ตอย่างนุ่มนวล ผิวที่ยังเงาคือสัญญาณให้ม้วนก่อนแห้ง"
      ),
      ml(
        "Oil the empty part of the pan, not just the first layer; this keeps the roll from sticking as it grows.",
        "每次都替露出的鍋面補油，不只煎第一層時加油，蛋捲變厚後才不會沾鍋。",
        "空いた鍋面には毎回油を塗る。最初だけでなく巻きが太るほど塗るとくっつきません。",
        "매번 비어 있는 팬에 기름을 바른다. 첫 층에만 바르면 롤이 커질수록 달라붙는다.",
        "ทาน้ำมันบนพื้นที่ว่างของกระทะทุกครั้ง ไม่ใช่แค่ชั้นแรก เพื่อไม่ให้ม้วนที่หนาขึ้นติดกระทะ"
      )
    ],
    commonMistakes: [
      ml(
        "High heat browns the outside before the thick centre sets; reduce the flame as soon as the first layer begins to firm.",
        "火太大會先焦外層、中心卻未凝固；第一層開始定型就要降火。",
        "強火だと外側だけ色づき、厚い中心が固まりません。最初の層が固まり始めたら火を弱めます。",
        "불이 세면 겉만 갈색이 되고 두꺼운 중심은 굳지 않는다. 첫 층이 굳기 시작하면 불을 낮춘다.",
        "ไฟแรงทำให้ด้านนอกเป็นสีก่อนแกนหนาจะแข็ง ลดไฟทันทีที่ชั้นแรกเริ่มเซ็ต"
      ),
      ml(
        "Rolling after the egg is fully dry creates gaps and cracks; roll while the surface is still glossy, then cook the finished centre through.",
        "蛋液全乾才捲會產生空隙與裂縫；表面仍有光澤時就捲，再把完成蛋捲中心加熱熟透。",
        "卵が完全に乾いてから巻くと隙間やひびができる。表面がつややかなうちに巻き、最後に中心まで火を通す。",
        "달걀이 완전히 마른 뒤 말면 틈과 균열이 생긴다. 표면이 윤기 있을 때 말고 마지막에 중심까지 익힌다.",
        "ม้วนหลังไข่แห้งสนิทจะเกิดช่องและรอยแตก ให้ม้วนขณะผิวยังเงาแล้วทำแกนกลางให้สุกภายหลัง"
      )
    ],
    substitutions: [
      ml(
        "Use 30 ml water instead of unsalted dashi for a lighter pantry version; the egg will be less savoury but still needs the 74°C centre check.",
        "無鹽高湯可改用 30 毫升水，味道較清淡但仍須確認蛋捲中心達 74°C。",
        "無塩だしは水30mlに替えられます。うま味は弱くなりますが、中心74℃の確認は必要です。",
        "무염 다시는 물 30ml로 바꿀 수 있다. 감칠맛은 약해지지만 중심 74°C 확인은 그대로 필요하다.",
        "เปลี่ยนดาชิไม่เค็มเป็นน้ำ 30 มล. ได้ รสอูมามิจะเบาลงแต่ยังต้องตรวจแกนกลางถึง 74°C"
      ),
      ml(
        "Replace light soy sauce with 8 ml tamari and reduce the salt to 1 g; tamari is darker and saltier, so keep the layers thin.",
        "淡醬油可改用 8 毫升 tamari，細鹽減至 1 公克；tamari 顏色較深且較鹹，蛋層要保持薄。",
        "薄口しょうゆはたまり8mlに替え、塩を1gに減らします。たまりは色と塩味が強いので層を薄くします。",
        "연한 간장은 타마리 8ml로 바꾸고 소금은 1g으로 줄인다. 타마리는 더 진하고 짜므로 층을 얇게 한다.",
        "เปลี่ยนซีอิ๊วอ่อนเป็นทามาริ 8 มล. และลดเกลือเหลือ 1 กรัม ทามาริเข้มและเค็มกว่า จึงทำชั้นบาง"
      )
    ],
    storage: ml(
      "Cool, refrigerate covered for up to 2 days, and reheat gently until the centre is steaming hot and reaches 74°C. The layers will be firmer after chilling.",
      "放涼後加蓋冷藏最多 2 天，復熱至中心冒蒸氣且達 74°C；冷藏後層次會較緊實。",
      "冷ましてふたをし、冷蔵2日以内に。中心から湯気が立ち74℃になるまでやさしく温めます。冷やすと層は締まります。",
      "식혀 덮어 냉장하고 2일 안에 먹는다. 중심에서 김이 나고 74°C가 될 때까지 부드럽게 데운다. 냉장 후 층은 더 단단해진다.",
      "ทำให้เย็น ปิดฝาแช่เย็นไม่เกิน 2 วัน อุ่นเบา ๆ จนใจกลางมีไอและถึง 74°C ชั้นไข่จะแน่นขึ้นหลังแช่เย็น"
    ),
    cultureNote: ml(
      "Tamagoyaki is a familiar Japanese rolled omelette served in home meals, bento and sushi settings; the number of layers and sweetness vary by region and household.",
      "玉子燒是日本家庭、便當與壽司餐點常見的分層蛋捲；層數與甜度會因地區和家庭而不同。",
      "玉子焼きは家庭料理や弁当、寿司店で親しまれる日本の巻き卵です。層の数や甘さは地域や家庭で変わります。",
      "다마고야키는 가정식·도시락·스시집에서 친숙한 일본식 달걀말이이며 층수와 단맛은 지역과 집마다 다르다.",
      "ทามาโกะยากิเป็นไข่ม้วนญี่ปุ่นที่พบในอาหารบ้าน ข้าวกล่อง และร้านซูชิ จำนวนชั้นและความหวานต่างกันตามบ้านและภูมิภาค"
    ),
    sources: [
      { title: "Just One Cookbook — Classic Tamagoyaki", url: "https://www.justonecookbook.com/tamagoyaki/" },
      { title: "Japanese Cooking 101 — Tamagoyaki Recipe", url: "https://www.japanesecooking101.com/tamagoyaki-recipe/" }
    ],
    imageAlt: ml(
      "Real photograph of plain yellow tamagoyaki cut into thick layered pieces, with no visible garnish or filling.",
      "實拍純黃色多層玉子燒切成厚片，沒有可見裝飾或內餡。",
      "具や飾りのない黄色い多層の厚焼き玉子を厚切りにした実写写真。",
      "보이는 고명이나 속재료 없이 노란 다층 달걀말이를 두껍게 썬 실사 사진.",
      "ภาพถ่ายจริงของทามาโกะยากิสีเหลืองล้วนหลายชั้นหั่นหนา ไม่มีเครื่องตกแต่งหรือไส้ให้เห็น"
    ),
    visualSpec: "Real finished-dish photograph: plain yellow multi-layer tamagoyaki cut into thick pieces; no visible scallion, nori, sauce, garnish or other filling."
  },

  {
    id: "chawanmushi",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 15,
    cookMinutes: 20,
    totalMinutes: 35,
    servings: 4,
    name: ml(
      "Silky mushroom and mitsuba chawanmushi",
      "金針菇與三葉芹茶碗蒸",
      "きのこと三つ葉の茶碗蒸し",
      "버섯과 미쓰바 차완무시",
      "ชาวันมุชิเห็ดและมิตสึบะเนื้อเนียน"
    ),
    description: ml(
      "A gently steamed savoury egg custard with shiitake, enoki and mitsuba, cooked slowly so the surface stays smooth and tender.",
      "蛋液與無鹽高湯蒸成柔滑茶碗蒸，加入香菇、金針菇與三葉芹，低溫慢蒸保持表面細緻。",
      "卵と無塩だしをなめらかに蒸し、しいたけ、えのき、三つ葉を合わせた、表面のきれいな茶碗蒸しです。",
      "달걀과 무염 다시를 부드럽게 쪄 표고·팽이·미쓰바를 넣고 표면을 매끈하게 유지한 차완무시다.",
      "คัสตาร์ดไข่รสกลมกล่อมนึ่งช้า ๆ กับดาชิไม่เค็ม เห็ดหอม เห็ดเข็มทอง และมิตสึบะให้ผิวเนียนนุ่ม"
    ),
    ingredients: [
      ingredient("150 g", ml("large eggs without shells", "去殼大雞蛋", "殻を除いた卵", "껍데기 없는 큰 달걀", "ไข่ไก่ฟองใหญ่ตอกเปลือกออก")),
      ingredient("450 ml", ml("unsalted dashi, cooled", "放涼的無鹽高湯", "冷ました無塩だし", "식힌 무염 다시", "ดาชิไม่เค็มที่ทำให้เย็นแล้ว")),
      ingredient("10 ml", ml("light soy sauce", "淡醬油", "薄口しょうゆ", "연한 간장", "ซีอิ๊วขาวรสอ่อน")),
      ingredient("10 ml", ml("mirin", "味醂", "みりん", "미림", "มิริน")),
      ingredient("2 g", ml("fine salt", "細鹽", "細塩", "고운 소금", "เกลือละเอียด")),
      ingredient("40 g", ml("shiitake mushrooms, thinly sliced", "香菇，切薄片", "しいたけ（薄切り）", "표고버섯, 얇게 썬 것", "เห็ดหอมซอยบาง")),
      ingredient("40 g", ml("enoki mushrooms, trimmed", "金針菇，去根", "えのきだけ（根元を切る）", "팽이버섯, 밑동 제거", "เห็ดเข็มทองตัดโคน")),
      ingredient("8 g", ml("mitsuba Japanese parsley", "三葉芹", "三つ葉", "미쓰바", "มิตสึบะ"))
    ],
    instructions: [
      {
        title: ml("Cool the dashi", "放涼高湯", "だしを冷ます", "다시 식히기", "ทำดาชิให้เย็น"),
        body: ml(
          "Prepare 450 ml unsalted dashi and cool it to about 45°C before it meets the eggs. Warm dashi can cook streaks into the custard, while hot dashi can scramble it.",
          "準備 450 毫升無鹽高湯並降至約 45°C 再與蛋液混合；高溫高湯會使蛋液結絲甚至炒熟。",
          "無塩だし450mlを用意し、卵に合わせる前に約45℃まで冷ます。熱いだしは卵を部分的に固めます。",
          "무염 다시 450ml를 준비해 달걀과 섞기 전 약 45°C로 식힌다. 뜨거운 다시는 달걀을 부분적으로 익힌다.",
          "เตรียมดาชิไม่เค็ม 450 มล. และทำให้เย็นราว 45°C ก่อนผสมไข่ ดาชิร้อนจะทำให้ไข่เป็นเส้นหรือสุกทันที"
        )
      },
      {
        title: ml("Mix the custard", "調蛋液高湯", "卵液を合わせる", "달걀물 섞기", "ผสมคัสตาร์ด"),
        body: ml(
          "Beat the 150 g eggs gently with the cooled dashi, 10 ml soy sauce, 10 ml mirin and 2 g salt. Avoid foam so the steamed surface stays silky.",
          "將 150 公克蛋液與放涼高湯、10 毫升淡醬油、10 毫升味醂及 2 公克鹽輕輕混合，避免起泡以保持蒸後表面柔滑。",
          "卵150gに冷ましただし、しょうゆ10ml、みりん10ml、塩2gを泡立てずに混ぜる。蒸し上がりをなめらかにする。",
          "달걀 150g에 식힌 다시, 간장 10ml, 미림 10ml, 소금 2g을 거품 없이 부드럽게 섞어 표면을 매끈하게 한다.",
          "ผสมไข่ 150 กรัมกับดาชิที่เย็น ซีอิ๊ว 10 มล. มิริน 10 มล. และเกลือ 2 กรัมอย่างเบา ๆ ไม่ให้เกิดฟองเพื่อให้ผิวเนียน"
        )
      },
      {
        title: ml("Strain the egg", "過濾蛋液", "卵液をこす", "달걀물 거르기", "กรองไข่"),
        body: ml(
          "Pass the egg mixture through a fine sieve into a jug. Skim any surface foam with a spoon; a fine strain gives the custard its clean, tender texture.",
          "將蛋液過細網倒入量杯，用湯匙撇去表面泡沫；細緻過濾能讓蒸蛋口感乾淨柔嫩。",
          "卵液を細かいこし器でピッチャーへこし、表面の泡をスプーンで取る。きめ細かな食感になる。",
          "달걀물을 고운 체로 주전자에 거르고 표면 거품을 숟가락으로 걷는다. 커스터드가 깨끗하고 부드러워진다.",
          "กรองส่วนผสมไข่ผ่านกระชอนถี่ลงเหยือก ช้อนฟองออกเพื่อให้คัสตาร์ดเนียนละเอียด"
        )
      },
      {
        title: ml("Prepare the mushrooms", "處理菇類", "きのこを準備する", "버섯 손질하기", "เตรียมเห็ด"),
        body: ml(
          "Trim the enoki root and separate the strands. Wipe the shiitake clean and slice it thinly. Pick the mitsuba leaves and tender stems into small pieces.",
          "切除金針菇根部並分開，擦乾淨香菇後切薄片；三葉芹取葉與嫩莖切小段。",
          "えのきの根元を切ってほぐし、しいたけを拭いて薄切りにする。三つ葉は葉と柔らかな茎を小さく分ける。",
          "팽이버섯 밑동을 잘라 가닥을 나눈다. 표고를 깨끗이 닦아 얇게 썰고 미쓰바 잎과 부드러운 줄기를 작게 나눈다.",
          "ตัดโคนเห็ดเข็มทองแล้วแยกเส้น เช็ดเห็ดหอมให้สะอาดและซอยบาง เด็ดใบกับก้านอ่อนมิตสึบะเป็นชิ้นเล็ก"
        )
      },
      {
        title: ml("Fill the steaming cups", "分杯放入菇與三葉芹", "器に具を入れる", "컵에 재료 담기", "แบ่งใส่ถ้วยนึ่ง"),
        body: ml(
          "Divide the shiitake and enoki among four heatproof cups, reserving a little mitsuba for the top. Pour the strained egg mixture over the mushrooms and add the remaining mitsuba.",
          "將香菇與金針菇分入四個耐熱杯，保留少量三葉芹放表面；倒入過濾蛋液，再放上剩餘三葉芹。",
          "しいたけとえのきを耐熱の器4つに分け、三つ葉を少し飾り用に残す。こした卵液を注ぎ、残りの三つ葉をのせる。",
          "표고와 팽이를 내열 컵 네 개에 나누고 미쓰바 조금은 위에 남긴다. 거른 달걀물을 붓고 남은 미쓰바를 올린다.",
          "แบ่งเห็ดหอมและเห็ดเข็มทองใส่ถ้วยทนร้อนสี่ใบ เหลือมิตสึบะเล็กน้อยไว้ด้านบน เทไข่ที่กรองแล้วและวางมิตสึบะที่เหลือ"
        )
      },
      {
        title: ml("Steam gently", "溫和蒸煮", "弱い蒸気で蒸す", "약한 증기로 찌기", "นึ่งด้วยไอน้ำอ่อน"),
        body: ml(
          "Preheat a steamer until the chamber is 85–90°C with steady but gentle steam. Cover each cup with its lid or foil, place them in the steamer, and cook for 12–15 minutes.",
          "預熱蒸鍋至蒸氣室 85–90°C、蒸氣穩定但溫和；每杯加蓋或覆鋁箔，放入蒸鍋蒸 12–15 分鐘。",
          "蒸し器を85〜90℃、穏やかな蒸気に予熱する。器にふたかホイルをかけ、蒸し器で12〜15分蒸す。",
          "찜기를 85–90°C의 안정적이고 약한 증기로 예열한다. 컵마다 뚜껑이나 포일을 씌워 12–15분 찐다.",
          "อุ่นลังถึงให้ห้องไอน้ำอยู่ที่ 85–90°C มีไอน้ำสม่ำเสมอแต่ไม่แรง ปิดฝาหรือฟอยล์แต่ละถ้วย นึ่ง 12–15 นาที"
        )
      },
      {
        title: ml("Check the egg safety", "確認蛋液安全凝固", "卵の安全な固まりを確認", "달걀 안전 응고 확인", "ตรวจการเซ็ตของไข่ให้ปลอดภัย"),
        body: ml(
          "Check the centre of the thickest cup with a clean thermometer. It must reach 74°C with no liquid egg; if needed, steam in one-minute increments while keeping the chamber below a hard boil.",
          "用乾淨溫度計探測最厚杯的中心，必須達 74°C 且沒有流動蛋液；必要時以每次 1 分鐘增量續蒸，蒸氣不可猛烈沸騰。",
          "最も厚い器の中心を清潔な温度計で確認する。液状の卵を残さず74℃にし、必要なら1分ずつ追加して強い沸騰を避ける。",
          "깨끗한 온도계로 가장 두꺼운 컵의 중심을 확인한다. 흐르는 달걀물이 없이 74°C가 되어야 하며 필요하면 1분씩 더 찌되 세게 끓이지 않는다.",
          "ตรวจใจกลางถ้วยที่หนาที่สุดด้วยเทอร์โมมิเตอร์สะอาด ต้องถึง 74°C และไม่มีไข่เหลว หากจำเป็นนึ่งเพิ่มครั้งละหนึ่งนาทีโดยไม่ให้ไอน้ำเดือดแรง"
        )
      },
      {
        title: ml("Rest and serve warm", "靜置溫熱上桌", "休ませて温かく供する", "쉬었다가 따뜻하게 내기", "พักแล้วเสิร์ฟอุ่น"),
        body: ml(
          "Turn off the steamer and rest the covered cups for 2 minutes. Uncover and serve warm at about 65–70°C; the custard should tremble softly, not release liquid.",
          "關火後讓加蓋蒸蛋靜置 2 分鐘，開蓋以約 65–70°C 溫熱上桌；蒸蛋應輕柔晃動，不應滲出液體。",
          "火を止め、ふたをした器を2分休ませる。65〜70℃ほどで温かく供し、表面は柔らかく揺れ、汁が出ない状態にする。",
          "찜기를 끄고 덮은 컵을 2분 둔다. 약 65–70°C로 따뜻하게 내며 커스터드는 부드럽게 흔들리되 물이 나오지 않아야 한다.",
          "ปิดไฟพักถ้วยที่ปิดฝา 2 นาที เปิดฝาและเสิร์ฟอุ่นราว 65–70°C คัสตาร์ดควรสั่นนุ่ม ๆ ไม่คายน้ำ"
        )
      }
    ],
    tips: [
      ml(
        "Gentle steam and a covered cup prevent large bubbles; a calm surface is the best sign of a fine chawanmushi texture.",
        "溫和蒸氣與加蓋能避免大氣孔；表面平靜就是茶碗蒸細緻的最佳訊號。",
        "弱い蒸気とふたで大きな気泡を防ぐ。静かな表面がきめ細かな茶碗蒸しの目印です。",
        "약한 증기와 덮개가 큰 기포를 막는다. 표면이 잔잔해야 차완무시가 곱다.",
        "ไอน้ำอ่อนและฝาปิดช่วยป้องกันฟองใหญ่ ผิวที่สงบคือสัญญาณของชาวันมุชิเนื้อละเอียด"
      ),
      ml(
        "Let the dashi cool before mixing; passing the egg through a sieve twice is worthwhile when a very smooth surface matters.",
        "高湯先放涼再混合；若重視極滑表面，蛋液過篩兩次很值得。",
        "だしは冷ましてから混ぜる。とても滑らかな表面にしたいときは卵液を2回こすとよい。",
        "다시는 식힌 뒤 섞는다. 아주 매끈한 표면이 필요하면 달걀물을 두 번 거르는 것이 좋다.",
        "ปล่อยดาชิให้เย็นก่อนผสม หากต้องการผิวเนียนมาก การกรองไข่สองครั้งคุ้มค่า"
      )
    ],
    commonMistakes: [
      ml(
        "Boiling steam makes the custard porous and watery; keep the chamber at 85–90°C and do not let the water hammer the cups.",
        "蒸氣沸騰猛烈會讓蒸蛋多孔出水；保持 85–90°C，避免水汽猛烈衝擊杯子。",
        "強い沸騰蒸気は気泡と水分を生む。蒸し器を85〜90℃に保ち、器に湯が激しく当たらないようにする。",
        "센 증기는 커스터드를 거칠고 물기 있게 만든다. 찜기 85–90°C를 유지하고 물이 컵을 세게 때리지 않게 한다.",
        "ไอน้ำเดือดแรงทำให้คัสตาร์ดพรุนและมีน้ำ รักษา 85–90°C และอย่าให้น้ำกระแทกถ้วย"
      ),
      ml(
        "Stopping before the thickest centre reaches 74°C leaves unsafe liquid egg; check the centre, not just the surface.",
        "最厚中心未達 74°C 就停火會留下不安全的流動蛋液；要測中心，不只看表面。",
        "最も厚い中心が74℃になる前に止めると液状卵が残る。表面だけでなく中心を測る。",
        "가장 두꺼운 중심이 74°C가 되기 전에 멈추면 안전하지 않은 액체 달걀이 남는다. 표면만 보지 말고 중심을 확인한다.",
        "หยุดก่อนใจกลางส่วนหนาสุดถึง 74°C จะมีไข่เหลวไม่ปลอดภัย ตรวจใจกลางไม่ใช่ดูแค่ผิว"
      )
    ],
    substitutions: [
      ml(
        "Use 450 ml kombu-shiitake dashi instead of bonito dashi for a vegetarian version; keep the same 85–90°C steaming and 74°C centre check.",
        "素食版可用 450 毫升昆布香菇高湯取代柴魚高湯；蒸溫 85–90°C 與中心 74°C 判斷不變。",
        "植物性なら、かつおだしを昆布しいたけだし450mlに替える。蒸し温度85〜90℃と中心74℃は同じです。",
        "채식 버전은 가쓰오 다시 대신 다시마·표고 다시 450ml를 쓴다. 찜 온도 85–90°C와 중심 74°C 확인은 같다.",
        "แบบมังสวิรัติใช้ดาชิคอมบุเห็ดหอม 450 มล. แทนดาชิคัตสึโอะ รักษาอุณหภูมินึ่ง 85–90°C และใจกลาง 74°C เท่าเดิม"
      ),
      ml(
        "If mitsuba is unavailable, omit it rather than adding an unlisted herb; keep the shiitake and enoki as the visible mushroom topping.",
        "沒有三葉芹時請省略，不要加入未列香草；保留香菇與金針菇作為可見菇類配料。",
        "三つ葉がなければ省き、記載のない香草は足さない。しいたけとえのきを見える具にする。",
        "미쓰바가 없으면 생략하고 목록에 없는 허브를 넣지 않는다. 표고와 팽이를 보이는 버섯 고명으로 둔다.",
        "ถ้าไม่มีมิตสึบะให้ตัดออก อย่าเติมสมุนไพรนอกสูตร และคงเห็ดหอมกับเห็ดเข็มทองเป็นหน้าที่เห็นได้"
      )
    ],
    storage: ml(
      "Cool quickly, cover and refrigerate for up to 1 day. Re-steam gently until the centre reaches 74°C, then serve warm; the custard may release a little liquid.",
      "快速放涼後加蓋冷藏最多 1 天；溫和回蒸至中心 74°C 再溫熱上桌，蒸蛋可能略出水。",
      "急冷してふたをし、冷蔵1日以内に。中心74℃まで弱く蒸し直して温かく供します。少し水が出ることがあります。",
      "빠르게 식혀 덮어 냉장하고 하루 안에 먹는다. 중심 74°C까지 약하게 다시 쪄 따뜻하게 내며 약간 물이 나올 수 있다.",
      "ทำให้เย็นเร็ว ปิดฝาแช่เย็นไม่เกินหนึ่งวัน นึ่งซ้ำเบา ๆ จนใจกลาง 74°C แล้วเสิร์ฟอุ่น คัสตาร์ดอาจมีน้ำออกเล็กน้อย"
    ),
    cultureNote: ml(
      "Chawanmushi means steamed in a tea bowl and is a gentle Japanese savoury egg custard served in home meals, kaiseki and celebratory courses.",
      "茶碗蒸意為在茶碗中蒸煮，是日本家常、懷石與節慶料理常見的柔滑鹹味蒸蛋。",
      "茶碗蒸しは茶碗で蒸すという意味で、家庭料理、懐石、祝い膳で親しまれる日本の卵料理です。",
      "차완무시는 찻잔에 쪄낸다는 뜻으로 가정식·가이세키·기념 코스에서 먹는 일본식 부드러운 달걀찜이다.",
      "ชาวันมุชิหมายถึงการนึ่งในถ้วยชา เป็นคัสตาร์ดไข่คาวเนื้อนุ่มของญี่ปุ่นที่พบในอาหารบ้าน ไคเซกิ และมื้อฉลอง"
    ),
    sources: [
      { title: "Just One Cookbook — Chawanmushi (Japanese Savory Egg Custard)", url: "https://www.justonecookbook.com/chawanmushi-savory-steamed-egg-custard/" },
      { title: "Japanese Cooking 101 — Chawanmushi (Savory Egg Custard)", url: "https://www.japanesecooking101.com/chawanmushi/" }
    ],
    imageAlt: ml(
      "Real photograph of a lidded chawanmushi cup with smooth pale custard, fine white enoki, brown mushroom slices and green mitsuba beside a wooden spoon.",
      "實拍加蓋茶碗蒸杯，淡色柔滑蒸蛋上可見細白金針菇、棕色菇片與綠色三葉芹，旁有木匙。",
      "ふた付きの器に滑らかな淡色の茶碗蒸しを盛り、白いえのき、茶色いきのこ、緑の三つ葉と木の匙が見える実写写真。",
      "뚜껑 있는 컵에 매끈한 옅은 차완무시와 가는 흰 팽이, 갈색 버섯 조각, 초록 미쓰바가 보이고 나무 숟가락이 곁들인 실사 사진.",
      "ภาพถ่ายจริงของชาวันมุชิในถ้วยมีฝา คัสตาร์ดสีอ่อนเนียน มีเห็ดเข็มทองเส้นขาว เห็ดสีน้ำตาล และมิตสึบะเขียว พร้อมช้อนไม้"
    ),
    visualSpec: "Real finished-dish photograph: a lidded chawanmushi cup with pale smooth egg custard, visible fine white enoki, brown mushroom slices and green mitsuba; a wooden spoon is tableware, not a garnish."
  },

  {
    id: "zaru-soba",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 25,
    cookMinutes: 20,
    totalMinutes: 45,
    servings: 4,
    name: ml(
      "Cold zaru soba with mentsuyu",
      "冷蕎麥麵佐沾汁",
      "冷たいざるそばとめんつゆ",
      "차가운 자루소바와 멘쓰유",
      "โซบะเย็นซารุกับเมนสึยุ"
    ),
    description: ml(
      "Chewy buckwheat noodles are cooked in plenty of water, rinsed and chilled, then served on a bamboo zaru with separate mentsuyu, shredded nori, scallion and wasabi.",
      "蕎麥麵用充足水量煮熟，充分沖洗降溫後盛在竹簾，另附麵露、海苔絲、青蔥與芥末。",
      "そばをたっぷりの湯でゆで、冷水で洗って冷やし、竹ざるに盛ってめんつゆ、海苔、ねぎ、わさびを別添えにします。",
      "메밀면을 넉넉한 물에 삶아 충분히 씻고 차게 식힌 뒤 대나무 자루에 담아 멘쓰유, 김, 대파와 와사비를 따로 낸다.",
      "ต้มโซบะในน้ำมากพอ ล้างและทำให้เย็น เสิร์ฟบนซารุไม้ไผ่กับเมนสึยุ โนริ ต้นหอม และวาซาบิแยกกัน"
    ),
    ingredients: [
      ingredient("320 g", ml("dried soba noodles", "乾蕎麥麵", "乾そば", "건 메밀면", "เส้นโซบะแห้ง")),
      ingredient("4 L", ml("unsalted water for boiling soba", "煮蕎麥麵用無鹽水", "そばをゆでる無塩水", "메밀면 삶을 무염수", "น้ำไม่เค็มสำหรับต้มโซบะ")),
      ingredient("2 L", ml("cold water for rinsing soba", "沖洗蕎麥麵用冷水", "そばを洗う冷水", "메밀면 헹굴 찬물", "น้ำเย็นสำหรับล้างโซบะ")),
      ingredient("1 L", ml("ice water for chilling soba", "冰水，用於冰鎮蕎麥麵", "そばを冷やす氷水", "메밀면 식힐 얼음물", "น้ำใส่น้ำแข็งสำหรับทำโซบะเย็น")),
      ingredient("300 ml", ml("cold water for mentsuyu", "麵露用冷水", "めんつゆ用の冷水", "멘쓰유용 찬물", "น้ำเย็นสำหรับเมนสึยุ")),
      ingredient("8 g", ml("dried kombu", "乾昆布", "乾燥昆布", "말린 다시마", "คอมบุแห้ง")),
      ingredient("12 g", ml("katsuobushi dried bonito flakes", "柴魚片", "かつお節", "가쓰오부시", "ปลาโอแห้งขูด")),
      ingredient("60 ml", ml("sake", "清酒", "日本酒", "사케", "สาเก")),
      ingredient("60 ml", ml("mirin", "味醂", "みりん", "미림", "มิริน")),
      ingredient("120 ml", ml("light soy sauce", "淡醬油", "薄口しょうゆ", "연한 간장", "ซีอิ๊วขาวรสอ่อน")),
      ingredient("40 g", ml("scallions, thinly sliced", "青蔥，切薄片", "長ねぎ（薄切り）", "대파, 얇게 썬 것", "ต้นหอมซอยบาง")),
      ingredient(ml("2 sheets", "2 張", "2枚", "2장", "2 แผ่น"), ml("nori, shredded", "海苔，剪絲", "焼きのり（細切り）", "구운 김, 잘게 자른 것", "โนริซอยเส้น")),
      ingredient("20 g", ml("wasabi paste for serving", "上桌用芥末醬", "添えるわさびペースト", "곁들이는 와사비 페이스트", "วาซาบิเพสต์สำหรับเสิร์ฟ")),
    ],
    instructions: [
      {
        title: ml("Soak the kombu", "浸泡昆布", "昆布を水につける", "다시마 불리기", "แช่คอมบุ"),
        body: ml(
          "Wipe the 8 g kombu and soak it in 300 ml cold water for 20 minutes. This water becomes the base of the dipping sauce, not the soba cooking water.",
          "擦拭 8 公克昆布後浸入 300 毫升冷水 20 分鐘；這是沾汁底，不是煮麵水。",
          "昆布8gを拭き、冷水300mlに20分浸す。この水はつゆ用で、そばをゆでる湯とは別です。",
          "다시마 8g을 닦아 찬물 300ml에 20분 담근다. 이 물은 찍는 소스용이며 면 삶는 물과 다르다.",
          "เช็ดคอมบุ 8 กรัมแล้วแช่น้ำเย็น 300 มล. 20 นาที น้ำนี้ใช้ทำซอสจิ้ม ไม่ใช่น้ำต้มเส้น"
        )
      },
      {
        title: ml("Make and cool mentsuyu", "煮沸調製麵露", "めんつゆを作って冷ます", "멘쓰유 끓여 식히기", "ทำและทำเมนสึยุให้เย็น"),
        body: ml(
          "Boil 60 ml sake and 60 ml mirin for 2 minutes. Add the kombu water and 120 ml soy sauce, heat until steaming but not hard-boiling, then steep 12 g katsuobushi for 5 minutes and strain. Cool the sauce completely.",
          "將 60 毫升清酒與 60 毫升味醂煮 2 分鐘，加入昆布水與 120 毫升淡醬油，加熱至冒蒸氣但不可猛烈沸騰；放入 12 公克柴魚片浸泡 5 分鐘後過濾，完全放涼。",
          "酒60mlとみりん60mlを2分煮立てる。昆布水としょうゆ120mlを加え、沸騰させず湯気が出るまで温める。かつお節12gを5分浸してこし、完全に冷ます。",
          "사케 60ml와 미림 60ml를 2분 끓인다. 다시마 물과 간장 120ml를 넣어 김이 날 때까지 데우되 세게 끓이지 않는다. 가쓰오부시 12g을 5분 우려 거르고 완전히 식힌다.",
          "ต้มสาเก 60 มล. กับมิริน 60 มล. 2 นาที เติมน้ำคอมบุและซีอิ๊ว 120 มล. อุ่นจนมีไอแต่ไม่เดือดแรง แช่คัตสึโอะ 12 กรัม 5 นาที กรองและทำซอสให้เย็นสนิท"
        )
      },
      {
        title: ml("Boil plenty of water", "煮沸充足水量", "たっぷりの湯を沸かす", "물 넉넉히 끓이기", "ต้มน้ำให้มากพอ"),
        body: ml(
          "Bring the full 4 L unsalted soba water to a rolling boil in a wide pot. The large volume prevents the temperature from collapsing when the noodles enter.",
          "在寬鍋中將全部 4 公升無鹽煮麵水煮至大滾；充足水量可避免下麵後水溫驟降。",
          "広い鍋でそば用無塩水4Lをしっかり沸騰させる。湯量が多いと麺を入れても温度が下がりにくい。",
          "넓은 냄비에서 메밀면용 무염수 4L를 팔팔 끓인다. 물이 많아야 면을 넣어도 온도가 급격히 떨어지지 않는다.",
          "ต้มน้ำไม่เค็ม 4 ลิตรสำหรับโซบะในหม้อกว้างให้เดือดจัด ปริมาณมากช่วยไม่ให้อุณหภูมิลดฮวบเมื่อใส่เส้น"
        )
      },
      {
        title: ml("Cook the soba", "煮熟蕎麥麵", "そばをゆでる", "메밀면 삶기", "ต้มโซบะให้สุก"),
        body: ml(
          "Fan 320 g dried soba into the boiling water and stir once to separate it. Cook for 4–5 minutes, or follow the package if different, until the noodles are fully tender with a slight chew rather than hard or mushy.",
          "將 320 公克乾蕎麥麵扇形放入沸水，攪拌一次分開；煮 4–5 分鐘，若包裝不同則依標示，至麵條完全熟透但仍略有咬勁，不可硬或糊。",
          "乾そば320gを広げて沸騰湯に入れ、一度混ぜてほぐす。4〜5分、表示が違えば袋に従い、硬さを残しつつ完全に火を通す。",
          "건 메밀면 320g을 끓는 물에 부채처럼 넣고 한 번 저어 푼다. 4–5분 또는 포장 표시대로 삶아 단단하지도 퍼지지도 않게 완전히 익힌다.",
          "ใส่โซบะแห้ง 320 กรัมลงน้ำเดือดเป็นพัด คนครั้งเดียวให้แยก ต้ม 4–5 นาทีหรือตามฉลากจนสุกนุ่มมีความหนึบ ไม่แข็งหรือเละ"
        )
      },
      {
        title: ml("Rinse away the starch", "沖洗去澱粉", "冷水で洗う", "찬물에 전분 씻기", "ล้างแป้งออก"),
        body: ml(
          "Drain the cooked soba immediately in a colander. Rinse under the 2 L cold water while gently rubbing the strands until the surface starch is gone and the water runs mostly clear.",
          "熟蕎麥麵立即倒入瀝籃，使用 2 公升冷水沖洗並輕輕搓揉麵條，直到表面澱粉洗掉、水大致清澈。",
          "ゆで上がったそばをすぐざるに上げ、冷水2Lを流しながら麺をやさしくもみ、表面のでんぷんが取れて水がほぼ澄むまで洗う。",
          "익은 메밀면을 즉시 체에 붓는다. 찬물 2L로 헹구며 면을 부드럽게 비벼 표면 전분이 사라지고 물이 대체로 맑아질 때까지 씻는다.",
          "สะเด็ดโซบะทันที ล้างด้วยน้ำเย็น 2 ลิตรพร้อมคลึงเส้นเบา ๆ จนแป้งผิวออกและน้ำใสเกือบหมด"
        )
      },
      {
        title: ml("Chill and drain", "冰鎮並瀝乾", "冷やして水を切る", "차게 식혀 물 빼기", "ทำให้เย็นและสะเด็ด"),
        body: ml(
          "Transfer the rinsed noodles to 1 L ice water for 30 seconds, then drain very well. Shake the colander so no water dilutes the separate dipping sauce.",
          "將沖洗後的麵條放入 1 公升冰水 30 秒，再充分瀝乾；搖動瀝籃排盡水分，避免稀釋另碗沾汁。",
          "洗った麺を氷水1Lに30秒入れ、しっかり水を切る。ざるを振って水分を落とし、別添えのつゆを薄めない。",
          "헹군 면을 얼음물 1L에 30초 담갔다가 충분히 뺀다. 체를 흔들어 물기를 제거해 따로 낸 소스를 희석하지 않는다.",
          "ย้ายเส้นที่ล้างแล้วลงน้ำใส่น้ำแข็ง 1 ลิตร 30 วินาที แล้วสะเด็ดให้ดี เขย่ากระชอนเพื่อไม่ให้น้ำเจือจางซอสจิ้ม"
        )
      },
      {
        title: ml("Prepare the visible condiments", "準備可見配料", "薬味を準備する", "곁들임 준비", "เตรียมเครื่องเคียงที่เห็น"),
        body: ml(
          "Cut the two nori sheets into fine shreds, slice the 40 g scallions, and divide the 20 g wasabi into small portions. Keep every condiment separate from the cold soba until serving.",
          "將兩張海苔剪成細絲、40 公克青蔥切薄片，20 公克芥末分小份；所有配料直到上桌前都與冷蕎麥麵分開。",
          "のり2枚を細切りにし、ねぎ40gを薄切り、わさび20gを小分けする。盛るまで薬味はそばとは別に置く。",
          "김 두 장을 가늘게 자르고 대파 40g을 얇게 썬다. 와사비 20g을 나누고 낼 때까지 모든 곁들임을 차가운 면과 따로 둔다.",
          "ซอยโนริสองแผ่นเป็นเส้น หั่นต้นหอม 40 กรัมบาง ๆ แบ่งวาซาบิ 20 กรัมเป็นส่วน ๆ แยกเครื่องเคียงทั้งหมดจากเส้นเย็นจนกว่าจะเสิร์ฟ"
        )
      },
      {
        title: ml("Plate and dip to serve", "盛盤分開沾食", "盛り付けてつけて食べる", "담아 따로 찍어 먹기", "จัดจานและจิ้มเสิร์ฟ"),
        body: ml(
          "Pile the cold soba on a bamboo zaru and top with the shredded nori. Serve the cooled mentsuyu in a separate cup with sliced scallion and a small portion of wasabi; dip each bite briefly instead of pouring sauce over the noodles.",
          "冷蕎麥麵堆放竹簾並鋪上海苔絲，放涼的麵露另杯盛裝，青蔥與芥末另附；每口短暫沾汁，不要把醬汁淋在麵上。",
          "冷たいそばを竹ざるに盛って細切りのりをのせる。冷ましためんつゆは別の器に入れ、ねぎとわさびを添える。麺を一口ずつつゆにつけ、かけない。",
          "차가운 메밀면을 대나무 자루에 담고 잘게 썬 김을 올린다. 식힌 멘쓰유는 별도 컵에 담아 대파와 와사비를 곁들인다. 한입씩 잠깐 찍어 먹고 면에 붓지 않는다.",
          "กองโซบะเย็นบนซารุไม้ไผ่ โรยโนริซอย เสิร์ฟเมนสึยุที่เย็นแล้วในถ้วยแยกพร้อมต้นหอมและวาซาบิ จิ้มทีละคำสั้น ๆ แทนการราดซอส"
        )
      }
    ],
    tips: [
      ml(
        "Use a wide pot with plenty of water and stir once after adding the noodles; this prevents clumps without breaking the strands.",
        "用寬鍋加充足水量，下麵後攪拌一次，能防止結團又不會弄斷麵條。",
        "大きな鍋にたっぷりの湯を使い、麺を入れたら一度混ぜる。固まりを防ぎ、麺を切らない方法です。",
        "넓은 냄비에 물을 넉넉히 쓰고 면을 넣은 뒤 한 번 저으면 뭉치지 않고 면도 끊어지지 않는다.",
        "ใช้หม้อกว้างและน้ำมาก คนหนึ่งครั้งหลังใส่เส้นเพื่อไม่ให้จับก้อนโดยไม่ทำให้เส้นขาด"
      ),
      ml(
        "Rinsing and rubbing are essential: chilled soba that still feels slippery with starch will become sticky on the zaru.",
        "沖洗與搓揉不可省略；仍帶澱粉滑感的冷蕎麥麵盛到竹簾上會變黏。",
        "冷水で洗ってもでんぷんのぬめりが残ると、ざるの上で麺がべたつきます。洗う工程が重要です。",
        "찬물에 씻고 비비는 과정이 중요하다. 전분 미끄러움이 남은 면은 자루에서 끈적해진다.",
        "การล้างและคลึงสำคัญมาก โซบะเย็นที่ยังลื่นด้วยแป้งจะเหนียวติดซารุ"
      )
    ],
    commonMistakes: [
      ml(
        "Cooking in too little water or letting the pot stop boiling makes soba gummy; restore a full boil quickly and follow the package time.",
        "水量太少或下麵後停止沸騰會讓蕎麥麵糊黏；要快速恢復大滾並依包裝時間煮。",
        "湯が少ない、または麺を入れて沸騰が止まったままだとそばがべたつく。早く再沸騰させ、表示時間に従う。",
        "물이 부족하거나 면을 넣고 끓음이 멈춘 채 두면 메밀면이 질척해진다. 빨리 다시 끓이고 포장 시간을 따른다.",
        "น้ำไม่พอหรือเดือดหยุดหลังใส่เส้นทำให้โซบะเละ ต้องเร่งให้เดือดอีกครั้งและทำตามเวลาบนฉลาก"
      ),
      ml(
        "Pouring mentsuyu over the noodles makes them soften; keep the sauce concentrated and separate for dipping.",
        "將麵露淋在麵上會使麵條變軟；沾汁要保持濃度並分開盛裝。",
        "めんつゆを麺にかけると柔らかくなる。濃さを保ったつゆを別添えにしてつけて食べる。",
        "멘쓰유를 면에 부으면 면이 불어 부드러워진다. 소스는 농도를 유지해 따로 찍어 먹는다.",
        "ราดเมนสึยุบนเส้นทำให้เส้นนิ่ม ให้แยกซอสไว้จิ้มและรักษาความเข้มข้น"
      )
    ],
    substitutions: [
      ml(
        "A bottled mentsuyu can replace the homemade sauce: dilute it with the listed 300 ml cold water according to its label, then chill before serving.",
        "自製麵露可改用瓶裝麵露，依標示以列出的 300 毫升冷水稀釋，冷藏後再上桌。",
        "手作りつゆは市販のめんつゆに替えられます。表示に従い記載の冷水300mlで薄め、冷やして供します。",
        "직접 만든 멘쓰유는 병 제품으로 바꿀 수 있다. 표시대로 찬물 300ml로 희석해 식혀 낸다.",
        "เปลี่ยนซอสทำเองเป็นเมนสึยุขวดได้ เจือจางด้วยน้ำเย็น 300 มล. ตามฉลากแล้วแช่ให้เย็นก่อนเสิร์ฟ"
      ),
      ml(
        "Use 100% buckwheat noodles at 320 g for a gluten-free version, adding them to the boiling water in smaller handfuls and following the package time.",
        "無麩質版可用 320 公克百分之百蕎麥麵，分小把放入沸水並依包裝時間煮熟。",
        "グルテンフリーなら十割そば320gを使い、少量ずつ沸騰湯に入れて表示時間でゆでます。",
        "글루텐 프리 버전은 100% 메밀면 320g을 쓰고 조금씩 끓는 물에 넣어 포장 시간대로 삶는다.",
        "สำหรับแบบปราศจากกลูเตนใช้เส้นโซบะบัควีต 100% 320 กรัม ใส่ทีละน้อยและต้มตามฉลาก"
      )
    ],
    storage: ml(
      "Eat immediately for the best chew. If necessary, keep rinsed soba covered and cold for up to 4 hours, and store mentsuyu separately; do not freeze cooked noodles.",
      "最佳口感是立即食用；必要時將沖洗後蕎麥麵加蓋冷藏最多 4 小時，麵露分開保存；熟麵不要冷凍。",
      "歯ごたえのためすぐ食べる。必要なら洗ったそばを覆って冷蔵4時間以内、つゆは別にする。ゆで麺は冷凍しない。",
      "탄력은 즉시 먹을 때 가장 좋다. 필요하면 씻은 면을 덮어 냉장 4시간 안에 먹고 멘쓰유는 따로 둔다. 익힌 면은 얼리지 않는다.",
      "ควรกินทันทีเพื่อความหนึบ หากจำเป็นเก็บเส้นที่ล้างแล้วปิดฝาแช่เย็นไม่เกิน 4 ชั่วโมง แยกเมนสึยุ และห้ามแช่แข็งเส้นสุก"
    ),
    cultureNote: ml(
      "Zaru soba is a classic Japanese cold-noodle presentation named for the bamboo draining tray; dipping rather than pouring keeps the noodles cool and springy.",
      "ざる蕎麥以竹簾瀝水盤命名，是經典日本冷麵呈現；用沾食而非淋汁能保持麵條冰涼彈牙。",
      "ざるそばは水切り用の竹ざるに由来する日本の冷たいそばです。つゆをかけずにつけることで、冷たく歯ごたえを保ちます。",
      "자루소바는 물을 빼는 대나무 자루에서 이름을 딴 일본식 냉메밀이다. 소스를 붓지 않고 찍어야 차갑고 탄력 있다.",
      "ซารุโซบะเป็นโซบะเย็นญี่ปุ่นที่ตั้งชื่อตามถาดไม้ไผ่สำหรับสะเด็ดน้ำ การจิ้มแทนการราดช่วยให้เส้นเย็นและเด้ง"
    ),
    sources: [
      { title: "Just One Cookbook — Zaru Soba (Cold Soba with Dipping Sauce)", url: "https://www.justonecookbook.com/zaru-soba-cold-soba-noodles/" },
      { title: "Japanese Cooking 101 — Zaru Soba Recipe", url: "https://japanesecooking101.com/zaru-soba-recipe/" }
    ],
    imageAlt: ml(
      "Real photograph of chilled soba on a bamboo zaru topped with shredded nori, with separate dark dipping sauce and sliced scallion.",
      "實拍竹簾盛冷蕎麥麵，鋪海苔絲，旁有分開的深色沾汁與青蔥片。",
      "竹ざるに冷たいそばとのりを盛り、別添えの濃いつゆとねぎが見える実写写真。",
      "대나무 자루에 차가운 메밀면과 잘게 썬 김을 담고 별도 진한 소스와 대파를 곁들인 실사 사진.",
      "ภาพถ่ายจริงของโซบะเย็นบนซารุไม้ไผ่โรยโนริซอย มีซอสจิ้มสีเข้มและต้นหอมซอยแยกด้านข้าง"
    ),
    visualSpec: "Real finished-dish photograph: chilled soba on a bamboo zaru, shredded nori on top, and separate dark dipping sauce with sliced scallions; no wasabi, egg, tempura or unlisted garnish."
  },

  {
    id: "kitsune-udon",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 15,
    cookMinutes: 20,
    totalMinutes: 35,
    servings: 4,
    name: ml(
      "Kitsune udon with seasoned tofu pouches",
      "甜豆皮烏龍麵",
      "きつねうどん",
      "유부 우동",
      "คิตสึเนะอุด้ง"
    ),
    description: ml(
      "Chewy udon sits in a clear dashi broth with sweet-savoury tofu pouches, pink-white narutomaki, scallions and crisp tenkasu.",
      "彈牙烏龍麵浸在清澈高湯，搭配甜鹹豆皮、粉白鳴門卷、青蔥與酥脆天かす。",
      "歯ごたえのあるうどんを澄んだだしに入れ、甘辛い油揚げ、ピンク白のなると、ねぎ、天かすをのせます。",
      "쫄깃한 우동을 맑은 다시 국물에 담고 달콤짭짤한 유부, 분홍·흰 나루토마키, 대파와 바삭한 덴카스를 올린다.",
      "อุด้งเหนียวนุ่มในน้ำดาชิใส ใส่ถุงเต้าหู้ทอดหวานเค็ม นารุโตะม้วนชมพูขาว ต้นหอม และเท็นคาสุกรอบ"
    ),
    ingredients: [
      ingredient("800 g", ml("frozen udon noodles, four portions", "冷凍烏龍麵，四份", "冷凍うどん4玉", "냉동 우동 네 인분", "เส้นอุด้งแช่แข็งสี่ส่วน")),
      ingredient("240 g", ml("aburaage fried-tofu pouches", "油豆腐皮", "油揚げ", "유부", "ถุงเต้าหู้ทอดอาบุราอาเกะ")),
      ingredient("1 L", ml("boiling water for blanching the tofu pouches", "汆燙豆皮用沸水", "油揚げを油抜きする湯", "유부 데칠 끓는 물", "น้ำเดือดสำหรับลวกถุงเต้าหู้")),
      ingredient("150 ml", ml("water for simmering the tofu pouches", "燜煮豆皮用水", "油揚げを煮る水", "유부 조림용 물", "น้ำสำหรับเคี่ยวถุงเต้าหู้")),
      ingredient("30 ml", ml("light soy sauce for the tofu pouches", "豆皮用淡醬油", "油揚げ用薄口しょうゆ", "유부용 연한 간장", "ซีอิ๊วอ่อนสำหรับถุงเต้าหู้")),
      ingredient("30 ml", ml("mirin for the tofu pouches", "豆皮用味醂", "油揚げ用みりん", "유부용 미림", "มิรินสำหรับถุงเต้าหู้")),
      ingredient("20 g", ml("granulated sugar for the tofu pouches", "豆皮用砂糖", "油揚げ用砂糖", "유부용 설탕", "น้ำตาลสำหรับถุงเต้าหู้")),
      ingredient("1 L", ml("unsalted dashi for the soup", "湯底用無鹽高湯", "汁用の無塩だし", "국물용 무염 다시", "ดาชิไม่เค็มสำหรับน้ำซุป")),
      ingredient("60 ml", ml("light soy sauce for the soup", "湯底用淡醬油", "汁用薄口しょうゆ", "국물용 연한 간장", "ซีอิ๊วอ่อนสำหรับน้ำซุป")),
      ingredient("45 ml", ml("mirin for the soup", "湯底用味醂", "汁用みりん", "국물용 미림", "มิรินสำหรับน้ำซุป")),
      ingredient("10 g", ml("granulated sugar for the soup", "湯底用砂糖", "汁用砂糖", "국물용 설탕", "น้ำตาลสำหรับน้ำซุป")),
      ingredient("2 g", ml("fine salt for the soup", "湯底用細鹽", "汁用細塩", "국물용 고운 소금", "เกลือละเอียดสำหรับน้ำซุป")),
      ingredient("2 L", ml("boiling water for cooking the udon", "煮烏龍麵用沸水", "うどんをゆでる湯", "우동 삶을 끓는 물", "น้ำเดือดสำหรับต้มอุด้ง")),
      ingredient("80 g", ml("narutomaki fish cake, sliced", "鳴門卷魚板，切片", "なると巻き（薄切り）", "나루토마키 어묵, 썬 것", "นารุโตะม้วนหั่นชิ้น")),
      ingredient("40 g", ml("scallions, thinly sliced", "青蔥，切薄片", "長ねぎ（薄切り）", "대파, 얇게 썬 것", "ต้นหอมซอยบาง")),
      ingredient("40 g", ml("tenkasu tempura crumbs", "天かす", "天かす", "텐카스", "เท็นคาสุกรอบ"))
    ],
    instructions: [
      {
        title: ml("Blanch the tofu pouches", "汆燙豆皮", "油揚げを油抜きする", "유부 기름 빼기", "ลวกถุงเต้าหู้"),
        body: ml(
          "Drop the 240 g aburaage into the listed 1 L boiling water for 30 seconds to remove excess surface oil. Drain, cool enough to handle, and press gently between clean towels.",
          "將 240 公克油豆皮放入列出的 1 公升沸水汆燙 30 秒去除表面多餘油脂，瀝乾後稍放涼，以乾淨毛巾輕壓。",
          "油揚げ240gを記載した1Lの沸騰湯に30秒入れて表面の油を抜く。水を切って扱える温度まで冷まし、清潔な布で軽く押す。",
          "유부 240g을 목록의 끓는 물 1L에 30초 데쳐 표면 기름을 뺀다. 건져 식힌 뒤 깨끗한 천 사이에서 살짝 누른다.",
          "ลวกอาบุราอาเกะ 240 กรัมในน้ำเดือด 1 ลิตรที่ระบุ 30 วินาทีเพื่อลดน้ำมัน สะเด็ด พอจับได้แล้วกดเบา ๆ ระหว่างผ้าสะอาด"
        )
      },
      {
        title: ml("Simmer the sweet tofu", "燜煮甜豆皮", "油揚げを甘辛く煮る", "유부 달콤하게 조리기", "เคี่ยวถุงเต้าหู้หวานเค็ม"),
        body: ml(
          "Place the blanched pouches in a small pan with 150 ml water, 30 ml soy sauce, 30 ml mirin and 20 g sugar. Simmer over medium-low heat for 10–12 minutes, turning once, until the liquid is mostly absorbed and the pouches are tender.",
          "將豆皮與 150 毫升水、30 毫升淡醬油、30 毫升味醂及 20 公克砂糖放入小鍋，中小火燜煮 10–12 分鐘，中途翻面一次，直到大部分湯汁吸收且豆皮柔軟。",
          "油揚げを水150ml、しょうゆ30ml、みりん30ml、砂糖20gと小鍋に入れる。中弱火で10〜12分、途中で一度返し、汁がほぼ吸われて柔らかくなるまで煮る。",
          "데친 유부를 물 150ml, 간장 30ml, 미림 30ml, 설탕 20g과 작은 냄비에 넣는다. 중약불 10–12분 조리고 한 번 뒤집어 국물이 거의 흡수되고 부드러워지게 한다.",
          "ใส่ถุงเต้าหู้กับน้ำ 150 มล. ซีอิ๊ว 30 มล. มิริน 30 มล. และน้ำตาล 20 กรัมลงกระทะ เคี่ยวไฟกลางอ่อน 10–12 นาที กลับครั้งเดียวจนน้ำซึมเกือบหมดและนุ่ม"
        )
      },
      {
        title: ml("Season the clear broth", "調製清澈湯底", "澄んだつゆを整える", "맑은 국물 간하기", "ปรุงน้ำซุปใส"),
        body: ml(
          "Warm the 1 L unsalted dashi with 60 ml soy sauce, 45 ml mirin, 10 g sugar and 2 g salt over medium heat. Keep it clear and steaming at about 85–90°C; do not let it boil hard.",
          "將 1 公升無鹽高湯與 60 毫升淡醬油、45 毫升味醂、10 公克砂糖及 2 公克鹽以中火加熱，保持清澈並在約 85–90°C 冒蒸氣，不可猛烈沸騰。",
          "無塩だし1Lにしょうゆ60ml、みりん45ml、砂糖10g、塩2gを加え中火で温める。約85〜90℃で湯気を出し、強く沸騰させない。",
          "무염 다시 1L에 간장 60ml, 미림 45ml, 설탕 10g, 소금 2g을 넣고 중불로 데운다. 약 85–90°C에서 김이 나게 하되 세게 끓이지 않는다.",
          "อุ่นดาชิไม่เค็ม 1 ลิตรกับซีอิ๊ว 60 มล. มิริน 45 มล. น้ำตาล 10 กรัม และเกลือ 2 กรัมด้วยไฟกลาง รักษาความใสที่ราว 85–90°C มีไอแต่ไม่เดือดแรง"
        )
      },
      {
        title: ml("Heat the udon separately", "另鍋加熱烏龍麵", "うどんを別に温める", "우동 따로 데우기", "อุ่นอุด้งแยก"),
        body: ml(
          "Cook the four frozen udon portions in the listed 2 L boiling water for 2–3 minutes until the noodles are fully hot, smooth and springy. Drain thoroughly so the clear broth is not diluted.",
          "將四份冷凍烏龍麵放入列出的 2 公升沸水煮 2–3 分鐘，至麵條完全熱透、滑順有彈性；充分瀝乾，避免稀釋清湯。",
          "冷凍うどん4玉を記載した2Lの沸騰湯で2〜3分、麺が熱く滑らかで弾力が出るまで温める。よく水を切り、つゆを薄めない。",
          "목록의 끓는 물 2L에서 냉동 우동 네 인분을 2–3분 완전히 뜨겁고 매끈하며 탄력 있을 때까지 익힌다. 잘 건져 맑은 국물을 희석하지 않는다.",
          "ต้มอุด้งแช่แข็งสี่ส่วนในน้ำเดือด 2 ลิตรที่ระบุ 2–3 นาทีจนเส้นร้อน นุ่มลื่นและเด้ง สะเด็ดให้ดีไม่ให้น้ำเจือจางซุปใส"
        )
      },
      {
        title: ml("Slice the toppings", "切魚板與青蔥", "具材を切る", "고명 썰기", "หั่นเครื่องหน้า"),
        body: ml(
          "Slice the 80 g narutomaki into thin rounds and the 40 g scallions into fine rings. Keep the 40 g tenkasu dry in a small bowl until the bowls are assembled.",
          "將 80 公克鳴門卷魚板切薄片、40 公克青蔥切細圈；40 公克天かす保持乾燥，直到組碗時再加入。",
          "なると巻き80gを薄い輪切り、ねぎ40gを細い小口切りにする。天かす40gは盛り付けまで乾いたままにする。",
          "나루토마키 80g을 얇은 원형으로 썰고 대파 40g을 가늘게 송송 썬다. 텐카스 40g은 담을 때까지 마르게 둔다.",
          "หั่นนารุโตะม้วน 80 กรัมเป็นแว่นบาง และซอยต้นหอม 40 กรัม เก็บเท็นคาสุ 40 กรัมให้แห้งจนกว่าจะจัดชาม"
        )
      },
      {
        title: ml("Combine noodles and broth", "合併麵與湯", "麺とつゆを合わせる", "면과 국물 합치기", "รวมเส้นกับน้ำซุป"),
        body: ml(
          "Divide the drained udon between four warmed bowls. Ladle the hot dashi over the noodles and keep the liquid around 75–80°C so the noodles stay springy and the broth remains clear.",
          "將瀝乾烏龍麵分入四個溫碗，舀入熱高湯，讓液體維持約 75–80°C，使麵條彈牙、湯色清澈。",
          "水を切ったうどんを温めた器4つに分け、熱いだしを注ぐ。液温を75〜80℃ほどに保ち、麺の弾力とつゆの透明感を守る。",
          "물기를 뺀 우동을 데운 그릇 네 개에 나눈다. 뜨거운 다시를 부어 액체를 약 75–80°C로 유지해 면의 탄력과 국물의 맑음을 지킨다.",
          "แบ่งอุด้งที่สะเด็ดแล้วใส่ชามอุ่นสี่ใบ ตักดาชิร้อนราด รักษาอุณหภูมิราว 75–80°C ให้เส้นเด้งและน้ำซุปใส"
        )
      },
      {
        title: ml("Top each bowl", "分碗放上配料", "具材をのせる", "그릇마다 고명 올리기", "วางเครื่องบนแต่ละชาม"),
        body: ml(
          "Top each bowl with one quarter of the seasoned tofu pouches, narutomaki slices, scallion rings and tenkasu. Keep the broth visibly clear around the toppings and do not add any unlisted garnish.",
          "每碗放四分之一甜豆皮、鳴門卷片、青蔥圈與天かす；配料周圍湯汁保持清澈，不加入未列裝飾。",
          "各器に味付けした油揚げの4分の1、なると、ねぎ、天かすをのせる。具の周りのつゆを澄ませ、記載外の飾りは加えない。",
          "각 그릇에 양념한 유부의 4분의 1, 나루토, 대파 링과 텐카스를 올린다. 고명 주변 국물은 맑게 두고 목록 외 장식은 넣지 않는다.",
          "วางถุงเต้าหู้ปรุงรสหนึ่งในสี่ นารุโตะ ต้นหอม และเท็นคาสุบนแต่ละชาม รักษาน้ำซุปให้ใสรอบเครื่องและไม่เติมของแต่งนอกสูตร"
        )
      },
      {
        title: ml("Serve hot and springy", "保持熱度上桌", "熱いうちに供する", "뜨겁고 탄력 있게 내기", "เสิร์ฟร้อนและเด้ง"),
        body: ml(
          "Serve immediately at about 70–75°C. The udon should be fully cooked, smooth and springy, the tofu pouches hot and tender, and the narutomaki still firm enough to slice cleanly.",
          "立即以約 70–75°C 上桌；烏龍麵要完全熟透、滑順有彈性，豆皮熱且柔軟，鳴門卷仍保有可俐落切片的緊實度。",
          "約70〜75℃ですぐ供する。うどんは完全に火が通って滑らかで弾力があり、油揚げは熱く柔らかく、なるとは形を保つ硬さにする。",
          "약 70–75°C로 즉시 낸다. 우동은 완전히 익어 매끈하고 탄력 있어야 하며 유부는 뜨겁고 부드럽고 나루토는 단단하게 썰려야 한다.",
          "เสิร์ฟทันทีที่ราว 70–75°C อุด้งต้องสุกนุ่มลื่นและเด้ง ถุงเต้าหู้ร้อนนุ่ม และนารุโตะยังแน่นพอหั่นสวย"
        )
      }
    ],
    tips: [
      ml("Simmer the tofu pouches slowly so the sweet soy broth penetrates without tearing the fried skin.", "豆皮慢慢燜煮，甜鹹醬汁才會入味又不撕破豆皮。", "油揚げはゆっくり煮ると甘辛い汁が染み、皮が破れません。", "유부를 천천히 조려야 달콤한 간장물이 배고 튀긴 껍질이 찢어지지 않는다.", "เคี่ยวถุงเต้าหู้ช้า ๆ ให้น้ำหวานเค็มซึมโดยไม่ทำให้ผิวทอดขาด"),
      ml("Warm udon in separate water; starch released directly into dashi makes a cloudy, heavy soup.", "烏龍麵另鍋加熱，澱粉直接進高湯會使湯變濁變厚。", "うどんは別鍋で温める。でんぷんがだしに出ると濁って重くなります。", "우동은 따로 데운다. 전분이 다시로 들어가면 국물이 탁하고 무거워진다.", "อุ่นอุด้งแยกหม้อ แป้งที่ออกลงดาชิจะทำให้น้ำซุปขุ่นและหนัก")
    ],
    commonMistakes: [
      ml("A hard boil clouds the dashi and makes the tofu pouches swell; keep a quiet simmer.", "猛烈沸騰會使高湯混濁、豆皮膨脹，請維持安靜微滾。", "強く沸騰させるとだしが濁り、油揚げが膨らむ。静かな煮立ちにする。", "세게 끓이면 다시가 탁해지고 유부가 부푼다. 잔잔하게 끓인다.", "เดือดแรงทำให้ดาชิขุ่นและถุงเต้าหู้พอง ให้เคี่ยวเบา ๆ"),
      ml("Adding tenkasu too early softens its crunch; sprinkle it only when each bowl is ready.", "天かす太早加入會失去酥脆，組好每碗時才撒。", "天かすを早く入れると食感が失われるので、盛り付けの最後に加えます。", "텐카스를 일찍 넣으면 바삭함이 사라지므로 그릇을 완성할 때 올린다.", "ใส่เท็นคาสุเร็วเกินไปจะนิ่ม โรยเมื่อจัดชามเสร็จเท่านั้น")
    ],
    substitutions: [
      ml("Use fresh udon weighing 800 g instead of frozen; cook only until tender and springy, then drain well.", "冷凍麵可改用 800 公克新鮮烏龍麵，煮至熟透彈牙後充分瀝乾。", "冷凍うどんは生うどん800gに替えられます。柔らかく弾力が出るまでゆで、よく水を切る。", "냉동 우동은 생 우동 800g으로 바꿀 수 있다. 부드럽고 탄력 있게 익혀 잘 건진다.", "ใช้อุด้งสด 800 กรัมแทนแช่แข็งได้ ต้มจนสุกเด้งแล้วสะเด็ดให้ดี"),
      ml("For a vegetarian bowl, use kombu-shiitake dashi and verify that the tenkasu and narutomaki are vegetarian before serving.", "素食版可用昆布香菇高湯，並確認天かす與鳴門卷魚板是素食配方。", "植物性なら昆布しいたけだしを使い、天かすとなるとが植物性か確認します。", "채식 그릇은 다시마·표고 다시를 쓰고 텐카스와 나루토가 채식인지 확인한다.", "สำหรับมังสวิรัติใช้ดาชิคอมบุเห็ดหอม และตรวจว่าเท็นคาสุกับนารุโตะเป็นมังสวิรัติ")
    ],
    storage: ml("Keep noodles, broth and toppings separate in the refrigerator for up to 2 days. Reheat the broth to steaming, warm udon in hot water, and add tenkasu only at serving.", "麵、湯與配料分開冷藏最多 2 天；高湯復熱至冒蒸氣，烏龍麵用熱水回溫，天かす上桌時才加。", "麺、つゆ、具を分けて冷蔵2日以内に。つゆは湯気が立つまで温め、うどんは熱湯で温め、天かすは食べる直前に加える。", "면·국물·고명을 따로 냉장해 2일 안에 먹는다. 국물은 김이 날 때까지 데우고 우동은 뜨거운 물에 데우며 텐카스는 먹기 직전 넣는다.", "เก็บเส้น น้ำซุป และเครื่องแยกกันแช่เย็นไม่เกิน 2 วัน อุ่นซุปจนมีไอ อุ่นเส้นในน้ำร้อน และใส่เท็นคาสุตอนเสิร์ฟ"),
    cultureNote: ml("Kitsune udon is a comforting Japanese noodle soup named for the sweet fried-tofu pouch, whose golden colour is associated with a fox; regional bowls add different fish cakes and condiments.", "豆皮金黃似狐色，故稱狐狸烏龍麵，是日本常見的暖心麵湯；不同地區會加入不同魚板與配料。", "黄金色の油揚げを狐に見立てた名前の、親しまれる日本のうどんです。地域で魚練り物や薬味が変わります。", "황금빛 유부가 여우를 닮아 이름 붙은 친숙한 일본 우동 국물로, 지역마다 어묵과 곁들임이 달라진다.", "คิตสึเนะอุด้งเป็นซุปเส้นญี่ปุ่นที่ตั้งชื่อตามถุงเต้าหู้ทอดสีทองคล้ายสุนัขจิ้งจอก เครื่องปลาและเครื่องเคียงต่างกันตามภูมิภาค"),
    sources: [
      { title: "Just One Cookbook — Kitsune Udon", url: "https://www.justonecookbook.com/kitsune-udon/" },
      { title: "Japanese Cooking 101 — Kitsune Udon Recipe", url: "https://www.japanesecooking101.com/kitsune-udon-recipe/" }
    ],
    imageAlt: ml("Real photograph of kitsune udon in clear broth with large seasoned fried-tofu pouches, pink-white narutomaki, sliced scallions and tenkasu.", "實拍清湯甜豆皮烏龍麵，放有大塊甜豆皮、粉白鳴門卷、青蔥與天かす。", "澄んだつゆに大きな味付き油揚げ、ピンク白のなると、ねぎ、天かすが見えるきつねうどんの実写写真。", "맑은 국물에 큼직한 양념 유부, 분홍·흰 나루토마키, 대파와 텐카스가 보이는 유부 우동 실사 사진.", "ภาพถ่ายจริงของคิตสึเนะอุด้งน้ำซุปใส มีถุงเต้าหู้ทอดปรุงรสชิ้นใหญ่ นารุโตะชมพูขาว ต้นหอม และเท็นคาสุ"),
    visualSpec: "Real finished-dish photograph: clear kitsune udon broth with large fried-tofu pouches, pink-white narutomaki, sliced scallions and tenkasu; no unlisted garnish."
  },

  {
    id: "shoyu-ramen",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 30,
    cookMinutes: 75,
    totalMinutes: 105,
    servings: 4,
    name: ml(
      "Home-style shoyu ramen with chashu",
      "家常醬油拉麵配叉燒",
      "自家製チャーシューの醤油ラーメン",
      "집에서 만드는 차슈 간장 라멘",
      "ราเม็งโชยุแบบทำที่บ้านกับชาชู"
    ),
    description: ml(
      "Clear unsalted chicken stock is seasoned with a separate soy tare, then combined with springy ramen noodles, sliced chashu, menma, narutomaki and scallions.",
      "以無鹽雞高湯加入另調醬油 tare，搭配彈牙拉麵、叉燒片、筍乾、鳴門卷與青蔥；不熬製長時間豚骨湯。",
      "無塩の鶏だしに別仕立てのしょうゆだれを合わせ、弾力のある麺、チャーシュー、メンマ、なると、ねぎをのせる家庭向けラーメンです。",
      "무염 닭 육수에 따로 만든 간장 타레를 섞고 탄력 있는 면, 차슈, 멘마, 나루토마키와 대파를 올리는 가정식 라멘이다. 긴 돈코츠 육수는 쓰지 않는다.",
      "ราเม็งทำที่บ้านใช้น้ำสต๊อกไก่ไม่เค็มปรุงด้วยทาเระโชยุแยกต่างหาก ใส่เส้นเด้ง ชาชู เมนมะ นารุโตะม้วน และต้นหอม ไม่ต้มน้ำซุปทงคตสึนานข้ามคืน"
    ),
    ingredients: [
      ingredient("500 g", ml("pork shoulder or belly for chashu", "叉燒用豬肩肉或五花肉", "チャーシュー用豚肩肉または豚バラ肉", "차슈용 돼지 어깨살 또는 삼겹살", "สันคอหรือหมูสามชั้นสำหรับชาชู")),
      ingredient("15 ml", ml("neutral oil for searing the pork", "煎豬肉用中性油", "豚肉を焼く植物油", "돼지고기 굽는 중성유", "น้ำมันรสกลางสำหรับจี่หมู")),
      ingredient("750 ml", ml("water for the chashu braise", "燉叉燒用水", "チャーシューを煮る水", "차슈 조림용 물", "น้ำสำหรับเคี่ยวชาชู")),
      ingredient("120 ml", ml("soy sauce for the chashu braise", "叉燒燉汁用醬油", "チャーシュー用しょうゆ", "차슈 조림용 간장", "ซีอิ๊วสำหรับเคี่ยวชาชู")),
      ingredient("60 ml", ml("sake for the chashu braise", "叉燒燉汁用清酒", "チャーシュー用日本酒", "차슈 조림용 사케", "สาเกสำหรับเคี่ยวชาชู")),
      ingredient("60 ml", ml("mirin for the chashu braise", "叉燒燉汁用味醂", "チャーシュー用みりん", "차슈 조림용 미림", "มิรินสำหรับเคี่ยวชาชู")),
      ingredient("20 g", ml("sugar for the chashu braise", "叉燒燉汁用砂糖", "チャーシュー用砂糖", "차슈 조림용 설탕", "น้ำตาลสำหรับเคี่ยวชาชู")),
      ingredient("20 g", ml("ginger, sliced for the chashu braise", "燉叉燒用薑片", "チャーシュー用しょうが（薄切り）", "차슈 조림용 생강 슬라이스", "ขิงซอยสำหรับเคี่ยวชาชู")),
      ingredient("30 g", ml("scallions for the chashu braise", "燉叉燒用青蔥", "チャーシュー用長ねぎ", "차슈 조림용 대파", "ต้นหอมสำหรับเคี่ยวชาชู")),
      ingredient("1.2 L", ml("unsalted chicken stock", "無鹽雞高湯", "無塩鶏だし", "무염 닭 육수", "น้ำสต๊อกไก่ไม่เค็ม")),
      ingredient("120 ml", ml("soy sauce for the ramen tare", "拉麵 tare 用醬油", "ラーメンのたれ用しょうゆ", "라멘 타레용 간장", "ซีอิ๊วสำหรับทาเระราเม็ง")),
      ingredient("30 ml", ml("mirin for the ramen tare", "拉麵 tare 用味醂", "ラーメンのたれ用みりん", "라멘 타레용 미림", "มิรินสำหรับทาเระราเม็ง")),
      ingredient("10 g", ml("sugar for the ramen tare", "拉麵 tare 用砂糖", "ラーメンのたれ用砂糖", "라멘 타레용 설탕", "น้ำตาลสำหรับทาเระราเม็ง")),
      ingredient("5 g", ml("dried kombu for the ramen tare", "拉麵 tare 用乾昆布", "ラーメンのたれ用乾燥昆布", "라멘 타레용 말린 다시마", "คอมบุแห้งสำหรับทาเระราเม็ง")),
      ingredient("600 g", ml("fresh ramen noodles, four portions", "新鮮拉麵，四份", "生ラーメン4玉", "생 라멘 네 인분", "เส้นราเม็งสดสี่ส่วน")),
      ingredient("3 L", ml("water for boiling the ramen noodles", "煮拉麵用水", "ラーメンをゆでる水", "라멘 면 삶을 물", "น้ำสำหรับต้มเส้นราเม็ง")),
      ingredient("120 g", ml("menma bamboo shoots", "筍乾", "メンマ", "멘마 죽순", "หน่อไม้เมนมะ")),
      ingredient("80 g", ml("narutomaki fish cake, sliced", "鳴門卷魚板，切片", "なると巻き（薄切り）", "나루토마키 어묵, 썬 것", "นารุโตะม้วนหั่นชิ้น")),
      ingredient("60 g", ml("scallions, thinly sliced for serving", "上桌用青蔥，切薄片", "仕上げ用長ねぎ（薄切り）", "대파, 얇게 썰어 고명용", "ต้นหอมซอยบางสำหรับเสิร์ฟ"))
    ],
    instructions: [
      {
        title: ml("Prepare the pork", "準備豬肉", "豚肉を整える", "돼지고기 손질", "เตรียมหมู"),
        body: ml(
          "Pat the 500 g pork dry and tie it into a compact log if using shoulder or belly. Leave the surface intact so it slices into two thick chashu pieces per bowl.",
          "將 500 公克豬肉擦乾；使用肩肉或五花肉時綁成緊實肉卷，保持表面完整，方便每碗切兩片厚叉燒。",
          "豚肉500gの水気を拭き、肩肉やバラ肉なら形を整えてたこ糸で縛る。表面を保ち、器ごとに厚いチャーシューを2枚切れるようにする。",
          "돼지고기 500g의 물기를 닦고 어깨살이나 삼겹살이면 단단한 통나무 모양으로 묶는다. 표면을 유지해 그릇마다 두꺼운 차슈 두 장을 썬다.",
          "ซับหมู 500 กรัมให้แห้ง หากใช้สันคอหรือสามชั้นให้มัดเป็นแท่งแน่น รักษาผิวไว้เพื่อหั่นชาชูหนาชามละสองชิ้น"
        )
      },
      {
        title: ml("Sear the chashu", "煎上叉燒色", "チャーシューを焼く", "차슈 겉면 굽기", "จี่ชาชูให้เป็นสี"),
        body: ml(
          "Heat the 15 ml neutral oil in a heavy pot over medium-high heat. Brown every side of the pork for 6–8 minutes, then remove it; searing builds colour without pretending to make a long-cooked tonkotsu broth.",
          "厚底鍋以中大火加熱 15 毫升中性油，將豬肉每面煎 6–8 分鐘至上色後取出；這只建立表面色澤，不假裝熬製長時間豚骨湯。",
          "厚手の鍋で油15mlを中強火に熱し、豚肉の全ての面を6〜8分焼いて色を付け、取り出す。長時間の豚骨だしを作る工程ではない。",
          "두꺼운 냄비에 중강불로 중성유 15ml를 달군다. 돼지고기 모든 면을 6–8분 갈색으로 굽고 꺼낸다. 긴 돈코츠 육수를 만드는 과정은 아니다.",
          "ตั้งหม้อก้นหนาไฟกลางค่อนแรง ใส่น้ำมัน 15 มล. จี่หมูทุกด้าน 6–8 นาทีจนมีสีแล้วตักออก ขั้นตอนนี้ไม่ใช่การทำน้ำซุปทงคตสึนาน ๆ"
        )
      },
      {
        title: ml("Braise until safe and tender", "燉煮至熟嫩", "安全な温度まで煮る", "안전하게 익혀 부드럽게 조리", "เคี่ยวจนสุกปลอดภัยและนุ่ม"),
        body: ml(
          "Add 750 ml water, 120 ml chashu soy sauce, 60 ml sake, 60 ml mirin, 20 g sugar, ginger and braising scallions to the pot. Return the pork, cover and simmer gently for 45 minutes, turning twice, until tender and the centre reaches at least 71°C.",
          "鍋中加入 750 毫升水、120 毫升叉燒醬油、60 毫升清酒、60 毫升味醂、20 公克糖、薑片與燉煮青蔥，放回豬肉加蓋小火燉 45 分鐘，中途翻面兩次，直到柔嫩且中心至少達 71°C。",
          "鍋に水750ml、チャーシュー用しょうゆ120ml、酒60ml、みりん60ml、砂糖20g、しょうが、ねぎを入れる。肉を戻し、ふたをして弱く45分煮、途中2回返し、柔らかく中心71℃以上にする。",
          "냄비에 물 750ml, 차슈 간장 120ml, 사케 60ml, 미림 60ml, 설탕 20g, 생강과 대파를 넣는다. 고기를 돌려 넣고 덮어 45분 약하게 끓이며 두 번 뒤집어 부드럽고 중심 71°C 이상이 되게 한다.",
          "ใส่น้ำ 750 มล. ซีอิ๊วชาชู 120 มล. สาเก 60 มล. มิริน 60 มล. น้ำตาล 20 กรัม ขิง และต้นหอมลงหม้อ ใส่หมูกลับ ปิดฝาเคี่ยวเบา ๆ 45 นาที กลับสองครั้งจนหมูนุ่มและใจกลางอย่างน้อย 71°C"
        )
      },
      {
        title: ml("Cool and slice the pork", "放涼切叉燒", "冷まして切る", "식혀 차슈 썰기", "พักแล้วหั่นหมู"),
        body: ml(
          "Move the pork to a tray and cool it for 10 minutes. Remove the string and slice across the grain into eight thick pieces. Strain and discard the braising liquid; it is not part of the separate ramen tare.",
          "將豬肉移到托盤放涼 10 分鐘，拆除綁線後逆紋切成八片厚片；燉汁過濾後丟棄，不作另調的拉麵 tare。",
          "豚肉をトレーに移し10分冷ます。糸を外して繊維を断つ厚切り8枚にする。煮汁はこして捨て、別仕立てのラーメンだれには使わない。",
          "돼지고기를 트레이로 옮겨 10분 식힌다. 실을 풀고 결 반대로 두껍게 여덟 조각 썬다. 조림 국물은 걸러 버리고 별도 라멘 타레에는 쓰지 않는다.",
          "ย้ายหมูลงถาดพัก 10 นาที เอาเชือกออกแล้วหั่นขวางเส้นใยเป็นแปดชิ้นหนา กรองน้ำเคี่ยวแล้วทิ้ง ไม่ใช้ในทาเระราเม็งที่ทำแยก"
        )
      },
      {
        title: ml("Make the soy tare", "煮醬油 tare", "しょうゆだれを作る", "간장 타레 만들기", "ทำทาเระโชยุ"),
        body: ml(
          "Warm 120 ml tare soy sauce, 30 ml tare mirin, 10 g tare sugar and 5 g kombu over low heat for 5 minutes. Remove the kombu before it boils and cool the concentrated tare; do not use a packet seasoning.",
          "以小火加熱 120 毫升 tare 醬油、30 毫升 tare 味醂、10 公克 tare 砂糖與 5 公克昆布 5 分鐘；沸騰前取出昆布，放涼濃縮醬汁，不使用調味包。",
          "たれ用しょうゆ120ml、みりん30ml、砂糖10g、昆布5gを弱火で5分温める。沸騰前に昆布を出して冷まし、袋調味料は使わない。",
          "타레용 간장 120ml, 미림 30ml, 설탕 10g, 다시마 5g을 약불에서 5분 데운다. 끓기 전에 다시마를 빼고 농축 타레를 식힌다. 분말 스프는 쓰지 않는다.",
          "อุ่นซีอิ๊วทาเระ 120 มล. มิริน 30 มล. น้ำตาล 10 กรัม และคอมบุ 5 กรัมด้วยไฟอ่อน 5 นาที ยกคอมบุออกก่อนเดือด ทำทาเระให้เย็น และไม่ใช้เครื่องปรุงซอง"
        )
      },
      {
        title: ml("Heat the chicken stock", "加熱雞高湯", "鶏だしを温める", "닭 육수 데우기", "อุ่นน้ำสต๊อกไก่"),
        body: ml(
          "Heat the 1.2 L unsalted chicken stock over medium-low heat to 85–90°C. Whisk in all 150 ml of the cooled tare, using 37.5 ml per bowl, and taste the finished broth; hold it around 80–85°C without a hard boil.",
          "以中小火將 1.2 公升無鹽雞高湯加熱至 85–90°C，拌入全部 150 毫升放涼 tare，每碗使用 37.5 毫升，再試味；維持約 80–85°C，不可猛烈沸騰。",
          "無塩鶏だし1.2Lを中弱火で85〜90℃に温め、冷ましたたれ全量150ml（1器37.5ml）を混ぜて味を確認する。80〜85℃で保ち、強く沸騰させない。",
          "무염 닭 육수 1.2L를 중약불에서 85–90°C로 데운다. 식힌 타레 전량 150ml를 섞어 그릇마다 37.5ml씩 쓰고 간을 본다. 80–85°C로 유지하며 세게 끓이지 않는다.",
          "อุ่นน้ำสต๊อกไก่ไม่เค็ม 1.2 ลิตรด้วยไฟกลางอ่อนถึง 85–90°C คนทาเระที่เย็นแล้วทั้งหมด 150 มล. ใช้ชามละ 37.5 มล. แล้วชิม รักษา 80–85°C โดยไม่เดือดแรง"
        )
      },
      {
        title: ml("Boil the ramen noodles", "煮熟拉麵", "麺をゆでる", "라멘 면 삶기", "ต้มเส้นราเม็ง"),
        body: ml(
          "Bring the full 3 L noodle water to a rolling boil in a large pot. Cook the four fresh ramen portions for 2–3 minutes, or to the package timing, until fully cooked with a springy bite; drain very well.",
          "大鍋將全部 3 公升煮麵水煮至大滾，放入四份新鮮拉麵煮 2–3 分鐘，或依包裝時間，至完全熟透且仍有彈性；充分瀝乾。",
          "大鍋で麺用の水3Lを沸騰させ、生ラーメン4玉を2〜3分、または表示時間ゆでる。完全に火を通し、弾力を残してよく湯切りする。",
          "큰 냄비에서 면수 3L를 팔팔 끓인다. 생 라멘 네 인분을 2–3분 또는 포장 시간대로 삶아 완전히 익히되 탄력을 남기고 잘 건진다.",
          "ต้มน้ำ 3 ลิตรสำหรับเส้นในหม้อใหญ่ให้เดือดจัด ต้มราเม็งสดสี่ส่วน 2–3 นาทีหรือตามฉลากจนสุกทั่วแต่ยังเด้ง แล้วสะเด็ดให้ดี"
        )
      },
      {
        title: ml("Assemble and serve hot", "組碗熱上桌", "盛り付けて熱く供する", "담아 뜨겁게 내기", "ประกอบชามและเสิร์ฟร้อน"),
        body: ml(
          "Divide the hot noodles among four warmed bowls and pour over the 80–85°C shoyu broth. Add two thick chashu slices, menma, narutomaki and sliced scallions to each bowl. Serve immediately; the pork is cooked by temperature, not by its pink colour, and this photographed version has no egg or nori.",
          "將熱麵分入四個溫碗，沖入 80–85°C 醬油湯；每碗放兩片厚叉燒、筍乾、鳴門卷與青蔥片，立即上桌。豬肉以溫度判斷熟度，不以粉紅色判斷；本照片版本不含蛋或海苔。",
          "熱い麺を温めた器4つに分け、80〜85℃のしょうゆスープを注ぐ。各器に厚いチャーシュー2枚、メンマ、なると、ねぎをのせてすぐ供する。肉の色ではなく温度で火通りを判断し、この写真の形には卵とのりを加えない。",
          "뜨거운 면을 데운 그릇 네 개에 나누고 80–85°C 간장 국물을 붓는다. 그릇마다 두꺼운 차슈 두 장, 멘마, 나루토마키와 대파를 올려 즉시 낸다. 고기 익힘은 분홍색이 아닌 온도로 판단하며 이 사진 버전에는 달걀과 김이 없다.",
          "แบ่งเส้นร้อนใส่ชามอุ่นสี่ใบ ราดน้ำซุปโชยุ 80–85°C ใส่ชาชูหนาชามละสองชิ้น เมนมะ นารุโตะม้วน และต้นหอมซอย เสิร์ฟทันที ตัดสินความสุกหมูจากอุณหภูมิไม่ใช่สีชมพู และสูตรตามภาพนี้ไม่มีไข่หรือโนริ"
        )
      }
    ],
    tips: [
      ml("Keep tare and unsalted stock separate until tasting; this makes the salt level adjustable without turning the broth cloudy.", "無鹽高湯與 tare 分開，試味時再合併，鹹度好調整且湯不易混濁。", "無塩だしとたれは別にして味見時に合わせると、塩分を調整でき、汁も濁りません。", "무염 육수와 타레를 따로 두고 맛을 볼 때 합치면 염도를 조절하고 국물을 맑게 유지할 수 있다.", "แยกทาเระกับน้ำสต๊อกไม่เค็มจนชิมแล้วจึงรวม จะปรับความเค็มได้และน้ำไม่ขุ่น"),
      ml("Boil noodles separately in plenty of water and drain hard; residual starch and water weaken a clear shoyu broth.", "麵要用充足水量另鍋煮並用力瀝乾，殘留澱粉與水分會沖淡清澈醬油湯。", "麺はたっぷりの別湯でゆで、しっかり湯切りする。残ったでんぷんと水が澄んだスープを薄めます。", "면은 물 넉넉한 별도 냄비에서 삶고 세게 털어야 남은 전분과 물이 맑은 간장 국물을 약하게 하지 않는다.", "ต้มเส้นแยกในน้ำมากและสะเด็ดแรง ๆ แป้งกับน้ำที่เหลือจะทำให้น้ำซุปโชยุใสเจือจาง" )
    ],
    commonMistakes: [
      ml("Using salted stock plus a full tare makes the bowl harsh; start with unsalted chicken stock and add tare gradually.", "有鹽高湯再加足量 tare 會過鹹；請從無鹽雞高湯開始，逐步加入 tare。", "塩入りのだしにたれを全量入れると塩辛い。無塩鶏だしから始め、たれを少しずつ加える。", "간이 된 육수에 타레를 전량 넣으면 짜다. 무염 닭 육수에서 시작해 타레를 조금씩 넣는다.", "ใช้น้ำสต๊อกเค็มพร้อมทาเระเต็มปริมาณจะเค็มจัด เริ่มจากสต๊อกไก่ไม่เค็มและเติมทาเระทีละน้อย"),
      ml("A thick pork log can look pink even when safe; verify at least 71°C in the centre before slicing and serving.", "厚叉燒即使安全熟透中心仍可能粉紅；切片上桌前要確認中心至少 71°C。", "厚いチャーシューは安全でもピンクに見えることがある。切る前に中心71℃以上を確認する。", "두꺼운 차슈는 안전해도 분홍빛일 수 있다. 썰어 내기 전에 중심이 최소 71°C인지 확인한다.", "ชาชูหนาอาจยังชมพูแม้สุกปลอดภัย ตรวจใจกลางอย่างน้อย 71°C ก่อนหั่นและเสิร์ฟ" )
    ],
    substitutions: [
      ml("Use boneless chicken thigh at 500 g instead of pork, sear it, then simmer in the braising seasonings until its thickest part reaches 74°C.", "豬肉可改用 500 公克去骨雞腿肉，先煎上色，再以燉汁煮至最厚處 74°C。", "豚肉は鶏もも肉500gに替え、焼き付けてから煮汁で最厚部74℃まで煮る。", "돼지고기는 뼈 없는 닭다리살 500g으로 바꾸고 겉을 구운 뒤 조림 양념에서 가장 두꺼운 곳 74°C까지 익힌다.", "เปลี่ยนหมูเป็นเนื้อสะโพกไก่เลาะกระดูก 500 กรัม จี่ให้มีสีแล้วเคี่ยวจนส่วนหนาสุดถึง 74°C"),
      ml("For a gluten-free bowl, use certified gluten-free ramen noodles and tamari in both soy portions; keep the same temperatures and cooking checks.", "無麩質版使用認證無麩質拉麵與 tamari 取代兩處醬油，溫度與熟度判斷不變。", "グルテンフリーなら認証品の麺と、2種類のしょうゆをたまりに替える。温度と火通りの確認は同じ。", "글루텐 프리는 인증 라멘과 두 간장 분량을 타마리로 바꾸고 같은 온도와 익힘 검사를 지킨다.", "แบบไร้กลูเตนใช้เส้นที่รับรองและทามาริแทนซีอิ๊วทั้งสองส่วน รักษาอุณหภูมิและเกณฑ์สุกเดิม" )
    ],
    storage: ml("Store chashu, broth, tare and noodles separately, covered and refrigerated for up to 2 days. Reheat broth until steaming, pork to 74°C, and boil fresh noodles for serving.", "叉燒、高湯、tare 與麵分開加蓋冷藏最多 2 天；高湯復熱至冒蒸氣，叉燒加熱至 74°C，食用時重新煮麵。", "チャーシュー、だし、たれ、麺を分けてふたをし、冷蔵2日以内に。だしは湯気が立つまで、肉は74℃まで温め、麺は食べる時にゆで直す。", "차슈·육수·타레·면을 따로 덮어 냉장하고 2일 안에 먹는다. 육수는 김이 날 때까지, 고기는 74°C까지 데우고 면은 먹을 때 새로 삶는다.", "เก็บชาชู น้ำซุป ทาเระ และเส้นแยกกันปิดฝาแช่เย็นไม่เกิน 2 วัน อุ่นซุปจนมีไอ อุ่นหมูถึง 74°C และต้มเส้นใหม่เมื่อเสิร์ฟ"),
    cultureNote: ml("Shoyu ramen is a broad Japanese ramen family built around a soy-seasoned tare and a clear or lightly cloudy broth; home cooks can make a satisfying bowl without a marathon pork-bone stock.", "醬油拉麵是以醬油 tare 為核心、湯色清澈或微濁的日本拉麵大類；家庭不必熬製漫長豚骨湯也能完成一碗。", "醤油ラーメンはしょうゆだれを軸にした日本の幅広いラーメン系統です。家庭では長時間の豚骨だしなしでも満足できる一杯になります。", "쇼유 라멘은 간장 타레와 맑거나 살짝 탁한 육수를 중심으로 한 일본 라멘 계열이며 집에서는 긴 돼지뼈 육수 없이도 완성할 수 있다.", "ราเม็งโชยุเป็นตระกูลราเม็งญี่ปุ่นที่มีทาเระโชยุและน้ำซุปใสหรือขุ่นเล็กน้อย บ้านทำชามอร่อยได้โดยไม่ต้องต้มน้ำซุปกระดูกหมูนาน"),
    sources: [
      { title: "Just One Cookbook — Shoyu Ramen (Recipe from Bizentei, Tokyo)", url: "https://www.justonecookbook.com/shoyu-ramen/" },
      { title: "The Kitchn — Shoyu Ramen Recipe", url: "https://www.thekitchn.com/how-to-make-the-best-ramen-at-home-236345" },
      { title: "Japanese Cookbook — Weeknight Shoyu Ramen", url: "https://japanesecookbook.com/recipes/shoyu-ramen/" }
    ],
    imageAlt: ml("Real photograph of shoyu ramen with clear dark soy broth, yellow wavy noodles, two thick chashu slices, menma, narutomaki and sliced scallions; no egg or nori.", "實拍醬油拉麵，深色清澈醬油湯中有黃色捲麵、兩片厚叉燒、筍乾、鳴門卷與切蔥，沒有蛋或海苔。", "澄んだ濃いしょうゆスープに黄色い縮れ麺、厚いチャーシュー2枚、メンマ、なると、刻みねぎが見える実写写真。卵とのりはない。", "맑고 진한 간장 국물에 노란 곱슬면, 두꺼운 차슈 두 장, 멘마, 나루토마키와 썬 대파가 보이며 달걀과 김은 없는 실사 사진.", "ภาพถ่ายจริงของราเม็งโชยุน้ำซุปโชยุใสสีเข้ม มีเส้นหยักสีเหลือง ชาชูหนาสองชิ้น เมนมะ นารุโตะม้วน และต้นหอมซอย ไม่มีไข่หรือโนริ"),
    visualSpec: "Real finished-dish photograph: clear dark shoyu broth with yellow wavy ramen noodles, two thick chashu slices, menma bamboo shoots, pink-white narutomaki and sliced scallions; no egg, nori, corn, sesame or other unlisted garnish."
  }
];

export default japaneseRecipesC;
