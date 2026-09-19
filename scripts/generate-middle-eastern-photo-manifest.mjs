import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, 'assets', 'recipes', 'alternatives', 'middle-eastern');
const approved = join(root, 'assets', 'recipes', 'approved');
const evidencePath = join(root, 'docs', 'research', 'middle-eastern-photo-evidence.json');
const output = join(root, 'src', 'middle-eastern-photos.mjs');
const selections = [
  ['hummus', 'File:Hummus from The Nile.jpg', 'attention', 1, 'Creamy chickpea hummus with a pale tahini surface is centered in a serving bowl.'],
  ['falafel', 'File:Falafel 1.JPG', 'attention', 1, 'Round browned chickpea falafel are the clear finished-dish subject.'],
  ['mujadara', 'File:Mujaddara.jpg', 'attention', 1, 'Levantine lentils and rice are shown topped with browned onions.'],
  ['tabbouleh', 'File:Traditional Tabbouleh.JPG', 'attention', 1, 'The parsley-forward tabbouleh salad with fine bulgur and tomato is clearly visible.'],
  ['fattoush', 'File:Fattoush 1.JPG', 'attention', 1, 'A finished chopped fattoush salad with fresh vegetables and crisp pita is the subject.'],
  ['chicken-shawarma', 'File:Chicken Shawarma.jpg', 'attention', 1, 'The finished chicken shawarma filling is shown with browned edges and warm spices.'],
  ['iraqi-lamb-kofta', 'File:Kafta shish kebab and grilled vegetables on salad - Cambridge, MA.jpg', 'attention', 1, 'Grilled kafta skewers and vegetables are served together as a finished plate.'],
  ['zaatar-manakish', 'File:Zaatar Mankousheh.jpg', 'attention', 1, 'Levantine zaatar manakish is shown as a baked flatbread with the herb-oil topping.'],
  ['shakshuka', 'File:Shakshuka 011.jpg', 'attention', 1, 'Eggs poached in red tomato-pepper sauce are visible in a finished shakshuka pan.'],
  ['fesenjan', 'File:Fesenjon 1.JPG', 'attention', 1, 'Persian fesenjan appears as a dark walnut-pomegranate chicken stew.'],
  ['mercimek-corbasi', 'File:Mercimek çorbası.jpg', 'attention', 1, 'Smooth Turkish red lentil soup is served in a bowl with its characteristic orange color.'],
  ['koshari', 'File:Egyptian Koshari.jpg', 'attention', 1, 'Egyptian koshari shows its rice, lentils, chickpeas, pasta and tomato topping.'],
  ['baklava', 'File:Fıstıklı Baklava.jpg', 'attention', 1, 'Pistachio baklava is cut into syrup-glossed pastry diamonds with green nut garnish.']
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
    reviewedAt: '2026-09-19',
    reviewNote,
    matchAssessment: 'close'
  });
}
if (new Set(evidence.map((entry) => entry.commonsTitle)).size !== evidence.length || new Set(evidence.map((entry) => entry.sourceAssetSha256)).size !== evidence.length) throw new Error('A Middle Eastern photo source or identical image is reused');
await writeFile(evidencePath, JSON.stringify(evidence, null, 2) + '\n', 'utf8');
const photos = evidence.map(({ originalWidth, originalHeight, sourceWidth, sourceHeight, matchAssessment, ...photo }) => ({ ...photo, relation: 'dish-reference', commercialUseVerified: true, realPhoto: true, visualMatchApproved: true }));
await writeFile(output, `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-middle-eastern-photo-manifest.mjs after an approved source changes.\nexport const middleEasternPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default middleEasternPhotoCandidates;\n`, 'utf8');
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} licensed Middle Eastern photograph records.`);
