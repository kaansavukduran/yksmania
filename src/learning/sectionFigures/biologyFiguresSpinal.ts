import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Biyoloji · Omurilik. Şemalar ölçekli değildir. Kesitte arka (dorsal)
 * yukarıda, ön (ventral) aşağıdadır. Gecikme hesabı özgün öğretim verisidir,
 * gerçek insan ölçümü değildir.
 */

const rect = (x0: number, x1: number, y: number, h: number, s: { fill?: Tone; tone?: Tone; thin?: boolean; dash?: boolean } = {}): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], s);
const ellipse = (cx: number, cy: number, rx: number, ry: number, n = 40): V[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return v(cx + rx * Math.cos(a), cy + ry * Math.sin(a));
  });

// 1 · Enine kesit.
const PARTS = [
  { label: "Boz madde", title: "Boz (gri) madde · içte", detail: ["Kelebek/H biçimli iç bölge: hücre gövdeleri ve yerel bağlantılar.", "Arka ve ön çıkıntılarına boynuz denir.", "Uç beyin korteksinde boz madde dıştadır; omurilikte içtedir."] },
  { label: "Ak madde", title: "Ak madde · dışta", detail: ["Ağırlıkla miyelinli akson yolları.", "Beyne çıkan duyusal ve beyinden inen motor yolları taşır.", "Kesitte boz maddeyi çevreler."] },
  { label: "Merkez kanal", title: "Merkez kanal", detail: ["Boz maddenin ortasındaki kanal; BOS içerir.", "Omurilik omurlar, zarlar ve BOS ile korunur."] },
  { label: "Arka kök", title: "Arka kök · duyusal giriş", detail: ["Reseptörden gelen bilgi omuriliğe buradan girer.", "Arka kök kesilirse o bölgenin uyarısı merkeze ulaşamaz.", "Arka boynuz (boz maddenin çıkıntısı) ile arka kök aynı yapı değildir."] },
  { label: "Gangliyon", title: "Arka kök gangliyonu", detail: ["Arka kök üzerindeki şişkinlik.", "Duyu nöronlarının hücre gövdeleri buradadır.", "Somatik motor nöron gövdeleri burada değil, ön boynuzdadır."] },
  { label: "Ön kök", title: "Ön kök · motor çıkış", detail: ["Ön boynuzdaki motor nöronların aksonları buradan çıkar.", "Ön kök kesilirse o kasa motor komut gidemez.", "Duyusal giriş yolu olarak seçilmez."] },
  { label: "Karma sinir", title: "Omurilik siniri · karma", detail: ["Arka ve ön kök birleşince oluşur.", "Ayrı duyu ve motor liflerini birlikte taşır.", "“Karma” tek nöronun iki görevi olduğu anlamına gelmez."] },
];

