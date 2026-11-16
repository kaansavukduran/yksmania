import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  forge023HumanitiesBLessons as lessons,
  forge023HumanitiesBGuides as guides,
  forge023HumanitiesBTopics as topics,
  youthSceneB023,
  nameSceneB023,
  schoolSceneB023,
  prophetSceneB023,
  conceptSceneB023,
  beliefSceneB023,
  humanitiesBDefaults023,
} from "../src/learning/forge023HumanitiesB";
const harness = vi.hoisted(() => ({
  saved: {} as Record<string, string | number | boolean>,
  key: "",
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    key: string,
    defaults: Record<string, string | number | boolean>,
  ) => {
    harness.key = key;
    return [{ ...defaults, ...harness.saved }, () => {}];
  },
}));
import Lab from "../src/learning/Forge023HumanitiesBLab";
describe("023: altı Din ünitesinde kaynak,kavram ve bağımsız kanıt", () => {
  it("maps exact six headings and deep positive source coverage", () => {
    expect(Object.values(topics)).toEqual([
      "detail-84",
      "detail-85",
      "detail-86",
      "detail-87",
      "detail-88",
      "detail-89",
    ]);
    expect(guides.map((g) => g.sections.length)).toEqual([
      22, 23, 23, 20, 24, 25,
    ]);
    for (const g of guides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 140)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.prompt).toMatch(/A\).*B\).*C\).*D\).*E\)/s);
        expect(e.steps).toHaveLength(3);
        expect(new Set(e.steps.map((s) => s.explanation)).size).toBe(3);
      }
    }
    expect(lessons.every((l) => l.subjectId === "tyt-din")).toBe(true);
  });
  it("retains116 complete five-choice original cards and all580 individual option reasons", () => {
    expect(lessons.map((l) => l.questions.length)).toEqual([
      18, 18, 20, 18, 20, 22,
    ]);
    const all = lessons.flatMap((l) => l.questions);
    expect(new Set(all.map((q) => q.id)).size).toBe(116);
    expect(new Set(all.map((q) => q.guidance!.commonError)).size).toBe(116);
    expect(new Set(all.map((q) => q.guidance!.check)).size).toBe(116);
    for (const q of all) {
      expect(q.passage!.tr.length).toBeGreaterThan(40);
      expect(questionContentIssues(q), q.id).toEqual([]);
      const h = questionGuidanceSchema.parse(q.guidance);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(h.optionReasons).toHaveLength(5);
      expect(h.steps).toHaveLength(3);
      expect(new Set(h.steps).size).toBe(3);
      for (const step of h.steps) {
        expect(h.knowledge).not.toContain(step);
        expect(step).not.toBe(h.strategy);
      }
      expect(q.options[q.answer].tr).toBeTruthy();
    }
  });
  it("keeps worked passages separate from graded passages and removes repeating answer cycles", () => {
    const all = lessons.flatMap((l) => l.questions);
    for (const g of guides)
      for (const e of g.examples)
        for (const q of all) expect(e.prompt).not.toContain(q.passage!.tr);
    for (const l of lessons) {
      const a = l.questions.map((q) => q.answer),
        counts = [0, 1, 2, 3, 4].map((i) => a.filter((n) => n === i).length);
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let p = 1; p <= 10; p++)
        expect(a.every((n, i) => i + p >= a.length || n === a[i + p])).toBe(
          false,
        );
    }
  });
  it("models multi-role youth evidence and changes contribution,value and limits", () => {
    expect(youthSceneB023(3, 0).summary).toEqual([
      "Öğreticilik",
      "Yönetim",
      "Kadılık",
    ]);
    expect(youthSceneB023(1, 0).summary).toContain("Sancaktarlık");
    expect(youthSceneB023(3, 1).summary).toEqual(["Bilgi", "Sorumluluk"]);
    expect(youthSceneB023(3, 2).result).toContain("dışlanmaz");
    expect(youthSceneB023(6).context).toContain("Umeys");
  });
  it("exhaustively tests64 name-event relations with exact direct-match meaning", () => {
    for (let n = 0; n < 8; n++)
      for (let e = 0; e < 8; e++) {
        const s = nameSceneB023(n, e);
        expect(s.links[0].valid).toBe(n === e);
        expect(s.links[1].valid).toBe(true);
        expect(s.nodes[2].label).toBe(
          [
            "Hayy",
            "Muhyî",
            "Musavvir",
            "Rezzak",
            "Şâfi",
            "Ehad",
            "Halık",
            "Rahman",
          ][e],
        );
      }
    expect(nameSceneB023(0, 1).result).toContain("Muhyî");
  });
  it("keeps school family and doctrinal/fiqh field independent across27 states", () => {
    for (let s = 0; s < 9; s++)
      for (let f = 0; f < 3; f++) {
        const scene = schoolSceneB023(s, f);
        expect(scene.links[1].valid).toBe(
          f === 0 || (s < 4 ? f === 1 : f === 2),
        );
      }
    expect(schoolSceneB023(3).context).toContain("on ikiyle sınırlamama");
    expect(schoolSceneB023(4, 1).result).toContain("Alan uyuşmuyor");
    expect(schoolSceneB023(8).nodes[0].label).toContain("İmamiye");
  });
  it("follows12 actual stages without substituting ruling degree for transmission type", () => {
    expect([0, 1, 2].map((n) => prophetSceneB023(0, n).result)).toEqual([
      "1. aşama: Tebliğ",
      "2. aşama: Tebyin",
      "3. aşama: Temsil",
    ]);
    expect(prophetSceneB023(1, 0).result).toContain("Teşri");
    expect(prophetSceneB023(2, 1).explanation).toContain("hüküm derecesi ayrı");
    expect(prophetSceneB023(2, 2).result).toContain("Takrirî");
    expect(prophetSceneB023(3, 1).result).toContain("Bilinçli aktarım");
  });
  it("independently changes intention,completed action and care across36 concept states", () => {
    for (let c = 0; c < 3; c++)
      for (let m = 0; m < 3; m++)
        for (let q = 0; q < 2; q++)
          for (const done of [false, true]) {
            const s = conceptSceneB023(c, m, q, done);
            expect(s.links.map((l) => l.valid)).toEqual([
              m !== 2,
              done,
              done && q === 0,
            ]);
            expect(s.result).toContain(
              done ? ["İnfak", "Mücahede", "Yararlı eylem"][c] : "Biten iş yok",
            );
          }
    expect(conceptSceneB023(0, 1, 0, true).result).toContain("İnfak");
    expect(conceptSceneB023(0, 2).result).toContain("belirtilmemiş");
  });
  it("handles claim axes,missing data and explicit contradictory additions across27 states", () => {
    for (let c = 0; c < 9; c++)
      for (let e = 0; e < 3; e++) {
        const s = beliefSceneB023(c, e),
          conflict = (c === 0 && e === 2) || (c === 2 && e === 1);
        expect(s.result.includes("Çelişen öncüller")).toBe(conflict);
      }
    expect(beliefSceneB023(5, 0).result).toContain("belirtilmemiş");
    expect(beliefSceneB023(5, 1).result).toContain("yaratıcı kabulü");
    expect(beliefSceneB023(1, 1).result).not.toContain("Çelişen");
    expect(beliefSceneB023(4).nodes[0].label).toBe("Bilgi yöntemi");
  });
  it("rejects nonfinite,fractional and out-of-range model indices and returns fresh objects", () => {
    for (const v of [-1, Infinity, NaN, 0.5, 999]) {
      for (const fn of [
        youthSceneB023,
        nameSceneB023,
        schoolSceneB023,
        prophetSceneB023,
        conceptSceneB023,
        beliefSceneB023,
      ])
        expect(() => fn(v)).toThrow(RangeError);
      for (const fn of [
        youthSceneB023,
        nameSceneB023,
        schoolSceneB023,
        prophetSceneB023,
        conceptSceneB023,
        beliefSceneB023,
      ])
        expect(() => fn(0, v)).toThrow(RangeError);
    }
    expect(() =>
      conceptSceneB023(0, 0, 0, "yes" as unknown as boolean),
    ).toThrow(TypeError);
    const s = youthSceneB023();
    s.nodes[0].label = "mutated";
    s.summary.push("mutated");
    expect(youthSceneB023().nodes[0].label).not.toBe("mutated");
    expect(youthSceneB023().summary).not.toContain("mutated");
  });
  it("renders actual Lab JSX with stale state fallback and per-topic exploration key;this is source SSR only", () => {
    for (const l of lessons) {
      harness.saved = {
        person: -1,
        lens: 88,
        name: NaN,
        event: -5,
        school: 999,
        field: NaN,
        case: 99,
        stage: 77,
        context: 99,
        motive: -4,
        quality: 2,
        claim: 99,
        extra: 22,
        done: true,
        reason: "",
        show: true,
      };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(harness.key).toBe(`forge023-humanities-b:${l.id}`);
      expect(html).toContain("data-model-result");
      expect(html).toContain("disabled");
      expect(html).not.toContain("NaN");
      expect(html).toContain("Önce açıklamanı");
    }
  });
  it("does not redefine user-state progress semantics", () => {
    expect(stateSchema.safeParse(initialState()).success).toBe(true);
    expect(humanitiesBDefaults023.show).toBe(false);
  });
});
