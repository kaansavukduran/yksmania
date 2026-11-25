import { pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, nf, numberLine, pad, rect, sup } from "./mathFigures060TytKit";

/*
 * TYT Matematik (Forge060) · faiz, havuz, kesir ve sayı problemleri. Şerit,
 * tank ve grafik modelleri rehber bölümlerindeki örneklerden kurulur
 * (6000 TL %10, yıllık %16 ile 3 ay, 3000 TL %8 yarım yıl / 2000 TL %6 bir yıl,
 * 5000 TL basit ve yeniden yatırılan %10; 1/6 − 1/9 = 1/18, %25 + 1/8;
 * 350 TL’nin 2/7’si, 1/4 sonra kalanın 2/3’ü, 3/4 − 2/5, 180 → 120 → 90;
 * 4x − 3 ve 4(x − 3), 18a + 8b = 12a + 10b, 95 TL ile 12 TL’lik ürün).
 */

const tl = (x: number) => `${nf(x, 2)} TL`;

/* ===================== Faiz ===================== */

const simpleLine: FigureDef = {
  caption:
    "6000 TL yıllık %10 basit faiz: her yıl yalnız başlangıç anaparası üzerinden 600 TL getiri. Sürgüyle yılı değiştir. Faiz doğrusu (0; 0)’dan, son tutar doğrusu (0; 6000)’den başlar; iki doğru da paraleldir, eğimleri yılda 600 TL.",
  alt: "Yatay eksende 0–5 yıl, düşey eksende TL; alttaki doğru faiz, üstteki doğru son tutar; seçilen yılda iki noktayı birleştiren düşey kesikli çizgi.",
  param: { label: "t", min: 0, max: 5, step: 1, init: 2, unit: " yıl" },
  draw: (t) => {
    const kx = 1.3, ky = 0.0005, F = (s: number) => 600 * s, S = (s: number) => 6000 + 600 * s;
    const els: El[] = [vec(v(0, 0), v(5.6 * kx, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 9800 * ky), { tone: "ink", thin: true }), txt(v(5.6 * kx, 0), "yıl", "se", { tone: "ink", small: true }), txt(v(0, 9800 * ky), "TL", "n", { tone: "ink", small: true })];
    for (const s of [1, 2, 3, 4, 5]) els.push(txt(v(s * kx, -0.15), String(s), "s", { tone: "muted", small: true, soft: true }));
    for (const y of [3000, 6000, 9000]) els.push(seg(v(-0.07, y * ky), v(0.07, y * ky), { tone: "muted", thin: true }), txt(v(-0.12, y * ky), String(y), "w", { tone: "muted", small: true, soft: true }));
    els.push(seg(v(0, 0), v(5 * kx, F(5) * ky), { tone: "a", bold: true }), seg(v(0, S(0) * ky), v(5 * kx, S(5) * ky), { tone: "c", bold: true }));
    els.push(txt(v(5 * kx + 0.1, F(5) * ky), "F", "e", { tone: "a", bold: true }), txt(v(5 * kx + 0.1, S(5) * ky), "S", "e", { tone: "c", bold: true }));
    els.push(seg(v(t * kx, 0), v(t * kx, S(t) * ky), { tone: "muted", dash: true, thin: true }), pt(v(t * kx, F(t) * ky), undefined, "n", "a"), pt(v(t * kx, S(t) * ky), undefined, "n", "c"));
    els.push(...pad(-1.6, 9800 * ky + 0.5, 5.6 * kx + 0.8, -0.7));
    return { els, readout: [`t = ${t}: F = 6000·0,10·${t} = ${tl(F(t))}; S = ${tl(S(t))}.`, "İkinci yılın faizi 6600 üzerinden hesaplanmaz."] };
  },
};

const months: FigureDef = {
  caption:
    "Yıllık oran verildiğinde ay sayısı yılın kesrine çevrilir: m ay = m/12 yıl. Sürgüyle ay sayısını değiştir. Yıllık %16 ile 3 ayın faiz katsayısı 0,16·3/12 = 0,04’tür; süreyi 3 yıl almak getiriyi 12 kat büyütür.",
  alt: "On iki aylık şerit; seçilen ay sayısı kadar hücre dolu; altında yılın kesri ve faiz katsayısı.",
  param: { label: "ay", min: 1, max: 12, step: 1, init: 3 },
  draw: (m) => {
    const els: El[] = [];
    for (let i = 0; i < 12; i++) els.push(rect(i * 0.7, 0, 0.62, 0.9, i < m ? "a" : "muted", i < m));
    els.push(txt(v(0, 1.1), "1 yıl = 12 ay", "ne", { tone: "muted", small: true }));
    els.push(txt(v(4.2, -0.25), `${m}/12 yıl`, "s", { tone: "a", bold: true }));
    els.push(...pad(-0.3, 2.0, 8.7, -1.0));
    const c = (0.16 * m) / 12;
    return { els, readout: [`Katsayı: 0,16·${m}/12 = ${nf(c, 4)}.`, `Faiz = P·${nf(c, 4)}; ör. 1000 TL için ${tl(1000 * c)}.`] };
  },
};

