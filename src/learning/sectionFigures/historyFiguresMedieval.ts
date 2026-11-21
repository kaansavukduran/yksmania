import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Orta Çağ (MEB/OGM Tarih 9, ünite 3). Three selectable figures: a milestone
 * grid on one year axis, a board of trade buildings by function, and a board
 * of trade routes by region and goods. Each name opens a card with what it
 * shows and the inference it does NOT support (e.g. 395 ≠ 476; kurultay is not
 * modern democracy; a road name is not a single product).
 */

type Ev = { y0: number; y1?: number; s: string; what: string; trap: string };
const EVENTS: Ev[] = [
  { y0: 395, s: "Roma ikiye ayrıldı", what: "İmparatorluk Doğu ve Batı olarak ikiye bölündü.", trap: "476'daki Batı Roma'nın yıkılmasıyla aynı olay değildir." },
  { y0: 476, s: "Batı Roma yıkıldı", what: "Batıda imparatorluk otoritesi sona erdi; yerel düzenler güçlendi.", trap: "Doğu Roma (Bizans) 1453'e kadar sürdü." },
  { y0: 1054, s: "Kiliseler ayrıldı", what: "Katolik ve Ortodoks kiliseleri ayrıldı.", trap: "Hristiyanların tek mezhepte birleşmesi değil, bölünmesidir." },
  { y0: 1206, s: "Cengiz kağan oldu", what: "Kurultayda kağan ilan edildi; Moğol birliği imparatorluğa dönüştü.", trap: "Kurultay modern demokrasi değildir; hanedan meşruiyeti sürer." },
  { y0: 1215, s: "Magna Carta", what: "İngiltere'de kralın yetkileri soylular karşısında sınırlandı.", trap: "Herkese eşit oy hakkı verilmedi." },
  { y0: 1337, y1: 1453, s: "Yüzyıl Savaşları", what: "İngiltere–Fransa mücadelesi için kullanılan dönem adı (1337–1453).", trap: "Bütün yıllar kesintisiz aynı savaş demek değildir." },
  { y0: 1347, y1: 1351, s: "Veba salgını", what: "Avrupa'da ağır nüfus kaybı; emek, vergi ve üretim ilişkileri etkilendi.", trap: "Tek kesin ölüm oranı ya da her bölgede aynı sonuç verilmez." },
  { y0: 1453, s: "İstanbul'un fethi", what: "Bizans İmparatorluğu sona erdi.", trap: "Bütün toplumlardaki değişim aynı güne sıkıştırılmaz." },
];
const A0 = 300;
const A1 = 1500;
const K = 0.008;

