import { expect, type Locator } from "@playwright/test";
import { forge021Case, setRange } from "./forge021-case-helper";
import { forge021BiologyALessons } from "../../src/learning/forge021BiologyA";
const key = (id: string) => `forge021:biology-a:${id}`;
async function compare(lab: Locator, answer: string, reason: string) {
  await lab.getByRole("button", { name: answer, exact: true }).click();
  await lab
    .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator('.ba021-feedback[role="status"]')).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
export const biologyA021Cases = [
  forge021Case(
    forge021BiologyALessons,
    "ayt-kodon-antikodon",
    key("ayt-kodon-antikodon"),
    async (_, lab) => {
      await lab
        .locator("fieldset")
        .filter({ hasText: "İlk baz" })
        .getByRole("button", { name: "U", exact: true })
        .click();
      await lab
        .locator("fieldset")
        .filter({ hasText: "İkinci baz" })
        .getByRole("button", { name: "G", exact: true })
        .click();
      await compare(
        lab,
        "Amino asit",
        "UGG triptofan kodonu; hizalı anti 3′ACC5′, diğer yönde 5′CCA3′.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Triptofan (Trp)",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "3′ ACC 5′",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "5′ CCA 3′",
      );
      await expect(lab.locator("[data-codon]")).toHaveAttribute(
        "data-codon",
        "UGG",
      );
      await expect(lab.locator("[data-anticodon]")).toHaveAttribute(
        "data-anticodon",
        "ACC",
      );
    },
  ),
  forge021Case(
    forge021BiologyALessons,
    "ayt-protein-sentezi",
    key("ayt-protein-sentezi"),
    async (_, lab) => {
      await lab
        .getByRole("button", { name: "Erken duruş", exact: true })
        .click();
      await setRange(lab, "Okuma adımı", 2);
      await compare(
        lab,
        "Zincir serbest",
        "İlk AUG Met ekletir, sonraki UAG duruştur; arkadaki GGC bu ilk ürüne eklenmez.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kalıntı: 1; peptit bağı: 0",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "bölgesi 6 bazdır",
      );
      await expect(lab.locator("[data-peptide-length]")).toHaveAttribute(
        "data-peptide-length",
        "1",
      );
      await expect(lab.locator("[data-released]")).toHaveAttribute(
        "data-released",
        "true",
      );
    },
  ),
  forge021Case(
    forge021BiologyALessons,
    "ayt-biyoteknoloji",
    key("ayt-biyoteknoloji"),
    async (_, lab) => {
      await setRange(lab, "İlk hedef", 0);
      await setRange(lab, "Dış hedef", 1);
      await setRange(lab, "Döngü", 4);
      await compare(
        lab,
        "Yeni hedef artar",
        "Başta hedefsiz kaba bir hedef bulaşınca dört ideal döngüde 16 olur; kontrol temiz değildir.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "son hedef: 16; yeni kopya: 15",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "kontrol dış hedefle kirlenmiş",
      );
      await expect(lab.locator("[data-pcr-target]")).toHaveAttribute(
        "data-pcr-target",
        "16",
      );
      await expect(lab.locator("[data-pcr-new]")).toHaveAttribute(
        "data-pcr-new",
        "15",
      );
    },
  ),
  forge021Case(
    forge021BiologyALessons,
    "ayt-fotosentez-genel",
    key("ayt-fotosentez-genel"),
    async (_, lab) => {
      await setRange(lab, "Heksoz (mol eşdeğer)", 2);
      await lab
        .getByRole("button", { name: "Su oksijeni", exact: true })
        .click();
      await compare(
        lab,
        "Gaz O₂ işaretli",
        "İki heksoz eşdeğeri 12 mol O₂ verir; su O etiketi bu gazdaki 24 mol O atomuna geçer.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "O₂ çıktısı 12 mol",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "işaretli O atomu 24 mol",
      );
      await expect(lab.locator("[data-photo-o2]")).toHaveAttribute(
        "data-photo-o2",
        "12",
      );
      await expect(lab.locator("[data-labeled-o]")).toHaveAttribute(
        "data-labeled-o",
        "24",
      );
      await expect(lab.locator("[data-labeled-c]")).toHaveAttribute(
        "data-labeled-c",
        "0",
      );
    },
  ),
  forge021Case(
    forge021BiologyALessons,
    "ayt-fotosentez-tepkimeler",
    key("ayt-fotosentez-tepkimeler"),
    async (_, lab) => {
      await setRange(lab, "ATP (mol)", 9);
      await compare(
        lab,
        "Bir tam paket",
        "CO₂ iki, ATP bir, NADPH iki pakete yeter. Bir net PGAL çıkar; ATP sınırlıdır.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Biten paket 1; net PGAL 1 mol",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kalan: CO₂ 3 mol, ATP 0 mol, NADPH 6 mol",
      );
      await expect(lab.locator("[data-calvin-net]")).toHaveAttribute(
        "data-calvin-net",
        "1",
      );
      await expect(lab.locator("[data-calvin-atp]")).toHaveAttribute(
        "data-calvin-atp",
        "9",
      );
    },
  ),
];
