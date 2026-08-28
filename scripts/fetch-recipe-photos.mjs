import { access, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { recipePhotoCandidates } from "../src/recipe-photos.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "assets", "recipes", "real");
await mkdir(output, { recursive: true });

const api = new URL("https://commons.wikimedia.org/w/api.php");
api.search = new URLSearchParams({
  action: "query",
  format: "json",
  formatversion: "2",
  prop: "imageinfo",
  iiprop: "url|mime",
  iiurlwidth: "1800",
  titles: recipePhotoCandidates.map((photo) => photo.commonsTitle).join("|")
});

const headers = { "User-Agent": "RecipeNestVault/0.1 (licensed image provenance audit)" };
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
async function fetchWithRetry(url, attempts = 6) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const result = await fetch(url, { headers });
    if (result.ok) return result;
    if (result.status !== 429 || attempt === attempts) return result;
    const retryAfter = Number(result.headers.get("retry-after"));
    await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 3000);
  }
  throw new Error("Unreachable retry state");
}

const response = await fetch(api, { headers });
if (!response.ok) throw new Error(`Wikimedia API returned ${response.status}`);
const payload = await response.json();
const pagesByTitle = new Map(payload.query.pages.map((page) => [page.title, page]));

for (const photo of recipePhotoCandidates) {
  const target = join(output, `${photo.id}.jpg`);
  try {
    await access(target);
    console.log(`${photo.id}: already downloaded`);
    continue;
  } catch { /* Download missing candidate. */ }
  const page = pagesByTitle.get(photo.commonsTitle);
  const info = page?.imageinfo?.[0];
  if (!info) throw new Error(`No image information for ${photo.commonsTitle}`);
  const imageResponse = await fetchWithRetry(info.thumburl || info.url);
  if (!imageResponse.ok) throw new Error(`${photo.id}: image download returned ${imageResponse.status}`);
  await writeFile(target, Buffer.from(await imageResponse.arrayBuffer()));
  console.log(`${photo.id}: downloaded licensed real-photo candidate`);
  await wait(3000);
}
