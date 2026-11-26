import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide, studyGuideWithSourceRevisions } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { depthFigures229 } from "../src/learning/sectionFigures/depthFigures229";
import {
  bakeryRows229, bikeIns229, blankExamples229, blankSupplement229, compostIns229, harborUnits229, humidBlank229, insertExamples229,
  insertSupplement229, lampBlank229, libraryChoices229, libraryUnits229, modeExamples229, modeSupplement229, orderExamples229,
  orderSupplement229, rampBlank229, roomSents229, scanIns229, swapCandidates229, swapSents229, tankSents229,
  type Blank229, type Insertion229, type Sent229, type Unit229,
} from "../src/learning/depth229";

const lessons229 = {
  "paragrafta-siralama": [orderSupplement229, orderExamples229],
  "paragrafta-cumle-ekleme": [insertSupplement229, insertExamples229],
  "paragrafta-bosluk-doldurma": [blankSupplement229, blankExamples229],
  "paragrafta-anlatim-bicimleri": [modeSupplement229, modeExamples229],
} as const;

/* ---------- Bağımsız denetleyici (modülün fonksiyonlarını kullanmaz) ---------- */

/** i. cümlenin bütün bağları karşılanıyor mu? Komşu bağ tam önceki cümleye, öbürü herhangi bir önceki cümleye bakar. */
function ok(seq: readonly Sent229[], i: number): boolean {
  for (const n of seq[i].needs) {
    if (n.adjacent) {
      if (i === 0 || !seq[i - 1].intro.includes(n.tag)) return false;
    } else {
      let found = false;
      for (let j = 0; j < i; j++) if (seq[j].intro.includes(n.tag)) found = true;
      if (!found) return false;
    }
  }
  return true;
}
const allOk = (seq: readonly Sent229[]) => seq.every((_, i) => ok(seq, i));
function perms<T>(xs: T[]): T[][] {
  const out: T[][] = [];
  const go = (rest: T[], acc: T[]) => {
    if (!rest.length) out.push(acc);
    rest.forEach((x, i) => go(rest.filter((_, j) => j !== i), [...acc, x]));
  };
  go(xs, []);
  return out;
}
const ids = (seq: readonly Sent229[]) => seq.map((s) => s.id).join("-");
const insertAt = (ins: Insertion229, k: number) => [...ins.base.slice(0, k), ins.x, ...ins.base.slice(k)];
const fitsInsertion = (ins: Insertion229) => Array.from({ length: ins.base.length + 1 }, (_, k) => allOk(insertAt(ins, k)));
const fitsBlank = (b: Blank229) =>
  b.options.map((o) => allOk([...b.before, o, ...b.after]) && (!b.frame || (o.fn === b.frame.fn && o.of === b.frame.of)));
/** Elle yazılmış ikinci sınıflayıcı: önce sav + gerekçe, sonra olay zinciri, sonra nitelik/bilgi çoğunluğu. */
function classify(units: readonly Unit229[]): string {
  const n = (f: string) => units.filter((u) => u.fn === f).length;
  if (n("sav") && n("gerekçe")) return "tartışmacı anlatım";
  if (n("olay") > 1) return "öyküleyici anlatım";
  return n("nitelik") > n("bilgi") ? "betimleyici anlatım" : "açıklayıcı anlatım";
}

