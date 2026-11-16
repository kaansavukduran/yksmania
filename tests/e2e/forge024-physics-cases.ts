import { expect, type Locator } from "@playwright/test";
import { forge024Case } from "./forge024-case-helper";
import { forge024PhysicsLessons } from "../../src/learning/forge024Physics";
async function number(lab: Locator, label: string, value: string) {
  await lab
    .getByRole("spinbutton", { name: label + ", sayıyla", exact: true })
    .fill(value);
}
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
    .click();
  await expect(
    lab.locator('.physics024-feedback[role="status"]'),
  ).toContainText("Tahminin koşullarla uyumlu.");
}
export const physics024Cases = [
  forge024Case(
    forge024PhysicsLessons,
    "buyuk-patlama-atomalti",
    "forge024-physics-buyuk-patlama-atomalti",
    async (_page, lab) => {
      await number(lab, "Yayım ölçeği ×100", "50");
      await number(lab, "Alım ölçeği ×100", "200");
      await lab
        .getByRole("button", { name: "G2 gözlemci", exact: true })
        .click();
      await lab
        .getByRole("combobox", { name: "Valans bileşiği", exact: true })
        .selectOption("pion");
      await compare(
        lab,
        "Artar",
        "Aynı yayımda alım ölçeği artarsa 1 + z artar; alınan dalga boyu büyür.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-redshift", "3");
      await expect(r).toHaveAttribute("data-observer", "1");
      await expect(
        lab.locator('[data-physics024-plot="quark-ledger"]'),
      ).toContainText("Yük: 1 e; B: 0");
      await expect(lab.locator("[data-galaxy]")).toHaveCount(10);
    },
  ),
  forge024Case(
    forge024PhysicsLessons,
    "radyoaktivite",
    "forge024-physics-radyoaktivite",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Verilen bozunma", exact: true })
        .selectOption("c");
      await number(lab, "Temsili yarı ömür (saat)", "3");
      await number(lab, "Geçen süre (saat)", "9");
      await compare(
        lab,
        "Artar",
        "N = N₀ · 2^(−t/T). Aynı pozitif sürede büyük T daha az yarılanma ve daha çok kalan verir.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-daughter-a", "14");
      await expect(r).toHaveAttribute("data-daughter-z", "7");
      expect(Number(await r.getAttribute("data-remaining"))).toBeCloseTo(
        1000,
        9,
      );
      await expect(lab).toContainText("Beklenen kalan: 1.000");
    },
  ),
  forge024Case(
    forge024PhysicsLessons,
    "ozel-gorelilik",
    "forge024-physics-ozel-gorelilik",
    async (_page, lab) => {
      await number(lab, "Hız β ×100", "80");
      await number(lab, "Öz süre (s)", "9");
      await number(lab, "Öz boy (m)", "12");
      await number(lab, "Durgun enerji (MeV)", "3");
      await compare(
        lab,
        "Artar",
        "β artınca γ artar. Aynı saatin öz tik aralığı sabitken S süresi γ ile büyür.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      expect(Number(await r.getAttribute("data-lab-time"))).toBeCloseTo(15, 10);
      expect(Number(await r.getAttribute("data-lab-length"))).toBeCloseTo(
        7.2,
        10,
      );
      await expect(r).toContainText("K = 2 MeV");
    },
  ),
  forge024Case(
    forge024PhysicsLessons,
    "siyah-cisim-foton",
    "forge024-physics-siyah-cisim-foton",
    async (_page, lab) => {
      await number(lab, "Seçili sıcaklık (K)", "6000");
      await number(lab, "Yüzey alanı ×100 (m²)", "200");
      await compare(
        lab,
        "Azalır",
        "Bλ tepesi λ = b/T. Sıcaklık iki kat olunca tepe yarıya iner; toplam yayım 16 kat olur.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      expect(Number(await r.getAttribute("data-peak-nm"))).toBeCloseTo(
        482.9619925,
        5,
      );
      expect(Number(await r.getAttribute("data-power-w"))).toBeCloseTo(
        2 * 5.670374419e-8 * 6000 ** 4,
        4,
      );
      await expect(
        lab.locator('[data-physics024-plot="planck"] path.physics024-primary'),
      ).toHaveCount(1);
    },
  ),
  forge024Case(
    forge024PhysicsLessons,
    "fotoelektrik-olay",
    "forge024-physics-fotoelektrik-olay",
    async (_page, lab) => {
      await number(lab, "Foton enerjisi ×10 (eV)", "50");
      await number(lab, "Foton akısı ×10¹³ (s⁻¹)", "10");
      await number(lab, "Kuantum verimi (%)", "50");
      await number(lab, "Anot gerilimi ×10 (V)", "-30");
      await compare(
        lab,
        "Artar",
        "Frekans ve η sabitken I = eηΦ. Foton akısı iki kat olursa ideal doyma akımı iki kat olur.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-max-ev", "3");
      await expect(r).toHaveAttribute("data-stopping-v", "3");
      expect(Number(await r.getAttribute("data-current-a"))).toBeCloseTo(
        8.01088317e-6,
        14,
      );
      await expect(r).toContainText("Üst enerji anotta 0 sınırında");
    },
  ),
  forge024Case(
    forge024PhysicsLessons,
    "compton-debroglie",
    "forge024-physics-compton-debroglie",
    async (_page, lab) => {
      await number(lab, "Foton saçılma açısı (°)", "180");
      await number(lab, "Elektron hızlandırma gerilimi (V)", "400");
      await compare(
        lab,
        "Artar",
        "θ, 0° ile 180° arasında artınca 1 − cosθ, 0’dan 2’ye çıkar; dalga boyu kayması 2λC’ye büyür.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      expect(Number(await r.getAttribute("data-shift-pm"))).toBeCloseTo(
        4.85262047,
        6,
      );
      expect(Number(await r.getAttribute("data-electron-kev"))).toBeGreaterThan(
        40,
      );
      await expect(r).toContainText("Göreli de Broglie λ=");
      await expect(lab.locator('[data-momentum="electron"]')).toHaveCount(1);
    },
  ),
  forge024Case(
    forge024PhysicsLessons,
    "modern-fizik-teknoloji",
    "forge024-physics-modern-fizik-teknoloji",
    async (_page, lab) => {
      await lab
        .getByRole("button", {
          name: "Satır 1, sütun 1 Düşük, μ değerini değiştir",
          exact: true,
        })
        .click();
      await lab
        .getByRole("combobox", { name: "Seçili ışın yolu", exact: true })
        .selectOption("0");
      await number(lab, "Hücre yolu ×10 (cm)", "20");
      await number(lab, "Gelen ışık dalga boyu (nm)", "1000");
      await number(lab, "Gidiş dönüş süresi (μs)", "40");
      await compare(
        lab,
        "Azalır",
        "Aynı μ ile yol L artınca toplam μL artar; exp(−ΣμL) azalır, iletim düşer.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      expect(
        Number(await r.getAttribute("data-selected-intensity")),
      ).toBeCloseTo(1000 * Math.exp(-1.4), 9);
      await expect(r).toHaveAttribute("data-band-allowed", "false");
      expect(Number(await r.getAttribute("data-echo-m"))).toBeCloseTo(
        0.0308,
        12,
      );
      await expect(lab.locator("[data-projection]")).toHaveCount(6);
      await expect(
        lab.getByRole("button", {
          name: "Satır 1, sütun 1 Orta, μ değerini değiştir",
          exact: true,
        }),
      ).toHaveAttribute("data-material", "1");
    },
  ),
];
