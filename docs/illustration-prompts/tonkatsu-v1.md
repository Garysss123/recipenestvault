# Tonkatsu step illustrations — prompt set v1

Generated 2026-08-29 with the built-in OpenAI `image_gen` tool. Every distinct step used one independent generation call. Selected source PNGs were copied to `assets/recipes/illustrations-generated/tonkatsu/step-01.png` through `step-08.png`; contact sheet: `qa-artifacts/tonkatsu-contact.jpg`.

## Shared prompt

Use case: `scientific-educational`. Asset type: Recipe Nest Vault static cooking-step illustration. Premium editorial food-process illustration, visibly non-photorealistic: hand-drawn charcoal contours, soft gouache paper texture, restrained cel shading, warm off-white paper background, natural food colours, sparse dusty-pink accents only on a small tool or ceramic rim. Landscape 16:9, slightly elevated three-quarter/top-down view, generous breathing room, one clear instructional state. No people or hands, text, numerals, labels, arrows, packaging, logos, watermarks, signatures, borders, panel divisions, characters, or photorealism.

Global recipe invariants: two boneless pork loin chops, each about 2 cm thick; 250 g shredded cabbage; homemade soy/ketchup/Worcestershire/sugar sauce; flour, egg plus 15 ml water, airy panko; 1.5 L neutral oil at 170°C; one cutlet at a time or two only in a wide pot; clean rack drainage; thickest pork centre at least 68°C followed by a 3-minute rest; final plate uses only shredded cabbage, yellow mustard, and the listed sauce.

## Step prompts and review

### Step 01 — Simmer the tonkatsu sauce

Prompt: show one small ceramic saucepan with dark glossy sauce made only from soy sauce, ketchup, Worcestershire-style sauce, and sugar, tiny simmer bubbles, one clean spatula; no pork, breading, cabbage, mustard, or finished plate.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-53cf1a2d-b5b6-4c48-ab2a-3ebbd7bf128f.png`

Review: accepted. The sauce-only state is clear, with no unlisted food.

### Step 02 — Prepare cabbage and pork

Prompt: show shredded green cabbage soaking in cold water in one bowl and two raw 2 cm boneless pork loin chops on a dedicated board, excess fat trimmed and connective tissue scored; no breading or cooking.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-50d4c18a-720d-49a8-b391-93be271313ad.png`

Review: accepted. Cabbage water bath and two scored raw chops are visible.

### Step 03 — Tenderize and season

Prompt: show exactly two raw flattened 2 cm pork chops with shallow cuts, fine salt and black pepper, and one wooden meat mallet on the dedicated board; no breading or oil.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-45dfa16c-dbe2-499e-99a6-a9d85239be79.png`

Review: accepted. Both chops show scoring and salt/pepper; no later ingredients appear.

### Step 04 — Set up three breading dishes

Prompt: show three separate shallow dishes in flour -> beaten egg with cold water -> coarse panko order, with raw pork moving through the sequence and one fully panko-coated chop on a clean tray; no frying, cabbage, or sauce.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-c64b69a9-c829-4438-b261-0fbec3aa1114.png`

Review: accepted. Separate flour, egg wash, panko, and breaded raw pork are legible.

### Step 05 — Rest and heat the oil

Prompt: show two fully breaded raw 2 cm chops spaced on a clean rack for a 10-minute rest beside one deep pot of 170°C neutral oil with one analog thermometer; no toppings.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-a3a1ac8f-64b3-4d0f-b30f-1d0ca5d08672.png`

Review: accepted. Two chops, panko, rack, and oil-temperature setup are clear.

### Step 06 — Fry in small batches

Prompt: show exactly one panko-coated 2 cm pork chop flat in 170°C oil, pale-golden first-fry crust, one clean slotted turner ready to flip, and one empty clean rack; no second cutlet or garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-f3aadb33-fb3f-41a9-aaab-d288b6a2a294.png`

Review: accepted. One cutlet is frying alone with the first-fry state and empty rack.

### Step 07 — Drain and verify 68°C

Prompt: show exactly two deep-golden cooked 2 cm cutlets spaced on a clean rack with oil drops, one clean thermometer probe checking the thickest centre, and a clean knife for the later slice; no cabbage, sauce, or mustard.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-49d20814-e415-45a8-92b2-6eef57a54fcf.png`

Review: accepted. Two cutlets drain without stacking and the opaque cooked centre/probe check are clear.

### Step 08 — Slice and serve

Prompt: show only two tonkatsu cutlets sliced into neat pieces on a plain white plate, with exactly 250 g shredded green cabbage, 15 g yellow mustard, and a modest 80 ml dark homemade tonkatsu sauce; no rice, soup, pickles, tomato, cucumber, parsley, sesame, lemon, or other garnish.

Selected generated source: `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01\exec-1cd31297-07d2-44ee-92ba-2e2f9517ab54.png`

Review: accepted. Sliced panko cutlets, shredded cabbage, mustard, and sauce are visually distinct and limited to the recipe.

## Final QA

- All eight selected PNGs were opened individually with `view_image`.
- `scripts/illustration-contact-sheet.mjs` generated `qa-artifacts/tonkatsu-contact.jpg` from exactly eight selected PNGs; the contact sheet was opened and reviewed.
- SHA-256 hashes for the copied selected sources are recorded in `src/japanese-illustration-sets-b.mjs`.
- No central recipe, illustration registry, build, audit, README, or test file was modified; no commit was made.
