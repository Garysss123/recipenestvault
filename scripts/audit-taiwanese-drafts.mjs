import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { taiwanesePhotoCandidates } from "../src/taiwanese-photos.mjs";
import { taiwaneseRecipeDrafts } from "../src/taiwanese-recipes.mjs";
import { taiwaneseIllustrationSets } from "../src/taiwanese-illustration-sets.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const localeOrder = ["en", "zh-hant", "ja", "ko", "th"];
const recipes = taiwaneseRecipeDrafts;
const photos = taiwanesePhotoCandidates;
const photosById = new Map(photos.map((photo) => [photo.id, photo]));
const recipeIds = new Set(recipes.map((recipe) => recipe.id));
const setsById = new Map(taiwaneseIllustrationSets.map((set) => [set.recipeId, set]));
const illustrations = recipeStepIllustrations.filter((illustration) => recipeIds.has(illustration.recipeId));
const failures = [];

async function exists(path) { try { await stat(path); return true; } catch { return false; } }
function validateLocalized(value, label) {
  for (const locale of localeOrder) if (typeof value?.[locale] !== "string" || !value[locale].trim()) failures.push(`${label}.${locale}: missing localized text`);
}
function temperatureFacts(value) {
  return (String(value).match(/\d+(?:[.,]\d+)?\s*(?:°C|℃)/g) || []).map((fact) => fact.replace(/\s/g, "").replace("℃", "°C").replace(",", ".")).sort().join("|");
}
function validateTemperatures(value, label) {
  const expected = temperatureFacts(value?.en);
  for (const locale of localeOrder) if (temperatureFacts(value?.[locale]) !== expected) failures.push(`${label}.${locale}: temperature facts differ from English`);
}

if (recipes.length < 20) failures.push(`Taiwanese first edition has ${recipes.length} recipes; at least 20 are required`);
if (recipeIds.size !== recipes.length) failures.push("duplicate Taiwanese recipe id");
if (new Set(photos.map((photo) => photo.id)).size !== photos.length) failures.push("duplicate Taiwanese photo id");
if (recipes.length !== photos.length) failures.push(`recipe/photo count mismatch: ${recipes.length}/${photos.length}`);
const stepCounts = recipes.map((recipe) => recipe.instructions.length);
if (!stepCounts.some((count) => count <= 6) || !stepCounts.some((count) => count >= 9) || new Set(stepCounts).size < 4) failures.push("natural step-count regression: Taiwanese methods appear templated instead of following cooking complexity");

