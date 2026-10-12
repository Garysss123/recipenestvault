# Recipe method audit — seventeenth batch (2026-10-12)

## Coverage

Base: `bc04cb4768af28003712f76697fd3e20ac940ee8` on `codex/recipe-methods-sixteenth-20261012`; work branch: `codex/recipe-methods-seventeenth-20261012`.

The registry contains 353 existing recipes. The base branch's coverage list contains 64 distinct deep-reviewed IDs. This batch adds four existing recipes, bringing the list to 68 reviewed and leaving 267 eligible after retaining the same 18 user exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. No recipe was added, no excluded recipe was modified, and no `localdrafts` content was touched.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Khao Man Gai | The method did not allocate broth separately for the rice and soup, the 450 g dry-rice batch exceeded the former fixed cooked-rice portions, and the sauce's reserve/serving split was incomplete across locales. Prep ordering did not show which work could happen during the chicken's covered hold. | Keep six servings; revise prep/cook/total estimates to 45/110/155 minutes. Salt and chill the chicken for 30 minutes while the rice drains and aromatics are prepared. Poach at 82–88°C for 35 minutes, then hold covered for 25 minutes; check the deepest thigh at 74°C. Use 900 ml broth for the listed 450 g dry rice and measure 1.2 L separately for the soup; reserve extra broth. Divide all cooked rice and chicken across six plates (rice equivalent 75 g dry rice and about 140–160 g cooked chicken per plate); split the cucumber, sauce, and about 200 ml soup per person. The source amount/timing ratios are not claimed as this site's exact formula. |
| Goan Fish Curry | Fish salting overlapped the souring-ingredient soak but the sequence was unstated. The fish endpoint and its check-and-continue path were absent; the recipe did not state how its fish and rice serve four. | Keep four servings; set prep/cook/total to 25/40/65 minutes. Salt the fish for 15 minutes while tamarind and kokum soak. Simmer fish in one layer and check the thickest piece at 63°C and for flaking; if it has not reached 63°C after 7 minutes, continue in 1-minute intervals. Rest covered for 8 minutes. Add 600 g cooked rice as an explicit site serving amount: divide 700 g raw fish among four servings (about 175 g raw fish each) and serve 150 g cooked rice each. |
| Sri Lankan Egg Hoppers | The four-hour fermentation and per-hopper covered egg cook needed an explicit time and visual endpoint. Soft yolks needed a clear treated-egg safety branch. | Keep four servings; set prep/cook/total to 260/20/280 minutes. Ferment the batter about four hours until bubbles appear; cover each egg hopper for about 3–4 minutes until the white is fully set and the rice edge is crisp and lacy. Use pasteurized or otherwise treated shell eggs for a soft/runny yolk; with untreated eggs, cook until both white and yolk are firm. The four-hour fermentation and site's ingredient amounts are editorial choices: the checked references use different formulas and fermentation times. |
| Shepherd's Pie | Potato preparation and meat browning could run in parallel but the method did not say so. The filling needed a measured endpoint appropriate to ground lamb, a timed recheck, and a clear six-way serving instruction. | Keep six servings; set prep/cook/total to 30/95/125 minutes. Start the potatoes first, brown the lamb while they simmer, then simmer the filling while mashing. Check the centre of the ground-lamb filling at 71°C; if lower, continue in 2-minute intervals and recheck. Bake at 200°C for 25–30 minutes, rest 10 minutes, and cut six equal portions. |

All changed recipe copy was prepared and self-reviewed in English, Traditional Chinese, Japanese, Korean, and Thai by one model. No second-model or human review is claimed.

## Recipe references checked

These pages were used for dish context and method comparison; their recipes are not represented as the source of this site's exact quantities, ratios, or timing.

- Khao Man Gai: [Eating Thai Food — Khao Man Gai](https://www.eatingthaifood.com/chicken-rice-khao-man-gai-recipe/) and [Ian Benites — Hainanese Chicken Rice (Khao Man Gai)](https://ianbenites.com/hainanese-chicken-rice-khao-man-gai/). They support the chicken, rice, broth, and Thai soybean-sauce set and related poaching/rice methods; quantities differ.
- Goan Fish Curry: [The Yummy Delights — Goan Fish Curry](https://theyummydelights.com/goan-fish-curry/) and [Pat-a-Cake — Authentic Goan Fish Curry](https://veenapatwardhan.com/pat-a-cake/2023/02/03/authenticeasygoanfishcurryrecipe/). They support coconut/chile/souring ingredients, a gently cooked curry base, and adding fish late; formulas and timings differ.
- Sri Lankan Egg Hoppers: [Australian Eggs — Sri Lankan Egg Hoppers](https://www.australianeggs.org.au/recipes-and-cooking/egg-hoppers) and [Hungry Lankan — Sri Lankan Hoppers](https://www.hungrylankan.com/recipes/sri-lankan-hoppers/). They support the hopper batter, pan, covered egg-hopper method, and dish context. Australian Eggs gives a 3–4-minute covered cook; Hungry Lankan describes a much longer fermentation, so the site's four-hour fermentation remains an editorial choice.
- Shepherd's Pie: [Great British Chefs — Shepherd's pie](https://www.greatbritishchefs.com/recipes/shepherds-pie-recipe) and [The Guardian — How to cook the perfect shepherd's pie](https://www.theguardian.com/lifeandstyle/2018/apr/19/the-perfect-shepherds-pie-recipe-felicity-cloake). They support the lamb mince and potato-topping method context; the site's ingredient amounts and sequence are its own.

## Official food-safety references checked

- [FoodSafety.gov — Cook to a Safe Minimum Internal Temperature](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): poultry, including whole birds and thighs, 74°C / 165°F; ground meat 71°C / 160°F; fish fillets 63°C / 145°F or flesh that is no longer translucent and separates easily. The chart also says untreated eggs should be cooked until yolk and white are firm. The site applies each endpoint to the corresponding food and does not turn these into source recipe timings.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): cook eggs until yolk and white are firm; use eggs treated by in-shell pasteurization or another approved method when serving eggs raw or undercooked. The hopper method follows this treated-egg branch and adds no unrelated meat or fish temperature.
- [UK Food Standards Agency — Why avoiding cross-contamination is important](https://www.gov.uk/government/publications/why-avoiding-cross-contamination-is-important/why-avoiding-cross-contamination-is-important): do not wash raw poultry, meat, or fish; washing can splash bacteria, and separate boards/utensils help avoid cross-contamination. This supports the Khao Man Gai raw-chicken handling instruction.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 68 unique deeply reviewed recipe IDs. The new [seventeenth-batch tests](../../test/recipe-method-seventeenth.test.mjs) check all five locales for ingredient and method coverage, allocated rice/broth/sauce, portions, prep sequence, cook times, and matching food-specific safety endpoints. The existing all-recipes route test also checks visible timing and Recipe JSON-LD for the 68 covered IDs in every locale.

Validation completed:

- `npm test` passed: all 20 draft audits, build and static audit, and 68 Node tests.
- A separate `npm run build` passed and produced 1,885 indexable URLs across five locales.
- `git diff --check` passed.

This was a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
