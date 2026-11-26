import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { geometrySummary024Inventory } from "./visual-geometry024-inventory";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { setThemePreference } from "./helpers/theme";

registerOfflineBootDiagnostics();
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

const geometry = geometrySummary024Inventory;

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("state");
          const read = tx.objectStore("state").get("current");
          read.onsuccess = () => resolve(read.result);
          tx.oncomplete = () => db.close();
          tx.onabort = () => reject(tx.error);
        };
      }),
  );
}

// Exploration may persist its controls; it must not rewrite any learning record.
function withoutExploration(state: AppState) {
  const { explorations: _explorations, ...otherRecords } = state;
  return otherRecords;
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

async function openSheet(page: Page, id: string) {
  const sheet = geometry.find((candidate) => candidate.lessonId === id);
  expect(sheet, `Geometry summary ${id} must remain available`).toBeDefined();
  await page.goto(`/#/cheatsheets?topic=${encodeURIComponent(sheet!.topicId)}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    sheet!.title,
  );
  const model = page.locator(`[data-cheat-model="${id}"]`);
  // Lucide icons and the companion are not teaching figures.
  await expect(model.locator('svg[role="img"]').first()).toBeVisible();
  return model;
}

async function accessible(root: string, page: Page) {
  const result = await new AxeBuilder({ page }).include(root).analyze();
  expect(
    result.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
}

test("024 every geometry summary exposes its own teaching figure offline; changing geometry preserves notes and learning", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  expect(geometry.length).toBeGreaterThanOrEqual(19);
  expect(geometry.map((sheet) => sheet.lessonId)).toEqual(
    expect.arrayContaining([
      "alan-donusumleri",
      "tyt-geo-dik-ucgen-031",
      "tyt-geo-cokgenler-032",
      "donusum-oteleme-donme",
      "donusum-yansima-simetri",
      "cemberin-analitigi",
      "dogrunun-analitigi",
      "noktanin-analitigi",
    ]),
  );
  await page.goto("/#/settings");
  await setThemePreference(page, "matrix");
  const area = await openSheet(page, "alan-donusumleri");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "matrix");
  const note = page.locator(".cheat-note").getByRole("textbox");
  await note.fill("Şekil değişse de kişisel alan notum korunmalı.");
  await expect
    .poll(
      async () =>
        (await stored(page))?.notes["cheatsheet:lesson:alan-donusumleri"],
    )
    .toBe(await note.inputValue());
  const before = await stored(page);
  await offlineReady(page);
  await context.setOffline(true);
  for (const sheet of geometry) {
    const previous = await stored(page);
    const model = await openSheet(page, sheet.lessonId!);
    await expect(model.locator('svg[role="img"]').first()).toHaveAccessibleName(
      /\S/,
    );
    expect(await stored(page)).toEqual(previous);
  }
  await openSheet(page, "alan-donusumleri");
  await area.getByRole("button", { name: "Üçgen", exact: true }).click();
  await area.getByRole("slider", { name: /^Taban b:/ }).fill("10");
  await area.getByRole("slider", { name: /^Dik yükseklik h:/ }).fill("6");
  await expect(area.locator(".area-result")).toContainText("30");
  await accessible(".cheat-reader", page);

  const right = await openSheet(page, "tyt-geo-dik-ucgen-031");
  const initial = await right.locator('svg[role="img"]').innerHTML();
  await right
    .getByRole("slider", { name: "AB dik kenarı", exact: true })
    .fill("3");
  await right
    .getByRole("slider", { name: "AC dik kenarı", exact: true })
    .fill("4");
  for (let i = 0; i < 3; i++)
    await right
      .getByRole("button", { name: "Sonraki adım", exact: true })
      .click();
  await expect(right.locator('svg[role="img"]')).toHaveAccessibleName(
    /AB 3, AC 4, BC 5 birim.*AH yüksekliği 2,4, BH 1,8, HC 3,2/,
  );
  expect(await right.locator('svg[role="img"]').innerHTML()).not.toBe(initial);

  const polygon = await openSheet(page, "tyt-geo-cokgenler-032");
  await polygon
    .getByRole("slider", { name: "Kenar sayısı", exact: true })
    .fill("6");
  await polygon
    .getByRole("button", { name: "Bütün köşegenler", exact: true })
    .click();
  await expect(polygon.locator("dl")).toContainText("6 × (6 − 3) / 2 = 9");
  await expect(polygon.locator(".g032-helper")).toHaveCount(9);
  await page.screenshot({ path: testInfo.outputPath("geometry-summary.png") });
  await expect
    .poll(async () => withoutExploration(await stored(page)))
    .toEqual(withoutExploration(before));
  const saved = await stored(page);
  await page.reload();
  await expect(polygon.locator(".g032-helper")).toHaveCount(9);
  expect(await stored(page)).toEqual(saved);
  await openSheet(page, "alan-donusumleri");
  await expect(note).toHaveValue(
    "Şekil değişse de kişisel alan notum korunmalı.",
  );
  await expect(area.locator(".area-result")).toContainText("30");
  expect(errors).toEqual([]);
});

for (const scenario of [
  {
    id: "devrimler-caginda-devlet-toplum",
    prefix: "011",
    next: "Sonraki bağlantı",
    reason: "Gerekçen",
    result: "1839 Tanzimat",
  },
  {
    id: "milli-mucadele",
    prefix: "012",
    next: "Sonraki kanıt",
    reason: "Kanıttan gerekçen",
    result: "Ortak yönetim millî hareketin bütününe yayılır.",
  },
] as const) {
  test(`024 ${scenario.id}: visible event cards support keyboard, reset transient answers, and survive offline at 320px`, async ({
    page,
    context,
  }, testInfo) => {
    test.setTimeout(90_000);
    await page.goto("/#/settings");
    await setThemePreference(page, "matrix");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "matrix");
    await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
    await page
      .getByLabel("Yalnızca yazı boyutu %", { exact: true })
      .fill("150");
    await expect
      .poll(async () => (await stored(page))?.settings.textSize)
      .toBe(150);
    const before = await stored(page);
    await page.setViewportSize({ width: 320, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/#/lesson?id=${scenario.id}`);
    const lab = page.locator(`[data-forge${scenario.prefix}="${scenario.id}"]`);
    const choices = lab.getByRole("group", {
      name: "İncelenecek olay",
      exact: true,
    });
    await expect(lab.getByRole("combobox")).toHaveCount(0);
    await expect(choices.getByRole("button").first()).toBeVisible();
    const target = choices.getByRole("button").nth(1);
    if (scenario.prefix === "012")
      await expect(target).toHaveAccessibleName(
          "4–11 Eylül 1919 Sivas Kongresi",
      );
    await target.focus();
    await target.press("Enter");
    await expect(target).toHaveAttribute("aria-pressed", "true");
    await lab.getByRole("radio").first().check();
    await lab
      .getByRole("textbox", { name: scenario.reason, exact: true })
      .fill("Kanıtı kendi gerekçemle karşılaştırdım.");
    await lab
      .getByRole("button", {
        name: "Yorumumu kanıtla karşılaştır",
        exact: true,
      })
      .click();
    await expect(lab.locator(`.h${scenario.prefix}-feedback`)).toBeVisible();
    await choices.getByRole("button").first().click();
    await expect(
      lab.getByRole("textbox", { name: scenario.reason, exact: true }),
    ).toHaveValue("");
    await expect(lab.getByRole("radio", { checked: true })).toHaveCount(0);
    await expect(lab.locator(`.h${scenario.prefix}-feedback`)).toHaveCount(0);
    await target.click();
    for (let i = 0; i < 2; i++)
      await lab
        .getByRole("button", { name: scenario.next, exact: true })
        .click();
    await expect(lab.locator("[data-model-result]")).toContainText(
      scenario.result,
    );
    if (scenario.prefix === "011") {
      await lab
        .getByRole("checkbox", {
          name: "İkinci belgeyle karşılaştır",
          exact: true,
        })
        .check();
      const comparison = lab
        .getByRole("group", { name: "Karşılaştırılan belge", exact: true })
        .getByRole("button")
        .nth(2);
      await comparison.focus();
      await comparison.press("Space");
      await expect(comparison).toHaveAttribute("aria-pressed", "true");
    }
    const boxes = await choices.getByRole("button").evaluateAll((nodes) =>
      nodes.map((node) => {
        const box = node.getBoundingClientRect();
        return {
          x: box.x,
          right: box.right,
          width: box.width,
          height: box.height,
          motion: getComputedStyle(node).transitionDuration,
        };
      }),
    );
    for (const box of boxes) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(320);
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.motion).toBe("0s");
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await accessible(".history-event-choices", page);
    await target.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: testInfo.outputPath("visible-events-320.png"),
    });
    await expect
      .poll(async () => withoutExploration(await stored(page)))
      .toEqual(withoutExploration(before));
    const saved = await stored(page);
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await expect(target).toHaveAttribute("aria-pressed", "true");
    await expect(lab.locator("[data-model-result]")).toContainText(
      scenario.result,
    );
    expect(await stored(page)).toEqual(saved);
  });
}
