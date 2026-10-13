const temperatures = "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures";
const handling = "https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety";
const coldStorage = "https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts";
const eggSafety = "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety";

const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

function body(recipe, index, localized) {
  recipe.instructions[index] = { ...recipe.instructions[index], body: localized };
}

function addOfficialSource(recipe, label, url, publisher = "FoodSafety.gov") {
  const title = `Official food-safety guidance — ${publisher}: ${label}`;
  const existing = recipe.sources.find((source) => source.url === url);
  if (existing) existing.title = title;
  else recipe.sources.push({ title, url });
}

function addSource(recipe, title, url) {
  if (!recipe.sources.some((source) => source.url === url)) recipe.sources.push({ title, url });
}

function reviseTartaDeSantiago(recipe) {
  body(recipe, 3, ml(
    "Pour the batter into the prepared pan and level it. Bake at 175°C for an estimated 30–35 minutes until the top is evenly golden and the centre springs back lightly. Insert a clean instant-read thermometer into the centre of the cake; because this almond cake contains five eggs, it must reach at least 71°C/160°F. A skewer should carry a few moist almond crumbs but no wet batter. If the top is already golden while the centre is below 71°C or still wet, tent loosely with foil and bake 3 minutes more, then check again. Cool in the pan for 20 minutes.",
    "將麵糊倒入備好的烤模並抹平表面。以 175°C 烘烤約 30–35 分鐘，直到表面均勻金黃、中心輕按會回彈。用乾淨即讀式溫度計插入蛋糕中心；這款杏仁蛋糕含 5 顆蛋，中心須至少達 71°C/160°F。竹籤應帶出少量濕潤杏仁屑，但不能沾有濕麵糊。若表面已金黃而中心低於 71°C 或仍濕，鬆鬆蓋上鋁箔，再烤 3 分鐘後重測。先在烤模中冷卻 20 分鐘。",
    "生地を型に流して表面をならします。175°Cで目安30〜35分、表面が均一なきつね色になり、中心を軽く押すと戻るまで焼きます。清潔な瞬間読み取り式温度計をケーキの中心に差し込みます。卵を5個使うため、中心は少なくとも71°C/160°Fに達させます。竹串にはしっとりしたアーモンドの粒が少し付いてもよいですが、生の生地は付かない状態にします。表面だけ先に色づき、中心が71°C未満またはまだ濡れていたら、ふんわりアルミホイルをかぶせて3分追加し、再確認します。型に入れたまま20分冷まします。",
    "반죽을 준비한 틀에 붓고 표면을 고릅니다. 175°C에서 약 30–35분 구워 윗면이 고르게 노릇하고 가운데를 가볍게 눌렀을 때 되돌아오게 합니다. 깨끗한 순간 판독 온도계를 케이크 가운데에 꽂습니다. 달걀 5개가 들어가므로 중심 온도가 최소 71°C/160°F에 도달해야 합니다. 꼬치에는 촉촉한 아몬드 부스러기가 조금 묻을 수 있지만 젖은 반죽은 묻지 않아야 합니다. 윗면만 먼저 갈색이 되고 가운데가 71°C보다 낮거나 젖어 있으면 호일을 느슨하게 덮고 3분 더 구운 뒤 다시 확인합니다. 틀에서 20분 식힙니다.",
    "เทแป้งลงพิมพ์ที่เตรียมไว้แล้วเกลี่ยหน้า อบที่ 175°C ประมาณ 30–35 นาทีจนหน้าเป็นสีทองทั่วและตรงกลางเด้งกลับเล็กน้อยเมื่อกดเบา ๆ ใช้เทอร์โมมิเตอร์อ่านเร็วที่สะอาดวัดตรงกลางเค้ก เนื่องจากมีไข่ 5 ฟอง อุณหภูมิตรงกลางต้องถึงอย่างน้อย 71°C/160°F ไม้เสียบควรมีเศษอัลมอนด์ชื้นเล็กน้อยติดได้แต่ต้องไม่มีแป้งเปียก หากหน้าเป็นสีน้ำตาลแล้วแต่ตรงกลางยังต่ำกว่า 71°C หรือยังเปียก ให้คลุมฟอยล์หลวม ๆ อบต่อ 3 นาทีแล้วตรวจอีกครั้ง พักในพิมพ์ 20 นาที"
  ));
  recipe.storage = ml(
    "Cover and refrigerate the fully cooled cake at 4°C/40°F or below within 2 hours of baking, or within 1 hour if the room is above 32°C/90°F. Use within 3–4 days; this follows FDA guidance for cooked egg dishes. For the best almond aroma and tender crumb, serve individual slices at room temperature and return the rest to the refrigerator within the same time limit.",
    "蛋糕完全冷卻後加蓋冷藏於 4°C/40°F 以下，烘烤後 2 小時內放入冰箱；室溫高於 32°C/90°F 時則須在 1 小時內冷藏。3–4 天內食用，這依 FDA 熟蛋料理指引。為保留杏仁香氣與柔軟口感，可將單片回溫後食用，其餘蛋糕仍須依相同時限放回冰箱。",
    "ケーキが完全に冷めたら覆い、焼成後2時間以内、室温が32°Cを超える場合は1時間以内に4°C/40°F以下で冷蔵します。FDAの加熱済み卵料理の案内に従い、3〜4日以内に食べます。アーモンドの香りと柔らかな食感を楽しむには、食べる分だけ室温に戻し、残りは同じ時間制限内に冷蔵庫へ戻します。",
    "케이크가 완전히 식으면 덮어서 굽고 2시간 안에, 실내가 32°C/90°F보다 더우면 1시간 안에 4°C/40°F 이하로 냉장합니다. FDA의 조리된 달걀 음식 지침에 따라 3–4일 안에 먹습니다. 아몬드 향과 부드러운 식감을 위해 먹을 조각만 실온에 두고 나머지는 같은 시간 제한 안에 냉장고로 되돌립니다.",
    "เมื่อเค้กเย็นสนิทแล้วให้ปิดฝาและแช่เย็นที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมงหลังอบ หรือภายใน 1 ชั่วโมงหากอุณหภูมิห้องสูงกว่า 32°C/90°F กินภายใน 3–4 วันตามคำแนะนำของ FDA สำหรับอาหารที่มีไข่ปรุงสุก เพื่อให้ได้กลิ่นอัลมอนด์และเนื้อเค้กนุ่ม ให้นำออกมาเฉพาะชิ้นที่จะกิน และนำส่วนที่เหลือกลับเข้าตู้เย็นภายในเวลาที่กำหนด"
  );
  addOfficialSource(recipe, "Safe Minimum Internal Temperatures", temperatures);
  addOfficialSource(recipe, "What You Need to Know About Egg Safety", eggSafety, "FDA");
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
}

