import { expect, test, type Locator, type Page } from "@playwright/test";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

registerOfflineBootDiagnostics();
test.use({ viewport: { width: 320, height: 844 }, reducedMotion: "reduce" });

const numberTitle = "Sayı doğrusunda sırayı ve uzaklığı ayır";
const intervalTitle = "Açık ve kapalı sınırdan tam sayıları bul";
const angleTitle = "Doğrusal çiftte açıortaylar";
const exampleTitle = "Bütünler açıların iki açıortayını birleştir";

function figure(parent: Page | Locator, title: string) {
  return parent.locator(`figure[data-section-figure="${title}"]`);
}

async function checkFrame(page: Page, panel: Locator) {
  const image = panel.getByRole("img");
  await expect(image).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(await image.evaluate((svg) => {
    const frame = svg.getBoundingClientRect();
    return [...svg.querySelectorAll("text")].every((text) => {
      const label = text.getBoundingClientRect();
      return label.left >= frame.left - 1 && label.right <= frame.right + 1
        && label.top >= frame.top - 1 && label.bottom <= frame.bottom + 1;
    });
  })).toBe(true);
}

test("Number-line reading, worked interval and cheat sheet stay usable offline", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "temel-kavramlar", search: "Temel Kavramlar", title: "Temel kavramlar: sayı, değer ve tanım koşulu" });
  const compare = figure(page, numberTitle);
  const slider = compare.getByRole("slider", { name: /B’nin değeri/ });
  await expect(compare).toContainText("−3 < 2");
  const original = await compare.getByRole("img").innerHTML();
  await slider.press("Home");
  await expect(compare).toContainText("−3 > −6");
  expect(await compare.getByRole("img").innerHTML()).not.toBe(original);
  await slider.fill("-3");
  await expect(compare).toContainText("−3 = −3");
  await checkFrame(page, compare);
  const example = page.locator(".worked-example").filter({ hasText: intervalTitle });
  await example.locator("summary").press("Enter");
  await expect(figure(example, intervalTitle)).toHaveCount(0);
  await example.getByRole("button", { name: "Çözümün tamamını göster" }).press("Enter");
  const bounds = figure(example, intervalTitle);
  await expect(bounds).toContainText("→ 6 tam sayı.");
  await checkFrame(page, bounds);
  await bounds.screenshot({ path: info.outputPath("tam-sayi-sinirlari.png") });
  await page.goto("/#/cheatsheets?topic=detail-194");
  await expect(figure(page, numberTitle)).toBeVisible();
  await checkFrame(page, figure(page, numberTitle));
  expect(learning(await storage(page))).toEqual(before);
});

test("Linear pair and bisector step use the same model in theory and cheat sheet", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-acilar-kaynak-pekitirme-032";
  await openCourse(page, { lesson, search: "Geometrinin dili" });
  const model = figure(page, angleTitle);
  await expect(model).toContainText("39° + 51° = 90°");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("slider", { name: /Sağ koldan ölçülen açı/ }).press("End");
  await expect(model).toContainText("150° + 30° = 180°");
  await expect(model).toContainText("75° + 15° = 90°");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await model.screenshot({ path: info.outputPath("aciortay.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(figure(page.locator(".cheat-section"), angleTitle)).toBeVisible();
  const example = page.locator(".worked-example").filter({ hasText: exampleTitle });
  await example.locator(":scope > summary").press("Enter");
  await example.locator(".cheat-solution > summary").press("Enter");
  const explanation = figure(example, angleTitle);
  await expect(explanation).toContainText("39° + 51° = 90°");
  await checkFrame(page, explanation);
  expect(learning(await storage(page))).toEqual(before);
});

test("Division conditions are readable as a table in the lesson and cheat sheet", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, {
    lesson: "tek-cift-isaret",
    search: "iki ayrı özellik",
    title: "Tek–çift ve işaret: iki ayrı özellik",
  });
  const panel = page.getByRole("region", { name: /Bölümün paritesinden önce tam sayı oluşunu denetle/ });
  const table = panel.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveCount(3);
  await expect(table.getByRole("row")).toHaveCount(6);
  await expect(table.getByRole("row").filter({ hasText: "−18 ÷ 6" })).toContainText("Sonuç tek.");
  await expect(table.getByRole("row").filter({ hasText: "14 ÷ 6" })).toContainText("tam sayı değildir");
  await table.getByRole("row").filter({ hasText: "12 ÷ 0" }).scrollIntoViewIfNeeded();
  await expect(table.getByRole("row").filter({ hasText: "12 ÷ 0" })).toContainText("Bölüm tanımsızdır");
  await page.goto("/#/cheatsheets?topic=detail-195");
  await expect(table.getByRole("row")).toHaveCount(6);
  await panel.focus();
  await expect(panel).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(learning(await storage(page))).toEqual(before);
});

test("An angle bisector and a median mark different equalities in the same triangle", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgende-acilar-031";
  await openCourse(page, { lesson, search: "Üçgende açılar" });
  const model = figure(page, "Açıortay ve orta nokta");
  await expect(model).toContainText("25° + 25° = 50°");
  await expect(model).toContainText("= 95°");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("AM = MC.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await model.screenshot({ path: info.outputPath("kenarortay.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("25° + 25° = 50°");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("AM = MC.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A removed-term candidate can fall between two sequence terms", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/lesson?id=ardisik-sayilar");
  const title = "Silinen terim adayını listede doğrula";
  const panel = figure(page, title);
  await expect(panel).toContainText("14 listede yok");
  const beforeImage = await panel.getByRole("img").innerHTML();
  await panel.getByRole("slider", { name: /Kalan toplam/ }).press("ArrowRight");
  await expect(panel).toContainText("13 listede.");
  expect(await panel.getByRole("img").innerHTML()).not.toBe(beforeImage);
  await checkFrame(page, panel);
  await page.goto("/#/cheatsheets?topic=detail-196");
  await expect(panel).toContainText("14 listede yok");
  await panel.getByRole("slider", { name: /Kalan toplam/ }).press("ArrowRight");
  await expect(panel).toContainText("13 listede.");
  expect(learning(await storage(page))).toEqual(before);
});

test("Triangle existence is checked before wide-angle classification", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-esitsizligi-031";
  await page.goto(`/#/lesson?id=${lesson}`);
  const table = page.getByRole("region", { name: /Açı koşulunu yalnız kurulabilen üçgenlerde dene/ }).getByRole("table");
  await expect(table.getByRole("row")).toHaveCount(6);
  await expect(table.getByRole("row").filter({ hasText: "Dar açılı" })).toContainText("64 < 74");
  await expect(table.getByRole("row").filter({ hasText: "Geniş açılı" })).toHaveCount(3);
  await expect(table.getByRole("row").filter({ hasText: "Üçgen kurulmaz" })).toContainText("12");
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  const sheet = page.getByRole("region", { name: /Önce üçgen, sonra açı sınıfı/ }).getByRole("table");
  await expect(sheet.getByRole("row").filter({ hasText: "Üçgen kurulmaz" })).toContainText("12");
  expect(learning(await storage(page))).toEqual(before);
});

