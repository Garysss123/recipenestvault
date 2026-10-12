# Recipe method audit — thirty-second batch (2026-10-12)

## Coverage

Audit base: `87df252a3cc2006d39a9b4dcf532b7a84caf90aa`; parent `02fa79a433381aaf9a308994b84675c108138935`. Work branch: `codex/recipe-methods-thirty-second-20261012`.

The registry remains at 353 existing recipes. Shared five-locale method regression grows from 124 to 128 unique IDs, leaving 207 of the 335 eligible recipes for later review after retaining the same 18 exclusions: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. The four selected IDs were absent from the base route list. No recipe was added, no excluded recipe was edited and no `localdrafts` file was changed.

No repository `AGENTS.md`, `.agents/skills` guidance or batch-31 report was present at the base. I read the shared route regression list, the preceding available batch report (batch 30), and the batch-31 test and diff before making changes.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Rogan josh (`rogan-josh`) | Braising time and skewer tenderness did not establish a measured safety endpoint or distinguish safe temperature from tenderness; servings were not allocated. | Keep 1 kg bone-in lamb and four servings. Probe the thickest meat away from bone to 63°C / 145°F, continue in 10-minute increments if needed, and separately braise until a skewer enters easily. Rest covered for 15 minutes. Allocate about 250 g raw bone-in equivalent per serving as an explicit editorial estimate from 1 kg divided by four. Set prep/cook/total to 20/175/195 minutes. |
| Toad in the hole (`toad-in-the-hole`) | The method had no internal temperature check for pork sausages and did not say how the eight sausages serve four people. | Check the centres of the two largest sausages to at least 71°C / 160°F; if either is short, bake another five minutes and recheck. State two sausages per serving. Set prep/cook/total to 35/55/90 minutes, with the 30-minute batter rest included in prep. |
| Calamares a la romana (`calamares-a-la-romana`) | Golden batter was the only doneness cue, and the flour, salt and squid were not allocated across the four fry batches. | Divide 700 g squid into four 175 g raw portions, labelled as an editorial allocation; use 7.5 g of the 30 g dusting flour per batch and reserve a pinch of the final 2 g salt for each finished batch. Fry at 175–185°C, check the thickest ring or tentacle base in every batch to 63°C / 145°F, and re-fry in 30-second increments if needed. Set prep/cook/total to 25/25/50 minutes. |
| Shiro wat (`shiro-wat`) | The onion, aromatics and tomato steps had no stage times; the 750 ml water was not cleanly allocated; the eight injera were not assigned to four servings. | Stage onion cooking for 8–10 minutes, garlic and ginger for 1–2, tomato for 6–8, slurry incorporation for 2–3, and simmer for 12–15. Mix 150 g shiro flour with 350 ml water, then incorporate the remaining 400 ml. Serve two injera per person. Set prep/cook/total to 10/40/50 minutes. |

Site-specific timing, batch allocation and portion arithmetic are editorial estimates or adaptations. Dish references support dish identity and general method only; they are not claimed as validation of this site's exact amounts, servings or timings.

## Recipe references

- Rogan josh: [Swasthi's Recipes — Rogan Josh](https://www.indianhealthyrecipes.com/rogan-josh/) and [NDTV Food — Kashmiri Rogan Josh](https://food.ndtv.com/recipe-kashmiri-rogan-josh-483488).
- Toad in the hole: [Great British Chefs — Toad in the hole](https://www.greatbritishchefs.com/recipes/toad-in-the-hole-recipe) and [BBC Three Counties Radio — Toad in the hole](https://downloads.bbc.co.uk/threecountiesradio/pdf/weekend_kitchen_240814.pdf).
- Calamares a la romana: [RTVE MasterChef — Calamares a la romana](https://www.rtve.es/television/20230525/receta-calamares-romana-masterchef/2447046.shtml) and [Directo al Paladar — Calamares a la romana de Joan Roca](https://www.directoalpaladar.com/recetas-de-pescados-y-mariscos/esta-receta-calamares-a-romana-joan-roca-sus-claves-queden-perfectos-video-incluido/amp).
- Shiro wat: [Delina — Ethiopian and Eritrean Shiro Wot](https://www.delinaonline.com/shiro-wot-recipe) and [All About Ethiopia — Shiro Wat Recipe](https://www.allaboutethiopia.com/2026/08/shiro-wat-recipe.html).

## Official food-safety guidance

Official guidance is labelled separately from dish references in recipe data:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole cuts of lamb at 63°C / 145°F followed by a three-minute rest; ground meat at 71°C / 160°F.
- [FDA — Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely): seafood temperature and handling guidance; the method uses the cited 63°C / 145°F seafood endpoint for squid.

## Translation and review

Traditional Chinese, Japanese, Korean and Thai method text was translated and self-reviewed in a single-model pass. It was not independently translated or human-reviewed. No culinary or professional-kitchen review is claimed. This execution environment did not expose a way to select or independently verify the specifically requested GPT-6 Luna model identity; the completed translation pass is reported without that model attribution.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now covers 128 unique recipes across all five locales, including the four IDs above. The [thirty-second batch tests](../../test/recipe-method-thirty-second.test.mjs) check existing IDs, the 353-recipe registry, all 18 exclusions, localized methods and ingredients, amounts and portions, times, and the official source labels. Prior batch tests that assert the current shared route count were updated to expect 128.

Verification on 2026-10-12: all 20 cuisine draft audits passed; `npm test` passed the build, static audit and 139/139 Node tests. A separate `npm run build` also passed and generated 1,885 indexable URLs across five locales. `git diff --check` passed. Route count remained 1,885. This is an editorial, translation and automated source regression review. The recipes were not cooked; browser/UI inspection, deployment and production validation were not performed.

## Changed paths

- Recipe data and official-source labels: `src/indian-recipes-e.mjs`, `src/indian-recipe-helpers.mjs`, `src/british-recipes-b.mjs`, `src/spanish-recipes-d.mjs`, `src/african-recipes-b.mjs`.
- Shared route coverage and regression: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-second.test.mjs`, and current route-count assertions in the batch 22–31 test files.
- Batch report: `docs/research/recipe-method-audit-thirty-second-20261012.md`.
