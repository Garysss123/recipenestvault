# Vietnamese recipes B — research and readiness

2026-09-12. Seven complete five-language drafts are ready in `src/vietnamese-recipes-b.mjs` (export `vietnameseRecipesB`). Every step includes its English `imageScene`. Structural import, five-language fields, step-scene presence, temperature parity and prep + cook totals pass. Counts: chả giò 8; bánh xèo 8; bánh cuốn 7; bánh mì thịt 6; cơm tấm 8; cao lầu 8; mì Quảng 10. Total 55 natural steps. The 10-step mì Quảng must not be squeezed into nine illustrations.

Collaboration messaging is not exposed in this child tool context. This shared note is the early-ready notification for illustration generation. The draft is content-ready, not an assertion that its photos or illustrations are approved.

## Sources read and independent synthesis

All below were actually read through the web tool on 2026-09-12, including ingredient and instruction sections. Vicky Pham's direct page repeatedly timed out during open, but a targeted search returned the complete author-authored recipe, ingredients, preparation, broth, serving and notes. That is the evidence used, not an assumed successful HTTP response. The final source checker should separately verify the direct URL if its availability changes.

| Recipe | Direct sources | Decisions and photo requirements |
| --- | --- | --- |
| chả giò | [Hungry Huy](https://www.hungryhuy.com/vietnamese-spring-rolls-egg-rolls-recipe-cach-lam-cha-gio-nem-ran/), [Delightful Plate](https://delightfulplate.com/vietnamese-fried-spring-rolls/) | Compared wheat-wrapper diaspora and rice-paper versions; draft selects frying-grade thin rice paper, pork + shrimp + glass noodles, dry vegetables, two frying stages. Hero must be blistered fried rolls, not transparent fresh rolls. Cilantro and clear dipping sauce included; optional carrot/cucumber flower garnish added after photo note. |
| bánh xèo | [Delightful Plate](https://delightfulplate.com/crispy-vietnamese-crepe-banh-xeo/), [Hungry Huy](https://www.hungryhuy.com/banh-xeo-savory-vietnamese-crepes/) | Rice flour with cornstarch, coconut milk and turmeric; large thin skillet crêpes, precooked pork and shrimp, sprouts, lettuce and herbs. No egg in batter, no mandatory mung-bean layer. Hero should show yellow half-moon with visible pork/shrimp/sprouts. |
| bánh cuốn | [Hungry Huy](https://www.hungryhuy.com/banh-cuon/), [Wok and Kin](https://www.wokandkin.com/banh-cuon/) | Traditional cloth-steamer vs covered skillet compared. Draft transparently selects pan-method premix, starts at 250 g : 750 ml water and requires first-sheet test because brands differ. Pork, wood ears, jicama; fried shallots, chả lụa, cucumber, sprouts and herbs are all listed. Hero must show soft white rice-flour rolls, not dried rice-paper fresh rolls. |
| bánh mì thịt | [Andrea Nguyen](https://www.vietworldkitchen.com/blog/2009/06/banh-mi-sandwich-recipe.html), [Hungry Huy](https://www.hungryhuy.com/banh-mi-recipe/) | Cold-cut version aligned to selected photograph: ready-to-eat pork pâté, chả lụa, pork ham, mayo, cucumber, cilantro, carrot-daikon refrigerator pickles and optional chile. Homemade pickles are not shelf-stable canning. Hero must not depict a grilled-pork-only sandwich. |
| cơm tấm sườn nướng | [Hungry Huy](https://www.hungryhuy.com/vietnamese-pork-chops/), [Wok and Kin](https://www.wokandkin.com/vietnamese-grilled-pork-chops/) | Thin lemongrass pork chops, 3-hour refrigerated marinade, two-zone grill, thermometer check and rest, quantified broken rice and scallion oil. Cucumber, tomato, drained premade Vietnamese pickles and fish-sauce dip included. No egg, steamed pork loaf or shredded pork skin in selected base plate; change notes only if hero genuinely needs an optional side. |
| cao lầu | [Vietnam Tourism Board / Spice Viet recipe PDF, page 3](https://vietnam.travel/sites/default/files/2020-10/Recipes%20from%20Vietnam%20Tourism%20Board.pdf), [Nomadic Boys cooking-class recipe](https://food.nomadicboys.com/recipe-for-vietnamese-cao-lau/) | Both show marinated browned pork with reduced sauce and herbs. Uses actual fresh cao lầu noodles when obtainable; fresh udon is explicitly a different home adaptation. Fried wonton squares are disclosed as the accessible crouton alternative, supported by the cooking-class version. Hero requires brownish thick noodles, sliced pork, herbs and crisp squares, shallow sauce; no chicken or shrimp. |
| mì Quảng | [Vicky Pham](https://vickypham.com/blog/central-vietnams-must-eat-noodle-dish-mi-quang/), [Delightful Plate](https://delightfulplate.com/mi-quang-vietnamese-quang-noodle/) | Pork-shrimp version with separate cooking stages; pork-bone/shrimp-head stock, turmeric noodles, hard quail eggs, peanuts, herbs, sesame crackers. Delightful Plate's main method is chicken but explicitly explains pork/shrimp/egg variations and small broth serving. Hero must show pork-shrimp variation, not chicken-dominant soup. Noodles are broad yellow rice noodles, broth sits below them. |

## Standardization and safety

Recipes are original standardized drafts, not copied or translated author instructions and not represented as kitchen-tested. Deliberate editorial changes include quantified garnish and dip amounts, non-washing of raw meat, refrigerated marination, dedicated raw/cooked utensils, cold storage, thermometer checks, and staggered preparation.

Safety standards checked against [FoodSafety.gov cooking temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures) and [cold-food storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts). The official shrimp endpoint is opaque/pearly flesh; the draft also supplies a conservative measurable 63°C check.

- Chả giò mixed pork/shrimp/egg filling is checked at 74°C; first and second fry are separate meaningful stages.
- Bánh cuốn ground pork reaches 71°C. Shrimp in bánh xèo and mì Quảng reaches 63°C.
- Whole pork chops reach 63°C and rest at least 3 minutes. Cao lầu shoulder reaches a higher tenderness target, at least 85°C; this is a texture endpoint, not the minimum safe temperature for all pork.
- Leftovers are refrigerated within 2 hours below 4°C, and reheated to 74°C where applicable. Rice and broth use separate shallow containers.

## Validation

`node --check src/vietnamese-recipes-b.mjs` passes. A module-based check confirmed all 7 IDs, 55 steps, imageScene on every step, all localized narrative fields, prep + cook = total, and identical numeric °C facts across all five languages. This does not replace the parent full draft audit, photo approval, image review, browser QA or deployment gate.

## Photo cross-check while drafting

I visually opened all seven candidate dishes plus alternatives. `banh-mi-thit.jpg` matches the cold-cut draft. `com-tam-suon-nuong.jpg` has only pork/rice/scallion/cucumber, so it fits (other listed sides may stay optional/off-frame). `banh-cuon.jpg` matches white pork-mushroom rice rolls and herb/shallot topping, with optional sides off frame. `cao-lau.jpg` shows thick pale-beige alkaline noodles, thin browned pork and crisp square toppings; compatible.

`mi-quang.jpg` needs parent/photo-agent attention before approval: its own author description explicitly says pork/shrimp but also **tomato-tinged broth and small dried shrimp**, and pixels show **white wide noodles**, unlike the current yellow turmeric-noodle draft. Prefer replacing that candidate with a simpler yellow pork-shrimp mì Quảng reference, or deliberately add a documented white-noodle serving variant and quantified optional dried-shrimp/tomato broth variation. Do not mark the current photo an exact match silently. The current 10 imageScene specifications remain tied to the yellow-noodle draft.

Candidate list already includes `File:Mi Quang 1A Danang.jpg` (4032 × 3024), whose author explicitly describes pork and shrimp. This is a promising alternative to inspect; I did not download or approve it in the photo agent's workspace.

`banh-xeo-alt.jpg` includes cucumber, tomato and carrot-daikon pickles besides greens; these are disclosed as optional accompaniments in the final draft. `cha-gio-alt.jpg` avoids the ornamental garnish in the initial candidate and is preferable. The initial `cha-gio.jpg` green garnish looks like **curly parsley**, not cilantro; do not identify it as cilantro in the photo review.

## Global integration handoff

The follow-up integration task is implemented: aggregator A/B/C1/C2/C3/C4 (21 recipes, 172 current steps); publication/photo/illustration imports; five-language Vietnamese collection copy; lotus-green/rose/sand UI palette; build date 2026-09-12; npm audit/manifest scripts and test gate; README release policy; and 12 additional browser cases for the five collections, representative 6/7/10/11-step recipes, search and mobile language navigation.

`scripts/audit-vietnamese-drafts.mjs` checks complete locales, measurable times/amounts/cuts and temperature ranges, source identity, photo license/provenance/hash/dimensions, source-sheet provenance, separate step images, exact 1:1 mappings, hand-free flags and structured-data exclusion. Shared-unit allocation notation and equivalent unit conversions are parsed without changing cooking facts. The stronger audit identified omitted "20 minutes" in the Japanese/Korean/Thai mì Quảng mistake note; those three translations were completed.

At handoff the audit reports **only the expected missing illustration manifest/sets**, while all current recipe facts and licensed photographs pass. It cannot pass the release gate until the parent's generated manifest and image assets are ready. No browser QA, image generation, build artifact upload, commit or deployment was run by this child.

Search inspection revealed that existing NFKC-only search did not match `banh mi` to `Bánh Mì`. `public/assets/search.js` now folds Latin combining accents and Vietnamese đ while preserving Japanese, Korean and Thai writing. A direct check verified those transformations; the browser case checks both accented and unaccented input. The build already includes search.js in its content-version hash.

Palette contrast checks: primary on paper 6.92:1, primary on lotus-soft 5.68:1, secondary on background 5.34:1, white button text on primary 7.04:1, sidebar rose on dark green 7.51:1. Syntax checks and `git diff --check` pass.

## Final review corrections and live GET verification

2026-09-12 04:36 UTC: all **14 direct recipe sources returned HTTP 200 to an actual GET** with content validation. Thirteen returned real HTML with ingredient and method text; twelve also included Recipe JSON-LD. The Vietnam Tourism Board returned a valid `%PDF-` file (1,032,611 bytes), whose cao lầu recipe content had already been read on page 3. No 401, 403, 429 or challenge page was accepted as a pass. Vicky Pham's earlier web-open timeout is now resolved by this successful GET.

| Recipe / author | HTTP | Response bytes | SHA-256 |
| --- | --- | --- | --- |
| chả giò / Hungry Huy | 200 | 665625 | `414bd289c4bb7218d4f3978c28893197132241661a1c009938a798bafda077fd` |
| chả giò / Delightful Plate | 200 | 669278 | `4577d734e2d5ab6eea1042c8cf791aa7f0c637b54dffdea84daa2197d61072c8` |
| bánh xèo / Delightful Plate | 200 | 669395 | `1bbda19b31d8765b2cc05d83b5dbed79b999b30f8b706fab7eedba7f003a1c2d` |
| bánh xèo / Hungry Huy | 200 | 675055 | `ffd7fedff1301fcc4517b1e26d611ec219e88cb2a385d568a0b84befd8840432` |
| bánh cuốn / Hungry Huy | 200 | 599482 | `2c23ca6ee5d5c9d067c9f88351f6e866710f4e98b6a1db26a5b66e9ec5bad418` |
| bánh cuốn / Wok and Kin | 200 | 531250 | `833965c6dc9013008d8715fcbf5da74d10d4284f87b02718e3040b9b34e54ce1` |
| bánh mì / Andrea Nguyen | 200 | 416688 | `ecbcc6f8e0c526467bb44afda9d647f99a764dc7534c9c5a72ed9878c51d64de` |
| bánh mì / Hungry Huy | 200 | 547383 | `2b077b91709e2150ea92ffe440beb0a4129596f997f27ba1b05e7cf37755cf6a` |
| cơm tấm / Hungry Huy | 200 | 671742 | `a2e5e04a9b2d7448352dc2edb1169f3679b653a9136b426fc9813690d6ff0fc6` |
| cơm tấm / Wok and Kin | 200 | 535206 | `9d3f0fa3f1d0d825f5873baf806dcddde4a1942f770729b38c3ff45a10234d24` |
| cao lầu / Vietnam Tourism Board | 200 | 1032611 | `55836470cf5300c8402521b2d420896dc25e2619358684f54db0b1ff7547edd3` |
| cao lầu / Nomadic Boys | 200 | 143831 | `0c4fe22df2947ae3c1388d80a0b1dd080041a61f3761d920e426c33c3f6924d4` |
| mì Quảng / Vicky Pham | 200 | 481800 | `9db2c299c7b966db35b8abbfbb3655b30b6f64f2a18e1d21fc3d41c1dadcff58` |
| mì Quảng / Delightful Plate | 200 | 663450 | `94e7dca338dca893caf164862bcf29bcf3e4ae57684be4ddd548b07377ee9209` |

Chả lụa is now consistently described as Vietnamese steamed pork sausage in the Chinese, Japanese and Korean bánh cuốn/bánh mì text, distinctly from pink pork ham; English was made explicit and Thai's correct established term หมูยอ was retained. Bánh xèo pork and bún bò nam bộ beef now use a conservative 71°C cooking endpoint in all five languages, preserving instruction counts and intermediate scenes. QA element screenshots hide the header with `visibility: hidden` and restore it in `finally`; the main full-page screenshot is captured before this change and remains unaffected.
