# Recipe method audit — forty-fourth batch (2026-10-12)

## Scope and coverage

Base and intended parent: `4c54b90c0597a49db4ab35aa127c4596ab1efdaf` on `codex/recipe-methods-forty-third-20261013`. Work branch: `codex/recipe-methods-forty-fourth-20261013`.

The registry remains at 353 existing recipes. The shared five-locale method regression now covers 176 unique recipes, including four new additions. The 18 standing exclusions remain unchanged; 159 eligible existing recipes remain for later review. No recipes, exclusions, route patterns, or timing metadata were added or removed. No repository `AGENTS.md`, `.agents/skills`, or repo `.agents` instructions were present. The prior batch report and method regression tests were read before selecting uncovered recipes.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Onigiri (`onigiri`) | The recipe did not state how many rice balls its listed rice and nori make, and its saved-food directions needed rice-specific handling. | State six onigiri, two per each of three servings. Keep prompt serving guidance and synchronize the method and storage card with the UK Food Standards Agency's cooked-rice advice: cool quickly, ideally refrigerate within one hour of cooking, use within 24 hours, and reheat once until steaming hot throughout. |
| Coxinha (`coxinha`) | The filling was not divided against the 12 croquettes; the cooked filling's cooling and the fried centre lacked explicit checks. | Chill the cooked filling in a shallow tray within two hours. Divide dough and filling into 12 equal matched portions. Check the largest croquette in each fry batch to 74°C / 165°F, then use 30-second finish-and-recheck increments; lower the oil if the crust browns before the centre reaches target. Add a localized leftover card. |
| Frikadellen (`frikadellen`) | Eight patties were not allocated against the four servings, and a browned crust alone did not establish a ground-meat endpoint. | Make eight equal patties about 20 mm thick, two per serving. Check the thickest patty in each batch to 71°C / 160°F, with 30-second increments and rechecks. Add a localized leftover card. |
| Chiles rellenos (`chiles-rellenos`) | The egg-batter frying step depended on colour and time without measuring the centre; the generic storage card did not state a reheating endpoint. | Check the largest chile in each batch to 71°C / 160°F for the egg dish, with 30-second increments and rechecks; reduce the oil if the batter darkens first. Add a localized leftover card with a 74°C / 165°F reheating endpoint. |

The localized leftover cards for the three non-rice dishes specify prompt cooling, refrigeration within two hours at 0–4°C for up to three days, and reheating only the portion needed to 74°C / 165°F throughout. The three-day limit is a conservative recipe instruction within FoodSafety.gov's published three-to-four-day window for relevant cooked leftovers.

All added cook-time ranges, portion allocations, temperatures for oil management, and handling workflow choices are separated from dish-reference facts. Exact method times and portion sizes are editorial estimates for these recipe versions, not source-recipe values. Official safe-temperature and storage limits are attributed separately below. No claim of kitchen validation or food-safety certification is made.

## Dish references

These sources support dish identity and general preparation; they do not substantiate this site's exact quantities, yield, timing, or editorial workflow.

- Onigiri: [Just One Cookbook — Onigiri Recipe](https://www.justonecookbook.com/onigiri-rice-balls/) and [Japanese Cooking 101 — Onigiri](https://japanesecooking101.com/rice-ball-onigiri-recipe/).
- Coxinha: [Olivia's Cuisine — Coxinhas](https://www.oliviascuisine.com/the-world-cup-gourmet-series-brazil-coxinhas-chicken-croquettes/) and [The Spruce Eats — Coxinha](https://www.thespruceeats.com/coxinha-brazilian-chicken-croquettes-3029668).
- Frikadellen: [The Daring Gourmet — Traditional Frikadellen](https://www.daringgourmet.com/frikadeller-frikadellen/) and [Food.com — Frikadellen](https://www.food.com/recipe/frikadellen-german-meat-patties-423250).
- Chiles rellenos: [Mexico in My Kitchen — Chile Relleno](https://www.mexicoinmykitchen.com/chile-relleno-recipe/) and [Pati Jinich — Chiles Rellenos](https://patijinich.com/chiles-rellenos/).

## Official food-safety guidance

Official sources are separately labelled in the recipe source data.

- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): ground meat 71°C / 160°F; poultry 74°C / 165°F; egg dishes 71°C / 160°F; leftovers reheated to 74°C / 165°F.
- [FoodSafety.gov — 4 Steps to Food Safety (Chill)](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety): refrigerate perishables within two hours, keep the refrigerator at or below 4°C / 40°F, and put leftovers in shallow containers promptly for faster cooling.
- [FoodSafety.gov — Cold Food Storage Chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts): relevant cooked leftovers are listed for three to four days at or below 4°C / 40°F; this batch uses a three-day recipe-card limit.
- [UK Food Standards Agency — Home food fact checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker): cool cooked rice quickly, ideally within one hour; refrigerate and use within 24 hours; reheat only once until steaming hot throughout.

## Translation and review

The recipe name, ingredient names and amounts, every method step, and the storage card remain localized in English, Traditional Chinese, Japanese, Korean, and Thai. A same-agent read-only content and translation pass was completed. The runtime did not expose a verifiable Luna model identifier, so this is not represented as a named Luna review or an independent review. No human translation review was performed.

## Verification and limits

- `npm ci --cache /tmp/recipenestvault-npm-cache`: installed the lockfile dependencies; no package or lockfile was changed.
- `npm test`: passed all 20 cuisine draft audits, built and audited 1,885 indexable routes across five locales, and passed 199/199 Node tests.
- `npm run build` independently after the full test: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-forty-fourth.test.mjs`: passed 60/60 tests, including the shared localized method and route regressions.
- `git diff --check`: passed.

The recipes were not cooked. No browser UI was opened or visually checked. No local preview server, headless browser, CDP session, deployment, or production validation was used.

## Changed paths

- Localized methods, storage cards, and official-source attribution: `src/japanese-recipes-c.mjs`, `src/brazilian-recipes-a.mjs`, `src/german-recipes-b.mjs`, `src/german-source-map.mjs`, `src/mexican-recipes-c.mjs`.
- Shared five-locale coverage, new batch regression, and current shared-count assertions in batch 22–43 tests: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-forty-fourth.test.mjs`, and the existing batch tests.
- This report: `docs/research/recipe-method-audit-forty-fourth-20261012.md`.
