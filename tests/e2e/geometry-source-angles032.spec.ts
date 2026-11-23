import release from "../../package.json" with { type: "json" };
import { test, expect, type Page, type Locator } from "@playwright/test";
import { setThemePreference } from "./helpers/theme";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import type { AppState } from "../../src/domain/model";
import { openWorkedExamples } from "./helpers/guidePages";

registerOfflineBootDiagnostics();
const lessonId = "tyt-geo-acilar-kaynak-pekitirme-032";
const topicId = `topic-${lessonId}`;
const note = "Açı ilişkisini önce koşuluyla açıklarım: ÇĞİÖŞÜ.";
async function state(page: Page): Promise<AppState> {
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
            const value = read.result;
            db.close();
            resolve(value);
          };
        };
      }),
  );
}
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function keyboardRange(lab: Locator, name: string, value: number) {
  const control = lab.getByRole("slider", { name: new RegExp(`^${name}`) });
  await expect(
    control,
    "Visible range text must label the keyboard control",
  ).toBeVisible();
  const min = Number(await control.getAttribute("min"));
  const step = Number(await control.getAttribute("step"));
  await control.press("Home");
  for (let n = min; n < value; n += step) await control.press("ArrowRight");
  await expect(control).toHaveValue(String(value));
}
async function diagramBounds(lab: Locator) {
  const bounds = await lab.locator("svg").evaluate((svg: SVGSVGElement) => {
    const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width;
    return [...svg.querySelectorAll("text")].map((node) => {
      const b = node.getBBox();
      return {
        text: node.textContent,
        x: b.x,
        right: b.x + b.width,
        y: b.y,
        bottom: b.y + b.height,
        maxY: svg.viewBox.baseVal.height,
        font: parseFloat(getComputedStyle(node).fontSize) * scale,
      };
    });
  });
  for (const b of bounds) {
    expect(b.x, b.text ?? "").toBeGreaterThanOrEqual(0);
    expect(b.right, b.text ?? "").toBeLessThanOrEqual(640);
    expect(b.y, b.text ?? "").toBeGreaterThanOrEqual(0);
    expect(b.bottom, b.text ?? "").toBeLessThanOrEqual(b.maxY);
    expect(b.font, b.text ?? "").toBeGreaterThanOrEqual(14.5);
  }
  const collisions = await lab.locator("svg").evaluate((svg) => {
    const lines = [...svg.querySelectorAll("line")].map((line) => [
      line.x1.baseVal.value,
      line.y1.baseVal.value,
      line.x2.baseVal.value,
      line.y2.baseVal.value,
    ]);
    const dist = (x: number, y: number, line: number[]) => {
      const [a, b, c, d] = line,
        dx = c - a,
        dy = d - b;
      const t = Math.max(
        0,
        Math.min(1, ((x - a) * dx + (y - b) * dy) / (dx * dx + dy * dy)),
      );
      return Math.hypot(x - a - t * dx, y - b - t * dy);
    };
    return [...svg.querySelectorAll(".gl032-label-bg")].flatMap((circle) => {
      const c = circle as SVGCircleElement;
      return lines
        .filter(
          (line) =>
            dist(c.cx.baseVal.value, c.cy.baseVal.value, line) <
            c.r.baseVal.value + 1.5,
        )
        .map(() => c.parentElement?.textContent?.trim());
    });
  });
  expect(
    collisions,
    "Opaque label circles must not erase the geometry being explained",
  ).toEqual([]);
  const glyphCollisions = await lab.locator("svg").evaluate((svg) => {
    const lines = [...svg.querySelectorAll("line")].map((line) => [
      line.x1.baseVal.value,
      line.y1.baseVal.value,
      line.x2.baseVal.value,
      line.y2.baseVal.value,
    ]);
    const labels = [...svg.querySelectorAll("text")].map((text) => ({
      name: text.textContent,
      box: text.getBBox(),
    }));
    const intersects = (line: number[], box: DOMRect) => {
      const [x, y, u, v] = line,
        dx = u - x,
        dy = v - y;
      let first = 0,
        last = 1;
      const p = [-dx, dx, -dy, dy],
        q = [
          x - box.x + 1.5,
          box.x + box.width + 1.5 - x,
          y - box.y + 1.5,
          box.y + box.height + 1.5 - y,
        ];
      for (let i = 0; i < 9; i++) {
        if (p[i] === 0) {
          if (q[i] < 0) return false;
        } else {
          const at = q[i] / p[i];
          if (p[i] < 0) first = Math.max(first, at);
          else last = Math.min(last, at);
          if (first > last) return false;
        }
      }
      return true;
    };
    return labels
      .filter((label) => lines.some((line) => intersects(line, label.box)))
      .map((label) => label.name);
  });
  expect(
    glyphCollisions,
    "Angle numerals must not straddle their defining lines",
  ).toEqual([]);
}

