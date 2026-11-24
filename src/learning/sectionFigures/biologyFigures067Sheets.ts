import { type El, type FigureDef, type Tone } from "./figureKit";
import { A, B, C, L, R, S, T, bh, bw, mk, table, tw } from "./biologyFigures060Kit";

/*
 * Forge067: dört TYT Biyoloji kopya kâğıdı (Hücre Organelleri, Besin Zinciri
 * ve Ağı, Canlıların Sınıflandırılması, Mendel'den Sapmalar) özgün
 * etkileşimli figürlerle. Her figür dersin daha önce çizimi olmayan bir
 * bölümüne bağlıdır ve dersin laboratuvarını (tıklanabilir hücre haritası,
 * kurbağalı kara besin ağı, iki canlının basamak karşılaştırması, eş / eksik
 * baskınlık seçici) tekrarlamaz. Hücre ve organel çizimleri nitel şemadır,
 * ölçekli değildir. Çaprazlama sayıları kutular sayılarak hesaplanır;
 * göl ağı, besin zinciri ve epistazi modelleri bu dosya için yazılmış özgün
 * modellerdir. Kâğıtların cümleleri kopyalanmadı. Adım, seçim ve sürgü
 * öğrenme kaydı üretmez.
 */

/** Sözcük sınırında satırlara böler; her satır `max` birimden dar kalır. */
function wrap(s: string, max: number, bold = false): string[] {
  const out: string[] = [];
  for (const w of s.split(" ")) {
    const last = out[out.length - 1];
    if (last !== undefined && tw(`${last} ${w}`, bold) <= max) out[out.length - 1] = `${last} ${w}`;
    else out.push(w);
  }
  return out;
}

/** Tablo: ilk sütun seçilebilir satır adıdır; seçili satır vurgulanır. */
function pickTable(headers: string[], rows: string[][], o: { y0: number; sel: number; tone?: (r: number) => Tone | undefined; groups?: Record<number, string> }) {
  const all = [headers, ...rows];
  const need = headers.map((_, c) => Math.max(...all.map((r, ri) => bw(r[c] ?? "", ri === 0 || c === 0, 20))));
  const total = need.reduce((a, b) => a + b, 0);
  const extra = Math.max(0, 528 - total) / need.length;
  const ws = need.map((n) => n + extra);
  const xs = ws.reduce<number[]>((acc, w) => [...acc, acc[acc.length - 1] + w], [2]);
  let y = o.y0;
  const els: El[] = [];
  all.forEach((r, ri) => {
    const group = ri > 0 ? o.groups?.[ri - 1] : undefined;
    if (group) {
      els.push(R(2, y, xs[xs.length - 1], y + 40, { tone: "muted" }), T(14, y + 20, group, "e", { bold: true, tone: "muted" }));
      y += 40;
    }
    const h = Math.max(...r.map((c) => bh(c)));
    const on = ri > 0 && ri - 1 === o.sel;
    r.forEach((cell, c) => {
      const fill: Tone | undefined = on ? "a" : ri === 0 ? "muted" : o.tone?.(ri - 1);
      els.push(
        ...B(xs[c] + ws[c] / 2, y + h / 2, cell, {
          w: ws[c],
          h,
          bold: ri === 0 || c === 0,
          fill,
          tone: on ? "a" : "ink",
          pick: ri > 0 && c === 0 ? ri - 1 : undefined,
        }),
      );
    });
    y += h;
  });
  return { els, h: y, total };
}

/* =====================================================================
 * 011 Hücre Organelleri
 * ===================================================================== */

const EVIDENCE: { name: string; cells: [string, string, string]; proof: boolean; title: string; detail: string[] }[] = [
  {
    name: "Hücre zarı",
    cells: ["Var", "Var", "Var"],
    proof: false,
    title: "Hücre zarı bütün hücrelerin sınırıdır",
    detail: ["Organel sayılmaz; seçici geçirgen dış sınırdır.", "Her hücrede bulunduğu için hücre tipini ayırmaz."],
  },
  {
    name: "Ribozom",
    cells: ["Var", "Var", "Var"],
    proof: false,
    title: "Ribozom zarsız ve ortak bir yapıdır",
    detail: ["rRNA ve proteinden oluşur; protein sentezler.", "Prokaryotta da bulunduğu için ökaryotluk kanıtı değildir."],
  },
  {
    name: "DNA",
    cells: ["Halkasal", "Var", "Var"],
    proof: false,
    title: "DNA her hücresel canlıda vardır",
    detail: ["Prokaryotta sitoplazmada halkasal DNA bulunur.", "Mitokondri ve kloroplastın da kendi halkasal DNA'sı vardır; halkasal DNA tek başına prokaryotluk ya da ökaryotluk kanıtı değildir."],
  },
  {
    name: "Hücre duvarı",
    cells: ["Çoğunda", "Selülozlu", "Yok"],
    proof: false,
    title: "Duvarın yapısı canlı grubuna göre değişir",
    detail: ["Bitkide selülozlu, mantarda kitinli, bakterilerin çoğunda peptidoglikanlıdır.", "Duvar görmek bitki ya da ökaryot olduğunu kesinleştirmez; zarın dışındadır ve organel değildir."],
  },
  {
    name: "Zarlı çekirdek",
    cells: ["Yok", "Var", "Var"],
    proof: true,
    title: "Zarla çevrili çekirdek ökaryot kanıtıdır",
    detail: ["Görülmesi hücrenin ökaryot olduğunu gösterir.", "Görülmemesi ise prokaryotluk kanıtı değildir: olgun memeli alyuvarı çekirdeğini kaybetmiş bir ökaryot hücredir."],
  },
  {
    name: "Mitokondri",
    cells: ["Yok", "Var", "Var"],
    proof: true,
    title: "Zarlı organel görmek ökaryotluğu kanıtlar",
    detail: ["Mitokondri çift zarlı bir organeldir; prokaryotta bulunmaz.", "Prokaryot da ATP üretir: hücre zarında ve sitoplazmada. Organelin yokluğu işlevin yokluğu değildir."],
  },
  {
    name: "Kloroplast",
    cells: ["Yok", "Bazılarında", "Yok"],
    proof: true,
    title: "Kloroplast her bitki hücresinde yoktur",
    detail: ["Fotosentez yapan bitki ve alg hücrelerinde beklenir; kökün birçok hücresinde yoktur.", "Fotosentez yapan bakterilerde de kloroplast yoktur; fotosentez zar kıvrımlarında yürür."],
  },
];
const EV_HEAD = ["Yapı", "Prokaryot", "Bitki", "Hayvan"];
const EV_GROUPS: Record<number, string> = { 0: "Ortak ya da dağınık: ökaryotu ayırmaz", 4: "Görülürse ökaryot kanıtı" };
const evidenceH = pickTable(EV_HEAD, EVIDENCE.map((e) => [e.name, ...e.cells]), { groups: EV_GROUPS, y0: 4, sel: -1 }).h;
const evidenceFigure = mk({
  caption:
    "Üç hücre tipinde yedi yapı (ders şeması, ölçekli değil): bir satırın adına dokun ve o yapının hücre tipini kesinleştirip kesinleştirmediğini oku. Ortak yapılar (zar, ribozom, DNA) ayırmaz; zarlı çekirdek ve zarlı organel görülmesi ökaryot kanıtıdır, görülmemesi tek başına prokaryot kanıtı değildir.",
  alt: "Dört sütunlu tablo: yapı, prokaryot, bitki ve hayvan. Üstteki ‘ökaryotu ayırmaz’ grubunda hücre zarı, ribozom, DNA ve hücre duvarı; alttaki ‘görülürse ökaryot kanıtı’ grubunda zarlı çekirdek, mitokondri ve kloroplast satırları var.",
  h: evidenceH + 4,
  picks: EVIDENCE.map((e) => ({ label: e.name, title: e.title, detail: e.detail })),
  draw: (_v, _s, pick) => {
    const t = pickTable(EV_HEAD, EVIDENCE.map((e) => [e.name, ...e.cells]), { groups: EV_GROUPS,
      y0: 4,
      sel: pick,
      tone: (r) => (EVIDENCE[r].proof ? "c" : undefined),
    });
    const e = EVIDENCE[pick];
    const readout = e
      ? [
          `${e.name}: prokaryotta ${e.cells[0].toLocaleLowerCase("tr-TR")}, bitkide ${e.cells[1].toLocaleLowerCase("tr-TR")}, hayvanda ${e.cells[2].toLocaleLowerCase("tr-TR")}; ökaryot kanıtı ${e.proof ? "evet" : "hayır"}.`,
          "2026 TYT Fen 17 mantığı: kesin ökaryot kanıtı zarlı organeldir (mitokondri gibi); ribozom, duvar, kamçı ya da halkasal DNA yetmez.",
        ]
      : ["Bir satırın adına dokun: yapı hangi hücre tipinde var, varlığı neyi kanıtlar?", "Ortak yapıların sayısı arttıkça ayırt etme gücü azalır; karar zarlı yapıyla verilir."];
    return { els: t.els, readout };
  },
});

