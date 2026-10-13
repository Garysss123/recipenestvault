# Recipe method audit — seventy-third batch (2026-10-13)

## Scope, instructions, and coverage

Base: `8e6990a527ea374c5e9b16eb0df56d897e2ff1e`, the head of `codex/recipe-methods-seventy-second-20261013`. Work branch: `codex/recipe-methods-seventy-third-20261013`, created from that exact commit.

I read `README.md`, `TODO.md`, the recent recipe-method audit reports, the exact-slug coverage ledger in `test/recipe-method-regressions.test.mjs`, and standing exclusions in `test/recipe-method-fiftieth.test.mjs`. No repository `AGENTS.md` or `.agents/skills/**/SKILL.md` was present. The project requires source-backed recipe details, consistency across five locales, preservation of source-draft methods and illustration integrity, and static validation.

The registry remains at 353 unique recipes. Exact-slug coverage increases from 288 to 292; 43 eligible unchecked recipes remain after the same 18 excluded slugs. The four selections were absent from the base ledger and the exclusion list. No excluded or completed recipe, source draft, ingredient row or amount, step count, illustration mapping, photo, registry entry, or route was changed. The publication copies are refined in `src/recipe-method-audit-seventy-third.mjs`; historical exact-coverage tests were advanced while retaining their original per-batch ID windows.

## Findings and changes

| Recipe | Unfinished issue found | Change in all five locales |
| --- | --- | --- |
| Gigantes plaki (`gigantes-plaki`) | Bean simmering relied on time alone before acidic tomato was added; the casserole had no safe center endpoint or rescue if its top browned first. Storage lacked prompt cooling and leftover reheating instructions. | Test three of the largest beans for a creamy center and continue in 10-minute increments before adding tomato. Allocate 270 ml of the listed 300 ml bean liquid to the sauce and hold back 30 ml; if the casserole dries, add 15 ml at a time. For the meatless casserole, check the center for 74°C / 165°F; cover loosely and bake in 5-minute increments if the top browns first. Cool in shallow containers within the 2-hour / 1-hour hot-weather limit, refrigerate at 4°C / 40°F or colder, and reheat servings to 74°C / 165°F. |
| Pão de queijo (`pao-de-queijo`) | Dough texture and baked centers had no measured correction; egg-containing buns did not have a center doneness check or appropriate refrigeration/reheating directions. | Reserve 15 ml of the listed water and 15 g of the listed starch for measured 5-unit dough corrections. Check the largest bun for 71°C / 160°F and a set, non-pasty center; bake in 3-minute increments and lower the oven if the tops brown first. Refrigerate within the official time limits and reheat to 74°C / 165°F. |
| Sticky toffee pudding (`sticky-toffee-pudding`) | Cake readiness relied on visual cues without an egg-dish endpoint or a recovery for a dark top; the sauce had no measured thinning correction, and storage was underspecified. | Check the center for 71°C / 160°F and moist crumbs without raw batter; extend in 3-minute increments and tent with foil if the top is already dark. Reserve 15 ml of the listed cream to loosen sauce in 5 ml increments. Cool and refrigerate promptly; reheat the portion being served to 74°C / 165°F. |
| Campfire bannock (`campfire-bannock`) | Instructions did not explicitly warn against tasting dough made with raw flour; exterior browning did not verify the thick center, with no lower-heat correction if it stayed gummy. | Do not taste raw dough. Shape rounds evenly to about 1.5 cm thick, cut the thickest first piece to check for set, dry crumb without a wet gummy stripe, and move to cooler embers/lower heat with 2-minute turns and extensions if the center lags. No meat or egg internal temperature is applied to flour-only bannock. |

The two existing culinary references per recipe remain distinct from official food-safety guidance.

## Recipe-method references checked

