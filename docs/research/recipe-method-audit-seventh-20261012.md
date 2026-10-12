# Recipe method audit — seventh batch (2026-10-12)

## Coverage

Base: `b7df1759a4e5f47d7b2f6c3102136c40946e6f06` on `codex/recipe-methods-sixth-20261012`.

The registry has 353 recipes and 353 unique IDs. The first six batches had deeply reviewed 24 recipes; the 18 recipes listed in the sixth-batch report remain excluded from this audit. That leaves 311 eligible recipes before this batch and 307 after it. These counts concern the recipe registry and reviewed IDs, not the number of automated assertions.

This batch adds four distinct IDs to the deep-review coverage: `mohinga`, `nepali-chicken-momo`, `trinidad-doubles`, and `nasi-lemak`. Combined with the previous 24, the cumulative deep-review count is 28. The earlier coverage and exclusions are documented in [the sixth-batch audit](recipe-method-audit-sixth-20261012.md) and the regression ID list in `test/recipe-method-regressions.test.mjs`.

The earlier broad scan flagged 48 recipes without a numeric animal-food temperature and 21 without an explicit duration. Those are candidate signals, not proof of defects. In particular, this batch did not add temperatures to Mohinga: its existing fish-flaking endpoint is a recognized visual doneness cue, and the recipe now cites FoodSafety.gov’s seafood guidance. The scan’s counts were not treated as a target for edits.

## Findings and changes

| Recipe | Finding | Change |
| --- | --- | --- |
| Mohinga | The aromatic-base step called for “a little oil” with no corresponding oil ingredient or amount. | Added 15 ml neutral oil and allocated all of it to that step in five locales. The exact amount for this particular site formula was not recoverable from the references: SBS uses a different formula with ½ cup peanut oil and Myanmar Digital News gives a local measure. The 15 ml is an explicit editorial normalization for this recipe, not a recovered historical quantity. Added FoodSafety.gov to support the existing fish-flaking doneness cue; no arbitrary numeric temperature was added. |
| Nepali chicken momo | The achar method used unlisted garlic, chili, and salt, while the listed garlic did not distinguish filling from chutney. | Kept the 20 g garlic total and allocated 15 g to filling and 5 g to achar. Added 3 g fresh red chili and 3 g fine salt for achar, and allocated the listed sesame and salt in the method. These small achar amounts are explicit house-formula choices; the precise amounts in the site’s existing version were unknown. Added a momo achar reference and FoodSafety.gov for the existing 74°C chicken endpoint. |
| Trinidad doubles | The bara dough method called for unlisted salt; the channa method left its salt and oil use vague beside the separate shallow-frying oil. | Added 6 g fine salt, split into 3 g for dough and up to 3 g for channa; added a distinct 15 ml neutral oil for channa; clarified that the separate 450 ml is frying oil and allocated it in the bara method. All allocations are localized. The salt and channa-oil quantities are explicit choices for this recipe; the cited versions use different amounts and formulations, so these are not represented as exact source quantities. |
| Nasi lemak | The egg method allowed any preferred doneness, including an undercooked egg, without safety guidance. | In all five locales, the default endpoint now requires both white and yolk to be firm. It directs diners preferring soft or undercooked eggs to use pasteurized eggs, following FDA guidance. No thermometer instruction was added. |

The candidate `uzbek-plov` was checked and rejected after source-level review: its “hot water to the rice surface” direction did not demonstrate a missing amount or method defect. It is not counted as a deep review in this batch.

Luna reviewed all four final recipe diffs, five-language method text, and source mappings. Luna confirmed each finding was a real method, allocation, or safety gap and found no material translation regression or blocking safety issue. Luna also confirmed that the added quantities for Mohinga, momo achar, and doubles are site choices rather than exact amounts established by the linked source variants.

## Source verification

- FDA, [What You Need to Know About Egg Safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): cook eggs until whites and yolks are firm; use pasteurized eggs for recipes that use raw or undercooked eggs.
- FoodSafety.gov, [Safe Minimum Internal Temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): poultry reaches 165°F (74°C); fish reaches 145°F (63°C), with opaque flesh that flakes easily as a visual cue.
- SBS Food, [Mohinga](https://www.sbs.com.au/food/recipe/mohinga/hbuscxazn), and Myanmar Digital News, [Traditional Myanmar Cuisine: Mohinga](https://mdn.gov.mm/my/node/203371): source variants inform the dish; they do not establish the exact oil quantity for this site’s adapted version.
- Nepalese Taste, [Momo Achar](https://nepalesetaste.com/recipes/momo-achar/): supports the use of garlic, chili, sesame, and salt in momo achar; the exact site-specific amounts remain editorial choices as stated above.
- Foodie Nation, [Trinbagonian Doubles](https://www.foodienationtt.com/single-post/trinbagonian-doubles-recipe-by-chef-shaun), and Epicurious, [Doubles](https://www.epicurious.com/recipes/food/views/doubles-234097): corroborate that the bara dough and channa uses are distinct and that frying oil is separate from the curry’s oil.

## Regression coverage and limits

Recipe-specific assertions now cover all four additions, their ingredient allocations, five-locale method text, and relevant official sources. The existing cross-locale regression also checks the rendered ingredient list and Recipe JSON-LD against authored data. No `localdrafts` content was changed. This was a source, translation, and automated regression review; no cooking or UI validation is claimed.
