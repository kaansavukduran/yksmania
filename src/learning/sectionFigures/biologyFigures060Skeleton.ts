import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, PL, R, S, T, bw, chain, lead, mk, tableFig } from "./biologyFigures060Kit";

/*
 * AYT Biyoloji · Kemik, kıkırdak ve eklem, dil ve burun (Forge060). Bütün
 * anatomik çizimler nitel öğretim şemasıdır ve ölçekli değildir. Sayılar
 * yalnız bölüm metnindeki tipik yetişkin iskelet sayımından gelir.
 */

/* ---------------- Kemik ---------------- */

const composite = mk({
  caption:
    "Kemik bir kompozittir (nitel şema, ölçekli değil): kollajen başta olmak üzere organik matriks esneklik ve çekmeye dayanım, kalsiyum-fosfat içeren mineral kristaller sertlik ve basınca dayanım katkısı verir. Birini ötekinin yerine koymak mekanik işlevi eksik açıklar.",
  alt: "Solda organik matriks kutusu, sağda mineral bileşen kutusu; ikisinden aşağıdaki kemik kompoziti kutusuna ok iner. Her bileşenin altında katkı verdiği dayanım türü yazılı.",
  h: 300,
  draw: () => {
    const els: El[] = [
      ...B(134, 40, "Organik matriks\n(özellikle kollajen)", { tone: "c", fill: "c", bold: true }),
      ...B(398, 40, "Mineral bileşen\n(kalsiyum-fosfat)", { tone: "warn", fill: "warn", bold: true }),
      T(134, 108, "esneklik", "c", { tone: "c" }),
      T(134, 134, "çekmeye dayanım", "c", { tone: "c" }),
      T(398, 108, "sertlik", "c", { tone: "warn" }),
      T(398, 134, "basınca dayanım", "c", { tone: "warn" }),
      A(150, 152, 238, 222, "c"),
      A(382, 152, 294, 222, "warn"),
      ...B(266, 250, "Kemik: birlikte örgütlenmiş kompozit", { bold: true }),
    ];
    return { els, readout: ["İki bileşen ayrı görevler taşır; kemik ikisinin birlikte örgütlenmesidir.", "Yalnız mineral miktarından kişinin kırılma kuvveti hesaplanamaz: lif düzeni, mikro yapı ve geometri de önemlidir."] };
  },
});

const BAL = [
  { name: "Denge", tilt: 0, txt: "Yapım ve yıkım birlikte sürer; canlı doku böyle düzenlenir." },
  { name: "Yıkım artar", tilt: 18, txt: "Yapım aynı kalırken yıkım artarsa net değişim kayıp yönüne kayabilir." },
  { name: "Yapım baskın", tilt: -18, txt: "Yapım yıkımdan fazlaysa net değişim kazanç yönündedir; bu bir klinik sonuç değildir." },
];
const cells = mk({
  caption:
    "Yapan, yıkan ve sürdüren hücreler (nitel şema, ölçekli değil): osteoblast matriks yapımına, osteoklast yıkıma katılır; lakündeki osteosit dokuyu sürdürür ve mekanik çevreyi algılar. Terazi net değişimi gösterir; hormonlar, beslenme, yüklenme ve yaş bu dengeyi etkileyebilir.",
  alt: "Üstte üç hücre kutusu: osteoblast yapım, osteosit sürdürme ve algılama, osteoklast yıkım. Altta bir terazi: sol kefede yapım, sağ kefede yıkım. Adımlara göre terazi dengede, yıkım yönüne ya da yapım yönüne eğik.",
  h: 330,
  steps: BAL.map((b) => b.name),
  draw: (_v, step) => {
    const b = BAL[step];
    const els: El[] = [
      ...B(80, 40, "Osteoblast\nyapım", { tone: "c", fill: "c", w: 148 }),
      ...B(266, 40, "Osteosit, lakünde:\nsürdürür, algılar", { w: 212 }),
      ...B(452, 40, "Osteoklast\nyıkım", { tone: "warn", fill: "warn", w: 148 }),
    ];
    const cx = 266;
    const cy = 200;
    const a = (b.tilt * Math.PI) / 180;
    const dx = 150 * Math.cos(a);
    const dy = 150 * Math.sin(a);
    const l: [number, number] = [cx - dx, cy - dy];
    const r: [number, number] = [cx + dx, cy + dy];
    els.push(PL([[cx, 200], [cx - 30, 300], [cx + 30, 300]], { tone: "muted" }), L(l[0], l[1], r[0], r[1], { bold: true }));
    els.push(L(l[0], l[1], l[0], l[1] + 40, { thin: true }), L(r[0], r[1], r[0], r[1] + 40, { thin: true }));
    els.push(...B(l[0], l[1] + 58, "yapım", { tone: "c", fill: "c" }), ...B(r[0], r[1] + 58, "yıkım", { tone: "warn", fill: "warn" }));
    els.push(A(80, 80, l[0], l[1] + 34, "c", { dash: true }), A(452, 80, r[0], r[1] + 34, "warn", { dash: true }));
    if (b.tilt !== 0) els.push(T(cx, 132, b.tilt > 0 ? "net: kayıp yönü" : "net: kazanç yönü", "c", { bold: true, tone: b.tilt > 0 ? "warn" : "c" }));
    else els.push(T(cx, 132, "net değişim yok", "c", { bold: true }));
    return { els, readout: [b.txt, "Tek bir hücre adının geçmesi kişinin gelecekteki kemik miktarını belirlemez."] };
  },
});

