# Recipe method audit — fourteenth batch (2026-10-12)

## Coverage

Base: `c50b49e226732b893a8dc46e0082b921a88280b0` on `codex/recipe-methods-thirteenth-recovery-20261012`; this work is on `codex/recipe-methods-fourteenth-20261012`.

The registry contains 353 recipes with 353 unique IDs. The first thirteen batches deeply reviewed 52 distinct recipes. The same 18 user exclusions remain excluded: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. Chicken Shawarma, Za’atar Manakish, Jambalaya, and Thịt Kho Trứng were existing recipes, were not among the prior 52 or the exclusions, and bring the cumulative deep review to 56 distinct IDs, leaving 279 eligible recipes. No new recipes were added and no `localdrafts` content was changed.

## Findings and changes

| Recipe | Finding | Change |
| --- | --- | --- |
| Chicken Shawarma Wraps | Salt and pepper shared an unquantified combined entry; garlic sauce was named in the description and wrap method without being listed; the bake time had no safe poultry endpoint. | Split salt to 8 g and black pepper to 2 g; add 120 g optional garlic sauce, allocated as 20 g per each of six wraps. Set the oven to 230°C, roast in one layer for 22–28 minutes, turn after 12 minutes, and start thermometer checks at 22 minutes. Require 74°C / 165°F at the thickest thigh, with 3-minute additional intervals and rechecks, then rest 5 minutes. Prep/cook/total are 45/30/75 minutes. |
| Za’atar Manakish | Dough oil and topping oil were not fully allocated; proofing and batch baking lacked useful bounds; the tray oil and portioning did not connect cleanly to the listed formula. | Keep 8 servings and account for all 160 ml listed oil: 35 ml in the dough, 10 ml to coat the rising bowl, 100 ml in the topping, and 15 ml for the trays. Bloom yeast for 10 minutes, knead 8–10 minutes, rise 60–90 minutes to doubled, divide into 8, rest 15 minutes, and shape to 13 cm. Use 80 g za’atar with all 100 ml topping oil, about 1 tablespoon per bread; bake uncrowded batches 8–10 minutes each, allowing up to 20 minutes for two, and cool on a rack for 2 minutes. Prep/cook/total are 150/22/172 minutes. |
| Jambalaya | The method did not check chicken doneness before adding shrimp and gave no clear shrimp endpoint. The published cook estimate did not cover the extra temperature-driven cooking time. | Preserve the 8 servings and listed formula. Before adding shrimp, check the thickest chicken piece with a clean food thermometer for 74°C / 165°F; if needed, keep covered and cook in 3-minute intervals, rechecking. Cook shrimp under the lid for 5–6 minutes until the flesh is pearly white and opaque, then stop cooking. Prep/cook/total are 30/65/95 minutes. |
| Thịt Kho Trứng | The pork check relied on skin tenderness, with no measured food-safety endpoint. | Preserve the existing 6 servings, ingredient amounts and 35/110/145-minute prep/cook/total estimates. Add a thermometer check at the centre of the largest pork cube for 63°C / 145°F, while also requiring tenderness; continue in 10-minute intervals if either is missing. The final 5-minute rest exceeds the official 3-minute rest for whole cuts of pork. |

All changed method and ingredient text was completed in English, Traditional Chinese, Japanese, Korean and Thai. The listed formula amounts and revised stage timings are this site's editorial choices. Recipe references were used to cross-check dish structure, sequence and practical method ranges, not as evidence that this site's amounts or ratios came from those sources.

## Source verification

Official safety reference:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): 74°C / 165°F for poultry and 63°C / 145°F plus a 3-minute rest for whole cuts of pork. These are safety endpoints, not recipe-specific roasting or braising times.

Recipe references checked:

- [Chicken Shawarma — The Mediterranean Dish](https://www.themediterraneandish.com/chicken-shawarma-recipe/) and [Sheet-Pan Shawarma-Spiced Chicken — Bon Appétit](https://www.bonappetit.com/recipe/sheet-pan-shawarma-spiced-chicken): checked for yogurt-spice marinade, oven-roasted chicken, wrapping and sauce context. The existing [BBC Food — Oven-cooked Chicken Shawarma](https://www.bbc.co.uk/food/recipes/oven-cooked_chicken_04728) source-map link was blocked by the web tool's robots restriction during this review; it was not relied on for findings.
- [Za’atar Manaqish — The Mediterranean Dish](https://www.themediterraneandish.com/zaatar-manaqish-recipe/) and [Za’atar Manakish — Zaatar and Zaytoun](https://zaatarandzaytoun.com/zaatar-manakish/): checked for yeast activation, kneading, rising, shaping, za’atar-oil topping and high-heat batch baking. Their formulas and timings differ from one another and from this site's formula.
- [Chicken, Andouille and Shrimp Jambalaya — Food Network Kitchen](https://www.foodnetwork.com/recipes/food-network-kitchen/chicken-andouille-and-shrimp-jambalaya-17939930) and [Jambalaya — Food Network](https://www.foodnetwork.com/recipes/jambalaya-recipe2-1924012): checked for the rice-pot method and the order of sausage, chicken and shrimp. They use different versions and amounts; neither is represented as the source of this site's quantities or timing.
- [Thịt Heo Kho Với Trứng — Hungry Huy](https://www.hungryhuy.com/how-to-make-thit-heo-kho-voi-trung-vietnamese-braised-pork-with-hard-boiled-eggs/) and [Thịt Kho — Wok and Kin](https://www.wokandkin.com/thit-kho/): checked for caramel, coconut-water braising, eggs and the dish's variable family-style methods. Their formulas differ; this site's ingredient ratios remain its own.

## Luna review

Luna reviewed the four recipes' five localized ingredient lists and methods for quantities, order, timings, safety language and source attribution, and checked the changes against the references above. Luna is the same model used for this work: this was self-review and self-translation, not independent review by a second model. No claim of second-model validation is made.

## Regression coverage and limits

The audited ID list now contains 56 distinct recipes. New regressions check all four recipes' five locales, servings, prep/cook/total arithmetic, measured ingredient allocations, method time ranges, safe endpoints and source attribution. Existing rendered-page regressions continue to compare ingredient lists, displayed times and Recipe JSON-LD for all audited IDs in all five locales.

`npm test` passed all locale draft audits, built the site, passed the static audit and passed all 62 Node tests. The build emitted 1,885 indexable URLs. A separate `npm run build` also passed and emitted 1,885 indexable URLs. `git diff --check` passed. This was source, translation, reference and automated regression review; no actual cooking or browser/UI validation was performed.
