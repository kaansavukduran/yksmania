import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "node:fs";
import path from "node:path";
import Forge022ChemistryALab from "../src/learning/Forge022ChemistryALab";
const savedLab = vi.hoisted(() => ({
  value: {} as Record<string, string | number | boolean>,
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    _key: string,
    defaults: Record<string, string | number | boolean>,
  ) => [{ ...defaults, ...savedLab.value }, vi.fn()],
}));
import { questionContentIssues } from "../src/domain/questionContent";
import {
  FARADAY_A022,
  forge022ChemistryALessons as lessons,
  forge022ChemistryAGuides as guides,
  forge022ChemistryATopics as topics,
  galvanicA022,
  nernstA022,
  electrolysisA022,
  faradayA022,
  protectionA022,
} from "../src/learning/forge022ChemistryA";

describe("022A elektrokimya öğretimi ve model bütçeleri", () => {
  it("beş tam kaynaklı ünite ve soruya özel kademeli yardım taşır", () => {
    expect(Object.values(topics)).toEqual([
      "detail-440",
      "detail-441",
      "detail-442",
      "detail-443",
      "detail-444",
    ]);
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(77);
    for (const guide of guides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        expect(section.paragraphs.every((s) => s.length > 110)).toBe(true);
      }
      expect(guide.examples).toHaveLength(4);
      for (const example of guide.examples)
        expect(example.steps).toHaveLength(3);
      expect(guide.recall).toHaveLength(4);
    }
    for (const lesson of lessons) {
      expect(lesson.questions).toHaveLength(10);
      for (const question of lesson.questions) {
        expect(questionContentIssues(question), question.id).toEqual([]);
        expect(question.options).toHaveLength(5);
        expect(new Set(question.options.map((o) => o.tr)).size).toBe(5);
        const rich = question as typeof question & {
          guidance: {
            knowledge: string[];
            strategy: string;
            steps: string[];
            optionReasons: string[];
            commonError: string;
            check: string;
          };
        };
        expect(rich.guidance.steps).toHaveLength(2);
        expect(rich.guidance.optionReasons).toHaveLength(5);
        expect(new Set(rich.guidance.optionReasons).size).toBe(5);
        expect(rich.guidance.optionReasons.every((t) => t.length > 20)).toBe(
          true,
        );
        expect(rich.guidance.knowledge[0].length).toBeGreaterThan(30);
        expect(rich.guidance.strategy.length).toBeGreaterThan(20);
      }
    }
  });
  it("Daniell stok, metal ve köprü yüklerini birlikte korur", () => {
    for (const xi of [0, 0.001, 0.005, 0.01, 0.015, 0.02]) {
      const m = galvanicA022(xi, true, true);
      expect(m.zincMetal + m.zincIon).toBeCloseTo(0.04, 14);
      expect(m.copperIon + m.copperMetal).toBeCloseTo(0.03, 14);
      expect(m.electronMol).toBeCloseTo(2 * xi, 14);
      expect(m.charge).toBeCloseTo(2 * xi * 96500, 9);
      expect(m.nitrateToAnode).toBeCloseTo(2 * xi, 14);
      expect(m.potassiumToCathode).toBeCloseTo(2 * xi, 14);
      expect(m.anodeChargeResidual).toBeCloseTo(0, 14);
      expect(m.cathodeChargeResidual).toBeCloseTo(0, 14);
      expect(m.zincMassLost).toBeCloseTo(65 * xi, 14);
      expect(m.copperMassGained).toBeCloseTo(64 * xi, 14);
    }
    expect(galvanicA022(0.02, true, true).status).toBe("upper");
  });
  it("yeni başlangıç deneyinde iki iletim yolu birlikte gereklidir", () => {
    for (const [wire, ions] of [
      [false, false],
      [false, true],
      [true, false],
    ] as const) {
      const m = galvanicA022(0.01, wire, ions);
      expect(m.xi).toBe(0);
      expect(m.status).toBe("open");
      expect(m.zincMetal).toBe(0.03);
    }
    expect(galvanicA022(0, true, true).status).toBe("start");
  });
  it("25°C Nernst bilinen oranları ve gerçek yönü hesaplar", () => {
    const d = nernstA022("daniell", 0.01, 0.1, 1, 1);
    expect(d.quotient).toBeCloseTo(0.1, 14);
    expect(d.signedVoltage).toBeCloseTo(1.1296, 12);
    const right = nernstA022("copper", 0.01, 1, 1, 1);
    expect(right.signedVoltage).toBeCloseTo(0.0592, 12);
    expect(right.anode).toBe("left");
    expect(right.cathode).toBe("right");
    const left = nernstA022("copper", 1, 0.01, 1, 1);
    expect(left.signedVoltage).toBeCloseTo(-0.0592, 12);
    expect(left.anode).toBe("right");
    expect(left.cathode).toBe("left");
    const equal = nernstA022("copper", 0.1, 0.1, 1, 1);
    expect(equal.signedVoltage).toBe(0);
    expect(equal.direction).toBe("equal");
    expect(equal.anode).toBe(null);
  });
  it("seyreltme oranı, yön ve eşitlik koşulunu korur", () => {
    const same = nernstA022("copper", 0.1, 1, 1, 10);
    expect(same.left).toBe(0.1);
    expect(same.right).toBe(0.1);
    expect(same.direction).toBe("equal");
    for (const kind of ["copper", "daniell"])
      for (const l of [0.001, 0.01, 0.1, 1])
        for (const r of [0.001, 0.01, 0.1, 1]) {
          const initial = nernstA022(kind, l, r, 1, 1),
            both = nernstA022(kind, l, r, 5, 5);
          expect(both.signedVoltage).toBeCloseTo(initial.signedVoltage, 12);
          expect(nernstA022(kind, l, r, 2, 1).signedVoltage).toBeGreaterThan(
            initial.signedVoltage,
          );
          expect(nernstA022(kind, l, r, 1, 2).signedVoltage).toBeLessThan(
            initial.signedVoltage,
          );
        }
  });
  it("altı hazır hücrenin ürünleri aynı elektron bütçesine dayanır", () => {
    const stoich = {
      molten: [1, 2],
      water: [2, 4],
      copperInert: [2, 4],
      copperActive: [2, 2],
      brine: [2, 2],
      magnesiumWater: [2, 4],
    };
    for (const [kind, [cat, an]] of Object.entries(stoich))
      for (const n of [0, 0.005, 0.02, 0.04]) {
        const m = electrolysisA022(kind, n, true, false);
        expect(m.cathodeMol * cat).toBeCloseTo(n, 14);
        expect(m.anodeMol * an).toBeCloseTo(n, 14);
        expect(m.charge).toBeCloseTo(n * 96500, 9);
        expect(m.cathodeSide).toBe("right");
        expect(m.anodeSide).toBe("left");
        const reverse = electrolysisA022(kind, n, true, true);
        expect(reverse.cathodeSide).toBe("left");
        expect(reverse.anodeSide).toBe("right");
        expect(reverse.cathodeMol).toBe(m.cathodeMol);
      }
  });
  it("sulu/eriyik ve aktif/inert anot ayrımını silmez", () => {
    expect(electrolysisA022("molten", 0.02, true, false).data.cathode).toBe(
      "Na metali",
    );
    expect(
      electrolysisA022("magnesiumWater", 0.02, true, false).data.cathode,
    ).toBe("H₂");
    expect(electrolysisA022("copperActive", 0.02, true, false).data.anode).toBe(
      "Çözünen Cu",
    );
    expect(electrolysisA022("copperInert", 0.02, true, false).data.anode).toBe(
      "O₂",
    );
    const off = electrolysisA022("water", 0.04, false, false);
    expect(off.cathodeMol).toBe(0);
    expect(off.actualElectrons).toBe(0);
    expect(off.status).toBe("off");
  });
  it("Faraday verilen sınıf yuvarlamasıyla sayısal örnekleri çözer", () => {
    expect(FARADAY_A022).toBe(96500);
    expect(faradayA022("copper", 2, 965, 100, 0.1).depositedMass).toBeCloseTo(
      0.64,
      14,
    );
    expect(faradayA022("silver", 2, 965, 100, 0.1).depositedMass).toBeCloseTo(
      2.16,
      14,
    );
    expect(
      faradayA022("aluminium", 2, 965, 100, 0.1).depositedMass,
    ).toBeCloseTo(0.18, 14);
    const limited = faradayA022("copper", 5, 1930, 80, 0.015);
    expect(limited.depositedMass).toBe(0.96);
    expect(limited.targetCharge).toBe(2895);
    expect(limited.otherCharge).toBe(6755);
    expect(limited.actualShare).toBe(30);
    expect(limited.stockLimited).toBe(true);
  });
  it("Faraday stok ve toplam yük defterini geniş örnek kümesinde korur", () => {
    for (const kind of ["copper", "silver", "aluminium"])
      for (const i of [0, 1, 5])
        for (const t of [0, 965, 1930, 3600])
          for (const eta of [0, 50, 80, 100])
            for (const n of [0, 0.005, 0.1]) {
              const m = faradayA022(kind, i, t, eta, n);
              expect(m.targetCharge + m.otherCharge).toBeCloseTo(m.charge, 9);
              expect(m.depositedMoles + m.remainingMoles).toBeCloseTo(n, 13);
              expect(m.depositedMoles).toBeLessThanOrEqual(n + 1e-15);
              expect(m.otherCharge).toBeGreaterThanOrEqual(0);
              expect(m.depositedMass).toBeCloseTo(
                m.depositedMoles * m.data.mass,
                13,
              );
              if (m.charge === 0) expect(m.actualShare).toBe(null);
              else expect(m.actualShare!).toBeLessThanOrEqual(eta + 1e-12);
            }
  });
  it("kurban anot stok üst kapasitesini gerçek saha ömrü saymaz", () => {
    const z = protectionA022("Zn", true, true, false, 0.65, 1500);
    expect(z.capacity).toBe(1930);
    expect(z.status).toBe("budgetEnough");
    expect(z.usedMass + z.remainingMass).toBeCloseTo(0.65, 14);
    expect(z.supplied).toBe(1500);
    expect(z.gap).toBe(0);
    const short = protectionA022("Zn", true, true, false, 0.65, 2500);
    expect(short.status).toBe("budgetShort");
    expect(short.gap).toBe(570);
    expect(short.remainingMass).toBeCloseTo(0, 14);
    expect(z.limit).toContain("Yıl/ömür veya demir kaybı tahmini yapılmaz");
  });
  it("bariyer, kopuk tel, kuru yol ve soy çift farklı gerekçelerdir", () => {
    expect(protectionA022("Mg", true, true, true, 1, 1500).status).toBe(
      "barrier",
    );
    expect(protectionA022("Mg", true, false, false, 1, 1500).status).toBe(
      "dry",
    );
    expect(protectionA022("Mg", false, true, false, 1, 1500).status).toBe(
      "separate",
    );
    expect(protectionA022("none", true, true, false, 1, 1500).status).toBe(
      "separate",
    );
    const cu = protectionA022("Cu", true, true, false, 1, 1500);
    expect(cu.status).toBe("ironAnode");
    expect(cu.supplied).toBe(0);
    expect(cu.sacrificialCandidate).toBe(false);
    expect(protectionA022("Zn", true, true, false, 1, 0).status).toBe(
      "candidate",
    );
  });
  it("yabancı/prototip seçimler ve sınır dışı sayılar açık reddedilir", () => {
    for (const kind of ["constructor", "__proto__", "toString", "missing"]) {
      expect(() => nernstA022(kind, 0.1, 1, 1, 1)).toThrow(RangeError);
      expect(() => electrolysisA022(kind, 0.02, true, false)).toThrow(
        RangeError,
      );
      expect(() => faradayA022(kind, 1, 1, 100, 0.01)).toThrow(RangeError);
      expect(() => protectionA022(kind, true, true, false, 1, 1)).toThrow(
        RangeError,
      );
    }
    for (const n of [NaN, Infinity, -Infinity, -0.1, 0.03])
      expect(() => galvanicA022(n, true, true)).toThrow(RangeError);
    expect(() => galvanicA022(0.01, 1 as unknown as boolean, true)).toThrow(
      RangeError,
    );
    expect(() => nernstA022("daniell", 0, 1, 1, 1)).toThrow(RangeError);
    expect(() => nernstA022("copper", 0.1, 1, 0, 1)).toThrow(RangeError);
    expect(() => electrolysisA022("water", 0.05, true, false)).toThrow(
      RangeError,
    );
    expect(() => faradayA022("silver", 6, 1, 100, 0.01)).toThrow(RangeError);
    expect(() => faradayA022("silver", 1, 1, 101, 0.01)).toThrow(RangeError);
    expect(() => protectionA022("Zn", true, true, false, -1, 1)).toThrow(
      RangeError,
    );
  });
});

