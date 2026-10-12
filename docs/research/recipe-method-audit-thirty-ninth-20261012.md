# Recipe method audit — thirty-ninth batch (2026-10-12)

## Coverage

Audit base and intended parent: `8b16145ff9f0b542a7218cd2b91fcfe0be6aabd7`, fetched from `codex/recipe-methods-thirty-eighth-20261012`. Work branch: `codex/recipe-methods-thirty-ninth-20261013`, created from that exact base.

The registry remains at 353 existing recipes. Shared five-locale method coverage grows from 152 to 156 unique IDs. The same 18 standing exclusions remain unchanged, leaving 179 eligible recipes for later review. The four selected IDs were absent from prior coverage and are not excluded. No recipe or date was added, no excluded recipe was edited, and unrelated drafts were left untouched.

No repository `AGENTS.md`, `SKILL.md`, or `.agents/skills` regression instructions were present. I checked the prior audit report, the exclusion list, the shared route regression, candidate methods, and historical batch tests before selecting these omissions.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Taiwanese oyster omelette (`oyster-omelette`) | The oyster target was present, but the egg layer only had a visual “set” cue; neither target had a thermometer recheck interval or separate official safety attribution. | In all five locales, check the thickest egg layer at 71°C / 160°F and fully set, and the largest oyster at 63°C / 145°F, opaque and firm. Continue in 15-second increments and recheck if either is low. Added separate FoodSafety.gov and FDA references. The existing two-serving method already divided the ingredients and sauce in half. |
| Korean mandu (`mandu`) | Pork checks used 74°C despite FoodSafety.gov's 71°C / 160°F ground-meat endpoint. The first and second steam batches disagreed, the second lacked a measured recheck, and the stated cook estimate did not cover its two upper 10–12-minute batches. | Set the tester and both batches to 71°C / 160°F in all locales; include translucent/tender wrapper cues, 10–12 minutes for the second batch, and two-minute measured rechecks. Keep the chicken substitution and reheating endpoint at 74°C. Set prep/cook/total to 75/60/135 minutes to cover the tester, steam batches, rests, water heating, recovery, and rechecks. Added FoodSafety.gov. The existing 40 wrappers, 22 g portions, and five servings remain consistent. |
| Vietnamese crab noodle soup (`bun-rieu`) | The mixed crab, shrimp, pork, and egg dumpling used a 74°C target without a two-minute recheck or separate official safety sources. | Check the largest dumpling at 71°C / 160°F and simmer/recheck in two-minute increments in all locales. Set prep/cook/total to 35/130/165 minutes; the timed stages total up to 118 minutes before allowance for water heating. Added FoodSafety.gov and FDA references. The existing 16 dumplings remain allocated as four per bowl across four servings. |
| Vietnamese fried spring rolls (`cha-gio`) | The pork-and-shrimp filling used 74°C, without a recheck interval or separate official safety references. The 35-minute cook estimate did not cover the stated batch schedule. | Check the tester and thickest roll filling at 71°C / 160°F; continue frying and recheck in two-minute increments. Set prep/cook/total to 55/60/115 minutes. Four batches at the upper eight-minute first fry, ten-minute rack rest, four upper two-minute crisping batches, and final two-minute drain total 52 minutes; the estimate allows eight minutes for oil heating and recovery. Added FoodSafety.gov and FDA references. The existing 20 rolls remain allocated as five per serving across four servings. |

No ingredient amounts needed correction: existing measured ingredients and serving allocations were retained and checked in the regression. The changed durations, portion arithmetic, and stage allowances are editorial estimates, not times or quantities attributed to recipe sources. Dish references remain separate from official safety references.

## Safety references

The [FoodSafety.gov safe minimum internal temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) specifies 160°F / 71°C for egg dishes and ground meats, including pork. The [FDA seafood guidance](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) recommends 145°F / 63°C for most seafood and describes doneness cues. Both are listed as official guidance in affected recipes.

## Translation and review

The English and Traditional Chinese, Japanese, Korean, and Thai edits were checked in the same agent/model pass. That self-review is not independent or human review. The environment does not expose a model selector, so assignment to GPT-6 Luna cannot be confirmed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 156 unique recipes for shared five-locale route checks. The new [thirty-ninth batch regression](../../test/recipe-method-thirty-ninth.test.mjs) checks the 353-recipe registry, 18 exclusions, prior 152 IDs, four new eligible IDs, ingredient/localized-field completeness, portions, timing arithmetic, official source labels, and localized doneness and recheck instructions. Historical batch count assertions were advanced to the new shared coverage total; their recipe checks were not weakened.

Verification on 2026-10-12: `npm test` passed all 20 language draft audits, the static audit, and 174/174 Node tests. A separate `npm run build` generated 1,885 indexable URLs across five locales. `git diff --check` passed. No recipe was cooked. The recipe UI was not opened; no browser, preview server, or CDP check was run.

## Changed paths

- Recipe methods and official-source labels: `src/korean-recipe-helpers.mjs`, `src/korean-recipes-b2.mjs`, `src/taiwanese-recipe-helpers.mjs`, `src/taiwanese-recipes-a.mjs`, `src/vietnamese-recipes-a.mjs`, and `src/vietnamese-recipes-b.mjs`.
- Shared route coverage and regressions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-ninth.test.mjs`, and historical batch tests with shared-count assertions.
- This audit report.
