# Recipe method audit — twenty-eighth batch (2026-10-12)

## Coverage

Audit base: `f37c7e2de8a442b4cbebabc94382abc35db3edc0` on `codex/recipe-methods-twenty-seventh-20261012`. The work is prepared on `codex/recipe-methods-twenty-eighth-20261012`.

The published registry remains at 353 recipes. Shared deep-review coverage grows from 108 to 112 unique existing recipes. The same 18 recipes remain excluded: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. Eligible unreviewed coverage moves from 227 to 223. No recipe was added, no excluded recipe was edited, and no `localdrafts` content was changed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Sweet-and-sour pork (`sweet-sour-pork`) | Prep omitted the split between its refrigerated marinade and active work. Fry times could be read as doneness guarantees, and servings were not allocated. | Keep four servings and 500 g raw pork tenderloin. Set prep/cook/total to 45/30/75 minutes; explain in all five locales that prep includes a 30-minute chilled marinade and about 15 minutes of active work. Treat the 60–90-second refry as a guide, probe the centre of a large cube to 63°C / 145°F, continue in 30-second increments if needed, and rest at least three minutes before saucing. Divide into four portions, about 125 g raw-pork equivalent each. |
| Japanese gyoza (`japanese-gyoza`) | The prep and cook estimates did not account for the filling waits, two pan batches, and skillet recovery. The pork endpoint used the poultry temperature. | Keep four servings and 24 dumplings. Set prep/cook/total to 50/27/77 minutes; account for the 10-minute cabbage rest, 15-minute filling chill, about 25 minutes active prep, both cooking batches, and skillet recovery in all five locales. Check the largest dumpling through its side into the filling centre with a thin probe, avoiding the pan; ground pork must reach 71°C / 160°F, with covered one-minute rechecks if needed. Serve six dumplings per person and allocate 220 g raw pork as about 55 g per serving. |
| Beef Wellington (`beef-wellington`) | The estimate omitted cooling and chill waits, and the bake window and pastry colour could imply a doneness guarantee. Portions and the roast rest were not explicit. | Keep six servings. Set prep/cook/total to 150/55/205 minutes, accounting for overlapping duxelles preparation during the 15-minute beef rest, about 20 minutes to cool the mushrooms, and a 30-minute final chill with oven preheating during its last 15 minutes. Treat 35–40 minutes at 200°C as a guide; probe from an end into the beef centre to 63°C / 145°F and continue in three-minute increments if needed. Rest uncovered 15 minutes, exceeding the official three-minute whole-roast rest. Divide into six portions of about 150 g raw-beef equivalent each. |
| Fish and chips (`fish-and-chips`) | The method did not make the serving order and short holds clear. Fry times could be mistaken for the fish endpoint, and servings were not measured. | Keep four servings and set prep/cook/total to 30/50/80 minutes. While the potatoes soak, prepare a low oven and separate racks. First-fry the chips, hold uncovered briefly while the fish fries in two batches, then finish the chips after the fish; limit the first fish batch's low-oven hold to about 20 minutes. Treat 6–8 minutes as a guide and check the thickest fish portion with a food thermometer for 63°C / 145°F, or cook until fully opaque and easily separated with a fork. Divide into four plates, each with 180 g raw fish, about 300 g peeled raw potatoes, and 7.5 ml malt vinegar. |

All site-specific amounts, portion arithmetic, and prep/cook estimates are editorial adaptations. Recipe references support dish identity and general preparation methods only; they are not presented as the source of this site's exact ratios, quantities, servings, times, or temperatures. The 140°C, 185°C, and 190°C values in fish and chips describe frying oil, not food-safety endpoints.

## Recipe references

- Sweet-and-sour pork: [The Woks of Life — Sweet and Sour Pork: Restaurant Recipe](https://thewoksoflife.com/sweet-and-sour-pork/) and [Serious Eats — Chinese Sweet and Sour Pork Recipe](https://www.seriouseats.com/sweet-and-sour-pork-recipe). These support dish identity and general preparation technique.
- Japanese gyoza: [Just One Cookbook — Gyoza Recipe](https://www.justonecookbook.com/gyoza/) and [Kikkoman — Pan-Fried Potstickers Recipe](https://www.kikkoman.com/en/cookbook/recipe/00001031.html). These support the pan-fried dumpling method and familiar accompaniments.
- Beef Wellington: [Gordon Ramsay — Beef Wellington](https://www.gordonramsay.com/gr/recipes/beef-wellington) and [Great British Chefs — Beef Wellington](https://www.greatbritishchefs.com/recipes/beef-wellington-recipe). These support dish identity and general preparation technique.
- Fish and chips: [Great British Chefs — Fish and chips recipes](https://www.greatbritishchefs.com/collections/fish-and-chips-recipes) and [BBC Good Food — Classic fish & chips](https://www.bbcgoodfood.com/recipes/next-level-fish-chips). These support dish identity and general preparation technique.

## Official food-safety guidance

This source is separately labeled in the recipe data and is distinct from the dish references above:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole beef and pork cuts at 63°C / 145°F followed by a three-minute rest; ground meat at 71°C / 160°F; fish at 63°C / 145°F or until opaque and easily separated with a fork.

## Translation and review

The modified English, Traditional Chinese, Japanese, Korean, and Thai methods were translated and self-reviewed in a single-model pass. This is not an independent translation or culinary review. No second-model, human, or professional-kitchen review is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 112 unique deep-reviewed IDs for shared recipe-detail route checks across all five locales. The [twenty-eighth batch test](../../test/recipe-method-twenty-eighth.test.mjs) covers the four existing IDs, unchanged 353-recipe registry, standing 18 exclusions, all-locale completeness, totals, portions, timing, step order, doneness checks, and separation of official safety guidance from recipe references. Historical batch coverage assertions were advanced from 108 to 112 while retaining the prior 108 IDs.

Verification on 2026-10-12: `npm test` passed, including repository audits, the build within the test script, and 119 Node tests (0 failed); a separate `npm run build` passed and generated 1,885 indexable URLs across five locales; `git diff --check` passed.

This is a source, translation, and automated regression review. The recipes were not cooked. Browser/UI inspection, deployment, and production validation were not performed.
