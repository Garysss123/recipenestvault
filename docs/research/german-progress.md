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
| A | `sauerbraten` | Sauerbraten | Rhineland / western German tradition | drafted + checked | 2/2 | reviewed | 9 |
| A | `rinderrouladen` | Rinderrouladen | Germany-wide home cooking | drafted + checked | 2/2 | reviewed | 8 |
| A | `bavarian-krustenbraten` | Bayerischer Krustenbraten | Bavaria | drafted + checked | 2/2 | reviewed | 7 |
| A | `currywurst` | Currywurst | Berlin / German street-food tradition | drafted + checked | 2/2 | reviewed | 6 |
| B | `nuernberger-rostbratwurst` | Nürnberger Rostbratwürste mit Sauerkraut | Nuremberg / Franconia | drafted + checked | 2/2 | reviewed | 6 |
| B | `frikadellen` | Frikadellen | Germany-wide home cooking | drafted + checked | 2/2 | reviewed | 7 |
| B | `koenigsberger-klopse` | Königsberger Klopse | East Prussian tradition | drafted + checked | 2/2 | reviewed | 8 |
| C | `kartoffelpuffer` | Kartoffelpuffer | Germany-wide / Rhineland names vary | drafted + checked | 2/2 | reviewed | 6 |
| C | `kaesespaetzle` | Käsespätzle | Swabia / Allgäu | drafted + checked | 2/2 | reviewed | 9 |
| C | `maultaschen` | Maultaschen | Swabia | drafted + checked | 2/2 | reviewed | 11 |
| D | `erbsensuppe` | Erbsensuppe | German home and field-kitchen tradition | drafted + checked | 2/2 | reviewed | 8 |
| D | `black-forest-cake` | Schwarzwälder Kirschtorte | Black Forest / Baden-Württemberg | drafted + checked | 2/2 | reviewed | 12 |
| D | `bienenstich` | Bienenstich | German cake tradition | drafted + checked | 2/2 | reviewed | 12 |

## Current phase

All 13 recipes pass `node scripts/audit-german-drafts.mjs --content-only --complete`. Natural method lengths are 9, 8, 7, 6, 6, 7, 8, 6, 9, 11, 8, 12 and 12 steps (109 total). Five-language fields, two-source minimums, exact measurable facts and one precise `imageScene` per natural method step are verified.

Finished-dish photo research is complete: 13 unique Wikimedia Commons photographs were manually reviewed against each recipe `visualSpec`, then pinned with source page, original file URL, author, commercial-use license evidence and SHA-256 in `docs/research/german-photo-evidence.json`. `node scripts/audit-german-photos.mjs` verifies identity, provenance, hashes, uniqueness and minimum 1200x800 source pixels. The final 13-photo contact sheet was manually inspected under `qa-artifacts/german-review/` and remains uncommitted.

All 13 illustration source sheets are generated and recorded with the built-in OpenAI image generator using the existing Recipe Nest Vault warm-ivory ink-and-gouache style reference. The complete source-sheet contact sheet was manually inspected under `qa-artifacts/german-review/`: all 109 natural method states are represented, there are no people/hands or text, and unused cells remain blank where applicable. `node scripts/generate-german-illustration-sets.mjs` produced 109 distinct 1672x941 step images with pinned SHA-256 hashes in `src/german-illustration-sets.mjs`.

German integration is now complete locally: the 13 recipes, reviewed photos, 109 step illustrations and five-locale collection copy are registered in the global site data. `npm run images` generated the responsive finished-dish and step-illustration WebP assets, `npm test` passed the full cuisine/build/static gate, and local `npm run qa:visual` passed 134 Chromium states. Representative German desktop/mobile screenshots for the collection, Currywurst, Maultaschen, Schwarzwälder Kirschtorte and Bienenstich were manually inspected without layout or illustration-mapping issues.

Next phase: commit the final integration, push `main`, deploy to Cloudflare Pages, rerun the Chromium QA suite against `https://recipenestvault.com`, and manually inspect the German production screenshots before closing the collection.