test("The prime-power grid contains every positive divisor once in both reading routes", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-asal-kaynak-032";
  const verifyDivisors = async (name: RegExp) => {
    const table = page.getByRole("region", { name }).getByRole("table");
    await expect(table.getByRole("columnheader")).toHaveCount(5);
    const cells = await table.locator("tbody td:not(:first-child) .guide-table-cell-value").allTextContents();
    const numbers = cells.map(Number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 72 }, (_, index) => index + 1).filter((n) => 72 % n === 0));
  };
  await page.goto(`/#/lesson?id=${lesson}`);
  await verifyDivisors(/Bütün pozitif bölenleri bağımsız seçimle say/);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await verifyDivisors(/Aralarında asal ve üç sayaç/);
  expect(learning(await storage(page))).toEqual(before);
});

test("A ramp’s horizontal distance and hypotenuse stay distinct across the slider", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-dik-ucgen-031";
  await page.goto(`/#/lesson?id=${lesson}`);
  const model = figure(page, "Dik yolda eğim ve uzunluk");
  await expect(model).toContainText("tan α = 5/12");
  await expect(model).toContainText("= 13 m");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("slider", { name: /Dikey yükselme/ }).press("End");
  await expect(model).toContainText("tan α = 9/12");
  await expect(model).toContainText("= 15 m");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("tan α = 5/12");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A composite divisor is limited by the scarcer complete group", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-faktoriyel-kaynak-033";
  await page.goto(`/#/lesson?id=${lesson}`);
  const course = page.getByRole("region", { name: /Bileşik böleni iki bütçeyle kur/ }).getByRole("table");
  const smaller = course.getByRole("row", { name: /10!/ });
  const larger = course.getByRole("row", { name: /15!/ });
  await expect(smaller).toContainText("min(4, 4) = 4");
  await expect(larger).toContainText("11 → 5");
  await expect(larger).toContainText("6 → 6");
  await expect(larger).toContainText("min(5, 6) = 5");
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  const sheet = page.getByRole("region", { name: /Asal kuvvet bütçesi/ }).getByRole("table");
  await expect(sheet.getByRole("row", { name: /15!/ })).toContainText("min(5, 6) = 5");
  expect(learning(await storage(page))).toEqual(before);
});

test("Two perpendicular distances exchange area while their sum stays constant", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgende-acilar-031";
  await page.goto(`/#/lesson?id=${lesson}`);
  const model = figure(page, "İki dik uzaklığın toplamı").first();
  await expect(model).toContainText("d₁ = 3,2, d₂ = 1,6");
  await expect(model).toContainText("d₁ + d₂ = 4,8 birim");
  await expect(model).toContainText("8 + 4 = 12 birim²");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("slider", { name: /P’nin yatay konumu/ }).press("Home");
  await expect(model).toContainText("d₁ = 0,8, d₂ = 4");
  await expect(model).toContainText("d₁ + d₂ = 4,8 birim");
  await expect(model).toContainText("2 + 10 = 12 birim²");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("d₁ = 3,2, d₂ = 1,6");
  await expect(model).toContainText("Tepe yüksekliği 4 birim.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Changing the third addend crosses the one-to-two tens boundary", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Birlikleri onluklara grupla");
  await page.goto("/#/lesson?id=sayi-basamaklari");
  await expect(model).toContainText("27 = 2 · 10 + 7");
  const dial = model.getByRole("slider", { name: /Üçüncü toplanan/ });
  await dial.press("Home");
  await dial.press("ArrowRight");
  await expect(model).toContainText("19 = 1 · 10 + 9");
  const previous = await model.getByRole("img").innerHTML();
  await dial.press("ArrowRight");
  await expect(model).toContainText("20 = 2 · 10 + 0");
  expect(await model.getByRole("img").innerHTML()).not.toBe(previous);
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-199");
  await expect(model).toContainText("27 = 2 · 10 + 7");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Three equal heights in an equilateral triangle give unequal band areas", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Eş yükseklik, farklı alan").first();
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("36 − 9 = 27 birim²");
  const dial = model.getByRole("slider", { name: /Şerit/ });
  await dial.press("Home");
  await expect(model).toContainText("9 − 0 = 9 birim²");
  const previous = await model.getByRole("img").innerHTML();
  await dial.press("End");
  await expect(model).toContainText("81 − 36 = 45 birim²");
  expect(await model.getByRole("img").innerHTML()).not.toBe(previous);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("36 − 9 = 27 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Joint divisibility keeps the shared prime requirement once", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const table = page.getByRole("region", { name: /Ayrı şartlar çarpılır mı/ }).getByRole("table");
  await page.goto("/#/lesson?id=bolme-bolunebilme");
  const shared = table.getByRole("row", { name: /4 ve 6/ }).getByRole("cell");
  await expect(shared.nth(1)).toHaveAccessibleName("12");
  await expect(shared.nth(2)).toHaveAccessibleName("24 gereksiz güçlü");
  await expect(table.getByRole("row", { name: /3 ve 4/ })).toContainText("12 yeterli ve gerekli");
  await page.goto("/#/cheatsheets?topic=detail-200");
  await expect(shared.nth(1)).toHaveAccessibleName("12");
  expect(learning(await storage(page))).toEqual(before);
});

