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

async function inspect({ name, path, viewport, expectedStatus = 200, fullPage = true, interact, extraScreenshots = [] }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme: "light", reducedMotion: "reduce" });
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
  await page.evaluate(() => document.fonts?.ready);
  for (const image of await page.locator('img[loading="lazy"]').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.complete ? undefined : new Promise((resolve) => { element.addEventListener("load", resolve, { once: true }); element.addEventListener("error", resolve, { once: true }); }));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  if (interact) await interact(page);
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
    const previousPosition = await header.evaluate((element) => element.style.position);
    await header.evaluate((element) => { element.style.position = "absolute"; });
    await page.locator(extra.selector).screenshot({ path: join(outputDir, `${extra.name}.png`) });
    await header.evaluate((element, value) => { element.style.position = value; }, previousPosition);
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
await inspect({ name: "zh-home-mobile", path: "/zh-hant/", viewport: { width: 390, height: 844 }, extraScreenshots: [ { name: "zh-hero-mobile", selector: ".hero" }, { name: "zh-cuisines-mobile", selector: '.cuisine-region[aria-labelledby="region-asia"]' }, { name: "zh-featured-mobile", selector: "#featured" }, { name: "zh-philosophy-mobile", selector: "#philosophy" } ] });
await inspect({
  name: "th-hero-mobile", path: "/th/", viewport: { width: 390, height: 844 }, fullPage: false,
  interact: async (page) => {
    await page.locator("[data-menu-button]").click();
    if (!(await page.locator("[data-nav]").isVisible())) throw new Error("Mobile navigation did not open");
  }
});
await inspect({
  name: "en-search-desktop", path: "/en/search/?q=pizza", viewport: { width: 1280, height: 900 },
  interact: async (page) => { await page.locator(".result-card").first().waitFor({ state: "visible" }); }
});
await inspect({ name: "zh-cuisine-mobile", path: "/zh-hant/cuisines/taiwanese/", viewport: { width: 390, height: 844 } });
await inspect({ name: "not-found-mobile", path: "/definitely-not-a-page", viewport: { width: 390, height: 844 }, expectedStatus: 404, fullPage: false });

await browser.close();
await writeFile(join(outputDir, "report.json"), `${JSON.stringify({ baseUrl, generatedAt: new Date().toISOString(), results, failures }, null, 2)}\n`, "utf8");
console.log(`Visual QA rendered ${results.length} browser states from ${baseUrl}.`);
if (failures.length) {
  console.error(`Visual QA failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("Visual QA automation passed: status, overflow, serious accessibility, console, network and required interactions.");