const RATE_STEPS = ["Aynı P ve t: %8 ve %12", "120 TL ve 120 TL"];
const sameInterest: FigureDef = {
  caption:
    "Faiz alan modeli: genişlik anapara P, yükseklik r·t, alan faizdir (ölçekli). Aynı P ve aynı sürede P·t ortak çarpandır, faizler oranların oranındadır: %8/%12 = 2/3. Farklı P ve t varsa yüzde tek başına yetmez: 3000 TL %8 ile yarım yıl ve 2000 TL %6 ile bir yıl, ikisi de 120 TL.",
  alt: "İki dikdörtgen yan yana; genişlikleri anapara, yükseklikleri oran çarpı süre; içlerinde faiz tutarları.",
  steps: RATE_STEPS,
  draw: (_, step) => {
    const kx = 1 / 1000, ky = 50, els: El[] = [seg(v(-0.3, 0), v(8.4, 0), { tone: "ink" })];
    const cases: [number, number, number, string][] = step === 0 ? [[1000, 0.08, 1, "%8"], [1000, 0.12, 1, "%12"]] : [[3000, 0.08, 0.5, "3000 · %8 · ½"], [2000, 0.06, 1, "2000 · %6 · 1"]];
    let x = 0;
    cases.forEach(([P, r, t, name], i) => {
      const w = P * kx * (step === 0 ? 2.4 : 1), h = r * t * ky, tone: Tone = i ? "c" : "a";
      els.push(rect(x, 0, w, h, tone), txt(v(x + w / 2, h), step === 0 ? name : tl(P * r * t), "n", { tone: "ink", small: true, bold: true }), txt(v(x + w / 2, -0.15), step === 0 ? "P" : name, "s", { tone: "muted", small: true }));
      x += w + 1.2;
    });
    els.push(...pad(-0.3, 7.0, 8.6, -0.9));
    return { els, readout: step === 0 ? ["F₁/F₂ = 0,08/0,12 = 2/3.", "Sadeleşen P·t gerçekten ortak olmalı."] : ["3000·0,08·0,5 = 120; 2000·0,06·1 = 120.", "Büyük yüzde, büyük getiri kanıtı değildir."] };
  },
};

const compound: FigureDef = {
  caption:
    "5000 TL yıllık %10: basit faizde her yıl 500 TL eklenir; yeniden yatırmada her yıl artmış bakiye 1,10 ile çarpılır. Sürgüyle yılı değiştir. 2 yılda 6000 ve 6050 TL: aradaki 50 TL, ilk yılın 500 TL faizine ikinci yılda uygulanan %10’dur.",
  alt: "İki yığılmış sütun: basit ve yeniden yatırılan; altta 5000 TL anapara, üstte faiz katmanları; sütunların üstünde son tutarlar.",
  param: { label: "yıl", min: 0, max: 4, step: 1, init: 2 },
  draw: (n) => {
    const k = 0.0005, simple = 5000 + 500 * n, comp = 5000 * 1.1 ** n, els: El[] = [seg(v(-0.3, 0), v(7.2, 0), { tone: "ink" })];
    els.push(rect(0.6, 0, 2, 5000 * k, "muted"), rect(0.6, 5000 * k, 2, (simple - 5000) * k, "a"), txt(v(1.6, simple * k), tl(simple), "n", { tone: "ink", small: true, bold: true }), txt(v(1.6, -0.15), "basit", "s", { tone: "muted", small: true }));
    els.push(rect(4.2, 0, 2, 5000 * k, "muted"), rect(4.2, 5000 * k, 2, (comp - 5000) * k, "c"), txt(v(5.2, comp * k), tl(Math.round(comp * 100) / 100), "n", { tone: "ink", small: true, bold: true }), txt(v(5.2, -0.15), "yeniden yatırma", "s", { tone: "muted", small: true }));
    els.push(txt(v(3.4, 1.25), "5000", "c", { tone: "muted", small: true }));
    els.push(...pad(-0.6, 4.6, 7.6, -0.8));
    return { els, readout: [`Basit: 5000 + 500·${n} = ${tl(simple)}. Yeniden yatırma: 5000·1,1${sup(n)} = ${tl(comp)}.`, `Fark ${tl(comp - simple)}.`] };
  },
};

/* ===================== Havuz ===================== */

