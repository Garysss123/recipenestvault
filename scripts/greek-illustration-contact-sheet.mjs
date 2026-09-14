import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const record = JSON.parse(await readFile(join(root, 'docs', 'illustration-prompts', 'greek-prompts.json'), 'utf8'));
const entries = record.entries;
const outputDir = join(root, 'qa-artifacts', 'greek-review');
await mkdir(outputDir, { recursive: true });

const columns = 3;
const cellWidth = 520;
const imageHeight = 347;
const labelHeight = 32;
const rows = Math.ceil(entries.length / columns);
const canvas = sharp({
  create: {
    width: columns * cellWidth,
    height: rows * (imageHeight + labelHeight),
    channels: 3,
    background: '#fbf4e7'
  }
});

const composites = [];
for (const [index, entry] of entries.entries()) {
  if (!entry.sourceSheet) throw new Error(`${entry.recipeId}: missing sourceSheet`);
  const row = Math.floor(index / columns);
  const column = index % columns;
  const left = column * cellWidth;
  const top = row * (imageHeight + labelHeight);
  const image = await sharp(resolve(root, entry.sourceSheet))
    .resize(cellWidth, imageHeight, { fit: 'contain', background: '#fbf4e7' })
    .jpeg({ quality: 88 })
    .toBuffer();
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${cellWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#214537"/><text x="10" y="21" fill="#fff9ee" font-family="Arial" font-size="14">${entry.recipeId} · ${entry.usedPanels} steps</text></svg>`);
  composites.push({ input: image, left, top }, { input: label, left, top: top + imageHeight });
}

const output = join(outputDir, 'greek-source-sheets-contact-sheet.jpg');
await canvas.composite(composites).jpeg({ quality: 90 }).toFile(output);
console.log(output);
