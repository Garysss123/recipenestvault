# Beef chow fun step illustrations — prompt set v1

Generated and reviewed on 2026-08-29 with the built-in OpenAI `image_gen` tool. The selected PNGs are in `assets/recipes/illustrations-generated/beef-chow-fun/step-01.png` through `step-08.png`; the contact sheet is `qa-artifacts/beef-chow-fun-contact.jpg`.

## Shared visual direction

Use case: `scientific-educational`. Asset type: Recipe Nest Vault cooking-step illustration. Premium editorial food-process illustration, never a photograph: warm off-white cream paper, hand-drawn charcoal contours, soft gouache texture, restrained cel shading, accurate natural food colours, sparse dusty-pink accents only on a small utensil or ceramic rim. Landscape 16:9, slightly elevated three-quarter or top-down framing, generous breathing room, one clear instructional state, no people or hands, no text, numerals, labels, arrows, packaged products, logos, watermarks, signatures, borders, or panel divisions.

Global method invariants from `src/recipe-expanded-b.mjs`: beef is flank steak cut across the grain at 3 mm; sealed fresh wide rice noodles rest 20 minutes and are separated by hand without soaking or rinsing; beef is seared in one layer and removed at about 80% cooked; aromatics are thin ginger and scallion split into 7.5 cm pieces; broad noodles stay intact; sauce goes around the hot wok edge; final dish is dry-fried with no pooled liquid; beef returns with crisp mung bean sprouts and reaches 71°C before immediate serving. Never draw fine noodles.

## Step-specific prompts

### 1. Velvet the beef

Show only raw flank-steak slices cut across the grain at 3 mm in a shallow ceramic bowl, coated in a tacky marinade. Include only the listed water, baking soda, cornstarch, oyster sauce, Shaoxing wine, and light soy sauce in small measured vessels; one utensil may massage the slices. The slices must be visibly thin and fibrous; no later ingredients, cooking, noodles, sprouts, ginger, or scallions.

### 2. Loosen noodles and mix the sauce

Show only sealed fresh wide rice noodles after 20 minutes at room temperature, gently separated dry on a tray, with one small bowl of mixed Shaoxing wine, light soy sauce, dark soy sauce, sesame oil, sugar, and white pepper. Noodles are broad, flat, and intact; no water bath, soaking, rinsing, beef, vegetables, or fine noodles. Packaging has no branding or text.

### 3. Sear the beef — corrected selected version

Show one black Cantonese wok over high heat with 3 mm across-the-grain flank-beef slices in exactly one single layer. Every piece is a broad, irregular, flat flexible sheet with a narrow edge and visible grain, never a cube, chunk, medallion, thick steak, or thick strip. Browned faces and edges remain rosy at the centre to show about 80% cooked; one spatula lifts thin slices toward a plain holding plate. Only beef and neutral oil; no later ingredients.

The first candidate rendered the meat as chunky pieces, so it was rejected and regenerated with the explicit flat/flexible 3 mm-slice constraints above.

### 4. Bloom ginger and scallion

Show one black wok with only neutral oil, thin ginger slices, and scallion segments split and cut to exactly 7.5 cm. A single spatula lifts the aromatics for the 30-second fragrant bloom; the wok is otherwise empty. No beef, noodles, sauce, sprouts, or other vegetables.

### 5. Toss in the noodles

Show intact broad flat fresh rice-noodle ribbons lifted with one spatula together with the already-bloomed thin ginger and 7.5 cm scallion pieces. The ribbons remain whole and silky; no sauce yet, no beef or sprouts, and absolutely no vermicelli, spaghetti, ramen, or other fine noodles.

### 6. Add the sauce around the hot wok

Show broad intact noodles with ginger and 7.5 cm scallion in one hot wok while a small ceramic pourer adds a narrow ribbon of the mixed Shaoxing wine, light soy, dark soy, sesame oil, sugar, and white pepper around the hot inner rim. The sauce sizzles and integrates immediately; noodles are lightly charred, separate, glossy but dry, with no puddle, gravy, or broth. No beef or sprouts yet.

### 7. Return beef and sprouts — corrected selected version

Show one black wok and one spatula lifting broad intact noodles with crisp mung bean sprouts, thin ginger, 7.5 cm scallion, and fully cooked beef. Every beef piece is a broad irregular flexible cross-grain sheet about 3 mm thick, with fine grain and a narrow edge; it may curl or fold but never becomes a cube, chunk, medallion, thick steak, or chunky strip. Beef is opaque brown-tan with no pink; sprouts remain white, firm, and crisp. Dry-fried only, no pooled sauce, gravy, broth, or thermometer.

The first candidate showed beef with a pink centre; the second candidate still looked too thick. The selected candidate was regenerated with both explicit no-pink and flat/flexible 3 mm-sheet constraints.

### 8. Serve for wok hei — corrected selected version

Show one neutral plate of just-finished dry-fried beef chow fun after heat is off: broad intact noodles, crisp mung bean sprouts, thin ginger, 7.5 cm scallion, and fully cooked opaque beef. Beef must be several irregular flat flexible sheets about 3 mm thick, cut across the grain, with visible fine grain lines and narrow edges; pieces may drape or curl, never cubes, chunks, medallions, thick steak, or chunky strips. No sauce, broth, extra garnish, or side dishes.

The first candidate was replaced because the beef read as thick pieces. The selected candidate was regenerated with the same explicit thin-sheet constraints used for step 7.

## QA and provenance

- Every selected PNG was opened with `view_image` individually before copying into the workspace.
- The two regenerated candidates (step 3/7/8) were opened again after correction and the beef contact sheet was rebuilt and inspected.
- `scripts/illustration-contact-sheet.mjs` produced `qa-artifacts/beef-chow-fun-contact.jpg` from exactly 8 selected PNGs.
- No source, README, or test files were changed; no commit was made.
- Generation source: built-in OpenAI `image_gen`; original candidates remain under `C:\Users\abc12\.codex\generated_images\01a04987-fdfd-7e72-9c54-21fb34c28c01`.