- [My Greek Dish — Gigantes Plaki](https://www.mygreekdish.com/recipe/gigantes-plaki-greek-baked-giant-beans/) and [Akis Petretzikis — Greek baked giant beans, Gigantes](https://akispetretzikis.com/en/recipe/3442/gigantes-foyrnoy): checked for soaking/cooking beans, tomato sauce, and baked giant beans.
- [King Arthur Baking — Brazilian Cheese Buns (Pão de Queijo)](https://www.kingarthurbaking.com/recipes/brazilian-cheese-buns-pao-de-queijo-recipe) and [Food Network — Pao de Queijo (Brazilian Cheese Bread)](https://www.foodnetwork.com/recipes/pao-de-queijo-brazilian-cheese-bread-3303576): checked for scalded tapioca dough, cheese, portioning, and bake method.
- [Great British Chefs — Sticky toffee pudding](https://www.greatbritishchefs.com/recipes/sticky-toffee-pudding) and [BBC Good Food — Ultimate sticky toffee pudding](https://www.bbcgoodfood.com/recipes/ultimate-sticky-toffee-pudding): checked for the sponge, date mixture, and toffee sauce method.
- [Parks Canada — Campfire Bannock](https://parks.canada.ca/culture/gourmand-gourmet/recette-recipe66) and [Ontario Parks — Less-Mess Bannock](https://www.ontarioparks.ca/ambassadors/campingessentials/campingrecipes/less-mess-bannock): checked as distinct documented bannock examples for flour dough and camp cooking. Bannock meanings and methods vary; this version remains explicitly based on one documented Parks Canada recipe.

## Food-safety sources checked

- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): egg-containing dishes are cooked thoroughly; egg dishes use a 71°C / 160°F endpoint, and cooked egg dishes may be refrigerated 3–4 days. Applied to the two egg-containing recipes only.
- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): the chart distinguishes egg dishes at 71°C / 160°F, meatless casseroles at 74°C / 165°F, and leftovers reheated to 74°C / 165°F. The casserole endpoint is applied to gigantes; leftover guidance is applied to cooked foods as appropriate.
- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): refrigerate perishables within two hours, within one hour above 32°C / 90°F; hold at or below 4°C / 40°F and cool leftovers in shallow containers. Applied to cooked beans/casserole and egg/dairy dishes.
- [FDA — Flour Is a Raw Food and Other Safety Facts](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts): flour is raw and must be cooked; the bannock instruction warns against tasting raw dough. No unsupported internal temperature was added to bannock.

Three-day use windows are identified as this recipe's texture/quality target, not as an official safety limit. Recipe-specific amounts and timed recovery steps remain the publication's method choices.

## Regression and validation

- `npm ci --cache /tmp/recipenestvault-npm-cache` — installed the lockfile dependencies; neither package manifest changed.
- `npm test` — passed all 20 `audit:*drafts` commands wired in `package.json`; `src/recipes.mjs` separately assembles 21 recipe source groups. The command count and source-group count describe different things. It built 1,885 indexable URLs across five locales, passed the 10,816-file static audit, and passed 354/354 Node tests.
- Independent `npm run build` — passed; generated 1,885 indexable URLs across five locales.
- Independent `npm run audit` — passed; checked 10,816 files and 1,885 routes, including links/fragments, five-language completeness, image and provenance gates, sitemap, metadata, and structured data.
- Focused regression `node --test test/recipe-method-regressions.test.mjs test/recipe-method-seventieth.test.mjs test/recipe-method-seventy-first.test.mjs test/recipe-method-seventy-second.test.mjs test/recipe-method-seventy-third.test.mjs` — passed 79/79 tests.
- `git diff --check` — passed.

This is source and automated regression review. No recipe was cooked or tasted; no independent human translation review, browser/UI review, accessibility review, production-domain check, deployment, or production verification was performed. No headless browser, CDP, local HTTP crawling, credential changes, or security-setting changes were used.

Read-only comparison of the batch base (`8e6990a`) and result (`37040d2`) found zero deleted files, including recipe drafts and tests.
