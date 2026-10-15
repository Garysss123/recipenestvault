# Recipe method reimplementation — batch 4

Continued from 6cc550040145510bbf1068699958623491e1bc88 on codex/recipe-rebuild-next-20261015; its parent is the verified 070889dbdae20cf0c38db08d2b9fedc81218345d. This is fresh method writing from the recipe records, not recovery of an unavailable ZIP or handoff patch. No Library files were used.

The batch adds four methods to the dated ledger while preserving the original 353-recipe registry and the 2026-10-14 historical snapshot. The current ledger now records 351 reviewed recipes, 16 reimplemented methods, 2 exclusions, and no unclassified IDs.

| Recipe | Servings | Steps | Prep / cook / total (minutes) |
| --- | ---: | ---: | ---: |
| Pad Thai | 4 | 9 | 45 / 15 / 60 |
| Panna cotta | 6 | 5 | 335 / 10 / 345 |
| Pizza Margherita | 4 | 5 | 175 / 10 / 185 |
| Sauerbraten | 6 | 9 | 4,365 / 220 / 4,585 |

Each method has five-language titles, instructions, tips, failure recovery, and storage guidance. Tests compare every serving count and ingredient row against its existing source record, confirm each original step count and illustration stage, and ensure the published instructions were rewritten. Pad Thai cooks all listed bean sprouts in the wok and divides the measured sauce without inventing an unlisted yield. Panna cotta's elapsed estimate includes cooling and its five-hour minimum set. Pizza's estimate includes mixing, proofing, shaping, and both bakes; oven preheating overlaps dough fermentation. Sauerbraten's estimate includes the 72-hour refrigerated marinade, active preparation, braise, rest, and gravy.

## Food-safety evidence

- Pad Thai cites the [FDA seafood handling guide](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) for shrimp's firm, pearly, opaque doneness cue and seafood handling, plus the [FoodSafety.gov minimum-temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) for egg dishes at 71°C/160°F and leftovers at 74°C/165°F. The [FoodSafety.gov handling guide](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) supplies the two-hour refrigeration limit and refrigerator temperature.
- Panna cotta has no eggs in its ingredient record. Its dairy dessert is covered, refrigerated at 4°C/40°F or below, and returned to the refrigerator within two hours. The three-day use window is a conservative recipe recommendation; the official sources are the [FoodSafety.gov handling guide](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [cold-storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts).
- Pizza's [FoodSafety.gov cold-storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) lists pizza for 3–4 refrigerated days. The method uses the conservative three-day end, requires refrigeration within two hours at or below 4°C/40°F, and reheats leftovers to 74°C/165°F per the [minimum-temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures).
- Sauerbraten's beef stays covered in a non-reactive vessel at or below 4°C/40°F during its three-day marinade, following the [FoodSafety.gov handling guidance](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety). The [minimum-temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) gives whole beef roasts 63°C/145°F plus a three-minute rest; the method treats that as a minimum and braises further until fork-tender, then gives the roast a 20-minute rest. The reserved marinade is brought to a full boil before the covered braise.

## Verification

- Focused regressions: node --test test/recipe-method-eighty-seventh.test.mjs test/recipe-method-eighty-eighth.test.mjs — passed.
- Full project test: npm test — passed, 407 tests.
- Separate build: npm run build — passed, 1,885 indexable URLs across five locales.
- Whitespace: git diff --check HEAD — passed.
