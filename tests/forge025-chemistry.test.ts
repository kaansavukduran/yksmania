import { describe, it, expect, vi } from "vitest";
import {
  createElement,
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  energy025,
  fuelChoices025,
  hydrogenCycle025,
  borohydride025,
  materialFlow025,
  materialChoices025,
  reuseImpact025,
  cube025,
  lattice025,
  length025,
  chemistryDefaults025,
  normalizeChemistry025,
  forge025ChemistryLessons,
  forge025ChemistryGuides,
  forge025ChemistryTopics,
} from "../src/learning/forge025Chemistry";
const fixture = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
  set: vi.fn(),
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (key: string, defaults: object) => [
    Object.fromEntries(
      Object.entries(defaults).map(([k, v]) => [
        k,
        typeof fixture.values[key]?.[k] === typeof v
          ? fixture.values[key][k]
          : v,
      ]),
    ),
    (patch: Record<string, string | number | boolean>) => {
      fixture.set(patch);
      fixture.values[key] = { ...fixture.values[key], ...patch };
    },
  ],
}));
vi.mock("../src/store", () => ({
  useApp: () => ({ state: { explorations: fixture.values } }),
}));
import Lab from "../src/learning/Forge025ChemistryLab";
type ProbeProps = {
  children?: ReactNode;
  label?: string;
  value?: unknown;
  disabled?: boolean;
  onChange?: (value: unknown) => void;
  onClick?: () => void;
};
function callbackNodes(tree: ReactNode) {
  const nodes: ReactElement<ProbeProps>[] = [];
  const visit = (value: ReactNode) =>
    Children.forEach(value, (child) => {
      if (isValidElement<ProbeProps>(child)) {
        nodes.push(child);
        visit(child.props.children);
      }
    });
  visit(tree);
  return nodes;
}

const lessons = forge025ChemistryLessons,
  key = (id: string) => "forge025:chemistry:" + id,
  compact = (s: string) => s.replace(/\s/g, "");
