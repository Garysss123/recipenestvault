# Recipe method audit — twenty-ninth batch (2026-10-12)

## Coverage

Audit base: `0229ad8ff1bb53c4bccf4b54d369b0e3f0f56dc8` on `codex/recipe-methods-twenty-eighth-20261012`. The work is prepared on `codex/recipe-methods-twenty-ninth-20261012`.

The published registry remains at 353 existing recipes. Shared deep-review coverage grows from 112 to 116 unique recipes, leaving 219 eligible after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. Each selected ID was absent from the previous shared list. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Roast beef with Yorkshire pudding (`roast-beef-yorkshire-pudding`) | The roast endpoint was 52–54°C for medium-rare, below the official whole-cut minimum. The cook estimate did not cover the rest and Yorkshire-pudding finish, and six portions were not allocated. | Retain 1.8 kg beef and six servings. Use the 45–55-minute roast window as an initial guide, probe the thickest centre to 63°C / 145°F, and continue in five-minute increments if needed. Rest 30 minutes, which exceeds the official three-minute minimum. Set prep/cook/total to 35/130/165 minutes. Divide into six plates of about 300 g raw-beef equivalent and two puddings each. |
| Buffalo wings (`buffalo-wings`) | Three fry batches, oil recovery and rack holds were not reflected in the 35-minute cook estimate. Time and colour could be mistaken for the poultry endpoint, and the four servings were not measured. | Retain four servings and 1,500 g raw bone-in wings. Treat 9–11 minutes per batch as a guide; check the thickest flesh of the largest flat and drumette from each batch, avoiding bone, for 74°C / 165°F. If either is low, continue that batch in one-minute increments and recheck. Set prep/cook/total to 25/55/80 minutes and allocate about 375 g raw bone-in wings per serving. |
| Classic meatloaf (`meatloaf`) | The recipe gave a 71°C endpoint without specifying probe placement or a recheck path. The maximum bake window plus 15-minute rest exceeded the cook estimate, and servings were not allocated. | Retain 1,200 g ground beef and eight servings. Treat the additional 15–20-minute bake as a guide, check the thickest centre to 71°C / 160°F, and continue in five-minute increments if needed. Set prep/cook/total to 25/75/100 minutes. Divide into eight slices, about 150 g raw-beef equivalent each. |
| Pescado a la Veracruzana (`pescado-a-la-veracruzana`) | Fish cooking relied on time and flaking without stating the official endpoint. Portion sizes were implicit, and lime-seasoned raw fish sat at room temperature while the sauce cooked. | Retain 700 g fish and four servings. Keep the seasoned fish covered and refrigerated while preparing the sauce, then add lime just before cooking. Treat 7–9 minutes as a guide; check the thickest part for 63°C / 145°F, or cook until opaque and easily separated with a fork. If still low and translucent, simmer covered in two-minute increments and recheck. Set prep/cook/total to 20/35/55 minutes and allocate about 175 g raw fish per serving. |

All site-specific quantities, portion arithmetic and time estimates are editorial adaptations. Recipe references support dish identity and general preparation methods; they are not claimed as sources for this site's exact ratios, amounts, servings, timings or temperatures. Official safety guidance is separately labelled in recipe data and listed separately below.

## Recipe references

- Roast beef with Yorkshire pudding: [Great British Chefs — Roast beef silverside](https://www.greatbritishchefs.com/recipes/roast-beef-silverside-recipe) and [Great British Chefs — Yorkshire pudding](https://www.greatbritishchefs.com/recipes/yorkshire-pudding-recipe). These support roast-beef and Yorkshire-pudding identity and general preparation technique.
- Buffalo wings: [Food Network — Buffalo Chicken Wings](https://www.foodnetwork.com/recipes/buffalo-chicken-wings-recipe2-1927053) and [Food Network Kitchen — How to Make Buffalo-Style Chicken Wings](https://www.foodnetwork.com/recipes/food-network-kitchen/buffalo-style-chicken-wings-recipe/how-to-make-buffalo-style-chicken-wings). These support the Buffalo-wing style, frying and butter-hot-sauce method.
- Meatloaf: [Food Network Kitchen — Classic Meatloaf](https://www.foodnetwork.com/recipes/food-network-kitchen/classic-meatloaf-5484735) and [Food Network — Classic Meatloaf](https://www.foodnetwork.com/recipes/classic-meatloaf-1926128). These support meatloaf identity and the baked-loaf and glaze method.
- Pescado a la Veracruzana: [Food Network — Veracruz-Style Tilapia](https://www.foodnetwork.com/recipes/marcela-valladolid/veracruz-style-tilapia-pescado-a-la-veracruzana-recipe-1921676) and [Directo al Paladar México — Pescado a la Veracruzana](https://www.directoalpaladar.com.mx/recetas/pescado-a-la-veracruzana-receta). These support dish identity and the tomato, olive, caper and fish preparation.

## Official food-safety guidance

This official source is separately labelled in the recipe data and is distinct from the dish references above:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole beef roasts at 63°C / 145°F followed by a three-minute rest; ground beef at 71°C / 160°F; all poultry, including wings, at 74°C / 165°F; fish at 63°C / 145°F or until opaque and easily separated with a fork.

## Translation and review

The modified English, Traditional Chinese, Japanese, Korean and Thai method text was translated and self-reviewed in a single-model pass. This is not an independent translation or culinary review. No second-model, human or professional-kitchen review is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 116 unique deep-reviewed IDs for shared recipe-detail route checks across all five locales. The [twenty-ninth batch tests](../../test/recipe-method-twenty-ninth.test.mjs) cover the four existing IDs, the unchanged 353-recipe registry, the standing 18 exclusions, all-locale completeness, totals, portions, timing, method order, measured doneness and separation of official safety guidance from recipe references. Current shared-coverage assertions in prior batch tests advance from 112 to 116 while retaining all earlier IDs.

Verification on 2026-10-12: `npm test` passed all 20 cuisine draft audits, the static audit, and 124/124 Node tests; the integrated build generated 1,885 indexable URLs. A separate `npm run build` also passed with 1,885 indexable URLs, and `git diff --check` passed. This is a source, translation and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment and production validation were not performed.

## Changed paths

- Recipe data: `src/british-recipes-a.mjs` (`roast-beef-yorkshire-pudding`); `src/american-recipes-a.mjs` (`buffalo-wings`); `src/american-recipes-c.mjs` (`meatloaf`); `src/mexican-recipes-c.mjs` (`pescado-a-la-veracruzana`).
- Source labels: `src/british-source-map.mjs`, `src/american-source-map.mjs`, `src/mexican-source-map.mjs`.
- Coverage and regression: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-twenty-second.test.mjs`, `test/recipe-method-twenty-third.test.mjs`, `test/recipe-method-twenty-fourth.test.mjs`, `test/recipe-method-twenty-fifth.test.mjs`, `test/recipe-method-twenty-sixth.test.mjs`, `test/recipe-method-twenty-seventh.test.mjs`, `test/recipe-method-twenty-eighth.test.mjs`, `test/recipe-method-twenty-ninth.test.mjs`.
- Batch report: `docs/research/recipe-method-audit-twenty-ninth-20261012.md`.
