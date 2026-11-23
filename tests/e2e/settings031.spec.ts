import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { setThemePreference } from "./helpers/theme";

registerOfflineBootDiagnostics();
test.use({ locale: "tr-TR", timezoneId: "Pacific/Kiritimati" });

async function settings(page: Page) {
  await page.goto("/#/settings");
  await expect(
    page.getByRole("heading", { name: "Ayarlar", exact: true }),
  ).toBeVisible();
}

async function saved(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
}

async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("state");
          const read = tx.objectStore("state").get("current");
          read.onsuccess = () => resolve(read.result);
          tx.oncomplete = () => db.close();
          tx.onabort = () => {
            db.close();
            reject(tx.error);
          };
        };
      }),
  );
}

async function patchStored(
  page: Page,
  settingsPatch: Record<string, unknown>,
  addHistory = false,
) {
  await saved(page);
  await page.evaluate(
    ({ settingsPatch, addHistory }) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("state", "readwrite");
          const store = tx.objectStore("state");
          const read = store.get("current");
          read.onsuccess = () => {
            const state = read.result;
            if (!state) return tx.abort();
            state.settings = { ...state.settings, ...settingsPatch };
            if (addHistory) {
              state.notes = { personal: "Notum korunmalı: ÇĞİÖŞÜ ve π." };
              state.topicProgress = {
                "detail-139": { theory: "2026-11-14" },
              };
              state.explorations = {
                personal: { selected: 2, showLabels: true },
              };
            }
            store.put(state, "current");
          };
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onabort = () => {
            db.close();
            reject(tx.error ?? Error("SETTINGS_FIXTURE_ABORTED"));
          };
        };
      }),
    { settingsPatch, addHistory },
  );
}

test("031 current and Matrix themes preserve custom dates, independent settings and learning records offline", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(120_000);
  await settings(page);
  const date = page.getByRole("textbox", {
    name: "Hedef sınav tarihi",
    exact: true,
  });
  await expect(date).toHaveValue("28/02/2027");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByText(/bu resmî YKS tarihi değildir/)).toBeVisible();
  const themes = page.getByRole("group", { name: "Tema", exact: true });
  await expect(themes.getByRole("button")).toHaveText([
    "Mevcut tema",
    "Matrix",
    "Axolotl pembesi",
    "Trans bayrağı",
  ]);
  await expect(
    themes.getByRole("button", { name: "Mevcut tema", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await date.fill("25/05/2027");
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("135");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("145");
  await page.getByRole("switch", { name: /^Aion animasyonu/ }).uncheck();
  await saved(page);
  await patchStored(page, {}, true);
  await page.reload();
  await expect(date).toHaveValue("25/05/2027");
  const before = await stored(page);
  const matrix = themes.getByRole("button", { name: "Matrix", exact: true });
  await matrix.focus();
  await expect(matrix).toBeFocused();
  await page.keyboard.press("Space");
  await expect(matrix).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "matrix");
  await saved(page);
  expect(await stored(page)).toEqual({
    ...before,
    settings: { ...before.settings, theme: "matrix" },
  });
  await page.screenshot({
    path: testInfo.outputPath("matrix-settings.png"),
    fullPage: true,
  });
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
  await context.setOffline(true);
  await page.reload();
  await expect(date).toHaveValue("25/05/2027");
  await expect(matrix).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-font", "lexend");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "off");
  await expect(page.getByLabel("Arayüz ölçeği %", { exact: true })).toHaveValue(
    "135",
  );
  await expect(
    page.getByLabel("Yalnızca yazı boyutu %", { exact: true }),
  ).toHaveValue("145");
  const current = themes.getByRole("button", {
    name: "Mevcut tema",
    exact: true,
  });
  await current.focus();
  await page.keyboard.press("Enter");
  await expect(current).toHaveAttribute("aria-pressed", "true");
  await saved(page);
  expect(await stored(page)).toEqual(before);

  await setThemePreference(page, "matrix");
  await page.getByRole("switch", { name: /^Zamanlayıcılar/ }).uncheck();
  await saved(page);
  const beforeReset = await stored(page);
  await page.getByRole("button", { name: "Varsayılan görünüme dön", exact: true }).press("Enter");
  await expect(current).toHaveAttribute("aria-pressed", "true");
  await saved(page);
  await page.reload();
  await expect(current).toHaveAttribute("aria-pressed", "true");
  expect(await stored(page)).toEqual({
    ...beforeReset,
    settings: { ...beforeReset.settings, theme: "dark", scale: 100, textSize: 100, font: "system", motion: true },
  });
});