const milestones: FigureDef = {
  caption:
    "Orta Çağ'ın seçilmiş dönüm noktaları tek yıl ekseninde (MS). Bir olayın adına tıkla: ne olduğu ve hangi çıkarımı DESTEKLEMEDİĞİ açılır. Önce-sonra sırası tek başına neden-sonuç kanıtı değildir.",
  alt: "Yatay eksende MS 300–1500; her satırda bir olay: yılında nokta (dönemlerde çubuk), adı solda. Olay adları seçilebilir.",
  picks: EVENTS.map((e) => ({ label: `${e.y0}${e.y1 ? `–${e.y1}` : ""} · ${e.s}`, title: `${e.y0}${e.y1 ? `–${e.y1}` : ""} · ${e.s}`, detail: [e.what, `Karıştırma: ${e.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const X = (y: number) => (y - A0) * K;
    const ROW = 0.86;
    const top = (EVENTS.length - 1) * ROW;
    els.push(seg(v(X(A0), -0.5), v(X(A1), -0.5), { tone: "muted" }));
    for (const y of [300, 600, 900, 1200, 1500]) els.push(seg(v(X(y), -0.6), v(X(y), -0.4), { tone: "muted" }), txt(v(X(y), -0.6), String(y), "s", { small: true, tone: "muted" }));
    EVENTS.forEach((e, i) => {
      const y = top - i * ROW;
      const on = pick === i;
      const tone: Tone = on ? "a" : "c";
      els.push(seg(v(X(A0) - 0.2, y), v(X(e.y0) - 0.12, y), { tone: on ? "a" : "muted", thin: !on, dash: !on }));
      if (e.y1) els.push(poly([v(X(e.y0), y - 0.12), v(X(e.y1), y - 0.12), v(X(e.y1), y + 0.12), v(X(e.y0), y + 0.12)], { tone, fill: tone, thin: true }));
      else els.push(ball(v(X(e.y0), y), on ? 0.13 : 0.09, tone));
      els.push(txt(v(X(A0) - 0.4, y), e.s, "w", { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(X(A0) - 0.6, top + 0.6), " ", "c"), txt(v(X(A1) + 0.5, -1.4), " ", "c"));
    const sel = pick >= 0 ? EVENTS[pick] : undefined;
    return { els, readout: [sel ? `${sel.y0}${sel.y1 ? `–${sel.y1}` : ""}: ${sel.what}` : "Bir olayın adına tıkla ya da aşağıdan seç.", "Aynı takvimde yılları karşılaştır: 395 < 476 < 1054 < 1206 < 1215 < 1453."] };
  },
};

type Card = { name: string; tag: string; what: string; trap: string; tone: Tone };
function board(cards: Card[], cols: number, caption: string, alt: string, foot: string): FigureDef {
  return {
    caption,
    alt,
    picks: cards.map((c) => ({ label: c.name, title: `${c.name} · ${c.tag}`, detail: [c.what, `Karıştırma: ${c.trap}`] })),
    draw: (_v, _s, pick = -1) => {
      const els: El[] = [];
      const W = 3.9;
      // Tags split at “ · ” onto their own lines so a phone-size font never
      // runs into the next box; the box grows with the line count.
      const lines = (t: string) =>
        t.split(" · ").flatMap((part) => {
          // Wrap long parts at spaces (about 12 characters per line).
          const out: string[] = [];
          for (const w of part.split(" ")) {
            const last = out[out.length - 1];
            if (last && (last + " " + w).length <= 12) out[out.length - 1] = last + " " + w;
            else out.push(w);
          }
          return out;
        });
      const maxLines = Math.max(...cards.map((c) => lines(c.tag).length));
      const H = 1.45 + 0.62 * maxLines;
      const rows = Math.ceil(cards.length / cols);
      cards.forEach((c, i) => {
        const x = (i % cols) * (W + 0.3);
        const y = (rows - 1 - Math.floor(i / cols)) * (H + 0.3);
        const on = pick === i;
        els.push(poly([v(x, y), v(x + W, y), v(x + W, y + H), v(x, y + H)], { tone: on ? "a" : c.tone, fill: on ? "a" : c.tone, thin: !on }));
        els.push(txt(v(x + W / 2, y + H - 0.55), c.name, "c", { bold: true, tone: "ink", pick: i }));
        lines(c.tag).forEach((l, k) => els.push(txt(v(x + W / 2, y + H - 1.3 - k * 0.62), l, "c", { small: true, tone: on ? "ink" : "muted" })));
      });
      els.push(txt(v(-0.2, rows * (H + 0.3) + 0.1), " ", "c"), txt(v(cols * (W + 0.3), -0.3), " ", "c"));
      const sel = pick >= 0 ? cards[pick] : undefined;
      return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Bir kutuya tıkla ya da aşağıdan seç.", foot] };
    },
  };
}

const places = board(
  [
    { name: "Han", tag: "konaklama · depo", what: "Konaklama, depolama ve ticaret; şehir içinde de olabilir.", trap: "Her depo kervansaray değildir.", tone: "b" },
    { name: "Kervansaray", tag: "yol üstü · güvenlik", what: "Ana yol üzerinde kervanların konaklaması ve güvenliği.", trap: "Toptan tartım yeri (kapan) değildir.", tone: "b" },
    { name: "Ribat", tag: "ilk işlev: sınır", what: "Başlangıçta sınır savunma yapısı; bazıları sonradan konaklama işlevi kazandı.", trap: "İlk ve sonraki işlevi aynı sayma; sorudaki döneme bak.", tone: "warn" },
    { name: "Arasta", tag: "aynı esnaf sırası", what: "Aynı ya da benzer esnafın dükkânlarının sıralandığı çarşı sokağı.", trap: "Toptan tartı merkezi değildir.", tone: "c" },
    { name: "Bedesten", tag: "değerli mal", what: "Değerli malların korunaklı biçimde saklanıp satıldığı kapalı çarşı.", trap: "Değer korunaklı satışı, toptanlık kapanı belirler.", tone: "c" },
    { name: "Kapan", tag: "toptan · tartım", what: "Belli malların (ör. tahıl) toptan alım-satımı ve tartıldığı yer.", trap: "Bedesten ile karıştırma: biri değerli mal, öteki toptan dağıtım.", tone: "c" },
    { name: "Pazar", tag: "yerel · düzenli", what: "Yerel, düzenli aralıklarla kurulan alışveriş yeri.", trap: "Geniş bölgeden tüccar toplayan panayırla aynı ölçek değildir.", tone: "muted" },
    { name: "Panayır", tag: "dönemsel · geniş", what: "Yılın belli zamanlarında uzak bölgelerden tüccarı buluşturan büyük pazar.", trap: "Her hafta kurulan yerel pazar değildir.", tone: "muted" },
    { name: "Liman", tag: "deniz aktarımı", what: "Kara ile deniz ticaretinin aktarma noktası.", trap: "Adı değil soruda verilen işlevi seç.", tone: "muted" },
  ],
  3,
  "Ticari mekânları adından değil İŞLEVİNDEN seç. Bir kutuya tıkla: ne iş gördüğü ve neyle karıştırıldığı açılır. Yol üstü konaklama ve güvenlik kervansaray, değerli mal bedesten, toptan tartım kapan, aynı esnaf sırası arasta.",
  "Üç sütunlu dokuz kutu: han, kervansaray, ribat; arasta, bedesten, kapan; pazar, panayır, liman; her kutunun altında kısa işlev etiketi.",
  "Soru adı vermese de işlev cümlesi (konaklama, toptan tartım, değerli mal) yapıyı seçtirir.",
);

const routes = board(
  [
    { name: "İpek Yolu", tag: "Çin → Akdeniz", what: "Çin, Orta Asya, İran, Anadolu ve Levant'ı Akdeniz'e bağlayan çok kollu ağ; mal, bilgi ve kültür taşıdı.", trap: "Yalnız ipek taşımaz; tek bir yol ve tek bir devletin malı değildir.", tone: "a" },
    { name: "Baharat Yolu", tag: "Hint Okyanusu", what: "Hindistan ve Hint Okyanusu'nu Basra, Kızıldeniz ve Akdeniz'e bağlayan kara ve deniz aşamalı ağ.", trap: "Yalnız tek bir karayolu değildir; deniz bölümleri vardır.", tone: "c" },
    { name: "Kürk Yolu", tag: "Kuzey Avrasya", what: "Kuzey Avrasya orman kuşağından bozkıra deri ve post taşıyan bağlantılar.", trap: "Ürün (kürk) ile kuzey coğrafyası birlikte ayırt ettirir.", tone: "b" },
    { name: "Kral Yolu", tag: "Sardes → Sus", what: "Anadolu'yu İran'a bağlayan, İlk Çağ kökenli yönetim, haberleşme ve ticaret yolu.", trap: "Orta Çağ'da icat edilmiş sayılmaz.", tone: "warn" },
  ],
  2,
  "Dört yolu güzergâh ve taşınan malla ayır. Bir kutuya tıkla: hangi bölgeleri bağladığı ve sık yapılan genelleme açılır. Yol güvenliği ve geçiş vergileri devletler için gelir ve rekabet alanıdır; ticaret kültürel etkileşime zemin hazırlar ama kültürleri aynılaştırmaz.",
  "İki sütunlu dört kutu: İpek Yolu, Baharat Yolu, Kürk Yolu, Kral Yolu; altlarında bağladıkları bölgeler.",
  "Karşılaşma etkileşim olanağıdır; bütün kültürlerin aynılaştığı sonucu çıkmaz.",
);

export const historyFiguresMedieval: Record<string, Record<string, FigureDef>> = {
  "ortacag-dunya": {
    "Roma’nın bölünmesi ile siyasi sonu ayır": milestones,
    "Arasta, bedesten, kapan ve panayır": places,
    "İpek, Baharat, Kürk ve Kral Yolu": routes,
  },
};
