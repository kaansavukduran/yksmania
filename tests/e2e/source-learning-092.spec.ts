import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul", hasTouch: true });

async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}

async function stored(page: Page): Promise<AppState | undefined> {
  return page.evaluate(
    () =>
      new Promise<AppState | undefined>((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onsuccess = () => {
          const db = request.result;
          const record = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          record.onsuccess = () => {
            db.close();
            resolve(record.result);
          };
          record.onerror = () => reject(record.error);
        };
        request.onerror = () => reject(request.error);
      }),
  );
}

function learningEvidence(state: AppState | undefined) {
  return {
    sessions: state?.sessions ?? [],
    reviews: state?.reviews ?? [],
    theoryReviewCompletions: state?.theoryReviewCompletions ?? [],
    topicProgress: state?.topicProgress ?? {},
    unlocked: state?.unlocked ?? [],
  };
}

async function offlineReady(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          {
            once: true,
          },
        ),
      );
  });
}

type LessonCase = {
  id: string;
  title: string;
  lab: string;
  result: string;
  exploration: string;
  interact: (page: Page, lab: Locator) => Promise<void>;
  assertOutcome: (page: Page, lab: Locator) => Promise<void>;
};

async function openFromCourses(page: Page, lesson: LessonCase) {
  await nav(page, "Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(lesson.title);
  await page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`).click();
  await expect(page.locator(".study-title h1")).toHaveText(lesson.title);
  await expect(page.locator(lesson.lab)).toBeVisible();
  await expect(page.locator(".guide-section")).not.toHaveCount(0);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.locator(".question-panel")).toHaveCount(0);
}

async function saveNote(page: Page, lesson: LessonCase) {
  const note = `Kendi açıklamam (${lesson.id}): sonucu başlangıç koşullarıyla karşılaştırırım.`;
  await page
    .locator(".study-notes")
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill(note);
  await expect
    .poll(async () => (await stored(page))?.notes[`lesson:${lesson.id}`])
    .toBe(note);
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  return note;
}

async function readableGeometry(page: Page, lesson: LessonCase) {
  // Bounds, scroll sizes and fonts come from the same rendered frame.
  const geometry = await page
    .locator(lesson.lab)
    .evaluate((lab, resultSelector) => {
      const bounds = lab.getBoundingClientRect();
      const style = getComputedStyle(lab);
      const result = lab.querySelector<HTMLElement>(resultSelector)!;
      const article = document
        .querySelector(".lesson-article")!
        .getBoundingClientRect();
      const notes = document
        .querySelector(".study-notes")!
        .getBoundingClientRect();
      const controls = [
        ...lab.querySelectorAll<HTMLElement>("button,input,select,textarea"),
      ]
        .map((control) => {
          const target = control.matches(
            'input[type="radio"],input[type="checkbox"]',
          )
            ? (control.closest("label") ?? control)
            : control;
          const rect = target.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height,
          };
        })
        .filter((rect) => rect.width > 0 && rect.height > 0);
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        rootFont: getComputedStyle(document.documentElement).fontSize,
        textScale: getComputedStyle(document.documentElement)
          .getPropertyValue("--text-scale")
          .trim(),
        left: bounds.left,
        right: bounds.right,
        clientWidth: lab.clientWidth,
        scrollWidth: lab.scrollWidth,
        readingWidth:
          lab.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight),
        resultIsHtml:
          result.namespaceURI === "http://www.w3.org/1999/xhtml" &&
          !result.closest("svg"),
        resultText: result.textContent?.trim(),
        resultFont: parseFloat(getComputedStyle(result).fontSize),
        articleBottom: article.bottom,
        noteTop: notes.top,
        controls,
      };
    }, lesson.result);
  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewport + 1);
  expect(geometry.left).toBeGreaterThanOrEqual(0);
  expect(geometry.right).toBeLessThanOrEqual(geometry.viewport + 1);
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
  expect(geometry.rootFont).toBe("32px");
  expect(geometry.textScale).toBe("1.5");
  expect(geometry.readingWidth).toBeGreaterThanOrEqual(220);
  expect(geometry.resultIsHtml).toBe(true);
  expect(geometry.resultText!.length).toBeGreaterThan(20);
  expect(geometry.resultFont).toBeGreaterThanOrEqual(24);
  expect(geometry.noteTop).toBeGreaterThanOrEqual(geometry.articleBottom);
  expect(geometry.controls.length).toBeGreaterThan(0);
  for (const control of geometry.controls) {
    expect(control.left).toBeGreaterThanOrEqual(geometry.left - 1);
    expect(control.right).toBeLessThanOrEqual(geometry.right + 1);
    expect(control.width).toBeGreaterThanOrEqual(24);
    expect(control.height).toBeGreaterThanOrEqual(24);
  }
}

const lessons: LessonCase[] = [
  {
    id: "nukleik-asitler",
    title: "Nükleik asitler: DNA ve RNA’yı kur ve karşılaştır",
    lab: ".nucleic-lab",
    result: ".nucleic-result",
    exploration: "nucleic-acids",
    async interact(_page, lab) {
      await lab
        .getByRole("checkbox", { name: "Fosfatı ekle", exact: true })
        .uncheck();
      await expect(lab.locator(".nucleic-result")).toContainText("Nükleozit");
      await lab
        .getByRole("checkbox", { name: "Fosfatı ekle", exact: true })
        .check();
      await expect(lab.locator(".nucleic-result")).toContainText("Nükleotit");
      await lab
        .getByRole("button", { name: "Zincirleri karşılaştır", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Seçili bazı G yap", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Bağları ve hesabı göster", exact: true })
        .tap();
      await expect(lab.locator(".nucleic-result > strong")).toHaveText(
        "16 hidrojen bağı",
      );
      await expect(lab.locator('line[data-bond="hydrogen"]')).toHaveCount(16);
      await lab
        .getByRole("textbox", {
          name: "Beklediğin toplam hidrojen bağı",
          exact: true,
        })
        .fill("15");
      await lab
        .getByRole("textbox", { name: "Hesabının gerekçesi", exact: true })
        .fill("İki A–T çifti 4 ve dört G–C çifti 12 bağ yapar; toplam 16.");
      await lab
        .getByRole("button", { name: "Hesabımı denetle", exact: true })
        .tap();
      await expect(lab.locator(".nucleic-result")).toContainText(
        "Tahminin 15; doğru bağ hesabı 16.",
      );
      await lab
        .getByRole("textbox", {
          name: "Beklediğin toplam hidrojen bağı",
          exact: true,
        })
        .fill("16");
      await lab
        .getByRole("button", { name: "Hesabımı denetle", exact: true })
        .tap();
      await expect(lab.locator(".nucleic-result")).toContainText(
        "Tahminin bu modelin hesabıyla uyuşuyor.",
      );
      await lab.getByRole("button", { name: "RNA", exact: true }).tap();
      await expect(lab.locator(".nucleic-result > strong")).toHaveText(
        "Toplam hidrojen bağı bu bilgilerle belirlenemez.",
      );
      await expect(lab.locator(".nucleic-result")).toContainText(
        "A=U veya G=C zorunlu değildir.",
      );
      await expect(lab.locator('line[data-bond="hydrogen"]')).toHaveCount(0);
      await lab.getByRole("button", { name: "DNA", exact: true }).tap();
      await lab
        .getByRole("button", { name: "Hesabımı denetle", exact: true })
        .tap();
    },
    async assertOutcome(_page, lab) {
      await expect(
        lab.getByRole("button", { name: "DNA", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        lab.getByRole("combobox", { name: "Örnek baz dizisi", exact: true }),
      ).toHaveValue("GGTCCA");
      await expect(lab.locator(".nucleic-result > strong")).toHaveText(
        "16 hidrojen bağı",
      );
      await expect(lab.locator(".nucleic-result")).toContainText(
        "2 A–T çifti × 2 + 4 G–C çifti × 3 = 16.",
      );
      await expect(lab.locator(".nucleic-result")).toContainText(
        "Tahminin bu modelin hesabıyla uyuşuyor.",
      );
      await expect(lab.locator('line[data-bond="hydrogen"]')).toHaveCount(16);
    },
  },
  {
    id: "kimyasal-turler-lewis",
    title: "Kimyasal türler ve Lewis yapısı",
    lab: ".chemical-species-lab",
    result: ".species-central",
    exploration: "chemical-species",
    async interact(_page, lab) {
      await lab
        .getByRole("combobox", { name: "Tür örneği", exact: true })
        .selectOption("co2");
      const prediction = lab.getByRole("combobox", {
        name: "Toplam değerlik elektronu tahminin",
        exact: true,
      });
      await prediction.selectOption("12");
      await lab
        .getByRole("button", { name: "Sayımı kontrol et", exact: true })
        .tap();
      await expect(lab.locator(".species-feedback")).toContainText(
        "Tekrar say: CO₂ için doğru bütçe 16 elektrondur.",
      );
      await prediction.selectOption("16");
      await lab
        .getByRole("button", { name: "Sayımı kontrol et", exact: true })
        .tap();
      await expect(lab.locator(".species-feedback")).toContainText(
        "Doğru: CO₂ için toplam 16 değerlik elektronu vardır.",
      );
      await lab
        .getByRole("button", { name: "Sonraki yerleşim adımı", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Sonraki yerleşim adımı", exact: true })
        .tap();
      // All16 electrons can be allocated while carbon still lacks an octet.
      await expect(lab.locator(".species-counts dd")).toHaveText([
        "16 elektron",
        "4",
        "12",
        "16 / 0",
      ]);
      await expect(lab.locator(".species-central > strong")).toHaveText(
        "C çevresinde: 4 elektron.",
      );
      await lab
        .getByRole("button", { name: "Sonraki yerleşim adımı", exact: true })
        .tap();
    },
    async assertOutcome(_page, lab) {
      await expect(
        lab.getByRole("combobox", { name: "Tür örneği", exact: true }),
      ).toHaveValue("co2");
      await expect(
        lab.getByRole("combobox", {
          name: "Toplam değerlik elektronu tahminin",
          exact: true,
        }),
      ).toHaveValue("16");
      await expect(lab.locator(".species-feedback")).toContainText(
        "Doğru: CO₂ için toplam 16 değerlik elektronu vardır.",
      );
      await expect(lab.locator(".species-central > strong")).toHaveText(
        "C çevresinde: 8 elektron.",
      );
      await expect(lab.locator(".species-counts dd")).toHaveText([
        "16 elektron",
        "8",
        "8",
        "16 / 0",
      ]);
      await expect(lab.locator(".species-drawing .species-bond")).toHaveCount(
        4,
      );
      await expect(lab.locator(".species-drawing .species-dot")).toHaveCount(8);
      await expect(
        lab.getByRole("button", {
          name: "Sonraki yerleşim adımı",
          exact: true,
        }),
      ).toBeDisabled();
    },
  },
  {
    id: "isi-ve-sicaklik",
    title: "Isı ve sıcaklık",
    lab: ".heat-temperature-lab",
    result: ".heat-lab-balance",
    exploration: "heat-temperature",
    async interact(_page, lab) {
      await lab
        .getByRole("slider", { name: "Temas ilerlemesi (%)", exact: true })
        .fill("100");
      await expect(lab.locator(".heat-lab-vessels output")).toHaveText([
        "44 °C",
        "44 °C",
      ]);
      await lab
        .getByRole("combobox", { name: "A’nın malzemesi", exact: true })
        .selectOption("aluminium");
      await lab
        .getByRole("radio", { name: "B’nin ilk sıcaklığına", exact: true })
        .check();
      await lab
        .getByRole("textbox", { name: "Neden böyle düşündün?", exact: true })
        .fill(
          "Suyun ısı sığası daha büyük olduğu için denge 20°C’ye daha yakındır.",
        );
      await lab
        .getByRole("button", {
          name: "Tahminimi modelle karşılaştır",
          exact: true,
        })
        .tap();
      await expect(lab.locator(".heat-reasoning")).toContainText(
        "B’nin ısı sığası daha büyük",
      );
      await lab
        .getByRole("slider", { name: "Temas ilerlemesi (%)", exact: true })
        .fill("100");
      await expect(lab.locator(".heat-lab-vessels output")).toHaveText([
        "27,5 °C",
        "27,5 °C",
      ]);
      // More transferred energy can melt more ice while its temperature stays0°C.
      await lab
        .getByRole("button", { name: "Sıcaklık–enerji grafiği", exact: true })
        .tap();
      await lab
        .getByRole("slider", { name: "Aktarılan enerji payı (%)", exact: true })
        .fill("50");
      await expect(lab.locator(".heat-lab-balance > strong")).toContainText(
        "0 °C",
      );
      await expect(lab.locator(".heat-lab-balance")).toContainText("21.950 J");
      await expect(lab.locator(".heat-lab-balance")).toContainText("%59,4");
      await lab
        .getByRole("slider", { name: "Aktarılan enerji payı (%)", exact: true })
        .fill("75");
      await expect(lab.locator(".heat-lab-balance > strong")).toContainText(
        "0 °C",
      );
      await expect(lab.locator(".heat-lab-balance")).toContainText("32.925 J");
      await lab.getByRole("button", { name: "Isıl temas", exact: true }).tap();
    },
    async assertOutcome(_page, lab) {
      await expect(
        lab.getByRole("combobox", { name: "A’nın malzemesi", exact: true }),
      ).toHaveValue("aluminium");
      await expect(
        lab.getByRole("slider", { name: "Temas ilerlemesi (%)", exact: true }),
      ).toHaveValue("100");
      await expect(lab.locator(".heat-lab-vessels output")).toHaveText([
        "27,5 °C",
        "27,5 °C",
      ]);
      await expect(lab.locator(".heat-lab-balance > strong")).toHaveText(
        "Isıl denge: net ısı aktarımı yok.",
      );
      await expect(lab.locator(".heat-lab-balance")).toContainText("= 0 J.");
      await expect(
        lab.getByRole("radio", { name: "B’nin ilk sıcaklığına", exact: true }),
      ).toBeChecked();
      await expect(lab.locator(".heat-reasoning")).toContainText(
        "B’nin ısı sığası daha büyük",
      );
    },
  },
  {
    id: "dunya-gucu-osmanli",
    title: "Dünya Gücü Osmanlı",
    lab: ".world-power-lab",
    result: ".world-power-feedback",
    exploration: "world-power-ottoman",
    async interact(_page, lab) {
      await lab.getByRole("button", { name: /^1571 · İnebahtı/ }).tap();
      await expect(
        lab.getByRole("heading", {
          name: "İnebahtı: yenilgi ve yeniden inşa",
          exact: true,
        }),
      ).toBeVisible();
      await lab
        .getByRole("radio", {
          name: "1571’den sonra hiçbir Osmanlı deniz faaliyeti gerçekleşmedi.",
          exact: true,
        })
        .check();
      await lab
        .getByRole("button", { name: "Yorumu kontrol et", exact: true })
        .tap();
      await expect(lab.locator(".world-power-feedback > strong")).toHaveText(
        "Yorumu kanıtla yeniden karşılaştır.",
      );
      await expect(lab.locator(".world-power-feedback")).toContainText(
        "Desteklenen yorum:",
      );
      await lab
        .getByRole("radio", {
          name: "Donanma ağır kayıp aldı; yeniden kurulması deniz mücadelesinin sürdüğünü gösterir.",
          exact: true,
        })
        .check();
      await lab
        .getByRole("button", { name: "Yorumu kontrol et", exact: true })
        .tap();
    },
    async assertOutcome(_page, lab) {
      await expect(
        lab.getByRole("button", { name: /^1571 · İnebahtı/ }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        lab.getByRole("heading", {
          name: "İnebahtı: yenilgi ve yeniden inşa",
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        lab.getByRole("radio", {
          name: "Donanma ağır kayıp aldı; yeniden kurulması deniz mücadelesinin sürdüğünü gösterir.",
          exact: true,
        }),
      ).toBeChecked();
      await expect(lab.locator(".world-power-feedback > strong")).toHaveText(
        "Yorumun kanıtla uyumlu.",
      );
      await expect(lab.locator(".world-power-evidence")).toContainText(
        "1574’te Tunus",
      );
    },
  },
  {
    id: "iyonik-bag-ve-guclu-etkilesimler",
    title: "Güçlü etkileşimler ve iyonik bağ",
    lab: ".ionic-workshop",
    result: ".ionic-result",
    exploration: "ionic-bond-workshop",
    async interact(_page, lab) {
      const pair = lab.getByRole("combobox", {
        name: "İncelenecek iyon çifti",
        exact: true,
      });
      await pair.selectOption("2");
      await expect(lab.locator(".ionic-result")).toContainText("Toplam yük +1");
      await lab
        .getByRole("button", { name: "En küçük nötr oranı kur", exact: true })
        .tap();
      await expect(lab.locator(".ionic-result")).toContainText("Al₂O₃");
      // Neutrality alone is insufficient: Ca₂O₂ must reduce to CaO.
      await pair.selectOption("3");
      await lab.getByRole("slider", { name: /^Katyon adedi:/ }).fill("2");
      await lab.getByRole("slider", { name: /^Anyon adedi:/ }).fill("2");
      await expect(lab.locator(".ionic-result")).toContainText(
        "2:2 en küçük oran değil",
      );
      await lab
        .getByRole("button", { name: "En küçük nötr oranı kur", exact: true })
        .tap();
      await expect(lab.locator(".ionic-result")).toContainText(
        "Nötr ve en küçük oran: CaO",
      );
      await pair.selectOption("2");
      await lab
        .getByRole("button", { name: "En küçük nötr oranı kur", exact: true })
        .tap();
      await lab
        .getByRole("combobox", { name: "NaCl örneğinin hâli", exact: true })
        .selectOption("molten");
    },
    async assertOutcome(_page, lab) {
      await expect(
        lab.getByRole("combobox", {
          name: "İncelenecek iyon çifti",
          exact: true,
        }),
      ).toHaveValue("2");
      await expect(
        lab.getByRole("slider", { name: /^Katyon adedi:/ }),
      ).toHaveValue("2");
      await expect(
        lab.getByRole("slider", { name: /^Anyon adedi:/ }),
      ).toHaveValue("3");
      await expect(lab.locator(".ionic-result")).toContainText(
        "Nötr ve en küçük oran: Al₂O₃",
      );
      await expect(
        lab.getByRole("combobox", { name: "NaCl örneğinin hâli", exact: true }),
      ).toHaveValue("molten");
      await expect(lab.locator(".ionic-phase-result")).toContainText(
        "hareketli Na⁺ ve Cl⁻ iyonları elektrik yükü taşır",
      );
    },
  },
  {
    id: "iyonik-bilesik-adlandirma",
    title: "İyonik bileşiklerin sistematik adlandırılması",
    lab: ".ionic-workshop",
    result: ".ionic-result",
    exploration: "ionic-naming-workshop",
    async interact(_page, lab) {
      await lab
        .getByRole("combobox", { name: "İncelenecek formül", exact: true })
        .selectOption("5");
      await lab
        .getByRole("button", { name: "Sonraki çözüm adımı", exact: true })
        .tap();
      await expect(lab.locator(".ionic-steps")).toContainText("2 × (−3) = −6");
      await lab
        .getByRole("button", { name: "Sonraki çözüm adımı", exact: true })
        .tap();
      await expect(lab.locator(".ionic-steps")).toContainText("her iyon +2");
      await lab
        .getByRole("button", { name: "Sonraki çözüm adımı", exact: true })
        .tap();
    },
    async assertOutcome(_page, lab) {
      await expect(
        lab.getByRole("combobox", { name: "İncelenecek formül", exact: true }),
      ).toHaveValue("5");
      await expect(lab.locator(".ionic-result")).toContainText(
        "Demir(II) fosfat",
      );
      await expect(lab.locator(".ionic-result")).toContainText(
        "Roma rakamı metal adedini değil her metal iyonunun yükünü gösterir",
      );
      await expect(
        lab.getByRole("button", { name: "Çözüm tamamlandı", exact: true }),
      ).toBeDisabled();
      await expect(lab.locator(".ionic-steps li")).toHaveCount(3);
    },
  },
];

for (const lesson of lessons) {
  test(`${lesson.id}: course entry changes a real model and preserves its explanation and own note offline without learning credit`, async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    const before = learningEvidence(await stored(page));
    await openFromCourses(page, lesson);
    const lab = page.locator(lesson.lab);
    await lesson.interact(page, lab);
    await lesson.assertOutcome(page, lab);
    const note = await saveNote(page, lesson);
    const saved = await stored(page);
    expect(saved?.explorations[lesson.exploration]).toBeDefined();
    expect(learningEvidence(saved)).toEqual(before);
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await lesson.assertOutcome(page, lab);
    await expect(
      page
        .locator(".study-notes")
        .getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    expect((await stored(page))?.explorations[lesson.exploration]).toEqual(
      saved!.explorations[lesson.exploration],
    );
    expect(learningEvidence(await stored(page))).toEqual(before);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
  });

  test(`${lesson.id}: readable HTML outcomes and touch controls fit 320px at 200% UI and 150% text`, async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await nav(page, "Ayarlar");
    await setThemePreference(page, "light");
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
    await page
      .getByLabel("Yalnızca yazı boyutu %", { exact: true })
      .fill("150");
    await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await page.setViewportSize({ width: 320, height: 844 });
    await openFromCourses(page, lesson);
    const lab = page.locator(lesson.lab);
    await lesson.interact(page, lab);
    await lesson.assertOutcome(page, lab);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await readableGeometry(page, lesson);
    if (lesson.id === "isi-ve-sicaklik") {
      const wordFit = await lab
        .getByRole("button", {
          name: "Tahminimi modelle karşılaştır",
          exact: true,
        })
        .evaluate((button) => {
          const style = getComputedStyle(button);
          const canvas = document.createElement("canvas").getContext("2d")!;
          canvas.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          return {
            available:
              button.clientWidth -
              parseFloat(style.paddingLeft) -
              parseFloat(style.paddingRight),
            words: button
              .textContent!.trim()
              .split(/\s+/)
              .map((word) => ({ word, width: canvas.measureText(word).width })),
          };
        });
      for (const word of wordFit.words)
        expect(
          word.width,
          `${word.word} remains readable as a whole word`,
        ).toBeLessThanOrEqual(wordFit.available + 1);
    }
    const scan = await new AxeBuilder({ page }).include("main").analyze();
    expect(
      scan.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
  });
}
