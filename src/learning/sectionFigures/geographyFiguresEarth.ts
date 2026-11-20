import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Coğrafya · Dünya’nın şekli ve hareketleri. İdeal küre ve yatay zemin
 * modeli; tarihler yaklaşık öğretim tarihleridir. Şemalar ölçekli değildir.
 */

const DATES = [
  { name: "21 Haziran", d: 23.5 },
  { name: "Ekinoks", d: 0 },
  { name: "21 Aralık", d: -23.5 },
];
const deg = (x: number) => `${String(Math.round(x * 10) / 10).replace(".", ",").replace("-", "−")}°`;
const lat = (x: number) => (x === 0 ? "0°" : `${deg(Math.abs(x))} ${x > 0 ? "K" : "G"}`);

// 1 · Öğle yüksekliği ve gölge.
const shadow: FigureDef = {
  caption:
    "Yatay zemin ve yerel güneş öğlesi için h = 90° − |φ − δ|. Enlemi kaydır, tarihi adımlarla değiştir: Güneş’in yüksekliği, hangi yönde olduğu ve dik çubuğun gölgesi değişir. h negatifse Güneş öğlede bile ufkun altındadır.",
  alt: "Yatay zeminde dik çubuk, Güneş ışını ve gölge. Sol kuzey, sağ güney. Güneş dik ışın enlemi yönündedir, gölge ters yöndedir.",
  param: { label: "Enlem φ (kuzey +)", min: -70, max: 80, step: 5, init: 40, unit: "°", plain: true },
  steps: DATES.map((d) => d.name),
  draw: (phi, step) => {
    const D = DATES[step];
    const h = 90 - Math.abs(phi - D.d);
    const sunNorth = D.d > phi;
    const els: El[] = [
      seg(v(-4.2, 0), v(4.2, 0), { thin: true }),
      txt(v(-4.2, -0.4), "Kuzey", "e", { small: true, tone: "muted" }),
      txt(v(4.2, -0.4), "Güney", "w", { small: true, tone: "muted" }),
      seg(v(0, 0), v(0, 1.4), { bold: true }),
    ];
    if (h <= 0) {
      els.push(txt(v(0, 2.4), "Güneş ufkun altında: öğle gölgesi yok", "c", { bold: true, tone: "warn" }));
    } else {
      const r = (h * Math.PI) / 180, dir = sunNorth ? -1 : 1;
      const sun = v(dir * 3.2 * Math.cos(r), 3.2 * Math.sin(r));
      els.push(ball(sun, 0.25, "warn"), seg(sun, v(0, 1.4), { dash: true, thin: true, tone: "warn" }));
      const L = Math.min(1.4 / Math.tan(r), 4.0);
      if (L > 0.02) els.push(seg(v(0, 0), v(-dir * L, 0), { bold: true, tone: "b" }), txt(v(-dir * Math.min(L / 2 + 0.3, 2.0), -0.85), `gölge = ${String(Math.round((1 / Math.tan(r)) * 100) / 100).replace(".", ",")} × çubuk`, "c", { small: true, tone: "b" }));
      els.push(txt(v(dir * 1.0, 0.45), `h = ${deg(h)}`, "c", { small: true, bold: true, tone: "a" }));
    }
    els.push(txt(v(-4.6, 3.6), " ", "c"), txt(v(4.6, -1.2), " ", "c"));
    return {
      els,
      readout: [
        `${D.name}: δ = ${lat(D.d)}, φ = ${lat(phi)}. h = 90° − |${deg(phi)} − (${deg(D.d)})| = ${deg(h)}${h > 0 ? `; Güneş ${sunNorth ? "kuzeyde, gölge güneye" : D.d === phi ? "tam tepede, gölge yok" : "güneyde, gölge kuzeye"}.` : "."}`,
        "Türkiye’de öğle gölgesi her zaman kuzeye düşer; tropiklerde yön yıl içinde değişebilir. Sabaha ya da eğimli yamaca bu formül koşulsuz uygulanmaz.",
      ],
    };
  },
};

