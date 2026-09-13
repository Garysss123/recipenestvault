import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { frenchRecipeDrafts } from '../src/french-recipes.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'qa-artifacts', 'french-review');
await mkdir(output, { recursive: true });

for (let start = 0; start < frenchRecipeDrafts.length; start += 7) {
  const recipes = frenchRecipeDrafts.slice(start, start + 7);
  const width = 240;
  const imageHeight = 135;
  const labelHeight = 30;
  const columns = Math.max(...recipes.map(recipe => recipe.instructions.length));
  const composites = [];
  for (const [row, recipe] of recipes.entries()) {
    for (let index = 0; index < recipe.instructions.length; index++) {
      const file = join(root, 'assets', 'recipes', 'illustrations-generated', recipe.id, `step-${String(index + 1).padStart(2, '0')}.png`);
      const image = await sharp(file).resize(width, imageHeight).jpeg({ quality: 85 }).toBuffer();
      const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${labelHeight}"><rect width="100%" height="100%" fill="#214537"/><text x="6" y="20" fill="#fff9ee" font-family="Arial" font-size="12">${recipe.id} / ${index + 1}</text></svg>`);
      const left = index * width;
      const top = row * (imageHeight + labelHeight);
      composites.push({ input: image, left, top }, { input: label, left, top: top + imageHeight });
    }
  }
  const file = join(output, `french-steps-${Math.floor(start / 7) + 1}.jpg`);
  await sharp({ create: { width: columns * width, height: recipes.length * (imageHeight + labelHeight), channels: 3, background: '#fbf4e7' } })
    .composite(composites)
    .jpeg({ quality: 91 })
    .toFile(file);
  console.log(file);
}
