# Recipe method audit — sixteenth batch (2026-10-12)

## Coverage

Base: `54ac85b2b6afc7c44d532602cf2b1be894f01347` on `codex/recipe-methods-fifteenth-20261012`; work branch: `codex/recipe-methods-sixteenth-20261012`.

The recipe registry contains 353 unique recipes. The first fifteen batches deeply reviewed 60 distinct recipe IDs, leaving 275 eligible recipes after the same 18 user exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. This batch adds four existing recipes to deep-review coverage, for 64 reviewed IDs and 271 still eligible. No recipe was added, no exclusion changed, and no `localdrafts` content was touched.

## Findings and changes

| Recipe | Finding | Change |
| --- | --- | --- |
| Bahian Moqueca | The 25-minute cook estimate did not allow enough time for the aromatics, tomato base, covered seafood simmer, and off-heat finish. “Cook covered for 12–15 minutes” had no check-and-continue instruction if a thick fish piece needed longer. The ingredient list also did not say how to divide the seafood and rice among four servings. | Keep prep at 25 minutes and increase cook/total from 25/50 to 35/60 minutes. In all five locales, check the centre of the thickest fish piece at 63°C / 145°F and continue covered in 2-minute intervals, checking again; cook shrimp until pink, pearly and opaque. Divide the existing seafood among four bowls (about 200 g fish and 75 g shrimp each) and serve 150 g cooked rice per bowl. |
| Nigerian Egusi Soup with Greens | Beef, egusi paste and soup all drew from the same undivided 1.2 L stock amount. The full 8 g salt could go into a soup with smoked fish and salted stock. Beef relied on fork tenderness without a measured safety check, and six servings were not apportioned. | Keep the 25/90/115-minute estimate. Allocate the measured 1.2 L as 500 ml for beef, 180 ml for the paste and 520 ml for the soup. Use 3 g salt for the beef; hold up to 5 g for the finish and add only after tasting. Check the largest 3 cm beef cube at 63°C / 145°F, rest it covered in its liquid off heat for 3 minutes, and also cook until fork-tender. Prepare the paste and base while the beef simmers. Divide soup and toppings among six bowls and cut one lime into six wedges. |
| Lu Rou Fan | The prep estimate omitted the 20-minute dried-shiitake soak and its liquid was not explicitly topped back up to the listed amount. The shallot oil was reserved but not assigned to a later step. The serving step left all 250 g greens without a complete portion split. | Increase prep/cook/total from 25/105/130 to 40/115/155 minutes. Soak the shiitake in some of the listed 650 ml liquid, strain and top it back up to 650 ml. Use the listed 20 ml oil to fry the shallots and return all that oil to the pork pot. Keep the 70-minute low braise and spoon-tender endpoint. For four bowls, divide 800 g cooked rice (200 g each), one halved egg each, and all 250 g greens evenly (about 62–63 g each); share the pork, mushrooms, sauce and remaining shallots evenly. |
| Bò Kho | The 175-minute cook estimate did not cover the upper end of the beef braise and carrot simmer, a 10-minute tenderness recheck, finish/rest, and time for the added liquid to return to a simmer. Aromatics could be prepared during the refrigerated marinade, but the method did not state that sequence. | Keep prep at 55 minutes and increase cook/total from 175/230 to 200/255 minutes. Prepare lemongrass, vegetables and other aromatics during the 30-minute refrigerated marinade; wash, dry and chill the basil for serving. Keep a gentle 90–120-minute moist braise, check beef tenderness again while carrots cook, and continue in 10-minute intervals if needed. Divide the stew among four bowls, with about 5 g basil, one lime wedge and (if using) one-quarter baguette per serving. Use fork-tenderness and carrot texture for this long braise; no unrelated oven or surface temperature was added. |

All modified recipe strings were prepared and self-reviewed in English, Traditional Chinese, Japanese, Korean and Thai by one model. This is a single-model review; no second-model or human validation is claimed.

## Source verification

Official safety reference:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): finfish at 63°C / 145°F; whole beef cuts such as steaks, roasts and chops at 63°C / 145°F followed by a 3-minute rest. The page does not give recipe-specific cooking times. The egusi method applies that temperature check to the centre of the largest stew cube as an explicit site adaptation, while separately requiring fork tenderness; the chart's listed beef category is whole cuts, not stew cubes.

Recipe references checked for dish context and method comparisons:

- Bahian Moqueca: [Olivia's Cuisine](https://www.oliviascuisine.com/moqueca-baiana-brazilian-fish-stew/) and [Saveur](https://www.saveur.com/moqueca-brazilian-fish-stew-recipe/). These support the fish-and-shrimp stew context, coconut milk and palm oil, and layered, covered cooking. Their quantities and timings differ from this site's version.
- Nigerian Egusi Soup: [All Nigerian Recipes](https://www.allnigerianrecipes.com/soups/egusi-soup/) and [Nkechi Ajaeroh](https://nkechiajaeroh.com/recipes/nigerian-soup/nigerian-egusi-soup-recipe-african-soup/). These support the egusi, palm-oil, protein and leafy-green method context. Preparations vary; neither is presented as the source of this site's measurements.
- Lu Rou Fan: [The Woks of Life](https://thewoksoflife.com/2015/06/lu-rou-fan-taiwanese-braised-pork-rice-bowl/) and [One Happy Bite](https://onehappybite.com/easy-taiwanese-braised-pork-rice-lu-rou-fan/). These support the pork braise served over rice and common egg accompaniments. Their formulas and timings differ from this site's version.
- Bò Kho: [Hungry Huy](https://www.hungryhuy.com/bo-kho-recipe-vietnamese-beef-stew/) and [Delightful Plate](https://delightfulplate.com/bo-kho-vietnamese-beef-stew/). These support the lemongrass beef stew, long braise, late carrots and fresh herb/bread serving context. Their formulas and timings differ from this site's version.

The recipe amounts, allocation, time estimates and serving portions in this batch are this site's editorial decisions informed by its existing ingredient lists and methods. The recipe references are not cited as the source of those exact ratios or quantities.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 64 distinct deeply reviewed recipe IDs. The sixteenth-batch assertions cover all five locales, the stock and salt splits, reuse of shallot oil, fish and beef endpoints, long-braise tenderness, timing, and four-serving/six-serving allocations.

Validation completed:

- `npm test` passed: all 20 draft audits, the static audit (10,816 files and 1,885 indexable routes), and all 64 Node tests.
- A separate `npm run build` passed and generated 1,885 indexable URLs across five locales.
- `git diff --check` passed.

This was source, translation, reference and automated regression review. No actual cooking, browser/UI inspection, deployment or production validation was performed.
