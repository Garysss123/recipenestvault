# Recipe method reimplementation — batch 5

Continued from the verified GitHub tip f8a4c6bbec019f3a9a0a13d87948b6adc35d96e2 on codex/recipe-rebuild-next-20261015. This is new recipe writing from existing records; no ZIP or Library files were used.

This batch finishes the two remaining excluded slugs. The dated ledger now records 353 of 353 published recipes reviewed, 18 distinct reimplemented methods, zero exclusions, and zero unclassified recipes. The older 2026-10-13 snapshot remains at 335 reviewed plus its disjoint 18 exclusions.

| Recipe | Servings | Steps | Prep / cook / total (minutes) |
| --- | ---: | ---: | ---: |
| Tacos al pastor | 6 | 9 | 275 / 45 / 320 |
| Tiramisu | 8 | 6 | 400 / 10 / 410 |

Every step, title, tip, recovery note, and storage instruction is present in English, Traditional Chinese, Japanese, Korean, and Thai. Tests compare the serving counts, exact ingredient rows, step counts, and illustration stages against the original records. Neither recipe needed an ingredient-row change: the method uses the original measured amounts and records the 4-hour pork marinade and 6-hour tiramisu set in elapsed time.

## Food-safety evidence

- Tacos al pastor keeps the pork covered at or below 4°C/40°F while marinating, separates raw pork and used marinade from toppings, and discards the used marinade. The [FoodSafety.gov temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) sets whole pork steaks at 63°C/145°F followed by a three-minute rest; the method probes each skillet batch and rests the cooked pork five minutes before chopping. Leftovers are cooled and refrigerated within two hours, stored for 3–4 days, and reheated to 74°C/165°F using the [handling guide](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [cold-storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts).
- Tiramisu cooks the five-yolk, sugar, and salt mixture to 71°C/160°F before it is folded into the mascarpone and cream; the finished dessert is never served with raw yolks. This follows the FDA's [egg-safety guidance](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety) and the [egg-dish temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures). The dessert remains covered at or below 4°C/40°F, returns to refrigeration within two hours, and is used within 3–4 days, following FDA egg guidance and the [FoodSafety.gov handling guide](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety).

## Verification

- Focused regressions: node --test test/recipe-method-eighty-seventh.test.mjs test/recipe-method-eighty-eighth.test.mjs test/recipe-method-eighty-ninth.test.mjs — passed, 3 tests.
- Full project test: npm test — passed, 408 tests.
- Separate build: npm run build — passed, 1,885 indexable URLs across five locales.
- Whitespace: git diff --check HEAD — passed.
- Exact-slug audit: 353 published IDs / 353 unique, 353 reviewed IDs / 353 unique, no missing or extra slugs, 18 reimplemented IDs / 18 unique and valid, zero exclusions. The 2026-10-13 ledger remains 335 reviewed and 18 excluded.
