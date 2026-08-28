# Wonton soup step illustrations — prompt set v1

Generated and reviewed on 2026-08-29 with the built-in OpenAI `image_gen` tool. The selected PNGs are in `assets/recipes/illustrations-generated/wonton-soup/step-01.png` through `step-08.png`; the contact sheet is `qa-artifacts/wonton-soup-contact.jpg`.

## Shared visual direction

Use case: `scientific-educational`. Asset type: Recipe Nest Vault cooking-step illustration. Premium editorial food-process illustration, visibly illustrated and never photorealistic: warm off-white cream paper, hand-drawn charcoal contours, soft gouache texture, restrained cel shading, accurate natural food colours, sparse dusty-pink accents only on a small utensil or ceramic rim. Landscape 16:9, slightly elevated three-quarter or top-down framing, generous breathing room, one clear instructional state, no people or hands, no text, numerals, labels, arrows, packaged products, logos, watermarks, signatures, borders, or panel divisions.

Global method invariants from `src/recipe-expanded-b.mjs` and the publication overrides in `src/recipes.mjs`: make a sticky cohesive pork-and-shrimp filling; use 48 square wrappers with about 12 g per wrapper, folded into triangles with the lower corners joined; hold clear chicken broth at 85–90°C; use a separate 2 L pot of rolling-boil water; cook three batches of 16; lift when wontons float, wrappers are semi-translucent, and the pork-shrimp centre reaches 74°C; divide into four bowls of 12. Only scallion is permitted as a visible garnish. Do not show bok choy, other leafy vegetables, cilantro, parsley, seaweed/nori, chili, sesame seeds, noodles, or extra garnish.

## Step-specific prompts

### 1. Make the pork-and-shrimp filling

Show one ceramic mixing bowl with cohesive pale pink filling made from ground pork and finely chopped peeled shrimp, visibly speckled with ginger mince and scallion mince. A single wooden utensil mixes in one direction; the filling is sticky and holds together. Small measured cups may show only light soy sauce, Shaoxing wine, sesame oil, and salt. No wrappers, broth, vegetables, garnish, or finished wontons.

### 2. Fill and seal 48 wontons — corrected count

Show exactly 48 completed wontons in a countable arrangement of precisely six horizontal rows and eight columns (6 x 8), with no seventh/eighth row or extra pieces. Each pale square-wrapper wonton is folded into a clean triangle, lower corners joined, seam sealed, and subtly bulged by about 12 g filling. One tiny dish of sealing water may sit outside the tray; no other ingredients or later cooking states.

The first candidate rendered approximately 8 x 8 pieces (64), so it was rejected and regenerated with the explicit six-row/eight-column count constraint. The selected candidate was re-opened and confirmed visually as six rows of eight.

### 3. Warm the clear broth

Show one pale saucepan with clear golden chicken stock, ginger slices, light soy sauce, sesame oil, and restrained white pepper. Tiny edge bubbles and gentle steam indicate a bare simmer, never a rolling boil. One clean analog thermometer probe communicates the 85–90°C hold without visible numerals. No wontons, wrappers, vegetables, garnish, or second pot.

### 4. Boil the wonton water

Show the simultaneous two-pot state: one large stainless pot of plain water at an unmistakable vigorous rolling boil (the separate 2 L water), and one smaller saucepan of clear golden broth with ginger at a quiet 85–90°C bare simmer. One thermometer probe is in the broth; no wontons or garnish are present. The contrast between rolling boil and bare simmer is the only instructional action.

### 5. Cook three batches

Show one wide pot of plain water at a gentle boil with exactly one batch of 16 triangular square-wrapper wontons, arranged visibly as four by four. A single slotted spoon nudges them gently; wrappers are just beginning to turn translucent. This represents three batches for all 48, but only one batch is shown in the pot. No broth, vegetables, or garnish.

### 6. Check doneness and lift promptly

Show several floating triangular wontons in gently boiling plain water. Their wrappers are glossy and semi-translucent and their pork-shrimp centres are opaque and cooked through. A single slotted spoon lifts one intact wonton while one thermometer probe touches another to imply the 74°C check without numerals. No broth, serving bowls, vegetables, or garnish.

### 7. Divide the bowls

Show exactly four matching deep white bowls in a two-by-two layout, each with exactly twelve plump triangular wontons (48 total) in clear hot golden broth. Wontons are silky and slightly translucent; only fresh scallion rings are scattered on top. One ceramic ladle pours broth into the last bowl while the other three are already assembled. No leafy vegetables, cilantro, seaweed, chili, sesame, mushrooms, egg, or extra garnish.

### 8. Serve within five minutes

Show only the final serving state: four matching bowls, exactly twelve wontons per bowl, clear hot broth, silky slightly translucent wrappers, and scallion rings as the only garnish. Gentle steam communicates the five-minute serving window. No ladle, side dish, vegetables, cilantro, seaweed/nori, chili, noodles, or decorative garnish.

## QA and provenance

- Every selected PNG was opened with `view_image` individually before copying into the workspace.
- Step 2 was regenerated after the first candidate showed more than 48 pieces; the corrected candidate was opened again and confirmed as 6 x 8.
- `scripts/illustration-contact-sheet.mjs` produced `qa-artifacts/wonton-soup-contact.jpg` from exactly 8 selected PNGs; the contact sheet was opened and inspected.
- No source, README, or test files were changed; no commit was made.
- Generation source: built-in OpenAI `image_gen`; original candidates remain under `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01`.
