import { readdir, mkdir } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import sharp from "sharp";

const [inputArgument, outputArgument] = process.argv.slice(2);

if (!inputArgument || !outputArgument) {
  throw new Error("Usage: node scripts/illustration-contact-sheet.mjs <input-directory> <output-file>");
}

const inputDirectory = resolve(inputArgument);
const outputFile = resolve(outputArgument);
const files = (await readdir(inputDirectory))
  .filter((file) => /\.(?:png|jpe?g|webp)$/i.test(file))
  .sort((left, right) => left.localeCompare(right, "en", { numeric: true }));

if (files.length === 0) throw new Error(`No images found in ${inputDirectory}`);

const columns = Math.min(3, files.length);
const tileWidth = 480;
const imageHeight = 270;
const labelHeight = 36;
const tileHeight = imageHeight + labelHeight;
const rows = Math.ceil(files.length / columns);
const composites = [];

for (const [index, file] of files.entries()) {
  const left = (index % columns) * tileWidth;
  const top = Math.floor(index / columns) * tileHeight;
  const image = await sharp(resolve(inputDirectory, file))
    .resize(tileWidth, imageHeight, { fit: "cover", position: "centre" })
    .jpeg({ quality: 84 })
    .toBuffer();
  const safeLabel = basename(file).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  })[character]);
  const label = Buffer.from(`<svg width="${tileWidth}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#2b2226"/><text x="14" y="24" fill="#fff8f2" font-family="Arial, sans-serif" font-size="15">${safeLabel}</text></svg>`);
  composites.push({ input: image, left, top });
  composites.push({ input: label, left, top: top + imageHeight });
}

await mkdir(dirname(outputFile), { recursive: true });
await sharp({
  create: {
    width: columns * tileWidth,
    height: rows * tileHeight,
    channels: 3,
    background: "#f7f0e8"
  }
}).composite(composites).jpeg({ quality: 90 }).toFile(outputFile);

console.log(`Created ${outputFile} from ${files.length} images.`);
