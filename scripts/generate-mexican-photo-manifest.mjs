import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "mexican");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "mexican-photo-evidence.json");
const output = join(root, "src", "mexican-photos.mjs");
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
// regenerating and manually reviewing the Mexican contact sheet again.
const selections = [
  ["tacos-al-pastor", "tacos-al-pastor", "attention", 1, "Three al pastor tacos with reddish pork, pineapple, onion and cilantro; strong visual match to the recipe."],
  ["cochinita-pibil", "cochinita-alt3", "attention", 1, "Close view of moist orange-red Yucatecan pibil pork showing the characteristic achiote colour and pull-apart texture."],
  ["mole-poblano", "mole-alt2", "attention", 1, "Finished plated dark mole poblano with a glossy sauce and visible toasted sesame garnish."],
  ["pozole-rojo", "pozole-rojo", "attention", 1, "Deep bowl of red pozole with hominy, pork and fresh cabbage, radish and onion garnishes."],
  ["birria-de-res", "birria-alt2", "attention", 1, "Traditional birria presentation with tender meat, chopped onion, a separate bowl of consommé, tortillas and lime."],
  ["enchiladas-verdes", "enchiladas-verdes", "attention", 1, "Rolled enchiladas under green salsa with shredded chicken, crema and white cheese clearly visible."],
  ["carnitas", "carnitas", "attention", 1, "Rustic Michoacán-style carnitas with irregular pork pieces and browned, rendered edges."],
  ["chiles-rellenos", "chiles-alt5", "attention", 1.25, "Restaurant chile relleno with a visible poblano, airy fried egg coating and red tomato sauce; crop focuses on the chile rather than the side dishes."],
  ["pescado-a-la-veracruzana", "pescado-a-la-veracruzana", "attention", 1, "Whole white fish in chunky Veracruz-style tomato sauce with olives, peppers and aromatic vegetables."],
  ["sopa-de-tortilla", "sopa-de-tortilla", "attention", 1, "Brick-red tortilla soup with crema, cheese and crisp tortilla garnish in a deep bowl."],
  ["tamales-de-pollo-en-salsa-verde", "tamales-de-pollo-en-salsa-verde", "southwest", 1.3, "Opened corn-husk tamales including a clearly visible green-salsa chicken tamal; crop emphasises the green filling."],
  ["huevos-rancheros", "huevos-alt2", "attention", 1, "Two sunny-side eggs on corn tortillas over rustic red ranchera salsa, matching the core recipe presentation."],
  ["chilaquiles-verdes", "chilaquiles-alt", "attention", 1, "Green chilaquiles with sauced tortilla pieces, crema, white cheese and cilantro; close match to the recipe."],
];

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });
if (selections.length !== 13 || new Set(selections.map(([id]) => id)).size !== 13) throw new Error("Expected 13 unique Mexican selections");

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
    reviewedAt: "2026-09-15",
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
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-mexican-photo-manifest.mjs after an approved source changes.\nexport const mexicanPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default mexicanPhotoCandidates;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified Mexican photo records.`);
