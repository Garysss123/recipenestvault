const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const italianRecipeSources = {
  'pizza-margherita': sources('GialloZafferano — Pizza Margherita', 'https://ricette.giallozafferano.it/Pizza-Margherita.html', 'La Cucina Italiana — Pizza Margherita', 'https://www.lacucinaitaliana.it/ricetta/piatti-unici/pizza-margherita-2/'),
  'spaghetti-carbonara': sources('GialloZafferano — Spaghetti alla Carbonara', 'https://ricette.giallozafferano.it/Spaghetti-alla-Carbonara.html', 'La Cucina Italiana — Spaghetti alla carbonara', 'https://www.lacucinaitaliana.it/ricetta/primi/spaghetti-alla-carbonara-2/'),
  'cacio-e-pepe': sources('La Cucina Italiana — Pasta cacio e pepe', 'https://www.lacucinaitaliana.it/tutorial/i-consigli/ricetta-pasta-cacio-e-pepe/', 'GialloZafferano — Tonnarelli cacio e pepe', 'https://ricette.giallozafferano.it/Tonnarelli-cacio-e-pepe.html'),
  'bucatini-amatriciana': sources('GialloZafferano — Amatriciana', 'https://ricette.giallozafferano.it/Spaghetti-all-Amatriciana.html', 'La Cucina Italiana — Bucatini all’amatriciana', 'https://www.lacucinaitaliana.it/ricetta/primi/bucatini-allamatriciana/'),
  'pasta-alla-norma': sources('GialloZafferano — Pasta alla Norma', 'https://ricette.giallozafferano.it/Spaghetti-alla-Norma.html', 'La Cucina Italiana — Pasta alla Norma', 'https://www.lacucinaitaliana.it/ricetta/primi/pasta-alla-norma-3/'),
  'trofie-al-pesto': sources('La Cucina Italiana — Trofie al pesto', 'https://www.lacucinaitaliana.it/ricetta/trofie-al-pesto-la-ricetta-passo-passo/', 'Visit Genoa — Trofie', 'https://www.visitgenoa.it/en/trofie'),
  'tagliatelle-ragu-bolognese': sources('La Cucina Italiana — Tagliatelle con ragù alla bolognese', 'https://www.lacucinaitaliana.it/ricetta/primi/tagliatelle-con-ragu-alla-bolognese-la-ricetta-tradizionale/', 'Accademia Italiana della Cucina — Ragù alla bolognese', 'https://www.accademiaitalianadellacucina.it/sites/default/files/Rag%C3%B9%20alla%20bolognese%20-%20ricetta%20aggiornata%2020%20aprile%202023.pdf'),
  'lasagne-bolognese': sources('GialloZafferano — Lasagne alla Bolognese', 'https://ricette.giallozafferano.it/Lasagne-alla-Bolognese.html', 'La Cucina Italiana — Lasagne alla bolognese', 'https://www.lacucinaitaliana.it/ricetta/primi/lasagne-alla-bolognese/'),
  'risotto-alla-milanese': sources('GialloZafferano — Risotto alla milanese', 'https://ricette.giallozafferano.it/Risotto-alla-milanese.html', 'La Cucina Italiana — Risotto alla milanese', 'https://www.lacucinaitaliana.it/ricetta/primi/risotto-alla-milanese-la-ricetta-originale-e-inconfondibile/'),
  'ossobuco-alla-milanese': sources('GialloZafferano — Ossibuchi alla milanese', 'https://ricette.giallozafferano.it/Ossibuchi-alla-milanese.html', 'La Cucina Italiana — Ossobuco alla milanese', 'https://www.lacucinaitaliana.it/ricetta/primi/ricetta-ossobuco-alla-milanese/'),
  'saltimbocca-alla-romana': sources('GialloZafferano — Saltimbocca alla Romana', 'https://ricette.giallozafferano.it/Saltimbocca-alla-Romana.html', 'La Cucina Italiana — Saltimbocca alla Romana', 'https://www.lacucinaitaliana.com/recipe/main-course/original-recipe-saltimbocca-alla-romana'),
  'melanzane-parmigiana': sources('GialloZafferano — Parmigiana di melanzane', 'https://ricette.giallozafferano.it/Parmigiana-di-melanzane.html', 'La Cucina Italiana — Parmigiana', 'https://www.lacucinaitaliana.it/ricetta/primi/parmigiana-ricetta-classica/'),
  ribollita: sources('GialloZafferano — Ribollita', 'https://ricette.giallozafferano.it/Ribollita.html', 'La Cucina Italiana — Ribollita toscana', 'https://www.lacucinaitaliana.it/ricetta/primi/ribollita-toscana/'),
  'arancini-siciliani': sources('GialloZafferano — Arancini di riso', 'https://ricette.giallozafferano.it/Arancini-di-riso.html', 'La Cucina Italiana — Arancini di riso', 'https://www.lacucinaitaliana.it/ricetta/piatti-unici/arancini-di-riso/'),
  'focaccia-genovese': sources('GialloZafferano — Focaccia alla genovese', 'https://ricette.giallozafferano.it/Focaccia-fugassa-alla-genovese.html', 'La Cucina Italiana — Focaccia genovese', 'https://www.lacucinaitaliana.it/storie/luoghi/marinetta-miglior-focaccia-genovese-genova-voltri/'),
  'spaghetti-alle-vongole': sources('GialloZafferano — Spaghetti alle vongole', 'https://ricette.giallozafferano.it/Spaghetti-alle-vongole.html', 'La Cucina Italiana — Spaghetti alle vongole', 'https://www.lacucinaitaliana.it/ricetta/primi/spaghetti-alle-vongole/'),
  'pollo-alla-cacciatora': sources('GialloZafferano — Pollo alla cacciatora', 'https://ricette.giallozafferano.it/Pollo-alla-cacciatora.html', 'La Cucina Italiana — Pollo alla cacciatora', 'https://www.lacucinaitaliana.it/tutorial/i-consigli/pollo-alla-cacciatora-in-due-varianti/'),
  tiramisu: sources('GialloZafferano — Tiramisù', 'https://ricette.giallozafferano.it/Tiramisu.html', 'La Cucina Italiana — Tiramisù classico', 'https://www.lacucinaitaliana.it/ricetta/dolci-e-dessert/tiramisu-ricetta-classica/'),
  'panna-cotta': sources('GialloZafferano — Panna cotta', 'https://ricette.giallozafferano.it/Panna-cotta.html', 'La Cucina Italiana — Panna cotta', 'https://www.lacucinaitaliana.it/tutorial/i-consigli/come-fare-la-panna-cotta-e-gli-errori-da-non-commettere/'),
  'cannoli-siciliani': sources('GialloZafferano — Cannoli siciliani', 'https://ricette.giallozafferano.it/Cannoli-siciliani.html', 'La Cucina Italiana — Cannoli siciliani', 'https://www.lacucinaitaliana.it/ricetta/dolci-e-dessert/cannoli-siciliani-ricetta-classica/'),
  cantucci: sources('GialloZafferano — Cantucci', 'https://ricette.giallozafferano.it/Cantucci.html', 'La Cucina Italiana — Cantucci toscani', 'https://www.lacucinaitaliana.it/ricetta/dolci-e-dessert/cantucci-toscani/')
};

export default italianRecipeSources;
