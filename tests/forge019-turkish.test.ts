import { describe, it, expect } from "vitest";
import { initialState, stateSchema } from "../src/domain/model";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  buildTurkishScene019 as scene,
  turkishCases019,
  forge019TurkishLessons,
  forge019TurkishGuides,
  forge019TurkishGuideExtensions,
  forge019TurkishTopics,
  turkishExplorationDefaults019,
} from "../src/learning/forge019Turkish";

describe("Türkçe 019: kanıt, paragraf sınırı ve çıkarma deneyi", () => {
  it("separates unsupported comparison, an explicitly contradicted total and directly supported weekly activity", () => {
    const s = (n: number) => scene("yardimci-dusunce", "kutuphane", n);
    expect(s(0).decision).toBe("Kanıt yetmez");
    expect(s(0).reason).toContain("başka bir kütüphane");
    expect(s(1).decision).toBe("Destek var");
    expect(s(1).relations).toEqual([
      { source: 2, target: 3, label: "İddiaya kanıt", valid: true },
    ]);
    expect(s(1).nodes[3].text).toBe(
      "Çocuklar için düzenli bir etkinlik başladı.",
    );
    expect(s(2).decision).toBe("Metinle çelişiyor");
    expect(s(2).relations[0]).toEqual({
      source: 1,
      target: 3,
      label: "İddiaya aykırı bilgi",
      valid: false,
    });
    expect(s(2).reason).toContain("kalan yarısı belediyeye");
  });
  it("requires both participation premises and refuses to invent other participants or a calendar year", () => {
    const a = scene("yardimci-dusunce", "atolye", 0);
    expect(a.decision).toBe("Destek var");
    expect(a.relations.map((r) => r.source)).toEqual([0, 1]);
    expect(a.claim).toBe("Ece bir taslak teslim etmiştir.");
    expect(scene("yardimci-dusunce", "atolye", 1).decision).toBe(
      "Kanıt yetmez",
    );
    expect(scene("yardimci-dusunce", "atolye", 1).reason).toContain(
      "Ece dışında",
    );
    expect(scene("yardimci-dusunce", "atolye", 2).reason).toContain(
      "takvim yılı",
    );
    expect(scene("yardimci-dusunce", "katalog", 0).decision).toBe("Destek var");
    expect(
      scene("yardimci-dusunce", "katalog", 0).relations.map((r) => r.source),
    ).toEqual([1, 2]);
    expect(scene("yardimci-dusunce", "katalog", 1).decision).toBe(
      "Metinle çelişiyor",
    );
    expect(scene("yardimci-dusunce", "katalog", 2).decision).toBe(
      "Kanıt yetmez",
    );
  });
  it("actually reflows all sentences into two blocks and marks the existing explanation split by a wrong boundary", () => {
    const wrong = scene("ikiye-bolme", "arsiv", 1),
      right = scene("ikiye-bolme", "arsiv", 3);
    expect(wrong.blocks[0]).toBe("Kâğıt belgeleri nemden korumak gerekir.");
    expect(wrong.relations[0].valid).toBe(false);
    expect(right.decision).toBe("İki odak ayrıldı");
    expect(right.blocks[0]).toBe(
      right.nodes
        .slice(0, 3)
        .map((n) => n.text)
        .join(" "),
    );
    expect(right.blocks[1]).toBe(
      "Dijital kataloglar belgeye erişimi daha kolay kılar. Yıl etiketleri aramayı hızlandırır.",
    );
    expect(right.relations.every((r) => r.valid)).toBe(true);
    expect(right.nodes.map((n) => n.group)).toEqual([0, 0, 0, 1, 1]);
    expect(right.sentence).toBe(right.blocks.join(" "));
    expect(right.evidence.join(" ")).toContain("IV. cümleyle başlar");
    expect(scene("ikiye-bolme", "kisiler", 2).decision).toBe(
      "İki odak ayrıldı",
    );
    expect(scene("ikiye-bolme", "fide", 3).decision).toBe("Sınır uygun değil");
    expect(scene("ikiye-bolme", "fide", 4).decision).toBe("İki odak ayrıldı");
    expect(scene("ikiye-bolme", "fide", 4).blocks[0]).toContain(
      "Örneğin her pazartesi",
    );
  });
  it("really removes the unrelated sentence while preserving the full original and catches the lost anaphoric antecedent", () => {
    const before = scene("akisi-bozan-cumle", "yagmur", 0),
      right = scene("akisi-bozan-cumle", "yagmur", 3),
      wrong = scene("akisi-bozan-cumle", "yagmur", 2);
    expect(before.decision).toBe("Kopukluk sürüyor");
    expect(right.decision).toBe("Akış düzeldi");
    expect(right.nodes[2].excluded).toBe(true);
    expect(right.blocks[0]).not.toContain("sergisi");
    expect(right.sentence).toContain("sergisi");
    expect(right.relations).toContainEqual({
      source: 1,
      target: 3,
      label: "Kap → bu kap",
      valid: true,
    });
    expect(wrong.decision).toBe("Öncül kayboldu");
    expect(wrong.relations).toContainEqual({
      source: 1,
      target: 3,
      label: "Kap → bu kap",
      valid: false,
    });
    expect(wrong.blocks[0]).toContain("sergisi");
    expect(wrong.evidence.join(" ")).toContain("IV. cümledeki gönderme");
    expect(scene("akisi-bozan-cumle", "kagit", 1).decision).toBe(
      "Akış düzeldi",
    );
    const counter = scene("akisi-bozan-cumle", "etiket", 5);
    expect(counter.blocks[0]).toContain("Ancak yanlış etiketlenen");
    expect(counter.decision).toBe("Akış düzeldi");
    expect(scene("akisi-bozan-cumle", "etiket", 2).decision).toBe(
      "Öncül kayboldu",
    );
  });
  it("has 40 bounded states, complete selection targets and a schema-safe exploration without touching learning ledgers", () => {
    let count = 0,
      selectCount = 0;
    const base = initialState();
    for (const id of ["yardimci-dusunce", "ikiye-bolme", "akisi-bozan-cumle"]) {
      for (const item of turkishCases019(id)) {
        const seed = scene(id, item.id);
        for (
          let choice = seed.choiceOffset;
          choice < seed.choiceLabels.length + seed.choiceOffset;
          choice++
        ) {
          const v = scene(id, item.id, choice);
          expect(v.sentence.length).toBeGreaterThan(100);
          expect(v.options).toContain(v.decision);
          expect(v.reason.length).toBeGreaterThan(40);
          for (const [index, node] of v.nodes.entries()) {
            expect(node.label.length).toBeLessThan(15);
            expect(scene(id, item.id, choice, index).target).toEqual(node);
            selectCount++;
          }
          for (const link of v.relations) {
            expect(v.nodes[link.source]).toBeDefined();
            expect(v.nodes[link.target]).toBeDefined();
            expect(link.source).not.toBe(link.target);
          }
          const parsed = stateSchema.parse({
            ...base,
            explorations: {
              [`forge019-turkish:${id}`]: {
                ...turkishExplorationDefaults019,
                caseId: item.id,
                choice,
                guess: v.decision,
                reason: "Bu sonucu tam metindeki öncüllerle karşılaştırıyorum. "
                  .repeat(4)
                  .slice(0, 120),
                compared: true,
              },
            },
          });
          for (const value of Object.values(
            parsed.explorations[`forge019-turkish:${id}`],
          ))
            if (typeof value === "string")
              expect(value.length).toBeLessThanOrEqual(120);
          const { explorations: _a, ...rest } = parsed,
            { explorations: _b, ...initial } = base;
          expect(rest).toEqual(initial);
          count++;
        }
      }
    }
    expect(count).toBe(40);
    expect(selectCount).toBeGreaterThan(180);
  });
  it("rejects unknown lessons, source-free supplemental models and invalid authored choices instead of guessing a grammar answer", () => {
    for (const id of [
      "yok",
      "constructor",
      "__proto__",
      "paragraf",
      "paragraf-ana-dusunce-ileri",
    ])
      expect(() => turkishCases019(id)).toThrow(RangeError);
    expect(() => scene("yardimci-dusunce", "yok")).toThrow(RangeError);
    for (const n of [-1, 3, 0.5, NaN, Infinity])
      expect(() => scene("yardimci-dusunce", "kutuphane", n)).toThrow(
        RangeError,
      );
    for (const n of [0, 6, 0.5, NaN])
      expect(() => scene("ikiye-bolme", "arsiv", n)).toThrow(RangeError);
    for (const n of [-1, 7, 0.5, NaN])
      expect(() => scene("akisi-bozan-cumle", "yagmur", n)).toThrow(RangeError);
    for (const n of [-1, 99, 0.5, NaN])
      expect(() => scene("yardimci-dusunce", "kutuphane", 0, n)).toThrow(
        RangeError,
      );
  });
  it("provides positive first-reading teaching before cautions and deepens the old guide only through a separate lossless extension", () => {
    expect(forge019TurkishGuides.map((g) => g.sections.length)).toEqual([
      15, 15, 15,
    ]);
    expect(forge019TurkishGuideExtensions).toHaveLength(1);
    const ext = forge019TurkishGuideExtensions[0];
    expect(ext.id).toBe("paragraf");
    expect(ext.sections).toHaveLength(10);
    for (const g of [...forge019TurkishGuides, ext]) {
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        for (const p of s.paragraphs) expect(p.length).toBeGreaterThan(250);
      }
      for (const ex of g.examples) {
        expect(ex.steps).toHaveLength(3);
        expect(ex.answer.trim()).not.toBe("");
        for (const s of ex.steps)
          expect(s.explanation.length).toBeGreaterThan(50);
        for (const t of [ex.prompt, ex.strategy, ex.check, ex.pitfall])
          expect(t.length).toBeGreaterThan(15);
      }
    }
    expect(forge019TurkishGuides[0].sections[1].title).toBe(
      "İlk okumada bilgileri yerleştir",
    );
    expect(ext.sections[1].title).toBe(
      "Tam bir paragraftan kendi sav cümleni yaz",
    );
    expect(forge019TurkishLessons.some((l) => l.id === "paragraf")).toBe(false);
    expect(
      forge019TurkishGuides.some((g) => g.id === "paragraf-ana-dusunce-ileri"),
    ).toBe(false);
    const set = forge019TurkishLessons.find(
      (l) => l.id === "paragraf-ana-dusunce-ileri",
    )!;
    expect(set.tags).toContain("soru-seti");
    expect(set.body).toEqual([]);
    expect(forge019TurkishTopics).toEqual({
      "yardimci-dusunce": "detail-271",
      "ikiye-bolme": "detail-272",
      "akisi-bozan-cumle": "detail-273",
      "paragraf-ana-dusunce-ileri": "detail-270",
    });
    for (const g of forge019TurkishGuides)
      expect(
        forge019TurkishLessons
          .find((l) => l.id === g.id)!
          .body.map((b) => b.text.tr),
      ).toEqual(g.sections.map((s) => s.paragraphs.join("\n\n")));
  });
  it("keeps all forty original questions self-contained with actual passages, unique options and literal answer semantics", () => {
    const keys = [
      [
        "Çocuklara yönelik düzenli bir etkinlik başlatılmıştır.",
        "Düzenleme çalışmasının parasal giderine.",
        "On kutunun tamamını öğrenciler hazırlamıştır.",
        "Geri kalan öğrencilerin hiçbiri yürüyerek gelmemiştir.",
        "Düzenin bazı öğrencilere katkı sağlama ihtimali vardır.",
        "Bu salon kentin en önemli sergi salonudur.",
        "Kapıyı açan herkes mutlaka geçerli kart kullanmıştır.",
        "Katalog ziyaretçilere açıldıktan sonra bir güncelleme yapılmıştır.",
        "Yazarın kendi öykülerine ilişkin değerlendirmesi, aktardığı eleştirmen değerlendirmesiyle aynı değildir.",
        "Ece bir taslak teslim etmiştir.",
      ],
      [
        "IV.",
        "IV.",
        "IV.",
        "III.",
        "IV.",
        "IV.",
        "III.",
        "IV.",
        "I–III / IV–V.",
        "V.",
      ],
      ["III.", "I.", "V.", "V.", "IV.", "IV.", "V.", "IV.", "IV.", "V."],
      [
        "Arşivlerde belgeyi korumak, ona düzenli erişim sağlamakla tamamlanmalıdır.",
        "Okumanın değeri yalnız hızla değil, metni anlamayla değerlendirilmelidir.",
        "Dijital kataloglardan yararlanmak, kayıtların doğru ve güncel tutulmasına bağlıdır.",
        "Ortak alanları korumak, kullanıcıların sorumluluğu paylaşmasıyla güçlenir.",
        "Sunumun niteliği yalnız yapıt sayısına değil, kurulan anlamlı düzene de bağlıdır.",
        "Çeviri, sözcük karşılıklarıyla birlikte bağlamın anlam ilişkilerini de taşımalıdır.",
        "Beklenmeyen sonuçları incelemek, süreci geliştirmeye yardımcı olabilir.",
        "Gündelik yaşamın küçük kayıtları da kentin geçmişini anlamada değerlidir.",
        "Düzenli küçük çalışmalar, ilerlemeyi destekleyebilir.",
        "Bilginin etkili sunumu, hedef kişinin anlayabileceği bir anlatımı gerektirir.",
      ],
    ];
    const ids = new Set<string>();
    for (const [pack, l] of forge019TurkishLessons.entries()) {
      expect(l.questions).toHaveLength(10);
      for (const [i, q] of l.questions.entries()) {
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.passage!.tr.length).toBeGreaterThan(100);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer].tr).toBe(keys[pack][i]);
        expect(q.explanation.tr.length).toBeGreaterThan(180);
        expect(q.hint.tr.length).toBeGreaterThan(20);
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
      }
      for (let answer = 0; answer < 5; answer++)
        expect(l.questions.filter((q) => q.answer === answer)).toHaveLength(2);
    }
    expect(ids.size).toBe(40);
  });
});
