# Recipe method audit — forty-third batch (2026-10-12)

## Scope and coverage

Base and intended parent: `28124f38578246655a1a864a3ec92ee8884acea7` on `codex/recipe-methods-forty-second-20261013`. Work branch: `codex/recipe-methods-forty-third-20261013`.

The registry remains at 353 existing recipes. The shared five-locale method regression now covers 172 unique recipes, including these four additions. The 18 standing exclusions remain unchanged; 163 eligible recipes remain for later review. No recipe, exclusion, draft, or date was added or removed. No repository `AGENTS.md`, `SKILL.md`, or `.agents/skills` regression guidance was present. I read the shared route regression and the preceding batch audit/tests before selecting these uncovered methods.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Acarajé (`acaraje`) | The shrimp step had only a time and colour cue, with no measured endpoint. | Keep 12 servings and the existing 520/35/555 minute fields. In all five locales, add 3–5 minutes as a guide, turn once, measure the thickest shrimp to 63°C / 145°F, check that it is firm, pearly and opaque, and continue in 30-second increments with a recheck if needed. |
| New England clam chowder (`new-england-clam-chowder`) | After steaming and shelling, the clams were only warmed briefly; the method did not establish a safe endpoint for the finished chowder. | Keep six servings and the existing 30/45/75 minute fields. Discard clams that stay closed after steaming. Return the chilled clam meat and bacon, then gently simmer 2–4 minutes until the chowder is at least 74°C / 165°F throughout; measure several places and recheck in 30-second increments. |
| Ham croquettes (`croquetas-de-jamon`) | The recipe did not allocate its croquettes across servings or verify the chilled filling's centre after frying. | Keep six servings and the existing 300/30/330 minute fields. Shape 18 croquettes of about 40 g each (three per serving). Fry in batches at about 175°C and measure the largest centre to at least 74°C / 165°F; recheck in 30-second increments, lowering oil to 160–170°C if the crust is already golden. |
| Arroz carreteiro (`arroz-carreteiro`) | The optional oil had no limit, and the rice-specific cooling rule conflicted with the inherited generic card (two hours and up to three days). | Keep six servings and the existing 45/50/95 minute fields. Use up to 20 ml oil only if rendered bacon fat does not coat the pan. Divide into six portions. Cool leftovers in shallow containers, refrigerate at 0–4°C ideally within one hour, use within 24 hours, and reheat only once until steaming throughout and at least 74°C / 165°F. Replace the generic storage card with this same rice-specific guidance in all five locales. |

The listed batch times, portion weights and allocations are editorial estimates for this recipe version, not claims from the dish references. Stage durations remain guides; equipment and ingredient sizes affect actual cooking time. Safety endpoints and rice-handling limits are attributed separately to official guidance below.

## Dish references

The references support dish identity and general preparation only. They are not presented as evidence for this site's exact amounts, serving counts or timing estimates.

- Acarajé: [Saveur — Acarajé Com Camarão](https://www.saveur.com/recipes/acaraje-brazilian-black-eyed-pea-fritters/) and [Olivia's Cuisine — 30 Authentic Brazilian Recipes](https://www.oliviascuisine.com/authentic-brazilian-recipes/).
- New England clam chowder: [Food Network Kitchen — New England Clam Chowder](https://www.foodnetwork.com/recipes/food-network-kitchen/new-england-clam-chowder-recipe-2043587) and [Sam LaGrassa — New England Clam Chowder](https://www.foodnetwork.com/recipes/new-england-clam-chowder-recipe0-1958350).
- Ham croquettes: [Foods & Wines from Spain — Croquetas de Jamón](https://www.foodswinesfromspain.com/en/fws-academy/recipes/2024/may/croquetas-de-jamon) and [Spanish Sabores — Croquetas de Jamón Serrano](https://spanishsabores.com/croquetas-de-jamon-serrano-recipe-ham-croquettes/comment-page-1/).
- Arroz carreteiro: [Receitas — Arroz carreteiro](https://receitas.globo.com/tipos-de-prato/acompanhamentos/arroz-carreteiro-simples-4f898f516c721c38b00179f9.ghtml) and [Brazilian Kitchen Abroad — Brazilian Rice](https://braziliankitchenabroad.com/brazilian-rice/).

## Official food-safety guidance

Official sources are separately labelled in the recipe source data.

- [FDA — Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely): cook seafood to 63°C / 145°F; shrimp should be firm, pearly and opaque.
- [FoodSafety.gov — Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): reheat leftovers to 74°C / 165°F.
- [UK Food Standards Agency — Home food fact checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker): cool cooked rice quickly, ideally within one hour; keep chilled and use within 24 hours; reheat only once until steaming hot.

## Translation and review

The English, Traditional Chinese, Japanese, Korean and Thai method and storage text was reviewed in one GPT-6 Luna pass. The requested Luna review was a read-only same-model self-review, not an independent model review, human translation review, or cooking validation. It found a real mismatch between the rice method and its inherited storage card; that mismatch is corrected and covered by a five-locale regression assertion.

## Verification and limits

- `npm test`: passed all 20 cuisine draft audits, build, static audit (10,816 files / 1,885 indexable routes), and 194/194 Node tests.
- `npm run build` independently after the full test: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-forty-third.test.mjs`: passed 60/60 tests.
- `git diff --check`: passed.

The recipes were not cooked. The site was not opened in a browser and its rendered recipe UI was not visually checked; regression coverage checks the localized recipe data and shared route/structured-data output only. No local preview server, headless browser, deployment, or production validation was used.

## Changed paths

- Methods, localized rice storage card, and separately labelled official sources: `src/american-recipes-b.mjs`, `src/american-source-map.mjs`, `src/brazilian-recipes-b.mjs`, `src/brazilian-recipes-c.mjs`, `src/brazilian-source-map.mjs`, `src/spanish-recipes-b.mjs`, `src/spanish-source-map.mjs`.
- Shared five-locale coverage, new batch regression and historical count assertions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-forty-third.test.mjs`, and current shared-count assertions in batch 22–42 tests.
- This report: `docs/research/recipe-method-audit-forty-third-20261012.md`.
