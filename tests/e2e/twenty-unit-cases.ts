import { expect, type Locator } from "@playwright/test";
import type { LessonCase } from "./twenty-units.spec";
const titles: Record<string, string> = {
  "kovalent-bag-polar-apolar": "Kovalent bağ: ortaklaşma ve bağ kutupluluğu",
  "molekullerde-polarlik-apolarlik":
    "Moleküllerde polarlık: geometri ve dipol dengesi",
  genlesme: "Genleşme",
  "hal-degisimi": "Hâl değişimi",
  "mutlak-deger": "Mutlak değer: uzaklıktan çözüm kümesine",
  "uslu-sayilar": "Üslü sayılar: işaret, işlem ve büyüklük",
  "hucre-zarinda-madde-alisverisleri": "Hücre zarında madde alışverişleri",
  "canlilarin-siniflandirilmasi": "Canlıların sınıflandırılması",
  "durgun-elektrik": "Durgun elektrik",
  "elektrik-akimi": "Elektrik akımı",
  "isimler-isim-tamlamasi": "İsimler ve isim tamlaması: adları ilişkilendir",
  sifatlar: "Sıfatlar: adın özelliğini ve sınırını bul",
  zamirler: "Zamirler: adı tekrarlamadan anlamı koru",
  "bilimsel-gosterim-katsayi":
    "Bilimsel gösterim ve katsayı: aynı değeri farklı ölçekte oku",
  "miknatislar-ve-manyetik-alan": "Mıknatıslar ve manyetik alan",
  "sultan-osmanli-merkez-teskilati": "Sultan ve Osmanlı Merkez Teşkilatı",
  "klasik-cag-osmanli-toplum-duzeni": "Klasik Çağda Osmanlı Toplum Düzeni",
  "degisen-dunya-dengeleri-osmanli": "Değişen Dünya Dengeleri Osmanlı",
  "koklu-sayilar": "Köklü sayılar: esas değer, alan ve güvenli dönüşüm",
  "oran-oranti": "Oran orantı: sabit olanı bul, modeli doğrula",
};
function unit(
  id: string,
  exploration: string,
  interact: LessonCase["interact"],
  assertOutcome: LessonCase["assertOutcome"],
): LessonCase {
  return {
    id,
    title: titles[id],
    lab: `[data-forge093="${id}"]`,
    result: "[data-model-result]",
    model:
      id === "isimler-isim-tamlamasi"
        ? ".turkish-structure"
        : id === "sifatlar" || id === "zamirler"
          ? ".turkish-live-sentence"
          : "svg",
    exploration,
    interact,
    assertOutcome,
  };
}
async function turkishCheck(lab: Locator, answer: string, reason: string) {
  await lab.getByRole("radio", { name: answer, exact: true }).check();
  await lab
    .getByRole("textbox", { name: "Cümleden kanıtın", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Yanıtı denetle", exact: true }).tap();
}
async function sliderTo(lab: Locator, label: string, value: number) {
  const slider = lab.getByRole("slider", { name: label, exact: true });
  const min = Number(await slider.getAttribute("min")),
    max = Number(await slider.getAttribute("max")),
    step = Number((await slider.getAttribute("step")) || 1),
    current = Number(await slider.inputValue());
  const starts = [
    { at: current, key: "" },
    { at: min, key: "Home" },
    { at: max, key: "End" },
  ].sort((a, b) => Math.abs(a.at - value) - Math.abs(b.at - value));
  const start = starts[0];
  if (start.key) await slider.press(start.key);
  const count = Math.round(Math.abs(value - start.at) / step);
  for (let i = 0; i < count; i++)
    await slider.press(value > start.at ? "ArrowRight" : "ArrowLeft");
  await expect(slider).toHaveValue(String(value));
}
async function mathCheck(lab: Locator, guess: string) {
  await lab
    .getByRole("combobox", { name: "Tahminin", exact: true })
    .selectOption(guess);
  await lab
    .getByRole("button", { name: "Gerekçeyi denetle", exact: true })
    .tap();
  await expect(lab.locator(".math093-feedback")).toContainText(
    "Tahminin bu modelde doğru.",
  );
}
async function numberTo(lab: Locator, label: string, value: number) {
  await lab
    .getByRole("spinbutton", { name: label + ", sayıyla", exact: true })
    .fill(String(value));
}
async function physicsCheck(lab: Locator, answer: string) {
  await lab.getByRole("radio", { name: answer, exact: true }).check();
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(
      "Verilen sabit koşulları koruyup modelin sayısal sonucunu ve yönünü karşılaştırıyorum.",
    );
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
  await expect(lab.locator(".forge093-physics-feedback")).toContainText(
    "Modelin gerekçesi",
  );
}
async function biologyCheck(lab: Locator, value: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(value);
  await lab
    .getByRole("textbox", { name: "Tahmininin gerekçesi", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .tap();
  await expect(lab.locator(".f093-bio-feedback")).toContainText(
    "Sonuç seçimin bu koşullarla uyumlu.",
  );
}
export const units: LessonCase[] = [
  unit(
    "kovalent-bag-polar-apolar",
    "forge093:chemistry:kovalent-bag-polar-apolar",
    async (_page, lab) => {
      await lab.getByLabel("Bağ örneği", { exact: true }).selectOption("hf");
      await lab
        .getByRole("button", { name: "Sonraki bağ adımı", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Sonraki bağ adımı", exact: true })
        .tap();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Polar kovalent",
      );
      await lab.getByLabel("Bağ örneği", { exact: true }).selectOption("n2");
      await lab
        .getByRole("button", { name: "Sonraki bağ adımı", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Sonraki bağ adımı", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.getByLabel("Bağ örneği", { exact: true })).toHaveValue(
        "n2",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("Apolar");
      await expect(lab.locator("[data-model-result]")).toContainText("6");
      await expect(lab.locator("[data-model-result]")).toContainText("4");
    },
  ),
  unit(
    "molekullerde-polarlik-apolarlik",
    "forge093:chemistry:molekullerde-polarlik-apolarlik",
    async (_page, lab) => {
      await lab
        .getByLabel("Molekül örneği", { exact: true })
        .selectOption("h2o");
      await lab
        .getByRole("button", { name: "Okları ve neti göster", exact: true })
        .tap();
      await expect(lab.locator("[data-model-result]")).toContainText("Polar");
      await expect(lab.locator("[data-net-dipole]")).toHaveCount(1);
      const headsVisible = await lab.locator("svg").evaluate((svg) => {
        const atoms = [
          ...svg.querySelectorAll<SVGCircleElement>(
            ".f093c-center,.f093c-atom",
          ),
        ];
        return [
          ...svg.querySelectorAll<SVGLineElement>("[data-bond-dipole]"),
        ].every((line) =>
          atoms.every(
            (atom) =>
              Math.hypot(
                line.x2.baseVal.value - atom.cx.baseVal.value,
                line.y2.baseVal.value - atom.cy.baseVal.value,
              ) > atom.r.baseVal.value,
          ),
        );
      });
      expect(headsVisible).toBe(true);
      const bondControl = lab.getByRole("combobox", {
        name: "İncelenecek bağ",
        exact: true,
      });
      await bondControl.selectOption("1");
      expect(
        await bondControl.evaluate((select) =>
          [...document.querySelectorAll("label")].some(
            (label) =>
              label.control === select &&
              label.textContent?.includes("İncelenecek bağ"),
          ),
        ),
      ).toBe(true);
      await lab
        .getByLabel("Molekül örneği", { exact: true })
        .selectOption("co2");
      await lab
        .getByRole("button", { name: "Okları ve neti göster", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(
        lab.getByLabel("Molekül örneği", { exact: true }),
      ).toHaveValue("co2");
      await expect(lab.locator("[data-model-result]")).toContainText("Apolar");
      await expect(lab.locator("[data-bond-dipole]")).toHaveCount(2);
      await expect(lab.locator("[data-net-dipole]")).toHaveCount(0);
    },
  ),
  unit(
    "isimler-isim-tamlamasi",
    "forge093-turkish-isimler-isim-tamlamasi",
    async (_page, lab) => {
      await lab
        .getByRole("checkbox", { name: "İlgi ekini ekle", exact: true })
        .check();
      await turkishCheck(
        lab,
        "Belirtili",
        "Okul-un tamlayan, kapı-sı tamlanandır; ilgi ve iyelik birlikte vardır.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Belirtili isim tamlaması",
      );
      await lab
        .getByRole("checkbox", { name: "İç tamlama kur", exact: true })
        .check();
      await turkishCheck(
        lab,
        "Zincirleme",
        "Bahçe kapısı iç isim tamlaması okulun unsuruna bağlanır.",
      );
    },
    async (_page, lab) => {
      await expect(
        lab.getByRole("checkbox", { name: "İç tamlama kur", exact: true }),
      ).toBeChecked();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Zincirleme isim tamlaması",
      );
    },
  ),
  unit(
    "sifatlar",
    "forge093-turkish-sifatlar",
    async (_page, lab) => {
      await lab.getByRole("button", { name: "Adı kaldır", exact: true }).tap();
      await turkishCheck(
        lab,
        "Zamir",
        "Bunu açık kitap adının yerine kullanıyorum; bu sözcüğü adı karşılar.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("Zamir");
      await lab.getByRole("button", { name: "Hızlı", exact: true }).tap();
      await lab.getByRole("button", { name: "Ada bağla", exact: true }).tap();
      await lab.getByRole("button", { name: "Fiile bağla", exact: true }).tap();
      await turkishCheck(
        lab,
        "Zarf",
        "Hızlı, tren adını değil gelme eyleminin nasıl yapıldığını anlatır.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("Zarf");
      await expect(
        lab.getByRole("radio", { name: "Zarf", exact: true }),
      ).toBeChecked();
    },
  ),
  unit(
    "zamirler",
    "forge093-turkish-zamirler",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Açık adı getir", exact: true })
        .tap();
      await turkishCheck(
        lab,
        "Sıfat",
        "Bazı açık öğrenciler adını belirtir; bu durumda adın yerine geçmez.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("Sıfat");
      await lab
        .getByRole("button", { name: "Ki’yi değiştir", exact: true })
        .tap();
      await lab.getByRole("button", { name: "Adın önü", exact: true }).tap();
      await turkishCheck(
        lab,
        "Sıfat yapan -ki",
        "Evdeki, açık defter adına bağlıdır; defter adının yerine geçmez.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sıfat yapan -ki",
      );
      await expect(
        lab.getByRole("radio", { name: "Sıfat yapan -ki", exact: true }),
      ).toBeChecked();
    },
  ),
  unit(
    "sultan-osmanli-merkez-teskilati",
    "forge093-history:sultan-osmanli-merkez-teskilati",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenecek durum", exact: true })
        .selectOption("1");
      await lab.getByRole("radio", { name: "Defterdar", exact: true }).check();
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Gelir–gider → defterdar → kalemiye",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Tahminin kanıtla uyumlu.",
      );
    },
  ),
  unit(
    "klasik-cag-osmanli-toplum-duzeni",
    "forge093-history:klasik-cag-osmanli-toplum-duzeni",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenecek durum", exact: true })
        .selectOption("1");
      await lab
        .getByRole("combobox", { name: "Karşılaştırma ekseni", exact: true })
        .selectOption("1");
      await lab
        .getByRole("radio", { name: "Gayrimüslim", exact: true })
        .check();
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Dinî aidiyet: gayrimüslim.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Tahminin kanıtla uyumlu.",
      );
    },
  ),
  unit(
    "degisen-dunya-dengeleri-osmanli",
    "forge093-history:degisen-dunya-dengeleri-osmanli",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenecek durum", exact: true })
        .selectOption("2");
      await lab
        .getByRole("radio", { name: "Toprak ve siyaset dengesi", exact: true })
        .check();
      await lab
        .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Karlofça: büyük toprak kaybı",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Tahminin kanıtla uyumlu.",
      );
    },
  ),

  unit(
    "mutlak-deger",
    "forge093-math-absolute",
    async (_page, lab) => {
      await sliderTo(lab, "Merkez a", -3);
      await sliderTo(lab, "Seçilen nokta x", -3);
      await sliderTo(lab, "Uzaklık sınırı r", 0);
      await lab
        .getByRole("combobox", { name: "Uzaklık koşulu", exact: true })
        .selectOption("outside");
      await mathCheck(lab, "no");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("0 birim");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "koşulu sağlamaz",
      );
      await expect(lab.locator(".math093-feedback")).toContainText(
        "Tahminin bu modelde doğru.",
      );
      const edges = lab.locator(".m093-edge");
      // At r=0 both endpoints coincide: one distinct open boundary remains.
      await expect(edges).toHaveCount(1);
      for (const edge of await edges.all())
        await expect(edge).not.toHaveClass(/filled/);
      const separated = await lab.locator("svg").evaluate((svg) => {
        const c = svg.querySelector<SVGCircleElement>(".m093-center")!;
        return [...svg.querySelectorAll<SVGCircleElement>(".m093-edge")].every(
          (e) =>
            Math.abs(c.cy.baseVal.value - e.cy.baseVal.value) >
            c.r.baseVal.value + e.r.baseVal.value,
        );
      });
      expect(separated).toBe(true);
    },
  ),
  unit(
    "uslu-sayilar",
    "forge093-math-exponents",
    async (_page, lab) => {
      await sliderTo(lab, "Taban", -2);
      await sliderTo(lab, "Tam sayı üs", 0);
      await lab
        .getByRole("checkbox", {
          name: "Eksi işaretini tabanın parantezine al",
          exact: true,
        })
        .uncheck();
      await mathCheck(lab, "negative");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("= -1");
      await expect(
        lab.locator("svg text").filter({ hasText: /^-1$/ }),
      ).toHaveCount(1);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "dıştaki eksi korunur",
      );
      await expect(lab.locator(".math093-feedback")).toContainText(
        "Tahminin bu modelde doğru.",
      );
    },
  ),
  unit(
    "bilimsel-gosterim-katsayi",
    "forge093-math-scientific",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Sayı örneği", exact: true })
        .selectOption("small");
      await lab
        .getByRole("button", { name: "Katsayıyı 10 ile çarp", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Katsayıyı 10 ile çarp", exact: true })
        .tap();
      await mathCheck(lab, "standard");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "7,2 × 10^4",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Standart bilimsel gösterime ulaştın.",
      );
      await expect(lab.locator(".math093-feedback")).toContainText(
        "Tahminin bu modelde doğru.",
      );
    },
  ),
  unit(
    "koklu-sayilar",
    "forge093-math-roots",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Kök modeli", exact: true })
        .selectOption("domain");
      await sliderTo(lab, "Kök içi / alan", -4);
      await mathCheck(lab, "invalid");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "gerçek sayılarda tanımsız",
      );
      await lab
        .getByRole("combobox", { name: "Kök modeli", exact: true })
        .selectOption("square");
      await sliderTo(lab, "İşaretli x", -7);
      await mathCheck(lab, "valid");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "√((-7)²)=√49=7=|-7|",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İşaretli x negatiftir",
      );
      await expect(lab.locator(".math093-feedback")).toContainText(
        "Tahminin bu modelde doğru.",
      );
    },
  ),
  unit(
    "oran-oranti",
    "forge093-math-ratio",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Orantı modeli", exact: true })
        .selectOption("inverse");
      await sliderTo(lab, "k sabiti", 12);
      await sliderTo(lab, "Seçilen x", 4);
      await mathCheck(lab, "product");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sabit çarpım x·y=12",
      );
      await lab
        .getByRole("combobox", { name: "Orantı modeli", exact: true })
        .selectOption("affine");
      await sliderTo(lab, "k sabiti", 6);
      await sliderTo(lab, "Sabit eklenen b", 3);
      await mathCheck(lab, "neither");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "x=4, y=27",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sabit fark y−6x=3",
      );
      const separatedLabels = await lab.locator("svg").evaluate((svg) => {
        const labels = [...svg.querySelectorAll<SVGTextElement>("text")];
        const tick = labels
          .find((label) => label.textContent?.trim() === "12")!
          .getBBox();
        const axis = labels
          .find((label) => label.textContent?.trim() === "x")!
          .getBBox();
        return tick.x + tick.width < axis.x;
      });
      expect(separatedLabels).toBe(true);
      await expect(lab.locator(".math093-feedback")).toContainText(
        "Tahminin bu modelde doğru.",
      );
    },
  ),

  unit(
    "genlesme",
    "forge093-physics-genlesme",
    async (_page, lab) => {
      await numberTo(lab, "Sıcaklık değişimi (°C)", 80);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ΔL = 1,92 mm",
      );
      await lab
        .getByRole("combobox", { name: /Doğrusal katsayı/ })
        .selectOption("24");
      await physicsCheck(lab, "Büyür");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ΔL = 3,84 mm",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "20,0384 mm",
      );
      await expect(lab.locator(".forge093-physics-feedback")).toContainText(
        "Modelin gerekçesi",
      );
    },
  ),
  unit(
    "hal-degisimi",
    "forge093-physics-hal-degisimi",
    async (_page, lab) => {
      await numberTo(lab, "Toplam enerji payı (%)", 50);
      await expect(lab.locator("[data-model-result]")).toContainText("100 °C");
      await numberTo(lab, "Toplam enerji payı (%)", 100);
      await physicsCheck(lab, "Hâl değişiminde sabit kalabilir");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("120 °C");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "153.750 J",
      );
      await expect(lab.locator(".forge093-physics-feedback")).toContainText(
        "Modelin gerekçesi",
      );
    },
  ),
  unit(
    "durgun-elektrik",
    "forge093-physics-durgun-elektrik",
    async (_page, lab) => {
      await numberTo(lab, "A’dan B’ye geçen elektron sayısı", 6);
      await expect(lab.locator("[data-model-result]")).toContainText("+6e");
      await numberTo(lab, "A’dan B’ye geçen elektron sayısı", 8);
      await physicsCheck(lab, "Pozitif olur");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("+8e");
      await expect(lab.locator("[data-model-result]")).toContainText("−8e");
      await expect(lab.locator("[data-model-result]")).toContainText("qA+qB=0");
    },
  ),
  unit(
    "elektrik-akimi",
    "forge093-physics-elektrik-akimi",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Dirençlerin bağlantısı", exact: true })
        .selectOption("parallel");
      await expect(lab.locator("[data-model-result]")).toContainText("6 A");
      await numberTo(lab, "Kaynak gerilimi (V)", 24);
      await physicsCheck(lab, "Seride akım, paralelde gerilim");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("12 A");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kaynak gücü = 288 W",
      );
      await expect(lab.locator(".forge093-physics-feedback")).toContainText(
        "Modelin gerekçesi",
      );
    },
  ),
  unit(
    "miknatislar-ve-manyetik-alan",
    "forge093-physics-miknatislar-ve-manyetik-alan",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Akım geçen tel", exact: true })
        .tap();
      await numberTo(lab, "Tel akımı (A)", 8);
      await expect(lab.locator("[data-model-result]")).toContainText("40 μT");
      await numberTo(lab, "Tele dik uzaklık (cm)", 8);
      await physicsCheck(lab, "Yön tersine döner");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("20 μT");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "saat yönünün tersi",
      );
      await expect(lab.locator(".forge093-physics-feedback")).toContainText(
        "Modelin gerekçesi",
      );
    },
  ),

  unit(
    "hucre-zarinda-madde-alisverisleri",
    "forge093-membrane",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İzlenen madde", exact: true })
        .selectOption("sodium");
      await lab
        .getByRole("combobox", { name: "Taşıma düzeni", exact: true })
        .selectOption("active");
      await lab
        .getByRole("checkbox", {
          name: "Uygun taşıma proteini mevcut",
          exact: true,
        })
        .uncheck();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Uygun pompa proteini yok",
      );
      await expect(lab.locator(".f093-bio-channel")).toHaveCount(0);
      await lab
        .getByRole("checkbox", {
          name: "Uygun taşıma proteini mevcut",
          exact: true,
        })
        .check();
      await expect(lab.locator(".f093-bio-channel")).toHaveCount(1);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Hücreden dışarı",
      );
      await lab
        .getByRole("checkbox", { name: "ATP kaynağı açık", exact: true })
        .uncheck();
      await biologyCheck(
        lab,
        "none",
        "Protein var ama ATP kapalı; seçili aktif pompa bu koşulda net madde taşıyamaz.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Net geçiş yok",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("ATP");
      await expect(lab.locator(".f093-bio-channel")).toHaveCount(1);
      await expect(lab.locator(".f093-bio-feedback")).toContainText(
        "Sonuç seçimin bu koşullarla uyumlu.",
      );
    },
  ),
  unit(
    "canlilarin-siniflandirilmasi",
    "forge093-classification",
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yalnız ökaryot hücre bilgisiyle yakın çift seçilemez.",
      );
      await lab
        .getByRole("combobox", { name: "Ağaç için kanıt paketi", exact: true })
        .selectOption("structure");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "grubun iç sırası",
      );
      await lab
        .getByRole("combobox", { name: "Ağaç için kanıt paketi", exact: true })
        .selectOption("dna");
      await biologyCheck(
        lab,
        "sister",
        "Bu öğretim veri paketinde kertenkele–güvercin bir konumda, kediyle karşılaştırmalar iki konumda farklıdır.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "kertenkele–güvercin yakınlığını destekler.",
      );
      await expect(lab.locator(".f093-bio-tree-lines path")).toHaveCount(8);
      await expect(lab.locator(".f093-bio-feedback")).toContainText(
        "Sonuç seçimin bu koşullarla uyumlu.",
      );
    },
  ),
];
