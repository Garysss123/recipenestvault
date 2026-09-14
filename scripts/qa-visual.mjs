import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { recipes as recipeRecords } from "../src/recipes.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const baseUrl = (process.env.QA_BASE_URL || "http://127.0.0.1:8788").replace(/\/$/, "");
const runName = `${new URL(baseUrl).hostname}-${new Date().toISOString().replace(/[:.]/g, "-")}`;
const outputDir = join(root, "qa-artifacts", "visual", runName);
await mkdir(outputDir, { recursive: true });
console.log(`Visual QA evidence: ${outputDir}`);

const browser = await chromium.launch({ channel: "msedge", headless: true });
const failures = [];
const results = [];

async function assertIllustratedRecipe(page, expectedSteps, { traditionalChinese = false } = {}) {
  const figures = page.locator('.recipe-step-illustration[data-ai-illustration="true"]');
  if (await figures.count() !== expectedSteps) throw new Error(`Expected ${expectedSteps} cooking-step illustrations`);
  if (!(await page.locator(".recipe-illustration-notice").isVisible())) throw new Error("Illustration notice is not visible");
  if (await page.locator(".recipe-step-illustration figcaption small").count() !== 0) throw new Error("Generator credit is repeated under step illustrations");
  const labels = await page.locator(".recipe-step-illustration figcaption strong").allInnerTexts();
  if (labels.length !== expectedSteps || labels.some((label) => /\bAI\b|OpenAI/i.test(label))) throw new Error("Step illustration labels foreground the generator");
  const sourceCredits = page.locator(".recipe-sources .illustration-source-line");
  if (await sourceCredits.count() !== 1 || !(await sourceCredits.isVisible())) throw new Error("Illustration generator credit must appear once in sources");
  const brokenImages = await figures.locator("img").evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).length);
  if (brokenImages) throw new Error(`${brokenImages} cooking-step illustrations failed to load`);
  const recipeJsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
  if (recipeJsonLd.some((value) => value.includes("/images/recipes/illustrations/"))) throw new Error("Illustrations leaked into Recipe structured data");
  if (traditionalChinese) {
    if (await page.locator(".recipe-illustration-notice p").innerText() !== "以下料理步驟圖片為插畫靜態示意圖，並非實拍。實際操作請以文字中的份量、火力、時間與熟度判斷為準。") throw new Error("Traditional Chinese illustration notice does not match approved wording");
    if (labels.some((label) => label !== "料理步驟示意圖，非實拍")) throw new Error("Traditional Chinese step label does not match approved wording");
    if (await sourceCredits.innerText() !== "步驟示意圖：Recipe Nest Vault 使用 OpenAI image_gen 製作的原創示意圖。") throw new Error("Traditional Chinese source credit does not match approved wording");
  }
}

async function assertTextOnlyRecipe(page, expectedSteps) {
  const renderedSteps = page.locator(".method-section ol > li");
  if (await renderedSteps.count() !== expectedSteps) throw new Error(`Expected ${expectedSteps} cooking steps`);
  if (await page.locator(".recipe-step-illustration, .recipe-step-photo").count() !== 0) throw new Error("Unapproved process visual is rendering");
  if (await page.locator(".recipe-illustration-notice, .illustration-source-line").count() !== 0) throw new Error("Illustration disclosure is rendering without illustrations");
  if (await page.locator(".recipe-detail-photo img").evaluate((image) => !image.complete || image.naturalWidth === 0)) throw new Error("Finished-dish photograph failed to load");
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const recipe = schemas.flatMap((value) => {
    const parsed = JSON.parse(value);
    return parsed["@graph"] ?? [parsed];
  }).find((entry) => entry["@type"] === "Recipe");
  if (!recipe || recipe.recipeInstructions?.length !== expectedSteps) throw new Error("Recipe structured-data step count differs from the visible method");
}

