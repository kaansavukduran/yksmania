import { expect, type Page } from "@playwright/test";

/** New themes are selected through the actual UI. Old explicit themes are
 * restored as existing preferences so their visual regressions stay covered
 * even though they are no longer offered as new theme choices. */
export async function setThemePreference(
  page: Page,
  theme: "dark" | "matrix" | "light" | "system" | "contrast",
) {
  const isCurrentChoice = theme === "dark" || theme === "matrix";
  await page
    .getByRole("group", { name: "Tema", exact: true })
    .getByRole("button", {
      name: theme === "matrix" ? "Matrix" : "Mevcut tema",
      exact: true,
    })
    .click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  if (!isCurrentChoice) {
    await page.evaluate(
      (preference) =>
        new Promise<void>((resolve, reject) => {
          const request = indexedDB.open("yksmania", 2);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction("state", "readwrite");
            tx.oncomplete = () => {
              db.close();
              resolve();
            };
            tx.onabort = () => {
              db.close();
              reject(tx.error ?? Error("THEME_FIXTURE_ABORTED"));
            };
            const store = tx.objectStore("state");
            const read = store.get("current");
            read.onsuccess = () => {
              if (!read.result) {
                tx.abort();
                return;
              }
              store.put(
                {
                  ...read.result,
                  settings: { ...read.result.settings, theme: preference },
                },
                "current",
              );
            };
          };
        }),
      theme,
    );
    await page.reload();
  }
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
}
