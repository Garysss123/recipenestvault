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
  )
};

export default spanishRecipeSources;
