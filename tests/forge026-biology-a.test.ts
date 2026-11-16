import { describe, it, expect, vi } from "vitest";
import {
  Children,
  createElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { questionContentIssues } from "../src/domain/questionContent";
import { narrativePacks, sourceNarratives } from "../src/learning/narratives";
import {
  atpBudget026,
  biologyADefaults026,
  cellEvidence026,
  controlledPair026,
  experimentGroups026,
  forge026BiologyAGuides,
  forge026BiologyALessons,
  forge026BiologyATopics,
  ionMixture026,
  measurement026,
  mineralCapacity026,
  normalizeBiologyA026,
  pHRelation026,
  thermalWater026,
} from "../src/learning/forge026BiologyA";
const fixture = vi.hoisted(() => ({
  records: {} as Record<string, Record<string, unknown>>,
  writes: 0,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: fixture.records },
    update: async (
      update: (s: { explorations: typeof fixture.records }) => {
        explorations: typeof fixture.records;
      },
    ) => {
      fixture.records = update({ explorations: fixture.records }).explorations;
      fixture.writes++;
    },
  }),
}));
import Lab from "../src/learning/Forge026BiologyALab";
const ids = [
  "canli-ozellikleri",
  "bilimsel-yontem",
  "mineraller",
  "su-asit-baz-tuz",
];
const key = (id: string) => `forge026:biology-a:${id}`;
type NodeProps = {
  children?: ReactNode;
  id?: string;
  htmlFor?: string;
  value?: unknown;
  onChange?: (e: { target: { value: string } }) => void;
  onClick?: () => void;
  disabled?: boolean;
};
function textOf(n: ReactNode): string {
  if (typeof n === "string" || typeof n === "number") return String(n);
  if (isValidElement<NodeProps>(n)) return textOf(n.props.children);
  return Children.toArray(n).map(textOf).join("");
}
function render(id: string) {
  const nodes: ReactElement<NodeProps>[] = [];
  function walk(n: ReactNode) {
    Children.forEach(n, (item) => {
      if (!isValidElement<NodeProps>(item)) return;
      if (typeof item.type === "function")
        walk((item.type as (p: NodeProps) => ReactNode)(item.props));
      else {
        nodes.push(item);
        walk(item.props.children);
      }
    });
  }
  function Probe() {
    const tree = Lab({ lessonId: id });
    walk(tree);
    return tree;
  }
  const html = renderToStaticMarkup(createElement(Probe));
  return {
    html,
    change(label: string, value: string) {
      const labelNode = nodes.find(
        (n) => n.type === "label" && textOf(n.props.children).startsWith(label),
      );
      const field = nodes.find((n) => n.props.id === labelNode?.props.htmlFor);
      if (!field?.props.onChange) throw Error("Missing field " + label);
      field.props.onChange({ target: { value } });
    },
    click(caption: string) {
      const button = nodes.find(
        (n) => n.type === "button" && textOf(n.props.children) === caption,
      );
      if (!button || button.props.disabled)
        throw Error("Disabled or missing " + caption);
      button.props.onClick?.();
    },
  };
}
describe("026 biyoloji A: öğretim verisi ve önceki anlatım", () => {
  it("eski dört anlatımın bütün ham içeriğini korur; yeni setleri ayırır", () => {
    const packs = narrativePacks.filter((p) => ids.includes(p.id)),
      lessons = sourceNarratives.filter((l) => ids.includes(l.id));
    expect(
      createHash("sha256")
        .update(JSON.stringify({ packs, lessons }))
        .digest("hex"),
    ).toBe("b725bf13fb9ef444b464247d338daf4bd448ff7368d047bcb1ed8384b19cf41f");
    expect(forge026BiologyAGuides.map((g) => g.id)).toEqual(ids);
    expect(forge026BiologyALessons.map((l) => l.id)).toEqual(
      ids.map((id) => id + "-ileri"),
    );
    for (const p of packs)
      expect(
        forge026BiologyAGuides
          .find((g) => g.id === p.id)
          ?.sections.slice(0, p.body.length)
          .map((s) => s.title),
      ).toEqual(p.body.map((b) => b.title));
    for (const id of ids)
      expect(forge026BiologyATopics[id]).toBe(
        forge026BiologyATopics[id + "-ileri"],
      );
  });
  it("90 bağımsız beş şıklı kartı, 24 farklı çözümlü örneği ve tam yardımı sunar", () => {
    expect(forge026BiologyALessons.map((l) => l.questions.length)).toEqual([
      22, 22, 22, 24,
    ]);
    const questionTexts = new Set<string>();
    for (const l of forge026BiologyALessons) {
      const counts = [0, 0, 0, 0, 0];
      for (const q of l.questions) {
        expect(questionContentIssues(q)).toEqual([]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
        expect(q.guidance?.steps).toHaveLength(3);
        expect(q.guidance?.optionReasons).toHaveLength(5);
        expect(q.guidance?.steps).not.toContain(q.guidance?.strategy);
        counts[q.answer]++;
        expect(questionTexts.has(q.prompt.tr)).toBe(false);
        questionTexts.add(q.prompt.tr);
      }
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let period = 1; period <= 10; period++)
        expect(
          l.questions.every(
            (q, i, qs) => i < period || q.answer === qs[i - period].answer,
          ),
        ).toBe(false);
    }
    expect(
      forge026BiologyAGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(86);
    for (const g of forge026BiologyAGuides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) expect(s.paragraphs).toHaveLength(2);
      for (const e of g.examples) {
        expect(questionTexts.has(e.prompt)).toBe(false);
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(10);
      }
    }
  });
});
describe("026 biyoloji A: farklı mekanizmaların sayısal ve kavramsal sınırları", () => {
  it("özelleşmiş alyuvarı prokaryot sanmaz; virüse hücre organeli vermez", () => {
    expect(cellEvidence026("redCell")).toMatchObject({
      cell: true,
      nucleus: false,
      ribosome: false,
      whole: false,
    });
    expect(cellEvidence026("virus")).toMatchObject({
      cell: false,
      dna: null,
      ribosome: false,
    });
    expect(cellEvidence026("bacterium")).toMatchObject({
      cell: true,
      nucleus: false,
      ribosome: true,
      whole: true,
    });
    expect(() => cellEvidence026("constructor")).toThrow(RangeError);
  });
  it("ATP tüketimini stokla sınırlar; bakım önceliğini ve bilanço korunumunu uygular", () => {
    const r = atpBudget026(3, 2, 4, 5, 3);
    expect(
      r.rows
        .slice(1)
        .map((x) => [x.maintenance, x.synthesis, x.unmet, x.stock]),
    ).toEqual([
      [4, 1, 0, 0],
      [2, 0, 2, 0],
      [2, 0, 2, 0],
    ]);
    expect(r.supplied).toBe(r.totalMaintenance + r.totalSynthesis + r.stock);
    expect(r.maintenanceMet).toBe(false);
    expect(atpBudget026(8, 0, 20, 20, 0).stock).toBe(8);
  });
  it("hedef dışı değişkeni, aynı grubu ve su–ışık etkileşimini ayırır", () => {
    expect(controlledPair026(0, 1, "light")).toMatchObject({
      valid: true,
      difference: 2,
    });
    expect(controlledPair026(2, 3, "light")).toMatchObject({
      valid: true,
      difference: 4,
    });
    expect(controlledPair026(0, 3, "light")).toMatchObject({
      valid: false,
      changed: ["light", "water"],
    });
    expect(controlledPair026(0, 0, "light").valid).toBe(false);
    expect(experimentGroups026).toHaveLength(8);
  });
  it("tekrarın sabit ölçek hatasını kendiliğinden kaldırmadığını gösterir", () => {
    expect(measurement026(40, 120, 3, 3)).toMatchObject({
      readings: [51, 49, 53],
      mean: 51,
      error: 11,
    });
    expect(measurement026(10, 50, -10, 2).readings).toEqual([-5, -7]);
    expect(measurement026(50, 100, 0, 9).mean).toBe(50);
  });
  it("ham stok yerine gereksinime oranı ve eş sınırlayıcıları kullanır", () => {
    expect(mineralCapacity026(24, 12, 15)).toMatchObject({
      units: 4,
      limiting: ["N"],
      predicted: "N",
    });
    expect(mineralCapacity026(24, 8, 12)).toMatchObject({
      units: 4,
      limiting: ["N", "P", "Mg"],
      predicted: "tie",
    });
    expect(mineralCapacity026(5, 20, 30).units).toBe(0);
    expect(mineralCapacity026(0, 0, 0).units).toBe(0);
  });
  it("aynı enerji için ısınma ile buharlaşmanın farklı bilançosunu kurar", () => {
    expect(thermalWater026("warming", 100, 800, 4)).toMatchObject({
      temperature: 22,
      evaporated: 0,
      remaining: 100,
    });
    expect(thermalWater026("evaporating", 10, 12000, 4)).toMatchObject({
      temperature: 20,
      evaporated: 5,
      remaining: 5,
    });
    expect(thermalWater026("evaporating", 10, 12000, 0).losesLiquid).toBe(
      false,
    );
  });
  it("H⁺/OH⁻ miktarlarını eşler; nötr ve aşırı seyreltik sınırda su dengesini korur", () => {
    const a = ionMixture026(10, 20, 10, 10);
    expect(a).toMatchObject({
      hydrogen: 200,
      hydroxide: 100,
      paired: 100,
      excess: 100,
      category: "acid",
    });
    expect(a.h * a.oh).toBeCloseTo(1e-14, 20);
    expect(ionMixture026(10, 20, 20, 10)).toMatchObject({
      pH: 7,
      category: "neutral",
    });
    expect(ionMixture026(0, 10, 0, 10).pH).toBe(7);
    expect(ionMixture026(100, 0, 100, 100).pH).toBeCloseTo(13);
    expect(() => ionMixture026(1, 0, 1, 0)).toThrow(RangeError);
  });
  it("pH derişim oranına hacim eklenince mol oranının değişebildiğini gösterir", () => {
    expect(pHRelation026(4, 5, 10, 100)).toMatchObject({
      concentrationRatio: 10,
      amountRatio: 1,
    });
    expect(pHRelation026(7, 7, 500, 100)).toMatchObject({
      concentrationRatio: 1,
      amountRatio: 5,
    });
    expect(pHRelation026(14, 0, 1, 1000).amountRatio).toBeCloseTo(1e-17, 25);
  });
  it("yanlış tür, kesirli adet, bozuk seçim ve fiziksel alan dışını reddeder", () => {
    for (const n of [NaN, Infinity, -1, 1.5, "3"] as unknown[])
      expect(() => atpBudget026(n as number, 2, 2, 2, 2)).toThrow(RangeError);
    expect(() => thermalWater026("warming", 10, 1201, 1)).toThrow(RangeError);
    expect(() => controlledPair026(0, 8, "light")).toThrow(RangeError);
    expect(() => mineralCapacity026(121, 0, 0)).toThrow(RangeError);
    expect(() => pHRelation026(-0.1, 4, 2, 2)).toThrow(RangeError);
  });
});
describe("026 biyoloji A: gerçek hook ile ham kayıt ve ilk açık eylem", () => {
  it("yanlış etkin tür ve aralık eski sonucu kapatır; ilk kısa gerekçe tam kaydı onarır", () => {
    const cases: [string, Record<string, unknown>][] = [
      [ids[0], { initial: "20", guess: "yes" }],
      [ids[0], { livingView: "cell", sample: "gone", guess: "cell" }],
      [ids[1], { first: 99, guess: "valid" }],
      [ids[1], { methodView: "measurement", repeats: "3", guess: "equal" }],
      [ids[2], { nStock: "36", guess: "Mg" }],
      [ids[3], { energy: 12001, guess: "no" }],
      [ids[3], { waterView: "mixture", acidVolume: "20", guess: "acid" }],
      [ids[3], { waterView: "relation", pHA: "4", guess: "A" }],
    ];
    for (const [id, patch] of cases) {
      fixture.records = {
        [key(id)]: {
          ...biologyADefaults026,
          ...patch,
          checked: true,
          reason: "Eski gerekçe",
        },
      };
      fixture.writes = 0;
      const before = render(id);
      expect(before.html).not.toContain('class="b026-feedback"');
      expect(before.html).toMatch(/disabled=""[^>]*>Kıyasla/);
      expect(fixture.writes).toBe(0);
      before.change("Gerekçen", "ψ");
      expect(fixture.writes).toBe(1);
      const saved = fixture.records[key(id)];
      expect(normalizeBiologyA026(id, saved).validSelection).toBe(true);
      expect(saved.checked).toBe(false);
      const ready = render(id);
      expect(ready.html).not.toMatch(/disabled=""[^>]*>Kıyasla/);
      ready.click("Kıyasla");
      expect(render(id).html).toContain('class="b026-feedback"');
    }
  });
  it("ilgisiz bozuk alan kıyası engellemez; ilk bağımsız eylem onu da kanonik yazar", () => {
    const id = ids[2];
    fixture.records = {
      [key(id)]: {
        ...biologyADefaults026,
        initial: "99",
        guess: "Mg",
        reason: "15/3<6",
        checked: true,
      },
    };
    expect(render(id).html).toContain("Modelle uyumlu.");
    render(id).click("Kanıtı aç");
    expect(fixture.records[key(id)].initial).toBe(20);
    expect(fixture.records[key(id)].checked).toBe(true);
    expect(render(id).html).toContain("Modelle uyumlu.");
  });
  it("kısa gerekçeyi kabul eder, boşu ve model düzenlemesi sonrası eski kıyası bastırır", () => {
    const id = ids[0];
    fixture.records = {
      [key(id)]: {
        ...biologyADefaults026,
        guess: "yes",
        reason: "x",
        checked: true,
      },
    };
    expect(render(id).html).toContain("Modelle uyumlu.");
    render(id).change("Gerekçen", " ");
    expect(render(id).html).not.toContain('class="b026-feedback"');
    render(id).change("Gerekçen", "a".repeat(200));
    expect(String(fixture.records[key(id)].reason)).toHaveLength(120);
    render(id).click("Kıyasla");
    render(id).change("Adım başına üretim", "0");
    expect(fixture.records[key(id)]).toMatchObject({
      production: 0,
      guess: "",
      reason: "",
      checked: false,
    });
  });
  it("gerekçede 120 karakteri kabul eder, 121 ham kaydı eski sonuçtan ayırır", () => {
    const id = ids[0];
    fixture.records = {
      [key(id)]: {
        ...biologyADefaults026,
        guess: "yes",
        reason: "x".repeat(120),
        checked: true,
      },
    };
    expect(render(id).html).toContain("Modelle uyumlu.");
    fixture.records[key(id)].reason = "x".repeat(121);
    fixture.writes = 0;
    const invalid = render(id);
    expect(invalid.html).not.toContain('class="b026-feedback"');
    expect(fixture.writes).toBe(0);
    expect(invalid.html).toMatch(/disabled=""[^>]*>Kıyasla/);
    invalid.change("Gerekçen", "y".repeat(200));
    expect(String(fixture.records[key(id)].reason)).toHaveLength(120);
    expect(fixture.records[key(id)].checked).toBe(false);
    render(id).click("Kıyasla");
    expect(render(id).html).toContain("Modelle uyumlu.");
  });
  it("aynı eski ve ileri ID ortak anahtar kullanır; geometri gerçek model miktarına bağlıdır", () => {
    fixture.records = {
      [key(ids[2])]: {
        ...biologyADefaults026,
        nStock: 24,
        pStock: 12,
        mgStock: 15,
      },
    };
    const h = render(ids[2] + "-ileri").html;
    expect(h).toContain(`data-exploration-key="${key(ids[2])}"`);
    expect(h).toContain('data-capacity="4"');
    expect(h).toContain('data-units="4"');
    fixture.records = {
      [key(ids[3])]: {
        ...biologyADefaults026,
        thermalMode: "evaporating",
        mass: 10,
        energy: 12000,
        stage: 4,
      },
    };
    expect(render(ids[3]).html).toContain('data-liquid-fraction="0.5"');
  });
});
