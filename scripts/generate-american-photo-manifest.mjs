import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "american");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "american-photo-evidence.json");
const output = join(root, "src", "american-photos.mjs");
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
// regenerating and manually reviewing the American contact sheet again.
const selections = [
  ["cheeseburger", "cheeseburger", "attention", 1, "Classic cheeseburger with a browned beef patty, melted cheese and a soft bun; visually close to the recipe specification."],
  ["buffalo-wings", "buffalo-review", "attention", 1, "A tray full of finished Buffalo-style wings with the expected red-orange sauce coating; the food is clearly the photographic subject."],
  ["southern-fried-chicken", "southern-fried-chicken", "attention", 1, "Mixed fried chicken pieces with a rugged deep-golden crust and no heavy sauce, matching Southern fried chicken closely."],
  ["memphis-style-ribs", "memphis-style-ribs", "attention", 1, "Smoked pork ribs with a dark bark and dry-looking exterior; close to the Memphis dry-rub presentation."],
  ["baked-mac-and-cheese", "baked-mac-and-cheese", "attention", 1, "Baked macaroni and cheese with browned top and creamy pasta visible beneath."],
  ["new-england-clam-chowder", "new-england-clam-chowder", "attention", 1, "Creamy pale clam chowder with black pepper and a thick spoonable consistency."],
  ["philly-cheesesteak", "philly-review", "attention", 1, "Close view of a Philadelphia cheesesteak in a long roll with chopped beef, onions and visibly melted cheese."],
  ["chicken-and-sausage-gumbo", "chicken-and-sausage-gumbo", "attention", 1, "Dark chicken-and-sausage gumbo with visible meat pieces in a rich brown base."],
  ["jambalaya", "jambalaya", "attention", 1, "Andouille-and-shrimp jambalaya with seasoned rice, sausage and shrimp visible in one-pot presentation."],
  ["biscuits-and-gravy", "biscuits-and-gravy", "attention", 1, "Split biscuits covered with pale sausage gravy and visible browned sausage pieces."],
  ["meatloaf", "meatloaf-review", "attention", 1, "Classic glazed meatloaf shown as a full loaf with clean slices and a tomato-red top, closely matching the recipe."],
  ["skillet-cornbread", "skillet-cornbread", "attention", 1, "Golden cornbread baked directly in a dark cast-iron skillet with a browned edge."],
  ["new-york-cheesecake", "new-york-cheesecake", "attention", 1, "Plain tall New York-style cheesecake with a smooth pale filling and simple crust."],
  ["apple-pie", "apple-pie", "attention", 1, "Traditional double-crust American apple pie with a deep-golden baked pastry shell."],
  ["chocolate-chip-cookies", "chocolate-chip-cookies", "attention", 1, "Classic golden chocolate chip cookies with many visible chocolate pieces and soft-looking centres."]
];

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });
if (selections.length !== 15 || new Set(selections.map(([id]) => id)).size !== 15) throw new Error("Expected 15 unique American selections");

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
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-american-photo-manifest.mjs after an approved source changes.\nexport const americanPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default americanPhotoCandidates;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified American photo records.`);
