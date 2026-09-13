# Spanish collection checkpoint

Goal: publish 20 Spanish recipes at the same quality bar as the French/Italian collections without growing a single Codex task until it becomes unrecoverable.

## Working rules

- Work in batches of 4 recipes.
- Keep source evidence, photo provenance, prompts, manifests, hashes, and QA artifacts in the repository; chat reports stay to counts, failures, and paths.
- Method steps follow real cooking stages. Never target a fixed step count or split/merge merely to shape the histogram.
- Each recipe needs five locales (`en`, `zh-hant`, `ja`, `ko`, `th`), 2+ direct reliable HTTPS sources, exact measurable facts, a reviewed commercial-use real finished-dish photograph, and one reviewed hand-free non-photorealistic illustration per natural method step.
- Integration, full static audit, local browser QA, Git push, Cloudflare deployment, and production QA happen after all 20 recipes and assets are complete.

## Locked 20-recipe slate

| Batch | ID | Dish | Region | Content | Sources | Photo | Steps |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `paella-valenciana` | Paella Valenciana | Valencia | drafted + checked | 2/2 | approved | 7 |
| A | `tortilla-espanola` | Tortilla Española | Spain | drafted + checked | 2/2 | approved | 6 |
| A | `gazpacho-andaluz` | Gazpacho Andaluz | Andalusia | drafted + checked | 2/2 | approved | 4 |
| A | `salmorejo-cordobes` | Salmorejo Cordobés | Córdoba, Andalusia | drafted + checked | 2/2 | approved | 5 |
| B | `patatas-bravas` | Patatas Bravas | Madrid / Spain | drafted + checked | 2/2 | approved | 6 |
| B | `croquetas-de-jamon` | Croquetas de Jamón | Spain | drafted + checked | 2/2 | approved | 8 |
| B | `gambas-al-ajillo` | Gambas al Ajillo | Spain | drafted + checked | 2/2 | approved | 4 |
| B | `pan-con-tomate` | Pan con Tomate / Pa amb Tomàquet | Catalonia | drafted + checked | 2/2 | approved | 4 |
| C | `fideua` | Fideuà | Valencia | drafted + checked | 2/2 | approved | 7 |
| C | `cocido-madrileno` | Cocido Madrileño | Madrid | drafted + checked | 2/2 | approved | 8 |
| C | `fabada-asturiana` | Fabada Asturiana | Asturias | drafted + checked | 2/2 | approved | 6 |
| C | `pulpo-a-la-gallega` | Pulpo a la Gallega / Pulpo a Feira | Galicia | drafted + checked | 2/2 | approved | 6 |
| D | `bacalao-al-pil-pil` | Bacalao al Pil-Pil | Basque Country | drafted + checked | 2/2 | approved | 6 |
| D | `pisto-manchego` | Pisto Manchego | Castilla-La Mancha | drafted + checked | 2/2 | approved | 6 |
| D | `marmitako` | Marmitako | Basque Country | drafted + checked | 2/2 | approved | 6 |
| D | `calamares-a-la-romana` | Calamares a la Romana | Spain / Madrid | drafted + checked | 2/2 | approved | 5 |
| E | `churros-con-chocolate` | Churros con Chocolate | Madrid / Spain | drafted + checked | 3/2 | approved | 5 |
| E | `crema-catalana` | Crema Catalana | Catalonia | drafted + checked | 2/2 | approved | 5 |
| E | `tarta-de-santiago` | Tarta de Santiago | Galicia | drafted + checked | 2/2 | approved | 5 |
| E | `arroz-con-leche` | Arroz con Leche | Asturias / Spain | drafted + checked | 2/2 | approved | 6 |

## Current phase

All 20 recipes pass `node scripts/audit-spanish-drafts.mjs --content-only --complete`. Natural step lengths are 7, 6, 4, 5, 6, 8, 4, 4, 7, 8, 6, 6, 6, 6, 6, 5, 5, 5, 5, 6; the anti-template distribution gate passes. All 20 finished-dish photographs passed licensed-photo audit: unique commercial-use real photos, pinned provenance and SHA-256, minimum 1200x800, and manual visual review.

Spanish illustration pipeline is now active. Batches A and B have 8/8 visually reviewed source sheets and 44/44 cropped step images recorded in `src/spanish-illustration-sets.mjs`. The Gazpacho emulsification scene was changed from a pouring action to a static completed-emulsion state so it obeys the no-pouring/no-floating illustration rule. The Croquetas milk scene now uses a thermometer with no readable scale or digits so it obeys the no-text/no-numbers rule. Content audit re-passed after both scene-only corrections. Overall progress is 8/20 reviewed source sheets and 44/115 generated step images. Nothing Spanish is globally published until all illustration mappings pass their gates.

Last known base commit before Spanish work: `f459a49 Enforce natural recipe method distributions`.
