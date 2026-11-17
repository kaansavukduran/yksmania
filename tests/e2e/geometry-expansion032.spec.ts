import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { setThemePreference } from "./helpers/theme";
registerOfflineBootDiagnostics();
const ids = [
  "cokgenler",
  "dortgen-hiyerarsi",
  "yamuk-deltoid",
  "paralelkenar-ozel-dortgenler",
  "dik-prizmalar",
  "piramitler",
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
  await page.goto(`/#/lesson?id=tyt-geo-${id}-032`);
  const lab = page.locator(".g032-lab");
  await expect(lab).toBeVisible();
  await expect(
    page.locator(".guide-section").first().locator(".g032-lab"),
  ).toBeVisible();
  await expect(lab.locator("svg")).toHaveCount(1);
  await expect(page.locator("input[type=file]")).toHaveCount(0);
  return lab;
}
async function range(lab: Locator, name: string, target: number) {
  const input = lab.getByRole("slider", { name, exact: true });
  const min = Number(await input.getAttribute("min")),
    max = Number(await input.getAttribute("max")),
    step = Number(await input.getAttribute("step")) || 1,
    current = Number(await input.inputValue());
  const starts = [
    { n: current, key: "" },
    { n: min, key: "Home" },
    { n: max, key: "End" },
  ].sort((a, b) => Math.abs(a.n - target) - Math.abs(b.n - target));
  const start = starts[0];
  if (start.key) await input.press(start.key);
  for (let i = 0; i < Math.round(Math.abs(target - start.n) / step); i++)
    await input.press(target > start.n ? "ArrowRight" : "ArrowLeft");
  await expect(input).toHaveValue(String(target));
}
async function bounds(lab: Locator, page: Page) {
  await expect
    .poll(() =>
      lab.locator("svg").evaluate((svg) => {
        const scale =
          svg.getBoundingClientRect().width /
          (svg as SVGSVGElement).viewBox.baseVal.width;
        return Math.min(
          ...[...svg.querySelectorAll("text")].map(
            (t) => parseFloat(getComputedStyle(t).fontSize) * scale,
          ),
          100,
        );
      }),
    )
    .toBeGreaterThanOrEqual(14.5);
  const result = await lab.evaluate((node) => {
    const svg = node.querySelector("svg")!,
      scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
    return {
      overflow: document.documentElement.scrollWidth - innerWidth,
      height: svg.viewBox.baseVal.height,
      labels: [...svg.querySelectorAll("text")].map((t) => {
        const b = t.getBBox();
        return {
          text: t.textContent,
          x: b.x,
          right: b.x + b.width,
          y: b.y,
          bottom: b.y + b.height,
          font: parseFloat(getComputedStyle(t).fontSize) * scale,
        };
      }),
      controls: [...node.querySelectorAll("button,input[type=range]")].map(
        (n) => ({
          width: n.getBoundingClientRect().width,
          height: n.getBoundingClientRect().height,
        }),
      ),
    };
  });
  expect(result.overflow).toBeLessThanOrEqual(1);
  for (const t of result.labels) {
    expect(t.x, t.text ?? "").toBeGreaterThanOrEqual(-1);
    expect(t.right, t.text ?? "").toBeLessThanOrEqual(641);
    expect(t.y, t.text ?? "").toBeGreaterThanOrEqual(-1);
    expect(t.bottom, t.text ?? "").toBeLessThanOrEqual(result.height + 1);
    expect(t.font).toBeGreaterThanOrEqual(14.5);
  }
  for (const c of result.controls) {
    expect(c.height).toBeGreaterThanOrEqual(43);
    expect(c.width).toBeGreaterThanOrEqual(43);
  }
  const audit = await new AxeBuilder({ page })
    .include(".g032-lab")
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
}
async function expectLabelsAvoidShapeEdges(lab: Locator, letters: string[]) {
  const contacts = await lab.locator("svg").evaluate(
    (svg, names) =>
      names.filter((name) => {
        const label = [...svg.querySelectorAll("text")].find(
          (t) => t.textContent?.trim() === name,
        );
        if (!label) throw Error(`Missing geometry label ${name}`);
        const box = label.getBBox();
        return [...svg.querySelectorAll("polygon")].some((polygon) => {
          const points = [...polygon.points];
          return points.some((a, i) => {
            const b = points[(i + 1) % points.length];
            return Array.from({ length: 201 }, (_, j) => j / 200).some((t) => {
              const x = a.x + (b.x - a.x) * t,
                y = a.y + (b.y - a.y) * t;
              return (
                x >= box.x - 2 &&
                x <= box.x + box.width + 2 &&
                y >= box.y - 2 &&
                y <= box.y + box.height + 2
              );
            });
          });
        });
      }),
    letters,
  );
  expect(contacts).toEqual([]);
}

