# Recipe method audit — fifty-fourth batch (2026-10-12)

## Scope and coverage

Base: exact commit `9b4e2bd1dec2cbc3376a3bd814a35f7f1b05d03b`, parent `073775338528707f1a52e1331f5987499714a10c`, tree `2a93fbc245168d667a56469e95bf9ae3cf4db775`, the requested tip of `codex/recipe-methods-fifty-third-20261013`. Work branch: `codex/recipe-methods-fifty-fourth-20261013`, created directly from that base commit.

Read the README and checked for `AGENTS.md` and relevant skill files; none were present. The exact shared five-locale review ledger is `test/recipe-method-regressions.test.mjs`; the standing 18-slug exclusion set is in `test/recipe-method-fiftieth.test.mjs`. At the base, the registry contained 353 unique recipe IDs, with 212 unique deep-review IDs and 18 exclusions; 123 eligible recipes remained. The four selected slugs were absent from both the base ledger and exclusions: `risotto-alla-milanese`, `lasagne-bolognese`, `small-sausage-big-sausage`, and `pulpo-a-la-gallega`. The shared ledger now contains 216 unique IDs; 119 eligible recipes remain. The recipe registry and generated indexable URL count remain 353 recipes and 1,885 URLs.

The method refinements clone each selected published recipe before editing it. Source drafts remain unchanged.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Risotto alla Milanese (`risotto-alla-milanese`) | The saffron stock was listed inside the stock total but its separate amount was unclear; the stock-stage timing did not reconcile with the cook estimate. Rice-specific leftover guidance was missing. | Allocate the 1.2 L stock as 120 ml for saffron plus 1.08 L for rice, without double counting. Clarify a 16–18 minute stock stage and four portions at about 80 g dry-rice equivalent each. Mark the timing as a texture estimate. Add rice-specific rapid cooling, refrigeration within 1 hour where possible, 24-hour storage, and one-reheat guidance. |
| Lasagne Bolognese (`lasagne-bolognese`) | The sheet, ragù, béchamel, and cheese quantities needed layer-by-layer destinations; the bake time needed separation from the safety endpoint. | Specify four layers of three sheets, allocate the listed 900 g ragù, béchamel, and cheese across all layers, and divide the pan into eight portions. Label the 35–40 minute bake as an estimate and use 74°C / 165°F at the casserole centre as the safety check. Separate official 3–4 day cooked-meat storage guidance from the recipe's three-day best-texture preference. |
| Small sausage in big sausage (`small-sausage-big-sausage`) | Salt and oil totals were inconsistent with the method; the six-link yield, soak/cook time, and cooked-rice storage needed clearer destinations. | Keep the listed totals at 6 g salt and 15 ml oil, allocating them in all five locales to rice/cucumber and rice-link brushing. Specify six portions, include the six-hour soak in the 390-minute prep estimate, and set the steam/rest/browning estimate to 55 minutes. Use already-cooked pork sausages as specified and follow package reheating directions rather than imposing a raw-meat endpoint. Add the same rice-specific cooling, storage, and reheating guidance as the risotto. |
| Pulpo a la Gallega (`pulpo-a-la-gallega`) | Frozen-thaw time was outside the prep estimate; cooking-liquid, potato, seasoning, and serving allocations needed clearer quantities. The tenderness cue and seafood safety check needed separation. | State that frozen octopus thaws overnight in the refrigerator and that this time is not in the 20-minute prep estimate. Use 2 L of measured cooking liquid for potatoes, allocate seasonings and oil across six servings, and set the cook estimate to 90 minutes, including water heating, octopus, draining, potato cooking, and plating. Present 63°C / 145°F only as FDA's general minimum for most seafood, not an octopus-specific finding; keep skewer tenderness separate and label the 40–50 minute octopus time as an estimate. State that the official cold-storage chart gives no cooked-octopus window, so the one-day advice is a quality preference; reheat leftovers to the official 74°C / 165°F endpoint. |

All method, quantities, times, servings, and storage cards are synchronized in English, Traditional Chinese, Japanese, Korean, and Thai. Estimates and quality preferences are identified separately from official safety limits. No unrelated meat endpoint is imposed on the rice links or octopus tenderness cue.

## Official food-safety references checked

- [UK Food Standards Agency: Home Food Fact Checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker) — cooked-rice guidance: cool quickly, ideally within one hour; refrigerate up to 24 hours; reheat once until steaming hot.
- [FoodSafety.gov: Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) — casseroles and leftovers at 74°C / 165°F; most seafood at 63°C / 145°F.
- [FoodSafety.gov: 4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) — avoid cross-contamination and refrigerate perishable food promptly.
- [FoodSafety.gov: Cold Food Storage Charts](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) — refrigerator at or below 4°C / 40°F and 3–4 days for cooked meat/poultry leftovers; no cooked-octopus duration is listed.
- [FDA: Selecting and Serving Fresh and Frozen Seafood Safely](https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely) — seafood separation, safe thawing, and FDA's general seafood guidance. The recipe does not present the general temperature as octopus-specific.

The dish-source references already on each recipe remain distinct from the official safety sources added for this review.

## Review and verification

This was a same-model self-review, not independent or human review. No verifiable runtime model identifier was exposed, so none is claimed.

- `npm test`: passed all 20 cuisine draft audits, built 1,885 URLs, passed the static audit, and passed 249/249 Node tests.
- Independent `npm run build`: passed; generated 1,885 indexable URLs across five locales.
- `node --test test/recipe-method-regressions.test.mjs test/recipe-method-fifty-fourth.test.mjs`: passed 60/60.
- `git diff --check`: passed.

The recipes were not cooked. No full-page UI or visual review was performed. No preview/local server, headless browser, CDP session, security-setting change, deployment, or production validation was used.

## Changed paths

- Published-method refinements and import hook: `src/recipe-method-audit-fifty-fourth.mjs`, `src/recipes.mjs`.
- Four new five-locale recipe detail assertions: `test/recipe-method-fifty-fourth.test.mjs`.
- Shared review ledger and current coverage counts: `test/recipe-method-regressions.test.mjs` and the existing `test/recipe-method-*.test.mjs` coverage checks. Historical position assertions were advanced to keep checking their original slugs after the four new ledger entries were appended.
- This audit report: `docs/research/recipe-method-audit-fifty-fourth-20261013.md`.
