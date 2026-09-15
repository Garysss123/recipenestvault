# Recipe Nest Vault

Static-first, five-language recipe discovery site for `recipenestvault.com`.

## Architecture

- Build-time HTML generation with Node.js
- Static HTML, CSS, JavaScript and pre-generated data only in production
- No server, database, authentication or paid API dependency
- Cloudflare Pages deployment via Wrangler
- Locale routes: `/en/`, `/zh-hant/`, `/ja/`, `/ko/`, `/th/`
- Recipe collections are grouped at build time by `recipe.cuisine`; collection pages, breadcrumbs, related recipes, search labels and schema must never hard-code one cuisine.
- Twenty-one cuisine landing pages per language and a pre-generated browser search index
- Optional AdSense component that stays completely inactive until valid build-time IDs are supplied

## Commands

```powershell
npm install
npm run images
npm run icons
npm run audit:japanese-drafts
npm run audit:thai-drafts
npm run audit:taiwanese-drafts
npm run audit:indian-drafts
npm run audit:vietnamese-drafts
npm test
npm run preview
npm run qa:visual
npm run deploy
```

The deployment command always audits and rebuilds `dist/` before uploading only that generated artifact to the `recipenestvault` Cloudflare Pages project.

For local browser QA, run `npm run preview` in a separate terminal after building. It serves only `dist/` at `http://127.0.0.1:8788`, including the generated redirects, headers and real 404 page. This static preview avoids depending on the local Workers proxy for a site without Functions; the production QA still runs against Cloudflare Pages itself.

For licensed-photo research, `node scripts/search-commons-candidates.mjs <dish terms>` returns Wikimedia Commons candidates with author, original-file, dimensions and commercial-license metadata. Candidates are not approved until their downloaded pixels are inspected against the exact recipe. `node scripts/recipe-photo-contact-sheet.mjs japanese` creates an out-of-artifact finished-photo sheet for that review.

## Visual release gate

Every layout or content iteration must be rendered in a real browser at desktop and mobile widths. The Playwright/Edge suite covers the homepage, cuisine collection, recipe details, language prompt, search, information pages, direct-route refresh, 404 response, overflow, serious accessibility issues, console errors and failed requests. Review the screenshots in `qa-artifacts/visual/<host>-<timestamp>/` visually after the automated assertions pass. Each run retains its own evidence without deleting photo research or earlier local/production screenshots.

For the final gate, run the same suite against production rather than only local output:

```powershell
$env:QA_BASE_URL = 'https://recipenestvault.com'
npm run qa:visual
Remove-Item Env:QA_BASE_URL
```

Do not hand off a release until the custom domain, `pages.dev`, HTTPS, all five locale routes, hard refreshes and representative homepage/category/recipe screenshots have been checked.

## Optional AdSense activation

All indexable content templates include a shared ad component. No Google script or empty advertising space is emitted by default. To activate it for an approved account, set `ADSENSE_CLIENT` to a valid `ca-pub-...` value and `ADSENSE_SLOT_CONTENT` to the numeric responsive slot ID before building. Advertising is intentionally excluded from 404 and search-result screens.

## Content trust and real-photography policy

These are permanent release gates. Recipe count, publishing speed and visual completeness never take priority over reproducibility, factual certainty or licensing evidence.

### Japanese collection release gate

- The first Japanese collection contains 21 complete recipes, exceeding the 20-recipe minimum without publishing filler.
- Its source data is split into `src/japanese-recipes-a.mjs`, `src/japanese-recipes-b.mjs`, and `src/japanese-recipes-c.mjs`; the matching licensed-photo manifests and research records use the same A/B/C grouping.
- Every Japanese recipe must pass `npm run audit:japanese-drafts`: five localized versions, at least four detailed independently actionable steps with no fixed upper limit, at least two direct HTTPS recipe sources, an accepted commercial real-photo license, a reviewed source image of at least 1200 × 800, and a pinned SHA-256 hash. Step count follows the actual method instead of a template.
- Every published Japanese step set follows the existing non-photographic illustration disclosure, provenance, structured-data exclusion and per-step visual-match rules. A finished-dish photograph always remains the recipe hero and `Recipe.image`.

### Korean collection release gate

- The first Korean collection contains 21 complete recipes across barbecue, stews, rice, noodles, street food, pancakes, dumplings and shared dishes.
- Every Korean draft must pass `npm run audit:korean-drafts`: five localized versions, at least two direct HTTPS recipe sources, a visually matched commercial-use real photograph of at least 1200 × 800, and a pinned SHA-256 hash.
- Method length follows the cooking process, never a card template. The first collection intentionally includes genuinely short 5-step recipes and complex 13–14-step recipes; the audit imposes no maximum step count.
- Every Korean first-edition recipe has one reviewed non-photographic illustration for each natural cooking step: 186 illustrations across 21 recipes, covering methods from 5 to 14 steps without forcing a template length. Each set follows the same disclosure, provenance, hash, structured-data exclusion and visual-match rules as the Chinese and Japanese collections.

