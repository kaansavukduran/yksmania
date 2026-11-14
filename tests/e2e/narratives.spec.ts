import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { narrativePacks } from "../../src/learning/narratives";
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function open(page: Page, id: string) {
  const pack = narrativePacks.find((p) => p.id === id)!;
  await nav(page, "Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(pack.title);
  await page
    .getByRole("button", {
      name: new RegExp(pack.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    })
    .click();
  await expect(
    page.getByRole("heading", { name: pack.title, exact: true }),
  ).toBeVisible();
  await expect(page.locator(".narrative-lab")).toBeVisible();
}
async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onsuccess = () => {
          const db = r.result,
            q = db.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            resolve(q.result);
            db.close();
          };
          q.onerror = () => reject(q.error);
        };
        r.onerror = () => reject(r.error);
      }),
  );
}
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-14T12:00:00Z"));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
});
for (const subject of [
  "tyt-biyoloji",
  "tyt-tarih",
  "tyt-fizik",
  "tyt-matematik",
  "tyt-kimya",
  "tyt-turkce",
]) {
  test(`${subject}: authored scenarios, explanations and recall persist offline without creating question credit`, async ({
    page,
    context,
  }) => {
    test.setTimeout(120000);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await context.setOffline(true);
    for (const pack of narrativePacks.filter((p) => p.subjectId === subject)) {
      await open(page, pack.id);
      const lab = page.locator(".narrative-lab"),
        scenario = pack.cases[1];
      for (const graphCase of pack.cases.slice(0, 2)) {
        await lab
          .getByRole("button", { name: graphCase.name, exact: true })
          .click();
        const icon = await lab
          .locator(".walk-step-controls button svg")
          .last()
          .boundingBox();
        expect(icon!.width).toBeLessThan(40);
        expect(icon!.height).toBeLessThan(40);
        const intersections = await lab
          .locator(":scope > svg")
          .evaluate((svg) => {
            const labels = [...svg.querySelectorAll(".walk-node > text")].map(
              (label) => label.getBoundingClientRect(),
            );
            let hits = 0;
            for (const link of svg.querySelectorAll(".walk-path + text")) {
              const box = link.getBoundingClientRect();
              if (
                labels.some(
                  (rect) =>
                    box.left < rect.right &&
                    box.right > rect.left &&
                    box.top < rect.bottom &&
                    box.bottom > rect.top,
                )
              )
                hits++;
            }
            for (const path of svg.querySelectorAll<SVGPathElement>(
              ".walk-path",
            )) {
              for (let at = 0; at <= path.getTotalLength(); at += 2) {
                const point = path
                  .getPointAtLength(at)
                  .matrixTransform(path.getScreenCTM()!);
                if (
                  labels.some(
                    (rect) =>
                      point.x > rect.left &&
                      point.x < rect.right &&
                      point.y > rect.top &&
                      point.y < rect.bottom,
                  )
                )
                  hits++;
              }
            }
            return hits;
          });
        expect(intersections).toBe(0);
      }
      const last = scenario.nodes.at(-1)!;
      await lab
        .locator(".walk-node-controls")
        .getByRole("button", { name: last.label, exact: true })
        .click();
      await expect(lab.locator(".walk-explanation")).toContainText(last.detail);
      await expect(lab.locator(".walk-conclusion")).toContainText(
        scenario.conclusion,
      );
      const recall = page.getByRole("region", {
        name: "Bakmadan hatırla",
        exact: true,
      });
      await recall
        .getByRole("button", { name: "Hatırlama 2", exact: true })
        .click();
      await recall
        .getByRole("textbox")
        .fill("Kendi açıklamam: neden ile sonucu bağlarım.");
      await recall
        .getByRole("button", { name: "Gerekçeyi göster", exact: true })
        .click();
      await expect(recall.locator(".recall-explanation")).toContainText(
        pack.recall[1].answer,
      );
      await expect(
        page.getByRole("button", { name: "Sorulara geç", exact: true }),
      ).toHaveCount(0);
      await page.reload();
      await expect(lab.locator(".walk-conclusion")).toContainText(
        scenario.conclusion,
      );
      await expect(recall.getByRole("textbox")).toHaveValue(
        "Kendi açıklamam: neden ile sonucu bağlarım.",
      );
    }
    const state = await stored(page);
    expect(state.sessions).toEqual([]);
    expect(state.reviews).toEqual([]);
    expect(state.topicProgress).toEqual({});
  });
}
test("numeric discoveries handle zero, chain count, pH ratio, BCE and signed velocity using actual controls", async ({
  page,
  context,
}) => {
  await open(page, "karbohidratlar");
  await page
    .getByRole("spinbutton", {
      name: "Monosakkarit sayısı, sayıyla",
      exact: true,
    })
    .fill("8");
  await page
    .getByRole("slider", { name: "Ayrı zincir sayısı", exact: true })
    .fill("3");
  await expect(page.locator(".model-result")).toContainText(
    "8 − 3 = 5 glikozit bağı",
  );
  await open(page, "su-asit-baz-tuz");
  await page.getByRole("slider", { name: "pH", exact: true }).fill("5");
  await expect(page.locator(".model-result")).toContainText("Asidik");
  await expect(page.locator(".concept-model")).toContainText(
    "10’un 2. kuvveti",
  );
  await open(page, "tarih-zaman");
  await page
    .getByRole("button", { name: "Milattan önce", exact: true })
    .click();
  await page
    .getByRole("spinbutton", { name: "Tarih yılı, sayıyla", exact: true })
    .fill("220");
  await expect(page.locator(".model-result")).toContainText(
    "MÖ 220: 3. yüzyıl, 2. yarı, 4. çeyrek",
  );
  await page
    .getByRole("spinbutton", { name: "Tarih yılı, sayıyla", exact: true })
    .fill("0");
  await expect(page.getByRole("alert")).toContainText(
    "Son geçerli değer korundu",
  );
  await page
    .getByRole("button", { name: "Son geçerli değere dön", exact: true })
    .click();
  await expect(
    page.getByRole("spinbutton", { name: "Tarih yılı, sayıyla", exact: true }),
  ).toHaveValue("220");
  await open(page, "sayi-basamaklari");
  await page
    .getByRole("spinbutton", { name: "Onluk doğal sayı, sayıyla", exact: true })
    .fill("0");
  await expect(page.locator(".model-result")).toContainText(
    "Basamak değeri: 0 × 1 = 0",
  );
  await open(page, "madde-ozkutle");
  await page
    .getByRole("button", {
      name: "Kütleyi ve hacmi iki katına çıkar",
      exact: true,
    })
    .click();
  await expect(page.locator(".model-result")).toContainText(
    "400/200 = 2 g/cm³",
  );
  await open(page, "dogrusal-hareket");
  await page
    .getByRole("slider", { name: "Birinci yer değiştirme (m)", exact: true })
    .fill("8");
  await page
    .getByRole("slider", { name: "İkinci yer değiştirme (m)", exact: true })
    .fill("-3");
  await page
    .getByRole("slider", { name: "Birinci süre (s)", exact: true })
    .fill("2");
  await page
    .getByRole("slider", { name: "İkinci süre (s)", exact: true })
    .fill("3");
  await expect(page.locator(".model-result")).toContainText(
    "Yol: 11 m · Yer değiştirme: 5 m",
  );
  await expect(page.locator(".concept-model")).toContainText(
    "Ortalama hız = 5/5 = 1 m/s",
  );
  await expect(page.locator(".model-data")).toContainText("-1");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".model-result")).toContainText(
    "Yol: 11 m · Yer değiştirme: 5 m",
  );
  await page
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(page.locator(".topic-repeat-targets")).toContainText(
    "16/11/2026",
  );
  await nav(page, "Bugün");
  await expect(
    page.getByRole("region", { name: "Bugünün çalışma yolu", exact: true }),
  ).toContainText("Doğrusal hareket");
  expect((await stored(page)).sessions).toEqual([]);
});
test("new models keep controls usable at 320px with 200% UI and 150% text; notes remain below", async ({
  page,
  context,
}) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 320, height: 900 });
  await nav(page, "Ayarlar");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByLabel("Tema", { exact: true }).selectOption("light");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  for (const id of [
    "proteinler",
    "tarih-zaman",
    "madde-ozkutle",
    "dogrusal-hareket",
    "sayi-basamaklari",
    "izotop-izoton-izobar",
    "enerji-ve-hareket",
    "bolme-bolunebilme",
    "ebob-ekok",
    "ses-bilgisi",
    "sozcukte-yapi",
  ]) {
    await open(page, id);
    const lab = page.locator(".narrative-lab");
    await lab
      .getByRole("button", { name: "Sonraki adım", exact: true })
      .click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    const article = await page.locator(".lesson-article").boundingBox(),
      notes = await page.locator(".study-notes").boundingBox();
    expect(notes!.y).toBeGreaterThanOrEqual(article!.y + article!.height);
    const result = await new AxeBuilder({ page })
      .include(".main-content")
      .analyze();
    expect(
      result.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact!),
      ),
    ).toEqual([]);
    const motion = await lab
      .locator(".walk-path.active")
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(motion).toBe("none");
  }
});
test("division, common periods, energy and word transformations explain changed controls and preserve them offline", async ({
  page,
  context,
}) => {
  await open(page, "bolme-bolunebilme");
  await page
    .getByRole("spinbutton", {
      name: "Bölünen nesne sayısı, sayıyla",
      exact: true,
    })
    .fill("29");
  await page
    .getByRole("spinbutton", {
      name: "Bir gruptaki nesne sayısı, sayıyla",
      exact: true,
    })
    .fill("6");
  await expect(page.locator(".model-result")).toContainText("29 = 6 × 4 + 5");
  await page
    .getByRole("spinbutton", {
      name: "Bölünen nesne sayısı, sayıyla",
      exact: true,
    })
    .fill("0");
  await expect(page.locator(".model-result")).toContainText("0 = 6 × 0 + 0");
  await open(page, "ebob-ekok");
  await page
    .getByRole("slider", { name: "Geçen zaman", exact: true })
    .fill("18");
  await expect(
    page.getByRole("region", { name: "Ortak parça ve tekrar", exact: true }),
  ).toContainText("A henüz tekrar noktasında değil; B tekrar noktasında");
  await page
    .getByRole("slider", { name: "Geçen zaman", exact: true })
    .fill("36");
  await expect(page.locator(".concept-model")).toContainText(
    "İlk pozitif ortak tekrar",
  );
  await open(page, "enerji-ve-hareket");
  await page
    .getByRole("slider", { name: "Anlık yükseklik (m)", exact: true })
    .fill("5");
  await page
    .getByRole("slider", {
      name: "Azalan potansiyelin iç enerjiye aktarılan yüzdesi",
      exact: true,
    })
    .fill("20");
  await expect(page.locator(".model-result")).toContainText(
    "200 J = 100 J potansiyel + 80 J kinetik + 20 J aktarım",
  );
  await page
    .getByRole("slider", { name: "Anlık yükseklik (m)", exact: true })
    .fill("0");
  const contact = await page
    .locator(".energy-height-marker")
    .evaluate(
      (el) => Number(el.getAttribute("y")) + Number(el.getAttribute("height")),
    );
  expect(contact).toBe(230);
  await open(page, "atomun-temel-tanecikleri");
  await page
    .getByRole("slider", { name: "Elektron sayısı", exact: true })
    .fill("10");
  await expect(page.locator(".model-result")).toContainText("q = 11 − 10 = +1");
  await open(page, "izotop-izoton-izobar");
  await page
    .getByRole("button", { name: "İzoton örneği", exact: true })
    .click();
  await expect(page.locator(".atom-comparison")).toContainText("¹³₆C");
  await expect(page.locator(".concept-model")).toContainText(
    "Nötron sayısı 7, protonlar farklı",
  );
  await open(page, "ses-bilgisi");
  await page
    .getByRole("region", { name: "Ses değişimi keşfi", exact: true })
    .getByRole("button", { name: "kitapta", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Eki birleştir", exact: true })
    .click();
  await expect(page.locator(".model-result")).toContainText("Ünsüz benzeşmesi");
  await open(page, "sozcukte-yapi");
  await page.getByRole("button", { name: "Evlerimizden", exact: true }).click();
  await page
    .locator(".word-branches")
    .getByRole("button", { name: /evlerimizden/ })
    .click();
  await expect(page.locator(".model-result")).toContainText(
    "Uzun olsa da yapı basittir",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".model-result")).toContainText(
    "Uzun olsa da yapı basittir",
  );
  const s = await stored(page);
  expect(s.sessions).toEqual([]);
  expect(s.topicProgress).toEqual({});
});
