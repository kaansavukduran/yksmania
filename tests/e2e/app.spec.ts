import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function open(page: Page) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
}
async function start(page: Page) {
  await page
    .getByRole("button", { name: "Çalışmaya başla", exact: true })
    .click();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
}
async function answer(page: Page, index: number, last = false) {
  await page.locator(".answer").nth(index).click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: last ? "Çalışmayı kaydet" : "Sonraki soru",
      exact: true,
    })
    .click();
}
test.use({ locale: "tr-TR" });
test("YKS-007 English device language still opens Turkish-only UI and retains the user's text", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "en-US" });
  try {
    const page = await context.newPage();
    await open(page);
    expect(await page.evaluate(() => navigator.language)).toBe("en-US");
    await expect(page.locator("html")).toHaveAttribute("lang", "tr");
    await expect(page.locator(".locale-button")).toHaveCount(0);
    await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Ayarlar", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Dil", exact: true }),
    ).toHaveCount(0);
    await page.getByRole("button", { name: "Bugün", exact: true }).click();
    await start(page);
    await expect(
      page.getByRole("button", { name: "Cevabı kontrol et", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("textbox", { name: "Notun", exact: true })
      .fill("Keep my English note unchanged: ÇĞİÖŞÜ.");
    await page.locator(".answer").nth(1).click();
    await expect(
      page.getByText("Bu cihazda kaydedildi", { exact: true }),
    ).toBeVisible();
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("lang", "tr");
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue("Keep my English note unchanged: ÇĞİÖŞÜ.");
    await expect(page.locator(".answer").nth(1)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  } finally {
    await context.close();
  }
});
test("turning off gamification hides world rewards and keeps learning usable", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page
    .getByRole("switch", { name: "Oyunlaştırma", exact: true })
    .uncheck();
  await page.getByRole("button", { name: "Dünyam", exact: true }).click();
  await expect(page.locator(".main-content")).toContainText(
    "Oyunlaştırma kapalı",
  );
  await expect(page.locator(".world-scene")).toHaveCount(0);
  await page.getByRole("button", { name: "Bugün", exact: true }).click();
  await start(page);
  await expect(page.locator(".answer")).toHaveCount(3);
});
function samplePdf(secondPage = false) {
  const parts = ["%PDF-1.4\n"];
  const offsets = [0];
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const stream = "BT /F1 16 Tf 20 100 Td (Local learning material) Tj ET";
  objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  if (secondPage) {
    objects[1] = "<< /Type /Pages /Kids [3 0 R 6 0 R] /Count 2 >>";
    objects.push(
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 7 0 R >>",
    );
    const second = "BT /F1 16 Tf 20 100 Td (Second page material) Tj ET";
    objects.push(
      `<< /Length ${second.length} >>\nstream\n${second}\nendstream`,
    );
  }
  objects.forEach((object, i) => {
    offsets.push(Buffer.byteLength(parts.join("")));
    parts.push(`${i + 1} 0 obj\n${object}\nendobj\n`);
  });
  const xref = Buffer.byteLength(parts.join(""));
  parts.push(
    `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets
      .slice(1)
      .map((n) => String(n).padStart(10, "0") + " 00000 n \n")
      .join(
        "",
      )}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`,
  );
  return Buffer.from(parts.join(""));
}
test("local PDF opens for the first time offline and retains notes without learning credit", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.getByRole("button", { name: "Kütüphane", exact: true }).click();
  await page.locator('input[accept="application/pdf,.pdf"]').setInputFiles({
    name: "local-test.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(),
  });
  await expect(
    page.getByRole("button", { name: /local-test.pdf/ }).first(),
  ).toBeVisible();
  await context.setOffline(true);
  await page
    .getByRole("button", { name: /local-test.pdf/ })
    .first()
    .click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByText("Sayfanın metni", { exact: true }).click();
  await expect(page.locator(".pdf-text")).toContainText(
    "Local learning material",
  );
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("PDF notum.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await page
    .getByRole("button", { name: /local-test.pdf/ })
    .first()
    .click();
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("PDF notum.");
});
test("a failed terminal save retains the answer draft and never celebrates false success", async ({
  page,
}) => {
  await open(page);
  await start(page);
  for (const i of [1, 2, 0, 1]) await answer(page, i);
  await page.locator(".answer").nth(1).click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(() => {
    const store = IDBObjectStore.prototype;
    const original = store.put;
    store.put = function (...args: Parameters<IDBObjectStore["put"]>) {
      if ((window as any).__failSave && this.name === "state")
        throw new DOMException("Synthetic disk full", "QuotaExceededError");
      return original.apply(this, args);
    };
    (window as any).__failSave = true;
  });
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(page.locator(".error-banner")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toHaveCount(0);
  await page.evaluate(() => {
    (window as any).__failSave = false;
  });
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toBeVisible();
  await expect(page.locator(".result-stats")).toContainText("5/5");
});
test("real lesson → assisted error → saved history → calendar → undo", async ({
  page,
}) => {
  await open(page);
  await start(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await answer(page, 0);
  await answer(page, 2);
  await answer(page, 0);
  await answer(page, 1);
  await answer(page, 1, true);
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toBeVisible();
  await expect(page.locator(".result-stats")).toContainText("4/5");
  await expect(page.locator(".result-reviews>div")).toHaveCount(3);
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("4/5");
  await page.getByRole("button", { name: "Yanlışlarım", exact: true }).click();
  await expect(page.locator(".mistake-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Çalışma geçmişi", exact: true })
    .click();
  page.once("dialog", (d) => d.accept());
  await page
    .getByRole("button", { name: "Bu oturumu geri al", exact: true })
    .click();
  await expect(page.locator(".history-row")).toHaveCount(0);
  await page.getByRole("button", { name: "Takvim", exact: true }).click();
  await expect(page.locator(".upcoming-panel")).toContainText(
    "Henüz çalışma kaydı yok",
  );
});
test("offline reload preserves a draft and supports completing it", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await start(page);
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Çığ ve öğrenme: taslağım korunuyor.");
  await page.locator(".answer").nth(1).click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".answer.chosen")).toContainText("1/6");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Çığ ve öğrenme: taslağım korunuyor.");
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  await answer(page, 2);
  await answer(page, 0);
  await answer(page, 1);
  await answer(page, 1, true);
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toBeVisible();
});
test("settings stay independent at 200% scale, large Turkish text on a narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("135");
  await expect(page.getByLabel("Arayüz ölçeği %", { exact: true })).toHaveValue(
    "135",
  );
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await expect(
    page.getByRole("heading", { name: "Ayarlar", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Yalnızca yazı boyutu %", { exact: true }),
  ).toHaveValue("150");
  await expect(page.getByLabel("Yazı tipi", { exact: true })).toHaveValue(
    "lexend",
  );
  await page.reload();
  await expect(page.getByLabel("Arayüz ölçeği %", { exact: true })).toHaveValue(
    "200",
  );
  await expect(
    page.getByLabel("Yalnızca yazı boyutu %", { exact: true }),
  ).toHaveValue("150");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "Güncellemeleri kontrol et", exact: true })
    .click();
  await expect(
    page.getByText("Bu web kanalında yeni sürüm bulunamadı.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .click();
  await page.getByRole("button", { name: /Matematik.*31/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*18/ }).click();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".answer").first()).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Cevabı kontrol et", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test("blocked day is respected and settings survive reloading", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Takvim", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Bu günün müsaitliğini değiştir",
      exact: true,
    })
    .click();
  await expect(page.locator(".calendar-day.selected")).toHaveClass(/closed/);
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await expect(page.locator(".calendar-day.selected")).toHaveClass(/closed/);
  await page.getByRole("button", { name: "Bugün", exact: true }).click();
  await expect(page.locator(".hero h2")).toHaveText(
    "Bugün kapalı günün. Dinlenme planın korunuyor.",
  );
  await expect(
    page.getByRole("button", { name: "Serbest çalışma seç", exact: true }),
  ).toBeVisible();
});
test("invalid backup preserves data and normal keyboard controls are reachable", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.locator("input[type=file]").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from("{broken"),
  });
  await expect(
    page.getByRole("status").filter({ hasText: "Yedek doğrulanamadı" }),
  ).toBeVisible();
  await expect(page.getByLabel("Yazı tipi", { exact: true })).toHaveValue(
    "lexend",
  );
  await page.getByLabel("Arayüz ölçeği", { exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Arayüz ölçeği %", { exact: true })).toHaveValue(
    "105",
  );
});
test("homepage and question flow have no serious accessibility violations", async ({
  page,
}) => {
  await open(page);
  const home = await new AxeBuilder({ page }).analyze();
  expect(
    home.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await start(page);
  const study = await new AxeBuilder({ page }).analyze();
  expect(
    study.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});

test("theory and questions have separate subject navigation and preserve the complete topic outline", async ({
  page,
}) => {
  await open(page);
  const nav = page.locator(".sidebar nav button");
  const labels = await nav.allTextContents();
  expect(labels.indexOf("Kopya Kağıtları")).toBe(
    labels.indexOf("Konu Anlatımı") + 1,
  );
  expect(labels.indexOf("Sorular")).toBe(labels.indexOf("Kopya Kağıtları") + 1);
  await page
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: /Matematik.*31/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*18/ }).click();
  await expect(page.locator(".lesson-article")).toBeVisible();
  await expect(page.locator(".answer")).toHaveCount(0);
  await page.getByRole("button", { name: "Sorular", exact: true }).click();
  await page.getByRole("button", { name: /Matematik.*31/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*5/ }).click();
  await expect(page.locator(".answer")).toHaveCount(3);
  await expect(page.locator(".lesson-article")).toHaveCount(0);
  await expect(
    page.locator('.sidebar nav button[aria-current="page"]'),
  ).toHaveText("Sorular");
  await page
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "AYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("adaptasyon");
  await expect(page.locator(".curriculum-list")).toContainText(
    "Çevre, varyasyon, adaptasyon ve seçilim",
  );
});

