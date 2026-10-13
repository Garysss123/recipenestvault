# Recipe method audit — seventy-ninth batch (2026-10-13)

## Scope and coverage

Work branch: `codex/recipe-methods-seventy-ninth-20261013`, created directly from the authorized seventy-eighth batch commit `38ac31bcaf1938c497772792b0ef20d38f222ca0`.

The registry remains at 353 unique recipes. The exact-slug, five-locale method ledger advances from 312 to 316 unique recipes. The same 18 standing exclusions remain unchanged, leaving 19 eligible recipes (353 − 18 − 316). The starting 23-recipe pool was re-derived from the complete registry, shared ledger, and exclusion list. `cacio-e-pepe`, `bucatini-amatriciana`, `pasta-alla-norma`, and `trofie-al-pesto` were eligible and had specific unfinished method, doneness, or recovery guidance.

README, TODO, and historical coverage instructions were reviewed. No repository `AGENTS.md` or `.agents/skills/` files were present. The four selected recipes' ingredient amounts, servings, prep/cook/total times, natural step counts, and illustration scene mappings were preserved. Source drafts and all 18 excluded slugs were preserved.

## Recipe revisions and food-safety decisions

- **Cacio e pepe:** Five-language instructions now treat the package cook time as an estimate, define a firm but not chalky bite, and reserve starchy water. The Pecorino is mixed off heat into warm (not boiling) water; small clumps are repaired off heat with measured water rather than more cooking. A glossy sauce cue is kept distinct from pasta doneness.
- **Bucatini all'amatriciana:** Five-language guidance renders guanciale gently without smoking or burning, reduces the tomato sauce to a spoon-coating consistency, and corrects sauce that is too thick or thin. Pasta timing is explicitly an estimate rather than a safety-temperature test; salt is adjusted after tasting the guanciale and cheese.
- **Pasta alla Norma:** Five-language guidance fries eggplant in uncrowded batches until browned and tender, with a lower-heat correction for smoking or early charring. A spoon-track cue defines reduced tomato sauce. Watery sauce is reduced separately after removing tender eggplant, so the pasta and eggplant do not overcook.
- **Trofie al pesto:** Five-language cues distinguish potato tenderness, bean color and bite, and pasta firmness, with a timing-mismatch recovery. Reserved cooking water is cooled until warm and no longer steaming before it meets the fresh pesto; an oily or tight emulsion is corrected off heat in measured additions.

FoodSafety.gov's [4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) were checked for cold holding, the 2-hour/1-hour limits, refrigeration at or below 4°C/40°F, shallow-container cooling, and reheating leftovers to 74°C/165°F. Each revised recipe now has both official references alongside its culinary references. The 74°C/165°F value is identified only as a leftover-reheating safety minimum. Fresh pasta's al dente firmness and sauce texture are sensory quality cues, not safety temperatures; no unsupported internal-temperature target was added for these pasta dishes.

Existing culinary references were retained. Method cross-checks included the relevant La Cucina Italiana recipe pages for all four dishes and Visit Genoa's trofie reference. The package's **20 draft-audit commands** and the recipe registry's **21 source groups** are distinct counts.

## Regression and verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed dependencies from the existing lockfile. `package.json` and `package-lock.json` were not changed.
- Full `npm test`: passed all 20 draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files and 1,885 routes, and passed all 393 Node tests (0 failures).
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- Independent `npm run audit`: passed; audited 10,816 files and 1,885 indexable routes.
- Focused recent-batch/shared-route regression: `node --test test/recipe-method-regressions.test.mjs test/recipe-method-seventy-seventh.test.mjs test/recipe-method-seventy-eighth.test.mjs test/recipe-method-seventy-ninth.test.mjs` passed all 75 tests.
- `git diff --check`: passed.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-seventy-ninth.mjs`, registered in `src/recipes.mjs`. New batch regression: `test/recipe-method-seventy-ninth.test.mjs`. The shared exact-slug ledger now lists 316 reviewed recipes. Historical batch tests update cumulative coverage and end-relative windows so they continue checking their original slugs. The existing 18 exclusions, source drafts, and unrelated recipe content remain unchanged.
