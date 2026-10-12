# Recipe method audit — thirty-sixth batch (2026-10-12)

## Coverage

Audit base: `52fb9cf08d00d038ea304dac512f0ae258e66b17`. Work branch: `codex/recipe-methods-thirty-sixth-20261012`.

The registry remains at 353 recipes. Shared five-locale method coverage grows from 140 to 144 unique recipe IDs. The same 18 standing exclusions remain unchanged; 191 of the 335 non-excluded recipes remain for later review. All four additions are existing recipes. No recipe or date was added, no excluded recipe was edited, and no local draft was changed.

No repository `AGENTS.md` or `.agents/skills` regression guidance was present. I reviewed the shared route regression list, prior batch audit, relevant method tests and recipe data. The requested source branch was absent remotely at the start; the work branch was created at the requested base.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Quindim (`quindim`) | The bain-marie amount was only 20 ml, the method lacked an egg-custard endpoint, and its displayed duration omitted the long waits and cooling. | Keep 12 moulds. Specify about 1.5 L hot water, or enough to come halfway up the moulds; bake at 160°C for 35–45 minutes and check the largest custard's centre for 71°C / 160°F, continuing in three-minute increments if needed. Cool 30 minutes, then cover and chill at 0–4°C for three hours before unmoulding. Prep/cook/total estimate: 740/260/1,000 minutes, including the 12-hour covered batter rest, handling, bake, cooling and chill. |
| Ontario butter tarts (`butter-tarts`) | The 18-minute cook estimate omitted cooling, and “soft centre” had no safe egg endpoint. | Keep 12 tarts. Bake at 220°C for 12–15 minutes; check the centres of the two most-filled tarts for 71°C / 160°F, then continue in one-minute increments if needed. Rest in the tin two minutes and cool 30 minutes. Prep/cook/total estimate: 55/47/102 minutes. |
| Pastitsio (`pastitsio`) | The method did not give the pasta a practical time range, and the egg-and-meat casserole had no internal endpoint. | Keep eight portions. Cook pasta 8–10 minutes, or two minutes less than its shorter package time. Bake at 180°C for 40–45 minutes until the casserole centre reaches 74°C / 165°F; continue in five-minute increments if needed, then rest 30 minutes. Prep/cook/total estimate: 40/146/186 minutes; timed sequential cook stages sum to 146 minutes. |
| Tainan Danzai noodles (`danzai-noodles`) | The pork sauce lacked a ground-meat endpoint; the 30-second sprout blanch was not thorough cooking; total time omitted the full timed method. | Keep six small bowls. Check the largest ground-pork clump for 71°C / 160°F, continuing in three-minute increments if needed; check shrimp at 63°C. Simmer rinsed sprouts for two minutes until hot throughout. Timed method stages span an estimated 100.5–109 minutes; prep/cook/total estimate: 35/110/145 minutes. |

All portion, amount, time and method values above are editorial estimates, not source-verified measurements or timings. Existing recipe references support the dish identity and general preparation only. Official safety sources are labeled separately in each recipe's source list.

## Official food-safety guidance

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): egg dishes and ground meat to 71°C / 160°F; casseroles to 74°C / 165°F; shrimp and other seafood to 63°C / 145°F.
- [FDA — What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): cook egg dishes to 160°F / 71°C.
- [FDA — Fruits, Veggies and Juices (Food Safety for Moms-to-Be)](https://www.fda.gov/food/people-risk-foodborne-illness/fruits-veggies-and-juices-food-safety-moms-be): avoid raw sprouts and cook sprouts thoroughly. The two-minute simmer in this method is an editorial instruction, not an FDA-published time.

## Translation and review

Traditional Chinese, Japanese, Korean and Thai method changes were self-reviewed in one model pass. This was not an independent or human review. The execution environment does not expose a verifiable model selector, so I cannot confirm GPT-6 Luna and make no model-specific attribution.

## Regression coverage and limits

`test/recipe-method-regressions.test.mjs` covers 144 unique recipes across all five locales, including these four IDs. The [thirty-sixth batch regression](../../test/recipe-method-thirty-sixth.test.mjs) checks the 353-recipe registry, all 18 standing exclusions, unique coverage, serving counts, ingredient/method localization, amount and time arithmetic, safety endpoints, and separately labeled official sources. Shared-count assertions in older batch tests were refreshed for the expanded list.

Verification after the final code changes: all 20 cuisine draft audits passed; `npm test` passed 159/159 tests and its static audit; the separate `npm run build` generated 1,885 routes; the shared and batch-36 five-locale regression passed 60/60; and `git diff --check` passed. The recipe UI was not opened in a browser and no preview server or production check was run. No recipe was cooked.

## Changed paths

- Recipe methods and official-source labels: `src/brazilian-recipes-d.mjs`, `src/canadian-recipes-b.mjs`, `src/greek-recipes-a.mjs`, `src/taiwanese-recipes-b.mjs`.
- Shared coverage, batch regression and expanded shared-count checks: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-thirty-sixth.test.mjs`, and batch 22–35 test files.
- This audit report: `docs/research/recipe-method-audit-thirty-sixth-20261012.md`.