function tank(x: number, w: number, h: number, frac: number, tone: Tone): El[] {
  return [rect(x, 0, w, Math.min(1, Math.max(0, frac)) * h, tone), rect(x, 0, w, h, "ink", false)];
}

const netFill: FigureDef = {
  caption:
    "Giriş 6 saatte doldurur (1/6 tank/saat), çıkış 9 saatte boşaltır (1/9 tank/saat). Net hız 1/6 − 1/9 = 1/18 tank/saat; boş tank 18 saatte dolar. Sürgüyle saati değiştir; doluluk payı t/18’dir. Süreler değil, sürelerin tersleri toplanır.",
  alt: "Dikdörtgen tank; üstten giriş oku, alttan çıkış oku; su seviyesi seçilen saate göre yükseliyor; yanında doluluk payı.",
  param: { label: "t", min: 0, max: 18, step: 1, init: 9, unit: " saat" },
  draw: (t) => {
    const els: El[] = [...tank(1.5, 3, 4, t / 18, "c")];
    els.push(vec(v(0.4, 4.6), v(1.4, 3.8), { tone: "a" }), txt(v(0.3, 4.7), "giriş +1/6", "nw", { tone: "a", small: true, bold: true }));
    els.push(vec(v(4.6, 0.4), v(5.6, -0.2), { tone: "warn" }), txt(v(5.7, -0.2), "çıkış −1/9", "e", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(4.7, Math.max(0.3, (t / 18) * 4)), `${t}/18`, "e", { tone: "ink", bold: true }));
    els.push(...pad(-2.4, 5.2, 8.6, -0.8));
    return { els, readout: [`Net 1/18 tank/saat; ${t} saatte ${t}/18 = %${nf((100 * t) / 18, 1)} dolu.`, "Çıkışın sabit debisi su varken geçerlidir."] };
  },
};

const startLevel: FigureDef = {
  caption:
    "Başlangıçta %25 dolu tank, net hız 1/8 tank/saat (sabit kesitli tank: yükseklik hacim payıyla orantılı). Sürgüyle saati değiştir: pay 1/4 + t/8. 3 saatte %62,5, 6 saatte %100. Dolum süresi (1 − 1/4)/(1/8) = 6 saat; 1/r = 8 yazmak ilk suyu yok sayar.",
  alt: "Dikdörtgen tank; altta başlangıçtaki çeyrek su farklı tonda, üstünde eklenen su; yanda yüzde.",
  param: { label: "t", min: 0, max: 6, step: 0.5, init: 3, unit: " saat" },
  draw: (t) => {
    const f = 0.25 + t / 8, H = 4, els: El[] = [rect(2, 0, 3, f * H, "c"), rect(2, 0, 3, 0.25 * H, "b"), rect(2, 0, 3, H, "ink", false)];
    els.push(txt(v(1.8, 0.5), "ilk 1/4", "w", { tone: "b", small: true, bold: true }));
    els.push(seg(v(5, f * H), v(5.3, f * H), { tone: "ink", thin: true }), txt(v(5.4, f * H), `%${nf(100 * f, 1)}`, "e", { tone: "ink", bold: true }));
    els.push(...pad(-0.6, H + 0.4, 8.0, -0.4));
    return { els, readout: [`1/4 + ${nf(t, 1)}/8 = ${nf(f, 4)} ⇒ %${nf(100 * f, 1)}.`, "Dolum için gereken su 3/4: (3/4)/(1/8) = 6 saat."] };
  },
};

const leak: FigureDef = {
  caption:
    "Deliksiz tank 6 saatte, aynı giriş ve sabit kaçakla 9 saatte doluyor. Hızlar ortak birimde 18’de bir tank/saat ile yazılır: giriş 3/18, net 2/18, kaçak farkı 1/18. Kaçak tek başına dolu tankı 18 saatte boşaltır (sabit debi modeli).",
  alt: "Her biri 18 eşit hücreli üç şerit: girişte 3, nette 2, kaçakta 1 hücre dolu.",
  draw: () => {
    const rows: [string, number, Tone][] = [["giriş 1/6", 3, "a"], ["net 1/9", 2, "c"], ["kaçak", 1, "warn"]];
    const els: El[] = [];
    rows.forEach(([s, n, tone], r) => {
      const y = 2.4 - r * 1.1;
      for (let i = 0; i < 18; i++) els.push(rect(2.6 + i * 0.36, y, 0.3, 0.7, i < n ? tone : "muted", i < n));
      els.push(txt(v(2.4, y + 0.35), s, "w", { tone, small: true, bold: true }), txt(v(2.6 + 18 * 0.36 + 0.1, y + 0.35), `${n}/18`, "e", { tone: "ink", small: true, bold: true }));
    });
    els.push(...pad(-0.6, 3.4, 10.6, -0.3));
    return { els, readout: ["1/6 − 1/9 = 3/18 − 2/18 = 1/18 tank/saat.", "Kaçak tek başına 18 saatte boşaltır."] };
  },
};

