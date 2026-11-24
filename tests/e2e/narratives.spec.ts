import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { narrativePacks } from "../../src/learning/narratives";
import { openRecall } from "./helpers/guidePages";
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function open(page: Page, id: string) {
  const pack = narrativePacks.find((p) => p.id === id)!;
  const title =
    id === "ses-bilgisi"
      ? "Ses bilgisi: sesi karşılaştır, olayı kanıtla"
      : id === "sozcukte-yapi"
        ? "Sözcükte yapı: kökten anlama, adım adım"
        : id === "nukleik-asitler"
          ? "Nükleik asitler: DNA ve RNA’yı kur ve karşılaştır"
          : pack.title;
  await nav(page, "Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  await page
    .getByRole("button", {
      name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    })
    .click();
  await expect(
    page.getByRole("heading", { name: title, exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(
      id === "ses-bilgisi" || id === "sozcukte-yapi"
        ? ".language-lab"
        : id === "nukleik-asitler"
          ? ".nucleic-lab"
          : ".narrative-lab",
    ),
    // The lab is a lazily loaded chunk served from the offline cache; a busy
    // CI runner at 200% UI can need more than the default 5 s to mount it.
  ).toBeVisible({ timeout: 15000 });
}
async function languageInteraction(page: Page, id: string) {
  if (id === "ses-bilgisi") {
    await page
      .getByRole("combobox", { name: "Ses örneği", exact: true })
      .selectOption("1");
    await page
      .getByRole("combobox", { name: "Beklediğin ses olayı", exact: true })
      .selectOption("Yumuşama");
    await page
      .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
      .click();
    await expect(page.locator(".language-feedback")).toContainText(
      "Başlangıç ile sonucu yeniden karşılaştır",
    );
    await page
      .getByRole("combobox", { name: "Beklediğin ses olayı", exact: true })
      .selectOption("Benzeşme");
    await page
      .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
      .click();
    await expect(page.locator(".language-feedback")).toContainText(
      "Karşılaştırman bu örnekle örtüşüyor",
    );
    await expect(page.locator(".language-result")).toContainText("kitapta");
  } else {
    await page
      .getByRole("combobox", { name: "Yapı örneği", exact: true })
      .selectOption("0");
    await page
      .getByRole("button", { name: "Sözcüğü birleştir", exact: true })
      .click();
    await expect(
      page.getByRole("status", { name: "Birleşen sözcük", exact: true }),
    ).toHaveText("evlerimizden");
    await expect(page.locator(".language-result")).toContainText(
      "0 yapım · 3 çekim · Basit",
    );
    await page
      .getByRole("button", { name: "Bir yapım eki ekle: -siz", exact: true })
      .click();
    await expect(page.locator(".language-result")).toContainText(
      "1 yapım · 3 çekim · Türemiş",
    );
    await page
      .getByRole("button", { name: "Yapım ekini çıkar: -siz", exact: true })
      .click();
    await expect(page.locator(".language-result")).toContainText(
      "0 yapım · 3 çekim · Basit",
    );
  }
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
      if (subject === "tyt-turkce") {
        await languageInteraction(page, pack.id);
        const evidence = await page
          .locator(".language-result")
          .evaluate((el) => el.textContent ?? "");
        const paragraphs = await page
          .locator(".language-result > p")
          .allTextContents();
        const heading = await page
          .locator(".language-result > strong,.language-result > h3")
          .allTextContents();
        await openRecall(page);
        const recalls = page.locator(".guide-recall details");
        await expect(recalls).toHaveCount(4);
        for (const recall of await recalls.all()) {
          await recall.locator("summary").click();
          await expect(recall.locator("p")).not.toBeEmpty();
        }
        await expect(page.locator(".narrative-recall")).toHaveCount(1);
        for (const name of ["Hatırlama 1", "Hatırlama 2"]) {
          await expect(
            page
              .locator(".narrative-recall")
              .getByRole("button", { name, exact: true }),
          ).toBeVisible();
        }
        const ownNote = page
          .locator(".study-notes")
          .getByRole("textbox", { name: "Notun", exact: true });
        await ownNote.fill(
          "Kendi açıklamam: kanıtı önceki biçimle karşılaştırırım.",
        );
        await expect(page.locator(".save-status")).toContainText(
          "Bu cihazda kaydedildi",
        );
        await page.reload();
        await expect(page.locator(".language-result")).toHaveText(evidence);
        await expect(page.locator(".language-result > p")).toHaveText(
          paragraphs,
        );
        await expect(
          page.locator(".language-result > strong,.language-result > h3"),
        ).toHaveText(heading);
        await expect(ownNote).toHaveValue(
          "Kendi açıklamam: kanıtı önceki biçimle karşılaştırırım.",
        );
        await expect(page.locator(".answer")).toHaveCount(0);
        continue;
      }
      if (pack.id === "nukleik-asitler") {
        const lab = page.locator(".nucleic-lab");
        await lab
          .getByRole("button", { name: "Zincirleri karşılaştır", exact: true })
          .click();
        await lab
          .getByRole("button", { name: "Seçili bazı G yap", exact: true })
          .click();
        await lab
          .getByRole("button", {
            name: "Bağları ve hesabı göster",
            exact: true,
          })
          .click();
        await expect(lab.locator(".nucleic-result > strong")).toHaveText(
          "16 hidrojen bağı",
        );
        await expect(lab.locator('line[data-bond="hydrogen"]')).toHaveCount(16);
        await openRecall(page);
        const recalls = page.locator(".guide-recall details");
        await expect(recalls).toHaveCount(5);
        for (const recall of await recalls.all()) {
          await recall.locator("summary").click();
          await expect(recall.locator("p")).not.toBeEmpty();
        }
        await expect(page.locator(".narrative-recall")).toHaveCount(1);
        for (const name of ["Hatırlama 1", "Hatırlama 2"]) {
          await expect(
            page
              .locator(".narrative-recall")
              .getByRole("button", { name, exact: true }),
          ).toBeVisible();
        }
        const ownNote = page
          .locator(".study-notes")
          .getByRole("textbox", { name: "Notun", exact: true });
        const note =
          "Kendi açıklamam: iki A–T ve dört G–C çifti toplam 16 H bağı kurar; RNA için aynı hesabı zorlamam.";
        await ownNote.fill(note);
        await expect
          .poll(
            async () => (await stored(page)).notes["lesson:nukleik-asitler"],
          )
          .toBe(note);
        await expect(page.locator(".save-status")).toContainText(
          "Bu cihazda kaydedildi",
        );
        const saved = (await stored(page)).explorations["nucleic-acids"];
        expect(saved).toMatchObject({
          panel: "chains",
          sequence: "GGTCCA",
          showBonds: true,
        });
        await page.reload();
        await expect(
          lab.getByRole("combobox", { name: "Örnek baz dizisi", exact: true }),
        ).toHaveValue("GGTCCA");
        await expect(lab.locator(".nucleic-result > strong")).toHaveText(
          "16 hidrojen bağı",
        );
        await expect(lab.locator('line[data-bond="hydrogen"]')).toHaveCount(16);
        await expect(ownNote).toHaveValue(note);
        expect((await stored(page)).explorations["nucleic-acids"]).toEqual(
          saved,
        );
        await expect(page.locator(".answer")).toHaveCount(0);
        continue;
      }
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
      await openRecall(page);
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
      await expect(page.locator(".answer")).toHaveCount(0);
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
  await page
    .locator(".concept-model")
    .getByRole("slider", { name: "pH", exact: true })
    .fill("5");
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
  await setThemePreference(page, "light");
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
    const isLanguage = id === "ses-bilgisi" || id === "sozcukte-yapi";
    const lab = page.locator(isLanguage ? ".language-lab" : ".narrative-lab");
    if (isLanguage) await languageInteraction(page, id);
    else
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
    if (isLanguage)
      expect(
        await lab
          .locator(".morph-piece")
          .first()
          .evaluate((el) => getComputedStyle(el).transitionDuration),
      ).toBe("0s");
    else {
      const motion = await lab
        .locator(".walk-path.active")
        .evaluate((el) => getComputedStyle(el).animationName);
      expect(motion).toBe("none");
    }
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
  await languageInteraction(page, "ses-bilgisi");
  await open(page, "sozcukte-yapi");
  await languageInteraction(page, "sozcukte-yapi");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".language-result")).toContainText(
    "0 yapım · 3 çekim · Basit",
  );
  const s = await stored(page);
  expect(s.sessions).toEqual([]);
  expect(s.topicProgress).toEqual({});
});
