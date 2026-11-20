// Typography lint for Turkish text in string literals.
// - Interface sources (pages, components, i18n): any finding fails the run.
// - Content data (src/learning, src/data): reported only. Those records are
//   pinned byte-for-byte by preservation tests; src/domain/typeset.ts repairs
//   the same slips at display time.
// Usage: node scripts/lint-content.mjs
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const L = "a-zçğıöşüâîû";
const RULES = [
  ["virgül/noktalı virgülden sonra boşluk yok", new RegExp(`(?<![A-Za-z0-9ÇĞİÖŞÜ${L}])[A-ZÇĞİÖŞÜ]?[${L}]{2,}[,;](?=[${L}]{3,})`, "g")],
  ["noktalama öncesi boşluk", new RegExp(`[${L}A-ZÇĞİÖŞÜ0-9)] +[,.](?=\\s|$)`, "g")],
  ["üç nokta yerine …", /(?<![.…])\.\.\.(?!\.)/g],
  ["çift noktalama", /(?<![.\d])(,,|;;|,\.|\.,)(?!\d)/g],
  ["eksik glif riski (✦ ✓ ✕ gibi dingbat)", /[✀-➿]/g],
];
const UI = ["src/pages", "src/components", "src/i18n.ts", "src/App.tsx"];
const CONTENT = ["src/learning", "src/data"];
const strRe = /"((?:[^"\\\n]|\\.)*)"/g;

function files(path) {
  const st = statSync(path);
  if (st.isFile()) return /\.(tsx?|json)$/.test(path) ? [path] : [];
  return readdirSync(path).flatMap((name) => files(join(path, name)));
}
function scan(paths, skipFigures) {
  const found = [];
  for (const file of paths.flatMap(files)) {
    if (skipFigures && file.includes("sectionFigures")) continue;
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const m of line.matchAll(strRe)) {
        const text = m[1];
        if (!text.includes(" ")) continue;
        for (const [name, re] of RULES)
          for (const hit of text.matchAll(re)) found.push(`${file}:${i + 1}: ${name}: …${text.slice(Math.max(0, hit.index - 18), hit.index + hit[0].length + 18)}…`);
      }
    });
  }
  return found;
}

const ui = scan(UI, false);
const content = scan(CONTENT, true);
console.log(`Arayüz: ${ui.length} bulgu · İçerik verisi (yalnız rapor, gösterimde düzeltilir): ${content.length} bulgu`);
for (const line of ui) console.log(line);
if (ui.length) process.exit(1);
