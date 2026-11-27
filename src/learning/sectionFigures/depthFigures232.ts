import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";
import { pad } from "./physicsFigures058Kit";
import {
  ACTORS232, ASSEMBLY_EVENTS232, HISTORY_DATES232, NO_LINK232, PARTIES232, assemblyAt232, balance232, balanceSection232, developmentSection232,
  developments232, directionOf232, institutionSection232, institutions232, kindsOf232, linkText232, reformSection232, reforms232, roleOf232,
  treatySection232, treaties232, type Actor232, type Area232, type Concept232,
} from "../depth232";

/*
 * 0.232 TYT Tarih tablo bölümlerinin çizimleri. Kutulardaki adlar, yıllar,
 * roller ve okumalar tabloyu üreten aynı depth232 verilerinden gelir. Zaman
 * şeritleri yıllarla orantılıdır; kurum haritası, değişim şeması ve denge
 * ağı şematiktir. Adım değiştirmek öğrenme kaydı üretmez.
 */

const check232 = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depthFigures232: ${claim}`);
};
const D = HISTORY_DATES232;
const box = (x: number, y: number, w: number, h: number, on: boolean, tone: "a" | "b" = "a"): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], on ? { tone, fill: tone, bold: true } : { tone: "muted", thin: true });
const frame = (x: number, y: number, w: number, h: number, tone: "b" | "muted", dash = false): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { tone, bold: tone === "b", thin: tone === "muted", dash });

/* ---------- 1 · Kurum haritası: iki sütun, ayrı tutulacak kavrama ok ---------- */

const LEFT: readonly Concept232[] = ["Mirî arazi", "Çift-hane", "Tımar", "İstimâlet"];
const RIGHT: readonly Concept232[] = ["Lonca", "Narh", "Vakıf", "Vakfiye"];
check232([...LEFT, ...RIGHT].length === institutions232.length && institutions232.every((i) => [...LEFT, ...RIGHT].includes(i.name)), "her kavram çizimde bir kez yer almalı");
const BW = 4.0;
const BH = 0.85;
const GAP_X = 1.8;
const GAP_Y = 0.4;
const X1 = BW + GAP_X;
const OUTER = 0.55;
const place = (n: Concept232) => {
  const col = LEFT.includes(n) ? 0 : 1;
  const row = (col === 0 ? LEFT : RIGHT).indexOf(n);
  return { col, x: col === 0 ? 0 : X1, y: -row * (BH + GAP_Y) };
};
const BOTTOM_Y = -LEFT.length * (BH + GAP_Y) - 0.35;
const institutionFigure: FigureDef = {
  caption: "Sol sütun toprak, üretim ve fetih siyasetini; sağ sütun şehir ve hizmet kurumlarını gösterir. Seçilen kavramın kutusu doludur. Ok, dersin ayrı tutulmasını istediği kavrama gider; o kavram tablo dışındaysa alttaki kesik kutuya gider.",
  alt: `Sekiz adım. ${institutions232.map((i) => `${i.name}: ${i.field}; ayrı tutulacak kavram ${i.distinct}`).join(". ")}.`,
  steps: institutions232.map((i) => i.name),
  draw: (_value, step) => {
    const it = institutions232[step];
    const els: El[] = [];
    for (const i of institutions232) {
      const p = place(i.name);
      const on = i === it;
      const target = i.name === it.distinctIn;
      els.push(target ? frame(p.x, p.y, BW, BH, "b") : box(p.x, p.y, BW, BH, on), txt(v(p.x + BW / 2, p.y + BH / 2), i.name, "c", { small: true, bold: on || target, tone: on || target ? "ink" : "muted" }));
    }
    const from = place(it.name);
    const outerX = from.col === 0 ? -OUTER : X1 + BW + OUTER;
    const sideX = from.col === 0 ? 0 : X1 + BW;
    const fy = from.y + BH / 2;
    if (it.distinctIn) {
      const to = place(it.distinctIn);
      const ty = to.y + BH / 2;
      if (to.col === from.col) {
        els.push(seg(v(sideX, fy), v(outerX, fy), { tone: "b", bold: true }), seg(v(outerX, fy), v(outerX, ty), { tone: "b", bold: true }), vec(v(outerX, ty), v(sideX, ty), { tone: "b", bold: true }));
      } else {
        const a: V = from.col === 0 ? v(BW, fy) : v(X1, fy);
        const b: V = to.col === 0 ? v(BW, ty) : v(X1, ty);
        els.push(vec(a, b, { tone: "b", bold: true }));
      }
    } else {
      const W = X1 + BW;
      const ty = BOTTOM_Y - BH / 2;
      els.push(
        frame(0, BOTTOM_Y - BH, W, BH, "b", true),
        txt(v(W / 2, ty), `Tablo dışında: ${it.distinct}`, "c", { small: true, bold: true, tone: "ink" }),
        seg(v(sideX, fy), v(outerX, fy), { tone: "b", bold: true }),
        seg(v(outerX, fy), v(outerX, ty), { tone: "b", bold: true }),
        vec(v(outerX, ty), v(from.col === 0 ? 0 : W, ty), { tone: "b", bold: true }),
      );
    }
    return {
      els: [...els, ...pad(-OUTER - 0.4, BH + 0.4, X1 + BW + OUTER + 0.4, BOTTOM_Y - BH - 0.3)],
      readout: [
        `${it.name} — ${it.mechanism}.`,
        `Aktör veya araç: ${it.actors}. Alan: ${it.field}.`,
        `Ayrı tutulacak kavram: ${it.distinct}.`,
      ],
    };
  },
};

/* ---------- 2 · Antlaşmalar: taraf şeritleri, yıllarla orantılı ---------- */

const TY0 = 1590;
const TY1 = 1790;
const TXS = 0.055;
const TLANE = 1.15;
const tx = (year: number) => (year - TY0) * TXS;
const tLane = (i: number) => -i * TLANE;
const T_AXIS = tLane(PARTIES232.length - 1) - 1.1;
check232(treaties232.every((t) => D[t.key] > TY0 && D[t.key] < TY1), "bütün antlaşmalar şeridin içinde kalmalı");
check232(treaties232.every((t) => t.parties.every((p) => PARTIES232.includes(p))), "her taraf bir şeritte gösterilmeli");
const treatyFigure: FigureDef = {
  caption: "Yatay eksen yıllarla orantılıdır; her şerit bir karşı taraftır. Seçilen antlaşma, tarafı olan her şeritte dolu noktayla ve dikey çizgiyle gösterilir; öteki antlaşmalar soluk noktalardır.",
  alt: `Sekiz adımlı zaman şeridi, ${TY0}–${TY1}. ${treaties232.map((t) => `${D[t.key]} ${t.name}: ${t.parties.join(", ")}; ${directionOf232(t)}`).join(". ")}.`,
  steps: treaties232.map((t) => `${D[t.key]} ${t.name}`),
  draw: (_value, step) => {
    const t = treaties232[step];
    const year = D[t.key];
    const els: El[] = [];
    PARTIES232.forEach((p, i) => {
      const on = t.parties.includes(p);
      els.push(
        seg(v(0, tLane(i)), v(tx(TY1), tLane(i)), { tone: on ? "ink" : "muted", thin: !on, dash: !on }),
        txt(v(-0.2, tLane(i)), p, "w", { small: true, bold: on, tone: on ? "ink" : "muted" }),
      );
    });
    for (const x of treaties232) {
      if (x === t) continue;
      for (const p of x.parties) els.push(circle(v(tx(D[x.key]), tLane(PARTIES232.indexOf(p))), 0.08, { tone: "muted", fill: "muted" }));
    }
    const lanes = t.parties.map((p) => PARTIES232.indexOf(p));
    const top = Math.min(...lanes), bottom = Math.max(...lanes);
    const xx = tx(year);
    if (top !== bottom) els.push(seg(v(xx, tLane(top)), v(xx, tLane(bottom)), { tone: "a", bold: true }));
    for (const l of lanes) els.push(circle(v(xx, tLane(l)), 0.16, { tone: "a", fill: "a", bold: true }));
    els.push(
      seg(v(xx, tLane(top) + 0.2), v(xx, tLane(0) + 0.75), { tone: "a", thin: true, dash: true }),
      txt(v(xx, tLane(0) + 0.8), `${year} ${t.name}`, xx < 1.6 ? "ne" : xx > tx(TY1) - 2.4 ? "nw" : "n", { small: true, bold: true, tone: "ink" }),
      seg(v(0, T_AXIS), v(tx(TY1), T_AXIS), { tone: "ink", thin: true }),
    );
    for (let y = 1600; y <= 1750; y += 50) els.push(seg(v(tx(y), T_AXIS - 0.1), v(tx(y), T_AXIS + 0.1), { tone: "ink", thin: true }), txt(v(tx(y), T_AXIS - 0.42), String(y), "c", { small: true, tone: "muted" }));
    return {
      els: [...els, ...pad(-0.4, 1.8, tx(TY1) + 0.4, T_AXIS - 0.8)],
      readout: [
        `${year} · ${t.name} · ${t.parties.join(", ")}.`,
        `Madde (ders): ${t.clauses.map((c) => c.text).join("; ")}.`,
        `Değişim türü: ${kindsOf232(t).join(", ")} · toprak yönü: ${directionOf232(t)}.`,
      ],
    };
  },
};

/* ---------- 3 · Değişimler: kanıt kutuları ve Osmanlı kutusu ---------- */

const DW = 3.8;
const DH = 0.7;
const DG = 0.22;
const OX = DW + 1.9;
const OW = 5.0;
const OH = 1.6;
const dRowY = (i: number) => -i * (DH + DG);
const D_MID = dRowY((developments232.length - 1) / 2) + DH / 2;
const developmentFigure: FigureDef = {
  caption: "Soldaki kutular çağın değişimleridir; seçilen değişim doludur. Ders bir Osmanlı bağlantısı kuruyorsa ok sağdaki Osmanlı kutusuna gider ve bağlantı kutuda yazılır; kurmuyorsa ok çizilmez.",
  alt: `Yedi adım. ${developments232.map((d) => `${d.name}: ${d.field}; ${linkText232(d)}`).join(". ")}.`,
  steps: developments232.map((d) => d.name),
  draw: (_value, step) => {
    const d = developments232[step];
    const els: El[] = [];
    developments232.forEach((x, i) => {
      const on = x === d;
      els.push(box(0, dRowY(i), DW, DH, on), txt(v(DW / 2, dRowY(i) + DH / 2), x.name, "c", { small: true, bold: on, tone: on ? "ink" : "muted" }));
    });
    const oy = D_MID - OH / 2;
    els.push(frame(OX, oy, OW, OH, d.link ? "b" : "muted", !d.link), txt(v(OX + OW / 2, oy + OH - 0.45), "Osmanlı", "c", { bold: true, tone: d.link ? "ink" : "muted" }));
    els.push(txt(v(OX + OW / 2, oy + 0.45), d.link ? d.link.short : "bu derste bağlantı yok", "c", { small: true, bold: !!d.link, tone: d.link ? "ink" : "muted" }));
    if (d.link) els.push(vec(v(DW, dRowY(step) + DH / 2), v(OX, D_MID), { tone: "b", bold: true }));
    return {
      els: [...els, ...pad(-0.4, DH + 0.4, OX + OW + 0.4, dRowY(developments232.length - 1) - 0.4)],
      readout: [
        `${d.name} — alan: ${d.field}.`,
        `Ayırt edici kanıt: ${d.evidence}. Örnek: ${d.examples}.`,
        `Osmanlı tarafı: ${linkText232(d)}.`,
      ],
    };
  },
};
check232(developments232.some((d) => linkText232(d) === NO_LINK232), "bağlantısız satır çizimde ayrı gösterilir");

/* ---------- 4 · Reformlar: alan şeritleri ve meclis bandı ---------- */

const AREAS: readonly Area232[] = ["İdari-siyasal", "Askerî", "Hukuki", "Temsil"];
check232(reforms232.every((r) => AREAS.includes(r.area)), "her alan bir şeritte gösterilmeli");
const RY0 = 1800;
const RY1 = 1915;
const RXS = 0.095;
const RLANE = 1.1;
const rx = (year: number) => (year - RY0) * RXS;
const rLane = (i: number) => -i * RLANE;
const BAND_Y = rLane(AREAS.length - 1) - 1.25;
const R_AXIS = BAND_Y - 1.2;
const bandSegments = [
  { from: RY0, to: D[ASSEMBLY_EVENTS232[0].key], state: assemblyAt232(RY0) },
  ...ASSEMBLY_EVENTS232.map((e, i) => ({ from: D[e.key], to: i + 1 < ASSEMBLY_EVENTS232.length ? D[ASSEMBLY_EVENTS232[i + 1].key] : RY1, state: e.state })),
];
check232(bandSegments.every((s) => s.to > s.from), "meclis bandının her parçası pozitif uzunlukta olmalı");
const reformFigure: FigureDef = {
  caption: "Yatay eksen yıllarla orantılıdır. Üstteki dört şerit düzenlemenin alanıdır; alttaki bant o yıllardaki meclis durumudur: kalın düz çizgi meclisin işlediği, kesik çizgi tatil, ince çizgi meclisin henüz olmadığı yıllardır.",
  alt: `Sekiz adım, ${RY0}–${RY1}. ${reforms232.map((r) => `${D[r.key]} ${r.name}: ${r.kind}, ${r.area}; ${assemblyAt232(D[r.key])}`).join(". ")}.`,
  steps: reforms232.map((r) => `${D[r.key]} ${r.short}`),
  draw: (_value, step) => {
    const r = reforms232[step];
    const year = D[r.key];
    const els: El[] = [];
    AREAS.forEach((a, i) => {
      const on = a === r.area;
      els.push(
        seg(v(0, rLane(i)), v(rx(RY1), rLane(i)), { tone: on ? "ink" : "muted", thin: !on, dash: !on }),
        txt(v(-0.2, rLane(i)), a, "w", { small: true, bold: on, tone: on ? "ink" : "muted" }),
      );
    });
    for (const x of reforms232) if (x !== r) els.push(circle(v(rx(D[x.key]), rLane(AREAS.indexOf(x.area))), 0.08, { tone: "muted", fill: "muted" }));
    const p = v(rx(year), rLane(AREAS.indexOf(r.area)));
    const labelAt = rx(year) > rx(RY1) - 2.0 ? "nw" : rx(year) < 1.6 ? "ne" : "n";
    els.push(circle(p, 0.16, { tone: "a", fill: "a", bold: true }), seg(v(p[0], p[1] + 0.2), v(p[0], rLane(0) + 0.75), { tone: "a", thin: true, dash: true }), txt(v(p[0], rLane(0) + 0.8), `${year} ${r.short}`, labelAt, { small: true, bold: true, tone: "ink" }));
    els.push(txt(v(-0.2, BAND_Y), "Meclis", "w", { small: true, bold: true, tone: "ink" }));
    for (const s of bandSegments) {
      const open = s.state === "Meclis-i Umumî var" || s.state === "Meclis yeniden işler";
      const tatil = s.state === "Meclis tatilde";
      els.push(seg(v(rx(s.from), BAND_Y), v(rx(s.to), BAND_Y), { tone: open ? "a" : tatil ? "warn" : "muted", bold: open || tatil, thin: !open && !tatil, dash: tatil }));
    }
    els.push(seg(v(rx(year), p[1] - 0.2), v(rx(year), BAND_Y), { tone: "a", thin: true, dash: true }), circle(v(rx(year), BAND_Y), 0.12, { tone: "a", fill: "a" }));
    els.push(seg(v(0, R_AXIS), v(rx(RY1), R_AXIS), { tone: "ink", thin: true }));
    for (let y = RY0; y <= 1900; y += 25) els.push(seg(v(rx(y), R_AXIS - 0.1), v(rx(y), R_AXIS + 0.1), { tone: "ink", thin: true }), txt(v(rx(y), R_AXIS - 0.42), String(y), "c", { small: true, tone: "muted" }));
    return {
      els: [...els, ...pad(-0.5, 1.8, rx(RY1) + 0.5, R_AXIS - 0.8)],
      readout: [
        `${year} · ${r.name} · ${r.kind} · ${r.area}.`,
        `İçerik (ders): ${r.content}.`,
        `O yıl meclis durumu: ${assemblyAt232(year)}.`,
      ],
    };
  },
};

/* ---------- 5 · Denge ağı: Osmanlı merkezde, rol çizgileri ---------- */

const ANGLES: Record<Actor232, number> = { İngiltere: 140, Rusya: 40, Fransa: 195, Almanya: 345, "Mısır (Mehmet Ali Paşa)": 270 };
check232(ACTORS232.every((a) => ANGLES[a] !== undefined), "her aktörün çizimde yeri olmalı");
const R_NET = 3.3;
const R_CORE = 1.0;
const at = (deg: number, r: number): V => v(r * Math.cos((deg * Math.PI) / 180), r * Math.sin((deg * Math.PI) / 180));
const balanceFigure: FigureDef = {
  caption: "Osmanlı merkezdedir; çevredeki düğümler dersin andığı aktörlerdir. Seçilen yılda destek veren aktöre düz çizgi, karşı konumdaki aktöre farklı renkte kesik çizgi gider. Çizgisi olmayan aktör o satırda rol almaz.",
  alt: `Altı adım. ${balance232.map((b) => `${D[b.key]}: destek ${b.with.join(", ")}; karşı ${b.against.join(", ")}`).join(". ")}.`,
  steps: balance232.map((b) => String(D[b.key])),
  draw: (_value, step) => {
    const b = balance232[step];
    const els: El[] = [circle(v(0, 0), R_CORE, { tone: "ink", bold: true }), txt(v(0, 0), "Osmanlı", "c", { small: true, bold: true, tone: "ink" })];
    for (const a of ACTORS232) {
      const role = roleOf232(b, a);
      const deg = ANGLES[a];
      const node = at(deg, R_NET);
      if (role) els.push(seg(at(deg, R_CORE + 0.05), at(deg, R_NET - 0.22), { tone: role === "destek" ? "b" : "warn", bold: true, dash: role === "karşı" }));
      const c = Math.cos((deg * Math.PI) / 180), s = Math.sin((deg * Math.PI) / 180);
      const dir = s < -0.7 ? "s" : s > 0.7 ? "n" : c > 0 ? "e" : "w";
      els.push(
        circle(node, 0.2, role ? { tone: role === "destek" ? "b" : "warn", fill: role === "destek" ? "b" : "warn", bold: true } : { tone: "muted" }),
        txt(node, a, dir, { small: true, bold: !!role, tone: role ? "ink" : "muted" }),
      );
    }
    els.push(txt(v(0, R_NET + 1.1), String(D[b.key]), "c", { bold: true, tone: "ink" }));
    return {
      els: [...els, ...pad(-R_NET - 2.6, R_NET + 1.5, R_NET + 2.6, -R_NET - 0.9)],
      readout: [
        `${D[b.key]} · yakın tehdit veya kayıp: ${b.threat}.`,
        `Destek veya yakınlaşma: ${b.support}. Belge: ${b.doc}.`,
        `Bedel veya sınır: ${b.cost}.`,
      ],
    };
  },
};

export const depthFigures232: Record<string, Record<string, FigureDef>> = {
  "klasik-cag-osmanli-toplum-duzeni": { [institutionSection232.title]: institutionFigure },
  "degisen-dunya-dengeleri-osmanli": { [treatySection232.title]: treatyFigure },
  "degisim-caginda-avrupa-osmanli": { [developmentSection232.title]: developmentFigure },
  "devrimler-caginda-devlet-toplum": { [reformSection232.title]: reformFigure },
  "denge-stratejisi": { [balanceSection232.title]: balanceFigure },
};
