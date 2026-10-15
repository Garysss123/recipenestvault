# Recipe method reimplementation — batch 3

Created `codex/recipe-rebuild-next-20261015` from `070889dbdae20cf0c38db08d2b9fedc81218345d`, the verified tip of `codex/recipe-methods-rebuild-18-20261014`. This is a new method rewrite; no unavailable handoff patch is represented as recovered. The 2026-10-14 coverage snapshot remains unchanged. The new 2026-10-15 ledger records 347 of 353 recipes reviewed, 12 reimplemented methods, 6 remaining exclusions, and no unclassified recipe IDs.

| Recipe | Servings | Steps | Prep / cook / total (minutes) |
| --- | ---: | ---: | ---: |
| Mapo tofu | 3 | 8 | 20 / 15 / 35 |
| Masala dosa | 8 | 9 | 1,130 / 65 / 1,195 |
| Nanaimo bars | 16 | 7 | 150 / 15 / 165 |
| New York cheesecake | 12 | 12 | 550 / 150 / 700 |

All five locales have complete step titles, instructions, tips, failure recovery, and storage guidance. The original serving counts, ingredient amounts, step counts, and illustration scenes remain. Masala dosa's previous step already called for 60 ml of water in the potato filling without listing it as an ingredient; the 60 ml was added as a separate ingredient row, and all previous rows were preserved. The dosa time estimate includes a midpoint 5.5-hour refrigerated soak and 13-hour fermentation; potato preparation overlaps fermentation.

## Safety and method evidence

- Mapo tofu identifies ground pork and checks several points for 71°C / 160°F with a thermometer, matching the [FoodSafety.gov safe-temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures). Its leftover guidance cites the same chart for reheating to 74°C / 165°F and [FoodSafety.gov's handling guidance](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) for prompt refrigeration.
- The [BCCDC fermented-food guideline for dosa and idli](https://www.bccdc.ca/resource-gallery/Documents/Educational%20Materials/EH/FPS/Food/Fermented/Fermented%20Foods%20Guideline%20-%203.4%20Dosa%20and%20Idli.pdf) says to soak rice and black gram at 4°C or below (room-temperature soaking is limited to four hours), ferment near 30°C for 12–14 hours until roughly doubled and visibly bubbly, refrigerate batter at 4°C or below, and cook dosa/idli to 74°C for at least 15 seconds. The method uses refrigerated soaking for its longer soak and gives batter five refrigerated days, the conservative end of that guideline's 5–7 day range. The [UK student food-safety guide](https://www.gov.uk/government/publications/student-guide-to-food-safety-and-hygiene/student-guide-to-food-safety-and-hygiene) supports the 48-hour cooked-leftover window.
- For the egg-containing Nanaimo base and cheesecake, the [FDA egg-safety guidance](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety) supports a 71°C / 160°F egg-dish endpoint, refrigeration within two hours, and a 3–4 day refrigerated window. The cheesecake also links the [FoodSafety.gov temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures). Wobble and rise cues are described as texture checks and do not replace thermometry.

The recipe sources remain distinct from official safety references. No pH value was applied to home dosa batter: BCCDC's pH ≤4.6 check is specifically for commercial packaging.

## Verification

- Focused regression: `node --test test/recipe-method-eighty-seventh.test.mjs` — passed.
- Full project test: `npm test` — passed, 406 tests; includes all cuisine draft audits, build, static audit, and Node tests.
- Separate build: `npm run build` — passed, 1,885 indexable URLs across five locales.
- Whitespace: `git diff --check` — passed.
