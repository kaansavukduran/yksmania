import { useEffect, useId, useRef, useState } from "react";
import { useExploration } from "./useExploration";
import { buildHumanitiesScene021, humanitiesDefaults021, type HumanitiesScene021 } from "./forge021Humanities";
import "./forge021Humanities.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

function Drawing021({ scene, selected, uid }: { scene: HumanitiesScene021; selected: number; uid: string }) {
 const ref = useRef<HTMLDivElement>(null), [width, setWidth] = useState(270);
 useEffect(() => {
  const element = ref.current;
  if (!element) return;
  const observer = new ResizeObserver(([entry]) => setWidth(Math.max(1, entry.contentRect.width)));
  observer.observe(element); return () => observer.disconnect();
 }, []);
 const fontSize = Math.max(40, 17 * 640 / width);
 return <div ref={ref} className="humanities021-drawing">
  {scene.art && <svg viewBox="0 0 640 270" role="img" aria-label="Bu uygulama için çizilmiş özgün ağaç. Eğri veya keskin çizgiler seçime göre değişir." data-art-lens={scene.art.lens} data-art-form={scene.art.tense ? "tense" : "calm"}>
   <rect x="8" y="8" width="624" height="254" rx="12" fill="var(--surface)" stroke="var(--muted)" />
   <path d="M40 228 H600" stroke="var(--text)" strokeWidth="4" />
   <path data-art-trunk d="M310 228 V125 M310 165 L268 130 M310 153 L355 116" stroke="var(--text)" fill="none" strokeWidth="10" />
   <path data-art-canopy d={scene.art.tense ? "M190 145 L232 75 L260 98 L302 30 L332 83 L370 44 L408 137 L353 155 L310 132 L247 167 Z" : "M193 138 C166 78 246 30 291 60 C339 3 428 65 398 131 C376 177 326 163 306 153 C252 184 216 174 193 138 Z"} fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="6" />
  </svg>}
  {scene.cave && <svg viewBox="0 0 640 260" role="img" aria-label="Gölge, nesne ve dışarı yönüyle sade mağara çizimi; seçilen hedef vurgulanır." data-cave-stage={scene.cave.stage}>
   <path d="M10 230 V75 Q200 -35 430 75 V230 Z" fill="var(--surface)" stroke="var(--muted)" strokeWidth="5" />
   <path d="M430 75 L630 20 V230 H430" fill="var(--surface-2)" stroke={scene.cave.target === 3 ? "var(--accent)" : "var(--muted)"} strokeWidth="5" />
   <path data-cave-shadow d="M42 224 V132 L63 103 L84 132 V224Z" fill="var(--muted)" stroke={scene.cave.target === 1 ? "var(--accent)" : "var(--text)"} strokeWidth="5" />
   <path data-cave-object d="M278 224 V145 L300 123 L322 145 V224Z" fill="var(--surface-2)" stroke={scene.cave.target === 2 ? "var(--accent)" : "var(--text)"} strokeWidth="6" />
   <circle cx="173" cy="160" r="14" fill="var(--text)" /><path d="M173 174 V218 M153 230 L173 205 L193 230" stroke="var(--text)" strokeWidth="7" fill="none" />
   <path data-cave-gaze d={`M175 157 L${[63, 300, 542][scene.cave.target - 1]} ${[130, 140, 110][scene.cave.target - 1]}`} stroke="var(--accent)" strokeWidth="5" markerEnd={`url(#${uid}-gaze)`} />
   <defs><marker id={`${uid}-gaze`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="var(--accent)" /></marker></defs>
  </svg>}
  <svg viewBox={`0 0 640 ${scene.nodes.length * 88 + 20}`} role="img" aria-labelledby={`${uid}-svg-title ${uid}-svg-desc`} data-argument-map>
   <title id={`${uid}-svg-title`}>{scene.title}</title><desc id={`${uid}-svg-desc`}>{scene.nodes.map((n, i) => `${i + 1}. ${n.label}: ${n.text}`).join("; ")}. {scene.links.map(l => `${scene.nodes[l.from].label} → ${scene.nodes[l.to].label}: ${l.label}`).join("; ")}</desc>
   <defs><marker id={`${uid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="currentColor" /></marker></defs>
   {scene.links.map((l, i) => <path key={`${l.from}-${l.to}`} data-relation={`${l.from}-${l.to}`} data-active={l.active !== false} data-focused={Boolean(l.focused)} d={`M164 ${l.from * 88 + 45} H${20 + i * 17} V${l.to * 88 + 45} H162`} fill="none" stroke="currentColor" strokeWidth={l.focused || l.from === selected || l.to === selected ? 3.5 : 1.8} strokeDasharray={l.active === false ? "8 6" : undefined} markerEnd={`url(#${uid}-arrow)`} />)}
   {scene.nodes.map((n, i) => <g key={i} transform={`translate(0 ${i * 88})`} data-svg-node={i} data-selected={selected === i} data-active={n.active} data-root={n.root}>
    <rect x="164" y="15" width="450" height="60" rx="9" fill="var(--surface)" stroke={selected === i || n.root ? "var(--accent)" : "var(--muted)"} strokeWidth={selected === i || n.root ? 3 : 1.5} />
    <text x="182" y="45" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{n.label}</text>
   </g>)}
  </svg>
 </div>;
}
export default function Forge021HumanitiesLab({ lessonId }: { lessonId: string }) {
 const uid = useId(), [saved, set] = useExploration(`forge021-humanities:${lessonId}`, humanitiesDefaults021);
 const pick = (key: keyof typeof saved, allowed: string[], fallback: string) => allowed.includes(String(saved[key])) ? String(saved[key]) : fallback;
 const values = { ...saved, argument: pick("argument", ["concept", "cause", "order"], "cause"), claim: pick("claim", ["limited", "rich"], "limited"),
  focus: pick("focus", ["force", "law", "justify"], "justify"), lens: pick("lens", ["world", "artist", "form", "viewer"], "world"), form: pick("form", ["calm", "tense"], "calm"),
  scope: pick("scope", ["some", "all"], "all"), evidence: pick("evidence", ["one", "all"], "one"), stage: pick("stage", ["shadow", "object", "outside"], "shadow"), universal: pick("universal", ["separate", "in", "mind", "name"], "separate") };
 const scene = buildHumanitiesScene021(lessonId, values), selected = Number.isInteger(saved.selected) && saved.selected >= 0 && saved.selected < scene.nodes.length ? saved.selected : 0;
 const guess = scene.options.includes(saved.guess) ? saved.guess : "", reason = saved.reason.slice(0, 120), compared = saved.compared && Boolean(guess && reason.trim()), revealed = saved.show || compared;
 const change = (patch: Parameters<typeof set>[0]) => set({ ...patch, guess: "", reason: "", compared: false, show: false, selected: 0 });
 const select = (key: keyof typeof values, label: string, options: [string, string][]) => <div key={key}><label htmlFor={`${uid}-${key}`}>{label}</label><ChoiceSelect id={`${uid}-${key}`} value={String(values[key])} onChange={e => change({ [key]: e.target.value })}>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</ChoiceSelect><p className="humanities021-selected">Seçili: <strong>{options.find(([value]) => value === values[key])?.[1]}</strong></p></div>;
 const check = (key: "bridge" | "power" | "law" | "rights", label: string) => <label className="humanities021-check"><input type="checkbox" checked={values[key]} onChange={e => change({ [key]: e.target.checked })} />{label}</label>;
 return <section className="humanities021-lab" data-forge021={lessonId}>
  <h3>{scene.title}</h3><p>Önce tam olayı oku. Bir koşulu değiştir; okların ve yorumun neden değiştiğini kendi sözlerinle açıkla.</p>
  <div className="humanities021-controls">
   {scene.kind === "religion" && <>{select("argument", "Argümanın başlangıcı", [["concept", "Kavram"], ["cause", "Neden"], ["order", "Düzen"]])}{select("claim", "Sonucun kapsamı", [["limited", "İlk sonuç"], ["rich", "Ek nitelikli sav"]])}{values.claim === "rich" && check("bridge", "Ek nitelik için öncül var")}</>}
   {scene.kind === "politics" && <>{select("focus", "Sorunun odağı", [["force", "Uygulama gücü"], ["law", "Mevcut usul"], ["justify", "Haklılık gerekçesi"]])}{check("power", "Uygulama aracı var")}{check("law", "Usule uygun")}{check("rights", "Hak gerekçesi açık")}</>}
   {scene.kind === "art" && <>{select("lens", "İnceleme odağı", [["world", "Dünya ve eser"], ["artist", "Sanatçı ve eser"], ["form", "Biçim düzeni"], ["viewer", "Eser ve izleyici"]])}{select("form", "Çizgi düzeni", [["calm", "Eğriler"], ["tense", "Keskin açılar"]])}</>}
   {scene.kind === "reading" && <>{select("scope", "Savın kapsamı", [["some", "En az bir kişi"], ["all", "Beş kişinin tümü"]])}{select("evidence", "Verilen kayıt", [["one", "Yalnız Ece"], ["all", "Beş kişi"]])}</>}
   {scene.kind === "ancient" && select("stage", "Bakış yönü", [["shadow", "Gölge"], ["object", "Nesne"], ["outside", "Dışarı"]])}
   {scene.kind === "medieval" && select("universal", "Tümelin statüsü", [["separate", "Ayrı gerçeklik"], ["in", "Tekilde ortak form"], ["mind", "Zihinsel kavram"], ["name", "Ortak ad"]])}
  </div>
  <div className="humanities021-model"><p>{scene.context}</p><p><strong>{scene.question}</strong></p><Drawing021 scene={scene} selected={selected} uid={uid} />
   <div className="humanities021-nodes">{scene.nodes.map((n, i) => <div key={i} data-node={i} data-selected={selected === i} data-active={n.active}><p><strong>{n.label}</strong></p><p>{n.text}</p></div>)}</div>
   <p>Bir parçayı seç; ilgili okları izle. Kesik ok: bu bağ için dayanak verilmedi.</p>
   <div className="humanities021-node-actions">{scene.nodes.map((n, i) => <button key={i} className="secondary" type="button" aria-pressed={selected === i} data-node-button={i} onClick={() => set({ selected: i })}>{n.label}</button>)}</div>
   <ul>{scene.links.map((l, i) => <li key={i}>{scene.nodes[l.from].label} → {scene.nodes[l.to].label}: {l.label}{l.active === false ? " — bu bağ açık değil" : ""}.</li>)}</ul>
  </div>
  <fieldset><legend>Bağlamdan karar ver</legend><label htmlFor={`${uid}-guess`}>Tahminin</label><ChoiceSelect id={`${uid}-guess`} value={guess} onChange={e => set({ guess: e.target.value, compared: false })}><option value="">Bir karar seç</option>{scene.options.map(v => <option key={v} value={v}>{v}</option>)}</ChoiceSelect><p className="humanities021-selected">Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong></p>
   <label htmlFor={`${uid}-reason`}>Gerekçen</label><textarea id={`${uid}-reason`} value={reason} rows={3} maxLength={120} onChange={e => set({ reason: e.target.value.slice(0, 120), compared: false })} />
   <button className="secondary humanities021-compare" type="button" disabled={!guess || !reason.trim()} onClick={() => set({ compared: true })}>Tahminimi karşılaştır</button>
   {compared && <div className="humanities021-feedback" role="status"><p><strong>{guess === scene.decision ? "Seçimin bu bağlamla uyumlu." : "Seçimini kanıtla yeniden denetle."}</strong></p><p>Gerekçene otomatik puan verilmez. Kendi sözünü kanıtla karşılaştır.</p></div>}
  </fieldset>
  <button className="secondary" type="button" aria-expanded={revealed} aria-controls={`${uid}-result`} onClick={() => set({ show: !revealed, compared: false })}>Kanıtı {revealed ? "gizle" : "göster"}</button>
  <div id={`${uid}-result`} className="humanities021-result" data-model-result aria-live="polite">{revealed ? <><p><strong>{scene.decision}</strong></p><p>{scene.reason}</p><ul>{scene.evidence.map((line, i) => <li key={i}>{line}</li>)}</ul></> : <p>Tahminini ve gerekçeni yaz; sonra kanıtı aç.</p>}</div>
  <p>Bu keşif puan veya konu tamamlama kaydı üretmez. Yeni bir örnekte aynı bağı kendi sözlerinle kur.</p>
 </section>;
}
