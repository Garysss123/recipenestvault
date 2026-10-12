# Recipe method audit — forty-eighth batch (2026-10-13)

## Scope and coverage

Base: exact commit `eb16b3664238ecfe4a2bba0017eb7a8b5331b5a2` on `codex/recipe-methods-forty-seventh-20261013`. Work branch: `codex/recipe-methods-forty-eighth-20261013`, created directly from that commit.

Compared every recipe slug against the shared five-locale deep-review list in `test/recipe-method-regressions.test.mjs` and the standing 18-slug exclusion list. `bossam`, `sole-meuniere`, `pani-puri`, and `banh-cuon` were absent from both the reviewed IDs and exclusions. Coverage now has 192 unique slugs (188 carried forward plus four). With 18 exclusions and 353 existing recipes, 143 eligible recipes remain. No recipe, route, or indexable-URL count was added or removed.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Bossam (`bossam`) | The method rinsed raw pork, gave 71°C for a whole pork cut, and combined a fixed simmer range with tenderness. Serving sides and storage were not fully allocated. | Do not rinse raw pork; clean hands and tools before handling cooked food. For the whole pork shoulder/belly block, check the thickest center at the official 63°C / 145°F and rest at least 3 minutes. The 50–60-minute simmer for 1.2 kg, 10-minute tenderness increments, and 80-minute cook field are recipe planning estimates; tenderness remains a separate skewer cue. Divide the raw-weight-equivalent batch into six portions and allocate napa, radish salad, and pine nuts per diner. Refrigerate in a shallow container within 2 hours at or below 4°C and reheat to 74°C. The 3-day pork and 2-day side limits are conservative recipe choices, not official periods. |
| Sole Meunière (`sole-meuniere`) | The fish check did not distinguish measured safety from a fish-specific visual cue, and the plate did not allocate the fish, beans, and sauce evenly. | Check thick flesh from the side while avoiding the central bone. Use 63°C / 145°F, or when there is no thermometer, cook until opaque and flakes easily. The 7–10-minute frying range and 25-minute cook field are estimates. Allocate one roughly 350 g raw whole-fish equivalent, 150 g beans, one lemon slice, and half the sauce to each diner. Chill leftovers in a shallow covered container within 2 hours at or below 4°C; reheat to 74°C. One day is a conservative recipe limit, not an official storage time. |
| Pani Puri (`pani-puri`) | Frying batches did not account for oil recovery; storage mentioned an unlisted desiccant; the yield and filling portions were unclear. | Let oil return to 190°C between 5–6-piece batches, then fry at 175–180°C until hollow, pale gold, and crisp. Cool shells fully and store airtight in a cool, dry place; the 5-day shell period is a quality estimate, not an official shelf life. The 75-minute prep, 35-minute cook, and 110-minute total are planning estimates that vary with rolling and oil recovery. Plan about 30 pieces, five per serving, with about 20 g filling, 8 g chutney, and 20–25 ml pani each. Keep filling, chutney, and pani in separate shallow covered containers and refrigerate within 2 hours at or below 4°C. The one-day limit for those perishable components is a conservative recipe choice. No meat-temperature check was added to this plant-based snack. |
| Bánh Cuốn (`banh-cuon`) | The sheet amount conflicted with the listed batter water; roll and accompaniment yields needed per-person amounts. | A 750 ml batter amount now portions to about 20 sheets at 35–40 ml each; cook each covered sheet 45–60 seconds until translucent with no wet batter. Cook ground pork to 71°C / 160°F. Divide about 20 rolls into five per serving and portion sausage, sprouts, cucumber, herbs, fried shallots, and sauce per plate. Refrigerate in a shallow covered container within 2 hours at or below 4°C; the 2-day limit is a conservative recipe choice, and reheat the filling to 74°C / 165°F. The 40-minute prep and 45-minute cook fields are recipe planning estimates. |

Food-safety values are attributed as official sources on the affected recipe cards, separately from the dish references. [FoodSafety.gov’s temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) gives whole pork cuts as 63°C / 145°F plus a 3-minute rest, ground pork as 71°C / 160°F, and leftovers as 74°C / 165°F. For fish, FoodSafety.gov and the [FDA seafood guidance](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) give 63°C / 145°F or the opaque/easily-flaked cue. [FoodSafety.gov’s 4 Steps](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) also advise not washing meat, refrigerating perishables within 2 hours, keeping refrigerators at or below 4°C, and cooling leftovers in shallow containers. The [cold-storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) was checked for the storage guidance. The shorter recipe-specific storage periods and cooking-duration estimates above are editorial choices, not official values.

## Translation and review

Method steps, portion allocations, storage instructions, and official-source distinctions are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. The self-review was performed by the same model and is not independent or human review. No verifiable runtime model identifier was exposed, so none is claimed.

## Verification and limits

- `npm ci --cache /tmp/recipenestvault-npm-cache` installed locked dependencies; package manifests and lockfile were unchanged.
- `npm test`: passed all 20 cuisine draft audits, the build and static audit (10,816 files; 1,885 indexable routes), and 219/219 Node tests.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-forty-eighth.test.mjs`: passed all 60 shared and batch checks.
- `git diff --check`: passed.

The recipes were not cooked. No full-page UI or visual acceptance was performed. No preview/local server, headless browser, CDP session, settings change, deployment, or production validation was used.

## Changed paths

- Four existing recipe cards and their food-safety source attribution: `src/korean-recipes-c2.mjs`, `src/korean-recipe-helpers.mjs`, `src/french-recipes-c.mjs`, `src/french-source-map.mjs`, `src/indian-recipes-d.mjs`, `src/indian-recipe-helpers.mjs`, and `src/vietnamese-recipes-b.mjs`.
- Shared 192-slug coverage, batch-specific checks, and carried-forward coverage assertions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-forty-eighth.test.mjs`, and the earlier `test/recipe-method-*.test.mjs` files whose cumulative counts were updated.
- This report: `docs/research/recipe-method-audit-forty-eighth-20261013.md`.
