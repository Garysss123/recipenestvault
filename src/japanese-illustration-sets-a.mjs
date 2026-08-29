// Reviewed static cooking-step illustration provenance for Japanese batch A.
// These entries stay separate from the central recipe/illustration registries.
const step = (number, sourceAssetSha256) => ({
  step: number,
  sourceAsset: `step-${String(number).padStart(2, "0")}.png`,
  sourceAssetSha256,
  dimensions: "1672x941",
  nonPhotographic: true,
  visualMatchApproved: true,
  excludeFromStructuredData: true
});

export const japaneseIllustrationSetsA = [
  {
    recipeId: "chicken-teriyaki",
    promptSet: "chicken-teriyaki-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/chicken-teriyaki",
    steps: [
      step(1, "5dfe2d0abb4b7a5dd847adb999cb94c863bb6a8c6b8554fcd4f19d55f4395b16"),
      step(2, "369b451942111aff0bbd70093b69fc48604b6e9b18a2785693f719e93d2b0b34"),
      step(3, "8769c1e6cc67e7107b6e3aaa8ab8fd2863c7ac4c97dc0a4ac3099888fdd44bf2"),
      step(4, "63b288249830019a6cc35f2678898f4096f1cf19e0cb87e1e6194cf95cd183d1"),
      step(5, "f89f38f5976e03db135356af803d833276ba474ffb47dc7ad63284c6833e2deb"),
      step(6, "17858863398b2b52051e4b5298edbcd8990cefe05d3a1a5d8cea94fa01ee2039"),
      step(7, "37e8ae57c84f8db00e2e888926c02bd52330859d3531f47bec5f17d0097cf53e"),
      step(8, "1b3ef02e196744f37cf991b0b410d09b570be02bf0d89ce0f11fdee1625aecc7")
    ]
  },
  {
    recipeId: "gyudon",
    promptSet: "gyudon-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/gyudon",
    steps: [
      step(1, "b0b7c6e2bd6ed5d17712059a2e37943ca2c59775d2be720c2e14f93ec99225c6"),
      step(2, "5da723407bc4626d679af8341ba0739632498706ca90fddea5b7edbc1882b86c"),
      step(3, "2d4265c1f063adb9e32f7ac6cf9c20417eb9e5b268edf8e0e72cac56334259f6"),
      step(4, "0217a55d91259b18368f68efb7521f3eff46dec9c6784b38754a3f2c5a10dc05"),
      step(5, "08ccff229d675e37c2e4f906bb0c2a531d44b383231778bb66b60b9f77a3845b"),
      step(6, "933fd17b381603df313eebf7b20970409d1e63bb7af792b5d70eabcf676b8c91"),
      step(7, "907037c3ff940644abde0ffb088337c7725bba8444b68b4fece1125aeb2b8026"),
      step(8, "8cbc88606391266942afc32faf0f3505ef573d07284fa0cdaca4f1743a89fe66")
    ]
  },
  {
    recipeId: "oyakodon",
    promptSet: "oyakodon-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/oyakodon",
    steps: [
      step(1, "077568a91d326c6d16ccb20d59b977866cfabd4fd7c6b4edf4239a1dbe45233a"),
      step(2, "b50211e597a0ecb779e4e6257a1ee975017b21e77d4aa59878e8c484252849d6"),
      step(3, "047ab5c76a2093aa8cef573adcd42a88004b2c650563f6bc4cf01d777a602efb"),
      step(4, "0c72fe621fbdbf902b6e4e1050f7e7309e7644cb6f99310b0a120a3727ec0610"),
      step(5, "3c8ae8986e32303240f89ead5a34f4afc260378e7df2e5b3d7f1217c622a0dfd"),
      step(6, "062b6799325df8a41baef0289eed221f5edf9a706310e72b724ef8be7b2b7a5c"),
      step(7, "1425737c2f86fdbc1f4b73c712379ad84048b79b41ee757ced81e2e3ac31b581"),
      step(8, "bcc69d36b93c3a4b35d3a613876b4c9b9916746c994ae8d1184d6fa665e3aa13")
    ]
  },
  {
    recipeId: "katsudon",
    promptSet: "katsudon-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/katsudon",
    steps: [
      step(1, "73bbfb96e0c172904415568c03e940b2651c3803e7cc07be4edabeafb50c8975"),
      step(2, "b1c54f5e5823359d4b932cc1307d57196ae7646eb5fedb39dacf2cc51a38db30"),
      step(3, "7050e3bbd78d2cb22e022c1154ad5dd16a0c7d72c375e0ecd745be1544b411f1"),
      step(4, "202b03f4e9010722f84f96b5fa95dae82886b2177f0056f2f52cf2c0343bb088"),
      step(5, "91c8dc91e6341e62187b3348a7033b8552834dc590eeefdae2cd26bffbc7672c"),
      step(6, "dc3ab3e2fc05ec63c51a3752d0fd224b9f0b936365c438c6b7fbd8bd72d6db11"),
      step(7, "c6b082a866a13deec958d0c1a75ec8385732c859fc7f7c8dafff756006007d74"),
      step(8, "b901c416a30cb15df4848c7d309c7dfc52984777564f7fbc4da2394316356a92")
    ]
  },
  {
    recipeId: "japanese-curry",
    promptSet: "japanese-curry-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/japanese-curry",
    steps: [
      step(1, "3ea005e10e23eb775f9bc596cc71333e817f38a734545e8593f5361b9c3d78d7"),
      step(2, "e1f54c221ad51e1edc5b438322b6a501a58e832cd3b6b2a1dc090b29d43338ac"),
      step(3, "6c3949a2cc6565fe4bea0ab34bae6179362e1d23dab88fe938fd89b61e7468b3"),
      step(4, "964a3369c70c736e50a0bd2dcb291793b31193a1754acece9a3e123433f88d19"),
      step(5, "a76c8e3b97180edccbba418fca885ace5913b23c3746f80b00bfc7051abf2510"),
      step(6, "ff586f541364797e178d2e8afd271b508dd4a807782779a271355f4ca508f0b0"),
      step(7, "8896d00406527db3fc3b981575e6dc9bae7bb8df565915c6176560a2034e4435"),
      step(8, "fe01487db580d5f9e2c74bb5e3b76bb457516ba59bfac7ab8e6e0dc4c27bd006")
    ]
  },
  {
    recipeId: "omurice",
    promptSet: "omurice-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-29",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    sourceDirectory: "assets/recipes/illustrations-generated/omurice",
    steps: [
      step(1, "9490b104bb3f2938a3aee8cbb35fe9dd8ebf196736eff98069b441b9c1334432"),
      step(2, "a150f47bdeaf36c6e4c4b5c1edd65a050b3797332654df1cf46359c47e116c43"),
      step(3, "f91370d08e2784d7fb505f12bd30c03d575e2d6dcda2352aa7a7a0dc3dc892d1"),
      step(4, "fa935bb66222b19f4562d87196f8a314a0c97c719b0fafabc8c43d34752dc5c3"),
      step(5, "058f44f39ecbfa73db521189ba440def81f5b59c4a1938bb1205dad729dceb4e"),
      step(6, "03b60ce03d3989f035e11002c340dccea0c9e3208f3d65e033a7e953457364bf"),
      step(7, "bd6496cea83e37fb5aab53b1fc12b82fc3d8266f86081b28de4ee04269a13a65"),
      step(8, "8ba1c2ce381b53ec35d18e395fb9c1d17737539a0893d05c9c0ee3fd56ceb821")
    ]
  }
];

export default japaneseIllustrationSetsA;