function reviseCannoli(recipe) {
  recipe.sources = recipe.sources.map((source) => source.url === "https://ricette.giallozafferano.it/Cannoli-siciliani.html"
    ? { ...source, title: "GialloZafferano — Sicilian Cannoli", url: "https://www.giallozafferano.com/recipes/sicilian-cannoli.html" }
    : source);
  body(recipe, 3, ml(
    "Heat the oil to 175°C and fry only 3–4 wrapped tubes at a time so the oil temperature recovers. Keep it between 170–175°C; fry 2–3 minutes until the shells are deep golden and blistered. If they darken in under 2 minutes, lower the heat and wait for the oil to return to range before the next batch. If they are still pale at 3 minutes, continue in 20–30 second increments. Drain on a rack; after 2 minutes, slide the metal tubes out carefully and cool the shells completely.",
    "將油加熱至 175°C，每次只炸 3–4 個捲在模具上的麵皮，讓油溫有時間回升。油溫維持在 170–175°C，炸 2–3 分鐘至外殼深金黃並起泡。若不到 2 分鐘就變深色，先降低火力，等油溫回到範圍再炸下一批。若 3 分鐘後仍偏白，每次續炸 20–30 秒。放網架瀝油；2 分鐘後小心抽出金屬模具，讓外殼完全冷卻。",
    "油を175°Cに熱し、油温が戻るよう金属型に巻いた生地は一度に3〜4本だけ揚げます。油温を170〜175°Cに保ち、2〜3分、濃いきつね色で気泡が出るまで揚げます。2分未満で色が濃くなったら火を弱め、次の分を入れる前に油温が範囲へ戻るのを待ちます。3分後も白っぽければ20〜30秒ずつ追加します。網に上げ、2分後に金属型を慎重に抜き、殻を完全に冷まします。",
    "기름을 175°C로 달구고 온도가 회복되도록 금속 틀에 감싼 반죽은 한 번에 3–4개만 튀깁니다. 기름을 170–175°C로 유지하며 2–3분 튀겨 껍질이 짙은 황금색이고 기포가 생기게 합니다. 2분도 되기 전에 색이 진해지면 불을 낮추고 다음 배치 전에 기름이 범위로 돌아올 때까지 기다립니다. 3분 뒤에도 색이 옅으면 20–30초씩 더 튀깁니다. 망에서 기름을 빼고 2분 뒤 금속 틀을 조심히 빼낸 다음 껍질을 완전히 식힙니다.",
    "ตั้งน้ำมันให้ถึง 175°C และทอดแป้งที่พันแกนโลหะครั้งละเพียง 3–4 ชิ้นเพื่อให้อุณหภูมิน้ำมันกลับมา รักษาไว้ที่ 170–175°C ทอด 2–3 นาทีจนเปลือกเป็นสีทองเข้มและมีฟอง หากสีเข้มก่อนครบ 2 นาที ให้ลดไฟและรอให้น้ำมันกลับเข้าอุณหภูมิก่อนทอดรอบถัดไป หากครบ 3 นาทีแล้วยังซีด ให้ทอดต่อครั้งละ 20–30 วินาที พักบนตะแกรง หลัง 2 นาทีค่อย ๆ เลื่อนแกนโลหะออกและพักเปลือกให้เย็นสนิท"
  ));
  body(recipe, 4, ml(
    "Press the drained ricotta through a fine sieve, then fold in the 180 g icing sugar, 80 g chocolate, and 20 g candied orange. Cover and chill the filling at 4°C/40°F or below for 30 minutes. It should hold a soft ridge on a spoon. If it still slumps or releases liquid, return it to the lined sieve and chill for another 30 minutes; do not add extra sugar, which can make the filling looser.",
    "將瀝乾的瑞可塔乳酪過細篩，再拌入 180 公克糖粉、80 公克巧克力及 20 公克糖漬橙皮。加蓋冷藏於 4°C/40°F 以下 30 分鐘，餡料應能在湯匙上留下柔軟紋路。若仍流動或滲水，放回鋪布的細篩再冷藏 30 分鐘；不要加更多糖，否則餡料可能更稀。",
    "水切りしたリコッタを細かい裏ごし器に通し、粉糖180g、チョコレート80g、オレンジピール20gを混ぜます。蓋をして4°C/40°F以下で30分冷やします。スプーンに柔らかな筋が残る固さが目安です。まだ流れたり水分が出たりする場合は、布を敷いた裏ごし器に戻してさらに30分冷やします。砂糖を足すと緩くなることがあるため加えません。",
    "물기를 뺀 리코타를 고운 체에 내린 뒤 슈가파우더 180g, 초콜릿 80g, 설탕절임 오렌지 20g을 섞습니다. 덮어서 4°C/40°F 이하에서 30분 냉장합니다. 숟가락에 부드러운 자국이 남는 농도가 좋습니다. 여전히 흐르거나 물이 배어나오면 천을 댄 체에 다시 담아 30분 더 냉장합니다. 설탕을 더 넣으면 묽어질 수 있으므로 추가하지 않습니다.",
    "กดริคอตตาที่สะเด็ดน้ำแล้วผ่านตะแกรงละเอียด จากนั้นคลุกน้ำตาลไอซิง 180 กรัม ช็อกโกแลต 80 กรัม และส้มเชื่อม 20 กรัม ปิดฝาและแช่เย็นที่ 4°C/40°F หรือต่ำกว่า 30 นาที ไส้ควรทิ้งรอยนุ่ม ๆ บนช้อน หากยังไหลหรือมีน้ำออกมา ให้นำกลับใส่ตะแกรงที่รองผ้าและแช่อีก 30 นาที อย่าเติมน้ำตาลเพิ่มเพราะอาจทำให้ไส้เหลวกว่าเดิม"
  ));
  body(recipe, 5, ml(
    "Transfer the cold filling to a piping bag. Fill each fully cooled shell from both ends only 10–15 minutes before serving so it stays crisp. Keep filled cannoli refrigerated at 4°C/40°F or below until serving; discard any that have been out for more than 2 hours, or 1 hour above 32°C/90°F.",
    "將冷餡裝入擠花袋。只在上桌前 10–15 分鐘，從外殼兩端填滿已完全冷卻的麵皮，才能保持酥脆。上桌前將填餡 cannoli 冷藏於 4°C/40°F 以下；在室溫放超過 2 小時，或高於 32°C/90°F 時超過 1 小時，便應丟棄。",
    "冷えたフィリングを絞り袋に入れます。殻のサクサク感を保つため、完全に冷めた殻の両端から、提供の10〜15分前に詰めます。提供までは4°C/40°F以下で冷蔵し、室温で2時間、32°Cを超える場合は1時間を超えて置いたものは廃棄します。",
    "차가운 필링을 짤주머니에 담습니다. 바삭함을 유지하려면 완전히 식은 껍질 양쪽에서 먹기 10–15분 전에 채웁니다. 내기 전까지 속을 채운 카놀리를 4°C/40°F 이하로 냉장하고, 실온에 2시간 넘게 또는 32°C/90°F보다 높은 곳에 1시간 넘게 둔 것은 버립니다.",
    "ใส่ไส้เย็นลงในถุงบีบ บีบใส่เปลือกที่เย็นสนิทจากทั้งสองด้านก่อนเสิร์ฟเพียง 10–15 นาทีเพื่อคงความกรอบ แช่คาโนลีที่ใส่ไส้แล้วไว้ที่ 4°C/40°F หรือต่ำกว่าจนกว่าจะเสิร์ฟ ทิ้งหากวางที่อุณหภูมิห้องเกิน 2 ชั่วโมง หรือเกิน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C/90°F"
  ));
  recipe.storage = ml(
    "Store unfilled shells airtight at room temperature for up to 2 days. Keep ricotta filling covered at 4°C/40°F or below and use within 2 days for best texture; that is a quality recommendation. Fill shortly before serving and keep assembled cannoli refrigerated until then. Discard filled pastries left out for more than 2 hours, or 1 hour above 32°C/90°F.",
    "未填餡外殼可密封常溫保存 2 天。瑞可塔餡料須加蓋冷藏於 4°C/40°F 以下，為保持最佳口感建議 2 天內使用；這是品質建議。上桌前才填餡，並將已填餡 cannoli 冷藏至上桌。填餡後在室溫放超過 2 小時，或高於 32°C/90°F 時超過 1 小時，應丟棄。",
    "未充填の殻は密閉して室温で2日まで保存できます。リコッタフィリングは蓋をして4°C/40°F以下で冷蔵し、食感を保つため2日以内に使います。これは品質上の目安です。詰めるのは提供直前にし、詰めた後も提供までは冷蔵します。室温で2時間、32°Cを超える場合は1時間を超えて置いたものは廃棄します。",
    "속을 채우지 않은 껍질은 밀폐해 실온에서 최대 2일 보관합니다. 리코타 필링은 덮어서 4°C/40°F 이하로 냉장하고 가장 좋은 식감을 위해 2일 안에 씁니다. 이는 품질 권장사항입니다. 먹기 직전에 채우고 채운 카놀리는 내기 전까지 냉장합니다. 실온에 2시간 넘게 또는 32°C/90°F보다 높은 곳에 1시간 넘게 둔 것은 버립니다.",
    "เก็บเปลือกที่ยังไม่ใส่ไส้ในภาชนะปิดสนิทที่อุณหภูมิห้องได้ไม่เกิน 2 วัน เก็บไส้ริคอตตาปิดฝาที่ 4°C/40°F หรือต่ำกว่าและใช้ภายใน 2 วันเพื่อเนื้อสัมผัสที่ดีที่สุด ซึ่งเป็นคำแนะนำด้านคุณภาพ ใส่ไส้ก่อนเสิร์ฟไม่นานและแช่คาโนลีที่ใส่ไส้แล้วจนกว่าจะเสิร์ฟ ทิ้งขนมที่วางนอกตู้เย็นเกิน 2 ชั่วโมง หรือเกิน 1 ชั่วโมงเมื่ออุณหภูมิสูงกว่า 32°C/90°F"
  );
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "What You Need to Know About Egg Safety", eggSafety, "FDA");
}

