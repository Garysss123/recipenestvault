# Recipe method audit — thirty-fourth batch (2026-10-12)

## Coverage

Audit base and intended parent: `55d238c149713a6cc9987e09b2239e3ac775bbc9`. Work branch: `codex/recipe-methods-thirty-fourth-20261012`.

The recipe registry remains at 353 existing recipes. Shared five-locale method regression grows from 132 to 136 unique IDs. The same 18 standing exclusions remain unchanged; 199 of the 335 non-excluded recipes remain for later review. The four additions are existing eligible recipes. No recipe or date was added, no excluded recipe was edited, and no local draft was touched.

No repository `AGENTS.md` or `.agents/skills` guidance was present. I read the shared route regression list, the preceding batch report and relevant tests. The specified source branch was absent remotely at the start; the work branch was created directly from the requested base commit.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| French chocolate mousse (`chocolate-mousse`) | The listed 35-minute total omitted the source's minimum 3-hour setting period; the method did not make cold storage and room-temperature handling explicit. | Keep 200 g chocolate, 40 g butter and four large pasteurized eggs for six glasses. Cover and refrigerate promptly at 4°C / 40°F or below for at least 3 hours; keep chilled until serving and discard after over 2 hours at room temperature. Set the editorial estimate to 205/10/215 minutes (prep/cook/total), counting 180 minutes of chilling. The 3-hour minimum follows the dish reference; other timing is estimated. |
| Saltimbocca alla Romana (`saltimbocca-alla-romana`) | Eight thin veal cutlets had only color and short pan-time cues, with no safe endpoint, rest or per-person allocation. Listed butter was not actually explained in the sauce step. | For each of two batches, check the thickest cutlet from its edge with a thin-tip thermometer for 63°C / 145°F; continue in 30-second increments and recheck if low. Rest on a clean warm plate for 3 minutes. Off heat, emulsify all 40 g cold butter into the wine reduction without boiling it again. Divide eight cutlets among four plates, two each. Editorial time remains 20/15/35 minutes. |
| Tagliatelle al Ragù Bolognese (`tagliatelle-ragu-bolognese`) | The mixed ground beef and pork had browning cues without a safe endpoint; the 80 g Parmigiano was not allocated between tossing and serving. | Check the largest meat clumps to 71°C / 160°F before adding wine; cook in 1-minute increments and recheck if low. Allocate 60 g to the pasta and 20 g across six warm bowls. Keep six servings and the existing 25/150/175-minute estimate. |
| Pisto Manchego (`pisto-manchego`) | Six soft-yolk eggs for four servings had no pasteurization instruction or clear serving allocation. The timed stages' upper bounds needed to fit the displayed cook time. | Specify six large pasteurized eggs, refrigerated until frying; cook until whites are completely set while the yolks remain soft. Place one egg on each of four plates and serve the remaining two alongside to share. The timed stages' upper bounds total 58 minutes; set prep/cook/total to 20/58/78 minutes. |

Portions, times, stage estimates and allocation math above are editorial calculations for this version except where the cited dish reference specifically supports a wait. The exact amounts, servings and durations are not claimed as source-verified. The mousse dish reference supports at least 3 hours of chilling; FoodSafety.gov and FDA support the separate safety endpoints and handling guidance below.

## Recipe references

- French chocolate mousse: [Pardon Your French — Classic French Chocolate Mousse](https://www.pardonyourfrench.com/classic-french-chocolate-mousse/) and [Meilleur du Chef — Mousse au chocolat](https://www.meilleurduchef.com/fr/recette/mousse-chocolat.html).
- Saltimbocca alla Romana: [GialloZafferano — Saltimbocca alla Romana](https://ricette.giallozafferano.it/Saltimbocca-alla-Romana.html) and [La Cucina Italiana — Saltimbocca alla Romana](https://www.lacucinaitaliana.com/recipe/main-course/original-recipe-saltimbocca-alla-romana).
- Tagliatelle al Ragù Bolognese: [La Cucina Italiana — Tagliatelle con ragù alla bolognese](https://www.lacucinaitaliana.it/ricetta/primi/tagliatelle-con-ragu-alla-bolognese-la-ricetta-tradizionale/) and [Accademia Italiana della Cucina — Ragù alla bolognese (2023)](https://www.accademiaitalianadellacucina.it/sites/default/files/Rag%C3%B9%20alla%20bolognese%20-%20ricetta%20aggiornata%2020%20aprile%202023.pdf).
- Pisto Manchego: [Spain.info — Pisto Manchego with Eggs](https://www.spain.info/en/recipe/pisto-manchego-with-eggs/) and [Spanish Sabores — Traditional Spanish Pisto](https://spanishsabores.com/traditional-spanish-pisto-recipe/).

These dish references support dish identity and general preparation, not this site's precise amounts, times or portions.

## Official food-safety guidance

Official safety guidance is labelled separately from dish references in recipe data:

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): whole veal cutlets to 63°C / 145°F followed by a 3-minute rest; ground meat to 71°C / 160°F.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-to-know-about-egg-safety): use pasteurized eggs for recipes served raw or undercooked; refrigerate eggs and discard perishable egg dishes left at room temperature longer than two hours. This supports the mousse and soft-yolk pisto handling notes.

## Translation and review

Traditional Chinese, Japanese, Korean and Thai text was translated and self-reviewed in a single-model pass. This was not an independent translation or human review. GPT-6 Luna could not be selected or verified from this execution environment, so no model attribution is claimed.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` now covers 136 unique recipes across all five locales, including the four IDs above. The [thirty-fourth batch tests](../../test/recipe-method-thirty-fourth.test.mjs) check the 353-recipe registry, all 18 standing exclusions, localized method details, ingredient allocations, portions, timing arithmetic and labelled official safety sources. Current shared-count assertions in batch 22–33 tests were updated for the expanded list.

Verification on 2026-10-12: all 20 cuisine draft audits passed; `npm test` passed the build, static audit and all Node tests. A separate `npm run build` generated 1,885 indexable URLs across five locales. The shared regression plus batch 34 file passed 60/60 tests. `git diff --check` passed. The recipes were not cooked; no browser/UI check, local preview server, deployment or production validation was performed.

## Changed paths

- Recipe methods and official-source labels: `src/french-recipes-e.mjs`, `src/italian-recipes-c.mjs`, `src/italian-recipes-b.mjs`, `src/spanish-recipes-d.mjs`.
- Shared route coverage and batch regression: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-fourth.test.mjs`, and current shared-count assertions in the batch 22–33 tests.
- This batch report: `docs/research/recipe-method-audit-thirty-fourth-20261012.md`.
