# Recipe method audit — fifty-first batch (2026-10-13)

## Scope and coverage

Base: exact commit `633a2db6da2a23da40b6a716bf4b2567449803bb`, the tip of `codex/recipe-methods-fiftieth-20261013`. Work branch: `codex/recipe-methods-fifty-first-20261013`, created directly from that commit.

Read the project README and checked for repository/workspace `AGENTS.md` and relevant skill files; none were present. The exact shared five-locale review ledger is `test/recipe-method-regressions.test.mjs`; the standing 18-slug exclusion set is in `test/recipe-method-fiftieth.test.mjs`. Compared the 353 recipe IDs with both lists. `taiwanese-popcorn-chicken`, `rajma-masala`, `pho-ga`, and `bacalao-al-pil-pil` were absent from the 200 reviewed IDs and 18 exclusions. The shared ledger now contains 204 unique reviewed recipes; 131 eligible recipes remain. Registry and generated indexable URL counts remain 353 recipes and 1,885 URLs.

The refinements clone the selected published recipe objects before applying changes; source drafts in `allRecipeDrafts` remain untouched.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Taiwanese popcorn chicken (`taiwanese-popcorn-chicken`) | Dried basil did not match the Taiwanese fried-basil finish, the starch could all be read as mandatory, and oil temperature/time could be mistaken for a safety endpoint. Frying batches, portions, and storage needed clearer accounting. | Use the listed 180 g starch as needed and discard raw-contaminated remainder; list fresh washed and thoroughly dried Taiwanese basil. Treat 175°C as the recipe's frying target, not a doneness test. Divide 700 g raw chicken into three ~233 g batches and four ~175 g raw-equivalent portions. Give 3½–4½ minutes as an estimate, with the thickest-piece poultry endpoint of 74°C / 165°F controlling. Storage separates official 3–4-day leftover advice from a one-day crispness-quality choice and reheats to 74°C. |
| Rajma masala (`rajma-masala`) | Soak/boil water uses, kidney-bean preparation safety, total schedule, liquid reserve, and six-serving allocation did not line up. The method also pointed to an unlisted rice side. | List 1.5 L soaking water plus 3 L fresh boiling water, discard the soak water, and reserve 500 ml bean liquid. Mark 8–12 hours as the recipe's soak choice and FDA's minimum soak as 5 hours; bring fresh water to a rolling boil for 30 minutes and do not use a slow cooker. Continue with an estimated 25–40-minute simmer until sampled beans are fully tender. Set prep/cook/total to 750/145/895 minutes for six servings, account for salt and gravy, and remove the unlisted rice instruction. |
| Chicken pho (`pho-ga`) | Chicken, broth, noodles, timing, and four-bowl allocations needed one coherent schedule and storage instructions that keep components separate. | Label the 35–45-minute poach and 1–3-minute broth warm-up as estimates; check the thickest breast and thigh at 74°C / 165°F. Divide 320 g dry rice noodles into 80 g per bowl and 2.4 L broth into 600 ml per bowl. Keep chicken, broth, noodles, and garnishes separate for storage; distinguish the official 3–4-day leftover window from the selected three-day quality recommendation. |
| Bacalao al pil-pil (`bacalao-al-pil-pil`) | The desalting water-change schedule and cold holding were unclear; process temperature and time could be read as the fish safety criterion; serving and storage needed measured limits. | Schedule four 9-hour desalting periods, changing water after the first three (12 L total), and keep the cod refrigerated at or below 4°C during the 36-hour recipe-selected soak. Mark 68–70°C oil and 8–10 minutes as texture/time estimates; check the thickest fish centre at the official finfish endpoint of 63°C / 145°F, continuing in two-minute intervals if needed. Divide four loins (about 200 g each before soaking) and sauce into four portions. Separate the official 3–4-day leftover guidance from a conservative two-day quality choice; reheat leftovers throughout to 74°C. |

Methods, portioning, estimates, and storage cards are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Recipe-selected cook times, process temperatures, and shorter quality windows are explicitly distinguished from official safety guidance. Endpoints are ingredient-specific: poultry 74°C, finfish 63°C, and reheated leftovers 74°C; no unrelated endpoint is applied to a recipe.

## Official food-safety references checked

- [FDA: Bad Bug Book, Second Edition](https://www.fda.gov/food/foodborne-pathogens/bad-bug-book-second-edition) — kidney-bean chapter guidance to soak at least five hours, discard soaking water, boil in fresh water for at least 30 minutes, and avoid slow cookers.
- [FoodSafety.gov: Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) — poultry 74°C / 165°F, finfish 63°C / 145°F, and leftovers 74°C / 165°F.
- [FDA: Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) — fish-specific handling, cooking, and cold-storage guidance for the cod recipe.
- [FoodSafety.gov: 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) — prompt chilling, refrigerator temperature, and safe handling.
- [FoodSafety.gov: Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) — official refrigerated leftover windows used to distinguish recipe quality recommendations from safety limits.

## Review and verification

This self-review used the same model and is not independent or human review. No verifiable runtime model identifier was exposed, so none is claimed.

- `npm ci --cache /tmp/recipenestvault-npm-cache` installed the locked dependencies (51 packages); package manifests and lockfile were unchanged.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-fifty-first.test.mjs`: passed all 60 shared-coverage and batch checks.
- `npm test`: passed all 20 cuisine draft audits, generated 1,885 URLs, passed the static audit (10,816 files; 1,885 indexable routes), and passed 234/234 Node tests.
- `git diff --check`: passed before report creation; rerun after final edits.

The recipes were not cooked. No full-page UI or visual review was performed. No preview/local server, headless browser, CDP session, security-setting change, deployment, or production validation was used.

## Changed paths

- Published-method refinements and import hook: `src/recipe-method-audit-fifty-first.mjs`, `src/recipes.mjs`.
- Four recipe assertions and unchanged-draft checks: `test/recipe-method-fifty-first.test.mjs`.
- Shared 204-ID ledger and carried-forward batch-count/location assertions: `test/recipe-method-regressions.test.mjs` and existing `test/recipe-method-*.test.mjs` coverage checks.
- This report: `docs/research/recipe-method-audit-fifty-first-20261013.md`.
