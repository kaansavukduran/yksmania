import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
const mock = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: mock.values },
    update: (
      fn: (state: { explorations: typeof mock.values }) => {
        explorations: typeof mock.values;
      },
    ) => {
      mock.values = fn({ explorations: mock.values }).explorations;
      return Promise.resolve();
    },
  }),
}));
import Lab from "../src/learning/Forge023HumanitiesALab";
import {
  allocation023A,
  art023A,
  arts023A,
  beliefGroup023A,
  beliefTerms023A,
  concept023A,
  conceptCases023A,
  forge023HumanitiesAGuides as guides,
  forge023HumanitiesALessons as lessons,
  forge023HumanitiesATopics as topics,
  heritage023A,
  heritagePlaces023A,
  humanitiesADefaults023,
  water023A,
  worship023A,
  worshipActions023A,
  youth023A,
} from "../src/learning/forge023HumanitiesA";
describe("023A Din öğretimi, kanıt sınırları ve hesap modelleri", () => {
  it("suppresses stale evidence for wrong active types, enums and ranges with the real exploration hook", () => {
    const cases: [string, string, string | number | boolean][] = [
      ["din-ve-islam", "concept", 2],
      ["din-ve-islam", "term", "obsolete"],
      ["islam-ve-ibadet", "conditions", "false"],
      ["ahlaki-tutum-ve-davranislar", "needA", "2"],
      ["ahlaki-tutum-ve-davranislar", "resource", 25],
      ["genclik-ve-degerler", "task", "obsolete"],
      ["gonul-cografyamiz", "place", false],
      ["din-ve-hayat", "stage", 3],
    ];
    for (const [lessonId, field, bad] of cases) {
      const key = `forge023-humanities-a:${lessonId}`;
      mock.values = {
        [key]: {
          ...humanitiesADefaults023,
          [field]: bad,
          reason: "Önceki seçimin gerekçesi.",
          show: true,
        },
      };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId }));
      expect(html).toContain('aria-expanded="false"');
      expect(html).not.toContain("Önceki seçimin gerekçesi.");
      expect(html).toMatch(/<textarea[^>]*><\/textarea>/);
    }
    mock.values = {
      "forge023-humanities-a:din-ve-islam": {
        art: "obsolete",
        reason: "Bu modelin geçerli gerekçesi.",
        show: true,
      },
    };
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: "din-ve-islam" })),
    ).toContain('aria-expanded="true"');
    mock.values = {};
  });
  it("covers the six owned workbook headings without replacing earlier content", () => {
    expect(Object.values(topics)).toEqual([
      "detail-78",
      "detail-79",
      "detail-80",
      "detail-81",
      "detail-82",
      "detail-83",
    ]);
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(130);
    expect(guides.reduce((n, g) => n + g.examples.length, 0)).toBe(24);
    expect(guides.reduce((n, g) => n + g.recall.length, 0)).toBe(26);
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(16);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.length > 140),
        ),
      ).toBe(true);
      expect(
        g.examples.every(
          (e) =>
            e.steps.length === 3 &&
            e.steps.every((s) => s.explanation.length > 45),
        ),
      ).toBe(true);
    }
  });
  it("all one hundred independent question cards carry their own passage and exact option guidance", () => {
    const ids = new Set<string>();
    let cards = 0;
    expect(lessons.map((l) => l.questions.length)).toEqual([
      14, 18, 16, 14, 18, 20,
    ]);
    for (const l of lessons) {
      expect(l.subjectId).toBe("tyt-din");
      for (const q of l.questions) {
        cards++;
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.passage?.tr.trim()).toBeTruthy();
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        const g = questionGuidanceSchema.parse(q.guidance);
        expect(g.optionReasons).toHaveLength(5);
        expect(g.steps.length).toBeGreaterThanOrEqual(2);
        expect(g.steps.length).toBeLessThanOrEqual(4);
        for (const step of g.steps) {
          expect(g.knowledge).not.toContain(step);
          expect(step).not.toBe(g.strategy);
          expect(q.explanation.tr).toContain(step);
        }
        expect(g.commonError.length).toBeGreaterThan(25);
        expect(g.check.length).toBeGreaterThan(30);
        expect(q.prompt.tr).not.toMatch(
          /yukarıdaki|önceki sayfa|şekildeki|görseldeki|farklı ihtiyaç örneğiyle/iu,
        );
      }
    }
    expect(cards).toBe(100);
    const keys = lessons.flatMap((l) => l.questions.map((q) => q.answer));
    expect(
      Array.from({ length: 5 }, (_, i) => keys.filter((k) => k === i).length),
    ).toEqual([20, 20, 20, 20, 20]);
    for (let period = 1; period <= 20; period++)
      expect(keys.slice(period)).not.toEqual(keys.slice(0, -period));
    expect(
      new Set(
        lessons.flatMap((l) => l.questions.map((q) => q.guidance!.commonError)),
      ).size,
    ).toBe(100);
    expect(
      new Set(lessons.flatMap((l) => l.questions.map((q) => q.guidance!.check)))
        .size,
    ).toBe(100);
  });
  it("retains specific positive knowledge rather than only warnings", () => {
    const text = guides
      .flatMap((g) => g.sections.flatMap((s) => [s.title, ...s.paragraphs]))
      .join("\n");
    for (const term of [
      "Ulûhiyet",
      "ubûdiyet",
      "Cürcânî",
      "farzıkifaye",
      "mendup",
      "müzehhip",
      "nakkaş",
      "Atabetü’l-Hakayık",
      "Divan-ı Hikmet",
      "Safahat",
      "Beytülhikme",
      "Nizamiye",
      "Maveraünnehir",
      "Ceyhun",
      "Şah Veliyullah",
      "Ömer Muhtar",
      "Hucurât",
      "mahremiyet",
      "Ahilik",
      "Mümin",
      "Esmayıhüsna",
    ]) {
      expect(text.toLocaleLowerCase("tr-TR"), term).toContain(
        term.toLocaleLowerCase("tr-TR"),
      );
    }
  });
  it("separates evidence, expressed faith and its two different lists", () => {
    expect(concept023A("fitra").kind).toBe("Eğilim");
    expect(concept023A("hanif").kind).toBe("Yöneliş");
    expect(concept023A("assent").kind).toBe("İç onay");
    expect(concept023A("declaration").kind).toBe("Sözlü ifade");
    expect(beliefGroup023A("destiny").group).toBe("İman esası");
    expect(beliefGroup023A("zakat").group).toBe("İslam’ın şartı");
    expect(
      Object.values(beliefTerms023A).filter((v) => v.group === "İman esası"),
    ).toHaveLength(6);
    expect(
      Object.values(beliefTerms023A).filter(
        (v) => v.group === "İslam’ın şartı",
      ),
    ).toHaveLength(5);
  });
  it("keeps unknown intention unknown and collective task completion separate", () => {
    const unknown = worship023A("help", "unknown", true, false);
    expect(unknown.decision).toBe("Niyet için veri eksik");
    expect(unknown.details).not.toContain("kesin gösteriş");
    expect(worship023A("help", "devotion", true, false).decision).toBe(
      "Verilen amaçla kulluk bağı kurulur",
    );
    expect(worship023A("help", "display", true, false).decision).toBe(
      "Gösteriş amacı var",
    );
    const before = worship023A("funeral", "unknown", true, false),
      after = worship023A("funeral", "unknown", true, true);
    expect(before.category).toBe("Farzıkifaye");
    expect(after.category).toBe(before.category);
    expect(before.condition).toContain("henüz yapılmadı");
    expect(after.condition).toContain("öteki kişilerden düşer");
    expect(worship023A("hajj", "unknown", false, false).condition).toContain(
      "şartlar yok",
    );
    expect(worship023A("witr", "unknown", true, false).category).toBe(
      "Vacip (Hanefî)",
    );
  });
  it("counts all ritual/intention/condition branches without turning them into personal verdicts", () => {
    for (const action of Object.keys(worshipActions023A))
      for (const intent of ["devotion", "unknown", "display"])
        for (const conditions of [true, false])
          for (const done of [true, false]) {
            const v = worship023A(action, intent, conditions, done);
            expect(v.details.length).toBeGreaterThan(80);
            expect(v.scope).toBeTruthy();
            if (intent === "unknown")
              expect(v.intention).toContain("kesin değildir");
          }
  });
  it("reproduces equal-share and need-share counterexamples independently", () => {
    const equal = allocation023A(2, 6, 8, "equal"),
      need = allocation023A(2, 6, 8, "need");
    expect([equal.a, equal.b, equal.unmetA, equal.unmetB, equal.overA]).toEqual(
      [4, 4, 0, 2, 2],
    );
    expect(equal.complete).toBe(false);
    expect([need.a, need.b, need.unmetA, need.unmetB, need.overA]).toEqual([
      2, 6, 0, 0, 0,
    ]);
    expect(need.complete).toBe(true);
    expect(allocation023A(4, 4, 8, "equal").complete).toBe(true);
    const partial = allocation023A(3, 9, 8, "need");
    expect([partial.a, partial.b, partial.unmetA, partial.unmetB]).toEqual([
      2, 6, 1, 3,
    ]);
    expect(allocation023A(0, 0, 24, "need")).toMatchObject({
      a: 0,
      b: 0,
      unused: 24,
      decision: "İhtiyaç sıfır",
    });
  });
  it("uses the declared equal-share budget and caps only the need-based method", () => {
    expect(allocation023A(2, 6, 12, "equal")).toMatchObject({
      a: 6,
      b: 6,
      unused: 0,
      overA: 4,
      overB: 0,
      complete: true,
    });
    expect(allocation023A(2, 6, 12, "need")).toMatchObject({
      a: 2,
      b: 6,
      unused: 4,
      overA: 0,
      overB: 0,
      complete: true,
    });
    expect(allocation023A(0, 12, 24, "equal")).toMatchObject({
      a: 12,
      b: 12,
      unused: 0,
      complete: true,
    });
    expect(allocation023A(0, 0, 24, "equal")).toMatchObject({
      a: 0,
      b: 0,
      unused: 24,
      complete: true,
    });
  });
  it("conserves every available hour, including one-sided and zero demand", () => {
    for (let a = 0; a <= 12; a++)
      for (let b = 0; b <= 12; b++)
        for (let resource = 0; resource <= 24; resource++)
          for (const method of ["need", "equal"]) {
            const v = allocation023A(a, b, resource, method),
              spent =
                a + b === 0
                  ? 0
                  : method === "equal"
                    ? resource
                    : Math.min(a + b, resource);
            expect(v.a + v.b + v.unused).toBeCloseTo(resource, 11);
            expect(v.available).toBe(spent);
            expect(v.a).toBeGreaterThanOrEqual(0);
            expect(v.b).toBeGreaterThanOrEqual(0);
            expect(v.unmetA).toBeCloseTo(Math.max(0, a - v.a), 12);
            expect(v.unmetB).toBeCloseTo(Math.max(0, b - v.b), 12);
            if (method === "need" && a + b > 0) {
              expect(v.a * (a + b)).toBeCloseTo(spent * a, 10);
              expect(v.b * (a + b)).toBeCloseTo(spent * b, 10);
              expect(v.complete).toBe(resource >= a + b);
            }
          }
  });
  it("changing the communication style never changes an unchanged task record", () => {
    for (const task of ["kept", "missed", "unknown"]) {
      const a = youth023A("quiet", task),
        b = youth023A("social", task);
      expect(a.evidence).toBe(b.evidence);
      expect(a.decision).toBe(b.decision);
      expect(a.context).not.toBe(b.context);
    }
    expect(youth023A("quiet", "unknown").decision).toBe("Görev için veri yok");
    expect(youth023A("social", "missed").decision).toBe(
      "Bu olayda görev aksadı",
    );
  });
  it("keeps each real city, monument and route membership distinct", () => {
    const actual: Record<string, [string, string]> = {
      mecca: ["Mekke", "Kâbe"],
      medina: ["Medine", "Mescid-i Nebevî"],
      jerusalem: ["Kudüs", "Mescid-i Aksâ"],
      agra: ["Agra", "Tac Mahal"],
      edirne: ["Edirne", "Selimiye Camii"],
      mostar: ["Mostar", "Mostar Köprüsü"],
      granada: ["Granada", "Elhamra Sarayı"],
      cairo: ["Kahire", "Ezher"],
    };
    for (const [id, [city, trace]] of Object.entries(actual)) {
      const v = heritage023A(id, "mixed");
      expect(v.label).toBe(city);
      expect(v.trace).toBe(trace);
      expect(v.included).toBe(["medina", "edirne", "granada"].includes(id));
    }
    for (const id of Object.keys(heritagePlaces023A))
      for (const route of ["east", "west", "mixed"]) {
        const v = heritage023A(id, route);
        expect(v.x).toBeGreaterThanOrEqual(20);
        expect(v.x).toBeLessThan(325);
        expect(v.y).toBeGreaterThan(20);
        expect(v.y).toBeLessThan(210);
        expect(v.included).toBe(v.stops.includes(id));
      }
    expect(heritage023A("agra", "east").included).toBe(true);
    expect(heritage023A("agra", "mixed").included).toBe(false);
  });
  it("provides seven different art processes with genuinely accumulating stages", () => {
    expect(Object.keys(arts023A)).toHaveLength(7);
    for (const kind of Object.keys(arts023A)) {
      expect(art023A(kind, 0).visible).toHaveLength(1);
      expect(art023A(kind, 2).visible).toHaveLength(3);
      expect(art023A(kind, 2).visible[0]).toBe(art023A(kind, 0).visible[0]);
    }
    expect(art023A("marbling", 2).steps[2]).toContain("kâğıda aktar");
    expect(art023A("calligraphy", 2).material).toBe("Harf ve yazı");
  });
  it("keeps necessary use, preventable loss and recovery in one explicit water balance", () => {
    expect(water023A(40, 20, 50)).toMatchObject({
      gross: 60,
      reused: 10,
      fresh: 50,
      remaining: 50,
    });
    expect(water023A(30, 20, 25)).toMatchObject({
      gross: 50,
      reused: 5,
      fresh: 45,
    });
    expect(water023A(40, 0, 100)).toMatchObject({
      gross: 40,
      reused: 0,
      fresh: 40,
    });
    expect(water023A(0, 20, 100).decision).toBe("Kaybın tamamı geri alınıyor");
    for (let needed = 0; needed <= 60; needed++)
      for (let waste = 0; waste <= 40; waste++)
        for (const recovery of [0, 1, 25, 33, 50, 99, 100]) {
          const v = water023A(needed, waste, recovery);
          expect(v.gross).toBe(needed + waste);
          expect(v.reused).toBeCloseTo(waste * (recovery / 100), 12);
          expect(v.fresh + v.reused).toBeCloseTo(needed + waste, 12);
          expect(v.fresh + v.remaining).toBeCloseTo(100, 12);
          expect(v.fresh).toBeGreaterThanOrEqual(needed);
          expect(v.fresh).toBeLessThanOrEqual(100);
        }
  });
  it("rejects malformed model arguments instead of inventing a result", () => {
    for (const value of [NaN, Infinity, -1, 0.5, undefined, "2"]) {
      expect(() => allocation023A(value as number, 2, 4, "need")).toThrow();
      expect(() => water023A(value as number, 2, 20)).toThrow();
    }
    for (const fn of [
      () => concept023A("missing"),
      () => beliefGroup023A("missing"),
      () => worship023A("help", "bad", true, false),
      () => worship023A("help", "unknown", 1 as unknown as boolean, false),
      () => allocation023A(2, 3, 4, "bad"),
      () => youth023A("bad", "kept"),
      () => heritage023A("mecca", "bad"),
      () => art023A("music", 3),
      () => water023A(60, 41, 50),
    ])
      expect(fn).toThrow();
  });
  it("actual components render all default models without claiming a completed learning event", () => {
    mock.values = {};
    for (const l of lessons) {
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(html).toContain(`data-forge023="${l.id}"`);
      expect(html).toContain("data-model-result");
      expect(html).toContain("öğrenme puanı");
      expect(html).not.toContain('<input type="file"');
      expect(html).not.toMatch(/NaN|Infinity|undefined/);
    }
  });
  it("shows the same default selection and model when saved enums are obsolete", () => {
    const invalid = {
      concept: "obsolete",
      term: "obsolete",
      action: "obsolete",
      intent: "obsolete",
      method: "obsolete",
      talk: "obsolete",
      task: "obsolete",
      place: "obsolete",
      route: "obsolete",
      art: "obsolete",
      stage: -9,
    };
    for (const lesson of lessons) {
      mock.values = {};
      const expected = renderToStaticMarkup(
        createElement(Lab, { lessonId: lesson.id }),
      );
      mock.values = { [`forge023-humanities-a:${lesson.id}`]: invalid };
      expect(
        renderToStaticMarkup(createElement(Lab, { lessonId: lesson.id })),
      ).toBe(expected);
    }
    mock.values = {};
  });
  it("actual saved result rendering keeps the explicit comparison and targeted numbers", () => {
    mock.values = {
      "forge023-humanities-a:ahlaki-tutum-ve-davranislar": {
        needA: 3,
        needB: 9,
        resource: 8,
        method: "need",
        guess: "Açık ihtiyaç kalır",
        reason: "İhtiyaç on iki, kaynak sekiz; açık sürer.",
        compared: true,
      },
    };
    const html = renderToStaticMarkup(
      createElement(Lab, { lessonId: "ahlaki-tutum-ve-davranislar" }),
    );
    expect(html).toContain("Seçimin bu veriyle uyumlu.");
    expect(html).toContain("A: 2 saat, B: 6 saat");
    mock.values = {};
  });
  it("actual SSR covers every named choice and all process stages with full result text", () => {
    const out = process.env.YKSMANIA_SOURCE_SSR_DIR;
    if (out) mkdirSync(out, { recursive: true });
    const cases: {
      id: string;
      values: Record<string, string | number | boolean>;
    }[] = [];
    for (const concept of Object.keys(conceptCases023A))
      for (const term of Object.keys(beliefTerms023A))
        cases.push({ id: "din-ve-islam", values: { concept, term } });
    for (const action of Object.keys(worshipActions023A))
      for (const intent of ["unknown", "devotion", "display"])
        for (const conditions of [true, false])
          for (const done of [true, false])
            cases.push({
              id: "islam-ve-ibadet",
              values: { action, intent, conditions, done },
            });
    for (const method of ["equal", "need"])
      for (const [needA, needB, resource] of [
        [2, 6, 8],
        [3, 9, 8],
        [0, 0, 24],
        [0, 6, 3],
        [4, 4, 8],
        [2, 6, 12],
        [0, 12, 24],
      ])
        cases.push({
          id: "ahlaki-tutum-ve-davranislar",
          values: { method, needA, needB, resource },
        });
    for (const talk of ["quiet", "social"])
      for (const task of ["kept", "missed", "unknown"])
        cases.push({ id: "genclik-ve-degerler", values: { talk, task } });
    for (const place of Object.keys(heritagePlaces023A))
      for (const route of ["east", "west", "mixed"])
        cases.push({ id: "gonul-cografyamiz", values: { place, route } });
    for (const art of Object.keys(arts023A))
      for (const stage of [0, 1, 2])
        for (const [needed, waste, recovery] of [
          [40, 20, 50],
          [40, 0, 100],
          [30, 20, 25],
          [0, 20, 100],
        ])
          cases.push({
            id: "din-ve-hayat",
            values: { art, stage, needed, waste, recovery },
          });
    for (const [i, c] of cases.entries()) {
      mock.values = {
        [`forge023-humanities-a:${c.id}`]: { ...c.values, show: true },
      };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: c.id }));
      expect(html).not.toMatch(/NaN|Infinity|undefined/);
      expect(html).toContain("data-model-result");
      if (out) writeFileSync(join(out, `${i}-${c.id}.html`), html);
    }
    expect(cases).toHaveLength(314);
    mock.values = {};
  });
});
