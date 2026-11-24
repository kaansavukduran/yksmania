import { expect, test } from "@playwright/test";
import { pulseOverlapExample, pulseOverlapTitle } from "../../src/learning/mebiPulseOverlap";
import { springOverlapQuestion } from "../../src/learning/springOverlapQuestion128";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${pulseOverlapTitle}"]`;
const course = { lesson: "yay-dalgalari", search: "Yay dalgaları" };

test("atmaların üç karşılaşma biçimi ve ayrı Kopya Kağıdı çevrimdışı çalışır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const target = toc.getByRole("button", { name: pulseOverlapTitle, exact: true });
  if (!(await target.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await target.press("Enter");
  const figure = page.locator(selector);
  const time = figure.getByRole("slider", { name: "Geçen süre", exact: true });
  for (let tick = 0; tick < 3; tick++) await time.press("ArrowRight");
  await expect(figure).toContainText("O’da K 4 cm, L 3 cm. Toplam 7 cm.");
  await figure.getByRole("button", { name: "Tepe ve büyük çukur", exact: true }).press("Enter");
  await expect(figure).toContainText("O’da K 4 cm, L -7 cm. Toplam -3 cm.");
  await figure.getByRole("button", { name: "Eşit tepe ve çukur", exact: true }).press("Enter");
  await expect(figure).toContainText("O’da K 4 cm, L -4 cm. Toplam 0 cm.");
  await expect(figure).toContainText("Bu anda yay düz görünür.");
  const image = figure.getByRole("img");
  await image.getByText("İki tepe", { exact: true }).click();
  await expect(figure).toContainText("O’da K 4 cm, L 3 cm. Toplam 7 cm.");
  await image.getByText("Eşit çukur", { exact: true }).click();
  await expect(figure).toContainText("Bu anda yay düz görünür.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.screenshot({ path: info.outputPath("mebi-overlap-contact128.png") });
  await time.press("End");
  await expect(figure).toContainText("K merkezi 9 m, L merkezi 3 m.");
  expect(learning(await storage(page))).toEqual(before);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: pulseOverlapTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Eşit tepe ve çukur +4 cm −4 cm 0 cm", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: pulseOverlapExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector)).toHaveCount(3);
});

test("kök çizimi veriyi taşır, ipucu ve iki farklı çözüm görseli kayıt sırasıyla açılır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let index = 0; index < 12; index++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText("Soru 13 / 13");
  const given = page.getByRole("figure", { name: "Birbirine yaklaşan K ve L atmaları", exact: true });
  const hint = page.getByRole("figure", { name: "Denge çizgisine göre uzanımın işareti", exact: true });
  const sum = page.getByRole("figure", { name: "O noktasında işaretli uzanımları topla", exact: true });
  const separated = page.getByRole("figure", { name: "Karşılaşmadan sonra K ve L’nin konumu", exact: true });
  const drawing = given.getByRole("img");
  await expect(drawing).toHaveAccessibleDescription(/sağa ilerliyor.*sola ilerliyor/);
  await expect(given.getByText("+4 cm", { exact: true })).toBeVisible();
  await expect(given.getByText("−4 cm", { exact: true })).toBeVisible();
  await expect(hint).toHaveCount(0);
  await expect(sum).toHaveCount(0);
  await expect(separated).toHaveCount(0);
  expect(await drawing.evaluate((element) => {
    const svg = element as unknown as SVGSVGElement;
    const view = svg.viewBox.baseVal;
    const boxes = [...svg.querySelectorAll("text")].map((label) => ({ text: label.textContent, box: label.getBBox() }));
    const outside = boxes.filter(({ box }) =>
      box.x < view.x || box.y < view.y || box.x + box.width > view.x + view.width || box.y + box.height > view.y + view.height,
    ).map(({ text }) => text);
    const overlaps = boxes.flatMap(({ box: a, text }, index) => boxes.slice(index + 1).filter(({ box: b }) =>
      a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y,
    ).map((other) => [text, other.text]));
    return { outside, overlaps };
  })).toEqual({ outside: [], overlaps: [] });
  await drawing.screenshot({ path: info.outputPath("mebi-overlap-question128.png") });
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("row", { name: "Denge çizgisinin altı Eksi (−)", exact: true })).toBeVisible();
  await expect(sum).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  await expect(next).toBeEnabled();
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(3);
  await expect(sum.getByRole("row", { name: "+4 cm −4 cm 0 cm", exact: true })).toBeVisible();
  await expect(separated).toHaveCount(0);
  await expect(next).toBeEnabled();
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(4);
  await expect(separated.getByRole("img")).toHaveAccessibleDescription(/L solda çukur.*K sağda tepe/);
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(separated.getByRole("img")).toBeVisible();
  await page.locator(".answer-options .answer").nth(2).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await expect.poll(async () => (await storage(page)).draft?.responses[12]).toMatchObject({
    questionId: springOverlapQuestion.id, selected: 2, correct: true, assisted: true,
  });
});
