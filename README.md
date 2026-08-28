# Recipe Nest Vault

Static-first, five-language recipe discovery site for `recipenestvault.com`.

## Architecture

- Build-time HTML generation with Node.js
- Static HTML, CSS, JavaScript and pre-generated data only in production
- No server, database, authentication or paid API dependency
- Cloudflare Pages deployment via Wrangler
- Locale routes: `/en/`, `/zh-hant/`, `/ja/`, `/ko/`, `/th/`
- Twenty-one cuisine landing pages per language and a pre-generated browser search index
- Optional AdSense component that stays completely inactive until valid build-time IDs are supplied

## Commands

```powershell
npm install
npm run images
npm run icons
npm test
npm run qa:visual
npm run deploy
```

The deployment command always audits and rebuilds `dist/` before uploading only that generated artifact to the `recipenestvault` Cloudflare Pages project.

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

### Recipe eligibility

- Every public recipe must have a real finished-dish photograph with verifiable permission for commercial use.
- If no qualifying photograph exists, omit the recipe. Never fill the gap with an AI-generated image, 3D render, illustration or unrelated stock photograph.
- Never describe a recipe as site-tested unless Recipe Nest Vault actually prepared and tested it.
- Cross-check every recipe against at least two reliable sources, then write an original, standardized version. Do not copy or translate one author's recipe text.
- Give exact quantities and useful time, temperature, heat-level and doneness cues. Vague instructions do not pass review.

### Photograph and recipe consistency

- Prefer a real photograph made by the author of the same recipe when that photograph has an explicit commercial-use license.
- If the photograph and recipe come from different authors, the visible main ingredients, cuts, sauce, cooking method and finished appearance must still be reasonably reproducible from the published recipe.
- Every visible garnish, dip or serving element must be disclosed in the ingredients or serving notes.
- If a material mismatch cannot be explained, replace the photograph, correct and recheck the recipe, or omit the recipe.
- Never reuse one generic dish photograph as the claimed result of several different recipes.

### Ingredient-preparation and process photography

- A photographed recipe sequence must document one traceable cooking session for the same published recipe revision. Do not assemble a false sequence from unrelated kitchens, batches, recipes or stock photographs.
- The preparation photograph must show the listed ingredients after the cuts, measuring and advance preparation required by the method. Material omissions or unlisted ingredients fail review.
- Every published cooking step must have its own matching frame from that sequence. A finished-dish photograph cannot be reused as a preparation or process frame.
- A frame extracted from a video is an adaptation: the source video, author, commercial-use license, original file, exact timestamp and extraction/cropping changes must all be recorded.
- A licensed video or photo series still fails if its ingredients, quantities, cuts, cookware-dependent method or intermediate result materially differs from the published recipe.
- Do not render empty image boxes, generic placeholders or AI-generated process imagery. Until a complete sequence passes review, keep the recipe text-only and do not describe it as a photographed step-by-step guide.

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
- Generated or drawn assets are allowed only for non-food brand decoration that cannot be mistaken for a recipe result, with provenance clearly stated.
- Food photographs must not be edited so heavily that ingredient colour, doneness or portion size becomes misleading.

### Five-language consistency

- English, Traditional Chinese, Japanese, Korean and Thai pages share the same quantities, times, temperatures, yields and food-safety facts.
- Translation may improve natural phrasing but must not change recipe facts.
- Images, sources, licenses, canonical URLs, `hreflang` and Recipe JSON-LD must remain consistent across all five versions.

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

If any evidence is incomplete, the recipe must not enter production.

Photo-research helpers write candidates only to the ignored `assets/recipes/real/` and `assets/recipes/alternatives/` directories. A human must compare the actual image with the full recipe before copying one reviewed source into `assets/recipes/approved/` and setting `visualMatchApproved: true`; the build publishes only that approved set.
