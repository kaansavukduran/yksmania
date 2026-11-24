import { expect, test } from "@playwright/test";
import { forge012PhysicsLessons } from "../../src/learning/forge012Physics";
import { shadowObserversQuestion, shadowObserversQuestionFigures } from "../../src/learning/shadowObserversQuestion178";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the three observers, hint and worked disks survive offline reload and wrong-answer review", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  await context.setOffline(true);
  const lessonId = "golge-yari-golge";
  await openCourse(page, { lesson: lessonId, search: "Gölge ve yarı gölge" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const earlier = forge012PhysicsLessons.find(({ id }) => id === lessonId)!.questions;
  for (const { answer } of earlier) {
    await page.locator(".answer-options .answer").nth(answer).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText(`Soru ${earlier.length + 1} / ${earlier.length + 1}`);
  await expect(page.locator(".question-meta")).toContainText("Özgün öğretim soruları");
  const { figure, hintFigure, stepFigures } = shadowObserversQuestionFigures;
  const findFigure = (title: string) => page.getByRole("figure", { name: title, exact: true });
  const stem = findFigure(figure.title);
  const hint = findFigure(hintFigure.title);
  const [geometry, table] = stepFigures.map(({ title }) => findFigure(title));
  await expect(stem.getByRole("img")).toHaveAccessibleDescription(/K, opak kürenin.*L, K’nin.*M, daha sağda/);
  await expect(stem.getByRole("img")).toHaveText(/K.*L.*M/);
  await expect(hint).toHaveCount(0);
  await expect(geometry).toHaveCount(0);
  await expect(table).toHaveCount(0);

  const audit = async (title: string, screenshot: string) => {
    const drawing = findFigure(title).getByRole("img");
    await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
    const report = await page.evaluate(svgLayoutAudit, { scope: `figure[aria-label="${title}"]` });
    expect(report.issues).toEqual([]);
    await drawing.screenshot({ path: info.outputPath(screenshot) });
  };
  await audit(figure.title, "shadow-observers178-stem.png");
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("img")).toHaveAccessibleDescription(/opak küreye üstten ve alttan değen/);
  await expect(hint).not.toContainText(/bütün diski taralı|aydınlık halka/);
  await audit(hintFigure.title, "shadow-observers178-hint.png");

  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(3);
  await expect(geometry.getByRole("img")).toHaveAccessibleDescription(/K’nin bütün diski taralı.*çevresinde aydınlık halka/);
  await audit(stepFigures[0].title, "shadow-observers178-disks.png");
  await expect(table).toHaveCount(0);
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(4);
  await expect(table.getByRole("row", { name: "K Eksen üzerinde kapalı", exact: true })).toBeVisible();
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));

  await page.reload();
  await expect(table.getByRole("row", { name: "M Eksen üzerinde halka", exact: true })).toBeVisible();
  await page.locator(".answer-options .answer").nth(1).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
  await expect(page.locator(".result-page")).toBeVisible();
  const result = (await storage(page)).sessions.at(-1)!.responses.at(-1)!;
  expect(result).toMatchObject({ questionId: shadowObserversQuestion.id, selected: 1, correct: false, assisted: true });
  expect(result.visibleFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  expect(result.solutionFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Yanlışlarım", exact: true }).press("Enter");
  await expect(page.locator(".mistake-card").filter({ has: stem }).getByRole("img")).toHaveAccessibleDescription(/K, opak kürenin.*L, K’nin.*M, daha sağda/);

  const saved = await storage(page);
  const pocket = page.getByRole("region", { name: "Sınav sabahı cep kitapçığı", exact: true });
  const printed = pocket.getByRole("figure", { name: figure.title, exact: true }).getByRole("img");
  await expect(printed).toHaveAccessibleDescription(/K, opak kürenin.*L, K’nin.*M, daha sağda/);
  await expect(pocket.getByText("K kapalı · L kısmen açık · M halka", { exact: false })).toBeVisible();
  await page.evaluate(() => { window.print = () => {}; });
  await pocket.getByRole("button", { name: "Yazdır", exact: true }).click();
  await page.emulateMedia({ media: "print" });
  await expect(pocket).toHaveCSS("page", "mistake-pocket");
  await expect(printed).toBeVisible();
  await expect(page.locator(".mistake-card").filter({ has: stem })).toBeHidden();
  const file = info.outputPath("shadow-observers178-booklet.pdf");
  const document = await page.pdf({ format: "A4", path: file });
  expect(document.subarray(0, 4).toString()).toBe("%PDF");
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.emulateMedia({ media: "screen" });
  expect((await storage(page)).sessions).toEqual(saved.sessions);
});
