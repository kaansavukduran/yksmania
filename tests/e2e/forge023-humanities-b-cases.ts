import { expect } from "@playwright/test";
import { forge023HumanitiesBLessons as lessons } from "../../src/learning/forge023HumanitiesB";
import { forge023Case } from "./forge023-case-helper";
const ids = lessons.map((l) => l.id);
export const forge023HumanitiesBCases = [
  forge023Case(
    lessons,
    ids[0],
    `forge023-humanities-b:${ids[0]}`,
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen kişi", exact: true })
        .selectOption("3");
      await lab
        .getByRole("combobox", { name: "İnceleme odağı", exact: true })
        .selectOption("0");
      const reason = lab.getByRole("textbox", {
        name: "İlişkiyi kendi cümlenle açıkla",
        exact: true,
      });
      await expect(reason).toHaveAttribute("maxlength", "128");
      const text =
        "Muaz öğretim, yönetim ve yargı alanlarında görev aldı. Bir kişinin birden fazla görevi olabilir; bu görevler olayın bütün ayrıntısını tek başına kanıtlamaz.";
      await reason.fill(text);
      await expect(reason).toHaveValue(text.slice(0, 128));
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("Kadılık");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "birden fazla görev",
      );
    },
  ),
  forge023Case(
    lessons,
    ids[1],
    `forge023-humanities-b:${ids[1]}`,
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Seçili isim", exact: true })
        .selectOption("0");
      await lab
        .getByRole("combobox", { name: "Pasajın özel vurgusu", exact: true })
        .selectOption("1");
      await lab
        .getByLabel("İlişkiyi kendi cümlenle açıkla", { exact: true })
        .fill(
          "Hayy diri oluş,Muhyî hayat vermeyi anlatır;fiilin yönü değişti.",
        );
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("Muhyî");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kanıt eksik",
      );
    },
  ),
  forge023Case(
    lessons,
    ids[2],
    `forge023-humanities-b:${ids[2]}`,
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen ekol", exact: true })
        .selectOption("4");
      await lab
        .getByRole("combobox", { name: "Alan filtresi", exact: true })
        .selectOption("1");
      await lab
        .getByLabel("İlişkiyi kendi cümlenle açıkla", { exact: true })
        .fill("Hanefilik fıkhi;itikadi filtreyle alan uyuşmaz.");
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Alan uyuşmuyor",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("fıkhi");
    },
  ),
  forge023Case(
    lessons,
    ids[3],
    `forge023-humanities-b:${ids[3]}`,
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen süreç", exact: true })
        .selectOption("2");
      await lab
        .getByRole("combobox", { name: "İncelenen aşama", exact: true })
        .selectOption("1");
      await lab
        .getByLabel("İlişkiyi kendi cümlenle açıkla", { exact: true })
        .fill("Uygulama fiilî sünnet;hüküm derecesi başka sınıflama.");
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Fiilî sünnet",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "hüküm derecesi ayrı",
      );
    },
  ),
  forge023Case(
    lessons,
    ids[4],
    `forge023-humanities-b:${ids[4]}`,
    async (_page, lab) => {
      await lab
        .getByRole("checkbox", { name: "İş gerçekten yapıldı", exact: true })
        .uncheck();
      await lab
        .getByRole("button", { name: "Bu keşfi başa al", exact: true })
        .click();
      await expect(
        lab.getByRole("combobox", { name: "Metindeki niyet", exact: true }),
      ).toHaveValue("0");
      await expect(
        lab.getByRole("checkbox", {
          name: "İş gerçekten yapıldı",
          exact: true,
        }),
      ).toBeChecked();
      await lab
        .getByRole("combobox", { name: "Metindeki niyet", exact: true })
        .selectOption("1");
      await lab
        .getByRole("checkbox", { name: "İş gerçekten yapıldı", exact: true })
        .uncheck();
      await expect(
        lab.getByRole("combobox", { name: "İşin niteliği", exact: true }),
      ).toBeDisabled();
      await lab
        .getByLabel("İlişkiyi kendi cümlenle açıkla", { exact: true })
        .fill("Gösteriş niyeti var ama tamamlanmış paylaşım yok.");
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Biten iş yok",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "geçmişten silinmez",
      );
    },
  ),
  forge023Case(
    lessons,
    ids[5],
    `forge023-humanities-b:${ids[5]}`,
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen iddia", exact: true })
        .selectOption("0");
      await lab
        .getByRole("combobox", { name: "Ek inanç cümlesi", exact: true })
        .selectOption("2");
      await lab
        .getByLabel("İlişkiyi kendi cümlenle açıkla", { exact: true })
        .fill(
          "Aynı konuşmacıya yaratıcı kabulü ve karşıt ret yükleniyor;öncüller çelişiyor.",
        );
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çelişen öncüller",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kurmaca metindeki",
      );
    },
  ),
];
