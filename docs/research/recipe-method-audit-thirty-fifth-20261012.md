# Recipe method audit — thirty-fifth batch (2026-10-12)

## Coverage

Audit base and intended parent: `547f632e3b39bb3b9221a0557f9ce854ad9e0f09`. Work branch: `codex/recipe-methods-thirty-fifth-20261012`.

The registry remains at 353 existing recipes. Shared five-locale method coverage grows from 136 to 140 unique IDs. The same 18 standing exclusions remain unchanged; 195 of 335 non-excluded recipes remain for later review. These four additions are existing eligible recipes. No recipe or date was added, no excluded recipe was edited, and no local draft was touched.

No repository `AGENTS.md` or `.agents/skills` regression guidance was present. I reviewed the shared route regression list, the preceding batch report, relevant tests and the recipe/source data. The requested source branch was absent remotely at the start; the work branch was created directly from the requested base.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Taiwanese oil rice (`taiwanese-oil-rice`) | The 60-minute cook estimate omitted several timed stages; pork strips had no thermometer endpoint. | Keep 600 g rice and 300 g pork for eight servings. Prep/cook/total estimate is 390/85/475 minutes, counting the six-hour rice soak, 30-minute drain, timed cooking and covered rest. After steaming, check the thickest pork strip from the side with a thin-tip food thermometer for 63°C / 145°F; steam in two-minute increments and recheck if below target, then rest covered for 10 minutes. |
| Tunisian lablabi (`lablabi`) | The method said to cook dried chickpeas for 30 minutes despite requiring a creamy centre; prep time omitted the overnight soak. Optional soft-yolk eggs had no official safety reference. | For four bowls, soak 300 g dried chickpeas for at least eight hours, then simmer 60–90 minutes and continue in 10-minute increments until creamy through. Prep/cook/total estimate is 495/100/595 minutes, including the soak. Allocate the listed 60 ml olive oil as 15 ml per bowl; use one of the two lemons for juice and cut the other into wedges. Firm eggs are the default; use pasteurized eggs for soft yolks. |
| Cherry clafoutis (`clafoutis`) | The custard had no egg-dish safety endpoint, and the listed total omitted the 20-minute cooling/rest period. | For eight portions, bake at 190°C for 35–40 minutes and check the centre of the custard (away from fruit and dish) for 71°C / 160°F; continue in three-minute increments and recheck if needed. Rest 20 minutes before cutting. Prep/cook/total estimate is 20/60/80 minutes, with cook time including the bake and rest. |
| Beef stifado (`beef-stifado`) | Three separate beef-browning batches plus braising, sauce reduction and rest exceeded the 150-minute cook estimate; there was no thermometer endpoint. | Keep 1.5 kg beef chuck for six servings and allocate the 90 ml oil as 50 ml for beef and 40 ml for onions. The stated timed stages total an estimated 188–209 minutes; set prep/cook/total to 30/200/230 minutes. Check the thickest beef piece for 63°C / 145°F, continue in five-minute braise increments and recheck if needed, then rest 15 minutes before serving. |

Portions, exact ingredient amounts, allocation math and durations above are editorial estimates, not source-verified quantities or timings. The recipe references support dish identity and general preparation only. The safety endpoints come from official guidance, labelled separately in recipe data.

## Recipe references

- Taiwanese oil rice: [Cooking in Chinglish — Taiwanese Sticky Rice](https://cookinginchinglish.com/taiwanese-sticky-rice-you-fan/) and [The Seasoned Wok — Taiwanese Sticky Rice](https://www.theseasonedwok.com/taiwanese-sticky-rice-you-fan/).
- Lablabi: [The Mediterranean Dish — Lablabi, Tunisian Chickpea Stew](https://www.themediterraneandish.com/lablabi-tunisian-chickpea-stew/) and [Ottolenghi Recipes — Tunisian Spiced Chickpea and Bread Soup](https://ottolenghi.co.uk/pages/recipes/tunisian-spiced-chickpea-bread-soup-lablabi). The first reference uses canned chickpeas; neither is cited as validation for this version's dry-bean times.
- Clafoutis: [Pardon Your French — Cherry Clafoutis](https://www.pardonyourfrench.com/cherry-clafoutis/) and [Meilleur du Chef — Clafoutis aux cerises](https://www.meilleurduchef.com/fr/recette/clafoutis-cerise.html).
- Beef stifado: [My Greek Dish — Beef Stifado](https://www.mygreekdish.com/recipe/beef-stifado-mosharaki-stifado/) and [Akis Petretzikis — Pressure cooker Greek beef stew with shallots](https://akispetretzikis.com/en/recipe/9523/moschari-stifado-sth-chytra-tachythtas).

## Official food-safety guidance

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole-cut beef and pork (steaks, roasts, chops) to 63°C / 145°F, followed by a three-minute rest; egg dishes to 71°C / 160°F; raw eggs cooked until white and yolk are firm. The recipes provide longer covered/off-heat rests after the thermometer checks.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): eggs cooked until whites and yolks are firm; pasteurized shell eggs or egg products for recipes served raw or undercooked. This supports the optional soft-yolk lablabi instruction.

## Translation and review

Traditional Chinese, Japanese, Korean and Thai text was self-reviewed in a single-model pass. This was not independent or human review. GPT-6 Luna could not be selected or verified from this execution environment, so no model attribution is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now covers 140 unique recipes across all five locales, including these four IDs. The [thirty-fifth batch tests](../../test/recipe-method-thirty-fifth.test.mjs) check the 353-recipe registry, all 18 standing exclusions, portions, ingredient allocations, timing arithmetic, localized safety endpoints and official-source labels. Current shared-count assertions in the batch 22–34 tests were refreshed for the expanded list.

Verification on 2026-10-12: all 20 cuisine draft audits passed; `npm test` passed the build, static audit and all 154 Node tests. A separate `npm run build` generated 1,885 indexable URLs across five locales. The shared regression plus batch 35 tests passed 60/60, and `git diff --check` passed. The recipes were not cooked; no browser/UI check, preview server, deployment or production validation was performed.

## Changed paths

- Recipe methods and official-source labels: `src/taiwanese-recipes-e.mjs`, `src/taiwanese-recipe-helpers.mjs`, `src/mediterranean-recipes-b.mjs`, `src/french-recipes-e.mjs`, `src/greek-recipes-c.mjs`.
- Shared route coverage and batch regression: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-fifth.test.mjs`, and current shared-count assertions in the batch 22–34 test files.
- This batch report: `docs/research/recipe-method-audit-thirty-fifth-20261012.md`.
