import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { africanRecipeDrafts as recipes } from "../src/african-recipes.mjs";

const contentOnly = process.argv.includes('--content-only');
const requireComplete = process.argv.includes('--complete');
const photos = contentOnly ? [] : (await import('../src/african-photos.mjs')).africanPhotoCandidates;

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const locales = ["en", "zh-hant", "ja", "ko", "th"];
const failures = [];
const recipeIds = new Set(recipes.map((recipe) => recipe.id));
const photosById = new Map(photos.map((photo) => [photo.id, photo]));
const promptSet = "african-cooking-steps-v1";
const generatedAt = "2026-09-20";
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
const promptRecords = contentOnly ? [] : [JSON.parse(await readFile(resolve(root, 'docs/illustration-prompts/african-prompts.json'), 'utf8'))];
const promptsById = new Map(promptRecords.flatMap((record) => record.entries).map((entry) => [entry.recipeId, entry]));

function localized(value, label) {
  for (const locale of locales) {
    if (typeof value?.[locale] !== "string" || !value[locale].trim()) failures.push(`${label}.${locale}: missing text`);
  }
}

function temperatures(text) {
  return (String(text).replace(/[–—~〜～]/g, "-").match(/\d+(?:[.,]\d+)?(?:\s*-\s*\d+(?:[.,]\d+)?)?\s*(?:°C|℃)/g) || [])
    .map((value) => value.replace(/\s/g, "").replace("℃", "°C").replace(",", ".")).sort().join("|");
}

