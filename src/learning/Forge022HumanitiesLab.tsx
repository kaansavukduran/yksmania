import { useEffect, useId, useRef, useState } from "react";
import { useExploration } from "./useExploration";
import { buildHumanitiesScene022, humanitiesDefaults022, type HumanitiesScene022 } from "./forge022Humanities";
import "./forge022Humanities.css";

function Drawing022({ scene, selected, uid }: { scene: HumanitiesScene022; selected: number; uid: string }) {
 const ref = useRef<HTMLDivElement>(null), [width, setWidth] = useState(270);
 useEffect(() => {
  const element = ref.current; if (!element) return;
  const observer = new ResizeObserver(([entry]) => setWidth(Math.max(1, entry.contentRect.width)));
  observer.observe(element); return () => observer.disconnect();
 }, []);
 const fontSize = Math.max(40, 17 * 640 / width);
 return <div ref={ref} className="humanities022-drawing">
  {scene.story && <svg viewBox="0 0 640 240" role="img" aria-label={scene.story.mode === "story" ? "Atölye kapısı olay aşamasına göre açılır; kedi son aşamada dışarıdadır." : scene.story.mode === "portrait" ? "Aynı kapının renk, çizik ve dokusuna yönelen üç sabit işaret." : scene.story.mode === "explain" ? "Açık hava girişinden çıkışa giden akış yolu." : "Karşı savdan gerekçeye, gerekçeden öneriye yönelen bağlar."} data-story-mode={scene.story.mode} data-story-stage={scene.story.stage}>
   <rect x="12" y="12" width="616" height="216" rx="12" fill="var(--surface)" stroke="var(--muted)" />
   <path d="M35 202 H605" fill="none" stroke="var(--text)" strokeWidth="4" />
   <path d="M225 200 V42 H380 V200" fill="none" stroke="var(--text)" strokeWidth="5" />
   <path data-door d={scene.story.mode === "story" && scene.story.stage >= 1 ? "M232 47 L297 69 V190 L232 198Z" : "M232 47 H373 V198 H232Z"} fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="5" />
   {scene.story.mode === "story" && <g data-cat-outside={scene.story.stage === 2} transform={`translate(${scene.story.stage === 2 ? 480 : 315} 175)`}><path d="M-20 18 V-9 L-13 -21 L0 -11 L13 -21 L20 -9 V18Z" fill="var(--surface-2)" stroke="var(--text)" strokeWidth="4" /><path d="M20 15 Q43 0 39 -10" fill="none" stroke="var(--text)" strokeWidth="4" /></g>}
   {scene.story.mode === "portrait" && <g stroke="var(--accent)" strokeWidth="5" fill="none"><path d="M102 70 H230 M510 111 H335 M123 166 H230" /><circle cx="312" cy="110" r="18" /><path d="M303 108 l15 -8" /></g>}
   {scene.story.mode === "explain" && <g fill="none" stroke="var(--accent)" strokeWidth="6"><path data-air-flow d="M50 152 H200 Q270 120 320 120 H572" markerEnd={`url(#${uid}-air)`} /><path d="M80 126 H160 M400 94 H490" /></g>}
   {scene.story.mode === "argue" && <g fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="4"><circle cx="85" cy="105" r="24" /><circle cx="510" cy="75" r="24" /><circle cx="550" cy="163" r="24" /><path d="M110 105 H188 M404 89 H480 M530 104 L543 137" fill="none" /></g>}
   <defs><marker id={`${uid}-air`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="var(--accent)" /></marker></defs>
  </svg>}
  {scene.sample && <div className="humanities022-samples" aria-label="Örnek grubunun kayıtları">{scene.sample.map(row => <div key={row.name} data-sample={row.name} data-status={row.status}><span className="humanities022-color" aria-hidden="true" /><strong>{row.name}</strong><p>{row.status === "yes" ? "Kırmızı" : row.status === "no" ? "Mavi" : "Bilinmiyor"}</p></div>)}</div>}
  {scene.documents && <div className="humanities022-documents">{scene.documents.map(d => <div key={d.label} data-document={d.label} data-selected={d.selected}><p><strong>{d.label} nüshası</strong></p><p>{d.text}</p></div>)}</div>}
  {scene.gates && <div className="humanities022-gates">{scene.gates.map(g => <div key={g.label} data-gate={g.label} data-open={g.open}><strong>{g.label}</strong><p>{g.open ? "Yol açık" : "Yol kapalı"}</p></div>)}</div>}
  {scene.powers && <div className="humanities022-powers">{scene.powers.map(p => <div key={p.role} data-power={p.role} data-holder={p.holder}><strong>{p.role}</strong><p>{p.holder}</p></div>)}</div>}
  <svg viewBox={`0 0 640 ${scene.nodes.length * 88 + 20}`} role="img" aria-labelledby={`${uid}-svg-title ${uid}-svg-desc`} data-argument-map>
   <title id={`${uid}-svg-title`}>{scene.title}</title><desc id={`${uid}-svg-desc`}>{scene.nodes.map(n => `${n.label}: ${n.text}`).join("; ")}. {scene.links.map(l => `${scene.nodes[l.from].label} → ${scene.nodes[l.to].label}: ${l.label}${l.active === false ? ", dayanak açık değil" : ""}`).join("; ")}</desc>
   <defs><marker id={`${uid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="currentColor" /></marker></defs>
   {scene.links.map((l, i) => <path key={`${l.from}-${l.to}`} data-relation={`${l.from}-${l.to}`} data-active={l.active !== false} d={`M164 ${l.from * 88 + 45} H${20 + i * 17} V${l.to * 88 + 45} H162`} fill="none" stroke="currentColor" strokeWidth={l.from === selected || l.to === selected ? 3.5 : 1.8} strokeDasharray={l.active === false ? "8 6" : undefined} markerEnd={`url(#${uid}-arrow)`} />)}
   {scene.nodes.map((n, i) => <g key={i} transform={`translate(0 ${i * 88})`} data-svg-node={i} data-selected={selected === i} data-active={n.active}>
    <rect x="164" y="15" width="450" height="60" rx="9" fill="var(--surface)" stroke={selected === i ? "var(--accent)" : "var(--muted)"} strokeWidth={selected === i ? 3 : 1.5} />
    <text x="182" y="45" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{n.label}</text>
   </g>)}
  </svg>
 </div>;
}
export default function Forge022HumanitiesLab({ lessonId }: { lessonId: string }) {
 const uid = useId(), [saved, set] = useExploration(`forge022-humanities:${lessonId}`, humanitiesDefaults022);
 const pick = (key: keyof typeof saved, allowed: string[], fallback: string) => allowed.includes(String(saved[key])) ? String(saved[key]) : fallback;
 const values = { ...saved,
  mode: pick("mode", ["story", "portrait", "explain", "argue"], "story"), stage: Number.isInteger(saved.stage) && saved.stage >= 0 && saved.stage <= 2 ? saved.stage : 0,
  manuscript: pick("manuscript", ["some", "all"], "some"), reading: pick("reading", ["some", "all"], "all"),
  powers: pick("powers", ["single", "separate"], "separate"), quantifier: pick("quantifier", ["all", "some"], "all"), record: pick("record", ["one", "counter", "all"], "one"), route: pick("route", ["sense", "report", "inference"], "sense") };
 const scene = buildHumanitiesScene022(lessonId, values), selected = Number.isInteger(saved.selected) && saved.selected >= 0 && saved.selected < scene.nodes.length ? saved.selected : 0;
 const guess = scene.options.includes(saved.guess) ? saved.guess : "", reason = saved.reason.slice(0, 120), compared = saved.compared && Boolean(guess && reason.trim()), revealed = saved.show || compared;
 const change = (patch: Parameters<typeof set>[0]) => set({ ...patch, guess: "", reason: "", compared: false, show: false, selected: 0 });
 const select = (key: keyof typeof values, label: string, options: [string, string][]) => <div key={key}><label htmlFor={`${uid}-${key}`}>{label}</label><select id={`${uid}-${key}`} value={String(values[key])} onChange={e => change({ [key]: key === "stage" ? Number(e.target.value) : e.target.value })}>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select><p className="humanities022-selected">Seçili: <strong>{options.find(([value]) => value === String(values[key]))?.[1]}</strong></p></div>;
 const check = (key: "authority" | "thinking" | "outside" | "access" | "data" | "objection" | "review" | "reliable", label: string) => <label className="humanities022-check"><input type="checkbox" checked={values[key]} onChange={e => change({ [key]: e.target.checked })} />{label}</label>;
 return <section className="humanities022-lab" data-forge022={lessonId}>
  <h3>{scene.title}</h3><p>Tam metni oku. Bir koşulu değiştir; değişen veri ve okları kendi sözlerinle açıkla.</p>
  <div className="humanities022-controls">
   {scene.kind === "narrative" && <>{select("mode", "Metnin işi", [["story", "Olay anlat"], ["portrait", "Görünüşü kur"], ["explain", "İşleyişi öğret"], ["argue", "Görüş savun"]])}{values.mode === "story" && select("stage", "Olay aşaması", [["0", "Anahtar bulundu"], ["1", "Kapı açıldı"], ["2", "Kedi dışarıda"]])}</>}
   {scene.kind === "renaissance" && <>{select("manuscript", "Okunan nüsha", [["some", "A: Bazı"], ["all", "B: Bütün"]])}{select("reading", "Yorumun kapsamı", [["some", "En az bir"], ["all", "Herkes"]])}{check("authority", "Yazarın ünü var")}</>}
   {scene.kind === "reason" && <>{check("thinking", "Şu anda düşünme kaydı var")}{check("outside", "Bağımsız ağaç kaydı var")}</>}
   {scene.kind === "enlightenment" && <>{check("access", "Açıklama açık")}{check("data", "Veri yolu açık")}{check("objection", "İtiraz yolu açık")}</>}
   {scene.kind === "power" && <>{select("powers", "Yetkinin dağılımı", [["single", "Tek makam"], ["separate", "Ayrı kurumlar"]])}{check("review", "Karar inceleme yolu var")}</>}
   {scene.kind === "science" && <>{select("quantifier", "Savın kapsamı", [["all", "Tümü"], ["some", "En az bir"]])}{select("record", "Gözlem kaydı", [["one", "Yalnız A kırmızı"], ["counter", "A kırmızı, B mavi"], ["all", "Beşi de kırmızı"]])}</>}
   {scene.kind === "faith" && <>{select("route", "Bilgi yolu", [["sense", "Doğrudan işitme"], ["report", "Haber aktarımı"], ["inference", "Veriden çıkarım"]])}{values.route === "report" && check("reliable", "Kaynak kontrolü var")}</>}
  </div>
  <div className="humanities022-model"><p data-full-context>{scene.context}</p><p><strong>{scene.question}</strong></p><Drawing022 scene={scene} selected={selected} uid={uid} />
   <div className="humanities022-nodes">{scene.nodes.map((n, i) => <div key={i} data-node={i} data-selected={selected === i} data-active={n.active}><p><strong>{n.label}</strong></p><p>{n.text}</p></div>)}</div>
   <p>Bir parçayı seç ve ona bağlı okları izle. Kesik ok, o geçiş için dayanak açık değilse kullanılır.</p>
   <div className="humanities022-node-actions">{scene.nodes.map((n, i) => <button key={i} className="secondary" type="button" aria-pressed={selected === i} data-node-button={i} onClick={() => set({ selected: i })}>{n.label}</button>)}</div>
   <ul aria-label="Şemadaki bağlar">{scene.links.length ? scene.links.map((l, i) => <li key={i}>{scene.nodes[l.from].label} → {scene.nodes[l.to].label}: {l.label}{l.active === false ? " — bu bağ açık değil" : ""}.</li>) : <li>Bu sahnede eşzamanlı nitelikler var; olay ilerleten ok eklenmedi.</li>}</ul>
  </div>
  <fieldset><legend>Bağlamdan karar ver</legend><label htmlFor={`${uid}-guess`}>Tahminin</label><select id={`${uid}-guess`} value={guess} onChange={e => set({ guess: e.target.value, compared: false })}><option value="">Bir karar seç</option>{scene.options.map(v => <option key={v} value={v}>{v}</option>)}</select><p className="humanities022-selected">Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong></p>
   <label htmlFor={`${uid}-reason`}>Gerekçen</label><textarea id={`${uid}-reason`} value={reason} rows={3} maxLength={120} onChange={e => set({ reason: e.target.value.slice(0, 120), compared: false })} />
   <button className="secondary humanities022-compare" type="button" disabled={!guess || !reason.trim()} onClick={() => set({ compared: true })}>Tahminimi karşılaştır</button>
   {compared && <div className="humanities022-feedback" role="status"><p><strong>{guess === scene.decision ? "Seçimin bu bağlamla uyumlu." : "Seçimini kanıtla yeniden denetle."}</strong></p><p>Gerekçene otomatik puan verilmez. Kendi sözünü kanıtla karşılaştır.</p></div>}
  </fieldset>
  <button className="secondary" type="button" aria-expanded={revealed} aria-controls={`${uid}-result`} onClick={() => set({ show: !revealed, compared: false })}>Kanıtı {revealed ? "gizle" : "göster"}</button>
  <div id={`${uid}-result`} className="humanities022-result" data-model-result aria-live="polite">{revealed ? <><p><strong>{scene.decision}</strong></p><p>{scene.reason}</p><ul>{scene.evidence.map((line, i) => <li key={i}>{line}</li>)}</ul></> : <p>Tahminini ve gerekçeni yaz; sonra kanıtı aç.</p>}</div>
  <p>Bu keşif puan veya konuyu bitirme kaydı üretmez. Yeni bir örnekte aynı bağı kendi sözlerinle kur.</p>
 </section>;
}
