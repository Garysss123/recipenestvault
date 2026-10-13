# Recipe method audit — seventieth batch (2026-10-13)

## Coverage and branch

Audit base: `48d2d878423c30e335c6257fd4c0e261d825ebec` on `codex/recipe-methods-sixty-ninth-20261013` (parent `13511160ff49e89024169bd2a69f02256eeafc01`, tree `20c71a8bc2d17ceab986cda5fe530fd50b1b4d84`). Work branch: `codex/recipe-methods-seventieth-20261013`.

The recipe registry remains at 353 recipes. Shared exact-slug deep-review coverage grows from 276 to 280 unique recipes. The same 18 exclusions remain in effect: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. Eligible unchecked recipes move from 59 to 55. The four selections were absent from the base ledger and are not excluded.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Kimchi jeon (`kimchi-jeon`) | The flip and finish step lacked a reliable centre cue and correction path. Its leftover guidance conflated quality storage time with safety advice. | Keep six steps and two pancakes. Clarify a safe lid-assisted flip, crisp/set/no-wet-batter cues, and a lower-heat 1–2 minute correction. The recipe has no meat, so its doneness cue is texture rather than an unrelated 74°C endpoint. Separate the two-day crispness preference from refrigeration and the 74°C / 165°F leftover reheating endpoint. |
| Bienenstich (`bienenstich`) | Custard thickening and bubbles were the only endpoint, and the cooling instructions did not give a shallow depth or prompt refrigeration. | Keep twelve steps. Temper and continuously whisk the egg custard, check its centre at 71°C / 160°F with a clean thermometer, then spread it in a shallow dish no deeper than about 4 cm and refrigerate at 4°C / 40°F or below. The two-day use suggestion is explicitly a quality preference. |
| Gemista (`gemista`) | The rice had no clear doneness test or measured way to correct a dry pan. General leftover timing was too broad for cooked rice. | Keep ten steps and twelve stuffed vegetables. Add an optional, measured 0–60 ml of boiling water; cut the largest vegetable to check the rice for a hard or chalky centre, and continue covered in 10-minute increments as needed. If prep pauses after par-cooking, cool the rice shallow and promptly. Apply the UK Food Standards Agency's rice-specific cooling, 24-hour use, and single-reheat guidance. |
| Dolmades (`dolmades`) | The partly cooked rice could sit while the leaves were rolled, with no rice-centre check or measured correction if liquid ran short. General leftover timing was too broad for cooked rice. | Keep ten steps. Limit the shallow-tray cooling to the time needed to handle the filling and continue without an avoidable pause; if interrupted, cool and refrigerate the rice within one hour. Test a centre roll and add the optional 0–60 ml boiling water in 30 ml increments, then simmer in 5–10 minute increments until tender. Apply the same rice-specific storage and reheating advice. |

All changed method and storage copy, and added ingredient rows, are localized in English, Traditional Chinese, Japanese, Korean, and Thai. Existing natural step counts, illustration scene mappings, and one-to-one step illustrations are preserved. Revisions use publication copies, leaving the four source drafts unchanged. Existing culinary references remain attached to each recipe; the exact timings and quality cues are this site's adaptations.

## Recipe references

- Kimchi jeon: [Maangchi — Kimchijeon](https://www.maangchi.com/recipe/kimchijeon) and [My Korean Kitchen — Kimchi pancakes](https://mykoreankitchen.com/kimchi-pancakes-kimchi-buchimgae/).
- Bienenstich: [Dr. Oetker — Bienenstich klassisch](https://www.oetker.de/rezepte/r/bienenstich-klassisch) and [King Arthur Baking — Bienenstich](https://www.kingarthurbaking.com/recipes/bienenstich-bee-sting-cake-recipe).
- Gemista: [My Greek Dish — Gemista](https://www.mygreekdish.com/recipe/gemista-stuffed-tomatoes-peppers-and-onions/) and [Akis Petretzikis — Gemista](https://akispetretzikis.com/en/recipe/4046/gemista-me-kima).
- Dolmades: [My Greek Dish — Greek Dolmades](https://www.mygreekdish.com/recipe/greek-dolmades-recipe-stuffed-vine-leaves/) and [Akis Petretzikis — Dolmades](https://akispetretzikis.com/en/recipe/1404/ntolmadakia-gialantzi).

## Official food-safety guidance

Official references are labeled separately from culinary references in recipe data:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): egg dishes to 71°C / 160°F and reheated leftovers to 74°C / 165°F. The egg endpoint is used for the custard; leftover reheating applies to the kimchi pancakes.
- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): refrigerate perishable food within two hours (one hour above 32°C / 90°F), keep at 4°C / 40°F or colder, and use shallow containers. Applied to the pancake leftovers and custard.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): egg-related custard handling.
- [UK Food Standards Agency — Home Food Fact Checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker): cool cooked rice quickly, ideally within one hour; refrigerate and use within 24 hours; reheat only once until steaming hot throughout. Applied to gemista and dolmades.

## Regression coverage and limits

The shared ledger now contains 280 unique exact slugs, leaving 55 eligible unchecked recipes after the standing exclusions. Historical ledger-window assertions were shifted to continue testing their original batches as the shared ledger grows. The seventieth-batch regression checks the four exact slugs, registry and exclusion counts, all five locales, changed cooking and storage guidance, official sources, unchanged source drafts, step counts, and illustration mappings.

On 2026-10-13, `npm test` passed: all locale draft audits, the integrated build (1,885 indexable URLs across five locales), the static output audit (10,816 files), and 336 Node tests (0 failed). An independent `npm run build && npm run audit` also passed: 1,885 indexable URLs and 10,816 audited files. Focused shared-ledger, shared detail-route, sixty-eighth, sixty-ninth, and seventieth regressions passed: 73 tests, 0 failed. `git diff --check` passed.

This is a source, translation, and automated regression review. Translation review was performed in one model pass and is not independent or human review. The recipes were not cooked. Browser/UI, accessibility, deployment, and production validation were not performed. No headless browser, CDP, HTTP crawling, or security-setting changes were used.
