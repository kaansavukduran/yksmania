import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import {
  ENERGY_UNIT217, EFFICIENCY217, ISSUES217, MODE_ROWS217, NITROGEN_STEPS217, PRODUCER_KJ217, RESOURCES217, WEB_EDGES217, WEB_SPECIES217,
  chainText217, chains217, cycleSection217, edgeText217, energyLevels217, envSection217, foodsOf217, ledgerSection217, modeGroup217, modeSection217,
  net217, num217, pyramidSection217, removal217, routeMode217, signed217, webSection217, type Mode217, type Species217,
} from "../depth217";

/*
 * 0.217.0 ekoloji tablo bölümlerinin çizimleri. Her etiket ve okuma depth217
 * verisinden gelir. Ağ, döngü ve zincir çizimleri şematiktir: konumlar
 * okunabilirlik için seçilmiştir, uzaklık ya da miktar göstermez. Enerji
 * çubuklarının genişliği sıkıştırılmıştır; sayılar kesindir.
 */

/** Yalnız sözcük başındaki büyük harfi küçültür: CO₂, UV, pH, CFC korunur. */
const low = (s: string) => (/^[A-ZÇĞİIÖŞÜ][a-zçğıiöşü]/.test(s) ? s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1) : s);
const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill: boolean): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: !fill });
/** İki kutu merkezi arasında, kutu kenarlarında kesilen ok. */
const arrow = (a: V, b: V, trimA: number, trimB: number, on: boolean, dash = false, onTone: Tone = "a"): El => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const d = Math.hypot(dx, dy);
  const ux = dx / d;
  const uy = dy / d;
  return vec(v(a[0] + ux * trimA, a[1] + uy * trimA), v(b[0] - ux * trimB, b[1] - uy * trimB), { tone: on ? onTone : "muted", bold: on, thin: !on, dash });
};

/* ---------- 1 · Beslenme tipi karar ağacı ---------- */

const modeOf = (name: string) => MODE_ROWS217.find((r) => r.name === name || r.name.startsWith(name))!;
const autoLeaves: Mode217[] = ["Fotoototrof", "Kemoototrof"];
const heteroLeaves: Mode217[] = ["Otçul", "Etçil", "Omnivor", "Saprotrof"];
const modeTree: FigureDef = {
  caption: "Adımla bir beslenme tipi seç: önce karbon kaynağı (CO₂ ya da organik madde), sonra ototrofta enerji kaynağı, heterotrofta besinin kaynağı sorulur. Renkli yol seçilen tipin cevaplarıdır; karma beslenmede iki yol birden renklenir.",
  alt: "Soldan girintili bir ağaç: en üstte ‘Karbon kaynağı?’ sorusu; altında önce CO₂ → ototrof dalı ve onun altında fotoototrof ile kemoototrof, sonra organik madde → heterotrof dalı ve onun altında otçul, etçil, omnivor, saprotrof. Seçilen tipe giden dallar renkli.",
  steps: MODE_ROWS217.map((r) => r.name),
  draw: (_value, step) => {
    const row = MODE_ROWS217[step];
    const modes = row.routes.map(routeMode217);
    const onAuto = modes.some((m) => modeGroup217(m) === "ototrof");
    const onHetero = modes.some((m) => modeGroup217(m) === "heterotrof");
    const els: El[] = [txt(v(0, 4.0), "Karbon kaynağı?", "e", { bold: true })];
    const line = (a: V, b: V, on: boolean) => seg(a, b, { tone: on ? "a" : "muted", bold: on, thin: !on });
    const branches: { label: string; on: boolean; y: number; leaves: Mode217[]; ys: number[] }[] = [
      { label: "CO₂ → ototrof", on: onAuto, y: 3.2, leaves: autoLeaves, ys: [2.5, 1.8] },
      { label: "Organik madde → heterotrof", on: onHetero, y: 1.0, leaves: heteroLeaves, ys: [0.3, -0.4, -1.1, -1.8] },
    ];
    els.push(line(v(0.2, 3.7), v(0.2, 1.0), false));
    branches.forEach((b) => {
      els.push(line(v(0.2, b.y), v(0.55, b.y), b.on), txt(v(0.65, b.y), b.label, "e", { bold: true, tone: b.on ? "a" : "ink" }));
      els.push(line(v(0.95, b.y - 0.3), v(0.95, b.ys[b.ys.length - 1]), false));
      b.leaves.forEach((m, i) => {
        const on = modes.includes(m);
        els.push(line(v(0.95, b.ys[i]), v(1.3, b.ys[i]), on), txt(v(1.4, b.ys[i]), modeOf(m).name, "e", { bold: on, tone: on ? "a" : "ink" }));
      });
    });
    if (modes.includes("Heterotrof yol")) els.push(txt(v(1.4, -2.5), "Ortamdaki organik maddeyi alır", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.2, 4.3), " ", "c"), txt(v(4.6, -2.8), " ", "c"));
    return {
      els,
      readout: [
        `${row.name}. Enerji kaynağı: ${low(row.energyText)}. Karbon kaynağı: ${row.carbonText}.`,
        `Örnek: ${row.example}. ${modes.length > 1 ? "İki gruptan da yolu var: karma beslenme." : `${modeGroup217(modes[0]) === "ototrof" ? "Ototrof" : "Heterotrof"}.`}`,
      ],
    };
  },
};

