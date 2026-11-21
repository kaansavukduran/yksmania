import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Coğrafya · Sıcaklık, basınç-rüzgâr, nem-yağış (Forge058). Sayılar
 * yalnız bölüm metnindekilerdir: 200 m'de 1 °C indirgeme (1.200 m, 12 °C →
 * 18 °C), 24 − (−3) = 27 °C, 1.020/1.010 ve 990/1.000 hPa, 20 hPa farkı
 * 100–200 km, kuru alçalmada 100 m'de 1 °C (tepede 5 °C, 1.000 m → 15 °C),
 * 10 g/m³ su ve 20 → 10 → 8 g/m³ doyma. Sürgüler aynı formülle hesaplar;
 * şemalar ölçekli değildir.
 */

const minus = (s: string) => s.replace("-", "−");
const cloud = (c: V, s = 1, tone: Tone = "muted"): El[] => [
  circle(v(c[0] - 0.35 * s, c[1]), 0.3 * s, { tone, fill: tone, thin: true }),
  circle(v(c[0], c[1] + 0.15 * s), 0.38 * s, { tone, fill: tone, thin: true }),
  circle(v(c[0] + 0.38 * s, c[1]), 0.3 * s, { tone, fill: tone, thin: true }),
];

/* ---------------- Sıcaklık ---------------- */

const rayAngle: FigureDef = {
  caption:
    "Aynı genişlikteki ışın demeti yatay yüzeye α açısıyla gelsin. Yüzeyde kapladığı genişlik 1 / sin α katına çıkar, birim alana düşen enerji sin α katına iner (dik geliş = 1). Sürgüyle açıyı değiştir. Bulut, albedo, nem ve taşınan hava da sonucu değiştirir; yalnız açı sıcaklığı belirlemez.",
  alt: "Soldan yukarıdan gelen paralel iki çizgiyle sınırlı ışın demeti yatay zemine çarpıyor; zeminde kapladığı genişlik kalın turuncu çizgiyle gösteriliyor. Açı küçüldükçe iz uzuyor.",
  param: { label: "Geliş açısı α", min: 15, max: 90, step: 5, init: 60, unit: "°", plain: true },
  draw: (a) => {
    const r = (a * Math.PI) / 180;
    const w = 1.2;
    const foot = w / Math.sin(r);
    const d = v(Math.cos(r), -Math.sin(r));
    const x0 = 0;
    const x1 = foot;
    const L = 3.4;
    const els: El[] = [seg(v(-1.5, 0), v(6.4, 0), { thin: true })];
    const s0 = v(x0 - d[0] * L, -d[1] * L);
    const s1 = v(x1 - d[0] * L, -d[1] * L);
    els.push(poly([s0, s1, v(x1, 0), v(x0, 0)], { tone: "warn", fill: "warn", bare: true }));
    els.push(vec(s0, v(x0, 0), { tone: "warn" }), vec(s1, v(x1, 0), { tone: "warn" }));
    els.push(seg(v(x0, 0), v(x1, 0), { tone: "a", bold: true }));
    els.push(txt(v((x0 + x1) / 2, -0.35), `iz = ${fmt(1 / Math.sin(r), 2)} × demet`, "s", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(x1 + 0.25, 0.3), `α = ${a}°`, "e", { small: true, bold: true }));
    els.push(txt(v(-1.6, 3.8), " ", "c"), txt(v(6.6, -1.2), " ", "c"));
    return {
      els,
      readout: [
        `α = ${a}°: iz genişliği 1 / sin ${a}° = ${fmt(1 / Math.sin(r), 2)} kat; birim alana düşen enerji sin ${a}° = ${fmt(Math.sin(r), 2)} kat (dik geliş 1).`,
        "Enlem, günün saati, eksen eğikliği ve eğim-bakı geliş açısını etkiler. Kutupta gündüzün uzun olması alçak Güneş açısını ortadan kaldırmaz.",
      ],
    };
  },
};

const aspect: FigureDef = {
  caption:
    "Bakı: dönence dışındaki bir yerde öğle Güneşi ekvator yönündedir. Kuzey Yarım Küre'de (Yengeç Dönencesi'nin kuzeyinde) güneye, Güney Yarım Küre'de (Oğlak Dönencesi'nin güneyinde) kuzeye bakan yamaç ışını daha dik alır. Dönenceler arasında ilişki yıl içinde değişebilir. Şema ölçekli değildir.",
  alt: "Kuzey–güney doğrultulu tepe kesiti; ışınlar ekvator tarafından eğik geliyor. Ekvatora bakan yamaç ışınlara daha dik duruyor ve vurgulanıyor.",
  steps: ["Kuzey Yarım Küre", "Güney Yarım Küre"],
  draw: (_v, step) => {
    const nh = step === 0;
    const sunSide = nh ? 1 : -1;
    const els: El[] = [];
    const top = v(0, 1.8);
    const L = v(-2.4, 0);
    const R = v(2.4, 0);
    els.push(seg(v(-3.6, 0), v(3.6, 0), { thin: true }));
    const sunny = sunSide > 0 ? [top, R] : [L, top];
    const shade = sunSide > 0 ? [L, top] : [top, R];
    els.push(poly([L, top, R], { tone: "muted", fill: "muted", thin: true }));
    els.push(seg(sunny[0], sunny[1], { tone: "warn", bold: true }), seg(shade[0], shade[1], { tone: "b", bold: true }));
    for (let k = 0; k < 3; k++) {
      const end = sunSide > 0 ? v(0.6 + k * 0.6, 1.8 - (0.6 + k * 0.6) * 0.75) : v(-0.6 - k * 0.6, 1.8 - (0.6 + k * 0.6) * 0.75);
      els.push(vec(v(end[0] + sunSide * 1.9, end[1] + 1.5), end, { tone: "warn", thin: true }));
    }
    els.push(txt(v(-3.6, -0.35), "kuzey", "s", { small: true, tone: "muted" }), txt(v(3.6, -0.35), "güney", "s", { small: true, tone: "muted" }));
    els.push(txt(v(sunSide * 1.7, -1.05), nh ? "güneye bakan" : "kuzeye bakan", "c", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(-sunSide * 1.7, -1.05), "gölgeli yamaç", "c", { small: true, tone: "b" }));
    els.push(txt(v(sunSide * 3.3, 3.5), "öğle Güneşi", "c", { small: true, tone: "warn" }));
    els.push(txt(v(-4.6, 4), " ", "c"), txt(v(4.6, -1.5), " ", "c"));
    return {
      els,
      readout: [
        nh ? "Kuzey Yarım Küre, dönence dışı: güneye bakan yamaç daha dik ışın ve genellikle daha uzun güneşlenme alır." : "Güney Yarım Küre, dönence dışı: kuzeye bakan yamaç öne çıkar.",
        "Yalnız 'güney' sözcüğünü görüp bütün Dünya için sıcak yamaç seçme; yarımküre, enlem kuşağı, mevsim ve bulutluluğu kontrol et.",
      ],
    };
  },
};