// Çekirdekte bilgi, sitoplazmada üretim: n amino asitli polipeptit.
const ribosomeFigure = mk({
  caption:
    "Bilgi çekirdekte, üretim ribozomda (nitel şema, ölçekli değil): çift zarlı çekirdekteki DNA'nın bilgisi mRNA'ya aktarılır, mRNA por yoluyla sitoplazmaya çıkar ve ribozom amino asitleri birleştirir. Sürgüyle amino asit sayısını değiştir; peptit bağı ve açığa çıkan su sayısı n − 1 olur.",
  alt: "Solda iki çizgiyle çizilmiş çekirdek ve içinde dalgalı DNA. Çekirdekten bir porla çıkan mRNA şeridi sağdaki ribozoma gider. Ribozomun üstünde boncuk dizisi biçiminde polipeptit zinciri; boncuk sayısı sürgüyle 2 ile 10 arasında değişir.",
  h: 250,
  param: { label: "Amino asit sayısı (n)", min: 2, max: 10, step: 1, init: 5 },
  draw: (n) => {
    const wave: [number, number][] = Array.from({ length: 13 }, (_, i) => [55 + i * 11, 112 + (i % 2 ? -7 : 7)]);
    const els: El[] = [
      C(120, 135, 95, { tone: "c" }),
      C(120, 135, 87, { tone: "c", thin: true }),
      S(wave, { open: true, tone: "ink" }),
      T(120, 84, "DNA", "c", { bold: true }),
      T(120, 196, "Çekirdek", "c", { bold: true, tone: "c" }),
      S([[100, 150], [150, 146], [190, 126], [209, 103], [250, 112], [300, 170], [450, 170]], { open: true, tone: "b", bold: true }),
      T(330, 196, "mRNA", "c", { bold: true, tone: "b" }),
      R(202, 96, 216, 110, { tone: "c", fill: "c" }),
      T(232, 72, "Por", "c", { tone: "c" }),
      L(214, 94, 226, 82, { tone: "c", thin: true }),
      C(380, 152, 22, { tone: "a", fill: "a" }),
      C(380, 186, 13, { tone: "a", fill: "a" }),
      T(412, 148, "Ribozom", "e", { bold: true, tone: "a" }),
      T(470, 230, "Sitoplazma", "c", { tone: "muted" }),
    ];
    const xs = Array.from({ length: n }, (_, i) => 380 - (n - 1) * 13 + i * 26);
    els.push(L(380, 130, xs[n - 1], 70, { tone: "a", thin: true }));
    xs.forEach((x, i) => {
      if (i > 0) els.push(L(xs[i - 1] + 9, 60, x - 9, 60, { tone: "a" }));
      els.push(C(x, 60, 9, { tone: "a", fill: i === n - 1 ? "a" : undefined }));
    });
    els.push(T(380, 26, "Polipeptit", "c", { tone: "a" }));
    return {
      els,
      readout: [
        `${n} amino asit → ${n - 1} peptit bağı; her bağda bir su açığa çıkar: ${n - 1} su.`,
        `Bu zincir için mRNA'da ${n} kodon okunur, bitiş kodonu ayrıca gelir. Bağları ribozom kurar; çekirdek bilgiyi taşır ve aktarır.`,
        "Çekirdekçik zarlı organel değildir; rRNA üretimi ve ribozom alt birimlerinin hazırlanmasıyla ilişkilidir.",
      ],
    };
  },
});

const ROUTE = [
  { box: "Ribozom", ok: "amino asitleri birleştirir", pick: "Ribozom bozuk", res: "Polipeptit oluşmaz; sonraki basamaklar işleyecek ürün bulamaz. Ribozomun bozulması bütün metabolizmayı o anda durdurmaz." },
  { box: "Granüllü ER", ok: "katlar, ilk işlemi yapar", pick: "Granüllü ER bozuk", res: "Zincir kurulabilir ama salgı ve zar proteinlerinin katlanması ve taşınması aksar. Serbest ribozomlardaki sitozol proteinleri aynı ölçüde etkilenmeyebilir." },
  { box: "Golgi aygıtı", ok: "değiştirir, sınıflar, paketler", pick: "Golgi bozuk", res: "Sentez ve ER basamağı sürer; değiştirme, sınıflama ve paketleme aksar. Golgi zinciri kurmaz; sentez ondan önce ribozomda başlar." },
  { box: "Salgı vezikülü", ok: "ürünü zara taşır", pick: "Vezikül zarla birleşemiyor", res: "Ürün paketlenir ama dışarı verilemez; veziküller sitoplazmada birikebilir." },
  { box: "Ekzositoz", ok: "içerik hücre dışına", pick: "", res: "" },
];
const routeFigure = mk({
  caption:
    "Salgı yolunda bir basamağı boz (nitel şema): seçilen yapının öncesindeki basamaklar çalışır, kendisi aksar, sonrasına ürün ulaşmaz. Deneyde ‘sentez var, salgı yok’ bulgusu Golgi ya da vezikül sorunuyla uyumludur; tek bulgu ikisinden birini kesinleştirmeyebilir.",
  alt: "Alt alta beş kutu ve aralarında aşağı oklar: ribozom, granüllü ER, Golgi aygıtı, salgı vezikülü ve ekzositoz. Her kutunun sağında görevi yazar. Bir yapı seçildiğinde o kutu uyarı tonunda, sonrakiler kesik çizgili ve soluk olur.",
  h: 350,
  picks: ROUTE.slice(0, 4).map((r) => ({ label: r.pick, title: r.pick, detail: [r.res] })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    ROUTE.forEach((r, i) => {
      const cy = 30 + i * 72;
      const broken = pick === i;
      const after = pick >= 0 && i > pick;
      const tone: Tone = broken ? "warn" : after ? "muted" : "ink";
      els.push(...B(120, cy, r.box, { w: 210, bold: true, tone, dash: after, fill: broken ? "warn" : undefined, text: after ? "muted" : "ink", pick: i < 4 ? i : undefined }));
      els.push(T(240, cy, broken ? "aksar" : after ? "ürün ulaşmaz" : r.ok, "e", { tone: broken ? "warn" : after ? "muted" : "ink", bold: broken }));
      if (i < ROUTE.length - 1) els.push(A(120, cy + 25, 120, cy + 47, after || broken ? "muted" : "ink", { dash: after || broken }));
    });
    const r = ROUTE[pick];
    return {
      els,
      readout: r
        ? [`${r.pick}: ${r.res}`, "Bütün proteinler bu yoldan geçmez; sitozolde kalacak birçok protein serbest ribozomda yapılır."]
        : ["Bir yapının adına dokun: o basamak bozulursa öncesi, kendisi ve sonrası ne olur?", "Bozulan yapıyı bulmak için üretimin hangi basamakta durduğunu ayır."],
    };
  },
});

