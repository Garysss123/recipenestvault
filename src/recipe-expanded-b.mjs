// Expanded, publication-refined methods for the second Chinese recipe set.
// The parent recipe records in src/recipes.mjs remain the source of quantities and timing.

const ml = (en, zhHant, ja, ko, th) => ({
  en,
  "zh-hant": zhHant,
  ja,
  ko,
  th
});

export const expandedInstructionsB = {
  "sweet-sour-pork": [
    {
      title: ml("Marinate the pork", "醃豬肉", "豚肉を下味付けする", "돼지고기 밑간하기", "หมักหมู"),
      body: ml(
        "Cut 500 g pork into 2.5 cm cubes. Mix with 15 ml Shaoxing wine, 15 ml light soy sauce, 1 g white pepper, and 30 g egg white; massage until no liquid pools. Cover and refrigerate for 30 minutes, until the surface feels tacky.",
        "將 500 公克豬肉切成 2.5 公分方塊，加入 15 毫升紹興酒、15 毫升淡醬油、1 公克白胡椒粉與 30 公克蛋白拌勻，按摩至沒有液體積在碗底。覆蓋冷藏 30 分鐘，表面應呈黏稠狀。",
        "豚肉500gを2.5cm角に切り、紹興酒15ml、薄口しょうゆ15ml、白こしょう1g、卵白30gを加える。液体がたまらなくなるまで揉み、覆って30分冷蔵する。表面がねばればよい。",
        "돼지고기 500g을 2.5cm 주사위로 썬다. 샤오싱주 15ml, 양조간장 15ml, 흰 후추 1g, 달걀흰자 30g을 넣고 바닥에 액체가 고이지 않을 때까지 주무른다. 덮어 30분 냉장하고 표면이 끈적해지면 된다.",
        "หั่นหมู 500 กรัมเป็นเต๋า 2.5 ซม. คลุกเหล้าจีน 15 มล. ซีอิ๊วขาว 15 มล. พริกไทยขาว 1 กรัม และไข่ขาว 30 กรัม นวดจนไม่มีน้ำขัง ปิดฝาแช่เย็น 30 นาทีจนผิวเหนียวเล็กน้อย"
      )
    },
    {
      title: ml("Mix the sauce", "調醬與粉漿", "たれと水溶きスターチを作る", "소스와 전분물 만들기", "ผสมซอส"),
      body: ml(
        "Whisk 60 g ketchup, 45 ml rice vinegar, 50 g sugar, 60 ml water, and 10 ml light soy sauce. In a separate cup mix 8 g cornstarch with 15 ml water; keep both ready before frying.",
        "將 60 公克番茄醬、45 毫升米醋、50 公克砂糖、60 毫升水與 10 毫升淡醬油攪勻。另杯將 8 公克玉米粉與 15 毫升水調開，炸肉前備妥。",
        "ケチャップ60g、米酢45ml、砂糖50g、水60ml、薄口しょうゆ10mlを混ぜる。別のカップでコーンスターチ8gを水15mlに溶き、揚げる前に両方を用意する。",
        "케첩 60g, 쌀식초 45ml, 설탕 50g, 물 60ml, 양조간장 10ml를 섞는다. 다른 컵에 옥수수전분 8g과 물 15ml를 풀어 튀기기 전에 준비한다.",
        "ตีซอสมะเขือเทศ 60 กรัม น้ำส้มสายชูข้าว 45 มล. น้ำตาล 50 กรัม น้ำ 60 มล. และซีอิ๊วขาว 10 มล. แยกละลายแป้งข้าวโพด 8 กรัมกับน้ำ 15 มล. เตรียมไว้ก่อนทอด"
      )
    },
    {
      title: ml("Heat and coat", "加熱油鍋並裹粉", "油を熱して衣を付ける", "기름을 달구고 전분 묻히기", "ตั้งน้ำมันและคลุกแป้ง"),
      body: ml(
        "Heat 1 L neutral oil in a wok or Dutch oven over medium-high heat to 175°C. Toss the marinated pork thoroughly in 100 g cornstarch and shake off loose powder; keep the pieces separate.",
        "炒鍋或厚鍋以中大火將 1 公升中性油加熱至 175°C。將醃好的豬肉充分裹上 100 公克玉米粉，抖掉鬆散粉末並讓肉塊彼此分開。",
        "中華鍋または厚手鍋に無味の油1Lを入れ、中強火で175℃に熱する。下味を付けた豚肉にコーンスターチ100gをよくまぶし、余分な粉を落として互いに離す。",
        "웍이나 두꺼운 냄비에 중성유 1L를 넣고 중강불로 175°C까지 달군다. 밑간한 돼지고기에 옥수수전분 100g을 고루 묻혀 남은 가루를 털고 서로 떨어뜨려 둔다.",
        "ตั้งน้ำมันรสกลาง 1 ลิตรในกระทะหรือหม้อหนาด้วยไฟกลางค่อนแรงให้ถึง 175°C คลุกหมูหมักกับแป้งข้าวโพด 100 กรัมให้ทั่ว สะบัดแป้งส่วนเกินและแยกชิ้นหมูออกจากกัน"
      )
    },
    {
      title: ml("First fry in batches", "分批初炸", "分けて一度揚げる", "나누어 1차 튀기기", "ทอดครั้งแรกเป็นชุด"),
      body: ml(
        "Fry the pork in 3–4 batches, one layer at a time, for 3–4 minutes per batch. Remove each batch when pale golden and cooked through, with the centre at 63°C, and drain on a rack.",
        "豬肉分 3–4 批、每批單層下鍋，每批炸 3–4 分鐘。外表淡金色且中心達 63°C、完全熟透就撈出，放網架瀝油。",
        "豚肉を3～4回に分け、一層ずつ各3～4分揚げる。薄いきつね色で中心が63℃になり火が通ったら取り出し、網で油を切る。",
        "돼지고기를 3–4번으로 나누어 한 겹씩 튀긴다. 한 번에 3–4분, 연한 황금색이고 중심 63°C로 속까지 익으면 건져 망에서 기름을 뺀다.",
        "ทอดหมูเป็น 3–4 ชุด ชุดละชั้นเดียว 3–4 นาที ตักแต่ละชุดเมื่อสีทองอ่อนและสุกทั่ว ใจกลางถึง 63°C แล้วพักบนตะแกรงให้สะเด็ดน้ำมัน"
      )
    },
    {
      title: ml("Refry for crispness", "復炸至酥脆", "二度揚げでカリッとさせる", "두 번 튀겨 바삭하게 하기", "ทอดซ้ำให้กรอบ"),
      body: ml(
        "Raise the oil to 190°C over high heat. Refry each drained batch for 60–90 seconds until deep golden, audibly crisp, and at least 63°C at the thickest centre. Return it to the rack and rest it for at least 3 minutes while finishing the sauce.",
        "轉大火將油溫升至 190°C。每批瀝乾的豬肉回鍋復炸 60–90 秒，至深金黃色、發出清脆聲且最厚處至少達 63°C。放回網架，在完成醬汁期間至少靜置 3 分鐘。",
        "強火で油を190℃まで上げる。水気を切った豚肉を各回60～90秒二度揚げし、濃いきつね色でカリッとし、最も厚い部分が63℃以上になったら網に戻す。たれを仕上げる間に3分以上休ませる。",
        "센 불로 기름을 190°C까지 올린다. 물을 뺀 각 배치를 60–90초 다시 튀겨 짙은 황금색으로 바삭해지고 가장 두꺼운 중심이 63°C 이상이면 망에 올린다. 소스를 마무리하는 동안 최소 3분 둔다.",
        "เร่งไฟแรงให้น้ำมันถึง 190°C ทอดหมูแต่ละชุดซ้ำ 60–90 วินาทีจนสีทองเข้ม กรอบ และใจกลางส่วนหนาสุดอย่างน้อย 63°C แล้วพักบนตะแกรงอย่างน้อย 3 นาทีระหว่างทำซอส"
      )
    },
    {
      title: ml("Stir-fry the vegetables", "炒蔬菜", "野菜を炒める", "채소 볶기", "ผัดผัก"),
      body: ml(
        "Pour off oil until only 10 ml remains. Over medium-high heat, stir-fry 10 g ginger, 80 g onion, and 100 g each red, yellow, and green bell pepper for 2 minutes; they should be bright and just tender.",
        "倒出多餘油脂只留 10 毫升。中大火炒 10 公克薑、80 公克洋蔥，以及紅、黃、綠甜椒各 100 公克 2 分鐘；蔬菜應鮮亮且剛熟，不要炒軟。",
        "油を10mlだけ残す。中強火でしょうが10g、玉ねぎ80g、赤・黄・緑のパプリカ各100gを2分炒め、色鮮やかで歯ごたえが残る状態にする。",
        "기름은 10ml만 남긴다. 중강불에서 생강 10g, 양파 80g, 빨강·노랑·초록 피망 각 100g을 2분 볶아 색은 선명하고 살짝 아삭하게 익힌다.",
        "เทน้ำมันออกให้เหลือ 10 มล. ผัดขิง 10 กรัม หอมใหญ่ 80 กรัม และพริกหวานแดง เหลือง เขียวอย่างละ 100 กรัมด้วยไฟกลางค่อนแรง 2 นาที ให้สีสดและสุกกรอบพอดี"
      )
    },
    {
      title: ml("Thicken the glaze", "煮稠酸甜醬", "甘酢だれを煮詰める", "새콤달콤 소스 걸쭉하게 하기", "เคี่ยวซอสให้ข้น"),
      body: ml(
        "Add the sauce mixture and bring it to a full simmer for 60 seconds. Stir in the slurry and cook another 30–45 seconds, until the red glaze coats a spoon without clumps.",
        "加入調好的醬汁，大火煮至完整沸騰 60 秒。拌入粉漿再煮 30–45 秒，直到紅色酸甜醬能均勻掛在湯匙上、沒有粉塊。",
        "たれを加えて強く沸かし、60秒煮る。水溶きスターチを混ぜ、さらに30～45秒、赤い甘酢だれがだまなくスプーンにからむまで加熱する。",
        "소스를 넣고 센 불에서 60초 완전히 끓인다. 전분물을 섞어 30–45초 더 익혀 붉은 소스가 덩어리 없이 숟가락에 고르게 붙게 한다.",
        "ใส่ซอสแล้วต้มไฟแรงให้เดือดทั่ว 60 วินาที คนแป้งละลายน้ำลงไป เคี่ยวต่อ 30–45 วินาทีจนซอสแดงเคลือบหลังช้อนได้โดยไม่จับก้อน"
      )
    },
    {
      title: ml("Toss and serve immediately", "回鍋拌勻立即上桌", "和えてすぐ盛る", "버무려 즉시 내기", "คลุกแล้วเสิร์ฟทันที"),
      body: ml(
        "Return the crisp pork to the wok and toss over high heat for 30 seconds, just until glossy. Scatter 10 g scallion and serve at once so the crust stays crisp.",
        "酥脆豬肉回鍋，以大火拌 30 秒至均勻裹上亮醬即可。撒上 10 公克青蔥立即上桌，保持外殼酥脆。",
        "カリッとした豚肉を戻し、強火で30秒、つやが出るまで和える。青ねぎ10gを散らし、衣がカリッとしているうちにすぐ盛る。",
        "바삭한 돼지고기를 웍에 돌려 넣고 센 불에서 30초, 윤기만 입도록 버무린다. 대파 10g을 뿌려 튀김옷이 바삭할 때 바로 낸다.",
        "ใส่หมูกรอบกลับกระทะ คลุกไฟแรง 30 วินาทีพอให้เงา โรยต้นหอม 10 กรัมแล้วเสิร์ฟทันทีเพื่อคงความกรอบ"
      )
    }
  ],

  "char-siu": [
    {
      title: ml("Mix and reserve the basting sauce", "拌醬並預留刷醬", "たれを混ぜ、塗りだれを取り分ける", "양념을 섞고 바를 양념 덜기", "ผสมและแยกซอสทา"),
      body: ml(
        "Mash 20 g red fermented bean curd, 45 g hoisin, 30 g honey, 30 g maltose, 30 ml soy sauce, 15 ml Shaoxing wine, 2 g five-spice, 15 g garlic, 1 g white pepper, and 5 ml sesame oil. Before it touches raw pork, transfer exactly 30 ml to a clean covered bowl and refrigerate it; keep the separate 15 g final honey aside.",
        "將 20 公克紅腐乳、45 公克海鮮醬、30 公克蜂蜜、30 公克麥芽糖、30 毫升醬油、15 毫升紹興酒、2 公克五香粉、15 公克蒜、1 公克白胡椒與 5 毫升芝麻油壓拌均勻。醬料接觸生豬肉前，精確取出 30 毫升放入乾淨有蓋容器冷藏；另將最後刷用的 15 公克蜂蜜放一旁。",
        "紅腐乳20g、ホイシンソース45g、はちみつ30g、麦芽糖30g、しょうゆ30ml、紹興酒15ml、五香粉2g、にんにく15g、白こしょう1g、ごま油5mlをなめらかに混ぜる。生肉に触れる前に30mlを清潔なふた付き容器へ正確に取り分けて冷蔵し、仕上げ用はちみつ15gは別にする。",
        "홍두부 20g, 해선장 45g, 꿀 30g, 맥아당 30g, 간장 30ml, 샤오싱주 15ml, 오향분 2g, 마늘 15g, 흰 후추 1g, 참기름 5ml를 곱게 섞는다. 생고기에 닿기 전에 정확히 30ml를 깨끗한 뚜껑 용기에 덜어 냉장하고 마지막용 꿀 15g은 따로 둔다.",
        "บดเต้าหู้ยี้แดง 20 กรัม ซอสฮอยซิน 45 กรัม น้ำผึ้ง 30 กรัม มอลโทส 30 กรัม ซีอิ๊ว 30 มล. เหล้าจีน 15 มล. ผงห้าเครื่องเทศ 2 กรัม กระเทียม 15 กรัม พริกไทยขาว 1 กรัม และน้ำมันงา 5 มล. ให้เนียน ก่อนแตะหมูดิบ ตวง 30 มล. ใส่ภาชนะสะอาดมีฝาปิดแช่เย็นไว้ทา แยกน้ำผึ้ง 15 กรัมสำหรับท้ายสุด"
      )
    },
    {
      title: ml("Marinate and discard the used sauce", "醃肉並丟棄接觸生肉的醬", "漬け込み、触れたたれを廃棄する", "재우고 생고기에 닿은 양념 버리기", "หมักและทิ้งซอสที่โดนหมูดิบ"),
      body: ml(
        "Coat 900 g pork shoulder strips in the remaining marinade, cover, and refrigerate for 8–24 hours; turn once halfway. The displayed prep time uses the 8-hour minimum. Discard every drop of marinade that touched the raw pork, retaining only the clean 30 ml reserved for basting.",
        "將 900 公克豬肩肉條裹上其餘醃料，加蓋冷藏 8–24 小時，中途翻面一次；頁面備料時間以最低 8 小時計。所有接觸過生豬肉的醃料都要丟棄，只保留預留刷醬用的乾淨 30 毫升。",
        "豚肩肉900gを残りのたれで覆い、ふたをして8～24時間冷蔵する。途中で一度返す。表示の下ごしらえ時間は最短の8時間で計算している。生肉に触れたたれは全て捨て、塗り用に取り分けた清潔な30mlだけを残す。",
        "돼지 목살 900g에 남은 양념을 바르고 덮어 8–24시간 냉장하며 중간에 한 번 뒤집는다. 표시된 준비 시간은 최소 8시간 기준이다. 생고기에 닿은 양념은 전부 버리고 바르기용으로 덜어 둔 깨끗한 30ml만 남긴다.",
        "คลุกหมูไหล่ 900 กรัมกับซอสที่เหลือ ปิดฝาแช่เย็น 8–24 ชั่วโมง และกลับด้านครึ่งเวลา เวลาเตรียมที่แสดงใช้ขั้นต่ำ 8 ชั่วโมง ทิ้งซอสทุกหยดที่สัมผัสหมูดิบ เหลือเฉพาะซอสสะอาด 30 มล. จากขั้นแรก"
      )
    },
    {
      title: ml("Set up the roasting tray", "準備烤盤", "天板を準備する", "오븐 팬 준비하기", "เตรียมถาดอบ"),
      body: ml(
        "Set a rack over a foil-lined roasting tray and pour 350 ml hot water into the tray below it. Heat the oven to 230°C and arrange the pork strips with space between them so air can circulate.",
        "烤盤鋪鋁箔並放上烤架，在烤架下方倒入 350 毫升熱水。烤箱加熱至 230°C，豬肉條彼此留間隔排好，讓熱氣流通。",
        "天板にアルミホイルを敷いて網を置き、その下へ湯350mlを注ぐ。オーブンを230℃に熱し、空気が回るよう豚肉を間隔を空けて並べる。",
        "팬에 호일을 깔고 랙을 올린 뒤 랙 아래에 뜨거운 물 350ml를 붓는다. 오븐을 230°C로 가열하고 공기가 돌도록 고기 사이를 띄워 놓는다.",
        "ปูฟอยล์บนถาดวางตะแกรง เทน้ำร้อน 350 มล. ลงถาดใต้ตะแกรง อุ่นเตาอบที่ 230°C แล้วเรียงหมูให้มีช่องว่างให้อากาศไหล"
      )
    },
    {
      title: ml("Roast the first side", "先烤第一面", "最初に焼く", "첫 면 굽기", "อบด้านแรก"),
      body: ml(
        "Roast the spaced pork at 230°C for 15 minutes, until the edges begin to brown. Keep the tray water below the rack and do not let the pork touch.",
        "以 230°C 烤豬肉 15 分鐘，直到邊緣開始上色。烤架下保持有水，肉條不可互相接觸。",
        "230℃で15分、縁が色づき始めるまで焼く。網の下の湯は保ち、肉同士を触れさせない。",
        "230°C에서 15분, 가장자리가 갈색이 되기 시작할 때까지 굽는다. 랙 아래 물은 유지하고 고기가 서로 닿지 않게 한다.",
        "อบหมูที่ 230°C 15 นาทีจนขอบเริ่มเป็นสีน้ำตาล รักษาน้ำใต้ตะแกรงไว้และอย่าให้หมูแตะกัน"
      )
    },
    {
      title: ml("Baste at the lower heat", "降溫刷醬", "温度を下げて塗る", "온도를 낮춰 바르기", "ลดไฟแล้วทาซอส"),
      body: ml(
        "Whisk 15 ml warm water into the reserved clean 30 ml marinade. Lower the oven to 190°C, brush this mixture over the pork, and roast for 15 minutes more.",
        "將 15 毫升溫水拌入預留的乾淨 30 毫升醬料。烤箱降至 190°C，將此刷醬塗在豬肉上，再烤 15 分鐘。",
        "取り分けた清潔なたれ30mlにぬるま湯15mlを混ぜる。オーブンを190℃に下げ、豚肉に塗ってさらに15分焼く。",
        "따로 둔 깨끗한 양념 30ml에 미지근한 물 15ml를 섞는다. 오븐을 190°C로 낮추고 고기에 바른 뒤 15분 더 굽는다.",
        "ผสมน้ำอุ่น 15 มล. กับซอสสะอาดที่แยกไว้ 30 มล. ลดเตาอบเหลือ 190°C ทาบนหมูแล้วอบต่อ 15 นาที"
      )
    },
    {
      title: ml("Lacquer with honey", "刷蜂蜜上色", "はちみつで照りを出す", "꿀로 윤기 내기", "ทาน้ำผึ้งให้เงา"),
      body: ml(
        "Brush the separate 15 g final honey over the pork. Raise the oven to 220°C and roast for 5–8 minutes, turning once, until the surface is mahogany and bubbling; the thickest centre must reach at least 63°C, or 68°C for a firmer slice.",
        "將另放的 15 公克最後刷用蜂蜜塗在豬肉上。烤箱升至 220°C 烤 5–8 分鐘，中途翻面一次，直到表面棗紅並冒泡；最厚處須至少達 63°C，想要較紮實的切片則達 68°C。",
        "別にした仕上げ用はちみつ15gを豚肉に塗る。オーブンを220℃に上げ、途中で一度返しながら5～8分焼く。表面が赤褐色で泡立ち、最厚部が63℃以上（しっかりした食感なら68℃）になればよい。",
        "따로 둔 마무리용 꿀 15g을 고기에 바른다. 오븐을 220°C로 올려 5–8분 굽고 중간에 한 번 뒤집는다. 표면이 적갈색으로 보글거리고 가장 두꺼운 중심이 63°C 이상(단단한 식감은 68°C)이면 된다.",
        "ทาน้ำผึ้ง 15 กรัมที่แยกไว้บนหมู เร่งเตาเป็น 220°C อบ 5–8 นาที กลับหนึ่งครั้งจนผิวสีน้ำตาลแดงเข้มมีฟอง ใจกลางส่วนหนาสุดต้องอย่างน้อย 63°C หรือ 68°C หากชอบเนื้อแน่น"
      )
    },
    {
      title: ml("Rest and slice", "靜置切片", "休ませて切る", "쉬었다가 썰기", "พักแล้วหั่น"),
      body: ml(
        "Rest the pork on the rack for 10 minutes so the juices settle. Slice across the grain into 5 mm pieces and brush lightly with the tray juices; do not slice while piping hot.",
        "豬肉留在烤架靜置 10 分鐘使肉汁穩定。逆紋切成 5 毫米片，薄刷烤盤肉汁；不要剛出爐就切。",
        "肉汁を落ち着かせるため、網の上で10分休ませる。繊維を断つ向きに5mm厚に切り、天板の肉汁を薄く塗る。熱々で切らない。",
        "고기를 랙에서 10분 쉬어 육즙을 안정시킨다. 결 반대로 5mm 두께로 썰고 팬의 육즙을 얇게 바른다. 뜨거울 때 바로 썰지 않는다.",
        "พักหมูบนตะแกรง 10 นาทีให้น้ำในเนื้อกระจาย หั่นขวางเส้นใยหนา 5 มม. ทาน้ำจากถาดบางๆ อย่าหั่นตอนร้อนจัด"
      )
    },
    {
      title: ml("Serve with the listed parsley", "以巴西里上桌", "パセリを添えて供する", "파슬리와 내기", "เสิร์ฟกับพาร์สลีย์"),
      body: ml(
        "Arrange the slices on a plate and place the one small curly-parsley sprig at the side. The sprig is the only listed serving garnish; serve while the glaze is glossy.",
        "將叉燒片排盤，盤側放 1 小枝捲葉巴西里。這枝巴西里是唯一列出的擺盤配料，趁醬面明亮時上桌。",
        "叉焼を盛り、皿の端にカーリーパセリ1小枝だけを置く。記載された盛り付け用飾りはこれだけ。たれがつややかなうちに供する。",
        "차슈를 접시에 담고 옆에 컬리 파슬리 작은 가지 1개만 둔다. 목록에 있는 유일한 고명이며 소스가 윤기 있을 때 낸다.",
        "จัดหมูหั่นใส่จาน วางพาร์สลีย์ใบหยิกกิ่งเล็ก 1 กิ่งไว้ข้างจานเท่านั้น เป็นเครื่องตกแต่งเดียวที่ระบุไว้ และเสิร์ฟขณะซอสยังเงา"
      )
    }
  ],

  "clay-pot-rice": [
    {
      title: ml("Rinse, soak, and oil the pot", "洗米浸泡並抹鍋", "米を洗い、浸水して鍋に油を塗る", "쌀 씻고 불린 뒤 냄비에 기름 바르기", "ล้างแช่ข้าวและทาน้ำมันหม้อ"),
      body: ml(
        "Rinse 200 g jasmine or long-grain rice until nearly clear. Add exactly 240 ml water to the clay pot, soak for 60 minutes, and lightly coat the inner rim with 5 ml neutral oil; the grains should be hydrated.",
        "將 200 公克茉莉香米或長米洗至水接近清澈，放入砂鍋加精確 240 毫升水浸泡 60 分鐘，鍋內邊緣薄抹 5 毫升中性油；米粒應充分吸水。",
        "ジャスミン米または長粒米200gを水がほぼ透明になるまで洗う。土鍋に水240mlを正確に入れて60分浸水し、内側の縁に無味の油5mlを薄く塗る。米が吸水すればよい。",
        "자스민 쌀 또는 장립종 200g을 물이 거의 맑아질 때까지 씻는다. 뚝배기에 물 240ml를 정확히 넣어 60분 불리고 안쪽 가장자리에 중성유 5ml를 얇게 바른다. 쌀알이 충분히 불어야 한다.",
        "ล้างข้าวหอมมะลิหรือข้าวเมล็ดยาว 200 กรัมจนน้ำเกือบใส เติมน้ำ 240 มล. พอดีในหม้อดิน แช่ 60 นาที แล้วทาน้ำมันรสกลาง 5 มล. บางๆ ที่ขอบด้านใน เมล็ดข้าวควรอิ่มน้ำ"
      )
    },
    {
      title: ml("Bring the soaked rice to a boil", "煮米至沸騰並放臘味", "米を沸かして肉をのせる", "불려 둔 밥 끓이고 고기 올리기", "ต้มข้าวแล้ววางเนื้อหมัก"),
      body: ml(
        "Set the uncovered pot over medium heat and bring it to a boil in about 5–8 minutes. Lay 150 g cured pork belly, 100 g sliced sweet Chinese sausage and 10 g sliced ginger over the rice without stirring.",
        "砂鍋不加蓋以中火加熱，約 5–8 分鐘煮沸。將 150 公克臘肉、100 公克切片甜味臘腸與 10 公克薑片鋪在米飯上，不要攪拌。",
        "土鍋をふたなしで中火にかけ、約5～8分で沸騰させる。米を混ぜずに、塩漬け豚バラ肉150g、甘い中国ソーセージ100g、薄切りしょうが10gを上に並べる。",
        "뚝배기를 뚜껑 없이 중불에 올려 약 5–8분 끓인다. 밥을 젓지 말고 염장 삼겹살 150g, 단맛 중국 소시지 100g, 얇게 썬 생강 10g을 위에 올린다.",
        "ตั้งหม้อเปิดฝาด้วยไฟกลาง ต้มให้เดือดประมาณ 5–8 นาที วางหมูสามชั้นหมักเกลือ 150 กรัม กุนเชียงจีน 100 กรัม และขิงซอย 10 กรัมบนข้าวโดยไม่คน"
      )
    },
    {
      title: ml("Simmer covered", "加蓋小火煮", "ふたをして弱火で炊く", "덮어 약불로 익히기", "ปิดฝาเคี่ยวไฟอ่อน"),
      body: ml(
        "Cover, reduce to the lowest heat, and simmer for 10 minutes. Listen for a gentle hiss rather than a hard boil; the rice should be nearly tender and most water absorbed.",
        "加蓋轉最小火煮 10 分鐘。應聽到輕微嘶聲而非猛烈沸騰；米飯接近熟透，水分大致吸收。",
        "ふたをして最弱火で10分炊く。激しい沸騰ではなく小さな音がし、米がほぼ柔らかく水分がほとんど吸われればよい。",
        "뚜껑을 덮어 최저 불에서 10분 끓인다. 세게 끓는 소리 대신 잔잔한 치익 소리가 나고 밥이 거의 익으며 물이 대부분 흡수되어야 한다.",
        "ปิดฝา ลดเป็นไฟอ่อนสุด เคี่ยว 10 นาที ควรได้ยินเสียงฉ่าเบาๆ ไม่เดือดแรง ข้าวเกือบนุ่มและน้ำถูกดูดไปเกือบหมด"
      )
    },
    {
      title: ml("Mix the seasoned soy", "混合調味醬油", "調味しょうゆを混ぜる", "조미 간장 섞기", "ผสมซีอิ๊วปรุงรส"),
      body: ml(
        "Mix 30 ml light soy sauce, 15 ml seasoned soy sauce, 7.5 ml dark soy sauce, 15 ml fish sauce, 2 g sugar, and 0.5 g white pepper. Do not add extra seasoning beyond these measured amounts.",
        "混合 30 毫升淡醬油、15 毫升調味醬油、7.5 毫升老抽、15 毫升魚露、2 公克砂糖與 0.5 公克白胡椒粉；不要超出這些定量調味。",
        "薄口しょうゆ30ml、調味しょうゆ15ml、濃口しょうゆ7.5ml、魚醤15ml、砂糖2g、白こしょう0.5gを混ぜる。計量外の調味料は加えない。",
        "양조간장 30ml, 조미 간장 15ml, 진간장 7.5ml, 액젓 15ml, 설탕 2g, 흰 후추 0.5g을 섞는다. 계량한 양 외의 양념은 넣지 않는다.",
        "ผสมซีอิ๊วขาว 30 มล. ซีอิ๊วปรุงรส 15 มล. ซีอิ๊วดำ 7.5 มล. น้ำปลา 15 มล. น้ำตาล 2 กรัม และพริกไทยขาว 0.5 กรัม ไม่เติมเครื่องปรุงนอกเหนือจากปริมาณนี้"
      )
    },
    {
      title: ml("Season the rice", "淋醬再煮", "たれを回しかけて炊く", "소스 붓고 더 익히기", "ราดซอสแล้วเคี่ยวต่อ"),
      body: ml(
        "After the first 10-minute simmer, uncover and pour the seasoned soy evenly over the rice. Cover again and cook on low for 3 minutes; the sauce should be absorbed rather than pooled.",
        "小火煮滿前一段 10 分鐘後開蓋，將調味醬油均勻淋在飯上。重新加蓋小火煮 3 分鐘，醬汁應被米飯吸收而非積在表面。",
        "最初の弱火10分後にふたを外し、調味しょうゆを米全体に回しかける。ふたを戻し、弱火で3分炊く。たれが表面にたまらず吸われればよい。",
        "약불 10분 후 뚜껑을 열고 조미 간장을 밥 전체에 고르게 붓는다. 다시 덮어 약불에서 3분 익혀 소스가 표면에 고이지 않고 흡수되게 한다.",
        "หลังเคี่ยวไฟอ่อน 10 นาทีแรก เปิดฝาแล้วราดซีอิ๊วปรุงรสให้ทั่วข้าว ปิดฝาเคี่ยวไฟอ่อนอีก 3 นาที ซอสควรถูกข้าวดูดไม่ขังบนผิว"
      )
    },
    {
      title: ml("Set the crisp rice", "形成飯焦", "おこげを作る", "누룽지 만들기", "ทำข้าวกรอบก้นหม้อ"),
      body: ml(
        "Turn the heat to medium-high for 2–3 minutes to set a thin crisp rice layer. Stop when the bottom smells toasted, before any burnt smell appears.",
        "轉中大火 2–3 分鐘讓鍋底形成薄脆飯焦。聞到烘烤香就停止，不能等到出現焦苦味。",
        "中強火にして2～3分、薄いおこげを固める。底から香ばしい匂いがしたら、焦げ臭くなる前に止める。",
        "중강불로 2–3분 가열해 얇은 누룽지 층을 만든다. 바닥에서 구수한 향이 나면 탄 냄새가 나기 전에 멈춘다.",
        "เร่งเป็นไฟกลางค่อนแรง 2–3 นาทีให้ก้นหม้อเกิดข้าวกรอบบางๆ หยุดเมื่อมีกลิ่นคั่วหอมก่อนมีกลิ่นไหม้"
      )
    },
    {
      title: ml("Slice the cured meats", "切臘味", "肉を切る", "염장육 썰기", "หั่นเนื้อหมัก"),
      body: ml(
        "Before removing the cured pork and sausage, check that the thickest pieces reach 74°C; if not, cover and cook over low heat for 2 more minutes, then recheck. Slice them to their existing 5 mm thickness and return them with 25 g chopped scallion, keeping the rice intact.",
        "取出臘肉與臘腸前，確認最厚處達 74°C；若未達，蓋鍋以小火再煮 2 分鐘後重測。依原本 5 毫米厚度切片，與 25 公克碎青蔥一起放回鍋中，保持米飯完整。",
        "塩漬け豚肉とソーセージを取り出す前に、最も厚い部分が74℃か確認する。未達ならふたをして弱火でさらに2分加熱し、再確認する。もとの厚さ5mmに切り、刻みねぎ25gとともに鍋へ戻して米を崩さない。",
        "염장 고기와 소시지를 꺼내기 전에 가장 두꺼운 부분이 74°C인지 확인한다. 미달이면 덮어 약불에서 2분 더 익힌 뒤 다시 확인한다. 원래 두께인 5mm로 썰어 다진 대파 25g과 함께 돌려 넣고 밥은 흐트러뜨리지 않는다.",
        "ก่อนตักหมูหมักและกุนเชียงออก ให้ตรวจชิ้นหนาสุดถึง 74°C หากยังไม่ถึงให้ปิดฝาและหุงไฟอ่อนเพิ่ม 2 นาทีแล้วตรวจอีกครั้ง หั่นหนา 5 มม. ตามเดิม ใส่กลับพร้อมต้นหอมสับ 25 กรัมโดยไม่ทำข้าวแตก"
      )
    },
    {
      title: ml("Rest and fold from the bottom", "靜置後由底部翻拌", "休ませて底から混ぜる", "뜸 들인 뒤 바닥부터 섞기", "พักแล้วคลุกจากก้นหม้อ"),
      body: ml(
        "Turn off the heat, cover, and rest for 5 minutes. Fold gently from the bottom so the crisp rice remains in pieces; serve when the grains are separate and the crust is still audible.",
        "關火加蓋靜置 5 分鐘。由鍋底輕輕翻拌，讓飯焦保留成片；米粒分明、飯焦仍有酥脆聲時上桌。",
        "火を止めてふたをし、5分休ませる。底からそっと返しておこげを塊で残し、米がほぐれ、香ばしい音が残るうちに供する。",
        "불을 끄고 덮어 5분 뜸 들인다. 바닥부터 살살 접어 누룽지를 조각으로 남긴다. 밥알이 흩어지고 누룽지가 바삭한 소리를 낼 때 낸다.",
        "ปิดไฟ ปิดฝาพัก 5 นาที คลุกเบาๆ จากก้นหม้อให้ข้าวกรอบยังเป็นชิ้น เสิร์ฟเมื่อเมล็ดร่วนและข้าวกรอบยังมีเสียงกรอบ"
      )
    }
  ],

  "beef-chow-fun": [
    {
      title: ml("Velvet the beef", "醃拌牛肉", "牛肉を下味付けする", "소고기 밑간하기", "หมักเนื้อให้นุ่ม"),
      body: ml(
        "Mix 280 g flank steak, sliced 3 mm across the grain, with 20 ml water, 1 g baking soda, 5 g cornstarch, 10 ml oyster sauce, 10 ml Shaoxing wine, and 5 ml light soy sauce. Massage for 2 minutes until tacky, cover, and marinate 30 minutes.",
        "將 280 公克牛腹肉逆紋切成 3 毫米薄片，加入 20 毫升水、1 公克小蘇打、5 公克玉米粉、10 毫升蠔油、10 毫升紹興酒與 5 毫升淡醬油。按摩 2 分鐘至黏稠，覆蓋醃 30 分鐘。",
        "牛フランク280gを繊維に逆らって3mmに切り、水20ml、重曹1g、コーンスターチ5g、オイスターソース10ml、紹興酒10ml、薄口しょうゆ5mlを混ぜる。2分揉んで粘りを出し、覆って30分漬ける。",
        "플랭크 스테이크 280g을 결 반대로 3mm로 썬다. 물 20ml, 베이킹소다 1g, 옥수수전분 5g, 굴소스 10ml, 샤오싱주 10ml, 양조간장 5ml를 넣는다. 2분 주물러 끈기를 낸 뒤 덮어 30분 재운다.",
        "หั่นเนื้อส่วนข้าง 280 กรัมขวางเส้นหนา 3 มม. คลุกน้ำ 20 มล. เบกกิ้งโซดา 1 กรัม แป้งข้าวโพด 5 กรัม ซอสหอยนางรม 10 มล. เหล้าจีน 10 มล. และซีอิ๊วขาว 5 มล. นวด 2 นาทีจนเหนียว ปิดฝาหมัก 30 นาที"
      )
    },
    {
      title: ml("Loosen noodles and mix the sauce", "回溫河粉並拌醬", "麺を戻し、たれを混ぜる", "면을 풀고 소스 섞기", "คลายเส้นและผสมซอส"),
      body: ml(
        "Let the sealed 340 g fresh wide rice noodles stand at room temperature for 20 minutes, then separate them gently by hand. Do not soak or rinse; discard pieces that remain hard or smell sour. Mix 30 ml Shaoxing wine, 30 ml light soy sauce, 10 ml dark soy sauce, 5 ml sesame oil, 2 g sugar, and 0.5 g white pepper.",
        "將密封的 340 公克新鮮寬河粉在室溫放 20 分鐘，再用手輕輕分開。不要浸水或沖洗；仍硬結或帶酸味的部分丟棄。混合 30 毫升紹興酒、30 毫升淡醬油、10 毫升老抽、5 毫升芝麻油、2 公克砂糖與 0.5 公克白胡椒。",
        "密封した生の幅広米麺340gを室温に20分置き、手でそっとほぐす。水に浸したり洗ったりせず、硬いまま、または酸っぱい匂いの部分は捨てる。紹興酒30ml、薄口しょうゆ30ml、濃口しょうゆ10ml、ごま油5ml、砂糖2g、白こしょう0.5gを混ぜる。",
        "밀봉한 생 넓은 쌀국수 340g을 실온에 20분 둔 뒤 손으로 부드럽게 푼다. 물에 담그거나 헹구지 말고 계속 딱딱하거나 신 냄새가 나는 부분은 버린다. 샤오싱주 30ml, 양조간장 30ml, 진간장 10ml, 참기름 5ml, 설탕 2g, 흰 후추 0.5g을 섞는다.",
        "พักเส้นใหญ่สด 340 กรัมที่ปิดถุงสนิทไว้ที่อุณหภูมิห้อง 20 นาที แล้วแยกเส้นด้วยมือเบาๆ ห้ามแช่หรือล้างน้ำ ทิ้งส่วนที่ยังแข็งหรือมีกลิ่นเปรี้ยว ผสมเหล้าจีน 30 มล. ซีอิ๊วขาว 30 มล. ซีอิ๊วดำ 10 มล. น้ำมันงา 5 มล. น้ำตาล 2 กรัม และพริกไทยขาว 0.5 กรัม"
      )
    },
    {
      title: ml("Sear the beef", "快炒牛肉", "牛肉を焼き付ける", "소고기 재빨리 굽기", "จี่เนื้อ"),
      body: ml(
        "Heat a wok over high heat until a water drop evaporates instantly. Add 15 ml oil and sear the beef in a single layer for 60–90 seconds per side. Remove it when browned and about 80% cooked so it will finish later.",
        "炒鍋大火加熱至滴水立即蒸發，加入 15 毫升油。牛肉單層下鍋，每面快炒 60–90 秒；表面上色、約 80% 熟就取出，稍後再完成加熱。",
        "水滴がすぐ蒸発するまで中華鍋を強火で熱す。油15mlを加え、牛肉を一層にして片面60～90秒ずつ焼く。焼き色が付き約80%火が通ったら取り出し、後で仕上げる。",
        "웍을 센 불로 달궈 물방울이 즉시 증발하게 한다. 기름 15ml를 넣고 소고기를 한 겹으로 60–90초씩 굽는다. 갈색이 나고 80% 익으면 빼서 나중에 마저 익힌다.",
        "ตั้งกระทะไฟแรงจนหยดน้ำระเหยทันที ใส่น้ำมัน 15 มล. จี่เนื้อชั้นเดียวด้านละ 60–90 วินาที ตักออกเมื่อเป็นสีน้ำตาลและสุกประมาณ 80% เพื่อกลับมาให้สุกท้ายสุด"
      )
    },
    {
      title: ml("Bloom ginger and scallion", "爆香薑蔥", "しょうがとねぎを香らせる", "생강과 대파 향 내기", "ผัดขิงและต้นหอมให้หอม"),
      body: ml(
        "Wipe out burnt bits, return the wok to high heat, and add the remaining 30 ml oil. Stir-fry 15 g thinly sliced ginger and 80 g scallion pieces for 30 seconds, until fragrant.",
        "擦掉焦黑碎屑，炒鍋回大火加入其餘 30 毫升油。薑片 15 公克與青蔥段 80 公克下鍋炒 30 秒，直到出香。",
        "焦げた粒を拭き、鍋を強火に戻して残りの油30mlを加える。薄切りしょうが15gとねぎ80gを30秒炒め、香りを出す。",
        "탄 부스러기를 닦고 웍을 센 불로 되돌려 남은 기름 30ml를 넣는다. 얇게 썬 생강 15g과 대파 80g을 30초 볶아 향을 낸다.",
        "เช็ดเศษไหม้ ตั้งกระทะไฟแรง ใส่น้ำมันที่เหลือ 30 มล. ผัดขิงหั่นบาง 15 กรัมกับต้นหอม 80 กรัม 30 วินาทีจนหอม"
      )
    },
    {
      title: ml("Toss in the noodles", "加入河粉翻炒", "麺を加えて返す", "면 넣고 볶기", "ใส่เส้นแล้วผัด"),
      body: ml(
        "Add the separated noodles and toss with a lifting motion for 2 minutes. Keep the strands moving without crushing them; they should begin to heat through while staying intact.",
        "加入分開的河粉，以提起翻動的方式炒 2 分鐘。讓麵條移動但不要壓碎；河粉應開始熱透並保持完整。",
        "ほぐした麺を加え、持ち上げるように2分炒める。つぶさず動かし、麺が温まりながら切れずに保たれるようにする。",
        "풀어 둔 면을 넣고 들어 올리듯 2분 볶는다. 면을 누르지 말고 움직여 뜨겁게 하되 끊어지지 않게 한다.",
        "ใส่เส้นที่แยกไว้ ผัดโดยยกพลิก 2 นาที ให้เส้นเคลื่อนตัวโดยไม่กดจนขาด เส้นควรร้อนขึ้นแต่ยังคงรูป"
      )
    },
    {
      title: ml("Add the sauce around the hot wok", "沿鍋邊加醬", "鍋肌からたれを加える", "뜨거운 웍 가장자리에 소스 넣기", "ราดซอสที่ขอบกระทะ"),
      body: ml(
        "Pour the mixed sauce around the hot sides of the wok and stir-fry for another 1–2 minutes. The noodles should be hot, separate, lightly charred, and not wet or saucy.",
        "沿熱鍋邊倒入混合醬汁，再炒 1–2 分鐘。河粉應熱透、分明並帶些焦香，不可濕黏或有湯汁。",
        "熱い鍋肌からたれを回し入れ、さらに1～2分炒める。麺が熱く一本ずつほぐれ、軽く焦げ香があり、濡れたり汁だくにならない状態にする。",
        "뜨거운 웍 가장자리에 섞은 소스를 둘러 넣고 1–2분 더 볶는다. 면이 뜨겁고 서로 떨어지며 살짝 그을리고 젖거나 국물이 고이지 않아야 한다.",
        "ราดซอสที่ขอบกระทะร้อน ผัดต่อ 1–2 นาที เส้นควรร้อน แยกตัว มีรอยเกรียมเล็กน้อย ไม่เปียกหรือมีน้ำซอสขัง"
      )
    },
    {
      title: ml("Return beef and sprouts", "回鍋牛肉與豆芽", "牛肉ともやしを戻す", "소고기와 숙주 돌려 넣기", "ใส่เนื้อและถั่วงอกกลับ"),
      body: ml(
        "Return the seared beef and add 150 g bean sprouts. Toss for 45–60 seconds, stopping when the sprouts remain crisp and the beef reaches 71°C at the centre for immediate serving.",
        "將煎過的牛肉回鍋，加入 150 公克豆芽。拌炒 45–60 秒，豆芽仍脆且牛肉中心達 71°C 時停火並立即上桌。",
        "焼いた牛肉を戻し、もやし150gを加える。45～60秒和え、もやしの歯ごたえを残し、すぐ供する牛肉の中心が71℃になったら止める。",
        "구운 소고기를 돌려 넣고 숙주 150g을 넣는다. 45–60초 버무려 숙주는 아삭하게 유지하고 즉시 낼 소고기 중심이 71°C가 되면 멈춘다.",
        "ใส่เนื้อที่จี่ไว้กลับลงไปและเติมถั่วงอก 150 กรัม คลุก 45–60 วินาที หยุดเมื่อถั่วงอกยังกรอบและใจกลางเนื้อถึง 71°C สำหรับเสิร์ฟทันที"
      )
    },
    {
      title: ml("Serve for wok hei", "趁鑊氣上桌", "鍋気があるうちに供する", "웍헤이가 있을 때 내기", "เสิร์ฟขณะมีกลิ่นกระทะ"),
      body: ml(
        "Turn off the heat and transfer the dry-fried noodles immediately. Serve within a minute so the wide noodles retain their seared wok hei and the sprouts stay crisp.",
        "關火後立即盛出乾炒牛河，1 分鐘內上桌，保留寬河粉的鑊氣與豆芽脆度。",
        "火を止め、乾炒牛河をすぐ盛る。1分以内に供し、幅広麺の焼けた鍋気ともやしの歯ごたえを保つ。",
        "불을 끄고 건식 볶음면을 즉시 담는다. 1분 안에 내야 넓은 면의 웍헤이와 숙주 아삭함이 남는다.",
        "ปิดไฟแล้วตักเส้นผัดแห้งใส่จานทันที เสิร์ฟภายใน 1 นาทีเพื่อคงกลิ่นกระทะของเส้นใหญ่และความกรอบของถั่วงอก"
      )
    }
  ],

  "wonton-soup": [
    {
      title: ml("Make the pork-and-shrimp filling", "製作豬蝦餡", "豚肉とえびのあんを作る", "돼지고기·새우 소 만들기", "ทำไส้หมูกุ้ง"),
      body: ml(
        "Mix 225 g ground pork, 225 g finely chopped shrimp, 15 g minced ginger, 30 g chopped scallion, 15 ml light soy sauce, 30 ml Shaoxing wine, 30 ml sesame oil, and 3 g salt in one direction for 3 minutes. Stop when sticky and cohesive, then refrigerate 15 minutes.",
        "將 225 公克豬絞肉、225 公克切細蝦仁、15 公克薑末、30 公克蔥末、15 毫升淡醬油、30 毫升紹興酒、30 毫升芝麻油與 3 公克鹽朝同一方向攪拌 3 分鐘。餡料黏稠成團後冷藏 15 分鐘。",
        "豚ひき肉225g、細かく刻んだえび225g、しょうが15g、ねぎ30g、薄口しょうゆ15ml、紹興酒30ml、ごま油30ml、塩3gを同じ方向に3分混ぜる。粘りが出てまとまったら15分冷蔵する。",
        "다진 돼지고기 225g, 잘게 다진 새우 225g, 생강 15g, 대파 30g, 양조간장 15ml, 샤오싱주 30ml, 참기름 30ml, 소금 3g을 한 방향으로 3분 섞는다. 끈기 있게 뭉치면 냉장 15분 둔다.",
        "ผสมหมูบด 225 กรัม กุ้งสับ 225 กรัม ขิงสับ 15 กรัม ต้นหอมสับ 30 กรัม ซีอิ๊วขาว 15 มล. เหล้าจีน 30 มล. น้ำมันงา 30 มล. และเกลือ 3 กรัม คนทางเดียว 3 นาทีจนเหนียวจับตัว แช่เย็น 15 นาที"
      )
    },
    {
      title: ml("Fill and seal 48 wontons", "包成 48 顆餛飩", "ワンタンを48個包む", "완탕 48개 빚기", "ห่อเกี๊ยว 48 ชิ้น"),
      body: ml(
        "Divide all filling into 48 equal portions, about 12 g each, and place one in every square wrapper. Moisten the edges with the listed 30 ml sealing water, fold into a triangle, press out all air, and bring the lower corners together. Keep finished wontons covered.",
        "將全部餡料平均分成 48 份，每份約 12 公克，逐一放入方形餛飩皮。用列出的 30 毫升封口水沾濕邊緣，對折成三角形、擠出空氣，再黏合下方兩角；包好的餛飩全程覆蓋。",
        "あんを全て48等分し、1個約12gを正方形の皮に置く。記載した皮を閉じる水30mlで縁を濡らし、三角に折って空気を抜き、下の角を合わせる。包んだワンタンは覆う。",
        "소를 모두 48등분해 한 개당 약 12g씩 사각 완탕피에 넣는다. 목록의 봉합용 물 30ml로 가장자리를 적셔 삼각형으로 접고 공기를 뺀 뒤 아래 모서리를 붙인다. 빚은 완탕은 덮어 둔다.",
        "แบ่งไส้ทั้งหมดเป็น 48 ส่วนเท่าๆ กัน ส่วนละประมาณ 12 กรัม ใส่หนึ่งส่วนต่อแผ่นสี่เหลี่ยม ใช้น้ำปิดขอบ 30 มล. แตะขอบ พับเป็นสามเหลี่ยม ไล่อากาศ แล้วประกบมุมล่าง คลุมเกี๊ยวที่ห่อแล้วไว้"
      )
    },
    {
      title: ml("Warm the clear broth", "加熱清雞湯", "澄んだ鶏だしを温める", "맑은 닭육수 데우기", "อุ่นน้ำซุปใส"),
      body: ml(
        "Warm 1.5 L chicken stock, 40 ml broth soy sauce, 15 g broth ginger, 20 ml broth sesame oil, and 1 g white pepper in a saucepan over medium heat to 85–90°C. Hold it at a bare simmer, never a rolling boil.",
        "將 1.5 公升雞高湯、40 毫升湯用淡醬油、15 公克湯用薑、20 毫升湯用芝麻油與 1 公克白胡椒以中火加熱至 85–90°C。保持微滾，不可大滾。",
        "鍋で鶏がらスープ1.5L、スープ用薄口しょうゆ40ml、しょうが15g、ごま油20ml、白こしょう1gを中火で85～90℃に温める。沸騰させず、静かな煮立ちを保つ。",
        "냄비에 닭 육수 1.5L, 국물용 양조간장 40ml, 생강 15g, 참기름 20ml, 흰 후추 1g을 넣고 중불로 85–90°C까지 데운다. 팔팔 끓이지 말고 약하게 유지한다.",
        "อุ่นน้ำสต๊อกไก่ 1.5 ลิตร ซีอิ๊วขาวสำหรับน้ำซุป 40 มล. ขิง 15 กรัม น้ำมันงา 20 มล. และพริกไทยขาว 1 กรัมด้วยไฟกลางให้ถึง 85–90°C รักษาให้เดือดอ่อน ห้ามเดือดพล่าน"
      )
    },
    {
      title: ml("Boil the wonton water", "煮沸餛飩用水", "ワンタン用の湯を沸かす", "완탕 삶을 물 끓이기", "ต้มน้ำสำหรับเกี๊ยว"),
      body: ml(
        "Bring the separate 2 L wonton-boiling water to a full boil over high heat. Keep the seasoned broth at its 85–90°C bare simmer while this pot comes to temperature.",
        "另鍋將 2 公升煮餛飩用水以大火煮至完全沸騰；同時讓調味高湯維持 85–90°C 微滾。",
        "別鍋のワンタン用の水2Lを強火で沸騰させる。その間、味付けしただしは85～90℃の静かな煮立ちに保つ。",
        "별도 냄비의 완탕 삶을 물 2L를 센 불로 완전히 끓인다. 그동안 간한 육수는 85–90°C의 약한 끓음을 유지한다.",
        "ต้มน้ำ 2 ลิตรสำหรับต้มเกี๊ยวในหม้อแยกด้วยไฟแรงให้เดือดจัด ระหว่างนั้นรักษาน้ำซุปปรุงรสให้เดือดอ่อนที่ 85–90°C"
      )
    },
    {
      title: ml("Cook three batches", "分三批煮餛飩", "3回に分けてゆでる", "세 번 나누어 삶기", "ต้มสามชุด"),
      body: ml(
        "Cook 16 wontons per batch, three batches for all 48, at a gentle boil for 3–5 minutes. Move them gently so they do not stick; keep the water from becoming a violent boil.",
        "48 顆分 3 批、每批 16 顆，以溫和沸騰煮 3–5 分鐘。輕輕移動避免沾底，水不可猛烈翻滾。",
        "48個を3回、各16個ずつ、静かな沸騰で3～5分ゆでる。くっつかないようそっと動かし、激しく煮立てない。",
        "48개를 3번, 한 번에 16개씩 약하게 끓는 물에서 3–5분 삶는다. 달라붙지 않게 부드럽게 움직이고 세게 끓이지 않는다.",
        "ต้มเกี๊ยวทั้ง 48 ชิ้นเป็น 3 ชุด ชุดละ 16 ชิ้น ในน้ำเดือดอ่อน 3–5 นาที ขยับเบาๆ ไม่ให้ติดและอย่าให้น้ำเดือดแรง"
      )
    },
    {
      title: ml("Check doneness and lift promptly", "確認熟度立即撈起", "火の通りを確認してすくう", "익음 확인하고 바로 건지기", "เช็กสุกแล้วตักทันที"),
      body: ml(
        "Lift a batch as soon as the wontons float, the wrappers look semi-translucent, and the pork-and-shrimp centre reaches 74°C. Do not leave cooked wontons in the boiling water, or the skins become soft.",
        "餛飩浮起、外皮呈半透明且豬蝦餡心達 74°C 後立即撈起。不要把熟餛飩留在熱水中，否則皮會變軟。",
        "ワンタンが浮き、皮が半透明で、豚えびの中心が74℃になったらすぐすくう。ゆで上がりを湯に置くと皮が柔らかくなる。",
        "완탕이 떠오르고 피가 반투명하며 돼지고기·새우 중심이 74°C가 되면 즉시 건진다. 익은 완탕을 물에 두면 피가 물러진다.",
        "ตักแต่ละชุดทันทีเมื่อเกี๊ยวลอย แผ่นกึ่งโปร่งแสง และใจกลางไส้หมูกุ้งถึง 74°C อย่าทิ้งเกี๊ยวสุกไว้ในน้ำร้อนเพราะแผ่นจะนิ่ม"
      )
    },
    {
      title: ml("Divide the bowls", "分碗", "器に分ける", "그릇에 나누기", "แบ่งใส่ชาม"),
      body: ml(
        "Place 12 wontons in each of four bowls. Pour the 85–90°C broth over them and scatter the listed 20 g scallion garnish evenly.",
        "四個碗各放 12 顆餛飩，沖入 85–90°C 高湯，將列出的 20 公克青蔥均勻撒上。",
        "4つの器にワンタンを12個ずつ入れる。85～90℃のだしを注ぎ、記載したねぎ20gを均等に散らす。",
        "네 그릇에 완탕을 12개씩 담는다. 85–90°C 육수를 붓고 목록의 대파 고명 20g을 고르게 뿌린다.",
        "ใส่เกี๊ยวชามละ 12 ชิ้นใน 4 ชาม ราดน้ำซุป 85–90°C และโรยต้นหอม 20 กรัมที่ระบุให้ทั่ว"
      )
    },
    {
      title: ml("Serve within five minutes", "五分鐘內上桌", "5分以内に供する", "5분 안에 내기", "เสิร์ฟภายในห้านาที"),
      body: ml(
        "Serve the four bowls within 5 minutes of assembly. The finished broth should remain clear and hot while the wrappers stay silky rather than swollen.",
        "組碗後 5 分鐘內將四碗上桌。成品高湯應清澈溫熱，餛飩皮保持滑嫩而不是泡脹。",
        "盛り付けから5分以内に4杯を供する。だしは澄んで熱く、皮はふやけずなめらかなままにする。",
        "완성 후 5분 안에 네 그릇을 낸다. 국물은 맑고 뜨거우며 피는 불지 않고 매끈해야 한다.",
        "เสิร์ฟทั้ง 4 ชามภายใน 5 นาทีหลังจัดชาม น้ำซุปควรใสและร้อน แผ่นเกี๊ยวยังลื่นนุ่มไม่พองเละ"
      )
    }
  ],

  jiaozi: [
    {
      title: ml("Make and rest the dough", "製作並醒麵", "生地を作って休ませる", "반죽 만들고 휴지하기", "ทำและพักแป้ง"),
      body: ml(
        "Mix 400 g all-purpose flour, 2 g dough salt, and 210 ml warm water into a shaggy dough. Knead for 8 minutes until smooth, cover, and rest at room temperature for 30 minutes.",
        "將 400 公克中筋麵粉、2 公克麵糰用鹽與 210 毫升溫水拌成粗麵糰，揉 8 分鐘至光滑，覆蓋室溫醒 30 分鐘。",
        "中力粉400g、皮用塩2g、ぬるま湯210mlを粗い生地にまとめる。8分こねてなめらかにし、覆って室温で30分休ませる。",
        "중력분 400g, 반죽 소금 2g, 따뜻한 물 210ml를 거친 반죽으로 섞는다. 8분 치대 매끈하게 한 뒤 덮어 실온 30분 쉰다.",
        "ผสมแป้งอเนกประสงค์ 400 กรัม เกลือสำหรับแป้ง 2 กรัม และน้ำอุ่น 210 มล. เป็นก้อนหยาบ นวด 8 นาทีจนเนียน ปิดพักอุณหภูมิห้อง 30 นาที"
      )
    },
    {
      title: ml("Dry the cabbage and mix the filling", "擠乾白菜拌餡", "白菜の水分を絞ってあんを混ぜる", "배추 물 빼고 소 섞기", "บีบน้ำกะหล่ำแล้วผสมไส้"),
      body: ml(
        "Salt 300 g finely chopped napa cabbage with the 5 g filling salt for 10 minutes, then squeeze out all visible water. Mix it with 400 g ground pork, 40 g scallion, 15 g ginger, 30 ml soy sauce, 15 ml Shaoxing wine, 10 ml sesame oil, and 1 g white pepper until sticky.",
        "將 300 公克切細大白菜與 5 公克餡料用鹽拌勻，醃 10 分鐘後擠出所有可見水分。再與 400 公克豬絞肉、40 公克青蔥、15 公克薑、30 毫升淡醬油、15 毫升紹興酒、10 毫升芝麻油及 1 公克白胡椒拌至黏稠。",
        "刻んだ白菜300gにあん用塩5gを混ぜて10分置き、見える水分を絞る。豚ひき肉400g、ねぎ40g、しょうが15g、薄口しょうゆ30ml、紹興酒15ml、ごま油10ml、白こしょう1gと粘りが出るまで混ぜる。",
        "잘게 썬 배추 300g에 소용 소금 5g을 섞어 10분 둔 뒤 보이는 물을 모두 짠다. 다진 돼지고기 400g, 대파 40g, 생강 15g, 양조간장 30ml, 샤오싱주 15ml, 참기름 10ml, 흰 후추 1g과 끈기 있게 섞는다.",
        "คลุกกะหล่ำปลีจีนสับ 300 กรัมกับเกลือไส้ 5 กรัม พัก 10 นาทีแล้วบีบน้ำออกให้หมด ผสมหมูบด 400 กรัม ต้นหอม 40 กรัม ขิง 15 กรัม ซีอิ๊วขาว 30 มล. เหล้าจีน 15 มล. น้ำมันงา 10 มล. และพริกไทยขาว 1 กรัมจนเหนียว"
      )
    },
    {
      title: ml("Cut and roll 48 wrappers", "切 48 段擀皮", "48枚に分けて皮を伸ばす", "48등분해 만두피 밀기", "ตัดและรีด 48 แผ่น"),
      body: ml(
        "Roll the dough into a 3 cm rope and cut 48 equal pieces. Roll each piece into an 8 cm round with a slightly thicker centre, and keep every piece covered so it does not dry.",
        "麵糰搓成直徑 3 公分長條，平均切成 48 份。每份擀成直徑 8 公分、中心略厚的圓皮，全程覆蓋避免風乾。",
        "生地を直径3cmの棒状にし、48等分する。各片を直径8cm、中央が少し厚い円形に伸ばし、乾かさないよう全て覆う。",
        "반죽을 지름 3cm 막대로 만들어 48등분한다. 각 조각을 가운데가 약간 두꺼운 지름 8cm 원으로 밀고 모두 덮어 마르지 않게 한다.",
        "คลึงแป้งเป็นเส้นเส้นผ่านศูนย์กลาง 3 ซม. ตัดเท่ากัน 48 ชิ้น รีดแต่ละชิ้นเป็นวง 8 ซม. ให้ตรงกลางหนากว่าเล็กน้อย และคลุมทุกชิ้นไม่ให้แห้ง"
      )
    },
    {
      title: ml("Fill and seal", "包餡封口", "あんを包んで閉じる", "소 넣고 봉하기", "ใส่ไส้และปิด"),
      body: ml(
        "Place exactly 15 g filling in each wrapper, pleat and seal firmly with no trapped air. Arrange all 48 dumplings on a lightly floured tray without touching.",
        "每張餃皮放入精確 15 公克餡料，打褶並確實封口，不留空氣。48 顆餃子排在薄撒麵粉的托盤上，彼此不可碰觸。",
        "皮1枚に正確に15gのあんを置き、空気を残さずひだを寄せて閉じる。48個を薄く打ち粉したトレーに触れないよう並べる。",
        "피마다 소를 정확히 15g 넣고 공기가 갇히지 않게 주름을 잡아 봉한다. 48개를 밀가루를 살짝 뿌린 트레이에 서로 닿지 않게 놓는다.",
        "ใส่ไส้ชั่งตรง 15 กรัมต่อแผ่น จับจีบปิดให้แน่นไม่มีอากาศ วางเกี๊ยวทั้ง 48 ชิ้นบนถาดโรยแป้งบางๆ ไม่ให้แตะกัน"
      )
    },
    {
      title: ml("Boil in three 16-piece batches", "分三批、每批 16 顆水煮", "16個ずつ3回に分けてゆでる", "16개씩 세 번 삶기", "ต้มสามชุด ชุดละ 16 ชิ้น"),
      body: ml(
        "For boiled jiaozi, bring 3 L water to a rolling boil over high heat. Cook all 48 in exactly three batches of 16 for 6–8 minutes each. They should float, the wrappers turn slightly translucent, and the centres reach 74°C.",
        "水餃做法：以大火將 3 公升水煮至大滾，48 顆固定分三批、每批 16 顆，各煮 6–8 分鐘。餃子應浮起、皮略透明，餡心達 74°C。",
        "水餃子は水3Lを強火で沸かす。48個を16個ずつ正確に3回に分け、各6～8分ゆでる。浮き、皮が少し透け、中心が74℃になることを確認する。",
        "물만두는 물 3L를 센 불로 팔팔 끓인다. 48개를 정확히 16개씩 세 번 나누어 각 6–8분 삶는다. 떠오르고 피가 살짝 반투명하며 속 중심이 74°C여야 한다.",
        "สำหรับแบบต้ม ต้มน้ำ 3 ลิตรให้เดือดพล่านด้วยไฟแรง แบ่ง 48 ชิ้นเป็นสามชุด ชุดละ 16 ชิ้นพอดี ต้มชุดละ 6–8 นาทีจนลอย แผ่นกึ่งใส และใจกลางถึง 74°C"
      )
    },
    {
      title: ml("Lift and serve boiled jiaozi", "撈起水餃並上桌", "水餃をすくって供する", "물만두 건져 내기", "ตักเกี๊ยวต้มเสิร์ฟ"),
      body: ml(
        "Lift the boiled jiaozi with a slotted spoon as soon as they meet the float, translucency, and 74°C checks. Serve with 45 ml black rice vinegar and 15 ml chili oil on the side.",
        "水餃符合浮起、皮略透明及 74°C 三項判斷後，用漏勺立即撈起。以 45 毫升黑米醋與 15 毫升辣油另碟沾食。",
        "浮き、皮の透け、中心74℃を確認した水餃子を穴あき杓子ですくう。黒米酢45mlとラー油15mlを添える。",
        "떠오르고 피가 반투명하며 중심 74°C가 된 물만두를 구멍 국자로 즉시 건진다. 흑미식초 45ml와 고추기름 15ml를 곁들인다.",
        "ตักเกี๊ยวต้มด้วยกระชอนทันทีเมื่อผ่านเกณฑ์ลอย แผ่นกึ่งใส และใจกลาง 74°C เสิร์ฟคู่กับน้ำส้มสายชูข้าวดำ 45 มล. และน้ำมันพริก 15 มล."
      )
    },
    {
      title: ml("Optional pan-fry batch", "選用煎餃分批", "焼き餃子の分量", "선택 군만두 배치", "ชุดทอดกระทะตัวเลือก"),
      body: ml(
        "For an optional 12-dumpling pan-fry batch, heat 15 ml neutral oil over medium-high heat and brown for 2 minutes. Use a separate 60 ml water measure for that same 12-dumpling batch.",
        "若改做煎餃，每批 12 顆以 15 毫升中性油中大火煎 2 分鐘至上色；同一批另用定量 60 毫升水。",
        "焼き餃子にする場合は12個を1バッチとし、無味の油15mlを中強火で熱して2分焼き色を付ける。同じ12個分に水60mlを使う。",
        "군만두로 할 때는 12개를 한 배치로 하여 중강불에서 중성유 15ml로 2분 굽는다. 같은 12개 배치에 물 60ml를 쓴다.",
        "หากทอดกระทะ ให้ทำครั้งละ 12 ชิ้น ใช้น้ำมันรสกลาง 15 มล. จี่ไฟกลางค่อนแรง 2 นาทีให้เป็นสีทอง และเตรียมน้ำ 60 มล. สำหรับเกี๊ยว 12 ชิ้นชุดนั้น"
      )
    },
    {
      title: ml("Steam-fry and crisp", "加水燜煎至酥", "水を加えて蒸し焼きにする", "물을 넣어 찌고 바삭하게 하기", "เติมน้ำอบแล้วทำให้กรอบ"),
      body: ml(
        "For each optional pan-fry batch, add its 60 ml water, cover for 5 minutes, then uncover for 1 minute. Stop only when the water has evaporated, the bottoms are crisp, and the pork filling reaches 74°C; the boiled method remains the default.",
        "每批選用煎餃加入該批 60 毫升水，加蓋 5 分鐘，再開蓋煎 1 分鐘。必須等水分蒸乾、底部酥脆且豬肉餡心達 74°C 才可停火；預設作法仍是水煮。",
        "焼き餃子は各回に水60mlを加え、ふたをして5分、ふたを外して1分焼く。水が蒸発し、底がカリッとして豚肉の中心が74℃になるまで加熱する。基本の方法は水餃子。",
        "각 군만두 배치에 물 60ml를 넣고 덮어 5분 찐 뒤 뚜껑을 열고 1분 굽는다. 물이 증발하고 바닥이 바삭하며 돼지고기 소 중심이 74°C가 되어야 멈춘다. 기본은 물만두다.",
        "สำหรับแต่ละชุดทอด เติมน้ำ 60 มล. ปิดฝา 5 นาที แล้วเปิดฝาทอดอีก 1 นาที หยุดเมื่อทั้งน้ำระเหย ก้นกรอบ และใจกลางไส้หมูถึง 74°C โดยวิธีหลักยังเป็นแบบต้ม"
      )
    }
  ],

  "scallion-pancakes": [
    {
      title: ml("Make and rest the hot-water dough", "製作並醒燙麵糰", "湯ごね生地を作って休ませる", "뜨거운 물 반죽 만들고 휴지하기", "ทำและพักแป้งน้ำร้อน"),
      body: ml(
        "Mix 300 g flour and 4 g dough salt. Stir in 150 ml boiling water, then 60 ml room-temperature water; knead for 5 minutes until smooth. Cover and rest for 30 minutes.",
        "將 300 公克麵粉與 4 公克麵糰用鹽混合，先拌入 150 毫升沸水，再拌入 60 毫升室溫水；揉 5 分鐘至光滑，覆蓋醒 30 分鐘。",
        "粉300gと生地用塩4gを混ぜ、熱湯150ml、室温水60mlの順に加える。5分こねてなめらかにし、覆って30分休ませる。",
        "밀가루 300g과 반죽 소금 4g을 섞는다. 끓는 물 150ml, 실온 물 60ml 순으로 넣고 5분 치대 매끈하게 만든 뒤 덮어 30분 쉰다.",
        "ผสมแป้ง 300 กรัมกับเกลือสำหรับแป้ง 4 กรัม เติมน้ำเดือด 150 มล. แล้วตามด้วยน้ำอุณหภูมิห้อง 60 มล. นวด 5 นาทีจนเนียน ปิดพัก 30 นาที"
      )
    },
    {
      title: ml("Make the oil paste", "調油酥", "油だねを作る", "기름 반죽 만들기", "ทำส่วนผสมน้ำมัน"),
      body: ml(
        "Stir 30 g flour into 45 ml of the 60 ml neutral oil to make a spreadable paste. Reserve the remaining 15 ml oil for frying the pancakes.",
        "將 30 公克麵粉拌入 60 毫升中性油中的 45 毫升，調成可塗抹油酥；剩餘 15 毫升油留作煎餅。",
        "粉30gに中性油60mlのうち45mlを混ぜ、塗れる油だねにする。残り15mlは焼くために取っておく。",
        "밀가루 30g에 중성유 60ml 중 45ml를 섞어 바를 수 있는 기름 반죽을 만든다. 남은 기름 15ml는 부칠 때 쓴다.",
        "ผสมแป้ง 30 กรัมกับน้ำมันรสกลาง 45 มล. จากทั้งหมด 60 มล. ให้เป็นเนื้อสำหรับทา เก็บน้ำมัน 15 มล. ที่เหลือไว้ทอด"
      )
    },
    {
      title: ml("Roll in scallions", "捲入青蔥", "ねぎを巻き込む", "대파 말아 넣기", "ม้วนต้นหอม"),
      body: ml(
        "Divide the dough into 4 balls. Roll one into a 25 cm by 15 cm rectangle, brush with oil paste, scatter 25 g of the 100 g scallions, and roll from the long edge into a rope. Repeat for all four.",
        "麵糰分成 4 球。一球擀成 25×15 公分長方形，抹油酥，撒 100 公克青蔥中的 25 公克，從長邊捲成長條；四球都如此處理。",
        "生地を4玉に分ける。一つを25×15cmの長方形に伸ばし、油だねを塗り、ねぎ100gのうち25gを散らす。長辺から棒状に巻き、4玉とも同じようにする。",
        "반죽을 4개로 나눈다. 하나를 25×15cm 직사각형으로 밀고 기름 반죽을 바른 뒤 대파 100g 중 25g을 뿌린다. 긴 쪽에서 끈처럼 말고 네 개 모두 반복한다.",
        "แบ่งแป้งเป็น 4 ก้อน รีดก้อนหนึ่งเป็นสี่เหลี่ยม 25×15 ซม. ทาส่วนผสมน้ำมัน โรยต้นหอม 25 กรัมจากทั้งหมด 100 กรัม แล้วม้วนจากด้านยาวเป็นเส้น ทำครบทั้ง 4 ก้อน"
      )
    },
    {
      title: ml("Coil and flatten", "盤捲壓扁", "渦巻きにして伸ばす", "돌돌 말아 펴기", "ขดและกดแบน"),
      body: ml(
        "Coil each rope, tuck its end underneath, flatten it, and roll to a 16 cm round. Keep the layers intact and do not press out all the oil paste.",
        "將每條長麵糰盤成螺旋，尾端塞到底下，壓扁後擀成 16 公分圓餅。保留層次，不要把油酥全部壓出。",
        "各々を渦巻きにして端を下へ入れ、つぶして直径16cmに伸ばす。層を保ち、油だねを全て押し出さない。",
        "각 끈을 달팽이처럼 말아 끝을 아래에 넣고 눌러 16cm 원으로 민다. 층을 유지하고 기름 반죽을 모두 밀어내지 않는다.",
        "ขดเส้นแป้งแต่ละเส้นเป็นก้นหอย ซ่อนปลายไว้ด้านล่าง กดแบนแล้วรีดเป็นวง 16 ซม. รักษาชั้นแป้งและอย่ากดน้ำมันผสมออกหมด"
      )
    },
    {
      title: ml("Rest while shaping the rest", "醒麵並完成其餘麵餅", "休ませながら残りを成形する", "쉬는 동안 나머지 성형하기", "พักระหว่างขึ้นรูปที่เหลือ"),
      body: ml(
        "Cover the first rolled pancake and rest it for 10 minutes while shaping the other three. This short rest relaxes the gluten so the rounds do not spring back.",
        "將第一張擀好的餅覆蓋，醒 10 分鐘，同時完成其餘三張；短暫醒麵可放鬆麩質，圓餅才不會回縮。",
        "最初の円を覆って10分休ませ、その間に残り3枚を成形する。この休みでグルテンが緩み、円が戻りにくくなる。",
        "첫 번째로 민 전병을 덮어 10분 쉬게 하며 나머지 세 장을 만든다. 짧은 휴지가 글루텐을 풀어 반죽이 되돌아오지 않게 한다.",
        "คลุมแผ่นแรกพัก 10 นาทีระหว่างขึ้นรูปอีก 3 แผ่น การพักสั้นๆ ช่วยให้กลูเตนคลายตัว วงแป้งจึงไม่หดกลับ"
      )
    },
    {
      title: ml("Pan-fry at medium heat", "中火煎餅", "中火で焼く", "중불에 부치기", "จี่ด้วยไฟกลาง"),
      body: ml(
        "Heat a skillet over medium heat and use exactly 3.75 ml of the reserved frying oil per pancake. Cook each side for 2–3 minutes, pressing and rotating occasionally, until blistered, crisp, deeply golden, and fully set at the centre.",
        "平底鍋以中火加熱，每張餅精確使用預留煎油 3.75 毫升。每面煎 2–3 分鐘，期間偶爾輕壓並轉動，直到起泡酥脆、深金黃且中心完全熟透。",
        "フライパンを中火で熱し、1枚につき取り分けた焼き油3.75mlを使う。片面2～3分ずつ、時々押して回し、気泡が出てカリッと濃いきつね色、中心まで固まるまで焼く。",
        "팬을 중불로 달구고 전병 한 장마다 남겨 둔 기름 3.75ml를 쓴다. 한 면 2–3분씩 가끔 누르고 돌려 기포가 생기고 바삭한 짙은 황금색, 속까지 완전히 익게 한다.",
        "ตั้งกระทะไฟกลาง ใช้น้ำมันทอดที่เหลือ 3.75 มล. ต่อแผ่น จี่ด้านละ 2–3 นาที กดและหมุนเป็นระยะจนพอง กรอบ สีทองเข้ม และใจกลางสุกตั้งตัว"
      )
    },
    {
      title: ml("Mix the dipping sauce", "調沾醬", "つけだれを混ぜる", "찍는 소스 섞기", "ผสมน้ำจิ้ม"),
      body: ml(
        "Whisk 30 ml light soy sauce, 15 ml rice vinegar, and 10 ml chili oil. Keep the dip separate from the hot pancakes so the surfaces remain crisp.",
        "將 30 毫升淡醬油、15 毫升米醋與 10 毫升辣油攪勻。沾醬與熱餅分開，保持餅面酥脆。",
        "薄口しょうゆ30ml、米酢15ml、ラー油10mlを混ぜる。餅がしんなりしないよう、熱い餅とは別に置く。",
        "양조간장 30ml, 쌀식초 15ml, 고추기름 10ml를 섞는다. 전병이 눅눅해지지 않게 뜨거운 전병과 따로 둔다.",
        "คนซีอิ๊วขาว 30 มล. น้ำส้มสายชูข้าว 15 มล. และน้ำมันพริก 10 มล. แยกน้ำจิ้มจากแพนเค้กร้อนเพื่อให้ผิวยังกรอบ"
      )
    },
    {
      title: ml("Separate the layers and serve", "敲鬆切塊上桌", "層をほぐして盛る", "층을 분리해 내기", "แยกชั้นแล้วเสิร์ฟ"),
      body: ml(
        "Tap the edge of each hot pancake against the board for 10 seconds to separate the layers. Cut into wedges and serve immediately with the measured dip.",
        "將每張熱餅邊緣在砧板上輕敲 10 秒，使層次分開。切成楔形，立即搭配定量沾醬上桌。",
        "熱い餅の縁をまな板に10秒軽く打ち付け、層をほぐす。くし形に切り、計量したたれを添えてすぐ供する。",
        "뜨거운 전병 가장자리를 도마에 10초 가볍게 두드려 층을 나눈다. 쐐기 모양으로 잘라 계량한 소스와 즉시 낸다.",
        "เคาะขอบแผ่นร้อนกับเขียง 10 วินาทีให้ชั้นแยก ตัดเป็นชิ้นสามเหลี่ยมแล้วเสิร์ฟทันทีคู่กับน้ำจิ้มที่ตวงไว้"
      )
    }
  ],

  "peking-duck": [
    {
      title: ml("Dry and season the duck", "擦乾風乾並調味鴨皮", "鴨を乾かして下味を付ける", "오리 말리고 밑간하기", "ซับแห้งและปรุงเป็ด"),
      body: ml(
        "Pat the 1.8 kg air-chilled Pekin duck dry. Separate the skin from the breast and thigh meat without tearing it. Rub 12 g salt and 8 g baking powder over the skin, set it on a rack, and refrigerate uncovered for 12–18 hours until dry and taut.",
        "將 1.8 公斤氣冷北京鴨擦乾，小心在不撕破皮的前提下分離胸肉與腿肉的皮。將 12 公克細鹽與 8 公克泡打粉抹遍鴨皮，放網架裸露冷藏 12–18 小時，直到皮乾且繃緊。",
        "エアチルドの北京ダック1.8kgを拭く。皮を破らず胸と腿の肉から離す。塩12gとベーキングパウダー8gを皮に塗り、網で覆わず12～18時間冷蔵し、乾いて張るまで置く。",
        "공기 냉각 북경오리 1.8kg의 물기를 닦는다. 껍질을 찢지 않게 가슴과 다리 살에서 분리한다. 소금 12g과 베이킹파우더 8g을 껍질에 바르고 랙에서 덮지 않아 12–18시간 냉장해 마르고 팽팽하게 한다.",
        "ซับเป็ดปักกิ่งแช่เย็นแบบลม 1.8 กก. ให้แห้ง แยกหนังจากอกและสะโพกโดยไม่ให้ขาด คลุกเกลือ 12 กรัมกับผงฟู 8 กรัมบนหนัง วางบนตะแกรงแช่เย็นเปิดฝา 12–18 ชั่วโมงจนหนังแห้งตึง"
      )
    },
    {
      title: ml("Scald and glaze the skin", "燙皮並刷糖醬", "皮を湯で締めてたれを塗る", "껍질 데치고 글레이즈 바르기", "ลวกหนังและทาเคลือบ"),
      body: ml(
        "Place the chilled duck on a rack in a clean sink and slowly ladle the listed 3.8 L boiling water over every side; drain well. Stir 45 g maltose into 60 ml boiling water with 15 ml light soy sauce and 30 ml white vinegar, then brush the glaze evenly over the duck.",
        "將冷藏鴨放在乾淨水槽內的網架，緩慢把列出的 3.8 公升沸水淋遍各面，充分瀝乾。將 45 公克麥芽糖加入 60 毫升沸水，拌入 15 毫升淡醬油與 30 毫升白醋，再均勻刷遍鴨身。",
        "冷えた鴨を清潔な流しの網に置き、記載した熱湯3.8Lを全体へゆっくりかけて水気を切る。麦芽糖45gを熱湯60mlで溶き、薄口しょうゆ15mlと白酢30mlを混ぜ、鴨全体に均一に塗る。",
        "차가운 오리를 깨끗한 싱크대의 랙에 놓고 목록의 끓는 물 3.8L를 모든 면에 천천히 끼얹은 뒤 물기를 뺀다. 맥아당 45g을 끓는 물 60ml에 풀고 양조간장 15ml와 백식초 30ml를 섞어 오리 전체에 고르게 바른다.",
        "วางเป็ดเย็นบนตะแกรงในอ่างล้างที่สะอาด ค่อยๆ ราดน้ำเดือด 3.8 ลิตรที่ระบุให้ทั่วทุกด้าน แล้วสะเด็ดน้ำ ละลายมอลโทส 45 กรัมในน้ำเดือด 60 มล. ผสมซีอิ๊วขาว 15 มล. และน้ำส้มสายชูขาว 30 มล. แล้วทาเคลือบทั่วเป็ด"
      )
    },
    {
      title: ml("Dry again and make the dough", "再次風乾並做薄餅麵糰", "もう一度乾かして生地を作る", "다시 말리고 전병 반죽 만들기", "ผึ่งแห้งอีกครั้งและทำแป้งแผ่น"),
      body: ml(
        "Return the glazed duck to the rack and refrigerate uncovered for 6–8 hours, until the skin is dry rather than tacky. Meanwhile mix 240 g pancake flour with 180 ml boiling water, knead 8 minutes until smooth, cover, and rest 60 minutes.",
        "將刷好糖醬的鴨放回網架，裸露冷藏 6–8 小時，直到表皮乾燥不黏。同時將 240 公克薄餅麵粉與 180 毫升沸水拌合，揉 8 分鐘至光滑，加蓋靜置 60 分鐘。",
        "たれを塗った鴨を網に戻し、覆わず6～8時間冷蔵して皮を乾かす。その間にパンケーキ用粉240gへ熱湯180mlを加え、8分こねてなめらかにし、覆って60分休ませる。",
        "윤기를 바른 오리를 랙에 되돌려 덮지 않고 6–8시간 냉장해 껍질을 말린다. 그동안 전병용 밀가루 240g에 끓는 물 180ml를 섞어 8분 매끈하게 반죽하고 덮어 60분 쉰다.",
        "นำเป็ดที่ทาเคลือบกลับวางบนตะแกรง แช่เย็นเปิดฝา 6–8 ชั่วโมงจนหนังแห้งไม่เหนียว ระหว่างนั้นผสมแป้งแผ่น 240 กรัมกับน้ำเดือด 180 มล. นวด 8 นาทีจนเนียน คลุมพัก 60 นาที"
      )
    },
    {
      title: ml("Stack and roll the pancakes", "疊擀薄餅", "パンケーキを重ねて伸ばす", "전병 겹쳐 밀기", "ซ้อนและรีดแผ่นแป้ง"),
      body: ml(
        "Divide the dough into 16 balls. Brush pairs with the listed 15 ml neutral oil, stack each pair, and roll each pair into a 14 cm round; keep the paired layers together before cooking.",
        "麵糰分成 16 球，使用列出的 15 毫升中性油替每兩球刷油、疊合，再將每對擀成 14 公分圓餅；煎前保持雙層疊合。",
        "生地を16個に分け、記載した油15mlを2個ずつに塗って重ねる。各ペアを直径14cmに伸ばし、焼くまで二層を保つ。",
        "반죽을 16개로 나눈다. 목록의 중성유 15ml를 두 개씩 바르고 겹친 뒤 각 쌍을 14cm 원으로 민다. 굽기 전 두 겹을 유지한다.",
        "แบ่งแป้งเป็น 16 ก้อน ใช้น้ำมันรสกลาง 15 มล. ที่ระบุทาเป็นคู่ ซ้อนแต่ละคู่แล้วรีดเป็นวง 14 ซม. รักษาแป้งสองชั้นไว้ก่อนจี่"
      )
    },
    {
      title: ml("Cook and separate the pancakes", "煎餅並分開", "焼いてはがす", "전병 굽고 분리하기", "จี่และแยกแผ่น"),
      body: ml(
        "During the duck's second drying period, cook each paired pancake in a dry skillet over medium heat for 30–45 seconds per side, until small bubbles form. Separate the two layers while warm and cover them so they stay soft; this parallel schedule is included in the displayed prep time.",
        "在鴨子第二次風乾期間，每對薄餅放入乾鍋，以中火每面煎 30–45 秒，直到出現小泡。趁熱分開兩層並覆蓋保濕；頁面備料時間已按此同步流程計算。",
        "鴨を二度目に乾かしている間に、二枚重ねのパンケーキを油なしのフライパンで中火、片面30～45秒ずつ、小さな気泡が出るまで焼く。温かいうちに二枚をはがして覆う。この並行作業は表示の下ごしらえ時間に含む。",
        "오리를 두 번째로 건조하는 동안 겹친 전병을 마른 팬 중불에서 한 면 30–45초씩 작은 기포가 생길 때까지 굽는다. 따뜻할 때 두 겹을 분리해 덮어 둔다. 이 병행 작업은 표시된 준비 시간에 포함된다.",
        "ระหว่างผึ่งเป็ดรอบที่สอง จี่แผ่นแป้งที่ซ้อนคู่ในกระทะแห้งไฟกลางด้านละ 30–45 วินาทีจนเกิดฟองเล็ก แยกสองแผ่นขณะอุ่นแล้วคลุมให้นุ่ม งานที่ทำควบคู่นี้รวมอยู่ในเวลาเตรียมที่แสดง"
      )
    },
    {
      title: ml("Roast at high heat first", "高溫先烤", "高温で最初に焼く", "처음 고온으로 굽기", "อบไฟแรงช่วงแรก"),
      body: ml(
        "Heat the oven to 240°C. Place the duck breast-side up on a rack over the roasting tray, pour the listed 250 ml hot water into the tray below the rack, and roast for 15 minutes.",
        "烤箱預熱至 240°C。鴨胸朝上放在烤盤上方的網架，將列出的 250 毫升熱水倒入網架下的烤盤，先烤 15 分鐘。",
        "オーブンを240℃にする。鴨を胸側を上にして天板の網に置き、記載した湯250mlを網の下へ注ぎ、15分焼く。",
        "오븐을 240°C로 예열한다. 오리를 가슴이 위로 오게 팬 위 랙에 놓고 목록의 뜨거운 물 250ml를 랙 아래 팬에 부어 15분 굽는다.",
        "อุ่นเตาอบที่ 240°C วางเป็ดอกขึ้นบนตะแกรงเหนือถาด เทน้ำร้อน 250 มล. ที่ระบุลงถาดใต้ตะแกรง แล้วอบ 15 นาที"
      )
    },
    {
      title: ml("Finish the roast at 180°C", "180°C 完成烘烤", "180℃で焼き上げる", "180°C로 마저 굽기", "อบต่อที่ 180°C"),
      body: ml(
        "Lower the oven to 180°C and roast for 65–70 minutes more. Stop when the skin is deep mahogany and crisp and the thickest thigh reaches 74°C; loosely tent only areas that darken too quickly.",
        "烤箱降至 180°C，再烤 65–70 分鐘。鴨皮呈深棗紅且酥脆、鴨腿最厚處達 74°C 即可；只有上色過快的部位才鬆蓋鋁箔。",
        "オーブンを180℃に下げ、さらに65～70分焼く。皮が濃い赤褐色でカリッとし、腿の最厚部が74℃になればよい。色が早く濃くなる所だけホイルをゆるくかぶせる。",
        "오븐을 180°C로 낮추고 65–70분 더 굽는다. 껍질이 짙은 적갈색으로 바삭하고 허벅지 가장 두꺼운 곳이 74°C가 되면 멈춘다. 빨리 진해지는 부분만 호일을 느슨하게 덮는다.",
        "ลดเตาอบเหลือ 180°C อบต่อ 65–70 นาทีจนหนังสีน้ำตาลแดงเข้มกรอบและส่วนหนาสุดของสะโพกถึง 74°C ใช้ฟอยล์คลุมหลวมๆ เฉพาะจุดที่เข้มเร็ว"
      )
    },
    {
      title: ml("Rest, carve, and wrap", "靜置切片包餅", "休ませて切り、包む", "쉬고 썰어 싸기", "พัก แล่ และห่อ"),
      body: ml(
        "Rest the duck upright for 15 minutes, then slice skin and meat thinly with a sharp knife. Spread 7.5 g sweet bean sauce on each warm pancake, add duck, one scallion baton, and one cucumber baton, fold, and serve immediately.",
        "鴨子直立靜置 15 分鐘，用利刀將皮與肉切薄片。每張溫薄餅抹 7.5 公克甜麵醬，放鴨片、1 段青蔥與 1 段小黃瓜，折起立即上桌。",
        "鴨を立てたまま15分休ませ、鋭い包丁で皮と肉を薄切りにする。温かいパンケーキ1枚に甜麺醤7.5g、鴨、ねぎ1本、きゅうり1本をのせて包み、すぐ供する。",
        "오리를 세운 채 15분 쉬게 하고 날카로운 칼로 껍질과 살을 얇게 썬다. 따뜻한 전병마다 춘장 7.5g, 오리, 대파 한 조각, 오이 한 조각을 올려 접고 즉시 낸다.",
        "พักเป็ดในท่าตั้ง 15 นาที ใช้มีดคมหั่นหนังและเนื้อบางๆ ทาซอสถั่วหวาน 7.5 กรัมบนแผ่นอุ่นแต่ละแผ่น ใส่เป็ด ต้นหอมหนึ่งแท่ง และแตงกวาหนึ่งแท่ง พับแล้วเสิร์ฟทันที"
      )
    }
  ]
};

export default expandedInstructionsB;
