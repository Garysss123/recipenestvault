# Recipe method audit — thirty-eighth batch (2026-10-12)

## Coverage

Audit base and intended parent: `3356a218328d7bfd64282b1f9e66dfd3dd8b3029`. Work branch: `codex/recipe-methods-thirty-eighth-20261012`, created from `codex/recipe-methods-thirty-seventh-20261012` after fetch.

The recipe registry remains at 353 existing recipes. Shared five-locale detail-route coverage grows from 148 to 152 unique reviewed IDs. The same 18 standing exclusions remain unchanged; 183 recipes remain eligible for a later review. This batch edits four eligible existing recipes. No recipe or date was added, no excluded recipe was edited, and unrelated drafts were left untouched.

No repository `AGENTS.md`, `SKILL.md`, or `.agents/skills` regression instructions were present. I checked the prior batch report, the shared route regression, recipe methods, and batch tests before selecting candidates.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Moo Ping (`moo-ping`) | The prep estimate did not include the stated six-hour minimum refrigerated marinade. Pork doneness relied on the former 71°C endpoint without the whole-cut rest guidance. The method did not allocate skewers and rice among six servings. | Set prep/cook/total to 395/20/415 minutes (six-hour minimum marinade plus an editorial 35-minute prep estimate). Check every skewer at 63°C / 145°F, recheck in 30-second increments when needed, then rest for at least three minutes. Allocate four skewers and 100 g cooked sticky rice per serving. Apply the same pork endpoint and rest to the loin substitution. |
| Gai Yang (`gai-yang`) | The prep estimate omitted the stated eight-hour minimum refrigerated marinade, and the 45-minute cook estimate omitted the upper end of the timed grill stages plus the ten-minute rest. The method lacked a per-serving rice allocation. | Set prep/cook/total to 515/51/566 minutes (eight-hour minimum marinade plus an editorial 35-minute prep estimate; cook estimate includes the upper timed stages and rest). Verify both thigh and drumstick at 74°C / 165°F, with five-minute rechecks as needed. Allocate one leg quarter and 150 g cooked sticky rice to each of four servings. |
| Seafood scallion pancake (`haemul-pajeon`) | The listed 60 ml oil exceeded the three measured uses (15 + 10 + 25 = 50 ml). The seafood endpoint was set at 74°C rather than the FDA's 145°F (about 63°C) guidance. Two eight-piece pancakes lacked an explicit per-person allocation. | Correct the oil to 50 ml. Check the largest shrimp, squid, and mussel pieces in both pancakes at 63°C / 145°F, rechecking in 30-second increments. Allocate four of the 16 pieces to each of four servings. Keep the same endpoint in the shrimp substitution. |
| Tunisian Brik à l’Œuf (`brik-a-loeuf`) | The recipe specified room-temperature eggs, conflicting with safe refrigerated handling, and the soft-yolk option did not state the pasteurized-egg handling condition. The fully cooked option had no temperature endpoint. | Specify pasteurized shell eggs refrigerated until use. For fully set egg, check the thickest egg layer at 71°C / 160°F and continue in 15-second increments if needed; for a soft yolk, keep pasteurized eggs refrigerated until just before cracking. Allocate one brik to each of two servings. |

Timing estimates, the portions for these methods, and the additional allocations are editorial estimates, not timings or quantities attributed to cited recipe sources. Moo Ping prep is estimated from its six-hour minimum marinade plus 35 minutes of active preparation; Gai Yang prep uses its eight-hour minimum plus 35 minutes active. Gai Yang's 51-minute cook estimate uses the upper ends of the stated 20 + 15 + 4 + 2-minute grilling stages plus the 10-minute rest. Moo Ping's 20-minute cook estimate allows for the timed grilling, thermometer checks, and required rest. Existing dish references support the recipes' identity and general method, not these exact estimates or allocations.

## Safety references

Official safety sources are labelled separately from dish references in affected recipe data. [FoodSafety.gov's safe temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) specifies 145°F / 63°C plus a three-minute rest for whole pork cuts, 165°F / 74°C for poultry, and 160°F / 71°C for egg dishes. [FDA's seafood guidance](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) recommends cooking most seafood to 145°F. [FDA's egg safety guidance](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety) advises refrigeration and pasteurized eggs for dishes served raw or undercooked.

## Translation and review

The Traditional Chinese, Japanese, Korean, and Thai edits were self-reviewed in the same model pass. This is not independent or human review. This execution environment did not expose a verifiable model selector, so assignment to GPT-6 Luna cannot be confirmed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now lists 152 unique recipe IDs for shared five-locale detail-route checks. The new [thirty-eighth batch regression](../../test/recipe-method-thirty-eighth.test.mjs) checks the 353-recipe registry, unchanged 18 exclusions, coverage uniqueness, all five locales, times, portions, measured ingredient totals, localized doneness endpoints, and separately labelled official safety sources. Existing batch count assertions were advanced to match the shared coverage list.

Verification on 2026-10-12: all 20 language draft audits passed; `npm test` passed the static audit and 169/169 Node tests; a separate `npm run build` generated 1,885 indexable URLs across five locales; the shared route regression plus batch-38 tests passed 60/60; and `git diff --check` passed. No recipe was cooked. The recipe UI was not opened; no browser, preview server, or CDP check was run.

## Changed paths

- Recipe method and official-source labels: `src/thai-recipes-d.mjs`, `src/thai-recipe-helpers.mjs`, `src/korean-recipes-b1.mjs`, `src/korean-recipe-helpers.mjs`, and `src/mediterranean-recipes-b.mjs`.
- Shared route coverage and batch tests: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-eighth.test.mjs`, and existing recipe-method batch tests whose shared-coverage assertions needed advancing.
- This audit report.
