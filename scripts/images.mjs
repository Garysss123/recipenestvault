import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, "assets", "brand", "featured-source.png");
const output = join(root, "public", "images");
await mkdir(output, { recursive: true });

const metadata = await sharp(source).metadata();
const halfWidth = Math.floor(metadata.width / 2);
const halfHeight = Math.floor(metadata.height / 2);
const crops = [
  { name: "sushi", left: 0, top: 0 },
  { name: "paella", left: metadata.width - halfWidth, top: 0 },
  { name: "pizza", left: 0, top: metadata.height - halfHeight },
  { name: "burger", left: metadata.width - halfWidth, top: metadata.height - halfHeight }
];

for (const crop of crops) {
  for (const width of [640, 960, 1440]) {
    await sharp(source)
      .extract({ left: crop.left, top: crop.top, width: halfWidth, height: halfHeight })
      .resize({ width, height: Math.round(width * .75), fit: "cover" })
      .webp({ quality: 82, effort: 5 })
      .toFile(join(output, `${crop.name}-${width}.webp`));
  }
}

console.log(`Prepared ${crops.length * 3} responsive WebP crops from the site-owned featured image.`);
