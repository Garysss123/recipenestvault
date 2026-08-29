import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [id, commonsTitle] = process.argv.slice(2);
if (!id || !commonsTitle || !/^[-a-z0-9]+$/.test(id) || !commonsTitle.startsWith("File:")) {
  throw new Error("Usage: node scripts/fetch-commons-image.mjs <safe-id> <File:Commons title>");
}

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "assets", "recipes", "alternatives");
await mkdir(output, { recursive: true });
const headers = { "User-Agent": "RecipeNestVault/0.1 (licensed image provenance audit)" };
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
async function fetchWithRetry(url, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, { headers });
    if (response.ok || response.status !== 429 || attempt === attempts) return response;
    const retryAfter = Number(response.headers.get("retry-after"));
    await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 3000);
  }
  throw new Error("Unreachable retry state");
}

const api = new URL("https://commons.wikimedia.org/w/api.php");
api.search = new URLSearchParams({ action: "query", format: "json", formatversion: "2", prop: "imageinfo", iiprop: "url|mime", iiurlwidth: "1800", titles: commonsTitle });
const metadataResponse = await fetchWithRetry(api);
if (!metadataResponse.ok) throw new Error(`Wikimedia API returned ${metadataResponse.status}`);
const metadata = await metadataResponse.json();
const info = metadata.query.pages[0]?.imageinfo?.[0];
if (!info) throw new Error(`No image information for ${commonsTitle}`);

let imageResponse = await fetchWithRetry(info.thumburl || info.url);
if (!imageResponse?.ok && info.thumburl && info.url) {
  imageResponse = await fetchWithRetry(info.url);
}
if (!imageResponse?.ok) throw new Error(`Image download returned ${imageResponse?.status}`);
const target = join(output, `${id}.jpg`);
await writeFile(target, Buffer.from(await imageResponse.arrayBuffer()));
console.log(target);
