# Japanese batch A recipe research and photo provenance

Research and manual image review completed 2026-08-29 for all seven batch-A recipes: `chicken-teriyaki`, `gyudon`, `oyakodon`, `katsudon`, `japanese-curry`, `omurice`, and `nikujaga`. The recipe objects are in `src/japanese-recipes-a.mjs`, the approved photo manifest is in `src/japanese-photos-a.mjs`, and the selected files are in `assets/recipes/approved/`.

## Method and publication standard

Each recipe was cross-checked against at least two independent HTTPS recipe sources, then rewritten into an original five-language format with measured ingredients, explicit timing, heat and doneness cues. The recipe text does not reproduce or translate a source verbatim. The two selected images are real photographs, not AI or rendered artwork. Each approved file was copied byte-for-byte from the recorded original-file URL and manually inspected with `view_image`; no crop, resize, colour correction, or compression was applied to the approved source copy. Any responsive derivatives made later must be recorded as build-time derivatives.

## Chicken teriyaki (`chicken-teriyaki`)

### Recipe sources cross-checked

1. [Just One Cookbook — Chicken Teriyaki](https://www.justonecookbook.com/chicken-teriyaki/) — pan-seared boneless chicken thighs, a four-part soy/mirin/sake/sugar tare, skin-side cooking, reduction and glazing.
2. [Kikkoman — Teriyaki Chicken](https://www.kikkoman.com/en/cookbook/recipe/00000185.html) — chicken thigh, soy and mirin sauce, skin-side browning, covered low-heat finish, slicing and serving with a Japanese long-onion/shishito-style accompaniment.

### Standardized recipe decisions

The published version uses 500 g boneless skin-on chicken thighs, 10 ml neutral oil, 45 ml each light soy and mirin, 30 ml sake, 18 g sugar, 120 g Japanese long onion, and 300 g cooked short-grain rice for serving. The sauce is briefly chilled with the raw chicken, then all 30 ml of raw-contact marinade is explicitly discarded before the chicken is cooked; only the reserved clean sauce is reduced and glazed. The chicken is checked at 74°C in the thickest centre, rested 3 minutes, sliced 1.5 cm, and served with the grilled long onion. The photo does not show rice, so rice remains a disclosed serving ingredient but is excluded from `visualSpec`.

### Selected photograph and license evidence

- Title: `Chicken teriyaki`
- Author: `Blue Lotus`
- Source page: `https://commons.wikimedia.org/w/index.php?title=File:Chicken_teriyaki.jpg&oldid=855997189`
- Original file downloaded: `https://live.staticflickr.com/86/242216760_2bc79ce023_o.jpg`
- License: `CC BY 2.0`
- License URL: `https://creativecommons.org/licenses/by/2.0/`
- Approved asset: `assets/recipes/approved/chicken-teriyaki.jpg`
- SHA-256: `734449612813916F2D80092D45E08D1215D4905313000E343DDEC283567AC1B0`
- Modification note: unchanged original copy at the approved-source stage; future responsive derivatives must retain CC BY 2.0 attribution and disclose resizing/cropping/compression.

### Visual-match conclusion and risks

Manual inspection confirms a real photograph of sliced skin-on chicken thigh with a dark glossy teriyaki sauce and grilled Japanese long-onion pieces. It has no breading, sesame, or unrelated garnish, matching the revised ingredient list and `visualSpec`. The selected source replaces an initially considered candidate whose visible breading/sesame did not match this recipe. Remaining risk is the source image's dark plate/sauce pooling; this does not change the visible ingredients or cooking method. Attribution to Blue Lotus with a Commons/source link is required because the license is CC BY 2.0.

## Gyudon (`gyudon`)

### Recipe sources cross-checked

1. [Just One Cookbook — Gyudon](https://www.justonecookbook.com/gyudon/) — thin beef and onion layered into dashi, sake, mirin, soy and sugar, simmered briefly and served over hot rice.
2. [Kikkoman — Gyudon (Beef Bowl)](https://www.kikkoman.com/en/culture/foodforum/recipe/traditional-26-2.html) — thin-sliced beef and onion with dashi, soy, sugar and sake, brief simmer and rice-bowl assembly.

### Standardized recipe decisions

The published version uses 300 g thin-sliced beef, 200 g onion, 240 ml dashi, 30 ml sake, 30 ml mirin, 45 ml soy sauce, 18 g sugar, and 360 g cooked short-grain rice. Beef is separated into the simmering broth and cooked until no pink remains and the thickest piece reaches a conservative 71°C. The recipe intentionally has no scallion or pickled red ginger: the selected photo shows only beef, onion and rice, so Step 8, `imageAlt`, and `visualSpec` describe an un garnished bowl rather than implying invisible toppings.

### Selected photograph and license evidence

- Title: `Yoshinoya beef bowl, regular size`
- Author: `Ocdp`
- Source page: `https://commons.wikimedia.org/w/index.php?title=File:Gyuu-don_001.jpg&oldid=1054715074`
- Original file downloaded: `https://upload.wikimedia.org/wikipedia/commons/4/45/Gyuu-don_001.jpg`
- License: `CC0 1.0`
- License URL: `https://creativecommons.org/publicdomain/zero/1.0/`
- Approved asset: `assets/recipes/approved/gyudon.jpg`
- SHA-256: `0CB838549804354094F57F0060019F2740A6BC171EA730002BF58C7EBC264CA9`
- Modification note: unchanged original copy at the approved-source stage; future responsive derivatives should still retain the source record.

### Visual-match conclusion and risks

Manual inspection confirms a real photographed gyudon bowl with thin cooked beef, tender onion and white rice. No scallion, pickled ginger, egg, or other garnish is visible, matching the deliberately un garnished recipe and alt text. The image is a restaurant example rather than a documented home session, so the recipe is presented as a compatible dish reference, not as a claim that the source author cooked this exact standardized revision. The CC0 dedication permits commercial reuse and adaptation; author/source metadata is retained for provenance.

## Checkpoint status

- `chicken-teriyaki`: recipe complete, 8 five-language steps, photo manually reviewed and approved.
- `gyudon`: recipe complete, 8 five-language steps, photo manually reviewed and approved.
- This expanded checkpoint now includes `oyakodon`, `katsudon`, and `japanese-curry`; `katsudon` uses pasteurized eggs for its softly set but fully heated topping.

## Oyakodon (`oyakodon`)

### Recipe sources cross-checked

1. [Just One Cookbook — Oyakodon](https://www.justonecookbook.com/oyakodon/) — bite-size chicken and onion simmered in dashi, soy, mirin and sugar, with egg added in two stages and mitsuba/green onion as a finish.
2. [Kikkoman — Oyakodon](https://www.kikkoman.com/en/cookbook/washoku/oyakodon.html) — Japanese chicken-and-egg bowl method and measured dashi-seasoned simmer.
3. [MAFF — Oyakodon](https://www.maff.go.jp/e/policies/market/k_ryouri/search_menu/3539/index.html) — Japanese government recipe reference used as a cross-check for the dish structure and egg finish.

### Standardized recipe decisions

The published version uses 300 g boneless chicken thigh, 150 g onion, 200 g beaten egg, 180 ml dashi, 30 ml each soy and mirin, 15 ml sake, 8 g sugar, 360 g cooked short-grain rice, and 15 g mitsuba. Chicken is simmered 6–8 minutes until the thickest piece reaches 74°C; the egg is added in two stages and also reaches 74°C while remaining tender. Mitsuba is used instead of scallion because it is clearly visible in the selected photograph.

### Selected photograph and license evidence

- Title: `Oyakodon 002`
- Author: `Ocdp`
- Source page: `https://commons.wikimedia.org/w/index.php?title=File:Oyakodon_002.jpg&oldid=1210487695`
- Original file downloaded: `https://upload.wikimedia.org/wikipedia/commons/4/46/Oyakodon_002.jpg`
- License: `CC0 1.0`
- License URL: `https://creativecommons.org/publicdomain/zero/1.0/`
- Approved asset: `assets/recipes/approved/oyakodon.jpg`
- SHA-256: `6FF5F5BD3E0A3C0BF0847EEC6B0DA37DE050072BB5DD73AC012AB61FFAE6DAAF`
- Modification note: unchanged original copy at the approved-source stage; future responsive derivatives should retain the source record.

### Visual-match conclusion and risks

Manual inspection confirms a real photograph showing chicken pieces, translucent onion, softly set egg and a conspicuous mitsuba garnish in a patterned donburi. The five-language recipe, alt text and visual brief disclose mitsuba and do not claim an unlisted scallion garnish. The soft appearance is paired with an explicit 74°C egg target; the image is a finished-dish reference, not evidence of a particular cook session.

## Katsudon (`katsudon`)

### Recipe sources cross-checked

1. [Just One Cookbook — Katsudon](https://www.justonecookbook.com/katsudon/) — tonkatsu preparation, onion/dashi simmer, two-stage egg addition, and donburi assembly.
2. [Kikkoman — Katsudon (Tonkatsu Rice Bowl)](https://www.kikkoman.com/en/cookbook/recipe/00058703.html) — breaded pork cutlet, dashi-seasoned egg topping and rice-bowl method.

### Standardized recipe decisions

The published version uses two 180 g pork loin cutlets, 2 g salt, 0.5 g white pepper, 30 g flour, 50 g breading egg, 80 g panko, 500 ml frying oil, 150 g onion, 180 ml dashi, 30 ml each soy and mirin, 15 ml sake, 12 g sugar, 150 g pasteurized topping egg, 360 g rice and 10 g mitsuba. The cutlets are fried at 175°C and reach 71°C in the centre before resting; the pasteurized egg topping is added in two stages and heated to 74°C while remaining softly set. Mitsuba, not scallion, is the only fresh garnish because it is visible in the selected photograph.

### Selected photograph and license evidence

- Title: `Katsudon 001`
- Author: `Ocdp`
- Source page: `https://commons.wikimedia.org/w/index.php?title=File:Katsudon_001.jpg&oldid=1199411183`
- Original file downloaded: `https://upload.wikimedia.org/wikipedia/commons/a/ad/Katsudon_001.jpg`
- License: `CC0 1.0`
- License URL: `https://creativecommons.org/publicdomain/zero/1.0/`
- Approved asset: `assets/recipes/approved/katsudon.jpg`
- SHA-256: `C6BA32A9BA71F43B0B98637E3C4A52FC1F1DE6EB5C73271C970BEAE176D8E5E3`
- Modification note: unchanged original copy at the approved-source stage; future responsive derivatives should retain the source record.

### Visual-match conclusion and risks

Manual inspection confirms a real photograph of white rice, sliced golden pork cutlet, onion-rich egg topping and visible mitsuba. The recipe does not rely on a runny ordinary egg: the manifest's standardized method uses pasteurized eggs and a measured 74°C target while retaining a tender set. The CC0 dedication permits commercial reuse and adaptation; author and source metadata remain recorded.

## Japanese curry (`japanese-curry`)

### Recipe sources cross-checked

1. [Just One Cookbook — Japanese Chicken Curry](https://www.justonecookbook.com/simple-chicken-curry/) — chicken curry roux, onion, carrot, potato and rice method.
2. [Taste of Japan (JETRO) — Beef Curry](https://japan-food.jetro.go.jp/en/recipe/122.html) — curry roux dissolution, covered vegetable simmer and rice serving sequence used as a technique cross-check.
3. [Kikkoman — Japanese Curry Rice feature](https://www.kikkoman.com/en/cookbook/feature/japanese_curry.html) — Japanese curry rice context and the common roux-and-rice format.

### Standardized recipe decisions

The published version deliberately follows the selected image's fine texture: 300 g ground chicken, 250 g finely diced onion, 100 g carrot cut 5–8 mm, 180 g potato cut 8 mm, 10 g garlic, 15 ml oil, 600 ml water, 100 g Japanese curry roux, 400 g rice and 80 g red fukujinzuke. The small vegetable pieces simmer 10–12 minutes rather than using the longer timing needed for large chunks. Ground chicken is cooked until the thickest clump reaches 74°C; the measured fukujinzuke is the only serving garnish.

### Selected photograph and license evidence

- Title: `Chicken keema curry`
- Author: `Yamaguchi Yoshiaki`
- Source page: `https://commons.wikimedia.org/w/index.php?title=File:Chiken_curry_(2705660813).jpg&oldid=1123220362`
- Original file downloaded: `https://upload.wikimedia.org/wikipedia/commons/9/9b/Chiken_curry_%282705660813%29.jpg`
- License: `CC BY-SA 2.0`
- License URL: `https://creativecommons.org/licenses/by-sa/2.0/`
- Approved asset: `assets/recipes/approved/japanese-curry.jpg`
- SHA-256: `71F1CEAD4073EA686E976814F2DB9ED1CE229B0CF981F5D383158C35EFDC741A`
- Modification note: unchanged original copy at the approved-source stage; future responsive derivatives must retain CC BY-SA 2.0 attribution and compatible ShareAlike terms, with resizing/cropping/compression recorded.

### Visual-match conclusion and risks

Manual inspection confirms a real photograph of fine-textured chicken curry with small vegetable bits, separate white rice and a generous red fukujinzuke portion. An earlier curry candidate was rejected because it visibly introduced sesame, scallion and other mismatched presentation elements. The selected image is labelled as chicken keema curry, so the published recipe uses ground chicken and fine vegetable cuts rather than claiming a large-chunk stew. No egg, sesame, salad, or unlisted garnish is described. Attribution and ShareAlike compliance are required for this CC BY-SA 2.0 source.

## Expanded checkpoint status

- `oyakodon`: recipe complete, 8 five-language steps, mitsuba and 74°C egg target aligned with the inspected photo.
- `katsudon`: recipe complete, 8 five-language steps, pasteurized softly set egg at 74°C and mitsuba aligned with the inspected photo.
- `japanese-curry`: recipe complete, 8 five-language steps, ground chicken, fine vegetable cuts and 80 g fukujinzuke aligned with the inspected photo.

## Omurice (`omurice`)

### Recipe sources cross-checked

1. [Just One Cookbook — Omurice](https://www.justonecookbook.com/omurice-japanese-omelette-rice/) — chicken ketchup rice, onion, butter, eggs, ketchup reduction, shaping and omelette wrapping.
2. [Taste of Japan (JETRO) — Omurice](https://japan-food.jetro.go.jp/en/recipe/125.html) — measured chicken rice, ketchup/Worcestershire seasoning, thin egg sheet and ketchup finish.

### Standardized recipe decisions

The published version uses 180 g 1.5 cm diced chicken thigh, 120 g 5 mm diced onion, 360 g cooked short-grain rice, 75 g ketchup split between the rice and topping, 10 ml Worcestershire sauce, 30 g unsalted butter, 200 g ordinary beaten egg, 3 g salt and 1 g pepper. Chicken is cooked until the thickest piece reaches 74°C. The omelette is intentionally thin but fully set: both sheets have no liquid remaining and the centre reaches 74°C. The final step makes a small opening to show the chicken-tomato rice and applies exactly one broad uninterrupted ketchup stripe, with no ketchup lettering, drawing, or garnish.

### Selected photograph and license evidence

- Title: `Omurice cut open`
- Author: `Nesnad`
- Source page: `https://commons.wikimedia.org/w/index.php?title=File:Cutopen-local-shop-omurice-with-ketchup-Japan-nov2014.jpg&oldid=1046996105`
- Original file downloaded: `https://upload.wikimedia.org/wikipedia/commons/6/69/Cutopen-local-shop-omurice-with-ketchup-Japan-nov2014.jpg`
- License: `CC BY 3.0`
- License URL: `https://creativecommons.org/licenses/by/3.0/`
- Approved asset: `assets/recipes/approved/omurice.jpg`
- SHA-256: `3F039BE23FF68057415DA758ABCCB63532533D89DF420226E9203E2301006B09`
- Original dimensions: 3648 × 2736 JPEG; above the 1200 × 800 source floor.
- Modification note: approved source is an unchanged original copy. Future responsive crops should focus on the plate and cut-open omelette, excluding the unrelated salad visible at the upper-right edge; any crop/resize/compression must be recorded and retain CC BY 3.0 attribution.

### Visual-match conclusion and risks

Manual inspection confirms a real photograph with a thin fully cooked yellow omelette, visible chicken-and-tomato fried rice through a small cut opening, one broad central ketchup stripe, and no food garnish. Decorative plate motifs are part of the photographed crockery, not an added serving garnish. The image has no ketchup lettering or decorative ketchup drawing. An earlier 763 × 572 plain omurice candidate was rejected because it failed the source-resolution floor; the selected 3648 × 2736 image preserves the required detail without upscaling. The recipe explicitly uses ordinary egg heated to 74°C, so its fully set appearance is consistent with the safety requirement.

## Omurice checkpoint status

- `omurice`: recipe complete, 8 five-language steps, chicken/egg safety at 74°C, single ketchup stripe and crop note aligned with the inspected high-resolution photograph.

## Nikujaga (`nikujaga`)

### Recipe sources cross-checked

1. [Kikkoman — Nikujaga (Japanese Meat and Potato Stew)](https://www.kikkoman.com/en/cookbook/washoku/nikujaga.html) — vegetable cuts, sweet-seasoning-first simmer, delayed soy sauce, low covered simmer, reduction and covered rest.
2. [Just One Cookbook — Nikujaga (Japanese Meat and Potato Stew)](https://www.justonecookbook.com/nikujaga/) — thin meat, potatoes, onion, carrot, shirataki, seasoning set, gentle 15-minute-style simmer and resting method.

### Standardized recipe decisions

The published version uses 300 g thin pork shoulder, 500 g potatoes in 4 cm chunks, 220 g onion wedges, 150 g carrot in 3 cm rangiri pieces, 200 g shirataki cut to 5 cm, 15 ml oil, 300 ml dashi or water, 45 ml soy sauce, 45 ml mirin, 30 ml sake and 18 g sugar. The vegetable and shirataki preparation takes 20 minutes: the potatoes soak for 5 minutes and the shirataki is blanched for 2 minutes. Cooking takes 35 minutes: pork is browned for 3–4 minutes to a 71°C thickest-piece target, vegetables are coated for 3–4 minutes, the sweet broth simmers for 10 minutes, soy and shirataki simmer for 8 minutes, and the covered stew rests for 8 minutes before serving. The recipe intentionally selects pork to match the photograph and does not include peas, scallions, rice or any other visible garnish.

### Selected photograph and license evidence

- Title: `Niku jaga by yoppy`
- Author: `yoppy`
- Source page: `https://commons.wikimedia.org/w/index.php?title=File:Niku_jaga_by_yoppy.jpg&oldid=1105589980`
- Original file downloaded: `https://upload.wikimedia.org/wikipedia/commons/1/18/Niku_jaga_by_yoppy.jpg`
- License: `CC BY 2.0`
- License URL: `https://creativecommons.org/licenses/by/2.0/`
- Approved asset: `assets/recipes/approved/nikujaga.jpg`
- SHA-256: `85A59F5F5B994B3026FD924C48E0B9B1A58A5D5D01E49419F5D2A4F572EA0C57`
- Original dimensions: 3264 × 2176 JPEG; the approved file is a direct unchanged download.
- Modification note: the source is retained unchanged. Future responsive crops should focus on the red bowl and exclude the unrelated dishes visible at the left edge; keep yoppy attribution and the CC BY 2.0 license link.

### Visual-match conclusion and risks

Manual `view_image` inspection of the approved asset confirms a real finished-dish photograph: the red bowl visibly contains thin pork, translucent shirataki noodles, onion, large potato pieces and large carrot pieces. No peas, scallions or rice are present in the selected bowl crop. The left edge contains unrelated side dishes, so `cropPosition: "attention"` and the recipe image brief require a tight crop on the red bowl. The pork version, chunky vegetable dimensions and no-garnish serving instruction are therefore aligned with the inspected photograph. Commercial reuse is permitted with CC BY 2.0 attribution; the downloaded hash and original dimensions are recorded above.

## Nikujaga checkpoint status

- `nikujaga`: recipe complete, 8 five-language steps, pork 71°C target, 20-minute prep plus 35-minute cooking/rest elapsed, and red-bowl crop aligned with the inspected CC BY 2.0 photograph.
