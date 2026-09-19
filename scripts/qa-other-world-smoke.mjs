import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const baseUrl = (process.env.QA_BASE_URL || 'http://127.0.0.1:8788').replace(/\/$/, '');
const outputDir = join(root, 'qa-artifacts', 'visual', `${new URL(baseUrl).hostname}-other-world-smoke-${new Date().toISOString().replace(/[:.]/g, '-')}`);
await mkdir(outputDir, { recursive: true });
const recipeIds = [
  'filipino-chicken-adobo', 'pancit-bihon', 'indonesian-beef-rendang', 'nasi-goreng', 'nasi-lemak',
  'singapore-chilli-crab', 'cambodian-fish-amok', 'lao-chicken-larb', 'mohinga', 'nepali-chicken-momo',
  'sri-lankan-egg-hoppers', 'uzbek-plov', 'imeretian-khachapuri', 'pierogi-ruskie', 'ukrainian-borscht',
  'jamaican-jerk-chicken', 'cuban-ropa-vieja', 'trinidad-doubles', 'peruvian-ceviche', 'lamingtons'
];
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
const failures = [];

async function inspect({ name, path, viewport, fullPage = true, check }) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'reduce' });
  await context.addInitScript(() => localStorage.setItem('rnv-language-preference-v1', 'qa'));
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  const httpFailures = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('requestfailed', (request) => requestFailures.push(`${request.method()} ${request.url()}`));
  page.on('response', (response) => { if (response.status() >= 400) httpFailures.push(`${response.status()} ${response.url()}`); });
  try {
    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
    if (response?.status() !== 200) throw new Error(`Route returned ${response?.status() ?? 'no response'}`);
    await page.evaluate(() => document.fonts?.ready);
    for (const image of await page.locator('img[loading="lazy"]').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await check(page);
    const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    if (overflow.scrollWidth > overflow.clientWidth + 1) throw new Error(`Horizontal overflow ${overflow.scrollWidth} > ${overflow.clientWidth}`);
    if (consoleErrors.length || requestFailures.length || httpFailures.length) throw new Error(JSON.stringify({ consoleErrors, requestFailures, httpFailures }));
    await page.screenshot({ path: join(outputDir, `${name}.png`), fullPage });
    results.push({ name, path, status: response.status(), overflow, consoleErrors, requestFailures, httpFailures });
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  } finally {
    await context.close();
  }
}

await inspect({
  name: 'en-other-world-collection-desktop', path: '/en/cuisines/other-world/', viewport: { width: 1440, height: 1000 },
  check: async (page) => {
    const links = await page.locator('.collection-recipe-card > a').evaluateAll((items) => items.map((item) => item.getAttribute('href')).sort());
    const expected = recipeIds.map((id) => `/en/recipes/${id}/`).sort();
    if (JSON.stringify(links) !== JSON.stringify(expected)) throw new Error('Collection does not contain all 20 unique recipe routes');
    if (!(await page.locator('body').evaluate((element) => element.classList.contains('cuisine-other-world')))) throw new Error('Collection cuisine theme class is missing');
    const broken = await page.locator('.collection-recipe-card img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).length);
    if (broken) throw new Error(`${broken} collection photographs failed to load`);
  }
});

await inspect({
  name: 'zh-hant-other-world-collection-mobile', path: '/zh-hant/cuisines/other-world/', viewport: { width: 390, height: 844 },
  check: async (page) => {
    if (await page.locator('.collection-recipe-card').count() !== 20) throw new Error('Mobile collection does not show all 20 recipe cards');
  }
});

await inspect({
  name: 'en-filipino-adobo-photo-desktop', path: '/en/recipes/filipino-chicken-adobo/', viewport: { width: 1440, height: 1000 }, fullPage: false,
  check: async (page) => {
    const photo = page.locator('.recipe-detail-photo img');
    if (!(await photo.evaluate((image) => image.complete && image.naturalWidth > 0))) throw new Error('Adobo finished-dish photo failed to load');
    const steps = page.locator('.method-section ol > li');
    if (await steps.count() !== 6 || await page.locator('.recipe-step-illustration').count() !== 6) throw new Error('Adobo method does not have six matching step illustrations');
    const broken = await page.locator('.recipe-step-illustration img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).length);
    if (broken) throw new Error(`${broken} adobo step illustrations failed to load`);
  }
});

await inspect({
  name: 'zh-hant-lamingtons-mobile', path: '/zh-hant/recipes/lamingtons/', viewport: { width: 390, height: 844 }, fullPage: false,
  check: async (page) => {
    if (await page.locator('.method-section ol > li').count() !== 7) throw new Error('Lamington method does not show seven steps');
    if (await page.locator('.recipe-step-illustration img').evaluateAll((images) => images.filter((image) => !image.complete || !image.naturalWidth).length)) throw new Error('A lamingtons step image failed to load');
  }
});

await browser.close();
await writeFile(join(outputDir, 'report.json'), `${JSON.stringify({ baseUrl, generatedAt: new Date().toISOString(), results, failures }, null, 2)}\n`, 'utf8');
console.log(`Other-world smoke QA: ${results.length} states from ${baseUrl}; evidence in ${outputDir}`);
if (failures.length) {
  console.error(`Other-world smoke QA failed (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('Other-world desktop/mobile collection, finished-photo, step-art, route, network and overflow checks passed.');
