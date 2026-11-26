import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { depthFigures218 } from "../src/learning/sectionFigures/depthFigures218";
import {
  BREEDERS218, CYCLE_STEPS218, DIPLOID218, INVERTEBRATES218, VERTEBRATES218, VIRUSES218,
  cycleExample218, cycleSupplement218, depth218Supplements, gameteN218, invertebrateExamples218, invertebrateSupplement218,
  lysogenAfterInduction218, lysogenCells218, lysogenDivisions218, lysogenReleased218, reproExamples218, reproSupplement218,
  vertebrateExamples218, vertebrateSupplement218, virusExample218, virusSupplement218, zebraEggs218, zebraFertilised218, zebraTotal218,
  zygote218,
} from "../src/learning/depth218";

const lessons218 = {
  omurgalilar: [[vertebrateSupplement218], vertebrateExamples218],
  omurgasizlar: [[invertebrateSupplement218], invertebrateExamples218],
  virusler: [[virusSupplement218, cycleSupplement218], [virusExample218, cycleExample218]],
  "eseyli-ureme": [[reproSupplement218], reproExamples218],
} as const;

/* Bağımsız denetim için elle yazılmış ders kitabı değerleri. */
const HEART: Record<string, [number, number, string, string, string]> = {
  // kulakçık, karıncık, dolaşım, ısı, döllenme
  Balıklar: [1, 1, "tek", "ektoterm", "dış"],
  "İki yaşamlılar": [2, 1, "çift", "ektoterm", "dış"],
  Sürüngenler: [2, 1, "çift", "ektoterm", "iç"],
  Kuşlar: [2, 2, "çift", "endoterm", "iç"],
  Memeliler: [2, 2, "çift", "endoterm", "iç"],
};
const VIRUS: Record<string, [string, boolean, string]> = {
  "T4 bakteriyofajı": ["DNA", false, "bakteri"],
  "Tütün mozaik virüsü": ["RNA", false, "bitki"],
  "İnfluenza virüsü": ["RNA", true, "insan"],
  "Kuduz virüsü": ["RNA", true, "insan"],
  "Herpes simpleks virüsü": ["DNA", true, "insan"],
  HIV: ["RNA", true, "insan"],
  "Hepatit A virüsü": ["RNA", false, "insan"],
  "Hepatit B virüsü": ["DNA", true, "insan"],
};
const KARYOTYPE: Record<string, number> = { İnsan: 46, Köpek: 78, Tavuk: 78, "Sirke sineği": 8, "Zebra balığı": 50, "Afrika pençeli kurbağası": 36 };