const osteon = mk({
  caption:
    "Sık kemikte iki osteon (nitel şema, ölçekli değil): lameller merkezdeki Havers kanalını halka hâlinde sarar; kanalda damar ve sinir uzunlamasına geçer, Volkmann kanalı yan bağlantı kurar. Osteositler lakünlerdedir ve ince kanaliküllerle ilişkilidir. Halka hücre değildir; merkez kanal da ilik boşluğu değildir.",
  alt: "Yan yana iki iç içe halka dizisi. Her dizinin ortasında küçük Havers kanalı, halkalar üzerinde lakün noktaları ve bunlardan çıkan ince kanalikül çizgileri. İki kanal arasında yatay Volkmann kanalı.",
  h: 360,
  draw: () => {
    const els: El[] = [];
    const centers: [number, number][] = [[150, 190], [382, 190]];
    for (const [x, y] of centers) {
      for (const r of [28, 48, 68, 88]) els.push(C(x, y, r, { tone: "muted", thin: true }));
      els.push(C(x, y, 14, { tone: "a", fill: "a", bold: true }));
      for (const [r, k] of [[38, 6], [58, 8], [78, 10]] as const)
        for (let i = 0; i < k; i++) {
          const t = (i / k) * 2 * Math.PI + r;
          const px = x + r * Math.cos(t);
          const py = y + r * Math.sin(t);
          els.push(C(px, py, 3.5, { tone: "c", fill: "c" }));
          els.push(L(px, py, x + (r - 9) * Math.cos(t), y + (r - 9) * Math.sin(t), { thin: true, tone: "c" }));
        }
    }
    els.push(R(164, 184, 368, 196, { tone: "b", fill: "b" }));
    els.push(...lead(150, 190, 170, 30, "Havers kanalı: damar, sinir", "a", true));
    els.push(...lead(266, 190, 250, 64, "Volkmann kanalı", "b", true));
    els.push(...lead(382 + 58 * Math.cos(58), 190 + 58 * Math.sin(58), 300, 332, "lakünde osteosit", "c", false, "e"));
    els.push(...lead(90, 254, 110, 332, "lamel halkası", "muted"));
    return { els, readout: ["Damar her lakünün içinden geçmez; hücreler kanaliküllerle madde alışverişine bağlanır.", "Yoğun matriks, hücrelerin beslenmeden tümüyle uzak olduğu anlamına gelmez."] };
  },
});