function revisePeanutShavedIce(recipe) {
  body(recipe, 1, ml(
    "Cover the soaked peanuts with 1.2 L fresh water, bring to a boil, then simmer covered for an estimated 55–75 minutes. Test three of the largest peanuts: each should crush smoothly with no firm or chalky centre. If any remain firm, simmer 10 minutes more and add boiling water 100 ml at a time if needed to keep them submerged.",
    "將泡好的花生加入 1.2 公升清水，煮沸後加蓋轉小火燉煮約 55–75 分鐘。挑三顆最大的花生測試，每顆都應能順暢壓碎，沒有堅硬或粉質中心。若仍有硬心，再燉 10 分鐘；若未淹過花生，每次補入 100 毫升沸水。",
    "水に浸したピーナッツに新しい水1.2Lを加え、沸騰したら蓋をして弱火で目安55〜75分煮ます。大きいものを3粒試し、硬い芯や粉っぽさがなく、滑らかにつぶれることを確認します。硬い粒があればさらに10分煮ます。水面から出そうなら、熱湯を100mlずつ加えて浸した状態を保ちます。",
    "불린 땅콩에 새 물 1.2L를 붓고 끓인 뒤 뚜껑을 덮어 약불에서 약 55–75분 끓입니다. 가장 큰 땅콩 3개를 확인해 단단하거나 분가루 같은 심 없이 부드럽게 으깨져야 합니다. 단단한 것이 남으면 10분 더 끓이고, 잠기지 않을 때는 끓는 물을 100ml씩 보충합니다.",
    "เติมน้ำใหม่ 1.2 ลิตรให้ทั่วถั่วลิสงที่แช่ไว้ ต้มจนเดือดแล้วปิดฝาเคี่ยวไฟอ่อนประมาณ 55–75 นาที ทดสอบถั่วเมล็ดใหญ่ 3 เมล็ด แต่ละเมล็ดควรบี้ได้เนียนโดยไม่มีไตแข็งหรือเป็นผง หากยังแข็งให้เคี่ยวต่อ 10 นาที และเติมน้ำเดือดครั้งละ 100 มล. หากน้ำไม่ท่วมถั่ว"
  ));
  body(recipe, 2, ml(
    "Add the 80 g sugar only after the peanuts are tender and simmer uncovered for 12 minutes. Spoon the peanuts and their liquid into clean shallow containers no deeper than about 5 cm; refrigerate at 4°C/40°F or below within 2 hours, or within 1 hour above 32°C/90°F. Chill for at least 1 hour before serving. Do not wait for the whole pot to reach room temperature.",
    "花生完全軟嫩後才加入 80 公克糖，開蓋再煮 12 分鐘。將花生和糖水舀入乾淨淺容器，深度約不超過 5 公分；2 小時內（室溫高於 32°C/90°F 時 1 小時內）放入 4°C/40°F 以下冰箱冷藏。至少冰鎮 1 小時再上桌，不要等整鍋完全降至室溫才冷藏。",
    "ピーナッツが柔らかくなってから砂糖80gを加え、蓋を外して12分煮ます。ピーナッツと煮汁を清潔な深さ約5cm以下の浅い容器に分け、2時間以内（32°Cを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。提供前に少なくとも1時間冷やします。鍋全体が室温になるまで待たないでください。",
    "땅콩이 부드러워진 뒤에만 설탕 80g을 넣고 뚜껑을 열어 12분 끓입니다. 땅콩과 시럽을 깨끗한 얕은 용기에 깊이 약 5cm 이하로 나눠 담고, 2시간 안에(실내가 32°C/90°F보다 더우면 1시간 안에) 4°C/40°F 이하로 냉장합니다. 내기 전 최소 1시간 차게 식힙니다. 냄비 전체가 실온이 될 때까지 기다리지 않습니다.",
    "ใส่น้ำตาล 80 กรัมหลังถั่วนุ่มแล้วเท่านั้น เคี่ยวเปิดฝา 12 นาที ตักถั่วและน้ำเชื่อมใส่ภาชนะตื้นสะอาดให้ลึกไม่เกินประมาณ 5 ซม. แล้วแช่ที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F แช่เย็นอย่างน้อย 1 ชั่วโมงก่อนเสิร์ฟ อย่ารอให้ทั้งหม้อเย็นถึงอุณหภูมิห้อง"
  ));
  recipe.storage = ml(
    "Keep the cooked peanuts covered in their liquid at 4°C/40°F or below; refrigerate them within 2 hours, or within 1 hour above 32°C/90°F. Use within 3 days for the best creamy texture; that is a recipe quality preference. Keep the syrup covered and refrigerated separately. Shave and assemble the ice to order; never refreeze melted shaved ice.",
    "熟花生連同糖水加蓋冷藏於 4°C/40°F 以下；須在 2 小時內，或室溫高於 32°C/90°F 時 1 小時內冷藏。為保持最佳綿軟口感，建議 3 天內食用；這是食譜的品質偏好。糖漿另行加蓋冷藏。冰品現刨現組，不可重新冷凍已融化的刨冰。",
    "煮たピーナッツは煮汁と一緒に覆って4°C/40°F以下で冷蔵します。2時間以内、32°Cを超える場合は1時間以内に冷蔵してください。柔らかな食感を保つため3日以内に使うのは品質上の目安です。シロップは別に覆って冷蔵します。氷は提供ごとに削って組み立て、溶けたかき氷を再冷凍しません。",
    "익힌 땅콩은 시럽에 담긴 채 덮어 4°C/40°F 이하로 냉장합니다. 2시간 안에, 실내가 32°C/90°F보다 더우면 1시간 안에 냉장해야 합니다. 가장 부드러운 식감을 위해 3일 안에 먹는 것은 품질 권장사항입니다. 시럽은 따로 덮어 냉장합니다. 얼음은 주문에 맞춰 갈아 조립하고 녹은 빙수를 다시 얼리지 않습니다.",
    "เก็บถั่วลิสงที่ปรุงแล้วในน้ำเชื่อมโดยปิดฝาที่ 4°C/40°F หรือต่ำกว่า แช่เย็นภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงหากอากาศร้อนกว่า 32°C/90°F กินภายใน 3 วันเพื่อให้ได้เนื้อครีมดีที่สุด ซึ่งเป็นคำแนะนำด้านคุณภาพของสูตร แช่น้ำเชื่อมแยกต่างหากโดยปิดฝา ไสน้ำแข็งและประกอบเมื่อจะเสิร์ฟเท่านั้น ห้ามแช่แข็งน้ำแข็งไสที่ละลายแล้วซ้ำ"
  );
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
}