const keys = [
  [
    "Oluşmaları tüketimlerine göre çok uzun jeolojik süre gerektirir",
    "A–B–C",
    "22,0",
    "0,90",
    "%25;120MJ",
    "1,50",
    "6,0kWh;21,6MJ",
    "Yeryüzünün yaydığı kızılötesini soğurup yeniden yaymaları",
    "SOx ve NOx",
    "CO zehirlenme mekanizmasıyla;CO₂ sera etkisiyle öne çıkar",
    "1,20",
    "Hava kinetiği→mekanik dönme→elektrik",
    "Sıcak kaya ve akışkanlarla yer içi ısısından yararlanılır",
    "Yenilenme ve tüm yaşam döngüsü koşullarıyla değerlendirilmelidir",
    "Hidrojenin bütün yaşam döngüsünün sıfır karbon olduğunu",
    "0,60molH₂;0,30molO₂",
    "35",
    "0,80",
    "Geri üretimin enerji ve madde girdisi bilançosu ayrıca gerekir",
    "Fisyon;füzyon",
    "240MJ elektrik;360MJ diğer aktarım",
    "Yenilenemez;düşük işletme CO₂’sine rağmen radyoaktif atık yönetimi gerekir",
    "Sistem sınırları aynı değildir",
    "LNG sıvılaştırılmış;CNG sıkıştırılmış doğal gazdır",
    "B;4,00kgCO₂",
  ],
  [
    "Çevresel ve toplumsal boyutlarla gelecek kapasitesinin dışlanması",
    "A yeniden kullanım;B geri dönüşüm",
    "Her ortamda hızla biyobozunacağını",
    "Selüloz",
    "–CH₂–CH₂–",
    "PVC Cl taşır;PE taşımaz",
    "Basit tekrar eritme yolu her polimer için geçerli değildir",
    "Ürünün her yerde kesin geri dönüştürüleceği",
    "270",
    "%45",
    "288",
    "40",
    "Lifler kısalabilir ve süreçte kirlilik/kayıp oluşabilir",
    "Alaşım ve kirlenme kontrolü kaliteyi etkiler",
    "140",
    "14’e karşı20birim;yeniden kullanım6birim az",
    "Bu verilerle kullanım sayısını artırmak üstünlük sağlamaz",
    "162",
    "Enerji geri kazanımı",
    "Belirtilen üretim sınırında enerji%30 azalmıştır",
  ],
  [
    "10⁻⁹m",
    "40",
    "Kalınlığı nano ölçektedir;diğer boyutların büyük olması bunu dışlamaz",
    "0,15",
    "64parça;60nm",
    "Hacim aynı;alan5kat",
    "Toplam kütle",
    "27küre;3kat alan",
    "98",
    "n=4;yaklaşık%87,5’e karşı%57,8",
    "16",
    "Erişilebilir yüzey ideal ayrık hesaplamadan azalabilir",
    "Tepkime hızının kesin iki katına çıktığı",
    "22,5",
    "Kesin atom sayısı için ek malzeme ve yapı bilgisi gerekir",
    "Karbon elementi korunur;boyut/yüzey özellikleri değişebilir",
    "Boyutun optik etkisi malzeme ve koşulla değerlendirilir",
    "A yukarıdan aşağıya;B aşağıdan yukarıya",
    "Hedef,mevcut evrensel klinik başarı kanıtı değildir",
    "Risk için bileşim,şekil,yüzey,doz ve maruziyet de incelenir",
  ],
];
describe("025 chemistry energy,material and nano systems", () => {
  it("teaches the exact three headings with substantial positive content and standalone guided questions", () => {
    expect(Object.values(forge025ChemistryTopics)).toEqual([
      "detail-460",
      "detail-461",
      "detail-462",
    ]);
    expect(lessons.map((l) => l.questions.length)).toEqual([25, 20, 20]);
    expect(forge025ChemistryGuides.map((g) => g.sections.length)).toEqual([
      24, 22, 18,
    ]);
    const qs = lessons.flatMap((l) => l.questions);
    expect(qs).toHaveLength(65);
    expect(new Set(qs.map((q) => q.id)).size).toBe(65);
    expect(new Set(qs.flatMap((q) => q.guidance!.steps)).size).toBe(195);
    for (const [group, l] of lessons.entries()) {
      expect(l.subjectId).toBe("ayt-kimya");
      expect(l.tags).not.toContain("soru-seti");
      expect(l.source.tr).toContain("özgün");
      for (const [i, q] of l.questions.entries()) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(compact(q.options[q.answer].tr), q.id).toBe(
          compact(keys[group][i]),
        );
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
          true,
        );
        expect(q.guidance!.steps).toHaveLength(3);
        expect(q.guidance!.optionReasons).toHaveLength(5);
        expect(q.guidance!.steps[0]).not.toBe(q.guidance!.knowledge[0]);
        expect(q.guidance!.steps[1]).not.toBe(q.guidance!.strategy);
        for (const [j, r] of q.guidance!.optionReasons.entries())
          expect(r.startsWith("Doğru."), q.id + "/" + j).toBe(j === q.answer);
      }
    }
    for (const g of forge025ChemistryGuides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(
          s.paragraphs.every((p) => p.length > 100),
          s.title,
        ).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(40);
        expect(e.pitfall.length).toBeGreaterThan(30);
        expect(qs.some((q) => q.prompt.tr === e.prompt)).toBe(false);
      }
    }
  });
  it("balances answers without an exposed cycle and retains reasons with their semantic option", () => {
    const qs = lessons.flatMap((l) => l.questions),
      a = qs.map((q) => q.answer);
    expect([0, 1, 2, 3, 4].map((n) => a.filter((x) => x === n).length)).toEqual(
      [13, 13, 13, 13, 13],
    );
    for (const l of lessons)
      expect(
        [0, 1, 2, 3, 4].map(
          (n) => l.questions.filter((q) => q.answer === n).length,
        ),
      ).toEqual(Array(5).fill(l.questions.length / 5));
    for (let period = 1; period <= 20; period++)
      expect(a.every((x, i) => i < period || x === a[i - period])).toBe(false);
    const pairs = (g: number, q: number) =>
      Object.fromEntries(
        lessons[g].questions[q].options.map((o, i) => [
          compact(o.tr),
          lessons[g].questions[q].guidance!.optionReasons[i],
        ]),
      );
    expect(pairs(0, 2)["16,0"]).toContain("0,50×32=16,0");
    expect(pairs(2, 4)["64parça;15nm"]).toContain("240/16=15");
    expect(pairs(2, 3)["1600"]).toContain("Tek yüz alanı");
    expect(pairs(2, 8)["75"]).toContain("125−2×25=75");
    expect(pairs(1, 9)["%135"]).toContain("108/180=%60");
  });
  it("independently closes chemical atom and mass inventories for four fuels at all bounded targets", () => {
    const oracle: Record<
      string,
      { C: number; H: number; O: number; M: number; heat: number }
    > = {
      carbon: { C: 1, H: 0, O: 0, M: 12, heat: 32.8 },
      methane: { C: 1, H: 4, O: 0, M: 16, heat: 50 },
      ethanol: { C: 2, H: 6, O: 1, M: 46, heat: 26.8 },
      hydrogen: { C: 0, H: 2, O: 0, M: 2, heat: 120 },
    };
    for (const [fuel, o] of Object.entries(oracle))
      for (const target of [10, 20, 30, 40, 50])
        for (let eff = 20; eff <= 60; eff++) {
          const r = energy025(fuel, target, eff),
            mass = target / ((eff / 100) * o.heat),
            mol = (mass * 1000) / o.M;
          expect(r.massKg).toBeCloseTo(mass, 12);
          expect(r.co2Kg).toBeCloseTo((mol * o.C * 44) / 1000, 12);
          expect(r.oxygenMoles).toBeCloseTo(
            mol * (o.C + o.H / 4 - o.O / 2),
            10,
          );
          expect(r.waterMoles).toBeCloseTo((mol * o.H) / 2, 10);
          expect(r.massKg + r.oxygenKg).toBeCloseTo(r.co2Kg + r.waterKg, 10);
          expect(r.input).toBeCloseTo(r.usefulMJ + r.rejected, 10);
          expect(r.balanced).toBe(true);
          expect(r.co2Kg).toBeLessThan(30);
        }
    expect(energy025("carbon", 30, 40).equation).toBe("C + O₂ → CO₂");
    expect(energy025("hydrogen", 30, 40).equation).toBe("H₂ + 0.5 O₂ → H₂O");
    expect(energy025("hydrogen", 30, 40).co2Kg).toBe(0);
  });
  it("compares equal useful service rather than equal fuel mass", () => {
    for (const fuel of Object.keys(fuelChoices025)) {
      const low = energy025(fuel, 40, 20),
        high = energy025(fuel, 40, 40);
      expect(low.usefulMJ).toBe(high.usefulMJ);
      expect(low.massKg).toBeCloseTo(2 * high.massKg, 12);
      expect(low.co2Kg).toBeCloseTo(2 * high.co2Kg, 12);
    }
    const r = energy025("methane", 40, 50);
    expect(r.massKg).toBeCloseTo(1.6, 12);
    expect(r.co2Kg).toBeCloseTo(4.4, 12);
    expect(r.scope).toContain("yaşam döngüsü");
  });
  it("multiplies hydrogen conversion efficiencies on the same energy basis", () => {
    for (let input = 10; input <= 100; input += 10)
      for (let e = 40; e <= 90; e += 10)
        for (let c = 30; c <= 70; c += 10) {
          const r = hydrogenCycle025(input, e, c);
          expect(r.output).toBeCloseTo((input * e * c) / 10000, 12);
          expect(r.roundTripPct).toBeCloseTo((e * c) / 100, 12);
          expect(r.output + r.firstLoss + r.secondLoss).toBeCloseTo(input, 12);
          expect(r.output).toBeLessThan(input);
          expect(r.balanced).toBe(true);
        }
    expect(hydrogenCycle025(80, 75, 55).output).toBeCloseTo(33, 12);
  });
  it("balances sodium borohydride,water and hydrogen without treating regeneration as free energy", () => {
    for (let i = 1; i <= 40; i++) {
      const mol = i / 10,
        r = borohydride025(mol);
      expect(r.water).toBeCloseTo(2 * mol, 12);
      expect(r.hydrogen).toBeCloseTo(4 * mol, 12);
      expect(r.left).toEqual(r.right);
      expect(r.left.H).toBeCloseTo(2 * r.hydrogen, 12);
      expect(r.balanced).toBe(true);
      expect(r.scope).toContain("enerji");
    }
  });
  it("conserves every stream and applies each recovery percentage to its own input", () => {
    for (const initial of [100, 370, 1000])
      for (const avoid of [0, 13, 30])
        for (const reuse of [0, 17, 40])
          for (const collection of [0, 40, 100])
            for (const accept of [0, 70, 100])
              for (const yieldPct of [0, 80, 100])
                for (const material of Object.keys(materialChoices025)) {
                  const r = materialFlow025(
                      initial,
                      avoid,
                      reuse,
                      collection,
                      accept,
                      yieldPct,
                      material,
                    ),
                    expected =
                      (((((initial *
                        (1 - avoid / 100) *
                        (1 - reuse / 100) *
                        collection) /
                        100) *
                        accept) /
                        100) *
                        yieldPct) /
                      100;
                  expect(r.recovered).toBeCloseTo(expected, 9);
                  expect(
                    r.avoided + r.reused + r.recovered + r.disposed,
                  ).toBeCloseTo(initial, 9);
                  expect(
                    r.uncollected + r.sortingReject + r.processReject,
                  ).toBeCloseTo(r.disposed, 9);
                  expect(r.virginNeeded).toBeCloseTo(r.disposed, 9);
                  expect(r.energySaved).toBeCloseTo(
                    (r.avoided + r.reused) * r.virgin +
                      r.recovered * (r.virgin - r.recycled),
                    7,
                  );
                  expect(r.balanced).toBe(true);
                  for (const n of [
                    r.avoided,
                    r.reused,
                    r.collected,
                    r.accepted,
                    r.recovered,
                    r.disposed,
                  ])
                    expect(n).toBeGreaterThanOrEqual(0);
                }
    expect(materialFlow025(500, 0, 0, 80, 75, 90, "pet").recovered).toBe(270);
    expect(materialFlow025(500, 0, 0, 0, 100, 100, "paper").recovered).toBe(0);
    expect(materialFlow025(500, 0, 0, 100, 100, 100, "glass").disposed).toBe(0);
  });
  it("compares decimal reuse impacts exactly,including small real differences and equality boundaries", () => {
    expect(reuseImpact025(12, 18, 0.3, 1.8).advantage).toBe("equal");
    expect(reuseImpact025(11, 18, 0.3, 1.8).advantage).toBe("single");
    expect(reuseImpact025(13, 18, 0.3, 1.8).advantage).toBe("reusable");
    expect(reuseImpact025(1, 0.1, 0, 0.1000000005)).toMatchObject({
      advantage: "reusable",
      difference: 0.0000000005,
    });
    // Positive difference means single-use total is larger,so reusable wins.
    expect(reuseImpact025(1, 0.1, 0, 0.1000000005).advantage).toBe("reusable");
    expect(reuseImpact025(1, 0.1000000005, 0, 0.1).advantage).toBe("single");
    expect(reuseImpact025(10, 12, 0.2, 2)).toMatchObject({
      reusable: 14,
      single: 20,
      difference: 6,
      advantage: "reusable",
    });
    for (const s of [0.1, 1, 5])
      expect(reuseImpact025(100, 1, s, s).breakEven).toBeNull();
    expect(reuseImpact025(1, 0.1, 1e-300, 0.1).advantage).toBe("single");
  });
  it("derives cube surface area and volume from geometry rather than a visual counter", () => {
    for (const edge of [10, 20, 100, 300, 1000])
      for (let k = 1; k <= 10; k++) {
        const r = cube025(edge, k);
        expect(r.pieces).toBe(k ** 3);
        expect(r.smallEdge).toBe(edge / k);
        expect(r.totalVolume).toBeCloseTo(edge ** 3, 5);
        expect(r.totalArea).toBeCloseTo(6 * edge ** 2 * k, 5);
        expect(r.surfacePerVolume).toBeCloseTo((6 * k) / edge, 12);
        expect(r.areaRatio).toBeCloseTo(k, 12);
        expect(r.balanced).toBe(true);
      }
    expect(cube025(10, 10).nanorange).toBe(true);
    expect(cube025(1000, 10).nanorange).toBe(true);
    expect(cube025(1000, 9).nanorange).toBe(false);
  });
  it("counts every boundary point once across lattice slices", () => {
    for (let n = 2; n <= 16; n++) {
      let all = 0,
        surface = 0;
      for (let layer = 1; layer <= n; layer++) {
        const r = lattice025(n, layer);
        expect(r.points).toHaveLength(n * n);
        all += r.points.length;
        surface += r.surfaceInLayer;
        expect(r.surfaceInLayer).toBe(
          layer === 1 || layer === n ? n * n : 4 * n - 4,
        );
        expect(r.points.every((p) => p.z === layer - 1)).toBe(true);
      }
      expect(all).toBe(n ** 3);
      expect(surface).toBe(n ** 3 - (n - 2) ** 3);
    }
    expect(lattice025(5, 3)).toMatchObject({
      total: 125,
      interior: 27,
      surface: 98,
      surfaceInLayer: 16,
    });
  });
  it("converts the same length through metre,millimetre,micrometre and nanometre scales", () => {
    for (const [unit, factor] of Object.entries({
      m: 1e9,
      mm: 1e6,
      μm: 1e3,
      nm: 1,
    }))
      for (const value of [0.001, 0.04, 1, 50, 1e6]) {
        const r = length025(value, unit);
        expect(r.nanometres).toBeCloseTo(
          value * factor,
          Math.max(0, 9 - Math.log10(value * factor)),
        );
        expect(r.metres * 1e9).toBe(r.nanometres);
      }
    expect(length025(0.04, "μm").nanometres).toBeCloseTo(40, 10);
  });
  it("rejects invalid types,enums and out-of-domain inputs without numeric coercion", () => {
    for (const bad of [
      NaN,
      Infinity,
      -Infinity,
      undefined,
      null,
      "30",
      true,
      -1,
    ]) {
      expect(() => energy025("methane", bad as number, 40)).toThrow(RangeError);
      expect(() => hydrogenCycle025(bad as number, 70, 50)).toThrow(RangeError);
      expect(() => borohydride025(bad as number)).toThrow(RangeError);
      expect(() =>
        materialFlow025(bad as number, 0, 0, 100, 100, 100, "pet"),
      ).toThrow(RangeError);
      expect(() => cube025(bad as number, 3)).toThrow(RangeError);
      expect(() => lattice025(bad as number, 1)).toThrow(RangeError);
      expect(() => length025(bad as number, "nm")).toThrow(RangeError);
    }
    for (const invalid of ["", "__proto__", "constructor", "other", null]) {
      expect(() => energy025(invalid as string, 30, 40)).toThrow();
      expect(() =>
        materialFlow025(500, 0, 0, 100, 100, 100, invalid as string),
      ).toThrow();
      expect(() => length025(1, invalid as string)).toThrow();
    }
    expect(() => cube025(300, 1.5)).toThrow();
    expect(() => lattice025(5, 6)).toThrow();
    expect(() => lattice025(5, 0)).toThrow();
    expect(() => reuseImpact025(1.5, 12, 0.2, 2)).toThrow();
    expect(() => borohydride025(4.1)).toThrow();
    expect(() => energy025("methane", 30, 0)).toThrow();
  });
  it("normalizes restored dependent bounds and native-control steps while clearing stale checked answers", () => {
    expect(
      normalizeChemistry025({
        ...chemistryDefaults025,
        lattice: 3,
        layer: 9,
        edge: 333,
        initial: 445,
        bor: 0.26,
        efficiency: 39.7,
        guess: "1",
        reason: "Önceden kaydedildi.",
        checked: true,
        show: true,
      }),
    ).toMatchObject({
      lattice: 3,
      layer: 3,
      edge: 330,
      initial: 450,
      bor: 0.3,
      efficiency: 40,
      guess: "",
      reason: "",
      checked: false,
      show: false,
    });
    expect(
      normalizeChemistry025({
        ...chemistryDefaults025,
        fuel: "__proto__",
        useful: Infinity,
        unit: "bad",
      }),
    ).toMatchObject({ fuel: "methane", useful: 30, unit: "nm" });
    expect(normalizeChemistry025({ ...chemistryDefaults025 })).toEqual(
      chemistryDefaults025,
    );
  });
  it("renders all model modes and bounded presets without React warnings or exploration writes", () => {
    const states: {
      id: string;
      state: Record<string, string | number | boolean>;
    }[] = [];
    const add = (
      group: number,
      state: Record<string, string | number | boolean>,
    ) => states.push({ id: lessons[group].id, state });
    for (const fuel of Object.keys(fuelChoices025))
      for (const useful of [10, 30, 50])
        for (const efficiency of [20, 40, 60])
          add(0, { fuel, useful, efficiency });
    for (const electric of [10, 60, 100])
      for (const electrolysis of [40, 70, 90])
        for (const cell of [30, 50, 70])
          add(0, { energyMode: "hydrogen", electric, electrolysis, cell });
    for (const bor of [0.1, 0.5, 4]) add(0, { energyMode: "bor", bor });
    for (const material of Object.keys(materialChoices025))
      for (const collection of [0, 80, 100])
        for (const accept of [0, 90, 100])
          for (const process of [0, 80, 100])
            add(1, { material, collection, accept, process });
    for (const uses of [1, 10, 100])
      for (const wash of [0, 0.2, 5])
        for (const single of [0.1, 2, 10])
          add(1, { sustainMode: "reuse", uses, wash, single });
    for (const edge of [10, 300, 1000])
      for (let divisions = 1; divisions <= 10; divisions++)
        add(2, { edge, divisions });
    for (const n of [2, 6, 16])
      for (const layer of new Set([1, Math.ceil(n / 2), n]))
        add(2, { nanoMode: "lattice", lattice: n, layer });
    for (const unit of ["m", "mm", "μm", "nm"])
      for (const length of [0.001, 50, 1000])
        add(2, { nanoMode: "length", length, unit });
    expect(states).toHaveLength(251);
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      for (const { id, state } of states) {
        fixture.values[key(id)] = state;
        const html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
        expect(html).toContain(`data-forge025="${id}"`);
        expect(html).toContain("data-model-result");
        expect(html).not.toMatch(/NaN|Infinity|undefined|foreignObject/);
        expect(html).toContain("Gerekçen");
        expect(html).toContain('disabled=""');
        if (state.nanoMode !== "length") expect(html).toContain("<svg");
      }
      expect(error).not.toHaveBeenCalled();
      expect(fixture.set).not.toHaveBeenCalled();
    } finally {
      error.mockRestore();
      fixture.values = {};
    }
  });
  it("keeps quantitative cube geometry within its viewBox and changes real sizes and cut counts", () => {
    const id = lessons[2].id;
    for (const edge of [10, 300, 1000])
      for (const divisions of [1, 2, 10]) {
        fixture.values[key(id)] = { edge, divisions };
        const html = renderToStaticMarkup(createElement(Lab, { lessonId: id })),
          svg = html.match(
            /<svg[^>]*viewBox="0 0 ([\d.]+) ([\d.]+)"[^>]*>([\s\S]*?)<\/svg>/,
          )!;
        expect(svg).not.toBeNull();
        const width = Number(svg[1]),
          height = Number(svg[2]),
          rects = [...svg[3].matchAll(/<rect\b([^>]*)>/g)];
        for (const match of rects) {
          const attr = Object.fromEntries(
            [...match[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((x) => [
              x[1],
              x[2],
            ]),
          );
          expect(Number(attr.x) + Number(attr.width)).toBeLessThanOrEqual(
            width,
          );
          expect(Number(attr.y) + Number(attr.height)).toBeLessThanOrEqual(
            height,
          );
        }
        expect((svg[3].match(/data-cut=/g) || []).length).toBe(divisions - 1);
      }
    fixture.values[key(id)] = { edge: 300, divisions: 3 };
    const a = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
    fixture.values[key(id)] = { edge: 600, divisions: 3 };
    const b = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
    expect(a).not.toBe(b);
    expect(a).toContain('width="69"');
    expect(b).toContain('width="138"');
    fixture.values = {};
  });
  it("requires a valid answer and written reason,and clears success for corrupt restored models", () => {
    const id = lessons[0].id;
    fixture.values[key(id)] = {
      guess: "yes",
      reason: "Yakıt karbon taşıyor.",
      checked: true,
    };
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: id })),
    ).toContain("Kanıtla uyumlu.");
    const invalidStates: Record<string, string | number | boolean>[] = [
      {
        fuel: "bad",
        guess: "yes",
        reason: "Eski gerekçe",
        checked: true,
        show: true,
      },
      { guess: "invalid", reason: "Eski gerekçe", checked: true },
      { guess: "yes", reason: "", checked: true },
    ];
    for (const state of invalidStates) {
      fixture.values[key(id)] = state;
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
      expect(html).not.toContain("Kanıtla uyumlu.");
    }
    fixture.values[key(lessons[2].id)] = {
      divisions: 4,
      guess: "64",
      reason: "4³=64",
      checked: true,
    };
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: lessons[2].id })),
    ).toContain("Kanıtla uyumlu.");
    fixture.values = {};
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: "unavailable" })),
    ).toBe("");
  });
  it("persists canonical restored fields through real prediction,reason,compare and model callbacks", () => {
    const id = lessons[0].id,
      k = key(id);
    fixture.values[k] = {
      fuel: "constructor",
      nanoMode: "constructor",
      guess: "no",
      reason: "Eski yanıt",
      checked: true,
      show: true,
    };
    const render = () => callbackNodes(Lab({ lessonId: id }));
    const guess = render().find(
      (n) => n.props.label === "Kullanım noktasında CO₂ oluşur mu?",
    )!;
    expect(guess.props.value).toBe("");
    guess.props.onChange!("yes");
    expect(fixture.values[k]).toMatchObject({
      fuel: "methane",
      nanoMode: "cube",
      guess: "yes",
      reason: "",
      checked: false,
      show: false,
    });
    render().find((n) => n.type === "input")!.props.onChange!({
      target: { value: "C" },
    });
    const button = render().find(
      (n) => n.type === "button" && n.props.children === "Kıyasla",
    )!;
    expect(button.props.disabled).toBe(false);
    button.props.onClick!();
    expect(fixture.values[k].checked).toBe(true);
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: id })),
    ).toContain("Kanıtla uyumlu.");
    render().find((n) => n.props.label === "Dönüşüm verimi (%)")!.props
      .onChange!(50);
    expect(fixture.values[k]).toMatchObject({
      efficiency: 50,
      guess: "",
      reason: "",
      checked: false,
      show: false,
    });
    fixture.values = {};
    fixture.set.mockClear();
  });
});