/* ---------- 2 · Besin ağı ve tür çıkarma ---------- */

const POS: Record<Species217, V> = {
  Ot: v(0, -2.6), Çekirge: v(-2.0, -1.0), Fare: v(2.0, -1.0), Kurbağa: v(-2.0, 0.8), Yılan: v(2.6, 0.8), Şahin: v(0, 2.4),
};
const removable = WEB_SPECIES217.filter((s) => foodsOf217(s).length > 0 && WEB_EDGES217.some(([a]) => a === s));
const webSteps: (Species217 | null)[] = [null, ...removable];
const webFigure: FigureDef = {
  caption: "Oklar besinden tüketiciye gider. Adımla bir tür çıkar: kesik oklar silinen ilişkilerdir, turuncu ad besin oku kalmayan tüketicidir. Konumlar şematiktir.",
  alt: `Altı canlılı ağ: altta ot, üstünde solda çekirge ve kurbağa, sağda fare ve yılan, en üstte şahin. ${WEB_EDGES217.length} ok besinden tüketiciye çizili. Çıkarılan türün adı soluk, oklarının çizgisi kesik; besinsiz kalan tür turuncu.`,
  steps: webSteps.map((s) => (s ? `${s} çıkarılırsa` : "Tam ağ")),
  draw: (_value, step) => {
    const removed = webSteps[step];
    const r = removed ? removal217(removed) : null;
    const els: El[] = [];
    WEB_EDGES217.forEach((e) => {
      const lost = r?.lostEdges.includes(e) ?? false;
      els.push(arrow(POS[e[0]], POS[e[1]], 0.45, 0.5, !lost, lost, "b"));
    });
    WEB_SPECIES217.forEach((s) => {
      const gone = s === removed;
      const hungry = r?.foodless.includes(s) ?? false;
      els.push(txt(POS[s], s, "c", { bold: !gone, tone: gone ? "muted" : hungry ? "warn" : "ink" }));
    });
    els.push(txt(v(-3.3, 2.9), " ", "c"), txt(v(3.6, -2.9), " ", "c"));
    if (!r) {
      return { els, readout: [`${WEB_EDGES217.length} ok: ${WEB_EDGES217.map(edgeText217).join(", ")}.`, `${chains217().length} zincir: ${chains217().map(chainText217).join(", ")}.`] };
    }
    return {
      els,
      readout: [
        `Silinen oklar (${r.lostEdges.length}): ${r.lostEdges.map(edgeText217).join(", ")}.`,
        r.foodless.length ? `Besin oku kalmayan: ${r.foodless.join(", ")}.` : "Bütün tüketicilerin en az bir besin oku kalır.",
        `Kalan zincir (${r.remaining.length}): ${r.remaining.length ? r.remaining.map(chainText217).join(", ") : "yok"}.`,
      ],
    };
  },
};

/* ---------- 3 · Yüzde on enerji piramidi ---------- */

