# Recipe method audit — seventy-fourth batch (2026-10-13)

## Scope, instructions, and coverage

Base: `37040d2621846256084363a0c66959546fcf26b1`, the head of `codex/recipe-methods-seventy-third-20261013`. Work branch: `codex/recipe-methods-seventy-fourth-20261013`, created from that exact commit.

I read `README.md`, `TODO.md`, the recent recipe-method audit reports, the exact-slug coverage ledger in `test/recipe-method-regressions.test.mjs`, and standing exclusions in `test/recipe-method-fiftieth.test.mjs`. No repository `AGENTS.md` or `.agents/skills/**/SKILL.md` was present. Project rules require source-backed recipe details, consistent facts across five locales, preserved source-draft methods and illustration integrity, and static validation.

The registry remains at 353 unique recipes. Exact-slug coverage increases from 292 to 296; 39 eligible unchecked recipes remain after the same 18 excluded slugs. All four selections were absent from the base ledger and the exclusion list. Publication copies are refined in `src/recipe-method-audit-seventy-fourth.mjs`. The source drafts, ingredient rows and amounts, natural step counts, illustration scene mappings, photos, registry entries, and routes remain unchanged. Historical regression assertions were advanced to the current shared ledger while retaining each batch's exact slug window.

Count terminology was corrected in prior method-audit reports 63–67 and 71–73: `npm test` invokes 20 `audit:*drafts` commands in `package.json`; `src/recipes.mjs` has 21 recipe source groups. Those are separate counts, and that wording correction changed reports only. Read-only parent/result comparisons across the batch 63–73 history, including the intervening batch-66 source-note commit, found zero deleted files, including drafts and tests. This batch deletes no files and leaves source-draft content unchanged. Regression tests were updated separately to extend cumulative coverage and add this batch's checks.

## Findings and changes

| Recipe | Unfinished issue found | Change in all five locales |
| --- | --- | --- |
| Dal tadka (`dal-tadka`) | The pressure-cooker time did not establish when timing begins, and the finish depended on time without a lentil texture test or a measured correction. | Start the 10-minute timer only after high pressure is reached, then allow a 10-minute natural release and verify the pressure indicator is down before opening. Test three lentils for creamy centres without chalkiness; if firm, add 30 ml hot water and pressure-cook for two more minutes, then release naturally for five minutes and retest. Cool in shallow containers, refrigerate at or below 4°C within the official time limit, and reheat leftovers to 74°C. No unrelated meat or egg cooking temperature is applied to the lentils. |
| Gougères (`gougeres`) | Golden colour and hollow sound did not verify the thick shell's egg-dish endpoint; no recovery was given for dark tops with an underdone shell. | Probe the thick shell of the largest puff from the side and verify 71°C / 160°F. If below 71°C, shield dark tops loosely, lower the oven to 160°C, and bake in three-minute increments, rechecking the shell. State prompt refrigeration and safe reheating for egg-and-cheese leftovers. |
| Skillet cornbread (`skillet-cornbread`) | The centre relied on appearance without an egg-dish endpoint, and there was no correction for a wet centre or a top browning too soon. | Probe the centre without touching the skillet and verify 71°C / 160°F plus a tester without wet batter. Extend in three-minute increments if needed; if the top darkens first, tent loosely with foil, lower to 200°C, and continue in three-minute increments. Add official cooling and leftover reheating guidance. |
| Toutons (`toutons`) | The flour dough lacked a raw-flour handling warning, and exterior browning alone could leave a gummy centre without a useful recovery. | Warn not to taste raw dough and to cook it fully. Follow the documented source-specific oil target of 135°C / 275°F, keeping it below 140°C. Cut the thickest first piece and look for set, matte crumb with no wet gummy stripe. If the crust is dark but the centre is gummy, finish in a 120°C / 250°F oven; otherwise reduce the oil to 125–130°C and extend in two-minute increments. Leftover reheating guidance applies only to stored leftovers; no meat or egg cooking temperature is applied to flour dough. |

Existing culinary references remain separate from the official food-safety sources.

## Recipe-method references checked

- [Swasthi's Recipes — Dal Tadka](https://www.indianhealthyrecipes.com/dal-tadka/) and [Dassana's Veg Recipes — Dal Tadka](https://www.vegrecipesofindia.com/restaurant-style-dal-tadka/): checked for the lentil simmer and pressure-cooking method.
- [Pardon Your French — Gougères](https://www.pardonyourfrench.com/french-cheese-puffs-gougeres/) and [Meilleur du Chef — Gougères](https://www.meilleurduchef.com/fr/recette/gougeres.html): checked for the choux and cheese-puff bake method.
- [King Arthur Baking — Skillet Cornbread](https://www.kingarthurbaking.com/recipes/skillet-cornbread-recipe) and [Food Network — Skillet Cornbread](https://www.foodnetwork.com/recipes/skillet-cornbread-recipe-1927110): checked for the skillet bake and source recipe cues.
- [Rock Recipes — Newfoundland Toutons](https://www.rockrecipes.com/newfoundland-toutons/) and [Bonita's Kitchen — Traditional Newfoundland Toutons and Frozies](https://www.bonitaskitchen.com/recipe/traditional-newfoundland-toutons-frozies/): checked for the dough and shallow-frying method. The 135°C / 275°F oil target is specific to the selected recipe method, not a food-safety endpoint.

## Food-safety sources checked

- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): egg dishes should reach 71°C / 160°F; cooked egg dishes can be refrigerated for 3–4 days. Applied to the egg-containing gougères and cornbread.
- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): distinguishes egg dishes at 71°C / 160°F from leftovers reheated to 74°C / 165°F. The egg-dish temperature is used only for gougères and cornbread; 74°C / 165°F is used only for reheating leftovers.
- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): refrigerate perishables within two hours, within one hour above 32°C / 90°F; keep cold food at or below 4°C / 40°F, cool in shallow containers, and use the chart's 3–4-day range for cooked leftovers as appropriate. Applied to dal and the egg-and-cheese recipes. Recipe-specific shorter three-day targets are conservative quality/use instructions.
- [FDA — Handling Flour Safely: What You Need to Know](https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-to-know): flour is raw and should be cooked fully; do not taste raw dough. Applied to toutons. No unsupported internal temperature was added to flour-only dough.

## Regression and validation

- `npm ci --cache /tmp/recipenestvault-npm-cache` — installed the lockfile dependencies; neither package manifest changed.
- Focused regression `node --test test/recipe-method-regressions.test.mjs test/recipe-method-seventieth.test.mjs test/recipe-method-seventy-first.test.mjs test/recipe-method-seventy-second.test.mjs test/recipe-method-seventy-third.test.mjs test/recipe-method-seventy-fourth.test.mjs` — passed 85/85 tests.
- `npm test` — passed all 20 `audit:*drafts` commands in the package script, built 1,885 indexable URLs across five locales, passed the 10,816-file static audit, and passed 360/360 Node tests. The 20 audit-command count is distinct from the 21 source-group count in `src/recipes.mjs`.
- Independent `npm run build` — passed; generated 1,885 indexable URLs across five locales.
- Independent `npm run audit` — passed; checked 10,816 files and 1,885 routes, including links/fragments, five-language completeness, image and provenance gates, sitemap, metadata, and structured data.
- `git diff --check` — passed after final diff review.

This is source and automated regression review. No recipe was cooked or tasted; no independent human translation review, browser/UI review, accessibility review, production-domain check, deployment, or production verification was performed. No headless browser, CDP, HTTP crawling, credential changes, or security-setting changes were used.
