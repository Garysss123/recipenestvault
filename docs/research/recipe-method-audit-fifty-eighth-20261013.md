# Recipe method audit — batch 58

- Date: 2026-10-13
- Branch: `codex/recipe-methods-fifty-eighth-20261013`
- Exact base: `daf96d4255813f8060929cf12392e01fb1bb8faf` from `codex/recipe-methods-fifty-seventh-20261013`

## Selection and coverage

The tracked shared audit ledger is `test/recipe-method-regressions.test.mjs`; the repository has no separate slug ledger. Its 228 reviewed IDs, together with the 18 standing exclusions, left 107 selectable recipes in the 353-recipe catalog. This batch selected four IDs absent from that ledger and absent from the exclusions:

- `massaman-curry`
- `mul-naengmyeon`
- `khao-soi`
- `pork-ball-rice-vermicelli-soup`

The shared ledger now contains 232 distinct reviewed IDs. The 18 exclusions and 353 recipe records are unchanged, leaving 103 eligible recipes for later review. The build still emits 1,885 indexable URLs across five locales.

## Method changes

Methods and storage guidance were revised in English, Traditional Chinese, Japanese, Korean, and Thai. Ingredient amounts are connected to their uses and serving allocations; staged estimates start at observable process cues; texture preferences remain separate from safety endpoints. Existing illustration step counts and `imageScene` mappings are preserved, and publication edits use clones so source drafts remain intact.

- **Massaman curry:** aligns the cook estimate with both simmer stages and seasoning; clarifies which measured sauce amounts are mandatory versus optional; allocates the cooked rice and curry evenly over six bowls. Fork tenderness is a quality cue for intact beef cubes, not the 71°C/160°F ground-meat endpoint. The three-day quality preference is labelled separately from the official 3–4 day cooked-meat storage window; leftovers are reheated to 74°C/165°F.
- **Mul naengmyeon:** ties the brisket timer to its gentle simmer, applies the 63°C/145°F plus three-minute rest guidance for an intact roast, then treats tenderness separately. The egg step uses firm whites and yolks rather than an unsuitable centre-temperature check. All cooked brisket is allocated among four bowls; chilled broth and meat stay cold during the cooling/seasoning wait. The dish remains a cold preparation.
- **Khao soi:** keeps raw chicken refrigerated during setup, gives the bone-in chicken stage an estimated time and probes near (not against) the bone to 74°C/165°F. It accounts for the noodle and garnish stages, assigns a chicken leg and measured boiled/crisp noodles to each of six bowls, and removes unrelated cooked-rice storage boilerplate. The shorter storage preference is separate from the official leftover window and reheating endpoint.
- **Taiwan pork-ball rice-vermicelli soup:** identifies the listed meatballs as fully cooked packaged product, follows package directions, and distinguishes reheating chilled cooked balls to 74°C/165°F from cooking raw ground-pork balls to 71°C/160°F. The simmer, vermicelli soak/boil, and assembly steps now have their own estimates; dry noodle, meatball, daikon, broth, and garnish amounts reconcile across four bowls. Noodles are stored separately for quality.

Existing culinary references remain attached to the recipes, with official guidance listed separately:

- Massaman: [Hot Thai Kitchen — Beef Massaman Curry](https://hot-thai-kitchen.com/beef-massaman-curry/) and [Thailand Foundation — Secrets to Thai Cooking](https://thailandfoundation.or.th/secrets-to-thai-cooking/).
- Mul naengmyeon: [Maangchi — Naengmyeon](https://www.maangchi.com/recipe/naengmyeon) and [Korean Bapsang — Naengmyeon](https://www.koreanbapsang.com/naengmyeon-cold-noodles/).
- Khao soi: [Hot Thai Kitchen — Khao Soi](https://hot-thai-kitchen.com/kao-soi/) and [Thailand Foundation — Secrets to Thai Cooking](https://thailandfoundation.or.th/secrets-to-thai-cooking/).
- Pork-ball soup: [Taiwan Tourism Bureau — World Cuisine Taiwan Recipes (PDF)](https://ciaprochef.com/wp-content/uploads/2024/04/WCA_Taiwan_Recipes.pdf) and [Oh Snap! Let’s Eat! — Taiwanese Meatball Soup](https://ohsnapletseat.com/2026/01/15/taiwanese-meatball-soup-with-daikon/).
- Safety and handling: [FoodSafety.gov minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures), [FoodSafety.gov four steps](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety), [FoodSafety.gov cold storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts), and [FDA egg safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety).

## Verification and limits

- `npm test`: 269 passed, 0 failed.
- Shared locale/route regressions plus this batch: 60 passed, 0 failed (`node --test test/recipe-method-regressions.test.mjs test/recipe-method-fifty-eighth.test.mjs`).
- Separate `npm run build`: passed; 1,885 indexable URLs across five locales.
- `git diff --check`: passed.
- Runtime: Node `v24.19.0`. Exact model/runtime variant was not exposed. Review of these edits was performed in the same model context and is not independent verification.
- No food was cooked and no browser/UI review, local server preview, or deployment was performed. The checks establish repository/test/build consistency only; they do not validate real-world cooking results.
