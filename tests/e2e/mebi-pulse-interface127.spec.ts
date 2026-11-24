import { expect, test, type Locator } from "@playwright/test";
import { heavyLightTitle, lightHeavyTitle, pulseInterfaceExample } from "../../src/learning/mebiPulseInterface";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const figureFor = (title: string) => `figure[data-section-figure="${title}"]`;
const course = {
  lesson: "yay-dalgalari",
  search: "Yay dalgaları",
  title: "Yay dalgaları: atmayı üret, yansımayı çöz",
};

async function nextStage(figure: Locator) {
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(next).toBeEnabled();
  await next.press("Enter");
}

test("ince ve kalın yayın birleşiminde yön, sürat ve genişlik birlikte okunur", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const openSection = async (title: string) => {
    const button = toc.getByRole("button", { name: title, exact: true });
    if (!(await button.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
    await button.press("Enter");
    return page.locator(figureFor(title));
  };
  for (const example of [
    { title: lightHeavyTitle, id: "to-heavy", join: "1 m", reflected: "çukur sola 2 m/s ile gider. Genişliği 2,4 m.", transmitted: "1 m/s ile gider. Genişliği 1,2 m." },
    { title: heavyLightTitle, id: "to-light", join: "2 m", reflected: "tepe sola 1 m/s ile gider. Genişliği 1,2 m.", transmitted: "2 m/s ile gider. Genişliği 2,4 m." },
  ]) {
    const figure = await openSection(example.title);
    await expect(figure.getByRole("img")).toHaveAccessibleName(/O noktasında bağlı/);
    await nextStage(figure);
    await expect(figure).toContainText(`Birleşim çizimde ${example.join} yükselir.`);
    await nextStage(figure);
    await expect(figure).toContainText(`Yansıyan ${example.reflected}`);
    await expect(figure).toContainText(`İletilen tepe sağa ${example.transmitted}`);
    expect((await page.evaluate(svgLayoutAudit, { scope: figureFor(example.title), figuresOnly: true, explore: true })).issues).toEqual([]);
    expect(await figure.getByRole("img").evaluate((svg) => {
      svg.scrollIntoView({ block: "center", behavior: "instant" });
      const { left, width, top, bottom } = svg.getBoundingClientRect();
      return svg.contains(document.elementFromPoint(left + width / 2, top + 6))
        && svg.contains(document.elementFromPoint(left + width / 2, bottom - 6));
    })).toBe(true);
    await page.screenshot({ path: info.outputPath(`mebi-interface127-${example.id}.png`) });
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı iki kaynak çizimini çözüm adımlarındaki kendi yerinde açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: heavyLightTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Kalın → ince Tepe 1 m/s 2 m/s 1,2 m 2,4 m", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: pulseInterfaceExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figureFor(lightHeavyTitle)).getByRole("img")).toBeVisible();
  await expect(solution.locator(figureFor(heavyLightTitle)).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("İnce yaydan kalına geçişte yansıyan çukur, iletilen daha dar tepedir.");
});