describe("TYT Biyoloji canlılar ve eşeyli üreme derinleştirmesi 0.218.0", () => {
  it("appends table sections, figures and examples without touching the accepted guides", () => {
    for (const [id, [added, examples]] of Object.entries(lessons218)) {
      const raw = lessonGuides.get(id)!;
      expect(raw, id).toBeDefined();
      const shown = studyGuide(id)!;
      const k = added.length;
      for (const a of added) expect(raw.sections.some(({ title }) => title === a.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      const last = shown.sections.slice(-k);
      added.forEach((a, i) => {
        expect(shown.sections.filter(({ table }) => table === a.table)).toHaveLength(1);
        expect(last[i].title).toBe(a.title);
        expect(last[i].figureTitle).toBe(a.title);
        expect(a.figureTitle).toBe(a.title);
        expect(last[i].paragraphs).toEqual(a.paragraphs);
        expect(last[i].table?.layout).toBe("table");
        expect(last[i].table!.rows.length).toBeLessThanOrEqual(8);
        expect(last[i].table!.headers.length).toBeLessThanOrEqual(5);
        expect(last[i].table!.rows.every((row) => row.length === last[i].table!.headers.length)).toBe(true);
      });
      expect(shown.examples.slice(-examples.length)).toEqual(examples);
      const revised = studyGuideWithSourceRevisions(id)!;
      expect(shown.examples.slice(0, -examples.length)).toEqual(revised.examples);
      expect(shown.sections.slice(0, -k)).toEqual(revised.sections);
      expect(revised.examples.map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(revised.sections.map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(theorySupplements[id]).toEqual(depth218Supplements[id as keyof typeof depth218Supplements]);
      expect(theorySupplements[id]!.slice(-k)).toEqual(added);
      // Kopya Kâğıdı: aynı tablo, kısa özet ve figür başlığı.
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSections = sheet.sections.slice(-k);
      added.forEach((a, i) => {
        expect(sheetSections[i].title).toBe(a.title);
        expect(sheetSections[i].table).toBe(a.table);
        expect(sheetSections[i].text).toEqual([a.summary]);
        expect(sheetSections[i].figureTitle).toBe(a.figureTitle);
        expect(a.summary.length).toBeLessThan(330);
        expect(JSON.stringify(a)).not.toMatch(/undefined|NaN|null|ÖSYM|resmî sınav/);
      });
      expect(sheet.examples.slice(-examples.length).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-examples.length)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length, `${id} ${key}`).toBeGreaterThan(5);
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(example.steps.every(({ label, explanation }) => label && explanation)).toBe(true);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b/);
      }
      // Figür yeni bölüm başlığıyla kayıtlı ve her adımda çizilebiliyor.
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      for (const a of added) {
        const figure = sectionFigures[id]?.[a.title];
        expect(figure, id).toBe(depthFigures218[id][a.title]);
        expect(figure!.steps!.length).toBeGreaterThan(1);
        for (let step = 0; step < figure!.steps!.length; step++) {
          const frame = figure!.draw(0, step);
          expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
          expect(frame.readout!.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("keeps the earlier section figures of the four lessons", () => {
    for (const id of Object.keys(lessons218)) expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(Object.keys(depthFigures218[id]).length);
  });

  it("recomputes the vertebrate table and both vertebrate examples", () => {
    expect(VERTEBRATES218.map(({ name }) => name)).toEqual(Object.keys(HEART));
    for (const c of VERTEBRATES218) {
      const [a, v, circ, thermo, fert] = HEART[c.name];
      expect([c.atria, c.ventricles, c.circulation, c.thermo, c.fertilisation], c.name).toEqual([a, v, circ, thermo, fert]);
    }
    const rows = vertebrateSupplement218.table.rows;
    expect(rows.map((r) => Number(r[2].split(" ")[0]))).toEqual([2, 3, 3, 4, 4]);
    expect(rows[2][2]).toContain("timsah 4");
    expect(rows[0][4]).toBe("Dış (köpek balığında iç)");
    expect(rows.map((r) => r[3])).toEqual(["Ektoterm", "Ektoterm", "Ektoterm", "Endoterm", "Endoterm"]);
    // Örnek 1: 2 kulakçık + ektoterm + iç döllenme.
    const left = Object.entries(HEART).filter(([, [a, , , t, f]]) => a === 2 && t === "ektoterm" && f === "iç").map(([n]) => n);
    expect(left).toEqual(["Sürüngenler"]);
    expect(vertebrateExamples218[0].answer).toMatch(/^Sürüngenler\. Tipik örnekte 3 odacık .*timsah, 4 odacık\.$/);
    // Örnek 2: tek dolaşım 1, çift dolaşım 2 geçiş.
    const passes = ["Balıklar", "İki yaşamlılar", "Kuşlar"].map((n) => (HEART[n][2] === "tek" ? 1 : 2));
    expect(passes).toEqual([1, 2, 2]);
    expect(vertebrateExamples218[1].answer).toMatch(/^Sazan 1, kurbağa 2, güvercin 2 kez\./);
  });

  it("recomputes the invertebrate filters", () => {
    expect(INVERTEBRATES218).toHaveLength(8);
    const radial = INVERTEBRATES218.filter((g) => g.symmetry === "ışınsal").map(({ name }) => name);
    expect(radial).toEqual(["Sölenterler", "Derisidikenliler"]);
    const none = INVERTEBRATES218.filter((g) => g.circulation === "yok");
    expect(none.map(({ name }) => name)).toEqual(["Süngerler", "Sölenterler", "Yassı solucanlar", "Yuvarlak solucanlar"]);
    expect(new Set(none.map(({ symmetry }) => symmetry)).size).toBe(3);
    expect(invertebrateSupplement218.table.rows.map((r) => r[4])).toEqual([
      "Özel sistem yok", "Özel sistem yok", "Özel sistem yok", "Özel sistem yok", "Kapalı",
      "Açık (ahtapot ve kalamarda kapalı)", "Açık", "İndirgenmiş (su damar sistemi taşımaya katılır)",
    ]);
    // Örnek 1: iki yanlı + yüzey + kapalı.
    const hit = INVERTEBRATES218.filter((g) => g.symmetry === "iki yanlı" && g.surfaceBreathing && g.circulation === "kapalı");
    expect(hit.map(({ name }) => name)).toEqual(["Halkalı solucanlar"]);
    expect(invertebrateExamples218[0].answer).toBe("Halkalı solucanlar: toprak solucanı, sülük.");
    expect(invertebrateExamples218[1].answer).toMatch(/^Doğru değil\. Dolaşımı olmayan 4 grup 3 simetri tipine dağılır/);
  });

  it("recomputes the virus table, the lytic–lysogenic table and both virus examples", () => {
    expect(VIRUSES218.map(({ name }) => name)).toEqual(Object.keys(VIRUS));
    for (const x of VIRUSES218) expect([x.genome, x.envelope, x.host], x.name).toEqual(VIRUS[x.name]);
    expect(virusSupplement218.table.rows.map((r) => r[1])).toEqual(Object.values(VIRUS).map(([g]) => g));
    expect(virusSupplement218.paragraphs[0]).toMatch(/Virüs bir hücre değildir/);
    expect(virusSupplement218.paragraphs[0]).toMatch(/konak hücre dışında çoğalamaz/);
    const hit = Object.entries(VIRUS).filter(([, [g, env, host]]) => g === "RNA" && !env && host === "insan").map(([n]) => n);
    expect(hit).toEqual(["Hepatit A virüsü"]);
    expect(virusExample218.answer).toBe("İki bilgiyle Tütün mozaik virüsü ve Hepatit A virüsü uyumludur. Konak bilgisiyle Hepatit A virüsü kalır.");
    // Litik–lizogenik: ilk iki basamak ortak, virion yalnız litik son basamakta.
    expect(CYCLE_STEPS218).toHaveLength(5);
    expect(CYCLE_STEPS218.map((s) => s.lytic === s.lysogenic)).toEqual([true, true, false, false, false]);
    expect(CYCLE_STEPS218.map((s) => s.newVirions.lytic)).toEqual([false, false, false, false, true]);
    expect(CYCLE_STEPS218.some((s) => s.newVirions.lysogenic || !s.hostAlive.lysogenic)).toBe(false);
    expect(cycleSupplement218.table.rows[2][2]).toContain("profaj");
    expect([lysogenCells218, lysogenReleased218, lysogenAfterInduction218]).toEqual([2 ** lysogenDivisions218, 0, 2 ** lysogenDivisions218 - 1]);
    expect(cycleExample218.answer).toMatch(/^8 bakteri profaj taşır, ortama 0 yeni faj çıkar\. .* 7 bakteri kalır/);
  });

  it("computes gametes and zygotes from 2n and checks both reproduction examples", () => {
    expect(DIPLOID218).toEqual(KARYOTYPE);
    reproSupplement218.table.rows.forEach((row, i) => {
      const d = KARYOTYPE[BREEDERS218[i].species];
      expect(row[1]).toBe(String(d));
      expect(row[2]).toBe(String(d / 2));
      expect(row[3]).toBe(`${d / 2} + ${d / 2} = ${d}`);
    });
    expect(BREEDERS218.filter((b) => b.fertilisation === "dış").map(({ species }) => species)).toEqual(["Zebra balığı", "Afrika pençeli kurbağası"]);
    expect(() => gameteN218(45)).toThrow();
    expect(zygote218(46)).toBe(46);
    expect(reproExamples218[0].answer).toMatch(/^İkisinde de gamet 39, zigot 78 kromozomludur\./);
    const total = zebraFertilised218 * 50 + (zebraEggs218 - zebraFertilised218) * 25;
    expect(total).toBe(200);
    expect(zebraTotal218).toBe(total);
    expect(reproExamples218[1].answer).toBe("Döllenme dışarıda, suda olmuştur. Her zigotta 50, her döllenmemiş yumurtada 25 kromozom vardır; 5 hücrede toplam 200 kromozom.");
  });
});
