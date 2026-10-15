// Reimplementation batch 2. Newly authored methods; no unavailable handoff
// patches are being represented as recovered. Source drafts stay unchanged.
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const eggs = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";
const rawFlour = "https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts";
const riceSafety = "https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function addOfficialSource(recipe, label, url) {
  if (!recipe.sources.some((source) => source.url === url)) {
    recipe.sources.push({ title: `Official food-safety guidance — ${label}`, url });
  }
}

function reviseRecipe(recipe, revision) {
  recipe.instructions = recipe.instructions.map((step, index) => ({
    ...step,
    title: revision.titles[index],
    body: revision.bodies[index]
  }));
  recipe.sources = recipe.sources.map((source) => ({ ...source }));
  recipe.tips = revision.tips;
  recipe.commonMistakes = revision.mistakes;
  recipe.storage = revision.storage;
  if (revision.prepMinutes !== undefined) recipe.prepMinutes = revision.prepMinutes;
  if (revision.cookMinutes !== undefined) recipe.cookMinutes = revision.cookMinutes;
  if (revision.prepMinutes !== undefined || revision.cookMinutes !== undefined) {
    recipe.totalMinutes = recipe.prepMinutes + recipe.cookMinutes;
  }
  if (revision.additionalIngredients?.length) {
    recipe.ingredients = recipe.ingredients.map((row) => ({ ...row, item: { ...row.item } }));
    for (const row of revision.additionalIngredients) recipe.ingredients.push(row);
  }
  for (const [label, url] of revision.safetySources) addOfficialSource(recipe, label, url);
}

function reviseCremeBrulee(recipe) {
  reviseRecipe(recipe, {
    prepMinutes: 260,
    cookMinutes: 80,
    titles: [
      ml("Infuse the cream and milk", "加熱浸香奶油與牛奶", "クリームと牛乳にバニラを移す", "크림과 우유에 바닐라 향 내기", "อุ่นครีมและนมให้ซึมกลิ่นวานิลลา"),
      ml("Whisk the yolks with sugar", "拌勻蛋黃與砂糖", "卵黄と砂糖を混ぜる", "노른자와 설탕 섞기", "ตีไข่แดงกับน้ำตาล"),
      ml("Temper and strain the custard", "調溫並過濾蛋奶液", "卵液の温度を合わせて濾す", "커스터드를 템퍼링하고 거르기", "ปรับอุณหภูมิและกรองคัสตาร์ด"),
      ml("Bake gently in a water bath", "隔水溫和烘烤", "湯せんでやさしく焼く", "중탕으로 부드럽게 굽기", "อบอย่างนุ่มนวลในอ่างน้ำ"),
      ml("Cool and chill until cold", "放涼後冷藏至冰涼", "冷ましてから冷蔵する", "식힌 뒤 차갑게 냉장하기", "พักให้เย็นแล้วแช่เย็น"),
      ml("Torch the sugar just before serving", "上桌前炙燒糖殼", "供する直前に砂糖を焦がす", "내기 직전에 설탕 캐러멜화하기", "เผาหน้าน้ำตาลก่อนเสิร์ฟ")
    ],
    bodies: [
      ml(
        "Split the vanilla bean lengthwise and scrape its seeds into a saucepan; add the pod, all 500 ml cream, 100 ml milk, and 1 g salt. Heat over medium-low until steaming, stirring once or twice; do not boil. Remove from the heat and steep for 10 minutes so the vanilla perfumes the dairy.",
        "將香草莢縱向剖開並刮出籽放入鍋中，連同莢殼、全部 500 毫升鮮奶油、100 毫升牛奶與 1 公克鹽一起加入。中小火加熱至冒蒸氣，偶爾攪拌，不要煮滾。離火浸香 10 分鐘。",
        "バニラビーンズを縦に割って種をこそげて鍋に入れ、さや、クリーム500ml、牛乳100ml、塩1gを加えます。中弱火で、ときどき混ぜながら湯気が立つまで温め、沸騰させません。火から外して10分置き、香りを移します。",
        "바닐라빈을 세로로 갈라 씨를 긁어 냄비에 넣고 껍질, 생크림 500ml, 우유 100ml, 소금 1g을 모두 더합니다. 중약불에서 한두 번 저으며 김이 날 때까지만 데우고 끓이지 않습니다. 불에서 내려 10분 우려 향을 냅니다.",
        "ผ่าฝักวานิลลาตามยาว ขูดเมล็ดลงหม้อ ใส่ฝัก ครีม 500 มล. นม 100 มล. และเกลือ 1 กรัม อุ่นไฟกลางอ่อน คนหนึ่งหรือสองครั้งจนมีไอ ห้ามต้มเดือด ยกลงแช่ไว้ 10 นาทีให้วานิลลาหอม"
      ),
      ml(
        "While the dairy steeps, whisk all 5 egg yolks with the 70 g caster sugar just until smooth and slightly lighter; do not whip them foamy. Keep the 30 g demerara or light brown sugar separate for the brûléed tops.",
        "奶液浸香時，將全部 5 顆蛋黃與 70 公克細砂糖攪至滑順、顏色稍淡即可，不要打出大量泡沫。另將 30 公克德梅拉拉糖或淺黑糖留作表面糖殼。",
        "乳液を置いている間に、卵黄5個とグラニュー糖70gをなめらかで少し明るい色になるまで混ぜます。泡立てません。デメララ糖またはライトブラウンシュガー30gは表面用に分けておきます。",
        "유제품을 우려내는 동안 달걀노른자 5개와 고운 설탕 70g을 매끈하고 약간 밝아질 때까지만 섞고 거품을 내지 않습니다. 데메라라 또는 연한 갈색 설탕 30g은 윗면용으로 따로 둡니다.",
        "ระหว่างแช่นมครีม ตีไข่แดงทั้ง 5 ฟองกับน้ำตาลทรายละเอียด 70 กรัมจนเนียนและสีอ่อนลงเล็กน้อย อย่าตีให้ขึ้นฟู แยกน้ำตาลเดเมอราราหรือน้ำตาลทรายแดงอ่อน 30 กรัมไว้ทำหน้า"
      ),
      ml(
        "Remove the vanilla pod. Slowly pour the warm dairy into the yolk mixture in a thin stream while whisking constantly, first adding a few spoonfuls to temper it. Pour through a fine sieve into a jug, then divide evenly among the six ramekins (about 110 ml each). Skim surface bubbles with a spoon.",
        "取出香草莢。持續攪拌蛋黃時，先分幾匙慢慢加入溫奶液調溫，再以細流倒入其餘奶液。過細篩倒入量杯，平均分入 6 個烤盅（每盅約 110 毫升），並用匙撈除表面泡沫。",
        "バニラのさやを取り出します。卵黄を絶えず混ぜながら、温かい乳液を少量ずつ加えて温度を合わせ、その後細く注ぎます。細かいこし器でピッチャーに濾し、6個の器に均等に分けます（各約110ml）。表面の泡はスプーンですくいます。",
        "바닐라빈을 건집니다. 노른자를 계속 저으면서 따뜻한 유제품을 몇 숟가락씩 천천히 넣어 템퍼링한 뒤 나머지를 가늘게 부어 섞습니다. 고운 체로 주전자에 거르고 라메킨 6개에 고르게 나눕니다(각 약 110ml). 표면 거품은 숟가락으로 걷습니다.",
        "ตักฝักวานิลลาออก ค่อย ๆ เทนมครีมอุ่นลงในไข่เป็นสายเล็กพร้อมตีตลอด โดยเริ่มจากสองสามช้อนเพื่อปรับอุณหภูมิ กรองผ่านตะแกรงละเอียดลงเหยือก แล้วแบ่งใส่ถ้วย 6 ใบให้เท่ากัน (ประมาณ 110 มล.ต่อถ้วย) ช้อนฟองด้านบนออก"
      ),
      ml(
        "Heat a conventional oven to 150°C. Set the filled ramekins in a roasting tray and pour hot water into the tray to halfway up their sides. Bake 30–35 minutes, beginning checks at 30 minutes. The edges should be set and the centre just trembling; also probe the centre of each custard with a clean thermometer. Every portion must reach 71°C (160°F) for an egg dish. If any is lower, bake 3–5 minutes more and recheck with a clean probe.",
        "烤箱預熱至 150°C。將裝好蛋奶液的烤盅放入深烤盤，往盤中倒熱水至盅身一半高度。烤 30–35 分鐘，30 分鐘時開始檢查。邊緣應凝固、中心微微顫動；再用乾淨溫度計測每盅中心，含蛋料理須全部達 71°C（160°F）。若有未達者，續烤 3–5 分鐘並用乾淨探針複測。",
        "通常のオーブンを150°Cに予熱します。器を天板に並べ、器の半分の高さまで熱湯を注ぎます。30〜35分焼き、30分から確認します。縁が固まり中心がわずかに揺れる状態が目安です。清潔な温度計で各カスタードの中心も測り、卵料理としてすべて71°C（160°F）に達していることを確認します。低いものは3〜5分追加して清潔なプローブで測り直します。",
        "일반 오븐을 150°C로 예열합니다. 라메킨을 팬에 놓고 그릇 높이 절반까지 뜨거운 물을 붓습니다. 30–35분 굽고 30분부터 확인합니다. 가장자리는 굳고 가운데는 살짝 흔들리는 상태가 좋습니다. 깨끗한 온도계로 각 커스터드 중심도 재어 달걀 요리 기준인 71°C(160°F)에 모두 도달했는지 확인합니다. 낮은 것이 있으면 3–5분 더 굽고 깨끗한 탐침으로 다시 잽니다.",
        "อุ่นเตาอบโหมดปกติที่ 150°C วางถ้วยในถาดอบแล้วเติมน้ำร้อนให้สูงครึ่งด้านข้าง อบ 30–35 นาที เริ่มตรวจที่นาที 30 ขอบควรเซ็ตและกลางสั่นเล็กน้อย จากนั้นใช้เทอร์โมมิเตอร์สะอาดวัดตรงกลางคัสตาร์ดแต่ละถ้วย อาหารไข่ทุกถ้วยต้องถึง 71°C (160°F) หากถ้วยใดต่ำกว่าให้อบเพิ่ม 3–5 นาทีแล้ววัดซ้ำด้วยหัววัดสะอาด"
      ),
      ml(
        "Lift the ramekins out of the water bath and set them on a rack for 30 minutes. Cover and refrigerate within 2 hours of baking at 4°C/40°F or colder for at least 4 hours, until cold throughout. The 4-hour chill is included in the preparation estimate; keep the uncaramelized custards covered until serving.",
        "將烤盅從水浴取出，放網架上冷卻 30 分鐘。烘烤後 2 小時內加蓋冷藏於 4°C／40°F 以下至少 4 小時，直至內外冰涼。時間估算已包含 4 小時冷藏；上桌前都保持未炙糖且加蓋。",
        "器を湯せんから出し、網の上で30分冷まします。焼き上がりから2時間以内に覆って4°C/40°F以下で少なくとも4時間、全体が冷えるまで冷蔵します。準備時間にはこの4時間を含めています。砂糖を焦がす前のカスタードは覆っておきます。",
        "라메킨을 중탕에서 꺼내 망에서 30분 식힙니다. 굽기 시작 후 2시간 안에 덮어 4°C/40°F 이하로 최소 4시간 속까지 차갑게 냉장합니다. 준비 시간에는 이 냉장 4시간이 포함됩니다. 설탕을 캐러멜화하기 전까지 덮어 둡니다.",
        "ยกถ้วยออกจากอ่างน้ำ พักบนตะแกรง 30 นาที ปิดฝาและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมงหลังอบ อย่างน้อย 4 ชั่วโมงจนเย็นทั่ว เวลาเตรียมรวมช่วงแช่เย็น 4 ชั่วโมงนี้ เก็บคัสตาร์ดที่ยังไม่เผาหน้าปิดไว้จนกว่าจะเสิร์ฟ"
      ),
      ml(
        "Just before serving, divide the reserved 30 g brown sugar into six thin, even layers over the cold custards. Torch each until amber and glassy, keeping the flame moving so the custard stays cold. Wait 2 minutes for the shell to harden, then serve; do not caramelize ahead or refrigerate after torching if you want a crisp top.",
        "上桌前才將預留的 30 公克黃糖平均薄撒在 6 份冰涼布蕾上。移動噴槍烘至琥珀色、呈玻璃光澤，避免讓底下布蕾升溫。靜置 2 分鐘使糖殼硬化後上桌；想保持酥脆就不要提早炙糖或炙後冷藏。",
        "供する直前に、取り分けたブラウンシュガー30gを冷たいカスタード6個へ薄く均等に振ります。炎を動かしながら琥珀色でガラス状になるまで焦がし、下のカスタードを温めすぎないようにします。2分置いて固めてから出します。パリッとさせるには先に焦がしたり、焦がした後に冷蔵したりしません。",
        "내기 직전에 남겨 둔 갈색 설탕 30g을 차가운 커스터드 여섯 개에 얇고 고르게 나눠 뿌립니다. 불을 계속 움직여 호박색 유리처럼 캐러멜화하고 아래 커스터드는 차갑게 둡니다. 2분 굳힌 뒤 냅니다. 바삭함을 원하면 미리 캐러멜화하거나 토치 후 냉장하지 않습니다.",
        "ก่อนเสิร์ฟ แบ่งน้ำตาลทรายแดง 30 กรัมที่กันไว้โรยบางและเสมอกันบนคัสตาร์ดเย็นทั้งหก ใช้ไฟเคลื่อนตลอดจนเป็นสีอำพันใส โดยไม่ทำให้คัสตาร์ดด้านล่างร้อน พัก 2 นาทีให้เปลือกแข็งแล้วเสิร์ฟ หากต้องการหน้าให้กรอบ อย่าเผาไว้ก่อนหรือแช่เย็นหลังเผา"
      )
    ],
    tips: [
      ml("Shallow ramekins bake more evenly; use the thermometer endpoint as well as the gentle-set visual cue.", "淺烤盅更容易均勻凝固；視覺判斷外，也要確認溫度端點。", "浅い器は均一に火が入りやすく、揺れ具合に加えて温度も確認します。", "얕은 라메킨은 고르게 익습니다. 흔들림뿐 아니라 온도도 확인하세요.", "ถ้วยตื้นช่วยให้สุกสม่ำเสมอ ให้ดูทั้งการเซ็ตและอุณหภูมิ"),
      ml("Torch the sugar only when the custards are cold and ready to go to the table.", "布蕾冰涼且準備上桌時才炙糖。", "カスタードが冷え、出す直前に砂糖を焦がします。", "커스터드가 차갑고 내기 직전에만 설탕을 토치하세요.", "เผาน้ำตาลเมื่อคัสตาร์ดเย็นและพร้อมเสิร์ฟเท่านั้น")
    ],
    mistakes: [
      ml("Boiling the dairy or whipping lots of air into the yolks makes bubbles and a coarse custard; heat gently and whisk only until combined.", "奶液煮滾或蛋黃打入太多空氣會產生氣孔、口感粗糙；溫和加熱並攪至混合即可。", "乳液を沸騰させたり卵黄を泡立てすぎたりすると気泡や粗さが出ます。穏やかに温め、混ざるまで混ぜます。", "유제품을 끓이거나 노른자를 많이 거품 내면 기포와 거친 식감이 생깁니다. 부드럽게 데우고 섞일 때까지만 저으세요.", "ต้มนมครีมหรือตีไข่ให้ขึ้นฟูมากทำให้เกิดฟองและเนื้อหยาบ อุ่นเบา ๆ และคนเพียงให้เข้ากัน"),
      ml("A thick or uneven sugar layer burns in spots and stays chewy elsewhere; divide the measured sugar thinly across all six tops.", "糖層太厚或不均會局部焦黑、其他地方仍黏韌；將量好的糖薄薄分到六份。", "砂糖が厚かったりむらがあったりすると部分的に焦げ、別の部分はべたつきます。6個に薄く均等に分けます。", "설탕층이 두껍거나 고르지 않으면 일부는 타고 일부는 끈적입니다. 계량한 설탕을 여섯 개에 얇게 나누세요.", "น้ำตาลหนาหรือไม่เสมอทำให้บางจุดไหม้และบางจุดเหนียว แบ่งน้ำตาลที่ตวงไว้ให้บางเท่ากันทั้งหกถ้วย")
    ],
    storage: ml(
      "Cover and refrigerate uncaramelized custards within 2 hours at 4°C/40°F or colder; use within 3 days. Keep the sugar crust separate until serving. This egg custard is served cold and does not need reheating; discard portions left unrefrigerated over 2 hours (over 1 hour above 32°C/90°F).",
      "未炙糖的蛋奶布蕾須在 2 小時內加蓋冷藏於 4°C／40°F 以下，3 天內食用。上桌前才做糖殼。此蛋奶甜點冷食，不需復熱；室溫超過 2 小時（高於 32°C／90°F 時超過 1 小時）的份量應丟棄。",
      "砂糖を焦がす前のカスタードは覆い、2時間以内に4°C/40°F以下で冷蔵し、3日以内に食べます。砂糖の殻は供する直前に作ります。冷たいデザートなので再加熱は不要です。室温に2時間超（32°C/90°Fを超える場合は1時間超）置いたものは捨てます。",
      "설탕을 캐러멜화하지 않은 커스터드는 덮어 2시간 안에 4°C/40°F 이하로 냉장하고 3일 안에 먹습니다. 설탕 껍질은 내기 직전에 만듭니다. 차갑게 먹으므로 재가열하지 않습니다. 실온에 2시간 초과(32°C/90°F 초과 시 1시간 초과) 둔 것은 버립니다.",
      "ปิดฝาคัสตาร์ดที่ยังไม่เผาหน้าและแช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วัน ทำเปลือกน้ำตาลก่อนเสิร์ฟ ขนมนี้กินเย็นจึงไม่ต้องอุ่น ทิ้งส่วนที่วางนอกตู้เย็นเกิน 2 ชั่วโมง (เกิน 1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F)"
    ),
    safetySources: [["egg handling and egg-dish cooking", eggs], ["safe minimum internal temperatures", temperatures], ["refrigeration and handling", handling]]
  });
}

