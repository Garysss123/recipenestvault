const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const brazilianRecipeSources = {
  feijoada: sources(
    'Olivia\'s Cuisine — Feijoada (Brazilian Black Bean Stew)',
    'https://www.oliviascuisine.com/feijoada-recipe/',
    'Camila Made — Feijoada: Brazilian Black Bean Stew',
    'https://camilamade.com/homemade-feijoada/'
  ),
  'moqueca-baiana': sources(
    'Olivia\'s Cuisine — Moqueca Baiana (Brazilian Fish Stew)',
    'https://www.oliviascuisine.com/moqueca-baiana-brazilian-fish-stew/',
    'Saveur — Brazilian Fish and Coconut Milk Stew (Moqueca)',
    'https://www.saveur.com/moqueca-brazilian-fish-stew-recipe/'
  ),
  'pao-de-queijo': sources(
    'King Arthur Baking — Brazilian Cheese Buns (Pão de Queijo)',
    'https://www.kingarthurbaking.com/recipes/brazilian-cheese-buns-pao-de-queijo-recipe',
    'Food Network — Pao de Queijo (Brazilian Cheese Bread)',
    'https://www.foodnetwork.com/recipes/pao-de-queijo-brazilian-cheese-bread-3303576'
  ),
  coxinha: sources(
    'Olivia\'s Cuisine — Coxinhas (Brazilian Chicken Croquettes)',
    'https://www.oliviascuisine.com/the-world-cup-gourmet-series-brazil-coxinhas-chicken-croquettes/',
    'The Spruce Eats — Coxinha (Brazilian Chicken Croquettes)',
    'https://www.thespruceeats.com/coxinha-brazilian-chicken-croquettes-3029668'
  ),
  acaraje: sources(
    'Saveur — Acarajé Com Camarão (Black-Eyed Pea Fritters With Shrimp)',
    'https://www.saveur.com/recipes/acaraje-brazilian-black-eyed-pea-fritters/',
    'Olivia\'s Cuisine — 30 Authentic Brazilian Recipes',
    'https://www.oliviascuisine.com/authentic-brazilian-recipes/'
  ).concat(
    { title: 'Official food-safety guidance — FDA: Selecting and Serving Fresh and Frozen Seafood Safely', url: 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely' },
    { title: 'Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures', url: 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures' }
  ),
  'churrasco-picanha': sources(
    'Brazilian Kitchen Abroad — Picanha Brazilian Coulotte Steaks',
    'https://braziliankitchenabroad.com/picanha-brazilian-culotte-steaks/',
    'Serious Eats — Brazilian Picanha Steak',
    'https://www.seriouseats.com/grilled-picanha-brazilian-style-steak-recipe'
  ),
  'bobo-de-camarao': [
    ...sources(
      'Easy and Delish — Bobó de Camarão',
      'https://www.easyanddelish.com/bobo-de-camarao/',
      'Brazilian Kitchen Abroad — Bobó de Camarão (Brazilian Shrimp Stew)',
      'https://braziliankitchenabroad.com/bobo-de-camarao-brazilian-shrimp-stew/'
    ),
    { title: 'FoodSafety.gov — Cook to a Safe Minimum Internal Temperature', url: 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures' },
    { title: 'FDA — Selecting and Serving Fresh and Frozen Seafood Safely', url: 'https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely' }
  ],
  vatapa: sources(
    'Saveur — Brazilian Shrimp Stew (Vatapá)',
    'https://www.saveur.com/article/Recipes/Classic-Brazilian-Shrimp-Stew/',
    'Receitas — Vatapá',
    'https://receitas.globo.com/tipos-de-prato/acompanhamentos/vatapa-531a4c174d38854b79000043.ghtml'
  ),
  'escondidinho-de-carne-seca': sources(
    'Receitas — Escondidinho de carne seca da Ana Maria',
    'https://receitas.globo.com/ana-maria-braga/salgados/escondidinho-de-carne-seca-da-ana-maria.ghtml',
    'UOL Nossa Cozinha — Escondidinho de carne-seca',
    'https://www.uol.com.br/nossa/cozinha/receitas/2023/02/03/escondidinho-de-carne-seca.htm'
  ),
  'arroz-carreteiro': sources(
    'Receitas — Arroz carreteiro',
    'https://receitas.globo.com/tipos-de-prato/acompanhamentos/arroz-carreteiro-simples-4f898f516c721c38b00179f9.ghtml',
    'Brazilian Kitchen Abroad — Brazilian Rice',
    'https://braziliankitchenabroad.com/brazilian-rice/'
  ).concat(
    { title: 'Official food-safety guidance — UK Food Standards Agency: Home food fact checker', url: 'https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker' },
    { title: 'Official food-safety guidance — FoodSafety.gov: Safe Minimum Internal Temperatures', url: 'https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures' }
  ),
  'feijao-tropeiro': sources(
    'Ana Maria Braga — Feijão-tropeiro simples',
    'https://anamariabraga.globo.com/receita/feijao-tropeiro/',
    'Receitas Nestlé — Feijão Tropeiro Tradicional',
    'https://www.receitasnestle.com.br/receitas/feijao-tropeiro'
  ),
  brigadeiro: sources(
    'The Kitchn — Brigadeiro Recipe',
    'https://www.thekitchn.com/brigadeiro-recipe-23281035',
    'Saveur — Brigadeiros (Brazilian Fudge Balls)',
    'https://www.saveur.com/article/Recipes/Brigadeiros/'
  ),
  quindim: sources(
    'Receitas — Quindim da Confeitaria Colombo',
    'https://receitas.globo.com/tipos-de-prato/doces-e-sobremesas/quindim-da-confeitaria-colombo.ghtml',
    'BBC Good Food — Coconut quindim',
    'https://www.bbcgoodfood.com/recipes/coconut-quindim'
  )
};