test("an unset saved theme defaults to the current theme without replacing existing notes or study records", async ({
  page,
}) => {
  await settings(page);
  await page.getByRole("button", { name: "Mevcut tema", exact: true }).click();
  await patchStored(page, { theme: undefined }, true);
  const before = await stored(page);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await stored(page)).toEqual({
    ...before,
    settings: { ...before.settings, theme: "dark" },
  });
});

for (const theme of ["light", "system", "contrast"] as const)
  test(`031 saved ${theme} preference is preserved until an explicit theme choice`, async ({
    page,
  }) => {
    await settings(page);
    await page
      .getByRole("textbox", { name: "Hedef sınav tarihi", exact: true })
      .fill("18/06/2027");
    await saved(page);
    await setThemePreference(page, theme);
    const before = await stored(page);
    await expect(
      page.getByText(/Önceden kaydettiğin tema korunuyor/),
    ).toBeVisible();
    await expect(
      page
        .getByRole("group", { name: "Tema", exact: true })
        .getByRole("button"),
    ).toHaveCount(4);
    await expect(
      page.getByRole("textbox", { name: "Hedef sınav tarihi", exact: true }),
    ).toHaveValue("18/06/2027");
    expect((await stored(page)).settings.theme).toBe(theme);
    await setThemePreference(page, "dark");
    expect(await stored(page)).toEqual({
      ...before,
      settings: { ...before.settings, theme: "dark" },
    });
  });

for (const examDate of ["", undefined])
  test(`031 an unset target (${String(examDate)}) migrates without changing the saved theme or history`, async ({
    page,
  }) => {
    await settings(page);
    await setThemePreference(page, "matrix");
    await patchStored(page, { examDate }, true);
    const before = await stored(page);
    await page.reload();
    await expect(
      page.getByRole("textbox", { name: "Hedef sınav tarihi", exact: true }),
    ).toHaveValue("28/02/2027");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "matrix");
    expect(await stored(page)).toEqual({
      ...before,
      settings: { ...before.settings, examDate: "2027-02-28" },
    });
  });

test("031 Matrix remains readable and keyboard usable at 320px and 200 percent scale", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await settings(page);
  await setThemePreference(page, "matrix");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await saved(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  const labels = await page.locator(".theme-choice").evaluateAll((buttons) =>
    buttons.map((button) => {
      const text = [...button.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      )!;
      const range = document.createRange();
      range.selectNodeContents(text);
      return { text: text.textContent, lines: range.getClientRects().length };
    }),
  );
  for (const label of labels) {
    expect(label.lines).toBeGreaterThan(0);
    expect(
      label.lines,
      `${label.text} stays readable without letter-by-letter wrapping`,
    ).toBeLessThanOrEqual(2);
  }
  const dateFit = await page
    .getByRole("textbox", {
      name: "Hedef sınav tarihi",
      exact: true,
    })
    .evaluate((element: HTMLInputElement) => {
      const style = getComputedStyle(element);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      return {
        needed: context.measureText(element.value).width,
        available:
          element.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight),
      };
    });
  expect(dateFit.available).toBeGreaterThanOrEqual(dateFit.needed);
  const current = page
    .getByRole("group", { name: "Tema", exact: true })
    .getByRole("button", { name: "Mevcut tema", exact: true });
  await current.focus();
  // Programmatic focus after a pointer interaction does not enter keyboard
  // modality. Navigate away and back exactly as a keyboard user would.
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(current).toBeFocused();
  const focus = await current.evaluate(
    (element) => getComputedStyle(element).outlineStyle,
  );
  expect(focus).not.toBe("none");
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("matrix-settings-mobile.png"),
    fullPage: true,
  });
});
