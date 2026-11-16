import { expect, type Locator } from "@playwright/test";
import { forge020PhysicsLessons } from "../../src/learning/forge020Physics";
import { forge020Case, setRange } from "./forge020-case-helper";
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab.getByLabel("Modelden gerekçen", { exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".physics020-feedback")).toContainText(
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
export const physics020Cases = [
  forge020Case(
    forge020PhysicsLessons,
    "manyetik-kuvvet",
    "forge020-physics-manyetik-kuvvet",
    async (_page, lab) => {
      await setRange(lab, "Yük (μC)", -2);
      await compare(
        lab,
        "Yukarı",
        "Başlangıç hızı +x, B +z; negatif yük için ilk kuvvet +y olur. Saf B sürati korur.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("konum (3,3659; 1,8388) m");
      await expect(r).toContainText("K = 8 μJ");
      await actualArrow(lab, "velocity", 4 * Math.cos(1), 4 * Math.sin(1));
      await actualArrow(
        lab,
        "magnetic-force",
        -4 * Math.sin(1) * 1e-6,
        4 * Math.cos(1) * 1e-6,
      );
      const a = await lab.evaluate((el) => {
        const path = el.querySelector("[data-charge-path]")!,
          pts = path
            .getAttribute("points")!
            .split(/\s+/)
            .map((p) => p.split(",").map(Number)),
          p = el.querySelector("[data-charge-position]")!;
        return {
          pts,
          scale: Number(path.getAttribute("data-scale")),
          x: Number(p.getAttribute("cx")),
          y: Number(p.getAttribute("cy")),
        };
      });
      const first = a.pts[0],
        last = a.pts.at(-1)!;
      expect(last[0] - first[0]).toBeCloseTo(4 * Math.sin(1) * a.scale, 7);
      expect(first[1] - last[1]).toBeCloseTo(
        4 * (1 - Math.cos(1)) * a.scale,
        7,
      );
      expect(a.x).toBeCloseTo(last[0], 7);
      expect(a.y).toBeCloseTo(last[1], 7);
      await actualSvgEvidence(lab);
    },
  ),
  forge020Case(
    forge020PhysicsLessons,
    "elektromanyetik-induksiyon",
    "forge020-physics-elektromanyetik-induksiyon",
    async (_page, lab) => {
      await setRange(lab, "Bz (0,1 T)", -5);
      await compare(
        lab,
        "Saatin tersi",
        "İçe akının büyüklüğü artar; negatif B ve pozitif hızla ε pozitif, akım saatin tersi olur.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Φ = B L x = -0,16 Wb");
      await expect(r).toContainText("ε = −dΦ/dt = 0,6 V");
      await expect(r).toContainText("I = 0,3 A");
      await expect(r).toContainText(
        "Dış güç = 0,18 W; direnç ısıl gücü = 0,18 W",
      );
      await actualArrow(lab, "rod-velocity", 3, 0);
      await actualArrow(lab, "rod-drag", -0.06, 0);
      await actualArrow(lab, "rod-current", 0, 1);
      const p = await lab.locator("[data-moving-rod]").evaluate((el) => {
        const path = el as SVGPathElement,
          start = path.getPointAtLength(0),
          end = path.getPointAtLength(path.getTotalLength()),
          number = "([-+]?(?:\\d*\\.)?\\d+(?:e[-+]?\\d+)?)",
          endpoints = path
            .getAttribute("d")!
            .match(new RegExp(`^M${number}\\s+${number}V${number}$`, "i"));
        if (!endpoints)
          throw new Error("Moving rod must remain a vertical M/V path");
        return {
          start: { x: start.x, y: start.y },
          end: { x: end.x, y: end.y },
          serialized: {
            start: { x: Number(endpoints[1]), y: Number(endpoints[2]) },
            end: { x: Number(endpoints[1]), y: Number(endpoints[3]) },
          },
          scale: Number(el.getAttribute("data-scale")),
        };
      });
      expect(p.start.x).toBeCloseTo(p.end.x, 8);
      // The authored path retains its full L×scale geometry; this bound is unchanged.
      expect(p.serialized.start.y - p.serialized.end.y).toBeCloseTo(
        0.4 * p.scale,
        7,
      );
      // SVG's point API exposes float32 endpoints. Check those separately without
      // widening the physical path tolerance to hide the API's representation.
      expect(p.start.x).toBeCloseTo(Math.fround(p.serialized.start.x), 8);
      expect(p.end.x).toBeCloseTo(Math.fround(p.serialized.end.x), 8);
      expect(p.start.y).toBeCloseTo(Math.fround(p.serialized.start.y), 7);
      expect(p.end.y).toBeCloseTo(Math.fround(p.serialized.end.y), 7);
      await actualSvgEvidence(lab);
    },
  ),
  forge020Case(
    forge020PhysicsLessons,
    "alternatif-akim",
    "forge020-physics-alternatif-akim",
    async (_page, lab) => {
      await lab
        .getByRole("spinbutton", { name: "Sığa (μF), sayıyla", exact: true })
        .fill("500");
      await compare(
        lab,
        "Geride",
        "XL 40 Ω, XC 20 Ω; net pozitif reaktans kaynak gerilimini akımın önüne taşır.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Z = 36,0555 Ω; I_etkin = 1,6641 A");
      await expect(r).toContainText("φ = 33,6901°");
      await expect(r).toContainText("Ortalama gerçek güç = 83,0769 W");
      const i = 60 / Math.sqrt(1300);
      await actualArrow(lab, "VR", i * 30, 0);
      await actualArrow(lab, "VL-VC", 0, i * 20);
      await actualArrow(lab, "source-phasor", i * 30, i * 20);
      const point = lab.locator("[data-ac-current]");
      expect(Number(await point.getAttribute("data-value"))).toBeCloseTo(
        Math.SQRT2 * i * Math.cos(Math.atan2(20, 30)),
        10,
      );
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(
        245 - 50 * Math.cos(Math.atan2(20, 30)),
        7,
      );
      await actualSvgEvidence(lab);
    },
  ),
  forge020Case(
    forge020PhysicsLessons,
    "transformatorler",
    "forge020-physics-transformatorler",
    async (_page, lab) => {
      await lab
        .getByRole("spinbutton", {
          name: "Sekonder sarım sayısı, sayıyla",
          exact: true,
        })
        .fill("800");
      await compare(
        lab,
        "Yükseltir",
        "800/400 oranı 2; çıkış 240 V, 30 Ω yük 8 A çeker. 1920 W girişte de sağlanır.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("V_S = 240 V; I_S = 8 A");
      await expect(r).toContainText(
        "I_P = 16 A; P_giriş = 1.920 W; P_çıkış = 1.920 W",
      );
      await expect(lab.locator("[data-secondary-winding]")).toHaveAttribute(
        "data-turns",
        "800",
      );
      const a = await lab.evaluate((el) => {
        const box = (selector: string) => {
          const b = (
            el.querySelector(selector)! as SVGGraphicsElement
          ).getBBox();
          return { left: b.x, right: b.x + b.width };
        };
        const p = [
            box("[data-primary-circuit]"),
            box("[data-primary-winding]"),
          ],
          s = [
            box("[data-secondary-circuit]"),
            box("[data-secondary-winding]"),
          ];
        return {
          pRight: Math.max(...p.map((b) => b.right)),
          sLeft: Math.min(...s.map((b) => b.left)),
        };
      });
      expect(
        a.pRight,
        "isolated transformer windings must not acquire a direct wire connection",
      ).toBeLessThan(a.sLeft);
      await actualSvgEvidence(lab);
    },
  ),
  forge020Case(
    forge020PhysicsLessons,
    "cembersel-hareket",
    "forge020-physics-cembersel-hareket",
    async (_page, lab) => {
      await setRange(lab, "Sürat (m/s)", 10);
      await setRange(lab, "Konum açısı (°)", 90);
      await compare(
        lab,
        "Yetersiz",
        "Gereken 40 N, sınır 10 N. Kesikli çember gerçek kayma yolu değildir; tur süresi kurulamaz.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("F_radyal = 40 N");
      await expect(r).toContainText("en büyük statik sürtünme = 10 N");
      await expect(r).toContainText("Bu seçim için gerçek tur süresi verilmez");
      await expect(lab.locator("[data-candidate-circle]")).toHaveAttribute(
        "data-feasible",
        "false",
      );
      await actualArrow(lab, "circular-velocity", -10, 0);
      await actualArrow(lab, "circular-acceleration", 0, -20);
      await expect(
        lab.locator('[data-vector="circular-acceleration"]'),
      ).toHaveClass(/physics020-required/);
      const p = await lab.evaluate((el) => {
        const c = el.querySelector("[data-candidate-circle]")!,
          dot = el.querySelector("[data-circular-position]")!;
        return {
          cx: Number(c.getAttribute("cx")),
          cy: Number(c.getAttribute("cy")),
          r: Number(c.getAttribute("r")),
          x: Number(dot.getAttribute("cx")),
          y: Number(dot.getAttribute("cy")),
        };
      });
      expect(p.x).toBeCloseTo(p.cx, 8);
      expect(p.cy - p.y).toBeCloseTo(p.r, 8);
      await actualSvgEvidence(lab);
    },
  ),
];
