import {
  span,
  add,
  circle,
  dim,
  fmt,
  mul,
  poly,
  pt,
  seg,
  sub,
  txt,
  unit,
  v,
  vec,
  type El,
  type FigureDef,
  type V,
} from "./figureKit";

const rect = (x: number, y: number, w: number, h: number, tone: "a" | "b" | "c" | "muted" | "ink", fill = true): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill: fill ? (tone === "ink" ? "muted" : tone) : undefined, tone, thin: !fill });
const force = (from: V, d: V, label: string, tone: "a" | "b" | "c" | "warn" = "a", at: "n" | "s" | "e" | "w" | "ne" | "se" | "nw" | "sw" = "e"): El[] => [
  vec(from, add(from, d), { tone, bold: true }),
  txt(add(from, d), label, at, { small: true, tone }),
];
const water = (x: number, y: number, w: number, h: number): El[] => [
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { fill: "b", tone: "b", thin: true }),
];
const tank = (x: number, y: number, w: number, h: number): El =>
  poly([v(x, y + h + 0.6), v(x, y), v(x + w, y), v(x + w, y + h + 0.6)], { open: true, bold: true });

/** Zigzag resistor between a and b with a label. */
function resistor(a: V, b: V, label: string, tone: "ink" | "a" | "b" | "c" = "ink"): El[] {
  const d = sub(b, a);
  const L = Math.hypot(d[0], d[1]);
  const u = unit(d);
  const n: V = [-u[1], u[0]];
  const lead = (L - 1.2) / 2;
  const pts: V[] = [a, add(a, mul(u, lead))];
  for (let i = 0; i < 6; i++) pts.push(add(add(a, mul(u, lead + 0.1 + i * 0.2)), mul(n, i % 2 ? -0.18 : 0.18)));
  pts.push(add(a, mul(u, lead + 1.2)), b);
  return [poly(pts, { open: true, tone }), txt(add(add(a, mul(u, L / 2)), mul(n, 0.45)), label, "c", { small: true, tone })];
}
/** Battery between a and b (long plate = +, on b's side). */
function battery(a: V, b: V, label: string): El[] {
  const d = sub(b, a);
  const L = Math.hypot(d[0], d[1]);
  const u = unit(d);
  const n: V = [-u[1], u[0]];
  const m1 = add(a, mul(u, L / 2 - 0.12));
  const m2 = add(a, mul(u, L / 2 + 0.12));
  return [
    seg(a, m1),
    seg(m2, b),
    seg(add(m1, mul(n, 0.22)), sub(m1, mul(n, 0.22)), { bold: true }),
    seg(add(m2, mul(n, 0.45)), sub(m2, mul(n, 0.45))),
    txt(add(m2, mul(n, 0.6)), "+", "c", { small: true }),
    txt(sub(add(a, mul(u, L / 2)), mul(n, 0.75)), label, "c", { small: true }),
  ];
}
const meter = (c: V, letter: string, tone: "a" | "c"): El[] => [circle(c, 0.32, { tone, fill: "muted" }), txt(c, letter, "c", { small: true, bold: true, tone })];