const landSea: FigureDef = {
  caption:
    "Kara daha hızlı ısınıp soğur, deniz sıcaklık değişimini daha yavaş gösterir: kıyıda günlük ve yıllık fark iç kesime göre küçük kalma eğilimindedir. Eğriler nitel şemadır (sayı yok). İkinci adımda bölümdeki fark hesabı: en yüksek 24 °C, en düşük −3 °C ise fark 24 − (−3) = 27 °C.",
  alt: "İki sıcaklık eğrisi: iç kesim eğrisi geniş salınımlı, kıyı eğrisi dar salınımlı. İkinci adımda −3 ile 24 arasındaki sayı doğrusu ve 27 birimlik açıklık.",
  steps: ["Kıyı ve iç kesim", "Fark hesabı"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      const curve = (amp: number) => Array.from({ length: 25 }, (_, i) => v(i * 0.4, 2 + amp * Math.sin(((i - 6) / 24) * 2 * Math.PI)));
      els.push(seg(v(0, 0), v(9.6, 0), { thin: true }), seg(v(0, 0), v(0, 4), { thin: true }));
      els.push(poly(curve(1.6), { open: true, smooth: true, tone: "warn", bold: true }), poly(curve(0.6), { open: true, smooth: true, tone: "b", bold: true }));
      els.push(txt(v(9.75, 0.4), "iç kesim", "e", { small: true, bold: true, tone: "warn" }), txt(v(9.75, 1.45), "kıyı", "e", { small: true, bold: true, tone: "b" }));
      els.push(txt(v(-0.15, 3.9), "sıcaklık", "w", { small: true, tone: "muted" }), txt(v(9.6, -0.35), "zaman (gün ya da yıl)", "sw", { small: true, tone: "muted" }));
      els.push(txt(v(-2.4, -1), " ", "c"), txt(v(12.2, 4.4), " ", "c"));
      return { els, readout: ["Akıntı, rüzgâr, bulut ve yükselti de önemlidir: her kıyı ile her iç nokta için tek etkenli kesin yasa değildir.", "Denizden gelen hava yazın serinletici, kışın ılıtıcı olabilir."] };
    }
    const X = (c: number) => c * 0.3;
    els.push(seg(v(X(-6), 0), v(X(28), 0), { thin: true }));
    els.push(seg(v(X(0), -0.1), v(X(0), 0.1), { thin: true, tone: "muted" }));
    for (const c of [-3, 24]) els.push(seg(v(X(c), -0.15), v(X(c), 0.15), { bold: true }), txt(v(X(c), -0.4), `${minus(String(c))} °C`, "s", { small: true, bold: true }));
    els.push(seg(v(X(-3), 0.6), v(X(24), 0.6), { tone: "a", bold: true }), seg(v(X(-3), 0.45), v(X(-3), 0.75), { tone: "a" }), seg(v(X(24), 0.45), v(X(24), 0.75), { tone: "a" }));
    els.push(txt(v(X(10.5), 0.95), "fark 27 °C", "n", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(X(-7), -1.3), " ", "c"), txt(v(X(29), 1.6), " ", "c"));
    return { els, readout: ["Fark = en yüksek − en düşük = 24 − (−3) = 27 °C. Negatif değerde çıkarma işaretine dikkat.", "Tek bir günün ya da ayın sıcaklığı bütün yılın farkını vermez."] };
  },
};

