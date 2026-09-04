import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { indianRecipeDrafts } from "../src/indian-recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sheetsRoot = join(root, "assets", "recipes", "illustration-sheets-generated", "indian");
const illustrationRoot = join(root, "assets", "recipes", "illustrations-generated");
const output = join(root, "src", "indian-illustration-sets.mjs");
const columns = 3;
const rows = 3;
const inset = 8;

function extractPanel(buffer, index, canvasWidth, canvasHeight) {
  const column = index % columns;
  const row = Math.floor(index / columns);
  if (row >= rows) throw new Error(`panel ${index + 1} exceeds the 3x3 layout`);
  const leftEdge = Math.round(column * canvasWidth / columns);
  const rightEdge = Math.round((column + 1) * canvasWidth / columns);
  const topEdge = Math.round(row * canvasHeight / rows);
  const bottomEdge = Math.round((row + 1) * canvasHeight / rows);
  return sharp(buffer).extract({
    left: leftEdge + inset,
    top: topEdge + inset,
    width: rightEdge - leftEdge - inset * 2,
    height: bottomEdge - topEdge - inset * 2
  });
}

const sets = [];
for (const recipe of indianRecipeDrafts) {
  const sheetPath = join(sheetsRoot, `${recipe.id}.png`);
  const sheetBuffer = await readFile(sheetPath);
  const metadata = await sharp(sheetBuffer).metadata();
  const canvasWidth = metadata.width || 0;
  const canvasHeight = metadata.height || 0;
  if (canvasWidth < 1200 || canvasHeight < 900) throw new Error(`${recipe.id}: source sheet is below 1200x900 (${canvasWidth}x${canvasHeight})`);
  if (recipe.instructions.length < 6 || recipe.instructions.length > 9) throw new Error(`${recipe.id}: expected 6-9 instructions`);

  const directory = join(illustrationRoot, recipe.id);
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
  const hashes = [];
  for (let index = 0; index < recipe.instructions.length; index += 1) {
    const target = join(directory, `step-${String(index + 1).padStart(2, "0")}.png`);
    await extractPanel(sheetBuffer, index, canvasWidth, canvasHeight)
      .resize(1672, 941, { fit: "cover", position: "attention" })
      .png({ compressionLevel: 9, palette: true, quality: 92 })
      .toFile(target);
    hashes.push(createHash("sha256").update(await readFile(target)).digest("hex"));
  }

  sets.push({
    recipeId: recipe.id,
    promptSet: "indian-cooking-steps-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-09-04",
    aiGenerated: true,
    nonPhotographic: true,
    noPeopleOrHands: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    dimensions: "1672x941",
    sourceSheetAsset: relative(root, sheetPath).replaceAll("\\", "/"),
    sourceSheetSha256: createHash("sha256").update(sheetBuffer).digest("hex"),
    sourceDirectory: relative(root, directory).replaceAll("\\", "/"),
    hashes
  });
}

const source = `// Generated from reviewed, hand-free Indian source sheets.\n// Published crops use the same border-free editorial illustration treatment as prior cuisines.\nexport const indianIllustrationSets = ${JSON.stringify(sets, null, 2)};\n\nexport default indianIllustrationSets;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} with ${sets.length} sets and ${sets.reduce((sum, set) => sum + set.hashes.length, 0)} step hashes.`);
