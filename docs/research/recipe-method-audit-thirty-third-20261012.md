# Recipe method audit — thirty-third batch (2026-10-12)

## Coverage

Audit base and intended parent: `13930a645a085b79d60c8328ffb1b1312b581863`. Work branch: `codex/recipe-methods-thirty-third-20261012`.

The recipe registry remains at 353 existing recipes. Shared five-locale method regression grows from 128 to 132 unique IDs. With the same 18 standing exclusions, 203 of the 335 eligible recipes remain for later review. The four additions are existing recipes; no recipe or date was added, no excluded recipe was edited, and no `localdrafts` file or common helper was changed.

No repository `AGENTS.md` or `.agents/skills` guidance was present. I read the shared route regression list, the preceding available batch report (batch 32), and the relevant batch tests. The specified source branch was absent on GitHub at the start of the work; local changes were based directly on the requested base commit.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Iraqi lamb kofta (`iraqi-lamb-kofta`) | The grill time and colour cue did not establish a safe centre; eight skewers were not allocated across four diners. | Keep 800 g lamb and four servings. Divide into eight 100 g kofta, about 2.5 cm thick; grill for 8–10 minutes, turning every 2–3 minutes. Probe the thickest piece away from the skewer to 71°C / 160°F; return and recheck in 2-minute increments, then rest 3 minutes. Serve two per plate and keep raw-contact tools separate. Existing time fields remain 35/15/50 minutes. |
| Currywurst (`currywurst`) | Sauce timing and sausage browning were not clearly sequenced or overlapped; “hot through” did not give a safe sausage endpoint; the four plates were not measured. | Simmer the sauce for 20 minutes while browning eight 100 g sausages for 8–10 minutes. Verify fresh pork or beef sausage at 71°C / 160°F and poultry or reheated cooked sausage at 74°C / 165°F, with 2-minute rechecks. Keep four servings; serve two sausages each. Allocate 20 g curry powder to the sauce and the last 10 g across plates; allocate salt as 3 g with onions, 3 g in sauce, and 2 g across plates. Existing time fields remain 15/35/50 minutes. |
| Feijão tropeiro (`feijao-tropeiro`) | “Softly set” eggs could remain runny; the listed salt did not have a complete allocation; servings and egg-dish handling were unspecified. | Cook all four eggs until no liquid egg remains and the curds reach 71°C / 160°F; recheck in 30-second increments. Allocate salt as 2 g with eggs, 4 g with beans, and reserve the last 2 g for tasting. Divide into six portions and refrigerate leftovers within two hours. Existing time fields remain 20/35/55 minutes. |
| Vatapá (`vatapa`) | Three desalting boils had no water measure and already took the entire listed cook estimate; shrimp had only a visual cue; rice and servings were not allocated. | Add 6 L cold water as three 2 L changes. Estimate about 10 minutes to bring each change to a boil, then boil for 20 minutes: 60 minutes timed boiling plus about 30 minutes heat-up. Keep the 16-minute aromatic stage, 30-minute sauce simmer, up to 5 minutes for shrimp, and 5-minute rest. Probe the thickest shrimp to 63°C / 145°F and recheck in 1-minute increments; season only after tasting. Divide 600 g cooked rice among six bowls (100 g each), plus all stew evenly. Ingredient-weight arithmetic is about 50 g cod before desalting and 58 g raw shrimp per serving. Set prep/cook/total to 45/146/191 minutes; servings remain six. |

Timing estimates, portions and ingredient-weight arithmetic are editorial calculations for this version, not values verified by the dish references. The 30-minute vatapá heat-up allowance is approximate and will vary with equipment and starting water temperature. The stated 50 g cod estimate uses its pre-desalting weight; its cooked/desalted weight changes.

## Recipe references

- Iraqi lamb kofta: [The Mediterranean Dish — Kofta Kebabs](https://www.themediterraneandish.com/kofta-kebab-recipe/) and [BBC Good Food Middle East — Iraqi Lamb Kofta Kebabs](https://www.bbcgoodfoodme.com/recipes/iraqi-lamb-kofta-kebabs/).
- Currywurst: [Kitchen Stories — Currywurst](https://www.kitchenstories.com/en/recipes/currywurst-berlin-style-bratwurst-with-curry-sauce) and [REWE — Currywurst](https://www.rewe.de/rezepte/currywurst/).
- Feijão tropeiro: [Ana Maria Braga — Feijão-tropeiro simples](https://anamariabraga.globo.com/receita/feijao-tropeiro/) and [Receitas Nestlé — Feijão Tropeiro Tradicional](https://www.receitasnestle.com.br/receitas/feijao-tropeiro).
- Vatapá: [Saveur — Brazilian Shrimp Stew (Vatapá)](https://www.saveur.com/article/Recipes/Classic-Brazilian-Shrimp-Stew/) and [Receitas Globo — Vatapá](https://receitas.globo.com/tipos-de-prato/acompanhamentos/vatapa-531a4c174d38854b79000043.ghtml).

The dish references support dish identity and general preparation only. They are not presented as evidence for this site's exact amounts, times or servings.

## Official food-safety guidance

Official guidance is labelled separately from dish references in the recipe data:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): ground meat at 71°C / 160°F; poultry at 74°C / 165°F; egg dishes at 71°C / 160°F.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): scrambled eggs should not be runny; refrigerate cooked egg dishes within two hours.
- [FDA — Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely): cook seafood to 63°C / 145°F; shrimp should be pearly and opaque.

## Translation and review

Traditional Chinese, Japanese, Korean and Thai text was translated and self-reviewed in a single-model pass. This was not an independent translation or human review. The requested GPT-6 Luna identity could not be selected or verified from this execution environment, so no model attribution is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now covers 132 unique recipes across all five locales, including the four IDs above. The [thirty-third batch tests](../../test/recipe-method-thirty-third.test.mjs) check the 353-recipe registry, all 18 standing exclusions, localized methods and ingredients, exact portions, timing arithmetic and labelled official sources. Current-route-count assertions in batch 22–32 tests were updated to retain their historical checks against the expanded shared list.

Verification on 2026-10-12: all 20 cuisine draft audits passed; `npm test` passed the build, static audit and 144/144 Node tests. A separate `npm run build` also passed and generated 1,885 indexable URLs across five locales. `git diff --check` passed. No common helper changed, so helper-wide compatibility behavior was untouched. The recipes were not cooked; no browser/UI check, local preview server, deployment or production validation was performed.

## Changed paths

- Recipe methods and official-source labels: `src/middle-eastern-recipes-b.mjs`, `src/german-recipes-a.mjs`, `src/brazilian-recipes-c.mjs`, `src/brazilian-recipes-b.mjs`.
- Shared route coverage and batch regression: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-third.test.mjs`, and current shared-count assertions in the batch 22–32 tests.
- This batch report: `docs/research/recipe-method-audit-thirty-third-20261012.md`.
