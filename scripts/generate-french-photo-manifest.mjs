import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, "assets", "recipes", "alternatives", "french");
const approved = join(root, "assets", "recipes", "approved");
const evidencePath = join(root, "docs", "research", "french-photo-evidence.json");
const output = join(root, "src", "french-photos.mjs");
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
  ["french-onion-soup", "french-onion-soup", "centre", 1, "White ovenproof crock under a continuous browned cheese cap with parsley; the toast is covered by the cheese as expected."],
  ["ratatouille", "ratatouille", "attention", 1, "Distinct cooked eggplant, zucchini, red/yellow pepper and tomato pieces with herbs and olive-oil sheen; no layered gratin or cheese."],
  ["gratin-dauphinois", "gratin-dauphinois", "attention", 1, "Creamy baked potato slices in a white oval dish with a browned dairy crust and parsley; no meat garnish."],
  ["boeuf-bourguignon", "boeuf-bourguignon", "attention", 1, "Large beef pieces with mushrooms, carrot and onions in brown-red sauce, with plain boiled potatoes and parsley alongside."],
  ["coq-au-vin", "coq-au-vin", "attention", 1, "Dark wine-braised chicken with bacon, mushrooms and parsley over pale mashed potato; no cream sauce, sausage or rice."],
  ["blanquette-de-veau", "blanquette-de-veau-alt9", "centre", 1, "Veal with carrot and mushrooms in a smooth pale sauce over rice with black pepper; selected instead of the grainier candidate."],
  ["poulet-basquaise", "poulet-basquaise", "attention", 1, "Chicken portions in red tomato sauce with chunky red/green peppers and softened onion; no cream or sausage."],
  ["quiche-lorraine", "quiche-lorraine", "centre", 1, "Round quiche with golden crust, pale set custard and short bacon strips; no vegetables or lattice topping."],
  ["croque-monsieur", "croque-monsieur", "centre", 1, "Two toasted white-bread slices with folded ham and cheese under a melted cheese/béchamel top; no egg, lettuce or tomato."],
  ["sole-meuniere", "sole-meuniere", "attention", 1, "Whole flatfish with tail intact, lightly browned crust, lemon, parsley and green beans; no rolled fillets or shrimp."],
  ["moules-marinieres", "moules-marinieres", "attention", 1, "Open black mussels with orange flesh in pale white-wine cooking juices and green herb flecks; no cream, fries or prominent tomato."],
  ["salade-nicoise", "salade-nicoise", "attention", 1, "Tuna, anchovy, hard-boiled egg, artichoke, black olives, onion rings and vegetables over lettuce; no rare tuna steak."],
  ["salade-lyonnaise", "salade-lyonnaise", "attention", 1, "Mixed lettuce with crisp bacon, croutons and an intact poached egg; no chicken liver or cheese."],
  ["french-crepes", "french-crepes", "centre", 1, "Plain stack of thin golden wheat crêpes without cream, fruit, chocolate or savoury filling."],
  ["creme-brulee", "creme-brulee", "centre", 1, "Single white ramekin with pale custard beneath a thin amber brûléed crust and a small spoon; no berry or cream garnish."],
  ["tarte-tatin", "tarte-tatin", "centre", 1, "Round upside-down tart with tightly packed glossy amber apple halves; no lattice, raw slices or whipped cream."],
  ["madeleines", "madeleines", "centre", 1, "Plain golden shell-shaped madeleines with crisp ridges and rounded humps; no glaze, chocolate or powdered sugar."],
  ["clafoutis", "clafoutis", "attention", 1, "Cherry clafoutis with dark cherries embedded in a lightly browned custard and a clean wedge cut; no pastry crust or frosting."],
  ["chocolate-mousse", "chocolate-mousse", "attention", 1, "Pure dark airy chocolate mousse with a matte surface and spooned texture; serving vessel is a white bowl rather than the preferred clear glasses."],
  ["gougeres", "gougeres", "attention", 1, "Plain deeply golden cheese puffs with irregular crisp tops; one puff is split enough to show the light hollow interior, with no filling or glaze."],
  ["financiers", "financiers", "attention", 1, "Plain rectangular financiers with golden tops, darker crisp edges and a cut piece exposing moist fine crumb; fewer pieces than the ideal eight-piece composition."],
];

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });

if (selections.length !== 21 || new Set(selections.map(([id]) => id)).size !== 21) throw new Error("Expected 21 unique French selections");

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
    reviewedAt: "2026-09-13",
    reviewNote,
    matchAssessment: id === "chocolate-mousse" ? "acceptable-with-minor-vessel-mismatch" : id === "financiers" ? "acceptable-with-minor-count-mismatch" : "close"
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
const source = `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-french-photo-manifest.mjs after an approved source changes.\nexport const frenchPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default frenchPhotoCandidates;\n`;
await writeFile(output, source, "utf8");

console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified French photo records.`);
