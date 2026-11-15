import { expect, type Locator } from "@playwright/test";
import { forge012PhysicsLessons } from "../../src/learning/forge012Physics";
import { forge012Case, setRange } from "./forge012-case-helper";
async function predict(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .tap();
}
const feedback = (l: Locator) =>
  expect(l.locator(".physics012-feedback")).toContainText(
    "Tahminin verilen koşullarla uyumlu.",
  );
export const physics012Cases = [
  forge012Case(
    forge012PhysicsLessons,
    "su-dalgalari",
    "forge012-physics-su-dalgalari",
    async (_p, l) => {
      await setRange(l, "İkinci bölge sürati (cm/s)", 45);
      await predict(
        l,
        "Daha büyük",
        "Kaynak 3 Hz kalırken 45/3=15 cm olur; ikinci sürat ve dalga boyu daha büyüktür.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Birinci λ: 10 cm · İkinci λ: 15 cm",
      );
      await expect(l.locator("[data-model-result]")).toContainText("48,59°");
      await expect(l.locator('[data-water-ray="transmitted"]')).toHaveAttribute(
        "d",
        /^M300 170L393\.75 /,
      );
      await expect(l.locator('[data-water-front="transmitted"]')).toHaveCount(
        24,
      );
      await feedback(l);
    },
  ),
  forge012Case(
    forge012PhysicsLessons,
    "ses-deprem-dalgalari",
    "forge012-physics-ses-deprem-dalgalari",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İncelenen düzenek", exact: true })
        .selectOption("quake");
      await setRange(l, "Deprem dalgası yolu (km)", 180);
      await predict(
        l,
        "P dalgası",
        "Aynı 180 km yolda P için 180/6=30 s, S için 180/3=60 s; fark 30 s olur.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "P: 30 s · S: 60 s · Fark: 30 s",
      );
      await expect(l.locator('[data-seismic-time="p"]')).toHaveAttribute(
        "d",
        "M80 210V168H220V210",
      );
      await expect(l.locator('[data-seismic-time="s"]')).toHaveAttribute(
        "d",
        "M340 210V126H480V210",
      );
      await feedback(l);
    },
  ),
  forge012Case(
    forge012PhysicsLessons,
    "isik-bilgisi",
    "forge012-physics-isik-bilgisi",
    async (_p, l) => {
      await setRange(l, "Kaynağa uzaklık (m)", 4);
      await setRange(l, "Yüzey normalinin açısı (°)", 60);
      await predict(
        l,
        "Daha az",
        "120/16=7,5 lx dik katkı; cos60=0,5 ile seçili yüzey 3,75 lx alır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Aydınlanma: 3,75 lx",
      );
      await expect(
        l.locator("[data-surface-normal]").locator(".."),
      ).toHaveAttribute("transform", "translate(320 150)rotate(60)");
      expect(
        Number(await l.locator("[data-lux-fill]").getAttribute("width")),
      ).toBeCloseTo(4.125);
      await feedback(l);
    },
  ),
  forge012Case(
    forge012PhysicsLessons,
    "golge-yari-golge",
    "forge012-physics-golge-yari-golge",
    async (_p, l) => {
      await setRange(l, "Kaynaklar arası uzaklık (cm)", 80);
      await predict(
        l,
        "Yok",
        "İki gölge aralığı ayrılır; ortak kesişim kalmaz, iki yarı gölge bandı sürer.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Tam gölge: 0 cm · Yarı gölge toplamı: 200 cm",
      );
      await expect(l.locator('[data-shadow-region="full"]')).toHaveCount(0);
      await expect(l.locator('[data-shadow-region="partial"]')).toHaveCount(2);
      await expect(
        l.locator('[data-shadow-source="0"] circle'),
      ).toHaveAttribute("cy", "160");
      await feedback(l);
    },
  ),
  forge012Case(
    forge012PhysicsLessons,
    "duzlem-ayna",
    "forge012-physics-duzlem-ayna",
    async (_p, l) => {
      await setRange(l, "Aynanın yer koordinatı (cm)", 5);
      await setRange(l, "Normalden gelme açısı (°)", 45);
      await predict(
        l,
        "İki katı",
        "Ayna 5 cm, cisim −40 cm; görüntü 50 cm konumunda. İki tarafta 45 cm, toplam 90 cm.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Cisim-aynaya: 45 cm · Görüntü-aynaya: 45 cm",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "aralığı 90 cm",
      );
      await expect(l.locator("[data-mirror-surface]")).toHaveAttribute(
        "x1",
        "310",
      );
      await expect(l.locator("[data-image-arrow]")).toHaveAttribute(
        "d",
        /^M400 155V65/,
      );
      await expect(l.locator("[data-reflected-ray]")).toHaveAttribute(
        "d",
        "M390 305L350 345",
      );
      await feedback(l);
    },
  ),
];
