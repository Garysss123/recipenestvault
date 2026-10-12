# Recipe method audit — eighteenth batch (2026-10-12)

## Coverage

Base: `f37a8a69879000eee79538664c968f7d6c4e4ef6` on `codex/recipe-methods-seventeenth-20261012`; work branch: `codex/recipe-methods-eighteenth-20261012`.

The registry contains 353 existing recipes. The base coverage list contains 68 distinct deep-reviewed IDs. This batch adds four existing recipes, bringing coverage to 72 reviewed and leaving 263 eligible after retaining the same 18 user exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. No recipe was added, no excluded recipe was modified, and no `localdrafts` content was touched.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Québec Tourtière | The mixed ground-pork and ground-beef filling had no measured endpoint, and the pie's bubbling/crust cue alone did not check the chilled filling after it was baked again. The eight servings were not explicitly cut or related to the listed meat amount. The 95-minute cook estimate was shorter than the maximum timed method. | Keep eight servings. In all five locales, check the filling at 71°C / 160°F and continue in 2-minute intervals if needed. After chilling and assembling, check the pie centre at 74°C / 165°F through a vent; tent a darkening crust if it needs more time. Set prep/cook/total to 55/102/157 minutes to cover the 25-minute filling, thickening, 60-minute bake, and 15-minute rest. Cut eight equal wedges, each representing about 94 g of the listed raw pork-and-beef mixture. |
| Cocido Madrileño | Chicken had no explicit poultry endpoint. The cook estimate allowed more time than the listed sequential simmer, potato, and noodle stages required. The noodle broth and dry noodles were not divided per diner, and the three traditional courses did not allocate the remaining shared ingredients across six people. | Keep six servings and the three-vuelcos service. Set prep/cook/total to 510/210/720 minutes. Check the thickest chicken thigh at 74°C / 165°F and continue the gentle simmer in 5-minute intervals if needed, removing any already-tender potatoes so they hold shape. Allocate 1.5 L broth and 120 g dry noodles to six first-course bowls (about 250 ml broth and 20 g dry noodles each); share the chickpeas, vegetables, cabbage, meats, and sausages among the same six. No 63°C or 71°C value was assigned to the long-braised beef or other ingredients. |
| Enchiladas Verdes | The 500 g cooked chicken was neither allocated among the 18 tortillas nor reheated to a stated endpoint if it came from refrigeration. The crema, queso fresco, and onion also lacked a per-serving split. | Keep six servings and 18 tortillas. If the cooked chicken is refrigerated, reheat it throughout to 74°C / 165°F. Divide the 500 g across 18 tortillas (about 28 g each; about 83 g or three enchiladas per serving). Divide the listed 180 g crema, 180 g queso fresco, and 100 g onion among six servings (about 30 g of each dairy topping and 17 g onion per serving). |
| Taiwanese Beef Noodle Soup | Noodle-water setup came after the long braise instead of overlapping its finish. Six servings did not say how to apportion the fresh noodles, beef, bok choy, pickled mustard greens, and broth. | During the final 10 minutes of the braise, boil the separate noodle water and warm six bowls. Divide 900 g fresh noodles into six 150 g portions, 300 g bok choy into 50 g portions, and 120 g pickled mustard greens into 20 g portions. Divide the cooked beef and strained broth evenly; the 1.2 kg listed raw beef is about 200 g raw-weight equivalent per bowl. Keep the chopstick-and-shape cue for the long braise; no unrelated internal temperature was added. |

All changed method text was translated and self-reviewed in English, Traditional Chinese, Japanese, Korean, and Thai in one model pass. No external model API was used; no second-model or human review is claimed.

## Recipe references checked

These references were used for dish identity and method comparison. Their formulas and times differ from the site's recipe data; they are not presented as the source of the site's exact amounts, ratios, serving allocations, or timing.

- Québec Tourtière: [Parks Canada — Fort Langley Tourtière](https://parks.canada.ca/culture/gourmand-gourmet/recette-recipe08) and [Canadian Living Test Kitchen — Tourtiere recipe and instructions](https://www.canadianliving.com/food/food-tips/recipe/tourtiere-recipe-and-instructions). Parks Canada's regional recipe and Canadian Living's ground-pork filling, chilling and pie method informed context and comparison.
- Cocido Madrileño: [Spain.info — Madrid Cocido](https://www.spain.info/en/recipe/cocido-madrileno/) and [Cocinatis — Cocido madrileño tradicional](https://www.cocinatis.com/receta/cocido-madrileno.html). These support the chickpea-and-meat stew, long simmer, separate cabbage/sausage handling, and three-course service context. The site's amounts and split timings remain its own editorial standardization.
- Enchiladas Verdes: [Pati Jinich — Enchiladas Verdes](https://patijinich.com/es/enchiladas-verdes/) and [México in My Kitchen — Green Chicken Enchiladas](https://www.mexicoinmykitchen.com/swiss-green-enchiladas/). These support cooked shredded chicken, corn tortillas, green salsa and toppings. Their chicken and tortilla quantities differ from this site's.
- Taiwanese Beef Noodle Soup: [The Woks of Life — Taiwanese Beef Noodle Soup](https://thewoksoflife.com/taiwanese-beef-noodle-soup-instant-pot/) and [Tiffy Cooks — Taiwanese Beef Noodle Soup](https://tiffycooks.com/taiwanese-beef-noodle-soup-authentic-family-recipe/). These support the red-braised beef, separate noodles, broth and vegetable bowl format; they are not sources of the site's serving ratios.

## Official food-safety reference

- [FoodSafety.gov — Cook to a Safe Minimum Internal Temperature](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): ground meat and sausage, 71°C / 160°F; poultry, 74°C / 165°F; meat casseroles and leftovers, 74°C / 165°F. The tourtière uses the ground-meat endpoint for its pork/beef filling and the reheating endpoint for the chilled filling in the baked pie. Enchiladas use 74°C only when reheating refrigerated cooked chicken. Cocido checks only its chicken thigh at the poultry endpoint. These official endpoints supply safety checks, not recipe-specific cooking times.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 72 unique deeply reviewed recipe IDs. The new [eighteenth-batch tests](../../test/recipe-method-eighteenth.test.mjs) check the four existing IDs, all five locales, measured amounts, serving allocations, timing, and the relevant food-specific endpoints. The shared all-recipes route regression also checks visible time, servings, ingredient lists, and Recipe JSON-LD for the expanded 72-ID set in all five locales.

Validation completed:

- `npm test` passed: all 20 draft audits, build and static audit, and all 73 Node tests.
- A separate `npm run build` passed and generated 1,885 indexable routes across five locales.
- `git diff --check` passed.

This was a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
