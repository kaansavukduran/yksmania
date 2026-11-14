import { readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
// Windows resolves these extensionless imports without case sensitivity.
// Catch ambiguous names on Linux before a native Windows build is attempted.
const root = resolve(process.argv[2] ?? "src");
const modules = new Map();
function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (entry.isFile() && /\.[cm]?[jt]sx?$/.test(entry.name)) {
      const name = relative(root, file).replaceAll("\\", "/");
      const key = name.replace(/\.[^.]+$/, "").toLowerCase();
      if (modules.has(key)) {
        throw Error(`MODULE_PATH_COLLISION: ${modules.get(key)} / ${name}`);
      }
      modules.set(key, name);
    }
  }
}
visit(root);
console.log(`Module paths: ${modules.size} unambiguous names`);
