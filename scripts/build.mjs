import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cuisines, featured, fill, localeOrder, locales, origin, regionOrder } from "../src/data.mjs";
import { infoPages } from "../src/info-pages.mjs";
import { recipeProcessPhotos } from "../src/recipe-process-photos.mjs";
import { recipeUi } from "../src/recipe-ui.mjs";
import { recipes } from "../src/recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const buildDate = "2026-08-28";
const adsenseClient = /^ca-pub-\d+$/.test(process.env.ADSENSE_CLIENT ?? "") ? process.env.ADSENSE_CLIENT : "";
const adsenseSlot = /^\d+$/.test(process.env.ADSENSE_SLOT_CONTENT ?? "") ? process.env.ADSENSE_SLOT_CONTENT : "";
const adsEnabled = Boolean(adsenseClient && adsenseSlot);
const approvedProcessPhotos = recipeProcessPhotos.filter((photo) => photo.commercialUseVerified && photo.adaptationAllowed && photo.realPhoto && photo.visualMatchApproved);
const processPhotoByStep = new Map(approvedProcessPhotos.map((photo) => [`${photo.recipeId}:${photo.step}`, photo]));

function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function json(value) { return JSON.stringify(value).replaceAll("<", "\\u003c"); }
function routePath(locale, suffix = "") { return `/${locale}/${suffix}`.replaceAll("//", "/"); }
function localized(value, slug) { return value?.[slug] ?? value?.en ?? value ?? ""; }
function cleanStep(value) { return String(value).replace(/^\d+\.\s*/, ""); }
function instructionContent(step, slug) {
  if (step && typeof step === "object" && step.title && step.body) {
    return { title: localized(step.title, slug), body: cleanStep(localized(step.body, slug)) };
  }
  return { title: "", body: cleanStep(localized(step, slug)) };
}
function duration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `PT${hours ? `${hours}H` : ""}${remainder ? `${remainder}M` : ""}`;
}

function formatRecipeTime(minutes, slug) {
  const ui = recipeUi[slug];
  if (minutes < 60) return fill(ui.minutes, { count: minutes });
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder
    ? fill(ui.hoursMinutes, { hours, minutes: remainder })
    : fill(ui.hours, { count: hours });
}

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

function languagePrompt(activeSlug, suffix = "") {
  const locale = locales[activeSlug];
  const titleId = `language-prompt-title-${activeSlug}`;
  const options = localeOrder.map((slug) => {
    const current = slug === activeSlug;
    return `<a class="language-option${current ? " is-current" : ""}" href="${routePath(slug, suffix)}" lang="${locales[slug].lang}" hreflang="${locales[slug].hreflang}" data-language-choice="${slug}"${current ? ' aria-current="page"' : ""}><span>${esc(locales[slug].label)}</span>${current ? `<small>${esc(locale.ui.currentBadge)}</small>` : '<span aria-hidden="true">↗</span>'}</a>`;
  }).join("\n      ");
  return `<dialog class="language-dialog" aria-labelledby="${titleId}" data-language-prompt data-active-locale="${activeSlug}">
    <div class="language-dialog-panel">
      <button class="language-dialog-close" type="button" aria-label="${esc(locale.ui.close)}" data-language-dismiss><span aria-hidden="true">×</span></button>
      <div class="language-dialog-mark" aria-hidden="true">文</div>
      <p class="eyebrow">${esc(locale.ui.languagePromptEyebrow)}</p>
      <h2 id="${titleId}">${esc(locale.ui.languagePromptTitle)}</h2>
      <p class="language-dialog-body">${esc(locale.ui.languagePromptBody)}</p>
      <p class="language-current">${esc(fill(locale.ui.currentLanguage, { language: locale.label }))}</p>
      <div class="language-options">${options}</div>
      <div class="language-dialog-actions"><button class="primary-button" type="button" data-language-dismiss>${esc(fill(locale.ui.continueCurrent, { language: locale.label }))}</button><button class="text-button" type="button" data-language-dismiss>${esc(locale.ui.notNow)}</button></div>
      <p class="language-preference-note">${esc(locale.ui.languagePreferenceNote)}</p>
    </div>
  </dialog>`;
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
  return `<footer class="site-footer"><div class="footer-main"><div><a class="brand footer-brand" href="/${slug}/"><img src="/logo.svg" width="42" height="42" alt=""><span>Recipe Nest Vault</span></a><p>${esc(locale.ui.footerTagline)}</p></div><nav aria-label="${esc(locale.ui.menu)}"><a href="/${slug}/#cuisines">${esc(locale.ui.explore)}</a><a href="/${slug}/about/">${esc(locale.ui.about)}</a><a href="/${slug}/privacy/">${esc(locale.ui.privacy)}</a><a href="/${slug}/#credits">${esc(locale.ui.creditsTitle)}</a><a href="/${slug}/search/">${esc(locale.ui.search)}</a></nav></div><div class="footer-base"><p>${esc(locale.ui.copyright)}</p><p>recipenestvault.com</p></div></footer>`;
}

