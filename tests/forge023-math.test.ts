import { describe, expect, it, vi } from "vitest";
import {
  Children,
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  angleIdentity023,
  waveRoots023,
  logarithm023,
  sequence023,
  piecewiseLimit023,
  removableLimit023,
  forge023MathGuides,
  forge023MathLessons,
  forge023MathTopics,
} from "../src/learning/forge023Math";
type Saved023 = Record<string, string | number | boolean>;
const restore023 = vi.hoisted(() => ({
  explorations: {} as Record<string, Saved023>,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: restore023.explorations },
    update: async (
      change: (state: { explorations: Record<string, Saved023> }) => {
        explorations: Record<string, Saved023>;
      },
    ) => {
      restore023.explorations = change({
        explorations: restore023.explorations,
      }).explorations;
    },
  }),
}));
import Forge023MathLab from "../src/learning/Forge023MathLab";
describe("AYT matematik 023: koşul, hesap ve öğretim bütünlüğü", () => {
  it("şık yerleri değişse de bağımsız çözülen anlamsal cevapları ve gerekçe bağını korur", () => {
    const expected = [
      [
        "(√6+√2)/4",
        "(√6+√2)/4",
        "−24/25",
        "−7/25",
        "−1/2",
        "11/25",
        "1",
        "24/7",
        "cos20°",
        "−sin40°",
        "sin(a−b)",
        "Sonuç1;tan90°içerenfarkaçılımıkullanılamaz.",
        "1/2",
        "sin50°+sin20°",
      ],
      [
        "{π/6,5π/6}",
        "x=π+2kπ,k∈ℤ",
        "{3π/4,7π/4}",
        "{π/2,3π/2}",
        "4",
        "{0,2π/3,4π/3}",
        "{0,π/2}",
        "3",
        "{π/6,π/2,7π/6,3π/2}",
        "0",
        "π/4",
        "{π/2,3π/2}",
        "3",
        "∅",
        "{0,π}",
        "{−π/2,π/2}",
      ],
      [
        "−3",
        "(1,2)∪(2,∞)",
        "5",
        "3/2",
        "3",
        "2log₂|x|",
        "{5}",
        "4",
        "(0,1/4)",
        "{1/9,27}",
        "(3,∞)",
        "20",
      ],
      [
        "13",
        "a_n=1/(n+3)",
        "3",
        "−7",
        "3",
        "228",
        "11",
        "{−6,6}",
        "96",
        "80",
        "105",
        "13",
      ],
      [
        "4",
        "3",
        "Yoktur.",
        "27",
        "1/6",
        "Sol−1,sağ1;ikiyanlılimityok.",
        "5/2",
        "ℝ\\{1}",
        "4",
        "f(a)tanımlı,limitvarvelimit=f(a).",
        "a’dasağdan,b’desoldansüreklilik.",
        "2",
        "3",
        "Hergerçekcolabilir.",
      ],
    ];
    const plain = (value: string) => value.replace(/\s+/g, "");
    forge023MathLessons.forEach((lesson, j) => {
      expect(
        lesson.questions.map((q) => plain(q.options[q.answer].tr)),
      ).toEqual(expected[j].map(plain));
      const positions = lesson.questions.map((q) => q.answer);
      expect(
        Math.max(
          ...[0, 1, 2, 3, 4].map(
            (x) => positions.filter((v) => v === x).length,
          ),
        ) -
          Math.min(
            ...[0, 1, 2, 3, 4].map(
              (x) => positions.filter((v) => v === x).length,
            ),
          ),
      ).toBeLessThanOrEqual(1);
      for (let period = 1; period < Math.min(10, positions.length); period++)
        expect(
          positions.every((value, i) => value === positions[i % period]),
        ).toBe(false);
      for (const q of lesson.questions) {
        const reasons = q.guidance!.optionReasons;
        expect(reasons.filter((r) => r.startsWith("Doğru:"))).toHaveLength(1);
        expect(reasons[q.answer]).toBe("Doğru: " + q.guidance!.check);
      }
    });
  });
  it("sinüs ve kosinüs toplamını gerçek yönlü açıyla eşleştirir", () => {
    for (const a of [-180, -90, -30, 0, 30, 90, 180])
      for (const b of [-90, -15, 0, 60, 180])
        for (const minus of [false, true]) {
          const m = angleIdentity023(a, b, minus),
            theta = ((a + (minus ? -b : b)) * Math.PI) / 180;
          expect(m.direct.sin).toBeCloseTo(Math.sin(theta), 13);
          expect(m.direct.cos).toBeCloseTo(Math.cos(theta), 13);
          expect(m.expandedSin).toBeCloseTo(m.direct.sin, 13);
          expect(m.expandedCos).toBeCloseTo(m.direct.cos, 13);
          expect(m.half.sin ** 2).toBeCloseTo(m.halfSinSquared, 13);
          expect(m.half.cos ** 2).toBeCloseTo(m.halfCosSquared, 13);
        }
  });
  it("yarım açıyı esas ölçüye erken indirgemez ve tanımsız tanjantı sayı yapmaz", () => {
    expect(angleIdentity023(180, 180, false).half).toEqual({ sin: 0, cos: -1 });
    expect(angleIdentity023(0, 0, false).half).toEqual({ sin: 0, cos: 1 });
    expect(angleIdentity023(30, 60, false).tangent).toBeNull();
    expect(angleIdentity023(30, 60, false).direct.cos).toBe(0);
  });
  it("dalganın iki kökünü, iki kat frekansı ve kaymayı korur", () => {
    const m = waveRoots023(1, 0, 0.5, 1, 0, 0, 360);
    expect(m.roots).toHaveLength(2);
    expect(m.roots[0]).toBeCloseTo(30, 12);
    expect(m.roots[1]).toBeCloseTo(150, 12);
    expect(waveRoots023(1, 0, 1, 2, 0, 0, 360).roots).toEqual([45, 225]);
    const shifted = waveRoots023(1, 1, 0, 1, 0, 0, 360);
    expect(shifted.roots[0]).toBeCloseTo(135, 12);
    expect(shifted.roots[1]).toBeCloseTo(315, 12);
    for (const root of shifted.roots)
      expect(shifted.valueAt(root)).toBeCloseTo(0, 12);
  });
  it("açık ve kapalı sağ ucu gerçek kök sayısında ayırır", () => {
    expect(waveRoots023(1, 0, 0, 1, 0, 0, 360).roots).toEqual([0, 180]);
    expect(waveRoots023(1, 0, 0, 1, 0, 0, 360, true).roots).toEqual([
      0, 180, 360,
    ]);
    expect(waveRoots023(1, 0, 0, 2, 0, 0, 360, true).roots).toEqual([
      0, 90, 180, 270, 360,
    ]);
    expect(waveRoots023(1, 0, 0, 1, 0, -180, 180, true).roots).toEqual([
      -180, 0, 180,
    ]);
  });
  it("faz hesabındaki yuvarlama kapalı sıfır sınırını dışarı atmaz", () => {
    const second = 360 - (2 * Math.atan(6) * 180) / Math.PI;
    for (const sign of [-1, 1]) {
      const open = waveRoots023(
        -3 * sign,
        0.5 * sign,
        0.5 * sign,
        1,
        0,
        0,
        360,
      );
      expect(open.roots).toHaveLength(2);
      expect(open.roots[0]).toBe(0);
      expect(open.roots[1]).toBeCloseTo(second, 11);
      const closed = waveRoots023(
        -3 * sign,
        0.5 * sign,
        0.5 * sign,
        1,
        0,
        0,
        360,
        true,
      );
      expect(closed.roots).toHaveLength(3);
      expect(closed.roots[0]).toBe(0);
      expect(closed.roots[2]).toBe(360);
    }
    const differentLevel = waveRoots023(-3, 0.5, 0, 1, 0, 0, 360, true);
    expect(differentLevel.roots).toHaveLength(2);
    expect(differentLevel.roots.every((x) => x > 0 && x < 360)).toBe(true);
    expect(differentLevel.valueAt(0)).not.toBe(0);
  });
  it("sıfır katsayı, genlik sınırı ve uç seviyedeki birleşen kökü ayrı tutar", () => {
    expect(waveRoots023(0, 0, 0, 1, 0, 0, 360).kind).toBe("all");
    expect(waveRoots023(0, 0, 1, 1, 0, 0, 360).kind).toBe("none");
    expect(waveRoots023(3, 4, 6, 1, 0, 0, 360).roots).toEqual([]);
    expect(waveRoots023(1, 0, 1, 1, 0, 0, 360).roots).toEqual([90]);
    expect(waveRoots023(1, 0, -1, 1, 0, 0, 360).roots).toEqual([270]);
  });
  it("logaritma ve ters üstel hesabı tanım koşuluyla birlikte çalıştırır", () => {
    expect(logarithm023(0.5, 4)).toMatchObject({
      defined: true,
      value: -2,
      inverse: 4,
      increasing: false,
    });
    expect(logarithm023(2, 5, 3, 1)).toMatchObject({
      defined: true,
      value: 2,
      inverse: 5,
    });
    expect(logarithm023(2, 3, 3)).toMatchObject({
      defined: false,
      argument: 0,
      value: null,
    });
    expect(logarithm023(1, 4).defined).toBe(false);
    expect(logarithm023(-2, 4).defined).toBe(false);
    expect(logarithm023(Math.E, Math.E).value).toBeCloseTo(1, 14);
  });
  it("aritmetik ve geometrik terimleri toplamdan ayrı hesaplar", () => {
    expect(sequence023("arithmetic", 5, -2, 7)).toMatchObject({
      last: -7,
      sum: -7,
    });
    expect(sequence023("geometric", 2, 2, 4)).toMatchObject({
      values: [2, 4, 8, 16],
      last: 16,
      sum: 30,
    });
    expect(sequence023("geometric", 7, 1, 15).sum).toBe(105);
    expect(sequence023("geometric", 2, -2, 4)).toMatchObject({
      values: [2, -4, 8, -16],
      sum: -10,
    });
  });
  it("sıfırda oranı uydurmaz ve iki başlangıçlı indirgemeyi korur", () => {
    expect(sequence023("geometric", 2, 0, 4)).toMatchObject({
      values: [2, 0, 0, 0],
      ratioDefined: false,
    });
    expect(sequence023("recurrence", 1, 1, 7)).toMatchObject({
      values: [1, 1, 2, 3, 5, 8, 13],
      sum: 33,
    });
    expect(sequence023("triangular", 0, 0, 5)).toMatchObject({
      values: [1, 3, 6, 10, 15],
      sum: 35,
    });
  });
  it("nokta değerini değiştirirken ortak limiti değiştirmez", () => {
    const ordinary = piecewiseLimit023(1, 3, 3, 3, 1, 2, true, 0.01),
      shifted = piecewiseLimit023(1, 3, 3, 9, 1, 2, true, 0.01),
      hole = piecewiseLimit023(1, 3, 3, 9, 1, 2, false, 0.01);
    expect(ordinary.continuous).toBe(true);
    expect(shifted).toMatchObject({ limit: 3, value: 9, continuous: false });
    expect(hole).toMatchObject({ limit: 3, value: null, continuous: false });
    expect(shifted.sampleLeft.x).toBeCloseTo(0.99);
    expect(shifted.sampleRight.x).toBeCloseTo(1.01);
  });
  it("farklı yanlardan ortalama limit üretmez ve tek yanlı sürekliliği korur", () => {
    expect(piecewiseLimit023(0, 2, 5, 2, 1, 1, true, 0.1)).toMatchObject({
      limit: null,
      continuous: false,
      leftContinuous: true,
      rightContinuous: false,
    });
    expect(piecewiseLimit023(0, 2, 5, 5, 1, 1, true, 0.1)).toMatchObject({
      limit: null,
      leftContinuous: false,
      rightContinuous: true,
    });
  });
  it("rasyonel deliğin limitini ve sürekli uzatmasını ayırır", () => {
    const hole = removableLimit023(2, 1, true, 0.001),
      filled = removableLimit023(2, 4, true, 0.001);
    expect(hole).toMatchObject({
      limit: 4,
      value: 1,
      continuous: false,
      excluded: 2,
    });
    expect(filled.continuous).toBe(true);
    expect(hole.sampleLeft.y).toBeCloseTo(3.999, 12);
    expect(hole.sampleRight.y).toBeCloseTo(4.001, 12);
  });
  it("ilan edilen sayısal model alanı dışını sessiz yanlış hesaba dönüştürmez", () => {
    expect(() => angleIdentity023(Infinity, 0, false)).toThrow(RangeError);
    expect(() => waveRoots023(1, 0, 0.25, 1, 0, 0, 360)).toThrow(RangeError);
    expect(() => waveRoots023(1, 0, 0, 0, 0, 0, 360)).toThrow(RangeError);
    expect(() => waveRoots023(1, 0, 0, 1, 0.5, 0, 360)).toThrow(RangeError);
    expect(() => sequence023("geometric", 1, 4, 5)).toThrow(RangeError);
    expect(() => sequence023("arithmetic", 1, 1, 0)).toThrow(RangeError);
    expect(() => piecewiseLimit023(0, 1, 1, 1, 1, 1, true, 1e-7)).toThrow(
      RangeError,
    );
    expect(() => logarithm023(NaN, 1)).toThrow(RangeError);
  });
  it("beş ayrı kaynak başlığında öğretim, çözümler ve gerekli metinli sorular sunar", () => {
    expect(Object.values(forge023MathTopics)).toEqual([
      "detail-470",
      "detail-471",
      "detail-472",
      "detail-473",
      "detail-474",
    ]);
    expect(forge023MathGuides).toHaveLength(5);
    expect(forge023MathGuides.flatMap((g) => g.sections)).toHaveLength(82);
    expect(forge023MathGuides.flatMap((g) => g.examples)).toHaveLength(30);
    expect(
      forge023MathGuides.every(
        (g) =>
          g.sections.every((s) => s.paragraphs.length >= 2) &&
          g.examples.every((e) => e.steps.length === 3 && e.check && e.pitfall),
      ),
    ).toBe(true);
    const questions = forge023MathLessons.flatMap((l) => l.questions);
    expect(questions).toHaveLength(68);
    expect(new Set(questions.map((q) => q.id)).size).toBe(68);
    for (const q of questions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.guidance?.optionReasons).toHaveLength(5);
      expect(q.guidance!.steps.length).toBeGreaterThanOrEqual(2);
      expect(q.guidance!.check).toBeTruthy();
      expect(q.guidance!.commonError).toBeTruthy();
    }
  });
});

