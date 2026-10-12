# Recipe method audit — twenty-sixth batch (2026-10-12)

## Coverage

Base commit: `5f7d27e598301d72b1e481f3c1fa03d0bd7f02dd` on `codex/recipe-methods-twenty-sixth-20261012`.

The published registry remains at 353 existing recipes. The shared deep-review list grows from 100 to 104 unique recipes, leaving 231 eligible after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. The four reviewed IDs were not in the previous shared list. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Chicken tikka masala (`chicken-tikka-masala`) | The marinade wait, prep overlap, chicken safety endpoint and per-serving chicken share needed to be explicit. | Keep 6 servings and 45/60/105-minute prep/cook/total estimates. Marinate 800 g chicken for at least 30 minutes while dicing the onion and measuring remaining sauce ingredients; separate raw-chicken tools from ready-to-eat food. Broil in a spaced layer for 12–15 minutes, then check several thick pieces at 74°C / 165°F, continuing in 2-minute increments as needed. Divide into six bowls, about 133 g raw-chicken equivalent per serving. |
| Pad kra pao (`pad-kra-pao`) | Oil use was not divided by stage, the pork could crowd the wok, and the fried-egg endpoint was unclear. | Keep 4 servings and set prep/cook/total to 20/20/40 minutes. Split 60 ml oil into 20 ml for the pork and 40 ml for the eggs. Brown 500 g pork in two 250 g batches; check the largest crumbles at 71°C / 160°F and continue/recheck if needed. Fry eggs until whites set and edges crisp; cook yolks firm or use pasteurized eggs for a runny yolk. Divide 600 g cooked rice into four 150 g plates, each with one egg and about 125 g raw-pork equivalent. Preserve the existing step order for its illustration sequence. |
| Gambas al ajillo (`gambas-al-ajillo`) | The prawns needed chilled holding and clean utensil guidance, the garlic oil needed a wide pan and controlled heat, and the final ingredients needed per-serving amounts. | Keep 4 servings and 10/8/18-minute prep/cook/total estimates. Keep 500 g prawns refrigerated while preparing the other ingredients. Infuse garlic and dried chile in a wide 30 cm pan over medium heat for 3–4 minutes until pale gold, without browning. Cook prawns in one loose layer for 60–90 seconds per side as a guide, stopping when the thickest are firm, pearly and opaque with no grey translucent centre. Do not impose a numeric shrimp temperature. Allocate about 125 g raw prawns, 40 ml oil and 50 g bread to each serving. |
| Churrasco de picanha (`churrasco-picanha`) | The beef temperature had been presented as a doneness preference without its required rest; egg and plate allocations were implicit, and the relish timing overlapped ambiguously with the full 10-minute farofa. | Keep 4 servings and 20/35/55-minute estimates. While the grill preheats, mix the relish in a separate clean bowl and let it stand at least 5 minutes while the beef cooks. Grill the 900 g cut and check its thickest centre at 63°C / 145°F; continue in 2-minute increments if needed. Rest 10 minutes, including the official minimum 3-minute rest, while preparing the farofa. Cook the two farofa eggs until fully set with no liquid egg. Divide into four plates with about 225 g raw-beef equivalent, 150 g cooked rice and one quarter of each side. Preserve the existing step order. |

All quantities, per-serving allocations, site prep/cook estimates and method durations above are editorial adaptations for this site. The dish references support each dish's identity and general preparation method; they are not claimed as sources for this site's exact ratios, amounts, temperatures, servings or times. Official food-safety guidance is separately labeled in recipe sources and in this report, and is used only for relevant safety endpoints. Shrimp uses the FDA visual cue rather than an unrelated temperature.

## Recipe references

- Chicken tikka masala: [Great British Chefs — Chicken Tikka Masala](https://www.greatbritishchefs.com/recipes/chicken-tikka-masala-recipe) and [Good Food — How to make next level chicken tikka masala](https://www.bbcgoodfood.com/howto/guide/how-make-next-level-chicken-tikka-masala). These support the dish identity and general marinade, grilling and sauce method.
- Pad kra pao: [Hot Thai Kitchen — Pad Kra Pao](https://hot-thai-kitchen.com/pad-kra-pao-anything/) and [Eating Thai Food — Pad Kra Pao](https://www.eatingthaifood.com/thai-basil-chicken-recipe-pad-kra-pao-gai/). These support the dish identity and common holy-basil stir-fry method.
- Gambas al ajillo: [Good Food — Gambas al ajillo](https://www.bbcgoodfood.com/recipes/gambas-al-ajillo) and [Saveur — Gambas Al Ajillo](https://www.saveur.com/article/Recipes/Chile-Garlic-Shrimp/). These support the garlic-chile oil and shrimp preparation.
- Churrasco de picanha: [Brazilian Kitchen Abroad — Picanha Brazilian Coulotte Steaks](https://braziliankitchenabroad.com/picanha-brazilian-culotte-steaks/) and [Serious Eats — Brazilian Picanha Steak](https://www.seriouseats.com/grilled-picanha-brazilian-style-steak-recipe). These support the picanha cut, fat-cap treatment and grilling method.

## Official food-safety guidance

These official sources are separate from the dish references:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole beef and pork cuts at 63°C / 145°F followed by a 3-minute rest; ground meat at 71°C / 160°F; poultry at 74°C / 165°F; eggs cooked until yolk and white are firm; egg dishes at 71°C / 160°F; shrimp cooked until pearly/white and opaque.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): cook eggs until both yolk and white are firm; use pasteurized shell eggs or egg products for raw or undercooked eggs.
- [FDA — Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely): shrimp are firm, pearly and opaque when done; keep seafood chilled and prevent cross-contamination.

## Translation and review

The modified English, Traditional Chinese, Japanese, Korean and Thai method text was translated and self-reviewed in a single-model pass. This is not an independent translation review. No second-model or human review is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 104 unique deep-reviewed IDs for shared recipe-detail route checks across all five locales. The new [twenty-sixth-batch tests](../../test/recipe-method-twenty-sixth.test.mjs) cover the four existing IDs, unchanged 353-recipe registry, standing 18 exclusions, five-locale completeness, quantities and serving allocations, step order, cooking times, applicable doneness cues, source labels and the separation between official safety sources and dish references. Earlier shared-coverage assertions advance from 100 to 104; the previous 100 IDs remain present.

Validation passed: `npm test` ran all 20 cuisine draft audits, the static audit and 109/109 Node tests; its build produced 1,885 indexable URLs. A separate `npm run build` also completed with 1,885 indexable URLs. `git diff --check` passed.

This is a source, translation and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment and production validation were not performed.
