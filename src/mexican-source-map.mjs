const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const mexicanRecipeSources = {
  'tacos-al-pastor': sources(
    'México in My Kitchen — Tacos al Pastor at Home',
    'https://www.mexicoinmykitchen.com/tacos-al-pastor/',
    'Pati Jinich — Tacos al Pastor',
    'https://patijinich.com/tacos-al-pastor/'
  ),
  'cochinita-pibil': sources(
    'México in My Kitchen — Cochinita Pibil Recipe from Yucatán',
    'https://www.mexicoinmykitchen.com/cochinita-pibil-recipe/',
    'Food Network Kitchen — Cochinita Pibil',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/cochinita-pibil-24282718'
  ),
  'mole-poblano': sources(
    'Pati Jinich — Mole Poblano: Yes You Can!',
    'https://patijinich.com/mole_poblano_de_los_angeles/',
    'México in My Kitchen — How to Make Mole Poblano',
    'https://www.mexicoinmykitchen.com/how-to-make-mole-poblano/'
  ),
  'pozole-rojo': sources(
    'México in My Kitchen — Red Pozole / Pozole Rojo',
    'https://www.mexicoinmykitchen.com/red-pozole-rojo/',
    'Pati Jinich — Pozole Rojo',
    'https://patijinich.com/es/pozole-rojo/'
  ),
  'birria-de-res': sources(
    'México in My Kitchen — Beef Birria Recipe',
    'https://www.mexicoinmykitchen.com/beef-birria-recipe/',
    'Pati Jinich — Jalisco-Style Birria',
    'https://patijinich.com/jalisco-style-birria/'
  ),
  'enchiladas-verdes': sources(
    'Pati Jinich — Enchiladas Verdes',
    'https://patijinich.com/es/enchiladas-verdes/',
    'México in My Kitchen — Green Chicken Enchiladas',
    'https://www.mexicoinmykitchen.com/swiss-green-enchiladas/'
  ),
  carnitas: sources(
    'México in My Kitchen — Pork Carnitas',
    'https://www.mexicoinmykitchen.com/pork-carnitas-mexican/',
    'Pati Jinich — Carnitas',
    'https://patijinich.com/es/carnitas/'
  ),
  'chiles-rellenos': sources(
    'México in My Kitchen — Chile Relleno Recipe',
    'https://www.mexicoinmykitchen.com/chile-relleno-recipe/',
    'Pati Jinich — Chiles Rellenos',
    'https://patijinich.com/chiles-rellenos/'
  ),
  'pescado-a-la-veracruzana': sources(
    'Food Network — Veracruz-Style Tilapia (Pescado a la Veracruzana)',
    'https://www.foodnetwork.com/recipes/marcela-valladolid/veracruz-style-tilapia-pescado-a-la-veracruzana-recipe-1921676',
    'Directo al Paladar México — Pescado a la Veracruzana',
    'https://www.directoalpaladar.com.mx/recetas/pescado-a-la-veracruzana-receta'
  ),
  'sopa-de-tortilla': sources(
    'Pati Jinich — Tortilla Soup',
    'https://patijinich.com/tortilla-soup/',
    'México in My Kitchen — Authentic Tortilla Soup',
    'https://www.mexicoinmykitchen.com/tortilla-soup-recipe/'
  ),
  'tamales-de-pollo-en-salsa-verde': sources(
    'Pati Jinich — Chicken in Green Salsa Tamales',
    'https://patijinich.com/chicken-in-green-salsa-tamal/',
    'México in My Kitchen — Chicken Tamales with Green Salsa',
    'https://www.mexicoinmykitchen.com/tamales-chicken-in-green-salsa/'
  ),
  'huevos-rancheros': sources(
    'Larousse Cocina — Huevos Rancheros',
    'https://laroussecocina.mx/receta/huevos-rancheros-2/',
    'Food Network Kitchen — Huevos Rancheros',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/huevos-rancheros-3631787'
  ),
  'chilaquiles-verdes': sources(
    'Pati Jinich — Chilaquiles Verdes',
    'https://patijinich.com/es/chilaquiles-verdes/',
    'México in My Kitchen — Chilaquiles Verdes with Chicken',
    'https://www.mexicoinmykitchen.com/chilaquiles-verdes-with-chicken/'
  )
};

export default mexicanRecipeSources;