test("catalogue and batch PDFs merge duplicate bytes, report failures and open in the right subject offline", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.getByRole("button", { name: "Kütüphane", exact: true }).click();
  const c = {
    format: "yksmania-source-catalogue",
    version: 1,
    name: "Test archive",
    createdAt: "2026-11-13T00:00:00Z",
    entries: [
      {
        id: "test-math",
        name: "math.pdf",
        subjectIds: ["tyt-matematik"],
        kind: "theory",
        provider: "ogm",
        bytes: samplePdf().length,
      },
      {
        id: "test-physics",
        name: "physics.pdf",
        subjectIds: ["tyt-fizik"],
        kind: "questions",
        provider: "mebi",
        bytes: samplePdf().length,
      },
    ],
  };
  await page.locator('input[accept="application/json,.json"]').setInputFiles({
    name: "catalogue.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(c)),
  });
  await expect(page.locator(".source-status")).toContainText("Test archive");
  await page.locator('input[accept="application/pdf,.pdf"]').setInputFiles([
    { name: "math.pdf", mimeType: "application/pdf", buffer: samplePdf() },
    { name: "physics.pdf", mimeType: "application/pdf", buffer: samplePdf() },
    {
      name: "broken.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("broken"),
    },
  ]);
  await expect(page.locator(".import-report")).toContainText(
    "1 yeni dosya eklendi",
  );
  await expect(page.locator(".import-report")).toContainText(
    "1 aynı içerik birleştirildi",
  );
  await expect(page.locator(".import-report")).toContainText(
    "1 eklenemeyen dosya",
  );
  await expect(page.locator(".document-row")).toHaveCount(1);
  await page.reload();
  await page.getByRole("button", { name: "Sorular", exact: true }).click();
  await page.getByRole("button", { name: /Fizik.*20/ }).click();
  await expect(page.locator(".source-rows")).toContainText("physics.pdf");
  await context.setOffline(true);
  await page.getByRole("button", { name: "PDF’yi aç", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Kapat", exact: true }).click();
  await page.getByRole("button", { name: "Bugün", exact: true }).click();
  await expect(page.locator(".stat-number").first()).toHaveText("0");
});

test("v1 data opens in the upgraded database without losing a draft or PDF", async ({
  page,
}) => {
  await page.goto("/icon.svg");
  await page.evaluate(async () => {
    const fixture = {
      version: 1,
      settings: {
        locale: "en",
        theme: "dark",
        font: "system",
        scale: 100,
        textSize: 100,
        motion: true,
        sound: false,
        gamification: true,
        dailyMinutes: 90,
        blockedWeekdays: [],
        blockedDates: [],
        examDate: "",
      },
      sessions: [],
      reviews: [],
      draft: {
        lessonId: "rasyonel-sayilar",
        phase: "practice",
        index: 0,
        responses: [],
        selected: 1,
        checked: false,
        hint: false,
        confidence: "medium",
        note: "Eski sürüm notu",
        startedAt: 123,
      },
      notes: { "legacy-pdf": "Eski PDF notu" },
      unlocked: [],
    };
    await new Promise<void>((resolve, reject) => {
      const req = indexedDB.open("yksmania", 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore("state");
        req.result.createObjectStore("documents", { keyPath: "id" });
      };
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        const d = req.result;
        const tx = d.transaction(["state", "documents"], "readwrite");
        tx.objectStore("state").put(fixture, "current");
        tx.objectStore("documents").put({
          id: "legacy-pdf",
          name: "legacy.pdf",
          subjectId: "tyt-matematik",
          size: 8,
          type: "application/pdf",
          addedAt: "2026-11-13",
          blob: new Blob(["%PDF-1.4"]),
        });
        tx.oncomplete = () => {
          d.close();
          resolve();
        };
        tx.onerror = () => reject(tx.error);
      };
    });
  });
  await open(page);
  expect(
    await page.evaluate(
      () =>
        new Promise<string>((resolve, reject) => {
          const req = indexedDB.open("yksmania");
          req.onerror = () => reject(req.error);
          req.onsuccess = () => {
            const d = req.result;
            const read = d
              .transaction("state")
              .objectStore("state")
              .get("current");
            read.onsuccess = () => {
              d.close();
              resolve(read.result.settings.locale);
            };
            read.onerror = () => {
              d.close();
              reject(read.error);
            };
          };
        }),
    ),
  ).toBe("tr");
  await page
    .getByRole("button", { name: "Kaldığın yerden devam et", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.locator(".locale-button")).toHaveCount(0);
  await expect(page.locator(".answer").nth(1)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Eski sürüm notu");
  await page.getByRole("button", { name: "Kütüphane", exact: true }).click();
  await expect(page.locator(".document-row")).toContainText("legacy.pdf");
});

async function openVisualLesson(page: Page, subject: RegExp, lesson: RegExp) {
  await open(page);
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .click();
  await page.getByRole("button", { name: subject }).click();
  await page.getByRole("button", { name: lesson }).click();
  await expect(page.locator(".visual-lab")).toBeVisible();
}
test("YKS-006 notes stay below full-width theory and questions and retain edits", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await openVisualLesson(
    page,
    /Biyoloji.*18/,
    /Hücre organelleri: yapı ve görev/,
  );
  for (const width of [1440, 1280, 1024, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const article = await page.locator(".lesson-article").boundingBox();
    const notes = await page.locator(".study-notes").boundingBox();
    const layout = await page.locator(".study-layout").boundingBox();
    expect(article).not.toBeNull();
    expect(notes).not.toBeNull();
    expect(layout).not.toBeNull();
    expect(notes!.y, `notes below theory at ${width}px`).toBeGreaterThanOrEqual(
      article!.y + article!.height,
    );
    expect(
      article!.width,
      `theory uses full row at ${width}px`,
    ).toBeGreaterThanOrEqual(layout!.width - 1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
  }
  const note = page.getByRole("textbox", { name: "Notun", exact: true });
  await note.fill("Çekirdek ve ribozom arasındaki farkı karşılaştır.");
  await expect(
    page.getByText("Bu cihazda kaydedildi", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(note).toHaveValue(
    "Çekirdek ve ribozom arasındaki farkı karşılaştır.",
  );
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const panel = await page.locator(".question-panel").boundingBox();
    const practiceNote = await page.locator(".practice-note").boundingBox();
    expect(panel).not.toBeNull();
    expect(practiceNote).not.toBeNull();
    expect(
      practiceNote!.y,
      `notes below questions at ${width}px`,
    ).toBeGreaterThanOrEqual(panel!.y + panel!.height);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
  }
  await note.fill("Soru çözümünde hatırlayacağım not.");
  await answer(page, 0);
  await expect(page.locator(".question-meta")).toContainText("2 / 5");
  await expect(
    page.getByText("Bu cihazda kaydedildi", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(note).toHaveValue("Soru çözümünde hatırlayacağım not.");
  await expect(page.locator(".question-meta")).toContainText("2 / 5");
});
test("cell structures respond to actual diagram clicks, preserve a guided route, and score only a completed question session", async ({
  page,
}) => {
  await openVisualLesson(
    page,
    /Biyoloji.*18/,
    /Hücre organelleri: yapı ve görev/,
  );
  await page
    .locator('svg .cell-part[aria-label="Mitokondri"] ellipse')
    .first()
    .click();
  await expect(page.locator(".organelle-info h3")).toHaveText("Mitokondri");
  await expect(page.locator(".organelle-info")).toContainText(
    "Hem hayvan hem bitki",
  );
  await page
    .getByRole("button", { name: "Yeşil bitki hücresi", exact: true })
    .click();
  await page
    .locator(".organelle-options")
    .getByRole("button", { name: "Kloroplast", exact: true })
    .click();
  await expect(page.locator(".organelle-info")).toContainText(
    "her bitki hücresinde",
  );
  await expect(
    page
      .locator(".organelle-options")
      .getByRole("button", { name: "Sentrozom", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Salgı proteininin yolunu izle", exact: true })
    .click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(page.locator(".route-explanation")).toContainText("ribozom");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await expect(page.locator(".route-explanation")).toContainText("2/5");
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Bugün", exact: true })
    .click();
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Sorular", exact: true })
    .click();
  await page.getByRole("button", { name: /Biyoloji.*18/ }).click();
  await page
    .getByRole("button", { name: /Hücre organelleri: yapı ve görev/ })
    .click();
  for (const [i, n] of [1, 2, 0, 1, 2].entries())
    await answer(page, n, i === 4);
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("5/5");
});
test("periodic explorer keeps atomic identity while charge changes and exposes all 118 elements without page overflow", async ({
  page,
}) => {
  await openVisualLesson(page, /Kimya.*17/, /Periyodik sistem ve iyonlar/);
  await page
    .getByRole("combobox", { name: "Element seç", exact: true })
    .selectOption("2");
  await expect(page.locator(".element-detail dl > div").nth(1)).toContainText(
    "18",
  );
  await page
    .getByRole("combobox", { name: "Element seç", exact: true })
    .selectOption("11");
  await page.getByRole("slider", { name: /Tanecik yükü/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".particle-count")).toContainText("10");
  await expect(page.locator(".element-detail dl > div").first()).toContainText(
    "11",
  );
  await page.getByRole("button", { name: "118 element", exact: true }).click();
  await expect(page.locator(".periodic-table .element-tile")).toHaveCount(118);
  await page
    .getByRole("combobox", { name: "Element seç", exact: true })
    .selectOption("118");
  await expect(page.locator(".element-detail h3")).toHaveText("Oganesson");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Element seç", exact: true }),
  ).toHaveValue("118");
});
test("geometry pieces actually translate while area is conserved and exploration survives offline reload", async ({
  page,
  context,
}) => {
  await openVisualLesson(page, /Geometri.*16/, /Üçgen ve paralelkenarda alan/);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await expect(page.locator(".area-result")).toContainText("40");
  const piece = page.locator('[data-piece="triangle"]');
  await expect(piece).toHaveAttribute("style", /translate\(0px/);
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(piece).toHaveAttribute("style", /translate\(184px/);
  await expect(page.locator(".area-result")).toContainText("40");
  await page.getByRole("button", { name: "Üçgen", exact: true }).click();
  await expect(page.locator(".area-result")).toContainText("20");
  await page.getByRole("slider", { name: /Taban b/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".area-result")).toContainText("22,5");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".area-result")).toContainText("22,5");
});
test("visual boards remain usable in Turkish, large independent scales, reduced motion and narrow touch layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .click();
  await page.getByRole("button", { name: /Geometri.*16/ }).click();
  await page
    .getByRole("button", { name: /Üçgen ve paralelkenarda alan/ })
    .click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(page.locator(".geometry-explanation")).toContainText(
    "Soldaki üçgeni dik yükseklik boyunca kes",
  );
  expect(
    await page
      .locator(".geometry-piece")
      .evaluate((e) => getComputedStyle(e).transitionDuration),
  ).toBe("0s");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".answer")).toHaveCount(3);
});
test("new visual flows have no serious or critical axe violations", async ({
  page,
}) => {
  for (const id of [
    "hucre-organelleri",
    "periyodik-sistem",
    "alan-donusumleri",
  ]) {
    await page.goto("/#/lesson?id=" + id);
    await expect(page.locator(".visual-lab")).toBeVisible();
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
  }
});

test("PDF page navigation retains its last valid page after offline reload", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.getByRole("button", { name: "Kütüphane", exact: true }).click();
  await page.locator('input[accept="application/pdf,.pdf"]').setInputFiles({
    name: "two-pages.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(true),
  });
  await page.locator(".document-open").click();
  await expect(page.locator("canvas")).toBeVisible();
  await page
    .getByRole("spinbutton", { name: "PDF sayfası", exact: true })
    .fill("2");
  await page.getByRole("button", { name: "Git", exact: true }).click();
  await page.getByText("Sayfanın metni", { exact: true }).click();
  await expect(page.locator(".pdf-text")).toContainText("Second page material");
  await page
    .getByRole("spinbutton", { name: "PDF sayfası", exact: true })
    .fill("9");
  await page.getByRole("button", { name: "Git", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("1–2");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await page.locator(".document-open").click();
  await expect(
    page.getByRole("spinbutton", { name: "PDF sayfası", exact: true }),
  ).toHaveValue("2");
});
test("cartoon atlas keeps a fixed foot anchor and actor box; reduced motion stops the loop", async ({
  page,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  const atlas = await page.locator(".hero .aion-sprite").evaluate(async (e) => {
    const src = getComputedStyle(e).backgroundImage.slice(5, -2);
    const im = new Image();
    await new Promise<void>((resolve, reject) => {
      im.onload = () => resolve();
      im.onerror = reject;
      im.src = src;
    });
    const canvas = document.createElement("canvas");
    canvas.width = im.width;
    canvas.height = im.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(im, 0, 0);
    const pixels = ctx.getImageData(0, 0, im.width, im.height).data;
    const baselines = [];
    for (let frame = 0; frame < 8; frame++) {
      let baseline = -1;
      for (let y = 390; y < 490; y++)
        for (let x = 60; x < 230; x++) {
          const px = (frame % 4) * 384 + x,
            py = Math.floor(frame / 4) * 512 + y;
          if (pixels[(py * im.width + px) * 4 + 3] > 220)
            baseline = Math.max(baseline, y);
        }
      baselines.push(baseline);
    }
    return { width: im.width, height: im.height, baselines };
  });
  expect(atlas.width).toBe(1536);
  expect(atlas.height).toBe(1024);
  expect(Math.min(...atlas.baselines)).toBeGreaterThan(0);
  expect(
    Math.max(...atlas.baselines) - Math.min(...atlas.baselines),
  ).toBeLessThanOrEqual(1);
  const actor = page.locator(".hero .aion-sprite");
  await expect(actor).toHaveAttribute("data-facing", "left");
  const before = await actor.boundingBox();
  await expect
    .poll(() => actor.getAttribute("data-frame"), { timeout: 5000 })
    .not.toBe("0");
  expect(await actor.boundingBox()).toEqual(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(actor).toHaveAttribute("data-frame", "0");
  await page.waitForTimeout(300);
  await expect(actor).toHaveAttribute("data-frame", "0");
});

async function openAyt(page: Page, subject: string, title: string) {
  await open(page);
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .click();
  await page.getByRole("button", { name: "AYT", exact: true }).click();
  await page.getByRole("button", { name: new RegExp(subject) }).click();
  await page.getByRole("button", { name: new RegExp(title) }).click();
  await expect(page.locator(".visual-lab")).toBeVisible();
}
async function completeAyt(page: Page, answers: number[]) {
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (const [i, index] of answers.entries())
    await answer(page, index, i === answers.length - 1);
  await expect(page.locator(".result-stats")).toContainText("5/5");
}
test("AYT derivative compares signed secants with a tangent and rejects a continuous corner before independent questions", async ({
  page,
  context,
}) => {
  await open(page);
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .click();
  await page.getByRole("button", { name: "AYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("kirişten");
  await expect(page.locator(".ready-topic")).toHaveCount(1);
  await page.getByRole("button", { name: /Türev: kirişten teğete/ }).click();
  await expect(page.locator(".secant-result")).toContainText("2,5");
  await page.getByRole("button", { name: "0,01", exact: true }).click();
  await expect(page.locator(".secant-result strong")).toHaveText("2,01");
  await page
    .getByRole("button", { name: "Sağdan yaklaşılıyor (h > 0)", exact: true })
    .click();
  await expect(page.locator(".secant-result strong")).toHaveText("1,99");
  await page
    .getByRole("button", { name: "Teğeti kontrol et", exact: true })
    .click();
  await expect(page.locator(".tangent-result")).toContainText("= 2");
  await page.getByLabel("Fonksiyon", { exact: true }).selectOption("absolute");
  await page.getByLabel("A noktasının x değeri", { exact: true }).fill("0");
  await page
    .getByRole("button", { name: "Teğeti kontrol et", exact: true })
    .click();
  await expect(page.locator(".tangent-result")).toContainText("türev yok");
  await expect(page.locator('[data-line="tangent"]')).toHaveCount(0);
  await page.getByRole("button", { name: "Bugün", exact: true }).click();
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await page.goBack();
  await expect(page.locator(".tangent-result")).toContainText("türev yok");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".tangent-result")).toContainText("türev yok");
  await completeAyt(page, [1, 2, 0, 1, 2]);
});
test("AYT electric field keeps source field fixed when test charge changes and obeys inverse square distance", async ({
  page,
}) => {
  await openAyt(page, "Fizik", "Elektrik alan ve test yükü");
  await expect(page.locator(".field-result")).toContainText("9.000 N/C");
  await expect(page.locator(".force-result")).toContainText("0,009 N");
  await page.getByRole("button", { name: "−1 µC", exact: true }).click();
  await expect(page.locator(".field-result")).toContainText("yön: sağa");
  await expect(page.locator(".force-result")).toContainText("yön: sola");
  await page.getByLabel("Uzaklık r", { exact: true }).fill("2");
  await expect(page.locator(".field-result")).toContainText("2.250 N/C");
  await page
    .getByRole("button", { name: "Yüksüz tanecik", exact: true })
    .click();
  await expect(page.locator(".force-result")).toContainText("0 N");
  await expect(page.locator('[data-vector="F"]')).toHaveCount(0);
  await expect(page.locator('[data-vector="E"]')).toHaveCount(1);
  await completeAyt(page, [1, 1, 2, 0, 1]);
});
test("AYT equilibrium separates equal reaction rates from unequal concentrations and preserves the ratio with catalyst", async ({
  page,
}) => {
  await openAyt(page, "Kimya", "Denge: derişim ve tepkime hızı");
  await expect(page.locator(".concentration-result")).toContainText(
    "[A] = 3 mol/L",
  );
  await page
    .getByRole("button", { name: "1 saniye ilerlet", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Başlangıçta katalizör kullan", exact: true })
    .click();
  await expect(page.getByLabel("Geçen süre", { exact: true })).toHaveValue("0");
  await expect(page.locator(".concentration-result")).toContainText(
    "[A] = 3 mol/L",
  );
  await page
    .getByRole("button", {
      name: "Katalizörlü başlangıç: iki hız da ×3",
      exact: true,
    })
    .click();
  await page
    .getByLabel("Başlangıç karışımı", { exact: true })
    .selectOption("2");
  await expect(page.locator(".rate-result")).toContainText(
    "İleri hız = 0,6 · Geri hız = 0,6",
  );
  await page
    .getByRole("button", { name: "Başlangıçta katalizör kullan", exact: true })
    .click();
  await expect(page.locator(".rate-result")).toContainText(
    "İleri hız = 1,8 · Geri hız = 1,8",
  );
  await expect(page.locator(".concentration-result")).toContainText(
    "[B] = 2 mol/L",
  );
  await expect(page.locator(".equilibrium-limit")).toContainText(
    "Kc = [B] / [A] = 2",
  );
  await page
    .getByLabel("Başlangıç karışımı", { exact: true })
    .selectOption("3");
  await expect(page.locator(".rate-result")).toContainText(
    "İleri hız = 0 · Geri hız = 2,7",
  );
  await page
    .getByRole("button", { name: "1 saniye ilerlet", exact: true })
    .click();
  await expect(page.getByLabel("Geçen süre", { exact: true })).toHaveValue("1");
  await completeAyt(page, [1, 2, 0, 2, 2]);
});
test("AYT DNA preserves twelve parental nucleotides while making two antiparallel daughter strands", async ({
  page,
}) => {
  await openAyt(page, "Biyoloji", "DNA eşlenmesi: eski ve yeni zincirler");
  await expect(page.locator('[data-strand="old"]')).toHaveCount(12);
  await expect(page.locator('[data-strand="new"]')).toHaveCount(0);
  await page.locator(".dna-lab .primary").click();
  for (let added = 1; added <= 6; added++) {
    await page.locator(".dna-lab .primary").click();
    await expect(page.locator('[data-strand="old"]')).toHaveCount(12);
    await expect(page.locator('[data-strand="new"]')).toHaveCount(added * 2);
  }
  await expect(page.locator(".dna-count")).toContainText("2 molekül");
  await expect(page.locator(".dna-step")).toContainText("8/8");
  await expect(page.locator(".dna-lab .primary")).toBeDisabled();
  await page.getByRole("button", { name: "3. G–C", exact: true }).click();
  await expect(page.locator(".model-results")).toContainText("3. konumda");
  await completeAyt(page, [1, 2, 0, 1, 2]);
});
test("all four new AYT lessons first open offline at 320px with large Turkish controls and accessible diagrams", async ({
  page,
  context,
}) => {
  let discardedDrafts = 0;
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("confirm");
    discardedDrafts++;
    await dialog.accept();
  });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open(page);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await expect(
    page.getByText("Bu cihazda kaydedildi", { exact: true }),
  ).toBeVisible();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  for (const [subject, title] of [
    ["Matematik", "Türev: kirişten teğete"],
    ["Fizik", "Elektrik alan ve test yükü"],
    ["Kimya", "Denge: derişim ve tepkime hızı"],
    ["Biyoloji", "DNA eşlenmesi: eski ve yeni zincirler"],
  ]) {
    await openAyt(page, subject, title);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
    const a = await page.locator(".lesson-article").boundingBox(),
      n = await page.locator(".study-notes").boundingBox();
    expect(n!.y).toBeGreaterThanOrEqual(a!.y + a!.height);
    const scan = await new AxeBuilder({ page })
      .include(".main-content")
      .analyze();
    expect(
      scan.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
    await expect(page.locator(".answer")).toHaveCount(3);
  }
  expect(discardedDrafts).toBe(3);
});

test("YKS-008 cheatsheets have a separate subject/topic route and keep PDF notes and question drafts offline", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await start(page);
  await page.locator(".answer").nth(1).click();
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Soru taslağım korunmalı.");
  await page.getByRole("button", { name: "Kütüphane", exact: true }).click();
  const catalogue = {
    format: "yksmania-source-catalogue",
    version: 1,
    name: "Ayrılmış kaynaklar",
    createdAt: "2026-11-13T00:00:00Z",
    entries: [
      {
        id: "test-cell-sheet",
        name: "cell-sheet.pdf",
        subjectIds: ["tyt-biyoloji"],
        kind: "cheatsheet",
        provider: "aurelia",
        bytes: samplePdf().length,
        topicIds: ["detail-11"],
      },
      {
        id: "test-dna-sheet",
        name: "dna-sheet.pdf",
        subjectIds: ["tyt-biyoloji"],
        kind: "cheatsheet",
        provider: "aurelia",
        bytes: 100,
        topicIds: ["detail-10"],
      },
      {
        id: "test-mixed-biology",
        name: "biology.pdf",
        subjectIds: ["tyt-biyoloji"],
        kind: "mixed",
        provider: "mebi",
        bytes: samplePdf(true).length,
      },
      {
        id: "test-other-subject",
        name: "math-sheet.pdf",
        subjectIds: ["tyt-matematik"],
        kind: "cheatsheet",
        provider: "aurelia",
        bytes: 100,
      },
    ],
  };
  await page.locator('input[accept="application/json,.json"]').setInputFiles({
    name: "catalogue.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(catalogue)),
  });
  await expect(page.locator(".source-status")).toContainText(
    "Ayrılmış kaynaklar",
  );
  await page.locator('input[accept="application/pdf,.pdf"]').setInputFiles([
    {
      name: "cell-sheet.pdf",
      mimeType: "application/pdf",
      buffer: samplePdf(),
    },
    {
      name: "biology.pdf",
      mimeType: "application/pdf",
      buffer: samplePdf(true),
    },
  ]);
  await expect(page.locator(".import-report")).toContainText(
    "2 yeni dosya eklendi",
  );
  for (const route of ["Konu Anlatımı", "Sorular"]) {
    await page
      .locator(".sidebar")
      .getByRole("button", { name: route, exact: true })
      .click();
    const subject = page.getByRole("button", { name: /Biyoloji.*18/ });
    if ((await subject.getAttribute("aria-expanded")) !== "true")
      await subject.click();
    await expect(page.locator(".source-rows")).toContainText("biology.pdf");
    await expect(page.locator("main")).not.toContainText("cell-sheet.pdf");
    await expect(page.locator("main")).not.toContainText("dna-sheet.pdf");
    await expect(
      page.getByText("Kopya kâğıdı alt başlıkları", { exact: false }),
    ).toHaveCount(0);
  }
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Kopya Kağıtları", exact: true })
    .click();
  await expect(
    page.locator('.sidebar nav button[aria-current="page"]'),
  ).toHaveText("Kopya Kağıtları");
  await page.getByRole("button", { name: /Biyoloji.*konu başlığı/ }).click();
  await page
    .getByRole("button", {
      name: "Dersteki tüm kopya kağıdı PDF’leri",
      exact: true,
    })
    .click();
  await expect(page.locator(".source-rows")).toContainText("cell-sheet.pdf");
  await expect(page.locator(".source-rows")).toContainText("dna-sheet.pdf");
  await expect(page.locator("main")).not.toContainText("biology.pdf");
  await expect(page.locator("main")).not.toContainText("math-sheet.pdf");
  await page
    .getByRole("button", { name: "Hücre Organelleri", exact: true })
    .click();
  await expect(page.locator(".source-rows li")).toHaveCount(1);
  await expect(page.locator(".source-rows")).toContainText("cell-sheet.pdf");
  await context.setOffline(true);
  await page.getByRole("button", { name: "PDF’yi aç", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Hücre kopya kağıdı notum.");
  await page.getByRole("button", { name: "Kapat", exact: true }).click();
  await expect(
    page.getByText("Bu cihazda kaydedildi", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Kopya Kağıtları", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Biyoloji.*konu başlığı/ }).click();
  await page
    .getByRole("button", { name: "Hücre Organelleri", exact: true })
    .click();
  await page.getByRole("button", { name: "PDF’yi aç", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Hücre kopya kağıdı notum.");
  await page.getByRole("button", { name: "Kapat", exact: true }).click();
  await page
    .getByRole("button", { name: "Nükleik Asitler DNA ve RNA", exact: true })
    .click();
  await expect(page.locator(".source-rows")).toContainText("dna-sheet.pdf");
  await expect(
    page.getByRole("button", { name: "PDF’yi aç", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Drive’da aç (internet)", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Bugün", exact: true }).click();
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await page
    .getByRole("button", { name: "Kaldığın yerden devam et", exact: true })
    .click();
  await expect(page.locator(".answer").nth(1)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Soru taslağım korunmalı.");
});

test("YKS-008 cheatsheet topic search and manual PDFs remain usable at narrow scale without clipping", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.getByRole("button", { name: "Kütüphane", exact: true }).click();
  await page
    .locator(".import-options select")
    .nth(0)
    .selectOption("tyt-biyoloji");
  await page
    .locator(".import-options select")
    .nth(1)
    .selectOption("cheatsheet");
  await page.locator('input[accept="application/pdf,.pdf"]').setInputFiles({
    name: "Hücre Organelleri - Kopya Kağıdı.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(),
  });
  await expect(page.locator(".import-report")).toContainText(
    "1 yeni dosya eklendi",
  );
  await context.setOffline(true);
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await page.setViewportSize({ width: 320, height: 844 });
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Kopya Kağıtları", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("hücre organelleri");
  await expect(page.locator(".subject-panel")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Hücre Organelleri", exact: true })
    .click();
  await expect(page.locator(".source-rows")).toContainText(
    "Hücre Organelleri - Kopya Kağıdı.pdf",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(321);
  await context.setOffline(true);
  await page.getByRole("button", { name: "PDF’yi aç", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("button", { name: "Kapat", exact: true }).click();
  const violations = (
    await new AxeBuilder({ page }).include("main").analyze()
  ).violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(violations).toEqual([]);
  await page.getByRole("button", { name: /Biyoloji.*konu başlığı/ }).click();
  await expect(
    page.getByRole("button", { name: "Hücre Organelleri", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("olmayan-konu");
  await expect(page.locator(".subject-panel")).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("asit");
  await expect(page.locator(".subject-panel")).toHaveCount(3);
  await page
    .getByRole("button", {
      name: "Dersteki tüm kopya kağıdı PDF’leri",
      exact: true,
    })
    .first()
    .click();
  await expect(page.locator(".source-browser")).toHaveCount(1);
  await expect(
    page.locator('.subject-header[aria-expanded="true"]'),
  ).toHaveCount(1);
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("");
  await page.getByRole("button", { name: "AYT", exact: true }).click();
  await expect(page.locator(".subject-panel")).toHaveCount(5);
  await page.getByRole("button", { name: /Matematik.*konu başlığı/ }).click();
  await page
    .getByRole("button", { name: "Alan ve Riemann", exact: true })
    .click();
  await expect(page.locator(".source-browser")).toContainText(
    "Eşleşmiş PDF bulunamadı",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(321);
  await page
    .getByRole("button", { name: "PDF veya kaynak kataloğu ekle", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Kütüphane", exact: true }),
  ).toBeVisible();
});
