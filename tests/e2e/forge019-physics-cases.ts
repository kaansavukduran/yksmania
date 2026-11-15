import { expect, type Locator } from "@playwright/test";
import { forge019PhysicsLessons } from "../../src/learning/forge019Physics";
import { forge019Case, setRange } from "./forge019-case-helper";
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab.getByLabel("Modelden gerekçen", { exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".physics019-feedback")).toContainText(
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
}
async function actualArrow(lab: Locator, name: string, x: number, y: number) {
  const p = lab.locator(`[data-vector="${name}"]`);
  await expect(p).toHaveCount(1);
  expect(Number(await p.getAttribute("data-x"))).toBeCloseTo(x, 8);
  expect(Number(await p.getAttribute("data-y"))).toBeCloseTo(y, 8);
  const geometry = await p.evaluate((el) => {
    const values = el
        .getAttribute("d")!
        .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)!
        .map(Number),
      scale = Number(el.getAttribute("data-scale"));
    return { dx: values[2] - values[0], dy: values[3] - values[1], scale };
  });
  expect(geometry.dx).toBeCloseTo(x * geometry.scale, 7);
  expect(geometry.dy).toBeCloseTo(-y * geometry.scale, 7);
}
export const physics019Cases = [
  forge019Case(
    forge019PhysicsLessons,
    "elektriksel-potansiyel-enerji",
    "forge019-physics-elektriksel-potansiyel-enerji",
    async (_page, lab) => {
      await setRange(lab, "Test yükü (μC)", -3);
      await compare(
        lab,
        "Artar",
        "Zıt yükler uzaklaşınca negatif U sıfıra yaklaşır, ΔU pozitiftir.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("İlk U = -0,054 J; son U = -0,027 J");
      await expect(r).toContainText("ΔU = 0,027 J");
      await expect(r).toContainText("Elektrik işi = -0,027 J");
      const start = lab.locator("[data-energy-initial]"),
        end = lab.locator("[data-energy-selected]");
      expect(Number(await start.getAttribute("data-u"))).toBeCloseTo(
        -0.054,
        12,
      );
      expect(Number(await end.getAttribute("data-u"))).toBeCloseTo(-0.027, 12);
      expect(Number(await end.getAttribute("cx"))).toBeGreaterThan(
        Number(await start.getAttribute("cx")),
      );
      expect(Number(await end.getAttribute("cy"))).toBeLessThan(
        Number(await start.getAttribute("cy")),
      );
      await actualSvgEvidence(lab);
    },
  ),
  forge019Case(
    forge019PhysicsLessons,
    "elektriksel-potansiyel",
    "forge019-physics-elektriksel-potansiyel",
    async (_page, lab) => {
      await setRange(lab, "Sağ kaynak (μC)", -1);
      await compare(
        lab,
        "V sıfır, alan var",
        "Potansiyeller +9000 ve −9000 V; iki alan aynı sağ yönde toplanır.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("V = 0 V");
      await expect(r).toContainText("E = (18.000; 0) N/C");
      await actualArrow(lab, "E", 18000, 0);
      await expect(lab.locator("[data-source-charge]")).toHaveCount(2);
      await expect(lab.locator("[data-potential-probe]")).toHaveAttribute(
        "data-world-x",
        "0",
      );
      await actualSvgEvidence(lab);
    },
  ),
  forge019Case(
    forge019PhysicsLessons,
    "duzgun-alan-paralel-levhalar",
    "forge019-physics-duzgun-alan-paralel-levhalar",
    async (_page, lab) => {
      await setRange(lab, "Alt levha gerilimi (V)", 1000);
      await compare(
        lab,
        "Çıkış",
        "y = 0,20 m, üst sınır 0,25 m; 0,20 saniyede önce yatay çıkış var.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("aᵧ = 10 m/s²");
      await expect(r).toContainText("İlk olay: Çıkış; t = 0,2 s");
      await expect(r).toContainText("(x; y) = (0,4; 0,2) m");
      await expect(r).toContainText("ΔK = 0,002 J");
      const geometry = await lab.evaluate((el) => {
        const path = el.querySelector("[data-flight-path]")!,
          points = path
            .getAttribute("points")!
            .trim()
            .split(/\s+/)
            .map((p) => p.split(",").map(Number)),
          particle = el.querySelector("[data-plate-particle]")!;
        return {
          points,
          scale: Number(path.getAttribute("data-scale")),
          cx: Number(particle.getAttribute("cx")),
          cy: Number(particle.getAttribute("cy")),
          worldX: Number(particle.getAttribute("data-x")),
          worldY: Number(particle.getAttribute("data-y")),
        };
      });
      const first = geometry.points[0],
        last = geometry.points.at(-1)!;
      expect(last[0] - first[0]).toBeCloseTo(0.4 * geometry.scale, 8);
      expect(first[1] - last[1]).toBeCloseTo(0.2 * geometry.scale, 8);
      expect(geometry.cx).toBeCloseTo(last[0], 8);
      expect(geometry.cy).toBeCloseTo(last[1], 8);
      expect(geometry.worldX).toBeCloseTo(0.4, 10);
      expect(geometry.worldY).toBeCloseTo(0.2, 10);
      for (const p of geometry.points)
        expect(
          Math.abs((first[1] - p[1]) / geometry.scale),
        ).toBeLessThanOrEqual(0.25 + 1e-10);
      await actualSvgEvidence(lab);
    },
  ),
  forge019Case(
    forge019PhysicsLessons,
    "sigaclar-kondansatorler",
    "forge019-physics-sigaclar-kondansatorler",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Üreteçten ayır", exact: true })
        .click();
      await setRange(lab, "Bağıl geçirgenlik", 3);
      await compare(
        lab,
        "Yük",
        "Üreteç ayrılmış ve kaçak yok; Q 17,7 nC kalır, C üç katına çıkınca V üçte bire iner.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("C = 531 pF; Q = 17,7 nC");
      await expect(r).toContainText("V = 33,3333 V");
      await expect(r).toContainText("U = 0,295 μJ");
      await expect(lab.locator('[data-switch="open"]')).toHaveCount(1);
      await expect(lab.locator("[data-source-battery]")).toHaveCount(1);
      const crossings = await lab.evaluate((el) => {
        const read = (kind: string) => {
          const values = el
            .querySelector(`[data-capacitor-lead="${kind}"]`)!
            .getAttribute("d")!
            .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)!
            .map(Number);
          return Array.from({ length: values.length / 2 }, (_, i) => ({
            x: values[i * 2],
            y: values[i * 2 + 1],
          }));
        };
        const positive = read("positive"),
          negative = read("negative"),
          out = [];
        for (let i = 1; i < positive.length; i++)
          for (let j = 1; j < negative.length; j++) {
            const a = positive[i - 1],
              b = positive[i],
              c = negative[j - 1],
              d = negative[j];
            const cross =
              Math.max(Math.min(a.x, b.x), Math.min(c.x, d.x)) <=
                Math.min(Math.max(a.x, b.x), Math.max(c.x, d.x)) &&
              Math.max(Math.min(a.y, b.y), Math.min(c.y, d.y)) <=
                Math.min(Math.max(a.y, b.y), Math.max(c.y, d.y));
            if (cross) out.push({ i, j });
          }
        return out;
      });
      expect(
        crossings,
        "source leads must remain distinct, with no accidental short crossing",
      ).toEqual([]);
      expect(
        Number(
          await lab
            .locator("[data-capacitor-positive]")
            .getAttribute("data-charge"),
        ),
      ).toBeCloseTo(17.7e-9, 17);
      expect(
        Number(
          await lab
            .locator("[data-capacitor-negative]")
            .getAttribute("data-charge"),
        ),
      ).toBeCloseTo(-17.7e-9, 17);
      await actualSvgEvidence(lab);
    },
  ),
  forge019Case(
    forge019PhysicsLessons,
    "manyetik-alan-ayt",
    "forge019-physics-manyetik-alan-ayt",
    async (_page, lab) => {
      await setRange(lab, "Sağ tel akımı (A)", -5);
      await compare(
        lab,
        "Düzlem içi",
        "Soldaki dışarı, sağdaki içeri akım orta noktada aynı +y yönünde 10’ar μT alan verir.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("B = (0; 20) μT");
      await expect(r).toContainText("Net büyüklük 20 μT");
      await actualArrow(lab, "B", 0, 20e-6);
      const currents = await lab
        .locator("[data-wire-current]")
        .evaluateAll((els) =>
          els.map((el) => Number(el.getAttribute("data-wire-current"))),
        );
      expect(currents).toEqual([5, -5]);
      await actualSvgEvidence(lab);
    },
  ),
];
