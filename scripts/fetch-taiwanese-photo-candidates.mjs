import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, "assets", "recipes", "alternatives", "taiwanese");
await mkdir(output, { recursive: true });

const allSelections = [
  ["taiwanese-beef-noodle-soup", "File:Taiwanese Beef Noodle Soup.jpg"],
  ["lu-rou-fan", "File:Lurou fan(Taiwanese cuisine).jpg"],
  ["three-cup-chicken", "File:Sanbeiji.jpg"],
  ["oyster-omelette", "File:Oyster omelette by Adonis Chen in Tainan City.jpg"],
  ["taiwanese-popcorn-chicken", "File:TWBC Taiwanese fried chicken 20070303.jpg"],
  ["gua-bao", "File:Gua Bao VLC - 1.jpeg"],
  ["dan-bing", "File:Dan Bing (Taiwanese egg crepe).jpg"],
  ["chiayi-turkey-rice", "File:Chiayi turkey pilaf.jpg"],
  ["danzai-noodles", "File:Tan-tsu mien by udono in Ginza, Tokyo.jpg"],
  ["ba-wan", "File:Bawan umiao.jpg"],
  ["pork-ball-rice-vermicelli-soup", "File:貢丸米粉湯.jpg"],
  ["sesame-oil-chicken", "File:麻油雞.jpg"],
  ["taiwanese-tea-eggs", "File:TeaEggCloseup.JPG"],
  ["taiwanese-sausage", "File:香腸.jpg"],
  ["small-sausage-big-sausage", "File:Small sausage in large sausage 2004-09-05.jpg"],
  ["milkfish-congee", "File:Milkfish Congee 虱目魚粥.jpg"],
  ["pineapple-cakes", "File:Pineapple Pastry.JPG"],
  ["jiufen-taro-balls", "File:Taro Balls at Jiufen, New Taipei City, Sept 2011.jpg"],
  ["coffin-bread", "File:Coffin bread - Tainan, Taiwan (2017).jpg"],
  ["taiwanese-oil-rice", "File:Pork & Squid Oily Rice (Taiwan).jpg"],
  ["peanut-shaved-ice", "File:Close-up shot of Taiwanese shaved ice with peanuts at Yang-Ji on 30 August 2017.jpg"]
];
const requestedIds = new Set(process.argv.slice(2));
const selections = requestedIds.size
  ? allSelections.filter(([id]) => requestedIds.has(id))
  : allSelections;
if (requestedIds.size && selections.length !== requestedIds.size) {
  throw new Error(`Unknown Taiwanese photo id: ${[...requestedIds].filter((id) => !allSelections.some(([known]) => known === id)).join(", ")}`);
}

const headers = { "User-Agent": "RecipeNestVault/0.1 (Taiwanese licensed-photo review)" };
const acceptedLicense = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url, attempts = 8) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const response = await fetch(url, { headers });
    if (response.ok) return response;
    if (response.status !== 429 || attempt === attempts) throw new Error(`${url}: HTTP ${response.status}`);
    const retryAfter = Number(response.headers.get("retry-after"));
    await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 3500);
  }
}

for (const [id, title] of selections) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.search = new URLSearchParams({
    action: "query", format: "json", formatversion: "2", prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata", iiurlwidth: "2200", titles: title
  });
  const metadataResponse = await fetchWithRetry(api);
  const payload = await metadataResponse.json();
  const page = payload.query?.pages?.[0];
  const info = page?.imageinfo?.[0];
  const metadata = info?.extmetadata || {};
  const license = metadata.LicenseShortName?.value || "";
  const licenseUrl = metadata.LicenseUrl?.value?.replace(/^http:/, "https:") || "";
  if (!info || !acceptedLicense.test(license) || !licenseUrl) throw new Error(`${id}: missing accepted Commons metadata for ${title}`);
  const imageResponse = await fetchWithRetry(info.thumburl || info.url);
  const extension = info.mime === "image/png" ? "png" : "jpg";
  const target = join(output, `${id}.${extension}`);
  await writeFile(target, Buffer.from(await imageResponse.arrayBuffer()));
  const author = String(metadata.Artist?.value || "").replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
  const originalFile = new URL(info.url.replace(/^http:/, "https:"));
  for (const key of [...originalFile.searchParams.keys()]) if (key.startsWith("utm_")) originalFile.searchParams.delete(key);
  console.log(JSON.stringify({ id, commonsTitle: page.title, title: metadata.ObjectName?.value || page.title.replace(/^File:/, ""), author, sourcePage: info.descriptionurl.replace(/^http:/, "https:"), originalFile: originalFile.toString(), license, licenseUrl, width: info.width, height: info.height, candidateAsset: target }));
  await wait(1400);
}
