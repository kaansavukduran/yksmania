import { typeset } from "../../src/domain/typeset";
import { localizedQuestionView } from "../../src/domain/questionPresentation";
import { forge011HistoryLessons } from "../../src/learning/forge011History";
import { forge011BiologyBLessons } from "../../src/learning/forge011BiologyB";
import { forge011ChemistryLessons } from "../../src/learning/forge011Chemistry";
import { forge011BiologyALessons } from "../../src/learning/forge011BiologyA";
import { forge011PhysicsLessons } from "../../src/learning/forge011Physics";
import { forge011MathLessons } from "../../src/learning/forge011Math";
import { expect, type Locator } from "@playwright/test";
import type { LessonCase } from "./thirty-units.spec";
import { forge011TurkishLessons } from "../../src/learning/forge011Turkish";

export function nextUnit(
  id: string,
  title: string,
  exploration: string,
  interact: LessonCase["interact"],
  assertOutcome: LessonCase["assertOutcome"],
  model = "svg",
): LessonCase {
  return {
    id,
    title,
    // The page shows the typeset prompt (spacing repaired on display only).
    firstQuestion: typeset(localizedQuestionView(
      [
        ...forge011MathLessons,
        ...forge011PhysicsLessons,
        ...forge011ChemistryLessons,
        ...forge011BiologyALessons,
        ...forge011BiologyBLessons,
        ...forge011HistoryLessons,
        ...forge011TurkishLessons,
      ].find((l) => l.id === id)!.questions[0],
    ).prompt.tr),
    exploration,
    lab: `[data-forge011="${id}"]`,
    result: "[data-model-result]",
    model,
    interact,
    assertOutcome,
  };
}
export async function setRange(lab: Locator, label: string, value: number) {
  const slider = lab.getByRole("slider", { name: label, exact: true });
  const min = Number(await slider.getAttribute("min")),
    max = Number(await slider.getAttribute("max")),
    step = Number((await slider.getAttribute("step")) || 1),
    current = Number(await slider.inputValue());
  const start = [
    { at: current, key: "" },
    { at: min, key: "Home" },
    { at: max, key: "End" },
  ].sort((a, b) => Math.abs(a.at - value) - Math.abs(b.at - value))[0];
  if (start.key) await slider.press(start.key);
  for (let i = 0; i < Math.round(Math.abs(value - start.at) / step); i++)
    await slider.press(value > start.at ? "ArrowRight" : "ArrowLeft");
  await expect(slider).toHaveValue(String(value));
}
const turkish = nextUnit(
  "zarflar",
  forge011TurkishLessons[0].title.tr,
  "forge011-turkish-adverbs",
  async (_page, lab) => {
    await lab
      .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
      .tap();
    await lab
      .getByRole("button", { name: "Bağlantıyı göster", exact: true })
      .tap();
    await lab
      .getByRole("combobox", { name: "Tür tahminin", exact: true })
      .selectOption("Sıfat");
    const reason = lab.getByRole("textbox", {
      name: "Cümleden kanıtın",
      exact: true,
    });
    await expect(reason).toHaveAttribute("maxlength", "120");
    await reason.fill(
      "Sakin doğrudan çocuk adını niteler; değişen bağlantı sıfat görevini kanıtlar.",
    );
    await lab
      .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
      .tap();
  },
  async (_page, lab) => {
    await expect(lab.locator(".adverb011-sentence")).toContainText("Sakin");
    await expect(lab.locator("[data-model-result]")).toContainText("Sıfat");
    await expect(lab.locator(".adverb011-feedback")).toContainText(
      "Tür seçimin bu kullanımla uyumlu.",
    );
  },
  ".adverb011-diagram",
);

