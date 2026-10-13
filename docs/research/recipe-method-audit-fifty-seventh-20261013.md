# Recipe method audit — fifty-seventh batch (2026-10-13)

## Coverage

Audit base and intended parent: `0755b15ca880435590c0412caa16a0240c1620f9` (`codex/recipe-methods-fifty-sixth-20261013`). Work branch: `codex/recipe-methods-fifty-seventh-20261013`.

The recipe registry remains at 353 existing recipes. Shared five-locale method coverage grows from 224 to 228 unique IDs. The same 18 standing exclusions remain unchanged; 107 of the 335 non-excluded recipes remain for later review. The four additions are existing, previously unreviewed eligible recipes. No recipe, source draft, photo, or illustration asset was added or replaced.

I read the repository README, existing research reports, shared route regression, the standing exclusion list, and the recent batch tests. No RecipeNestVault `AGENTS.md`, `.agents/skills`, or separate exact-slug ledger was present; the shared route regression list and batch tests form the reviewed-slug ledger.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Moo satay (`moo-satay`) | The estimate omitted the long marinade wait; the listed 800 g shoulder did not divide into the number of pieces implied by 24 skewers; marinade allocation and the safe use of marinade that touched raw pork were unclear. | Explain an approximate 72 strips at about 11 g each, three per skewer; reserve 40 ml clean marinade before adding pork and discard the used marinade. State that 4–8 hours of refrigerated marinating is included in elapsed prep, with 8 hours adding 4 hours to the estimate. Add a thermometer check for intact pork shoulder strips at 63°C / 145°F followed by a 3-minute rest. Keep searing time as a quality estimate, separate from the safety endpoint. Set prep/cook/total to 285/30/315 minutes for six servings. |
| Biscuits and gravy (`biscuits-and-gravy`) | Raw sausage did not clearly say pork or distinguish ground-pork safety from whole-cut meat; browning and cook time could be mistaken for a safe endpoint. The six biscuit and gravy portions were not allocated. | Specify 450 g raw pork breakfast sausage with casings removed; cook the ground pork to 71°C / 160°F and continue in short increments if needed. Allocate one biscuit and one-sixth of the gravy to each of six plates; clarify the flour and milk use. Set prep/cook/total to 25/35/60 minutes. Chill the gravy promptly and reheat it to 74°C / 165°F; keep biscuits separate for texture. |
| Sesame-oil chicken (`sesame-oil-chicken`) | The listed 40-minute cook estimate was shorter than the method's staged times; bone-in chicken had an endpoint but did not identify where to probe. A short rice-wine simmer was described as boiling off raw alcohol. | Set prep/cook/total to 15/50/65 minutes so the listed stages fit. Explain thermometer placement in the thickest meat near, but not touching, bone; check poultry at 74°C / 165°F and continue in 2-minute increments if needed. Describe the 5-minute wine simmer as softening its sharp aroma, not removing all alcohol. Add prompt refrigeration and 74°C / 165°F leftover reheating guidance. |
| Quiche Lorraine (`quiche-lorraine`) | The initial egg-dish endpoint was incorrectly set to 74°C / 165°F, conflating it with reheating leftovers; the bake estimate and texture cues were not clearly separated from safety. | Set the fresh quiche endpoint to 71°C / 160°F; present 35–45 minutes and a gentle-set centre as estimates/texture cues, then continue in 5-minute increments and recheck if below the safety endpoint. Cut six wedges. Store promptly and reheat leftovers to 74°C / 165°F, explicitly distinguishing both endpoints. |

Amounts, portion arithmetic, stage times, and texture guidance are editorial estimates unless identified below as a safety standard or a dish-reference technique. They are not claimed as exact source-verified values. All four recipes' method and storage fields were synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Existing step counts and each step's `imageScene` were preserved one-to-one.

## Recipe references

These references support dish identity and general cooking approach, not the precise amounts, timing, or portions added in this audit.

- Moo satay: [Hot Thai Kitchen — Satay and Peanut Sauce](https://hot-thai-kitchen.com/satay-and-peanut-sauce/) and [Thailand Foundation — Thai New Year Feast](https://thailandfoundation.or.th/thai-recipes-for-your-new-year-feast/).
- Biscuits and gravy: [Food Network — Biscuits and Gravy](https://www.foodnetwork.com/recipes/biscuits-and-gravy-7240319), [Food Network — Biscuits and Gravy](https://www.foodnetwork.com/recipes/biscuits-and-gravy-17930129), and [Serious Eats — Biscuits and Gravy](https://www.seriouseats.com/biscuits-and-gravy-recipe-7369656).
- Sesame-oil chicken: [The Woks of Life — Taiwanese Sesame Oil Chicken Soup](https://thewoksoflife.com/taiwanese-sesame-oil-chicken-soup/) and [I Heart Umami — Sesame Oil Chicken Soup](https://iheartumami.com/sesame-oil-chicken-soup/).
- Quiche Lorraine: [Pardon Your French — Quiche Lorraine](https://www.pardonyourfrench.com/quiche-lorraine/) and [RecipeTin Eats — Quiche Lorraine](https://www.recipetineats.com/quiche-lorraine/).

## Official food-safety guidance

Official guidance is credited separately from dish references in recipe data and is applied to the matching food and situation:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): intact pork cuts such as shoulder use 63°C / 145°F and a 3-minute rest; ground pork sausage uses 71°C / 160°F; poultry uses 74°C / 165°F; egg dishes such as quiche use 71°C / 160°F. The recipe notes distinguish these initial cooking endpoints from the separate leftover standard.
- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): use a food thermometer; refrigerate perishables within 2 hours (within 1 hour above 32°C / 90°F); use shallow containers for prompt cooling; reheat leftovers to 74°C / 165°F.
- [FoodSafety.gov — Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): cooked meat and poultry leftovers are refrigerated 3–4 days.

The roast/strip endpoint is for intact pork rather than ground meat. The sausage endpoint is for ground pork. The chicken endpoint is for poultry. The quiche endpoint is for an egg dish. The 74°C / 165°F reheating direction applies to leftovers and is not substituted for a recipe's initial endpoint. Estimates and sensory/texture cues are labelled separately from these official safety standards.

## Translation and review

Traditional Chinese, Japanese, Korean, and Thai wording was translated and reviewed in a single-model pass. The actual self-review was performed by the same model that drafted the changes, so it is not independent editorial, culinary, or bilingual review. The execution environment reports Node.js v24.19.0; it does not expose a verifiable model-runtime variant, so that variant is recorded as unknown.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now covers 228 unique recipes across all five locales. The [fifty-seventh batch tests](../../test/recipe-method-fifty-seventh.test.mjs) cover the four additions, portions and timing, meat-specific endpoints, storage, source separation, and preserved illustration mapping. Existing batch assertions were updated to the expanded shared ledger while retaining their own historical recipe checks.

Verification on 2026-10-13: all 20 cuisine draft audits and the full `npm test` passed, including the static audit and 264 Node tests. A separate `npm run build` generated 1,885 indexable URLs across five locales. The shared route regression plus this batch file passed 60/60 tests. `git diff --check` passed. The food was not cooked; no headless browser, CDP, local preview server, UI check, deployment, or production validation was run.

## Changed paths

- Localized method refinements and source attribution: `src/recipe-method-audit-fifty-seventh.mjs`, registered in `src/recipes.mjs`.
- Shared route coverage and batch-specific regression: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-fifty-seventh.test.mjs`.
- Current-ledger count/history assertions: batch 22–56 method tests.
- This batch report: `docs/research/recipe-method-audit-fifty-seventh-20261013.md`.
