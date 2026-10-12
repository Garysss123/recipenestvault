# Recipe method audit — eleventh batch (2026-10-12)

## Coverage

Base: `cd915b4c38edf474868edbec3c8c2fd92c3aa98f` on `codex/recipe-methods-tenth-20261012`.

The registry has 353 recipes with 353 unique IDs. The first ten batches deeply reviewed 40 distinct recipes. The 18 recipes excluded in the sixth-batch report remain excluded. This left 295 eligible recipes before this batch and 291 afterward; the cumulative deep-review count is now 44. Counts are distinct recipe IDs. The four IDs below do not overlap the previous 40 or the 18 excluded IDs.

The four additional regression IDs are `caponata`, `baklava`, `malva-pudding`, and `pancit-bihon`. Candidate scan signals identified gaps for manual review; they were not treated as proof by themselves.

## Findings and changes

| Recipe | Finding | Change |
| --- | --- | --- |
| Sicilian Caponata | The recipe had an ambiguous salt/pepper line, no separate amount for the celery and onion oil, and little stage timing. | Split salt (5 g total) and pepper (1 g); allocate 3 g salt to eggplant and up to the remaining 2 g to the sauce; list 15 ml oil for celery and onion and allocate it in the method. The method now says to use all 60 ml eggplant oil across 2–3 batches, times the salting, browning and sauce stages, and gives taste/texture endpoints. Prep/cook/total are 55/50/105 minutes. The exact 5 g salt, 1 g pepper, both oil amounts, salt split and site timing ranges belong to this site's formula. Visit Sicily and La Cucina Italiana publish differing caponata variants; neither establishes those exact quantities or timings. No oven temperature was added. |
| Pistachio Baklava | Syrup, baking, and post-bake absorption/cooling had no usable durations, and 350 g listed butter was not allocated across the pan, filo and top. | Give the syrup an 8–10 minute simmer, bake at 180°C for 55–65 minutes with visual/crispness checks, and cool uncovered for at least 90 minutes after syruping. Allocate the listed butter as 20 g for the pan, about 300 g across filo layers and the final 30 g on top. Prep/cook/total are 145/65/210 minutes, with the 90-minute cooling guide included in prep time. BBC Good Food Middle East and Food Network use different baklava formulas and bake/rest timings; this site's timings and allocations are editorial choices for its own formula, not source-recipe amounts. |
| South African Malva Pudding | Baking duration and the use of 60 g batter butter were unspecified. | Use 5 g of the listed butter to grease the 23 cm square dish and melt the remaining 55 g for the batter. Bake at 180°C for 30–40 minutes, begin checking at 30 minutes, and use a clean skewer and springy centre as cues. The 30–40 minute range is a site guide for this dish and formula. The Warren Mendes and WineMag examples use different pan sizes and/or bake times, so neither is attributed as the site's exact timing. Prep/cook/total remain 20/40/60 minutes. |
| Pancit Bihon | Chicken was judged only by colour, and the method gave no stage durations or measured contingency for additional noodle water. | Add 4–5 minutes for sausage and 3–5 minutes for chicken, with a clean thermometer check of 74°C / 165°F at the thickest chicken slice; time vegetables and shrimp for 2–3 minutes each and noodles for 5–8 minutes. List up to 60 ml additional water only if the wok dries, used in 15 ml increments. The 74°C / 165°F chicken endpoint follows FoodSafety.gov guidance. The pan times and optional water amount are this site's adaptations for its own quantities; the cited Pancit recipes use different formulas and sequences. Prep/cook/total remain 25/25/50 minutes. |

All method revisions and the added regression assertions cover English, Traditional Chinese, Japanese, Korean and Thai. The temperature remains limited to the oven steps where it is needed and the official chicken safety check; no temperature was added to caponata.

## Source verification

Official safety reference:

- [FoodSafety.gov — Cook to a Safe Minimum Internal Temperature](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): recommends 74°C / 165°F for poultry. This supports the pancit chicken safety endpoint, not its chosen stir-fry time.

Recipe references checked:

- [Caponata — Visit Sicily](https://www.visitsicily.info/en/ricetta/caponata/) and [Sicilian Caponata — La Cucina Italiana](https://www.lacucinaitaliana.com/italian-food/italian-dishes/sicilian-caponata-recipe): checked as distinct Sicilian caponata methods. They use different ingredient proportions and stage timings; neither is the source of this site's exact allocations.
- [Pistachio, Almond and Lemon Rose Baklava — BBC Good Food Middle East](https://www.bbcgoodfoodme.com/recipes/pistachio-almond-lemon-rose-baklava/) and [Pistachio Baklava — Food Network](https://www.foodnetwork.com/recipes/food-network-kitchen/pistachio-baklava-14024677): checked for syrup, baking and cooling sequence. Their formulas and timing details differ from this site's selected 55–65 minute bake and minimum 90-minute cooling guide.
- [Warren Mendes's Malva Pudding — Penguin Random House South Africa](https://www.penguinrandomhouse.co.za/warren-mendess-malva-pudding/) and [Malva Pudding — WineMag](https://winemag.co.za/food/recipe/malva-pudding/): checked for dish size, oven guidance and doneness cues. These examples differ in dish size and timing; this site's 23 cm dish and 30–40 minute range are adapted editorial values.
- [Pancit Bihon Guisado — Panlasang Pinoy](https://panlasangpinoy.com/pancit-guisado/) and [Pancit Bihon — Food Network](https://www.foodnetwork.com/recipes/food-network-kitchen/pancit-bihon-19783953): checked for ingredient preparation and sequence. Neither establishes the exact timing or optional-water amount used in this site's formula.

## Luna review

Luna reviewed all five method versions, the allocations, sequence, times, temperatures and source attribution. It found the Pancit Bihon Korean ingredient fields had Thai text across the list, including the newly added optional-water item. Those Korean strings have been corrected, and a regression assertion now checks the full Korean ingredient list. Luna confirmed that the five-language method timings and allocations agree, the 74°C / 165°F endpoint is supported for chicken, and the selected pan times are site adaptations rather than FoodSafety.gov recommendations. No remaining translation issue was reported.

## Regression coverage and limits

The audited ID list now contains 44 distinct recipes: the previous 40 plus these four. New assertions check each recipe's amounts, allocations, stage timing, safety attribution where applicable, and selected method wording in all five locales. The Korean Pancit ingredient translation is also checked explicitly. The existing rendering regression checks ingredient data, visible timings and Recipe JSON-LD for all 44 recipes in all five locales. `npm test` passed all 53 tests and its included draft and static audits; a separate `npm run build` built 1,885 indexable URLs; `git diff --check` passed. The 18 exclusions remain out of scope. No `localdrafts` content was changed. This is source, translation and automated regression review; it does not claim browser/UI validation or actual cooking.
