import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { vietnameseRecipeDrafts } from '../src/vietnamese-recipes.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const records = await Promise.all(['vietnamese-a-prompts.json', 'vietnamese-bc-prompts.json'].map(async file => JSON.parse(await readFile(join(root, 'docs', 'illustration-prompts', file), 'utf8'))));
const entries = records.flatMap(record => record.entries);
const byId = new Map(entries.map(entry => [entry.recipeId, entry]));
if (entries.length !== vietnameseRecipeDrafts.length || byId.size !== entries.length) throw new Error('Prompt/recipe identity count mismatch');
const requested = new Set(process.argv.slice(2));
const recipes = requested.size ? vietnameseRecipeDrafts.filter(recipe => requested.has(recipe.id)) : vietnameseRecipeDrafts;
if (requested.size && recipes.length !== requested.size) throw new Error('Unknown Vietnamese recipe id');
const sets = [];
const hash = buffer => createHash('sha256').update(buffer).digest('hex');

for (const recipe of recipes) {
  const entry = byId.get(recipe.id);
  if (!entry?.reviewed || !entry.prompt || entry.usedPanels !== recipe.instructions.length) throw new Error(`${recipe.id}: missing reviewed prompt and step mapping`);
  if (!Number.isInteger(entry.columns) || !Number.isInteger(entry.rows) || entry.columns * entry.rows < entry.usedPanels) throw new Error(`${recipe.id}: invalid reviewed grid`);
  const sheetPath = resolve(root, entry.sourceSheet);
  const sheetsRoot = resolve(root, 'assets', 'recipes', 'illustration-sheets-generated', 'vietnamese');
  if (!sheetPath.startsWith(sheetsRoot + sep)) throw new Error(`${recipe.id}: source sheet escaped its directory`);
  const source = await readFile(sheetPath);
  const metadata = await sharp(source).metadata();
  if (metadata.width < 1200 || metadata.height < 900) throw new Error(`${recipe.id}: source sheet too small`);
  const cropGrid = entry.cropGrid;
  if (!cropGrid || cropGrid.width !== metadata.width || cropGrid.height !== metadata.height) throw new Error(`${recipe.id}: missing reviewed pixel grid for this source size`);
  for (const [bounds, count, size] of [[cropGrid.x, entry.columns, metadata.width], [cropGrid.y, entry.rows, metadata.height]]) {
    if (!Array.isArray(bounds) || bounds.length !== count + 1 || bounds[0] !== 0 || bounds.at(-1) !== size || bounds.some((value, index) => !Number.isInteger(value) || (index && value - bounds[index - 1] <= 8))) throw new Error(`${recipe.id}: invalid reviewed crop boundaries`);
  }
  const directory = join(root, 'assets', 'recipes', 'illustrations-generated', recipe.id);
  await mkdir(directory, { recursive: true });
  const hashes = [];
  for (let index = 0; index < recipe.instructions.length; index++) {
    const column = index % entry.columns;
    const row = Math.floor(index / entry.columns);
    const [x1, x2] = cropGrid.x.slice(column, column + 2);
    const [y1, y2] = cropGrid.y.slice(row, row + 2);
    const inset = 4;
    const file = join(directory, `step-${String(index + 1).padStart(2, '0')}.png`);
    // Contain the complete scene: square-ish source panels must never lose food or cookware to a 16:9 crop.
    await sharp(source).extract({ left: x1 + inset, top: y1 + inset, width: x2 - x1 - inset * 2, height: y2 - y1 - inset * 2 })
      .resize(1672, 941, { fit: 'contain', background: '#fbf4e7' })
      .png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(file);
    hashes.push(hash(await readFile(file)));
  }
  sets.push({ recipeId: recipe.id, promptSet: 'vietnamese-cooking-steps-v1', generator: 'OpenAI image_gen', generatedAt: '2026-09-12', aiGenerated: true, nonPhotographic: true, noPeopleOrHands: true, visualMatchApproved: true, excludeFromStructuredData: true, setComplete: true, dimensions: '1672x941', sourceSheetAsset: relative(root, sheetPath).replaceAll('\\','/'), sourceSheetSha256: hash(source), sourceDirectory: relative(root, directory).replaceAll('\\','/'), grid: { columns: entry.columns, rows: entry.rows }, cropGrid, hashes });
  console.log(`Prepared ${recipe.id}: ${hashes.length} distinct step illustrations`);
}
if (requested.size) {
  const old = (await import('../src/vietnamese-illustration-sets.mjs')).vietnameseIllustrationSets;
  const updated = new Map(sets.map(set => [set.recipeId, set]));
  sets.splice(0, sets.length, ...old.map(set => updated.get(set.recipeId) || set));
}
await writeFile(join(root, 'src', 'vietnamese-illustration-sets.mjs'), `// Generated from visually reviewed hand-free source sheets and recorded panel layouts.\nexport const vietnameseIllustrationSets = ${JSON.stringify(sets, null, 2)};\n`, 'utf8');
console.log(`Vietnamese illustration manifest: ${sets.length} sets, ${sets.reduce((sum,set) => sum+set.hashes.length,0)} separate step images.`);
