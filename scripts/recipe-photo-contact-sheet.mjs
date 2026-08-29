import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { recipes } from "../src/recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const cuisine = process.argv[2] || "japanese";
const selected = recipes.filter((recipe) => recipe.cuisine === cuisine);
if (!selected.length) throw new Error(`No published recipes found for ${cuisine}`);

const columns = 3;
const cardWidth = 520;
const imageHeight = 390;
const labelHeight = 72;
const gap = 18;
const rows = Math.ceil(selected.length / columns);
const width = columns * cardWidth + (columns + 1) * gap;
const height = rows * (imageHeight + labelHeight) + (rows + 1) * gap;
const canvas = sharp({ create: { width, height, channels: 3, background: "#f7f2ed" } });
const composites = [];

for (const [index, recipe] of selected.entries()) {
  const x = gap + (index % columns) * (cardWidth + gap);
  const y = gap + Math.floor(index / columns) * (imageHeight + labelHeight + gap);
  const source = join(root, "assets", "recipes", "approved", recipe.photo.sourceAsset);
  const zoom = Math.max(1, Number(recipe.photo.cropZoom) || 1);
  let pipeline = sharp(source).rotate();
  if (zoom > 1) {
    const zoomedWidth = Math.round(cardWidth * zoom);
    const zoomedHeight = Math.round(imageHeight * zoom);
    const horizontal = recipe.photo.cropPosition === "east" || recipe.photo.cropPosition === "right"
      ? zoomedWidth - cardWidth
      : recipe.photo.cropPosition === "west" || recipe.photo.cropPosition === "left"
        ? 0
        : Math.round((zoomedWidth - cardWidth) / 2);
    pipeline = pipeline
      .resize({ width: zoomedWidth, height: zoomedHeight, fit: "cover", position: recipe.photo.cropPosition || "attention" })
      .extract({ left: horizontal, top: Math.round((zoomedHeight - imageHeight) / 2), width: cardWidth, height: imageHeight });
  } else {
    pipeline = pipeline.resize({ width: cardWidth, height: imageHeight, fit: "cover", position: recipe.photo.cropPosition || "attention" });
  }
  const image = await pipeline.jpeg({ quality: 88 }).toBuffer();
  const label = Buffer.from(`<svg width="${cardWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#fffaf7"/>
    <text x="18" y="29" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#272225">${index + 1}. ${recipe.id}</text>
    <text x="18" y="54" font-family="Arial, sans-serif" font-size="14" fill="#8b3657">${recipe.photo.license}</text>
  </svg>`);
  composites.push({ input: image, left: x, top: y }, { input: label, left: x, top: y + imageHeight });
}

const outputDirectory = join(root, "qa-artifacts");
await mkdir(outputDirectory, { recursive: true });
const output = join(outputDirectory, `${cuisine}-finished-photo-contact-sheet.jpg`);
await canvas.composite(composites).jpeg({ quality: 90 }).toFile(output);
console.log(output);
