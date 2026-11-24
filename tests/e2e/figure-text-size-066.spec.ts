import { test, expect } from "@playwright/test";
import { sectionFigureGuideIds } from "../../src/learning/sectionFigures/figureGuideIds";
import { openGuideDrawings } from "./helpers/svgAudit";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });
test.describe.configure({ mode: "parallel" });

/*
 * Readable figure text on a 320 px phone (Forge066). Every figure on every
 * guide with figures is measured in its default state: for each visible SVG
 * text, the font size on screen is its computed font size times the scale of
 * its screen transform (CSS px). The smallest one per figure must be at least
 * MIN_PX. Before Forge066 the 640-unit drawings were scaled to 270 px, which
 * put every small label at 8.8 px; the narrow-screen fit (narrowFit.ts and
 * useNarrowFit in figureKit.tsx) crops the drawing to its content, widens it
 * to the card edge and, where that is not enough, raises the text below the
 * floor.
 *
 * Ratchet: KNOWN lists the figures that still keep smaller text (the floor is
 * dropped when it would hide a label, bring two labels together or cover a
 * marker dot, or when a line is too long for the screen at the floor size).
 * The list may only shrink: MAX_KNOWN is lowered with it. A KNOWN figure
 * that now passes is reported as an annotation so it can be removed.
 */
const MIN_PX = 11;
const KNOWN = new Set<string>([
  "anadoluda-islam · Etki coğrafyası ve eser ilişkisi",
  "asit-baz-metaller · Asidin adı önemlidir",
  "ataturkculuk-inkilap · Kronolojiyi bir karşılaştırma aracı yap",
  "ayt-enerji-kaynaklari-gelismeler · Isıl değer ile verim farklıdır",
  "ayt-kinetik-yogunluk · Üç hız adı, üç farklı ortalama",
  "canli-ozellikleri · Karbon kaynağı ile enerji kaynağını ayır",
  "canli-ozellikleri · İki farklı sınıflama ekseni",
  "canlilarin-siniflandirilmasi · DNA benzerliğini hizalama ve kapsamla yorumla",
  "degisim-caginda-avrupa-osmanli · Lâle Devri: seçici bilgi aktarımı ve kültür",
  "dogrunun-analitigi · Normal yön, en kısa yolun nedenini gösterir",
  "donusum-oteleme-donme · Öteleme ve dönmede sıra genellikle önemlidir",
  "doppler-etkisi · Aynı kapanma hızı her zaman aynı sonucu vermez",
  "dunya-gucu-osmanli · Olay listesinden gerekçeli yoruma geç",
  "dunyanin-tektonik-olusumu · Kabuk ile litosfer aynı şey değildir",
  "dunyanin-tektonik-olusumu · Manto tümüyle sıvı bir magma denizi değildir",
  "duyu-organlari-deri · Şemayı nasıl okuyacaksın?",
  "duyu-organlari-kulak · Zardan oval pencereye mekanik aktarım",
  "elementlerin-siniflandirilmasi · Sınıfı konum ve kanıtla bul",
  "gazlar-hal-degisim-plazma · Soğutma, saflık ve zaman ekseni",
  "harita-bilgisi · Konturdan profile geç",
  "iki-savas-arasi-turkiye-dunya · Lozan sonrası sorunlara yöntemle yaklaş",
  "ilk-turk-dunyasi · Devletleri tarih ve belgeyle ayır",
  "islam-medeniyetinin-dogusu · Savaşın türü, amacı ve sonucu",
  "iyonik-bilesik-adlandirma · Formülü en küçük nötr oranla kur",
  "iyonlasma-enerjisi · Periyodik yön bir başlangıç tahminidir",
  "kalitima-giris · Bağlı gen koşulunu görmezden gelme",
  "kati-kutlesi-degisimi · Magnezyumun oksijen alması",
  "kuresel-savaslar-arasinda-turkiye-dunya · 1919’dan 1939’a: barış yalnız imza değildir",
  "noktanin-analitigi · Bir eksene uzaklık: karşı koordinatın mutlak değeri",
  "noktanin-analitigi · Bir merkeze ve köşegen doğrularına göre simetri",
  "noktanin-analitigi · Eksenlere göre yansıma",
  "ortacag-dunya · Roma’nın bölünmesi ile siyasi sonu ayır",
  "osmanli-askeri-teskilat · Kapıkulu: merkeze bağlı sürekli kuvvet",
  "ronesans-felsefesi · Otoriteyi değerlendirmek",
  "sabun-deterjan-temizlik · Sabunlaşmada üç ester bağı",
  "ses-deprem-dalgalari · Ses bir ortam titreşimidir",
  "sigaclar-kondansatorler · Üreteçten ayrılınca Q korunabilir",
  "sinir-sistemi-omurilik · Omurilik içindeki doku dağılımını oku",
  "solunum-gaz-tasinmasi · Dokuda karbonik anhidraz ve tampon",
  "tek-cift-isaret · İki bağımsız soru: işaret ve tek–çift",
  "turkiye-bitkileri · Karadeniz’e açık yamaçta nemin yolu",
  "tyt-geo-cember-aci-040 · İç açı ve dış açı yayları birleştirir",
  "yerel-saat · Doğu ileri; işaret yöntemi güvenlidir",
  "zamirler · Kişi zamirleri ve çekimleri",
]);
const MAX_KNOWN = 44;

