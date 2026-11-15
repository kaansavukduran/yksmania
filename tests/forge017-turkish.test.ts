import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildTurkishScene017,
  forge017TurkishGuides,
  forge017TurkishLessons,
  forge017TurkishTopics,
  turkishCases017,
  turkishExplorationDefaults017,
} from "../src/learning/forge017Turkish";
const repair = (id: string, changed = false) =>
  buildTurkishScene017("anlatim-bozukluklari", id, changed);
const meaning = (id: string, changed = false) =>
  buildTurkishScene017("sozcukte-anlam", id, changed);

describe("0.17 Türkçe: açık amaçla onarım ve bağlamdan anlam", () => {
  it("requires the second verb's own case but allows an actually shared accusative object", () => {
    expect(repair("hal").sentence).toBe("Komşumu gördüm ve güvendim.");
    expect(repair("hal").relations).toContainEqual({
      from: 0,
      to: 3,
      label: "Bu biçim kime sorusuna uymaz",
      ok: false,
    });
    const fixed = repair("hal", true);
    expect(fixed.sentence).toBe("Komşumu gördüm ve ona güvendim.");
    expect(fixed.relations).toContainEqual({
      from: 0,
      to: 1,
      label: "Kimi gördüm?",
      ok: true,
    });
    expect(fixed.relations).toContainEqual({
      from: 3,
      to: 4,
      label: "Kime güvendim?",
      ok: true,
    });
    expect(
      repair("ortak")
        .relations.filter((link) => link.from === 0)
        .map((link) => link.to),
    ).toEqual([1, 3]);
    expect(repair("ortak").relations.every((link) => link.ok)).toBe(true);
    expect(repair("ortak").reason).toContain(
      "İkinci kez dosyayı yazmak şart değildir",
    );
  });
  it("changes the actual attachment target without labeling every new workshop sentence ungrammatical", () => {
    expect(repair("yer").sentence).toBe("Yeni atölyeye girdim.");
    expect(repair("yer").context).toContain("girişin az önce");
    expect(repair("yer").reason).toContain("kendi başına bozuk değildir");
    expect(repair("yer").relations).toContainEqual({
      from: 0,
      to: 1,
      label: "Atölyeyi niteleme",
      ok: true,
    });
    expect(repair("yer", true).sentence).toBe("Atölyeye yeni girdim.");
    expect(repair("yer", true).relations).toContainEqual({
      from: 1,
      to: 2,
      label: "Ne zaman?",
      ok: true,
    });
  });
  it("preserves intended approximation and past polarity while removing only the mismatched claim", () => {
    expect(repair("yaklasik").context).toContain("on dakika dolayını");
    expect(repair("yaklasik").relations.some((link) => !link.ok)).toBe(true);
    expect(repair("yaklasik", true).sentence).toBe(
      "İş yaklaşık on dakika sürdü.",
    );
    expect(repair("yaklasik", true).relations.every((link) => link.ok)).toBe(
      true,
    );
    expect(repair("ekfiil", true).sentence).toBe(
      "Konusu ilginçti, dili sade değildi.",
    );
    expect(repair("ekfiil", true).evidence).toContain(
      "Olumsuzluk yalnız ikinci niteliğe gider.",
    );
    expect(repair("tekrar").context).toContain("sanatsal vurgu");
    expect(repair("tekrar", true).sentence).toBe("Öyküyü tekrar okudum.");
  });
  it("applies first-person priority and retains both inflections under explicitly authored personification", () => {
    expect(repair("kisi").tokens[4]).toBe("geldiniz.");
    expect(repair("kisi", true).tokens[4]).toBe("geldik.");
    expect(repair("kisi", true).evidence).toContain("Sen ve ben → biz.");
    expect(repair("masal").decision).toBe("Bu örnekte tekil yüklem");
    expect(repair("masal", true).decision).toBe("Bu örnekte çoğul yüklem");
    expect(repair("masal").context).toContain("masaldır");
    expect(repair("masal", true).relations.every((link) => link.ok)).toBe(true);
    expect(repair("masal", true).reason).toContain("otomatik yanlış sayılmaz");
  });
  it("distinguishes independently specified meaning dimensions and fixes the actual source table's reversed transfer directions", () => {
    const expectations: [string, string, string][] = [
      ["soguk", "Gerçek sıcaklık", "Mecazlı tavır"],
      ["agir", "Bu bağlamda karşıtı hafif", "Bu bağlamda karşıtı hızlı"],
      ["taban", "Günlük eşya parçası", "Geometriye özgü terim"],
      ["derin", "Ölçülen boyut: nicel", "Duygu niteliği: nitel"],
      ["kapsam", "Kuş daha genel kapsamlı", "Serçe daha özel kapsamlı"],
      ["cay", "İçecek adı çay", "Akarsu adı çay"],
      ["tatli", "Tat alma alanında gerçek", "Tatmadan işitmeye aktarım"],
      ["yon", "Doğadan insana aktarım", "İnsandan doğaya aktarım"],
    ];
    for (const [id, before, after] of expectations) {
      expect(meaning(id).decision).toBe(before);
      expect(meaning(id, true).decision).toBe(after);
    }
    expect(meaning("yon").sentence).toBe("Kaptan öfkeyle esip gürledi.");
    expect(meaning("yon").relations).toContainEqual({
      from: 2,
      to: 0,
      label: "Doğa → insan",
      ok: true,
    });
    expect(meaning("yon", true).sentence).toBe(
      "Ağaç sabah ışığında gülümsedi.",
    );
    expect(meaning("yon", true).relations).toContainEqual({
      from: 2,
      to: 0,
      label: "İnsan → doğa",
      ok: true,
    });
    expect(
      meaning("kapsam").relations.map((link) => [link.from, link.to]),
    ).toEqual([
      [0, 1],
      [0, 2],
    ]);
    expect(meaning("kapsam", true).reason).toContain("özel ad demek değildir");
  });
  it("validates all thirty-two controlled contexts and schema-safe exploration values without changing any learning ledger", () => {
    const base = initialState();
    let frames = 0;
    for (const lesson of forge017TurkishLessons)
      for (const pair of turkishCases017(lesson.id))
        for (const changed of [false, true]) {
          const scene = buildTurkishScene017(lesson.id, pair.id, changed);
          expect(scene.sentence).toMatch(/\S+\s+\S+[.!?]$/u);
          expect(scene.context.trim().length).toBeGreaterThan(20);
          expect(scene.options).toHaveLength(2);
          expect(scene.options).toContain(scene.decision);
          expect(
            scene.groups
              .flatMap((group) => group.members)
              .sort((a, b) => a - b),
          ).toEqual(scene.tokens.map((_, index) => index));
          for (const [i, token] of scene.tokens.entries())
            expect(
              buildTurkishScene017(lesson.id, pair.id, changed, i).target,
            ).toBe(token);
          for (const link of scene.relations) {
            expect(scene.tokens[link.from]).toBeDefined();
            expect(scene.tokens[link.to]).toBeDefined();
            expect(link.from).not.toBe(link.to);
          }
          const candidate = {
            ...base,
            explorations: {
              [`forge017-turkish:${lesson.id}`]: {
                ...turkishExplorationDefaults017,
                pair: pair.id,
                changed,
                guess: scene.decision,
                reason:
                  "Tam cümlede amaç, anlam ve bağ korunmalıdır. Hangi ögenin hangi söze bağlandığını kendi açıklamamla denetliyorum. "
                    .repeat(2)
                    .slice(0, 120),
                compared: true,
              },
            },
          };
          const parsed = stateSchema.parse(candidate),
            values = parsed.explorations[`forge017-turkish:${lesson.id}`];
          expect(values.reason).toHaveLength(120);
          expect(values.guess).toBe(scene.decision);
          expect(values.compared).toBe(true);
          for (const value of Object.values(values))
            if (typeof value === "string")
              expect(value.length).toBeLessThanOrEqual(120);
          const { explorations: _a, ...ledger } = parsed,
            { explorations: _b, ...original } = base;
          expect(ledger).toEqual(original);
          frames++;
        }
    expect(frames).toBe(32);
    expect(() => buildTurkishScene017("yok", "hal", false)).toThrow(RangeError);
    expect(() => repair("yok")).toThrow(RangeError);
    for (const index of [-1, 0.5, 999])
      expect(() =>
        buildTurkishScene017("anlatim-bozukluklari", "hal", false, index),
      ).toThrow(RangeError);
    expect(() =>
      buildTurkishScene017(
        "anlatim-bozukluklari",
        "hal",
        "false" as unknown as boolean,
      ),
    ).toThrow(RangeError);
  });
  it("contains thirty-nine deep sections and twelve complete three-step worked examples with explicit exceptions", () => {
    expect(forge017TurkishTopics).toEqual({
      "anlatim-bozukluklari": "detail-265",
      "sozcukte-anlam": "detail-266",
    });
    expect(forge017TurkishGuides.map((guide) => guide.sections.length)).toEqual(
      [18, 21],
    );
    for (const guide of forge017TurkishGuides) {
      expect(guide.examples).toHaveLength(6);
      expect(guide.recall).toHaveLength(6);
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        for (const paragraph of section.paragraphs)
          expect(paragraph.length).toBeGreaterThan(250);
      }
      for (const example of guide.examples) {
        expect(example.steps).toHaveLength(3);
        for (const step of example.steps)
          expect(step.explanation.length).toBeGreaterThan(40);
        for (const field of [example.answer, example.check, example.pitfall])
          expect(field.trim()).not.toBe("");
      }
      expect(
        forge017TurkishLessons
          .find((lesson) => lesson.id === guide.id)!
          .body.map((block) => block.text.tr),
      ).toEqual(
        guide.sections.map((section) => section.paragraphs.join("\n\n")),
      );
    }
    const teaching = forge017TurkishGuides
      .flatMap((guide) =>
        guide.sections.flatMap((section) => section.paragraphs),
      )
      .join(" ");
    for (const boundary of [
      "şüphe etmek",
      "kişileştirme",
      "tek eksen değildir",
      "her tekrar otomatik hata değildir",
    ])
      expect(teaching.toLocaleLowerCase("tr-TR")).toContain(boundary);
  });
  it("keeps all twenty original cards self-contained, with real passages and balanced but nonperiodic answer positions", () => {
    const keys = [
        [2, 0, 4, 1, 3, 1, 4, 0, 3, 2],
        [3, 1, 4, 0, 2, 4, 2, 0, 1, 3],
      ],
      ids = new Set<string>();
    for (const [index, lesson] of forge017TurkishLessons.entries()) {
      expect(lesson.questions).toHaveLength(10);
      expect(lesson.questions.map((question) => question.answer)).toEqual(
        keys[index],
      );
      expect(lesson.questions[0].passage?.tr.length).toBeGreaterThan(70);
      for (const question of lesson.questions) {
        expect(questionContentIssues(question), question.id).toEqual([]);
        expect(question.options).toHaveLength(5);
        expect(new Set(question.options.map((option) => option.tr)).size).toBe(
          5,
        );
        expect(question.hint.tr.length).toBeGreaterThan(20);
        expect(question.explanation.tr.length).toBeGreaterThan(100);
        expect(question.skill).toBe(lesson.id);
        expect(ids.has(question.id)).toBe(false);
        ids.add(question.id);
      }
      for (let answer = 0; answer < 5; answer++)
        expect(
          lesson.questions.filter((question) => question.answer === answer),
        ).toHaveLength(2);
    }
    expect(ids.size).toBe(20);
  });
});
