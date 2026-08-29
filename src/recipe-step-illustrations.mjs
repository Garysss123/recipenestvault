import { recipes } from "./recipes.mjs";
import { japaneseIllustrationSetsA } from "./japanese-illustration-sets-a.mjs";
import { japaneseIllustrationSetsB } from "./japanese-illustration-sets-b.mjs";
import { japaneseIllustrationSetsC } from "./japanese-illustration-sets-c.mjs";
import { japaneseIllustrationSetsRamen } from "./japanese-illustration-sets-ramen.mjs";
import { japaneseIllustrationSetsNikujaga } from "./japanese-illustration-sets-nikujaga.mjs";

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

const mapoTofuIllustrations = [
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
    sourceAssetSha256: "eae957312fb22bd737d1469b4a7b9923902833c602014512e0328cb7e659ee19",
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
    sourceAssetSha256: "c2947c6bb693760b21f0131f2cda4874370085f663992c9084d1d4fca23c0aa0",
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
    sourceAssetSha256: "17a397319cb5a3bc7bf4f5468a3be7357f661ab25e87c6bea5a46c4a715e51c2",
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
    sourceAssetSha256: "ae0f8bc42e2ac6520f7ee6c4d2288766bc972f356d9291e00958f9b49361a302",
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
    sourceAssetSha256: "adc8fee420bf26f51737263019762f0c65ad999d72dbd8a32d1010a1574845d1",
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
    sourceAssetSha256: "0b415d73d18426226012682729246586836869762d27d24a22ded0767e64f005",
    alt: ml(
      "Illustration of sliced scallions and a fine dusting of Sichuan peppercorn being folded into settled Mapo tofu after the heat is turned off.",
      "關火後將青蔥片與少量細花椒粉輕輕拌入已停止沸騰的麻婆豆腐示意圖。",
      "火を止め、落ち着いた麻婆豆腐にねぎと細かな花椒をやさしく混ぜるイラスト。",
      "불을 끈 뒤 잔잔해진 마파두부에 썬 대파와 고운 화자오 가루를 부드럽게 섞는 삽화.",
      "ภาพวาดการคลุกต้นหอมหั่นและพริกเสฉวนบดละเอียดเล็กน้อยลงในหม่าผัวโต้วฝูหลังปิดไฟ"
    )
  }
];