const section: FigureDef = {
  caption:
    "Omurilik enine kesiti (şematik; arka yukarıda, ön aşağıda). Bir yapının adına tıkla: işi ve en sık karıştırılan noktası açılır. Kökler yalnız sağ tarafta adlandırıldı; sol taraf aynısıdır.",
  alt: "Oval omurilik kesiti. Ortada H biçimli boz madde ve merkez kanal, çevresinde ak madde. Her iki yanda yukarıdan arka kök ve üzerinde gangliyon, aşağıdan ön kök çıkıyor; kökler dışarıda birleşip omurilik sinirini oluşturuyor.",
  picks: PARTS.map((p) => ({ label: p.label, title: p.title, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const on = (i: number) => pick === i;
    const els: El[] = [];
    els.push(poly(ellipse(0, 0, 3.0, 2.2), { fill: on(1) ? "a" : "muted", tone: on(1) ? "a" : "muted", smooth: true }));
    const H: V[] = [v(-0.35, 0.35), v(-1.4, 1.6), v(-1.75, 1.2), v(-0.9, 0.1), v(-1.7, -1.0), v(-1.2, -1.45), v(-0.35, -0.4), v(0.35, -0.4), v(1.2, -1.45), v(1.7, -1.0), v(0.9, 0.1), v(1.75, 1.2), v(1.4, 1.6), v(0.35, 0.35)];
    els.push(poly(H, { fill: on(0) ? "a" : "b", tone: on(0) ? "a" : "b", smooth: true }));
    els.push(circle(v(0, 0), 0.14, { fill: on(2) ? "a" : "ink", tone: on(2) ? "a" : "ink" }));
    for (const sx of [1, -1]) {
      const dr: Tone = sx === 1 && on(3) ? "a" : "c";
      const vr: Tone = sx === 1 && on(5) ? "a" : "warn";
      const sn: Tone = sx === 1 && on(6) ? "a" : "ink";
      els.push(poly([v(sx * 1.55, 1.45), v(sx * 2.8, 1.9), v(sx * 3.9, 1.4)], { open: true, smooth: true, tone: dr, bold: true }));
      els.push(poly(ellipse(sx * 3.4, 1.7, 0.42, 0.26), { fill: sx === 1 && on(4) ? "a" : "c", tone: sx === 1 && on(4) ? "a" : "c", smooth: true }));
      els.push(poly([v(sx * 1.45, -1.25), v(sx * 2.8, -1.4), v(sx * 3.9, -0.9)], { open: true, smooth: true, tone: vr, bold: true }));
      els.push(seg(v(sx * 3.9, 1.4), v(sx * 4.4, 0.25), { bold: true, tone: sn }));
      els.push(seg(v(sx * 3.9, -0.9), v(sx * 4.4, 0.25), { bold: true, tone: sn }));
      els.push(seg(v(sx * 4.4, 0.25), v(sx * 5.4, 0.25), { bold: true, tone: sn }));
    }
    els.push(
      txt(v(0, 1.0), "Boz madde", "c", { small: true, bold: on(0), tone: on(0) ? "a" : "ink", pick: 0 }),
      txt(v(2.2, -0.25), "Ak madde", "c", { small: true, bold: on(1), tone: on(1) ? "a" : "ink", pick: 1 }),
      txt(v(-1.5, -2.65), "Merkez kanal", "c", { small: true, bold: on(2), tone: on(2) ? "a" : "ink", pick: 2 }),
      txt(v(1.9, 2.5), "Arka kök", "c", { small: true, bold: on(3), tone: on(3) ? "a" : "c", pick: 3 }),
      txt(v(3.6, 2.35), "Gangliyon", "e", { small: true, bold: on(4), tone: on(4) ? "a" : "c", pick: 4 }),
      txt(v(2.6, -2.0), "Ön kök", "c", { small: true, bold: on(5), tone: on(5) ? "a" : "warn", pick: 5 }),
      txt(v(4.5, 0.7), "Karma sinir", "e", { small: true, bold: on(6), tone: on(6) ? "a" : "ink", pick: 6 }),
      txt(v(0, 2.75), "arka", "c", { small: true, tone: "muted" }),
      txt(v(0.6, -2.65), "ön", "c", { small: true, tone: "muted" }),
    );
    els.push(seg(v(-0.75, -2.45), v(-0.1, -0.15), { thin: true, tone: "muted" }));
    els.push(txt(v(-6.3, 3.1), " ", "c"), txt(v(6.3, -3.0), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? PARTS[pick].detail[0] : "Bir yapıya tıkla ya da aşağıdan seç.",
        "Kural: arka kök = giriş (duyu), ön kök = çıkış (motor); omurilikte boz içte, ak dışta.",
      ],
    };
  },
};

// 2 · Diz refleksi: ana kol ve yan kol.
const ARMS = [
  { label: "Ana kol", title: "Ana kol · tek sinaps", detail: ["Kas iğciği → duyu nöronu → ekstansör motor nöron → ön uyluk kası kasılır.", "Duyu ile motor nöron arasında doğrudan bir sinaps vardır.", "2017 LYS-2 Biyoloji 30: yanıtın genel adı refleks."] },
  { label: "Yan kol", title: "Yan kol · ara nöronla", detail: ["Duyu lifinin bir dalı baskılayıcı ara nöronla sinaps yapar.", "Ara nöron, karşıt (fleksör) kasın motor nöronunu baskılar: iki sinaps.", "Ara nöron var diye ana kolun tek sinapslı olduğu silinmez."] },
];

const knee: FigureDef = {
  caption:
    "Diz refleksi devresi (şematik). Sinapsı sayarken önce hangi yolu izlediğini seç. Bir kola tıkla: o yoldaki sinapslar vurgulanır.",
  alt: "Solda kas iğciğinden gelen duyu nöronu omuriliğe giriyor. Üst yolda doğrudan ekstansör motor nörona bağlanıyor. Alt yolda bir ara nörona, ara nöron da fleksör motor nörona bağlanıyor.",
  picks: ARMS.map((a) => ({ label: a.label, title: a.title, detail: a.detail })),
  draw: (_v, _s, pick = -1) => {
    const A: Tone = pick === 0 ? "a" : "ink";
    const B: Tone = pick === 1 ? "a" : "ink";
    const els: El[] = [
      rect(2.0, 5.0, 0, 1.9, { fill: "b", tone: "b", thin: true }),
      txt(v(3.5, 2.25), "omurilik", "c", { small: true, tone: "b" }),
      txt(v(-0.1, 0.4), "kas iğciği", "c", { small: true }),
      vec(v(0.6, 0), v(2.6, 0), { bold: true, tone: pick === -1 ? "c" : "c" }),
      txt(v(1.5, -0.4), "duyu n.", "c", { small: true, tone: "c" }),
      seg(v(2.6, 0), v(3.2, 0.9), { tone: A, bold: pick === 0 }),
      circle(v(3.25, 0.95), 0.1, { fill: A, tone: A }),
      vec(v(3.4, 0.95), v(6.4, 0.95), { tone: A, bold: pick === 0 }),
      txt(v(6.6, 0.95), "ekstansör kasılır", "e", { small: true, tone: A }),
      seg(v(2.6, 0), v(3.0, -0.9), { tone: B, bold: pick === 1 }),
      circle(v(3.05, -0.95), 0.1, { fill: B, tone: B }),
      circle(v(3.6, -0.95), 0.22, { tone: B, fill: pick === 1 ? "a" : undefined }),
      seg(v(3.82, -0.95), v(4.3, -0.95), { tone: B, bold: pick === 1 }),
      circle(v(4.35, -0.95), 0.1, { fill: B, tone: B }),
      vec(v(4.5, -0.95), v(6.4, -0.95), { tone: B, bold: pick === 1, dash: true }),
      txt(v(6.6, -0.95), "fleksör baskılanır", "e", { small: true, tone: B }),
      txt(v(3.3, -1.5), "ara n.", "c", { small: true, tone: B }),
      txt(v(3.25, 1.4), "sinaps", "c", { small: true, tone: A, pick: 0 }),
      txt(v(4.6, -1.5), "sinaps ×2", "e", { small: true, tone: B, pick: 1 }),
      txt(v(-1.2, 2.6), " ", "c"), txt(v(10.4, -2.1), " ", "c"),
    ];
    return {
      els,
      readout: [
        pick === 0 ? "Ana kol: 1 sinaps (duyu → motor)." : pick === 1 ? "Yan kol: 2 sinaps (duyu → ara → motor), karşıt kası gevşetir." : "Bir kola tıkla: hangi yolda kaç sinaps var?",
        "Çizimdeki bütün hücreleri tek seri yol gibi sayma; her refleks aynı devreyi izlemez.",
      ],
    };
  },
};

// 3 · Gecikme: her yol ayrı L/v.
const LD = 0.6, LM = 0.8, VM = 40, SYN = 2;
const delay: FigureDef = {
  caption:
    "Özgün öğretim modeli: duyu yolu 0,6 m, motor yolu 0,8 m ve 40 m/s, merkezî sinaps 2 ms; kasın mekanik gecikmesi ihmal. Duyu hızını değiştir: her yolun süresi ayrı t = L/v ile bulunur, sonra gecikme eklenir.",
  alt: "Üç parçalı yatay çubuk: duyu süresi, sinaps gecikmesi ve motor süresi uç uca. Duyu hızı arttıkça ilk parça kısalıyor.",
  param: { label: "Duyu hızı", min: 20, max: 60, step: 5, init: 30, unit: " m/s", plain: true },
  draw: (vd) => {
    const td = (LD / vd) * 1000, tm = (LM / VM) * 1000, tot = td + SYN + tm;
    const K = 0.16;
    const f = (x: number) => x.toFixed(1).replace(".", ",").replace(/,0$/, "");
    const x1 = td * K, x2 = x1 + SYN * K, x3 = x2 + tm * K;
    const els: El[] = [
      rect(0, x1, 0, 0.35, { fill: "c", tone: "c" }),
      rect(x1, x2, 0, 0.35, { fill: "warn", tone: "warn" }),
      rect(x2, x3, 0, 0.35, { fill: "b", tone: "b" }),
      txt(v(x1 / 2, 0.75), `duyu ${f(td)} ms`, "c", { small: true, tone: "c" }),
      txt(v(x2 + (x3 - x2) / 2, 0.75), `motor ${f(tm)} ms`, "c", { small: true, tone: "b" }),
      txt(v((x1 + x2) / 2, -0.75), `sinaps ${SYN} ms`, "c", { small: true, tone: "warn" }),
      txt(v(x3 + 0.3, 0), `= ${f(tot)} ms`, "e", { bold: true }),
      txt(v(-0.3, 1.3), " ", "c"), txt(v(((LD / 20) * 1000 + SYN + (LM / VM) * 1000) * K + 3.0, -1.2), " ", "c"),
    ];
    return {
      els,
      readout: [
        `Duyu: 0,6 / ${vd} = ${f(td)} ms · motor: 0,8 / 40 = ${f(tm)} ms · toplam ${f(td)} + ${SYN} + ${f(tm)} = ${f(tot)} ms.`,
        "Mesafeleri toplayıp ortalama hıza bölme: hızlar farklıysa yanlış sonuç verir. Birim: m ÷ (m/s) = s; 0,02 s = 20 ms.",
      ],
    };
  },
};

// 4 · Kesinti: üç ayrı sonuç.
const CASES = [
  { name: "Sağlam", cut: -1, sense: "var", reflex: "var", direct: "açık" },
  { name: "Arka kök kesik", cut: 0, sense: "yok", reflex: "yok", direct: "açık ama bu uyarıyla tetiklenmez" },
  { name: "Ön kök kesik", cut: 1, sense: "var", reflex: "yok", direct: "kesik" },
];

const lesion: FigureDef = {
  caption:
    "Kesinti sorusunda üç sonucu ayrı sor: uyarı bilinçli fark edilir mi (duyum), deri uyarısıyla refleks olur mu, omurilikten kasa giden motor yol açık mı? Adımlarda kesinin yeri değişir.",
  alt: "Reseptörden arka köke, omuriliğe, ön köke ve kasa giden yol; omurilikten beyne çıkan yol. Seçilen durumda kesik kök üzerinde çarpı işareti var.",
  steps: CASES.map((c) => c.name),
  draw: (_v, step) => {
    const c = CASES[step];
    const els: El[] = [
      rect(2.6, 4.6, 0, 0.8, { fill: "b", tone: "b", thin: true }),
      txt(v(3.6, 0), "omurilik", "c", { small: true }),
      txt(v(0, 0.95), "reseptör", "c", { small: true }),
      vec(v(0.4, 0.5), v(2.6, 0.5), { tone: c.cut === 0 ? "muted" : "c", bold: true }),
      txt(v(1.5, 0.95), "arka kök", "c", { small: true, tone: "c" }),
      vec(v(4.6, -0.5), v(6.8, -0.5), { tone: c.cut === 1 ? "muted" : "warn", bold: true }),
      txt(v(5.7, -0.95), "ön kök", "c", { small: true, tone: "warn" }),
      txt(v(7.4, -0.5), "kas", "c", { small: true }),
      vec(v(3.6, 0.8), v(3.6, 2.0), { tone: c.cut === 0 ? "muted" : "c" }),
      txt(v(3.6, 2.35), "beyin (duyum)", "c", { small: true }),
    ];
    if (c.cut === 0) els.push(txt(v(1.5, 0.5), "✗", "c", { bold: true, tone: "warn" }));
    if (c.cut === 1) els.push(txt(v(5.4, -0.5), "✗", "c", { bold: true, tone: "warn" }));
    els.push(txt(v(-0.9, 2.8), " ", "c"), txt(v(8.2, -1.4), " ", "c"));
    return {
      els,
      readout: [
        `${c.name}: duyum ${c.sense} · deri uyarısıyla refleks ${c.reflex} · omurilikten kasa motor yol ${c.direct}.`,
        c.cut === 1 ? "Refleks yok diye duyumun da yok olduğunu çıkarma." : c.cut === 0 ? "Doğrudan motor uyarı çıkışı sınar; girişin sağlam olduğunu göstermez." : "Önce kesinin hangi yöndeki lifleri kestiğini yaz.",
      ],
    };
  },
};

export const biologyFiguresSpinal: Record<string, Record<string, FigureDef>> = {
  "sinir-sistemi-omurilik": {
    "Omurilik içindeki doku dağılımını oku": section,
    "Tek sinapslı örnekte sayılanları açıkça tanımla": knee,
    "Gecikmeyi parçalara ayırarak hesapla": delay,
    "Kesinti sorusunda üç ayrı sonucu sorgula": lesion,
  },
};
