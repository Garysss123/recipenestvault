# Recipe method audit — twenty-third batch (2026-10-12)

## Coverage

Base commit: `0aadf247aee6f4b575ff515cf32c87cdf2937612` on `codex/recipe-methods-twenty-third-20261012`.

The registry remains at 353 existing recipes. The shared deep-review list grows from 88 to 92 unique recipes, leaving 243 eligible after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Korean steamed eggs (`gyeran-jjim`) | The shared three-serving pot did not say how to divide egg, stock, or garnish per person. Its egg custard used the 74°C poultry endpoint. | Keep 3 servings and 10/16/26-minute prep/cook/total estimates. State that the pot uses 6 eggs and 300 ml stock, or 2 eggs and 100 ml stock per serving before cooking. Divide garnish as about 10 g scallions and 1.3 g sesame per serving. Cook covered 4–6 minutes, then check for no liquid egg and 71°C / 160°F, continuing in 1-minute increments. |
| Omurice (`omurice`) | Two plates had no explicit rice, chicken, onion, egg, or sauce allocation. The omelette used the poultry endpoint even though chicken and eggs require separate checks. Chilled rice warming order was unclear. | Keep 2 servings and 15/25/40-minute estimates. Divide 360 g cooked rice into two 180 g shares; use 90 g raw chicken, 60 g onion, and 100 g egg per plate, plus 30 g rice ketchup, 5 ml Worcestershire sauce, and 7.5 g finishing ketchup. Keep chicken at 74°C / 165°F; cook each fully set egg sheet to 71°C / 160°F with no liquid egg. Keep chilled rice refrigerated until it is reheated until steaming immediately before folding into the chicken. |
| Grilled pork belly wraps (`samgyeopsal`) | Four servings lacked a raw-pork and side allocation. The method assigned 71°C / 160°F, the ground-meat endpoint, to whole-cut pork; the 20-minute cook estimate did not account for uncrowded batches and resting. | Set cook/total to 30/50 minutes. Divide 800 g raw pork into four 200 g portions; allocate 60 g lettuce, 15 g ssamjang, 7.5 g each garlic and chile, one 5 ml sesame-oil dipping dish, and measured salt, pepper, and sesame per person. Grill in uncrowded batches; use a thin-tip thermometer from the side to check 63°C / 145°F, rest each cooked batch 3 minutes, and extend in 1-minute increments when needed. |
| Wonton soup (`wonton-soup`) | The method claimed an exact 12 g filling portion even though the measured filling totals about 573 g, or 11.9375 g per wrapper. Four bowls lacked explicit broth and garnish shares. Mixed pork-shrimp filling used 74°C / 165°F without identifying the controlling ingredient. The cooking estimate was short for the staged method. | Set cook/total to 25/85 minutes. Divide filling across 48 wrappers at about 11.9 g each; cook 16 per batch for 3–5 minutes, then check the thickest wonton for floating/translucent wrapper, ground pork at 71°C / 160°F, and firm opaque shrimp. Continue in 1-minute increments if needed. Serve four bowls with 12 wontons, 375 ml broth, and 5 g scallion each; each filling portion represents about 56 g raw pork and 56 g raw shrimp. |

The site's ingredient amounts, portion math, and time estimates are editorial adaptations. The recipe references support dish identity and common method; they are not presented as the source of this site's exact quantities, ratios, timings, or serving allocations.

## Recipe references

- Gyeran-jjim: [Maangchi — Ttukbaegi gyeranjjim](https://www.maangchi.com/recipe/ttukbaegi-gyeranjjim) and [Korean Bapsang — Gyeranjjim](https://www.koreanbapsang.com/gyeranjjim-korean-steamed-eggs/). These support the Korean steamed egg custard and earthenware-pot method.
- Omurice: [Just One Cookbook — Omurice](https://www.justonecookbook.com/omurice-japanese-omelette-rice/) and [JETRO Taste of Japan — Omurice](https://japan-food.jetro.go.jp/en/recipe/125.html). These support the seasoned chicken rice and omelette form.
- Samgyeopsal: [Maangchi — Samgyeopsal-gui](https://www.maangchi.com/recipe/samgyeopsal-gui) and [Korean Bapsang — Samgyupsal-gui](https://www.koreanbapsang.com/samgyupsal-gui-grilled-pork-belly-and/). These support un-marinated grilled pork belly, table sharing, and lettuce wraps.
- Wonton soup: [The Woks of Life — Simple Wonton Soup](https://thewoksoflife.com/wonton-soup-recipe/) and [Omnivore's Cookbook — Wonton Soup](https://omnivorescookbook.com/wonton-soup/). These support filled wontons served in broth and common pork, shrimp, ginger, and scallion filling.

## Official food-safety guidance

These official sources are listed separately from dish references:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): egg dishes and ground meats to 71°C / 160°F; pork steaks, roasts, and chops to 63°C / 145°F followed by a 3-minute rest; poultry to 74°C / 165°F. Each edited method uses the relevant endpoint for its ingredient.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): egg dishes to 160°F / 71°C; leftovers are a distinct 165°F / 74°C reheating case.
- [FDA — Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely): shrimp should be firm and opaque.
- [USDA FSIS — Correct Food Thermometer Placement](https://www.fsis.usda.gov/news-events/news-press-releases/do-you-know-correct-place-insert-your-food-thermometer): for thin foods, insert a suitable probe from the side to reach the center.

## Translation and review

Method text was prepared in English, Traditional Chinese, Japanese, Korean, and Thai. The five versions were self-translated and self-reviewed in one model pass; this is not independent translation review. No second model or external translation API was used. The execution environment did not expose a model selector or model ID, so this report does not claim that the pass was specifically routed to GPT-6 Luna.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 92 unique deep-reviewed IDs for recipe-detail route checks across all five locales. The new [twenty-third-batch tests](../../test/recipe-method-twenty-third.test.mjs) cover the four existing IDs, the unchanged 353-recipe registry, the standing 18 exclusions, five-locale completeness, portion arithmetic, time arithmetic, doneness endpoints, and official source attribution.

Validation passed: `npm test` completed all 20 cuisine draft audits, the static audit (10,816 files and 1,885 indexable routes), and 94/94 Node tests. A separate `npm run build` completed with 1,885 indexable URLs, and `git diff --check` passed.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