describe("025 raw restore type boundary", () => {
  it("closes stale feedback across all active modes before typeof defaults and recovers through real callbacks", () => {
    const groups: [
      string,
      Record<string, string | number | boolean>,
      string[],
    ][] = [
      [
        "ayt-enerji-kaynaklari-gelismeler",
        {},
        ["energyMode", "fuel", "useful", "efficiency"],
      ],
      [
        "ayt-enerji-kaynaklari-gelismeler",
        { energyMode: "hydrogen" },
        ["electric", "electrolysis", "cell"],
      ],
      ["ayt-enerji-kaynaklari-gelismeler", { energyMode: "bor" }, ["bor"]],
      [
        "ayt-surdurulebilirlik-geri-donusum",
        {},
        [
          "sustainMode",
          "initial",
          "avoid",
          "reuse",
          "collection",
          "accept",
          "process",
          "material",
        ],
      ],
      [
        "ayt-surdurulebilirlik-geri-donusum",
        { sustainMode: "reuse" },
        ["uses", "production", "wash", "single"],
      ],
      ["ayt-nanoteknoloji-gelismeler", {}, ["nanoMode", "edge", "divisions"]],
      [
        "ayt-nanoteknoloji-gelismeler",
        { nanoMode: "lattice" },
        ["lattice", "layer"],
      ],
      [
        "ayt-nanoteknoloji-gelismeler",
        { nanoMode: "length" },
        ["length", "unit"],
      ],
    ];
    for (const [id, patch, fields] of groups)
      for (const field of fields) {
        const k = key(id),
          defaults = chemistryDefaults025 as Record<
            string,
            string | number | boolean
          >;
        fixture.values[k] = {
          ...chemistryDefaults025,
          ...patch,
          guess: "yes",
          reason: "Eski",
          checked: true,
          show: true,
          [field]: typeof defaults[field] === "number" ? "bad" : 42,
        };
        const render = () => callbackNodes(Lab({ lessonId: id }));
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: id })),
        ).not.toContain('role="status"');
        const prediction = render()
          .filter((n) => typeof n.type === "function" && n.props.onChange)
          .at(-1)!;
        expect(prediction.props.value).toBe("");
        const options = (
          prediction.props as ProbeProps & { options: Record<string, string> }
        ).options;
        prediction.props.onChange!(Object.keys(options).find((k) => k !== "")!);
        expect(typeof fixture.values[k][field]).toBe(typeof defaults[field]);
        render().find((n) => n.type === "input")!.props.onChange!({
          target: { value: "C" },
        });
        const button = render().find(
          (n) => n.type === "button" && n.props.children === "Kıyasla",
        )!;
        expect(button.props.disabled).toBe(false);
        button.props.onClick!();
        expect(
          renderToStaticMarkup(createElement(Lab, { lessonId: id })),
        ).toContain('role="status"');
        fixture.values = {};
      }
    fixture.set.mockClear();
  });
  it("keeps valid active feedback when only an inactive field has the wrong primitive type", () => {
    const id = lessons[0].id,
      k = key(id);
    fixture.values[k] = {
      ...chemistryDefaults025,
      nanoMode: 42,
      guess: "yes",
      reason: "C",
      checked: true,
    };
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: id })),
    ).toContain("Kanıtla uyumlu.");
    fixture.values = {};
    fixture.set.mockClear();
  });
});