const twoTanks: FigureDef = {
  caption:
    "Aynı hacimde su iki dik silindire konuyor; ikincinin yarıçapı iki kat. Taban alanı πr² olduğundan geniş tankın tabanı 4 kat, aynı hacimde su yüksekliği 1/4’tür (yan kesit ölçekli). Sürgüyle dökülen hacmi değiştir. Eşit yükseklik için hacimler değil, hacim/taban alanı eşitlenir.",
  alt: "Yan yana iki tank kesiti: solda dar (yarıçap r), sağda iki kat geniş (yarıçap 2r); aynı hacimde suyun seviyeleri ve yükseklik değerleri.",
  param: { label: "V: dar tank doluluğu (yüzde)", min: 0, max: 100, step: 10, init: 80 },
  draw: (p) => {
    const H = 4, f = p / 100, els: El[] = [...tank(0.6, 1.0, H, f, "c"), ...tank(3.2, 2.0, H, f / 4, "c")];
    els.push(txt(v(1.1, -0.15), "r", "s", { tone: "muted", small: true }), txt(v(4.2, -0.15), "2r", "s", { tone: "muted", small: true }));
    els.push(txt(v(1.7, Math.max(0.3, f * H)), `%${nf(p, 1)}`, "e", { tone: "ink", small: true, bold: true }), txt(v(5.3, Math.max(0.3, (f / 4) * H)), `%${nf(p / 4, 1)}`, "e", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-0.3, H + 0.4, 8.0, -0.8));
    return { els, readout: [`Aynı V: su yüksekliği dar tankta boyun %${nf(p, 1)}’i, geniş tankta %${nf(p / 4, 1)}’i (iki tank aynı boyda).`, "Taban alanı oranı (2r)²/r² = 4 ⇒ yükseklik 1/4."] };
  },
};

/* ===================== Kesir ===================== */

const usedLeft: FigureDef = {
  caption:
    "Çubuk modeli: 350 TL yedi eşit parçaya bölünür (her parça 50 TL). 2/7’si kullanılırsa 100 TL, kalan 5/7’si 250 TL’dir; kullanılan ile kalan çubuğu tam kaplar. ‘Geriye 250 TL kaldı’ bilgisi (5/7)N = 250 denklemini kurdurur.",
  alt: "Yedi eşit hücreli yatay çubuk; ilk iki hücre kullanılan, kalan beş hücre farklı renkte; altlarında 100 TL ve 250 TL.",
  draw: () => {
    const w = 1.1, els: El[] = [];
    for (let i = 0; i < 7; i++) els.push(...cell(i * w, 0, w, 0.9, "50", i < 2 ? "warn" : "a"));
    els.push(txt(v(w, -0.2), "kullanılan 2/7 = 100", "s", { tone: "warn", small: true, bold: true }), txt(v(4.5 * w, 1.1), "kalan 5/7 = 250", "n", { tone: "a", small: true, bold: true }));
    els.push(txt(v(3.5 * w, 1.9), "350 TL", "n", { tone: "ink", bold: true }));
    els.push(...pad(-0.4, 2.7, 7 * w + 0.4, -1.0));
    return { els, readout: ["350 ÷ 7 = 50; 2·50 = 100, 5·50 = 250.", "Kalan verisinden: (5/7)N = 250 ⇒ N = 350."] };
  },
};

