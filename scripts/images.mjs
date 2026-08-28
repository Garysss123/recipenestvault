import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { recipePhotoCandidates } from "../src/recipe-photos.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDirectory = join(root, "assets", "brand", "real");
const output = join(root, "public", "images");
await mkdir(output, { recursive: true });
const recipeSourceDirectory = join(root, "assets", "recipes", "approved");
const recipeOutput = join(output, "recipes");
await rm(recipeOutput, { recursive: true, force: true });
await mkdir(recipeOutput, { recursive: true });

const photographs = [
  { name: "sushi", file: "sushi.jpg", position: "attention" },
  { name: "paella", file: "paella.jpg", position: "attention" },
  { name: "pizza", file: "pizza.jpg", position: "centre" },
  { name: "burger", file: "burger.jpg", position: "attention" }
];

for (const photograph of photographs) {
  const source = join(sourceDirectory, photograph.file);
  for (const width of [640, 960, 1440]) {
    await sharp(source)
      .rotate()
      .resize({ width, height: Math.round(width * .75), fit: "cover", position: photograph.position })
      .webp({ quality: 82, effort: 5 })
      .toFile(join(output, `${photograph.name}-${width}.webp`));
  }
}

const approvedRecipePhotos = recipePhotoCandidates.filter((photo) => photo.visualMatchApproved && photo.commercialUseVerified && photo.realPhoto);
for (const photograph of approvedRecipePhotos) {
  const source = join(recipeSourceDirectory, photograph.sourceAsset);
  for (const width of [640, 960, 1440]) {
    await sharp(source)
      .rotate()
      .resize({ width, height: Math.round(width * .75), fit: "cover", position: photograph.cropPosition || "attention" })
      .webp({ quality: 83, effort: 5 })
      .toFile(join(recipeOutput, `${photograph.id}-${width}.webp`));
  }
}

const socialCard = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffaf7"/><stop offset="1" stop-color="#f8e9ee"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b4235a"/><stop offset="1" stop-color="#d76a91"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#background)"/>
  <circle cx="1120" cy="70" r="250" fill="#f5d5e0" opacity=".58"/>
  <circle cx="1090" cy="590" r="190" fill="#b4235a" opacity=".07"/>
  <path d="M905 90c102 50 159 136 171 257 8 83-11 150-57 202" fill="none" stroke="#d76a91" stroke-width="2" opacity=".42"/>
  <path d="M953 68c116 71 181 170 192 298" fill="none" stroke="#b4235a" stroke-width="12" stroke-linecap="round" opacity=".1"/>
  <g transform="translate(72 72) scale(1.5)">
    <rect width="64" height="64" rx="20" fill="url(#accent)"/>
    <path d="M16 18c6-6 26-6 32 0M18 24c7-5 21-5 28 0" fill="none" stroke="#fbe8ef" stroke-width="3" stroke-linecap="round"/>
    <path d="M18 31h28c-1 11-6 17-14 17S19 42 18 31Z" fill="#fffdfb"/>
    <path d="M23 31c1 7 4 11 9 11s8-4 9-11" fill="none" stroke="#d76a91" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M39 15c4 5 4 11-1 16" fill="none" stroke="#fffdfb" stroke-width="3" stroke-linecap="round"/>
    <circle cx="39" cy="14" r="2" fill="#fffdfb"/>
  </g>
  <text x="72" y="270" fill="#272225" font-family="Georgia, 'Times New Roman', serif" font-size="82" letter-spacing="-2">Recipe Nest Vault</text>
  <rect x="72" y="319" width="510" height="5" rx="2.5" fill="url(#accent)"/>
  <text x="72" y="397" fill="#6f6267" font-family="Arial, sans-serif" font-size="35">Good food, without the long scroll.</text>
  <text x="72" y="530" fill="#b4235a" font-family="Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="3">CLEAR · PRACTICAL · CAREFULLY SOURCED</text>
</svg>`);

await sharp(socialCard).jpeg({ quality: 88, chromaSubsampling: "4:4:4" }).toFile(join(root, "public", "og.jpg"));

console.log(`Prepared ${photographs.length * 3} homepage crops, ${approvedRecipePhotos.length * 3} approved recipe crops, and one food-free social card.`);