const POCKETS = [
  { name: "Lizozom", l1: "Hidrolitik enzimler", l2: "Hücre içi sindirim", title: "Lizozom: tek zarlı sindirim bölmesi", detail: ["Enzimleri hidroliz yapar; eskimiş yapılar otofajiyle geri dönüştürülür.", "Enzimini kendisi üretmez: proteinleri ribozom ve ER yapar, Golgi paketler."] },
  { name: "Peroksizom", l1: "Katalaz", l2: "2 H₂O₂ → 2 H₂O + O₂", title: "Peroksizom: oksidatif tepkimeler", detail: ["Hidrojen peroksit zararlıdır; katalaz onu su ve oksijene ayırır.", "ATP üreten mitokondriyle ya da sindirim yapan lizozomla aynı organel değildir."] },
  { name: "Kontraktil koful", l1: "Tatlı su protisti", l2: "Fazla suyu dışarı atar", title: "Kontraktil koful: su dengesi", detail: ["Tatlı suda hücreye ozmozla su girer; koful fazlayı ATP harcayarak dışarı atar.", "Bozulursa hücre şişer; bu bulgu kontraktil koful bozukluğuyla uyumludur."] },
  { name: "Merkezî koful", l1: "Olgun bitki hücresi", l2: "Su depolar, turgor", title: "Merkezî koful: depo ve turgor", detail: ["Su ve çözünmüş maddeleri depolar; turgor basıncına katkı yapar.", "Küçük kofulların kaynaşmasıyla büyüyebilir; bitkide bazı parçalayıcı işler de kofulda yürür."] },
];
const pocketFigure = mk({
  caption:
    "Dört tek zarlı bölme, dört ayrı iş (nitel şema): bir kartın adına dokun. Lizozom parçalar, peroksizom hidrojen peroksidi ayırır, kontraktil koful fazla suyu atar, merkezî koful depolar. ‘Tek zar ve enzim’ bilgisi tek başına lizozom demek değildir; sorudaki molekül ipucunu ara.",
  alt: "İki satır, iki sütunluk dört kart: lizozom, peroksizom, kontraktil koful ve merkezî koful. Her kartta adın altında iki kısa satır: bulunduğu yer ya da enzim ve yaptığı iş. Peroksizom kartında 2 H₂O₂ → 2 H₂O + O₂ tepkimesi yazar.",
  h: 252,
  picks: POCKETS.map((p) => ({ label: p.name, title: p.title, detail: p.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    POCKETS.forEach((p, i) => {
      const x0 = i % 2 ? 274 : 8;
      const y0 = i < 2 ? 8 : 132;
      const on = pick === i;
      els.push(R(x0, y0, x0 + 250, y0 + 112, { tone: on ? "a" : "ink", fill: on ? "a" : undefined, bold: on }));
      els.push(T(x0 + 125, y0 + 26, p.name, "c", { bold: true, tone: on ? "a" : "ink", pick: i }));
      els.push(T(x0 + 125, y0 + 62, p.l1, "c", { tone: "muted" }), T(x0 + 125, y0 + 92, p.l2, "c"));
    });
    const p = POCKETS[pick];
    return {
      els,
      readout: p
        ? [`${p.name}: ${p.detail.join(" ")}`, "2023 TYT Fen 15 mantığı: koful bir işlevi yürütebilir ama sindirim enzimini kendisi üretmez."]
        : ["Bir kartın adına dokun: hangi bölme hangi molekülle ne yapar?", "Koful sözcüğü her hücrede aynı büyüklüğü ve görevi söylemez."],
    };
  },
});

const MC_STEPS = ["İkisinde ortak", "Mitokondriye özgü", "Kloroplasta özgü", "Hangi hücrede?"];
const ellipse = (cx: number, cy: number, rx: number, ry: number): [number, number][] =>
  Array.from({ length: 24 }, (_, i) => [cx + rx * Math.cos((i * Math.PI) / 12), cy + ry * Math.sin((i * Math.PI) / 12)]);
const mitoChloroFigure = mk({
  caption:
    "Mitokondri ile kloroplastı üç sütunda karşılaştır (nitel şema, ölçekli değil): ortak sütun çift zar, kendi DNA'sı, ribozom ve ATP sentezidir. Krista ve oksijenli solunum mitokondriyi, tilakoit ve klorofil kloroplastı ayırır. Son adım hangi hücrede hangisinin bulunduğunu gösterir.",
  alt: "Solda kıvrımlı iç zarlı mitokondri, sağda tilakoit yığınları olan kloroplast çizimi. Altlarında üç sütun: mitokondriye özgü, ortak, kloroplasta özgü özellikler adım adım açılır. Son adımda yaprak, kök, hayvan hücresi ve bakteri için mitokondri ve kloroplast tablosu görünür.",
  h: 372,
  steps: MC_STEPS,
  draw: (_v, step) => {
    const crista: [number, number][] = Array.from({ length: 11 }, (_, i) => [40 + i * 11, i % 2 ? 40 : 70]);
    const els: El[] = [
      S(ellipse(95, 55, 80, 38), { tone: "b" }),
      S(ellipse(95, 55, 70, 29), { tone: "b", thin: true }),
      S(crista, { open: true, tone: "b", thin: true }),
      S(ellipse(437, 55, 80, 38), { tone: "c" }),
      S(ellipse(437, 55, 70, 29), { tone: "c", thin: true }),
    ];
    for (const gx of [400, 437, 474]) for (const gy of [40, 52, 64]) els.push(R(gx - 14, gy - 4, gx + 14, gy + 4, { tone: "c", fill: "c" }));
    els.push(T(95, 114, "Mitokondri", "c", { bold: true, tone: "b" }), T(437, 114, "Kloroplast", "c", { bold: true, tone: "c" }));
    if (step < 3) {
      els.push(T(266, 114, "İkisinde ortak", "c", { bold: true }));
      const col = (x: number, items: string[], tone: Tone) => items.forEach((s, i) => els.push(T(x, 156 + i * 34, s, "c", { tone })));
      col(266, ["Çift zar", "Kendi DNA'sı", "Ribozom", "ATP sentezi"], "ink");
      if (step >= 1) col(95, ["Krista", "Matriks", "Oksijenli", "solunum"], "b");
      if (step >= 2) col(437, ["Tilakoit, granum", "Stroma", "Klorofil", "Fotosentez"], "c");
    } else {
      els.push(...table(["Hücre", "Mitokondri", "Kloroplast"], [["Yaprak hücresi", "Var", "Var"], ["Kök hücresi", "Var", "Yok"], ["Hayvan hücresi", "Var", "Yok"], ["Bakteri", "Yok", "Yok"]], { y0: 140 }).els);
    }
    const readout = [
      [
        "Ortak: çift zar, kendi DNA, RNA ve ribozomları, ATP sentezi. Proteinlerinin önemli bölümü yine çekirdek genlerince kodlanır.",
        "Ortak özellikler iki organeli birbirinden ayırmaz; ayırt edici olanı ara.",
      ],
      ["Mitokondri: iç zar kıvrımları krista, iç sıvı matriks; oksijenli solunumun önemli basamakları burada.", "Krista yüzeyi azalırsa iç zardaki ATP üretimi düşer; sitozoldeki glikoliz durmak zorunda değildir."],
      ["Kloroplast: tilakoit zarları ve granum yığınları ışık tepkimelerini, stroma organik madde üretimini taşır; klorofil bu organeli ayırır.", "Hücre enerji yaratmaz; ışık ya da besin enerjisini ATP'ye aktarır."],
      [
        "Bitkiler de solunum yapar: yaprak hücresinde ikisi birlikte, kök hücresinde yalnız mitokondri bulunur. Hayvan hücresinde kloroplast beklenmez.",
        "ATP yalnız mitokondride üretilmez: sitozolde glikoliz, kloroplastta ışık tepkimeleri, bakteride hücre zarı da ATP sentezler.",
      ],
    ][step];
    return { els, readout };
  },
});

/* =====================================================================
 * 033 Besin Zinciri ve Ağı
 * ===================================================================== */

const ARROW_STEPS = ["Bu dersin anahtarı", "Davranış okuması", "Madde döner, enerji dağılır"];
const arrowFigure = mk({
  caption:
    "Aynı üç canlı, iki farklı ok anlamı (özgün model): bu derste ok yenilenden yiyene gider ve madde ile kimyasal enerjinin aktarıldığı yönü gösterir. Avcıdan ava çizilen ok davranışı anlatır; şekil başka anahtar veriyorsa önce anahtarı oku. Son adım madde dönüşünü ve ısı kaybını ayırır.",
  alt: "Yan yana üç kutu: ot, tavşan, tilki. İlk adımda oklar ottan tavşana ve tavşandan tilkiye gider. İkinci adımda oklar kesik çizgili ve ters yöndedir. Üçüncü adımda her kutudan yukarı ısı okları ve tilkiden ota alttan dönen kesik madde yolu çizilir.",
  h: 290,
  steps: ARROW_STEPS,
  draw: (_v, step) => {
    const xs = [80, 266, 452];
    const names = ["Ot", "Tavşan", "Tilki"];
    const ws = names.map((s) => bw(s, true));
    const els: El[] = [];
    names.forEach((s, i) => els.push(...B(xs[i], 130, s, { bold: true, w: ws[i] })));
    for (let i = 0; i < 2; i++) {
      const a = xs[i] + ws[i] / 2 + 8;
      const b = xs[i + 1] - ws[i + 1] / 2 - 8;
      if (step === 1) els.push(A(b, 130, a, 130, "warn", { dash: true }));
      else els.push(A(a, 130, b, 130, "a", { bold: true }));
    }
    if (step === 2) {
      xs.forEach((x) => els.push(A(x, 106, x, 66, "warn", { dash: true }), T(x, 46, "ısı", "c", { tone: "warn" })));
      els.push(L(452, 154, 452, 196, { tone: "c", dash: true }), L(452, 196, 80, 196, { tone: "c", dash: true }), A(80, 196, 80, 158, "c", { dash: true }));
      els.push(T(266, 222, "madde ayrıştırıcıyla döner", "c", { tone: "c" }));
    }
    const key = [
      "Ok: yenilenden yiyene (madde ve enerji)",
      "Ok: avcıdan ava (davranış, bu anahtar değil)",
      "Enerji ısıyla çıkar; geri dönmez",
    ][step];
    els.push(T(266, 266, key, "c", { bold: true, tone: step === 1 ? "warn" : "ink" }));
    const readout = [
      ["Ot → tavşan oku: otun maddesi ve kimyasal enerjisi tavşana aktarılabilir. Tavşan → tilki aynı anlamda.", "Ok bir aktarımın yönüdür; enerjinin yüzde yüzünün geçtiğini söylemez."],
      ["Bu çizimde oklar ‘kim kimi kovalar’ yönünde. Ders anahtarıyla okunursa tilki tavşanın besini sanılır.", "Şekilde okların anlamı yazılıysa önce onu oku; yazılı değilse bu dersin anahtarını kullan."],
      ["Her düzeyde solunumla enerjinin bir bölümü ısıya döner; ısı üreticiye geri dönmez. Karbon ve azot gibi maddeler ayrıştırıcılarla yeniden kullanılabilir.", "Besin oku ile madde döngüsü oku ayrı anahtarla gösterilir."],
    ][step];
    return { els, readout };
  },
});

const LINKS = ["Çayır otu", "Çekirge", "Kurbağa", "Yılan", "Şahin"];
const ORD = ["birincil", "ikincil", "üçüncül", "dördüncül"];
const chainFigure = mk({
  caption:
    "Bir zincir tek bir yoldur (özgün model): sürgüyle zincire canlı ekle. Üretici 1. düzeydir; n canlılı yolda n − 1 ok, yani n − 1 beslenme aktarımı vardır. Güneş enerji kaynağıdır, canlı değildir ve trofik düzey sayılmaz.",
  alt: "Alt alta kutular: en üstte kesik çizgili Güneş, altında çayır otu, çekirge, kurbağa, yılan ve şahin. Sürgüyle seçilen sayıda kutu etkin, kalanlar soluk ve kesik çizgilidir. Her etkin kutunun sağında trofik düzey ve tüketici sırası yazar.",
  h: 414,
  param: { label: "Zincirdeki canlı sayısı (n)", min: 2, max: 5, step: 1, init: 4 },
  draw: (n) => {
    const els: El[] = [...B(110, 34, "Güneş", { w: 180, dash: true, tone: "muted", text: "muted" }), T(222, 34, "enerji kaynağı; düzey değil", "e", { tone: "muted" }), A(110, 58, 110, 86, "muted", { dash: true })];
    LINKS.forEach((s, i) => {
      const cy = 110 + i * 70;
      const on = i < n;
      els.push(...B(110, cy, s, { w: 180, bold: on, dash: !on, tone: on ? (i === n - 1 ? "a" : "ink") : "muted", fill: on && i === n - 1 ? "a" : undefined, text: on ? "ink" : "muted" }));
      if (on) els.push(T(222, cy, i === 0 ? "1. düzey · üretici" : `${i + 1}. düzey · ${ORD[i - 1]} tüketici`, "e", { tone: i === n - 1 ? "a" : "ink", bold: i === n - 1 }));
      if (i < LINKS.length - 1) els.push(A(110, cy + 24, 110, cy + 46, i + 1 < n ? "ink" : "muted", { dash: i + 1 >= n }));
    });
    return {
      els,
      readout: [
        `${n} canlı, ${n - 1} ok: ${LINKS.slice(0, n).join(" → ")}.`,
        `Son canlı ${LINKS[n - 1].toLocaleLowerCase("tr-TR")}: ${n}. trofik düzey, ${ORD[n - 2]} tüketici. Tüketici sırası düzeyden bir eksiktir.`,
      ],
    };
  },
});

const WEB_NODES: Record<string, { x: number; y: number }> = {
  Balıkçıl: { x: 300, y: 34 },
  "Küçük balık": { x: 130, y: 124 },
  "Su piresi": { x: 100, y: 214 },
  Salyangoz: { x: 340, y: 214 },
  Alg: { x: 150, y: 304 },
  "Su bitkisi": { x: 400, y: 304 },
};
const WEB_CHAINS = [
  ["Alg", "Su piresi", "Küçük balık", "Balıkçıl"],
  ["Su bitkisi", "Salyangoz", "Balıkçıl"],
  ["Alg", "Salyangoz", "Balıkçıl"],
];
const WEB_EDGES = [...new Set(WEB_CHAINS.flatMap((c) => c.slice(1).map((s, i) => `${c[i]}|${s}`)))];
/** Kutunun kenarında biten ok ucu (dikdörtgen kırpma). */
function clip(a: { x: number; y: number }, b: { x: number; y: number }, w: number, h: number, gap = 6): [number, number] {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const k = Math.min(Math.abs(dx) > 0 ? (w / 2 + gap) / Math.abs(dx) : Infinity, Math.abs(dy) > 0 ? (h / 2 + gap) / Math.abs(dy) : Infinity);
  return [b.x + dx * k, b.y + dy * k];
}
const WEB_STEPS = ["1. zincir", "2. zincir", "3. zincir", "Ağ: üç zincir birlikte"];
const webFigure = mk({
  caption:
    "Göl ağı kesişen zincirlerden kurulur (özgün model, ölçekli değil): adım adım üç zinciri aç; son adımda ağın tamamı görünür. Oklar besinden tüketiciye gider. Alg ve salyangoz ikişer zincirde, balıkçıl üçünde yer alır; balıkçılın doğrudan besini yalnız ona ok gönderen canlılardır.",
  alt: "Altta iki üretici: alg ve su bitkisi. Ortada su piresi ve salyangoz, üstte küçük balık, en üstte balıkçıl. Altı ok: alg su piresine ve salyangoza, su bitkisi salyangoza, su piresi küçük balığa, küçük balık ve salyangoz balıkçıla. Her adımda bir zincirin okları kalınlaşır.",
  h: 330,
  steps: WEB_STEPS,
  draw: (_v, step) => {
    const all = step === 3;
    const chain = WEB_CHAINS[step] ?? [];
    const onEdge = new Set(chain.slice(1).map((s, i) => `${chain[i]}|${s}`));
    const els: El[] = [];
    const size = (s: string) => ({ w: bw(s, true), h: 44 });
    for (const e of WEB_EDGES) {
      const [p, q] = e.split("|");
      const on = all || onEdge.has(e);
      const a = WEB_NODES[p];
      const b = WEB_NODES[q];
      const [x0, y0] = clip(b, a, size(p).w, 44);
      const [x1, y1] = clip(a, b, size(q).w, 44);
      els.push(A(x0, y0, x1, y1, on ? (all ? "ink" : "a") : "muted", { bold: on && !all, thin: !on, dash: !on }));
    }
    for (const [s, p] of Object.entries(WEB_NODES)) {
      const on = all || chain.includes(s);
      const producer = s === "Alg" || s === "Su bitkisi";
      els.push(...B(p.x, p.y, s, { bold: on, w: size(s).w, tone: on ? (producer ? "c" : "ink") : "muted", fill: on && producer ? "c" : undefined, text: on ? "ink" : "muted" }));
    }
    const lvl = chain.length;
    const readout = all
      ? [
          `6 canlı, ${WEB_EDGES.length} ok, 3 zincir. Alg ve salyangoz ikişer zincirde, balıkçıl üç zincirin de sonunda.`,
          "Balıkçılın doğrudan besini küçük balık ve salyangoz; alg, su bitkisi ve su piresi dolaylı kaynaklardır. Ağda görünmeyen bağlantı doğada kesin yok demek değildir.",
        ]
      : [`${step + 1}. zincir: ${chain.join(" → ")}. Balıkçıl bu yolda ${lvl}. düzeyde.`, "Zinciri üreticiden başlat ve okları tek tek izle; başka zincirin oklarını bu yola katma."];
    return { els, readout };
  },
});

const CASCADE_STEPS = ["Tilki azalır", "Tavşana baskı düşer", "Ota baskı artar", "Kesinleştirme sınırı"];
const cascadeFigure = mk({
  caption:
    "Dolaylı etkiyi neden zinciriyle yaz (özgün model, diğer koşullar sabit varsayımıyla): tilki sayısı düşerse tavşanlar daha az avlanır, tavşan çoğalabilir ve ot daha çok yenebilir. Son adım bu eğilimi değiştirebilecek koşulları gösterir; ağ etki büyüklüğünü vermez.",
  alt: "Alt alta üç kutu: tilki, tavşan, ot; oklar ottan tavşana ve tavşandan tilkiye yukarı gider. Kutuların sağında adım adım azalır, artabilir, azalabilir yazıları açılır. Son adımda sağda kesik çizgili üç kutu: başka avcı, göç, kaynak ve hastalık.",
  h: 300,
  steps: CASCADE_STEPS,
  draw: (_v, step) => {
    const ys = [50, 150, 250];
    const names = ["Tilki", "Tavşan", "Ot"];
    const marks: [string, Tone][] = [
      ["azalır", "warn"],
      ["artabilir", "a"],
      ["azalabilir", "c"],
    ];
    const els: El[] = [];
    names.forEach((s, i) => {
      const on = i <= Math.min(step, 2);
      els.push(...B(110, ys[i], s, { w: 150, bold: true, tone: on ? marks[i][1] : "ink" }));
      if (on) els.push(T(200, ys[i], marks[i][0], "e", { bold: true, tone: marks[i][1] }));
    });
    els.push(A(110, 226, 110, 176, "ink"), A(110, 126, 110, 76, "ink"));
    if (step === 3) {
      ["Başka avcı", "Göç", "Kaynak, hastalık"].forEach((s, i) => els.push(...B(430, ys[i], s, { w: 170, dash: true, tone: "muted", text: "muted" })));
    }
    const readout = [
      ["Tilki sayısı düşerse tavşanlara yönelen doğrudan av baskısı hafifler.", "Oklar besin yönünde (ot → tavşan → tilki); etki zinciri ise yukarıdan aşağı izlenir."],
      ["Öteki koşullar değişmiyorsa tavşan sayısı yükselebilir. ‘Artar’ değil ‘artabilir’: bu bir eğilim beklentisidir."],
      ["Tavşan artarsa ot üzerindeki tüketim baskısı artar ve ot azalabilir. Bu iki basamaklı yol trofik kaskattır, doğrudan avlanma değildir."],
      ["Başka bir avcı, göç, ot kıtlığı ya da hastalık yönü değiştirebilir. Yalnız bağlantılardan kesin nüfus ya da süre hesaplanmaz.", "Birlikte değişme tek neden kanıtı değildir; kontrol alanı ve önceki dönem verisi gerekir."],
    ][step];
    return { els, readout };
  },
});

/* =====================================================================
 * 013 Canlıların Sınıflandırılması
 * ===================================================================== */

const RANKS = ["Üst âlem", "Âlem", "Şube", "Sınıf", "Takım", "Familya", "Cins", "Tür"];
const WOLF = ["Eukarya", "Animalia", "Chordata", "Mammalia", "Carnivora", "Canidae", "Canis", "Canis lupus"];
/** Örnek canlılar ve kurtla paylaştıkları basamak sayısı (Eukarya = 1). */
const TAXA: [string, number][] = [
  ["Kurt", 8],
  ["Çakal", 7],
  ["Tilki", 6],
  ["Kedi", 5],
  ["İnsan", 4],
  ["Kartal", 3],
  ["Arı", 2],
  ["Meşe", 1],
  ["E. coli", 0],
];
const ladderFigure = mk({
  caption:
    "Basamaklar iç içe daralır (gerçek sınıflandırma; kurt, Canis lupus, örnek alındı): sürgüyle basamağı seç. Seçilen basamakta kurtla aynı taksonda kalan örnekler vurgulanır. Üst âlemden türe indikçe kapsanan canlı sayısı azalır, ortak özellik ve akrabalık artar.",
  alt: "Solda alt alta sekiz basamak ve kurdun taksonları: Eukarya, Animalia, Chordata, Mammalia, Carnivora, Canidae, Canis, Canis lupus. Sağda dokuz örnek canlı kutusu: kurt, çakal, tilki, kedi, insan, kartal, arı, meşe, E. coli. Seçilen basamakta kurtla aynı taksondakiler dolu, diğerleri kesik çizgilidir.",
  h: 338,
  param: { label: "Basamak (1 üst âlem, 8 tür)", min: 1, max: 8, step: 1, init: 4 },
  draw: (r) => {
    const els: El[] = [];
    RANKS.forEach((rank, i) => {
      const y = 22 + i * 40;
      const sel = i === r - 1;
      if (sel) els.push(R(4, y - 18, 262, y + 18, { tone: "a", fill: "a" }));
      els.push(T(14, y, `${rank}: ${WOLF[i]}`, "e", { bold: sel, tone: i < r ? "ink" : "muted" }));
    });
    TAXA.forEach(([s, depth], i) => {
      const cx = 318 + (i % 3) * 82;
      const cy = 50 + Math.floor(i / 3) * 110;
      const on = depth >= r;
      els.push(...B(cx, cy, s, { w: 76, h: 60, bold: on, tone: on ? "a" : "muted", fill: on ? "a" : undefined, dash: !on, text: on ? "ink" : "muted" }));
    });
    const k = TAXA.filter(([, d]) => d >= r).length;
    return {
      els,
      readout: [
        `${RANKS[r - 1]}: ${WOLF[r - 1]}. Bu taksonda kurtla birlikte kalan örnek: ${k} / ${TAXA.length}.`,
        "Kapsam ve çeşitlilik türe doğru azalır; ortak özellik, gen ve protein benzerliği artar (2024 TYT Fen 17 mantığı). Basamaklarda sabit üye kotası yoktur.",
      ],
    };
  },
});

const SPECIES_CASES = [
  {
    label: "At ve eşek",
    path: ["q1y", "q2n"],
    title: "At ve eşek: döl var, verimli değil",
    detail: ["Equus caballus ve Equus asinus aynı cinste, farklı türlerdir (2n = 64 ve 62).", "Melezleri katır doğar ama genellikle kısırdır; verimli döl ölçütü sağlanmaz."],
  },
  {
    label: "İki köpek ırkı",
    path: ["q1y", "q2y"],
    title: "Köpek ırkları: görünüş farklı, tür aynı",
    detail: ["Boyutları ve görünüşleri çok farklı ırklar çiftleşip verimli döl verebilir.", "Benzer görünüş aynı türü kanıtlamadığı gibi farklı görünüş de farklı türü kanıtlamaz."],
  },
  {
    label: "Bakteri klonu",
    path: ["q1n"],
    title: "Eşeysiz üreyende çiftleşme ölçütü yok",
    detail: ["Bölünerek çoğalan bakteride çiftleşme deneyi uygulanamaz.", "Yapı, biyokimya ve DNA dizisi gibi başka ölçütler kullanılır."],
  },
  {
    label: "Fosil",
    path: ["q1n"],
    title: "Fosilde üreme gözlenemez",
    detail: ["Yaşamayan canlıda döl verme sınanamaz.", "Morfolojik karşılaştırma ve korunmuşsa moleküler veri kullanılır."],
  },
];
const speciesFigure = mk({
  caption:
    "Biyolojik tür ölçütünü uygulanabildiği yerde kullan (gerçek örnekler): bir duruma dokun ve karar yolunu izle. Eşeyli ve yaşayan popülasyonda doğal koşulda verimli döl ölçütü işler; eşeysiz canlıda ya da fosilde başka kanıtlar gerekir. Kromozom sayısı tür belgesi değildir.",
  alt: "Karar akışı: en üstte eşeyli üreyen yaşayan popülasyon mu sorusu. Evet kolu, doğal koşulda verimli döl verir mi sorusuna; oradan evet aynı tür, hayır farklı türler kutusuna gider. Hayır kolu çiftleşme ölçütü uygulanamaz kutusuna gider. Altta dört seçilebilir durum: at ve eşek, iki köpek ırkı, bakteri klonu, fosil.",
  h: 428,
  picks: SPECIES_CASES.map((c) => ({ label: c.label, title: c.title, detail: c.detail })),
  draw: (_v, _s, pick) => {
    const path = new Set(SPECIES_CASES[pick]?.path ?? []);
    const t = (k: string): Tone => (path.has(k) ? "a" : "ink");
    const els: El[] = [
      ...B(266, 34, "Eşeyli üreyen, yaşayan\npopülasyon mu?", { w: 300, bold: true }),
      ...B(150, 150, "Doğal koşulda çiftleşip\nverimli döl verir mi?", { w: 250, bold: true, tone: path.has("q1y") ? "a" : "ink" }),
      ...B(420, 150, "Çiftleşme ölçütü\nuygulanamaz", { w: 190, bold: true, tone: t("q1n"), fill: path.has("q1n") ? "a" : undefined }),
      ...B(80, 262, "Aynı tür", { w: 130, bold: true, tone: t("q2y"), fill: path.has("q2y") ? "a" : undefined }),
      ...B(240, 262, "Farklı türler", { w: 150, bold: true, tone: t("q2n"), fill: path.has("q2n") ? "a" : undefined }),
      T(420, 214, "Yapı, biyokimya, DNA", "c", { tone: path.has("q1n") ? "a" : "muted" }),
      A(200, 64, 160, 114, t("q1y"), { bold: path.has("q1y") }),
      T(160, 84, "Evet", "w", { tone: t("q1y") }),
      A(332, 64, 400, 114, t("q1n"), { bold: path.has("q1n") }),
      T(380, 84, "Hayır", "e", { tone: t("q1n") }),
      A(110, 186, 86, 234, t("q2y"), { bold: path.has("q2y") }),
      T(84, 206, "Evet", "w", { tone: t("q2y") }),
      A(190, 186, 226, 234, t("q2n"), { bold: path.has("q2n") }),
      T(222, 206, "Hayır", "e", { tone: t("q2n") }),
    ];
    SPECIES_CASES.forEach((c, i) => {
      const cx = 136 + (i % 2) * 262;
      const cy = 340 + Math.floor(i / 2) * 58;
      const on = pick === i;
      els.push(...B(cx, cy, c.label, { w: 250, h: 50, tone: on ? "a" : "ink", fill: on ? "a" : undefined, bold: on, pick: i }));
    });
    const c = SPECIES_CASES[pick];
    return {
      els,
      readout: c
        ? [`${c.label}: ${c.detail.join(" ")}`, "Kromozom sayısı aynı olan farklı türler vardır: ev kedisi ve evcil domuzda 2n = 38."]
        : ["Bir durumun adına dokun: hangi ölçüt uygulanabilir, sonuç ne olur?", "Tek bir bireyin üreyememesi onu türün dışına çıkarmaz; ölçüt popülasyonlar içindir."],
    };
  },
});

const NAMES: [string, string, string][] = [
  ["Kurt", "Canis", "lupus"],
  ["Altın çakal", "Canis", "aureus"],
  ["Kızıl tilki", "Vulpes", "vulpes"],
  ["Ahtapot", "Octopus", "vulgaris"],
  ["Kekik", "Thymus", "vulgaris"],
];
const NAME_STEPS = ["İki sözcüğe ayır", "Cinse göre grupla", "Aynı ikinci sözcük", "Yazım ve kısaltma"];
const namesFigure = mk({
  caption:
    "İkili adı iki sütuna ayır (gerçek adlar): ilk sözcük cins, ikinci sözcük tamamlayıcı addır; tür adı ikisinin birlikteliğidir. Aynı ilk sözcük aynı cinsi gösterir. Aynı ikinci sözcük farklı cinslerde yeniden kullanılabilir ve tek başına türü belirlemez.",
  alt: "Üç sütunlu tablo: yaygın ad, cins ve tamamlayıcı ad. Satırlar kurt Canis lupus, altın çakal Canis aureus, kızıl tilki Vulpes vulpes, ahtapot Octopus vulgaris ve kekik Thymus vulgaris. Adımlarda Canis satırları, sonra vulgaris satırları vurgulanır; son adımda Homo sapiens ve H. sapiens kısaltması gösterilir.",
  h: 372,
  steps: NAME_STEPS,
  draw: (_v, step) => {
    const hiRows = step === 1 ? [0, 1] : step === 2 ? [3, 4] : [];
    const tone: Tone = step === 2 ? "warn" : "a";
    const ws = [184, 172, 172];
    const xs = [2, 186, 358];
    const els: El[] = [];
    const rows: string[][] = [["Yaygın ad", "Cins", "Tamamlayıcı ad"], ...NAMES];
    rows.forEach((r, ri) => {
      const cy = 26 + ri * 44;
      const on = hiRows.includes(ri - 1);
      r.forEach((s, c) => {
        const col = step === 1 ? 1 : 2;
        const mark = on && c === col;
        els.push(...B(xs[c] + ws[c] / 2, cy, s, { w: ws[c], h: 44, bold: ri === 0 || mark, fill: ri === 0 ? "muted" : mark ? tone : undefined, tone: mark ? tone : "ink" }));
      });
    });
    if (step === 3) {
      els.push(...B(150, 316, "Homo sapiens", { w: 200, bold: true, tone: "a" }), A(256, 316, 312, 316, "a"), ...B(400, 316, "H. sapiens", { w: 160, bold: true, tone: "a" }));
      els.push(T(266, 356, "Cins önce açıkça yazıldıysa kısaltılır", "c", { tone: "muted" }));
    }
    const readout = [
      ["Her adı cins | tamamlayıcı ad diye böl: Canis | lupus, Vulpes | vulpes, Thymus | vulgaris.", "Vulpes vulpes'te iki sözcük aynı yazılsa da biri cins, öteki tamamlayıcı addır; hayvan adlandırmasında bu izinlidir."],
      ["Kurt ve altın çakal aynı cinstedir (Canis), farklı türlerdir. Aynı cins aynı familyayı da gerektirir; kızıl tilki aynı familyada (Canidae) ama başka cinstedir."],
      ["Octopus vulgaris bir yumuşakça, Thymus vulgaris bir bitkidir: ikinci sözcük aynı, cins ve âlem bile farklı.", "Tamamlayıcı ad yalnız başına bir türü adlandırmaz; tür, iki sözcüğün birlikte yazılmasıyla belirlenir."],
      ["Cins büyük harfle, tamamlayıcı ad küçük harfle başlar; ikisi birlikte italik basılır, el yazısında ayrı ayrı altı çizilir.", "Gerçek bir canlı adı uydurulmaz; sınavdaki adlar verilen kurallarla okunur."],
    ][step];
    return { els, readout };
  },
});

const CLAIMS = [
  {
    short: "Aynı cins, aynı kromozom sayısı",
    claim: "Aynı cinsteki iki türün kromozom sayısı kesinlikle aynıdır.",
    counter: "At (Equus caballus) 2n = 64, eşek (Equus asinus) 2n = 62: aynı cins, farklı sayı.",
    rule: "Aynı cins, aynı familyayı ve üst basamakları kesinleştirir; sayı eşitliğini değil.",
    ref: "2021 TYT Fen 17 mantığı",
  },
  {
    short: "Taksonlarda eşit üye sayısı",
    claim: "Her taksonun üye sayısı eşittir; her cinste aynı sayıda tür vardır.",
    counter: "Homo cinsinin yaşayan tek türü vardır; Panthera cinsinde aslan, kaplan, leopar, jaguar ve kar leoparı yaşar.",
    rule: "Taksonlar iç içe bir düzen kurar ama sabit üye kotası izlemez.",
    ref: "2020 TYT Fen 17 mantığı",
  },
  {
    short: "Tek hücreli, prokaryot",
    claim: "Tek hücreli canlıların hepsi prokaryottur.",
    counter: "Amip hem tek hücreli hem ökaryottur; iki koşulu birlikte taşır.",
    rule: "Hücre sayısı ile hücre tipi ayrı ölçütlerdir.",
    ref: "",
  },
  {
    short: "Suda yaşayan, aynı sınıf",
    claim: "Suda yaşayan omurgalılar aynı sınıftadır.",
    counter: "Yunus memelidir (Mammalia), levrek balıktır; ikisi de suda yaşar.",
    rule: "Yaşam ortamı akrabalık ölçütü değildir; yapı, gelişim ve dizi kanıtı birlikte tartılır.",
    ref: "",
  },
  {
    short: "Aynı kromozom sayısı, aynı tür",
    claim: "Kromozom sayısı aynı olan iki canlı aynı türdür.",
    counter: "Ev kedisi ve evcil domuzda 2n = 38; biri kedigillerde, öteki domuzgillerde.",
    rule: "Sayı eşitliği tür ya da yakın akrabalık belgesi değildir.",
    ref: "",
  },
];
const claimLines = CLAIMS.map((c) => wrap(c.claim, 488, true));
const claimRowsH = claimLines.reduce((s, l) => s + 16 + l.length * 28, 0);
const cardMax = Math.max(...CLAIMS.map((c) => wrap(c.counter, 488).length + wrap(c.rule, 488).length));
const claimH = claimRowsH + 24 + 44 + cardMax * 28 + 14;
const claimFigure = mk({
  caption:
    "Çürütme kartı (gerçek karşı örnekler): bir kesinlik iddiasına dokun. İddianın bütün koşullarını taşıyan tek bir gerçek karşı örnek genellemeyi çürütür; altta doğru koşullu kural yazar. Karşı örnek yalnız o iddiayı bozar, sorudaki diğer öncülleri kendiliğinden yanlış yapmaz.",
  alt: "Alt alta beş kesinlik iddiası: aynı cinste aynı kromozom sayısı, eşit takson üye sayısı, tek hücrelilerin hepsi prokaryot, suda yaşayan omurgalılar aynı sınıf, aynı kromozom sayısı aynı tür. Altta seçilen iddianın karşı örneği ve doğru kuralı kartı.",
  h: claimH,
  picks: CLAIMS.map((c) => ({ label: c.short, title: "Karşı örnek", detail: [c.counter, c.rule, ...(c.ref ? [c.ref] : [])] })),
  draw: (_v, _s, pick) => {
    const els: El[] = [];
    let y = 8;
    CLAIMS.forEach((c, i) => {
      const on = pick === i;
      const ls = claimLines[i];
      const h = 16 + ls.length * 28;
      els.push(R(4, y, 10, y + h - 6, { tone: on ? "a" : "muted", fill: on ? "a" : "muted" }));
      ls.forEach((s, k) => els.push(T(22, y + 20 + k * 28, s, "e", { bold: true, tone: on ? "a" : "ink", pick: k === 0 ? i : undefined })));
      y += h;
    });
    y += 24;
    const c = CLAIMS[pick];
    const body = c ? [...wrap(c.counter, 488), ...wrap(c.rule, 488)] : wrap("Bir iddiaya dokun; karşı örnek ve koşullu kural burada açılır.", 488);
    const cardH = 44 + cardMax * 28;
    els.push(R(4, y, 528, y + cardH, { tone: c ? "c" : "muted", dash: !c }));
    els.push(T(20, y + 24, c ? "Karşı örnek ve doğru kural" : "Karşı örnek", "e", { bold: true, tone: c ? "c" : "muted" }));
    body.forEach((s, k) => els.push(T(20, y + 56 + k * 28, s, "e", { tone: c ? "ink" : "muted" })));
    return {
      els,
      readout: c
        ? [`İddia: ${c.claim}`, `Karşı örnek: ${c.counter} Kural: ${c.rule}${c.ref ? ` (${c.ref})` : ""}`]
        : ["Bir iddiaya dokun: koşullarını taşıyan gerçek bir karşı örnek var mı?"],
    };
  },
});

/* =====================================================================
 * 027 Mendel'den Sapmalar
 * ===================================================================== */

const CHANGES = [
  {
    head: "Heterozigot\ngörünümü",
    ex: "Rr ara ya da MN iki işaret",
    title: "Eksik ve eş baskınlık",
    detail: ["Değişen: heterozigotun fenotipi. Değişmeyen: alellerin gamete ayrılması.", "Rr × Rr genotip oranı yine 1:2:1; fenotip 3:1 yerine 1:2:1 olur."],
  },
  {
    head: "Popülasyondaki\nalel sayısı",
    ex: "3 alel → 6 genotip",
    title: "Çok alellilik",
    detail: ["Değişen: popülasyonda aynı lokustaki alel çeşidi. Diploit birey yine en çok iki alel taşır.", "n alel için sırasız genotip sayısı n(n + 1)/2: 3 alelde 6, 4 alelde 10."],
  },
  {
    head: "İki lokusun\nbirlikte taşınması",
    ex: "AB/ab: 2 gamet türü",
    title: "Bağlı genler",
    detail: ["Değişen: bağımsız dağılım. Aynı kromozomdaki iki lokus birlikte gamete gider.", "Parça değişimi yoksa AB/ab yalnız AB ve ab verir; bağımsız olsaydı dört tür gamet beklenirdi."],
  },
  {
    head: "Gen ile özellik\neşleşmesi",
    ex: "1 gen → 2 özellik",
    title: "Pleiotropi, epistazi, çok gen",
    detail: ["Bir gen birden çok özelliği etkileyebilir (pleiotropi); bir lokus başka lokusun etkisini örtebilir (epistazi).", "Boy gibi nicel özelliklerde birden çok gen ve çevre birlikte etkilidir."],
  },
];
const changeFigure = mk({
  caption:
    "Mendel oranı tutmadığında önce hangi varsayımın değiştiğini seç: heterozigot görünümü mü, popülasyondaki alel sayısı mı, iki lokusun birlikte taşınması mı, gen ile özellik eşleşmesi mi? Bir kutuya dokun; değişen ve değişmeyen ayrı yazılır. Sapma, kuralsızlık demek değildir.",
  alt: "Üstte ‘oran tutmadı’ kutusu; soldan inen gövdeden dört dal: heterozigot görünümü, popülasyondaki alel sayısı, iki lokusun birlikte taşınması, gen ile özellik eşleşmesi. Her dalın sağında kısa sayısal örnek yazar.",
  h: 440,
  picks: CHANGES.map((c) => ({ label: c.head.replace("\n", " "), title: c.title, detail: c.detail })),
  draw: (_v, _s, pick) => {
    const els: El[] = [...B(190, 30, "Beklenen oran tutmadı", { w: 300, bold: true }), L(30, 52, 30, 394, { tone: "muted" })];
    CHANGES.forEach((c, i) => {
      const cy = 118 + i * 92;
      const on = pick === i;
      els.push(L(30, cy, 52, cy, { tone: on ? "a" : "muted" }));
      els.push(...B(160, cy, c.head, { w: 212, bold: true, tone: on ? "a" : "ink", fill: on ? "a" : undefined, pick: i }));
      els.push(T(282, cy, c.ex, "e", { tone: on ? "a" : "muted", bold: on }));
    });
    const c = CHANGES[pick];
    return {
      els,
      readout: c
        ? [`${c.title}: ${c.detail.join(" ")}`]
        : ["Bir dala dokun: soruda hangi değişken etkilenmiş?", "Önce modeli seç, sonra o modelin hesabını uygula."],
    };
  },
});

const CROSSES: [string, string][] = [
  ["MM", "NN"],
  ["MN", "MN"],
  ["MN", "NN"],
];
const gam = (g: string) => [g[0], g[1]];
const geno = (a: string, b: string) => [a, b].sort().join("");
const codomFigure = mk({
  caption:
    "Eş baskınlıkta üç çaprazlama (MN kan grubu): Punnett karesindeki her kutu eş olasılıklı bir gamet birleşmesidir. MN bireyde M ve N antijenlerinin ikisi birlikte bulunur; ara bir antijen oluşmaz. Payları kutular sayarak bul ve adımlarla çaprazlamayı değiştir.",
  alt: "Solda 2 × 2 Punnett karesi; üstte ve solda gamet pulları. Sağda üç pay çubuğu: yalnız M (MM), M ve N (MN), yalnız N (NN), yanlarında kesirler. Adımlar MM × NN, MN × MN ve MN × NN çaprazlamalarını gösterir.",
  h: 252,
  steps: CROSSES.map(([a, b]) => `${a} × ${b}`),
  draw: (_v, step) => {
    const [p, q] = CROSSES[step];
    const rows = gam(p);
    const cols = gam(q);
    const els: El[] = [T(125, 16, `${p} × ${q}`, "c", { bold: true })];
    cols.forEach((g, j) => els.push(C(125 + j * 70, 60, 17, { tone: "b", fill: "b" }), T(125 + j * 70, 60, g, "c", { bold: true })));
    rows.forEach((g, i) => els.push(C(50, 120 + i * 70, 17, { tone: "c", fill: "c" }), T(50, 120 + i * 70, g, "c", { bold: true })));
    const count: Record<string, number> = { MM: 0, MN: 0, NN: 0 };
    rows.forEach((r, i) =>
      cols.forEach((c, j) => {
        const g = geno(r, c);
        count[g]++;
        els.push(...B(125 + j * 70, 120 + i * 70, g, { w: 70, h: 70, bold: g === "MN", fill: g === "MN" ? "a" : undefined }));
      }),
    );
    const items: [string, string][] = [
      ["MM", "Yalnız M (MM)"],
      ["MN", "M ve N (MN)"],
      ["NN", "Yalnız N (NN)"],
    ];
    const fr = (n: number) => (n === 0 ? "0" : n === 4 ? "1" : n === 2 ? "1/2" : `${n}/4`);
    items.forEach(([g, s], i) => {
      const y = 92 + i * 52;
      els.push(T(240, y, s, "e", { bold: g === "MN" }));
      els.push(L(394, y - 14, 394, y + 14, { tone: "muted", thin: true }));
      if (count[g]) els.push(R(394, y - 10, 394 + (count[g] / 4) * 88, y + 10, { tone: g === "MN" ? "a" : "b", fill: g === "MN" ? "a" : "b" }));
      els.push(T(394 + (count[g] / 4) * 88 + 8, y, fr(count[g]), "e", { bold: true }));
    });
    const readout = [
      ["MM × NN: bütün kutular MN; yavruların hepsinde M ve N antijenleri birlikte bulunur."],
      ["MN × MN: MM 1/4, MN 1/2, NN 1/4; genotip ve fenotip oranı 1:2:1. İki işaret birlikte yalnız MN'de: 1/2.", "Eksik baskınlıktaki 1:2:1 ile sayı aynı, mekanizma farklı: MN'de ara antijen yok, iki antijen birlikte."],
      ["MN × NN: MN 1/2, NN 1/2; MM oluşmaz. NN ebeveyn yalnız N gameti verir."],
    ][step];
    return { els, readout };
  },
});

const MULTI_STEPS = ["Pleiotropi", "Epistazi (9:3:4)", "Çok gen, eklemeli etki"];
const G4 = ["AB", "Ab", "aB", "ab"];
const multiFigure = mk({
  caption:
    "Bir gen, birden çok etki ya da birden çok gen, bir özellik (varsayımsal modeller): ilk adımda tek lokus iki özelliği etkiler. İkinci adımda AaBb × AaBb'de aa pigmenti engeller ve B lokusunun rengini örter: 9:3:4. Üçüncü adımda iki lokusun büyük harfli alelleri eşit katkı yapar: 1:4:6:4:1.",
  alt: "İlk adımda tek lokus kutusundan pigment ve büyüme hızı kutularına iki ok. Sonraki adımlarda üstte ve solda AB, Ab, aB, ab gametleriyle 4 × 4 kare; ikinci adımda kutular koyu, açık ve pigmentsiz kodlarıyla, sağda üç pay çubuğu. Üçüncü adımda kutularda büyük harfli alel sayısı 0 ile 4 arası, sağda beş sütunluk dağılım.",
  h: 324,
  steps: MULTI_STEPS,
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      els.push(...B(120, 150, "Tek lokus: G", { w: 180, bold: true, tone: "a" }));
      els.push(...B(400, 80, "Pigment oluşumu", { w: 210, tone: "b" }), ...B(400, 220, "Büyüme hızı", { w: 210, tone: "b" }));
      els.push(A(214, 136, 290, 92, "a"), A(214, 164, 290, 208, "a"));
      return { els, readout: ["1 lokus, 2 özellik: pleiotropi. İki özelliğin etkilenmesi iki ayrı gen kanıtı değildir.", "Bir genin ürünü birden çok sürece katılabilir; kaç alel olduğu buradan çıkmaz."] };
    }
    const code = (r: string, c: string) => {
      const g = r + c;
      const A1 = /A/.test(g);
      const B1 = /B/.test(g);
      if (step === 1) return !A1 ? "P" : B1 ? "K" : "Aç";
      return String((g.match(/[AB]/g) ?? []).length);
    };
    const counts = new Map<string, number>();
    G4.forEach((g, j) => els.push(T(110 + j * 46, 28, g, "c", { bold: true, tone: "b" })));
    G4.forEach((r, i) => {
      els.push(T(52, 76 + i * 46, r, "c", { bold: true, tone: "c" }));
      G4.forEach((c, j) => {
        const k = code(r, c);
        counts.set(k, (counts.get(k) ?? 0) + 1);
        const tone: Tone = step === 1 ? (k === "K" ? "a" : k === "Aç" ? "b" : "muted") : k === "2" ? "a" : k === "1" || k === "3" ? "b" : "muted";
        els.push(...B(110 + j * 46, 76 + i * 46, k, { w: 46, h: 46, fill: tone, tone: "ink", bold: true }));
      });
    });
    if (step === 1) {
      const items: [string, string][] = [
        ["K", "Koyu (A_B_)"],
        ["Aç", "Açık (A_bb)"],
        ["P", "Pigmentsiz (aa_ _)"],
      ];
      items.forEach(([k, s], i) => {
        const y = 52 + i * 78;
        const n = counts.get(k) ?? 0;
        const tone: Tone = k === "K" ? "a" : k === "Aç" ? "b" : "muted";
        els.push(T(254, y, `${k}: ${s}`, "e", { bold: true }));
        els.push(R(254, y + 20, 254 + n * 20, y + 40, { tone, fill: tone }), T(254 + n * 20 + 8, y + 30, `${n}/16`, "e", { bold: true }));
      });
      return {
        els,
        legend: items.map(([k, s]) => ({ code: k, label: s, tone: (k === "K" ? "a" : k === "Aç" ? "b" : "muted") as Tone })),
        readout: [
          `Kutular sayılınca: koyu ${counts.get("K")}, açık ${counts.get("Aç")}, pigmentsiz ${counts.get("P")} → 9:3:4.`,
          "aa varken B lokusundaki fark görünmez: iki lokus etkileşir (epistazi). Bu, tek genin iki özelliği etkilemesiyle aynı değildir.",
        ],
      };
    }
    const base = 250;
    for (let k = 0; k <= 4; k++) {
      const n = counts.get(String(k)) ?? 0;
      const x = 300 + k * 46;
      const tone: Tone = k === 2 ? "a" : k === 1 || k === 3 ? "b" : "muted";
      els.push(R(x - 16, base - n * 26, x + 16, base, { tone, fill: tone }), T(x, base - n * 26 - 14, String(n), "c", { bold: true }), T(x, base + 18, String(k), "c", { tone: "muted" }));
    }
    els.push(L(278, base, 506, base, { tone: "muted", thin: true }), T(392, base + 50, "Büyük harfli alel sayısı", "c", { tone: "muted" }));
    return {
      els,
      readout: [
        `Büyük harfli alel sayısı 0, 1, 2, 3, 4 için kutular: ${[0, 1, 2, 3, 4].map((k) => counts.get(String(k)) ?? 0).join(", ")} (toplam 16) → 1:4:6:4:1.`,
        "Ortadaki sınıf en kalabalıktır; çevre etkisi de eklenince dağılım sürekli bir eğriye yaklaşır. Bu dağılım tek A/a çiftiyle açıklanamaz.",
      ],
    };
  },
});

