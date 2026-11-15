import { describe, it, expect } from "vitest";
import {
  forge016GeographyLessons as lessons,
  forge016GeographyGuides as guides,
  forge016GeographyTopics as topics,
  rock016State,
  rocks016Actions,
  turkeyInner016State,
  river016State,
  karst016State,
  windIce016State,
  coast016State,
  turkeyExternal016State,
  relief016State,
  water016State,
} from "../src/learning/forge016Geography";
describe("Forge016 dokuz coğrafya ünitesinin kanıtı ve hesap sınırları", () => {
  it("doğru sıra başlıklarında kapsamlı, bağımsız özgün öğretim verir", () => {
    expect(Object.values(topics)).toEqual([
      "detail-48",
      "detail-49",
      "detail-50",
      "detail-51",
      "detail-52",
      "detail-53",
      "detail-54",
      "detail-55",
      "detail-56",
    ]);
    expect(lessons).toHaveLength(9);
    for (const l of lessons) {
      const g = guides.find((x) => x.id === l.id)!;
      expect(l.subjectId).toBe("tyt-cografya");
      expect(g.sections.length).toBeGreaterThanOrEqual(8);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        for (const p of s.paragraphs) expect(p.length).toBeGreaterThan(130);
      }
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const e of g.examples) {
        expect(e.steps.length).toBeGreaterThanOrEqual(3);
        expect(e.prompt.length).toBeGreaterThan(40);
        expect(e.answer).toBeTruthy();
        expect(e.check).toBeTruthy();
        expect(e.pitfall).toBeTruthy();
      }
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(
          Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 5,
        ).toBe(true);
        expect(q.prompt.tr.length).toBeGreaterThan(35);
        expect(q.explanation.tr.length).toBeGreaterThan(80);
        expect(q.hint?.tr).toBeTruthy();
      }
      expect(g.source).toContain("MEBİ");
      expect(g.source).toContain("OGM");
      expect(g.source).toContain("Aurelia");
    }
    expect(
      new Set(lessons.flatMap((l) => l.questions.map((q) => q.id))).size,
    ).toBe(90);
  });
  it("kayaç döngüsünde katı başkalaşmayı erime ve taşlaşmadan ayırır", () => {
    expect(rock016State("marble").to).toBe("Mermer");
    expect(rock016State("marble").process).toBe("Katı hâlde değişim");
    expect(rock016State("quartzite").to).toBe("Kuvarsit");
    expect(rock016State("lithify").to).toBe("Kum taşı");
    expect(rock016State("melt").family).toBe("Erimiş malzeme");
    expect(rock016State("cool-fast").proof).toContain("camsı");
    expect(new Set(rocks016Actions.map((x) => x.id)).size).toBe(7);
    for (const a of rocks016Actions) {
      expect(a.path[0]).not.toBe(a.path[1]);
      expect(a.path.every((n) => n >= 0 && n < 8)).toBe(true);
    }
  });
  it("Batı gerilmesini kuzey/doğu yanal hareketinden, kıvrım ve volkandan ayırır", () => {
    expect(turkeyInner016State("west").kind).toBe("normal");
    expect(turkeyInner016State("north").kind).toBe("strike");
    expect(turkeyInner016State("east").kind).toBe("strike");
    expect(turkeyInner016State("fold").kind).toBe("fold");
    expect(turkeyInner016State("volcano").proof).toContain("Bitlis");
    expect(turkeyInner016State("north").limit).toContain("tahmini değildir");
  });
  it("debi boyutunu korur; aynı debiye farklı alan ve hızla ulaşır", () => {
    const a = river016State("cross", 10, 2, 1, 100, 5, 120, 90),
      b = river016State("cross", 5, 2, 2, 100, 5, 120, 90);
    expect(a.discharge).toBe(20);
    expect(b.discharge).toBe(20);
    expect(a.slope).toBe(2);
    expect(a.area).toBe(20);
    for (const width of [2, 8, 20])
      for (const depth of [1, 2, 5])
        for (const speed of [0.5, 1.5, 3]) {
          const x = river016State(
            "cross",
            width,
            depth,
            speed,
            120,
            6,
            120,
            90,
          );
          expect(x.discharge / x.area).toBeCloseTo(speed);
          expect(x.slope).toBe(2);
        }
  });
  it("tortu bütçesinde pozitif, sıfır ve negatif tutulmayı saklamaz", () => {
    expect(river016State("delta", 8, 2, 1.5, 120, 6, 150, 110).retained).toBe(
      40,
    );
    expect(river016State("delta", 8, 2, 1.5, 120, 6, 100, 100).retained).toBe(
      0,
    );
    expect(river016State("delta", 8, 2, 1.5, 120, 6, 50, 100).retained).toBe(
      -50,
    );
    expect(
      river016State("meander", 8, 2, 1.5, 120, 6, 50, 100).proof,
    ).toContain("Dış kıyıda oyulma, iç kıyıda kum birikimi");
  });
  it("jips çözünmesini karbonat çökelmesine doğrudan eşitlemez", () => {
    expect(karst016State("lapya", "gypsum").compatible).toBe(true);
    expect(karst016State("travertine", "gypsum").compatible).toBe(false);
    expect(karst016State("travertine", "limestone").compatible).toBe(true);
    expect(karst016State("cave", "granite").compatible).toBe(false);
    expect(karst016State("stalactite", "limestone").form.proof).toContain(
      "tavanda",
    );
    expect(karst016State("stalagmite", "limestone").form.proof).toContain(
      "tabanına",
    );
  });
  it("rüzgâr, doğrudan buzul ve erime suyu taşıyıcılarını ayrı kanıtlandırır", () => {
    expect(windIce016State("wind-loess").proof).toContain("silt");
    expect(windIce016State("ice-till").proof).toContain("kötü boylanmış");
    expect(windIce016State("meltwater").proof).toContain("akarsudur");
    expect(windIce016State("ice-erosion").process).toBe("Aşındırma");
    expect(windIce016State("wind-erosion").proof).toContain("tuz ayrışması");
  });
  it("kıyının su basması öncesindeki vadi kökenini ve kum bağlantısını korur", () => {
    expect(coast016State("fjord", "after").form.proof).toContain("U vadi");
    expect(coast016State("ria", "after").form.proof).toContain("akarsu");
    expect(coast016State("tombolo", "after").form.proof).toContain(
      "adayı ana karaya",
    );
    expect(coast016State("lagoon", "after").form.proof).toContain(
      "mutlaka tatlı değildir",
    );
    expect(coast016State("cliff", "before").water).toBe(false);
    expect(coast016State("cliff", "after").water).toBe(true);
  });
  it("Türkiye yer kartında kaynak malzeme ile son işi ve nehirleri ayırır", () => {
    expect(turkeyExternal016State("bafra").proof).toContain("Kızılırmak");
    expect(turkeyExternal016State("bafra").proof).toContain("Yeşilırmak");
    expect(turkeyExternal016State("cappadocia").process).toBe("Aşındırma");
    expect(turkeyExternal016State("pamukkale").process).toBe("Birikim");
    expect(turkeyExternal016State("tortum").process).toBe("Kütle hareketi");
    expect(turkeyExternal016State("taseli").kind).toBe("karst");
  });
  it("mutlak yükseltiyi kaydırırken göreli farkları ve en alçak rota kararını korur", () => {
    for (const id of ["plain", "plateau", "coast"])
      for (const h of [0, 100, 600, 1800]) {
        const a = relief016State(id, 0, "A"),
          b = relief016State(id, h, "B");
        for (let i = 1; i < 7; i++)
          expect(b.points[i] - b.points[i - 1]).toBe(
            a.points[i] - a.points[i - 1],
          );
        expect(b.passes.B).toBe(900 + h);
        expect(b.passes.B).toBeLessThan(b.passes.A);
        expect(b.passes.B).toBeLessThan(b.passes.C);
        expect(b.best).toBe("B");
      }
    expect(relief016State("plain", 1800, "B").selectedPass).toBe(2700);
  });
  it("su bütçesinde kütleyi korur; negatif stok yerine gerçek açığı gösterir", () => {
    const r = water016State(100, 10, 30, 15, 20, "slope");
    expect(r.final).toBe(105);
    expect(r.change).toBe(5);
    expect(r.unmet).toBe(0);
    const d = water016State(10, 5, 0, 10, 15, "artesian");
    expect(d.final).toBe(0);
    expect(d.unmet).toBe(10);
    for (const initial of [0, 10, 100, 200])
      for (const rain of [0, 50, 100])
        for (const flow of [0, 100])
          for (const evaporation of [0, 50, 200])
            for (const out of [0, 75, 200]) {
              const x = water016State(
                initial,
                rain,
                flow,
                evaporation,
                out,
                "fault",
              );
              expect(x.final).toBeGreaterThanOrEqual(0);
              expect(x.unmet).toBeGreaterThanOrEqual(0);
              expect(x.final + x.demand - x.unmet).toBeCloseTo(
                initial + rain + flow,
              );
              expect(x.final === 0 || x.unmet === 0).toBe(true);
            }
  });
  it("kaynak türünü sıcaklık, taşma veya kalite için istisnasız hüküm yapmaz", () => {
    expect(water016State(0, 0, 0, 0, 0, "artesian").source.proof).toContain(
      "kendi gücüyle taşmaz",
    );
    expect(water016State(0, 0, 0, 0, 0, "fault").source.proof).toContain(
      "zorunlu değildir",
    );
    expect(water016State(0, 0, 0, 0, 0, "geyser").source.proof).toContain(
      "Her sıcak kaynak gayzer değildir",
    );
  });
  it("geçersiz ve fiziksel kapsam dışı girdileri sessizce düzeltip gizlemez", () => {
    const invalid = [
      () => rock016State("x"),
      () => turkeyInner016State("x"),
      () => river016State("x", 8, 2, 1, 120, 6, 120, 90),
      () => river016State("cross", 0, 2, 1, 120, 6, 120, 90),
      () => river016State("cross", 8, 2, NaN, 120, 6, 120, 90),
      () => karst016State("x", "limestone"),
      () => karst016State("lapya", "x"),
      () => windIce016State("x"),
      () => coast016State("ria", "x"),
      () => turkeyExternal016State("x"),
      () => relief016State("plain", 1801, "A"),
      () => relief016State("plain", 0, "D"),
      () => water016State(-1, 0, 0, 0, 0, "slope"),
      () => water016State(0, 0, 0, 0, 0, "x"),
      () => water016State(0, Infinity, 0, 0, 0, "slope"),
    ];
    for (const f of invalid) expect(f).toThrow(RangeError);
  });
});
