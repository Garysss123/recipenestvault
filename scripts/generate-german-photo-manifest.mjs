import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "german");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "german-photo-evidence.json");
const output = join(root, "src", "german-photos.mjs");
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
// regenerating and manually reviewing the German contact sheet again.
const selections = [
  ["sauerbraten", "sauerbraten", "attention", 1, "Traditional Sauerbraten plate with dark gravy, potato dumplings and red cabbage; the braised beef is clearly the main component."],
  ["rinderrouladen", "rinderrouladen", "attention", 1, "Traditional Rinderroulade plate with dark gravy, dumpling and red cabbage; the rolled beef is clearly identifiable."],
  ["bavarian-krustenbraten", "kruste-review", "attention", 1, "Excellent close view of a pork roast with deeply blistered, scored crackling and juicy layered meat beneath."],
  ["currywurst", "currywurst", "attention", 1, "Classic sliced currywurst covered in thick red sauce and a heavy curry-powder dusting."],
  ["nuernberger-rostbratwurst", "nuernberger-final", "attention", 1, "Small browned Nuremberg sausages are plated directly with a mound of sauerkraut in a casual festival-style serving."],
  ["frikadellen", "frikadellen-final", "attention", 1, "One thick, dark-golden pan-fried Frikadelle is clearly visible beside potatoes and vegetables in a home-style plate."],
  ["koenigsberger-klopse", "koenigsberger-review", "attention", 1, "Pale poached meatballs sit in a creamy caper-speckled sauce, matching the defining visual identity of Königsberger Klopse."],
  ["kartoffelpuffer", "kartoffelpuffer-review", "attention", 1, "Three irregular crisp potato pancakes with deeply browned lacy edges are served beside applesauce."],
  ["kaesespaetzle", "kaesespaetzle-review", "attention", 1, "Distinct pale Spätzle are coated with cheese and generously topped with deeply browned onions."],
  ["maultaschen", "maultaschen", "attention", 1, "Large rectangular Maultaschen parcels with intact seams are plated clearly, with onion and chive garnish."],
  ["erbsensuppe", "erbsensuppe-final", "attention", 1, "A thick rustic pea soup with two visible sausages, fried onion and herbs closely matches the hearty German style."],
  ["black-forest-cake", "black-forest-cake", "attention", 1, "Cut Black Forest cake clearly reveals multiple dark sponge, white cream and red cherry layers with chocolate and cherries on top."],
  ["bienenstich", "bienenstich", "attention", 1, "A clean Bienenstich slice shows a thick pale cream centre beneath a caramelized sliced-almond top."]
];

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });
if (selections.length !== 13 || new Set(selections.map(([id]) => id)).size !== 13) throw new Error("Expected 13 unique German selections");

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
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-german-photo-manifest.mjs after an approved source changes.\nexport const germanPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default germanPhotoCandidates;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified German photo records.`);
