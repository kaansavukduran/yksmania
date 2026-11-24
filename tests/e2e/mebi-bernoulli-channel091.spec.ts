import { expect, test } from "@playwright/test";
import { idealChannelExample, idealChannelExampleTitle, idealChannelTitle, measuredChannelTitle } from "../../src/learning/mebiBernoulliChannel";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("kaynak su kanalı ölçümleri ve ideal boru ayrı sayılarla gösterilir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: measuredChannelTitle, exact: true }).press("Enter");
  const observed = page.locator(diagram(measuredChannelTitle));
  await expect(observed).toContainText("Geniş kesit: 1,4 m/s ve 114 kPa.");
  await expect(observed).toContainText("Dar kesit: 6,1 m/s ve 94 kPa.");
  const svg = observed.getByRole("img");
  await expect(svg).toHaveAccessibleName(/su kanalının tabanı önce derin, sonra sığ/i);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("bernoulli091-measured.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(measuredChannelTitle), figuresOnly: true })).issues).toEqual([]);
  await toc.getByRole("button", { name: idealChannelTitle, exact: true }).press("Enter");
  const ideal = page.locator(diagram(idealChannelTitle));
  const control = ideal.getByRole("slider", { name: /İkinci kesitin alanı/ });
  await expect(ideal).toContainText("2. kesit: 2 cm² · 4 m/s · 108 kPa.");
  await expect(ideal).toContainText("Her iki kesitte debi: 0,8 L/s.");
  await control.press("End");
  await expect(ideal).toContainText("2. kesit: 4 cm² · 2 m/s · 114 kPa.");
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(idealChannelTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı kaynak ölçümünü ve 108 kPa örneğini ayrı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: measuredChannelTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Ölçüm yeri", "Sürat (m/s)", "Statik basınç (kPa)"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText(["Geniş kesit", "1,4", "114", "Dar kesit", "6,1", "94"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: idealChannelExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(idealChannelExampleTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("2. kesit: 2 cm² · 4 m/s · 108 kPa.");
  expect(learning(await storage(page))).toEqual(before);
});

test("Bernoulli sorusunun son tablosu ancak yardım kalıcı kayda geçince açılır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let index = 0; index < 9; index++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "Geniş ve dar bölümleri olan yatay boru", exact: true });
  const hint = page.getByRole("figure", { name: "İki kesitte geçen debiyi eşitle", exact: true });
  const answer = page.getByRole("figure", { name: "Dar bölümde hız ve statik basınç", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/sol tarafı geniş.*sağ tarafı dar.*aynı seviyede/);
  await expect(hint).toHaveCount(0);
  await expect(answer).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("math")).toHaveAccessibleName(/alan çarpı sürat/);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(answer).toHaveCount(0);
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(answer.getByRole("table")).toContainText("Statik basınç");
  await expect(answer.getByRole("table")).toContainText("Azalır");
  const state = await storage(page);
  expect(learning({ ...state, draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(answer.getByRole("table")).toBeVisible();
  const drawing = given.getByRole("img");
  await expect(drawing).toBeVisible();
  const labelsFit = await drawing.evaluate((svg) => {
    const frame = svg.getBoundingClientRect();
    const labels = Array.from(svg.querySelectorAll("text"), (label) => label.getBoundingClientRect());
    return labels.length === 2 && labels[0].right < labels[1].left &&
      labels.every((label) => label.left >= frame.left && label.right <= frame.right && label.bottom <= frame.bottom);
  });
  expect(labelsFit).toBe(true);
  await given.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await given.screenshot({ path: info.outputPath("bernoulli091-question.png") });
});