const longBone = mk({
  caption:
    "Uzun kemiği baştan gövdeye izle (tipik yetişkin şeması, ölçekli değil): uçlar epifiz, gövde diafizdir. Gövdede sık kemik belirgindir, ilik boşluğunda sarı ilik gösterilebilir; uçların içinde süngerimsi ağ ve kırmızı ilik alanları vardır. Periost yüzeyi sarar, eklem kıkırdağıyla kaplı yüzleri aynı biçimde örtmez. Epifiz plağı büyüme dönemine aittir.",
  alt: "Yatay uzanan uzun kemik: iki ucu şişkin epifiz, ortası silindir biçimli diafiz. Diafizin içinde ilik boşluğu, uçlarda süngerimsi ağ çizgileri. Uçlardaki kıkırdak başlıkları, gövdeyi saran kesik periost çizgileri ve uçlara yakın kesik epifiz plağı çizgileri işaretli.",
  h: 330,
  draw: () => {
    const out: [number, number][] = [[140, 150], [265, 152], [392, 150], [420, 128], [455, 118], [490, 135], [505, 180], [490, 225], [455, 242], [420, 232], [392, 210], [265, 208], [140, 210], [112, 232], [77, 242], [42, 225], [27, 180], [42, 135], [77, 118], [112, 128]];
    const els: El[] = [S(out, { bold: true })];
    els.push(R(150, 163, 382, 197, { tone: "warn", fill: "warn" }));
    for (const ox of [0, 1]) {
      const base = ox ? 430 : 50;
      for (let i = 0; i < 5; i++) els.push(L(base + i * 14, 150, base + i * 14 + 18, 210, { thin: true, tone: "c" }), L(base + i * 14 + 18, 150, base + i * 14, 210, { thin: true, tone: "c" }));
    }
    els.push(S([[46, 126], [30, 150], [24, 180], [30, 210], [46, 234]], { open: true, bold: true, tone: "b" }));
    els.push(S([[486, 126], [502, 150], [508, 180], [502, 210], [486, 234]], { open: true, bold: true, tone: "b" }));
    els.push(L(128, 134, 128, 226, { dash: true, tone: "a" }), L(404, 134, 404, 226, { dash: true, tone: "a" }));
    els.push(L(112, 140, 420, 140, { dash: true, tone: "muted" }), L(112, 220, 420, 220, { dash: true, tone: "muted" }));
    els.push(T(82, 92, "Epifiz", "c", { bold: true }), T(450, 92, "Epifiz", "c", { bold: true }), T(266, 118, "Diafiz", "c", { bold: true }));
    els.push(...lead(26, 162, 26, 40, "eklem kıkırdağı", "b"));
    els.push(...lead(404, 134, 380, 40, "epifiz plağı", "a"));
    els.push(...lead(330, 140, 300, 70, "periost", "muted"));
    els.push(...lead(70, 196, 70, 290, "süngerimsi kemik, kırmızı ilik", "c"));
    els.push(...lead(266, 180, 266, 260, "ilik boşluğu: sarı ilik", "warn"));
    els.push(...lead(360, 203, 380, 300, "sık kemik", "ink"));
    return { els, readout: ["Kırmızı ilik kan hücresi yapımıyla, sarı ilik yağ depolamayla ilişkilidir.", "Bu dağılım bütün yaşlara ve bütün kemiklere aynen genellenmez."] };
  },
});

const COUNT: { label: string; n: number; d: number; kids?: string[] }[] = [
  { label: "Tipik yetişkin iskeleti", n: 206, d: 0 },
  { label: "Eksen iskeleti", n: 80, d: 1 },
  { label: "Baş bölgesi", n: 29, d: 2 },
  { label: "Kafatası", n: 22, d: 3 },
  { label: "Orta kulak kemikçikleri", n: 6, d: 3 },
  { label: "Hiyoid", n: 1, d: 3 },
  { label: "Erişkin omurga", n: 26, d: 2 },
  { label: "Göğüs kafesi", n: 25, d: 2 },
  { label: "Üyeler iskeleti", n: 126, d: 1 },
  { label: "Üst taraflar ve omuz kemeri", n: 64, d: 2 },
  { label: "Alt taraflar ve kalça kemeri", n: 62, d: 2 },
];
const sumKids = (i: number) => {
  let s = 0;
  for (let j = i + 1; j < COUNT.length && COUNT[j].d > COUNT[i].d; j++) if (COUNT[j].d === COUNT[i].d + 1) s += COUNT[j].n;
  return s;
};
const boneCount = mk({
  caption:
    "Tipik yetişkin sayımı (bölümdeki sayılar): 206 = eksen 80 + üyeler 126; eksen 80 = baş 29 + omurga 26 + göğüs kafesi 25; baş 29 = kafatası 22 + kulak kemikçikleri 6 + hiyoid 1; üyeler 126 = 64 + 62. Toplam yaşa, kaynaşmaya ve kişisel varyasyona göre değişebilir.",
  alt: "Girintili ağaç: en üstte 206, altında eksen iskeleti 80 ve üyeler iskeleti 126. Eksen altında baş 29, omurga 26, göğüs kafesi 25; baş altında kafatası 22, kulak kemikçikleri 6, hiyoid 1. Üyeler altında 64 ve 62.",
  h: 11 * 44 + 10,
  draw: () => {
    const els: El[] = [];
    const rowY = (i: number) => 26 + i * 44;
    COUNT.forEach((c, i) => {
      const x = 14 + c.d * 34;
      const label = `${c.n}  ${c.label}`;
      const w = bw(label, c.d < 2);
      const tone: Tone = c.d === 0 ? "a" : c.d === 1 ? "b" : c.d === 2 ? "ink" : "muted";
      els.push(...B(x + w / 2, rowY(i), label, { tone, fill: c.d < 2 ? tone : undefined, bold: c.d < 2, text: c.d === 3 ? "muted" : "ink" }));
      if (c.d > 0) {
        let p = i - 1;
        while (COUNT[p].d >= c.d) p--;
        const px = 14 + COUNT[p].d * 34 + 14;
        els.push(L(px, rowY(p) + 20, px, rowY(i), { thin: true, tone: "muted" }), L(px, rowY(i), x, rowY(i), { thin: true, tone: "muted" }));
      }
    });
    const checks = [0, 1, 2, 8].map((i) => `${COUNT[i].n} = ${sumKids(i)}`);
    return { els, readout: [`Toplam denetimi: ${checks.join("; ")}.`, "206 her insanda her yaşta değişmez bir zorunlu sayı değildir; sayımın kapsamını bilmeden toplamları kıyaslama."] };
  },
});

