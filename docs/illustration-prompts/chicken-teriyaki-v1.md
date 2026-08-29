# Chicken teriyaki step illustrations — prompt set v1

Generated on 2026-08-29 with the built-in OpenAI `image_gen` tool. Each distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/chicken-teriyaki/step-01.png` through `step-08.png`.

## Shared master prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault website cooking-step illustration. Create a premium editorial food-process illustration that is visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paint and paper texture, restrained cel shading, accurate natural food colours, an opaque warm off-white handmade-paper background and sparse dusty-pink accents only on a small utensil or ceramic detail. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, and one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, photorealism, glossy 3D rendering, or extra ingredients. Every frame must contain only the step's listed ingredients and the tools needed for that one state.

## Recipe invariants

- Boneless skin-on chicken thighs remain raw until the skillet stages; the finished chicken is opaque and reaches 74°C at the thickest centre.
- The sauce is made only from light soy sauce, mirin, sake and sugar. The 30 ml raw-contact marinade is discarded before the searing stage; no discarded or reserved liquid is depicted in that stage.
- Japanese long onion is only present in the searing and finished-serving stages. Japanese short-grain rice is only present in the final serving stage.
- No sesame, herbs, vegetables, garnish, utensils or vessels appear unless explicitly listed for that step.

## Step prompts and review

### Step 01 — Mix the teriyaki sauce

Prompt requirement: one clear glass bowl with the already combined light soy sauce, mirin, sake and sugar; the sugar is almost dissolved; one small spoon stirs it. No chicken or other food.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-4cb7c736-0880-4460-965b-45d5007389a0.png`

Review: accepted after `view_image`. Opaque cream paper fills the frame, the pale amber sauce and single spoon are clear, and no later ingredient appears.

### Step 02 — Prepare the chicken

Prompt requirement: two raw boneless skin-on chicken thighs on one board, visibly dry and trimmed with small fork piercings in the skin; one plain fork and one small knife only. No sauce, oil, onion or rice.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-aec6c663-b3bf-4e16-86f6-f1d1f65a68c1.png`

Review: accepted after `view_image`. Skin, raw meat and fork marks are legible, with only the listed raw chicken and preparation tools.

### Step 03 — Briefly marinate

Prompt requirement: exactly one transparent lidded glass container with raw skin-on chicken in a thin pale amber sauce coating. Do not show a second bowl, pouring, a reserve vessel or a sauce bottle; the container is the only food vessel.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-4735ae76-88bf-4210-8238-6b7e350060d4.png` — `view_image` showed an unintended transparent cutout/black surround and a too-realistic finish.

Superseded source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-60105fd2-b8fd-4ce4-aaa1-9b92e530fcf9.png` — it was in the right style but showed four thighs, breaking the two-whole-thigh continuity with the 500 g recipe.

Selected generated source after the quantity correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-b7f5e283-6609-41e9-9892-dd8bd145a1d9.png`

Review: accepted after `view_image`. The correction restored an opaque paper background, stronger charcoal/gouache treatment and one closed container only; the raw chicken and thin coating remain unambiguous.

### Step 04 — Sear the skin side

Prompt requirement: one heavy skillet with four separate chicken thighs skin-side down, so the pale flesh side faces upward and only a thin golden skin edge touches the pan; 5 cm Japanese long-onion pieces sear separately in open space; neutral oil only; all raw-contact marinade has already been discarded.

Rejected source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-31c84cfe-0bec-4f7d-a03d-45e66864fed1.png` — `view_image` showed broad browned skin on top and stacked-looking thighs, so skin-side-down orientation was ambiguous.

Superseded source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-dd91e0f9-1316-4806-b499-c96e06048160.png` — its orientation was corrected, but it still showed four thighs rather than the recipe's two whole thighs.

Selected generated source after the quantity correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-2dce0f5a-1ac7-4ddf-af9a-68eb525a4897.png`

Review: accepted after `view_image`. The selected frame shows pale flesh upward, a thin crisp golden contact edge against the pan, separate browned long onion and no marinade/sauce.

### Step 05 — Cook the second side

Prompt requirement: the same separate thighs have been turned skin-side up, with deep golden skin and opaque cooked edges; browned Japanese long-onion pieces remain separate in the skillet; no sauce yet.

Superseded source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-85976ca9-dd95-4a17-abc7-dc4be2675786.png` — the skin-side-up state was clear, but it showed four thighs rather than the same two whole thighs.

Selected generated source after the quantity correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-0da54d16-cf4c-45e6-ac99-a65a10a2fbb5.png`

Review: accepted after `view_image`. Four golden skin-on thighs and browned onion pieces are visible in one skillet, with no premature glaze, rice or garnish.

### Step 06 — Reduce the sauce

Prompt requirement: one skillet with only the reserved pale amber-brown teriyaki sauce reducing to a glossy shallow pool and one spoon; a clean plate beside it holds cooked opaque chicken. No onion or rice.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-9ad65fb1-4d7d-409d-9f9f-78b4f65f8046.png`

Review: accepted after `view_image`. The sauce is visibly separate in the skillet, the chicken is cooked on a clean plate, and no raw-contact liquid or unlisted food is shown.

### Step 07 — Glaze the chicken

Prompt requirement: cooked skin-side-up chicken returns to one skillet; a single spoon applies a narrow stream of glossy reduced teriyaki glaze. Chicken is opaque and fully cooked; no onion, rice or garnish yet.

Superseded source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-bc423ac4-c191-463b-a950-2a87fe80f173.png` — the glazing state was clean but showed four thighs rather than the same two whole thighs.

Selected generated source after the quantity correction: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-3044669f-c97c-4dd3-ad7e-30d8442271ef.png`

Review: accepted after `view_image`. The narrow amber stream, glossy chicken and single spoon communicate glazing without adding any unlisted food.

### Step 08 — Rest, slice and serve

Prompt requirement: one plain plate with hot Japanese short-grain rice, 1.5 cm slices of fully cooked glazed chicken, grilled Japanese long-onion pieces and a restrained pool of remaining glaze. No sesame, herbs or other garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-483fd240-5438-4bfa-903f-6b974b091b4c.png`

Review: accepted after `view_image`. The thin chicken slices, rice, grilled long onion and glaze are the only food; the plate has no extra garnish or utensils.

## Final QA

- All eight selected PNGs were opened individually with `view_image`; steps 3, 4, 5 and 7 were regenerated and rechecked after the quantity-continuity correction, and the earlier step 3/4 style corrections were retained.
- Every selected file is `1672x941` (the same 16:9 raster dimensions used by the accepted Recipe Nest Vault step illustrations).
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-a.mjs`.
- Contact sheet: `qa-artifacts/chicken-teriyaki-contact.jpg` (generated after the individual review).
- No central recipe, illustration registry, build, audit, README or test file was modified; no commit was made.