const generatedSets = [
  {
    recipeId: "kung-pao-chicken",
    hashes: [
      "09710497240740e0a0bfa23bd8a1f7194306c3d57e315ccd3a075ac1dfec01e9",
      "9e6f93cfe86e7854fec9663664f10aaa38da2cd1a4808dd8a106549b52db1e16",
      "81a00f1805dc09d90ed9f37739a04c5c990da28c0d301cd3c600b35a1f7c704a",
      "cab5408adab6f70d6d1980cf6b828dbb420584fe5a8439155f5ba4c91a945d9d",
      "0183437bded63c550b457e59467d3e9e18ae18bafaa17951b7bc0ee0e7e231f5",
      "9a1f8751c09c1710ce297dd03c49f3c3aa7ac028710f4ba263ba2c5b89f0ebf0",
      "15a9d92056a5eaed118336cf31650fea22833c26567cf87bcffa5435dbf06e8a",
      "cd47e70b157ad9e1352bab998df464bedf2ca36909fd03e6bc7889f55494eb10",
      "c208b3022f7776d55c1695eb0386b2ac05935413dfc488678c56e0ddd9a946de"
    ]
  },
  {
    recipeId: "twice-cooked-pork",
    hashes: [
      "1b7305baa7c8594543f38b1a5af54f92898635c3af56e685f68ed17b4c988962",
      "e3967d628ea45ddac0e48a762586cbe48001f3d4732e49738266121c84926cf1",
      "d3b7d6e24441da478f4fe00adc95d6f697b5b6e635595f6a725bb4452cf47488",
      "97fd22d4f2b581411be85b1cd470f4fbd67732155a2b7fd6e91e03c0213d5d77",
      "1104a6bc9c8c6fb9abb3a4d882aa1423cd7541e6792c4713f39818c9d246c7ee",
      "eb5ac5885c7a6ada3a1fbec103730317806620900058a2bd88df081a6b2ae7f1",
      "a93cd81428305a5c53f37301201c2604b26a4f14fc53de2371d7872d76766075",
      "7cc78007e9a37b0b957a4f9d33f4280a98ee2093128c7212546a5faaf33869ea",
      "4f4c1a16c868b7c3bcc94624893b6a02d51ec046d1bb8e7884fe3d6047541ab4"
    ]
  },
  {
    recipeId: "dan-dan-noodles",
    hashes: [
      "e71c18cbb9d8b52426284c109e004ec9c8e132301b98ffdc915ff40529a09176",
      "4daf932665f7b60a9b9b392cb2aa41cc774dd9a638e2ddf10d1d4b4d71afe27a",
      "513f32acfe479668c87743c084ad024d8580e154d9a91f199165bd9b56480142",
      "ebeca18539453807ce9ae83761a064753f051d1c91777d6debb2e82fb6765b53",
      "344d4f89eba2436e1c9b6c9d9a0017ab04ab83b9ad5fdccd694f48431f71d9fa",
      "55826c92698991cf72d205ce91576ca4defc4bb89758dcec1510047b76eaa28f",
      "1ca913b94b0ca6ab1367cf2e3da5b7fb44b663e26e96dc5b3b7fc7c04fa9583d",
      "acb9a6dfc9ea658397defcfb07c473ab84fb2876810b7cf60d3389416e7e281a"
    ]
  },
  {
    recipeId: "tomato-egg-stir-fry",
    hashes: [
      "1157db05ab6f2f1a40fdfb1e73af7dd18ad04319cbabca30fe890237e349fbde",
      "c62d3368bfafabcb6d389e22549c9793180487ec47bf664c868002ee4e9f78c9",
      "577a9db45f8b50e95ba3f4a4ec37cdeeab37596657eef52244fce7db6151cd27",
      "0dd16818dc75d072ef053b6e245f93523b42d96f15d0bf17fd5dc3fb94291085",
      "2d9c46e09206b8be7d560088560761b926ad0fb539ce98946ff9fa550305e8f6",
      "132d34f062594b8666e4dd04d87182b9070132a0012bf4e6ac5d8cf9cd034576",
      "f28a1a588c43546c85fe8bfb7aaeb03c5616d6e59482c4b7dac1c7e94420957b",
      "480a020888d365685f8f0046e0003eed9fd4a914aad5ff54c71029215090252c",
      "21fc4e1a075bcd86c3b43bb08a2ae39b9e75eb5940c9e7d9956855151d6ce4d7"
    ]
  },
  {
    recipeId: "sweet-sour-pork",
    hashes: [
      "1038c889d00deb2d56ac4d5c2a823cae8cf588dc8c004884c8f6ca140382c752",
      "b51469e19add4d0e02b3fb04ab8730690895bcd9b769727cb1f863e791bb22ba",
      "2a92a14515d3456a18efb88f765a52cba920305d76a591dc94d882becbcecea8",
      "031fc93b0edfe32cbcd1278016e2e503d3931d3c8f76feeedb54ce880f7442bf",
      "ebe022c11c40aa2294960f14a8bdf3fd0957acdc096ad76628ad9b479b14500c",
      "8df17252ee924d0825d2816917973a7c318af0b9eea255be222538bacd8dbff2",
      "93220abf863879abea761b0e9ad7d30ed98937399e60a8b99c517f59217fe0ac",
      "fd9f43ce55f6895560846146f411a9e463444e582aa1d2757b171aeb9b533a2f"
    ]
  },
  {
    recipeId: "char-siu",
    hashes: [
      "b69458534faefff8b1366ba69ae2390cf507f3a162f30bd3b083212263fe90bd",
      "ba578aa2999e520475f8df87f4035939cf4e2d0b69fba54be7fca346a131422c",
      "36477ad6df785f35de7e8182db7c83cb26482e8fe8cfd1e0e434d46fc0250c37",
      "3016db3f65ad17acbf5d78aa273c1635d9033f7351720a9f92d1479c65a8d334",
      "45b6da28925e09b3f9e943a1aa03b2a32de560c62531156a897ad8111c0add51",
      "4c18b6cf5f124a538525bddb9eaa715cdb3f13ed9609b9bd6d145a20e1f6486b",
      "2f33732db1d71af9f60180ea79b1da3228a8e4a588511b0fd60c4ead1db4060d",
      "13c467520e0295a9c889fdffb5316e4aaeef6b88fbe283d780daa6e9b74b6ee2"
    ]
  },
  {
    recipeId: "clay-pot-rice",
    hashes: [
      "70440cf43d8c742865b8051a92c7edf9f50c6f7b8ce291f65cb0fe3a27efb282",
      "29ed313e34b0d5774412f0cff004aecc6253dab37414bbeff3add89a4fe6265c",
      "60fc54012259b64c2faad99c27c1a9885a7360a4f3013037df142d8009231c57",
      "b65e869190afeba83ddcbed934aaa4722dd453547c5772253bce39eee97a96ef",
      "c66149e06d9fd715df23749a39e8eb42f23d5f35b536ffd212307bbfa9431e0b",
      "7c25285f16c7b3a449c85aae0b2f7c92b7e53b8d3f8a4ce5b5477b72d5b2c475",
      "8eae13bedaf04c729f4ff63a15adef3a87096699e716ec11526912f69ab12e77",
      "c6d1ae2ffd2d14031a68fdb863a22a7f791a2c12cd8f5fdc2edbc47a0a1c4064"
    ]
  },
  {
    recipeId: "beef-chow-fun",
    hashes: [
      "6439f2bcc10199af3d0fdec6efca328b5d25ad59dcee44c771f4e5bfcdc94c70",
      "b64c37e0b796436133d3d98ac8fb806364d7b851701a6bc29a01a6cf04e1c78b",
      "0d7eb29faa15efa95885eec7f4caa11d628f44610f48cf33687030c27159faf5",
      "2d87851be3cd5a5f5d0f9087f428e8aaa792a671a71152715b5e17375a0cacc2",
      "7f8d579533dfe852201cb35aedb91645213ec37df6af658916e4be27e805e990",
      "19018bec13a2dbb6f7fac408d7fd6f14fa5273c4454d795af39030273bed84b6",
      "16da6ecce89e516e03fe7504a5b4fdfb2b1364748f00ada33f9d20cc5b6b900c",
      "0e52ae0a78ecb83a704ae2f33d45b454f2f838da3cbc1cbd8c923d6b5b23ed9b"
    ]
  },
  {
    recipeId: "wonton-soup",
    hashes: [
      "7230fb01e9347fdeb18247cf9badd26a2b538043c2878d406d44977647f88273",
      "ffaf32d31b91a59bdf66b2dd17dce99f4748181c809837d1dfa2a54d9775d50e",
      "7498dbc2cf6ea36613f2be00ae28cb58f22c1aa73a4b08d7cc957d55a6360a25",
      "7217b23397145ece4641539e84891151917ebbac6520c173e5b91a2e8a8393bc",
      "f33c1e832895787ffae2bb4f06a3aa5d1e684405395a0b28bb23d9a8dbdfd68c",
      "87602993a3a23597099d05ae2922502e29f85a13ef7816069a83b3653d9064c3",
      "74fec2f1287c2bdef6870d22e34e307792b123019a133ac3419d936499665c87",
      "92eb2d5ea74692ef5e77081dace36c72ed509a254dafaf6c6ca9e03b513c1ff6"
    ]
  },
  {
    recipeId: "jiaozi",
    hashes: [
      "02e12ba5a99fe5cbef48d57dc970d422955fa0ba1258d532b8409b12e79f5466",
      "297862b94c78ab7c4ea9675b2693218680102e28b4b877e1774d0ccc0389cf3a",
      "032ca74c52a71d535f656306f63f11790a678618a068a96c26fe49dabca58f8a",
      "75259217d2cd595ca5df9f19d553a87366b004e3cc7436b99d4de7970a38e22e",
      "6cd26d0d37a0046b4c35895ee9be7b92b5d3b0a176e030a523a35438e78119f3",
      "c7a6af2371ebf2a0217f83084fd6a73b9dc8e9700838bc5e4641bcce2f97b101",
      "0642ccb2f5307aa8e882a587709aaaa68ba645f29186770ba527a6163ea302b8",
      "a3183c6883490942d57f1e38375f2ee6482cc8b27f09c73b2663901b9e10f469"
    ]
  },
  {
    recipeId: "scallion-pancakes",
    hashes: [
      "6da97aac3a55f875938c50c6af25eff61810d59a2e8c3a4c57dcf37a969a7ac8",
      "5f1870c609a828210cc795a0237c53ccbfc57461f9fa8b4f273e516d1714123a",
      "a56f0b845dd6bc9cfe765d46dfaa18af6d80c6deec71fe7b044a9f8ee8821059",
      "a105bc9e1702f4d160f20cc67b8317bd8c69b94e4cdbf180328e311f340ca931",
      "1d9f81f9a754852b08d064265193ac4c1c01ac9c8b043ec7fca79af7181d619f",
      "3f619a41e24a224c763dabb1fdcd8a323665173ad3e29abaf7486029bb705125",
      "67c4eb660befb138e7cd9d0105bef838b2704b0a74714c612ee5079ab0416409",
      "14fbbd4a96decf20f0291f0bd629d92b074ce347e02a36b6c0b059784bee1032"
    ]
  },
  {
    recipeId: "peking-duck",
    hashes: [
      "54fb7fae626c5fd061e35fb688f958276b3d09f99f47dd56359a0f960cbe3f3a",
      "6c020094d6cb9b794fd06b67e8901922d49203d3253ae44299aec13754b01d44",
      "53d41b3911d56cba903094130adfe5e435ff7b0e0bba55c5ceaba3439e067b4b",
      "7dc5de2b09aef87542a47e001adf509aad304980a22f3563ab7ddb32890aafc8",
      "ae99a685697e4eaea685bd2781338246f4a311a995221d457c821b35e04c61d3",
      "5f6b89def5c16348bc3cd7e54ef986544c2b81de9f6f639a8a52f260c35f9cd6",
      "9b10b907af2306e3a8767ecff5812d0d454158a2762379b4391c08651cfb1012",
      "536da87c25b7a6c7cb4c9762cea3528a23cca35d16fce80d752f4675e77aa8a6"
    ]
  }
];

