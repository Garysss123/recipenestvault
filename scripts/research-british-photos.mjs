import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dir = join(root, 'assets/recipes/alternatives/british');
await mkdir(dir, { recursive: true });

const [command, id, ...words] = process.argv.slice(2);
const headers = { 'User-Agent': 'RecipeNestVault/0.1 (British licensed photo research; recipenestvault.com)' };
const api = new URL('https://commons.wikimedia.org/w/api.php');
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function get(url) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(45000) });
    if (response.ok) return response;
    if (response.status !== 429 || attempt === 4) throw new Error(`HTTP ${response.status}: ${url}`);
    const retryAfter = Number(response.headers.get('retry-after')) || (3 * (attempt + 1));
    await sleep(retryAfter * 1000);
  }
}

if (command === 'search') {
  api.search = new URLSearchParams({
    action: 'query', format: 'json', formatversion: '2', generator: 'search',
    gsrsearch: words.join(' '), gsrnamespace: '6', gsrlimit: '20', prop: 'imageinfo',
    iiprop: 'url|size|extmetadata'
  });
  const data = await (await get(api)).json();
  const candidates = (data.query?.pages || [])
    .map((page) => ({ title: page.title, ...page.imageinfo?.[0] }))
    .filter((page) => page.width >= 1200 && page.height >= 800 && accepted.test(page.extmetadata?.LicenseShortName?.value || ''));
  await writeFile(join(dir, `${id}-candidates.json`), JSON.stringify(candidates, null, 2));
  console.log(JSON.stringify(candidates.map((page) => [page.title, page.width, page.height, page.extmetadata.LicenseShortName.value])));
} else if (command === 'download') {
  const title = words.join(' ');
  api.search = new URLSearchParams({ action: 'query', format: 'json', formatversion: '2', prop: 'imageinfo', iiprop: 'url|size|extmetadata', titles: title });
  let page;
  let info;
  try {
    const candidate = JSON.parse(await readFile(join(dir, `${id}-selected.json`), 'utf8'));
    if (candidate.title === title) { page = candidate; info = candidate; }
  } catch {}
  try {
    if (!info) {
      const candidates = JSON.parse(await readFile(join(dir, `${id}-candidates.json`), 'utf8'));
      const candidate = candidates.find((entry) => entry.title === title);
      if (candidate) { page = candidate; info = candidate; }
    }
  } catch {}
  if (!info) {
    const data = await (await get(api)).json();
    page = data.query?.pages?.[0];
    info = page?.imageinfo?.[0];
  }
  if (!info || !accepted.test(info.extmetadata?.LicenseShortName?.value || '') || info.width < 1200 || info.height < 800) throw new Error('Invalid source');
  await writeFile(join(dir, `${id}-selected.json`), JSON.stringify({ title: page.title, ...info }, null, 2));
  const sourceUrl = new URL(info.url);
  sourceUrl.search = '';
  if (info.width > 1280) {
    const thumbWidth = info.width > 1920 ? 1920 : 1280;
    const projectedHeight = Math.floor((info.height * thumbWidth) / info.width);
    const file = sourceUrl.pathname.split('/').pop();
    if (thumbWidth < info.width && projectedHeight >= 800) {
      sourceUrl.host = 'thumb.wikimedia.org';
      sourceUrl.pathname = sourceUrl.pathname.replace('/commons/', '/commons/thumb/') + `/${thumbWidth}px-${file}`;
    }
  }
  const buffer = Buffer.from(await (await get(sourceUrl)).arrayBuffer());
  await writeFile(join(dir, `${id}.jpg`), buffer);
  console.log(`${id}: ${page.title}, ${info.width} x ${info.height}, ${buffer.length} bytes`);
} else {
  throw new Error('Usage: research-british-photos.mjs search|download id query|File:title');
}
