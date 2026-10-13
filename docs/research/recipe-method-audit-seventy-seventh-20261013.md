# Recipe method audit — seventy-seventh batch (2026-10-13)

## Scope and starting coverage

Work branch: `codex/recipe-methods-seventy-seventh-20261013`, created from the authorized seventy-sixth batch commit `505011f3b24c5b1f12a1578ad5e6cc32c3f36907`.

The registry remains at 353 unique recipes. The exact-slug, five-locale ledger advances from 304 to 308 unique recipes. The same 18 out-of-scope IDs remain excluded, leaving 27 eligible existing recipes (353 − 18 − 308). The starting pool was re-derived from the complete shared ledger, registry, and standing exclusions; the four selected IDs were absent from both the ledger and exclusions and each had a concrete unfinished method issue.

Selected recipes:

- `financiers` — the steps did not distinguish a tender cake crumb from an unsafe wet centre, explain that pasteurized whites do not make raw flour safe, or provide an underbake recovery.
- `saskatoon-berry-pie` — raw flour, fresh versus frozen berry handling, egg-wash hygiene, centre-bubble doneness, and recovery for pale crust or a slow-setting filling needed usable instructions. Its previous total also omitted the 90-minute setting cool; the published estimate is now 45 minutes prep + 185 minutes for baking and setting = 230 minutes total.
- `horiatiki` — raw produce washing and cold handling for feta and the assembled ready-to-eat salad needed explicit steps. It has no cooking endpoint.
- `kaesespaetzle` — the common-mistake text referred to unrelated filled pasta, while the method omitted raw egg-and-flour hygiene and a doneness check for the thickest Spätzle.

README/TODO eligibility, provenance, language, and audit requirements were reviewed. No `AGENTS.md` or repository/workspace `.agents/skills/` files were present. Publication revisions copy instruction and source arrays before editing; ingredients, source drafts, step order, and illustration mappings remain intact. The existing exclusion set is unchanged.

## Method and safety decisions

- **Financiers:** the batter is not tasted because pasteurized egg whites do not make raw flour safe; flour-contact cleanup is explicit. Doneness uses the cake's quality cues—deep golden edges, set top, a lightly springing centre, and moist crumbs without glossy batter. A separate safety check applies the official egg-dish endpoint of 71°C/160°F to the largest cake. Wet or below-endpoint centres bake in 2-minute increments; foil and a lower oven protect rims that brown first. Cakes leave the oven once safe and tender so their centres do not dry out. Storage gives the official cold-holding limits.
- **Saskatoon berry pie:** pastry is not tasted and raw flour is kept from ready-to-eat food. Fresh berries are rinsed and dried; frozen berries stay frozen and are not washed. Bake readiness is assessed by thick filling bubbles at the centre vent and a deep-golden crust, not a meat, egg, or leftover temperature. A darkening rim is foiled and the oven lowered; a pale top is moved briefly to the upper rack. The 80–95-minute bake range is an estimate and may continue in 10-minute checks until the centre bubbles. The total estimate includes the setting cool before slicing. Egg wash is handled hygienically; the finished pie is cooled and refrigerated within the stated holding window.
- **Horiatiki:** tomatoes, cucumber, pepper, and other whole produce are washed under running water before cutting; firm cucumber is scrubbed with a clean produce brush, with no soap or bleach. Clean tools and separation protect the ready-to-eat salad. Feta remains refrigerated at 4°C/40°F or colder until plating, and the salad's time out of refrigeration is limited. No cooking temperature is assigned to an uncooked salad.
- **Käsespätzle:** raw egg-and-flour dough is not tasted, kept separate from ready-to-eat food, and cleaned up safely. Covered dough is refrigerated if the planned rest or pot timing exceeds the holding window. Floating is only an initial cue: the largest piece is split to confirm a set, springy centre without wet or floury paste; gummy pieces simmer one more minute before rechecking. The unrelated filled-pasta mistake was replaced. Leftovers are chilled and reheated according to official guidance.

Official food-safety references were checked against the foods and methods in these recipes:

- FDA, [Handling Flour Safely](https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know) and [What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety), plus FoodSafety.gov [safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures), support flour/egg handling and the distinct egg-dish endpoint used for the financiers. The pie's fruit-filling texture cues and the salad/pasta quality cues are not replaced with that temperature.
- FDA, [7 Tips for Cleaning Fruits and Vegetables](https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables), supports rinsing produce under running water, using a clean brush on firm produce, and avoiding soap or bleach.
- FoodSafety.gov [4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) support separation, 4°C/40°F refrigeration, 2-hour/1-hour room-temperature holding limits, and refrigerated leftover handling. The [safe minimum temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) is applied to leftovers only where relevant; it is not used as the best-texture target for baked fruit or small pasta.

Culinary method references remain separate from official safety guidance:

- Financiers: [King Arthur Baking](https://www.kingarthurbaking.com/recipes/almond-tea-cakes-recipe) and [Meilleur du Chef](https://www.meilleurduchef.com/fr/recette/financier.html).
- Saskatoon berry pie: [Canadian Food Focus](https://canadianfoodfocus.org/food/classic-canadian-recipes-saskatoon-pie/) and [Canadian Living](https://www.canadianliving.com/food/article/saskatoon-berry-pie).
- Horiatiki: [My Greek Dish](https://www.mygreekdish.com/recipe/greek-feta-salad/) and [Akis Petretzikis](https://akispetretzikis.com/en/recipe/1971/chwriatikh-salata).
- Käsespätzle: [The Daring Gourmet](https://www.daringgourmet.com/kasespatzle-swabian-german-macaroni-and-cheese/) and [REWE](https://www.rewe.de/rezepte/selbstgemachte-kaesespaetzle/).

## Regression and command accounting

The shared exact-slug ledger appends these four recipes. Historical batch tests advance their tail windows and current coverage assertions by four while retaining their original batch IDs. The fixed 18-ID exclusion list is unchanged.

Keep the two project counts separate: `npm test` runs **20 draft-audit commands**, while `src/recipes.mjs` registers **21 recipe source groups**. Source groups are not draft-audit commands.

## Verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed the existing lockfile dependencies; neither package manifest nor lockfile changed.
- Full `npm test`: passed all 20 draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files/1,885 routes, and passed all 380 Node tests (0 failures).
- Independent `npm run build`: passed; built 1,885 indexable URLs across five locales.
- Independent `npm run audit`: passed; 10,816 files and 1,885 routes audited, including links/fragments, responsive images, search, five-language completeness, provenance, sitemap, canonical/hreflang, metadata, and JSON-LD checks.
- Focused batch regression: `node --test test/recipe-method-seventy-sixth.test.mjs test/recipe-method-seventy-seventh.test.mjs` passed all 14 tests.
- `git diff --check`: passed.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-seventy-seventh.mjs`, registered by `src/recipes.mjs`. Batch regression: `test/recipe-method-seventy-seventh.test.mjs`. Historical tests update cumulative coverage and end-relative windows to keep past-batch assertions intact. No ingredients, package versions, or lockfile entries were changed.
