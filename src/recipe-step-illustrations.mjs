const ml = (en, zhHant, ja, ko, th) => ({ en, "zh-hant": zhHant, ja, ko, th });

const common = {
  kind: "ai-generated-step-illustration",
  generator: "OpenAI image_gen",
  generatedAt: "2026-08-29",
  promptSet: "mapo-tofu-v1",
  aiGenerated: true,
  nonPhotographic: true,
  visualMatchApproved: true,
  excludeFromStructuredData: true,
  setComplete: true
};

export const recipeStepIllustrations = [
  {
    ...common,
    id: "mapo-tofu-step-01-illustration",
    recipeId: "mapo-tofu",
    step: 1,
    sourceAsset: "mapo-tofu/step-01-prepare-tofu.png",
    sourceAssetSha256: "3976f2b1594b4166a32209ee4933704ca6b36d77283c954cfc762bf9910685d3",
    alt: ml(
      "Illustration of 2 cm tofu cubes soaking in warm water beside a bowl of cornstarch slurry and a fine-mesh strainer.",
      "2 公分嫩豆腐方塊浸在溫水中，旁邊放著玉米澱粉芡汁與細網瀝網的示意圖。",
      "2cm角の絹ごし豆腐をぬるま湯に浸し、隣に水溶きコーンスターチと細かい網のざるを置いたイラスト。",
      "2cm 크기의 연두부를 따뜻한 물에 담그고 옆에 옥수수전분물과 고운 체를 둔 삽화.",
      "ภาพวาดเต้าหู้อ่อนหั่นเต๋า 2 ซม. แช่น้ำอุ่น ข้าง ๆ มีน้ำแป้งข้าวโพดและกระชอนตาถี่"
    )
  },
  {
    ...common,
    id: "mapo-tofu-step-02-illustration",
    recipeId: "mapo-tofu",
    step: 2,
    sourceAsset: "mapo-tofu/step-02-mise-en-place.png",
    sourceAssetSha256: "09288a8b92f9533dd8cf1ed397b00ca46bc19ea842a161079b63c2d1f9ec85ce",
    alt: ml(
      "Illustration of measured Mapo tofu ingredients arranged in separate bowls beside an empty wok, with ground peppercorns divided into two portions.",
      "麻婆豆腐食材分別量好放在空炒鍋旁，花椒粉分成兩份的示意圖。",
      "麻婆豆腐の材料を空の中華鍋の横に計量して並べ、花椒を2回分に分けたイラスト。",
      "마파두부 재료를 빈 웍 옆에 각각 계량해 두고 화자오 가루를 두 몫으로 나눈 삽화.",
      "ภาพวาดวัตถุดิบหม่าผัวโต้วฝูที่ตวงแยกไว้ข้างกระทะเปล่า โดยแบ่งพริกเสฉวนบดเป็นสองส่วน"
    )
  },
  {
    ...common,
    id: "mapo-tofu-step-03-illustration",
    recipeId: "mapo-tofu",
    step: 3,
    sourceAsset: "mapo-tofu/step-03-brown-pork.png",
    sourceAssetSha256: "c300a39a7d919b077f069af8f2f638ef1e42b9f1b7ee10f70ffcc1fca57924b3",
    alt: ml(
      "Illustration of fully browned ground pork being broken into small crumbles with a spatula in a black wok.",
      "豬絞肉在黑色炒鍋中炒至全熟上色，並用鍋鏟撥成細粒的示意圖。",
      "黒い中華鍋で豚ひき肉を完全に褐色になるまで炒め、へらで細かくほぐすイラスト。",
      "검은 웍에서 다진 돼지고기를 완전히 갈색이 나도록 익히며 주걱으로 잘게 푸는 삽화.",
      "ภาพวาดหมูบดที่ผัดจนเป็นสีน้ำตาลทั่วและใช้ตะหลิวแยกเป็นชิ้นเล็กในกระทะสีดำ"
    )
  },
  {
    ...common,
    id: "mapo-tofu-step-04-illustration",
    recipeId: "mapo-tofu",
    step: 4,
    sourceAsset: "mapo-tofu/step-04-bloom-seasonings.png",
    sourceAssetSha256: "0a558419fc7d6445690ef6b605e3188b7ab807ddf3289c1a4254e7587272aafa",
    alt: ml(
      "Illustration of red doubanjiang streaks, small fermented black beans and ground peppercorn blooming with browned pork in red oil.",
      "豆瓣醬紅色醬痕、小粒豆豉與花椒粉在紅油中和炒香豬肉拌炒的示意圖。",
      "赤い豆板醤、小粒の豆鼓、花椒を、赤い油と炒めた豚肉に混ぜるイラスト。",
      "붉은 두반장, 작은 발효 검은콩과 화자오 가루를 붉은 기름의 볶은 돼지고기에 섞는 삽화.",
      "ภาพวาดโต้วป้านเจี้ยงสีแดง ถั่วดำหมักชิ้นเล็ก และพริกเสฉวนบดที่ผัดกับหมูในน้ำมันแดง"
    )
  },
  {
    ...common,
    id: "mapo-tofu-step-05-illustration",
    recipeId: "mapo-tofu",
    step: 5,
    sourceAsset: "mapo-tofu/step-05-build-sauce.png",
    sourceAssetSha256: "2489e718d61f8bbe6e0de4bfe4f17fb0d45b9465ab472c787acb5c6bce8e93b0",
    alt: ml(
      "Illustration of pale stock being poured into seasoned pork while a spatula scrapes the base of the wok to form a loose red sauce.",
      "高湯倒入調味豬肉中，同時用鍋鏟刮起鍋底形成較稀紅醬的示意圖。",
      "味付けした豚肉にスープを注ぎ、へらで鍋底をこそげてさらりとした赤い煮汁を作るイラスト。",
      "양념한 돼지고기에 육수를 붓고 주걱으로 웍 바닥을 긁어 묽은 붉은 소스를 만드는 삽화.",
      "ภาพวาดการเทน้ำสต๊อกลงในหมูปรุงรส พร้อมใช้ตะหลิวขูดก้นกระทะให้เกิดซอสแดงที่ยังเหลว"
    )
  },
  {
    ...common,
    id: "mapo-tofu-step-06-illustration",
    recipeId: "mapo-tofu",
    step: 6,
    sourceAsset: "mapo-tofu/step-06-simmer-tofu.png",
    sourceAssetSha256: "b4bb94f04788b387d5a6b6833027996897df7d4d35081117db66ce902851394c",
    alt: ml(
      "Illustration of intact tofu cubes arranged in one layer and gently simmering uncovered in loose red Mapo sauce.",
      "完整豆腐方塊單層排列，在未加蓋的炒鍋中以較稀紅色麻婆醬汁溫和燉煮的示意圖。",
      "崩れていない豆腐を一層に並べ、ふたをせずにさらりとした赤い麻婆だれで静かに煮るイラスト。",
      "부서지지 않은 두부를 한 겹으로 놓고 뚜껑 없이 묽은 붉은 마파 소스에서 잔잔하게 끓이는 삽화.",
      "ภาพวาดเต้าหู้ที่ยังเป็นชิ้นสมบูรณ์เรียงชั้นเดียว เคี่ยวเบา ๆ แบบเปิดฝาในซอสหม่าผัวสีแดงที่ยังไม่ข้น"
    )
  },
  {
    ...common,
    id: "mapo-tofu-step-07-illustration",
    recipeId: "mapo-tofu",
    step: 7,
    sourceAsset: "mapo-tofu/step-07-thicken-sauce.png",
    sourceAssetSha256: "ffa32d1d9c56eacfc503715f2ddccea1b78d36ea0acef8def092f585822d6015",
    alt: ml(
      "Illustration of a spoon-stirred slurry pouring in a thin stream while half remains in the bowl and the tofu stays intact.",
      "以湯匙重新攪勻的芡汁細流加入紅醬，碗中仍保留一半且豆腐保持完整的示意圖。",
      "スプーンで混ぜ直した水溶きコーンスターチを細く注ぎ、器に半量を残したまま豆腐を崩さずとろみを付けるイラスト。",
      "숟가락으로 다시 저은 전분물을 가는 줄기로 붓고 그릇에는 절반을 남긴 채 두부를 부수지 않고 농도를 내는 삽화.",
      "ภาพวาดการใช้ช้อนคนแป้งอีกครั้งแล้วเทเป็นสายเล็กลงในซอสแดง โดยเหลือครึ่งหนึ่งในชามและเต้าหู้ยังคงรูป"
    )
  },
  {
    ...common,
    id: "mapo-tofu-step-08-illustration",
    recipeId: "mapo-tofu",
    step: 8,
    sourceAsset: "mapo-tofu/step-08-finish.png",
    sourceAssetSha256: "81f283f325c9494342f04a2dc791143f8277c96ce1e0db8546ded88c22c981d3",
    alt: ml(
      "Illustration of sliced scallions and a fine dusting of Sichuan peppercorn being folded into settled Mapo tofu after the heat is turned off.",
      "關火後將青蔥片與少量細花椒粉輕輕拌入已停止沸騰的麻婆豆腐示意圖。",
      "火を止め、落ち着いた麻婆豆腐にねぎと細かな花椒をやさしく混ぜるイラスト。",
      "불을 끈 뒤 잔잔해진 마파두부에 썬 대파와 고운 화자오 가루를 부드럽게 섞는 삽화.",
      "ภาพวาดการคลุกต้นหอมหั่นและพริกเสฉวนบดละเอียดเล็กน้อยลงในหม่าผัวโต้วฝูหลังปิดไฟ"
    )
  }
];
