import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { turnToGuideContent } from "./helpers/guidePages";

test.use({ hasTouch: true, locale: "tr-TR" });

async function navigate(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}

async function lesson(page: Page, title: string) {
  await navigate(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  await page.locator(".ready-topic").filter({ hasText: title }).click();
  await expect(page.locator(".study-title h1")).toHaveText(title);
}

async function verifyTable(page: Page, cards: boolean, font = 15) {
  await turnToGuideContent(page, page.locator(".guide-table"));
  const region = page.locator(".guide-table").first();
  await expect(region).toBeVisible();
  const geometry = await region.evaluate((element) => {
    const headers = [...element.querySelectorAll("th")].map((e) =>
      e.textContent!.trim(),
    );
    const rows = [...element.querySelectorAll("tbody tr")].map((row) =>
      [...row.querySelectorAll("td")].map((cell) => ({
        text: cell
          .querySelector(".guide-table-cell-value")
          ?.textContent?.trim(),
        label: cell
          .querySelector(".guide-table-cell-label")
          ?.textContent?.trim(),
        labelVisible: !!cell
          .querySelector(".guide-table-cell-label")
          ?.getClientRects().length,
        associated: cell.getAttribute("headers"),
        font: parseFloat(getComputedStyle(cell).fontSize),
      })),
    );
    const words = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (
        !node.parentElement?.closest("th,td") ||
        !node.parentElement.getClientRects().length
      )
        continue;
      for (const match of node.textContent!.matchAll(/\p{L}+/gu)) {
        if (
          ![
            "anlam",
            "birikimi",
            "baskın",
            "Tuz",
            "su",
            "suyu",
            "kireçli",
            "Halomorfik",
            "doygunluk",
          ].includes(match[0])
        )
          continue;
        const range = document.createRange();
        range.setStart(node, match.index!);
        range.setEnd(node, match.index! + match[0].length);
        words.push({
          word: match[0],
          fragments: range.getClientRects().length,
        });
      }
    }
    return {
      headers,
      rows,
      words,
      width: element.clientWidth,
      content: element.scrollWidth,
      documentWidth: document.documentElement.scrollWidth,
      viewport: innerWidth,
    };
  });
  expect(geometry.words.length).toBeGreaterThan(0);
  for (const word of geometry.words) expect(word.fragments, word.word).toBe(1);
  expect(geometry.content).toBeLessThanOrEqual(geometry.width + 1);
  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewport + 1);
  for (const row of geometry.rows) {
    expect(row).toHaveLength(geometry.headers.length);
    for (const [index, cell] of row.entries()) {
      expect(cell.text).toBeTruthy();
      expect(cell.label).toBe(geometry.headers[index]);
      expect(cell.labelVisible).toBe(cards);
      expect(cell.associated).toBeTruthy();
      if (cards) expect(cell.font).toBeCloseTo(font, 3);
    }
  }
  await expect(region.getByRole("table")).toHaveCount(1);
  await expect(region.getByRole("columnheader")).toHaveCount(
    geometry.headers.length,
  );
  await expect(region.getByRole("cell")).toHaveCount(
    geometry.rows.length * geometry.headers.length,
  );
  return geometry;
}

test("reading tables keep complete words and column context at 320px and 45px text", async ({
  page,
}, testInfo) => {
  test.setTimeout(90000);
  await page.goto("/");
  for (const font of ["system", "lexend"]) {
    await navigate(page, "Ayarlar");
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
    await page
      .getByLabel("Yalnızca yazı boyutu %", { exact: true })
      .fill("150");
    await page.getByLabel("Yazı tipi", { exact: true }).selectOption(font);
    await page.setViewportSize({ width: 320, height: 900 });
    await lesson(page, "Dünya’da topraklar: katlar, süreç ve kanıt");
    if (font === "lexend") {
      expect(
        await page.evaluate(async () => {
          await document.fonts.load("400 45px Lexend");
          await document.fonts.load("600 45px Lexend");
          return (
            document.fonts.check("400 45px Lexend") &&
            document.fonts.check("600 45px Lexend")
          );
        }),
      ).toBe(true);
    }
    await verifyTable(page, true, 45);
    const first = page.locator(".guide-table tbody tr").first();
    await first.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: testInfo.outputPath(`table-${font}-320.png`),
    });
    const accessibility = await new AxeBuilder({ page })
      .include(".guide-table")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
  }
});

test("reading tables retain desktop rows and the same complete content after rotation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  for (const title of [
    "Dünya’da topraklar: katlar, süreç ve kanıt",
    "Simyadan kimyaya: amaç, yöntem ve kanıt",
  ]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await lesson(page, title);
    const desktop = await verifyTable(page, false);
    await page.setViewportSize({ width: 320, height: 900 });
    const phone = await verifyTable(page, true);
    expect(phone.headers).toEqual(desktop.headers);
    expect(phone.rows.map((row) => row.map((cell) => cell.text))).toEqual(
      desktop.rows.map((row) => row.map((cell) => cell.text)),
    );
  }
});
