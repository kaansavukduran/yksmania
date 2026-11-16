import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Forge021BiologyBLab from "../src/learning/Forge021BiologyBLab";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  photoFactors021,
  nitrification021,
  aerobicRespiration021,
  anaerobicCapacity021,
  forge021BiologyBLessons,
  forge021BiologyBGuides,
  forge021BiologyBTopics,
} from "../src/learning/forge021BiologyB";

const saved = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
  writes: vi.fn(),
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    key: string,
    defaults: Record<string, string | number | boolean>,
  ) => [{ ...defaults, ...saved.values[key] }, saved.writes],
}));

describe("Fotosentez, kimyasal üretim ve iki solunum yolunda kanıt", () => {
  it("dört gerçek varsayılan Lab çıktısı sayısal sonuç ve açıklamalı SVG ile açılır", () => {
    saved.values = {};
    for (const lesson of forge021BiologyBLessons) {
      const html = renderToStaticMarkup(
        createElement(Forge021BiologyBLab, { lessonId: lesson.id }),
      );
      expect(html).toContain(`data-forge021="${lesson.id}"`);
      expect(html).toContain("data-model-result");
      expect(html).toContain('role="img"');
      expect(html).toContain("<desc");
      expect(html).not.toMatch(/NaN|undefined/);
    }
    expect(saved.writes).not.toHaveBeenCalled();
  });
  it("sıfır stok ve O₂ kesintisi gerçek Lab çiziminde negatif boyut veya sahte başarı üretmez", () => {
    saved.values = {
      "forge021-bio-b-nitrification": { initial: 0, first: 0, second: 0 },
      "forge021-bio-b-aerobic": { glucose: 1, stage: "ets", oxygen: false },
      "forge021-bio-b-anaerobic": { electrons: 0, acceptor: 0 },
    };
    const nitrogen = renderToStaticMarkup(
      createElement(Forge021BiologyBLab, {
        lessonId: "kemosentez-enerji-karbon",
      }),
    );
    expect(nitrogen).toContain("Toplam azot:");
    expect(nitrogen).toContain(
      'data-bio021-o2-demand="true" x="155" y="243" width="0"',
    );
    const oxygen = renderToStaticMarkup(
      createElement(Forge021BiologyBLab, {
        lessonId: "solunum-oksijenli-bilanco",
      }),
    );
    expect(oxygen).toContain(
      "O₂ yok: sürekli aerobik tam yol sonucu ilan edilmez.",
    );
    expect(oxygen).toContain('class="bio021b-idle"');
    const anaerobic = renderToStaticMarkup(
      createElement(Forge021BiologyBLab, {
        lessonId: "solunum-oksijensiz-alicilar",
      }),
    );
    expect(anaerobic).toContain("Başlangıç stokları sıfır; ürün yok.");
    expect([nitrogen, oxygen, anaerobic].join(" ")).not.toMatch(
      /NaN|undefined|width="-/,
    );
    saved.values = {};
    expect(saved.writes).not.toHaveBeenCalled();
  });
  it("aynı ölçekte darboğazın yer değiştirmesini ve birlikte sınırlamayı gösterir", () => {
    expect(photoFactors021(30, 80, "suitable", 10)).toMatchObject({
      gross: 30,
      net: 20,
      limiting: ["light"],
    });
    expect(photoFactors021(90, 100, "suitable", 10)).toMatchObject({
      gross: 80,
      net: 70,
      limiting: ["heat"],
    });
    expect(photoFactors021(40, 40, "suitable", 10).limiting).toEqual([
      "light",
      "carbon",
    ]);
    expect(photoFactors021(70, 40, "suitable", 10).gross).toBe(40);
  });
  it("brüt pozitifken net alımı ve sıfır net dengeyi ayırır", () => {
    expect(photoFactors021(8, 80, "suitable", 10)).toMatchObject({
      gross: 8,
      net: -2,
      balanced: false,
    });
    expect(photoFactors021(10, 80, "suitable", 10)).toMatchObject({
      gross: 10,
      net: 0,
      balanced: true,
    });
    expect(photoFactors021(0, 80, "suitable", 10)).toMatchObject({
      gross: 0,
      net: -10,
    });
  });
  it("nitrifikasyonda azotu üç depoda ve O₂ gereksinimini iki basamakta korur", () => {
    expect(nitrification021(5, 3, 2)).toMatchObject({
      ammonium: 2,
      nitrite: 1,
      nitrate: 2,
      oxygen: 5.5,
    });
    expect(nitrification021(2, 2, 2)).toMatchObject({
      ammonium: 0,
      nitrite: 0,
      nitrate: 2,
      oxygen: 4,
    });
    for (const n of [0, 1, 5, 10])
      for (let first = 0; first <= n; first++)
        for (let second = 0; second <= first; second++) {
          const r = nitrification021(n, first, second);
          expect(r.ammonium + r.nitrite + r.nitrate).toBe(n);
          expect(r.oxygen).toBe(1.5 * first + 0.5 * second);
        }
  });
  it("tek glikoz ile tur, brüt/net ATP ve bölme defterlerini karıştırmaz", () => {
    expect(
      aerobicRespiration021(3, "glycolysis", "malate", true),
    ).toMatchObject({
      glycolysisProduced: 12,
      investment: 6,
      glycolysisNet: 6,
      carbonDioxide: 0,
      nadhProduced: 6,
      substrate: 6,
      location: "Sitozol",
    });
    expect(aerobicRespiration021(2, "link", "malate", true)).toMatchObject({
      carbonDioxide: 4,
      nadhProduced: 8,
      substrate: 4,
      location: "Mitokondri matriksi",
    });
    expect(aerobicRespiration021(2, "krebs", "malate", true)).toMatchObject({
      carbonDioxide: 12,
      nadhProduced: 20,
      fadh2Produced: 4,
      substrate: 8,
      krebsTurns: 4,
    });
  });
  it("mekik etkisini yalnız sitozolik iki NADH eşdeğerinin farkıyla sınırlar", () => {
    for (const g of [0, 1, 2, 5]) {
      const a = aerobicRespiration021(g, "ets", "malate", true),
        b = aerobicRespiration021(g, "ets", "glycerol", true);
      expect(a.oxidative).toBe(28 * g);
      expect(b.oxidative).toBe(26 * g);
      expect(a.theoreticalTotal).toBe(32 * g);
      expect(b.theoreticalTotal).toBe(30 * g);
      expect(a.theoreticalTotal - b.theoreticalTotal).toBe(2 * g);
      expect(a.oxygenForCompleteOxidation).toBe(6 * g);
    }
  });
  it("O₂ kesintisini tam aerobik dönüşüm başarısı saymaz; sıfırda madde üretmez", () => {
    expect(aerobicRespiration021(1, "ets", "malate", false)).toMatchObject({
      oxidative: 0,
      canClaimComplete: false,
      totalShown: null,
      sustained: false,
    });
    const z = aerobicRespiration021(0, "ets", "malate", true);
    expect([
      z.oxidative,
      z.substrate,
      z.nadhProduced,
      z.carbonDioxide,
      z.theoreticalTotal,
    ]).toEqual([0, 0, 0, 0, 0]);
  });
  it("nitratın tek N’sinden iki N’li gazı doğru sayar", () => {
    expect(anaerobicCapacity021(10, 3, "nitrate")).toMatchObject({
      processed: 2,
      product: 1,
      acceptorLeft: 1,
      electronsLeft: 0,
      limitedBy: "electrons",
    });
    expect(anaerobicCapacity021(10, 6, "nitrate").product).toBe(1);
  });
  it("temsil edilemeyen pozitif indirgenmeyi sıfır üretim diye sunmaz", () => {
    expect(() => anaerobicCapacity021(Number.MIN_VALUE, 1, "carbon")).toThrow(
      "PRECISION021",
    );
    expect(() =>
      anaerobicCapacity021(Number.MIN_VALUE * 5, 1, "nitrate"),
    ).toThrow("PRECISION021");
    expect(anaerobicCapacity021(Number.MIN_VALUE, 0, "carbon")).toMatchObject({
      processed: 0,
      product: 0,
      electronsLeft: Number.MIN_VALUE,
    });
    expect(anaerobicCapacity021(Number.MIN_VALUE, 1, "iron")).toMatchObject({
      processed: Number.MIN_VALUE,
      product: Number.MIN_VALUE,
      electronsLeft: 0,
    });
  });
  it("diğer üç alıcıda elektron ve atom kapasitesini korur", () => {
    expect(anaerobicCapacity021(16, 3, "sulfate")).toMatchObject({
      processed: 2,
      product: 2,
      acceptorLeft: 1,
    });
    expect(anaerobicCapacity021(5, 3, "iron")).toMatchObject({
      processed: 3,
      product: 3,
      electronsLeft: 2,
      limitedBy: "acceptor",
    });
    expect(anaerobicCapacity021(8, 2, "carbon")).toMatchObject({
      processed: 1,
      product: 1,
      acceptorLeft: 1,
    });
    for (const kind of ["nitrate", "sulfate", "iron", "carbon"] as const)
      for (const e of [0, 1, 8, 10, 16, 40])
        for (const n of [0, 0.5, 1, 3, 10]) {
          const r = anaerobicCapacity021(e, n, kind);
          expect(r.electronsUsed + r.electronsLeft).toBeCloseTo(e);
          expect(r.processed + r.acceptorLeft).toBeCloseTo(n);
          expect(r.electronsLeft).toBeGreaterThanOrEqual(0);
          expect(r.acceptorLeft).toBeGreaterThanOrEqual(0);
          expect(r.product).toBeCloseTo(
            r.processed * (kind === "nitrate" ? 0.5 : 1),
          );
        }
  });
  it("geçersiz, negatif veya stok dışı girdileri sessizce öğretime taşımaz", () => {
    expect(() => photoFactors021(NaN, 10, "suitable", 10)).toThrow();
    expect(() => photoFactors021(10, 10, "bad" as never, 10)).toThrow();
    expect(() => nitrification021(1, 2, 0)).toThrow();
    expect(() => nitrification021(2, 1, 2)).toThrow();
    expect(() => aerobicRespiration021(1.5, "ets", "malate", true)).toThrow();
    expect(() =>
      aerobicRespiration021(1, "ets", "bad" as never, true),
    ).toThrow();
    expect(() => anaerobicCapacity021(-1, 1, "iron")).toThrow();
    expect(() => anaerobicCapacity021(10, 1, "bad" as never)).toThrow();
  });
  it("dört yeni ayrıntıyı derin öğretim ve kendi bağlamını taşıyan sorularla eşler", () => {
    expect(Object.values(forge021BiologyBTopics)).toEqual([
      "detail-336",
      "detail-337",
      "detail-338",
      "detail-339",
    ]);
    expect(
      forge021BiologyBGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(61);
    expect(
      forge021BiologyBLessons.reduce((n, l) => n + l.questions.length, 0),
    ).toBe(50);
    for (const guide of forge021BiologyBGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      expect(guide.examples).toHaveLength(6);
      expect(guide.recall).toHaveLength(4);
      for (const section of guide.sections)
        expect(section.paragraphs).toHaveLength(2);
      for (const example of guide.examples) {
        expect(example.steps).toHaveLength(3);
        expect(example.prompt).toBeTruthy();
        expect(example.strategy).toBeTruthy();
        expect(example.check).toBeTruthy();
      }
    }
  });
  it("her kartı beş benzersiz seçenek ve sıkı bağımsız bağlam denetiminden geçirir", () => {
    const ids = new Set<string>();
    for (const lesson of forge021BiologyBLessons)
      for (const q of lesson.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionContentIssues(q), q.id).toEqual([]);
      }
  });
  it("ipuçları farklı iş yapar ve seçenek gerekçeleri doğru indeksle birlikte döner", () => {
    for (const lesson of forge021BiologyBLessons)
      for (const q of lesson.questions) {
        const g = (
          q as typeof q & {
            guidance: {
              knowledge: string[];
              strategy: string;
              steps: string[];
              optionReasons: string[];
              commonError: string;
              check: string;
            };
          }
        ).guidance;
        expect(g.knowledge.length).toBeGreaterThan(0);
        expect(g.steps.length).toBeGreaterThanOrEqual(3);
        expect(g.optionReasons).toHaveLength(5);
        expect(new Set(g.optionReasons).size).toBe(5);
        expect(q.explanation.tr).toContain(g.optionReasons[q.answer]);
        expect(
          new Set([
            g.knowledge.join(" "),
            g.strategy,
            g.steps.join(" "),
            g.commonError,
            g.check,
          ]).size,
        ).toBe(5);
      }
  });
});
