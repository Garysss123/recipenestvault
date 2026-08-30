// Reviewed static cooking-step illustration provenance for Japanese batch C.
// These entries are intentionally separate from the central Chinese illustration registry.
const step = (number, sourceAssetSha256) => ({
  step: number,
  sourceAsset: `${number === 1 ? "step-01" : `step-${String(number).padStart(2, "0")}`}.png`,
  sourceAssetSha256,
  dimensions: "1672x941",
  nonPhotographic: true,
  visualMatchApproved: true,
  excludeFromStructuredData: true
});

export const japaneseIllustrationSetsC = [
  {
    recipeId: "miso-soup",
    stepMap: [{ source: 2, target: 1 }, { source: 4, target: 2 }, { source: 5, target: 3 }, { source: 6, target: 4 }, { source: 7, target: 5 }, { source: 8, target: 6 }],
    promptSet: "miso-soup-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/miso-soup",
    steps: [
      step(1, "bda62883e478f8b2bd78ad25f3cec811c51cbe220d7280372b9aa6fe6f226b19"),
      step(2, "be9fcead9d61ba2d5592fac028c0d259a393e23577a449e7147a3a0511302b4c"),
      step(3, "1907ecc6e8f8576ca2243101c01033daa2a960dc1c21624593e1d06c373e06ce"),
      step(4, "ec1cba210d85ce4d7dbb918f6acd546bff241f5add95568a1d12925a00613375"),
      step(5, "9cfaae003b60b63e595a65eeef0b48182886a6883649ed1271f64547b7153d54"),
      step(6, "d38c3d9f48c0ef59cfcca845e2adc1b00f25156535fbda372671c6a96a8255c3"),
      step(7, "a382747704f80935a99e50b8969ad1b2a90277e157ff82d91d30fc2ded8c43a0"),
      step(8, "d6cf970ea73b6eab3be7d26b4419d6cd4baf92c74e7f2f479a1e9c9827c708e9")
    ]
  },
  {
    recipeId: "onigiri",
    stepMap: [{ source: 2, target: 1 }, { source: 4, target: 2 }, { source: 5, target: 3 }, { source: 7, target: 4 }, { source: 8, target: 5 }],
    promptSet: "onigiri-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/onigiri",
    steps: [
      step(1, "4afae4846b5df3de498c075d6193c29e6c7fb444b6aa292486756a0ee3869733"),
      step(2, "8a850f6db03aa1523625c8218fdb920a475b7a6f6fbd73a37a2b500ab3c5f428"),
      step(3, "35a01d807dda5380a41f2fed64c47cd53ddbb87da13a4621be0a47f265410d1c"),
      step(4, "d5245ece0ae0e6151eb1f82116693cc6f17301e6fcbf8552d29c09b32d468edd"),
      step(5, "f2628977aa3cb0b0281a438c2de00554513da1161f44a892c04276c252b81aeb"),
      step(6, "1a2b05434417a6be820a47a26a83fad217eb5bf5fb9ab630f6b486647ea70fac"),
      step(7, "42b788424b07897a3265cd81f6570d38f4865ba9aa95998dcd3536a4b1507ee0"),
      step(8, "a1b031b5685a975c096db3c94f9e72a013e5f8ff0abe85bbbeff8bdb6e2abd5a")
    ]
  },
  {
    recipeId: "tamagoyaki",
    promptSet: "tamagoyaki-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/tamagoyaki",
    steps: [
      step(1, "e290fcdc7009b3fb6fb34632fc87059a31d1eecadd402fe5408032d3fdf96250"),
      step(2, "5f2b63b14cc375a848047e1f589f1e0971819920270affd25c7ec0a6e341f2a7"),
      step(3, "55f9da0d88e78e485fa32be9685f76157c3fc1fd9f3b1bb725e2d11852ed82af"),
      step(4, "9ea528df003577dccfe8494d127bec9c40c50cef2d24b051229c484e1705b9c8"),
      step(5, "b6dd62f9d1d4ab89d5e98ebee385c59107b80f28abd77de605bf0ffdbe0e1c07"),
      step(6, "0b971edc30344daa9ca3cdac1344f29731acbc6ae9024b1e105f280a1c4bac45"),
      step(7, "0b3c1c157f25f050bf15a062f2308be6609f458a691ed7bbc7ab03b7f7485c5a"),
      step(8, "264452eef6d1a18132e2c0b015183708d71c34e6363ecd13939fd6e500c3b1b1")
    ]
  },
  {
    recipeId: "chawanmushi",
    promptSet: "chawanmushi-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/chawanmushi",
    steps: [
      step(1, "34b128dffaef0f4930b86df0e99977a8996fdced62e453004e6e273e333cf8c5"),
      step(2, "86298bdd2c12c373025a70b8976b16dbb2ef7e614dd42cac2738a3d6500c9daf"),
      step(3, "a5d771a0391500be84dcaa3688dfdfd3d589f516fe4604e5fc2589ecd2c8b882"),
      step(4, "be53ce0d6ec600e6b56c061423ed8a4c7f6cf65d5399d6ee3c1b0da5ad72d055"),
      step(5, "99ffac724e7121f937b97f451f684865bc98447eff776cc1d8c7ea149d87bb2d"),
      step(6, "aaba14c701f6e088741bac11012144db45591c68ff93801afdb3614cf9b6fb28"),
      step(7, "dc0f0ad75ad7305f96ba456e05dd785888414dfff6daaec116db9fbf90d44dbe"),
      step(8, "ab01b15a102629025773311dbd006a4daff0e18f53423e9d1f3f3b76f4afbea9")
    ]
  },
  {
    recipeId: "zaru-soba",
    stepMap: [{ source: 2, target: 1 }, { source: 3, target: 2 }, { source: 4, target: 3 }, { source: 6, target: 4 }, { source: 7, target: 5 }, { source: 8, target: 6 }],
    promptSet: "zaru-soba-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/zaru-soba",
    steps: [
      step(1, "dc6ff788c827627204f2bfc395dc6681bdf4cc8438b14ec7a6ee48c54746e380"),
      step(2, "8524c57f22c3cd4ec0d02267c4ed2bbe7ba962efc321ef0225d3a03efa280009"),
      step(3, "47432dc4163e3d6d87d4ae126460bb40fdbd190e9cb7ed6b8eaf595d7dbcf504"),
      step(4, "768b4c7f91cde6406e40ade8f7bb6c422399bf567c90109525a647b39ff40d8a"),
      step(5, "e007823134fa735b1dd8815f47b3f1ab67d94cb47ea62e184ff84dbd437f3a39"),
      step(6, "e224768464bf2994e0bdf0b6cc42b4240703cc4daa381ed5720f4776b25d8e1a"),
      step(7, "89ebadd2de4582dd8ddf55e51ebc18b3dfc92fbcf180926b724d19260d427344"),
      step(8, "a7ae917968fc3e59f0fcb6ada277419eac0ed5399d604655b8ba87395c075232")
    ]
  },
  {
    recipeId: "kitsune-udon",
    promptSet: "kitsune-udon-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/kitsune-udon",
    steps: [
      step(1, "044f704b17337fd02f46e487cf6c0f976292e1640717921473bfcffbc95e2e25"),
      step(2, "0a6d24b08b298a5fb212877c57cc75fb8184fe6c86aa539f5c27912925b4ac64"),
      step(3, "3d449b2fa4bed2e22e64868efa8e7991fcf04c3c24a89ddc9249126929961d2d"),
      step(4, "5f15325758dca9f56eafb1c0a769d474b839162a59671e2555661ef51e279e96"),
      step(5, "ccada0531e005fcdad4713d2159f969d3ce4afa3f05f5056717f092b70d25317"),
      step(6, "fbb09957fbc767fceca1c465f3c8b7a89728b6b4887d20017a3c7863d42017bf"),
      step(7, "b7d0c14ebc3380d6f250ee789b6a4024578bf75b65baae5be6d4523539911d5d"),
      step(8, "0d2a156bedd5d49cf187a622f07fb296edfb3f82733aeecb657d7e478a106869")
    ]
  }
];

export default japaneseIllustrationSetsC;
