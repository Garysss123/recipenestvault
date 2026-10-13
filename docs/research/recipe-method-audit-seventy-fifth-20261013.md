# Recipe method audit — seventy-fifth batch (2026-10-13)

## Scope and starting point

Work branch: `codex/recipe-methods-seventy-fifth-20261013`, created from the authorized branch head `codex/recipe-methods-seventy-fourth-20261013` at `2aec8074fe22525d15c48a224795f8d5c247a5dd`.

The registry remains 353 unique recipes. The cumulative exact-slug ledger advances from 296 to 300 recipes across all five locales. The same 18 out-of-scope recipes remain excluded; 35 eligible recipes remain (353 − 18 − 300). This batch selected four unchecked, non-excluded recipes that still lacked actionable doneness and recovery guidance:

- `pineapple-cakes`
- `montreal-style-bagels`
- `fasolada`
- `aloo-gobi`

Repository instruction discovery found no applicable `AGENTS.md` or `.agents/skills` files. Existing source drafts were left intact. Each change is a publication copy, keeps the natural step count and illustration mapping, and includes complete English, Traditional Chinese, Japanese, Korean, and Thai text. Two recipes add a separately measured optional water reserve for their correction steps; existing ingredient rows and amounts are unchanged.

## Method changes and food-safety basis

- **Taiwanese pineapple cakes:** added raw-flour and egg handling guidance; a side-entry check of the thickest egg-containing pastry wall to 71°C/160°F plus a no-wet-dough cue; two-minute bake/recheck increments; and a foil/lower-oven recovery if the crust browns before the pastry sets.
- **Montreal-style bagels:** added raw-flour and egg handling guidance; a centre-crumb check of the largest bagel to 71°C/160°F with a set, non-wet crumb cue; three-minute bake/recheck increments; and a lower-temperature, loose-foil recovery if the crust or sesame darkens too soon.
- **Fasolada:** added largest-bean checks before and after the final simmer, ten-minute simmer/retest increments, and up to 300 ml of listed reserved boiling water in 100 ml additions when the liquid drops before the beans soften. The bean checks are texture checks; no meat-style cooking temperature was introduced.
- **Aloo Gobi:** tests the largest potato and thickest cauliflower stem for an easy knife entry with no hard or chalky core while retaining shape. If still firm after the initial covered cook, it adds reserved hot water in 15 ml increments and cooks/rechecks in three-minute increments, capped at 30 ml finishing water. A listed 0–45 ml water row accounts for the existing up-to-15 ml spice-pan splash plus that reserve. No unrelated cooking temperature was introduced.

For the two egg-and-flour bakes, the recipes cite [FDA egg-safety guidance](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety), [FDA flour-handling guidance](https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know), and the [FoodSafety.gov minimum-temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures). The flour guidance supports fully cooking flour and cleaning after raw flour/egg handling; 71°C/160°F applies to the egg-containing baked centre. All four recipes cite [FoodSafety.gov's safe-handling steps](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [cold-storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) for prompt shallow cooling, refrigeration, and storage. Leftovers are reheated to 74°C/165°F; that value is not used as a bean or vegetable cooking endpoint. The Fasolada's three-day storage target is a conservative recipe limit within the official 3–4-day window for vegetable soups and stews.

Each publication copy retains two culinary references, distinct from the official safety references:

- Pineapple cakes: [Food Network](https://www.foodnetwork.com/recipes/food-network-kitchen/taiwanese-pineapple-cakes-9349291), [DayDayCook](https://www.daydaycook.com/en/recipe/taiwanese-pineapple-cake).
- Montreal-style bagels: [King Arthur Baking](https://www.kingarthurbaking.com/recipes/montreal-bagels-recipe), [Great Tastes of Manitoba](https://greattastesmb.ca/recipe/montreal-style-bagels/).
- Fasolada: [My Greek Dish](https://www.mygreekdish.com/recipe/traditional-greek-bean-soup-recipe-fasolada/), [Akis Petretzikis](https://akispetretzikis.com/en/recipe/3098/fasolada).
- Aloo Gobi: [Swasthi's Recipes](https://www.indianhealthyrecipes.com/aloo-gobi-recipe/), [Dassana's Veg Recipes](https://www.vegrecipesofindia.com/aloo-gobi-recipe-punjabialoo-gobi/).

## Regression history and count terminology

The shared exact-slug ledger appends the four IDs above. Historical regression tests were advanced to the current 300-ID ledger while retaining each prior batch's own slug window. The eighteenth through seventy-fifth batch checks and the standing 18 exclusions remain in the suite.

Count terminology: `package.json` wires **20 `audit:*drafts` commands** into `npm test`; `src/recipes.mjs` contains **21 recipe source groups**. These are separate counts. The source-group count must not be reported as 21 audit commands.

## Verification

- Focused batch regression before the full run: `node --test test/recipe-method-seventy-fifth.test.mjs` — passed 6/6.
- Full `npm test` — passed all 20 draft-audit commands, built 1,885 indexable URLs in five locales, passed the 10,816-file static audit, and passed 366/366 Node tests.
- Independent `npm run build` — passed; 1,885 indexable URLs built across five locales.
- Independent `npm run audit` — passed; 10,816 files and 1,885 indexable routes audited.
- Focused cumulative regression: shared ledger plus batches seventy through seventy-fifth — passed 91/91 tests.
- `git diff --check` — passed.

No source drafts, recipe registry entries, routes, photos, exclusions, or illustration scenes were changed. No deployment was performed. Browser/UI review, physical cooking, and production behavior were not verified.

## Change accounting

The feature implementation is in `src/recipe-method-audit-seventy-fifth.mjs`, registered by `src/recipes.mjs`; the new regression suite is `test/recipe-method-seventy-fifth.test.mjs`. Historical test files are modified only to keep their coverage counts and exact batch windows aligned with the expanded shared ledger. No dependency manifest or lockfile changes were made by the lockfile-based install.