const pyramid: FigureDef = {
  caption: `Adımla bir düzey seç: çubuğun yanındaki sayı o düzeye ulaşan enerjidir (${ENERGY_UNIT217}); okuma, bir sonraki düzeye geçmeyen enerjiyi verir. Verim her geçişte %${num217(EFFICIENCY217 * 100)}. Çubuk genişlikleri sıkıştırılmıştır; sayılar kesindir.`,
  alt: "Alttan üste dört yatay çubuk: üretici, birincil, ikincil ve üçüncül tüketici; yukarı çıktıkça daralıyor. Solda düzey numarası, çubuğun yanında enerji değeri. Seçilen düzey renkli.",
  steps: energyLevels217.map((l) => `${l.level}. düzey`),
  draw: (_value, step) => {
    const els: El[] = [];
    energyLevels217.forEach((l, i) => {
      const w = 1.4 + 4.6 * Math.pow(l.energy / PRODUCER_KJ217, 0.22);
      const y = i * 1.1;
      const on = i === step;
      els.push(
        rect(-w / 2, w / 2, y, y + 0.8, on ? "a" : "muted", on),
        txt(v(-3.4, y + 0.4), `${l.level}.`, "w", { small: true, tone: on ? "a" : "muted", bold: on }),
        txt(v(w / 2 + 0.15, y + 0.4), num217(l.energy), "e", { small: true, bold: on }),
      );
    });
    els.push(txt(v(-4.2, 4.7), " ", "c"), txt(v(4.4, -0.3), " ", "c"));
    const l = energyLevels217[step];
    return {
      els,
      readout: [
        `${l.level}. düzey (${low(l.name)}): ${num217(l.energy)} ${ENERGY_UNIT217}, üreticinin %${num217(l.share)}’i.`,
        l.notPassed === null
          ? "Zincirin son düzeyi; bu modelde üstüne geçiş yok."
          : `Sonraki düzeye ${num217(l.notPassed)} geçmez (solunum ısısı, yenmeyen ve sindirilmeyen kısım); ${num217(l.energy - l.notPassed)} geçer.`,
      ],
    };
  },
};

/* ---------- 4 · Azot döngüsü yolu ---------- */

const NODE: Record<string, V> = {
  "N₂": v(0, 2.4),
  "NH₄⁺": v(0, -0.4),
  "bitkideki organik azot": v(-2.8, 0.9),
  "hayvandaki organik azot": v(-2.8, -1.6),
  "NO₂⁻": v(2.8, -1.6),
  "NO₃⁻": v(2.8, 0.9),
};
const NODE_LABEL: Record<string, string> = {
  "N₂": "N₂ (atmosfer)", "NH₄⁺": "NH₄⁺", "bitkideki organik azot": "Bitki: organik N", "hayvandaki organik azot": "Hayvan: organik N", "NO₂⁻": "NO₂⁻", "NO₃⁻": "NO₃⁻",
};
const nitrogenLoop: FigureDef = {
  caption: "Adımla basamakları sırayla izle: renkli ok seçilen süreçtir. Her okun ucu bir sonraki okun başlangıcıdır; yedinci adımda azot N₂’ye döner. NH₄⁺ yola iki kez girer.",
  alt: "Ortada NH₄⁺, üstte atmosferdeki N₂, solda bitkideki ve hayvandaki organik azot, sağda NO₃⁻ ve NO₂⁻. Yedi ok: N₂’den NH₄⁺’e, NH₄⁺’ten bitkiye, bitkiden hayvana, hayvandan NH₄⁺’e, NH₄⁺’ten NO₂⁻’e, NO₂⁻’ten NO₃⁻’e ve NO₃⁻’ten N₂’ye. Seçilen ok renkli.",
  steps: NITROGEN_STEPS217.map((s, i) => `${i + 1}. ${s.process}`),
  draw: (_value, step) => {
    const els: El[] = [];
    NITROGEN_STEPS217.forEach((s, i) => els.push(arrow(NODE[s.from], NODE[s.to], 0.5, 0.55, i === step)));
    const cur = NITROGEN_STEPS217[step];
    Object.entries(NODE).forEach(([k, p]) => {
      const on = k === cur.from || k === cur.to;
      els.push(txt(p, NODE_LABEL[k], "c", { bold: on, tone: on ? "a" : "ink" }));
    });
    els.push(txt(v(-4.3, 2.8), " ", "c"), txt(v(4.0, -2.0), " ", "c"));
    return {
      els,
      readout: [
        `${step + 1}. ${cur.process}: ${cur.from} → ${cur.to}.`,
        `Canlı grubu: ${cur.group}. Yer: ${low(cur.place)}.`,
      ],
    };
  },
};

/* ---------- 5 · Çevre sorunu zinciri ---------- */

