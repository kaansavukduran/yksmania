import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { theorySupplements } from "../src/learning/theorySupplements";
import {
  bloodExamples215, bloodSupplement215, deviationExamples215, deviationSupplement215, gameteExamples215, gameteSupplement215,
  mendelExamples215, mendelSupplement215, pedigreeExamples215, trioSupplement215, xExamples215, xSupplement215,
} from "../src/learning/depth215";

const added = [
  ["kalitima-giris", gameteSupplement215, gameteExamples215],
  ["mendel-genetigi", mendelSupplement215, mendelExamples215],
  ["mendelden-sapmalar", deviationSupplement215, deviationExamples215],
  ["kan-gruplari", bloodSupplement215, bloodExamples215],
  ["soy-agaclari", trioSupplement215, pedigreeExamples215],
  ["eseyin-belirlenmesi", xSupplement215, xExamples215],
] as const;

/* ---------- Bağımsız kaba kuvvet: gamet ve kutu sayımı ---------- */

type F = [number, number];
const g = (a: number, b: number): number => (b === 0 ? Math.abs(a) : g(b, a % b));
const fr = (n: number, d = 1): F => { const k = g(n, d) || 1; return [n / k, d / k]; };
const ftext = ([n, d]: F) => (d === 1 ? String(n) : `${n}/${d}`);
const ORDER = "AaBbCcDdEeMNORr";
const XORDER = ["Xᴬ", "Xᵃ", "Y"];
const pos = (t: string) => (XORDER.includes(t) ? 100 + XORDER.indexOf(t) : ORDER.indexOf(t));
const tokens = (s: string) => s.match(/Xᴬ|Xᵃ|[A-Za-z]/gu)!;
const loci = (s: string) => { const t = tokens(s); return Array.from({ length: t.length / 2 }, (_, i) => [t[2 * i], t[2 * i + 1]]); };
const norm = (pair: string[]) => [...pair].sort((x, y) => pos(x) - pos(y)).join("");
/** Bütün alel kopyaları ayrı sayılır: n lokuslu ebeveyn 2ⁿ gamet yolu verir (yinelenenler dahil). */
const gameteWays = (s: string): string[][] => loci(s).reduce<string[][]>((acc, pair) => acc.flatMap((x) => pair.map((a) => [...x, a])), [[]]);
/** Bütün eşleşme yolları: genotip yazısı → yol sayısı ve toplam yol. */
const ways = (m: string, f: string) => {
  const out = new Map<string, number>();
  let total = 0;
  for (const a of gameteWays(m)) for (const b of gameteWays(f)) {
    const z = a.map((x, i) => norm([x, b[i]])).join("");
    out.set(z, (out.get(z) ?? 0) + 1);
    total += 1;
  }
  return { out, total };
};
const reduceCounts = (xs: number[]) => { const k = xs.reduce(g, 0); return xs.map((x) => x / k); };
/** Tablo hücresini okur: "3 A_ : 1 aa" veya "hepsi Aa" → [[etiket, sayı]]. */
const readRatio = (cell: string): [string, number][] => (cell.startsWith("hepsi ")
  ? [[cell.slice(6), 1]]
  : cell.split(" : ").map((part) => { const [n, ...rest] = part.split(" "); return [rest.join(" "), Number(n)]; }));
const byPhenotype = (m: string, f: string, phen: (z: string) => string) => {
  const { out, total } = ways(m, f);
  const p = new Map<string, number>();
  for (const [z, n] of out) p.set(phen(z), (p.get(phen(z)) ?? 0) + n);
  return { p, total };
};
const sameRatio = (got: [string, number][], counts: Map<string, number>) => {
  expect(new Set(got.map(([l]) => l))).toEqual(new Set(counts.keys()));
  const want = reduceCounts(got.map(([l]) => counts.get(l)!));
  expect(got.map(([, n]) => n)).toEqual(want);
};
const mendelPhen = (z: string) => loci(z).map(([x, y]) => (x === x.toLowerCase() && y === y.toLowerCase() ? x + y : `${x}_`)).join("");
const pairsOf = (s: string) => loci(s).map((l) => l.join(""));