const CHAIN_STEPS = ["Bütünün 1/4’ü", "Kalanın 2/3’ü", "Son kalan", "120 birimde iki farklı bütün"];
const chainFraction: FigureDef = {
  caption:
    "Önce bütünün 1/4’ü, sonra kalanın 2/3’ü harcanıyor. Çubuk 12 eşit parça: ilk harcama 3 parça, kalan 9 parçanın 2/3’ü 6 parça (N/2), son kalan 3 parça (N/4). İkinci kesrin tabanı başlangıç değil ara kalandır; N − N/4 − 2N/3 yanlış modeldir.",
  alt: "On iki eşit hücreli çubuk, ilk ve ikinci kullanım farklı renkte. Son adımda ara kalanla ilk bütünden alınan iki ayrı miktar karşılaştırılır.",
  steps: CHAIN_STEPS,
  draw: (_, step) => {
    const w = 0.62, els: El[] = [];
    if (step === 3) {
      const total = 120;
      const cellAmount = total / 12;
      const first = total / 4;
      const remainder = total - first;
      const rows = [
        { label: "Ara kalanın 1/3’ü", y: 1.55, second: remainder / 3 },
        { label: "İlk bütünün 1/3’ü", y: 0, second: total / 3 },
      ];
      for (const row of rows) {
        for (let i = 0; i < 12; i++) {
          const tone = i * cellAmount < first ? "warn" : i * cellAmount < first + row.second ? "c" : "a";
          els.push(rect(i * w, row.y, w - 0.06, 0.9, tone));
        }
        els.push(txt(v(0, row.y + 1.05), row.label, "ne", { small: true }));
      }
      return {
        els: [...els, ...pad(-0.55, 3.2, 12 * w + 0.4, -0.4)],
        readout: [
          `İlk pay ${first}. Ara kalan ${remainder}; ikinci pay ${rows[0].second}. ${total} − ${first} − ${rows[0].second} = ${remainder - rows[0].second} birim kalır.`,
          `İkinci pay ilk bütünden alınırsa ${rows[1].second}. ${total} − ${first} − ${rows[1].second} = ${remainder - rows[1].second} birim kalır.`,
        ],
      };
    }
    for (let i = 0; i < 12; i++) {
      const tone: Tone = i < 3 ? "warn" : i < 9 && step >= 1 ? "c" : "a";
      els.push(rect(i * w, 0, w - 0.06, 0.9, tone));
    }
    els.push(txt(v(1.5 * w, -0.2), "1/4", "s", { tone: "warn", small: true, bold: true }));
    if (step >= 1) els.push(txt(v(6 * w, -0.2), "kalanın 2/3’ü", "s", { tone: "c", small: true, bold: true }));
    if (step >= 2) els.push(txt(v(10.5 * w, 1.1), "N/4", "n", { tone: "a", bold: true }));
    else els.push(txt(v(7.5 * w, 1.1), step === 0 ? "kalan 3N/4" : "kalan", "n", { tone: "a", small: true, bold: true }));
    els.push(...pad(-0.4, 1.9, 12 * w + 0.4, -1.0));
    const lines = [
      ["Harcanan N/4, kalan 3N/4 (9 parça).", "Kalan, sonraki işlemin bütünü olur."],
      ["(2/3)·(3N/4) = N/2 (6 parça).", "Taban ara kalan, başlangıç değil."],
      ["Son kalan (1/3)(3N/4) = N/4 (3 parça).", "Zincir: N·(3/4)·(1/3) = N/4."],
    ];
    return { els, readout: lines[step] };
  },
};

const fracDiff: FigureDef = {
  caption:
    "Aynı bütünün 3/4’ü ile 2/5’i ortak ölçekte karşılaştırılır: payda 20 seçilince 3/4 = 15/20, 2/5 = 8/20. Fark 7/20’dir; fark F verilirse (7/20)·N = F kurulur. İki parça farklı bütünlere aitse tek N kullanılamaz.",
  alt: "Yirmi hücreli iki çubuk alt alta: üstte 15 hücre, altta 8 hücre dolu; aradaki 7 hücre vurgulu.",
  draw: () => {
    const w = 0.4, els: El[] = [];
    for (let i = 0; i < 20; i++) {
      els.push(rect(2 + i * w, 1.2, w - 0.05, 0.7, i < 15 ? (i >= 8 ? "warn" : "a") : "muted", i < 15));
      els.push(rect(2 + i * w, 0, w - 0.05, 0.7, i < 8 ? "c" : "muted", i < 8));
    }
    els.push(txt(v(1.8, 1.55), "3/4", "w", { tone: "a", bold: true }), txt(v(1.8, 0.35), "2/5", "w", { tone: "c", bold: true }));
    els.push(txt(v(2 + 11.5 * w, 2.1), "fark 7/20", "n", { tone: "warn", small: true, bold: true }));
    els.push(...pad(0.4, 2.9, 2 + 20 * w + 0.4, -0.3));
    return { els, readout: ["3/4 − 2/5 = 15/20 − 8/20 = 7/20.", "Fark F ise N = F·20/7."] };
  },
};

