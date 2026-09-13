import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { britishRecipeDrafts as recipes } from "../src/british-recipes.mjs";
import { britishPhotoCandidates as photos } from "../src/british-photos.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];
const recipeIds = new Set(recipes.map((recipe) => recipe.id));
const photoIds = new Set(photos.map((photo) => photo.id));
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");

if (recipes.length !== 13) failures.push(`Expected 13 British recipes; found ${recipes.length}`);
if (photos.length !== recipes.length || photoIds.size !== photos.length || photos.some((photo) => !recipeIds.has(photo.id))) failures.push("British recipe/photo identity mismatch");
if (new Set(photos.map((photo) => photo.sourceAssetSha256)).size !== photos.length) failures.push("A finished photograph is reused across British recipes");
if (new Set(photos.map((photo) => photo.sourcePage)).size !== photos.length) failures.push("A Commons source page is reused across British recipes");
if (new Set(photos.map((photo) => photo.originalFile)).size !== photos.length) failures.push("An original photograph URL is reused across British recipes");

for (const photo of photos) {
  if (!photo.realPhoto || !photo.commercialUseVerified || !photo.visualMatchApproved || photo.relation !== "dish-reference") failures.push(`${photo.id}: photo review flags failed`);
  if (!photo.author?.trim() || !photo.title?.trim()) failures.push(`${photo.id}: missing photo attribution`);
  if (!/^(?:CC0|Public Domain|CC BY(?:-SA)?)(?:\s|$)/i.test(photo.license || "") || /\b(?:NC|ND)\b/i.test(photo.license || "")) failures.push(`${photo.id}: photo license disallows the required reuse`);
  if (![photo.sourcePage, photo.originalFile, photo.licenseUrl].every((value) => /^https:\/\//.test(value || ""))) failures.push(`${photo.id}: incomplete HTTPS photo provenance`);
  if (!/^[a-f0-9]{64}$/.test(photo.sourceAssetSha256 || "")) failures.push(`${photo.id}: malformed SHA-256`);

  const asset = resolve(root, "assets", "recipes", "approved", photo.sourceAsset || "");
  let buffer;
  try { buffer = await readFile(asset); }
  catch { failures.push(`${photo.id}: approved photograph is missing`); continue; }
  if (hash(buffer) !== photo.sourceAssetSha256) failures.push(`${photo.id}: SHA-256 mismatch`);
  const metadata = await sharp(buffer).metadata();
  if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 800) failures.push(`${photo.id}: below 1200x800`);
}

const evidence = JSON.parse(await readFile(resolve(root, "docs", "research", "british-photo-evidence.json"), "utf8"));
if (evidence.length !== photos.length || new Set(evidence.map((entry) => entry.id)).size !== evidence.length) failures.push("British photo evidence identity mismatch");
for (const photo of photos) {
  const pinned = evidence.find((entry) => entry.id === photo.id);
  if (!pinned || pinned.sourceAssetSha256 !== photo.sourceAssetSha256 || pinned.sourcePage !== photo.sourcePage || pinned.originalFile !== photo.originalFile || pinned.license !== photo.license || pinned.licenseUrl !== photo.licenseUrl) failures.push(`${photo.id}: manifest differs from pinned research evidence`);
}

if (failures.length) {
  console.error(`British photo audit failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`British photo audit passed: ${photos.length} unique licensed real photographs; identities, provenance, hashes and minimum 1200x800 dimensions verified.`);