const reduce: FigureDef = {
  caption:
    "Soruda 200 m'de 1 °C azalma yaklaşımı verildiğinde deniz seviyesine indirgenmiş sıcaklık T₀ = T(ölçülen) + h / 200. Ölçülen sıcaklık 12 °C sabit; istasyonun yükseltisini sürgüyle değiştir. Bulunan değer ölçülmüş deniz seviyesi sıcaklığı değil, yükselti etkisini kaldıran karşılaştırma değeridir.",
  alt: "Dağ kesiti; yamaçta yükseltisi değişen istasyon noktası, deniz seviyesine inen kesikli ok ve hesaplanan indirgenmiş sıcaklık.",
  param: { label: "İstasyon yükseltisi h", min: 0, max: 3000, step: 100, init: 1200, unit: " m", plain: true },
  draw: (h) => {
    const Y = (m: number) => m / 700;
    const els: El[] = [];
    els.push(poly([v(-1, 0), v(3, Y(3200)), v(6.5, 0)], { tone: "muted", fill: "muted", thin: true }));
    els.push(seg(v(-2.4, 0), v(7.2, 0), { tone: "b", bold: true }), txt(v(-2.4, -0.3), "deniz seviyesi", "se", { small: true, tone: "b" }));
    const x = -1 + (h / 3200) * 4;
    const p = v(x, Y(h));
    els.push(circle(p, 0.12, { tone: "a", fill: "a", bold: true }), txt(v(x - 0.25, Y(h)), `${fmt(h, 0)} m · 12 °C`, "w", { small: true, bold: true, tone: "a" }));
    if (h > 0) els.push(vec(v(x, Y(h) - 0.18), v(x, 0.05), { tone: "warn", dash: true }));
    const t0 = 12 + h / 200;
    els.push(txt(v(x + 0.25, Math.max(0.35, Y(h) / 2)), `T₀ = ${fmt(t0, 1)} °C`, "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(-4.6, Y(3300)), " ", "c"), txt(v(7.4, -0.9), " ", "c"));
    return {
      els,
      readout: [
        `T₀ = 12 + ${fmt(h, 0)} / 200 = 12 + ${fmt(h / 200, 1)} = ${fmt(t0, 1)} °C.`,
        "Gerçek oran koşullara göre değişir; inversiyon varsa aynı sabit oranla karşılaştırma desteklenmez.",
      ],
    };
  },
};

const isotherm: FigureDef = {
  caption:
    "Güney Yarım Küre'de ekvator kuzeydedir; arka plan sıcaklığı ekvatora doğru artıyorsa soğuk kıyı akıntısı üzerinde aynı izotermin değerine ulaşmak için ekvatora yaklaşmak gerekir: eğri ekvatora doğru bükülür. Sıcak akıntıda tersi, kutba doğru sapma beklenebilir. Peru akıntısı örnek bağlamdır; şema ölçekli değildir ve her bükülme tek başına akıntı kanıtı değildir.",
  alt: "Solda okyanus, sağda kıta; yukarıda ekvator yönü. Kara üzerinde yatay giden izoterm, kıyıya yakın okyanusta soğuk akıntıda yukarı (ekvatora), sıcak akıntıda aşağı (kutba) bükülüyor.",
  steps: ["Soğuk akıntı", "Sıcak akıntı"],
  draw: (_v, step) => {
    const cold = step === 0;
    const els: El[] = [];
    els.push(poly([v(0, 0), v(4, 0), v(4, 4), v(0, 4)], { tone: "b", fill: "b", bare: true }));
    els.push(poly([v(4, 0), v(8, 0), v(8, 4), v(4, 4)], { tone: "muted", fill: "muted", bare: true }));
    els.push(seg(v(4, 0), v(4, 4), { bold: true }));
    els.push(txt(v(1.0, 0.4), "okyanus", "c", { small: true, tone: "b" }), txt(v(6.6, 0.4), "kıta", "c", { small: true, tone: "muted" }));
    const k = cold ? 1 : -1;
    const iso = Array.from({ length: 17 }, (_, i) => {
      const x = i * 0.5;
      const bump = Math.exp(-((x - 3.2) ** 2) / 0.9);
      return v(x, 2 + k * 1.2 * bump);
    });
    els.push(poly(iso, { open: true, smooth: true, tone: "warn", bold: true }), txt(v(7.9, 2.25), "izoterm", "nw", { small: true, bold: true, tone: "warn" }));
    const ax = 3.2;
    els.push(vec(v(ax, cold ? 3.7 : 0.9), v(ax, cold ? 0.9 : 3.7), { tone: cold ? "b" : "a", bold: true }));
    els.push(txt(v(ax - 0.25, cold ? 3.5 : 1.1), cold ? "soğuk akıntı" : "sıcak akıntı", "w", { small: true, bold: true, tone: cold ? "b" : "a" }));
    els.push(vec(v(8.6, 2.6), v(8.6, 3.9), { tone: "ink" }), txt(v(8.8, 3.6), "ekvator", "e", { small: true }));
    els.push(vec(v(8.6, 1.4), v(8.6, 0.1), { tone: "muted" }), txt(v(8.8, 0.4), "kutup", "e", { small: true, tone: "muted" }));
    els.push(txt(v(-0.3, 4.3), " ", "c"), txt(v(10.6, -0.3), " ", "c"));
    return {
      els,
      readout: [
        cold ? "Soğuk akıntı kıyıyı soğutur: aynı sıcaklık değeri ekvatora daha yakın bir enlemde bulunur, izoterm ekvatora doğru bükülür." : "Sıcak akıntı kıyıyı ılıtır: aynı değer kutba daha yakın bir enlemde bulunur, izoterm kutba doğru bükülür.",
        "İndirgenmiş haritada yükselti etkisi kaldırılsa da enlem, denizellik ve akıntı etkileri kalır.",
      ],
    };
  },
};

const inversion: FigureDef = {
  caption:
    "Sıcaklık–yükseklik profili. Troposferde sıcaklık genel olarak yukarı doğru azalır; inversiyonda belirli bir tabakada yukarı doğru artar. Yüzeyin soğuduğu koşullarda soğuk hava aşağıda birikir ve kirleticilerin dağılması zorlaşabilir. Eksenlerde sayı yok; nitel şema.",
  alt: "Yatay eksen sıcaklık, düşey eksen yükseklik. Normal adımda çizgi yukarı doğru sola (soğuğa) gidiyor; inversiyon adımında alt tabakada sağa (sıcağa) gidip sonra yeniden sola dönüyor.",
  steps: ["Genel azalma", "İnversiyon"],
  draw: (_v, step) => {
    const els: El[] = [seg(v(0, 0), v(6, 0), { thin: true }), seg(v(0, 0), v(0, 5), { thin: true })];
    els.push(txt(v(6, -0.35), "sıcaklık →", "sw", { small: true, tone: "muted" }), txt(v(-0.15, 4.9), "yükseklik", "w", { small: true, tone: "muted" }));
    if (step === 0) {
      els.push(poly([v(4.6, 0), v(1.2, 4.8)], { open: true, tone: "warn", bold: true }));
      els.push(txt(v(3.2, 2.6), "yukarı doğru soğuma", "e", { small: true, tone: "warn" }));
    } else {
      els.push(poly([v(2.6, 0), v(4.4, 1.6), v(1.6, 4.8)], { open: true, tone: "warn", bold: true }));
      els.push(poly([v(0, 0), v(6, 0), v(6, 1.6), v(0, 1.6)], { tone: "b", fill: "b", bare: true }));
      els.push(txt(v(0.3, 0.75), "inversiyon tabakası", "e", { small: true, bold: true, tone: "b" }), txt(v(4.0, 3.2), "üstte yine azalma", "e", { small: true, tone: "warn" }));
    }
    els.push(txt(v(-2.6, -1), " ", "c"), txt(v(7.6, 5.3), " ", "c"));
    return {
      els,
      readout:
        step === 0
          ? ["Genel kural: troposferde yükseldikçe sıcaklık azalır; gerçek oran koşullara göre değişir."]
          : ["İnversiyon tabakasında sıcaklık yukarı doğru artar; soğuk ve yoğun hava aşağıda kalır.", "Bu koşulda sabit oranla indirgeme yapılmaz: model varsayımı yetersiz kalır."],
    };
  },
};

/* ---------------- Basınç ve rüzgâr ---------------- */

const relative: FigureDef = {
  caption:
    "Yüksek ve alçak basınç çevresine göre adlandırılır. Çevresi 1.020 hPa iken 1.010 hPa'lık merkez göreli alçaktır; çevresi 990 hPa iken 1.000 hPa'lık merkez göreli yüksektir, standart referans 1.013 hPa'dan düşük olsa bile. Oklar yüzeye yakın ideal akışı gösterir: alçakta yakınsama ve yükselme, yüksekte ayrılma ve alçalma.",
  alt: "Ortada merkez değeri, dört yanda çevre değerleri. Birinci adımda oklar merkeze doğru (göreli alçak), ikinci adımda merkezden dışa (göreli yüksek).",
  steps: ["Merkez 1.010, çevre 1.020", "Merkez 1.000, çevre 990"],
  draw: (_v, step) => {
    const low = step === 0;
    const c = low ? "1.010" : "1.000";
    const ring = low ? "1.020" : "990";
    const els: El[] = [circle(v(0, 0), 0.75, { tone: low ? "b" : "warn", fill: low ? "b" : "warn", bold: true })];
    els.push(txt(v(0, 0.12), c, "c", { small: true, bold: true }), txt(v(0, -0.3), low ? "A" : "Y", "c", { small: true, bold: true, tone: low ? "b" : "warn" }));
    const dirs: V[] = [v(0, 1), v(1, 0), v(0, -1), v(-1, 0)];
    for (const d of dirs) {
      const far = v(d[0] * 3.1, d[1] * 2.6);
      const near = v(d[0] * 1.05, d[1] * 1.05);
      const outer = v(d[0] * 2.3, d[1] * 1.95);
      els.push(low ? vec(outer, near, { tone: "b", bold: true }) : vec(near, outer, { tone: "warn", bold: true }));
      els.push(txt(far, ring, "c", { small: true, tone: "muted" }));
    }
    els.push(txt(v(-4.4, 3.2), " ", "c"), txt(v(4.4, -3.2), " ", "c"));
    return {
      els,
      readout: low
        ? ["1.010 < 1.020: merkez çevresinden alçak → göreli alçak basınç; yüzeyde yakınsama ve yükselme.", "Yükselme bulutlanmayı destekleyebilir, fakat her alçak merkezde kesin yağış garantisi yoktur."]
        : ["1.000 > 990: merkez çevresinden yüksek → göreli yüksek basınç; yüzeyde ayrılma ve alçalma.", "1.013 hPa referansı tek başına merkezin adına karar vermez."],
    };
  },
};

const gradient: FigureDef = {
  caption:
    "Yatay basınç gradyanı = basınç farkı ÷ uzaklık. 1.020 ile 1.000 hPa arasındaki 20 hPa fark sabit; uzaklığı sürgüyle değiştir. Aradaki izobarlar 5 hPa adımla çizildi: aynı fark kısa mesafede izobarları sıklaştırır. İki basınç ve mesafeden gerçek rüzgâr hızı (m/s) bulunmaz.",
  alt: "Solda 1.020, sağda 1.000 hPa noktası; aralarında eşit aralıklı dört izobar (1.015, 1.010, 1.005). Uzaklık kısaldıkça çizgiler sıklaşıyor.",
  param: { label: "Uzaklık", min: 50, max: 400, step: 10, init: 100, unit: " km", plain: true },
  draw: (d) => {
    const K = 0.022;
    const w = d * K;
    const x0 = -w / 2;
    const els: El[] = [];
    for (let i = 0; i <= 4; i++) {
      const x = x0 + (w * i) / 4;
      const p = 1020 - i * 5;
      els.push(poly(Array.from({ length: 7 }, (_, k) => v(x + 0.12 * Math.sin(k * 0.9), -1.4 + k * 0.47)), { open: true, smooth: true, tone: i === 0 || i === 4 ? "ink" : "muted", thin: i !== 0 && i !== 4 }));
      if (i === 0 || i === 4) els.push(txt(v(x + (i === 0 ? -0.1 : 0.1), 1.75), p === 1020 ? "1.020" : "1.000", i === 0 ? "w" : "e", { small: true, bold: true }));
    }
    els.push(vec(v(x0 + 0.1, -1.9), v(x0 + w - 0.1, -1.9), { tone: "a" }), txt(v(0, -2.2), `${fmt(d, 0)} km`, "s", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-5, 2.9), " ", "c"), txt(v(5, -2.9), " ", "c"));
    return {
      els,
      readout: [`Gradyan = 20 hPa ÷ ${fmt(d, 0)} km = ${fmt(20 / d, 3)} hPa/km.${d === 100 ? " (100 km'de 0,2 hPa/km)" : d === 200 ? " (200 km'de 0,1 hPa/km)" : ""}`, "Çizgi sıklığını karşılaştırırken haritaların ölçeği ve izobar adımı aynı olmalıdır."],
    };
  },
};

const coriolis: FigureDef = {
  caption:
    "Dünya'nın dönmesi hareketli havanın izlediği yönü etkiler: Kuzey Yarım Küre'de hareket yönünün sağına, Güney Yarım Küre'de soluna sapma. Sağ–sol ekrana göre değil, havanın hareket yönüne göredir. Kesikli çizgi sapma olmasaydı izlenecek yön; eğri, gerçek yörünge hesabı değildir.",
  alt: "Aynı başlangıç noktasından kesikli düz ok ve kalın eğri ok. Kuzey adımında eğri hareket yönünün sağına, güney adımında soluna kıvrılıyor.",
  steps: ["Kuzey Yarım Küre", "Güney Yarım Küre"],
  draw: (_v, step) => {
    const s = step === 0 ? -1 : 1;
    const start = v(0, -2);
    const els: El[] = [vec(start, v(0, 2), { tone: "muted", dash: true })];
    const pts = Array.from({ length: 9 }, (_, i) => {
      const t = i / 8;
      return v(-s * 1.6 * t * t, -2 + 3.6 * t);
    });
    els.push(poly(pts.slice(0, -1), { open: true, smooth: true, tone: "a", bold: true }), vec(pts[7], pts[8], { tone: "a", bold: true }));
    els.push(circle(start, 0.1, { tone: "ink", fill: "ink" }));
    els.push(txt(v(0.2, 1.8), "sapmasız yön", s < 0 ? "w" : "e", { small: true, tone: "muted" }));
    els.push(txt(v(-s * 1.75, 1.2), step === 0 ? "sağa sapma" : "sola sapma", s < 0 ? "w" : "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-3.6, 2.6), " ", "c"), txt(v(3.6, -2.4), " ", "c"));
    return { els, readout: [step === 0 ? "Kuzey: hava hareket yönünün sağına sapar." : "Güney: hava hareket yönünün soluna sapar.", "Ekvator'da etki zayıflar. Coriolis havayı sürtünmeyle yavaşlatmaz; sürtünme zeminle etkileşimden gelir."] };
  },
};

const belts: FigureDef = {
  caption:
    "İdeal genel dolaşım: Ekvator çevresinde termik alçak (TA), 30° çevresinde dinamik yüksek (DY), 60° çevresinde dinamik alçak (DA), kutuplarda termik yüksek (TY). Alizeler 30°'den Ekvator'a, batı rüzgârları 30°'den 60°'ye, kutup rüzgârları kutuptan 60°'ye eser; oklar sapmayla eğik çizildi. Gerçek dağılış mevsim ve kara-deniz ile değişir; şema ölçekli değildir.",
  alt: "Düşey şerit: yukarıdan aşağı 90° K, 60° K, 30° K, 0°, 30° G, 60° G, 90° G enlemleri; her enlemde basınç kuşağı kısaltması; aralarında eğik rüzgâr okları ve adları.",
  maxHeight: 560,
  draw: () => {
    const L = [90, 60, 30, 0, -30, -60, -90];
    const Y = (l: number) => l / 30;
    const els: El[] = [];
    const code: Record<number, [string, Tone]> = { 90: ["TY", "warn"], 60: ["DA", "b"], 30: ["DY", "warn"], 0: ["TA", "b"] };
    for (const l of L) {
      els.push(seg(v(0, Y(l)), v(4, Y(l)), { thin: true, dash: l !== 0, tone: l === 0 ? "ink" : "muted" }));
      els.push(txt(v(-0.15, Y(l)), l === 0 ? "0°" : `${Math.abs(l)}° ${l > 0 ? "K" : "G"}`, "w", { small: true, tone: "muted" }));
      const [c, tone] = code[Math.abs(l)];
      els.push(txt(v(4.2, Y(l)), c, "e", { small: true, bold: true, tone }));
    }
    const wind = (from: number, to: number, east: boolean, name: string) => {
      const y0 = Y(from) + (to > from ? 0.25 : -0.25);
      const y1 = Y(to) + (to > from ? -0.25 : 0.25);
      const x0 = east ? 0.9 : 3.1;
      const x1 = east ? 3.1 : 0.9;
      els.push(vec(v(x0, y0), v(x1, y1), { tone: "a" }));
      if (name) els.push(txt(v(5.4, (Y(from) + Y(to)) / 2), name, "e", { small: true, tone: "a" }));
    };
    // Kuzey: kutup rüzgârı ve alize doğudan (batıya doğru ok), batı rüzgârı batıdan.
    wind(90, 60, false, "kutup rüzgârı");
    wind(30, 60, true, "batı rüzgârı");
    wind(30, 0, false, "alize");
    wind(-90, -60, false, "kutup rüzgârı");
    wind(-30, -60, true, "batı rüzgârı");
    wind(-30, 0, false, "alize");
    els.push(txt(v(-2.2, 3.4), " ", "c"), txt(v(8.8, -3.4), " ", "c"));
    return { els, readout: ["TA: termik alçak, DY: dinamik yüksek, DA: dinamik alçak, TY: termik yüksek.", "Bu kuşaklar gün içinde yön değiştiren kıyı meltemiyle aynı zaman ve alan ölçeğinde değildir."] };
  },
};

const BREEZE = [
  { name: "Gündüz · deniz meltemi", warm: "land", note: "Gündüz kara daha çabuk ısınır, göreli alçak olur: yüzeyde akış denizden karaya." },
  { name: "Gece · kara meltemi", warm: "sea", note: "Gece kara daha çabuk soğur: yüzeyde akış karadan denize." },
  { name: "Gündüz · vadi meltemi", warm: "slope", note: "Gündüz ısınan yamaç boyunca vadiden yukarı akış: vadi meltemi." },
  { name: "Gece · dağ meltemi", warm: "valley", note: "Gece soğuyan yamaçtan vadiye aşağı akış: dağ meltemi." },
] as const;
const breeze: FigureDef = {
  caption:
    "Meltemler yerel ve günlük döngüdedir; musonlar ise mevsimlik ve geniş ölçekli dolaşımdır. Adımlarda kıyı ve yamaç meltemlerinin gündüz–gece yönünü izle. Kalın ok yüzey akışı, kesikli ok üstteki dönüş akışıdır. Büyük ölçekli rüzgâr bu yerel örüntüyü bastırabilir; şema ölçekli değildir.",
  alt: "Adım 1–2: solda deniz, sağda kara; yüzey oku gündüz karaya, gece denize. Adım 3–4: vadi ve yamaç kesiti; ok gündüz yamaç yukarı, gece aşağı.",
  steps: BREEZE.map((b) => b.name),
  draw: (_v, step) => {
    const b = BREEZE[step];
    const els: El[] = [];
    if (step < 2) {
      els.push(poly([v(-4, 0), v(0, 0), v(0, -0.6), v(-4, -0.6)], { tone: "b", fill: "b", bare: true }), poly([v(0, 0), v(4, 0.3), v(4, -0.6), v(0, -0.6)], { tone: "muted", fill: "muted", bare: true }));
      els.push(seg(v(-4, 0), v(0, 0), { tone: "b" }), seg(v(0, 0), v(4, 0.3), { tone: "ink" }));
      els.push(txt(v(-2, -0.3), "deniz", "c", { small: true, tone: "b" }), txt(v(2, -0.2), "kara", "c", { small: true }));
      const toLand = b.warm === "land";
      els.push(vec(v(toLand ? -2.6 : 2.6, 0.55), v(toLand ? 2.6 : -2.6, 0.55), { tone: "a", bold: true }));
      els.push(vec(v(toLand ? 2.6 : -2.6, 2.2), v(toLand ? -2.6 : 2.6, 2.2), { tone: "muted", dash: true }));
      els.push(txt(v(toLand ? 2.4 : -2.4, 1.4), "göreli alçak", "c", { small: true, bold: true, tone: "warn" }));
    } else {
      els.push(poly([v(-4, 2.6), v(-0.6, 0), v(0.6, 0), v(4, 2.6), v(4, -0.4), v(-4, -0.4)], { tone: "muted", fill: "muted", thin: true }));
      const up = b.warm === "slope";
      els.push(up ? vec(v(1.1, 0.75), v(3.3, 2.45), { tone: "a", bold: true }) : vec(v(3.3, 2.45), v(1.1, 0.75), { tone: "b", bold: true }));
      els.push(txt(v(0, -0.15), "vadi tabanı", "n", { small: true, tone: "muted" }));
      els.push(txt(v(1.9, 2.3), up ? "ısınan yamaç" : "soğuyan yamaç", "e", { small: true, bold: true, tone: up ? "a" : "b" }));
    }
    els.push(txt(v(-4.6, 3.2), " ", "c"), txt(v(4.6, -0.9), " ", "c"));
    return { els, readout: [b.note, "Bayrağın uzandığı yön, havanın geldiği yönün tersidir; rüzgâr geldiği yönle adlandırılır."] };
  },
};

const foehn: FigureDef = {
  caption:
    "Föhn: dağı aşan hava rüzgâraltı yamaçta alçalırken daha yüksek basınç ortamına girip sıkışır ve adiyabatik olarak ısınır. Bölümün kuru alçalma yaklaşımı 100 m'de 1 °C: tepede 5 °C hava 1.000 m alçalırsa 15 °C olur. Sürgüyle alçalma miktarını değiştir. Bu sayı bütün gerçek föhn olaylarının değişmez sonucu değildir.",
  alt: "Dağ kesiti; tepeden rüzgâraltı yamaç boyunca aşağı inen hava parseli; parselin yanında sıcaklık değeri büyüyor.",
  param: { label: "Alçalma", min: 0, max: 1000, step: 100, init: 1000, unit: " m", plain: true },
  draw: (d) => {
    const top = v(0, 3);
    const foot = v(4, 0);
    const els: El[] = [poly([v(-4, 0), top, foot], { tone: "muted", fill: "muted", thin: true })];
    els.push(vec(v(-3.8, 0.6), v(-0.6, 3.1), { tone: "b", thin: true }), txt(v(-2.6, 2.0), "rüzgârüstü", "w", { small: true, tone: "b" }));
    const t = d / 1000;
    const p = v(top[0] + (foot[0] - top[0]) * t + 0.35, top[1] + (foot[1] - top[1]) * t + 0.3);
    els.push(circle(p, 0.2, { tone: "warn", fill: "warn", bold: true }));
    if (d > 0) els.push(poly([v(0.35, 3.3), p], { open: true, tone: "warn", dash: true }));
    const T = 5 + d / 100;
    els.push(txt(v(p[0] + 0.35, p[1] + 0.1), `${fmt(T, 0)} °C`, "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(0, 3.45), "tepe 5 °C", "n", { small: true, bold: true }));
    els.push(txt(v(4.2, -0.3), "rüzgâraltı", "sw", { small: true, tone: "warn" }));
    els.push(txt(v(-4.4, 4.2), " ", "c"), txt(v(6.6, -0.9), " ", "c"));
    return { els, readout: [`T = 5 + ${fmt(d, 0)} / 100 = ${fmt(T, 0)} °C (kuru alçalma kabulüyle).`, "Ana mekanizma sıkışmadır; yamaçla sürtünüp ısınmak değildir. Önceki yükselmede nem kaybı sıcak-kuru etkiyi güçlendirebilir."] };
  },
};

/* ---------------- Nem ve yağış ---------------- */

const saturation: FigureDef = {
  caption:
    "Sabit hacimli kapalı model, toplam su 10 g/m³. Sürgüyle doyma miktarını düşür (soğuma): 20'de hepsi buhar ve bağıl nem %50; 10'da %100; 8'de denge modelinde 8 buhar + 2 yoğuşmuş su. Doyma miktarı sıcaklığın kendisi değildir. Yoğuşan suyu ayırdıktan sonra bağıl nem %100'ü aşmaz.",
  alt: "Dikey kap: kesikli doyma çizgisi, mavi buhar sütunu, altta yoğuşmuş su katmanı. Doyma çizgisi 10'un altına inince fazlası yoğuşuyor.",
  param: { label: "Doyma miktarı", min: 6, max: 24, step: 1, init: 20, unit: " g/m³", plain: true },
  draw: (sat) => {
    const total = 10;
    const vap = Math.min(total, sat);
    const liq = total - vap;
    const rh = (vap / sat) * 100;
    const K = 0.18;
    const els: El[] = [];
    els.push(seg(v(0, 26 * K), v(0, 0), { thin: true }), seg(v(2.4, 26 * K), v(2.4, 0), { thin: true }), seg(v(0, 0), v(2.4, 0), { thin: true }));
    if (liq > 0) els.push(poly([v(0, 0), v(2.4, 0), v(2.4, liq * K), v(0, liq * K)], { tone: "c", fill: "c", bare: true }));
    els.push(poly([v(0.5, liq * K), v(1.9, liq * K), v(1.9, (liq + vap) * K), v(0.5, (liq + vap) * K)], { tone: "b", fill: "b", thin: true }));
    els.push(seg(v(-0.3, sat * K), v(2.7, sat * K), { tone: "warn", dash: true }), txt(v(2.85, sat * K), `doyma ${sat}`, "e", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(-0.2, (liq + vap / 2) * K), `buhar ${fmt(vap, 0)}`, "w", { small: true, bold: true, tone: "b" }));
    if (liq > 0) els.push(txt(v(2.85, Math.max(0.15, (liq * K) / 2) - 0.25), `yoğuşan ${fmt(liq, 0)}`, "e", { small: true, bold: true, tone: "c" }));
    els.push(txt(v(-2.6, 26 * K + 0.3), " ", "c"), txt(v(5.4, -0.6), " ", "c"));
    return {
      els,
      readout: [
        `Buhar ${fmt(vap, 0)} g/m³, yoğuşmuş su ${fmt(liq, 0)} g/m³; bağıl nem = ${fmt(vap, 0)} ÷ ${sat} × 100 = %${fmt(rh, 1)}.`,
        "Toplam su korunur: doyma eşiğini yükseltmek damlaların bir bölümünü yeniden buharlaştırır, yeni su eklemez.",
      ],
    };
  },
};

const LIFT = [
  { name: "Orografik (yamaç)", note: "Hava dağ yamacı boyunca yükselmeye zorlanır; rüzgâraltında alçalan hava ısınır, bağıl nem düşer." },
  { name: "Konveksiyonel", note: "Isınan yüzeyin üstündeki hava yükselir; genleşip soğuyan hava doygunluğa yaklaşabilir." },
  { name: "Cephe", note: "Farklı hava kütleleri karşılaşınca sıcak hava soğuk havanın üstüne çıkmaya zorlanır." },
];
const lifting: FigureDef = {
  caption:
    "Üç yükselme nedeni, tek ortak basamak: yükselen hava genleşir ve soğur, doygunluğa yaklaşır. Her yükselmede kesin yağış yoktur; yeterli su buharı, doygunluk ve damla/kristal gelişimi gerekir. Şemalar ölçekli değildir.",
  alt: "Adım 1: rüzgârüstü yamaçta yükselen ok ve bulut. Adım 2: ısınan zeminden dikey yükselen ok ve bulut. Adım 3: soğuk hava kaması üzerinde yükselen sıcak hava oku ve bulut.",
  steps: LIFT.map((l) => l.name),
  draw: (_v, step) => {
    const els: El[] = [seg(v(-4, 0), v(4, 0), { thin: true })];
    if (step === 0) {
      els.push(poly([v(-1.5, 0), v(1, 2.6), v(3.5, 0)], { tone: "muted", fill: "muted", thin: true }));
      els.push(vec(v(-3.8, 0.4), v(-0.6, 0.4), { tone: "b", bold: true }), vec(v(-0.6, 0.7), v(0.5, 2.6), { tone: "b", bold: true }));
      els.push(...cloud(v(0.2, 3.4)));
      els.push(txt(v(-3.8, 0.75), "nemli hava", "e", { small: true, tone: "b" }));
    } else if (step === 1) {
      els.push(poly([v(-1.2, 0), v(1.2, 0), v(1.2, 0.25), v(-1.2, 0.25)], { tone: "warn", fill: "warn", bare: true }));
      els.push(txt(v(1.4, 0.15), "ısınan yüzey", "e", { small: true, tone: "warn" }));
      els.push(vec(v(0, 0.4), v(0, 2.7), { tone: "warn", bold: true }));
      els.push(...cloud(v(0, 3.4)));
    } else {
      els.push(poly([v(-4, 0), v(2.5, 0), v(-4, 2.2)], { tone: "b", fill: "b", thin: true }));
      els.push(txt(v(-2.6, 0.45), "soğuk hava", "c", { small: true, bold: true, tone: "b" }));
      els.push(vec(v(3.8, 0.5), v(-0.4, 1.9), { tone: "warn", bold: true }), txt(v(3.0, 1.35), "sıcak hava", "w", { small: true, bold: true, tone: "warn" }));
      els.push(...cloud(v(-1.2, 3.0)));
    }
    els.push(txt(v(-4.4, 4.2), " ", "c"), txt(v(4.4, -0.6), " ", "c"));
    return { els, readout: [LIFT[step].note, "Aynı yerde farklı zamanlarda farklı mekanizmalar baskın olabilir; 'dağ var' demek her yağışı yamaç yağışı yapmaz."] };
  },
};

const phases: FigureDef = {
  caption:
    "Buz ve sıvı oluşumunun yolları farklıdır: kırağı su buharının soğuk yüzeyde doğrudan buza dönüşmesi, kırç çoğunlukla aşırı soğumuş damlacıkların yüzeyde donması, çiy buharın soğuyan yüzeyde sıvı damlaya dönüşmesidir. Bir yola tıkla.",
  alt: "Üç köşe: buhar (gaz), damla (sıvı), buz (katı). Buhardan buza ok kırağı, damladan buza ok kırç, buhardan damlaya ok çiy olarak etiketli.",
  picks: [
    { label: "Kırağı", title: "Kırağı: gaz → katı", detail: ["Su buharı soğuk yüzeyde sıvı evreye geçmeden doğrudan buz kristali olur."] },
    { label: "Kırç", title: "Kırç: sıvı → katı", detail: ["Aşırı soğumuş damlacıklar çarptıkları yüzeyde donar."] },
    { label: "Çiy", title: "Çiy: gaz → sıvı", detail: ["Soğuyan yüzeyde buhar sıvı damlaya dönüşür; gökten düşen yağmurla aynı oluşum yolu değildir."] },
  ],
  draw: (_v, _s, pick = -1) => {
    const G = v(0, 3.2);
    const Lq = v(-3, 0);
    const S = v(3, 0);
    const els: El[] = [];
    const node = (p: V, s: string, tone: Tone) => els.push(circle(p, 0.55, { tone, fill: tone, bold: true }), txt(p, s, "c", { small: true, bold: true }));
    node(G, "buhar", "b");
    node(Lq, "damla", "c");
    node(S, "buz", "muted");
    const arrow = (a: V, b: V, i: number, label: string, at: "e" | "w" | "s", off: V) => {
      const d = v(b[0] - a[0], b[1] - a[1]);
      const l = Math.hypot(d[0], d[1]);
      const u = v(d[0] / l, d[1] / l);
      const on = pick === i;
      els.push(vec(v(a[0] + u[0] * 0.75, a[1] + u[1] * 0.75), v(b[0] - u[0] * 0.75, b[1] - u[1] * 0.75), { tone: on ? "a" : "ink", bold: on }));
      els.push(txt(v((a[0] + b[0]) / 2 + off[0], (a[1] + b[1]) / 2 + off[1]), label, at, { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
    };
    arrow(G, S, 0, "kırağı", "e", v(0.3, 0.2));
    arrow(Lq, S, 1, "kırç", "s", v(0, -0.3));
    arrow(G, Lq, 2, "çiy", "w", v(-0.3, 0.2));
    els.push(txt(v(-4.8, 4.2), " ", "c"), txt(v(4.8, -1.2), " ", "c"));
    const sel = pick >= 0 ? ["Kırağı: gaz → katı.", "Kırç: aşırı soğumuş sıvı → katı.", "Çiy: gaz → sıvı (yüzeyde)."][pick] : "Bir yola tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Kar buz kristalleri içeren, dolu güçlü bulut içi hareketlerle büyüyen buz parçaları şeklindeki yağıştır."] };
  },
};

export const geographyFigures058Weather: Record<string, Record<string, FigureDef>> = {
  "cografya-sicaklik": {
    "Işının açısı ve yayılma alanı": rayAngle,
    "Bakı ve gündüz süresi": aspect,
    "Kara ve deniz neden farklı tepki verir?": landSea,
    "Yükselti ve indirgeme: koşulu yaz": reduce,
    "İzoterm haritasının neyi gösterdiğini sor": isotherm,
    "İnversiyon basit kuralın sınırıdır": inversion,
  },
  "basinc-ruzgarlar": {
    "Yüksek ve alçak çevresine göredir": relative,
    "Basınç farkını uzaklıkla birlikte oku": gradient,
    "Sapma ile sürtünmeyi karıştırma": coriolis,
    "Küresel kuşaklardan sürekli rüzgârlara": belts,
    "Muson ve meltem: benzer neden farklı ölçek": breeze,
    "Föhn: alçalırken sıkışma ve ısınma": foehn,
  },
  "nem-yagis": {
    "Soğuma ve yoğuşmayı miktarla izle": saturation,
    "Buz oluşumu ve düşen yağışlar": phases,
    "Yükselme nedenlerini karşılaştır": lifting,
  },
};