const BACK_STEPS = ["Son kalan 90", "Son aşamayı geri al", "İlk aşamayı geri al"];
const backward: FigureDef = {
  caption:
    "N’nin önce 1/3’ü, sonra kalanın 1/4’ü harcanıyor; son kalan 90. Sondan geri: son aşamada kalan oranı 3/4 ⇒ 90/(3/4) = 120; ilk aşamada kalan oranı 2/3 ⇒ 120/(2/3) = 180. İleri denetim: 180·(2/3)·(3/4) = 90. Çubuk boyları ölçeklidir.",
  alt: "Alt alta üç çubuk: 180, 120 ve 90 uzunluklarında; adım adım alttan yukarı doğru geri hesap okları.",
  steps: BACK_STEPS,
  draw: (_, step) => {
    const k = 0.04, els: El[] = [];
    const bars: [number, number, string][] = [[2.6, 180, "N = 180"], [1.3, 120, "120"], [0, 90, "90"]];
    bars.forEach(([y, val, s], i) => {
      const shown = i === 2 || (i === 1 && step >= 1) || (i === 0 && step >= 2);
      els.push(rect(0, y, val * k, 0.8, shown ? (i === 2 ? "a" : "c") : "muted", shown));
      if (shown) els.push(txt(v(val * k + 0.15, y + 0.4), s, "e", { tone: "ink", bold: true }));
    });
    if (step >= 1) els.push(txt(v(-0.2, 0.9), "÷ 3/4", "w", { tone: "c", small: true, bold: true }));
    if (step >= 2) els.push(txt(v(-0.2, 2.2), "÷ 2/3", "w", { tone: "c", small: true, bold: true }));
    els.push(...pad(-2.0, 3.8, 9.4, -0.3));
    const lines = [["Son kalan 90: son aşamada kalanın 1/4’ü harcanmıştı.", "Harcanan değil kalan biliniyor."], ["90/(3/4) = 120.", "Son aşamadan önceki miktar."], ["120/(2/3) = 180.", "İleri: 180·2/3·3/4 = 90."]];
    return { els, readout: lines[step] };
  },
};

/* ===================== Sayı problemleri ===================== */

const parenOrder: FigureDef = {
  caption:
    "‘4 katının 3 eksiği’ ile ‘3 eksiğinin 4 katı’ çubuk modeli. 4x − 3: dört x çubuğu yan yana, sonundan 3 çıkar. 4(x − 3): dört kez (x − 3); her çubuktan 3 çıktığı için toplam 12 eksilir. Sürgüyle x’i değiştir; x = 10’da 37 ve 28.",
  alt: "Üst satırda dört eşit x çubuğu ve sonda kesilmiş 3 birimlik parça; alt satırda dört çubuğun her birinden 3 birim kesilmiş.",
  param: { label: "x", min: 4, max: 15, step: 1, init: 10 },
  draw: (x) => {
    const k = 8.4 / (4 * x), els: El[] = [];
    for (let i = 0; i < 4; i++) {
      els.push(rect(i * x * k, 1.4, (i < 3 ? x : x - 3) * k - 0.04, 0.7, "a"));
      els.push(rect(i * x * k, 0, (x - 3) * k - 0.04, 0.7, "c"), rect(i * x * k + (x - 3) * k, 0, 3 * k - 0.04, 0.7, "warn", false));
    }
    els.push(rect(4 * x * k - 3 * k, 1.4, 3 * k - 0.04, 0.7, "warn", false));
    els.push(txt(v(-0.2, 1.75), "4x − 3", "w", { tone: "a", small: true, bold: true }), txt(v(-0.2, 0.35), "4(x − 3)", "w", { tone: "c", small: true, bold: true }));
    els.push(txt(v(4 * x * k + 0.15, 1.75), String(4 * x - 3), "e", { tone: "ink", bold: true }), txt(v(4 * x * k + 0.15, 0.35), String(4 * (x - 3)), "e", { tone: "ink", bold: true }));
    els.push(...pad(-2.4, 2.5, 9.6, -0.3));
    return { els, readout: [`x = ${x}: 4x − 3 = ${4 * x - 3}, 4(x − 3) = ${4 * (x - 3)}.`, "Fark her zaman 9: parantez süs değildir."] };
  },
};

const consecutiveOdd: FigureDef = {
  caption:
    "Ardışık tek sayılar ortak farkı 2 olan sayılardır: x − 2, x, x + 2 ve toplamları 3x. Sürgüyle ortadaki tek sayıyı değiştir. 3, 9, 15 de tek sayılardır ama farkları 6’dır; ardışık tek sayı değildir.",
  alt: "1’den 17’ye sayı doğrusu; üstte seçilen üç ardışık tek sayı 2’şer adımlı yaylarla; altta 3, 9, 15 noktaları 6’şar adımlı.",
  param: { label: "x", min: 3, max: 15, step: 2, init: 7 },
  draw: (x) => {
    const k = 0.5, els: El[] = [...numberLine(0, 17, k, 0, [1, 3, 5, 7, 9, 11, 13, 15, 17])];
    for (const n of [x - 2, x, x + 2]) els.push(pt(v(n * k, 0.4), undefined, "n", "a"));
    els.push(seg(v((x - 2) * k, 0.4), v((x + 2) * k, 0.4), { tone: "a", thin: true }), txt(v(x * k, 0.7), "+2 +2", "n", { tone: "a", small: true, bold: true }));
    for (const n of [3, 9, 15]) els.push(pt(v(n * k, -0.9), undefined, "n", "warn"));
    els.push(seg(v(3 * k, -0.9), v(15 * k, -0.9), { tone: "warn", thin: true, dash: true }), txt(v(9 * k, -1.2), "+6 +6: ardışık değil", "s", { tone: "warn", small: true }));
    els.push(...pad(-0.6, 1.7, 17 * k + 0.6, -2.0));
    return { els, readout: [`${x - 2} + ${x} + ${x + 2} = ${3 * x} = 3·${x}.`, "x’in tek olması ayrıca denetlenir."] };
  },
};

