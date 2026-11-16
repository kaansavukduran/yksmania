import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  forge025HumanitiesTopics as topics,
  forge025HumanitiesGuides as guides,
  forge025HumanitiesLessons as lessons,
  tasavvufEvidence025,
  conditionEvidence025,
  conditionNames025,
  eastEvidence025,
  eastCandidates025,
  humanitiesDefaults025,
  type HumanitiesScene025,
} from "../src/learning/forge025Humanities";
const harness = vi.hoisted(() => ({
  saved: {} as Record<string, unknown>,
  key: "",
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (key: string, defaults: Record<string, unknown>) => {
    harness.key = key;
    return [
      Object.fromEntries(
        Object.entries(defaults).map(([k, v]) => [
          k,
          typeof harness.saved[k] === typeof v ? harness.saved[k] : v,
        ]),
      ),
      () => {},
    ];
  },
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: new Proxy({}, { get: () => harness.saved }) },
  }),
}));
import Lab from "../src/learning/Forge025HumanitiesLab";
function graph(s: HumanitiesScene025) {
  const ids = s.nodes.map((n) => n.id);
  expect(new Set(ids).size).toBe(ids.length);
  for (const l of s.links) {
    expect(ids).toContain(l.from);
    expect(ids).toContain(l.to);
    expect(l.evidence.length).toBeGreaterThan(15);
    expect(typeof l.valid).toBe("boolean");
  }
  expect(s.context.length).toBeGreaterThan(80);
  expect(s.explanation.length).toBeGreaterThan(60);
}
function possibleTruth(status: number[], claim: number) {
  const choices = status.map((s) => (s === 0 ? [false, true] : [s === 1]));
  const outcomes = new Set<boolean>();
  for (const a of choices[0])
    for (const b of choices[1])
      for (const c of choices[2])
        outcomes.add(claim === 0 ? a && b && c : claim === 1 ? b : !c);
  return outcomes.size === 2 ? null : [...outcomes][0];
}
describe("025 Humanities: tasavvuf, güncel meseleler, Hint ve Çin dinleri", () => {
  it("maps the three exact headings and supplies positive teaching", () => {
    expect(Object.values(topics)).toEqual([
      "detail-94",
      "detail-95",
      "detail-96",
    ]);
    expect(lessons.map((l) => l.subjectId)).toEqual([
      "tyt-din",
      "tyt-din",
      "tyt-din",
    ]);
    expect(guides.map((g) => g.sections.length)).toEqual([29, 31, 34]);
    expect(guides.flatMap((g) => g.sections)).toHaveLength(94);
    for (const g of guides)
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.join(" ").length).toBeGreaterThan(200);
      }
    expect(lessons.map((l) => l.body.length)).toEqual([29, 31, 34]);
  });
  it("keeps every original question self-contained with valid domain guidance", () => {
    const all = lessons.flatMap((l) => l.questions);
    expect(all).toHaveLength(60);
    expect(new Set(all.map((q) => q.id)).size).toBe(60);
    for (const q of all) {
      expect(q.options).toHaveLength(5);
      expect(questionContentIssues(q)).toEqual([]);
      expect(q.passage?.tr.length).toBeGreaterThan(80);
      expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
      expect(q.guidance?.steps).toHaveLength(3);
      expect(q.guidance?.optionReasons).toHaveLength(5);
      expect(new Set(q.guidance?.steps).size).toBe(3);
      expect(new Set(q.guidance?.optionReasons).size).toBe(5);
    }
    expect(new Set(all.map((q) => q.guidance?.commonError)).size).toBe(60);
    expect(new Set(all.map((q) => q.guidance?.check)).size).toBe(60);
  });
  it("preserves selected answer-to-reason meaning including negative stems", () => {
    const cases: [
      [number, number, string, string],
      [number, number, string, string],
      [number, number, string, string],
      [number, number, string, string],
    ] = [
      [0, 13, "kırk gün", "süre bilgisi değildir"],
      [1, 13, "izin koşullarına uyar", "ücretsiz eğitim"],
      [1, 16, "Otopsi", "vefat sonrası"],
      [2, 18, "Yin her koşulda", "derecelendirmeyi"],
    ];
    for (const [k, i, answer, reason] of cases) {
      const q = lessons[k].questions[i];
      expect(q.options[q.answer].tr.toLocaleLowerCase("tr-TR")).toContain(
        answer.toLocaleLowerCase("tr-TR"),
      );
      expect(
        q.guidance?.optionReasons[q.answer].toLocaleLowerCase("tr-TR"),
      ).toContain(reason.toLocaleLowerCase("tr-TR"));
    }
  });
  it("balances each unpublished pack without a short repeating key cycle", () => {
    for (const l of lessons) {
      const a = l.questions.map((q) => q.answer);
      expect(
        [0, 1, 2, 3, 4].map((i) => a.filter((x) => x === i).length),
      ).toEqual([4, 4, 4, 4, 4]);
      for (let p = 1; p <= 10; p++)
        expect(a.every((v, i) => i + p >= a.length || v === a[i + p])).toBe(
          false,
        );
    }
    const a = lessons.flatMap((l) => l.questions.map((q) => q.answer));
    for (let p = 1; p <= 20; p++)
      expect(a.every((v, i) => i + p >= a.length || v === a[i + p])).toBe(
        false,
      );
  });
  it("supplies separate worked passages and recall without claiming semantic equivalence from a text check", () => {
    expect(guides.flatMap((g) => g.examples)).toHaveLength(18);
    expect(guides.flatMap((g) => g.recall)).toHaveLength(18);
    const bank = lessons.flatMap((l) => l.questions.map((q) => q.passage?.tr));
    for (const g of guides)
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.prompt.length).toBeGreaterThan(100);
        expect(bank).not.toContain(e.prompt);
        expect(e.answer.length).toBeGreaterThan(20);
        expect(e.check.length).toBeGreaterThan(15);
      }
  });
  it("tests all48 record/target/detail states and the added evidence boundary", () => {
    let count = 0;
    for (let r = 0; r < 6; r++)
      for (let t = 0; t < 4; t++)
        for (const d of [false, true]) {
          const s = tasavvufEvidence025(r, t, d);
          graph(s);
          expect(s.links).toHaveLength(2);
          expect(s.links.some((l) => l.valid)).toBe(
            s.result.startsWith("Bilgi açık:"),
          );
          count++;
        }
    expect(count).toBe(48);
    expect(tasavvufEvidence025(0, 1, false).result).toContain("kayıtta yok");
    expect(tasavvufEvidence025(0, 1, true).result).toContain("Dergâh");
    expect(tasavvufEvidence025(2, 3, false).result).toContain("Musahiplik");
    expect(tasavvufEvidence025(4, 3, true).result).toContain("kayıtta yok");
  });
  it("checks486 three-valued claims with an independent possible-world truth oracle", () => {
    let count = 0;
    for (let c = 0; c < 6; c++)
      for (let a = 0; a < 3; a++)
        for (let b = 0; b < 3; b++)
          for (let d = 0; d < 3; d++)
            for (let claim = 0; claim < 3; claim++) {
              const s = conditionEvidence025(c, a, b, d, claim);
              graph(s);
              const truth = possibleTruth([a, b, d], claim);
              expect(s.result).toBe(
                truth === null
                  ? "İddia için bilgi eksik"
                  : truth
                    ? "İddia verilen kayda uyuyor"
                    : "İddia verilen kayda uymuyor",
              );
              expect(s.links).toHaveLength(claim === 0 ? 3 : 1);
              if (claim === 1) expect(s.links[0].valid).toBe(b === 1);
              if (claim === 2) expect(s.links[0].valid).toBe(d === 2);
              count++;
            }
    expect(count).toBe(486);
  });
  it("keeps unknown and explicit failure distinct and names only this case conditions", () => {
    expect(conditionEvidence025(0, 1, 1, 0, 0).result).toContain("bilgi eksik");
    expect(conditionEvidence025(0, 1, 1, 2, 0).result).toContain("uymuyor");
    expect(conditionEvidence025(0, 1, 1, 2, 2).result).toContain("uyuyor");
    expect(conditionNames025(4)).toEqual([
      "Alıcı rızası",
      "Verici izni",
      "Uzman uygunluğu",
    ]);
    const a = conditionNames025(4);
    a[0] = "mutation" as (typeof a)[0];
    expect(conditionNames025(4)[0]).toBe("Alıcı rızası");
  });
  it("checks all288 clue pairs and refuses to intersect separate files", () => {
    let count = 0;
    for (let a = 0; a < 12; a++)
      for (let b = 0; b < 12; b++)
        for (const same of [false, true]) {
          const s = eastEvidence025(a, b, same);
          graph(s);
          const common = eastCandidates025(a).filter((x) =>
            eastCandidates025(b).includes(x),
          );
          if (!same) expect(s.result).toContain("ayrı değerlendirilmeli");
          else if (!common.length) expect(s.result).toContain("ortak aday yok");
          else if (common.length === 1) expect(s.result).toContain("tek aday");
          else expect(s.result).toContain("Birden çok");
          expect(s.links.every((l) => l.valid)).toBe(same && common.length > 0);
          count++;
        }
    expect(count).toBe(288);
    expect(eastEvidence025(0, 11, true).result).toContain("Birden çok");
    expect(eastEvidence025(0, 1, true).result).toContain("Hinduizm");
    expect(eastEvidence025(1, 7, true).result).toContain("ortak aday yok");
    expect(eastEvidence025(1, 7, false).result).toContain("ayrı");
  });
  it("returns fresh scene data so one exploration cannot mutate another", () => {
    const calls = [
      () => tasavvufEvidence025(1, 1, true),
      () => conditionEvidence025(1, 1, 2, 0, 0),
      () => eastEvidence025(9, 7, true),
    ];
    for (const call of calls) {
      const expected = JSON.stringify(call()),
        s = call();
      s.nodes[0].detail = "mutation";
      s.links[0].valid = !s.links[0].valid;
      expect(JSON.stringify(call())).toBe(expected);
    }
  });
  it("rejects malformed model inputs instead of silently inventing facts", () => {
    const inv = [-1, 0.5, NaN, Infinity, 999];
    for (const v of inv) {
      expect(() => tasavvufEvidence025(v, 0, false)).toThrow(RangeError);
      expect(() => tasavvufEvidence025(0, v, false)).toThrow(RangeError);
      expect(() => conditionEvidence025(v, 0, 0, 0, 0)).toThrow(RangeError);
      for (let i = 1; i <= 4; i++) {
        const a = [0, 0, 0, 0, 0];
        a[i] = v;
        expect(() =>
          conditionEvidence025(
            ...(a as [number, number, number, number, number]),
          ),
        ).toThrow(RangeError);
      }
      expect(() => eastEvidence025(v, 0, true)).toThrow(RangeError);
      expect(() => eastEvidence025(0, v, true)).toThrow(RangeError);
    }
    expect(() => tasavvufEvidence025(0, 0, 1 as unknown as boolean)).toThrow(
      TypeError,
    );
    expect(() => eastEvidence025(0, 0, "true" as unknown as boolean)).toThrow(
      TypeError,
    );
  });
  it("renders actual JSX with scoped keys, a single readable vertical SVG and gated reasoning", () => {
    harness.saved = {};
    for (const l of lessons) {
      const h = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(harness.key).toBe("forge025-humanities:" + l.id);
      expect(h).toMatch(/viewBox="0 0 270 /);
      expect((h.match(/<svg/g) || []).length).toBe(1);
      expect(h).toContain("Önce gerekçeni");
      expect(h).toContain("disabled");
      expect(h).not.toContain("NaN");
    }
    expect(() =>
      renderToStaticMarkup(createElement(Lab, { lessonId: "invalid" })),
    ).toThrow(RangeError);
  });
  it("discards old reasoning only when this model has an invalid selection", () => {
    for (const [k, key] of ["record", "first", "evidenceA"].entries()) {
      harness.saved = {
        [key]: 999,
        reason: "Eski seçimle yazılmış gerekçe.",
        reveal: true,
      };
      const h = renderToStaticMarkup(
        createElement(Lab, { lessonId: lessons[k].id }),
      );
      expect(h).toContain("Önce gerekçeni");
      expect(h).not.toContain("Eski seçimle");
    }
    harness.saved = {
      record: 999,
      reason: "Bu dosyanın koşullarını inceledim.",
      reveal: true,
    };
    const h = renderToStaticMarkup(
      createElement(Lab, { lessonId: lessons[1].id }),
    );
    expect(h).not.toContain("Önce gerekçeni");
    expect(h).toContain("otomatik doğru saymaz");
  });
  it("normalizes old long explanations below the persistent128-character boundary", () => {
    harness.saved = { reason: "a".repeat(200), reveal: true };
    for (const l of lessons) {
      const h = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(h).toContain('maxLength="120"');
      expect(h).toContain("a".repeat(120));
      expect(h).not.toContain("a".repeat(121));
    }
    expect(humanitiesDefaults025.reveal).toBe(false);
  });
  it("rejects old reasoning when the shared hook hides a wrong raw selection type", () => {
    const cases = [
      [0, "record", "5"],
      [0, "detail", "true"],
      [1, "first", "2"],
      [2, "evidenceA", "7"],
      [2, "sameRecord", "false"],
    ] as const;
    for (const [kind, key, value] of cases) {
      harness.saved = {
        [key]: value,
        reason: "Eski yanlış seçimin gerekçesi.",
        reveal: true,
      };
      const html = renderToStaticMarkup(
        createElement(Lab, { lessonId: lessons[kind].id }),
      );
      expect(html).toContain("Önce gerekçeni");
      expect(html).not.toContain("Eski yanlış seçimin");
    }
    harness.saved = {
      record: "5",
      reason: "Bu dosyanın kaydını inceledim.",
      reveal: true,
    };
    const html = renderToStaticMarkup(
      createElement(Lab, { lessonId: lessons[1].id }),
    );
    expect(html).not.toContain("Önce gerekçeni");
    expect(html).toContain("otomatik doğru saymaz");
  });
});
