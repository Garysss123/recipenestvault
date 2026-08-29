# Gyudon step illustrations — prompt set v1

Generated on 2026-08-29 with the built-in OpenAI `image_gen` tool. Each distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/gyudon/step-01.png` through `step-08.png`.

## Shared master prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault website cooking-step illustration. Create a premium editorial food-process illustration that is visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paint and paper texture, restrained cel shading, accurate natural food colours, an opaque warm off-white handmade-paper background and sparse dusty-pink accents only on a small utensil or ceramic detail. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, and one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, photorealism, glossy 3D rendering, or extra ingredients. Every frame must contain only the step's listed ingredients and the tools needed for that one state.

## Recipe invariants

- Gyudon uses only thinly sliced beef, onion, cooked Japanese short-grain rice and the dashi/sake/mirin/light-soy/sugar broth. The finished bowl has no scallion, pickled ginger, egg, sesame or other garnish.
- Beef is shown raw only during preparation, then fully opaque and cooked in the simmering stage; the thickest slice reaches 71°C in the recipe even though no numeric thermometer is drawn.
- Rice appears only in the covered rice-pot stage and the final bowl-building stages. Beef and onion are withheld from the rice bowls until the specified topping step.
- Every illustration is one state, with no extra broth bowls, side dishes, utensils or vessels beyond the listed action tool.

## Step prompts and review

### Step 01 — Keep the rice hot

Prompt requirement: one lidded ceramic rice pot containing cooked Japanese short-grain rice, with a small painted steam curl; only rice and its pot. No beef, onion or broth.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-b9eae71e-95be-4aab-a900-48ca8fccdb69.png`

Review: accepted after `view_image`. The covered rice pot, hot steam and restrained pink knob match the preparation state with no topping ingredients.

### Step 02 — Prepare beef and onion

Prompt requirement: one board with separate piles of raw paper-thin beef cut into 7–8 cm lengths and thin onion slices, plus one plain knife. No broth, rice or seasonings.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-116ed4a7-fcba-4ade-9dc1-db6d4015d543.png`

Review: accepted after `view_image`. The beef's marbling, thin ribbons and separated onion pile are legible, with no later ingredients.

### Step 03 — Make the cold-pan broth

Prompt requirement: one cold, unheated wide skillet with the combined dashi, sake, mirin, light soy sauce and sugar broth, plus one spoon; no flame, steam, beef, onion or rice.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-a75a0025-d026-4908-be27-c7cfdf2e2ed2.png`

Review: accepted after `view_image`. The empty cold skillet holds a uniform pale brown broth with no heat cues or unlisted food.

### Step 04 — Soften the onion

Prompt requirement: thin onion slices alone in the seasoned broth in one skillet, translucent and tender with a gentle simmer; no beef or rice.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-67b58b68-e64e-4102-9404-7547f759d93f.png`

Review: accepted after `view_image`. Only translucent onion and a shallow broth appear; the few bubbles and steam communicate the intended gentle simmer.

### Step 05 — Simmer the beef

Prompt requirement: one skillet with separated 7–8 cm thin beef ribbons in a single layer among the softened onion and broth; beef is opaque brown with no pink, and the simmer is gentle. No rice or garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-4ca5915b-9092-4642-a5f9-8b9191e32249.png`

Review: accepted after `view_image`. The beef reads as thin cooked ribbons, remains separated among onion, and no thermometer/numeric text or unlisted ingredient appears.

### Step 06 — Settle the broth with heat off

Prompt requirement: cooked beef and tender onion remain in the broth in one skillet under a clear glass lid; the heat is visibly off, with no flame or active boil. No rice or garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-81f99908-0d6f-4879-9750-4d0c5eda4d79.png`

Review: accepted after `view_image`. The transparent lid visibly covers the opaque beef and onion, while the absence of flame and only a settling wisp communicates the two-minute rest.

### Step 07 — Season the rice bowls

Prompt requirement: exactly two donburi bowls containing hot short-grain rice only; one ladle directly pours a narrow stream of broth into one bowl and the other has a small broth patch. Beef and onion are not present yet.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-88896685-a9c2-4f5d-a5d9-3b641d05cb62.png` — `view_image` showed an extra small broth bowl, violating the exact two-bowl state.

Selected generated source after targeted correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-6242052c-8705-4886-8f84-453a559b09a4.png`

Review: accepted after `view_image`. Exactly two rice bowls and one ladle are visible; the ladle pours directly into the left bowl and no third vessel or topping ingredient remains.

### Step 08 — Serve without garnish

Prompt requirement: two finished gyudon bowls with short-grain rice partly visible beneath tender thin beef and onion in light glossy broth; no scallion, pickled ginger, egg, sesame, herbs or side dishes.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-569334ad-934f-42c7-98bd-ad9a98b261f4.png`

Review: accepted after `view_image`. Both bowls contain only rice, beef, onion and broth; there is no garnish or extra vessel, and the result reads as the completed no-decoration gyudon state.

## Final QA

- All eight selected PNGs were opened individually with `view_image`; step 7 was regenerated and rechecked after the extra-bowl failure.
- Every selected file is `1672x941` (the same 16:9 raster dimensions used by the accepted Recipe Nest Vault step illustrations).
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-a.mjs`.
- Contact sheet: `qa-artifacts/gyudon-contact.jpg` (generated after the individual review).
- No central recipe, illustration registry, build, audit, README or test file was modified; no commit was made.
