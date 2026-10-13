# Recipe method audit — eighty-fourth batch (2026-10-13)

## Scope and coverage

- **Work branch:** `codex/recipe-methods-eighty-fourth-20261013`
- **Starting commit:** `4dc4ac3cf8db409bc1bd5870b3a8511c9954e711` (the requested eighty-third-batch commit)
- **Starting parent:** `d71f32b893d50b2200ad0bb796891081cc7194e4`
- **Starting tree:** `6024d4fbe0dbc596f26e56c1b7c2563bb6bc0bcc`
- The registry remains at 353 unique recipe slugs. The exact five-locale method ledger now has 335 reviewed slugs; the separate exclusion ledger retains 18 slugs, for 353 total and zero unclassified. `docs/research/recipe-method-coverage-20261013.json` is a sorted, exact, deduplicated snapshot of both disjoint sets. Each slug occurs exactly once across the two lists.
- The 20 package draft-audit commands and the 21 recipe source groups assembled by `src/recipes.mjs` are different counts and are asserted separately.
- Only `zaalouk`, `imam-bayildi`, and `halloumi-saganaki` were eligible at the start of this batch. Each now has a five-language method, doneness and texture checks, and recovery guidance. The three source drafts, ingredient rows and amounts, servings, natural step counts, and illustration-stage mappings remain intact.

The README, TODO, package scripts, source-group registry, shared coverage and exclusion ledgers, prior batch reports, and historical batch regressions were reviewed. There is no repository `AGENTS.md` or `.agents/skills/` directory.

## Recipe revisions

- **Zaalouk:** Adds produce washing, steaming the eggplant until a knife enters easily, staged tomato reduction, and a coarse, spoonable texture target. Recovery explains how to continue steaming a firm centre, reduce excess liquid, and prevent garlic or the thickening mixture from scorching. Cook estimate is 35 minutes and total time 50 minutes.
- **Imam bayildi:** Adds produce prep, staged eggplant browning, slow-softened onion filling, and a gentle covered braise. A knife entering the thickest eggplant and a soft onion filling are texture checks; under-tender eggplant gets measured 5–8 minute extensions with small additions of hot water. Cook estimate is 80 minutes and total time 105 minutes.
- **Halloumi saganaki:** Adds dry-surface and thin-flour-coating preparation, small-batch frying, golden crust and springy-centre cues, and lower-heat/time-increment recovery for early browning or sticking. The FDA raw-flour warning is stated in all five languages. Cook estimate is 15 minutes and total time 25 minutes.

The methods keep fresh vegetable tenderness, cheese browning, and frying-pan cues separate from food-safety minimum temperatures. The 74°C/165°F value appears only as the official reheating minimum for leftovers, not as a fresh-dish endpoint. Refrigeration at or below 4°C/40°F within 2 hours (1 hour above 32°C/90°F) is included for leftovers. A 2-day use suggestion is explicitly a quality target, not a safe-storage limit.

Official safety references were checked and added to the three recipes:

- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): rinse produce under running water without soap; chill perishables promptly; use shallow containers and keep the refrigerator at or below 4°C/40°F.
- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): leftovers of any type are reheated to 74°C/165°F. This is kept separate from the fresh vegetable and cheese texture goals.
- [FDA — Flour Is a Raw Food and Other Safety Facts](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts): dry flour is not tasted; cooking is required. Applied to the flour coating for halloumi.

## Regression and verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed 51 packages from the existing lockfile. `package.json` and `package-lock.json` were not changed.
- Focused current/history/shared-route regression passed **65/65** tests.
- Historical batch tests affected by the current shared ledger passed **95/95** tests.
- Full `npm test` passed all **20** draft-audit commands, built **1,885** indexable URLs across five locales, passed the static audit over **10,816** files and **1,885** routes, and passed all **403** Node tests (0 failures).
- Independent `npm run build` passed and generated **1,885** indexable URLs across five locales.
- Independent `npm run audit` passed over **10,816** files and **1,885** indexable routes.
- `git diff --check` passed before commit review.

No UI/browser review, physical test cooking, or deployment was performed. This closes the source-content batch only; it is not full-project acceptance or a claim that all content is launched.

## Change accounting

Implementation is in `src/recipe-method-audit-eighty-fourth.mjs`, registered in `src/recipes.mjs`, with targeted regression in `test/recipe-method-eighty-fourth.test.mjs`. The shared exact-slug coverage ledger and historical assertions were advanced to the 335-reviewed/18-excluded snapshot. No excluded draft was rewritten or counted as reviewed. Build output is not part of the change set.
