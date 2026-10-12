# Recipe method audit — fiftieth batch (2026-10-13)

## Scope and coverage

Base: exact commit `a5aacb4d6ab5a79ab61ad2c9ecba5ace51210d45`, the tip of `codex/recipe-methods-forty-ninth-20261013`. Work branch: `codex/recipe-methods-fiftieth-20261013`, created directly from that commit.

Read the project README and checked for repository/workspace `AGENTS.md` and relevant skill files; none were present. The shared five-locale deep-review ledger is `test/recipe-method-regressions.test.mjs`; the standing 18-slug exclusion set is in `test/recipe-method-forty-ninth.test.mjs`. Compared all 353 recipe slugs against both lists. `taiwanese-sausage`, `milkfish-congee`, `larb-moo`, and `banh-mi-thit` were absent from the 196 reviewed IDs and the 18 exclusions. The shared ledger now contains 200 unique reviewed recipes; 135 eligible recipes remain. Recipe count and generated indexable URL count remain 353 and 1,885.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Taiwanese sausage (`taiwanese-sausage`) | The listed browning oil was used but not listed; metadata omitted the full cold marinade and refrigerated drying periods; 10 portions were not divided into links; the quick-stir-fry helper notes did not fit this long-rest sausage method. | Added 5 ml neutral oil and a sausage-specific localized helper profile. Prep/cook/total now cover the 6–12 hour marinade, 12–18 hour refrigerated drying, active prep, and pan cook (1,875/30/1,905 minutes). Kept cook times as estimates and made the 71°C / 160°F ground-meat endpoint controlling. Allocate about 28 links to ten portions of 2–3 links, about 150 g raw pork/fat per diner. Storage separates official raw-sausage and cooked-leftover windows from this recipe’s more conservative 24-hour raw and 3-day quality recommendations. |
| Milkfish congee (`milkfish-congee`) | The rice’s cooling history and one-reheat rule needed to carry through into storage; fish and optional shucked oysters needed ingredient-specific endpoint checks; the four bowls needed measured allocations. | Reuse only quickly cooled, promptly chilled cooked rice, ideally cooled within 1 hour and used within 24 hours. Label the gentle-poach temperature and 4–6-minute window as estimates; use 63°C / 145°F or the official opaque-and-flakes cue for fish, and 63°C / 145°F for the largest optional shucked oyster. Divide rice, fish, broth, oyster option, and garnishes across four bowls. Since the rice has already been reheated once in the recipe, chill any remaining congee within 1 hour at ≤4°C, use within 24 hours, and eat chilled or discard rather than reheating it again. |
| Larb Moo (`larb-moo`) | Ingredient amount and use disagreed (20 g rice listed, 18 g used); final lime/fish-sauce adjustment was not staged; produce handling, bowl allocation, and storage did not fully match the mixed-in herbs. | Set toasted rice to 18 g and use all of it. Start with 45 ml lime and 30 ml fish sauce, then reserve the remaining 5 ml of each for final seasoning; this stays within the listed totals. Label the 5–7-minute pork time as an estimate and verify several large crumbles at 71°C / 160°F. Wash and dry the herbs and vegetables, separate clean prep from raw pork, allocate four bowls of about 125 g raw-pork equivalent plus 50 g vegetables each, and store/reheat already mixed herbs with the pork. A one-day hold is identified as a conservative quality choice, separate from official 3–4-day cooked-leftover guidance. |
| Bánh mì thịt (`banh-mi-thit`) | Produce wash order, exact roll-by-roll amounts, chilled assembly, deli storage, and homemade-pickle claims needed clarification; Korean method repeated the sausage phrase. | Wash whole carrot and daikon under running water before cutting; wash/dry the herbs and vegetables on a clean board. Divide the drained pickles, cilantro, chile, soy/Maggi, cucumber, and listed meat amounts across four rolls. Keep ready-to-eat fillings chilled during assembly/transport. Cite the official 3–5-day guidance for opened deli-sliced ham; chả lụa, pâté, and mayonnaise follow their package dates. Mark the five-day refrigerator-pickle window as a conservative quality estimate, not an official safety or canning limit. State the 2-hour cold-storage rule, shortened to 1 hour above 32°C / 90°F. Fixed the Korean duplicate. |

Method steps, ingredient allocations, time estimates, doneness cues, and storage cards are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Recipe-specific estimates are editorial guides; official safety endpoints and storage rules are credited separately. No unrelated temperature endpoint was added to the assembled bánh mì.

## Official food-safety references checked

- [FoodSafety.gov: Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) — ground meat/sausage 71°C / 160°F, fish 63°C / 145°F, and the general 74°C / 165°F leftover endpoint where reheating is appropriate.
- [FoodSafety.gov: 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) — washing produce under running water, clean/separate handling, the 2-hour (1-hour above 32°C / 90°F) cold-storage rule, shallow containers, and refrigeration at or below 4°C.
- [FoodSafety.gov: Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) — raw pork sausage 1–2 days, opened deli-sliced luncheon meat 3–5 days, and cooked leftovers 3–4 days refrigerated.
- [FDA: Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) — seafood temperature and fish’s opaque/flakes-apart visual cue.
- [UK Food Standards Agency: Home food fact checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker) — cooked-rice cooling ideally within 1 hour, refrigeration/use within 24 hours, and reheating only once until steaming hot.

## Review and verification

This self-review used the same model and is not independent or human review. No verifiable runtime model identifier was exposed, so none is claimed.

- `npm ci --cache /tmp/recipenestvault-npm-cache` installed the locked dependencies (51 packages); package manifests and lockfile were unchanged.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-fiftieth.test.mjs`: passed all 60 shared coverage and batch checks.
- `npm test`: passed all 20 cuisine draft audits, generated 1,885 URLs, passed the static audit (10,816 files; 1,885 indexable routes), and passed 229/229 Node tests.
- `git diff --check`: passed.

The recipes were not cooked. No full-page UI or visual review was performed. No preview/local server, headless browser, CDP session, security-setting change, deployment, or production validation was used.

## Changed paths

- Taiwanese sausage and milkfish congee methods, timing, ingredients, profile/storage notes, and official source mapping: `src/taiwanese-recipes-d.mjs`, `src/taiwanese-step-refinements.mjs`, `src/taiwanese-recipe-helpers.mjs`.
- Larb method, storage, and source mapping: `src/thai-recipes-c.mjs`, `src/thai-recipe-helpers.mjs`.
- Bánh mì method, storage, and official sources: `src/vietnamese-recipes-b.mjs`.
- Shared 200-ID ledger, batch-specific checks, and carried-forward coverage assertions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-fiftieth.test.mjs`, `test/recipe-method-*.test.mjs`.
- This report: `docs/research/recipe-method-audit-fiftieth-20261013.md`.
