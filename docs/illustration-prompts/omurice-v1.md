# Omurice step illustrations — prompt set v1

Generated on 2026-08-29 with the built-in OpenAI `image_gen` tool. Each distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/omurice/step-01.png` through `step-08.png`.

## Shared master prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault website cooking-step illustration. Create a premium editorial food-process illustration that is visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paint and paper texture, restrained cel shading, accurate natural food colours, an opaque warm off-white handmade-paper background and sparse dusty-pink accents only on a small utensil or ceramic detail. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, and one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, photorealism, glossy 3D rendering, or extra ingredients. Every frame must contain only the step's listed ingredients and the tools needed for that one state.

## Recipe invariants

- Use 180 g boneless skinless chicken thigh in 1.5 cm dice, 120 g onion in 5 mm dice, 360 g cooked Japanese short-grain rice, and 75 g ketchup split as 60 g for the rice and 15 g for the finish.
- Chicken is cooked opaque to 74°C. The 200 g ordinary egg batch becomes two thin omelette sheets, each fully set with no liquid centre and verified to 74°C.
- The two compact chicken-tomato rice ovals are each wrapped in one thin egg sheet. The final frame has a small opening in each wrapper showing the filling and one simple smooth ketchup line per portion; no ketchup lettering, drawing, fresh tomato, broccoli or garnish.

## Step prompts and review

### Step 01 — Warm and hold the rice

Prompt requirement: one covered ceramic pot with 360 g hot cooked Japanese short-grain rice and a small steam curl; no chicken, egg or sauce.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-1c7bbcdf-0efc-4c7f-b93c-1d0f234b1179.png`

Review: accepted after `view_image`. The covered rice pot and steam are the only food state, with the required cream paper and restrained pink accent.

### Step 02 — Dice chicken and onion, beat eggs

Prompt requirement: one board with separate raw 1.5 cm chicken dice and 5 mm onion dice plus one bowl of beaten ordinary eggs; salt and pepper may be shown in tiny portions; no cooking or ketchup.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-ff87afff-855e-4e04-b504-8284847a8bec.png`

Review: accepted after `view_image`. Chicken, onion and the separate beaten-egg bowl are clear, with no fresh tomato, broccoli, rice or later garnish.

### Step 03 — Cook the chicken and onion

Prompt requirement: 1.5 cm cooked chicken dice and 5 mm onion dice sauté in 15 g butter in one wide skillet; chicken is opaque and safe, with no rice, ketchup, egg or garnish yet.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-27ec98f1-0b81-4540-ab06-e3f8dabb557f.png`

Review: accepted after `view_image`. The small chicken/onion dice, butter and single spatula are visible; the later rice, ketchup and omelette stages are absent.

### Step 04 — Cook down ketchup and Worcestershire

Prompt requirement: cooked chicken and fine onion are coated in smooth ketchup and Worcestershire sauce as the excess moisture evaporates; no rice, egg, fresh tomato or garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-6ff3dd47-9084-43b3-977b-b5f52367db9d.png`

Review: accepted after `view_image`. The red coating is smooth ketchup, not tomato pieces; chicken and onion remain small and no unlisted food appears.

### Step 05 — Fold in rice and shape two ovals

Prompt requirement: exactly two compact oval portions of red chicken-tomato rice on one plain plate, with distinct rice grains, small chicken pieces and fine onion; no egg or topping ketchup.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-07ac7e39-c7a8-4075-9b8c-4b2cc17816d8.png`

Review: accepted after `view_image`. Exactly two rice ovals are clearly countable, with only the listed chicken, onion and ketchup rice components.

### Step 06 — Cook two fully set thin omelettes

Prompt requirement: exactly two separate thin yellow omelette sheets, both fully set and opaque at the centre, on one plate with a clean skillet and spatula behind; no rice or filling yet.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-392faa19-6bb3-46d3-a62e-c6484b5a310d.png`

Review: accepted after `view_image`. Two thin finished sheets are countable and visibly non-runny; no unlisted food or garnish appears.

### Step 07 — Wrap the two rice ovals

Prompt requirement: exactly two smooth yellow egg-wrapped chicken-rice parcels on one plain plate, seam-side down and intact; no cut opening, ketchup stripe or garnish yet.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-b01787f1-ee0a-45a1-81a4-5f7074b4b3e0.png`

Review: accepted after `view_image`. Two intact wrappers are clear with no premature cut, sauce stripe or decorative food.

### Step 08 — Cut small openings and add one ketchup line

Prompt requirement: exactly two finished thin egg-wrapped omurice portions; each has one small top slit exposing chicken-tomato rice and one narrow straight ketchup line on top only. No ketchup band, letters, drawings, fresh tomato, broccoli or garnish.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-dab2f665-b020-468b-af6a-cbed83e838d1.png` — `view_image` showed a thick wrap-around ketchup belt and openings that were too large.

Selected generated source after targeted finish correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-bbba888d-b9e8-440f-8936-ef9ad443aad9.png`

Review: accepted after `view_image`. The selected frame has two small slits, two simple lengthwise surface ketchup lines, fully set yellow wrappers and no text or unlisted garnish.

## Final QA

- All eight selected PNGs were opened individually with `view_image`; step 8 was regenerated and rechecked after the wrap-around ketchup failure.
- Every selected file is `1672x941` (the same 16:9 raster dimensions used by the accepted Recipe Nest Vault step illustrations).
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-a.mjs`.
- Contact sheet: `qa-artifacts/omurice-contact.jpg` (generated after the individual review).
- No central recipe, illustration registry, build, audit, README or test file was modified; no commit was made.
