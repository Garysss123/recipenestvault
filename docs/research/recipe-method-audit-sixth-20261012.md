# Recipe method audit — sixth batch (2026-10-12)

## Inventory and scope

Baseline: `77a7b5bf799abdd7842c0da3eccf70114150d548` on `codex/recipe-methods-fifth-20261012`.

The published registry in `src/recipes.mjs` contains **353 recipes with 353 unique IDs**. This number is from loading the registry and counting its records and IDs; it is independent of the number of regression tests.

| Cuisine | Recipes | Cuisine | Recipes | Cuisine | Recipes |
| --- | ---: | --- | ---: | --- | ---: |
| Chinese | 13 | Japanese | 21 | Korean | 21 |
| Thai | 21 | Taiwanese | 21 | Indian | 21 |
| Vietnamese | 21 | French | 21 | Italian | 21 |
| Spanish | 20 | British | 13 | German | 13 |
| Greek | 13 | American | 15 | Mexican | 13 |
| Brazilian | 13 | Canadian | 13 | Middle Eastern | 13 |
| Mediterranean | 13 | African | 13 | Other-world | 20 |
| **Total** | **353** |  |  |  |  |

The 18 recipes explicitly excluded for this task are present in the registry and were not changed: mapo tofu, koshari, cheeseburger, tacos al pastor, tiramisu, crème brûlée, New York cheesecake, chicken teriyaki, margherita pizza, pad thai, butter chicken, sauerbraten, panna cotta, mango sticky rice, gulab jamun, masala dosa, coffin bread, and Nanaimo bars. No `localdrafts` content was changed.

## First five deep-review batches

The 20 earlier deep-reviewed recipes were verified by comparing the IDs and per-recipe assertions in `test/recipe-method-regressions.test.mjs` with the corresponding source changes in the five batch commits. The regression list documents audited dishes; it was not used to calculate the site recipe total.

| Batch | Commit | Recipes |
| --- | --- | --- |
| 1 | `0bb6aa7` | moussaka; paella valenciana; poutine; coq au vin |
| 2 | `2f86bc0` | bouillabaisse; pissaladière; pasta con le sarde; stuffat tal-fenek |
| 3 | `3d9a07d` | bibimbap; bulgogi; falafel; shakshuka |
| 4 | `4144dd8` | tonkatsu; Cornish pasty; carnitas; Indonesian beef rendang |
| 5 | `77a7b5b` | Nigerian jollof rice; tandoori chicken; marmitako; bánh flan |

## General static scan — separate from deep review

The baseline static-scan pool was **315 recipes**: 353 registry recipes less the 20 already deep-reviewed and the 18 user-excluded recipes. A broad English-method keyword scan surfaced 48 candidates with an animal-food ingredient keyword but no numeric temperature marker, and 21 with no explicit minutes/hours/days marker in the method. These are review leads only: stocks, condiments, visual doneness cues, and methods whose endpoint does not depend on a fixed time can trigger the same flags. Neither flag is treated as proof of a defect or as a completed deep review.

## Sixth-batch deep review and corrections

| Recipe | Finding and correction |
| --- | --- |
| Peruvian fish ceviche | Removed the unsupported “sashimi-grade” safety implication. The fish is specified as previously frozen and thawed under refrigeration; the method keeps it at 4°C or colder, explains that freezing does not kill every harmful germ and lime juice does not make unsafe fish safe, and warns at-risk groups to avoid raw seafood. Added FDA guidance. |
| Nasi goreng | The shared generic leftover rule allowed three days for cooked rice. The rice ingredient and method now require rapid cooling, ideally within one hour; the dish’s storage text limits refrigeration to 24 hours and reheating to once until steaming hot. The egg method now requires both yolks and whites to be firm. Added Food Standards Agency and FoodSafety.gov guidance. |
| Singapore chilli crab | Allocated the listed crab, aromatics, sauce, thickener, egg, mantou, and three spring onions to their method steps. Crab doneness now follows FDA’s firm, pearly-white, opaque cue; the egg sauce reaches 71°C (160°F). Added FDA and FoodSafety.gov sources. |
| Senegalese ceebu jën (thiéboudienne) | The fish step relied only on opacity and flaking. It now checks the thickest part of every steak with a food thermometer at 63°C (145°F), alongside the visual cue. The tomato-base step also allocates all listed 60 ml neutral oil. Added the official seafood-temperature source. |

All four method corrections are localized in English, Traditional Chinese, Japanese, Korean, and Thai and have recipe-specific regression assertions. No UI, browser, or actual-cooking validation is claimed.

## Official safety references

- FDA, [Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely).
- FoodSafety.gov, [Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures).
- UK Food Standards Agency, [Home Food Fact Checker — Rice](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker).