it("beş gerçek Lab ve bütün koşullu görünüm kaynakta render edilir; gerçek tarayıcı değildir", () => {
  const scenarios: [string, Record<string, string | number | boolean>][] = [
    ["elektrokimyasal-piller", {}],
    ["elektrokimyasal-piller", { extent: 0.02 }],
    ["elektrokimyasal-piller", { wire: false }],
    ["elektrokimyasal-piller", { ions: false }],
    ["pil-gerilimi-derisim-pilleri", {}],
    ["pil-gerilimi-derisim-pilleri", { left: 1, right: 0.01 }],
    ["pil-gerilimi-derisim-pilleri", { left: 0.1, right: 0.1 }],
    [
      "pil-gerilimi-derisim-pilleri",
      { kind: "daniell", left: 0.001, right: 1, leftDilution: 10 },
    ],
    ...[
      "molten",
      "water",
      "copperInert",
      "copperActive",
      "brine",
      "magnesiumWater",
    ].map(
      (kind) =>
        ["elektroliz", { kind }] as [
          string,
          Record<string, string | number | boolean>,
        ],
    ),
    ["elektroliz", { powered: false }],
    ["elektroliz", { reversed: true }],
    ["faraday-yasalari", {}],
    [
      "faraday-yasalari",
      { current: 5, seconds: 1930, share: 80, stock: 0.015 },
    ],
    ["faraday-yasalari", { kind: "aluminium", current: 0 }],
    ["faraday-yasalari", { kind: "silver", stock: 0.1 }],
    ["korozyon-katodik-koruma", {}],
    ["korozyon-katodik-koruma", { partner: "Cu" }],
    ["korozyon-katodik-koruma", { partner: "Mg", mass: 0.05, demand: 5000 }],
    ["korozyon-katodik-koruma", { barrier: true }],
    ["korozyon-katodik-koruma", { wet: false }],
    ["korozyon-katodik-koruma", { contact: false }],
    ["korozyon-katodik-koruma", { partner: "none" }],
    ["korozyon-katodik-koruma", { demand: 0 }],
  ];
  const output = process.env.FORGE022_CHEM_A_SSR;
  if (output) fs.mkdirSync(output, { recursive: true });
  for (let i = 0; i < scenarios.length; i++) {
    const [lessonId, patch] = scenarios[i];
    savedLab.value = {
      ...patch,
      reason: "r".repeat(150),
      checked: true,
      prediction: "constructor",
    };
    const html = renderToStaticMarkup(
      createElement(Forge022ChemistryALab, { lessonId }),
    );
    expect(html).toContain(`data-forge022="${lessonId}"`);
    expect(html).toContain("data-model-result");
    expect(html).toContain('role="img"');
    expect(html).not.toContain("NaN");
    expect(html).not.toContain("Infinity");
    expect(html).toContain("r".repeat(120));
    expect(html).not.toContain("r".repeat(121));
    expect(html).not.toContain("Tahminin modelle uyumlu.");
    expect(html).toContain("XP");
    if (output)
      fs.writeFileSync(path.join(output, `${i}-${lessonId}.html`), html);
  }
  savedLab.value = {};
  expect(
    renderToStaticMarkup(
      createElement(Forge022ChemistryALab, { lessonId: "constructor" }),
    ),
  ).toBe("");
});