// Compare explicit measurable facts after converting compatible units to a
// common scale. Prose counts ("one bowl", "half the herbs") are reviewed in the
// research record; they are not inferred from arbitrary unlabelled numbers.
const measures = [
  ["time", 86400, "days?\\b|天|日|일|วัน"],
  ["time", 3600, "hours?\\b|hrs?\\b|小時|時間|시간|ชั่วโมง"],
  ["time", 60, "minutes?\\b|mins?\\b|分鐘|分(?!の)|분(?!의)|นาที"],
  ["time", 1, "seconds?\\b|secs?\\b|秒|초|วินาที"],
  ["mass", 1000, "kg\\b|kilograms?\\b|公斤|キログラム|킬로그램|กิโลกรัม|กก\\.?"],
  ["mass", 1, "g\\b|grams?\\b|公克|グラム|그램|กรัม"],
  ["volume", 1000, "L\\b|l\\b|litres?\\b|liters?\\b|公升|リットル|리터|ลิตร"],
  ["volume", 1, "ml\\b|mL\\b|millilitres?\\b|milliliters?\\b|毫升|ミリリットル|밀리리터|มล\\.?"],
  ["length", 10, "cm\\b|centimetres?\\b|centimeters?\\b|公分|厘米|センチ|센티미터|ซม\\.?"],
  ["length", 1, "mm\\b|millimetres?\\b|millimeters?\\b|毫米|ミリ|밀리미터|มม\\.?"]
];
function measuredFacts(value) {
  const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  const text = String(value).replace(/(\d),(?=\d{3}\b)/g, "$1").replace(/[–—~〜～]/g, "-")
    .replace(new RegExp(`\\b(${words.join("|")})\\b(?=\\s+(?:hours?|minutes?|seconds?|grams?|litres?|liters?)\\b)`, "gi"), (word) => String(words.indexOf(word.toLowerCase())))
    .replace(/(\d)-(?=(?:hour|minute|second|gram|litre|liter))/gi, "$1 ")
    .replace(/\b(?:last|final) (hour|minute|second)\b/gi, "last 1 $1")
    .replace(/二十(?=小時|分鐘|秒)/g, "20")
    .replace(/一(?=小時|分鐘|秒)/g, "1")
    .replace(/末分鐘/g, "末1分鐘")
    .replace(/(?<![가-힣])한\s+(?=시간|분|초)/g, "1")
    .replace(/(?<!\d)(?<!\d\s)(ชั่วโมง|นาที|วินาที)สุดท้าย/g, "1 $1");
  const result = [];
  for (const [kind, multiplier, unit] of measures) {
    const pattern = new RegExp(`(\\d+(?:\\.\\d+)?)(?:\\s*-\\s*(\\d+(?:\\.\\d+)?))?\\s*(?:${unit})`, "g");
    for (const match of text.matchAll(pattern)) {
      const from = Math.round(Number(match[1]) * multiplier * 1000) / 1000;
      const to = match[2] ? Math.round(Number(match[2]) * multiplier * 1000) / 1000 : undefined;
      result.push(`${kind}:${from}${to === undefined ? "" : `-${to}`}`);
    }
  }
  // Repeating "240 g" twice and saying "240 g each" carry the same measurable
  // value; compare unique facts while the ingredient rows retain exact yields.
  return [...new Set(result)].sort().join("|");
}
function facts(value, label, includeMeasures = true) {
  const expectedTemp = temperatures(value?.en);
  const expectedMeasures = measuredFacts(value?.en);
  for (const locale of locales) {
    if (temperatures(value?.[locale]) !== expectedTemp) failures.push(`${label}.${locale}: temperature facts differ`);
    if (includeMeasures && measuredFacts(value?.[locale]) !== expectedMeasures) {
      failures.push(`${label}.${locale}: measured facts differ (${measuredFacts(value?.[locale])}; expected ${expectedMeasures})`);
    }
  }
}
function ingredientFacts(value, amount, label) {
  facts(value, label, false);
  const expected = measuredFacts(value?.en);
  const expectedSet = new Set(expected.split("|").filter(Boolean));
  const amountFact = typeof amount === "string" ? measuredFacts(amount) : "";
  const amountMatch = amountFact.match(/^(mass|volume):([\d.]+)$/);
  const amountNumber = typeof amount === "string" ? Number(amount.match(/[\d.]+/)?.[0]) : 0;
  for (const locale of locales) {
    const actual = measuredFacts(value?.[locale]);
    if (actual === expected) continue;
    // Ingredient allocation labels may state their unit only once, for example
    // "醃肉 25、蔥油 30、刷架 5 毫升". Accept that notation only when every explicit
    // unit agrees and ALL numbers form exactly the English allocation set in
    // the ingredient's shared unit. Incorrect units or quantities still fail.
    if (amountMatch && amountNumber > 0 && [...expectedSet].every((fact) => fact.startsWith(`${amountMatch[1]}:`)) && actual.split("|").filter(Boolean).every((fact) => expectedSet.has(fact))) {
      const multiplier = Number(amountMatch[2]) / amountNumber;
      const allocated = [...new Set((String(value?.[locale]).match(/\d+(?:\.\d+)?/g) || []).map((number) => `${amountMatch[1]}:${Math.round(Number(number) * multiplier * 1000) / 1000}`))].sort().join("|");
      if (allocated === expected) continue;
    }
    failures.push(`${label}.${locale}: ingredient measurements differ (${actual}; expected ${expected})`);
  }
}
function assetPath(base, path, label) {
  if (typeof path !== "string" || !path) { failures.push(`${label}: missing asset path`); return null; }
  const directory = resolve(root, base);
  const file = resolve(directory, path);
  const within = relative(directory, file);
  if (!within || isAbsolute(path) || isAbsolute(within) || within.startsWith("..")) {
    failures.push(`${label}: asset escapes its expected directory`);
    return null;
  }
  return file;
}
async function verifyAsset(base, path, expectedHash, label, dimensions) {
  const file = assetPath(base, path, label);
  if (!file) return;
  let buffer;
  try { buffer = await readFile(file); }
  catch { failures.push(`${label}: missing asset ${path}`); return; }
  if (!/^[a-f0-9]{64}$/.test(expectedHash || "") || hash(buffer) !== expectedHash) failures.push(`${label}: SHA-256 mismatch`);
  if (dimensions) {
    const metadata = await sharp(buffer).metadata();
    if (dimensions.exact && (metadata.width !== dimensions.width || metadata.height !== dimensions.height)) failures.push(`${label}: expected ${dimensions.width}x${dimensions.height}`);
    if (!dimensions.exact && ((metadata.width || 0) < dimensions.width || (metadata.height || 0) < dimensions.height)) failures.push(`${label}: below ${dimensions.width}x${dimensions.height}`);
  }
}

if (requireComplete && recipes.length !== 13) failures.push(`Expected exactly 13 African recipes; found ${recipes.length}`);
if (recipeIds.size !== recipes.length) failures.push("Duplicate African recipe IDs");
if (!contentOnly && photosById.size !== photos.length) failures.push("Duplicate African photo IDs");
if (!contentOnly && (photos.length !== recipes.length || photos.some((photo) => !recipeIds.has(photo.id)))) failures.push("African recipe/photo identity mismatch");
if (!contentOnly && new Set(photos.map((photo) => photo.sourceAssetSha256)).size !== photos.length) failures.push("A finished photograph is reused across African recipes");
const stepCounts = recipes.map((recipe) => recipe.instructions?.length || 0);
if ((requireComplete || recipes.length >= 12) && new Set(stepCounts).size < 3) failures.push("Methods have lost their natural step-count variation");
if (requireComplete || recipes.length >= 12) {
  const frequencies = new Map();
  for (const count of stepCounts) frequencies.set(count, (frequencies.get(count) || 0) + 1);
  if (Math.max(...frequencies.values()) / recipes.length > 2 / 3) failures.push("One exact step count dominates more than two-thirds of the collection");
}

