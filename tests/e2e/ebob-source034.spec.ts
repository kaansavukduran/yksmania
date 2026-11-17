import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { setThemePreference } from "./helpers/theme";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
// @ts-expect-error Shared executable smoke harness is an ES JavaScript module.
import { forge034035SmokeCases } from "../../scripts/forge034035-smoke-cases.mjs";
registerOfflineBootDiagnostics();
const id = "tyt-mat-ebob-ekok-kaynak-034";
const topicId = `topic-${id}`;
const title = "EBOB ve EKOK: ortak birimden ortak ana";
const ebob = forge034035SmokeCases[0] as {
  act(lab: Locator): Promise<void>;
  assertModel(lab: Locator): Promise<void>;
  persisted: Record<string, unknown>;
  storedKey: string;
  note: string;
};
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const open = indexedDB.open("yksmania", 2);
        open.onerror = () => reject(open.error);
        open.onblocked = () =>
          reject(new Error("Readonly QA database blocked"));
        open.onsuccess = () => {
          const db = open.result,
            tx = db.transaction("state", "readonly");
          tx.onabort = () => {
            db.close();
            reject(tx.error);
          };
          const read = tx.objectStore("state").get("current");
          read.onerror = () => {
            db.close();
            reject(read.error);
          };
          read.onsuccess = () => {
            db.close();
            resolve(read.result);
          };
        };
      }),
  );
}
const learning = (s: AppState) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  notes: s.notes,
  settings: s.settings,
  draft: s.draft,
  examDraft: s.examDraft,
  examSessions: s.examSessions,
  unlocked: s.unlocked,
  focusTimer: s.focusTimer,
});
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function enter(page: Page) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  const subject = page
    .locator(".subject-panel")
    .filter({
      has: page.getByRole("heading", { name: "Matematik", exact: true }),
    });
  const entry = subject.locator(`.ready-topic[data-lesson-id="${id}"]`);
  if (!(await entry.isVisible()))
    await subject.locator(".subject-header").click();
  await entry.click();
  const lab = page.locator(".f034-lab");
  await expect(
    page.locator(".guide-section").first().locator(".f034-lab"),
  ).toBeVisible();
  return lab;
}
async function offlineReady(page: Page) {
  await page.waitForFunction(
    () => Boolean(navigator.serviceWorker?.controller),
    undefined,
    { timeout: 25_000 },
  );
}
const modes = [
  "Asal tablosu",
  "Öklid adımları",
  "Parça ve işaret",
  "Zaman çizelgesi",
  "Kalan koşulu",
  "EBOB ve EKOK’tan sayılar",
  "Küp sayımı",
];
for (const profile of [
  { name: "1440dark", width: 1440, large: false },
  { name: "320MatrixLexendUI200Text150", width: 320, large: true },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: 1000 },
      locale: "tr-TR",
      hasTouch: true,
      reducedMotion: "reduce",
    });
    test("all seven computed modes first open offline; bounds, real inputs, notes and no learning credit", async ({
      page,
      context,
    }, info) => {
      test.setTimeout(180_000);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(String(error)));
      await page.goto("/#/settings");
      await expect(page.locator(".sidebar-version")).toContainText("0.22.0");
      await setThemePreference(page, profile.large ? "matrix" : "dark");
      if (profile.large) {
        await page
          .getByLabel("Yazı tipi", { exact: true })
          .selectOption("lexend");
        await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
        await page
          .getByLabel("Yalnızca yazı boyutu %", { exact: true })
          .fill("150");
        await page.evaluate(async () => {
          await document.fonts.load("400 45px Lexend");
          await document.fonts.load("600 45px Lexend");
        });
      }
      await expect
        .poll(async () => (await stored(page)).settings.theme)
        .toBe(profile.large ? "matrix" : "dark");
      const before = learning(await stored(page));
      await offlineReady(page);
      await context.setOffline(true);
      const lab = await enter(page);
      await expect
        .poll(() => page.evaluate(() => navigator.onLine))
        .toBe(false);
      await expect(page.locator('input[type="file"]')).toHaveCount(0);
      await ebob.act(lab);
      await ebob.assertModel(lab);
      await expect
        .poll(async () => (await stored(page)).explorations[ebob.storedKey])
        .toMatchObject(ebob.persisted);
      expect(learning(await stored(page))).toEqual(before);
      const geometry = [];
      for (const [index, name] of modes.entries()) {
        await lab.getByRole("button", { name, exact: true }).tap();
        await expect(
          lab.getByRole("button", { name, exact: true }),
        ).toHaveAttribute("aria-pressed", "true");
        const bounds = await lab.evaluate((element) => {
          const box = element.getBoundingClientRect();
          return {
            left: box.left,
            right: box.right,
            viewport: innerWidth,
            overflow: document.documentElement.scrollWidth - innerWidth,
            controls: [
              ...element.querySelectorAll<HTMLButtonElement>(
                ".f034-modes button",
              ),
            ].map((button) => {
              const b = button.getBoundingClientRect();
              return {
                left: b.left,
                right: b.right,
                width: b.width,
                height: b.height,
              };
            }),
            figures: [...element.querySelectorAll("svg")].map((svg) => {
              const b = svg.getBoundingClientRect();
              return {
                left: b.left,
                right: b.right,
                width: b.width,
                height: b.height,
              };
            }),
          };
        });
        expect(bounds.left).toBeGreaterThanOrEqual(0);
        expect(bounds.right).toBeLessThanOrEqual(profile.width + 1);
        expect(bounds.overflow).toBeLessThanOrEqual(1);
        for (const b of bounds.controls) {
          expect(b.width).toBeGreaterThanOrEqual(43);
          expect(b.height).toBeGreaterThanOrEqual(43);
          expect(b.left).toBeGreaterThanOrEqual(0);
          expect(b.right).toBeLessThanOrEqual(profile.width + 1);
        }
        for (const b of bounds.figures) {
          expect(b.width).toBeGreaterThan(0);
          expect(b.left).toBeGreaterThanOrEqual(0);
          expect(b.right).toBeLessThanOrEqual(profile.width + 1);
        }
        geometry.push({ name, ...bounds });
        await lab
          .locator(".f034-panel")
          .screenshot({
            path: info.outputPath(`mode-${index + 1}-${profile.name}.png`),
          });
      }
      await lab
        .getByRole("button", { name: "Küp sayımı", exact: true })
        .click();
      await ebob.assertModel(lab);
      if (profile.large) {
        await expect(lab.locator(".f034-panel")).toHaveCSS("font-size", "45px");
        expect(
          await lab.evaluate((element) => getComputedStyle(element).fontFamily),
        ).toContain("Lexend");
      }
      const axe = await new AxeBuilder({ page })
        .include(".f034-lab")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(axe.violations).toEqual([]);
      expect(learning(await stored(page))).toEqual(before);
      const saved = (await stored(page)).explorations[ebob.storedKey];
      await page
        .getByRole("textbox", { name: "Notun", exact: true })
        .fill(ebob.note);
      await expect
        .poll(async () => (await stored(page)).notes[`lesson:${id}`])
        .toBe(ebob.note);
      const withNote = {
        ...before,
        notes: { ...before.notes, [`lesson:${id}`]: ebob.note },
      };
      expect(learning(await stored(page))).toEqual(withNote);
      await page.reload();
      const restored = await enter(page);
      await ebob.assertModel(restored);
      await expect(
        page.getByRole("textbox", { name: "Notun", exact: true }),
      ).toHaveValue(ebob.note);
      expect((await stored(page)).explorations[ebob.storedKey]).toEqual(saved);
      expect(learning(await stored(page))).toEqual(withNote);
      expect(errors).toEqual([]);
      await info.attach("actual-offline-model-evidence", {
        body: JSON.stringify({
          version: "0.22.0",
          profile,
          geometry,
          settingsAndLearningExact: true,
          noteRestored: true,
          explorationWithoutCredit: true,
          axeViolations: axe.violations,
          rendererErrors: errors,
        }),
        contentType: "application/json",
      });
    });
  });
}