const CAP_STEPS = ["İki düzen", "Ortak kısmı çıkar", "b = 3a", "Otoparkta 57 yer"];
const capacity: FigureDef = {
  caption:
    "Aynı depo: 18 küçük + 8 büyük kutu = 12 küçük + 10 büyük kutu. Şeritler aynı uzunluktadır (küçük kutu a, büyük kutu b). İki satırdan ortak 12a + 8b çıkarılınca 6a = 2b kalır: bir büyük kutu üç küçük kutunun yerini alır (b = 3a). Otopark adımında aynı ilişkiyi otomobil yeriyle ölç.",
  alt: "İki şerit: üstte 18 dar ve 8 geniş hücre, altta 12 dar ve 10 geniş hücre; ikinci adımda ortak kısım soluk, kalan 6 dar ile 2 geniş hücre vurgulu. Otopark adımında her kamyon üç otomobillik genişlikte gösterilir.",
  steps: CAP_STEPS,
  draw: (_, step) => {
    const a = 0.3, b = 0.9, els: El[] = [];
    const row = (y: number, na: number, nb: number, keepA: number, keepB: number, wide = b) => {
      let x = 0;
      for (let i = 0; i < na; i++, x += a) els.push(rect(x, y, a - 0.03, 0.8, step >= 1 && i < keepA ? "muted" : "a", !(step >= 1 && i < keepA)));
      for (let i = 0; i < nb; i++, x += wide) els.push(rect(x, y, wide - 0.03, 0.8, step >= 1 && i < keepB ? "muted" : "c", !(step >= 1 && i < keepB)));
    };
    if (step === 3) {
      const first = { cars: 24, trucks: 11 };
      const second = { cars: 18, trucks: 13 };
      const truckUnits = (first.cars - second.cars) / (second.trucks - first.trucks);
      const firstCapacity = first.cars + first.trucks * truckUnits;
      const secondCapacity = second.cars + second.trucks * truckUnits;
      row(1.3, first.cars, first.trucks, 0, 0, a * truckUnits);
      row(0, second.cars, second.trucks, 0, 0, a * truckUnits);
      els.push(
        txt(v(-0.2, 1.7), "İlk düzen", "w", { tone: "ink", small: true }),
        txt(v(-0.2, 0.4), "İkinci düzen", "w", { tone: "ink", small: true }),
        ...pad(-3.4, 3.0, 18.4, -0.9),
      );
      return {
        els,
        readout: [
          `${first.cars} otomobil + ${first.trucks} kamyon veya ${second.cars} otomobil + ${second.trucks} kamyon aynı alanı doldurur.`,
          `Bir kamyon ${truckUnits} otomobil yeri kaplar.`,
          `${first.cars}+${first.trucks}·${truckUnits}=${firstCapacity} ve ${second.cars}+${second.trucks}·${truckUnits}=${secondCapacity} otomobil yeri.`,
        ],
      };
    }
    if (step === 4) {
      const first = { small: 10, large: 4 };
      const second = { small: 4, large: 7 };
      const extraSmall = first.small - second.small;
      const extraLarge = second.large - first.large;
      const largeUnits = extraSmall / extraLarge;
      row(1.3, first.small, first.large, second.small, first.large, a * largeUnits);
      row(0, second.small, second.large, second.small, first.large, a * largeUnits);
      els.push(
        txt(v(-0.2, 1.7), "10a + 4b", "w", { tone: "ink", small: true }),
        txt(v(-0.2, 0.4), "4a + 7b", "w", { tone: "ink", small: true }),
        ...pad(-2.3, 2.8, 6.0, -0.7),
      );
      return {
        els,
        readout: [
          `Soluk 4a ve 4b iki satırda aynı. Kalan: ${extraSmall}a = ${extraLarge}b, b = ${largeUnits}a.`,
          `İlk düzen: 10 + 4·${largeUnits} = ${first.small + first.large * largeUnits} küçük kutu yeri.`,
          `İkinci düzen: 4 + 7·${largeUnits} = ${second.small + second.large * largeUnits} küçük kutu yeri.`,
        ],
      };
    }
    row(1.3, 18, 8, 12, 8);
    row(0, 12, 10, 12, 8);
    els.push(txt(v(-0.2, 1.7), "18a + 8b", "w", { tone: "ink", small: true, bold: true }), txt(v(-0.2, 0.4), "12a + 10b", "w", { tone: "ink", small: true, bold: true }));
    if (step >= 1) els.push(txt(v(4.5, 2.3), "6a", "n", { tone: "a", bold: true }), txt(v(11.7, -0.2), "2b", "s", { tone: "c", bold: true }));
    els.push(...pad(-3.4, 3.0, 13.0, -0.9));
    const lines = [["İki düzen aynı alanı doldurur: 18a + 8b = 12a + 10b.", "Şerit boyları eşit."], ["Ortak 12a + 8b çıkar: 6a = 2b.", "Soluk hücreler iki satırda aynı."], ["b = 3a: bir büyük kutu = üç küçük kutu.", "a’nın gerçek değeri gerekmez."]];
    return { els, readout: lines[step] };
  },
};