for (const profile of [
  { name: "desktop dark", width: 1360, large: false },
  { name: "320px Matrix with200UI150textLexend", width: 320, large: true },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: 1000 },
      locale: "tr-TR",
      timezoneId: "Europe/Istanbul",
      reducedMotion: "reduce",
      hasTouch: profile.large,
    });
    test("source language figures, nine worked variants and eighteen independent questions preserve daily and offline state", async ({
      page,
      context,
    }, info) => {
      test.setTimeout(180_000);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.clock.setFixedTime(new Date("2026-11-17T09:00:00Z"));
      await page.goto("/#/settings");
      expect(
        (await (await page.request.get("/version.json")).json()).version,
      ).toBe(release.version);
      await setThemePreference(page, profile.large ? "matrix" : "dark");
      if (profile.large) {
        await page
          .getByLabel("Yazı tipi", { exact: true })
          .selectOption("lexend");
        await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
        await page
          .getByLabel("Yalnızca yazı boyutu %", { exact: true })
          .fill("150");
      }
      const initial = await state(page);
      await nav(page, "Konu Anlatımı");
      const geo = page.locator(".subject-panel").filter({
        has: page.getByRole("heading", { name: "Geometri", exact: true }),
      });
      await geo.locator(".subject-header").click();
      await geo.locator(`[data-lesson-id="${lessonId}"]`).click();
      const lab = page.locator(".gl032-lab");
      await expect(
        page.locator(".guide-section").first().locator(".gl032-lab"),
      ).toBeVisible();
      await expect(page.locator('input[type="file"]')).toHaveCount(0);
      for (const object of ["Işın", "Doğru parçası", "Doğru"]) {
        await lab
          .getByRole("group", { name: "Geometrik nesne", exact: true })
          .getByRole("button", { name: object, exact: true })
          .click();
        const line = lab.locator("svg > line");
        if (object === "Doğru") {
          await expect(line).toHaveAttribute("marker-start", /arrow/);
          await expect(line).toHaveAttribute("marker-end", /arrow/);
        } else if (object === "Işın") {
          expect(await line.getAttribute("marker-start")).toBeNull();
          await expect(line).toHaveAttribute("marker-end", /arrow/);
        } else {
          expect(await line.getAttribute("marker-start")).toBeNull();
          expect(await line.getAttribute("marker-end")).toBeNull();
        }
        await diagramBounds(lab);
      }
      await keyboardRange(lab, "B noktasının konumu", 470);
      await expect(lab.locator("svg circle").nth(1)).toHaveAttribute(
        "cx",
        "470",
      );
      await lab
        .getByRole("button", { name: "Paralel açı çiftleri", exact: true })
        .click();
      for (const angle of [50, 130]) {
        await keyboardRange(lab, "1 numaralı açı", angle);
        for (const pair of ["Yöndeş 1–5", "İç ters 3–5", "Aynı yan iç 2–5"]) {
          await lab.getByRole("button", { name: pair, exact: true }).click();
          await expect(lab.locator(".gl032-result")).toContainText(
            pair.startsWith("Aynı")
              ? `${180 - angle}° + ${angle}° = 180°`
              : `${angle}° = ${angle}°`,
          );
          await diagramBounds(lab);
        }
      }
      await lab
        .getByRole("checkbox", {
          name: "Kaynak şemasını a, b, c ile göster",
          exact: true,
        })
        .check();
      await keyboardRange(lab, "a açısı", 130);
      for (const pair of ["İç ters a–b", "Aynı yan iç a–c"]) {
        await lab.getByRole("button", { name: pair, exact: true }).click();
        await expect(lab.locator(".gl032-result")).toContainText(
          pair.startsWith("İç") ? "130° = 130°" : "130° + 50° = 180°",
        );
        await expect(lab.locator("svg text")).toHaveText(["a", "b", "c"]);
        await diagramBounds(lab);
      }
      await lab
        .getByRole("checkbox", {
          name: "Kaynak şemasını a, b, c ile göster",
          exact: true,
        })
        .uncheck();
      await lab
        .getByRole("button", { name: "Tam turda dönüş", exact: true })
        .click();
      for (let step = 0; step < 5; step++)
        await lab
          .getByRole("button", { name: "Sonraki dönüş", exact: true })
          .click();
      await expect(
        lab.getByRole("button", { name: "Sonraki dönüş", exact: true }),
      ).toBeDisabled();
      await expect(lab.locator(".gl032-result")).toContainText("72°−9°=63°");
      await expect(lab.locator("svg text")).toHaveText([
        "1",
        "2",
        "3",
        "4",
        "5",
      ]);
      await diagramBounds(lab);
      await expect(
        lab.locator(".gl032-official-reference a").first(),
      ).toHaveAttribute("href", /dokuman\.osym\.gov\.tr.*#page=34$/);
      await lab
        .getByRole("button", { name: "Paralel açı çiftleri", exact: true })
        .click();
      await lab
        .getByRole("button", { name: "Aynı yan iç 2–5", exact: true })
        .click();
      await expect(lab.locator(".gl032-older-videos a")).toHaveCount(2);
      await expect(lab.locator(".gl032-older-videos")).toContainText(
        "İnternet gerektirir",
      );
      await lab.screenshot({
        path: info.outputPath("source-language-parallel.png"),
      });
      const exampleAnswers = [
        "Küçük açı 28°, büyük açı 62°dir.",
        "Açılar 100° ve 80°dir.",
        "Ters açılar 93°, komşuları 87°dir.",
        "x=20, açı ölçülerinin her biri 90°dir.",
        "56° ve 124°.",
        "Karşı açı 127°, komşu açılar 53°dir.",
        "x=15; ortak açı 55°dir.",
        "125°.",
        "112°.",
      ];
      await openWorkedExamples(page);
      const examples = page.locator(".worked-example");
      await expect(examples).toHaveCount(9);
      for (let i = 0; i < 9; i++) {
        const e = examples.nth(i);
        await e.locator("summary").click();
        await e
          .getByRole("button", { name: "İlk adımı göster", exact: true })
          .click();
        await expect(e.locator(".worked-steps li")).toHaveCount(1);
        for (const count of [2, 3]) {
          await e
            .getByRole("button", { name: "Sonraki adım", exact: true })
            .click();
          await expect(e.locator(".worked-steps li")).toHaveCount(count);
        }
        await expect(e.locator(".worked-conclusion")).toContainText(
          exampleAnswers[i],
        );
      }
      const noteBox = page.getByRole("textbox", { name: "Notun", exact: true });
      await noteBox.fill(note);
      await expect
        .poll(async () => (await state(page)).notes[`lesson:${lessonId}`])
        .toBe(note);
      const explored = await state(page);
      expect(explored.sessions).toEqual(initial.sessions);
      expect(explored.reviews).toEqual(initial.reviews);
      expect(explored.topicProgress).toEqual(initial.topicProgress);
      await page
        .getByRole("button", { name: "Konuyu çalıştım", exact: true })
        .click();
      await expect(page.locator(".topic-repeat-targets")).toContainText(
        "İlk tekrar (3. gün): 19/11/2026",
      );
      await expect(page.locator(".topic-repeat-targets")).toContainText(
        "İkinci tekrar (7. gün): 23/11/2026",
      );
      await expect(page.locator(".topic-repeat-targets")).toContainText(
        "Son tekrar (21. gün): 07/12/2026",
      );
      await nav(page, "Bugün");
      await expect(page.locator(".page-heading .quiet-chip")).toContainText(
        "0 XP",
      );
      await nav(page, "Konu Anlatımı");
      await geo.locator(".subject-header").click();
      await geo.locator(`[data-lesson-id="${lessonId}"]`).click();
      await page
        .getByRole("button", { name: "Sorulara geç", exact: true })
        .click();
      const independentAnswers = [
        "B",
        `${(90 - 6) / 3}°`,
        `${3 * ((180 - 10 - 20) / 5) + 10}°`,
        `${180 - (4 * ((18 + 7) / (4 - 3)) - 7)}°`,
        `${(30 + 10) / (5 - 3)}`,
        "O’daki ters açılar eşittir.",
        "A’dan başlar, B yönünde sınırsız uzanır.",
        "Komşudurlar; toplamları 70° olduğundan doğrusal çift oluşturmazlar.",
        `${(180 - 12) / 3}°`,
        `${180 - 127}°`,
        `${3 * ((20 + 10) / (5 - 3)) + 10}°`,
        `${360 - 30 - 85 - 120}°`,
        `${180 - 68}°`,
        `${90 - 37}°`,
        `${180 - 118}°`,
        "82°",
        `${180 - 122}°`,
        `${360 / 6}°`,
        "90°",
        "18°",
        "Aynı kesişimde ters açı 64°.",
        "Dış kollar arası 80°.",
      ];
      for (let i = 0; i < independentAnswers.length; i++) {
        await expect(page.locator(".question-meta")).toContainText(
          `Soru ${i + 1} / 22`,
        );
        const chosen = page.locator(".answer").filter({
          has: page.locator("span:last-of-type", {
            hasText: new RegExp(
              `^${independentAnswers[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
            ),
          }),
        });
        await expect(chosen).toHaveCount(1);
        await chosen.click();
        await page
          .getByRole("button", { name: "Cevabı kontrol et", exact: true })
          .click();
        await expect(page.locator(".feedback.correct")).toBeVisible();
        // Help opened after an independently checked response must not change its credit.
        if (i === 0) {
          const fullSolution = page.getByRole("region", {
            name: "Tam çözüm",
            exact: true,
          });
          for (let n = 0; n < 12 && !(await fullSolution.isVisible()); n++) {
            const beforePanels = await page
              .locator(".help-content > section")
              .count();
            await expect(page.locator(".help-next")).toBeVisible();
            await page.locator(".help-next").click();
            // Wait for the durable help action to render before observing another button.
            await expect
              .poll(() => page.locator(".help-content > section").count())
              .toBeGreaterThan(beforePanels);
          }
          await expect(
            page.getByRole("region", { name: "Tam çözüm", exact: true }),
          ).toBeVisible();
          await expect(page.locator(".help-content")).toContainText(
            "Üç harfle yazılmış bir açıda",
          );
          await expect(page.locator(".help-content")).toContainText(
            "Ortadaki harfi bul",
          );
          await expect(page.locator(".help-content")).toContainText(
            "ortak başlangıcı B",
          );
          const reasons = page.locator(".help-full-solution ol li");
          await expect(reasons).toHaveCount(5);
          expect(
            (await reasons.allTextContents()).every(
              (text) => text.trim().length > 20,
            ),
          ).toBe(true);
        }
        await page
          .getByRole("button", {
            name: i === independentAnswers.length - 1 ? "Çalışmayı kaydet" : "Sonraki soru",
            exact: true,
          })
          .click();
      }
      await expect(page.locator(".result-stats")).toContainText("22/22");
      const finished = await state(page);
      expect(finished.sessions).toHaveLength(1);
      expect(finished.sessions[0].responses).toHaveLength(22);
      expect(
        finished.sessions[0].responses.every((r) => r.correct && !r.assisted),
      ).toBe(true);
      expect(finished.reviews.map((r) => [r.stage, r.targetDate])).toEqual([
        [3, "2026-11-19"],
        [7, "2026-11-23"],
        [21, "2026-12-07"],
      ]);
      expect(finished.topicProgress).toEqual({
        [topicId]: { theory: "2026-11-17" },
      });
      await page
        .getByRole("button", { name: "Bugüne dön", exact: true })
        .click();
      const row = page
        .getByRole("region", { name: "Konu planı", exact: true })
        .getByRole("list", { name: "Bugünün konuları", exact: true })
        .locator("li")
        .filter({ hasText: "Geometrinin dili: kaynakla pekiştir" });
      await expect(row).toContainText("Konu tamamlandı");
      await expect(row).toContainText("22 soruda 22 doğru · 0 yanlış");
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
      const reload = await page.reload();
      expect(reload!.fromServiceWorker()).toBe(true);
      await expect(row).toContainText("22 soruda 22 doğru · 0 yanlış");
      expect(await state(page)).toEqual(finished);
      await nav(page, "Konu Anlatımı");
      await geo.locator(".subject-header").click();
      await geo.locator(`[data-lesson-id="${lessonId}"]`).click();
      await expect(
        page.getByRole("textbox", { name: "Notun", exact: true }),
      ).toHaveValue(note);
      await expect(
        lab.getByRole("slider", { name: /^1 numaralı açı/ }),
      ).toHaveValue("130");
      await expect(
        lab.getByRole("button", { name: "Aynı yan iç 2–5", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
      expect(errors).toEqual([]);
      await page.screenshot({
        path: info.outputPath("source-language-offline.png"),
        fullPage: false,
      });
      await info.attach("source-language-acceptance", {
        body: JSON.stringify({
          status: "PASS",
          version: release.version,
          profile,
          normalEntry: true,
          diagrams: true,
          workedExamples: 9,
          independentQuestions: "22/22",
          noExplorationXP: true,
          manualTheory: true,
          SRS: ["2026-11-19", "2026-11-23", "2026-12-07"],
          today: true,
          note: true,
          offlineReload: true,
          explorationRestored: true,
          pageErrors: errors,
        }),
        contentType: "application/json",
      });
    });
  });
}