function revisePavBhaji(recipe) {
  body(recipe, 0, ml(
    "Add the potatoes, cauliflower, peas, bell pepper, 350 ml water, and 4 g salt to the pressure cooker. Once it reaches high pressure, start a 5-minute timer, then release pressure according to the cooker manufacturer's instructions. Test the largest potato and cauliflower pieces; both should mash completely with no firm centre. If either is still firm, bring the cooker back to high pressure for 1 more minute and test again.",
    "將馬鈴薯、花椰菜、豌豆、甜椒、350 毫升水及 4 公克鹽放入壓力鍋。升至高壓後開始計時 5 分鐘，再依壓力鍋製造商指示釋壓。測試最大塊的馬鈴薯與花椰菜，兩者都應能完全壓碎，沒有硬心。若其中仍偏硬，重新升至高壓再煮 1 分鐘，然後重測。",
    "じゃがいも、カリフラワー、グリーンピース、ピーマン、水350ml、塩4gを圧力鍋に入れます。高圧になってから5分計り、鍋のメーカーの説明に従って圧力を抜きます。最も大きいじゃがいもとカリフラワーを確認し、どちらも硬い芯がなく完全につぶれる状態にします。硬ければ再び高圧にして1分加圧し、もう一度確認します。",
    "감자, 콜리플라워, 완두콩, 피망, 물 350ml, 소금 4g을 압력솥에 넣습니다. 고압에 도달한 뒤 5분을 재고 제조사 지침에 따라 압력을 뺍니다. 가장 큰 감자와 콜리플라워를 확인해 단단한 심 없이 완전히 으깨져야 합니다. 하나라도 단단하면 다시 고압으로 올려 1분 더 익힌 뒤 다시 확인합니다.",
    "ใส่มันฝรั่ง กะหล่ำดอก ถั่วลันเตา พริกหวาน น้ำ 350 มล. และเกลือ 4 กรัมลงหม้อแรงดัน เมื่อหม้อขึ้นแรงดันสูงแล้วเริ่มจับเวลา 5 นาที จากนั้นระบายแรงดันตามคำแนะนำของผู้ผลิต ตรวจชิ้นมันฝรั่งและกะหล่ำดอกที่ใหญ่ที่สุด ทั้งคู่ควรบดได้หมดโดยไม่มีไตแข็ง หากชิ้นใดยังแข็ง ให้เพิ่มแรงดันสูงอีกครั้ง ปรุงต่อ 1 นาทีแล้วตรวจอีกครั้ง"
  ));
  body(recipe, 4, ml(
    "Add the cooked vegetables and all their liquid in three additions, mashing and folding each time. Simmer uncovered for 10–12 minutes until cohesive and spoonable: a spatula track should close slowly, with no watery ring at the edge. If the bhaji turns pasty, add hot water 15 ml at a time. If it is loose, simmer uncovered in 2-minute increments until it holds a soft mound.",
    "分三次加入煮好的蔬菜及全部湯汁，每次加入後都壓碎並拌勻。開蓋燉煮 10–12 分鐘至融合、可用湯匙舀起：刮過的鍋底痕跡應慢慢合起，邊緣沒有水圈。若 bhaji 變得太稠黏，每次加入 15 毫升熱水。若太稀，開蓋每次續煮 2 分鐘，直到能堆成柔軟小丘。",
    "ゆでた野菜と煮汁を3回に分けて加え、その都度つぶしながら混ぜます。蓋をせず10〜12分、まとまりがありスプーンですくえるまで煮ます。へらで鍋底を引いた跡がゆっくり閉じ、縁に水っぽい輪が残らない状態が目安です。もったりしすぎたら熱湯を15mlずつ加えます。緩ければ蓋をせず2分ずつ煮詰め、柔らかな山形を保つ固さにします。",
    "익힌 채소와 남은 국물을 세 번에 나누어 넣고 매번 으깨며 섞습니다. 뚜껑을 열고 10–12분 끓여 한 덩어리로 어우러지고 숟가락으로 뜰 수 있게 합니다. 주걱으로 바닥을 그었을 때 자국이 천천히 메워지고 가장자리에 묽은 물 고리가 없어야 합니다. 너무 되직하면 뜨거운 물을 15ml씩 넣습니다. 묽으면 부드러운 둔덕 모양을 유지할 때까지 뚜껑을 열고 2분씩 더 끓입니다.",
    "ใส่ผักที่ปรุงแล้วพร้อมน้ำทั้งหมดลงไป 3 รอบ บดและคลุกทุกครั้ง เคี่ยวเปิดฝา 10–12 นาทีจนเข้ากันและตักได้ รอยที่ลากด้วยพายควรค่อย ๆ ปิด และไม่มีวงน้ำใสที่ขอบ หากข้นเป็นก้อนเกินไป เติมน้ำร้อนครั้งละ 15 มล. หากเหลว ให้เคี่ยวเปิดฝาต่อครั้งละ 2 นาทีจนพูนเป็นกองนุ่ม ๆ ได้"
  ));
  recipe.storage = ml(
    "Cool the bhaji in shallow portions and refrigerate within 2 hours at 4°C/40°F or below; if the room is above 32°C/90°F, refrigerate within 1 hour. Use within 3–4 days, the FoodSafety.gov guidance for cooked vegetable soups and stews. Reheat only the portion needed in a wide pan, stirring until the centre reaches 74°C/165°F; add 15 ml hot water if it thickens in the fridge.",
    "將 bhaji 分裝在淺容器中降溫，並於 2 小時內冷藏於 4°C/40°F 以下；若室溫高於 32°C/90°F，須於 1 小時內冷藏。3–4 天內食用，這符合 FoodSafety.gov 對熟蔬菜湯與燉菜的指引。只取要吃的份量，以寬鍋翻熱並持續攪拌，直到中心達 74°C/165°F；若冷藏後變稠，每次加 15 毫升熱水調整。",
    "バジは浅く小分けして冷まし、2時間以内（室温が32°Cを超える場合は1時間以内）に4°C/40°F以下で冷蔵します。FoodSafety.govの加熱済み野菜スープ・シチューの案内に従い、3〜4日以内に使います。食べる分だけ広い鍋で混ぜながら温め直し、中心が74°C/165°Fに達したことを確認します。冷蔵で固くなったら熱湯を15ml加えます。",
    "바지는 얕게 나누어 식힌 뒤 2시간 안에, 실내가 32°C/90°F보다 더우면 1시간 안에 4°C/40°F 이하로 냉장합니다. FoodSafety.gov의 조리된 채소 수프와 스튜 지침에 따라 3–4일 안에 먹습니다. 먹을 분량만 넓은 팬에서 저어가며 가운데가 74°C/165°F에 도달할 때까지 다시 데웁니다. 냉장 후 너무 되직하면 뜨거운 물 15ml를 넣습니다.",
    "แบ่งภาจีใส่ภาชนะตื้นให้เย็นและแช่ที่ 4°C/40°F หรือต่ำกว่าภายใน 2 ชั่วโมง หรือภายใน 1 ชั่วโมงหากอุณหภูมิห้องสูงกว่า 32°C/90°F กินภายใน 3–4 วันตามคำแนะนำของ FoodSafety.gov สำหรับซุปและสตูว์ผักที่ปรุงแล้ว อุ่นเฉพาะส่วนที่จะกินในกระทะกว้าง คนจนตรงกลางถึง 74°C/165°F หากข้นขึ้นหลังแช่เย็น เติมน้ำร้อน 15 มล."
  );
  addOfficialSource(recipe, "4 Steps to Food Safety", handling);
  addOfficialSource(recipe, "Cold Food Storage Chart", coldStorage);
  addOfficialSource(recipe, "Safe Minimum Internal Temperatures", temperatures);
  addSource(recipe, "Meera Sodha — Pav Bhaji (The Guardian)", "https://www.theguardian.com/food/2026/feb/14/pav-bhaji-recipe-meera-sodha");
}

export function refineSeventyFirstMethods(recipes) {
  const byId = new Map();
  for (const id of ["tarta-de-santiago", "cannoli-siciliani", "peanut-shaved-ice", "pav-bhaji"]) {
    const index = recipes.findIndex((recipe) => recipe.id === id);
    if (index < 0) continue;
    const original = recipes[index];
    const publicationCopy = {
      ...original,
      ingredients: original.ingredients.map((row) => ({ ...row, item: { ...row.item } })),
      instructions: original.instructions.slice(),
      sources: original.sources.map((source) => ({ ...source })),
      storage: { ...original.storage }
    };
    recipes[index] = publicationCopy;
    byId.set(id, publicationCopy);
  }
  reviseTartaDeSantiago(byId.get("tarta-de-santiago"));
  reviseCannoli(byId.get("cannoli-siciliani"));
  revisePeanutShavedIce(byId.get("peanut-shaved-ice"));
  revisePavBhaji(byId.get("pav-bhaji"));
}
