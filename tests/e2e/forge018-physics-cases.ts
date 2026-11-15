import { expect, type Locator } from "@playwright/test";
import { forge018PhysicsLessons } from "../../src/learning/forge018Physics";
import { forge018Case, setRange } from "./forge018-case-helper";
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab.getByLabel("Modelden gerekçen", { exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".physics018-feedback")).toContainText(
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
export const physics018Cases = [
  forge018Case(
    forge018PhysicsLessons,
    "itme-momentum",
    "forge018-physics-itme-momentum",
    async (_page, lab) => {
      await setRange(lab, "İkinci net kuvvet (N)", -8);
      await setRange(lab, "Zaman (%)", 100);
      await compare(
        lab,
        "Sıfır",
        "İlk alan +8, ikinci alan −8 N·s; net itme sıfır.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Net itme: 0 N·s");
      await expect(r).toContainText("seçili momentum 6 kg·m/s");
      await expect(r).toContainText("Hız: 3 m/s");
      await expect(r).toContainText("yer değiştirme: 15 m");
      await expect(lab.locator('[data-area="force-1"]')).toHaveAttribute(
        "data-impulse",
        "8",
      );
      await expect(lab.locator('[data-area="force-2"]')).toHaveAttribute(
        "data-impulse",
        "-8",
      );
      await expect(lab.locator("[data-momentum-line]")).toHaveAttribute(
        "d",
        /M.+L.+L/,
      );
      await actualSvgEvidence(lab);
    },
  ),
  forge018Case(
    forge018PhysicsLessons,
    "kesisen-kuvvetler-dengesi",
    "forge018-physics-kesisen-kuvvetler-dengesi",
    async (_page, lab) => {
      await setRange(lab, "Sağ açı (°)", 60);
      await compare(
        lab,
        "Sağ ip",
        "Sol 50 N; sağ 50√3 N. Yatay bileşenler zıt eşit.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sol gerilme: 50 N; sağ gerilme: 86,6 N",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ΣFx = -43,3 + 43,3 = 0 N",
      );
      await actualArrow(lab, "left-tension", -25 * Math.sqrt(3), 25);
      await actualArrow(lab, "right-tension", 25 * Math.sqrt(3), 75);
      await actualArrow(lab, "load", 0, -100);
      await actualSvgEvidence(lab);
    },
  ),
  forge018Case(
    forge018PhysicsLessons,
    "tork-denge",
    "forge018-physics-tork-denge",
    async (_page, lab) => {
      await setRange(lab, "F y (N)", -4);
      await compare(
        lab,
        "Saat yönü",
        "2·(−4) − 1·3 = −11 N·m; işaret saat yönünü gösterir.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("-11 N·m");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Dik kol: 2,2 m",
      );
      const arm = lab.locator("[data-moment-arm]");
      expect(Number(await arm.getAttribute("data-foot-x"))).toBeCloseTo(1.76);
      expect(Number(await arm.getAttribute("data-foot-y"))).toBeCloseTo(1.32);
      await actualArrow(lab, "applied-force", 3, -4);
      const geometry = await lab.evaluate((el) => {
        const nums = (selector: string) =>
          el
            .querySelector(selector)!
            .getAttribute("d")!
            .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)!
            .map(Number);
        const arm = nums("[data-moment-arm]"),
          f = nums('[data-vector="applied-force"]');
        return {
          dot:
            (arm[2] - arm[0]) * (f[2] - f[0]) +
            (arm[3] - arm[1]) * (f[3] - f[1]),
        };
      });
      expect(geometry.dot).toBeCloseTo(0, 7);
      await actualSvgEvidence(lab);
    },
  ),
  forge018Case(
    forge018PhysicsLessons,
    "kutle-agirlik-merkezi",
    "forge018-physics-kutle-agirlik-merkezi",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Sağ sütunu çıkar", exact: true })
        .click();
      await compare(
        lab,
        "Solda",
        "Sağ sütundaki 4 kg çıkarıldı; kalan 12 kg x = 1,5 m’de.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kalan kütle: 12 kg",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Merkez: (1,5; 2) m",
      );
      await expect(lab.locator('[data-cell][data-present="true"]')).toHaveCount(
        12,
      );
      await expect(lab.locator("[data-centre-x]")).toHaveAttribute(
        "data-centre-x",
        "1.5",
      );
      const coords = await lab.evaluate((el) => {
        const cell = el.querySelector('[data-cell="13"]')!,
          c = el.querySelector("[data-centre]")!;
        return {
          x: Number(c.getAttribute("cx")),
          y: Number(c.getAttribute("cy")),
          left: Number(cell.getAttribute("x")),
          bottom:
            Number(cell.getAttribute("y")) +
            Number(cell.getAttribute("height")),
          side: Number(cell.getAttribute("width")),
        };
      });
      expect(coords.x).toBeCloseTo(coords.left + 1.5 * coords.side);
      expect(coords.y).toBeCloseTo(coords.bottom - 2 * coords.side);
      await actualSvgEvidence(lab);
    },
  ),
  forge018Case(
    forge018PhysicsLessons,
    "basit-makineler-ayt",
    "forge018-physics-basit-makineler-ayt",
    async (_page, lab) => {
      await lab.getByLabel("Makine", { exact: true }).selectOption("ramp");
      await setRange(lab, "Yük (N)", 100);
      await compare(
        lab,
        "Isıya aktarılır",
        "Normal 80 N, sürtünme 20 N; 5 m’de 100 J ısı olur.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText(
        "Normal: 80 N; sürtünme: 20 N; el kuvveti: 80 N",
      );
      await expect(r).toContainText(
        "Giriş: 400 J; yararlı potansiyel: 300 J; ısı: 100 J",
      );
      await expect(r).toContainText("Verim: %75");
      await actualArrow(lab, "weight", 0, -100);
      await actualArrow(lab, "normal", -48, 64);
      await actualArrow(lab, "effort", 64, 48);
      await actualArrow(lab, "friction", -16, -12);
      const ramp = lab.locator("[data-ramp]");
      expect(Number(await ramp.getAttribute("data-sin"))).toBe(0.6);
      expect(Number(await ramp.getAttribute("data-cos"))).toBe(0.8);
      await actualSvgEvidence(lab);
    },
  ),
  forge018Case(
    forge018PhysicsLessons,
    "elektriksel-kuvvet-ayt",
    "forge018-physics-elektriksel-kuvvet-ayt",
    async (_page, lab) => {
      await setRange(lab, "B yükü (μC)", -2);
      await compare(
        lab,
        "Sağa",
        "A sağ-yukarı iter; B sağ-aşağı çeker; düşeyler iptal olur.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Net kuvvet: (0,012728; 0) N");
      await expect(r).toContainText("Kaynakların alanı: (12.727,92; 0) N/C");
      await actualArrow(
        lab,
        "source-1",
        0.009 / Math.sqrt(2),
        0.009 / Math.sqrt(2),
      );
      await actualArrow(
        lab,
        "source-2",
        0.009 / Math.sqrt(2),
        -0.009 / Math.sqrt(2),
      );
      await actualArrow(lab, "net-force", 0.009 * Math.sqrt(2), 0);
      await expect(lab.locator('[data-charge="A"]')).toHaveAttribute(
        "data-q",
        "2",
      );
      await expect(lab.locator('[data-charge="B"]')).toHaveAttribute(
        "data-q",
        "-2",
      );
      await expect(lab.locator('[data-charge="C"]')).toHaveAttribute(
        "data-world-y",
        "1",
      );
      await actualSvgEvidence(lab);
    },
  ),
];
