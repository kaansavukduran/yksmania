import { test, expect } from "@playwright/test";
import { lessonGuides } from "../../src/learning/guides";
import { auditSvgLabels } from "./helpers/svgAudit";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

/*
 * Lab and figure layout gate (Faz 0): on every guide page no visible SVG label
 * overlaps another label, leaves its SVG or is cut by a line. The guides are
 * split into four groups per width so CI shards share the load.
 */
type Issue = { name: string; kind: string; s: string };
const GUIDES = [...lessonGuides.keys()];
const GROUPS = 4;

for (const width of [320, 1280])
  for (let group = 0; group < GROUPS; group++)
    test(`054 lab and figure labels stay clear at ${width}px (grup ${group + 1}/${GROUPS})`, async ({ page }) => {
      test.setTimeout(420_000);
      await page.setViewportSize({ width, height: 900 });
      const issues: (Issue & { guide: string })[] = [];
      for (const guide of GUIDES.filter((_, i) => i % GROUPS === group)) {
        await page.goto(`/#/lesson?id=${guide}`);
        await expect(page.locator("main h1, main h2").first()).toBeVisible();
        await page.evaluate(() => document.fonts.ready.then(() => undefined));
        await page.waitForTimeout(250);
        for (const issue of (await page.evaluate(auditSvgLabels)) as Issue[]) issues.push({ guide, ...issue });
      }
      expect(issues).toEqual([]);
    });
