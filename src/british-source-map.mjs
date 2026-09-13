const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const britishRecipeSources = {
  'fish-and-chips': sources(
    'Great British Chefs — Fish and chips recipes',
    'https://www.greatbritishchefs.com/collections/fish-and-chips-recipes',
    'Good Food — Classic fish & chips',
    'https://www.bbcgoodfood.com/recipes/next-level-fish-chips'
  ),
  'beef-wellington': sources(
    'Gordon Ramsay — Beef Wellington',
    'https://www.gordonramsay.com/gr/recipes/beef-wellington',
    'Great British Chefs — Beef Wellington',
    'https://www.greatbritishchefs.com/recipes/beef-wellington-recipe'
  ),
  'roast-beef-yorkshire-pudding': sources(
    'Great British Chefs — Roast beef silverside',
    'https://www.greatbritishchefs.com/recipes/roast-beef-silverside-recipe',
    'Great British Chefs — Yorkshire pudding',
    'https://www.greatbritishchefs.com/recipes/yorkshire-pudding-recipe'
  ),
  'shepherds-pie': sources(
    'Great British Chefs — Shepherd’s pie',
    'https://www.greatbritishchefs.com/recipes/shepherds-pie-recipe',
    'Good Food — No-fuss shepherd’s pie',
    'https://www.bbcgoodfood.com/recipes/no-fuss-shepherds-pie'
  ),
  'toad-in-the-hole': sources(
    'Great British Chefs — Toad in the hole',
    'https://www.greatbritishchefs.com/recipes/toad-in-the-hole-recipe',
    'BBC Three Counties Radio — Toad in the hole',
    'https://downloads.bbc.co.uk/threecountiesradio/pdf/weekend_kitchen_240814.pdf'
  ),
  'cornish-pasty': sources(
    'Cornish Pasty Association — Make your own genuine Cornish pasty',
    'https://cornishpastyassociation.co.uk/about-the-pasty/make-your-own-genuine-cornish-pasty/',
    'Great British Chefs — How to make pasties',
    'https://www.greatbritishchefs.com/how-to-cook/how-to-make-pasties'
  ),
  'full-english-breakfast': sources(
    'English Breakfast Society — Baseline Standard: The Full English Breakfast',
    'https://englishbreakfastsociety.com/standards/baseline-standard-full-english-breakfast',
    'BBC Food — Stress-free full English breakfast',
    'https://www.bbc.co.uk/food/recipes/stressfreefullenglis_67721'
  ),
  'chicken-tikka-masala': sources(
    'Great British Chefs — Chicken Tikka Masala',
    'https://www.greatbritishchefs.com/recipes/chicken-tikka-masala-recipe',
    'Good Food — How to make next level chicken tikka masala',
    'https://www.bbcgoodfood.com/howto/guide/how-make-next-level-chicken-tikka-masala'
  ),
  'cullen-skink': sources(
    'Great British Chefs — How to make Cullen skink',
    'https://www.greatbritishchefs.com/how-to-cook/how-to-make-cullen-skink',
    'BBC Radio Scotland — Cullen Skink by Neil Forbes',
    'https://downloads.bbc.co.uk/radioscotland/recipes/cullenskink.pdf'
  ),
  'welsh-rarebit': sources(
    'Wales.com — Welsh rarebit: our traditional recipe',
    'https://www.wales.com/visit/food-and-drink/welsh-recipes/welsh-rarebit',
    'Great British Chefs — Welsh Rarebit',
    'https://www.greatbritishchefs.com/recipes/welsh-rarebit-recipe'
  ),
  'sticky-toffee-pudding': sources(
    'Great British Chefs — Sticky toffee pudding',
    'https://www.greatbritishchefs.com/recipes/sticky-toffee-pudding',
    'Good Food — Ultimate sticky toffee pudding',
    'https://www.bbcgoodfood.com/recipes/ultimate-sticky-toffee-pudding'
  ),
  'traditional-trifle': sources(
    'Great British Chefs — Trifle recipes',
    'https://www.greatbritishchefs.com/collections/trifle-recipes',
    'Good Food — How to make the ultimate trifle',
    'https://www.bbcgoodfood.com/howto/guide/how-make-ultimate-trifle'
  ),
  'steak-and-kidney-pie': sources(
    'Great British Chefs — Steak and kidney pie',
    'https://www.greatbritishchefs.com/recipes/steak-kidney-pie-recipe',
    'Great British Food Awards — The Windmill’s award-winning steak & kidney pie',
    'https://www.greatbritishfoodawards.com/recipes/windmills-award-winning-steak-kidney-pie'
  )
};

export default britishRecipeSources;
