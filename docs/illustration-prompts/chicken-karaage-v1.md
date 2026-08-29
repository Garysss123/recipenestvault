# Chicken karaage step illustrations — prompt set v1

Generated 2026-08-29 with the built-in OpenAI `image_gen` tool. Every distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/chicken-karaage/step-01.png` through `step-08.png`; contact sheet: `qa-artifacts/chicken-karaage-contact.jpg`.

## Shared prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault static cooking-step illustration. Premium editorial food-process illustration, visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paper texture, restrained cel shading, warm off-white paper background, natural food colours, sparse dusty-pink accents only on a small tool or ceramic rim. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, or photorealism.

Global recipe invariants: 600 g boneless skin-on chicken thigh in even 4 cm pieces; soy/sake/ginger/garlic/sesame-oil marinade; 40 g flour then 80 g potato starch; 1.5 L neutral oil; first fry at 160°C in 3–5-piece batches, rest on a wire rack, second fry at 180°C, thickest centre at least 74°C; cooked pieces never touch raw-chicken equipment; final serving uses only 60 g raw green cabbage leaves torn into large pieces.

## Step prompts and review

### Step 01 — Cut and portion the chicken

Prompt: show raw boneless skin-on thigh on one dedicated board being cut into even 4 cm pieces, with a dish of cut raw pieces; only chicken, board, and one knife; no seasoning or cooking.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-83170249-adf4-45d7-a85e-2a4751634ef2.png`

Review: accepted. The view shows fibrous raw skin-on chicken and clear portioning, with no later ingredients.

### Step 02 — Marinate for 30 minutes

Prompt: show raw 4 cm chicken pieces in one ceramic bowl coated in pale soy marinade, with only soy sauce, sake, grated ginger, grated garlic, sesame oil, salt, and pepper in measured cups; a clean lid implies covered refrigeration; no flour or frying.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-0a166633-e14f-4eda-b194-0d9f2a851f9e.png`

Review: accepted. The view shows the raw marinated state and all listed marinade components only.

### Step 03 — Build the coating station

Prompt: show raw drained 4 cm chicken moving through two separate shallow dishes, 40 g all-purpose flour and 80 g potato starch, with coated raw pieces on a clean tray; no oil or cooking; raw and clean zones separate.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-085fe515-ec04-4709-8075-ee3a37485ef3.png`

Review: accepted. Powder dishes and dry craggy coating are legible; the chicken remains raw and no cabbage appears.

### Step 04 — First fry in batches (corrected)

Prompt: show exactly one small batch of four angular irregular 4 cm chicken-thigh pieces in 160°C neutral oil, pale first-fry crust, one wire spider lifting a piece, and one clean rack; explicitly avoid spherical balls, nuggets, and second-fry browning.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-e0167f78-f9f1-43a3-a818-21fb34c28c01.png` — the pieces read as rounded balls.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-1edd75df-fdce-4e7e-8f44-b1ab670b1fec.png`

Review: accepted after correction. Exactly four pieces are shown, with angular 4 cm shapes, pale crust, bubbling oil, and a single batch.

### Step 05 — Drain and rest safely (corrected)

Prompt: show exactly four pale first-fried pieces on a clean wire rack, spaced apart and draining, with one separate 160°C oil pot and one spider in the background; rest three minutes before the second fry; no dark crust or garnish.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-4e9467e0-f39a-4a59-9096-ff1e6f08f025.png` — the rack held approximately 11–12 pieces, not a 3–5-piece batch.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-dfda32b4-d22d-496a-b1dc-ab32c5635c2d.png`

Review: accepted after correction. The rack visibly holds four pieces with oil drops and no stacking.

### Step 06 — Second fry to 74°C

Prompt: show exactly four first-fried pieces returning to 180°C oil for the second fry, now deep golden and crisp; one spider lifts a piece and one clean thermometer checks a thick centre without visible numerals; no cabbage.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-b8063876-2468-48b1-ae23-245919f14683.png`

Review: accepted. Four pieces, high-temperature bubbling oil, deep-golden crust, and probe check are clear.

### Step 07 — Drain without softening

Prompt: show exactly four final deep-golden pieces on a clean wire rack, spaced apart with oil drops, one clean thermometer probe and clean tongs; no pot, raw food, cabbage, or sauce.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-f2dca077-3f5b-4ce7-abcf-0bc9cc8ad575.png`

Review: accepted. Four non-stacked pieces drain on a rack and the clean probe communicates the 74°C verification.

### Step 08 — Serve on cabbage

Prompt: show only a plain white plate of finished crisp irregular 4 cm karaage on exactly the listed 60 g raw green cabbage leaves torn into large pieces; no lemon, mayonnaise, sauces, sesame, or extra garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-17726b16-cf92-4eb7-b160-af387d6a9a69.png`

Review: accepted. Finished chicken and large torn cabbage leaves are clear; no unlisted garnish appears.

## Final QA

- All eight selected PNGs were opened individually with `view_image`; steps 4 and 5 were regenerated and rechecked after targeted visual failures.
- `scripts/illustration-contact-sheet.mjs` generated `qa-artifacts/chicken-karaage-contact.jpg` from exactly eight selected PNGs; the contact sheet was opened and reviewed.
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-b.mjs`.
- No central recipe, illustration registry, build, audit, README, or test file was modified; no commit was made.
