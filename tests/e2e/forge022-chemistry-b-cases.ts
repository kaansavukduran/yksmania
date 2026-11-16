import { expect, type Locator } from "@playwright/test";
import { forge022ChemistryBLessons } from "../../src/learning/forge022ChemistryB";
import { forge022Case, setRange } from "./forge022-case-helper";
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab.getByLabel("Modelden gerekçen", { exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".chemistry-b022-feedback")).toContainText(
    "Tahminin verilen koşullarla uyumlu.",
  );
}
async function actualSvgEvidence(lab: Locator) {
  const rows = await lab.locator("svg").evaluateAll((nodes) =>
    nodes.map((node) => {
      const svg = node as SVGSVGElement,
        r = svg.getBoundingClientRect();
      return {
        width: r.width,
        text: [...svg.querySelectorAll("text")].map((el) => {
          const m = el.getScreenCTM()!,
            b = el.getBBox(),
            font = parseFloat(getComputedStyle(el).fontSize),
            pts = [
              [b.x, b.y],
              [b.x + b.width, b.y],
              [b.x, b.y + b.height],
              [b.x + b.width, b.y + b.height],
            ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(m));
          return {
            text: el.textContent,
            size: font * Math.min(Math.hypot(m.a, m.b), Math.hypot(m.c, m.d)),
            left: Math.min(...pts.map((p) => p.x)) - r.left,
            right: Math.max(...pts.map((p) => p.x)) - r.right,
            top: Math.min(...pts.map((p) => p.y)) - r.top,
            bottom: Math.max(...pts.map((p) => p.y)) - r.bottom,
          };
        }),
      };
    }),
  );
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows)
    for (const text of row.text) {
      expect(
        text.size,
        `physical SVG font: ${text.text}`,
      ).toBeGreaterThanOrEqual(16);
      expect(text.left, `left: ${text.text}`).toBeGreaterThanOrEqual(-1);
      expect(text.right, `right: ${text.text}`).toBeLessThanOrEqual(1);
      expect(text.top, `top: ${text.text}`).toBeGreaterThanOrEqual(-1);
      expect(text.bottom, `bottom: ${text.text}`).toBeLessThanOrEqual(1);
    }
  const marks = await actualMarkContrast(lab);
  expect(marks).toBeGreaterThan(0);
}
async function actualMarkContrast(lab: Locator) {
  const rows = await lab
    .locator(
      ".chemistry-b022-bond-active, .chemistry-b022-atom-selected, .chemistry-b022-bar",
    )
    .evaluateAll((elements) =>
      elements.map((el) => {
        const svg = el.closest("svg")!,
          style = getComputedStyle(el),
          color = el.matches("rect") ? style.fill : style.stroke;
        const rgb = (v: string) =>
          (v.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
        const foreground = rgb(color),
          background = rgb(getComputedStyle(svg).backgroundColor);
        let alpha =
          Number(style.opacity) *
          Number(el.matches("rect") ? style.fillOpacity : style.strokeOpacity);
        for (
          let p: Element | null = el.parentElement;
          p && p !== svg;
          p = p.parentElement
        )
          alpha *= Number(getComputedStyle(p).opacity);
        const luminance = (c: number[]) =>
          c
            .map((n) => n / 255)
            .map((n) =>
              n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4,
            )
            .reduce((s, n, i) => s + n * [0.2126, 0.7152, 0.0722][i], 0);
        const paint = foreground.map(
            (n, i) => n * alpha + background[i] * (1 - alpha),
          ),
          a = luminance(paint),
          b = luminance(background);
        return {
          name: el.getAttribute("class"),
          ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
          color,
          background: getComputedStyle(svg).backgroundColor,
        };
      }),
    );
  for (const row of rows)
    expect(
      row.ratio,
      `actual graphic contrast ${row.name}: ${row.color} on ${row.background}`,
    ).toBeGreaterThanOrEqual(3);
  return rows.length;
}

async function actualBonds(lab: Locator, kind: string) {
  const graph = await lab
    .locator(`svg[data-chemistry-b022-plot="${kind}"]`)
    .evaluate((svg) => {
      const atoms = [...svg.querySelectorAll<SVGGElement>("[data-atom]")]
        .map((g) => {
          const c = g.querySelector("circle")!;
          return {
            id: Number(g.getAttribute("data-atom")),
            x: Number(c.getAttribute("cx")),
            y: Number(c.getAttribute("cy")),
            view: {
              x: Number(g.getAttribute("data-view-x")),
              y: Number(g.getAttribute("data-view-y")),
              z: Number(g.getAttribute("data-view-z")),
            },
          };
        })
        .sort((a, b) => a.id - b.id);
      const bonds = [...svg.querySelectorAll<SVGGElement>("[data-bond]")].map(
        (g) => ({
          a: Number(g.getAttribute("data-a")),
          b: Number(g.getAttribute("data-b")),
          order: Number(g.getAttribute("data-order")),
          lines: [...g.querySelectorAll("line")].map((l) => ({
            x1: Number(l.getAttribute("x1")),
            y1: Number(l.getAttribute("y1")),
            x2: Number(l.getAttribute("x2")),
            y2: Number(l.getAttribute("y2")),
          })),
        }),
      );
      return { atoms, bonds };
    });
  for (const b of graph.bonds) {
    expect(b.lines).toHaveLength(b.order);
    const first = b.lines[0],
      last = b.lines.at(-1)!;
    expect((first.x1 + last.x1) / 2).toBeCloseTo(graph.atoms[b.a].x, 7);
    expect((first.y1 + last.y1) / 2).toBeCloseTo(graph.atoms[b.a].y, 7);
    expect((first.x2 + last.x2) / 2).toBeCloseTo(graph.atoms[b.b].x, 7);
    expect((first.y2 + last.y2) / 2).toBeCloseTo(graph.atoms[b.b].y, 7);
  }
  return graph;
}
export const chemistryB022Cases = [
  forge022Case(
    forge022ChemistryBLessons,
    "karbon-kimyasina-giris",
    "forge022-chemistry-b-karbon-kimyasina-giris",
    async (_page, lab) => {
      await lab
        .getByLabel("Karbon yapısı", { exact: true })
        .selectOption("fullerene");
      await compare(
        lab,
        "3",
        "Kapalı C₆₀ kafesinde her C üç C komşusuna bağlıdır; 60×3/2=90 bağlantı vardır.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("kovalent C komşusu: 3");
      await expect(r).toContainText(
        "Çizilen atom: 60; çizilen kovalent bağlantı: 90",
      );
      await expect(r).toContainText("12 beşgen, 20 altıgen");
      const g = await actualBonds(lab, "carbon");
      expect(g.atoms).toHaveLength(60);
      expect(g.bonds).toHaveLength(90);
      for (const p of g.atoms)
        expect(
          g.bonds.filter((b) => b.a === p.id || b.b === p.id),
        ).toHaveLength(3);
      await expect(
        lab.locator("svg [data-bond] .chemistry-b022-bond-active"),
      ).toHaveCount(3);
      await actualSvgEvidence(lab);
    },
  ),
  forge022Case(
    forge022ChemistryBLessons,
    "basit-ve-molekul-formul",
    "forge022-chemistry-b-basit-ve-molekul-formul",
    async (_page, lab) => {
      await lab.getByLabel("Veri türü", { exact: true }).selectOption("burn");
      await setRange(lab, "Örnek (0,1 g)", 46);
      await setRange(lab, "H₂O (0,1 g)", 54);
      await setRange(lab, "M (g/mol); 0 = yok", 46);
      await compare(
        lab,
        "Uyumlu",
        "C 0,2 mol, H 0,6 mol, O 0,1 mol: 2:6:1 oranı ve M46 ile C₂H₆O. H bütçesi gerekli koşulu sağlar.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("C = 2,4 g; H = 0,6 g; O = 1,6 g");
      await expect(r).toContainText("C = 0,2 mol; H = 0,6 mol; O = 0,1 mol");
      await expect(r).toContainText("aday molekül formülü: C2H6O");
      const bars = await lab.locator("[data-mole-bar]").evaluateAll((nodes) =>
        nodes.map((el) => ({
          i: Number(el.getAttribute("data-mole-bar")),
          h: Number(el.getAttribute("height")),
          y: Number(el.getAttribute("y")),
        })),
      );
      expect(bars).toHaveLength(3);
      for (const [i, h] of [55, 165, 27.5].entries()) {
        expect(bars[i].h).toBeCloseTo(h, 7);
        expect(bars[i].y + bars[i].h).toBeCloseTo(230, 7);
      }
      await actualSvgEvidence(lab);
    },
  ),
  forge022Case(
    forge022ChemistryBLessons,
    "hibritlesme",
    "forge022-chemistry-b-hibritlesme",
    async (_page, lab) => {
      await lab.getByLabel("Açık yapı", { exact: true }).selectOption("allene");
      await lab.getByLabel("İncelenen atom", { exact: true }).selectOption("1");
      await compare(
        lab,
        "sp",
        "Allen merkezinde iki σ komşusu ve sıfır serbest çift vardır. İki bölge sp; molekül toplamı 6 σ ve 2 π.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText(
        "Seçili C2: 2 σ komşuluğu + 0 bağ yapmayan çift = 2 bölge",
      );
      await expect(r).toContainText(
        "Yerel model: sp; oluşan hibrit: 2; kalan saf p: 2",
      );
      await expect(r).toContainText("Bütün molekül: 6 σ ve 2 π");
      const g = await actualBonds(lab, "hybrid");
      expect(g.atoms).toHaveLength(7);
      expect(g.bonds.map((b) => b.order).sort()).toEqual([1, 1, 1, 1, 2, 2]);
      const sub = (
          a: { x: number; y: number; z: number },
          b: { x: number; y: number; z: number },
        ) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }),
        dot = (
          a: { x: number; y: number; z: number },
          b: { x: number; y: number; z: number },
        ) => a.x * b.x + a.y * b.y + a.z * b.z;
      const left = sub(g.atoms[3].view, g.atoms[5].view),
        right = sub(g.atoms[4].view, g.atoms[6].view),
        axis = sub(g.atoms[2].view, g.atoms[0].view);
      expect(dot(left, right)).toBeCloseTo(0, 10);
      expect(dot(left, axis)).toBeCloseTo(0, 10);
      expect(dot(right, axis)).toBeCloseTo(0, 10);
      await actualSvgEvidence(lab);
    },
  ),
  forge022Case(
    forge022ChemistryBLessons,
    "molekul-geometrisi",
    "forge022-chemistry-b-molekul-geometrisi",
    async (_page, lab) => {
      await lab.getByLabel("Molekül", { exact: true }).selectOption("co2");
      await compare(
        lab,
        "Evet",
        "CO₂ iki elektron bölgesiyle doğrusal. Eşdeğer C=O bağ katkıları eşit ve karşıt; net kalıcı dipol sıfır.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText(
        "Molekül şekli: Doğrusal; gerçek bağ açıları: 180°",
      );
      await expect(r).toContainText("Kalıcı dipol sınıfı: Apolar");
      await expect(r).toContainText("Net (x; y; z) = (0; 0; 0)");
      const g = await actualBonds(lab, "geometry");
      expect(g.atoms).toHaveLength(3);
      expect(g.bonds.map((b) => b.order)).toEqual([2, 2]);
      expect((g.atoms[1].x + g.atoms[2].x) / 2).toBeCloseTo(g.atoms[0].x, 7);
      expect((g.atoms[1].y + g.atoms[2].y) / 2).toBeCloseTo(g.atoms[0].y, 7);
      await expect(
        lab.locator('[data-zero-vector="dipole-result"]'),
      ).toHaveCount(1);
      await expect(lab.locator("[data-lone-pair]")).toHaveCount(0);
      await actualSvgEvidence(lab);
    },
  ),
  forge022Case(
    forge022ChemistryBLessons,
    "alkanlar",
    "forge022-chemistry-b-alkanlar",
    async (_page, lab) => {
      await lab
        .getByLabel("Karbon iskeleti", { exact: true })
        .selectOption("neo");
      await lab.getByLabel("Seçili C", { exact: true }).selectOption("1");
      await compare(
        lab,
        "1",
        "Seçili dört metil grubu eş konumda; merkezde H yok. Tek H değişimi bir bağlantısal ürün verir.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Molekül formülü: C5H12; M = 72 g/mol");
      await expect(r).toContainText("Seçili C2: 1 C komşusu; 3 H");
      await expect(r).toContainText(
        "Primer = 4; sekonder = 0; tersiyer = 0; kuaterner = 1",
      );
      await expect(r).toContainText("En uzun karbon yolu: 3 C");
      await expect(r).toContainText("Toplam σ = 16: 4 C–C + 12 C–H; π = 0");
      await expect(r).toContainText("Tek H → Cl için farklı yapı ürünü: 1");
      const g = await actualBonds(lab, "alkane");
      expect(g.atoms).toHaveLength(5);
      expect(g.bonds).toHaveLength(4);
      expect(g.bonds.every((b) => b.a === 0 || b.b === 0)).toBe(true);
      await actualSvgEvidence(lab);
    },
  ),
];
