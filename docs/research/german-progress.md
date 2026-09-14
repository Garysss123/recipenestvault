# German collection checkpoint

Goal: publish an initial set of 13 German recipes at the same quality bar as the Spanish and British collections while keeping the work resumable in small batches.

## Working rules

- Work in four small batches: 4 + 3 + 3 + 3 recipes.
- Persist source evidence, licensed-photo provenance, illustration prompts/manifests, hashes, and QA evidence in the repository. Keep chat/tool output compact to reduce request-size failures.
- Method steps follow real cooking stages. Never target a fixed step count or split/merge steps merely to shape a histogram. Simple dishes may use 5–7 steps; doughs, layered cakes and long braises may naturally use 10–15.
- Each recipe needs five locales (`en`, `zh-hant`, `ja`, `ko`, `th`), 2+ direct reliable HTTPS sources, exact measurable facts, a reviewed commercial-use real finished-dish photograph, and one reviewed hand-free non-photorealistic illustration per natural method step.
- Integration, full static audit, local Chromium QA, Git push, Cloudflare deployment, and production QA happen after all 13 recipes and assets are complete.
- The Italian method-step cleanup remains deferred until the whole site is complete.

## Locked 13-recipe slate

| Batch | ID | Dish | Region / tradition | Content | Sources | Photo | Method length |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | `sauerbraten` | Sauerbraten | Rhineland / western German tradition | drafted + checked | 2/2 | pending | 9 |
| A | `rinderrouladen` | Rinderrouladen | Germany-wide home cooking | drafted + checked | 2/2 | pending | 8 |
| A | `bavarian-krustenbraten` | Bayerischer Krustenbraten | Bavaria | drafted + checked | 2/2 | pending | 7 |
| A | `currywurst` | Currywurst | Berlin / German street-food tradition | drafted + checked | 2/2 | pending | 6 |
| B | `nuernberger-rostbratwurst` | Nürnberger Rostbratwürste mit Sauerkraut | Nuremberg / Franconia | drafted + checked | 2/2 | pending | 6 |
| B | `frikadellen` | Frikadellen | Germany-wide home cooking | drafted + checked | 2/2 | pending | 7 |
| B | `koenigsberger-klopse` | Königsberger Klopse | East Prussian tradition | drafted + checked | 2/2 | pending | 8 |
| C | `kartoffelpuffer` | Kartoffelpuffer | Germany-wide / Rhineland names vary | drafted + checked | 2/2 | pending | 6 |
| C | `kaesespaetzle` | Käsespätzle | Swabia / Allgäu | drafted + checked | 2/2 | pending | 9 |
| C | `maultaschen` | Maultaschen | Swabia | drafted + checked | 2/2 | pending | 11 |
| D | `erbsensuppe` | Erbsensuppe | German home and field-kitchen tradition | drafted + checked | 2/2 | pending | 8 |
| D | `black-forest-cake` | Schwarzwälder Kirschtorte | Black Forest / Baden-Württemberg | drafted + checked | 2/2 | pending | 12 |
| D | `bienenstich` | Bienenstich | German cake tradition | drafted + checked | 2/2 | pending | 12 |

## Current phase

All 13 recipes pass `node scripts/audit-german-drafts.mjs --content-only --complete`. Natural method lengths are 9, 8, 7, 6, 6, 7, 8, 6, 9, 11, 8, 12 and 12 steps (109 total). Five-language fields, two-source minimums, exact measurable facts and one precise `imageScene` per natural method step are verified.

Next phase: research and manually review 13 unique commercial-use real finished-dish photographs, then pin source/license evidence and hashes before generating the 109 step illustrations.