type Fig = { title: string; min: number; s: string };
const GUIDES = [...sectionFigureGuideIds];
const GROUPS = 3;

test("066 KNOWN listesi yalnız küçülür", () => {
  expect(KNOWN.size).toBeLessThanOrEqual(MAX_KNOWN);
});

for (let group = 0; group < GROUPS; group++)
  test(`066 figür yazısı 320px'te en az ${MIN_PX}px (grup ${group + 1}/${GROUPS})`, async ({ page }) => {
    test.setTimeout(480_000);
    await page.setViewportSize({ width: 320, height: 900 });
    const small: string[] = [];
    const stale: string[] = [];
    for (const guide of GUIDES.filter((_, i) => i % GROUPS === group)) {
      await openGuideDrawings(page, guide);
      await expect(page.locator("figure.section-figure svg").first()).toBeVisible();
      const figs = (await page.evaluate(() => {
        const out: { title: string; min: number; s: string }[] = [];
        for (const fig of document.querySelectorAll("figure.section-figure")) {
          const svg = fig.querySelector("svg");
          if (!svg || !svg.getBoundingClientRect().width) continue;
          let min = Infinity;
          let s = "";
          for (const t of svg.querySelectorAll("text")) {
            if (!t.textContent?.trim() || !t.getBoundingClientRect().width) continue;
            const m = t.getScreenCTM();
            if (!m) continue;
            const px = parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b);
            if (px < min) {
              min = px;
              s = t.textContent.trim().slice(0, 30);
            }
          }
          if (min < Infinity) out.push({ title: fig.getAttribute("data-section-figure") ?? "figür", min, s });
        }
        return out;
      })) as Fig[];
      for (const f of figs) {
        const key = `${guide} · ${f.title}`;
        if (f.min < MIN_PX && !KNOWN.has(key)) small.push(`${key} · ${f.s} · ${f.min.toFixed(2)}px`);
        if (f.min >= MIN_PX && KNOWN.has(key)) stale.push(`${key} artık ${f.min.toFixed(2)}px: KNOWN'dan çıkarılabilir`);
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
        `${guide} yatay kaydırma`,
      ).toBe(true);
    }
    for (const line of stale) test.info().annotations.push({ type: "KNOWN", description: line });
    expect(small, small.join("\n")).toEqual([]);
  });

/*
 * The fit never changes the desktop drawing: at 1280 px every figure keeps
 * the original 640-unit viewBox and no font floor.
 */
test("066 masaüstünde viewBox ve yazı boyutu değişmez", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const guide of ["tyt-mat-asal-kaynak-032", "tyt-mat-kombinasyon-kaynak-034", "enerji-ve-hareket", "katli-oranlar"]) {
    await openGuideDrawings(page, guide);
    const r = await page.evaluate(() =>
      [...document.querySelectorAll("figure.section-figure svg")].map((s) => [
        s.getAttribute("viewBox")?.startsWith("0 0 640 "),
        s.hasAttribute("data-fit"),
        s.getAttribute("style") ?? "",
      ]),
    );
    expect(r.length, guide).toBeGreaterThan(0);
    for (const x of r) expect(x, guide).toEqual([true, false, ""]);
  }
});
