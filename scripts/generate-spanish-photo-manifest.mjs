import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "spanish");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "spanish-photo-evidence.json");
const output = join(root, "src", "spanish-photos.mjs");
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
  ["paella-valenciana", "paella-valenciana", "attention", 1, "Wide Valencian paella with a thin saffron rice layer and visible traditional meat and bean components; minor lemon garnish is acceptable.", "close"],
  ["tortilla-espanola", "tortilla-espanola", "attention", 1, "Thick golden potato tortilla with a cut wedge showing layered potato and set egg.", "close"],
  ["gazpacho-andaluz", "gazpacho-andaluz", "centre", 1, "Smooth bright-red chilled gazpacho in a simple white bowl with only a restrained garnish.", "close"],
  ["salmorejo-cordobes", "salmorejo-cordobes", "attention", 1, "Dense orange-red salmorejo topped with chopped egg and cured-ham garnish in a shallow bowl.", "close"],
  ["patatas-bravas", "patatas-bravas", "attention", 1, "Deep-golden potato pieces topped with brick-red brava sauce, matching the crisp tapas presentation.", "close"],
  ["croquetas-de-jamon", "croquetas-de-jamon", "attention", 1, "Small uniformly deep-golden ham croquettes with a fine crisp crumb shell.", "close"],
  ["gambas-al-ajillo", "gambas-al-ajillo", "attention", 1, "Pink prawns in abundant glossy garlic olive oil with visible garlic and herb flecks; no tomato or cream sauce.", "close"],
  ["pan-con-tomate", "pan-con-tomate", "attention", 1, "Rustic toasted bread covered with grated ripe tomato and olive-oil sheen.", "close"],
  ["fideua", "fideua", "attention", 1, "Mostly dry short fideua noodles in a wide plated serving with visible seafood and saffron-red tone.", "close"],
  ["cocido-madrileno", "cocido-madrileno", "attention", 1, "Cocido served in separated courses with broth apart from chickpeas, vegetables and meats; source shows a traditional two-vuelco service rather than all three separately.", "acceptable-with-traditional-service-variation"],
  ["fabada-asturiana", "fabada-asturiana", "attention", 1, "Large creamy white beans in a rustic earthenware bowl with chorizo, morcilla and cured pork pieces.", "close"],
  ["pulpo-a-la-gallega", "pulpo-a-la-gallega", "attention", 1, "Thick octopus coins on a simple plate with paprika, coarse salt and olive-oil sheen.", "close"],
  ["bacalao-al-pil-pil", "bacalao-al-pil-pil", "attention", 1, "Salt cod pieces in a glossy pale-golden pil-pil emulsion with no tomato or cream.", "close"],
  ["pisto-manchego", "pisto-manchego", "attention", 1, "Thick red-orange vegetable pisto with clearly visible diced vegetables and fried eggs, no rice side.", "close"],
  ["marmitako", "marmitako", "attention", 1, "Clean close-up of tuna chunks and potatoes in a red-golden Basque marmitako broth with no people or event setting.", "close"],
  ["calamares-a-la-romana", "calamares-a-la-romana", "attention", 1, "Distinct squid rings in a thin evenly golden batter served with lemon, without breadcrumb crust or sauce.", "close"],
  ["churros-con-chocolate", "churros-con-chocolate", "attention", 1, "Long ridged golden churros beside a small cup of thick dark Spanish drinking chocolate.", "close"],
  ["crema-catalana", "crema-catalana", "centre", 1, "Shallow terracotta crema catalana with a thin evenly burnt amber sugar crust.", "close"],
  ["tarta-de-santiago", "tarta-de-santiago", "centre", 1, "Low round almond cake dusted with icing sugar and a clear Cross of Saint James silhouette.", "close"],
  ["arroz-con-leche", "arroz-con-leche", "attention", 1, "Creamy rice pudding in terracotta with an even cinnamon dusting matching the revised traditional finish.", "close"]
];
await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });

if (selections.length !== 20 || new Set(selections.map(([id]) => id)).size !== 20) throw new Error("Expected 20 unique Spanish selections");

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
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-spanish-photo-manifest.mjs after an approved source changes.\nexport const spanishPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default spanishPhotoCandidates;\n`;
await writeFile(output, source, "utf8");

console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified Spanish photo records.`);

