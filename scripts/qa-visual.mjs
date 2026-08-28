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
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Chinese collection refresh returned ${response?.status() ?? "no response"}`);
  }
});
await inspect({ name: "en-chinese-collection-desktop", path: "/en/cuisines/chinese/", viewport: { width: 1440, height: 1000 } });
await inspect({ name: "en-peking-duck-recipe-desktop", path: "/en/recipes/peking-duck/", viewport: { width: 1440, height: 1000 }, fullPage: false });
await inspect({
  name: "en-mapo-recipe-desktop", path: "/en/recipes/mapo-tofu/", viewport: { width: 1440, height: 1000 },
  interact: async (page) => {
    if (await page.locator(".ingredients-section li").count() < 5) throw new Error("Recipe ingredients did not render");
    if (await page.locator(".method-section li").count() < 8) throw new Error("Detailed recipe method did not render");
    if (await page.locator(".recipe-step-copy h3").count() < 8) throw new Error("Recipe step headings did not render");
    if (await page.locator(".recipe-step-photo").count() !== 0) throw new Error("Removed step photograph is still rendering");
    const response = await page.reload({ waitUntil: "networkidle", timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Recipe deep-route refresh returned ${response?.status() ?? "no response"}`);
  },
  extraScreenshots: [
    { name: "en-mapo-ingredients-desktop", selector: ".ingredients-section" },
    { name: "en-mapo-method-desktop", selector: ".method-section" },
    { name: "en-mapo-sources-desktop", selector: ".recipe-sources" }
  ]
});
await inspect({
  name: "zh-mapo-recipe-mobile", path: "/zh-hant/recipes/mapo-tofu/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => {
    if (await page.locator(".recipe-step-photo").count() !== 0) throw new Error("Removed mobile step photograph is still rendering");
  },
  extraScreenshots: [
    { name: "zh-mapo-method-mobile", selector: ".method-section" }
  ]
});
await inspect({
  name: "zh-wonton-recipe-mobile", path: "/zh-hant/recipes/wonton-soup/", viewport: { width: 390, height: 844 }, fullPage: true,
  extraScreenshots: [
    { name: "zh-wonton-ingredients-mobile", selector: ".ingredients-section" },
    { name: "zh-wonton-method-mobile", selector: ".method-section" }
  ]
});
await inspect({ name: "en-sweet-sour-recipe-desktop", path: "/en/recipes/sweet-sour-pork/", viewport: { width: 1440, height: 1000 }, fullPage: false });
await inspect({ name: "en-kung-pao-recipe-desktop", path: "/en/recipes/kung-pao-chicken/", viewport: { width: 1440, height: 1000 }, fullPage: false });
await inspect({ name: "zh-dan-dan-recipe-mobile", path: "/zh-hant/recipes/dan-dan-noodles/", viewport: { width: 390, height: 844 }, fullPage: false });
await inspect({ name: "zh-jiaozi-recipe-mobile", path: "/zh-hant/recipes/jiaozi/", viewport: { width: 390, height: 844 }, fullPage: false });
await inspect({ name: "en-char-siu-recipe-desktop", path: "/en/recipes/char-siu/", viewport: { width: 1440, height: 1000 }, fullPage: false });
await inspect({ name: "en-scallion-pancakes-recipe-desktop", path: "/en/recipes/scallion-pancakes/", viewport: { width: 1440, height: 1000 }, fullPage: false });
await inspect({ name: "ja-clay-pot-recipe-mobile", path: "/ja/recipes/clay-pot-rice/", viewport: { width: 390, height: 844 }, fullPage: false });
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
