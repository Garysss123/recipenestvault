# Recipe method audit — twenty-first batch (2026-10-12)

## Coverage

Base commit: `5f603c9c766491382e4ba82b0464565d3b7b93cc` on `codex/recipe-methods-twenty-first-20261012`.

The registry remains at 353 existing recipes. Deep-review coverage grows from 80 to 84 recipes, leaving 251 eligible recipes after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. No recipe was added, no excluded recipe or `localdrafts` content was modified.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Kung Pao chicken (`kung-pao-chicken`) | The two cooking batches were not weighed, the finished three-serving split was implicit, and the thermometer instruction did not say to check the largest pieces. | Keep three servings and the 20/12/32 minute prep/cook/total estimate. State two roughly 250 g raw-chicken batches; measure the centre of the largest pieces in each and reach 74°C / 165°F. Divide the finished dish evenly; each share represents about 167 g raw chicken, 13 g scallion, and 17 g peanuts. The 25 ml oil remains allocated as 6 + 6 + 13 ml. |
| Twice-cooked pork (`twice-cooked-pork`) | The method applied the 71°C / 160°F ground-meat endpoint to one whole pork-belly piece, and the tenderness check did not say what to do when the meat needed longer. Three servings had no raw-pork split. | Keep three servings; adjust prep/cook/total to 20/50/70 minutes so the estimate includes the 10-minute off-heat rest. After about 30 minutes at a gentle simmer, check the thickest centre and continue in 5-minute increments until it reaches 63°C / 145°F and a chopstick enters with little resistance. Rest off heat for 10 minutes before slicing. Divide into three shares, each representing about 167 g raw pork, 20 g of each pepper, and 27 g garlic chives or leek. |
| Dan dan noodles (`dan-dan-noodles`) | The measured sauce and noodle water were allocated, but the noodle-water boil started late in the method and per-bowl noodle and pork amounts were not explicit. | Keep two servings and the 15/15/30 minute prep/cook/total estimate. Start heating the noodle water while measuring the divided sugar. Use a thermometer in the largest ground-pork clump and reach 71°C / 160°F. State per bowl: 120 g fresh noodles, about 75 g raw-pork equivalent, 15 g scallion, and 7.5 g peanuts; retain the existing 60 ml noodle-water and equal sauce split. |
| Tomato and egg stir-fry (`tomato-egg-stir-fry`) | The final egg curd was assigned the poultry endpoint of 74°C / 165°F. The early soft-set step did not say that the eggs still needed a final cook. Two servings lacked an explicit split. | Keep two servings and the 10/10/20 minute prep/cook/total estimate. Mark the first soft-set egg curds as unfinished, then finish the dish until no liquid egg remains and the thickest curd reaches 71°C / 160°F. Divide evenly: each plate represents about 250 g raw tomatoes and two large eggs. |

The site's quantities, timing estimates, process wording, and serving allocations are editorial adaptations. The recipe references below support dish identity, ingredient roles, and common method; they are not presented as the source of this site's numbers or safety endpoints.

## Recipe references

- Kung Pao chicken: [The Woks of Life — Kung Pao Chicken](https://thewoksoflife.com/kung-pao-chicken/) and [China Sichuan Food — Kung Pao Chicken](https://www.chinasichuanfood.com/kung-pao-chicken/). These support the Sichuan-style chicken, dried chiles, Sichuan peppercorns, peanuts, and prepared sauce method.
- Twice-cooked pork: [The Woks of Life — Twice Cooked Pork](https://thewoksoflife.com/twice-cooked-pork/) and [China Sichuan Food — Twice Cooked Pork](https://www.chinasichuanfood.com/twice-cooked-pork-recipe/). These support the pork-belly simmer, slicing, and second wok-cook sequence, with regional variation in vegetables and seasonings.
- Dan dan noodles: [The Woks of Life — Dan Dan Noodles](https://thewoksoflife.com/dan-dan-noodles/) and [China Sichuan Food — Dan Dan Noodles](https://www.chinasichuanfood.com/dan-dan-noodles/). These support the Sichuan noodle, sesame, chile, preserved-green, and pork-topping context.
- Tomato and egg stir-fry: [The Woks of Life — Chinese Tomato Egg Stir-Fry](https://thewoksoflife.com/stir-fried-tomato-and-egg/) and [China Sichuan Food — Chinese Tomato and Egg Stir Fry](https://www.chinasichuanfood.com/chinese-tomato-and-egg-stir-fry/). These support the Chinese home-style combination and the sequence of softly setting eggs before returning them to the tomatoes.

## Official food-safety guidance

These official safety sources are kept separate from the dish references:

- [FoodSafety.gov — Cook to a Safe Minimum Internal Temperature](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): poultry to 74°C / 165°F; ground meat to 71°C / 160°F; whole pork cuts to 63°C / 145°F followed by a 3-minute rest; egg dishes to 71°C / 160°F. The four methods use the row appropriate to each food.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): safe storage and handling, and cooking egg dishes thoroughly. The tomato-egg method no longer borrows a poultry temperature and does not serve the briefly set first-stage eggs.

## Translation and review

Method text was prepared in English, Traditional Chinese, Japanese, Korean, and Thai with the same quantities, timing, ordering, and safety facts. One-model self-translation/self-review is not independent review. No external translation API was used.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 84 unique deep-reviewed IDs for the all-recipe detail-route regression across all five locales. The new [twenty-first-batch tests](../../test/recipe-method-twenty-first.test.mjs) cover the four existing IDs, the unchanged 353-recipe registry, the inherited 18 exclusions, all five locales, portion arithmetic, time arithmetic, order, appropriate safety endpoints, and source attribution.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
