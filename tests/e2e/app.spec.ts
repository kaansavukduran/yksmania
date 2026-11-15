import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function open(page: Page) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
}
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function openSheet(page: Page, title: string) {
  await nav(page, "Kopya Kağıtları");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  await page
    .locator(".cheatsheet-topic")
    .filter({ hasText: title })
    .first()
    .click();
  await expect(page.locator(".cheat-reader")).toBeVisible();
}
async function offlineReady(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          { once: true },
        ),
      );
  });
}
async function start(page: Page) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  const subject = page.getByRole("button", { name: /Matematik.*31/ });
  if ((await subject.getAttribute("aria-expanded")) !== "true")
    await subject.click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  // Theory and practice both have a "Notun" field. Await the question page so
  // subsequent note edits belong to the answer draft, not the departing theory.
  await expect(page.locator(".question-panel")).toBeVisible();
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

test("built-in cheatsheet first opens offline with retained notes and no learning credit or material upload", async ({
  page,
  context,
}) => {
  await open(page);
  await offlineReady(page);
  await context.setOffline(true);
  await openSheet(page, "Rasyonel Sayılar");
  await expect(page.locator(".cheat-reader")).toContainText(/payda/i);
  await expect(page.locator('input[accept*="pdf"]')).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Hazır kağıt notum kaybolmasın.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await openSheet(page, "Rasyonel Sayılar");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Hazır kağıt notum kaybolmasın.");
  await nav(page, "Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("0/479");
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
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
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
  expect(labels.indexOf("Sınavlar")).toBe(labels.indexOf("Sorular") + 1);
  await page
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: /Matematik.*31/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
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

test("every main learning route is ready to use without PDF or catalogue import controls", async ({
  page,
}) => {
  await open(page);
  for (const name of [
    "Konu Anlatımı",
    "Kopya Kağıtları",
    "Sorular",
    "Sınavlar",
    "Ayarlar",
  ]) {
    await nav(page, name);
    await expect(page.locator('input[accept*="pdf"]')).toHaveCount(0);
    await expect(
      page.getByRole("button", {
        name: /Kaynak dosyalarını yönet|PDF.*ekle|kaynak kataloğu ekle/,
      }),
    ).toHaveCount(0);
  }
  for (const route of ["sources", "library"]) {
    await page.goto(`/#/${route}`);
    await expect(
      page.getByRole("heading", { name: "Konu Anlatımı", exact: true }),
    ).toBeVisible();
    await expect(page.locator('input[accept*="pdf"]')).toHaveCount(0);
  }
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
  const legacy = await page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const req = indexedDB.open("yksmania");
        req.onsuccess = () => {
          const db = req.result,
            tx = db.transaction(["documents", "state"]),
            r = tx.objectStore("documents").get("legacy-pdf"),
            state = tx.objectStore("state").get("current");
          tx.oncomplete = async () => {
            resolve({
              name: r.result.name,
              bytes: await r.result.blob.text(),
              note: state.result.notes["legacy-pdf"],
            });
            db.close();
          };
          tx.onerror = () => reject(tx.error);
        };
        req.onerror = () => reject(req.error);
      }),
  );
  expect(legacy).toEqual({
    name: "legacy.pdf",
    bytes: "%PDF-1.4",
    note: "Eski PDF notu",
  });
  await nav(page, "Ayarlar");
  await expect(
    page.getByRole("button", { name: "Kaynak dosyalarını yönet", exact: true }),
  ).toHaveCount(0);
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
    const { article, notes, layout } = await page.evaluate(() => ({
      article: document
        .querySelector(".lesson-article")
        ?.getBoundingClientRect()
        .toJSON(),
      notes: document
        .querySelector(".study-notes")
        ?.getBoundingClientRect()
        .toJSON(),
      layout: document
        .querySelector(".study-layout")
        ?.getBoundingClientRect()
        .toJSON(),
    }));
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
  await expect(page.locator(".question-panel")).toBeVisible();
  await expect(page.locator(".practice-note")).toBeVisible();
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const { panel, practiceNote } = await page.evaluate(() => ({
      panel: document
        .querySelector(".question-panel")
        ?.getBoundingClientRect()
        .toJSON(),
      practiceNote: document
        .querySelector(".practice-note")
        ?.getBoundingClientRect()
        .toJSON(),
    }));
    expect(panel).toBeDefined();
    expect(practiceNote).toBeDefined();
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

test("built-in cheatsheet notes belong to their topic and stay independent after offline reload", async ({
  page,
  context,
}) => {
  await open(page);
  await offlineReady(page);
  await openSheet(page, "Hücre Organelleri");
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Çekirdek ve ribozom ayrımı.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await openSheet(page, "Rasyonel Sayılar");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("");
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Payda sıfır olmaz.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await openSheet(page, "Hücre Organelleri");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Çekirdek ve ribozom ayrımı.");
  await openSheet(page, "Rasyonel Sayılar");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Payda sıfır olmaz.");
});

test("pixel atlas keeps all 32 planted-foot anchors; pointer and click change poses without actor drift", async ({
  page,
}) => {
  await open(page);
  const metadata = await import("../../src/data/aion-pixel-atlas.json", {
    with: { type: "json" },
  });
  const info = await page
    .locator(".hero .aion-texture")
    .evaluate(async (e, atlas) => {
      const src = getComputedStyle(e).backgroundImage.slice(5, -2),
        im = new Image();
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
      const cw = im.width / 8,
        ch = im.height / 4,
        anchors = [];
      for (let f = 0; f < 32; f++) {
        const ox = Math.round((f % 8) * cw),
          oy = Math.round(Math.floor(f / 8) * ch);
        let foot = -1;
        for (let y = Math.floor(ch * 0.73); y < Math.floor(ch * 0.98); y++) {
          let count = 0;
          for (let x = Math.floor(cw * 0.13); x < Math.floor(cw * 0.56); x++) {
            const k = ((oy + y) * im.width + ox + x) * 4,
              [r, g, b, a] = pixels.slice(k, k + 4);
            if (
              r > 160 &&
              g > 35 &&
              g < 180 &&
              b > 60 &&
              b < 210 &&
              r > g * 1.25 &&
              b < r * 0.95 &&
              a > 235
            )
              count++;
          }
          if (count >= 4) foot = y;
        }
        anchors.push(foot + (oy - Math.floor(f / 8) * ch) + atlas.frames[f].y);
      }
      return {
        width: im.width,
        height: im.height,
        anchors,
        rendering: getComputedStyle(e).imageRendering,
      };
    }, metadata.default);
  expect(info.width).toBe(metadata.default.width);
  expect(info.height).toBe(metadata.default.height);
  expect(info.anchors).toHaveLength(32);
  expect(Math.max(...info.anchors) - Math.min(...info.anchors)).toBeLessThan(
    0.01,
  );
  expect(info.rendering).toBe("pixelated");
  const actor = page.locator(".hero .aion-sprite"),
    button = page.getByRole("button", {
      name: "Aion ile etkileş",
      exact: true,
    });
  const before = await actor.boundingBox();
  await button.click();
  await expect.poll(() => actor.getAttribute("data-reaction")).not.toBe("idle");
  const first = await actor.getAttribute("data-reaction");
  await button.click();
  await expect.poll(() => actor.getAttribute("data-reaction")).not.toBe(first);
  await expect
    .poll(() => actor.getAttribute("data-reaction"), { timeout: 4000 })
    .toBe("idle");
  await page.mouse.move(before!.x - 80, before!.y + before!.height * 0.35);
  await expect(actor).toHaveAttribute("data-frame", "11");
  expect(await actor.boundingBox()).toEqual(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(actor).toHaveAttribute("data-frame", "0");
  await expect(button).toBeDisabled();
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

test("YKS-008 separate native cheatsheets keep a saved question draft and notes offline", async ({
  page,
  context,
}) => {
  await open(page);
  await offlineReady(page);
  await start(page);
  await page.locator(".answer").nth(1).click();
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Soru taslağı korunmalı.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await openSheet(page, "Hücre Organelleri");
  await expect(page.locator(".cheat-reader")).toContainText(/ribozom/i);
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Kağıt notu ayrı kalmalı.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await nav(page, "Bugün");
  await page
    .getByRole("button", { name: "Kaldığın yerden devam et", exact: true })
    .click();
  await expect(page.locator(".answer").nth(1)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Soru taslağı korunmalı.");
  await openSheet(page, "Hücre Organelleri");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Kağıt notu ayrı kalmalı.");
});

test("YKS-008 built-in sheet search and notes remain usable at 320px and large independent scales offline", async ({
  page,
  context,
}) => {
  await open(page);
  await offlineReady(page);
  await nav(page, "Ayarlar");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.setViewportSize({ width: 320, height: 844 });
  await context.setOffline(true);
  await openSheet(page, "Hücre Organelleri");
  await expect(page.locator(".cheat-reader")).toContainText(/ribozom/i);
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Küçük ekranda yerel not.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  for (const size of [
    { width: 320, height: 844 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(size);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await page.reload();
  await openSheet(page, "Hücre Organelleri");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Küçük ekranda yerel not.");
  expect(
    (
      await new AxeBuilder({ page }).include("main").analyze()
    ).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});