### Thai collection release gate

- The first Thai collection contains 21 complete recipes across noodles, curries, rice, salads, soups, grilled dishes, fried snacks and dessert.
- Source data is split across `src/thai-recipes-a.mjs` through `src/thai-recipes-e.mjs`; finished-photograph provenance is pinned in `src/thai-photos.mjs`, and illustration provenance is generated in `src/thai-illustration-sets.mjs` from the reviewed PNG sources.
- Every Thai draft must pass `npm run audit:thai-drafts`: five localized versions, at least two direct HTTPS recipe sources, a visually matched commercial-use real photograph of at least 1200 × 800, complete attribution, and pinned photograph and illustration SHA-256 hashes.
- Method length follows actual cooking complexity. The first edition ranges from a concise 5-step Som Tam through 13-step Khao Man Gai and Khao Soi to 14-step beef boat noodles; the audit enforces variation rather than a fixed length.
- All 176 natural cooking steps have one reviewed non-photographic illustration. The reproducible prompt record is `docs/illustration-prompts/thai-cooking-steps-v1.md`; every illustration is visibly disclosed, excluded from recipe structured-data images, and checked against its exact intermediate state before publication.

### Taiwanese collection release gate

- The first Taiwanese collection contains 21 complete recipes spanning noodles, rice bowls, breakfast, night-market snacks, soups, sausage, sticky rice, pastry, chewy desserts, and shaved ice.
- Source data is split across `src/taiwanese-recipes-a.mjs` through `src/taiwanese-recipes-e.mjs`; approved real-photograph provenance is pinned in `src/taiwanese-photos.mjs`, and step-illustration provenance is generated in `src/taiwanese-illustration-sets.mjs`.
- Every Taiwanese draft must pass `npm run audit:taiwanese-drafts`: five localized versions, two direct HTTPS recipe sources, a visually matched commercial-use real photograph of at least 1200 × 800, complete attribution, approved source-sheet provenance, and pinned photograph and illustration SHA-256 hashes.
- All 143 natural cooking steps have one reviewed non-photographic illustration in the existing Recipe Nest Vault editorial style. Methods range from 6 to 10 steps instead of using a fixed card count. The Taiwanese set additionally requires `noPeopleOrHands: true`; hands, fingers, arms, sleeves, people, and body parts are prohibited.
- The reproducible prompt and correction record is `docs/illustration-prompts/taiwanese-cooking-steps-v2.md`. Published step images deliberately keep the same border-free, warm-paper editorial illustration language as the completed Chinese, Japanese, Korean, and Thai pages. Taiwan-specific colour belongs to the page UI, not the cooking illustrations.

### Indian collection release gate

- The first Indian collection contains 21 complete recipes spanning everyday dal and sabzi, paneer and meat curries, fermented breakfasts, rice, breads, grills, street snacks, fried savouries, and sweets.
- Source data is split across `src/indian-recipes-a.mjs` through `src/indian-recipes-e.mjs`; approved real-photograph provenance is pinned in `src/indian-photos.mjs`, and step-illustration provenance is generated in `src/indian-illustration-sets.mjs`.
- Every Indian draft must pass `npm run audit:indian-drafts`: five localized versions, two direct HTTPS recipe sources, a visually reviewed commercial-use real photograph of at least 1200 × 800, complete attribution, source-sheet provenance, and pinned photograph and illustration SHA-256 hashes.
- All 153 natural cooking steps have one separate reviewed non-photographic illustration. Methods range from 6 to 9 steps instead of using a fixed card count, and every set requires `noPeopleOrHands: true`.
- The reproducible prompt and correction record is `docs/illustration-prompts/indian-cooking-steps-v1.md`. The step art keeps the same border-free warm-paper editorial style used by the existing collections; India-specific saffron, earthen brown, and deep green accents belong only to the page UI.

### Vietnamese collection release gate

