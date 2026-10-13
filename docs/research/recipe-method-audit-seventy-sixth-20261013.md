# Recipe method audit — seventy-sixth batch (2026-10-13)

## Scope and starting coverage

Work branch: `codex/recipe-methods-seventy-sixth-20261013`, created from the authorized seventy-fifth batch head `3ce3b44b5a02f0a9cb693c732ef4bd4ff732d810`.

The registry remains at 353 unique recipes. The exact-slug, five-locale ledger advances from 300 to 304 unique recipes. The same 18 out-of-scope IDs remain excluded, leaving 31 eligible existing recipes (353 − 18 − 304). Before choosing this batch, the pool was re-derived by subtracting the complete de-duplicated ledger and the standing exclusion list from the registry; each selected slug was absent from both.

Selected recipes:

- `madeleines` — the prior method gave a fixed bake time and a spring-back cue, but no measured egg endpoint or re-bake path if the centre stayed wet.
- `focaccia-genovese` — the prior method timed the bake and required a golden surface, but did not check the underside and centre or explain how to correct uneven browning. It is flour-and-water dough, so no meat or egg endpoint applies.
- `gazpacho-andaluz` — the method did not tell cooks to wash the uncooked produce and specified serving at 6–10°C without a cold-holding limit. It now keeps the batch at or below 4°C through service and states the maximum time out of refrigeration.
- `tarte-tatin` — the prior method relied on a 10-minute apple cook and offered no texture test; it also lacked a safe release path for fruit stuck by set caramel. The caramel and apple checks now include measured continuation intervals.

No `AGENTS.md` or `.agents/skills/` files were present in the repository or workspace skill directory. README/TODO recipe-eligibility, provenance, language-consistency, and audit requirements were reviewed. Source drafts, ingredient rows, photo manifests, routes, and illustration scene mappings remain unchanged. Publication revisions use cloned instruction/source arrays, preserving the source drafts. Tarte Tatin's cook estimate was adjusted from 45 to 60 minutes to cover its listed simmer, bake, and rests; prep remains 30 minutes and total is 90 minutes.

## Method and safety decisions

- **Madeleines:** clarified a thick ribbon stage, cold-batter/hot-tray sequence, and even three-quarter pan fill. The largest cake is checked at the centre: egg-containing cakes reach 71°C/160°F, with a dry skewer cue. If low or wet, bake 2 minutes more and recheck; if edges darken first, tent with foil and lower the oven to 180°C. Raw batter is not tasted; hands and equipment are washed after flour/egg handling. Egg-cake leftovers are refrigerated at 4°C/40°F or below within 2 hours (1 hour above 32°C/90°F) and used within 3–4 days.
- **Focaccia Genovese:** flour handling warns against tasting raw dough and requires cleaning after contact. Proofing checks volume, and a springing-back dough rests before another stretch. Bake readiness is a quality check: golden top and underside, set springy centre, and no damp gummy band. Foil/210°C/3-minute increments protect an early-browning top; a hot lower-rack sheet helps a pale underside. No internal food-safety temperature is prescribed for this flour-and-water bread.
- **Gazpacho Andaluz:** raw tomatoes, cucumber, and pepper are rinsed under running water before cutting; no soap or bleach is used. A separated emulsion is corrected with 15 ml reserved cold water and a brief reblend; extra water is measured in 15 ml additions and capped at the listed 100 ml. The uncooked soup is chilled to 4°C/40°F or colder, served from chilled bowls, and limited to 2 hours out (1 hour above 32°C/90°F). It has no cooking or reheating endpoint. The 2-day storage limit is a conservative recipe limit; the official chart's 3–4-day examples are not treated as a gazpacho-specific endorsement.
- **Tarte Tatin:** apples are rinsed before peeling. Pale caramel continues in 30-second increments; smoking or bitter-dark caramel is discarded. The thickest apple half is checked with a thin knife and, if firm, simmered in 2-minute increments on lower heat. A crust that darkens before the edge bubbles is shielded with foil and baked at 180°C in 5-minute increments. If fruit sticks on inversion, 20–30 seconds over low heat softens the caramel before loosening the edge with a thin spatula. No fruit or caramel cooking temperature is invented. The 74°C/165°F value appears only for reheating stored leftovers.

