# Recipe method audit — seventy-second batch (2026-10-13)

## Scope, instructions, and coverage

Base: `7e06d52a38df7514ee264ad94ed9bbf52e313fbc`, the head of `codex/recipe-methods-seventy-first-20261013` (parent `09c08745b8ce1bb3be00f1c5b74e4e557b042b62`, tree `fd2482f6cd74e675ebd9b418baadaa6b62f27035`). Work branch: `codex/recipe-methods-seventy-second-20261013`, created from that exact commit.

I read the recipe rules in `README.md`, `TODO.md`, the seventieth- and seventy-first-batch audit reports, the exact-slug coverage ledger in `test/recipe-method-regressions.test.mjs`, and the standing exclusions in `test/recipe-method-fiftieth.test.mjs`. No RecipeNestVault `AGENTS.md` or `.agents/skills/**/SKILL.md` was present. The project README requires source-backed content, matching facts across five locales, real-photo/illustration integrity, and static checks before publication. Its browser/production release gate was not part of this content-only task and was not run.

The registry remains at 353 unique recipes. Exact-slug review coverage increases from 284 to 288; 47 eligible unchecked recipes remain after the same 18 excluded slugs. The four selections were absent from the base ledger and absent from the exclusion list. No excluded recipe, source draft, ingredient quantity, step count, illustration mapping, photo, registry entry, or route was changed. The publication copy for chè ba màu adds a localized note to its existing agar ingredient describing the optional correction reserve. The current ledger and historical count/window assertions were advanced while retaining each prior batch's exact four-slug slice.

## Findings and changes

| Recipe | Unfinished issue found | Change in all five locales |
| --- | --- | --- |
| Churros con Chocolate (`churros-con-chocolate`) | Frying time and colour did not tell the cook how to verify the centre or recover when the outside browned first. The chocolate instructions left no measured adjustment for a sauce that was too thick or thin. | Use the first churro as a centre test; lower oil to 170–175°C, shorten pieces, and extend frying if the centre is pasty; use 20-second increments for pale churros. Reserve 15 ml milk and use it in 5 ml increments to thin the sauce; simmer briefly if it is loose. Give the chilled chocolate sauce explicit cooling, storage, and 74°C / 165°F reheating instructions. |
| Spinach and Feta Gözleme (`gozleme`) | The listed 30 ml divided oil did not assign its final 5 ml, the dough-ball oiling was unmeasured, and the separately listed brushing oil was not quantified per bread. A brown exterior could conceal a cool/raw-dough centre with no correction path. | Allocate 15 ml to dough, 10 ml to spinach, the remaining 5 ml to the dough balls, and about 3–4 ml from the separate 15 ml for each cooked bread. Check that the cheese softens and the fold has no pale raw-dough seam; if browning runs ahead, lower the heat, cover, and continue in 30-second increments. Separate the three-day texture preference from official cold holding and leftover reheating guidance. |
| Brigadeiro (`brigadeiro`) | The method made 18 portions of about 15 g, using only about 270 g from a cooked batch that weighs over 400 g. The 8–10 minute cook estimate lacked a repeatable finish test. | Reserve 5 g of the listed butter for the plate and hands; cook the rest until it pulls from the pan and a spatula track stays open for about 2 seconds, extending in one-minute increments if needed. Weigh the cooled full batch and divide all of it into 18 equal portions, approximately 22–25 g each. Identify the three-day chilled window as a texture preference and give the two-hour / one-hour hot-weather refrigeration limit. |
| Chè ba màu (`che-ba-mau`) | The agar method lacked a set test and recovery if it stayed liquid. The cooked beans and coconut sauce were cooled on a fixed 20-minute room-temperature wait rather than promptly in shallow containers, and serving layers were not portioned per glass. | Check that chilled jelly cuts cleanly and holds shape; reboil failed jelly for two minutes, then use a listed reserve of up to 3 g pure agar in measured 1 g increments if it still does not set. Cool the beans and coconut sauce in separate containers no deeper than about 5 cm, refrigerating promptly and within the official time limit. Divide each bean layer into 60 g per glass, and specify one-quarter jelly, 150 g ice, and about one-quarter coconut sauce per serving. |

