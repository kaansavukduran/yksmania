import release from "../../package.json" with { type: "json" };
import { writeFile } from "node:fs/promises";
import { test, expect, type Page } from "@playwright/test";
import type { AppState } from "../../src/domain/model";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
registerOfflineBootDiagnostics();
const id = "tyt-mat-ebob-ekok-kaynak-034";
const topicId = `topic-${id}`;
const topicTitle = "EBOB ve EKOK: ortak birimden kaynak problemlerine";
const referenceTitle = "Bölünebilme koşullarını ortak katta birleştirme";
// Copied audited C7 literals, without importing a production answer catalogue or another spec.
// The changed guidance is intentionally requested BEFORE answering nine cards.
// This additional assisted QA is not the earlier independent46/46 acceptance.
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

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        const timer = setTimeout(
          () => reject(new Error("Readonly QA state timeout")),
          5000,
        );
        request.onerror = () => {
          clearTimeout(timer);
          reject(request.error);
        };
        request.onblocked = () => {
          clearTimeout(timer);
          reject(new Error("Readonly QA state blocked"));
        };
        request.onupgradeneeded = () => {
          request.transaction?.abort();
          clearTimeout(timer);
          reject(new Error("Existing application state required"));
        };
        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction("state", "readonly");
          const read = transaction.objectStore("state").get("current");
          read.onerror = () => {
            db.close();
            clearTimeout(timer);
            reject(read.error);
          };
          read.onsuccess = () => {
            const value = read.result;
            db.close();
            clearTimeout(timer);
            resolve(value);
          };
        };
      }),
  );
}
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
const correctedHelp: Record<number, { current: string[]; previous: string[] }> =
  {
    11: {
      current: ["12 dk’lık A olayları 7 tanedir; hepsi B ile ortak değildir."],
      previous: ["dk’lıkA", "hepsiB"],
    },
    13: {
      current: [
        "Daha küçük A anları 0 ve 12, B dizisinde değildir.",
        "B 6’da çalışır fakat A 6’da çalışmaz.",
      ],
      previous: ["küçükA", "fakatA"],
    },
    20: {
      current: [
        "360=2³×3²×5 için x, 2³ ve 5 taşımalı.",
        "40 eksik 2³ ve 5’i getirir fakat 6’ya bölünmez; EBOB koşulu bozulur.",
      ],
      previous: ["2³ve 5"],
    },
    23: { current: ["En küçük x+y=11; 6×11=66."], previous: ["küçükx+y"] },
    26: {
      current: [
        "13, A’nın 10 dk aralıklarla tüm olaylarını sayar; hepsi B ile ortak değildir.",
      ],
      previous: ["hepsiB"],
    },
    28: {
      current: [
        "30, xy çarpımıdır; asıl sayıların toplamı değildir.",
        "xy değerini x+y veya a+b olarak kullanma.",
      ],
      previous: ["xyçarpımıdır", "xydeğerini"],
    },
    31: {
      current: ["Daha küçük A anları 0 ve 8, B dizisinde yoktur."],
      previous: ["küçükA"],
    },
    40: {
      current: ["A 0’da, B 5’te başlasa ilk ortak 20 dk olurdu."],
      previous: ["5’tebaşlasa"],
    },
    41: { current: ["4+5=9=3² asal değildir."], previous: ["3²asal"] },
  };

