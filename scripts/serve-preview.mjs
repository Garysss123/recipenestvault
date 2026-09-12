import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PREVIEW_PORT || 8788);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Invalid PREVIEW_PORT");
const redirects = new Map((await readFile(resolve(root, "_redirects"), "utf8")).trim().split(/\r?\n/).map((line) => {
  const [from, to, status] = line.trim().split(/\s+/);
  return [from, { to, status: Number(status) }];
}));
const headerRules = [];
for (const line of (await readFile(resolve(root, "_headers"), "utf8")).split(/\r?\n/)) {
  if (line.startsWith("/")) headerRules.push({ path: line.trim(), headers: {} });
  else if (line.trim() && headerRules.length) {
    const colon = line.indexOf(":");
    if (colon > 0) headerRules.at(-1).headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
}
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff"
};

const server = createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" }); response.end(); return;
    }
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.includes("\\") || pathname.includes("\0")) { response.writeHead(400); response.end(); return; }
    const redirect = redirects.get(pathname);
    if (redirect) { response.writeHead(redirect.status, { Location: redirect.to + url.search }); response.end(); return; }
    let file = resolve(root, "." + pathname);
    const within = relative(root, file);
    if (within === ".." || within.startsWith(".." + sep)) { response.writeHead(400); response.end(); return; }
    let status = 200;
    let metadata;
    try {
      metadata = await stat(file);
      if (metadata.isDirectory()) {
        if (!pathname.endsWith("/")) { response.writeHead(301, { Location: pathname + "/" + url.search }); response.end(); return; }
        file = resolve(file, "index.html"); metadata = await stat(file);
      }
      if (!metadata.isFile()) throw new Error("Not a file");
    } catch {
      file = resolve(root, "404.html"); metadata = await stat(file); status = 404;
    }
    const headers = {};
    for (const rule of headerRules) {
      if (rule.path.endsWith("*") ? pathname.startsWith(rule.path.slice(0, -1)) : pathname === rule.path) Object.assign(headers, rule.headers);
    }
    response.writeHead(status, { ...headers, "Content-Type": types[extname(file)] || "application/octet-stream", "Content-Length": metadata.size, "Cache-Control": "no-store" });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).on("error", () => response.destroy()).pipe(response);
  } catch (error) {
    if (!response.headersSent) response.writeHead(error instanceof URIError ? 400 : 500);
    response.end();
  }
});
server.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
server.listen(port, "127.0.0.1", () => console.log(`Static artifact preview: http://127.0.0.1:${port} (${root})`));
