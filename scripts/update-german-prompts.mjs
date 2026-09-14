import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { germanRecipeDrafts } from '../src/german-recipes.mjs';

const file = new URL('../docs/illustration-prompts/german-prompts.json', import.meta.url);
const record = JSON.parse(await readFile(file, 'utf8'));
const byId = new Map(record.entries.map(entry => [entry.recipeId, entry]));
const refresh = new Set(process.argv.slice(2));

const buildPrompt = (recipe, scenes, columns, rows) => `Use case: illustration-story. Asset type: Recipe Nest Vault cooking-process source sheet. The attached image is a STYLE REFERENCE ONLY, not a subject reference. Match its warm ivory lightly textured paper, fine ink outlines, restrained gouache shading, natural food colours and overhead three-quarter view. Create a large landscape source sheet with exactly ${columns} equally sized columns and ${rows} equally sized rows. All subjects are centered with generous blank paper gutters and stay wholly within their cell. First ${scenes.length} cells are filled in reading order, unused cells completely blank ivory. Each cell shows the described intermediate cooking state, not a finished meal until the final cell. Static objects at rest: no floating jugs or utensils, no pouring streams. No decorative frames or national motifs. No text, numbers, letters, logos or watermarks. Absolutely no people, faces, hands, fingers, arms, sleeves or body parts. Do not show readable thermometer scales or digits. This is original non-photorealistic recipe illustration. Dish: ${recipe.name.en}.\n${scenes.map((scene, index) => `Cell ${index + 1}: ${scene}`).join('\n')}`;

for (const recipe of germanRecipeDrafts) {
  const scenes = recipe.instructions.map(step => step.imageScene);
  const sceneHash = createHash('sha256').update(JSON.stringify(scenes)).digest('hex');
  const old = byId.get(recipe.id);
  if (old) {
    if (old.sceneHash && old.sceneHash !== sceneHash && !refresh.has(recipe.id)) throw new Error(`${recipe.id}: scenes changed; update the prompt and review the affected source explicitly`);
    if (refresh.has(recipe.id)) {
      const columns = 3;
      const rows = Math.ceil(scenes.length / columns);
      old.columns = columns;
      old.rows = rows;
      old.usedPanels = scenes.length;
      old.prompt = buildPrompt(recipe, scenes, columns, rows);
      old.reviewed = false;
      delete old.sourceSheet;
      delete old.sourceGeneratedPath;
      delete old.cropGrid;
    }
    old.sceneHash = sceneHash;
    continue;
  }

  const columns = 3;
  const rows = Math.ceil(scenes.length / columns);
  const prompt = buildPrompt(recipe, scenes, columns, rows);
  record.entries.push({ recipeId: recipe.id, columns, rows, usedPanels: scenes.length, reviewed: false, sceneHash, prompt });
}

await writeFile(file, JSON.stringify(record, null, 2) + '\n');
console.log(`German prompts: ${record.entries.length} source sheets, ${record.entries.reduce((n, entry) => n + entry.usedPanels, 0)} planned step images.`);