for (const recipe of recipes) {
  if (recipe.cuisine !== "african") failures.push(`${recipe.id}: incorrect cuisine`);
  if (![recipe.prepMinutes, recipe.cookMinutes, recipe.totalMinutes].every((value) => Number.isInteger(value) && value >= 0) || recipe.prepMinutes + recipe.cookMinutes !== recipe.totalMinutes) failures.push(`${recipe.id}: invalid timing`);
  if (!Number.isInteger(recipe.servings) || recipe.servings < 1) failures.push(`${recipe.id}: invalid servings`);
  if (recipe.ingredients.length < 5 || recipe.instructions.length < 3) failures.push(`${recipe.id}: incomplete ingredients or actionable method`);
  if (recipe.sources.length < 2 || new Set(recipe.sources.map((source) => source.url)).size < 2) failures.push(`${recipe.id}: two distinct recipe sources required`);
  for (const source of recipe.sources) if (!source.title?.trim() || !/^https:\/\//.test(source.url || "")) failures.push(`${recipe.id}: invalid source`);
  if (/\b(?:TODO|TBD|PLACEHOLDER)\b|REPLACE_[A-Z0-9_]+/i.test(JSON.stringify(recipe))) failures.push(`${recipe.id}: placeholder text`);
  if (!recipe.visualSpec?.trim()) failures.push(`${recipe.id}: missing finished-photo specification`);
  for (const field of ["region", "name", "description", "storage", "cultureNote", "imageAlt"]) localized(recipe[field], `${recipe.id}.${field}`);
  facts(recipe.storage, `${recipe.id}.storage`);
  for (const field of ["tips", "commonMistakes", "substitutions"]) {
    if ((recipe[field]?.length || 0) < 2) failures.push(`${recipe.id}.${field}: at least two practical notes required`);
    for (const [index, value] of (recipe[field] || []).entries()) {
      localized(value, `${recipe.id}.${field}[${index}]`);
      facts(value, `${recipe.id}.${field}[${index}]`);
    }
  }
  for (const [index, row] of recipe.ingredients.entries()) {
    localized(row.item, `${recipe.id}.ingredients[${index}].item`);
    ingredientFacts(row.item, row.amount, `${recipe.id}.ingredients[${index}].item`);
    if (typeof row.amount === "object") { localized(row.amount, `${recipe.id}.ingredients[${index}].amount`); facts(row.amount, `${recipe.id}.ingredients[${index}].amount`); }
    else if (!/\d/.test(row.amount || "")) failures.push(`${recipe.id}.ingredients[${index}]: unquantified ingredient`);
  }
  for (const [index, entry] of recipe.instructions.entries()) {
    const label = `${recipe.id}.step${index + 1}`;
    localized(entry.title, `${label}.title`);
    localized(entry.body, `${label}.body`);
    facts(entry.body, `${label}.body`);
    if (typeof entry.imageScene !== "string" || entry.imageScene.trim().length < 20) failures.push(`${label}: missing exact intermediate illustration scene`);
  }
  if (contentOnly) continue;
  const photo = photosById.get(recipe.id);
  if (!photo) { failures.push(`${recipe.id}: missing licensed photograph`); continue; }
  if (!photo.realPhoto || !photo.commercialUseVerified || !photo.visualMatchApproved || photo.relation !== "dish-reference") failures.push(`${recipe.id}: photo review flags failed`);
  if (!photo.author?.trim() || !photo.title?.trim()) failures.push(`${recipe.id}: missing photo attribution`);
  if (!/^(?:CC0|Public Domain|CC BY(?:-SA)?)(?:\s|$)/i.test(photo.license || "") || /\b(?:NC|ND)\b/i.test(photo.license || "")) failures.push(`${recipe.id}: photo license disallows the required reuse`);
  if (![photo.sourcePage, photo.originalFile, photo.licenseUrl].every((value) => /^https:\/\//.test(value || ""))) failures.push(`${recipe.id}: incomplete HTTPS photo provenance`);
  await verifyAsset("assets/recipes/approved", photo.sourceAsset, photo.sourceAssetSha256, `${recipe.id}.photo`, { width: 1200, height: 800 });
}

if (contentOnly) {
  if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
  console.log('African content check passed: ' + recipes.length + ' current drafts; five-language fields, sources, method scenes and measurable facts verified. Publication assets are not checked in this mode.');
  process.exit(0);
}

let sets = [];
let illustrations = [];
try {
  sets = (await import("../src/african-illustration-sets.mjs")).africanIllustrationSets;
  illustrations = (await import("../src/recipe-step-illustrations.mjs")).recipeStepIllustrations.filter((entry) => recipeIds.has(entry.recipeId));
} catch (error) { failures.push(`Illustration manifests cannot load: ${error.message}`); }
const setsById = new Map(sets.map((set) => [set.recipeId, set]));
if (sets.length !== recipes.length || setsById.size !== sets.length || sets.some((set) => !recipeIds.has(set.recipeId))) failures.push("African illustration-set identity mismatch");
const expectedSteps = stepCounts.reduce((sum, count) => sum + count, 0);
if (illustrations.length !== expectedSteps) failures.push(`Expected ${expectedSteps} separate step illustrations; found ${illustrations.length}`);
if (new Set(illustrations.map((entry) => entry.sourceAsset)).size !== illustrations.length || new Set(illustrations.map((entry) => entry.sourceAssetSha256)).size !== illustrations.length) failures.push("A African step illustration is reused");

for (const recipe of recipes) {
  const set = setsById.get(recipe.id);
  if (!set) { failures.push(`${recipe.id}: missing illustration set`); continue; }
  const prompt = promptsById.get(recipe.id);
  if (!prompt?.reviewed || prompt.sourceSheet !== set.sourceSheetAsset || prompt.usedPanels !== recipe.instructions.length || JSON.stringify(prompt.cropGrid) !== JSON.stringify(set.cropGrid)) failures.push(`${recipe.id}: illustration source/crop grid differs from the reviewed prompt record`);
  const cropGrid = set.cropGrid;
  if (!cropGrid || [[cropGrid.x, set.grid?.columns, cropGrid.width], [cropGrid.y, set.grid?.rows, cropGrid.height]].some(([bounds, count, size]) => !Array.isArray(bounds) || bounds.length !== count + 1 || bounds[0] !== 0 || bounds.at(-1) !== size || bounds.some((value, index) => !Number.isInteger(value) || (index && value - bounds[index - 1] <= 8)))) failures.push(`${recipe.id}: invalid reviewed pixel crop boundaries`);
  if (set.generator !== "OpenAI image_gen" || set.promptSet !== promptSet || set.generatedAt !== generatedAt || !set.aiGenerated || !set.nonPhotographic || !set.noPeopleOrHands || !set.visualMatchApproved || !set.excludeFromStructuredData || !set.setComplete) failures.push(`${recipe.id}: illustration-set provenance/review failed`);
  if ((set.hashes ?? set.steps ?? []).length !== recipe.instructions.length) failures.push(`${recipe.id}: source set does not have exactly one hash per method step`);
  await verifyAsset("assets/recipes/illustration-sheets-generated", set.sourceSheetAsset?.replace(/^assets\/recipes\/illustration-sheets-generated\//, ""), set.sourceSheetSha256, `${recipe.id}.sheet`, cropGrid ? { width: cropGrid.width, height: cropGrid.height, exact: true } : undefined);
  const entries = illustrations.filter((entry) => entry.recipeId === recipe.id).sort((a, b) => a.step - b.step);
  if (entries.length !== recipe.instructions.length || entries.some((entry, index) => entry.step !== index + 1)) failures.push(`${recipe.id}: method/illustration mapping is not 1:1`);
  for (const entry of entries) {
    if (!entry.aiGenerated || !entry.nonPhotographic || !entry.noPeopleOrHands || !entry.visualMatchApproved || !entry.excludeFromStructuredData || !entry.setComplete || entry.generator !== "OpenAI image_gen" || entry.promptSet !== promptSet || entry.generatedAt !== generatedAt) failures.push(`${entry.id}: illustration provenance/review failed`);
    localized(entry.alt, `${entry.id}.alt`);
    await verifyAsset("assets/recipes/illustrations-generated", entry.sourceAsset, entry.sourceAssetSha256, entry.id, { width: 1672, height: 941, exact: true });
  }
}

if (failures.length) {
  console.error(`African draft audit failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`African draft audit passed: ${recipes.length} five-language recipes, ${photos.length} licensed real photographs, ${expectedSteps} reviewed hand-free illustrations; content facts, mappings and hashes verified.`);