/* ---------------- Kıkırdak ve eklem ---------------- */

const DIFF = [
  { name: "Perikondriumlu kıkırdak", per: true, syn: false, txt: "Damarlı perikondrium çevreden madde alışverişine katkı verir; madde içeri difüzyonla ulaşır." },
  { name: "Eklem yüzü kıkırdağı", per: false, syn: true, txt: "Eklem yüzündeki hiyalin kıkırdakta tipik perikondrium yoktur; sinoviyal sıvıyla alışveriş önemlidir." },
];
const avascular = mk({
  caption:
    "Kıkırdak dokunun içinde kan damarı yoktur (nitel şema, ölçekli değil): maddeler hücrelere difüzyonla ulaşır. Bazı kıkırdaklarda damarlı perikondrium katkı verir; eklem yüzündeki hiyalin ve fibröz kıkırdak tipik perikondrium istisnalarıdır. Uzun difüzyon yolu yavaş onarımı anlamaya yardım eder.",
  alt: "Ortada damarsız kıkırdak matriksi ve içinde lakünlerde kondrositler. Birinci adımda çevrede damarlı perikondrium bandı ve içe doğru difüzyon okları; ikinci adımda bir yüzde sinoviyal sıvı ve ondan içe oklar, perikondrium yok.",
  h: 300,
  steps: DIFF.map((d) => d.name),
  draw: (_v, step) => {
    const d = DIFF[step];
    const els: El[] = [R(126, 80, 406, 220, { tone: "b", fill: "b" })];
    const pts: [number, number][] = [[170, 120], [230, 170], [300, 120], [360, 180], [200, 200], [330, 150], [260, 100], [160, 170]];
    for (const [x, y] of pts) els.push(C(x, y, 10, { tone: "ink", thin: true }), C(x, y, 3, { tone: "ink", fill: "ink" }));
    if (d.per) {
      els.push(R(106, 60, 426, 240, { tone: "warn", bold: true }));
      for (const x of [150, 266, 382]) els.push(A(x, 52, x, 92, "warn"));
      els.push(T(266, 30, "damarlı perikondrium", "c", { tone: "warn", bold: true }));
    } else {
      els.push(R(126, 222, 406, 262, { tone: "c", fill: "c" }), T(266, 242, "sinoviyal sıvı", "c", { tone: "c", bold: true }));
      for (const x of [180, 266, 352]) els.push(A(x, 222, x, 192, "c"));
      els.push(T(266, 40, "eklem boşluğu tarafında perikondrium yok", "c", { tone: "muted" }));
    }
    els.push(T(470, 150, "damar yok", "c", { bold: true, tone: "a" }), T(60, 150, "kondrosit", "c", { tone: "muted" }), L(92, 150, 156, 168, { thin: true, tone: "muted" }));
    return { els, readout: [d.txt, "Damarsızlık hücrelerin ölü olduğu anlamına gelmez."] };
  },
});

