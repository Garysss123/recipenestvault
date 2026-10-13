# Recipe method audit — eighty-first batch (2026-10-13)

## Scope and coverage

Work branch: `codex/recipe-methods-eighty-first-20261013`, created directly from the authorized eightieth-batch commit `c5e2359170e1c096f0435988405a107029092e62`.

The registry remains at 353 unique recipes. The exact-slug, five-locale method ledger advances from 320 to 324 unique recipes. The same 18 standing exclusions remain unchanged, leaving 15 eligible recipes before this batch and 11 after it (353 − 18 − 324). `tabbouleh`, `vegetable-pakora`, `gratin-dauphinois`, and `kelewele` were eligible and had specific unfinished hydration, frying, doneness, or recovery guidance. The source drafts, ingredient rows and amounts, servings, prep/cook/total times, natural step counts, and illustration scene mappings were preserved.

README, TODO, package scripts, the shared coverage and exclusion ledgers, and historical batch regressions were reviewed. No repository `AGENTS.md` or `.agents/skills/` files were present. All 18 excluded slugs and source drafts remain preserved. The package has **20 draft-audit commands**; the recipe registry has **21 source groups**. These are separate counts.

## Recipe revisions and food-safety decisions

- **Tabbouleh:** Five-language steps measure a 45 g fine-bulgur soak in 45 ml of the listed lemon juice for 10 minutes, with a five-minute extension if a gritty centre remains. The remaining lemon juice is reserved for dressing. Produce is rinsed under running water before cutting, tomato is drained, and watery or sharp dressing is corrected without adding unlisted grain. Chilling limits follow the official time and temperature guidance; the two-day use suggestion is labeled as best quality.
- **Vegetable pakora:** The method dries produce, measures water in 15 ml increments within the listed 0–90 ml, prohibits tasting raw flour batter, and calls for cleaning hands, tools, and surfaces. Frying uses six measured clusters per batch, waits for oil to recover, and checks the potato centre and cooked flour texture. The 165–175°C oil range is explicitly a crispness and browning target, not a safe minimum internal temperature. No fresh-pakora safety endpoint is invented. Leftovers are reheated to the official 74°C/165°F minimum; the two-day suggestion is labeled as best quality.
- **Gratin dauphinois:** A thermometer check of at least 74°C/165°F follows FoodSafety.gov's meatless-casserole minimum. The thin-knife test is a separate tenderness target. If the top browns first, cover loosely; if potatoes remain firm after the safety minimum is reached, bake covered in five-minute increments. Scorched dairy is not scraped into the dish. Leftover chilling and reheating advice is separated from fresh doneness; the three-day suggestion is labeled as best quality.
- **Kelewele:** Plantains are washed before peeling, cut uniformly, and coated with a thick spice paste; excess liquid is drained rather than poured into hot oil. The 175°C oil setting is explicitly a browning and texture target, not a food-safety minimum. The largest piece is checked for a hot, uniformly soft centre; if the edges darken first, lower the oil and continue briefly, and if a batch is pale and greasy, let the oil recover and fry fewer pieces. Leftovers are chilled and reheated to the official 74°C/165°F minimum. The oil temperature remains identified as a texture target.

Official references were checked by food category: FoodSafety.gov's [4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) supports rinsing produce under running water without soap before cutting, prompt refrigeration within two hours (one hour above 32°C/90°F), shallow containers, and refrigeration at or below 4°C/40°F. Its [safe minimum internal temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) gives 74°C/165°F for meatless casseroles and reheated leftovers. The [FDA raw-flour guidance](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts) says raw flour can carry harmful bacteria and advises against tasting raw flour, dough, or batter. Oil settings, tenderness, crispness, and plantain texture are kept separate from safety minimums.

Method references were cross-checked alongside the official sources: [The Mediterranean Dish](https://www.themediterraneandish.com/tabouli-salad/) and [BBC Good Food](https://www.bbcgoodfood.com/recipes/tabbouleh) for tabbouleh; [Swasthi's Recipes](https://www.indianhealthyrecipes.com/pakora-recipe-vegetable-pakora-pakoda/) and [Dassana's Veg Recipes](https://www.vegrecipesofindia.com/mix-veg-pakora-recipe/) for vegetable pakora; [Pardon Your French](https://www.pardonyourfrench.com/classic-french-gratin-dauphinois/) and [Meilleur du Chef](https://www.meilleurduchef.com/fr/recette/gratin-dauphinois.html) for gratin dauphinois; [Demand Africa](https://demandafrica.com/food/recipes/kelewele-ghana-spicy-fried-plantains/) and [Ghana News Agency](https://gna.org.gh/2026/04/kelewele-a-spicy-heartbeat-ghanaian-street-cuisine-often-loyal-to-night-travelers-and-wanderers/) for kelewele.

## Regression and verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed dependencies from the existing lockfile. `package.json` and `package-lock.json` were not changed.
- Focused batch/shared-route regression passed all 72 tests: `node --test test/recipe-method-eighty-first.test.mjs test/recipe-method-regressions.test.mjs test/recipe-method-seventy-eighth.test.mjs test/recipe-method-seventy-ninth.test.mjs test/recipe-method-eightieth.test.mjs`.
- Full `npm test` passed all 20 draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files and 1,885 routes, and passed all 397 Node tests (0 failures).
- Independent `npm run build` passed and generated 1,885 indexable URLs across five locales.
- Independent `npm run audit` passed over 10,816 files and 1,885 indexable routes.
- `git diff --check` is run on the final patch before commit.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-eighty-first.mjs`, registered in `src/recipes.mjs`. New batch regression: `test/recipe-method-eighty-first.test.mjs`. The shared exact-slug ledger now lists 324 reviewed recipes. Historical batch assertions update cumulative totals and end-relative windows so they continue checking their original slugs. The separate 20-command and 21-source-group counts are covered by regression. The existing 18 exclusions, all source drafts, and unrelated recipe content remain unchanged.
