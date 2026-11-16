import { expect, type Locator } from "@playwright/test";
import { forge021PhysicsLessons } from "../../src/learning/forge021Physics";
import { forge021Case, setRange } from "./forge021-case-helper";
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab.getByLabel("Modelden gerekçen", { exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".physics021-feedback")).toContainText(
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

export const physics021Cases = [
  forge021Case(
    forge021PhysicsLessons,
    "donerek-oteleme-hareketi",
    "forge021-physics-donerek-oteleme-hareketi",
    async (_page, lab) => {
      await lab
        .getByLabel("Temas modeli", { exact: true })
        .selectOption("free");
      await setRange(lab, "ω (rad/s)", -3);
      await setRange(lab, "Zaman (0,1 s)", 0);
      await setRange(lab, "İlk açı (°)", 90);
      await compare(
        lab,
        "Sağa",
        "v + ωR = 2 − 3×0,4 = 0,8 m/s; temas sağa kayar. Üst nokta sağa 3,2 m/s gider.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("Yere göre hız: (3,2; 0) m/s");
      await expect(result).toContainText("v + ωR = 0,8 m/s");
      await expect(result).toContainText("toplam K = 4,72 J");
      await actualArrow(lab, "translation", 2, 0);
      await actualArrow(lab, "spin", 1.2, 0);
      await actualArrow(lab, "ground", 3.2, 0);
      const point = await lab
        .locator("[data-material-point]")
        .evaluate((el) => {
          const wheel = el.closest("svg")!.querySelector(".physics021-body")!;
          return {
            x: Number(el.getAttribute("cx")),
            y: Number(el.getAttribute("cy")),
            worldX: Number(el.getAttribute("data-x")),
            worldY: Number(el.getAttribute("data-y")),
            scale: Number(el.getAttribute("data-scale")),
            radius: Number(el.getAttribute("data-radius")),
            centreX: Number(wheel.getAttribute("cx")),
            centreY: Number(wheel.getAttribute("cy")),
          };
        });
      expect(point.worldX).toBeCloseTo(0, 9);
      expect(point.worldY).toBeCloseTo(0.8, 9);
      expect(point.x).toBeCloseTo(point.centreX, 8);
      expect(point.y).toBeCloseTo(
        point.centreY - point.radius * point.scale,
        8,
      );
      await actualSvgEvidence(lab);
    },
  ),
  forge021Case(
    forge021PhysicsLessons,
    "acisal-momentum",
    "forge021-physics-acisal-momentum",
    async (_page, lab) => {
      await setRange(lab, "Son r (cm)", 50);
      await setRange(lab, "Son açı (°)", 0);
      await compare(
        lab,
        "Sıfır",
        "Dış J sıfır. I:9→1,5 kg·m²; L18 sabit kalır. Son ω12 rad/s, dönme enerjisi108 J olur.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("I_son = 1,5 kg·m²");
      await expect(result).toContainText("L_son = 18 kg·m²/s");
      await expect(result).toContainText("ω_son = L_son / I_son = 12 rad/s");
      await expect(result).toContainText("K_son = 108 J");
      await actualArrow(lab, "mass-0-velocity", 0, 6);
      await actualArrow(lab, "mass-1-velocity", 0, -6);
      const dots = await lab
        .locator("[data-angular-mass]")
        .evaluateAll((nodes) =>
          nodes.map((el) => ({
            cx: Number(el.getAttribute("cx")),
            cy: Number(el.getAttribute("cy")),
            ox: Number(el.getAttribute("data-origin-x")),
            oy: Number(el.getAttribute("data-origin-y")),
            scale: Number(el.getAttribute("data-scale")),
          })),
        );
      expect(dots).toHaveLength(2);
      expect(dots[0].cx - dots[0].ox).toBeCloseTo(0.5 * dots[0].scale, 8);
      expect(dots[1].cx - dots[1].ox).toBeCloseTo(-0.5 * dots[1].scale, 8);
      expect(dots[0].cy).toBeCloseTo(dots[0].oy, 8);
      const gap = await lab
        .locator('[data-physics021-plot="angular-distribution"]')
        .evaluate((svg) => {
          const label = [...svg.querySelectorAll("text")]
            .find((t) => t.textContent === "A")!
            .getBBox();
          const ray = (
            svg.querySelector(
              '[data-vector="mass-0-velocity"]',
            ) as SVGPathElement
          ).getBBox();
          return label.x - (ray.x + ray.width);
        });
      expect(gap).toBeGreaterThanOrEqual(12);
      await actualSvgEvidence(lab);
    },
  ),
  forge021Case(
    forge021PhysicsLessons,
    "newton-genel-cekim-yasasi",
    "forge021-physics-newton-genel-cekim-yasasi",
    async (_page, lab) => {
      await setRange(lab, "r (% R)", 50);
      await compare(
        lab,
        "Daha az",
        "Homojen küre içinde g/g₀=r/R=0,5. İç kütle M/8 olur; bütün M nokta gibi alınmaz.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("İç kütle / M = 0,125");
      await expect(result).toContainText("g_x = -5,5583 N/kg");
      await expect(result).toContainText("|g| / g₀ = 0,5");
      await expect(result).toContainText("φ = -91,7125 ×10⁶ J/kg");
      const p = await lab.locator("[data-probe]").evaluate((el) => ({
        cx: Number(el.getAttribute("cx")),
        origin: Number(el.getAttribute("data-origin")),
        unit: Number(el.getAttribute("data-unit")),
      }));
      expect(p.cx).toBeCloseTo(p.origin + 0.5 * p.unit, 8);
      const g = await lab.locator("[data-field-point]").evaluate((el) => ({
        cx: Number(el.getAttribute("cx")),
        cy: Number(el.getAttribute("cy")),
        left: Number(el.getAttribute("data-x-min")),
        right: Number(el.getAttribute("data-x-max")),
        top: Number(el.getAttribute("data-y-top")),
        bottom: Number(el.getAttribute("data-y-bottom")),
      }));
      expect(g.cx).toBeCloseTo(g.left + (g.right - g.left) / 6, 8);
      expect(g.cy).toBeCloseTo((g.top + g.bottom) / 2, 8);
      const inner = await lab.locator("[data-enclosed-r]").getAttribute("r"),
        outer = await lab.locator("[data-planet-r]").getAttribute("r");
      expect(Number(inner) / Number(outer)).toBeCloseTo(0.5, 8);
      await actualSvgEvidence(lab);
    },
  ),
  forge021Case(
    forge021PhysicsLessons,
    "kepler-yasalari",
    "forge021-physics-kepler-yasalari",
    async (_page, lab) => {
      await setRange(lab, "e (% 1)", 60);
      await setRange(lab, "Zaman (% T)", 50);
      await compare(
        lab,
        "Fazla",
        "e=0,6 için uç hız oranı4. Yıldız odakta; iki eşit süreli sektör aynı alanı tarar, aynı yayı değil.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("P konumu: (-6,4; 0) ×10⁷ m");
      await expect(result).toContainText("A = B = 4,0212 ×10¹⁴ m²");
      await expect(result).toContainText("Özgül E = -5 ×10⁶ J/kg");
      await actualArrow(lab, "orbit-velocity", 0, -Math.sqrt(2.5e6));
      await actualArrow(lab, "orbit-acceleration", 0.09765625, 0);
      const b = await lab.locator("[data-orbit-body]").evaluate((el) => ({
        x: Number(el.getAttribute("cx")),
        y: Number(el.getAttribute("cy")),
        ox: Number(el.getAttribute("data-origin-x")),
        oy: Number(el.getAttribute("data-origin-y")),
        scale: Number(el.getAttribute("data-scale")),
      }));
      expect(b.x - b.ox).toBeCloseTo(-6.4e7 * b.scale, 7);
      expect(b.y).toBeCloseTo(b.oy, 7);
      const sectors = await lab.locator("[data-sector]").evaluateAll((nodes) =>
        nodes.map((el) => {
          const pts = el
            .getAttribute("points")!
            .trim()
            .split(/\s+/)
            .map((s) => s.split(",").map(Number));
          const area =
            Math.abs(
              pts.reduce((n, p, i) => {
                const q = pts[(i + 1) % pts.length];
                return n + p[0] * q[1] - p[1] * q[0];
              }, 0),
            ) / 2;
          const orbit = el.closest("svg")!.querySelector("[data-orbit]")!;
          return {
            area: area / Number(orbit.getAttribute("data-scale")) ** 2,
            time: Number(el.getAttribute("data-window")),
          };
        }),
      );
      expect(sectors).toHaveLength(2);
      expect(sectors[0].time).toBe(sectors[1].time);
      for (const sector of sectors) {
        expect(sector.area / (1.28 * Math.PI * 1e14)).toBeGreaterThan(0.995);
        expect(sector.area / (1.28 * Math.PI * 1e14)).toBeLessThanOrEqual(
          1.000001,
        );
      }
      await actualSvgEvidence(lab);
    },
  ),
];
