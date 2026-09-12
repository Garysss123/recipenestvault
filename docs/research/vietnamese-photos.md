# Vietnamese finished-photograph review

Reviewed on 2026-09-12. This collection uses 21 distinct real photographs, never AI finished-dish images. The pinned evidence record is `vietnamese-photo-evidence.json`; `src/vietnamese-photos.mjs` supplies the same original source, author, exact license URL and image hash to the public attribution component.

The reviewer opened downloaded source pixels and the final 960 × 720 crop previews, compared the visible cuts, broth/sauce, toppings and accompaniments with the complete recipe ingredients, methods and serving variants, and rejected material mismatches. The source files are in `assets/recipes/approved/`. Normal publication derivatives resize, crop and compress them; they do not recolour or invent food. Out-of-artifact visual evidence is `qa-artifacts/vietnamese-approved-photo-crops.jpg` and the individual files in `qa-artifacts/vietnamese-photo-crops/`.

Run `node scripts/generate-vietnamese-photo-manifest.mjs` to verify all 21 source hashes and dimensions and reproduce the public manifest from checked-in evidence, without another network call. `--download-missing` can restore a missing pinned source, but fails rather than approving changed bytes. `--pin-research` is solely for a newly completed visual review and reads the ignored research downloads; do not use it to bypass review. Candidate discovery and download commands are implemented in `scripts/research-vietnamese-photos.mjs`. They fail on rate limits rather than retrying indefinitely.

Every retained local source is at least 1200 × 800. Most are non-upscaled Wikimedia thumbnails; the original full-resolution file is still linked in the manifest. Licenses are CC BY, CC BY-SA, CC0 or an explicit public-domain release. The canh chua source lacks an API LicenseUrl but its [original Licensing section](https://commons.wikimedia.org/wiki/File:Canh_chua_c%C3%A1_l%C3%B3c_%E1%BB%9F_Th%E1%BB%A7y_Tr%C3%BAc_Qu%C3%A1n,_%C4%91%C6%B0%E1%BB%9Dng_Nguy%E1%BB%85n_Nh%E1%BB%AF_L%C3%A3m_(3).jpg#Licensing) explicitly releases the work worldwide for any purpose. Its exact legal template is [PD-self](https://commons.wikimedia.org/wiki/Template:PD-self), not a substituted CC0 label.

## Appearance decisions

- Phở bò: crop shifts right and tightens slightly to omit a neighbouring diner while retaining the beef noodle bowl. The clear broth, sliced beef, onion and herbs match the written method.
- Phở gà: changed to the Hanoi chicken-broth photo without hoisin sauce. Chicken pieces, flat noodles, onion, scallions and chile are all disclosed.
- Bún bò Huế: red lemongrass broth, beef and pork with fresh herbs. No extra blood cake/sausage appears in this chosen bowl.
- Bún riêu: replaced the first photograph because it included blood cake and sausage. The retained photograph shows crab-egg-pork curds, tomatoes, fried tofu and thin noodles, all present in the recipe.
- Bún chả and bún thịt nướng: photographs show fried rolls as an additional side; both recipes explicitly disclose optional fully cooked chả giò.
- Gỏi cuốn: transparent wrappers show cooked shrimp, pork, noodles and herbs. A few cooked shrimp halves are arranged on the serving plate; the ingredient list accounts for shrimp.
- Chả giò: replaced the first restaurant plate with the closer photograph of fried rice-paper rolls and dip, eliminating decorative cucumber/carrot flowers not in the recipe. Pale-golden blistering is typical of fried rice paper; this is not a fresh roll.
- Bánh xèo: thin yellow crepe opened to reveal sprouts, onion, shrimp and pork; leafy wrapping herbs are included. The black dipping bowl is a vessel, not evidence of a black sauce.
- Bánh cuốn: translucent rice-flour sheets, dark wood-ear/pork filling, fried shallots and herbs. The recipe allows pork sausage to be omitted as in this serving.
- Bánh mì thịt: cold-cut ham/sausage/pâté filling, cucumber and cilantro. The recipe deliberately follows that cold-cut variant.
- Cơm tấm sườn nướng: glazed thin pork chop and white broken rice with scallion oil/cucumber, without extra pork skin or egg loaf.
- Cao lầu: thick pale-brown noodles, sliced browned pork, leafy herbs and crisp square toppings. The recipe explicitly discloses ready-made traditional croutons as an alternative to home-fried wonton squares.
- Mì Quảng: replaced the original white-noodle, tomato-tinged, dried-shrimp candidate after the recipe author's cross-check. `Mi Quang at Ngoc Mai (with noodles uncovered).jpg` clearly shows yellow wide noodles, cooked shrimp, sliced pork, sesame rice crackers, greens and peanuts, matching the turmeric-noodle draft. Four other candidates were rejected for white noodles, beef, tripe-like cuts or different toppings. Optional retained shrimp tail fans are disclosed in the preparation step.
- Cá kho tộ: replaced the initial pale fish photograph with intact skin-on fish steaks in glossy caramel sauce and scallions. The recipe permits a heavy metal saucepan, matching the photographed pot.
- Thịt kho trứng: replaced a dark reduced version with the loose amber-braised pork-and-egg photograph. Its original lower-edge photographer watermark and unrelated side pickles remain in the preserved source, outside the reviewed publication crop. Photographer credit remains visible in public attribution.
- Bò kho: the first candidate included tripe, radish and noodles; rejected. The retained bowl shows beef, carrots, Thai basil and red-brown broth, matching the replacement recipe.
- Canh chua cá: photo contains porous edible bạc hà stems; the recipe was updated from celery to the peeled and blanched food-market stem version before approval.
- Bún bò Nam Bộ: fully cooked thin beef, noodles, sprouts, carrot, peanuts and fried shallots match the replacement recipe. Lettuce, cucumber and herbs are placed beneath the noodles.
- Chè ba màu: the photographed whole-bean version uses pale black-eyed peas with red beans and green jelly. The recipe identifies this variant and offers yellow mung-bean purée only as a substitution.
- Bánh flan: the pictured cup contains yellow custard, coffee sauce and crushed ice, all included in the optional coffee-and-ice serving method.

## Rejected menu candidates

Gỏi gà was not published because no sufficiently large, exact-dish Commons photograph with verified commercial terms was found. Gà kho gừng was not published because the available candidate explicitly depicted five-spice chicken and lacked the required ginger strips. They were replaced by bún bò Nam Bộ and bò kho, so all 21 published recipes retain qualifying photographs.

## Replacement recipe cross-checks

The two replacement recipes are original standardized versions, not claims of site kitchen testing. Bò kho cross-checks [Hungry Huy](https://www.hungryhuy.com/bo-kho-recipe-vietnamese-beef-stew/) and [Delightful Plate](https://delightfulplate.com/bo-kho-vietnamese-beef-stew/) for suitable beef cuts, aromatics, gentle braising, delayed carrot addition and basil/bread/noodle serving choices. Bún bò Nam Bộ cross-checks [Delightful Plate](https://delightfulplate.com/vietnamese-beef-noodle-salad-bun-bo-xao/) and [Helen's Recipes](https://helenrecipes.com/recipe-37-bun-bo-xao-vietnamese-noodle-salad/) for thin across-grain beef, lemongrass, separate dressing, fresh vegetables and peanut/shallot topping. Quantities, stage boundaries and all five-language wording were independently composed for this collection.

Exact per-photo sources, authors, licenses, dimensions and SHA-256 hashes are in the adjacent pinned evidence JSON, avoiding duplicated metadata that could drift.