// 2 · Eğik eksenli küre: dik ışın ve aydınlanma.
const LATS: { phi: number; name: string; tone: Tone }[] = [
  { phi: 66.5, name: "Kuzey Kutup Dairesi", tone: "muted" },
  { phi: 23.5, name: "Yengeç Dönencesi", tone: "c" },
  { phi: 0, name: "Ekvator", tone: "ink" },
  { phi: -23.5, name: "Oğlak Dönencesi", tone: "c" },
  { phi: -66.5, name: "Güney Kutup Dairesi", tone: "muted" },
];
const globe: FigureDef = {
  caption:
    "Güneş ışınları soldan paralel gelir; eksenin uzaydaki yönü yıl boyunca korunur, Güneş’e göre yönelim değişir. Adımlarda dik ışının düştüğü enlem ve aydınlanma sınırı görünür (ideal model).",
  alt: "Eğik eksenli küre, enlem çizgileri ve soldan gelen paralel ışınlar. Sağ yarı gölgeli. Haziranda dik ışın Yengeç Dönencesi’ne, ekinoksta Ekvator’a, aralıkta Oğlak Dönencesi’ne düşüyor.",
  steps: DATES.map((d) => d.name),
  draw: (_v, step) => {
    const D = DATES[step], R = 2.0;
    const t = (D.d * Math.PI) / 180;
    const a = v(-Math.sin(t), Math.cos(t)), p = v(Math.cos(t), Math.sin(t));
    const els: El[] = [];
    const night: V[] = [];
    for (let i = 0; i <= 20; i++) { const g = -Math.PI / 2 + (i / 20) * Math.PI; night.push(v(R * Math.cos(g), R * Math.sin(g))); }
    els.push(poly(night, { fill: "muted", tone: "muted" }), circle(v(0, 0), R, { bold: true }));
    for (const L of LATS) {
      const s = Math.sin((L.phi * Math.PI) / 180) * R, c = Math.cos((L.phi * Math.PI) / 180) * R;
      const m = v(a[0] * s, a[1] * s);
      els.push(seg(v(m[0] - p[0] * c, m[1] - p[1] * c), v(m[0] + p[0] * c, m[1] + p[1] * c), { thin: L.phi !== 0, dash: Math.abs(L.phi) > 60, tone: L.tone }));
    }
    els.push(seg(v(-a[0] * 2.6, -a[1] * 2.6), v(a[0] * 2.6, a[1] * 2.6), { tone: "warn", thin: true }), txt(v(a[0] * 2.95, a[1] * 2.95), "K", "c", { small: true, bold: true, tone: "warn" }));
    for (const y of [-1.4, -0.7, 0.7, 1.4]) els.push(vec(v(-4.4, y), v(-Math.sqrt(R * R - y * y) - 0.05, y), { thin: true, tone: "muted" }));
    const sub = v(-R * Math.cos(0), 0);
    els.push(vec(v(-4.4, 0), v(sub[0] - 0.05, 0), { bold: true, tone: "a" }), ball(sub, 0.12, "a"));
    els.push(txt(v(-4.4, 0.35), "dik ışın", "e", { small: true, tone: "a" }));
    els.push(txt(v(2.4, -2.3), "gece", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-4.8, 3.2), " ", "c"), txt(v(3.0, -2.7), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Dik ışın 23,5° K’de (Yengeç). Kuzeyde gündüzler en uzun; kuzey kutup kuşağında kutup günü, güneyde kutup gecesi."
          : step === 1 ? "Dik ışın Ekvator’da; aydınlanma sınırı iki kutuptan geçer: ideal modelde her yerde gece ≈ gündüz."
          : "Dik ışın 23,5° G’de (Oğlak). Güneyde gündüzler en uzun; kuzey kutup kuşağında kutup gecesi.",
        "Dik ışın yalnız dönenceler arasındaki kuşağa gelebilir: dönenceler arasına yılda iki, dönencenin üstüne bir kez.",
      ],
    };
  },
};