- The first Vietnamese collection contains 21 complete recipes across noodle broths, grilled-meat bowls, fresh and fried rolls, rice crêpes, baguettes, braised fish and meat, sweet-sour soup, and desserts.
- Source data is split across `src/vietnamese-recipes-a.mjs`, `src/vietnamese-recipes-b.mjs`, and `src/vietnamese-recipes-c1.mjs` through `src/vietnamese-recipes-c4.mjs`. The finished-photo manifest is `src/vietnamese-photos.mjs`; step provenance is generated in `src/vietnamese-illustration-sets.mjs`.
- Every draft must pass `npm run audit:vietnamese-drafts`: complete five-language content, matching cooking facts, two direct HTTPS recipe sources, visually matched commercial-use real photographs of at least 1200 × 800, attribution, approved illustration provenance, and SHA-256 verification.
- Each natural cooking step has one separate reviewed illustration. Methods currently range from 6 to 11 steps and total 172 steps; the audit derives the exact illustration count from the current recipe content rather than limiting the method length. At least four actionable steps are required; there is no hard maximum.
- The reproducible prompt record is `docs/illustration-prompts/vietnamese-cooking-steps-v1.md`. Every illustration set requires `noPeopleOrHands: true` and keeps the existing border-free warm-paper editorial style. Lotus green, soft lotus rose, and sandy rice-paper colours belong to the Vietnamese page UI.
- The browser suite checks the 21-card collection, Vietnamese search labels, language-preserving navigation, direct-route refresh, representative five-language methods, desktop/mobile layouts and image disclosures. Run the suite locally and on production, and inspect the saved screenshots before handoff.

### Brazilian collection release gate

- The first Brazilian collection contains 13 complete recipes spanning feijoada, Bahian seafood, churrasco, cassava-based dishes, Minas Gerais classics, snacks and celebration sweets.
- Source data is split across `src/brazilian-recipes-a.mjs` through `src/brazilian-recipes-d.mjs`; the finished-photo manifest is `src/brazilian-photos.mjs`, and step provenance is generated in `src/brazilian-illustration-sets.mjs`.
- Every Brazilian draft must pass `npm run audit:brazilian-drafts`: five-language content with matching measurable facts, two direct HTTPS recipe sources, a visually reviewed commercial-use real photograph of at least 1200 × 800, attribution, approved illustration provenance and SHA-256 verification.
- The collection contains 94 natural cooking steps, each with one separate reviewed non-photographic illustration. Methods range from 6 to 10 steps and keep the established warm-ivory ink-and-gouache style; generated illustrations are excluded from recipe structured-data photography.
- The reproducible prompt record is `docs/illustration-prompts/brazilian-prompts.json`. The final browser gate remains the same local and production-domain desktop/mobile suite described above.

### Recipe eligibility

- Every public recipe must have a real finished-dish photograph with verifiable permission for commercial use.
- If no qualifying photograph exists, omit the recipe. Never fill the gap with an AI-generated image, 3D render, illustration or unrelated stock photograph.
- Never describe a recipe as site-tested unless Recipe Nest Vault actually prepared and tested it.
- Cross-check every recipe against at least two reliable sources, then write an original, standardized version. Do not copy or translate one author's recipe text.
- Give exact quantities and useful time, temperature, heat-level and doneness cues. Vague instructions do not pass review.
- Split steps at meaningful changes in tool, heat, food-safety state or irreversible technique. Merge trivial continuation actions. Require at least four actionable steps, but never impose a fixed target or upper limit.
- The full-site audit also rejects obvious batch-template convergence for established collections: with 12 or more published recipes, methods must span at least three distinct step counts and no single exact step count may cover more than two thirds of the collection. These are anti-template guardrails, not targets; never split or merge a method merely to satisfy the histogram.
- Exact legacy method-length distributions that predate this gate may be signature-grandfathered in `scripts/audit.mjs`. Any change to their recipe count or step-count distribution invalidates that exemption. The deferred Italian method-granularity upgrade is tracked in `TODO.md`.

### Photograph and recipe consistency

- Prefer a real photograph made by the author of the same recipe when that photograph has an explicit commercial-use license.
- If the photograph and recipe come from different authors, the visible main ingredients, cuts, sauce, cooking method and finished appearance must still be reasonably reproducible from the published recipe.
- Every visible garnish, dip or serving element must be disclosed in the ingredients or serving notes.
- If a material mismatch cannot be explained, replace the photograph, correct and recheck the recipe, or omit the recipe.
- Never reuse one generic dish photograph as the claimed result of several different recipes.

### Ingredient-preparation and process photography

- Process photography is optional and may be added incrementally. Publish a preparation or individual step photograph whenever that specific image passes the real-photo, commercial-license, provenance and visual-match review; other steps remain detailed text.
- Do not imply that separately sourced photographs document one continuous cooking session. Only present images as a coherent sequence when they come from one traceable session for the same published recipe revision.
- If a preparation photograph is published, it must show the listed ingredients after the cuts, measuring and advance preparation required by the method. Material omissions or unlisted ingredients fail review.
- If a cooking-step photograph is published, it must depict that exact step's ingredients, cut, cookware-dependent method and intermediate result. A finished-dish photograph cannot be reused as a preparation or process frame.
- A frame extracted from a video is an adaptation: the source video, author, commercial-use license, original file, exact timestamp and extraction/cropping changes must all be recorded.
- A licensed video or photo series still fails if its ingredients, quantities, cuts, cookware-dependent method or intermediate result materially differs from the published recipe.
- Do not render empty image boxes, generic placeholders or photorealistic AI imagery that could be mistaken for evidence of an actual cooking session. A step without an approved photograph or approved illustration simply keeps its complete written instructions.
- Describe a recipe as a fully photographed step-by-step guide only when its preparation photograph and every published cooking step have approved matching images.

