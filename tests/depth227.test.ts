import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";
import { depthFigures227 } from "../src/learning/sectionFigures/depthFigures227";
import {
  LINK227, TESTS227, beeSents227, birdFits227, birdTail227, breadSents227, cactusSents227, chainSents227, flowExamples227, flowSupplement227,
  glassSents227, ideaClaims227, ideaExamples227, ideaSents227, ideaSupplement227, meaningExamples227, meaningRows227, meaningSupplement227,
  openers227, pathSents227, sailSents227, seedSents227, shuffle227, splitExamples227, splitSupplement227, structSents227, structureExamples227,
  structureSupplement227, walkOptions227, walkSents227, type PSent227,
} from "../src/learning/depth227";

const lessons227 = {
  "cumlede-anlam": [meaningSupplement227, meaningExamples227],
  "paragrafa-giris": [structureSupplement227, structureExamples227],
  "yardimci-dusunce": [ideaSupplement227, ideaExamples227],
  "ikiye-bolme": [splitSupplement227, splitExamples227],
  "akisi-bozan-cumle": [flowSupplement227, flowExamples227],
} as const;

const R = ["I", "II", "III", "IV", "V", "VI"];
/* Bağımsız denetim: modülün yardımcılarını kullanmadan yeniden yazılmış kurallar. */
const depsOk = (sents: readonly PSent227[]) =>
  sents.every((s, i) => s.deps.every((d) => d.to < i && s.text.includes(d.phrase) && sents[d.to].text.includes(d.key)));
const lostIfRemoved = (sents: readonly PSent227[], k: number) => sents.flatMap((s, i) => (i !== k && s.deps.some((d) => d.to === k) ? [i] : []));
const goodSplits = (sents: readonly (PSent227 & { focus: string })[]) => {
  const out: number[] = [];
  for (let k = 1; k < sents.length; k++) {
    const a = new Set(sents.slice(0, k).map((s) => s.focus));
    const b = new Set(sents.slice(k).map((s) => s.focus));
    const cross = sents.slice(k).some((s) => s.deps.some((d) => d.to < k));
    if (a.size === 1 && b.size === 1 && [...a][0] !== [...b][0] && !cross) out.push(k);
  }
  return out;
};
const breakers = (sents: readonly (PSent227 & { focus: string })[]) => {
  const tally: Record<string, number> = {};
  for (const s of sents) tally[s.focus] = (tally[s.focus] ?? 0) + 1;
  const main = Object.entries(tally).sort((x, y) => y[1] - x[1])[0][0];
  return sents.flatMap((s, i) => (s.focus !== main && lostIfRemoved(sents, i).length === 0 ? [i] : []));
};

