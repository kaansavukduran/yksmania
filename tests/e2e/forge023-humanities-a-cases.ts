import { expect } from "@playwright/test";
import { forge023Case, setRange } from "./forge023-case-helper";
import { forge023HumanitiesALessons } from "../../src/learning/forge023HumanitiesA";
const lessons = forge023HumanitiesALessons;
export const humanitiesA023Cases = [
  forge023Case(
    lessons,
    "din-ve-islam",
    "forge023-humanities-a:din-ve-islam",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Örnek odağı", exact: true })
        .selectOption("declaration");
      await l
        .getByRole("combobox", { name: "Listeden bir öğe", exact: true })
        .selectOption("zakat");
      await l
        .getByRole("combobox", { name: "Tahminin", exact: true })
        .selectOption("İkrar");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Metin inancın sözle bildirilmesi anını soruyor; zekât ise ayrı uygulama sınıfında.",
        );
      await l
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(
        l.locator(".humanities023a-feedback[role=status]"),
      ).toContainText("uyumlu");
      await expect(l.locator("[data-model-result]")).toContainText("İkrar");
      await expect(l.locator("[data-selected-term]")).toContainText("Zekât");
      await expect(l.locator("[data-selected-term]")).toContainText(
        "İslam’ın şartı",
      );
    },
  ),
  forge023Case(
    lessons,
    "islam-ve-ibadet",
    "forge023-humanities-a:islam-ve-ibadet",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Örnek eylem", exact: true })
        .selectOption("funeral");
      await l
        .getByRole("checkbox", {
          name: "Gerekli görev yeterince yapılmış",
          exact: true,
        })
        .check();
      await l
        .getByRole("combobox", { name: "Tahminin", exact: true })
        .selectOption("Farzıkifaye");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Gerekli iş yeterince yapılınca ilgili ortak sorumluluk diğerlerinden düşer.",
        );
      await l
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(
        l.locator(".humanities023a-feedback[role=status]"),
      ).toContainText("uyumlu");
      await expect(l.locator("[data-model-result]")).toContainText(
        "Farz-ı kifaye",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "öteki kişilerden düşer",
      );
      await expect(l.locator('[data-worship-evidence="0"]')).toHaveText(
        "Cenaze namazı",
      );
      await expect(l.locator('[data-worship-evidence="2"]')).toHaveText(
        "Ortak iş tamam",
      );
    },
  ),
  forge023Case(
    lessons,
    "ahlaki-tutum-ve-davranislar",
    "forge023-humanities-a:ahlaki-tutum-ve-davranislar",
    async (_p, l) => {
      await setRange(l, "A’nın ihtiyacı", 3);
      await setRange(l, "B’nin ihtiyacı", 9);
      await l
        .getByRole("combobox", { name: "Dağıtım yöntemi", exact: true })
        .selectOption("need");
      await l
        .getByRole("combobox", { name: "Tahminin", exact: true })
        .selectOption("Açık ihtiyaç kalır");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "İhtiyaç on iki saat, kaynak sekiz; A iki ve B altı saat alır, açıklar bir ve üç.",
        );
      await l
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(
        l.locator(".humanities023a-feedback[role=status]"),
      ).toContainText("uyumlu");
      await expect(l.locator("[data-model-result]")).toContainText(
        "A: 2 saat, B: 6 saat",
      );
      await expect(l.locator("[data-share-hours='2']")).toHaveAttribute(
        "width",
        String((240 * 2) / 9),
      );
      await expect(l.locator("[data-share-hours='6']")).toHaveAttribute(
        "width",
        String((240 * 6) / 9),
      );
    },
  ),
  forge023Case(
    lessons,
    "genclik-ve-degerler",
    "forge023-humanities-a:genclik-ve-degerler",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Konuşma biçimi", exact: true })
        .selectOption("social");
      await l
        .getByRole("combobox", { name: "Göreve ilişkin veri", exact: true })
        .selectOption("unknown");
      await l
        .getByRole("combobox", { name: "Tahminin", exact: true })
        .selectOption("Görev için veri yok");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Konuşkanlık verisi var; görevi yapıp yapmadığı bilinmiyor, sessizlikle de belirlenmez.",
        );
      await l
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(
        l.locator(".humanities023a-feedback[role=status]"),
      ).toContainText("uyumlu");
      await expect(l.locator("[data-model-result]")).toContainText(
        "Görev için veri yok",
      );
      await expect(l.locator("[data-youth-point]")).toHaveAttribute(
        "cx",
        "240",
      );
      await expect(l.locator("[data-youth-point]")).toHaveAttribute(
        "cy",
        "105",
      );
    },
  ),
  forge023Case(
    lessons,
    "gonul-cografyamiz",
    "forge023-humanities-a:gonul-cografyamiz",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Şehir", exact: true })
        .selectOption("agra");
      await l
        .getByRole("combobox", { name: "Gezi listesi", exact: true })
        .selectOption("west");
      await l
        .getByRole("combobox", { name: "Tahminin", exact: true })
        .selectOption("Durak listesinde yok");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Tac Mahal Agra’dadır; batı duraklarında Granada, Mostar, Kahire ve Kayrevan var.",
        );
      await l
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(
        l.locator(".humanities023a-feedback[role=status]"),
      ).toContainText("uyumlu");
      await expect(l.locator("[data-model-result]")).toContainText(
        "Tac Mahal → Agra → Hint Alt Kıtası",
      );
      await expect(
        l.locator("circle[data-place=agra][data-current=true]"),
      ).toHaveAttribute("cx", String(20 + (78.01 + 20) * 2.9));
    },
  ),
  forge023Case(
    lessons,
    "din-ve-hayat",
    "forge023-humanities-a:din-ve-hayat",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Sanat alanı", exact: true })
        .selectOption("marbling");
      await l
        .getByRole("combobox", { name: "Şema aşaması", exact: true })
        .selectOption("2");
      await setRange(l, "Gerekli su", 30);
      await setRange(l, "Geri kazanım", 25);
      await l
        .getByRole("combobox", { name: "Tahminin", exact: true })
        .selectOption("Kaybın bir bölümü geri alınıyor");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Yirmi litre kaybın dörtte biri beş litre; brüt elliden çıkarınca dış su kırk beş litre.",
        );
      await l
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(
        l.locator(".humanities023a-feedback[role=status]"),
      ).toContainText("uyumlu");
      await expect(l.locator("[data-model-result]")).toContainText(
        "Dış su 45 L; yeniden kullanım 5 L; brüt ihtiyaç 50 L",
      );
      await expect(l.locator("svg[data-art-kind=marbling]")).toHaveAttribute(
        "data-art-stage",
        "2",
      );
      await expect(l.locator("svg[data-water-fresh]")).toHaveAttribute(
        "data-water-fresh",
        "45",
      );
    },
  ),
];
