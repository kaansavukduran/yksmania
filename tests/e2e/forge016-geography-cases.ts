import { expect, type Locator } from "@playwright/test";
import { forge016GeographyLessons } from "../../src/learning/forge016Geography";
import { forge016Case, setRange } from "./forge016-case-helper";
async function predict(lab: Locator, value: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(value);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason.slice(0, 120).padEnd(120, "."));
  await lab.getByRole("button", { name: "Tahmini dene", exact: true }).click();
  await expect(lab.locator("[data-prediction-feedback]")).toContainText(
    "Seçimin kanıtla uyumlu.",
  );
}
export const geography016Cases = [
  forge016Case(
    forge016GeographyLessons,
    "cografya-kayaclar",
    "forge016-geo-cografya-kayaclar",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Kayaç yolu", exact: true })
        .selectOption("melt");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Erimiş malzeme",
      );
      await lab
        .getByRole("combobox", { name: "Kayaç yolu", exact: true })
        .selectOption("marble");
      await predict(
        lab,
        "Başkalaşım",
        "Kalker erimeden katı hâlde yeniden kristalleşiyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kalker → Mermer",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Katı hâlde değişim",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "turkiye-ic-kuvvetler",
    "forge016-geo-turkiye-ic-kuvvetler",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Bölgesel kanıt", exact: true })
        .selectOption("fold");
      await expect(lab.locator("[data-model-result]")).toContainText("sıkışma");
      await lab
        .getByRole("combobox", { name: "Bölgesel kanıt", exact: true })
        .selectOption("east");
      await predict(
        lab,
        "strike",
        "Doğu Anadolu fay örneğinde oklar üstten görünüşte yanal bileşeni gösteriyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Doğu Anadolu · Yanal kayma",
      );
      await expect(
        lab.getByText("Üstten / sol yanal örnek: oklar fay boyunca.", {
          exact: false,
        }),
      ).toBeVisible();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "kesin zaman tahmini yapılamaz",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "dis-kuvvetler-akarsular",
    "forge016-geo-dis-kuvvetler-akarsular",
    async (_page, lab) => {
      await setRange(lab, "Kesit genişliği (m)", 10);
      await setRange(lab, "Ortalama derinlik (m)", 2);
      await setRange(lab, "Ortalama hız (m/s)", 2);
      await expect(lab.locator("[data-model-result]")).toContainText("40 m³/s");
      await lab
        .getByRole("combobox", { name: "Akarsu görünümü", exact: true })
        .selectOption("meander");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Dış kıyıda oyulma",
      );
      await lab
        .getByRole("combobox", { name: "Akarsu görünümü", exact: true })
        .selectOption("delta");
      await setRange(lab, "Gelen tortu (birim)", 50);
      await setRange(lab, "Ayrılan tortu (birim)", 100);
      await predict(
        lab,
        "loss",
        "Bu ideal dönemde yüz birim ayrılıyor, elli birim geliyor; net kayıp elli.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Net tortu: -50 birim",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Negatif net",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "karstik-sekiller",
    "forge016-geo-karstik-sekiller",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Karstik şekil", exact: true })
        .selectOption("travertine");
      await lab
        .getByRole("combobox", { name: "Kayaç koşulu", exact: true })
        .selectOption("gypsum");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "aynı karbonat kanıtı sayma",
      );
      await lab
        .getByRole("combobox", { name: "Kayaç koşulu", exact: true })
        .selectOption("limestone");
      await predict(
        lab,
        "yes",
        "Kalker ve karbonatça zengin su, çökelme koşuluyla bu karbonat birikimine uygun.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kaynak suyundan çökelme",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Pamukkale",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "ruzgar-ve-buzul",
    "forge016-geo-ruzgar-ve-buzul",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Taşıyıcı ve örnek", exact: true })
        .selectOption("ice-till");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "kötü boylanmış",
      );
      await lab
        .getByRole("combobox", { name: "Taşıyıcı ve örnek", exact: true })
        .selectOption("meltwater");
      await predict(
        lab,
        "deposit",
        "Erime suyu taneleri boylayıp tabakalar hâlinde biriktiriyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Su taneleri ayırır · Birikim",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "son taşıyıcısı akarsudur",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "dalga-akinti-kiyi-tipleri",
    "forge016-geo-dalga-akinti-kiyi-tipleri",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Kıyı örneği", exact: true })
        .selectOption("fjord");
      await expect(lab.locator("[data-model-result]")).toContainText("U vadi");
      await lab
        .getByRole("combobox", { name: "Kıyı örneği", exact: true })
        .selectOption("ria");
      await lab
        .getByRole("combobox", { name: "Süreç aşaması", exact: true })
        .selectOption("after");
      await predict(
        lab,
        "flood",
        "Önce akarsu vadisi var, sonra deniz bu eski vadiyi örtüyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ria · Sonra",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "akarsu vadisine",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "turkiye-dis-kuvvetler",
    "forge016-geo-turkiye-dis-kuvvetler",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Türkiye yer kartı", exact: true })
        .selectOption("cappadocia");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Volkanik tüf",
      );
      await lab
        .getByRole("combobox", { name: "Türkiye yer kartı", exact: true })
        .selectOption("pamukkale");
      await predict(
        lab,
        "deposit",
        "Kaynak suyundaki karbonat çökelip basamaklara ekleniyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Pamukkale · Birikim",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "yerel işlemi aşındırma yapmaz",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "turkiye-yer-sekilleri",
    "forge016-geo-turkiye-yer-sekilleri",
    async (_page, lab) => {
      const input = lab.getByRole("spinbutton", {
        name: "Ek yükselti (m), sayıyla",
        exact: true,
      });
      await input.fill("");
      await input.pressSequentially("1800");
      await expect(input).toHaveValue("1800");
      await input.press("Enter");
      await expect(input).toHaveValue("1800");
      await lab
        .getByRole("combobox", { name: "Verilen rota", exact: true })
        .selectOption("B");
      await lab.getByText("Yedi noktanın verisi", { exact: true }).click();
      await expect(lab.getByRole("definition")).toHaveCount(7);
      await predict(
        lab,
        "same",
        "Her noktaya aynı bin sekiz yüz metre eklendiği için aralarındaki fark değişmiyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "1.800 m eklendi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "B: 2.700 m",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "en kısa veya en güvenli",
      );
    },
  ),
  forge016Case(
    forge016GeographyLessons,
    "dunyada-sular",
    "forge016-geo-dunyada-sular",
    async (_page, lab) => {
      await setRange(lab, "Başlangıç suyu (hm³)", 10);
      await setRange(lab, "Yağış girişi (hm³)", 0);
      await setRange(lab, "Nehir girişi (hm³)", 0);
      await setRange(lab, "Buharlaşma talebi (hm³)", 20);
      await setRange(lab, "Dış akış talebi (hm³)", 10);
      await lab
        .getByRole("combobox", { name: "Yer altı çıkış yolu", exact: true })
        .selectOption("artesian");
      await predict(
        lab,
        "short",
        "On hm³ su mevcut, otuz hm³ talep var; yirmi hm³ çıkış bu bütçede sağlanamıyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Son stok: 0 hm³",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "eksik kalan çıkış: 20 hm³",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "kendi gücüyle taşmaz",
      );
    },
  ),
];
