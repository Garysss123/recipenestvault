const ml = (en, zhHant, ja, ko, th) => ({
  en,
  "zh-hant": zhHant,
  ja,
  ko,
  th
});

export const expandedInstructionsA = {
  "mapo-tofu": [
    {
      title: ml("Prepare the tofu and slurry", "處理豆腐與芡汁", "豆腐と水溶き片栗粉を準備", "두부와 전분물 준비", "เตรียมเต้าหู้และแป้งน้ำ"),
      body: ml(
        "Cut the soft tofu into 2 cm cubes. Hold it in 70°C water for 5 minutes, then drain gently. Stir the 8 g cornstarch with 20 ml water until smooth.",
        "嫩豆腐切成 2 公分方塊，放入 70°C 的水中浸 5 分鐘後輕輕瀝乾；8 公克玉米澱粉加 20 毫升水調勻。",
        "絹ごし豆腐を2cm角に切り、70℃の水に5分浸してから、くずさないように水気を切る。コーンスターチ8gを水20mlでなめらかに溶く。",
        "부드러운 두부를 2cm 깍둑썰기해 70°C 물에 5분 담갔다가 조심히 건진다. 옥수수전분 8g을 물 20ml에 풀어 둔다.",
        "หั่นเต้าหู้อ่อนเป็นเต๋า 2 ซม. แช่ในน้ำอุณหภูมิ 70°C นาน 5 นาที แล้วสะเด็ดอย่างเบามือ ผสมแป้งข้าวโพด 8 กรัมกับน้ำ 20 มล. ให้เนียน"
      )
    },
    {
      title: ml("Set out the aromatics", "備好辛香料", "香味野菜を並べる", "향신 재료 준비", "เตรียมเครื่องหอม"),
      body: ml(
        "Have the pork, doubanjiang, black beans, garlic, ginger, ground Sichuan peppercorns, stock, soy sauce, Shaoxing wine, sugar, and scallions measured beside the wok. Divide the ground peppercorns into two portions.",
        "將豬肉、豆瓣醬、豆豉、蒜、薑、花椒粉、高湯、生抽、紹興酒、砂糖與青蔥量好放在炒鍋旁，花椒粉分成兩份。",
        "豚肉、豆板醤、豆鼓、にんにく、しょうが、花椒、スープ、しょうゆ、紹興酒、砂糖、ねぎを計量して鍋のそばに置く。花椒は2回分に分ける。",
        "돼지고기, 두반장, 발효 검은콩, 마늘, 생강, 간 화자오, 육수, 간장, 소흥주, 설탕, 대파를 계량해 웍 옆에 둔다. 화자오는 두 번 쓸 양으로 나눈다.",
        "ตวงหมู โต้วป้านเจี้ยง ถั่วดำหมัก กระเทียม ขิง พริกหอมบด น้ำสต๊อก ซีอิ๊วขาว เหล้าเส้าซิง น้ำตาล และต้นหอมวางข้างกระทะ แบ่งพริกหอมเป็นสองส่วน"
      )
    },
    {
      title: ml("Brown the pork", "炒香豬肉", "豚肉を炒める", "돼지고기 볶기", "ผัดหมูให้หอม"),
      body: ml(
        "Heat a wok over medium-high heat. Add all 25 ml oil and the pork. Stir-fry for 3 minutes, breaking up the meat, until browned and the centre reaches 71°C.",
        "炒鍋以中大火燒熱，加入全部 25 毫升油與豬肉，邊炒散邊炒 3 分鐘，至上色且中心達 71°C。",
        "中華鍋を中強火で熱し、油25mlと豚肉を入れる。肉をほぐしながら3分炒め、焼き色を付けて中心を71℃にする。",
        "웍을 중강불로 달군 뒤 기름 25ml와 돼지고기를 넣는다. 고기를 풀어 가며 3분 볶아 갈색을 내고 중심 온도 71°C까지 익힌다.",
        "ตั้งกระทะจีนไฟกลางค่อนแรง ใส่น้ำมัน 25 มล. กับหมู ผัดพร้อมยีหมู 3 นาทีจนเป็นสีน้ำตาลและแกนกลางถึง 71°C"
      )
    },
    {
      title: ml("Bloom the bean seasonings", "炒出豆瓣醬香", "豆板醤の香りを出す", "콩 소스 향 내기", "ผัดเครื่องปรุงถั่วให้หอม"),
      body: ml(
        "Reduce the heat to medium. Add the doubanjiang, fermented black beans, and half the peppercorns. Stir-fry for 45 seconds until the oil turns red, keeping the paste from scorching.",
        "轉中火，加入豆瓣醬、豆豉與一半花椒粉，翻炒 45 秒至油色變紅，避免醬料焦掉。",
        "中火に落とし、豆板醤、豆鼓、花椒の半量を加える。油が赤くなるまで45秒炒め、焦がさない。",
        "불을 중불로 낮추고 두반장, 발효 검은콩, 화자오 절반을 넣는다. 기름이 붉어질 때까지 45초 볶되 타지 않게 한다.",
        "ลดเป็นไฟกลาง ใส่โต้วป้านเจี้ยง ถั่วดำหมัก และพริกหอมครึ่งหนึ่ง ผัด 45 วินาทีจนน้ำมันแดง ระวังอย่าให้เครื่องแกงไหม้"
      )
    },
    {
      title: ml("Build the sauce", "加入醬汁液體", "煮汁を作る", "소스 끓이기", "ทำน้ำซอส"),
      body: ml(
        "Pour in the 250 ml stock, light soy sauce, Shaoxing wine, and sugar. Scrape the base of the wok so the fermented seasonings dissolve into the liquid.",
        "倒入 250 毫升高湯、生抽、紹興酒與砂糖，刮起鍋底，讓發酵調味料融入液體。",
        "スープ250ml、しょうゆ、紹興酒、砂糖を加える。鍋底をこそげ、発酵調味料を煮汁になじませる。",
        "육수 250ml, 간장, 소흥주, 설탕을 붓는다. 웍 바닥을 긁어 발효 양념이 액체에 풀리게 한다.",
        "เทน้ำสต๊อก 250 มล. ซีอิ๊วขาว เหล้าเส้าซิง และน้ำตาลลงไป ขูดก้นกระทะให้เครื่องหมักละลายในน้ำซอส"
      )
    },
    {
      title: ml("Simmer the tofu", "燉煮豆腐", "豆腐を煮含める", "두부 끓이기", "เคี่ยวเต้าหู้"),
      body: ml(
        "Slide the tofu into the sauce in one layer. Keep the wok uncovered at a gentle simmer for 5 minutes, shaking it occasionally instead of stirring so the cubes stay intact.",
        "將豆腐平放滑入醬汁，開蓋維持溫和沸騰 5 分鐘，偶爾晃動炒鍋，不要直接翻拌以保持方塊完整。",
        "豆腐を煮汁にそっと並べ入れる。ふたをせず、静かな煮立ちで5分煮る。混ぜずに鍋を時々揺すり、角を保つ。",
        "두부를 소스에 한 겹으로 조심히 넣는다. 뚜껑을 열고 잔잔하게 5분 끓이며 가끔 웍을 흔들고 저어 두부를 부수지 않는다.",
        "ค่อย ๆ วางเต้าหู้ลงในซอสเป็นชั้นเดียว เคี่ยวเปิดฝาให้เดือดเบา ๆ 5 นาที เขย่ากระทะเป็นครั้งคราวแทนการคนเพื่อรักษารูปทรง"
      )
    },
    {
      title: ml("Thicken in two additions", "分兩次勾芡", "2回に分けてとろみを付ける", "두 번 나누어 농도 내기", "เติมแป้งสองครั้ง"),
      body: ml(
        "Stir the slurry again. Add half and simmer for 30 seconds; add only as much of the remainder as needed for a sauce that clings lightly to the tofu.",
        "再次攪勻芡汁，先加入一半煮 30 秒；剩餘部分視需要加入，讓醬汁薄薄裹住豆腐即可。",
        "水溶き片栗粉をもう一度混ぜ、半量を加えて30秒煮る。残りは豆腐に軽く絡む分だけ加える。",
        "전분물을 다시 저어 절반을 넣고 30초 끓인다. 남은 전분물은 소스가 두부에 가볍게 붙을 만큼만 넣는다.",
        "คนแป้งอีกครั้ง เติมครึ่งหนึ่งแล้วเคี่ยว 30 วินาที เติมส่วนที่เหลือเท่าที่จำเป็นให้ซอสเคลือบเต้าหู้บาง ๆ"
      )
    },
    {
      title: ml("Finish and rest", "收尾並靜置", "仕上げて休ませる", "마무리하고 두기", "ปิดท้ายและพัก"),
      body: ml(
        "Turn off the heat. Fold in the remaining peppercorns and all 30 g scallions, rest for 1 minute, and serve while hot.",
        "關火，拌入剩餘花椒粉與全部 30 公克青蔥，靜置 1 分鐘後趁熱上桌。",
        "火を止め、残りの花椒とねぎ30gを混ぜ、1分休ませて熱いうちに盛る。",
        "불을 끄고 남은 화자오와 대파 30g을 섞어 1분 둔 뒤 뜨거울 때 낸다.",
        "ปิดไฟ คลุกพริกหอมที่เหลือกับต้นหอม 30 กรัม พัก 1 นาที แล้วเสิร์ฟร้อน ๆ"
      )
    }
  ],

  "kung-pao-chicken": [
    {
      title: ml("Cut and marinate the chicken", "切雞肉並醃漬", "鶏肉を切って下味を付ける", "닭고기 썰어 재우기", "หั่นและหมักไก่"),
      body: ml(
        "Cut the chicken thigh into even 2 cm pieces. Toss with the 10 ml soy sauce, 10 ml Shaoxing wine, and 8 g cornstarch. Rest for 10 minutes while you prepare the remaining ingredients.",
        "雞腿肉切成大小一致的 2 公分塊，拌入 10 毫升生抽、10 毫升紹興酒與 8 公克玉米澱粉，靜置 10 分鐘並準備其餘食材。",
        "鶏もも肉を大きさのそろった2cm角に切る。しょうゆ10ml、紹興酒10ml、コーンスターチ8gを絡め、残りの材料を準備する間10分置く。",
        "닭다리살을 같은 크기의 2cm 조각으로 썬다. 간장 10ml, 소흥주 10ml, 옥수수전분 8g을 버무려 나머지 재료를 준비하는 동안 10분 둔다.",
        "หั่นเนื้อสะโพกไก่เป็นชิ้น 2 ซม. ขนาดเท่ากัน คลุกซีอิ๊วขาว 10 มล. เหล้าเส้าซิง 10 มล. และแป้งข้าวโพด 8 กรัม พัก 10 นาทีระหว่างเตรียมส่วนอื่น"
      )
    },
    {
      title: ml("Mix the sauce", "調好醬汁", "たれを混ぜる", "소스 섞기", "ผสมซอส"),
      body: ml(
        "Whisk the 20 ml light soy sauce, 20 ml Chinkiang vinegar, 15 g sugar, 5 ml sesame oil, 30 ml water, and 5 g cornstarch until smooth. Stir once more just before pouring because starch settles.",
        "將 20 毫升生抽、20 毫升鎮江香醋、15 公克砂糖、5 毫升香油、30 毫升水與 5 公克玉米澱粉拌勻；下鍋前再攪一次，因為澱粉會沉底。",
        "薄口しょうゆ20ml、黒酢20ml、砂糖15g、ごま油5ml、水30ml、コーンスターチ5gを混ぜる。でんぷんが沈むので、注ぐ直前にも混ぜる。",
        "양조간장 20ml, 진강식 흑식초 20ml, 설탕 15g, 참기름 5ml, 물 30ml, 옥수수전분 5g을 고루 섞는다. 전분이 가라앉으므로 붓기 직전에 다시 젓는다.",
        "ผสมซีอิ๊วขาว 20 มล. น้ำส้มสายชูดำ 20 มล. น้ำตาล 15 กรัม น้ำมันงา 5 มล. น้ำ 30 มล. และแป้งข้าวโพด 5 กรัม คนอีกครั้งก่อนเทเพราะแป้งจะตกตะกอน"
      )
    },
    {
      title: ml("Set up the two chicken batches", "將雞肉分成兩批", "鶏肉を2回分に分ける", "닭고기 두 배치 준비하기", "แบ่งไก่เตรียมไว้สองรอบ"),
      body: ml(
        "Separate the marinated chicken into two equal batches. Cut the scallions into 3 cm pieces and keep the white and green portions apart so they can be added at different times.",
        "將醃好的雞肉分成兩等份；青蔥切 3 公分段，蔥白與蔥綠分開，分時下鍋。",
        "下味を付けた鶏肉を2等分する。ねぎを3cmに切り、白い部分と青い部分を分けておく。",
        "밑간한 닭고기를 같은 양의 두 묶음으로 나눈다. 대파를 3cm로 썰고 흰 부분과 초록 부분을 따로 둔다.",
        "แบ่งไก่หมักเป็นสองส่วนเท่ากัน หั่นต้นหอมเป็นท่อน 3 ซม. แยกโคนกับใบไว้เพื่อใส่คนละช่วง"
      )
    },
    {
      title: ml("Sear in two batches", "分兩批炒雞", "2回に分けて鶏肉を炒める", "두 번 나누어 닭고기 볶기", "ผัดไก่สองรอบ"),
      body: ml(
        "Heat a wok over medium-high heat. Add 6 ml oil and stir-fry the first chicken batch for 2–3 minutes; remove it when lightly browned and the thickest piece reaches 74°C. Repeat with another 6 ml oil and the second batch.",
        "炒鍋以中大火燒熱，加入 6 毫升油，第一批雞肉炒 2–3 分鐘，至表面略上色且最厚處達 74°C 後盛出；再以 6 毫升油同樣炒熟第二批。",
        "中華鍋を中強火で熱し、油6mlで最初の鶏肉を2〜3分炒める。薄く焼き色が付き最も厚い部分が74℃になったら取り出し、油6mlを追加して2回目も同様に炒める。",
        "웍을 중강불로 달군 뒤 기름 6ml로 첫 번째 닭고기를 2–3분 볶는다. 겉이 살짝 갈색이 되고 가장 두꺼운 조각이 74°C에 도달하면 덜어내고, 기름 6ml를 더해 두 번째 배치도 같은 방식으로 익힌다.",
        "ตั้งกระทะจีนด้วยไฟกลางค่อนแรง ใส่น้ำมัน 6 มล. ผัดไก่ชุดแรก 2–3 นาทีจนผิวเริ่มเป็นสีน้ำตาลและชิ้นหนาที่สุดถึง 74°C แล้วตักออก เติมน้ำมันอีก 6 มล. และผัดชุดที่สองแบบเดียวกัน"
      )
    },
    {
      title: ml("Toast the spices gently", "小火炒香香料", "香辛料を弱火で炒める", "향신료 약불로 볶기", "ผัดเครื่องเทศด้วยไฟอ่อน"),
      body: ml(
        "Lower the heat to medium-low. Add the remaining 13 ml oil, 10 g dried chiles, and 3 g Sichuan peppercorns. Stir for 20–30 seconds until fragrant, without letting the spices blacken.",
        "轉中小火，加入剩餘 13 毫升油、10 公克乾辣椒與 3 公克花椒，翻炒 20–30 秒至出香，香料不可炒黑。",
        "中弱火に落とし、残りの油13ml、乾燥唐辛子10g、花椒3gを加える。焦がさないよう20〜30秒、香りが立つまで炒める。",
        "중약불로 낮추고 남은 기름 13ml, 말린 고추 10g, 화자오 3g을 넣어 타지 않게 20–30초 향을 낸다.",
        "ลดเป็นไฟกลางอ่อน ใส่น้ำมันที่เหลือ 13 มล. พริกแห้ง 10 กรัม และพริกเสฉวน 3 กรัม ผัด 20–30 วินาทีจนหอมโดยไม่ให้เครื่องเทศไหม้ดำ"
      )
    },
    {
      title: ml("Fry the aromatics", "炒辛香料", "香味野菜を炒める", "향신 채소 볶기", "ผัดเครื่องหอม"),
      body: ml(
        "Add the sliced garlic, ginger, and scallion whites. Stir-fry for 30 seconds, keeping the heat at medium-low so the garlic does not burn.",
        "加入蒜片、薑絲與蔥白，以中小火翻炒 30 秒，避免蒜片焦掉。",
        "にんにく、しょうが、ねぎの白い部分を加え、中弱火で30秒炒める。にんにくを焦がさない。",
        "마늘, 생강, 대파 흰 부분을 넣고 중약불에서 30초 볶아 마늘을 태우지 않는다.",
        "ใส่กระเทียมหั่น ขิง และโคนต้นหอม ผัดไฟกลางอ่อน 30 วินาที อย่าให้กระเทียมไหม้"
      )
    },
    {
      title: ml("Bubble the sauce", "煮沸醬汁", "たれを煮立てる", "소스 끓이기", "ต้มซอสให้เดือด"),
      body: ml(
        "Give the sauce another stir and pour it into the wok. Let it bubble for 60 seconds until the cornstarch begins to thicken the liquid.",
        "調味醬再次攪勻後倒入炒鍋，煮至冒泡 60 秒，讓玉米澱粉開始使液體變稠。",
        "たれをもう一度混ぜて鍋に注ぎ、60秒煮立ててコーンスターチに軽くとろみを付ける。",
        "소스를 다시 저어 웍에 붓고 60초 끓여 옥수수전분이 액체를 살짝 걸쭉하게 하도록 한다.",
        "คนซอสอีกครั้งแล้วเทลงกระทะ เคี่ยวจนเดือด 60 วินาทีให้แป้งเริ่มทำให้ซอสข้น"
      )
    },
    {
      title: ml("Return the chicken", "雞肉回鍋", "鶏肉を戻す", "닭고기 다시 넣기", "ใส่ไก่กลับ"),
      body: ml(
        "Return both batches of chicken and toss for 1 minute until the measured sauce coats every piece.",
        "放回兩批雞肉翻炒 1 分鐘，讓定量醬汁均勻裹住每塊肉。",
        "鶏肉を2回分とも戻し、計量したたれが全体に絡むまで1分炒める。",
        "두 번 볶아 둔 닭고기를 모두 다시 넣고 계량한 소스가 고루 묻도록 1분 볶는다.",
        "ใส่ไก่ทั้งสองรอบกลับลงไป คลุก 1 นาทีให้ซอสที่ตวงไว้เคลือบทั่วทุกชิ้น"
      )
    },
    {
      title: ml("Add the crisp finish", "加入蔥綠與花生", "ねぎとピーナッツを加える", "대파와 땅콩 넣기", "ใส่ต้นหอมและถั่ว"),
      body: ml(
        "Turn off the heat and fold in the scallion greens and 50 g roasted peanuts. Serve immediately while the peanuts remain crisp.",
        "關火，拌入蔥綠與 50 公克烘烤花生，趁花生仍酥脆立即上桌。",
        "火を止め、ねぎの青い部分とローストピーナッツ50gを混ぜる。ピーナッツがカリッとしているうちにすぐ盛る。",
        "불을 끄고 대파 초록 부분과 볶은 땅콩 50g을 섞는다. 땅콩이 바삭할 때 바로 낸다.",
        "ปิดไฟ คลุกใบต้นหอมกับถั่วลิสงคั่ว 50 กรัม เสิร์ฟทันทีขณะที่ถั่วยังกรอบ"
      )
    }
  ],

  "twice-cooked-pork": [
    {
      title: ml("Prepare the pot", "準備汆煮鍋", "下ゆで鍋を準備する", "삶을 냄비 준비", "เตรียมหม้อต้ม"),
      body: ml(
        "Place the 500 g whole pork belly, 10 g sliced ginger, 20 g simmering scallions, and 1 l water in a pot. Use a pot that allows the pork to sit under the water.",
        "將整塊 500 公克豬五花、10 公克薑片、20 公克汆煮用青蔥與 1 公升水放入鍋中，選能讓肉浸在水下的鍋具。",
        "豚バラ肉500g、薄切りしょうが10g、下ゆで用ねぎ20g、水1Lを鍋に入れる。肉が水に浸かる大きさの鍋を使う。",
        "통삼겹살 500g, 생강 10g, 데침용 대파 20g, 물 1l를 냄비에 넣는다. 고기가 물에 잠길 수 있는 냄비를 사용한다.",
        "ใส่หมูสามชั้นทั้งชิ้น 500 กรัม ขิง 10 กรัม ต้นหอมสำหรับต้ม 20 กรัม และน้ำ 1 ลิตรลงหม้อ ใช้หม้อที่ทำให้หมูจมน้ำได้"
      )
    },
    {
      title: ml("Simmer until tender", "汆煮至軟嫩", "柔らかくなるまでゆでる", "부드럽게 삶기", "ต้มจนเปื่อยนุ่ม"),
      body: ml(
        "Bring the pot to a gentle simmer and cook for 30 minutes. A chopstick should enter the thickest part with little resistance, and the centre must reach at least 71°C.",
        "煮至微滾後續煮 30 分鐘；筷子應能以少量阻力插入最厚處，中心溫度至少達 71°C。",
        "静かな煮立ちにして30分ゆでる。最も厚い部分に箸がほぼ抵抗なく入り、中心が71℃以上になることを確認する。",
        "잔잔하게 끓여 30분 삶는다. 가장 두꺼운 부분에 젓가락이 큰 저항 없이 들어가고 중심 온도가 최소 71°C인지 확인한다.",
        "ต้มจนเดือดอ่อนแล้วเคี่ยว 30 นาที ตะเกียบควรแทงส่วนหนาที่สุดได้โดยมีแรงต้านเพียงเล็กน้อย และแกนกลางต้องถึงอย่างน้อย 71°C"
      )
    },
    {
      title: ml("Prepare the vegetables", "準備蔬菜", "野菜を切る", "채소 손질", "เตรียมผัก"),
      body: ml(
        "While the pork simmers, cut the 60 g green bell pepper and 60 g red bell pepper into 3 cm strips. Cut the 80 g garlic chives or leek into 4 cm pieces.",
        "豬肉汆煮時，將 60 公克青椒與 60 公克紅甜椒切成 3 公分條，80 公克蒜苗或韭蒜切成 4 公分段。",
        "豚肉をゆでている間に、ピーマン60gと赤ピーマン60gを3cm幅に切る。にんにくの芽またはねぎ80gを4cmに切る。",
        "돼지고기를 삶는 동안 풋고추 60g과 빨간 피망 60g을 3cm 길이로 썬다. 마늘종 또는 대파 80g은 4cm로 썬다.",
        "ระหว่างต้มหมู หั่นพริกหวานเขียว 60 กรัมและแดง 60 กรัมเป็นเส้น 3 ซม. หั่นต้นกระเทียมหรือต้นหอม 80 กรัมเป็นท่อน 4 ซม."
      )
    },
    {
      title: ml("Cool and slice the pork", "放涼切肉", "冷まして切る", "식혀 썰기", "พักและหั่นหมู"),
      body: ml(
        "Transfer the pork to a plate and cool for 10 minutes. Pat it dry and slice across the grain into even 3 mm pieces.",
        "豬肉盛出放涼 10 分鐘，擦乾後逆紋切成厚薄一致的 3 毫米薄片。",
        "豚肉を皿に取り出して10分冷ます。水気を拭き、繊維を断つ方向に3mm厚さで均一に切る。",
        "돼지고기를 접시에 옮겨 10분 식힌다. 물기를 닦고 결 반대 방향으로 3mm 두께가 되게 고르게 썬다.",
        "ตักหมูใส่จานพักให้เย็น 10 นาที ซับให้แห้ง แล้วหั่นขวางเส้นใยเป็นชิ้นหนา 3 มม. เท่ากัน"
      )
    },
    {
      title: ml("Render and curl the slices", "炒出肉片油脂", "肉の脂を出す", "고기 지방 내기", "รีดไขมันจากหมู"),
      body: ml(
        "Heat a wok over medium-high heat. Add the 20 ml oil and pork slices; stir-fry for 2–3 minutes until some fat renders and the edges curl, without drying the meat.",
        "炒鍋以中大火燒熱，加入 20 毫升油與肉片翻炒 2–3 分鐘，至部分油脂析出、邊緣捲起即可，不要把肉炒乾。",
        "中華鍋を中強火で熱し、油20mlと豚肉を2〜3分炒める。脂が少し出て縁が反るところで止め、乾かしすぎない。",
        "웍을 중강불로 달군 뒤 기름 20ml와 돼지고기를 2–3분 볶는다. 지방이 일부 빠지고 가장자리가 말리면 멈춰 고기가 마르지 않게 한다.",
        "ตั้งกระทะจีนไฟกลางค่อนแรง ใส่น้ำมัน 20 มล. กับหมู ผัด 2–3 นาทีจนไขมันออกบางส่วนและขอบม้วน โดยไม่ผัดจนหมูแห้ง"
      )
    },
    {
      title: ml("Fry the bean paste", "炒豆瓣醬與豆豉", "豆板醤と豆鼓を炒める", "두반장과 검은콩 볶기", "ผัดโต้วป้านเจี้ยงกับถั่วหมัก"),
      body: ml(
        "Push the pork to one side of the wok. Fry the 30 g doubanjiang and 10 g fermented black beans in the rendered oil for 45 seconds until red and aromatic.",
        "將肉推到炒鍋一側，利用析出的油脂炒 30 公克豆瓣醬與 10 公克豆豉 45 秒，至油色變紅並出香。",
        "豚肉を鍋の片側に寄せ、出た脂で豆板醤30gと豆鼓10gを45秒炒め、赤く香る状態にする。",
        "돼지고기를 웍 한쪽으로 민다. 나온 지방에 두반장 30g과 발효 검은콩 10g을 넣고 45초 붉고 향긋해질 때까지 볶는다.",
        "ดันหมูไปด้านหนึ่ง ผัดโต้วป้านเจี้ยง 30 กรัมกับถั่วดำหมัก 10 กรัมในน้ำมันที่ออกมา 45 วินาทีจนแดงและหอม"
      )
    },
    {
      title: ml("Cook both peppers", "炒兩色甜椒", "2色のピーマンを炒める", "두 색 피망 볶기", "ผัดพริกหวานสองสี"),
      body: ml(
        "Add both pepper strips, the 10 ml soy sauce, 5 ml Shaoxing wine, and 3 g sugar. Toss for 2 minutes so the peppers soften slightly but retain a little bite.",
        "加入兩色甜椒、10 毫升生抽、5 毫升紹興酒與 3 公克砂糖，翻炒 2 分鐘，讓甜椒略軟但保留爽脆。",
        "2色のピーマン、しょうゆ10ml、紹興酒5ml、砂糖3gを加え、少し柔らかくしながら歯ごたえを残して2分炒める。",
        "두 색 피망, 간장 10ml, 소흥주 5ml, 설탕 3g을 넣고 2분 볶아 살짝 부드럽게 하되 아삭함을 남긴다.",
        "ใส่พริกหวานทั้งสองสี ซีอิ๊วขาว 10 มล. เหล้าเส้าซิง 5 มล. และน้ำตาล 3 กรัม คลุก 2 นาทีให้พริกนุ่มเล็กน้อยแต่ยังกรอบ"
      )
    },
    {
      title: ml("Wilt the garlic chives", "炒軟蒜苗", "にんにくの芽をしんなりさせる", "마늘종 숨 죽이기", "ผัดต้นกระเทียมให้นิ่ม"),
      body: ml(
        "Add the garlic chives or leek and stir-fry for 1 minute, just until wilted. Do not keep cooking after the vegetables are tender.",
        "加入蒜苗或韭蒜翻炒 1 分鐘，至剛軟化即可；蔬菜熟後不要繼續久炒。",
        "にんにくの芽またはねぎを加え、しんなりするまで1分炒める。野菜が柔らかくなったら加熱を続けない。",
        "마늘종 또는 대파를 넣고 숨이 죽을 때까지 1분 볶는다. 채소가 익으면 더 끓이지 않는다.",
        "ใส่ต้นกระเทียมหรือต้นหอม ผัด 1 นาทีจนเริ่มนิ่ม แล้วหยุดความร้อนไม่ให้ผักสุกเกิน"
      )
    },
    {
      title: ml("Serve while the edges are curled", "趁肉片捲曲上桌", "肉の縁が反ったら盛る", "고기 가장자리가 말리면 내기", "เสิร์ฟเมื่อขอบหมูม้วน"),
      body: ml(
        "Turn off the heat once the garlic chives or leek is wilted and the pork edges remain curled. Serve immediately while the peppers are still slightly crisp.",
        "韭蒜軟化且豬肉邊緣保持捲曲時關火，趁甜椒仍略帶爽脆立即上桌。",
        "ねぎがしんなりし、豚肉の縁が反ったら火を止める。ピーマンに少し歯ごたえが残るうちにすぐ盛る。",
        "대파가 숨이 죽고 돼지고기 가장자리가 말린 상태에서 불을 끈다. 피망이 살짝 아삭할 때 바로 낸다.",
        "ปิดไฟเมื่อผักเริ่มนิ่มและขอบหมูยังม้วน เสิร์ฟทันทีขณะที่พริกหวานยังกรอบเล็กน้อย"
      )
    }
  ],

  "dan-dan-noodles": [
    {
      title: ml("Measure the divided sugar", "分配砂糖", "砂糖を分ける", "설탕 나누기", "แบ่งน้ำตาล"),
      body: ml(
        "Measure the 6 g sugar as 4 g for the sauce and 2 g for the pork topping. Keep the two portions in separate small dishes.",
        "將 6 公克砂糖分成醬汁用 4 公克與豬肉餡用 2 公克，分別放在小碟中。",
        "砂糖6gを、たれ用4gと肉そぼろ用2gに分け、それぞれ小皿に置く。",
        "설탕 6g을 소스용 4g과 돼지고기 토핑용 2g으로 나누어 작은 그릇에 따로 둔다.",
        "แบ่งน้ำตาล 6 กรัมเป็น 4 กรัมสำหรับซอสและ 2 กรัมสำหรับหน้าหมู ใส่ถ้วยเล็กแยกกัน"
      )
    },
    {
      title: ml("Mix the two noodle sauces", "調好兩碗麵醬", "2つのたれを作る", "두 그릇의 소스 만들기", "ผสมซอสสองชาม"),
      body: ml(
        "Combine the 20 g sesame paste, 15 ml soy sauce, 15 ml vinegar, 20 ml chile oil, 4 g sugar, 1 g ground peppercorns, and 10 g grated garlic. Divide the mixture equally between two serving bowls.",
        "將 20 公克芝麻醬、15 毫升生抽、15 毫升香醋、20 毫升辣椒油、4 公克糖、1 公克花椒粉與 10 公克蒜泥拌勻，平均分入兩個上桌碗。",
        "ごまペースト20g、しょうゆ15ml、酢15ml、ラー油20ml、砂糖4g、花椒粉1g、すりおろしにんにく10gを混ぜ、2つの器に等分する。",
        "참깨장 20g, 간장 15ml, 식초 15ml, 고추기름 20ml, 설탕 4g, 간 화자오 1g, 간 마늘 10g을 섞어 두 그릇에 똑같이 나눈다.",
        "ผสมงาบด 20 กรัม ซีอิ๊วขาว 15 มล. น้ำส้มสายชู 15 มล. น้ำมันพริก 20 มล. น้ำตาล 4 กรัม พริกหอมบด 1 กรัม และกระเทียมขูด 10 กรัม แล้วแบ่งเท่ากันใส่ชามเสิร์ฟสองใบ"
      )
    },
    {
      title: ml("Brown the pork", "炒香豬肉", "豚肉を炒める", "돼지고기 볶기", "ผัดหมู"),
      body: ml(
        "Heat the 15 ml oil in a skillet over medium-high heat. Stir-fry the 150 g ground pork for 3–4 minutes, breaking it up, until browned and the centre reaches 71°C.",
        "平底鍋以中大火加熱 15 毫升油，加入 150 公克豬絞肉炒散 3–4 分鐘，至上色且中心達 71°C。",
        "フライパンを中強火で熱し、油15mlと豚ひき肉150gをほぐしながら3～4分炒め、焼き色を付けて中心を71℃にする。",
        "팬을 중강불로 달구고 기름 15ml와 돼지고기 다짐육 150g을 풀어 가며 3~4분 볶아 갈색을 내고 중심 온도 71°C까지 익힌다.",
        "ตั้งกระทะด้วยไฟกลางค่อนแรง ใส่น้ำมัน 15 มล. กับหมูบด 150 กรัม ผัดให้ร่วน 3–4 นาทีจนเป็นสีน้ำตาลและแกนกลางถึง 71°C"
      )
    },
    {
      title: ml("Season the pork topping", "調味豬肉餡", "肉そぼろを味付けする", "돼지고기 토핑 양념하기", "ปรุงหน้าหมู"),
      body: ml(
        "Add the 25 g minced ya cai, 10 ml Shaoxing wine, and the remaining 2 g sugar. Stir-fry for 1 minute until the topping is dry and fragrant.",
        "加入 25 公克切碎芽菜、10 毫升紹興酒與剩餘 2 公克糖，翻炒 1 分鐘至肉餡乾爽出香。",
        "刻んだ芽菜25g、紹興酒10ml、残りの砂糖2gを加え、肉そぼろが乾いて香るまで1分炒める。",
        "다진 야차이 25g, 소흥주 10ml, 남은 설탕 2g을 넣고 토핑이 보슬보슬하고 향긋해질 때까지 1분 볶는다.",
        "ใส่ยาไฉ่สับ 25 กรัม เหล้าเส้าซิง 10 มล. และน้ำตาลที่เหลือ 2 กรัม ผัด 1 นาทีจนหน้าหมูแห้งหอม"
      )
    },
    {
      title: ml("Boil the noodles", "煮麵並留麵水", "麺をゆでてゆで汁を取る", "면 삶고 면수 남기기", "ต้มเส้นและเก็บน้ำลวก"),
      body: ml(
        "Cook the 240 g fresh wheat noodles in boiling water for 2–4 minutes, following the packet if it differs. Before draining, reserve exactly 120 ml noodle water.",
        "240 公克新鮮小麥麵放入沸水煮 2–4 分鐘，若包裝標示不同則依包裝；瀝麵前精確留起 120 毫升麵水。",
        "生の中華麺240gを沸騰した湯で2～4分、表示が違えば袋に従ってゆでる。湯切り前にゆで汁を正確に120ml取る。",
        "생 밀면 240g을 끓는 물에 2~4분 삶고 포장지 표시가 다르면 그에 따른다. 건지기 전에 면수 120ml를 정확히 남긴다.",
        "ต้มบะหมี่สด 240 กรัมในน้ำเดือด 2–4 นาที หรือตามฉลากหากต่างกัน ก่อนสะเด็ดน้ำตวงน้ำลวกเส้นให้ได้ 120 มล. พอดี"
      )
    },
    {
      title: ml("Loosen each bowl", "調開每碗醬汁", "各器のたれをのばす", "각 그릇의 소스 풀기", "คลายซอสแต่ละชาม"),
      body: ml(
        "Pour 60 ml of the reserved hot noodle water into each bowl and stir until the sesame paste is smooth. Use all 120 ml between the two bowls.",
        "每個碗加入 60 毫升預留熱麵水，攪拌至芝麻醬順滑；兩碗合計用完 120 毫升。",
        "取っておいた熱いゆで汁を各器に60mlずつ加え、ごまペーストがなめらかになるまで混ぜる。2器で合計120mlを使う。",
        "남겨 둔 뜨거운 면수를 각 그릇에 60ml씩 넣고 참깨장이 매끈해질 때까지 젓는다. 두 그릇에 총 120ml를 모두 쓴다.",
        "เติมน้ำลวกเส้นร้อนที่เก็บไว้ชามละ 60 มล. คนจนงาบดเนียน ใช้ทั้งหมด 120 มล. แบ่งสองชาม"
      )
    },
    {
      title: ml("Coat the noodles", "拌麵裹醬", "麺をたれに絡める", "면에 소스 묻히기", "คลุกเส้นกับซอส"),
      body: ml(
        "Drain the noodles well and divide them between the two bowls. Toss immediately until every strand is coated and the sauce remains loose enough to mix.",
        "麵條充分瀝乾後分入兩碗，立即拌勻，直到每條麵都裹上醬汁且仍保有可拌動的濕度。",
        "麺の水気をよく切って2つの器に分け、すぐに全体を和える。すべての麺にたれを絡め、混ぜられるゆるさを保つ。",
        "면을 잘 털어 물기를 빼고 두 그릇에 나눈다. 바로 버무려 모든 면발에 소스가 묻고 섞기 좋은 농도가 되게 한다.",
        "สะเด็ดเส้นให้ดี แบ่งใส่สองชามแล้วคลุกทันทีให้ซอสเคลือบทุกเส้นและยังเหลวพอที่จะคลุกได้"
      )
    },
    {
      title: ml("Top and serve", "鋪上配料並上桌", "具材をのせて盛る", "토핑 올려 내기", "ใส่หน้าแล้วเสิร์ฟ"),
      body: ml(
        "Top each bowl with half of the pork mixture, half of the 30 g scallions, and half of the 15 g crushed peanuts. Serve at once so the noodles and topping stay hot.",
        "每碗鋪上一半豬肉餡、30 公克青蔥的一半與 15 公克碎花生的一半，立即上桌，讓麵條與配料保持熱度。",
        "各器に豚肉の具を半量ずつ、ねぎ30gの半量、砕いたピーナッツ15gの半量をのせる。麺と具が熱いうちにすぐ出す。",
        "각 그릇에 돼지고기 토핑 절반씩, 대파 30g의 절반, 부순 땅콩 15g의 절반을 올린다. 면과 토핑이 뜨거울 때 바로 낸다.",
        "แบ่งหน้าหมูครึ่งหนึ่งต่อชาม ใส่ต้นหอมครึ่งหนึ่งของ 30 กรัมและถั่วลิสงบดครึ่งหนึ่งของ 15 กรัม เสิร์ฟทันทีเพื่อให้เส้นและหน้าอุ่นร้อน"
      )
    }
  ],

  "tomato-egg-stir-fry": [
    {
      title: ml("Cut the tomatoes", "切番茄", "トマトを切る", "토마토 썰기", "หั่นมะเขือเทศ"),
      body: ml(
        "Remove the tomato stems and cut the 500 g tomatoes into even 3 cm wedges. Keep the wedges together so they cook at the same rate.",
        "去除番茄蒂，將 500 公克番茄切成大小一致的 3 公分瓣，讓番茄能均勻受熱。",
        "トマトのへたを取り、500gを大きさのそろった3cmのくし形に切る。均一に火が入るようそろえておく。",
        "토마토 꼭지를 제거하고 500g을 같은 크기의 3cm 웨지로 썬다. 고르게 익도록 크기를 맞춘다.",
        "เอาขั้วมะเขือเทศออก หั่นมะเขือเทศ 500 กรัมเป็นเสี้ยว 3 ซม. ขนาดเท่ากันเพื่อให้สุกพร้อมกัน"
      )
    },
    {
      title: ml("Beat and season the eggs", "打蛋並調味", "卵を溶いて味付けする", "달걀 풀어 간하기", "ตีและปรุงไข่"),
      body: ml(
        "Beat the 4 eggs with 10 ml water, half (1.5 g) of the 3 g salt, and 1 g white pepper until combined. Keep the remaining 1.5 g salt ready for the tomatoes.",
        "4 顆蛋加入 10 毫升水、1.5 公克鹽與 1 公克白胡椒打散；剩餘 1.5 公克鹽留給番茄。",
        "卵4個に水10ml、塩1.5g、白こしょう1gを加えて溶く。残りの塩1.5gはトマト用に取っておく。",
        "달걀 4개에 물 10ml, 소금 1.5g, 흰 후추 1g을 넣어 푼다. 남은 소금 1.5g은 토마토용으로 둔다.",
        "ตีไข่ 4 ฟองกับน้ำ 10 มล. เกลือ 1.5 กรัม และพริกไทยขาว 1 กรัม เตรียมเกลือที่เหลือ 1.5 กรัมไว้สำหรับมะเขือเทศ"
      )
    },
    {
      title: ml("Set up the tomato water", "準備番茄燜煮水", "トマト用の水を量る", "토마토 물 계량", "ตวงน้ำสำหรับมะเขือเทศ"),
      body: ml(
        "Measure 45 ml water for simmering the tomatoes and keep it beside the wok. Keep the 8 g sugar with the remaining salt so both can be added together.",
        "量好番茄燜煮用的 45 毫升水放在炒鍋旁，並將 8 公克砂糖與剩餘鹽放在一起，方便同時加入。",
        "トマトを煮る水45mlを量って鍋のそばに置く。砂糖8gと残りの塩を一緒にしておく。",
        "토마토를 익힐 물 45ml를 계량해 웍 옆에 둔다. 설탕 8g과 남은 소금을 함께 준비한다.",
        "ตวงน้ำ 45 มล. สำหรับเคี่ยวมะเขือเทศไว้ข้างกระทะ เตรียมน้ำตาล 8 กรัมกับเกลือที่เหลือไว้ด้วยกัน"
      )
    },
    {
      title: ml("Set the egg curds", "炒至蛋液剛凝固", "卵を半熟に固める", "달걀 부드럽게 익히기", "ทำไข่ให้เริ่มเซ็ต"),
      body: ml(
        "Heat a wok over medium-high heat and add 15 ml oil. Pour in the eggs and stir slowly for 30–45 seconds until softly set but still glossy. Transfer them out immediately.",
        "炒鍋以中大火燒熱，加入 15 毫升油，倒入蛋液慢慢推 30–45 秒至剛凝固且仍有光澤，立即盛出。",
        "中華鍋を中強火で熱して油15mlを入れる。卵を流し、つやを残してふんわり固まるまで30～45秒ゆっくり混ぜ、すぐ取り出す。",
        "웍을 중강불로 달구고 기름 15ml를 넣는다. 달걀을 부어 윤기가 남은 채 부드럽게 굳을 때까지 30~45초 천천히 저어 즉시 덜어 둔다.",
        "ตั้งกระทะไฟกลางค่อนแรง ใส่น้ำมัน 15 มล. เทไข่ลงไปคนช้า ๆ 30–45 วินาทีจนเริ่มเซ็ตแต่ยังเงา แล้วตักออกทันที"
      )
    },
    {
      title: ml("Soften the tomatoes", "炒軟番茄", "トマトを柔らかくする", "토마토 부드럽게 볶기", "ผัดมะเขือเทศให้นุ่ม"),
      body: ml(
        "Add the remaining 15 ml oil and the tomato wedges. Stir-fry for 2 minutes until the skins begin to wrinkle and juices collect in the wok.",
        "加入剩餘 15 毫升油與番茄瓣，翻炒 2 分鐘，至表皮開始起皺並在鍋中出汁。",
        "残りの油15mlとトマトを加え、皮が縮み始めて鍋に汁がたまるまで2分炒める。",
        "남은 기름 15ml와 토마토를 넣고 껍질이 주름지기 시작하며 즙이 모일 때까지 2분 볶는다.",
        "ใส่น้ำมันที่เหลือ 15 มล. กับมะเขือเทศ ผัด 2 นาทีจนเปลือกเริ่มย่นและมีน้ำรวมในกระทะ"
      )
    },
    {
      title: ml("Simmer the tomatoes", "燜煮番茄", "トマトを蒸し煮にする", "토마토 덮어 익히기", "เคี่ยวมะเขือเทศปิดฝา"),
      body: ml(
        "Add the remaining 1.5 g salt and all 8 g sugar, then pour in 45 ml water. Cover and simmer for 1–2 minutes until the wedges are fully tender.",
        "加入剩餘 1.5 公克鹽與全部 8 公克砂糖，倒入 45 毫升水後加蓋燜煮 1–2 分鐘，至番茄瓣完全變軟。",
        "残りの塩1.5gと砂糖8gを加え、水45mlを注ぐ。ふたをして1〜2分蒸し煮にし、くし形を完全に柔らかくする。",
        "남은 소금 1.5g과 설탕 8g을 넣고 물 45ml를 붓는다. 뚜껑을 덮어 1–2분 익혀 토마토가 완전히 부드러워지게 한다.",
        "ใส่เกลือที่เหลือ 1.5 กรัมกับน้ำตาล 8 กรัม เติมน้ำ 45 มล. ปิดฝาเคี่ยว 1–2 นาทีจนเสี้ยวมะเขือเทศนุ่มทั่ว"
      )
    },
    {
      title: ml("Reduce the tomato juices", "收濃番茄汁", "トマトの汁を煮詰める", "토마토 즙 농도 내기", "เคี่ยวน้ำมะเขือเทศให้ข้น"),
      body: ml(
        "Uncover and cook for 1 minute, stirring gently, until the tomato juices become lightly syrupy rather than watery.",
        "開蓋輕輕翻動再煮 1 分鐘，直到番茄汁略呈稠亮、不再水水的。",
        "ふたを外してやさしく混ぜながら1分煮て、トマトの汁を水っぽくない軽いシロップ状にする。",
        "뚜껑을 열고 부드럽게 저으며 1분 더 익혀 토마토 즙이 물처럼 묽지 않고 살짝 시럽처럼 되게 한다.",
        "เปิดฝา คนเบา ๆ แล้วเคี่ยวต่อ 1 นาทีให้น้ำมะเขือเทศข้นเงาเล็กน้อยแทนที่จะเหลว"
      )
    },
    {
      title: ml("Warm the eggs through", "回鍋加熱蛋塊", "卵を戻して火を通す", "달걀 다시 익히기", "ใส่ไข่กลับให้อุ่น"),
      body: ml(
        "Return the egg curds and fold gently for 1 minute until hot throughout and the thickest curd reaches 74°C.",
        "放回蛋塊輕輕翻拌 1 分鐘，直到整體熱透且最厚的蛋塊達 74°C。",
        "卵を戻し、全体が熱くなり最も厚い部分が74℃になるまで1分やさしく混ぜる。",
        "달걀을 다시 넣고 1분 부드럽게 섞어 전체가 뜨겁고 가장 두꺼운 덩어리가 74°C가 되게 한다.",
        "ใส่ไข่กลับลงไปคลุกเบา ๆ 1 นาทีจนร้อนทั่วและก้อนที่หนาที่สุดถึง 74°C"
      )
    },
    {
      title: ml("Serve immediately", "立即上桌", "すぐに盛る", "바로 내기", "เสิร์ฟทันที"),
      body: ml(
        "Turn off the heat and serve immediately while the eggs remain tender and the tomato juices are still glossy.",
        "關火後立即上桌，讓蛋塊保持柔嫩、番茄汁維持光亮。",
        "火を止め、卵が柔らかくトマトの汁につやがあるうちにすぐ盛る。",
        "불을 끄고 달걀이 부드럽고 토마토 즙이 윤기 있을 때 바로 낸다.",
        "ปิดไฟและเสิร์ฟทันทีขณะที่ไข่ยังนุ่มและน้ำมะเขือเทศยังเงา"
      )
    }
  ]
};
