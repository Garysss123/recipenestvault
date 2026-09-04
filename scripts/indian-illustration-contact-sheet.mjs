import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { indianRecipeDrafts } from "../src/indian-recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceRoot = join(root, "assets", "recipes", "illustrations-generated");
const output = join(root, "qa-artifacts", "indian-step-illustrations-contact.jpg");
const tileWidth = 240;
const imageHeight = 135;
const labelHeight = 30;
const columns = Math.max(...indianRecipeDrafts.map((recipe) => recipe.instructions.length));
const rows = indianRecipeDrafts.length;
const composites = [];

for (const [recipeIndex, recipe] of indianRecipeDrafts.entries()) {
  for (let step = 1; step <= recipe.instructions.length; step += 1) {
    const file = join(sourceRoot, recipe.id, `step-${String(step).padStart(2, "0")}.png`);
    const left = (step - 1) * tileWidth;
    const top = recipeIndex * (imageHeight + labelHeight);
    const image = await sharp(file).resize(tileWidth, imageHeight, { fit: "cover" }).jpeg({ quality: 82 }).toBuffer();
    const label = `${recipe.id} · ${String(step).padStart(2, "0")}`.replaceAll("&", "&amp;");
    const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#29251f"/><text x="10" y="22" fill="#fff8e8" font-family="Arial,sans-serif" font-size="13">${label}</text></svg>`);
    composites.push({ input: image, left, top }, { input: svg, left, top: top + imageHeight });
  }
}

await mkdir(dirname(output), { recursive: true });
await sharp({ create: { width: columns * tileWidth, height: rows * (imageHeight + labelHeight), channels: 3, background: "#f6f0e5" } })
  .composite(composites)
  .jpeg({ quality: 88 })
  .toFile(output);
console.log(output);
