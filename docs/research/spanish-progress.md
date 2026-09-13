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
| A | `paella-valenciana` | Paella Valenciana | Valencia | drafted + checked | 2/2 | pending | 7 |
| A | `tortilla-espanola` | Tortilla Española | Spain | drafted + checked | 2/2 | pending | 6 |
| A | `gazpacho-andaluz` | Gazpacho Andaluz | Andalusia | drafted + checked | 2/2 | pending | 4 |
| A | `salmorejo-cordobes` | Salmorejo Cordobés | Córdoba, Andalusia | drafted + checked | 2/2 | pending | 5 |
| B | `patatas-bravas` | Patatas Bravas | Madrid / Spain | drafted + checked | 2/2 | pending | 6 |
| B | `croquetas-de-jamon` | Croquetas de Jamón | Spain | drafted + checked | 2/2 | pending | 8 |
| B | `gambas-al-ajillo` | Gambas al Ajillo | Spain | drafted + checked | 2/2 | pending | 4 |
| B | `pan-con-tomate` | Pan con Tomate / Pa amb Tomàquet | Catalonia | drafted + checked | 2/2 | pending | 4 |
| C | `fideua` | Fideuà | Valencia | drafted + checked | 2/2 | pending | 7 |
| C | `cocido-madrileno` | Cocido Madrileño | Madrid | drafted + checked | 2/2 | pending | 8 |
| C | `fabada-asturiana` | Fabada Asturiana | Asturias | drafted + checked | 2/2 | pending | 6 |
| C | `pulpo-a-la-gallega` | Pulpo a la Gallega / Pulpo a Feira | Galicia | drafted + checked | 2/2 | pending | 6 |
| D | `bacalao-al-pil-pil` | Bacalao al Pil-Pil | Basque Country | pending | 0/2 | pending | pending |
| D | `pisto-manchego` | Pisto Manchego | Castilla-La Mancha | pending | 0/2 | pending | pending |
| D | `marmitako` | Marmitako | Basque Country | pending | 0/2 | pending | pending |
| D | `calamares-a-la-romana` | Calamares a la Romana | Spain / Madrid | pending | 0/2 | pending | pending |
| E | `churros-con-chocolate` | Churros con Chocolate | Madrid / Spain | pending | 0/2 | pending | pending |
| E | `crema-catalana` | Crema Catalana | Catalonia | pending | 0/2 | pending | pending |
| E | `tarta-de-santiago` | Tarta de Santiago | Galicia | pending | 0/2 | pending | pending |
| E | `arroz-con-leche` | Arroz con Leche | Asturias / Spain | pending | 0/2 | pending | pending |

## Current phase

Batches A, B and C pass `node scripts/audit-spanish-drafts.mjs --content-only`; the 12-recipe anti-template distribution gate is active and passing. Batch D source research is next. Nothing Spanish is globally published until all 20 recipes, photographs and illustration mappings pass their gates.

Last known base commit before Spanish work: `f459a49 Enforce natural recipe method distributions`.