const envChain: FigureDef = {
  caption: "Adımla bir sorun seç: kutular yukarıdan aşağı neden → sonuç sırasındadır, en alttaki satır izlenecek göstergedir. Zincir nitel süreç sırasını gösterir; süre ya da miktar tahmini değildir.",
  alt: "Alt alta üç ya da dört kutu ve aralarında aşağı oklar; kutularda seçilen çevre sorununun neden-sonuç halkaları. En altta gösterge yazılı.",
  steps: ISSUES217.map((i) => i.short),
  draw: (_value, step) => {
    const issue = ISSUES217[step];
    const els: El[] = [];
    const n = issue.chain.length;
    issue.chain.forEach((c, i) => {
      const y = (n - 1 - i) * 1.15;
      els.push(rect(-2.9, 2.9, y - 0.38, y + 0.38, i === n - 1 ? "warn" : "a", false), txt(v(0, y), c, "c", { small: true, bold: true }));
      if (i < n - 1) els.push(vec(v(0, y - 0.4), v(0, y - 0.75), { tone: "a" }));
    });
    els.push(txt(v(0, -0.95), `Gösterge: ${low(issue.indicator)}`, "c", { small: true, tone: "b" }));
    els.push(txt(v(-3.1, 3 * 1.15 + 0.5), " ", "c"), txt(v(3.1, -1.3), " ", "c"));
    return {
      els,
      readout: [`${issue.name}. Kaynak: ${low(issue.source)}.`, `Etki: ${low(issue.effect)}.`],
    };
  },
};

/* ---------- 6 · Kaynak defteri çubukları ---------- */

const flowMax = Math.max(...RESOURCES217.flatMap((r) => [r.inflow, r.outflow].map((fs) => fs.reduce((s, f) => s + f.amount, 0))));
const SEG_TONES: Tone[] = ["a", "b", "warn"];
const ledger: FigureDef = {
  caption: "Adımla bir kaynak seç: üst çubuk girişler, alt çubuk çıkışlardır; bütün adımlarda ölçek aynıdır. Çıkış çubuğu girişten uzunsa stok azalır. Sayılar temsilî modeldir.",
  alt: "İki yatay çubuk: üstte giriş (tek parça), altta çıkış (bir ya da iki parça, ör. pompaj ve doğal boşalım). Parçaların üstünde miktarlar, sağda toplamlar; altta net değişim yazılı.",
  steps: RESOURCES217.map((r) => r.name),
  draw: (_value, step) => {
    const r = RESOURCES217[step];
    const L = 6.2;
    const els: El[] = [seg(v(0, -1.9), v(0, 1.3), { tone: "muted", thin: true })];
    const bar = (fs: typeof r.inflow, y: number, title: string, base: Tone) => {
      let x = 0;
      els.push(txt(v(-0.15, y), title, "w", { small: true, bold: true }));
      fs.forEach((f, i) => {
        const w = (f.amount / flowMax) * L;
        if (w > 0) els.push(rect(x, x + w, y - 0.3, y + 0.3, i === 0 ? base : SEG_TONES[i % SEG_TONES.length], true), txt(v(x + w / 2, y + 0.55), `${num217(f.amount)} ${f.label}`, "c", { small: true }));
        else els.push(txt(v(0.15, y + 0.55), `${num217(f.amount)} ${f.label}`, "e", { small: true }));
        x += w;
      });
      els.push(txt(v(x + 0.15, y), num217(fs.reduce((s, f) => s + f.amount, 0)), "e", { small: true, bold: true }));
    };
    bar(r.inflow, 0.4, "Giriş", "c");
    bar(r.outflow, -1.0, "Çıkış", "a");
    const net = net217(r);
    els.push(txt(v(L / 2, -1.85), `Net ${signed217(net)} ${r.unit}`, "c", { small: true, bold: true, tone: net < 0 ? "warn" : "b" }));
    els.push(txt(v(-1.4, 1.4), " ", "c"), txt(v(L + 0.9, -2.1), " ", "c"));
    return {
      els,
      readout: [
        `${r.name}, ${r.cls}: giriş ${num217(r.inflow.reduce((s, f) => s + f.amount, 0))}, çıkış ${num217(r.outflow.reduce((s, f) => s + f.amount, 0))} → net ${signed217(net)} ${r.unit}.`,
        `${r.note.charAt(0).toLocaleUpperCase("tr-TR") + r.note.slice(1)}.`,
      ],
    };
  },
};

export const depthFigures217: Record<string, Record<string, FigureDef>> = {
  "ekoloji-giris": { [modeSection217.title]: modeTree },
  "besin-zinciri-agi": { [webSection217.title]: webFigure },
  "besin-piramidi": { [pyramidSection217.title]: pyramid },
  "madde-donguleri": { [cycleSection217.title]: nitrogenLoop },
  "guncel-cevre-sorunlari": { [envSection217.title]: envChain },
  "dogal-kaynaklar-surdurulebilirlik": { [ledgerSection217.title]: ledger },
};
