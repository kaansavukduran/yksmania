import { ball, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

/*
 * Early Republic reforms on one year strip. A reference-year slider splits the
 * events into "gerçekleşmiş" (on or before) and "henüz değil" (after): the
 * reasoning of 2025 AYT Sosyal Bilimler-2 Tarih-2 soru 10, where a 1933 speech
 * cannot list the 1934 parliamentary right. Every event name is selectable and
 * opens a card: date, what changed, the principle it is usually tied to, and
 * the closest confusion. Women's political rights stay three separate levels
 * (1930 belediye, 1933 köy, 1934 milletvekili); the 1926 Medeni Kanun is a
 * civil-law right. Dates follow MEB/OGM İnkılap Tarihi 12, ünite 3.
 */

type Ev = { y: number; s: string; date: string; what: string; ilke: string; trap: string; kadin?: boolean };
const EVENTS: Ev[] = [
  {
    y: 1922,
    s: "Saltanat kalktı",
    date: "1 Kasım 1922",
    what: "TBMM saltanatı kaldırdı; hanedan yönetimi sona erdi, egemenlik millete geçti.",
    ilke: "Cumhuriyetçilik (millî egemenlik).",
    trap: "Cumhuriyet ilanından (1923) öncedir; halifelik bu kararla kalkmadı.",
  },
  {
    y: 1923,
    s: "Cumhuriyet",
    date: "29 Ekim 1923",
    what: "Devletin yönetim biçimi cumhuriyet oldu; ilk cumhurbaşkanı Mustafa Kemal seçildi.",
    ilke: "Cumhuriyetçilik.",
    trap: "TBMM'nin açılışı 23 Nisan 1920'dir; ayrı olaydır.",
  },
  {
    y: 1924,
    s: "Hilafet kalktı",
    date: "3 Mart 1924",
    what: "Halifelik kaldırıldı; din ile devlet yönetiminin kurumsal bağı çözüldü.",
    ilke: "Laiklik.",
    trap: "Aynı gün Tevhid-i Tedrisat da kabul edildi; iki ayrı kanundur.",
  },
  {
    y: 1924,
    s: "Tevhid-i Tedrisat",
    date: "3 Mart 1924",
    what: "Öğretim birliği: bütün okullar Maarif Vekâletine (Millî Eğitim) bağlandı, eğitimde ikilik kalktı.",
    ilke: "Laiklik; eğitimde birlik ve çağdaşlaşma (inkılapçılık).",
    trap: "‘Tedrisat’ öğretim demektir; harf değişikliği (1928) değildir.",
  },
  {
    y: 1926,
    s: "Medeni Kanun",
    date: "17 Şubat 1926 kabul · 4 Ekim 1926 yürürlük",
    what: "Aile, miras ve kişiler hukuku düzenlendi; kadın ve erkek medeni haklarda eşitlendi.",
    ilke: "Laiklik (laik hukuk) ve halkçılık (kanun önünde eşitlik).",
    trap: "Siyasi hak (seçme-seçilme) vermedi; o 1930, 1933, 1934'tedir. Kabul ile yürürlük tarihi farklıdır.",
  },
  {
    y: 1928,
    s: "Yeni harfler",
    date: "1 Kasım 1928",
    what: "Latin temelli yeni Türk harfleri kabul edildi; okuryazarlığı artırmak amaçlandı.",
    ilke: "İnkılapçılık; millî kültür yönüyle milliyetçilik.",
    trap: "Yetişkinlere öğreten Millet Mektepleri 1929'da açıldı; ayrı adımdır.",
  },
  {
    y: 1929,
    s: "Millet Mektepleri",
    date: "1 Ocak 1929",
    what: "Yetişkinlere yeni harfleri ve temel bilgileri öğreten okullar açıldı.",
    ilke: "Halkçılık (eğitime erişim) ve inkılapçılık.",
    trap: "Tevhid-i Tedrisat (1924) değildir; o okul idaresinin birliğidir.",
  },
  {
    y: 1930,
    s: "Kadın: belediye",
    date: "3 Nisan 1930",
    what: "Kadınlar belediye seçimlerinde seçme ve seçilme hakkı kazandı.",
    ilke: "Cumhuriyetçilik (temsil) ve halkçılık (eşitlik).",
    trap: "Siyasi hakların ilk düzeyidir; köy (1933) ve milletvekili (1934) sonra gelir.",
    kadin: true,
  },
  {
    y: 1931,
    s: "Türk Tarih Kurumu",
    date: "12 Nisan 1931",
    what: "Türk Tarihi Tetkik Cemiyeti kuruldu; Türk tarihini bilimsel olarak araştırmak amaçlandı.",
    ilke: "Milliyetçilik (ortak tarih ve kültür bilinci).",
    trap: "Türk Dil Kurumu 1932'dir; ikisini karıştırma.",
  },
  {
    y: 1932,
    s: "Türk Dil Kurumu",
    date: "12 Temmuz 1932",
    what: "Türk Dili Tetkik Cemiyeti kuruldu; Türkçenin araştırılması ve geliştirilmesi amaçlandı.",
    ilke: "Milliyetçilik.",
    trap: "Kurum adında ‘Türk’ geçmesi tek başına kanıt değildir; amacına bak.",
  },
  {
    y: 1933,
    s: "Kadın: köy",
    date: "26 Ekim 1933",
    what: "Kadınlar köy muhtarlığı ve ihtiyar heyeti seçimlerinde seçme ve seçilme hakkı kazandı.",
    ilke: "Cumhuriyetçilik ve halkçılık.",
    trap: "Milletvekili hakkı değildir; o 1934'tedir.",
    kadin: true,
  },
  {
    y: 1934,
    s: "Soyadı Kanunu",
    date: "21 Haziran 1934",
    what: "Herkese soyadı zorunlu oldu; ardından ağa, paşa gibi ayrıcalık unvanları kaldırıldı.",
    ilke: "Halkçılık (ayrıcalıkların kaldırılması).",
    trap: "Alfabe değişikliği (1928) ile ilgisi yoktur; resmî kimlik düzenidir.",
  },
  {
    y: 1934,
    s: "Kadın: milletvekili",
    date: "5 Aralık 1934",
    what: "Kadınlar milletvekili seçimlerinde seçme ve seçilme hakkı kazandı.",
    ilke: "Cumhuriyetçilik (temsil) ve halkçılık (eşitlik).",
    trap: "1933'teki bir konuşmada ‘gerçekleşmiş’ sayılamaz (2025 AYT Sosyal Bilimler-2 Tarih-2 soru 10 mantığı).",
    kadin: true,
  },
  {
    y: 1937,
    s: "İlkeler anayasada",
    date: "5 Şubat 1937",
    what: "Altı ilke (cumhuriyetçilik, milliyetçilik, halkçılık, devletçilik, laiklik, inkılapçılık) anayasaya girdi.",
    ilke: "Altı ilkenin anayasal ifadesi.",
    trap: "1933 Onuncu Yıl Nutku'ndan sonradır.",
  },
];
const X0 = 1922;
const K = 0.7; // strip units per year
const ROW = 0.82;

const reformStrip: FigureDef = {
  caption:
    "Referans yılını kaydır: o yıl ve öncesi renkli (gerçekleşmiş), sonrası gri (henüz değil). Bir olayın adına tıkla: tarihi, ne değiştirdiği, hangi ilkeyle bağlandığı ve neyle karıştırılmaması gerektiği açılır. 1933 seçilince yalnız 1934 ve 1937 olayları gride kalır (2025 AYT Sosyal Bilimler-2 Tarih-2 soru 10 mantığı). Kadın hakları (vurgulu) üç düzeydir: 1930 belediye, 1933 köy, 1934 milletvekili.",
  alt: "Yatay eksende 1922–1937 yılları, her satırda bir olay: olayın yılında nokta, adı solda. Referans yılını gösteren dikey çizginin solundaki olaylar renkli, sağındakiler gri. Olay adları seçilebilir.",
  param: { label: "Referans yılı", min: 1922, max: 1937, step: 1, init: 1933, unit: "", plain: true },
  picks: EVENTS.map((e) => ({
    label: `${e.y} · ${e.s}`,
    title: `${e.date} · ${e.s}`,
    detail: [`Ne oldu? ${e.what}`, `İlke: ${e.ilke}`, `Karıştırma: ${e.trap}`],
  })),
  draw: (ref, _step, pick = -1) => {
    const r = Math.round(ref);
    const W = (1937 - X0) * K;
    const top = (EVENTS.length - 1) * ROW;
    const els: El[] = [];
    const rx = (r - X0 + 0.5) * K;
    els.push(poly([v(-0.2, -0.5), v(rx, -0.5), v(rx, top + 0.35), v(-0.2, top + 0.35)], { tone: "c", fill: "c", thin: true }));
    els.push(seg(v(-0.2, -0.5), v(W + 0.2, -0.5), { tone: "muted" }));
    for (const y of [1922, 1926, 1930, 1934, 1937]) {
      els.push(seg(v((y - X0) * K, -0.6), v((y - X0) * K, -0.4), { tone: "muted" }));
      els.push(txt(v((y - X0) * K, -0.6), String(y), "s", { tone: "muted", small: true }));
    }
    const later: string[] = [];
    EVENTS.forEach((e, i) => {
      const x = (e.y - X0) * K;
      const y = top - i * ROW;
      const done = e.y <= r;
      if (!done) later.push(`${e.s} (${e.y})`);
      const on = pick === i;
      const tone = on ? "a" : done ? (e.kadin ? "warn" : "c") : "muted";
      els.push(ball(v(x, y), on ? 0.14 : 0.1, tone));
      els.push(seg(v(-0.2, y), v(x - 0.15, y), { tone: on ? "a" : "muted", thin: !on, dash: !on }));
      els.push(txt(v(-0.4, y), e.s, "w", { tone, small: true, bold: on || (done && !!e.kadin), pick: i }));
    });
    els.push(seg(v(rx, -0.5), v(rx, top + 0.35), { tone: "ink", bold: true }));
    els.push(txt(v(-0.6, top + 0.6), " ", "c"), txt(v(W + 0.6, -1.4), " ", "c"));
    const sel = pick >= 0 ? EVENTS[pick] : undefined;
    return {
      els,
      readout: [
        `${r} itibarıyla gerçekleşmemiş: ${later.length ? later.join(", ") : "hiçbiri"}.`,
        sel ? `Seçili: ${sel.date} · ${sel.s} → ${sel.y <= r ? "gerçekleşmiş" : "henüz değil"}` : "Bir olayın adına tıkla ya da aşağıdan seç.",
      ],
    };
  },
};

export const historyFiguresRepublic: Record<string, Record<string, FigureDef>> = {
  "ataturkculuk-inkilap": { "Kronolojiyi bir karşılaştırma aracı yap": reformStrip },
};
