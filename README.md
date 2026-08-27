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
npm run deploy
```

The deployment command always audits and rebuilds `dist/` before uploading only that generated artifact to the `recipenestvault` Cloudflare Pages project.

## Optional AdSense activation

All indexable content templates include a shared ad component. No Google script or empty advertising space is emitted by default. To activate it for an approved account, set `ADSENSE_CLIENT` to a valid `ca-pub-...` value and `ADSENSE_SLOT_CONTENT` to the numeric responsive slot ID before building. Advertising is intentionally excluded from 404 and search-result screens.

## Image provenance

Homepage photography is a site-owned original generated for Recipe Nest Vault with OpenAI image generation, then split into four responsive crops by `npm run images`. The source prompt requested exactly four clearly separated dishes—sushi, Valencian paella, Margherita pizza and a bacon cheeseburger—on a warm cream editorial table with restrained `#b4235a` accents, no people, brands, labels, text or watermark. The separate Open Graph card was generated for this project with the exact brand title “Recipe Nest Vault” and supporting line “Good food, without the long scroll.”
