import { expect, type Locator } from "@playwright/test";
import { forge022PhysicsLessons } from "../../src/learning/forge022Physics";
import { forge022Case, setRange } from "./forge022-case-helper";
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab.getByLabel("Modelden gerekçen", { exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".physics022-feedback")).toContainText(
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
  if ((await lab.getAttribute("data-forge022")) === "su-dalgalarinda-girisim")
    expect(marks).toBe(1);
}
async function actualMarkContrast(lab: Locator) {
  const rows = await lab
    .locator('[data-height-curve="2"]')
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

export const physics022Cases = [
  forge022Case(
    forge022PhysicsLessons,
    "basit-harmonik-hareket",
    "forge022-physics-basit-harmonik-hareket",
    async (_page, lab) => {
      await setRange(lab, "Zaman (% T)", 25);
      await compare(
        lab,
        "Sola",
        "T/4 anında x sıfır, hız −Aω = −1 m/s. Tüm 1 J enerji kinetiktir.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("k_eş = 50 N/m");
      await expect(result).toContainText(
        "x = 0 cm; v = -1 m/s; a = 0 m/s²; F = 0 N",
      );
      await expect(result).toContainText("K = 1 J; U = 0 J; E = 1 J");
      await actualArrow(lab, "velocity", -1, 0);
      await expect(lab.locator('[data-zero-vector="restoring"]')).toHaveCount(
        1,
      );
      const body = await lab.locator("[data-spring-body]").evaluate((el) => {
        const x = Number(el.getAttribute("x")),
          width = Number(el.getAttribute("width"));
        return {
          centre: x + width / 2,
          origin: Number(el.getAttribute("data-origin")),
          floor:
            Number(el.getAttribute("y")) + Number(el.getAttribute("height")),
        };
      });
      expect(body.centre).toBeCloseTo(body.origin, 9);
      expect(body.floor).toBe(110);
      const dot = await lab.locator("[data-time-point]").evaluate((el) => ({
        t: Number(el.getAttribute("data-cycles")),
        p: Number(el.getAttribute("data-position")),
        x: Number(el.getAttribute("cx")),
        y: Number(el.getAttribute("cy")),
        width: el.closest("svg")!.viewBox.baseVal.width,
      }));
      expect(dot.t).toBe(0.25);
      expect(dot.p).toBe(0);
      expect(dot.x).toBeCloseTo(48 + ((dot.width - 78) * 0.25) / 2, 8);
      expect(dot.y).toBe(125);
      await actualSvgEvidence(lab);
    },
  ),
  forge022Case(
    forge022PhysicsLessons,
    "su-dalgalarinda-kirinim",
    "forge022-physics-su-dalgalarinda-kirinim",
    async (_page, lab) => {
      await setRange(lab, "Açı θ (°)", 30);
      await compare(
        lab,
        "Var",
        "w=4 cm, λ=2 cm. sinθ=λ/w=1/2; ilk sıfır 30°. Bu kırınımın yokluğu değildir.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("λ / w = 0,5; v = λf = 6 cm/s");
      await expect(result).toContainText("|sin β / β| = 0");
      await expect(result).toContainText("İlk sıfır: θ₁ = 30°");
      const ray = await lab.locator("[data-direction]").evaluate((el) => {
        const p = el
          .getAttribute("d")!
          .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)!
          .map(Number);
        return {
          dx: p[2] - p[0],
          dy: p[3] - p[1],
          length: Number(el.getAttribute("data-length")),
        };
      });
      expect(ray.dx).toBeCloseTo((ray.length * Math.sqrt(3)) / 2, 8);
      expect(ray.dy).toBeCloseTo(-ray.length / 2, 8);
      const aperture = await lab.locator("[data-aperture]").evaluate((el) => ({
        path: el.getAttribute("d"),
        width: Number(el.getAttribute("data-width")),
        scale: Number(el.getAttribute("data-scale")),
        gap: Number(el.getAttribute("data-gap")),
      }));
      expect(aperture.width).toBe(4);
      expect(aperture.gap).toBe(aperture.width * aperture.scale);
      const point = await lab
        .locator("[data-envelope-point]")
        .evaluate((el) => ({
          angle: Number(el.getAttribute("data-angle")),
          amplitude: Number(el.getAttribute("data-amplitude")),
          x: Number(el.getAttribute("cx")),
          y: Number(el.getAttribute("cy")),
          width: el.closest("svg")!.viewBox.baseVal.width,
        }));
      expect(point.angle).toBe(30);
      expect(point.amplitude).toBeLessThan(1e-14);
      expect(point.y).toBeCloseTo(208, 10);
      expect(point.x).toBeCloseTo(42 + ((point.width - 70) * 120) / 180, 8);
      await actualSvgEvidence(lab);
    },
  ),
  forge022Case(
    forge022PhysicsLessons,
    "su-dalgalarinda-girisim",
    "forge022-physics-su-dalgalarinda-girisim",
    async (_page, lab) => {
      await setRange(lab, "B’nin fazı (°)", 180);
      await setRange(lab, "Zaman (% T)", 25);
      await compare(
        lab,
        "Evet",
        "P iki kaynağa 5 cm uzakta. Eşit 2 mm katkılar 180° ters fazlıdır; toplam her an sıfır.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("r₁ = 5 cm; r₂ = 5 cm");
      await expect(result).toContainText(
        "η₁ = 2 mm; η₂ = -2 mm; toplam η = 0 mm",
      );
      await expect(result).toContainText("Toplam genlik = 0 mm");
      await expect(result).toContainText("Durum: Tam düğüm");
      const point = await lab.locator("[data-probe]").evaluate((el) => ({
        x: Number(el.getAttribute("data-x")),
        y: Number(el.getAttribute("data-y")),
        cx: Number(el.getAttribute("cx")),
        cy: Number(el.getAttribute("cy")),
        ox: Number(el.getAttribute("data-origin-x")),
        oy: Number(el.getAttribute("data-origin-y")),
        scale: Number(el.getAttribute("data-scale")),
      }));
      expect(point.x).toBe(0);
      expect(point.y).toBe(4);
      expect(point.cx).toBe(point.ox);
      expect(point.cy).toBeCloseTo(point.oy - 4 * point.scale, 9);
      const curves = await lab
        .locator("[data-phase-curve]")
        .evaluateAll((nodes) =>
          nodes.map((el) => ({
            kind: el.getAttribute("data-phase-curve"),
            delta: Number(el.getAttribute("data-path-difference")),
            world: JSON.parse(el.getAttribute("data-points")!) as {
              x: number;
              y: number;
            }[],
            pixels: el
              .getAttribute("points")!
              .split(" ")
              .map((p) => p.split(",").map(Number)),
          })),
        );
      expect(curves.some((c) => c.kind === "node" && c.delta === 0)).toBe(true);
      for (const c of curves)
        for (let i = 0; i < c.world.length; i++) {
          const p = c.world[i];
          expect(
            Math.hypot(p.x - 3, p.y) - Math.hypot(p.x + 3, p.y),
          ).toBeCloseTo(c.delta, 9);
          expect(c.pixels[i][0]).toBeCloseTo(point.ox + p.x * point.scale, 8);
          expect(c.pixels[i][1]).toBeCloseTo(point.oy - p.y * point.scale, 8);
        }
      const height = await lab
        .locator("[data-height-point]")
        .evaluate((el) => ({
          height: Number(el.getAttribute("data-height")),
          cy: Number(el.getAttribute("cy")),
        }));
      expect(height.height).toBeCloseTo(0, 10);
      expect(height.cy).toBeCloseTo(136, 10);
      await actualSvgEvidence(lab);
    },
  ),
];
