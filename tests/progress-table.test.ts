import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { lessons } from "../src/domain/content";
import curriculum from "../src/data/curriculum.json";
import { lessonGuides } from "../src/learning/guides";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { foundationLessons } from "../src/learning/foundations";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import { helpPanels } from "../src/learning/questionHelp";
import { osymRows } from "../src/learning/osym";
import { examCatalogue } from "../src/domain/exams";

/*
 * Machine-readable progress record. The table shown at the end of every Forge
 * round is generated here from the code and the two counter documents, so the
 * numbers cannot drift. `npm run progress` rewrites docs/ILERLEME.json and
 * docs/ILERLEME.md; the plain test run fails if they are stale.
 */
const SUBJECTS: [id: string, name: string, sheets: number][] = [
  ["tyt-turkce", "TYT Türkçe", 33],
  ["tyt-matematik", "TYT Matematik", 38],
  ["tyt-geometri", "TYT Geometri", 32],
  ["tyt-fizik", "TYT Fizik", 24],
  ["tyt-kimya", "TYT Kimya", 56],
  ["tyt-biyoloji", "TYT Biyoloji", 36],
  ["tyt-tarih", "TYT Tarih", 24],
  ["tyt-cografya", "TYT Coğrafya", 40],
  ["tyt-felsefe", "TYT Felsefe", 17],
  ["tyt-din", "TYT Din", 20],
  ["ayt-matematik", "AYT Matematik", 17],
  ["ayt-geometri", "AYT Geometri", 4],
  ["ayt-fizik", "AYT Fizik", 46],
  ["ayt-kimya", "AYT Kimya", 55],
  ["ayt-biyoloji", "AYT Biyoloji", 75],
];
const text = (v: unknown) => (typeof v === "string" ? v : ((v as { tr?: string } | undefined)?.tr ?? ""));
const tr = (n: number) => n.toLocaleString("tr-TR");
const pct = (a: number, b: number) => (b ? "%" + ((100 * a) / b).toFixed(2).replace(".", ",") : "—");
const frac = (a: number, b: number) => `${tr(a)} / ${tr(b)} · ${pct(a, b)}`;

function compute() {
  const ledger = readFileSync("docs/ISLEME_SAYACI.md", "utf8");
  const sheetsDone: Record<string, number> = {};
  for (const m of ledger.matchAll(/^\| \d{3} (TYT|AYT) (\S+(?: Kültürü)?) – [^|]*\(kopya kâğıdı\)/gm)) {
    const key = `${m[1]} ${m[2]}`.replace("Din Kültürü", "Din");
    const id = SUBJECTS.find(([, name]) => name === key)?.[0];
    if (id) sheetsDone[id] = (sheetsDone[id] ?? 0) + 1;
  }
  const pdf = ledger.match(/Okunduğu doğrulanan PDF toplamı[^|]*\|\s*(\d+) \/ ([\d.]+)/);
  const osymDoc = readFileSync("docs/OSYM_SAYACI.md", "utf8");
  const osym = osymDoc.match(/sayac:osym-pdf islenen=(\d+) toplam=(\d+)/)!;
  // Distinct past questions cited as "year exam subject number" in figures and tactics.
  const cite = /(19|20)\d{2} (TYT|AYT|LYS\d?|YGS|ÖSS|ÖYS)( [A-ZÇĞİÖŞÜ][a-zçğıöşü]+){1,2}(-\d)? \d{1,2}\b/g;
  const cited = new Set<string>();
  const figureDir = "src/learning/sectionFigures";
  for (const file of [...readdirSync(figureDir).map((f) => `${figureDir}/${f}`), "src/learning/questionTactics.ts"])
    if (file.endsWith(".ts")) for (const m of readFileSync(file, "utf8").matchAll(cite)) cited.add(m[0]);

  const rows = SUBJECTS.map(([id, name, sheets]) => {
    const ls = lessons.filter((l) => l.subjectId === id);
    const questions = ls.flatMap((l) => l.questions);
    const stepped = questions.filter((raw) => {
      const q = localizedQuestionView(raw) as never as Record<string, unknown> & { options: unknown[] };
      return (
        helpPanels({ ...q, prompt: text(q.prompt), passage: q.passage ? text(q.passage) : undefined, options: q.options.map(text), explanation: text(q.explanation), hint: text(q.hint) || undefined } as never).length >= 3
      );
    }).length;
    const figureLessons = ls.filter((l) => Object.keys(sectionFigures[l.id] ?? {}).length).length;
    const osymMine = osymRows.filter((r) => r.subject === id);
    return {
      id,
      name,
      officialHeadings: (curriculum as { subjectId: string }[]).filter((c) => c.subjectId === id).length,
      lessons: ls.length,
      readyLessons: ls.filter((l) => lessonGuides.has(l.id)).length,
      figureLessons,
      figures: ls.reduce((n, l) => n + Object.keys(sectionFigures[l.id] ?? {}).length, 0),
      questions: questions.length,
      stepped,
      sheetsDone: sheetsDone[id] ?? 0,
      sheets,
      osymQuestions: osymMine.length,
      osymBooklets: new Set(osymMine.map((r) => `${r.y}-${r.e}`)).size,
      open: ls.length - figureLessons,
    };
  });
  const sum = (k: keyof (typeof rows)[number]) => rows.reduce((n, r) => n + (r[k] as number), 0);
  const catalogue = examCatalogue();
  return {
    rows,
    exams: {
      specs: catalogue.length,
      branch: catalogue.filter((e) => e.kind === "branch").length,
      fullLength: catalogue.filter((e) => e.fullLength).length,
      items: catalogue.reduce((n, e) => n + e.items.length, 0),
    },
    foundations: { lessons: foundationLessons.length, figures: foundationLessons.reduce((n, l) => n + (l as { pages?: { figure?: unknown }[] }).pages!.filter((p) => p.figure).length, 0) },
    totals: {
      officialHeadings: sum("officialHeadings"),
      lessons: sum("lessons"),
      readyLessons: sum("readyLessons"),
      figureLessons: sum("figureLessons"),
      figures: sum("figures"),
      questions: sum("questions"),
      stepped: sum("stepped"),
      sheetsDone: sum("sheetsDone"),
      sheets: sum("sheets"),
      open: sum("open"),
      ogmPdfDone: pdf ? Number(pdf[1]) : 0,
      ogmPdfTotal: pdf ? Number(pdf[2].replace(/\./g, "")) : 0,
      osymPdfDone: Number(osym[1]),
      osymPdfTotal: Number(osym[2]),
      osymQuestions: osymRows.length,
      osymCitedQuestions: cited.size,
    },
  };
}

