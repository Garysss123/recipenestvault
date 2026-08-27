import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cuisines, featured, fill, localeOrder, locales, origin, regionOrder } from "../src/data.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const buildDate = "2026-08-28";
const adsenseClient = /^ca-pub-\d+$/.test(process.env.ADSENSE_CLIENT ?? "") ? process.env.ADSENSE_CLIENT : "";
const adsenseSlot = /^\d+$/.test(process.env.ADSENSE_SLOT_CONTENT ?? "") ? process.env.ADSENSE_SLOT_CONTENT : "";
const adsEnabled = Boolean(adsenseClient && adsenseSlot);

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function json(value) { return JSON.stringify(value).replaceAll("<", "\\u003c"); }
function routePath(locale, suffix = "") { return `/${locale}/${suffix}`.replaceAll("//", "/"); }

function alternateLinks(suffix = "") {
  const links = localeOrder.map((slug) => `<link rel="alternate" hreflang="${locales[slug].hreflang}" href="${origin}${routePath(slug, suffix)}">`);
  links.push(`<link rel="alternate" hreflang="x-default" href="${origin}${routePath("en", suffix)}">`);
  return links.join("\n  ");
}

function languageMenu(activeSlug, suffix = "") {
  const locale = locales[activeSlug];
  return `<details class="language-menu">
    <summary aria-label="${esc(locale.ui.language)}"><span aria-hidden="true">文</span><span>${esc(locale.ui.language)}</span></summary>
    <div class="language-popover">
      ${localeOrder.map((slug) => `<a href="${routePath(slug, suffix)}" lang="${locales[slug].lang}" hreflang="${locales[slug].hreflang}"${slug === activeSlug ? ' aria-current="page"' : ""}>${esc(locales[slug].label)}</a>`).join("\n      ")}
    </div>
  </details>`;
}

function header(slug, suffix = "") {
  const locale = locales[slug];
  return `<header class="site-header" data-header>
    <div class="header-inner">
      <a class="brand" href="/${slug}/" aria-label="Recipe Nest Vault — ${esc(locale.ui.home)}"><img src="/logo.svg" width="42" height="42" alt="" aria-hidden="true"><span>Recipe Nest Vault</span></a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-button><span>${esc(locale.ui.menu)}</span><i aria-hidden="true"></i></button>
      <nav class="primary-nav" id="primary-nav" aria-label="${esc(locale.ui.menu)}" data-nav>
        <a href="/${slug}/#cuisines">${esc(locale.ui.explore)}</a><a href="/${slug}/#featured">${esc(locale.ui.featured)}</a><a href="/${slug}/#philosophy">${esc(locale.ui.philosophy)}</a><a class="nav-search" href="/${slug}/search/"><span aria-hidden="true">⌕</span>${esc(locale.ui.search)}</a>
      </nav>
      ${languageMenu(slug, suffix)}
    </div>
  </header>`;
}

function footer(slug) {
  const locale = locales[slug];
  return `<footer class="site-footer"><div class="footer-main"><div><a class="brand footer-brand" href="/${slug}/"><img src="/logo.svg" width="42" height="42" alt=""><span>Recipe Nest Vault</span></a><p>${esc(locale.ui.footerTagline)}</p></div><nav aria-label="${esc(locale.ui.menu)}"><a href="/${slug}/#cuisines">${esc(locale.ui.explore)}</a><a href="/${slug}/#philosophy">${esc(locale.ui.about)}</a><a href="/${slug}/#credits">${esc(locale.ui.creditsTitle)}</a><a href="/${slug}/search/">${esc(locale.ui.search)}</a></nav></div><div class="footer-base"><p>${esc(locale.ui.copyright)}</p><p>recipenestvault.com</p></div></footer>`;
}

