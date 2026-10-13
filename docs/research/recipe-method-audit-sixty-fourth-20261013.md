# Recipe method audit — sixty-fourth batch

- **Date:** 2026-10-13
- **Branch:** `codex/recipe-methods-sixty-fourth-20261013`
- **Exact starting commit:** `6b22e588bb82c090bebe7cfae8cdb10f7cc61286`
- **Starting parent:** `5f1c1df766c05460145ee450c180b92a79a43815`
- **Starting tree:** `121a9a6a7f5c45c71f346b8ce435314cfbf365a1`

## Selection

At the exact starting commit, the shared exact-slug ledger contained 252 unique reviewed recipes out of 353. The 18 standing old-patch exclusions were retained, leaving 83 unchecked, non-excluded candidates. These four slugs were absent from both the starting ledger and the exclusions:

- `tom-kha-gai`
- `ba-wan`
- `philly-cheesesteak`
- `bun-bo-hue`

The shared ledger now has 256 unique slugs and 79 eligible candidates remain. The published registry remains at 353 unique recipes. Source drafts and illustration assets were preserved; each recipe keeps its original step count, step order, and `imageScene` mapping.

## Changes

- **Tom kha gai:** made the 6–8 minute chicken poach an estimate, added thermometer checks of the thickest 8 mm poultry slices at 74°C/165°F, and included a recheck interval. Allocated chicken, mushrooms, broth, and cilantro across four bowls. Added shallow-container cooling, a three-day texture preference distinct from the official 3–4-day soup window, and 74°C/165°F reheating.
- **Ba-wan:** split the 520 ml dough water into 220 ml cold plus 300 ml boiling water, assigned the additional 5 ml mold oil, and listed the sugar and white pepper already used in the filling method. Divided the full dough and filling across eight pieces and all sauce across servings. Corrected the pork endpoint to 63°C/145°F plus a three-minute rest for 1 cm non-ground shoulder pieces; the method now probes pork cubes rather than wrapper translucence or the mixed filling. The 28–32-minute steam remains an estimate. Added safe cooling and reheating guidance, with a two-day wrapper-quality preference separate from the official leftover window.
- **Philly cheesesteak:** specified 6 mm rib-eye slices so a thin thermometer probe can enter from the side; kept the 63°C/145°F plus three-minute rest endpoint specific to intact whole-muscle beef and separate from ground beef. Split the onion oil, beef, seasoning, cheese, and yield across four sandwiches. Added a separate three-day quality preference, official refrigerated leftover window, and 74°C/165°F filling reheat.
- **Bún bò Huế:** separated the pork hock’s non-ground piece endpoint (63°C/145°F plus a three-minute rest, measured away from bone) from the whole beef shank endpoint and the 3–3½-hour tenderness estimate. Chilled the pork promptly while the beef continues to braise; at service, reheated only the chilled pork to 74°C/165°F while warming the fresh beef separately. Allocated broth, meat purchase-weight equivalents, and vegetables over six bowls. Added separate broth/meat cooling and reheating instructions.

Ingredient quantities, stages, estimates, texture cues, safety temperatures, portion allocations, and storage/reheating notes are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Poultry remains at its 74°C/165°F standard; no ground-poultry recipe was selected or changed. Ground meat remains distinct from non-ground pork and beef.

## References

Culinary references retained or added:

- Tom kha gai: [Hot Thai Kitchen](https://hot-thai-kitchen.com/tom-ka-gai/), [Eating Thai Food](https://www.eatingthaifood.com/tom-kha-gai-recipe-%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%97%E0%B8%B3-%E0%B8%95%E0%B9%89%E0%B8%A1%E0%B8%82%E0%B9%88%E0%B8%B2%E0%B9%84%E0%B8%81%E0%B9%88/), [The Guardian](https://www.theguardian.com/food/article/2024/may/27/chicken-soup-with-lime-leaf-lemongrass-and-coconut-recipe-by-claire-thomson).
- Ba-wan: [Travel Food Atlas](https://travelfoodatlas.com/taiwanese-ba-wan-recipe), [Yun Hai Taiwan Stories](https://newsletter.yunhai.shop/p/bawan-buddies). Replaced a government shrimp-filled bawan reference that did not match this pork-filled recipe.
- Philly cheesesteak: [Bobby Flay / Food Network](https://www.foodnetwork.com/recipes/bobby-flay/philly-cheese-steak-recipe-2012068), [Food Network](https://www.foodnetwork.com/recipes/philly-cheesesteak-recipe-1948754), [Serious Eats](https://www.seriouseats.com/philly-cheesesteak-recipe-7546830).
- Bún bò Huế: [Hungry Huy](https://www.hungryhuy.com/bun-bo-hue-recipe/), [Great British Chefs](https://www.greatbritishchefs.com/recipes/bun-bo-hue-recipe).

Official food-safety sources applied by food and context:

- [FoodSafety.gov safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): intact beef and pork steaks, chops, and roasts at 63°C/145°F followed by a three-minute rest; ground meat at 71°C/160°F; all poultry, including ground poultry, at 74°C/165°F; leftovers at 74°C/165°F.
- [FoodSafety.gov four steps to food safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): chill perishables within two hours, at 4°C/40°F or below, using shallow containers.
- [FoodSafety.gov cold food storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): refrigerated soups and stews, and cooked meat leftovers, at 3–4 days.

Three-day or two-day recommendations in the recipes are explicitly labeled as texture or quality preferences, not substitutes for the official storage windows.

## Verification

- `npm ci --cache /tmp/recipenestvault-npm-cache` restored 51 lockfile packages; package manifests and lockfile were unchanged.
- `npm test` — passed all 20 `audit:*drafts` commands wired in `package.json`; `src/recipes.mjs` separately assembles 21 recipe source groups. The command count and source-group count describe different things. The integrated build and static site audit passed, along with 300/300 Node tests.
- Independent `npm run build` — passed; generated 1,885 indexable URLs across five locales.
- Targeted shared ledger plus batches 63 and 64 — 66 tests passed, 0 failed.
- The new batch regressions verify 353 unique published recipes, 18 exclusions, the exact 252-to-256 ledger transition, the 83-to-79 remaining-candidate count, five-locale coverage, official sources, unchanged source drafts, and preserved illustration mappings.
- Static audit verified routes, local links/fragments, image and provenance gates, five-language recipe completeness, sitemap, canonical URLs, hreflang, metadata, and JSON-LD.
- `git diff --check` — passed.

## Review and limits

The self-review and implementation were done by the same model, so this is not an independent review. The selected runtime/model variant is not exposed. No recipe was cooked; no browser/UI or accessibility review was performed. No headless browser, CDP, local server, deployment, or security-setting change was used. Build and static audits do not establish manual UI review or kitchen testing.
