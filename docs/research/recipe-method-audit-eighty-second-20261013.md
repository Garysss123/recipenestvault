# Recipe method audit — eighty-second batch (2026-10-13)

## Scope and coverage

- **Work branch:** `codex/recipe-methods-eighty-second-20261013`
- **Starting commit:** `17a86a85961af8b09d8f9a2ec03ce841df300b31` (the requested eighty-first-batch commit)
- **Starting parent:** `c5e2359170e1c096f0435988405a107029092e62`
- **Starting tree:** `67591d087557f9bb1d5687bc28d1e2d0d9254af6`
- The published registry remains 353 unique recipes. The shared exact-slug, five-locale method ledger advances from 324 to 328 unique recipes. The 18 standing exclusions and every source draft remain intact. There were 11 eligible recipes before this batch; the four additions leave seven.

The selected eligible slugs had concrete method gaps: baingan bharta's stated 35-minute cook time could not cover its 56–70 minutes of timed roasting, steaming, draining, sautéing, and resting; butter naan did not warn against tasting raw flour dough or distinguish proofing targets from a cooked-through endpoint; parmigiana had no official meatless-casserole safety minimum; and patatas bravas did not separate its two fry-oil settings from food-safety temperatures or explain how to rescue a hard centre without over-darkening it.

The seven eligible slugs remaining for the next pass are `doenjang-jjigae`, `ratatouille`, `pan-con-tomate`, `welsh-rarebit`, `zaalouk`, `imam-bayildi`, and `halloumi-saganaki`.

Project review covered README, TODO, package scripts, the shared coverage and exclusion ledgers, and historical batch regressions. No repository `AGENTS.md`, `.agents/`, or project skills were present. The package wires **20 draft-audit commands**; the published registry expands **21 recipe source groups**. These counts are distinct and both are regression checked.

## Revisions and food-safety decisions

- **Baingan bharta:** Improved five-language washing, roasting, draining, masala reduction, finish, and failure recovery. A skewer through the thick centre is explicitly a tenderness goal; no numeric safety endpoint is invented for whole eggplant. The published cook/total estimate changes from 35/55 to 70/90 minutes to cover all stated stages. The source draft, ingredients, portions, step count, and scene mappings remain unchanged.
- **Butter naan:** Added FDA raw-flour handling advice and a clear no-tasting instruction. Proofing temperature and time are identified as rise/texture targets, not cooking-safety endpoints. Bubbles and blistering remain appearance cues; the centre must be set with no wet, raw-flour paste. No unsupported numeric internal temperature is added for naan.
- **Melanzane parmigiana:** Uses 74°C/165°F at the centre as the official minimum for a meatless casserole. Bubbling cheese, browning, knife tenderness, and resting are separately described as appearance or texture cues. Added a covered, lower-temperature recovery if the top browns first, with five-minute checks.
- **Patatas bravas:** Both 105–115°C and 175°C oil ranges are labeled as texture/process targets, never safe internal temperatures. The first fry uses a largest-piece knife test; a firm centre gets two-minute checks. If the outside darkens first during the second fry, lower the oil and continue rather than raising the heat. The published cook/total estimate changes from 45/80 to 90/125 minutes to allow for both batches, cooling, heating, and oil recovery. Source draft and recipe facts remain unchanged.

Official sources were checked against the food categories used in the methods:

- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) supports rinsing produce under running water without soap, chilling within two hours (one hour above 32°C/90°F), and refrigerator storage at or below 4°C/40°F. The methods use three days as a quality window within official cooked-leftover guidance.
- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) lists 74°C/165°F for meatless casseroles and reheated leftovers. The casserole threshold is applied to fresh parmigiana; the leftover threshold is labeled separately for all four dishes.
- [FDA — Flour Is a Raw Food and Other Safety Facts](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts) advises against eating or tasting raw flour, dough, or batter and supports cleaning after handling raw flour. It is applied to naan dough.

Oil temperatures, yeast proofing, and knife/appearance cues are culinary controls. They are not presented as safety minima. Existing recipe-method references remain distinct from the official food-safety sources: [Swasthi's Recipes](https://www.indianhealthyrecipes.com/baingan-bharta/) and [Dassana's Veg Recipes](https://www.vegrecipesofindia.com/baingan-bharta-recipe-punjabi-baingan-bharta-recipe/) for baingan bharta; [Swasthi's Recipes](https://www.indianhealthyrecipes.com/naan/) and [Dassana's Veg Recipes](https://www.vegrecipesofindia.com/naan-recipe-without-yeast/) for naan; [GialloZafferano](https://ricette.giallozafferano.it/Parmigiana-di-melanzane.html) and [La Cucina Italiana](https://www.lacucinaitaliana.it/ricetta/primi/parmigiana-ricetta-classica/) for parmigiana; [BBC Good Food](https://www.bbcgoodfood.com/recipes/patatas-bravas-0) and [Saveur](https://www.saveur.com/article/recipes/patatas-bravas/) for patatas bravas.

## Regression and verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed 51 packages from the existing lockfile; `package.json` and `package-lock.json` were not changed.
- The focused batch test passed: `node --test test/recipe-method-eighty-second.test.mjs` (2 tests).
- Focused current/historical and shared-route regression passed 67 tests: `node --test test/recipe-method-eighty-second.test.mjs test/recipe-method-eighty-first.test.mjs test/recipe-method-eightieth.test.mjs test/recipe-method-seventy-ninth.test.mjs test/recipe-method-regressions.test.mjs`.
- The full Node regression set passed: `node --test test/*.test.mjs` (399 tests, 0 failures). The first full run exposed stale historical assertions that still counted 320 other reviewed IDs; those count and relative-window assertions were advanced to the 328-ID ledger while preserving their exact historical slugs, then the full set passed.
- Final `npm test` passed all 20 draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files and 1,885 routes, and passed all 399 Node tests (0 failures).
- Independent `npm run build` passed and generated 1,885 indexable URLs across five locales. Independent `npm run audit` passed over 10,816 files and 1,885 indexable routes.
- `git diff --check` passed before commit.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-eighty-second.mjs`, registered in `src/recipes.mjs`. New batch regression: `test/recipe-method-eighty-second.test.mjs`. The shared exact-slug ledger contains 328 IDs; historical batch regressions retain their slug-specific checks and current total. The 18 exclusions, 353 recipe drafts, ingredient quantities, servings, step counts, and illustration scene maps remain preserved. Only the two published time estimates noted above changed.
