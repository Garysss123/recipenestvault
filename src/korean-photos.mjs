const common = {
  relation: "dish-reference",
  commercialUseVerified: true,
  realPhoto: true,
  visualMatchApproved: true
};

const ccBy2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const ccBy4 = { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" };
const ccBySa2 = { license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };
const ccBySa4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
const cc0 = { license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };

export const koreanPhotoCandidates = [
  {
    ...common, ...ccBySa4,
    id: "bibimbap", commonsTitle: "File:Bibimbap with egg.jpg", title: "Bibimbap with egg", author: "Cjkennedy15",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Bibimbap_with_egg.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Bibimbap_with_egg.jpg",
    sourceAsset: "bibimbap.jpg", sourceAssetSha256: "49af983e0cb0a4ee64e6dfd2e015056d1bbda2816cebdace35192845d8395992", cropPosition: "attention"
  },
  {
    ...common, ...cc0,
    id: "bulgogi", commonsTitle: "File:Bulgogi in Seoul.jpg", title: "Bulgogi in Seoul", author: "Brücke-Osteuropa",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Bulgogi_in_Seoul.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Bulgogi_in_Seoul.jpg",
    sourceAsset: "bulgogi.jpg", sourceAssetSha256: "73e5c029dd7d58e7c941a7ff46baec58a0c7591b37695c03686509d708da6cc2", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "galbi", commonsTitle: "File:Korean.food-Galbi-01.jpg", title: "Korean.food-Galbi-01", author: "star5112",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean.food-Galbi-01.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/d/de/Korean.food-Galbi-01.jpg",
    sourceAsset: "galbi.jpg", sourceAssetSha256: "b1b41a4b7cb2ff054924c8577bd9ba03184fcc27fc10aaf236af2930a9b0b2cc", cropPosition: "attention"
  },
  {
    ...common, ...cc0,
    id: "samgyeopsal", commonsTitle: "File:Samgyeopsal-gui.jpg", title: "Samgyeopsal-gui", author: "jinsoo jang",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Samgyeopsal-gui.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/7/77/Samgyeopsal-gui.jpg",
    sourceAsset: "samgyeopsal.jpg", sourceAssetSha256: "e00f04e64babdf3c206ee39a1fea207c1fda265202610efa937b8cc4dfd38888", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "kimchi-jjigae", commonsTitle: "File:Korean.food-Kimchi jjigae-01.jpg", title: "Korean.food-Kimchi jjigae-01", author: "foolishmoon2",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean.food-Kimchi_jjigae-01.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Korean.food-Kimchi_jjigae-01.jpg",
    sourceAsset: "kimchi-jjigae.jpg", sourceAssetSha256: "98e0e7dcbdaded0c8bfd3d9bb9560ce6dad42095470008a21868fdc39ee2769d", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "doenjang-jjigae", commonsTitle: "File:Korean stew-Doenjang jjigae-01.jpg", title: "Korean stew-Doenjang jjigae-01", author: "Alpha",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean_stew-Doenjang_jjigae-01.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Korean_stew-Doenjang_jjigae-01.jpg",
    sourceAsset: "doenjang-jjigae.jpg", sourceAssetSha256: "3662f498eebc13314c18a9cd81078df7f4332d944d96f4626575fcb8a36a1a2a", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "sundubu-jjigae", commonsTitle: "File:Korean stew-Sundubu jjigae-05.jpg", title: "Korean stew-Sundubu jjigae-05", author: "titanium22",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean_stew-Sundubu_jjigae-05.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/3/33/Korean_stew-Sundubu_jjigae-05.jpg",
    sourceAsset: "sundubu-jjigae.jpg", sourceAssetSha256: "b449b0528b267f5bbb960b71788f4ae942c25f9c53f2714174248cf6d461a40a", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa4,
    id: "tteokbokki", commonsTitle: "File:Tteokbokki in Handan 1.jpg", title: "Tteokbokki in Handan 1", author: "我乃野云鹤",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Tteokbokki_in_Handan_1.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/5/51/Tteokbokki_in_Handan_1.jpg",
    sourceAsset: "tteokbokki.jpg", sourceAssetSha256: "4c06b32d9c85f579e911bbc752bb6683abd65582db0b48bbda737db004b27530", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "japchae", commonsTitle: "File:Korean cuisine-Japchae-04.jpg", title: "Korean cuisine-Japchae-04", author: "Alan Chan",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean_cuisine-Japchae-04.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Korean_cuisine-Japchae-04.jpg",
    sourceAsset: "japchae.jpg", sourceAssetSha256: "34fb6022a6eb0382386e4943bbec75bf9ae7b37fd4dc0cb3984d6d1e2b4830df", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "kimchi-fried-rice", commonsTitle: "File:Caramelized kimchi fried rice (8573504752).jpg", title: "Caramelized kimchi fried rice (8573504752)", author: "jeffreyw",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Caramelized_kimchi_fried_rice_(8573504752).jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Caramelized_kimchi_fried_rice_%288573504752%29.jpg",
    sourceAsset: "kimchi-fried-rice.jpg", sourceAssetSha256: "929ee9e48a8f7c59126f531d20eeec2f995734855b3f65c224a027c6e08c6b02", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "haemul-pajeon", commonsTitle: "File:Korean pancake-Pajeon-03.jpg", title: "Korean pancake-Pajeon-03", author: "Jun Ohwada",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean_pancake-Pajeon-03.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Korean_pancake-Pajeon-03.jpg",
    sourceAsset: "haemul-pajeon.jpg", sourceAssetSha256: "c6e17a33d1f5fff73dedda7a75ca1a71a9cc08e5dffb9de228c964ea945d4541", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "kimchi-jeon", commonsTitle: "File:Kimchi Jeon, L'Arbre de Sel, Montparnasse, Paris 001.jpg", title: "Kimchi Jeon, L'Arbre de Sel, Montparnasse, Paris 001", author: "Guilhem Vellut",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Kimchi_Jeon,_L%27Arbre_de_Sel,_Montparnasse,_Paris_001.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/5/53/Kimchi_Jeon%2C_L%27Arbre_de_Sel%2C_Montparnasse%2C_Paris_001.jpg",
    sourceAsset: "kimchi-jeon.jpg", sourceAssetSha256: "86f7ed8bd307aee81434d47b7f36b09c4b6036dfa56d0695c2c9715e0bfb6135", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "mandu", commonsTitle: "File:Jjin-mandu 3.jpg", title: "Jjin-mandu 3", author: "Chloe Lim",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Jjin-mandu_3.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/9/96/Jjin-mandu_3.jpg",
    sourceAsset: "mandu.jpg", sourceAssetSha256: "8463d57ccca3db2e3a7182f0d455cdfca020ab3713bceb16d4a48e723fbc8ff6", cropPosition: "attention"
  },
  {
    ...common, ...cc0,
    id: "gimbap", commonsTitle: "File:Gimbap.jpg", title: "Gimbap", author: "ProjectManhattan",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Gimbap.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Gimbap.jpg",
    sourceAsset: "gimbap.jpg", sourceAssetSha256: "9e7b9639374c5e56d5a4cbb65c885f6dfb172e2713d61152413064a6cfdc7c4f", cropPosition: "attention"
  },
  {
    ...common, ...ccBy4,
    id: "dakgalbi", commonsTitle: "File:닭갈비 (조리후).jpg", title: "닭갈비 (조리후)", author: "Sadopaul",
    sourcePage: "https://commons.wikimedia.org/wiki/File:%EB%8B%AD%EA%B0%88%EB%B9%84_(%EC%A1%B0%EB%A6%AC%ED%9B%84).jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/7/7a/%EB%8B%AD%EA%B0%88%EB%B9%84_%28%EC%A1%B0%EB%A6%AC%ED%9B%84%29.jpg",
    sourceAsset: "dakgalbi.jpg", sourceAssetSha256: "1dfd0d6a5d67fa9b2160ea5df231bdbd1d4607bbd508f649e2c6b7902ec1a519", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "jjajangmyeon", commonsTitle: "File:Jajangmyeon by KFoodaddict.jpg", title: "Jajangmyeon by KFoodaddict", author: "KFoodaddict",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Jajangmyeon_by_KFoodaddict.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/49/Jajangmyeon_by_KFoodaddict.jpg",
    sourceAsset: "jjajangmyeon.jpg", sourceAssetSha256: "67fa1d21ee479eda6317c30243a1314ce95646efdbcaf9aec36df703b387917e", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "mul-naengmyeon", commonsTitle: "File:Mul-naengmyeon 2.jpg", title: "Mul-naengmyeon 2", author: "chomjong",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Mul-naengmyeon_2.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Mul-naengmyeon_2.jpg",
    sourceAsset: "mul-naengmyeon.jpg", sourceAssetSha256: "5747dd75fd8fa1ef6aa2da806a7cfecd05847a337cb92722f812a39aca4eacef", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "kalguksu", commonsTitle: "File:Korean.noodle-Kalguksu-01.jpg", title: "Korean.noodle-Kalguksu-01", author: "jslander",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean.noodle-Kalguksu-01.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Korean.noodle-Kalguksu-01.jpg",
    sourceAsset: "kalguksu.jpg", sourceAssetSha256: "5ae51fbbbd036cbb3f6b08d6114947b1661a81cc57f94bdd3e6a1203d97c6c22", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "miyeok-guk", commonsTitle: "File:Korean soup-Miyeokguk-01.jpg", title: "Korean soup-Miyeokguk-01", author: "karendotcom127",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean_soup-Miyeokguk-01.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Korean_soup-Miyeokguk-01.jpg",
    sourceAsset: "miyeok-guk.jpg", sourceAssetSha256: "8c1a9dc313a45a3576b88cb7e4317c3b4a71c96250c5aaed711a3147e69eed05", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "gyeran-jjim", commonsTitle: "File:Korean.Banchan-Gyeran.jjim-01.jpg", title: "Korean.Banchan-Gyeran.jjim-01", author: "stuart_spivack",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean.Banchan-Gyeran.jjim-01.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Korean.Banchan-Gyeran.jjim-01.jpg",
    sourceAsset: "gyeran-jjim.jpg", sourceAssetSha256: "ba3293530e43b45fbef67eb6251e957798346833e146daea010afd1202c18f2a", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "bossam", commonsTitle: "File:Korean.food-Bossam-02.jpg", title: "Korean.food-Bossam-02", author: "ayustety",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Korean.food-Bossam-02.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/48/Korean.food-Bossam-02.jpg",
    sourceAsset: "bossam.jpg", sourceAssetSha256: "492ffae6a5210989a2bd1fadb69a666f5018d5ca67dc5673a03d4823fef44806", cropPosition: "attention"
  }
];
