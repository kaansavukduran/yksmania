import { expect } from "@playwright/test";
import { forge012HistoryLessons } from "../../src/learning/forge012History";
import { forge012Case } from "./forge012-case-helper";
const rows = [
  {
    id: "milli-mucadele",
    event: "1",
    name: "Sivas Kongresi",
    choice: "Ulusal örgütlenme",
    outcome: "Ortak yönetim millî hareketin bütününe yayılır.",
  },
  {
    id: "ataturkculuk-inkilap",
    event: "1",
    name: "Medeni Kanun",
    choice: "Medeni haklar",
    outcome: "Medeni haklar ve hukuk birliği hedeflenir.",
  },
  {
    id: "iki-savas-arasi-turkiye-dunya",
    event: "4",
    name: "Montrö",
    choice: "Savunma yetkisi güçlenir",
    outcome: "Komisyon kalkar; savunma yetkisi ve geçiş kuralları düzenlenir.",
  },
  {
    id: "kuresel-savaslar-arasinda-turkiye-dunya",
    event: "2",
    name: "Dünya Ekonomik Bunalımı",
    choice: "Kredi ve üretim bağlantısı",
    outcome: "İş kaybı gelir ve tüketimi düşürebilir.",
  },
  {
    id: "ikinci-dunya-savasi-sonrasi",
    event: "4",
    name: "Türkiye’nin savaş ilanı",
    choice: "İlan ile fiilî muharebe farklıdır",
    outcome: "Türkiye kurucu üyeler arasında yer alır.",
  },
];
export const history012Cases = rows.map((r) =>
  forge012Case(
    forge012HistoryLessons,
    r.id,
    `forge012-history:${r.id}`,
    async (_page, lab) => {
      await lab
        .getByRole("group", { name: "İncelenecek olay", exact: true })
        .getByRole("button")
        .nth(Number(r.event))
        .click();
      await lab
        .getByRole("button", { name: "Sonraki kanıt", exact: true })
        .click();
      await lab
        .getByRole("button", { name: "Sonraki kanıt", exact: true })
        .click();
      await lab.getByRole("radio", { name: r.choice, exact: true }).check();
      await lab
        .getByRole("textbox", { name: "Kanıttan gerekçen", exact: true })
        .fill("Tarih, aktör ve kararın kapsamını birlikte karşılaştırdım.");
      await lab
        .getByRole("button", {
          name: "Yorumumu kanıtla karşılaştır",
          exact: true,
        })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(r.outcome);
      await expect(
        lab.locator(`[data-history012-selected="${r.name}"]`),
      ).toHaveCount(1);
      await expect(lab.locator("[data-history012-stage]")).toHaveCount(3);
      await expect(lab.locator("[data-history012-link]")).toHaveCount(2);
      await expect(lab.locator(".h012-feedback")).toContainText(
        "Yorumun verilen kanıtla uyumlu.",
      );
      await expect(
        lab.getByRole("textbox", { name: "Kanıttan gerekçen", exact: true }),
      ).toHaveValue(
        "Tarih, aktör ve kararın kapsamını birlikte karşılaştırdım.",
      );
    },
  ),
);
