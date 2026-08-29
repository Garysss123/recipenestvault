# Katsudon step illustrations — prompt set v1

Generated on 2026-08-29 with the built-in OpenAI `image_gen` tool. Each distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/katsudon/step-01.png` through `step-08.png`.

## Shared master prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault website cooking-step illustration. Create a premium editorial food-process illustration that is visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paint and paper texture, restrained cel shading, accurate natural food colours, an opaque warm off-white handmade-paper background and sparse dusty-pink accents only on a small utensil or ceramic detail. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, and one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, photorealism, glossy 3D rendering, or extra ingredients. Every frame must contain only the step's listed ingredients and the tools needed for that one state.

## Recipe invariants

- Use exactly two whole boneless pork loin cutlets, each 1.5 cm thick. They are breaded, fried in neutral oil at 175°C until the pork centre reaches 71°C, rested for 3 minutes, then cut into 2 cm strips.
- The onion broth uses only onion, dashi, light soy sauce, mirin, sake and sugar. No extra sauce is added at serving.
- The topping uses exactly three pasteurized large eggs in two additions and is tender but fully heated to 74°C. Mitsuba is added at the topping/serving stage only.
- The finished state is exactly two rice bowls with sliced tonkatsu, onion, softly set egg and sparse mitsuba. Never add red pickled ginger, scallion, sesame or other garnish.

## Step prompts and review

### Step 01 — Cook and hold the rice

Prompt requirement: one covered ceramic pot with hot cooked Japanese short-grain rice and a small steam curl; no pork or topping ingredients.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-c4397b73-99c5-41ff-a360-cd50506685bf.png`

Review: accepted after `view_image`. The covered rice pot, hot steam and restrained pink knob match the preparation state with no later ingredients.

### Step 02 — Prepare the two pork cutlets

Prompt requirement: one board with exactly two whole raw boneless pork loin cutlets, each an even 1.5 cm thickness, seasoned with salt and white pepper; one meat pounder only.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-f65f2134-17d9-4eda-a208-1fda3a9deeca.png`

Review: accepted after `view_image`. Exactly two intact raw cutlets are countable, with only the specified dry seasoning and preparation tool.

### Step 03 — Bread the cutlets

Prompt requirement: exactly two intact cutlets completely coated in pale panko, with three unlabelled shallow dishes for flour, breading egg and panko; no oil or heat yet.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-fe5f0c80-aaa6-4cb8-b862-23d3ed689e3c.png`

Review: accepted after `view_image`. The two breaded cutlets and the flour/egg/panko sequence are legible, with no onion, topping egg, rice or garnish.

### Step 04 — Fry and verify the pork

Prompt requirement: exactly two whole breaded cutlets frying in bubbling neutral oil at the 175°C stage, deep golden and opaque; one slotted turner, no thermometer text or extra food.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-52c93d73-5a72-4412-9526-859dbceebcb9.png`

Review: accepted after `view_image`. Two whole golden cutlets are clearly visible in one oil pan; no raw pink centre, onion, egg, rice, sauce or red ginger appears.

### Step 05 — Slice the rested tonkatsu

Prompt requirement: the same two cooked cutlets are cut into neat 2 cm strips on one clean board, with panko crust attached to opaque pork; one clean knife only.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-d4ba6aa7-4099-455e-8c9e-aa0397c43dc3.png`

Review: accepted after `view_image`. Two sliced cutlet portions remain traceable and the 2 cm strips are legible; no broth, egg, onion or garnish is introduced early.

### Step 06 — Simmer the onion broth

Prompt requirement: thin onion slices alone in a shallow dashi/soy/mirin/sake/sugar broth in one small skillet, tender and translucent at a gentle simmer; no pork, egg, rice or mitsuba.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-5099a841-4318-4b50-96dc-ec26f5de473b.png`

Review: accepted after `view_image`. Only translucent onion and the listed broth appear with a quiet simmer; no extra sauce or later garnish is visible.

### Step 07 — Set the pasteurized egg topping

Prompt requirement: sliced tonkatsu rests in onion broth under a tender fully set topping made from three pasteurized eggs added in two stages; sparse three-leaf mitsuba is added last; clear lid offset; no rice yet.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-03e05f99-0fa4-45b0-aaca-038be858ef09.png`

Review: accepted after `view_image`. Golden cutlet strips, onion, softly set egg, clear lid and sparse green mitsuba are present; no red pickled ginger, rice or extra sauce appears.

### Step 08 — Assemble two bowls

Prompt requirement: exactly two donburi bowls with hot rice, one portion of 2 cm sliced tonkatsu, onion, tender fully set pasteurized egg and sparse three-leaf mitsuba; no red ginger or extra sauce.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-c4d0ab11-d107-4736-8a14-d7c898c28dca.png`

Review: accepted after `view_image`. Exactly two finished bowls are visible with the listed components only; no red pickled ginger, extra sauce or unlisted garnish appears.

## Final QA

- All eight selected PNGs were opened individually with `view_image`; no redraw was needed after the initial review.
- Every selected file is `1672x941` (the same 16:9 raster dimensions used by the accepted Recipe Nest Vault step illustrations).
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-a.mjs`.
- Contact sheet: `qa-artifacts/katsudon-contact.jpg` (generated after the individual review).
- No central recipe, illustration registry, build, audit, README or test file was modified; no commit was made.
