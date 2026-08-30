import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "qa-artifacts");
const baseUrl = (process.env.QA_BASE_URL || "http://127.0.0.1:8788").replace(/\/$/, "");
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

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
    const previousPosition = await header.evaluate((element) => element.style.position);
    const previousSkipDisplay = await skipLink.evaluate((element) => element.style.display);
    await header.evaluate((element) => { element.style.position = "absolute"; });
    await skipLink.evaluate((element) => { element.style.display = "none"; });
    await page.locator(extra.selector).screenshot({ path: join(outputDir, `${extra.name}.png`) });
    await header.evaluate((element, value) => { element.style.position = value; }, previousPosition);
    await skipLink.evaluate((element, value) => { element.style.display = value; }, previousSkipDisplay);
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
  name: "zh-cuisine-mobile", path: "/zh-hant/cuisines/taiwanese/", viewport: { width: 390, height: 844 },
  interact: async (page) => {
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Deep-route refresh returned ${response?.status() ?? "no response"}`);
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
