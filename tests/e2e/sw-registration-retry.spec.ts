import { expect, test, type Page } from "@playwright/test";
import { storage } from "./helpers/revisedCourse";
import { setThemePreference } from "./helpers/theme";

async function rejectInitialRegistrations(page: Page, failures: number) {
  await page.addInitScript((count) => {
    const state = window as Window & { workerRegistrationAttempts?: number };
    const worker = navigator.serviceWorker;
    const register = worker.register.bind(worker);
    state.workerRegistrationAttempts = 0;
    worker.register = (...args) => {
      const attempt = ++state.workerRegistrationAttempts!;
      return attempt <= count
        ? Promise.reject(new TypeError("Temporary failure fetching sw.js"))
        : register(...args);
    };
  }, failures);
}

const registrationAttempts = (page: Page) => page.evaluate(
  () => (window as Window & { workerRegistrationAttempts?: number }).workerRegistrationAttempts,
);

test("a failed initial worker registration recovers without reloading the app", async ({ page, context }) => {
  await rejectInitialRegistrations(page, 1);
  const originalNavigation = await page.goto("./#/settings");
  expect(originalNavigation?.fromServiceWorker()).toBe(false);
  await setThemePreference(page, "light");
  await expect.poll(() => registrationAttempts(page)).toBe(2);
  await page.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated");
  const before = await storage(page);
  expect(before.settings.theme).toBe("light");
  await context.setOffline(true);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(page.getByText("ÖSYM Mania bir Fragaria Interactive projesidir.", { exact: true })).toBeVisible();
  expect((await storage(page)).settings.theme).toBe("light");
});

test("persistent worker registration failure ends after two retries", async ({ page }) => {
  await rejectInitialRegistrations(page, 99);
  await page.goto("./#/settings");
  await expect.poll(() => registrationAttempts(page)).toBe(3);
  await page.waitForTimeout(1500);
  expect(await registrationAttempts(page)).toBe(3);
  expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
  await setThemePreference(page, "light");
  expect((await storage(page)).settings.theme).toBe("light");
});

// Bir önbellek dosyası ilk kurulumda kalıcı hata verirse işçi "redundant" olur ve
// register() başarılı göründüğü için kayıt hatası tetiklenmez. Sayfa yenilenmeden
// aynı oturumda yeniden kurulum denenmeli.
test("a failed first install recovers on the same page without reloading", async ({ page, context }) => {
  let failures = 0;
  await context.route(/\/assets\/index-[^/]+\.css$/, async (route) => {
    const fromWorker = route.request().serviceWorker() !== null;
    if (fromWorker && failures < 1) {
      failures++;
      await route.fulfill({ status: 404, body: "" });
      return;
    }
    await route.continue();
  });
  const originalNavigation = await page.goto("./#/settings");
  expect(originalNavigation?.fromServiceWorker()).toBe(false);
  await setThemePreference(page, "light");
  await page.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated");
  expect(failures).toBe(1);
  await context.setOffline(true);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(page.getByText("ÖSYM Mania bir Fragaria Interactive projesidir.", { exact: true })).toBeVisible();
  expect((await storage(page)).settings.theme).toBe("light");
});

test("a persistently failing install stops after two same-page retries and the app keeps saving", async ({ page, context }) => {
  test.setTimeout(90_000);
  let installs = 0;
  await context.route(/\/assets\/index-[^/]+\.css$/, async (route) => {
    if (route.request().serviceWorker() === null) return route.continue();
    installs++;
    await route.fulfill({ status: 404, body: "" });
  });
  await page.goto("./#/settings");
  // Each attempt starts a full precache install before the missing stylesheet
  // fails; on shared CI runners three attempts can take longer than 5 s.
  await expect.poll(() => installs, { timeout: 30_000 }).toBe(3);
  await page.waitForTimeout(2500);
  expect(installs).toBe(3);
  expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull();
  await setThemePreference(page, "light");
  expect((await storage(page)).settings.theme).toBe("light");
});
