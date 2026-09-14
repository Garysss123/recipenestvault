import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { germanRecipeDrafts } from '../src/german-recipes.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const promptFile = join(root, 'docs', 'illustration-prompts', 'german-prompts.json');
const record = JSON.parse(await readFile(promptFile, 'utf8'));
const entries = record.entries;
const byId = new Map(entries.map(entry => [entry.recipeId, entry]));
if (entries.length !== germanRecipeDrafts.length || byId.size !== entries.length) throw new Error('German prompt/recipe identity count mismatch');

const requested = new Set(process.argv.slice(2));
const recipes = requested.size ? germanRecipeDrafts.filter(recipe => requested.has(recipe.id)) : germanRecipeDrafts;
if (requested.size && recipes.length !== requested.size) throw new Error('Unknown German recipe id');

const hash = buffer => createHash('sha256').update(buffer).digest('hex');
const sets = [];

for (const recipe of recipes) {
  const entry = byId.get(recipe.id);
  if (!entry?.reviewed || !entry.prompt || entry.usedPanels !== recipe.instructions.length) throw new Error(`${recipe.id}: missing reviewed prompt and step mapping`);
  if (!Number.isInteger(entry.columns) || !Number.isInteger(entry.rows) || entry.columns * entry.rows < entry.usedPanels) throw new Error(`${recipe.id}: invalid reviewed grid`);

  const sheetPath = resolve(root, entry.sourceSheet);
  const sheetsRoot = resolve(root, 'assets', 'recipes', 'illustration-sheets-generated', 'german');
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
  for (let index = 0; index < recipe.instructions.length; index++) {
    const column = index % entry.columns;
    const row = Math.floor(index / entry.columns);
    const [x1, x2] = cropGrid.x.slice(column, column + 2);
    const [y1, y2] = cropGrid.y.slice(row, row + 2);
    const inset = 4;
    const file = join(directory, `step-${String(index + 1).padStart(2, '0')}.png`);
    await sharp(source)
      .extract({ left: x1 + inset, top: y1 + inset, width: x2 - x1 - inset * 2, height: y2 - y1 - inset * 2 })
      .resize(1672, 941, { fit: 'contain', background: '#fbf4e7' })
      .png({ compressionLevel: 9, palette: true, quality: 92 })
      .toFile(file);
    hashes.push(hash(await readFile(file)));
  }

  sets.push({
    recipeId: recipe.id,
    promptSet: 'german-cooking-steps-v1',
    generator: 'OpenAI image_gen',
    generatedAt: '2026-09-14',
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

if (requested.size) {
  let old = [];
  try {
    old = (await import('../src/german-illustration-sets.mjs')).germanIllustrationSets;
  } catch {
    old = [];
  }
  const updated = new Map(sets.map(set => [set.recipeId, set]));
  const merged = old.length ? old.map(set => updated.get(set.recipeId) || set) : sets;
  for (const set of sets) if (!merged.some(item => item.recipeId === set.recipeId)) merged.push(set);
  sets.splice(0, sets.length, ...merged);
}

await writeFile(join(root, 'src', 'german-illustration-sets.mjs'), `// Generated from visually reviewed hand-free German source sheets and recorded panel layouts.\nexport const germanIllustrationSets = ${JSON.stringify(sets, null, 2)};\n`, 'utf8');
console.log(`German illustration manifest: ${sets.length} sets, ${sets.reduce((sum, set) => sum + set.hashes.length, 0)} separate step images.`);
