import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { cuisines, localeOrder, locales, origin } from "../src/data.mjs";
import { infoPages } from "../src/info-pages.mjs";
import { recipes } from "../src/recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const failures = [];

function validateLocalizedText(value, label) {
  if (!value || typeof value !== "object") {
    failures.push(`${label}: missing five-language content`);
    return;
  }
  for (const locale of localeOrder) {
    if (typeof value[locale] !== "string" || !value[locale].trim()) failures.push(`${label}: missing ${locale}`);
  }
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
  for (const type of ["about", "privacy"]) {
    const infoFile = join(dist, slug, type, "index.html");
    await validateHtml(infoFile, `${origin}/${slug}/${type}/`, `${type}/`, slug);
    const infoHtml = await readFile(infoFile, "utf8");
    if (!infoHtml.includes(`data-info-page="${type}"`)) failures.push(`${slug} ${type}: missing page marker`);
    if (!infoPages[slug]?.[type]?.sections?.length) failures.push(`${slug} ${type}: missing localized structured content`);
    if (type === "privacy" && !infoHtml.includes("privacy-references")) failures.push(`${slug} privacy: missing policy references`);
  }
  for (const cuisine of cuisines) await validateHtml(join(dist, slug, "cuisines", cuisine.id, "index.html"), `${origin}/${slug}/cuisines/${cuisine.id}/`, `cuisines/${cuisine.id}/`, slug);
  const chineseCollection = await readFile(join(dist, slug, "cuisines", "chinese", "index.html"), "utf8");
  if (!chineseCollection.includes("recipe-collection")) failures.push(`${slug} Chinese collection missing approved recipe grid`);
  for (const recipe of recipes) {
    const recipeFile = join(dist, slug, "recipes", recipe.id, "index.html");
    await validateHtml(recipeFile, `${origin}/${slug}/recipes/${recipe.id}/`, `recipes/${recipe.id}/`, slug);
    const recipeHtml = await readFile(recipeFile, "utf8");
    if (!recipeHtml.includes('"@type":"Recipe"')) failures.push(`${slug} ${recipe.id}: missing Recipe schema`);
    if (!recipeHtml.includes(recipe.photo.sourcePage) || !recipeHtml.includes(recipe.photo.licenseUrl)) failures.push(`${slug} ${recipe.id}: missing visible photo provenance`);
  }
}

const requiredFiles = ["404.html", "robots.txt", "sitemap.xml", "search-index.json", "favicon.ico", "favicon.svg", "logo.svg", "icon-192.png", "icon-512.png", "og.jpg", "site.webmanifest", "assets/site.css", "assets/site.js", "assets/search.js", "_redirects", "_headers"];
for (const required of requiredFiles) if (!(await exists(join(dist, required)))) failures.push(`missing ${required}`);

const notFound = await readFile(join(dist, "404.html"), "utf8");
if (!notFound.includes('name="robots" content="noindex,follow"')) failures.push("404 must be noindex");
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

for (const recipe of recipes) {
  if (!recipe.photo?.commercialUseVerified || !recipe.photo?.realPhoto || !recipe.photo?.visualMatchApproved) failures.push(`${recipe.id}: recipe bypassed the real-photo approval gate`);
  if (!recipe.photo?.title || !recipe.photo?.author || !recipe.photo?.sourcePage || !recipe.photo?.originalFile || !recipe.photo?.license || !recipe.photo?.licenseUrl || !recipe.photo?.sourceAsset) failures.push(`${recipe.id}: incomplete photo provenance`);
  if (/\b(?:NC|ND)\b/i.test(recipe.photo?.license || "")) failures.push(`${recipe.id}: photo license prohibits required commercial reuse or adaptation`);
  if (!(await exists(join(root, "assets", "recipes", "approved", recipe.photo.sourceAsset || "missing")))) failures.push(`${recipe.id}: approved source photograph is missing`);
  if (recipe.sources.length < 2 || new Set(recipe.sources.map((source) => source.url)).size < 2 || recipe.sources.some((source) => !source.title || !/^https:\/\//.test(source.url))) failures.push(`${recipe.id}: needs at least two distinct titled HTTPS recipe sources`);
  if (recipe.totalMinutes !== recipe.prepMinutes + recipe.cookMinutes || recipe.servings < 1) failures.push(`${recipe.id}: invalid timing or yield`);
  if (recipe.ingredients.length < 5 || recipe.instructions.length < 8 || recipe.instructions.length > 12) failures.push(`${recipe.id}: cooking method must contain 8–12 detailed steps`);
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
      for (const locale of localeOrder) if (/^\s*\d+[.)]\s/.test(step.body?.[locale] || "")) failures.push(`${recipe.id}.instructions[${index}].body.${locale}: duplicates the rendered list number`);
      return;
    }
    validateLocalizedText(step, `${recipe.id}.instructions[${index}]`);
    for (const locale of localeOrder) if (/^\s*\d+[.)]\s/.test(step?.[locale] || "")) failures.push(`${recipe.id}.instructions[${index}].${locale}: duplicates the rendered list number`);
  });
  for (const field of ["tips", "commonMistakes", "substitutions"]) {
    recipe[field].forEach((row, index) => {
      validateLocalizedText(row, `${recipe.id}.${field}[${index}]`);
      for (const locale of localeOrder) if (/^\s*\d+[.)]\s/.test(row?.[locale] || "")) failures.push(`${recipe.id}.${field}[${index}].${locale}: duplicates the rendered list number`);
    });
  }
  for (const width of [640, 960, 1440]) if (!(await exists(join(dist, "images", "recipes", `${recipe.id}-${width}.webp`)))) failures.push(`${recipe.id}: missing ${width}px approved photo crop`);
}

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
console.log("Static audit passed: routes, links, responsive images, search, five-language recipe completeness, real-photo gates, provenance, sitemap, canonical, reciprocal hreflang, social metadata and JSON-LD are valid.");
