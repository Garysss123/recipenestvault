import { mkdir, readdir } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const relativeDirectory = process.argv[2];
const outputName = process.argv[3] || "asset-contact-sheet.jpg";
if (!relativeDirectory) throw new Error("Usage: node scripts/asset-contact-sheet.mjs <relative-directory> [output-name]");

const sourceDirectory = join(root, relativeDirectory);
const files = (await readdir(sourceDirectory))
  .filter((name) => /\.(?:avif|jpe?g|png|webp)$/i.test(name))
  .sort((a, b) => a.localeCompare(b));
if (!files.length) throw new Error(`No image assets found in ${relativeDirectory}`);

const columns = 3;
const cardWidth = 480;
const imageHeight = 330;
const labelHeight = 72;
const gap = 18;
const rows = Math.ceil(files.length / columns);
const width = columns * cardWidth + (columns + 1) * gap;
const height = rows * (imageHeight + labelHeight) + (rows + 1) * gap;
const composites = [];

for (const [index, file] of files.entries()) {
  const x = gap + (index % columns) * (cardWidth + gap);
  const y = gap + Math.floor(index / columns) * (imageHeight + labelHeight + gap);
  const input = join(sourceDirectory, file);
  const metadata = await sharp(input).metadata();
  const image = await sharp(input).rotate().resize({ width: cardWidth, height: imageHeight, fit: "cover", position: "attention" }).jpeg({ quality: 88 }).toBuffer();
  const safeLabel = basename(file, extname(file)).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const label = Buffer.from(`<svg width="${cardWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#fffaf7"/>
    <text x="16" y="28" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#272225">${index + 1}. ${safeLabel}</text>
    <text x="16" y="53" font-family="Arial, sans-serif" font-size="14" fill="#8b3657">${metadata.width || 0} × ${metadata.height || 0}</text>
  </svg>`);
  composites.push({ input: image, left: x, top: y }, { input: label, left: x, top: y + imageHeight });
}

const outputDirectory = join(root, "qa-artifacts");
await mkdir(outputDirectory, { recursive: true });
const output = join(outputDirectory, outputName);
await sharp({ create: { width, height, channels: 3, background: "#f7f2ed" } }).composite(composites).jpeg({ quality: 90 }).toFile(output);
console.log(output);