function reviseGulabJamun(recipe) {
  reviseRecipe(recipe, {
    prepMinutes: 155,
    cookMinutes: 35,
    titles: [
      ml("Cook and cool the cardamom syrup", "煮豆蔻糖漿並調整溫度", "カルダモンシロップを作る", "카다멈 시럽 끓이고 식히기", "ทำน้ำเชื่อมกระวานและปรับอุณหภูมิ"),
      ml("Combine the dry dough and ghee", "混合乾粉與酥油", "粉類とギーを合わせる", "마른 재료와 기 섞기", "ผสมของแห้งกับกี"),
      ml("Make a soft milk dough", "拌成柔軟奶粉麵糰", "柔らかなミルク生地にする", "부드러운 분유 반죽 만들기", "ทำแป้งนมให้นุ่ม"),
      ml("Shape sixteen smooth balls", "搓成十六顆光滑小球", "なめらかな団子を16個作る", "매끈한 볼 16개 빚기", "ปั้นลูกกลมเนียน 16 ลูก"),
      ml("Fry slowly and check the centre", "低溫慢炸並檢查中心", "ゆっくり揚げて中心を確認する", "천천히 튀기고 속을 확인하기", "ทอดช้า ๆ และตรวจตรงกลาง"),
      ml("Soak in hot syrup", "浸入熱糖漿吸收", "熱いシロップに浸す", "뜨거운 시럽에 담그기", "แช่ในน้ำเชื่อมร้อน"),
      ml("Check absorption and serve", "確認吸糖後上桌", "吸収を確認して供する", "시럽 흡수를 확인해 내기", "ตรวจการดูดซึมและเสิร์ฟ")
    ],
    bodies: [
      ml(
        "Combine all 450 g sugar, 500 ml water, and the 5 crushed cardamom pods in a saucepan. Bring to a full boil, then simmer 6–7 minutes, stirring until clear and lightly tacky but not at a thread stage. Remove the pods. Cool the syrup to 60–62°C; keep it covered and rewarm gently to that range before soaking if it cools while you fry.",
        "鍋中加入全部 450 公克糖、500 毫升水與壓裂的 5 顆豆蔻，煮至沸騰後小滾 6–7 分鐘，攪至清澈微黏但還不到拉絲狀。取出豆蔻莢。糖漿降至 60–62°C 並加蓋；若炸球時變涼，浸泡前溫和加熱回此範圍。",
        "砂糖450g、水500ml、潰したカルダモン5個を鍋に入れ、沸騰させてから6〜7分、透明で少し粘るが糸を引かない濃さまで煮ます。カルダモンを取り出し、シロップを60〜62°Cまで冷まします。ふたをし、揚げている間に冷めたら浸す前にやさしく温め直します。",
        "설탕 450g, 물 500ml, 으깬 카다멈 5개를 냄비에 넣습니다. 완전히 끓인 뒤 6–7분 맑고 약간 끈적하되 실처럼 늘어나기 전까지 끓입니다. 카다멈을 건지고 시럽을 60–62°C까지 식힙니다. 덮어 두고 튀기는 동안 식으면 담그기 전에 부드럽게 다시 데웁니다.",
        "ใส่น้ำตาล 450 กรัม น้ำ 500 มล. และกระวานบุบ 5 เม็ดลงหม้อ ต้มเดือดแล้วเคี่ยว 6–7 นาที คนจนใสและเหนียวเล็กน้อยแต่ยังไม่เป็นเส้น ตักกระวานออก พักน้ำเชื่อมให้ถึง 60–62°C ปิดฝาไว้ หากเย็นระหว่างทอดให้อุ่นกลับเบา ๆ ก่อนแช่"
      ),
      ml(
        "Sift all 160 g milk powder, 45 g flour, and 1 g baking soda twice into a bowl. Rub in the 20 g ghee for 2 minutes until the mixture looks like even fine crumbs with no visible lumps. Keep the milk powder and flour away from ready-to-eat food; the dry mix is not ready to eat.",
        "將全部 160 公克奶粉、45 公克麵粉與 1 公克小蘇打過篩兩次。搓入 20 公克酥油 2 分鐘，直到成為均勻細屑且無可見結塊。奶粉與麵粉須遠離即食食物；乾粉不可直接食用。",
        "粉乳160g、小麦粉45g、重曹1gを2回ふるいます。ギー20gを2分すり込み、目立つ塊のない均一な細かいそぼろ状にします。粉乳と小麦粉をそのまま食べられる食品から離し、乾いた生地を味見しません。",
        "분유 160g, 밀가루 45g, 베이킹소다 1g을 두 번 체칩니다. 기 20g을 2분 비벼 눈에 띄는 덩어리 없이 고운 부스러기처럼 고르게 만듭니다. 분유와 밀가루는 바로 먹는 음식과 분리하고 마른 반죽을 맛보지 않습니다.",
        "ร่อนนมผง 160 กรัม แป้ง 45 กรัม และเบกกิ้งโซดา 1 กรัมสองครั้ง ถูเนยกี 20 กรัมลงไป 2 นาทีจนเป็นเม็ดละเอียดสม่ำเสมอไม่มีก้อน แยกนมผงและแป้งจากอาหารพร้อมกิน และอย่าชิมส่วนผสมแห้ง"
      ),
      ml(
        "Start with 70 ml of the listed milk. Add it 15 ml at a time, folding gently rather than kneading, until the dough just holds together; use up to 95 ml only if dry cracks remain. Cover and rest 10 minutes. It should feel soft and pliable, not wet or sticky.",
        "先用材料表所列牛奶中的 70 毫升，每次加入 15 毫升，輕輕翻拌而非揉捏，直到麵糰剛能成團；若仍乾裂，再逐步加到最多 95 毫升。加蓋靜置 10 分鐘，麵糰應柔軟可塑、不濕黏。",
        "牛乳70mlから始め、15mlずつ加え、こねずにやさしく折り混ぜ、生地がまとまるところで止めます。乾いたひびが残る場合だけ最大95mlまで加えます。覆って10分休ませ、柔らかく成形できるが、濡れてべたつかない状態にします。",
        "우유 70ml부터 시작해 15ml씩 넣고 치대지 말고 부드럽게 접어 반죽이 겨우 뭉칠 때 멈춥니다. 마른 갈라짐이 남을 때만 최대 95ml까지 더합니다. 덮어 10분 쉬게 합니다. 반죽은 부드럽고 잘 빚어지되 젖거나 끈적이지 않아야 합니다.",
        "เริ่มด้วยนม 70 มล.จากที่เตรียมไว้ เติมครั้งละ 15 มล. พับเบา ๆ ไม่ได้นวดจนแป้งพอรวมตัว หากยังแห้งแตกจึงเพิ่มได้ถึง 95 มล. ปิดพัก 10 นาที แป้งควรนุ่มปั้นได้ ไม่เปียกหรือเหนียวติดมือ"
      ),
      ml(
        "Divide the dough into 16 equal pieces of about 18–20 g. Roll each between lightly greased palms into a perfectly smooth ball; close every crack and cover the shaped balls with a clean towel. Wash hands and the work surface after handling the uncooked flour mixture.",
        "將麵糰分成 16 等份，每份約 18–20 公克。手掌薄抹油，將每份搓成完全光滑的小球並捏合所有裂縫；搓好的球以乾淨布覆蓋。接觸含生麵粉麵糰後清洗雙手與檯面。",
        "生地を約18〜20gずつ16個に分けます。手に油を薄く塗って割れのない滑らかな球に丸め、できた団子は清潔な布で覆います。生の小麦粉を扱った後は手と作業台を洗います。",
        "반죽을 약 18–20g씩 16개로 나눕니다. 손바닥에 기름을 얇게 바르고 균열 없이 매끈한 공 모양으로 빚어 깨끗한 천으로 덮습니다. 익히지 않은 밀가루 반죽을 만진 뒤 손과 작업대를 씻습니다.",
        "แบ่งแป้งเป็น 16 ส่วนเท่า ๆ กัน ส่วนละประมาณ 18–20 กรัม ทาน้ำมันบางที่ฝ่ามือแล้วกลิ้งเป็นลูกกลมเรียบสนิท ปิดรอยแตกทุกจุดและคลุมลูกที่ปั้นแล้วด้วยผ้าสะอาด ล้างมือและพื้นผิวหลังจับแป้งดิบ"
      ),
      ml(
        "Heat the 1 L frying oil or ghee to 140–145°C in a deep pan. Fry 6–8 balls per batch for 7–10 minutes, gently moving them so they rotate and brown evenly; keep the oil in range and below 155°C. Cut one ball from each batch with a clean knife: its centre must be fully cooked, soft, and free of sticky raw dough. If a centre is still doughy while the outside is brown, lower the oil slightly and continue in 2-minute increments. Oil temperature controls frying, not the centre’s doneness.",
        "深鍋中將 1 公升炸油或酥油加熱至 140–145°C。每批炸 6–8 顆、每批 7–10 分鐘，輕推讓球轉動並均勻上色；油溫保持在此範圍且低於 155°C。每批用乾淨刀切開一顆檢查：中心須熟透、柔軟且沒有黏糊生麵糰。若外面已褐而中心仍生，稍微降低油溫，每次續炸 2 分鐘。油溫是炸製設定，不代表中心熟度。",
        "深鍋で揚げ油またはギー1Lを140〜145°Cに熱します。6〜8個ずつ7〜10分、やさしく動かして団子を回転させ、均一に色づけます。油温を範囲内かつ155°C未満に保ちます。各回から1個を清潔なナイフで切り、中心が完全に火が通り、柔らかく、粘った生地でないことを確認します。外側が茶色でも中心が生なら油温を少し下げ、2分ずつ追加します。油温は揚げ方の設定で、中心の火通りを示すものではありません。",
        "깊은 팬에서 튀김유 또는 기 1L를 140–145°C로 데웁니다. 한 번에 6–8개씩 7–10분 튀기며 부드럽게 움직여 골고루 회전·갈변시킵니다. 기름은 범위 안이면서 155°C 미만으로 유지합니다. 각 배치에서 하나를 깨끗한 칼로 잘라 속이 완전히 익고 부드러우며 끈적한 생반죽이 없는지 확인합니다. 겉은 갈색인데 속이 덜 익었다면 기름 온도를 조금 낮추고 2분씩 더 튀깁니다. 기름 온도는 튀김 설정이지 중심 익힘을 나타내지 않습니다.",
        "ตั้งน้ำมันหรือกี 1 ลิตรในหม้อลึกที่ 140–145°C ทอดครั้งละ 6–8 ลูก นาน 7–10 นาที ขยับเบา ๆ ให้ลูกหมุนและเป็นสีน้ำตาลทั่ว รักษาน้ำมันในช่วงนี้และต่ำกว่า 155°C ใช้มีดสะอาดผ่าหนึ่งลูกจากแต่ละชุด ตรงกลางต้องสุกนุ่ม ไม่มีแป้งดิบเหนียว หากด้านนอกน้ำตาลแต่กลางยังเป็นแป้ง ให้ลดไฟเล็กน้อยและทอดเพิ่มครั้งละ 2 นาที อุณหภูมิน้ำมันเป็นค่าการทอด ไม่ใช่ตัวบอกความสุกตรงกลาง"
      ),
      ml(
        "After each batch drains on a rack for 2 minutes, lower it carefully into the syrup at 60–62°C. Add all 10 ml rose water and cover. Soak for 2 hours; keep the covered syrup and balls at or above 60°C in a warm-water bath or over very low heat, checking the syrup temperature so it stays hot-held rather than sitting in the danger zone.",
        "每批炸球上網架瀝油 2 分鐘後，小心放入 60–62°C 糖漿。加入全部 10 毫升玫瑰水並加蓋浸泡 2 小時；以溫水浴或極小火讓加蓋的糖漿與奶球維持至少 60°C，並檢查糖漿溫度，避免停留在危險溫度帶。",
        "揚げた団子を網で2分油切りしてから、60〜62°Cのシロップに静かに入れます。ローズウォーター10mlすべてを加えて覆います。2時間浸し、ふたをしたシロップと団子を湯せんまたはごく弱火で60°C以上に保ちます。温度を確認し、危険温度帯に置かないようにします。",
        "튀긴 볼을 망에서 2분 기름 뺀 뒤 60–62°C 시럽에 조심히 넣습니다. 장미수 10ml 전량을 넣고 덮습니다. 2시간 담그되 덮은 시럽과 볼을 따뜻한 물중탕이나 아주 약한 불에서 60°C 이상으로 유지하고 시럽 온도를 확인해 위험 온도대에 두지 않습니다.",
        "พักลูกทอดบนตะแกรง 2 นาทีแล้วค่อย ๆ ใส่ลงในน้ำเชื่อม 60–62°C เติมน้ำกุหลาบทั้งหมด 10 มล.และปิดฝา แช่ 2 ชั่วโมง โดยคงน้ำเชื่อมและลูกไว้ที่ 60°C ขึ้นไปด้วยอ่างน้ำอุ่นหรือไฟอ่อนมาก ตรวจอุณหภูมิน้ำเชื่อมไม่ให้แช่อยู่ในช่วงอุณหภูมิอันตราย"
      ),
      ml(
        "Cut one soaked ball to confirm the syrup has reached its centre and the crumb is soft with no dry, floury core. Divide all 15 g sliced pistachios across the 16 portions and serve directly from the hot syrup, or chill the dessert promptly for cold service. The two-hour syrup soak is included in the preparation estimate.",
        "切開一顆浸好的奶球，確認糖漿已到中心，內裡柔軟且沒有乾粉芯。將全部 15 公克開心果片分配到 16 份，趁糖漿熱時盛出；若要冷食，請立即冷卻並冷藏。兩小時浸糖時間已計入準備時間。",
        "浸した団子を一つ切り、シロップが中心まで入り、乾いた粉っぽい芯がなく柔らかいことを確認します。ピスタチオ15gを16個に分け、熱いシロップからすくって供するか、冷やして食べる場合は速やかに冷蔵します。シロップに浸す2時間は準備時間に含みます。",
        "담근 볼 하나를 잘라 시럽이 중심까지 배고 속이 부드러우며 마른 가루 심이 없는지 확인합니다. 피스타치오 15g 전량을 16개에 나누어 뜨거운 시럽에서 바로 내거나 차게 먹으려면 신속히 식혀 냉장합니다. 시럽에 담그는 2시간은 준비 시간에 포함됩니다.",
        "ผ่าลูกที่แช่หนึ่งลูกเพื่อดูว่าน้ำเชื่อมถึงกลางและเนื้อนุ่ม ไม่มีแกนแห้งเป็นผง แบ่งพิสตาชิโอซอย 15 กรัมทั้งหมดบน 16 ลูก ตักเสิร์ฟจากน้ำเชื่อมร้อน หรือทำให้เย็นและแช่เย็นทันทีหากจะเสิร์ฟเย็น เวลาแช่น้ำเชื่อม 2 ชั่วโมงรวมอยู่ในเวลาเตรียมแล้ว"
      )
    ],
    tips: [
      ml("A smooth, crack-free ball expands and absorbs syrup evenly; roll gently and do not knead the dough.", "表面光滑無裂縫的球才能均勻膨脹吸糖；輕柔搓圓，不要揉麵糰。", "割れのない滑らかな団子は均一に膨らんでシロップを吸います。こねずにやさしく丸めます。", "갈라짐 없는 매끈한 볼이 고르게 부풀고 시럽을 흡수합니다. 반죽은 치대지 말고 부드럽게 빚으세요.", "ลูกที่เรียบไม่มีรอยแตกจะพองและดูดน้ำเชื่อมทั่วถึง ปั้นเบา ๆ อย่านวดแป้ง"),
      ml("The 140–145°C oil setting browns the outside slowly; check a cut sample from every batch for cooked dough inside.", "140–145°C 油溫讓外層慢慢上色；每批都切一顆確認內部熟透。", "油温140〜145°Cでゆっくり色づけ、各回の切り口で中心の火通りを確認します。", "140–145°C 기름에서 천천히 색을 내고 모든 배치에서 하나를 잘라 속 익힘을 확인합니다.", "ทอดช้าในน้ำมัน 140–145°C และผ่าตรวจความสุกด้านในทุกชุด")
    ],
    mistakes: [
      ml("If the oil is too hot, the outside darkens before the centre cooks; lower the heat and give that batch more time.", "油溫太高會外黑內生；降低火力並讓該批多炸一會。", "油温が高すぎると外側が先に色づき中心が生です。火を弱め時間を延ばします。", "기름이 너무 뜨거우면 겉이 속보다 먼저 짙어집니다. 불을 낮추고 더 익히세요.", "น้ำมันร้อนเกินทำให้ผิวนอกเข้มก่อนกลางสุก ลดไฟและทอดชุดนั้นนานขึ้น"),
      ml("Letting dairy sweets soak below 60°C for hours is unsafe; maintain hot holding during the soak or cool and refrigerate promptly.", "奶製甜點長時間在低於 60°C 的糖漿浸泡並不安全；浸泡期間維持熱藏，或迅速冷卻冷藏。", "乳製品入りの菓子を60°C未満で何時間も浸すのは安全ではありません。浸す間は保温するか、速やかに冷まして冷蔵します。", "유제품 과자를 60°C 미만 시럽에 몇 시간 담가 두는 것은 안전하지 않습니다. 담그는 동안 뜨겁게 유지하거나 빨리 식혀 냉장하세요.", "การแช่ขนมที่มีนมในน้ำเชื่อมต่ำกว่า 60°C นานหลายชั่วโมงไม่ปลอดภัย ให้คงความร้อนหรือรีบทำให้เย็นและแช่เย็น")
    ],
    storage: ml(
      "Cool leftovers quickly in shallow covered containers and refrigerate within 2 hours (within 1 hour above 32°C/90°F) at 4°C/40°F or colder; use within 3 days. Serve cold or reheat only the portion needed to 74°C/165°F throughout. Do not leave milk-based sweets at room temperature for over 2 hours.",
      "剩餘奶球以淺而有蓋容器快速冷卻，2 小時內（高於 32°C／90°F 時 1 小時內）冷藏於 4°C／40°F 以下，3 天內食用。可冷食；若復熱，只取需要份量加熱至各處 74°C／165°F。奶製甜點室溫不可放超過 2 小時。",
      "残りは浅いふた付き容器で速やかに冷まし、2時間以内（32°C/90°Fを超える場合は1時間以内）に4°C/40°F以下で冷蔵し、3日以内に食べます。冷たいまま、または食べる分だけ全体を74°C/165°Fまで再加熱します。乳製品菓子を室温に2時間超置きません。",
      "남은 것은 얕고 뚜껑 있는 용기에 담아 빠르게 식히고 2시간 이내(32°C/90°F 초과 시 1시간 이내) 4°C/40°F 이하로 냉장해 3일 안에 먹습니다. 차게 먹거나 필요한 양만 전체가 74°C/165°F가 되게 데웁니다. 유제품 과자를 실온에 2시간 넘게 두지 않습니다.",
      "ทำขนมที่เหลือให้เย็นเร็วในภาชนะตื้นมีฝาปิดและแช่เย็นภายใน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F) ที่ 4°C/40°F หรือต่ำกว่า กินภายใน 3 วัน เสิร์ฟเย็นหรืออุ่นเฉพาะส่วนที่จะกินให้ทั่วถึง 74°C/165°F อย่าวางขนมนมที่อุณหภูมิห้องเกิน 2 ชั่วโมง"
    ),
    safetySources: [["raw flour handling", rawFlour], ["safe minimum internal temperatures", temperatures], ["refrigeration and handling", handling]]
  });
}