describe("TYT Türkçe paragraf derinleştirmesi 0.229.0", () => {
  it("appends a table section, a figure and two examples without touching the accepted guides", () => {
    for (const [id, [added, examples]] of Object.entries(lessons229)) {
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
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|NaN|\[object/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|null|\[object/);
      expect(sectionFigureGuideIds.has(id)).toBe(true);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBe(depthFigures229[id][added.title]);
      for (let step = 0; step < (figure!.steps?.length ?? 1); step++) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout!.length).toBeGreaterThan(0);
      }
      expect(Object.keys(sectionFigures[id]).length).toBeGreaterThan(1);
    }
  });

  it("keeps every example passage inside its own card", () => {
    const passages: [string, readonly { text: string }[]][] = [
      [orderExamples229[0].prompt, roomSents229],
      [orderExamples229[1].prompt, swapSents229],
      [insertExamples229[0].prompt, [...compostIns229.base, compostIns229.x]],
      [insertExamples229[1].prompt, [...scanIns229.base, scanIns229.x]],
      [blankExamples229[0].prompt, [...rampBlank229.before, ...rampBlank229.after, ...rampBlank229.options]],
      [blankExamples229[1].prompt, [...humidBlank229.before, ...humidBlank229.after, ...humidBlank229.options]],
      [modeExamples229[0].prompt, harborUnits229],
      [modeExamples229[1].prompt, libraryUnits229],
    ];
    for (const [prompt, sents] of passages) for (const { text } of sents) expect(prompt).toContain(text);
    // Bölüm parçaları da kendi paragraflarında tamdır.
    for (const s of tankSents229) expect(orderSupplement229.paragraphs[0]).toContain(s.text);
    for (const s of [...bikeIns229.base, bikeIns229.x]) expect(insertSupplement229.paragraphs[0]).toContain(s.text);
    for (const s of [...lampBlank229.before, ...lampBlank229.after]) expect(blankSupplement229.paragraphs[0]).toContain(s.text);
  });

  it("sıralama: brute-forces every permutation and recomputes the table", () => {
    const all = perms([...tankSents229]);
    expect(all).toHaveLength(120);
    const valid = all.filter(allOk);
    expect(valid.map(ids)).toEqual(["D-B-E-A-C"]);
    // Kısıtlar çözüm sırasıyla eklenir.
    const order = valid[0];
    const counts = order.map((_, k) => {
      const active = new Set(order.slice(0, k + 1).map((s) => s.id));
      return all.filter((seq) => seq.every((s, i) => !active.has(s.id) || ok(seq, i))).length;
    });
    expect(counts).toEqual([120, 60, 20, 4, 1]);
    const rows = orderSupplement229.table.rows;
    expect(rows.map((r) => r[0].slice(0, 1))).toEqual(order.map((s) => s.id));
    expect(rows.map((r) => r[3])).toEqual(counts.map(String));
    order.forEach((s, i) => {
      expect(rows[i][0]).toBe(`${s.id}: ${s.text}`);
      if (!s.needs.length) expect(rows[i][2]).toBe("giriş adayı: öncül istemez");
      for (const n of s.needs) {
        const provider = tankSents229.filter((t) => t.intro.includes(n.tag));
        expect(provider).toHaveLength(1);
        expect(rows[i][2]).toContain(`${provider[0].id} cümlesinden ${n.adjacent ? "hemen sonra" : "sonra"}`);
      }
    });
    expect(orderSupplement229.paragraphs[2]).toContain("120 → 60 → 20 → 4 → 1");
    // Örnek 1: üçüncü cümle.
    const room = perms([...roomSents229]).filter(allOk);
    expect(room.map(ids)).toEqual(["II-V-IV-I-III"]);
    expect(orderExamples229[0].answer).toContain(`Baştan 3. cümle ${room[0][2].id} olur`);
    // Örnek 2: iki aday, ilk kopan bağ.
    const swap = perms([...swapSents229]).filter(allOk);
    expect(swap.map(ids)).toEqual(["III-V-I-IV-II"]);
    expect(swapCandidates229.map(allOk)).toEqual([false, true]);
    const bad = swapCandidates229[0];
    const firstBad = bad.findIndex((_, i) => !ok(bad, i));
    expect([firstBad, bad[firstBad].id]).toEqual([2, "IV"]);
    expect(orderExamples229[1].answer).toBe("Sıra 2 doğrudur. Öbür sırada 3. cümle IV’ün “Bu yüzden” bağı kopar.");
  });

  it("cümle ekleme: tries every insertion point and recomputes the table", () => {
    const bike = fitsInsertion(bikeIns229);
    expect(bike).toEqual([false, false, true, false, false]);
    const rows = insertSupplement229.table.rows;
    expect(rows.map((r) => r[3])).toEqual(bike.map((f) => (f ? "uyar" : "uymaz")));
    // Sol bağ sütunu: X'in her ihtiyacı o konumda ayrı sınanır.
    bike.forEach((_, k) => {
      const seq = insertAt(bikeIns229, k);
      for (const n of bikeIns229.x.needs) {
        const met = n.adjacent ? k > 0 && seq[k - 1].intro.includes(n.tag) : seq.slice(0, k).some((s) => s.intro.includes(n.tag));
        expect(rows[k][1]).toContain(`“${n.clue}” ${met ? "karşılanır" : "kopar"}`);
      }
      const restOk = seq.every((_, i) => i === k || ok(seq, i));
      expect(rows[k][2].includes("öncülsüz")).toBe(!restOk);
    });
    // Eklemeden önce metin tek noktada kopuktur.
    expect(bikeIns229.base.map((_, i) => ok(bikeIns229.base, i))).toEqual([true, true, false, true]);
    expect(fitsInsertion(compostIns229)).toEqual([false, false, true, false, false]);
    expect(insertExamples229[0].answer).toBe("III numaralı yere getirilmelidir.");
    expect(fitsInsertion(scanIns229)).toEqual([false, false, false, true, false]);
    expect(insertExamples229[1].answer).toBe("III. cümleden sonra eklenmelidir.");
  });

  it("boşluk doldurma: tests every option on both sides and recomputes the table", () => {
    const lamp = fitsBlank(lampBlank229);
    expect(lamp).toEqual([true, false, false, false, false]);
    const rows = blankSupplement229.table.rows;
    expect(rows.map((r) => r[3])).toEqual(lamp.map((f) => (f ? "uyar" : "uymaz")));
    lampBlank229.options.forEach((o, i) => {
      expect(rows[i][0]).toBe(`${o.id}) ${o.text}`);
      const seq = [...lampBlank229.before, o, ...lampBlank229.after];
      const k = lampBlank229.before.length;
      expect(rows[i][1].includes("karşılanır")).toBe(ok(seq, k));
      expect(rows[i][2].includes("karşılanır")).toBe(ok(seq, k + 1));
    });
    expect(fitsBlank(rampBlank229)).toEqual([true, false, false, false, false]);
    expect(fitsBlank(humidBlank229)).toEqual([true, false, false, false, false]);
    expect(blankExamples229.map((e) => e.answer)).toEqual(["A seçeneği getirilmelidir.", "A seçeneği getirilmelidir."]);
    // Çerçeve sözcüğü tek başına yetmez: işlevi taşıyan birden çok seçenek var.
    for (const b of [rampBlank229, humidBlank229]) expect(b.options.filter((o) => o.fn === b.frame!.fn && o.of === b.frame!.of).length).toBeGreaterThan(1);
  });

  it("anlatım biçimleri: reclassifies each row and example with an independent rule", () => {
    const rows = modeSupplement229.table.rows;
    expect(rows.map((r) => r[0])).toEqual(["Öyküleyici anlatım", "Betimleyici anlatım", "Açıklayıcı anlatım", "Tartışmacı anlatım"]);
    bakeryRows229.forEach((r, i) => {
      expect(classify(r.units)).toBe(r.mode);
      expect(rows[i][0].toLocaleLowerCase("tr-TR")).toBe(classify(r.units));
      expect(rows[i][4]).toBe(r.units.map((u) => u.text).join(" "));
      expect(rows[i][4]).toMatch(/fırın|ekmek|Hamur|Fırın/);
    });
    expect(classify(harborUnits229)).toBe("öyküleyici anlatım");
    expect([...new Set(harborUnits229.map((u) => u.fn))]).toEqual(["nitelik", "olay"]);
    expect(modeExamples229[0].answer).toBe("Kullanılan: betimleyici anlatım ve öyküleyici anlatım. Ağır basan: öyküleyici anlatım.");
    expect(classify(libraryUnits229)).toBe("tartışmacı anlatım");
    const used = libraryUnits229.map((u) => u.way).filter(Boolean);
    const missing = libraryChoices229.filter((w) => !used.includes(w));
    expect(missing).toEqual(["benzetme"]);
    expect(modeExamples229[1].answer).toBe("Ağır basan tartışmacı anlatım. Başvurulmayan yol: benzetme.");
    expect(modeExamples229[1].prompt).toContain("ortalama 35 kişi");
  });
});