Recipe-specific references already in each recipe were retained and kept separate from official safety guidance. Source-draft methods remain untouched; publication copies are refined in `src/recipe-method-audit-seventy-second.mjs`.

## Recipe-method references checked

- [Spain.info — Churros](https://www.spain.info/en/recipe/churros/): confirms the hot-water flour dough and frying until golden. The updated centre check and temperature-based recovery are added operational guidance for this recipe.
- [Turkish Food Travel — Spinach and Cheese Gözleme](https://www.turkishfoodtravel.com/2021/02/14/turkish-spinach-gozleme/): describes rolled thin dough, filling and sealing, griddle cooking, turning until golden spots, and serving hot. The updated center/edge check addresses the source recipe's visual browning cue.
- [The Kitchn — Brigadeiro](https://www.thekitchn.com/brigadeiro-recipe-23281035): gives an 8–10 minute cook and a pan-release/fudgy-mass endpoint, and yields 15–18 sweets. The revision makes the pan-release cue observable and reconciles the full batch weight with 18 servings.
- [Hungry Huy — Chè Ba Màu](https://www.hungryhuy.com/che-ba-mau/): describes boiling agar, a 2–4 hour set, and variation in agar products' strength; it specifically notes that lower-strength powder may need more. This supports the listed measured reserve and re-test path. It also describes separate jelly, bean, coconut, and ice layers.

## Food-safety sources checked

- [FoodSafety.gov — 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): refrigerate perishables within two hours, within one hour above 32°C / 90°F; keep the refrigerator at or below 4°C / 40°F; cool leftovers in shallow containers. Applied to the milk-based chocolate sauce, chilled brigadeiro, and cooked bean/coconut layers.
- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): reheat leftovers to 74°C / 165°F. Applied only to refrigerated chocolate sauce and cooked gözleme leftovers. No meat or egg cooking temperature was added to these recipes because these four methods do not call for raw meat or eggs.

The sources were checked against the relevant ingredient and food state: chilled dairy/coconut components for prompt cooling and holding, and previously cooked foods for reheating. Three-day windows for brigadeiro and gözleme, and the two-day chocolate-sauce target, are explicitly labelled as texture/quality preferences rather than official safety limits.

## Regression and validation

- `npm ci --cache /tmp/recipenestvault-npm-cache` — installed the locked dependencies; `package.json` and `package-lock.json` were not changed.
- `npm test` — passed all 20 `audit:*drafts` commands wired in `package.json`; `src/recipes.mjs` separately assembles 21 recipe source groups. The command count and source-group count describe different things. It built 1,885 indexable URLs, passed the 10,816-file static audit, and passed 348/348 Node tests.
- Independent `npm run build` — passed; generated 1,885 indexable URLs across five locales.
- Independent `npm run audit` — passed; 10,816 files and 1,885 routes, including links/fragments, recipe completeness, photo/illustration gates, provenance, metadata, sitemap, hreflang, and structured data.
- Focused regression `node --test test/recipe-method-regressions.test.mjs test/recipe-method-seventieth.test.mjs test/recipe-method-seventy-first.test.mjs test/recipe-method-seventy-second.test.mjs` — passed 73/73 tests.
- New-batch checks cover exact eligibility/counts, all five locales, official source labels, full yield and oil allocations, doneness and recovery cues, the listed agar correction reserve, unchanged drafts, natural step counts, and unchanged illustration mappings. The recipe registry remains 353 unique IDs and the 18 exclusions remain intact.
- `git diff --check` — recorded after final diff review.

This is source and automated regression review. No recipe was cooked; no human tasting or independent human translation review occurred. Browser/UI and accessibility review, production-domain checks, deployment, and production verification were not performed. No headless browser, CDP, HTTP crawling, credential/security changes, or deployment commands were used.

Read-only comparison of the batch base (`7e06d52`) and result (`8e6990a`) found zero deleted files, including recipe drafts and tests.
