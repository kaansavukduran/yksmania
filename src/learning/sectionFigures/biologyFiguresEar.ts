import { ball, poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Hearing path and side structures as a selectable list, not an anatomical
 * drawing. Left: the sound path in order, banded by dış / orta / iç kulak and
 * labelled with the form the signal takes (hava → mekanik → sıvı → sinirsel).
 * Right: structures that are NOT on that path (Östaki, yuvarlak pencere, the
 * balance organs). 2022 AYT Fen 30: a selective Korti loss stops the auditory
 * signal but leaves balance and pressure equalisation. Each name opens a card.
 */

type Node = { name: string; zone: 0 | 1 | 2; form: string; what: string; trap: string };
const PATH: Node[] = [
  { name: "Kulak kepçesi", zone: 0, form: "hava", what: "Ses dalgalarını dış kulak yoluna yönlendirir.", trap: "Sesi sinirsel bilgiye çevirmez." },
  { name: "Dış kulak yolu", zone: 0, form: "hava", what: "Sesi kulak zarına iletir.", trap: "Basınç dengesi burada değil Östaki borusuyla sağlanır." },
  { name: "Kulak zarı", zone: 1, form: "mekanik", what: "Havadaki basınç değişimleriyle titreşir; dış ve orta kulağın sınırı.", trap: "Titreşim burada henüz sinir impulsu değildir." },
  { name: "Çekiç", zone: 1, form: "mekanik", what: "Kulak zarına bağlı ilk kemikçik; titreşimi örse aktarır.", trap: "Kemikçikler impuls üretmez, yalnız aktarır." },
  { name: "Örs", zone: 1, form: "mekanik", what: "Ortadaki kemikçik; çekiçten üzengiye aktarır.", trap: "Sıra çekiç → örs → üzengi." },
  { name: "Üzengi", zone: 1, form: "mekanik", what: "Son kemikçik; titreşimi oval pencereye iletir.", trap: "İşitme siniriyle aynı basamak değildir." },
  { name: "Oval pencere", zone: 2, form: "sıvı", what: "Üzenginin titreşimini salyangoz sıvısına (perilenf) aktarır.", trap: "Yuvarlak pencere değildir; giriş oval penceredir." },
  { name: "Salyangoz · Korti", zone: 2, form: "sıvı → sinirsel", what: "Kohlear kanalın temel zarındaki Korti organında tüy hücreleri mekanik uyarıyı sinirsel sinyale çevirir.", trap: "Korti işitme alıcısıdır, denge alıcısı değildir (2022 AYT Fen 30)." },
  { name: "İşitme siniri", zone: 2, form: "sinirsel", what: "Duyu nöronlarındaki aksiyon potansiyellerini beyne taşır.", trap: "Ses ya da titreşim değil, sinirsel bilgi taşır." },
];
const SIDE: Node[] = [
  { name: "Östaki borusu", zone: 1, form: "basınç", what: "Orta kulağı yutağa bağlar; yutkununca açılıp zarın iki yanındaki basıncı dengeler.", trap: "Ses yolunun basamağı değildir." },
  { name: "Yuvarlak pencere", zone: 2, form: "sıvı", what: "Esnek zar; iç kulak sıvısının yer değiştirmesine izin verir.", trap: "İmpuls üretmez; giriş yapısı da değildir." },
  { name: "Yarım daire kanalları", zone: 2, form: "denge", what: "Üç düzlemdeki kanallar; başın dönmesindeki hız değişimini (açısal ivme) algılar.", trap: "Sabit hızda dönmeyi değil, dönmedeki değişimi bildirir." },
  { name: "Tulumcuk · kesecik", zone: 2, form: "denge", what: "Otolitli jel tabaka doğrusal ivmeyi ve başın yer çekimine göre eğimini algılar.", trap: "Asansörün hızlanması bu gruptadır; dönme değildir." },
];
const ZONE: { name: string; tone: Tone }[] = [
  { name: "dış kulak", tone: "b" },
  { name: "orta kulak", tone: "warn" },
  { name: "iç kulak", tone: "c" },
];
const ALL = [...PATH, ...SIDE];

const pathGrid: FigureDef = {
  caption:
    "Solda ses yolu sırayla: hava titreşimi → kemikçiklerde mekanik titreşim → iç kulak sıvısı → Korti'de sinirsel sinyal. Sağda yolun parçası OLMAYAN yapılar. Bir ada tıkla: görevi ve karıştırılan noktası açılır. Seçici Korti kaybı işitmeyi durdurur, denge ve basınç dengesi sürebilir (2022 AYT Fen 30 mantığı).",
  alt: "Solda dokuz satır: kulak kepçesi, dış kulak yolu, kulak zarı, çekiç, örs, üzengi, oval pencere, salyangoz ve Korti, işitme siniri; dış, orta, iç kulak bantlarıyla renkli ve aşağı oklarla bağlı. Sağda dört yan yapı: Östaki borusu, yuvarlak pencere, yarım daire kanalları, tulumcuk ve kesecik.",
  picks: ALL.map((n) => ({ label: n.name, title: `${n.name} · ${ZONE[n.zone].name}`, detail: [n.what, `Karıştırma: ${n.trap}`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const ROW = 1.35;
    const y = (i: number) => (PATH.length - 1 - i) * ROW;
    // Zone bands.
    for (const z of [0, 1, 2] as const) {
      const idx = PATH.map((n, i) => (n.zone === z ? i : -1)).filter((i) => i >= 0);
      const top = y(idx[0]) + ROW / 2;
      const bot = y(idx[idx.length - 1]) - ROW / 2;
      els.push(poly([v(-0.7, bot), v(6.6, bot), v(6.6, top), v(-0.7, top)], { tone: ZONE[z].tone, fill: ZONE[z].tone, thin: true }));
      els.push(txt(v(-0.9, (top + bot) / 2), ZONE[z].name, "w", { small: true, bold: true, tone: ZONE[z].tone }));
    }
    PATH.forEach((n, i) => {
      const on = pick === i;
      els.push(ball(v(-0.3, y(i)), on ? 0.14 : 0.1, on ? "a" : "ink"));
      if (i > 0) els.push(vec(v(-0.3, y(i - 1) - 0.18), v(-0.3, y(i) + 0.18), { tone: "muted", thin: true }));
      els.push(txt(v(0, y(i)), n.name, "e", { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
    });
    // Side structures.
    const x0 = 8.2;
    els.push(txt(v(x0, y(0) + 0.1), "yolun dışında", "e", { small: true, tone: "muted", bold: true }));
    SIDE.forEach((n, k) => {
      const i = PATH.length + k;
      const on = pick === i;
      const yy = y(1) - k * 1.9;
      els.push(ball(v(x0, yy), on ? 0.14 : 0.1, on ? "a" : ZONE[n.zone].tone));
      els.push(txt(v(x0 + 0.3, yy), n.name, "e", { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(-3.6, y(0) + 0.8), " ", "c"), txt(v(13.4, y(PATH.length - 1) - 0.8), " ", "c"));
    const sel = pick >= 0 ? ALL[pick] : undefined;
    return { els, readout: [sel ? `${sel.name} (${ZONE[sel.zone].name}, ${sel.form}): ${sel.what}` : "Bir yapının adına tıkla ya da aşağıdan seç.", "Kemikçikler aktarır, Korti dönüştürür, sinir taşır: üç ayrı basamak."] };
  },
};

type Mv = { name: string; organ: number; text: string };
const MOVES: Mv[] = [
  { name: "Baş sağa dönmeye başlıyor", organ: 0, text: "Açısal hızlanma: yarım daire kanallarında endolenf kupulayı eğer." },
  { name: "Sabit hızla dönmeye devam", organ: -1, text: "Hız değişmiyor: kanallardaki ek uyarı söner; dönme algısı zayıflayabilir." },
  { name: "Asansör yukarı hızlanıyor", organ: 1, text: "Doğrusal ivme: tulumcuk ve kesecikte otolitli jel tüy hücrelerine göre kayar." },
  { name: "Asansör sabit hızda", organ: 1, text: "Ek ivme yok; ama yer çekimi bilgisi otolit organlarında sürer." },
  { name: "Baş öne eğiliyor", organ: 1, text: "Yer çekimine göre konum değişir: otolit organları." },
];
const balance: FigureDef = {
  caption:
    "Dönme ile doğrusal ivmeyi ayır. Dönmedeki DEĞİŞİM yarım daire kanallarını, doğrusal ivme ve baş eğimi tulumcuk ile keseciği (otolit organları) uyarır. Sabit hız tek başına yeni bir ivme değildir.",
  alt: "İki kutu: solda yarım daire kanalları (dönme), sağda tulumcuk ve kesecik (doğrusal ivme, yer çekimi); her adımda bir hareket örneği ve uyarılan kutu vurgulanıyor.",
  steps: MOVES.map((m) => m.name),
  draw: (_v, step) => {
    const m = MOVES[step];
    const els: El[] = [];
    const box = (x: number, on: boolean, title: string, sub: string, tone: Tone) => {
      els.push(poly([v(x, 0), v(x + 4.6, 0), v(x + 4.6, 2.2), v(x, 2.2)], { tone: on ? tone : "muted", fill: on ? tone : undefined, thin: !on }));
      els.push(txt(v(x + 2.3, 1.45), title, "c", { bold: true, tone: on ? "ink" : "muted" }), txt(v(x + 2.3, 0.75), sub, "c", { small: true, tone: on ? "ink" : "muted" }));
    };
    box(0, m.organ === 0, "Yarım daire kanalları", "açısal ivme (dönme)", "a");
    box(5.4, m.organ === 1, "Tulumcuk · kesecik", "doğrusal ivme, yer çekimi", "c");
    els.push(txt(v(5.0, 2.2), m.name, "n", { bold: true, tone: "warn" }));
    els.push(txt(v(-0.3, 3.2), " ", "c"), txt(v(10.3, -0.4), " ", "c"));
    return { els, readout: [m.text, "Denge yalnız kulak değildir: göz ve kas-eklem konum duyusu da katkı verir."] };
  },
};

export const biologyFiguresEar: Record<string, Record<string, FigureDef>> = {
  "duyu-organlari-kulak": {
    "Zardan oval pencereye mekanik aktarım": pathGrid,
    "Yarım daire kanalları dönmedeki değişimi bildirir": balance,
  },
};
