# Recipe method audit — sixty-third batch

Date: 2026-10-13
Branch: `codex/recipe-methods-sixty-third-20261013`
Exact starting commit: `5f1c1df766c05460145ee450c180b92a79a43815`

## Selection and scope

The starting shared slug ledger held 248 distinct reviewed recipes out of the 353-recipe published registry. The 18 standing old-patch exclusions were retained, leaving 87 unchecked, non-excluded candidates. These four slugs were absent from the starting ledger and absent from the exclusion list:

- `chana-masala`
- `red-curry-pork`
- `blanquette-de-veau`
- `miyeok-guk`

They extend the shared five-locale ledger to 252 unique recipes, leaving 83 eligible candidates. The 18 exclusions are unchanged. The source recipe drafts and illustration-set files were not edited. Publication overlay revisions retain each method's existing step count and `imageScene` mapping.

## Changes

- **Chana masala:** specified a refrigerated 8-hour chickpea soak and included the elapsed soak in prep time; stated spice weights and divided the 8 g salt into 5 g plus 3 g; allocated 400 ml of the reserved chickpea liquid to simmering and kept 100 ml for adjustment; divided garnish and four servings; distinguished the three-day texture preference from the official 3–4-day refrigerated window and 74°C/165°F leftover reheat.
- **Red curry pork:** corrected the two culinary references to pork-curry recipes; reconciled the staged method with a 62-minute total estimate; distinguished whole-muscle pork slices from ground pork and used the 63°C/145°F plus three-minute rest standard; made four plate portions explicit; added separate rice cooling, storage, and one-reheat instructions.
- **Blanquette de veau:** made the poaching liquid, vegetables, and salt allocation explicit; identified 90–110 minutes as a tenderness estimate and checked the thickest veal cube using the whole-cut endpoint; kept the 80–82°C sauce texture target distinct from the 71°C egg-dish safety endpoint; separated stew leftovers from cooked rice storage and reheating.
- **Miyeok-guk:** stated the soy sauce and sesame oil allocations between marinade and pot; corrected the localized beef ingredient label; separated the brisket tenderness estimate from the whole-cut endpoint; stated per-bowl beef and seaweed equivalents, included a variable four-minute broth bring-up in the 40-minute cook estimate, and added storage/reheat guidance.

All four methods, ingredient labels, and storage cards are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Existing illustration mappings, illustrations, and source drafts remain intact.

## Sources

Culinary references retained or corrected per recipe:

- Chana masala: [Swasthi's Recipes](https://www.indianhealthyrecipes.com/chana-masala/), [Dassana's Veg Recipes](https://www.vegrecipesofindia.com/chana-masala-recipe/).
- Red curry pork: [Paint the Kitchen Red](https://www.paintthekitchenred.com/thai-red-curry-pork/), [BBC Good Food](https://www.bbcgoodfood.com/recipes/thai-pork-peanut-curry).
- Blanquette de veau: [Pardon Your French](https://www.pardonyourfrench.com/blanquette-de-veau/), [Meilleur du Chef](https://www.meilleurduchef.com/fr/recette/blanquette-veau.html).
- Miyeok-guk: [Maangchi](https://www.maangchi.com/recipe/miyeokguk), [Korean Bapsang](https://www.koreanbapsang.com/miyeok-guk-beef-seaweed-soup/).

Official safety references, applied by food and context:

- [FoodSafety.gov safe minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole beef, pork, and veal cuts at 63°C/145°F followed by a three-minute rest; ground meat and egg dishes at 71°C/160°F; leftovers at 74°C/165°F.
- [FoodSafety.gov four steps to food safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) and [cold-food storage charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): prompt refrigeration, shallow containers, and applicable leftover windows.
- [UK Food Standards Agency home food fact checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker): cool cooked rice quickly, refrigerate within one hour, use within 24 hours, and reheat only once until steaming hot throughout.

The 80–82°C blanquette liaison target is an explicitly labeled sauce-method/texture target above the egg-dish safety endpoint, not a replacement safety rule. Three-day stew guidance is described as a quality preference, separately from the official 3–4-day chart window.

## Verification

- `npm test` — passed. This ran all 21 locale draft-audit scripts, the integrated build, static site audit, and 294 Node tests (294 passed, 0 failed).
- Independent `npm run build` — passed; generated 1,885 indexable URLs across five locales.
- Targeted shared regression plus batches 62 and 63 — 65 tests passed, 0 failed.
- Static audit verified routes, links/fragments, five-locale recipe completeness, image gates, provenance, sitemap/canonical/hreflang, metadata, and JSON-LD.
- `git diff --check` — passed. Published recipe registry remains 353 unique recipe IDs; generated routes remain 1,885.
- Prior-batch tests were updated to assert their original slug positions as the shared ledger grew, while preserving the exact selection and exclusion checks.

## Review and limits

The actual self-review was performed by the same model in this task, so it is not an independent review. The model/runtime variant is not exposed by the selected environment; Node.js was `v24.19.0` and npm was `11.9.0`. No recipe was cooked and no browser/UI or accessibility session was run. No headless browser, CDP, local server, or security configuration changes were used. Build and static audits do not establish that the interface was manually reviewed or that the recipes were kitchen-tested.
