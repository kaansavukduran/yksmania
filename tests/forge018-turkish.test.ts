import { describe, expect, it } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildTurkishScene018,
  forge018TurkishGuides,
  forge018TurkishLessons,
  forge018TurkishTopics,
  turkishCases018,
  turkishExplorationDefaults018,
} from "../src/learning/forge018Turkish";
const scene = (id: string, pair: string, changed = false) =>
  buildTurkishScene018(id, pair, changed);
const idiom = (pair: string, changed = false) =>
  scene("deyimler-ve-atasozleri", pair, changed);
const sentence = (pair: string, changed = false) =>
  scene("cumlede-anlam", pair, changed);
const paragraph = (pair: string, changed = false) =>
  scene("paragrafa-giris", pair, changed);

describe("Türkçe 018: kalıp, yargı yönü ve tam paragraf bağları", () => {
  it("distinguishes reputation loss from unnoticed detail and a dictionary infinitive from the actual finite verb", () => {
    expect(idiom("goz").decision).toBe("Değer yitirme");
    expect(idiom("goz", true).decision).toBe("Fark edilmeme");
    expect(idiom("goz").nodes[2].text).toBe(
      "Kişi, ekibin gözünde değer yitirdi.",
    );
    expect(idiom("goz", true).nodes[2].text).toBe(
      "Okuyanlar yanlışı fark etmedi.",
    );
    expect(idiom("cekim").decision).toBe("Mastar biçimi");
    expect(idiom("cekim", true).decision).toBe("Çekimli fiil");
    expect(idiom("cekim", true).nodes[0].text).toBe(
      "Düştü görülen geçmiş zamanla çekimlidir.",
    );
    expect(idiom("cekim", true).reason).toContain("mastar değildir");
  });
  it("requires the actual small-contribution process instead of inferring it from any large purchase", () => {
    expect(idiom("birikim").sentence).toContain("Her gün küçük");
    expect(idiom("birikim").relations.every((r) => r.valid)).toBe(true);
    expect(idiom("birikim", true).sentence).toContain("bir defada");
    expect(idiom("birikim", true).relations).toContainEqual({
      source: 1,
      target: 2,
      label: "Birikim kanıtı yok",
      valid: false,
    });
    expect(idiom("birikim", true).decision).toBe("Birikim kanıtı yok");
    expect(idiom("islev").decision).toBe("Belirli durum");
    expect(idiom("islev", true).decision).toBe("Genel öğüt");
  });
  it("changes causal, goal and inference roles without inventing a successful goal or treating the sign as physical cause", () => {
    expect(sentence("icin").relations).toEqual([
      { source: 0, target: 1, label: "Neden → sonuç", valid: true },
    ]);
    expect(sentence("icin", true).relations).toEqual([
      { source: 0, target: 1, label: "Eylem → hedef", valid: true },
    ]);
    expect(sentence("icin", true).decision).toBe("Amaç");
    expect(sentence("icin", true).reason).toContain("ayrıca verilmez");
    expect(sentence("yon").decision).toBe("Nedenden sonuca");
    expect(sentence("yon", true).decision).toBe("Veriden çıkarıma");
    expect(sentence("yon", true).nodes[0].text).toBe(
      "Kapıda bakım levhası var.",
    );
    expect(sentence("yon", true).reason).toContain(
      "fiziksel neden diye verilmez",
    );
  });
  it("does not turn a condition into an accomplished event or some into all", () => {
    expect(sentence("kosul").decision).toBe("Koşul var");
    expect(sentence("kosul", true).decision).toBe("Gerçek neden");
    expect(sentence("kosul").evidence).toContain(
      "Her -sa eki aynı işlevi taşımaz.",
    );
    expect(sentence("kapsam").decision).toBe("Alt küme bilgisi");
    expect(sentence("kapsam").reason).toContain(
      "kalanların kesin yürümediği de tek başına çıkmaz",
    );
    expect(sentence("kapsam", true).decision).toBe("Bütün grup bilgisi");
    expect(sentence("kapsam", true).reason).toContain("grubun dışında");
  });
  it("reorders real full sentences and reattaches the antecedent links to their new positions", () => {
    expect(paragraph("etiket").nodes.map((n) => n.label)).toEqual([
      "Cümle A",
      "Cümle B",
      "Cümle C",
    ]);
    expect(paragraph("etiket").relations[0]).toEqual({
      source: 1,
      target: 0,
      label: "Etiketlerin öncülü",
      valid: false,
    });
    const fixed = paragraph("etiket", true);
    expect(fixed.nodes.map((n) => n.label)).toEqual([
      "Cümle B",
      "Cümle A",
      "Cümle C",
    ]);
    expect(fixed.relations).toEqual([
      { source: 0, target: 1, label: "Etiketlerin öncülü", valid: true },
      { source: 1, target: 2, label: "Hızlanmanın sonucu", valid: true },
    ]);
    expect(fixed.sentence).toBe(fixed.nodes.map((n) => n.text).join(" "));
    expect(paragraph("kisi", true).nodes.map((n) => n.label)).toEqual([
      "Cümle B",
      "Cümle C",
      "Cümle A",
    ]);
    expect(paragraph("kisi", true).nodes[0].text).toBe(
      "Sabah arşiv kapısında sıraya girdim.",
    );
    for (const id of ["etiket", "fide", "ornek", "kisi"]) {
      expect(paragraph(id).relations.some((r) => !r.valid)).toBe(true);
      expect(paragraph(id, true).relations.every((r) => r.valid)).toBe(true);
      expect(paragraph(id, true).evidence).toContain(
        "Her iki komşu bağ tam metinde birlikte korunur.",
      );
    }
  });
  it("has twenty-four bounded contexts with valid visible targets and schema-safe durable exploration that changes no learning ledger", () => {
    const base = initialState();
    let count = 0;
    for (const lesson of forge018TurkishLessons)
      for (const pair of turkishCases018(lesson.id))
        for (const changed of [false, true]) {
          const value = scene(lesson.id, pair.id, changed);
          expect(value.sentence.length).toBeGreaterThan(20);
          expect(value.context.length).toBeGreaterThan(30);
          expect(value.options).toHaveLength(2);
          expect(value.options).toContain(value.decision);
          for (const [i, node] of value.nodes.entries()) {
            expect(node.text.trim()).not.toBe("");
            expect(node.label.length).toBeLessThanOrEqual(18);
            expect(
              buildTurkishScene018(lesson.id, pair.id, changed, i).target,
            ).toEqual(node);
          }
          for (const link of value.relations) {
            expect(value.nodes[link.source]).toBeDefined();
            expect(value.nodes[link.target]).toBeDefined();
            expect(link.source).not.toBe(link.target);
          }
          const parsed = stateSchema.parse({
            ...base,
            explorations: {
              [`forge018-turkish:${lesson.id}`]: {
                ...turkishExplorationDefaults018,
                pair: pair.id,
                changed,
                guess: value.decision,
                reason:
                  "Bu tam bağlamda öncül, sonuç, amaç ve sözün kapsamını koruyorum. "
                    .repeat(3)
                    .slice(0, 120),
                compared: true,
              },
            },
          });
          for (const item of Object.values(
            parsed.explorations[`forge018-turkish:${lesson.id}`],
          ))
            if (typeof item === "string")
              expect(item.length).toBeLessThanOrEqual(120);
          const { explorations: _a, ...rest } = parsed,
            { explorations: _b, ...original } = base;
          expect(rest).toEqual(original);
          count++;
        }
    expect(count).toBe(24);
    expect(() => scene("yok", "goz")).toThrow(RangeError);
    expect(() => idiom("yok")).toThrow(RangeError);
    for (const index of [-1, 0.5, 999, NaN])
      expect(() =>
        buildTurkishScene018("cumlede-anlam", "icin", false, index),
      ).toThrow(RangeError);
    expect(() =>
      buildTurkishScene018(
        "cumlede-anlam",
        "icin",
        "false" as unknown as boolean,
      ),
    ).toThrow(RangeError);
  });
  it("teaches all forty-nine sections in full and includes twelve real three-step solutions and the source exceptions", () => {
    expect(forge018TurkishTopics).toEqual({
      "deyimler-ve-atasozleri": "detail-267",
      "cumlede-anlam": "detail-268",
      "paragrafa-giris": "detail-269",
    });
    expect(forge018TurkishGuides.map((g) => g.sections.length)).toEqual([
      12, 21, 16,
    ]);
    for (const guide of forge018TurkishGuides) {
      expect(guide.examples).toHaveLength(4);
      expect(guide.recall).toHaveLength(4);
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        for (const p of section.paragraphs)
          expect(p.length).toBeGreaterThan(250);
      }
      for (const example of guide.examples) {
        expect(example.steps).toHaveLength(3);
        for (const step of example.steps)
          expect(step.explanation.length).toBeGreaterThan(50);
        for (const field of [
          example.prompt,
          example.answer,
          example.check,
          example.pitfall,
        ])
          expect(field.trim()).not.toBe("");
      }
      expect(
        forge018TurkishLessons
          .find((l) => l.id === guide.id)!
          .body.map((b) => b.text.tr),
      ).toEqual(guide.sections.map((s) => s.paragraphs.join("\n\n")));
    }
    const text = forge018TurkishGuides
      .flatMap((g) => g.sections.flatMap((s) => s.paragraphs))
      .join(" ");
    for (const boundary of [
      "cümle biçimindedir",
      "bilimsel ve istisnasız",
      "başarı ayrıca doğrulanır",
      "geri kalanların kesinlikle yürümediğini kanıtlamaz",
      "aynı cümlede",
      "her tekrar kusur",
    ])
      expect(text.toLocaleLowerCase("tr-TR")).toContain(
        boundary.toLocaleLowerCase("tr-TR"),
      );
  });
  it("keeps thirty five-choice original cards self-contained with actual passage fields and literal independently read answer text", () => {
    const answers = [
      [
        "Gözetmek ve ilgilenmek.",
        "Fark edilmedi.",
        "Her gün ayırdığı küçük miktarlarla aylar sonra bisiklet alması.",
        "Harcamalarını imkânına göre düzenlemesi.",
        "Düştü çekimli fiildir; temel deyim anlamı korunmuştur.",
        "Tam cümle biçiminde kullanılan bir deyimdir.",
        "Mecazlı olabilir; yerleşik deyim olduğu tek başına gösterilmemiştir.",
        "Aynı sözcüğün tekrarıyla oluşan, yavaşlığı güçlendiren ikilemedir.",
        "Eli ayağına dolaşmak.",
        "Uygun kişi ve zaman çekimi yapılabilir; kalıp sözcükleri keyfî eş anlamlılarla değiştirilemez.",
      ],
      [
        "Dosya hedefi gerçekleştirmek amacıyla açılmıştır; kaydın bulunduğu ayrıca bildirilmemiştir.",
        "Otobüsün arızalanması → yolcuların beklemesi.",
        "Katılma, bilet bulma koşuluna bağlanmıştır.",
        "İçeride çalışma olduğu çıkarımına dayanak oluşturan işarettir.",
        "Yürüyerek gelen öğrenci sayısı üçten az değildir.",
        "Öykü üç bölümden oluşuyor.",
        "İçerik göç eden ailenin yaşamı; biçem kısa cümleler kullanımıdır.",
        "Yeterince incelemeden verilmiş ön yargı.",
        "Keşke ona o kırıcı sözü söylemeseydim.",
        "Görünen övgünün tersini kastederek alaylı eleştiri yapmak.",
      ],
      [
        "Sabah arşiv kapısında sıraya girdim.",
        "B → A → C.",
        "Arşiv belgelerinin erişilebilir biçimde düzenlenmesi.",
        "Arşivlerde belgeyi saklamak, düzenli erişim imkânıyla tamamlanmalıdır.",
        "IV.",
        "Bu belgeler ifadesinin ilişkili olduğu belgeler aynı cümlede tanıtılmıştır; yalnız bu sözcüğü nedeniyle giriş yasaklanamaz.",
        "II’den sonra, III’ten önce.",
        "III.",
        "En azından bazı belgeler sayısallaştırılmıştır.",
        "Arşivde Erişimi Kolaylaştırmak.",
      ],
    ];
    const ids = new Set<string>();
    for (const [pack, lesson] of forge018TurkishLessons.entries()) {
      expect(lesson.questions).toHaveLength(10);
      expect(lesson.questions[0].passage?.tr.length).toBeGreaterThan(40);
      for (const [index, q] of lesson.questions.entries()) {
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.options[q.answer].tr).toBe(answers[pack][index]);
        expect(q.hint.tr.length).toBeGreaterThan(20);
        expect(q.explanation.tr.length).toBeGreaterThan(100);
        expect(q.skill).toBe(lesson.id);
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
      }
      for (let answer = 0; answer < 5; answer++)
        expect(
          lesson.questions.filter((q) => q.answer === answer),
        ).toHaveLength(2);
    }
    expect(ids.size).toBe(30);
  });
});
