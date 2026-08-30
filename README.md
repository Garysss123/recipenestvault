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
npm test
npm run qa:visual
npm run deploy
```

The deployment command always audits and rebuilds `dist/` before uploading only that generated artifact to the `recipenestvault` Cloudflare Pages project.

For licensed-photo research, `node scripts/search-commons-candidates.mjs <dish terms>` returns Wikimedia Commons candidates with author, original-file, dimensions and commercial-license metadata. Candidates are not approved until their downloaded pixels are inspected against the exact recipe. `node scripts/recipe-photo-contact-sheet.mjs japanese` creates an out-of-artifact finished-photo sheet for that review.

## Visual release gate

Every layout or content iteration must be rendered in a real browser at desktop and mobile widths. The Playwright/Edge suite covers the homepage, cuisine collection, recipe details, language prompt, search, information pages, direct-route refresh, 404 response, overflow, serious accessibility issues, console errors and failed requests. Review the screenshots in `qa-artifacts/` visually after the automated assertions pass.

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

### Recipe eligibility

- Every public recipe must have a real finished-dish photograph with verifiable permission for commercial use.
- If no qualifying photograph exists, omit the recipe. Never fill the gap with an AI-generated image, 3D render, illustration or unrelated stock photograph.
- Never describe a recipe as site-tested unless Recipe Nest Vault actually prepared and tested it.
- Cross-check every recipe against at least two reliable sources, then write an original, standardized version. Do not copy or translate one author's recipe text.
- Give exact quantities and useful time, temperature, heat-level and doneness cues. Vague instructions do not pass review.
- Split steps at meaningful changes in tool, heat, food-safety state or irreversible technique. Merge trivial continuation actions. Require at least four actionable steps, but never impose a fixed target or upper limit.

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

If any evidence is incomplete, the recipe must not enter production.

Photo-research helpers write candidates only to the ignored `assets/recipes/real/` and `assets/recipes/alternatives/` directories. A human must compare the actual image with the full recipe before copying one reviewed source into `assets/recipes/approved/` and setting `visualMatchApproved: true`; the build publishes only that approved set.
