const sources = (aTitle, aUrl, bTitle, bUrl) => [
  { title: aTitle, url: aUrl },
  { title: bTitle, url: bUrl }
];

export const americanRecipeSources = {
  cheeseburger: sources(
    'Food Network Kitchen — Crispy Burgers',
    'https://www.foodnetwork.com/fnk/recipes/crispy-burgers-8714356',
    'Aarti Sequeira — Old-Fashioned Cheeseburger',
    'https://www.foodnetwork.com/recipes/aarti-sequeira/old-fashioned-cheeseburger-recipe-2047073'
  ),
  'buffalo-wings': sources(
    'Food Network — Buffalo Chicken Wings',
    'https://www.foodnetwork.com/recipes/buffalo-chicken-wings-recipe2-1927053',
    'Food Network Kitchen — How to Make Buffalo-Style Chicken Wings',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/buffalo-style-chicken-wings-recipe/how-to-make-buffalo-style-chicken-wings'
  ),
  'southern-fried-chicken': sources(
    'Food Network — Southern Fried Chicken',
    'https://www.foodnetwork.com/recipes/southern-fried-chicken-recipe0-1922088',
    'Food Network — Traditional Southern Fried Chicken',
    'https://www.foodnetwork.com/recipes/traditional-southern-fried-chicken-recipe-1938410'
  ),
  'memphis-style-ribs': sources(
    'Food Network — Memphis-Style Ribs',
    'https://www.foodnetwork.com/recipes/memphis-style-ribs-recipe-1953240',
    'Food Network — Barbecued Dry Rub Ribs, Memphis-Style',
    'https://www.foodnetwork.com/recipes/barbecued-dry-rub-ribs-memphis-style-recipe-1952878'
  ),
  'baked-mac-and-cheese': sources(
    'Alton Brown — Baked Macaroni and Cheese',
    'https://www.foodnetwork.com/recipes/alton-brown/baked-macaroni-and-cheese-recipe-1939524',
    'Martha Stewart — Macaroni and Cheese',
    'https://www.marthastewart.com/957243/macaroni-and-cheese'
  ),
  'new-england-clam-chowder': sources(
    'Food Network Kitchen — New England Clam Chowder',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/new-england-clam-chowder-recipe-2043587',
    'Sam LaGrassa — New England Clam Chowder',
    'https://www.foodnetwork.com/recipes/new-england-clam-chowder-recipe0-1958350'
  ),
  'philly-cheesesteak': sources(
    'Bobby Flay — Philly Cheese Steak',
    'https://www.foodnetwork.com/recipes/bobby-flay/philly-cheese-steak-recipe-2012068',
    'Food Network — Philly Cheesesteak',
    'https://www.foodnetwork.com/recipes/philly-cheesesteak-recipe-1948754'
  ),
  'chicken-and-sausage-gumbo': sources(
    'Food Network — Chicken and Sausage Gumbo',
    'https://www.foodnetwork.com/recipes/chicken-and-sausage-gumbo-recipe-2043183',
    'Emeril Lagasse — Chicken and Smoked Sausage Gumbo',
    'https://www.emerils.com/127540/chicken-and-smoked-sausage-gumbo'
  ),
  jambalaya: sources(
    'Food Network Kitchen — Chicken, Andouille and Shrimp Jambalaya',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/chicken-andouille-and-shrimp-jambalaya-17939930',
    'Food Network — Jambalaya',
    'https://www.foodnetwork.com/recipes/jambalaya-recipe2-1924012'
  ),
  'biscuits-and-gravy': sources(
    'Food Network — Biscuits and Gravy',
    'https://www.foodnetwork.com/recipes/biscuits-and-gravy-7240319',
    'Food Network — Biscuits and Gravy',
    'https://www.foodnetwork.com/recipes/biscuits-and-gravy-17930129'
  ),
  meatloaf: sources(
    'Food Network Kitchen — Classic Meatloaf',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/classic-meatloaf-5484735',
    'Food Network — Classic Meatloaf',
    'https://www.foodnetwork.com/recipes/classic-meatloaf-1926128'
  ),
  'skillet-cornbread': sources(
    'King Arthur Baking — Skillet Cornbread',
    'https://www.kingarthurbaking.com/recipes/skillet-cornbread-recipe',
    'Food Network — Skillet Cornbread',
    'https://www.foodnetwork.com/recipes/skillet-cornbread-recipe-1927110'
  ),
  'new-york-cheesecake': sources(
    'King Arthur Baking — NY Cheesecake',
    'https://www.kingarthurbaking.com/recipes/ny-cheesecake-recipe',
    'Food Network Kitchen — The Best New York-Style Cheesecake',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/new-york-style-cheesecake-7216998'
  ),
  'apple-pie': sources(
    'King Arthur Baking — Apple Pie',
    'https://www.kingarthurbaking.com/recipes/apple-pie-recipe',
    'Food Network Kitchen — Classic Apple Pie',
    'https://www.foodnetwork.com/recipes/food-network-kitchen/classic-apple-pie-recipe-2043582'
  ),
  'chocolate-chip-cookies': sources(
    'King Arthur Baking — Classic Chocolate Chip Cookies',
    'https://www.kingarthurbaking.com/recipes/classic-chocolate-chip-cookies-recipe',
    'King Arthur Baking — Chewy Chocolate Chip Cookies',
    'https://www.kingarthurbaking.com/recipes/chewy-chocolate-chip-cookies-recipe'
  )
};

export default americanRecipeSources;
