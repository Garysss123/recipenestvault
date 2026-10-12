# Recipe method audit — fifty-third batch (2026-10-13)

## Scope and coverage

Base: exact commit `073775338528707f1a52e1331f5987499714a10c`, parent `d10a31968a827e38c1cc4342ce548afb64ecf1ad`, tree `ca4effa4c29783a4cd37757c2eb54ed5507ada01`, the tip of `codex/recipe-methods-fifty-second-20261013`. Work branch: `codex/recipe-methods-fifty-third-20261013`, created directly from that base commit.

Read the project README and checked for relevant `AGENTS.md` and skill files; none were present. The exact shared five-locale review ledger is `test/recipe-method-regressions.test.mjs`; the standing 18-slug exclusion set is in `test/recipe-method-fiftieth.test.mjs`. Compared the base's 353 unique recipe IDs with 208 unique reviewed IDs and 18 exclusions. `tod-mun-pla`, `poulet-basquaise`, `chocolate-chip-cookies`, and `japchae` were absent from both lists. The shared ledger now contains 212 unique reviewed recipes; 123 eligible recipes remain. The registry and generated indexable URL counts remain 353 recipes and 1,885 URLs.

The refinements clone the selected published recipe objects before applying changes; source drafts in `allRecipeDrafts` remain untouched.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Tod Mun Pla (`tod-mun-pla`) | Tester yield, finished cake yield, sauce allocation, and serving portions were not explicit. Frying time and oil temperature could be mistaken for safety checks; the official cold-storage chart does not specify a cooked-fish leftover duration. | Set prep/cook/total to 50/25/75 minutes and six servings. Allocate 700 g raw fish (~117 g per serving), a separate 20 g tester, and 24 cakes (~40–42 g each; four per serving). State the sauce base and garnish per serving (about 20 ml chile sauce, 20 g cucumber, and 6–7 g peanuts). Mark 170°C oil and 3–4 minute batches as process/time estimates; check fish at 63°C / 145°F or use the source's opaque-and-fork doneness cue. Chill within two hours at or below 4°C and reheat leftovers to 74°C. The two-day advice is labeled as a texture preference, not an official safety cutoff; the FoodSafety.gov storage chart's finfish categories do not supply a cooked-fish leftover window. |
| Poulet Basquaise (`poulet-basquaise`) | Chicken size, simmer range, serving allocation, total time, and leftover storage advice needed separation between estimates and official limits. | Set prep/cook/total to 20/55/75 minutes and four servings. Specify four similar ~200 g raw chicken pieces and per-person raw vegetable allocations. Mark the 12–18 minute covered simmer as an estimate and use the official poultry endpoint of 74°C / 165°F at the thickest breast, continuing in two-minute increments if needed. State the official 3–4-day cooked meat/poultry leftover window, prompt chilling at or below 4°C, and 74°C reheating; label the recipe's three-day sauce preference as a quality choice inside that window. |
| Chocolate chip cookies (`chocolate-chip-cookies`) | Full chocolate use, batch yield, tray spacing, baking estimate, and raw flour handling needed clearer instructions. | Set prep/cook/total to 45/30/75 minutes and 24 cookies. Use all 280 g chocolate; divide the dough into 24 portions (~46 g each), 12 per tray. Bake at 190°C for an estimated 10–12 minutes per batch and use set edges/soft centres only as texture cues. The copy explicitly says not to taste raw dough and to wash hands, tools, and surfaces. Do not impose a meat/fish internal-temperature endpoint on cookies. The three-day room-temperature advice is labeled as a quality recommendation. |
| Japchae (`japchae`) | The 80 ml soy sauce allocation, noodle timing, serving size, and reheating temperature could be misunderstood. | Allocate the entire 80 ml soy sauce as 55 ml for noodles, 5 ml for chives, and 20 ml for enoki. Mark the 7–8 minute noodle time as an estimate and divide 300 g dry noodles among six portions (~50 g each). The method has no internal-temperature cooking endpoint; 74°C / 165°F appears only as a leftover reheating standard. The two-day refrigerated suggestion is identified as a texture/color preference, with prompt chilling advice separated from that preference. |

All method, portion, timing, and storage changes are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Recipe time ranges and texture cues are identified as estimates or quality preferences, separately from official safety guidance. No unrelated internal-temperature check is imposed on the cookie or vegetable-noodle methods.

## Official food-safety references checked

- [FoodSafety.gov: Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) — finfish 63°C / 145°F, poultry 74°C / 165°F, and reheated leftovers 74°C / 165°F.
- [FoodSafety.gov: 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) — separate raw foods and promptly refrigerate perishable foods within two hours at or below 4°C / 40°F.
- [FoodSafety.gov: Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) — 3–4 days for cooked meat/poultry leftovers; it lists finfish refrigerator categories but no cooked-fish leftover duration.
- [FDA: Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) — fish handling and fish-specific cooking guidance for Tod Mun Pla.
- [FDA: Handling Flour Safely](https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know) — do not taste raw flour dough; cook flour-containing foods and clean hands and surfaces.

Recipe-method crosschecks consulted the existing recipe references and official publisher material for Tod Mun Pla, Poulet Basquaise, chocolate chip cookies, and Japchae. The recipe references remain distinct from the official safety references attached to the reviewed recipe records.

## Review and verification

This self-review used the same model and is not independent or human review. No verifiable runtime model identifier was exposed, so none is claimed.

- `npm test`: passed all 20 cuisine draft audits, built 1,885 URLs, passed the static audit, and passed 244/244 Node tests.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-fifty-third.test.mjs`: passed 60/60.
- `git diff --check`: passed.

The recipes were not cooked. No full-page UI or visual review was performed. No local preview server, headless browser, CDP session, security-setting change, deployment, or production validation was used.

## Changed paths

- Published-method refinements and import hook: `src/recipe-method-audit-fifty-third.mjs`, `src/recipes.mjs`.
- Four new recipe detail and five-locale assertions: `test/recipe-method-fifty-third.test.mjs`.
- Shared review ledger and current coverage counts: `test/recipe-method-regressions.test.mjs` and the existing `test/recipe-method-*.test.mjs` coverage checks. Historical batch position assertions were advanced to continue checking their original slugs after new ledger entries were appended.
- This audit report: `docs/research/recipe-method-audit-fifty-third-20261013.md`.
