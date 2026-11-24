import { expect, test } from "@playwright/test";
import { springPulseExample, springPulseTitle } from "../../src/learning/mebiSpringPulse";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "yay-dalgalari", search: "Yay dalgaları", title: "Yay dalgaları: atmayı üret, yansımayı çöz" };
const graphic = `figure[data-section-figure="${springPulseTitle}"]`;

test("the wave moves while the marked location and the width stay fixed offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: springPulseTitle, exact: true }).press("Enter");
  const figure = page.locator(graphic);
  const slider = figure.getByRole("slider", { name: "Geçen süre" });
  await slider.press("ArrowRight");
  await slider.press("ArrowRight");
  await expect(figure).toContainText("0,5 s sonra sol uç 3 m, sağ uç 6 m. Genişlik 3 m.");
  await expect(figure).toContainText("P’nin yatay konumu 4,5 m.");
  await figure.getByRole("img").screenshot({ path: info.outputPath("spring-pulse107-model.png") });
  await slider.press("End");
  await expect(figure).toContainText("1,5 s sonra sol uç 5 m, sağ uç 8 m. Genişlik 3 m.");
  expect((await page.evaluate(svgLayoutAudit, { scope: graphic, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the offline cheat sheet opens pulse data and the worked example", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: springPulseTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "0,5 s 3 m ve 6 m 3 m", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: springPulseExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(graphic).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Sınırlar 3 m ve 6 m olur. Genişlik 3 m kalır.");
  expect(learning(await storage(page))).toEqual(before);
});

test("the independent question exposes its given diagram, then persists help before showing its visuals", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 860 });
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 10; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText("Soru 11 / 13");
  const given = page.getByRole("figure", { name: "Yaydaki atmanın yatay sınırları", exact: true });
  const hint = page.getByRole("figure", { name: "Genişliği iki yatay sınırdan oku", exact: true });
  const answer = page.getByRole("figure", { name: "Atmanın üretim süresini hesapla", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/x = 2 metrede.*x = 5 metrede/);
  expect(await given.getByRole("img").evaluate((element) => {
    const svg = element as unknown as SVGSVGElement;
    const view = svg.viewBox.baseVal;
    return [...svg.querySelectorAll("text")].filter((label) => {
      const bounds = label.getBBox();
      return bounds.x < view.x || bounds.y < view.y || bounds.x + bounds.width > view.x + view.width || bounds.y + bounds.height > view.y + view.height;
    }).map((label) => label.textContent);
  })).toEqual([]);
  await expect(given).not.toContainText("1,5 s");
  await expect(hint).toHaveCount(0);
  await expect(answer).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("math")).toBeVisible();
  await expect(answer).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const nextStep = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4]) {
    await expect(answer).toHaveCount(0);
    await expect(nextStep).toBeEnabled();
    await nextStep.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(answer.getByRole("math")).toBeVisible();
  await given.getByRole("img").screenshot({ path: info.outputPath("spring-pulse107-question.png") });
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(answer.getByRole("math")).toBeVisible();
});