// 3 · Yörünge konumları (seçilebilir).
const ORBIT = [
  { label: "21 Mart", ang: 270, title: "21 Mart · ekinoks", detail: ["Dik ışın Ekvator’da; gece ≈ gündüz (ideal).", "Kuzeyde ilkbahar, güneyde sonbahar başlangıcı."] },
  { label: "21 Haziran", ang: 180, title: "21 Haziran · gündönümü", detail: ["Kuzey yarım küre Güneş’e dönük; dik ışın Yengeç Dönencesi’nde.", "Kuzeyde en uzun gündüz; güneyde en kısa.", "Dünya bu sırada Güneş’ten en uzak konumuna yakındır (temmuz başı): mevsim uzaklıktan değil eğiklikten."] },
  { label: "23 Eylül", ang: 90, title: "23 Eylül · ekinoks", detail: ["Dik ışın yine Ekvator’da.", "Kuzeyde sonbahar, güneyde ilkbahar başlangıcı."] },
  { label: "21 Aralık", ang: 0, title: "21 Aralık · gündönümü", detail: ["Güney yarım küre Güneş’e dönük; dik ışın Oğlak Dönencesi’nde.", "Dünya Güneş’e en yakın konuma yakın (ocak başı) ama kuzeyde kış.", "Aynı anda karşı yarım kürelerde zıt mevsim: uzaklık mevsimi açıklamaz."] },
];
const orbit: FigureDef = {
  caption:
    "Dünya Güneş çevresinde elips yörüngede dolanır; eksenin uzaydaki yönü (eğiklik 23,5°) yıl boyu aynı kalır. Bir tarihe tıkla: o konumda hangi yarım kürenin Güneş’e dönük olduğu açılır. Elips abartılı çizilmedi; şema ölçekli değil.",
  alt: "Ortada Güneş, çevresinde yörünge ve dört Dünya konumu. Her konumda eksen aynı yöne eğik.",
  picks: ORBIT.map((o) => ({ label: o.label, title: o.title, detail: o.detail })),
  draw: (_v, _s, pick = -1) => {
    const RX = 3.4, RY = 2.0;
    const ring: V[] = [];
    for (let i = 0; i < 48; i++) { const g = (i / 48) * Math.PI * 2; ring.push(v(RX * Math.cos(g), RY * Math.sin(g))); }
    const els: El[] = [poly(ring, { tone: "muted", thin: true }), ball(v(0, 0), 0.45, "warn"), txt(v(0, -0.8), "Güneş", "c", { small: true, tone: "warn" })];
    const tilt = (23.5 * Math.PI) / 180, ax = v(-Math.sin(tilt) * 0.55, Math.cos(tilt) * 0.55);
    ORBIT.forEach((o, i) => {
      const g = (o.ang * Math.PI) / 180, c = v(RX * Math.cos(g), RY * Math.sin(g));
      const on = pick === i;
      els.push(ball(c, 0.28, on ? "a" : "b"), seg(v(c[0] - ax[0], c[1] - ax[1]), v(c[0] + ax[0], c[1] + ax[1]), { tone: on ? "a" : "ink" }));
      const off = o.ang === 90 ? v(0, 0.75) : o.ang === 270 ? v(0, -0.8) : o.ang === 0 ? v(0.45, 0) : v(-0.45, 0);
      els.push(txt(v(c[0] + off[0], c[1] + off[1]), o.label, o.ang === 0 ? "e" : o.ang === 180 ? "w" : "c", { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-5.6, 3.0), " ", "c"), txt(v(5.6, -3.0), " ", "c"));
    return { els, readout: [pick >= 0 ? ORBIT[pick].detail[0] : "Bir tarihe tıkla ya da aşağıdan seç.", "Eksen hep aynı yöne eğik: haziranda kuzey ucu Güneş’e, aralıkta Güneş’ten öteye bakar."] };
  },
};

// 4 · Kutup Yıldızı yüksekliği = enlem.
const polaris: FigureDef = {
  caption:
    "Kuzey yarım kürede Kutup Yıldızı’nın ufuktan yüksekliği yaklaşık enleme eşittir. Enlemi değiştir: Ekvator’da yıldız ufukta, Kuzey Kutbu’nda tam tepededir. Güney yarım kürede görünmez.",
  alt: "Yatay ufuk çizgisi, gözlemci ve ufukla φ açısı yapan Kutup Yıldızı doğrultusu.",
  param: { label: "Enlem φ", min: 0, max: 90, step: 5, init: 40, unit: "° K", plain: true },
  draw: (phi) => {
    const r = (phi * Math.PI) / 180;
    const star = v(-3.0 * Math.cos(r), 3.0 * Math.sin(r));
    const arc: V[] = [];
    for (let i = 0; i <= 16; i++) { const g = (i / 16) * r; arc.push(v(-0.9 * Math.cos(g), 0.9 * Math.sin(g))); }
    const els: El[] = [
      seg(v(-3.8, 0), v(3.8, 0), { thin: true }),
      txt(v(-3.8, -0.4), "Kuzey ufku", "e", { small: true, tone: "muted" }),
      ball(v(0, 0), 0.14, "ink"),
      seg(v(0, 0), star, { dash: true, tone: "warn" }),
      ball(star, 0.16, "warn"),
      txt(v(star[0] - 0.1, star[1] + 0.4), "Kutup Yıldızı", "c", { small: true, tone: "warn" }),
    ];
    if (phi > 0) els.push(poly(arc, { open: true, tone: "a" }), txt(v(-1.25 * Math.cos(r / 2), 1.25 * Math.sin(r / 2)), deg(phi), "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-4.2, 3.7), " ", "c"), txt(v(4.0, -0.8), " ", "c"));
    return { els, readout: [`φ = ${phi}° K ⇒ Kutup Yıldızı yüksekliği ≈ ${phi}°.`, "Bu ilişki enlemi bulmanın gözleme dayalı yoludur; boylam hakkında bilgi vermez."] };
  },
};

export const geographyFiguresEarth: Record<string, Record<string, FigureDef>> = {
  "dunya-sekli-hareket": {
    "Öğle yüksekliğini ve gölgeyi hesapla": shadow,
    "Haziran gündönümü": globe,
    "Yörüngede dolanma ve elips": orbit,
    "Kutup Yıldızı yüksekliğini enlemle bağla": polaris,
  },
};
