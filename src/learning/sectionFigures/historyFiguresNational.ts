import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Tarih · Millî Mücadele. Her olay ve belge tıklanabilir; kartta ne olduğu,
 * hangi kurumun aldığı ve en sık karıştırılan nokta yazar. Şemalar ölçekli
 * değildir; kronoloji ızgarası ay çözünürlüğündedir.
 */

const rect = (x0: number, x1: number, y: number, h: number, tone: Tone, fill = true): El =>
  poly([v(x0, y + h), v(x1, y + h), v(x1, y - h), v(x0, y - h)], { fill: fill ? tone : undefined, tone, thin: true });

// 1 · Kronoloji ızgarası.
type Ev = { s: string; m: number; m2?: number; date: string; what: string; kind: "hazırlık" | "meclis" | "askerî" | "diplomasi"; trap: string };
const M0 = 1919 * 12 + 4; // Mayıs 1919
const mo = (y: number, m: number) => y * 12 + (m - 1) - M0;
const EVENTS: Ev[] = [
  { s: "Samsun’a çıkış", m: mo(1919, 5), date: "19 Mayıs 1919", what: "Mustafa Kemal Paşa müfettiş olarak Anadolu’ya geçti; örgütlenme başladı.", kind: "hazırlık", trap: "Görevin resmî adı ile fiilen başlatılan örgütlenme farklı şeylerdir." },
  { s: "Amasya Genelgesi", m: mo(1919, 6), date: "22 Haziran 1919", what: "“Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır.” Gerekçe, yöntem ve Sivas çağrısı.", kind: "hazırlık", trap: "Millî egemenliği ilan etti ama hukuken kurmadı; kurum TBMM’dir." },
  { s: "Erzurum Kongresi", m: mo(1919, 7), m2: mo(1919, 8), date: "23 Temmuz–7 Ağustos 1919", what: "Vatan bütündür; manda ve himaye kabul edilemez.", kind: "hazırlık", trap: "Toplanışı bölgesel, kararları millî." },
  { s: "Sivas Kongresi", m: mo(1919, 9), date: "4–11 Eylül 1919", what: "Cemiyetler Anadolu ve Rumeli Müdafaa-i Hukuk çatısında birleşti; Heyet-i Temsiliye genelleşti.", kind: "hazırlık", trap: "Manda tartışıldı ve reddedildi; tartışılmadan reddedilmedi." },
  { s: "Misak-ı Millî", m: mo(1920, 1), date: "28 Ocak 1920", what: "Millî sınır ve tam bağımsızlık hedefleri.", kind: "meclis", trap: "Son Osmanlı Mebusan Meclisi kabul etti; TBMM hedef olarak benimsedi." },
  { s: "TBMM açıldı", m: mo(1920, 4), date: "23 Nisan 1920", what: "Millî irade Meclis çatısında; yasama ve yürütme Mecliste toplandı.", kind: "meclis", trap: "Saltanatın kaldırılması ayrı ve sonraki adımdır (1922)." },
  { s: "Sevr imzalandı", m: mo(1920, 8), date: "10 Ağustos 1920", what: "Osmanlı heyeti imzaladı; TBMM tanımadı, uygulanamadı.", kind: "diplomasi", trap: "İmzalanma ≠ onay ≠ uygulanma." },
  { s: "I. İnönü", m: mo(1921, 1), date: "Ocak 1921", what: "Düzenli ordunun Batı Cephesi’ndeki ilk önemli başarısı.", kind: "askerî", trap: "Kuvay-ı Millîye değil, düzenli ordu." },
  { s: "Sakarya", m: mo(1921, 8), m2: mo(1921, 9), date: "23 Ağustos–13 Eylül 1921", what: "Yunan ilerleyişi durduruldu; stratejik üstünlük TBMM’ye geçti.", kind: "askerî", trap: "Savunma başarısı; savaş burada bitmedi." },
  { s: "Büyük Taarruz", m: mo(1922, 8), date: "26–30 Ağustos 1922", what: "Afyonkarahisar–Dumlupınar; Başkomutan Meydan Muharebesi, kesin askerî sonuç.", kind: "askerî", trap: "“Beş gün, beş gece”, Afyon–Dumlupınar kanıtları Sakarya’yı değil bunu gösterir (2025 AYT Tarih-1 33: A)." },
  { s: "Mudanya", m: mo(1922, 10), date: "11 Ekim 1922", what: "Ateşkes: silahlı çatışma durdu, Doğu Trakya savaşsız alındı.", kind: "diplomasi", trap: "Ateşkestir, kesin barış değil." },
  { s: "Lozan", m: mo(1923, 7), date: "24 Temmuz 1923", what: "Kesin barış; yeni devletin uluslararası konumu tanındı.", kind: "diplomasi", trap: "Mudanya ile karıştırma: Lozan barış, Mudanya ateşkes." },
];
const KTONE: Record<Ev["kind"], Tone> = { hazırlık: "c", meclis: "b", askerî: "warn", diplomasi: "a" };
const ROW = 0.62, W = 4.4, SPAN = mo(1923, 8);
const X = (m: number) => (m / SPAN) * W;

