import fs from "node:fs/promises";
import path from "node:path";
import { legacyPublicImages, replacementImageFormats } from "./legacy-public-assets.mjs";

const root = path.resolve(process.argv[2] || "dist");
const sw = await fs.readFile(path.join(root, "sw.js"), "utf8");
const cached = new Map();
for (const match of sw.matchAll(/\{url:"([^"]+)",revision:(null|"[^"]+")\}/g)) {
  const [, url, revision] = match;
  // Manifest icons may be included by both VitePWA and the asset glob.
  if (cached.has(url) && cached.get(url) !== revision)
    throw Error(`Conflicting offline asset revisions: ${url}`);
  cached.set(url, revision);
}
if (!cached.has("index.html")) throw Error("Invalid offline cache manifest");
for (const oldImage of legacyPublicImages) {
  await fs.access(path.join(root, oldImage));
  if (cached.has(oldImage)) throw Error(`Legacy PNG should be served outside the current precache: ${oldImage}`);
  const base = oldImage.slice(0, -4);
  const extension = replacementImageFormats[oldImage];
  const replacement = [...cached].filter(([url]) => url.startsWith(`${base}-`) && url.endsWith(`.${extension}`));
  if (replacement.length !== 1 || replacement[0][1] !== "null")
    throw Error(`Expected one fingerprinted offline ${extension} for ${oldImage}`);
}

async function walk(dir) {
  const files = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else files.push(file);
  }
  return files;
}

// The service worker and its loader are fetched by the browser separately.
// Every teaching chunk, diagram, animation, font and PDF runtime must be cached.
const required = (await walk(root)).filter((file) => {
  const name = path.relative(root, file).split(path.sep).join("/");
  return (
    !/^(?:sw|workbox-[^/]+)\.js$/.test(name) &&
    !legacyPublicImages.includes(name) &&
    /\.(?:js|mjs|css|html|svg|png|webp|woff2|wasm|bcmap|pfb|ttf)$/.test(name)
  );
});
let total = 0;
let largest = { file: "", bytes: 0 };
for (const file of required) {
  const name = path.relative(root, file).split(path.sep).join("/");
  if (!cached.has(name)) throw Error(`Missing offline asset: ${name}`);
  const { size } = await fs.stat(file);
  if (size > 5 * 1024 * 1024)
    throw Error(`Offline asset exceeds 5 MiB: ${name}`);
  total += size;
  if (size > largest.bytes) largest = { file: name, bytes: size };
}
for (const name of cached.keys()) {
  const file = path.resolve(root, name);
  if (!file.startsWith(root + path.sep)) throw Error("Cache URL escapes build");
  await fs.access(file);
}
console.log(
  JSON.stringify({ offlineAssets: required.length, bytes: total, largest }),
);
