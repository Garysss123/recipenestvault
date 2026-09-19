const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const canadianRecipeSources = {
  poutine: sources(
    'Dairy Farmers of Canada — Traditional Poutine',
    'https://dairyfarmersofcanada.ca/en/canadian-goodness/recipes/traditional-poutine',
    'Canadian Living Test Kitchen — The Ultimate Poutine',
    'https://www.canadianliving.com/food/lunch-and-dinner/recipe/the-ultimate-poutine'
  ),
  tourtiere: sources(
    'Parks Canada — Fort Langley Tourtière',
    'https://parks.canada.ca/culture/gourmand-gourmet/recette-recipe08',
    'Canadian Living Test Kitchen — Tourtiere recipe and instructions',
    'https://www.canadianliving.com/food/food-tips/recipe/tourtiere-recipe-and-instructions'
  ),
  'montreal-smoked-meat-sandwich': sources(
    'Levitts — Classic Montreal-Style Smoked Meat Sandwich',
    'https://www.levitts.ca/en/recipe/classic-montreal-style-smoked-meat-sandwich',
    'HexClad Canada — Montreal-Style Smoked Meat Sandwiches',
    'https://hexclad.ca/blogs/recipes/montreal-style-smoked-meat-sandwiches'
  ),
  'montreal-style-bagels': sources(
    'King Arthur Baking — Montreal Bagels',
    'https://www.kingarthurbaking.com/recipes/montreal-bagels-recipe',
    'Great Tastes of Manitoba — Montreal-style Bagels',
    'https://greattastesmb.ca/recipe/montreal-style-bagels/'
  ),
  'butter-tarts': sources(
    'Canadian Living Test Kitchen — Best Butter Tarts',
    'https://www.canadianliving.com/food/baking-and-desserts/recipe/best-butter-tarts',
    'Food Day Canada — Butter Tarts',
    'https://www.fooddaycanada.ca/recipes/butter-tarts'
  ),
  'nanaimo-bars': sources(
    'City of Nanaimo — Nanaimo Bar Recipe',
    'https://www.nanaimo.ca/about-nanaimo/nanaimo-bars',
    'Canadian Living Test Kitchen — Nanaimo Bars',
    'https://www.canadianliving.com/food/baking-and-desserts/recipe/nanaimo-bars-18'
  ),
  'peameal-bacon-sandwich': sources(
    'Foodland Ontario — Peameal Bacon Sandwich',
    'https://www.ontario.ca/foodland/recipes/peameal-bacon-sandwich-0',
    'LCBO — Peameal Bacon on a Bun',
    'https://www.lcbo.com/en/recipe/peameal-bacon-on-a-bun/201104030'
  ),
  'halifax-donair': sources(
    'Jo Cooks — Halifax Donair',
    'https://www.jocooks.com/recipes/halifax-donair/',
    'Just Plain Cooking — Authentic Halifax Donair',
    'https://justplaincooking.ca/recipe/halifax-donair/'
  ),
  'jiggs-dinner': sources(
    'Parks Canada — Jiggs Dinner, Ryan Premises National Historic Site',
    'https://parks.canada.ca/culture/gourmand-gourmet/recette-recipe76',
    "Bonita's Kitchen — Jiggs Dinner and Peas Pudding",
    'https://www.bonitaskitchen.com/recipe/jiggs-dinner-and-peas-pudding-traditional-newfoundland/'
  ),
  toutons: sources(
    "Rock Recipes — Newfoundland Toutons",
    'https://www.rockrecipes.com/newfoundland-toutons/',
    "Bonita's Kitchen — Traditional Newfoundland Toutons and Frozies",
    'https://www.bonitaskitchen.com/recipe/traditional-newfoundland-toutons-frozies/'
  ),
  'saskatoon-berry-pie': sources(
    'Canadian Food Focus — Classic Canadian Dish: Saskatoon Pie',
    'https://canadianfoodfocus.org/food/classic-canadian-recipes-saskatoon-pie/',
    'Canadian Living — Saskatoon Berry Pie',
    'https://www.canadianliving.com/food/article/saskatoon-berry-pie'
  ),
  'maple-taffy': sources(
    'Maple from Canada — Maple Taffy',
    'https://maplefromcanada.ca/recipes/maple-taffy/',
    'Maple from Canada Kids — Magical Maple Taffy on Snow',
    'https://kids.maplefromcanada.ca/cook/recipes/magical-maple-taffy-on-snow/'
  ),
  'campfire-bannock': sources(
    'Parks Canada — Campfire Bannock, Rocky Mountain House National Historic Site',
    'https://parks.canada.ca/culture/gourmand-gourmet/recette-recipe66',
    'Ontario Parks — Less-Mess Bannock',
    'https://www.ontarioparks.ca/ambassadors/campingessentials/campingrecipes/less-mess-bannock'
  ),
  'blueberry-grunt': sources(
    'Taste of Nova Scotia — Nova Scotia Blueberry Grunt',
    'https://tasteofnovascotia.com/recipes/nova-scotia-blueberry-grunt/',
    'Restaurant Association of Nova Scotia — Blueberry Grunt',
    'https://rans.ca/recipe/976/'
  )
};