function adSlot(slug, placement) {
  const label = locales[slug].ui.advertisement ?? "Advertisement";
  if (!adsEnabled) return `<div class="ad-slot ad-slot--inactive" data-ad-component="${placement}" hidden></div>`;
  return `<aside class="ad-slot" aria-label="${esc(label)}" data-ad-component="${placement}"><span class="ad-label">${esc(label)}</span><ins class="adsbygoogle" style="display:block" data-ad-client="${adsenseClient}" data-ad-slot="${adsenseSlot}" data-ad-format="auto" data-full-width-responsive="true"></ins></aside>`;
}

function documentHead(slug, { title, description, suffix = "", robots = "index,follow,max-image-preview:large", schema, bodyClass = "", socialImage = `${origin}/og.jpg`, ogType = "website" }) {
  const locale = locales[slug];
  const canonical = `${origin}${routePath(slug, suffix)}`;
  return { bodyClass, html: `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="${robots}">
  <link rel="canonical" href="${canonical}">
  ${alternateLinks(suffix)}
  <meta property="og:type" content="${ogType}"><meta property="og:site_name" content="Recipe Nest Vault"><meta property="og:locale" content="${locale.ogLocale}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${esc(socialImage)}"><meta property="og:image:width" content="${ogType === "article" ? "1440" : "1200"}"><meta property="og:image:height" content="${ogType === "article" ? "1080" : "630"}"><meta property="og:image:alt" content="${esc(title)}">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${esc(socialImage)}">
  <meta name="theme-color" content="#b4235a"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icon-192.png"><link rel="manifest" href="/site.webmanifest"><link rel="stylesheet" href="/assets/site.css">
  ${adsEnabled ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}" crossorigin="anonymous"></script>` : ""}<script type="application/ld+json">${json(schema)}</script>` };
}

function page(slug, headOptions, content, suffix = "") {
  const locale = locales[slug];
  const head = documentHead(slug, { ...headOptions, suffix });
  return `<!doctype html><html lang="${locale.lang}"><head>${head.html}</head><body class="${head.bodyClass}"><a class="skip-link" href="#main">${esc(locale.ui.skip)}</a>${header(slug, suffix)}<main id="main">${content}</main>${footer(slug)}${languagePrompt(slug, suffix)}<script src="/assets/site.js" defer></script></body></html>`;
}

function picture(image, alt, priority = false) {
  return `<picture><source srcset="/images/${image}-640.webp 640w, /images/${image}-960.webp 960w, /images/${image}-1440.webp 1440w" type="image/webp"><img src="/images/${image}-960.webp" srcset="/images/${image}-640.webp 640w, /images/${image}-960.webp 960w, /images/${image}-1440.webp 1440w" sizes="(max-width: 760px) 100vw, 50vw" width="960" height="720" alt="${esc(alt)}" ${priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}></picture>`;
}

function recipePicture(recipe, slug, priority = false) {
  const alt = localized(recipe.imageAlt, slug);
  const base = `/images/recipes/${recipe.id}`;
  return `<picture><source srcset="${base}-640.webp 640w, ${base}-960.webp 960w, ${base}-1440.webp 1440w" type="image/webp"><img src="${base}-960.webp" srcset="${base}-640.webp 640w, ${base}-960.webp 960w, ${base}-1440.webp 1440w" sizes="(max-width: 760px) 100vw, 50vw" width="960" height="720" alt="${esc(alt)}" ${priority ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}></picture>`;
}

function recipeProcessFigure(photo, slug) {
  const ui = recipeUi[slug];
  const base = `/images/recipes/process/${photo.id}`;
  return `<figure class="recipe-step-photo" data-step-photo="${esc(photo.id)}"><picture><source srcset="${base}-480.webp 480w, ${base}-800.webp 800w" type="image/webp"><img src="${base}-800.webp" srcset="${base}-480.webp 480w, ${base}-800.webp 800w" sizes="(max-width: 760px) calc(100vw - 4.5rem), 680px" width="800" height="450" alt="${esc(localized(photo.alt, slug))}" loading="lazy" decoding="async"></picture><figcaption><div class="recipe-step-photo-heading"><strong>${esc(ui.processPhotoCredit)}</strong><span>${esc(fill(ui.frameAt, { timestamp: photo.frameTimestamp }))}</span></div><p>${esc(localized(photo.caption, slug))}</p><p class="recipe-step-photo-credit"><cite>${esc(photo.title)}</cite> — ${esc(fill(ui.sourceVideoBy, { author: photo.author }))}</p><p class="recipe-step-photo-links"><a href="${esc(photo.sourcePage)}" rel="external">${esc(ui.sourcePage)}</a> · <a href="${esc(photo.originalFile)}" rel="external">${esc(ui.originalFile)}</a> · <a href="${esc(photo.originalPublication)}" rel="external">${esc(ui.originalPublication)}</a> · <a href="${esc(photo.licenseUrl)}" rel="external">${esc(photo.license)}</a></p><small>${esc(localized(photo.modifications, slug))}</small></figcaption></figure>`;
}

function cuisineCards(slug, region) {
  const locale = locales[slug];
  return cuisines.filter((item) => item.region === region).map((item, index) => `<a class="cuisine-card" href="/${slug}/cuisines/${item.id}/"><span class="cuisine-index">${String(index + 1).padStart(2, "0")}</span><strong>${esc(item.names[slug])}</strong><span>${esc(fill(locale.ui.viewCuisine, { cuisine: item.names[slug] }))}<b aria-hidden="true">↗</b></span></a>`).join("\n");
}

function renderHome(slug) {
  const locale = locales[slug];
  const featuredCards = featured.map((item) => { const cuisine = cuisines.find((entry) => entry.id === item.cuisine); return `<article class="recipe-card" id="preview-${item.id}"><div class="recipe-image">${picture(item.image, locale.imageAlts[item.image])}<span>${esc(locale.ui.collectionPreview)}</span></div><div class="recipe-card-body"><p>${esc(cuisine.names[slug])}</p><h3>${esc(locale.featuredNames[item.id])}</h3></div></article>`; }).join("\n");
  const creditRows = featured.map((item) => `<li><strong>${esc(locale.featuredNames[item.id])}</strong> — <cite>${esc(item.photo.title)}</cite>, ${esc(locale.ui.by)} ${esc(item.photo.author)} · <a href="${item.photo.sourcePage}">${esc(locale.ui.source)}</a> · <a href="${item.photo.originalFile}">${esc(locale.ui.originalFile)}</a> · <a href="${item.photo.licenseUrl}">${esc(item.photo.license)}</a> · ${esc(locale.ui.modified)}</li>`).join("\n");
  const content = `<section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">${esc(locale.ui.eyebrow)}</p><h1 id="hero-title">${esc(locale.ui.headline)}</h1><p class="hero-lede">${esc(locale.ui.subhead)}</p><form class="search-box" action="/${slug}/search/" method="get" role="search"><label class="sr-only" for="hero-search-${slug}">${esc(locale.ui.placeholder)}</label><span aria-hidden="true">⌕</span><input id="hero-search-${slug}" name="q" type="search" autocomplete="off" placeholder="${esc(locale.ui.placeholder)}"><button type="submit">${esc(locale.ui.searchButton)}</button></form><p class="search-hint">${esc(locale.ui.searchHint)}</p></div><div class="hero-media">${picture("sushi", locale.imageAlts.sushi, true)}<a href="#credits">${esc(locale.ui.creditsTitle)}</a></div></section>
  ${adSlot(slug, "home-leaderboard")}
  <section class="intro-section" id="cuisines"><p class="section-number">01</p><div><p class="eyebrow">${esc(locale.ui.explore)}</p><h2>${esc(locale.ui.exploreTitle)}</h2><p class="section-lede">${esc(locale.ui.exploreIntro)}</p></div></section>
  ${regionOrder.map((region, regionIndex) => `<section class="cuisine-region" aria-labelledby="region-${region}"><div class="region-heading"><p>0${regionIndex + 2}</p><div><h2 id="region-${region}">${esc(locale.regionNames[region])}</h2><p>${esc(locale.ui.regionIntro)}</p></div></div><div class="cuisine-grid">${cuisineCards(slug, region)}</div></section>`).join("\n")}
  <section class="featured-section" id="featured" aria-labelledby="featured-title"><div class="featured-heading"><p class="eyebrow">${esc(locale.ui.featured)}</p><h2 id="featured-title">${esc(locale.ui.featuredTitle)}</h2><p>${esc(locale.ui.featuredIntro)}</p></div><div class="recipe-grid">${featuredCards}</div></section>
  ${adSlot(slug, "home-content")}
  <section class="philosophy-section" id="philosophy" aria-labelledby="philosophy-title"><div class="philosophy-copy"><p class="eyebrow">${esc(locale.ui.philosophyEyebrow)}</p><h2 id="philosophy-title">${esc(locale.ui.philosophyTitle)}</h2><p>${esc(locale.ui.philosophyBody)}</p></div><ol class="principles"><li><span>01</span><div><h3>${esc(locale.ui.principle1Title)}</h3><p>${esc(locale.ui.principle1Body)}</p></div></li><li><span>02</span><div><h3>${esc(locale.ui.principle2Title)}</h3><p>${esc(locale.ui.principle2Body)}</p></div></li><li><span>03</span><div><h3>${esc(locale.ui.principle3Title)}</h3><p>${esc(locale.ui.principle3Body)}</p></div></li></ol></section>
  <section class="credits-section" id="credits" aria-labelledby="credits-title"><div><p class="section-number">07</p><h2 id="credits-title">${esc(locale.ui.creditsTitle)}</h2><p>${esc(locale.ui.creditsIntro)}</p></div><ul>${creditRows}<li>${esc(locale.ui.generatedCredit)} · <a href="/og.jpg">${esc(locale.ui.originalFile)}</a></li></ul></section>`;
  const schema = { "@context": "https://schema.org", "@graph": [ { "@type": "WebSite", "@id": `${origin}/#website`, name: "Recipe Nest Vault", url: origin, inLanguage: locale.lang, potentialAction: { "@type": "SearchAction", target: `${origin}/${slug}/search/?q={search_term_string}`, "query-input": "required name=search_term_string" } }, { "@type": "Organization", "@id": `${origin}/#organization`, name: "Recipe Nest Vault", url: origin, logo: `${origin}/logo.svg` } ] };
  return page(slug, { title: locale.metaTitle, description: locale.metaDescription, schema, bodyClass: "home-page" }, content);
}

