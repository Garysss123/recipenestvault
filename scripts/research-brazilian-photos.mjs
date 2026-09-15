import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const directory = join(root, 'assets', 'recipes', 'alternatives', 'brazilian');
await mkdir(directory, { recursive: true });

const [command, id, ...words] = process.argv.slice(2);
const headers = { 'User-Agent': 'RecipeNestVault/0.1 (Brazilian licensed photo research; recipenestvault.com)' };
const api = new URL('https://commons.wikimedia.org/w/api.php');
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function get(url) {
  for (let attempt = 0; attempt < 7; attempt += 1) {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(45000) });
    if (response.ok) return response;
    if (response.status !== 429 && response.status !== 503) throw new Error(`HTTP ${response.status}: ${url}`);
    const retryAfter = Number(response.headers.get('retry-after')) || (4 * (attempt + 1));
    await sleep(retryAfter * 1000);
  }
  throw new Error(`API did not recover: ${url}`);
}

const clean = (value = '') => String(value)
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&[^;]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

if (command === 'search') {
  if (!id || words.length === 0 || !/^[-a-z0-9]+$/.test(id)) throw new Error('Usage: research-brazilian-photos.mjs search <id> <query>');
  api.search = new URLSearchParams({
    action: 'query', format: 'json', formatversion: '2', generator: 'search',
    gsrsearch: words.join(' '), gsrnamespace: '6', gsrlimit: '20', prop: 'imageinfo',
    iiprop: 'url|size|extmetadata'
  });
  const data = await (await get(api)).json();
  const candidates = (data.query?.pages || [])
    .map((page) => {
      const info = page.imageinfo?.[0] || {};
      const metadata = info.extmetadata || {};
      return {
        title: page.title,
        width: info.width || 0,
        height: info.height || 0,
        author: clean(metadata.Artist?.value),
        license: clean(metadata.LicenseShortName?.value),
        sourcePage: info.descriptionurl || '',
        originalFile: info.url || '',
        licenseUrl: clean(metadata.LicenseUrl?.value)
      };
    })
    .filter((candidate) => candidate.width >= 1200 && candidate.height >= 800 && accepted.test(candidate.license) && candidate.originalFile && candidate.licenseUrl);
  await writeFile(join(directory, `${id}-candidates.json`), JSON.stringify(candidates, null, 2) + '\n', 'utf8');
  console.log(JSON.stringify(candidates.map(({ title, width, height, author, license }) => ({ title, width, height, author, license })), null, 2));
} else if (command === 'download') {
  if (!id || words.length === 0 || !/^[-a-z0-9]+$/.test(id)) throw new Error('Usage: research-brazilian-photos.mjs download <id> <File:title>');
  const title = words.join(' ');
  let candidate;
  try {
    const candidates = JSON.parse(await readFile(join(directory, `${id}-candidates.json`), 'utf8'));
    candidate = candidates.find((entry) => entry.title === title);
  } catch {}
  let page;
  let info;
  let metadata;
  if (candidate) {
    page = candidate;
    info = { url: candidate.originalFile, width: candidate.width, height: candidate.height };
    metadata = {
      Artist: { value: candidate.author },
      LicenseShortName: { value: candidate.license },
      LicenseUrl: { value: candidate.licenseUrl }
    };
  } else {
    api.search = new URLSearchParams({ action: 'query', format: 'json', formatversion: '2', prop: 'imageinfo', iiprop: 'url|size|extmetadata', titles: title });
    const data = await (await get(api)).json();
    page = data.query?.pages?.[0];
    info = page?.imageinfo?.[0];
    metadata = info?.extmetadata || {};
  }
  if (!info || !accepted.test(clean(metadata.LicenseShortName?.value)) || info.width < 1200 || info.height < 800) throw new Error(`${id}: invalid or undersized source`);
  const sourceUrl = new URL(info.url);
  sourceUrl.search = '';
  let imageUrl = sourceUrl;
  if (info.width > 1280) {
    const thumbWidth = info.width > 1920 ? 1920 : 1280;
    const projectedHeight = Math.floor((info.height * thumbWidth) / info.width);
    const file = sourceUrl.pathname.split('/').at(-1);
    if (file && projectedHeight >= 800) {
      imageUrl = new URL(sourceUrl);
      imageUrl.host = 'thumb.wikimedia.org';
      imageUrl.pathname = imageUrl.pathname.replace('/commons/', '/commons/thumb/') + `/${thumbWidth}px-${file}`;
    }
  }
  const image = await (await get(imageUrl)).arrayBuffer();
  await writeFile(join(directory, `${id}.jpg`), Buffer.from(image));
  await writeFile(join(directory, `${id}-selected.json`), JSON.stringify({
    title: page.title,
    url: info.url,
    descriptionurl: info.descriptionurl,
    width: info.width,
    height: info.height,
    extmetadata: metadata
  }, null, 2) + '\n', 'utf8');
  console.log(`${id}: ${page.title}, ${info.width} x ${info.height}, ${image.byteLength} bytes`);
} else {
  throw new Error('Usage: research-brazilian-photos.mjs search|download <id> <query or File:title>');
}
