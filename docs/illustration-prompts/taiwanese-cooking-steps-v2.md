# Taiwanese cooking-step illustrations v2

Generation date: 2026-08-31

Generator: OpenAI `image_gen`

Use: non-photographic recipe-method illustrations only

## Shared illustration language

Taiwanese recipes reuse the established Recipe Nest Vault cooking-illustration language from the completed Chinese, Japanese, Korean, and Thai pages. The page UI has a Taiwanese colour theme; the step illustrations do not.

- Border-free 16:9 individual cooking panels on a quiet warm-ivory textured-paper background.
- Crisp ink contours with restrained gouache-like shading and natural ingredient colours.
- Clear cookware, ingredient cuts, heat stage, and intermediate texture; no photorealism and no regional decorative motifs.
- Absolutely no hands, fingers, arms, sleeves, people, silhouettes, or other body parts.
- No text, panel numbers, logos, trademarks, watermarks, franchise imitation, or unrelated garnish.

## One step, one image

Method length follows the actual process instead of a six-card template. The first Taiwanese edition ranges from 6 to 10 steps. Every localized text step maps to one unique source panel and one unique `step-NN.png`; no panel is reused for two steps.

Base and supplemental source sheets are mapped by `scripts/generate-taiwanese-illustration-sets.mjs`. It crops away all source-sheet outer decoration, produces the same 1672 × 941 source size used by prior collections, and pins the SHA-256 of every sheet and every published step source.

## Review corrections

- Five early sheets containing hands were rejected and corrected. Dan bing required a second correction to remove a remaining fingertip.
- Sesame-oil chicken was regenerated after an incorrect battered-fried-chicken interpretation.
- Coffin bread's first panel was corrected to show plain chicken and vegetables.
- Detailed methods were then expanded from a fixed six-step draft to natural 6–10 step sequences. Seventeen new, non-reused panels were generated for the added steps.
- Source-sheet decorative borders and palette notes are excluded by the deterministic panel crop. Published images retain only the shared Recipe Nest Vault editorial cooking style.

Illustrations are visibly disclosed on all five localized pages and remain excluded from `Recipe.image` and `HowToStep.image` structured data.
