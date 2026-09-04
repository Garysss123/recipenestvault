import { japanesePhotoCandidates } from "./japanese-photos.mjs";
import { koreanPhotoCandidates } from "./korean-photos.mjs";
import { thaiPhotoCandidates } from "./thai-photos.mjs";
import { taiwanesePhotoCandidates } from "./taiwanese-photos.mjs";
import { indianPhotoCandidates } from "./indian-photos.mjs";

// Candidate real-food photographs. Nothing in this file is published until
// visualMatchApproved is set after a recipe-to-photo review.
const chineseRecipePhotoCandidates = [
  {
    id: "mapo-tofu", commonsTitle: "File:Authentic Mapo Tofu.jpg", title: "Authentic Mapo Tofu", author: "Sichuanfoodlover",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File:Authentic_Mapo_Tofu.jpg&oldid=1069689011", originalFile: "https://upload.wikimedia.org/wikipedia/commons/7/73/Authentic_Mapo_Tofu.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "mapo-tofu.jpg", cropPosition: "attention"
  },
  {
    id: "kung-pao-chicken", commonsTitle: "File:Kung Pao Chicken at Liqiaoshun Restaurant (20220310175424).jpg", title: "Kung Pao Chicken at Liqiaoshun Restaurant", author: "N509FZ",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File:Kung_Pao_Chicken_at_Liqiaoshun_Restaurant_(20220310175424).jpg&oldid=645487643", originalFile: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Kung_Pao_Chicken_at_Liqiaoshun_Restaurant_%2820220310175424%29.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "kung-pao-chicken.jpg", cropPosition: "attention"
  },
  {
    id: "twice-cooked-pork", commonsTitle: "File:Twice cooked pork and rice, Canard Doré, Paris 002.jpg", title: "Twice cooked pork and rice, Canard Doré, Paris", author: "Guilhem Vellut",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3ATwice%20cooked%20pork%20and%20rice%2C%20Canard%20Dor%C3%A9%2C%20Paris%20002.jpg&oldid=1064625831", originalFile: "https://upload.wikimedia.org/wikipedia/commons/8/87/Twice_cooked_pork_and_rice%2C_Canard_Dor%C3%A9%2C_Paris_002.jpg",
    license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "twice-cooked-pork.jpg", cropPosition: "attention"
  },
  {
    id: "fish-fragrant-eggplant", commonsTitle: "File:Qiezi.jpg", title: "Qiezi", author: "Popo le Chien",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3AQiezi.jpg&oldid=1187915118", originalFile: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Qiezi.jpg",
    license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: false
  },
  {
    id: "dan-dan-noodles", commonsTitle: "File:Dandanmian in Chengdu (20180218142856).jpg", title: "Dandanmian in Chengdu", author: "N509FZ",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File:Dandanmian_in_Chengdu_(20180218142856).jpg&oldid=935498056", originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/49/Dandanmian_in_Chengdu_%2820180218142856%29.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "dan-dan-noodles.jpg", cropPosition: "attention"
  },
  {
    id: "hot-and-sour-soup", commonsTitle: "File:Hot and sour soup (41368996530).jpg", title: "Hot and sour soup", author: "Joey Doll",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3AHot%20and%20sour%20soup%20(41368996530).jpg&oldid=957780431", originalFile: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Hot_and_sour_soup_%2841368996530%29.jpg",
    license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: false
  },
  {
    id: "tomato-egg-stir-fry", commonsTitle: "File:Tomato with egg.jpg", title: "Tomato with egg", author: "Kaap bij Sneeuw",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3ATomato%20with%20egg.jpg&oldid=1210227836", originalFile: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tomato_with_egg.jpg",
    license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "tomato-egg-stir-fry.jpg", cropPosition: "centre"
  },
  {
    id: "red-braised-pork", commonsTitle: "File:Hongshaorou.JPG", title: "Hongshaorou", author: "galaxyharrylion",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3AHongshaorou.JPG&oldid=1027621158", originalFile: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Hongshaorou.JPG",
    license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: false
  },
  {
    id: "lions-head-meatballs", commonsTitle: "File:Lions head meatballs in brown sauce.jpg", title: "Lions head meatballs in brown sauce", author: "Jpatokal",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3ALions%20head%20meatballs%20in%20brown%20sauce.jpg&oldid=1088094200", originalFile: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lions_head_meatballs_in_brown_sauce.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: false
  },
  {
    id: "scallion-oil-noodles", commonsTitle: "File:葱花葱油拌面.jpg", title: "葱花葱油拌面", author: "Suginami",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3A%E8%91%B1%E8%8A%B1%E8%91%B1%E6%B2%B9%E6%8B%8C%E9%9D%A2.jpg&oldid=1079259150", originalFile: "https://upload.wikimedia.org/wikipedia/commons/c/c4/%E8%91%B1%E8%8A%B1%E8%91%B1%E6%B2%B9%E6%8B%8C%E9%9D%A2.jpg",
    license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: false
  },
  {
    id: "sweet-sour-pork", commonsTitle: "File:Flickr - Sweet and Sour Pork.jpg", title: "Sweet and Sour Pork", author: "Alpha (avlxyz)",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3AFlickr%20-%20Sweet%20and%20Sour%20Pork.jpg&oldid=1254627580", originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/45/Flickr_-_Sweet_and_Sour_Pork.jpg",
    license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "sweet-sour-pork.jpg", cropPosition: "attention"
  },
  {
    id: "char-siu", commonsTitle: "Flickr: Honey Roasted Pork Char Siu", title: "Honey Roasted Pork Char Siu", author: "Aljone",
    sourcePage: "https://www.flickr.com/photos/56955207@N06/5253086814", originalFile: "https://live.staticflickr.com/5089/5253086814_a47ed95e1c_b.jpg",
    license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "char-siu.jpg", cropPosition: "attention"
  },
  {
    id: "cantonese-steamed-fish", commonsTitle: "File:Steamed fish with soy sauce.jpg", title: "Steamed fish with soy sauce", author: "Geoffreyrabbit",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3ASteamed%20fish%20with%20soy%20sauce.jpg&oldid=665241398", originalFile: "https://upload.wikimedia.org/wikipedia/commons/8/82/Steamed_fish_with_soy_sauce.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: false
  },
  {
    id: "clay-pot-rice", commonsTitle: "File:Cured Meat Claypot Rice at The Soup Kitchen (20200718171540).jpg", title: "Cured Meat Claypot Rice at The Soup Kitchen", author: "N509FZ",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File:Cured_Meat_Claypot_Rice_at_The_Soup_Kitchen_(20200718171540).jpg&oldid=900260307", originalFile: "https://upload.wikimedia.org/wikipedia/commons/3/32/Cured_Meat_Claypot_Rice_at_The_Soup_Kitchen_%2820200718171540%29.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "clay-pot-rice.jpg", cropPosition: "attention"
  },
  {
    id: "beef-chow-fun", commonsTitle: "File:Beef chow fun.jpg", title: "Beef chow fun", author: "RightCowLeftCoast",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3ABeef%20chow%20fun.jpg&oldid=1194053894", originalFile: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Beef_chow_fun.jpg",
    license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "beef-chow-fun.jpg", cropPosition: "attention"
  },
  {
    id: "wonton-soup", commonsTitle: "File:Clear Broth Wontons.jpg", title: "Clear Broth Wontons", author: "ZhengZhou",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File:Clear_Broth_Wontons.jpg&oldid=861914928", originalFile: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Clear_Broth_Wontons.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "wonton-soup.jpg", cropPosition: "attention"
  },
  {
    id: "jiaozi", commonsTitle: "File:Shui jiao.jpg", title: "Shui jiao", author: "lazy fri13th",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File:Shui_jiao.jpg&oldid=1177480242", originalFile: "https://upload.wikimedia.org/wikipedia/commons/5/53/Shui_jiao.jpg",
    license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "jiaozi.jpg", cropPosition: "attention"
  },
  {
    id: "scallion-pancakes", commonsTitle: "File:Food 蔥油餅, 福原樓, 福原樓北方小館, 北方福原樓小館, 台北 (14587573442).jpg", title: "Scallion pancakes at Fuyuan Restaurant", author: "bryan... from Taipei, Taiwan",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File:Food_%E8%94%A5%E6%B2%B9%E9%A4%85,_福原樓,_福原樓北方小館,_北方福原樓小館,_台北_(14587573442).jpg&oldid=1006329049", originalFile: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Food_%E8%94%A5%E6%B2%B9%E9%A4%85%2C_%E7%A6%8F%E5%8E%9F%E6%A8%93%2C_%E7%A6%8F%E5%8E%9F%E6%A8%93%E5%8C%97%E6%96%B9%E5%B0%8F%E9%A4%A8%2C_%E5%8C%97%E6%96%B9%E7%A6%8F%E5%8E%9F%E6%A8%93%E5%B0%8F%E9%A4%A8%2C_%E5%8F%B0%E5%8C%97_%2814587573442%29.jpg",
    license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "scallion-pancakes.jpg", cropPosition: "attention"
  },
  {
    id: "peking-duck", commonsTitle: "File:Sliced Peking Duck with traditional condiments.jpg", title: "Sliced Peking Duck with traditional condiments", author: "Daifawei",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3ASliced%20Peking%20Duck%20with%20traditional%20condiments.jpg&oldid=1142892108", originalFile: "https://upload.wikimedia.org/wikipedia/commons/3/38/Sliced_Peking_Duck_with_traditional_condiments.jpg",
    license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: true, sourceAsset: "peking-duck.jpg", cropPosition: "attention"
  },
  {
    id: "yangzhou-fried-rice", commonsTitle: "File:揚州炒飯 - 膳心小館.jpg", title: "揚州炒飯 - 膳心小館", author: "Andy Li (Onthewings)",
    sourcePage: "https://commons.wikimedia.org/w/index.php?title=File%3A%E6%8F%9A%E5%B7%9E%E7%82%92%E9%A3%AF%20-%20%E8%86%B3%E5%BF%83%E5%B0%8F%E9%A4%A8.jpg&oldid=920621804", originalFile: "https://upload.wikimedia.org/wikipedia/commons/4/4e/%E6%8F%9A%E5%B7%9E%E7%82%92%E9%A3%AF_-_%E8%86%B3%E5%BF%83%E5%B0%8F%E9%A4%A8.jpg",
    license: "CC0 1.0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", relation: "dish-reference", commercialUseVerified: true, realPhoto: true, visualMatchApproved: false
  }
];

export const recipePhotoCandidates = [
  ...chineseRecipePhotoCandidates,
  ...japanesePhotoCandidates,
  ...koreanPhotoCandidates,
  ...thaiPhotoCandidates,
  ...taiwanesePhotoCandidates,
  ...indianPhotoCandidates
];
