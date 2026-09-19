import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, 'assets', 'recipes', 'alternatives', 'african');
const approved = join(root, 'assets', 'recipes', 'approved');
const evidencePath = join(root, 'docs', 'research', 'african-photo-evidence.json');
const output = join(root, 'src', 'african-photos.mjs');
const selections = [
  ['nigerian-jollof-rice', 'File:A plate of jollof rice and chicken.jpg', 'attention', 1, 'A finished serving of Nigerian jollof rice with a chicken accompaniment.'],
  ['thieboudienne', 'File:Senegalese Thieboudienne.JPG', 'attention', 1, 'A Senegalese fish-and-rice platter with vegetables, matching ceebu jën.'],
  ['nigerian-egusi-soup', 'File:EGUSI SOUP AND POUNDED YAM.JPG', 'attention', 1, 'Nigerian egusi soup with its pounded-yam accompaniment is clearly shown.'],
  ['kelewele', 'File:Kelewele, a Ghanaian snack.jpg', 'attention', 1, 'Ghanaian spiced fried plantain chunks are the clearly identifiable finished snack.'],
  ['maafe', 'File:Maafé.jpg', 'attention', 1, 'A finished Senegalese peanut stew, with vegetables and thick groundnut sauce visible.'],
  ['doro-wat', 'File:Ethiopian wat.jpg', 'attention', 1, 'Ethiopian wat with red berbere sauce, traditionally including doro wat variations.'],
  ['shiro-wat', 'File:Ethiopian \'Shiro\'.JPG', 'attention', 1, 'Ethiopian shiro chickpea stew served as a finished dish.'],
  ['injera', 'File:Injera, Ethiopian bread made from teff a cereal native to Ethiopia.JPG', 'attention', 1, 'A finished Ethiopian teff injera flatbread with its porous surface.'],
  ['nyama-choma', 'File:Nyama choma barbeque.jpg', 'attention', 1, 'Kenyan charcoal-grilled nyama choma meat served as the finished dish.'],
  ['tanzanian-pilau', 'File:African Food - Pilau.JPG', 'attention', 1, 'A finished plated serving of pilau rice with Swahili-coast spice coloring.'],
  ['bobotie', 'File:Bobootie 2.JPG', 'attention', 1, 'South African bobotie with its distinctive browned egg-and-milk topping.'],
  ['bunny-chow', 'File:Durban\'s Famous Mutton Bunny Chow.jpg', 'attention', 1, 'Durban mutton curry served inside a hollow bread loaf as bunny chow.'],
  ['malva-pudding', 'File:Malva pudding with sauce.jpg', 'attention', 1, 'South African malva pudding shown with its soaking cream sauce.']
];
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const clean = (value = '') => String(value).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
const candidateFor = async (id, title) => {
  const files = (await readdir(research)).filter((file) => file.endsWith('-candidates.json'));
  const entries = (await Promise.all(files.map(async (file) => JSON.parse(await readFile(join(research, file), 'utf8'))))).flat();
  const candidate = entries.find((entry) => entry.title === title);
  if (!candidate) throw new Error(`${id}: selected title is missing from the reviewed Commons candidate records`);
  return candidate;
};

await mkdir(approved, { recursive: true });
await mkdir(dirname(evidencePath), { recursive: true });
const evidence = [];
for (const [id, title, cropPosition, cropZoom, reviewNote] of selections) {
  const candidate = await candidateFor(id, title);
  const sourcePath = join(research, `${id}.jpg`);
  const data = await readFile(sourcePath);
  const metadata = await sharp(data).rotate().metadata();
  if (!accepted.test(candidate.license) || !candidate.author || !candidate.licenseUrl || !candidate.sourcePage || !candidate.originalFile) throw new Error(`${id}: incomplete commercial-use provenance`);
  if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 800) throw new Error(`${id}: source image is below 1200x800`);
  const sourceAsset = `${id}.jpg`;
  await copyFile(sourcePath, join(approved, sourceAsset));
  evidence.push({
    id,
    commonsTitle: title,
    title: title.replace(/^File:/, ''),
    author: candidate.author,
    sourcePage: candidate.sourcePage,
    originalFile: candidate.originalFile,
    license: candidate.license,
    licenseUrl: candidate.licenseUrl.replace(/^http:/i, 'https:'),
    originalWidth: candidate.width,
    originalHeight: candidate.height,
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    sourceAsset,
    sourceAssetSha256: hash(data),
    cropPosition,
    cropZoom,
    reviewedAt: '2026-09-20',
    reviewNote,
    matchAssessment: 'close'
  });
}
if (new Set(evidence.map((entry) => entry.commonsTitle)).size !== evidence.length || new Set(evidence.map((entry) => entry.sourceAssetSha256)).size !== evidence.length) throw new Error('A African photo source or identical image is reused');
await writeFile(evidencePath, JSON.stringify(evidence, null, 2) + '\n', 'utf8');
const photos = evidence.map(({ originalWidth, originalHeight, sourceWidth, sourceHeight, matchAssessment, ...photo }) => ({ ...photo, relation: 'dish-reference', commercialUseVerified: true, realPhoto: true, visualMatchApproved: true }));
await writeFile(output, `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-african-photo-manifest.mjs after an approved source changes.\nexport const africanPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default africanPhotoCandidates;\n`, 'utf8');
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} licensed African photograph records.`);