const cartTable = tableFig({
  caption:
    "Üç kıkırdak türünü doku, örnek bölge ve baskın işle birlikte karşılaştır (bölüm metninden). 'Diz' bir kıkırdak türü değildir: dizdeki eklem yüzü hiyalin, menisküs fibröz kıkırdaktır. Elastik kıkırdak da kollajensiz değildir.",
  alt: "Dört satırlı tablo: sütunlar tür, öne çıkan yapı, örnek bölgeler ve baskın iş. Satırlar hiyalin, elastik ve fibröz kıkırdak.",
  headers: ["Tür", "Öne çıkan", "Örnek bölge", "Baskın iş"],
  rows: [
    ["Hiyalin", "düzgün\nkollajenli\nmatriks", "eklem yüzü,\nsoluk borusu,\nepifiz plağı", "kaygan\nyüz,\nbüyüme\nplağı"],
    ["Elastik", "elastik\nlifler", "kulak\nkepçesi,\nepiglot", "esneyip\nbiçime\ndönme"],
    ["Fibröz", "belirgin\nkollajen\nlifler", "omurlar\narası disk,\nmenisküs,\nlabrum", "çekme ve\nbasınca\ndayanım"],
  ],
  readout: ["Aynı doku türü farklı bölgelerde farklı işler görebilir.", "Bir bölgede bulunmak, o eklemin bütün yüzeyinin aynı kıkırdak olduğu anlamına gelmez."],
});

const jointClass = tableFig({
  caption:
    "Eklem sınıflamasında iki ölçüt (bölüm metninden): işlevsel sınıflama hareket miktarına (oynamaz, yarı oynar, oynar), yapısal sınıflama dokuya ve boşluğa (fibröz, kıkırdak, sinoviyal) bakar. Aynı örnek iki ölçütte farklı sözcükle adlandırılır.",
  alt: "Üç satırlı tablo: örnek bağlantı, işlevsel sınıf ve yapısal özellik. Kafatası suturaları, omur gövdeleri arasındaki diskli bağlantı ve tipik sinoviyal eklem.",
  headers: ["Örnek", "İşlevsel", "Yapısal"],
  rows: [
    ["Kafatası\nsuturası", "oynamaz\n(çok sınırlı)", "fibröz\nbağlantı"],
    ["Omur gövdeleri\narası disk", "yarı oynar\n(sınırlı)", "kıkırdaklı\nbağlantı"],
    ["Tipik sinoviyal\neklem", "oynar\n(daha serbest)", "boşluk,\nkapsül, sıvı"],
  ],
  readout: ["Soruda hangi ölçüt verildiyse onu kullan.", "Bütün omurga bağlantıları tek tip değildir: faset eklemleri ve atlas-axis ilişkisi farklıdır."],
});

