import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { koreanRecipeDrafts } from "../src/korean-recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const illustrationRoot = join(root, "assets", "recipes", "illustrations-generated");
const output = join(root, "src", "korean-illustration-sets.mjs");
const expectedDimensions = { width: 1672, height: 941 };
const sets = [];

for (const recipe of koreanRecipeDrafts) {
  const directory = join(illustrationRoot, recipe.id);
  const expectedFiles = recipe.instructions.map((_, index) => `step-${String(index + 1).padStart(2, "0")}.png`);
  const actualFiles = (await readdir(directory)).filter((file) => file.toLowerCase().endsWith(".png")).sort();
  if (JSON.stringify(actualFiles) !== JSON.stringify(expectedFiles)) {
    throw new Error(`${recipe.id}: expected ${expectedFiles.join(", ")}; found ${actualFiles.join(", ")}`);
  }

  const hashes = [];
  for (const file of expectedFiles) {
    const path = join(directory, file);
    const buffer = await readFile(path);
    const metadata = await sharp(buffer).metadata();
    if (metadata.width !== expectedDimensions.width || metadata.height !== expectedDimensions.height) {
      throw new Error(`${recipe.id}/${file}: expected 1672x941, found ${metadata.width}x${metadata.height}`);
    }
    hashes.push(createHash("sha256").update(buffer).digest("hex"));
  }

  sets.push({
    recipeId: recipe.id,
    promptSet: "korean-cooking-steps-v1",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-30",
    aiGenerated: true,
    nonPhotographic: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    dimensions: "1672x941",
    sourceDirectory: relative(root, directory).replaceAll("\\", "/"),
    hashes
  });
}

const source = `// Generated from reviewed Korean cooking-step source PNGs.\n// Run npm run manifest:korean-illustrations after an approved source image changes.\nexport const koreanIllustrationSets = ${JSON.stringify(sets, null, 2)};\n\nexport default koreanIllustrationSets;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} with ${sets.length} recipe sets and ${sets.reduce((sum, set) => sum + set.hashes.length, 0)} pinned source hashes.`);
