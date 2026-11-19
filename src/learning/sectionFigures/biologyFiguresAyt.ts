import { ball, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Biyoloji. Photosynthesis rate against light at two CO₂ levels (the
 * limiting factor changes along the curve), the ovarian and pituitary
 * hormones across a 28-day cycle with a day slider, and how an inserted or
 * deleted base changes the reading frame of an mRNA. Curves are schematic
 * teaching shapes, not measurements; codons follow the standard table.
 */

/* ---------- 1. Fotosentez ve ışık ---------- */
const light: FigureDef = {
  caption:
    "Sürgüyle ışık şiddetini artır. Düşük ışıkta hızı ışık sınırlar: ışık artınca hız artar. Bir noktadan sonra eğri düzleşir (doygunluk); artık sınırlayan başka bir etmendir. Aynı ışıkta CO₂ artırılınca plato yükselir, yani düzlükte sınırlayan CO₂'dir. Sıcaklık ve enzim miktarı da sınırlayabilir.",
  alt: "Fotosentez hızı–ışık şiddeti grafiği: iki eğri, düşük CO₂ eğrisi daha alçak platoya, yüksek CO₂ eğrisi daha yüksek platoya ulaşır; sürgüyle iki eğri üzerinde noktalar hareket eder.",
  param: { label: "Işık şiddeti", min: 0, max: 10, step: 0.5, init: 2, unit: "" },
  draw: (L) => {
    const rate = (l: number, max: number) => max * (1 - Math.exp(-l / 2.2));
    const X = (l: number) => l * 0.7;
    const Y = (r: number) => r * 0.6;
    const els: El[] = [vec(v(0, 0), v(X(10.8), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(7.2)), { tone: "ink" })];
    els.push(txt(v(X(10.8), 0), "ışık", "se", { tone: "ink", small: true }), txt(v(0, Y(7.2)), "fotosentez hızı", "n", { tone: "ink", small: true }));
    const curve = (max: number, tone: Tone) => poly(Array.from({ length: 41 }, (_, i) => v(X(i / 4), Y(rate(i / 4, max)))) as V[], { tone, open: true, bold: true, smooth: true });
    els.push(curve(6, "c"), curve(3, "b"));
    els.push(txt(v(X(10), Y(rate(10, 6))), "yüksek CO₂", "ne", { tone: "c", small: true, bold: true }), txt(v(X(10), Y(rate(10, 3))), "düşük CO₂", "se", { tone: "b", small: true, bold: true }));
    els.push(ball(v(X(L), Y(rate(L, 6))), 0.11, "warn"), ball(v(X(L), Y(rate(L, 3))), 0.11, "warn"));
    els.push(seg(v(X(L), 0), v(X(L), Y(rate(L, 6))), { tone: "muted", dash: true, thin: true }));
    els.push(txt(v(-1.2, Y(8.2)), " ", "c"), txt(v(X(10.8) + 2.4, -0.9), " ", "c"));
    const lo = rate(L, 3);
    const hi = rate(L, 6);
    const slopeLo = (rate(L + 0.25, 3) - lo) / 0.25;
    const limiting = slopeLo > 0.25 ? "ışık" : "CO₂ (ışık artık sınırlamıyor)";
    return {
      els,
      readout: [
        `Işık ${fmt(L, 1)}: düşük CO₂'de hız ${fmt(lo, 1)}, yüksek CO₂'de ${fmt(hi, 1)} (göreli birim).`,
        `Düşük CO₂ eğrisinde sınırlayan etmen: ${limiting}. Grafik okurken “hangi etmen artınca hız artıyor?” diye sor.`,
      ],
    };
  },
};

/* ---------- 2. Adet döngüsü hormonları ---------- */
const cycle: FigureDef = {
  caption:
    "Sürgüyle döngünün gününü değiştir (28 günlük örnek döngü; gün 1 kanamanın başladığı gün). FSH folikül büyümesini başlatır; büyüyen folikülün östrojeni yükselir. Yüksek östrojen bir süre sonra hipofize pozitif geri bildirim verir: LH tepesi ve yaklaşık 14. günde ovulasyon. Korpus luteum progesteron salgılar; gebelik yoksa geriler ve hormonlar düşer.",
  alt: "28 günlük zaman ekseninde dört hormon eğrisi: FSH erken küçük yükselme, östrojen 12. gün çevresinde tepe, LH 14. günde keskin tepe, progesteron 21. gün çevresinde geniş tepe; sürgüyle hareket eden dikey gün çizgisi.",
  param: { label: "Gün", min: 1, max: 28, step: 1, init: 14, unit: "" },
  draw: (day) => {
    const g = (d: number, c: number, w: number, h: number) => h * Math.exp(-(((d - c) / w) ** 2));
    const H = {
      FSH: (d: number) => 0.6 + g(d, 3, 3, 0.7) + g(d, 14, 1.2, 0.7),
      LH: (d: number) => 0.5 + g(d, 14, 0.9, 3.4),
      östrojen: (d: number) => 0.4 + g(d, 12.5, 2.2, 2.0) + g(d, 21, 3, 0.9),
      progesteron: (d: number) => 0.2 + g(d, 21, 3.4, 2.1),
    };
    const X = (d: number) => (d - 1) * 0.3;
    const Y = (h: number) => h * 0.9;
    const tones: Record<keyof typeof H, Tone> = { FSH: "muted", LH: "warn", östrojen: "c", progesteron: "b" };
    const els: El[] = [vec(v(0, 0), v(X(29.5), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(4.6)), { tone: "ink" })];
    els.push(txt(v(X(29.5), 0), "gün", "se", { tone: "ink", small: true }), txt(v(0, Y(4.6)), "kandaki düzey", "n", { tone: "ink", small: true }));
    (Object.keys(H) as (keyof typeof H)[]).forEach((k) => {
      const ps: V[] = Array.from({ length: 109 }, (_, i) => {
        const d = 1 + (27 * i) / 108;
        return v(X(d), Y(H[k](d)));
      });
      els.push(poly(ps, { tone: tones[k], open: true, bold: k !== "FSH", smooth: true }));
    });
    els.push(txt(v(X(14), Y(H.LH(14))), "LH", "n", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(X(12.3), Y(H.östrojen(12.3))), "östrojen", "nw", { tone: "c", small: true, bold: true }));
    els.push(txt(v(X(23.2), Y(H.progesteron(23.2))), "progesteron", "ne", { tone: "b", small: true, bold: true }));
    els.push(txt(v(X(3), Y(H.FSH(3))), "FSH", "n", { tone: "muted", small: true, bold: true }));
    for (const d of [1, 14, 28]) els.push(txt(v(X(d), 0), String(d), "s", { tone: "muted", small: true, soft: true }));
    els.push(seg(v(X(day), 0), v(X(day), Y(4.2)), { tone: "ink", dash: true, thin: true }));
    els.push(txt(v(-1.4, Y(5.4)), " ", "c"), txt(v(X(29.5) + 1.2, -0.9), " ", "c"));
    const phase =
      day <= 5
        ? "Kanama (menstruasyon) ve folikül evresinin başı: endometriyum dökülür, FSH ile yeni folikül büyümeye başlar."
        : day < 13
          ? "Folikül evresi: baskın folikül büyür, östrojen yükselir, endometriyum kalınlaşır (östrojen önce negatif geri bildirim)."
          : day <= 15
            ? "Ovulasyon çevresi: yüksek östrojen pozitif geri bildirime döner, LH tepesi folikülü yırtar; sekonder oosit serbest kalır."
            : day < 26
              ? "Luteal evre: korpus luteum progesteron (ve östrojen) salgılar; endometriyum salgı yapar, FSH/LH baskılanır."
              : "Gebelik yoksa korpus luteum geriler; progesteron düşer, endometriyum dökülmeye hazırlanır.";
    return { els, readout: [`Gün ${day}`, phase] };
  },
};

/* ---------- 3. Okuma çerçevesi ---------- */
const AA: Record<string, string> = { AUG: "Met", GCU: "Ala", UAC: "Tyr", GGA: "Gly", UAA: "dur", AGC: "Ser", UUA: "Leu", CGG: "Arg", AUA: "Ile" };
const frame: FigureDef = {
  caption:
    "İleri ile mRNA'yı 5′→3′ yönünde üçlü üçlü oku. Ribozom AUG'den başlar ve her seferinde üç baz ilerler. Araya tek baz girerse (ya da tek baz silinirse) sonraki bütün üçlüler kayar; çoğu amino asit değişir. Üç bazlık bir silinme çerçeveyi bozmaz, yalnız bir amino asit eksilir.",
  alt: "Kutucuklar içinde mRNA bazları; üçlüler sırayla renklendirilmiş, altında kodlanan amino asitler. Adımlarda özgün dizi, bir baz eklenmiş dizi ve üç baz silinmiş dizi gösterilir.",
  steps: ["Özgün dizi", "1 baz eklenir", "3 baz silinir"],
  draw: (_v, step) => {
    const seqs = ["AUGGCUUACGGAUAA", "AUGAGCUUACGGAUAA", "AUGUACGGAUAA"];
    const seq = seqs[step];
    const w = 0.52;
    const els: El[] = [];
    const codons = Math.floor(seq.length / 3);
    for (let i = 0; i < seq.length; i++) {
      const x = i * w;
      const inCodon = Math.floor(i / 3) < codons;
      const tone: Tone = !inCodon ? "muted" : Math.floor(i / 3) % 2 ? "b" : "c";
      const inserted = step === 1 && i === 3;
      els.push(poly([v(x, 0), v(x + w - 0.04, 0), v(x + w - 0.04, 0.6), v(x, 0.6)], { tone: inserted ? "warn" : tone, fill: inserted ? "warn" : tone, thin: true }));
      els.push(txt(v(x + (w - 0.04) / 2, 0.3), seq[i], "c", { tone: "ink", small: true, bold: true }));
    }
    let stopped = false;
    for (let c = 0; c < codons; c++) {
      const triplet = seq.slice(c * 3, c * 3 + 3);
      const aa = stopped ? "" : (AA[triplet] ?? "?");
      if (aa === "dur") stopped = true;
      const x = c * 3 * w + 1.5 * w - 0.02;
      if (aa) els.push(txt(v(x, -0.15), aa, "s", { tone: aa === "dur" ? "warn" : "ink", small: true, bold: aa !== "dur" }));
    }
    els.push(txt(v(0, 0.6), "5′", "nw", { tone: "muted", small: true }), txt(v(seq.length * w, 0.6), "3′", "ne", { tone: "muted", small: true }));
    els.push(txt(v(-0.8, 1.6), " ", "c"), txt(v(16 * w + 0.8, -1.3), " ", "c"));
    const rows: [string, string][] = [
      ["AUG GCU UAC GGA UAA → Met–Ala–Tyr–Gly, sonra dur kodonu.", "Başlama kodonu AUG metiyonini de kodlar; UAA amino asit kodlamaz, sentezi bitirir."],
      ["AUG'den sonra A eklendi: AUG AGC UUA CGG AUA … → Met–Ser–Leu–Arg–Ile. Çerçeve kaydı.", "Eklemeden sonraki bütün üçlüler değişti; dur kodonu yerinde değil, protein uzayabilir ya da erken bitebilir."],
      ["GCU silindi: AUG UAC GGA UAA → Met–Tyr–Gly, sonra dur. Çerçeve korundu.", "3'ün katı kadar ekleme ya da silme çerçeveyi kaydırmaz; yalnız bir amino asit eksilir veya eklenir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Aksiyon potansiyeli ---------- */
const apV = (t: number) => {
  // Teaching shape (ms → mV): rest −70, threshold −55 at 1 ms, peak +30 at 1.6 ms,
  // back to −70 at 2.6 ms, undershoot −80 at 3.1 ms, rest by 4 ms.
  if (t < 0.6) return -70;
  if (t < 1) return -70 + ((t - 0.6) / 0.4) * 15;
  if (t < 1.6) return -55 + ((t - 1) / 0.6) ** 1.6 * 85;
  if (t < 2.6) return 30 - (1 - Math.cos(((t - 1.6) / 1) * Math.PI)) * 50;
  if (t < 3.1) return -70 - ((t - 2.6) / 0.5) * 10;
  return -80 + Math.min(1, (t - 3.1) / 0.9) * 10;
};
const actionPotential: FigureDef = {
  caption:
    "Sürgüyle zamanı ilerlet (temsilî değerler). Dinlenmede zar −70 mV. Uyarı zarı eşiğe (−55 mV) getirirse voltaj kapılı Na⁺ kanalları açılır, Na⁺ içeri girer, gerilim +30 mV'ye çıkar (depolarizasyon). Sonra Na⁺ kanalları kapanır, K⁺ dışarı çıkar ve gerilim düşer (repolarizasyon); kısa süre dinlenmenin altına iner (hiperpolarizasyon). Na⁺/K⁺ pompası ATP ile gradyanı uzun vadede korur; hızlı tepeyi yapan kanallardır.",
  alt: "Zar gerilimi–zaman grafiği: −70 mV düz çizgi, eşik −55 mV'de kesik çizgi, +30 mV tepeye hızlı yükseliş, iniş, −80 mV'ye kısa dalış ve dinlenmeye dönüş; sürgüyle hareket eden nokta.",
  param: { label: "Zaman", min: 0, max: 4, step: 0.1, init: 1.3, unit: " ms" },
  draw: (t) => {
    const X = (ms: number) => ms * 1.6;
    const Y = (mV: number) => (mV + 90) * 0.035;
    const els: El[] = [vec(v(0, 0), v(X(4.3), 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(45)), { tone: "ink" })];
    els.push(txt(v(X(4.3), 0), "ms", "se", { tone: "ink", small: true }), txt(v(0, Y(45)), "V (mV)", "n", { tone: "ink", small: true }));
    els.push(seg(v(0, Y(-55)), v(X(4), Y(-55)), { tone: "warn", dash: true, thin: true }), txt(v(X(4), Y(-55)), "eşik −55", "e", { tone: "warn", small: true }));
    for (const mv of [30, -70]) els.push(txt(v(0, Y(mv)), mv < 0 ? `−${-mv}` : String(mv), "w", { tone: "muted", small: true, soft: true }), seg(v(0, Y(mv)), v(X(4), Y(mv)), { tone: "muted", dash: true, thin: true }));
    const pts: V[] = Array.from({ length: 161 }, (_, i) => v(X(i / 40), Y(apV(i / 40))));
    els.push(poly(pts, { tone: "c", open: true, bold: true }));
    const now = apV(t);
    els.push(ball(v(X(t), Y(now)), 0.12, "a"));
    els.push(txt(v(-1.0, Y(52)), " ", "c"), txt(v(X(4.3) + 1.8, -0.8), " ", "c"));
    const phase =
      t < 0.6
        ? ["Dinlenme (polarizasyon): Na⁺ dışarıda, K⁺ içeride daha yoğun; iç taraf −70 mV.", "Pompa: 3 Na⁺ dışarı, 2 K⁺ içeri, 1 ATP. Gradyanı korur, tepeyi yapmaz."]
        : t < 1
          ? ["Eşik altı depolarizasyon: −70'ten −55'e. −60 mV eşik altıdır (−60 < −55).", "Eşik aşılmazsa AP yok; aşılırsa tek AP'nin genliği uyaran şiddetinden bağımsız (ya hep ya hiç)."]
          : t < 1.6
            ? ["Depolarizasyon: voltaj kapılı Na⁺ kanalları açık, Na⁺ içeri; V +30 mV'ye çıkar.", "Pozitif değer iç tarafın dışa göre pozitifleştiğini gösterir. Bu evrede mutlak refrakterlik başlar."]
            : t < 2.6
              ? ["Repolarizasyon: Na⁺ kanalları inaktif, K⁺ kanalları açık, K⁺ dışarı; V düşer.", "Pozitif K⁺ kaybı içi negatifleştirir. Tepe sonrası iniş = repolarizasyon; aynı mV değeri yükselişte de görülebilir."]
              : t < 3.1
                ? ["Hiperpolarizasyon: K⁺ kanalları geç kapanır, V −80 mV'ye iner (dinlenmeden negatif).", "Göreli refrakter dönem: yeni AP için daha güçlü uyarı gerekebilir."]
                : ["Dinlenmeye dönüş: −70 mV.", "Şiddet bilgisi impuls frekansıyla (Hz) taşınır; iletim hızı miyelin ve akson çapına bağlıdır (2018 AYT Fen 32)."];
    return { els, readout: [`t = ${fmt(t, 1)} ms · V ≈ ${fmt(now, 0)} mV · ${phase[0]}`, phase[1]] };
  },
};

export const biologyFiguresAyt: Record<string, Record<string, FigureDef>> = {
  "fotosentez-hiz-faktorleri": { "Işık artışı ve doygunluk platosu": light },
  "ureme-menstrual-dongu": { "LH tepesi ve ovulasyon": cycle },
  "ayt-kodon-antikodon": { "Okuma çerçevesi üçlüleri belirler": frame },
  "sinir-sistemi-aksiyon-potansiyeli": { "Depolarizasyon, repolarizasyon ve hiperpolarizasyon": actionPotential },
};
