const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const mediterraneanRecipeSources = {
  bouillabaisse: sources('Marseille Tourism — Bouillabaisse, the Traditional Fish Soup', 'https://www.marseille-tourisme.com/en/discover-marseille/gastronomy-in-marseille/culinary-specialities-of-marseille/bouillabaisse/', 'Food Network Kitchen — Bouillabaisse', 'https://www.foodnetwork.com/recipes/food-network-kitchen/bouillabaisse-3362338'),
  pissaladiere: sources('Nice Côte d’Azur Tourist Office — La Pissaladière', 'https://www.explorenicecotedazur.com/en/explore/art-of-living/gastronomy-and-local-produce/nicoise-recipes/la-pissaladiere/', 'France.fr — Pissaladière, Caramelized Onion and Anchovy Tart', 'https://www.france.fr/en/article/pissaladiere-recipe-caramelized-onion-and-anchovy-tart/'),
  caponata: sources('Visit Sicily — Caponata', 'https://www.visitsicily.info/en/ricetta/caponata/', 'La Cucina Italiana — Sicilian Caponata', 'https://www.lacucinaitaliana.com/italian-food/italian-dishes/sicilian-caponata-recipe'),
  'pasta-con-le-sarde': sources('Visit Sicily — Pasta con le Sarde', 'https://www.visitsicily.info/en/ricetta/pasta-with-sardines/', 'La Cucina Italiana — Pasta con le Sarde', 'https://www.lacucinaitaliana.it/gallery/pasta-con-le-sarde-ricetta-ciccio-sultano/'),
  'brik-a-loeuf': sources('196 flavors — Tunisian Brik à l’Œuf', 'https://www.196flavors.com/fr/tunisie-brick-a-loeuf/', 'Recettes Tunisiennes — Brik Tunisien à l’Œuf', 'https://recettes-tunisiennes.com/recettes/brik-tunisien-a-loeuf-recette-authentique/'),
  lablabi: sources('The Mediterranean Dish — Lablabi, Tunisian Chickpea Stew', 'https://www.themediterraneandish.com/lablabi-tunisian-chickpea-stew/', 'Ottolenghi Recipes — Tunisian Spiced Chickpea and Bread Soup', 'https://ottolenghi.co.uk/pages/recipes/tunisian-spiced-chickpea-bread-soup-lablabi'),
  harira: sources('BBC Good Food — Robert Carrier’s Moroccan Harira', 'https://www.bbcgoodfood.com/recipes/1730/robert-carriers-moroccan-harira', 'Moroccan National Tourist Office — Moroccan Food and Drink', 'https://www.visitmorocco.com/en/travel-info/food-drinks'),
  zaalouk: sources('The Mediterranean Dish — Zaalouk, Moroccan Eggplant Salad', 'https://www.themediterraneandish.com/zaalouk-moroccan-eggplant-salad/', 'Moroccan National Tourist Office — Moroccan Food and Drink', 'https://www.visitmorocco.com/en/travel-info/food-drinks'),
  'imam-bayildi': sources('Turkish Food Travel — Imam Bayildi', 'https://www.youtube.com/watch?v=QJWlMiJHj5k', 'Türkiye Ministry of Health — Turkish Cuisine', 'https://hsgm.saglik.gov.tr/depo/birimler/saglikli-beslenme-ve-hareketli-hayat-db/Dokumanlar/Ingilizce_Yayinlar/Turkish_Cuisisne.pdf'),
  gozleme: sources('Turkish Food Travel — Spinach and Cheese Gözleme', 'https://www.turkishfoodtravel.com/2021/02/14/turkish-spinach-gozleme/', 'A Kitchen in Istanbul — Spinach and Feta Gözleme', 'https://vidarbergum.com/recipe/turkish-spinach-and-feta-filled-flatbread-ispanakli-gozleme/'),
  'halloumi-saganaki': sources('Bon Appétit — Halloumi Saganaki', 'https://www.bonappetit.com/recipe/halloumi-saganaki', 'Visit Cyprus — Grilled Halloumi Cheese', 'https://test.visitcyprus.com/index.php/en/discovercyprus/gastronomy/local-recipes/369-grilled-halloumi-cheese'),
  'crni-rizot': sources('Saveur — Crni Rižoto, Black Cuttlefish Risotto', 'https://www.saveur.com/article/recipes/crni-rizoto-black-cuttlefish-risotto/', 'Chasing the Donkey — Croatian Black Risotto', 'https://www.chasingthedonkey.com/croatian-cooking-black-risotto-recipe-crni-rizot/'),
  'stuffat-tal-fenek': sources('SBS Food — Maltese Rabbit Stew, Stuffat tal-Fenek', 'https://www.sbs.com.au/food/recipe/maltese-rabbit-stew-stuffat-tal-fenek/pt9ul9r5q', 'i love Maltese food — Rabbit Stew, Stuffat Tal-Fenek', 'https://www.ilovefood.com.mt/recipes/rabbit-stew-stuffat-tal-fenek/')
};