function markdown(data: ReturnType<typeof compute>) {
  const t = data.totals;
  const head = [
    "| Ders | Hazır konu / toplam | Görsel lab (figürlü ders · figür) | Adım adım çözümlü soru | OGM/MEBİ kopya kâğıdı | 99_ÖSYM | Kalan açık (figürsüz ders) |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
    `| Temel İnşa (0. basamak) | ${data.foundations.lessons} ön ders | ${data.foundations.lessons} · ${data.foundations.figures} | ön derslerde çözümlü örnek | — | — | 0 |`,
  ];
  const body = data.rows.map(
    (r) =>
      `| ${r.name} | ${r.readyLessons} / ${r.lessons} | ${r.figureLessons} · ${r.figures} | ${frac(r.stepped, r.questions)} | ${frac(r.sheetsDone, r.sheets)} | ${r.osymQuestions ? `${tr(r.osymQuestions)} soru · ${r.osymBooklets} kitapçık` : "0"} | ${r.open} |`,
  );
  const x = data.exams;
  body.push(
    `| Denemeler | ${x.specs} hazır deneme (${x.specs - x.branch} karma, ${x.branch} ders) | — | ${x.specs} denemede toplam ${tr(x.items)} soru; incelemede aynı çözüm paneli | — | ${t.osymPdfDone} / 18 YKS kitapçığı (2018–2026) | tam resmî dağılımlı deneme: ${x.fullLength} |`,
  );
  const foot = [
    `| **Toplam** | **${t.readyLessons} / ${t.lessons}** | **${t.figureLessons} · ${t.figures}** | **${frac(t.stepped, t.questions)}** | **${frac(t.sheetsDone, t.sheets)}** | **${frac(t.osymPdfDone, t.osymPdfTotal)} PDF · ${tr(t.osymQuestions)} soru** | **${t.open}** |`,
    "",
    "| Genel gösterge | Değer |",
    "| --- | ---: |",
    `| OGM/MEBİ PDF (okunan / envanter) | ${frac(t.ogmPdfDone, t.ogmPdfTotal)} |`,
    `| 99_ÖSYM PDF (işlenen / beyan edilen) | ${frac(t.osymPdfDone, t.osymPdfTotal)} |`,
    `| 99_ÖSYM: soru soru çözümlenen · figür ve taktikte atıf yapılan | ${tr(t.osymQuestions)} · ${t.osymCitedQuestions} |`,
    `| Adım adım çözümlü soru | ${frac(t.stepped, t.questions)} |`,
    `| Kopya kâğıdı (işlenen / toplam) | ${frac(t.sheetsDone, t.sheets)} |`,
    `| Resmî ana başlık · uygulama dersi · hazır anlatım | ${t.officialHeadings} · ${t.lessons} · ${t.readyLessons} |`,
  ];
  return [...head, ...body, ...foot].join("\n") + "\n";
}

describe("ilerleme tablosu", () => {
  it("docs/ILERLEME.json and docs/ILERLEME.md match the code", () => {
    const data = compute();
    const json = JSON.stringify(data, null, 1) + "\n";
    const md = `# İlerleme tablosu\n\nBu dosya \`npm run progress\` ile koddan üretilir; elle düzenlenmez.\n\n${markdown(data)}`;
    if (process.env.UPDATE_PROGRESS) {
      writeFileSync("docs/ILERLEME.json", json);
      writeFileSync("docs/ILERLEME.md", md);
    }
    expect(existsSync("docs/ILERLEME.json"), "npm run progress çalıştır").toBe(true);
    expect(readFileSync("docs/ILERLEME.json", "utf8"), "docs/ILERLEME.json eski: npm run progress çalıştır").toBe(json);
    expect(readFileSync("docs/ILERLEME.md", "utf8")).toBe(md);
  });

  // README.md and FORGE.md carry the same table between two markers, so the
  // round summary can never show numbers the code does not produce.
  it.each(["README.md", "FORGE.md"])("%s embeds the current table", (file) => {
    const START = "<!-- ilerleme:başla -->";
    const END = "<!-- ilerleme:bitir -->";
    const current = readFileSync(file, "utf8");
    const a = current.indexOf(START);
    const b = current.indexOf(END);
    expect(a >= 0 && b > a, `${file}: ilerleme işaretleri eksik`).toBe(true);
    const next = `${current.slice(0, a + START.length)}\n${markdown(compute())}${current.slice(b)}`;
    if (process.env.UPDATE_PROGRESS) writeFileSync(file, next);
    expect(readFileSync(file, "utf8"), `${file} eski: npm run progress çalıştır`).toBe(next);
  });
});
