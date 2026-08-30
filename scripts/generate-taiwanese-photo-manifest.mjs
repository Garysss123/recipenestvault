import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const approved = join(root, "assets", "recipes", "approved");
const output = join(root, "src", "taiwanese-photos.mjs");
await mkdir(approved, { recursive: true });

const selections = [
  ["taiwanese-beef-noodle-soup", "File:Taiwanese Beef Noodle Soup.jpg", "assets/recipes/alternatives/taiwanese/taiwanese-beef-noodle-soup.jpg", "attention"],
  ["lu-rou-fan", "File:Lurou fan(Taiwanese cuisine).jpg", "assets/recipes/alternatives/taiwanese/lu-rou-fan.jpg", "attention"],
  ["three-cup-chicken", "File:Sanbeiji.jpg", "assets/recipes/alternatives/taiwanese/three-cup-chicken.jpg", "attention"],
  ["oyster-omelette", "File:Oyster omelette by Adonis Chen in Tainan City.jpg", "assets/recipes/alternatives/taiwanese/oyster-omelette.jpg", "attention"],
  ["taiwanese-popcorn-chicken", "File:TWBC Taiwanese fried chicken 20070303.jpg", "assets/recipes/alternatives/taiwanese/taiwanese-popcorn-chicken.jpg", "attention"],
  ["gua-bao", "File:Gua-bao by the Yuan Fang Guabao at Huaxi Street 2023-04-28 01.jpg", "assets/recipes/alternatives/alt-gua-bao3.jpg", "east"],
  ["dan-bing", "File:Dan Bing (Taiwanese egg crepe).jpg", "assets/recipes/alternatives/taiwanese/dan-bing.jpg", "attention"],
  ["chiayi-turkey-rice", "File:Chiayi turkey pilaf.jpg", "assets/recipes/alternatives/taiwanese/chiayi-turkey-rice.jpg", "attention"],
  ["danzai-noodles", "File:Tan Tsai Noodle of Tu Hsiao Yue 2015.jpg", "assets/recipes/alternatives/alt-danzai2.jpg", "attention"],
  ["ba-wan", "File:Bawan umiao.jpg", "assets/recipes/alternatives/taiwanese/ba-wan.jpg", "attention"],
  ["pork-ball-rice-vermicelli-soup", "File:貢丸米粉湯.jpg", "assets/recipes/alternatives/taiwanese/pork-ball-rice-vermicelli-soup.jpg", "attention"],
  ["sesame-oil-chicken", "File:麻油雞.jpg", "assets/recipes/alternatives/taiwanese/sesame-oil-chicken.jpg", "attention"],
  ["taiwanese-tea-eggs", "File:TeaEggCloseup.JPG", "assets/recipes/alternatives/taiwanese/taiwanese-tea-eggs.jpg", "attention"],
  ["taiwanese-sausage", "File:Pine and Crane DTLA - taiwanese sausage.jpg", "assets/recipes/alternatives/alt-sausage4.jpg", "attention"],
  ["small-sausage-big-sausage", "File:Dachang Bao Xiaochang (大腸包小腸 Small Sausage in Big Sausage) (8446244651).jpg", "assets/recipes/alternatives/alt-big-small5.jpg", "east", 1.5],
  ["milkfish-congee", "File:臺南飲食 虱目魚鹹粥.jpg", "assets/recipes/alternatives/alt-milkfish.jpg", "attention"],
  ["pineapple-cakes", "File:Pineapple Pastry.JPG", "assets/recipes/alternatives/taiwanese/pineapple-cakes.jpg", "attention"],
  ["jiufen-taro-balls", "File:Taro Balls at Jiufen, New Taipei City, Sept 2011.jpg", "assets/recipes/alternatives/taiwanese/jiufen-taro-balls.jpg", "attention"],
  ["coffin-bread", "File:Coffin bread - Tainan, Taiwan (2017).jpg", "assets/recipes/alternatives/taiwanese/coffin-bread.jpg", "attention"],
  ["taiwanese-oil-rice", "File:Mushroom & Glutinous Oil Rice.jpg", "assets/recipes/alternatives/alt-oil-rice.jpg", "attention"],
  ["peanut-shaved-ice", "File:Close-up shot of Taiwanese shaved ice with peanuts at Yang-Ji on 30 August 2017.jpg", "assets/recipes/alternatives/taiwanese/peanut-shaved-ice.jpg", "attention"]
];

const headers = { "User-Agent": "RecipeNestVault/0.1 (approved Taiwanese photograph provenance)" };
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
for (const [id, commonsTitle, sourceRelative, cropPosition, cropZoom] of selections) {
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

  const sourcePath = join(root, sourceRelative);
  const sourceBuffer = await readFile(sourcePath);
  const sourceMetadata = await sharp(sourceBuffer).metadata();
  if ((sourceMetadata.width || 0) < 1200 || (sourceMetadata.height || 0) < 800) throw new Error(`${id}: local reviewed source is below 1200x800`);
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
    cropPosition,
    ...(cropZoom ? { cropZoom } : {})
  });
  await wait(700);
}

const source = `// Generated from visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-taiwanese-photo-manifest.mjs after an approved source changes.\nexport const taiwanesePhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default taiwanesePhotoCandidates;\n`;
await writeFile(output, source, "utf8");
console.log(`Wrote ${relative(root, output)} with ${photos.length} approved Taiwanese photo records.`);
