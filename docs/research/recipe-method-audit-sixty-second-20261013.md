# Recipe method audit — batch 62

- Date: 2026-10-13
- Branch: `codex/recipe-methods-sixty-second-20261013`
- Exact base: `f5019d30c5eab64251f392a071616de875de504c` from `codex/recipe-methods-sixty-first-20261013`

## Selection and coverage

The shared exact-slug ledger is `test/recipe-method-regressions.test.mjs`; the standing 18-slug exclusion list is `test/recipe-method-fiftieth.test.mjs`. At the exact base, the ledger contained 244 reviewed recipe IDs and the registry contained 353 IDs, leaving 91 eligible after exclusions. The four slugs below were present in the registry and absent from both lists:

- `birria-de-res`
- `chilaquiles-verdes`
- `cullen-skink`
- `galaktoboureko`

Coverage now contains 248 distinct IDs; the 18 exclusions are unchanged, 87 eligible recipes remain, and the registry is still 353 recipes. The shared route regression continues to check the same five locales and indexable routes. No recipe was added or removed, no excluded recipe was edited, and no source recipe draft was changed. Publication methods retain their original step counts and illustration scene mappings.

## Method changes

- **Birria de res** (8 servings; 290/210/500 minutes): counts the minimum four-hour refrigerated marinade in elapsed prep time; allocates 8 g of the 16 g salt to the beef and 8 g to the adobo, and divides the 1.8 L water into 250 ml for blending and 1,550 ml for braising. Serving notes allocate the 2.2 kg raw beef, consommé, 120 g onion, 30 g cilantro and four limes across eight bowls. Beef pieces are explicitly identified as whole cuts rather than ground meat. The 63°C/145°F plus three-minute rest check is separate from the 2.5–3-hour tenderness estimate. Storage distinguishes a three-day texture preference from the official three-to-four-day soup/stew range; reheat the needed meat and broth to 74°C/165°F.
- **Chilaquiles verdes** (6 servings; 35/30/65 minutes): counts the optional 30-minute tortilla drying within prep, specifies 108 chips from 18 tortillas, and clarifies that 350 ml oil is frying medium rather than an amount absorbed. Onion, cilantro and salt are split between salsa and garnish; each serving receives three tortillas' worth of chips, about 25 g crema and 30 g queso fresco. Chips are tossed only just before service and stored apart from salsa and dairy. Reheat only the salsa to 74°C/165°F, then combine with crisp chips and cold toppings. The second culinary reference now points to Rick Bayless's green chilaquiles rather than a chicken variation.
- **Cullen skink** (4 servings; 20/35/55 minutes): checks the thickest part of the haddock at 63°C/145°F or uses FoodSafety.gov's fish-specific cue that flesh is no longer translucent and separates easily with a fork. Potato time remains an estimate for tenderness. The poaching milk, salt and four-bowl fish/potato/soup portions are assigned. Storage distinguishes a two-day fish-texture preference from the official three-to-four-day soup/stew range; reheat the needed portion to 74°C/165°F while avoiding a hard boil for milk and fish quality.
- **Galaktoboureko** (12 servings; 90/175/265 minutes): the prep estimate includes syrup cooling alongside custard work; the finish estimate includes the 55-minute bake and two hours of setting (one hour at room temperature, then one hour refrigerated so cooling starts within two hours of baking). The 200 g butter is allocated as 15 g for the pan, 60 g for the bottom sheets, 40 g for custard, 20 g for the rim, 50 g for the top sheets and 15 g for the surface. The egg-semolina custard is heated to the FoodSafety.gov egg-dish endpoint of 71°C/160°F; time, thickness, phyllo colour and baking time are labelled as texture cues. Storage distinguishes a two-day crisp-phyllo preference from the official three-to-four-day custard-pie range. Reheating is optional; a warmed leftover portion reaches 74°C/165°F, with softer phyllo expected.

Each recipe keeps two culinary references, listed separately from applicable official safety guidance. The culinary sources reviewed are [México in My Kitchen — Beef Birria](https://www.mexicoinmykitchen.com/beef-birria-recipe/) and [Pati Jinich — Jalisco-Style Birria](https://patijinich.com/jalisco-style-birria/) for birria; [Pati Jinich — Chilaquiles Verdes](https://patijinich.com/es/chilaquiles-verdes/) and [Rick Bayless — Green Chilaquiles](https://www.rickbayless.com/recipe/green-chilaquiles/) for chilaquiles; [Great British Chefs — Cullen Skink](https://www.greatbritishchefs.com/how-to-cook/how-to-make-cullen-skink) and [BBC Radio Scotland — Cullen Skink](https://downloads.bbc.co.uk/radioscotland/recipes/cullenskink.pdf) for the soup; and [My Greek Dish — Galaktoboureko](https://www.mygreekdish.com/recipe/galaktoboureko/) and [Akis Petretzikis — Galaktoboureko](https://akispetretzikis.com/en/recipe/578/to-galaktompoyreko-toy-akh) for the pastry.

The separate official references are [FoodSafety.gov — safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures), [FoodSafety.gov — four steps to food safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety), and [FoodSafety.gov — cold food storage charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts). They are applied by ingredient and dish category: whole-cut beef, fin fish, egg dishes, cooked leftovers, soups/stews, and custard pies.

## Verification and limits

- `node --test test/recipe-method-sixty-second.test.mjs`: 5 passed, 0 failed.
- `npm test`: passed; 289 tests, 0 failures. All configured language draft audits, build and static audit passed. Static audit reported 10,816 files and 1,885 indexable routes.
- Separate `npm run build`: passed; 1,885 indexable URLs across five locales.
- Shared route regression plus the sixtieth, sixty-first, and sixty-second batch tests: 70 passed, 0 failed. `git diff --check`: passed.
- Shell runtime: Node.js v24.19.0, npm 11.9.0. The exact model/runtime variant was not exposed; review by this same model is not independent verification.
- No food was cooked. No UI/browser review, headless browser, CDP, local server preview, security-configuration change, or deployment was run. Automated repository checks do not establish kitchen-tested cooking results or a visual UI pass.