function recipeCard(recipe, slug) {
  const ui = recipeUi[slug];
  return `<article class="collection-recipe-card"><a href="/${slug}/recipes/${recipe.id}/"><div class="collection-recipe-image">${recipePicture(recipe, slug)}<span>${esc(localized(recipe.region, slug))}</span></div><div class="collection-recipe-copy"><p>${esc(formatRecipeTime(recipe.totalMinutes, slug))}</p><h2>${esc(localized(recipe.name, slug))}</h2><div class="collection-recipe-description">${esc(localized(recipe.description, slug))}</div><strong>${esc(ui.viewRecipe)}<span aria-hidden="true">↗</span></strong></div></a></article>`;
}

function renderCuisine(slug, cuisine) {
  const locale = locales[slug];
  const ui = recipeUi[slug];
  const name = cuisine.names[slug];
  const suffix = `cuisines/${cuisine.id}/`;
  const hasRecipes = cuisine.id === "chinese" && recipes.length > 0;
  const title = hasRecipes ? `${ui.collectionTitle} — Recipe Nest Vault` : `${name} — Recipe Nest Vault`;
  const description = hasRecipes ? ui.collectionIntro : fill(locale.ui.cuisinePageBody, { cuisine: name });
  const siblings = cuisines.filter((item) => item.region === cuisine.region && item.id !== cuisine.id).slice(0, 4);
  const hero = `<section class="page-hero cuisine-hero"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/${slug}/">${esc(locale.ui.home)}</a><span>/</span><a href="/${slug}/#cuisines">${esc(locale.ui.explore)}</a></nav><p class="eyebrow">${esc(hasRecipes ? ui.collectionEyebrow : locale.ui.cuisineLabel)}</p><h1>${esc(hasRecipes ? ui.collectionTitle : name)}</h1><p>${esc(description)}</p>${hasRecipes ? `<span class="collection-count">${esc(fill(ui.recipeCount, { count: recipes.length }))}</span>` : ""}</section>`;
  const primary = hasRecipes
    ? `<section class="recipe-collection" aria-label="${esc(ui.collectionTitle)}"><div class="collection-grid">${recipes.map((recipe) => recipeCard(recipe, slug)).join("\n")}</div></section>${adSlot(slug, "cuisine-content")}`
    : `<section class="coming-section"><div><p class="section-number">01</p><h2>${esc(locale.ui.comingTitle)}</h2><p>${esc(locale.ui.comingBody)}</p></div><div class="coming-visual" aria-hidden="true"><span></span><i></i><b></b></div></section>`;
  const more = `<section class="more-cuisines"><h2>${esc(locale.ui.exploreMore)}</h2><div class="cuisine-grid">${siblings.map((item, index) => `<a class="cuisine-card" href="/${slug}/cuisines/${item.id}/"><span class="cuisine-index">0${index + 1}</span><strong>${esc(item.names[slug])}</strong><span>${esc(fill(locale.ui.viewCuisine, { cuisine: item.names[slug] }))}<b aria-hidden="true">↗</b></span></a>`).join("")}</div></section>`;
  const schema = { "@context": "https://schema.org", "@graph": [ { "@type": "CollectionPage", name: hasRecipes ? ui.collectionTitle : name, description, url: `${origin}/${slug}/${suffix}`, inLanguage: locale.lang, isPartOf: { "@id": `${origin}/#website` }, ...(hasRecipes ? { mainEntity: { "@type": "ItemList", numberOfItems: recipes.length, itemListElement: recipes.map((recipe, index) => ({ "@type": "ListItem", position: index + 1, name: localized(recipe.name, slug), url: `${origin}/${slug}/recipes/${recipe.id}/` })) } } : {}) }, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: locale.ui.home, item: `${origin}/${slug}/` }, { "@type": "ListItem", position: 2, name } ] } ] };
  return page(slug, { title, description, schema, bodyClass: `cuisine-page${hasRecipes ? " recipe-collection-page" : ""}` }, `${hero}${adSlot(slug, "cuisine-leaderboard")}${primary}${more}`, suffix);
}

