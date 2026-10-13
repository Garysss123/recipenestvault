# Recipe method audit — batch 60 recovery

- Date: 2026-10-13
- Branch: codex/recipe-methods-sixtieth-recovery-20261013
- Exact base: dd86e53f0088c5a20d8688b85799bd718b92d09d from codex/recipe-methods-fifty-ninth-20261013
- Recovery note: the previously named codex/recipe-methods-sixtieth-20261013 was absent from the verified remote refs. This is a fresh completion from the exact 59th-batch GitHub base; no old task draft or working directory was recovered or removed.

## Selection and coverage

The shared exact-slug ledger is test/recipe-method-regressions.test.mjs. At the base it held 236 reviewed IDs; the unchanged standing exclusions list contains 18 IDs. From the 353-recipe registry, 99 slugs were eligible. Four absent from both the ledger and exclusion list were selected:

- scallion-pancakes
- okonomiyaki
- baked-mac-and-cheese
- salade-lyonnaise

The shared ledger now contains 240 distinct IDs; the registry remains 353 recipes, the 18 exclusions are unchanged, and 95 eligible recipes remain.

## Method changes

Publication copies are revised in English, Traditional Chinese, Japanese, Korean, and Thai; recipe source drafts remain unmodified. Existing published step counts and step-index illustration assignments are preserved.

- **Scallion pancakes:** split the 60 ml frying oil into 45 ml for the paste and 15 ml for four measured 3.75 ml uses; assign 25 g scallions to each of four pancakes; state the 55 ml dip yield; time each side and require a fully cooked, non-floury centre. Prep/cook/total estimates are now 60/30/90 minutes. FDA raw-flour handling is called out. Refrigeration, quality-preferred texture windows, and 74°C/165°F reheating are separated.
- **Okonomiyaki:** divide the 640 g cabbage, eight pork slices, four batter portions, griddle oil, and per-pancake toppings. Cooking checks distinguish egg batter at 71°C/160°F from intact pork at 63°C/145°F followed by a 3-minute rest; browned colour and timer estimates are not substituted for those checks. Up to two batches are accounted for in the 30/35/65-minute estimates. Storage distinguishes the 2-day crispness preference from the official 3–4-day cooked-leftover window and uses 74°C/165°F for reheating.
- **Baked macaroni and cheese:** assign 6 g of salt to the pasta water and reserve 2 g for sauce; account for all listed butter, dairy, cheese, and crumbs; state eight portions. The 20–25-minute bake remains an estimate, with a center check to 74°C/165°F for this meatless casserole and 3-minute rechecks if needed. The revised estimate is 25/50/75 minutes. Storage distinguishes a 3-day texture preference from the official 3–4-day leftover window.
- **Salade lyonnaise:** allocate bacon fat and olive oil without requiring an exact bacon yield, measure each plated share, and prepare the four poached eggs in two batches. Soft yolks explicitly require commercially pasteurized shell eggs; substituting ordinary eggs requires firm yolks and whites. Storage keeps dressed leaves, cooked bacon, and eggs separate; 74°C/165°F applies when reheating cooked leftovers, while fresh pasteurized eggs preserve the intended soft-yolk texture.

Each recipe retains its two existing culinary references. Separate official source entries identify the applicable FoodSafety.gov cooking, handling, and cold-storage guidance; FDA egg safety for the two egg recipes; and FDA raw-flour guidance for scallion pancakes:

- [FoodSafety.gov — safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)
- [FoodSafety.gov — four steps to food safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety)
- [FoodSafety.gov — cold food storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts)
- [FDA — egg safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-to-know-about-egg-safety)
- [FDA — flour is a raw food](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts)

## Verification and limits

- `npm test`: passed, 279 tests and repository audits, 0 failures; static audit reported 10,816 files and 1,885 indexable routes.
- Shared locale/route regressions plus this batch: 60 passed, 0 failed (node --test test/recipe-method-regressions.test.mjs test/recipe-method-sixtieth.test.mjs).
- Separate npm run build: passed; 1,885 indexable URLs across five locales.
- `git diff --check`: passed.
- Shell runtime: Node.js v24.19.0, npm 11.9.0. The exact model/runtime variant was not exposed; review by this same model is not independent verification.
- No food was cooked. No headless browser, CDP, local server preview, visual review, or deployment was run. Automated repository checks establish content, mapping, route, and build consistency only; they do not establish tested cooking results.
