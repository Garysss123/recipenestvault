import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const research = join(root, 'assets', 'recipes', 'alternatives', 'canadian');
const approved = join(root, 'assets', 'recipes', 'approved');
const evidencePath = join(root, 'docs', 'research', 'canadian-photo-evidence.json');
const output = join(root, 'src', 'canadian-photos.mjs');
const selections = [
  ['poutine', 'File:Poutine! (422692736).jpg', 'attention', 1, 'Classic golden fries, cheese curds and brown gravy are visible together in the finished Québec dish.'],
  ['tourtiere', 'File:Tourtiere half.jpg', 'attention', 1, 'A Québec tourtière is shown cut open with its meat filling and flaky crust visible.'],
  ['montreal-smoked-meat-sandwich', 'File:Montreal Style Smoked Meat Sandwich.jpg', 'attention', 1, 'Finished Montréal smoked-meat sandwich and accompaniments are the clear subject.'],
  ['montreal-style-bagels', 'File:Montreal Bagel by Fairmount Bagels.jpg', 'attention', 1, 'A sesame Montreal-style bagel from Fairmount is shown close enough to recognize its distinctive ring and crust.'],
  ['butter-tarts', 'File:ButtertartS1360020.jpg', 'attention', 1, 'Canadian butter tarts with glossy filling and pastry shells are clearly visible.'],
  ['nanaimo-bars', 'File:Nanaimo Bars, stacked.jpg', 'attention', 1, 'Stacked Nanaimo bars show the crumb base, custard layer and chocolate top.'],
  ['peameal-bacon-sandwich', 'File:Peameal bacon sandwich.jpg', 'attention', 1, 'Ontario peameal bacon is served in a bun as the subject of the photograph.'],
  ['halifax-donair', 'File:Donair (4307999410).jpg', 'attention', 1, 'A Halifax donair with its signature sweet garlic sauce is shown as a prepared street-food dish.'],
  ['jiggs-dinner', 'File:Jiggs Dinner.jpg', 'attention', 1, 'A Newfoundland boiled dinner is plated with salt meat and its characteristic root vegetables.'],
  ['toutons', 'File:Touton - Canadian breakfast food.jpg', 'east', 1.35, 'A single golden Newfoundland touton is prominent; the crop favours the food and trims unrelated breakfast packaging.'],
  ['saskatoon-berry-pie', 'File:2020 366 130 A Saskatoon Berry Pie (49915105891).jpg', 'attention', 1, 'The Saskatoon berry pie is clearly identifiable in its baked crust and purple berry filling.'],
  ['maple-taffy', 'File:Maple syrup popsicle (6974621697).jpg', 'attention', 1, 'A maple taffy ribbon is being rolled onto a stick over snow, visibly matching the recipe.'],
  ['campfire-bannock', 'File:Bannock 2.JPG', 'attention', 1, 'Bannock cooks over a campfire in a pot, matching the documented campfire adaptation.']
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
if (new Set(evidence.map((entry) => entry.commonsTitle)).size !== evidence.length || new Set(evidence.map((entry) => entry.sourceAssetSha256)).size !== evidence.length) throw new Error('A Canadian photo source or identical image is reused');
await writeFile(evidencePath, JSON.stringify(evidence, null, 2) + '\n', 'utf8');
const photos = evidence.map(({ originalWidth, originalHeight, sourceWidth, sourceHeight, matchAssessment, ...photo }) => ({ ...photo, relation: 'dish-reference', commercialUseVerified: true, realPhoto: true, visualMatchApproved: true }));
await writeFile(output, `// Generated from pinned, visually reviewed Wikimedia Commons photographs.\n// Run node scripts/generate-canadian-photo-manifest.mjs after an approved source changes.\nexport const canadianPhotoCandidates = ${JSON.stringify(photos, null, 2)};\n\nexport default canadianPhotoCandidates;\n`, 'utf8');
console.log(`Wrote ${relative(root, output)} and ${relative(root, evidencePath)} with ${photos.length} licensed Canadian photograph records.`);