const mathTitles = new Map(forge011MathLessons.map((l) => [l.id, l.title.tr]));
function mathUnit(
  id: string,
  key: string,
  act: LessonCase["interact"],
  phrase: string,
  guess: string,
) {
  return nextUnit(
    id,
    mathTitles.get(id)!,
    key,
    async (page, lab) => {
      await act(page, lab);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption(guess);
      await lab
        .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
        .fill(
          "Başlangıç koşullarını ve değişmeyen ilişkiyi kullanıp iki sonucu karşılaştırıyorum.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(phrase);
      await expect(lab.locator(".f011m-feedback")).toContainText(
        "Tahminin bu koşullarla uyumlu.",
      );
    },
    "svg.f011m-diagram",
  );
}
const mathematics = [
  mathUnit(
    "sayi-problemleri",
    "forge011-math-seating",
    async (_p, l) => {
      await setRange(l, "Toplam sıra sayısı", 9);
    },
    "ikinci düzen 1 fazla",
    "second",
  ),
  mathUnit(
    "kesir-problemleri",
    "forge011-math-fractions",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İkinci kesrin referansı", exact: true })
        .selectOption("initial");
    },
    "Son kalan: 10 birim",
    "possible",
  ),
  mathUnit(
    "yas-problemleri",
    "forge011-math-ages",
    async (_p, l) => {
      await l
        .getByRole("button", {
          name: "A, B'nin bugünkü yaşındayken",
          exact: true,
        })
        .tap();
    },
    "A 18 yaşında.",
    "difference",
  ),
  mathUnit(
    "yuzde-problemleri",
    "forge011-math-percent",
    async (_p, l) => {
      await setRange(l, "İkinci değişim (%)", -10);
    },
    "216",
    "up",
  ),
  mathUnit(
    "kar-zarar-problemleri",
    "forge011-math-profit",
    async (_p, l) => {
      await setRange(l, "Etikete indirim (%)", 30);
    },
    "Kâr: 10 TL; maliyete göre 5%.",
    "gain",
  ),
];
const physicsTitles = new Map(
  forge011PhysicsLessons.map((l) => [l.id, l.title.tr]),
);
function physicsUnit(
  id: string,
  act: LessonCase["interact"],
  phrase: string,
  answer: string,
) {
  return nextUnit(
    id,
    physicsTitles.get(id)!,
    `forge011-physics-${id}`,
    async (page, lab) => {
      await act(page, lab);
      await lab.getByRole("radio", { name: answer, exact: true }).check();
      await lab
        .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
        .fill(
          "Modelde sabit tutulan büyüklükleri ayırıp değişen koşulun sonucunu karşılaştırdım.",
        );
      await lab
        .getByRole("button", {
          name: "Tahminimi kanıtla karşılaştır",
          exact: true,
        })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(phrase);
      await expect(lab.locator(".physics011-feedback")).toContainText(
        "Tahminin verilen koşullarla uyumlu.",
      );
    },
  );
}
const physics = [
  physicsUnit(
    "basinc",
    async (_p, l) => {
      await l
        .getByRole("spinbutton", {
          name: "Dik kuvvet (N), sayıyla",
          exact: true,
        })
        .fill("120");
    },
    "Basınç: 60.000 Pa",
    "Basınç artar",
  ),
  physicsUnit(
    "sivilarin-kaldirma-kuvveti",
    async (_p, l) => {
      await l
        .getByRole("spinbutton", {
          name: "Sıvı yoğunluğu (kg/m³), sayıyla",
          exact: true,
        })
        .fill("1200");
    },
    "Batık hacim: 0,5 L",
    "Denge kaldırma kuvveti",
  ),
  physicsUnit(
    "dalgalara-giris",
    async (_p, l) => {
      await l
        .getByRole("spinbutton", {
          name: "Kaynak frekansı (Hz), sayıyla",
          exact: true,
        })
        .fill("4");
    },
    "Dalga boyu: 2 m",
    "Yarıya iner",
  ),
  physicsUnit(
    "yay-dalgalari",
    async (_p, l) => {
      await l
        .getByRole("button", { name: "Yansımayı göster", exact: true })
        .tap();
    },
    "Yansıyan: çukur; sola",
    "Çukur ve ters yönde",
  ),
];
const bioATitles = new Map(
  forge011BiologyALessons.map((l) => [l.id, l.title.tr]),
);
function biologyAUnit(
  id: string,
  act: LessonCase["interact"],
  phrase: string,
  guess: string,
  extra?: LessonCase["assertOutcome"],
) {
  return nextUnit(
    id,
    bioATitles.get(id)!,
    `forge011:bio-a:${id}`,
    async (page, lab) => {
      await act(page, lab);
      await lab
        .getByRole("combobox", { name: "Tahminin", exact: true })
        .selectOption(guess);
      await lab
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Yapı, işlem ve koşul kanıtlarını birlikte kullanarak model sonucunu açıklıyorum.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(phrase);
      await expect(lab.locator(".f011-bio-a-feedback")).toContainText(
        "Seçimin modelle uyumlu.",
      );
      if (extra) await extra(page, lab);
    },
  );
}
const biologyA = [
  biologyAUnit(
    "virusler",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Çoğalma basamağı", exact: true })
        .selectOption("4");
    },
    "Çıkış gerçekleşti.",
    "yes",
    async (_p, l) => {
      await expect(l.locator("svg [data-new-virion]")).toHaveCount(3);
      await expect(l.locator("svg [data-host-lysis]")).toHaveCount(1);
      await expect(l.locator("svg [data-host-lysis]")).toHaveCSS(
        "fill",
        "none",
      );
      await expect(l.locator("svg [data-host-intact]")).toHaveCount(0);
    },
  ),
  biologyAUnit(
    "bakteri-ve-arke",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İşlem", exact: true })
        .selectOption("transfer");
    },
    "DNA aktarıldı; birey sayısı değişmedi.",
    "same",
    async (_p, l) => {
      await expect(l.locator("svg [data-dna-transfer]")).toHaveCount(1);
    },
  ),
  biologyAUnit(
    "protista",
    async (_p, l) => {
      await l
        .getByRole("checkbox", { name: "Işık var", exact: true })
        .uncheck();
    },
    "Seçili koşulda fotosentez gösterilmiyor.",
    "no",
  ),
  biologyAUnit(
    "bitkiler",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İletim dokusu kanıtı", exact: true })
        .selectOption("yes");
      await l
        .getByRole("combobox", { name: "Tohum kanıtı", exact: true })
        .selectOption("no");
    },
    "1 uyumlu aday",
    "yes",
    async (_p, l) => {
      await expect(l.locator("svg [data-compatible=true]")).toHaveCount(1);
    },
  ),
  biologyAUnit(
    "mantarlar",
    async (_p, l) => {
      await l
        .getByRole("button", { name: "Küçük ürünleri içeri al", exact: true })
        .tap();
    },
    "Korunan toplam: 6",
    "yes",
    async (_p, l) => {
      await expect(l.locator("svg [data-inside-product]")).toHaveCount(4);
    },
  ),
];
const chemistryTitles = new Map(
  forge011ChemistryLessons.map((l) => [l.id, l.title.tr]),
);
function chemistryUnit(
  id: string,
  act: LessonCase["interact"],
  phrase: string,
  guess: string,
  extra?: LessonCase["assertOutcome"],
) {
  return nextUnit(
    id,
    chemistryTitles.get(id)!,
    `forge011:chemistry:${id}`,
    async (page, lab) => {
      await act(page, lab);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption(guess);
      await lab
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Tanecik türü, bileşim ve verilen koşulları birlikte değerlendirerek sonucu çıkardım.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(phrase);
      await expect(lab.locator(".c011-feedback")).toContainText(
        "Sonuç seçimin modelle uyumlu.",
      );
      if (extra) await extra(page, lab);
    },
  );
}
const chemistry = [
  chemistryUnit(
    "kovalent-adlandirma-metalik-bag",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Molekül örneği", exact: true })
        .selectOption("n2o4");
    },
    "diazot tetraoksit · 6 atom",
    "diazot tetraoksit",
  ),
  chemistryUnit(
    "zayif-etkilesimler",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Birinci tanecik", exact: true })
        .selectOption("sodium");
      await l
        .getByRole("combobox", { name: "İkinci tanecik", exact: true })
        .selectOption("water");
    },
    "İyon–dipol",
    "İyon–dipol",
  ),
  chemistryUnit(
    "hidrojen-bagi",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İkinci molekül", exact: true })
        .selectOption("water");
      await l
        .getByRole("button", { name: "Seçili teması hizala", exact: true })
        .tap();
    },
    "Uygun hidrojen bağı teması",
    "Verici–alıcı çifti var",
    async (_p, l) => {
      await expect(l.locator("svg [data-hydrogen-contact]")).toHaveCount(1);
    },
  ),
  chemistryUnit(
    "fiziksel-kimyasal-degisimler",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İncelenecek süreç", exact: true })
        .selectOption("electrolysis");
      await l.getByRole("button", { name: "Sonucu göster", exact: true }).tap();
    },
    "Kimyasal değişim",
    "Kimyasal",
    async (_p, l) => {
      await expect(l.locator('svg [data-molecule="H2"]')).toHaveCount(2);
      await expect(l.locator('svg [data-molecule="O2"]')).toHaveCount(1);
    },
  ),
  chemistryUnit(
    "maddenin-halleri",
    async (_p, l) => {
      await l
        .getByRole("button", { name: "Kaynama yarısı · 1880 J", exact: true })
        .tap();
    },
    "Sıvı + gaz · 100 °C",
    "Sıvı + gaz",
  ),
];
const bioBTitles = new Map(
  forge011BiologyBLessons.map((l) => [l.id, l.title.tr]),
);
function biologyBUnit(
  id: string,
  act: LessonCase["interact"],
  phrase: string,
  guess: string,
) {
  return nextUnit(
    id,
    bioBTitles.get(id)!,
    `forge011-bio-b-${id}`,
    async (page, lab) => {
      await act(page, lab);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption(guess);
      await lab
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Seçilen yapısal kanıtı veya hücre evresini, birey ve DNA sayımıyla birlikte değerlendiriyorum.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(phrase);
      await expect(lab.locator(".bio011b-feedback")).toContainText(
        "Seçimin bu modeldeki kanıtla uyumlu.",
      );
      if (id === "mitoz" || id === "mayoz") {
        const colors = await lab
          .locator("svg [data-chromosome] > path")
          .evaluateAll((paths) => paths.map((p) => getComputedStyle(p).stroke));
        expect(colors.length).toBeGreaterThan(0);
        expect(colors).not.toContain("none");
        expect(new Set(colors).size).toBe(2);
        if (id === "mayoz") {
          await expect(lab.locator(".bio011b-spindle")).toHaveCount(0);
          const genes = await lab
            .locator('svg path[stroke-width="10"]')
            .evaluateAll((paths) =>
              paths.map((p) => getComputedStyle(p).stroke),
            );
          expect(genes).toHaveLength(8);
          expect(genes).not.toContain("none");
        }
      }
      if (id === "omurgasizlar")
        await expect(
          lab.locator('[data-specimen="octopus"] [data-octopus-arm]'),
        ).toHaveCount(8);
    },
  );
}
const biologyB = [
  biologyBUnit(
    "omurgasizlar",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "1. yapısal kanıt", exact: true })
        .selectOption("closed");
      await l
        .getByRole("combobox", { name: "2. yapısal kanıt", exact: true })
        .selectOption("mantle");
    },
    "1 uyumlu örnek",
    "one",
  ),
  biologyBUnit(
    "omurgalilar",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İncelenen omurgalı", exact: true })
        .selectOption("crocodile");
    },
    "Sürüngenler",
    "Sürüngenler",
  ),
  biologyBUnit(
    "mitoz",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İncelenen evre", exact: true })
        .selectOption("4");
    },
    "8 kromozom",
    "4C",
  ),
  biologyBUnit(
    "eseysiz-ureme",
    async (_p, l) => {
      await l
        .getByRole("combobox", {
          name: "İzlenecek çoğalma veya onarım olayı",
          exact: true,
        })
        .selectOption("repair");
      for (let i = 0; i < 3; i++)
        await l
          .getByRole("button", { name: "Sonraki adım", exact: true })
          .tap();
    },
    "Onarım; üreme değil",
    "not",
  ),
  biologyBUnit(
    "mayoz",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İncelenen evre", exact: true })
        .selectOption("5");
    },
    "2 ayrı hücre",
    "2C",
  ),
];
const historyTitles = new Map(
  forge011HistoryLessons.map((l) => [l.id, l.title.tr]),
);
function historyUnit(id: string, phrase: string, answer: string) {
  return nextUnit(
    id,
    historyTitles.get(id)!,
    `forge011-history:${id}`,
    async (_page, lab) => {
      await lab
        .getByRole("group", { name: "İncelenecek olay", exact: true })
        .getByRole("button")
        .nth(1)
        .click();
      await lab
        .getByRole("button", { name: "Sonraki bağlantı", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Sonraki bağlantı", exact: true })
        .tap();
      await lab.getByRole("radio", { name: answer, exact: true }).check();
      await lab
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Belgedeki tarih ve yetki bilgisini ayırıyorum; verilen kanıtın sınırını aşmadan yorumluyorum.",
        );
      await lab
        .getByRole("button", {
          name: "Yorumumu kanıtla karşılaştır",
          exact: true,
        })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(phrase);
      await expect(lab.locator(".h011-feedback")).toContainText(
        "Yorumun verilen kanıtla uyumlu.",
      );
    },
    "svg[data-history-diagram]",
  );
}
const history = [
  historyUnit(
    "degisim-caginda-avrupa-osmanli",
    "Kilise eleştirisi ve mezhep ayrışması Reformu gösterir.",
    "Reform",
  ),
  historyUnit(
    "devrimler-caginda-devlet-toplum",
    "1839 Tanzimat: hukuk güvenliği ve düzen ilkeleri; henüz seçimli meclis değildir.",
    "Hukuk güvenliği",
  ),
  historyUnit(
    "denge-stratejisi",
    "1833: Mehmet Ali Paşa tehdidine karşı Rus desteği ve Hünkâr İskelesi ittifakı.",
    "Değişen tehdide göre destek",
  ),
  historyUnit(
    "degisen-sosyoekonomik-hayat",
    "1854: dış borç kısa vadeli finansman ve sonraki geri ödeme yükümlülüğüdür.",
    "Finansman ve yükümlülük",
  ),
  historyUnit(
    "yirminci-yuzyil-baslarinda-osmanli",
    "1912: I. Balkan Savaşı'nda toprak kayıpları ve büyük göçler yaşanır.",
    "Toprak kaybı ve göç",
  ),
];
export const units: LessonCase[] = [
  ...mathematics,
  ...physics,
  ...biologyA,
  ...biologyB,
  ...chemistry,
  ...history,
  turkish,
];
