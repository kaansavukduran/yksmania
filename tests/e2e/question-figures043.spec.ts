import { expect, test, type Locator } from "@playwright/test";
import { openCourse, prepare, storage } from "./helpers/revisedCourse";
import { examDraftSchema } from "../../src/domain/examModel";
import { lineAnglesPractice042 } from "../../src/learning/geometryConditions042Practice";

test("kuvvet–ivme grafiğini, hücreleri ve eğim hesabını çevrimdışı okur", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: "Kuvvet–ivme grafiğinden kütleyi oku", exact: true }).click();
  const model = page.locator('.section-figure[data-section-figure="Kuvvet–ivme grafiğinden kütleyi oku"]');
  const initial = await storage(page);
  await expect(model).toContainText("= 4 kg");
  const slider = model.getByRole("slider", { name: /Kütle/ });
  await slider.press("End");
  await expect(model).toContainText("(24 − 12) N");
  await expect(model).toContainText("= 6 kg");
  await checkFigureBounds(model);
  expect((await storage(page)).sessions).toEqual(initial.sessions);
  expect((await storage(page)).reviews).toEqual(initial.reviews);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 5; i++) {
    await page.locator(".answer-options .answer").last().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }

  const graph = page.getByRole("figure", { name: "Net kuvvet–ivme grafiği", exact: true });
  const table = page.getByRole("table", { name: /Soru grafiğinde işaretli iki noktanın/ });
  const delta = page.getByRole("figure", { name: "Kuvvet ve ivme farklarını oku", exact: true });
  const mass = page.getByRole("figure", { name: "Grafiğin eğimi kütleyi verir", exact: true });
  await expect(graph.getByRole("img")).toHaveAccessibleDescription(/P noktasında 2 m\/s² ve 6 N, Q noktasında 4 m\/s² ve 12 N/);
  await checkFigureBounds(graph);
  await expect(table).toHaveCount(0);
  await expect(delta).toHaveCount(0);
  await expect(mass).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect(table.getByRole("columnheader")).toHaveText(["Nokta", "İvme (m/s²)", "Net kuvvet (N)"]);
  await expect(table.getByRole("rowheader")).toHaveText(["P", "Q"]);
  await expect(table.getByRole("cell")).toHaveText(["2", "6", "4", "12"]);
  expect((await storage(page)).draft?.helpLevel).toBe(1);
  await expect(delta).toHaveCount(0);

  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(delta.getByRole("img")).toHaveAccessibleDescription(/yatay fark 2 m\/s², düşey fark 6 N/);
  await checkFigureBounds(delta);
  const deltaLabel = delta.locator("svg text").filter({ hasText: /^ΔF$/ });
  expect(await deltaLabel.evaluate((text: SVGTextElement) => {
    const guide = [...text.ownerSVGElement!.querySelectorAll<SVGLineElement>("line:not(.source-figure-guide)")].at(-1)!;
    return text.getBBox().x - guide.x1.baseVal.value;
  })).toBeGreaterThan(4);
  await expect(mass).toHaveCount(0);
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(mass.getByRole("math")).toHaveAccessibleName(/Sonuç 3 kilogram/);
  const after = await storage(page);
  expect(after.sessions).toEqual(before.sessions);
  expect(after.reviews).toEqual(before.reviews);
  await graph.screenshot({ path: info.outputPath("kuvvet-ivme-320.png") });
  await delta.screenshot({ path: info.outputPath("kuvvet-ivme-farklari-320.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("kuvvet–ivme örneği ayrı kopya kağıdında çevrimdışı açılır", async ({ page, context }) => {
  await prepare(page);
  const initial = await storage(page);
  await context.setOffline(true);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page.locator(".sidebar").getByRole("button", { name: "Kopya Kağıtları", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Newton hareket");
  await page.getByRole("button", { name: "Newton hareket yasaları", exact: true }).click();
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: "Kuvvet–ivme grafiğinden kütleyi oku", exact: true }),
  });
  await expect(section).toContainText("8 / 2 = 4 kg");
  await expect(section.getByText("İvme (m/s²)", { exact: true })).toHaveCount(2);
  await expect(section.getByText("Net kuvvet (N)", { exact: true })).toHaveCount(2);
  await expect(section.getByText("16", { exact: true })).toBeVisible();
  expect((await storage(page)).sessions).toEqual(initial.sessions);
  expect((await storage(page)).reviews).toEqual(initial.reviews);
});

