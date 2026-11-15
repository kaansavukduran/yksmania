import { expect, type Locator } from "@playwright/test";
import { forge017PhysicsLessons as lessons } from "../../src/learning/forge017Physics";
import { forge017Case, setRange } from "./forge017-case-helper";
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .click();
  await expect(
    lab.locator('.physics017-feedback[role="status"]'),
  ).toContainText("Tahminin verilen koşullarla uyumlu.");
}
async function readable(lab: Locator) {
  const result = await lab
    .locator("svg[data-physics017-plot]")
    .evaluateAll((svgs) =>
      svgs.map((s) => {
        const svg = s as SVGSVGElement,
          v = svg.viewBox.baseVal;
        return [...svg.querySelectorAll("text")].map((t) => {
          const b = t.getBBox(),
            m = t.getScreenCTM()!;
          return {
            text: t.textContent,
            size:
              parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b),
            inside:
              b.x >= v.x - 0.1 &&
              b.y >= v.y - 0.1 &&
              b.x + b.width <= v.x + v.width + 0.1 &&
              b.y + b.height <= v.y + v.height + 0.1,
          };
        });
      }),
    );
  for (const labels of result)
    for (const l of labels) {
      expect(l.size, l.text ?? "label").toBeGreaterThanOrEqual(16);
      expect(l.inside, l.text ?? "label").toBe(true);
    }
}
async function line(lab: Locator, selector: string) {
  return lab.locator(selector).evaluate((e) => {
    const n =
      (e.getAttribute("d") ?? "")
        .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)
        ?.map(Number) ?? [];
    return { x: n[0], y: n[1], dx: n[2] - n[0], dy: n[3] - n[1], all: n };
  });
}
export const physics017Cases = [
  forge017Case(
    lessons,
    "serbest-dusme-limit-hiz",
    "forge017-physics-serbest-dusme-limit-hiz",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Direnci kapat", exact: true })
        .click();
      await setRange(lab, "İlerleme (%)", 100);
      await compare(
        lab,
        "İvme aynı",
        "Direnç yok; a = g = 10 m/s² ve ilk yer zamanı 4 s.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "t = 4 s: sürat 40 m/s; aşağı ivme 10 m/s².",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "sonlu limit hız tanımlı değil",
      );
      const circle = lab.locator('[data-body="drop"]');
      expect(
        Number(await circle.getAttribute("cy")) +
          Number(await circle.getAttribute("r")),
      ).toBeCloseTo(300);
      await expect(lab.locator('[data-vector-zero="drag"]')).toHaveCount(1);
      const f = await line(lab, '[data-vector="weight"]');
      expect(f.dx).toBe(0);
      expect(f.dy).toBeCloseTo(42);
      const point = lab.locator('[data-fall-point="speed"]');
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(65);
      await readable(lab);
    },
  ),
  forge017Case(
    lessons,
    "dusey-atis",
    "forge017-physics-dusey-atis",
    async (_page, lab) => {
      await setRange(lab, "İlerleme (%)", 0);
      const initialRoute = await line(lab, '[data-drop-path="height"]');
      expect(initialRoute.all.at(-1)).toBeCloseTo(initialRoute.all[1]);
      await lab
        .getByRole("button", { name: "Balkon örneğini kur", exact: true })
        .click();
      await compare(
        lab,
        "Yol daha büyük",
        "Tepe 31,25 m; yol 11,25 + 31,25 = 42,5 m, |Δy| = 20 m.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "t = 4 s; y = 0 m; hız -25 m/s.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "yol 42,5 m",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yer değiştirme -20 m",
      );
      const c = lab.locator('[data-body="drop"]');
      expect(
        Number(await c.getAttribute("cy")) + Number(await c.getAttribute("r")),
      ).toBeCloseTo(300);
      const v = await line(lab, '[data-vector="vertical-velocity"]');
      expect(v.dx).toBe(0);
      expect(v.dy).toBeGreaterThan(0);
      await readable(lab);
    },
  ),
  forge017Case(
    lessons,
    "yatay-atis",
    "forge017-physics-yatay-atis",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Üç saniyelik örnek", exact: true })
        .click();
      await compare(
        lab,
        "Aynı kalır",
        "T = √(2 · 45/10) = 3 s; yatay hız düşey denkleme girmez.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "t = 3 s: konum (60, 0) m.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Hız (20, -30) m/s",
      );
      const a = await line(lab, '[data-vector="velocity"]');
      expect(a.dx).toBeGreaterThan(0);
      expect(a.dy / a.dx).toBeCloseTo(1.5);
      const axis = await line(lab, '[data-trajectory="parabola"]');
      const c = lab.locator('[data-body="projectile"]');
      expect(axis.all.at(-2)).toBeCloseTo(Number(await c.getAttribute("cx")));
      expect(axis.all.at(-1)).toBeCloseTo(
        Number(await c.getAttribute("cy")) + Number(await c.getAttribute("r")),
      );
      expect(Number(await c.getAttribute("data-world-x"))).toBe(60);
      await readable(lab);
    },
  ),
  forge017Case(
    lessons,
    "egik-atis",
    "forge017-physics-egik-atis",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Yerden örneği kur", exact: true })
        .click();
      await setRange(lab, "İlk sürat (m/s)", 30);
      await setRange(lab, "İlk yükseklik (m)", 20);
      await setRange(lab, "Atış açısı (°)", 30);
      await lab
        .getByRole("button", { name: "Tepeye git", exact: true })
        .click();
      await compare(
        lab,
        "Genel kök gerekir",
        "Başlangıç 20 m yukarıda. T = 4 s, R = 60√3 m; tepede vy sıfır ama vx kalır.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "menzil 103,92 m",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("31,25 m");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İlk yer 4 s",
      );
      const c = lab.locator('[data-body="projectile"]');
      expect(Number(await c.getAttribute("data-world-x"))).toBeCloseTo(
        22.5 * Math.sqrt(3),
      );
      expect(Number(await c.getAttribute("data-world-y"))).toBeCloseTo(31.25);
      const v = await line(lab, '[data-vector="velocity"]');
      expect(v.dx).toBeGreaterThan(0);
      expect(v.dy).toBeCloseTo(0, 9);
      const q = await line(lab, '[data-trajectory="parabola"]');
      expect((q.all[2] - q.all[0]) / (q.all[4] - q.all[0])).toBeCloseTo(0.5);
      expect(q.all[3]).toBeLessThan(Number(await c.getAttribute("cy")));
      await readable(lab);
    },
  ),
  forge017Case(
    lessons,
    "ayt-enerji-hareket",
    "forge017-physics-ayt-enerji-hareket",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Yaya varmadan dur", exact: true })
        .click();
      await compare(
        lab,
        "Mekanik azalır",
        "İlk K = 16 J; sürtünme 4 N, duruş 4 m. Q = 16 J, yay sıfır.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ilk duruş 4 m",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Blok yaya varmadan durur.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Q = 16 J",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Net iş -16 J",
      );
      expect(
        Number(await lab.locator('[data-energy="K"]').getAttribute("width")),
      ).toBe(0);
      expect(
        Number(await lab.locator('[data-energy="Us"]').getAttribute("width")),
      ).toBe(0);
      expect(
        Number(await lab.locator('[data-energy="Q"]').getAttribute("width")),
      ).toBeGreaterThan(100);
      const block = lab.locator('[data-body="energy-block"]');
      expect(
        Number(await block.getAttribute("y")) +
          Number(await block.getAttribute("height")),
      ).toBe(250);
      const curve = await line(lab, '[data-force-curve="net"]');
      expect(curve.all[1]).toBeCloseTo(270);
      expect(curve.all.at(-1)).toBeCloseTo(270);
      const point = lab.locator('[data-force-point="selected"]');
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(270);
      expect(Number(await point.getAttribute("data-force"))).toBe(-4);
      await readable(lab);
    },
  ),
];
