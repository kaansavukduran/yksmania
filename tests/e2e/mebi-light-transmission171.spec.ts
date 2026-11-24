import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  clearRayTitle, diffuseRayTitle, lightTransmissionExample, opaqueRayTitle, transmissionTitle,
} from "../../src/learning/mebiLightTransmission";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("three credited material photos and each ray direction work offline at large text", async ({ page, context }, info) => {
  test.setTimeout(70_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "golge-yari-golge", search: "Gölge ve yarı gölge" });
  const scope = 'figure[data-section-figure="' + transmissionTitle + '"]';
  const model = page.locator(scope);
  const photos = page.getByRole("group", { name: "Saydam, yarı saydam ve opak örnekler", exact: true });
  await expect(photos.getByRole("button")).toHaveCount(3);
  const examples = [
    { title: "Saydam pencere camı", height: 720, alt: /pencereleri.*tekneler.*araçların/, credit: /DiscoA340/, revision: /oldid=804841052/, licence: "CC BY-SA 4.0" },
    { title: "Buzlu pencere camı", height: 720, alt: /nesnelerin sınırları belirgin görünmüyor/, credit: /Öljylautta.*Kamu malı/, revision: /oldid=1262329455/ },
    { title: "Opak metal levha", height: 639, alt: /yansıyan çizgiler/, credit: /Si Griffiths/, revision: /oldid=1155888241/, licence: "CC BY-SA 3.0" },
  ];
  for (const photo of examples) {
    const item = photos.getByRole("figure", { name: photo.title, exact: true });
    const opener = item.getByRole("button", { name: photo.title + ": görseli büyüt", exact: true });
    await expect(opener).toHaveAccessibleDescription(photo.alt);
    await expect.poll(() => opener.locator("img").evaluate((img: HTMLImageElement) => [img.naturalWidth, img.naturalHeight]))
      .toEqual([960, photo.height]);
    await opener.press("Enter");
    await expect(page.getByRole("dialog").getByRole("img")).toHaveAccessibleName(photo.alt);
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
    await expect(photos.getByRole("link", { name: photo.credit })).toHaveAttribute("href", photo.revision);
    if (photo.licence) {
      await expect(photos.getByRole("link", { name: photo.licence, exact: true })).toHaveAttribute("href", /creativecommons.org\/licenses\/by-sa/);
    }
  }
  await expect(model).toContainText("Geçen ışınların doğrultusu korunur");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(model).toContainText("farklı yönlere saçılır");
  const drawing = model.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("frosted-light171.png") });
  await next.press("Enter");
  await expect(model).toContainText("Doğrudan geçen ışın yoktur");
  const section = page.locator(".guide-section").filter({ has: page.getByRole("heading", { name: transmissionTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Kalın metal levha Doğrudan geçmez Seçilmez", exact: true })).toBeVisible();
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const violations = (await new AxeBuilder({ page }).include(".section-reference-photos").analyze()).violations;
  expect(violations).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the study sheet gives each material its own solution diagram", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-132");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: lightTransmissionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const label of [clearRayTitle, diffuseRayTitle, opaqueRayTitle]) {
    await expect(solution.locator('figure[data-section-figure="' + label + '"]').getByRole("img")).toBeVisible();
  }
});