function adSlot(slug, placement) {
  const label = locales[slug].ui.advertisement ?? "Advertisement";
  if (!adsEnabled) return `<div class="ad-slot ad-slot--inactive" data-ad-component="${placement}" hidden></div>`;
  return `<aside class="ad-slot" aria-label="${esc(label)}" data-ad-component="${placement}"><span class="ad-label">${esc(label)}</span><ins class="adsbygoogle" style="display:block" data-ad-client="${adsenseClient}" data-ad-slot="${adsenseSlot}" data-ad-format="auto" data-full-width-responsive="true"></ins></aside>`;
}

function documentHead(slug, { title, description, suffix = "", robots = "index,follow,max-image-preview:large", schema, bodyClass = "" }) {
  const locale = locales[slug];
  const canonical = `${origin}${routePath(slug, suffix)}`;
  return { bodyClass, html: `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robots}">
  <link rel="canonical" href="${canonical}">
  ${alternateLinks(suffix)}
  <meta property="og:type" content="website"><meta property="og:site_name" content="Recipe Nest Vault"><meta property="og:locale" content="${locale.ogLocale}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${origin}/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Recipe Nest Vault — ${esc(locale.ui.headline)}">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${origin}/og.jpg">
  <meta name="theme-color" content="#b4235a"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icon-192.png"><link rel="manifest" href="/site.webmanifest"><link rel="stylesheet" href="/assets/site.css">
  ${adsEnabled ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}" crossorigin="anonymous"></script>` : ""}<script type="application/ld+json">${json(schema)}</script>` };
}

function page(slug, headOptions, content, suffix = "") {
  const locale = locales[slug];
  const head = documentHead(slug, { ...headOptions, suffix });
  return `<!doctype html><html lang="${locale.lang}"><head>${head.html}</head><body class="${head.bodyClass}"><a class="skip-link" href="#main">${esc(locale.ui.skip)}</a>${header(slug, suffix)}<main id="main">${content}</main>${footer(slug)}<script src="/assets/site.js" defer></script></body></html>`;
}

function picture(image, alt, priority = false) {
  return `<picture><source srcset="/images/${image}-640.webp 640w, /images/${image}-960.webp 960w, /images/${image}-1440.webp 1440w" type="image/webp"><img src="/images/${image}-960.webp" srcset="/images/${image}-640.webp 640w, /images/${image}-960.webp 960w, /images/${image}-1440.webp 1440w" sizes="(max-width: 760px) 100vw, 50vw" width="960" height="720" alt="${esc(alt)}" ${priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}></picture>`;
}

function cuisineCards(slug, region) {
  const locale = locales[slug];
  return cuisines.filter((item) => item.region === region).map((item, index) => `<a class="cuisine-card" href="/${slug}/cuisines/${item.id}/"><span class="cuisine-index">${String(index + 1).padStart(2, "0")}</span><strong>${esc(item.names[slug])}</strong><span>${esc(fill(locale.ui.viewCuisine, { cuisine: item.names[slug] }))}<b aria-hidden="true">↗</b></span></a>`).join("\n");
}

function renderHome(slug) {
  const locale = locales[slug];
  const featuredCards = featured.map((item) => { const cuisine = cuisines.find((entry) => entry.id === item.cuisine); return `<article class="recipe-card" id="preview-${item.id}"><div class="recipe-image">${picture(item.image, locale.imageAlts[item.image])}<span>${esc(locale.ui.collectionPreview)}</span></div><div class="recipe-card-body"><p>${esc(cuisine.names[slug])}</p><h3>${esc(locale.featuredNames[item.id])}</h3></div></article>`; }).join("\n");
  const creditRows = featured.map((item) => `<li><strong>${esc(locale.featuredNames[item.id])}</strong> — ${esc(locale.ui.by)} Recipe Nest Vault + OpenAI · ${esc(locale.ui.siteOwned)} · <a href="/images/${item.image}-1440.webp">${esc(locale.ui.source)}</a></li>`).join("\n");
  const content = `<section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">${esc(locale.ui.eyebrow)}</p><h1 id="hero-title">${esc(locale.ui.headline)}</h1><p class="hero-lede">${esc(locale.ui.subhead)}</p><form class="search-box" action="/${slug}/search/" method="get" role="search"><label class="sr-only" for="hero-search-${slug}">${esc(locale.ui.placeholder)}</label><span aria-hidden="true">⌕</span><input id="hero-search-${slug}" name="q" type="search" autocomplete="off" placeholder="${esc(locale.ui.placeholder)}"><button type="submit">${esc(locale.ui.searchButton)}</button></form><p class="search-hint">${esc(locale.ui.searchHint)}</p></div><div class="hero-media">${picture("sushi", locale.imageAlts.sushi, true)}<a href="#credits">${esc(locale.ui.creditsTitle)}</a></div></section>
  ${adSlot(slug, "home-leaderboard")}
  <section class="intro-section" id="cuisines"><p class="section-number">01</p><div><p class="eyebrow">${esc(locale.ui.explore)}</p><h2>${esc(locale.ui.exploreTitle)}</h2><p class="section-lede">${esc(locale.ui.exploreIntro)}</p></div></section>
  ${regionOrder.map((region, regionIndex) => `<section class="cuisine-region" aria-labelledby="region-${region}"><div class="region-heading"><p>0${regionIndex + 2}</p><div><h2 id="region-${region}">${esc(locale.regionNames[region])}</h2><p>${esc(locale.ui.regionIntro)}</p></div></div><div class="cuisine-grid">${cuisineCards(slug, region)}</div></section>`).join("\n")}
  <section class="featured-section" id="featured" aria-labelledby="featured-title"><div class="featured-heading"><p class="eyebrow">${esc(locale.ui.featured)}</p><h2 id="featured-title">${esc(locale.ui.featuredTitle)}</h2><p>${esc(locale.ui.featuredIntro)}</p></div><div class="recipe-grid">${featuredCards}</div></section>
  ${adSlot(slug, "home-content")}
  <section class="philosophy-section" id="philosophy" aria-labelledby="philosophy-title"><div class="philosophy-copy"><p class="eyebrow">${esc(locale.ui.philosophyEyebrow)}</p><h2 id="philosophy-title">${esc(locale.ui.philosophyTitle)}</h2><p>${esc(locale.ui.philosophyBody)}</p></div><ol class="principles"><li><span>01</span><div><h3>${esc(locale.ui.principle1Title)}</h3><p>${esc(locale.ui.principle1Body)}</p></div></li><li><span>02</span><div><h3>${esc(locale.ui.principle2Title)}</h3><p>${esc(locale.ui.principle2Body)}</p></div></li><li><span>03</span><div><h3>${esc(locale.ui.principle3Title)}</h3><p>${esc(locale.ui.principle3Body)}</p></div></li></ol></section>
  <section class="credits-section" id="credits" aria-labelledby="credits-title"><div><p class="section-number">07</p><h2 id="credits-title">${esc(locale.ui.creditsTitle)}</h2><p>${esc(locale.ui.creditsIntro)}</p></div><ul>${creditRows}<li>${esc(locale.ui.generatedCredit)} · <a href="/og.jpg">${esc(locale.ui.source)}</a></li></ul></section>`;
  const schema = { "@context": "https://schema.org", "@graph": [ { "@type": "WebSite", "@id": `${origin}/#website`, name: "Recipe Nest Vault", url: origin, inLanguage: locale.lang, potentialAction: { "@type": "SearchAction", target: `${origin}/${slug}/search/?q={search_term_string}`, "query-input": "required name=search_term_string" } }, { "@type": "Organization", "@id": `${origin}/#organization`, name: "Recipe Nest Vault", url: origin, logo: `${origin}/logo.svg` } ] };
  return page(slug, { title: locale.metaTitle, description: locale.metaDescription, schema, bodyClass: "home-page" }, content);
}

