import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  fungusExamples211, fungusRows211, fungusStatements211, fungusSupplement211,
  kingdomExamples211, kingdomRows211, kingdomSupplement211, matchKingdoms211, unknownKingdom211,
  plantExamples211, plantKeySteps211, plantKeys211, plantRows211, plantStatements211, plantSupplement211,
  prokaryoteExamples211, prokaryoteRows211, prokaryoteSupplement211, unknownProkaryote211, classifyProkaryote211,
  protistExamples211, protistFilters211, protistRows211, protistStatements211, protistSupplement211,
  ranks211, rankStatements211, sharedDepth211, taxa211,
} from "../src/learning/depth211";

const lessons211 = {
  "canlilarin-siniflandirilmasi": [kingdomSupplement211, kingdomExamples211],
  "bakteri-ve-arke": [prokaryoteSupplement211, prokaryoteExamples211],
  protista: [protistSupplement211, protistExamples211],
  mantarlar: [fungusSupplement211, fungusExamples211],
  bitkiler: [plantSupplement211, plantExamples211],
} as const;

const romanOf = (holds: boolean[]) => holds.flatMap((h, i) => (h ? [["I", "II", "III"][i]] : []));

describe("TYT biology depth 0.211.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons211)) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.sections.some(({ table }) => table === added.table), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections).toHaveLength(raw.sections.length + 1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table?.layout).toBe("table");
      // Telefon için kompakt tablo.
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      // Önceki örnekler sunum katmanındaki hâlleriyle yerinde kalır.
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(studyGuideWithSourceRevisions(id)!.examples);
      expect(shown.sections.slice(0, raw.sections.length)).toEqual(studyGuideWithSourceRevisions(id)!.sections);
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      // Kopya Kâğıdı: aynı tablo, kısa özet, figür başlığı, iki örnek ve iki uyarı.
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(added.summary.length).toBeLessThan(360);
      expect(sheetSection.figureTitle).toBe(added.title);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(5);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b/);
      }
      expect(JSON.stringify([added.paragraphs, added.summary, added.table])).not.toMatch(/undefined|NaN|\[object/);
      // Figür yeni bölüm başlığıyla kayıtlı ve her adımda çizilebilir.
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      for (let step = 0; step < (figure!.steps?.length ?? 1); step++) {
        const frame = figure!.draw(0, step);
        expect(frame.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
      }
    }
  });

  it("classifies the unknown eukaryote and the closest relative from the data", () => {
    // Bağımsız süzgeç: satırların hücre ve duvar alanları.
    const euk = kingdomRows211.filter((row) => row.cell === "ökaryot");
    const chitin = euk.filter((row) => row.wallKey === "kitin");
    expect(euk.map(({ group }) => group)).toEqual(["Protista", "Mantarlar", "Bitkiler", "Hayvanlar"]);
    expect(chitin.map(({ group }) => group)).toEqual(["Mantarlar"]);
    expect(matchKingdoms211(unknownKingdom211)).toEqual(chitin);
    expect(chitin[0].autotrophs).toBe(false);
    expect(kingdomExamples211[0].answer).toBe(`${chitin[0].group} âlemi.`);
    // Prokaryot iki grup ayrı üst âlemlerde, duvar sütununda farklı.
    const prok = kingdomRows211.filter((row) => row.cell === "prokaryot");
    expect(prok.map(({ domain }) => domain)).toEqual(["Bacteria", "Archaea"]);
    expect(prok[0].wall).not.toBe(prok[1].wall);
    expect(kingdomSupplement211.table.rows.map(([group]) => group)).toEqual([
      "Bakteriler (Bacteria)", "Arkeler (Archaea)", "Protista (Eukarya)", "Mantarlar (Eukarya)", "Bitkiler (Eukarya)", "Hayvanlar (Eukarya)",
    ]);
    // Ortak basamak: türden yukarı çıkarak say.
    expect(ranks211).toEqual(["Âlem", "Şube", "Sınıf", "Takım", "Familya", "Cins", "Tür"]);
    const by = Object.fromEntries(taxa211.map((t) => [t.name, t]));
    const lastShared = (a: string, b: string) => {
      const x = by[a].taxa;
      const y = by[b].taxa;
      let k = -1;
      while (k + 1 < x.length && x[k + 1] === y[k + 1]) k++;
      return k;
    };
    expect(["kaplan", "ev kedisi", "kurt"].map((n) => ranks211[lastShared("aslan", n)])).toEqual(["Cins", "Familya", "Takım"]);
    for (const a of taxa211) for (const b of taxa211) expect(sharedDepth211(a, b)).toBe(lastShared(a.name, b.name));
    expect(rankStatements211.map(({ holds }) => holds)).toEqual([false, true, false]);
    expect(kingdomExamples211[1].answer).toBe("En yakın: kaplan. Kesin doğru: yalnız II.");
    // İkili ad: ilk sözcük cins.
    for (const t of taxa211) expect(t.taxa[6].split(" ")[0]).toBe(t.taxa[5]);
  });

  it("places the unknown prokaryote only by the distinguishing rows", () => {
    for (const row of prokaryoteRows211) {
      if (row.verdict === "Ortak" || row.verdict === "Ayırmaz") expect(row.bacteria, row.feature).toBe(row.archaea);
      else expect(row.bacteria, row.feature).not.toBe(row.archaea);
    }
    const decisive = prokaryoteRows211.filter(({ verdict }) => verdict === "Ayırır");
    expect(decisive.map(({ feature }) => feature)).toEqual(["Zar lipidi", "Ribozomal RNA"]);
    const observed = unknownProkaryote211 as Record<string, string>;
    const votes = decisive.filter(({ feature }) => feature in observed).map((row) => (observed[row.feature] === row.archaea ? "arke" : observed[row.feature] === row.bacteria ? "bakteri" : "?"));
    expect(votes).toEqual(["arke"]);
    expect(classifyProkaryote211(unknownProkaryote211)).toEqual(["archaea"]);
    expect(classifyProkaryote211({ "Duvarda peptidoglikan": "yok", "Yaşam ortamı": "ılımlı ve aşırı ortamlar" })).toEqual(["bacteria", "archaea"]);
    expect(prokaryoteExamples211[0].answer).toContain("arke");
    // Örnek 2: bakteri sütunu.
    const col = Object.fromEntries(prokaryoteRows211.map((row) => [row.feature, row]));
    const holds = [col["Hücre tipi"].bacteria === "prokaryot", col["Zar lipidi"].bacteria === col["Zar lipidi"].archaea, col["Duvarda peptidoglikan"].verdict === "Ayırır"];
    expect(romanOf(holds)).toEqual(["I"]);
    expect(prokaryoteExamples211[1].answer).toBe("Yalnız I.");
  });

  it("filters the protist rows and checks the universal statements", () => {
    const names = (f: (r: (typeof protistRows211)[number]) => boolean) => protistRows211.filter(f).map(({ name }) => name);
    expect(protistFilters211.map(({ test }) => names(test))).toEqual([
      ["Amip", "Cıvık mantar"], ["Öglena"], ["Plasmodium"], protistRows211.map(({ name }) => name),
    ]);
    expect(protistExamples211[0].answer.startsWith("Amip ve Cıvık mantar.")).toBe(true);
    const truth = [
      protistRows211.every(({ cell }) => cell === "ökaryot"),
      protistRows211.every(({ movementKind }) => movementKind !== "yok"),
      !protistRows211.some(({ photosynthesis }) => photosynthesis),
    ];
    expect(protistStatements211.map(({ holds }) => holds)).toEqual(truth);
    expect(protistExamples211[1].answer).toBe(`Yalnız ${romanOf(truth).join("")}.`);
    expect(romanOf(truth)).toEqual(["I"]);
  });

  it("matches the yeast observation and the fungus statements", () => {
    const candidates = fungusRows211.filter((row) => row.body === "tek hücreli" && !row.mycelium && row.reproduction === "tomurcuklanma");
    expect(candidates.map(({ name }) => name)).toEqual(["Maya"]);
    expect(fungusExamples211[0].answer.startsWith("Maya.")).toBe(true);
    expect(new Set(fungusRows211.map(({ wall }) => wall))).toEqual(new Set(["kitin"]));
    const truth = [
      fungusRows211.every(({ wall }) => wall === "kitin"),
      fungusRows211.every(({ mycelium }) => mycelium),
      fungusRows211.every(({ nutrition }) => nutrition === "emilimle heterotrof"),
    ];
    expect(fungusStatements211.map(({ holds }) => holds)).toEqual(truth);
    expect(fungusExamples211[1].answer).toBe(`${romanOf(truth).join(" ve ")}.`);
    expect(romanOf(truth)).toEqual(["I", "III"]);
  });

  it("brute-forces the smallest plant key and the seed statements", () => {
    const keys = plantKeys211.map(({ key }) => key);
    const solves = (set: string[]) => new Set(plantRows211.map((row) => set.map((k) => row[k as keyof typeof row]).join())).size === plantRows211.length;
    const sizes: number[] = [];
    for (let mask = 1; mask < 16; mask++) {
      const set = keys.filter((_, i) => mask & (1 << i));
      if (solves(set)) sizes.push(set.length);
    }
    expect(Math.min(...sizes)).toBe(3);
    for (const a of keys) for (const b of keys) if (a !== b) expect(solves([a, b]), `${a}+${b}`).toBe(false);
    expect(plantExamples211[0].answer.startsWith("En az 3 sütun")).toBe(true);
    // Anahtar: her “hayır” tek grubu ayırır, bütün yollar farklı gruba gider.
    expect(plantKeySteps211.map(({ key }) => key)).toEqual(["vascular", "seed", "fruit"]);
    expect(plantKeySteps211.map(({ no }) => no.map(({ example }) => example))).toEqual([["Kara yosunu"], ["Eğrelti"], ["Çam"]]);
    expect(plantKeySteps211.at(-1)!.yes.map(({ example }) => example)).toEqual(["Elma"]);
    const seeded = plantRows211.filter(({ seed }) => seed);
    const truth = [seeded.every(({ vascular }) => vascular), seeded.every(({ fruit }) => fruit), seeded.every(({ organs }) => organs)];
    expect(plantStatements211.map(({ holds }) => holds)).toEqual(truth);
    expect(plantExamples211[1].answer).toBe(`${romanOf(truth).join(" ve ")}.`);
    // Ders: damar varsa tohum vardır kısa yolu geçersiz; tohumlu demek meyveli demek değil.
    expect(plantRows211.some((row) => row.vascular && !row.seed)).toBe(true);
    expect(plantRows211.some((row) => row.seed && !row.fruit)).toBe(true);
  });

  it("builds figure readouts from the same rows as the tables", () => {
    const read = (id: string, title: string, step: number) => sectionFigures[id][title].draw(0, step).readout!.join(" ");
    expect(read("canlilarin-siniflandirilmasi", kingdomSupplement211.title, 3)).toContain("→ Mantarlar");
    for (const row of kingdomRows211) expect(read("canlilarin-siniflandirilmasi", kingdomSupplement211.title, 1)).toContain(row.wall);
    prokaryoteRows211.forEach((row, step) => {
      const text = read("bakteri-ve-arke", prokaryoteSupplement211.title, step);
      expect(text).toContain(row.bacteria);
      expect(text).toContain(row.archaea);
      expect(text).toContain(row.verdict);
    });
    protistFilters211.forEach(({ label, test }, step) =>
      expect(read("protista", protistSupplement211.title, step)).toContain(`${label}: ${protistRows211.filter(test).map(({ name }) => name).join(", ")} (${protistRows211.filter(test).length}/${protistRows211.length})`));
    fungusRows211.forEach((row, step) => expect(read("mantarlar", fungusSupplement211.title, step)).toContain(row.role));
    plantKeySteps211.forEach(({ question, no }, step) => {
      const text = read("bitkiler", plantSupplement211.title, step);
      expect(text).toContain(question);
      expect(text).toContain(`Hayır: ${no[0].example}`);
    });
    // Çizim etiketleri tablodaki adları kullanır.
    const labels = (id: string, title: string, step: number) => sectionFigures[id][title].draw(0, step).els.flatMap((e) => (e.k === "text" ? [e.s] : []));
    expect(labels("protista", protistSupplement211.title, 0)).toEqual(expect.arrayContaining(protistRows211.map(({ name }) => name)));
    expect(labels("bitkiler", plantSupplement211.title, 2)).toEqual(expect.arrayContaining(plantRows211.map(({ example }) => example)));
    expect(labels("mantarlar", fungusSupplement211.title, 0)).toEqual(expect.arrayContaining(fungusRows211.map(({ name }) => name)));
  });
});
