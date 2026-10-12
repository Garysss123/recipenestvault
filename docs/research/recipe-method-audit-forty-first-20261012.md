# Recipe method audit — forty-first batch (2026-10-12)

## Coverage

Created `codex/recipe-methods-forty-first-20261013` from the verified head `b8e66cd28ef3766862c0db077c6ea487659ae986` of `codex/recipe-methods-fortieth-20261013`. The recipe registry remains 353 entries. Shared five-locale method coverage grows from 160 to 164 unique IDs. The same 18 standing exclusions remain unchanged, leaving 171 eligible recipes for later review. All four selected IDs were absent from prior coverage and are not excluded.

The repository has no `AGENTS.md`, `SKILL.md`, or `.agents/skills` regression instructions. I reviewed the fortieth-batch report, current candidate methods, and cumulative regression assertions before editing. No recipe was added or removed, and the report date follows the workspace date rather than the branch suffix.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Pineapple fried rice (`pineapple-fried-rice`) | The rice instructions allowed rapid cooling and refrigeration but did not set a one-day use limit or limit reheating to once. The four servings also lacked per-person rice and shrimp equivalents. | In all five locales, keep rice cold until wok use, cool it in a shallow container, refrigerate ideally within one hour, use within 24 hours, and reheat once until strongly steaming and 74°C throughout. State four servings with about 175 g cooked rice and 75 g raw-shrimp equivalent each. Add the UK Food Standards Agency source for rice handling. Existing prep/cook/total estimates remain 35/20/55 minutes. |
| Fideuà (`fideua`) | The method checked monkfish but did not give endpoint checks for the cuttlefish/squid or prawns, and the partly cooked prawns could be returned to a plate with raw seafood contact. | In all five locales, use clean tongs and a clean plate for seared prawns; finish them with the noodles. Check the thickest fish and largest squid/cuttlefish pieces at 63°C / 145°F, and the largest prawns for firm, pearly, opaque flesh. Continue in two-minute increments and recheck. State six portions with per-person dry-noodle and raw-seafood equivalents. Add FDA seafood guidance. Existing estimates remain 25/45/70 minutes. |
| Bún chả (`bun-cha`) | The ground-pork patties had a 71°C endpoint but no explicit recheck interval, and the four servings did not say how many patties or how much dry vermicelli each person receives. | In all five locales, check several of the largest patty centres, continue in one-minute increments and recheck any below 71°C / 160°F. State four patties (about 175 g raw-pork equivalent) and 80 g dry vermicelli per person. Add FoodSafety.gov ground-meat guidance. Existing estimates remain 100/30/130 minutes. |
| Cao lầu (`cao-lau`) | Its stated cooking estimate was shorter than the upper timed method, and the braise had no continuation instruction if the tenderness cue was not met by 65 minutes. | In all five locales, label 50–65 minutes as a site estimate; check the thickest pork at an editorial 85°C sliceable-tenderness target and with a skewer. Continue covered in ten-minute increments and recheck both cues if needed. Clearly distinguish that texture target from the official whole-pork minimum of 63°C / 145°F followed by a three-minute rest. State four servings with 150 g raw-pork equivalent and about 75 ml sauce each. Increase cook/total estimates to 135/215 minutes; prep remains 80 minutes. Add FoodSafety.gov guidance. |

## Official guidance checked

The [UK Food Standards Agency's Home food fact checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker) advises cooling rice quickly, ideally within one hour, using refrigerated rice within one day, reheating it only once, and reheating until steaming hot throughout. [FoodSafety.gov's safe minimum internal temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) lists 74°C / 165°F for leftovers, 71°C / 160°F for ground meats, and 63°C / 145°F followed by a three-minute rest for whole pork cuts. The [FDA's seafood guidance](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) recommends 63°C / 145°F for most seafood and gives visual doneness cues for shrimp.

The 74°C rice reheating endpoint follows FoodSafety.gov's leftover guidance; the FSA citation supports the rice cooling, storage, once-only reheating, and steaming-hot directions. Site timing adjustments, per-person allocations, two-minute and one-minute recheck intervals, and the 85°C braising tenderness target are recipe-editor estimates or instructions, not claims attributed to dish references or food-safety authorities. Dish-method references remain separate from official safety sources.

## Translation and review

English, Traditional Chinese, Japanese, Korean, and Thai methods and portion statements were updated and checked. A GPT-6 Luna same-model read-only review found no concrete content, locale, timing, source-label, or regression-assertion defect. This is a same-model review pass, not independent or human review.

No food was cooked as part of this review. The recipe UI was not opened; no browser, preview server, CDP, deployment, or production check was run.

## Regression and verification

`test/recipe-method-regressions.test.mjs` now covers 164 IDs across all five locales. The [forty-first-batch regression](../../test/recipe-method-forty-first.test.mjs) verifies the 353-entry registry, 18 exclusions, all 160 prior reviewed IDs, the four new eligible IDs, localized ingredients and steps, serving allocations, timing, doneness checks, and official-source labels. Historical shared-coverage assertions were advanced to the current count without removing their recipe-specific checks.

- `npm test`: passed; all 20 draft audits, build, static audit, and 184 Node tests passed.
- Independent `npm run build`: passed; 1,885 indexable URLs across five locales.
- Five-locale method regression (`node --test test/recipe-method-regressions.test.mjs test/recipe-method-forty-first.test.mjs`): passed, 60 tests.
- `git diff --check`: passed.

## Changed paths

- Recipe methods and safety references: `src/thai-recipes-e.mjs`, `src/thai-recipe-helpers.mjs`, `src/spanish-recipes-c.mjs`, `src/vietnamese-recipes-a.mjs`, and `src/vietnamese-recipes-b.mjs`.
- Shared coverage and regressions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-forty-first.test.mjs`, and cumulative batch assertions in historical `test/recipe-method-*.test.mjs` files.
- This audit report.
