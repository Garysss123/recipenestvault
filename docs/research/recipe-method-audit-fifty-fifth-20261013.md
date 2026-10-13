# Recipe method audit — fifty-fifth batch (2026-10-13)

## Scope and coverage

Base: exact commit `1aa7e0d2d3a3405a35ab1b7f88d6e9942d442fe6`, the requested tip of `codex/recipe-methods-fifty-fourth-20261013`. Work branch: `codex/recipe-methods-fifty-fifth-20261013`, created directly from that commit.

The README and available repository instructions were checked. No RecipeNestVault `AGENTS.md`, project `.agents/skills`, or separate mounted shared ledger file was present. The exact shared five-locale deep-review ledger is `test/recipe-method-regressions.test.mjs`; the standing 18-slug exclusion set is in `test/recipe-method-fiftieth.test.mjs`. At the base, the registry contained 353 unique recipe IDs, with 216 reviewed IDs and 18 exclusions; 119 recipes were eligible. The four selected slugs were absent from both the base ledger and exclusions: `three-cup-chicken`, `chiayi-turkey-rice`, `banh-xeo`, and `pollo-alla-cacciatora`. The shared ledger now contains 220 unique IDs; 115 eligible recipes remain. The recipe registry and generated indexable URL count remain 353 recipes and 1,885 URLs.

Each published recipe is cloned before refinement. Source drafts remain unchanged. Bánh xèo retains its eight illustrated steps and Pollo alla cacciatora retains its five illustrated steps; their existing illustration descriptions and mappings are preserved.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Three-cup chicken (`three-cup-chicken`) | Ingredient preparation and batch browning needed clearer handling; braise and reduction stages needed times and a clear separation between estimate and poultry doneness. | State the 4 cm chicken pieces, keep raw chicken chilled until cooking, allocate all measured ginger, garlic, soy, rice wine, water, sesame oil, and basil, and give staged estimates for infusion, browning, braising, reduction, and rest. Use 74°C / 165°F in the thickest part away from bone as the poultry endpoint. Set prep/cook/total fields to 20/45/65 minutes. Align the storage card to prompt chilling, ≤4°C / 40°F, 3–4 days, and reheating to 74°C / 165°F. |
| Chiayi turkey rice (`chiayi-turkey-rice`) | Stock and shallot oil were not fully allocated; turkey doneness and cooked-rice storage needed separate applicable guidance. | Allocate 280 ml strained stock as 30 ml for the shredded turkey and 250 ml for gravy. From the measured 45 ml shallot oil, assign 15 ml to gravy, 24 ml as 6 ml per bowl, and the remaining 6 ml for adjustment or another use. Specify four 200 g rice bowls and toppings. Check turkey at 74°C / 165°F. Give cooked rice the FSA cooling-within-1-hour, 24-hour refrigeration, and single-reheat guidance; keep the turkey endpoint explicit. Set prep/cook/total to 25/75/100 minutes. Replace an unrelated chicken-rice dish reference with Serious Eats' turkey-rice reference. |
| Bánh xèo (`banh-xeo`) | Listed water, fish sauce, oil, pork cut, and four crêpe portions needed exact destinations; the old pork and shrimp temperature instructions applied a generic fish value to shrimp. | Allocate the 450 ml water as 350 ml batter and 100 ml dip; 50 ml fish sauce as 10 ml pork and 40 ml dip; and all 60 ml oil as 10 ml for pork/onion, 10 ml for shrimp, and 10 ml per crêpe. Cook pork as an intact 2.5 cm steak to 63°C / 145°F and rest 3 minutes before slicing; cook shrimp until pearly white and opaque, without assigning shrimp an unrelated numeric temperature. Preserve the illustrated eight-step sequence and detail the 4 crêpes, filling, 32–40 minute skillet estimate, and 55-minute cook-field basis. Chill cooked crêpes and fillings promptly at ≤4°C / 40°F and reheat to 74°C / 165°F. State that the official chart gives no cooked shrimp/crêpe storage duration; label the two-day best-texture window as a recipe preference, not a safety cutoff. |
| Pollo alla cacciatora (`pollo-alla-cacciatora`) | The five-step illustrated method needed ingredient destinations, timed braise and reduction stages, and safety checks separated from texture cues. | Keep the five-step illustrated sequence and use its original image scenes. Allocate 3 g of the 5 g salt to the chicken and 2 g to the sauce. Describe measured oil, aromatics, wine, tomatoes, stock, and olives with staged estimates; begin temperature checks near the low end of the 25–30 minute braise estimate and verify chicken at 74°C / 165°F away from bone. Label sauce thickness and time as quality cues. Align the 65-minute cook estimate with all timed stages and the storage card with ≤4°C / 40°F, 3–4 days, and 74°C / 165°F reheating. |

All revised methods, ingredient allocations, times, servings, and storage cards are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Estimates and quality preferences are distinguished from applicable official safety endpoints. No numeric seafood temperature is assigned to shrimp.

## Official food-safety references checked

- [FoodSafety.gov: Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) — poultry at 74°C / 165°F; intact pork cuts at 63°C / 145°F followed by a 3-minute rest; shrimp doneness described visually as pearly and opaque, without a numeric temperature.
- [FoodSafety.gov: 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) — separation of raw and ready-to-eat food, refrigeration within two hours, refrigerator at or below 4°C / 40°F, shallow containers, and reheating leftovers to 74°C / 165°F.
- [FoodSafety.gov: Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) — 3–4 days for cooked meat and poultry leftovers under refrigeration at or below 4°C / 40°F; the chart does not give a cooked shrimp or crêpe leftover duration.
- [UK Food Standards Agency: Home Food Fact Checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker) — cooked rice should be cooled quickly, ideally within one hour, refrigerated and used within 24 hours, then reheated only once until steaming hot.

Dish references remain separate from official food-safety sources: The Woks of Life and Omnivore's Cookbook for three-cup chicken; Epicurious and Serious Eats for Chiayi turkey rice; Delightful Plate and Hungry Huy for bánh xèo; and GialloZafferano and La Cucina Italiana for pollo alla cacciatora.

## Review and verification

This was a same-model self-review, not an independent or human review. The session identifies the model family as GPT-6; the exact runtime variant is not exposed to this process. The recipes were not cooked.

- `npm test`: passed 20 cuisine draft audits, built 1,885 URLs, passed the static audit, and passed 254/254 Node tests.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-fifty-fifth.test.mjs`: passed 60/60.
- `git diff --check`: passed.

No full-page UI or visual review is claimed. No preview/local server, headless browser, CDP session, security-setting change, deployment, or production validation was used.

## Changed paths

- Published method refinements and import hook: `src/recipe-method-audit-fifty-fifth.mjs`, `src/recipes.mjs`.
- Four new five-locale recipe detail assertions: `test/recipe-method-fifty-fifth.test.mjs`.
- Shared review ledger, current counts, and historical slice/count expectations: `test/recipe-method-regressions.test.mjs` and the affected existing `test/recipe-method-*.test.mjs` coverage checks.
- This audit report: `docs/research/recipe-method-audit-fifty-fifth-20261013.md`.
