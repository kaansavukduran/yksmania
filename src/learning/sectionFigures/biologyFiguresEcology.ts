import { ball, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Ekoloji: besin piramidi, besin ağı ve organizasyon birimleri. Energy flows
 * as a stack of centred bars (widths compressed, numbers exact), a number
 * pyramid beside an energy pyramid for the same tree–caterpillar–bird chain,
 * a herbivore's 1000 kJ budget split into egested, respired and new biomass,
 * energy falling while a persistent pollutant's concentration rises, a small
 * web where one bird sits on two trophic levels, and the individual →
 * population → community → ecosystem row. Values are the guide's own
 * teaching numbers, not field measurements.
 */

const bar = (cx: number, y: number, w: number, h: number, tone: Tone): El =>
  poly([v(cx - w / 2, y), v(cx + w / 2, y), v(cx + w / 2, y + h), v(cx - w / 2, y + h)], { tone, fill: tone });
const LEVELS = ["üretici", "birincil tüketici", "ikincil tüketici", "üçüncül tüketici"];
const TONES: Tone[] = ["c", "a", "warn", "b"];

/* ---------- 1. Enerji piramidi: verilen verim ---------- */
const energy: FigureDef = {
  caption:
    "Sürgüyle her geçişteki aktarım yüzdesini değiştir. Üretici 10 000 kJ ile başlar; her basamak bir öncekinin verilen yüzdesini alır, yani yüzdeler ardışık çarpılır. %10 yalnız bir modeldir: soruda başka verim verilmişse onu kullan. Çubuk genişlikleri sıkıştırılmıştır, sayılar kesindir.",
  alt: "Alttan üste dört yatay çubuk: üretici, birincil, ikincil, üçüncül tüketici; yukarı çıktıkça daralıyor. Yanlarında kJ değerleri ve trofik düzey numaraları.",
  param: { label: "Aktarım yüzdesi", min: 5, max: 20, step: 1, init: 10, unit: "%" },
  draw: (p) => {
    const els: El[] = [];
    let E = 10000;
    for (let i = 0; i < 4; i++) {
      const w = 7 * Math.pow(E / 10000, 0.3);
      els.push(bar(0, i * 1.2, w, 0.8, TONES[i]), txt(v(w / 2 + 0.2, i * 1.2 + 0.4), `${fmt(E, 2)} kJ`, "e", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(-3.9, i * 1.2 + 0.4), `${i + 1}. ${LEVELS[i]}`, "w", { tone: "muted", small: true }));
      E = (E * p) / 100;
    }
    els.push(txt(v(-8.4, 4.9), " ", "c"), txt(v(6.6, -0.4), " ", "c"));
    const last = 10000 * Math.pow(p / 100, 3);
    return {
      els,
      readout: [
        `Üreticiden üçüncül tüketiciye 3 geçiş: 10 000 · ${fmt(p / 100, 2)}³ = ${fmt(last, 2)} kJ (%${fmt(Math.pow(p / 100, 3) * 100, 4)})`,
        "Geçiş sayısı = hedef düzey − 1. \"Üçüncü düzey\" ikincil tüketicidir: iki geçiş. Ters soruda son değeri çarpanlara böl.",
      ],
    };
  },
};

/* ---------- 2. Sayı piramidi ters olabilir ---------- */
const numbers: FigureDef = {
  caption:
    "İleri ile aynı besin zincirini iki ölçümle karşılaştır: 1 ağaç → 200 tırtıl → 8 kuş. Birey sayısında ikinci basamak birinciden geniştir (ters görünüm), çünkü tek büyük ağaç çok sayıda küçük otçulu besler. Aynı zincirin enerji piramidi aynı alan ve süre için her zaman yukarı daralır.",
  alt: "Solda sayı piramidi: altta çok dar ağaç çubuğu, ortada geniş tırtıl çubuğu, üstte dar kuş çubuğu. Sağda enerji piramidi: alttan üste düzenli daralan üç çubuk.",
  steps: ["Sayı piramidi", "Enerji piramidi"],
  draw: (_v, step) => {
    const els: El[] = [];
    const nums: [number, string][] = [[1, "1 ağaç"], [200, "200 tırtıl"], [8, "8 kuş"]];
    nums.forEach(([n, s], i) => {
      const w = 0.5 + 4.5 * Math.min(1, n / 200);
      els.push(bar(-3.5, i * 0.9, w, 0.7, step === 0 ? TONES[i] : "muted"), txt(v(-3.5 + w / 2 + 0.15, i * 0.9 + 0.35), s, "e", { tone: step === 0 ? "ink" : "muted", small: true, bold: step === 0 }));
    });
    const en: [number, string][] = [[1, "üretici"], [0.1, "otçul"], [0.01, "etçil"]];
    en.forEach(([e, s], i) => {
      const w = 4.5 * Math.pow(e, 0.3);
      els.push(bar(4.2, i * 0.9, w, 0.7, step === 1 ? TONES[i] : "muted"), txt(v(4.2 + w / 2 + 0.15, i * 0.9 + 0.35), s, "e", { tone: step === 1 ? "ink" : "muted", small: true, bold: step === 1 }));
    });
    els.push(txt(v(-3.5, -0.15), "birey sayısı", "s", { tone: step === 0 ? "ink" : "muted", small: true, bold: true }), txt(v(4.2, -0.15), "enerji (kJ/m²/yıl)", "s", { tone: step === 1 ? "ink" : "muted", small: true, bold: true }));
    els.push(txt(v(-6.4, 2.9), " ", "c"), txt(v(8.6, -1.0), " ", "c"));
    const rows: [string, string][] = [
      ["Birey sayısı: 1 → 200 → 8. İkinci basamak birinciden büyük: ters görünüm mümkün.", "Sayının ters olması enerjinin yukarı arttığını göstermez."],
      ["Enerji aynı alan ve süre için her geçişte azalır: piramit asla ters değildir.", "Anlık biyokütle de ters olabilir (hızla yenilenen algler); enerji akışı olamaz."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Enerji bütçesi ---------- */
const budget: FigureDef = {
  caption:
    "İleri ile bir otçulun aldığı 1000 kJ'yi izle. 300 kJ sindirilemeden atılır, özümlenen enerjinin 500 kJ'si solunumda kullanılıp ısı olarak yayılır. Büyüme ve üreme için yeni biyokütleye kalan 1000 − 300 − 500 = 200 kJ'dir. Bu 200 kJ'nin tamamı avcıya geçmek zorunda değildir.",
  alt: "1000 kJ uzunluğunda yatay çubuk üç parçaya bölünüyor: 300 kJ sindirilmeyen, 500 kJ solunum (ısı), 200 kJ yeni biyokütle. Parçaların altında adları, üstünde değerleri.",
  steps: ["Alınan besin", "Sindirilmeyen", "Solunum", "Yeni biyokütle"],
  draw: (_v, step) => {
    const k = 0.009;
    const parts: [number, string, Tone][] = [
      [300, "sindirilmeyen (dışkı)", "muted"],
      [500, "solunum → ısı", "warn"],
      [200, "yeni biyokütle", "c"],
    ];
    const els: El[] = [];
    if (step === 0) els.push(bar(500 * k, 0, 1000 * k, 0.8, "b"), txt(v(500 * k, 0.8), "1000 kJ alınan besin", "n", { tone: "ink", small: true, bold: true }));
    else {
      let x = 0;
      parts.forEach(([e, s, tone], i) => {
        const on = i < step;
        els.push(poly([v(x, 0), v(x + e * k, 0), v(x + e * k, 0.8), v(x, 0.8)], { tone: on ? tone : "muted", fill: on ? tone : undefined, thin: !on }));
        if (on) els.push(txt(v(x + (e * k) / 2, 0.8), `${e} kJ`, "n", { tone: "ink", small: true, bold: true }), txt(v(x + (e * k) / 2, 0), s, "s", { tone: tone === "muted" ? "ink" : tone, small: true }));
        x += e * k;
      });
      if (step >= 2) for (const dx of [4.0, 4.6, 5.2]) els.push(vec(v(dx, 1.4), v(dx, 2.0), { tone: "warn", thin: true }));
    }
    els.push(txt(v(-0.4, 2.4), " ", "c"), txt(v(9.4, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Otçulun yediği besin 1000 kJ enerji taşıyor.", "Alınan ile özümlenen aynı değildir."],
      ["300 kJ sindirilemeden atılır: ayrıştırıcıların kullanabileceği enerji.", "Bu enerji yok olmaz; ekosistemde başka yola girer."],
      ["Özümlenen 700 kJ'nin 500 kJ'si solunumda kullanılır, ısı olarak yayılır.", "Isı besin zincirinde yeniden kullanılamaz: enerji akışı tek yönlüdür."],
      ["Kalan 1000 − 300 − 500 = 200 kJ büyüme ve üremeye: yeni biyokütle (%20).", "Kontrol: 300 + 500 + 200 = 1000. Avcı otçulun tamamını yemeyebilir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Enerji azalır, kalıcı madde derişimi artar ---------- */
const magnify: FigureDef = {
  caption:
    "İleri ile aynı besin yolunda iki niceliği karşılaştır. Enerji her geçişte 10'a bölünür (10 000 → 1000 → 100 kJ). Zor parçalanan kalıcı bir maddenin derişimi ise her basamakta 10 katına çıkar (0,02 → 0,2 → 2 mg/kg): biyolojik büyütme. Derişim toplam kütle değildir; onun için doku kütlesi de gerekir.",
  alt: "Üç sütun çifti: üretici, otçul, etçil. Mavi sütunlar enerji (soldan sağa küçülüyor), kırmızı sütunlar derişim (soldan sağa büyüyor), her birinin üstünde değeri.",
  steps: ["Enerji azalır", "Derişim artar"],
  draw: (_v, step) => {
    const els: El[] = [seg(v(-0.4, 0), v(10.2, 0), { tone: "ink" })];
    const names = ["üretici", "otçul", "etçil"];
    const en = [10000, 1000, 100];
    const co = [0.02, 0.2, 2];
    names.forEach((n, i) => {
      const x = i * 3.6;
      const he = 0.6 + Math.log10(en[i] / 10) * 0.7;
      const hc = 0.6 + Math.log10(co[i] / 0.002) * 0.7;
      els.push(poly([v(x, 0), v(x + 0.9, 0), v(x + 0.9, he), v(x, he)], { tone: "b", fill: step === 0 ? "b" : undefined, thin: step !== 0 }));
      els.push(txt(v(x + 0.45, he), `${fmt(en[i])} kJ`, "nw", { tone: step === 0 ? "b" : "muted", small: true, bold: step === 0 }));
      if (step === 1) els.push(poly([v(x + 1.5, 0), v(x + 2.4, 0), v(x + 2.4, hc), v(x + 1.5, hc)], { tone: "warn", fill: "warn" }), txt(v(x + 1.95, hc), `${fmt(co[i], 2)} mg/kg`, "ne", { tone: "warn", small: true, bold: true }));
      els.push(txt(v(x + 1.2, 0), n, "s", { tone: "ink", small: true, bold: true }));
    });
    els.push(txt(v(-0.6, 3.6), " ", "c"), txt(v(10.6, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Enerji her geçişte azalır: 10 000 → 1000 → 100 kJ.", "Sütun boyları logaritmik sıkıştırılmıştır; değerler kesindir."],
      ["Kalıcı madde derişimi her basamakta artar: 0,02 → 0,2 → 2 mg/kg.", "Biyobirikim bir canlıda zamanla birikmedir; biyolojik büyütme basamaklar boyunca derişim artışıdır. 2 mg/kg × 0,5 kg = 1 mg, 0,2 mg/kg × 10 kg = 2 mg."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 5. Besin ağında iki düzey ---------- */
const web: FigureDef = {
  caption:
    "İleri ile bir kuşun iki besin yolunu ayrı izle. Ok, enerjinin yenenden yiyene akış yönünü gösterir. Tohum → kuş yolunda kuş birincil tüketicidir (2. düzey); tohum → böcek → kuş yolunda ikincil tüketicidir (3. düzey). Hepçil ve karma beslenen canlılar ağda birden çok düzeyde bulunabilir.",
  alt: "Besin ağı: altta tohum, ortada böcek, üstte kuş; tohumdan kuşa doğrudan ok, tohumdan böceğe ve böcekten kuşa oklar. Adımlara göre bir yol vurgulanır.",
  steps: ["Ağ", "Tohum → kuş", "Tohum → böcek → kuş"],
  draw: (_v, step) => {
    const P: Record<string, V> = { tohum: v(0, 0), böcek: v(3.2, 2.0), kuş: v(0, 4.0) };
    const els: El[] = [];
    const arrow = (a: V, b: V, on: boolean) => {
      const d = [b[0] - a[0], b[1] - a[1]];
      const L = Math.hypot(d[0], d[1]);
      const u = [d[0] / L, d[1] / L];
      els.push(vec(v(a[0] + u[0] * 0.45, a[1] + u[1] * 0.45), v(b[0] - u[0] * 0.45, b[1] - u[1] * 0.45), { tone: on ? "warn" : "muted", bold: on, thin: !on }));
    };
    arrow(P.tohum, P.kuş, step !== 2);
    arrow(P.tohum, P.böcek, step !== 1);
    arrow(P.böcek, P.kuş, step !== 1);
    const tone: Record<string, Tone> = { tohum: "c", böcek: "a", kuş: "b" };
    for (const k of Object.keys(P)) {
      els.push(circle(P[k], 0.4, { tone: tone[k], fill: tone[k] }));
      const lvl = k === "tohum" ? "1. düzey" : k === "böcek" ? "2. düzey" : step === 1 ? "2. düzey" : step === 2 ? "3. düzey" : "2. ve 3. düzey";
      els.push(txt(k === "böcek" ? v(P[k][0] + 0.45, P[k][1]) : v(P[k][0], P[k][1] + (k === "kuş" ? 0.45 : -0.45)), `${k} · ${lvl}`, k === "kuş" ? "n" : k === "böcek" ? "e" : "s", { tone: "ink", small: true, bold: k === "kuş" && step > 0 }));
    }
    els.push(txt(v(-2.4, 5.2), " ", "c"), txt(v(6.4, -1.3), " ", "c"));
    const rows: [string, string][] = [
      ["Oklar enerjinin akış yönüdür: yenenden yiyene.", "Oku avcının baktığı yön sanma."],
      ["Tohum → kuş: kuş üreticiyle beslenir, birincil tüketicidir (2. düzey).", "Trofik düzey = tüketici sırası + 1."],
      ["Tohum → böcek → kuş: aynı kuş bu yolda ikincil tüketicidir (3. düzey).", "Düzey, canlının adına değil izlenen yola bağlıdır. 2024 TYT Fen 20'de doğrudan av yalnız oku doğrudan gelenlerdir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 6. Organizasyon birimleri ---------- */
const units: FigureDef = {
  caption:
    "İleri ile araştırılan birimi büyüt. Birey tek canlıdır. Popülasyon aynı türün aynı yer ve zamandaki bireyleridir. Komünite aynı yerdeki farklı türlerin popülasyonlarıdır (yalnız canlılar). Ekosistem komünite ile güneş ışığı, su, toprak, sıcaklık gibi cansız (abiyotik) çevreyi birlikte kapsar.",
  alt: "Yan yana dört panel: tek nokta; aynı renkte çok nokta; farklı renklerde noktalar; aynı noktalar ile güneş, su dalgası ve toprak şeridi.",
  steps: ["Birey", "Popülasyon", "Komünite", "Ekosistem"],
  draw: (_v, step) => {
    const els: El[] = [];
    const spots: V[] = [v(0.3, 0.6), v(0.9, 1.3), v(1.4, 0.5), v(0.5, 1.6), v(1.6, 1.4), v(1.0, 0.2), v(0.2, 1.1), v(1.3, 0.9)];
    const panels = ["birey", "popülasyon", "komünite", "ekosistem"];
    panels.forEach((name, i) => {
      const x0 = i * 2.8;
      const on = i <= step;
      els.push(poly([v(x0 - 0.3, -0.3), v(x0 + 2.1, -0.3), v(x0 + 2.1, 2.2), v(x0 - 0.3, 2.2)], { tone: on ? "ink" : "muted", thin: true, dash: !on }));
      const pts = i === 0 ? [v(0.9, 0.9)] : spots;
      pts.forEach((p, j) => {
        const tone: Tone = i >= 2 ? (["c", "b", "warn"] as Tone[])[j % 3] : "c";
        els.push(ball(v(x0 + p[0], p[1]), 0.13, on ? tone : "muted"));
      });
      if (i === 3) {
        els.push(circle(v(x0 + 1.75, 1.85), 0.18, { tone: on ? "a" : "muted", fill: on ? "a" : undefined }));
        const wave: V[] = Array.from({ length: 13 }, (_, j) => v(x0 - 0.2 + (j / 12) * 2.2, -0.12 + 0.06 * Math.sin(j * 1.3)));
        els.push(poly(wave, { tone: on ? "b" : "muted", open: true, smooth: true }));
      }
      els.push(txt(v(x0 + 0.9, -0.3), name, "s", { tone: on ? "ink" : "muted", small: true, bold: i === step }));
    });
    els.push(txt(v(-0.6, 2.8), " ", "c"), txt(v(10.8, -1.2), " ", "c"));
    const rows: [string, string][] = [
      ["Birey: tek bir canlı.", "Bir tek kurt bir popülasyon değildir."],
      ["Popülasyon: aynı tür, aynı yer, aynı zaman.", "Tür, yer ve zamanın üçü de denetlenir; farklı göllerdeki aynı tür iki ayrı popülasyondur."],
      ["Komünite: aynı yerdeki farklı türlerin popülasyonları (yalnız canlılar).", "Su, toprak, ışık komüniteye girmez."],
      ["Ekosistem: komünite + cansız çevre (ışık, su, toprak, sıcaklık).", "Habitat bir canlının adresidir; niş, onun ilişkileri ve gereksinimlerinin bütünüdür."],
    ];
    return { els, readout: rows[step] };
  },
};

export const biologyFiguresEcology: Record<string, Record<string, FigureDef>> = {
  "besin-piramidi": {
    "Yüzde on bir modeldir; verilen verimi kullan": energy,
    "Sayı piramidi ters olabilir": numbers,
    "Enerjinin sonraki düzeye geçmeyen bölümü nereye gider?": budget,
    "Bireyde birikme ile besin ağında büyütülme": magnify,
  },
  "besin-zinciri-agi": {
    "Aynı canlı farklı yollarda farklı düzeyde olabilir": web,
  },
  "ekoloji-giris": {
    "Önce araştırılan birimi seç": units,
  },
};
