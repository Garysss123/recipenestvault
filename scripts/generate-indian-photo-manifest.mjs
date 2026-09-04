import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const approved = join(root, "assets", "recipes", "approved");
const output = join(root, "src", "indian-photos.mjs");
await mkdir(approved, { recursive: true });

const selections = [
  ["butter-chicken", "File:Chicken makhani.jpg"],
  ["palak-paneer", "File:Palak Paneer (Cottage cheese in spinach gravy).jpg"],
  ["chana-masala", "File:Chana masala (5727362126).jpg"],
  ["dal-tadka", "File:Dal Tadka.jpg"],
  ["rajma-masala", "File:Rajma, kidney beans, served with chawal, rice.jpg"],
  ["aloo-gobi", "File:Gobi-aloo ki sabji by me, location - my kitchen, meerut, state - Uttar Pradesh, 0002.jpg"],
  ["baingan-bharta", "File:Baigan ka Bharta.jpg"],
  ["hyderabadi-chicken-biryani", "File:Hyderabadi Chicken Biryani.jpg"],
  ["masala-dosa", "File:Masala dosa.jpg"],
  ["idli-sambar", "File:Idli, sambar and coconut chutney.jpg"],
  ["vada-pav", "File:Vada Pav-Indian street food.JPG"],
  ["pav-bhaji", "File:Pav Bhaji at Home.JPG"],
  ["pani-puri", "File:Indian cuisine-Panipuri-03.jpg"],
  ["samosa", "File:Samosa (partially open).jpg"],
  ["vegetable-pakora", "File:Pakoras in Jaipur.jpg"],
  ["tandoori-chicken", "File:Tandoori Chicken 1.JPG"],
  ["rogan-josh", "File:Mutton rogan josh.jpg"],
  ["goan-fish-curry", "File:Goan Fish Curry.jpg"],
  ["butter-naan", "File:ButterNaan.JPG"],
  ["gulab-jamun", "File:Gulab Jamun served Hot.jpg"],
  ["rice-kheer", "File:Kheer.jpg"]
];

const headers = { "User-Agent": "RecipeNestVault/0.1 (approved Indian photograph provenance)" };
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, attempts = 8) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, { headers });
    if (response.ok) return response;
    if (response.status !== 429 || attempt === attempts) throw new Error(`${url}: HTTP ${response.status}`);
    const retryAfter = Number(response.headers.get("retry-after"));
    await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 3000);
  }
}

const photos = [];
for (const [id, commonsTitle] of selections) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.search = new URLSearchParams({ action: "query", format: "json", formatversion: "2", prop: "imageinfo", iiprop: "url|size|extmetadata", titles: commonsTitle });
  const response = await fetchWithRetry(api);
  const payload = await response.json();
  const page = payload.query?.pages?.[0];
  const info = page?.imageinfo?.[0];
  const ext = info?.extmetadata || {};
  const license = ext.LicenseShortName?.value || "";
  const licenseUrl = ext.LicenseUrl?.value?.replace(/^http:/, "https:") || "";
  if (!info || !accepted.test(license) || !licenseUrl) throw new Error(`${id}: unacceptable or incomplete Commons license for ${commonsTitle}`);

  const sourcePath = join(root, "assets", "recipes", "alternatives", "indian", `${id}.jpg`);
  const sourceBuffer = await readFile(sourcePath);
  const sourceMetadata = await sharp(sourceBuffer).metadata();
  if ((sourceMetadata.width || 0) < 1200 || (sourceMetadata.height || 0) < 800) throw new Error(`${id}: reviewed source is below 1200x800`);
  const sourceAsset = `${id}.jpg`;
  await copyFile(sourcePath, join(approved, sourceAsset));
  const originalFile = new URL(info.url.replace(/^http:/, "https:"));
  for (const key of [...originalFile.searchParams.keys()]) if (key.startsWith("utm_")) originalFile.searchParams.delete(key);
  const author = String(ext.Artist?.value || "Unknown").replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
  photos.push({
    id,
    commonsTitle: page.title,
    title: ext.ObjectName?.value || page.title.replace(/^File:/, ""),
    author,
    sourcePage: info.descriptionurl.replace(/^http:/, "https:"),
    originalFile: originalFile.toString(),
    license: license === "CC0" ? "CC0 1.0" : license,
    licenseUrl,
    relation: "dish-reference",
    commercialUseVerified: true,
    realPhoto: true,
    visualMatchApproved: true,
    sourceAsset,
    sourceAssetSha256: createHash("sha256").update(sourceBuffer).digest("hex"),
    cropPosition: "attention"
  });
  await wait(700);
}

const source = `// Generated from visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-indian-photo-manifest.mjs after an approved source changes.\nexport const indianPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default indianPhotoCandidates;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} with ${photos.length} approved Indian photo records.`);
