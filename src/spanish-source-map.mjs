const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const spanishRecipeSources = {
  'paella-valenciana': sources(
    'Spain.info — Paella',
    'https://www.spain.info/en/recipe/paella/',
    'Foods & Wines from Spain — International Paella Valenciana Competition recipe',
    'https://www.foodswinesfromspain.com/en/food/news/2024/september/paella-contest-sueca-2024'
  ),
  'tortilla-espanola': sources(
    'Spain.info — Potato omelette',
    'https://www.spain.info/en/recipe/potato-omelette/',
    'Foods & Wines from Spain — Spanish Potato Omelet',
    'https://www.foodswinesfromspain.com/en/fws-academy/recipes/2017/october/video-recipe--spanish-potato-omelet'
  ),
  'gazpacho-andaluz': sources(
    'Spain.info — Gazpacho',
    'https://www.spain.info/en/recipe/gazpacho/',
    'Good Food — Gazpacho',
    'https://www.bbcgoodfood.com/recipes/gazpacho'
  ),
  'salmorejo-cordobes': sources(
    'Spain.info — Salmorejo',
    'https://www.spain.info/en/recipe/salmorejo/',
    'Good Food — Salmorejo',
    'https://www.bbcgoodfood.com/recipes/salmorejo-0'
  ),
  'patatas-bravas': sources(
    'Good Food — Patatas bravas',
    'https://www.bbcgoodfood.com/recipes/patatas-bravas-0',
    'Saveur — Patatas Bravas',
    'https://www.saveur.com/article/recipes/patatas-bravas/'
  ),
  'croquetas-de-jamon': sources(
    'Foods & Wines from Spain — Croquetas de Jamón',
    'https://www.foodswinesfromspain.com/en/fws-academy/recipes/2024/may/croquetas-de-jamon',
    'Spanish Sabores — Croquetas de Jamón Serrano',
    'https://spanishsabores.com/croquetas-de-jamon-serrano-recipe-ham-croquettes/comment-page-1/'
  ),
  'gambas-al-ajillo': sources(
    'Good Food — Gambas al ajillo',
    'https://www.bbcgoodfood.com/recipes/gambas-al-ajillo',
    'Saveur — Gambas Al Ajillo',
    'https://www.saveur.com/article/Recipes/Chile-Garlic-Shrimp/'
  ),
  'pan-con-tomate': sources(
    'Saveur — Pan con Tomate',
    'https://www.saveur.com/article/recipes/spanish-style-toast-with-tomato/',
    'Spanish Sabores — Pan con Tomate',
    'https://spanishsabores.com/super-simple-pan-con-tomate-recipe//'
  ),
  'fideua': sources(
    'Spain.info — Fideuá',
    'https://www.spain.info/en/recipe/fideua/',
    'Saveur — Valencian Pasta (Fideuà)',
    'https://www.saveur.com/article/Recipes/Valencian-Pasta--/'
  ),
  'cocido-madrileno': sources(
    'Spain.info — Madrid Cocido',
    'https://www.spain.info/en/recipe/cocido-madrileno/',
    'Cocinatis — Cocido madrileño tradicional',
    'https://www.cocinatis.com/receta/cocido-madrileno.html'
  ),
  'fabada-asturiana': sources(
    'Spain.info — Fabada',
    'https://www.spain.info/en/recipe/fabada/',
    'Saveur — Fabada Asturiana',
    'https://www.saveur.com/story/recipes/fabada-asturiana-white-beans-with-ham-saffron-sausages/'
  ),
  'pulpo-a-la-gallega': sources(
    'Spain.info — Octopus a feira',
    'https://www.spain.info/en/recipe/pulpo-feira/',
    'GialloZafferano — Galician-style Octopus',
    'https://www.giallozafferano.com/recipes/galician-style-octopus-pulpo-a-la-gallega.html'
  )
};

export default spanishRecipeSources;
