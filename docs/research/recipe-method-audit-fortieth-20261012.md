# Recipe method audit — fortieth batch (2026-10-12)

## Coverage

Fetched `codex/recipe-methods-thirty-ninth-20261013` and verified its head is exactly `2a3fc7cb202a8cc3946ff54cd1705c63c2668c34`. Created `codex/recipe-methods-fortieth-20261013` from that commit. The registry remains at 353 existing recipes. Shared five-locale method coverage grows from 156 to 160 unique IDs. The same 18 standing exclusions remain unchanged; 175 eligible recipes remain for later review. All four selected IDs were absent from prior coverage and are not excluded. No recipe or date was added, no excluded recipe was edited, and unrelated drafts were left untouched.

The target repository contains no `AGENTS.md`, `SKILL.md`, or `.agents/skills` regression instructions. I read the thirty-ninth audit and regression, the shared five-locale route tests, candidate methods, and historical batch regressions before choosing this batch.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| German beef roulades (`rinderrouladen`) | The 90-minute braise and fork-tender cue gave no measured endpoint for the thickest beef layer, and the method did not say to rest the rolls before untying. | In all five locales, measure the thickest beef layer beside the filling at 63°C / 145°F, continue in five-minute increments and recheck if needed, then rest three minutes before removing the twine. The eight existing rolls still serve four (two per serving). Set prep/cook/total estimates to 40/140/180 minutes to include the 90-minute braise, finishing and endpoint check. |
| Croatian black risotto (`crni-rizot`) | Cuttlefish was judged by opacity and heat alone; no temperature or measured recheck was given. | In all five locales, check the thickest cuttlefish piece at 63°C / 145°F and continue simmering in one-minute increments with rechecks if needed. The existing 700 g cuttlefish remains 175 g per serving across four servings; 25/45/70 minutes remain as editorial estimates. |
| Thai crab fried rice (`khao-pad`) | The method reheated chilled cooked crab for a fixed 45 seconds and added the reserved portion for 20 seconds, without confirming a safe reheating temperature. Egg curds were judged by appearance only. Rice cooling guidance allowed two hours at room temperature and gave no 24-hour use limit. | In all five locales, verify the cooked egg at 71°C / 160°F and each chilled crab portion at 74°C / 165°F, using 15-second reheating/recheck increments. Cool rice rapidly, refrigerate ideally within one hour, use within 24 hours, and keep chilled until the wok is hot. Add FoodSafety.gov and UK Food Standards Agency references. The existing 700 g rice and 250 g crab still yield 175 g rice and 62.5 g crab per serving across four servings. Set prep/cook/total estimates to 25/20/45 minutes to allow for the temperature checks. |
| Memphis dry-rub ribs (`memphis-style-ribs`) | The method relied on bend and bone pullback for tenderness but gave no measured pork safety endpoint. The upper stated smoke schedule plus rest takes 255 minutes, exceeding the 240-minute cook estimate. | In all five locales, measure the thickest meaty section away from bone at 63°C / 145°F, continue smoking in 15-minute increments and recheck if needed; the existing 15-minute rest satisfies the official rest period. Increase cook/total estimates to 260/350 minutes, covering the 90-minute first smoke, 2.5-hour second smoke, 15-minute rest, and a small allowance for checking. The two existing racks remain six servings (450 g raw ribs per serving). |

Ingredient quantities and serving counts were checked and retained. The adjusted times are editorial estimates for this site's methods, not exact timings attributed to dish references or official guidance. Dish references remain separate from official food-safety references.

## Official guidance checked

The [FoodSafety.gov safe minimum internal temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) lists 145°F / 63°C plus a three-minute rest for whole cuts of beef and pork, 160°F / 71°C for egg dishes, and 165°F / 74°C for leftovers. The [FDA seafood guidance](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) recommends 145°F / 63°C for most seafood and provides visual alternatives for several named seafood categories. The [UK Food Standards Agency's Home food fact checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker) says to cool rice quickly, ideally within an hour, use refrigerated rice within one day, and reheat until steaming hot throughout. The one- and 15-second/minute recheck intervals and site-specific estimate adjustments are editorial instructions, not standards specified by these sources.

## Translation and review

English and Traditional Chinese, Japanese, Korean, and Thai instructions were updated and checked for each selected method. GPT-6 Luna was assigned a read-only same-model self-review of this diff. That review is not represented as independent or human review.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 160 unique recipes for shared five-locale route checks. The new [fortieth-batch regression](../../test/recipe-method-fortieth.test.mjs) checks the 353-recipe registry, unchanged 18 exclusions, all 156 prior IDs, the four new eligible IDs, localization, portions, editorial times, official safety labels, and localized temperature/recheck directions. Existing batch tests were advanced to the new shared-coverage count without removing their recipe-specific assertions.

No food was cooked as part of this review. The recipe UI was not opened; no browser, preview server, or CDP check was run.

## Changed paths

- Methods and safety references: `src/german-recipes-a.mjs`, `src/mediterranean-recipes-c.mjs`, `src/thai-recipes-b.mjs`, `src/thai-recipe-helpers.mjs`, and `src/american-recipes-a.mjs`.
- Shared five-locale coverage and regressions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-fortieth.test.mjs`, and historical batch tests with current shared-count assertions.
- This audit report.
