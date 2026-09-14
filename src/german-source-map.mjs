const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const germanRecipeSources = {
  'sauerbraten': sources(
    'Kitchen Stories — Sauerbraten',
    'https://www.kitchenstories.com/de/rezepte/sauerbraten',
    'The Daring Gourmet — Authentic Sauerbraten',
    'https://www.daringgourmet.com/authentic-german-sauerbraten/'
  ),
  'rinderrouladen': sources(
    'Kitchen Stories — Beef rouladen with sauerkraut',
    'https://www.kitchenstories.com/en/recipes/beef-rouladen-with-sauerkraut',
    'The Daring Gourmet — Authentic German Rouladen',
    'https://www.daringgourmet.com/rouladen-recipe/'
  ),
  'bavarian-krustenbraten': sources(
    'Kitchen Stories — Bavarian beer-roasted pork with crackling',
    'https://www.kitchenstories.com/en/recipes/bavarian-beer-roasted-pork-with-crackling',
    'Dr. Oetker — Krustenbraten',
    'https://www.oetker.de/rezepte/r/krustenbraten'
  ),
  'currywurst': sources(
    'Kitchen Stories — Currywurst (Berlin-style bratwurst with curry sauce)',
    'https://www.kitchenstories.com/en/recipes/currywurst-berlin-style-bratwurst-with-curry-sauce',
    'REWE — Currywurst',
    'https://www.rewe.de/rezepte/currywurst/'
  ),
  'nuernberger-rostbratwurst': sources(
    'Kitchen Stories — Nürnberger bratwursts with sauerkraut and mashed potatoes',
    'https://www.kitchenstories.com/en/recipes/nurnberger-bratwursts-with-sauerkraut-and-mashed-potatoes',
    'Schutzverband Nürnberger Bratwürste — Gegrillte Nürnberger Bratwürste mit fränkischem Sauerkraut',
    'https://nuernberger-bratwuerste.de/de/erleben-geniessen/rezepte/gegrillte-nuernberger-bratwuerste-mit-fraenkischem-sauerkraut-und-holzofenbrot'
  ),
  'frikadellen': sources(
    'The Daring Gourmet — Traditional Frikadellen',
    'https://www.daringgourmet.com/frikadeller-frikadellen/',
    'Food.com — Frikadellen (German Meat Patties)',
    'https://www.food.com/recipe/frikadellen-german-meat-patties-423250'
  ),
  'koenigsberger-klopse': sources(
    'Kitchen Stories — Königsberger Klopse',
    'https://www.kitchenstories.com/en/recipes/konigsberger-klopse-german-meatballs-in-cream-and-caper-sauce',
    'The Daring Gourmet — Königsberger Klopse',
    'https://www.daringgourmet.com/koenigsberger-klopse/'
  ),
  'kartoffelpuffer': sources(
    'The Daring Gourmet — Kartoffelpuffer',
    'https://www.daringgourmet.com/traditional-kartoffelpuffer-reibekuchen-german-potato-pancakes/',
    'REWE — Kartoffelpuffer selber machen',
    'https://www.rewe.de/rezepte/kartoffelpuffer-selber-machen/'
  ),
  'kaesespaetzle': sources(
    'The Daring Gourmet — Käsespätzle',
    'https://www.daringgourmet.com/kasespatzle-swabian-german-macaroni-and-cheese/',
    'REWE — Selbstgemachte Käsespätzle',
    'https://www.rewe.de/rezepte/selbstgemachte-kaesespaetzle/'
  ),
  'maultaschen': sources(
    'Kitchen Stories — Swabian maultaschen',
    'https://www.kitchenstories.com/en/recipes/swabian-maultaschen',
    'The Daring Gourmet — Authentic German Maultaschen',
    'https://www.daringgourmet.com/maultaschen/'
  ),
  'erbsensuppe': sources(
    'The Daring Gourmet — German Pea Soup with Egg Dumplings',
    'https://www.daringgourmet.com/german-pea-soup-egg-dumplings-erbsensuppe-mit-eierschwammchen/',
    'Chefkoch — Erbsensuppe: klassische Rezepte und Varianten',
    'https://www.chefkoch.de/magazin/artikel/77298301374985-erbsensuppe-so-wird-die-suppe-besonders-fein-1'
  ),
  'black-forest-cake': sources(
    'Kitchen Stories — Schwarzwälder Kirschtorte',
    'https://www.kitchenstories.com/de/rezepte/schwarzwalder-kirschtorte',
    'Dr. Oetker — Schwarzwälder Kirschtorte',
    'https://www.oetker.de/rezepte/r/schwarzwaelder-kirschtorte'
  ),
  'bienenstich': sources(
    'Dr. Oetker — Bienenstich klassisch',
    'https://www.oetker.de/rezepte/r/bienenstich-klassisch',
    'King Arthur Baking — Bienenstich (Bee Sting Cake)',
    'https://www.kingarthurbaking.com/recipes/bienenstich-bee-sting-cake-recipe'
  )
};

export default germanRecipeSources;
