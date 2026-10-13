# Recipe method audit — sixty-ninth batch (2026-10-13)

## Coverage and branch

Audit base: `13511160ff49e89024169bd2a69f02256eeafc01` on `codex/recipe-methods-sixty-eighth-20261013` (parent `10a952c0c0d44b211e7cb6ecbaee536c02d57459`, tree `83bfdb3c2bd9e135c2e298ce9768e1bf42985502`). Work branch: `codex/recipe-methods-sixty-ninth-20261013`.

The recipe registry stays at 353 recipes. Shared exact-slug deep-review coverage grows from 272 to 276 unique recipes. The existing 18 exclusions remain unchanged: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. Eligible unchecked coverage moves from 63 to 59. The four selections were absent from the base ledger and do not appear in the exclusions.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Kitsune udon (`kitsune-udon`) | The method did not clearly distinguish blanching water, seasoning water, broth, noodle water, and per-bowl topping amounts. Package-dependent noodle timing and hot serving cues could be mistaken for safety checks. | Keep four portions and eight steps. Separate 1 L blanching water, 150 ml seasoning water, 1 L dashi, and 2 L noodle water. Simmer 240 g aburaage with measured seasoning; divide the broth into four 250 ml servings, use four 200 g frozen udon portions by package directions, and allocate 20 g narutomaki, 10 g scallions, and 10 g tenkasu per bowl. Mark steam/texture and noodle time as quality guidance. Store perishable cooked components promptly and reheat leftovers throughout to 74°C / 165°F. |
| Vada pav (`vada-pav`) | The potato-boiling water was unlisted, batter hydration and frying batches lacked boundaries, and the oil temperature could read as a food safety limit. Filling and chutney allocation needed clarification. | Keep eight fritters and eight steps. List 2 L potato-boiling water; set the batter at 260–300 ml water, added in 10 ml increments; use 1.5 L oil and hold 165–175°C for browning/crispness only. Divide into four frying batches of two and allocate measured chutneys at assembly. Check the centre to 74°C / 165°F only if the cooked filling was cooled and refrigerated; use the same reheating endpoint for chilled leftovers. |
| Black Forest cake (`black-forest-cake`) | Cherry liquid, Kirsch, cream, chocolate, and garnish could be unevenly allocated; bake timing and sponge texture needed to remain distinct from egg safety. Cold storage needed explicit limits. | Keep twelve portions and twelve steps. Split 400 ml cherry juice into 100 ml for thickening and 300 ml for syrup; brush all 100 ml Kirsch across four cut faces at 25 ml each; reserve all 120 g chocolate and twelve cherries for finishing. Set prep/cook/total to 225/40/265 minutes. Check the egg sponge against the 71°C / 160°F egg-dish endpoint while using spring-back/skewer cues for texture. Store covered at or below 4°C / 40°F; return it within two hours after serving, or one hour above 32°C / 90°F. The two-day recommendation is labeled a quality preference, not an official safety limit. |
| Montreal smoked meat sandwich (`montreal-smoked-meat-sandwich`) | The steam instruction did not distinguish reheating an already cooked ready-to-eat product from a safety endpoint. Four-sandwich allocations and leftover handling needed precision. | Keep four servings and six steps. Steam 600 g ready-to-eat meat in a shallow layer (two 300 g batches if needed) for an estimated 5–8 minutes until hot and supple for serving; label that as a quality estimate. Divide into four 150 g portions, with 60 ml mustard split four ways, eight rye slices, and one pickle spear per serving. Refrigerate cooked meat promptly and reheat leftovers to 74°C / 165°F; apply the official 3–4-day window to cooked meat leftovers only. |

All four methods, storage entries, and added ingredient rows are localized in English, Traditional Chinese, Japanese, Korean, and Thai. Existing step counts, `imageScene` mappings, and one-to-one step illustration assignments are preserved. Revisions use a separate published copy so these four source drafts remain unchanged. Culinary sources support dish identity and general techniques; the exact quantities, yields, timings, and editorial quality cues are this site's adaptations.

## Recipe references

- Kitsune udon: [Just One Cookbook — Kitsune Udon](https://www.justonecookbook.com/kitsune-udon/) and [Japanese Cooking 101 — Kitsune Udon](https://www.japanesecooking101.com/kitsune-udon-recipe/).
- Vada pav: [Swasthi's Recipes — Vada Pav](https://www.indianhealthyrecipes.com/vada-pav-recipe/) and [Ministry of Curry — Vada Pav](https://ministryofcurry.com/vada-pav/).
- Black Forest cake: [Kitchen Stories — Schwarzwälder Kirschtorte](https://www.kitchenstories.com/de/rezepte/schwarzwalder-kirschtorte) and [Dr. Oetker — Schwarzwälder Kirschtorte](https://www.oetker.de/rezepte/r/schwarzwaelder-kirschtorte).
- Montreal smoked meat: [Levitts — Classic Montreal Style Smoked Meat Sandwich](https://www.levitts.ca/en/recipe/classic-montreal-style-smoked-meat-sandwich) and [HexClad Canada — Montreal Style Smoked Meat Sandwiches](https://hexclad.ca/blogs/recipes/montreal-style-smoked-meat-sandwiches).

## Official food-safety guidance

Official references are separately labeled in the recipe data from culinary sources:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): intact whole cuts of beef, pork, and lamb at 63°C / 145°F plus a three-minute rest; ground meat and sausage at 71°C / 160°F; poultry at 74°C / 165°F; egg dishes at 71°C / 160°F; reheated leftovers at 74°C / 165°F.
- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): cold holding at 4°C / 40°F or below, refrigerate within two hours (one hour above 32°C / 90°F), and use shallow containers.
- [FoodSafety.gov — Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): cooked soup/stew and cooked meat/poultry leftovers have a 3–4-day refrigerated window. This window is applied here to soup/stew and cooked smoked meat only, not the vegetarian fritters or cream cake.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): listed with the cake's egg-related guidance.

No selected recipe calls for raw whole-cut meat, ground meat, or raw poultry. The whole-cut, ground-meat, and poultry endpoints are therefore not assigned to tofu/fish cake, potato fritters, sponge texture, or already cooked ready-to-eat smoked meat. The applicable egg-dish endpoint and conditional leftover/reheating endpoint are stated where relevant. Frying oil, noodle time, steaming time, browning, spring-back, and tenderness are labeled as process or quality cues, not as safety proofs.

## Translation and review

The English, Traditional Chinese, Japanese, Korean, and Thai edits were translated and self-reviewed in one model pass. That review is not independent or human. The active model runtime variant was not exposed, so it cannot be reported. No professional kitchen review is claimed.

## Regression coverage and limits

The shared exact-slug ledger now has 276 unique IDs. Historical batch checks were adjusted to preserve their original four-slug windows in the growing ledger. The [sixty-ninth batch regression](../../test/recipe-method-sixty-ninth.test.mjs) covers the exact selection, unchanged 353-recipe registry, 18 exclusions, all five locales, changed method and storage, quantities, timelines, food-safety sources, and preserved illustration mappings. `npm test` passed on 2026-10-13: repository draft audits, build (1,885 indexable URLs across five locales), static output audit (10,816 files), and all 330 Node tests (0 failed). A separate `npm run build` also generated 1,885 indexable URLs across five locales. Focused shared-ledger, shared detail-route, sixty-eighth, and sixty-ninth regressions passed: 67 tests, 0 failed. `git diff --check` passed.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI, accessibility, deployment, and production validation were not performed. No headless browser, CDP, local server, or security-setting changes were used.
