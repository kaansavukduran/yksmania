import { expect, test } from "@playwright/test";
import { isolationExample, isolationTitle, rigidBaseTitle, shakingDamageTitle, slidingBaseTitle } from "../../src/learning/mebiSeismicIsolation";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("real damage and bearing photos open with their own credits offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const photos = [
    {
      section: shakingDamageTitle,
      label: "Gölbaşı yapı hasarı fotoğrafı",
      size: [4032, 3024], credit: "Adem", sourceRevision: "1115195060",
      description: /çelik donatılar dışarı çıkmış/,
    },
    {
      section: isolationTitle,
      label: "Kolon altı izolatör fotoğrafı",
      size: [1600, 1200], credit: "Keithalanporter", sourceRevision: "1058520311",
      description: /mavi üst ve alt plakaların arasında siyah silindir/,
    },
  ];
  for (const photo of photos) {
    const item = nav.getByRole("button", { name: photo.section, exact: true });
    if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
    await item.press("Enter");
    const group = page.locator(".guide-section").filter({
      has: page.getByRole("heading", { name: photo.section, exact: true }),
    });
    const enlarge = group.getByRole("button", { name: `${photo.label}: görseli büyüt`, exact: true });
    await expect(enlarge).toContainText(photo.label);
    await expect(enlarge).toHaveAccessibleDescription(photo.description);
    const image = enlarge.getByRole("img");
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => {
      const img = element as HTMLImageElement;
      return img.currentSrc && new URL(img.currentSrc).origin === location.origin
        ? [img.naturalWidth, img.naturalHeight] : [];
    })).toEqual(photo.size);
    const credit = group.getByRole("link", { name: photo.credit, exact: true });
    const url = new URL((await credit.getAttribute("href"))!);
    expect(url.hostname).toBe("commons.wikimedia.org");
    expect(url.searchParams.get("oldid")).toBe(photo.sourceRevision);
    await expect(group.getByRole("link", { name: "CC BY-SA 4.0" }))
      .toHaveAttribute("href", "https://creativecommons.org/licenses/by-sa/4.0/");
    await enlarge.press("Enter");
    await expect(page.getByRole("dialog").getByRole("img")).toHaveAccessibleName(photo.description);
    await page.keyboard.press("Escape");
    await expect(enlarge).toBeFocused();
  }

  const scope = `figure[data-section-figure="${isolationTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Temel ve üst yapı doğrudan bağlı.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Bağlantıda göreli yatay hareket olabilir.");
  const svg = figure.getByRole("img");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("seismic-isolation162.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı iki yapı bağlantısını kendi çözüm adımlarında karşılaştırır", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: isolationExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${rigidBaseTitle}"]`)).toContainText("Temel ve üst yapı doğrudan bağlı.");
  await expect(solution.locator(`figure[data-section-figure="${slidingBaseTitle}"]`)).toContainText("Bağlantıda göreli yatay hareket olabilir.");
});
