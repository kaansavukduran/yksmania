import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { stateSchema, initialState } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  forge023TurkishLessons as lessons,
  forge023TurkishGuides as guides,
  forge023TurkishTopics as topics,
  answerContexts023,
  answerScene023,
  interviewContexts023,
  interviewScene023,
  turkishDefaults023,
} from "../src/learning/forge023Turkish";
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
import Lab from "../src/learning/Forge023TurkishLab";
const ids = ["paragrafta-soru-cevap", "paragrafta-roportaj"];
describe("023: sorudan kanıta ve iki sesli görüşmeye", () => {
  it("maps two exact headings and keeps 38 deep sections with 12 complete examples", () => {
    expect(lessons.map((l) => l.id)).toEqual(ids);
    expect(Object.values(topics)).toEqual(["detail-278", "detail-279"]);
    expect(guides.map((g) => g.sections.length)).toEqual([18, 20]);
    expect(guides.map((g) => g.examples.length)).toEqual([6, 6]);
    for (const [i, g] of guides.entries()) {
      expect(g.recall).toHaveLength(6);
      expect(lessons[i].subjectId).toBe("tyt-turkce");
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        for (const p of s.paragraphs)
          expect(p.length).toBeGreaterThanOrEqual(200);
      }
      for (const e of g.examples) {
        expect(e.prompt.length).toBeGreaterThan(150);
        expect(e.steps).toHaveLength(3);
        for (const step of e.steps)
          expect(step.explanation.length).toBeGreaterThan(40);
        expect(e.check.length).toBeGreaterThan(35);
        expect(e.pitfall.length).toBeGreaterThan(35);
      }
    }
  });
  it("provides 30 standalone full-passage five-choice cards with 150 real option reasons", () => {
    expect(lessons.map((l) => l.questions.length)).toEqual([15, 15]);
    const qs = lessons.flatMap((l) => l.questions);
    expect(new Set(qs.map((q) => q.id)).size).toBe(30);
    expect(new Set(qs.map((q) => q.guidance!.commonError)).size).toBe(30);
    expect(new Set(qs.map((q) => q.guidance!.check)).size).toBe(30);
    for (const q of qs) {
      expect(q.passage!.tr.length).toBeGreaterThan(100);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(questionContentIssues(q), q.id).toEqual([]);
      const h = questionGuidanceSchema.parse(q.guidance);
      expect(h.steps).toHaveLength(3);
      expect(h.optionReasons).toHaveLength(5);
      for (const r of h.optionReasons) expect(r.length).toBeGreaterThan(30);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(5);
    }
  });
  it("does not reveal any graded full passage inside worked examples", () => {
    const passages = lessons.flatMap((l) =>
      l.questions.map((q) => q.passage!.tr),
    );
    for (const guide of guides)
      for (const example of guide.examples)
        for (const passage of passages)
          expect(example.prompt).not.toContain(passage);
    for (const lesson of lessons) {
      const keys = lesson.questions.map((q) => q.answer);
      for (let i = 0; i < 5; i++)
        expect(keys.filter((k) => k === i)).toHaveLength(3);
      expect(keys.slice(0, 5)).not.toEqual(keys.slice(5, 10));
      expect(keys.slice(5, 10)).not.toEqual(keys.slice(10, 15));
    }
  });
  it("preserves the actual distinct correct relations across all30 hand-authored cases", () => {
    const a = lessons[0].questions.map((q) => q.options[q.answer].tr),
      b = lessons[1].questions.map((q) => q.options[q.answer].tr);
    expect(a[0]).toBe("Ses arşivi nedir ve hangi bileşenleri içerir?");
    expect(a[1]).toBe("Toplantıyı niçin ertelediniz?");
    expect(a[4]).toContain("neye göre");
    expect(a[5]).toBe("Atölye saat kaçta başladı?");
    expect(a[6]).toContain("hangi koşullar");
    expect(a[10]).toContain("adımlarla");
    expect(a[12]).toBe("Sayfa düzenini değiştirmeyi");
    expect(a[14]).toContain("bütün kitaplıklar");
    expect(b[0]).toContain("onlardan öğrendiğini");
    expect(b[1]).toBe("Çatlağın yerini neden kayda alıyorsunuz?");
    expect(b[3]).toContain("kişisel üslup");
    expect(b[4]).toContain("defter kullanımını sürdürmektedir");
    expect(b[6]).toContain("birebir kopyalamama");
    expect(b[9]).toContain("neden gerekli");
    expect(b[12]).toContain("Taslak;");
    expect(b[14]).toContain("daha geniş röportaj");
  });
  it("changes the asked information and exactly the matching textual evidence in three full contexts", () => {
    expect(answerContexts023().map((c) => c.id)).toEqual([
      "archive",
      "exhibit",
      "sound",
    ]);
    for (const { id } of answerContexts023())
      for (let q = 0; q < 5; q++)
        for (let selected = 0; selected < 5; selected++) {
          const s = answerScene023(id, q, selected);
          expect(s.sentences).toHaveLength(5);
          expect(s.ask.references).toEqual(q === 4 ? [] : [q]);
          expect(s.selectedSupports).toBe(q !== 4 && q === selected);
          expect(s.decision).toBe(q === 4 ? "Bilgi yok" : "Yanıt var");
          expect(s.evidence.map((e) => e.text)).toEqual(
            q === 4 ? [] : [s.sentences[q]],
          );
          expect(s.question).toBe(q);
          expect(s.selected).toBe(selected);
        }
  });
  it("keeps number and duration in one sentence while leaving software/time/headcount genuinely absent", () => {
    expect(answerScene023("archive", 3).ask.answer).toBe(
      "Kırk kaydı altı haftada.",
    );
    expect(answerScene023("archive", 4).ask.answer).toContain(
      "Yazılım adı verilmedi",
    );
    expect(answerScene023("exhibit", 4).ask.answer).toContain(
      "Tam sayı verilmedi",
    );
    expect(answerScene023("sound", 4).ask.answer).toContain(
      "Başlama saati yok",
    );
    expect(answerScene023("sound", 1).ask.answer).toContain(
      "izin tek başına kesin paylaşım değildir",
    );
  });
  it("keeps each scene independent of caller mutations", () => {
    const s = answerScene023("archive", 1);
    s.sentences[0] = "changed";
    s.ask.references.push(4);
    s.questionLabels[0] = "changed";
    s.options[0] = "changed";
    const fresh = answerScene023("archive", 1);
    expect(fresh.sentences[0]).toContain("2021");
    expect(fresh.ask.references).toEqual([1]);
    expect(fresh.questionLabels[0]).not.toBe("changed");
    expect(fresh.options).toEqual(["Yanıt var", "Bilgi yok"]);
  });
  it("uses three different actual follow-up branches and preserves the first answer", () => {
    expect(interviewContexts023().map((c) => c.id)).toEqual([
      "repair",
      "music",
      "research",
    ]);
    for (const { id } of interviewContexts023())
      for (let branch = 0; branch < 3; branch++)
        for (let turn = 0; turn < 3; turn++) {
          const s = interviewScene023(id, branch, turn);
          expect(s.dialogue).toHaveLength((turn + 1) * 2);
          expect(s.nodes.map((n) => n.active)).toEqual([
            true,
            turn >= 1,
            turn >= 2,
          ]);
          expect(s.relations.map((n) => n.active)).toEqual([
            turn >= 1,
            turn >= 2,
          ]);
          expect(s.relations.map((n) => n.valid)).toEqual([branch !== 2, true]);
          expect(s.decision).toBe(
            ["Verilen bilgi", "Yeni gerekçe", "Yanlış öncül"][branch],
          );
          for (let i = 0; i < s.dialogue.length; i++)
            expect(s.dialogue[i].speaker).toBe(
              i % 2 === 0 ? "Görüşmeci" : "Görüşülen kişi",
            );
          expect(s.dialogue.slice(0, 2)).toEqual(
            interviewScene023(id, 0, 0).dialogue,
          );
        }
  });
  it("does not turn record keeping into intervention or two matching sources into guaranteed truth", () => {
    const repair = interviewScene023("repair", 1, 2),
      research = interviewScene023("research", 1, 2);
    expect(repair.dialogue[3].text).toContain("eski durumla kıyaslamak");
    expect(repair.dialogue[5].text).toContain("başka kontrol");
    expect(research.dialogue[3].text).toContain(
      "tek başına tüm içeriği kesin kılmaz",
    );
    expect(research.dialogue[5].text).toContain("ortak hataya");
    expect(research.evidence).toBe(research.dialogue[5].text);
    expect(interviewScene023("research", 1, 1).evidence).toBe(
      interviewScene023("research", 1, 1).dialogue[3].text,
    );
    expect(
      interviewScene023("repair", 2, 2).relations.map((r) => r.valid),
    ).toEqual([false, true]);
    expect(interviewScene023("repair", 2, 1).dialogue[3].text).toContain(
      "boyadığımı demedim",
    );
  });
  it("rejects unknown IDs, fractional controls and prototype labels without silent coercion", () => {
    for (const id of ["missing", "__proto__", "constructor", "toString", ""]) {
      expect(() => answerScene023(id)).toThrow(RangeError);
      expect(() => interviewScene023(id)).toThrow(RangeError);
    }
    for (const n of [-1, 5, 0.5, NaN, Infinity]) {
      expect(() => answerScene023("archive", n)).toThrow(RangeError);
      expect(() => answerScene023("archive", 0, n)).toThrow(RangeError);
    }
    for (const n of [-1, 3, 0.5, NaN, Infinity]) {
      expect(() => interviewScene023("repair", n)).toThrow(RangeError);
      expect(() => interviewScene023("repair", 0, n)).toThrow(RangeError);
    }
  });
  it("persists only bounded exploration and leaves all scored learning data unchanged", () => {
    const base = initialState();
    for (const lessonId of ids) {
      const row = {
        ...turkishDefaults023,
        caseId: lessonId === ids[0] ? "archive" : "repair",
        choice: 1,
        turn: 2,
        guess: lessonId === ids[0] ? "Yanıt var" : "Yeni gerekçe",
        reason:
          "Metindeki eylemi ve henüz verilmeyen gerekçeyi ayrı tutuyorum.",
        compared: true,
        show: true,
      };
      const parsed = stateSchema.parse({
        ...base,
        explorations: { [`forge023-turkish:${lessonId}`]: row },
      });
      expect({ ...parsed, explorations: {} }).toEqual({
        ...base,
        explorations: {},
      });
    }
  });
  it("renders all15 answer states and27 dialogue states using controlled exploration only", () => {
    let count = 0;
    for (const { id } of answerContexts023())
      for (let choice = 0; choice < 5; choice++) {
        harness.saved = { caseId: id, choice, selected: choice, show: true };
        const html = renderToStaticMarkup(
          createElement(Lab, { lessonId: ids[0] }),
        );
        expect(html).toContain('data-forge023="paragrafta-soru-cevap"');
        expect(html).toContain("data-answer-graph");
        expect(html).toContain(choice === 4 ? "Bilgi yok" : "Yanıt var");
        expect(html).toContain('maxLength="120"');
        expect(harness.key).toBe(`forge023-turkish:${ids[0]}`);
        count++;
      }
    for (const { id } of interviewContexts023())
      for (let choice = 0; choice < 3; choice++)
        for (let turn = 0; turn < 3; turn++) {
          harness.saved = { caseId: id, choice, turn, show: true };
          const html = renderToStaticMarkup(
            createElement(Lab, { lessonId: ids[1] }),
          );
          expect(html).toContain('data-turn="' + turn + '"');
          expect(html).toContain('data-branch="' + choice + '"');
          if (turn === 0)
            expect(html).toContain(
              "Önce seçili takip sorusunun yeni yanıtını aç.",
            );
          else
            expect(html).toContain(
              ["Verilen bilgi", "Yeni gerekçe", "Yanlış öncül"][choice],
            );
          count++;
        }
    expect(count).toBe(42);
    harness.saved = {};
  });
  it("recovers malformed saved menu values without a crash or false revealed result", () => {
    for (const id of ids) {
      harness.saved = {
        caseId: "__proto__",
        choice: Infinity,
        selected: -5,
        turn: 8,
        guess: "invalid",
        reason: "",
        compared: true,
        show: false,
      };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
      expect(html).toContain("data-forge023");
      expect(html).not.toContain('role="status"');
      expect(html).toContain("Önce kendi kararını kur");
    }
    harness.saved = {};
  });
});