const recipeById = new Map(recipes.map((recipe) => [recipe.id, recipe]));

function stepAlt(recipe, step) {
  const title = recipe.instructions[step - 1].title;
  return ml(
    `${recipe.name.en}, step ${step}: ${title.en}.`,
    `${recipe.name["zh-hant"]}第 ${step} 步「${title["zh-hant"]}」的料理示意圖。`,
    `${recipe.name.ja}の手順${step}「${title.ja}」を示す調理イラスト。`,
    `${recipe.name.ko} ${step}단계 '${title.ko}'를 보여 주는 조리 삽화.`,
    `ภาพวาดการปรุง${recipe.name.th} ขั้นตอนที่ ${step}: ${title.th}`
  );
}

function buildSet({ recipeId, hashes }) {
  const recipe = recipeById.get(recipeId);
  if (!recipe || hashes.length !== recipe.instructions.length) throw new Error(`${recipeId}: illustration manifest does not match recipe steps`);
  return hashes.map((sourceAssetSha256, index) => {
    const step = index + 1;
    const paddedStep = String(step).padStart(2, "0");
    return {
      ...common,
      id: `${recipeId}-step-${paddedStep}-illustration`,
      recipeId,
      step,
      sourceAsset: `${recipeId}/step-${paddedStep}.png`,
      sourceAssetSha256,
      promptSet: `${recipeId}-v1`,
      alt: stepAlt(recipe, step)
    };
  });
}

function normalizeSet(set) {
  return {
    recipeId: set.recipeId,
    hashes: set.hashes ?? set.steps?.map((entry) => entry.sourceAssetSha256) ?? []
  };
}

export const recipeStepIllustrations = [
  ...mapoTofuIllustrations,
  ...[...generatedSets, ...japaneseIllustrationSetsA, ...japaneseIllustrationSetsB, ...japaneseIllustrationSetsC, ...japaneseIllustrationSetsRamen, ...japaneseIllustrationSetsNikujaga].map(normalizeSet).flatMap(buildSet)
];