for (const profile of [
  { name: "desktop dark", width: 1280, theme: "dark" as const },
  { name: "320px Matrix touch", width: 320, theme: "matrix" as const },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: 1000 },
      hasTouch: true,
      locale: "tr-TR",
      reducedMotion: "reduce",
    });
    test("six changing geometric models explain areas, families and solids; exploration persists offline without learning credit", async ({
      page,
      context,
    }, info) => {
      test.setTimeout(150_000);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto("/#/settings");
      await setThemePreference(page, profile.theme);
      const before = learning(await stored(page));
      // Open a new lesson through the ordinary course list before using direct links.
      const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
      if (await menu.isVisible()) await menu.click();
      await page
        .locator(".sidebar")
        .getByRole("button", { name: "Konu Anlatımı", exact: true })
        .click();
      const subject = page.locator(".subject-panel").filter({
        has: page.getByRole("heading", { name: "Geometri", exact: true }),
      });
      await subject.locator(".subject-header").click();
      await subject.locator('[data-lesson-id="tyt-geo-cokgenler-032"]').click();
      await expect(
        page.locator(".guide-section").first().locator(".g032-lab"),
      ).toBeVisible();
      for (const id of ids) {
        const lab = await open(page, id);
        if (id === "cokgenler") {
          await range(lab, "Kenar sayısı", 6);
          const markerLabel = await lab.locator("svg").evaluate((svg) => {
            const point = svg.querySelector("circle")!,
              label = [...svg.querySelectorAll("text")].find(
                (t) => t.textContent?.trim() === "A",
              )!;
            return {
              pointX: Number(point.getAttribute("cx")),
              pointY: Number(point.getAttribute("cy")),
              labelX: Number(label.getAttribute("x")),
              labelY: Number(label.getAttribute("y")),
            };
          });
          expect(markerLabel.labelX).toBeCloseTo(markerLabel.pointX);
          expect(markerLabel.labelY - markerLabel.pointY).toBeGreaterThan(20);

          await expect(lab.locator("dl")).toContainText("4 × 180° = 720°");
          await expect(lab.locator("polygon")).toHaveCount(5);
          await lab
            .getByRole("button", { name: "Bütün köşegenler", exact: true })
            .click();
          await expect(lab.locator(".g032-helper")).toHaveCount(9);
          const vertices = await lab.locator("polygon").getAttribute("points");
          expect(vertices!.trim().split(/\s+/)).toHaveLength(6);
          await expect(lab.locator("dl")).toContainText("360° / 6 = 60°");
        } else if (id === "dortgen-hiyerarsi") {
          await lab.getByRole("button", { name: "Kare", exact: true }).tap();
          const list = lab.getByRole("list", {
            name: "Seçilen şeklin aileleri",
          });
          await expect(list.locator("li.g032-belongs")).toHaveCount(7);
          await lab.getByRole("button", { name: "Yamuk", exact: true }).click();
          await expect(list.locator("li.g032-belongs")).toHaveCount(2);
          await expect(
            list.locator("li").filter({ hasText: "Paralelkenar" }),
          ).toContainText("Bu aileye ait değil");
        } else if (id === "yamuk-deltoid") {
          const original = await lab.locator("polygon").getAttribute("points");
          await range(lab, "Üst tabanın kayması", 8);
          await expect(lab.locator("dl")).toContainText("40 birim²");
          expect(await lab.locator("polygon").getAttribute("points")).not.toBe(
            original,
          );
          await lab.getByRole("button", { name: "Deltoid", exact: true }).tap();
          await expect(lab.locator("dl")).toContainText("36 birim²");
          await expect(lab).toContainText("Düşey parçalar eşit değil");
          await expect(lab.locator(".g032-accent")).toHaveCSS(
            "stroke",
            "rgb(255, 173, 148)",
          );
        } else if (id === "paralelkenar-ozel-dortgenler") {
          const original = await lab.locator("polygon").getAttribute("points");
          await range(lab, "Yatay kayma", 8);
          await expect(lab.locator("dl")).toContainText("60 birim²");
          expect(await lab.locator("polygon").getAttribute("points")).not.toBe(
            original,
          );
          await lab
            .getByRole("button", {
              name: "Eşkenar dörtgen örneği",
              exact: true,
            })
            .click();
          await expect(lab.locator("dl")).toContainText("Eşkenar dörtgen");
          await expect(lab.locator("dl")).toContainText("80 birim²");
          await lab
            .getByRole("button", { name: "Kare örneği", exact: true })
            .click();
          await expect(lab.locator("dl")).toContainText("64 birim²");
        } else if (id === "dik-prizmalar") {
          await range(lab, "Prizma eni", 3);
          await range(lab, "Prizma derinliği", 4);
          await range(lab, "Prizma yüksekliği", 12);
          await expect(lab.locator("dl")).toContainText("192 birim²");
          await expect(lab.locator("dl")).toContainText("144 birim³");
          await expect(lab.locator("dl")).toContainText("13 birim");
          await bounds(lab, page);
          await lab
            .getByRole("button", { name: "Açınımı göster", exact: true })
            .click();
          await expect(lab.locator("svg rect")).toHaveCount(6);
          const ratio = await lab.locator("svg").evaluate((svg) => {
            const faces = [...svg.querySelectorAll("rect")];
            const a = faces.map(
              (r) =>
                Number(r.getAttribute("width")) *
                Number(r.getAttribute("height")),
            );
            return a.reduce((n, v) => n + v, 0) / a[4];
          });
          expect(ratio).toBeCloseTo(192 / 12);
          await expect(lab.locator(".g032-reveal")).toHaveCSS(
            "animation-name",
            "none",
          );
        } else {
          await range(lab, "Kare taban kenarı", 8);
          await range(lab, "Piramidin dik yüksekliği", 3);
          await range(lab, "Tepeden benzerlik oranı", 0.5);
          await expect(lab.locator("dl")).toContainText("144 birim²");
          await expect(lab.locator("dl")).toContainText("64 birim³");
          await expect(lab.locator("dl")).toContainText("16 birim²");
          const ratio = await lab.locator("svg").evaluate((svg) => {
            const area = (p: SVGPolygonElement) => {
              const points = [...p.points];
              return (
                Math.abs(
                  points.reduce((s, v, i) => {
                    const w = points[(i + 1) % points.length];
                    return s + v.x * w.y - w.x * v.y;
                  }, 0),
                ) / 2
              );
            };
            return (
              area(svg.querySelector<SVGPolygonElement>(".g032-section")!) /
              area(svg.querySelector<SVGPolygonElement>(".g032-fill")!)
            );
          });
          expect(ratio).toBeCloseTo(0.25);
          await expectLabelsAvoidShapeEdges(lab, ["h", "ℓ"]);
          await bounds(lab, page);
          await lab
            .getByRole("button", { name: "Yüzey açınımı", exact: true })
            .click();
          await expect(lab.locator("svg polygon")).toHaveCount(5);
          // Both the old net and old solid labels touched scientific edges.
          await expectLabelsAvoidShapeEdges(lab, ["ℓ"]);
          await expect(lab.locator(".g032-reveal")).toHaveCSS(
            "animation-name",
            "none",
          );
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
            Object.keys((await stored(page)).explorations).filter((k) =>
              k.startsWith("g032:"),
            ).length,
        )
        .toBe(6);
      await expect
        .poll(async () => (await stored(page)).explorations["g032:pyramid"])
        .toMatchObject({ a: 8, h: 3, k: 0.5, view: "net" });
      expect(learning(await stored(page))).toEqual(before);
      const choices = (await stored(page)).explorations;
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
      await expect(page.locator(".g032-lab svg polygon")).toHaveCount(5);
      for (const id of ids) {
        const lab = await open(page, id);
        await expect(lab).toBeVisible();
      }
      expect((await stored(page)).explorations).toEqual(choices);
      expect(learning(await stored(page))).toEqual(before);
      expect(errors).toEqual([]);
    });
  });
}
test("all six models remain readable at320px UI200 text150 with actual Lexend and keyboard controls", async ({
  page,
}, info) => {
  test.setTimeout(100_000);
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/settings");
  await setThemePreference(page, "matrix");
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.evaluate(async () => {
    await document.fonts.load("400 45px Lexend");
    await document.fonts.load("600 45px Lexend");
  });
  for (const id of ids) {
    const lab = await open(page, id);
    await bounds(lab, page);
    const content = lab
      .locator("dd")
      .first()
      .or(lab.locator(".g032-families li").first())
      .first();
    await expect(content).toHaveCSS("font-size", "45px");
    expect(
      await content.evaluate((n) => getComputedStyle(n).fontFamily),
    ).toContain("Lexend");
    if (id === "piramitler") {
      // Read actual character line boxes: a long scientific word must not leave
      // an isolated final letter at the selected45px font size.
      const fragmentLengths = await lab
        .locator("dt")
        .filter({ hasText: /Üst küçük/ })
        .evaluate((node) => {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
          const lines = new Map<number, number>();
          let current: Node | null;
          while ((current = walker.nextNode())) {
            const text = current.textContent ?? "",
              start = text.indexOf("pira");
            if (start < 0) continue;
            const match = text.slice(start).match(/^pira\u00ad?midin/);
            if (!match) continue;
            for (let i = start; i < start + match[0].length; i++) {
              if (text[i] === "\u00ad") continue;
              const range = document.createRange();
              range.setStart(current, i);
              range.setEnd(current, i + 1);
              const rect = range.getBoundingClientRect(),
                line = Math.round(rect.y);
              lines.set(line, (lines.get(line) ?? 0) + 1);
            }
          }
          return [...lines.values()];
        });
      expect(fragmentLengths.length).toBeGreaterThan(0);
      expect(Math.min(...fragmentLengths)).toBeGreaterThanOrEqual(2);
    }
    await lab
      .locator("svg")
      .screenshot({ path: info.outputPath(`${id}-svg-max-scale-320.png`) });
    await lab.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: info.outputPath(`${id}-max-scale-320.png`),
      fullPage: false,
    });
  }
  const input = page
    .locator(".g032-lab")
    .getByRole("slider", { name: "Piramidin dik yüksekliği", exact: true });
  await input.press("End");
  await expect(input).toHaveValue("12");
  await expect(page.locator(".g032-lab dl")).toContainText("256 birim³");
  await bounds(page.locator(".g032-lab"), page);
});
