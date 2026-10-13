# Recipe method audit — eightieth batch (2026-10-13)

## Scope and coverage

Work branch: `codex/recipe-methods-eightieth-20261013`, created directly from the authorized seventy-ninth batch commit `389f4abfdd65e774f995bf9f137d0fed0aa93fbe`.

The registry remains at 353 unique recipes. The exact-slug, five-locale method ledger advances from 316 to 320 unique recipes. The same 18 standing exclusions remain unchanged, leaving 19 eligible recipes before this batch and 15 after it (353 − 18 − 320). `jiufen-taro-balls`, `maple-taffy`, `injera`, and `hummus` were eligible and had specific unfinished method, doneness, or recovery guidance. The original source drafts were reviewed; ingredients, servings, prep/cook/total times, natural step counts, and illustration scene mappings were preserved.

README, TODO, shared coverage and exclusion ledgers, and historical batch regressions were reviewed. No repository `AGENTS.md` or `.agents/skills/` files were present. All 18 excluded slugs and source drafts remain preserved. The package has **20 draft-audit commands**; the recipe registry has **21 source groups**. These are separate counts.

## Recipe revisions and food-safety decisions

- **Jiufen taro balls:** Five-language steps now steam the largest root pieces until a skewer passes freely, weigh each cooked mash before adding starch, and give measured water/starch recovery for dough that cracks or sticks. After all pieces float, simmer two more minutes and cut a large piece to check for a hot, evenly chewy centre without a dry, chalky starch core; simmer in one-minute increments if needed. Fresh QQ chew is a quality cue, separate from reheated-leftover safety guidance.
- **Maple taffy:** Replaced unrelated chocolate-bar advice. Syrup is boiled toward 114–116°C/237–240°F at sea level, with the time treated as variable and local pressure accounted for. A cold-water soft-ball check confirms the candy texture; stop heating when the ball forms and flattens easily. This is a confectionery texture target, not a food-safety minimum. The method also controls boil-over, keeps snow-contact syrup out of the pan, and gives distinct recovery cues for brittle or smeared taffy.
- **Injera:** The method gives a measured flour-water-starter mix, loose cover and variable fermentation timing, batter-flow correction, skillet test, and a covered cook until many small holes form and the surface is matte and dry. Bubbles, a liquid layer, and a clean tang are explicitly fermentation/flavour cues, not safety proof. Following FDA raw-flour guidance, it says not to taste uncooked batter; visible mold, pink/orange patches, or foul odor means discarding the entire batch. Surface texture is a cooking-quality cue, not an invented thermometer threshold.
- **Hummus:** Five-language instructions begin with about 45 ml of the listed ice water, then add 15 ml at a time until smooth and glossy, flowing from a spoon in a thick ribbon. Over-thick or grainy hummus is corrected by scraping and brief blending before measured water additions; an over-loose batch is chilled before further adjustment. These are texture checks, not safety tests.

FoodSafety.gov's [4 Steps to Food Safety](https://www.foodsafety.gov/keep-food-safe/4-steps-to-food-safety) was checked for hand/tool hygiene, cold holding at or below 4°C/40°F, shallow containers, and refrigeration within two hours (one hour above 32°C/90°F). Its [safe minimum temperature chart](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) identifies leftovers of any type at 74°C/165°F; the recipes use this only for reheated leftovers, never as a fresh texture cue or for candy. The [FDA raw-flour guidance](https://www.fda.gov/consumers/consumer-updates/flour-raw-food-and-other-safety-facts) says not to taste raw flour, dough, or batter; it supports the injera handling instruction. Hummus is a ready-to-eat dip and has no cooking endpoint. No microbial safety claim is inferred from fermentation appearance, sour aroma, candy stage, or texture.

Method cross-checks used both listed culinary sources for each recipe: [Cooking in Chinglish](https://cookinginchinglish.com/taro-balls/) and [VanFoodies](https://vanfoodies.com/2020/05/22/recipe-taiwanese-taro-and-yam-balls/) for taro balls; [Maple from Canada](https://maplefromcanada.ca/recipes/maple-taffy/) and its [Kids recipe](https://kids.maplefromcanada.ca/cook/recipes/magical-maple-taffy-on-snow/) for maple taffy; the [FAO tef compendium](https://www.fao.org/fileadmin/user_upload/inpho/docs/Post_Harvest_Compendium_-_TEF.pdf) and [ANU Museum recipe](https://foodish.anumuseum.org.il/en/recipe/ethiopian-injera/) for injera; and [The Mediterranean Dish](https://www.themediterraneandish.com/how-to-make-hummus/) and [BBC Good Food](https://www.bbcgoodfood.com/recipes/hummus) for hummus. Maple references support the soft-ball target, cold-water test, and pressure-dependent reading; the FAO reference supports the traditional starter, fermentation, and liquid separation; BBC Good Food supports gradual water adjustment and a smooth endpoint.

## Regression and verification

- `npm ci --cache /tmp/recipenestvault-npm-cache --no-audit --no-fund` installed dependencies from the existing lockfile. `package.json` and `package-lock.json` were not changed.
- Focused batch/shared-route regression passed all 77 tests: `node --test test/recipe-method-eightieth.test.mjs test/recipe-method-regressions.test.mjs test/recipe-method-seventy-seventh.test.mjs test/recipe-method-seventy-eighth.test.mjs test/recipe-method-seventy-ninth.test.mjs`.
- Full `npm test` passed all 20 draft-audit commands, built 1,885 indexable URLs across five locales, passed the static audit over 10,816 files and 1,885 routes, and passed all 395 Node tests (0 failures).
- Independent `npm run build` passed and generated 1,885 indexable URLs across five locales.
- Independent `npm run audit` passed over 10,816 files and 1,885 indexable routes.
- `git diff --check` passed.

No UI/browser review, physical test cooking, or deployment was performed.

## Change accounting

Implementation: `src/recipe-method-audit-eightieth.mjs`, registered in `src/recipes.mjs`. New batch regression: `test/recipe-method-eightieth.test.mjs`. The shared exact-slug ledger now lists 320 reviewed recipes. Historical batch assertions update cumulative coverage and end-relative windows so they continue checking their original slugs. The existing 18 exclusions, source drafts, and unrelated recipe content remain unchanged.
