import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const origin = "https://recipenestvault.com";

const locales = {
  en: {
    lang: "en",
    label: "English",
    title: "Recipe Nest Vault — Global recipes, clearly explained",
    description: "Discover global cuisines and practical recipes with clear ingredients, timing, substitutions, storage tips, and trusted sources.",
    eyebrow: "A global recipe library, built for clarity",
    heading: "Good food, without the long scroll.",
    body: "Recipe Nest Vault is becoming a fast, carefully sourced home for recipes from around the world.",
    status: "The first collection is being prepared.",
    nav: "Explore cuisines"
  },
  "zh-hant": {
    lang: "zh-Hant",
    label: "繁體中文",
    title: "Recipe Nest Vault — 清楚實用的全球食譜資料庫",
    description: "探索世界料理與實用食譜，快速掌握食材、時間、替代方案、保存方式與可靠來源。",
    eyebrow: "為清楚資訊而生的全球食譜資料庫",
    heading: "好料理，不必先讀完一篇長故事。",
    body: "Recipe Nest Vault 正在建立一座快速、嚴謹標示來源的世界食譜資料庫。",
    status: "第一批精選內容正在準備中。",
    nav: "探索世界料理"
  },
  ja: {
    lang: "ja",
    label: "日本語",
    title: "Recipe Nest Vault — 世界の料理を、わかりやすく",
    description: "材料、調理時間、代替食材、保存方法、信頼できる出典を簡潔にまとめた世界のレシピを探せます。",
    eyebrow: "わかりやすさを大切にした世界のレシピ集",
    heading: "おいしい料理を、長い前置きなしで。",
    body: "Recipe Nest Vault は、世界の料理をすばやく探せる、出典を大切にしたレシピ集を準備しています。",
    status: "最初のコレクションを準備中です。",
    nav: "世界の料理を見る"
  },
  ko: {
    lang: "ko",
    label: "한국어",
    title: "Recipe Nest Vault — 세계 요리를 명확하고 간결하게",
    description: "재료, 조리 시간, 대체 재료, 보관법, 신뢰할 수 있는 출처를 한눈에 확인하는 세계 요리 레시피입니다.",
    eyebrow: "명확한 정보를 위한 세계 요리 레시피 보관소",
    heading: "긴 이야기 없이, 맛있는 요리부터.",
    body: "Recipe Nest Vault는 출처를 꼼꼼히 확인한 세계 각국의 레시피를 빠르게 찾을 수 있도록 준비하고 있습니다.",
    status: "첫 번째 컬렉션을 준비 중입니다.",
    nav: "세계 요리 둘러보기"
  },
  th: {
    lang: "th",
    label: "ไทย",
    title: "Recipe Nest Vault — สูตรอาหารทั่วโลกที่เข้าใจง่าย",
    description: "ค้นพบอาหารทั่วโลก พร้อมวัตถุดิบ เวลา ตัวเลือกทดแทน วิธีเก็บรักษา และแหล่งข้อมูลที่เชื่อถือได้",
    eyebrow: "คลังสูตรอาหารทั่วโลกที่เน้นความชัดเจน",
    heading: "อาหารอร่อย โดยไม่ต้องเลื่อนผ่านเรื่องยาว ๆ",
    body: "Recipe Nest Vault กำลังรวบรวมสูตรอาหารจากทั่วโลกที่ค้นหาได้รวดเร็วและให้ความสำคัญกับแหล่งข้อมูล",
    status: "คอลเลกชันแรกกำลังอยู่ระหว่างการจัดเตรียม",
    nav: "สำรวจอาหารทั่วโลก"
  }
};

const hreflang = Object.entries(locales)
  .map(([slug, locale]) => `<link rel="alternate" hreflang="${locale.lang.toLowerCase()}" href="${origin}/${slug}/">`)
  .concat(`<link rel="alternate" hreflang="x-default" href="${origin}/en/">`)
  .join("\n    ");

function escapeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function render(slug, locale) {
  const canonical = `${origin}/${slug}/`;
  const languages = Object.entries(locales).map(([key, item]) =>
    `<a href="/${key}/" hreflang="${item.lang.toLowerCase()}" lang="${item.lang}"${key === slug ? ' aria-current="page"' : ""}>${item.label}</a>`
  ).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Recipe Nest Vault",
    url: origin,
    inLanguage: locale.lang,
    potentialAction: {
      "@type": "SearchAction",
      target: `${origin}/${slug}/search/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  return `<!doctype html>
<html lang="${locale.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${locale.title}</title>
  <meta name="description" content="${locale.description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  ${hreflang}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Recipe Nest Vault">
  <meta property="og:title" content="${locale.title}">
  <meta property="og:description" content="${locale.description}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#b4235a">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">${escapeJson(schema)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="/${slug}/" aria-label="Recipe Nest Vault home"><span class="brand-mark">R</span><span>Recipe Nest Vault</span></a>
    <nav class="language-nav" aria-label="Language">${languages}</nav>
  </header>
  <main id="main">
    <section class="hero">
      <p class="eyebrow">${locale.eyebrow}</p>
      <h1>${locale.heading}</h1>
      <p class="lede">${locale.body}</p>
      <a class="button" href="#status">${locale.nav}</a>
      <div class="dish" aria-hidden="true"><span></span><i></i><b></b></div>
    </section>
    <section class="status" id="status" aria-labelledby="status-title">
      <p class="kicker">01 — Recipe Nest Vault</p>
      <h2 id="status-title">${locale.status}</h2>
    </section>
  </main>
  <footer><p>© 2026 Recipe Nest Vault</p><p>recipenestvault.com</p></footer>
</body>
</html>`;
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const [slug, locale] of Object.entries(locales)) {
  const route = join(dist, slug);
  await mkdir(route, { recursive: true });
  await writeFile(join(route, "index.html"), render(slug, locale), "utf8");
}

await cp(join(root, "public"), dist, { recursive: true });

const rootPage = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Recipe Nest Vault</title><link rel="canonical" href="${origin}/en/"><link rel="alternate" hreflang="x-default" href="${origin}/en/"><meta http-equiv="refresh" content="0;url=/en/"><script>location.replace('/en/' + location.search + location.hash)</script></head><body><p><a href="/en/">Continue to Recipe Nest Vault</a></p></body></html>`;
await writeFile(join(dist, "index.html"), rootPage, "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(locales).map((slug) => `  <url><loc>${origin}/${slug}/</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, "utf8");

const redirects = `/  /en/  302\n`;
await writeFile(join(dist, "_redirects"), redirects, "utf8");

