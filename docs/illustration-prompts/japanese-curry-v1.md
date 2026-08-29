# Japanese chicken curry step illustrations — prompt set v1

Generated on 2026-08-29 with the built-in OpenAI `image_gen` tool. Each distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/japanese-curry/step-01.png` through `step-08.png`.

## Shared master prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault website cooking-step illustration. Create a premium editorial food-process illustration that is visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paint and paper texture, restrained cel shading, accurate natural food colours, an opaque warm off-white handmade-paper background and sparse dusty-pink accents only on a small utensil or ceramic detail. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, and one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, photorealism, glossy 3D rendering, or extra ingredients. Every frame must contain only the step's listed ingredients and the tools needed for that one state.

## Recipe invariants

- This is a fine-textured ground-chicken curry: 300 g ground chicken becomes coarse irregular meat crumbles, never large meat chunks or rice-like grains.
- Vegetables stay finely diced throughout: onion finely diced, carrot about 6 mm (within the recipe's 5–8 mm range), and potato about 8 mm. No large potato or carrot pieces appear.
- The roux is 100 g. It is dissolved only after the heat is turned off, then the curry returns to low heat to thicken. Chicken reaches 74°C and the pieces are tender before serving.
- The final state is four rice plates with fine chicken curry and 80 g total red fukujinzuke; no egg, sesame, salad, herbs or other garnish.

## Step prompts and review

### Step 01 — Cook and hold the rice

Prompt requirement: one covered ceramic pot with 400 g hot cooked Japanese short-grain rice and a small steam curl; no curry or toppings.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-43ef9462-9d1d-4459-be85-76494b50be98.png`

Review: accepted after `view_image`. The lid, visible rice edge and painted steam communicate the covered hold state without later ingredients.

### Step 02 — Cut the fine vegetables

Prompt requirement: one board with separate piles of finely diced onion, approximately 6 mm carrot and approximately 8 mm potato, plus one knife; no chicken, garlic, liquid, roux, rice or pickles.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-20ffad56-61b4-4e51-8ae4-f0a25aa3429a.png`

Review: accepted after `view_image`. The three small-dice piles are clearly separated and visibly fine; no large chunks or wedges appear.

### Step 03 — Soften onion and garlic

Prompt requirement: finely diced translucent onion and a small amount of finely grated garlic bloom in neutral oil in one heavy pot with one wooden spatula; no chicken or vegetables added later.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-e3f91253-b09c-4a71-82cd-9c51a619e14e.png`

Review: accepted after `view_image`. Tiny translucent onion and a distinct fine garlic mound are visible, with no carrot, potato, curry or rice.

### Step 04 — Brown the ground chicken

Prompt requirement: browned ground chicken is broken into coarse irregular 6–14 mm meat crumbles with short fibres among fine onion and garlic in one pot; no rice-like grains, no large chunks and no vegetables beyond onion/garlic.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-415d2023-9384-4fcc-8d0a-2e7078402eea.png` — `view_image` made the chicken crumbles read like uniform rice grains.

Selected generated source after targeted texture correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-e41c732d-b70e-4cd4-84fa-da81d0d9d1d2.png`

Review: accepted after `view_image`. The corrected frame shows rugged, uneven, fibrous ground-chicken crumbles with fine onion and garlic, with no premature potato, carrot, roux or rice.

### Step 05 — Simmer the fine vegetables

Prompt requirement: browned ground-chicken crumbles, fine onion/garlic, tiny 8 mm potato dice and tiny 6 mm carrot dice simmer in water under a slightly offset clear lid; no large pieces, roux, rice or pickles.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-149d6534-639b-42e8-ac5b-45e26d8f7af9.png`

Review: accepted after `view_image`. The liquid contains small potato and carrot dice and irregular chicken crumbles, with no large vegetable or meat pieces.

### Step 06 — Dissolve the curry roux off heat

Prompt requirement: one pot of loose liquid with irregular ground chicken and tiny vegetables; several small broken Japanese curry-roux pieces are melting while a spatula stirs. Heat is off, no hard boil; no rice or fukujinzuke.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-e94fd065-efe6-4954-a8a0-7325ecffebb2.png`

Review: accepted after `view_image`. Broken roux pieces are visible in the loose curry liquid, the small vegetable dice remain clear, and no flame or hard boil appears.

### Step 07 — Thicken and verify

Prompt requirement: thick glossy curry on low heat with coarse fine chicken crumbles and tiny onion, carrot and potato dice; the roux is fully dissolved; no rice, pickles or garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-82385cd3-d1ec-49d1-8dd1-3a7c96dc722b.png`

Review: accepted after `view_image`. The finished curry is glossy and fine-textured, with small vegetable dice and irregular chicken crumbles rather than large chunks.

### Step 08 — Serve four plates with red fukujinzuke

Prompt requirement: exactly four plates arranged naturally, each with white short-grain rice, fine ground-chicken curry with tiny vegetables, and one modest red fukujinzuke portion; no other garnish or food.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-24648374-44f1-4a1a-88d1-18234c94c489.png`

Review: accepted after `view_image`. Four plates and four red pickle portions are countable; the curry is fine-textured and the composition contains no egg, sesame, salad or extra garnish.

## Final QA

- All eight selected PNGs were opened individually with `view_image`; step 4 was regenerated and rechecked after the rice-like-crumble failure.
- Every selected file is `1672x941` (the same 16:9 raster dimensions used by the accepted Recipe Nest Vault step illustrations).
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-a.mjs`.
- Contact sheet: `qa-artifacts/japanese-curry-contact.jpg` (generated after the individual review).
- No central recipe, illustration registry, build, audit, README or test file was modified; no commit was made.
