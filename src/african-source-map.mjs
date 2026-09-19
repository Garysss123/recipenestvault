const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const africanRecipeSources = {
  'nigerian-jollof-rice': sources('All Nigerian Recipes — Nigerian Jollof Rice', 'https://www.allnigerianrecipes.com/rice/nigerian-jollof-rice/', 'Demand Africa — African and Caribbean Recipes: Jollof Rice', 'https://demandafrica.com/wp-content/uploads/2017/06/25-African-and-Caribbean-Recipes.pdf'),
  thieboudienne: sources('Saveur — Senegalese Fish and Rice (Thiéboudienne)', 'https://www.saveur.com/article/Recipes/Senegal-Fish-Rice/', 'UNESCO Intangible Cultural Heritage — Ceebu Jën, Culinary Art of Senegal', 'https://ich.unesco.org/en/RL/ceebu-jen-a-culinary-art-of-senegal-01748'),
  'nigerian-egusi-soup': sources('All Nigerian Recipes — Nigerian Egusi Soup', 'https://www.allnigerianrecipes.com/soups/egusi-soup/', 'Nkechi Ajaeroh — Nigerian Egusi Soup', 'https://nkechiaeroh.com/recipes/nigerian-soup/nigerian-egusi-soup-recipe-african-soup/'),
  kelewele: sources('Demand Africa — Ghanaian Kelewele', 'https://demandafrica.com/food/recipes/kelewele-ghana-spicy-fried-plantains/', 'Ghana News Agency — Kelewele, Ghanaian Street Cuisine', 'https://gna.org.gh/2026/04/kelewele-a-spicy-heartbeat-ghanaian-street-cuisine-often-loyal-to-night-travelers-and-wanderers/'),
  maafe: sources('Food Network — Mafe (Peanut Butter Stew)', 'https://www.foodnetwork.com/recipes/mafe-peanut-butter-stew-recipe-1970970', 'Le Monde — Chicken Mafé and Senegalese Cuisine', 'https://www.lemonde.fr/en/lifestyle/article/2025/03/18/chicken-mafe-bissap-juice-and-keumeukh-fritters-sharing-senegal-s-cuisine_6739264_37.html'),
  'doro-wat': sources('Food Network — Doro Wat (Stewed Chicken with Berbere and Eggs)', 'https://www.foodnetwork.com/fnk/recipes/doro-wat-stewed-chicken-legs-with-berbere-and-eggs-10035303', 'Koki Afrique — Ethiopian Doro Wat', 'https://kokiafrique.com/en/dishes/doro-wat/'),
  'shiro-wat': sources('Delina — Ethiopian and Eritrean Shiro Wot', 'https://www.delinaonline.com/shiro-wot-recipe', 'All About Ethiopia — Shiro Wat Recipe', 'https://www.allaboutethiopia.com/2026/08/shiro-wat-recipe.html'),
  injera: sources('FAO — Tef Injera Preparation', 'https://www.fao.org/fileadmin/user_upload/inpho/docs/Post_Harvest_Compendium_-_TEF.pdf', 'ANU Museum — Traditional Ethiopian Injera Recipe', 'https://foodish.anumuseum.org.il/en/recipe/ethiopian-injera/'),
  'nyama-choma': sources('The Standard — Nyama Choma at Home', 'https://www.standardmedia.co.ke/food/article/2001549873/easy-recipe-nyama-choma-at-home', 'Kenya Milk Depot — Nyama Choma Recipe', 'https://kenyamilk.com/nyama-choma-recipe/'),
  'tanzanian-pilau': sources('Peace Corps Tanzania — Kumbe, I Can Cook', 'https://www.maktaba.org/download/file/772/Kumbe_i_can_cook_Peace_corps_tanzania.pdf', 'Koki Afrique — Tanzanian Pilau', 'https://kokiafrique.com/en/dishes/pilau/'),
  bobotie: sources('BBC Good Food — Bobotie', 'https://www.bbcgoodfood.com/recipes/bobotie', 'Wines of South Africa — Cape Malay Bobotie', 'https://www.wosa.co.za/Multimedia/Cape-Recipes/BOBOTIE/'),
  'bunny-chow': sources('South African Tourism — Bunny Chow 101', 'https://www.southafrica.net/uk/en/travel/article/bunny-chow-101', 'MasterChef South Africa — Bunny Chow', 'https://masterchef.co.za/bunny-chow.php'),
  'malva-pudding': sources('Penguin Random House South Africa — Warren Mendes’s Malva Pudding', 'https://www.penguinrandomhouse.co.za/warren-mendess-malva-pudding/', 'WineMag — Traditional Malva Pudding', 'https://winemag.co.za/food/recipe/malva-pudding/')
};