const basinc: Record<string, FigureDef> = {
  "Birim alana düşen etkiyi düşün": {
    caption:
      "Aynı 60 N yük: 0,03 m² tabanda 2000 Pa, 0,01 m² tabanda 6000 Pa basınç yapar. Kuvvet aynı, etkilendiği alan küçüldükçe basınç büyür.",
    alt: "Aynı ağırlıkta iki blok; biri geniş tabanı üzerinde, diğeri dar tabanı üzerinde duruyor; altlarındaki basınç değerleri yazılı.",
    draw: () => ({
      els: [
        seg(v(-0.5, 0), v(9, 0), { tone: "muted" }),
        rect(0, 0, 3, 1.2, "ink"),
        ...force(v(1.5, 2.2), v(0, -0.9), "60 N", "warn", "e"),
        txt(v(1.5, -0.5), "A = 0,03 m² → 2000 Pa", "c", { small: true }),
        rect(6, 0, 1, 3.6, "ink"),
        ...force(v(6.5, 4.6), v(0, -0.9), "60 N", "warn", "e"),
        txt(v(6.5, -0.5), "A = 0,01 m² → 6000 Pa", "c", { small: true, tone: "a" }),
      ],
      readout: ["P = F / A: 60/0,03 = 2000 Pa · 60/0,01 = 6000 Pa"],
    }),
  },
  "Durgun sıvıda düşey derinliği ölç": {
    caption:
      "Noktayı aşağı indir: sudaki basınç yüzeyden düşey derinlikle artar, P = P₀ + ρgh (ρ = 1000 kg/m³, g = 10, P₀ = 100 kPa). Eğik borunun uzunluğu değil, düşey h önemlidir.",
    alt: "Su dolu kap; içinde sürgüyle derinliği değişen nokta ve yüzeyden noktaya düşey derinlik oku.",
    param: { label: "Derinlik h (m)", min: 0, max: 4, step: 0.5, init: 2 },
    draw: (h) => {
      const top = 4.5;
      const P = 100 + 10 * h;
      return {
        els: [
          ...water(0, 0, 4, top),
          tank(0, 0, 4, top),
          pt(v(2, top - h), `P = ${fmt(P)} kPa`, "e", "a"),
          ...(h > 0 ? [...span(v(1.2, top), v(1.2, top - h), `h = ${fmt(h)} m`, v(3, 0), "a")] : []),
        ],
        readout: [`P = 100 + 1000·10·${fmt(h)}/1000 = ${fmt(P)} kPa`],
      };
    },
  },
  "Katmanları ve taban kuvvetini ayrı hesapla": {
    caption:
      "0,2 m yağ (800 kg/m³) üstünde 0,3 m su: taban basıncı katkıları toplanır, 800·10·0,2 + 1000·10·0,3 = 1600 + 3000 = 4600 Pa (atmosfer hariç). Sağdaki grafikte eğim her katmanda ρg'dir.",
    alt: "Solda iki katmanlı kap, üstte yağ altta su; sağda basınç–derinlik grafiği iki farklı eğimli doğru parçasından oluşuyor.",
    draw: () => {
      const s = 10;
      return {
        els: [
          rect(0, 0, 3, 0.3 * s, "b"),
          rect(0, 0.3 * s, 3, 0.2 * s, "c"),
          tank(0, 0, 3, 0.5 * s),
          txt(v(1.5, 4), "yağ 0,2 m", "c", { small: true }),
          txt(v(1.5, 1.5), "su 0,3 m", "c", { small: true }),
          vec(v(5, 5), v(5, -0.4), { tone: "muted", thin: true }),
          vec(v(5, 5), v(9.6, 5), { tone: "muted", thin: true }),
          txt(v(9.6, 5), "P (Pa)", "ne", { small: true, tone: "muted" }),
          txt(v(5, -0.4), "derinlik", "w", { small: true, tone: "muted" }),
          poly([v(5, 5), v(5 + 1600 / 1000, 3), v(5 + 4600 / 1000, 0)], { open: true, bold: true, tone: "a" }),
          pt(v(5 + 1.6, 3), "1600", "e", "a"),
          pt(v(5 + 4.6, 0), "4600", "e", "a"),
        ],
        readout: ["P_taban = 1600 + 3000 = 4600 Pa"],
      };
    },
  },
  "Pascal basınç değişimini iletir, kuvveti eşitlemez": {
    caption:
      "Hidrolik kaldırıcı: küçük pistona 20 N (0,01 m²) uygulanır; basınç artışı 2000 Pa iletilir ve 0,5 m²'lik büyük piston 1000 N kaldırır. Büyük piston bunun karşılığında 50 kat daha az yol alır.",
    alt: "U biçimli sıvı dolu kap; solda dar piston aşağı 20 N, sağda geniş piston yukarı 1000 N.",
    draw: () => ({
      els: [
        poly([v(0, 4), v(0, 0), v(8, 0), v(8, 3), v(5, 3), v(5, 1), v(1, 1), v(1, 4)], { fill: "b", tone: "b", thin: true }),
        rect(-0.1, 3.2, 1.2, 0.3, "ink"),
        rect(4.9, 3, 3.2, 0.3, "ink"),
        ...force(v(0.5, 4.7), v(0, -1.1), "F₁ = 20 N", "warn", "e"),
        ...force(v(6.5, 3.4), v(0, 1.4), "F₂ = 1000 N", "a", "e"),
        txt(v(0.5, -0.5), "A₁ = 0,01 m²", "c", { small: true }),
        txt(v(6.5, -0.5), "A₂ = 0,5 m²", "c", { small: true }),
      ],
      readout: ["20/0,01 = 2000 Pa = F₂/0,5 → F₂ = 1000 N", "A₁x₁ = A₂x₂: büyük piston 50 kat az yol alır"],
    }),
  },
  "Barometrede sütunun düşey yüksekliğine bak": {
    caption:
      "Cıvalı barometrede sütun eğilse de düşey yükseklik 76 cm kalır; boru boyunca sıvı uzunluğu artar ama ölçülen basıncı düşey h belirler.",
    alt: "Cıva çanağına batırılmış iki boru: biri dik, biri eğik; ikisinde de cıva yüzeyi çanaktan 76 cm yukarıda, aynı yatay kesikli çizgide.",
    draw: () => {
      const h = 3.8;
      const tilt = 0.55;
      return {
        els: [
          rect(-0.5, 0, 7, 0.6, "c"),
          rect(1, 0.3, 0.5, h, "c"),
          poly([v(1, 0.3), v(1, 5), v(1.5, 5), v(1.5, 0.3)], { open: true }),
          poly([v(4, 0.3), add(v(4, 0.3), mul(v(tilt, 1), h)), add(v(4.5, 0.3), mul(v(tilt, 1), h)), v(4.5, 0.3)], { fill: "c", tone: "c", thin: true }),
          poly([v(4, 0.3), add(v(4, 0.3), mul(v(tilt, 1), 4.7)), add(v(4.5, 0.3), mul(v(tilt, 1), 4.7)), v(4.5, 0.3)], { open: true }),
          seg(v(0, h + 0.3), v(7, h + 0.3), { dash: true, thin: true, tone: "a" }),
          ...span(v(0.4, 0.6), v(0.4, h + 0.3), "76 cm", v(3, 2), "a"),
          txt(v(6.6, 0.3), "cıva", "e", { small: true, tone: "c" }),
        ],
        readout: ["P₀ ≈ ρ_cıva·g·h (h düşey)"],
      };
    },
  },
  "Manometrede işareti sıvı dengesi belirler": {
    caption:
      "Gaz kolundaki sıvı yüzeyi açık koldan alçaksa gaz dış basınçtan büyüktür: P_gaz = P₀ + ρgΔh. Yüksekse P_gaz = P₀ − ρgΔh. İşareti borunun yönü değil, yüzeylerin yeri belirler.",
    alt: "Gaz haznesine bağlı U borulu manometre; adıma göre gaz kolundaki sıvı yüzeyi açık koldakinden alçak ya da yüksek, aradaki fark Δh.",
    steps: ["Gaz kolu alçak: P_gaz > P₀", "Gaz kolu yüksek: P_gaz < P₀"],
    draw: (_, step) => {
      const gasLevel = step === 0 ? 1 : 2.6;
      const openLevel = step === 0 ? 2.6 : 1;
      return {
        els: [
          circle(v(-1.4, 3.2), 1, { tone: "a", fill: "a" }),
          txt(v(-1.4, 3.2), "gaz", "c", { small: true }),
          seg(v(-0.4, 3.2), v(0, 3.2)),
          rect(0, 0, 0.5, gasLevel, "b"),
          rect(2, 0, 0.5, openLevel, "b"),
          rect(0, -0.5, 2.5, 0.5, "b"),
          poly([v(0, 3.2), v(0, -0.5), v(2.5, -0.5), v(2.5, 4)], { open: true }),
          poly([v(0.5, 3.2), v(0.5, 0), v(2, 0), v(2, 4)], { open: true }),
          seg(v(-0.2, gasLevel), v(3, gasLevel), { dash: true, thin: true, tone: "muted" }),
          seg(v(-0.2, openLevel), v(3, openLevel), { dash: true, thin: true, tone: "muted" }),
          ...span(v(3, Math.min(gasLevel, openLevel)), v(3, Math.max(gasLevel, openLevel)), "Δh", v(0, 1), "a"),
          txt(v(2.25, 4.2), "açık uç (P₀)", "n", { small: true }),
        ],
        readout: [step === 0 ? "P_gaz = P₀ + ρgΔh" : "P_gaz = P₀ − ρgΔh"],
      };
    },
  },
};