function renderCuisine(slug, cuisine) {
  const locale = locales[slug]; const name = cuisine.names[slug]; const suffix = `cuisines/${cuisine.id}/`; const title = `${name} — Recipe Nest Vault`; const description = fill(locale.ui.cuisinePageBody, { cuisine: name });
  const siblings = cuisines.filter((item) => item.region === cuisine.region && item.id !== cuisine.id).slice(0, 4);
  const content = `<section class="page-hero cuisine-hero"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/${slug}/">${esc(locale.ui.home)}</a><span>/</span><a href="/${slug}/#cuisines">${esc(locale.ui.explore)}</a></nav><p class="eyebrow">${esc(locale.ui.cuisineLabel)}</p><h1>${esc(name)}</h1><p>${esc(description)}</p></section>${adSlot(slug, "cuisine-leaderboard")}<section class="coming-section"><div><p class="section-number">01</p><h2>${esc(locale.ui.comingTitle)}</h2><p>${esc(locale.ui.comingBody)}</p></div><div class="coming-visual" aria-hidden="true"><span></span><i></i><b></b></div></section><section class="more-cuisines"><h2>${esc(locale.ui.exploreMore)}</h2><div class="cuisine-grid">${siblings.map((item, index) => `<a class="cuisine-card" href="/${slug}/cuisines/${item.id}/"><span class="cuisine-index">0${index + 1}</span><strong>${esc(item.names[slug])}</strong><span>${esc(fill(locale.ui.viewCuisine, { cuisine: item.names[slug] }))}<b aria-hidden="true">↗</b></span></a>`).join("")}</div></section>`;
  const schema = { "@context": "https://schema.org", "@graph": [ { "@type": "CollectionPage", name, description, url: `${origin}/${slug}/${suffix}`, inLanguage: locale.lang, isPartOf: { "@id": `${origin}/#website` } }, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: locale.ui.home, item: `${origin}/${slug}/` }, { "@type": "ListItem", position: 2, name } ] } ] };
  return page(slug, { title, description, schema, bodyClass: "cuisine-page" }, content, suffix);
}

