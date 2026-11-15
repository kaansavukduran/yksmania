import { test, expect } from "@playwright/test";
import { createServer } from "vite";

test("YKS-069 development update bridge settles while the menu, theme and scale remain usable", async ({
  page,
}, testInfo) => {
  const server = await createServer({
    root: process.cwd(),
    cacheDir: testInfo.outputPath("vite-cache"),
    server: { host: "127.0.0.1", port: 0, strictPort: true, hmr: false },
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    const text = message.text();
    if (
      /Maximum update depth|Too many re-renders|Minified React error|Invalid hook call/.test(
        text,
      )
    )
      errors.push(text);
  });
  try {
    await server.listen();
    const address = server.httpServer!.address();
    if (!address || typeof address === "string")
      throw Error("DEVELOPMENT_SERVER_ADDRESS");
    await page.goto(`http://127.0.0.1:${address.port}/`);
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await page
      .locator(".sidebar")
      .getByRole("button", { name: "Ayarlar", exact: true })
      .click();
    const theme = page.getByLabel("Tema", { exact: true });
    await theme.selectOption("light");
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("115");
    await theme.selectOption("contrast");
    await theme.selectOption("dark");
    await page
      .locator(".sidebar")
      .getByRole("button", { name: "Konu Anlatımı", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Konu Anlatımı", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill("Simyadan");
    await expect(page.locator(".ready-topic")).toContainText(
      "Simyadan kimyaya",
    );
    await page.getByRole("button", { name: "AYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill("Vektörler");
    await expect(page.locator(".ready-topic")).toContainText("Vektörler");
    expect(errors).toEqual([]);
  } finally {
    await server.close();
  }
});
