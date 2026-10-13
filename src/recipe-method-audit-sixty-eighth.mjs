const ml = (en, zh, ja, ko, th) => ({ en, "zh-hant": zh, ja, ko, th });
const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const storageChart = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";

function clone(recipe) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.map((row) => ({
      ...row,
      amount: typeof row.amount === "object" ? { ...row.amount } : row.amount,
      item: typeof row.item === "object" ? { ...row.item } : row.item
    })),
    instructions: recipe.instructions.map((step) => ({ ...step, title: { ...step.title }, body: { ...step.body } })),
    storage: { ...recipe.storage },
    sources: recipe.sources.map((source) => ({ ...source }))
  };
}

function body(recipe, index, localized) {
  recipe.instructions[index].body = localized;
}

function official(recipe, label, url, publisher = "FoodSafety.gov") {
  const title = `Official food-safety guidance — ${publisher}: ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function addSafetySources(recipe, { egg = false } = {}) {
  official(recipe, "Safe Minimum Internal Temperatures", temperatures);
  official(recipe, "4 Steps to Food Safety", handling);
  official(recipe, "Cold Food Storage Charts", storageChart);
  if (egg) official(recipe, "What You Need to Know About Egg Safety", eggSafety, "FDA");
}

function reviseZaruSoba(recipe) {
  body(recipe, 0, ml(
    "Wipe 8 g kombu and soak it in all 300 ml cold water for 20 minutes; keep this sauce water separate from the 4 L noodle water. In a small pan, boil all 60 ml sake and 60 ml mirin for 2 minutes. Add the kombu water and all 120 ml soy sauce; heat until steaming. Steep all 12 g bonito flakes for 5 minutes, then strain. Cool the sauce promptly in an ice bath and refrigerate it at or below 4°C within 2 hours (within 1 hour if the room is above 32°C).",
    "擦拭 8 公克昆布，以全部 300 毫升冷水浸泡 20 分鐘；這份水供麵露使用，與 4 公升煮麵水分開。小鍋中將全部 60 毫升清酒和 60 毫升味醂煮 2 分鐘，加入昆布水與全部 120 毫升醬油，加熱至冒蒸氣。放入全部 12 公克柴魚片浸泡 5 分鐘後過濾。將麵露以冰水浴快速降溫，2 小時內冷藏至 4°C 以下；室溫高於 32°C 時須在 1 小時內冷藏。",
    "昆布8gを拭き、冷水300mlすべてに20分浸します。この水はつゆ用で、そば用の湯4Lとは分けます。小鍋で酒60mlとみりん60mlをすべて2分煮立てます。昆布水としょうゆ120mlすべてを加え、湯気が立つまで温めます。かつお節12gすべてを5分浸してからこします。氷水浴で速やかに冷まし、室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に4°C以下で冷蔵します。",
    "다시마 8g을 닦아 찬물 300ml 전량에 20분 담급니다. 이 물은 멘쓰유용이며 면 삶는 물 4L와 분리합니다. 작은 냄비에 사케 60ml와 미림 60ml를 모두 넣고 2분 끓입니다. 다시마 물과 간장 120ml 전량을 넣어 김이 날 때까지 데웁니다. 가쓰오부시 12g을 모두 넣어 5분 우린 뒤 거릅니다. 얼음물에 담가 빠르게 식히고, 실내가 32°C보다 더우면 1시간 안에, 그 외에는 2시간 안에 4°C 이하로 냉장합니다.",
    "เช็ดคอมบุ 8 กรัมแล้วแช่ในน้ำเย็น 300 มล.ทั้งหมด 20 นาที น้ำนี้ใช้ทำเมนสึยุ แยกจากน้ำต้มเส้น 4 ลิตร ต้มสาเก 60 มล.และมิริน 60 มล.ทั้งหมดในหม้อเล็ก 2 นาที เติมน้ำคอมบุกับซีอิ๊ว 120 มล.ทั้งหมด อุ่นจนมีไอ ใส่ปลาโอแห้ง 12 กรัมทั้งหมด แช่ 5 นาทีแล้วกรอง ทำซอสให้เย็นเร็วในอ่างน้ำแข็งและแช่เย็นที่ 4°C หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงหากห้องร้อนกว่า 32°C"
  ));
  body(recipe, 1, ml(
    "Bring all 4 L unsalted noodle water to a rolling boil in a wide pot. Keep the 2 L rinse water and 1 L ice water ready in separate bowls. The 300 ml kombu water belongs to the sauce and must not be poured into this pot.",
    "寬鍋中將全部 4 公升無鹽煮麵水煮至大滾；另備 2 公升沖洗水及 1 公升冰水，分置不同容器。300 毫升昆布水是麵露用水，不可倒入煮麵鍋。",
    "広い鍋で麺用の無塩水4Lすべてをしっかり沸騰させます。すすぎ用の水2Lと氷水1Lは別の器に用意します。昆布水300mlはつゆ用なので、この鍋に入れません。",
    "넓은 냄비에 면 삶는 무염수 4L 전량을 팔팔 끓입니다. 헹굼물 2L와 얼음물 1L는 각각 다른 그릇에 준비합니다. 다시마 물 300ml는 소스용이므로 이 냄비에 붓지 않습니다.",
    "ต้มน้ำไม่เค็มสำหรับเส้น 4 ลิตรทั้งหมดในหม้อกว้างให้เดือดจัด เตรียมน้ำล้าง 2 ลิตรและน้ำแข็ง 1 ลิตรแยกในชาม น้ำคอมบุ 300 มล.ใช้ทำซอส ห้ามเทลงหม้อต้มเส้น"
  ));
  body(recipe, 2, ml(
    "Fan all 320 g dried soba into the boiling water and stir once to separate the strands. Cook for an estimated 4–5 minutes or follow the package if it differs; check near the end for noodles that are tender through but still slightly chewy. Divide the cooked noodles into four equal portions, each based on 80 g dry soba. The time and chew describe quality; the package directions control the cook time for that product.",
    "將全部 320 公克乾蕎麥麵扇形放入沸水，攪拌一次使麵條分開。估計煮 4–5 分鐘；若包裝時間不同，依標示為準，接近時間時檢查麵條是否熟透且仍略有咬勁。熟麵平均分成四份，每份以 80 公克乾麵計。時間與咬勁是品質判斷；實際煮麵時間依該產品包裝標示。",
    "乾そば320gすべてを広げて沸騰湯に入れ、一度混ぜてほぐします。目安として4〜5分ゆでますが、袋の表示が異なる場合は表示に従い、終盤に中まで柔らかく少し弾力が残るか確認します。ゆでた麺は4等分し、1人分は乾麺80g相当です。時間と歯ごたえは品質の目安で、実際のゆで時間は製品表示に従います。",
    "건 메밀면 320g 전량을 끓는 물에 부채처럼 넣고 한 번 저어 풀어 줍니다. 약 4–5분 삶되 제품 표시가 다르면 표시를 따르고 끝날 무렵 속까지 익었지만 약간 쫄깃한지 확인합니다. 삶은 면은 네 몫으로 똑같이 나누며, 한 몫은 마른 면 80g에 해당합니다. 시간과 식감은 품질 기준이고 실제 삶는 시간은 제품 표시를 따릅니다.",
    "ใส่โซบะแห้ง 320 กรัมทั้งหมดลงน้ำเดือดเป็นพัด คนหนึ่งครั้งให้เส้นแยก ต้มประมาณ 4–5 นาที หรือตามฉลากหากต่างกัน ช่วงท้ายตรวจให้เส้นนุ่มทั่วแต่ยังหนึบ แบ่งเส้นสุกเป็น 4 ส่วนเท่ากัน ส่วนละเทียบเท่าเส้นแห้ง 80 กรัม เวลาและความหนึบเป็นเกณฑ์คุณภาพ ส่วนเวลาจริงให้ยึดตามฉลาก"
  ));
  body(recipe, 3, ml(
    "Drain the soba at once. Rinse and gently rub the strands with the listed 2 L cold water until the surface starch is mostly gone; transfer to the 1 L ice water for exactly 30 seconds, then drain thoroughly. Keep the cold noodles covered and refrigerated if service is delayed; do not leave them at room temperature while preparing the toppings.",
    "蕎麥麵煮好立即瀝乾，以列出的 2 公升冷水沖洗並輕揉，直到表面澱粉大致洗掉；再放入 1 公升冰水冰鎮 30 秒，充分瀝乾。若不能立即上桌，冷麵加蓋冷藏；備料期間不可置於室溫。",
    "ゆでたそばをすぐに湯切りし、用意した冷水2Lでやさしくもみ洗いして表面のでんぷんをほぼ落とします。氷水1Lに30秒入れ、しっかり水気を切ります。すぐに出さない場合は麺を覆って冷蔵し、薬味を準備する間も室温に置かないでください。",
    "삶은 메밀면은 즉시 체에 받칩니다. 준비한 찬물 2L로 부드럽게 비벼 씻어 표면 전분을 대부분 제거하고 얼음물 1L에 정확히 30초 담근 뒤 물기를 충분히 뺍니다. 바로 내지 않으면 면을 덮어 냉장하고 고명을 준비하는 동안 실온에 두지 않습니다.",
    "สะเด็ดโซบะทันที ล้างและคลึงเส้นเบา ๆ ด้วยน้ำเย็น 2 ลิตรที่เตรียมไว้จนแป้งผิวออกเกือบหมด ย้ายลงน้ำแข็ง 1 ลิตร 30 วินาทีแล้วสะเด็ดให้ดี หากยังไม่เสิร์ฟให้ปิดฝาแช่เย็น อย่าวางไว้ที่อุณหภูมิห้องระหว่างเตรียมเครื่องเคียง"
  ));
  body(recipe, 4, ml(
    "Slice all 40 g scallions and shred both nori sheets. Divide them among four servings: about 10 g scallions and half a sheet of nori per person. The 20 g wasabi is optional; if used, portion about 5 g per diner. Keep toppings separate until serving.",
    "將全部 40 公克青蔥切片、兩張海苔剪絲，分成四份：每人約 10 公克青蔥和半張海苔。20 公克芥末醬可省略；使用時每人約 5 公克。上桌前配料分開放。",
    "ねぎ40gすべてを薄切りにし、焼きのり2枚を細切りにします。4人分に分け、1人あたりねぎ約10g、のり半枚です。わさび20gは好みで使い、使う場合は1人約5gに分けます。薬味は出す直前まで別々にしておきます。",
    "대파 40g 전량을 얇게 썰고 김 두 장을 가늘게 자릅니다. 네 몫으로 나눠 1인당 대파 약 10g과 김 반 장씩 둡니다. 와사비 20g은 선택 사항이며 사용하면 1인당 약 5g씩 나눕니다. 고명은 낼 때까지 따로 둡니다.",
    "ซอยต้นหอม 40 กรัมทั้งหมดและหั่นโนริ 2 แผ่นเป็นเส้น แบ่งเป็น 4 ที่ ที่ละต้นหอมประมาณ 10 กรัมกับโนริครึ่งแผ่น วาซาบิ 20 กรัมเป็นตัวเลือก หากใช้แบ่งที่ละประมาณ 5 กรัม แยกเครื่องเคียงไว้จนเสิร์ฟ"
  ));
  body(recipe, 5, ml(
    "Divide the drained noodles evenly among four bamboo zaru or plates. Set one chilled mentsuyu cup beside each portion and divide the sauce equally; serve the scallions, nori, and optional wasabi alongside. Dip each bite rather than pouring the sauce over all the noodles, so the remaining portions stay unsalted and separate.",
    "將瀝乾的麵平均分入四個竹簾或盤中。每份旁放一杯冰涼麵露，平均分配；青蔥、海苔和可選芥末另放。每口麵分次沾取，不要把麵露整杯淋在全部麵上，讓剩餘份量保持分開且不過鹹。",
    "水を切った麺を4つの竹ざるまたは皿に均等に盛ります。冷やしためんつゆを各人の器に等分して添え、ねぎ、のり、好みでわさびも別に出します。麺全体にかけず、一口ずつつけて食べると、残りの麺を味付けせず別々に保てます。",
    "물기를 뺀 면을 대나무 소쿠리나 접시 네 개에 고르게 담습니다. 차가운 멘쓰유를 네 컵에 똑같이 나눠 곁들이고 대파, 김, 선택한 와사비는 따로 냅니다. 면 전체에 소스를 붓지 말고 한입씩 찍어 먹어 남은 면을 간하지 않은 채 분리해 둡니다.",
    "แบ่งเส้นที่สะเด็ดแล้วใส่ซารุไม้ไผ่หรือจาน 4 ใบเท่า ๆ กัน วางเมนสึยุเย็นคนละถ้วยและแบ่งซอสเท่า ๆ กัน เสิร์ฟต้นหอม โนริ และวาซาบิตามชอบแยกข้าง จิ้มทีละคำแทนการราดซอสบนเส้นทั้งหมด เพื่อให้เส้นส่วนที่เหลือแยกและไม่เค็ม"
  ));
  recipe.storage = ml(
    "For the best chew, cook soba just before serving. If holding leftovers, refrigerate the noodles and unused mentsuyu separately within 2 hours (within 1 hour above 32°C) at or below 4°C; use the noodles by the next day as a site quality preference, since they clump as they sit. Discard sauce left in personal dipping cups. This dish is served cold, so it normally is not reheated; if repurposing plain cooked noodles as a hot leftover, reheat that portion to 74°C/165°F throughout.",
    "為保留咬勁，蕎麥麵最好現煮現吃。若要留存，2 小時內（環境高於 32°C 時 1 小時內）將麵條與未使用麵露分開冷藏於 4°C 以下；麵條隔日內用完是本食譜的品質偏好，因放久會結團。個人沾麵杯中剩下的麵露請丟棄。此料理冷食，通常不需復熱；若將未沾醬的熟麵改作熱食剩菜，該份須復熱至各處 74°C/165°F。",
    "歯ごたえを保つには、そばは食べる直前にゆでます。残す場合は、麺と未使用のつゆを分け、室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に4°C以下で冷蔵します。麺は置くと固まりやすいため、翌日までに使うのは本レシピの品質上の目安です。個人のつけ汁の器に残ったつゆは捨てます。冷たい料理なので通常は再加熱しませんが、つけ汁に触れていないゆで麺を温かい残り物にする場合は、全体を74°C/165°Fまで再加熱します。",
    "쫄깃한 식감을 위해 메밀면은 먹기 직전에 삶습니다. 남길 경우 면과 사용하지 않은 멘쓰유를 따로 두고, 실내가 32°C보다 더우면 1시간 안에, 그 외에는 2시간 안에 4°C 이하로 냉장합니다. 면은 두면 뭉치므로 다음 날까지 먹으라는 것은 이 레시피의 품질 기준입니다. 개인 찍먹 그릇에 남은 소스는 버립니다. 이 요리는 차갑게 먹으므로 보통 다시 데우지 않습니다. 소스에 닿지 않은 익힌 면을 따뜻한 남은 음식으로 활용한다면 전체가 74°C/165°F가 되도록 데우세요.",
    "เพื่อให้เส้นหนึบควรต้มก่อนเสิร์ฟ หากเก็บเส้นและเมนสึยุที่ยังไม่ได้ใช้แยกกัน แช่เย็นที่ 4°C หรือต่ำกว่าภายใน 2 ชั่วโมง หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C ควรกินเส้นภายในวันถัดไปเพื่อคุณภาพ เพราะเส้นจะจับกันเมื่อวางไว้ ทิ้งซอสที่เหลือในถ้วยจิ้มส่วนตัว เมนูนี้เสิร์ฟเย็นจึงปกติไม่ต้องอุ่น หากนำเส้นสุกที่ยังไม่จิ้มซอสไปทำเป็นอาหารร้อน ให้อุ่นส่วนนั้นให้ทั่วถึง 74°C/165°F"
  );
  addSafetySources(recipe);
}

function reviseCroqueMonsieur(recipe) {
  body(recipe, 0, ml(
    "Melt all 20 g butter in a small pan over medium-low heat. Whisk in all 20 g flour and cook for 1 minute, scraping the corners, until the roux is smooth and pale rather than browned.",
    "小鍋以中小火融化全部 20 公克奶油，拌入全部 20 公克麵粉炒 1 分鐘，刮到鍋角，至滑順淡色而非焦黃。",
    "小鍋でバター20gすべてを弱めの中火で溶かします。粉20gすべてを加えて1分、隅をこすりながら、色づかず滑らかなルーになるまで混ぜます。",
    "작은 냄비를 중약불에 올려 버터 20g 전량을 녹입니다. 밀가루 20g 전량을 넣고 모서리까지 긁으며 1분 저어 갈색이 되지 않고 매끈하고 옅은 루를 만듭니다.",
    "ละลายเนย 20 กรัมทั้งหมดในหม้อเล็กด้วยไฟกลางอ่อน ใส่แป้ง 20 กรัมทั้งหมด คน 1 นาทีพร้อมขูดมุมหม้อจนรูส์เนียนสีอ่อน ไม่เป็นสีน้ำตาล"
  ));
  body(recipe, 1, ml(
    "Whisk in all 200 ml milk gradually and simmer gently for an estimated 3–4 minutes, stirring until the sauce coats a spoon. Stir in all 1 g salt, 0.5 g pepper, and 0.1 g nutmeg; remove from the heat and rest 5 minutes. Use this full béchamel in the sandwiches and on top.",
    "分次拌入全部 200 毫升牛奶，以小火輕滾估計 3–4 分鐘並持續攪拌，至白醬能裹住湯匙。拌入全部 1 公克鹽、0.5 公克胡椒和 0.1 公克肉豆蔻粉；離火靜置 5 分鐘。白醬全部用於夾餡及表面。",
    "牛乳200mlすべてを少しずつ加え、目安として3〜4分、ソースがスプーンにまとわりつくまで静かに煮て混ぜます。塩1g、こしょう0.5g、ナツメグ0.1gをすべて加え、火から下ろして5分休ませます。このベシャメルは全量をサンドと表面に使います。",
    "우유 200ml 전량을 조금씩 넣고 약 3–4분 부드럽게 끓이며 저어 숟가락에 소스가 묻을 정도로 농도를 냅니다. 소금 1g, 후추 0.5g, 넛맥 0.1g을 모두 넣고 불을 끈 뒤 5분 둡니다. 베샤멜은 전량 샌드위치 속과 윗면에 사용합니다.",
    "ค่อย ๆ เติมนม 200 มล.ทั้งหมด เคี่ยวเบา ๆ ประมาณ 3–4 นาที คนจนซอสเคลือบช้อน ใส่เกลือ 1 กรัม พริกไทย 0.5 กรัม และลูกจันทน์เทศ 0.1 กรัมทั้งหมด ยกลงพัก 5 นาที ใช้เบชาเมลทั้งหมดทั้งด้านในและด้านบนแซนด์วิช"
  ));
  body(recipe, 2, ml(
    "For two sandwiches, spread the remaining 10 g butter over the four outside bread faces. Divide all 10 g mustard between the two sandwiches. Give each sandwich 80 g ham and 22.5 g of the 90 g Gruyère inside; reserve the other 45 g cheese for the tops. Spread half the béchamel inside and keep half for the tops, then close each sandwich evenly.",
    "製作兩份三明治：將剩下 10 公克奶油塗在四片吐司外側，全部 10 公克芥末醬分給兩份。每份夾入 80 公克火腿及 90 公克起司中的 22.5 公克；剩下 45 公克起司留作表面。白醬一半抹入內層、一半留作頂部，再均勻闔起兩份三明治。",
    "サンド2個分として、残りのバター10gをパン4枚の外側に塗ります。マスタード10gすべてを2個に分けます。各サンドにハム80gとグリュイエール90gのうち22.5gを挟み、残りのチーズ45gは上に使います。ベシャメルの半量を内側に塗り、半量を上用に残して、2個を均等に閉じます。",
    "샌드위치 두 개를 만듭니다. 남은 버터 10g을 식빵 네 장의 바깥면에 바릅니다. 머스터드 10g 전량을 두 샌드위치에 나눕니다. 각 샌드위치에 햄 80g과 그뤼예르 90g 중 22.5g을 넣고, 남은 치즈 45g은 윗면용으로 둡니다. 베샤멜 절반은 안쪽에 바르고 나머지 절반은 윗면용으로 남겨 고르게 닫습니다.",
    "ทำแซนด์วิช 2 ชิ้น ทาเนยที่เหลือ 10 กรัมบนด้านนอกของขนมปัง 4 แผ่น แบ่งมัสตาร์ด 10 กรัมทั้งหมดให้สองชิ้น แต่ละชิ้นใส่แฮม 80 กรัมและกรูแยร์ 22.5 กรัมจากทั้งหมด 90 กรัม เก็บชีสที่เหลือ 45 กรัมไว้ด้านบน ทาเบชาเมลครึ่งหนึ่งด้านในและเก็บอีกครึ่งไว้ด้านบน แล้วประกบให้เท่ากัน"
  ));
  body(recipe, 3, ml(
    "Heat an ovenproof skillet over medium-low heat. Toast the two sandwiches for an estimated 3–4 minutes per side, turning once, until both outer faces are crisp and golden; lower the heat if the bread darkens before the centre warms. Heat the oven to 190°C while they toast.",
    "可進烤箱的平底鍋以中小火加熱。兩份三明治每面估計煎 3–4 分鐘，中途翻面一次，至兩側酥脆金黃；若麵包先變深色而中心尚未熱，請轉小火。煎烤時將烤箱預熱至 190°C。",
    "オーブン対応のフライパンを弱めの中火で温めます。サンド2個を片面3〜4分ずつ、途中で一度返し、両面がカリッときつね色になるまで焼きます。中心が温まる前にパンが濃く色づいたら火を弱めます。焼いている間にオーブンを190°Cに予熱します。",
    "오븐 사용 가능한 팬을 중약불로 달굽니다. 샌드위치 두 개를 한 면당 약 3–4분씩 한 번 뒤집어 양쪽 겉면이 바삭하고 황금색이 될 때까지 굽습니다. 속이 데워지기 전에 빵 색이 짙어지면 불을 낮춥니다. 굽는 동안 오븐을 190°C로 예열합니다.",
    "ตั้งกระทะที่เข้าเตาอบได้ด้วยไฟกลางอ่อน ย่างแซนด์วิชทั้งสองชิ้นด้านละประมาณ 3–4 นาที พลิกหนึ่งครั้งจนผิวทั้งสองด้านกรอบสีทอง หากขนมปังเข้มก่อนใจกลางร้อนให้ลดไฟ ระหว่างย่างให้อุ่นเตาอบที่ 190°C"
  ));
  body(recipe, 4, ml(
    "Spread the reserved half of the béchamel over the two tops, using it all. Divide the reserved 45 g Gruyère evenly over them (about 22.5 g each), keeping the cheese on the bread so it does not scorch in the skillet.",
    "將保留的一半白醬全部抹在兩份三明治上層；剩下 45 公克格呂耶爾起司平均分在上面，每份約 22.5 公克，盡量留在吐司上，避免在鍋中燒焦。",
    "残しておいたベシャメル半量を2個の上にすべて塗ります。グリュイエールの残り45gを均等に（各約22.5g）散らし、フライパンで焦げないようパンの上にのせます。",
    "남겨 둔 베샤멜 절반을 두 샌드위치 윗면에 모두 바릅니다. 남겨 둔 그뤼예르 45g을 고르게 나눠(각 약 22.5g) 올리고 팬에서 타지 않도록 빵 위에 얹습니다.",
    "ทาเบชาเมลครึ่งที่เก็บไว้ทั้งหมดบนด้านบนของแซนด์วิชทั้งสอง แบ่งกรูแยร์ที่เหลือ 45 กรัมโรยเท่า ๆ กัน ชิ้นละประมาณ 22.5 กรัม วางชีสบนขนมปังเพื่อไม่ให้ไหม้ในกระทะ"
  ));
  body(recipe, 5, ml(
    "Bake at 190°C for an estimated 8–10 minutes until the cheese melts. The ham is ready-to-eat cooked ham being reheated in the sandwich, so check the centre of each sandwich through its side with a clean thermometer; FoodSafety.gov's general reheating endpoint for precooked ham is 74°C (165°F), with a 60°C (140°F) exception noted for cooked ham packaged in USDA-inspected plants; this recipe uses the higher 74°C endpoint for the assembled sandwich. If either is below 74°C, bake 2 minutes more and check again. Melted cheese and a hot surface are quality cues, not the temperature check.",
    "以 190°C 烘烤估計 8–10 分鐘至起司融化。這裡是把即食熟火腿放入三明治復熱；用乾淨溫度計從側面測量每份中心，FoodSafety.gov 一般熟火腿復熱標準為 74°C（165°F），並註明 USDA 檢查工廠包裝熟火腿可用 60°C（140°F）；本食譜對組合好的三明治採較高的 74°C。若其中一份未達 74°C，每次續烤 2 分鐘後複測。起司融化、表面燙熱是品質指標，不能取代測溫。",
    "190°Cで目安として8〜10分、チーズが溶けるまで焼きます。加熱済みのハムをサンドの中で再加熱するため、清潔な温度計を横から差して各サンドの中心を測ります。FoodSafety.govの一般的な加熱済みハムの再加熱基準は74°C（165°F）で、USDA検査工場で包装された加熱済みハムには60°C（140°F）の例外があると記載されています。このレシピでは組み立てたサンドに高い方の74°Cを使います。どちらかが74°C未満なら2分ずつ追加して再測定します。チーズの溶け具合や表面の熱さは品質の目安で、温度確認の代わりにはなりません。",
    "190°C에서 약 8–10분 구워 치즈가 녹게 합니다. 바로 먹는 익힌 햄을 샌드위치 안에서 다시 데우는 것이므로 깨끗한 온도계를 옆으로 넣어 각 샌드위치의 중심을 잽니다. FoodSafety.gov의 일반 익힌 햄 재가열 기준은 74°C (165°F)이며 USDA 검사 공장에서 포장한 익힌 햄은 60°C (140°F) 예외가 있다고 안내합니다. 이 레시피는 조립한 샌드위치에 더 높은 74°C를 적용합니다. 하나라도 74°C보다 낮으면 2분 더 굽고 다시 확인합니다. 치즈가 녹거나 겉이 뜨거운 것은 품질 신호이지 온도 확인을 대신하지 않습니다.",
    "อบที่ 190°C ประมาณ 8–10 นาทีจนชีสละลาย เนื่องจากเป็นการอุ่นแฮมสุกพร้อมกินในแซนด์วิช ให้วัดตรงกลางของแซนด์วิชแต่ละชิ้นโดยสอดเทอร์โมมิเตอร์สะอาดจากด้านข้าง FoodSafety.gov กำหนดการอุ่นแฮมสุกทั่วไปที่ 74°C (165°F) และระบุข้อยกเว้น 60°C (140°F) สำหรับแฮมสุกที่บรรจุในโรงงานภายใต้การตรวจของ USDA สูตรนี้ใช้เกณฑ์ที่สูงกว่า 74°C สำหรับแซนด์วิชที่ประกอบแล้ว หากชิ้นใดยังต่ำกว่า 74°C ให้อบเพิ่มครั้งละ 2 นาทีแล้วตรวจซ้ำ ชีสละลายหรือผิวร้อนเป็นเกณฑ์คุณภาพ ไม่ใช่การตรวจอุณหภูมิ"
  ));
  body(recipe, 6, ml(
    "Switch to the 230°C top grill for an estimated 1–2 minutes, watching continuously until amber spots appear; this is a browning step, not the safety check. Rest 2 minutes, then serve one sandwich per diner (cut each in half if desired) while the bread is crisp.",
    "切換至 230°C 上火烤約 1–2 分鐘，全程看顧至表面出現琥珀色斑點；這是上色步驟，不是安全檢查。靜置 2 分鐘後每人供應一份，可依喜好對切，趁吐司酥脆上桌。",
    "上火グリルを230°Cにして目安として1〜2分、琥珀色の焼き色が付くまで目を離さず焼きます。これは焼き色を付ける工程で、安全確認ではありません。2分休ませ、1人1個ずつ（好みで半分に切って）パンがカリッとしているうちに出します。",
    "상부 그릴을 230°C로 바꿔 약 1–2분, 호박색 갈색 점이 생길 때까지 계속 지켜보며 굽습니다. 이는 색을 내는 단계이지 안전 확인이 아닙니다. 2분 쉬게 한 뒤 한 사람당 샌드위치 하나씩 내고, 원하면 반으로 잘라 바삭할 때 먹습니다.",
    "ปรับเตาย่างด้านบนเป็น 230°C ย่างประมาณ 1–2 นาทีโดยเฝ้าดูตลอดจนมีจุดสีอำพัน ขั้นนี้ทำให้ผิวมีสี ไม่ใช่การตรวจความปลอดภัย พัก 2 นาทีแล้วเสิร์ฟคนละหนึ่งชิ้น จะผ่าครึ่งตามชอบก็ได้ ขณะขนมปังยังกรอบ"
  ));
  recipe.storage = ml(
    "Refrigerate leftover sandwiches in shallow covered containers within 2 hours at or below 4°C/40°F. Use within 3 days for crispness; that is a site quality preference, while FoodSafety.gov lists refrigerated cooked leftovers for 3–4 days. Reheat only the portion needed in a 180°C oven for an estimated 10–15 minutes, checking the centre to 74°C/165°F; add 2-minute intervals if needed. The oven time is an estimate and the measured temperature is the safety endpoint.",
    "剩下的三明治放入淺而有蓋的容器，2 小時內冷藏至 4°C/40°F 以下。為保酥脆建議 3 天內食用是本食譜的品質偏好；FoodSafety.gov 將冷藏熟食剩菜列為 3–4 天。只取需要份量，以 180°C 烤箱估計回烤 10–15 分鐘並測中心達 74°C/165°F；不足時每次續烤 2 分鐘。烤箱時間是估算，測得溫度才是安全終點。",
    "残りは浅い蓋付き容器に入れ、2時間以内に4°C/40°F以下で冷蔵します。パンの歯ごたえのため3日以内を勧めるのは品質上の目安で、FoodSafety.govは調理済み残り物の冷蔵を3〜4日としています。食べる分だけ180°Cのオーブンで目安として10〜15分温め、中心が74°C/165°Fになるか測ります。足りなければ2分ずつ追加します。時間は目安で、測った温度が安全基準です。",
    "남은 샌드위치는 얕은 뚜껑 있는 용기에 담아 2시간 안에 4°C/40°F 이하로 냉장합니다. 바삭함을 위해 3일 이내 먹으라는 것은 이 레시피의 품질 기준이며, FoodSafety.gov는 익힌 남은 음식 냉장을 3–4일로 안내합니다. 먹을 양만 180°C 오븐에서 약 10–15분 데우고 중심이 74°C/165°F인지 잽니다. 부족하면 2분씩 더 데우세요. 오븐 시간은 추정치이며 측정 온도가 안전 기준입니다.",
    "เก็บแซนด์วิชที่เหลือในภาชนะตื้นมีฝาปิด แช่เย็นภายใน 2 ชั่วโมงที่ 4°C/40°F หรือต่ำกว่า การกินภายใน 3 วันเพื่อความกรอบเป็นเกณฑ์คุณภาพของสูตร ส่วน FoodSafety.gov ระบุอาหารปรุงสุกแช่เย็น 3–4 วัน อุ่นเฉพาะส่วนที่จะกินในเตาอบ 180°C ประมาณ 10–15 นาที วัดใจกลางให้ถึง 74°C/165°F หากยังไม่ถึงให้อุ่นต่อครั้งละ 2 นาที เวลาอบเป็นค่าประมาณ อุณหภูมิที่วัดได้คือเกณฑ์ความปลอดภัย"
  );
  addSafetySources(recipe);
}

function reviseCremaCatalana(recipe) {
  recipe.prepMinutes = 310;
  recipe.cookMinutes = 20;
  recipe.totalMinutes = 330;
  body(recipe, 0, ml(
    "Combine all 750 ml milk with the cinnamon stick and all three 5 cm lemon-peel and three 5 cm orange-peel strips. Heat over medium to 85–90°C until steaming but not boiling, then cover, remove from heat, and infuse for 30 minutes.",
    "將全部 750 毫升牛奶、肉桂棒、三條各 5 公分檸檬皮及三條各 5 公分柳橙皮放入厚底鍋。中火加熱至 85–90°C、冒蒸氣但不沸騰，蓋上鍋蓋離火浸泡 30 分鐘。",
    "牛乳750mlすべて、シナモンスティック、長さ5cmのレモン皮3本とオレンジ皮3本を厚手の鍋に入れます。中火で85〜90°C、湯気が出るが沸騰しない状態まで温め、蓋をして火から下ろし30分香りを移します。",
    "두꺼운 냄비에 우유 750ml 전량, 계피 스틱, 길이 5cm 레몬 껍질 세 조각과 오렌지 껍질 세 조각을 넣습니다. 중불로 85–90°C, 끓지 않고 김이 날 때까지 데운 뒤 뚜껑을 덮고 불에서 내려 30분 우립니다.",
    "ใส่นม 750 มล.ทั้งหมด อบเชยแท่ง เปลือกเลมอนยาว 5 ซม. 3 ชิ้น และเปลือกส้มยาว 5 ซม. 3 ชิ้นในหม้อก้นหนา อุ่นไฟกลางถึง 85–90°C ให้มีไอแต่ไม่เดือด ปิดฝา ยกลงจากเตา และแช่กลิ่น 30 นาที"
  ));
  body(recipe, 1, ml(
    "Whisk all six yolks with all 150 g custard sugar for 2–3 minutes until paler and slightly thick. Add all 35 g cornstarch and whisk until no dry pockets remain.",
    "將全部 6 顆蛋黃與卡士達用的全部 150 公克砂糖打 2–3 分鐘，至顏色變淡、略微濃稠。加入全部 35 公克玉米澱粉，攪打至沒有乾粉結塊。",
    "卵黄6個すべてとカスタード用砂糖150gすべてを2〜3分、色が薄くなり少しとろみが出るまで混ぜます。コーンスターチ35gすべてを加え、粉の塊がなくなるまで混ぜます。",
    "노른자 여섯 개 전량과 커스터드용 설탕 150g 전량을 2–3분, 색이 옅고 약간 걸쭉해질 때까지 휘젓습니다. 옥수수전분 35g 전량을 넣고 마른 덩어리가 없도록 섞습니다.",
    "ตีไข่แดงทั้ง 6 ฟองกับน้ำตาลสำหรับคัสตาร์ด 150 กรัมทั้งหมด 2–3 นาทีจนสีอ่อนและข้นขึ้นเล็กน้อย ใส่แป้งข้าวโพด 35 กรัมทั้งหมดแล้วตีจนไม่มีก้อนแห้ง"
  ));
  body(recipe, 2, ml(
    "Strain the infused milk and rewarm it to about 70°C. Whisk 200 ml of that warm milk gradually into the yolk mixture, then pour the tempered mixture back into the remaining milk. Cook over medium-low heat, whisking constantly, for an estimated 8–10 minutes until the custard reaches 82–84°C and leaves a clear line on a spoon; do not boil. The official egg-dish minimum is 71°C (160°F); 82–84°C is this recipe's thicker-custard quality range and exceeds that safety minimum.",
    "過濾香料牛奶並回溫至約 70°C。取其中 200 毫升熱牛奶分次拌入蛋黃糊，再把回溫後的蛋黃糊倒回其餘牛奶。中小火持續攪拌估計 8–10 分鐘，至卡士達達 82–84°C 且湯匙背面劃線可保持清晰；不可煮沸。官方蛋料理最低熟度為 71°C（160°F）；82–84°C 是本食譜較濃卡士達的品質範圍，並高於該安全標準。",
    "香りを移した牛乳をこし、約70°Cに温め直します。そのうち200mlを少しずつ卵黄生地に混ぜ、温度をなじませてから残りの牛乳へ戻します。弱めの中火で絶えず混ぜ、目安として8〜10分、82〜84°Cになりスプーンの背に引いた線が残るまで煮ます。沸騰させません。卵料理の公的な最低温度は71°C（160°F）です。82〜84°Cはこのレシピの濃いカスタードの品質範囲で、その安全最低温度を上回ります。",
    "향을 우린 우유를 거르고 약 70°C로 다시 데웁니다. 그중 200ml를 노른자 혼합물에 조금씩 저어 넣어 온도를 맞춘 뒤 나머지 우유에 다시 붓습니다. 중약불에서 계속 저으며 약 8–10분, 커스터드가 82–84°C에 도달하고 숟가락 뒷면에 그은 선이 또렷하게 남을 때까지 익힙니다. 끓이지 마세요. 달걀 요리의 공식 최소 온도는 71°C (160°F)입니다. 82–84°C는 이 레시피의 진한 커스터드 식감 기준이며 안전 최소 온도보다 높습니다.",
    "กรองนมที่แช่เครื่องเทศแล้วอุ่นกลับถึงประมาณ 70°C ค่อย ๆ คนผสมนมอุ่น 200 มล.ลงในไข่แดง แล้วเทส่วนที่ปรับอุณหภูมิแล้วกลับลงในนมที่เหลือ เคี่ยวไฟกลางอ่อนพร้อมคนตลอดประมาณ 8–10 นาทีจนคัสตาร์ดถึง 82–84°C และลากเส้นบนหลังช้อนได้ชัด ห้ามต้ม เกณฑ์ขั้นต่ำทางการสำหรับอาหารไข่คือ 71°C (160°F) ส่วน 82–84°C เป็นช่วงคุณภาพสำหรับคัสตาร์ดข้นของสูตรนี้และสูงกว่าเกณฑ์ความปลอดภัยขั้นต่ำ"
  ));
  body(recipe, 3, ml(
    "Divide the hot custard among six shallow 150 ml dishes and press food-safe wrap onto each surface. Let steam subside for about 30 minutes, but refrigerate within 2 hours of cooking (within 1 hour if the room is above 32°C) at 0–4°C. Chill for at least 4 hours until cold and firm. The 30-minute cooling and 4-hour setting waits are included in the 310-minute prep estimate.",
    "將熱卡士達分裝至六個淺的 150 毫升容器，保鮮膜貼住表面。放約 30 分鐘至蒸氣散去，但烹煮後 2 小時內須冷藏（室溫高於 32°C 時 1 小時內），冰箱維持 0–4°C。至少冷藏 4 小時至冰涼定型。估計備料時間 310 分鐘已計入約 30 分鐘冷卻與 4 小時定型等待。",
    "熱いカスタードを浅い150ml容器6個に分け、食品用ラップを表面に密着させます。湯気が収まるまで約30分置きますが、調理後2時間以内（室温が32°Cを超える場合は1時間以内）に0〜4°Cで冷蔵してください。少なくとも4時間、冷えて固まるまで冷やします。準備時間310分には約30分の冷却と4時間の冷却時間を含みます。",
    "뜨거운 커스터드를 얕은 150ml 용기 여섯 개에 나눠 담고 식품용 랩을 표면에 밀착시킵니다. 김이 잦아들도록 약 30분 두되 조리 후 2시간 안에, 실내가 32°C보다 더우면 1시간 안에 0–4°C로 냉장합니다. 최소 4시간 차갑고 단단해질 때까지 둡니다. 준비 시간 310분에는 약 30분 식힘과 4시간 굳히기가 포함됩니다.",
    "แบ่งคัสตาร์ดร้อนใส่ถ้วยตื้น 150 มล. 6 ใบ กดแรปสำหรับอาหารให้แนบผิว พักประมาณ 30 นาทีให้ไอน้ำลด แต่ต้องแช่เย็นที่ 0–4°C ภายใน 2 ชั่วโมงหลังปรุง หรือ 1 ชั่วโมงหากห้องร้อนกว่า 32°C แช่อย่างน้อย 4 ชั่วโมงจนเย็นและอยู่ตัว เวลาเตรียม 310 นาทีรวมเวลาพักเย็นประมาณ 30 นาทีและเวลาแช่ให้เซ็ต 4 ชั่วโมง"
  ));
  body(recipe, 4, ml(
    "Remove the wrap and blot condensation. Divide all 60 g caramelising sugar evenly among the six dishes, about 10 g each. Torch each surface for an estimated 30–60 seconds until amber and glassy; rest 1 minute and serve within 30 minutes for a crisp top. The 310-minute prep estimate includes the infusion, cooling, and minimum chill; the 20-minute cook estimate covers heating, custard cooking, and finishing.",
    "撕除保鮮膜並吸掉凝結水。將焦糖用全部 60 公克砂糖平均分給六碗，每碗約 10 公克。每碗用噴槍估計燒 30–60 秒至琥珀色透明脆殼；靜置 1 分鐘，為保脆請在 30 分鐘內食用。310 分鐘備料估時包括浸泡、冷卻和最低冷藏時間；20 分鐘烹調估時包括加熱、煮卡士達及最後燒糖。",
    "ラップを外して水滴を拭き取ります。カラメル用の砂糖60gすべてを6個に均等に分け、1個約10gずつ振ります。各表面を目安として30〜60秒、琥珀色でガラス状になるまで炙ります。1分休ませ、パリッとした表面のため30分以内に出します。準備時間310分には香り移し、冷却、最低冷蔵時間を含み、調理時間20分には加熱、カスタード作り、仕上げを含みます。",
    "랩을 벗기고 맺힌 물기를 닦습니다. 캐러멜용 설탕 60g 전량을 여섯 그릇에 똑같이 나눠 한 그릇당 약 10g씩 뿌립니다. 각 표면을 약 30–60초 토치로 구워 호박색 유리막을 만듭니다. 1분 쉬게 하고 바삭함을 위해 30분 안에 냅니다. 준비 시간 310분에는 향 내기, 식히기, 최소 냉장이 포함되고 조리 시간 20분에는 데우기, 커스터드 조리, 마무리가 포함됩니다.",
    "แกะแรปและซับหยดน้ำ แบ่งน้ำตาลสำหรับคาราเมล 60 กรัมทั้งหมดเท่า ๆ กันใน 6 ถ้วย ถ้วยละประมาณ 10 กรัม ใช้ไฟพ่นแต่ละหน้า 30–60 วินาทีโดยประมาณจนเป็นสีอำพันเงา พัก 1 นาทีและเสิร์ฟภายใน 30 นาทีเพื่อให้ผิวกรอบ เวลาเตรียม 310 นาทีรวมการแช่กลิ่น การทำให้เย็น และเวลาแช่ขั้นต่ำ ส่วนเวลาอบ/ปรุง 20 นาทีรวมการอุ่น การกวนคัสตาร์ด และการเผาหน้าขั้นสุดท้าย"
  ));
  recipe.storage = ml(
    "Keep uncaramelised custards covered at or below 4°C and refrigerate within 2 hours (within 1 hour above 32°C). Use within 2 days for the best custard texture; this is a site quality preference. FDA guidance allows cooked egg dishes 3–4 days refrigerated in shallow containers. Burn sugar just before serving; this dessert is served cold and is not normally reheated. If an egg-containing leftover is reheated, bring it throughout to 74°C/165°F.",
    "尚未燒糖的卡士達加蓋冷藏於 4°C 以下，烹煮後 2 小時內冷藏（室溫高於 32°C 時 1 小時內）。為保最佳口感建議 2 天內食用是本食譜的品質偏好；FDA 指引列出熟蛋料理可淺盒冷藏 3–4 天。上桌前才燒糖；此甜點冷食，通常不復熱。若復熱含蛋剩菜，須使全體達 74°C/165°F。",
    "砂糖を焦がす前のカスタードは覆って4°C以下で保管し、調理後2時間以内（室温が32°Cを超える場合は1時間以内）に冷蔵します。最良の食感のため2日以内を勧めるのは品質上の目安です。FDAは調理済み卵料理を浅い容器で冷蔵し3〜4日としています。砂糖は出す直前に焦がします。冷たいデザートなので通常は再加熱しませんが、卵入りの残り物を温める場合は全体を74°C/165°Fにします。",
    "설탕을 태우기 전 커스터드는 덮어 4°C 이하로 보관하고 조리 후 2시간 안에, 실내가 32°C보다 더우면 1시간 안에 냉장합니다. 최상의 식감을 위해 2일 안에 먹으라는 것은 이 레시피의 품질 기준입니다. FDA는 익힌 달걀 요리를 얕은 용기에 냉장해 3–4일 보관하도록 안내합니다. 설탕은 내기 직전에 태웁니다. 차가운 디저트라 보통 다시 데우지 않지만 달걀이 든 남은 음식을 데운다면 전체가 74°C/165°F가 되게 합니다.",
    "เก็บคัสตาร์ดที่ยังไม่เผาน้ำตาลปิดฝาที่ 4°C หรือต่ำกว่า แช่เย็นภายใน 2 ชั่วโมงหลังปรุง หรือ 1 ชั่วโมงหากห้องร้อนกว่า 32°C การกินภายใน 2 วันเพื่อเนื้อสัมผัสดีที่สุดเป็นเกณฑ์คุณภาพของสูตร FDA แนะนำอาหารไข่ที่ปรุงแล้วแช่เย็นในภาชนะตื้นได้ 3–4 วัน เผาน้ำตาลก่อนเสิร์ฟ ขนมนี้เสิร์ฟเย็นจึงปกติไม่อุ่น หากอุ่นอาหารเหลือที่มีไข่ ให้อุ่นทั่วถึง 74°C/165°F"
  );
  addSafetySources(recipe, { egg: true });
}

function reviseTteokbokki(recipe) {
  recipe.ingredients.push({
    amount: ml("up to 120 ml", "最多 120 毫升", "最大120ml", "최대 120ml", "ไม่เกิน 120 มล."),
    item: ml("hot water, for loosening the sauce only if needed", "熱水，僅在醬汁太稠時調整用", "必要な場合にたれをゆるめる熱湯", "필요할 때 소스를 풀기 위한 뜨거운 물", "น้ำร้อนสำหรับปรับซอสให้เหลวลงเมื่อจำเป็น")
  });
  body(recipe, 0, ml(
    "Separate all 500 g rice cakes. If they are refrigerated and hard, soak in cold water for 10 minutes and drain; skip soaking for fresh, flexible cakes. If frozen, thaw them as the package directs before starting, not on the counter. Cut the 200 g fish-cake sheets into 4 cm pieces and keep them chilled until they go into the pan.",
    "將全部 500 公克年糕分開。若冷藏後變硬，以冷水浸泡 10 分鐘再瀝乾；新鮮柔軟的年糕不用泡。冷凍年糕須依包裝指示解凍，不可放在檯面解凍。將 200 公克魚板切成 4 公分片，入鍋前保持冷藏。",
    "餅500gすべてをほぐします。冷蔵で硬くなった餅は冷水に10分浸して水を切ります。作りたてで柔らかい餅は浸しません。冷凍品は袋の表示どおりに解凍し、室温で解凍しないでください。練り物200gを4cm幅に切り、鍋に入れるまで冷蔵します。",
    "떡 500g 전량을 서로 떼어 둡니다. 냉장되어 딱딱하면 찬물에 10분 담갔다가 물기를 빼고, 갓 만들어 말랑하면 담그지 않습니다. 냉동 떡은 조리 전 포장 지침대로 해동하며 실온에서 해동하지 않습니다. 어묵 200g을 4cm 크기로 자르고 팬에 넣을 때까지 냉장합니다.",
    "แยกต็อก 500 กรัมทั้งหมด หากแช่เย็นจนแข็งให้แช่น้ำเย็น 10 นาทีแล้วสะเด็ด หากเป็นต็อกสดนุ่มให้ข้ามขั้นนี้ ถ้าแช่แข็งให้ละลายตามฉลากก่อนเริ่ม ห้ามละลายบนเคาน์เตอร์ ตัดแผ่นปลา 200 กรัมเป็นชิ้น 4 ซม.และเก็บเย็นจนใส่กระทะ"
  ));
  body(recipe, 1, ml(
    "Whisk all 80 g gochujang, 20 g gochugaru, 30 g sugar, and 15 ml soy sauce into all 750 ml unsalted anchovy-kelp stock until smooth. Set the optional listed hot water (up to 120 ml) beside the stove; use it only in 30 ml increments if the sauce thickens before the rice cakes soften.",
    "將全部 80 公克韓式辣椒醬、20 公克辣椒粉、30 公克砂糖及 15 毫升醬油，拌入全部 750 毫升無鹽昆布柴魚高湯，攪至滑順。爐旁另備列出的熱水（最多 120 毫升）；僅在年糕變軟前醬汁已過稠時，每次加 30 毫升。",
    "コチュジャン80g、粉唐辛子20g、砂糖30g、しょうゆ15mlすべてを、無塩のいりこ昆布だし750mlすべてに溶かして滑らかにします。必要なら使う熱湯（最大120ml）を脇に用意します。餅が柔らかくなる前にたれが濃くなった場合だけ、30mlずつ加えます。",
    "고추장 80g, 고춧가루 20g, 설탕 30g과 간장 15ml 전량을 멸치다시마 무염 육수 750ml 전량에 풀어 매끈하게 섞습니다. 선택 재료인 뜨거운 물(최대 120ml)을 곁에 둡니다. 떡이 부드러워지기 전에 소스가 너무 되직해질 때만 30ml씩 넣습니다.",
    "คนโคชูจัง 80 กรัม พริกป่น 20 กรัม น้ำตาล 30 กรัม และซีอิ๊ว 15 มล.ทั้งหมดเข้ากับน้ำซุปแอนโชวีคอมบุไม่เค็ม 750 มล.ทั้งหมดจนเนียน เตรียมน้ำร้อนตามรายการไว้ข้างเตา (ไม่เกิน 120 มล.) ใช้ครั้งละ 30 มล.เฉพาะเมื่อซอสข้นก่อนต็อกนุ่ม"
  ));
  body(recipe, 2, ml(
    "Pour the sauce into a wide 28 cm pan and bring it to a full boil over medium-high heat. Add all rice cakes and 120 g cabbage, return to a boil, then lower to medium and simmer uncovered for an estimated 8 minutes, stirring from the bottom every minute so the paste does not scorch.",
    "將醬汁倒入 28 公分寬鍋，中大火煮至大滾。加入全部年糕與 120 公克高麗菜，再次煮滾後轉中火不加蓋燉煮估計 8 分鐘，每分鐘從鍋底攪拌，避免辣醬燒焦。",
    "たれを直径28cmの広い鍋に入れ、中強火でしっかり沸騰させます。餅すべてとキャベツ120gを加え、再沸騰したら中火に落とし、目安として8分、蓋をせず煮ます。たれが焦げないよう1分ごとに底から混ぜます。",
    "소스를 지름 28cm 넓은 팬에 붓고 중강불에서 팔팔 끓입니다. 떡 전량과 양배추 120g을 넣고 다시 끓으면 중불로 낮춰 약 8분 뚜껑 없이 끓입니다. 고추장이 눋지 않도록 매분 바닥부터 저어 줍니다.",
    "เทซอสลงกระทะกว้าง 28 ซม. ต้มไฟกลางค่อนแรงจนเดือดจัด ใส่ต็อกทั้งหมดกับกะหล่ำ 120 กรัม พอเดือดอีกครั้งลดเป็นไฟกลาง เคี่ยวเปิดฝาประมาณ 8 นาที คนจากก้นกระทะทุกนาทีไม่ให้ซอสไหม้"
  ));
  body(recipe, 3, ml(
    "Add all 200 g chilled fish cake and 60 g of the 80 g scallions. Simmer for an estimated 5 minutes, folding gently so the rice cakes stay intact. If the fish-cake package requires cooking or the pieces were frozen, follow its directions; five minutes is only a starting estimate for these cut pieces, not a universal safety endpoint. Keep the final 20 g scallions for serving.",
    "加入全部 200 公克冷藏魚板及 80 公克青蔥中的 60 公克。估計燉煮 5 分鐘並輕柔翻拌，避免年糕破裂。若魚板包裝要求充分烹煮或魚板原為冷凍品，依包裝指示操作；5 分鐘只是這種切片大小的起始估時，不是通用安全標準。最後 20 公克青蔥留待上桌。",
    "冷蔵しておいた練り物200gすべてと、ねぎ80gのうち60gを加えます。餅を崩さないようやさしく返しながら、目安として5分煮ます。練り物の袋に加熱指示がある場合や冷凍品を使った場合は表示に従います。5分はこの大きさの切り身の開始目安で、共通の安全温度ではありません。残り20gのねぎは仕上げ用に取っておきます。",
    "냉장해 둔 어묵 200g 전량과 대파 80g 중 60g을 넣습니다. 떡이 부서지지 않게 부드럽게 접어가며 약 5분 끓입니다. 어묵 포장에 조리 지침이 있거나 냉동 제품을 쓴 경우 포장 지침을 따릅니다. 5분은 이 크기 조각의 시작 추정치일 뿐 보편적인 안전 온도 기준이 아닙니다. 남은 대파 20g은 마무리용으로 둡니다.",
    "ใส่แผ่นปลาที่แช่เย็น 200 กรัมทั้งหมดกับต้นหอม 60 กรัมจากทั้งหมด 80 กรัม เคี่ยวประมาณ 5 นาที พลิกเบา ๆ ให้ต็อกไม่แตก หากฉลากแผ่นปลากำหนดให้ปรุงหรือใช้ผลิตภัณฑ์แช่แข็ง ให้ทำตามฉลาก เวลา 5 นาทีเป็นเพียงค่าเริ่มต้นสำหรับชิ้นขนาดนี้ ไม่ใช่เกณฑ์ความปลอดภัยสากล เก็บต้นหอมที่เหลือ 20 กรัมไว้โรย"
  ));
  body(recipe, 4, ml(
    "Continue for an estimated 2–4 minutes, checking the largest rice cake: it should be soft through and spring back when pressed, while the sauce leaves a path for about 2 seconds when a spatula crosses the pan. These are texture cues. If the sauce tightens first, add the listed hot water 30 ml at a time, up to 120 ml total; stop when the rice cakes are tender, not mushy.",
    "再煮估計 2–4 分鐘，檢查最大塊年糕：內部應柔軟，按壓後仍回彈；鍋鏟劃過鍋底時醬汁約 2 秒才合攏。這些是口感指標。若醬汁先變稠，每次加入已列出的熱水 30 毫升，最多 120 毫升；年糕熟軟但不糊即停止。",
    "目安としてさらに2〜4分煮て、最も大きな餅を確認します。中まで柔らかく、押すと弾力が戻り、へらで鍋底を引いた跡が約2秒残る状態にします。これは食感の目安です。先にたれが固くなったら、表示した熱湯を30mlずつ、合計最大120ml加え、餅が柔らかく煮えたら止めます。",
    "약 2–4분 더 끓이며 가장 큰 떡을 확인합니다. 속까지 부드럽고 눌렀을 때 다시 튀어 오르며, 주걱으로 팬을 그었을 때 자국이 약 2초 남아야 합니다. 이는 식감 기준입니다. 소스가 먼저 되직해지면 표시한 뜨거운 물을 30ml씩, 총 최대 120ml 넣고 떡이 부드럽되 흐물거리지 않을 때 멈춥니다.",
    "เคี่ยวต่อประมาณ 2–4 นาที ตรวจต็อกชิ้นใหญ่สุดให้ข้างในนุ่มและเด้งกลับเมื่อกด ซอสควรทิ้งรอยทางไว้ราว 2 วินาทีเมื่อปาดพาย นี่เป็นเกณฑ์เนื้อสัมผัส หากซอสข้นก่อนให้เติมน้ำร้อนตามรายการครั้งละ 30 มล. รวมไม่เกิน 120 มล. หยุดเมื่อต็อกนุ่มแต่ไม่เละ"
  ));
  body(recipe, 5, ml(
    "Turn off the heat. Fold in the remaining 20 g scallions and all 8 g sesame seeds. Rest for 2 minutes, then divide into four bowls: each gets about 125 g rice cakes, 50 g fish cake, 30 g cabbage, 20 g scallions total, and 2 g sesame. Serve with enough sauce to coat; the rice cakes firm as they stand.",
    "關火，拌入剩餘 20 公克青蔥及全部 8 公克芝麻。靜置 2 分鐘後分成四碗：每碗約 125 公克年糕、50 公克魚板、30 公克高麗菜、合計 20 公克青蔥和 2 公克芝麻。舀入足量醬汁裹住配料；年糕放久會變硬。",
    "火を止め、残りのねぎ20gとごま8gすべてを混ぜます。2分休ませてから4皿に分けます。1皿あたり餅約125g、練り物50g、キャベツ30g、ねぎ合計20g、ごま2gです。たれを絡めて出します。餅は置くと固くなります。",
    "불을 끄고 남은 대파 20g과 참깨 8g 전량을 섞습니다. 2분 두었다가 네 그릇에 나눕니다. 한 그릇당 떡 약 125g, 어묵 50g, 양배추 30g, 대파 총 20g, 참깨 2g씩입니다. 소스가 재료를 감싸도록 담아 바로 냅니다. 떡은 두면 단단해집니다.",
    "ปิดไฟ คลุกต้นหอมที่เหลือ 20 กรัมและงา 8 กรัมทั้งหมด พัก 2 นาทีแล้วแบ่ง 4 ชาม แต่ละชามได้ต็อกประมาณ 125 กรัม แผ่นปลา 50 กรัม กะหล่ำ 30 กรัม ต้นหอมรวม 20 กรัม และงา 2 กรัม ตักซอสให้เคลือบทั่ว เสิร์ฟทันทีเพราะต็อกจะแข็งเมื่อวางไว้"
  ));
  recipe.storage = ml(
    "Cool leftovers in shallow containers and refrigerate within 2 hours (within 1 hour above 32°C) at or below 4°C. The 2-day limit is this recipe's texture preference, not an official storage maximum. Reheat only the portion needed, stirring with a little water until the coldest part reaches 74°C/165°F; in a microwave, stir midway and let it stand briefly before checking. The rice cakes soften and then firm again as they cool.",
    "剩菜分裝淺容器，2 小時內冷藏至 4°C 以下（環境高於 32°C 時 1 小時內）。建議 2 天內食用是本食譜的口感偏好，不是官方保存期限。只取需要份量，加入少量水攪拌回熱至最冷處達 74°C/165°F；用微波爐時中途攪拌並短暫靜置後再測溫。年糕加熱後會變軟，冷卻後又會變硬。",
    "残りは浅い容器に分け、室温が32°Cを超える場合は1時間以内、それ以外は2時間以内に4°C以下で冷蔵します。2日以内というのは本レシピの食感上の好みで、公的な保存上限ではありません。食べる分だけ少量の水と混ぜ、最も冷たい部分が74°C/165°Fになるまで温めます。電子レンジでは途中で混ぜ、少し置いてから温度を確認します。餅は温めると柔らかくなり、冷めると再び固くなります。",
    "남은 음식은 얕은 용기에 나눠 실내가 32°C보다 더우면 1시간 안에, 그 외에는 2시간 안에 4°C 이하로 냉장합니다. 2일 이내 섭취는 이 레시피의 식감 선호이지 공식 보관 최대 기간이 아닙니다. 먹을 양만 조금의 물과 저어 가장 차가운 부분이 74°C/165°F가 될 때까지 데웁니다. 전자레인지는 중간에 저은 뒤 잠시 두고 온도를 확인하세요. 떡은 데우면 부드러워졌다가 식으면 다시 단단해집니다.",
    "แบ่งอาหารเหลือใส่ภาชนะตื้น แช่เย็นที่ 4°C หรือต่ำกว่าภายใน 2 ชั่วโมง หรือ 1 ชั่วโมงหากอากาศร้อนกว่า 32°C กำหนด 2 วันเป็นความชอบด้านเนื้อสัมผัสของสูตร ไม่ใช่วันหมดอายุทางการ อุ่นเฉพาะส่วนที่จะกิน คนกับน้ำเล็กน้อยจนส่วนที่เย็นที่สุดถึง 74°C/165°F หากใช้ไมโครเวฟให้คนครึ่งทางและพักสักครู่ก่อนวัด ต็อกจะนิ่มเมื่ออุ่นและแข็งอีกครั้งเมื่อเย็น"
  );
  addSafetySources(recipe);
}

export function refineSixtyEighthMethods(recipes) {
  const targets = ["zaru-soba", "croque-monsieur", "crema-catalana", "tteokbokki"];
  const revise = {
    "zaru-soba": reviseZaruSoba,
    "croque-monsieur": reviseCroqueMonsieur,
    "crema-catalana": reviseCremaCatalana,
    tteokbokki: reviseTteokbokki
  };
  for (const id of targets) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) throw new Error("Recipe method audit 68: missing recipe " + id);
    const revised = clone(recipes[index]);
    revise[id](revised);
    recipes[index] = revised;
  }
  return recipes;
}