test("The external bisector switches sides through the parallel case", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-merkezleri-031";
  const model = figure(page, "Dış açıortayda nokta uzantıda olur");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("E, B tarafındaki uzantıda.");
  await expect(model).toContainText("12/18 = 4/6");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(model).toContainText("Dış açıortay ∥ BC. Sonlu bir E noktası yok.");
  await checkFrame(page, model);
  const parallel = await model.getByRole("img").innerHTML();
  await next.press("Enter");
  await expect(model).toContainText("E, C tarafındaki uzantıda.");
  await expect(model).toContainText("24/18 = 8/6");
  expect(await model.getByRole("img").innerHTML()).not.toBe(parallel);
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("dis-aciortay-c.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("E, B tarafındaki uzantıda.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A shifted start can move or remove the first common event", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-ebob-ekok-kaynak-034";
  const model = figure(page, "Başlangıç kayarsa iki ayrı diziyi karşılaştır");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Ortak dakikalar: 24, 60.");
  const delay = model.getByRole("slider", { name: /B’nin ilk anı/ });
  await delay.press("Home");
  await expect(model).toContainText("Ortak dakikalar: 0, 36, 72.");
  await delay.press("ArrowRight");
  await expect(model).toContainText("Ortak dakika yok.");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("Ortak dakikalar: 24, 60.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Median length follows the actual side lengths as the base moves", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-merkezleri-031";
  const model = figure(page, "Kenarortay uzunluğu ve dik üçgendeki özel hâl");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("AM = 7 birim");
  const base = model.getByRole("slider", { name: /BC tabanı/ });
  await base.press("End");
  await expect(model).toContainText("BM = MC = 7 birim");
  await expect(model).toContainText("AM = 4 birim");
  await base.press("Home");
  await expect(model).toContainText("AM ≈ 7,81 birim");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("AM = 7 birim");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Distance from zero stays the same when signed fractions reverse order", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-rasyonel-kaynak-035";
  const model = figure(page, "Negatif noktaları uzaklıklarıyla karıştırma");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("−3/4 < −1/2.");
  const negative = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("3/4 > 1/2.");
  await expect(model).toContainText("Sıfıra uzaklıklar 3/4 ve 1/2 birimdir.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(negative);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("−3/4 < −1/2.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("In the same triangle the excircle touches the two side extensions", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-merkezleri-031";
  const model = figure(page, "İç merkez I: kenarlara eş dik uzaklık");
  await page.goto(`/#/lesson?id=${lesson}`);
  const next = model.getByRole("button", { name: "İleri", exact: true });
  for (let i = 0; i < 3; i++) await next.press("Enter");
  await expect(model).toContainText("r = S / s = 2 birim.");
  await expect(model).toContainText("I = (2; 2).");
  const inside = await model.getByRole("img").innerHTML();
  await next.press("Enter");
  await expect(model).toContainText("rₐ = S / (s − a) = 12 birim.");
  await expect(model).toContainText("BC’ye teğet noktası (2,4; 4,8).");
  await expect(model).toContainText("BC parçası ile AB ve AC uzantılarına teğet.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(inside);
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("dis-teget-cember.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  for (let i = 0; i < 3; i++) await next.press("Enter");
  await expect(model).toContainText("r = S / s = 2 birim.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The same linear system is graphed in the worked example and cheat sheet", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-dogrusal-denklemler-kaynak-036";
  const title = "Bir doğruyu iki noktadan çiz";
  await page.goto(`/#/lesson?id=${lesson}`);
  const table = page.getByRole("table").filter({ hasText: "İki gerçek doğrunun durumu" });
  await expect(table.getByRole("cell", { name: "Aynı doğru üzerindeki sonsuz çift", exact: true })).toBeVisible();
  const example = page.locator(".worked-example").filter({ hasText: "İki doğruyu çiz ve ortak noktayı denetle" });
  await example.locator("summary").press("Enter");
  await example.getByRole("button", { name: "Çözümün tamamını göster", exact: true }).press("Enter");
  const worked = figure(example, title);
  const next = (model: Locator) => model.getByRole("button", { name: "İleri", exact: true });
  await next(worked).press("Enter");
  await next(worked).press("Enter");
  await expect(worked).toContainText("(3, 2): 3 + 2 = 5 ve 3 − 2 = 1.");
  await checkFrame(page, worked);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  const sheet = figure(page, title);
  await next(sheet).press("Enter");
  await next(sheet).press("Enter");
  await expect(sheet).toContainText("Ortak nokta iki koşulu birden sağlar.");
  await checkFrame(page, sheet);
  expect(learning(await storage(page))).toEqual(before);
});

test("The angle between the wrong pair of sides can leave two triangles", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Arada olmayan açı iki üçgene izin verebilir");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("İki farklı üçgen kurulur.");
  await expect(model).toContainText("1,21 ve 7,45");
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("iki-ucgen.png") });
  const radius = model.getByRole("slider", { name: /AC uzunluğu/ });
  await radius.press("Home");
  await expect(model).toContainText("Üçgen kurulamaz.");
  await radius.press("ArrowRight");
  await expect(model).toContainText("Tek üçgen kurulur.");
  await checkFrame(page, model);
  await radius.fill("5");
  await expect(model).toContainText("Olası BC uzunlukları: 8,66 birim.");
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("İki farklı üçgen kurulur.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Opening the slanted constraint excludes just that edge", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-basit-esitsizlikler-kaynak-037";
  const model = figure(page, "Üç yarı düzlemin ortak bölgesi");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("(1; 0), (4; 0) ve (1; 3) çözümde.");
  const closed = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("(4; 0) ve (1; 3) dışarıda. (1; 0) çözümde kalır.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(closed);
  await checkFrame(page, model);
  const image = model.getByRole("img");
  await image.evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("acik-esitsizlik-siniri.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("(1; 0), (4; 0) ve (1; 3) çözümde.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Scaling all corresponding sides keeps similarity but loses congruence", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Üç kenarı eşleştir, ölçeği ayır");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("ABC ≅ DEF. Üç karşılıklı kenar eşit.");
  const congruent = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("DE, DF, EF: 9 · 12 · 15.");
  await expect(model).toContainText("ABC ∼ DEF.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(congruent);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("ABC ≅ DEF. Üç karşılıklı kenar eşit.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The two-focus distance equation has two outside roots and a flat minimum", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-mutlak-deger-kaynak-038";
  const model = figure(page, "İki noktaya uzaklık toplamı neden arada sabit?");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Toplam = 2 + 5 = 7");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  const x = model.getByRole("slider", { name: /^x/ });
  await x.fill("2");
  await expect(model).toContainText("Toplam = 2 + 1 = 3");
  await expect(model).toContainText("x arada: toplam iki nokta arası uzaklık, 3.");
  await x.fill("0");
  await expect(model).toContainText("Toplam = 4 + 1 = 5");
  await expect(model).toContainText("Bu x, hedef toplamı 5 yapar.");
  await x.fill("5");
  await expect(model).toContainText("Toplam = 1 + 4 = 5");
  await expect(model).toContainText("Bu x, hedef toplamı 5 yapar.");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("Toplam = 2 + 5 = 7");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Nine out of twenty-five cells leave sixteen equal cells in the strip", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-eslik-benzerlik-031";
  const model = figure(page, "Uzunluk k iken alan neden k²?");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Uzunluk oranı 2/3 ⇒ alan oranı 4/9");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("Uzunluk oranı 3/5 ⇒ alan oranı 9/25");
  await expect(model).toContainText("Yamuk DBCE: 16/25");
  await expect(model).toContainText("üst üçgen 36 birim².");
  await expect(model.getByRole("img").locator("polygon.sf-fill-a")).toHaveCount(9);
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("64 ÷ (16/25) = 100 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Changing the scientific coefficient and exponent preserves value", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-mat-uslu-sayilar-kaynak-039";
  const model = figure(page, "Normalleştirirken miktarı korumak");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("24 × 10⁴ = 2,4 × 10⁵ = 240.000");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("0,36 × 10⁸ = 3,6 × 10⁷ = 36.000.000");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("24 × 10⁴ = 2,4 × 10⁵ = 240.000");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Sliding the apex parallel to the base keeps the two partial areas", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "alan-donusumleri";
  const model = figure(page, "Alan oranını bulurken ortak olan büyüklüğü sadeleştir");
  await page.goto(`/#/lesson?id=${lesson}`);
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await next.press("Enter");
  await expect(model).toContainText("AB = 2 · 75 / 6 = 25 birim. AD = 10, DB = 15.");
  const slide = model.getByRole("slider", { name: /Noktayı kaydır/ });
  await slide.press("Home");
  const left = await model.getByRole("img").innerHTML();
  await slide.press("End");
  expect(await model.getByRole("img").innerHTML()).not.toBe(left);
  await expect(model).toContainText("Alan(PAD) = 30; alan(PDB) = 45 birim². Yükseklik 6 kalır.");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=lesson:${lesson}`);
  await next.press("Enter");
  await next.press("Enter");
  await expect(model).toContainText("Alan(PAD) = 30; alan(PDB) = 45 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Two magnifications use the updated length and preserve its unit offline", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "bilimsel-gosterim-katsayi";
  const model = figure(page, "Birbirini izleyen büyütmeleri çarp");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("0,0032 mm → 0,016 mm → 0,4 mm");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await model.getByRole("slider", { name: /İkinci büyütme/ }).press("End");
  await expect(model).toContainText("0,0125 mm → 0,05 mm → 2 mm");
  await expect(model).toContainText("4 × 40 = 160 kat");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-207");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await model.getByRole("slider", { name: /İkinci büyütme/ }).press("End");
  await expect(model).toContainText("0,0125 mm → 0,05 mm → 2 mm");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Polygon diagonal counting excludes adjacent vertices and counts each pair once", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-cokgenler-032";
  const model = figure(page, "Köşegenleri çift saymadan say");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("8·5/2 = 20");
  const slider = model.getByRole("slider", { name: /Kenar sayısı/ });
  await slider.press("ArrowLeft");
  await expect(model).toContainText("7·4/2 = 14");
  await expect(model).toContainText("900/7°");
  await expect(model.getByRole("img").locator("line")).toHaveCount(14);
  await slider.press("Home");
  await expect(model.getByRole("img").locator("line")).toHaveCount(0);
  await expect(model).toContainText("3·0/2 = 0");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await slider.press("ArrowLeft");
  await expect(model).toContainText("7·4/2 = 14");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The squared radical equation includes a candidate from the negative branch", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Köklü denklemde önce koşul, sonra kare");
  await page.goto("/#/lesson?id=koklu-sayilar");
  await expect(model).toContainText("x = 3 veya x = −1");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(model).toContainText("x = 4 veya x = −3");
  await expect(model).toContainText("√16 = 4; √9 = 3 ≠ −3");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-208");
  await next.press("Enter");
  await expect(model).toContainText("√16 = 4; √9 = 3 ≠ −3");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Perpendicular diagonals keep the midpoint rectangle dimensions as the diagonal moves", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-dortgen-hiyerarsi-032";
  const model = figure(page, "Kenar orta noktaları gizli bir paralelkenar kurar");
  await page.goto(`/#/lesson?id=${lesson}`);
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  const slide = model.getByRole("slider", { name: /D.nin yatay konumu/ });
  await slide.press("Home");
  const left = await model.getByRole("img").innerHTML();
  await slide.press("End");
  expect(await model.getByRole("img").innerHTML()).not.toBe(left);
  await expect(model).toContainText("EF = 4, FG = 7. Çevre 22 birim.");
  await expect(model).toContainText("Alan(ABCD) = 56, Alan(EFGH) = 28 birim².");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await next.press("Enter");
  await expect(model).toContainText("Alan(ABCD) = 56, Alan(EFGH) = 28 birim².");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Pump count changes duration only under the same workload", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Pompa sayısını değiştir, sabit işi koru");
  await page.goto("/#/lesson?id=oran-oranti");
  await expect(model).toContainText("120 ÷ 8 = 15 saat");
  const slider = model.getByRole("slider", { name: "Pompa sayısı" });
  await slider.fill("12");
  await expect(model).toContainText("120 ÷ 12 = 10 saat");
  const sameWork = await model.getByRole("img").innerHTML();
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(model).toContainText("240 ÷ 12 = 20 saat");
  expect(await model.getByRole("img").innerHTML()).not.toBe(sameWork);
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-209");
  await slider.fill("12");
  await next.press("Enter");
  await expect(model).toContainText("240 ÷ 12 = 20 saat");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Trapezoid height comes from the horizontal half-difference and slanted side", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-yamuk-deltoid-032";
  const model = figure(page, "İkizkenar yamukta simetriyi gerçekten doğrula");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("h = √(10² − 6²) = 8");
  await next.press("Enter");
  await expect(model).toContainText("(18 − 8)/2 = 5");
  await expect(model).toContainText("h = √(13² − 5²) = 12");
  await expect(model).toContainText("Alan = (18 + 8) × 12 / 2 = 156 birim²");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await next.press("Enter");
  await expect(model).toContainText("Alan = (18 + 8) × 12 / 2 = 156 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Capacity stays equal after removing the shared parts in a second pair of arrangements", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Kapasite eşitliği birimlerin oranını buldurur");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto("/#/lesson?id=sayi-problemleri");
  for (let step = 0; step < 4; step++) await next.press("Enter");
  await expect(model).toContainText("6a = 3b, b = 2a");
  await expect(model).toContainText("10 + 4·2 = 18 küçük kutu yeri");
  await expect(model).toContainText("4 + 7·2 = 18 küçük kutu yeri");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-210");
  for (let step = 0; step < 4; step++) await next.press("Enter");
  await expect(model).toContainText("4 + 7·2 = 18 küçük kutu yeri");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The missing vertex and both diagonal midpoints follow the same coordinates", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-paralelkenar-ozel-dortgenler-032";
  const model = figure(page, "Alanı taban ve dik uzaklıkla kur");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${lesson}`);
  for (let step = 0; step < 3; step++) await next.press("Enter");
  await expect(model).toContainText("C = B + D − A = (9; 5)");
  await expect(model).toContainText("Alan = 6 × 4 = 24 birim²");
  await expect(model).toContainText("Ortak orta nokta O(5; 3)");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  for (let step = 0; step < 3; step++) await next.press("Enter");
  await expect(model).toContainText("Alan = 6 × 4 = 24 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Taking the same fraction from the remainder and from the original amount gives different results", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Kalanın kesri yeni bir taban kullanır");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto("/#/lesson?id=kesir-problemleri");
  for (let step = 0; step < 3; step++) await next.press("Enter");
  await expect(model).toContainText("120 − 30 − 30 = 60 birim kalır");
  await expect(model).toContainText("120 − 30 − 40 = 50 birim kalır");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-211");
  for (let step = 0; step < 3; step++) await next.press("Enter");
  await expect(model).toContainText("120 − 30 − 40 = 50 birim kalır");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Doubling both rhombus diagonals doubles the circle radius and quadruples area", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-paralelkenar-ozel-dortgenler-032";
  const model = figure(page, "Eşkenar dörtgende diklik ve yarım köşegen");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Alan = 8·6/2 = 24 birim²");
  await expect(model).toContainText("r = 24/10 = 2,4 birim");
  await next.press("Enter");
  await expect(model).toContainText("Kenar = √(8² + 6²) = 10 birim");
  await expect(model).toContainText("Alan = 16·12/2 = 96 birim²");
  await expect(model).toContainText("r = 96/20 = 4,8 birim");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await next.press("Enter");
  await expect(model).toContainText("r = 96/20 = 4,8 birim");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Two age lines have the same vertical gap at any shared date", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Aynı anda herkes aynı süre yaşlanır");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  const slider = model.getByRole("slider", { name: /bugün = 0/ });
  await page.goto("/#/lesson?id=yas-problemleri");
  await next.press("Enter");
  await expect(model).toContainText("30 − 16 = 14 yıl fark");
  await slider.fill("4");
  await expect(model).toContainText("34 − 20 = 14 yıl fark");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-212");
  await next.press("Enter");
  await slider.fill("-4");
  await expect(model).toContainText("26 − 12 = 14 yıl fark");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The known perimeter and diagonal determine the two rectangle sides", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-paralelkenar-ozel-dortgenler-032";
  const model = figure(page, "Dikdörtgende eş köşegenin kaynağı");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${lesson}`);
  for (let step = 0; step < 2; step++) await next.press("Enter");
  await expect(model).toContainText("alan 168 ⇒ 24 ve 7");
  await next.press("Enter");
  await expect(model).toContainText("2ab = 17² − 169 = 120 ⇒ alan 60 ⇒ 12 ve 5");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  for (let step = 0; step < 3; step++) await next.press("Enter");
  await expect(model).toContainText("alan 60 ⇒ 12 ve 5");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Package price and price per gram use different amounts", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Paket fiyatıyla birim fiyat aynı değişken değildir");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto("/#/lesson?id=yuzde-problemleri");
  await next.press("Enter");
  await next.press("Enter");
  await expect(model).toContainText("240/480 = 0,50 TL/g");
  await expect(model).toContainText("280/400 = 0,70 TL/g");
  await expect(model).toContainText("Gram fiyatı %40 arttı");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-213");
  await next.press("Enter");
  await next.press("Enter");
  await expect(model).toContainText("Gram fiyatı %40 arttı");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Joining midpoints divides a square into two equal area groups", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-paralelkenar-ozel-dortgenler-032";
  const model = figure(page, "Orta noktalarla iç kareyi kur");
  const slider = model.getByRole("slider", { name: /Dış karenin kenarı/ });
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("İç karenin kenarı 4√2 birim");
  await expect(model).toContainText("İç karenin alanı 32 birim²");
  await expect(model).toContainText("Dört üçgen toplam 32 birim²");
  await slider.press("Home");
  await expect(model).toContainText("İç karenin alanı 8 birim²");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("Dört üçgen toplam 32 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Break-even and the first profitable sale are different quantities", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Sabit gider ve birim katkı başabaşı belirler");
  const slider = model.getByRole("slider", { name: /Satış adedi/ });
  await page.goto("/#/lesson?id=kar-zarar-problemleri");
  await expect(model).toContainText("Başabaş 40 adet");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await slider.fill("35");
  await expect(model).toContainText("Başabaş. Kâr ve zarar 0 TL");
  await slider.press("ArrowRight");
  await expect(model).toContainText("Kâr 20 TL");
  await slider.fill("40");
  await expect(model).toContainText("Kâr 100 TL");
  await checkFrame(page, model);

  await page.goto("/#/cheatsheets?topic=detail-214");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await slider.fill("34");
  await expect(model).toContainText("Zarar 20 TL");
  await expect(model).toContainText("İlk pozitif kâr 36 adette");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A kite with unequal sides has unequal parts on its symmetry diagonal", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-yamuk-deltoid-032";
  const model = figure(page, "Deltoidde alanı dört dik üçgenle tamamla");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("AC = 5 + 9 = 14");
  await next.press("Enter");
  await expect(model).toContainText("AC = 5 + 16 = 21");
  await expect(model).toContainText("Alan = 21·24/2 = 252");
  await expect(model).toContainText("Çevre = 2(13 + 20) = 66");
  await checkFrame(page, model);

  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await next.press("Enter");
  await expect(model).toContainText("Toplam 252 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("An eight-month interest timeline distinguishes interest from the balance", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Ayı ve günü oranla aynı döneme çevir");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto("/#/lesson?id=faiz-problemleri");
  await expect(model).toContainText("0,04");
  await next.press("Enter");
  const months = model.getByRole("slider");
  await months.fill("8");
  await expect(model).toContainText("8 ay = 8/12 yıl. Faiz = 240 TL");
  await expect(model).toContainText("2.400 TL + 240 TL = 2.640 TL");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-215");
  await next.press("Enter");
  await months.press("End");
  await expect(model).toContainText("12 ay = 12/12 yıl. Faiz = 360 TL");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Inscribed angles on opposite sides of a chord are supplementary", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-cember-aci-040";
  const model = figure(page, "Kirişin iki tarafında görülen yay değişir");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  const position = model.getByRole("slider");
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("ACB = 100° / 2 = 50°");
  await position.press("Home");
  await expect(model).toContainText("ACB = 100° / 2 = 50°");
  await next.press("Enter");
  await expect(model).toContainText("ADB = 260° / 2 = 130°");
  await position.press("End");
  await expect(model).toContainText("ADB = 260° / 2 = 130°");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await next.press("Enter");
  await expect(model).toContainText("ADB = 260° / 2 = 130°");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Different mixture masses give a weighted concentration", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Karışırken şeker ve su kütlesini ayrı topla");
  await page.goto("/#/lesson?id=karisim-problemleri");
  await expect(model).toContainText("Şeker 24 + 32 = 56 g");
  await expect(model).toContainText("56/200 → %28");
  const slider = model.getByRole("slider", { name: /İkinci karışımın kütlesi/ });
  await slider.fill("120");
  await expect(model).toContainText("72/240 → %30");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-216");
  await expect(model).toContainText("56/200 → %28");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The hypotenuse changes between the chord and tangent triangles", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-cember-aci-040";
  const model = figure(page, "Kiriş ve teğette hipotenüsü ayır");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${lesson}`);
  await expect(model).toContainText("Tam kiriş 24 birim");
  await next.press("Enter");
  await expect(model).toContainText("√120 ≈ 10,95 birim");
  const radius = model.getByRole("slider", { name: /Yarıçap/ });
  await radius.press("End");
  await expect(model).toContainText("√64 = 8 birim");
  await checkFrame(page, model);

  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(figure(page, "Kirişin iki tarafında görülen yay değişir")).toHaveCount(1);
  await expect(model).toContainText("Tam kiriş 24 birim");
  await next.press("Enter");
  await expect(model).toContainText("Bu dik üçgende hipotenüs O ile P arasındaki uzaklık");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Three work lines meet the one-job mark at different times", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "İş payı grafiğinde eğimleri topla");
  await page.goto("/#/lesson?id=isci-problemleri");
  await expect(model).toContainText("7,2 saat. A tek %60, B tek %40, birlikte %100 iş");
  const slider = model.getByRole("slider", { name: /Geçen süre/ });
  await slider.press("End");
  await expect(model).toContainText("12 saat. A tek %100, B tek %66,7, birlikte %100 iş");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-217");
  await expect(model).toContainText("Sonuç 7 saat 12 dakika");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The small circular segment subtracts the exact equilateral triangle area", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-geo-daire-040";
  const model = figure(page, "Daire parçası: dilimden üçgeni çıkar");
  await page.goto(`/#/lesson?id=${id}`);
  await expect(model).toContainText("9π − 18");
  const angle = model.getByRole("slider", { name: /α/ });
  await angle.press("Home");
  await expect(model).toContainText("Dilim 6π birim². Üçgen 9√3 birim²");
  await expect(model).toContainText("6π − 9√3 ≈ 3,26 birim²");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${id}`);
  await angle.press("Home");
  await expect(model).toContainText("6π − 9√3 ≈ 3,26 birim²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The delay belongs in the lesson, solved example and cheat sheet", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const title = "Gecikmiş açılış yeni evre başlatır";
  const model = figure(page, title).filter({ visible: true }).first();
  await page.goto("/#/lesson?id=havuz-problemleri");
  await expect(model).toContainText("2 saat geçti. Tank %20 dolu");
  await model.getByRole("slider").press("End");
  await expect(model).toContainText("6,8 saat geçti. Tank %100 dolu");
  await checkFrame(page, model);
  const lessonExample = page.locator(".worked-example").filter({ hasText: "Gecikmeli giriş" });
  await lessonExample.locator("summary").press("Enter");
  await lessonExample.getByRole("button", { name: "Çözümün tamamını göster", exact: true }).press("Enter");
  await expect(figure(lessonExample, title)).toContainText("6 saat 48 dakika");

  await page.goto("/#/cheatsheets?topic=detail-218");
  await expect(model).toContainText("İlk 2 saat: 2 × 1/10 = 1/5 tank");
  const sheetExample = page.locator(".worked-example").filter({ hasText: "Gecikmeli giriş" });
  await sheetExample.getByText("Gecikmeli giriş", { exact: true }).press("Enter");
  await sheetExample.getByText("Çözümü adım adım gör", { exact: true }).press("Enter");
  const sheetModel = figure(sheetExample, title);
  await expect(sheetModel).toContainText("6 saat 48 dakika");
  await checkFrame(page, sheetModel);
  expect(learning(await storage(page))).toEqual(before);
});

test("An internal division moves both coordinates by the same ratio", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Oranla bölünen noktanın yönünü denetle");
  await page.goto("/#/lesson?id=noktanin-analitigi");
  await expect(model).toContainText("P = (1; 3)");
  await expect(model).toContainText("AP = (3; 2), PB = (6; 4)");
  await model.getByRole("slider", { name: /AP’nin payı/ }).press("ArrowRight");
  await expect(model).toContainText("P = (2,5; 4)");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-138");
  await expect(model).toContainText("P = (1; 3)");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The position lines cross only at their shared time and place", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Grafik ile çözümü geri denetle");
  await page.goto("/#/lesson?id=hiz-problemleri");
  await expect(model).toContainText("2 saat. A 100 km, B 100 km konumunda. Aralık 0 km");
  const slider = model.getByRole("slider", { name: /Geçen süre/ });
  await slider.press("Home");
  await expect(model).toContainText("0 saat. A 20 km, B 140 km konumunda. Aralık 120 km");
  await slider.press("End");
  await expect(model).toContainText("4 saat. A 180 km, B 60 km konumunda. Aralık 120 km");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-219");
  await expect(model).toContainText("t = 2 saat. İki konum da 100 km");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A hexagonal prism diagonal uses the farthest base vertices", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-geo-dik-prizmalar-032";
  const model = figure(page, "Altıgen tabandan prizmanın en uzun köşegenine");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${id}`);
  await expect(model).toContainText("24√3 cm²");
  await expect(model).toContainText("Merkezden kenara dik uzaklık 2√3 cm");
  await next.press("Enter");
  await expect(model).toContainText("Hacim 216√3 cm³");
  await expect(model).toContainText("√145 cm");
  await model.getByRole("slider", { name: /Altıgenin kenarı/ }).press("Home");
  await expect(model).toContainText("√97 cm");
  await checkFrame(page, model);

  await page.goto(`/#/cheatsheets?topic=topic-${id}`);
  await next.press("Enter");
  await expect(model).toContainText("216 + 48√3 cm²");
  await expect(model).toContainText("√145 cm");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The whole graph weights each segment by its duration", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Çizgi grafiğinde değişim ile değişim hızı ayrıdır");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  const hour = model.getByRole("slider");
  await page.goto("/#/lesson?id=grafik-problemleri");
  await expect(model).toContainText("eşit (21 L)");
  await next.press("Enter");
  await hour.fill("4");
  await expect(model).toContainText("4 saat. Depo hacmi 28 L");
  await expect(model).toContainText("0–2 saatte +6 L/saat. 2–5 saatte −2 L/saat");
  await expect(model).toContainText("(26−20)/5 = 1,2 L/saat");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-220");
  await next.press("Enter");
  await hour.press("End");
  await expect(model).toContainText("5 saat. Depo hacmi 26 L");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Separating equal cubes preserves volume and adds exposed faces", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-geo-dik-prizmalar-032";
  const model = figure(page, "Küp bölünürken toplam yüzey nasıl değişir?");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  const parts = model.getByRole("slider", { name: /Bir ayrıtın parça sayısı/ });
  await page.goto(`/#/lesson?id=${id}`);
  await expect(model).toContainText("3 × 3 × 3 = 27 küp");
  await expect(model).toContainText("yeni toplam alan 648 cm²");
  await next.press("Enter");
  await parts.press("Home");
  await expect(model).toContainText("2 × 2 × 2 = 8 küp");
  await expect(model).toContainText("toplam hacmi de 216 cm³");
  await expect(model).toContainText("yeni toplam alan 432 cm²");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${id}`);
  await expect(figure(page, "Altıgen tabandan prizmanın en uzun köşegenine")).toBeVisible();
  await expect(model).toContainText("yeni toplam alan 648 cm²");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Substitution gives four real roots on the plotted polynomial", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "x² yerine u yazarak dört kökü bul");
  await page.goto("/#/lesson?id=carpanlara-ayirma");
  await expect(model).toContainText("Kökler −2, −1, 1, 2");
  const input = model.getByRole("slider", { name: /^x/ });
  for (const root of [-2, -1, 1, 2]) {
    await input.fill(String(root));
    await expect(model).toContainText("için f(x) = 0.");
  }
  await input.fill("0");
  await expect(model).toContainText("x = 0 için f(x) = 4.");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-221");
  await expect(model).toContainText("Kökler −2, −1, 1, 2");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Two rolls of the same paper keep lateral area and change volume", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-geo-silindir-koni-kure-040";
  const model = figure(page, "Kâğıdı iki yönde sar ve hacimleri karşılaştır");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${id}`);
  await expect(model).toContainText("Yan alan 96π cm². Bu sarımın hacmi 288π cm³");
  await next.press("Enter");
  await expect(model).toContainText("Yan alan 96π cm². Bu sarımın hacmi 192 cm³");
  await expect(model).toContainText("12π/8 = 3π/2");
  await model.getByRole("slider", { name: /Kısa kenar/ }).press("Home");
  await expect(model).toContainText("Yan alan 48π cm². Bu sarımın hacmi 48 cm³");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${id}`);
  await next.press("Enter");
  await expect(model).toContainText("96π cm². Bu sarımın hacmi 192 cm³");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Triple intersections belong to only one displayed Venn region", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Üç kümenin ayrık bölgelerini içten dışa doldur");
  await page.goto("/#/lesson?id=kumeler");
  await expect(model).toContainText("Tam iki grupta 16 · Üçünde 3");
  await expect(model).toContainText("Birleşim 41 · Dışarıda 9");
  const slider = model.getByRole("slider", { name: /Üç kümede ortak kişi/ });
  await slider.press("Home");
  await expect(model).toContainText("Tam iki grupta 25 · Üçünde 0");
  await expect(model).toContainText("Birleşim 38 · Dışarıda 12");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-222");
  await expect(model).toContainText("Yalnız A 10 · Yalnız B 6 · Yalnız C 6");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The hexagonal pyramid has a different hypotenuse in each cross-section", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-geo-piramitler-032";
  const model = figure(page, "Altıgen piramitte üç uzunluğun uçlarını karşılaştır");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${id}`);
  await expect(model).toContainText("Dik yükseklik 3 cm");
  await expect(model).toContainText("Yan yüz yüksekliği 2√3 cm. Yan ayrıt √13 cm");
  await next.press("Enter");
  await expect(model).toContainText("Kenar ortasından kesit");
  await checkFrame(page, model);
  await next.press("Enter");
  await expect(model).toContainText("Köşeden kesit");
  await expect(model).toContainText("Kapalı toplam alan 18√3 cm²");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${id}`);
  await expect(model).toContainText("Hacim 6√3 cm³");
  await model.getByRole("slider", { name: /Altıgenin kenarı/ }).press("End");
  await expect(model).toContainText("Hacim 54√3 cm³");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Only the two requested ordered pairs leave the product", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Koordinat gösterimi ayrık noktaların kümesidir");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto("/#/lesson?id=kartezyen-carpim");
  await next.press("Enter");
  await next.press("Enter");
  await expect(model).toContainText("6 ikiliden (2; 2) ve (2; 3) çıkar. Kalan 4 ikili");
  await expect(model).toContainText("(1; 1), (1; 2), (1; 3), (2; 1)");
  await checkFrame(page, model);
  await page.goto("/#/cheatsheets?topic=detail-223");
  await next.press("Enter");
  await next.press("Enter");
  await expect(model).toContainText("Kalan 4 ikili");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("The logic truth table retains the same false row in the lesson and sheet", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "İse yalnız doğru öncül ve yanlış sonuçta yanlıştır");
  const table = page.getByRole("table").filter({ hasText: "İlk koşul" });
  for (const route of ["/#/lesson?id=mantik-onerme", "/#/cheatsheets?topic=detail-224"]) {
    await page.goto(route);
    await expect(model).toContainText("Tek yanlış satır: doğru öncül, yanlış sonuç");
    await expect(table.getByRole("row", { name: /İlk koşul/ })).toContainText(/p\s*=\s*1,\s*q\s*=\s*0/);
    await checkFrame(page, model);
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("A cone inherits its base circumference from the sector arc", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-geo-silindir-koni-kure-040";
  const model = figure(page, "Daire diliminden koninin tabanını bul");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await page.goto(`/#/lesson?id=${id}`);
  await expect(model).toContainText("Yay 12π cm. Taban çevresi de 12π cm. Taban yarıçapı 6 cm");
  await next.press("Enter");
  await expect(model).toContainText("Dik yükseklik √(10²−6²) = 8 cm");
  await expect(model).toContainText("Hacim = 96π cm³");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${id}`);
  await expect(model).toContainText("Hacim = 96π cm³");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A sphere section shrinks to a point at a tangent plane", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-geo-silindir-koni-kure-040";
  const model = figure(page, "Kürenin yarıçapını kesitten geri kur");
  await page.goto(`/#/lesson?id=${id}`);
  await expect(model).toContainText("Kesit alanı 144π birim². R² = 144 + 25 = 169");
  const distance = model.getByRole("slider", { name: /Düzlemin merkeze uzaklığı/ });
  await distance.press("End");
  await expect(model).toContainText("Düzlem küreye bir noktada teğet.");
  await checkFrame(page, model);
  await page.goto(`/#/cheatsheets?topic=topic-${id}`);
  await expect(model).toContainText("Kürenin hacmi 8788π/3 birim³");
  await expect(figure(page, "Kâğıdı iki yönde sar ve hacimleri karşılaştır")).toBeVisible();
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("Three special people use three distinct numbered gaps offline", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-mat-permutasyon-kaynak-032";
  const model = figure(page, "Birbirinden ayrı kişilere ayrı boşluklar ver");
  for (const route of [`/#/lesson?id=${id}`, `/#/cheatsheets?topic=topic-${id}`]) {
    await page.goto(route);
    await expect(model).toContainText("4 sıradan kişi 5 boşluk bırakır");
    await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(model).toContainText("Seçili 1, 3, 5 boşluklarına A, B, C için 6 sıra");
    await expect(model).toContainText("toplam 1.440 düzen");
    await checkFrame(page, model);
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("The waypoint chart separates both parts before counting its complement", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-mat-tekrarli-permutasyon-kaynak-033";
  const model = figure(page, "Zorunlu durakta yolu böl, kaçınanı tümleyenden bul");
  for (const route of [`/#/lesson?id=${id}`, `/#/cheatsheets?topic=topic-${id}`]) {
    await page.goto(route);
    await expect(model).toContainText("P’ye kadar 3 yol. P’den hedefe 6 yol. P’den geçen 18 tam yol");
    const image = model.getByRole("img");
    await expect(image).toBeVisible();
    const dashedSegments = image.locator("line.sf-dash");
    await expect(dashedSegments).toHaveCount(4);
    expect(await dashedSegments.evaluateAll((lines) => lines.every((line) => {
      const style = getComputedStyle(line);
      return style.strokeDasharray !== "none" && style.stroke !== "none"
        && (line.getAttribute("x1") !== line.getAttribute("x2")
          || line.getAttribute("y1") !== line.getAttribute("y2"));
    }))).toBe(true);
    await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(model).toContainText("Bütün 35 yoldan 18 geçen yol çıkar. P’ye uğramayan 17 yol");
    await checkFrame(page, model);
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("The collinear quartet removes triples and merges pairs offline", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-mat-kombinasyon-kaynak-034";
  const model = figure(page, "Bir üçlü alanla, bir doğru bütün noktalarıyla belirlenir");
  for (const route of [`/#/lesson?id=${id}`, `/#/cheatsheets?topic=topic-${id}`]) {
    await page.goto(route);
    await expect(model).toContainText("56 üçlüden 4 doğrusal üçlü çıkar. 52 üçgen");
    await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(model).toContainText("28 nokta çifti. Ortak doğruyu veren 6 çiftin yerine bir doğru yaz. 23 farklı doğru");
    await checkFrame(page, model);
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("Binomial selections and numeric factors are separate table columns offline", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-mat-binom-kaynak-035";
  const model = figure(page, "Hedef üssü bir denklemle bul");
  const table = page.getByRole("table").filter({ hasText: "Seçim adedi" });
  for (const route of [`/#/lesson?id=${id}`, `/#/cheatsheets?topic=topic-${id}`]) {
    await page.goto(route);
    const r2 = table.getByRole("row").nth(3);
    const terms = r2.getByRole("cell");
    await expect(terms).toHaveCount(4);
    for (const [index, entry] of ["2", "3", "1", "12"].entries()) {
      await expect(terms.nth(index)).toHaveAccessibleName(entry);
    }
    await expect(model).toContainText("= 240");
    await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(model).toContainText("Açılımda x¹ terimi yoktur");
    await checkFrame(page, model);
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("Dice conditions change the eligible grid and denominator offline", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const id = "tyt-mat-olasilik-kaynak-036";
  const model = figure(page, "Yeni bilgi geldiğinde paydayı değiştir");
  for (const route of [`/#/lesson?id=${id}`, `/#/cheatsheets?topic=topic-${id}`]) {
    await page.goto(route);
    await expect(model).toContainText("10 çift, ilk zarı 6 olan 4 çift");
    await expect(model).toContainText("4/10 = 2/5");
    await model.getByRole("slider", { name: /Toplamın alt sınırı/ }).press("End");
    await expect(model).toContainText("Koşullu olasılık 1/1 = 1");
    await checkFrame(page, model);
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("The source histogram places a boundary observation in exactly one class", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const model = figure(page, "Ham ölçümleri eş genişlikli sınıflara ayır");
  const table = page.getByRole("table").filter({ hasText: "Gözlemler" });
  for (const route of ["/#/lesson?id=veri-analizi", "/#/cheatsheets?topic=detail-225"]) {
    await page.goto(route);
    await expect(model).toContainText("Frekanslar 4, 4, 2. Toplam 10 ölçüm");
    const classCells = table.getByRole("row").nth(2).getByRole("cell");
    await expect(classCells).toHaveCount(3);
    for (const [index, entry] of ["[6, 10)", "6, 7, 8, 8", "4"].entries()) {
      await expect(classCells.nth(index)).toHaveAccessibleName(entry);
    }
    await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(model).toContainText("6 ve üstünde 6/10, yani %60");
    await expect(model).toContainText("7 ve üstünün kesin adedi yalnız sütunlardan çıkarılamaz");
    await checkFrame(page, model);
  }
  expect(learning(await storage(page))).toEqual(before);
});