for (const recipe of recipes) {
  if (recipe.cuisine !== "taiwanese") failures.push(`${recipe.id}: wrong cuisine`);
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
  if (JSON.stringify(recipe).match(/\b(?:TODO|TBD|PLACEHOLDER)\b|REPLACE_[A-Z0-9_]+/i)) failures.push(`${recipe.id}: placeholder content remains`);
  if (!recipe.visualSpec?.trim()) failures.push(`${recipe.id}: missing visual specification`);
  for (const source of recipe.sources) if (!source.title || !/^https:\/\//.test(source.url || "")) failures.push(`${recipe.id}: invalid recipe source`);

  const photo = photosById.get(recipe.id);
  if (!photo) { failures.push(`${recipe.id}: missing photograph manifest`); continue; }
  if (!photo.commercialUseVerified || !photo.realPhoto || !photo.visualMatchApproved || photo.relation !== "dish-reference") failures.push(`${recipe.id}: finished photograph approval gate failed`);
  if (!/^(?:CC0|Public Domain|CC BY(?:-SA)?)(?:\s|$)/i.test(photo.license || "") || /\b(?:NC|ND)\b/i.test(photo.license || "")) failures.push(`${recipe.id}: unacceptable photo license`);
  if (![photo.sourcePage, photo.originalFile, photo.licenseUrl].every((url) => /^https:\/\//.test(url || ""))) failures.push(`${recipe.id}: incomplete HTTPS provenance`);
  if (!/^[a-f0-9]{64}$/i.test(photo.sourceAssetSha256 || "")) failures.push(`${recipe.id}: missing photo hash`);
  const asset = join(root, "assets", "recipes", "approved", photo.sourceAsset || "missing");
  if (!(await exists(asset))) failures.push(`${recipe.id}: photo asset missing`);
  else {
    const buffer = await readFile(asset);
    if (createHash("sha256").update(buffer).digest("hex") !== photo.sourceAssetSha256) failures.push(`${recipe.id}: photo hash mismatch`);
    const metadata = await sharp(buffer).metadata();
    if ((metadata.width || 0) < 1200 || (metadata.height || 0) < 800) failures.push(`${recipe.id}: photo below 1200x800`);
  }

  const set = setsById.get(recipe.id);
  if (!set || !set.noPeopleOrHands || !set.sourceSheetAsset || !/^[a-f0-9]{64}$/i.test(set.sourceSheetSha256 || "")) failures.push(`${recipe.id}: missing reviewed hand-free source-sheet provenance`);
  else {
    const sheetPath = join(root, set.sourceSheetAsset);
    if (!(await exists(sheetPath))) failures.push(`${recipe.id}: source sheet missing`);
    else if (createHash("sha256").update(await readFile(sheetPath)).digest("hex") !== set.sourceSheetSha256) failures.push(`${recipe.id}: source sheet hash mismatch`);
    const supplementalAssets = set.supplementalSheetAssets || [];
    const supplementalHashes = set.supplementalSheetSha256 || [];
    if (supplementalAssets.length !== supplementalHashes.length) failures.push(`${recipe.id}: supplemental source-sheet provenance mismatch`);
    for (const [index, relativePath] of supplementalAssets.entries()) {
      const supplementalPath = join(root, relativePath);
      if (!(await exists(supplementalPath))) failures.push(`${recipe.id}: supplemental source sheet missing`);
      else if (createHash("sha256").update(await readFile(supplementalPath)).digest("hex") !== supplementalHashes[index]) failures.push(`${recipe.id}: supplemental source sheet hash mismatch`);
    }
  }
}

const expectedIllustrations = recipes.reduce((sum, recipe) => sum + recipe.instructions.length, 0);
if (illustrations.length !== expectedIllustrations) failures.push(`illustration count mismatch: expected ${expectedIllustrations}, found ${illustrations.length}`);
for (const recipe of recipes) {
  const set = illustrations.filter((item) => item.recipeId === recipe.id).sort((a, b) => a.step - b.step);
  if (set.length !== recipe.instructions.length || set.some((item, index) => item.step !== index + 1)) failures.push(`${recipe.id}: incomplete illustration step map`);
  for (const item of set) {
    if (!item.aiGenerated || !item.nonPhotographic || !item.noPeopleOrHands || !item.visualMatchApproved || !item.excludeFromStructuredData || !item.setComplete) failures.push(`${item.id}: illustration review flags failed`);
    if (item.generator !== "OpenAI image_gen" || item.generatedAt !== "2026-08-31" || item.promptSet !== "taiwanese-cooking-steps-v2") failures.push(`${item.id}: illustration provenance changed`);
    const asset = join(root, "assets", "recipes", "illustrations-generated", item.sourceAsset || "missing");
    if (!(await exists(asset))) failures.push(`${item.id}: illustration asset missing`);
    else {
      const buffer = await readFile(asset);
      if (createHash("sha256").update(buffer).digest("hex") !== item.sourceAssetSha256) failures.push(`${item.id}: illustration hash mismatch`);
      const metadata = await sharp(buffer).metadata();
      if (metadata.width !== 1672 || metadata.height !== 941) failures.push(`${item.id}: expected 1672x941`);
    }
  }
}

if (failures.length) {
  console.error(`Taiwanese draft audit failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`Taiwanese draft audit passed: ${recipes.length} five-locale recipes, ${photos.length} licensed photographs, ${illustrations.length} reviewed hand-free step illustrations and pinned hashes.`);