const chronology: FigureDef = {
  caption:
    "1919–1923 kronolojisi. Renk sonucun türünü gösterir: yeşil hazırlık/örgütlenme, mavi meclis, turuncu askerî, sarı diplomasi. Bir olaya tıkla: ne olduğu, hangi kurumun aldığı ve en sık karıştırılan nokta açılır.",
  alt: "On iki satırlı zaman ızgarası. Sol sütunda olay adları, sağda 1919’dan 1923’e ay ekseni üzerinde her olayın noktası.",
  picks: EVENTS.map((e) => ({ label: e.s, title: `${e.s} · ${e.date}`, detail: [`Ne oldu? ${e.what}`, `Tür: ${e.kind}.`, `Karıştırma: ${e.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    for (let y = 1919; y <= 1923; y++) {
      const x = X(mo(y, 1));
      if (x >= 0) els.push(seg(v(x, 0.35), v(x, -EVENTS.length * ROW), { thin: true, tone: "muted", dash: true }));
      const lab = `’${String(y).slice(2)}`;
      els.push(x < 0 ? txt(v(-0.05, 0.6), lab, "w", { small: true, tone: "muted" }) : txt(v(x + 0.05, 0.6), lab, "e", { small: true, tone: "muted" }));
    }
    EVENTS.forEach((e, i) => {
      const y = -(i + 0.5) * ROW, sel = pick === i, t = KTONE[e.kind];
      if (sel) els.push(rect(-3.0, W + 0.2, y, ROW / 2 - 0.03, "a"));
      els.push(txt(v(-0.15, y), e.s, "w", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
      if (e.m2 !== undefined) els.push(seg(v(X(e.m), y), v(X(e.m2), y), { bold: true, tone: t }));
      els.push(ball(v(X(e.m), y), sel ? 0.12 : 0.09, t));
    });
    els.push(txt(v(-3.0, 0.9), " ", "c"), txt(v(W + 0.3, -EVENTS.length * ROW - 0.2), " ", "c"));
    return {
      els,
      readout: [
        pick >= 0 ? `${EVENTS[pick].date}: ${EVENTS[pick].what}` : "Bir olaya tıkla ya da aşağıdan seç.",
        "Okuma: temsil yetkisi (kongreler → TBMM), askerî güç (yerel direniş → düzenli ordu) ve diplomasi (ateşkes → barış) birlikte ilerler.",
      ],
    };
  },
};

// 2 · Hazırlık belgeleri: toplanış, karar, işlev.
const DOCS = [
  { s: "Amasya Genelgesi", tops: "Genelge (toplantı değil)", karar: "Millî irade kurtaracak; Sivas’a çağrı", islev: "Gerekçe ve yöntem", detail: ["“Milletin bağımsızlığını yine milletin azim ve kararı kurtaracaktır.”", "Millî egemenlik düşüncesini ilan etti; kurumsallaşması TBMM ile.", "İşlev: yöntem."] },
  { s: "Erzurum", tops: "Bölgesel (doğu illeri)", karar: "Vatan bütün; manda ve himaye yok", islev: "Millî ilkeler", detail: ["23 Temmuz–7 Ağustos 1919.", "Toplanma biçimi bölgesel, kararları millî niteliktedir.", "Her millî kararı Sivas’a bağlama."] },
  { s: "Sivas", tops: "Ülke çapında", karar: "Cemiyetler tek çatı; manda reddi", islev: "Örgütsel birlik", detail: ["4–11 Eylül 1919.", "Anadolu ve Rumeli Müdafaa-i Hukuk Cemiyeti; Heyet-i Temsiliye bütün vatanı temsil etti.", "Ayırıcı kanıt: cemiyetlerin birleşmesi."] },
  { s: "Misak-ı Millî", tops: "Son Osmanlı Mebusan Meclisi", karar: "Millî sınır, tam bağımsızlık", islev: "Sınır ve hedef", detail: ["28 Ocak 1920.", "Kabul eden kurum Mebusan Meclisi; TBMM değil.", "TBMM bu hedefleri benimsedi."] },
];
const documents: FigureDef = {
  caption:
    "Hazırlık dönemi belgelerini üç soruyla ayır: süreçte ne işe yaradı (alt satır), kim/nasıl toplandı ve ne karar verdi (kartta). Bir belgeye tıkla: kanıt cümlesi ve tuzak açılır.",
  alt: "Dört satırlı tablo: Amasya Genelgesi, Erzurum, Sivas ve Misak-ı Millî; toplanış, karar ve işlev sütunlarıyla.",
  picks: DOCS.map((d) => ({ label: d.s, title: d.s, detail: [`Toplanış / kurum: ${d.tops}.`, `Karar: ${d.karar}.`, ...d.detail] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    DOCS.forEach((d, i) => {
      const y = -i * 1.25, sel = pick === i;
      if (sel) els.push(rect(-0.1, 4.6, y - 0.28, 0.55, "a"));
      els.push(txt(v(0, y), d.s, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(0.3, y - 0.5), `işlev: ${d.islev}`, "e", { small: true, tone: "c" }));
    });
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(4.8, -4.4), " ", "c"));
    return { els, readout: [pick >= 0 ? DOCS[pick].detail[0] : "Bir belgeye tıkla ya da aşağıdan seç.", "Kararın içeriği kadar onu hangi kurumun aldığı da soru kökünün kanıtıdır."] };
  },
};

// 3 · Cepheler.
const FRONTS = [
  { s: "Batı", x: 0.4, y: 0.6, kuvvet: "Düzenli ordu", karsi: "Yunan kuvvetleri", belge: "Mudanya Ateşkesi (11 Ekim 1922)", detail: ["İnönü, Kütahya–Eskişehir, Sakarya, Büyük Taarruz.", "Kesin askerî sonuç Büyük Taarruz ile; kapanış Mudanya.", "Dumlupınar = Batı Cephesi’nin son taarruz hattı."] },
  { s: "Doğu", x: 5.8, y: 0.6, kuvvet: "Düzenli birlikler (Kâzım Karabekir)", karsi: "Ermenistan", belge: "Gümrü Antlaşması (Aralık 1920)", detail: ["TBMM’nin ilk askerî ve diplomatik başarısı doğuda.", "Doğu sınırı daha sonra Moskova ve Kars antlaşmalarıyla biçimlendi.", "Kars’ı Batı Cephesi sanma."] },
  { s: "Güney", x: 3.1, y: -1.2, kuvvet: "Yerel direniş, şehir savunmaları", karsi: "Fransız kuvvetleri", belge: "Ankara Antlaşması (20 Ekim 1921)", detail: ["Maraş, Antep, Urfa savunmaları.", "Fransa TBMM diplomasisiyle çatışmadan çekildi.", "Düzenli ordu değil, ağırlıkla yerel direniş."] },
];
const fronts: FigureDef = {
  caption:
    "Aynı savaşta her cephenin kuvvet türü, karşı tarafı ve kapanış belgesi farklıdır. Her kutuda kuvvet türü ve kapanış belgesi; karşı taraf kartta. Bir cepheye tıkla.",
  alt: "Batı, Doğu ve Güney cepheleri için üç kutu; her kutuda kuvvet, karşı taraf ve kapanış belgesi.",
  picks: FRONTS.map((f) => ({ label: `${f.s} Cephesi`, title: `${f.s} Cephesi`, detail: [`Kuvvet: ${f.kuvvet}. Karşı taraf: ${f.karsi}.`, `Kapanış: ${f.belge}.`, ...f.detail] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    FRONTS.forEach((f, i) => {
      const y = -i * 1.75, sel = pick === i;
      els.push(rect(-0.1, 5.2, y - 0.5, 0.75, sel ? "a" : "muted"));
      els.push(txt(v(0, y), `${f.s} Cephesi`, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(0.3, y - 0.5), f.kuvvet.split(" (")[0].split(",")[0], "e", { small: true }));
      els.push(txt(v(0.3, y - 1.0), `→ ${f.belge.split(" (")[0]}`, "e", { small: true, tone: "c" }));
    });
    els.push(txt(v(-0.3, 0.6), " ", "c"), txt(v(5.4, -4.9), " ", "c"));
    return { els, readout: [pick >= 0 ? `${FRONTS[pick].s}: ${FRONTS[pick].kuvvet} · ${FRONTS[pick].belge}` : "Bir cepheye tıkla ya da aşağıdan seç.", "Cephe kanıtını coğrafya, kuvvet türü ve kapanış belgesiyle birlikte doğrula."] };
  },
};

// 4 · Karışan ikililer.
const PAIRS = [
  { a: "Erzurum", b: "Sivas", q: "Bölgesel toplanış mı, cemiyetlerin birleşmesi mi?", detail: ["Bölgesel toplantı + millî karar → Erzurum.", "Ülke çapında birleşme + Heyet-i Temsiliye’nin genelleşmesi → Sivas."] },
  { a: "Kuvay-ı Millîye", b: "Düzenli ordu", q: "Yerel inisiyatif mi, merkezî komuta mı?", detail: ["Yerel ve düzensiz direniş işgali yavaşlattı; komuta ve disiplin sorunu vardı.", "I. İnönü ve sonrası düzenli ordu."] },
  { a: "Sakarya", b: "Büyük Taarruz", q: "İlerleyişi durdurma mı, kesin çıkarma mı?", detail: ["Polatlı–Haymana, 1921: savunma, stratejik dönüm.", "Afyon–Dumlupınar, 26–30 Ağustos 1922: kesin taarruz."] },
  { a: "Mudanya", b: "Lozan", q: "Çatışmayı durdurma mı, barışı düzenleme mi?", detail: ["Mudanya: ateşkes, Doğu Trakya savaşsız.", "Lozan: kesin barış ve uluslararası statü."] },
];
const pairs: FigureDef = {
  caption:
    "İki kavram arasında kaldığında tek bir ayırıcı soru sor. Bir ikiliye tıkla: hangi kanıtın hangi tarafa götürdüğü açılır.",
  alt: "Dört satır: Erzurum–Sivas, Kuvay-ı Millîye–düzenli ordu, Sakarya–Büyük Taarruz, Mudanya–Lozan; ortada ayırıcı soru.",
  picks: PAIRS.map((p) => ({ label: `${p.a} / ${p.b}`, title: `${p.a} mı, ${p.b} mı?`, detail: [p.q, ...p.detail] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    PAIRS.forEach((p, i) => {
      const y = -i * 0.9, sel = pick === i;
      if (sel) els.push(rect(-0.1, 7.6, y - 0.18, 0.4, "a"));
      els.push(txt(v(0, y), `${p.a}  /  ${p.b}`, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(0.3, y - 0.38), p.q, "e", { small: true, tone: "muted" }));
    });
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(7.8, -3.3), " ", "c"));
    return { els, readout: [pick >= 0 ? PAIRS[pick].detail.join(" ") : "Bir ikiliye tıkla ya da aşağıdan seç.", "Son kontrol: kurum, coğrafya, belge türü ve kronolojik yer aynı anda uyuşmalı."] };
  },
};

export const historyFiguresNational: Record<string, Record<string, FigureDef>> = {
  "milli-mucadele": {
    "İşgali, direnişi ve egemenliği birlikte düşün": chronology,
    "Erzurum ve Sivas: toplanış ile karar kapsamı": documents,
    "Doğu ve Güney cepheleri: aynı yöntem yok": fronts,
    "Büyük Taarruz, Mudanya ve Lozan": pairs,
  },
};
