# Oyakodon step illustrations — prompt set v1

Generated on 2026-08-29 with the built-in OpenAI `image_gen` tool. Each distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/oyakodon/step-01.png` through `step-08.png`.

## Shared master prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault website cooking-step illustration. Create a premium editorial food-process illustration that is visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paint and paper texture, restrained cel shading, accurate natural food colours, an opaque warm off-white handmade-paper background and sparse dusty-pink accents only on a small utensil or ceramic detail. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, and one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, photorealism, glossy 3D rendering, or extra ingredients. Every frame must contain only the step's listed ingredients and the tools needed for that one state.

## Recipe invariants

- Use boneless skinless chicken thigh in flat 2.5 cm pieces and onion in 6 mm strips. Chicken is opaque and reaches 74°C at the thickest piece before egg is added.
- The egg batch is four large eggs (200 g), added in two stages. The finished egg remains tender but is fully heated to 74°C; no unsafe runny ordinary egg is depicted.
- Mitsuba trefoil is added only at the final pan stage and final bowl. It is sparse, delicate and three-leaf per sprig; no parsley, scallion, red pickled ginger or other garnish.
- Rice is held hot at step 1 and appears under the topping only in the last step. No extra sauce or side dish is shown.

## Step prompts and review

### Step 01 — Cook and hold the rice

Prompt requirement: one covered ceramic pot with hot cooked Japanese short-grain rice and a small steam curl; no topping ingredients.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-59cfc481-53f8-4922-8298-cd5bde1759c5.png`

Review: accepted after `view_image`. The opaque cream paper, covered rice pot and steam communicate the exact hold state without chicken, egg or garnish.

### Step 02 — Cut the chicken and onion

Prompt requirement: one board with separated raw boneless skinless chicken pieces in flat 2.5 cm bites and 6 mm onion strips, plus one knife; mitsuba is held off-frame and is not added yet.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-2d3f5ccc-5741-4e93-9623-6939282a13bc.png`

Review: accepted after `view_image`. Chicken remains raw and skinless, onion is clearly separate, and no mitsuba or later ingredients appear.

### Step 03 — Beat the four eggs

Prompt requirement: one bowl with a single lightly beaten batch from four large eggs and one fork; no eggshells, foam or other ingredients.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-3135ee51-7d4b-417e-87b0-906fcca0d75c.png` — `view_image` showed six shell halves and therefore an incorrect egg count.

Selected generated source after targeted correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-fe86b159-82e5-4233-a990-ccda4e809444.png`

Review: accepted after `view_image`. One bowl of non-foamy blended egg and one fork are present, with no shell-count ambiguity.

### Step 04 — Simmer the onion

Prompt requirement: 6 mm onion strips alone in dashi, soy, mirin, sake and sugar broth in one small skillet, tender and translucent at a gentle simmer; no chicken or egg.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-1e38d322-78a0-4e2f-afcd-28fbba2a4f1c.png`

Review: accepted after `view_image`. Only translucent onion and the shallow seasoned broth are shown, with a quiet simmer and no premature topping.

### Step 05 — Cook the chicken

Prompt requirement: flat 2.5 cm boneless skinless chicken pieces in one layer with tender onion and broth under a clear lid; chicken fully opaque, no pink, no egg or mitsuba yet.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-ff327edc-5fc9-40a9-8f00-143070919a2c.png`

Review: accepted after `view_image`. Cooked chicken pieces and onion are visible in one covered skillet; no egg or garnish appears before its specified stage.

### Step 06 — Set the first egg layer

Prompt requirement: the first half of the egg batch is softly setting around cooked chicken and onion in broth, with tender edges and no large liquid pool; no mitsuba or rice.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-30664cd3-b6c7-471a-ab33-d75318e02910.png`

Review: accepted after `view_image`. Chicken and onion remain distinct, the egg is tenderly setting, and no mitsuba or serving rice is introduced.

### Step 07 — Finish egg safely with mitsuba

Prompt requirement: remaining egg and a sparse final addition of Japanese mitsuba trefoil are visible over chicken and onion in the skillet; egg is tender but fully set, with a clear lid offset; no rice.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-b03e097c-a644-477b-bdb2-1e6c1df9dc3f.png` — `view_image` showed herb leaves too close to parsley and needed stronger three-leaf mitsuba direction.

Selected generated source after targeted mitsuba correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-3a573171-2584-45ec-b8a8-1d7743381e0c.png`

Review: accepted after `view_image`. The corrected frame has a sparse green three-leaf trefoil treatment, tender fully set egg and cooked chicken/onion, with no rice or other herb.

### Step 08 — Slide over the rice

Prompt requirement: one donburi bowl of hot short-grain rice covered with cooked 2.5 cm chicken, tender onion and soft-set safe egg, finished with sparse three-leaf mitsuba only; no extra garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-970e449c-95e3-46c7-a223-968bc15112d5.png`

Review: accepted after `view_image`. Rice, chicken, onion, tender egg and sparse mitsuba are all present in the correct final order, without red ginger or other decoration.

## Final QA

- All eight selected PNGs were opened individually with `view_image`; steps 3 and 7 were regenerated and rechecked after targeted visual failures.
- Every selected file is `1672x941` (the same 16:9 raster dimensions used by the accepted Recipe Nest Vault step illustrations).
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-a.mjs`.
- Contact sheet: `qa-artifacts/oyakodon-contact.jpg` (generated after the individual review).
- No central recipe, illustration registry, build, audit, README or test file was modified; no commit was made.
