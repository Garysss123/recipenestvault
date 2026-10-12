# Recipe method audit — thirtieth batch (2026-10-12)

## Coverage

Audit base: `c093d0340c1cb74211b0c14cb1bc201f6f5a7bd3`, parent `0229ad8ff1bb53c4bccf4b54d369b0e3f0f56dc8`. Work branch: `codex/recipe-methods-thirtieth-20261012`.

The published registry remains at 353 existing recipes. Shared all-locale method review grows from 116 to 120 unique IDs, leaving 215 of the 335 eligible recipes unreviewed after the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. The four selected IDs were absent from the base regression list. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Pork nikujaga (`nikujaga`) | The method used 71°C for thin, intact pork slices and did not allocate the meat among four bowls. The cook estimate did not fully cover the blanch, timed pan stages and covered rest. | Keep 300 g pork and four servings; allocate about 75 g raw pork per bowl and divide the stew evenly. Apply the whole-cut pork endpoint of 63°C / 145°F and a covered eight-minute rest; check the thickest slice and continue in two-minute increments if needed. Set prep/cook/total to 25/40/65 minutes. The pork-belly substitution uses the same endpoint. |
| Southern fried chicken (`southern-fried-chicken`) | Probe placement, small fry batches and raw chicken per serving were not explicit; frying, oil recovery and rack rest needed a larger cook estimate. | Keep 1,800 g bone-in chicken and six servings. Fry at most 600 g per batch; treat cut-specific frying times as guides and measure the thickest meat away from bone to 74°C / 165°F, rechecking in two-minute increments. Allocate about 300 g raw bone-in chicken per serving. Count the eight-hour chilled buttermilk marinade plus active prep in prep time; set prep/cook/total to 525/80/605 minutes. |
| Halifax Donair (`halifax-donair`) | The loaf's 45-minute bake was presented without an incremental recheck, and the filling was not allocated. | Keep 900 g ground beef and four servings. Treat 45 minutes as an initial guide, check the loaf centre to 71°C / 160°F and continue in five-minute increments when needed. Each pita gets one-quarter of the cooked beef (about 225 g raw-beef equivalent), 75 g sauce, about 62 g tomato and 38 g onion. Set prep/cook/total to 30/65/95 minutes. |
| Cochinita pibil (`cochinita-pibil`) | Prep time omitted the four-hour minimum marinade, the roast time was fixed despite tenderness varying, tortillas used at service were not listed, and eight portions were implicit. | Keep 1,600 g pork and eight servings; count the refrigerated four-hour marinade and active work in prep time. Treat 2 hours 30 minutes at 175°C as an initial roast guide, measure the thickest piece to at least 63°C / 145°F, then continue until fork-tender in 15-minute increments. Rest covered for 20 minutes. List 16 tortillas and allocate about 200 g raw pork, two tortillas and 31 g pickled onion per serving. Set prep/cook/total to 280/180/460 minutes. |

All site-specific quantities, portion arithmetic and time estimates are editorial adaptations. Recipe references support dish identity and general preparation methods; they are not claimed as sources for this site's exact ratios, amounts, servings or timings. Official safety guidance is labelled separately from dish references in recipe data.

## Recipe references

- Nikujaga: [Kikkoman — Nikujaga](https://www.kikkoman.com/en/cookbook/washoku/nikujaga.html) and [Just One Cookbook — Nikujaga](https://www.justonecookbook.com/nikujaga/).
- Southern fried chicken: [Food Network — Southern Fried Chicken](https://www.foodnetwork.com/recipes/southern-fried-chicken-recipe0-1922088) and [Food Network — Traditional Southern Fried Chicken](https://www.foodnetwork.com/recipes/traditional-southern-fried-chicken-recipe-1938410).
- Halifax donair: [Jo Cooks — Halifax Donair](https://www.jocooks.com/recipes/halifax-donair/) and [Canadian Living Test Kitchen — East Coast Donair](https://www.canadianliving.com/food/lunch-and-dinner/recipe/east-coast-donair).
- Cochinita pibil: [México in My Kitchen — Cochinita Pibil](https://www.mexicoinmykitchen.com/cochinita-pibil-recipe/) and [Food Network Kitchen — Cochinita Pibil](https://www.foodnetwork.com/recipes/food-network-kitchen/cochinita-pibil-24282718).

These recipe pages inform the dish and broad method only. Their ingredient weights, yields and times are not represented as validation for the adapted values in this site.

## Official food-safety guidance

This official source is separately labelled in the recipe data and is distinct from the dish references above:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): intact pork cuts at 63°C / 145°F followed by a three-minute rest; ground meat at 71°C / 160°F; poultry at 74°C / 165°F.

## Translation and review

The modified English, Traditional Chinese, Japanese, Korean and Thai method text was translated and self-reviewed in a single-model pass. That is not an independent translation or culinary review. No second-model, human or professional-kitchen review is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 120 unique IDs for shared recipe-detail regression checks across all five locales. The [thirtieth batch tests](../../test/recipe-method-thirtieth.test.mjs) verify the four existing IDs, unchanged registry and exclusions, localized ingredients and methods, source separation, time totals, portions and measured doneness. Prior batch tests that assert current shared coverage were updated to retain the previous 116 IDs and count 120.

Verification on 2026-10-12: `npm test` passed all 20 cuisine draft audits, the build, static audit, and 129/129 Node tests. The integrated build generated 1,885 indexable URLs. A separate `npm run build` also passed with 1,885 indexable URLs, and `git diff --check` passed. This is a source, translation and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment and production validation were not performed.

## Changed paths

- Recipe data: `src/japanese-recipes-a.mjs` (`nikujaga`); `src/american-recipes-a.mjs` (`southern-fried-chicken`); `src/canadian-recipes-c.mjs` (`halifax-donair`); `src/mexican-recipes-a.mjs` (`cochinita-pibil`).
- Source labels: `src/american-source-map.mjs`, `src/canadian-source-map.mjs`, `src/mexican-source-map.mjs`, and the inline nikujaga source list in `src/japanese-recipes-a.mjs`.
- Coverage and regression: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirtieth.test.mjs`, and the current coverage assertions in `test/recipe-method-twenty-second.test.mjs` through `test/recipe-method-twenty-ninth.test.mjs`.
- Batch report: `docs/research/recipe-method-audit-thirtieth-20261012.md`.
