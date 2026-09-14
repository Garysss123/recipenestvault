const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const greekRecipeSources = {
  moussaka: sources(
    'My Greek Dish — Traditional Moussaka',
    'https://www.mygreekdish.com/recipe/mousakas/',
    'Akis Petretzikis — Traditional Greek moussaka',
    'https://akispetretzikis.com/en/recipe/8296/paradosiakos-mousakas'
  ),
  pastitsio: sources(
    'My Greek Dish — Greek Pastitsio',
    'https://www.mygreekdish.com/recipe/pastitsio/',
    'Akis Petretzikis — Classic Greek pasta bake - Pastitsio',
    'https://akispetretzikis.com/en/recipe/6866/paradosiako-pastitsio'
  ),
  'pork-souvlaki': sources(
    'My Greek Dish — Pork Souvlaki with Tzatziki',
    'https://www.mygreekdish.com/recipe/pork-souvlaki-skewers-with-tzatziki/',
    'Akis Petretzikis — Double pork souvlaki pita wraps',
    'https://akispetretzikis.com/en/recipe/8092/dikano-tylichto'
  ),
  spanakopita: sources(
    'My Greek Dish — Traditional Greek Spanakopita',
    'https://www.mygreekdish.com/recipe/traditional-greek-spinach-pie-spanakopita-recipe-with-homemade-phyllo/',
    'Akis Petretzikis — Easy Greek spinach pie',
    'https://akispetretzikis.com/en/recipe/731/grhgorh-spanakopita'
  ),
  dolmades: sources(
    'My Greek Dish — Greek Dolmades',
    'https://www.mygreekdish.com/recipe/greek-dolmades-recipe-stuffed-vine-leaves/',
    'Akis Petretzikis — Greek stuffed vine leaves - Dolmades',
    'https://akispetretzikis.com/en/recipe/1404/ntolmadakia-gialantzi'
  ),
  avgolemono: sources(
    'My Greek Dish — Greek lemon chicken soup',
    'https://www.mygreekdish.com/recipe/greek-lemon-chicken-soup-kotosoupa-avgolemono/',
    'The Mediterranean Dish — Avgolemono Soup',
    'https://www.themediterraneandish.com/avgolemono-soup-recipe/'
  ),
  fasolada: sources(
    'My Greek Dish — Traditional Greek bean soup Fasolada',
    'https://www.mygreekdish.com/recipe/traditional-greek-bean-soup-recipe-fasolada/',
    'Akis Petretzikis — Greek white bean soup - Fasolada',
    'https://akispetretzikis.com/en/recipe/3098/fasolada'
  ),
  'gigantes-plaki': sources(
    'My Greek Dish — Gigantes Plaki',
    'https://www.mygreekdish.com/recipe/gigantes-plaki-greek-baked-giant-beans/',
    'Akis Petretzikis — Greek baked giant beans - Gigantes',
    'https://akispetretzikis.com/en/recipe/3442/gigantes-foyrnoy'
  ),
  gemista: sources(
    'My Greek Dish — Gemista',
    'https://www.mygreekdish.com/recipe/gemista-stuffed-tomatoes-peppers-and-onions/',
    'Akis Petretzikis — Greek stuffed vegetables with rice and ground meat',
    'https://akispetretzikis.com/en/recipe/4046/gemista-me-kima'
  ),
  'beef-stifado': sources(
    'My Greek Dish — Beef Stifado',
    'https://www.mygreekdish.com/recipe/beef-stifado-mosharaki-stifado/',
    'Akis Petretzikis — Pressure cooker Greek beef stew with shallots',
    'https://akispetretzikis.com/en/recipe/9523/moschari-stifado-sth-chytra-tachythtas'
  ),
  keftedes: sources(
    'My Greek Dish — Greek Meatballs Keftedes',
    'https://www.mygreekdish.com/recipe/keftedes-greek-meatballs/',
    'Akis Petretzikis — Classic Greek meatballs',
    'https://akispetretzikis.com/en/recipe/6690/ta-keftedakia-ths-giagias'
  ),
  horiatiki: sources(
    'My Greek Dish — Traditional Greek Salad Horiatiki',
    'https://www.mygreekdish.com/recipe/greek-feta-salad/',
    'Akis Petretzikis — Authentic Greek salad - Horiatiki',
    'https://akispetretzikis.com/en/recipe/1971/chwriatikh-salata'
  ),
  galaktoboureko: sources(
    'My Greek Dish — Traditional Greek Galaktoboureko',
    'https://www.mygreekdish.com/recipe/galaktoboureko/',
    'Akis Petretzikis — Greek custard pie - Galaktoboureko',
    'https://akispetretzikis.com/en/recipe/578/to-galaktompoyreko-toy-akh'
  )
};

export default greekRecipeSources;
