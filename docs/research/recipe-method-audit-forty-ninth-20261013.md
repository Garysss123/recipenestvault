# Recipe method audit — forty-ninth batch (2026-10-13)

## Scope and coverage

Base: exact commit `be013f1ae06c00df28fdc688f37188f706b4df75` on `codex/recipe-methods-forty-eighth-20261013`. Work branch: `codex/recipe-methods-forty-ninth-20261013`, created directly from that commit.

Compared every recipe slug with the shared five-locale deep-review list in `test/recipe-method-regressions.test.mjs` and the standing 18-slug exclusion list. `peking-duck`, `som-tam`, `bun-thit-nuong`, and `goi-cuon` were absent from both. The shared ledger now contains 196 unique recipes (192 carried forward plus four). With 18 exclusions and 353 existing recipes, 139 eligible recipes remain. The registry and generated indexable URL count remain at 353 recipes and 1,885 URLs.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Peking duck (`peking-duck`) | The long roast window could be read as the safety test, and the recipe did not make the final wrap portions explicit. | Keep 65–70 minutes at 180°C as a starting estimate only. Measure the thickest breast and innermost thigh away from bone; both must reach the official poultry endpoint of 74°C / 165°F. Continue in 5-minute intervals and recheck if needed. Allocate four of 16 pancakes, 450 g raw whole-duck equivalent, cucumber, scallions, and sauce per person. Separate the duck, pancakes, and garnishes for storage. |
| Som Tam (`som-tam`) | Washing and cutting order for ready-to-eat produce and the reserve amounts for final seasoning needed clarification. | Wash whole papaya and tomatoes under running potable water before cutting; dry the shredded papaya and chill it while preparing the dressing. Use all 35 g palm sugar, start with 40 ml lime juice and 25 ml fish sauce, and reserve 5 ml of each for the final taste check. Divide the salad into four portions. There is no meat-temperature check for this uncooked salad. |
| Bún thịt nướng (`bun-thit-nuong`) | A 71°C endpoint was higher than needed for these intact pork-shoulder slices, and the cook window and bowl allocations needed alignment. | Keep 2–3 minutes per side as an estimate. Check a thick slice from the side without touching the pan, reach 63°C / 145°F, and rest 3 minutes. Keep the separate 74°C / 165°F endpoint for optional precooked chả giò reheating. Set cook/total time to 40/315 minutes (275 minutes prep, including the four-hour marinade), and allocate pork, dry-noodle equivalent, vegetables, pickles, herbs, peanuts, dressing, and optional roll by four bowls. |
| Gỏi cuốn (`goi-cuon`) | The whole pork cut used a higher ground-meat temperature; seafood and fresh produce handling and per-person yield were underspecified. | Use the 35–45-minute simmer as a tenderness estimate, verify the intact pork at 63°C / 145°F, and rest 10 minutes, which includes the official 3-minute whole-cut rest. Keep the separate shrimp check at 63°C with opaque visual cues. Wash produce before cutting, use clean tools, and keep cooked proteins cold while rolling. Make 12 rolls, three per person, with the listed pork, shrimp, noodle, produce, and sauce quantities divided across four servings. |

Method and storage edits are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. The official whole-cut pork rest, poultry endpoint, seafood and produce handling, chilling limits, and leftover reheating are credited on the affected recipe cards. The cook-time and tenderness estimates and shorter recipe quality windows are editorial estimates, not official safety limits.

Official references checked for the affected ingredients:

- [FoodSafety.gov: Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) — poultry, intact pork, and leftovers.
- [FoodSafety.gov: 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) — washing produce, cross-contamination, two-hour chilling rule, shallow containers, and refrigerator temperature.
- [FoodSafety.gov: Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) — refrigerated cooked-food storage.
- [FDA: Selecting and Serving Produce Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely) — running-water washing before preparation.
- [FDA: Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) — shrimp doneness and safe seafood handling.

## Translation and review

Method steps, ingredient-use instructions, serving allocations, storage cards, and official-source distinctions are present in all five locales. This self-review used the same model and is not independent or human review. No verifiable runtime model identifier was exposed, so none is claimed.

## Verification and limits

- `npm ci --cache /tmp/recipenestvault-npm-cache` installed the locked dependencies (51 packages); package manifests and lockfile were unchanged.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-forty-ninth.test.mjs`: passed all 60 shared-coverage and batch checks.
- `npm test`: passed all 20 cuisine draft audits, the build and static audit (10,816 files; 1,885 indexable routes), and 224/224 Node tests.
- `git diff --check`: passed.

The recipes were not cooked. No full-page UI or visual review was performed. No preview/local server, headless browser, CDP session, security-setting change, deployment, or production validation was used.

## Changed paths

- Peking duck content, storage card, and time/source metadata: `src/recipe-expanded-b.mjs`, `src/recipe-draft-b.mjs`, `src/recipes.mjs`.
- Som Tam handling, measured method, and source mapping: `src/thai-recipes-b.mjs`, `src/thai-recipe-helpers.mjs`.
- Bún thịt nướng and Gỏi cuốn methods, portions, storage, timing, and sources: `src/vietnamese-recipes-a.mjs`.
- Shared 196-slug ledger, batch checks, and carried-forward coverage assertions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-forty-ninth.test.mjs`, and cumulative assertions in `test/recipe-method-*.test.mjs`.
- This report: `docs/research/recipe-method-audit-forty-ninth-20261013.md`.