const synovial = mk({
  caption:
    "Sinoviyal eklem kesiti (öğretim şeması, boşluk büyütülmüştür, ölçekli değil): kemik uçlarını eklem kıkırdağı kaplar; aradaki eklem boşluğunda sinoviyal sıvı bulunur. Dıştaki fibroz kapsül destek verir, içteki sinoviyal zar sıvının oluşumuna katkı yapar. Sıvı kayganlık ve kıkırdağın beslenmesi içindir, yapıştırıcı değildir.",
  alt: "Üstte ve altta iki kemik ucu, uçlarında kıkırdak başlıkları, aralarında sıvı dolu boşluk. Boşluğu iki yandan saran kapsül çizgisi ve onun iç yüzünde sinoviyal zar.",
  h: 330,
  draw: () => {
    const els: El[] = [
      S([[200, 20], [200, 90], [190, 120], [210, 140], [266, 146], [322, 140], [342, 120], [332, 90], [332, 20]], { open: true, bold: true }),
      S([[200, 310], [200, 240], [190, 210], [210, 190], [266, 184], [322, 190], [342, 210], [332, 240], [332, 310]], { open: true, bold: true }),
      S([[192, 124], [212, 142], [266, 148], [320, 142], [340, 124], [330, 134], [266, 158], [202, 134]], { tone: "b", fill: "b" }),
      S([[192, 206], [212, 188], [266, 182], [320, 188], [340, 206], [330, 196], [266, 172], [202, 196]], { tone: "b", fill: "b" }),
      R(214, 160, 318, 170, { tone: "c", fill: "c", thin: true }),
      S([[180, 96], [160, 165], [180, 234]], { open: true, bold: true, tone: "warn" }),
      S([[352, 96], [372, 165], [352, 234]], { open: true, bold: true, tone: "warn" }),
      S([[188, 104], [172, 165], [188, 226]], { open: true, dash: true, tone: "a" }),
      S([[344, 104], [360, 165], [344, 226]], { open: true, dash: true, tone: "a" }),
    ];
    els.push(T(266, 60, "kemik", "c", { tone: "muted" }), T(266, 270, "kemik", "c", { tone: "muted" }));
    els.push(...lead(300, 151, 340, 30, "eklem kıkırdağı", "b"));
    els.push(...lead(230, 165, 170, 300, "sinoviyal sıvı", "c"));
    els.push(...lead(366, 200, 374, 290, "fibroz kapsül", "warn"));
    els.push(...lead(174, 150, 160, 60, "sinoviyal zar", "a"));
    return { els, readout: ["Kıkırdak, kapsül ve sıvı üç ayrı yapıdır.", "Gerçek eklemde boşluk bu kadar geniş değildir; şema yapıları ayırmak için büyütülmüştür."] };
  },
});

const ligTendon = mk({
  caption:
    "Bağlantının iki ucunu izle (nitel şema, ölçekli değil): ligament kemiği kemiğe bağlar ve aşırı hareketi sınırlar; tendon kas kuvvetini kemiğe aktarır. Kas hücreleri ilerledikçe tendon hücresine dönüşmez; hareket sırasında tendonun tutunma yeri kemikle birlikte kalır.",
  alt: "Solda üst üste iki kemik ve aralarında eklem; iki kemiği yanlardan bağlayan ligament çizgileri. Sağda üst kemiğe yaslanan kas gövdesi ve ondan alt kemiğe uzanan tendon.",
  h: 320,
  draw: () => {
    const els: El[] = [
      R(190, 20, 240, 150, { bold: true }),
      R(190, 170, 240, 300, { bold: true }),
      L(182, 120, 182, 200, { bold: true, tone: "b" }),
      L(248, 120, 248, 200, { bold: true, tone: "b" }),
      S([[260, 40], [298, 70], [304, 120], [284, 160], [262, 150], [254, 100]], { tone: "warn", fill: "warn" }),
      L(280, 158, 250, 220, { bold: true, tone: "c" }),
      C(250, 222, 4, { tone: "c", fill: "c" }),
    ];
    els.push(T(215, 85, "kemik", "c", { tone: "muted" }), T(215, 240, "kemik", "c", { tone: "muted" }));
    els.push(...lead(182, 160, 150, 160, "ligament", "b", true));
    els.push(T(96, 192, "kemik ↔ kemik", "c", { tone: "b" }));
    els.push(...lead(284, 90, 340, 70, "kas gövdesi", "warn", true));
    els.push(...lead(268, 186, 330, 200, "tendon", "c", true));
    els.push(T(290, 240, "tutunma yeri", "e", { tone: "muted" }), T(290, 266, "kemikle hareket eder", "e", { tone: "muted" }));
    return { els, readout: ["Kemik-kemik bağlantısı ligament; kas → kemik ilişkisi tendondur.", "İkisi de bağ dokudur ama aynı iki yapıyı bağlamazlar."] };
  },
});

/* ---------------- Dil ve burun ---------------- */

