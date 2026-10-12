# Recipe method audit — twenty-fourth batch (2026-10-12)

## Coverage

Base commit: `3e4195254edb1a8de5452f72f10f6e226a00ef53` on `codex/recipe-methods-twenty-fourth-20261012`.

The registry remains at 353 existing recipes. The shared deep-review list grows from 92 to 96 unique recipes, leaving 239 eligible after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Gyudon (`gyudon`) | Two bowls had no explicit per-bowl rice, beef, onion, or broth allocation. The 71°C ground-meat endpoint was applied to whole-cut beef, and the rest did not match the official whole-cut beef guidance. Cooked-rice timing was not distinguished from starting with dry rice. | Keep 2 servings and 15/15/30-minute prep/cook/total estimates. Allocate 360 g cooked rice as 180 g per bowl, with each topping representing 150 g raw beef and 100 g onion. State the complete two-bowl broth measure and its per-bowl share. Start rice early; add rice-cooker time if starting dry. Check the thickest beef slice from the side at 63°C / 145°F, extend in 1-minute increments as needed, then rest the beef in the hot broth for 3 minutes. |
| Northern Chinese pork-and-cabbage jiaozi (`jiaozi`) | The prior 32-piece/15 g filling claim did not agree with the measured filling and wrappers. Dough rest and cabbage preparation were not sequenced together; batch checks and individual dipping-sauce portions were missing. The old pork endpoint used the poultry temperature. | Set prep/cook/total to 90/40/130 minutes and update the displayed yield to 48 dumplings (4 servings) in all five locales. Weigh and divide the completed filling into about 16–17 g portions, allowing for cabbage moisture. Prepare cabbage during the 30-minute dough rest. Boil three batches of 16 for 6–8 minutes, checking the largest dumpling in each batch for a 71°C / 160°F ground-pork centre and continuing in 1-minute increments if needed. Serve 12 per person with 11.25 ml vinegar and 3.75 ml chili oil. Keep the optional pan-fry endpoint consistent. |
| Classic layered tamagoyaki (`tamagoyaki`) | Four servings lacked a per-person share of the egg mixture and a cut count. The 74°C poultry endpoint was used for an egg dish, and the 10-minute cook estimate did not cover the stated rolling and final setting. | Keep 4 servings; set cook/total to 15/25 minutes. State each serving's share as 75 g egg, 7.5 ml dashi, 4.5 g sugar, 0.5 g salt, and 2.5 ml soy sauce. Check the thickest centre at 71°C / 160°F with no liquid egg, rest 3 minutes, then cut eight pieces and serve two per person. |
| Shio chicken yakitori (`yakitori`) | Four servings lacked an explicit raw-chicken and salt allocation. Skewer soaking and cold salting were sequential even though they can overlap; the cook estimate did not account for checking every skewer. | Keep 4 servings and set cook/total to 20/55 minutes. Divide 600 g raw chicken into eight 75 g piles, or two skewers/about 150 g per person; 6 g salt equals 1.5 g per person. Soak skewers for 30 minutes while preparing the chicken, and overlap its 10-minute refrigerated salt rest with the end of the soak. Check the thickest piece on every skewer for 74°C / 165°F, continuing in 1-minute increments as needed. |

The site's ingredient amounts, portion math, and time estimates are editorial adaptations. Recipe references support dish identity and common methods; they are not presented as sources for this site's exact quantities, ratios, timings, or serving allocations. Official food-safety references are listed separately and support only the relevant safety endpoints and thermometer placement. No unrelated temperature was added to a recipe.

## Recipe references

- Gyudon: [Just One Cookbook — Gyudon](https://www.justonecookbook.com/gyudon/) and [Kikkoman — Gyudon (Beef Bowl)](https://www.kikkoman.com/en/culture/foodforum/recipe/traditional-26-2.html). These support the simmered beef-and-onion rice-bowl form and common preparation sequence.
- Jiaozi: [The Woks of Life — The ONLY Dumpling Recipe You'll Ever Need](https://thewoksoflife.com/dumpling-recipe-youll-ever-need/) and [China Sichuan Food — Chinese Chive and Pork Dumplings (Jiaozi)](https://www.chinasichuanfood.com/how-to-make-dumplings/). These support hand-formed pork dumplings, boiled or pan-fried.
- Tamagoyaki: [Just One Cookbook — Classic Tamagoyaki](https://www.justonecookbook.com/tamagoyaki/) and [Japanese Cooking 101 — Tamagoyaki Recipe](https://www.japanesecooking101.com/tamagoyaki-recipe/). These support the layered rolled-omelette form.
- Yakitori: [Kikkoman — Yakitori](https://www.kikkoman.com/en/cookbook/recipe/00001155.html) and [Just One Cookbook — Yakitori](https://www.justonecookbook.com/yakitori/). These support grilled chicken skewers and the shio seasoning style.

## Official food-safety guidance

These official sources are separate from the dish references:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole-cut beef steaks/roasts/chops at 63°C / 145°F followed by a 3-minute rest; ground meat and egg dishes at 71°C / 160°F; poultry at 74°C / 165°F.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): egg dishes at 160°F / 71°C and separately, reheated egg dishes at 165°F / 74°C.
- [USDA FSIS — Correct Food Thermometer Placement](https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer): placement guidance for thin foods; the methods specify side insertion where applicable.

## Translation and review

The five-language method text (English, Traditional Chinese, Japanese, Korean, and Thai) was self-translated and self-reviewed in a single-model pass. No external translation API or second-model review was used. This is not an independent translation review.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 96 unique deep-reviewed IDs for recipe-detail route checks across all five locales. The new [twenty-fourth-batch tests](../../test/recipe-method-twenty-fourth.test.mjs) cover the four existing IDs, the unchanged 353-recipe registry, the standing 18 exclusions, five-locale completeness, allocation, timing, doneness, and separate safety-source labels. Historic shared-coverage assertions were advanced to 96; the prior batch IDs remain in the shared set.

Validation passed: `npm test` completed all 20 cuisine draft audits, the static audit (10,816 files and 1,885 indexable routes), and 99/99 Node tests. A separate `npm run build` completed with 1,885 indexable URLs, and `git diff --check` passed.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
