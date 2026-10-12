# Recipe method audit — twenty-seventh batch (2026-10-12)

## Coverage

Base commit: `0f62f593f05ae4004d3830f515ac5b5f577e7356` on `codex/recipe-methods-twenty-seventh-20261012` (parent `5f7d27e598301d72b1e481f3c1fa03d0bd7f02dd`).

The published registry remains at 353 existing recipes. The shared deep-review list grows from 104 to 108 unique recipes, leaving 227 eligible after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. The four recipe IDs were absent from the previous shared list. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Cantonese char siu (`char-siu`) | The displayed prep estimate counted the eight-hour minimum marinade but omitted active handling; the roast time could be mistaken for a doneness guarantee, and servings were not allocated. | Keep 900 g pork shoulder and six servings. Set prep/cook/total to 490/50/540 minutes: the prep estimate includes the eight-hour minimum refrigerated marinade and about 10 minutes of mixing and handling. Treat the final 5–8-minute glaze roast as a guide, check the largest strip at 63°C / 145°F, continue in two-minute increments if needed, and rest for 10 minutes before slicing. Divide the pork among six servings, about 150 g raw-pork equivalent each. |
| Hyderabadi chicken dum biryani (`hyderabadi-chicken-biryani`) | The method did not connect its three-hour displayed prep estimate to the refrigerated marinade, and the chicken endpoint lacked a thermometer placement and recheck path. | Keep six servings and 180/75/255-minute prep/cook/total estimates. State that prep uses a three-hour marinade and overlaps onion, herb, rice, and saffron-milk preparation. Probe several thick chicken pieces near, but not touching, the bone; each must reach 74°C / 165°F. Reseal and cook in five-minute increments if needed, checking the rice for a hard core. Divide 1 kg raw bone-in chicken and 500 g dry rice into six plates: about 167 g raw chicken equivalent and 83 g dry-rice equivalent per serving. |
| Shrimp and vegetable tempura (`tempura`) | Shrimp handling needed a clear chilled hold and raw/cooked separation. The prior 63°C internal endpoint was not the species-specific FDA cue for shrimp. | Keep two shrimp and two servings, one shrimp per serving. Refrigerate the covered shrimp while preparing vegetables and keep raw-shrimp tools separate. Frying time remains a guide; check that the thickest shrimp flesh is firm, pearly white, and opaque throughout. Do not assign a fixed internal temperature to shrimp. The 165–175°C figure describes frying-oil temperature only. |
| Australian lamingtons (`lamingtons`) | The pan size, bake window, cooling and setting waits, and jam allocation were implicit; the former 90-minute prep estimate did not cover them. | Use a 20 cm square tin for sixteen 5 cm squares. Bake at 180°C for about 20–25 minutes, using a springy centre and edges beginning to pull from the tin as cues; continue in three-minute increments if needed. Cool about 45 minutes, chill for one hour before filling, and allow about 30 minutes for the coating to set. Set prep/cook/total to 165/25/190 minutes. Spread 180 g jam across 16 pieces, about 11 g per square on average, and serve one square per serving. |

All site-specific ingredient amounts, portion arithmetic, prep/cook estimates, and durations are editorial adaptations. Dish references support the dish identity and general preparation technique; they are not claimed as sources for this site's exact ratios, amounts, servings, timings, or temperatures. Where applicable, official food-safety references are separately labeled and used only for the relevant safety endpoint. The shrimp method uses the FDA's visual doneness cue rather than an unrelated fixed temperature.

## Recipe references

- Char siu: [The Woks of Life — Char Siu (Chinese BBQ Pork)](https://thewoksoflife.com/chinese-bbq-pork-cha-siu/) and [RecipeTin Eats — Char Siu Pork](https://www.recipetineats.com/chinese-barbecue-pork-char-siu/). These support the Cantonese roast-pork identity and general marinade, rack-roasting, glaze, and rest sequence.
- Hyderabadi biryani: [Swasthi's Recipes — Hyderabadi Chicken Biryani](https://www.indianhealthyrecipes.com/hyderabadi-biryani-recipe/) and [Sailu's Food — Hyderabadi Chicken Dum Biryani](https://www.sailusfood.com/hyderabadi-chicken-dum-biryani/). These support the raw-marinated chicken, partially cooked basmati rice, layering, and sealed dum method.
- Tempura: [Kikkoman — Tempura Recipe](https://www.kikkoman.com/en/cookbook/washoku/tempura.html) and [Just One Cookbook — How to Make the Best Tempura](https://www.justonecookbook.com/tempura-recipe/). These support the cold, lightly mixed batter and Japanese shrimp-and-vegetable tempura method.
- Lamingtons: [SBS Food — Classic Lamington](https://www.sbs.com.au/food/recipe/classic-lamington/z49b7cotq) and [Taste.com.au — Lamington Recipe](https://www.taste.com.au/recipes/lamingtons-recipe/). These support the sponge, chocolate coating, coconut finish, and doneness cues.

## Official food-safety guidance

These sources are separate from the recipe references above:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole pork cuts at 63°C / 145°F followed by a three-minute rest; poultry at 74°C / 165°F.
- [FDA — Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely): keep seafood chilled and separated from ready-to-eat food; shrimp flesh is firm, pearly, and opaque when cooked.

## Translation and review

The modified English, Traditional Chinese, Japanese, Korean, and Thai method text was translated and self-reviewed in a single-model pass. This is not an independent translation review. No second-model or human review is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 108 unique deep-reviewed IDs for shared recipe-detail route checks across all five locales. The [twenty-seventh-batch tests](../../test/recipe-method-twenty-seventh.test.mjs) cover the four existing IDs, unchanged 353-recipe registry, standing 18 exclusions, five-locale completeness, portions, timings, step order and doneness cues, and separation of official safety sources from dish references. Shared-coverage assertions advance from 104 to 108; the previous 104 IDs remain present.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
