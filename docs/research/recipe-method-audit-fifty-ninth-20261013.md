# Recipe method audit — batch 59

- Date: 2026-10-13
- Branch: `codex/recipe-methods-fifty-ninth-20261013`
- Exact base: `cad4af78a5979bb3952c8c5d16a9cfd09961adf9` from `codex/recipe-methods-fifty-eighth-20261013`

## Selection and coverage

The shared exact-slug ledger is `test/recipe-method-regressions.test.mjs`. Its 232 reviewed IDs, together with the 18 standing exclusions, left 103 selectable recipes in the 353-recipe catalog. This batch selected four IDs absent from that ledger and the exclusions:

- `green-curry-chicken`
- `boeuf-bourguignon`
- `boat-noodles`
- `takoyaki`

The shared ledger now contains 236 distinct reviewed IDs. The catalog remains at 353 recipes, the 18 exclusions are unchanged, and 99 eligible recipes remain. The independent static build still emits 1,885 indexable URLs across five locales.

## Method changes

Publication copies were revised in English, Traditional Chinese, Japanese, Korean, and Thai; source drafts remain unchanged. Each recipe retains its existing number of illustrated steps and every original `imageScene` mapping. Ingredient amounts are assigned to their actual stages or servings, timers begin at observable cues, and texture preferences are kept separate from safety endpoints.

- **Green curry chicken:** clarifies the simmer timer, checks the largest thigh piece at 74°C/165°F before adding vegetables, and labels the 8-minute stage as an estimate. It allocates the curry, 600 g cooked rice (150 g per bowl), or four listed roti across four servings. Storage separates rice, labels the three-day texture preference separately from the official 3–4 day cooked-leftover range, and reheats curry throughout to 74°C/165°F.
- **Boeuf bourguignon:** allocates divided salt, pepper, oil, butter, and braising liquid; starts the braise timer after the simmer returns; and counts the onion, mushroom, potato, and rest stages without double-counting concurrent work. The 4 cm intact beef cubes use fork tenderness as a texture cue; the method explicitly avoids transferring the ground-meat endpoint or a steak instruction to this braise. Four potato portions are about 150 g raw weight each. Leftover storage and reheating are covered separately.
- **Boat noodles:** reconciles noodles, sprouts, garlic oil, broth, and garnish quantities across eight bowls. Whole-shank guidance uses the intact-roast endpoint (63°C/145°F plus a three-minute rest), while cooked beef balls and the completed broth use the 74°C/165°F reheating endpoint; the 71°C/160°F raw-ground-meat endpoint is explicitly kept distinct. The blood mixture is refrigerated during setup and brought into the hot broth with continued stirring. Components cool separately; noodles and greens are stored apart.
- **Takoyaki:** divides 24 equal octopus pieces, two batter batches, tenkasu, oil, and per-plate toppings. Raw-egg batter stays refrigerated between batches. The egg-dish cooking endpoint (71°C/160°F) is distinguished from 74°C/165°F leftover reheating; the octopus is identified as fully cooked. Plain cooked balls are refrigerated promptly, with the two-day crispness preference separated from official cooked-egg storage guidance.

Existing culinary references remain attached to each recipe, with official guidance identified separately:

- Green curry: [Hot Thai Kitchen — Green Curry](https://hot-thai-kitchen.com/green-curry-new-2/) and [Thailand Foundation — Secrets to Thai Cooking](https://thailandfoundation.or.th/secrets-to-thai-cooking/).
- Boeuf bourguignon: [Pardon Your French — Classic French Beef Bourguignon](https://www.pardonyourfrench.com/classic-french-beef-bourguignon/) and [Meilleur du Chef — Boeuf Bourguignon](https://www.meilleurduchef.com/fr/recette/boeuf-bourguignon.html).
- Boat noodles: [Hot Thai Kitchen — Boat Noodles](https://hot-thai-kitchen.com/boat-noodles/) and [ThaiTable — Recipes](https://www.thaitable.com/recipes).
- Takoyaki: [Just One Cookbook — Takoyaki](https://www.justonecookbook.com/takoyaki-recipe/) and [Japanese Cooking 101 — Takoyaki](https://www.japanesecooking101.com/takoyaki-recipe/).
- Safety and handling: [FoodSafety.gov minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures), [FoodSafety.gov four steps](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety), [FoodSafety.gov cold storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts), and [FDA egg safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety).

## Verification and limits

- `npm test`: 274 passed, 0 failed; includes cuisine draft audits, build, static audit, and all Node tests.
- Shared locale/route regressions plus this batch: 60 passed, 0 failed (`node --test test/recipe-method-regressions.test.mjs test/recipe-method-fifty-ninth.test.mjs`).
- Separate `npm run build`: passed; 1,885 indexable URLs across five locales.
- `git diff --check`: passed.
- Runtime: Node `v24.19.0`. Exact model/runtime variant was not exposed. Review was performed in the same model context and is not independent verification.
- No food was cooked; no headless browser, CDP, local server preview, UI review, or deployment was run. Repository tests establish content, mapping, route, and build consistency only; they do not validate real-world cooking results.