async function inspect({ name, path, viewport, expectedStatus = 200, fullPage = true, interact, extraScreenshots = [], suppressLanguagePrompt = true, loadLazyImages = true }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme: "light", reducedMotion: "reduce" });
  if (suppressLanguagePrompt) await context.addInitScript(() => localStorage.setItem("rnv-language-preference-v1", "qa"));
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  const httpFailures = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("requestfailed", (request) => requestFailures.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText || "failed"}`));
  page.on("response", (resourceResponse) => {
    if (resourceResponse.status() >= 400) {
      httpFailures.push({
        status: resourceResponse.status(),
        url: resourceResponse.url(),
        resourceType: resourceResponse.request().resourceType()
      });
    }
  });
  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle", timeout: 30000 });
  const status = response?.status() ?? 0;
  const navigationUrl = response?.url() || `${baseUrl}${path}`;
  if (status !== expectedStatus) failures.push(`${name}: status ${status}, expected ${expectedStatus}`);
  const coreAssets = await page.evaluate(() => ({
    stylesheet: document.querySelector('link[rel="stylesheet"]')?.getAttribute("href") || "",
    siteScript: document.querySelector('script[src^="/assets/site.js"]')?.getAttribute("src") || ""
  }));
  if (!/\/assets\/site\.css\?v=[a-f0-9]{12}$/.test(coreAssets.stylesheet)) failures.push(`${name}: stylesheet is not content-versioned`);
  if (!/\/assets\/site\.js\?v=[a-f0-9]{12}$/.test(coreAssets.siteScript)) failures.push(`${name}: site script is not content-versioned`);
  await page.evaluate(() => document.fonts?.ready);
  const loadDeferredImages = async () => {
    if (!loadLazyImages) return;
    for (const image of await page.locator('img[loading="lazy"]').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.complete ? undefined : new Promise((resolve) => { element.addEventListener("load", resolve, { once: true }); element.addEventListener("error", resolve, { once: true }); }));
    }
  };
  await loadDeferredImages();
  await page.evaluate(() => window.scrollTo(0, 0));
  if (interact) await interact(page);
  await loadDeferredImages();
  await page.evaluate(() => window.scrollTo(0, 0));
  const [pageLocale, pageKind, recipeId] = new URL(page.url()).pathname.split("/").filter(Boolean);
  if (pageKind === "recipes") {
    const recipe = recipeRecords.find((entry) => entry.id === recipeId);
    const bodies = await page.locator(".method-section .recipe-step-copy > p").allTextContents();
    for (const [index, step] of (recipe?.instructions || []).entries()) {
      if (step?.body && bodies[index] !== (step.body[pageLocale] ?? step.body.en)) throw new Error(`${recipeId} step ${index + 1}: visible method differs from the original recipe facts`);
    }
  }
  const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  if (overflow.scrollWidth > overflow.clientWidth + 1) failures.push(`${name}: horizontal overflow ${overflow.scrollWidth}px > ${overflow.clientWidth}px`);
  const axe = await new AxeBuilder({ page }).analyze();
  const serious = axe.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
  if (serious.length) failures.push(`${name}: ${serious.map((violation) => `${violation.id} (${violation.nodes.length})`).join(", ")}`);
  const actionableHttpFailures = httpFailures.filter((failure) => !(
    failure.resourceType === "document"
    && failure.status === expectedStatus
    && failure.url === navigationUrl
  ));
  const actionableConsoleErrors = expectedStatus === 404 ? consoleErrors.filter((message) => !/\b404\b/.test(message)) : consoleErrors;
  if (actionableConsoleErrors.length) failures.push(`${name}: console errors: ${actionableConsoleErrors.join(" | ")}`);
  if (requestFailures.length) failures.push(`${name}: failed requests: ${requestFailures.join(" | ")}`);
  if (actionableHttpFailures.length) failures.push(`${name}: HTTP errors: ${actionableHttpFailures.map((failure) => `${failure.status} ${failure.url}`).join(" | ")}`);
  await page.screenshot({ path: join(outputDir, `${name}.png`), fullPage });
  for (const extra of extraScreenshots) {
    const header = page.locator(".site-header");
    const skipLink = page.locator(".skip-link");
    const previousVisibility = await header.evaluate((element) => element.style.visibility);
    const previousSkipDisplay = await skipLink.evaluate((element) => element.style.display);
    await header.evaluate((element) => { element.style.visibility = "hidden"; });
    await skipLink.evaluate((element) => { element.style.display = "none"; });
    try {
      await page.locator(extra.selector).screenshot({ path: join(outputDir, `${extra.name}.png`) });
    } finally {
      await header.evaluate((element, value) => { element.style.visibility = value; }, previousVisibility);
      await skipLink.evaluate((element, value) => { element.style.display = value; }, previousSkipDisplay);
    }
  }
  results.push({ name, path, viewport, status, overflow, seriousA11yViolations: serious.length, consoleErrors: actionableConsoleErrors, requestFailures, httpFailures: actionableHttpFailures });
  await context.close();
}

await inspect({
  name: "en-home-desktop", path: "/en/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    await page.locator(".language-menu summary").click();
    if (!(await page.locator('.language-popover a[href="/zh-hant/"]').isVisible())) throw new Error("Language switcher did not open");
    await page.keyboard.press("Escape");
    if (await page.locator(".language-popover").isVisible()) throw new Error("Language switcher did not close with Escape");
  },
  extraScreenshots: [
    { name: "en-cuisines-desktop", selector: '.cuisine-region[aria-labelledby="region-asia"]' },
    { name: "en-featured-desktop", selector: "#featured" },
    { name: "en-philosophy-desktop", selector: "#philosophy" },
    { name: "en-credits-desktop", selector: "#credits" }
  ]
});
await inspect({ name: "en-hero-desktop", path: "/en/", viewport: { width: 1440, height: 1000 }, fullPage: false });
await inspect({
  name: "en-language-prompt-desktop", path: "/en/cuisines/chinese/", viewport: { width: 1440, height: 1000 }, fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    const dialog = page.locator("[data-language-prompt]");
    if (!(await dialog.isVisible())) throw new Error("First-visit language prompt did not open");
    if (await dialog.locator('[data-language-choice="zh-hant"]').getAttribute("href") !== "/zh-hant/cuisines/chinese/") throw new Error("Language prompt did not preserve the current route");
  }
});
await inspect({
  name: "language-choice-route-mobile", path: "/en/recipes/mapo-tofu/", viewport: { width: 390, height: 844 }, fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/mapo-tofu/") throw new Error("Language choice did not preserve the recipe route");
    await page.reload({ waitUntil: "networkidle" });
    if (await page.locator("[data-language-prompt]").isVisible()) throw new Error("Language prompt repeated after preference was saved");
  }
});
await inspect({ name: "zh-home-mobile", path: "/zh-hant/", viewport: { width: 390, height: 844 }, extraScreenshots: [ { name: "zh-hero-mobile", selector: ".hero" }, { name: "zh-cuisines-mobile", selector: '.cuisine-region[aria-labelledby="region-asia"]' }, { name: "zh-featured-mobile", selector: "#featured" }, { name: "zh-philosophy-mobile", selector: "#philosophy" } ] });
await inspect({
  name: "th-hero-mobile", path: "/th/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => {
    await page.locator("[data-menu-button]").click();
    if (!(await page.locator("[data-nav]").isVisible())) throw new Error("Mobile navigation did not open");
  }
});
await inspect({
  name: "en-search-desktop", path: "/en/search/?q=tofu", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const recipeResult = page.locator('.result-card[href="/en/recipes/mapo-tofu/"]');
    await recipeResult.waitFor({ state: "visible" });
    if (!/Recipe/i.test(await recipeResult.innerText())) throw new Error("Recipe search result is missing its content-type label");
  }
});
await inspect({
  name: "en-search-japanese-desktop", path: "/en/search/?q=omurice", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const recipeResult = page.locator('.result-card[href="/en/recipes/omurice/"]');
    await recipeResult.waitFor({ state: "visible" });
    if (!/Japanese recipe/i.test(await recipeResult.innerText())) throw new Error("Japanese recipe search result is missing its content-type label");
  }
});
await inspect({
  name: "en-search-korean-desktop", path: "/en/search/?q=bibimbap", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const recipeResult = page.locator('.result-card[href="/en/recipes/bibimbap/"]');
    await recipeResult.waitFor({ state: "visible" });
    if (!/Korean recipe/i.test(await recipeResult.innerText())) throw new Error("Korean recipe search result is missing its cuisine label");
  }
});
await inspect({
  name: "en-search-thai-desktop", path: "/en/search/?q=pad%20thai", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const recipeResult = page.locator('.result-card[href="/en/recipes/pad-thai/"]');
    await recipeResult.waitFor({ state: "visible" });
    if (!/Thai recipe/i.test(await recipeResult.innerText())) throw new Error("Thai recipe search result is missing its cuisine label");
  }
});
await inspect({
  name: "en-search-taiwanese-desktop", path: "/en/search/?q=beef%20noodle", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const recipeResult = page.locator('.result-card[href="/en/recipes/taiwanese-beef-noodle-soup/"]');
    await recipeResult.waitFor({ state: "visible" });
    if (!/Taiwanese recipe/i.test(await recipeResult.innerText())) throw new Error("Taiwanese search result is missing its cuisine label");
  }
});
await inspect({
  name: "zh-taiwanese-collection-mobile", path: "/zh-hant/cuisines/taiwanese/", viewport: { width: 390, height: 844 },
  interact: async (page) => {
    const cards = page.locator(".collection-recipe-card");
    await cards.first().waitFor({ state: "visible" });
    if (await cards.count() !== 21) throw new Error(`Taiwanese collection expected 21 recipes, found ${await cards.count()}`);
    if (await page.locator('.collection-recipe-card a[href="/zh-hant/recipes/peanut-shaved-ice/"]').count() !== 1) throw new Error("Taiwanese collection is missing peanut shaved ice");
    const primary = await page.locator("body").evaluate((element) => getComputedStyle(element).getPropertyValue("--color-primary").trim());
    if (primary.toLowerCase() !== "#b33a3a") throw new Error(`Taiwanese palette was not applied: ${primary}`);
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Deep-route refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "zh-taiwanese-collection-hero-mobile", selector: ".cuisine-hero" },
    { name: "zh-taiwanese-first-card-mobile", selector: ".collection-recipe-card:first-child" }
  ]
});
await inspect({
  name: "en-taiwanese-collection-desktop", path: "/en/cuisines/taiwanese/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    if (await page.locator(".collection-recipe-card").count() !== 21) throw new Error("Desktop Taiwanese collection does not contain exactly 21 recipes");
  },
  extraScreenshots: [{ name: "en-taiwanese-collection-hero-desktop", selector: ".cuisine-hero" }]
});
await inspect({
  name: "zh-taiwanese-beef-noodle-mobile", path: "/zh-hant/recipes/taiwanese-beef-noodle-soup/", viewport: { width: 390, height: 844 },
  interact: async (page) => assertIllustratedRecipe(page, 8, { traditionalChinese: true }),
  extraScreenshots: [
    { name: "zh-taiwanese-beef-hero-mobile", selector: ".recipe-detail-hero" },
    { name: "zh-taiwanese-beef-first-step-mobile", selector: ".method-section li:first-child" }
  ]
});
await inspect({ name: "ja-taiwanese-dan-bing-desktop", path: "/ja/recipes/dan-bing/", viewport: { width: 1366, height: 900 }, interact: async (page) => assertIllustratedRecipe(page, 6) });
await inspect({ name: "ko-taiwanese-three-cup-mobile", path: "/ko/recipes/three-cup-chicken/", viewport: { width: 390, height: 844 }, interact: async (page) => assertIllustratedRecipe(page, 6) });
await inspect({ name: "th-taiwanese-pineapple-mobile", path: "/th/recipes/pineapple-cakes/", viewport: { width: 390, height: 844 }, interact: async (page) => assertIllustratedRecipe(page, 8) });
await inspect({
  name: "en-search-indian-desktop", path: "/en/search/?q=butter%20chicken", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const recipeResult = page.locator('.result-card[href="/en/recipes/butter-chicken/"]');
    await recipeResult.waitFor({ state: "visible" });
    if (!/Indian recipe/i.test(await recipeResult.innerText())) throw new Error("Indian search result is missing its cuisine label");
  }
});
await inspect({
  name: "zh-indian-collection-mobile", path: "/zh-hant/cuisines/indian/", viewport: { width: 390, height: 844 },
  interact: async (page) => {
    const cards = page.locator(".collection-recipe-card");
    await cards.first().waitFor({ state: "visible" });
    if (await cards.count() !== 21) throw new Error(`Indian collection expected 21 recipes, found ${await cards.count()}`);
    if (await page.locator('.collection-recipe-card a[href="/zh-hant/recipes/rice-kheer/"]').count() !== 1) throw new Error("Indian collection is missing rice kheer");
    const primary = await page.locator("body").evaluate((element) => getComputedStyle(element).getPropertyValue("--color-primary").trim());
    if (primary.toLowerCase() !== "#ad521c") throw new Error(`Indian palette was not applied: ${primary}`);
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Indian deep-route refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "zh-indian-collection-hero-mobile", selector: ".cuisine-hero" },
    { name: "zh-indian-first-card-mobile", selector: ".collection-recipe-card:first-child" }
  ]
});
await inspect({
  name: "en-indian-collection-desktop", path: "/en/cuisines/indian/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    if (await page.locator(".collection-recipe-card").count() !== 21) throw new Error("Desktop Indian collection does not contain exactly 21 recipes");
    if (await page.locator('.collection-recipe-card a[href*="bibimbap"], .collection-recipe-card a[href*="mapo-tofu"]').count()) throw new Error("Another cuisine leaked into Indian collection");
  },
  extraScreenshots: [{ name: "en-indian-collection-hero-desktop", selector: ".cuisine-hero" }]
});
await inspect({
  name: "zh-indian-butter-chicken-mobile", path: "/zh-hant/recipes/butter-chicken/", viewport: { width: 390, height: 844 },
  interact: async (page) => assertIllustratedRecipe(page, 8, { traditionalChinese: true }),
  extraScreenshots: [
    { name: "zh-indian-butter-chicken-hero-mobile", selector: ".recipe-detail-hero" },
    { name: "zh-indian-butter-chicken-first-step-mobile", selector: ".method-section li:first-child" }
  ]
});
await inspect({ name: "ja-indian-masala-dosa-desktop", path: "/ja/recipes/masala-dosa/", viewport: { width: 1366, height: 900 }, interact: async (page) => assertIllustratedRecipe(page, 9) });
await inspect({ name: "ko-indian-tandoori-mobile", path: "/ko/recipes/tandoori-chicken/", viewport: { width: 390, height: 844 }, interact: async (page) => assertIllustratedRecipe(page, 7) });
await inspect({ name: "th-indian-rice-kheer-mobile", path: "/th/recipes/rice-kheer/", viewport: { width: 390, height: 844 }, interact: async (page) => assertIllustratedRecipe(page, 6) });

const vietnameseRecipeIds = [
  "pho-bo", "pho-ga", "bun-bo-hue", "bun-rieu", "bun-cha", "bun-thit-nuong", "goi-cuon",
  "cha-gio", "banh-xeo", "banh-cuon", "banh-mi-thit", "com-tam-suon-nuong", "cao-lau", "mi-quang",
  "ca-kho-to", "thit-kho-trung", "canh-chua-ca", "che-ba-mau", "banh-flan", "bo-kho", "bun-bo-nam-bo"
];
async function assertVietnameseCollection(page, locale) {
  const links = await page.locator(".collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")).sort());
  const expected = vietnameseRecipeIds.map((id) => `/${locale}/recipes/${id}/`).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error(`Vietnamese ${locale} collection does not contain the expected 21 unique recipe routes`);
  if (await page.locator(".collection-recipe-card").count() !== 21) throw new Error("Vietnamese collection must show 21 cards");
  const broken = await page.locator(".collection-recipe-card img").evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`${broken} Vietnamese card photographs failed to load`);
  if (!(await page.locator("body").evaluate((element) => element.classList.contains("cuisine-vietnamese")))) throw new Error("Vietnamese collection is missing its regional theme");
  const primary = await page.locator("body").evaluate((element) => getComputedStyle(element).getPropertyValue("--color-primary").trim());
  if (primary.toLowerCase() !== "#27634e") throw new Error(`Vietnamese lotus-green palette was not applied: ${primary}`);
}
async function assertVietnameseRecipe(page, expectedSteps, locale, id) {
  await assertIllustratedRecipe(page, expectedSteps, { traditionalChinese: locale === "zh-hant" });
  const steps = page.locator(".method-section ol > li");
  if (await steps.count() !== expectedSteps) throw new Error(`Vietnamese ${id} method count differs from its ${expectedSteps} illustrations`);
  for (const entry of await steps.all()) if (await entry.locator(".recipe-step-illustration").count() !== 1) throw new Error(`Vietnamese ${id} needs exactly one illustration in each step`);
  const images = await page.locator(".recipe-step-illustration img").evaluateAll((entries) => entries.map((entry) => entry.getAttribute("src")));
  if (new Set(images).size !== expectedSteps) throw new Error(`Vietnamese ${id} reuses a step image`);
  for (const target of ["en", "zh-hant", "ja", "ko", "th"]) {
    if (await page.locator(`.language-popover a[href="/${target}/recipes/${id}/"]`).count() !== 1) throw new Error(`Vietnamese ${id} is missing its ${target} language route`);
  }
}
await inspect({
  name: "en-search-vietnamese-desktop", path: "/en/search/?q=banh%20mi", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const result = page.locator('.result-card[href="/en/recipes/banh-mi-thit/"]');
    await result.waitFor({ state: "visible" });
    if (!/Vietnamese recipe/i.test(await result.innerText())) throw new Error("Vietnamese search result lacks its cuisine label");
    await page.locator('[data-search-form] input[name="q"]').fill("Bánh mì");
    await page.locator('[data-search-form] input[name="q"]').press("Enter");
    await page.waitForFunction(() => new URL(location.href).searchParams.get("q") === "Bánh mì");
    if (!(await result.isVisible())) throw new Error("Accented Vietnamese search lost the matching recipe");
  }
});
for (const [locale, label, viewport] of [
  ["en", "desktop", { width: 1440, height: 1000 }],
  ["zh-hant", "mobile", { width: 390, height: 844 }],
  ["ja", "desktop", { width: 1366, height: 900 }],
  ["ko", "mobile", { width: 390, height: 844 }],
  ["th", "mobile", { width: 390, height: 844 }]
]) {
  await inspect({
    name: `${locale}-vietnamese-collection-${label}`, path: `/${locale}/cuisines/vietnamese/`, viewport,
    interact: async (page) => {
      await assertVietnameseCollection(page, locale);
      if (label === "mobile") {
        await page.locator("[data-menu-button]").click();
        if (!(await page.locator("[data-nav]").isVisible()) || await page.locator("[data-menu-button]").getAttribute("aria-expanded") !== "true") throw new Error("Vietnamese mobile navigation did not open");
        await page.locator("[data-menu-button]").click();
        if (await page.locator("[data-menu-button]").getAttribute("aria-expanded") !== "false") throw new Error("Vietnamese mobile navigation did not close");
      }
      const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`Vietnamese ${locale} direct refresh failed`);
    },
    extraScreenshots: locale === "en" || locale === "zh-hant" ? [
      { name: `${locale}-vietnamese-collection-hero-${label}`, selector: ".cuisine-hero" },
      { name: `${locale}-vietnamese-first-card-${label}`, selector: ".collection-recipe-card:first-child" }
    ] : []
  });
}
for (const [locale, id, count, label] of [
  ["zh-hant", "pho-bo", 10, "mobile"],
  ["en", "bun-bo-hue", 11, "desktop"],
  ["ja", "banh-mi-thit", 6, "desktop"],
  ["ko", "banh-cuon", 7, "mobile"],
  ["th", "mi-quang", 10, "mobile"],
  ["zh-hant", "canh-chua-ca", 6, "desktop"],
  ["zh-hant", "banh-flan", 8, "mobile"],
  ["en", "bo-kho", 9, "desktop"]
]) {
  await inspect({
    name: `${locale}-vietnamese-${id}-${label}`, path: `/${locale}/recipes/${id}/`,
    viewport: label === "mobile" ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    interact: async (page) => assertVietnameseRecipe(page, count, locale, id),
    extraScreenshots: [
      { name: `${locale}-vietnamese-${id}-hero-${label}`, selector: ".recipe-detail-hero" },
      { name: `${locale}-vietnamese-${id}-first-step-${label}`, selector: ".method-section li:first-child" },
      ...(id === "banh-flan" ? [5, 7] : id === "canh-chua-ca" ? [4] : []).map((step) => ({
        name: `${locale}-vietnamese-${id}-step-${step}-${label}`, selector: `.method-section ol > li:nth-child(${step})`
      }))
    ]
  });
}
await inspect({
  name: "vietnamese-language-choice-mobile", path: "/en/recipes/banh-xeo/", viewport: { width: 390, height: 844 },
  fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/banh-xeo/") throw new Error("Vietnamese language selection lost the recipe route");
    const response = await page.reload({ waitUntil: "networkidle" });
    if (response?.status() !== 200 || await page.locator("[data-language-prompt]").isVisible()) throw new Error("Vietnamese language preference or deep refresh failed");
  }
});

const frenchRecipeIds = [
  "french-onion-soup", "ratatouille", "gratin-dauphinois", "boeuf-bourguignon", "coq-au-vin",
  "blanquette-de-veau", "poulet-basquaise", "quiche-lorraine", "croque-monsieur", "sole-meuniere",
  "moules-marinieres", "salade-nicoise", "salade-lyonnaise", "french-crepes", "creme-brulee",
  "tarte-tatin", "madeleines", "clafoutis", "chocolate-mousse", "gougeres", "financiers"
];
async function assertFrenchCollection(page, locale) {
  const links = await page.locator(".collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")).sort());
  const expected = frenchRecipeIds.map((id) => `/${locale}/recipes/${id}/`).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error(`French ${locale} collection does not contain the expected 21 unique recipe routes`);
  if (await page.locator(".collection-recipe-card").count() !== 21) throw new Error("French collection must show 21 cards");
  const broken = await page.locator(".collection-recipe-card img").evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`${broken} French card photographs failed to load`);
  if (!(await page.locator("body").evaluate((element) => element.classList.contains("cuisine-french")))) throw new Error("French collection is missing its cuisine theme class");
}
async function assertFrenchRecipe(page, expectedSteps, locale, id) {
  await assertIllustratedRecipe(page, expectedSteps, { traditionalChinese: locale === "zh-hant" });
  const steps = page.locator(".method-section ol > li");
  if (await steps.count() !== expectedSteps) throw new Error(`French ${id} method count differs from its ${expectedSteps} illustrations`);
  for (const entry of await steps.all()) if (await entry.locator(".recipe-step-illustration").count() !== 1) throw new Error(`French ${id} needs exactly one illustration in each step`);
  const images = await page.locator(".recipe-step-illustration img").evaluateAll((entries) => entries.map((entry) => entry.getAttribute("src")));
  if (new Set(images).size !== expectedSteps) throw new Error(`French ${id} reuses a step image`);
  for (const target of ["en", "zh-hant", "ja", "ko", "th"]) {
    if (await page.locator(`.language-popover a[href="/${target}/recipes/${id}/"]`).count() !== 1) throw new Error(`French ${id} is missing its ${target} language route`);
  }
}
await inspect({
  name: "en-search-french-desktop", path: "/en/search/?q=creme%20brulee", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const result = page.locator('.result-card[href="/en/recipes/creme-brulee/"]');
    await result.waitFor({ state: "visible" });
    if (!/French recipe/i.test(await result.innerText())) throw new Error("French search result lacks its cuisine label");
  }
});
for (const [locale, label, viewport] of [
  ["en", "desktop", { width: 1440, height: 1000 }],
  ["zh-hant", "mobile", { width: 390, height: 844 }],
  ["ja", "desktop", { width: 1366, height: 900 }],
  ["ko", "mobile", { width: 390, height: 844 }],
  ["th", "mobile", { width: 390, height: 844 }]
]) {
  await inspect({
    name: `${locale}-french-collection-${label}`, path: `/${locale}/cuisines/french/`, viewport,
    interact: async (page) => {
      await assertFrenchCollection(page, locale);
      const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`French ${locale} direct refresh failed`);
    },
    extraScreenshots: locale === "en" || locale === "zh-hant" ? [
      { name: `${locale}-french-collection-hero-${label}`, selector: ".cuisine-hero" },
      { name: `${locale}-french-first-card-${label}`, selector: ".collection-recipe-card:first-child" }
    ] : []
  });
}
for (const [locale, id, count, label] of [
  ["zh-hant", "creme-brulee", 6, "mobile"],
  ["en", "boeuf-bourguignon", 10, "desktop"],
  ["ja", "quiche-lorraine", 10, "desktop"],
  ["ko", "tarte-tatin", 6, "mobile"],
  ["th", "gougeres", 6, "mobile"]
]) {
  await inspect({
    name: `${locale}-french-${id}-${label}`, path: `/${locale}/recipes/${id}/`,
    viewport: label === "mobile" ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    interact: async (page) => assertFrenchRecipe(page, count, locale, id),
    extraScreenshots: [
      { name: `${locale}-french-${id}-hero-${label}`, selector: ".recipe-detail-hero" },
      { name: `${locale}-french-${id}-first-step-${label}`, selector: ".method-section li:first-child" }
    ]
  });
}
await inspect({
  name: "french-language-choice-mobile", path: "/en/recipes/ratatouille/", viewport: { width: 390, height: 844 },
  fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/ratatouille/") throw new Error("French language selection lost the recipe route");
    const response = await page.reload({ waitUntil: "networkidle" });
    if (response?.status() !== 200 || await page.locator("[data-language-prompt]").isVisible()) throw new Error("French language preference or deep refresh failed");
  }
});

const italianRecipeIds = [
  "pizza-margherita", "spaghetti-carbonara", "cacio-e-pepe", "bucatini-amatriciana", "pasta-alla-norma",
  "trofie-al-pesto", "tagliatelle-ragu-bolognese", "lasagne-bolognese", "risotto-alla-milanese", "ossobuco-alla-milanese",
  "saltimbocca-alla-romana", "melanzane-parmigiana", "ribollita", "arancini-siciliani", "focaccia-genovese",
  "spaghetti-alle-vongole", "pollo-alla-cacciatora", "tiramisu", "panna-cotta", "cannoli-siciliani", "cantucci"
];
async function assertItalianCollection(page, locale) {
  const links = await page.locator(".collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")).sort());
  const expected = italianRecipeIds.map((id) => `/${locale}/recipes/${id}/`).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error(`Italian ${locale} collection does not contain the expected 21 unique recipe routes`);
  if (await page.locator(".collection-recipe-card").count() !== 21) throw new Error("Italian collection must show 21 cards");
  const broken = await page.locator(".collection-recipe-card img").evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`${broken} Italian card photographs failed to load`);
  if (!(await page.locator("body").evaluate((element) => element.classList.contains("cuisine-italian")))) throw new Error("Italian collection is missing its cuisine theme class");
}
async function assertItalianRecipe(page, expectedSteps, locale, id) {
  await assertIllustratedRecipe(page, expectedSteps, { traditionalChinese: locale === "zh-hant" });
  const steps = page.locator(".method-section ol > li");
  if (await steps.count() !== expectedSteps) throw new Error(`Italian ${id} method count differs from its ${expectedSteps} illustrations`);
  for (const entry of await steps.all()) if (await entry.locator(".recipe-step-illustration").count() !== 1) throw new Error(`Italian ${id} needs exactly one illustration in each step`);
  const images = await page.locator(".recipe-step-illustration img").evaluateAll((entries) => entries.map((entry) => entry.getAttribute("src")));
  if (new Set(images).size !== expectedSteps) throw new Error(`Italian ${id} reuses a step image`);
  if (await page.locator(`.breadcrumbs a[href="/${locale}/cuisines/italian/"]`).count() !== 1) throw new Error(`Italian ${id} breadcrumb does not return to Italian cuisine`);
  const expectedRelatedTitle = ({
    en: "More Italian recipes",
    "zh-hant": "更多義大利料理",
    ja: "ほかのイタリア料理",
    ko: "다른 이탈리아 요리",
    th: "สูตรอาหารอิตาเลียนเพิ่มเติม"
  })[locale];
  if (await page.locator("#related-title").innerText() !== expectedRelatedTitle) throw new Error(`Italian ${id} related-recipes title is not cuisine-specific`);
  const relatedLinks = await page.locator(".related-recipes .collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  if (relatedLinks.length !== 3 || relatedLinks.some((href) => !href?.startsWith(`/${locale}/recipes/`))) throw new Error(`Italian ${id} related-recipes links are invalid`);
  for (const target of ["en", "zh-hant", "ja", "ko", "th"]) {
    if (await page.locator(`.language-popover a[href="/${target}/recipes/${id}/"]`).count() !== 1) throw new Error(`Italian ${id} is missing its ${target} language route`);
  }
}
await inspect({
  name: "en-search-italian-desktop", path: "/en/search/?q=tiramisu", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const result = page.locator('.result-card[href="/en/recipes/tiramisu/"]');
    await result.waitFor({ state: "visible" });
    if (!/Italian recipe/i.test(await result.innerText())) throw new Error("Italian search result lacks its cuisine label");
  }
});
for (const [locale, label, viewport] of [
  ["en", "desktop", { width: 1440, height: 1000 }],
  ["zh-hant", "mobile", { width: 390, height: 844 }],
  ["ja", "desktop", { width: 1366, height: 900 }],
  ["ko", "mobile", { width: 390, height: 844 }],
  ["th", "mobile", { width: 390, height: 844 }]
]) {
  await inspect({
    name: `${locale}-italian-collection-${label}`, path: `/${locale}/cuisines/italian/`, viewport,
    interact: async (page) => {
      await assertItalianCollection(page, locale);
      const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`Italian ${locale} direct refresh failed`);
    },
    extraScreenshots: locale === "en" || locale === "zh-hant" ? [
      { name: `${locale}-italian-collection-hero-${label}`, selector: ".cuisine-hero" },
      { name: `${locale}-italian-first-card-${label}`, selector: ".collection-recipe-card:first-child" }
    ] : []
  });
}
for (const [locale, id, count, label] of [
  ["zh-hant", "pizza-margherita", 5, "mobile"],
  ["en", "tagliatelle-ragu-bolognese", 6, "desktop"],
  ["ja", "ossobuco-alla-milanese", 5, "desktop"],
  ["ko", "tiramisu", 6, "mobile"],
  ["th", "cannoli-siciliani", 7, "mobile"]
]) {
  await inspect({
    name: `${locale}-italian-${id}-${label}`, path: `/${locale}/recipes/${id}/`,
    viewport: label === "mobile" ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    interact: async (page) => assertItalianRecipe(page, count, locale, id),
    extraScreenshots: [
      { name: `${locale}-italian-${id}-hero-${label}`, selector: ".recipe-detail-hero" },
      { name: `${locale}-italian-${id}-first-step-${label}`, selector: ".method-section li:first-child" }
    ]
  });
}
await inspect({
  name: "italian-language-choice-mobile", path: "/en/recipes/spaghetti-carbonara/", viewport: { width: 390, height: 844 },
  fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/spaghetti-carbonara/") throw new Error("Italian language selection lost the recipe route");
    const response = await page.reload({ waitUntil: "networkidle" });
    if (response?.status() !== 200 || await page.locator("[data-language-prompt]").isVisible()) throw new Error("Italian language preference or deep refresh failed");
  }
});

const spanishRecipeIds = [
  "paella-valenciana", "tortilla-espanola", "gazpacho-andaluz", "salmorejo-cordobes", "patatas-bravas",
  "croquetas-de-jamon", "gambas-al-ajillo", "pan-con-tomate", "fideua", "cocido-madrileno",
  "fabada-asturiana", "pulpo-a-la-gallega", "bacalao-al-pil-pil", "pisto-manchego", "marmitako",
  "calamares-a-la-romana", "churros-con-chocolate", "crema-catalana", "tarta-de-santiago", "arroz-con-leche"
];
async function assertSpanishCollection(page, locale) {
  const links = await page.locator(".collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")).sort());
  const expected = spanishRecipeIds.map((id) => `/${locale}/recipes/${id}/`).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error(`Spanish ${locale} collection does not contain the expected 20 unique recipe routes`);
  if (await page.locator(".collection-recipe-card").count() !== 20) throw new Error("Spanish collection must show 20 cards");
  const broken = await page.locator(".collection-recipe-card img").evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`${broken} Spanish card photographs failed to load`);
  if (!(await page.locator("body").evaluate((element) => element.classList.contains("cuisine-spanish")))) throw new Error("Spanish collection is missing its cuisine theme class");
}
async function assertSpanishRecipe(page, expectedSteps, locale, id) {
  await assertIllustratedRecipe(page, expectedSteps, { traditionalChinese: locale === "zh-hant" });
  const steps = page.locator(".method-section ol > li");
  if (await steps.count() !== expectedSteps) throw new Error(`Spanish ${id} method count differs from its ${expectedSteps} illustrations`);
  for (const entry of await steps.all()) if (await entry.locator(".recipe-step-illustration").count() !== 1) throw new Error(`Spanish ${id} needs exactly one illustration in each step`);
  const images = await page.locator(".recipe-step-illustration img").evaluateAll((entries) => entries.map((entry) => entry.getAttribute("src")));
  if (new Set(images).size !== expectedSteps) throw new Error(`Spanish ${id} reuses a step image`);
  if (await page.locator(`.breadcrumbs a[href="/${locale}/cuisines/spanish/"]`).count() !== 1) throw new Error(`Spanish ${id} breadcrumb does not return to Spanish cuisine`);
  const expectedRelatedTitle = ({
    en: "More Spanish recipes",
    "zh-hant": "更多西班牙料理",
    ja: "ほかのスペイン料理",
    ko: "다른 스페인 요리",
    th: "สูตรอาหารสเปนเพิ่มเติม"
  })[locale];
  if (await page.locator("#related-title").innerText() !== expectedRelatedTitle) throw new Error(`Spanish ${id} related-recipes title is not cuisine-specific`);
  const relatedLinks = await page.locator(".related-recipes .collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  if (relatedLinks.length !== 3 || relatedLinks.some((href) => !href?.startsWith(`/${locale}/recipes/`))) throw new Error(`Spanish ${id} related-recipes links are invalid`);
  for (const target of ["en", "zh-hant", "ja", "ko", "th"]) {
    if (await page.locator(`.language-popover a[href="/${target}/recipes/${id}/"]`).count() !== 1) throw new Error(`Spanish ${id} is missing its ${target} language route`);
  }
}
await inspect({
  name: "en-search-spanish-desktop", path: "/en/search/?q=paella", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const result = page.locator('.result-card[href="/en/recipes/paella-valenciana/"]');
    await result.waitFor({ state: "visible" });
    if (!/Spanish recipe/i.test(await result.innerText())) throw new Error("Spanish search result lacks its cuisine label");
  }
});
for (const [locale, label, viewport] of [
  ["en", "desktop", { width: 1440, height: 1000 }],
  ["zh-hant", "mobile", { width: 390, height: 844 }],
  ["ja", "desktop", { width: 1366, height: 900 }],
  ["ko", "mobile", { width: 390, height: 844 }],
  ["th", "mobile", { width: 390, height: 844 }]
]) {
  await inspect({
    name: `${locale}-spanish-collection-${label}`, path: `/${locale}/cuisines/spanish/`, viewport,
    interact: async (page) => {
      await assertSpanishCollection(page, locale);
      const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`Spanish ${locale} direct refresh failed`);
    },
    extraScreenshots: locale === "en" || locale === "zh-hant" ? [
      { name: `${locale}-spanish-collection-hero-${label}`, selector: ".cuisine-hero" },
      { name: `${locale}-spanish-first-card-${label}`, selector: ".collection-recipe-card:first-child" }
    ] : []
  });
}
for (const [locale, id, count, label] of [
  ["zh-hant", "paella-valenciana", 7, "mobile"],
  ["en", "cocido-madrileno", 8, "desktop"],
  ["ja", "pulpo-a-la-gallega", 6, "desktop"],
  ["ko", "crema-catalana", 5, "mobile"],
  ["th", "arroz-con-leche", 6, "mobile"]
]) {
  await inspect({
    name: `${locale}-spanish-${id}-${label}`, path: `/${locale}/recipes/${id}/`,
    viewport: label === "mobile" ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    interact: async (page) => assertSpanishRecipe(page, count, locale, id),
    extraScreenshots: [
      { name: `${locale}-spanish-${id}-hero-${label}`, selector: ".recipe-detail-hero" },
      { name: `${locale}-spanish-${id}-first-step-${label}`, selector: ".method-section li:first-child" }
    ]
  });
}
await inspect({
  name: "spanish-language-choice-mobile", path: "/en/recipes/tortilla-espanola/", viewport: { width: 390, height: 844 },
  fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/tortilla-espanola/") throw new Error("Spanish language selection lost the recipe route");
    const response = await page.reload({ waitUntil: "networkidle" });
    if (response?.status() !== 200 || await page.locator("[data-language-prompt]").isVisible()) throw new Error("Spanish language preference or deep refresh failed");
  }
});

const britishRecipeIds = [
  "fish-and-chips", "beef-wellington", "roast-beef-yorkshire-pudding", "shepherds-pie", "toad-in-the-hole",
  "cornish-pasty", "full-english-breakfast", "chicken-tikka-masala", "cullen-skink", "welsh-rarebit",
  "sticky-toffee-pudding", "traditional-trifle", "steak-and-kidney-pie"
];
async function assertBritishCollection(page, locale) {
  const links = await page.locator(".collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")).sort());
  const expected = britishRecipeIds.map((id) => `/${locale}/recipes/${id}/`).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error(`British ${locale} collection does not contain the expected 13 unique recipe routes`);
  if (await page.locator(".collection-recipe-card").count() !== 13) throw new Error("British collection must show 13 cards");
  const broken = await page.locator(".collection-recipe-card img").evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`${broken} British card photographs failed to load`);
  if (!(await page.locator("body").evaluate((element) => element.classList.contains("cuisine-british")))) throw new Error("British collection is missing its cuisine theme class");
}
async function assertBritishRecipe(page, expectedSteps, locale, id) {
  await assertIllustratedRecipe(page, expectedSteps, { traditionalChinese: locale === "zh-hant" });
  const steps = page.locator(".method-section ol > li");
  if (await steps.count() !== expectedSteps) throw new Error(`British ${id} method count differs from its ${expectedSteps} illustrations`);
  for (const entry of await steps.all()) if (await entry.locator(".recipe-step-illustration").count() !== 1) throw new Error(`British ${id} needs exactly one illustration in each step`);
  const images = await page.locator(".recipe-step-illustration img").evaluateAll((entries) => entries.map((entry) => entry.getAttribute("src")));
  if (new Set(images).size !== expectedSteps) throw new Error(`British ${id} reuses a step image`);
  if (await page.locator(`.breadcrumbs a[href="/${locale}/cuisines/british/"]`).count() !== 1) throw new Error(`British ${id} breadcrumb does not return to British cuisine`);
  const expectedRelatedTitle = ({
    en: "More British recipes",
    "zh-hant": "更多英國料理",
    ja: "ほかのイギリス料理",
    ko: "다른 영국 요리",
    th: "สูตรอาหารอังกฤษเพิ่มเติม"
  })[locale];
  if (await page.locator("#related-title").innerText() !== expectedRelatedTitle) throw new Error(`British ${id} related-recipes title is not cuisine-specific`);
  const relatedLinks = await page.locator(".related-recipes .collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  if (relatedLinks.length !== 3 || relatedLinks.some((href) => !href?.startsWith(`/${locale}/recipes/`))) throw new Error(`British ${id} related-recipes links are invalid`);
  for (const target of ["en", "zh-hant", "ja", "ko", "th"]) {
    if (await page.locator(`.language-popover a[href="/${target}/recipes/${id}/"]`).count() !== 1) throw new Error(`British ${id} is missing its ${target} language route`);
  }
}
await inspect({
  name: "en-search-british-desktop", path: "/en/search/?q=wellington", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const result = page.locator('.result-card[href="/en/recipes/beef-wellington/"]');
    await result.waitFor({ state: "visible" });
    if (!/British recipe/i.test(await result.innerText())) throw new Error("British search result lacks its cuisine label");
  }
});
for (const [locale, label, viewport] of [
  ["en", "desktop", { width: 1440, height: 1000 }],
  ["zh-hant", "mobile", { width: 390, height: 844 }],
  ["ja", "desktop", { width: 1366, height: 900 }],
  ["ko", "mobile", { width: 390, height: 844 }],
  ["th", "mobile", { width: 390, height: 844 }]
]) {
  await inspect({
    name: `${locale}-british-collection-${label}`, path: `/${locale}/cuisines/british/`, viewport,
    interact: async (page) => {
      await assertBritishCollection(page, locale);
      const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`British ${locale} direct refresh failed`);
    },
    extraScreenshots: locale === "en" || locale === "zh-hant" ? [
      { name: `${locale}-british-collection-hero-${label}`, selector: ".cuisine-hero" },
      { name: `${locale}-british-first-card-${label}`, selector: ".collection-recipe-card:first-child" }
    ] : []
  });
}
for (const [locale, id, count, label] of [
  ["zh-hant", "fish-and-chips", 7, "mobile"],
  ["en", "steak-and-kidney-pie", 12, "desktop"],
  ["ja", "full-english-breakfast", 9, "desktop"],
  ["ko", "cullen-skink", 6, "mobile"],
  ["th", "traditional-trifle", 10, "mobile"]
]) {
  await inspect({
    name: `${locale}-british-${id}-${label}`, path: `/${locale}/recipes/${id}/`,
    viewport: label === "mobile" ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    interact: async (page) => assertBritishRecipe(page, count, locale, id),
    extraScreenshots: [
      { name: `${locale}-british-${id}-hero-${label}`, selector: ".recipe-detail-hero" },
      { name: `${locale}-british-${id}-first-step-${label}`, selector: ".method-section li:first-child" }
    ]
  });
}
await inspect({
  name: "british-language-choice-mobile", path: "/en/recipes/beef-wellington/", viewport: { width: 390, height: 844 },
  fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/beef-wellington/") throw new Error("British language selection lost the recipe route");
    const response = await page.reload({ waitUntil: "networkidle" });
    if (response?.status() !== 200 || await page.locator("[data-language-prompt]").isVisible()) throw new Error("British language preference or deep refresh failed");
  }
});

const germanRecipeIds = [
  "sauerbraten", "rinderrouladen", "bavarian-krustenbraten", "currywurst", "nuernberger-rostbratwurst",
  "frikadellen", "koenigsberger-klopse", "kartoffelpuffer", "kaesespaetzle", "maultaschen",
  "erbsensuppe", "black-forest-cake", "bienenstich"
];
async function assertGermanCollection(page, locale) {
  const links = await page.locator(".collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")).sort());
  const expected = germanRecipeIds.map((id) => `/${locale}/recipes/${id}/`).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error(`German ${locale} collection does not contain the expected 13 unique recipe routes`);
  if (await page.locator(".collection-recipe-card").count() !== 13) throw new Error("German collection must show 13 cards");
  const broken = await page.locator(".collection-recipe-card img").evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`${broken} German card photographs failed to load`);
  if (!(await page.locator("body").evaluate((element) => element.classList.contains("cuisine-german")))) throw new Error("German collection is missing its cuisine theme class");
}
async function assertGermanRecipe(page, expectedSteps, locale, id) {
  await assertIllustratedRecipe(page, expectedSteps, { traditionalChinese: locale === "zh-hant" });
  const steps = page.locator(".method-section ol > li");
  if (await steps.count() !== expectedSteps) throw new Error(`German ${id} method count differs from its ${expectedSteps} illustrations`);
  for (const entry of await steps.all()) if (await entry.locator(".recipe-step-illustration").count() !== 1) throw new Error(`German ${id} needs exactly one illustration in each step`);
  const images = await page.locator(".recipe-step-illustration img").evaluateAll((entries) => entries.map((entry) => entry.getAttribute("src")));
  if (new Set(images).size !== expectedSteps) throw new Error(`German ${id} reuses a step image`);
  if (await page.locator(`.breadcrumbs a[href="/${locale}/cuisines/german/"]`).count() !== 1) throw new Error(`German ${id} breadcrumb does not return to German cuisine`);
  const expectedRelatedTitle = ({
    en: "More German recipes",
    "zh-hant": "更多德國料理",
    ja: "ほかのドイツ料理",
    ko: "다른 독일 요리",
    th: "สูตรอาหารเยอรมันเพิ่มเติม"
  })[locale];
  if (await page.locator("#related-title").innerText() !== expectedRelatedTitle) throw new Error(`German ${id} related-recipes title is not cuisine-specific`);
  const relatedLinks = await page.locator(".related-recipes .collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  if (relatedLinks.length !== 3 || relatedLinks.some((href) => !href?.startsWith(`/${locale}/recipes/`))) throw new Error(`German ${id} related-recipes links are invalid`);
  for (const target of ["en", "zh-hant", "ja", "ko", "th"]) {
    if (await page.locator(`.language-popover a[href="/${target}/recipes/${id}/"]`).count() !== 1) throw new Error(`German ${id} is missing its ${target} language route`);
  }
}
await inspect({
  name: "en-search-german-desktop", path: "/en/search/?q=sauerbraten", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const result = page.locator('.result-card[href="/en/recipes/sauerbraten/"]');
    await result.waitFor({ state: "visible" });
    if (!/German recipe/i.test(await result.innerText())) throw new Error("German search result lacks its cuisine label");
  }
});
for (const [locale, label, viewport] of [
  ["en", "desktop", { width: 1440, height: 1000 }],
  ["zh-hant", "mobile", { width: 390, height: 844 }],
  ["ja", "desktop", { width: 1366, height: 900 }],
  ["ko", "mobile", { width: 390, height: 844 }],
  ["th", "mobile", { width: 390, height: 844 }]
]) {
  await inspect({
    name: `${locale}-german-collection-${label}`, path: `/${locale}/cuisines/german/`, viewport,
    interact: async (page) => {
      await assertGermanCollection(page, locale);
      const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`German ${locale} direct refresh failed`);
    },
    extraScreenshots: locale === "en" || locale === "zh-hant" ? [
      { name: `${locale}-german-collection-hero-${label}`, selector: ".cuisine-hero" },
      { name: `${locale}-german-first-card-${label}`, selector: ".collection-recipe-card:first-child" }
    ] : []
  });
}
for (const [locale, id, count, label] of [
  ["zh-hant", "currywurst", 6, "mobile"],
  ["en", "maultaschen", 11, "desktop"],
  ["ja", "black-forest-cake", 12, "desktop"],
  ["ko", "bienenstich", 12, "mobile"],
  ["th", "sauerbraten", 9, "mobile"]
]) {
  await inspect({
    name: `${locale}-german-${id}-${label}`, path: `/${locale}/recipes/${id}/`,
    viewport: label === "mobile" ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    interact: async (page) => assertGermanRecipe(page, count, locale, id),
    extraScreenshots: [
      { name: `${locale}-german-${id}-hero-${label}`, selector: ".recipe-detail-hero" },
      { name: `${locale}-german-${id}-first-step-${label}`, selector: ".method-section li:first-child" }
    ]
  });
}
await inspect({
  name: "german-language-choice-mobile", path: "/en/recipes/sauerbraten/", viewport: { width: 390, height: 844 },
  fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/sauerbraten/") throw new Error("German language selection lost the recipe route");
    const response = await page.reload({ waitUntil: "networkidle" });
    if (response?.status() !== 200 || await page.locator("[data-language-prompt]").isVisible()) throw new Error("German language preference or deep refresh failed");
  }
});

const greekRecipeIds = [
  "moussaka", "pastitsio", "pork-souvlaki", "spanakopita", "dolmades", "avgolemono", "fasolada",
  "gigantes-plaki", "gemista", "beef-stifado", "keftedes", "horiatiki", "galaktoboureko"
];
async function assertGreekCollection(page, locale) {
  const links = await page.locator(".collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")).sort());
  const expected = greekRecipeIds.map((id) => `/${locale}/recipes/${id}/`).sort();
  if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error(`Greek ${locale} collection does not contain the expected 13 unique recipe routes`);
  if (await page.locator(".collection-recipe-card").count() !== 13) throw new Error("Greek collection must show 13 cards");
  const broken = await page.locator(".collection-recipe-card img").evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`${broken} Greek card photographs failed to load`);
  if (!(await page.locator("body").evaluate((element) => element.classList.contains("cuisine-greek")))) throw new Error("Greek collection is missing its cuisine theme class");
}
async function assertGreekRecipe(page, expectedSteps, locale, id) {
  await assertIllustratedRecipe(page, expectedSteps, { traditionalChinese: locale === "zh-hant" });
  const steps = page.locator(".method-section ol > li");
  if (await steps.count() !== expectedSteps) throw new Error(`Greek ${id} method count differs from its ${expectedSteps} illustrations`);
  for (const entry of await steps.all()) if (await entry.locator(".recipe-step-illustration").count() !== 1) throw new Error(`Greek ${id} needs exactly one illustration in each step`);
  const images = await page.locator(".recipe-step-illustration img").evaluateAll((entries) => entries.map((entry) => entry.getAttribute("src")));
  if (new Set(images).size !== expectedSteps) throw new Error(`Greek ${id} reuses a step image`);
  if (await page.locator(`.breadcrumbs a[href="/${locale}/cuisines/greek/"]`).count() !== 1) throw new Error(`Greek ${id} breadcrumb does not return to Greek cuisine`);
  const expectedRelatedTitle = ({
    en: "More Greek recipes",
    "zh-hant": "更多希臘料理",
    ja: "ほかのギリシャ料理",
    ko: "다른 그리스 요리",
    th: "สูตรอาหารกรีกเพิ่มเติม"
  })[locale];
  if (await page.locator("#related-title").innerText() !== expectedRelatedTitle) throw new Error(`Greek ${id} related-recipes title is not cuisine-specific`);
  const relatedLinks = await page.locator(".related-recipes .collection-recipe-card > a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
  if (relatedLinks.length !== 3 || relatedLinks.some((href) => !href?.startsWith(`/${locale}/recipes/`))) throw new Error(`Greek ${id} related-recipes links are invalid`);
  for (const target of ["en", "zh-hant", "ja", "ko", "th"]) {
    if (await page.locator(`.language-popover a[href="/${target}/recipes/${id}/"]`).count() !== 1) throw new Error(`Greek ${id} is missing its ${target} language route`);
  }
}
await inspect({
  name: "en-search-greek-desktop", path: "/en/search/?q=moussaka", viewport: { width: 1280, height: 900 },
  interact: async (page) => {
    const result = page.locator('.result-card[href="/en/recipes/moussaka/"]');
    await result.waitFor({ state: "visible" });
    if (!/Greek recipe/i.test(await result.innerText())) throw new Error("Greek search result lacks its cuisine label");
  }
});
for (const [locale, label, viewport] of [
  ["en", "desktop", { width: 1440, height: 1000 }],
  ["zh-hant", "mobile", { width: 390, height: 844 }],
  ["ja", "desktop", { width: 1366, height: 900 }],
  ["ko", "mobile", { width: 390, height: 844 }],
  ["th", "mobile", { width: 390, height: 844 }]
]) {
  await inspect({
    name: `${locale}-greek-collection-${label}`, path: `/${locale}/cuisines/greek/`, viewport,
    interact: async (page) => {
      await assertGreekCollection(page, locale);
      const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
      if (response?.status() !== 200) throw new Error(`Greek ${locale} direct refresh failed`);
    },
    extraScreenshots: locale === "en" || locale === "zh-hant" ? [
      { name: `${locale}-greek-collection-hero-${label}`, selector: ".cuisine-hero" },
      { name: `${locale}-greek-first-card-${label}`, selector: ".collection-recipe-card:first-child" }
    ] : []
  });
}
for (const [locale, id, count, label] of [
  ["zh-hant", "horiatiki", 5, "mobile"],
  ["en", "pork-souvlaki", 7, "desktop"],
  ["ja", "moussaka", 12, "desktop"],
  ["ko", "galaktoboureko", 15, "mobile"],
  ["th", "beef-stifado", 8, "mobile"]
]) {
  await inspect({
    name: `${locale}-greek-${id}-${label}`, path: `/${locale}/recipes/${id}/`,
    viewport: label === "mobile" ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    interact: async (page) => assertGreekRecipe(page, count, locale, id),
    extraScreenshots: [
      { name: `${locale}-greek-${id}-hero-${label}`, selector: ".recipe-detail-hero" },
      { name: `${locale}-greek-${id}-first-step-${label}`, selector: ".method-section li:first-child" }
    ]
  });
}
await inspect({
  name: "greek-language-choice-mobile", path: "/en/recipes/moussaka/", viewport: { width: 390, height: 844 },
  fullPage: false, suppressLanguagePrompt: false, loadLazyImages: false,
  interact: async (page) => {
    await page.locator('[data-language-choice="zh-hant"]').click();
    await page.waitForLoadState("networkidle");
    if (new URL(page.url()).pathname !== "/zh-hant/recipes/moussaka/") throw new Error("Greek language selection lost the recipe route");
    const response = await page.reload({ waitUntil: "networkidle" });
    if (response?.status() !== 200 || await page.locator("[data-language-prompt]").isVisible()) throw new Error("Greek language preference or deep refresh failed");
  }
});

await inspect({
  name: "zh-chinese-collection-mobile", path: "/zh-hant/cuisines/chinese/", viewport: { width: 390, height: 844 },
  interact: async (page) => {
    const firstCard = page.locator(".collection-recipe-card").first();
    await firstCard.waitFor({ state: "visible" });
    if (await page.locator(".collection-recipe-card").count() < 1) throw new Error("Chinese collection has no approved recipe cards");
    const intro = await page.locator(".cuisine-hero p").last().innerText();
    if (!intro.includes("讓你少繞路，真正做得出來") || intro.includes("每道公開食譜都會交叉核對")) throw new Error("Chinese collection intro is not the approved reader-facing SEO copy");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Chinese collection refresh returned ${response?.status() ?? "no response"}`);
  }
});
await inspect({ name: "en-chinese-collection-desktop", path: "/en/cuisines/chinese/", viewport: { width: 1440, height: 1000 } });
await inspect({
  name: "zh-japanese-collection-mobile", path: "/zh-hant/cuisines/japanese/", viewport: { width: 390, height: 844 },
  interact: async (page) => {
    const cards = page.locator(".collection-recipe-card");
    await cards.first().waitFor({ state: "visible" });
    if (await cards.count() < 20) throw new Error("Japanese collection has fewer than 20 approved recipe cards");
    if (!(await page.locator('.collection-recipe-card a[href="/zh-hant/recipes/shoyu-ramen/"]').isVisible())) throw new Error("Japanese collection is missing the final recipe card");
    const intro = await page.locator(".cuisine-hero p").last().innerText();
    if (!intro.includes("讓第一次做也能抓到重點")) throw new Error("Japanese collection intro is not the approved reader-facing SEO copy");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Japanese collection refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "zh-japanese-collection-hero-mobile", selector: ".cuisine-hero" },
    { name: "zh-japanese-first-card-mobile", selector: ".collection-recipe-card:first-child" }
  ]
});
await inspect({
  name: "en-japanese-collection-desktop", path: "/en/cuisines/japanese/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    if (await page.locator(".collection-recipe-card").count() < 20) throw new Error("Desktop Japanese collection has fewer than 20 recipes");
    if (await page.locator('.collection-recipe-card a[href*="mapo-tofu"]').count()) throw new Error("Chinese recipe leaked into Japanese collection");
  },
  extraScreenshots: [{ name: "en-japanese-collection-hero-desktop", selector: ".cuisine-hero" }]
});
await inspect({
  name: "zh-korean-collection-mobile", path: "/zh-hant/cuisines/korean/", viewport: { width: 390, height: 844 },
  interact: async (page) => {
    const cards = page.locator(".collection-recipe-card");
    await cards.first().waitFor({ state: "visible" });
    if (await cards.count() !== 21) throw new Error(`Korean collection expected 21 recipes, found ${await cards.count()}`);
    if (await page.locator('.collection-recipe-card a[href="/zh-hant/recipes/bossam/"]').count() !== 1) throw new Error("Korean collection is missing bossam");
    if (await page.locator('.collection-recipe-card a[href*="omurice"], .collection-recipe-card a[href*="mapo-tofu"]').count()) throw new Error("Another cuisine leaked into Korean collection");
    const intro = await page.locator(".cuisine-hero p").last().innerText();
    if (!intro.includes("讓關鍵步驟不必靠猜")) throw new Error("Korean collection intro is not the approved reader-facing copy");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Korean collection refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "zh-korean-collection-hero-mobile", selector: ".cuisine-hero" },
    { name: "zh-korean-first-card-mobile", selector: ".collection-recipe-card:first-child" }
  ]
});
await inspect({
  name: "en-korean-collection-desktop", path: "/en/cuisines/korean/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    if (await page.locator(".collection-recipe-card").count() !== 21) throw new Error("Desktop Korean collection does not contain exactly 21 recipes");
    if (await page.locator('.collection-recipe-card a[href*="omurice"], .collection-recipe-card a[href*="mapo-tofu"]').count()) throw new Error("Another cuisine leaked into desktop Korean collection");
  },
  extraScreenshots: [{ name: "en-korean-collection-hero-desktop", selector: ".cuisine-hero" }]
});
await inspect({
  name: "zh-thai-collection-mobile", path: "/zh-hant/cuisines/thai/", viewport: { width: 390, height: 844 },
  interact: async (page) => {
    const cards = page.locator(".collection-recipe-card");
    await cards.first().waitFor({ state: "visible" });
    if (await cards.count() !== 21) throw new Error(`Thai collection expected 21 recipes, found ${await cards.count()}`);
    if (await page.locator('.collection-recipe-card a[href="/zh-hant/recipes/boat-noodles/"]').count() !== 1) throw new Error("Thai collection is missing boat noodles");
    if (await page.locator('.collection-recipe-card a[href*="bibimbap"], .collection-recipe-card a[href*="omurice"], .collection-recipe-card a[href*="mapo-tofu"]').count()) throw new Error("Another cuisine leaked into Thai collection");
    const intro = await page.locator(".cuisine-hero p").last().innerText();
    if (!intro.includes("讓你不必等上桌後才憑感覺補救")) throw new Error("Thai collection intro is not the approved reader-facing copy");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Thai collection refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "zh-thai-collection-hero-mobile", selector: ".cuisine-hero" },
    { name: "zh-thai-first-card-mobile", selector: ".collection-recipe-card:first-child" }
  ]
});
await inspect({
  name: "en-thai-collection-desktop", path: "/en/cuisines/thai/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    if (await page.locator(".collection-recipe-card").count() !== 21) throw new Error("Desktop Thai collection does not contain exactly 21 recipes");
    if (await page.locator('.collection-recipe-card a[href*="bibimbap"], .collection-recipe-card a[href*="omurice"], .collection-recipe-card a[href*="mapo-tofu"]').count()) throw new Error("Another cuisine leaked into desktop Thai collection");
  },
  extraScreenshots: [{ name: "en-thai-collection-hero-desktop", selector: ".cuisine-hero" }]
});
await inspect({
  name: "en-omurice-recipe-desktop", path: "/en/recipes/omurice/", viewport: { width: 1440, height: 1000 }, fullPage: false,
  interact: async (page) => {
    await assertIllustratedRecipe(page, 8);
    if (await page.locator('.breadcrumbs a[href="/en/cuisines/japanese/"]').count() !== 1) throw new Error("Omurice breadcrumb does not return to Japanese cuisine");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Omurice deep-route refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "en-omurice-hero-desktop", selector: ".recipe-detail-hero" },
    { name: "en-omurice-ingredients-desktop", selector: ".ingredients-section" },
    { name: "en-omurice-method-desktop", selector: ".method-section" },
    { name: "en-omurice-sources-desktop", selector: ".recipe-sources" }
  ]
});
await inspect({
  name: "zh-chicken-teriyaki-mobile", path: "/zh-hant/recipes/chicken-teriyaki/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => assertIllustratedRecipe(page, 7, { traditionalChinese: true }),
  extraScreenshots: [
    { name: "zh-chicken-teriyaki-hero-mobile", selector: ".recipe-detail-hero" },
    { name: "zh-chicken-teriyaki-method-mobile", selector: ".method-section" }
  ]
});
await inspect({
  name: "zh-onigiri-natural-steps-mobile", path: "/zh-hant/recipes/onigiri/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => assertIllustratedRecipe(page, 5, { traditionalChinese: true }),
  extraScreenshots: [{ name: "zh-onigiri-method-mobile", selector: ".method-section" }]
});
await inspect({
  name: "en-bibimbap-recipe-desktop", path: "/en/recipes/bibimbap/", viewport: { width: 1440, height: 1000 }, fullPage: false,
  interact: async (page) => {
    await assertIllustratedRecipe(page, 11);
    if (await page.locator('.breadcrumbs a[href="/en/cuisines/korean/"]').count() !== 1) throw new Error("Bibimbap breadcrumb does not return to Korean cuisine");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Bibimbap deep-route refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "en-bibimbap-hero-desktop", selector: ".recipe-detail-hero" },
    { name: "en-bibimbap-ingredients-desktop", selector: ".ingredients-section" },
    { name: "en-bibimbap-method-desktop", selector: ".method-section" },
    { name: "en-bibimbap-sources-desktop", selector: ".recipe-sources" }
  ]
});
await inspect({
  name: "ko-mandu-complex-method-mobile", path: "/ko/recipes/mandu/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => {
    await assertIllustratedRecipe(page, 14);
    if (await page.locator('.breadcrumbs a[href="/ko/cuisines/korean/"]').count() !== 1) throw new Error("Mandu breadcrumb does not return to Korean cuisine");
  },
  extraScreenshots: [
    { name: "ko-mandu-hero-mobile", selector: ".recipe-detail-hero" },
    { name: "ko-mandu-method-mobile", selector: ".method-section" }
  ]
});
await inspect({
  name: "zh-gyeran-jjim-short-method-mobile", path: "/zh-hant/recipes/gyeran-jjim/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => assertIllustratedRecipe(page, 5, { traditionalChinese: true }),
  extraScreenshots: [{ name: "zh-gyeran-jjim-method-mobile", selector: ".method-section" }]
});
await inspect({
  name: "en-pad-thai-recipe-desktop", path: "/en/recipes/pad-thai/", viewport: { width: 1440, height: 1000 }, fullPage: false,
  interact: async (page) => {
    await assertIllustratedRecipe(page, 9);
    if (await page.locator('.breadcrumbs a[href="/en/cuisines/thai/"]').count() !== 1) throw new Error("Pad Thai breadcrumb does not return to Thai cuisine");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Pad Thai deep-route refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "en-pad-thai-hero-desktop", selector: ".recipe-detail-hero" },
    { name: "en-pad-thai-ingredients-desktop", selector: ".ingredients-section" },
    { name: "en-pad-thai-method-desktop", selector: ".method-section" },
    { name: "en-pad-thai-sources-desktop", selector: ".recipe-sources" }
  ]
});
await inspect({
  name: "th-khao-man-gai-complex-method-mobile", path: "/th/recipes/khao-man-gai/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => {
    await assertIllustratedRecipe(page, 13);
    if (await page.locator('.breadcrumbs a[href="/th/cuisines/thai/"]').count() !== 1) throw new Error("Khao Man Gai breadcrumb does not return to Thai cuisine");
  },
  extraScreenshots: [
    { name: "th-khao-man-gai-hero-mobile", selector: ".recipe-detail-hero" },
    { name: "th-khao-man-gai-method-mobile", selector: ".method-section" }
  ]
});
await inspect({
  name: "zh-som-tam-short-method-mobile", path: "/zh-hant/recipes/som-tam/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => assertIllustratedRecipe(page, 5, { traditionalChinese: true }),
  extraScreenshots: [{ name: "zh-som-tam-method-mobile", selector: ".method-section" }]
});
await inspect({
  name: "zh-boat-noodles-long-method-mobile", path: "/zh-hant/recipes/boat-noodles/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => assertIllustratedRecipe(page, 14, { traditionalChinese: true }),
  extraScreenshots: [
    { name: "zh-boat-noodles-hero-mobile", selector: ".recipe-detail-hero" },
    { name: "zh-boat-noodles-blood-tempering-mobile", selector: '[data-step-illustration="boat-noodles-step-10-illustration"]' },
    { name: "zh-boat-noodles-broth-finish-mobile", selector: '[data-step-illustration="boat-noodles-step-13-illustration"]' }
  ]
});
await inspect({
  name: "ja-shoyu-ramen-mobile", path: "/ja/recipes/shoyu-ramen/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => assertIllustratedRecipe(page, 8),
  extraScreenshots: [{ name: "ja-shoyu-ramen-method-mobile", selector: ".method-section" }]
});
await inspect({
  name: "en-peking-duck-recipe-desktop", path: "/en/recipes/peking-duck/", viewport: { width: 1440, height: 1000 }, fullPage: false,
  interact: async (page) => assertIllustratedRecipe(page, 8),
  extraScreenshots: [
    { name: "en-peking-duck-method-desktop", selector: ".method-section" },
    { name: "en-peking-duck-step-08-desktop", selector: '.recipe-step-illustration[data-step-illustration="peking-duck-step-08-illustration"]' }
  ]
});
await inspect({
  name: "en-mapo-recipe-desktop", path: "/en/recipes/mapo-tofu/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    if (await page.locator(".ingredients-section li").count() < 5) throw new Error("Recipe ingredients did not render");
    if (await page.locator(".method-section li").count() < 8) throw new Error("Detailed recipe method did not render");
    if (await page.locator(".recipe-step-copy h3").count() < 8) throw new Error("Recipe step headings did not render");
    if (await page.locator(".recipe-step-photo").count() !== 0) throw new Error("Removed step photograph is still rendering");
    await assertIllustratedRecipe(page, 8);
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Recipe deep-route refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "en-mapo-ingredients-desktop", selector: ".ingredients-section" },
    { name: "en-mapo-method-desktop", selector: ".method-section" },
    { name: "en-mapo-illustration-step-01-desktop", selector: '.recipe-step-illustration[data-step-illustration="mapo-tofu-step-01-illustration"]' },
    { name: "en-mapo-sources-desktop", selector: ".recipe-sources" }
  ]
});
await inspect({
  name: "zh-mapo-recipe-mobile", path: "/zh-hant/recipes/mapo-tofu/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => {
    if (await page.locator(".recipe-step-photo").count() !== 0) throw new Error("Removed mobile step photograph is still rendering");
    await assertIllustratedRecipe(page, 8, { traditionalChinese: true });
  },
  extraScreenshots: [
    { name: "zh-mapo-method-mobile", selector: ".method-section" },
    { name: "zh-mapo-illustration-step-01-mobile", selector: '.recipe-step-illustration[data-step-illustration="mapo-tofu-step-01-illustration"]' }
  ]
});
await inspect({
  name: "zh-wonton-recipe-mobile", path: "/zh-hant/recipes/wonton-soup/", viewport: { width: 390, height: 844 }, fullPage: true,
  interact: async (page) => assertIllustratedRecipe(page, 8, { traditionalChinese: true }),
  extraScreenshots: [
    { name: "zh-wonton-ingredients-mobile", selector: ".ingredients-section" },
    { name: "zh-wonton-method-mobile", selector: ".method-section" }
  ]
});
await inspect({ name: "en-sweet-sour-recipe-desktop", path: "/en/recipes/sweet-sour-pork/", viewport: { width: 1440, height: 1000 }, fullPage: false, interact: async (page) => assertIllustratedRecipe(page, 8) });
await inspect({ name: "en-kung-pao-recipe-desktop", path: "/en/recipes/kung-pao-chicken/", viewport: { width: 1440, height: 1000 }, fullPage: false, interact: async (page) => assertIllustratedRecipe(page, 9) });
await inspect({ name: "zh-dan-dan-recipe-mobile", path: "/zh-hant/recipes/dan-dan-noodles/", viewport: { width: 390, height: 844 }, fullPage: false, interact: async (page) => assertIllustratedRecipe(page, 8, { traditionalChinese: true }) });
await inspect({ name: "zh-jiaozi-recipe-mobile", path: "/zh-hant/recipes/jiaozi/", viewport: { width: 390, height: 844 }, fullPage: false, interact: async (page) => assertIllustratedRecipe(page, 8, { traditionalChinese: true }) });
await inspect({ name: "en-char-siu-recipe-desktop", path: "/en/recipes/char-siu/", viewport: { width: 1440, height: 1000 }, fullPage: false, interact: async (page) => assertIllustratedRecipe(page, 8) });
await inspect({ name: "en-scallion-pancakes-recipe-desktop", path: "/en/recipes/scallion-pancakes/", viewport: { width: 1440, height: 1000 }, fullPage: false, interact: async (page) => assertIllustratedRecipe(page, 8) });
await inspect({ name: "ja-clay-pot-recipe-mobile", path: "/ja/recipes/clay-pot-rice/", viewport: { width: 390, height: 844 }, fullPage: false, interact: async (page) => assertIllustratedRecipe(page, 8) });
await inspect({
  name: "en-about-desktop", path: "/en/about/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    const firstSectionLink = page.locator(".info-index a").first();
    const target = await firstSectionLink.getAttribute("href");
    await firstSectionLink.click();
    if (!target || await page.evaluate((expected) => window.location.hash !== expected, target)) throw new Error("About page index link did not navigate to its section");
    await page.evaluate(() => window.scrollTo(0, 0));
  },
  extraScreenshots: [
    { name: "en-about-content-desktop", selector: ".info-layout" },
    { name: "en-about-closing-desktop", selector: ".info-closing" }
  ]
});
await inspect({
  name: "zh-privacy-mobile", path: "/zh-hant/privacy/", viewport: { width: 390, height: 844 }, fullPage: false,
  extraScreenshots: [
    { name: "zh-privacy-content-mobile", selector: ".info-layout" },
    { name: "zh-privacy-references-mobile", selector: ".privacy-references" }
  ]
});
await inspect({ name: "ja-about-mobile", path: "/ja/about/", viewport: { width: 390, height: 844 }, fullPage: false });
await inspect({ name: "ko-privacy-desktop", path: "/ko/privacy/", viewport: { width: 1280, height: 900 }, fullPage: false });
await inspect({ name: "not-found-mobile", path: "/definitely-not-a-page", viewport: { width: 390, height: 844 }, expectedStatus: 404, fullPage: false });

await browser.close();
await writeFile(join(outputDir, "report.json"), `${JSON.stringify({ baseUrl, generatedAt: new Date().toISOString(), results, failures }, null, 2)}\n`, "utf8");
console.log(`Visual QA rendered ${results.length} browser states from ${baseUrl}.`);
if (failures.length) {
  console.error(`Visual QA failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Visual QA automation passed: status, overflow, serious accessibility, console, network and required interactions.");
