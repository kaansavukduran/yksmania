import { describe, it, expect, vi } from "vitest";
import {
  Children,
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { lessons } from "../src/domain/content";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  biologyBDefaults026,
  carbohydrateForest026,
  lipidAssembly026,
  normalizeBiologyB026,
  forge026BiologyBGuides,
  forge026BiologyBLessons,
  forge026BiologyBTopics,
} from "../src/learning/forge026BiologyB";

const fixture = vi.hoisted(() => ({
  records: {} as Record<string, Record<string, unknown>>,
  writes: 0,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: fixture.records },
    update: async (
      fn: (s: { explorations: typeof fixture.records }) => {
        explorations: typeof fixture.records;
      },
    ) => {
      fixture.records = fn({ explorations: fixture.records }).explorations;
      fixture.writes++;
    },
  }),
}));
import Lab from "../src/learning/Forge026BiologyBLab";
const ids = ["karbohidratlar", "lipitler"];
const key = (id: string) => `forge026:biology-b:${id}`;
type Props = {
  children?: ReactNode;
  id?: string;
  htmlFor?: string;
  value?: unknown;
  disabled?: boolean;
  onChange?: (e: { target: { value: string } }) => void;
  onClick?: () => void;
};
function text(n: ReactNode): string {
  if (typeof n === "string" || typeof n === "number") return String(n);
  return isValidElement<Props>(n)
    ? text(n.props.children)
    : Children.toArray(n).map(text).join("");
}
function render(id: string) {
  const nodes: ReactElement<Props>[] = [];
  function walk(n: ReactNode) {
    Children.forEach(n, (item) => {
      if (!isValidElement<Props>(item)) return;
      if (typeof item.type === "function")
        walk((item.type as (p: Props) => ReactNode)(item.props));
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
  const button = (caption: string) =>
    nodes.find(
      (n) => n.type === "button" && text(n.props.children) === caption,
    )!;
  return {
    html,
    disabled: () => button("Kıyasla").props.disabled,
    change(label: string, value: string) {
      const l = nodes.find(
        (n) => n.type === "label" && text(n.props.children) === label,
      );
      const field = nodes.find((n) => n.props.id === l?.props.htmlFor);
      if (!field?.props.onChange) throw Error("Missing control " + label);
      field.props.onChange({ target: { value } });
    },
    click(caption: string) {
      const b = button(caption);
      if (!b || b.props.disabled || !b.props.onClick)
        throw Error("Disabled/missing " + caption);
      b.props.onClick();
    },
  };
}
function restore(id: string, patch: Record<string, unknown> = {}) {
  fixture.records = {
    [key(id)]: {
      ...biologyBDefaults026,
      guess: id === "karbohidratlar" ? "3" : "1",
      reason: "4³=64",
      checked: true,
      show: true,
      ...patch,
    },
  };
  fixture.writes = 0;
}

describe("026 karbohidratlar ve lipitler", () => {
  it("uses old guide IDs and separate advanced question sets with complete cards", () => {
    expect(forge026BiologyBGuides.map((g) => g.id)).toEqual(ids);
    expect(forge026BiologyBLessons.map((l) => l.id)).toEqual(
      ids.map((id) => id + "-ileri"),
    );
    expect(forge026BiologyBTopics).toEqual({
      karbohidratlar: "detail-5",
      "karbohidratlar-ileri": "detail-5",
      lipitler: "detail-6",
      "lipitler-ileri": "detail-6",
    });
    expect(forge026BiologyBGuides.flatMap((g) => g.sections)).toHaveLength(36);
    expect(
      forge026BiologyBGuides.flatMap((g) =>
        g.sections.flatMap((s) => s.paragraphs),
      ),
    ).toHaveLength(72);
    expect(forge026BiologyBGuides.flatMap((g) => g.examples)).toHaveLength(12);
    expect(forge026BiologyBGuides.flatMap((g) => g.recall)).toHaveLength(12);
    for (const l of forge026BiologyBLessons) {
      expect(l.questions).toHaveLength(20);
      for (const q of l.questions) {
        expect(questionContentIssues(q)).toEqual([]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
        expect(q.guidance?.steps).toHaveLength(3);
        expect(q.guidance?.optionReasons).toHaveLength(5);
        expect(q.guidance?.strategy).not.toBe(q.guidance?.steps[0]);
      }
      const a = l.questions.map((q) => q.answer);
      expect(
        [0, 1, 2, 3, 4].map((n) => a.filter((v) => v === n).length),
      ).toEqual([4, 4, 4, 4, 4]);
      for (let period = 1; period <= 15; period++)
        expect(a.slice(period).every((v, i) => v === a[i])).toBe(false);
    }
  });
  it("keeps the full old lessons and their first five body concepts", () => {
    const old = ids.map((id) => lessons.find((l) => l.id === id)!);
    expect(old.map((l) => l.questions.length)).toEqual([10, 10]);
    expect(createHash("sha256").update(JSON.stringify(old)).digest("hex")).toBe(
      "0f9ebea84175918fada1349bd8e2a00522e481d0bf851a7f9d390d5db19f4149",
    );
    old.forEach((l, i) =>
      expect(
        forge026BiologyBGuides[i].sections.slice(0, 5).map((s) => s.title),
      ).toEqual(l.body.map((s) => s.title.tr)),
    );
  });
  it("counts actual connected components after ordered joins and cuts", () => {
    const r = carbohydrateForest026(8, 3, 2, 3);
    expect(r.groups).toEqual([[0], [1], [2, 3], [4, 5, 6, 7]]);
    expect([
      r.initialBonds,
      r.beforeCuts,
      r.bonds,
      r.finalPieces,
      r.freeUnits,
    ]).toEqual([5, 7, 4, 4, 2]);
    expect([r.synthesisWater, r.hydrolysisWater]).toEqual([2, 3]);
    const fresh = carbohydrateForest026(8, 3, 2, 3);
    r.groups[0].push(99);
    expect(fresh.groups[0]).toEqual([0]);
  });
  it("separates ester cuts from fully freed glycerol and preserves precursor totals", () => {
    const r = lipidAssembly026(3, 10, 3, 4);
    expect(r.molecules.map((m) => m.remaining)).toEqual([0, 2, 3]);
    expect([r.freeGlycerol, r.freeAcids, r.esterBonds, r.intact]).toEqual([
      1, 5, 5, 1,
    ]);
    expect([r.synthesisWater, r.hydrolysisWater]).toEqual([9, 4]);
    expect(r.freeAcids + r.esterBonds).toBe(10);
    expect(
      r.freeGlycerol + r.molecules.filter((m) => !m.freeGlycerol).length,
    ).toBe(3);
  });
  it("rejects impossible model inputs instead of silently inventing molecules", () => {
    for (const a of [
      [2, 1, 0, 0],
      [6, 3, 3, 0],
      [6, 2, 0, 5],
      [6, 2, 0, 0.5],
    ])
      expect(() =>
        carbohydrateForest026(...(a as [number, number, number, number])),
      ).toThrow(RangeError);
    for (const a of [
      [1, 2, 1, 0],
      [2, 6, 2, 7],
      [5, 12, 0, 0],
      [2, 6, 1, 0.5],
    ])
      expect(() =>
        lipidAssembly026(...(a as [number, number, number, number])),
      ).toThrow(RangeError);
    expect(() =>
      carbohydrateForest026("6" as unknown as number, 2, 1, 0),
    ).toThrow(RangeError);
  });
  it("repairs dependent upper bounds in one complete canonical write", () => {
    restore("karbohidratlar", { units: 9, pieces: 3, joins: 2, carbCuts: 8 });
    render("karbohidratlar").change("Şeker birimi", "3");
    expect(fixture.records[key("karbohidratlar")]).toMatchObject({
      units: 3,
      pieces: 3,
      joins: 2,
      carbCuts: 2,
      reason: "",
      checked: false,
      show: false,
    });
    restore("lipitler", { glycerol: 4, acids: 12, built: 4, lipidCuts: 10 });
    render("lipitler").change("Serbest yağ asidi", "0");
    expect(fixture.records[key("lipitler")]).toMatchObject({
      acids: 0,
      built: 0,
      lipidCuts: 0,
      checked: false,
    });
  });
  it("closes malformed active restores and repairs them on the first fresh reason", () => {
    for (const id of ids)
      for (const bad of ["3", null, true, {}, [], 99, NaN, 1.5]) {
        const field = id === "karbohidratlar" ? "units" : "glycerol";
        restore(id, { [field]: bad });
        const before = render(id);
        expect(before.disabled()).toBe(true);
        expect(before.html).not.toContain('class="bb026-feedback"');
        expect(before.html).not.toContain('class="bb026-proof"');
        expect(fixture.writes).toBe(0);
        before.change("Gerekçen", "ψi>ψo");
        expect(
          normalizeBiologyB026(id, fixture.records[key(id)]).validSelection,
        ).toBe(true);
        expect(fixture.records[key(id)].reason).toBe("ψi>ψo");
        render(id).click("Kıyasla");
        expect(render(id).html).toContain('class="bb026-feedback"');
      }
  });
  it("preserves an independent model when an irrelevant field is malformed", () => {
    for (const id of ids) {
      restore(
        id,
        id === "karbohidratlar"
          ? { glycerol: "bad", built: 99 }
          : { units: "bad", carbCuts: 99 },
      );
      expect(render(id).disabled()).toBe(false);
      expect(render(id).html).toContain('class="bb026-feedback"');
    }
  });
  it("accepts short reasons, rejects blank feedback and bounds long durable input", () => {
    for (const id of ids) {
      for (const reason of ["x", "ψi>ψo", "4³=64"]) {
        restore(id, { reason });
        expect(render(id).disabled()).toBe(false);
      }
      for (const reason of ["", " ", "\n\t"]) {
        restore(id, { reason });
        const r = render(id);
        expect(r.disabled()).toBe(true);
        expect(r.html).not.toContain('class="bb026-feedback"');
      }
      restore(id, { reason: "a".repeat(121) });
      expect(render(id).disabled()).toBe(true);
      render(id).change("Gerekçen", "a".repeat(200));
      expect(fixture.records[key(id)].reason).toHaveLength(120);
      render(id).click("Kıyasla");
      expect(render(id).html).toContain('class="bb026-feedback"');
    }
  });
  it("opens manual evidence with no prediction and resets without scored evidence", () => {
    for (const id of ids) {
      fixture.records = {};
      render(id).click("Kanıtı aç");
      expect(render(id).html).toContain('class="bb026-proof"');
      expect(render(id).html).not.toContain('class="bb026-feedback"');
      render(id).click("Başa dön");
      expect(fixture.records[key(id)]).toEqual(biologyBDefaults026);
    }
  });
  it("renders geometric quantities with their complete HTML equivalents", () => {
    restore("karbohidratlar");
    let h = render("karbohidratlar").html;
    expect(h.match(/data-sugar-unit=/g)).toHaveLength(6);
    expect(h).toContain('data-pieces="3"');
    expect(h).toContain('data-bonds="3"');
    expect(h).toContain('viewBox="0 0 270 510"');
    expect(h).toContain("Son parçaların birimleri");
    restore("lipitler");
    h = render("lipitler").html;
    expect(h.match(/data-ester-slot=/g)).toHaveLength(6);
    expect(h).toContain('data-free-glycerol="1"');
    expect(h).toContain('data-free-acids="4"');
    expect(h).toContain("Hidrolizde kullanılan su");
    expect(h).not.toMatch(/NaN|Infinity/);
  });
  it("shares a stable exploration key across old and advanced IDs", () => {
    for (const id of ids) {
      restore(id);
      const normal = render(id).html;
      expect(render(id + "-ileri").html.replaceAll(id + "-ileri", id)).toBe(
        normal,
      );
    }
  });
});