describe("depth 0.215.0 TYT Biyoloji kalıtım", () => {
  it("appends one table section and two examples without touching the accepted guide", () => {
    for (const [id, supplement, examples] of added) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === supplement.table)).toHaveLength(1);
      const section = shown.sections.at(-1)!;
      expect(section.title).toBe(supplement.title);
      expect(section.figureTitle).toBe(supplement.title);
      expect(section.table?.layout).toBe("table");
      expect(section.table!.rows.length).toBeLessThanOrEqual(8);
      expect(section.table!.headers.length).toBeLessThanOrEqual(5);
      for (const row of section.table!.rows) expect(row).toHaveLength(section.table!.headers.length);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length).toBeGreaterThan(5);
        expect(`${example.title} ${example.prompt}`).not.toMatch(/ÖSYM|resmî|resmi|çıkmış/i);
      }
      expect(theorySupplements[id]).toEqual([supplement]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.find(({ title }) => title === supplement.title)!;
      expect(sheetSection.table).toBe(supplement.table);
      expect(sheetSection.figureTitle).toBe(supplement.figureTitle);
      expect(sheetSection.text).toEqual([supplement.summary]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
    }
  });

  it("registers one drawable figure per new section", () => {
    for (const [id, supplement] of added) {
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const def = sectionFigures[id][supplement.figureTitle];
      expect(def, id).toBeDefined();
      for (const step of (def.steps ?? [""]).map((_, i) => i)) {
        const frame = def.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout?.length).toBeGreaterThan(0);
      }
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: supplement.figureTitle }));
      expect(html).toContain('role="img"');
    }
  });

  it("counts gamete kinds by listing every gamete", () => {
    const specs = [["AA"], ["Aa"], ["AaBB"], ["AaBb"], ["AaBb", "AB", "ab"], ["AaBbCC"], ["AaBbCc"], ["AaBbCcDd"]];
    gameteSupplement215.table.rows.forEach((row, i) => {
      const [genotype, h1, h2] = specs[i];
      const kinds = h1 ? [h1, h2] : [...new Set(gameteWays(genotype).map((x) => x.join("")))];
      const h = loci(genotype).filter(([x, y]) => x !== y).length;
      expect(row[0].startsWith(genotype)).toBe(true);
      expect(row[1]).toBe(String(h));
      expect(row[2].startsWith(h1 ? "2 " : `2${"⁰¹²³⁴"[h]} = ${kinds.length}`)).toBe(true);
      if (kinds.length <= 4) expect(row[3]).toBe(kinds.join(", "));
      else expect(row[3]).toBe(`${kinds[0]}, ${kinds[1]}, …, ${kinds.at(-1)}`);
      // Her gamet yolu eş olasılıklıdır; bir türün payı yol sayısı / toplam yol.
      const all = gameteWays(genotype).map((x) => x.join(""));
      expect(row[4]).toBe(h1 ? "1/2" : ftext(fr(all.filter((x) => x === kinds[0]).length, all.length)));
      if (!h1) expect(kinds.length).toBe(2 ** h);
    });
    expect(gameteSupplement215.table.rows.map((r) => r[2])).toEqual(["2⁰ = 1", "2¹ = 2", "2¹ = 2", "2² = 4", "2 (2ʰ = 4 değil)", "2² = 4", "2³ = 8", "2⁴ = 16"]);
  });

  it("recomputes every Mendel cross by counting boxes", () => {
    const crosses = [["AA", "aa"], ["Aa", "Aa"], ["Aa", "aa"], ["AA", "Aa"], ["AaBb", "AaBb"], ["AaBb", "aabb"], ["AaBb", "Aabb"]];
    mendelSupplement215.table.rows.forEach((row, i) => {
      const [m, f] = crosses[i];
      expect(row[0]).toBe(`${m} × ${f}`);
      const { out, total } = ways(m, f);
      expect(row[1]).toBe(String(out.size));
      if (out.size <= 4) sameRatio(readRatio(row[2]), out);
      else {
        const sorted = [...out.entries()].sort(([a], [b]) => [...a].map(pos).join(",").localeCompare([...b].map(pos).join(","), "en", { numeric: true }));
        expect(row[2]).toBe(reduceCounts(sorted.map(([, n]) => n)).join(":"));
      }
      const { p } = byPhenotype(m, f, mendelPhen);
      sameRatio(readRatio(row[3]), p);
      const rec = loci(m).map(([x]) => x.toLowerCase().repeat(2)).join("");
      expect(row[4]).toBe(`${rec}: ${ftext(fr(p.get(rec) ?? 0, total))}`);
    });
    expect(mendelSupplement215.table.rows.map((r) => r[3])).toEqual([
      "hepsi A_", "3 A_ : 1 aa", "1 A_ : 1 aa", "hepsi A_", "9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb", "1 A_B_ : 1 A_bb : 1 aaB_ : 1 aabb", "3 A_B_ : 3 A_bb : 1 aaB_ : 1 aabb",
    ]);
  });

  it("recomputes incomplete and codominance rows", () => {
    const colour: Record<string, string> = { RR: "kırmızı", Rr: "pembe", rr: "beyaz", MM: "M", MN: "MN", NN: "N" };
    const phen = (z: string) => pairsOf(z).map((l) => colour[l] ?? (l[0] === "B" ? "uzun" : l === "bb" ? "kısa" : l === "aa" ? "aa" : "A_")).join(" ");
    const crosses = [["Aa", "Aa"], ["Rr", "Rr"], ["Rr", "RR"], ["RR", "rr"], ["MN", "MN"], ["MN", "MM"], ["RrBb", "RrBb"]];
    deviationSupplement215.table.rows.forEach((row, i) => {
      const [m, f] = crosses[i];
      expect(row[1]).toBe(`${m} × ${f}`);
      const { out } = ways(m, f);
      if (out.size <= 4) sameRatio(readRatio(row[2]), out);
      else expect(row[2]).toBe("1:2:1:2:4:2:1:2:1");
      const { p } = byPhenotype(m, f, phen);
      sameRatio(readRatio(row[3]), p);
      expect(row[4]).toBe(String(p.size));
    });
    expect(deviationSupplement215.table.rows.map((r) => r[3])).toEqual([
      "3 A_ : 1 aa", "1 kırmızı : 2 pembe : 1 beyaz", "1 kırmızı : 1 pembe", "hepsi pembe", "1 M : 2 MN : 1 N", "1 M : 1 MN",
      "3 kırmızı uzun : 1 kırmızı kısa : 6 pembe uzun : 2 pembe kısa : 3 beyaz uzun : 1 beyaz kısa",
    ]);
  });

  it("recomputes possible and impossible blood groups from every genotype pair", () => {
    const abo: Record<string, string[]> = { A: ["AA", "AO"], B: ["BB", "BO"], AB: ["AB"], O: ["OO"] };
    const rh: Record<string, string[]> = { "Rh+": ["DD", "Dd"], "Rh−": ["dd"] };
    const aboPhen = (z: string) => (z.includes("A") && z.includes("B") ? "AB" : z.includes("A") ? "A" : z.includes("B") ? "B" : "O");
    const rhPhen = (z: string) => (z.includes("D") ? "Rh+" : "Rh−");
    for (const row of bloodSupplement215.table.rows) {
      const [x, y] = row[0].split(" × ");
      const isRh = x in rh;
      const table = isRh ? rh : abo;
      const phen = isRh ? rhPhen : aboPhen;
      const seen = new Set<string>();
      for (const a of table[x]) for (const b of table[y]) for (const z of ways(a, b).out.keys()) seen.add(phen(z));
      expect(new Set(row[2].split(", "))).toEqual(seen);
      const missing = Object.keys(table).filter((k) => !seen.has(k));
      expect(row[3]).toBe(missing.length ? missing.join(", ") : "yok");
      expect(row[1].replace(/[()]/g, "")).toBe(`${table[x].join(" veya ")} × ${table[y].join(" veya ")}`);
    }
    // AB ebeveynin O çocuğu hiçbir eşle oluşmaz.
    for (const partner of Object.values(abo).flat()) expect([...ways("AB", partner).out.keys()].map(aboPhen)).not.toContain("O");
    expect(bloodSupplement215.table.rows.map((r) => r[3])).toEqual(["A, B, AB", "B, AB", "yok", "AB, O", "O", "O", "Rh+", "yok"]);
  });

  it("re-derives every pedigree verdict by trying all genotype assignments", () => {
    type M = "OR" | "OB" | "XR" | "XB";
    const genos = (m: M, male: boolean) => (m[0] === "O" ? ["AA", "Aa", "aa"] : male ? ["XᴬY", "XᵃY"] : ["XᴬXᴬ", "XᴬXᵃ", "XᵃXᵃ"]);
    const aff = (m: M, z: string) => (m === "OR" ? z === "aa" : m === "OB" ? z.includes("A") : m === "XR" ? !z.includes("Xᴬ") : z.includes("Xᴬ"));
    const canChild = (mother: string, father: string, child: string) => ways(mother, father).out.has(child);
    const names: [M, string][] = [["OR", "Otozomal çekinik"], ["OB", "Otozomal baskın"], ["XR", "X’e bağlı çekinik"], ["XB", "X’e bağlı baskın"]];
    expect(trioSupplement215.table.headers.slice(1)).toEqual(names.map(([, n]) => n));
    for (const row of trioSupplement215.table.rows) {
      const m = row[0].match(/^Baba (etkilenen|etkilenmemiş), anne (etkilenen|etkilenmemiş), (kız|oğul) (etkilenen|etkilenmemiş)$/)!;
      const [fa, mo, son, ch] = [m[1] === "etkilenen", m[2] === "etkilenen", m[3] === "oğul", m[4] === "etkilenen"];
      names.forEach(([model], j) => {
        let ok = false;
        for (const f of genos(model, true)) for (const mm of genos(model, false)) for (const c of genos(model, son))
          if (aff(model, f) === fa && aff(model, mm) === mo && aff(model, c) === ch && canChild(mm, f, c)) ok = true;
        expect(row[j + 1]).toBe(ok ? "uyumlu" : "elenir");
      });
    }
  });

  it("recomputes the six X-linked matings", () => {
    const dist = (out: Map<string, number>, keep: (z: string) => boolean) => {
      const items = [...out.entries()].filter(([z]) => keep(z)).sort(([a], [b]) => a.localeCompare(b));
      const t = items.reduce((s, [, n]) => s + n, 0);
      return items.length === 1 ? `hepsi ${items[0][0]}` : items.map(([z, n]) => `${ftext(fr(n, t))} ${z}`).join(", ");
    };
    const sortX = (s: string) => s.split(", ").sort().join(", ");
    for (const row of xSupplement215.table.rows) {
      const [mother, father] = row[0].split(" × ");
      const { out, total } = ways(mother, father);
      expect(sortX(row[1])).toBe(sortX(dist(out, (z) => !z.includes("Y"))));
      expect(sortX(row[2])).toBe(sortX(dist(out, (z) => z.includes("Y"))));
      const affected = [...out.entries()].filter(([z]) => !z.includes("Xᴬ")).reduce((s, [, n]) => s + n, 0);
      expect(row[3]).toBe(ftext(fr(affected, total)));
      expect(row[4]).toBe(ftext(fr(out.get("XᴬXᵃ") ?? 0, total)));
    }
    expect(xSupplement215.table.rows.map((r) => r[3])).toEqual(["0", "0", "1/4", "1/2", "1/2", "1"]);
  });

  it("checks every new example answer by enumeration", () => {
    // Kalıtıma giriş.
    const kinds = [...new Set(gameteWays("AaBbccDd").map((x) => x.join("")))];
    const all = gameteWays("AaBbccDd").map((x) => x.join(""));
    expect([kinds.length, ftext(fr(all.filter((x) => x === "aBcD").length, all.length))]).toEqual([8, "1/8"]);
    const choices = ["AA", "Aa", "aa"];
    const homozygous = new Set<number>();
    const build = (k: number, acc: string[]): void => {
      if (k === 5) {
        const s = acc.map((p, i) => p.replace(/A/g, "ABCDE"[i]).replace(/a/g, "abcde"[i])).join("");
        if (new Set(gameteWays(s).map((x) => x.join(""))).size === 16) homozygous.add(acc.filter((p) => p !== "Aa").length);
        return;
      }
      for (const c of choices) build(k + 1, [...acc, c]);
    };
    build(0, []);
    expect([...homozygous]).toEqual([1]);
    expect(gameteExamples215[0].answer).toContain("8 çeşit");
    expect(gameteExamples215[0].answer).toContain("1/8");
    expect(gameteExamples215[1].answer).toContain("Bir lokus");
    // Mendel.
    const m1 = ways("AaBb", "Aabb");
    const abb = [...m1.out.entries()].filter(([z]) => mendelPhen(z) === "A_bb");
    const abbTotal = abb.reduce((s, [, n]) => s + n, 0);
    expect(ftext(fr(m1.out.get("AAbb")!, abbTotal))).toBe("1/3");
    expect(mendelExamples215[0].answer).toContain("1/3");
    const fits = ["AABB", "AABb", "AaBB", "AaBb"].filter((c) => {
      const { p, total } = byPhenotype(c, "aabb", mendelPhen);
      return p.size === 2 && p.get("A_B_")! * 2 === total && p.get("A_bb")! * 2 === total;
    });
    expect(fits).toEqual(["AABb"]);
    const self = byPhenotype("AABb", "AABb", mendelPhen);
    expect(ftext(fr(self.p.get("A_bb")!, self.total))).toBe("1/4");
    expect(mendelExamples215[1].answer).toContain("AABb");
    // Mendel’den sapmalar.
    const colour: Record<string, string> = { RR: "kırmızı", Rr: "pembe", rr: "beyaz" };
    const flower = (z: string) => pairsOf(z).map((l) => colour[l] ?? (l[0] === "B" ? "uzun" : "kısa")).join(" ");
    const parents: string[] = [];
    const opts = ["RR", "Rr", "rr"];
    opts.forEach((x, i) => opts.slice(i).forEach((y) => {
      const { p, total } = byPhenotype(x, y, flower);
      if (p.size === 2 && p.get("pembe")! * 2 === total && p.get("beyaz")! * 2 === total) parents.push(`${x} × ${y}`);
    }));
    expect(parents).toEqual(["Rr × rr"]);
    const pp = byPhenotype("Rr", "Rr", flower);
    expect(ftext(fr(pp.p.get("kırmızı")!, pp.total))).toBe("1/4");
    expect(deviationExamples215[0].answer).toContain("Rr × rr");
    const two = byPhenotype("RrBb", "Rrbb", flower);
    expect([two.p.size, ftext(fr(two.p.get("pembe kısa")!, two.total))]).toEqual([6, "1/4"]);
    // Kan grupları.
    const aboP = (l: string) => (l.includes("A") && l.includes("B") ? "AB" : l.includes("A") ? "A" : l.includes("B") ? "B" : "O");
    const both = (z: string) => { const [a, d] = pairsOf(z); return `${aboP(a)} ${d.includes("D") ? "Rh+" : "Rh−"}`; };
    const couples: string[] = [];
    for (const mo of ["AADD", "AADd", "AODD", "AODd"]) for (const fa of ["BBDD", "BBDd", "BODD", "BODd"])
      if ([...ways(mo, fa).out.keys()].some((z) => both(z) === "O Rh−")) couples.push(`${mo} × ${fa}`);
    expect(couples).toEqual(["AODd × BODd"]);
    const kid = byPhenotype("AODd", "BODd", both);
    expect(ftext(fr(kid.p.get("AB Rh+")!, kid.total))).toBe("3/16");
    expect(bloodExamples215[0].answer).toContain("3/16");
    const can = (x: string[], y: string[], child: string) => x.some((a) => y.some((b) => [...ways(a, b).out.keys()].some((z) => aboP(z) === child)));
    expect([can(["AB"], ["OO"], "O"), can(["AA", "AO"], ["BB", "BO"], "O"), can(["AB"], ["OO"], "A")]).toEqual([false, true, true]);
    // Soy ağaçları: altı kişiyi bütün atamalarla dene.
    type M = "OR" | "OB" | "XR" | "XB";
    const genos = (m: M, male: boolean) => (m[0] === "O" ? ["AA", "Aa", "aa"] : male ? ["XᴬY", "XᵃY"] : ["XᴬXᴬ", "XᴬXᵃ", "XᵃXᵃ"]);
    const aff = (m: M, z: string) => (m === "OR" ? z === "aa" : m === "OB" ? z.includes("A") : m === "XR" ? !z.includes("Xᴬ") : z.includes("Xᴬ"));
    const people = [
      { id: "I-1", male: true, a: false }, { id: "I-2", male: false, a: false }, { id: "II-1", male: true, a: true, mo: "I-2", fa: "I-1" },
      { id: "II-2", male: false, a: false, mo: "I-2", fa: "I-1" }, { id: "II-3", male: true, a: false }, { id: "III-1", male: false, a: true, mo: "II-2", fa: "II-3" },
    ];
    const results: Record<string, Set<string>[]> = {};
    for (const model of ["OR", "OB", "XR", "XB"] as M[]) {
      const sets = people.map(() => new Set<string>());
      const walk = (i: number, acc: string[]): void => {
        if (i === people.length) {
          if (people.every((p, j) => !p.mo || ways(acc[people.findIndex((q) => q.id === p.mo)], acc[people.findIndex((q) => q.id === p.fa)]).out.has(acc[j]))) acc.forEach((z, j) => sets[j].add(z));
          return;
        }
        for (const z of genos(model, people[i].male)) if (aff(model, z) === people[i].a) walk(i + 1, [...acc, z]);
      };
      walk(0, []);
      if (sets.every((s) => s.size > 0)) results[model] = sets;
    }
    expect(Object.keys(results)).toEqual(["OR"]);
    expect(results.OR.map((s) => [...s].join())).toEqual(["Aa", "Aa", "aa", "Aa", "Aa", "aa"]);
    expect(pedigreeExamples215[0].answer).toContain("otozomal çekinik");
    // Etkilenmemiş kardeş × aa: altı eş yol.
    const sib = ways("Aa", "Aa").out;
    let hit = 0;
    let base = 0;
    for (const [z, n] of sib) if (z !== "aa") { const c = ways(z, "aa"); base += n * c.total; hit += n * (c.out.get("aa") ?? 0); }
    expect(ftext(fr(hit, base))).toBe("1/3");
    expect(pedigreeExamples215[1].answer).toContain("1/3");
    // Eşeyin belirlenmesi.
    const woman = ["XᴬXᴬ", "XᴬXᵃ", "XᵃXᵃ"].filter((z) => z.includes("Xᴬ") && z.includes("Xᵃ"));
    expect(woman).toEqual(["XᴬXᵃ"]);
    const cb = ways("XᴬXᵃ", "XᵃY");
    const girls = [...cb.out.entries()].filter(([z]) => !z.includes("Y"));
    const girlTotal = girls.reduce((s, [, n]) => s + n, 0);
    expect(ftext(fr(cb.out.get("XᵃXᵃ")!, girlTotal))).toBe("1/2");
    expect(ftext(fr(cb.out.get("XᵃXᵃ")!, cb.total))).toBe("1/4");
    const hx = ways("BbXᴬXᵃ", "bbXᴬY");
    const target = [...hx.out.entries()].filter(([z]) => z.startsWith("bb") && z.endsWith("XᵃY")).reduce((s, [, n]) => s + n, 0);
    const sons = [...hx.out.entries()].filter(([z]) => z.endsWith("Y")).reduce((s, [, n]) => s + n, 0);
    expect([ftext(fr(target, hx.total)), ftext(fr(target, sons))]).toEqual(["1/8", "1/4"]);
    expect(xExamples215[1].answer).toContain("1/8");
  });
});
