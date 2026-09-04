import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { indianPhotoCandidates } from "../src/indian-photos.mjs";
import { indianRecipeDrafts } from "../src/indian-recipes.mjs";
import { indianIllustrationSets } from "../src/indian-illustration-sets.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const locales = ["en", "zh-hant", "ja", "ko", "th"];
const recipes = indianRecipeDrafts;
const photos = indianPhotoCandidates;
const ids = new Set(recipes.map((recipe) => recipe.id));
const photosById = new Map(photos.map((photo) => [photo.id, photo]));
const setsById = new Map(indianIllustrationSets.map((set) => [set.recipeId, set]));
const illustrations = recipeStepIllustrations.filter((item) => ids.has(item.recipeId));
const failures = [];

async function exists(path) { try { await stat(path); return true; } catch { return false; } }
function validateLocalized(value, label) {
  for (const locale of locales) if (typeof value?.[locale] !== "string" || !value[locale].trim()) failures.push(`${label}.${locale}: missing localized text`);
}
function temperatureFacts(value) {
  return (String(value).match(/\d+(?:[.,]\d+)?\s*(?:°C|℃)/g) || []).map((fact) => fact.replace(/\s/g, "").replace("℃", "°C").replace(",", ".")).sort().join("|");
}
function validateTemperatures(value, label) {
  const expected = temperatureFacts(value?.en);
  for (const locale of locales) if (temperatureFacts(value?.[locale]) !== expected) failures.push(`${label}.${locale}: temperature facts differ from English`);
}

if (recipes.length < 20) failures.push(`Indian collection has ${recipes.length} recipes; at least 20 are required`);
if (ids.size !== recipes.length) failures.push("duplicate Indian recipe id");
if (new Set(photos.map((photo) => photo.id)).size !== photos.length) failures.push("duplicate Indian photo id");
if (recipes.length !== photos.length) failures.push(`recipe/photo count mismatch: ${recipes.length}/${photos.length}`);
const stepCounts = recipes.map((recipe) => recipe.instructions.length);
if (Math.min(...stepCounts) > 6 || Math.max(...stepCounts) < 9 || new Set(stepCounts).size < 4) failures.push("natural step-count regression: methods appear templated");

for (const recipe of recipes) {
  if (recipe.cuisine !== "indian") failures.push(`${recipe.id}: wrong cuisine`);
  if (recipe.prepMinutes + recipe.cookMinutes !== recipe.totalMinutes) failures.push(`${recipe.id}: prep + cook must equal total`);
  if (!Number.isInteger(recipe.servings) || recipe.servings < 1) failures.push(`${recipe.id}: invalid servings`);
  if (recipe.ingredients.length < 6) failures.push(`${recipe.id}: fewer than six ingredients`);
  if (recipe.instructions.length < 4) failures.push(`${recipe.id}: fewer than four actionable steps`);
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
  for (const field of ["tips", "commonMistakes", "substitutions"]) for (const [index, row] of recipe[field].entries()) {
    validateLocalized(row, `${recipe.id}.${field}[${index}]`);
    validateTemperatures(row, `${recipe.id}.${field}[${index}]`);
  }
  if (/\b(?:TODO|TBD|PLACEHOLDER)\b|REPLACE_[A-Z0-9_]+/i.test(JSON.stringify(recipe))) failures.push(`${recipe.id}: placeholder content remains`);
  if (!recipe.visualSpec?.trim()) failures.push(`${recipe.id}: missing visual specification`);
  for (const source of recipe.sources) if (!source.title || !/^https:\/\//.test(source.url || "")) failures.push(`${recipe.id}: invalid recipe source`);

  const photo = photosById.get(recipe.id);
  if (!photo) { failures.push(`${recipe.id}: missing photograph manifest`); continue; }
  if (!photo.commercialUseVerified || !photo.realPhoto || !photo.visualMatchApproved || photo.relation !== "dish-reference") failures.push(`${recipe.id}: photograph approval gate failed`);
  if (!/^(?:CC0|Public Domain|CC BY(?:-SA)?)(?:\s|$)/i.test(photo.license || "") || /\b(?:NC|ND)\b/i.test(photo.license || "")) failures.push(`${recipe.id}: unacceptable photo license`);
  if (![photo.sourcePage, photo.originalFile, photo.licenseUrl].every((url) => /^https:\/\//.test(url || ""))) failures.push(`${recipe.id}: incomplete HTTPS provenance`);
  const photoPath = join(root, "assets", "recipes", "approved", photo.sourceAsset || "missing");
  if (!(await exists(photoPath))) failures.push(`${recipe.id}: photo asset missing`);
  else {
    const buffer = await readFile(photoPath);
    if (createHash("sha256").update(buffer).digest("hex") !== photo.sourceAssetSha256) failures.push(`${recipe.id}: photo hash mismatch`);
    const metadata = await sharp(buffer).metadata();
    if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 800) failures.push(`${recipe.id}: photo below 1200x800`);
  }

  const sourceSet = setsById.get(recipe.id);
  if (!sourceSet || !sourceSet.noPeopleOrHands || sourceSet.generator !== "OpenAI image_gen" || sourceSet.generatedAt !== "2026-09-04" || sourceSet.promptSet !== "indian-cooking-steps-v1") failures.push(`${recipe.id}: source-sheet provenance gate failed`);
  else {
    const sheetPath = join(root, sourceSet.sourceSheetAsset || "missing");
    if (!(await exists(sheetPath))) failures.push(`${recipe.id}: source sheet missing`);
    else if (createHash("sha256").update(await readFile(sheetPath)).digest("hex") !== sourceSet.sourceSheetSha256) failures.push(`${recipe.id}: source sheet hash mismatch`);
  }
}

const expected = stepCounts.reduce((sum, count) => sum + count, 0);
if (illustrations.length !== expected) failures.push(`illustration count mismatch: expected ${expected}, found ${illustrations.length}`);
for (const recipe of recipes) {
  const set = illustrations.filter((item) => item.recipeId === recipe.id).sort((a, b) => a.step - b.step);
  if (set.length !== recipe.instructions.length || set.some((item, index) => item.step !== index + 1)) failures.push(`${recipe.id}: incomplete illustration step map`);
  for (const item of set) {
    if (!item.aiGenerated || !item.nonPhotographic || !item.noPeopleOrHands || !item.visualMatchApproved || !item.excludeFromStructuredData || !item.setComplete) failures.push(`${item.id}: illustration review flags failed`);
    if (item.generator !== "OpenAI image_gen" || item.generatedAt !== "2026-09-04" || item.promptSet !== "indian-cooking-steps-v1") failures.push(`${item.id}: illustration provenance changed`);
    const assetPath = join(root, "assets", "recipes", "illustrations-generated", item.sourceAsset || "missing");
    if (!(await exists(assetPath))) failures.push(`${item.id}: illustration asset missing`);
    else {
      const buffer = await readFile(assetPath);
      if (createHash("sha256").update(buffer).digest("hex") !== item.sourceAssetSha256) failures.push(`${item.id}: illustration hash mismatch`);
      const metadata = await sharp(buffer).metadata();
      if (metadata.width !== 1672 || metadata.height !== 941) failures.push(`${item.id}: expected 1672x941`);
    }
  }
}

if (failures.length) {
  console.error(`Indian draft audit failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Indian draft audit passed: ${recipes.length} five-locale recipes, ${photos.length} licensed photographs, ${illustrations.length} reviewed hand-free step illustrations and pinned hashes.`);