const olfEpi = mk({
  caption:
    "Koku epiteli (nitel şema, ölçekli değil): burun boşluğunun üst kısmında reseptör nöronlar destek hücreleriyle yan yanadır; mukus yüzeyi nemli tutar. Molekül mukusta çözünür ve dendrit ucundaki silyalarla etkileşir; sinirsel çıkış aksonla koku soğancığına gider.",
  alt: "Altta mukus tabakası ve içinde koku molekülleri. Üstünde epitel: destek hücreleri arasında bir reseptör nöron; dendriti mukusa silyalarla uzanıyor, aksonu yukarı koku soğancığına çıkıyor.",
  h: 340,
  draw: () => {
    const els: El[] = [R(40, 250, 492, 290, { tone: "c", fill: "c" })];
    for (const x of [80, 140, 330, 390, 450]) els.push(R(x - 24, 130, x + 24, 248, { tone: "muted" }));
    els.push(S([[246, 248], [236, 200], [250, 170], [282, 170], [296, 200], [286, 248]], { tone: "a", fill: "a" }));
    els.push(L(266, 170, 266, 70, { bold: true, tone: "a" }), A(266, 90, 266, 50, "a", { bold: true }));
    els.push(R(170, 18, 362, 46, { tone: "ink" }), T(266, 32, "koku soğancığına", "c", { bold: true }));
    for (const dx of [-16, -6, 4, 14]) els.push(L(266 + dx * 0.3, 248, 266 + dx, 276, { thin: true, tone: "a" }));
    for (const [x, y] of [[180, 270], [212, 264], [350, 272], [320, 266]] as const) els.push(C(x, y, 4, { tone: "warn", fill: "warn" }));
    els.push(T(440, 270, "mukus", "e", { tone: "c" }));
    els.push(...lead(180, 270, 60, 320, "çözünen koku molekülü", "warn", false, "e"));
    els.push(...lead(272, 276, 420, 320, "silyalar", "a"));
    els.push(...lead(80, 140, 24, 60, "destek hücresi", "muted", false, "e"));
    els.push(...lead(266, 110, 210, 110, "akson", "a", true));
    els.push(...lead(292, 200, 330, 100, "reseptör nöron", "a"));
    return { els, readout: ["Silya ilk etkileşimin yeridir; iletiyi taşıyan çıkış aksondur.", "Burun boşluğunun her hücresi koku reseptörü değildir."] };
  },
});

const twoPaths = mk({
  caption:
    "Koku ve tat yolunu karşılaştır (okul düzeyi kısa yol, ölçekli değil): koku bilgisinin ilk kortikal iletimi zorunlu bir talamik röleden geçmez; tat sinirleri beyin sapı bağlantıları üzerinden talamusa ve tat korteksine gider. Ara bağlantıların hepsi çizilmemiştir.",
  alt: "İki sütun. Solda koku: reseptör nöron, koku soğancığı, ilk kortikal alan. Sağda tat: tat hücresi, duyu siniri ucu, beyin sapı, talamus, tat korteksi. Sol sütunda talamus kutusu kesik ve 'zorunlu değil' notlu.",
  h: 380,
  draw: () => {
    const left = chain(
      [
        { label: "Koku reseptör nöronu", tone: "a" },
        { label: "Koku soğancığı" },
        { label: "Talamik röle", dash: true, tone: "muted" },
        { label: "İlk kortikal alan", bold: true },
      ],
      { cx: 130, w: 232, y0: 40 },
    );
    const right = chain(
      [{ label: "Tat hücresi (epitel)", tone: "c" }, { label: "Duyu siniri ucu" }, { label: "Beyin sapı" }, { label: "Talamus" }, { label: "Tat korteksi", bold: true }],
      { cx: 400, w: 232, y0: 8, gap: 22 },
    );
    const els = [...left.els, ...right.els, T(130, 14, "Koku", "c", { bold: true, tone: "a" })];
    els.push(T(130, left.h + 10, "ilk iletimde zorunlu değil", "c", { tone: "muted" }));
    return { els, readout: ["Fark ilk yoldadır; talamus sonraki koku işlemelerinde yer alabilir.", "Tat hücresi özelleşmiş epitel hücresidir, koku reseptörü ise nörondur."] };
  },
});

const SCALE = [
  { label: "Dil (organ)", note: "bütün yüzey" },
  { label: "Papilla", note: "yüzey çıkıntısı" },
  { label: "Tat tomurcuğu", note: "birden çok hücre" },
  { label: "Tat hücresi", note: "tek özelleşmiş hücre" },
];
const tasteScale = mk({
  caption:
    "Papilla, tomurcuk, hücre: üç ölçek (nitel şema, ölçekli değil). Tat tomurcukları uygun papillalarda ve ağız-yutak bölgesinin başka alanlarında bulunur; her tomurcuk birden çok hücreden oluşur. Her papilla tomurcuk taşımaz: ipliksi papillalar daha çok mekanik görevlidir.",
  alt: "Yukarıdan aşağı dört basamak: dil, papilla, tat tomurcuğu, tat hücresi. Her basamağın yanında kısa açıklama; adımlarda seçili basamak vurgulanıyor.",
  h: 300,
  steps: SCALE.map((s) => s.label),
  draw: (_v, step) => {
    const c = chain(
      SCALE.map((s, i) => ({ label: s.label, note: s.note, tone: (i === step ? "a" : "ink") as Tone, fill: i === step ? ("a" as Tone) : undefined, bold: i === step })),
      { cx: 130, w: 220 },
    );
    return { els: c.els, readout: [`${step + 1}. ölçek: ${SCALE[step].label} (${SCALE[step].note}).`, "Organın, doku içi yapının ve tek hücrenin adını karıştırmak sıklık sorularını bozar."] };
  },
});