function renderSearch(slug) {
  const locale = locales[slug]; const suffix = "search/"; const title = `${locale.ui.searchTitle} — Recipe Nest Vault`;
  const content = `<section class="page-hero search-hero"><p class="eyebrow">${esc(locale.ui.search)}</p><h1>${esc(locale.ui.searchTitle)}</h1><p>${esc(locale.ui.searchIntro)}</p><form class="search-box" action="/${slug}/search/" method="get" role="search" data-search-form><label class="sr-only" for="search-${slug}">${esc(locale.ui.placeholder)}</label><span aria-hidden="true">⌕</span><input id="search-${slug}" name="q" type="search" autocomplete="off" placeholder="${esc(locale.ui.placeholder)}"><button type="submit">${esc(locale.ui.searchButton)}</button></form></section><section class="search-results" aria-live="polite" data-search-results data-locale="${slug}" data-count-template="${esc(locale.ui.resultCount)}" data-empty-title="${esc(locale.ui.emptyTitle)}" data-empty-body="${esc(locale.ui.emptyBody)}" data-start="${esc(locale.ui.startTyping)}" data-cuisine-label="${esc(locale.ui.cuisineLabel)}" data-preview-label="${esc(locale.ui.collectionPreview)}"><p>${esc(locale.ui.startTyping)}</p></section>`;
  const schema = { "@context": "https://schema.org", "@type": "SearchResultsPage", name: locale.ui.searchTitle, url: `${origin}/${slug}/${suffix}`, inLanguage: locale.lang, isPartOf: { "@id": `${origin}/#website` } };
  return page(slug, { title, description: locale.ui.searchIntro, robots: "noindex,follow", schema, bodyClass: "search-page" }, content, suffix).replace("<script src=\"/assets/site.js\" defer></script>", "<script src=\"/assets/site.js\" defer></script><script src=\"/assets/search.js\" defer></script>");
}

