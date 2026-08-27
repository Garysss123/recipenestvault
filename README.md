# Recipe Nest Vault

Static-first, five-language recipe discovery site for `recipenestvault.com`.

## Architecture

- Build-time HTML generation with Node.js
- Static HTML, CSS, JavaScript and pre-generated data only in production
- No server, database, authentication or paid API dependency
- Cloudflare Pages deployment via Wrangler
- Locale routes: `/en/`, `/zh-hant/`, `/ja/`, `/ko/`, `/th/`

## Commands

```powershell
npm install
npm test
npm run deploy
```

The deployment command always audits and rebuilds `dist/` before uploading only that generated artifact to the `recipenestvault` Cloudflare Pages project.
