import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  atomModelExamples210, atomModelRows210, atomModelSupplement210, atomObservations210, balmer32_210, balmer42_210,
  bohrConstants210, bohrEnergyEv210, bohrEnergyJ210, bohrLevels210, bohrTransition210, configuration210, disciplineExampleTasks210,
  disciplineExamples210, disciplineRows210, disciplineSupplement210, exampleHazards210, hcEvNm210, labelExampleA210, labelExampleB210,
  labelFor210, periodicExampleA210, periodicExampleB210, periodicExamples210, periodicRow210, periodicRows210, periodicSupplement210,
  pictogramExamples210, pictogramRows210, pictogramSupplement210,
} from "../src/learning/depth210";

const lessons210 = {
  "kimya-disiplinleri": [disciplineSupplement210, disciplineExamples210],
  "kimya-guvenlik": [pictogramSupplement210, pictogramExamples210],
  "atom-modelleri": [atomModelSupplement210, atomModelExamples210],
  "periyodik-sistem": [periodicSupplement210, periodicExamples210],
} as const;
const sheetText = (sheet: NonNullable<ReturnType<typeof studyCheatSheet>>) => JSON.stringify(sheet);

describe("TYT Kimya depth 0.210.0", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons210)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.length).toBeGreaterThan(3);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      // Display-only copy revisions may reword raw steps; identity and order stay.
      expect(shown.examples.slice(0, raw.examples.length).map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(shown.examples).toHaveLength(raw.examples.length + (theorySupplements[id] ?? []).reduce((n, s) => n + (s.examples?.length ?? 0), 0));
      // Earlier supplements of the lesson stay; the new one is last.
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(sheetText(sheet)).toContain(added.table.rows[0][0]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(10);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî sınav|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|Infinity/);
      // Turkish only: no English UI words slipped in.
      expect(JSON.stringify(added)).not.toMatch(/\b(the|and|signal word|warning|danger)\b/i);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      const values = figure!.param ? [figure!.param.min, figure!.param.init, figure!.param.max] : [0];
      for (const value of values)
        for (let step = 0; step < (figure!.steps?.length ?? 1); step++)
          expect(JSON.stringify(figure!.draw(value, step))).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
    }
  });

  it("matches every discipline to the guide vocabulary and solves the discipline examples from the table", () => {
    const guideText = lessonGuides.get("kimya-disiplinleri")!.sections.flatMap(({ paragraphs }) => paragraphs).join(" ");
    expect(disciplineRows210.map(({ name }) => name)).toEqual([
      "Analitik kimya", "Organik kimya", "Anorganik kimya", "Fizikokimya", "Biyokimya", "Polimer kimyası", "Endüstriyel kimya",
    ]);
    for (const { name, professions } of disciplineRows210) {
      expect(guideText.toLocaleLowerCase("tr-TR")).toContain(name.toLocaleLowerCase("tr-TR"));
      for (const p of professions) expect(guideText.toLocaleLowerCase("tr-TR")).toContain(p.toLocaleLowerCase("tr-TR"));
    }
    expect(disciplineSupplement210.table.rows.map((row) => row[3])).toEqual([
      "Kimyager", "Kimyager, Eczacı", "Metalurji ve malzeme mühendisi, Kimyager", "Kimyager", "Eczacı, Kimyager", "Kimya mühendisi, Kimyager", "Kimya mühendisi",
    ]);
    expect(disciplineExampleTasks210.map((tasks) => tasks.map(({ discipline }) => discipline))).toEqual([
      ["Analitik kimya", "Fizikokimya", "Endüstriyel kimya"],
      ["Analitik kimya", "Analitik kimya", "Biyokimya"],
    ]);
    expect(disciplineExamples210.map(({ answer }) => answer)).toEqual([
      "1. ekip analitik kimya (nicel), 2. ekip fizikokimya, 3. ekip endüstriyel kimya. 3. ekipte en sık kimya mühendisi çalışır.",
      "K ve L analitik kimya: K nitel, L nicel analizdir. M biyokimya çalışmasıdır.",
    ]);
    expect(disciplineSupplement210.paragraphs[2]).toContain("Kimyager 6 satırda, kimya mühendisi 2 satırda");
  });

  it("keeps the GHS table to the nine official codes, signal words and real H statements", () => {
    expect(pictogramRows210.map(({ code, name }) => `${code} ${name}`)).toEqual([
      "GHS01 Patlayan bomba", "GHS02 Alev", "GHS03 Çember üzerinde alev", "GHS04 Gaz tüpü", "GHS05 Aşındırıcı",
      "GHS06 Kuru kafa ve çapraz kemikler", "GHS07 Ünlem işareti", "GHS08 Sağlık tehlikesi", "GHS09 Çevre",
    ]);
    expect(pictogramRows210.map(({ h }) => h.code)).toEqual(["H201", "H225", "H272", "H280", "H314", "H301", "H319", "H350", "H400"]);
    expect(pictogramSupplement210.table.rows.map((row) => row[3])).toEqual([
      "Tehlike veya Dikkat", "Tehlike veya Dikkat", "Tehlike veya Dikkat", "Dikkat", "Tehlike veya Dikkat",
      "Tehlike", "Dikkat", "Tehlike veya Dikkat", "Dikkat; sinyal sözcüğü olmayabilir",
    ]);
    for (const word of pictogramRows210.flatMap(({ signals }) => signals)) expect(["Tehlike", "Dikkat"]).toContain(word);
    expect(pictogramSupplement210.paragraphs.join(" ")).toContain("öğretim özetidir");
    expect(pictogramSupplement210.summary).toContain("Öğretim özetidir");
    // Etiket kuralları: tek sinyal sözcüğü; GHS06 ve GHS05 (tahriş) GHS07’yi düşürür, H ifadeleri kalır.
    const { flammableLiquid2, eyeIrritation2, acuteOral3, skinIrritation2 } = exampleHazards210;
    expect(labelExampleA210).toEqual({ pictograms: ["GHS02", "GHS07"], dropped: [], signal: "Tehlike", h: ["H225", "H319"] });
    expect(labelExampleB210).toEqual({ pictograms: ["GHS06"], dropped: ["GHS07"], signal: "Tehlike", h: ["H301", "H315"] });
    expect(labelFor210([eyeIrritation2, skinIrritation2])).toEqual({ pictograms: ["GHS07"], dropped: [], signal: "Dikkat", h: ["H319", "H315"] });
    const corrosive = { label: "Cilt aşınması, kategori 1", pictogram: "GHS05", signal: "Tehlike" as const, h: "H314", meaning: "" };
    expect(labelFor210([corrosive, skinIrritation2]).pictograms).toEqual(["GHS05"]);
    const respiratory = { label: "Tek maruz kalmada hedef organ toksisitesi, kategori 3", pictogram: "GHS07", signal: "Dikkat" as const, h: "H335", meaning: "" };
    expect(labelFor210([corrosive, respiratory]).pictograms).toEqual(["GHS05", "GHS07"]);
    expect(labelFor210([flammableLiquid2, acuteOral3]).pictograms).toEqual(["GHS02", "GHS06"]);
    expect(pictogramExamples210.map(({ answer }) => answer)).toEqual([
      "Piktogramlar GHS02 ve GHS07; sinyal sözcüğü “Tehlike”; H ifadeleri H225 ve H319.",
      "Yalnız GHS06 ve “Tehlike”. Cilt tahrişi kaybolmaz: H315 ifadesi etikette yazılır.",
    ]);
  });

  it("computes Bohr levels and Balmer lines from SI constants", () => {
    const { h, c, e, rydbergEv, teachingEv } = bohrConstants210;
    expect(hcEvNm210).toBeCloseTo(1239.84, 2);
    expect(teachingEv).toBeCloseTo(rydbergEv, 1);
    expect(bohrLevels210.map(({ ev }) => Number(ev.toFixed(2)))).toEqual([-13.6, -3.4, -1.51, -0.85]);
    expect(bohrEnergyJ210(1)).toBeCloseTo(-2.18e-18, 20);
    for (let n = 1; n <= 6; n++) expect(bohrEnergyEv210(n) * n * n).toBeCloseTo(-13.6, 12);
    // λ = hc/ΔE, independently: ΔE in J.
    const lambda = (hi: number, lo: number) => (h * c) / ((teachingEv * (1 / lo ** 2 - 1 / hi ** 2)) * e) * 1e9;
    expect(balmer32_210.nm).toBeCloseTo(lambda(3, 2), 9);
    expect(balmer42_210.nm).toBeCloseTo(lambda(4, 2), 9);
    expect([Math.round(balmer32_210.nm), Math.round(balmer42_210.nm)]).toEqual([656, 486]);
    expect(balmer32_210.deltaEv).toBeCloseTo(1.889, 3);
    expect(balmer42_210.deltaEv).toBeCloseTo(2.55, 12);
    expect(bohrTransition210(2, 4).emitted).toBe(false);
    expect(balmer42_210.emitted).toBe(true);
    expect(atomModelExamples210[0].answer).toBe("Enerji yayılır; ΔE = 2,55 eV, λ ≈ 486 nm.");
    expect(1240 / 2.55).toBeCloseTo(486.3, 1);
  });

  it("orders the four atom models and matches each observation to the first model that explains it", () => {
    expect(atomModelRows210.map(({ name, year }) => `${name} ${year}`)).toEqual(["Dalton 1803", "Thomson 1904", "Rutherford 1911", "Bohr 1913"]);
    const keyword = ["oran", "elektron", "sapma", "spektrum"];
    atomObservations210.forEach(({ model }, i) => {
      const first = atomModelRows210.find(({ explains, evidence }) => `${evidence} ${explains}`.toLocaleLowerCase("tr-TR").includes(keyword[i]))!;
      expect(first.name).toBe(model);
    });
    expect(atomModelSupplement210.table.rows.map((row) => row[0])).toEqual(["Dalton", "Thomson", "Rutherford", "Bohr"]);
    expect(atomModelRows210[3].fails).toMatch(/Çok elektronlu/);
    expect(atomModelExamples210[1].answer).toBe("I–Dalton, II–Thomson, III–Rutherford, IV–Bohr. Bohr modeli IV. gözlemi hidrojende açıklar, iki elektronlu helyum atomunda açıklayamaz.");
  });

  it("derives period, group and block for Z = 1–20 from the configuration", () => {
    // Bağımsız kaynak: Z=1–20 için bilinen adresler (IUPAC tablosu, He 18. grup).
    const known: Record<string, [number, number, string]> = {
      H: [1, 1, "s"], He: [1, 18, "s"], Li: [2, 1, "s"], Be: [2, 2, "s"], B: [2, 13, "p"], C: [2, 14, "p"], N: [2, 15, "p"], O: [2, 16, "p"],
      F: [2, 17, "p"], Ne: [2, 18, "p"], Na: [3, 1, "s"], Mg: [3, 2, "s"], Al: [3, 13, "p"], Si: [3, 14, "p"], P: [3, 15, "p"], S: [3, 16, "p"],
      Cl: [3, 17, "p"], Ar: [3, 18, "p"], K: [4, 1, "s"], Ca: [4, 2, "s"],
    };
    expect(periodicRows210).toHaveLength(20);
    for (const row of periodicRows210) {
      expect([row.period, row.group, row.block], row.symbol).toEqual(known[row.symbol]);
      expect(row.subs.reduce((s, { e }) => s + e, 0)).toBe(row.z);
      expect(row.shells.reduce((s, e) => s + e, 0)).toBe(row.z);
    }
    expect(periodicSupplement210.table.rows[12]).toEqual(["13 · Al · Alüminyum", "2,8,3", "1s² 2s² 2p⁶ 3s² 3p¹", "3. periyot · 13. grup (3A)", "p"]);
    expect(periodicSupplement210.table.rows[1]).toEqual(["2 · He · Helyum", "2", "1s²", "1. periyot · 18. grup (8A)", "s"]);
    expect(periodicSupplement210.table.rows[19]).toEqual(["20 · Ca · Kalsiyum", "2,8,8,2", "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²", "4. periyot · 2. grup (2A)", "s"]);
    expect(() => configuration210(21)).toThrow();
    // Örnek 1: 3p⁴ ile biten tek dizilim; Örnek 2: Ar’dan sonraki iki element.
    const endings = periodicRows210.filter(({ subs }) => subs.at(-1)!.n === 3 && subs.at(-1)!.l === "p" && subs.at(-1)!.e === 4);
    expect(endings.map(({ symbol }) => symbol)).toEqual(["S"]);
    expect([periodicExampleA210.z, periodicExampleA210.group, periodicExampleA210.period, periodicExampleA210.block]).toEqual([16, 16, 3, "p"]);
    expect(periodicExampleB210.map(({ symbol, period, group }) => `${symbol} ${period}/${group}`)).toEqual(["Ar 3/18", "K 4/1", "Ca 4/2"]);
    expect(periodicRow210(19).orbital).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹");
    expect(periodicExamples210.map(({ answer }) => answer)).toEqual([
      "Z = 16 (S); 2,8,6; 3. periyot, 16. grup (6A), p bloku.",
      "Y: K, 4. periyot 1. grup s bloku. T: Ca, 4. periyot 2. grup s bloku.",
    ]);
  });

  it("builds figure readouts and labels from the same rows as the tables", () => {
    const frame = (id: string, title: string, value: number, step: number) => sectionFigures[id][title].draw(value, step);
    const labels = (f: ReturnType<typeof frame>) => f.els.flatMap((el) => (el.k === "text" ? [el.s] : []));
    disciplineRows210.forEach(({ name, professions }, step) => {
      const f = frame("kimya-disiplinleri", disciplineSupplement210.title, 0, step);
      expect(f.readout!.join(" ")).toContain(name);
      expect(f.readout!.join(" ")).toContain(professions.join(", "));
      expect(labels(f)).toContain(name);
    });
    pictogramRows210.forEach(({ code, name, h }, step) => {
      const f = frame("kimya-guvenlik", pictogramSupplement210.title, 0, step);
      expect(f.readout!.join(" ")).toContain(`${code} · ${name}`);
      expect(f.readout!.join(" ")).toContain(h.code);
      expect(labels(f)).toEqual(expect.arrayContaining(pictogramRows210.map((r) => r.code)));
    });
    atomModelRows210.forEach(({ name, year }, step) => {
      const f = frame("atom-modelleri", atomModelSupplement210.title, 0, step);
      expect(f.readout![0]).toBe(`${name} (${year}). Kanıt: ${atomModelRows210[step].evidence.charAt(0).toLocaleLowerCase("tr-TR")}${atomModelRows210[step].evidence.slice(1)}.`);
    });
    const bohr = frame("atom-modelleri", atomModelSupplement210.title, 0, 3);
    expect(labels(bohr)).toEqual(expect.arrayContaining(["n = 1 · −13,6 eV", "n = 2 · −3,4 eV", "n = 3 · −1,51 eV", "656 nm"]));
    for (const row of periodicRows210) {
      const f = frame("periyodik-sistem", periodicSupplement210.title, row.z, 0);
      expect(f.readout![0]).toContain(row.orbital);
      expect(f.readout![1]).toContain(`${row.period}. periyot`);
      expect(f.readout![2]).toContain(`${row.group}. grup`);
    }
  });
});
