import { expect, type Locator } from "@playwright/test";
import { forge022ChemistryALessons } from "../../src/learning/forge022ChemistryA";
import { forge022Case, setRange } from "./forge022-case-helper";

async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByLabel("Tahminin", { exact: true }).selectOption(choice);
  await lab.getByLabel("Gerekçen", { exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahmini kıyasla", exact: true })
    .click();
  await expect(lab.locator(".ca022-evidence > p[role=status]")).toContainText(
    "Tahminin modelle uyumlu.",
  );
}

async function serialNumber(lab: Locator, label: string, digits: string) {
  const input = lab.getByRole("textbox", {
    name: `${label}, sayıyla`,
    exact: true,
  });
  await input.focus();
  await input.press("ControlOrMeta+A");
  await input.press("Backspace");
  await input.pressSequentially(digits);
  // Editing does not clamp each digit; the whole number commits on Enter.
  await expect(input).toHaveValue(digits);
  await input.press("Enter");
}

async function actualSvg(lab: Locator) {
  const rows = await lab.locator("svg").evaluateAll((nodes) =>
    nodes.flatMap((node) => {
      const svg = node as SVGSVGElement,
        bounds = svg.getBoundingClientRect();
      return [...svg.querySelectorAll("text")].map((el) => {
        const m = el.getScreenCTM()!,
          b = el.getBBox();
        const points = [
          [b.x, b.y],
          [b.x + b.width, b.y],
          [b.x, b.y + b.height],
          [b.x + b.width, b.y + b.height],
        ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(m));
        return {
          text: el.textContent,
          size:
            parseFloat(getComputedStyle(el).fontSize) *
            Math.min(Math.hypot(m.a, m.b), Math.hypot(m.c, m.d)),
          left: Math.min(...points.map((p) => p.x)) - bounds.left,
          right: Math.max(...points.map((p) => p.x)) - bounds.right,
          top: Math.min(...points.map((p) => p.y)) - bounds.top,
          bottom: Math.max(...points.map((p) => p.y)) - bounds.bottom,
        };
      });
    }),
  );
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows) {
    expect(row.size, `physical font: ${row.text}`).toBeGreaterThanOrEqual(16);
    expect(row.left, `left: ${row.text}`).toBeGreaterThanOrEqual(-1);
    expect(row.right, `right: ${row.text}`).toBeLessThanOrEqual(1);
    expect(row.top, `top: ${row.text}`).toBeGreaterThanOrEqual(-1);
    expect(row.bottom, `bottom: ${row.text}`).toBeLessThanOrEqual(1);
  }
}

