import { describe, expect, it } from "vitest";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { lessonTopic } from "../src/domain/studyPlan";
import { theorySupplements } from "../src/learning/theorySupplements";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import {
  beingExamples230, beingProbe230, beingRows230, beingSupplement230, cardArgument230, consistencyPairs230, gorgiasProbe230,
  inferenceChecked230, inferenceExamples230, inferenceSupplement230, knowExamples230, knowProbe230, knowRows230, knowSupplement230,
  leafClaims230, lightDoor230, mirageDebate230, scienceExamples230, scienceProbe230, scienceRows230, scienceSupplement230,
  swanSteps230, traitExamples230, traitProbe230, traitRows230, traitSupplement230, traitVerdicts230, type Model230,
} from "../src/learning/depth230";

const lessons230 = {
  "felsefeyi-tanima": [traitSupplement230, traitExamples230],
  "felsefe-ile-dusunme": [inferenceSupplement230, inferenceExamples230],
  "varlik-felsefesi": [beingSupplement230, beingExamples230],
  "bilgi-felsefesi": [knowSupplement230, knowExamples230],
  "bilim-felsefesi": [scienceSupplement230, scienceExamples230],
} as const;
const rawText = (id: string) => JSON.stringify(lessonGuides.get(id));

describe("TYT Felsefe depth 0.230", () => {
  it("appends a table section, a figure and two examples without touching the raw guide", () => {
    for (const [id, [added, examples]] of Object.entries(lessons230)) {
      expect(sectionFigureGuideIds, id).toContain(id);
      const raw = lessonGuides.get(id)!;
      const shown = studyGuide(id)!;
      expect(raw.sections.some(({ title }) => title === added.title), id).toBe(false);
      expect(raw.examples.some(({ title }) => examples.some((e) => e.title === title)), id).toBe(false);
      expect(shown.sections.slice(0, raw.sections.length).map(({ title }) => title)).toEqual(raw.sections.map(({ title }) => title));
      expect(shown.sections.slice(0, raw.sections.length).map(({ paragraphs }) => paragraphs)).toEqual(raw.sections.map(({ paragraphs }) => paragraphs));
      const appended = (theorySupplements[id] ?? []).filter((s) => s.appendSection).length;
      expect(shown.sections).toHaveLength(raw.sections.length + appended);
      expect(shown.sections.filter(({ table }) => table === added.table)).toHaveLength(1);
      const last = shown.sections.at(-1)!;
      expect(last.title).toBe(added.title);
      expect(last.figureTitle).toBe(added.title);
      expect(added.figureTitle).toBe(added.title);
      expect(last.paragraphs).toEqual(added.paragraphs);
      expect(last.table?.layout).toBe("table");
      expect(last.table!.rows.length).toBeGreaterThanOrEqual(5);
      expect(last.table!.rows.length).toBeLessThanOrEqual(8);
      expect(last.table!.headers.length).toBeLessThanOrEqual(5);
      expect(last.table!.rows.every((row) => row.length === last.table!.headers.length)).toBe(true);
      expect(shown.examples.slice(-2)).toEqual(examples);
      expect(shown.examples.slice(0, raw.examples.length)).toEqual(raw.examples);
      expect(shown.examples).toHaveLength(raw.examples.length + (theorySupplements[id] ?? []).reduce((n, s) => n + (s.examples?.length ?? 0), 0));
      expect(theorySupplements[id]!.at(-1)).toBe(added);
      const sheet = studyCheatSheet(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      const sheetSection = sheet.sections.at(-1)!;
      expect(sheetSection.title).toBe(added.title);
      expect(sheetSection.table).toBe(last.table);
      expect(sheetSection.text).toEqual([added.summary]);
      expect(sheetSection.figureTitle).toBe(added.figureTitle);
      expect(JSON.stringify(sheet)).toContain(added.table.rows[0][0]);
      expect(sheet.examples.slice(-2).map(({ title }) => title)).toEqual(examples.map(({ title }) => title));
      expect(sheet.cautions.slice(-2)).toEqual(examples.map(({ pitfall }) => pitfall));
      for (const example of examples) {
        expect(example.steps.length).toBeGreaterThanOrEqual(3);
        for (const field of [example.title, example.prompt, example.strategy, example.answer, example.check, example.pitfall]) expect(field.trim().length).toBeGreaterThan(10);
        expect(JSON.stringify(example)).not.toMatch(/ÖSYM|resmî sınav|resmi sınav/i);
        expect(JSON.stringify(example)).not.toMatch(/undefined|\bNaN\b|Infinity|\[object/);
      }
      expect(JSON.stringify(added)).not.toMatch(/undefined|NaN|Infinity|\[object|\.\.(?!\.)/);
      expect(JSON.stringify([added.paragraphs, added.summary, added.table])).not.toMatch(/\b(the|and|yes|true|false|valid)\b/i);
      // No dates: the lessons' historical framing is not extended.
      expect(JSON.stringify(added)).not.toMatch(/\b1[0-9]{3}\b|yüzyıl|M\.Ö\.|MÖ/);
      const figure = sectionFigures[id]?.[added.title];
      expect(figure, id).toBeDefined();
      expect(figure!.steps!.length).toBeGreaterThanOrEqual(5);
      for (let step = 0; step < figure!.steps!.length; step++) {
        const frame = figure!.draw(0, step);
        expect(JSON.stringify(frame)).not.toMatch(/\bNaN\b|Infinity|null|undefined/);
        expect(frame.readout!.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("keeps the earlier felsefeyi-tanima supplement in front and adds the others fresh", () => {
    expect(theorySupplements["felsefeyi-tanima"]!.map(({ title }) => title)).toEqual(["Aynı toplamı iki dağıtım ilkesiyle karşılaştır", traitSupplement230.title]);
    expect(theorySupplements["felsefe-ile-dusunme"]).toEqual([inferenceSupplement230]);
    expect(theorySupplements["varlik-felsefesi"]).toEqual([beingSupplement230]);
    expect(theorySupplements["bilgi-felsefesi"]).toEqual([knowSupplement230]);
    expect(theorySupplements["bilim-felsefesi"]).toEqual([scienceSupplement230]);
  });

  it("uses the lesson's own trait names and recomputes every verdict", () => {
    const lesson = rawText("felsefeyi-tanima");
    for (const word of ["Kuşku", "Eleştiri", "Rasyonel", "Tutarlılı", "Sistemli", "Refleksiyon", "Evrensellik", "yığılımlı gelişme"]) expect(lesson).toContain(word);
    expect(traitRows230.map((t) => t.trait)).toEqual(["Kuşku ve sorgulama", "Eleştiri", "Rasyonellik", "Tutarlılık", "Sistemlilik", "Refleksiyon", "Evrensellik", "Yığılımlı gelişme"]);
    // Independent conflict check: same condition, shared member, different value.
    const clash = (js: readonly { members: readonly string[]; condition: string; value: string }[]) =>
      js.some((a, i) => js.some((b, j) => j > i && a.condition === b.condition && a.value !== b.value && a.members.some((m) => b.members.includes(m))));
    const expected = traitRows230.map((t) => {
      const ms = new Set<string>(t.marks);
      if (t.judgments && clash(t.judgments)) ms.add("ayniKosulKarsit");
      return t.need.every((m) => ms.has(m)) && t.bad.every((m) => !ms.has(m));
    });
    expect(expected).toEqual([true, false, false, false, true, true, true, true]);
    expect(traitVerdicts230.map((t) => t.fit)).toEqual(expected);
    expect(traitSupplement230.table.rows.map((r) => r[3])).toEqual(expected.map((b) => (b ? "Evet" : "Hayır")));
    expect(traitSupplement230.table.rows.map((r) => r[0])).toEqual(traitRows230.map((t) => t.trait));
    // Examples.
    expect(traitProbe230.map((p) => p.traits)).toEqual([["Refleksiyon"], ["Eleştiri"], ["Yığılımlı gelişme"]]);
    expect(traitExamples230[0].answer).toBe("A: Refleksiyon; B: Eleştiri; C: Yığılımlı gelişme.");
    expect(consistencyPairs230.map((p) => clash(p.judgments))).toEqual([false, true]);
    expect(consistencyPairs230.map((p) => p.conflict)).toEqual([false, true]);
    expect(traitExamples230[1].answer).toMatch(/^2\. çift tutarsızdır\. 1\. çift tutarlıdır/);
  });

  it("checks every inference form with an independent evaluator", () => {
    type M = Model230;
    const has = (m: M, n: string, p: string) => m.items[m.names[n]].includes(p);
    const every = (m: M, a: string, b: string) => m.items.every((it) => !it.includes(a) || it.includes(b));
    const imp = (a: boolean, b: boolean) => !a || b;
    const forms: [(m: M) => boolean, (m: M) => boolean][] = [
      [(m) => every(m, "A", "B") && has(m, "X", "A"), (m) => has(m, "X", "B")],
      [(m) => every(m, "A", "B") && has(m, "X", "B"), (m) => has(m, "X", "A")],
      [(m) => imp(m.atoms.P, m.atoms.Q) && m.atoms.P, (m) => m.atoms.Q],
      [(m) => imp(m.atoms.P, m.atoms.Q) && m.atoms.Q, (m) => m.atoms.P],
      [(m) => imp(m.atoms.P, m.atoms.Q) && !m.atoms.Q, (m) => !m.atoms.P],
      [(m) => imp(m.atoms.P, m.atoms.Q) && !m.atoms.P, (m) => !m.atoms.Q],
      [(m) => every(m, "O", "A") && every(m, "O", "B") && has(m, "X", "O"), (m) => every(m, "A", "B")],
      [(m) => has(m, "X", "F") && has(m, "Y", "F") && has(m, "X", "G"), (m) => has(m, "Y", "G")],
    ];
    // Propositional forms: full truth table.
    for (const i of [2, 3, 4, 5]) {
      const [pr, co] = forms[i];
      const bad = [true, false].flatMap((P) => [true, false].map((Q) => ({ atoms: { P, Q }, items: [], names: {} }))).filter((m) => pr(m) && !co(m));
      expect(inferenceChecked230[i].valid, inferenceChecked230[i].form).toBe(bad.length === 0);
    }
    expect(inferenceChecked230.map((r) => r.valid)).toEqual([true, false, true, false, true, false, false, false]);
    expect(inferenceChecked230.map((r) => r.kind)).toEqual(["Tümdengelim", "Tümdengelim", "Tümdengelim", "Tümdengelim", "Tümdengelim", "Tümdengelim", "Tümevarım", "Analoji"]);
    // Every countermodel the module found really keeps the premises and breaks the conclusion.
    inferenceChecked230.forEach((r, i) => {
      if (r.valid) return;
      const [pr, co] = forms[i];
      expect(pr(r.countermodel!), r.form).toBe(true);
      expect(co(r.countermodel!), r.form).toBe(false);
    });
    // Form 1 (valid, monadic): no model of size ≤ 2 breaks it.
    const preds = ["A", "B"];
    const sets = [[], ["A"], ["B"], ["A", "B"]];
    for (const a of sets) for (const b of sets) for (const x of [0, 1]) {
      const m: M = { atoms: {}, items: [a, b], names: { X: x } };
      expect(imp(forms[0][0](m), forms[0][1](m))).toBe(true);
    }
    expect(preds.length).toBe(2);
    expect(inferenceSupplement230.table.rows.map((r) => r[2])).toEqual(["Hayır", "Evet", "Hayır", "Evet", "Hayır", "Evet", "Evet", "Evet"]);
    expect(inferenceSupplement230.table.rows[3][3]).toBe("P yanlış, Q doğru");
    expect(inferenceSupplement230.table.rows[7][3]).toBe("X: F evet, G evet; Y: F evet, G hayır");
    // Examples.
    const deniz = cardArgument230.countermodel!;
    expect(cardArgument230.valid).toBe(false);
    expect(has(deniz, "Deniz", "kart") && !has(deniz, "Deniz", "üye")).toBe(true);
    expect(lightDoor230.valid).toBe(true);
    expect(lightDoor230.rows.filter((r) => imp(r.p, r.q) && !r.q).map((r) => [r.p, r.q, !r.p])).toEqual([[false, false, true]]);
    expect(inferenceExamples230[0].answer).toMatch(/^Hayır\. Çıkarım geçersizdir/);
    expect(inferenceExamples230[1].answer).toMatch(/^Evet, sonuç zorunludur/);
    expect(rawText("felsefe-ile-dusunme")).toMatch(/Tümdengelim|tümdengelim/);
    expect(rawText("felsefe-ile-dusunme")).toContain("Analoji");
  });

  it("maps varlık questions, approaches and thinkers exactly as the lesson does", () => {
    const lesson = rawText("varlik-felsefesi");
    for (const r of beingRows230) {
      for (const n of r.names) expect(lesson, n).toContain(n);
      for (const b of r.bases ?? []) expect(lesson, b).toContain(b);
    }
    for (const term of ["Monizm", "Düalizm", "plüralizm", "Materyalizm", "Gorgias", "Herakleitos", "Whitehead", "Fârâbî", "Hegel", "Platon"]) expect(lesson).toContain(term);
    const byCount = (n: number) => ({ 1: "Monizm", 2: "Düalizm" } as Record<number, string>)[n] ?? "Plüralizm";
    for (const r of beingRows230.filter((x) => x.bases)) expect(r.approach).toBe(byCount(r.bases!.length));
    expect(beingRows230.map((r) => [r.approach, r.names.join(", ")])).toEqual([
      ["Gorgias’a atfedilen üç sav", "Gorgias"], ["Monizm", "Thales"], ["Düalizm", "Descartes"], ["Plüralizm", "Empedokles"],
      ["Materyalizm", "Demokritos, Hobbes, Marx"], ["İdealar", "Platon"], ["Düşünsel temel", "Fârâbî, Hegel"], ["Oluş ve süreç", "Herakleitos, Whitehead"],
    ]);
    expect(beingSupplement230.table.rows.map((r) => r[2])).toEqual(beingRows230.map((r) => r.names.join(", ")));
    // Example 1: two axes.
    expect(beingProbe230.map((p) => [p.quantity, p.quality])).toEqual([["Monizm", "Materyalizm"], ["Düalizm", ""], ["Monizm", "Düşünsel temel"]]);
    expect(beingProbe230.map((p) => byCount(p.bases.length))).toEqual(beingProbe230.map((p) => p.quantity));
    expect(beingExamples230[0].answer).toBe("A: Monizm ve materyalizm; B: Düalizm (temeller maddi ve düşünsel türden); C: Monizm ve düşünsel temel.");
    // Example 2: only the first Gorgias stage denies being.
    expect(gorgiasProbe230.filter((p) => p.deniesBeing).map((p) => p.key)).toEqual(["K3"]);
    expect(beingExamples230[1].answer).toBe("K1: aktarım; K2: bilginin imkânı; K3: varlığın imkânı. Yalnız K3 varlığı reddeder.");
  });

  it("maps bilgi approaches and thinkers exactly as the lesson does", () => {
    const lesson = rawText("bilgi-felsefesi");
    for (const r of knowRows230) for (const n of r.names) expect(lesson, n).toContain(n);
    for (const term of ["Kuşkucu", "Akılcılık", "Rasyonalizm", "Deneyimcilik", "Empirizm", "eleştirel yaklaş", "Sezgici", "Pozitivizm", "Fenomenoloji", "Pragmati", "Dogmatizm"]) expect(lesson).toContain(term);
    expect(knowRows230.map((r) => [r.approach, r.names.join(", ")])).toEqual([
      ["Kuşkucu yaklaşımlar", ""], ["Akılcılık (rasyonalizm)", "Sokrates, Platon, Descartes, Hegel"], ["Deneyimcilik (empirizm)", "Locke, Hume"],
      ["Eleştirel yaklaşım", "Kant"], ["Sezgicilik", "Bergson, Gazâlî"], ["Pozitivizm", "Comte"], ["Fenomenoloji", "Husserl"], ["Pragmatizm", "William James, John Dewey"],
    ]);
    expect(knowSupplement230.table.rows.map((r) => r[1])).toEqual(["Kesinlik sorgulanır", "Evet", "Evet", "Evet", "Evet", "Evet", "Evet", "Evet"]);
    expect(knowSupplement230.table.rows[0][3]).toBe("Derste ad verilmez");
    expect(knowSupplement230.table.rows[3][2]).toBe("deneyim + akıl");
    // Descartes uses doubt as a method; he is not in the sceptic row.
    expect(knowRows230[0].names).not.toContain("Descartes");
    // Examples: independent source-set lookup.
    const bySet = (ss: readonly string[]) => knowRows230.filter((r) => r.possible && r.sources.length === ss.length && ss.every((s) => (r.sources as readonly string[]).includes(s))).map((r) => r.approach);
    for (const p of knowProbe230) expect(bySet(p.sources)).toEqual([p.row.approach]);
    expect(knowExamples230[0].answer).toBe("a: Akılcılık (rasyonalizm); b: Deneyimcilik (empirizm); c: Eleştirel yaklaşım; d: Sezgicilik.");
    expect(mirageDebate230.map((p) => p.row.approach)).toEqual(["Kuşkucu yaklaşımlar", "Akılcılık (rasyonalizm)"]);
    expect(knowExamples230[1].answer).toBe("Birinci kişi: kuşkucu yaklaşımlar; İkinci kişi: akılcılık (rasyonalizm).");
  });

  it("maps bilim approaches as the lesson does and recomputes the swan and leaf data", () => {
    const lesson = rawText("bilim-felsefesi");
    for (const r of scienceRows230) for (const n of r.names) expect(lesson, n).toContain(n);
    for (const term of ["Tümevarım", "Doğrulanabilirlik", "Yanlışlanabilirlik", "paradigma", "Ürün olarak bilim", "Etkinlik olarak bilim"]) expect(lesson.toLocaleLowerCase("tr-TR")).toContain(term.toLocaleLowerCase("tr-TR"));
    expect(lesson).toMatch(/Popper ile ilişkilendirilen yanlışlanabilirlik/);
    expect(lesson).toMatch(/Kuhn, bilimsel toplulukların paylaştığı problem çözme çerçevesini paradigma/);
    expect(scienceRows230.map((r) => [r.approach, r.names.join(", ")])).toEqual([
      ["Tümevarımla genelleme", ""], ["Doğrulanabilirlik (mantıkçı pozitivizm)", ""], ["Yanlışlanabilirlik", "Popper"], ["Paradigma", "Kuhn"],
      ["Ürün olarak bilim", "Reichenbach, Carnap, Hempel"], ["Etkinlik olarak bilim", "Kuhn, Toulmin"],
    ]);
    // Swans: independent status.
    const obs = ["beyaz", "beyaz", "beyaz", "beyaz", "beyaz", "siyah"];
    expect(swanSteps230.map((s) => s.status)).toEqual(obs.map((_, i) => (obs.slice(0, i + 1).includes("siyah") ? "bağdaşmaz" : "uyumlu, kesin değil")));
    expect(swanSteps230.map((s) => s.white)).toEqual([1, 2, 3, 4, 5, 5]);
    // Leaves: forbidden outcomes recomputed.
    const all = ["yeşil", "sarı", "kahverengi"];
    expect(leafClaims230.map((c) => all.filter((o) => !(c.allows as readonly string[]).includes(o)).length)).toEqual([2, 1, 0]);
    expect(leafClaims230.map((c) => c.falsifiable)).toEqual([true, true, false]);
    expect(leafClaims230.filter((c) => !(c.allows as readonly string[]).includes("sarı")).map((c) => c.key)).toEqual(["S1"]);
    expect(scienceExamples230[1].answer).toBe("S1 ve S2 yanlışlanabilir; S1 2 sonucu dışarıda bıraktığı için en çok risk alır. Sarı yaprak yalnız S1 ile uyuşmaz.");
    expect(scienceProbe230.map((p) => p.row.approach)).toEqual(["Yanlışlanabilirlik", "Paradigma", "Ürün olarak bilim", "Doğrulanabilirlik (mantıkçı pozitivizm)"]);
    expect(scienceExamples230[0].answer).toBe("a: Yanlışlanabilirlik; b: Paradigma; c: Ürün olarak bilim; d: Doğrulanabilirlik (mantıkçı pozitivizm).");
    expect(sectionFigures["bilim-felsefesi"][scienceSupplement230.title].steps).toHaveLength(obs.length);
  });
});
