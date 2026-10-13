# Recipe method audit — sixty-seventh batch

- **Date:** 2026-10-13
- **Branch:** `codex/recipe-methods-sixty-seventh-20261013`
- **Exact starting commit:** `57edd2a0ef3c5c85ad7ca269edbe705dc63a6963`
- **Starting parent:** `99d90342490a8cb9d06d7eea6140fd87d3dc3007`
- **Starting tree:** `471389fe8abb17772a4db9e0d04729b0cb0221e6`

## Selection

Read the applicable README rules and checked for repository/workspace `AGENTS.md` instructions; none apply to this repository. The shared exact-slug ledger is `test/recipe-method-regressions.test.mjs`, and the standing 18 old-patch exclusions are in `test/recipe-method-fiftieth.test.mjs`. At the exact starting commit, the 353-recipe registry had 260 unique reviewed recipes; after applying all 18 exclusions, 75 remained eligible. The previous batch's four IDs brought the current shared ledger to 264, leaving 71 eligible recipes.

These four IDs were absent from the exact starting ledger and all 18 exclusions:

- `steak-and-kidney-pie`
- `erbsensuppe`
- `salmorejo-cordobes`
- `miso-soup`

The shared ledger now contains 268 unique IDs, leaving 67 eligible recipes. The registry remains at 353 recipes, and the generated build retains 1,885 indexable URLs across five locales. The four source drafts, method step counts, and `imageScene` illustration mappings are preserved.

## Changes

- **Steak and kidney pie:** specifies the remaining seasoning, braise finish cues, 45-minute pastry-quality cooling estimate and two-hour refrigeration limit, clean thermometer placement at the baked pie's centre, 74°C/165°F casserole endpoint, five-minute bake-and-recheck increments, six portions, and a 15-minute rest. The cook estimate is 160 minutes including the rest; filling cooling is counted in prep. Golden pastry and bubbling gravy are quality cues only. A three-day pastry-quality preference is separated from the official cooked-leftover storage and 74°C reheating guidance.
- **Erbsensuppe:** specifies that the smoked German sausage is fully cooked, adds it for an estimated 8–10 minutes, and requires the stirred soup and sausage to reach 74°C/165°F throughout. Time, steam and colour are not safety checks. Six bowls each receive about 50 g sausage, with the remaining ingredients divided evenly; the 115-minute cook estimate includes the simmer stages and five-minute rest. The three-day flavour/texture preference is distinguished from official soup storage and reheating guidance.
- **Salmorejo cordobés:** cooks both whites and yolks firm (estimated 10 minutes; time is not the safety test), cools and refrigerates the eggs within two hours, keeps cold toppings separate until serving, and portions four bowls with one-quarter of the tomato-bread base, about 25 ml olive oil, half an egg and 20 g ham each. The 6–10°C serving range is a quality instruction. Two-day freshness preference is separated from official leftover storage; hard-cooked eggs are stored separately for no more than one week, and combined leftovers are reheated throughout to 74°C/165°F if reheated.
- **Miso soup:** accounts for the full 600 ml clear dashi, 250 g tofu, 4 g dried wakame and 60 g miso across four bowls (150 ml dashi, 62.5 g tofu, one-quarter of the wakame and 15 g miso each). The fresh 70–75°C serving temperature is a flavour preference, separate from stored-soup reheating to 74°C/165°F. The method keeps miso off the boil after reheating.

All changed method text, serving allocations, estimates, safety notes, storage and reheating guidance is synchronized in English, Traditional Chinese, Japanese, Korean and Thai. Each recipe retains its original step count and illustration mapping, and retains at least two culinary sources.

The official temperature chart distinguishes intact beef/lamb steaks, chops and roasts (63°C/145°F plus a 3-minute rest), raw ground meat and sausage (71°C/160°F), poultry (74°C/165°F), and casseroles or reheated leftovers (74°C/165°F). The selected recipes contain no poultry or raw ground meat, so those endpoints were not applied. The beef-and-kidney pie's finished casserole uses the 74°C/165°F casserole endpoint; the soup sausage is specified as fully cooked and the mixed soup is reheated to 74°C/165°F. The egg method also credits the [FDA egg-safety guidance](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety) and states that both white and yolk should be firm. Estimated cooking times, browning, tenderness and serving preferences are not represented as safety standards.

Retained culinary source links:

- **Steak and kidney pie:** [Great British Chefs](https://www.greatbritishchefs.com/recipes/steak-kidney-pie-recipe); [Great British Food Awards](https://www.greatbritishfoodawards.com/recipes/windmills-award-winning-steak-kidney-pie).
- **Erbsensuppe:** [The Daring Gourmet](https://www.daringgourmet.com/german-pea-soup-egg-dumplings-erbsensuppe-mit-eierschwammchen/); [Chefkoch](https://www.chefkoch.de/magazin/artikel/77298301374985-erbsensuppe-so-wird-die-suppe-besonders-fein-1).
- **Salmorejo cordobés:** [Spain.info](https://www.spain.info/en/recipe/salmorejo/); [BBC Good Food](https://www.bbcgoodfood.com/recipes/salmorejo-0).
- **Miso soup:** [Just One Cookbook](https://www.justonecookbook.com/homemade-miso-soup/); [Japanese Cooking 101](https://www.japanesecooking101.com/miso-soup-recipe/).

## Verification

- `npm ci --cache /tmp/recipenestvault-npm-cache` — installed 51 lockfile packages; package manifests and lockfile were unchanged.
- `npm test` — passed all 20 `audit:*drafts` commands wired in `package.json`; `src/recipes.mjs` separately assembles 21 recipe source groups. The command count and source-group count describe different things. The integrated build (1,885 indexable URLs) and static audit passed, along with 318/318 Node tests.
- Independent `npm run build` — passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-sixty-seventh.test.mjs` — 61 tests passed, 0 failed. This covers the shared five-locale/detail-route regression and the batch's ledger, exclusion, draft, step-count, illustration-map, allocation, timing, safety and storage assertions.
- `git diff --check` — passed.

## Review and limits

Node.js was `v24.19.0`; npm was `11.9.0`. The selected model/runtime variant is not exposed. The review of the four overlays, five-language text, sources, exact-slug ledger and regression assertions was performed in this same model session; it is not an independent review. No recipe was cooked. No browser/UI or accessibility review was performed. No headless browser, CDP, local server, deployment or security-setting change was used.
