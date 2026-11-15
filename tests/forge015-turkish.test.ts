import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildTurkishScene015,
  forge015TurkishGuides,
  forge015TurkishLessons,
  forge015TurkishTopics,
  turkishCases015,
  turkishExplorationDefaults015,
} from "../src/learning/forge015Turkish";

const scene = (
  lesson: string,
  pair: string,
  changed: boolean,
  selected?: number,
) => buildTurkishScene015(lesson, pair, changed, selected);
describe("0.15 Türkçe: kök, görev, yüklem ilişkisi ve dört ayrı cümle ölçütü", () => {
  it("compares fourteen authored verbal contexts against independently specified roles", () => {
    const roles: [string, string, string][] = [
      ["eylem-adi", "İsim-fiil", "Çekimli fiil"],
      ["niteleme", "Sıfat-fiil", "Çekimli fiil"],
      ["zarf", "Zarf-fiil", "Çekimli fiil"],
      ["adlasma", "Sıfat-fiil", "Adlaşmış sıfat-fiil"],
      ["kalici", "Kalıcı ad", "İsim-fiil"],
      ["emir", "Çekimli fiil", "İsim-fiil"],
      ["ken", "Ad tabanı ve ek fiil", "Zarf-fiil"],
    ];
    for (const [pair, before, after] of roles) {
      expect(scene("fiilimsiler", pair, false).kind).toBe(before);
      expect(scene("fiilimsiler", pair, true).kind).toBe(after);
    }
    expect(scene("fiilimsiler", "kalici", false).context).toContain("yiyecek");
    expect(scene("fiilimsiler", "kalici", true).context).toContain(
      "katı hâle gelmesi",
    );
    expect(scene("fiilimsiler", "emir", true).reason).toContain("iyelik");
    expect(scene("fiilimsiler", "ken", false).reason).toContain(
      "fiilimsi değildir",
    );
  });
  it("links adjective to its noun and a verbal object's phrase to the main predicate without flattening nesting", () => {
    const adjective = scene("fiilimsiler", "niteleme", false);
    expect(adjective.sentence).toBe("Okuyacağın kitabı rafa koydum.");
    expect(adjective.relations).toEqual([
      { from: 0, to: 1, label: "Niteleme" },
      { from: 1, to: 3, label: "Nesne" },
      { from: 2, to: 3, label: "Yer" },
    ]);
    expect(adjective.tokens[1].text).toBe("kitabı");
    const nominal = scene("fiilimsiler", "kalici", true);
    expect(nominal.relations).toContainEqual({
      from: 0,
      to: 1,
      label: "Neyi?",
    });
    expect(nominal.relations).toContainEqual({ from: 2, to: 4, label: "Özne" });
  });
  it("keeps the complete compound predicate and subject phrase intact when order changes", () => {
    const first = scene("cumlenin-ogeleri", "sira", false);
    const changed = scene("cumlenin-ogeleri", "sira", true);
    expect(first.tokens.map((t) => t.role)).toEqual([
      "Özne",
      "Zarf tümleci",
      "Belirtili nesne",
      "Yer tamlayıcısı",
      "Yüklem",
    ]);
    expect(changed.tokens.map((t) => t.role)).toEqual([
      "Zarf tümleci",
      "Belirtili nesne",
      "Yer tamlayıcısı",
      "Yüklem",
      "Özne",
    ]);
    expect(first.tokens[0].text).toBe("Yeni gelen görevli");
    expect(first.tokens[4].text).toBe("teslim etti.");
    expect(changed.tokens[3].text).toBe("teslim etti");
    expect(changed.kind).toBe("Özne");
    const inverted = scene("cumle-turleri", "yer", true);
    expect(inverted.tokens[1].text).toBe("getirdi");
    expect(inverted.relations).toEqual([
      { from: 0, to: 1, label: "Nesne" },
      { from: 2, to: 1, label: "Özne" },
    ]);
    expect(changed.relations.every((r) => r.to === 3)).toBe(true);
  });
  it("distinguishes case-marked location from time and unmarked direction from dative direction", () => {
    const expected: [string, string, string][] = [
      ["nesne", "Belirtisiz nesne", "Belirtili nesne"],
      ["bulunma", "Yer tamlayıcısı", "Zarf tümleci"],
      ["yon", "Zarf tümleci", "Yer tamlayıcısı"],
      ["edilgen", "Belirtili nesne", "Sözde özne"],
      ["ile", "Zarf tümleci", "Özne"],
      ["hitap", "Cümle dışı öge", "Özne"],
    ];
    for (const [pair, a, b] of expected) {
      expect(scene("cumlenin-ogeleri", pair, false).kind).toBe(a);
      expect(scene("cumlenin-ogeleri", pair, true).kind).toBe(b);
    }
    const agent = scene("cumlenin-ogeleri", "edilgen", true, 1);
    expect(agent.kind).toBe("Zarf tümleci");
    expect(agent.reason).toContain("örtülü özne");
    expect(agent.reason).toContain("MEBİ");
    expect(
      scene("cumlenin-ogeleri", "hitap", false).relations.some(
        (r) => r.from === 0,
      ),
    ).toBe(false);
  });
  it("classifies each sentence on four separate axes and preserves the predicate-only verbal exception", () => {
    const expectations: [string, string[], string[]][] = [
      [
        "yuklem",
        ["İsim cümlesi", "Kurallı", "Olumlu", "Basit"],
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Basit"],
      ],
      [
        "yer",
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Basit"],
        ["Fiil cümlesi", "Devrik", "Olumlu", "Basit"],
      ],
      [
        "yan",
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Basit"],
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Girişik birleşik"],
      ],
      [
        "ve",
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Basit"],
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Bağlı"],
      ],
      [
        "bag",
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Sıralı"],
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Bağlı"],
      ],
      [
        "anlam",
        ["Fiil cümlesi", "Kurallı", "Olumsuz", "Basit"],
        ["Fiil cümlesi", "Kurallı", "Olumlu", "Basit"],
      ],
      [
        "istisna",
        ["İsim cümlesi", "Kurallı", "Olumlu", "Basit"],
        ["İsim cümlesi", "Kurallı", "Olumlu", "Girişik birleşik"],
      ],
    ];
    const axes = ["predicate", "position", "meaning", "structure"] as const;
    for (const [pair, before, after] of expectations)
      for (const changed of [false, true])
        for (const [i, axis] of axes.entries())
          expect(
            buildTurkishScene015(
              "cumle-turleri",
              pair,
              changed,
              undefined,
              axis,
            ).kind,
          ).toBe((changed ? after : before)[i]);
    expect(scene("cumle-turleri", "istisna", false).reason).toContain(
      "tek fiilimsi",
    );
  });
  it("validates all forty-two complete scenes, selectable tokens, graph endpoints and non-identical transformations", () => {
    let frames = 0;
    for (const lesson of forge015TurkishLessons)
      for (const pair of turkishCases015(lesson.id)) {
        expect(pair.frames[0].sentence).not.toBe(pair.frames[1].sentence);
        for (const changed of [false, true]) {
          const current = scene(lesson.id, pair.id, changed);
          expect(current.sentence.trim().length).toBeGreaterThan(12);
          expect(current.context.trim()).not.toBe("");
          expect(current.options).toContain(current.kind);
          for (const [i, token] of current.tokens.entries()) {
            expect(current.sentence).toContain(token.text);
            expect(scene(lesson.id, pair.id, changed, i).target).toBe(
              token.text,
            );
            expect(token.why.length).toBeGreaterThan(12);
          }
          for (const relation of current.relations) {
            expect(current.tokens[relation.from]).toBeDefined();
            expect(current.tokens[relation.to]).toBeDefined();
            expect(relation.from).not.toBe(relation.to);
          }
          frames++;
        }
      }
    expect(frames).toBe(42);
    expect(() => scene("uydurma", "yok", false)).toThrow(RangeError);
    expect(() => scene("fiilimsiler", "yok", false)).toThrow(RangeError);
    expect(() => scene("fiilimsiler", "emir", false, -1)).toThrow(RangeError);
    expect(() => scene("fiilimsiler", "emir", false, 0.5)).toThrow(RangeError);
    expect(() => scene("fiilimsiler", "emir", false, 99)).toThrow(RangeError);
  });
  it("persists full 120-character reasoning at the actual exploration schema boundary without touching learning ledgers", () => {
    const base = initialState();
    for (const lesson of forge015TurkishLessons)
      for (const pair of turkishCases015(lesson.id))
        for (const changed of [false, true]) {
          const current = scene(lesson.id, pair.id, changed);
          const candidate = {
            ...base,
            explorations: {
              [`forge015-turkish:${lesson.id}`]: {
                ...turkishExplorationDefaults015,
                pair: pair.id,
                changed,
                guess: current.kind,
                reason:
                  "Bu cümledeki görev, tam bağlam ve öbek ilişkisiyle açıklanır. "
                    .repeat(3)
                    .slice(0, 120),
                compared: true,
              },
            },
          };
          const parsed = stateSchema.parse(candidate);
          expect(
            parsed.explorations[`forge015-turkish:${lesson.id}`].reason,
          ).toHaveLength(120);
          expect(
            parsed.explorations[`forge015-turkish:${lesson.id}`].compared,
          ).toBe(true);
          const { explorations: _exploration, ...ledger } = parsed;
          const { explorations: _original, ...originalLedger } = base;
          expect(ledger).toEqual(originalLedger);
        }
  });
  it("supplies twenty-four deep teaching sections, twelve complete worked examples and twelve retrieval prompts", () => {
    expect(forge015TurkishTopics).toEqual({
      fiilimsiler: "detail-260",
      "cumlenin-ogeleri": "detail-261",
      "cumle-turleri": "detail-262",
    });
    expect(forge015TurkishGuides).toHaveLength(3);
    for (const guide of forge015TurkishGuides) {
      expect(guide.sections).toHaveLength(8);
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        for (const paragraph of section.paragraphs)
          expect(paragraph.length).toBeGreaterThan(200);
      }
      expect(guide.examples).toHaveLength(4);
      for (const example of guide.examples) {
        expect(example.steps).toHaveLength(3);
        expect(example.answer.trim()).not.toBe("");
        expect(example.check.trim()).not.toBe("");
        expect(example.pitfall.trim()).not.toBe("");
      }
      expect(guide.recall).toHaveLength(4);
      expect(
        forge015TurkishLessons
          .find((l) => l.id === guide.id)!
          .body.map((b) => b.text.tr),
      ).toEqual(guide.sections.map((s) => s.paragraphs.join("\n\n")));
    }
  });
  it("keeps all thirty original five-choice cards self-contained with exact reviewed keys and explanations", () => {
    const ids = new Set<string>();
    for (const lesson of forge015TurkishLessons) {
      expect(lesson.questions).toHaveLength(10);
      expect(lesson.questions.map((q) => q.answer)).toEqual([
        0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
      ]);
      for (const question of lesson.questions) {
        expect(questionContentIssues(question)).toEqual([]);
        expect(question.options).toHaveLength(5);
        expect(new Set(question.options.map((o) => o.tr)).size).toBe(5);
        expect(
          [question.prompt.tr, ...question.options.map((o) => o.tr)].join(" "),
        ).toContain("“");
        expect(question.hint.tr.trim().length).toBeGreaterThan(12);
        expect(question.explanation.tr.length).toBeGreaterThan(100);
        expect(question.skill).toBe(lesson.id);
        expect(ids.has(question.id)).toBe(false);
        ids.add(question.id);
      }
    }
    expect(ids.size).toBe(30);
  });
});
