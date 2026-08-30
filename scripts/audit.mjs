import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { cuisines, localeOrder, locales, origin } from "../src/data.mjs";
import { cuisineCollections } from "../src/cuisine-collections.mjs";
import { infoPages } from "../src/info-pages.mjs";
import { recipeProcessPhotos } from "../src/recipe-process-photos.mjs";
import { recipeStepIllustrations } from "../src/recipe-step-illustrations.mjs";
import { recipeUi } from "../src/recipe-ui.mjs";
import { recipes } from "../src/recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const failures = [];
const assetHasher = createHash("sha256");
for (const asset of ["site.css", "site.js", "search.js"]) assetHasher.update(await readFile(join(root, "public", "assets", asset)));
const expectedAssetVersion = assetHasher.digest("hex").slice(0, 12);

function validateLocalizedText(value, label) {
  if (!value || typeof value !== "object") {
    failures.push(`${label}: missing five-language content`);
    return;
  }
  for (const locale of localeOrder) {
    if (typeof value[locale] !== "string" || !value[locale].trim()) failures.push(`${label}: missing ${locale}`);
  }
}

function temperatureFacts(value) {
  return (String(value).match(/\d+(?:[.,]\d+)?\s*(?:°C|℃)/g) || [])
    .map((fact) => fact.replace(/\s/g, "").replace("℃", "°C").replace(",", "."))
    .sort()
    .join("|");
}

function validateLocalizedTemperatures(value, label) {
  const expected = temperatureFacts(value?.en);
  for (const locale of localeOrder) if (temperatureFacts(value?.[locale]) !== expected) failures.push(`${label}.${locale}: temperature facts differ from English`);
}

