import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import type { VideoGroup031 } from "../../src/learning/videoCatalog031";

const catalogue: VideoGroup031[] = JSON.parse(readFileSync(
  new URL("../../src/learning/videoCatalog031.json", import.meta.url), "utf8",
));

const lessons = [
  "tyt-mat-permutasyon-kaynak-032",
  "tyt-mat-tekrarli-permutasyon-kaynak-033",
  "tyt-mat-kombinasyon-kaynak-034",
  "tyt-mat-binom-kaynak-035",
  "tyt-mat-olasilik-kaynak-036",
  "tyt-geo-ucgende-acilar-031",
  "alan-donusumleri",
  "tyt-geo-cember-aci-040",
  "tyt-geo-daire-040",
  "tyt-geo-silindir-koni-kure-040",
];

test.use({ viewport: { width: 320, height: 900 } });

test("the recovered task-list links appear with source topic labels in each normal lesson", async ({ page }) => {
  test.setTimeout(120_000);
  for (const lessonId of lessons) {
    await page.goto(`./#/lesson?id=${lessonId}`);
    const panel = page.locator(`[data-video-lesson031="${lessonId}"]`);
    const groups = catalogue.filter((group) => group.lessonIds.includes(lessonId));
    await expect(panel.getByRole("heading", { name: "Konuyla ilgili videolar" })).toBeVisible();
    await panel.locator("summary").press("Enter");
    const displayed = await panel.locator("a").evaluateAll((links) => links.map((link) => ({
      href: link.getAttribute("href"),
      topics: link.querySelector(".video-topic031")?.textContent?.split(" · ") ?? [],
    })));
    for (const group of groups) {
      for (const entry of [...group.recommended, ...group.alternatives]) {
        expect(displayed.some((link) => link.href === entry.url && link.topics.includes(group.topic)),
          `${lessonId} · ${group.topic} · ${entry.channel}`).toBe(true);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});
