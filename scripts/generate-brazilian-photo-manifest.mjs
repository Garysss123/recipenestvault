import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, 'assets', 'recipes', 'alternatives', 'brazilian');
const approved = join(root, 'assets', 'recipes', 'approved');
const evidencePath = join(root, 'docs', 'research', 'brazilian-photo-evidence.json');
const output = join(root, 'src', 'brazilian-photos.mjs');
const selections = [
  ['feijoada', 'File:Feijoada à brasileira.jpg', 'attention', 1, 'Black beans, pork, smoked sausage and rice are clearly visible in the finished dish.'],
  ['moqueca-baiana', 'File:Moqueca.jpg', 'attention', 1, 'Finished orange coconut seafood stew with shrimp, peppers, herbs and a spoonable sauce.'],
  ['pao-de-queijo', 'File:Pão de Queijo - cheese bread.jpg', 'attention', 1, 'A group of round golden pão de queijo with browned cheese crust and chewy interiors.'],
  ['coxinha', 'File:Coxinha - iguaria brasileira 03.jpg', 'attention', 1, 'Single teardrop-shaped Brazilian chicken croquette with an even golden fried crust.'],
  ['acaraje', 'File:Acarajé - Bahia 2011 (7290756706).jpg', 'attention', 1, 'Bahian acarajé with fried bean cakes and shrimp filling presented as a finished street-food plate.'],
  ['churrasco-picanha', 'File:Picanha brazil.JPG', 'attention', 1, 'Sliced picanha with a distinct browned fat edge and pink centre, plated with fresh accompaniments.'],
  ['bobo-de-camarao', 'File:Bobó de camarão.jpg', 'attention', 1, 'Creamy orange bobó de camarão with shrimp, herbs and red pepper visible in the bowl.'],
  ['vatapa', 'File:Vatapá.jpg', 'attention', 1, 'Finished golden vatapá with shrimp, coconut sauce, peppers and cilantro.'],
  ['escondidinho-de-carne-seca', 'File:Mandioca com Carne Seca (3549569788).jpg', 'attention', 1, 'Cassava and dried beef are clearly visible as a finished Brazilian plate, matching the recipe ingredients and regional context.'],
  ['arroz-carreteiro', 'File:Arroz de Carreteiro.jpg', 'attention', 1, 'Rustic finished arroz carreteiro with distinct rice grains and browned meat pieces.'],
  ['feijao-tropeiro', 'File:Feijão Tropeiro.jpg', 'attention', 1, 'Finished feijão tropeiro with beans, sausage, greens and toasted cassava flour.'],
  ['brigadeiro', 'File:Brigadeiros.jpg', 'attention', 1, 'A cluster of small Brazilian brigadeiros completely coated in chocolate sprinkles.'],
  ['quindim', 'File:Quindim - San Miguel- 2011.JPG', 'attention', 1, 'Glossy golden quindim custards with the characteristic coconut-and-yolk finish.']
];
const accepted = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const clean = (value = '') => String(value).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
const candidateFor = async (id, title) => {
  const files = await readdir(research);
  const candidateFiles = files.filter((file) => file.endsWith('-candidates.json'));
  const entries = (await Promise.all(candidateFiles.map(async (file) => JSON.parse(await readFile(join(research, file), 'utf8'))))).flat();
  const candidate = entries.find((entry) => entry.title === title);
  if (!candidate) throw new Error(`${id}: selected title is not in its candidate record`);
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
  if (!accepted.test(candidate.license) || !candidate.author || !candidate.licenseUrl) throw new Error(`${id}: incomplete commercial-use provenance`);
  if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 800) throw new Error(`${id}: reviewed source below 1200x800`);
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
    licenseUrl: candidate.licenseUrl,
    originalWidth: candidate.width,
    originalHeight: candidate.height,
    sourceWidth: metadata.width,
    sourceHeight: metadata.height,
    sourceAsset,
    sourceAssetSha256: hash(data),
    cropPosition,
    cropZoom,
    reviewedAt: '2026-09-15',
    reviewNote,
    matchAssessment: 'close'
  });
}
if (new Set(evidence.map((entry) => entry.commonsTitle)).size !== evidence.length) throw new Error('A Commons source page is reused');
if (new Set(evidence.map((entry) => entry.originalFile)).size !== evidence.length) throw new Error('An original file URL is reused');
if (new Set(evidence.map((entry) => entry.sourceAssetSha256)).size !== evidence.length) throw new Error('Identical source pixels are reused');
await writeFile(evidencePath, JSON.stringify(evidence, null, 2) + '\n', 'utf8');
const photos = evidence.map(({ originalWidth, originalHeight, sourceWidth, sourceHeight, matchAssessment, ...photo }) => ({
  ...photo,
  relation: 'dish-reference',
  commercialUseVerified: true,
  realPhoto: true,
  visualMatchApproved: true
}));
await writeFile(output, `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-brazilian-photo-manifest.mjs after an approved source changes.\nexport const brazilianPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default brazilianPhotoCandidates;\n`, 'utf8');
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} verified Brazilian photo records.`);