async function exists(path) { try { await stat(path); return true; } catch { return false; } }
function routeToFile(url) {
  const clean = url.split(/[?#]/)[0];
  if (!clean.startsWith("/")) return null;
  const normalized = clean.endsWith("/") ? `${clean}index.html` : clean;
  return join(dist, ...normalized.split("/").filter(Boolean));
}

async function validateHtml(file, expectedCanonical, suffix, activeSlug) {
  const html = await readFile(file, "utf8");
  const label = relative(dist, file);
  if (!/<html lang="[^"]+">/.test(html)) failures.push(`${label}: missing lang`);
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) failures.push(`${label}: wrong canonical`);
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${label}: missing title`);
  if (!/<meta name="description" content="[^">]+">/.test(html)) failures.push(`${label}: missing description`);
  for (const slug of localeOrder) {
    const expected = `<link rel="alternate" hreflang="${locales[slug].hreflang}" href="${origin}/${slug}/${suffix}">`;
    if (!html.includes(expected)) failures.push(`${label}: missing reciprocal hreflang ${locales[slug].hreflang}`);
  }
  if (!html.includes(`hreflang="x-default" href="${origin}/en/${suffix}"`)) failures.push(`${label}: missing x-default`);
  if (!html.includes(`href="/${activeSlug}/about/"`)) failures.push(`${label}: missing localized About footer link`);
  if (!html.includes(`href="/${activeSlug}/privacy/"`)) failures.push(`${label}: missing localized Privacy footer link`);
  if (!html.includes(`href="/assets/site.css?v=${expectedAssetVersion}"`)) failures.push(`${label}: missing content-versioned stylesheet`);
  if (!html.includes(`src="/assets/site.js?v=${expectedAssetVersion}"`)) failures.push(`${label}: missing content-versioned site script`);
  for (const required of ["og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]) if (!html.includes(required)) failures.push(`${label}: missing ${required}`);
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  try { JSON.parse(jsonLd); } catch { failures.push(`${label}: invalid JSON-LD`); }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|mailto:|#)/.test(url)) continue;
    const target = routeToFile(url);
    if (target && !(await exists(target))) failures.push(`${label}: broken asset/link ${url}`);
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      const target = routeToFile(url);
      if (target && !(await exists(target))) failures.push(`${label}: broken responsive image ${url}`);
    }
  }
}

for (const slug of localeOrder) {
  await validateHtml(join(dist, slug, "index.html"), `${origin}/${slug}/`, "", slug);
  await validateHtml(join(dist, slug, "search", "index.html"), `${origin}/${slug}/search/`, "search/", slug);
  const searchHtml = await readFile(join(dist, slug, "search", "index.html"), "utf8");
  if (!searchHtml.includes('name="robots" content="noindex,follow"')) failures.push(`${slug} search must be noindex`);
  if (!searchHtml.includes(`src="/assets/search.js?v=${expectedAssetVersion}"`)) failures.push(`${slug} search missing content-versioned search script`);
  for (const type of ["about", "privacy"]) {
    const infoFile = join(dist, slug, type, "index.html");
    await validateHtml(infoFile, `${origin}/${slug}/${type}/`, `${type}/`, slug);
    const infoHtml = await readFile(infoFile, "utf8");
    if (!infoHtml.includes(`data-info-page="${type}"`)) failures.push(`${slug} ${type}: missing page marker`);
    if (!infoPages[slug]?.[type]?.sections?.length) failures.push(`${slug} ${type}: missing localized structured content`);
    if (type === "privacy" && !infoHtml.includes("privacy-references")) failures.push(`${slug} privacy: missing policy references`);
  }
  for (const cuisine of cuisines) await validateHtml(join(dist, slug, "cuisines", cuisine.id, "index.html"), `${origin}/${slug}/cuisines/${cuisine.id}/`, `cuisines/${cuisine.id}/`, slug);
  for (const cuisine of cuisines) {
    const cuisineRecipes = recipes.filter((recipe) => recipe.cuisine === cuisine.id);
    if (!cuisineRecipes.length) continue;
    const collectionHtml = await readFile(join(dist, slug, "cuisines", cuisine.id, "index.html"), "utf8");
    if (!collectionHtml.includes("recipe-collection")) failures.push(`${slug} ${cuisine.id} collection missing approved recipe grid`);
    if (!cuisineCollections[cuisine.id]?.[slug]) failures.push(`${slug} ${cuisine.id} collection missing localized editorial copy`);
    for (const recipe of cuisineRecipes) if (!collectionHtml.includes(`/${slug}/recipes/${recipe.id}/`)) failures.push(`${slug} ${cuisine.id} collection missing ${recipe.id}`);
  }
  for (const recipe of recipes) {
    const recipeFile = join(dist, slug, "recipes", recipe.id, "index.html");
    await validateHtml(recipeFile, `${origin}/${slug}/recipes/${recipe.id}/`, `recipes/${recipe.id}/`, slug);
    const recipeHtml = await readFile(recipeFile, "utf8");
    if (!recipeHtml.includes('"@type":"Recipe"')) failures.push(`${slug} ${recipe.id}: missing Recipe schema`);
    if (!recipeHtml.includes(`/${slug}/cuisines/${recipe.cuisine}/`)) failures.push(`${slug} ${recipe.id}: missing cuisine-specific collection route`);
    if (!recipeHtml.includes(cuisineCollections[recipe.cuisine]?.[slug]?.recipeEyebrow || "missing collection eyebrow")) failures.push(`${slug} ${recipe.id}: missing cuisine-specific recipe label`);
    if (!recipeHtml.includes(recipe.photo.sourcePage) || !recipeHtml.includes(recipe.photo.licenseUrl)) failures.push(`${slug} ${recipe.id}: missing visible photo provenance`);
    for (const processPhoto of recipeProcessPhotos.filter((photo) => photo.recipeId === recipe.id)) {
      if (!recipeHtml.includes(`data-step-photo="${processPhoto.id}"`)) failures.push(`${slug} ${recipe.id}: missing approved step photograph ${processPhoto.id}`);
      for (const required of [processPhoto.sourcePage, processPhoto.originalFile, processPhoto.originalPublication, processPhoto.licenseUrl]) {
        if (!recipeHtml.includes(required)) failures.push(`${slug} ${recipe.id}: incomplete visible provenance for ${processPhoto.id}`);
      }
      if (!recipeHtml.includes(`/images/recipes/process/${processPhoto.id}-800.webp`)) failures.push(`${slug} ${recipe.id}: step image missing from markup or JSON-LD`);
    }
    const recipeJsonLd = recipeHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || "";
    for (const illustration of recipeStepIllustrations.filter((entry) => entry.recipeId === recipe.id)) {
      if (!recipeHtml.includes(`data-step-illustration="${illustration.id}"`) || !recipeHtml.includes('data-ai-illustration="true"')) failures.push(`${slug} ${recipe.id}: missing labelled step illustration ${illustration.id}`);
      if (!recipeHtml.includes(`/images/recipes/illustrations/${illustration.id}-800.webp`)) failures.push(`${slug} ${recipe.id}: missing responsive illustration markup ${illustration.id}`);
      if (!recipeHtml.includes(recipeUi[slug].illustrationDisclosure) || !recipeHtml.includes(recipeUi[slug].illustrationShortLabel)) failures.push(`${slug} ${recipe.id}: missing visible illustration disclosure`);
      const sourceCreditCount = recipeHtml.split(recipeUi[slug].illustrationSourceCredit).length - 1;
      if (sourceCreditCount !== 1 || !recipeHtml.includes(`<p class="illustration-source-line">${recipeUi[slug].illustrationSourceCredit}</p>`)) failures.push(`${slug} ${recipe.id}: illustration generator credit must appear once in sources`);
      if (recipeJsonLd.includes(`/images/recipes/illustrations/${illustration.id}`)) failures.push(`${slug} ${recipe.id}: illustration must not enter Recipe structured data`);
    }
  }
}

const requiredFiles = ["404.html", "robots.txt", "sitemap.xml", "search-index.json", "favicon.ico", "favicon.svg", "logo.svg", "icon-192.png", "icon-512.png", "og.jpg", "site.webmanifest", "assets/site.css", "assets/site.js", "assets/search.js", "_redirects", "_headers"];
for (const required of requiredFiles) if (!(await exists(join(dist, required)))) failures.push(`missing ${required}`);

const notFound = await readFile(join(dist, "404.html"), "utf8");
if (!notFound.includes('name="robots" content="noindex,follow"')) failures.push("404 must be noindex");
if (!notFound.includes(`href="/assets/site.css?v=${expectedAssetVersion}"`) || !notFound.includes(`src="/assets/site.js?v=${expectedAssetVersion}"`)) failures.push("404 missing content-versioned assets");
for (const slug of localeOrder) if (!notFound.includes(`data-not-found-locale="${slug}"`)) failures.push(`404 missing ${slug}`);

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrlCount = localeOrder.length * (3 + cuisines.length + recipes.length);
if (sitemapLocations.length !== expectedUrlCount) failures.push(`sitemap has ${sitemapLocations.length}, expected ${expectedUrlCount}`);
if (sitemapLocations.some((url) => url.includes("/search/"))) failures.push("sitemap must exclude search pages");
for (const slug of localeOrder) {
  for (const type of ["about", "privacy"]) if (!sitemapLocations.includes(`${origin}/${slug}/${type}/`)) failures.push(`sitemap missing ${slug} ${type}`);
}
for (const url of sitemapLocations) {
  const target = routeToFile(url.replace(origin, ""));
  if (!target || !(await exists(target))) failures.push(`sitemap URL missing output ${url}`);
}

const searchIndex = JSON.parse(await readFile(join(dist, "search-index.json"), "utf8"));
if (searchIndex.length !== localeOrder.length * (cuisines.length + recipes.length + 4)) failures.push("search index count mismatch");
for (const record of searchIndex) if (!localeOrder.includes(record.locale) || !record.title || !record.url || !record.text) failures.push("invalid search record");
for (const record of searchIndex.filter((entry) => entry.type === "recipe")) if (!record.label) failures.push(`${record.locale} ${record.url}: recipe search result is missing a cuisine-specific label`);

for (const recipe of recipes) {
  if (!recipe.photo?.commercialUseVerified || !recipe.photo?.realPhoto || !recipe.photo?.visualMatchApproved) failures.push(`${recipe.id}: recipe bypassed the real-photo approval gate`);
  if (!recipe.photo?.title || !recipe.photo?.author || !recipe.photo?.sourcePage || !recipe.photo?.originalFile || !recipe.photo?.license || !recipe.photo?.licenseUrl || !recipe.photo?.sourceAsset) failures.push(`${recipe.id}: incomplete photo provenance`);
  if (recipe.photo?.relation !== "dish-reference") failures.push(`${recipe.id}: finished photograph must be labelled as a dish reference`);
  if (![recipe.photo?.sourcePage, recipe.photo?.originalFile, recipe.photo?.licenseUrl].every((url) => /^https:\/\//.test(url || ""))) failures.push(`${recipe.id}: finished-photo provenance URLs must use HTTPS`);
  if (!/^(?:CC0|Public Domain|CC BY(?:-SA)?)(?:\s|$)/i.test(recipe.photo?.license || "")) failures.push(`${recipe.id}: finished-photo license is outside the accepted commercial set`);
  if (/\b(?:NC|ND)\b/i.test(recipe.photo?.license || "")) failures.push(`${recipe.id}: photo license prohibits required commercial reuse or adaptation`);
  if (recipe.photo.cropZoom !== undefined && (!Number.isFinite(recipe.photo.cropZoom) || recipe.photo.cropZoom < 1 || recipe.photo.cropZoom > 2)) failures.push(`${recipe.id}: invalid finished-photo crop zoom`);
  if (["japanese", "korean"].includes(recipe.cuisine) && !/^[a-f0-9]{64}$/i.test(recipe.photo?.sourceAssetSha256 || "")) failures.push(`${recipe.id}: ${recipe.cuisine} finished photograph is missing a pinned SHA-256 hash`);
  if (!(await exists(join(root, "assets", "recipes", "approved", recipe.photo.sourceAsset || "missing")))) failures.push(`${recipe.id}: approved source photograph is missing`);
  if (recipe.photo.sourceAssetSha256 && await exists(join(root, "assets", "recipes", "approved", recipe.photo.sourceAsset))) {
    const digest = createHash("sha256").update(await readFile(join(root, "assets", "recipes", "approved", recipe.photo.sourceAsset))).digest("hex");
    if (digest !== recipe.photo.sourceAssetSha256.toLowerCase()) failures.push(`${recipe.id}: approved source photograph hash changed`);
  }
  if (recipe.sources.length < 2 || new Set(recipe.sources.map((source) => source.url)).size < 2 || recipe.sources.some((source) => !source.title || !/^https:\/\//.test(source.url))) failures.push(`${recipe.id}: needs at least two distinct titled HTTPS recipe sources`);
  if (recipe.totalMinutes !== recipe.prepMinutes + recipe.cookMinutes || recipe.servings < 1) failures.push(`${recipe.id}: invalid timing or yield`);
  if (recipe.ingredients.length < 5 || recipe.instructions.length < 4) failures.push(`${recipe.id}: cooking method needs at least four detailed, independently actionable steps; no fixed upper limit is imposed`);
  const ingredientKeys = recipe.ingredients.map((row) => row.item?.en?.trim().toLowerCase()).filter(Boolean);
  if (new Set(ingredientKeys).size !== ingredientKeys.length) failures.push(`${recipe.id}: duplicate ingredient rows`);
  for (const field of ["region", "name", "description", "storage", "cultureNote", "imageAlt"]) validateLocalizedText(recipe[field], `${recipe.id}.${field}`);
  recipe.ingredients.forEach((row, index) => {
    if (row.amount && typeof row.amount === "object") {
      validateLocalizedText(row.amount, `${recipe.id}.ingredients[${index}].amount`);
      for (const locale of localeOrder) if (!/\d/.test(row.amount?.[locale] || "")) failures.push(`${recipe.id}.ingredients[${index}].amount.${locale}: missing exact amount`);
    } else if (!row.amount || !/\d/.test(row.amount)) {
      failures.push(`${recipe.id}.ingredients[${index}]: missing exact amount`);
    } else if (/[A-Za-z]{2,}/.test(row.amount.replace(/\b(?:ml|kg)\b/gi, ""))) {
      failures.push(`${recipe.id}.ingredients[${index}]: shared amount contains untranslated words`);
    }
    validateLocalizedText(row.item, `${recipe.id}.ingredients[${index}].item`);
  });
  recipe.instructions.forEach((step, index) => {
    if (step?.title && step?.body) {
      validateLocalizedText(step.title, `${recipe.id}.instructions[${index}].title`);
      validateLocalizedText(step.body, `${recipe.id}.instructions[${index}].body`);
      validateLocalizedTemperatures(step.body, `${recipe.id}.instructions[${index}].body`);
      for (const locale of localeOrder) if (/^\s*\d+[.)]\s/.test(step.body?.[locale] || "")) failures.push(`${recipe.id}.instructions[${index}].body.${locale}: duplicates the rendered list number`);
      return;
    }
    validateLocalizedText(step, `${recipe.id}.instructions[${index}]`);
    validateLocalizedTemperatures(step, `${recipe.id}.instructions[${index}]`);
    for (const locale of localeOrder) if (/^\s*\d+[.)]\s/.test(step?.[locale] || "")) failures.push(`${recipe.id}.instructions[${index}].${locale}: duplicates the rendered list number`);
  });
  for (const field of ["tips", "commonMistakes", "substitutions"]) {
    recipe[field].forEach((row, index) => {
      validateLocalizedText(row, `${recipe.id}.${field}[${index}]`);
      for (const locale of localeOrder) if (/^\s*\d+[.)]\s/.test(row?.[locale] || "")) failures.push(`${recipe.id}.${field}[${index}].${locale}: duplicates the rendered list number`);
    });
  }
  validateLocalizedTemperatures(recipe.storage, `${recipe.id}.storage`);
  for (const width of [640, 960, 1440]) if (!(await exists(join(dist, "images", "recipes", `${recipe.id}-${width}.webp`)))) failures.push(`${recipe.id}: missing ${width}px approved photo crop`);
}

const processPhotoIds = new Set();
const processStepKeys = new Set();
for (const photo of recipeProcessPhotos) {
  const stepKey = `${photo.recipeId}:${photo.step}`;
  const recipe = recipes.find((entry) => entry.id === photo.recipeId);
  if (processPhotoIds.has(photo.id)) failures.push(`${photo.id}: duplicate process photo id`);
  processPhotoIds.add(photo.id);
  if (processStepKeys.has(stepKey)) failures.push(`${stepKey}: more than one process photo assigned to a step`);
  processStepKeys.add(stepKey);
  if (!recipe) failures.push(`${photo.id}: process photograph references an unpublished recipe`);
  if (!Number.isInteger(photo.step) || photo.step < 1 || (recipe && photo.step > recipe.instructions.length)) failures.push(`${photo.id}: invalid recipe step ${photo.step}`);
  if (!photo.commercialUseVerified || !photo.adaptationAllowed || !photo.realPhoto || !photo.visualMatchApproved) failures.push(`${photo.id}: process photograph bypassed an approval gate`);
  if (!photo.title || !photo.author || !photo.sourcePage || !photo.originalFile || !photo.originalPublication || !photo.license || !photo.licenseUrl || !photo.frameTimestamp || !photo.sourceAsset || !photo.sourceAssetSha256) failures.push(`${photo.id}: incomplete video-frame provenance`);
  if (photo.relation !== "separately-sourced-technique-reference") failures.push(`${photo.id}: separately sourced image must be explicitly labelled as a technique reference`);
  if (/\b(?:NC|ND)\b/i.test(photo.license || "")) failures.push(`${photo.id}: process photo license prohibits commercial reuse or adaptation`);
  if (!/^https:\/\//.test(photo.sourcePage || "") || !/^https:\/\//.test(photo.originalFile || "") || !/^https:\/\//.test(photo.originalPublication || "") || !/^https:\/\//.test(photo.licenseUrl || "")) failures.push(`${photo.id}: provenance URLs must use HTTPS`);
  if (!/^\d{2}:\d{2}:\d{2}\.\d{3}$/.test(photo.frameTimestamp || "")) failures.push(`${photo.id}: frame timestamp must be exact to milliseconds`);
  for (const field of ["alt", "caption", "modifications"]) validateLocalizedText(photo[field], `${photo.id}.${field}`);
  const source = join(root, "assets", "recipes", "process-approved", photo.sourceAsset || "missing");
  if (!(await exists(source))) {
    failures.push(`${photo.id}: approved process source frame is missing`);
  } else {
    const digest = createHash("sha256").update(await readFile(source)).digest("hex");
    if (digest !== (photo.sourceAssetSha256 || "").toLowerCase()) failures.push(`${photo.id}: approved source frame hash changed`);
  }
  for (const width of [480, 800]) if (!(await exists(join(dist, "images", "recipes", "process", `${photo.id}-${width}.webp`)))) failures.push(`${photo.id}: missing ${width}px process image`);
}

const illustrationIds = new Set();
const illustrationStepKeys = new Set();
const illustrationPromptSets = new Set();
for (const illustration of recipeStepIllustrations) {
  const stepKey = `${illustration.recipeId}:${illustration.step}`;
  const recipe = recipes.find((entry) => entry.id === illustration.recipeId);
  if (illustrationIds.has(illustration.id)) failures.push(`${illustration.id}: duplicate step illustration id`);
  illustrationIds.add(illustration.id);
  if (illustrationStepKeys.has(stepKey)) failures.push(`${stepKey}: more than one illustration assigned to a step`);
  illustrationStepKeys.add(stepKey);
  if (processStepKeys.has(stepKey)) failures.push(`${stepKey}: real process photography and AI illustration cannot occupy the same step`);
  if (!recipe) failures.push(`${illustration.id}: illustration references an unpublished recipe`);
  if (!Number.isInteger(illustration.step) || illustration.step < 1 || (recipe && illustration.step > recipe.instructions.length)) failures.push(`${illustration.id}: invalid illustrated step ${illustration.step}`);
  if (illustration.kind !== "ai-generated-step-illustration" || !illustration.aiGenerated || !illustration.nonPhotographic || !illustration.visualMatchApproved || !illustration.excludeFromStructuredData) failures.push(`${illustration.id}: illustration bypassed the AI-disclosure or visual-match gate`);
  if (!illustration.generator || !illustration.generatedAt || !illustration.promptSet || !illustration.sourceAsset || !illustration.sourceAssetSha256) failures.push(`${illustration.id}: incomplete illustration provenance`);
  illustrationPromptSets.add(illustration.promptSet);
  validateLocalizedText(illustration.alt, `${illustration.id}.alt`);
  if (Object.values(illustration.alt || {}).some((value) => /\bAI\b|OpenAI/i.test(value))) failures.push(`${illustration.id}: generator wording belongs in Sources, not image alt text`);
  const source = join(root, "assets", "recipes", "illustrations-generated", illustration.sourceAsset || "missing");
  if (!(await exists(source))) {
    failures.push(`${illustration.id}: generated illustration source is missing`);
  } else {
    const digest = createHash("sha256").update(await readFile(source)).digest("hex");
    if (digest !== (illustration.sourceAssetSha256 || "").toLowerCase()) failures.push(`${illustration.id}: generated illustration source hash changed`);
  }
  for (const width of [480, 800, 1200]) if (!(await exists(join(dist, "images", "recipes", "illustrations", `${illustration.id}-${width}.webp`)))) failures.push(`${illustration.id}: missing ${width}px illustration crop`);
}
const completedIllustrationRecipeIds = new Set(recipeStepIllustrations.filter((illustration) => illustration.setComplete).map((illustration) => illustration.recipeId));
for (const recipeId of completedIllustrationRecipeIds) {
  const recipe = recipes.find((entry) => entry.id === recipeId);
  const illustratedSteps = recipeStepIllustrations.filter((illustration) => illustration.recipeId === recipeId).map((illustration) => illustration.step).sort((a, b) => a - b);
  if (!recipe || illustratedSteps.length !== recipe.instructions.length || illustratedSteps.some((step, index) => step !== index + 1)) failures.push(`${recipeId}: complete illustration set must cover every recipe step exactly once`);
}
for (const recipe of recipes) {
  const illustratedSteps = recipeStepIllustrations.filter((illustration) => illustration.recipeId === recipe.id).map((illustration) => illustration.step);
  if (new Set(illustratedSteps).size !== illustratedSteps.length) failures.push(`${recipe.id}: a cooking step has more than one illustration`);
}
const japaneseRecipeCount = recipes.filter((recipe) => recipe.cuisine === "japanese").length;
if (japaneseRecipeCount > 0 && japaneseRecipeCount < 20) failures.push(`Japanese collection has ${japaneseRecipeCount} recipes; at least 20 are required`);
const koreanRecipeCount = recipes.filter((recipe) => recipe.cuisine === "korean").length;
if (koreanRecipeCount > 0 && koreanRecipeCount < 20) failures.push(`Korean collection has ${koreanRecipeCount} recipes; at least 20 are required`);
const onigiri = recipes.find((recipe) => recipe.id === "onigiri");
if (onigiri && onigiri.instructions.length !== 5) failures.push(`onigiri natural-step regression: expected 5 independently actionable steps, found ${onigiri.instructions.length}`);
if (!recipes.some((recipe) => recipe.instructions.length > 12)) failures.push("natural-step regression: no complex published method exceeds twelve steps");
for (const promptSet of illustrationPromptSets) if (!(await exists(join(root, "docs", "illustration-prompts", `${promptSet}.md`)))) failures.push(`${promptSet}: illustration prompt record is missing`);
for (const locale of localeOrder) {
  if (/\bAI\b|OpenAI/i.test(`${recipeUi[locale].illustrationDisclosure} ${recipeUi[locale].illustrationShortLabel}`)) failures.push(`${locale}: generator wording belongs in Sources, not the method notice or per-image label`);
  if (!recipeUi[locale].illustrationSourceCredit.includes("OpenAI image_gen")) failures.push(`${locale}: generator provenance is missing from Sources copy`);
}
if (recipeUi["zh-hant"].illustrationDisclosure !== "以下料理步驟圖片為插畫靜態示意圖，並非實拍。實際操作請以文字中的份量、火力、時間與熟度判斷為準。") failures.push("zh-hant: cooking-step illustration notice changed from the approved wording");
if (recipeUi["zh-hant"].illustrationShortLabel !== "料理步驟示意圖，非實拍") failures.push("zh-hant: cooking-step illustration label changed from the approved wording");
if (recipeUi["zh-hant"].illustrationSourceCredit !== "步驟示意圖：Recipe Nest Vault 使用 OpenAI image_gen 製作的原創示意圖。") failures.push("zh-hant: illustration source credit changed from the approved wording");

const redirects = await readFile(join(dist, "_redirects"), "utf8");
if (!redirects.includes("/ /en/ 301")) failures.push("root redirect must be permanent");
if (!redirects.includes("/index.html /en/ 301")) failures.push("index redirect missing");

const headers = await readFile(join(dist, "_headers"), "utf8");
if (!headers.includes("script-src 'self' https://static.cloudflareinsights.com")) failures.push("CSP must allow the Cloudflare Web Analytics script");
if (!headers.includes("connect-src 'self' https://cloudflareinsights.com")) failures.push("CSP must allow the Cloudflare Web Analytics beacon");

async function walk(dir) {
  const output = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    entry.isDirectory() ? output.push(...await walk(path)) : output.push(path);
  }
  return output;
}
const files = await walk(dist);
const sizes = await Promise.all(files.map(async (file) => ({ file, size: (await stat(file)).size })));
sizes.sort((a, b) => b.size - a.size);
if (sizes[0].size > 25 * 1024 * 1024) failures.push(`largest output exceeds Pages limit: ${sizes[0].file}`);

console.log(`Static audit: ${files.length} files, ${expectedUrlCount} indexable routes; largest ${sizes[0].size} bytes (${relative(root, sizes[0].file)}).`);
if (failures.length) { console.error(`Audit failed (${failures.length}):\n- ${failures.slice(0, 60).join("\n- ")}`); process.exit(1); }
console.log("Static audit passed: routes, links, responsive images, search, five-language recipe completeness, finished/process real-photo gates, labelled AI-illustration gates, provenance, sitemap, canonical, reciprocal hreflang, social metadata and JSON-LD are valid.");
