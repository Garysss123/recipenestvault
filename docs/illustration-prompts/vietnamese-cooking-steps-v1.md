# Vietnamese cooking steps v1

The collection uses the built-in OpenAI image_gen tool with `assets/recipes/illustrations-generated/bibimbap/step-01.png` as a visual-style reference. The original sources are saved in `assets/recipes/illustration-sheets-generated/vietnamese/`; the publication PNGs are in `assets/recipes/illustrations-generated/<recipe-id>/step-NN.png`.

Exact prompts, reviewed source filenames and observed grid layouts are recorded in `vietnamese-a-prompts.json` and `vietnamese-bc-prompts.json`. Each natural cooking step has its own English scene specification in the recipe data. Every entry includes a `cropGrid` with the original dimensions and reviewed pixel boundaries: generated rows are not assumed to be equal height. The generator retains complete scenes inside 1672 × 941 frames and never publishes the whole contact sheet as a single step image. Blank cells are excluded.

The common visual treatment is warm ivory textured paper, fine ink contours, restrained gouache, natural food colours and a consistent overhead three-quarter viewpoint. No hands, fingers, arms, sleeves, people, body parts, text or decorative regional motifs are permitted. Vietnamese colour cues belong to the page UI.

Visual corrections include removing an egg that appeared before the egg-addition step in thịt kho trứng, and removing whole star anise and garlic from cao lầu because the written recipe uses ground spice and minced garlic. Corrected versioned sheets are the manifest sources; discarded originals remain in the image tool's original output history.

The interrupted session had also completed two corrections without copying them into the project. The recovered `banh-flan-v2.png` removes the impossible custard-pouring stream in step 5 and keeps the cooling custard tops pale in step 7, with caramel remaining underneath until unmoulding. `bo-kho-v2.png` removes minced garlic from the step-1 marinade; garlic first enters the pot at step 4. Both recovered sources were visually reviewed against every step before selection.

The second review found that equal-height extraction clipped the top of the canh chua pot and pulled fragments of later bun bo Hue steps into earlier frames. Actual row boundaries are now pinned for all 21 sheets, including y=437 on the 941-pixel canh chua source and y=267/520/774 on the 1086-pixel bun bo Hue source. The draft audit verifies that source identity and crop boundaries match the reviewed prompt record. See `docs/research/vietnamese-illustration-review.md` for the complete second-review record.

Generate crops with `node scripts/generate-vietnamese-illustration-sets.mjs`, review the three sheets from `node scripts/vietnamese-illustration-contact-sheet.mjs`, then run `npm run audit:vietnamese-drafts`. All illustration hashes and source hashes are pinned. Finished-dish photographs remain separately licensed real images; illustrations are visibly disclosed and excluded from Recipe image structured data.