// Independently audited frozen C7 literals. This is key-visible automated QA,
// not a blinded learner trial. No production answer/model catalogue is imported.
const expectedCards = [
  {
    prompt:
      "72 ve 120 pozitif tam sayılarının EBOB ve EKOK değerleri sırasıyla hangisidir?",
    options: [
      "24 ve 360",
      "8 ve 1.080",
      "24 ve 8.640",
      "360 ve 24",
      "3 ve 360",
    ],
    correct: "24 ve 360",
  },
  {
    prompt:
      "84 ve 126 pozitif tam sayılarının EBOB ve EKOK değerleri sırasıyla hangisidir?",
    options: [
      "42 ve 252",
      "21 ve 504",
      "42 ve 10.584",
      "7 ve 252",
      "252 ve 42",
    ],
    correct: "42 ve 252",
  },
  {
    prompt: "8 ve 9 sayıları için hangi ifade doğrudur?",
    options: [
      "Aralarında asaldırlar; EKOK’ları 72’dir.",
      "İkisi de asal olduğu için EKOK 72’dir.",
      "Farklı oldukları için her farklı çift gibi aralarında asaldırlar.",
      "EBOB’ları 72’dir.",
      "EBOB’ları 0’dır.",
    ],
    correct: "Aralarında asaldırlar; EKOK’ları 72’dir.",
  },
  {
    prompt:
      "4, 20’yi kalansız böler. EBOB(4, 20) ve EKOK(4, 20) sırasıyla kaçtır?",
    options: ["4 ve 20", "1 ve 80", "20 ve 4", "4 ve 80", "0 ve 20"],
    correct: "4 ve 20",
  },
  {
    prompt:
      "2, 4, 8 için başlangıç sayılarının çarpımı ile EBOB×EKOK çarpımı hangi seçenekte doğru karşılaştırılmıştır?",
    options: [
      "64 ve 16; eşit değildir.",
      "64 ve 64; iki sayılı kural üç sayıda da geçerlidir.",
      "16 ve 64; eşit değildir.",
      "64 ve 0; EBOB 0’dır.",
      "16 ve 16; eşittir.",
    ],
    correct: "64 ve 16; eşit değildir.",
  },
  {
    prompt:
      "252=198×1+54; 198=54×3+36; 54=36×1+18; 36=18×2+0. EBOB(252, 198) kaçtır?",
    options: ["18", "0", "36", "54", "2"],
    correct: "18",
  },
  {
    prompt:
      "36 cm×24 cm dikdörtgen eş karelerle kaplanacak. Kareler kenarlara paralel, kesilmeden ve boşluksuz yerleşiyor. En az kaç kare gerekir?",
    options: ["6", "5", "10", "24", "1"],
    correct: "6",
  },
  {
    prompt:
      "36 cm ve 24 cm iki ip, ayrı ayrı kesilerek kayıpsız biçimde en uzun eş boy parçalara ayrılıyor. Parça boyu, toplam parça ve toplam kesim sayısı hangisidir? Üst üste kesim yoktur.",
    options: [
      "12 cm; 5 parça; 3 kesim",
      "12 cm; 6 parça; 4 kesim",
      "12 cm; 5 parça; 5 kesim",
      "6 cm; 10 parça; 8 kesim",
      "72 cm; 1 parça; 0 kesim",
    ],
    correct: "12 cm; 5 parça; 3 kesim",
  },
  {
    prompt:
      "36 cm×24 cm kapalı dikdörtgenin çevresine, her köşeye gelecek biçimde en büyük eşit aralıklarla işaretler konuyor. İşaret sayısı kaçtır?",
    options: ["10", "11", "6", "5", "120"],
    correct: "10",
  },
  {
    prompt:
      "Başlangıçta birlikte çalışan A her 12 dk, B her 18 dk çalışıyor. İlk yeniden birlikte çalışma kaç dakika sonra olur?",
    options: ["36", "0", "6", "30", "216"],
    correct: "36",
  },
  {
    prompt:
      "A ve B başlangıçta birlikte çalışıyor; periyotları 12 ve 18 dk. [0, 72] aralığında, başlangıç ve 72.dk dahil, kaç ortak çalışma olayı vardır?",
    options: ["3", "2", "1", "5", "7"],
    correct: "3",
  },
  {
    prompt:
      "09.50’de birlikte başlayan iki düzenin ilk yeniden ortak çalışması 36 dakika sonradır. Saat kaç olur?",
    options: ["10.26", "09.86", "10.36", "10.14", "09.26"],
    correct: "10.26",
  },
  {
    prompt:
      "A ilk kez 0.dk’da ve sonra her 12 dk; B ilk kez 6.dk’da ve sonra her 18 dk çalışıyor. İlk ortak çalışma kaçıncı dakikadadır?",
    options: ["24", "0", "6", "18", "36"],
    correct: "24",
  },
  {
    prompt:
      "Pozitif N sayısı 8 ve 12 ile bölününce 5 kalıyor. 100’den büyük en küçük N kaçtır?",
    options: ["101", "77", "100", "120", "125"],
    correct: "101",
  },
  {
    prompt:
      "85 ve 133 aynı pozitif tam sayı d’ye bölününce her ikisinde 1 kalıyor. En büyük d kaçtır?",
    options: ["12", "1", "4", "48", "84"],
    correct: "12",
  },
  {
    prompt:
      "87’nin pozitif tam sayı d ile bölümünde 3, 134’ün d ile bölümünde 2 kalıyor. En büyük d kaçtır?",
    options: ["12", "3", "6", "47", "84"],
    correct: "12",
  },
  {
    prompt:
      "17 ve 25 aynı pozitif tam sayı d’ye bölündüğünde her ikisinde 5 kaldığı söyleniyor. Hangisi doğrudur?",
    options: [
      "Uygun d yoktur.",
      "En büyük d 4’tür.",
      "En büyük d 5’tir.",
      "En büyük d 12’dir.",
      "Her ortak bölen uygundur.",
    ],
    correct: "Uygun d yoktur.",
  },
  {
    prompt:
      "a, b pozitif tam sayı; EBOB(a, b)=4, EKOK(a, b)=48. a+b’nin en küçük ve en büyük değerleri sırasıyla hangisidir?",
    options: ["28 ve 52", "32 ve 52", "24 ve 48", "52 ve 28", "14 ve 26"],
    correct: "28 ve 52",
  },
  {
    prompt: "18, 24, 30 için EBOB ve EKOK sırasıyla kaçtır?",
    options: ["6 ve 360", "6 ve 12.960", "2 ve 360", "6 ve 120", "360 ve 6"],
    correct: "6 ve 360",
  },
  {
    prompt:
      "Pozitif tam sayı x için EBOB(18, 12, x)=6 ve EKOK(18, 12, x)=360. En küçük x kaçtır?",
    options: ["120", "40", "60", "180", "360"],
    correct: "120",
  },
  {
    prompt:
      "72 ve 120’nin pozitif ortak bölen sayısı ve bütün tam sayı ortak bölen sayısı sırasıyla kaçtır?",
    options: ["8 ve 16", "8 ve 8", "6 ve 12", "24 ve 48", "9 ve 18"],
    correct: "8 ve 16",
  },
  {
    prompt:
      "12 cm ve 18 cm kenarlı küpler her boy ayrı kullanılarak eş büyüklükte iki dolu küp oluşturacak. Kesme/boşluk yok, kenarlar paralel. En küçük ortak büyük kenar ve sırasıyla küçük küp adetleri nedir?",
    options: [
      "36 cm; 27 ve 8",
      "6 cm; 27 ve 8",
      "36 cm; 3 ve 2",
      "36 cm; 9 ve 4",
      "216 cm; 5.832 ve 1.728",
    ],
    correct: "36 cm; 27 ve 8",
  },
  {
    prompt:
      "a<b pozitif tam sayılar; EBOB(a, b)=6, EKOK(a, b)=180. En küçük a+b kaçtır?",
    options: ["66", "186", "102", "78", "60"],
    correct: "66",
  },
  {
    prompt:
      "60 ve 84 için EBOB, EKOK ve pozitif ortak bölen sayısı sırasıyla hangisidir?",
    options: [
      "12; 420; 6",
      "12; 420; 12",
      "6; 840; 4",
      "12; 5.040; 6",
      "420; 12; 6",
    ],
    correct: "12; 420; 6",
  },
  {
    prompt:
      "40 cm×56 cm dikdörtgen kenarlara paralel eş karelerle kayıpsız kaplanıyor. En az kare adedi ile 40 cm ve 56 cm iki ayrı ipin en uzun aynı boy parçalara kesilmesindeki toplam adet sırasıyla nedir?",
    options: ["35 ve 12", "12 ve 35", "35 ve 10", "140 ve 24", "8 ve 8"],
    correct: "35 ve 12",
  },
  {
    prompt:
      "0’da birlikte başlayan iki sinyal 10 ve 15 dk aralıklarla çalıyor. İlk yeniden ortak süre ve[0, 120]içindeki ortak olay adedi sırasıyla nedir?",
    options: [
      "30 dk ve 5",
      "5 dk ve 25",
      "30 dk ve 4",
      "150 dk ve 1",
      "30 dk ve 13",
    ],
    correct: "30 dk ve 5",
  },
  {
    prompt:
      "Pozitif N sayısı 6 ve 8 ile bölününce 1 kalıyor. 200’den küçük en büyük N kaçtır?",
    options: ["193", "169", "192", "199", "201"],
    correct: "193",
  },
  {
    prompt:
      "a, b pozitif tam sayı; EBOB(a, b)=5, EKOK(a, b)=150. En küçük a+b kaçtır?",
    options: ["55", "155", "85", "65", "30"],
    correct: "55",
  },
  {
    prompt:
      "77 ve 113 aynı pozitif tam sayı d’ye bölününce 5 kalıyor. En büyük d kaçtır?",
    options: ["36", "5", "12", "72", "108"],
    correct: "36",
  },
  {
    prompt: "12, 18, 30 için EBOB, EKOK ve bu iki sonucun çarpımı hangisidir?",
    options: [
      "6; 180; 1.080",
      "6; 180; 6.480",
      "6; 360; 2.160",
      "3; 180; 540",
      "180; 6; 1.080",
    ],
    correct: "6; 180; 1.080",
  },
  {
    prompt:
      "A 0’da başlayıp her 8 dk, B ilk kez 4.dk’da ve sonra her 12 dk çalışıyor. İlk ortak an kaçıncı dakikadadır?",
    options: ["16", "0", "4", "24", "12"],
    correct: "16",
  },
  {
    prompt:
      "Aynı pozitif toplam sayfa sayısı 14’lü ve 21’li demetlerle ayrı ayrı eksiksiz paketlenebiliyor. Kesme yok. En küçük toplam ve demet adetleri sırasıyla nedir?",
    options: [
      "42 sayfa; 3 ve 2",
      "7 sayfa; 2 ve 3",
      "42 sayfa; 2 ve 3",
      "294 sayfa; 21 ve 14",
      "35 sayfa; 2 ve 1",
    ],
    correct: "42 sayfa; 3 ve 2",
  },
  {
    prompt:
      "18 m×30 m kapalı dikdörtgen parkın çevresine köşeler dahil en büyük eşit aralıklarla işaret konuyor. Aralık, kapalı çevredeki işaret adedi ve yalnız 18 m’lik açık kenardaki iki uç dahil nokta adedi nedir?",
    options: [
      "6 m; 16; 4",
      "6 m; 17; 4",
      "6 m; 16; 3",
      "90 m; 1; 1",
      "6 m; 8; 4",
    ],
    correct: "6 m; 16; 4",
  },
  {
    prompt:
      "EBOB(20, 30, x)=10 ve EKOK(20, 30, x)=420. En küçük pozitif tam sayı x kaçtır?",
    options: ["70", "7", "10", "42", "420"],
    correct: "70",
  },
  {
    prompt:
      "Bir çözüm “60 ve 84 farklı olduğundan EKOK=5040” diyor. Hatalı gerekçenin onarımı ve yeni 72, 90 çiftinin EKOK’u hangisidir?",
    options: [
      "Farklılık aralarında asallık değildir; EKOK 360’tır.",
      "Farklılık yeterlidir; EKOK 6480’dir.",
      "Her iki sayı asal olmalıdır; EKOK 18’dir.",
      "Her farklı çiftin EBOB’u 1’dir; EKOK 360’tır.",
      "Ortak bölenleri yoktur; EKOK 720’dir.",
    ],
    correct: "Farklılık aralarında asallık değildir; EKOK 360’tır.",
  },
  {
    prompt:
      "Bir öğrenci 20 cm×32 cm dikdörtgende en az eş kare için 160 cm EKOK’u seçiyor. Modeli onardıktan sonra 28 ve 42 cm iki ayrı ipin en uzun ortak parça boyu ve toplam parça adedi nedir?",
    options: [
      "Kenar ölçüleri bölmeli; 14 cm ve 5 parça.",
      "Kenar ortak kat olmalı; 84 cm ve 1 parça.",
      "Kenar ortak bölen olmalı; 7 cm ve 10 parça.",
      "Kenar ölçüleri bölmeli; 14 cm ve 6 parça.",
      "Kenar ortak kat olmalı; 14 cm ve 5 parça.",
    ],
    correct: "Kenar ölçüleri bölmeli; 14 cm ve 5 parça.",
  },
  {
    prompt:
      "a, b pozitif tam sayı; EBOB(a, b)=2, EKOK(a, b)=72. En küçük a+b kaçtır?",
    options: ["26", "24", "74", "40", "30"],
    correct: "26",
  },
  {
    prompt:
      "0’da birlikte başlayan 6 ve 10 dk periyotlu iki sinyalin[0, 90)aralığında kaç ortak olayı vardır?0 dahil, 90 hariçtir.",
    options: ["3", "2", "4", "9", "15"],
    correct: "3",
  },
  {
    prompt:
      "40 cm×56 cm dikdörtgen kenarlara paralel, kenarı özellikle 4 cm seçilmiş eş karelerle kesilmeden/boşluksuz kaplanıyor. Kaç kare gerekir?",
    options: ["140", "35", "24", "8", "560"],
    correct: "140",
  },
  {
    prompt:
      "İki cihazın sabit periyotları 10 ve 15 dk olarak biliniyor. İlk çalışma anları ve birlikte başlayıp başlamadıkları verilmemiş. İlk pozitif ortak çalışmanın başlangıçtan kaç dakika sonra olduğu kesin söylenebilir mi?",
    options: [
      "Hayır; başlangıç anları da gerekir.",
      "Evet; her durumda 30 dk.",
      "Evet; her durumda 5 dk.",
      "Evet; her durumda 0 dk.",
      "Hayır; çünkü EKOK hesaplanamaz.",
    ],
    correct: "Hayır; başlangıç anları da gerekir.",
  },
  {
    prompt:
      "“a, b aralarında asalsa a+b daima asaldır” iddiasını hangi örnek çürütür?",
    options: [
      "a=4, b=5; EBOB 1, toplam 9 asal değil.",
      "a=2, b=3; toplam 5 asal.",
      "a=6, b=10; toplam 16 asal değil.",
      "a=3, b=6; toplam 9 asal değil.",
      "a=1, b=2; toplam 3 asal.",
    ],
    correct: "a=4, b=5; EBOB 1, toplam 9 asal değil.",
  },
  {
    prompt:
      "Pozitif tam sayılar a, b için EBOB(a, b)=3 ve EKOK(a, b)=20 olabilir mi?",
    options: [
      "Olamaz; EBOB, EKOK’u bölmelidir.",
      "Olabilir; a=3, b=20.",
      "Olabilir; a=6, b=10.",
      "Olabilir; a=3, b=60.",
      "Olamaz; çünkü EBOB her zaman 1 olur.",
    ],
    correct: "Olamaz; EBOB, EKOK’u bölmelidir.",
  },
  {
    prompt:
      "Pozitif tam sayı kenarlı dikdörtgenin kenarlarının EBOB’u 3, EKOK’u 30’dur. En küçük çevre kaç birimdir?",
    options: ["42", "21", "66", "30", "36"],
    correct: "42",
  },
  {
    prompt:
      "N pozitif tam sayısı 6 ile bölününce 1, 8 ile bölününce 3 kalıyor. Aşağıdakilerden hangisi uygundur?",
    options: ["43", "25", "24", "49", "35"],
    correct: "43",
  },
  {
    prompt:
      "65 ve 89 aynı pozitif tam sayı d’ye bölündüğünde 5 kalıyor. En büyük d kaçtır?",
    options: ["12", "5", "6", "24", "60"],
    correct: "12",
  },
  {
    prompt:
      "91=65×1+26; 65=26×2+13; 26=13×2+0. 91 ve 65 cm ölçülerine tam uyan en büyük ortak birim kaç cm’dir?",
    options: ["13", "0", "26", "2", "65"],
    correct: "13",
  },
];

