# French cooking step illustrations v1

Generated on 2026-09-12 to 2026-09-13 with the built-in OpenAI `image_gen` tool. The collection follows the established Recipe Nest Vault warm-ivory process-illustration style: fine ink contours, restrained gouache shading, natural food colours, and an overhead three-quarter culinary view.

## Shared prompt contract

Each French recipe uses a source sheet sized 1536 × 1024. Panels follow the recipe's natural step order from left to right and top to bottom. The prompt specifies the exact grid and number of used panels; unused cells remain blank warm-ivory paper. Every scene shows the written intermediate cooking state, with the finished dish reserved for the final panel.

Every source sheet prohibits people, hands, fingers, arms, sleeves, body parts, text, numbers, logos, watermarks, decorative flags or national motifs, floating utensils, and unintended pouring streams. French identity comes from the food and page UI rather than decorative stereotypes.

Exact prompts, source-sheet filenames, reviewed status, scene hashes, and crop grids are recorded in `french-prompts.json`. Source sheets live under `assets/recipes/illustration-sheets-generated/french/`. Deterministic 1672 × 941 publication crops are generated with `scripts/generate-french-illustration-sets.mjs` into `assets/recipes/illustrations-generated/<recipe-id>/step-NN.png`.

## Reviewed corrections

The published source for `coq-au-vin` is the third revision, which removes mushrooms before their written addition stage and preserves the reviewed bay-leaf and herb sequence. `ratatouille-v2.png` removes premature eggplant from the zucchini-and-pepper pan. `gratin-dauphinois-v2.png` removes whole garlic-bulb halves from the buttered dish and leaves only the specified prepared garlic.

The final review also replaced two newly generated sheets: `chocolate-mousse-v2.png` shows the pasteurized yolks fully incorporated into the chocolate in step 2 instead of intact yolks sitting on top; `gougeres-v2.png` shows the water and butter fully melted and boiling before flour enters in step 1. The remaining reviewed sheets were accepted without version changes.

The 21 reviewed source sheets produce 146 distinct step illustrations. Review the combined source sheet with `node scripts/french-illustration-contact-sheet.mjs`, generate publication crops with `npm run manifest:french-illustrations`, inspect the three outputs from `node scripts/french-step-contact-sheet.mjs`, then run `npm run audit:french-drafts`. Finished-dish photographs are separately licensed real images and remain the Recipe structured-data images; these process illustrations are visibly disclosed as illustrations and excluded from Recipe image structured data.