### Static cooking-step illustrations

- Original non-photorealistic static illustrations may explain preparation, order and cooking actions inside a recipe method. They never replace the required real finished-dish photograph.
- Every illustrated recipe must show a visible five-language disclosure before the method and label each image as a static cooking-step illustration rather than a photograph. Keep the OpenAI `image_gen` generator credit once in the recipe's sources section instead of repeating it in the method or under every image.
- The approved Traditional Chinese method notice is exactly `以下料理步驟圖片為插畫靜態示意圖，並非實拍。實際操作請以文字中的份量、火力、時間與熟度判斷為準。`; the per-image label is exactly `料理步驟示意圖，非實拍`.
- In Traditional Chinese, generator provenance appears once under Sources as `步驟示意圖：Recipe Nest Vault 使用 OpenAI image_gen 製作的原創示意圖。` Equivalent placement and meaning are required in the other four languages.
- Written quantities, heat, timing, food-safety temperatures and doneness cues remain the cooking standard. An illustration is never evidence of exact portion, colour, texture or completion.
- Each illustration must be reviewed against its exact step for ingredients, cuts, cookware, action and stage. Correct or reject material visual mismatches before publication.
- Use an original Recipe Nest Vault editorial illustration language. Do not reproduce recognizable characters, layouts or the distinctive visual identity of an existing animation franchise.
- Keep generated source files, generator name, prompt-set identifier, generation date and SHA-256 provenance. Publish responsive compressed derivatives while preserving the reviewed source.
- AI illustrations must remain outside `Recipe.image` and `HowToStep.image` structured data so search engines cannot present them as photographic recipe evidence.
- Do not describe an illustrated method as photographed, tested or documented from one real cooking session.

### Accepted and prohibited licenses

Accepted licenses include Public Domain, CC0, CC BY, CC BY-SA, and other clear terms that explicitly permit commercial reuse and web publication.

Do not use:

- CC BY-NC or any other non-commercial license
- CC BY-ND or terms that prohibit required cropping or adaptation
- Images with an unknown author, unknown origin or unverifiable license
- Images that are merely downloadable but lack commercial-use permission
- Google Images results, social posts or commercial recipe-site images without an explicit qualifying license

### Required public attribution

Every published photograph must expose:

- Image title and original author
- Original source page and a verifiable original-file/download source
- License name/version and license URL
- A clear note describing cropping, resizing, compression or other modifications

Any adapted CC BY-SA output must retain a compatible ShareAlike license and attribution.

### Homepage and editorial imagery

- Homepage, cuisine, featured-card and social-preview food imagery follows the same real-photo and licensing standard.
- Outside the explicitly labelled recipe-method illustration system above, generated or drawn food imagery is not allowed on the homepage, cuisine cards, finished-dish hero, featured cards or social preview.
- Food photographs must not be edited so heavily that ingredient colour, doneness or portion size becomes misleading.

### Five-language consistency

- English, Traditional Chinese, Japanese, Korean and Thai pages share the same quantities, times, temperatures, yields and food-safety facts.
- Translation may improve natural phrasing but must not change recipe facts.
- Images, sources, licenses, canonical URLs, `hreflang` and Recipe JSON-LD must remain consistent across all five versions.
- AI-illustration disclosures and alt text must be complete and semantically consistent across all five versions.

### Mandatory pre-publication audit

Every recipe must pass all of the following before production:

1. At least two accessible, reliable recipe sources were cross-checked.
2. Original photo page, author, license and commercial-use evidence are complete.
3. The photograph matches the ingredients, cuts, method and described result.
4. Quantities, times, temperatures and steps agree across all five languages.
5. Recipe, BreadcrumbList and collection ItemList structured data are valid.
6. Responsive images, dimensions, alt text and visible license attribution are correct.
7. Real desktop and mobile renders have no clipping, overflow, broken images or unreadable content.
8. The Cloudflare Pages production-domain direct URL and hard refresh both return HTTP 200.
9. Any AI step illustration is visibly disclosed, visually matched, hash-verified and excluded from Recipe structured-data images.
10. Collection-level method lengths pass the anti-template distribution gate, unless the exact unchanged legacy distribution is explicitly grandfathered.

If any evidence is incomplete, the recipe must not enter production.

Photo-research helpers write candidates only to the ignored `assets/recipes/real/` and `assets/recipes/alternatives/` directories. A human must compare the actual image with the full recipe before copying one reviewed source into `assets/recipes/approved/` and setting `visualMatchApproved: true`; the build publishes only that approved set.