Official sources were checked by food type:

- FDA, [What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety), [Handling Flour Safely](https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know), and FoodSafety.gov, [safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures), support raw batter/flour handling and the 71°C/160°F egg-dish endpoint for madeleines.
- FDA, [7 Tips for Cleaning Fruits and Vegetables](https://www.fda.gov/consumers/consumer-updates/7-tips-cleaning-fruits-vegetables), supports rinsing produce under running water, scrubbing firm produce with a clean brush, and not using soap/bleach. FoodSafety.gov, [4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts), support clean separation, 4°C/40°F refrigeration, 2-hour/1-hour holding limits, shallow-container cooling, 3–4-day refrigerated leftovers where applicable, and 74°C/165°F reheating of leftovers. Those reheating values are not applied to fresh cooking of the bread, apples, or gazpacho.

Culinary method references remain separate from the official safety sources:

- Madeleines: [Pardon Your French](https://www.pardonyourfrench.com/classic-french-madeleines/) and [RecipeTin Eats](https://www.recipetineats.com/madeleines/) support the chilled batter, hot tray, shell fill, and spring-back/caramelized-edge checks. The site's 6-hour chill and standardized ingredient amounts remain its own editorial choices.
- Focaccia Genovese: [GialloZafferano](https://ricette.giallozafferano.it/Focaccia-fugassa-alla-genovese.html) and [La Cucina Italiana](https://www.lacucinaitaliana.it/storie/luoghi/marinetta-miglior-focaccia-genovese-genova-voltri/) support the Genoese focaccia identity and brine/dimpled surface technique; the site's pan dimensions, flour/water amounts, and schedule are editorial choices.
- Gazpacho Andaluz: [Spain.info](https://www.spain.info/en/recipe/gazpacho/) and [BBC Good Food](https://www.bbcgoodfood.com/recipes/gazpacho) support the uncooked tomato, cucumber, pepper, bread, oil, vinegar, blend-and-chill method. The site's exact ratios and storage limit remain its own.
- Tarte Tatin: [Pardon Your French](https://www.pardonyourfrench.com/classic-tarte-tatin/) and [Meilleur du Chef](https://www.meilleurduchef.com/fr/recette/tarte-tatin.html) support the caramelized-apple, pastry-cover, bake-and-invert technique. Their quantities and timings are not represented as the site's exact formula.

## Regression and command accounting

The shared exact-slug ledger appends the four selected IDs. Historical batch windows were advanced by four at the tail so each regression still checks its original batch. The fixed 18-ID exclusion list remains unchanged.

Count the two repository quantities separately: `package.json` wires **20 draft-audit commands** into `npm test`; `src/recipes.mjs` registers **21 recipe source groups**. The 21 source groups do not mean there are 21 draft-audit commands.

## Verification

- Focused batch regression: `node --test test/recipe-method-seventy-sixth.test.mjs` passed all 7 tests.
- Full `npm test`: passed all 20 configured draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files/1,885 routes, and passed all 373 Node tests (0 failures).
- Independent `npm run build`: passed; built 1,885 indexable URLs across five locales.
- Independent `npm run audit`: passed; 10,816 files and 1,885 indexable routes audited.
- Cumulative Node regression suite: `node --test` passed all 373 tests (0 failures).
- `git diff --check`: passed.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-seventy-sixth.mjs`, registered by `src/recipes.mjs`. New batch regression: `test/recipe-method-seventy-sixth.test.mjs`. Historical tests only update current unique-coverage counts and their end-relative batch windows. No dependencies or lockfile entries were changed; missing dependencies were installed with `npm ci` using a writable `/tmp` cache.