export const chemistryA022Cases = [
  forge022Case(
    forge022ChemistryALessons,
    "elektrokimyasal-piller",
    "forge022-chemistry-a-elektrokimyasal-piller",
    async (_page, lab) => {
      await setRange(lab, "İlerleme ξ", 0.015);
      await lab
        .getByRole("checkbox", { name: "Tel bağlı", exact: true })
        .uncheck();
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-status",
        "open",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-extent",
        "0",
      );
      await lab
        .getByRole("checkbox", { name: "Tel bağlı", exact: true })
        .check();
      await compare(
        lab,
        "transfer",
        "İki iletim yolu tamam. Her mol Zn için bir mol Cu²⁺ ve iki mol elektron gerekir; 0,015 mol ilerleme stokta mümkündür.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      expect(Number(await result.getAttribute("data-extent"))).toBeCloseTo(
        0.015,
        12,
      );
      expect(Number(await result.getAttribute("data-electrons"))).toBeCloseTo(
        0.03,
        12,
      );
      expect(Number(await result.getAttribute("data-charge"))).toBeCloseTo(
        2895,
        9,
      );
      await expect(result).toHaveAttribute("data-status", "transfer");
      await expect(result).toContainText("0,005 mol");
      const rods = await lab
        .locator("svg rect.ca022-metal, svg rect.ca022-product")
        .evaluateAll((nodes) =>
          nodes.map(
            (el) =>
              Number(el.getAttribute("y")) + Number(el.getAttribute("height")),
          ),
        );
      expect(rods).toEqual([249, 249]);
      await expect(
        lab.locator("svg path.ca022-active").first(),
      ).toHaveAttribute("d", "M145 52H195");
      await actualSvg(lab);
    },
  ),
  forge022Case(
    forge022ChemistryALessons,
    "pil-gerilimi-derisim-pilleri",
    "forge022-chemistry-a-pil-gerilimi-derisim-pilleri",
    async (_page, lab) => {
      await lab
        .getByLabel("Hücre çifti", { exact: true })
        .selectOption("copper");
      await serialNumber(lab, "Sol ilk derişim", "1");
      await serialNumber(lab, "Sağ ilk derişim", "0,01");
      await compare(
        lab,
        "left",
        "Sol iyon derişimi sağın yüz katı. Yazılan yön için Q=100 ve E negatiftir; gerçek elektron yönü sağdan soladır.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-direction", "left");
      expect(Number(await result.getAttribute("data-voltage"))).toBeCloseTo(
        -0.0592,
        12,
      );
      await expect(result).toHaveAttribute("data-left", "1");
      await expect(result).toHaveAttribute("data-right", "0.01");
      await expect(result).toContainText("Elektron yönü sağdan sola.");
      const point = lab.locator("circle.ca022-dot");
      expect(Number(await point.getAttribute("cx"))).toBeCloseTo(243.75, 9);
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(
        230 - (0.0608 / 0.24) * 170,
        9,
      );
      await actualSvg(lab);
    },
  ),
  forge022Case(
    forge022ChemistryALessons,
    "elektroliz",
    "forge022-chemistry-a-elektroliz",
    async (_page, lab) => {
      await lab
        .getByLabel("Hazır hücre", { exact: true })
        .selectOption("molten");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Katot: Na metali; anot: Cl₂.",
      );
      await lab
        .getByLabel("Hazır hücre", { exact: true })
        .selectOption("magnesiumWater");
      await lab
        .getByRole("checkbox", { name: "Kutupları ters bağla", exact: true })
        .check();
      await compare(
        lab,
        "gas",
        "Sulu MgSO₄ için verilen su yarıları baskın. Katotta H₂ oluşur; kutupları çevirmek bu katodu sola taşır, Mg vermez.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-kind", "magnesiumWater");
      await expect(result).toHaveAttribute("data-cathode-side", "left");
      expect(Number(await result.getAttribute("data-cathode-mol"))).toBeCloseTo(
        0.01,
        12,
      );
      expect(Number(await result.getAttribute("data-anode-mol"))).toBeCloseTo(
        0.005,
        12,
      );
      await expect(result).toContainText("Katot: H₂; anot: O₂.");
      await expect(lab.locator("figcaption")).toContainText(
        "Katot solda ve −; anot sağda ve +.",
      );
      const labels = lab.locator("svg text");
      await expect(labels.filter({ hasText: /^H₂$/ })).toHaveAttribute(
        "x",
        "70",
      );
      await expect(labels.filter({ hasText: /^O₂$/ })).toHaveAttribute(
        "x",
        "270",
      );
      await actualSvg(lab);
    },
  ),
  forge022Case(
    forge022ChemistryALessons,
    "faraday-yasalari",
    "forge022-chemistry-a-faraday-yasalari",
    async (_page, lab) => {
      await setRange(lab, "Akım I", 5);
      await serialNumber(lab, "Süre t", "1930");
      await setRange(lab, "Hedef payı", 80);
      await setRange(lab, "İlk iyon stoku", 0.015);
      await compare(
        lab,
        "stock",
        "9650 C toplam yükün nominal yüzde 80'i 7720 C. Fakat 0,015 mol Cu²⁺ yalnız 2895 C alır; sınır ilk iyon stoğudur.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      expect(Number(await result.getAttribute("data-charge"))).toBeCloseTo(
        9650,
        9,
      );
      expect(
        Number(await result.getAttribute("data-target-charge")),
      ).toBeCloseTo(2895, 9);
      expect(Number(await result.getAttribute("data-mass"))).toBeCloseTo(
        0.96,
        12,
      );
      expect(Number(await result.getAttribute("data-share"))).toBeCloseTo(
        30,
        10,
      );
      await expect(result).toHaveAttribute("data-stock-limited", "true");
      await expect(result).toContainText("6.755 C");
      const point = lab.locator("circle.ca022-dot");
      expect(Number(await point.getAttribute("cx"))).toBeCloseTo(
        75 + (9650 / 18000) * 225,
        9,
      );
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(60, 9);
      await actualSvg(lab);
    },
  ),
  forge022Case(
    forge022ChemistryALessons,
    "korozyon-katodik-koruma",
    "forge022-chemistry-a-korozyon-katodik-koruma",
    async (_page, lab) => {
      await lab.getByLabel("Yan metal", { exact: true }).selectOption("Cu");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-status",
        "ironAnode",
      );
      await lab.getByLabel("Yan metal", { exact: true }).selectOption("Zn");
      await setRange(lab, "Örnek yük ihtiyacı", 2500);
      await compare(
        lab,
        "sacrifice",
        "Zn uygun bağlı çiftte kurban adaydır. 0,65 g stok en çok 1930 C verir; 2500 C örnek talebin tamamını karşılamaz.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-status", "budgetShort");
      expect(Number(await result.getAttribute("data-capacity"))).toBeCloseTo(
        1930,
        9,
      );
      expect(Number(await result.getAttribute("data-supplied"))).toBeCloseTo(
        1930,
        9,
      );
      expect(Number(await result.getAttribute("data-remaining"))).toBe(0);
      await expect(result).toContainText("570 C");
      const bases = await lab
        .locator("svg rect.ca022-metal, svg rect.ca022-product")
        .evaluateAll((nodes) =>
          nodes.map(
            (el) =>
              Number(el.getAttribute("y")) + Number(el.getAttribute("height")),
          ),
        );
      expect(bases).toEqual([252, 252]);
      await expect(lab.locator("svg rect.ca022-product")).toHaveAttribute("height", "0");
      await expect(lab.locator("svg rect.ca022-product")).toHaveAttribute("y", "252");
      await expect(lab.locator("svg rect.ca022-product")).toHaveAttribute("data-remaining-stock", "0");
      await expect(lab.locator("svg path.ca022-active")).toHaveAttribute(
        "d",
        "M220 80H145",
      );
      await actualSvg(lab);
    },
  ),
];
