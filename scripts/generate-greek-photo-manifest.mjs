import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "greek");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "greek-photo-evidence.json");
const output = join(root, "src", "greek-photos.mjs");
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
// regenerating and manually reviewing the Greek contact sheet again.
const selections = [
  ["moussaka", "moussaka", "attention", 1, "Traditional moussaka with a browned béchamel cap and clearly layered eggplant/meat interior."],
  ["pastitsio", "pastitsio2", "attention", 1, "Greek pastitsio showing baked tubular pasta, meat sauce and a thick pale-golden béchamel layer."],
  ["pork-souvlaki", "souvlaki-review", "attention", 1, "Finished souvlaki skewers with evenly cut browned meat cubes and crisp edges, closely matching the grilled pork-skewer presentation."],
  ["spanakopita", "spanakopita", "attention", 1, "Golden spanakopita with visibly flaky phyllo and a dense spinach filling."],
  ["dolmades", "dolmades-greek", "attention", 1, "Small intact Greek dolmadakia rolls with glossy vine leaves in a simple serving."],
  ["avgolemono", "avgolemono", "attention", 1, "Pale creamy avgolemono soup with the defining silky egg-lemon appearance."],
  ["fasolada", "fasolada", "attention", 1, "Rustic Greek fasolada with visible white beans in a tomato-rich broth."],
  ["gigantes-plaki", "gigantes-plaki", "attention", 1, "Baked giant white beans in a thick red tomato sauce, matching gigantes plaki closely."],
  ["gemista", "gemista", "attention", 1, "Traditional gemista with whole stuffed tomatoes and peppers visibly softened from roasting."],
  ["beef-stifado", "stifado-review", "attention", 1, "Excellent stifado close view with large tender beef pieces, many intact small onions and a thick glossy red-brown sauce."],
  ["keftedes", "keftedes-greek2", "attention", 1, "Deep-browned fried meatballs with a home-style texture; visually close to Greek keftedes despite generic source naming."],
  ["horiatiki", "horiatiki", "attention", 1, "Authentic-looking Greek village salad with large tomato and cucumber pieces, olives and a substantial feta slab."],
  ["galaktoboureko", "galaktoboureko", "attention", 1, "Galaktoboureko slice with crisp phyllo around a thick pale custard centre and syrup sheen."]
];

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });
if (selections.length !== 13 || new Set(selections.map(([id]) => id)).size !== 13) throw new Error("Expected 13 unique Greek selections");

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
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-greek-photo-manifest.mjs after an approved source changes.\nexport const greekPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default greekPhotoCandidates;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified Greek photo records.`);
