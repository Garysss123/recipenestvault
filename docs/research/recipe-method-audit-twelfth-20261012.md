# Recipe method audit — twelfth batch (2026-10-12)

## Coverage

Base: `7de31cab1db972f4af0b682dd09ac3618758d02c` on `codex/recipe-methods-eleventh-20261012`; work continues on `codex/recipe-methods-twelfth-20261012`.

The registry contains 353 recipes with 353 unique IDs. The first eleven batches deeply reviewed 44 distinct recipes. The 18 prior exclusions remain excluded: `mapo-tofu`, `koshari`, `cheeseburger`, `tacos-al-pastor`, `tiramisu`, `creme-brulee`, `new-york-cheesecake`, `chicken-teriyaki`, `pizza-margherita`, `pad-thai`, `butter-chicken`, `sauerbraten`, `panna-cotta`, `mango-sticky-rice`, `gulab-jamun`, `masala-dosa`, `coffin-bread`, and `nanaimo-bars`. This left 291 eligible recipes before this batch and 287 afterward; cumulative deep review is 48 distinct recipe IDs. The four recipes below overlap neither the previous 44 nor the excluded set.

## Findings and changes

| Recipe | Finding | Change |
| --- | --- | --- |
| Feijoada | The method browned multiple meats without stage durations, did not time the onion base, and said “remaining salt” without allocating any earlier use. Farofa appeared as a required serving despite lacking an ingredient quantity. | Time bacon browning at 4–5 minutes, pork and desalted beef browning at 8–10 minutes total, and sausage in the final 2 minutes; cook onion for 5–7 minutes and garlic/bay for 1 minute. Hold salt until the end and add gradually to taste, up to the listed 14 g because salted-beef saltiness varies. Add 160 g prepared farofa as an optional side portion for eight servings. Prep/cook/total stay 510/180/690 minutes. These are site-specific timing, seasoning and portion choices for this formula; Olivia’s Cuisine and Camila Made publish different Feijoada variants and do not establish these exact amounts or stage durations. |
| Imeretian Khachapuri | The yeast dough rise and bake had no duration; the finishing butter was not allocated to the method. Korean and Thai cheese ingredient labels were also copied in Thai instead of localized. | Knead 8–10 minutes; give the covered dough a 45–60 minute warm-room rise guide, with a cool-room caveat; bake at the recipe’s existing 220°C for about 15 minutes, start checking at 12 and allow up to 18, or use a covered medium skillet for about 5 minutes per side. Apply all 25 g finishing butter and rest for 5 minutes. Fix the KO/TH mozzarella and feta labels. Prep/cook/total become 90/23/113 minutes. Georgia Travel describes the Imeretian dough and shaping without these durations. The Guardian’s 15-minute/220°C and skillet timing is a useful reference, but its article uses a different dough formula; the rise guide and chosen totals are site adaptations. The oven setting was already present in this recipe and was retained, not added as a new safety temperature. |
| Tamales de Pollo en Salsa Verde | The 500 g chicken thigh simmer ended at “cooked through” without a verifiable endpoint. | Keep the approximate 20-minute simmer, then check the thickest thigh with a food thermometer for 74°C / 165°F. If it is below that, continue simmering and recheck every 2 minutes. The poultry endpoint follows FoodSafety.gov; the simmer duration is an approximate site guide for these pieces, not a value from that safety chart. Recipe prep/cook/total remain 75/95/170 minutes. |
| Huevos Rancheros | The method intentionally left soft yolks without a safe egg choice or fallback for ordinary shell eggs. | For soft yolks, specify pasteurized shell eggs; otherwise cook until both whites and yolks are firm. This follows FDA egg-safety guidance. No temperature was added. Recipe prep/cook/total remain 20/20/40 minutes. |

These edits, their ingredient labels and timing updates are present in English, Traditional Chinese, Japanese, Korean and Thai. Recipe source references are kept distinct from this site's portions, formula-specific timings and safety endpoints.

## Source verification

Official safety references:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): poultry should reach 74°C / 165°F. Used only for the chicken endpoint, not the chosen simmer time.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): cook eggs until whites and yolks are firm; use pasteurized shell eggs or egg products when a dish serves eggs raw or undercooked. Supports the soft-yolk option and fully cooked fallback.

Recipe references checked:

- [Feijoada — Olivia’s Cuisine](https://www.oliviascuisine.com/feijoada-recipe/) and [Homemade Feijoada — Camila Made](https://camilamade.com/homemade-feijoada/): checked for preparation sequences and familiar sides. Their soaking, browning, simmer and seasoning details vary from this site's formula; the site's 14 g maximum finishing salt, stage times and 160 g optional side are editorial values.
- [Imeretian Khachapuri — Georgia Travel](https://georgia.travel/imeretian-khachapuri) and [How to make the perfect khachapuri — The Guardian](https://www.theguardian.com/food/2026/mar/22/how-to-make-the-perfect-cheese-khachapuri-recipe-felicity-cloake): Georgia Travel confirms the regional round, enclosed cheese bread and yeast/resting process. The Guardian supplies a comparable 220°C/15-minute oven method and roughly 5-minute-per-side skillet method, but uses a different dough; this site's rise and total-time estimates are for its own yeast formula.
- [Chicken in Green Salsa Tamales — Pati Jinich](https://patijinich.com/chicken-in-green-salsa-tamal/) and [Chicken Tamales with Green Salsa — México in My Kitchen](https://www.mexicoinmykitchen.com/tamales-chicken-in-green-salsa/): checked as culinary variants for the tamale filling and assembly. The 74°C / 165°F endpoint is attributed separately to FoodSafety.gov.
- [Huevos Rancheros — Larousse Cocina](https://laroussecocina.mx/receta/huevos-rancheros-2/) and [Huevos Rancheros — Food Network Kitchen](https://www.foodnetwork.com/recipes/food-network-kitchen/huevos-rancheros-3631787): checked as culinary references for the tortilla, salsa and egg structure. Egg handling guidance is attributed separately to the FDA.

## Luna review

Luna reviewed the revised method text in all five locales. Its first pass caught Japanese and Thai wording that stopped short of boiling in the Feijoada bean step, and found that Feijoada descriptions in Japanese, Korean and Thai did not consistently mark farofa optional. Those strings were corrected; a follow-up review confirmed the boil endpoint and optional-side wording are now clear in all locales. Luna found the other reviewed quantities, timing, ingredient translations and safety directions aligned. This was a language review only, not cooking validation.

## Regression coverage and limits

The audited ID list now contains 48 distinct recipes. New assertions check the Feijoada salt cap/final seasoning, optional farofa portion and timed stages; Khachapuri’s rise, bake alternatives, butter allocation and corrected KO/TH ingredient labels; the tamale poultry endpoint and source; and the egg guidance and FDA source. The existing rendered-page regression checks recipe ingredients, displayed times and Recipe JSON-LD in all five locales for the 48 audited recipes.

`npm test` passed all 57 tests, the complete locale draft audits, build and static audit; its build produced 1,885 indexable URLs. A separate `npm run build` also produced 1,885 indexable URLs, and `git diff --check` passed. No `localdrafts` content was changed. This is source, translation and automated regression review; it does not claim browser/UI validation or actual cooking.
