import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist", import.meta.url));
const locales = ["en", "zh-hant", "ja", "ko", "th"];
const failures = [];

for (const locale of locales) {
  const file = join(dist, locale, "index.html");
  const html = await readFile(file, "utf8");
  const requirements = [
    [`lang for ${locale}`, /<html lang="[^"]+">/],
    [`canonical for ${locale}`, new RegExp(`rel="canonical" href="https://recipenestvault\\.com/${locale}/"`)],
    [`x-default for ${locale}`, /hreflang="x-default"/],
    [`JSON-LD for ${locale}`, /application\/ld\+json/],
    [`description for ${locale}`, /<meta name="description" content=".+">/]
  ];
  for (const [name, pattern] of requirements) if (!pattern.test(html)) failures.push(name);
}

for (const required of ["index.html", "robots.txt", "sitemap.xml", "favicon.svg", "assets/site.css", "_redirects"]) {
  try { await stat(join(dist, required)); } catch { failures.push(`missing ${required}`); }
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path)); else out.push(path);
  }
  return out;
}
const files = await walk(dist);
const sizes = await Promise.all(files.map(async (file) => ({ file, size: (await stat(file)).size })));
const largest = sizes.sort((a, b) => b.size - a.size)[0];
console.log(`Static audit: ${files.length} files; largest ${largest.size} bytes (${largest.file.replace(dist, "dist")})`);

if (failures.length) {
  console.error(`Audit failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Static audit passed: five locale routes, canonical, hreflang, metadata and required assets are present.");

