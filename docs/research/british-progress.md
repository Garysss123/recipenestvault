# British collection checkpoint

Goal: publish an initial set of 13 British recipes at the same quality bar as the Spanish collection while keeping the work resumable in small batches.

## Working rules

- Work in four small batches: 4 + 3 + 3 + 3 recipes.
- Persist source evidence, licensed-photo provenance, illustration prompts/manifests, hashes, and QA evidence in the repository. Keep chat/tool output compact.
- Method steps follow real cooking stages. Never target a fixed step count or split/merge steps just to shape the histogram. Four to twelve steps will be common, but genuinely complex recipes may run to 15 steps; there is no collection-wide 8-step ceiling.
- Each recipe needs five locales (`en`, `zh-hant`, `ja`, `ko`, `th`), 2+ direct reliable HTTPS sources, exact measurable facts, a reviewed commercial-use real finished-dish photograph, and one reviewed hand-free non-photorealistic illustration per natural method step.
- Integration, full static audit, local Chromium QA, Git push, Cloudflare deployment, and production QA happen after all 13 recipes and assets are complete.

## Locked 13-recipe slate

| Batch | ID | Dish | Region / tradition | Content | Sources | Photo | Method length |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `fish-and-chips` | Fish and Chips | England / Britain | drafted + checked | 2/2 | reviewed | 7 |
| A | `beef-wellington` | Beef Wellington | England / Britain | drafted + checked | 2/2 | reviewed | 8 |
| A | `roast-beef-yorkshire-pudding` | Roast Beef & Yorkshire Pudding | England | drafted + checked | 2/2 | reviewed | 8 |
| A | `shepherds-pie` | Shepherd's Pie | Britain / Ireland | drafted + checked | 2/2 | reviewed | 6 |
| B | `toad-in-the-hole` | Toad in the Hole | England | drafted + checked | 2/2 | reviewed | 6 |
| B | `cornish-pasty` | Cornish Pasty | Cornwall, England | drafted + checked | 2/2 | reviewed | 8 |
| B | `full-english-breakfast` | Full English Breakfast | England | drafted + checked | 2/2 | reviewed | 9 |
| C | `chicken-tikka-masala` | Chicken Tikka Masala | British South Asian | drafted + checked | 2/2 | reviewed | 10 |
| C | `cullen-skink` | Cullen Skink | Cullen, Scotland | drafted + checked | 2/2 | reviewed | 6 |
| C | `welsh-rarebit` | Welsh Rarebit | Wales | drafted + checked | 2/2 | reviewed | 5 |
| D | `sticky-toffee-pudding` | Sticky Toffee Pudding | England / Britain | drafted + checked | 2/2 | reviewed | 7 |
| D | `traditional-trifle` | Traditional Trifle | England / Britain | drafted + checked | 2/2 | reviewed | 10 |
| D | `steak-and-kidney-pie` | Steak and Kidney Pie | England / Britain | drafted + checked | 2/2 | reviewed | 12 |

## Current phase

All 13 recipes pass `node scripts/audit-british-drafts.mjs --content-only --complete`. Natural method lengths are 7, 8, 8, 6, 6, 8, 9, 10, 6, 5, 7, 10 and 12 steps. There is no fixed method-length template or 8-step ceiling.

Finished-dish photo research is complete: 13 unique real Wikimedia Commons photographs were manually reviewed against each recipe `visualSpec`, then pinned with source page, original file URL, author, commercial-use license evidence and SHA-256 in `docs/research/british-photo-evidence.json`. `node scripts/audit-british-photos.mjs` verifies identity, provenance, hashes, uniqueness and minimum 1200x800 source pixels. The final 13-photo contact sheet was manually inspected under `qa-artifacts/british-review/` and is intentionally not committed.

Next phase: generate, record and review 102 hand-free non-photorealistic method illustrations, one per natural method step.

Last completed production commit before British work: `82c27d658684 Record Spanish production QA completion`.
