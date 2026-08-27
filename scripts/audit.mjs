import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { cuisines, localeOrder, locales, origin } from "../src/data.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const failures = [];

async function exists(path) { try { await stat(path); return true; } catch { return false; } }
function routeToFile(url) {
  const clean = url.split(/[?#]/)[0];
  if (!clean.startsWith("/")) return null;
  const normalized = clean.endsWith("/") ? `${clean}index.html` : clean;
  return join(dist, ...normalized.split("/").filter(Boolean));
}

async function validateHtml(file, expectedCanonical, suffix) {
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
  await validateHtml(join(dist, slug, "index.html"), `${origin}/${slug}/`, "");
  await validateHtml(join(dist, slug, "search", "index.html"), `${origin}/${slug}/search/`, "search/");
  const searchHtml = await readFile(join(dist, slug, "search", "index.html"), "utf8");
  if (!searchHtml.includes('name="robots" content="noindex,follow"')) failures.push(`${slug} search must be noindex`);
  for (const cuisine of cuisines) await validateHtml(join(dist, slug, "cuisines", cuisine.id, "index.html"), `${origin}/${slug}/cuisines/${cuisine.id}/`, `cuisines/${cuisine.id}/`);
}

const requiredFiles = ["404.html", "robots.txt", "sitemap.xml", "search-index.json", "favicon.ico", "favicon.svg", "logo.svg", "icon-192.png", "icon-512.png", "og.jpg", "site.webmanifest", "assets/site.css", "assets/site.js", "assets/search.js", "_redirects", "_headers"];
for (const required of requiredFiles) if (!(await exists(join(dist, required)))) failures.push(`missing ${required}`);

const notFound = await readFile(join(dist, "404.html"), "utf8");
if (!notFound.includes('name="robots" content="noindex,follow"')) failures.push("404 must be noindex");
for (const slug of localeOrder) if (!notFound.includes(`data-not-found-locale="${slug}"`)) failures.push(`404 missing ${slug}`);

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrlCount = localeOrder.length * (1 + cuisines.length);
if (sitemapLocations.length !== expectedUrlCount) failures.push(`sitemap has ${sitemapLocations.length}, expected ${expectedUrlCount}`);
if (sitemapLocations.some((url) => url.includes("/search/"))) failures.push("sitemap must exclude search pages");
for (const url of sitemapLocations) {
  const target = routeToFile(url.replace(origin, ""));
  if (!target || !(await exists(target))) failures.push(`sitemap URL missing output ${url}`);
}

const searchIndex = JSON.parse(await readFile(join(dist, "search-index.json"), "utf8"));
if (searchIndex.length !== localeOrder.length * (cuisines.length + 4)) failures.push("search index count mismatch");
for (const record of searchIndex) if (!localeOrder.includes(record.locale) || !record.title || !record.url || !record.text) failures.push("invalid search record");

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
console.log("Static audit passed: routes, links, images, search index, 404, sitemap, canonical, reciprocal hreflang, social metadata and JSON-LD are valid.");