const kaldirma: Record<string, FigureDef> = {
  "Kaldırma alt ve üst basıncın farkından doğar": {
    caption:
      "Sıvıya batmış bloğun alt yüzü daha derindedir; alttan gelen yukarı kuvvet üstten gelen aşağı kuvvetten büyüktür. Farkları kaldırma kuvvetidir: Fk = ρ_sıvı·g·V_b.",
    alt: "Su içinde blok; üst yüzüne kısa aşağı oklar, alt yüzüne uzun yukarı oklar, yanda net yukarı kaldırma oku.",
    draw: () => ({
      els: [
        ...water(0, 0, 6, 5),
        tank(0, 0, 6, 5),
        rect(2, 1.5, 2, 1.6, "ink"),
        ...[2.4, 3, 3.6].flatMap((x) => [vec(v(x, 3.8), v(x, 3.15), { tone: "warn" }), vec(v(x, 0.4), v(x, 1.45), { tone: "a", bold: true })]),
        txt(v(4.1, 3.6), "üstten küçük", "e", { small: true, tone: "warn" }),
        txt(v(4.1, 0.6), "alttan büyük", "e", { small: true, tone: "a" }),
        ...force(v(6.6, 1.6), v(0, 1.4), "Fk", "a", "e"),
      ],
    }),
  },
  "Arşimet: yer değiştiren sıvının ağırlığı": {
    caption:
      "Aynı 2 L hacimli cisim tamamen batık: suda Fk = 1000·10·0,002 = 20 N, yağda (800 kg/m³) 16 N. Formüldeki yoğunluk cismin değil sıvınındır.",
    alt: "İki kap: solda suda, sağda yağda tamamen batık aynı boyutta blok; kaldırma okları 20 N ve 16 N.",
    draw: () => ({
      els: [
        ...water(0, 0, 3.5, 4),
        tank(0, 0, 3.5, 4),
        rect(1, 1, 1.5, 1.5, "ink"),
        ...force(v(1.75, 2.5), v(0, 1.25), "20 N", "a", "e"),
        txt(v(1.75, -0.5), "su", "c", { small: true }),
        poly([v(5, 0), v(8.5, 0), v(8.5, 4), v(5, 4)], { fill: "c", tone: "c", thin: true }),
        tank(5, 0, 3.5, 4),
        rect(6, 1, 1.5, 1.5, "ink"),
        ...force(v(6.75, 2.5), v(0, 1), "16 N", "a", "e"),
        txt(v(6.75, -0.5), "yağ", "c", { small: true }),
      ],
      readout: ["Fk = ρ_sıvı · g · V_b"],
    }),
  },
  "Serbest yüzmede önce Fk=G yaz": {
    caption:
      "Cismin yoğunluğunu değiştir: serbest yüzen homojen cisimde batan oran V_b/V = ρ_cisim/ρ_sıvı. Yoğunluk sıvınınkine ulaşınca cisim tamamen batar.",
    alt: "Su yüzeyinde yüzen blok; suyun altında kalan kısmı boyalı, oran sürgüyle değişiyor.",
    param: { label: "Cisim yoğunluğu (kg/m³)", min: 100, max: 1000, step: 50, init: 600 },
    draw: (rho) => {
      const frac = rho / 1000;
      const H = 2;
      const surface = 3;
      const bottom = surface - frac * H;
      return {
        els: [
          ...water(0, 0, 6, surface),
          tank(0, 0, 6, surface + 0.6),
          rect(2, bottom, 2, H, "ink"),
          poly([v(2, bottom), v(4, bottom), v(4, surface), v(2, surface)], { fill: "a", tone: "a", thin: true }),
          seg(v(0, surface), v(6, surface), { tone: "b" }),
        ],
        readout: [`V_b/V = ${rho}/1000 = ${fmt(frac, 2)}`],
      };
    },
  },
  "Askıda kalma ile dibe oturmayı ayır": {
    caption:
      "Üç cisim: yoğunluğu sudan küçük olan yüzer, eşit olan askıda kalır, büyük olan dibe oturur. Dipteki cisimde zemin de N kuvveti uygular: N + Fk = G.",
    alt: "Su dolu kapta üç blok: yüzeyde kısmen batık, ortada tamamen batık askıda ve dipte oturan; dipteki bloğa yukarı N oku.",
    draw: () => ({
      els: [
        ...water(0, 0, 9, 4),
        tank(0, 0, 9, 4),
        rect(0.8, 3.3, 1.6, 1.2, "ink"),
        rect(3.7, 1.6, 1.6, 1.2, "ink"),
        rect(6.6, 0, 1.6, 1.2, "ink"),
        txt(v(1.6, -0.5), "ρ < ρ_su: yüzer", "c", { small: true }),
        txt(v(4.5, -0.5), "ρ = ρ_su: askıda", "c", { small: true }),
        txt(v(7.4, -0.5), "ρ > ρ_su: dipte", "c", { small: true }),
        ...force(v(7.4, 0.6), v(0, 1.4), "N + Fk", "a", "e"),
      ],
    }),
  },
  "Dinamometre gerçek gerilmeyi okur": {
    caption:
      "Havada 20 N gelen cisim suya tamamen batırıldığında 8 N kaldırma görür; dinamometre T = G − Fk = 12 N gösterir. Ağırlık ve kütle değişmemiştir.",
    alt: "Dinamometreye asılı ve su içinde tamamen batık blok; bloğa aşağı 20 N ağırlık, yukarı 8 N kaldırma ve yukarı 12 N ip gerilmesi okları.",
    draw: () => ({
      els: [
        ...water(0, 0, 5, 3.5),
        tank(0, 0, 5, 3.5),
        seg(v(2.5, 6), v(2.5, 2.2)),
        rect(2.2, 5.4, 0.6, 1.2, "c"),
        txt(v(2.8, 6), "12 N", "e", { small: true, tone: "c" }),
        rect(1.8, 1, 1.4, 1.2, "ink"),
        ...force(v(2.1, 1.6), v(0, -1.5), "G = 20 N", "warn", "w"),
        ...force(v(2.9, 1.6), v(0, 0.9), "Fk = 8 N", "a", "e"),
      ],
      readout: ["T = 20 − 8 = 12 N"],
    }),
  },
  "Tam batık cismin derinliğini değiştirmek": {
    caption:
      "Aynı bloğu daha derine indir: üst ve alt basınçlar birlikte artar, fark ve batık hacim aynı kalır. Kaldırma kuvveti derinlikten bağımsızdır.",
    alt: "Su dolu kapta iki farklı derinlikte aynı blok; ikisinin üzerinde de aynı uzunlukta kaldırma oku.",
    draw: () => ({
      els: [
        ...water(0, 0, 6, 6),
        tank(0, 0, 6, 6),
        rect(0.8, 3.2, 1.4, 1.2, "ink"),
        rect(3.8, 0.6, 1.4, 1.2, "ink"),
        ...force(v(1.5, 4.4), v(0, 0.9), "Fk", "a", "e"),
        ...force(v(4.5, 1.8), v(0, 0.9), "Fk (aynı)", "a", "e"),
      ],
    }),
  },
  "Taşırma kabında başlangıç seviyesi önemlidir": {
    caption:
      "Ağzına kadar dolu kaba bırakılan cisim yüzüyorsa taşan suyun ağırlığı cismin ağırlığına eşittir; batıyorsa taşan su, cismin ağırlığından azdır.",
    alt: "Ağzına kadar dolu taşırma kabında yüzen blok; yan oluktan taşan su kaba akıyor.",
    draw: () => ({
      els: [
        ...water(0, 0, 4, 4),
        tank(0, 0, 4, 4),
        poly([v(4, 3.8), v(5.2, 3.4), v(5.2, 3.3), v(4, 3.6)], { fill: "b", tone: "b", thin: true }),
        poly([v(5.5, 0), v(7.5, 0), v(7.5, 1.6), v(5.5, 1.6)], { open: true }),
        rect(5.5, 0, 2, 0.8, "b"),
        rect(1.2, 3.2, 1.6, 1.2, "ink"),
        txt(v(6.5, -0.5), "taşan su: G kadar", "c", { small: true, tone: "b" }),
      ],
    }),
  },
};