describe("TYT Türkçe cümlede anlam ve paragraf yapısı derinleştirmesi 0.227", () => {
  it("appends a table section, a figure and two examples without touching the accepted guides", () => {
    for (const [id, [added, examples]] of Object.entries(lessons227)) {
      const raw = lessonGuides.get(id)!;
      expect(raw, id).toBeDefined();
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
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      const revised = studyGuideWithSourceRevisions(id)!;
      expect(shown.examples.slice(0, -2)).toEqual(revised.examples);
      expect(shown.sections.slice(0, -1)).toEqual(revised.sections);
      expect(revised.examples.map(({ title }) => title)).toEqual(raw.examples.map(({ title }) => title));
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(added.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(added.summary.length).toBeLessThan(330);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        for (const key of ["title", "prompt", "strategy", "answer", "check", "pitfall"] as const) expect(example[key].length, `${id} ${key}`).toBeGreaterThan(5);
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        expect(example.steps.every(({ label, explanation }) => label && explanation)).toBe(true);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav|undefined|\bNaN\b|\[object/i);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|\bNaN\b|null|\[object|—|\.\.\./);
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBe(depthFigures227[id][added.title]);
      expect(figure!.steps!.length).toBeGreaterThanOrEqual(3);
      for (let step = 0; step < figure!.steps!.length; step++) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined|—|\.\.\./);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
      expect(figure!.caption.length).toBeGreaterThan(60);
      expect(figure!.alt.length).toBeGreaterThan(40);
      const html = renderToStaticMarkup(createElement(SectionFigureView, { def: figure!, title: added.title }));
      expect(html).toContain('role="img"');
    }
  });

  it("keeps the earlier section figures of the five lessons", () => {
    for (const id of Object.keys(lessons227)) expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(1);
  });

  it("YKS-015: every paragraph example carries its whole passage in the prompt", () => {
    const passages: [string, readonly PSent227[]][] = [
      [structureExamples227[0].prompt, structSents227],
      [ideaExamples227[0].prompt, ideaSents227],
      [ideaExamples227[1].prompt, walkSents227],
      [splitExamples227[0].prompt, seedSents227],
      [splitExamples227[1].prompt, breadSents227],
      [flowExamples227[0].prompt, beeSents227],
      [flowExamples227[1].prompt, glassSents227],
    ];
    for (const [prompt, sents] of passages) for (const { text } of sents) expect(prompt).toContain(text);
    for (const { text } of [...birdTail227, ...openers227]) expect(structureExamples227[1].prompt).toContain(text);
    for (const { sentence } of sailSents227) expect(meaningExamples227[0].prompt).toContain(sentence);
    for (const { sentence } of pathSents227) expect(meaningExamples227[1].prompt).toContain(sentence);
    for (const [, [added]] of Object.entries(lessons227)) if (added !== meaningSupplement227) {
      const sents = { "paragrafa-giris": structSents227, "yardimci-dusunce": ideaSents227, "ikiye-bolme": cactusSents227, "akisi-bozan-cumle": chainSents227 }[
        Object.entries(lessons227).find(([, v]) => v[0] === added)![0] as "paragrafa-giris"
      ];
      for (const { text } of sents) expect(added.paragraphs[0]).toContain(text);
    }
  });

  it("recomputes every relation row by its test questions", () => {
    const expected = [
      ["Neden-sonuç", "Gece don olduğu için fidanların yaprakları karardı."],
      ["Amaç", "Fidanları dondan korumak için üstlerini örtüyle kapattık."],
      ["Koşul", "Toprak kurursa damla sulama düzeneği kendiliğinden çalışır."],
      ["Karşıtlık", "Bulutlar kapkara görünüyordu ama tek damla yağmur düşmedi."],
      ["Çıkarım", "Yerdeki taşlar ıslak; demek ki gece yağmur yağmış."],
      ["Karşılaştırma", "Kumlu toprak, killi topraktan daha hızlı su geçirir."],
      ["Öznel yargı", "Sabah yürüyüşü, günün en keyifli saatidir."],
      ["Nesnel yargı", "Bu atlas otuz iki haritadan oluşur."],
    ];
    const rows = meaningSupplement227.table.rows;
    expect(rows.map((r) => [r[0], r[2]])).toEqual(expected);
    meaningRows227.forEach((r, i) => {
      expect(r.sentence).toContain(r.cue.text);
      expect(r.signals).toContain(r.cue.signal);
      expect(rows[i][4]).toBe(TESTS227[r.relation]);
      if (r.clauses.length === 2) {
        const hits = LINK227.filter((l) => r.yes.includes(l));
        expect(hits).toEqual([r.relation]);
        expect(rows[i][3]).toBe(`1: ${r.clauses[0]} · 2: ${r.clauses[1]}`);
      } else {
        expect(r.yes.filter((y) => y === "öznel yargı" || y === "nesnel yargı")).toHaveLength(1);
        expect(r.yes[0]).toBe(r.relation);
      }
    });
    expect(meaningRows227.filter(({ signals }) => signals.includes("için")).map(({ relation }) => relation)).toEqual(["neden-sonuç", "amaç"]);
    expect(meaningRows227[1].realized).toEqual([false, true]);
    expect(meaningRows227[2].realized).toEqual([false, false]);
  });

  it("recomputes the two meaning examples", () => {
    const returned = sailSents227.filter(({ clauses, realized }) => clauses.some((c, k) => c.includes("limana") && realized[k]));
    expect(returned.map(({ label }) => label)).toEqual(["a"]);
    expect(meaningExamples227[0].answer).toBe("(a) neden-sonuç, (b) amaç, (c) koşul. Limana döndüğü kesin olarak yalnız (a) cümlesinde bildirilir.");
    const comparisons = pathSents227.filter(({ sentence }) => /patikasından .*daha/.test(sentence)).map(({ label }) => label);
    const subjective = pathSents227.filter(({ measurable }) => !measurable).map(({ label }) => label);
    expect(comparisons).toEqual(["I", "II"]);
    expect(subjective).toEqual(["II", "III"]);
    expect(meaningExamples227[1].answer).toBe("Karşılaştırma: I ve II. Öznel: II ve III. Nesnel: I.");
  });

  it("recomputes the structure rows and the giriş examples", () => {
    expect(depsOk(structSents227)).toBe(true);
    const roles = structSents227.map((s, i) => (s.deps.length === 0 ? "Giriş" : i === structSents227.length - 1 && /^Böylece/.test(s.text) ? "Sonuç" : "Gelişme"));
    expect(roles).toEqual(["Giriş", "Gelişme", "Gelişme", "Gelişme", "Gelişme", "Sonuç"]);
    expect(structureSupplement227.table.rows.map((r) => r[2])).toEqual(roles);
    expect(structureSupplement227.table.rows.map((r) => r[0])).toEqual(R);
    expect(lostIfRemoved(structSents227, 0)).toEqual([1]);
    const letters = ["A", "B", "C", "D", "E", "F"];
    const independent = shuffle227.flatMap((orig, k) => (structSents227[orig].deps.length ? [] : [letters[k]]));
    expect(independent).toEqual(["C"]);
    expect(structureExamples227[0].answer).toBe(`C cümlesi: “${structSents227[0].text}”`);
    expect(birdTail227[0].text.startsWith("Bu yüzden")).toBe(true);
    expect(openers227.every(({ text }) => !/^(Bu|Böylece|Örneğin)/.test(text))).toBe(true);
    expect(birdFits227.map(({ label }) => label)).toEqual(["X"]);
    expect(structureExamples227[1].answer).toBe(`X) “${openers227[0].text}”`);
  });

  it("recomputes the idea network, claim verdicts and the yardımcı düşünce answer", () => {
    expect(depsOk(ideaSents227)).toBe(true);
    const roots = ideaSents227.flatMap((s, i) => (s.supports === null ? [i] : []));
    expect(roots).toEqual([0]);
    expect(ideaSupplement227.table.rows.map((r) => r[2])).toEqual(["Ana düşünce", "Yardımcı düşünce", "Yardımcı düşünce", "Yardımcı düşünce", "Yardımcı düşünce"]);
    expect(ideaSupplement227.table.rows.map((r) => r[3])).toEqual(["ana yargı", "örnek", "gerekçe", "sınırlama", "örnek"]);
    const text = ideaSents227.map(({ text: t }) => t).join(" ").toLocaleLowerCase("tr-TR");
    for (const c of ideaClaims227) {
      if (c.evidence === null) expect(text).not.toContain(c.key.toLocaleLowerCase("tr-TR"));
      else expect(ideaSents227[c.evidence].text).toContain(c.key);
    }
    expect(ideaClaims227.filter(({ evidence }) => evidence === null).map(({ label }) => label)).toEqual(["C"]);
    expect(ideaExamples227[0].answer.startsWith("C) ")).toBe(true);
    expect(ideaExamples227[0].answer).toContain("belirlenemez");
    const walkRoot = walkSents227.findIndex(({ supports }) => supports === null);
    expect(walkRoot).toBe(walkSents227.length - 1);
    const helper = walkOptions227.filter((o) => o.evidence !== null && o.evidence !== walkRoot && walkSents227[o.evidence].text.includes(o.key));
    expect(helper.map(({ label }) => label)).toEqual(["B"]);
    expect(ideaExamples227[1].answer).toBe(`B) ${walkOptions227[1].text}`);
  });

  it("recomputes the split table and both split examples", () => {
    for (const s of [cactusSents227, seedSents227, breadSents227]) expect(depsOk(s)).toBe(true);
    expect(goodSplits(cactusSents227)).toEqual([3]);
    expect(splitSupplement227.table.rows.map((r) => r[4])).toEqual(["1. paragraf", "1. paragraf", "1. paragraf", "2. paragraf başlar", "2. paragraf", "2. paragraf"]);
    expect(splitSupplement227.table.rows.map((r) => r[2])).toEqual(cactusSents227.map(({ focus }) => focus));
    expect(goodSplits(seedSents227)).toEqual([3]);
    expect(seedSents227.filter(({ time }) => time).length).toBe(3);
    expect(splitExamples227[0].answer.startsWith("IV. cümle")).toBe(true);
    expect(goodSplits(breadSents227)).toEqual([4]);
    expect(splitExamples227[1].answer.startsWith("V. cümle.")).toBe(true);
    expect(splitExamples227[1].answer).toContain("“Hamurun kabarması”");
    expect(splitExamples227[1].answer).toContain("“Bu renk değişimi”");
  });

  it("recomputes the flow table and both akışı bozan examples", () => {
    for (const s of [chainSents227, beeSents227, glassSents227]) expect(depsOk(s)).toBe(true);
    expect(breakers(chainSents227)).toEqual([3]);
    expect(chainSents227.filter(({ focus }) => focus === chainSents227[3].focus)).toHaveLength(1);
    const trials = flowSupplement227.table.rows.map((r) => r[4]);
    expect(trials[3]).toBe("çıkarılınca III ile V komşu olur; öncülsüz söz kalmaz");
    expect(lostIfRemoved(chainSents227, 2)).toEqual([4]);
    expect(trials[2]).toBe("çıkarılınca V. cümledeki “Silinen zincire” öncülsüz kalır");
    expect(lostIfRemoved(chainSents227, 5)).toEqual([]);
    expect(trials[5]).toBe("çıkarılınca gerekli sınırlama kaybolur");
    expect(flowSupplement227.table.rows[3][2].startsWith("yok: ")).toBe(true);
    expect(breakers(beeSents227)).toEqual([3]);
    expect(flowExamples227[0].answer).toBe(`IV. cümle: “${beeSents227[3].text}”`);
    expect(breakers(glassSents227)).toEqual([3]);
    expect(lostIfRemoved(glassSents227, 1)).toEqual([2]);
    expect(flowExamples227[1].answer).toBe(`IV. cümle: “${glassSents227[3].text}”`);
  });

  it("figure steps follow the data", () => {
    const meaning = depthFigures227["cumlede-anlam"][meaningSupplement227.title];
    expect(meaning.steps).toEqual(meaningRows227.map(({ relation }) => relation));
    expect(meaning.draw(0, 0).readout![1]).toContain("amaç");
    const split = depthFigures227["ikiye-bolme"][splitSupplement227.title];
    expect(split.steps).toEqual(["Tam metin", "III. cümleden önce", "IV. cümleden önce", "V. cümleden önce"]);
    expect(split.draw(0, 2).readout![0].startsWith("Geçerli sınır")).toBe(true);
    expect(split.draw(0, 1).readout![0].startsWith("Geçersiz sınır")).toBe(true);
    expect(split.draw(0, 3).readout![0].startsWith("Geçersiz sınır")).toBe(true);
    const flow = depthFigures227["akisi-bozan-cumle"][flowSupplement227.title];
    expect(flow.steps).toEqual(["Roller", "IV çıkarılırsa", "III çıkarılırsa", "VI çıkarılırsa"]);
    expect(flow.draw(0, 1).readout![0]).toContain("komşu olur");
    expect(flow.draw(0, 2).readout![0]).toContain("öncülsüz kalır");
  });
});
