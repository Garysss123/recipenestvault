import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { brazilianRecipeDrafts } from '../src/brazilian-recipes.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const promptFile = join(root, 'docs', 'illustration-prompts', 'brazilian-prompts.json');
const record = JSON.parse(await readFile(promptFile, 'utf8'));
const entries = record.entries;
const byId = new Map(entries.map((entry) => [entry.recipeId, entry]));
if (entries.length !== brazilianRecipeDrafts.length || byId.size !== entries.length) throw new Error('Brazilian prompt/recipe identity count mismatch');
const requested = new Set(process.argv.slice(2));
const recipes = requested.size ? brazilianRecipeDrafts.filter((recipe) => requested.has(recipe.id)) : brazilianRecipeDrafts;
if (requested.size && recipes.length !== requested.size) throw new Error('Unknown Brazilian recipe id');
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
const sets = [];

for (const recipe of recipes) {
  const entry = byId.get(recipe.id);
  if (!entry?.reviewed || !entry.prompt || entry.usedPanels !== recipe.instructions.length) throw new Error(`${recipe.id}: missing reviewed prompt and step mapping`);
  if (!Number.isInteger(entry.columns) || !Number.isInteger(entry.rows) || entry.columns * entry.rows < entry.usedPanels) throw new Error(`${recipe.id}: invalid reviewed grid`);
  const sheetPath = resolve(root, entry.sourceSheet);
  const sheetsRoot = resolve(root, 'assets', 'recipes', 'illustration-sheets-generated', 'brazilian');
  if (!sheetPath.startsWith(sheetsRoot + sep)) throw new Error(`${recipe.id}: source sheet escaped its directory`);
  const source = await readFile(sheetPath);
  const metadata = await sharp(source).metadata();
  if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 900) throw new Error(`${recipe.id}: source sheet too small`);
  const cropGrid = entry.cropGrid;
  if (!cropGrid || cropGrid.width !== metadata.width || cropGrid.height !== metadata.height) throw new Error(`${recipe.id}: missing reviewed pixel grid for this source size`);
  for (const [bounds, count, size] of [[cropGrid.x, entry.columns, metadata.width], [cropGrid.y, entry.rows, metadata.height]]) {
    if (!Array.isArray(bounds) || bounds.length !== count + 1 || bounds[0] !== 0 || bounds.at(-1) !== size || bounds.some((value, index) => !Number.isInteger(value) || (index && value - bounds[index - 1] <= 8))) throw new Error(`${recipe.id}: invalid reviewed crop boundaries`);
  }
  const directory = join(root, 'assets', 'recipes', 'illustrations-generated', recipe.id);
  await mkdir(directory, { recursive: true });
  const hashes = [];
  for (let index = 0; index < recipe.instructions.length; index += 1) {
    const column = index % entry.columns;
    const row = Math.floor(index / entry.columns);
    const [x1, x2] = cropGrid.x.slice(column, column + 2);
    const [y1, y2] = cropGrid.y.slice(row, row + 2);
    const file = join(directory, `step-${String(index + 1).padStart(2, '0')}.png`);
    await sharp(source).extract({ left: x1 + 4, top: y1 + 4, width: x2 - x1 - 8, height: y2 - y1 - 8 }).resize(1672, 941, { fit: 'contain', background: '#fbf4e7' }).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(file);
    hashes.push(hash(await readFile(file)));
  }
  sets.push({
    recipeId: recipe.id,
    promptSet: 'brazilian-cooking-steps-v1',
    generator: 'OpenAI image_gen',
    generatedAt: '2026-09-15',
    aiGenerated: true,
    nonPhotographic: true,
    noPeopleOrHands: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    dimensions: '1672x941',
    sourceSheetAsset: relative(root, sheetPath).replaceAll('\\', '/'),
    sourceSheetSha256: hash(source),
    sourceDirectory: relative(root, directory).replaceAll('\\', '/'),
    grid: { columns: entry.columns, rows: entry.rows },
    cropGrid,
    hashes
  });
  console.log(`Prepared ${recipe.id}: ${hashes.length} distinct step illustrations`);
}

let old = [];
try { old = (await import('../src/brazilian-illustration-sets.mjs')).brazilianIllustrationSets; } catch {}
const updated = new Map(sets.map((set) => [set.recipeId, set]));
const merged = old.map((set) => updated.get(set.recipeId) || set);
for (const set of sets) if (!merged.some((item) => item.recipeId === set.recipeId)) merged.push(set);
await writeFile(join(root, 'src', 'brazilian-illustration-sets.mjs'), `// Generated from visually reviewed hand-free Brazilian source sheets and recorded panel layouts.\nexport const brazilianIllustrationSets = ${JSON.stringify(merged, null, 2)};\n`, 'utf8');
console.log(`Brazilian illustration manifest: ${merged.length} sets, ${merged.reduce((sum, set) => sum + set.hashes.length, 0)} separate step images.`);
