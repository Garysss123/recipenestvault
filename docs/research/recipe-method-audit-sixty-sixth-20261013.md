# Recipe method audit — sixty-sixth batch

- **Date:** 2026-10-13
- **Branch:** `codex/recipe-methods-sixty-sixth-20261013`
- **Exact starting commit:** `b99daec8a5f1555792d2af17ad42375faeb58d8b`
- **Starting parent:** `e76d84986d58fc9a6752e38e4f0ca0f604a3deb6`
- **Starting tree:** `98a1ef00c82d815ba1430fd2726792f4c8bbc4ec`

## Selection

Read the applicable README rules and checked for repository/workspace `AGENTS.md` instructions; none apply to this repository. The shared exact-slug ledger is `test/recipe-method-regressions.test.mjs`, and the standing 18 old-patch exclusions are in `test/recipe-method-fiftieth.test.mjs`. At the exact starting commit, the ledger contained 260 unique reviewed recipes from the 353-recipe registry, leaving 75 eligible IDs after exclusions.

These four IDs were absent from both the starting ledger and exclusions:

- `jjajangmyeon`
- `bun-bo-nam-bo`
- `escondidinho-de-carne-seca`
- `french-onion-soup`

The shared ledger now contains 264 unique IDs, leaving 71 eligible recipes. The registry remains at 353 recipes and the build emits 1,885 indexable URLs across five locales. No excluded ID or source draft was changed. All four methods retain their original step counts and `imageScene` illustration mappings.

## Changes

- **Jjajangmyeon:** identifies the pork belly as intact, unground meat; applies the whole-cut pork endpoint of 63°C/145°F plus a three-minute rest; keeps the 39-minute cook estimate separate from that safety endpoint; accounts for the remaining 20 ml oil, rendered fat, complete starch slurry, and four 150 g noodle bowls with one-quarter of the pork, sauce, vegetables, and cucumber in each. The two-day noodle texture preference is explicitly separate from the official 3–4-day cooked-meat window and 74°C/165°F reheating target.
- **Bún bò Nam Bộ:** identifies beef as an intact, unground cut and applies 63°C/145°F plus a three-minute rest to each batch. It allocates the remaining stir-fry oil, beef, noodles, nuts, fried shallots, herbs, and dressing across four bowls and states an 18-minute cooking estimate. The one-day crispness preference is separated from official cooked-beef storage and 74°C/165°F reheating guidance.
- **Escondidinho de carne seca:** reconciles the timed boil, sauté, bake, and rest to a 65-minute cook estimate and 100-minute total. The bake time is explicitly an estimate; the casserole centre must reach 74°C/165°F. Six portions state their cooked-beef, pre-boil cassava, cream-cheese, and grated-cheese amounts. A three-day cassava-texture preference is distinguished from official cooked-meat storage and reheating guidance.
- **French onion soup:** labels the 40–50-minute onion caramelization as flavour/texture guidance, not a safety endpoint, and reconciles it with the 100-minute cook estimate. The 1.5 L soup, two toast slices, 30 g cheese, and parsley are divided among four bowls. Soup is stored separately from toast and cheese, chilled within two hours, used within the official 3–4-day window, and reheated to 74°C/165°F before fresh gratin topping.

Every changed method, serving allocation, estimate, safety temperature, storage note, and source credit is synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Each recipe retains at least two culinary sources. Official guidance is credited separately: [FoodSafety.gov safe minimum temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures), [4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety), and [Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts). The selected recipes contain no raw ground meat or poultry; those category endpoints were not applied to the intact pork/beef, cooked casserole, or meatless soup.

The retained culinary cross-check links are:

- **Jjajangmyeon:** [Maangchi](https://www.maangchi.com/recipe/jjajangmyeon); [Korean Bapsang](https://www.koreanbapsang.com/jajangmyeon-noodles-in-black-bean-sauce/).
- **Bún bò Nam Bộ:** [Delightful Plate](https://delightfulplate.com/vietnamese-beef-noodle-salad-bun-bo-xao/); [Helen’s Recipes](https://helenrecipes.com/recipe-37-bun-bo-xao-vietnamese-noodle-salad/).
- **Escondidinho de carne seca:** [Receitas Globo](https://receitas.globo.com/ana-maria-braga/salgados/escondidinho-de-carne-seca-da-ana-maria.ghtml); [UOL Nossa Cozinha](https://www.uol.com.br/nossa/cozinha/receitas/2023/02/03/escondidinho-de-carne-seca.htm).
- **French onion soup:** [Pardon Your French](https://www.pardonyourfrench.com/classic-french-onion-soup/); [Meilleur du Chef](https://www.meilleurduchef.com/fr/recette/soupe-oignon.html).

## Verification

- `npm ci --cache /tmp/recipenestvault-npm-cache` — installed 51 lockfile packages; package manifests and lockfile were unchanged.
- `npm test` — passed all 21 regional draft audits, integrated build, static audit, and 312 Node tests (312 passed, 0 failed).
- Independent `npm run build` — passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-sixty-sixth.test.mjs` — 61 tests passed, 0 failed. This includes the shared all-recipe/five-locale route regression and the batch ledger, source-draft, step-count, illustration-map, portion, timing, safety, and storage checks.
- `git diff --check` — passed.

## Review and limits

The selected model/runtime variant is not exposed. Node.js was `v24.19.0`; npm was `11.9.0`. I reviewed the four overlays, five-language text, source links, ledger offsets, and regression assertions in this same model session; that self-review is not independent. No recipe was cooked. No browser/UI or accessibility review was performed. No headless browser, CDP, local server, deployment, or security-setting change was used.