function renderRecipe(slug, recipe) {
  const locale = locales[slug];
  const ui = recipeUi[slug];
  const cuisine = cuisines.find((entry) => entry.id === recipe.cuisine);
  const name = localized(recipe.name, slug);
  const description = localized(recipe.description, slug);
  const suffix = `recipes/${recipe.id}/`;
  const title = `${name} — Recipe Nest Vault`;
  const ingredientRows = recipe.ingredients.map((row) => `<li><span>${esc(localized(row.amount, slug))}</span><p>${esc(localized(row.item, slug))}</p></li>`).join("");
  const instructionRows = recipe.instructions.map((step, index) => {
    const instruction = instructionContent(step, slug);
    const processPhoto = processPhotoByStep.get(`${recipe.id}:${index + 1}`);
    return `<li><span>${String(index + 1).padStart(2, "0")}</span><div class="recipe-step-copy">${instruction.title ? `<h3>${esc(instruction.title)}</h3>` : ""}<p>${esc(instruction.body)}</p>${processPhoto ? recipeProcessFigure(processPhoto, slug) : ""}</div></li>`;
  }).join("");
  const practicalCards = [
    [ui.tips, recipe.tips],
    [ui.commonMistakes, recipe.commonMistakes],
    [ui.substitutions, recipe.substitutions]
  ].map(([heading, items]) => `<section><h3>${esc(heading)}</h3><ul>${items.map((item) => `<li>${esc(localized(item, slug))}</li>`).join("")}</ul></section>`).join("");
  const sourceRows = recipe.sources.map((source) => `<li><a href="${esc(source.url)}" rel="external">${esc(source.title)}<span aria-hidden="true">↗</span></a></li>`).join("");
  const related = recipes.filter((item) => item.id !== recipe.id).slice(0, 3).map((item) => recipeCard(item, slug)).join("");
  const content = `<article class="recipe-detail"><section class="recipe-detail-hero"><div class="recipe-detail-copy"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/${slug}/">${esc(locale.ui.home)}</a><span>/</span><a href="/${slug}/cuisines/chinese/">${esc(cuisine.names[slug])}</a></nav><p class="eyebrow">${esc(ui.recipeEyebrow)}</p><h1>${esc(name)}</h1><p class="recipe-deck">${esc(description)}</p><p class="recipe-region">${esc(localized(recipe.region, slug))}</p><dl class="recipe-meta"><div><dt>${esc(ui.prep)}</dt><dd>${esc(formatRecipeTime(recipe.prepMinutes, slug))}</dd></div><div><dt>${esc(ui.cook)}</dt><dd>${esc(formatRecipeTime(recipe.cookMinutes, slug))}</dd></div><div><dt>${esc(ui.total)}</dt><dd>${esc(formatRecipeTime(recipe.totalMinutes, slug))}</dd></div><div><dt>${esc(ui.servings)}</dt><dd>${recipe.servings}</dd></div></dl></div><figure class="recipe-detail-photo">${recipePicture(recipe, slug, true)}<figcaption><strong>${esc(ui.photoCredit)}</strong><span>${esc(fill(ui.photoBy, { author: recipe.photo.author }))}</span><span><a href="${esc(recipe.photo.sourcePage)}">${esc(ui.sourcePage)}</a> · <a href="${esc(recipe.photo.originalFile)}">${esc(ui.originalFile)}</a> · <a href="${esc(recipe.photo.licenseUrl)}">${esc(recipe.photo.license)}</a></span><small>${esc(ui.modified)}</small></figcaption></figure></section>${adSlot(slug, "recipe-leaderboard")}<div class="recipe-body"><div class="recipe-main"><section class="recipe-section ingredients-section" aria-labelledby="ingredients-title"><p class="section-number">01</p><div><h2 id="ingredients-title">${esc(ui.ingredients)}</h2><ul>${ingredientRows}</ul></div></section><section class="recipe-section method-section" aria-labelledby="method-title"><p class="section-number">02</p><div><h2 id="method-title">${esc(ui.instructions)}</h2><ol>${instructionRows}</ol></div></section></div><aside class="recipe-sidebar" aria-labelledby="practical-title"><p class="eyebrow">${esc(ui.practicalNotes)}</p><h2 id="practical-title">${esc(ui.practicalNotes)}</h2>${practicalCards}<section><h3>${esc(ui.storage)}</h3><p>${esc(localized(recipe.storage, slug))}</p></section><section><h3>${esc(ui.culturalNotes)}</h3><p>${esc(localized(recipe.cultureNote, slug))}</p></section></aside></div>${adSlot(slug, "recipe-content")}<section class="recipe-sources" aria-labelledby="recipe-sources-title"><div><p class="section-number">03</p><h2 id="recipe-sources-title">${esc(ui.sourcesCredits)}</h2><p>${esc(ui.methodNote)}</p></div><div><h3>${esc(ui.recipeSources)}</h3><ul>${sourceRows}</ul><p class="photo-license-line"><cite>${esc(recipe.photo.title)}</cite> — ${esc(fill(ui.photoBy, { author: recipe.photo.author }))}; <a href="${esc(recipe.photo.licenseUrl)}">${esc(recipe.photo.license)}</a>.</p></div></section><a class="back-collection-link" href="/${slug}/cuisines/chinese/"><span aria-hidden="true">←</span>${esc(ui.backToCollection)}</a>${related ? `<section class="related-recipes" aria-labelledby="related-title"><p class="eyebrow">${esc(ui.relatedRecipes)}</p><h2 id="related-title">${esc(ui.relatedRecipes)}</h2><div class="collection-grid">${related}</div></section>` : ""}</article>`;
  const schema = { "@context": "https://schema.org", "@graph": [ { "@type": "Recipe", "@id": `${origin}/${slug}/${suffix}#recipe`, name, description, url: `${origin}/${slug}/${suffix}`, mainEntityOfPage: `${origin}/${slug}/${suffix}`, inLanguage: locale.lang, image: { "@type": "ImageObject", url: `${origin}/images/recipes/${recipe.id}-1440.webp`, width: 1440, height: 1080, creator: { "@type": "Person", name: recipe.photo.author }, license: recipe.photo.licenseUrl, acquireLicensePage: recipe.photo.sourcePage, creditText: `${recipe.photo.title} — ${recipe.photo.author}` }, author: { "@type": "Organization", name: "Recipe Nest Vault", url: origin }, datePublished: buildDate, dateModified: buildDate, prepTime: duration(recipe.prepMinutes), cookTime: duration(recipe.cookMinutes), totalTime: duration(recipe.totalMinutes), recipeYield: `${recipe.servings}`, recipeCuisine: cuisine.names[slug], recipeIngredient: recipe.ingredients.map((row) => `${localized(row.amount, slug)} ${localized(row.item, slug)}`), recipeInstructions: recipe.instructions.map((step, index) => { const instruction = instructionContent(step, slug); const processPhoto = processPhotoByStep.get(`${recipe.id}:${index + 1}`); return { "@type": "HowToStep", position: index + 1, ...(instruction.title ? { name: instruction.title } : {}), text: instruction.body, ...(processPhoto ? { image: `${origin}/images/recipes/process/${processPhoto.id}-800.webp` } : {}) }; }) }, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: locale.ui.home, item: `${origin}/${slug}/` }, { "@type": "ListItem", position: 2, name: cuisine.names[slug], item: `${origin}/${slug}/cuisines/chinese/` }, { "@type": "ListItem", position: 3, name, item: `${origin}/${slug}/${suffix}` } ] } ] };
  return page(slug, { title, description, schema, bodyClass: "recipe-page", socialImage: `${origin}/images/recipes/${recipe.id}-1440.webp`, ogType: "article" }, content, suffix);
}

