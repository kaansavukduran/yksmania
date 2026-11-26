import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  asexual212, asexualExamples212, asexualSupplement212, matchOrganelles212, meiosisExamples212, meiosisRows212,
  meiosisSupplement212, mitosisExamples212, mitosisRows212, mitosisSupplement212, offspring212, organelleExamples212,
  organelleSupplement212, organelles212, population212, products212, transportExamples212, transportSupplement212,
  transports212, waterDrive212,
} from "../src/learning/depth212";

const lessons212 = {
  "hucre-organelleri": [organelleSupplement212, organelleExamples212],
  "hucre-zarinda-madde-alisverisleri": [transportSupplement212, transportExamples212],
  mitoz: [mitosisSupplement212, mitosisExamples212],
  mayoz: [meiosisSupplement212, meiosisExamples212],
  "eseysiz-ureme": [asexualSupplement212, asexualExamples212],
} as const;

/*
 * Bağımsız sayım: her DNA molekülü ayrı bir nesnedir. Kromozom, bir arada
 * tutulan molekül listesidir (1 ya da 2 kardeş). Tablo bu sayımla aynı
 * çıkmalıdır.
 */
type Mol = { pair: number; origin: number };
type Chrom = Mol[];
const g1 = (n: number): Chrom[] => Array.from({ length: n }, (_, pair) => [[{ pair, origin: 0 }], [{ pair, origin: 1 }]]).flat();
const sPhase = (cs: Chrom[]) => cs.map((c) => [c[0], { ...c[0] }]);
const separateSisters = (cs: Chrom[]) => cs.flatMap((c) => c.map((m) => [m]));
const count = (cells: Chrom[][], n: number) => {
  const all = cells.flat();
  const molecules = all.reduce((s, c) => s + c.length, 0);
  return {
    chromosomes: all.length,
    chromatids: all.every((c) => c.length === 2) ? molecules : null,
    dnaMolecules: molecules,
    dnaC: molecules / n,
  };
};
const strip = ({ chromosomes, chromatids, dnaMolecules, dnaC }: ReturnType<typeof count>) => ({ chromosomes, chromatids, dnaMolecules, dnaC });

