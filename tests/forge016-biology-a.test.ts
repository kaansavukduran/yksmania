import { describe, it, expect } from "vitest";
import {
  hypothalamusRoute,
  pituitaryHormones,
  pituitaryResponse,
  thyroidAxis,
  calciumBalance,
  adrenalRoute,
  pancreasTransfer,
  pinealWindow,
  forge016BiologyALessons,
  forge016BiologyAGuides,
  forge016BiologyATopics,
} from "../src/learning/forge016BiologyA";
describe("Endocrine sources, feedback and amount conservation", () => {
  it("keeps synthesis, portal/axon arrival and selected release separate across all interruptions", () => {
    for (const h of ["trh", "adh", "oxy"] as const)
      for (const b of ["none", "portal", "axon", "release"] as const) {
        const m = hypothalamusRoute(h, b);
        const interrupted = h === "trh" ? b === "portal" : b === "axon";
        expect(m.synthesis).toBe(true);
        expect(m.arrival).toBe(!interrupted);
        expect(m.release).toBe(!interrupted && b !== "release");
        expect(m.route).toBe(h === "trh" ? "Portal kan" : "Akson");
      }
    expect(hypothalamusRoute("adh", "release")).toMatchObject({
      arrival: true,
      release: false,
      synthesis: true,
    });
  });
  it("requires an appropriate target and response, and keeps GH plate context meaningful", () => {
    const targets = Object.values(pituitaryHormones).map((x) => x.target);
    for (const h of Object.keys(
      pituitaryHormones,
    ) as (keyof typeof pituitaryHormones)[])
      for (const t of targets)
        for (const receptor of [true, false])
          for (const plate of [true, false]) {
            const m = pituitaryResponse(h, t, receptor, plate);
            expect(m.response).toBe(
              pituitaryHormones[h].target === t && receptor,
            );
            expect(m.posterior).toBe(h === "adh" || h === "oxy");
          }
    expect(pituitaryResponse("prl", "milk", true, true).evidence).toContain(
      "Süt sentezi",
    );
    expect(pituitaryResponse("oxy", "ejection", true, true).evidence).toContain(
      "yeni süt sentezi değildir",
    );
    expect(pituitaryResponse("gh", "growth", true, false).evidence).toContain(
      "boy artışı beklenmez",
    );
  });
  it("distinguishes qualitative HPT feedback from independent iodine counting", () => {
    expect(thyroidAxis("iodineLow", 2, 3)).toMatchObject({
      product: "Azalma yönü",
      tsh: "Artma yönü",
      iodineAtoms: 17,
    });
    expect(thyroidAxis("autonomous", 0, 0)).toMatchObject({
      product: "Artma yönü",
      tsh: "Baskılanma yönü",
      iodineAtoms: 0,
    });
    for (const condition of [
      "intact",
      "iodineLow",
      "autonomous",
      "primaryLow",
    ] as const)
      for (let a = 0; a <= 6; a++)
        for (let b = 0; b <= 6; b++)
          expect(thyroidAxis(condition, a, b).iodineAtoms).toBe(a * 4 + b * 3);
    expect(() => thyroidAxis("intact", 1.5, 2)).toThrow();
  });
  it("conserves independently given calcium flows and makes active D a necessary link of the selected indirect route", () => {
    for (const pth of [true, false])
      for (const d of [true, false])
        for (const bone of [0, 3, 5])
          for (const gut of [0, 2, 5])
            for (const loss of [0, 4, 8]) {
              const m = calciumBalance(pth, d, bone, gut, loss);
              expect(m.final + loss).toBe(10 + bone + gut);
              expect(m.indirectGut).toBe(pth && d);
              expect(m.calciumRetention).toBe(pth);
              expect(m.phosphateExcretion).toBe(pth);
            }
    expect(calciumBalance(true, true, 3, 2, 4).final).toBe(11);
    expect(calciumBalance(true, false, 4, 3, 2)).toMatchObject({
      final: 15,
      indirectGut: false,
    });
  });
  it("uses different principal control pathways for cortex products and medulla", () => {
    for (const [p, right] of [
      ["cortisol", "acth"],
      ["aldosterone", "raas"],
      ["catecholamine", "sympathetic"],
      ["androgen", "acth"],
    ] as const)
      for (const input of ["acth", "raas", "sympathetic"] as const) {
        const m = adrenalRoute(p, input);
        expect(m.matched).toBe(input === right);
        expect(m.region).toBe(p === "catecholamine" ? "Medulla" : "Korteks");
        expect(m.feedback).toBe(p === "cortisol");
      }
  });
  it("never transfers unavailable glucose, preserves two-pool totals and separates tissue entry mechanisms", () => {
    for (const h of ["insulin", "glucagon"] as const)
      for (const reserve of [0, 1, 3, 10, 50])
        for (const amount of [0, 3, 5, 10])
          for (const response of [true, false])
            for (const tissue of ["liver", "muscle", "fat", "rbc"] as const) {
              const m = pancreasTransfer(h, reserve, amount, response, tissue);
              const a = response
                ? Math.min(amount, h === "insulin" ? 20 : reserve)
                : 0;
              expect(m.actual).toBe(a);
              expect(m.blood + m.liver).toBe(20 + reserve);
              expect(m.blood).toBeGreaterThanOrEqual(0);
              expect(m.liver).toBeGreaterThanOrEqual(0);
            }
    expect(pancreasTransfer("glucagon", 3, 5, true, "liver")).toMatchObject({
      actual: 3,
      blood: 23,
      liver: 0,
      total: 23,
    });
    expect(pancreasTransfer("insulin", 50, 5, true, "liver")).toMatchObject({
      blood: 15,
      liver: 55,
      total: 70,
    });
    expect(
      pancreasTransfer("insulin", 20, 5, true, "rbc").tissueEvidence,
    ).toContain("aynı biçimde insüline bağımlı değildir");
  });
  it("handles midnight, exact endpoints, circular phase shifts and light suppression without claiming a real hormone dose", () => {
    expect(pinealWindow(22, 6, 0, 23, false)).toMatchObject({
      from: 22,
      to: 6,
      duration: 8,
      inside: true,
      toyArea: 16,
      signalWindow: true,
    });
    expect(pinealWindow(22, 6, 3, 2, false)).toMatchObject({
      from: 1,
      to: 9,
      duration: 8,
      inside: true,
    });
    expect(pinealWindow(22, 6, 0, 6, false).inside).toBe(false);
    expect(pinealWindow(22, 6, 0, 22, false).inside).toBe(true);
    expect(pinealWindow(22, 6, 0, 23, true)).toMatchObject({
      inside: true,
      signalWindow: false,
      toyArea: 16,
    });
    expect(pinealWindow(20, 8, 0, 0, false)).toMatchObject({
      duration: 12,
      toyArea: 24,
    });
    expect(pinealWindow(6, 6, 0, 6, false)).toMatchObject({
      duration: 0,
      inside: false,
      toyArea: 0,
    });
    for (const start of [0, 5, 12, 20, 23])
      for (const end of [0, 6, 12, 22, 23])
        for (const shift of [-6, -3, 0, 3, 6]) {
          const m = pinealWindow(start, end, shift, 0, false);
          expect(m.duration).toBe((end - start + 24) % 24);
          expect(m.from).toBe((start + shift + 24) % 24);
        }
  });
  it("rejects nonfinite/out-of-domain numerical inputs", () => {
    expect(() => calciumBalance(true, true, NaN, 0, 0)).toThrow();
    expect(() => calciumBalance(true, true, 0, 0, 9)).toThrow();
    expect(() => pancreasTransfer("glucagon", -1, 5, true, "liver")).toThrow();
    expect(() =>
      pancreasTransfer("insulin", 50, Infinity, true, "fat"),
    ).toThrow();
    expect(() => pinealWindow(24, 6, 0, 0, false)).toThrow();
    expect(() => pinealWindow(22, 6, 7, 0, false)).toThrow();
    expect(() => pinealWindow(22, 6, 0, 1.2, false)).toThrow();
  });
});
describe("Seven original built-in endocrine units", () => {
  it("covers the assigned seven details with deep sections and self-contained five-choice questions", () => {
    expect(forge016BiologyALessons).toHaveLength(7);
    expect(Object.values(forge016BiologyATopics)).toEqual([
      "detail-291",
      "detail-292",
      "detail-293",
      "detail-294",
      "detail-295",
      "detail-296",
      "detail-297",
    ]);
    const ids = new Set<string>();
    for (const g of forge016BiologyAGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(8);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.length > 250),
        ),
      ).toBe(true);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(20);
        expect(e.pitfall.length).toBeGreaterThan(15);
      }
    }
    for (const l of forge016BiologyALessons) {
      expect(l.subjectId).toBe("ayt-biyoloji");
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.length).toBeGreaterThan(15);
        expect(q.explanation.tr.length).toBeGreaterThan(100);
        expect(q.prompt.tr).not.toMatch(
          /önceki sayfa|yukarıdaki şekil|bu metne göre/iu,
        );
      }
    }
    expect(ids.size).toBe(70);
  });
  it("retains independently computed numeric keys in normal question cards", () => {
    const key = (id: string, q: number) => {
      const x = forge016BiologyALessons.find((l) => l.id === id)!.questions[
        q - 1
      ];
      return x.options[x.answer].tr;
    };
    expect(key("endokrin-hipotalamus", 4)).toBe("1,25");
    expect(key("endokrin-tiroit", 5)).toBe("17");
    expect(key("endokrin-paratiroit", 6)).toBe("11");
    expect(key("endokrin-bobrek-ustu", 8)).toBe("+6 ve −4");
    expect(key("endokrin-pankreas", 8)).toBe("5");
    expect(key("endokrin-epifiz", 5)).toBe(
      "01.00–09.00 olur; süre 8 saat kalır",
    );
    expect(key("endokrin-epifiz", 7)).toBe("1,5");
  });
});
