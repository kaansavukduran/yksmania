// Content lint.
// 1. Typography for Turkish text in string literals.
//    - Interface sources (pages, components, i18n): any finding fails the run.
//    - Content data (src/learning, src/data): reported only. Those records are
//      pinned byte-for-byte by preservation tests; src/domain/typeset.ts
//      repairs the same slips at display time.
// 2. Content quality audit (tests/content-quality-052.test.ts). The content is
//    TypeScript that uses import.meta, so the audit runs inside vitest and
//    writes a machine-readable report; this script reads it and compares it
//    with the ceilings below. Known gaps are ratchets: a rise fails, a fall
//    asks for the ceiling to be lowered. Every other kind is zero-tolerance;
//    since every card now has a guide, all ceilings are 0.
// Usage: node scripts/lint-content.mjs [--no-audit]
import { readFileSync, readdirSync, statSync, mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

/** Ceilings for the content audit. Lower them as content is repaired; never raise. */
export const CONTENT_CEILINGS = {
  /** Cards without a reason for every option (the last 560 got guides in 053). */
  missingReasons: 0,
  /** A guide whose option reason is empty: zero tolerance. */
  emptyReasons: 0,
  /** Cards that cannot be answered from their own card. */
  dependent: 0,
  /** Topics in the curriculum or the study order but not both. */
  orphanTopics: 0,
  /** Cards without any hint. */
  missingHint: 0,
  /** Cards without a step-by-step solution (help panels < 3). */
  missingSteps: 0,
};
const LABELS = {
  missingReasons: "Eksik çeldirici açıklaması",
  emptyReasons: "Boş şık gerekçesi",
  dependent: "Kendi kartından çözülemeyen soru",
  orphanTopics: "Yetim müfredat konusu",
  missingHint: "İpucu olmayan kart",
  missingSteps: "Adım adım çözümü olmayan kart",
};

/** Compares an audit report with the ceilings. */
export function compareAudit(counts, ceilings = CONTENT_CEILINGS) {
  const over = [];
  const lower = [];
  for (const [key, ceiling] of Object.entries(ceilings)) {
    const value = counts[key];
    if (typeof value !== "number") over.push(`${key}: raporda yok`);
    else if (value > ceiling) over.push(`${key}: ${value} > tavan ${ceiling}`);
    else if (value < ceiling) lower.push(`${key}: ${value} < tavan ${ceiling} (tavanı ${value} yap)`);
  }
  for (const key of Object.keys(counts)) if (!(key in ceilings)) over.push(`${key}: tavanı tanımsız (yeni tür sıfır tolerans)`);
  return { over, lower };
}

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

function runAudit() {
  const dir = mkdtempSync(join(tmpdir(), "yks-icerik-"));
  const out = join(dir, "rapor.json");
  try {
    const run = spawnSync("npx", ["vitest", "run", "tests/content-quality-052.test.ts", "--reporter=dot"], {
      env: { ...process.env, CONTENT_AUDIT_OUT: out },
      encoding: "utf8",
    });
    let report;
    try {
      report = JSON.parse(readFileSync(out, "utf8"));
    } catch {
      console.log(run.stdout?.slice(-2000) ?? "", run.stderr?.slice(-2000) ?? "");
      return { failed: true, message: "İçerik denetimi raporu üretilemedi." };
    }
    return { failed: run.status !== 0, report };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  let failed = false;
  const ui = scan(UI, false);
  const content = scan(CONTENT, true);
  console.log(`Tipografi · Arayüz: ${ui.length} bulgu · İçerik verisi (yalnız rapor, gösterimde düzeltilir): ${content.length} bulgu`);
  for (const line of ui) console.log(line);
  if (ui.length) failed = true;

  if (!process.argv.includes("--no-audit")) {
    const audit = runAudit();
    if (!audit.report) {
      console.log(audit.message);
      failed = true;
    } else {
      const { counts, cards } = audit.report;
      console.log(`İçerik denetimi (${cards} kart):`);
      for (const [key, label] of Object.entries(LABELS))
        console.log(`  ${label}: ${counts[key]} (tavan ${CONTENT_CEILINGS[key]})`);
      const { over, lower } = compareAudit(counts);
      for (const line of over) console.log(`  KIRMIZI ${line}`);
      for (const line of lower) console.log(`  Hatırlatma: ${line}`);
      if (over.length || audit.failed) failed = true;
    }
  }
  if (failed) process.exit(1);
}