describe("TYT Biyoloji derinleştirmesi 0.212", () => {
  it("appends a table section, a figure and two examples without touching the accepted guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons212)) {
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      // Published revisions stay as they were; the supplement only appends.
      const revised = studyGuideWithSourceRevisions(id)!;
      expect(shown.sections.slice(0, -1)).toEqual(revised.sections);
      expect(revised.sections.map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, -2)).toEqual(revised.examples);
      expect(revised.examples.map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(theorySupplements[id]).toEqual([added]);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length, key).toBeGreaterThan(5);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav|undefined|\bNaN\b/);
      }
      expect(JSON.stringify([added.paragraphs, added.summary, added.table])).not.toMatch(/undefined|\bNaN\b|null/);
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps).toHaveLength(added.table.rows.length);
      for (let step = 0; step < figure!.steps!.length; step++) {
        const frame = figure!.draw(0, step);
        expect(frame.els.length).toBeGreaterThan(0);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        // Each step is the table row with the same name.
        expect(frame.readout!.join(" ")).toContain(added.table.rows[step][0]);
      }
    }
  });

  it("organelle table follows the lesson classification and the examples follow the filters", () => {
    const byName = Object.fromEntries(organelles212.map((o) => [o.name, o]));
    // Rehberin sınıflaması: ribozom ve sentrozom zarsız; ER, Golgi, lizozom tek zarlı; çekirdek, mitokondri, plastit çift zarlı.
    expect(organelles212.map(({ name, membranes }) => [name, membranes])).toEqual([
      ["Ribozom", 0], ["Sentrozom", 0], ["ER", 1], ["Golgi", 1], ["Lizozom", 1], ["Çekirdek", 2], ["Mitokondri", 2], ["Kloroplast", 2],
    ]);
    expect(organelles212.filter(({ cells }) => cells.bakteri).map(({ name }) => name)).toEqual(["Ribozom"]);
    expect(organelles212.filter(({ ownRibosomes }) => ownRibosomes).map(({ name }) => name)).toEqual(["Mitokondri", "Kloroplast"]);
    expect(byName.Kloroplast.cells).toEqual({ bitki: true, hayvan: false, bakteri: false });
    expect(byName.Sentrozom.cells.bitki).toBe(false);
    expect(organelleSupplement212.table.rows[6]).toEqual(["Mitokondri", "Çift zarlı", "Var; kendi ribozomu da var", "Bitki, hayvan", "Oksijenli solunum, ATP"]);
    const [find, compare] = organelleExamples212;
    expect(matchOrganelles212({ membranes: 2, dna: true, ownRibosomes: true, cells: ["bitki", "hayvan"] }).map(({ name }) => name)).toEqual(["Mitokondri"]);
    expect(find.answer).toBe("Mitokondri.");
    const animalNotBacteria = organelles212.filter(({ cells }) => cells.hayvan && !cells.bakteri);
    expect(animalNotBacteria).toHaveLength(6);
    expect(compare.answer.startsWith(`${animalNotBacteria.length} yapı.`)).toBe(true);
  });

  it("transport table: passive rows need no ATP and run down the gradient; examples follow the model", () => {
    for (const t of transports212) {
      const { outside, inside, to } = t.demo;
      const [from, target] = to === "içeri" ? [outside, inside] : [inside, outside];
      if (!t.atp && t.direction === "çoktan-aza") expect(from, t.name).toBeGreaterThan(target);
      if (t.direction === "su") expect(waterDrive212(inside, outside), t.name).toBeGreaterThan(0);
      if (t.direction === "farka-karşı") expect(from).toBeLessThan(target);
    }
    expect(transportSupplement212.table.rows.map((row) => row.slice(0, 2))).toEqual([
      ["Basit difüzyon", "Gerekmez"], ["Kolaylaştırılmış difüzyon", "Gerekmez"], ["Ozmoz", "Gerekmez"],
      ["Aktif taşıma", "Gerekir"], ["Endositoz", "Gerekir"], ["Ekzositoz", "Gerekir"],
    ]);
    // Rehberin modeli: iç 3, dış 1, basınç 0 → içe eğilim; basınç 2 dengeler.
    expect([waterDrive212(3, 1, 0), waterDrive212(3, 1, 2)]).toEqual([2, 0]);
    expect(waterDrive212(2, 5)).toBe(-3);
    expect(transportExamples212[0].answer).toContain("dışarı");
    const picked = transports212.filter((t) => !t.atp && t.direction !== "su" && t.helper === "taşıyıcı");
    expect(picked.map(({ name }) => name)).toEqual(["Kolaylaştırılmış difüzyon"]);
    expect(transportExamples212[1].answer).toBe("Kolaylaştırılmış difüzyon.");
  });

  it("mitosis rows match an explicit DNA-molecule count and the lesson's 2n = 4 statements", () => {
    for (const n of [1, 2, 3, 6]) {
      const a = g1(n);
      const b = sPhase(a);
      const ana = separateSisters(b);
      const pole = ana.filter((_, i) => i % 2 === 0);
      const expected = [[a], [b], [b], [b], [ana], [pole], [pole]].map((cells) => strip(count(cells, n)));
      expect(mitosisRows212(n).map(({ chromosomes, chromatids, dnaMolecules, dnaC }) => ({ chromosomes, chromatids, dnaMolecules, dnaC }))).toEqual(expected);
    }
    // Rehber: 2n=4 metafaz 4 kromozom 8 DNA molekülü; anafaz bütün hücre 8 kromozom 8 DNA; bir kutup 4 ve 4.
    const rows = mitosisRows212(2);
    expect([rows[3].chromosomes, rows[3].dnaMolecules, rows[4].chromosomes, rows[4].dnaMolecules, rows[5].chromosomes, rows[5].dnaMolecules]).toEqual([4, 8, 8, 8, 4, 4]);
    expect(mitosisSupplement212.table.rows).toEqual([
      ["G₁", "4", "— / 4", "2C", "2 homolog çift"],
      ["G₂ (S sonrası)", "4", "8 / 8", "4C", "2 homolog çift"],
      ["Profaz", "4", "8 / 8", "4C", "2 homolog çift"],
      ["Metafaz", "4", "8 / 8", "4C", "2 homolog çift"],
      ["Anafaz (bütün hücre)", "8", "— / 8", "4C", "Her kutupta 2 homolog çift"],
      ["Anafaz (bir kutup)", "4", "— / 4", "2C", "2 homolog çift"],
      ["Yavru hücre (her biri)", "4", "— / 4", "2C", "2 homolog çift"],
    ]);
    expect(products212.mitoz).toBe(2);
    // Örnek 1: metafazda 24 kromatit.
    const n1 = [...Array(40).keys()].find((n) => count([sPhase(g1(n))], n || 1).chromatids === 24)!;
    expect(2 * n1).toBe(12);
    expect(mitosisExamples212[0].answer).toBe("2n = 12. Anafazda bütün hücrede 24 kromozom, her yavru hücrede 12 kromozom vardır.");
    // Örnek 2: üç tur mitoz, hücre hücre simülasyon.
    let cells = [g1(2)];
    for (let round = 0; round < 3; round++)
      cells = cells.flatMap((c) => {
        const halves = separateSisters(sPhase(c));
        return [halves.filter((_, i) => i % 2 === 0), halves.filter((_, i) => i % 2 === 1)];
      });
    expect([cells.length, cells.flat().length, count([cells[0]], 2).dnaC]).toEqual([8, 32, 2]);
    expect(mitosisExamples212[1].answer).toBe("8 hücre, toplam 32 kromozom. Her hücre 4 kromozom ve 2C DNA taşır.");
  });

  it("meiosis rows match an explicit count: MI ends n with two chromatids, MII ends four n cells", () => {
    for (const n of [2, 3, 4, 5]) {
      const a = g1(n);
      const b = sPhase(a);
      // Homolog ayrılması: her çiftten bir kromozom her kutba.
      const h0 = b.filter((c) => c[0].origin === c[0].pair % 2);
      const h1 = b.filter((c) => c[0].origin !== c[0].pair % 2);
      const a2 = separateSisters(h0);
      const end = a2.filter((_, i) => i % 2 === 0);
      const expected = [[a], [b], [b], [h0, h1], [h0], [h0], [a2], [end]].map((cells) => strip(count(cells, n)));
      const rows = meiosisRows212(n);
      expect(rows.map(({ chromosomes, chromatids, dnaMolecules, dnaC }) => ({ chromosomes, chromatids, dnaMolecules, dnaC }))).toEqual(expected);
      expect(rows[1].homolog).toBe(`${n} tetrat (homologlar eşleşik)`);
      expect(new Set(h0.map((c) => c[0].pair)).size).toBe(n);
      expect(rows[4].chromosomes).toBe(n);
      expect(rows[4].chromatids).toBe(2 * n);
      expect(rows[7].chromosomes).toBe(n);
      expect(rows[7].dnaC * products212.mayoz).toBe(rows[1].dnaC);
    }
    // Rehber: 2n=6 anafaz II hücre 6 kromozom, kutup 3, hücre 2C; 2n=8 MI ürünü 4 kromozom, 8 DNA, 2C; 2n=4 anafaz I kutup 2 kromozom, 4 DNA.
    const six = meiosisRows212(3);
    expect([six[6].chromosomes, six[7].chromosomes, six[6].dnaC, six[7].dnaC]).toEqual([6, 3, 2, 1]);
    const eight = meiosisRows212(4);
    expect([eight[4].chromosomes, eight[4].dnaMolecules, eight[4].dnaC]).toEqual([4, 8, 2]);
    const four = meiosisRows212(2);
    expect([four[3].groups[0].length, four[3].groups[0].length * 2, four[3].chromosomes, four[3].dnaMolecules]).toEqual([2, 4, 4, 8]);
    expect(meiosisSupplement212.table.rows.map((row) => row.slice(1, 4))).toEqual([
      ["8", "— / 8", "2C"], ["8", "16 / 16", "4C"], ["8", "16 / 16", "4C"], ["8", "16 / 16", "4C"],
      ["4", "8 / 8", "2C"], ["4", "8 / 8", "2C"], ["8", "— / 8", "2C"], ["4", "— / 4", "C"],
    ]);
    expect(meiosisExamples212[0].answer).toBe("3 kromozom, 6 kromatit, 2C DNA.");
    // Örnek 2: 5 tetrat, G₁ 6 pg → C = 3 pg.
    const rows5 = meiosisRows212(5);
    const pg = rows5.map(({ dnaC }) => (dnaC * 6) / rows5[0].dnaC);
    expect([2 * 5, pg[2], pg[4], pg[7]]).toEqual([10, 12, 6, 3]);
    expect(meiosisExamples212[1].answer).toBe("2n = 10. Metafaz I 12 pg, mayoz I sonu 6 pg, mayoz II sonu 3 pg.");
  });

  it("asexual reproduction: no fertilisation, mitotic copies, meiotic eggs; counts by simulation", () => {
    expect(asexual212.every(({ fertilization }) => fertilization === false)).toBe(true);
    for (const row of asexual212) {
      const kids = offspring212(row);
      expect(kids).toHaveLength(row.offspringCount);
      if (row.mode === "copy") expect(kids.every((g) => g === row.parent)).toBe(true);
      else expect(new Set(kids)).toEqual(new Set(row.parent.split("")));
    }
    expect(asexualSupplement212.table.rows.at(-1)).toEqual(["Partenogenez", "Döllenmemiş yumurta bireye gelişir", "Bal arısında erkek (n)", "Aynı olmayabilir: yumurta mayozla oluşur"]);
    // Rehberin örneği: 3 bakteri iki turda 12, sonra 5 bölünür: 17.
    expect(population212(3, 2, 5)).toBe(17);
    let bacteria = Array.from({ length: 4 }, () => "A");
    for (let round = 0; round < 3; round++) bacteria = bacteria.flatMap((b) => [b, b]);
    bacteria = [...bacteria.slice(6), ...bacteria.slice(0, 6).flatMap((b) => [b, b])];
    expect(bacteria.length).toBe(population212(4, 3, 6));
    expect(asexualExamples212[0].answer).toBe(`${bacteria.length} bakteri. Mutasyon yoksa hepsi ataya kalıtsal olarak aynıdır.`);
    expect(asexualExamples212[1].answer).toBe("Erkekler 16 kromozomlu (n); genotipleri A ya da a. Kraliçenin kopyası değildirler.");
  });

  it("figure readouts come from the same rows as the tables", () => {
    const read = (id: string, title: string, step: number) => sectionFigures[id][title].draw(0, step).readout!.join(" ");
    mitosisRows212(2).forEach((row, step) =>
      expect(read("mitoz", mitosisSupplement212.title, step)).toContain(`${row.chromosomes} kromozom`));
    expect(read("mayoz", meiosisSupplement212.title, 5)).toContain("4 kromozom, kromatit / DNA molekülü 8 / 8, DNA 2C");
    expect(read("mayoz", meiosisSupplement212.title, 7)).toContain("DNA C.");
    expect(read("hucre-organelleri", organelleSupplement212.title, 0)).toContain("Hücreler: bitki, hayvan, bakteri");
    expect(read("hucre-zarinda-madde-alisverisleri", transportSupplement212.title, 2)).toContain("dışta 1, içte 4: su içeri");
    expect(read("eseysiz-ureme", asexualSupplement212.title, 6)).toContain("Ata Aa → yavru A, a");
  });
});
