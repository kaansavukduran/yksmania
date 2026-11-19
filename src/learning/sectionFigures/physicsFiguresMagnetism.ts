import { circle, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Mıknatıslar ve manyetik alan. Field lines of the bar magnet are traced
 * numerically from a two-pole model (N and S as point poles with 1/r² fields),
 * so their shape, density and the compass directions are real, not hand drawn.
 * Inside the magnet the closing S → N part is drawn straight. The straight wire
 * uses concentric circles with B ∝ I / r. Drawings are not to scale.
 */

const NX = -1.3;
const SX = 1.3;
function B(p: V): V {
  const f = (cx: number, s: number): V => {
    const dx = p[0] - cx;
    const dy = p[1];
    const r3 = Math.pow(dx * dx + dy * dy, 1.5) || 1e-9;
    return v((s * dx) / r3, (s * dy) / r3);
  };
  const a = f(NX, 1);
  const b = f(SX, -1);
  return v(a[0] + b[0], a[1] + b[1]);
}
const unitB = (p: V): V => {
  const b = B(p);
  const l = Math.hypot(b[0], b[1]) || 1;
  return v(b[0] / l, b[1] / l);
};

/** Trace one field line from just outside N at the given angle (degrees). */
function trace(angle: number): V[] {
  const a = (angle * Math.PI) / 180;
  let p: V = v(NX + Math.cos(a) * 0.12, Math.sin(a) * 0.12);
  const out: V[] = [p];
  for (let i = 0; i < 2400; i++) {
    const d = unitB(p);
    // Midpoint (RK2) step for smooth curves.
    const m: V = v(p[0] + d[0] * 0.015, p[1] + d[1] * 0.015);
    const dm = unitB(m);
    p = v(p[0] + dm[0] * 0.03, p[1] + dm[1] * 0.03);
    if (i % 4 === 0) out.push(p);
    if (Math.hypot(p[0] - SX, p[1]) < 0.13) break;
    if (Math.abs(p[0]) > 6.5 || Math.abs(p[1]) > 4.2) break;
  }
  out.push(p);
  return out;
}
// Closed loops that stay in the frame, plus wider lines that leave it (drawn
// with their mirror image entering S, as the dipole field is symmetric).
const LOOPS = [62, 75, 88, 100, 110];
const OPEN = [125, 142];
const mirror = (l: V[]): V[] => l.map((p) => v(-p[0], p[1])).reverse();
const LINES: V[][] = [
  ...[...LOOPS, ...LOOPS.map((a) => -a)].map(trace),
  ...[...OPEN, ...OPEN.map((a) => -a)].flatMap((a) => {
    const l = trace(a);
    return [l, mirror(l)];
  }),
];
// A line straight out along the axis on each side (goes off the frame).
const AXIS: V[][] = [
  [v(NX - 0.12, 0), v(-6.3, 0)],
  [v(6.3, 0), v(SX + 0.12, 0)],
];

function arrowOn(line: V[], at = 0.5): El {
  const i = Math.max(1, Math.min(line.length - 2, Math.floor(line.length * at)));
  const a = line[i - 1];
  const b = line[i + 1];
  return vec(a, b, { tone: "c", bold: true });
}

function magnet(left: "N" | "S" = "N", x0 = -1.6, x1 = 1.6, y = 0, h = 0.7): El[] {
  const m = (x0 + x1) / 2;
  const lt: Tone = left === "N" ? "warn" : "b";
  const rt: Tone = left === "N" ? "b" : "warn";
  return [
    poly([v(x0, y - h / 2), v(m, y - h / 2), v(m, y + h / 2), v(x0, y + h / 2)], { tone: lt, fill: lt }),
    poly([v(m, y - h / 2), v(x1, y - h / 2), v(x1, y + h / 2), v(m, y + h / 2)], { tone: rt, fill: rt }),
    txt(v((x0 + m) / 2, y), left, "c", { tone: lt, bold: true }),
    txt(v((m + x1) / 2, y), left === "N" ? "S" : "N", "c", { tone: rt, bold: true }),
  ];
}

/** Small compass needle at p pointing along d (N half red). */
function needle(p: V, d: V, len = 0.38): El[] {
  const tip = v(p[0] + d[0] * len, p[1] + d[1] * len);
  const tail = v(p[0] - d[0] * len, p[1] - d[1] * len);
  const n = v(-d[1] * 0.1, d[0] * 0.1);
  return [
    circle(p, len + 0.08, { tone: "muted", thin: true }),
    poly([tip, v(p[0] + n[0], p[1] + n[1]), v(p[0] - n[0], p[1] - n[1])], { tone: "warn", fill: "warn", thin: true }),
    poly([tail, v(p[0] + n[0], p[1] + n[1]), v(p[0] - n[0], p[1] - n[1])], { tone: "b", fill: "b", thin: true }),
  ];
}

/* ---------- 1. Alan çizgileri ve pusula ---------- */
const COMPASS: V[] = [v(-3.0, 1.3), v(0, 3.0), v(3.0, 1.3), v(0, -2.1), v(-4.6, -0.8), v(4.6, -2.0)];
const fieldLines: FigureDef = {
  caption:
    "İleri ile çubuk mıknatısın alanını kur. Çizgiler iki kutuplu modelden hesaplandı: dışarıda N → S, içeride S → N, hiçbiri kesişmez ve kapalıdır. Pusulaların kırmızı (N) ucu bulunduğu noktadaki alan yönüne döner.",
  alt: "Ortada sol yarısı kırmızı N, sağ yarısı mavi S çubuk mıknatıs. Çevresinde N'den çıkıp kavislerle S'ye giren yeşil oklu alan çizgileri, kutupların yakınında sık, uzakta seyrek. Altı küçük pusulanın kırmızı uçları çizgilere teğet.",
  steps: ["Alan çizgileri", "İçeride S → N", "Pusulalar", "Sıklık = şiddet"],
  draw: (_v, step) => {
    const els: El[] = [];
    for (const l of [...LINES, ...AXIS]) els.push(poly(l, { tone: "c", open: true, thin: true, smooth: true }));
    for (const l of LINES) els.push(arrowOn(l, 0.5));
    els.push(vec(v(-5.6, 0), v(-5.8, 0), { tone: "c", bold: true }), vec(v(5.8, 0), v(5.6, 0), { tone: "c", bold: true }));
    els.push(...magnet("N"));
    if (step >= 1) els.push(vec(v(0.9, -0.52), v(-0.9, -0.52), { tone: "c", bold: true }));
    if (step >= 2) for (const p of COMPASS) els.push(...needle(p, unitB(p)));
    if (step === 3) {
      els.push(circle(v(NX - 0.55, 0.6), 0.45, { tone: "warn", dash: true, bold: true }));
      els.push(circle(v(-5.2, 3.2), 0.6, { tone: "muted", dash: true, bold: true }));
    }
    els.push(txt(v(-6.6, 4.3), " ", "c"), txt(v(6.6, -4.3), " ", "c"));
    const rows: [string, string][] = [
      ["Dış bölgede alan çizgileri N kutbundan çıkıp S kutbuna girer.", "Çizgi gerçek bir ip değildir; her noktadaki teğeti B'nin yönünü gösteren modeldir."],
      ["Mıknatısın içinde (alttaki ok) çizgiler S'den N'ye döner: her çizgi kapalı bir eğridir.", "“N'de başlar, S'de biter” yalnız dış bölge için doğrudur."],
      ["Pusulanın kırmızı N ucu, bulunduğu noktadaki B yönüne (çizginin teğetine) döner.", "Mıknatısın N kutbu yanındaki pusula N ucunu dışa çevirir; N ucu mıknatısın S kutbuna yönelir."],
      ["Kırmızı kesik daire: çizgiler sık, alan güçlü (kutup yakını). Gri kesik daire: çizgiler seyrek, alan zayıf.", "Çizgi adedinden tesla hesaplanmaz; yoğunluk yalnız göreli şiddeti gösterir. Çizgiler kesişmez: bir noktada tek B yönü vardır."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Kutup ayrılmaz ---------- */
const cut: FigureDef = {
  caption: "İleri ile mıknatısı ortadan kes: tek kutuplu parça oluşmaz, her parça yeniden N ve S taşıyan küçük bir mıknatıstır.",
  alt: "Bir çubuk mıknatıs, ortasından kesik çizgiyle bölünüyor; sonra iki küçük çubuk mıknatıs, her birinde N ve S yazıyor.",
  steps: ["Tek mıknatıs", "Ortadan kes", "İki mıknatıs"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step < 2) {
      els.push(...magnet("N", -2.4, 2.4, 0, 0.9));
      if (step === 1) els.push(seg(v(0, -0.9), v(0, 0.9), { tone: "ink", dash: true, bold: true }), txt(v(0, 1.05), "kes", "n", { tone: "ink", small: true }));
    } else {
      els.push(...magnet("N", -3.2, -0.6, 0, 0.9), ...magnet("N", 0.6, 3.2, 0, 0.9));
    }
    els.push(txt(v(-3.6, 1.6), " ", "c"), txt(v(3.6, -1.2), " ", "c"));
    return {
      els,
      readout:
        step === 2
          ? ["Her parça N ve S taşır: N | S ve N | S. Kesilen yerde yeni bir S ve yeni bir N oluştu.", "“Yalnız N kutuplu parça” TYT düzeyinde geçerli sonuç değildir."]
          : ["Mıknatısın iki ucu zıttır: N ve S.", step === 1 ? "Ortadan kesmek N ile S'yi birbirinden ayırmaz." : "Aynı kutuplar iter, zıt kutuplar çeker."],
    };
  },
};

/* ---------- 3. Gergin ip: itme kanıtı (2017 TYT örnek kitapçık) ---------- */
const rope: FigureDef = {
  caption:
    "İleri ile sürtünmesiz düzlemde gergin iple bağlı X ve Y mıknatıslarını çöz. İpteki gerilme, mıknatısların ip olmasa birbirinden uzaklaşacağını gösterir: bu itmedir, komşu uçlar aynıdır.",
  alt: "Yan yana X (uçları K ve L) ve Y (uçları P ve R) çubuk mıknatısları; K ile R uçları arasından dolanan gergin bir ip. Adımlarda L ve P arasında itme okları ve uçlara yazılan kutup harfleri.",
  steps: ["Gergin ip", "Komşu uçlar: L ve P", "Diğer uçlar", "Sonuç"],
  draw: (_v, step) => {
    const els: El[] = [];
    const box = (x0: number, x1: number, l: string, r: string, lt: Tone, rt: Tone) => {
      const m = (x0 + x1) / 2;
      els.push(
        poly([v(x0, -0.4), v(m, -0.4), v(m, 0.4), v(x0, 0.4)], { tone: lt, fill: lt }),
        poly([v(m, -0.4), v(x1, -0.4), v(x1, 0.4), v(m, 0.4)], { tone: rt, fill: rt }),
        txt(v((x0 + m) / 2, 0), l, "c", { tone: lt, bold: true }),
        txt(v((m + x1) / 2, 0), r, "c", { tone: rt, bold: true }),
      );
    };
    // Unknown poles until deduced; one consistent choice shown (L = P = N).
    const known = step >= 2;
    box(-3.4, -0.6, known ? "K: S" : "K", step >= 1 ? "L: N" : "L", known ? "b" : "muted", step >= 1 ? "warn" : "muted");
    box(0.6, 3.4, step >= 1 ? "P: N" : "P", known ? "R: S" : "R", step >= 1 ? "warn" : "muted", known ? "b" : "muted");
    els.push(poly([v(-3.4, 0), v(-3.8, 0), v(-3.8, -1.0), v(3.8, -1.0), v(3.8, 0), v(3.4, 0)], { tone: "ink", open: true, bold: true }));
    els.push(txt(v(0, -1.15), "gergin ip (T > 0)", "s", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-2, 0.6), "X", "n", { tone: "ink", bold: true }), txt(v(2, 0.6), "Y", "n", { tone: "ink", bold: true }));
    if (step >= 1) els.push(vec(v(-0.5, 0.9), v(-1.4, 0.9), { tone: "warn", bold: true }), vec(v(0.5, 0.9), v(1.4, 0.9), { tone: "warn", bold: true }), txt(v(0, 1.2), "itme", "n", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-4.2, 2), " ", "c"), txt(v(4.2, -1.7), " ", "c"));
    const rows: [string, string][] = [
      ["İp gergin ve gerilme sıfırdan farklı: ip, mıknatısların birbirinden uzaklaşmasını engelliyor.", "Sadece “iki mıknatıs var” bilgisi yetmez; ayırt edici kanıt gerilmedir."],
      ["Uzaklaşma eğilimi itmedir → birbirine bakan L ve P aynı kutuptur.", "Çizimde L = P = N seçildi; ikisi de S olsaydı sonuçlar aynı kalırdı."],
      ["Her çubukta uçlar zıttır: K, L'nin; R, P'nin zıttıdır. K = R.", "Kısa yol: önce komşu uçların aynı mı zıt mı olduğunu bul, sonra karşı uçları yaz."],
      ["Kesin olanlar: L ile P aynı, K ile R aynı, K ile P zıt, L ile R zıt.", "Hangisinin N olduğu bu bilgiden çıkmaz; yalnız ilişkiler kesindir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Düz telin alanı ---------- */
const wire: FigureDef = {
  caption:
    "Sürgüyle akımı değiştir. Tel sayfa düzleminden dışarı akım taşıyor (⊙); alan çizgileri teli çevreleyen çemberlerdir ve sağ el kuralına göre saat yönünün tersindedir. B, akımla doğru, uzaklıkla ters orantılıdır.",
  alt: "Ortada nokta işaretli tel kesiti, çevresinde iç içe üç yeşil çember ve saat yönünün tersine oklar. r ve 2r uzaklığındaki P ve R noktalarında uzunlukları akımla değişen alan okları.",
  param: { label: "Akım I (birim)", min: 1, max: 3, step: 1, init: 1 },
  draw: (I) => {
    const els: El[] = [];
    for (const r of [1, 2, 3]) {
      els.push(circle(v(0, 0), r, { tone: "c", thin: true }));
      // Counter-clockwise arrow at the top of each circle.
      els.push(vec(v(0.25, r), v(-0.25, r), { tone: "c", bold: true }));
    }
    els.push(circle(v(0, 0), 0.3, { tone: "warn", fill: "warn", bold: true }), pt(v(0, 0), undefined, "c", "ink"));
    els.push(txt(v(0, -0.4), "I (dışarı)", "s", { tone: "warn", small: true, bold: true }));
    const P = v(1, 0);
    const R = v(2, 0);
    const k = 0.9;
    els.push(vec(P, v(1, k * I), { tone: "warn", bold: true }), txt(v(1.1, k * I), "B(P)", "e", { tone: "warn", small: true, bold: true }));
    els.push(vec(R, v(2, (k * I) / 2), { tone: "warn", bold: true }), txt(v(2.1, (k * I) / 2), "B(R)", "e", { tone: "warn", small: true, bold: true }));
    els.push(pt(P, "P", "s", "ink"), pt(R, "R", "s", "ink"));
    els.push(txt(v(-3.4, 3.5), " ", "c"), txt(v(4, -3.4), " ", "c"));
    return {
      els,
      readout: [
        `I = ${I}: P'de (r) B = ${I} birim, R'de (2r) B = ${(I / 2).toLocaleString("tr-TR")} birim.`,
        "B ∝ I / r: akım 2 katına çıkarsa B 2 kat; uzaklık 2 katına çıkarsa B yarıya iner (ters kare değil). Sağ el: başparmak akım, dört parmak B'nin dönüş yönü.",
      ],
    };
  },
};

export const physicsFiguresMagnetism: Record<string, Record<string, FigureDef>> = {
  "miknatislar-ve-manyetik-alan": {
    "B yönlüdür; çizgiler gerçek ip değildir": fieldLines,
    "Kutupları ayırmak, kutbu tek başına üretmek değildir": cut,
    "Çekimden daha ayırt edici gözlem itmedir": rope,
    "Düz telde I ve uzaklığı birlikte değiştir": wire,
  },
};
