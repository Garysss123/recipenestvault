# Recipe method audit — seventy-first batch (2026-10-13)

## Coverage and branch

Base: `09c08745b8ce1bb3be00f1c5b74e4e557b042b62` on `codex/recipe-methods-seventieth-20261013` (parent `48d2d878423c30e335c6257fd4c0e261d825ebec`, tree `ef8edc49d43c35a9074c1dca3e23f1c781aa9c5c`). Work branch: `codex/recipe-methods-seventy-first-20261013`.

The registry remains at 353 recipes. Exact-slug deep-review coverage grows from 280 to 284, leaving 51 eligible unchecked recipes. The same 18 recipes remain excluded: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. All four selections were absent from the 280-ID base ledger and are not excluded.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Tarta de Santiago (`tarta-de-santiago`) | The cake had visual and skewer cues, but its egg-rich centre had no measured safety endpoint or correction for a browned top and underbaked centre. Room-temperature storage had no egg-specific guidance. | Keep five natural steps. Add the 71°C / 160°F egg endpoint, retain the moist-crumb cue, and tent the top while baking in 3-minute increments if the centre is not ready. Refrigerate promptly and separate the 3–4 day egg-dish safety window from serving-temperature preference. |
| Cannoli Siciliani (`cannoli-siciliani`) | Frying had no batch/temperature recovery cue; a loose ricotta filling had no correction. The filled pastry had no room-temperature service limit. | Keep seven natural steps. Maintain 170–175°C oil in small batches, with short colour-based corrections. If the filling slumps, chill and drain it again rather than adding sugar. Refrigerate filled cannoli and limit time out to two hours (one hour above 32°C / 90°F). Replace the GialloZafferano source with its accessible English page. |
| Taiwanese Peanut Shaved Ice (`peanut-shaved-ice`) | A single peanut test could miss firm centres, and cooling in the cooking liquid did not specify a shallow depth or prompt refrigeration. | Keep six natural steps. Test three of the largest peanuts; continue in 10-minute increments and add boiling water in measured amounts if needed. Cool the cooked peanuts in shallow containers and refrigerate within two hours (one hour above 32°C / 90°F). The three-day peanut window is labeled as a texture preference. |
| Mumbai Pav Bhaji (`pav-bhaji`) | Pressure-cooking time did not say when its clock starts, vegetable doneness was general, and the final bhaji had no measurable way to correct overly thick or loose consistency. | Keep seven natural steps. Start the five-minute timer at high pressure, test the largest vegetables, and add a one-minute pressure-cook correction if needed. Use a spatula-track test and measured water or uncovered simmer increments to correct thickness. Clarify cooked-stew cooling, storage, and 74°C / 165°F leftover reheating guidance. |

All updated method and storage copy is localized in English, Traditional Chinese, Japanese, Korean, and Thai. Source drafts, ingredient amounts, natural step counts, and illustration mappings remain unchanged. Recipe-specific references remain separate from official food-safety guidance.

## Recipe references

- Tarta de Santiago: [Spain.info — Tarta de Santiago](https://www.spain.info/en/recipe/tarta-santiago/) and [Foods & Wines from Spain — Tarta de Santiago](https://www.foodswinesfromspain.com/en/fws-academy/recipes/2020/march/video-recipe--tarta-de-santiago--almond-cake-).
- Cannoli Siciliani: [GialloZafferano — Sicilian Cannoli](https://www.giallozafferano.com/recipes/sicilian-cannoli.html) and [La Cucina Italiana — Cannoli siciliani](https://www.lacucinaitaliana.it/ricetta/dolci-e-dessert/cannoli-siciliani-ricetta-classica/).
- Taiwanese Peanut Shaved Ice: [Jen Lin-Liu — Taiwanese Shaved Ice](https://www.jenlinliu.com/recipes-1/2020/8/27/meet-fresh-style-taiwanese-shaved-ice) and [The Sound of Cooking — Taiwanese Baobing](https://thesoundofcooking.com/shaved-ice-taiwanese-baobing/). These sources cover the shaved-ice, syrup, and cooked-topping techniques; the recipe's measured peanut tenderness and cooking adjustments are this site's adaptation.
- Pav Bhaji: [Dassana's Veg Recipes — Pav Bhaji](https://www.vegrecipesofindia.com/pav-bhaji-recipe-mumbai-pav-bhaji-a-fastfood-recipe-from-mumbai/) and [Meera Sodha — Pav Bhaji (The Guardian)](https://www.theguardian.com/food/2026/feb/14/pav-bhaji-recipe-meera-sodha). The Guardian's pressure-free method is an additional technique reference; the pressure-cooker time is this site's adaptation.

## Official food-safety guidance

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): egg dishes to 71°C / 160°F and reheated leftovers to 74°C / 165°F. Used for the Tarta egg-rich cake endpoint and pav bhaji leftovers.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): egg handling, 71°C / 160°F for egg-containing dishes, prompt refrigeration, and limits for cooked egg dishes. Applied to Tarta and raw-egg shell handling for cannoli.
- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): refrigerate perishables within two hours (one hour above 32°C / 90°F), keep the refrigerator at or below 4°C / 40°F, and use shallow containers for leftovers. Applied to cannoli filling, cooked peanuts, and pav bhaji.
- [FoodSafety.gov — Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): cooked vegetable soups and stews, 3–4 days at or below 4°C / 40°F. Applied to pav bhaji.

## Regression coverage and limits

The shared ledger covers 284 unique exact slugs; 51 eligible unchecked recipes remain after standing exclusions. The seventy-first regression checks exact eligibility and counts, all five locales, new doneness and correction cues, official source labels, unchanged source drafts, natural step counts, and illustration mappings. Historical ledger-window assertions were shifted to continue testing their original batches as shared coverage grew.

## Validation results and review limits

- `npm test` — passed all 20 `audit:*drafts` commands wired in `package.json`; `src/recipes.mjs` separately assembles 21 recipe source groups. The command count and source-group count describe different things. Build generated 1,885 indexable routes; static audit passed across 10,816 files; Node test suite passed 342/342.
- Independent `npm run build` — passed, generating 1,885 indexable URLs across five locales.
- Independent `npm run audit` — passed: 10,816 files and 1,885 indexable routes; links, fragments, recipe completeness, provenance, metadata, and structured data passed.
- Focused regression `node --test test/recipe-method-regressions.test.mjs test/recipe-method-seventieth.test.mjs test/recipe-method-seventy-first.test.mjs` — passed 67/67.
- Full recipe-method regression set — passed 333/333, including the corrected historical ledger windows.
- `git diff --check` — passed.

Recipe cooking and browser/UI review were not performed. No browser, CDP, HTTP crawl, deployment, or production validation was used. The recipe references and official food-safety guidance were reviewed as source material; kitchen outcomes remain unverified.