describe("023 eski kayıt: gerçek hook ve ayrı ham kayıt", () => {
  type Props = {
    children?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    onChange?: (event: {
      target: { value: string };
      currentTarget: { value: string };
    }) => void;
    "aria-label"?: string;
  };
  const nodes = (tree: ReactNode): ReactElement<Props>[] => {
    const result: ReactElement<Props>[] = [];
    Children.forEach(tree, (child) => {
      if (isValidElement<Props>(child))
        result.push(child, ...nodes(child.props.children));
    });
    return result;
  };
  const key = (id: string) => "forge023-math:" + id;
  const render = (id: string) =>
    renderToStaticMarkup(createElement(Forge023MathLab, { lessonId: id }));
  const families: [string, Saved023, string, string[], string][] = [
    [
      "ayt-toplam-fark-yarim-aci",
      { a: 30, b: 60 },
      "positive",
      ["a", "b", "subtract"],
      "x",
    ],
    [
      "ayt-trigonometrik-denklemler",
      {},
      "2",
      ["A", "B", "C", "frequency", "phase", "closed"],
      "a",
    ],
    [
      "ayt-logaritma",
      {},
      "defined",
      ["base", "x", "horizontal", "vertical"],
      "a",
    ],
    [
      "ayt-diziler",
      {},
      "up",
      ["sequence", "first", "parameter", "count"],
      "base",
    ],
    [
      "ayt-diziler",
      { sequence: "triangular" },
      "up",
      ["sequence", "count"],
      "parameter",
    ],
    [
      "ayt-limit-sureklilik",
      {},
      "continuous",
      [
        "mode",
        "origin",
        "defined",
        "approach",
        "value",
        "left",
        "right",
        "leftSlope",
        "rightSlope",
      ],
      "a",
    ],
    [
      "ayt-limit-sureklilik",
      { mode: "hole", value: 0 },
      "continuous",
      ["origin", "defined", "approach", "value"],
      "left",
    ],
    [
      "ayt-limit-sureklilik",
      { defined: false },
      "limit",
      [
        "mode",
        "origin",
        "approach",
        "left",
        "right",
        "leftSlope",
        "rightSlope",
      ],
      "value",
    ],
  ];
  it("gerçek browser bulgusundaki b='60' onarımını75° modelinde eski90° gerekçesini kapatarak yapar", () => {
    const id = families[0][0];
    restore023.explorations[key(id)] = {
      a: 30,
      b: "60",
      guess: "positive",
      reason: "30°+60°=90°",
      checked: true,
    };
    const html = render(id);
    expect(html).toContain('data-angle-result="true">75°');
    expect(html).not.toContain('role="status"');
    expect(
      nodes(Forge023MathLab({ lessonId: id })).find((n) => n.type === "button")!
        .props.disabled,
    ).toBe(true);
    restore023.explorations = {};
  });
  it("aktif yanlış ham türü reddeder; ilk yeni gerekçe gerçek hook setter ile tam kanonik kayıt yazar", () => {
    for (const [id, seed, guess, fields, inactive] of families) {
      for (const field of fields) {
        const stringField = ["base", "sequence", "mode"].includes(field),
          booleanField = ["subtract", "closed", "defined"].includes(field),
          bad = stringField ? 1 : "1";
        restore023.explorations[key(id)] = {
          ...seed,
          [field]: bad,
          guess,
          reason: "Eski gerekçe",
          checked: true,
        };
        expect(render(id), id + "/" + field).not.toContain('role="status"');
        const list = nodes(Forge023MathLab({ lessonId: id }));
        expect(list.find((n) => n.type === "button")!.props.disabled).toBe(
          true,
        );
        const reason = list.find((n) => n.type === "textarea")!;
        reason.props.onChange!({
          target: { value: "x" },
          currentTarget: { value: "x" },
        });
        const saved = restore023.explorations[key(id)];
        expect(typeof saved[field]).toBe(
          stringField ? "string" : booleanField ? "boolean" : "number",
        );
        expect(saved.reason).toBe("x");
        expect(saved.checked).toBe(false);
        const compare = nodes(Forge023MathLab({ lessonId: id })).find(
          (n) => n.type === "button",
        )!;
        expect(compare.props.disabled).toBe(false);
        compare.props.onClick!();
        expect(render(id)).toContain('role="status"');
      }
      restore023.explorations[key(id)] = {
        ...seed,
        [inactive]: true,
        guess,
        reason: "x",
        checked: true,
      };
      expect(render(id), "inactive/" + inactive).toContain('role="status"');
    }
    restore023.explorations = {};
  });
  it("aynı tür bozuk enum,adım ve sınır eski kıyası açmaz; ilk gerekçe görünen değerleri kalıcı düzeltir", () => {
    const cases: [string, Saved023, string, string, string | number][] = [
      [families[0][0], { b: 999 }, "positive", "b", 180],
      [families[1][0], { C: 0.25 }, "2", "C", 0.5],
      [families[2][0], { base: "constructor" }, "defined", "base", "2"],
      [
        families[3][0],
        { sequence: "constructor" },
        "up",
        "sequence",
        "arithmetic",
      ],
      [families[3][0], { count: 99 }, "up", "count", 12],
      [
        families[5][0],
        { mode: "constructor" },
        "continuous",
        "mode",
        "piecewise",
      ],
      [families[5][0], { approach: NaN }, "continuous", "approach", 1],
    ];
    for (const [id, seed, guess, field, normalized] of cases) {
      restore023.explorations[key(id)] = {
        ...seed,
        guess,
        reason: "Eski gerekçe",
        checked: true,
      };
      expect(render(id)).not.toContain('role="status"');
      nodes(Forge023MathLab({ lessonId: id })).find(
        (n) => n.type === "textarea",
      )!.props.onChange!({
        target: { value: "x" },
        currentTarget: { value: "x" },
      });
      expect(restore023.explorations[key(id)][field]).toBe(normalized);
      expect(
        nodes(Forge023MathLab({ lessonId: id })).find(
          (n) => n.type === "button",
        )!.props.disabled,
      ).toBe(false);
    }
    restore023.explorations = {};
  });
  it("boşu reddeder,tek karakteri kabul eder ve setter120üst sınırını korur", () => {
    for (const [id, seed, guess] of families.slice(0, 5)) {
      for (const reason of ["", "   "]) {
        restore023.explorations[key(id)] = {
          ...seed,
          guess,
          reason,
          checked: true,
        };
        expect(render(id)).not.toContain('role="status"');
      }
      restore023.explorations[key(id)] = {
        ...seed,
        guess,
        reason: "x",
        checked: true,
      };
      expect(render(id)).toContain('role="status"');
      nodes(Forge023MathLab({ lessonId: id })).find(
        (n) => n.type === "textarea",
      )!.props.onChange!({
        target: { value: "a".repeat(200) },
        currentTarget: { value: "a".repeat(200) },
      });
      expect(restore023.explorations[key(id)].reason).toHaveLength(120);
    }
    restore023.explorations = {};
  });
});
