import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, "public");
const source = join(publicDir, "logo.svg");
const temporary = join(publicDir, ".icon-temp");
await mkdir(temporary, { recursive: true });

const icoPaths = [];
for (const size of [16, 32, 48, 64]) {
  const path = join(temporary, `icon-${size}.png`);
  await sharp(source).resize(size, size).png().toFile(path);
  icoPaths.push(path);
}
await writeFile(join(publicDir, "favicon.ico"), await pngToIco(icoPaths));
await sharp(source).resize(192, 192).png().toFile(join(publicDir, "icon-192.png"));
await sharp(source).resize(512, 512).png().toFile(join(publicDir, "icon-512.png"));
await rm(temporary, { recursive: true, force: true });
console.log("Prepared favicon.ico and 192/512px application icons.");
