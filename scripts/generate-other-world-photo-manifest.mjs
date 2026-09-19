import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, 'assets', 'recipes', 'alternatives', 'other-world');
const approved = join(root, 'assets', 'recipes', 'approved');
const evidencePath = join(root, 'docs', 'research', 'other-world-photo-evidence.json');
const output = join(root, 'src', 'other-world-photos.mjs');
const selections = [
  ['filipino-chicken-adobo', 'File:Adobong manok 01.jpg', 'attention', 1, 'Chicken pieces are visibly braised in dark soy-vinegar sauce with aromatics.'],
  ['pancit-bihon', 'File:Pancit bihon (Filipino rice noodles).jpg', 'attention', 1, 'A finished plate of fine Filipino bihon rice noodles with vegetables and mixed toppings.'],
  ['indonesian-beef-rendang', 'File:Beef Rendang..JPG', 'attention', 1, 'Dark, reduced Indonesian beef rendang with distinct meat pieces and spice-rich coconut coating.'],
  ['nasi-goreng', 'File:Nasi Goreng Ayam in Bali.jpg', 'attention', 1, 'Indonesian fried rice with a fried egg and accompaniments, matching nasi goreng.'],
  ['nasi-lemak', 'File:Nasi lemak on banana leaf.jpg', 'attention', 1, 'Malaysian coconut rice and its familiar sambal, protein and fresh-side arrangement on banana leaf.'],
  ['singapore-chilli-crab', 'File:Chilli crab-01.jpg', 'attention', 1, 'Singapore chilli crab served with vivid tomato-chilli sauce and visible crab pieces.'],
  ['cambodian-fish-amok', 'File:Fish Amok with Rice.jpg', 'attention', 1, 'Cambodian fish amok with coconut custard served with rice, matching the steamed fish preparation.'],
  ['lao-chicken-larb', 'File:Day 224- Chicken Larb (7947748382).jpg', 'attention', 1, 'Minced chicken larb with fresh herbs and toasted-rice texture, a close Lao-style finished-dish match.'],
  ['mohinga', 'File:Mohinga bowl.jpg', 'attention', 1, 'Myanmar mohinga fish noodle soup in a finished serving bowl.'],
  ['nepali-chicken-momo', 'File:Steamed Chicken Momo.jpg', 'attention', 1, 'Nepali-style steamed chicken momo dumplings with pleated wrappers.'],
  ['sri-lankan-egg-hoppers', 'File:Sri Lanka-Egg hoppers.jpg', 'attention', 1, 'Sri Lankan bowl-shaped egg hopper with its lacy edge and set egg centre.'],
  ['uzbek-plov', 'File:Plov with lamb and carrots in ceramic bowl.jpg', 'attention', 1, 'Uzbek-style plov with rice, lamb and carrots in a ceramic serving bowl.'],
  ['imeretian-khachapuri', 'File:Georgian Khachapuri cheese bread.jpg', 'attention', 1, 'Georgian round cheese bread, a close match for closed Imeretian khachapuri.'],
  ['pierogi-ruskie', 'File:Pierogi ruskie w śmietanie.jpg', 'attention', 1, 'Polish pierogi ruskie with sour cream, matching the potato-curd-filled dumplings.'],
  ['ukrainian-borscht', 'File:Borscht with bread.jpg', 'attention', 1, 'Ruby beet borshch served with dark bread, matching the Ukrainian soup.'],
  ['jamaican-jerk-chicken', 'File:Jerk chicken plate.jpg', 'attention', 1, 'Finished Jamaican-style jerk chicken with a charred spice crust.'],
  ['cuban-ropa-vieja', 'File:Ropa vieja plato cubano por excelencia 1.jpg', 'attention', 1, 'Cuban ropa vieja served as shredded beef in tomato-pepper sauce.'],
  ['trinidad-doubles', 'File:Doubles 01.jpg', 'attention', 1, 'Trinidad doubles with chickpea curry sandwiched between two soft bara breads.'],
  ['peruvian-ceviche', 'File:Ceviche de Perú CM001.jpg', 'attention', 1, 'Peruvian fish ceviche with lime, red onion and ají, served with its coastal accompaniments.'],
  ['lamingtons', 'File:Mixed lamingtons.jpg', 'attention', 1, 'A tray assortment of coconut-coated Australian lamington sponge squares; coatings vary by bakery and home.']
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
if (new Set(evidence.map((entry) => entry.commonsTitle)).size !== evidence.length || new Set(evidence.map((entry) => entry.sourceAssetSha256)).size !== evidence.length) throw new Error('A Other-world photo source or identical image is reused');
await writeFile(evidencePath, JSON.stringify(evidence, null, 2) + '\n', 'utf8');
const photos = evidence.map(({ originalWidth, originalHeight, sourceWidth, sourceHeight, matchAssessment, ...photo }) => ({ ...photo, relation: 'dish-reference', commercialUseVerified: true, realPhoto: true, visualMatchApproved: true }));
await writeFile(output, `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-other-world-photo-manifest.mjs after an approved source changes.\nexport const otherWorldPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default otherWorldPhotoCandidates;\n`, 'utf8');
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} licensed Other-world photograph records.`);
