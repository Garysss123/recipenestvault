# Recipe method audit — eighty-third batch (2026-10-13)

## Scope and coverage

- **Work branch:** `codex/recipe-methods-eighty-third-20261013`
- **Starting commit:** `d71f32b893d50b2200ad0bb796891081cc7194e4` (the requested eighty-second-batch commit)
- **Starting parent:** `17a86a85961af8b09d8f9a2ec03ce841df300b31`
- **Starting tree:** `8dd199a3b9476c902da887c4010128566dc9b6eb`
- The registry remains at 353 unique recipes. The exact-slug, five-locale method ledger advances from 328 to 332 unique recipes. The same 18 standing exclusions remain intact. Four eligible recipes were completed, leaving three eligible slugs: `zaalouk`, `imam-bayildi`, and `halloumi-saganaki`.
- The selected slugs were absent from the starting ledger and did not overlap the exclusion list. Their source drafts, ingredients, portions, natural step counts, and illustration-stage mappings remain unchanged. Both current and historical regression windows now resolve to the 332-ID ledger.

README, TODO, package scripts, source-group registry, shared coverage and exclusion ledgers, and historical batch regressions were reviewed. No repository `AGENTS.md`, `.agents/skills/`, or project skills were present. The package wires **20 draft-audit commands**; `src/recipes.mjs` assembles **21 recipe source groups**. These are separate counts and have their own regression assertion.

## Recipe revisions and time changes

- **Doenjang-jjigae:** Added five-language produce washing and prep order, staged potato tenderness checks, gentle tofu handling, broth-reduction cues, and measured recovery for salty broth or paste catching on the pot. The simmered potato and tofu are judged by tenderness and heat. The cook estimate changes from 30 to 35 minutes, and total time from 50 to 55 minutes, to cover bringing the stock to a boil plus the 10 + 6 + 5 + 2 minute simmer stages and 3-minute rest.
- **Ratatouille:** Added produce washing, separate uncrowded browning stages, vegetable-specific texture cues, staged reduction, and distinct fixes when the pan is watery, dry, or the vegetables soften at different rates. A knife-through-eggplant test is a tenderness goal; no fresh-vegetable safety temperature is invented. The cook estimate changes from 50 to 60 minutes and total time from 75 to 85 minutes to cover the sequential 54–65-minute cook-and-rest range.
- **Pan con tomate:** Added tomato washing before cutting, controlled grating and draining, toast colour/texture checks, garlic and oil allocation, and a short service window that protects the crisp bread. Cut tomato storage follows the official chill guidance; the 2-day use suggestion is identified as a quality window. No numeric cooking endpoint is applied to raw tomato or toast.
- **Welsh rarebit:** Added stepwise ale incorporation, roux and sauce consistency checks, a controlled low-heat cheese melt, grill monitoring, and recovery cues for lumps, excessive thickness, oil separation, and early browning. FDA raw-flour guidance is applied to the flour roux. Bubbling and browning are appearance cues; the 74°C/165°F safe minimum is stated only for reheated leftovers.

Official food-safety references are separate from the eight existing culinary recipe sources:

- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) supports rinsing produce under running water without soap, prompt refrigeration within 2 hours (1 hour above 32°C/90°F), shallow containers, and refrigeration at or below 4°C/40°F.
- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) lists 74°C/165°F for leftovers of any type. This threshold is used for reheating only; fresh vegetable tenderness and the cheese-on-toast finish remain separate texture and appearance checks.
- [FDA — Flour Is a Raw Food and Other Safety Facts](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts) supports not tasting the uncooked flour roux. No unsupported numeric safety endpoint is added for the cooked sauce.

The culinary references remain [Maangchi](https://www.maangchi.com/recipe/doenjang-jjigae) and [Korean Bapsang](https://www.koreanbapsang.com/doenjang-jjigae-korean-soy-bean-paste/) for doenjang-jjigae; [Pardon Your French](https://www.pardonyourfrench.com/classic-stovetop-ratatouille/) and [Meilleur du Chef](https://www.meilleurduchef.com/fr/recette/ratatouille-nicoise.html) for ratatouille; [Saveur](https://www.saveur.com/article/recipes/spanish-style-toast-with-tomato/) and [Spanish Sabores](https://spanishsabores.com/super-simple-pan-con-tomate-recipe//) for pan con tomate; [Wales.com](https://www.wales.com/visit/food-and-drink/welsh-recipes/welsh-rarebit) and [Great British Chefs](https://www.greatbritishchefs.com/recipes/welsh-rarebit-recipe) for Welsh rarebit.

## Regression and verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed 51 packages from the existing lockfile; `package.json` and `package-lock.json` were unchanged.
- Focused current/history/shared-route regression passed 63 tests: `node --test test/recipe-method-eighty-third.test.mjs test/recipe-method-eighty-second.test.mjs test/recipe-method-eighty-first.test.mjs test/recipe-method-eightieth.test.mjs test/recipe-method-regressions.test.mjs`.
- Full `npm test` passed all 20 draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files and 1,885 routes, and passed all 401 Node tests (0 failures).
- Independent `npm run build` passed and generated 1,885 indexable URLs across five locales.
- Independent `npm run audit` passed over 10,816 files and 1,885 indexable routes.
- `git diff --check` passed before commit.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-eighty-third.mjs`, registered in `src/recipes.mjs`. New regression: `test/recipe-method-eighty-third.test.mjs`. `test/recipe-method-regressions.test.mjs` advances the exact-slug ledger to 332 IDs, and historical regressions preserve their original slug windows against the new current ledger. The 18 exclusions, 353 recipe drafts, source drafts, ingredient amounts, servings, step counts, and illustration mappings remain preserved. Only the two published time estimates noted above changed.
