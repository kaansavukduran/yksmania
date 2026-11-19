import { useEffect, useId, useRef, useState } from "react";
import { useExploration } from "./useExploration";
import { buildHumanitiesScene020, humanitiesDefaults020, type HumanitiesScene020 } from "./forge020Humanities";
import "./forge020Humanities.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

function Drawing020({ scene, selected, uid }: { scene: HumanitiesScene020; selected: number; uid: string }) {
  const ref = useRef<HTMLDivElement>(null), [width, setWidth] = useState(270);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(1, entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const fontSize = Math.max(40, 17 * 640 / width);
  if (scene.allocation) {
    const a = scene.allocation;
    return <div ref={ref} className="humanities020-drawing"><svg viewBox="0 0 640 210" role="img" aria-labelledby={`${uid}-svg-title ${uid}-svg-desc`}>
      <title id={`${uid}-svg-title`}>A ve B için verilen pay ve ihtiyaç</title>
      <desc id={`${uid}-svg-desc`}>A için {a.a} parça, ihtiyaç {a.needA}; B için {a.b} parça, ihtiyaç {a.needB}. Her küçük bölüm bir parçadır; kesik çizgi ihtiyaç sınırını gösterir.</desc>
      {[{ id: "a", name: "A", given: a.a, need: a.needA }, { id: "b", name: "B", given: a.b, need: a.needB }].map((row, i) => <g key={row.id} transform={`translate(0 ${i * 100})`} data-allocation={row.id} data-given={row.given} data-need={row.need}>
        <rect x="12" y="15" width="215" height="60" rx="8" fill="var(--surface)" stroke="var(--muted)" />
        <text x="24" y="45" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{row.name}: {row.given} / {row.need}</text>
        {Array.from({ length: 12 }, (_, index) => <rect key={index} data-part={index} data-filled={index < row.given} x={250 + index * 28} y="22" width="25" height="46" fill={index < row.given ? "var(--accent)" : "var(--surface-2)"} stroke="var(--muted)" />)}
        <path d={`M${250 + row.need * 28 - 2} 8 V84`} fill="none" stroke="var(--text)" strokeWidth="4" strokeDasharray="7 5" />
      </g>)}
    </svg></div>;
  }
  if (scene.science) return <div ref={ref} className="humanities020-drawing"><svg viewBox="0 0 640 420" role="img" aria-labelledby={`${uid}-svg-title ${uid}-svg-desc`}>
    <title id={`${uid}-svg-title`}>İki etkenli kurgu verinin dört koşulu</title>
    <desc id={`${uid}-svg-desc`}>Her kutuda sıcaklık ve nem koşulu, ölçülen sonuç ve seçili varsayımın öngörüsü gösterilir. Veri yok ifadesi o koşulun henüz ölçülmediğini belirtir.</desc>
    {scene.science.rows.map((row, i) => <g key={i} transform={`translate(${(i % 2) * 310} ${Math.floor(i / 2) * 210})`} data-science-row={i} data-observed={row.observed ?? "missing"} data-prediction={row.prediction}>
      <rect x="10" y="10" width="290" height="180" rx="8" fill="var(--surface)" stroke={row.observed !== null && row.observed !== row.prediction ? "var(--danger)" : "var(--muted)"} strokeWidth="3" />
      <text x="25" y="50" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{row.heat ? "Sıcak" : "Soğuk"}</text>
      <text x="25" y="100" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{row.damp ? "Nemli" : "Kuru"}</text>
      <text x="25" y="150" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{row.observed === null ? "Yok" : row.observed} / {row.prediction}</text>
    </g>)}
  </svg></div>;
  return <div ref={ref} className="humanities020-drawing"><svg viewBox={`0 0 640 ${scene.nodes.length * 88 + 20}`} role="img" aria-labelledby={`${uid}-svg-title ${uid}-svg-desc`}>
    <title id={`${uid}-svg-title`}>{scene.kind === "logic" ? "Hazır bahçe modelinde ıslatan etkenler" : scene.kind === "ontology" ? "Bağımsız temeller ve açıklanan durumlar" : scene.kind === "knowledge" ? "Edinme veya denetim yönü" : "Eylemin bilgi, seçim ve gerekçe koşulları"}</title>
    <desc id={`${uid}-svg-desc`}>{scene.nodes.map((node, i) => `${i + 1}. ${node.label}: ${node.text}`).join("; ")}. {scene.links.map(link => `${scene.nodes[link.from].label} → ${scene.nodes[link.to].label}: ${link.label}`).join("; ")}</desc>
    <defs><marker id={`${uid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto-start-reverse"><path d="M0 0 L8 4 L0 8Z" fill="currentColor" /></marker></defs>
    {scene.links.map((link, i) => <path key={i} data-relation={`${link.from}-${link.to}`} d={`M164 ${link.from * 88 + 45} H${20 + i * 17} V${link.to * 88 + 45} H162`} fill="none" stroke="currentColor" strokeWidth={link.from === selected || link.to === selected ? 3.5 : 1.8} markerEnd={`url(#${uid}-arrow)`} />)}
    {scene.nodes.map((node, i) => <g key={i} transform={`translate(0 ${i * 88})`} data-svg-node={i} data-selected={i === selected} data-foundation={Boolean(node.root)} data-active={node.active}>
      <rect x="164" y="15" width="450" height="60" rx="9" fill="var(--surface)" stroke={selected === i || node.root ? "var(--accent)" : "var(--muted)"} strokeWidth={selected === i || node.root ? 3 : 1.5} />
      <text x="182" y="45" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{node.label}</text>
    </g>)}
  </svg></div>;
}
export default function Forge020HumanitiesLab({ lessonId }: { lessonId: string }) {
  const uid = useId(), [saved, set] = useExploration(`forge020-humanities:${lessonId}`, humanitiesDefaults020);
  const pick = (key: keyof typeof saved, allowed: string[], fallback: string) => allowed.includes(String(saved[key])) ? String(saved[key]) : fallback;
  const values = { ...saved,
    criterion: pick("criterion", ["equal", "need"], "equal"), angle: pick("angle", ["apply", "grounds"], "apply"),
    rule: pick("rule", ["direct", "reverse"], "direct"), foundation: pick("foundation", ["material", "dual", "idea"], "material"),
    question: pick("question", ["source", "criterion"], "source"), test: pick("test", ["world", "system", "consensus", "clear", "work"], "world"),
    data: pick("data", ["paired", "crossed"], "paired"), hypothesis: pick("hypothesis", ["heat", "damp"], "heat"),
    motive: pick("motive", ["duty", "outcome", "virtue"], "duty"), condition: pick("condition", ["free", "hidden", "threat"], "free"),
  };
  const scene = buildHumanitiesScene020(lessonId, values), selected = Number.isInteger(saved.selected) && saved.selected >= 0 && saved.selected < scene.nodes.length ? saved.selected : 0;
  const guess = scene.options.includes(saved.guess) ? saved.guess : "", reason = saved.reason.slice(0, 120), compared = saved.compared && Boolean(guess && reason.trim()), revealed = saved.show || compared;
  const change = (patch: Parameters<typeof set>[0]) => set({ ...patch, guess: "", reason: "", compared: false, show: false, selected: 0 });
  const select = (key: keyof typeof values, label: string, options: [string, string][]) => <div key={key}>
    <label htmlFor={`${uid}-${key}`}>{label}</label><ChoiceSelect id={`${uid}-${key}`} value={String(values[key])} onChange={event => change({ [key]: event.target.value })}>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</ChoiceSelect>
    <p className="humanities020-selected">Seçili: <strong>{options.find(([value]) => value === values[key])?.[1]}</strong></p>
  </div>;
  return <section className="humanities020-lab" data-forge020={lessonId}>
    <h3>{scene.kind === "allocation" ? "Ölçütü değiştir, payı izle" : scene.kind === "logic" ? "Karşı modeli kendin kur" : scene.kind === "ontology" ? "Varlığın temelini izle" : scene.kind === "knowledge" ? "Kaynak ile ölçütü ayır" : scene.kind === "science" ? "İki savı veriyle ayır" : "Eylemi ve niyeti ayır"}</h3>
    <p>Önce tam olayı oku. Bir koşulu değiştir; şemada neyin neden değiştiğini kendi sözlerinle açıkla.</p>
    <div className="humanities020-controls">
      {scene.kind === "allocation" && <>{select("criterion", "Adalet ölçütü", [["equal", "Aynı pay"], ["need", "İhtiyaca göre"]])}{select("angle", "Sorunun odağı", [["apply", "Payı hesapla"], ["grounds", "Ölçütü sorgula"]])}</>}
      {scene.kind === "logic" && <>{select("rule", "Çıkarım yönü", [["direct", "Doğru yön"], ["reverse", "Ters yön"]])}<label className="humanities020-check"><input type="checkbox" checked={values.rain} onChange={event => change({ rain: event.target.checked })} /> Yağmur var</label><label className="humanities020-check"><input type="checkbox" checked={values.sprinkler} onChange={event => change({ sprinkler: event.target.checked })} /> Fıskiye açık</label></>}
      {scene.kind === "ontology" && select("foundation", "Kabul edilen temel", [["material", "Madde tek"], ["dual", "Madde ve zihin"], ["idea", "İdea tek"]])}
      {scene.kind === "knowledge" && <>{select("question", "Soru", [["source", "Kaynak"], ["criterion", "Ölçüt"]])}{values.question === "criterion" && select("test", "Denetim", [["world", "Olgu"], ["system", "Sistem"], ["consensus", "Ortak kabul"], ["clear", "Açık kavrayış"], ["work", "İşe yarama"]])}</>}
      {scene.kind === "science" && <>{select("data", "Veri düzeni", [["paired", "İki koşul"], ["crossed", "Dört koşul"]])}{select("hypothesis", "Varsayım", [["heat", "Sıcaklık"], ["damp", "Nem"]])}</>}
      {scene.kind === "ethics" && <>{select("motive", "Gerekçe", [["duty", "Ödev"], ["outcome", "Sonuç"], ["virtue", "Erdem"]])}{select("condition", "Bilgi ve seçim", [["free", "Açık bilgi"], ["hidden", "Gizli bilgi"], ["threat", "Baskı"]])}</>}
    </div>
    <div className="humanities020-model">
      <p>{scene.context}</p><p className="humanities020-question"><strong>{scene.question}</strong></p>
      <Drawing020 scene={scene} selected={selected} uid={uid} />
      {scene.allocation && <p>Şema pay / ihtiyaç gösterir. Her küçük bölüm bir parça, kesik çizgi ihtiyaç sınırıdır.</p>}
      {scene.science && <><p>Sol sayı ölçülen sonuç; sağ sayı öngörüdür. Yok, o koşulda henüz veri olmadığı anlamına gelir.</p><ul className="humanities020-data">{scene.science.rows.map((row, i) => <li key={i} data-observation={i}>{row.heat ? "Sıcak" : "Soğuk"}, {row.damp ? "nemli" : "kuru"}: ölçüm {row.observed ?? "yok"}; öngörü {row.prediction}.</li>)}</ul></>}
      {scene.logic && <div className="humanities020-truth" aria-label="Dört mümkün durum">{scene.logic.rows.map((row, i) => <div key={i} data-truth-row={i} data-counter={row.counter} data-current={i === scene.logic!.actual}>
        <p><strong>Durum {i + 1}</strong>{i === scene.logic!.actual ? " — seçili" : ""}</p><p>Yağmur: {row.rain ? "var" : "yok"}. Fıskiye: {row.sprinkler ? "açık" : "kapalı"}. Zemin: {row.wet ? "ıslak" : "kuru"}.</p><p>Öncüller: {row.premises ? "doğru" : "tümü doğru değil"}. Sonuç: {row.conclusion ? "doğru" : "yanlış"}.</p><p>{row.counter ? "Bu satır karşı modeldir." : "Bu satır karşı model değil."}</p>
      </div>)}</div>}
      <div className="humanities020-nodes">{scene.nodes.map((node, i) => <div key={i} data-node={i} data-selected={i === selected}><p><strong>{node.label}</strong>{node.root ? " — bağımsız temel" : ""}</p><p>{node.text}</p></div>)}</div>
      {!(scene.allocation || scene.science) && <><p>Bir parçaya dokun; ona bağlı okları izle.</p><div className="humanities020-node-actions">{scene.nodes.map((node, i) => <button key={i} type="button" className="secondary" aria-pressed={i === selected} data-node-button={i} onClick={() => set({ selected: i })}>{node.label}</button>)}</div><ul>{scene.links.map((link, i) => <li key={i}>{scene.nodes[link.from].label} → {scene.nodes[link.to].label}: {link.label}.</li>)}</ul></>}
    </div>
    <fieldset><legend>Bağlamdan karar ver</legend><label htmlFor={`${uid}-guess`}>Tahminin</label><ChoiceSelect id={`${uid}-guess`} value={guess} onChange={event => set({ guess: event.target.value, compared: false })}><option value="">Bir karar seç</option>{scene.options.map(option => <option key={option} value={option}>{option}</option>)}</ChoiceSelect><p className="humanities020-selected">Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong></p>
      <label htmlFor={`${uid}-reason`}>Gerekçen</label><textarea id={`${uid}-reason`} rows={3} maxLength={120} value={reason} onChange={event => set({ reason: event.target.value.slice(0, 120), compared: false })} />
      <button className="secondary humanities020-compare" type="button" disabled={!guess || !reason.trim()} onClick={() => set({ compared: true })}>Tahminimi karşılaştır</button>
      {compared && <div className="humanities020-feedback" role="status"><p><strong>{guess === scene.decision ? "Seçimin bu bağlamla uyumlu." : "Seçimini kanıtla yeniden denetle."}</strong></p><p>Gerekçene otomatik puan verilmez. Kendi sözünü kanıtla karşılaştır.</p></div>}
    </fieldset>
    <button className="secondary" type="button" aria-expanded={revealed} aria-controls={`${uid}-result`} onClick={() => set({ show: !revealed, compared: false })}>Kanıtı {revealed ? "gizle" : "göster"}</button>
    <div id={`${uid}-result`} className="humanities020-result" data-model-result aria-live="polite">{revealed ? <><p><strong>{scene.decision}</strong></p><p>{scene.reason}</p><ul>{scene.evidence.map((line, i) => <li key={i}>{line}</li>)}</ul></> : <p>Tahminini ve gerekçeni yaz; sonra kanıtı aç.</p>}</div>
    <p>Bu keşif puan veya konu tamamlama kaydı üretmez. Yeni bir örnekte aynı bağı kendi sözlerinle kur.</p>
  </section>;
}
