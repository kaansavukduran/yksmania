import { poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Madhhab map: two independent axes. Belief interpretations (itikadi-siyasi)
 * and practice/law schools (amelî-fıkhi) are separate classifications, each
 * with its founding scholar. One person can follow a Matüridi creed and the
 * Hanefi school of law at once. Names follow the MEB summary.
 */

type Leaf = { name: string; who: string };
const BELIEF: Leaf[] = [
  { name: "Eşarilik", who: "Ebülhasan Eşari" },
  { name: "Matüridilik", who: "Ebu Mansur Matüridi" },
  { name: "Şia", who: "imamet vurgusu" },
];
const LAW: Leaf[] = [
  { name: "Hanefilik", who: "Ebu Hanife" },
  { name: "Malikilik", who: "Malik bin Enes" },
  { name: "Şafiilik", who: "Şafii" },
  { name: "Hanbelilik", who: "Ahmed bin Hanbel" },
  { name: "Caferilik", who: "Cafer Sadık" },
];

const madhhabMap: FigureDef = {
  caption:
    "İleri ile iki ayrı sınıflamayı aç. İtikadi-siyasi yorumlar inanç ve liderlik (imamet) konularını, amelî-fıkhi ekoller ibadet ve günlük hukuku yorumlar. Önce sorunun konusunu etiketle: inanç mı, uygulama mı? Kurucular adımların altındaki okumada; kişi adı verilmişse bu eşleşmeyi kullan, Hanefi ile Hanbeli ses benzerliğine güvenme.",
  alt: "Ağaç şeması: tepede Mezhepler, altında iki dal (İtikadi-siyasi ve Amelî-fıkhi); itikadi dalda Eşarilik, Matüridilik ve Şia, fıkhi dalda Hanefilik, Malikilik, Şafiilik, Hanbelilik ve Caferilik kurucularıyla.",
  steps: ["İki eksen", "İnanç ekolleri", "Fıkıh ekolleri", "Aynı kişide iki etiket"],
  draw: (_v, step) => {
    const els: El[] = [];
    const box = (x: number, y: number, w: number, label: string, tone: Tone, on: boolean) => {
      els.push(poly([v(x, y), v(x + w, y), v(x + w, y + 0.75), v(x, y + 0.75)], { tone: on ? tone : "muted", fill: on ? tone : undefined, thin: !on }));
      els.push(txt(v(x + w / 2, y + 0.375), label, "c", { tone: on ? "ink" : "muted", small: true, bold: true }));
    };
    const leftOn = step === 0 || step === 1;
    const rightOn = step === 0 || step === 2;
    box(3.6, 5.7, 3.0, "Mezhepler", "ink", true);
    box(0.3, 4.4, 3.8, "İtikadi-siyasi", "c", leftOn || step === 3);
    box(6.1, 4.4, 3.8, "Amelî-fıkhi", "b", rightOn || step === 3);
    els.push(seg(v(5.1, 5.7), v(2.2, 5.15), { tone: "muted", thin: true }), seg(v(5.1, 5.7), v(8.0, 5.15), { tone: "muted", thin: true }));
    const column = (x: number, leaves: Leaf[], tone: Tone, on: boolean, pick?: string) => {
      const spine = x + 0.25;
      const top = 3.3;
      const gap = 0.95;
      els.push(seg(v(spine, 4.4), v(spine, top - (leaves.length - 1) * gap + 0.375), { tone: "muted", thin: true }));
      leaves.forEach((l, i) => {
        const y = top - i * gap;
        els.push(seg(v(spine, y + 0.375), v(x + 0.6, y + 0.375), { tone: "muted", thin: true }));
        box(x + 0.6, y, 3.2, l.name, tone, on || l.name === pick);
      });
    };
    column(0.3, BELIEF, "c", leftOn, step === 3 ? "Matüridilik" : undefined);
    column(6.1, LAW, "b", rightOn, step === 3 ? "Hanefilik" : undefined);
    els.push(txt(v(-0.2, 6.7), " ", "c"), txt(v(10.2, -0.6), " ", "c"));
    const rows: [string, string][] = [
      ["İki ayrı sınıflama: itikadi-siyasi (inanç, imamet) ve amelî-fıkhi (ibadet, alışveriş, miras).", "Mezhep yeni bir din değildir; aynı kaynağın (Kur'an, sünnet) farklı yorum ekolüdür."],
      ["İnanç: Ehlisünnet içinde Eşarilik (Eşari) ve Matüridilik (Matüridi); Şia imameti merkeze alır.", "“Allah'ın sıfatları, insanın fiilleri, ahiret” soruda geçiyorsa itikadi alan."],
      ["Fıkıh: Hanefilik (Ebu Hanife), Malikilik (Malik bin Enes, Medine uygulaması), Şafiilik (Şafii, usul), Hanbelilik (Ahmed bin Hanbel, hadis), Caferilik (Cafer Sadık).", "“Namazın uygulanışı, miras, alışveriş” geçiyorsa fıkhi alan."],
      ["Matüridi itikadı + Hanefi fıkhı aynı kişide çelişki değildir: iki etiket farklı eksendedir.", "Mezheplerin doğuş nedenleri: insanın yapısı, sosyal, kültürel, coğrafi, siyasi, metin. Nüsha sayısı tek başına neden değil (2023 TYT Sosyal 19)."],
    ];
    return { els, readout: rows[step] };
  },
};

export const religionFigures: Record<string, Record<string, FigureDef>> = {
  "islam-dusuncesinde-mezhepler": { "Birden çok etiket çelişki olmak zorunda değil": madhhabMap },
};
