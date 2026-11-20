import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Biyoloji · Orta ve arka beyin. Şemalar özgün ve ölçekli değildir.
 * Yapı–işlev eşleşmeleri sınav ipucudur; tek bulgu klinik tanı vermez.
 */

const rect = (x0: number, x1: number, y: number, h: number, s: { fill?: Tone; tone?: Tone; thin?: boolean; dash?: boolean } = {}): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], s);
const ellipse = (cx: number, cy: number, rx: number, ry: number, n = 40): V[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return v(cx + rx * Math.cos(a), cy + ry * Math.sin(a));
  });

// 1 · İki sınıflama: beyin sapı ve arka beyin.
const MEMBERS = [
  { label: "Orta beyin", at: v(-1.9, 0), title: "Orta beyin · yalnız sapta", detail: ["Beyin sapının üst parçası; arka beyne ait değildir.", "Ani görsel/işitsel uyarana yönelme ve bazı göz hareketleri.", "“Sapta olup arka beyinde olmayan” sorusunun yanıtı."] },
  { label: "Pons", at: v(0, 0.55), title: "Pons · iki kümede", detail: ["Hem beyin sapında hem arka beyinde.", "Bağlantı bölgesi; soğanla birlikte solunum örüntüsüne katkı.", "Tek başına bütün solunumun tek merkezi değildir."] },
  { label: "Soğan", at: v(0, -0.55), title: "Omurilik soğanı · iki kümede", detail: ["Hem beyin sapında hem arka beyinde; ponsla omurilik arasında.", "Solunum, kalp-damar düzenlemesi, yutma ve öksürme refleksleri.", "Omurilikle aynı yapı değildir."] },
  { label: "Beyincik", at: v(1.9, 0), title: "Beyincik · yalnız arka beyinde", detail: ["Arka beynin parçasıdır ama beyin sapına sayılmaz.", "Duruş, denge ve hareketin zamanlaması/uyumu.", "Sapa yakın olması sapın üyesi olduğu anlamına gelmez."] },
];

