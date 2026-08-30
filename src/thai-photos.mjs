const common = {
  relation: "dish-reference",
  commercialUseVerified: true,
  realPhoto: true,
  visualMatchApproved: true
};

const cc0 = { license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/" };
const ccBy2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const ccBy25 = { license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5/" };
const ccBy4 = { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" };
const ccBySa2 = { license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };
const ccBySa3 = { license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" };
const ccBySa4 = { license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };

export const thaiPhotoCandidates = [
  {
    ...common, ...ccBySa4,
    id: "pad-thai", commonsTitle: "File:DFC 2078 A plate of shrimp pad Thai garnished with lime bean sprouts scallions and crushed peanuts.jpg", title: "Shrimp Pad Thai with lime, bean sprouts, scallions, and crushed peanuts", author: "PattayaPatrol",
    sourcePage: "https://commons.wikimedia.org/wiki/File:DFC_2078_A_plate_of_shrimp_pad_Thai_garnished_with_lime_bean_sprouts_scallions_and_crushed_peanuts.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/8/8a/DFC_2078_A_plate_of_shrimp_pad_Thai_garnished_with_lime_bean_sprouts_scallions_and_crushed_peanuts.jpg",
    sourceAsset: "pad-thai.jpg", sourceAssetSha256: "c290ef417c728c21d2bf2d63a9610bf168077dde87a40824ff957a5f9c5edef8", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "tom-yum-goong", commonsTitle: "File:Tom yum goong-01.jpg", title: "Tom yum goong-01", author: "kisocci",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Tom_yum_goong-01.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tom_yum_goong-01.jpg",
    sourceAsset: "tom-yum-goong.jpg", sourceAssetSha256: "c64fc28099eedcd4ccdd4303750193309d265374182314e7353f259e0ca3656b", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa3,
    id: "green-curry-chicken", commonsTitle: "File:Thai green chicken curry and roti.jpg", title: "Thai green chicken curry and roti", author: "Takeaway",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Thai_green_chicken_curry_and_roti.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Thai_green_chicken_curry_and_roti.jpg",
    sourceAsset: "green-curry-chicken.jpg", sourceAssetSha256: "c18256d8f9485d92dbd12d520d347653c8a2e24cb5b694eed59b4e5c3bbd166f", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa4,
    id: "massaman-curry", commonsTitle: "File:Massaman curry, Bang Kapi, Bangkok.jpg", title: "Massaman curry, Bang Kapi, Bangkok", author: "Vee Satayamas",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Massaman_curry,_Bang_Kapi,_Bangkok.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Massaman_curry%2C_Bang_Kapi%2C_Bangkok.jpg",
    sourceAsset: "massaman-curry.jpg", sourceAssetSha256: "70b327eee4127de65a4400fa139b332c8307557c8b008cc93dbcd2fdb35520db", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa3,
    id: "pad-kra-pao", commonsTitle: "File:Kraphao mu khai dao.jpg", title: "Kraphao mu khai dao", author: "Takeaway",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Kraphao_mu_khai_dao.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Kraphao_mu_khai_dao.jpg",
    sourceAsset: "pad-kra-pao.jpg", sourceAssetSha256: "c907506a06c082245759dc44ff3619e2b4bdbdeb31f6a12f886a56a6591b58d4", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa3,
    id: "som-tam", commonsTitle: "File:Som tam thai.JPG", title: "Som tam thai", author: "Takeaway",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Som_tam_thai.JPG",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Som_tam_thai.JPG",
    sourceAsset: "som-tam.jpg", sourceAssetSha256: "e01fa1a523e4fd5ff7ebb7f44eb21d6d79052de75350500fc11b1e562f2a8058", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa4,
    id: "khao-pad", commonsTitle: "File:Crab fried rice.jpg", title: "Crab fried rice", author: "Suiren2022",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Crab_fried_rice.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Crab_fried_rice.jpg",
    sourceAsset: "khao-pad.jpg", sourceAssetSha256: "e5c2c112ab649100061588253bdbb0dce5310c284c97c4b18a608793d556a577", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "khao-man-gai", commonsTitle: "File:Khao man gai.jpg", title: "Khao man gai", author: "stu_spivack",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Khao_man_gai.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Khao_man_gai.jpg",
    sourceAsset: "khao-man-gai.jpg", sourceAssetSha256: "2d359d58b21d0adee0ac91ad02f4770ecc1ead0dc1511b2caa9827fb8efb2a53", cropPosition: "attention"
  },
  {
    ...common, ...ccBy4,
    id: "mango-sticky-rice", commonsTitle: "File:Mango sticky rice served in Thailand.jpg", title: "Mango sticky rice served in Thailand", author: "Arthur Taksin",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Mango_sticky_rice_served_in_Thailand.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/7/75/Mango_sticky_rice_served_in_Thailand.jpg",
    sourceAsset: "mango-sticky-rice.jpg", sourceAssetSha256: "82b8fb8bb90c960eb163e80ae7ada8c67ac4128c7aaa47879a82ee1d287aa6f6", cropPosition: "south"
  },
  {
    ...common, ...ccBySa4,
    id: "larb-moo", commonsTitle: "File:Lap mu.JPG", title: "Lap mu", author: "Takeaway",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Lap_mu.JPG",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Lap_mu.JPG",
    sourceAsset: "larb-moo.jpg", sourceAssetSha256: "f06d66bd0cc56fe340986f781564a1bdc55f3bca3d5f5b32856bbc5917fb81c5", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "pad-see-ew", commonsTitle: "File:Pad See Ew.jpg", title: "Pad See Ew", author: "Jose Nicdao",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Pad_See_Ew.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Pad_See_Ew.jpg",
    sourceAsset: "pad-see-ew.jpg", sourceAssetSha256: "d3cc26e86acdd5a8e5e3905735359f6d5e5e8ac31e925f4b5ec222e2726c28ff", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa3,
    id: "khao-soi", commonsTitle: "File:Khao soi Chiang Mai.jpg", title: "Khao soi Chiang Mai", author: "Takeaway",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Khao_soi_Chiang_Mai.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Khao_soi_Chiang_Mai.jpg",
    sourceAsset: "khao-soi.jpg", sourceAssetSha256: "49e648349312b66a9ad185a8f1db4b84c0f64872e51042c05acebd16f606e5db", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "tom-kha-gai", commonsTitle: "File:Flickr preppybyday 4711943668--Tom kha gai.jpg", title: "Tom kha gai", author: "Evan Joshua Swigart (TheCulinaryGeek)",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Flickr_preppybyday_4711943668--Tom_kha_gai.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flickr_preppybyday_4711943668--Tom_kha_gai.jpg",
    sourceAsset: "tom-kha-gai.jpg", sourceAssetSha256: "bf854638268967295573d7464daf1a24bf56261aaafc53a76866854cb2297708", cropPosition: "attention"
  },
  {
    ...common, ...ccBy2,
    id: "panang-curry", commonsTitle: "File:Panang curry (42943883862).jpg", title: "Panang curry", author: "Vee Satayamas",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Panang_curry_(42943883862).jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Panang_curry_%2842943883862%29.jpg",
    sourceAsset: "panang-curry.jpg", sourceAssetSha256: "5ac8d32c3ac77c8ebb0129bcbc2d64fa6f4cdd67d1238a1c98eec3bd0ec8e947", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa3,
    id: "red-curry-pork", commonsTitle: "File:Kaeng phet mu.jpg", title: "Kaeng phet mu", author: "Takeaway",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Kaeng_phet_mu.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/2/29/Kaeng_phet_mu.jpg",
    sourceAsset: "red-curry-pork.jpg", sourceAssetSha256: "73d1567c435a7d7414376a9420fab0eaaf2193668c71f13094ee8124c808ed3c", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa4,
    id: "moo-satay", commonsTitle: "File:Pork satay 2022.jpg", title: "Pork satay 2022", author: "Athikhun.suw",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Pork_satay_2022.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pork_satay_2022.jpg",
    sourceAsset: "moo-satay.jpg", sourceAssetSha256: "e26a1f68db4fb3442842729b0e6cdd05577a1ee2c7e54b042bef07a05ccc2a54", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa4,
    id: "moo-ping", commonsTitle: "File:Mu ping.jpg", title: "Mu ping", author: "Phoebus 28",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Mu_ping.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/43/Mu_ping.jpg",
    sourceAsset: "moo-ping.jpg", sourceAssetSha256: "b3c2ddd013ebf922809c618839649ca2797c5be80248d6eb7e5302a7a53dc796", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa3,
    id: "gai-yang", commonsTitle: "File:Gai yang Khuukam.JPG", title: "Gai yang Khuukam", author: "Nissy-KITAQ",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Gai_yang_Khuukam.JPG",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Gai_yang_Khuukam.JPG",
    sourceAsset: "gai-yang.jpg", sourceAssetSha256: "7b5d61d76be336e5fb1c528dda5cdf8b0393da9ce77f008cf2cf0bc54309416c", cropPosition: "attention"
  },
  {
    ...common, ...ccBySa2,
    id: "tod-mun-pla", commonsTitle: "File:Thai fish cakes (13982993054).jpg", title: "Thai fish cakes", author: "pelican",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Thai_fish_cakes_(13982993054).jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/0/03/Thai_fish_cakes_%2813982993054%29.jpg",
    sourceAsset: "tod-mun-pla.jpg", sourceAssetSha256: "6acd6baef7bcbda3983b232d93aa5e554f906477abd26b85a391a0fdcb1d02a5", cropPosition: "attention"
  },
  {
    ...common, ...cc0,
    id: "boat-noodles", commonsTitle: "File:Bowl of boat noodles.jpg", title: "Bowl of boat noodles", author: "Emppowering",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Bowl_of_boat_noodles.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/0/06/Bowl_of_boat_noodles.jpg",
    sourceAsset: "boat-noodles.jpg", sourceAssetSha256: "08d0bdd8bf0ec3806fa8e9ac341e182315b1d514f3251af5dfaa99731a841239", cropPosition: "south"
  },
  {
    ...common, ...ccBySa3,
    id: "pineapple-fried-rice", commonsTitle: "File:Thai-style Fried Rice in Pineapple.jpg", title: "Thai-style Fried Rice in Pineapple", author: "Ceeseven",
    sourcePage: "https://commons.wikimedia.org/wiki/File:Thai-style_Fried_Rice_in_Pineapple.jpg",
    originalFile: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Thai-style_Fried_Rice_in_Pineapple.jpg",
    sourceAsset: "pineapple-fried-rice.jpg", sourceAssetSha256: "a31f0724ec078b911dbc57ee6f668d8aad037dc38a9a51aecda47b6930b4d9f5", cropPosition: "attention"
  }
];
