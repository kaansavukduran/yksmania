import { expect, test } from "@playwright/test";
import { issueLine, openGuideDrawings, svgLayoutAudit } from "./helpers/svgAudit";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

const models = [
  { lesson: "koklu-sayilar", model: "source015-nth-root" },
  { lesson: "oran-oranti", model: "source016-golden-ratio" },
  { lesson: "sayi-problemleri", model: "source017-weighted-use" },
  { lesson: "kesir-problemleri", model: "source018-inverse-remainder" },
  { lesson: "yas-problemleri", model: "source019-calendar-age" },
  { lesson: "yuzde-problemleri", model: "source020-equal-remainders" },
  { lesson: "kar-zarar-problemleri", model: "source021-fire-profit" },
];

for (const width of [320, 375, 1280]) {
  test(`revised math diagram labels clear their edges at ${width}px`, async ({ page }, info) => {
    test.setTimeout(125_000);
    await page.setViewportSize({ width, height: 860 });
    const issues: string[] = [];
    const states: [string, number][] = [];
    for (const { lesson, model } of models) {
      await openGuideDrawings(page, lesson);
      const scope = `[data-model="${model}"]`;
      const panel = page.locator(scope);
      if (await panel.getAttribute("open") === null) await panel.locator(":scope > summary").click();
      const graph = panel.getByRole("img");
      await expect(graph).toBeVisible();
      expect((await graph.boundingBox())!.width).toBeGreaterThan(100);
      const report = await page.evaluate(svgLayoutAudit, { scope, labsOnly: true, explore: true, points: 3 });
      expect(report.states).toBeGreaterThan(1);
      states.push([model, report.states]);
      issues.push(...report.issues.map((issue: Parameters<typeof issueLine>[1]) => issueLine(lesson, issue)));
    }
    await info.attach("layout-states", { body: JSON.stringify({ width, states }), contentType: "application/json" });
    expect(issues, issues.join("\n")).toEqual([]);
  });
}