export const biologyFigures067Sheets: Record<string, Record<string, FigureDef>> = {
  "hucre-organelleri": {
    "Hücreyi parça listesi olarak değil, iş bölümü olarak oku": evidenceFigure,
    "Çekirdek ve ribozom: bilgi ile üretim ayrı yerlerdir": ribosomeFigure,
    "Salgı yolu: ribozom, granüllü ER, Golgi, vezikül": routeFigure,
    "Lizozom, peroksizom ve koful aynı işi yapmaz": pocketFigure,
    "Mitokondri ile kloroplast enerjiyi dönüştürür": mitoChloroFigure,
  },
  "besin-zinciri-agi": {
    "Okun yönü avcının baktığı yön değildir": arrowFigure,
    "Bir zinciri tek bir yol olarak kur": chainFigure,
    "Ağ, kesişen zincirleri bir arada gösterir": webFigure,
    "Dolaylı etkiyi neden zinciriyle açıkla": cascadeFigure,
  },
  "canlilarin-siniflandirilmasi": {
    "Çeşitliliği düzenlemek, akrabalığı açıklamak": ladderFigure,
    "Tür ölçütünü verilen canlıya göre kullan": speciesFigure,
    "İkili ad iki sözcükle bir bütündür": namesFigure,
    "Kesinlik sözcüğünü kanıtla sınırla": claimFigure,
  },
  "mendelden-sapmalar": {
    "Hangi varsayım değişti?": changeFigure,
    "Eş baskınlıkta iki etkinin birlikte görünmesi": codomFigure,
    "Birden çok gen, birden çok etki": multiFigure,
  },
};

/** Testte kullanılan yardımcı: pick tablosunun toplam gereken genişliği. */
export const evidenceTableNeed = pickTable(EV_HEAD, EVIDENCE.map((e) => [e.name, ...e.cells]), { groups: EV_GROUPS, y0: 4, sel: -1 }).total;
