import { txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Word anatomy for Turkish morphology. Each morpheme is a coloured block with
 * its role under it: root (dark), derivational suffix (green), inflectional
 * suffix (blue), buffer sound (grey). The drawing above stacks the bases as
 * they are built, so the order kök → gövde → çekim is visible at a glance.
 * Examples are the ones the guide itself analyses.
 */

type Role = "kök" | "yapım" | "çekim" | "yardımcı";
const TONE: Record<Role, Tone> = { kök: "ink", yapım: "c", çekim: "b", yardımcı: "muted" };
type Part = [string, Role, string];
type Step = { name: string; parts: Part[]; note: string };

function wordFigure(steps: Step[], caption: string, alt: string): FigureDef {
  return {
    caption,
    alt,
    steps: steps.map((s) => s.name),
    draw: (_v, step) => {
      const els: El[] = [];
      // Staircase: each earlier stage one row up, current stage highlighted.
      steps.slice(0, step + 1).forEach((st, i) => {
        const y = (step - i) * 1.1;
        const word = st.parts.map((p) => p[0]).join("");
        const on = i === step;
        els.push(txt(v(i * 0.9, y), word, "e", { tone: on ? "ink" : "muted", bold: on, small: !on }));
        if (i > 0) els.push(vec(v((i - 1) * 0.9 + 0.3, y + 0.85), v(i * 0.9 + 0.15, y + 0.3), { tone: "muted", thin: true }));
      });
      els.push(txt(v(0, -0.9), " ", "c"), txt(v(10, 0), " ", "c"));
      const st = steps[step];
      return {
        els,
        word: st.parts.map(([s, role, label]) => ({ s, tone: TONE[role], label })),
        legend: [
          { code: "", label: "kök", tone: "ink" },
          { code: "", label: "yapım eki (yeni taban)", tone: "c" },
          { code: "", label: "çekim eki (cümleye bağlar)", tone: "b" },
          { code: "", label: "yardımcı ses", tone: "muted" },
        ],
        readout: [st.note],
      };
    },
  };
}

const kokGovde = wordFigure(
  [
    { name: "Kök", parts: [["göz", "kök", "kök · ad"]], note: "Göz: anlamlı en küçük başlangıç parçası, kök." },
    { name: "1. yapım eki", parts: [["göz", "kök", "kök"], ["lük", "yapım", "yapım: addan ad"]], note: "Gözlük yeni bir taban (gövde): yapım eki yeni sözcük kurdu." },
    { name: "2. yapım eki", parts: [["göz", "kök", "kök"], ["lük", "yapım", "yapım"], ["çü", "yapım", "yapım: meslek"]], note: "Gözlükçü başka bir gövde: her ara tabanı ayrı kur." },
    { name: "Çekim eki", parts: [["göz", "kök", "kök"], ["lük", "yapım", "yapım"], ["çü", "yapım", "yapım"], ["ler", "çekim", "çekim: çokluk"]], note: "Gözlükçüler: çokluk eki cümleye bağlar, önceki türetmeyi silmez. Sözcük türemiştir." },
  ],
  "İleri ile sözcüğü kur: kök (koyu) üstüne yapım ekleri (yeşil) yeni tabanlar, en sonda çekim eki (mavi) gelir. Üstte her ara taban satır satır görünür.",
  "Göz, gözlük, gözlükçü, gözlükçüler sözcüklerinin merdiven gibi alt alta dizilişi; altta göz-lük-çü-ler parçaları renkli kutularda.",
);

const adCekimi = wordFigure(
  [
    { name: "Çokluk", parts: [["ev", "kök", "kök"], ["ler", "çekim", "çokluk"]], note: "Ev + ler: çekim eki sayıyı bildirir." },
    { name: "İyelik", parts: [["ev", "kök", "kök"], ["ler", "çekim", "çokluk"], ["imiz", "çekim", "iyelik (1. çoğul)"]], note: "Evlerimiz: kimin? bizim." },
    { name: "Hâl", parts: [["ev", "kök", "kök"], ["ler", "çekim", "çokluk"], ["imiz", "çekim", "iyelik"], ["den", "çekim", "ayrılma hâli"]], note: "Evlerimizden uzun ama yalnız çekimle kuruldu: yapısı basittir." },
    { name: "Bir yapım eki ekle", parts: [["ev", "kök", "kök"], ["siz", "yapım", "yapım: yokluk"], ["ler", "çekim", "çokluk"], ["imiz", "çekim", "iyelik"], ["den", "çekim", "ayrılma"]], note: "Evsizlerimizden: tek -siz yeni taban kurar, yapı türemişe döner; -den aynı görevi sürdürür." },
  ],
  "İleri ile çekim eklerini sırayla ekle: hepsi mavi, sözcük basit kalır. Son adımda tek bir yeşil yapım eki yapıyı türemişe çevirir.",
  "Ev, evler, evlerimiz, evlerimizden ve evsizlerimizden sözcüklerinin renkli parçalara ayrılmış hâli.",
);

const iSesi = wordFigure(
  [
    { name: "İyelik -i", parts: [["defter", "kök", "kök"], ["i", "çekim", "iyelik: onun"]], note: "‘Onun defteri masada’: kimin defteri? Onun → iyelik." },
    { name: "Belirtme -i", parts: [["defter", "kök", "kök"], ["i", "çekim", "belirtme: neyi?"]], note: "‘Defteri masaya koy’: neyi koy? Defteri → belirtme. Aynı ses, farklı görev." },
    { name: "İkisi bir arada", parts: [["kitab", "kök", "kök (p→b)"], ["ı", "çekim", "iyelik"], ["n", "yardımcı", "yardımcı ses"], ["ı", "çekim", "belirtme"]], note: "Kitabını: ilk ı iyelik, n yardımcı ses (ek değil), son ı belirtme." },
  ],
  "İleri ile aynı -i sesinin iki görevini karşılaştır; son adımda iki görev tek sözcükte, aradaki gri n yalnız yardımcı sestir.",
  "Defteri sözcüğü iyelik ve belirtme görevleriyle; kitabını sözcüğü kitab-ı-n-ı parçalarıyla renklendirilmiş.",
);

const istisna = wordFigure(
  [
    { name: "Yaygın sıra", parts: [["göz", "kök", "kök"], ["lük", "yapım", "yapım"], ["ler", "çekim", "çekim"]], note: "Yaygın sıra: kök → yapım → çekim." },
    { name: "Karşı örnek", parts: [["anne", "kök", "kök"], ["m", "çekim", "iyelik (çekim)"], ["siz", "yapım", "yapım: yokluk"]], note: "‘Annemsiz gitmem’: önce iyelik çekimi, sonra yapım eki. Kural bir örüntüdür, istisnası vardır." },
  ],
  "İleri ile yaygın sırayı ve onu sınırlayan karşı örneği karşılaştır: annemsiz'de mavi çekim eki yeşil yapım ekinden önce gelir.",
  "Gözlükler ve annemsiz sözcüklerinin renkli parça dizilişi; ikincisinde çekim eki yapım ekinden önce.",
);

const fiilCekimi = wordFigure(
  [
    { name: "Fiil: kip + kişi", parts: [["gel", "kök", "kök · fiil"], ["di", "çekim", "kip: geçmiş zaman"], ["m", "çekim", "kişi: 1. tekil"]], note: "Geldim: -di zaman (kip), -m kişi." },
    { name: "Ad: iyelik", parts: [["ev", "kök", "kök · ad"], ["im", "çekim", "iyelik: benim"]], note: "Evim: -(i)m iyeliktir; sesi benzer ama görevi farklıdır." },
  ],
  "İleri ile aynı biçimli iki eki karşılaştır: geldim'deki -m kişi eki, evim'deki -im iyelik ekidir.",
  "Geldim ve evim sözcükleri renkli parçalarla; altlarında kip, kişi ve iyelik görevleri.",
);

export const turkishFiguresWords: Record<string, Record<string, FigureDef>> = {
  "sozcukte-yapi": {
    "Kök, gövde ve ek: sözcüğün kuruluş hikâyesi": kokGovde,
    "Ad çekimi: aynı sözcük cümleye bağlanır": adCekimi,
    "Aynı i sesi, farklı görev: iyelik ve belirtme": iSesi,
    "Fiil çekimi ve aynı biçimli eklerin tuzağı": fiilCekimi,
    "Sıra kuralı bir örüntüdür; istisnayı saklama": istisna,
  },
};
