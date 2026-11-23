import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { setThemePreference } from "./helpers/theme";

registerOfflineBootDiagnostics();
const ids = [
  "temel-acilar",
  "ucgende-acilar",
  "ucgen-esitsizligi",
  "dik-ucgen",
  "eslik-benzerlik",
  "ucgen-merkezleri",
];
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
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
const learning = (s: AppState) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  notes: s.notes,
  draft: s.draft,
  unlocked: s.unlocked,
  examSessions: s.examSessions,
});
async function open(page: Page, id: string) {
  await page.goto(`/#/lesson?id=tyt-geo-${id}-031`);
  const lab = page.locator(".g031-lab");
  await expect(lab).toBeVisible();
  await expect(lab.locator("svg")).toHaveCount(1);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  return lab;
}
async function range(lab: Locator, name: string, target: number) {
  const input = lab.getByRole("slider", { name, exact: true });
  const min = Number(await input.getAttribute("min")),
    max = Number(await input.getAttribute("max"));
  const step = Number(await input.getAttribute("step")) || 1;
  const initial = Number(await input.inputValue());
  const choices = [
    { n: initial, key: "" },
    { n: min, key: "Home" },
    { n: max, key: "End" },
  ].sort((a, b) => Math.abs(a.n - target) - Math.abs(b.n - target));
  const start = choices[0];
  if (start.key) await input.press(start.key);
  for (let i = 0; i < Math.round(Math.abs(target - start.n) / step); i++)
    await input.press(target > start.n ? "ArrowRight" : "ArrowLeft");
  await expect(input).toHaveValue(String(target));
}
async function bounds(lab: Locator, page: Page) {
  const result = await lab.evaluate((node) => {
    const svg = node.querySelector("svg")!;
    const rect = svg.getBoundingClientRect();
    const scale = rect.width / svg.viewBox.baseVal.width;
    return {
      overflow: document.documentElement.scrollWidth - innerWidth,
      labels: [...svg.querySelectorAll("text")].map((text) => {
        const box = text.getBBox();
        return {
          text: text.textContent,
          x: box.x,
          right: box.x + box.width,
          y: box.y,
          bottom: box.y + box.height,
          font: parseFloat(getComputedStyle(text).fontSize) * scale,
        };
      }),
      height: svg.viewBox.baseVal.height,
      controls: [...node.querySelectorAll("button,input[type=range]")].map(
        (button) => ({
          height: button.getBoundingClientRect().height,
          width: button.getBoundingClientRect().width,
        }),
      ),
    };
  });
  expect(result.overflow).toBeLessThanOrEqual(1);
  for (const label of result.labels) {
    expect(label.x, label.text ?? "").toBeGreaterThanOrEqual(-1);
    expect(label.right, label.text ?? "").toBeLessThanOrEqual(641);
    expect(label.y, label.text ?? "").toBeGreaterThanOrEqual(-1);
    expect(label.bottom, label.text ?? "").toBeLessThanOrEqual(
      result.height + 1,
    );
    expect(label.font, label.text ?? "").toBeGreaterThanOrEqual(14.5);
  }
  for (const control of result.controls)
    expect(control.height).toBeGreaterThanOrEqual(43);
  const audit = await new AxeBuilder({ page })
    .include(".g031-lab")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
}
for (const profile of [
  { name: "desktop", width: 1280, theme: "dark" as const },
  { name: "320px Matrix", width: 320, theme: "matrix" as const },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: 1000 },
      hasTouch: true,
      locale: "tr-TR",
      reducedMotion: "reduce",
    });
    test("six geometry models explain changing data without changing learning evidence, and restore offline", async ({
      page,
      context,
    }, info) => {
      test.setTimeout(150_000);
      await page.goto("/#/settings");
      await setThemePreference(page, profile.theme);
      const before = learning(await stored(page));
      for (const id of ids) {
        const lab = await open(page, id);
        if (id === "temel-acilar") {
          await range(lab, "Turuncu açı", 120);
          await lab
            .getByRole("checkbox", {
              name: "Paralel doğruları göster",
              exact: true,
            })
            .check();
          await expect(lab.locator("dl")).toContainText("120° + 60° = 180°");
          await expect(
            lab.locator(".g031-sector.g031-first").first(),
          ).toHaveCSS("fill", "rgb(255, 173, 148)");
        } else if (id === "ucgende-acilar") {
          await range(lab, "C köşesinin yatay konumu", -2);
          await range(lab, "C köşesinin yüksekliği", 2);
          await expect(lab.locator("dl")).toContainText("135°");
          await lab
            .getByRole("button", { name: "Sonraki adım", exact: true })
            .click();
          await lab
            .getByRole("button", { name: "Sonraki adım", exact: true })
            .click();
          await expect(lab.locator("svg .g031-sector")).toHaveCount(6);
          await expect(lab.locator("svg")).toHaveAccessibleName(
            /toplam 180 derece/,
          );
        } else if (id === "ucgen-esitsizligi") {
          await lab
            .getByRole("button", { name: "3–4–8: çizilmez", exact: true })
            .click();
          await expect(lab.locator("svg polygon")).toHaveCount(0);
          await expect(lab.locator("dl")).toContainText("Üçgen yok");
          await lab
            .getByRole("button", { name: "3–4–7: sınır", exact: true })
            .click();
          await expect(lab.locator("svg polygon")).toHaveCount(0);
          await lab
            .getByRole("button", { name: "3–4–5: çizilir", exact: true })
            .click();
          await expect(lab.locator("svg polygon")).toHaveCount(1);
          await expect(lab.locator("dl")).toContainText("6 birim²");
        } else if (id === "dik-ucgen") {
          for (let i = 0; i < 3; i++)
            await lab
              .getByRole("button", { name: "Sonraki adım", exact: true })
              .click();
          await expect(lab.locator("dl")).toContainText("3,6 birim");
          await expect(lab.locator("dl")).toContainText("6,4 birim");
          await expect(lab.locator("dl")).toContainText("23,04 birim²");
        } else if (id === "eslik-benzerlik") {
          await range(lab, "Küçük / büyük uzunluk oranı", 50);
          await expect(lab.locator("dl")).toContainText("10 / 40 = 0,25");
          await expect(lab).toContainText("alanı %25'idir");
        } else {
          await lab
            .getByRole("button", { name: "Açıortay", exact: true })
            .click();
          await expect(lab.locator("dl")).toContainText("BD / DC");
          await lab
            .getByRole("button", { name: "İç teğet çember", exact: true })
            .click();
          await expect(lab.locator(".g031-incircle")).toHaveCount(1);
          await expect(lab).toContainText("İç çember yarıçapı");
          await lab
            .getByRole("button", { name: "Diklik merkezi", exact: true })
            .click();
          await lab
            .getByRole("button", { name: "Geniş açılı örnek", exact: true })
            .click();
          await expect(lab.locator("dl")).toContainText("(5; 8,333)");
          await bounds(lab, page);
          await lab
            .getByRole("button", { name: "Çevrel merkez", exact: true })
            .click();
          await expect(lab.locator("dl")).toContainText("(5; -2,667)");
          await expect(lab.locator(".g031-circumcircle")).toHaveCount(1);
          await bounds(lab, page);
          await lab
            .getByRole("button", { name: "Dik açılı örnek", exact: true })
            .click();
          await expect(lab.locator("dl")).toContainText("(5; 3)");
          await lab
            .getByRole("button", { name: "İç teğet çember", exact: true })
            .click();
        }
        await bounds(lab, page);
        await lab.scrollIntoViewIfNeeded();
        await page.screenshot({
          path: info.outputPath(`${id}-${profile.width}.png`),
          fullPage: false,
        });
      }
      await expect
        .poll(
          async () =>
            Object.keys((await stored(page)).explorations).filter((key) =>
              key.startsWith("g031:"),
            ).length,
        )
        .toBe(6);
      expect(learning(await stored(page))).toEqual(before);
      await page.evaluate(async () => {
        await navigator.serviceWorker.ready;
      });
      await context.setOffline(true);
      await page.reload();
      await expect(page.locator(".g031-incircle")).toHaveCount(1);
      await page.goto("/#/lesson?id=tyt-geo-eslik-benzerlik-031");
      await expect(page.locator(".g031-lab dl")).toContainText(
        "10 / 40 = 0,25",
      );
      expect(learning(await stored(page))).toEqual(before);
    });
  });
}
test("dragging a real vertex has keyboard equivalents, ends cleanly, and survives reload", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1280, height: 1200 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  // A fresh read-only launch intentionally has no stored state yet. Establish
  // a profile through an actual preference action before comparing its records.
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  const lab = await open(page, "ucgende-acilar");
  // The preceding lesson figure loads separately and moves the lab when it mounts.
  const chapterFigure = page.locator(
    '[data-section-figure="Üç köşe bir üçgeni nasıl oluşturur?"] svg',
  );
  await expect(chapterFigure).toBeVisible();
  const before = learning(await stored(page));
  const vertex = lab.getByTestId("g031-drag-vertex");
  await vertex.scrollIntoViewIfNeeded();
  const { start, target } = await vertex.evaluate((node: SVGCircleElement) => {
    const matrix = node.getScreenCTM();
    if (!matrix) throw new Error("The drag handle is outside the rendered SVG");
    const start = new DOMPoint(node.cx.baseVal.value, node.cy.baseVal.value);
    const target = new DOMPoint(450, 130);
    return {
      start: start.matrixTransform(matrix).toJSON(),
      target: target.matrixTransform(matrix).toJSON(),
    };
  });
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(target.x, target.y, { steps: 12 });
  await page.mouse.up();
  await expect(
    lab.getByRole("slider", { name: "C köşesinin yatay konumu", exact: true }),
  ).toHaveValue("10");
  await expect(
    lab.getByRole("slider", { name: "C köşesinin yüksekliği", exact: true }),
  ).toHaveValue("8");
  await expect
    .poll(async () => (await stored(page)).explorations["g031:triangle-angles"])
    .toMatchObject({ x: 10, y: 8 });
  await page.reload();
  await expect(
    lab.getByRole("slider", { name: "C köşesinin yüksekliği", exact: true }),
  ).toHaveValue("8");
  await lab
    .getByRole("slider", { name: "C köşesinin yatay konumu", exact: true })
    .press("Home");
  await expect(
    lab.getByRole("slider", { name: "C köşesinin yatay konumu", exact: true }),
  ).toHaveValue("-2");
  expect(learning(await stored(page))).toEqual(before);
  expect(errors).toEqual([]);
});
test("geometry labels and controls remain readable at 320px with maximum interface and text scales", async ({
  page,
}, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.goto("/#/settings");
  await setThemePreference(page, "matrix");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  for (const id of ids) {
    const lab = await open(page, id);
    await bounds(lab, page);
    await expect(lab.locator("dd").first()).toHaveCSS("font-size", "45px");
  }
  await page.locator(".g031-lab").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: info.outputPath("geometry-max-scales-320.png"),
  });
});
