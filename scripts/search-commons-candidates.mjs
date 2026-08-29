const query = process.argv.slice(2).join(" ").trim();
if (!query) throw new Error("Usage: node scripts/search-commons-candidates.mjs <dish search terms>");

const api = new URL("https://commons.wikimedia.org/w/api.php");
api.search = new URLSearchParams({
  action: "query",
  format: "json",
  formatversion: "2",
  generator: "search",
  gsrsearch: query,
  gsrnamespace: "6",
  gsrlimit: "20",
  prop: "imageinfo",
  iiprop: "url|size|extmetadata",
  iiurlwidth: "1000"
});

const headers = { "User-Agent": "RecipeNestVault/0.1 (licensed image candidate research)" };
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
let response;
for (let attempt = 1; attempt <= 6; attempt += 1) {
  response = await fetch(api, { headers });
  if (response.ok || response.status !== 429 || attempt === 6) break;
  const retryAfter = Number(response.headers.get("retry-after"));
  await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 2500);
}
if (!response.ok) throw new Error(`Wikimedia API returned ${response.status}`);
const payload = await response.json();
const acceptedLicense = /^(?:CC0|Public domain|CC BY(?:-SA)?)(?:\s|$)/i;
const cleanUrl = (value = "") => {
  if (!value) return "";
  const url = new URL(value.replace(/^http:/, "https:"));
  for (const key of [...url.searchParams.keys()]) if (key.startsWith("utm_")) url.searchParams.delete(key);
  return url.toString();
};
const candidates = (payload.query?.pages || []).map((page) => {
  const info = page.imageinfo?.[0] || {};
  const metadata = info.extmetadata || {};
  return {
    title: page.title,
    sourcePage: cleanUrl(info.descriptionurl || info.descriptionshorturl),
    originalFile: cleanUrl(info.url),
    preview: cleanUrl(info.thumburl),
    width: info.width || 0,
    height: info.height || 0,
    author: String(metadata.Artist?.value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    license: metadata.LicenseShortName?.value || "",
    licenseUrl: cleanUrl(metadata.LicenseUrl?.value),
    acceptedCommercialCandidate: acceptedLicense.test(metadata.LicenseShortName?.value || "")
  };
}).filter((candidate) => candidate.acceptedCommercialCandidate && candidate.originalFile && candidate.licenseUrl);

console.log(JSON.stringify({ query, candidateCount: candidates.length, candidates }, null, 2));
