import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const file = join(root, 'docs', 'illustration-prompts', 'middle-eastern-prompts.json');
const record = JSON.parse(await readFile(file, 'utf8'));
if (record.entries.length !== 13 || new Set(record.entries.map((entry) => entry.recipeId)).size !== 13) throw new Error('Middle Eastern prompt review requires exactly 13 distinct recipe sheets');
for (const entry of record.entries) {
  const sheet = resolve(root, entry.sourceSheet);
  const image = await sharp(sheet).metadata();
  if (image.width !== 1536 || image.height !== 1024) throw new Error(`${entry.recipeId}: expected the reviewed 1536x1024 3x3 sheet`);
  entry.cropGrid = { width: image.width, height: image.height, x: [0, 512, 1024, 1536], y: [0, 341, 683, 1024] };
  entry.reviewed = true;
}
await writeFile(file, JSON.stringify(record, null, 2) + '\n', 'utf8');
console.log(`Recorded visual review and equal 3x3 crop grid for ${record.entries.length} Middle Eastern sheets.`);