function reviseKoshari(recipe) {
  reviseRecipe(recipe, {
    prepMinutes: 30,
    cookMinutes: 65,
    titles: [
      ml("Fry the onion topping", "炸洋蔥酥", "玉ねぎをカリッと揚げる", "양파 튀김 만들기", "ทอดหอมกรอบ"),
      ml("Cook the tomato sauce", "煮番茄醬", "トマトソースを作る", "토마토 소스 끓이기", "ทำซอสมะเขือเทศ"),
      ml("Make the garlic-vinegar sauce", "調製大蒜醋汁", "にんにく酢を作る", "마늘 식초 소스 만들기", "ทำน้ำส้มสายชูกระเทียม"),
      ml("Par-cook the lentils", "先將扁豆煮至半熟", "レンズ豆に下ゆでをする", "렌틸 반쯤 익히기", "ต้มเลนทิลพอสุกบางส่วน"),
      ml("Steam the rice with lentils", "米飯與扁豆同煮", "米とレンズ豆を一緒に炊く", "쌀과 렌틸 함께 익히기", "หุงข้าวกับเลนทิล"),
      ml("Cook the pasta separately", "另煮義大利麵", "パスタを別ゆでする", "파스타 따로 삶기", "ต้มพาสต้าแยก"),
      ml("Warm the chickpeas", "加熱鷹嘴豆", "ひよこ豆を温める", "병아리콩 데우기", "อุ่นถั่วลูกไก่"),
      ml("Layer the koshari", "分層組合 koshari", "コシャリを重ねる", "코샤리 층층이 담기", "จัดชั้นโคชารี")
    ],
    bodies: [
      ml(
        "Heat the 120 ml neutral oil in a heavy pan to about 165°C. Fry the 2 thinly sliced onions in two batches for 8–10 minutes each, stirring often, until deep golden and crisp. Lift onto a rack or paper towel with a slotted spoon and let excess oil drain; reserve for the topping. Keep children away from the hot oil.",
        "厚鍋中將 120 毫升中性油加熱至約 165°C。兩顆薄切洋蔥分兩批炸，每批 8–10 分鐘並經常翻動，直到深金黃酥脆。用漏勺撈到網架或廚房紙巾上瀝油，留作配料。熱油旁請讓兒童遠離。",
        "厚手の鍋で中立油120mlを約165°Cに熱します。薄切り玉ねぎ2個を2回に分け、各8〜10分、ときどき混ぜながら濃いきつね色でカリッとするまで揚げます。穴あきお玉で網またはペーパータオルに取り、油を切ってトッピング用に取っておきます。熱い油に子どもを近づけません。",
        "두꺼운 팬에서 중성유 120ml를 약 165°C로 가열합니다. 얇게 썬 양파 2개를 두 번에 나눠 매번 8–10분 자주 저어 진한 황금색으로 바삭해질 때까지 튀깁니다. 건져 망이나 키친타월에 올려 기름을 빼고 토핑용으로 둡니다. 뜨거운 기름 가까이에 어린이가 오지 않게 하세요.",
        "ตั้งน้ำมันรสกลาง 120 มล. ในหม้อหนาจนประมาณ 165°C แบ่งหอมที่หั่นบาง 2 หัวทอดสองชุด ชุดละ 8–10 นาที คนบ่อย ๆ จนเหลืองเข้มและกรอบ ตักด้วยกระชอนขึ้นพักบนตะแกรงหรือกระดาษซับน้ำมัน แล้วเก็บไว้โรยหน้า กันเด็กให้ห่างจากน้ำมันร้อน"
      ),
      ml(
        "Use about 2 tablespoons of the measured frying oil in a saucepan. Add 2 minced garlic cloves and cook 30 seconds without browning. Stir in all 400 g crushed tomatoes, 5 g ground coriander and cumin, 3 g salt, and chili flakes to taste. Simmer uncovered for 15–20 minutes, stirring now and then, until thick enough to coat a spoon; stir in 30 ml vinegar at the end.",
        "從量好的炸油取約 2 湯匙放入小鍋。加入切末的 2 瓣蒜炒 30 秒，不要炒焦。拌入全部 400 公克碎番茄、全部 5 公克芫荽籽粉與孜然粉、3 公克鹽及適量辣椒碎。打開鍋蓋小火煮 15–20 分鐘，偶爾攪拌至可附著匙面；最後拌入 30 毫升白醋。",
        "計量した揚げ油から約大さじ2を鍋に取ります。みじん切りにしたにんにく2片を加え、色づけずに30秒炒めます。カットトマト400g、コリアンダーとクミンパウダー全量5g、塩3g、好みの量の唐辛子を加えます。ふたをせず15〜20分、ときどき混ぜながらスプーンに付く濃さまで煮て、最後に酢30mlを混ぜます。",
        "계량한 튀김기름에서 약 2큰술을 냄비에 덜어냅니다. 다진 마늘 2쪽을 넣고 갈색이 나지 않게 30초 볶습니다. 으깬 토마토 400g 전량, 간 고수씨와 커민 5g 전량, 소금 3g, 고춧가루를 기호에 맞게 넣습니다. 뚜껑 없이 15–20분 가끔 저어 숟가락에 묻을 정도로 졸인 뒤 마지막에 식초 30ml를 섞습니다.",
        "ตักน้ำมันทอดที่ตวงไว้ประมาณ 2 ช้อนโต๊ะใส่หม้อ เติมกระเทียมสับ 2 กลีบ ผัด 30 วินาทีโดยไม่ให้เป็นสีน้ำตาล ใส่มะเขือเทศบด 400 กรัมทั้งหมด ผักชีป่นกับยี่หร่าป่น 5 กรัมทั้งหมด เกลือ 3 กรัม และพริกป่นตามชอบ เคี่ยวเปิดฝา 15–20 นาที คนเป็นครั้งคราวจนข้นเคลือบช้อน แล้วคนในน้ำส้มสายชู 30 มล. ตอนท้าย"
      ),
      ml(
        "Mix the remaining 3 minced garlic cloves with the remaining 30 ml vinegar and 3 g salt in a small bowl. Cover and rest for 20 minutes while the grains cook so the raw garlic mellows. Keep separate from the tomato sauce and add a little at a time at the table.",
        "將剩下的 3 瓣蒜末與剩下的 30 毫升白醋、3 公克鹽放入小碗拌勻。加蓋靜置 20 分鐘，趁米豆烹煮時讓生蒜味稍微柔和。大蒜醋汁與番茄醬分開，上桌時少量添加。",
        "残りのにんにく3片のみじん切り、残りの酢30ml、塩3gを小鉢で混ぜます。ふたをして20分置き、米を炊く間に生にんにくの刺激を和らげます。トマトソースとは分け、食卓で少しずつ加えます。",
        "남은 다진 마늘 3쪽과 남은 식초 30ml, 소금 3g을 작은 그릇에 섞습니다. 덮어 20분 두어 곡물을 익히는 동안 생마늘의 자극을 누그러뜨립니다. 토마토소스와 따로 두고 식탁에서 조금씩 더합니다.",
        "ผสมกระเทียมสับที่เหลือ 3 กลีบกับน้ำส้มสายชูที่เหลือ 30 มล. และเกลือ 3 กรัมในชามเล็ก ปิดฝาพัก 20 นาทีระหว่างหุงเมล็ดข้าวเพื่อให้กลิ่นกระเทียมดิบอ่อนลง แยกจากซอสมะเขือเทศและค่อยเติมทีละน้อยที่โต๊ะ"
      ),
      ml(
        "Put the rinsed 250 g brown lentils in a saucepan with 1.2 litres water. Bring to a boil, then simmer uncovered for 10–12 minutes until the edges start to soften but the centres remain firm. Drain thoroughly; the lentils finish cooking with the rice. Use a separate clean spoon for tasting; do not return a tasted spoon to the pot.",
        "將洗淨的 250 公克棕扁豆與 1.2 公升水放入鍋中。煮滾後不加蓋轉小火 10–12 分鐘，直到邊緣稍軟但中心仍硬。徹底瀝乾；扁豆會與米飯一起完成烹煮。試味請用乾淨的另一支匙，勿將試過的匙放回鍋內。",
        "すすいだ茶レンズ豆250gを鍋に入れ、水1.2Lを加えます。沸騰したらふたをせず弱火で10〜12分、端が少し柔らかくなり中心はまだ硬い状態まで煮ます。しっかり水を切ります。豆は米と一緒に炊き上げます。味見には清潔な別のスプーンを使い、口をつけたスプーンを鍋に戻しません。",
        "헹군 갈색 렌틸 250g을 냄비에 넣고 물 1.2L를 붓습니다. 끓으면 뚜껑 없이 약불로 10–12분, 가장자리는 조금 부드러워지지만 가운데는 아직 단단할 때까지 익힙니다. 물을 완전히 뺍니다. 렌틸은 쌀과 함께 익혀 마무리합니다. 맛은 깨끗한 별도 숟가락으로 보고 입에 댄 숟가락을 냄비에 다시 넣지 않습니다.",
        "ใส่เลนทิลสีน้ำตาล 250 กรัมที่ล้างแล้วลงหม้อกับน้ำ 1.2 ลิตร ต้มจนเดือดแล้วลดเป็นไฟอ่อนโดยไม่ปิดฝา 10–12 นาทีจนขอบเริ่มนิ่มแต่กลางยังแข็ง สะเด็ดน้ำให้หมด เลนทิลจะสุกต่อพร้อมข้าว ใช้ช้อนสะอาดอีกคันชิมและอย่านำช้อนที่ชิมแล้วกลับลงหม้อ"
      ),
      ml(
        "Put the drained lentils and rinsed, drained 250 g rice in a lidded saucepan. Stir in all 30 ml olive oil and 4 g salt, then add 400 ml boiling water. Bring back to a gentle boil, cover tightly, and cook on the lowest heat for 16–18 minutes without lifting the lid. Turn off the heat and rest covered 5 minutes, then fluff gently. If the rice is still firm, add up to 30 ml more boiling water and cook covered 3 minutes more. The listed 400 ml plus optional 30 ml is the measured rice-cooking water.",
        "將瀝乾的扁豆與洗淨瀝乾的 250 公克米放入有蓋鍋中。拌入全部 30 毫升橄欖油與 4 公克鹽，再加入 400 毫升滾水。重新微滾後緊蓋，以最小火煮 16–18 分鐘，不要掀蓋。關火加蓋靜置 5 分鐘，再輕輕撥鬆。若米仍偏硬，可再加最多 30 毫升滾水，加蓋續煮 3 分鐘。材料表所列 400 毫升與選用的 30 毫升都是煮米用水。",
        "水を切ったレンズ豆と、すすいで水を切った米250gをふた付き鍋に入れます。オリーブ油30ml全量と塩4gを混ぜ、沸騰した湯400mlを加えます。再び軽く沸いたらふたをし、最弱火で16〜18分、開けずに炊きます。火を止めて5分蒸らし、やさしくほぐします。まだ硬ければ熱湯を最大30ml加え、ふたをして3分追加します。材料表の400mlと任意の30mlは米を炊く水です。",
        "물 뺀 렌틸과 씻어 물기를 뺀 쌀 250g을 뚜껑 있는 냄비에 담습니다. 올리브오일 30ml 전량과 소금 4g을 섞고 끓는 물 400ml를 붓습니다. 다시 약하게 끓으면 뚜껑을 덮고 가장 약한 불에서 16–18분 열지 않고 익힙니다. 불을 끄고 덮은 채 5분 뜸 들인 뒤 살살 풉니다. 쌀이 단단하면 끓는 물을 최대 30ml 더 넣고 덮어 3분 익힙니다. 재료표의 400ml와 선택 가능한 30ml는 쌀을 짓는 물입니다.",
        "ใส่เลนทิลที่สะเด็ดน้ำและข้าว 250 กรัมที่ล้างสะเด็ดน้ำแล้วลงหม้อมีฝา คนในน้ำมันมะกอก 30 มล.ทั้งหมดและเกลือ 4 กรัม เติมน้ำเดือด 400 มล. พอเดือดเบาอีกครั้งให้ปิดฝาและหุงไฟอ่อนที่สุด 16–18 นาทีโดยไม่เปิดฝา ปิดไฟพักปิดฝา 5 นาทีแล้วค่อย ๆ ซุย หากข้าวยังแข็งให้เติมน้ำเดือดอีกได้ถึง 30 มล. ปิดฝาหุงเพิ่ม 3 นาที น้ำ 400 มล.และ 30 มล.ที่เลือกเติมคือปริมาณน้ำหุงข้าวที่ระบุไว้"
      ),
      ml(
        "Boil the 200 g elbow pasta or ditalini in a separate pot of water according to its packet time, usually 7–9 minutes, until just al dente. Drain well and do not rinse. Keep covered and hot for serving, or cool promptly if assembling later.",
        "另用一鍋滾水依包裝時間煮 200 公克彎管麵或 ditalini，通常 7–9 分鐘，至剛好有嚼勁。充分瀝乾，不要沖洗。立即上桌就加蓋保溫；稍後組合則迅速冷卻。",
        "別鍋に湯を沸かし、エルボパスタまたはディタリーニ200gを袋の表示時間（通常7〜9分）ゆで、アルデンテにします。よく水を切り、すすぎません。すぐ盛るならふたをして保温し、後で組み立てるなら速やかに冷まします。",
        "별도 냄비의 끓는 물에 엘보 파스타 또는 디탈리니 200g을 포장지 시간(보통 7–9분)대로 삶아 알덴테로 익힙니다. 잘 빼고 헹구지 않습니다. 바로 낼 때는 덮어 따뜻하게 두고 나중에 조립한다면 신속히 식힙니다.",
        "ต้มพาสต้าเอลโบว์หรือดิตาลินี 200 กรัมในหม้อน้ำเดือดแยก ตามเวลาบนห่อโดยทั่วไป 7–9 นาทีจนยังหนึบ สะเด็ดน้ำให้ดีและไม่ต้องล้าง หากจัดเสิร์ฟทันทีให้ปิดฝาเก็บให้อุ่น หรือทำให้เย็นเร็วหากจะประกอบภายหลัง"
      ),
      ml(
        "Put the drained and rinsed 400 g cooked chickpeas in a small saucepan with 30 ml water. Cover and warm over medium-low heat for 4–5 minutes, stirring once or twice, until steaming hot. Keep covered. If using canned chickpeas, check the label and heat until steaming throughout.",
        "將瀝乾沖洗的 400 公克熟鷹嘴豆與 30 毫升水放入小鍋。加蓋以中小火加熱 4–5 分鐘，攪拌一兩次，直到熱氣蒸騰。保持加蓋。若用罐裝鷹嘴豆，先看標示並加熱至全份冒熱氣。",
        "水を切ってすすいだ調理済みひよこ豆400gを小鍋に入れ、水30mlを加えます。ふたをして中弱火で4〜5分、ときどき混ぜながら全体から湯気が立つまで温めます。ふたをしたまま保温します。缶詰を使う場合は表示を確認し、全体が湯気の立つまで加熱します。",
        "물기를 빼고 헹군 익힌 병아리콩 400g을 작은 냄비에 넣고 물 30ml를 더합니다. 덮어서 중약불로 4–5분 한두 번 저어 전체에서 김이 날 때까지 데웁니다. 덮어 둡니다. 통조림 병아리콩은 표시를 확인하고 전체가 김이 날 때까지 데웁니다.",
        "ใส่ถั่วลูกไก่สุก 400 กรัมที่สะเด็ดและล้างแล้วลงหม้อเล็ก เติมน้ำ 30 มล. ปิดฝาอุ่นไฟกลางอ่อน 4–5 นาที คนหนึ่งหรือสองครั้งจนร้อนมีไอทั่วถึง ปิดฝาไว้ หากใช้ถั่วกระป๋องให้ตรวจฉลากและอุ่นจนมีไอทั่วทั้งหม้อ"
      ),
      ml(
        "Divide the rice-lentil mixture, pasta, and chickpeas evenly among 6 warm bowls, using one-sixth of each batch per bowl. Spoon tomato sauce over each portion, add garlic-vinegar dressing gradually to taste, and finish with fried onions. Serve promptly while hot components are steaming; keep any hot food not being served at 60°C or above, or cool it promptly.",
        "將米豆飯、義大利麵與鷹嘴豆平均分入 6 個溫碗，每碗各取全批的六分之一。淋上番茄醬，大蒜醋汁依口味逐步添加，最後放上炸洋蔥。趁熱配料冒蒸氣時盡快上桌；暫不供應的熱食須維持至少 60°C，否則迅速冷卻。",
        "温めた器6個に米とレンズ豆、パスタ、ひよこ豆をそれぞれ全量の6分の1ずつ盛ります。トマトソースをかけ、にんにく酢を味を見ながら少しずつ加え、揚げ玉ねぎをのせます。温かい具材から湯気が立つうちにすぐ出します。すぐ出さない熱い料理は60°C以上に保つか、速やかに冷まします。",
        "따뜻한 그릇 6개에 쌀·렌틸 혼합물, 파스타, 병아리콩을 각 전체 양의 6분의 1씩 나눕니다. 토마토소스를 얹고 마늘 식초 소스는 조금씩 더한 다음 튀긴 양파를 올립니다. 뜨거운 재료에서 김이 날 때 바로 냅니다. 바로 내지 않을 뜨거운 음식은 60°C 이상으로 보온하거나 신속히 식힙니다.",
        "แบ่งส่วนผสมข้าวกับเลนทิล พาสต้า และถั่วลูกไก่เท่า ๆ กันลงชามอุ่น 6 ใบ อย่างละหนึ่งในหกของทั้งหมด ราดซอสมะเขือเทศ เติมน้ำส้มสายชูกระเทียมทีละน้อยตามชอบ แล้วโรยหอมทอด เสิร์ฟทันทีขณะที่ส่วนร้อนยังมีไอ หากยังไม่เสิร์ฟให้คงอาหารร้อนที่ 60°C ขึ้นไปหรือรีบทำให้เย็น"
      )
    ],
    additionalIngredients: [
      { amount: "1.2 L", item: ml("water for boiling the lentils", "煮扁豆用水", "レンズ豆をゆでる水", "렌틸을 삶는 물", "น้ำสำหรับต้มเลนทิล") },
      { amount: "400–430 ml", item: ml("boiling water for cooking the rice", "煮米用滾水", "米を炊くための熱湯", "쌀을 짓는 끓는 물", "น้ำเดือดสำหรับหุงข้าว") },
      { amount: "30 ml", item: ml("water for warming the chickpeas", "加熱鷹嘴豆用水", "ひよこ豆を温める水", "병아리콩을 데우는 물", "น้ำสำหรับอุ่นถั่วลูกไก่") }
    ],
    tips: [
      ml("Fry onions in batches so the oil temperature does not fall and the slices crisp instead of steaming.", "洋蔥分批炸可避免油溫驟降，讓洋蔥酥脆而非悶軟。", "玉ねぎは数回に分けて揚げ、油温が下がって蒸れないようにします。", "양파를 나눠 튀겨 기름 온도가 떨어져 쪄지지 않고 바삭하게 합니다.", "แบ่งทอดหอมเพื่อให้อุณหภูมิน้ำมันไม่ตกและหอมกรอบแทนที่จะนิ่มจากไอน้ำ"),
      ml("Keep the garlic-vinegar dressing separate and add it gradually; its raw garlic and acidity can quickly dominate the bowl.", "大蒜醋汁分開放並少量添加；生蒜與酸味容易蓋過整碗味道。", "にんにく酢は別にして少しずつ加えます。生にんにくと酸味は全体を支配しやすいです。", "마늘 식초 소스는 따로 두고 조금씩 더하세요. 생마늘과 산미가 쉽게 맛을 압도할 수 있습니다.", "แยกน้ำส้มสายชูกระเทียมและเติมทีละน้อย เพราะกระเทียมดิบกับความเปรี้ยวอาจกลบรสทั้งชามได้เร็ว")
    ],
    mistakes: [
      ml("If the lentils become mushy before the rice cooks, shorten their first simmer next time; they should hold their shape before the second cooking.", "若扁豆在米熟前已煮爛，下次縮短第一次煮豆時間；再次同煮前應仍能保持形狀。", "米が炊ける前にレンズ豆が崩れる場合、次回は下ゆで時間を短くします。合わせて炊く前に形が残る状態が目安です。", "쌀이 익기 전에 렌틸이 으깨지면 다음에는 첫 삶는 시간을 줄이세요. 쌀과 함께 익히기 전 모양이 남아야 합니다.", "หากเลนทิลเละก่อนข้าวสุก ครั้งหน้าลดเวลาต้มรอบแรก ควรยังเป็นเม็ดก่อนหุงรวม"),
      ml("If the rice is wet or firm, do not stir repeatedly; let it rest covered, then adjust only with a small measured splash of boiling water.", "若米飯過濕或偏硬，不要反覆攪拌；先加蓋燜好，再只用少量量好的滾水調整。", "米がべたつく、または硬い場合、何度も混ぜません。ふたをして蒸らし、必要なら少量の熱湯だけを足します。", "밥이 질거나 단단해도 자주 젓지 마세요. 덮어 뜸을 들인 뒤 필요하면 계량한 끓는 물을 조금만 더합니다.", "หากข้าวแฉะหรือแข็งอย่าคนซ้ำหลายครั้ง ให้พักปิดฝาก่อน แล้วค่อยเติมน้ำเดือดที่ตวงไว้เพียงเล็กน้อย")
    ],
    storage: ml(
      "Cool the rice-lentil mixture quickly in shallow containers, ideally within 1 hour, and refrigerate at 4°C/40°F or colder; use within 24 hours and reheat only once until steaming hot throughout. Cool pasta, chickpeas, and sauces separately within 2 hours, refrigerate at 4°C or colder, and use within 3 days. Reheat only the portion needed until steaming; keep hot food at 60°C/140°F or above if holding it. Do not leave cooked components at room temperature over 2 hours (1 hour above 32°C/90°F).",
      "米豆飯應分裝於淺容器快速冷卻，最好 1 小時內完成，並冷藏於 4°C／40°F 以下；24 小時內食用，且只復熱一次至全份冒熱氣。義大利麵、鷹嘴豆與醬汁分開冷卻，2 小時內冷藏於 4°C 以下並於 3 天內使用。只加熱需要的份量至冒熱氣；保溫時維持至少 60°C／140°F。熟食室溫不可放超過 2 小時（高於 32°C／90°F 時 1 小時）。",
      "米とレンズ豆は浅い容器で素早く冷まし、できれば1時間以内に4°C/40°F以下で冷蔵します。24時間以内に食べ、再加熱は一度だけ、全体から湯気が立つまで行います。パスタ、ひよこ豆、ソースは別々に2時間以内に冷まし、4°C以下で冷蔵して3日以内に使います。必要な分だけ湯気が立つまで温めます。保温時は60°C/140°F以上に保ちます。調理済みのものを室温に2時間超（32°C/90°F超では1時間超）置きません。",
      "쌀·렌틸 혼합물은 얕은 용기에 나눠 빠르게 식히고 가능하면 1시간 안에 4°C/40°F 이하로 냉장합니다. 24시간 안에 먹고 재가열은 한 번만 하며 전체에서 김이 날 때까지 데웁니다. 파스타, 병아리콩, 소스는 따로 2시간 안에 식혀 4°C 이하로 냉장하고 3일 안에 사용합니다. 필요한 양만 김이 날 때까지 데우고 보온할 때는 60°C/140°F 이상으로 유지합니다. 익힌 재료를 실온에 2시간 초과(32°C/90°F 초과 시 1시간 초과) 두지 않습니다.",
      "ทำส่วนผสมข้าวกับเลนทิลให้เย็นเร็วในภาชนะตื้น โดยควรภายใน 1 ชั่วโมง แล้วแช่เย็นที่ 4°C/40°F หรือต่ำกว่า กินภายใน 24 ชั่วโมงและอุ่นซ้ำเพียงครั้งเดียวจนมีไอทั่วถึง ทำพาสต้า ถั่วลูกไก่ และซอสให้เย็นแยกกันภายใน 2 ชั่วโมง แช่ที่ 4°C หรือต่ำกว่าและใช้ภายใน 3 วัน อุ่นเฉพาะส่วนที่ต้องการจนมีไอ หากอุ่นค้างไว้ให้คงที่ 60°C/140°F ขึ้นไป อย่าวางอาหารสุกที่อุณหภูมิห้องเกิน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F)"
    ),
    safetySources: [["rice handling and storage", riceSafety], ["refrigeration and food handling", handling]]
  });
}