it("ondalık eşitlikte sahte yön üretmez, gerçek çok küçük farkı silmez", () => {
  const equal = nernstA022("copper", 0.1, 0.3, 1, 3);
  expect(equal.left).toBe(0.1);
  expect(equal.right).toBe(0.1);
  expect(equal.quotient).toBe(1);
  expect(equal.logQ).toBe(0);
  expect(equal.signedVoltage).toBe(0);
  expect(equal.direction).toBe("equal");
  const tiny = nernstA022("copper", 0.10000000000000002, 0.1, 1, 1);
  expect(tiny.logQ).toBeGreaterThan(0);
  expect(tiny.signedVoltage).toBeLessThan(0);
  expect(tiny.direction).toBe("left");
  const other = nernstA022("copper", 0.3, 0.1, 3, 1);
  expect(other.direction).toBe("equal");
});
it("temsil edilemeyen pozitif stok/yük bütçesini sıfırmış gibi sunmaz", () => {
  expect(() => galvanicA022(Number.MIN_VALUE, true, true)).toThrow(
    "CHEMISTRY_A022_PRECISION",
  );
  expect(() => faradayA022("silver", Number.MIN_VALUE, 3600, 100, 0.1)).toThrow(
    "CHEMISTRY_A022_PRECISION",
  );
  expect(() =>
    protectionA022("Zn", true, true, false, Number.MIN_VALUE, Number.MIN_VALUE),
  ).toThrow("CHEMISTRY_A022_PRECISION");
  expect(() =>
    electrolysisA022("water", Number.MIN_VALUE, true, false),
  ).toThrow("CHEMISTRY_A022_PRECISION");
  expect(
    electrolysisA022("water", Number.MIN_VALUE, false, false).actualElectrons,
  ).toBe(0);
  expect(electrolysisA022("water", 0, true, false).status).toBe("zero");
  const maximum = protectionA022("Zn", true, true, false, Number.MIN_VALUE, 1);
  expect(maximum.capacity).toBeGreaterThan(0);
  expect(maximum.usedMass).toBe(Number.MIN_VALUE);
  expect(maximum.remainingMass).toBe(0);
});
