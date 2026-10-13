# Recipe method audit — batch 61

- Date: 2026-10-13
- Branch: `codex/recipe-methods-sixty-first-20261013`
- Exact base: `98312eabdea6f0fd27a3b14d6c529c185da5ca9b` from `codex/recipe-methods-sixtieth-recovery-20261013`

## Selection and coverage

The shared exact-slug ledger is `test/recipe-method-regressions.test.mjs`. At the base it held 240 reviewed IDs; the standing exclusion list held 18 IDs. The 353-recipe registry therefore had 95 eligible recipes. Four existing slugs absent from both the ledger and exclusions were selected:

- `pad-see-ew`
- `kalguksu`
- `pho-bo`
- `mi-quang`

The ledger now contains 244 distinct reviewed IDs; the registry remains 353 recipes, all 18 exclusions remain unchanged, and 91 eligible recipes remain. No source recipe drafts were edited. The publication copies are updated in English, Traditional Chinese, Japanese, Korean, and Thai. Existing instruction counts and illustration step assignments are preserved.

## Method changes

- **Pad See Ew** (4 servings; 30/15/45 minute prep/cook/total estimate): allocates all 45 ml frying oil across two 175 g pork batches, egg and vegetables, and two noodle batches; accounts for sauce and broccoli cuts; separates intact pork at 63°C/145°F plus a 3-minute rest from the 71°C/160°F egg-dish endpoint. Stir-fry times are labelled as texture estimates. Quality-preferred two-day storage is distinguished from the official three-to-four-day leftover window; reheat leftovers to 74°C/165°F. Added a third culinary reference.
- **Kalguksu** (4 servings; 65/85/150 minutes; 14 natural steps): allocates the noodle dough and four bowls; warns that raw flour must not be tasted and calls for cleaning hands and tools. The bone-in chicken endpoint is 74°C/165°F, while the 35–45 minute simmer and noodle timing remain estimates for tenderness and texture. Components are stored separately; reheating applies 74°C/165°F to cooked chicken and broth.
- **Phở bò** (6 servings; 40/390/430 minutes; 10 steps): separates six-hour broth-flavour time from meat safety. The 700 g whole brisket and 250 g intact 2.5 cm sirloin steak each use the 63°C/145°F whole-cut endpoint and 3-minute rest; the sirloin is sliced only after checking while intact. Cooked brisket reheating uses 74°C/165°F. Six bowls receive 117 g brisket, 42 g sirloin by raw weight, 75 g dry noodles, and 500 ml broth each. Broth and beef are chilled promptly and kept separate from raw garnishes and noodles.
- **Mì Quảng** (4 servings; 35/95/130 minutes; 10 steps): allocates the pork, shrimp, eight quail eggs, noodles, broth, and toppings across four bowls. Pork uses the whole-cut 63°C/145°F endpoint and a 3-minute rest, distinct from the estimated 20–25 minute simmer for tenderness. Shrimp use the official pearly/white-and-opaque cue, not the fish-fillet temperature; hard-boiled quail eggs must have firm whites and yolks. Storage separates the two-day quality preference from the official leftover range, and reheating uses 74°C/165°F.

The culinary references reviewed are [ThaiTable](https://www.thaitable.com/recipes/pad-see-ew), [Hot Thai Kitchen](https://hot-thai-kitchen.com/pad-see-ew-new/), and [RecipeTin Eats](https://www.recipetineats.com/thai-stir-fried-noodles-pad-see-ew/) for Pad See Ew; [Maangchi](https://www.maangchi.com/recipe/dak-kalguksu) and [Korean Bapsang](https://www.koreanbapsang.com/dak-kalguksu-chicken-noodle-soup/) for kalguksu; [Delightful Plate](https://delightfulplate.com/authentic-vietnamese-beef-pho-noodle-soup/) and [Vicky Pham](https://vickypham.com/blog/vietnamese-beef-noodle-soup-pho-bo/) for phở bò; [Vicky Pham](https://vickypham.com/blog/central-vietnams-must-eat-noodle-dish-mi-quang/) and [Delightful Plate](https://delightfulplate.com/mi-quang-vietnamese-quang-noodle/) for Mì Quảng.

Applicable official food-safety references are listed separately on the recipes: [FoodSafety.gov safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures), [four steps to food safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety), and [cold food storage charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts); [FDA egg safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-to-know-about-egg-safety) for Pad See Ew and Mì Quảng; and [FDA raw-flour guidance](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts) for kalguksu.

## Verification and limits

- `npm test`: passed; 284 tests, 0 failures. It ran the language draft audits, built the site, and passed the static audit: 10,816 files and 1,885 indexable routes across five locales.
- Separate `npm run build`: passed; 1,885 indexable URLs across five locales.
- `git diff --check`: passed.
- Shell runtime: Node.js v24.19.0, npm 11.9.0. The exact model/runtime variant was not exposed; review by this same model is not independent verification.
- No food was cooked. No UI/browser review, headless browser, CDP, local server preview, or deployment was run. Automated checks cover repository content, illustration mapping, routes, and static build consistency; they do not establish tasted or kitchen-tested results.
