# Recipe method audit — seventy-eighth batch (2026-10-13)

## Scope and coverage

Work branch: `codex/recipe-methods-seventy-eighth-20261013`, created directly from the authorized seventy-seventh batch commit `e3ccca3230df414835830fe4c5fb151665e23d26`.

The registry remains at 353 unique recipes. The exact-slug, five-locale method ledger advances from 308 to 312 unique recipes. The same 18 standing exclusions remain unchanged, leaving 23 eligible recipes (353 − 18 − 312). The starting 27-recipe pool was re-derived from the complete registry, shared ledger, and exclusion list. `cantucci`, `fattoush`, `french-crepes`, and `ribollita` were absent from both the starting ledger and exclusions and had specific unfinished method or editorial defects.

No repository `AGENTS.md` or `.agents/skills/` files were present. README and TODO eligibility, food-safety, translation, provenance, and method guidance were reviewed, as were the prior batch reports and shared coverage tests. The 18 excluded slugs, recipe drafts, ingredient amounts, natural step counts, and illustration scene mappings were preserved.

## Recipe revisions and food-safety decisions

- **Cantucci:** the source method gave only generic bake advice and no raw egg-and-flour handling. Five-language steps now require no tasting, separation from ready-to-eat food, and cleanup after contact. The first bake has its own pale-gold, set-edge, spring-back, and no-gloss texture cues. A clean thermometer check of 71°C (160°F) is identified separately as the egg-dish safety check; under-temperature or wet centres continue in 2-minute intervals, with foil and a lower oven protecting early-browning edges. Second-bake crispness is judged only after a test slice cools completely; soft slices return in 3-minute increments, with a lower temperature if almonds darken. The safety endpoint is not used as the crispness target.
- **Fattoush:** both common-mistake notes included unrelated Tabbouleh/bulgur advice, and storage had a generic four-day freeze-and-thaw recommendation for a fresh pita salad. Produce is now rinsed under clean running water before cutting, without soap or bleach, then dried and drained to prevent a watery salad. The pita is crisped and stored separately, added at service, and can be re-crisped if it softens. Cold holding and the 2-hour/1-hour discard limits are stated; as an uncooked salad it has no cooking-temperature endpoint. Component storage describes quality separately from the official cold-holding limit.
- **French crêpes:** the method did not address raw flour-and-egg handling or give a specific repair for batter that was too thick or a sheet that tore. It now forbids tasting raw batter, separates it from ready-to-eat food, and requires cleanup. A measured 30 ml of milk is held back to thin an over-thick batter in 15 ml additions. Each side has visible set, release, and no-wet-batter cues; the method lowers the pan heat if the sheet browns before setting and gives a repair for a tearing first side. Leftover crepes are reheated to 74°C (165°F), as an official leftover-reheating endpoint, not a fresh-cooking texture target.
- **Ribollita:** the common-mistake notes referred to pale meat, cured meat, and cheese absent from this vegetarian recipe. The method now checks bean breakdown, tender kale stems, bread absorption, and the final moist mound texture, with measured hot-liquid additions or uncovered simmering to correct soup that is too stiff or loose. Salt is adjusted after the bread and beans absorb the broth. The 74°C (165°F) target is confined to reheating leftovers; fresh soup is judged by texture and a gentle simmer.

Official guidance was checked against the food types in these methods:

- FDA, [Handling Flour Safely](https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know) and [What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety), support avoiding raw flour/egg batter, preventing cross-contamination, cleaning after contact, and cooking egg dishes thoroughly. FoodSafety.gov's [safe minimum internal temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) supports the 71°C/160°F egg-dish check for the first-baked Cantucci log and the 74°C/165°F reheating targets for leftovers. The Cantucci crispness and crêpe texture cues remain separate from those safety checks.
- FDA, [7 Tips for Cleaning Fruits and Vegetables](https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables), supports rinsing produce under running water before cutting, avoiding soap or bleach, drying produce, and refrigerating perishables.
- FoodSafety.gov, [4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety), supports refrigeration at or below 4°C/40°F, the 2-hour/1-hour room-temperature limits, prompt shallow-container cooling, and the distinction between food safety and texture choices.

Existing culinary source references were retained. Official food-safety references were added separately in each selected recipe's source list. The package continues to run **20 draft-audit commands**; the recipe registry continues to contain **21 recipe source groups**. These are separate counts.

## Regression and verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed dependencies from the existing lockfile after the initial run showed `sharp` was absent. `package.json` and `package-lock.json` were not changed.
- Full `npm test`: passed all 20 draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files and 1,885 routes, and passed all 387 Node tests (0 failures).
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- Independent `npm run audit`: passed; audited 10,816 files and 1,885 indexable routes.
- Focused shared-route and recent-batch regression: `node --test test/recipe-method-regressions.test.mjs test/recipe-method-seventy-sixth.test.mjs test/recipe-method-seventy-seventh.test.mjs test/recipe-method-seventy-eighth.test.mjs` passed all 76 tests.
- `git diff --check`: passed.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-seventy-eighth.mjs`, registered in `src/recipes.mjs`. New batch regression: `test/recipe-method-seventy-eighth.test.mjs`. Shared coverage now lists all 312 reviewed slugs. Historical batch tests update cumulative coverage and end-relative windows so they continue checking their original four IDs. The existing 18 exclusions, all recipe source drafts, and unrelated drafts remain unchanged.
