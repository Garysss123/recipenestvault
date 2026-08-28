# Char siu step illustrations — prompt set v1

Generated 2026-08-29 with the built-in OpenAI `image_gen` tool. Each of the eight independent assets used one built-in generation call, followed by `view_image` review. The selected PNGs are copied to `assets/recipes/illustrations-generated/char-siu/step-01.png` through `step-08.png`.

## Generator and output

- Generator: built-in OpenAI `image_gen` (default mode), not the CLI fallback.
- Intended use: Recipe Nest Vault cooking-method illustrations.
- Output framing: landscape 16:9. The generated images are 1672 × 940 PNGs.
- Source directory: `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\`.
- No source code, README, tests, or recipe data were changed.

## Master prompt

```text
Use case: scientific-educational
Asset type: Recipe Nest Vault website cooking-step illustration
Primary request: an original premium editorial food-process illustration of one precise Cantonese char-siu cooking state, with an accurate ingredient whitelist for the requested step.
Scene/backdrop: warm cream/off-white paper with subtle fibers, minimal kitchen surface or cookware appropriate to the step.
Style/medium: premium editorial food illustration, hand-drawn charcoal contours, soft gouache washes, restrained cel shading, accurate natural food colours, visibly illustrated and never photorealistic.
Composition/framing: landscape 16:9, slightly elevated three-quarter or top-down view, one clear instructional state, generous breathing room.
Lighting/mood: soft diffuse daylight or gentle oven/stovetop glow, calm instructional mood.
Color palette: warm cream and charcoal with muted natural food colours; dusty pink only as a small utensil-handle accent, never as food or garnish.
Materials/textures: lightly textured paper, tactile ceramic/metal/wood, painterly charcoal edges.
Text (verbatim): none.
Constraints: only the step's listed ingredients and necessary neutral cookware; no text, numerals, labels, arrows, icons, logos, watermarks, signatures, borders, panel divisions, packaged products, brand marks, people, hands, mascot characters, or unlisted garnish.
Avoid: photorealism, later-step ingredients, duplicate states, decorative clutter, and any ingredient not explicitly allowed for that step.
```

## Step-specific requirements

1. **Mix and reserve the basting sauce.** Show fermented bean curd, hoisin, 30 g honey, maltose, light soy, Shaoxing wine, five-spice, garlic, white pepper, and sesame oil being mixed. Show exactly 30 ml clean sauce separated in a clean covered bowl before raw contact, with the separate 15 g final honey aside. No pork, water, scallion, or parsley.
2. **Marinate and discard used sauce.** Show only broad boneless pork shoulder strips coated in the raw-contact marinade inside one lidded glass container ready for refrigeration. Do not visualize pouring, saving, transferring, or reusing the raw-contact marinade; its disposal remains an explicit written instruction. Do not show the clean reserved sauce or final honey. No cooked meat or garnish.
3. **Set up the roasting tray.** Show raw pork shoulder strips spaced on a wire rack above a foil-lined tray; 350 ml hot water must be visibly below the rack. No sauce or garnish.
4. **Roast the first side.** Show the spaced pork on the rack above the water tray, just beginning to brown at the edges. No brushing, glaze, or garnish.
5. **Baste at lower heat.** Show the same rack-over-water setup, a bowl of the clean reserved sauce thinned with warm water, and a brush applying only that mixture. No raw-contact marinade or final honey.
6. **Lacquer with honey.** Show the rack-over-water setup, final honey only, and a thin glossy mahogany coat with gentle bubbles. No reserved sauce, raw-contact marinade, or garnish.
7. **Rest and slice.** Show rested roasted pork on the rack being cut perpendicular to the grain into thin, even 5 mm pieces, with only a tiny dish of tray juices and a brush. No parsley or scallion yet.
8. **Serve.** Show glossy sliced char siu on one plain white plate and exactly one small curly-parsley sprig at the side. Parsley is the only garnish; no sauce bowl, scallion, or other decoration.

## Targeted prompt corrections retained in the selected assets

- Repeated the raw-contact-versus-clean-sauce separation in Steps 1, 2, and 5; the final honey is excluded until Step 6. Step 2 was rerendered after review to remove a misleading discard-bowl/pouring scene: the selected version contains only one lidded glass marinating container with coated raw pork.
- Repeated “pork shoulder strips,” spacing, and “water below the rack” in Steps 3–6 to prevent pork from sitting in water or becoming a crowded tray.
- Step 3 was rerendered after review to make the thin red-brown marinade film visible while keeping the pork raw and the water strictly below the rack.
- Kept Step 6 to final honey only, with mahogany gloss and no black char.
- Specified rest-before-slicing, perpendicular grain direction, and thin 5 mm slices in Step 7.
- Restricted Step 8 to one small curly-parsley sprig and no other garnish.
- Review result: all 8 selected assets passed visual inspection after the documented Step 2 and Step 3 rerenders.

## Generation sources and selected files

| Step | Built-in generation source PNG | Selected workspace PNG | Review |
| --- | --- | --- | --- |
| 01 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-34109da0-4620-4444-b0e0-6945313dc2a0.png` | `assets/recipes/illustrations-generated/char-siu/step-01.png` | PASS |
| 02 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-e471f92a-661a-4861-9c95-a421467d1bfc.png` | `assets/recipes/illustrations-generated/char-siu/step-02.png` | PASS (rerendered) |
| 03 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-532f836e-cac6-447f-ae37-58f08467ba74.png` | `assets/recipes/illustrations-generated/char-siu/step-03.png` | PASS (rerendered) |
| 04 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-b6dfd092-c9a6-4a02-a4b1-c8042d7ebb8f.png` | `assets/recipes/illustrations-generated/char-siu/step-04.png` | PASS |
| 05 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-d31bd531-fd47-4a94-a669-c861c01eef55.png` | `assets/recipes/illustrations-generated/char-siu/step-05.png` | PASS |
| 06 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-0468fe62-362f-422d-8ef2-0fb126a51e50.png` | `assets/recipes/illustrations-generated/char-siu/step-06.png` | PASS |
| 07 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-43bd17e3-bd0c-434c-99d0-0e0a52638194.png` | `assets/recipes/illustrations-generated/char-siu/step-07.png` | PASS |
| 08 | `C:\Users\abc12\.codex\generated_images\01a04987-ce07-7e73-aeb3-9b90dd282c51\exec-d765e5a1-04ea-4530-8e8a-4608cb54d1f6.png` | `assets/recipes/illustrations-generated/char-siu/step-08.png` | PASS |
