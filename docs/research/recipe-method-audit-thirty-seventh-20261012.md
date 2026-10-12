# Recipe method audit — thirty-seventh batch (2026-10-12)

## Coverage

Audit base and intended parent: `a7f6146ee0c9275ff9efcae37e49d9b90c03655e`. Work branch: `codex/recipe-methods-thirty-seventh-20261012`.

The registry remains at 353 recipes. Shared five-locale deep-review coverage grows from 144 to 148 unique IDs. The same 18 standing exclusions remain unchanged; 187 of the 335 non-excluded recipes remain eligible for later review. All four additions are existing recipes, not exclusions. No recipe or date was added, no excluded recipe was edited, and no local draft was changed.

No repository `AGENTS.md`, `SKILL.md`, or `.agents/skills` regression instructions were present. I checked the prior batch report, shared route regression, current recipe methods and the relevant batch tests before choosing candidates.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Fabada Asturiana (`fabada-asturiana`) | The 165-minute cook estimate did not cover the listed 20-minute heat-up, 105-minute pork braise, 25–30-minute sausage simmer and 30-minute rest; reducing a thin broth could add 5–10 minutes. The pork and sausage endpoints were qualitative. | Retain four servings and the parallel eight-hour bean and cured-pork soaks. Set prep/cook/total estimates to 500/190/690 minutes. Check the thickest pork piece for 71°C / 160°F and tenderness, continuing in 10-minute increments if needed. For sausage labelled raw, check 71°C / 160°F and continue in five-minute increments; reheat fully cooked sausage according to its package. Divide beans, broth and meat evenly among four bowls. |
| Toronto Peameal Bacon Sandwich (`peameal-bacon-sandwich`) | Four rolls served 600 g of pork, but the method did not define the number or weight of slices and relied on “hot through” for a 12 mm cured pork loin slice. | Define four 150 g slices, one per sandwich. Keep the three-minute-per-side estimate as a guide, check each slice from the side for Health Canada's 71°C / 160°F pork endpoint, continue in 30-second increments if needed, then rest for three minutes. |
| Taiwanese Dan Bing (`dan-bing`) | The 30 ml oil entry exceeded the four measured uses (4 ml for each crepe and 3 ml for each egg layer = 28 ml). The brief egg cook had no thermometer endpoint. | Correct the listed oil to 28 ml; specify two eggs and 90 ml batter per serving. Check the thickest egg layer for 71°C / 160°F with no liquid egg, adding 15-second cooking increments before rolling. Each serving remains one crepe cut into six pieces. |
| Kartoffelpuffer (`kartoffelpuffer`) | Twelve pancakes were yielded, but their egg-containing centres were judged by colour and time alone. | Keep four servings of three pancakes each and the eight-millimetre thickness. Check the thickest pancake in each batch for 71°C / 160°F; if needed, lower the heat and cook in 30-second increments so the exterior does not burn before the centre is ready. |

The 500-minute Fabada prep estimate includes the eight-hour soaks and estimated active preparation. Its cook-time estimate is an editorial midpoint for the timed method (approximately 185–195 minutes including the optional reduction); portions, slice weights and all recipe timing estimates are editorial, not source-verified measurements. Existing dish references support identity and general preparation, not these exact amounts or times.

## References

Recipe references already attached to the recipe data: [Spain.info — Fabada](https://www.spain.info/en/recipe/fabada/); [Saveur — Fabada Asturiana](https://www.saveur.com/story/recipes/fabada-asturiana-white-beans-with-ham-saffron-sausages/); [Foodland Ontario — Peameal Bacon Sandwich](https://www.ontario.ca/foodland/recipes/peameal-bacon-sandwich-0); [LCBO — Peameal Bacon on a Bun](https://www.lcbo.com/en/recipe/peameal-bacon-on-a-bun/201104030); [Cooking in Chinglish — Dan Bing](https://cookinginchinglish.com/dan-bing/); [My Formosa Food — Dan Bing](https://myformosafood.com/taiwanese/dan-bing/); [The Daring Gourmet — Kartoffelpuffer](https://www.daringgourmet.com/traditional-kartoffelpuffer-reibekuchen-german-potato-pancakes/); [REWE — Kartoffelpuffer](https://www.rewe.de/rezepte/kartoffelpuffer-selber-machen/).

Official safety guidance is labelled separately in each affected recipe: [Health Canada — Safe Cooking Temperatures](https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html) gives 71°C / 160°F for pork cuts and ground pork, including sausage, and explains thermometer placement; [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety) gives 160°F / 71°C for egg dishes.

## Translation and review

Traditional Chinese, Japanese, Korean and Thai changes were self-reviewed in this same model pass. This is not independent or human review. The execution environment does not expose a verifiable model selector, so GPT-6 Luna cannot be confirmed and no model-specific attribution is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 148 unique recipe IDs for shared five-locale detail-route checks. The new [thirty-seventh batch regression](../../test/recipe-method-thirty-seventh.test.mjs) checks the 353-recipe registry, all 18 unchanged exclusions, coverage uniqueness, servings, ingredients and allocations, explicit times and rests, localized safety endpoints, and separately labelled official sources. Current shared-coverage assertions in earlier batch tests were advanced to retain the enlarged list.

Verification on 2026-10-12: all 20 language draft audits passed; `npm test` passed the static audit and 164/164 Node tests; a separate `npm run build` generated 1,885 indexable URLs across five locales; the shared regression plus batch-37 tests passed 60/60; and `git diff --check` passed. The recipe UI was not opened and no preview server or browser/CDP check was run. No recipe was cooked.

## Changed paths

- Recipe methods and official-source labels: `src/canadian-recipes-c.mjs`, `src/german-recipes-c.mjs`, `src/spanish-recipes-c.mjs`, and `src/taiwanese-recipes-b.mjs`.
- Shared route coverage, batch regression and current shared-count assertions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-seventh.test.mjs`, and existing recipe-method batch tests.
- This audit report.
