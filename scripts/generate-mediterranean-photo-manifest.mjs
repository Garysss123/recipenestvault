import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, 'assets', 'recipes', 'alternatives', 'mediterranean');
const approved = join(root, 'assets', 'recipes', 'approved');
const evidencePath = join(root, 'docs', 'research', 'mediterranean-photo-evidence.json');
const output = join(root, 'src', 'mediterranean-photos.mjs');
const selections = [
  ['bouillabaisse', 'File:Bouillabaisse, provansalska riblja juha.jpg', 'attention', 1, 'A serving of Provençal fish stew with fish and seafood in saffron-tomato broth.'],
  ['pissaladiere', 'File:Pissaladière 01.jpg', 'attention', 1, 'A finished Niçoise pissaladière topped with slowly cooked onions, anchovies and olives.'],
  ['caponata', 'File:Caponata (23791306323).jpg', 'attention', 1, 'Sicilian sweet-sour eggplant caponata is the clear subject.'],
  ['pasta-con-le-sarde', 'File:Pasta con le sarde.jpg', 'attention', 1, 'Sicilian pasta with sardines and fennel is served as a finished dish.'],
  ['brik-a-loeuf', 'File:Fried brik.jpg', 'attention', 1, 'A freshly fried Tunisian brik with crisp folded pastry is shown as the finished dish.'],
  ['lablabi', 'File:Lablabi.jpg', 'attention', 1, 'A bowl of Tunisian chickpea stew ready to eat in a restaurant in Tunis.'],
  ['harira', 'File:Harira..JPG', 'attention', 1, 'A bowl of Moroccan harira with chickpeas, lentils and herbs.'],
  ['zaalouk', 'File:Zaalouk 01.jpg', 'attention', 1, 'Moroccan zaalouk, a cooked eggplant and tomato salad, served as a finished dish.'],
  ['imam-bayildi', 'File:A plate of imambayildi.jpg', 'attention', 1, 'Turkish imam bayildi eggplants are presented on a serving plate.'],
  ['gozleme', 'File:Gozleme at Manning Market.jpg', 'attention', 1, 'Folded Turkish gozleme pieces with browned griddle marks and visible green filling are plated as the finished dish.'],
  ['halloumi-saganaki', 'File:Grilled Halloumi.jpg', 'attention', 1, 'Grilled halloumi cheese with a browned surface, suitable as a pan-seared halloumi reference.'],
  ['crni-rizot', 'File:Crni Rizoto - Pizzeria Desetka (14848569142).jpg', 'attention', 1, 'Croatian black risotto with cuttlefish ink and seafood.'],
  ['stuffat-tal-fenek', 'File:The national dish of Malta – Stuffat tal-Fenek (rabbit stew).jpg', 'attention', 1, 'Maltese rabbit stew is shown as a finished tomato-based braise.']
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
if (new Set(evidence.map((entry) => entry.commonsTitle)).size !== evidence.length || new Set(evidence.map((entry) => entry.sourceAssetSha256)).size !== evidence.length) throw new Error('A Mediterranean photo source or identical image is reused');
await writeFile(evidencePath, JSON.stringify(evidence, null, 2) + '\n', 'utf8');
const photos = evidence.map(({ originalWidth, originalHeight, sourceWidth, sourceHeight, matchAssessment, ...photo }) => ({ ...photo, relation: 'dish-reference', commercialUseVerified: true, realPhoto: true, visualMatchApproved: true }));
await writeFile(output, `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-mediterranean-photo-manifest.mjs after an approved source changes.\nexport const mediterraneanPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default mediterraneanPhotoCandidates;\n`, 'utf8');
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} licensed Mediterranean photograph records.`);
