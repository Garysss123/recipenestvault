# Recipe method audit — twentieth batch (2026-10-12)

## Coverage

Base commit: `6a823e6d56a8ea2ff2cd06074b19e5f859ae9776` on `codex/recipe-methods-twentieth-20261012`.

The registry contains 353 existing recipes. The inherited deep-review coverage list had 76 distinct recipe IDs. This batch adds four existing recipes, bringing the covered total to 80 and leaving 255 eligible after retaining the same 18 user exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. No recipe was added, no excluded recipe was modified, and no `localdrafts` content was touched.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Oyakodon (`oyakodon`) | The rice preparation was implicit, chicken and egg safety endpoints could be conflated, and the two bowls lacked explicit cooked-rice and raw-protein allocations. | Keep two servings. Set prep/cook/total to 15/20/35 minutes; have 360 g cooked rice ready first and add dry-rice cooker time separately. Use 300 g raw chicken, 200 g egg, and 360 g cooked rice as two equal bowls: about 150 g raw chicken, 100 g raw egg, and 180 g cooked rice per bowl. Cook chicken separately to 74°C / 165°F. Add egg in two stages and finish the egg layer to 71°C / 160°F with no liquid egg remaining. |
| Korean grilled short ribs (`galbi`) | The prior step used 71°C / 160°F, the ground-meat endpoint, for whole-cut beef; the portions and rest were not explicit. | Keep four servings and set prep/cook/total to 400/20/420 minutes. Grill in batches, checking the thickest meat without touching bone; use 63°C / 145°F, then rest 3 minutes. Divide 1.2 kg raw bone-in ribs into four shares of about 300 g each and distribute 8–10 pieces evenly. The boneless substitution uses 25 mm whole-muscle steaks to make a centre-temperature check practical. |
| Bobó de camarão (`bobo-de-camarao`) | The method did not divide the salt or rice, did not state per-person shrimp/cassava shares, and a common-mistake note incorrectly mentioned fish. | Keep four servings and set prep/cook/total to 30/50/80 minutes. Use 3 g of the 8 g salt to season and chill the shrimp for 15 minutes; reserve the remaining 5 g for tasting at the finish. Cook shrimp at a gentle simmer for about 3–5 minutes until firm, pearly, and opaque, then stop; do not assign a numeric internal temperature to shrimp. Divide 600 g cooked rice into four 150 g portions and share the stew evenly, about 175 g raw shrimp and 250 g raw cassava per serving before cooking. Replace the unrelated fish warning with an applicable shrimp overcooking warning. |
| Newfoundland Jiggs dinner (`jiggs-dinner`) | The 10-hour salt-beef soak had no refrigeration limit, meat tenderness was not checked before adding vegetables, and eight servings lacked a portion split. | Keep eight servings. Set prep/cook/total to 630/190/820 minutes, including the 10-hour refrigerated soak in prep. Cut 1.5 kg beef into even 5 cm pieces; soak at or below 4°C / 40°F, check the pease pudding at about 60 minutes and remove it when mashable, then continue the beef until a fork slides easily into a piece (usually 90–120 minutes total). Add rutabaga and carrots only after the beef is tender, then time the potatoes and cabbage in order. Divide the raw beef as about 188 g per person before cooking. A fixed centre temperature is not added to this long-braised salt-beef endpoint. |

All modified method text was translated and self-reviewed in English, Traditional Chinese, Japanese, Korean, and Thai in a single-model pass. This is not an independent review. No second model, human review, or external model API is claimed.

## Recipe references

These sources informed dish identity, common method, and comparison. Their formulas and times differ from the site's amounts and editorial timings. The site's time estimates and operational details are editorial and are not represented as originating from these recipe authors.

- Oyakodon: [Just One Cookbook — Oyakodon](https://www.justonecookbook.com/oyakodon/), [Kikkoman — Oyakodon](https://www.kikkoman.com/en/cookbook/washoku/oyakodon.html), and [Japan Ministry of Agriculture, Forestry and Fisheries — Oyakodon](https://www.maff.go.jp/e/policies/market/k_ryouri/search_menu/3539/index.html). These support the chicken-and-egg donburi method; they are not the source of the site's editorial timing or two-bowl safety endpoints.
- Galbi: [Maangchi — Galbi](https://www.maangchi.com/recipe/galbi) and [Korean Bapsang — Galbi](https://www.koreanbapsang.com/galbikalbi-korean-bbq-short-ribs/). These support the Korean grilled short-rib context and marination/grilling method; the site's portions, time estimate, and safe endpoint are editorial.
- Bobó de camarão: [Easy and Delish — Bobó de Camarão](https://www.easyanddelish.com/bobo-de-camarao/) and [Brazilian Kitchen Abroad — Bobó de Camarão (Brazilian Shrimp Stew)](https://braziliankitchenabroad.com/bobo-de-camarao-brazilian-shrimp-stew/). These support the Bahian cassava, coconut, dendê, shrimp, and rice context; the site's split salt and serving allocations are editorial.
- Jiggs dinner: [Parks Canada — Jiggs Dinner, Ryan Premises National Historic Site](https://parks.canada.ca/culture/gourmand-gourmet/recette-recipe76) and [Bonita's Kitchen — Jiggs Dinner and Peas Pudding](https://www.bonitaskitchen.com/recipe/jiggs-dinner-and-peas-pudding-traditional-newfoundland/). These support the Newfoundland boiled-dinner and pease-pudding context; recipes differ in meat, sequence, and total time, so the site's batch timing and tenderness checks are editorial.

## Official food-safety guidance

The official guidance below is kept separate from the dish references:

- [FoodSafety.gov — Cook to a Safe Minimum Internal Temperature](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole-cut beef steaks, roasts, and chops to 63°C / 145°F with a 3-minute rest; poultry to 74°C / 165°F; egg dishes to 71°C / 160°F; shrimp until pearly or white and opaque. The galbi edit uses the whole-cut beef row, not the 71°C ground-meat row. The oyakodon edit checks the chicken and egg separately.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): safe handling guidance for eggs and dishes containing eggs.
- [FDA — Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely): shrimp flesh should become firm, pearly, and opaque. The recipe uses this applicable visual endpoint rather than borrowing a fish or meat temperature.
- [FoodSafety.gov — Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): refrigerator storage at 4°C / 40°F or below; the Jiggs salt-beef soak now states this limit.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 80 unique deep-reviewed recipe IDs. The new [twentieth-batch tests](../../test/recipe-method-twentieth.test.mjs) cover the four existing IDs, all five locales, allocations, serving splits, time arithmetic, step order, applicable safety endpoints, source attribution, and absence of inappropriate numeric temperatures. The shared all-recipe route regression now exercises the expanded 80-ID set in all five locales.

Validation passed: `npm test` completed all project draft audits, the static audit (10,816 files and 1,885 indexable routes), and 79/79 Node tests. A separate `npm run build` completed with 1,885 indexable URLs, and `git diff --check` passed.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
