import { circle, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad, rect } from "./biologyFigures059Kit";
import { table } from "./biologyFigures059TytKit";

/*
 * TYT Biyoloji · Canlıların sınıflandırılması, eşeyli ve eşeysiz üreme
 * (Forge059). Veriler bölüm metinlerindedir: aslan taksonları (Eukarya →
 * Panthera leo); atölyenin oluşturulmuş altı bazlık dizileri GGCCGA,
 * GGCCGG, GGCCTT (gerçek genom ölçümü değildir); 2n = 18, n = 9; DNA
 * 2C → 4C → 2C → C; ideal eşzamanlı k turda 2ᵏ hücre; 3 → 12 → 17 bakteri
 * sayımı; bal arısının haplodiploit okul modeli.
 */

/* ---------------- Sınıflandırma ---------------- */

const RANKS: [string, string][] = [
  ["Üst âlem", "Eukarya"],
  ["Âlem", "Animalia"],
  ["Şube", "Chordata"],
  ["Sınıf", "Mammalia"],
  ["Takım", "Carnivora"],
  ["Familya", "Felidae"],
  ["Cins", "Panthera"],
  ["Tür", "Panthera leo"],
];
const ranks: FigureDef = {
  caption:
    "Basamak (kategori) ile takson ayrı şeylerdir: 'sınıf' bir basamak, Mammalia o basamaktaki bir takson. Aslan örneğinde her takson bir üsttekinin içindedir; genişten dara gidildikçe kapsanan çeşitlilik genellikle azalır. İç içe kutular yalnız kapsamayı gösterir, tür sayısı ölçeği değildir. Bir basamağa tıkla.",
  alt: "Sekiz iç içe kutu, dıştan içe daralarak: Üst âlem Eukarya, Âlem Animalia, Şube Chordata, Sınıf Mammalia, Takım Carnivora, Familya Felidae, Cins Panthera, Tür Panthera leo. Basamak adları solda, takson adları kutunun içinde.",
  picks: RANKS.map(([r, t]) => ({ label: r, title: `${r}: ${t}`, detail: [`Basamak: ${r}. Aslanın bu basamaktaki taksonu: ${t}.`, "Basamak adı bir derece, takson adı belirli bir gruptur."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    const H = 0.78;
    RANKS.forEach(([r, t], i) => {
      const on = pick === i;
      const x0 = 2.6 + i * 0.32;
      const x1 = 11.6 - i * 0.32;
      const y1 = 7.2 - i * H;
      const y0 = 0.1 + i * 0.12;
      els.push(rect(x0, y0, x1, y1, { tone: on ? "a" : i % 2 ? "c" : "b", fill: on ? "a" : undefined, thin: !on, bold: on }));
      els.push(txt(v(2.45, y1 - H / 2), r, "w", { small: true, bold: on, tone: on ? "a" : "ink", pick: i }));
      els.push(txt(v((x0 + x1) / 2, y1 - H / 2), t, "c", { small: true, bold: true, tone: on ? "a" : "ink" }));
    });
    els.push(...pad(v(0, 7.4), v(11.8, 0.05)));
    const sel = pick >= 0 ? RANKS[pick] : undefined;
    return { els, readout: [sel ? `${sel[0]} basamağında aslanın taksonu ${sel[1]}.` : "Bir basamağın adına tıkla ya da aşağıdan seç.", "Aynı cinsteki iki tür üst taksonları paylaşır; aynı familya aynı cinsi zorunlu kılmaz."] };
  },
};

const SEQ: [string, string, Tone][] = [["kertenkele", "GGCCGA", "c"], ["güvercin", "GGCCGG", "b"], ["kedi", "GGCCTT", "a"]];
const diffs = (a: string, b: string) => [...a].filter((ch, i) => ch !== b[i]).length;
const alignment: FigureDef = {
  caption:
    "Atölyenin oluşturulmuş altı bazlık dizileri hizalanır ve aynı konumdaki farklı bazlar sayılır: kertenkele–güvercin 1, kedi ile her biri 2 fark. Bu paket seçilmiş basit ağaçla uyumludur; gerçek genomların bu altı bazdan oluştuğu veya ölçüm yapıldığı iddia edilmez.",
  alt: "Üç satırlık hizalama: kertenkele GGCCGA, güvercin GGCCGG, kedi GGCCTT; her baz bir kutuda. İlk dört konum üçünde aynı; 5. ve 6. konumlarda farklı bazların kutuları vurgulu. Sağda çift başına fark sayıları.",
  draw: () => {
    const els: El[] = [];
    const s = 0.8;
    SEQ.forEach(([name, q], r) => {
      const y = 3.6 - r * 1.0;
      els.push(txt(v(2.4, y), name, "w", { small: true, bold: true }));
      [...q].forEach((ch, i) => {
        const varies = SEQ.some(([, o]) => o[i] !== ch);
        els.push(rect(2.6 + i * s, y - 0.38, 2.6 + (i + 1) * s, y + 0.38, { tone: varies ? "a" : "ink", fill: varies ? "a" : undefined, thin: true }), txt(v(2.6 + (i + 0.5) * s, y), ch, "c", { small: true, bold: true }));
      });
    });
    for (let i = 0; i < 6; i++) els.push(txt(v(2.6 + (i + 0.5) * s, 4.25), String(i + 1), "n", { small: true, tone: "muted" }));
    const pairs: [number, number][] = [[0, 1], [0, 2], [1, 2]];
    pairs.forEach(([a, b], k) => els.push(txt(v(8.0, 3.6 - k * 1.0), `${SEQ[a][0]}–${SEQ[b][0]}: ${diffs(SEQ[a][1], SEQ[b][1])}`, "e", { small: true, bold: true })));
    els.push(...pad(v(0, 4.9), v(11.8, 2.6)));
    return { els, readout: [pairs.map(([a, b]) => `${SEQ[a][0]}–${SEQ[b][0]} ${diffs(SEQ[a][1], SEQ[b][1])}`).join(", ") + " fark.", "En az fark her koşulda doğru ağacı garanti eden evrensel algoritma değildir."] };
  },
};

const tree: FigureDef = {
  caption:
    "Filogenetik ağaçta düğüm ortak atayı, dallar soyların ayrılmasını gösterir. Kertenkele ile güvercin en yakın ortak düğümü paylaşır; kedi daha dipteki düğümde ayrılır. Bir düğüm çevresinde dalları döndürmek aynı ilişkiyi farklı görünüşle verir. Dal uzunlukları zaman veya değişim miktarı değildir.",
  alt: "Üç uçlu ağaç: dipteki düğümden kedi ve bir iç düğüm ayrılıyor, iç düğümden kertenkele ve güvercin. İkinci adımda dallar düğümler çevresinde döndürülmüş; uçların sırası değişse de bağlantılar aynı.",
  steps: ["Bir çizim", "Dallar döndürülmüş"],
  draw: (_v, step) => {
    const order = step ? ["kedi", "güvercin", "kertenkele"] : ["kertenkele", "güvercin", "kedi"];
    const X = (name: string) => 1.5 + order.indexOf(name) * 3.6;
    const top = 4.2;
    const inner: V = v((X("kertenkele") + X("güvercin")) / 2, 2.6);
    const root: V = v((inner[0] + X("kedi")) / 2, 1.0);
    const els: El[] = [
      seg(root, inner, { bold: true }),
      seg(root, v(X("kedi"), top), { bold: true }),
      seg(inner, v(X("kertenkele"), top), { bold: true }),
      seg(inner, v(X("güvercin"), top), { bold: true }),
      circle(inner, 0.14, { tone: "a", fill: "a" }),
      circle(root, 0.14, { tone: "b", fill: "b" }),
    ];
    for (const n of order) els.push(txt(v(X(n), top + 0.15), n, "n", { small: true, bold: true }));
    els.push(txt(v(inner[0] + 0.25, inner[1] - 0.05), "en yakın ortak ata", "e", { small: true, tone: "a" }), txt(v(root[0] + 0.25, root[1] - 0.05), "daha eski ortak ata", "e", { small: true, tone: "b" }));
    els.push(...pad(v(0, 5.1), v(11.8, 0.5)));
    return { els, readout: ["Yan yana çizilmek yakın akrabalık kanıtı değildir; paylaşılan en yakın düğümü bul.", "Sağda ya da yukarıda olmak 'daha gelişmiş' demek değildir."] };
  },
};

const domains: FigureDef = {
  caption:
    "Üç üst âlem: Bacteria, Archaea, Eukarya. Bakteri ve arkeler zarla çevrili çekirdek taşımayan prokaryot hücre düzenindedir ama moleküler ve biyokimyasal özelliklerle ayrılır; 'prokaryotların hepsi aynı üst âlemdedir' yanlıştır. Tek hücreli ökaryotlar da vardır. Şema akrabalık sırası göstermez.",
  alt: "Yan yana üç kutu: Bacteria, Archaea, Eukarya. İlk ikisinin altında 'prokaryot hücre düzeni' köşeli parantezi, üçüncüsünün altında 'ökaryot'. İlk ikisinin arasında 'moleküler kanıtla ayrılır' notu.",
  draw: () => {
    const names: [string, Tone][] = [["Bacteria", "b"], ["Archaea", "c"], ["Eukarya", "a"]];
    const els: El[] = [];
    names.forEach(([n, t], i) => {
      const x = 0.4 + i * 3.9;
      els.push(rect(x, 2.4, x + 3.2, 3.6, { tone: t, fill: t, thin: true }), txt(v(x + 1.6, 3.0), n, "c", { bold: true }));
    });
    els.push(seg(v(0.4, 2.1), v(7.5, 2.1), { tone: "muted" }), seg(v(0.4, 2.1), v(0.4, 2.3), { tone: "muted" }), seg(v(7.5, 2.1), v(7.5, 2.3), { tone: "muted" }));
    els.push(txt(v(3.95, 1.9), "prokaryot hücre düzeni", "s", { small: true, bold: true }), txt(v(9.8, 1.9), "ökaryot", "s", { small: true, bold: true }));
    els.push(txt(v(3.95, 3.8), "moleküler kanıtla ayrılır", "n", { small: true, tone: "warn" }));
    els.push(...pad(v(0.2, 4.6), v(11.6, 0.8)));
    return { els, readout: ["Hücre büyüklüğü ya da yaşadığı yer üst âlemi kesin belirlemez.", "Bütün tek hücreliler prokaryot değildir."] };
  },
};

/* ---------------- Eşeyli üreme ---------------- */

const lifeCycle: FigureDef = {
  caption:
    "2n = 18 olan türde (bölüm örneği) mayozla n = 9 kromozomlu gametler oluşur; döllenme iki takımı birleştirir ve zigot 18 kromozomlu olur; normal mitozlarda her yavru hücre 18 kromozomlu kalırken hücre sayısı artar. n bir kromozom takımıdır, hücre sayısı değil.",
  alt: "Döngü şeması: solda 2n = 18 ebeveyn hücreleri, mayoz oklarıyla iki n = 9 gamete; gametler döllenme okuyla 2n = 18 zigota; zigottan mitoz okuyla 18'er kromozomlu hücrelere.",
  steps: ["Mayoz", "Döllenme", "Mitoz"],
  draw: (_v, step) => {
    const cell = (c: V, r: number, s: string, tone: Tone, on: boolean): El[] => [circle(c, r, { tone: on ? tone : "muted", fill: on ? tone : undefined, thin: true, dash: !on }), txt(c, s, "c", { small: true, bold: on, tone: on ? "ink" : "muted" })];
    const els: El[] = [];
    els.push(...cell(v(1.2, 3.8), 0.9, "2n = 18", "c", true), ...cell(v(1.2, 1.0), 0.9, "2n = 18", "b", true));
    els.push(...cell(v(4.4, 3.8), 0.7, "n = 9", "c", true), ...cell(v(4.4, 1.0), 0.7, "n = 9", "b", true));
    els.push(vec(v(2.2, 3.8), v(3.6, 3.8), { tone: "a" }), vec(v(2.2, 1.0), v(3.6, 1.0), { tone: "a" }), txt(v(2.9, 4.0), "mayoz", "n", { small: true, tone: "a" }), txt(v(2.9, 0.8), "mayoz", "s", { small: true, tone: "a" }));
    const z = v(7.4, 2.4);
    els.push(...cell(z, 0.9, "2n = 18", "a", step >= 1), vec(v(5.2, 3.5), v(6.6, 2.8), { tone: step >= 1 ? "ink" : "muted" }), vec(v(5.2, 1.3), v(6.6, 2.0), { tone: step >= 1 ? "ink" : "muted" }), txt(v(5.9, 3.4), "döllenme", "ne", { small: true, tone: step >= 1 ? "ink" : "muted" }));
    els.push(...cell(v(10.6, 3.4), 0.75, "18", "a", step >= 2), ...cell(v(10.6, 1.4), 0.75, "18", "a", step >= 2), vec(v(8.4, 2.7), v(9.75, 3.2), { tone: step >= 2 ? "ink" : "muted" }), vec(v(8.4, 2.1), v(9.75, 1.6), { tone: step >= 2 ? "ink" : "muted" }), txt(v(9.1, 2.4), "mitoz", "e", { small: true, tone: step >= 2 ? "ink" : "muted" }));
    els.push(...pad(v(0.1, 4.9), v(11.6, -0.1)));
    const say = ["Mayoz: 2n = 18 öncülden n = 9 gamet; takım sayısı yarıya iner.", "Döllenme: 9 + 9 = 18; zigot diploittir. Döllenme yeni DNA eşlenmesi değildir.", "Mitoz: hücre sayısı artar, her hücre 18 kromozomlu kalır."];
    return { els, readout: [say[step], "Birim yaz: kromozom/hücre, hücre ve DNA miktarı farklı niceliklerdir."] };
  },
};

const DNA_PATH: [number, number, string][] = [[0, 2, "öncül"], [1, 4, "eşlenme sonrası"], [2, 2, "mayoz I sonrası"], [3, 1, "gamet"], [4, 2, "zigot"]];
const dnaGraph: FigureDef = {
  caption:
    "Hücre başına DNA miktarı mayozda 2C → 4C (eşlenme) → 2C (mayoz I) → C (mayoz II); döllenme iki C'yi birleştirip 2C verir. Kromozom sayısı ise 2n'den n'ye mayoz I'de iner, eşlenme sırasında ikiye katlanmaz: kardeş kromatitler oluşur. Basamaklar ölçeklidir, yatay eksen olay sırasıdır.",
  alt: "Basamak grafiği: yatayda öncül, eşlenme sonrası, mayoz I sonrası, gamet, zigot; düşeyde DNA miktarı C. Değerler 2, 4, 2, 1, 2. Her basamağın altında olay adı.",
  draw: () => {
    const X = 2.2;
    const Y = 1.1;
    const els: El[] = [seg(v(0, 0), v(11.2, 0), { thin: true, tone: "muted" }), seg(v(0, 0), v(0, 4.9), { thin: true, tone: "muted" })];
    for (const c of [1, 2, 4]) els.push(seg(v(-0.1, c * Y), v(0.1, c * Y), { thin: true, tone: "muted" }), txt(v(-0.15, c * Y), `${c === 1 ? "" : c}C`, "w", { small: true, tone: "muted" }));
    DNA_PATH.forEach(([i, c, name], k) => {
      const x0 = i * X + 0.1;
      els.push(seg(v(x0, c * Y), v(x0 + X, c * Y), { bold: true, tone: k === 4 ? "a" : "c" }));
      if (k > 0) els.push(seg(v(x0, DNA_PATH[k - 1][1] * Y), v(x0, c * Y), { thin: true, tone: "c" }));
      els.push(txt(v(x0 + X / 2, c * Y + 0.15), `${c === 1 ? "" : c}C`, "n", { small: true, bold: true }));
      els.push(txt(v(x0 + X / 2, k % 2 ? -0.85 : -0.25), name, "s", { small: true, tone: "muted" }));
    });
    els.push(...pad(v(-0.9, 5.2), v(11.6, -1.6)));
    return { els, readout: ["DNA: 2C → 4C → 2C → C → (döllenme) 2C.", "DNA iki katına çıkınca kromozom sayısı hemen ikiye katlanmaz."] };
  },
};

const cleavage: FigureDef = {
  caption:
    "İdeal eşzamanlı bölünmede k turda bir zigottan 2ᵏ hücre oluşur ve her hücre 18 kromozomlu kalır (bölüm örneği 2n = 18). Gerçek dokularda tüm hücreler aynı anda bölünmeyebilir; farklılaşma kromozom sayısını değiştirmez.",
  alt: "Sürgüyle seçilen tur sayısına göre küçük dairelerden oluşan hücre kümesi: 1, 2, 4, 8, 16 ya da 32 hücre; her dairenin içinde 18.",
  param: { label: "Mitoz turu k", min: 0, max: 5, step: 1, init: 3, plain: true },
  draw: (kv) => {
    const k = Math.round(kv);
    const n = 2 ** k;
    const cols = Math.min(8, n);
    const rows = Math.ceil(n / cols);
    const r = 0.52;
    const els: El[] = [];
    for (let i = 0; i < n; i++) {
      const c = v(1.4 + (i % cols) * 1.25 + (8 - cols) * 0.625, 4.2 - Math.floor(i / cols) * 1.15);
      els.push(circle(c, r, { tone: "a", fill: "a", thin: true }), txt(c, "18", "c", { small: true, bold: true }));
    }
    els.push(...pad(v(0.4, 4.9), v(11.4, 4.2 - 3 * 1.15 - 0.7)));
    return { els, readout: [`k = ${k}: 2${"⁰¹²³⁴⁵"[k]} = ${n} hücre, her biri 18 kromozom (${rows} sıra).`, "Hücre sayısı ile hücre başına kromozom sayısı ayrı değişkenlerdir."] };
  },
};

/* ---------------- Eşeysiz üreme ---------------- */

const counting: FigureDef = {
  caption:
    "Bölüm örneği: her tam turda bütün hücreler bir kez bölünüyor ve kayıp yoksa N₀ × 2ᵏ. Üç bakteri iki tam turda 3 → 6 → 12 olur; sonra yalnız beşi bölünürse sayı beş artar: 12 + 5 = 17. Çubuklar ölçeklidir.",
  alt: "Dört çubuk: başlangıç 3, birinci tur 6, ikinci tur 12, kısmi tur 17. Son çubukta 12'nin üstüne eklenen 5'lik parça farklı renkte.",
  steps: ["Başlangıç", "1. tam tur", "2. tam tur", "Yalnız 5 hücre bölünür"],
  draw: (_v, step) => {
    const vals = [3, 6, 12, 17];
    const K = 0.25;
    const els: El[] = [seg(v(-0.2, 0), v(11.2, 0), { thin: true, tone: "muted" })];
    vals.forEach((n, i) => {
      if (i > step) return;
      const x = i * 2.8 + 0.4;
      if (i === 3) els.push(rect(x, 0, x + 1.6, 12 * K, { tone: "c", fill: "c", thin: true }), rect(x, 12 * K, x + 1.6, n * K, { tone: "a", fill: "a", bold: true }), txt(v(x + 1.75, 14.5 * K), "+5", "e", { small: true, bold: true, tone: "a" }));
      else els.push(rect(x, 0, x + 1.6, n * K, { tone: "c", fill: "c", thin: i !== step, bold: i === step }));
      els.push(txt(v(x + 0.8, n * K + 0.15), String(n), "n", { small: true, bold: true }), txt(v(x + 0.8, -0.25), ["başlangıç", "1. tur", "2. tur", "kısmi tur"][i], "s", { small: true, tone: "muted" }));
    });
    els.push(...pad(v(-0.3, 5.0), v(11.6, -0.9)));
    const say = ["N₀ = 3.", "3 × 2 = 6.", "3 × 2² = 12.", "Yalnız 5 hücre bölünür: 12 + 5 = 17; 12 × 2 = 24 değil."];
    return { els, readout: [say[step], "Tomurcuk ya da parça sayısı verilmişse her olaydaki yeni bireyi ayrı say."] };
  },
};

const fission: FigureDef = {
  caption:
    "Aynı son sayı (iki hücre), farklı mekanizma: bakteri ve arkelerde DNA eşlenir, kopyalar ayrılır, hücre ikiye bölünür; zar çevrili çekirdek ve mitoz evreleri yoktur. Amip, öglena ve paramesyumda çekirdek mitozla bölünür; tipik okul örneklerinde bölünme düzlemi amipte değişken, öglenada boyuna, paramesyumda enine.",
  alt: "Tablo: canlı, çekirdek bölünmesi ve bölünme düzlemi sütunları. Bakteri ve arke: mitoz yok; amip: mitoz, değişken; öglena: mitoz, boyuna; paramesyum: mitoz, enine.",
  draw: () => {
    const body = [
      ["bakteri, arke", "mitoz yok", "ikiye bölünme"],
      ["amip", "mitoz", "değişken"],
      ["öglena", "mitoz", "boyuna"],
      ["paramesyum", "mitoz", "enine"],
    ];
    const els: El[] = [...table(["canlı", "çekirdek bölünmesi", "düzlem"], body, [3.6, 4.0, 3.6], { top: 4.6, rowH: 0.9, tone: (r, c) => (c === 1 ? (r === 0 ? "warn" : "c") : undefined) }), ...pad(v(-0.1, 4.8), v(11.3, 0))];
    return { els, readout: ["DNA'nın önce kopyalanması prokaryot olayı mitoz diye adlandırmaya yetmez.", "Yavruların sitoplazma ve organel miktarı tam eşit olmak zorunda değildir."] };
  },
};

const bee: FigureDef = {
  caption:
    "Bal arısının haplodiploit okul modeli: kraliçe 2n, yumurtalar mayozla n. Döllenmemiş yumurtadan erkek (n) gelişir (partenogenez); erkeğin sperm üretimi n düzeyini korur ve okul modelinde mitozla açıklanır. Döllenmiş yumurta (n + n) 2n dişiyi oluşturur; işçi–kraliçe ayrımında beslenme rol oynar. Bu ilişki bütün canlılara yayılmaz.",
  alt: "Akış şeması: üstte kraliçe 2n, mayoz okuyla yumurta n. Yumurtadan bir kol 'döllenmeden' erkek n kutusuna, erkekten mitoz okuyla sperm n kutusuna; sperm ve yumurtadan birleşen kol 'döllenme' ile dişi 2n kutusuna gidiyor.",
  draw: () => {
    const box = (c: V, s: string, tone: Tone): El[] => [rect(c[0] - 1.25, c[1] - 0.42, c[0] + 1.25, c[1] + 0.42, { tone, fill: tone, thin: true }), txt(c, s, "c", { small: true, bold: true })];
    const Q = v(1.6, 4.4);
    const E = v(1.6, 2.4);
    const M = v(5.8, 2.4);
    const S = v(9.9, 2.4);
    const F = v(5.8, 0.4);
    const els: El[] = [...box(Q, "kraliçe 2n", "a"), ...box(E, "yumurta n", "c"), ...box(M, "erkek n", "b"), ...box(S, "sperm n", "b"), ...box(F, "dişi 2n", "a")];
    els.push(vec(v(1.6, 3.95), v(1.6, 2.85)), txt(v(1.75, 3.4), "mayoz", "e", { small: true, tone: "a" }));
    els.push(vec(v(2.9, 2.4), v(4.5, 2.4)), txt(v(3.7, 2.2), "döllenmeden", "s", { small: true, tone: "a" }));
    els.push(vec(v(7.1, 2.4), v(8.6, 2.4)), txt(v(7.85, 2.55), "mitoz", "n", { small: true, tone: "a" }));
    els.push(vec(v(1.6, 1.95), v(4.5, 0.55)), vec(v(9.9, 1.95), v(7.1, 0.55)), txt(v(9.0, 1.15), "döllenme", "w", { small: true, tone: "a" }));
    els.push(...pad(v(0.2, 5.0), v(11.4, -0.2)));
    return { els, readout: ["Erkek n, dişi 2n; dişide işçi ve kraliçe ayrımını beslenme etkiler.", "Aynı anneden döllenmesiz gelişen erkekler mutlak klon sayılmaz."] };
  },
};

export const biologyFigures059TytDiversity: Record<string, Record<string, FigureDef>> = {
  "canlilarin-siniflandirilmasi": {
    "Soy ağacını merdiven gibi okuma": tree,
    "Basamak başka, takson başka": ranks,
    "Üç üst âlem yalnız hücre şekliyle ayrılmaz": domains,
    "DNA benzerliğini hizalama ve kapsamla yorumla": alignment,
  },
  "eseyli-ureme": {
    "n bir hücre sayısı değildir": lifeCycle,
    "İki ana olay kromozom takımını dengeler": dnaGraph,
    "Zigot büyürken mayoz yapmaz": cleavage,
  },
  "eseysiz-ureme": {
    "İkiye bölünme her canlıda mitoz değildir": fission,
    "Partenogenezde bal arısı özel modeldir": bee,
    "Sayımı ve yöntemi aynı çözümde birleştir": counting,
  },
};
