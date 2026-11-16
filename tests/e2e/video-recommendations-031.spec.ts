import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { setThemePreference } from "./helpers/theme";

registerOfflineBootDiagnostics();

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise<AppState>((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const read = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          read.onerror = () => {
            db.close();
            reject(read.error);
          };
          read.onsuccess = () => {
            db.close();
            resolve(read.result);
          };
        };
      }),
  );
}
function evidence(state: AppState) {
  return {
    sessions: state.sessions,
    reviews: state.reviews,
    topicProgress: state.topicProgress,
    theoryReviewCompletions: state.theoryReviewCompletions,
    unlocked: state.unlocked,
    notes: state.notes,
    draft: state.draft,
    settings: state.settings,
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
          { once: true },
        ),
      );
  });
}

for (const profile of [
  { name: "desktop", width: 1280, height: 900, theme: "dark" as const },
  {
    name: "320px Matrix touch",
    width: 320,
    height: 900,
    theme: "matrix" as const,
  },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: profile.height },
      hasTouch: profile.width === 320,
      locale: "tr-TR",
      timezoneId: "Europe/Istanbul",
      reducedMotion: "reduce",
    });

    test("source safety roles, keyboard alternatives and external opening leave learning intact", async ({
      page,
      context,
    }, testInfo) => {
      test.setTimeout(60_000);
      const externalRequests: string[] = [];
      page.on("request", (request) => {
        if (request.url().includes("youtube.com"))
          externalRequests.push(request.url());
      });
      await page.goto("/#/settings");
      await setThemePreference(page, profile.theme);
      await page.goto("/#/lesson?id=kimya-guvenlik");
      const videos = page.locator('[data-video-lesson031="kimya-guvenlik"]');
      await expect(videos).toBeVisible();
      await expect(videos.locator(".video-preferred031 a")).toHaveCount(1);
      const preferred = videos.locator(".video-preferred031 a");
      await expect(preferred).toHaveAttribute(
        "href",
        "https://www.youtube.com/watch?v=3Xjb-ngc4uU",
      );
      await expect(preferred).toContainText("Levent Özdede");
      const alternatives = videos.locator("details");
      await expect(alternatives).not.toHaveAttribute("open", "");
      const summary = alternatives.locator("summary");
      await summary.focus();
      await summary.press("Enter");
      await expect(alternatives).toHaveAttribute("open", "");
      await expect(alternatives.locator("a")).toHaveCount(3);
      for (const [channel, url] of [
        ["Ferrum", "https://www.youtube.com/watch?v=U3sOJFCfZGE"],
        ["KİMYA ADASI", "https://www.youtube.com/watch?v=xZXcj2hml7c"],
        ["Hocalara Geldik", "https://www.youtube.com/watch?v=_zca7Jb4fdI"],
      ])
        await expect(
          alternatives.getByRole("link", { name: new RegExp(channel) }),
        ).toHaveAttribute("href", url);
      expect(externalRequests).toEqual([]);
      await expect(videos.locator("iframe, img, video")).toHaveCount(0);
      const before = evidence(await stored(page));
      const currentURL = page.url();
      // Intercept only the external destination: exercising a real anchor/popup
      // never depends on third-party video playback or network availability.
      await context.route("https://www.youtube.com/**", (route) =>
        route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "<!doctype html><title>External video link test</title>",
        }),
      );
      const popupPromise = page.waitForEvent("popup");
      await preferred.click();
      const popup = await popupPromise;
      await expect(popup).toHaveURL(
        "https://www.youtube.com/watch?v=3Xjb-ngc4uU",
      );
      await popup.close();
      expect(page.url()).toBe(currentURL);
      expect(evidence(await stored(page))).toEqual(before);
      const axe = await new AxeBuilder({ page })
        .include(".video-recommendations031")
        .analyze();
      await testInfo.attach("video-axe.json", {
        body: JSON.stringify(axe.violations),
        contentType: "application/json",
      });
      expect(axe.violations).toEqual([]);
      await videos.screenshot({
        path: testInfo.outputPath("video-safety.png"),
      });
      const bounds = await videos.locator("a").evaluateAll((links) =>
        links.map((link) => {
          const r = link.getBoundingClientRect();
          return { left: r.left, right: r.right, height: r.height };
        }),
      );
      expect(
        bounds.every(
          (r) => r.left >= 0 && r.right <= profile.width && r.height >= 44,
        ),
      ).toBe(true);
    });

    test("offline cold reload keeps the video catalogue, notes and study records available", async ({
      page,
      context,
    }) => {
      test.setTimeout(60_000);
      await page.goto("/#/settings");
      await setThemePreference(page, profile.theme);
      await page.goto("/#/lesson?id=kimya-guvenlik");
      const note = "Video seçimi ilerleme değildir. ÇĞİÖŞÜ 031.";
      await page
        .getByRole("textbox", { name: "Notun", exact: true })
        .fill(note);
      await expect
        .poll(async () => (await stored(page)).notes["lesson:kimya-guvenlik"])
        .toBe(note);
      await offlineReady(page);
      const before = evidence(await stored(page));
      await context.setOffline(true);
      await expect(page.locator(".video-connection031")).toContainText(
        "internet bağlantısı gerektirir",
      );
      // Real uncached requests must fail: navigator.onLine is a browser hint,
      // not evidence that this context can reach the network after a reload.
      const networkBlocked = () =>
        page.evaluate(async () => {
          try {
            await fetch(
              `/__video031_uncached_network_probe?nonce=${crypto.randomUUID()}`,
              {
                cache: "no-store",
              },
            );
            return false;
          } catch {
            return true;
          }
        });
      expect(await networkBlocked()).toBe(true);
      const response = await page.reload();
      expect(response?.fromServiceWorker()).toBe(true);
      const videos = page.locator('[data-video-lesson031="kimya-guvenlik"]');
      await expect(videos).toBeVisible();
      await expect(videos.locator(".video-connection031")).toContainText(
        "Çevrimdışıyken uygulamadaki anlatım ve sorularla çalışabilirsin.",
      );
      expect(await networkBlocked()).toBe(true);
      await videos.locator("summary").click();
      await expect(videos.locator("a")).toHaveCount(4);
      await expect(
        page.getByRole("textbox", { name: "Notun", exact: true }),
      ).toHaveValue(note);
      expect(evidence(await stored(page))).toEqual(before);
      await context.setOffline(false);
      await expect(videos.locator(".video-connection031")).toContainText(
        "Videolar YouTube’da açılır ve internet bağlantısı gerektirir.",
      );
    });
  });
}