function renderSearch(slug) {
  const locale = locales[slug]; const suffix = "search/"; const title = `${locale.ui.searchTitle} — Recipe Nest Vault`;
  const content = `<section class="page-hero search-hero"><p class="eyebrow">${esc(locale.ui.search)}</p><h1>${esc(locale.ui.searchTitle)}</h1><p>${esc(locale.ui.searchIntro)}</p><form class="search-box" action="/${slug}/search/" method="get" role="search" data-search-form><label class="sr-only" for="search-${slug}">${esc(locale.ui.placeholder)}</label><span aria-hidden="true">⌕</span><input id="search-${slug}" name="q" type="search" autocomplete="off" placeholder="${esc(locale.ui.placeholder)}"><button type="submit">${esc(locale.ui.searchButton)}</button></form></section><section class="search-results" aria-live="polite" data-search-results data-locale="${slug}" data-count-template="${esc(locale.ui.resultCount)}" data-empty-title="${esc(locale.ui.emptyTitle)}" data-empty-body="${esc(locale.ui.emptyBody)}" data-start="${esc(locale.ui.startTyping)}" data-cuisine-label="${esc(locale.ui.cuisineLabel)}" data-recipe-label="${esc(recipeUi[slug].recipeEyebrow)}" data-preview-label="${esc(locale.ui.collectionPreview)}"><p>${esc(locale.ui.startTyping)}</p></section>`;
  const schema = { "@context": "https://schema.org", "@type": "SearchResultsPage", name: locale.ui.searchTitle, url: `${origin}/${slug}/${suffix}`, inLanguage: locale.lang, isPartOf: { "@id": `${origin}/#website` } };
  return page(slug, { title, description: locale.ui.searchIntro, robots: "noindex,follow", schema, bodyClass: "search-page" }, content, suffix).replace("<script src=\"/assets/site.js\" defer></script>", "<script src=\"/assets/site.js\" defer></script><script src=\"/assets/search.js\" defer></script>");
}

