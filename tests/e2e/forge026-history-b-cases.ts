import { expect, type Locator } from "@playwright/test";
import { forge026Case } from "./forge026-case-helper";
import { historyNarratives } from "../../src/learning/narratives/history";
import { islamNarratives } from "../../src/learning/narratives/historyIslam";
import { seljukNarrative } from "../../src/learning/narratives/seljuk";
import { narrativeLesson } from "../../src/learning/narratives/types";
import { foundation013QuestionsByLesson } from "../../src/learning/forge013FoundationQuestions";

const ids = [
  "ortacag-dunya",
  "ilk-turk-dunyasi",
  "islam-medeniyetinin-dogusu",
  "turklerin-islamiyeti-kabulu",
  "selcuklu-yerlesme-devletlesme",
];
const legacy = ids.map((id) => {
  const p = [...historyNarratives, ...islamNarratives, seljukNarrative].find(
    (p) => p.id === id,
  )!;
  return {
    ...narrativeLesson(p),
    questions: foundation013QuestionsByLesson[id],
  };
});
const pick = (lab: Locator, label: string, value: string) =>
  lab.getByRole("combobox", { name: label, exact: true }).selectOption(value);
const number = (lab: Locator, label: string, value: number) =>
  lab.getByRole("spinbutton", { name: label, exact: true }).fill(String(value));
const check = (lab: Locator, label: string, value: boolean) =>
  lab.getByRole("checkbox", { name: label, exact: true }).setChecked(value);
async function compare(lab: Locator, guess: string, reason: string) {
  await pick(lab, "Sonuç tahminin", guess);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".historyb026-feedback")).toContainText(
    "Tahminin model sonucuyla uyumlu.",
  );
}