test.use({
  locale: "tr-TR",
  timezoneId: "Europe/Istanbul",
  viewport: { width: 320, height: 850 },
});

async function checkFigureBounds(figure: Locator) {
  const outside = await figure.locator("svg").evaluate((node: SVGSVGElement) => {
    const { x, y, width, height } = node.viewBox.baseVal;
    return Array.from(node.querySelectorAll("text")).flatMap((label) => {
      const box = label.getBBox();
      const fits = box.x >= x && box.y >= y && box.x + box.width <= x + width && box.y + box.height <= y + height;
      return fits ? [] : [{ label: label.textContent, x: box.x, y: box.y, width: box.width, height: box.height }];
    });
  });
  expect(outside).toEqual([]);
}

test("kuvvet kartı yönleri, işaretli ipucunu ve iki çözüm çizimini çevrimdışı gösterir", async ({ page, context }, info) => {
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const stem = page.getByRole("figure", { name: "Cisme etki eden kuvvetler", exact: true });
  const hint = page.getByRole("figure", { name: "Sağı pozitif seç", exact: true });
  const net = page.getByRole("figure", { name: "Bileşke kuvvet", exact: true });
  const acceleration = page.getByRole("figure", { name: "Bileşkeyi kütleye böl", exact: true });
  await expect(stem.locator("svg text")).toHaveText(["2 kg", "4 N", "10 N"]);
  await checkFigureBounds(stem);
  expect(await stem.locator("svg text").first().evaluate((label: SVGTextElement) => label.getBBox().y)).toBeGreaterThan(85);
  await expect(hint).toHaveCount(0);
  await expect(net).toHaveCount(0);
  await expect(acceleration).toHaveCount(0);
  await stem.screenshot({ path: info.outputPath("kuvvetler-320.png") });
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect(hint.locator("svg text")).toHaveText(["2 kg", "−4 N", "+10 N"]);
  await checkFigureBounds(hint);
  expect((await storage(page)).draft?.helpLevel).toBe(1);
  await expect(net).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(net.locator("svg text")).toHaveText(["2 kg", "+6 N"]);
  await checkFigureBounds(net);
  await expect(acceleration).toHaveCount(0);
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(acceleration.getByRole("math")).toHaveAccessibleName(/saniye karede 3 metre ve sağa doğru/);
  await net.screenshot({ path: info.outputPath("bileske-320.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("geometri sorusunun verilen, ipucu ve çözüm çizimleri yalnız ilgili adımda açılır", async ({ page, context }, info) => {
  test.setTimeout(105_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, {
    lesson: "tyt-geo-acilar-kaynak-pekitirme-032",
    search: "Geometrinin dili",
  });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 20; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }

  const drawing = (name: string) => page.locator(`.source-question-figure[aria-label="${name}"]`);
  const stem = drawing("Verilen kesişim").and(page.locator(".question-panel > figure"));
  const hint = drawing("Ortak kolu bul");
  const first = drawing("Komşu açıyı hesapla");
  const last = drawing("Ters açıyı hesapla");
  await expect(stem.locator("svg text")).toHaveText(["64°"]);
  await expect(stem.getByRole("img", { name: "Verilen kesişim", exact: true })).toHaveAccessibleDescription(/Diğer kesişimin ölçüsü verilmemiş/);
  await expect(stem.locator("svg path")).toHaveCount(1);
  await expect(hint).toHaveCount(0);
  await expect(first).toHaveCount(0);
  await expect(last).toHaveCount(0);
  const before = await storage(page);
  expect(before.draft?.helpLevel ?? 0).toBe(0);
  await stem.screenshot({ path: info.outputPath("verilen-kesisim-320.png") });

  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(hint.locator("svg path")).toHaveCount(2);
  expect((await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.locator("svg text")).toHaveText(["64°"]);
  await expect(page.getByRole("complementary", { name: "İpucu", exact: true })).not.toContainText(/116°|ters açı eşit/i);
  await expect(first).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(first.locator("svg text")).toHaveText(["64°", "116°"]);
  await expect(last).toHaveCount(0);
  expect((await storage(page)).draft?.helpLevel).toBe(3);
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(last.locator("svg text")).toHaveText(["64°", "116°", "64°"]);
  await checkFigureBounds(last);
  await last.screenshot({ path: info.outputPath("ters-acilar-cozum-320.png") });
  await page.getByRole("button", { name: "Önceki adım", exact: true }).click();
  await expect(last).toHaveCount(0);
  expect((await storage(page)).draft?.helpLevel).toBe(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const saved = await storage(page);
  expect(saved.sessions).toEqual(before.sessions);
  expect(saved.reviews).toEqual(before.reviews);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(stem).toBeVisible();
  expect((await storage(page)).draft).toEqual(saved.draft);
  await page.locator(".answer-options .answer").first().click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await expect.poll(async () => (await storage(page)).draft?.responses.at(-1)?.assisted).toBe(true);
});

test("kayıtlı deneme ve sonuç sayfası yalnız eşleşen soru sürümünün çizimini açar", async ({ page, context }) => {
  await prepare(page);
  const existing = await storage(page);
  const angle = lineAnglesPractice042[2];
  const now = new Date("2026-11-23T12:00:00Z").getTime();
  const fixture = examDraftSchema.parse({
    id: "exam:source-figures-revision-fixture",
    title: "Görsel sürüm denetimi",
    kind: "branch",
    exam: "TYT",
    items: [
      {
        id: "n1",
        lessonId: "newton",
        subjectId: "tyt-fizik",
        subjectName: "Fizik",
        lessonTitle: "Kuvvet ve Newton yasaları",
        prompt: "2 kg cisme sağa 10 N, sola 4 N uygulanıyor. İvme?",
        options: ["Sağa 3 m/s²", "Sağa 7 m/s²", "Sola 3 m/s²"],
        answer: 0,
        explanation: "Fnet=10−4=6 N sağa; a=6/2=3 m/s² sağa.",
        hint: "Önce net kuvveti bul, sonra kütleye böl.",
      },
      {
        id: angle.id,
        lessonId: "tyt-geo-acilar-kaynak-pekitirme-032",
        subjectId: "tyt-geometri",
        subjectName: "Geometri",
        lessonTitle: "Geometrinin dili: kaynakla pekiştir",
        prompt: angle.prompt.tr + " Yedekteki eski soru metni.",
        options: angle.options.map((option) => option.tr),
        answer: angle.answer,
        explanation: angle.explanation.tr,
      },
    ],
    answers: [null, null],
    flagged: [],
    index: 0,
    startedAt: now,
    deadline: now + 600_000,
    durationSeconds: 600,
    mode: "learning",
    helpEnabled: true,
    helpLevels: [0, 0],
  });
  // Represent an existing saved exam. All reopening, assistance and finish actions use the normal UI.
  await page.evaluate((state) => new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("yksmania", 2);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("state", "readwrite");
      tx.objectStore("state").put(state, "current");
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onabort = () => { db.close(); reject(tx.error); };
    };
  }), { ...existing, examDraft: fixture });
  await context.setOffline(true);
  await page.goto("/#/exams");
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  const exam = page.locator(".exam-question");
  await expect(exam.getByRole("figure", { name: "Cisme etki eden kuvvetler", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(exam.getByRole("figure", { name: "Sağı pozitif seç", exact: true })).toBeVisible();
  expect((await storage(page)).examDraft?.helpLevels?.[0]).toBe(1);
  await page.getByRole("button", { name: "Soru 2, boş", exact: true }).click();
  await expect(exam.getByRole("heading", { level: 2 })).toContainText("Yedekteki eski soru metni.");
  await expect(exam.locator(".source-question-figure")).toHaveCount(0);
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Bitir ve sonucu gör", exact: true }).click();
  const results = page.locator(".exam-solution");
  await expect(results).toHaveCount(2);
  await results.first().locator("summary").click();
  await expect(results.first().getByRole("figure", { name: "Cisme etki eden kuvvetler", exact: true })).toBeVisible();
  await results.last().locator("summary").click();
  await expect(results.last().locator(".source-question-figure")).toHaveCount(0);
  const finished = await storage(page);
  expect(finished.examSessions.at(-1)?.items).toEqual(fixture.items);
  expect(finished.sessions).toEqual(existing.sessions);
  expect(finished.reviews).toEqual(existing.reviews);
});