const elektrik: Record<string, FigureDef> = {
  "Akım oku ile elektron oku ters olabilir": {
    caption:
      "Dış devrede konvansiyonel akım pilin + ucundan − ucuna doğru akar; elektronlar ters yönde sürüklenir. İkisi aynı yük akışının iki ayrı tarifidir.",
    alt: "Pil ve dirençten oluşan kapalı devre; dış tarafta saat yönünde akım okları, içte ters yönde elektron okları.",
    draw: () => ({
      els: [
        ...battery(v(0, 0), v(0, 3), "ε"),
        seg(v(0, 3), v(5, 3)),
        ...resistor(v(5, 3), v(5, 0), "R"),
        seg(v(5, 0), v(0, 0)),
        vec(v(1.8, 3.4), v(3.2, 3.4), { tone: "a", bold: true }),
        txt(v(2.5, 3.6), "akım I", "n", { small: true, tone: "a" }),
        vec(v(3.2, 2.6), v(1.8, 2.6), { tone: "b", bold: true }),
        txt(v(2.5, 2.3), "elektron", "s", { small: true, tone: "b" }),
      ],
    }),
  },
  "Ohm yasası bir elemanın koşullu davranışıdır": {
    caption:
      "Ohmik dirençte V = IR: V–I grafiği orijinden geçen doğrudur ve eğimi R'dir. R'yi değiştir; aynı akımda daha büyük direnç daha büyük gerilim ister.",
    alt: "Gerilim–akım grafiğinde orijinden geçen doğru; eğimi sürgüyle seçilen R; I = 2 A noktası işaretli.",
    param: { label: "R (Ω)", min: 1, max: 6, step: 0.5, init: 3 },
    draw: (R) => {
      const k = 0.4;
      return {
        els: [
          vec(v(0, 0), v(4.4, 0), { tone: "muted", thin: true }),
          vec(v(0, 0), v(0, 6), { tone: "muted", thin: true }),
          txt(v(4.4, 0), "I (A)", "se", { small: true, tone: "muted" }),
          txt(v(0, 6), "V (V)", "w", { small: true, tone: "muted" }),
          poly([v(0, 0), v(Math.min(4, 14 / R), Math.min(4, 14 / R) * R * k)], { open: true, bold: true, tone: "b" }),
          pt(v(2, 2 * R * k), `I = 2 A, V = ${fmt(2 * R)} V`, "nw", "a"),
        ],
        readout: [`Eğim = R = ${fmt(R)} Ω · V = ${fmt(R)}·2 = ${fmt(2 * R)} V`],
      };
    },
  },
  "Telin boyu ve kesit alanı farklı etki yapar": {
    caption:
      "R = ρL/A. Boyu iki katına çıkan tel iki kat direnç gösterir; çapı iki katına çıkan telin kesit alanı dört kat olduğundan direnci dörtte bire iner.",
    alt: "Üç tel: başlangıç teli; iki kat uzun tel; çapı iki kat kalın tel; yanlarında R, 2R ve R/4.",
    draw: () => ({
      els: [
        rect(0, 3, 3, 0.3, "c"),
        txt(v(3.3, 3.15), "L, A → R", "e", { small: true }),
        rect(0, 1.6, 6, 0.3, "c"),
        txt(v(6.3, 1.75), "2L, A → 2R", "e", { small: true, tone: "a" }),
        rect(0, 0, 3, 0.6, "c"),
        txt(v(3.3, 0.3), "L, çap 2 kat (A 4 kat) → R/4", "e", { small: true, tone: "b" }),
      ],
    }),
  },
  "Seri bağda aynı akım, paylaşılan gerilim": {
    caption:
      "12 V kaynağa seri 2 Ω ve 4 Ω: eşdeğer 6 Ω, akım 2 A her ikisinden de geçer. Gerilim dirençle orantılı paylaşılır: 4 V ve 8 V.",
    alt: "Pil, 2 ohm ve 4 ohm dirençlerinin seri bağlı olduğu tek halkalı devre; dirençlerin üzerinde 4 V ve 8 V yazıyor.",
    draw: () => ({
      els: [
        ...battery(v(0, 0), v(0, 3), "12 V"),
        seg(v(0, 3), v(1, 3)),
        ...resistor(v(1, 3), v(3.5, 3), "2 Ω · 4 V", "a"),
        ...resistor(v(3.5, 3), v(6, 3), "4 Ω · 8 V", "b"),
        seg(v(6, 3), v(6, 0)),
        seg(v(6, 0), v(0, 0)),
        vec(v(2.5, -0.4), v(3.5, -0.4), { tone: "c", bold: true }),
        txt(v(3, -0.6), "I = 2 A", "s", { small: true, tone: "c" }),
      ],
      readout: ["I = 12 / (2 + 4) = 2 A", "V₁ = 2·2 = 4 V, V₂ = 2·4 = 8 V"],
    }),
  },
  "Paralel bağda aynı iki düğüm, farklı kol akımları": {
    caption:
      "12 V kaynağa paralel 3 Ω ve 6 Ω: iki kolun gerilimi de 12 V. Kol akımları 4 A ve 2 A, ana akım 6 A, eşdeğer direnç 2 Ω (en küçük koldan da küçük).",
    alt: "Pil ve iki paralel kol: üst kolda 3 ohm ve 4 A, alt kolda 6 ohm ve 2 A; ana kolda 6 A.",
    draw: () => ({
      els: [
        ...battery(v(0, 0), v(0, 3), "12 V"),
        // Left node: battery + side joins both branches at x = 2 (y = 2…4).
        // The return wire runs along y = 0 from the right node only.
        seg(v(0, 3), v(2, 3)),
        seg(v(2, 3), v(2, 4)),
        ...resistor(v(2, 4), v(6, 4), "3 Ω · 4 A", "a"),
        ...resistor(v(2, 2), v(6, 2), "6 Ω · 2 A", "b"),
        seg(v(6, 4), v(6, 0)),
        seg(v(6, 0), v(0, 0)),
        seg(v(2, 2), v(2, 3)),
        pt(v(2, 3), undefined, "n"),
        pt(v(6, 2), undefined, "n"),
        vec(v(0.4, 3.4), v(1.6, 3.4), { tone: "c", bold: true }),
        txt(v(1, 3.6), "6 A", "n", { small: true, tone: "c" }),
      ],
      readout: ["I₁ = 12/3 = 4 A, I₂ = 12/6 = 2 A, ana akım 6 A", "1/R = 1/3 + 1/6 → R = 2 Ω"],
    }),
  },
  "Ölçüm aleti devreyi değiştirmesin": {
    caption:
      "Ampermetre (A) ölçülecek akımın yoluna seri, voltmetre (V) ölçülecek elemanın iki ucuna paralel bağlanır. İdealde ampermetrenin direnci 0, voltmetreninki sonsuzdur.",
    alt: "Pil, seri bağlı ampermetre ve direnç; direncin iki ucuna paralel bağlı voltmetre.",
    draw: () => ({
      els: [
        ...battery(v(0, 0), v(0, 3), "ε"),
        seg(v(0, 3), v(1.4, 3)),
        ...meter(v(1.72, 3), "A", "a"),
        seg(v(2.04, 3), v(3, 3)),
        ...resistor(v(3, 3), v(6, 3), "R"),
        seg(v(6, 3), v(6, 0)),
        seg(v(6, 0), v(0, 0)),
        seg(v(3, 3), v(3, 4.6)),
        seg(v(6, 3), v(6, 4.6)),
        seg(v(3, 4.6), v(4.18, 4.6)),
        ...meter(v(4.5, 4.6), "V", "c"),
        seg(v(4.82, 4.6), v(6, 4.6)),
        txt(v(1.72, 2.4), "seri", "s", { small: true, tone: "a" }),
        txt(v(4.5, 5.1), "paralel", "n", { small: true, tone: "c" }),
      ],
    }),
  },
};

export const physicsFiguresFluidsCircuits: Record<string, Record<string, FigureDef>> = {
  basinc,
  "sivilarin-kaldirma-kuvveti": kaldirma,
  "elektrik-akimi": elektrik,
};