function reviseMangoStickyRice(recipe) {
  reviseRecipe(recipe, {
    prepMinutes: 755,
    cookMinutes: 85,
    titles: [
      ml("Soak and drain the glutinous rice", "浸泡並瀝乾糯米", "もち米を浸して水を切る", "찹쌀 불리고 물기 빼기", "แช่และสะเด็ดข้าวเหนียว"),
      ml("Prepare the steamer and toast the mung beans", "準備蒸籠並烘香綠豆仁", "蒸し器を用意し緑豆を煎る", "찜기 준비하고 녹두 볶기", "เตรียมลังถึงและคั่วถั่วทอง"),
      ml("Steam the rice until tender", "將糯米蒸至熟透", "もち米を柔らかく蒸す", "찹쌀을 부드럽게 찌기", "นึ่งข้าวจนสุกนุ่ม"),
      ml("Warm the coconut soaking syrup", "加熱浸米椰漿", "吸わせるココナッツ液を温める", "코코넛 시럽 데우기", "อุ่นน้ำกะทิมูน"),
      ml("Let the hot rice absorb the syrup", "讓熱糯米吸收椰漿", "熱い米にシロップを吸わせる", "뜨거운 쌀에 시럽 흡수시키기", "มูนข้าวร้อน"),
      ml("Cook the thick coconut topping", "煮濃椰漿淋醬", "濃いココナッツソースを作る", "진한 코코넛 토핑 만들기", "ทำหน้ากะทิข้น"),
      ml("Wash, peel, and slice the mangoes", "清洗、去皮並切芒果", "マンゴーを洗って皮をむき、切る", "망고를 씻고 껍질 벗겨 썰기", "ล้าง ปอก และหั่นมะม่วง"),
      ml("Portion the warm rice and mango", "分配溫糯米與芒果", "温かい米とマンゴーを盛り付ける", "따뜻한 밥과 망고 담기", "แบ่งข้าวอุ่นกับมะม่วง")
    ],
    bodies: [
      ml(
        "Rinse all 400 g Thai glutinous rice in several changes of cool water until mostly clear. Put it in a covered bowl with the measured 600 ml soaking water and refrigerate for 12 hours. Drain thoroughly before steaming and discard the soaking water. The overnight refrigerated soak is included in the preparation estimate.",
        "將全部 400 公克泰國糯米用冷水換洗數次，直到水大致清澈。放入有蓋碗中，加入量好的 600 毫升浸泡水並冷藏 12 小時。蒸之前充分瀝乾並倒掉浸泡水。準備時間已計入隔夜冷藏浸泡。",
        "タイもち米400g全量を冷水で数回すすぎ、水がほぼ澄むまで洗います。ふた付きのボウルに計量した浸水用水600mlと入れ、冷蔵庫で12時間浸します。蒸す前によく水を切り、浸水水は捨てます。冷蔵での一晩の浸水時間は準備時間に含みます。",
        "태국 찹쌀 400g 전량을 찬물에 여러 번 헹궈 물이 거의 맑아질 때까지 씻습니다. 뚜껑 있는 그릇에 계량한 불림물 600ml와 담아 냉장고에서 12시간 불립니다. 찌기 전에 물기를 충분히 빼고 불림물은 버립니다. 냉장 밤새 불리는 시간은 준비 시간에 포함됩니다.",
        "ล้างข้าวเหนียวไทย 400 กรัมทั้งหมดด้วยน้ำเย็นหลายครั้งจนน้ำเกือบใส ใส่ชามมีฝาพร้อมน้ำแช่ที่ตวงไว้ 600 มล. แล้วแช่เย็น 12 ชั่วโมง สะเด็ดน้ำให้หมดก่อนนึ่งและเทน้ำแช่ทิ้ง เวลาแช่ข้ามคืนในตู้เย็นรวมอยู่ในเวลาเตรียมแล้ว"
      ),
      ml(
        "Bring the steamer water to a steady boil. Line the basket with a clean damp steaming cloth or perforated parchment, leaving room for steam to pass. Toast all 40 g split mung beans in a dry skillet over medium-low heat for 5–7 minutes, stirring often, until pale golden and crisp; cool and keep dry for garnish.",
        "蒸鍋加水煮至持續沸騰。蒸籠鋪上乾淨濕布或有孔烘焙紙，留出蒸氣通道。乾鍋以中小火烘炒全部 40 公克去皮綠豆仁 5–7 分鐘，經常翻動至淡金色酥脆；放涼並保持乾燥，作為配料。",
        "蒸し器の湯をしっかり沸かします。清潔な濡れ布または穴を開けたクッキングシートを敷き、蒸気の通り道を残します。皮なし緑豆40g全量を乾いたフライパンで中弱火にかけ、5〜7分よく混ぜながら淡いきつね色でカリッとするまで煎ります。冷まして乾燥したまま飾り用に取っておきます。",
        "찜기 물을 계속 끓입니다. 깨끗하고 젖은 면보나 구멍 낸 종이를 깔아 증기가 통할 공간을 남깁니다. 껍질 벗긴 녹두 40g 전량을 마른 팬에서 중약불로 5–7분 자주 저어 연한 황금색으로 바삭해질 때까지 볶습니다. 식혀 고명용으로 건조하게 둡니다.",
        "ต้มน้ำในลังถึงให้เดือดสม่ำเสมอ รองตะแกรงด้วยผ้าสะอาดชุบน้ำหรือกระดาษรองอบเจาะรูโดยเว้นทางให้ไอน้ำผ่าน คั่วถั่วทอง 40 กรัมทั้งหมดในกระทะแห้งด้วยไฟกลางอ่อน 5–7 นาที คนบ่อย ๆ จนเหลืองอ่อนและกรอบ พักให้เย็นและเก็บให้แห้งไว้โรยหน้า"
      ),
      ml(
        "Spread the drained rice in an even layer in the basket. Cover and steam over boiling water for 20 minutes. Lift and turn it gently so the centre moves to the edges, then cover and steam 15 minutes more. Check a few grains: they should be tender and translucent with no hard white core. If needed, steam in 5-minute increments, keeping the lid closed between checks.",
        "將瀝乾的米均勻鋪在蒸籠中。加蓋隔沸水蒸 20 分鐘。輕輕翻動，讓中心的米移到外側，再加蓋蒸 15 分鐘。取幾粒檢查，應柔軟半透明且沒有硬白芯；若尚未熟，每次續蒸 5 分鐘。檢查間保持鍋蓋蓋好。",
        "水を切った米を蒸し器に均一に広げます。ふたをして沸騰した湯の上で20分蒸します。米をやさしく返して中央の米を外側に移し、ふたをしてさらに15分蒸します。数粒確認し、硬い白い芯がなく柔らかく透き通っていればよい状態です。必要なら5分ずつ追加し、確認の間はふたを閉じます。",
        "물기 뺀 쌀을 찜기에 고르게 펼칩니다. 덮고 끓는 물 위에서 20분 찝니다. 쌀을 부드럽게 뒤집어 가운데 쌀이 가장자리로 가게 한 다음 덮어 15분 더 찝니다. 몇 알을 확인해 딱딱한 흰 심 없이 부드럽고 투명해야 합니다. 필요하면 5분씩 더 찌고 확인 사이에는 뚜껑을 닫아 둡니다.",
        "เกลี่ยข้าวที่สะเด็ดน้ำแล้วให้เป็นชั้นสม่ำเสมอในลังถึง ปิดฝานึ่งเหนือน้ำเดือด 20 นาที พลิกข้าวเบา ๆ ให้ส่วนกลางย้ายไปด้านนอก แล้วปิดฝานึ่งต่ออีก 15 นาที ตรวจข้าวสองสามเมล็ด ควรนุ่มและใสโดยไม่มีแกนขาวแข็ง หากยังไม่สุกให้นึ่งเพิ่มครั้งละ 5 นาทีและปิดฝาระหว่างตรวจ"
      ),
      ml(
        "While the rice steams, put 350 ml coconut milk in a small saucepan with 150 g granulated sugar and 5 g of the salt. Warm over low heat for 2–3 minutes, stirring until dissolved; do not boil or reduce it. Remove from the heat. Reserve the remaining 150 ml coconut milk and 3 g salt for the topping.",
        "糯米蒸煮時，將 350 毫升椰漿、150 公克砂糖與 5 公克鹽放入小鍋。小火加熱 2–3 分鐘並攪拌至溶解；不要煮沸或收濃。離火。剩下的 150 毫升椰漿與 3 公克鹽留作淋醬。",
        "米を蒸している間に、ココナッツミルク350ml、砂糖150g、塩5gを小鍋に入れます。弱火で2〜3分、溶けるまで混ぜながら温めます。沸騰させたり煮詰めたりしません。火から外し、残りのココナッツミルク150mlと塩3gはトッピング用に取っておきます。",
        "쌀을 찌는 동안 코코넛밀크 350ml, 설탕 150g, 소금 5g을 작은 냄비에 넣습니다. 약불에서 2–3분 저어 녹을 때까지만 데우고 끓이거나 졸이지 않습니다. 불에서 내립니다. 남은 코코넛밀크 150ml와 소금 3g은 토핑용으로 남깁니다.",
        "ระหว่างนึ่งข้าว ใส่กะทิ 350 มล. น้ำตาล 150 กรัม และเกลือ 5 กรัมลงหม้อเล็ก อุ่นไฟอ่อน 2–3 นาที คนจนละลาย ห้ามต้มเดือดหรือเคี่ยวให้งวด ยกลงจากเตา แยกกะทิที่เหลือ 150 มล.และเกลือ 3 กรัมไว้ทำหน้า"
      ),
      ml(
        "Transfer the hot steamed rice to a warm bowl and pour over all the warm coconut syrup. Fold gently from the edges so it coats the grains without crushing them. Cover and stand 20 minutes, fold once, then cover and rest 20 minutes more for even absorption. Keep covered and warm; this 40-minute absorption and rest is included in the cooking estimate.",
        "將熱糯米移入溫碗，倒入全部溫椰漿糖液。從碗邊輕輕翻拌，讓液體包覆米粒而不壓碎。加蓋靜置 20 分鐘，翻拌一次，再加蓋靜置 20 分鐘使其均勻吸收。米飯加蓋保溫；時間估算已計入這 40 分鐘吸收與靜置。",
        "蒸したての米を温めたボウルに移し、温かいココナッツシロップを全量かけます。粒をつぶさないよう縁からやさしく返します。ふたをして20分置き、一度返し、さらにふたをして20分休ませて均一に吸わせます。ふたをして温かく保ちます。この40分は調理時間に含みます。",
        "갓 찐 쌀을 따뜻한 그릇에 옮기고 따뜻한 코코넛 시럽을 전량 붓습니다. 쌀알을 으깨지 않도록 가장자리부터 부드럽게 접어 시럽을 입힙니다. 덮어 20분 두고 한 번 뒤집은 뒤 다시 덮어 20분 더 두어 고르게 흡수시킵니다. 밥은 덮어 따뜻하게 두며 이 40분은 조리 시간에 포함됩니다.",
        "ย้ายข้าวร้อนลงชามอุ่นแล้วเทน้ำกะทิปรุงหวานอุ่นทั้งหมดลงไป ตะล่อมจากขอบเบา ๆ ให้เคลือบเมล็ดโดยไม่บี้ ปิดฝาพัก 20 นาที คนกลับหนึ่งครั้ง แล้วปิดฝาพักอีก 20 นาทีให้ซึมทั่ว เก็บข้าวปิดฝาให้อุ่น ช่วงพัก 40 นาทีนี้รวมในเวลาปรุงแล้ว"
      ),
      ml(
        "Whisk the remaining 8 g rice flour with 45 ml topping water until smooth. In a small saucepan, combine it with the remaining 150 ml coconut milk and 3 g salt. Cook over low heat for 3–5 minutes, whisking constantly, until glossy and lightly thickened but still pourable. Keep warm; if too thick, whisk in water a teaspoon at a time.",
        "將剩下的 8 公克米粉與 45 毫升淋醬用水攪至滑順。放入小鍋，再加入剩下的 150 毫升椰漿與 3 公克鹽。小火煮 3–5 分鐘並持續攪拌，直到有光澤、稍微濃稠但仍可淋下。保溫；若太稠，每次拌入一茶匙水調整。",
        "残りの米粉8gをトッピング用水45mlで滑らかに溶きます。小鍋に入れ、残りのココナッツミルク150mlと塩3gを加えます。弱火で3〜5分、絶えず混ぜながら、つやが出て軽くとろみがつくが注げる状態まで加熱します。温かく保ち、濃すぎる場合は水を小さじ1ずつ混ぜます。",
        "남은 쌀가루 8g을 토핑용 물 45ml에 풀어 매끈하게 만듭니다. 작은 냄비에 넣고 남은 코코넛밀크 150ml와 소금 3g을 더합니다. 약불에서 3–5분 계속 저어 윤기가 나고 약간 걸쭉하지만 흐를 정도로 익힙니다. 따뜻하게 두고 너무 되면 물을 1작은술씩 섞습니다.",
        "คนแป้งข้าวเจ้าที่เหลือ 8 กรัมกับน้ำทำหน้า 45 มล.จนเนียน ใส่หม้อเล็กพร้อมกะทิที่เหลือ 150 มล.และเกลือ 3 กรัม กวนไฟอ่อน 3–5 นาทีจนเงาและข้นเล็กน้อยแต่ยังราดได้ พักให้อุ่น หากข้นเกินไปให้เติมน้ำครั้งละหนึ่งช้อนชา"
      ),
      ml(
        "Rinse all 900 g mangoes under clean running water and dry them before peeling; do not use soap. Peel, remove the pits, and slice just before serving. Keep the cut fruit covered and cool while portioning the rice; discard bruised or spoiled parts.",
        "將全部 900 公克芒果以乾淨流動水沖洗並擦乾，再去皮；不要使用肥皂。去核並於上桌前切片。分配糯米時將切好的水果加蓋冷藏；碰傷或腐壞部分丟棄。",
        "マンゴー900g全量を清潔な流水で洗い、皮をむく前に水気を拭きます。石けんは使いません。皮をむいて種を取り、供する直前に切ります。米を盛る間、切った果物は覆って冷やします。傷んだ部分は取り除きます。",
        "망고 900g 전량을 깨끗한 흐르는 물로 씻고 물기를 닦은 뒤 껍질을 벗깁니다. 비누는 사용하지 않습니다. 씨를 제거하고 내기 직전에 썹니다. 밥을 나누는 동안 자른 과일은 덮어 차게 둡니다. 멍들거나 상한 부분은 버립니다.",
        "ล้างมะม่วงทั้ง 900 กรัมด้วยน้ำไหลสะอาดและเช็ดให้แห้งก่อนปอก ห้ามใช้สบู่ ปอก เอาเมล็ดออก และหั่นก่อนเสิร์ฟไม่นาน ระหว่างแบ่งข้าวให้ปิดฝาผลไม้ที่หั่นแล้วและเก็บให้เย็น ทิ้งส่วนที่ช้ำหรือเสีย"
      ),
      ml(
        "Divide all the warm sticky rice evenly among 6 plates, about one-sixth of the cooked batch per plate. Add 150 g sliced mango to each portion, drizzle about 25 ml coconut topping over each, and divide all 40 g toasted mung beans across the plates (about 6–7 g each). Serve warm rice with cool fruit; the quantities use the whole batch and make 6 portions.",
        "將全部溫糯米平均分到 6 盤，每盤約為熟飯總量的六分之一。每份搭配 150 公克芒果片，淋約 25 毫升椰漿淋醬，並將全部 40 公克烘香綠豆仁分配到各盤（每份約 6–7 公克）。溫糯米搭配涼芒果上桌；所有食材恰好分成 6 份。",
        "温かいもち米全量を6皿に均等に分け、各皿に炊き上がりの約6分の1を盛ります。マンゴー150gずつを添え、ココナッツソースを各約25mlかけ、煎った緑豆40g全量を各皿に分けます（各約6〜7g）。温かい米に冷たい果物を添えて出します。全量で6人分です。",
        "따뜻한 찹쌀밥 전량을 6접시에 고르게 나눠 접시마다 지은 밥의 약 6분의 1을 담습니다. 망고 150g씩 곁들이고 코코넛 토핑을 약 25ml씩 뿌린 뒤 볶은 녹두 40g 전량을 나눠 올립니다(각 약 6–7g). 따뜻한 밥과 차가운 과일을 함께 내며 전체 양은 6인분입니다.",
        "แบ่งข้าวเหนียวอุ่นทั้งหมดลง 6 จานเท่า ๆ กัน จานละประมาณหนึ่งในหกของข้าวสุก ใส่มะม่วงหั่นจานละ 150 กรัม ราดหน้ากะทิประมาณ 25 มล.ต่อจาน และแบ่งถั่วทองคั่ว 40 กรัมทั้งหมดลงทุกจาน (ประมาณ 6–7 กรัมต่อจาน) เสิร์ฟข้าวอุ่นกับผลไม้เย็น ปริมาณทั้งหมดได้ 6 ที่"
      )
    ],
    tips: [
      ml("Keep the soaked rice refrigerated and drain it well; excess water left in the grains can make the steamed rice gummy.", "浸泡糯米須冷藏並充分瀝乾；米粒殘留太多水分會讓蒸飯黏爛。", "米は冷蔵で浸し、よく水を切ります。水が残ると蒸し上がりがべたつきます。", "불린 쌀은 냉장 보관하고 물기를 잘 빼세요. 물이 남으면 찐 밥이 질척해집니다.", "แช่ข้าวในตู้เย็นและสะเด็ดน้ำให้ดี น้ำที่เหลือมากเกินไปทำให้ข้าวเหนียวแฉะ"),
      ml("Use the absorption rests instead of adding coconut milk by guesswork; the measured amount is intended for all six portions.", "按時間靜置吸收，不要憑感覺多加椰漿；量好的椰漿正好供六份使用。", "計量したココナッツミルクを吸わせ、勘で足しません。この量で6人分です。", "계량한 코코넛밀크를 흡수시키고 임의로 더 넣지 마세요. 이 양은 6인분 기준입니다.", "ให้ข้าวดูดกะทิตามเวลาพัก อย่าเติมเพิ่มโดยกะเอา ปริมาณที่ตวงไว้พอดีสำหรับ 6 ที่")
    ],
    mistakes: [
      ml("If centre grains remain chalky, spread the rice out and steam in 5-minute increments; do not try to fix undercooked sticky rice by boiling it in syrup.", "若中心米粒仍有粉白硬芯，將米攤開並每次續蒸 5 分鐘；不要把未熟糯米放進糖漿煮來補救。", "中心が粉っぽく硬い場合、米を広げて5分ずつ追加で蒸します。シロップで煮て直そうとしません。", "가운데 쌀알에 분가루 같은 딱딱한 심이 남으면 펼쳐서 5분씩 더 찌세요. 시럽에 끓여 익히려 하지 마세요.", "หากกลางเมล็ดยังเป็นไตแข็ง ให้เกลี่ยข้าวแล้วนึ่งเพิ่มครั้งละ 5 นาที อย่าพยายามแก้ด้วยการต้มข้าวเหนียวดิบในน้ำเชื่อม"),
      ml("If the coconut topping turns lumpy, take it off the heat and whisk briskly; next time dissolve the flour in cold water before adding the coconut milk.", "若椰漿淋醬結塊，先離火快速攪打；下次先用冷水調開米粉再加入椰漿。", "ココナッツソースがだまになったら火を止め、手早く混ぜます。次回は米粉を冷水で溶いてから加えます。", "코코넛 토핑이 뭉치면 불에서 내려 빠르게 저으세요. 다음에는 쌀가루를 찬물에 먼저 풀어 코코넛밀크에 넣습니다.", "หากหน้ากะทิจับตัวเป็นก้อน ให้ยกลงจากไฟแล้วตีเร็ว ๆ ครั้งหน้าให้ละลายแป้งกับน้ำเย็นก่อนเติมกะทิ")
    ],
    storage: ml(
      "Cool leftover sticky rice quickly in shallow containers, ideally within 1 hour, and refrigerate at 4°C/40°F or colder; use within 24 hours and reheat only once until steaming hot throughout. Cool coconut topping and cut mango separately within 2 hours, refrigerate at 4°C or colder, and use within 3 days. Do not leave cooked rice or cut fruit at room temperature over 2 hours (1 hour above 32°C/90°F).",
      "剩餘糯米以淺容器快速冷卻，最好 1 小時內完成，並冷藏於 4°C／40°F 以下；24 小時內食用，且只復熱一次至全份冒熱氣。椰漿淋醬與切好的芒果分開冷卻，2 小時內冷藏於 4°C 以下並於 3 天內使用。熟飯或切好的水果室溫不可放超過 2 小時（高於 32°C／90°F 時 1 小時）。",
      "残ったもち米は浅い容器で素早く冷まし、できれば1時間以内に4°C/40°F以下で冷蔵します。24時間以内に食べ、再加熱は一度だけ、全体から湯気が立つまで行います。ココナッツソースと切ったマンゴーは別々に2時間以内に冷まし、4°C以下で冷蔵して3日以内に使います。炊いた米や切った果物を室温に2時間超（32°C/90°F超では1時間超）置きません。",
      "남은 찹쌀밥은 얕은 용기에 담아 빠르게 식히고 가능하면 1시간 안에 4°C/40°F 이하로 냉장합니다. 24시간 안에 먹고 재가열은 한 번만 하며 전체에서 김이 날 때까지 데웁니다. 코코넛 토핑과 자른 망고는 따로 2시간 안에 식혀 4°C 이하로 냉장하고 3일 안에 사용합니다. 익힌 밥이나 자른 과일을 실온에 2시간 초과(32°C/90°F 초과 시 1시간 초과) 두지 않습니다.",
      "ทำข้าวเหนียวที่เหลือให้เย็นเร็วในภาชนะตื้น โดยควรภายใน 1 ชั่วโมง แล้วแช่เย็นที่ 4°C/40°F หรือต่ำกว่า กินภายใน 24 ชั่วโมงและอุ่นซ้ำเพียงครั้งเดียวจนมีไอทั่วถึง ทำหน้ากะทิและมะม่วงที่หั่นแล้วให้เย็นแยกกันภายใน 2 ชั่วโมง แช่ที่ 4°C หรือต่ำกว่าและใช้ภายใน 3 วัน อย่าวางข้าวสุกหรือผลไม้หั่นที่อุณหภูมิห้องเกิน 2 ชั่วโมง (1 ชั่วโมงเมื่ออากาศเกิน 32°C/90°F)"
    ),
    safetySources: [["cooked rice handling and storage", riceSafety], ["refrigeration and food handling", handling]]
  });
}

export function refineEightySixthMethods(recipes) {
  const byId = new Map(recipes.map((recipe) => [recipe.id, recipe]));
  reviseCremeBrulee(byId.get("creme-brulee"));
  reviseGulabJamun(byId.get("gulab-jamun"));
  reviseKoshari(byId.get("koshari"));
  reviseMangoStickyRice(byId.get("mango-sticky-rice"));
}
