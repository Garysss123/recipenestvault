# Greek collection checkpoint

Goal: publish an initial set of 13 Greek recipes at the same quality bar as the Spanish, British and German collections while keeping the work resumable in small checkpoints.

## Working rules

- Work in four content batches: 4 + 3 + 3 + 3 recipes.
- Method steps follow real cooking stages. Do not target a fixed count; simple fresh dishes may use about 5 steps while layered bakes and syrup pastries may naturally use 11–13.
- Every recipe needs five locales (`en`, `zh-hant`, `ja`, `ko`, `th`), at least two direct HTTPS recipe sources, exact measurable facts, storage guidance, practical notes, a culture note, a reviewed commercial-use real finished-dish photograph, and one reviewed hand-free non-photographic illustration per method step.
- Photo licenses accepted for publication: CC0, Public Domain, CC BY and CC BY-SA. Reject NC and ND.
- Final gate: full static audit, representative local Chromium QA plus manual screenshot inspection, Git push, Cloudflare deployment, production Chromium QA and manual production screenshot inspection.
- The deferred Italian method-step cleanup stays untouched until the whole site is complete.

## Locked 13-recipe slate

| Batch | ID | Dish | Role | Planned natural length |
| --- | --- | --- | --- | ---: |
| A | `moussaka` | Moussaka | layered eggplant/meat bake | 12 |
| A | `pastitsio` | Pastitsio | baked pasta with meat sauce and béchamel | 11 |
| A | `pork-souvlaki` | Pork Souvlaki | grilled pork skewers | 7 |
| A | `spanakopita` | Spanakopita | spinach-feta phyllo pie | 9 |
| B | `dolmades` | Dolmades | herb-rice stuffed vine leaves | 10 |
| B | `avgolemono` | Avgolemono Chicken Soup | egg-lemon chicken soup | 8 |
| B | `fasolada` | Fasolada | white-bean soup | 8 |
| C | `gigantes-plaki` | Gigantes Plaki | baked giant beans | 9 |
| C | `gemista` | Gemista | rice-stuffed tomatoes and peppers | 10 |
| C | `beef-stifado` | Beef Stifado | pearl-onion beef stew | 8 |
| D | `keftedes` | Keftedes | fried Greek meatballs | 7 |
| D | `horiatiki` | Horiatiki | Greek village salad | 5 |
| D | `galaktoboureko` | Galaktoboureko | semolina custard phyllo with syrup | 15 |

## Current phase

All 13 five-language recipe drafts are complete and pass `node scripts/audit-greek-drafts.mjs --content-only --complete`. Natural method lengths are 12, 11, 7, 9, 10, 8, 8, 9, 10, 8, 7, 5 and 15 steps (119 total), with one exact `imageScene` for every method step. The two-source minimum and measurable facts are verified. Next phase: licensed finished-dish photo review, then step-illustration production.
