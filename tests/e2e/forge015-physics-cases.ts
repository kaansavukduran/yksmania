import { expect, type Locator } from "@playwright/test";
import { forge015PhysicsLessons } from "../../src/learning/forge015Physics";
import { forge015Case, setRange } from "./forge015-case-helper";
async function predict(l: Locator, answer: string, reason: string) {
  await l.getByRole("radio", { name: answer, exact: true }).check();
  const box = l.getByRole("textbox", {
    name: "Modelden gerekçen",
    exact: true,
  });
  await expect(box).toHaveAttribute("maxlength", "120");
  await box.fill(reason);
  await l
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .tap();
}
async function feedback(l: Locator) {
  await expect(l.locator(".physics015-feedback")).toContainText(
    "Tahminin verilen koşullarla uyumlu.",
  );
  const labels = await l.locator("svg[data-plot] text").evaluateAll((texts) =>
    texts.map((text) => {
      const element = text as SVGTextElement,
        matrix = element.getScreenCTM(),
        box = element.getBBox(),
        frame = element.ownerSVGElement!.viewBox.baseVal;
      return {
        label: text.textContent,
        insideFrame:
          box.x >= frame.x - 0.01 &&
          box.y >= frame.y - 0.01 &&
          box.x + box.width <= frame.x + frame.width + 0.01 &&
          box.y + box.height <= frame.y + frame.height + 0.01,
        physicalFont: matrix
          ? Math.hypot(matrix.a, matrix.b) *
            parseFloat(getComputedStyle(text).fontSize)
          : 0,
      };
    }),
  );
  expect(labels.length).toBeGreaterThan(0);
  for (const label of labels) {
    expect(
      label.physicalFont,
      `SVG etiketi: ${label.label}`,
    ).toBeGreaterThanOrEqual(16);
    expect(label.insideFrame, `SVG içinde: ${label.label}`).toBe(true);
  }
}
export const physics015Cases = [
  forge015Case(
    forge015PhysicsLessons,
    "vektorler",
    "forge015-physics-vektorler",
    async (_p, l) => {
      await l.getByRole("button", { name: "Dengele", exact: true }).tap();
      await expect(l.locator("[data-model-result]")).toContainText(
        "Sıfır vektör; yön tanımsız.",
      );
      await expect(l.locator('[data-vector-zero="result"]')).toHaveCount(1);
      await expect(l.locator('[data-vector="result"]')).toHaveCount(0);
      await l.getByRole("button", { name: "Tersini al", exact: true }).tap();
      await predict(
        l,
        "Sol yarı düzlem",
        "c = −1 her iki bileşeni tersine çevirir; sonuç (−3, −4) N ve norm 5 N olur.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Sonuç: (-3; -4) N",
      );
      await expect(l.locator("[data-model-result]")).toContainText("Norm: 5 N");
      const arrow = l.locator('[data-vector="result"]');
      await expect(arrow).toHaveAttribute("data-to-x", "-3");
      await expect(arrow).toHaveAttribute("data-to-y", "-4");
      await expect(arrow).toHaveAttribute("d", "M350 200L256.25 325");
      await feedback(l);
    },
  ),
  forge015Case(
    forge015PhysicsLessons,
    "bagil-hareket",
    "forge015-physics-bagil-hareket",
    async (_p, l) => {
      await setRange(l, "Geçen zaman (s)", 4);
      await l
        .getByRole("button", { name: "Ortak hız ekle", exact: true })
        .tap();
      await l
        .getByRole("combobox", { name: "Konum referansı", exact: true })
        .selectOption("observer");
      await predict(
        l,
        "Yaklaşıyor",
        "Bağıl konum (18, 24) m, hız (−3, −4) m/s; ortak katkı farkı değiştirmez ve uzaklık azalır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "A/B hızı: (-3; -4) m/s",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "uzaklık: 30 m",
      );
      await expect(l.locator('[data-moving="a"]')).toHaveAttribute(
        "data-world-x",
        "18",
      );
      await expect(l.locator('[data-moving="a"]')).toHaveAttribute(
        "data-world-y",
        "24",
      );
      expect(
        Number(await l.locator('[data-moving="a"]').getAttribute("cx")),
      ).toBeCloseTo(381.25);
      expect(
        Number(await l.locator('[data-moving="a"]').getAttribute("cy")),
      ).toBeCloseTo(158.3333333);
      await expect(l.locator('[data-moving="b"]')).toHaveAttribute(
        "data-world-x",
        "0",
      );
      await expect(l.locator('[data-vector="relative"]')).toHaveAttribute(
        "data-from-x",
        "2",
      );
      await expect(l.locator('[data-vector="relative"]')).toHaveAttribute(
        "data-to-x",
        "-1",
      );
      await feedback(l);
    },
  ),
  forge015Case(
    forge015PhysicsLessons,
    "nehir-problemleri",
    "forge015-physics-nehir-problemleri",
    async (_p, l) => {
      await l
        .getByRole("button", { name: "Tam karşıya var", exact: true })
        .tap();
      await expect(l.locator("[data-model-result]")).toContainText(
        "Geçiş süresi: 30 s",
      );
      await l
        .getByRole("button", { name: "Akıntıyı eşitle", exact: true })
        .tap();
      await expect(l.locator("[data-crossing]")).toHaveAttribute(
        "data-crossing",
        "unavailable",
      );
      await expect(l.locator("[data-boat]")).toHaveCount(0);
      await expect(l.locator("[data-model-result]")).toContainText(
        "Tam karşıya sonlu varış yok",
      );
      await setRange(l, "Akıntı sürati (m/s)", 3);
      await l.getByRole("button", { name: "En kısa süre", exact: true }).tap();
      await setRange(l, "Geçiş ilerlemesi (%)", 100);
      await predict(
        l,
        "Aşağı akış",
        "Su hızı (0, 5), akıntı (3, 0) m/s; 24 s sonra x = 3 · 24 = 72 m aşağı akışta varır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Geçiş süresi: 24 s",
      );
      await expect(l.locator("[data-crossing]")).toHaveAttribute(
        "data-crossing",
        "arrived",
      );
      await expect(l.locator("[data-boat]")).toHaveAttribute(
        "data-world-x",
        "72",
      );
      await expect(l.locator("[data-boat]")).toHaveAttribute(
        "data-world-y",
        "120",
      );
      expect(
        Number(await l.locator("[data-boat]").getAttribute("cx")),
      ).toBeCloseTo(425.81967213);
      expect(
        Number(await l.locator("[data-boat]").getAttribute("cy")),
      ).toBeCloseTo(75);
      await expect(l.locator('[data-vector="bank"]')).toHaveAttribute(
        "data-to-x",
        "3",
      );
      await expect(l.locator('[data-vector="bank"]')).toHaveAttribute(
        "data-to-y",
        "5",
      );
      await feedback(l);
    },
  ),
];
