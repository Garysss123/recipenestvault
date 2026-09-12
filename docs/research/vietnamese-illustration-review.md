# Vietnamese illustration second review — 2026-09-12

The interrupted iteration was recovered from saved project files and the previous session's final image outputs. The collection contains 21 recipes, five locales and 172 natural method steps. The first audit after recovery failed because no Vietnamese illustration manifest or individual publication images had been generated; the recipe text and licensed-photo checks passed.

## Findings and corrections

- **Bánh flan, steps 5 and 7:** the first sheet had an impossible custard-pouring stream and caramel-coloured tops while the custards were still in their moulds. The previous session had already generated the corrected image but had not copied it into the project. `banh-flan-v2.png` now shows stationary filled ramekins and pale custard tops; caramel appears on top only after unmoulding in step 8.
- **Bò kho, step 1:** the first sheet included minced garlic in the initial beef marinade, before the written method adds garlic at step 4. The recovered `bo-kho-v2.png` removes these fragments and retains the later garlic preparation and frying stages.
- **Uneven source-sheet rows:** dividing every source into equal rectangles clipped the canh chua cooking pot and included pieces of later bun bo Hue scenes in earlier steps. All 21 sheets now record their actual pixel boundaries in the prompt manifests. For example, canh chua's horizontal divider is at y=437 of 941, rather than y=471; bun bo Hue's dividers are y=267/520/774 of 1086, rather than y=272/543/815. Extraction validates the source dimensions and crop bounds, retains the scene aspect ratio and omits unused cells. The content audit compares the generated manifest against those reviewed boundaries and source hashes.
- **Earlier accepted corrections rechecked:** thịt kho trứng has no egg in its step-5 pork-only braise; cao lầu uses minced/ground aromatics, without the rejected whole star anise and garlic.
- **Decimal quantities in rendered methods:** the desktop screenshot exposed `1.3 公升` becoming `3 公升` in canh chua step 4. A legacy step-number cleanup was incorrectly applied to structured method text. The same bug affected the Traditional Chinese kalguksu step 10, boat noodles step 6, Taiwanese tea eggs step 4 and milkfish congee step 3. Structured methods now preserve source text exactly, and legacy numbering cleanup explicitly preserves decimals. The static audit checks every structured method against both visible HTML and Recipe JSON-LD; browser QA independently compares displayed method text with the source. The new audit was first run against the old artifact to demonstrate all five failures.

## Scope of the visual review

Every source-sheet cell was compared with its English method and scene specification, including ingredients, cuts, cookware, preparation order and intermediate state. The review also checked for people/hands, duplicated scenes, unintended text, final dishes appearing too early and blank cells. Final photographs were inspected separately in the existing approved 21-photo crop sheet; these remain real licensed photographs, not generated heroes.

| Recipe | Reviewed steps | Specific checks |
| --- | ---: | --- |
| phở bò | 10 | Bone blanching, brisket removal, spice pouch, separate noodles and cooked-beef reheating |
| phở gà | 8 | Poaching, separated carcass/meat, strained broth and cooked-chicken reheating |
| bún bò Huế | 11 | Annatto oil before aromatics, hock removal, round noodles, corrected row boundaries |
| bún riêu | 9 | Raw crab mixture before cooked curds; tofu after curds; separate noodle cooking |
| bún chả | 9 | Ground-pork patties, separate pickles/sauce, cooked-roll reheating |
| bún thịt nướng | 8 | Thin pork, pickles, scallion oil and optional cooked rolls |
| gỏi cuốn | 8 | Cooked pork/shrimp, separate bundles, empty softened wrapper, folding and fresh final rolls |
| chả giò | 8 | Raw filling test, rice-paper wrapping, two frying stages and rack cooling |
| bánh xèo | 8 | Separate cooked pork/shrimp, empty batter layer, filling on one half and folded crêpe |
| bánh cuốn | 7 | Rice batter, dry cooked filling, unbrowned sheet, filled sheet and rolled rice crêpes |
| bánh mì thịt | 6 | Refrigerator pickles, separate sausage/ham, bread and staged filling |
| cơm tấm sườn nướng | 8 | Marinated chops, broken rice, scallion oil, grill, resting and final plate |
| cao lầu | 8 | Whole pork braise, strained sauce, crisp squares, slicing and shallow-sauce noodles |
| mì Quảng | 10 | Separate shrimp shells/body, pork stock, strained broth, quail eggs and yellow noodles |
| cá kho tộ | 7 | Caramel before fish, intact fish steaks, gentle braise and thermometer stage |
| thịt kho trứng | 8 | Eggs prepared separately and added only after the pork-only braise |
| canh chua cá | 6 | Tamarind straining, separate vegetables, garlic, fish poaching and corrected pot crop |
| chè ba màu | 9 | Liquid agar before set jelly, separate whole-bean layers, coconut sauce and cut jelly |
| bánh flan | 8 | Caramel underneath, filled moulds, water bath, pale cooling custards and unmoulded dessert |
| bò kho | 9 | Ground-spice marinade, garlic later, carrots after the initial braise, removed whole spices |
| bún bò Nam Bộ | 7 | Thin beef, separate dressing, noodles before cooked beef and final toppings |

## Reproducible release checks

Generate the pinned separate images with `npm run manifest:vietnamese-illustrations`, then make the three review sheets with `node scripts/vietnamese-illustration-contact-sheet.mjs`. Inspect those and the corrected individual frames before exporting web images and running `npm test`.

The browser suite includes the five Vietnamese collections, multilingual representative recipes, accent-insensitive search, language navigation and direct refresh. It also captures the recovered flan steps 5/7 and the corrected canh chua step 4. Run it locally and on `https://recipenestvault.com`; each run preserves its report and screenshots under `qa-artifacts/visual/<host>-<timestamp>/`. These QA files and rejected sources stay out of Git and the deployment artifact.

Local release verification on 2026-09-12 passed `npm test` (815 indexable routes, 4,550 artifact files) and all 74 browser states with zero reported failures. The reviewed screenshots include the corrected `1.3 公升` wording, flan steps 5/7, the beef marinade, the Vietnamese collection at desktop/mobile widths and the homepage. The earlier local Workers-proxy crash was isolated by serving the same static artifact through `npm run preview`; production verification still uses Cloudflare Pages directly.