test.use({
  viewport: { width: 1440, height: 1000 },
  locale: "tr-TR",
  hasTouch: true,
  reducedMotion: "reduce",
});
test("corrected guidance and summary render through normal assisted study; past-exam teaching steps stay unscored", async ({
  page,
  context,
}, info) => {
  // The existing unassisted46-card run takes about38s. This separate test adds
  // all help panels on nine cards, a summary and three unscored source steps.
  test.setTimeout(180_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto("/");
  await expect(page.locator(".sidebar-version")).toContainText(release.version);
  await nav(page, "Ayarlar");
  await page
    .getByRole("group", { name: "Tema", exact: true })
    .getByRole("button", { name: "Mevcut tema", exact: true })
    .click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.waitForFunction(
    () => Boolean(navigator.serviceWorker?.controller),
    undefined,
    { timeout: 25_000 },
  );
  const beforeReading = await stored(page);
  await context.setOffline(true);
  await nav(page, "Kopya Kağıtları");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("EBOB ve EKOK");
  await page
    .locator(".cheatsheet-topic")
    .filter({ has: page.getByText(topicTitle, { exact: true }) })
    .click();
  const sheet = page.locator(".cheat-reader");
  await expect(sheet.locator(".cheat-section")).toHaveCount(12);
  const summary = sheet.locator(".cheat-section").last();
  await expect(summary).toContainText(
    "Kaynağın 2021 TYT 15 seçili çözümünde A=2, B=5",
  );
  await expect(summary).not.toContainText("çözümündeA=2");
  expect(await stored(page)).toEqual(beforeReading);
  await summary.screenshot({
    path: info.outputPath("corrected-separate-summary.png"),
  });
  await expect(page.locator('input[type="file"]')).toHaveCount(0);

  // This is the ordinary sheet→Questions-topic route, before any scored session.
  await sheet
    .locator(".cheat-actions")
    .getByRole("button", { name: "Sorulara geç", exact: true })
    .click();
  const reference = page.locator(".past-exam-reference").filter({
    has: page.getByRole("heading", { name: referenceTitle, exact: true }),
  });
  await expect(reference).toHaveCount(1);
  await expect(reference).toContainText("2021");
  await expect(reference).toContainText("Soru 15");
  const ownCase = reference.locator(".exam-teaching-case");
  await expect(ownCase.locator(".example-prompt")).toContainText(
    "A, 200 ile 250 arasında",
  );
  await expect(ownCase.locator(".example-prompt")).toContainText(
    "B, 240 ile 270 arasında",
  );
  const beforeTeaching = await stored(page);
  expect(beforeTeaching.sessions).toHaveLength(0);
  for (let step = 0; step < 3; step++) {
    await ownCase
      .getByRole("button", {
        name: step === 0 ? "Çözümü adım adım aç" : "Sonraki çözüm adımı",
        exact: true,
      })
      .click();
    await expect(ownCase.locator("ol > li")).toHaveCount(step + 1);
    expect(await stored(page)).toEqual(beforeTeaching);
  }
  await expect(ownCase.locator(".worked-conclusion")).toContainText(
    "A=225, B=252; toplam 477.",
  );
  await expect(ownCase.locator("ol > li").nth(0)).toContainText("EKOK(9,5)=45");
  await expect(ownCase.locator("ol > li").nth(1)).toContainText(
    "EKOK(9,12)=36",
  );
  await expect(ownCase.locator("ol > li").nth(2)).toContainText("225+252=477");
  await expect(ownCase.locator("ol > li").nth(2)).toContainText(
    "resmî kaydın A harfi/rakam toplamı 7 ile puanlanmaz",
  );
  await reference
    .locator("summary")
    .filter({ hasText: "Doğrulanmış sınav kaydı" })
    .click();
  await expect(reference.locator("details p")).toContainText(
    "Resmî cevap: A. Soru sayfası 30, cevap kaynağı sayfa 45.",
  );
  await expect(reference.locator("details p")).not.toContainText("477");
  await expect(
    reference.getByRole("link", {
      name: "Resmî kaynak kaydı (internet)",
      exact: true,
    }),
  ).toHaveAttribute(
    "href",
    "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=30",
  );
  expect(await stored(page)).toEqual(beforeTeaching);
  await reference.screenshot({
    path: info.outputPath("unscored-own477-vs-official-A-record.png"),
  });

  await page.locator(`.ready-topic[data-lesson-id="${id}"]`).click();
  const observedRepairs: {
    question: number;
    fields: string[];
    assistanceBeforeAnswer: boolean;
  }[] = [];
  expect(expectedCards).toHaveLength(46);
  for (const [index, card] of expectedCards.entries()) {
    const number = index + 1;
    await expect(page.locator(".question-meta")).toContainText(
      `Soru ${number} / 46`,
    );
    await expect(page.locator(".question-panel h2")).toHaveText(card.prompt);
    const answers = page.locator(".answer-options .answer");
    await expect(answers).toHaveCount(5);
    expect(
      (await answers.locator("span:last-child").allTextContents())
        .map((text) => text.trim())
        .sort(),
    ).toEqual([...card.options].sort());
    const repair = correctedHelp[number];
    if (repair) {
      const help = page.locator(".question-help");
      let opened = 0;
      while (await help.locator(".help-next").isVisible()) {
        await help.locator(".help-next").click();
        opened++;
        expect(opened).toBeLessThanOrEqual(9);
        await expect
          .poll(async () => (await stored(page)).draft?.helpLevel)
          .toBe(opened);
      }
      await expect(help.locator(".help-full-solution")).toBeVisible();
      for (const field of repair.current)
        await expect(help).toContainText(field);
      for (const previous of repair.previous)
        await expect(help).not.toContainText(previous);
      await expect(help).toContainText(
        "bu soru bağımsız doğru olarak sayılmaz",
      );
      expect((await stored(page)).sessions).toEqual(beforeTeaching.sessions);
      observedRepairs.push({
        question: number,
        fields: repair.current,
        assistanceBeforeAnswer: true,
      });
      if ([13, 20, 26, 28].includes(number))
        await help.screenshot({
          path: info.outputPath(`corrected-help-question-${number}.png`),
        });
    }
    await answers
      .filter({ has: page.getByText(card.correct, { exact: true }) })
      .click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    await expect
      .poll(async () => (await stored(page)).draft?.responses.length)
      .toBe(index + 1);
    const response = (await stored(page)).draft?.responses.at(-1);
    expect(response?.correct).toBe(true);
    expect(response?.assisted).toBe(Boolean(repair));
    await page
      .getByRole("button", {
        name: index === 45 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "46/46",
    "37/46",
    "9",
  ]);
  const saved = await stored(page),
    session = saved.sessions.at(-1)!;
  expect(saved.sessions).toHaveLength(1);
  expect(session.lessonId).toBe(id);
  expect(session.responses).toHaveLength(46);
  expect(session.responses.filter((response) => response.correct)).toHaveLength(
    46,
  );
  expect(
    session.responses.filter((response) => response.assisted),
  ).toHaveLength(9);
  expect(saved.topicProgress[topicId]?.theory).toBeUndefined();
  expect(observedRepairs.map((item) => item.question)).toEqual([
    11, 13, 20, 23, 26, 28, 31, 40, 41,
  ]);
  expect(observedRepairs.flatMap((item) => item.fields)).toHaveLength(12);
  expect(errors).toEqual([]);
  await page.locator(".result-stats").screenshot({
    path: info.outputPath("assisted46-correct37-independent9-assisted.png"),
  });
  const evidence = {
    version: release.version,
    correctedQuestionFields: observedRepairs,
    separateSummarySpacing: true,
    sourceReference: {
      id: "2021-TYT-MAT-15",
      officialAnswer: "A",
      questionPage: 30,
      answerPage: 45,
    },
    ownTeachingExample: {
      first: 225,
      second: 252,
      sum: 477,
      openedSteps: 3,
      allApplicationStateUnchangedByOpening: true,
    },
    session: { correct: 46, independent: 37, assisted: 9 },
    rendererErrors: errors,
    scope:
      "Additional assisted copy regression. Earlier unassisted46/46 test is unchanged; this is not an independent learner-success claim.",
  };
  const evidencePath = info.outputPath(
    "actual-copy-and-unscored-case-acceptance.json",
  );
  await writeFile(evidencePath, JSON.stringify(evidence, null, 2));
  await info.attach("actual-copy-and-unscored-case-acceptance", {
    path: evidencePath,
    contentType: "application/json",
  });
});
