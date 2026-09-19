const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const middleEasternRecipeSources = {
  hummus: sources('The Mediterranean Dish — Hummus Recipe', 'https://www.themediterraneandish.com/how-to-make-hummus/', 'BBC Good Food — Hummus', 'https://www.bbcgoodfood.com/recipes/hummus'),
  falafel: sources('The Mediterranean Dish — Easy Authentic Falafel', 'https://www.themediterraneandish.com/how-to-make-falafel/', 'BBC Good Food — Easy Falafel', 'https://www.bbcgoodfood.com/recipes/spicy-falafels'),
  mujadara: sources('The Mediterranean Dish — Mujadara', 'https://www.themediterraneandish.com/mujadara-lentils-and-rice-with-crispy-onions/', 'The Kitchn — Mujadara', 'https://www.thekitchn.com/mujadara-recipe-23149573'),
  tabbouleh: sources('The Mediterranean Dish — Tabouli Salad', 'https://www.themediterraneandish.com/tabouli-salad/', 'BBC Good Food — Tabbouleh', 'https://www.bbcgoodfood.com/recipes/tabbouleh'),
  fattoush: sources('The Mediterranean Dish — Fattoush Salad', 'https://www.themediterraneandish.com/fattoush-salad/', 'BBC Good Food — Spring Green Fattoush', 'https://www.bbcgoodfood.com/recipes/spring-green-fattoush/'),
  'chicken-shawarma': sources('The Mediterranean Dish — Chicken Shawarma', 'https://www.themediterraneandish.com/chicken-shawarma-recipe/', 'BBC Food — Oven-cooked Chicken Shawarma', 'https://www.bbc.co.uk/food/recipes/oven-cooked_chicken_04728'),
  'iraqi-lamb-kofta': sources('The Mediterranean Dish — Kofta Kebabs', 'https://www.themediterraneandish.com/kofta-kebab-recipe/', 'BBC Good Food Middle East — Iraqi Lamb Kofta Kebabs', 'https://www.bbcgoodfoodme.com/recipes/iraqi-lamb-kofta-kebabs/'),
  'zaatar-manakish': sources('The Mediterranean Dish — Za’atar Manaqish', 'https://www.themediterraneandish.com/zaatar-manaqish-recipe/', 'Zaatar and Zaytoun — Za’atar Manakish', 'https://zaatarandzaytoun.com/zaatar-manakish/'),
  shakshuka: sources('The Mediterranean Dish — Shakshuka', 'https://www.themediterraneandish.com/shakshuka-recipe/', 'BBC Good Food — Shakshuka', 'https://www.bbcgoodfood.com/recipes/shakshuka'),
  fesenjan: sources('The Washington Post — Fesenjan', 'https://www.washingtonpost.com/recipes/fesenjan/', 'Persian Mama — Khoresh Fesenjan', 'https://persianmama.com/chicken-in-walnut-pomegranate-sauce-khoresht-fesenjan/'),
  'mercimek-corbasi': sources('The Mediterranean Dish — Turkish Lentil Soup', 'https://www.themediterraneandish.com/turkish-lentil-soup/', 'Republic of Türkiye Ministry of Culture and Tourism — Red Lentil Soup', 'https://www.ktb.gov.tr/EN-99141/red-lentil-soup.html'),
  koshari: sources('The Mediterranean Dish — Egyptian Koshari', 'https://www.themediterraneandish.com/egyptian-koshari-recipe/', 'American Culinary Federation — Lentil and Rice Pilaf (Koshari)', 'https://www.acfchefs.org/Downloads/Sizzle/2013Winter.pdf'),
  baklava: sources('BBC Good Food Middle East — Pistachio, Almond, Lemon and Rose Baklava', 'https://www.bbcgoodfoodme.com/recipes/pistachio-almond-lemon-rose-baklava/', 'Food Network Kitchen — Pistachio Baklava', 'https://www.foodnetwork.com/recipes/food-network-kitchen/pistachio-baklava-14024677')
};