export const capacityWithBoxExample: FigureDef = {
  ...capacity,
  steps: [...CAP_STEPS, "Başka iki kutu düzeni"],
};

const budget: FigureDef = {
  caption:
    "Tanesi 12 TL olan üründen B TL bütçeyle en çok kaç tane alınır? 12’nin katları sayı doğrusunda; bütçeyi aşmayan en büyük kat seçilir. Sürgüyle bütçeyi değiştir. 95 TL ile 7 tane (84 TL); 8 tane 96 TL bütçeyi aşar. 95/12 ≈ 7,92 bir adet değildir; normal yuvarlama kullanılmaz.",
  alt: "0’dan 132’ye sayı doğrusu; 12’nin katları işaretli; bütçe konumunda dikey çizgi; bütçeyi aşmayan katlar dolu, aşanlar boş.",
  param: { label: "bütçe", min: 50, max: 130, step: 1, init: 95, unit: " TL" },
  draw: (B) => {
    const k = 0.068, n = Math.floor(B / 12), els: El[] = [vec(v(-0.3, 0), v(132 * k + 0.4, 0), { tone: "ink", thin: true })];
    for (let i = 0; i <= 11; i++) {
      const ok = 12 * i <= B;
      els.push(seg(v(12 * i * k, -0.08), v(12 * i * k, 0.08), { tone: "muted", thin: true }), pt(v(12 * i * k, 0.35), undefined, "n", ok ? "a" : "muted", !ok));
      if (i % 2 === 0 || i === n) els.push(txt(v(12 * i * k, -0.2), String(12 * i), "s", { tone: i === n ? "a" : "muted", small: true, soft: i !== n }));
    }
    els.push(seg(v(B * k, -0.1), v(B * k, 1.0), { tone: "warn" }), txt(v(B * k, 1.1), `${B} TL`, "n", { tone: "warn", bold: true }));
    els.push(...pad(-0.5, 1.9, 132 * k + 0.6, -0.9));
    return { els, readout: [`En çok ${n} tane: ${n}·12 = ${12 * n} ≤ ${B} < ${12 * (n + 1)}.`, `${B}/12 ≈ ${nf(B / 12, 2)}: ‘en çok’ aşağı yuvarlatır.`] };
  },
};

export const mathFigures060TytProblems: Record<string, Record<string, FigureDef>> = {
  "faiz-problemleri": {
    "Basit faiz neden doğrusal artar?": simpleLine,
    "Ayı ve günü oranla aynı döneme çevir": months,
    "Aynı para ve aynı süre varsa ortak çarpan sadeleşir": sameInterest,
    "Faiz yeniden yatırılıyorsa çarpanlar değişir": compound,
  },
  "havuz-problemleri": {
    "Giriş ekler, çıkış azaltır": netFill,
    "Başlangıç doluluğunu denklemde tut": startLevel,
    "Kaçağın hızını karşılaştırmadan çıkar": leak,
    "Hacim eşitliği yükseklik eşitliği değildir": twoTanks,
  },
  "kesir-problemleri": {
    "Kullanılanı ve kalanı birbirinden ayır": usedLeft,
    "Kalanın kesri yeni bir taban kullanır": chainFraction,
    "Parçaların farkından bütüne dön": fracDiff,
    "Geriye doğru çözüm hangi aşamayı geri alır?": backward,
  },
  "sayi-problemleri": {
    "İşlemin cümledeki sırasını parantezle koru": parenOrder,
    "Ardışıklık ortak farkı belirler": consecutiveOdd,
    "Kapasite eşitliği birimlerin oranını buldurur": capacity,
    "En az ve en çok eşitlikten fazlasını söyler": budget,
  },
};
