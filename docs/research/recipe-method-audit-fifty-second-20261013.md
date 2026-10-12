# Recipe method audit — fifty-second batch (2026-10-13)

## Scope and coverage

Base: exact commit `d10a31968a827e38c1cc4342ce548afb64ecf1ad`, parent `633a2db6da2a23da40b6a716bf4b2567449803bb`, tree `0f24ad4dc2c5e7adff04247e4be11ebb42471d12`, the tip of `codex/recipe-methods-fifty-first-20261013`. Work branch: `codex/recipe-methods-fifty-second-20261013`, created directly from the base commit.

Read the project README and checked for repository/workspace `AGENTS.md` and relevant skill files; none were present. The exact shared five-locale review ledger is `test/recipe-method-regressions.test.mjs`; the standing 18-slug exclusion set is in `test/recipe-method-fiftieth.test.mjs`. Compared the base's 353 recipe IDs with the 204 unique reviewed IDs and 18 exclusions. `dakgalbi`, `ca-kho-to`, `keftedes`, and `samosa` were absent from both lists. The shared ledger now contains 208 unique reviewed recipes; 127 eligible recipes remain. Registry and generated indexable URL counts remain 353 recipes and 1,885 URLs.

The refinements clone the selected published recipe objects before applying changes; source drafts in `allRecipeDrafts` remain untouched.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Dakgalbi (`dakgalbi`) | The pan sequence, batch fallback, serving weights, and storage instructions did not make clear which amounts were allocated per person; stir-fry times could be mistaken for a doneness check. | Set prep/cook/total to 45/30/75 minutes and four servings. Allocate 700 g raw chicken (~175 g per serving), rice cakes (50 g per serving), and sweet potato (62.5 g per serving); stage cabbage, rice cakes, scallions, and perilla. Include crowding and raw-marinade handling. Mark fry/simmer times as estimates; check the thickest chicken pieces at the official poultry endpoint of 74°C / 165°F. Separate the official 3–4-day cooked-poultry leftover window from a three-day texture preference; chill promptly at or below 4°C and reheat leftovers to 74°C. |
| Cá kho tộ (`ca-kho-to`) | Caramel color and sauce reduction could be read as fish doneness; the four fish and rice servings and cooking liquid needed clearer allocation. | Set prep/cook/total to 30/45/75 minutes and four servings. Identify four ~200 g catfish steaks and 600 g cooked rice (~150 g per person). Describe caramel and braising time as estimates; check each thick steak at the official finfish endpoint of 63°C / 145°F, continuing in two-minute increments if needed. State that sauce color or thickness is not a safety test. The two-day leftover choice is explicitly a quality preference, not an official storage limit; chill within two hours at or below 4°C and reheat to 74°C. |
| Keftedes (`keftedes`) | The stated meatball yield did not match the mixture, and the flour, shallow-frying oil, batch count, and largest-ball check needed clearer handling. | Set prep/cook/total to 45/35/80 minutes and six servings. Shape 24 balls at roughly 40–45 g each (four per serving), allocate 700 g raw mince (~117 g per serving), and use the 80 g flour only as needed, discarding raw-contact excess. Explain that 300 ml oil is about 6–7 mm in a 24 cm pan; shallow-fry eight balls in each of three batches. Mark 175°C and 4–5 minutes per side as cooking estimates, then verify the largest centre in each batch reaches the official ground-meat endpoint of 71°C / 160°F. Distinguish official 3–4-day cooked-meat storage from a three-day crust-quality choice; chill promptly and reheat to 74°C. |
| Samosa (`samosa`) | Filling yield, oil depth, low-temperature frying and crisping stages needed concrete use instructions; oil settings and time are recipe process choices, not internal safety temperatures. | Set prep/cook/total to 80/65/145 minutes and 12 servings. Divide all cooked filling into 12 equal mounds (~70–75 g each). Explain that the listed 1.8 L oil is about 5.7 cm deep in a 20 cm pot; fry four at a time in three batches. Mark 145–150°C and 165°C, and the 8–10 / 4–6 minute ranges, as recipe-selected process/texture estimates. Check a split pastry for fully cooked crisp seams and steaming-hot cooked filling; do not apply a meat or fish endpoint, and do not taste raw flour dough. The two-day refrigerated window is a quality choice, not an official cutoff; prompt chilling at or below 4°C and 74°C reheating guidance are stated separately. |

Methods, portions, timing estimates, and storage cards are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Recipe-selected times, oil/process temperatures, and shorter quality preferences are clearly distinguished from official safety values. Ingredient-specific endpoints are used: poultry 74°C, ground meat 71°C, finfish 63°C, and reheated leftovers 74°C. No meat/fish endpoint is imposed on vegetarian samosa.

## Official food-safety references checked

- [FoodSafety.gov: Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) — poultry 74°C / 165°F, ground meat 71°C / 160°F, finfish 63°C / 145°F, and reheated leftovers 74°C / 165°F.
- [FoodSafety.gov: 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) — prompt chilling within two hours, refrigerator at or below 4°C / 40°F, and safe handling.
- [FoodSafety.gov: Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) — official 3–4-day refrigerated guidance for cooked meat/poultry used for dakgalbi and keftedes; shorter recipe quality preferences are labeled separately.
- [FDA: Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) — fish-specific handling and cooking guidance for cá kho tộ.
- [FDA: Handling Flour Safely](https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know) — do not taste raw flour dough; cook flour-containing foods and clean hands and surfaces.

## Review and verification

This self-review used the same model and is not independent or human review. No verifiable runtime model identifier was exposed, so none is claimed.

- `npm ci --cache /tmp/recipenestvault-npm-cache` installed the locked dependencies; package manifests and lockfile were unchanged.
- `npm test`: passed all 20 cuisine draft audits, generated 1,885 URLs, passed the static audit (10,816 files; 1,885 indexable routes), and passed 239/239 Node tests.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-fifty-second.test.mjs`: passed 60/60 after the independent build completed.
- `git diff --check`: passed after adding this report.

The recipes were not cooked. No full-page UI or visual review was performed. No preview/local server, headless browser, CDP session, security-setting change, deployment, or production validation was used.

## Changed paths

- Published-method refinements and import hook: `src/recipe-method-audit-fifty-second.mjs`, `src/recipes.mjs`.
- Four recipe assertions and unchanged-draft checks: `test/recipe-method-fifty-second.test.mjs`.
- Shared 208-ID ledger and carried-forward batch-count/location assertions: `test/recipe-method-regressions.test.mjs` and existing `test/recipe-method-*.test.mjs` coverage checks.
- This report: `docs/research/recipe-method-audit-fifty-second-20261013.md`.
