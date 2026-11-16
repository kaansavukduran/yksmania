import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { initialState, stateSchema } from "../src/domain/model";
import {
  forge024TurkishLessons as lessons,
  forge024TurkishGuides as guides,
  forge024TurkishTopics as topics,
  multiContexts024,
  multiScene024,
  topicContexts024,
  topicScene024,
  visualContexts024,
  visualScene024,
} from "../src/learning/forge024Turkish";
const h = vi.hoisted(() => ({
  saved: {} as Record<string, string | number | boolean>,
  key: "",
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    key: string,
    defaults: Record<string, string | number | boolean>,
  ) => {
    h.key = key;
    return [
      Object.fromEntries(
        Object.entries(defaults).map(([key, value]) => [
          key,
          typeof h.saved[key] === typeof value ? h.saved[key] : value,
        ]),
      ),
      () => {},
    ];
  },
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: new Proxy({}, { get: () => h.saved }) },
  }),
}));
import Lab from "../src/learning/Forge024TurkishLab";
describe("024 Türkçe: tam bağlam, bağımsız kök ve veri kapsamı", () => {
  it("owns exactly the three requested detailed headings and positive guides", () => {
    expect(Object.values(topics)).toEqual([
      "detail-280",
      "detail-281",
      "detail-282",
    ]);
    expect(lessons.map((l) => l.questions.length)).toEqual([20, 20, 20]);
    expect(guides.map((g) => g.sections.length)).toEqual([18, 18, 18]);
    for (const g of guides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 200)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.prompt).toMatch(/A\).*B\).*C\).*D\).*E\)/s);
        expect(e.steps.length).toBeGreaterThanOrEqual(3);
        expect(new Set(e.steps.map((s) => s.explanation)).size).toBe(
          e.steps.length,
        );
      }
    }
    expect(lessons.every((l) => l.subjectId === "tyt-turkce")).toBe(true);
  });
  it("supplies every passage and all five choices with distinct advancing help", () => {
    const questions = lessons.flatMap((l) => l.questions),
      steps = questions.flatMap((q) => q.guidance!.steps);
    expect(questions).toHaveLength(60);
    expect(new Set(questions.map((q) => q.id)).size).toBe(60);
    expect(new Set(steps).size).toBe(180);
    for (const q of questions) {
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(q.passage!.tr.length).toBeGreaterThan(100);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      const g = questionGuidanceSchema.parse(q.guidance);
      expect(g.optionReasons).toHaveLength(5);
      expect(g.steps).toHaveLength(3);
      for (const s of g.steps) {
        expect(g.knowledge).not.toContain(s);
        expect(s).not.toBe(g.strategy);
      }
      expect(g.optionReasons[q.answer].trim()).not.toBe("");
    }
  });
  it("repeats the complete shared passage in all four independent cards of each set", () => {
    const q = lessons[0].questions;
    for (let start = 0; start < 20; start += 4) {
      const group = q.slice(start, start + 4);
      expect(new Set(group.map((q) => q.passage!.tr)).size).toBe(1);
      expect(new Set(group.map((q) => q.prompt.tr)).size).toBe(4);
      for (const x of group)
        expect(x.prompt.tr).not.toMatch(
          /önceki (?:cevaba|yanıta|sorunun cevabına)/i,
        );
    }
    expect(new Set(q.map((q) => q.passage!.tr)).size).toBe(5);
  });
  it("keeps full worked prompts separate from all60 graded passages", () => {
    for (const g of guides)
      for (const e of g.examples)
        for (const q of lessons.flatMap((l) => l.questions))
          expect(e.prompt).not.toContain(q.passage!.tr);
  });
  it("balances unpublished answers without short repeating cycles and keeps semantic numeric keys", () => {
    for (const l of lessons) {
      const a = l.questions.map((q) => q.answer);
      expect(
        [0, 1, 2, 3, 4].map((i) => a.filter((n) => n === i).length),
      ).toEqual([4, 4, 4, 4, 4]);
      for (let p = 1; p <= 10; p++)
        expect(a.every((n, i) => i + p >= a.length || n === a[i + p])).toBe(
          false,
        );
    }
    const q = lessons[2].questions;
    const expected: Record<number, RegExp> = {
      0: /Salı ve çarşamba/,
      1: /12 metreküp.*her ay artış olmamıştır/,
      2: /A’da.*B’de doluluk/,
      3: /B’de.*6 kişi/,
      4: /en az36/,
      5: /^49$/,
      6: /^70$/,
      7: /iki katı değildir/,
      8: /12 yüzde puanı.*%50/,
      9: /En az54, en çok102/,
      10: /16 yaşını.*ön kayıt/,
      11: /Yeniden belge/,
      12: /^5$/,
      13: /en az92/,
      14: /hiçbir geçişte azalmamış/,
      15: /Bilinen iki kayıt/,
      16: /N’de36, M’de18/,
      17: /^%25$/,
      18: /600 g/,
      19: /18 fazladır/,
    };
    for (const [i, pattern] of Object.entries(expected)) {
      const x = q[Number(i)];
      expect(x.options[x.answer].tr.replace(/\s+(?=\d)/g, ""), x.id).toMatch(
        pattern,
      );
    }
  });
  it("solves all45 multiple-question evidence states without previous answers", () => {
    const refs = [[1], [2], [3, 4], [2], [1], [3, 4], [1], [2, 3], [4]];
    let at = 0;
    for (const c of multiContexts024())
      for (let ask = 0; ask < 3; ask++) {
        const expected = refs[at++];
        for (let selected = 0; selected < 5; selected++) {
          const s = multiScene024(c.id, ask, selected);
          expect(s.ask.references).toEqual(expected);
          expect(s.valid).toBe(expected.includes(selected));
          expect(s.sentences).toHaveLength(5);
        }
      }
    expect(multiScene024("greenhouse", 2, 3).result).toContain(
      "kesin bir sonuç yok",
    );
    expect(multiScene024("greenhouse", 0, 1).result).toContain("ışığı");
    expect(multiScene024("greenhouse", 1, 2).result).toContain("ışık düzeyi");
  });
  it("distinguishes sentence coverage from appropriate topic scope in all80 states", () => {
    const kinds = ["uygun", "geniş", "dar", "dışarıda", "yargı"];
    for (const c of topicContexts024())
      for (let candidate = 0; candidate < 5; candidate++)
        for (let selected = 0; selected < 4; selected++) {
          const s = topicScene024(c.id, candidate, selected);
          expect(s.candidate.kind).toBe(kinds[candidate]);
          expect(s.covered).toBe([4, 4, 1, 0, 4][candidate]);
          expect(s.valid).toBe(s.candidate.references.includes(selected));
        }
    expect(topicScene024("weaving", 1).covered).toBe(4);
    expect(topicScene024("weaving", 1).decision).toContain("geniş");
    expect(topicScene024("weaving", 4).decision).toContain("yargı");
  });
  it("uses total attendance/total capacity for combined periods rather than averaging percentages", () => {
    const s = visualScene024("print", 1, 2, 0);
    expect(s.rows.map((r) => [r.attendance, r.capacity])).toEqual([
      [63, 108],
      [54, 108],
      [63, 108],
    ]);
    expect(s.leaders).toEqual(["A", "C"]);
    expect(s.rows[0].value).toBeCloseTo((100 * 63) / 108);
    expect(s.rows[0].value).not.toBeCloseTo((75 + 50) / 2);
  });
  it("changes quantity and occupancy leaders while preserving exact HTML data in all54 states", () => {
    expect(visualScene024("studio", 0, 0, 0).leaders).toEqual(["B"]);
    expect(visualScene024("studio", 1, 0, 0).leaders).toEqual(["A", "B", "C"]);
    expect(visualScene024("studio", 1, 1, 0).leaders).toEqual(["A", "C"]);
    for (const c of visualContexts024())
      for (let m = 0; m < 2; m++)
        for (let p = 0; p < 3; p++)
          for (let claim = 0; claim < 3; claim++) {
            const s = visualScene024(c.id, m, p, claim);
            expect(
              s.rows.every(
                (r) => Number.isFinite(r.value) && r.attendance <= r.capacity,
              ),
            ).toBe(true);
            expect(
              s.rows.every(
                (r) =>
                  r.value ===
                  (m === 0 ? r.attendance : (100 * r.attendance) / r.capacity),
              ),
            ).toBe(true);
            if (claim === 2) expect(s.decision).toBe("Kesin neden verilmemiş");
          }
  });
  it("rejects invalid IDs and nonfinite/fractional indices and returns fresh nested arrays", () => {
    for (const fn of [multiScene024, topicScene024, visualScene024])
      expect(() => fn("unknown")).toThrow(RangeError);
    for (const n of [-1, 0.5, NaN, Infinity, 999]) {
      expect(() => multiScene024("map", n)).toThrow(RangeError);
      expect(() => multiScene024("map", 0, n)).toThrow(RangeError);
      expect(() => topicScene024("diary", n)).toThrow(RangeError);
      expect(() => topicScene024("diary", 0, n)).toThrow(RangeError);
      expect(() => visualScene024("studio", n)).toThrow(RangeError);
      expect(() => visualScene024("studio", 0, n)).toThrow(RangeError);
      expect(() => visualScene024("studio", 0, 0, n)).toThrow(RangeError);
    }
    const s = multiScene024();
    s.sentences[0] = "mutated";
    s.ask.references.push(99);
    expect(multiScene024().sentences[0]).not.toBe("mutated");
    expect(multiScene024().ask.references).not.toContain(99);
    const t = topicScene024();
    t.candidate.references.push(99);
    expect(topicScene024().candidate.references).not.toContain(99);
    const v = visualScene024();
    v.rows[0].attendance = -1;
    v.leaders.push("X");
    expect(visualScene024().rows[0].attendance).toBe(24);
    expect(visualScene024().leaders).not.toContain("X");
  });
  it("renders actual JSX with stale state fallback and hides reveal until a real prediction and reason exist", () => {
    for (const l of lessons) {
      h.saved = {
        caseId: "gone",
        question: NaN,
        candidate: 99,
        selected: -1,
        metric: 0.5,
        period: NaN,
        claim: 99,
        guess: "gone",
        reason: "",
        show: true,
      };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(h.key).toBe(`forge024-turkish:${l.id}`);
      expect(html).toContain("disabled");
      expect(html).not.toContain("data-model-result");
      expect(html).not.toContain("NaN");
      expect(html).toContain(
        l.id === "metin-tablo-gorsel-yorumlama"
          ? "data-record-chart"
          : "data-evidence-graph",
      );
    }
    expect(() =>
      renderToStaticMarkup(createElement(Lab, { lessonId: "unknown" })),
    ).toThrow(RangeError);
  });
  it("does not reveal a fallback selection using a stale valid-looking guess and reason", () => {
    const states: Record<string, string | number | boolean>[] = [
      { caseId: "greenhouse", question: 99, selected: 1, guess: "yes" },
      { caseId: "gone", candidate: 0, selected: 0, guess: "uygun" },
      { caseId: "studio", metric: 0, period: 99, claim: 0, guess: "single" },
    ];
    for (let i = 0; i < lessons.length; i++) {
      h.saved = {
        ...states[i],
        reason: "Eski seçimden kalan gerçek görünümlü gerekçe.",
        show: true,
      };
      const html = renderToStaticMarkup(
        createElement(Lab, { lessonId: lessons[i].id }),
      );
      expect(html).not.toContain("data-model-result");
      expect(html).not.toContain("NaN");
    }
  });
  it("rejects wrong raw selection types even when the hook has replaced them with defaults", () => {
    const contexts = [
      multiContexts024(),
      topicContexts024(),
      visualContexts024(),
    ];
    const fields = [
      ["caseId", "question", "selected"],
      ["caseId", "candidate", "selected"],
      ["caseId", "metric", "period", "claim"],
    ];
    for (let k = 0; k < lessons.length; k++)
      for (const field of fields[k]) {
        h.saved = {
          caseId: contexts[k][0].id,
          [field]: field === "caseId" ? false : "1",
          guess: ["yes", "uygun", "single"][k],
          reason: "Eski farklı seçimden kalan gerekçe.",
          show: true,
        };
        const html = renderToStaticMarkup(
          createElement(Lab, { lessonId: lessons[k].id }),
        );
        expect(html).not.toContain("data-model-result");
        expect(html).not.toContain("Eski farklı seçimden");
        expect(html).toContain("disabled");
      }
  });
  it("keeps unrelated malformed fields separate and accepts short nonempty reasoning", () => {
    const contexts = [
      multiContexts024(),
      topicContexts024(),
      visualContexts024(),
    ];
    for (let k = 0; k < lessons.length; k++) {
      const base = {
        caseId: contexts[k][0].id,
        ...(k === 2 ? { question: "bad" } : { metric: "bad" }),
        guess: ["yes", "uygun", "single"][k],
        show: true,
      };
      for (const reason of ["4³=64", "ψi>ψo"]) {
        h.saved = { ...base, reason };
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: lessons[k].id })),
        ).toContain("data-model-result");
      }
      for (const reason of ["", "   "]) {
        h.saved = { ...base, reason };
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: lessons[k].id })),
        ).not.toContain("data-model-result");
      }
    }
  });
  it("shows source evidence for a completed prediction and preserves the full HTML counterpart", () => {
    h.saved = {
      caseId: "greenhouse",
      question: 2,
      selected: 3,
      guess: "yes",
      reason:
        "Büyüme ölçülmemiş; son iki cümle bu etkiye kesin sonuç vermiyor.",
      show: true,
    };
    let html = renderToStaticMarkup(
      createElement(Lab, { lessonId: lessons[0].id }),
    );
    expect(html).toContain("data-model-result");
    expect(html).toContain('data-support="true"');
    expect(html).toContain("büyüme hızı");
    h.saved = {
      caseId: "studio",
      metric: 1,
      period: 0,
      claim: 0,
      guess: "tie",
      reason: "Üç satırda katılım kapasitenin yarısıdır.",
      show: true,
    };
    html = renderToStaticMarkup(
      createElement(Lab, { lessonId: lessons[2].id }),
    );
    expect(html).toContain("Eşit liderler var");
    expect(html).toContain("Tam kayıtlar");
    expect(html).toContain("48 yer");
    expect(html).toContain("24 kayıt");
    expect(html).toContain("50%");
  });
  it("stores exploration separately from learning events and question attempts", () => {
    const before = initialState();
    const after = stateSchema.parse({
      ...before,
      explorations: {
        ...before.explorations,
        [`forge024-turkish:${lessons[0].id}`]: {
          caseId: "map",
          question: 2,
          selected: 4,
          guess: "yes",
          reason: "Son cümlede ölçüm yok.",
          show: true,
        },
      },
    });
    expect(after.sessions).toEqual(before.sessions);
    expect(after.reviews).toEqual(before.reviews);
    expect(after.draft).toEqual(before.draft);
    expect(after.topicProgress).toEqual(before.topicProgress);
  });
});