function render404() {
  const sections = localeOrder.map((slug, index) => { const locale = locales[slug]; return `<section class="not-found-copy" lang="${locale.lang}" data-not-found-locale="${slug}"${index ? " hidden" : ""}><p class="eyebrow">404</p><h1>${esc(locale.ui.notFoundTitle)}</h1><p>${esc(locale.ui.notFoundBody)}</p><a class="primary-button" href="/${slug}/">${esc(locale.ui.backHome)}</a></section>`; }).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found — Recipe Nest Vault</title><meta name="robots" content="noindex,follow"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/site.css"></head><body class="not-found-page"><main id="main"><a class="brand" href="/en/" aria-label="Recipe Nest Vault"><img src="/logo.svg" width="42" height="42" alt=""><span>Recipe Nest Vault</span></a>${sections}<nav class="not-found-languages" aria-label="Choose language">${localeOrder.map((slug) => `<a href="/${slug}/" lang="${locales[slug].lang}">${esc(locales[slug].label)}</a>`).join("")}</nav></main><script src="/assets/site.js" defer></script></body></html>`;
}

await rm(dist, { recursive: true, force: true }); await mkdir(dist, { recursive: true }); await cp(join(root, "public"), dist, { recursive: true });
const sitemapUrls = []; const searchIndex = [];
for (const slug of localeOrder) {
  const homeDir = join(dist, slug); await mkdir(homeDir, { recursive: true }); await writeFile(join(homeDir, "index.html"), renderHome(slug), "utf8"); sitemapUrls.push(`${origin}/${slug}/`);
  const searchDir = join(homeDir, "search"); await mkdir(searchDir, { recursive: true }); await writeFile(join(searchDir, "index.html"), renderSearch(slug), "utf8");
  for (const cuisine of cuisines) {
    const cuisineDir = join(homeDir, "cuisines", cuisine.id); await mkdir(cuisineDir, { recursive: true }); await writeFile(join(cuisineDir, "index.html"), renderCuisine(slug, cuisine), "utf8"); sitemapUrls.push(`${origin}/${slug}/cuisines/${cuisine.id}/`);
    searchIndex.push({ locale: slug, type: "cuisine", title: cuisine.names[slug], subtitle: locales[slug].regionNames[cuisine.region], url: `/${slug}/cuisines/${cuisine.id}/`, text: [cuisine.names[slug], locales[slug].regionNames[cuisine.region], ...cuisine.keywords].join(" ") });
  }
  for (const item of featured) { const cuisine = cuisines.find((entry) => entry.id === item.cuisine); searchIndex.push({ locale: slug, type: "preview", title: locales[slug].featuredNames[item.id], subtitle: cuisine.names[slug], url: `/${slug}/#preview-${item.id}`, text: `${locales[slug].featuredNames[item.id]} ${cuisine.names[slug]} ${cuisine.keywords.join(" ")}` }); }
}
await writeFile(join(dist, "search-index.json"), `${JSON.stringify(searchIndex)}\n`, "utf8"); await writeFile(join(dist, "404.html"), render404(), "utf8");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc><lastmod>${buildDate}</lastmod></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8"); await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, "utf8");
await writeFile(join(dist, "_redirects"), ["/ /en/ 301", "/index.html /en/ 301", ...localeOrder.map((slug) => `/${slug} /${slug}/ 301`)].join("\n") + "\n", "utf8");
const scriptSources = adsEnabled ? "'self' https://pagead2.googlesyndication.com https://www.googletagservices.com" : "'self'"; const frameSources = adsEnabled ? " https://googleads.g.doubleclick.net https://tpc.googlesyndication.com" : " 'none'";
await writeFile(join(dist, "_headers"), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n  X-Frame-Options: DENY\n  Content-Security-Policy: default-src 'self'; script-src ${scriptSources}; style-src 'self'; img-src 'self' data: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; connect-src 'self' https://pagead2.googlesyndication.com; frame-src${frameSources}; font-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests\n\n/assets/*\n  Cache-Control: public, max-age=3600\n\n/images/*\n  Cache-Control: public, max-age=604800\n`, "utf8");
console.log(`Built ${sitemapUrls.length} indexable URLs across ${localeOrder.length} locales. AdSense: ${adsEnabled ? "enabled" : "safely inactive"}.`);
