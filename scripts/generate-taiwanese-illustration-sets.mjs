import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { taiwaneseRecipeDrafts } from "../src/taiwanese-recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sheetsRoot = join(root, "assets", "recipes", "illustration-sheets-generated", "taiwanese");
const supplementalRoot = join(root, "assets", "recipes", "illustration-sheets-generated", "taiwanese-supplemental");
const illustrationRoot = join(root, "assets", "recipes", "illustrations-generated");
const output = join(root, "src", "taiwanese-illustration-sets.mjs");
const basePanel = { columns: 3, rows: 2, left: 51, top: 51, width: 469, height: 454, gapX: 14, gapY: 14 };
const layouts = {
  single: { columns: 1, rows: 1, canvasWidth: 1536, canvasHeight: 1024, left: 51, top: 51, width: 1434, height: 922, gapX: 0, gapY: 0 },
  vertical2: { columns: 1, rows: 2, canvasWidth: 1024, canvasHeight: 1536, left: 34, top: 34, width: 956, height: 727, gapX: 0, gapY: 14 },
  grid4: { columns: 2, rows: 2, canvasWidth: 1254, canvasHeight: 1254, left: 42, top: 42, width: 578, height: 578, gapX: 14, gapY: 14 }
};
const expanded = {
  "taiwanese-beef-noodle-soup": { sheet: "beef-extra.png", layout: "vertical2", map: ["s1", "b1", "s2", "b2", "b3", "b4", "b5", "b6"] },
  "lu-rou-fan": { sheet: "lu-extra.png", layout: "single", map: ["b1", "b2", "s1", "b3", "b4", "b5", "b6"] },
  "taiwanese-popcorn-chicken": { sheet: "pop-extra.png", layout: "single", map: ["b1", "s1", "b2", "b3", "b4", "b5", "b6"] },
  "gua-bao": { sheet: "gua-extra.png", layout: "vertical2", map: ["b1", "b2", "b3", "b4", "s1", "b5", "s2", "b6"] },
  "danzai-noodles": { sheet: "danzai-extra.png", layout: "single", map: ["s1", "b1", "b2", "b3", "b4", "b5", "b6"] },
  "ba-wan": { sheet: "bawan-extra.png", layout: "vertical2", map: ["b1", "s1", "b2", "b3", "b4", "b5", "s2", "b6"] },
  "taiwanese-sausage": { sheet: "sausage-extra.png", layout: "grid4", map: ["b1", "s1", "b2", "s2", "b3", "s3", "b4", "b5", "s4", "b6"] },
  "pineapple-cakes": { sheet: "pine-extra.png", layout: "vertical2", map: ["b1", "s1", "b2", "b3", "b4", "b5", "s2", "b6"] },
  "taiwanese-oil-rice": { sheet: "oil-extra.png", layout: "single", map: ["s1", "b1", "b2", "b3", "b4", "b5", "b6"] },
  "taiwanese-tea-eggs": { sheet: "tea-extra.png", layout: "single", map: ["b1", "s1", "b2", "b3", "b4", "b5", "b6"] }
};

function extractPanel(buffer, layout, oneBasedIndex) {
  const inset = 8;
  const index = oneBasedIndex - 1;
  const column = index % layout.columns;
  const row = Math.floor(index / layout.columns);
  if (row >= layout.rows) throw new Error(`panel ${oneBasedIndex} exceeds ${layout.columns}x${layout.rows} layout`);
  return sharp(buffer).extract({ left: layout.left + column * (layout.width + layout.gapX) + inset, top: layout.top + row * (layout.height + layout.gapY) + inset, width: layout.width - inset * 2, height: layout.height - inset * 2 });
}

const sets = [];
for (const recipe of taiwaneseRecipeDrafts) {
  const basePath = join(sheetsRoot, `${recipe.id}.png`);
  const baseBuffer = await readFile(basePath);
  const baseMetadata = await sharp(baseBuffer).metadata();
  if (baseMetadata.width !== 1536 || baseMetadata.height !== 1024) throw new Error(`${recipe.id}: invalid base-sheet dimensions`);
  const config = expanded[recipe.id] ?? { map: recipe.instructions.map((_, index) => `b${index + 1}`) };
  if (config.map.length !== recipe.instructions.length) throw new Error(`${recipe.id}: ${config.map.length} mapped panels for ${recipe.instructions.length} steps`);

  let supplementalPath;
  let supplementalBuffer;
  if (config.sheet) {
    supplementalPath = join(supplementalRoot, config.sheet);
    supplementalBuffer = await readFile(supplementalPath);
    const metadata = await sharp(supplementalBuffer).metadata();
    const layout = layouts[config.layout];
    if (metadata.width !== layout.canvasWidth || metadata.height !== layout.canvasHeight) throw new Error(`${recipe.id}: invalid supplemental-sheet dimensions ${metadata.width}x${metadata.height}`);
  }

  const directory = join(illustrationRoot, recipe.id);
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
  const hashes = [];
  for (const [index, mapping] of config.map.entries()) {
    const sourceType = mapping[0];
    const sourceIndex = Number(mapping.slice(1));
    const pipeline = sourceType === "b" ? extractPanel(baseBuffer, basePanel, sourceIndex) : extractPanel(supplementalBuffer, layouts[config.layout], sourceIndex);
    const target = join(directory, `step-${String(index + 1).padStart(2, "0")}.png`);
    await pipeline.resize(1672, 941, { fit: "cover", position: "attention" }).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile(target);
    hashes.push(createHash("sha256").update(await readFile(target)).digest("hex"));
  }

  sets.push({
    recipeId: recipe.id,
    promptSet: "taiwanese-cooking-steps-v2",
    generator: "OpenAI image_gen",
    generatedAt: "2026-08-31",
    aiGenerated: true,
    nonPhotographic: true,
    noPeopleOrHands: true,
    visualMatchApproved: true,
    excludeFromStructuredData: true,
    setComplete: true,
    dimensions: "1672x941",
    sourceSheetAsset: relative(root, basePath).replaceAll("\\", "/"),
    sourceSheetSha256: createHash("sha256").update(baseBuffer).digest("hex"),
    ...(supplementalPath ? { supplementalSheetAssets: [relative(root, supplementalPath).replaceAll("\\", "/")], supplementalSheetSha256: [createHash("sha256").update(supplementalBuffer).digest("hex")] } : {}),
    sourceDirectory: relative(root, directory).replaceAll("\\", "/"),
    hashes
  });
}

const source = `// Generated from reviewed, hand-free Taiwanese source sheets.\n// Published crops use the same border-free editorial illustration treatment as prior cuisines.\nexport const taiwaneseIllustrationSets = ${JSON.stringify(sets, null, 2)};\n\nexport default taiwaneseIllustrationSets;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} with ${sets.length} sets and ${sets.reduce((sum, set) => sum + set.hashes.length, 0)} step hashes.`);