const FLAV = [
  { name: "İki kanal açık", nose: true, txt: "Temel tat sinyaline ağızdan burna ulaşan aroma eklenir; lezzet birlikte oluşur." },
  { name: "Burun erişimi azalır", nose: false, txt: "Aroma katkısı azalır, yiyeceğin karakterini seçmek zorlaşır; tuzlu ve tatlı gibi temel tat bilgisi kalabilir." },
];
const flavor = mk({
  caption:
    "Aroma ile temel tat iki ayrı kanaldır (nitel şema, ölçekli değil): çiğnerken uçucu moleküller ağızdan burun bölgesine ulaşır, temel tat sinyaline aroma eklenir. Burun erişimi azaldığında yalnız aroma kanalı zayıflar; tat kanalı sıfırlanmaz. Isı ve doku da lezzete katılır.",
  alt: "Solda yiyecek kutusu; ondan iki ok çıkıyor: üstteki ağızdan burna aroma yolu, alttaki dildeki temel tat yolu. İkisi sağda lezzet kutusunda birleşiyor. İkinci adımda üstteki aroma yolu kesik ve sönük.",
  h: 260,
  steps: FLAV.map((f) => f.name),
  draw: (_v, step) => {
    const f = FLAV[step];
    const at: Tone = f.nose ? "a" : "muted";
    const els: El[] = [
      ...B(80, 130, "Çiğnenen\nyiyecek", { bold: true }),
      ...B(270, 50, "Burun bölgesi:\naroma", { tone: at, fill: f.nose ? "a" : undefined, dash: !f.nose, text: f.nose ? "ink" : "muted" }),
      ...B(270, 210, "Dil: temel tat", { tone: "c", fill: "c" }),
      ...B(452, 130, "Lezzet", { bold: true }),
      A(130, 108, 196, 66, at, { dash: !f.nose }),
      A(130, 152, 196, 200, "c"),
      A(344, 66, 410, 112, at, { dash: !f.nose }),
      A(344, 200, 410, 148, "c"),
    ];
    if (!f.nose) els.push(T(270, 108, "aroma katkısı azalır", "c", { tone: "warn", bold: true }));
    return { els, readout: [f.txt, "Biberin yakıcılığı ve nanenin serinliği beş temel tatla aynı sınıflama değildir."] };
  },
});

export const biologyFigures060Skeleton: Record<string, Record<string, FigureDef>> = {
  "destek-hareket-kemik": {
    "Organik ve mineral bileşenler birlikte": composite,
    "Yapan, yıkan ve sürdüren hücreler": cells,
    "Sık kemik: osteonun içindeki yollar": osteon,
    "Uzun kemiği baştan gövdeye izle": longBone,
    "Tipik yetişkin sayımında eksen ve üyeler": boneCount,
  },
  "destek-hareket-kikirdak-eklem": {
    "Damarsızlık, difüzyon ve onarım sınırı": avascular,
    "Eklem sınıflamasında hangi ölçüt?": jointClass,
    "Sinoviyal eklemde kasıtlı bir boşluk var": synovial,
    "Ligament ve tendonun uçlarını takip et": ligTendon,
    "Karşılaştırmayı doku ve bölgeyle bitir": cartTable,
  },
  "duyu-organlari-dil-burun": {
    "Koku epiteli nerede, mukus ne işe yarar?": olfEpi,
    "Koku soğancığı ve ilk kortikal yol": twoPaths,
    "Papilla, tomurcuk ve hücre: üç ölçek": tasteScale,
    "Aroma ile temel tat birleşince": flavor,
  },
};

