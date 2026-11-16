import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  seedLineage025,
  germination025,
  germinationProfiles025,
  reactionNorm025,
  selection025,
  mutation025,
  breeding025,
  normalizeBiology025,
  biologyDefaults025,
  forge025BiologyLessons,
  forge025BiologyGuides,
  forge025BiologyTopics,
} from "../src/learning/forge025Biology";
const f = vi.hoisted(() => ({ saved: {} as Record<string, unknown> }));
vi.mock("../src/store", () => ({
  useApp: () => {
    const explorations = new Proxy(
      {} as Record<string, Record<string, unknown>>,
      { get: () => f.saved },
    );
    return {
      state: { explorations },
      update: async (
        fn: (state: { explorations: typeof explorations }) => {
          explorations: typeof explorations;
        },
      ) => {
        const next = fn({ explorations });
        f.saved = Object.values(next.explorations)[0] ?? {};
      },
    };
  },
}));
import Lab from "../src/learning/Forge025BiologyLab";
const html = (lessonId: string, saved: Record<string, unknown> = {}) => {
  f.saved = saved;
  return renderToStaticMarkup(createElement(Lab, { lessonId }));
};
describe("025 biyoloji: bağımsız doku kökeni ve sınırlı öğretim modelleri", () => {
  it("keşif iki ebeveynli embriyo,üç takımlı besi doku ve maternal örtüyü ayrı tutar", () => {
    for (let n = 1; n <= 100; n++)
      for (const egg of ["A", "a"])
        for (const sperm of ["A", "a"]) {
          const r = seedLineage025(n, egg, sperm);
          expect(r.embryo.chromosomes).toBe(2 * n);
          expect(r.endosperm.chromosomes).toBe(3 * n);
          expect(r.coat.chromosomes).toBe(2 * n);
          expect(r.coat.genotype).toBe("Aa");
          expect(r.cotyledon.genotype).toBe(r.embryo.genotype);
          expect(r.endosperm.genotype).toBe(egg + egg + sperm);
          expect(r.endosperm.maternal / r.endosperm.paternal).toBe(2);
        }
  });
  it("çimlenmenin bağımsız kapıları,kesin sınırları ve zaman başlangıcı korunur", () => {
    const run = (
      patch: Partial<{
        t: number;
        w: number;
        o: number;
        l: boolean;
        d: boolean;
        v: boolean;
        day: number;
      }> = {},
    ) => {
      const x = {
        t: 25,
        w: 60,
        o: 60,
        l: true,
        d: false,
        v: true,
        day: 7,
        ...patch,
      };
      return germination025("bean", x.t, x.w, x.o, x.l, x.d, x.v, x.day);
    };
    expect(run().progress).toBe(1);
    expect(run({ day: 0 }).root).toBe(0);
    for (const p of [
      { w: 29.999 },
      { o: 19.999 },
      { t: 8 },
      { t: 38 },
      { d: true },
      { v: false },
    ])
      expect(run(p).conditions).toBe(false);
    expect(run({ w: 30, o: 20 }).conditions).toBe(true);
    expect(run({ l: false }).conditions).toBe(true);
    expect(
      germination025("light", 20, 60, 60, false, false, true, 7).conditions,
    ).toBe(false);
    for (const profile of Object.keys(germinationProfiles025))
      for (let t = 0; t <= 50; t++) {
        const r = germination025(profile, t, 60, 60, true, false, true, 14);
        expect(r.rate).toBeGreaterThanOrEqual(0);
        expect(r.rate).toBeLessThanOrEqual(1);
        expect(r.progress).toBeGreaterThanOrEqual(0);
        expect(r.root).toBeLessThanOrEqual(1);
      }
  });
  it("aynı genotipte tepki normu ve sıralama çevreyle değişir", () => {
    expect(reactionNorm025(10)).toMatchObject({
      A: 90,
      B: 30,
      genotypeChanged: false,
    });
    expect(reactionNorm025(30)).toMatchObject({ A: 50, B: 50 });
    expect(reactionNorm025(40)).toMatchObject({ A: 30, B: 60 });
  });
  it("doğal seçilim sayısı ve sıklığı ayrı;olmayan soy kaynaksız oluşmaz", () => {
    const r = selection025(100, 900, 100, 1);
    expect(r.last.R).toBeLessThan(100);
    expect(r.last.frequency).toBeGreaterThan(0.1);
    expect(r.last.R + r.last.S).toBeCloseTo(r.last.total, 12);
    expect(selection025(0, 1000, 100, 12).last.frequency).toBe(0);
    expect(selection025(1000, 0, 100, 12).last.frequency).toBe(1);
    expect(selection025(100, 900, 0, 8).last.frequency).toBeLessThan(0.1);
    const neutral = -Math.log(0.8) / (1 / 20 - 1 / 150);
    expect(selection025(100, 900, neutral, 12).trend).toBe("same");
    expect(selection025(100, 900, neutral, 12).last.frequency).toBe(0.1);
    expect(selection025(100, 900, neutral * (1 - 1e-12), 1).trend).toBe("down");
    expect(selection025(100, 900, neutral * (1 + 1e-12), 1).trend).toBe("up");
    for (let d = 0; d <= 100; d += 5) {
      const z = selection025(12, 88, d, 12);
      expect(z.rows).toHaveLength(13);
      for (const x of z.rows) {
        expect(Number.isFinite(x.frequency)).toBe(true);
        expect(x.frequency).toBeGreaterThanOrEqual(0);
        expect(x.frequency).toBeLessThanOrEqual(1);
      }
    }
  });
  it("mutasyon olasılığı beklenen hücre;aktarımı seçili hücre soyuna bağlıdır", () => {
    expect(mutation025(1000, 0, "skin", "sexual").expected).toBe(0);
    const tiny = mutation025(1000, 1e-12, "gamete", "sexual");
    expect(tiny.expected).toBeGreaterThan(0);
    expect(tiny.expected).toBeCloseTo(1e-11, 20);
    expect(mutation025(1000, 100, "skin", "sexual").conditional).toBe(false);
    expect(mutation025(1000, 100, "gamete", "sexual").conditional).toBe(true);
    expect(mutation025(1000, 100, "shoot", "vegetative").conditional).toBe(
      true,
    );
    expect(mutation025(1000, 100, "shoot", "sexual").conditional).toBe(true);
    expect(mutation025(1000, 100, "shoot", "sexual").transmission).toContain(
      "gamet",
    );
    expect(() => mutation025(100, 1, "skin", "vegetative")).toThrow(RangeError);
  });
  it("yapay seçilim hedefi ve temsil daralması yeni alel uydurmaz", () => {
    expect(breeding025("yield", 2)).toMatchObject({
      meanYield: 9,
      meanDrought: 3,
      representedLines: 2,
      newAlleles: 0,
    });
    expect(breeding025("drought", 2).selected.map((x) => x.id)).toEqual([
      "K5",
      "K4",
    ]);
    expect(breeding025("yield", 5)).toMatchObject({
      meanYield: 6,
      meanDrought: 6,
    });
  });
  it("bozuk ve geçersiz sayılar/enumerasyonlar sessiz biyolojik sonuç üretmez", () => {
    for (const bad of [NaN, Infinity, -Infinity, -1, 101]) {
      expect(() => seedLineage025(bad, "A", "a")).toThrow(RangeError);
      expect(() => selection025(1, 1, bad, 1)).toThrow(RangeError);
      expect(() => mutation025(10, bad, "skin", "sexual")).toThrow(RangeError);
    }
    for (const bad of ["constructor", "__proto__", "missing"]) {
      expect(() =>
        germination025(bad, 20, 60, 60, true, false, true, 2),
      ).toThrow(RangeError);
      expect(() => breeding025(bad, 2)).toThrow(RangeError);
    }
    expect(() => selection025(0, 0, 0, 0)).toThrow(RangeError);
    expect(() => seedLineage025(1.5, "A", "a")).toThrow(RangeError);
    expect(() =>
      germination025(
        "bean",
        20,
        60,
        60,
        0 as unknown as boolean,
        false,
        true,
        2,
      ),
    ).toThrow(RangeError);
  });
  it("restore temizliği sonuç,gerekçe ve görünür cevabı bayat bırakmaz", () => {
    const r = normalizeBiology025({
      ...biologyDefaults025,
      profile: "constructor",
      temperature: Infinity,
      reason: "Önceki koşulun gerekçesi",
      guess: "yes",
      checked: true,
      show: true,
    });
    expect(r).toMatchObject({
      profile: "bean",
      temperature: 25,
      guess: "",
      reason: "",
      checked: false,
      show: false,
    });
    expect(
      normalizeBiology025({ ...biologyDefaults025, resistant: 0, sensitive: 0 })
        .sensitive,
    ).toBe(1);
    expect(
      normalizeBiology025({
        ...biologyDefaults025,
        site: "skin",
        route: "vegetative",
      }).route,
    ).toBe("sexual");
    expect(
      normalizeBiology025({ ...biologyDefaults025, reason: "a".repeat(200) })
        .reason,
    ).toHaveLength(128);
  });
  it("iki tam başlık,olumlu derin anlatım ve özgün beş seçenekli bankalar var", () => {
    expect(forge025BiologyTopics).toEqual({
      "bitkilerde-dollenme-cimlenme": "detail-356",
      "canlilar-ve-cevre": "detail-357",
    });
    expect(forge025BiologyLessons.map((l) => l.questions.length)).toEqual([
      30, 31,
    ]);
    for (const g of forge025BiologyGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(24);
      expect(g.examples).toHaveLength(8);
      expect(g.recall).toHaveLength(8);
      for (const s of g.sections) expect(s.paragraphs).toHaveLength(2);
    }
    const all = forge025BiologyLessons.flatMap((l) => l.questions);
    expect(all.flatMap(questionContentIssues)).toEqual([]);
    for (const q of all) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
      expect(q.guidance!.steps).toHaveLength(3);
      expect(q.guidance!.optionReasons).toHaveLength(5);
      expect(q.guidance!.optionReasons[q.answer]).toMatch(/^Doğru\./);
      for (const x of q.guidance!.optionReasons)
        expect(x.length).toBeGreaterThan(25);
    }
    expect(new Set(all.flatMap((q) => q.guidance!.steps)).size).toBe(
      all.length * 3,
    );
  });
  it("cevap konumları dengeli ve kısa periyot/rutin üçlü tekrar içermiyor", () => {
    for (const l of forge025BiologyLessons) {
      const a = l.questions.map((q) => q.answer),
        counts = [0, 1, 2, 3, 4].map((x) => a.filter((y) => x === y).length);
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let p = 1; p <= 10; p++)
        expect(a.every((x, i) => i < p || x === a[i - p])).toBe(false);
      for (let i = 0; i < a.length - 2; i++)
        expect(a[i] === a[i + 1] && a[i] === a[i + 2]).toBe(false);
    }
  });
  it("çözülmüş örnekler bankadaki tam soruları ve açık cevap metinlerini kullanmaz", () => {
    for (const g of forge025BiologyGuides) {
      const l = forge025BiologyLessons.find((l) => l.id === g.id)!;
      for (const e of g.examples) {
        expect(l.questions.some((q) => q.prompt.tr === e.prompt)).toBe(false);
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(35);
      }
    }
  });
  it("gerçek JSX: n ve doku genotipi değişir,başlangıçta hayali kök yoktur", () => {
    const s = html("bitkilerde-dollenme-cimlenme", {
      n: 15,
      egg: "a",
      sperm: "A",
    });
    expect(s).toContain('data-embryo="30"');
    expect(s).toContain('data-endosperm="45"');
    expect(s).toContain('data-endosperm-genotype="aaA"');
    expect(s).toContain("Seçim: a");
    const start = html("bitkilerde-dollenme-cimlenme", {
      view: "germination",
      day: 0,
    });
    expect(start).not.toContain("data-root-path");
    expect(
      html("bitkilerde-dollenme-cimlenme", { view: "germination", day: 7 }),
    ).toContain("data-root-path");
  });
  it("kök evresinde sürgün çizilmez; kısa bilimsel gerekçe kabul edilir", () => {
    const early = germination025("bean", 25, 60, 60, true, false, true, 2);
    expect(early.root).toBeGreaterThan(0);
    expect(early.shoot).toBe(0);
    expect(early.stage).toBe("Kök çıkışı");
    const earlyHTML = html("bitkilerde-dollenme-cimlenme", {
      view: "germination",
      day: 2,
    });
    expect(earlyHTML).toContain("data-root-path");
    expect(earlyHTML).not.toContain("data-shoot-path");
    expect(earlyHTML).not.toContain("data-leaf-path");
    const lateHTML = html("bitkilerde-dollenme-cimlenme", {
      view: "germination",
      day: 7,
    });
    expect(lateHTML).toContain("data-shoot-path");
    expect(lateHTML).toContain("data-leaf-path");
    expect(
      html("bitkilerde-dollenme-cimlenme", {
        guess: "3n",
        reason: "4³=64",
        checked: true,
      }),
    ).toContain('role="status"');
  });
  it("ilk görünür eylem alakasız bozuk restore alanını da kalıcı onarır", () => {
    f.saved = { n: 999 };
    type ElementNode = {
      props?: {
        children?: unknown;
        label?: string;
        change?: (value: string) => void;
        maxLength?: number;
        onChange?: (e: { target: { value: string } }) => void;
      };
    };
    const nodes = (value: unknown): ElementNode[] =>
      Array.isArray(value)
        ? value.flatMap(nodes)
        : value && typeof value === "object" && "props" in value
          ? [
              value as ElementNode,
              ...nodes((value as ElementNode).props?.children),
            ]
          : [];
    const tree = Lab({ lessonId: "canlilar-ve-cevre" });
    const prediction = nodes(tree).find(
      (x) =>
        x.props?.label === "Bu sıcaklıkta hangi hat daha çok pigment verir?",
    );
    expect(prediction).toBeDefined();
    prediction!.props!.change!("A");
    expect(f.saved.n).toBe(100);
    expect(
      normalizeBiology025({ ...biologyDefaults025, ...f.saved }).guess,
    ).toBe("A");
    const reason = nodes(Lab({ lessonId: "canlilar-ve-cevre" })).find(
      (x) => x.props?.maxLength === 128,
    );
    reason!.props!.onChange!({ target: { value: "x".repeat(200) } });
    expect(String(f.saved.reason)).toHaveLength(128);
  });
  it("gerçek hook yanlış ham türü default yapsa da eski kıyas onaylanmaz", () => {
    const cases: [string, Record<string, unknown>, string][] = [
      ["bitkilerde-dollenme-cimlenme", { n: "12" }, "3n"],
      [
        "bitkilerde-dollenme-cimlenme",
        { view: "germination", water: "60" },
        "yes",
      ],
      [
        "bitkilerde-dollenme-cimlenme",
        { view: "germination", light: "true" },
        "yes",
      ],
      ["canlilar-ve-cevre", { normTemperature: "20" }, "A"],
      [
        "canlilar-ve-cevre",
        { environmentView: "selection", resistant: "100" },
        "same",
      ],
      [
        "canlilar-ve-cevre",
        { environmentView: "mutation", cells: "1000" },
        "none",
      ],
      ["canlilar-ve-cevre", { environmentView: "breeding", keep: "3" }, "no"],
    ];
    for (const [id, patch, guess] of cases)
      expect(
        html(id, { ...patch, guess, reason: "Veriye baktım.", checked: true }),
      ).not.toContain('role="status"');
    expect(
      html("canlilar-ve-cevre", {
        n: "12",
        guess: "A",
        reason: "Veriye baktım.",
        checked: true,
      }),
    ).toContain('role="status"');
  });
  it("gerçek JSX: boş veya geçersiz restored tahmin başarı göstermez", () => {
    for (const lessonId of [
      "bitkilerde-dollenme-cimlenme",
      "canlilar-ve-cevre",
    ])
      for (const reason of ["", "    "]) {
        const s = html(lessonId, {
          guess: lessonId.startsWith("bitkilerde") ? "3n" : "A",
          reason,
          checked: true,
        });
        expect(s).not.toContain('role="status"');
        expect(s).toContain("disabled");
      }
    expect(
      html("canlilar-ve-cevre", {
        guess: "toString",
        reason: "Hatları aynı ortamda kıyasladım.",
        checked: true,
      }),
    ).not.toContain('role="status"');
    expect(
      html("canlilar-ve-cevre", {
        guess: "A",
        reason: "Hatları aynı ortamda kıyasladım.",
        checked: true,
      }),
    ).toContain('role="status"');
  });
});