test("all46 self-contained cards finish offline, Today shows actual46/46, manual theory and review anchors remain separate", async ({
  page,
  context,
}, info) => {
  test.setTimeout(180_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  await expect(page.locator(".sidebar-version")).toContainText("0.22.0");
  await offlineReady(page);
  await context.setOffline(true);
  await enter(page);
  const note =
    "034 EBOB-EKOK: soru verisini, kalan sınırını ve uçları okuyorum. ÇĞİÖŞÜ.";
  await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
  await expect
    .poll(async () => (await stored(page)).notes[`lesson:${id}`])
    .toBe(note);
  const before = await stored(page);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  expect(expectedCards).toHaveLength(46);
  for (const [index, card] of expectedCards.entries()) {
    await expect(page.locator(".question-meta")).toContainText(
      `${index + 1} / 46`,
    );
    await expect(page.locator(".question-panel h2")).toHaveText(card.prompt);
    const answers = page.locator(".answer-options .answer");
    await expect(answers).toHaveCount(5);
    const texts = await answers.locator("span:last-child").allTextContents();
    // All option data must belong to this card even though display order rotates.
    expect(texts.map((text) => text.trim()).sort()).toEqual(
      [...card.options].sort(),
    );
    await answers
      .filter({ has: page.getByText(card.correct, { exact: true }) })
      .click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    if (index === 0 || index === 22) {
      await expect
        .poll(async () => (await stored(page)).draft?.responses.length)
        .toBe(index + 1);
      const partial = await stored(page);
      await page.reload();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      expect((await stored(page)).draft).toEqual(partial.draft);
      expect((await stored(page)).sessions).toEqual(before.sessions);
      expect((await stored(page)).reviews).toEqual(before.reviews);
    }
    if (index < 45)
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
  }
  const checked = await stored(page);
  expect(checked.draft?.responses).toHaveLength(46);
  expect(
    checked.draft?.responses.every(
      (response) => response.correct && !response.assisted,
    ),
  ).toBe(true);
  expect(checked.sessions).toEqual(before.sessions);
  expect(checked.reviews).toEqual(before.reviews);
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "46/46",
    "46/46",
    "0",
  ]);
  const saved = await stored(page),
    session = saved.sessions.at(-1)!;
  expect(saved.sessions).toHaveLength(before.sessions.length + 1);
  expect(session.lessonId).toBe(id);
  expect(session.responses).toHaveLength(46);
  expect(
    session.responses.every(
      (response) => response.correct && !response.assisted,
    ),
  ).toBe(true);
  expect(saved.notes).toEqual(before.notes);
  expect(saved.settings).toEqual(before.settings);
  expect(saved.topicProgress[topicId]?.theory).toBeUndefined();
  const reviews = saved.reviews.filter(
    (review) => review.originSessionId === session.id,
  );
  expect(reviews.map((review) => review.stage)).toEqual([3, 7, 21]);
  expect(
    reviews.map(
      (review) =>
        (Date.parse(review.targetDate + "T00:00:00Z") -
          Date.parse(session.date + "T00:00:00Z")) /
        86400000,
    ),
  ).toEqual([2, 6, 20]);
  await page
    .locator(".result-page")
    .screenshot({ path: info.outputPath("actual46of46-result.png") });
  await page.reload();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "46/46",
    "46/46",
    "0",
  ]);
  expect((await stored(page)).sessions).toEqual(saved.sessions);
  expect((await stored(page)).reviews).toEqual(saved.reviews);
  await nav(page, "Bugün");
  const theoryRow = page
    .getByRole("region", { name: "Konu planı", exact: true })
    .locator(".planned-topic")
    .filter({ hasText: "EBOB ve EKOK: ortak birimden kaynak problemlerine" });
  const questionRow = page
    .getByRole("region", { name: "Soru planı", exact: true })
    .locator(".planned-topic")
    .filter({ hasText: "EBOB ve EKOK: ortak birimden kaynak problemlerine" });
  await expect(questionRow.locator(".topic-score")).toHaveText(
    "Son sonuç: 46 soruda 46 doğru · 0 yanlış",
  );
  await expect(theoryRow.locator(".topic-state")).toHaveText(
    "Konu henüz işaretlenmedi",
  );
  await theoryRow
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(theoryRow.locator(".topic-state")).toHaveText("Konu tamamlandı");
  const manual = await stored(page);
  expect(manual.sessions).toEqual(saved.sessions);
  expect(manual.reviews).toEqual(saved.reviews);
  expect(manual.notes).toEqual(saved.notes);
  expect(manual.settings).toEqual(saved.settings);
  await questionRow.screenshot({
    path: info.outputPath("today-actual46of46.png"),
  });
  await page.reload();
  await expect(
    page
      .getByRole("region", { name: "Soru planı", exact: true })
      .locator(".planned-topic")
      .filter({ hasText: "EBOB ve EKOK: ortak birimden kaynak problemlerine" })
      .locator(".topic-score"),
  ).toHaveText("Son sonuç: 46 soruda 46 doğru · 0 yanlış");
  expect((await stored(page)).sessions).toEqual(saved.sessions);
  expect((await stored(page)).reviews).toEqual(saved.reviews);
  expect(errors).toEqual([]);
  await info.attach("actual-full-ebob-session", {
    body: JSON.stringify({
      version: "0.22.0",
      lessonId: id,
      correct: 46,
      wrong: 0,
      assisted: 0,
      session,
      reviewStages: reviews.map((r) => r.stage),
      reviewDates: reviews.map((r) => r.targetDate),
      manualTheorySeparate: true,
      notesPreserved: true,
      offlineReload: true,
      rendererErrors: errors,
    }),
    contentType: "application/json",
  });
});
