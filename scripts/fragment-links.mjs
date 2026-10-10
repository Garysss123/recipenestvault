const hrefAttribute = /(?<![\w:-])href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/giu;
const idAttribute = /(?<![\w:-])id\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/giu;
const namedEntities = new Map([
  ["amp", "&"],
  ["apos", "'"],
  ["gt", ">"],
  ["lt", "<"],
  ["nbsp", "\u00a0"],
  ["quot", '"']
]);

function decodeHtmlAttribute(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z][\da-z]+);/giu, (entity, reference) => {
    if (reference.startsWith("#x") || reference.startsWith("#X")) {
      const codePoint = Number.parseInt(reference.slice(2), 16);
      return Number.isFinite(codePoint) && codePoint <= 0x10ffff && !(codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? String.fromCodePoint(codePoint)
        : "\ufffd";
    }
    if (reference.startsWith("#")) {
      const codePoint = Number.parseInt(reference.slice(1), 10);
      return Number.isFinite(codePoint) && codePoint <= 0x10ffff && !(codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? String.fromCodePoint(codePoint)
        : "\ufffd";
    }
    return namedEntities.get(reference.toLowerCase()) ?? entity;
  });
}

function attributeValues(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => decodeHtmlAttribute(match[1] ?? match[2] ?? match[3] ?? ""));
}

function htmlDocumentPath(pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  let normalizedPath = decodedPath.startsWith("/") ? decodedPath : `/${decodedPath}`;
  if (normalizedPath.endsWith("/")) return `${normalizedPath}index.html`;
  const basename = normalizedPath.slice(normalizedPath.lastIndexOf("/") + 1);
  if (/\.html?$/iu.test(basename)) return normalizedPath;
  if (/\.[^./]+$/u.test(basename)) return null;
  return `${normalizedPath}/index.html`;
}

function idsIn(html) {
  return new Set(attributeValues(html, idAttribute));
}

/**
 * Find same-site links to missing HTML fragment targets.
 * Each page is { path: a site-relative path, html: its HTML source }.
 */
export function findBrokenFragmentLinks(pages, siteOrigin) {
  const baseOrigin = new URL(siteOrigin).origin;
  const documents = new Map();
  const normalizedPages = [];

  for (const page of pages) {
    const pageUrl = new URL(page.path, `${baseOrigin}/`);
    const pagePath = htmlDocumentPath(pageUrl.pathname);
    if (!pagePath) continue;
    const normalizedPage = { path: pagePath, html: page.html, ids: idsIn(page.html) };
    documents.set(pagePath, normalizedPage);
    normalizedPages.push(normalizedPage);
  }

  const broken = [];
  for (const page of normalizedPages) {
    const sourceUrl = new URL(page.path, `${baseOrigin}/`);
    for (const href of attributeValues(page.html, hrefAttribute)) {
      if (!href.trim()) continue;
      let targetUrl;
      try {
        targetUrl = new URL(href.trim(), sourceUrl);
      } catch {
        continue;
      }
      if ((targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") || targetUrl.origin !== baseOrigin || !targetUrl.hash) continue;

      let fragment;
      try {
        fragment = decodeURIComponent(targetUrl.hash.slice(1));
      } catch {
        broken.push({ sourcePath: page.path, href, targetPath: targetUrl.pathname, fragment: targetUrl.hash.slice(1), reason: "invalid fragment encoding" });
        continue;
      }
      if (!fragment) continue;

      const targetPath = htmlDocumentPath(targetUrl.pathname);
      if (!targetPath) continue;
      const targetPage = documents.get(targetPath);
      if (!targetPage) {
        broken.push({ sourcePath: page.path, href, targetPath, fragment, reason: "fragment target page is missing" });
      } else if (!targetPage.ids.has(fragment)) {
        broken.push({ sourcePath: page.path, href, targetPath, fragment, reason: "fragment target id is missing" });
      }
    }
  }

  return broken;
}
