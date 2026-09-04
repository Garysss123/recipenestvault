import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "assets", "recipes", "alternatives", "indian");
await mkdir(output, { recursive: true });

const allSelections = [
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
const requestedIds = new Set(process.argv.slice(2));
const selections = requestedIds.size ? allSelections.filter(([id]) => requestedIds.has(id)) : allSelections;
if (requestedIds.size && selections.length !== requestedIds.size) throw new Error("Unknown Indian photo id");

const headers = { "User-Agent": "RecipeNestVault/0.1 (Indian licensed-photo review)" };
const acceptedLicense = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
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

for (const [id, title] of selections) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.search = new URLSearchParams({ action: "query", format: "json", formatversion: "2", prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "2200", titles: title });
  const metadataResponse = await fetchWithRetry(api);
  const payload = await metadataResponse.json();
  const page = payload.query?.pages?.[0];
  const info = page?.imageinfo?.[0];
  const metadata = info?.extmetadata || {};
  const license = metadata.LicenseShortName?.value || "";
  const licenseUrl = metadata.LicenseUrl?.value?.replace(/^http:/, "https:") || "";
  if (!info || !acceptedLicense.test(license) || !licenseUrl) throw new Error(`${id}: missing accepted Commons metadata for ${title}`);
  const imageResponse = await fetchWithRetry(info.thumburl || info.url);
  const target = join(output, `${id}.jpg`);
  await writeFile(target, Buffer.from(await imageResponse.arrayBuffer()));
  const author = String(metadata.Artist?.value || "").replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
  console.log(JSON.stringify({ id, commonsTitle: page.title, author, license, width: info.width, height: info.height, candidateAsset: target }));
  await wait(1200);
}
