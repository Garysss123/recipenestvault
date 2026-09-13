import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "british");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "british-photo-evidence.json");
const output = join(root, "src", "british-photos.mjs");
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const clean = (value = "") => String(value)
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&[^;]+;/g, " ")
  .replace(/\s+/g, " ")
  .trim();
const cleanUrl = (value) => {
  const url = new URL(String(value).replace(/^http:/, "https:"));
  for (const key of [...url.searchParams.keys()]) if (key.startsWith("utm_")) url.searchParams.delete(key);
  return url.toString();
};
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");

// These local pixels are the current review set. Any candidate change requires
// regenerating and manually reviewing the British contact sheet again.
const selections = [
  ["fish-and-chips", "fish-and-chips", "attention", 1, "Traditional battered white fish with thick chips; the cider glass is incidental and does not obscure the dish."],
  ["beef-wellington", "beef-wellington", "attention", 1, "Cross-cut Wellington clearly shows rosy beef, mushroom layer and deeply golden puff pastry."],
  ["roast-beef-yorkshire-pudding", "roast-beef-yorkshire-pudding", "attention", 1, "Traditional roast beef plate with visible Yorkshire puddings and brown gravy."],
  ["shepherds-pie", "review-k", "attention", 1, "Served shepherd's pie clearly shows the browned mashed-potato layer and moist minced-meat-and-vegetable filling."],
  ["toad-in-the-hole", "review-b", "attention", 1, "Browned sausages are visibly embedded in a dramatically risen, crisp Yorkshire-pudding batter."],
  ["cornish-pasty", "cornish-pasty", "attention", 1, "Deep-golden traditional Cornish pasty with a sturdy D-shaped shell and prominent crimp."],
  ["full-english-breakfast", "review-i", "attention", 1, "Generous full English plate with fried eggs, black pudding, sausages, bacon, beans, tomato and toast clearly separated."],
  ["chicken-tikka-masala", "review-d", "attention", 1, "Clear orange-red chicken tikka masala with visible chicken pieces, glossy curry-house sauce and restrained herb garnish."],
  ["cullen-skink", "cullen-skink", "centre", 1, "Pale creamy Cullen skink with visible smoked-fish flakes and potato pieces."],
  ["welsh-rarebit", "review-e", "attention", 1, "Toast covered by a thick smooth grilled cheese mixture with deep browned blistering and crisp bread edges."],
  ["sticky-toffee-pudding", "sticky-toffee-pudding", "attention", 1, "Dark date sponge served warm with abundant glossy toffee sauce."],
  ["traditional-trifle", "review-f", "centre", 1, "Clear glass trifle bowl shows distinct red jelly-and-fruit, pale custard and generous white cream layers."],
  ["steak-and-kidney-pie", "review-o", "attention", 1, "Traditional steak-and-kidney pie in a ceramic dish with a very high, crisp, deeply golden puff-pastry lid."]
];

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });
if (selections.length !== 13 || new Set(selections.map(([id]) => id)).size !== 13) throw new Error("Expected 13 unique British selections");

const evidence = [];
for (const [id, candidateId, cropPosition, cropZoom, reviewNote] of selections) {
  const raw = JSON.parse(await readFile(join(research, `${candidateId}-selected.json`), "utf8"));
  const metadata = raw.extmetadata || {};
  const licenseShort = clean(metadata.LicenseShortName?.value);
  const license = /^CC0$/i.test(licenseShort) ? "CC0 1.0" : /^Public domain$/i.test(licenseShort) ? "Public Domain" : licenseShort;
  const licenseUrlRaw = metadata.LicenseUrl?.value || (license === "Public Domain" ? "https://commons.wikimedia.org/wiki/Commons:Licensing" : "");
  const author = clean(metadata.Artist?.value);
  if (!accepted.test(licenseShort) || /\b(?:NC|ND)\b/i.test(licenseShort) || !licenseUrlRaw || !author) {
    throw new Error(`${id}: incomplete or unacceptable commercial-use license evidence`);
  }

  const sourcePath = join(research, `${candidateId}.jpg`);
  const data = await readFile(sourcePath);
  const dimensions = await sharp(data).rotate().metadata();
  if ((dimensions.width || 0) < 1200 || (dimensions.height || 0) < 800) throw new Error(`${id}: reviewed source below 1200x800`);

  const sourceAsset = `${id}.jpg`;
  await copyFile(sourcePath, join(approved, sourceAsset));
  evidence.push({
    id,
    candidateId,
    commonsTitle: raw.title,
    title: clean(metadata.ObjectName?.value) || String(raw.title).replace(/^File:/, ""),
    author,
    sourcePage: cleanUrl(raw.descriptionurl),
    originalFile: cleanUrl(raw.url),
    license,
    licenseUrl: cleanUrl(licenseUrlRaw),
    originalWidth: raw.width,
    originalHeight: raw.height,
    sourceWidth: dimensions.width,
    sourceHeight: dimensions.height,
    sourceAsset,
    sourceAssetSha256: sha256(data),
    cropPosition,
    cropZoom,
    reviewedAt: "2026-09-14",
    reviewNote,
    matchAssessment: "close"
  });
}

if (new Set(evidence.map((entry) => entry.commonsTitle)).size !== evidence.length) throw new Error("A Commons source page is reused");
if (new Set(evidence.map((entry) => entry.originalFile)).size !== evidence.length) throw new Error("An original file URL is reused");
if (new Set(evidence.map((entry) => entry.sourceAssetSha256)).size !== evidence.length) throw new Error("Identical source pixels are reused");

await writeFile(evidencePath, JSON.stringify(evidence, null, 2) + "\n", "utf8");
const photos = evidence.map(({ originalWidth, originalHeight, sourceWidth, sourceHeight, candidateId, matchAssessment, ...photo }) => ({
  ...photo,
  relation: "dish-reference",
  commercialUseVerified: true,
  realPhoto: true,
  visualMatchApproved: true
}));
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-british-photo-manifest.mjs after an approved source changes.\nexport const britishPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default britishPhotoCandidates;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified British photo records.`);
