import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "italian");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "italian-photo-evidence.json");
const output = join(root, "src", "italian-photos.mjs");
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

// The local pixels named here were manually reviewed against each recipe's
// visualSpec. Changing a candidate requires a fresh contact-sheet review.
const selections = [
  ["pizza-margherita", "pizza-margherita", "centre", 1, "Round Margherita pizza with blistered crust, tomato, melted mozzarella and basil; no unrelated toppings.", "close"],
  ["spaghetti-carbonara", "spaghetti-carbonara", "attention", 1, "Glossy spaghetti carbonara with browned guanciale, cheese and black pepper; no cream-heavy white sauce or vegetable garnish.", "close"],
  ["cacio-e-pepe", "cacio-e-pepe", "attention", 1, "Long pasta coated in a pale Pecorino emulsion with abundant black pepper and no tomato or herbs.", "close"],
  ["bucatini-amatriciana", "bucatini-amatriciana", "attention", 1, "Bucatini in red tomato sauce with visible guanciale and grated Pecorino; no cream sauce.", "close"],
  ["pasta-alla-norma", "pasta-alla-norma", "attention", 1, "Red-sauced pasta with browned eggplant, white grated cheese and basil matching the finished Norma profile.", "close"],
  ["trofie-al-pesto", "trofie-al-pesto", "attention", 1, "Trofie coated in vivid green pesto with the expected Ligurian appearance and no red sauce.", "close"],
  ["tagliatelle-ragu-bolognese", "tagliatelle-ragu-bolognese", "attention", 1, "Broad egg-pasta ribbons with a thick finely textured meat ragù and light grated cheese.", "close"],
  ["lasagne-bolognese", "lasagne-bolognese", "attention", 1, "Baked lasagne with browned top and distinct pasta, ragù and pale sauce layers.", "close"],
  ["risotto-alla-milanese", "risotto-alla-milanese", "centre", 1, "Loose glossy saffron-yellow risotto with distinct rice grains and no heavy garnish.", "close"],
  ["ossobuco-alla-milanese", "ossobuco-alt1", "attention", 1, "Single braised cross-cut veal shank with central marrow bone, glossy dark braising sauce and green gremolata; a small noodle side remains visible in the source.", "acceptable-with-minor-side-mismatch"],
  ["saltimbocca-alla-romana", "saltimbocca-alla-romana", "attention", 1, "Veal cutlets topped with prosciutto and sage in a light pan sauce, matching the Roman presentation.", "close"],
  ["melanzane-parmigiana", "melanzane-parmigiana", "attention", 1, "Layered eggplant parmigiana with tomato and browned melted cheese; no pasta layers.", "close"],
  ["ribollita", "ribollita-alt2", "attention", 1, "Very thick rustic bean-and-vegetable soup with visible bread and greens; the bowl presentation is consistent with ribollita.", "close"],
  ["arancini-siciliani", "arancini-siciliani", "attention", 1, "Deep-golden Sicilian rice balls with a crisp crumb exterior and visible filled centre.", "close"],
  ["focaccia-genovese", "focaccia-genovese", "attention", 1, "Golden rectangular focaccia with deep dimples and an olive-oil sheen.", "close"],
  ["spaghetti-alle-vongole", "spaghetti-alle-vongole", "attention", 1, "Spaghetti with open clam shells and a pale glossy briny sauce; no tomato or cheese.", "close"],
  ["pollo-alla-cacciatora", "pollo-alla-cacciatora", "attention", 1, "Chicken pieces in a rustic tomato braise with vegetables, matching cacciatora rather than a cream sauce.", "close"],
  ["tiramisu", "tiramisu-alt4", "centre", 1, "Clean square tiramisu slice with two coffee-darkened biscuit layers, pale mascarpone layers and an even cocoa top.", "close"],
  ["panna-cotta", "panna-cotta-alt1", "centre", 1, "Smooth pale panna cotta is clearly visible in a simple glass; the Commons source includes a red fruit sauce layer that is absent from this recipe's preferred plain presentation.", "acceptable-with-minor-sauce-mismatch"],
  ["cannoli-siciliani", "cannoli-siciliani", "attention", 1, "Crisp blistered cannoli shells filled with pale ricotta cream and dark chocolate pieces.", "close"],
  ["cantucci", "cantucci", "attention", 1, "Dry golden Tuscan almond biscuits with visible almond cross-sections and no chocolate coating.", "close"],
];

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });

if (selections.length !== 21 || new Set(selections.map(([id]) => id)).size !== 21) throw new Error("Expected 21 unique Italian selections");

const evidence = [];
for (const [id, candidateId, cropPosition, cropZoom, reviewNote, matchAssessment = "close"] of selections) {
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
    reviewedAt: "2026-09-13",
    reviewNote,
    matchAssessment
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
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-italian-photo-manifest.mjs after an approved source changes.\nexport const italianPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default italianPhotoCandidates;\n`;
await writeFile(output, source, "utf8");

console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified Italian photo records.`);
