import { useEffect, useId, useRef, useState } from "react";
import { useExploration } from "./useExploration";
import { buildTurkishScene021, insertionPosition021, moveSentence021, turkishCases021, turkishDefaults021, validateOrder021 } from "./forge021Turkish";
import "./forge021Turkish.css";
export default function Forge021TurkishLab({ lessonId }: { lessonId: string }) {
 const uid = useId(), cases = turkishCases021(lessonId);
 const [saved, set] = useExploration(`forge021-turkish:${lessonId}`, { ...turkishDefaults021, case: cases[0].id });
 const item = cases.find(c => c.id === saved.case) ?? cases[0];
 let order: string | undefined;
 if (item.kind === "sequence") { try { order = validateOrder021(saved.order); } catch { order = item.initial; } }
 const slot = Number.isInteger(saved.slot) && saved.slot >= 0 && saved.slot <= 4 ? saved.slot : 0;
 const candidate = item.kind === "blank" && Number.isInteger(saved.candidate) && saved.candidate >= 0 && saved.candidate < item.candidates.length ? saved.candidate : 0;
 const scene = buildTurkishScene021(lessonId, item.id, { order, slot, candidate });
 const selected = Number.isInteger(saved.selected) && saved.selected >= 0 && saved.selected < scene.nodes.length ? saved.selected : 0;
 const guess = scene.options.includes(saved.guess) ? saved.guess : "", reason = saved.reason.slice(0, 120), compared = saved.compared && Boolean(guess && reason.trim()), revealed = saved.show || compared;
 const change = (patch: Parameters<typeof set>[0]) => set({ ...patch, guess: "", reason: "", compared: false, show: false });
 const drawing = useRef<HTMLDivElement>(null), [width, setWidth] = useState(270);
 useEffect(() => { const element = drawing.current; if (!element) return; const observer = new ResizeObserver(([entry]) => setWidth(Math.max(1, entry.contentRect.width))); observer.observe(element); return () => observer.disconnect(); }, []);
 const fontSize = Math.max(40, 17 * 640 / width);
 return <section className="turkish021-lab" data-forge021={lessonId} data-current-order={scene.order}>
  <h3>{item.kind === "sequence" ? "Sırayı kur, bağları izle" : item.kind === "insertion" ? "İki yana bağlan" : "Eksik yargıyı tamamla"}</h3>
  <p>Önce tam metni oku. Bir yeri değiştir; gerekli bağı kanıtıyla açıkla. Eksikse neyin eksik olduğunu söyle.</p>
  <label htmlFor={`${uid}-case`}>Örnek</label><select id={`${uid}-case`} value={item.id} onChange={event => { const next = cases.find(c => c.id === event.target.value)!; change({ case: next.id, order: next.kind === "sequence" ? next.initial : "", slot: 0, candidate: 0, selected: 0 }); }}>{cases.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select>
  <p className="turkish021-selected">Seçili örnek: <strong>{item.label}</strong></p>
  {item.kind === "insertion" && <><p><strong>Eklenecek cümle</strong></p><p className="turkish021-extra">{item.inserted.text}</p><label htmlFor={`${uid}-slot`}>Ekleme yeri</label><select id={`${uid}-slot`} value={slot} onChange={event => { const next = Number(event.target.value); change({ slot: next, selected: next }); }}>{Array.from({ length: 5 }, (_, index) => <option key={index} value={index}>{insertionPosition021(index)}</option>)}</select><p className="turkish021-selected">Seçili yer: <strong>{insertionPosition021(slot)}</strong></p></>}
  {item.kind === "blank" && <div className="turkish021-candidates" role="group" aria-label="Hazır aday cümleler"><p>Adayı seç; oluşan metinde iki yönü birlikte oku.</p>{item.candidates.map((c, index) => <button key={index} type="button" className="secondary" data-candidate={index} aria-pressed={candidate === index} onClick={() => change({ candidate: index, selected: item.before.length })}><strong>{index + 1}. aday</strong><span>{c.text}</span></button>)}</div>}
  <div className="turkish021-model">
   <p>{scene.context}</p><p className="turkish021-complete">{scene.sentence}</p>
   <div className="turkish021-sentences">{scene.nodes.map((node, index) => <div key={node.id} data-sentence={node.id} data-selected={selected === index} data-position={index}>
    <button className="secondary turkish021-node" type="button" aria-pressed={selected === index} aria-label={`${node.label} şemada vurgulansın`} onClick={() => set({ selected: index })}>{node.label}</button>
    <p>{index + 1}. sırada</p><p>{node.text}</p>
    {item.kind === "sequence" && <div className="turkish021-move"><button className="secondary" type="button" disabled={index === 0} aria-label={`${node.label} yukarı taşınsın`} onClick={() => change({ order: moveSentence021(scene.order, index, -1), selected: index - 1 })}>Yukarı</button><button className="secondary" type="button" disabled={index === scene.nodes.length - 1} aria-label={`${node.label} aşağı taşınsın`} onClick={() => change({ order: moveSentence021(scene.order, index, 1), selected: index + 1 })}>Aşağı</button></div>}
   </div>)}</div>
   <p>Cümle adına dokunarak bağlı okları vurgula. Kesik ok, bu örnekte eksik kalan bağı gösterir.</p>
   <div ref={drawing} className="turkish021-drawing"><svg viewBox={`0 0 640 ${scene.nodes.length * 88 + 20}`} role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
    <title id={`${uid}-title`}>Tam metindeki cümlelerin anlam bağları</title><desc id={`${uid}-desc`}>{scene.sentence} {scene.links.map(link => `${scene.nodes[link.source].label} → ${scene.nodes[link.target].label}: ${link.label}, ${link.valid ? "bağ kuruldu" : "bağ eksik"}`).join("; ")}</desc>
    <defs><marker id={`${uid}-arrow`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto-start-reverse"><path d="M0 0 L8 4 L0 8Z" fill="currentColor" /></marker></defs>
    {scene.links.map((link, index) => <path key={index} data-relation={`${link.sourceId}-${link.targetId}`} data-source={link.source} data-target={link.target} data-valid={link.valid} d={`M164 ${link.source * 88 + 45} H${20 + index * 17} V${link.target * 88 + 45} H162`} fill="none" stroke={link.valid ? "var(--text)" : "var(--danger)"} strokeDasharray={link.valid ? undefined : "7 5"} strokeWidth={link.source === selected || link.target === selected ? 3.5 : 1.8} markerEnd={`url(#${uid}-arrow)`} />)}
    {scene.nodes.map((node, index) => <g key={node.id} transform={`translate(0 ${index * 88})`} data-svg-node={node.id} data-selected={index === selected} data-position={index}><rect x="164" y="15" width="450" height="60" rx="9" fill="var(--surface)" stroke={index === selected ? "var(--accent)" : "var(--muted)"} strokeWidth={index === selected ? 3 : 1.5} /><text x="182" y="45" dominantBaseline="central" fontSize={fontSize} fill="var(--text)">{node.label}</text></g>)}
   </svg></div>
   <ul aria-label="Bağların tam açıklaması">{scene.links.map((link, index) => <li key={index}>{scene.nodes[link.source].label} → {scene.nodes[link.target].label}: {link.label}. {link.valid ? "Bağ uygun." : "Bağ eksik."}</li>)}</ul>
  </div>
  <fieldset><legend>Bağları kanıtla denetle</legend><label htmlFor={`${uid}-guess`}>Tahminin</label><select id={`${uid}-guess`} value={guess} onChange={event => set({ guess: event.target.value, compared: false })}><option value="">Bir karar seç</option>{scene.options.map(option => <option key={option} value={option}>{option}</option>)}</select><p className="turkish021-selected">Tahminin: <strong>{guess || "Henüz seçilmedi"}</strong></p><label htmlFor={`${uid}-reason`}>Gerekçen</label><textarea id={`${uid}-reason`} rows={3} maxLength={120} value={reason} onChange={event => set({ reason: event.target.value.slice(0, 120), compared: false })} /><button type="button" className="secondary turkish021-compare" disabled={!guess || !reason.trim()} onClick={() => set({ compared: true })}>Tahminimi karşılaştır</button>
   {compared && <div role="status" className="turkish021-feedback"><p><strong>{guess === scene.decision ? "Seçimin bu bağlamla uyumlu." : "Seçimini kanıtla yeniden denetle."}</strong></p><p>Gerekçene otomatik puan verilmez. Kendi açıklamanı açık kanıtla karşılaştır.</p></div>}
  </fieldset>
  <button type="button" className="secondary" aria-expanded={revealed} aria-controls={`${uid}-result`} onClick={() => set({ show: !revealed, compared: false })}>Kanıtı {revealed ? "gizle" : "göster"}</button><div id={`${uid}-result`} className="turkish021-result" data-model-result aria-live="polite">{revealed ? <><p><strong>{scene.decision}</strong></p><p>{scene.reason}</p><ul>{scene.evidence.map((line, index) => <li key={index}>{line}</li>)}</ul></> : <p>Tahminini ve gerekçeni yaz; sonra kanıtı aç.</p>}</div>
  <p>Bu keşif puan veya konu tamamlama kaydı üretmez. Burada hazır örnekleri denersin; başka bir metni sen çözersin.</p>
 </section>;
}
