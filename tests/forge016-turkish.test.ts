import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildTurkishScene016,
  forge016TurkishGuides,
  forge016TurkishLessons,
  forge016TurkishTopics,
  turkishCases016,
  turkishExplorationDefaults016,
} from "../src/learning/forge016Turkish";
const spelling = (pair: string, changed = false) =>
  buildTurkishScene016("yazim-kurallari", pair, changed);
const punctuation = (pair: string, changed = false) =>
  buildTurkishScene016("noktalama-isaretleri", pair, changed);

describe("0.16 Türkçe: söz sınırı ve noktalamanın gerçek anlam ilişkileri", () => {
  it("joins case and adjective suffixes but keeps additive and clause conjunctions separate", () => {
    expect(spelling("de").sentence).toBe("Duvarda bir saat var.");
    expect(spelling("de").words[0].text).toBe("Duvarda");
    expect(spelling("de").words[0].joined).toBe(true);
    expect(spelling("de", true).sentence).toBe("Duvar da boyandı.");
    expect(spelling("de", true).words.map((group) => group.text)).toEqual([
      "Duvar",
      "da",
      "boyandı.",
    ]);
    expect(spelling("ki").words[0].text).toBe("Evdeki");
    expect(spelling("ki").relations).toContainEqual({
      from: 2,
      to: 3,
      label: "Niteleme",
    });
    expect(spelling("ki", true).words.map((group) => group.text)).toEqual([
      "Belli",
      "ki",
      "anahtar",
      "kayıp.",
    ]);
    expect(spelling("ki", true).decision).toBe("Yargı bağlacı ayrı");
  });
  it("separates pronominal ki, question attachment, emphasis and actual lexical word boundaries", () => {
    expect(spelling("ilgi").words[0].text).toBe("Benimki");
    expect(spelling("ilgi").decision).toBe("İlgi zamiri bitişik");
    expect(spelling("ilgi", true).decision).toBe("Yargı bağlacı ayrı");
    expect(spelling("mi").words.map((group) => group.text)).toEqual([
      "Hazır",
      "mısın?",
    ]);
    expect(spelling("mi", true).words.map((group) => group.text)).toEqual([
      "Güzel",
      "mi",
      "güzel!",
    ]);
    expect(spelling("mi", true).reason).toContain("pekiştirme");
    expect(spelling("ses").words[1].text).toBe("affetmek");
    expect(spelling("ses").relations).toContainEqual({
      from: 2,
      to: 1,
      label: "Türeyen f sesi",
    });
    expect(
      spelling("ses", true)
        .words.slice(0, 2)
        .map((group) => group.text),
    ).toEqual(["Not", "etmek"]);
    expect(
      spelling("birtakim")
        .words.slice(0, 3)
        .map((group) => group.text),
    ).toEqual(["Bir", "takım", "forma"]);
    expect(spelling("birtakim", true).words[0].text).toBe("Birtakım");
    expect(spelling("tarih").tokens[2]).toBe("Mayıs");
    expect(spelling("tarih", true).tokens[1]).toBe("mayıs");
  });
  it("changes the actual adjective/subject graph when comma placement changes", () => {
    const before = punctuation("virgul"),
      after = punctuation("virgul", true);
    expect(before.sentence).toBe("Yaralı, adama seslendi.");
    expect(before.groups.map((group) => group.members)).toEqual([
      [0],
      [1],
      [2],
    ]);
    expect(before.relations).toEqual([
      { from: 0, to: 2, label: "Özne" },
      { from: 1, to: 2, label: "Yer tamlayıcısı" },
    ]);
    expect(after.sentence).toBe("Yaralı adama seslendi.");
    expect(after.groups[0].members).toEqual([0, 1]);
    expect(after.relations).toEqual([
      { from: 0, to: 1, label: "Niteleme" },
      { from: 1, to: 2, label: "Yer tamlayıcısı" },
    ]);
    expect(after.reason).toContain("özne bu cümlede açık değildir");
  });
  it("moves only Can between real team groups and distinguishes direct questions from known indirect content", () => {
    expect(punctuation("takim").groups.map((group) => group.members)).toEqual([
      [0, 1],
      [2, 3],
    ]);
    expect(
      punctuation("takim", true).groups.map((group) => group.members),
    ).toEqual([[0], [1, 2, 3]]);
    expect(punctuation("takim", true).words[1].text).toBe("Can Ada Deniz");
    expect(punctuation("takim", true).relations).toEqual([
      { from: 1, to: 2, label: "Aynı takım" },
      { from: 2, to: 3, label: "Aynı takım" },
    ]);
    expect(punctuation("soru").decision).toBe("Doğrudan soru: soru işareti");
    expect(punctuation("soru", true).decision).toBe(
      "Dolaylı soru içinde bildirme: nokta",
    );
    expect(punctuation("soru", true).relations).toContainEqual({
      from: 1,
      to: 2,
      label: "Bilinen içerik",
    });
    expect(punctuation("arasoz").relations).toContainEqual({
      from: 1,
      to: 0,
      label: "Ece’yi açıklar",
    });
    expect(punctuation("arasoz", true).relations).toContainEqual({
      from: 0,
      to: 1,
      label: "Niteleme",
    });
  });
  it("checks every complete authored frame, word partition and selected relation endpoint without pretending to parse free text", () => {
    let frames = 0;
    for (const lesson of forge016TurkishLessons)
      for (const pair of turkishCases016(lesson.id)) {
        expect(pair.frames[0].sentence).not.toBe(pair.frames[1].sentence);
        for (const changed of [false, true]) {
          const scene = buildTurkishScene016(lesson.id, pair.id, changed);
          expect(scene.sentence).toMatch(/\S+\s+\S+[.!?]$/u);
          expect(scene.context.trim().length).toBeGreaterThan(20);
          expect(scene.options).toContain(scene.decision);
          expect(scene.options).toHaveLength(2);
          expect(
            scene.groups
              .flatMap((group) => group.members)
              .sort((a, b) => a - b),
          ).toEqual(scene.tokens.map((_, i) => i));
          for (const [i, token] of scene.tokens.entries())
            expect(
              buildTurkishScene016(lesson.id, pair.id, changed, i).target,
            ).toBe(token);
          for (const relation of scene.relations) {
            expect(scene.tokens[relation.from]).toBeDefined();
            expect(scene.tokens[relation.to]).toBeDefined();
            expect(relation.from).not.toBe(relation.to);
          }
          frames++;
        }
      }
    expect(frames).toBe(22);
    expect(() => buildTurkishScene016("yok", "de", false)).toThrow(RangeError);
    expect(() => spelling("yok")).toThrow(RangeError);
    for (const index of [-1, 0.5, 999])
      expect(() =>
        buildTurkishScene016("yazim-kurallari", "de", false, index),
      ).toThrow(RangeError);
    expect(() =>
      buildTurkishScene016(
        "yazim-kurallari",
        "de",
        "false" as unknown as boolean,
      ),
    ).toThrow(RangeError);
  });
  it("persists all 120 reasoning characters and every decision using the real schema while leaving every learning ledger unchanged", () => {
    const base = initialState();
    for (const lesson of forge016TurkishLessons)
      for (const pair of turkishCases016(lesson.id))
        for (const changed of [false, true]) {
          const scene = buildTurkishScene016(lesson.id, pair.id, changed);
          const candidate = {
            ...base,
            explorations: {
              [`forge016-turkish:${lesson.id}`]: {
                ...turkishExplorationDefaults016,
                pair: pair.id,
                changed,
                guess: scene.decision,
                reason:
                  "Anlam, söz sınırı ve cümle bağını tam bağlamla karşılaştırıyorum. "
                    .repeat(3)
                    .slice(0, 120),
                compared: true,
              },
            },
          };
          const parsed = stateSchema.parse(candidate),
            exploration = parsed.explorations[`forge016-turkish:${lesson.id}`];
          expect(exploration.reason).toHaveLength(120);
          expect(exploration.guess).toBe(scene.decision);
          expect(exploration.compared).toBe(true);
          for (const value of Object.values(exploration))
            if (typeof value === "string")
              expect(value.length).toBeLessThanOrEqual(120);
          const { explorations: _a, ...ledger } = parsed,
            { explorations: _b, ...original } = base;
          expect(ledger).toEqual(original);
        }
  });
  it("provides deep original teaching with twelve worked solutions and explicit source exceptions", () => {
    expect(forge016TurkishTopics).toEqual({
      "yazim-kurallari": "detail-263",
      "noktalama-isaretleri": "detail-264",
    });
    expect(forge016TurkishGuides.map((guide) => guide.sections.length)).toEqual(
      [20, 18],
    );
    for (const guide of forge016TurkishGuides) {
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        for (const paragraph of section.paragraphs)
          expect(paragraph.length).toBeGreaterThan(250);
      }
      expect(guide.examples).toHaveLength(6);
      expect(guide.recall).toHaveLength(6);
      for (const example of guide.examples) {
        expect(example.steps).toHaveLength(3);
        for (const step of example.steps)
          expect(step.explanation.trim().length).toBeGreaterThan(40);
        expect(example.answer.trim()).not.toBe("");
        expect(example.check.trim()).not.toBe("");
        expect(example.pitfall.trim()).not.toBe("");
      }
      expect(
        forge016TurkishLessons
          .find((lesson) => lesson.id === guide.id)!
          .body.map((block) => block.text.tr),
      ).toEqual(
        guide.sections.map((section) => section.paragraphs.join("\n\n")),
      );
    }
    const spellingText = forge016TurkishGuides[0].sections
      .flatMap((section) => section.paragraphs)
      .join(" ");
    for (const term of [
      "illaki",
      "iken",
      "m²ye",
      "Düzeltme işareti",
      "birtakım",
    ])
      expect(spellingText).toContain(term);
    const punctuationText = forge016TurkishGuides[1].sections
      .flatMap((section) => section.paragraphs)
      .join(" ");
    for (const term of ["Avrupa Birliği’ne", "eş görevli", "ara söz", "kurum"])
      expect(punctuationText).toContain(term);
  });
  it("keeps all twenty five-choice questions self-contained with complete reasons and original stable identities", () => {
    const ids = new Set<string>();
    for (const lesson of forge016TurkishLessons) {
      expect(lesson.questions).toHaveLength(10);
      expect(lesson.questions.map((question) => question.answer)).toEqual([
        0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
      ]);
      for (const question of lesson.questions) {
        expect(questionContentIssues(question)).toEqual([]);
        expect(question.options).toHaveLength(5);
        expect(new Set(question.options.map((option) => option.tr)).size).toBe(
          5,
        );
        expect(question.hint.tr.length).toBeGreaterThan(25);
        expect(question.explanation.tr.length).toBeGreaterThan(100);
        expect(question.skill).toBe(lesson.id);
        expect(ids.has(question.id)).toBe(false);
        ids.add(question.id);
      }
    }
    expect(ids.size).toBe(20);
  });
});
