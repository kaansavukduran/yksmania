import { expect, type Locator, type Page } from "@playwright/test";

/*
 * The guide is read page by page (one section per page, then worked examples,
 * then recall). These helpers open a page through the visible contents list,
 * exactly as a learner would.
 */
function contents(page: Page) {
  return page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
}

export async function openGuidePage(page: Page, target: string) {
  const nav = contents(page);
  const details = nav.locator("details");
  if (!(await details.evaluate((d) => (d as HTMLDetailsElement).open)))
    await nav.locator("summary").click();
  await nav.getByRole("button", { name: target, exact: true }).click();
}

export const openWorkedExamples = (page: Page) => openGuidePage(page, "Çözümlü örnekler");
export const openRecall = (page: Page) => openGuidePage(page, "Bakmadan hatırla");

/** Number of teaching sections (pages before the examples and recall pages). */
export async function guideSectionCount(page: Page) {
  const count = await contents(page).locator("details button").count();
  return count - 2;
}

export async function expectGuideSections(page: Page, n: number) {
  await expect.poll(() => guideSectionCount(page)).toBe(n);
}

/**
 * Turn pages from the first one until `target` is on screen, like a learner
 * paging through the guide. Fails if the last page is reached first.
 */
export async function turnToGuideContent(page: Page, target: Locator) {
  const previous = page.getByRole("button", { name: "Önceki sayfa", exact: true });
  const next = page.getByRole("button", { name: "Sonraki sayfa", exact: true });
  while ((await previous.count()) && !(await previous.isDisabled())) await previous.click();
  for (let i = 0; i < 60; i++) {
    if ((await target.count()) && (await target.first().isVisible())) return;
    if (!(await next.count()) || (await next.isDisabled())) break;
    await next.click();
  }
  await expect(target.first()).toBeVisible();
}
