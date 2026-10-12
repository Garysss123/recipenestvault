# Recipe method audit — forty-second batch (2026-10-12)

## Coverage

Created `codex/recipe-methods-forty-second-20261013` from the specified base `fbaa16cd6b2ff148854c73e0010ae206505be225` on `codex/recipe-methods-forty-first-20261013`. The registry remains 353 recipes. Shared five-locale method coverage grows from 164 to 168 unique IDs. The same 18 standing exclusions remain, leaving 167 eligible recipes for later review. All four selected IDs were absent from prior coverage and are not excluded.

No `AGENTS.md`, `SKILL.md`, or `.agents/skills` regression instructions were present. I reviewed the preceding audit report, current candidate methods, and cumulative regression assertions before editing. No recipe was added or removed, and the report date follows the workspace date rather than the branch suffix.

## Findings and changes

| Existing recipe | Finding | Change |
| --- | --- | --- |
| Gimbap (`gimbap`) | The rice method lacked a serving window and practical leftover limits. Its listed 20 ml neutral oil exceeded the 15 ml used by the egg, ham, and carrot steps. | In all five locales, say to serve within two hours of cooking the rice; cool leftovers quickly in a shallow covered container, refrigerate ideally within one hour, use within 24 hours, and avoid room-temperature holding beyond two hours. Reduce neutral oil to 15 ml and assert all three 5 ml uses. Add the UK Food Standards Agency rice-handling source. Existing timing remains 55/35/90 minutes. |
| Rice kheer (`rice-kheer`) | Prep time omitted the explicit 20-minute soak and 10-minute drain. The full elapsed time also omitted the final 10-minute rest. Rice leftovers lacked specific storage and reheating limits. | Set prep/cook/total to 30/65/95 minutes. Cook time includes 10 minutes reducing milk, 30–35 minutes cooking rice, 8–10 minutes dissolving sugar, 3 minutes infusing, and a 10-minute rest. In all five locales, rapidly cool chilled portions, refrigerate at 4°C or colder ideally within an hour, use within 24 hours, and reheat only once to steaming throughout and at least 74°C. Add official rice and leftover guidance sources. |
| Gua bao (`gua-bao`) | The pork braise used a skewer tenderness cue without a measurable safety endpoint or continuation check. The bun filling did not state per-bun equivalents. | In all five locales, check the thickest lean centre: official whole-cut pork guidance is 63°C / 145°F followed by a three-minute rest. Clearly label 85°C / 185°F as this site's tenderness estimate, not an official safety guarantee; continue in 10-minute increments and recheck temperature and skewer cues. State eight portions with about 100 g raw-pork equivalent, 25 g greens, and 12 g peanut sugar per bun. Add FoodSafety.gov guidance. Existing timing remains 150/130/280 minutes. |
| Spanakopita (`spanakopita`) | The egg filling had a browned-crust endpoint but no measured internal temperature; its 15-minute rest was absent from the cook estimate. | In all five locales, identify 35–40 minutes at 190°C as a site estimate, check the thickest spinach-and-egg filling centre to the official 71°C / 160°F egg-dish endpoint, continue in five-minute increments and recheck, and shield early browning with foil. Include the 15-minute rest in prep/cook/total estimates of 45/60/105 minutes. Add FoodSafety.gov guidance. |

## Official guidance checked

The [UK Food Standards Agency's Home food fact checker](https://www.gov.uk/government/publications/home-food-fact-checker/home-food-fact-checker) advises cooling rice quickly, ideally within one hour, keeping refrigerated rice for no more than one day, reheating it only once, and reheating until steaming hot throughout. [FoodSafety.gov's safe minimum internal temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) gives 63°C / 145°F plus a three-minute rest for whole pork cuts, 71°C / 160°F for egg dishes, and 74°C / 165°F for leftovers.

The 85°C / 185°F gua-bao tenderness target and all recipe timing and portion estimates are editorial estimates, not official safety thresholds or source guarantees. The FSA source supports rice handling, while FoodSafety.gov supports the named internal-temperature endpoints. Dish-method references remain separate from official safety sources.

## Translation and review

English, Traditional Chinese, Japanese, Korean, and Thai recipe steps and ingredient allocations were checked. A GPT-6 Luna same-model read-only review found and prompted correction of two concrete issues: rice kheer's omitted rest time and gimbap's unused 5 ml neutral oil. A final same-model pass found no remaining concrete issue. This is a same-model review, not independent or human review.

No food was cooked as part of this review. The recipe UI was not opened; no browser, preview server, CDP, deployment, or production check was run.

## Regression and verification

`test/recipe-method-regressions.test.mjs` now covers 168 IDs across all five locales. The [forty-second-batch regression](../../test/recipe-method-forty-second.test.mjs) verifies the 353-entry registry, 18 exclusions, the 164 prior reviewed IDs, the four eligible additions, localized ingredients and methods, serving allocations, timing, doneness checks, oil arithmetic, and official-source labels. Historical shared-coverage assertions were advanced to the current count without removing recipe-specific checks. Dependencies missing from the environment were restored with `npm ci` from the existing lockfile; no package or lockfile changes were made.

- `npm test`: passed; all 20 draft audits, build, static audit, and 189 Node tests passed.
- Independent `npm run build`: passed; 1,885 indexable URLs across five locales.
- Five-locale method regression (`node --test test/recipe-method-regressions.test.mjs test/recipe-method-forty-second.test.mjs`): passed, 60 tests.
- `git diff --check`: passed.

## Changed paths

- Recipe methods and source maps: `src/korean-recipes-b2.mjs`, `src/korean-recipe-helpers.mjs`, `src/indian-recipes-e.mjs`, `src/indian-recipe-helpers.mjs`, `src/taiwanese-recipes-b.mjs`, `src/greek-recipes-a.mjs`, and `src/greek-source-map.mjs`.
- Shared coverage and regressions: `test/recipe-method-regressions.test.mjs`, `test/recipe-method-forty-second.test.mjs`, and historical `test/recipe-method-*.test.mjs` cumulative coverage assertions.