const venn: FigureDef = {
  caption:
    "İki ayrı sınıflama üst üste gelir: beyin sapı = orta beyin + pons + soğan; arka beyin = pons + soğan + beyincik. Bir yapıya tıkla: hangi kümede olduğu ve ayırt edici görevi açılır.",
  alt: "İki kesişen oval. Soldaki beyin sapı, sağdaki arka beyin. Yalnız solda orta beyin, kesişimde pons ve omurilik soğanı, yalnız sağda beyincik.",
  picks: MEMBERS.map((m) => ({ label: m.label, title: m.title, detail: m.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [
      poly(ellipse(-0.95, 0, 2.0, 1.45), { fill: "c", tone: "c", smooth: true }),
      poly(ellipse(0.95, 0, 2.0, 1.45), { fill: "b", tone: "b", smooth: true }),
      txt(v(-1.6, 1.85), "Beyin sapı", "c", { small: true, bold: true, tone: "c" }),
      txt(v(1.6, 1.85), "Arka beyin", "c", { small: true, bold: true, tone: "b" }),
    ];
    MEMBERS.forEach((m, i) => els.push(txt(m.at, m.label, "c", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-3.3, 2.3), " ", "c"), txt(v(3.3, -1.7), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? MEMBERS[pick].detail[0] : "Bir yapıya tıkla ya da aşağıdan seç.",
        "Kesişim (iki grupta birden): pons ve omurilik soğanı. Konum ve işlev ayrı ölçütlerdir.",
      ],
    };
  },
};

// 2 · Beyincik: komut, geri bildirim, karşılaştırma.
const loop: FigureDef = {
  caption:
    "Beyincik komutu yalnız kopyalamaz: motor komutun kopyasını kas–eklem, iç kulak ve gözden gelen geri bildirimle karşılaştırır, zamanlama ve düzeltmeye katılır. Koordinasyon bozukluğu, kasın kuvvet üretememesiyle aynı şey değildir.",
  alt: "Motor korteksten kasa giden komut oku; komutun bir kopyası beyinciğe gidiyor. Kastan, iç kulaktan ve gözden gelen geri bildirim de beyinciğe giriyor. Beyincikten düzeltme oku motor yola dönüyor.",
  steps: ["Komut", "Geri bildirim", "Karşılaştır, düzelt"],
  draw: (_v, step) => {
    const box = (x: number, y: number, w: number, label: string, tone: Tone, on: boolean): El[] => [
      rect(x - w, x + w, y, 0.42, { fill: on ? tone : undefined, tone: on ? "ink" : "muted", thin: true }),
      txt(v(x, y), label, "c", { small: true, tone: on ? "ink" : "muted" }),
    ];
    const els: El[] = [
      ...box(0, 1.6, 1.5, "Motor korteks", "c", true),
      ...box(5.6, 1.6, 0.9, "Kas", "muted", true),
      ...box(2.8, -0.8, 1.2, "Beyincik", "b", step >= 0),
      ...box(5.6, -2.4, 1.6, "Kas–eklem · iç kulak · göz", "muted", step >= 1),
    ];
    els.push(vec(v(1.55, 1.6), v(4.65, 1.6), { tone: "a", bold: true }), txt(v(3.1, 2.0), "komut", "c", { small: true, tone: "a" }));
    els.push(vec(v(1.3, 1.15), v(3.1, -0.35), { tone: "b", dash: true }), txt(v(2.5, 0.55), "kopya", "e", { small: true, tone: "b" }));
    if (step >= 1) els.push(vec(v(4.2, -2.0), v(3.4, -1.25), { tone: "c" }), txt(v(4.4, -1.35), "geri bildirim", "e", { small: true, tone: "c" }));
    if (step >= 2) els.push(vec(v(2.0, -0.35), v(0.2, 1.15), { tone: "warn", bold: true }), txt(v(0.85, 0.2), "düzeltme", "w", { small: true, tone: "warn" }));
    els.push(txt(v(-2.6, 2.5), " ", "c"), txt(v(7.4, -3.0), " ", "c"));
    return {
      els,
      readout: [
        step === 0 ? "Korteks hareketi başlatır; komutun kopyası beyinciğe de gider." : step === 1 ? "Gerçek hareketin bilgisi kas–eklem, iç kulak ve gözden gelir." : "Beyincik amaç ile gerçekleşeni karşılaştırır; düzeltme motor yollar üzerinden zamanlama ve uyuma yansır.",
        "Kas kuvveti var, hedef görülüyor ama zamanlama bozuk: beyincik katkısıyla uyumlu, kesin tanı değil.",
      ],
    };
  },
};

// 3 · Olay → merkez.
const EVENTS = [
  { ev: "Ani sese baş çevirme", c: "Orta beyin", why: ["Yönelme refleksi devresi.", "Sesin ne olduğunu bilinçli tanıma ayrı basamaktır (temporal korteks)."] },
  { ev: "Sesi bilinçli tanıma", c: "Temporal korteks", why: ["Kortikal yorum; uç beyin.", "Aynı uyaran, farklı soru: yönelme mi, tanıma mı?"] },
  { ev: "Yutma, öksürme", c: "Omurilik soğanı", why: ["Koruyucu refleksler beyin sapında düzenlenir.", "Lokmayı istemli başlatmak bütün olayı kortekse vermez."] },
  { ev: "Diz refleksi", c: "Omurilik", why: ["Ana devre omurilik düzeyinde (2017 LYS-2 Biyoloji 30).", "“Refleks” sözcüğü tek bir merkezin adı değildir."] },
  { ev: "Dar çizgide yürüme", c: "Beyincik", why: ["Duruş ve hareketin uyumu/zamanlaması.", "Su ya da sıcaklık dengesi değil."] },
  { ev: "Su dengesi, susama", c: "Hipotalamus", why: ["İç ortam dengesi; ara beyin.", "“Denge” sözcüğü tek başına beyincik seçtirmez."] },
];

const events: FigureDef = {
  caption:
    "Aynı kişide peş peşe olan olaylar farklı merkezlerle eşleşir. Önce olayın türünü yaz: yönelme, kortikal yorum, koruyucu refleks, omurilik refleksi, koordinasyon ya da iç ortam. Bir olaya tıkla.",
  alt: "Altı satır: ani sese baş çevirme orta beyin; sesi tanıma temporal korteks; yutma ve öksürme omurilik soğanı; diz refleksi omurilik; dar çizgide yürüme beyincik; su dengesi hipotalamus.",
  picks: EVENTS.map((e) => ({ label: e.ev, title: `${e.ev} → ${e.c}`, detail: e.why })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    EVENTS.forEach((e, i) => {
      const y = -i * 0.85;
      const sel = pick === i;
      if (sel) els.push(rect(-0.2, 7.6, y, 0.36, { fill: "a", tone: "a", thin: true }));
      els.push(txt(v(0, y), e.ev, "e", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(7.4, y), e.c, "w", { small: true, tone: i === 1 || i === 5 ? "muted" : "c" }));
    });
    els.push(txt(v(-0.4, 0.6), " ", "c"), txt(v(7.8, -4.8), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? `${EVENTS[pick].c}: ${EVENTS[pick].why[0]}` : "Bir olaya tıkla ya da aşağıdan seç.",
        "Refleks merkezi ile bilinçli algı aynı değildir; olayları tek “hareket” başlığında çözme.",
      ],
    };
  },
};

// 4 · Beyin sapı yığını (yan görünüş).
const STACK = [
  { label: "Orta beyin", y: 1.5, title: "Orta beyin", detail: ["Yönelme refleksleri, bazı göz hareketleri, tonusa katkı.", "Kas tonusu: dinlenmede iskelet kasının temel gerginliği."] },
  { label: "Pons", y: 0.5, title: "Pons", detail: ["Bağlantı bölgesi: beyincik ve diğer merkezlerle sinyal alışverişi.", "Soğanla birlikte solunum örüntüsünün düzenlenmesi."] },
  { label: "Omurilik soğanı", y: -0.5, title: "Omurilik soğanı (medulla)", detail: ["Solunum ve kalp-damar yanıtlarının temel düzenlenmesi.", "Yutma, öksürme refleksleri.", "İstemli motor yolların önemli bir bölümü burada çaprazlanır; hepsi değil."] },
  { label: "Omurilik", y: -1.5, title: "Omurilik", detail: ["Beyin sapının altında devam eder; arka beyne ait değildir.", "Diz refleksinin ana devresi burada."] },
  { label: "Beyincik", y: 0.2, title: "Beyincik", detail: ["Ponsun arkasında; arka beyin, sap değil.", "Duruş ve hareket koordinasyonu."] },
];

const stack: FigureDef = {
  caption:
    "Yan görünüşte beyin sapı (şematik): yukarıdan aşağı orta beyin, pons, omurilik soğanı; altta omurilik. Beyincik ponsun arkasındadır. Bir yapıya tıkla.",
  alt: "Dikey yığın: orta beyin, pons, omurilik soğanı ve omurilik üst üste. Ponsun sağında arkada beyincik ovali.",
  picks: STACK.map((s) => ({ label: s.label, title: s.title, detail: s.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    STACK.slice(0, 4).forEach((s, i) => {
      const w = i === 1 ? 0.95 : i === 3 ? 0.45 : 0.7;
      els.push(rect(-w, w, s.y, 0.45, { fill: pick === i ? "a" : i === 3 ? "muted" : "c", tone: pick === i ? "a" : "ink", thin: true }));
      els.push(txt(v(-1.25, s.y), s.label, "w", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i }));
    });
    els.push(poly(ellipse(2.0, 0.2, 0.9, 0.7), { fill: pick === 4 ? "a" : "b", tone: pick === 4 ? "a" : "b", smooth: true }));
    els.push(txt(v(2.0, 1.15), "Beyincik", "c", { small: true, bold: pick === 4, tone: pick === 4 ? "a" : "b", pick: 4 }));
    els.push(seg(v(0.95, 0.5), v(1.15, 0.4), { thin: true, tone: "muted" }));
    els.push(txt(v(2.0, -1.2), "arka →", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-4.2, 2.2), " ", "c"), txt(v(3.2, -2.2), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? STACK[pick].detail[0] : "Bir yapıya tıkla ya da aşağıdan seç.",
        "Solunumun değişmesi tek başına pons mu soğan mı olduğunu kanıtlamaz; yer ve ek ölçüm gerekir.",
      ],
    };
  },
};

export const biologyFiguresHindbrain: Record<string, Record<string, FigureDef>> = {
  "sinir-sistemi-orta-arka-beyin": {
    "İki sınıflandırma aynı parçaları aynı biçimde gruplayamaz": venn,
    "Beyincik komutu kopyalamakla kalmaz, karşılaştırmaya katılır": loop,
    "Omurilik soğanı yaşamsal otomatik düzenlemeye katılır": stack,
    "Refleks merkezi ile bilinçli algı aynı değildir": events,
  },
};
