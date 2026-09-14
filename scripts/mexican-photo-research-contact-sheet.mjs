import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const ids = [
  'tacos-al-pastor','cochinita-pibil','mole-poblano','pozole-rojo','birria-de-res',
  'enchiladas-verdes','carnitas','chiles-rellenos','pescado-a-la-veracruzana',
  'sopa-de-tortilla','tamales-de-pollo-en-salsa-verde','huevos-rancheros','chilaquiles-verdes'
];
const cols = 3, cardW = 520, imageH = 360, labelH = 64, gap = 16;
const rows = Math.ceil(ids.length / cols);
const width = cols * cardW + (cols + 1) * gap;
const height = rows * (imageH + labelH) + (rows + 1) * gap;
const canvas = sharp({ create: { width, height, channels: 3, background: '#f7f2ed' } });
const composites = [];
for (const [index, id] of ids.entries()) {
  const x = gap + (index % cols) * (cardW + gap);
  const y = gap + Math.floor(index / cols) * (imageH + labelH + gap);
  const source = join(root, 'assets', 'recipes', 'alternatives', 'mexican', `${id}.jpg`);
  const image = await sharp(source).rotate().resize({ width: cardW, height: imageH, fit: 'cover', position: 'attention' }).jpeg({ quality: 88 }).toBuffer();
  const safe = id.replace(/&/g, '&amp;');
  const label = Buffer.from(`<svg width="${cardW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#fffaf7"/><text x="16" y="28" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#272225">${index + 1}. ${safe}</text><text x="16" y="50" font-family="Arial,sans-serif" font-size="13" fill="#8b3657">licensed candidate — manual visual review</text></svg>`);
  composites.push({ input: image, left: x, top: y }, { input: label, left: x, top: y + imageH });
}
const outDir = join(root, 'qa-artifacts', 'mexican-review');
await mkdir(outDir, { recursive: true });
const out = join(outDir, 'mexican-photo-candidates.jpg');
await canvas.composite(composites).jpeg({ quality: 90 }).toFile(out);
console.log(out);