function renderInfoPage(slug, type) {
  const locale = locales[slug];
  const info = infoPages[slug][type];
  const suffix = `${type}/`;
  const pageLabel = type === "about" ? locale.ui.about : locale.ui.privacy;
  const index = info.sections.map((section, indexValue) => `<li><a href="#${section.id}"><span>${String(indexValue + 1).padStart(2, "0")}</span>${esc(section.title)}</a></li>`).join("");
  const sections = info.sections.map((section, indexValue) => `<section class="info-section" id="${section.id}" aria-labelledby="${section.id}-title"><p class="section-number">${String(indexValue + 1).padStart(2, "0")}</p><div><h2 id="${section.id}-title">${esc(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>` : ""}</div></section>`).join("");
  const references = info.references ? `<section class="privacy-references" aria-labelledby="privacy-references-title"><p class="eyebrow">${esc(info.eyebrow)}</p><h2 id="privacy-references-title">${esc(info.referencesTitle)}</h2><ul>${info.references.map((reference) => `<li><a href="${esc(reference.href)}">${esc(reference.label)}<span aria-hidden="true">↗</span></a></li>`).join("")}</ul></section>` : "";
  const content = `<section class="page-hero info-hero" data-info-page="${type}"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/${slug}/">${esc(locale.ui.home)}</a><span>/</span><span aria-current="page">${esc(pageLabel)}</span></nav><p class="eyebrow">${esc(info.eyebrow)}</p><h1>${esc(info.title)}</h1><p class="info-intro">${esc(info.intro)}</p>${info.updated ? `<p class="policy-date">${esc(info.updated)}</p>` : ""}</section>${adSlot(slug, `${type}-leaderboard`)}<div class="info-layout"><nav class="info-index" aria-label="${esc(info.onThisPage)}"><p>${esc(info.onThisPage)}</p><ol>${index}</ol></nav><div class="info-sections">${sections}</div></div>${references}<section class="info-closing" aria-labelledby="info-closing-${type}"><p class="section-number">${String(info.sections.length + 1).padStart(2, "0")}</p><div><h2 id="info-closing-${type}">${esc(info.closingTitle)}</h2><p>${esc(info.closingBody)}</p></div></section>`;
  const schema = { "@context": "https://schema.org", "@graph": [ { "@type": type === "about" ? "AboutPage" : "WebPage", name: info.title, description: info.metaDescription, url: `${origin}/${slug}/${suffix}`, inLanguage: locale.lang, dateModified: buildDate, isPartOf: { "@id": `${origin}/#website` } }, { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: locale.ui.home, item: `${origin}/${slug}/` }, { "@type": "ListItem", position: 2, name: pageLabel, item: `${origin}/${slug}/${suffix}` } ] } ] };
  return page(slug, { title: info.metaTitle, description: info.metaDescription, schema, bodyClass: `info-page ${type}-page` }, content, suffix);
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
  for (const type of ["about", "privacy"]) {
    const infoDir = join(homeDir, type); await mkdir(infoDir, { recursive: true }); await writeFile(join(infoDir, "index.html"), renderInfoPage(slug, type), "utf8"); sitemapUrls.push(`${origin}/${slug}/${type}/`);
  }
  for (const cuisine of cuisines) {
    const cuisineDir = join(homeDir, "cuisines", cuisine.id); await mkdir(cuisineDir, { recursive: true }); await writeFile(join(cuisineDir, "index.html"), renderCuisine(slug, cuisine), "utf8"); sitemapUrls.push(`${origin}/${slug}/cuisines/${cuisine.id}/`);
    searchIndex.push({ locale: slug, type: "cuisine", title: cuisine.names[slug], subtitle: locales[slug].regionNames[cuisine.region], url: `/${slug}/cuisines/${cuisine.id}/`, text: [cuisine.names[slug], locales[slug].regionNames[cuisine.region], ...cuisine.keywords].join(" ") });
  }
  for (const recipe of recipes) {
    const recipeDir = join(homeDir, "recipes", recipe.id); await mkdir(recipeDir, { recursive: true }); await writeFile(join(recipeDir, "index.html"), renderRecipe(slug, recipe), "utf8"); sitemapUrls.push(`${origin}/${slug}/recipes/${recipe.id}/`);
    searchIndex.push({ locale: slug, type: "recipe", title: localized(recipe.name, slug), subtitle: localized(recipe.region, slug), url: `/${slug}/recipes/${recipe.id}/`, text: [localized(recipe.name, slug), localized(recipe.description, slug), localized(recipe.region, slug), ...recipe.ingredients.map((row) => localized(row.item, slug))].join(" ") });
  }
  for (const item of featured) { const cuisine = cuisines.find((entry) => entry.id === item.cuisine); searchIndex.push({ locale: slug, type: "preview", title: locales[slug].featuredNames[item.id], subtitle: cuisine.names[slug], url: `/${slug}/#preview-${item.id}`, text: `${locales[slug].featuredNames[item.id]} ${cuisine.names[slug]} ${cuisine.keywords.join(" ")}` }); }
}
await writeFile(join(dist, "search-index.json"), `${JSON.stringify(searchIndex)}\n`, "utf8"); await writeFile(join(dist, "404.html"), render404(), "utf8");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc><lastmod>${buildDate}</lastmod></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8"); await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, "utf8");
await writeFile(join(dist, "_redirects"), ["/ /en/ 301", "/index.html /en/ 301", ...localeOrder.map((slug) => `/${slug} /${slug}/ 301`)].join("\n") + "\n", "utf8");
const scriptSources = adsEnabled ? "'self' https://static.cloudflareinsights.com https://pagead2.googlesyndication.com https://www.googletagservices.com" : "'self' https://static.cloudflareinsights.com"; const frameSources = adsEnabled ? " https://googleads.g.doubleclick.net https://tpc.googlesyndication.com" : " 'none'";
await writeFile(join(dist, "_headers"), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n  X-Frame-Options: DENY\n  Content-Security-Policy: default-src 'self'; script-src ${scriptSources}; style-src 'self'; img-src 'self' data: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; connect-src 'self' https://cloudflareinsights.com https://pagead2.googlesyndication.com; frame-src${frameSources}; font-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests\n\n/assets/*\n  Cache-Control: public, max-age=3600\n\n/images/*\n  Cache-Control: public, max-age=604800\n`, "utf8");
console.log(`Built ${sitemapUrls.length} indexable URLs across ${localeOrder.length} locales. AdSense: ${adsEnabled ? "enabled" : "safely inactive"}.`);
