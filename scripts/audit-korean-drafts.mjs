import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { koreanPhotoCandidates } from "../src/korean-photos.mjs";
import { koreanRecipeDrafts } from "../src/korean-recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const localeOrder = ["en", "zh-hant", "ja", "ko", "th"];
const recipes = koreanRecipeDrafts;
const photos = koreanPhotoCandidates;
const photosById = new Map(photos.map((photo) => [photo.id, photo]));
const failures = [];

async function exists(path) { try { await stat(path); return true; } catch { return false; } }
function validateLocalized(value, label) {
  for (const locale of localeOrder) if (typeof value?.[locale] !== "string" || !value[locale].trim()) failures.push(`${label}.${locale}: missing localized text`);
}
function temperatureFacts(value) {
  return (String(value).match(/\d+(?:[.,]\d+)?\s*(?:°C|℃)/g) || [])
    .map((fact) => fact.replace(/\s/g, "").replace("℃", "°C").replace(",", "."))
    .sort().join("|");
}
function validateTemperatures(value, label) {
  const expected = temperatureFacts(value?.en);
  for (const locale of localeOrder) if (temperatureFacts(value?.[locale]) !== expected) failures.push(`${label}.${locale}: temperature facts differ from English`);
}

if (new Set(recipes.map((recipe) => recipe.id)).size !== recipes.length) failures.push("duplicate Korean recipe id");
if (new Set(photos.map((photo) => photo.id)).size !== photos.length) failures.push("duplicate Korean photo id");
if (recipes.length < 20) failures.push(`Korean first edition has ${recipes.length} recipes; at least 20 are required`);
if (recipes.length !== photos.length) failures.push(`recipe/photo count mismatch: ${recipes.length}/${photos.length}`);
const stepCounts = recipes.map((recipe) => recipe.instructions.length);
if (!stepCounts.some((count) => count <= 5)) failures.push("natural step-count regression: the collection needs at least one genuinely short method");
if (!stepCounts.some((count) => count > 12)) failures.push("natural step-count regression: complex methods must be allowed to exceed twelve steps");
if (new Set(stepCounts).size < 6) failures.push("natural step-count regression: methods appear templated instead of following actual cooking complexity");

for (const recipe of recipes) {
  if (recipe.cuisine !== "korean") failures.push(`${recipe.id}: wrong cuisine`);
  if (recipe.prepMinutes + recipe.cookMinutes !== recipe.totalMinutes) failures.push(`${recipe.id}: prep + cook must equal total`);
  if (!Number.isInteger(recipe.servings) || recipe.servings < 1) failures.push(`${recipe.id}: invalid servings`);
  if (recipe.ingredients.length < 5) failures.push(`${recipe.id}: fewer than five ingredients`);
  if (recipe.instructions.length < 4) failures.push(`${recipe.id}: method needs at least four independently actionable steps; no fixed upper limit is imposed`);
  if (recipe.sources.length < 2 || new Set(recipe.sources.map((source) => source.url)).size < 2) failures.push(`${recipe.id}: fewer than two distinct sources`);
  if ((recipe.tips?.length || 0) < 2 || (recipe.commonMistakes?.length || 0) < 2 || (recipe.substitutions?.length || 0) < 2) failures.push(`${recipe.id}: practical notes are incomplete`);
  for (const field of ["region", "name", "description", "storage", "cultureNote", "imageAlt"]) validateLocalized(recipe[field], `${recipe.id}.${field}`);
  validateTemperatures(recipe.storage, `${recipe.id}.storage`);
  recipe.ingredients.forEach((row, index) => {
    if (typeof row.amount === "object") validateLocalized(row.amount, `${recipe.id}.ingredients[${index}].amount`);
    else if (!/\d/.test(row.amount || "")) failures.push(`${recipe.id}.ingredients[${index}]: missing exact amount`);
    validateLocalized(row.item, `${recipe.id}.ingredients[${index}].item`);
  });
  recipe.instructions.forEach((entry, index) => {
    validateLocalized(entry.title, `${recipe.id}.instructions[${index}].title`);
    validateLocalized(entry.body, `${recipe.id}.instructions[${index}].body`);
    validateTemperatures(entry.body, `${recipe.id}.instructions[${index}].body`);
  });
  for (const field of ["tips", "commonMistakes", "substitutions"]) recipe[field].forEach((row, index) => {
    validateLocalized(row, `${recipe.id}.${field}[${index}]`);
    validateTemperatures(row, `${recipe.id}.${field}[${index}]`);
  });
  if (JSON.stringify(recipe).match(/\b(?:TODO|TBD|PLACEHOLDER)\b|REPLACE_[A-Z0-9_]+/i)) failures.push(`${recipe.id}: placeholder content remains`);
  if (!recipe.visualSpec?.trim()) failures.push(`${recipe.id}: missing visual specification`);
  for (const source of recipe.sources) if (!source.title || !/^https:\/\//.test(source.url || "")) failures.push(`${recipe.id}: invalid recipe source`);

  const photo = photosById.get(recipe.id);
  if (!photo) { failures.push(`${recipe.id}: missing finished photograph manifest`); continue; }
  if (!photo.commercialUseVerified || !photo.realPhoto || !photo.visualMatchApproved || photo.relation !== "dish-reference") failures.push(`${recipe.id}: finished photograph approval gate failed`);
  if (!/^(?:CC0|Public Domain|CC BY(?:-SA)?)(?:\s|$)/i.test(photo.license || "") || /\b(?:NC|ND)\b/i.test(photo.license || "")) failures.push(`${recipe.id}: unacceptable photo license`);
  if (photo.cropZoom !== undefined && (!Number.isFinite(photo.cropZoom) || photo.cropZoom < 1 || photo.cropZoom > 2)) failures.push(`${recipe.id}: invalid photo crop zoom`);
  if (![photo.sourcePage, photo.originalFile, photo.licenseUrl].every((url) => /^https:\/\//.test(url || ""))) failures.push(`${recipe.id}: photo provenance must use HTTPS`);
  if (!/^[a-f0-9]{64}$/i.test(photo.sourceAssetSha256 || "")) failures.push(`${recipe.id}: missing photo SHA-256`);
  const asset = join(root, "assets", "recipes", "approved", photo.sourceAsset || "missing");
  if (!(await exists(asset))) failures.push(`${recipe.id}: photo asset missing`);
  else {
    if (createHash("sha256").update(await readFile(asset)).digest("hex") !== photo.sourceAssetSha256?.toLowerCase()) failures.push(`${recipe.id}: photo SHA-256 mismatch`);
    const metadata = await sharp(asset).metadata();
    if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 800) failures.push(`${recipe.id}: finished photograph is below the 1200 x 800 review floor`);
  }
}

for (const photo of photos) if (!recipes.some((recipe) => recipe.id === photo.id)) failures.push(`${photo.id}: orphan Korean photo manifest`);

if (failures.length) {
  console.error(`Korean draft audit failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Korean draft audit passed: ${recipes.length} recipes, natural ${Math.min(...stepCounts)}–${Math.max(...stepCounts)} step methods, ${photos.length} licensed real photographs, five locales and pinned hashes.`);
