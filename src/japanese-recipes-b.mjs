const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });
const ingredient = (amount, item) => ({ amount, item });

export const japaneseRecipesB = [
  {
    id: "chicken-karaage",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 40,
    cookMinutes: 15,
    totalMinutes: 55,
    servings: 4,
    name: ml("Chicken karaage", "日式炸雞", "鶏の唐揚げ", "일본식 가라아게", "ไก่คาราอาเกะ"),
    description: ml(
      "Juicy boneless chicken thighs are marinated with soy, sake, ginger, and garlic, then fried twice for a crisp potato-starch crust.",
      "去骨雞腿肉以醬油、清酒、薑與蒜醃入味，再以馬鈴薯澱粉分批炸兩次，外酥內嫩。",
      "骨なし鶏もも肉をしょうゆ、酒、しょうが、にんにくで下味付けし、片栗粉で二度揚げしてカリッと仕上げます。",
      "뼈 없는 닭다리살을 간장, 사케, 생강, 마늘에 재운 뒤 감자전분으로 두 번 튀겨 바삭하게 만듭니다.",
      "หมู่น่องไก่ไร้กระดูกหมักซีอิ๊ว สาเก ขิง และกระเทียม แล้วทอดสองครั้งด้วยแป้งมันฝรั่งให้กรอบ"
    ),
    ingredients: [
      ingredient("600 g", ml("boneless, skin-on chicken thighs, cut into 4 cm pieces", "去骨帶皮雞腿肉，切 4 公分塊", "骨なし鶏もも肉（皮付き、4cm角）", "뼈 없는 껍질 있는 닭다리살, 4cm 조각", "น่องไก่ไร้กระดูกติดหนัง หั่นชิ้น 4 ซม.")),
      ingredient("30 ml", ml("Japanese soy sauce", "日式醬油", "しょうゆ", "일본 간장", "ซีอิ๊วญี่ปุ่น")),
      ingredient("15 ml", ml("sake", "清酒", "酒", "사케", "สาเก")),
      ingredient("5 g", ml("fresh ginger, grated", "新鮮薑，磨泥", "しょうが（すりおろし）", "생강, 간 것", "ขิงสดขูด")),
      ingredient("5 g", ml("garlic, grated", "蒜，磨泥", "にんにく（すりおろし）", "마늘, 간 것", "กระเทียมขูด")),
      ingredient("5 ml", ml("toasted sesame oil", "烘香芝麻油", "ごま油", "참기름", "น้ำมันงาคั่ว")),
      ingredient("4 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด")),
      ingredient("1 g", ml("black pepper, finely ground", "黑胡椒粉", "黒こしょう（粉）", "후추, 곱게 간 것", "พริกไทยดำบดละเอียด")),
      ingredient("40 g", ml("all-purpose flour for the first dusting", "第一次裹粉用中筋麵粉", "最初の打ち粉用薄力粉", "첫 번째 묻힘용 중력분", "แป้งอเนกประสงค์สำหรับคลุกครั้งแรก")),
      ingredient("80 g", ml("potato starch for the final coating", "最後裹粉用馬鈴薯澱粉", "仕上げ用片栗粉", "마지막 코팅용 감자전분", "แป้งมันฝรั่งสำหรับเคลือบขั้นสุดท้าย")),
      ingredient("1.5 L", ml("neutral oil for deep-frying", "油炸用中性油", "揚げ油", "튀김용 중성유", "น้ำมันรสกลางสำหรับทอด")),
      ingredient("60 g", ml("green cabbage leaves, torn into large pieces, for serving", "上桌用綠高麗菜葉，撕成大片", "盛り付け用の青キャベツの葉（大きくちぎる）", "곁들임용 초록 양배추 잎, 크게 찢기", "ใบกะหล่ำปลีเขียวฉีกเป็นชิ้นใหญ่สำหรับเสิร์ฟ"))
    ],
    instructions: [
      {
        title: ml("Cut and portion the chicken", "切雞肉並分份", "鶏肉を切り分ける", "닭고기 자르고 나누기", "หั่นและแบ่งไก่"),
        body: ml(
          "Trim only excess fat from 600 g boneless, skin-on chicken thighs and cut them into even 4 cm pieces. Use a dedicated raw-chicken board and knife; wash hands and clean and sanitize the tools before touching other foods.",
          "將 600 公克去骨帶皮雞腿肉只修去多餘脂肪，切成均勻 4 公分塊。生雞肉使用專用砧板與刀具；接觸其他食物前洗手並清潔消毒工具。",
          "骨付きでない皮付き鶏もも肉600gは余分な脂だけ取り、4cm角にそろえて切ります。生肉専用のまな板と包丁を使い、他の食材に触れる前に手と道具を洗浄・消毒します。",
          "뼈 없는 껍질 있는 닭다리살 600g에서 여분의 지방만 떼고 4cm 크기로 고르게 썬다. 생닭 전용 도마와 칼을 쓰며 다른 식재료를 만지기 전에 손과 도구를 세척·소독한다.",
          "ตัดไขมันส่วนเกินออกจากน่องไก่ติดหนังไร้กระดูก 600 กรัมเท่านั้น แล้วหั่นเป็นชิ้น 4 ซม. เท่า ๆ กัน ใช้เขียงและมีดสำหรับไก่ดิบโดยเฉพาะ ล้างมือและทำความสะอาดฆ่าเชื้ออุปกรณ์ก่อนจับอาหารอื่น"
        )
      },
      {
        title: ml("Marinate for 30 minutes", "醃漬 30 分鐘", "30分漬け込む", "30분 재우기", "หมัก 30 นาที"),
        body: ml(
          "Add 30 ml soy sauce, 15 ml sake, 5 g grated ginger, 5 g grated garlic, 5 ml sesame oil, 4 g salt, and 1 g pepper. Massage until absorbed, cover, and refrigerate at 4°C or colder for 30 minutes. Discard all marinade that touched raw chicken.",
          "加入 30 毫升醬油、15 毫升清酒、5 公克薑泥、5 公克蒜泥、5 毫升芝麻油、4 公克鹽與 1 公克胡椒，按摩至吸收，加蓋在 4°C 以下冷藏 30 分鐘。接觸過生雞肉的醃汁全部丟棄。",
          "しょうゆ30ml、酒15ml、すりおろししょうが5g、にんにく5g、ごま油5ml、塩4g、こしょう1gを加え、吸収されるまで揉みます。覆って4℃以下で30分冷蔵し、生肉に触れた漬け汁は全て捨てます。",
          "간장 30ml, 사케 15ml, 간 생강 5g, 간 마늘 5g, 참기름 5ml, 소금 4g, 후추 1g을 넣고 흡수될 때까지 주무른다. 덮어 4°C 이하에서 30분 냉장하고 생닭에 닿은 양념은 모두 버린다.",
          "ใส่ซีอิ๊ว 30 มล. สาเก 15 มล. ขิงขูด 5 กรัม กระเทียมขูด 5 กรัม น้ำมันงา 5 มล. เกลือ 4 กรัม และพริกไทย 1 กรัม นวดจนซึม ปิดฝาแช่ที่ 4°C หรือต่ำกว่า 30 นาที ทิ้งน้ำหมักที่สัมผัสไก่ดิบทั้งหมด"
        )
      },
      {
        title: ml("Build the coating station", "準備裹粉台", "衣の準備をする", "튀김옷 준비하기", "เตรียมแป้งเคลือบ"),
        body: ml(
          "Put 40 g flour and 80 g potato starch in separate shallow dishes. Drain each marinated chicken piece, coat lightly in flour, then coat in potato starch and shake off loose powder. Keep the coated pieces on a clean tray away from the raw-chicken tray.",
          "將 40 公克麵粉與 80 公克馬鈴薯澱粉分放兩個淺盤。每塊雞肉瀝去多餘醃汁，先薄裹麵粉，再裹馬鈴薯澱粉並抖掉鬆粉；裹好的雞肉放在遠離生肉盤的乾淨托盤。",
          "薄力粉40gと片栗粉80gを別々の浅い皿に入れます。鶏肉の漬け汁を切り、薄力粉を薄くまぶしてから片栗粉をまぶし、余分な粉を落とします。衣を付けた肉は生肉用の皿とは別の清潔なトレーに置きます。",
          "중력분 40g과 감자전분 80g을 각각 얕은 접시에 담는다. 양념한 닭의 양념을 털고 밀가루를 얇게 묻힌 다음 감자전분을 묻혀 남은 가루를 턴다. 튀김옷을 입힌 닭은 생닭 접시와 떨어진 깨끗한 트레이에 둔다.",
          "ใส่แป้ง 40 กรัมและแป้งมันฝรั่ง 80 กรัมในจานตื้นแยกกัน สะเด็ดน้ำหมักจากไก่แต่ละชิ้น คลุกแป้งบาง ๆ แล้วคลุกแป้งมันฝรั่ง สะบัดผงส่วนเกิน วางไก่ที่เคลือบแล้วบนถาดสะอาดแยกจากถาดไก่ดิบ"
        )
      },
      {
        title: ml("First fry in batches", "分批初炸", "分けて一度揚げる", "나누어 1차 튀기기", "ทอดครั้งแรกเป็นชุด"),
        body: ml(
          "Heat 1.5 L neutral oil in a deep pot to 160°C. Fry only 3–5 chicken pieces per batch, leaving space, for about 90 seconds until the crust is pale gold and the pieces are not yet deeply browned. Keep the oil near 160°C between batches.",
          "深鍋將 1.5 公升中性油加熱至 160°C。每批只放 3–5 塊雞肉並留空間，炸約 90 秒至外皮淡金、尚未深褐；各批之間讓油溫維持接近 160°C。",
          "深鍋の中性油1.5Lを160℃に熱します。1回3〜5個だけ、間隔を空けて約90秒揚げ、衣が薄いきつね色でまだ濃くならない段階にします。各回の間も油を160℃付近に保ちます。",
          "깊은 냄비의 중성유 1.5L를 160°C로 가열한다. 한 번에 닭 3–5조각만 간격을 두고 약 90초 튀겨 겉옷이 연한 황금색이고 아직 짙게 갈색 나지 않게 한다. 배치 사이 기름은 160°C 부근으로 유지한다.",
          "ตั้งน้ำมันรสกลาง 1.5 ลิตรในหม้อลึกให้ถึง 160°C ทอดครั้งละ 3–5 ชิ้นโดยเว้นระยะ ประมาณ 90 วินาทีจนแป้งสีทองอ่อนแต่ยังไม่เข้มมาก รักษาน้ำมันใกล้ 160°C ระหว่างชุด"
        )
      },
      {
        title: ml("Drain and rest safely", "瀝油並安全靜置", "油を切って安全に休ませる", "기름 빼고 안전하게 쉬기", "สะเด็ดและพักอย่างปลอดภัย"),
        body: ml(
          "Lift each first-fried batch with a clean spider and drain on a wire rack for 2 minutes, then rest it for 3 minutes while the next batch cooks. Skim loose crumbs and never return cooked chicken to a tray or utensil that held raw chicken.",
          "每批初炸雞肉用乾淨漏勺撈起，在網架瀝油 2 分鐘，再靜置 3 分鐘等待下一批。撈除浮粉，熟雞肉不可放回接觸過生雞肉的托盤或器具。",
          "一度揚げの各回を清潔な網じゃくしですくい、網で2分油を切ってから次の回を揚げる間3分休ませます。浮いた衣をすくい、生肉に触れたトレーや道具へ戻しません。",
          "초벌 튀김 배치를 깨끗한 건지개로 건져 철망에서 2분 기름을 뺀 뒤 다음 배치를 튀기는 3분 동안 쉰다. 떠다니는 부스러기를 걷고 익은 닭을 생닭이 닿은 트레이나 도구에 되돌리지 않는다.",
          "ตักไก่แต่ละชุดด้วยกระชอนสะอาด พักบนตะแกรงให้สะเด็ด 2 นาที แล้วพักอีก 3 นาทีระหว่างทอดชุดถัดไป ช้อนเศษแป้งออก และห้ามวางไก่สุกกลับบนถาดหรือใช้อุปกรณ์ที่สัมผัสไก่ดิบ"
        )
      },
      {
        title: ml("Second fry to 74°C", "復炸至 74°C", "74℃まで二度揚げする", "74°C까지 다시 튀기기", "ทอดครั้งที่สองให้ถึง 74°C"),
        body: ml(
          "Raise the oil to 180°C and fry the same batches again for 60–90 seconds until deeply golden and crisp. Check the thickest piece with a clean thermometer; the centre must reach at least 74°C. Keep the batches small so the oil stays hot.",
          "將油溫升至 180°C，同樣分批復炸 60–90 秒，至深金黃酥脆。用乾淨溫度計測量最厚一塊，中心至少達 74°C；維持小批量以免油溫下降。",
          "油を180℃に上げ、同じ分量を60〜90秒二度揚げして濃いきつね色でカリッとさせます。清潔な温度計で最も厚い一個を測り、中心を74℃以上にします。油温を保つため少量ずつ揚げます。",
          "기름을 180°C로 올리고 같은 배치들을 60–90초 다시 튀겨 짙은 황금색으로 바삭하게 만든다. 깨끗한 온도계로 가장 두꺼운 조각을 재어 중심이 최소 74°C인지 확인한다. 기름 온도를 유지하도록 소량씩 튀긴다.",
          "เร่งน้ำมันให้ถึง 180°C แล้วทอดชุดเดิมซ้ำ 60–90 วินาทีจนสีทองเข้มกรอบ ใช้เทอร์โมมิเตอร์สะอาดวัดชิ้นที่หนาที่สุด ใจกลางต้องถึงอย่างน้อย 74°C ทอดทีละน้อยเพื่อรักษาความร้อน"
        )
      },
      {
        title: ml("Drain without softening", "瀝油保持酥脆", "衣を柔らかくせず油を切る", "눅눅해지지 않게 기름 빼기", "สะเด็ดโดยไม่ให้แฉะ"),
        body: ml(
          "Transfer the second-fried chicken to a clean wire rack for 2 minutes. Do not stack or seal it while steaming; verify another thick piece is at least 74°C and use clean tongs for the cooked food.",
          "復炸雞肉移到乾淨網架瀝油 2 分鐘。冒蒸氣時不要堆疊或密封；再確認一塊厚肉至少 74°C，熟食使用乾淨夾子。",
          "二度揚げした鶏肉を清潔な網に移し2分油を切ります。湯気があるうちに重ねたり密閉したりせず、別の厚い一個も74℃以上か確認し、加熱後は清潔なトングを使います。",
          "두 번 튀긴 닭을 깨끗한 철망에 옮겨 2분 기름을 뺀다. 김이 나는 동안 쌓거나 밀봉하지 말고 다른 두꺼운 조각도 74°C 이상인지 확인하며 익은 음식에는 깨끗한 집게를 쓴다.",
          "ย้ายไก่ทอดครั้งที่สองลงตะแกรงสะอาดให้สะเด็ด 2 นาที อย่าวางซ้อนหรือปิดภาชนะขณะยังมีไอ ตรวจชิ้นหนาอีกชิ้นให้ถึง 74°C และใช้คีมสะอาดกับอาหารสุก"
        )
      },
      {
        title: ml("Serve on cabbage", "鋪高麗菜葉上桌", "キャベツに盛る", "양배추에 담아 내기", "จัดเสิร์ฟบนกะหล่ำปลี"),
        body: ml(
          "Tear 60 g clean green cabbage leaves into large pieces, arrange the hot crisp karaage on them, and serve immediately. Keep the plate limited to fried chicken and cabbage leaves so the finished appearance matches the documented dish.",
          "將 60 公克乾淨綠高麗菜葉撕成大片，鋪上熱騰酥脆的炸雞立即上桌。盤中只放炸雞與高麗菜葉，保持成品外觀與照片一致。",
          "清潔な青キャベツの葉60gを大きくちぎり、熱くカリッとした唐揚げをのせてすぐに出します。皿には唐揚げとキャベツの葉だけを盛り、記録した料理の見た目に合わせます。",
          "깨끗한 초록 양배추 잎 60g을 크게 찢어 뜨겁고 바삭한 가라아게를 올려 즉시 낸다. 접시에는 튀긴 닭과 양배추 잎만 담아 사진의 완성 모습과 맞춘다.",
          "ฉีกใบกะหล่ำปลีเขียวสะอาด 60 กรัมเป็นชิ้นใหญ่ วางคาราอาเกะร้อนกรอบแล้วเสิร์ฟทันที จำกัดจานให้มีเฉพาะไก่ทอดกับใบกะหล่ำเพื่อให้ตรงกับภาพที่บันทึก"
        )
      }
    ],
    tips: [
      ml("Keep the chicken pieces similar in size so their centres finish together.", "雞塊大小要接近，中心才會同時熟透。", "鶏肉の大きさをそろえると中心まで同時に火が通ります。", "닭 조각 크기를 비슷하게 해야 속이 함께 익습니다.", "หั่นไก่ให้ขนาดใกล้กันเพื่อให้ใจกลางสุกพร้อมกัน"),
      ml("A wire rack keeps steam from softening the potato-starch crust.", "使用網架瀝油，蒸氣才不會讓馬鈴薯澱粉外皮回軟。", "網で油を切ると蒸気で片栗粉の衣が柔らかくなりません。", "철망에서 기름을 빼야 김 때문에 감자전분 옷이 눅눅해지지 않습니다.", "ใช้ตะแกรงสะเด็ดเพื่อไม่ให้ไอน้ำทำให้แป้งมันฝรั่งนิ่ม")
    ],
    commonMistakes: [
      ml("Overcrowding drops the oil temperature and makes the coating greasy.", "雞肉放太滿會使油溫下降，外皮吸油變膩。", "詰めすぎると油温が下がり、衣が油っぽくなります。", "너무 많이 넣으면 기름 온도가 떨어져 튀김옷이 기름집니다.", "ใส่ไก่แน่นเกินไปทำให้อุณหภูมิน้ำมันตกและแป้งอมน้ำมัน"),
      ml("Never taste or reuse marinade that touched raw chicken; discard it to prevent cross-contamination.", "接觸生雞肉的醃汁不可試吃或再利用，必須丟棄以避免交叉污染。", "生鶏肉に触れた漬け汁を味見したり再利用したりせず、交差汚染を防ぐため捨てます。", "생닭에 닿은 양념을 맛보거나 재사용하지 말고 교차 오염을 막기 위해 버립니다.", "ห้ามชิมหรือนำน้ำหมักที่โดนไก่ดิบกลับมาใช้ ต้องทิ้งเพื่อป้องกันการปนเปื้อนข้าม")
    ],
    substitutions: [
      ml("Use boneless, skinless thigh if skin-on thigh is unavailable; keep the 4 cm pieces and the 74°C centre check.", "沒有帶皮雞腿時可用去皮雞腿；維持 4 公分雞塊與中心 74°C 檢查。", "皮付きがなければ皮なしもも肉を使い、4cm角と中心74℃の確認は守ります。", "껍질 있는 다리살이 없으면 껍질 없는 다리살을 쓰되 4cm 조각과 중심 74°C 확인은 지킵니다.", "ถ้าไม่มีน่องติดหนัง ใช้น่องลอกหนังได้ โดยคงชิ้น 4 ซม. และตรวจใจกลาง 74°C"),
      ml("Replace potato starch with cornstarch at the same 80 g weight; the crust will be slightly less glassy.", "馬鈴薯澱粉可用 80 公克玉米粉替代，外皮會稍微不那麼晶脆。", "片栗粉は同量80gのコーンスターチに替えられますが、衣の透明感は少し弱くなります。", "감자전분은 같은 80g의 옥수수전분으로 바꿀 수 있지만 껍질의 유리 같은 바삭함은 줄어듭니다.", "เปลี่ยนแป้งมันฝรั่งเป็นแป้งข้าวโพด 80 กรัมเท่ากันได้ แต่เปลือกจะใสกรอบน้อยลงเล็กน้อย")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 3 days, and reheat on a rack at 200°C until the centre reaches 74°C. Do not freeze the cabbage leaves.", "2 小時內放涼，密封冷藏最多 3 天；放網架以 200°C 回烤至中心 74°C。高麗菜葉不要冷凍。", "2時間以内に冷まし、密閉冷蔵で3日以内に使います。網にのせて200℃で中心74℃まで温め直し、キャベツの葉は冷凍しません。", "2시간 안에 식혀 밀폐 냉장 3일 이내 사용한다. 철망에서 200°C로 중심 74°C까지 데우며 양배추 잎은 얼리지 않는다.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นภาชนะปิดสนิทได้ 3 วัน อุ่นบนตะแกรงที่ 200°C จนใจกลางถึง 74°C และไม่แช่แข็งใบกะหล่ำปลี"),
    cultureNote: ml("Karaage is a Japanese frying style in which seasoned meat is lightly coated and deep-fried; chicken became its most familiar home and izakaya form.", "唐揚是日本將調味肉類薄裹粉後油炸的技法，雞肉版本最常見於家庭與居酒屋。", "唐揚げは下味を付けた肉に薄く衣を付けて揚げる日本の調理法で、鶏肉の形が家庭や居酒屋で最も親しまれています。", "가라아게는 밑간한 고기에 얇게 옷을 입혀 튀기는 일본식 조리법이며 닭고기 형태가 가정과 이자카야에서 가장 익숙합니다.", "คาราอาเกะเป็นวิธีทอดแบบญี่ปุ่นที่คลุกเนื้อปรุงรสบาง ๆ แล้วทอด โดยแบบไก่เป็นรูปแบบที่คุ้นเคยในบ้านและอิซากายะ"),
    sources: [
      { title: "Kikkoman — Crispy Karaage Recipe (Japanese Fried Chicken)", url: "https://www.kikkoman.com/en/cookbook/washoku/karaage.html" },
      { title: "Just One Cookbook — Karaage (Japanese Fried Chicken)", url: "https://www.justonecookbook.com/karaage/" }
    ],
    imageAlt: ml("Crisp golden chicken karaage piled on a white plate with raw green cabbage leaves", "白盤上堆著金黃酥脆炸雞與生綠高麗菜葉的日式炸雞", "白い皿に盛ったカリッと黄金色の鶏の唐揚げと生の青キャベツの葉", "흰 접시에 담긴 바삭한 황금빛 가라아게와 생 양배추 잎", "ไก่คาราอาเกะสีทองกรอบกองบนจานขาวกับใบกะหล่ำปลีเขียวดิบ"),
    visualSpec: "Crisp golden boneless chicken karaage piled on a plain white plate with clean raw green cabbage leaves, torn into large pieces; no lemon, sauce, mayonnaise, sesame, or extra garnish visible."
  },
  {
    id: "tonkatsu",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 20,
    cookMinutes: 25,
    totalMinutes: 45,
    servings: 2,
    name: ml("Tonkatsu", "日式炸豬排", "とんかつ", "돈카츠", "ทงคัตสึ"),
    description: ml(
      "Thick pork loin is tenderized, breaded with airy panko, fried in batches, and served with crisp cabbage, mustard, and tangy tonkatsu sauce.",
      "厚切豬里肌拍鬆後裹上蓬鬆麵包粉，分批油炸，搭配爽脆高麗菜、芥末與酸香炸豬排醬。",
      "厚切りの豚ロースをたたいて柔らかくし、軽いパン粉を付けて分けて揚げ、キャベツ、からし、とんかつソースを添えます。",
      "두꺼운 돼지 등심을 두드려 부드럽게 하고 폭신한 빵가루를 입혀 나누어 튀긴 뒤 양배추, 겨자, 돈카츠 소스를 곁들입니다.",
      "หมูสันนอกชิ้นหนาทุบให้นุ่ม ชุบเกล็ดขนมปังเบา ๆ ทอดเป็นชุด แล้วเสิร์ฟกับกะหล่ำปลีกรอบ มัสตาร์ด และซอสทงคัตสึ"
    ),
    ingredients: [
      ingredient("300 g", ml("boneless pork loin, two 2 cm-thick chops", "去骨豬里肌，兩片厚 2 公分", "骨なし豚ロース（厚さ2cmを2枚）", "뼈 없는 돼지 등심, 2cm 두께 2장", "หมูสันนอกไร้กระดูก หนา 2 ซม. 2 ชิ้น")),
      ingredient("4 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด")),
      ingredient("1 g", ml("black pepper, finely ground", "黑胡椒粉", "黒こしょう（粉）", "후추, 곱게 간 것", "พริกไทยดำบดละเอียด")),
      ingredient("60 g", ml("all-purpose flour", "中筋麵粉", "薄力粉", "중력분", "แป้งอเนกประสงค์")),
      ingredient(ml("1 large / 50 g", "1 顆大蛋 / 50 公克", "大1個 / 50 g", "대란 1개 / 50 g", "ไข่ฟองใหญ่ 1 ฟอง / 50 กรัม"), ml("egg", "雞蛋", "卵", "달걀", "ไข่ไก่")),
      ingredient("15 ml", ml("cold water for the egg wash", "蛋液用冷水", "卵液用の冷水", "달걀물용 찬물", "น้ำเย็นสำหรับไข่ชุบ")),
      ingredient("100 g", ml("panko breadcrumbs", "日式麵包粉", "パン粉", "판코 빵가루", "เกล็ดขนมปังปันโกะ")),
      ingredient("1.5 L", ml("neutral oil for deep-frying", "油炸用中性油", "揚げ油", "튀김용 중성유", "น้ำมันรสกลางสำหรับทอด")),
      ingredient("250 g", ml("green cabbage, finely shredded", "綠高麗菜，切細絲", "キャベツ（細切り）", "양배추, 곱게 채 썬 것", "กะหล่ำปลีเขียวซอยละเอียด")),
      ingredient("15 g", ml("Japanese yellow mustard", "日式黃芥末", "練りからし", "일본식 연겨자", "มัสตาร์ดญี่ปุ่น")),
      ingredient("15 ml", ml("soy sauce for the homemade tonkatsu sauce", "自製炸豬排醬用醬油", "手作りソース用しょうゆ", "홈메이드 소스용 간장", "ซีอิ๊วสำหรับซอสทำเอง")),
      ingredient("60 g", ml("tomato ketchup for the homemade tonkatsu sauce", "自製炸豬排醬用番茄醬", "手作りソース用ケチャップ", "홈메이드 소스용 케첩", "ซอสมะเขือเทศสำหรับซอสทำเอง")),
      ingredient("40 ml", ml("Worcestershire-style sauce", "伍斯特醬", "ウスターソース", "우스터소스", "ซอสวูสเตอร์")),
      ingredient("20 g", ml("granulated sugar for the homemade tonkatsu sauce", "自製炸豬排醬用砂糖", "手作りソース用砂糖", "홈메이드 소스용 설탕", "น้ำตาลทรายสำหรับซอสทำเอง"))
    ],
    instructions: [
      {
        title: ml("Simmer the tonkatsu sauce", "煮炸豬排醬", "とんかつソースを煮る", "돈카츠 소스 끓이기", "เคี่ยวซอสทงคัตสึ"),
        body: ml(
          "For the homemade sauce, combine 15 ml soy sauce, 60 g ketchup, 40 ml Worcestershire-style sauce, and 20 g sugar in a small pan. Heat over medium, stirring, until small bubbles appear; turn off the heat and cool. Keep the sauce separate from raw pork.",
          "自製醬汁將 15 毫升醬油、60 公克番茄醬、40 毫升伍斯特醬與 20 公克砂糖放入小鍋，中火攪拌加熱至冒細泡，關火放涼；醬汁與生豬肉分開。",
          "手作りソースは、しょうゆ15ml、ケチャップ60g、ウスターソース40ml、砂糖20gを小鍋に入れ、中火で小さな泡が出るまで混ぜます。火を止めて冷まし、生肉とは分けておきます。",
          "홈메이드 소스는 작은 냄비에 간장 15ml, 케첩 60g, 우스터소스 40ml, 설탕 20g을 넣고 중불에서 작은 기포가 생길 때까지 저어 끓인다. 불을 끄고 식혀 생돼지고기와 분리한다.",
          "ทำซอสเองโดยใส่ซีอิ๊ว 15 มล. ซอสมะเขือเทศ 60 กรัม ซอสวูสเตอร์ 40 มล. และน้ำตาล 20 กรัมในหม้อเล็ก อุ่นไฟกลางคนจนมีฟองเล็ก ๆ ปิดไฟพักให้เย็น และแยกจากหมูดิบ"
        )
      },
      {
        title: ml("Prepare cabbage and pork", "準備高麗菜與豬肉", "キャベツと豚肉を準備する", "양배추와 돼지고기 준비", "เตรียมกะหล่ำและหมู"),
        body: ml(
          "Soak 250 g shredded cabbage in cold water for 5 minutes, then drain and chill. Trim excess fat from the two 2 cm pork chops, make several shallow cuts through the connective tissue, and pat the meat dry on a clean board.",
          "將 250 公克高麗菜絲泡冷水 5 分鐘後瀝乾冷藏。兩片厚 2 公分豬排修去多餘脂肪，在筋膜切數刀防止捲縮，放在乾淨砧板擦乾。",
          "細切りキャベツ250gを冷水に5分浸け、よく水を切って冷やします。厚さ2cmの豚肉2枚は余分な脂を取り、筋に浅く数本切り込みを入れて反りを防ぎ、清潔なまな板で水気を拭きます。",
          "채 썬 양배추 250g을 찬물에 5분 담갔다가 물기를 빼 냉장한다. 2cm 돼지 등심 두 장의 여분 지방을 정리하고 결합조직에 얕게 칼집을 내 말림을 막은 뒤 깨끗한 도마에서 물기를 닦는다.",
          "แช่กะหล่ำปลีซอย 250 กรัมในน้ำเย็น 5 นาที สะเด็ดแล้วแช่เย็น ตัดไขมันส่วนเกินจากหมูหนา 2 ซม. สองชิ้น กรีดเอ็นตื้น ๆ หลายรอยเพื่อไม่ให้หดงอ แล้วซับให้แห้งบนเขียงสะอาด"
        )
      },
      {
        title: ml("Tenderize and season", "拍鬆調味", "たたいて下味を付ける", "두드려 밑간하기", "ทุบและปรุงรส"),
        body: ml(
          "Pound both sides of each pork chop evenly with a mallet, reshape to about 2 cm thickness, and season both sides with 4 g salt and 1 g black pepper. Wash and sanitize the board and mallet before handling the breading ingredients.",
          "用肉槌均勻拍鬆每片豬排兩面，整形成約 2 公分厚，兩面撒上 4 公克鹽與 1 公克黑胡椒。接觸裹粉食材前清洗並消毒砧板與肉槌。",
          "肉たたきで各豚肉の両面を均一にたたき、厚さ2cmほどに形を戻します。両面に塩4gと黒こしょう1gを振り、衣の材料に触れる前にまな板と肉たたきを洗浄・消毒します。",
          "고기망치로 돼지 등심 양면을 고르게 두드린 뒤 약 2cm 두께로 모양을 되돌리고 양면에 소금 4g과 후추 1g을 뿌린다. 빵가루 재료를 다루기 전에 도마와 망치를 세척·소독한다.",
          "ทุบหมูทั้งสองด้านให้เท่ากันด้วยค้อน แล้วจัดทรงให้หนาประมาณ 2 ซม. โรยเกลือ 4 กรัมและพริกไทย 1 กรัมทั้งสองด้าน ล้างและฆ่าเชื้อเขียงกับค้อนก่อนจับส่วนผสมชุบทอด"
        )
      },
      {
        title: ml("Set up three breading dishes", "準備三盤裹粉", "三つの衣皿を整える", "세 가지 튀김옷 접시 준비", "เตรียมจานชุบสามอย่าง"),
        body: ml(
          "Set out 60 g flour, one egg beaten with 15 ml cold water, and 100 g panko in three separate shallow dishes. Dredge each seasoned chop in flour, then egg wash, then press panko over every surface and edge.",
          "三個淺盤分別放 60 公克麵粉、1 顆雞蛋加 15 毫升冷水打勻的蛋液，以及 100 公克麵包粉。每片調味豬排依序裹麵粉、蛋液，再按壓麵包粉覆蓋表面與邊緣。",
          "浅い皿3枚に薄力粉60g、卵1個を冷水15mlで溶いた液、パン粉100gを別々に用意します。豚肉を粉、卵液、パン粉の順にくぐらせ、表面と側面を軽く押して覆います。",
          "얕은 접시 세 개에 중력분 60g, 달걀 1개와 찬물 15ml를 푼 달걀물, 판코 100g을 각각 담는다. 밑간한 고기를 밀가루, 달걀물, 판코 순서로 묻히고 표면과 가장자리를 눌러 덮는다.",
          "เตรียมจานตื้นสามใบใส่แป้ง 60 กรัม ไข่ 1 ฟองตีรวมกับน้ำเย็น 15 มล. และเกล็ดขนมปัง 100 กรัมแยกกัน คลุกหมูปรุงรสกับแป้ง ไข่ และเกล็ดตามลำดับ กดให้เคลือบทุกด้านและขอบ"
        )
      },
      {
        title: ml("Rest and heat the oil", "靜置並加熱油", "休ませて油を熱する", "휴지하고 기름 데우기", "พักและอุ่นน้ำมัน"),
        body: ml(
          "Place the breaded chops on a clean rack and rest for 10 minutes so the panko adheres. Heat 1.5 L neutral oil in a deep pot to 170°C; keep raw pork tools separate from the clean frying rack and tongs.",
          "裹好的豬排放在乾淨網架靜置 10 分鐘，使麵包粉黏牢。深鍋將 1.5 公升中性油加熱至 170°C；生豬肉用具與乾淨炸物網架、夾子分開。",
          "衣を付けた豚肉を清潔な網で10分休ませ、パン粉を密着させます。深鍋の中性油1.5Lを170℃に熱し、生肉用の道具と清潔な揚げ網・トングを分けます。",
          "빵가루를 입힌 등심을 깨끗한 철망에서 10분 쉬워 판코를 붙인다. 깊은 냄비의 중성유 1.5L를 170°C로 달구고 생돼지고기 도구와 깨끗한 튀김망·집게를 분리한다.",
          "วางหมูชุบแป้งบนตะแกรงสะอาดพัก 10 นาทีให้เกล็ดติดแน่น ตั้งน้ำมันรสกลาง 1.5 ลิตรในหม้อลึกให้ถึง 170°C แยกอุปกรณ์หมูดิบจากตะแกรงและคีมสะอาดสำหรับของทอด"
        )
      },
      {
        title: ml("Fry in small batches", "分批油炸", "少量ずつ揚げる", "소량씩 튀기기", "ทอดเป็นชุดเล็ก"),
        body: ml(
          "Fry one chop at a time, or two only if the pot is wide enough, at 170°C for 3 minutes on the first side and 2 minutes after flipping. Keep the oil near 170°C and do not disturb the crust during the first minute.",
          "以 170°C 每次炸一片豬排；鍋夠寬才可同時炸兩片。第一面 3 分鐘、翻面後 2 分鐘，讓油溫維持接近 170°C，前 1 分鐘不要碰動外皮。",
          "170℃で1枚ずつ揚げます。鍋が十分広ければ2枚までにし、最初の面を3分、返して2分揚げます。油温を170℃付近に保ち、最初の1分は衣に触れません。",
          "170°C에서 한 번에 한 장씩 튀긴다. 냄비가 충분히 넓을 때만 두 장을 함께 넣고 첫 면 3분, 뒤집어 2분 튀긴다. 기름을 170°C 부근으로 유지하고 첫 1분은 튀김옷을 건드리지 않는다.",
          "ทอดหมูทีละชิ้นที่ 170°C หรือสองชิ้นเฉพาะเมื่อหม้อกว้างพอ ทอดด้านแรก 3 นาทีแล้วกลับทอดอีก 2 นาที รักษาน้ำมันใกล้ 170°C และอย่าแตะเปลือกในนาทีแรก"
        )
      },
      {
        title: ml("Drain and verify 68°C", "瀝油並確認 68°C", "油を切って68℃を確認する", "기름 빼고 68°C 확인", "สะเด็ดและตรวจ 68°C"),
        body: ml(
          "Lift each cutlet to a clean wire rack and drain for 3 minutes without stacking. Check the thickest centre with a clean thermometer; continue cooking if it is below 68°C, then rest 3 minutes before slicing.",
          "每片豬排撈到乾淨網架瀝油 3 分鐘，不要堆疊。用乾淨溫度計測最厚中心，低於 68°C 就繼續加熱；達標後再靜置 3 分鐘才切片。",
          "各カツを清潔な網に上げ、重ねず3分油を切ります。清潔な温度計で最も厚い中心を測り、68℃未満なら加熱を続け、達したら3分休ませてから切ります。",
          "돈카츠를 깨끗한 철망에 올려 겹치지 않게 3분 기름을 뺀다. 깨끗한 온도계로 가장 두꺼운 중심을 확인해 68°C 미만이면 더 익히고, 도달하면 3분 쉰 뒤 썬다.",
          "ตักหมูทอดขึ้นตะแกรงสะอาดให้สะเด็ด 3 นาทีโดยไม่วางซ้อน ตรวจใจกลางส่วนหนาที่สุดด้วยเทอร์โมมิเตอร์สะอาด หากต่ำกว่า 68°C ให้ปรุงต่อ แล้วพัก 3 นาทีก่อนหั่น"
        )
      },
      {
        title: ml("Slice and serve", "切片上桌", "切り分けて盛る", "썰어 담아 내기", "หั่นและเสิร์ฟ"),
        body: ml(
          "Slice the rested tonkatsu into bite-size pieces with a clean knife. Serve with 250 g chilled shredded cabbage, 15 g yellow mustard, and the cooled tonkatsu sauce; keep the crunchy cutlet on the rack or plate rather than in a closed container.",
          "用乾淨刀具將靜置好的炸豬排切成一口大小，搭配 250 公克冰涼高麗菜絲、15 公克黃芥末與放涼的炸豬排醬；酥皮保持放在網架或盤上，不要密封悶住。",
          "休ませたとんかつを清潔な包丁で一口大に切ります。冷やした細切りキャベツ250g、からし15g、冷ましたソースを添え、衣が蒸れないよう網または皿に盛り、密閉しません。",
          "쉰 돈카츠를 깨끗한 칼로 한입 크기로 썬다. 차갑게 둔 채 썬 양배추 250g, 연겨자 15g, 식힌 돈카츠 소스를 곁들이고 바삭함을 위해 철망이나 접시에 담아 밀폐하지 않는다.",
          "หั่นทงคัตสึที่พักแล้วเป็นชิ้นพอดีคำด้วยมีดสะอาด เสิร์ฟกับกะหล่ำปลีซอยเย็น 250 กรัม มัสตาร์ด 15 กรัม และซอสทงคัตสึที่เย็นแล้ว วางบนตะแกรงหรือจานไม่ปิดฝาเพื่อคงความกรอบ"
        )
      }
    ],
    tips: [
      ml("Make shallow cuts through the connective tissue so the chop stays flat while frying.", "在筋膜切淺刀口，豬排油炸時才不會捲曲。", "筋に浅い切り込みを入れると、揚げている間に肉が反りません。", "결합조직에 얕게 칼집을 내면 튀길 때 고기가 말리지 않습니다.", "กรีดเอ็นตื้น ๆ เพื่อให้หมูไม่งอระหว่างทอด"),
      ml("Use a wire rack rather than paper towels so steam does not soften the panko.", "用網架取代紙巾瀝油，蒸氣才不會讓麵包粉回軟。", "ペーパーではなく網で油を切ると、蒸気でパン粉が柔らかくなりません。", "키친타월 대신 철망을 써야 김으로 판코가 눅눅해지지 않습니다.", "ใช้ตะแกรงแทนกระดาษซับเพื่อไม่ให้ไอน้ำทำให้เกล็ดขนมปังนิ่ม")
    ],
    commonMistakes: [
      ml("Crowding the pot lowers 170°C oil and creates a greasy, pale crust; fry in batches.", "鍋中太擠會使 170°C 油溫下降，外皮油膩不上色；請分批炸。", "鍋に詰めすぎると170℃の油温が下がり、衣が白く油っぽくなるので分けて揚げます。", "냄비를 빽빽하게 채우면 170°C 기름이 식어 눅눅하고 창백해지므로 나누어 튀깁니다.", "ใส่หมูแน่นหม้อทำให้น้ำมัน 170°C เย็นลง เปลือกซีดและอมน้ำมัน ต้องทอดเป็นชุด"),
      ml("Never put cooked cutlets back on the raw-pork tray or use the raw-pork knife for slicing.", "熟豬排不可放回生肉托盤，切片也不可使用生肉刀具。", "揚げたカツを生肉のトレーに戻さず、切り分けに生肉用の包丁を使いません。", "익은 돈카츠를 생고기 트레이에 되돌리거나 생고기 칼로 썰지 않습니다.", "อย่าวางหมูสุกกลับถาดหมูดิบหรือใช้มีดหมูดิบหั่น")
    ],
    substitutions: [
      ml("Use pork tenderloin cut to 2 cm thickness for a leaner tonkatsu; still verify 68°C at the centre.", "可用切成 2 公分厚的豬里肌菲力，口感較瘦；中心仍須確認 68°C。", "脂の少ない豚ヒレを2cm厚に切って使えますが、中心68℃を確認します。", "더 담백하게 하려면 돼지 안심을 2cm로 잘라 쓰되 중심 68°C를 확인합니다.", "ใช้สันในหมูหั่นหนา 2 ซม. เพื่อความมันน้อยลง แต่ยังต้องตรวจใจกลาง 68°C"),
      ml("Use a gluten-free flour and gluten-free panko if needed, checking labels for cross-contact.", "需要無麩質時可用無麩質麵粉與麵包粉，並確認標示避免交叉接觸。", "必要ならグルテンフリーの粉とパン粉を使い、表示で交差接触がないか確認します。", "필요하면 글루텐 프리 밀가루와 판코를 쓰고 교차 접촉 표시를 확인합니다.", "หากต้องการปลอดกลูเตน ใช้แป้งและเกล็ดขนมปังปลอดกลูเตน พร้อมตรวจฉลากการปนเปื้อนข้าม")
    ],
    storage: ml("Cool cutlets within 2 hours, refrigerate airtight for up to 3 days, and reheat on a rack at 200°C until the centre reaches 68°C. Keep cabbage and sauce separate.", "炸豬排 2 小時內放涼，密封冷藏最多 3 天；放網架以 200°C 回熱至中心 68°C。高麗菜與醬汁分開保存。", "カツは2時間以内に冷まし、密閉冷蔵で3日以内に使います。網で200℃、中心68℃まで温め直し、キャベツとソースは分けて保存します。", "돈카츠를 2시간 안에 식혀 밀폐 냉장 3일 이내 사용한다. 철망에서 200°C로 중심 68°C까지 데우고 양배추와 소스는 따로 보관한다.", "ทำหมูทอดให้เย็นภายใน 2 ชั่วโมง แช่เย็นภาชนะปิดสนิทได้ 3 วัน อุ่นบนตะแกรงที่ 200°C จนใจกลางถึง 68°C และเก็บกะหล่ำกับซอสแยกกัน"),
    cultureNote: ml("Tonkatsu is a Japanese yōshoku comfort food: a panko-coated pork cutlet commonly served with finely shredded cabbage and a thick sweet-tangy sauce.", "炸豬排是日本洋食家常料理，以麵包粉裹豬排，常搭配細切高麗菜與濃稠酸甜醬。", "とんかつは日本の洋食系の家庭料理で、パン粉を付けた豚カツに細切りキャベツと甘酸っぱい濃いソースを添えるのが定番です。", "돈카츠는 일본식 양식 가정요리로, 판코를 입힌 돼지 커틀릿에 곱게 채 썬 양배추와 달콤새콤한 진한 소스를 곁들이는 것이 일반적입니다.", "ทงคัตสึเป็นอาหารโยโชกุแบบญี่ปุ่น หมูชุบปันโกะทอดเสิร์ฟคู่กะหล่ำปลีซอยละเอียดและซอสข้นรสหวานเปรี้ยว"),
    sources: [
      { title: "Kikkoman — Tonkatsu (Japanese Pork Cutlet)", url: "https://www.kikkoman.com/en/cookbook/washoku/tonkatsu.html" },
      { title: "Just One Cookbook — Crispy Tonkatsu (Japanese Pork Cutlet)", url: "https://www.justonecookbook.com/tonkatsu/" }
    ],
    imageAlt: ml("Sliced golden tonkatsu with shredded cabbage and yellow mustard on a white plate", "白盤上切片金黃炸豬排搭配高麗菜絲與黃芥末", "白い皿に盛った、千切りキャベツとからし添えの黄金色のとんかつ", "흰 접시에 담긴 채 썬 양배추와 연겨자를 곁들인 황금빛 돈카츠", "ทงคัตสึสีทองหั่นชิ้นบนจานขาว เสิร์ฟกับกะหล่ำปลีซอยและมัสตาร์ดเหลือง"),
    visualSpec: "Sliced golden panko tonkatsu on a plain white plate with a mound of shredded cabbage and a small yellow mustard portion; no rice, soup, pickles, or extra garnish visible."
  },
  {
    id: "tempura",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 30,
    cookMinutes: 20,
    totalMinutes: 50,
    servings: 2,
    name: ml("Shrimp and vegetable tempura", "蝦與蔬菜天婦羅", "えびと野菜の天ぷら", "새우·채소 텐푸라", "เทมปุระกุ้งและผัก"),
    description: ml(
      "Two tail-on shrimp and a short list of vegetables are dipped in icy, lumpy batter and fried in small batches for a light crust.",
      "兩尾留尾蝦與紫皮地瓜、青椒和櫛瓜裹上冰冷薄麵糊，分批油炸成輕盈酥衣。",
      "尾付きのえび2尾と紫皮さつまいも、青ピーマン、ズッキーニを冷たい衣にくぐらせ、少量ずつ揚げて軽い食感にします。",
      "꼬리를 남긴 새우 두 마리와 자색 껍질 고구마, 풋고추, 주키니를 차가운 반죽에 묻혀 소량씩 튀겨 가볍게 완성합니다.",
      "ชุบกุ้งติดหางสองตัว มันเทศผิวม่วง พริกเขียว และซูกินีด้วยแป้งเย็นเป็นก้อนเล็กน้อย แล้วทอดทีละชุดให้กรอบเบา"
    ),
    ingredients: [
      ingredient(ml("2 large / 120 g", "2 尾大蝦 / 120 公克", "大2尾 / 120 g", "큰 새우 2마리 / 120 g", "กุ้งตัวใหญ่ 2 ตัว / 120 กรัม"), ml("raw shrimp, peeled and deveined with tails on", "生蝦，去殼去腸泥但留尾", "生えび（殻と背わたを取り、尾を残す）", "생새우, 껍질·내장 제거하고 꼬리 남김", "กุ้งดิบปอกเปลือกเอาเส้นดำออกแต่เหลือหาง")),
      ingredient("120 g", ml("purple-skinned sweet potato, cut into 5 mm slices", "紫皮地瓜，切 5 毫米片", "紫皮さつまいも（5mm厚）", "자색 껍질 고구마, 5mm 슬라이스", "มันเทศผิวม่วงหั่นแผ่นหนา 5 มม.")),
      ingredient("100 g", ml("green pepper, cut into 4 cm pieces", "青椒，切 4 公分塊", "青ピーマン（4cmに切る）", "풋고추, 4cm 조각", "พริกเขียวหั่นชิ้น 4 ซม.")),
      ingredient("100 g", ml("zucchini, cut into 1 cm rounds", "櫛瓜，切 1 公分圓片", "ズッキーニ（1cm厚の輪切り）", "주키니, 1cm 원형", "ซูกินีหั่นแว่นหนา 1 ซม.")),
      ingredient("120 g", ml("all-purpose flour, divided: 20 g for dusting and 100 g for batter", "中筋麵粉，分成 20 公克薄裹食材與 100 公克調麵糊", "薄力粉（20gは具材用、100gは衣用に分ける）", "중력분, 재료 묻힘용 20g과 반죽용 100g으로 나눔", "แป้งอเนกประสงค์ แบ่ง 20 กรัมสำหรับคลุกวัตถุดิบและ 100 กรัมสำหรับแป้งชุบ")),
      ingredient("20 g", ml("potato starch for batter", "麵糊用馬鈴薯澱粉", "衣用片栗粉", "튀김옷용 감자전분", "แป้งมันฝรั่งสำหรับแป้งชุบ")),
      ingredient("4 g", ml("baking powder", "泡打粉", "ベーキングパウダー", "베이킹파우더", "ผงฟู")),
      ingredient(ml("1 large / 50 g", "1 顆大蛋 / 50 公克", "大1個 / 50 g", "대란 1개 / 50 g", "ไข่ฟองใหญ่ 1 ฟอง / 50 กรัม"), ml("egg", "雞蛋", "卵", "달걀", "ไข่ไก่")),
      ingredient("200 ml", ml("ice-cold water", "冰水", "氷水", "얼음물", "น้ำเย็นจัด")),
      ingredient("1.5 L", ml("neutral oil for deep-frying", "油炸用中性油", "揚げ油", "튀김용 중성유", "น้ำมันรสกลางสำหรับทอด")),
      ingredient("200 ml", ml("dashi for tentsuyu", "天つゆ用日式高湯", "天つゆ用だし", "덴쓰유용 다시", "ดาชิสำหรับเท็นสึยุ")),
      ingredient("45 ml", ml("soy sauce for tentsuyu", "天つゆ用醬油", "天つゆ用しょうゆ", "덴쓰유용 간장", "ซีอิ๊วสำหรับเท็นสึยุ")),
      ingredient("60 ml", ml("mirin for tentsuyu", "天つゆ用味醂", "天つゆ用みりん", "덴쓰유용 미림", "มิรินสำหรับเท็นสึยุ")),
      ingredient("100 g", ml("daikon radish, grated for serving", "上桌用白蘿蔔泥", "盛り付け用大根おろし", "곁들임용 무 간 것", "หัวไชเท้าขูดสำหรับเสิร์ฟ")),
      ingredient("15 g", ml("fresh ginger, grated for serving", "上桌用新鮮薑泥", "盛り付け用しょうがおろし", "곁들임용 생강 간 것", "ขิงสดขูดสำหรับเสิร์ฟ"))
    ],
    instructions: [
      {
        title: ml("Cut the listed ingredients", "切指定食材", "具材を切りそろえる", "지정 재료 썰기", "หั่นวัตถุดิบที่ระบุ"),
        body: ml(
          "Peel and devein two large shrimp but leave the tails on; make shallow cuts along the underside so they stay straight. Cut the purple-skinned sweet potato into 5 mm slices, the green pepper into 4 cm pieces, and the zucchini into 1 cm rounds. Pat everything dry.",
          "兩尾大蝦去殼去腸泥但留尾，腹側劃淺刀讓蝦身保持直；紫皮地瓜切 5 毫米片、青椒切 4 公分塊、櫛瓜切 1 公分圓片，全部擦乾。",
          "大きなえび2尾は殻と背わたを取り、尾を残します。腹側に浅く切り込みを入れて真っすぐにし、紫皮さつまいもは5mm、青ピーマンは4cm、ズッキーニは1cmの輪切りにして全て水気を拭きます。",
          "큰 새우 두 마리는 껍질과 내장을 제거하되 꼬리는 남기고 배 쪽에 얕게 칼집을 내 곧게 편다. 자색 고구마는 5mm, 풋고추는 4cm, 주키니는 1cm 원형으로 썰어 모두 물기를 닦는다.",
          "ปอกเปลือกและเอาเส้นดำจากกุ้งใหญ่สองตัวแต่เหลือหาง กรีดท้องตื้น ๆ ให้ตัวตรง หั่นมันเทศผิวม่วงหนา 5 มม. พริกเขียวชิ้น 4 ซม. และซูกินีแว่น 1 ซม. ซับทุกอย่างให้แห้ง"
        )
      },
      {
        title: ml("Make the tentsuyu", "製作天つゆ", "天つゆを作る", "덴쓰유 만들기", "ทำน้ำจิ้มเท็นสึยุ"),
        body: ml(
          "Combine 200 ml dashi, 45 ml soy sauce, and 60 ml mirin in a small saucepan. Bring just to a boil, turn off the heat, and keep it covered and separate from the raw shrimp station until serving.",
          "小鍋混合 200 毫升高湯、45 毫升醬油與 60 毫升味醂，剛煮沸就關火，加蓋保溫；上桌前與生蝦處理區分開。",
          "小鍋にだし200ml、しょうゆ45ml、みりん60mlを合わせ、沸騰直前まで温めて火を止めます。ふたをして保温し、生えびの作業場所とは分けておきます。",
          "작은 냄비에 다시 200ml, 간장 45ml, 미림 60ml를 넣고 막 끓기 시작하면 불을 끈다. 덮어 보온하되 생새우 작업대와 분리해 둔다.",
          "ผสมดาชิ 200 มล. ซีอิ๊ว 45 มล. และมิริน 60 มล.ในหม้อเล็ก อุ่นจนเริ่มเดือดแล้วปิดไฟ ปิดฝาให้อุ่นและแยกจากพื้นที่เตรียมกุ้งดิบจนกว่าจะเสิร์ฟ"
        )
      },
      {
        title: ml("Prepare the grated garnish", "準備蘿蔔薑泥", "薬味をおろす", "무와 생강 갈기", "ขูดเครื่องเคียง"),
        body: ml(
          "Grate 100 g daikon and 15 g ginger for serving. Press only enough liquid from the daikon to keep it spoonable, and place both in clean dishes. Wash the grater before it touches any cooked food.",
          "將 100 公克白蘿蔔與 15 公克薑磨泥上桌。白蘿蔔只擠出足以成匙狀的水分，分放乾淨小碟；磨泥器接觸熟食前要清洗。",
          "大根100gとしょうが15gをすりおろして薬味にします。大根はスプーンですくえる程度だけ水分を絞り、清潔な器に分けます。おろし器は加熱済みの食品に使う前に洗います。",
          "무 100g과 생강 15g을 갈아 곁들임으로 준비한다. 무는 숟가락으로 뜰 정도만 물기를 짜 깨끗한 그릇에 나누고, 강판은 익힌 음식에 쓰기 전에 씻는다.",
          "ขูดหัวไชเท้า 100 กรัมและขิง 15 กรัมสำหรับเสิร์ฟ บีบน้ำจากหัวไชเท้าเพียงเล็กน้อยให้ตักได้ แบ่งใส่ถ้วยสะอาด และล้างที่ขูดก่อนใช้กับอาหารสุก"
        )
      },
      {
        title: ml("Mix the cold batter", "調製冰冷麵糊", "冷たい衣を作る", "차가운 튀김옷 만들기", "ผสมแป้งชุบเย็น"),
        body: ml(
          "Whisk one 50 g egg with 200 ml ice-cold water. Reserve 20 g of the flour for dusting; separately combine the remaining 100 g flour with 20 g potato starch and 4 g baking powder, add it to the liquid, and stir with chopsticks for only 15–20 seconds, leaving small lumps and keeping the batter cold.",
          "將 1 顆 50 公克雞蛋與 200 毫升冰水輕拌。預留 20 公克麵粉薄裹食材；其餘 100 公克麵粉與 20 公克馬鈴薯澱粉、4 公克泡打粉混合，倒入液體後用筷子只拌 15–20 秒，保留小粉粒並保持冰冷。",
          "卵50gを氷水200mlに軽く溶きます。薄力粉20gは具材用に取り分け、残りの薄力粉100gを片栗粉20g、ベーキングパウダー4gと混ぜます。液体に加えて箸で15〜20秒だけ混ぜ、少しダマを残して冷たく保ちます。",
          "달걀 50g을 얼음물 200ml에 가볍게 푼다. 중력분 20g은 재료 묻힘용으로 덜어 두고 남은 중력분 100g을 감자전분 20g, 베이킹파우더 4g과 섞어 액체에 넣는다. 젓가락으로 15–20초만 섞어 작은 덩어리를 남기고 차갑게 유지한다.",
          "คนไข่ 50 กรัมกับน้ำเย็นจัด 200 มล. เบา ๆ แบ่งแป้ง 20 กรัมไว้คลุกวัตถุดิบ ผสมแป้งที่เหลือ 100 กรัมกับแป้งมันฝรั่ง 20 กรัมและผงฟู 4 กรัม เทลงของเหลวแล้วคนด้วยตะเกียบเพียง 15–20 วินาที ให้มีเม็ดแป้งเล็ก ๆ และรักษาความเย็น"
        )
      },
      {
        title: ml("Heat oil to 170°C", "油溫加熱至 170°C", "油を170℃に熱する", "기름을 170°C로 데우기", "อุ่นน้ำมันถึง 170°C"),
        body: ml(
          "Heat 1.5 L neutral oil in a deep pot to 170°C. Test with a drop of batter: it should sink briefly and rise. Keep a clean spider and wire rack ready, and keep raw seafood tools away from cooked tempura.",
          "深鍋將 1.5 公升中性油加熱至 170°C。滴入少量麵糊測試，應短暫下沉後浮起；備妥乾淨漏勺與網架，生海鮮用具不可接觸熟天婦羅。",
          "深鍋の中性油1.5Lを170℃に熱します。衣を一滴落とし、少し沈んですぐ浮けば適温です。清潔な網じゃくしと網を用意し、生の魚介用具を揚げ上がりに使いません。",
          "깊은 냄비의 중성유 1.5L를 170°C로 달군다. 반죽 한 방울을 떨어뜨려 잠깐 가라앉았다가 떠오르면 적정 온도다. 깨끗한 건지개와 철망을 준비하고 생해산물 도구는 익은 튀김에 쓰지 않는다.",
          "ตั้งน้ำมันรสกลาง 1.5 ลิตรในหม้อลึกให้ถึง 170°C ทดสอบด้วยแป้งหยดหนึ่ง ควรจมชั่วครู่แล้วลอย เตรียมกระชอนและตะแกรงสะอาด และแยกอุปกรณ์อาหารทะเลดิบจากเทมปุระสุก"
        )
      },
      {
        title: ml("Dust and dip", "薄裹粉再沾麵糊", "粉をまぶして衣を付ける", "가루 묻히고 반죽 입히기", "คลุกแป้งแล้วชุบ"),
        body: ml(
          "Use the reserved 20 g flour to dust the dry shrimp and vegetables lightly, shaking off excess. Dip each piece in the cold batter immediately before frying; keep the shrimp and vegetables on separate clean trays until they enter the oil.",
          "用預留的 20 公克麵粉將蝦與蔬菜薄薄裹粉並抖掉多餘粉末，入鍋前才逐件沾冰麵糊；蝦與蔬菜分放乾淨托盤，直到下油鍋。",
          "取り分けた薄力粉20gをえびと野菜に薄くまぶして余分を落とします。揚げる直前に一つずつ冷たい衣を付け、生えびと野菜は別の清潔なトレーに置いて油に入れます。",
          "따로 덜어 둔 중력분 20g을 새우와 채소에 얇게 묻혀 여분을 턴다. 튀기기 직전에 하나씩 차가운 반죽에 담그고, 새우와 채소는 기름에 넣기 전까지 깨끗한 트레이를 따로 쓴다.",
          "ใช้แป้งที่แบ่งไว้ 20 กรัมคลุกกุ้งและผักบาง ๆ สะบัดส่วนเกิน ชุบแป้งเย็นทีละชิ้นทันทีที่กำลังจะทอด วางกุ้งกับผักบนถาดสะอาดแยกกันจนกว่าจะลงน้ำมัน"
        )
      },
      {
        title: ml("Fry and drain in batches", "分批油炸瀝油", "分けて揚げ油を切る", "나누어 튀기고 기름 빼기", "ทอดและสะเด็ดเป็นชุด"),
        body: ml(
          "Fry only a few pieces at a time at 170°C: the two shrimp for 2–3 minutes and the vegetables for 1–2 minutes, turning once. The shrimp flesh must be opaque and firm with the thickest centre at least 63°C; the vegetables should be pale golden and tender. Lift each batch to the wire rack immediately; keep the oil at 165–175°C and never overcrowd the pot.",
          "170°C 每次只炸少量：兩尾蝦炸 2–3 分鐘，蔬菜炸 1–2 分鐘，中途翻一次。蝦肉須呈不透明且緊實，最厚中心至少 63°C；蔬菜呈淡金色並熟透。每批立即撈到網架；油溫維持 165–175°C，鍋中不可擁擠。",
          "170℃で少量ずつ揚げます。えび2尾は2〜3分、野菜は1〜2分、途中で一度返します。えびの身が不透明で締まり、最も厚い中心が63℃以上になり、野菜が薄いきつね色で柔らかくなればよい。各回をすぐ網に上げ、油は165〜175℃、鍋を詰めません。",
          "170°C에서 몇 조각씩만 튀긴다. 새우 두 마리는 2–3분, 채소는 1–2분 한 번 뒤집는다. 새우 살은 불투명하고 단단해야 하며 가장 두꺼운 중심은 최소 63°C, 채소는 연한 황금색으로 익어야 한다. 각 배치를 즉시 철망에 올리고 기름은 165–175°C로 유지하며 냄비를 채우지 않는다.",
          "ทอดทีละไม่กี่ชิ้นที่ 170°C กุ้งสองตัว 2–3 นาที ผัก 1–2 นาที กลับหนึ่งครั้ง เนื้อกุ้งต้องทึบและแน่น ใจกลางส่วนหนาสุดอย่างน้อย 63°C ส่วนผักเป็นสีทองอ่อนและนุ่มสุก ตักแต่ละชุดขึ้นตะแกรงทันที รักษาน้ำมัน 165–175°C และอย่าใส่แน่นหม้อ"
        )
      },
      {
        title: ml("Serve with tentsuyu", "搭配天つゆ上桌", "天つゆで供する", "덴쓰유와 내기", "เสิร์ฟกับเท็นสึยุ"),
        body: ml(
          "Arrange the drained shrimp and vegetables on a clean plate. Serve the warm tentsuyu with 100 g grated daikon and 15 g grated ginger on the side; use clean serving chopsticks and keep the crisp batter uncovered.",
          "炸好瀝乾的蝦與蔬菜排在乾淨盤中，旁邊供應溫熱天つゆ、100 公克蘿蔔泥與 15 公克薑泥；用乾淨公筷，外皮保持不加蓋酥脆。",
          "油を切ったえびと野菜を清潔な皿に盛ります。温かい天つゆ、大根おろし100g、しょうがおろし15gを添え、清潔な箸で取り分け、衣は覆わずカリッと保ちます。",
          "기름을 뺀 새우와 채소를 깨끗한 접시에 담는다. 따뜻한 덴쓰유와 무 간 것 100g, 생강 간 것 15g을 곁들이고 깨끗한 집게를 쓰며 튀김옷은 덮지 않아 바삭하게 둔다.",
          "จัดกุ้งและผักที่สะเด็ดแล้วบนจานสะอาด เสิร์ฟเท็นสึยุอุ่น ๆ กับหัวไชเท้าขูด 100 กรัมและขิงขูด 15 กรัม ใช้ตะเกียบเสิร์ฟสะอาดและไม่ปิดฝาเพื่อคงความกรอบ"
        )
      }
    ],
    tips: [
      ml("Keep the batter cold and barely mixed; gluten makes tempura heavy.", "麵糊要冰冷且只輕拌，筋性太強會讓天婦羅厚重。", "衣は冷たく、混ぜすぎないと軽く仕上がります。", "반죽을 차갑게 두고 과하게 섞지 않아야 튀김이 가볍습니다.", "รักษาแป้งให้เย็นและคนเพียงเล็กน้อยเพื่อให้เทมปุระเบา"),
      ml("Dry the ingredients well so the batter adheres and the oil does not splatter.", "食材要擦乾，麵糊才黏得住，也能減少油濺。", "具材をよく拭くと衣が付き、油はねも減ります。", "재료를 잘 말려야 반죽이 붙고 기름이 튀지 않습니다.", "ซับวัตถุดิบให้แห้งเพื่อให้แป้งเกาะและลดน้ำมันกระเด็น")
    ],
    commonMistakes: [
      ml("A crowded pot drops below 165°C and produces greasy, pale coating; fry in small batches.", "鍋中太擠會使油溫低於 165°C，外皮油膩蒼白；務必分批。", "詰めすぎると165℃未満に下がり油っぽく白い衣になるので、少量ずつ揚げます。", "냄비를 채우면 165°C 아래로 떨어져 눅눅하고 창백해지므로 소량씩 튀깁니다.", "ใส่แน่นหม้อทำให้อุณหภูมิต่ำกว่า 165°C แป้งซีดและอมน้ำมัน ต้องทอดทีละชุด"),
      ml("Do not use a raw-seafood tray or utensils for drained tempura; wash and sanitize between tasks.", "生蝦托盤或器具不可拿來放熟天婦羅，工作間要清洗消毒。", "生えび用のトレーや道具を揚げ上がりに使わず、作業の合間に洗浄・消毒します。", "생새우 트레이나 도구를 건진 튀김에 쓰지 말고 작업 사이 세척·소독합니다.", "ห้ามใช้ถาดหรืออุปกรณ์กุ้งดิบกับเทมปุระสุก ล้างฆ่าเชื้อระหว่างงาน")
    ],
    substitutions: [
      ml("Replace zucchini with 100 g green beans cut to 6 cm, keeping the 170°C batch method.", "櫛瓜可改用 100 公克切 6 公分的四季豆，維持 170°C 分批油炸。", "ズッキーニは6cmに切ったいんげん100gに替え、170℃で少量ずつ揚げます。", "주키니는 6cm로 자른 그린빈 100g으로 바꾸고 170°C 소량 튀김을 유지합니다.", "เปลี่ยนซูกินีเป็นถั่วแขก 100 กรัมหั่น 6 ซม. โดยคงการทอดเป็นชุดที่ 170°C"),
      ml("Use rice bran oil instead of neutral vegetable oil at the same 1.5 L volume.", "中性植物油可用同樣 1.5 公升米糠油替代。", "くせのない植物油は同量1.5Lの米ぬか油に替えられます。", "중성 식용유는 같은 1.5L의 미강유로 바꿀 수 있습니다.", "เปลี่ยนน้ำมันพืชรสกลางเป็นน้ำมันรำข้าว 1.5 ลิตรเท่ากันได้")
    ],
    storage: ml("Eat immediately for crispness. If necessary, refrigerate drained tempura separately for 1 day and reheat uncovered on a rack at 200°C; keep tentsuyu and grated garnishes separate.", "天婦羅最好立即食用保持酥脆；必要時將瀝乾天婦羅分開冷藏 1 天，以 200°C 網架不加蓋回烤，天つゆ與蘿蔔薑泥分開。", "食感のためすぐ食べます。必要なら油を切った天ぷらだけを分けて1日冷蔵し、網で200℃、覆わず温めます。天つゆと薬味は別にします。", "바삭함을 위해 즉시 먹는다. 필요하면 기름 뺀 튀김만 따로 1일 냉장하고 철망에서 200°C로 덮지 않고 데우며 덴쓰유와 간 것은 따로 둔다.", "ควรกินทันทีเพื่อความกรอบ หากจำเป็นแช่เย็นเทมปุระที่สะเด็ดแยกได้ 1 วัน อุ่นบนตะแกรงเปิดฝาที่ 200°C และแยกเท็นสึยุกับเครื่องขูด"),
    cultureNote: ml("Tempura is a Japanese batter-frying tradition that emphasizes a thin, airy coating so the seafood and vegetables stay distinct.", "天婦羅是日本麵糊油炸傳統，重點是薄而輕盈的外衣，讓海鮮與蔬菜本味清楚。", "天ぷらは薄く軽い衣で魚介や野菜の持ち味を生かす、日本の揚げ物の伝統です。", "텐푸라는 얇고 가벼운 튀김옷으로 해산물과 채소의 맛을 살리는 일본식 튀김 전통입니다.", "เทมปุระเป็นธรรมเนียมทอดแบบญี่ปุ่นที่ใช้แป้งบางเบาเพื่อคงรสของอาหารทะเลและผักให้ชัดเจน"),
    sources: [
      { title: "Kikkoman — Tempura Recipe (Japanese Deep Fried Vegetables and Shrimp)", url: "https://www.kikkoman.com/en/cookbook/washoku/tempura.html" },
      { title: "Just One Cookbook — How to Make the Best Tempura", url: "https://www.justonecookbook.com/tempura-recipe/" }
    ],
    imageAlt: ml("Two shrimp and assorted vegetable tempura on a large gray plate", "大灰盤上盛著兩尾蝦與多種蔬菜天婦羅", "大きな灰色の皿に盛ったえび2尾と野菜の天ぷら", "큰 회색 접시에 담긴 새우 두 마리와 채소 텐푸라", "เทมปุระกุ้งสองตัวกับผักหลายชนิดบนจานสีเทาใบใหญ่"),
    visualSpec: "Two shrimp tempura with purple-skinned sweet potato slices, green pepper, and zucchini on a large gray plate; no dip or extra garnish visible."
  },
  {
    id: "yakitori",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 35,
    cookMinutes: 15,
    totalMinutes: 50,
    servings: 4,
    name: ml("Shio chicken yakitori", "鹽烤雞肉串", "鶏ももの塩焼き鳥", "소금구이 닭 야키토리", "ยากิโทริไก่ย่างเกลือ"),
    description: ml(
      "Boneless chicken thigh is packed onto soaked skewers, seasoned only with fine salt, and grilled until the centre reaches 74°C.",
      "去骨雞腿肉緊密串上泡軟竹籤，只以細海鹽調味，烤至中心 74°C。",
      "骨なし鶏もも肉を水で戻した串に詰め、細かい塩だけで味付けし、中心74℃まで焼きます。",
      "뼈 없는 닭다리살을 불린 꼬치에 촘촘히 끼우고 고운 소금만 뿌려 중심 74°C까지 굽습니다.",
      "ร้อยน่องไก่ไร้กระดูกบนไม้เสียบที่แช่น้ำ ปรุงด้วยเกลือละเอียดเท่านั้น แล้วย่างจนใจกลางถึง 74°C"
    ),
    ingredients: [
      ingredient("600 g", ml("boneless, skin-on chicken thigh, cut into 3 cm pieces", "去骨帶皮雞腿肉，切 3 公分塊", "骨なし鶏もも肉（皮付き、3cm角）", "뼈 없는 껍질 있는 닭다리살, 3cm 조각", "น่องไก่ไร้กระดูกติดหนัง หั่นชิ้น 3 ซม.")),
      ingredient("6 g", ml("fine sea salt", "細海鹽", "細かい海塩", "고운 천일염", "เกลือทะเลละเอียด")),
      ingredient("8", ml("5-inch bamboo skewers", "5 英吋竹籤", "5インチの竹串", "5인치 대나무 꼬치", "ไม้เสียบไม้ไผ่ยาว 5 นิ้ว")),
      ingredient("500 ml", ml("cold water for soaking the skewers", "浸泡竹籤用冷水", "串を浸す冷水", "꼬치 불릴 찬물", "น้ำเย็นสำหรับแช่ไม้เสียบ")),
      ingredient("15 ml", ml("neutral oil for the grill rack", "烤架用中性油", "網に塗るくせのない油", "석쇠용 중성유", "น้ำมันรสกลางสำหรับทาตะแกรง"))
    ],
    instructions: [
      {
        title: ml("Soak the bamboo skewers", "浸泡竹籤", "竹串を水で戻す", "대나무 꼬치 불리기", "แช่ไม้เสียบ"),
        body: ml(
          "Soak eight 5-inch bamboo skewers in 500 ml cold water for 30 minutes. Drain them just before assembly; soaked wood is less likely to scorch under the broiler.",
          "八支 5 英吋竹籤以 500 毫升冷水浸泡 30 分鐘，串肉前瀝乾；竹籤吸水後在烤箱上火下較不易焦黑。",
          "5インチの竹串8本を冷水500mlに30分浸けます。串打ちの前に水を切り、含水させた竹は上火で焦げにくくします。",
          "5인치 대나무 꼬치 8개를 찬물 500ml에 30분 불린다. 끼우기 직전 물기를 빼며 물을 머금은 나무는 브로일러에서 덜 탄다.",
          "แช่ไม้เสียบไม้ไผ่ยาว 5 นิ้ว 8 ไม้ในน้ำเย็น 500 มล. 30 นาที สะเด็ดก่อนร้อย เนื้อไม้ที่ชุ่มน้ำจะไหม้ยากเมื่อย่างไฟบน"
        )
      },
      {
        title: ml("Trim and cut chicken thigh", "修整切雞腿肉", "鶏もも肉を整えて切る", "닭다리살 손질해 썰기", "ตัดแต่งและหั่นน่องไก่"),
        body: ml(
          "Trim only excess yellow fat from 600 g boneless, skin-on chicken thigh and cut it into even 3 cm pieces. Work on a dedicated raw-chicken board and sanitize the board and knife before handling the grill rack.",
          "將 600 公克去骨帶皮雞腿肉只修去多餘黃脂肪，切成均勻 3 公分塊。使用生雞肉專用砧板，接觸烤架前清潔消毒砧板與刀具。",
          "骨なし皮付き鶏もも肉600gは黄色い余分な脂だけ取り、3cm角にそろえます。生肉専用まな板で作業し、焼き網を扱う前にまな板と包丁を洗浄・消毒します。",
          "뼈 없는 껍질 있는 닭다리살 600g에서 노란 여분 지방만 떼고 3cm 크기로 고르게 썬다. 생닭 전용 도마에서 작업하고 석쇠를 만지기 전에 도마와 칼을 세척·소독한다.",
          "ตัดเฉพาะไขมันเหลืองส่วนเกินจากน่องไก่ติดหนังไร้กระดูก 600 กรัม แล้วหั่นชิ้น 3 ซม. เท่า ๆ กัน ใช้เขียงสำหรับไก่ดิบโดยเฉพาะ และล้างฆ่าเชื้อเขียงกับมีดก่อนจับตะแกรง"
        )
      },
      {
        title: ml("Season with shio", "以鹽調味", "塩で下味を付ける", "소금으로 밑간하기", "ปรุงเกลือ"),
        body: ml(
          "Toss the chicken with 6 g fine sea salt and rest it uncovered in the refrigerator at 4°C or colder for 10 minutes. Keep the seasoned raw chicken covered from other ready-to-eat foods.",
          "雞肉拌入 6 公克細海鹽，在 4°C 以下冷藏不加蓋靜置 10 分鐘；調味生雞肉要與即食食物隔離。",
          "鶏肉に細かい海塩6gをまぶし、4℃以下の冷蔵庫で覆わず10分置きます。味付けした生肉はそのまま食べる食品から隔離します。",
          "닭고기에 고운 천일염 6g을 버무려 4°C 이하 냉장고에서 덮지 않고 10분 둔다. 양념한 생닭은 바로 먹는 음식과 분리한다.",
          "คลุกไก่กับเกลือทะเลละเอียด 6 กรัม พักเปิดฝาในตู้เย็นที่ 4°C หรือต่ำกว่า 10 นาที แยกไก่ดิบที่ปรุงแล้วจากอาหารพร้อมกิน"
        )
      },
      {
        title: ml("Thread eight skewers", "串成八支", "8本に串打ちする", "여덟 꼬치에 끼우기", "ร้อยแปดไม้"),
        body: ml(
          "Thread the 3 cm chicken pieces tightly onto the eight soaked skewers, leaving the handles clear and avoiding exposed sharp tips. Use a clean tray for the assembled raw skewers and discard any juices left on the raw tray.",
          "將 3 公分雞塊緊密串在八支泡過水的竹籤上，握柄留空並避免尖端外露；串好的生肉放乾淨托盤，生肉托盤殘汁丟棄。",
          "3cmの鶏肉を水で戻した8本の串に隙間なく刺し、持ち手を空けて尖った先を出さないようにします。組み立てた生串は清潔なトレーに置き、生肉トレーの汁は捨てます。",
          "3cm 닭 조각을 불린 꼬치 8개에 빈틈없이 끼우되 손잡이는 남기고 뾰족한 끝이 드러나지 않게 한다. 조립한 생꼬치는 깨끗한 트레이에 두고 생고기 트레이의 즙은 버린다.",
          "ร้อยไก่ชิ้น 3 ซม.แน่น ๆ บนไม้ที่แช่แล้ว 8 ไม้ เว้นด้ามจับและอย่าให้ปลายแหลมโผล่ วางไม้ดิบที่ประกอบแล้วบนถาดสะอาดและทิ้งน้ำจากถาดไก่ดิบ"
        )
      },
      {
        title: ml("Oil the grill rack", "在烤架塗油", "焼き網に油を塗る", "석쇠에 기름 바르기", "ทาน้ำมันตะแกรง"),
        body: ml(
          "Preheat a broiler or covered grill to medium-high. Line a tray with foil, set a clean wire rack above it, and brush the rack with 15 ml neutral oil. Place the raw skewers in a single layer with space between them.",
          "烤箱上火或有蓋烤爐預熱至中大火。烤盤鋪鋁箔、放乾淨網架並刷上 15 毫升中性油；生雞肉串單層留間距排好。",
          "グリルまたは上火を中強火に予熱します。天板にホイルを敷いて清潔な網を置き、油15mlを塗ります。生串は間隔を空けて一層に並べます。",
          "브로일러나 뚜껑 있는 그릴을 중강불로 예열한다. 팬에 호일을 깔고 깨끗한 철망을 올려 중성유 15ml를 바른다. 생꼬치는 간격을 두고 한 겹으로 놓는다.",
          "อุ่นเตาย่างหรือเตาย่างมีฝาที่ไฟกลางค่อนแรง ปูฟอยล์บนถาดวางตะแกรงสะอาด ทาน้ำมันรสกลาง 15 มล. แล้ววางไก่ดิบเป็นชั้นเดียวเว้นระยะ"
        )
      },
      {
        title: ml("Grill the first side", "先烤第一面", "最初の面を焼く", "첫 면 굽기", "ย่างด้านแรก"),
        body: ml(
          "Grill the skewers for 5–6 minutes until the underside is browned and the chicken releases from the rack. Turn each skewer with clean tongs and grill another 4 minutes; keep the heat steady rather than charring the outside.",
          "烤串 5–6 分鐘至底面上色且雞肉能脫離網架，用乾淨夾子逐支翻面再烤 4 分鐘；維持穩定火力，不要只把外層烤焦。",
          "串を5〜6分焼き、裏面に焼き色が付き網から離れるようにします。清潔なトングで1本ずつ返し、さらに4分焼き、外側だけ焦がさず火力を安定させます。",
          "꼬치를 5–6분 구워 밑면이 갈색이 되고 망에서 떨어지면 깨끗한 집게로 하나씩 뒤집어 4분 더 굽는다. 겉만 태우지 말고 불을 일정하게 유지한다.",
          "ย่างไม้เสียบ 5–6 นาทีจนด้านล่างเป็นสีน้ำตาลและไก่หลุดจากตะแกรง ใช้คีมสะอาดกลับทีละไม้แล้วย่างต่อ 4 นาที รักษาไฟให้คงที่ไม่ให้ด้านนอกไหม้"
        )
      },
      {
        title: ml("Finish to 74°C", "烤至 74°C", "74℃まで焼き上げる", "74°C까지 익히기", "ย่างจนถึง 74°C"),
        body: ml(
          "Lower the heat slightly and continue grilling 3–4 minutes, turning once more if needed. Insert a clean thermometer into the thickest chicken piece without touching the skewer; every centre must reach at least 74°C.",
          "略降火再烤 3–4 分鐘，必要時再翻一次。乾淨溫度計插入最厚雞塊中心且不要碰到竹籤；每支雞肉中心都須至少 74°C。",
          "火を少し下げて3〜4分焼き、必要ならもう一度返します。清潔な温度計を串に触れないよう最も厚い肉の中心へ差し、全ての中心を74℃以上にします。",
          "불을 조금 낮춰 3–4분 더 굽고 필요하면 한 번 더 뒤집는다. 깨끗한 온도계를 꼬치에 닿지 않게 가장 두꺼운 고기 중심에 꽂아 모든 중심이 최소 74°C인지 확인한다.",
          "ลดไฟเล็กน้อยย่างต่อ 3–4 นาที กลับอีกครั้งหากจำเป็น สอดเทอร์โมมิเตอร์สะอาดเข้ากลางชิ้นหนาสุดโดยไม่แตะไม้เสียบ ตรวจให้ใจกลางทุกไม้ถึงอย่างน้อย 74°C"
        )
      },
      {
        title: ml("Rest and serve shio", "靜置鹽烤上桌", "休ませて塩焼きを出す", "쉬었다가 소금구이 내기", "พักแล้วเสิร์ฟแบบเกลือ"),
        body: ml(
          "Rest the cooked skewers on a clean plate for 2 minutes, then serve immediately as shio yakitori. Use no tare, scallions, sesame, or other garnish so the finished appearance remains the lightly salted chicken skewers shown in the photograph.",
          "熟雞肉串在乾淨盤中靜置 2 分鐘後立即以鹽烤雞肉串上桌。不使用醬汁、蔥段、芝麻或其他裝飾，保持照片中的淡色鹽烤雞串外觀。",
          "焼き上がった串を清潔な皿で2分休ませ、塩焼き鳥としてすぐに供します。たれ、ねぎ、ゴマなどを添えず、写真の淡い塩焼きの見た目を保ちます。",
          "익힌 꼬치를 깨끗한 접시에서 2분 쉬게 한 뒤 소금구이 야키토리로 즉시 낸다. 타레, 대파, 참깨나 다른 고명을 쓰지 않아 사진의 연한 소금구이 모습을 유지한다.",
          "พักไก่ย่างบนจานสะอาด 2 นาทีแล้วเสิร์ฟเป็นยากิโทริเกลือทันที ไม่ใช้ซอสทา ต้นหอม งา หรือเครื่องตกแต่งอื่น เพื่อคงลักษณะไก่ย่างเกลือสีอ่อนตามภาพ"
        )
      }
    ],
    tips: [
      ml("Pack chicken pieces tightly so the exposed bamboo does not scorch.", "雞塊要串緊，露出的竹籤才不會焦黑。", "鶏肉を詰めて刺すと、露出した竹串が焦げにくくなります。", "닭 조각을 촘촘히 끼워야 드러난 대나무가 타지 않습니다.", "ร้อยไก่ให้แน่นเพื่อไม่ให้ไม้ไผ่ที่โผล่ไหม้"),
      ml("Salt just before grilling or for a short refrigerated rest; long salting can draw out moisture.", "鹽在烤前或短時間冷藏時加入，久放會把水分逼出。", "塩は焼く直前か短い冷蔵休ませで使い、長く置くと水分が抜けます。", "소금은 굽기 직전 또는 짧게 냉장 휴지할 때 넣고 오래 두어 수분을 빼지 않습니다.", "ใส่เกลือก่อนย่างหรือพักเย็นสั้น ๆ การหมักนานทำให้น้ำออก")
    ],
    commonMistakes: [
      ml("Uneven pieces cook at different rates; cut all chicken to 3 cm and verify the thickest centre.", "雞塊大小不一會熟度不同，應全切 3 公分並測最厚中心。", "大きさが不揃いだと火の通りが変わるので、全て3cmに切り厚い中心を確認します。", "조각 크기가 다르면 익는 속도가 달라지므로 모두 3cm로 자르고 두꺼운 중심을 확인합니다.", "ชิ้นไม่เท่ากันจะสุกต่างกัน หั่น 3 ซม.ทั้งหมดและตรวจใจกลางชิ้นหนาสุด"),
      ml("Never brush cooked chicken with a brush that touched raw chicken; shio yakitori needs no sauce.", "不可用接觸生雞肉的刷子刷熟雞肉；鹽烤雞肉串不需要醬汁。", "生肉に触れた刷毛を焼いた鶏に使いません。塩焼き鳥にはたれは不要です。", "생닭에 닿은 붓을 익은 닭에 쓰지 않으며 소금구이에는 소스가 필요 없습니다.", "อย่าใช้แปรงที่โดนไก่ดิบกับไก่สุก ยากิโทริเกลือไม่ต้องทาซอส")
    ],
    substitutions: [
      ml("Use boneless, skinless chicken thigh at the same 600 g weight; add 2 minutes if pieces are lean and dry quickly.", "可用同樣 600 公克去皮去骨雞腿肉；肉較瘦乾得快時增加 2 分鐘。", "同量600gの皮なし骨なし鶏もも肉に替えられます。赤身なら乾きやすいので2分延ばします。", "같은 600g의 뼈·껍질 없는 닭다리살로 바꿀 수 있으며 살코기가 빨리 마르면 2분 늘립니다.", "ใช้น่องไก่ลอกหนังและไร้กระดูก 600 กรัมเท่ากันได้ ถ้าเนื้อแห้งเร็วให้เพิ่ม 2 นาที"),
      ml("Use reusable metal skewers instead of bamboo; skip the soaking step but keep the single-layer grill and 74°C check.", "竹籤可改用可重複使用的金屬籤，省略浸泡但仍要單層烤與確認 74°C。", "竹串は再利用できる金属串に替えられます。浸水は省きますが、一層焼きと74℃確認は守ります。", "대나무 꼬치는 재사용 금속 꼬치로 바꿀 수 있다. 불리기는 생략하되 한 겹 굽기와 74°C 확인은 지킨다.", "เปลี่ยนไม้ไผ่เป็นไม้เสียบโลหะใช้ซ้ำได้ ข้ามการแช่น้ำแต่ยังย่างชั้นเดียวและตรวจ 74°C")
    ],
    storage: ml("Cool within 2 hours, refrigerate airtight for up to 3 days, and reheat uncovered on a rack at 190°C until the centre reaches 74°C. Do not store at room temperature.", "2 小時內放涼，密封冷藏最多 3 天；放網架以 190°C 不加蓋回熱至中心 74°C，不可室溫保存。", "2時間以内に冷まし、密閉冷蔵で3日以内に使います。網で190℃、中心74℃まで覆わず温め、室温に置きません。", "2시간 안에 식혀 밀폐 냉장 3일 이내 사용한다. 철망에서 190°C로 덮지 않고 중심 74°C까지 데우며 실온 보관하지 않는다.", "ทำให้เย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 3 วัน อุ่นเปิดฝาบนตะแกรงที่ 190°C จนใจกลางถึง 74°C และห้ามเก็บที่อุณหภูมิห้อง"),
    cultureNote: ml("Yakitori has many regional and ingredient styles; shio yakitori highlights the grill and chicken with a simple salt finish rather than a sweet tare.", "雞肉串有許多地域與部位變化；鹽烤雞肉串以簡單鹽味凸顯炭火與雞肉，不使用甜醬。", "焼き鳥には地域や部位による多様な形があり、塩焼きは甘いたれを使わず、焼きと鶏の味を塩で引き立てます。", "야키토리는 지역과 부위에 따라 다양하며 소금구이는 달콤한 타레 대신 소금으로 불향과 닭고기를 돋보이게 합니다.", "ยากิโทริมีหลายแบบตามภูมิภาคและส่วนไก่ แบบย่างเกลือเน้นกลิ่นย่างและรสไก่ด้วยเกลือแทนซอสหวาน"),
    sources: [
      { title: "Kikkoman — Yakitori", url: "https://www.kikkoman.com/en/cookbook/recipe/00001155.html" },
      { title: "Just One Cookbook — Yakitori Recipe (Japanese Grilled Chicken Skewers)", url: "https://www.justonecookbook.com/yakitori/" }
    ],
    imageAlt: ml("Lightly salted grilled chicken yakitori skewers on a pale ceramic plate", "淺色陶盤上淡鹽烤雞肉串的日式雞肉串", "淡い塩味で焼いた鶏ももの焼き鳥を淡色の陶器皿に盛ったもの", "연한 소금으로 구운 닭 야키토리 꼬치를 밝은 도자기 접시에 담은 모습", "ยากิโทริไก่ย่างเกลือสีอ่อนบนจานเซรามิกสีอ่อน"),
    visualSpec: "Lightly salted, pale grilled chicken-thigh yakitori skewers on a plain ceramic plate; no scallion segments, tare, sesame, chili, or extra garnish visible."
  },
  {
    id: "okonomiyaki",
    cuisine: "japanese",
    region: ml("Osaka, Japan", "日本大阪", "日本・大阪", "일본 오사카", "โอซากา ประเทศญี่ปุ่น"),
    prepMinutes: 25,
    cookMinutes: 25,
    totalMinutes: 50,
    servings: 4,
    name: ml("Osaka-style okonomiyaki", "大阪風御好燒", "大阪風お好み焼き", "오사카식 오코노미야키", "โอโคโนมิยากิสไตล์โอซากา"),
    description: ml(
      "A thick cabbage-and-pork savory pancake is cooked gently on both sides, then finished with measured okonomiyaki sauce, mayonnaise, aonori, and bonito flakes.",
      "厚實高麗菜豬肉鹹煎餅雙面慢煎熟透，最後定量淋上御好燒醬、美乃滋、青海苔與柴魚片。",
      "キャベツと豚肉の厚い savory パンケーキを両面ゆっくり焼き、計量したお好み焼きソース、マヨネーズ、青のり、かつお節で仕上げます。",
      "두꺼운 양배추·돼지고기 전을 양면 천천히 익힌 뒤 계량한 오코노미야키 소스, 마요네즈, 아오노리, 가쓰오부시로 마무리합니다.",
      "แพนเค้กคาวกะหล่ำปลีและหมูชิ้นหนาปรุงช้า ๆ สองด้าน แล้วราดซอสโอโคโนมิยากิ มายองเนส อาโอโนริ และปลาโอแห้งตามปริมาณ"
    ),
    ingredients: [
      ingredient("640 g", ml("green cabbage, finely chopped", "綠高麗菜，切細", "青キャベツ（細かく刻む）", "초록 양배추, 잘게 다지기", "กะหล่ำปลีเขียวสับละเอียด")),
      ingredient(ml("240 g / 8 slices", "240 公克 / 8 片", "240 g / 8枚", "240 g / 8장", "240 กรัม / 8 ชิ้น"), ml("pork belly, thinly sliced", "豬五花薄片，8 片", "豚バラ薄切り（8枚）", "돼지 삼겹살 얇은 조각, 8장", "หมูสามชั้นหั่นบาง 8 ชิ้น")),
      ingredient("120 g", ml("all-purpose flour", "中筋麵粉", "薄力粉", "중력분", "แป้งอเนกประสงค์")),
      ingredient("160 g", ml("nagaimo mountain yam, grated", "長芋，磨泥", "長芋（すりおろし）", "나가이모, 간 것", "มันยามะอิโมะขูด")),
      ingredient("180 ml", ml("dashi", "日式高湯", "だし", "다시", "ดาชิ")),
      ingredient("3 g", ml("baking powder", "泡打粉", "ベーキングパウダー", "베이킹파우더", "ผงฟู")),
      ingredient("3 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด")),
      ingredient("3 g", ml("granulated sugar", "砂糖", "砂糖", "설탕", "น้ำตาลทราย")),
      ingredient(ml("4 large / 200 g", "4 顆大蛋 / 200 公克", "大4個 / 200 g", "대란 4개 / 200 g", "ไข่ฟองใหญ่ 4 ฟอง / 200 กรัม"), ml("eggs", "雞蛋", "卵", "달걀", "ไข่ไก่")),
      ingredient("60 g", ml("tenkasu tempura scraps", "天かす／天婦羅碎屑", "天かす", "텐카스 튀김 부스러기", "เศษแป้งเทมปุระเท็นคาสุ")),
      ingredient("30 g", ml("pickled red ginger, minced", "紅薑醃菜，切末", "紅しょうが（みじん切り）", "초생강, 다지기", "ขิงดองแดงสับ")),
      ingredient("30 ml", ml("neutral oil for the griddle", "煎台用中性油", "焼き台用のくせのない油", "철판용 중성유", "น้ำมันรสกลางสำหรับกระทะ")),
      ingredient("120 g", ml("okonomiyaki sauce", "御好燒醬", "お好み焼きソース", "오코노미야키 소스", "ซอสโอโคโนมิยากิ")),
      ingredient("80 g", ml("Japanese mayonnaise", "日式美乃滋", "マヨネーズ", "일본식 마요네즈", "มายองเนสญี่ปุ่น")),
      ingredient("4 g", ml("aonori dried green laver", "青海苔粉", "青のり", "아오노리 김가루", "อาโอโนริสาหร่ายเขียวแห้ง")),
      ingredient("8 g", ml("katsuobushi dried bonito flakes", "柴魚片", "かつお節", "가쓰오부시 가다랑어포", "ปลาโอแห้งคัตสึโอะบุชิ"))
    ],
    instructions: [
      {
        title: ml("Chop and dry the cabbage", "切碎瀝乾高麗菜", "キャベツを刻んで水気を切る", "양배추 썰고 물기 빼기", "สับและสะเด็ดกะหล่ำ"),
        body: ml(
          "Finely chop 640 g cabbage and drain it thoroughly so extra water does not thin the batter. Slice 240 g pork belly into eight thin pieces; use a dedicated raw-pork board and sanitize it before the batter station.",
          "將 640 公克高麗菜切細並充分瀝乾，避免水分稀釋麵糊；240 公克豬五花切成八片薄片。生豬肉使用專用砧板，進入調糊區前清潔消毒。",
          "キャベツ640gを細かく刻み、余分な水分で衣が薄まらないよう十分に水を切ります。豚バラ240gを薄切り8枚にし、生肉専用まな板は衣の作業前に洗浄・消毒します。",
          "양배추 640g을 잘게 썰어 물기를 충분히 빼 반죽이 묽어지지 않게 한다. 삼겹살 240g을 얇게 8장 썰고 생고기 전용 도마는 반죽 작업 전에 세척·소독한다.",
          "สับกะหล่ำปลี 640 กรัมละเอียดและสะเด็ดให้ดีไม่ให้น้ำทำแป้งเหลว หั่นหมูสามชั้น 240 กรัมเป็น 8 ชิ้นบาง ใช้เขียงหมูดิบโดยเฉพาะและล้างฆ่าเชื้อก่อนเตรียมแป้ง"
        )
      },
      {
        title: ml("Make the base batter", "製作基礎麵糊", "ベースの生地を作る", "기본 반죽 만들기", "ทำแป้งพื้นฐาน"),
        body: ml(
          "Whisk 120 g flour, 3 g baking powder, 3 g salt, and 3 g sugar with 180 ml dashi and 160 g grated nagaimo until smooth. Rest the base batter covered for 15 minutes in the refrigerator.",
          "將 120 公克麵粉、3 公克泡打粉、3 公克鹽與 3 公克砂糖和 180 毫升高湯、160 公克長芋泥拌至滑順，加蓋冷藏醒麵糊 15 分鐘。",
          "薄力粉120g、ベーキングパウダー3g、塩3g、砂糖3gにだし180mlとすりおろし長芋160gを混ぜてなめらかにし、覆って冷蔵庫で15分休ませます。",
          "중력분 120g, 베이킹파우더 3g, 소금 3g, 설탕 3g에 다시 180ml와 간 나가이모 160g을 섞어 매끈하게 만들고 덮어 냉장 15분 쉰다.",
          "ผสมแป้ง 120 กรัม ผงฟู 3 กรัม เกลือ 3 กรัม และน้ำตาล 3 กรัมกับดาชิ 180 มล.และยามะอิโมะขูด 160 กรัมจนเนียน ปิดพักแป้งในตู้เย็น 15 นาที"
        )
      },
      {
        title: ml("Fold in the mix-ins", "拌入配料", "具材を混ぜ込む", "부재료 섞기", "พับส่วนผสมลงแป้ง"),
        body: ml(
          "Beat four eggs into the rested batter, then fold in 60 g tenkasu, 30 g minced pickled red ginger, and the drained cabbage. Divide the thick mixture into four equal portions; keep the raw pork separate until the pan.",
          "醒好的麵糊拌入四顆雞蛋，再折入 60 公克天かす、30 公克紅薑末與瀝乾高麗菜，平均分成四份；生豬肉到下鍋前保持分開。",
          "休ませた生地に卵4個を混ぜ、天かす60g、刻んだ紅しょうが30g、水を切ったキャベツを折り込みます。4等分し、豚肉は焼く直前まで分けておきます。",
          "숙성한 반죽에 달걀 4개를 섞고 텐카스 60g, 다진 초생강 30g, 물 뺀 양배추를 접어 넣는다. 네 등분하고 돼지고기는 팬에 넣기 전까지 분리한다.",
          "ตีไข่ 4 ฟองลงในแป้งที่พักแล้ว พับเท็นคาสุ 60 กรัม ขิงดองแดงสับ 30 กรัม และกะหล่ำที่สะเด็ดลงไป แบ่งเป็น 4 ส่วนเท่ากัน แยกหมูดิบไว้จนกว่าจะลงกระทะ"
        )
      },
      {
        title: ml("Heat and shape four pancakes", "加熱分成四張", "4枚に広げる", "네 장으로 모양 잡기", "อุ่นและขึ้นรูปสี่แผ่น"),
        body: ml(
          "Heat a griddle or wide skillet to 200°C over medium heat and brush on 30 ml oil. Add one quarter of the batter at a time, shape each into a 15 cm round about 2 cm thick, and lay two pork slices across the top of each round.",
          "平底煎台以中火加熱至 200°C，刷上 30 毫升油。麵糊每次取四分之一，塑成直徑 15 公分、約 2 公分厚的圓餅，每張表面鋪兩片豬肉。",
          "鉄板または広いフライパンを中火で200℃に熱し、油30mlを塗ります。生地を4分の1ずつ15cm径、厚さ約2cmに広げ、各枚の上に豚肉2枚を置きます。",
          "철판이나 넓은 팬을 중불 200°C로 달구고 기름 30ml를 바른다. 반죽을 한 번에 4분의 1씩 지름 15cm, 약 2cm 두께로 펴고 각 장 위에 돼지고기 두 조각을 놓는다.",
          "อุ่นกระทะแบนหรือกระทะกว้างที่ไฟกลางให้ถึง 200°C ทาน้ำมัน 30 มล. ใส่แป้งทีละหนึ่งในสี่ ปั้นเป็นวง 15 ซม.หนาประมาณ 2 ซม. แล้ววางหมูสองชิ้นบนแต่ละแผ่น"
        )
      },
      {
        title: ml("Cook covered first side", "加蓋煎第一面", "ふたをして片面を焼く", "덮어 첫 면 익히기", "ปิดฝาย่างด้านแรก"),
        body: ml(
          "Cover and cook over medium-low heat for 5 minutes until the bottom is golden and the pork edges begin to render. Work in batches if the griddle cannot hold all four without crowding.",
          "加蓋轉中小火煎 5 分鐘，至底部金黃、豬肉邊緣開始出油；煎台放不下四張時要分批，避免擁擠。",
          "ふたをして中弱火で5分、底がきつね色になり豚肉の縁から脂が出始めるまで焼きます。4枚が詰まるなら分けて焼きます。",
          "덮고 중약불에서 5분, 바닥이 황금색이고 돼지고기 가장자리에 지방이 나오기 시작할 때까지 익힌다. 네 장이 빽빽하면 나누어 굽는다.",
          "ปิดฝาย่างไฟกลางอ่อน 5 นาทีจนก้นเป็นสีทองและไขมันเริ่มออกจากขอบหมู หากกระทะใส่ทั้งสี่ไม่พอให้ย่างเป็นชุด"
        )
      },
      {
        title: ml("Flip and cook through", "翻面煎熟", "返して火を通す", "뒤집어 속까지 익히기", "กลับด้านให้สุก"),
        body: ml(
          "Slide a clean wide spatula fully under each pancake and flip once. Cover and cook the pork side down for another 5 minutes over medium-low heat; do not press, or the cabbage structure will become dense.",
          "用乾淨寬鏟完整托住每張煎餅翻面一次。豬肉面朝下，以中小火加蓋再煎 5 分鐘；不要壓餅，否則高麗菜結構會變密實。",
          "清潔な幅広のへらを全面に差し入れて一度返します。豚肉側を下にして中弱火でふたをし、さらに5分焼きます。押しつぶすとキャベツが重くなります。",
          "깨끗한 넓은 뒤집개를 밑에 깊이 넣어 한 번 뒤집는다. 돼지고기 면을 아래로 하고 중약불에서 덮어 5분 더 익힌다. 누르면 양배추 구조가 빽빽해진다.",
          "สอดตะหลิวกว้างสะอาดให้ทั่วใต้แผ่นแล้วกลับครั้งเดียว ย่างด้านหมูลงไฟกลางอ่อนปิดฝาอีก 5 นาที อย่ากดเพราะจะทำให้กะหล่ำแน่น"
        )
      },
      {
        title: ml("Set the centre to 74°C", "確認中心 74°C", "中心を74℃にする", "중심 74°C 맞추기", "ทำให้ใจกลางถึง 74°C"),
        body: ml(
          "Uncover, flip once more, and cook for 2 minutes. Check the thickest centre with a clean thermometer; the batter and pork must reach at least 74°C. Transfer each pancake to a clean plate and sanitize the raw-pork tools.",
          "開蓋再翻一次煎 2 分鐘。用乾淨溫度計測最厚中心，麵糊與豬肉都須至少 74°C；每張移至乾淨盤，並清潔消毒生豬肉用具。",
          "ふたを外してもう一度返し、2分焼きます。清潔な温度計で最も厚い中心を測り、生地と豚肉を74℃以上にします。皿へ移し、生肉用具を洗浄・消毒します。",
          "뚜껑을 열고 한 번 더 뒤집어 2분 익힌다. 깨끗한 온도계로 가장 두꺼운 중심을 재어 반죽과 돼지고기가 최소 74°C인지 확인한다. 접시에 옮기고 생고기 도구를 세척·소독한다.",
          "เปิดฝา กลับอีกครั้งและย่าง 2 นาที ตรวจใจกลางส่วนหนาสุดด้วยเทอร์โมมิเตอร์สะอาด แป้งและหมูต้องถึงอย่างน้อย 74°C ย้ายใส่จานสะอาดและล้างฆ่าเชื้ออุปกรณ์หมูดิบ"
        )
      },
      {
        title: ml("Top with four measured finishes", "定量完成四種配料", "4種の仕上げを計量してのせる", "네 가지 토핑 계량해 올리기", "ใส่หน้าสี่อย่างตามปริมาณ"),
        body: ml(
          "For each of the four pancakes, spread 30 g okonomiyaki sauce and 20 g Japanese mayonnaise, then add 1 g aonori and 2 g katsuobushi. Serve immediately; these are the only visible sauces and toppings in the finished dish.",
          "四張煎餅各抹 30 公克御好燒醬與 20 公克日式美乃滋，再撒 1 公克青海苔與 2 公克柴魚片，立即上桌；成品可見醬料與配料僅限這四項。",
          "4枚それぞれにお好み焼きソース30gとマヨネーズ20gを塗り、青のり1gとかつお節2gをのせます。すぐに供し、見えるソースとトッピングはこの4種だけにします。",
          "네 장 각각에 오코노미야키 소스 30g과 일본식 마요네즈 20g을 펴고 아오노리 1g, 가쓰오부시 2g을 올린다. 즉시 내며 보이는 소스와 토핑은 네 가지뿐이다.",
          "ทาซอสโอโคโนมิยากิ 30 กรัมและมายองเนสญี่ปุ่น 20 กรัมต่อแผ่น โรยอาโอโนริ 1 กรัมและปลาโอแห้ง 2 กรัม เสิร์ฟทันที ซอสและหน้าที่เห็นมีเพียงสี่อย่างนี้"
        )
      }
    ],
    tips: [
      ml("Dry cabbage well; a wet mix steams instead of forming a tender, tall pancake.", "高麗菜要瀝乾，太濕會把煎餅蒸扁而非煎出蓬鬆高度。", "キャベツの水気を切ると、蒸れずにふっくら焼けます。", "양배추 물기를 빼야 찌지 않고 부드럽고 높게 익습니다.", "สะเด็ดกะหล่ำให้ดี ส่วนผสมเปียกจะนึ่งแทนที่จะได้แพนเค้กนุ่มสูง"),
      ml("Keep the batter thick and avoid pressing after flipping so the centre stays tender.", "麵糊要厚，翻面後不要按壓，中心才會柔嫩。", "生地を厚く保ち、返した後に押さないと中心が柔らかくなります。", "반죽을 두껍게 유지하고 뒤집은 뒤 누르지 않아야 속이 부드럽습니다.", "รักษาแป้งให้หนาและอย่ากดหลังกลับด้านเพื่อให้ตรงกลางนุ่ม")
    ],
    commonMistakes: [
      ml("Flipping before the bottom sets can split the pancake; wait until the edge is firm and golden.", "底部未定型就翻面會使煎餅裂開，要等邊緣固定並呈金黃。", "底が固まる前に返すと割れるので、縁が固く色づくまで待ちます。", "바닥이 굳기 전에 뒤집으면 갈라지므로 가장자리가 단단하고 황금색이 될 때까지 기다립니다.", "กลับก่อนก้นเซ็ตทำให้แผ่นแตก รอให้ขอบอยู่ตัวและเป็นสีทอง"),
      ml("Using a dirty raw-pork spatula or board can contaminate the cooked pancake; sanitize before topping.", "生豬肉用髒鏟子或砧板會污染熟煎餅，淋醬前要消毒。", "生肉用の汚れたへらやまな板は加熱済みの生地を汚染するため、仕上げ前に消毒します。", "더러운 생고기 뒤집개나 도마는 익은 전을 오염시킬 수 있으니 토핑 전에 소독합니다.", "ตะหลิวหรือเขียงหมูดิบที่ไม่สะอาดทำให้แพนเค้กสุกปนเปื้อน ต้องฆ่าเชื้อก่อนใส่หน้า")
    ],
    substitutions: [
      ml("Replace nagaimo with 120 g silken tofu blended smooth; the pancake will be slightly less springy.", "長芋可改用 120 公克打滑的嫩豆腐，煎餅彈性會稍低。", "長芋は絹ごし豆腐120gを滑らかにしたものに替えられますが、弾力は少し弱くなります。", "나가이모는 곱게 간 연두부 120g으로 바꿀 수 있지만 전의 탄력은 조금 줄어듭니다.", "เปลี่ยนยามะอิโมะเป็นเต้าหู้อ่อนปั่นเนียน 120 กรัมได้ แต่ความเด้งจะลดลงเล็กน้อย"),
      ml("Use 240 g peeled shrimp instead of pork belly; cook until the thickest shrimp and batter reach 74°C.", "豬五花可改用 240 公克去殼蝦仁；最厚蝦仁與麵糊中心都要達 74°C。", "豚バラは殻をむいたえび240gに替えられます。最も厚いえびと生地の中心を74℃まで加熱します。", "삼겹살은 껍질 벗긴 새우 240g으로 바꿀 수 있으며 가장 두꺼운 새우와 반죽 중심을 74°C까지 익힙니다.", "เปลี่ยนหมูสามชั้นเป็นกุ้งปอกเปลือก 240 กรัมได้ ปรุงจนกุ้งชิ้นหนาสุดและใจกลางแป้งถึง 74°C")
    ],
    storage: ml("Refrigerate cooked pancakes and toppings separately within 2 hours for up to 2 days. Reheat the pancake on a covered skillet until the centre reaches 74°C, then add fresh measured toppings.", "熟煎餅 2 小時內冷藏，煎餅與配料分開最多 2 天；以加蓋平底鍋回熱至中心 74°C，再重新定量加配料。", "焼いた生地は2時間以内に冷蔵し、具とトッピングを分けて2日以内に使います。ふた付きフライパンで中心74℃まで温め、計量したトッピングを新たにのせます。", "익힌 전은 2시간 안에 냉장하고 전과 토핑을 따로 2일 이내 사용한다. 뚜껑 팬에서 중심 74°C까지 데운 뒤 토핑을 새로 계량해 올린다.", "แช่แพนเค้กสุกภายใน 2 ชั่วโมง เก็บแผ่นกับหน้าแยกกันได้ 2 วัน อุ่นในกระทะมีฝาจนใจกลางถึง 74°C แล้วใส่หน้าใหม่ตามปริมาณ"),
    cultureNote: ml("Okonomiyaki is a beloved Osaka-style street and home dish whose name means ‘grill what you like’; cabbage gives the batter its characteristic structure.", "御好燒是大阪家常與街頭料理，名稱意指「把喜歡的東西煎起來」；高麗菜讓麵糊形成標誌性結構。", "お好み焼きは大阪の家庭と屋台で親しまれ、「好みのものを焼く」という名の通り、キャベツが独特の生地を作ります。", "오코노미야키는 오사카 가정과 노점에서 사랑받는 요리로 이름은 ‘좋아하는 것을 굽는다’는 뜻이며 양배추가 특유의 구조를 만듭니다.", "โอโคโนมิยากิเป็นอาหารบ้านและแผงลอยโอซากา ชื่อหมายถึง ‘ย่างสิ่งที่ชอบ’ และกะหล่ำปลีสร้างโครงสร้างเฉพาะของแป้ง"),
    sources: [
      { title: "Just One Cookbook — Authentic Okonomiyaki Recipe", url: "https://www.justonecookbook.com/okonomiyaki/" },
      { title: "Kikkoman — Okonomiyaki recipe search and Washoku guidance", url: "https://www.kikkoman.com/en/cookbook/washoku/" }
    ],
    imageAlt: ml("Osaka-style okonomiyaki topped with dark sauce, mayonnaise, aonori, and bonito flakes", "淋深色醬汁、日式美乃滋、青海苔與柴魚片的大阪風御好燒", "濃いソース、マヨネーズ、青のり、かつお節をのせた大阪風お好み焼き", "진한 소스, 마요네즈, 아오노리, 가쓰오부시를 올린 오사카식 오코노미야키", "โอโคโนมิยากิสไตล์โอซาการาดซอสเข้ม มายองเนส อาโอโนริ และปลาโอแห้ง"),
    visualSpec: "Thick cabbage-and-pork okonomiyaki topped visibly with dark okonomiyaki sauce, Japanese mayonnaise, aonori, and katsuobushi; no unlisted garnish visible."
  },
  {
    id: "takoyaki",
    cuisine: "japanese",
    region: ml("Osaka, Japan", "日本大阪", "日本・大阪", "일본 오사카", "โอซากา ประเทศญี่ปุ่น"),
    prepMinutes: 25,
    cookMinutes: 20,
    totalMinutes: 45,
    servings: 4,
    name: ml("Takoyaki", "章魚燒", "たこ焼き", "타코야키", "ทาโกะยากิ"),
    description: ml(
      "Tender octopus pieces sit inside crisp-edged batter balls, cooked in two pan batches and finished with measured sauce, mayonnaise, aonori, and bonito flakes.",
      "熟章魚塊包在外緣酥脆的麵糊球中，分兩批用模具煎熟，最後定量加章魚燒醬、美乃滋、青海苔與柴魚片。",
      "やわらかなゆでだこを香ばしい生地の球に包み、2回に分けて焼き、計量したソース、マヨネーズ、青のり、かつお節で仕上げます。",
      "부드러운 삶은 문어를 바삭한 반죽 공에 넣어 두 번 나누어 굽고 계량한 소스, 마요네즈, 아오노리, 가쓰오부시로 마무리합니다.",
      "ใส่ชิ้นปลาหมึกต้มเนื้อนุ่มในลูกแป้งขอบกรอบ ย่างด้วยกระทะหลุมสองชุด แล้วราดซอส มายองเนส อาโอโนริ และปลาโอแห้งตามปริมาณ"
    ),
    ingredients: [
      ingredient("180 g", ml("boiled octopus, cut into 1.3 cm pieces", "熟章魚，切 1.3 公分塊", "ゆでだこ（1.3cm角）", "삶은 문어, 1.3cm 조각", "ปลาหมึกต้ม หั่นชิ้น 1.3 ซม.")),
      ingredient("120 g", ml("all-purpose flour", "中筋麵粉", "薄力粉", "중력분", "แป้งอเนกประสงค์")),
      ingredient("4 g", ml("baking powder", "泡打粉", "ベーキングパウダー", "베이킹파우더", "ผงฟู")),
      ingredient("3 g", ml("fine salt", "細鹽", "塩", "고운 소금", "เกลือละเอียด")),
      ingredient("360 ml", ml("dashi", "日式高湯", "だし", "다시", "ดาชิ")),
      ingredient(ml("2 large / 100 g", "2 顆大蛋 / 100 公克", "大2個 / 100 g", "대란 2개 / 100 g", "ไข่ฟองใหญ่ 2 ฟอง / 100 กรัม"), ml("eggs", "雞蛋", "卵", "달걀", "ไข่ไก่")),
      ingredient("5 ml", ml("soy sauce for the batter", "麵糊用醬油", "生地用しょうゆ", "반죽용 간장", "ซีอิ๊วสำหรับแป้ง")),
      ingredient("60 g", ml("tenkasu tempura scraps", "天かす／天婦羅碎屑", "天かす", "텐카스 튀김 부스러기", "เศษแป้งเทมปุระเท็นคาสุ")),
      ingredient("30 ml", ml("neutral oil for the takoyaki pan", "章魚燒模具用中性油", "たこ焼き器用のくせのない油", "타코야키 팬용 중성유", "น้ำมันรสกลางสำหรับกระทะทาโกะยากิ")),
      ingredient("120 g", ml("takoyaki sauce", "章魚燒醬", "たこ焼きソース", "타코야키 소스", "ซอสทาโกะยากิ")),
      ingredient("80 g", ml("Japanese mayonnaise", "日式美乃滋", "マヨネーズ", "일본식 마요네즈", "มายองเนสญี่ปุ่น")),
      ingredient("4 g", ml("aonori dried green laver", "青海苔粉", "青のり", "아오노리 김가루", "อาโอโนริสาหร่ายเขียวแห้ง")),
      ingredient("8 g", ml("katsuobushi dried bonito flakes", "柴魚片", "かつお節", "가쓰오부시 가다랑어포", "ปลาโอแห้งคัตสึโอะบุชิ"))
    ],
    instructions: [
      {
        title: ml("Cut the cooked octopus", "切熟章魚", "ゆでだこを切る", "삶은 문어 썰기", "หั่นปลาหมึกต้ม"),
        body: ml(
          "Cut 180 g fully cooked octopus into 1.3 cm pieces, keeping 24 equal pieces for the 24 takoyaki. Pat them dry and keep them chilled in a clean covered dish.",
          "將 180 公克全熟章魚切成 1.3 公分塊，分成 24 等份供 24 顆章魚燒使用；擦乾後放乾淨有蓋容器冷藏。",
          "加熱済みのたこ180gを1.3cm角に切り、24個のたこ焼き用に同じ大きさを24個用意します。水気を拭き、清潔なふた付き容器で冷やします。",
          "완전히 익힌 문어 180g을 1.3cm 조각으로 썰어 타코야키 24개용으로 같은 크기 24개를 준비한다. 물기를 닦고 깨끗한 뚜껑 용기에 넣어 차갑게 둔다.",
          "หั่นปลาหมึกสุกเต็มที่ 180 กรัมเป็นชิ้น 1.3 ซม. เตรียม 24 ชิ้นเท่ากันสำหรับทาโกะยากิ 24 ลูก ซับให้แห้งและแช่เย็นในภาชนะสะอาดมีฝาปิด"
        )
      },
      {
        title: ml("Whisk the batter", "拌勻麵糊", "生地を混ぜる", "반죽 섞기", "ผสมแป้ง"),
        body: ml(
          "Whisk 120 g flour, 4 g baking powder, and 3 g salt with 360 ml dashi. Beat in two eggs, 100 g total, and 5 ml soy sauce until smooth, then rest the batter covered for 10 minutes.",
          "將 120 公克麵粉、4 公克泡打粉與 3 公克鹽和 360 毫升高湯拌勻，加入兩顆共 100 公克的雞蛋與 5 毫升醬油打滑，加蓋靜置 10 分鐘。",
          "薄力粉120g、ベーキングパウダー4g、塩3gをだし360mlに混ぜます。卵2個（合計100g）としょうゆ5mlを加えて滑らかにし、覆って10分休ませます。",
          "중력분 120g, 베이킹파우더 4g, 소금 3g을 다시 360ml와 섞는다. 달걀 두 개(총 100g)와 간장 5ml를 넣어 매끈하게 만든 뒤 덮어 10분 쉰다.",
          "ผสมแป้ง 120 กรัม ผงฟู 4 กรัม และเกลือ 3 กรัมกับดาชิ 360 มล. ตีไข่ 2 ฟองรวม 100 กรัมกับซีอิ๊ว 5 มล.ให้เนียน ปิดพัก 10 นาที"
        )
      },
      {
        title: ml("Heat and oil the pan", "加熱章魚燒模具", "たこ焼き器を熱して油を塗る", "팬 달구고 기름 바르기", "อุ่นและทาน้ำมันกระทะหลุม"),
        body: ml(
          "Heat a clean 24-hole takoyaki pan over medium heat until the cooking surface reaches about 200°C. Brush all wells and the flat surface with 30 ml neutral oil; set one clean thermometer and two clean picks aside.",
          "乾淨 24 孔章魚燒模具以中火加熱至表面約 200°C，所有孔洞與平面刷上 30 毫升中性油；備妥乾淨溫度計與兩支竹籤。",
          "清潔な24穴たこ焼き器を中火で加熱し、調理面を約200℃にします。全ての穴と平面に油30mlを塗り、清潔な温度計と竹串2本を用意します。",
          "깨끗한 24구 타코야키 팬을 중불로 달궈 표면이 약 200°C가 되게 한다. 모든 구멍과 평면에 중성유 30ml를 바르고 깨끗한 온도계와 꼬치 두 개를 준비한다.",
          "อุ่นกระทะทาโกะยากิ 24 หลุมสะอาดด้วยไฟกลางจนพื้นผิวประมาณ 200°C ทาน้ำมันรสกลาง 30 มล.ทั่วหลุมและพื้นกระทะ เตรียมเทอร์โมมิเตอร์และไม้ปลายแหลมสะอาดสองอัน"
        )
      },
      {
        title: ml("Fill the first 12 wells", "填入第一批 12 孔", "最初の12穴に流す", "첫 12구 채우기", "เทชุดแรก 12 หลุม"),
        body: ml(
          "Pour batter into 12 wells until slightly overfilled. Put one chilled 1.3 cm octopus piece in each and scatter 30 g tenkasu around them. Keep the remaining batter, octopus, and tenkasu covered and separate until the second batch.",
          "麵糊倒入 12 個孔洞至略滿，每孔放一塊冷藏 1.3 公分章魚，再撒 30 公克天かす；其餘麵糊、章魚與天かす加蓋分開保存，等待第二批。",
          "12穴に生地を少しあふれる程度に流し、各穴に冷やした1.3cmのたこを1個入れ、天かす30gを散らします。残りの生地、たこ、天かすは覆って分けておきます。",
          "12구에 반죽을 약간 넘치게 붓고 각 구멍에 차갑게 둔 1.3cm 문어 한 조각을 넣은 뒤 텐카스 30g을 뿌린다. 남은 반죽·문어·텐카스는 덮어 따로 둔다.",
          "เทแป้งลง 12 หลุมให้ล้นเล็กน้อย ใส่ปลาหมึกเย็นชิ้น 1.3 ซม.หลุมละชิ้น โรยเท็นคาสุ 30 กรัม คลุมแป้ง ปลาหมึก และเท็นคาสุที่เหลือแยกไว้สำหรับชุดสอง"
        )
      },
      {
        title: ml("Set the bottoms", "煎定底部", "底を固める", "바닥 굳히기", "ทำให้ก้นเซ็ต"),
        body: ml(
          "Cook the first batch at about 200°C for 3 minutes, until the batter at the bottom is set and lightly browned. Break the connected overflow between wells with a clean pick without scraping the pan.",
          "第一批以約 200°C 煎 3 分鐘，直到底部麵糊定型並略上色；用乾淨竹籤切開孔洞間相連的溢出麵糊，不要刮傷模具。",
          "最初の回を約200℃で3分、底の生地が固まり薄く色づくまで焼きます。清潔な竹串で穴の間のつながった生地を切り、器具を傷つけません。",
          "첫 배치를 약 200°C에서 3분, 바닥 반죽이 굳고 살짝 갈색이 될 때까지 굽는다. 깨끗한 꼬치로 구멍 사이 연결된 반죽을 끊되 팬을 긁지 않는다.",
          "ย่างชุดแรกที่ประมาณ 200°C 3 นาทีจนแป้งก้นเซ็ตและเป็นสีน้ำตาลอ่อน ใช้ไม้ปลายแหลมสะอาดตัดแป้งที่เชื่อมระหว่างหลุมโดยไม่ขูดกระทะ"
        )
      },
      {
        title: ml("Rotate until round", "翻轉煎圓", "返して丸く焼く", "돌려 둥글게 굽기", "หมุนให้กลม"),
        body: ml(
          "Rotate each ball a quarter turn with two clean picks, then keep turning every 30–45 seconds for 4 minutes. Add a few drops of oil only if the wells look dry; keep the outside browned and the inside steaming.",
          "用兩支乾淨竹籤將每顆轉四分之一圈，之後每 30–45 秒持續轉動 4 分鐘；孔洞乾澀才補幾滴油，讓外層上色、內部保持蒸熱。",
          "清潔な竹串2本で各玉を4分の1回転させ、30〜45秒ごとに4分間回し続けます。穴が乾けば油を数滴足し、外側を色づけ中を蒸し焼きにします。",
          "깨끗한 꼬치 두 개로 각 공을 4분의 1씩 돌린 뒤 30–45초마다 4분 계속 돌린다. 구멍이 마르면 기름 몇 방울만 더해 겉은 갈색, 속은 김으로 익힌다.",
          "หมุนลูกละหนึ่งในสี่รอบด้วยไม้สะอาดสองอัน แล้วหมุนทุก 30–45 วินาทีต่อ 4 นาที เติมน้ำมันไม่กี่หยดเฉพาะเมื่อหลุมแห้ง ให้ด้านนอกเป็นสีน้ำตาลและด้านในร้อนด้วยไอน้ำ"
        )
      },
      {
        title: ml("Finish the second batch", "完成第二批", "2回目を焼き上げる", "두 번째 배치 완성", "ทำชุดที่สองให้เสร็จ"),
        body: ml(
          "Transfer the first 12 balls to a clean plate and repeat the fill, set, and rotation sequence for the remaining 12 using the covered batter, octopus, and 30 g tenkasu. Check one ball from each batch; the batter and octopus centre must reach at least 74°C, with opaque firm octopus.",
          "第一批 12 顆移到乾淨盤，再用覆蓋的麵糊、章魚與 30 公克天かす重複填孔、定型與翻轉流程完成剩下 12 顆。每批各測一顆，麵糊與章魚中心至少 74°C，章魚須不透明緊實。",
          "最初の12個を清潔な皿へ移し、覆っておいた生地、たこ、天かす30gで残り12個を同じ手順で焼きます。各回から1個を測り、生地とたこの中心を74℃以上、たこを不透明で締まった状態にします。",
          "첫 12개를 깨끗한 접시에 옮기고 덮어 둔 반죽·문어·텐카스 30g으로 나머지 12개도 같은 순서로 굽는다. 각 배치 한 개씩 재어 반죽과 문어 중심이 최소 74°C, 문어가 불투명하고 단단한지 확인한다.",
          "ย้าย 12 ลูกแรกใส่จานสะอาด แล้วทำซ้ำด้วยแป้ง ปลาหมึก และเท็นคาสุ 30 กรัมที่คลุมไว้สำหรับอีก 12 ลูก ตรวจชุดละหนึ่งลูก ให้ใจกลางแป้งและปลาหมึกถึงอย่างน้อย 74°C และเนื้อปลาหมึกทึบแน่น"
        )
      },
      {
        title: ml("Measure the four toppings", "定量加四種配料", "4種の仕上げを計量する", "네 가지 토핑 계량하기", "ตวงหน้าสี่อย่าง"),
        body: ml(
          "Divide 24 hot takoyaki among four plates, six per plate. For each plate, use exactly 30 g takoyaki sauce, 20 g Japanese mayonnaise, 1 g aonori, and 2 g katsuobushi. Serve immediately; no other garnish is part of this recipe.",
          "24 顆熱章魚燒分成四盤，每盤 6 顆；每盤精確使用 30 公克章魚燒醬、20 公克日式美乃滋、1 公克青海苔與 2 公克柴魚片。立即上桌，不加其他裝飾。",
          "熱いたこ焼き24個を4皿に6個ずつ分けます。各皿にたこ焼きソース30g、マヨネーズ20g、青のり1g、かつお節2gを正確にのせ、他の薬味は加えずすぐ供します。",
          "뜨거운 타코야키 24개를 네 접시에 6개씩 나눈다. 접시마다 타코야키 소스 30g, 일본식 마요네즈 20g, 아오노리 1g, 가쓰오부시 2g만 정확히 올려 즉시 낸다.",
          "แบ่งทาโกะยากิร้อน 24 ลูกใส่ 4 จาน จานละ 6 ลูก ใช้ซอสทาโกะยากิ 30 กรัม มายองเนสญี่ปุ่น 20 กรัม อาโอโนริ 1 กรัม และปลาโอแห้ง 2 กรัมต่อจานอย่างแม่นยำ เสิร์ฟทันทีไม่ใส่หน้าอื่น"
        )
      }
    ],
    tips: [
      ml("A well-oiled, fully heated pan lets the batter release while you rotate it.", "模具充分加熱並塗油，麵糊才會在翻轉時順利脫離。", "器具を十分熱して油を塗ると、返すときに生地が離れます。", "팬을 충분히 달구고 기름칠해야 돌릴 때 반죽이 잘 떨어집니다.", "อุ่นกระทะเต็มที่และทาน้ำมันเพื่อให้แป้งหลุดตอนหมุน"),
      ml("Use a thermometer on one ball per batch; colour alone cannot prove the octopus and batter are safe.", "每批用溫度計測一顆，不能只靠顏色判斷章魚與麵糊安全熟度。", "各回1個を温度計で測り、色だけでたこと生地の安全な火通りを判断しません。", "배치마다 한 개는 온도계를 쓰며 색만으로 문어와 반죽의 안전한 익음을 판단하지 않습니다.", "ใช้เทอร์โมมิเตอร์ตรวจชุดละลูก สีอย่างเดียวพิสูจน์ความสุกปลอดภัยของปลาหมึกและแป้งไม่ได้")
    ],
    commonMistakes: [
      ml("Turning too early tears the batter; wait until the bottom has set and browned.", "太早翻轉會扯破麵糊，要等底部定型上色。", "早く返すと生地が裂けるので、底が固まり色づくまで待ちます。", "너무 일찍 돌리면 반죽이 찢어지므로 바닥이 굳고 갈색이 될 때까지 기다립니다.", "หมุนเร็วเกินไปทำให้แป้งขาด รอให้ก้นเซ็ตและเป็นสีน้ำตาลก่อน"),
      ml("Raw batter tools must not touch the finished sauced balls; use clean picks and plates after cooking.", "生麵糊用具不可接觸已淋醬的熟章魚燒，熟後要換乾淨竹籤與盤子。", "生地用の道具をソースをかけた焼き上がりに触れさせず、加熱後は清潔な串と皿を使います。", "생반죽 도구를 소스를 올린 익은 타코야키에 쓰지 말고 조리 후 깨끗한 꼬치와 접시를 사용합니다.", "อย่าให้อุปกรณ์แป้งดิบแตะลูกที่สุกและราดซอสแล้ว ใช้ไม้กับจานสะอาดหลังปรุง")
    ],
    substitutions: [
      ml("Use 180 g cooked shrimp cut into 1.3 cm pieces instead of octopus; still verify 74°C in the centre.", "章魚可改用 180 公克熟蝦切 1.3 公分塊，中心仍須確認 74°C。", "たこは加熱済みえび180g（1.3cm角）に替えられますが、中心74℃を確認します。", "문어는 익힌 새우 180g을 1.3cm로 잘라 바꿀 수 있지만 중심 74°C를 확인합니다.", "ใช้กุ้งสุก 180 กรัมหั่น 1.3 ซม.แทนปลาหมึกได้ แต่ยังต้องตรวจใจกลาง 74°C"),
      ml("Replace dashi with 360 ml unsalted vegetable stock for a seafood-free batter base, keeping the octopus filling.", "高湯可用 360 毫升無鹽蔬菜高湯替代，章魚內餡維持不變。", "だしは無塩の野菜だし360mlに替えられますが、たこの具はそのまま使います。", "다시는 무염 채소 육수 360ml로 바꿀 수 있지만 문어 속은 유지합니다.", "เปลี่ยนดาชิเป็นน้ำสต๊อกผักไม่เค็ม 360 มล.ได้ โดยคงไส้ปลาหมึก")
    ],
    storage: ml("Serve immediately for the best texture. Refrigerate plain cooked balls without toppings for up to 2 days; reheat on a pan until the centre reaches 74°C, then add fresh measured toppings.", "最好立即食用。未加配料的熟章魚燒密封冷藏最多 2 天；以平底鍋回熱至中心 74°C，再重新定量加配料。", "食感のためすぐ食べます。トッピング前の焼き玉は密閉冷蔵2日以内にし、中心74℃まで温めてから計量した仕上げをのせます。", "식감은 즉시 먹는 것이 좋다. 토핑 전 익힌 공은 밀폐 냉장 2일 이내 보관하고 팬에서 중심 74°C까지 데운 뒤 토핑을 새로 계량한다.", "ควรกินทันทีเพื่อเนื้อสัมผัส เก็บลูกสุกที่ยังไม่ใส่หน้าในตู้เย็นปิดสนิทได้ 2 วัน อุ่นในกระทะจนใจกลาง 74°C แล้วใส่หน้าตามปริมาณใหม่"),
    cultureNote: ml("Takoyaki is an Osaka street-food tradition cooked in round iron wells; turning the set batter creates the familiar sphere and crisp shell.", "章魚燒是大阪街頭小吃傳統，在圓孔鐵板中煎烤，持續翻轉定型成熟悉的球形酥殼。", "たこ焼きは大阪の屋台文化で、丸い鉄板の穴で生地を返しながら球形と香ばしい殻を作ります。", "타코야키는 오사카 노점 전통으로 둥근 철판 구멍에서 반죽을 돌려 익숙한 공 모양과 바삭한 껍질을 만듭니다.", "ทาโกะยากิเป็นวัฒนธรรมอาหารริมทางโอซากา ปรุงในหลุมเหล็กกลมและหมุนแป้งให้เป็นลูกกลมเปลือกหอมกรอบ"),
    sources: [
      { title: "Just One Cookbook — Takoyaki Recipe (Japanese Octopus Balls)", url: "https://www.justonecookbook.com/takoyaki-recipe/" },
      { title: "Japanese Cooking 101 — Takoyaki Recipe", url: "https://www.japanesecooking101.com/takoyaki-recipe/" }
    ],
    imageAlt: ml("Takoyaki balls topped with dark sauce, Japanese mayonnaise, aonori, and bonito flakes on a white plate", "白盤上淋深色醬、美乃滋、青海苔與柴魚片的章魚燒", "白い皿に盛った、濃いソース、マヨネーズ、青のり、かつお節のたこ焼き", "흰 접시에 담긴 진한 소스, 마요네즈, 아오노리, 가쓰오부시 타코야키", "ทาโกะยากิบนจานขาวราดซอสเข้ม มายองเนส อาโอโนริ และปลาโอแห้ง"),
    visualSpec: "Round takoyaki topped visibly with dark sauce, Japanese mayonnaise, aonori, and katsuobushi; no unlisted garnish visible."
  },
  {
    id: "japanese-gyoza",
    cuisine: "japanese",
    region: ml("Japan", "日本", "日本", "일본", "ญี่ปุ่น"),
    prepMinutes: 40,
    cookMinutes: 20,
    totalMinutes: 60,
    servings: 4,
    name: ml("Japanese pork gyoza", "日式豬肉煎餃", "豚肉の焼き餃子", "일본식 돼지고기 교자", "เกี๊ยวซ่าหมูแบบญี่ปุ่น"),
    description: ml(
      "Juicy pork, cabbage, scallion, garlic, and ginger are sealed in wrappers, pan-fried until the bottoms are crisp, steamed briefly, then dried and served with soy-vinegar dip.",
      "豬肉、高麗菜、青蔥、蒜與薑包入餃子皮，先煎出焦脆底部、加水蒸熟再收乾，搭配醬油醋沾醬。",
      "豚肉、キャベツ、ねぎ、にんにく、しょうがを皮で包み、底を香ばしく焼いて水蒸しし、水分を飛ばしてしょうゆ酢だれで食べます。",
      "돼지고기, 양배추, 대파, 마늘, 생강을 피에 싸 바닥을 바삭하게 굽고 물을 부어 찐 뒤 수분을 날려 간장 식초장과 냅니다.",
      "ห่อหมู กะหล่ำปลี ต้นหอม กระเทียม และขิงในแผ่นเกี๊ยว จี่ก้นให้กรอบ เติมน้ำอบไอน้ำจนสุก ผัดไล่น้ำแล้วเสิร์ฟกับซอสซีอิ๊วผสมน้ำส้ม"
    ),
    ingredients: [
      ingredient(ml("24 sheets / about 240 g", "24 張 / 約 240 公克", "24枚 / 約 240 g", "24장 / 약 240 g", "24 แผ่น / ประมาณ 240 กรัม"), ml("round gyoza wrappers", "圓形餃子皮，24 張／約 240 公克", "丸い餃子の皮（24枚、約240g）", "원형 교자피 24장, 약 240g", "แผ่นเกี๊ยวซ่ากลม 24 แผ่น ประมาณ 240 กรัม")),
      ingredient("220 g", ml("ground pork", "豬絞肉", "豚ひき肉", "다진 돼지고기", "หมูบด")),
      ingredient("180 g", ml("green cabbage, finely chopped", "綠高麗菜，切細", "青キャベツ（細かく刻む）", "초록 양배추, 잘게 다지기", "กะหล่ำปลีเขียวสับละเอียด")),
      ingredient("30 g", ml("scallions, finely chopped", "青蔥，切細", "長ねぎ（みじん切り）", "대파, 잘게 다지기", "ต้นหอมสับละเอียด")),
      ingredient("6 g", ml("garlic, finely grated", "蒜泥", "にんにく（すりおろし）", "마늘, 곱게 간 것", "กระเทียมขูดละเอียด")),
      ingredient("6 g", ml("fresh ginger, finely grated", "新鮮薑泥", "しょうが（すりおろし）", "생강, 곱게 간 것", "ขิงสดขูดละเอียด")),
      ingredient("20 ml", ml("soy sauce for the filling", "餡料用醬油", "あん用しょうゆ", "소용 간장", "ซีอิ๊วสำหรับไส้")),
      ingredient("10 ml", ml("sake for the filling", "餡料用清酒", "あん用酒", "소용 사케", "สาเกสำหรับไส้")),
      ingredient("6 ml", ml("toasted sesame oil for the filling", "餡料用烘香芝麻油", "あん用ごま油", "소용 참기름", "น้ำมันงาคั่วสำหรับไส้")),
      ingredient("8 g", ml("potato starch for the filling", "餡料用馬鈴薯澱粉", "あん用片栗粉", "소용 감자전분", "แป้งมันฝรั่งสำหรับไส้")),
      ingredient("3 g", ml("fine salt for the cabbage", "高麗菜用細鹽", "キャベツ用塩", "양배추용 고운 소금", "เกลือละเอียดสำหรับกะหล่ำ")),
      ingredient("30 ml", ml("neutral oil for two frying batches", "兩批煎餃用中性油", "2回分の焼き用油", "두 배치 부침용 중성유", "น้ำมันรสกลางสำหรับทอดสองชุด")),
      ingredient("140 ml", ml("water for two steaming batches", "兩批蒸煎用水", "2回分の蒸し焼き用水", "두 배치 찜용 물", "น้ำสำหรับอบไอน้ำสองชุด")),
      ingredient("10 ml", ml("toasted sesame oil for crisping", "收乾用烘香芝麻油", "仕上げ用ごま油", "마무리용 참기름", "น้ำมันงาคั่วสำหรับทำให้กรอบ")),
      ingredient("60 ml", ml("soy sauce for the dipping sauce", "沾醬用醬油", "たれ用しょうゆ", "찍어 먹는 소스용 간장", "ซีอิ๊วสำหรับน้ำจิ้ม")),
      ingredient("30 ml", ml("unseasoned rice vinegar for the dipping sauce", "沾醬用無調味米醋", "たれ用米酢", "찍어 먹는 소스용 쌀식초", "น้ำส้มสายชูข้าวไม่ปรุงสำหรับน้ำจิ้ม"))
    ],
    instructions: [
      {
        title: ml("Salt and drain cabbage", "鹽醃擠乾高麗菜", "キャベツに塩をして水を切る", "양배추 소금에 절여 물 빼기", "คลุกเกลือและบีบน้ำกะหล่ำ"),
        body: ml(
          "Mix 180 g finely chopped cabbage with 3 g salt and rest for 10 minutes. Squeeze out all visible water, weighing 180 g before squeezing, so the filling will not make the wrappers wet.",
          "將 180 公克高麗菜末與 3 公克鹽拌勻靜置 10 分鐘，擠出所有可見水分；重量以擠水前 180 公克計，避免餡料弄濕餃子皮。",
          "刻んだキャベツ180gに塩3gを混ぜて10分置き、見える水分を全て絞ります。重量は絞る前の180gで計り、皮が湿らないようにします。",
          "잘게 다진 양배추 180g에 소금 3g을 섞어 10분 둔 뒤 보이는 물을 모두 짠다. 짜기 전 180g을 기준으로 계량해 피가 젖지 않게 한다.",
          "คลุกกะหล่ำปลีสับ 180 กรัมกับเกลือ 3 กรัม พัก 10 นาทีแล้วบีบน้ำที่เห็นออกให้หมด ชั่ง 180 กรัมก่อนบีบเพื่อไม่ให้แผ่นเกี๊ยวเปียก"
        )
      },
      {
        title: ml("Mix the pork filling", "拌豬肉餡", "豚肉あんを練る", "돼지고기 소 섞기", "ผสมไส้หมู"),
        body: ml(
          "Combine 220 g ground pork, the drained cabbage, 30 g scallion, 6 g garlic, 6 g ginger, 20 ml soy sauce, 10 ml sake, 6 ml sesame oil, and 8 g potato starch. Mix in one direction for 3 minutes until sticky and cohesive, then chill 15 minutes; the mixture makes about 480 g, or 20 g for each of 24 wrappers.",
          "將 220 公克豬絞肉、擠乾高麗菜、30 公克青蔥、6 公克蒜泥、6 公克薑泥、20 毫升醬油、10 毫升清酒、6 毫升芝麻油與 8 公克馬鈴薯澱粉朝同方向拌 3 分鐘至黏稠成團，再冷藏 15 分鐘；餡料約 480 公克，每張皮分 20 公克。",
          "豚ひき肉220g、水を切ったキャベツ、ねぎ30g、にんにく6g、しょうが6g、しょうゆ20ml、酒10ml、ごま油6ml、片栗粉8gを同じ方向に3分練って粘りを出し、15分冷蔵します。全量約480g、皮1枚に20gずつです。",
          "다진 돼지고기 220g, 물 뺀 양배추, 대파 30g, 마늘 6g, 생강 6g, 간장 20ml, 사케 10ml, 참기름 6ml, 감자전분 8g을 한 방향으로 3분 끈기 있게 섞고 15분 냉장한다. 총 약 480g으로 피마다 20g씩 쓴다.",
          "ผสมหมูบด 220 กรัม กะหล่ำที่บีบน้ำ ต้นหอม 30 กรัม กระเทียม 6 กรัม ขิง 6 กรัม ซีอิ๊ว 20 มล. สาเก 10 มล. น้ำมันงา 6 มล. และแป้งมันฝรั่ง 8 กรัม คนทางเดียว 3 นาทีจนเหนียวจับตัว แช่เย็น 15 นาที ไส้รวมประมาณ 480 กรัม แบ่งแผ่นละ 20 กรัม"
        )
      },
      {
        title: ml("Fill and pleat 24 wrappers", "包 24 顆餃子", "24個を包む", "교자 24개 빚기", "ห่อเกี๊ยว 24 ชิ้น"),
        body: ml(
          "Divide the chilled filling into 24 portions of about 20 g. Place one portion in each round wrapper, moisten the edge with a little water, pleat and seal firmly without trapped air, and keep the finished dumplings covered.",
          "將冷藏餡料分成 24 份、每份約 20 公克，逐一放在圓形餃子皮中央，邊緣沾少量水後打褶封緊、不留空氣；包好的餃子全程加蓋。",
          "冷やしたあんを約20gずつ24等分します。丸い皮の中央に置き、縁を少量の水で濡らしてひだを寄せ、空気を残さず閉じ、包んだ餃子は覆います。",
          "차갑게 둔 소를 약 20g씩 24등분한다. 원형 피 중앙에 놓고 가장자리에 물을 조금 묻혀 주름을 잡아 공기 없이 단단히 봉한 뒤 완성 교자는 덮어 둔다.",
          "แบ่งไส้เย็นเป็น 24 ส่วน ส่วนละประมาณ 20 กรัม วางกลางแผ่นกลม แตะน้ำที่ขอบ จับจีบปิดแน่นโดยไม่ให้อากาศค้าง และคลุมเกี๊ยวที่ห่อแล้วไว้"
        )
      },
      {
        title: ml("Mix the soy-vinegar dip", "調醬油醋沾醬", "しょうゆ酢だれを作る", "간장 식초장 만들기", "ทำน้ำจิ้มซีอิ๊วน้ำส้ม"),
        body: ml(
          "Stir 60 ml soy sauce and 30 ml unseasoned rice vinegar together and divide into four small dipping dishes. Keep the dip away from the raw filling station and do not add chili oil or sesame.",
          "將 60 毫升醬油與 30 毫升無調味米醋拌勻，分入四個小沾醬碟；沾醬遠離生餡區，不加入辣油或芝麻。",
          "しょうゆ60mlと無調味米酢30mlを混ぜ、4つの小皿に分けます。たれは生肉の作業場所から離し、ラー油やごまは加えません。",
          "간장 60ml와 무조미 쌀식초 30ml를 섞어 작은 찍는 그릇 네 개에 나눈다. 소스는 생고기 작업대에서 떨어뜨리고 고추기름이나 참깨는 넣지 않는다.",
          "คนซีอิ๊ว 60 มล.กับน้ำส้มสายชูข้าวไม่ปรุง 30 มล. แบ่งใส่ถ้วยน้ำจิ้มสี่ใบ แยกจากพื้นที่ไส้ดิบและไม่เติมน้ำมันพริกหรืองา"
        )
      },
      {
        title: ml("Pan-fry the first 12", "煎第一批 12 顆", "最初の12個を焼く", "첫 12개 굽기", "ทอดกระทะชุดแรก 12 ชิ้น"),
        body: ml(
          "Heat 15 ml neutral oil in a wide nonstick skillet over medium-high. Arrange 12 gyoza in one layer with their flat bottoms down and fry for 2–3 minutes until the bottoms are golden brown; do not crowd the pan.",
          "寬不沾鍋以中大火加熱 15 毫升中性油，12 顆餃子平底朝下單層排好，煎 2–3 分鐘至底部金褐；鍋中不可擁擠。",
          "広いフッ素加工のフライパンを中強火で熱し、油15mlで12個を平らな底を下にして一層に並べます。底がきつね色になるまで2〜3分焼き、詰め込みません。",
          "넓은 논스틱 팬을 중강불로 달궈 중성유 15ml를 넣는다. 교자 12개를 평평한 바닥이 아래로 가게 한 겹으로 놓고 바닥이 황금갈색이 될 때까지 2–3분 굽는다. 빽빽하게 놓지 않는다.",
          "อุ่นกระทะเคลือบกว้างด้วยไฟกลางค่อนแรง ใส่น้ำมัน 15 มล. เรียงเกี๊ยว 12 ชิ้นชั้นเดียวให้ก้นแบนลง ทอด 2–3 นาทีจนก้นสีน้ำตาลทอง อย่าวางแน่น"
        )
      },
      {
        title: ml("Steam until the pork is 74°C", "加水蒸至豬肉 74°C", "水を加えて74℃まで蒸し焼き", "물을 넣고 돼지고기 74°C까지 찌기", "เติมน้ำอบจนหมูถึง 74°C"),
        body: ml(
          "Pour 70 ml water around the dumplings, cover immediately, and steam-fry for 4–5 minutes. The wrappers should be tender and the pork filling must reach at least 74°C in the centre; keep the lid on while the filling cooks.",
          "沿鍋邊倒入 70 毫升水並立即加蓋，蒸煎 4–5 分鐘。餃子皮應柔軟，豬肉餡中心至少達 74°C；餡料加熱期間保持加蓋。",
          "餃子の周りから水70mlを注ぎ、すぐふたをして4〜5分蒸し焼きにします。皮が柔らかくなり、豚あんの中心が74℃以上になるまでふたを保ちます。",
          "교자 주위로 물 70ml를 붓고 즉시 덮어 4–5분 찌듯 굽는다. 피가 부드러워지고 돼지고기 소 중심이 최소 74°C가 될 때까지 뚜껑을 유지한다.",
          "เทน้ำ 70 มล.รอบเกี๊ยวแล้วปิดฝาทันที อบไอน้ำ 4–5 นาที แผ่นควรนุ่มและใจกลางไส้หมูต้องถึงอย่างน้อย 74°C ปิดฝาระหว่างไส้สุก"
        )
      },
      {
        title: ml("Dry and crisp the first batch", "收乾煎脆第一批", "水分を飛ばして焼き目を戻す", "첫 배치 수분 날려 바삭하게", "ไล่น้ำให้ชุดแรกกรอบ"),
        body: ml(
          "Remove the lid and cook until all water evaporates. Add 5 ml sesame oil around the edges and fry uncovered for 1–2 minutes until the bottoms are crisp again. Transfer to a clean plate and repeat with the second 12 using the remaining 15 ml oil, 70 ml water, and 5 ml sesame oil.",
          "開蓋煮至水分完全蒸發，沿邊加入 5 毫升芝麻油，不加蓋煎 1–2 分鐘讓底部重新酥脆。移到乾淨盤，再用剩下的 15 毫升油、70 毫升水與 5 毫升芝麻油完成第二批 12 顆。",
          "ふたを外して水分を完全に飛ばします。縁からごま油5mlを回し、ふたなしで1〜2分焼いて底を再びカリッとさせます。清潔な皿に移し、残りの油15ml、水70ml、ごま油5mlで12個をもう一度焼きます。",
          "뚜껑을 열고 물이 모두 증발할 때까지 익힌다. 가장자리에 참기름 5ml를 둘러 뚜껑 없이 1–2분 구워 바닥을 다시 바삭하게 한다. 깨끗한 접시에 옮기고 남은 기름 15ml, 물 70ml, 참기름 5ml로 두 번째 12개를 반복한다.",
          "เปิดฝาไล่น้ำจนหมด เติมน้ำมันงา 5 มล.รอบขอบ ทอดเปิดฝาอีก 1–2 นาทีให้ก้นกลับมากรอบ ย้ายใส่จานสะอาด แล้วทำซ้ำอีก 12 ชิ้นด้วยน้ำมัน 15 มล. น้ำ 70 มล. และน้ำมันงา 5 มล.ที่เหลือ"
        )
      },
      {
        title: ml("Serve six with soy-vinegar dip", "每份六顆搭配醬油醋", "6個ずつしょうゆ酢で供する", "여섯 개씩 간장 식초장과 내기", "เสิร์ฟหกชิ้นกับน้ำจิ้ม"),
        body: ml(
          "Arrange six crisp-bottomed gyoza per serving on clean plates, for four servings total, with the soy-vinegar dip on the side. Keep the golden bottoms facing up and add no scallion, sesame, chili oil, or other garnish.",
          "四份各將 6 顆焦脆底部朝上排在乾淨盤中，醬油醋沾醬另放；不加青蔥、芝麻、辣油或其他裝飾。",
          "4人分として、底のカリッとした餃子を一人6個ずつ清潔な皿に並べ、しょうゆ酢だれを添えます。ねぎ、ごま、ラー油などの薬味は加えません。",
          "네 접시에 바닥이 바삭한 교자를 6개씩 담아 총 네 인분으로 내고 간장 식초장을 곁들인다. 대파, 참깨, 고추기름 등 고명은 더하지 않는다.",
          "จัดเกี๊ยวก้นกรอบจานละ 6 ชิ้นรวม 4 ที่บนจานสะอาด เสิร์ฟน้ำจิ้มซีอิ๊วน้ำส้มแยกด้านข้าง ไม่ใส่ต้นหอม งา น้ำมันพริก หรือเครื่องตกแต่งอื่น"
        )
      }
    ],
    tips: [
      ml("Squeezing the cabbage dry and mixing the filling until sticky keeps the seams sealed while steaming.", "高麗菜擠乾、餡料拌到黏稠，蒸煎時封口才不易裂開。", "キャベツを絞り、あんに粘りを出すと蒸し焼き中に合わせ目が開きません。", "양배추 물기를 짜고 소를 끈기 있게 섞어야 찔 때 이음새가 벌어지지 않습니다.", "บีบน้ำกะหล่ำและคนไส้จนเหนียวเพื่อให้รอยปิดไม่เปิดตอนอบไอน้ำ"),
      ml("A single layer and a fully evaporated steam liquid are what make the lacy bottom crisp.", "單層排放並把蒸煎水分完全收乾，才會形成焦脆底。", "一層に並べ、蒸し水を完全に飛ばすと底の薄い焼き目がカリッとします。", "한 겹으로 놓고 찜물이 완전히 날아가야 바닥이 바삭한 갈색이 됩니다.", "วางชั้นเดียวและไล่น้ำจนหมดจึงได้ก้นลายกรอบ")
    ],
    commonMistakes: [
      ml("Wet cabbage or loose filling can split the wrapper; drain and knead before folding.", "高麗菜未擠乾或餡料鬆散會撐裂餃子皮，包之前要瀝乾並拌黏。", "キャベツが濡れたまま、あんが緩いと皮が裂けるため、包む前に絞って練ります。", "양배추가 젖었거나 소가 묽으면 피가 터지므로 빚기 전에 물을 빼고 치댄다.", "กะหล่ำเปียกหรือไส้หลวมทำให้แผ่นแตก ต้องสะเด็ดและนวดก่อนห่อ"),
      ml("Do not leave cooked gyoza in steam or stack them; trapped moisture softens the crisp bottom.", "熟餃子不要留在蒸氣中或堆疊，水氣會使焦脆底回軟。", "焼き上がりを蒸気の中に置いたり重ねたりすると、底が湿って柔らかくなります。", "익은 교자를 찜기에 두거나 쌓으면 수분으로 바닥이 눅눅해집니다.", "อย่าทิ้งเกี๊ยวสุกไว้ในไอน้ำหรือวางซ้อน ความชื้นจะทำให้ก้นกรอบนิ่ม")
    ],
    substitutions: [
      ml("Use 300 g finely chopped chicken thigh instead of pork and still cook the centre to 74°C.", "豬肉可改用 300 公克切細雞腿肉，中心仍須煮至 74°C。", "豚肉は細かく刻んだ鶏もも肉300gに替え、中心74℃まで加熱します。", "돼지고기는 잘게 다진 닭다리살 300g으로 바꾸고 중심 74°C까지 익힌다.", "เปลี่ยนหมูเป็นน่องไก่สับละเอียด 300 กรัมได้ แต่ยังต้องทำใจกลางถึง 74°C"),
      ml("Use garlic chives for the 60 g scallion, keeping the same finely chopped weight.", "60 公克青蔥可改用同量切細韭菜。", "ねぎ60gは同量の細かく刻んだにらに替えられます。", "대파 60g은 같은 양의 잘게 썬 부추로 바꿀 수 있다.", "เปลี่ยนต้นหอม 60 กรัมเป็นกุยช่ายสับละเอียดน้ำหนักเท่ากันได้")
    ],
    storage: ml("Cool within 2 hours, refrigerate cooked gyoza airtight for up to 2 days, and re-crisp uncovered in a skillet until the pork centre reaches 74°C. Store the soy-vinegar dip separately; do not freeze the assembled dip plate.", "2 小時內放涼，熟煎餃密封冷藏最多 2 天，再用平底鍋不加蓋煎脆至豬肉中心 74°C；醬油醋分開保存，不要冷凍已組盤的沾醬。", "2時間以内に冷まし、焼き餃子は密閉冷蔵2日以内にします。豚肉の中心が74℃になるまでフライパンで覆わず焼き直し、しょうゆ酢だれは別に保存し、盛り付けた皿は冷凍しません。", "2시간 안에 식혀 익힌 교자를 밀폐 냉장 2일 이내 보관하고 돼지고기 중심이 74°C가 될 때까지 팬에서 덮지 않고 다시 바삭하게 한다. 간장 식초장은 따로 두고 소스와 담은 접시는 얼리지 않는다.", "ทำให้เกี๊ยวสุกเย็นภายใน 2 ชั่วโมง แช่เย็นปิดสนิทได้ 2 วัน แล้วอุ่นกระทะเปิดฝาจนใจกลางหมูถึง 74°C ให้กรอบ เก็บน้ำจิ้มแยกและอย่าแช่แข็งจานที่จัดพร้อมน้ำจิ้ม"),
    cultureNote: ml("Japanese yaki-gyoza are pan-fried dumplings adapted from Chinese jiaozi; the crisp browned base, brief steam, and soy-vinegar dip are part of the familiar style.", "日式煎餃源自對中國餃子的日本改良，焦脆底部、短時間蒸煎與醬油醋沾醬是熟悉特色。", "日本の焼き餃子は中国の餃子を日本で発展させたもので、香ばしい底、短い蒸し焼き、しょうゆ酢だれが定番です。", "일본식 야키교자는 중국 교자에서 발전한 만두로 바삭한 갈색 바닥, 짧은 찜, 간장 식초장이 익숙한 특징입니다.", "เกี๊ยวซ่าญี่ปุ่นเป็นเกี๊ยวกระทะที่พัฒนาจากเจี่ยวจื่อจีน จุดเด่นคือก้นสีน้ำตาลกรอบ การอบไอน้ำสั้น ๆ และน้ำจิ้มซีอิ๊วน้ำส้ม"),
    sources: [
      { title: "Just One Cookbook — Gyoza Recipe", url: "https://www.justonecookbook.com/gyoza/" },
      { title: "Kikkoman — Pan-Fried Potstickers Recipe", url: "https://www.kikkoman.com/en/cookbook/recipe/00001031.html" }
    ],
    imageAlt: ml("Six pan-fried Japanese gyoza in a row with crisp browned bottoms and a dark soy-vinegar dip in a white rectangular plate", "白色長盤上一排六顆底部焦脆金褐的日式煎餃，左側附深色醬油醋沾醬", "白い長皿に焦げ目のある焼き餃子6個を一列に並べ、左側に濃いしょうゆ酢だれを添えたもの", "흰 긴 접시에 바닥이 갈색으로 바삭한 일본식 교자 6개를 한 줄로 놓고 왼쪽에 진한 간장 식초장을 곁들인 모습", "เกี๊ยวซ่าญี่ปุ่นหกชิ้นเรียงบนจานขาวยาว ก้นสีน้ำตาลกรอบ มีน้ำจิ้มซีอิ๊วน้ำส้มสีเข้มด้านซ้าย"),
    visualSpec: "Six pan-fried Japanese gyoza arranged in a row on a white rectangular plate, showing crisp browned bottoms with only a dark soy-vinegar dipping sauce in the side compartment; no scallion, sesame, chili oil, or cabbage garnish visible."
  }
];
