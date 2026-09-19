import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { africanRecipeDrafts } from '../src/african-recipes.mjs';
import { africanPhotoCandidates } from '../src/african-photos.mjs';
import { recipeStepIllustrations } from '../src/recipe-step-illustrations.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const photoSource = join(root, 'assets', 'recipes', 'approved');
const illustrationSource = join(root, 'assets', 'recipes', 'illustrations-generated');
const output = join(root, 'public', 'images', 'recipes');
const cuisineIds = new Set(africanRecipeDrafts.map((recipe) => recipe.id));
const photos = africanPhotoCandidates.filter((photo) => cuisineIds.has(photo.id) && photo.visualMatchApproved && photo.commercialUseVerified && photo.realPhoto);
const illustrations = recipeStepIllustrations.filter((item) => cuisineIds.has(item.recipeId) && item.aiGenerated && item.nonPhotographic && item.visualMatchApproved && item.excludeFromStructuredData);
if (photos.length !== africanRecipeDrafts.length || illustrations.length !== africanRecipeDrafts.reduce((sum, recipe) => sum + recipe.instructions.length, 0)) throw new Error('African photo or step-illustration identity/count mismatch');
await mkdir(join(output, 'illustrations'), { recursive: true });

for (const photo of photos) {
  const source = join(photoSource, photo.sourceAsset);
  for (const width of [640, 960, 1440]) {
    const height = Math.round(width * .75);
    const zoom = Math.max(1, Number(photo.cropZoom) || 1);
    let pipeline = sharp(source).rotate();
    if (zoom > 1) {
      const zoomedWidth = Math.round(width * zoom);
      const zoomedHeight = Math.round(height * zoom);
      const horizontal = photo.cropPosition === 'east' || photo.cropPosition === 'right'
        ? zoomedWidth - width
        : photo.cropPosition === 'west' || photo.cropPosition === 'left' ? 0 : Math.round((zoomedWidth - width) / 2);
      pipeline = pipeline.resize({ width: zoomedWidth, height: zoomedHeight, fit: 'cover', position: photo.cropPosition || 'attention' })
        .extract({ left: horizontal, top: Math.round((zoomedHeight - height) / 2), width, height });
    } else {
      pipeline = pipeline.resize({ width, height, fit: 'cover', position: photo.cropPosition || 'attention' });
    }
    await pipeline.webp({ quality: 83, effort: 5 }).toFile(join(output, `${photo.id}-${width}.webp`));
  }
}

for (const illustration of illustrations) {
  const source = join(illustrationSource, illustration.sourceAsset);
  for (const width of [480, 800, 1200]) {
    await sharp(source).rotate().resize({ width, height: Math.round(width * 9 / 16), fit: 'cover', position: 'centre' })
      .webp({ quality: 84, effort: 5 }).toFile(join(output, 'illustrations', `${illustration.id}-${width}.webp`));
  }
}
console.log(`Generated ${photos.length} African photo sets and ${illustrations.length} illustrated method steps without touching other cuisine assets.`);
