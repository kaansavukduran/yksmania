import { expect, type Locator } from "@playwright/test";
import { forge014PhysicsLessons } from "../../src/learning/forge014Physics";
import { forge014Case } from "./forge014-case-helper";
async function predict(l: Locator, answer: string, reason: string) {
  await l.getByRole("radio", { name: answer, exact: true }).check();
  const reasonBox = l.getByRole("textbox", {
    name: "Modelden gerekçen",
    exact: true,
  });
  await expect(reasonBox).toHaveAttribute("maxlength", "120");
  await reasonBox.fill(reason);
  await l
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .tap();
}
const feedback = (l: Locator) =>
  expect(l.locator(".physics014-feedback")).toContainText(
    "Tahminin verilen koşullarla uyumlu.",
  );
export const physics014Cases = [
  forge014Case(
    forge014PhysicsLessons,
    "kuresel-aynalar",
    "forge014-physics-kuresel-aynalar",
    async (_p, l) => {
      await l.getByRole("button", { name: "Odağa koy", exact: true }).tap();
      await expect(l.locator("svg")).toHaveAttribute(
        "data-image-kind",
        "infinity",
      );
      await expect(l.locator("[data-image-tip]")).toHaveCount(0);
      await expect(l.locator("[data-model-result]")).toContainText(
        "Sonlu görüntü yok",
      );
      await l.getByRole("button", { name: "İçeri al", exact: true }).tap();
      await predict(
        l,
        "Sanal",
        "u=5 cm odak içindedir; v=−10 cm, m=2 ve arkadaki kesik uzantılar düz büyük görüntüyü verir.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "v: -10 cm · m: 2",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "aynanın arkasında",
      );
      await expect(l.locator("[data-image-tip]")).toHaveAttribute(
        "data-world-x",
        "10",
      );
      await expect(l.locator("[data-image-tip]")).toHaveAttribute(
        "data-world-y",
        "2",
      );
      await expect(l.locator("[data-virtual-extension]")).toHaveCount(2);
      await expect(l.locator('[data-outgoing="parallel"]')).toHaveAttribute(
        "d",
        /^M350 120L/,
      );
      await feedback(l);
    },
  ),
  forge014Case(
    forge014PhysicsLessons,
    "isigin-kirilmasi",
    "forge014-physics-isigin-kirilmasi",
    async (_p, l) => {
      await l.getByRole("button", { name: "Tam yansıt", exact: true }).tap();
      await expect(l.locator("[data-snell-transmitted]")).toHaveCount(0);
      await expect(l.locator("svg")).toHaveAttribute(
        "data-snell-kind",
        "total",
      );
      await l.getByRole("button", { name: "Sınır açısı", exact: true }).tap();
      await expect(l.locator("[data-snell-transmitted]")).toHaveAttribute(
        "data-angle",
        "90",
      );
      await expect(l.locator("[data-snell-transmitted]")).toHaveAttribute(
        "d",
        /^M350 175L500 175/,
      );
      await l.getByRole("button", { name: "Dik gönder", exact: true }).tap();
      await expect(l.locator("[data-snell-transmitted]")).toHaveAttribute(
        "d",
        "M350 175L350 325",
      );
      await l.getByRole("button", { name: "Tam yansıt", exact: true }).tap();
      await predict(
        l,
        "Tam iç yansıma",
        "n₁=1,5 daha büyük; 50° kritik 41,81° üzerindedir, bu yüzden karşı tarafta ilerleyen ışın yok.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("svg")).toHaveAttribute(
        "data-snell-kind",
        "total",
      );
      await expect(l.locator("[data-snell-transmitted]")).toHaveCount(0);
      await expect(l.locator("svg")).toHaveAccessibleName(
        "Gelme 50 derece; tam iç yansıma.",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Kritik açı: 41,81°",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "f=5×10¹⁴ Hz sabittir",
      );
      await expect(l.locator("[data-snell-reflected]")).toHaveAttribute(
        "d",
        /^M350 175L464\.906/,
      );
      await feedback(l);
    },
  ),
  forge014Case(
    forge014PhysicsLessons,
    "mercekler",
    "forge014-physics-mercekler",
    async (_p, l) => {
      await l.getByRole("button", { name: "İndisi eşle", exact: true }).tap();
      await expect(l.locator("svg")).toHaveAttribute(
        "data-image-kind",
        "neutral",
      );
      await expect(l.locator("[data-image-tip]")).toHaveCount(0);
      await expect(l.locator("[data-model-result]")).toContainText(
        "optik güç sıfır",
      );
      await l.getByRole("button", { name: "Odağa koy", exact: true }).tap();
      await expect(l.locator("svg")).toHaveAttribute(
        "data-image-kind",
        "infinity",
      );
      await expect(l.locator("[data-image-tip]")).toHaveCount(0);
      await l
        .getByRole("button", { name: "Ortamı değiştir", exact: true })
        .tap();
      await predict(
        l,
        "Iraksak",
        "Aynı ince kenarlı mercekte n_m/n_o−1 negatiftir; f=−80 cm olur, sanal görüntü aynı taraftadır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "v: -21,82 cm · m: 0,73",
      );
      await expect(l.locator("[data-lens-shape]")).toHaveAttribute(
        "data-lens-shape",
        "convex",
      );
      await expect(l.locator("[data-virtual-extension]")).toHaveCount(2);
      const captionGeometry = await l.locator("svg").evaluate((svg) => {
        const object = svg
          .querySelector<SVGGraphicsElement>("[data-object-tip]")!
          .getBBox();
        const caption = svg
          .querySelector<SVGGraphicsElement>("[data-image-caption]")!
          .getBBox();
        return {
          objectBottom: object.y + object.height,
          captionTop: caption.y,
        };
      });
      expect(
        captionGeometry.captionTop - captionGeometry.objectBottom,
      ).toBeGreaterThanOrEqual(8);
      expect(
        Number(
          await l.locator("[data-image-tip]").getAttribute("data-world-x"),
        ),
      ).toBeCloseTo(-240 / 11);
      expect(
        Number(
          await l.locator("[data-image-tip]").getAttribute("data-world-y"),
        ),
      ).toBeCloseTo(8 / 11);
      await feedback(l);
    },
  ),
  forge014Case(
    forge014PhysicsLessons,
    "prizmalar-renkler",
    "forge014-physics-prizmalar-renkler",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Birinci filtre", exact: true })
        .selectOption("yellow");
      await l
        .getByRole("combobox", { name: "İkinci filtre", exact: true })
        .selectOption("blue");
      await expect(l.locator("[data-output-channel]")).toHaveCount(0);
      await l
        .getByRole("combobox", { name: "İncelenen işlem", exact: true })
        .selectOption("prism");
      await expect(l.locator("[data-model-result]")).toContainText(
        "Kırmızı sapma: 21,74° · Mor sapma: 26,44°",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "19,47° ve 18,21°",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "31,74° ve 36,44°",
      );
      expect(
        Number(
          await l
            .locator('[data-prism-outgoing="red"]')
            .getAttribute("data-deviation"),
        ),
      ).toBeCloseTo(21.7367145);
      expect(
        Number(
          await l
            .locator('[data-prism-outgoing="violet"]')
            .getAttribute("data-deviation"),
        ),
      ).toBeCloseTo(26.4364177);
      await expect(l.locator('[data-prism-outgoing="red"]')).toHaveAttribute(
        "d",
        /^M381\.146/,
      );
      await l
        .getByRole("combobox", { name: "İncelenen işlem", exact: true })
        .selectOption("surface");
      await l.getByRole("checkbox", { name: "Kırmızı", exact: true }).uncheck();
      await l.getByRole("checkbox", { name: "Yeşil", exact: true }).uncheck();
      await expect(l.locator("[data-output-channel]")).toHaveCount(0);
      await l.getByRole("checkbox", { name: "Kırmızı", exact: true }).check();
      await l.getByRole("checkbox", { name: "Yeşil", exact: true }).check();
      await l
        .getByRole("combobox", { name: "İncelenen işlem", exact: true })
        .selectOption("filters");
      await predict(
        l,
        "Yok",
        "Beyazdan sarı filtre kırmızı ve yeşili bırakır; mavi filtreyle ortak kanal kalmaz, çıkış sıfırdır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Çıkış: Işık yok",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "çıkış[0,0,0]",
      );
      await expect(l.locator("[data-input-channel]")).toHaveCount(3);
      await expect(l.locator("[data-first-channel]")).toHaveCount(2);
      await expect(l.locator("[data-output-channel]")).toHaveCount(0);
      await feedback(l);
    },
  ),
];