export const historyB026Cases = [
  forge026Case(
    legacy,
    ids[0],
    "forge026-history-b:" + ids[0],
    async (_, lab) => {
      await pick(lab, "Vergiyi kim toplar?", "central");
      await pick(lab, "Sefer emri kimden?", "local");
      await check(lab, "Merkez görevden alabilir", true);
      await compare(
        lab,
        "karma",
        "Vergi merkeze gider; sefer emri yereldedir. İki yetki farklı ellerdedir.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("svg [data-authority-edge]")).toHaveCount(3);
      await expect(
        lab.locator('svg [data-authority-edge="vergi"]'),
      ).toHaveAttribute("data-from", "toplum");
      await expect(
        lab.locator('svg [data-authority-edge="vergi"]'),
      ).toHaveAttribute("data-to", "merkez");
      await expect(
        lab.locator('svg [data-authority-edge="emir"]'),
      ).toHaveAttribute("data-from", "yerel");
      await expect(
        lab.locator('svg [data-authority-edge="denetim"]'),
      ).toHaveCount(1);
      await expect(lab.locator("[data-authority-result]")).toHaveAttribute(
        "data-code",
        "karma",
      );
      await expect(lab.locator(".historyb026-feedback")).toContainText(
        "Yetkiler farklı ellerde",
      );
    },
  ),
  forge026Case(
    legacy,
    ids[1],
    "forge026-history-b:" + ids[1],
    async (_, lab) => {
      await pick(lab, "Kaynak paketi", "uretim");
      await pick(lab, "İddia", "0");
      await check(lab, "1. kaydı seç", true);
      await check(lab, "2. kaydı seç", false);
      await check(lab, "3. kaydı seç", false);
      await compare(
        lab,
        "yetersiz",
        "Yalnız tarım kaydı var; aynı yerleşimdeki zanaat için atölye kaydı da gerekir.",
      );
      await check(lab, "2. kaydı seç", true);
      await expect(lab.locator(".historyb026-feedback")).toHaveCount(0);
      await compare(
        lab,
        "destek",
        "Tarım ve atölye kayıtları birlikte seçili; belirtilen yerleşimde iki faaliyet desteklenir.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("svg [data-source]")).toHaveCount(3);
      await expect(lab.locator('svg [data-source="0"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator('svg [data-source="1"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator('svg [data-source="2"]')).toHaveAttribute(
        "data-selected",
        "false",
      );
      await expect(lab.locator("[data-source-count]")).toContainText("2");
      await expect(lab.locator(".historyb026-feedback")).toContainText(
        "Kanıt destekler",
      );
    },
  ),
  forge026Case(
    legacy,
    ids[2],
    "forge026-history-b:" + ids[2],
    async (_, lab) => {
      await number(lab, "İlk yıl", 750);
      await number(lab, "Son yıl", 1031);
      await check(lab, "Endülüs de göster", false);
      await expect(lab.locator("svg [data-history-event]")).toHaveCount(1);
      await check(lab, "Endülüs de göster", true);
      await compare(
        lab,
        "4",
        "Sınırlar dahil 750,756,929,1031 seçilir. Şam ve Endülüs siyasi dönemleri aynı satır değildir.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("svg [data-history-event]")).toHaveCount(4);
      for (const year of [750, 756, 929, 1031])
        await expect(
          lab.locator('svg [data-history-event="' + year + '"]'),
        ).toHaveCount(1);
      await expect(lab.locator("svg [data-history-period]")).toHaveCount(3);
      await expect(
        lab.locator('svg [data-history-period="sam-emevi"]'),
      ).toHaveAttribute("data-from", "750");
      await expect(
        lab.locator('svg [data-history-period="sam-emevi"]'),
      ).toHaveAttribute("data-to", "750");
      await expect(lab.locator("[data-history-count]")).toContainText("4");
      await expect(lab.locator(".historyb026-feedback")).toContainText(
        "Sonuç: 4",
      );
    },
  ),
  forge026Case(
    legacy,
    ids[3],
    "forge026-history-b:" + ids[3],
    async (_, lab) => {
      await check(lab, "Hükümdar kaydı", true);
      await check(lab, "Resmî karar", true);
      await check(lab, "Yerel uygulama", true);
      await pick(lab, "İddia", "herkes");
      await compare(
        lab,
        "yetersiz",
        "Hükümdar, karar ve belirtilen köyler var; bütün nüfusun aynı günkü tercihi kayıtlı değil.",
      );
    },
    async (_, lab) => {
      await expect(
        lab.locator('svg [data-conversion-record][data-selected="true"]'),
      ).toHaveCount(3);
      await expect(lab.locator("[data-conversion-supported]")).toHaveAttribute(
        "data-conversion-supported",
        "false",
      );
      await expect(lab.locator(".historyb026-feedback")).toContainText(
        "Kanıt yetmez",
      );
    },
  ),
  forge026Case(
    legacy,
    ids[4],
    "forge026-history-b:" + ids[4],
    async (_, lab) => {
      await check(lab, "Kervansaray", false);
      await check(lab, "Medrese", false);
      await check(lab, "Darüşşifa", true);
      await pick(lab, "İddia", "saglik");
      await check(lab, "Gelir bağı kaydı var", false);
      await compare(
        lab,
        "yetersiz",
        "Sağlık hizmeti kaydı var, fakat iddianın istediği gelir bağı henüz seçili değil.",
      );
      await check(lab, "Gelir bağı kaydı var", true);
      await expect(lab.locator(".historyb026-feedback")).toHaveCount(0);
      await compare(
        lab,
        "destek",
        "Darüşşifa hizmeti ile ona gelir ayrıldığını belirten bağ birlikte seçili.",
      );
    },
    async (_, lab) => {
      await expect(
        lab.locator('svg [data-service][data-selected="true"]'),
      ).toHaveCount(1);
      await expect(lab.locator('svg [data-service="saglik"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator('svg [data-income-link="saglik"]')).toHaveCount(
        1,
      );
      await expect(lab.locator("svg [data-income-link]")).toHaveCount(1);
      await expect(lab.locator("[data-service-count]")).toContainText("1");
      await expect(lab.locator("[data-income-link-count]")).toContainText("1");
      await expect(lab.locator(".historyb026-feedback")).toContainText(
        "Kanıt destekler",
      );
    },
  ),
];
