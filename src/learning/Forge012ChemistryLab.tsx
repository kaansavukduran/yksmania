import { useId, type ReactNode } from "react";
import {
  flowExperiment,
  gasPressure,
  humidityState,
  ionisation,
  sealedVapour,
  solidSamples,
  treatmentInitial,
  treatmentState,
  waterVapourTable,
} from "./forge012Chemistry";
import { waterHeating } from "./forge011Chemistry";
import { useExploration } from "./useExploration";
import "./forge012Chemistry.css";
const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(n);
const bound = (n: number, min: number, max: number) =>
  Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min;
function Drawing({ title, children }: { title: string; children: ReactNode }) {
  const uid = useId();
  return (
    <svg
      className="c012-drawing"
      role="img"
      aria-labelledby={`${uid}-title`}
      viewBox="0 0 620 310"
    >
      <title id={`${uid}-title`}>{title}</title>
      {children}
    </svg>
  );
}
function Prediction({
  value,
  reason,
  checked,
  expected,
  change,
}: {
  value: string;
  reason: string;
  checked: boolean;
  expected: string;
  change: (v: { guess?: string; reason?: string; checked?: boolean }) => void;
}) {
  const uid = useId();
  return (
    <div className="c012-prediction">
      <label htmlFor={`${uid}-guess`}>Sonuç tahminin</label>
      <select
        id={`${uid}-guess`}
        value={value}
        onChange={(e) => change({ guess: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {[
          expected,
          "Verilen modelin tersine değişir",
          "Bütün nicelikler zorunlu sıfır olur",
        ].map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <label htmlFor={`${uid}-reason`}>Modelden gerekçen</label>
      <textarea
        id={`${uid}-reason`}
        maxLength={120}
        rows={3}
        value={reason.slice(0, 120)}
        onChange={(e) =>
          change({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        className="secondary"
        disabled={!value || !reason.trim()}
        onClick={() => change({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {checked && (
        <div role="status" className="c012-feedback">
          <strong>
            {value === expected
              ? "Sonuç seçimin modelle uyumlu."
              : "Seçimini modelin kanıtıyla yeniden karşılaştır."}
          </strong>
          <p>Modelin sonucu: {expected}</p>
          <p>Gerekçen: {reason}</p>
          <p className="small muted">
            Gerekçe otomatik puanlanmaz. Bu keşif bağımsız soru başarısı
            oluşturmaz.
          </p>
        </div>
      )}
    </div>
  );
}
function Solids() {
  const uid = useId();
  const [s, set] = useExploration("forge012:chemistry:katilar-viskozite", {
    solid: "salt",
    sample: "x",
    temperature: 20,
    elapsed: 0,
    guess: "",
    reason: "",
    checked: false,
  });
  const solid = solidSamples.find((x) => x.id === s.solid) ?? solidSamples[0];
  const f = flowExperiment(s.sample, s.temperature, s.elapsed);
  const expected = solid.kind + "; " + fmt(f.volume) + " mL aktı";
  return (
    <>
      <h3>Örgüyü değiştir, akışı ölç</h3>
      <p>
        Üstte katıların temsili yapısı, altta eşit 20 mL sıvıların kurmaca deney
        verisi var. Düzenek ve basınç farkı sabit; akış çizimi sabit ortalama
        debi yaklaşımı kullanır.
      </p>
      <div className="c012-controls">
        <label htmlFor={`${uid}-solid`}>
          Katı örneği
          <select
            id={`${uid}-solid`}
            value={solid.id}
            onChange={(e) => set({ solid: e.target.value, checked: false })}
          >
            {solidSamples.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${uid}-sample`}>
          Akış örneği
          <select
            id={`${uid}-sample`}
            value={s.sample}
            onChange={(e) => set({ sample: e.target.value, checked: false })}
          >
            <option value="x">X sıvısı</option>
            <option value="y">Y sıvısı</option>
          </select>
        </label>
        <label htmlFor={`${uid}-temp`}>
          Deney sıcaklığı
          <select
            id={`${uid}-temp`}
            value={f.temperature}
            onChange={(e) =>
              set({ temperature: Number(e.target.value), checked: false })
            }
          >
            {[20, 40, 60].map((t) => (
              <option key={t} value={t}>
                {t} °C
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${uid}-elapsed`}>
          Geçen süre (s)
          <input
            id={`${uid}-elapsed`}
            type="range"
            min="0"
            max="120"
            step="5"
            value={bound(s.elapsed, 0, 120)}
            onChange={(e) =>
              set({ elapsed: Number(e.target.value), checked: false })
            }
          />
          <output>{fmt(s.elapsed)} s</output>
        </label>
      </div>
      <Drawing
        title={`${solid.name}: ${solid.kind}. Alttaki kapta ${fmt(f.volume)} mL sıvı var.`}
      >
        {Array.from({ length: 12 }, (_, i) => {
          const x = 90 + (i % 6) * 80 + (solid.regular ? 0 : (i % 3) * 13),
            y = 48 + Math.floor(i / 6) * 65 + (solid.regular ? 0 : (i % 4) * 8);
          return (
            <g key={i}>
              <circle
                data-solid-particle
                cx={x}
                cy={y}
                r="17"
                className={
                  solid.id === "salt" && i % 2 === 0
                    ? "c012-primary"
                    : "c012-secondary"
                }
              />
              {solid.id === "salt" && (
                <text data-solid-charge x={x} y={y + 6} textAnchor="middle">
                  {i % 2 === 0 ? "+" : "−"}
                </text>
              )}
              {["diamond", "graphite"].includes(solid.id) && (
                <text data-carbon-atom x={x} y={y + 6} textAnchor="middle">
                  C
                </text>
              )}
              {["diamond", "graphite"].includes(solid.id) && i % 6 < 5 && (
                <path d={`M${x + 18} ${y}h44`} className="c012-line" />
              )}
            </g>
          );
        })}
        <path d="M100 185v95h420v-95" className="c012-line" />
        <rect
          data-flow-volume
          x="102"
          y={278 - f.fraction * 85}
          width="416"
          height={f.fraction * 85}
          className="c012-water"
        />
        <text x="310" y="177" textAnchor="middle">
          20 mL toplam · {fmt(f.volume)} mL geçti
        </text>
      </Drawing>
      <div data-model-result className="c012-result">
        <strong>
          {solid.name} · {solid.kind}
        </strong>
        <p>
          Yapıtaşı: {solid.particle}. Tutunma: {solid.bond}.
        </p>
        <p>İletkenlik: {solid.conductor}.</p>
        <p>
          {s.sample === "y" ? "Y" : "X"} · {f.temperature} °C: 20 mL geçiş
          süresi {fmt(f.finish)} s. Ortalama debi {fmt(f.rate, 3)} mL/s. Şu anda{" "}
          {fmt(f.volume)} mL aktı.
        </p>
      </div>
      <p className="small muted">
        Deney tablosu: X için 20/40/60 °C’de 90/45/30 s; Y için 30/15/10 s.
        Bunlar gerçek bir ürünün ölçüm değeri değildir. Kristal çizimi gerçek
        birim hücre veya bağ açısı göstermez.
      </p>
      <Prediction
        value={s.guess}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        change={set}
      />
    </>
  );
}
function Vapour() {
  const uid = useId();
  const [s, set] = useExploration(
    "forge012:chemistry:buharlasma-buhar-basinci",
    {
      temperature: 2,
      mass: 1,
      volume: 2,
      area: 1,
      frame: 0,
      guess: "",
      reason: "",
      checked: false,
    },
  );
  const r = sealedVapour(s.temperature, s.mass, s.volume);
  const expected = r.hasLiquid
    ? "Sıvı kaldı; basınç doygunluk değerinde"
    : r.saturated
      ? "Sıvı bitti; buhar doygunluk sınırında"
      : "Sıvı bitti; basınç doygunluğun altında";
  const width = 150 + bound(s.area, 1, 3) * 55;
  const left = 310 - width / 2;
  const count = Math.max(1, Math.round((r.pressure / r.saturation) * 12));
  return (
    <>
      <h3>Dengeye yetecek su var mı?</h3>
      <p>
        Başlangıçta havası alınmış, sızdırmaz ve sabit sıcaklıklı kap. Verilen
        hacim gaz boşluğudur. Suyun doygunluk basıncı gerçek tablodan, buhar
        miktarı ideal gaz yaklaşımıyla hesaplanır. Alan değişince denge
        basıncını ayrı izle.
      </p>
      <div className="c012-controls">
        <label htmlFor={`${uid}-temp`}>
          Su sıcaklığı
          <select
            id={`${uid}-temp`}
            value={s.temperature}
            onChange={(e) =>
              set({ temperature: Number(e.target.value), checked: false })
            }
          >
            {waterVapourTable.map((x, i) => (
              <option key={x.temperature} value={i}>
                {x.temperature} °C
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${uid}-mass`}>
          Toplam su (g)
          <input
            id={`${uid}-mass`}
            type="number"
            min="0.001"
            max="10"
            step="0.001"
            value={s.mass}
            onChange={(e) =>
              set({
                mass: bound(Number(e.target.value), 0.001, 10),
                checked: false,
              })
            }
          />
        </label>
        <label htmlFor={`${uid}-volume`}>
          Gaz boşluğu (L)
          <input
            id={`${uid}-volume`}
            type="range"
            min="1"
            max="10"
            step="1"
            value={s.volume}
            onChange={(e) =>
              set({ volume: Number(e.target.value), checked: false })
            }
          />
          <output>{fmt(s.volume)} L</output>
        </label>
        <label htmlFor={`${uid}-area`}>
          Yüzey modeli
          <input
            id={`${uid}-area`}
            type="range"
            min="1"
            max="3"
            step="1"
            value={s.area}
            onChange={(e) =>
              set({ area: Number(e.target.value), checked: false })
            }
          />
          <output>{s.area} kat temsili alan</output>
        </label>
      </div>
      <button
        className="secondary"
        onClick={() => set({ frame: (s.frame + 1) % 3 })}
      >
        Dengedeki hareketi bir adım göster
      </button>
      <Drawing
        title={`${r.temperature} °C; buhar ${fmt(r.pressure)} mmHg; ${r.hasLiquid ? "sıvı kaldı" : "sıvı bitti"}.`}
      >
        <path d={`M${left} 35h${width}v240h-${width}Z`} className="c012-line" />
        {r.hasLiquid && (
          <rect
            data-liquid
            x={left + 2}
            y="211"
            width={width - 4}
            height="62"
            className="c012-water"
          />
        )}
        {Array.from({ length: count }, (_, i) => (
          <circle
            data-vapour-particle
            key={i}
            cx={left + 25 + ((i * 43 + s.frame * 13) % (width - 50))}
            cy={65 + ((i * 31 + s.frame * 17) % 120)}
            r="7"
            className="c012-primary"
          />
        ))}
        {r.hasLiquid && (
          <g data-two-way-flow>
            <path
              d="M280 205v-34m-8 8 8-8 8 8M340 172v34m-8-8 8 8 8-8"
              className="c012-line"
            />
          </g>
        )}
        <text x="310" y="301" textAnchor="middle">
          {r.hasLiquid
            ? "İki yönlü geçiş sürer"
            : r.saturated
              ? "Yalnız gaz; doygunluk sınırında"
              : "Yalnız gaz; doygunluk altında"}
        </text>
      </Drawing>
      <div data-model-result className="c012-result">
        <strong>{expected}</strong>
        <p>
          {r.temperature} °C için P* = {fmt(r.saturation)} mmHg. Gerçek model
          basıncı = {fmt(r.pressure)} mmHg.
        </p>
        <p>
          Buhar {fmt(r.vapour, 4)} g; sıvı {fmt(r.liquid, 4)} g; toplam{" "}
          {fmt(r.total, 4)} g. Doygunluğa gereken buhar {fmt(r.required, 4)} g.
        </p>
      </div>
      <p className="small muted">
        Buhar noktaları miktarı ölçekli saymaz. Tek sıcaklıkta yüzey genişletmek
        P* değerini değiştirmez. Hareket adımı gerçek zaman veya dengeye ulaşma
        süresi hesabı değildir.
      </p>
      <Prediction
        value={s.guess}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        change={set}
      />
    </>
  );
}
function Boiling() {
  const uid = useId();
  const [s, set] = useExploration("forge012:chemistry:kaynama-bagil-nem", {
    boil: 5,
    temperature: 2,
    pressure: 11.9,
    guess: "",
    reason: "",
    checked: false,
  });
  const b = waterVapourTable[Math.round(bound(s.boil, 3, 5))];
  const h = humidityState(s.temperature, s.pressure);
  const expected = h.condenses
    ? "Fazla buhar yoğuşur; denge bağıl nemi %100"
    : h.relative >= 100
      ? "Doygunlukta; bağıl nem %100"
      : "Doygunluk altı; bağıl nem %" + fmt(h.relative);
  return (
    <>
      <h3>Kaynama eşiği ve nem aynı basınç değildir</h3>
      <p>
        Solda saf su için dış basınçla eşleşen gerçek tablo noktası, sağda
        havanın su buharı oranı var. Nem modeli sabit sıcaklıkta düz su
        yüzeyiyle dengeyi varsayar; toplam hava basıncını suyun kısmi basıncına
        ekleme.
      </p>
      <div className="c012-controls">
        <label htmlFor={`${uid}-boil`}>
          Dış basınç
          <select
            id={`${uid}-boil`}
            value={s.boil}
            onChange={(e) =>
              set({ boil: Number(e.target.value), checked: false })
            }
          >
            {waterVapourTable.slice(3).map((x, i) => (
              <option key={x.pressure} value={i + 3}>
                {x.pressure} mmHg
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${uid}-temp`}>
          Hava sıcaklığı
          <select
            id={`${uid}-temp`}
            value={s.temperature}
            onChange={(e) =>
              set({ temperature: Number(e.target.value), checked: false })
            }
          >
            {waterVapourTable.map((x, i) => (
              <option key={x.temperature} value={i}>
                {x.temperature} °C
              </option>
            ))}
          </select>
        </label>
        <label htmlFor={`${uid}-pressure`}>
          Başlangıç su buharı basıncı (mmHg)
          <input
            id={`${uid}-pressure`}
            type="number"
            min="0"
            max="1000"
            step="0.01"
            value={s.pressure}
            onChange={(e) =>
              set({
                pressure: bound(Number(e.target.value), 0, 1000),
                checked: false,
              })
            }
          />
        </label>
      </div>
      <Drawing
        title={`Kaynama ${b.temperature} °C; dengede bağıl nem yüzde ${fmt(h.relative)}.`}
      >
        <path d="M50 65v190h200v-190" className="c012-line" />
        <rect x="52" y="165" width="196" height="88" className="c012-water" />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={92 + i * 53}
            cy={220 - b.temperature / 2}
            r={5 + b.temperature / 20}
            className="c012-bubble"
          />
        ))}
        <text x="150" y="292" textAnchor="middle">
          {b.temperature} °C
        </text>
        <rect x="350" y="60" width="210" height="195" className="c012-empty" />
        <rect
          data-humidity-fill
          x="352"
          y={253 - h.relative * 1.91}
          width="206"
          height={h.relative * 1.91}
          className="c012-water"
        />
        {h.condenses && (
          <path
            data-condensation
            d="M575 95q-22 25 0 32 22-7 0-32"
            className="c012-primary"
          />
        )}
        <text x="455" y="292" textAnchor="middle">
          %{fmt(h.relative)}
        </text>
      </Drawing>
      <div data-model-result className="c012-result">
        <strong>Kaynama eşiği: {b.temperature} °C</strong>
        <p>
          P*({b.temperature} °C) = dış basınç = {fmt(b.pressure)} mmHg.
        </p>
        <p>
          Havada {h.temperature} °C için P* = {fmt(h.saturation)} mmHg.
          Başlangıç oranı %{fmt(h.initialRelative)}; dengede su buharı{" "}
          {fmt(h.pressure)} mmHg ve bağıl nem %{fmt(h.relative)}.
        </p>
        <p>
          {h.condenses
            ? "Başlangıç buharı doygunluğu aşıyor; bu modelde fazla buhar yoğuşur."
            : "Verilen buhar basıncı doygunluk sınırını aşmıyor."}
        </p>
      </div>
      <p className="small muted">
        Şekildeki doluluk nem yüzdesi için bir göstergedir; havanın bir kabının
        yüzde kaçının sıvı olduğu değildir. Gerçek hissedilen sıcaklık veya
        rakım hesabı yapılmaz.
      </p>
      <Prediction
        value={s.guess}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        change={set}
      />
    </>
  );
}
function Gas() {
  const uid = useId();
  const [s, set] = useExploration(
    "forge012:chemistry:gazlar-hal-degisim-plazma",
    {
      mode: "gas",
      moles: 0.2,
      temperature: 300,
      volume: 2,
      energy: 0,
      ionised: 0,
      frame: 0,
      guess: "",
      reason: "",
      checked: false,
    },
  );
  const mode = ["gas", "phase", "plasma"].includes(s.mode) ? s.mode : "gas";
  const p = gasPressure(
    bound(s.moles, 0.1, 1),
    bound(s.temperature, 200, 600),
    bound(s.volume, 1, 6),
  );
  const w = waterHeating(bound(s.energy, 0, 3208));
  const ions = ionisation(12, s.ionised);
  const drawingLeft = mode === "plasma" ? 110 : 95;
  const drawingWidth =
    mode === "plasma" ? 400 : 90 + bound(s.volume, 1, 6) * 60;
  const atomX = (i: number) =>
    drawingLeft + 25 + ((i * 37 + s.frame * 17) % (drawingWidth - 50));
  const electronX = (i: number) =>
    drawingLeft + 35 + ((i * 51 + s.frame * 23) % (drawingWidth - 60));
  const expected =
    mode === "gas"
      ? "Basınç " + fmt(p) + " atm"
      : mode === "phase"
        ? w.phase
        : "Net yük sıfır; elektron ve iyon sayıları eşit";
  return (
    <>
      <h3>Değişken, faz veya yük: birini seç</h3>
      <p>
        İdeal gaz hesabı, 0 °C’deki 1 g buzdan başlayan, yaklaşık 1 atm enerji
        grafiği ve bir elektronlu iyonlaşma sayımı ayrı modellerdir.
        Değişkenlerin fiziksel anlamları birbirine karıştırılmaz.
      </p>
      <label className="c012-mode" htmlFor={`${uid}-mode`}>
        İncelenen model
        <select
          id={`${uid}-mode`}
          value={mode}
          onChange={(e) => set({ mode: e.target.value, checked: false })}
        >
          <option value="gas">İdeal gaz</option>
          <option value="phase">Hâl değişim grafiği</option>
          <option value="plasma">İyonlaşma ve yük</option>
        </select>
      </label>
      {mode === "gas" ? (
        <div className="c012-controls">
          <label htmlFor={`${uid}-n`}>
            Gaz miktarı (mol)
            <input
              id={`${uid}-n`}
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={s.moles}
              onChange={(e) =>
                set({ moles: Number(e.target.value), checked: false })
              }
            />
            <output>{fmt(s.moles)} mol</output>
          </label>
          <label htmlFor={`${uid}-t`}>
            Mutlak sıcaklık (K)
            <input
              id={`${uid}-t`}
              type="range"
              min="200"
              max="600"
              step="50"
              value={s.temperature}
              onChange={(e) =>
                set({ temperature: Number(e.target.value), checked: false })
              }
            />
            <output>{s.temperature} K</output>
          </label>
          <label htmlFor={`${uid}-v`}>
            Hacim (L)
            <input
              id={`${uid}-v`}
              type="range"
              min="1"
              max="6"
              step="1"
              value={s.volume}
              onChange={(e) =>
                set({ volume: Number(e.target.value), checked: false })
              }
            />
            <output>{s.volume} L</output>
          </label>
        </div>
      ) : mode === "phase" ? (
        <label className="c012-mode" htmlFor={`${uid}-energy`}>
          Aktarılan enerji (J)
          <input
            id={`${uid}-energy`}
            type="range"
            min="0"
            max="3208"
            step="1"
            value={s.energy}
            onChange={(e) =>
              set({ energy: Number(e.target.value), checked: false })
            }
          />
          <output>{fmt(s.energy)} J</output>
        </label>
      ) : (
        <label className="c012-mode" htmlFor={`${uid}-ions`}>
          İyonlaşan atom sayısı
          <input
            id={`${uid}-ions`}
            type="range"
            min="0"
            max="12"
            step="1"
            value={s.ionised}
            onChange={(e) =>
              set({ ionised: Number(e.target.value), checked: false })
            }
          />
          <output>{ions.ions} / 12</output>
        </label>
      )}
      <button
        className="secondary"
        onClick={() => set({ frame: (s.frame + 1) % 3 })}
      >
        Tanecik hareketini bir adım göster
      </button>
      <Drawing title={expected}>
        {mode === "phase" ? (
          <>
            <path d="M35 263L35 28M35 263H590" className="c012-line" />
            <polyline
              points="35,223 92.78,223 165.1,138 555.4,138 590,53"
              className="c012-curve"
            />
            <circle
              data-energy-point
              cx={35 + (bound(s.energy, 0, 3208) / 3208) * 555}
              cy={223 - w.temperature * 0.85}
              r="8"
              className="c012-primary"
            />
            <text x="310" y="303" textAnchor="middle">
              Verilen enerji → · {fmt(w.temperature)} °C
            </text>
          </>
        ) : (
          <>
            <path
              d={`M${drawingLeft} 35h${drawingWidth}v235H${drawingLeft}Z`}
              className="c012-line"
            />
            {Array.from({ length: 12 }, (_, i) => (
              <g key={i}>
                <circle
                  data-gas-particle
                  data-ionised={mode === "plasma" && i < ions.ions}
                  cx={atomX(i)}
                  cy={70 + ((i * 41 + s.frame * 11) % 160)}
                  r="12"
                  className={
                    mode === "plasma" && i < ions.ions
                      ? "c012-primary"
                      : "c012-secondary"
                  }
                />
                {mode === "plasma" && i < ions.ions && (
                  <>
                    <text
                      x={atomX(i)}
                      y={76 + ((i * 41 + s.frame * 11) % 160)}
                      textAnchor="middle"
                    >
                      +
                    </text>
                    <circle
                      data-free-electron
                      cx={electronX(i)}
                      cy={60 + ((i * 47 + s.frame * 19) % 175)}
                      r="4"
                      className="c012-electron"
                    />
                  </>
                )}
              </g>
            ))}
            <text x="310" y="303" textAnchor="middle">
              {mode === "plasma"
                ? `${ions.ions} iyon + ${ions.electrons} elektron`
                : `V=${s.volume} L · T=${s.temperature} K`}
            </text>
          </>
        )}
      </Drawing>
      <div data-model-result className="c012-result">
        {mode === "gas" ? (
          <>
            <strong>Basınç = {fmt(p)} atm</strong>
            <p>
              P=nRT/V; n={fmt(s.moles)} mol, T={s.temperature} K, V={s.volume}{" "}
              L; R=0,082057 L atm mol⁻¹ K⁻¹.
            </p>
          </>
        ) : mode === "phase" ? (
          <>
            <strong>
              {w.phase} · {fmt(w.temperature)} °C
            </strong>
            <p>
              Katı %{fmt(w.solid * 100)} · sıvı %{fmt(w.liquid * 100)} · gaz %
              {fmt(w.gas * 100)}.
            </p>
          </>
        ) : (
          <>
            <strong>Net yük: {ions.charge}e</strong>
            <p>
              {ions.ions} pozitif iyon; {ions.electrons} serbest elektron;{" "}
              {ions.neutral} nötr atom. Çekirdek sayısı {ions.total} olarak
              korunur.
            </p>
            <p>
              Negatif iyon yokken de elektronlar pozitif iyon yükünü dengeler.
              Bu sayım tek başına bütün plazma davranışını simüle etmez.
            </p>
          </>
        )}
      </div>
      <p className="small muted">
        Gazdaki 12 çizim gerçek mol sayısı değildir. Enerji grafiği 1 g su,
        erime gizli ısısı 334 J/g, sıvı öz ısısı 4,18 J/(g °C), buharlaşma gizli
        ısısı 2256 J/g modeline aittir. İyonlaşma modunda her seçili atom yalnız
        bir elektron kaybeder.
      </p>
      <Prediction
        value={s.guess}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        change={set}
      />
    </>
  );
}
function Nature() {
  const uid = useId();
  const [s, set] = useExploration("forge012:chemistry:doga-ve-kimya", {
    filter: false,
    carbon: false,
    exchange: false,
    disinfect: false,
    guess: "",
    reason: "",
    checked: false,
  });
  const r = treatmentState(s.filter, s.carbon, s.exchange, s.disinfect);
  const categories = [
    { key: "suspended", name: "Askıda katı", unit: "mg" },
    { key: "organic", name: "Örnek organik kirletici", unit: "mg" },
    { key: "hardness", name: "Sertlik eşdeğeri yük", unit: "mg CaCO₃" },
    { key: "microbes", name: "Temsili mikrop birimi", unit: "birim" },
  ] as const;
  const expected = s.filter
    ? "Askıda katı azalır; tüm bileşenler otomatik sıfır olmaz"
    : "Filtre yok; askıda katı başlangıç miktarında";
  return (
    <>
      <h3>Arıtma hattını kirleticiye göre kur</h3>
      <p>
        20 L kurmaca örneğin her bileşeni ayrı izlenir. Her işlem yalnız
        belirtilmiş hedefi etkiler; yüzdeler gerçek bir arıtıcı için garanti
        değildir. Sonuç içilebilirlik onayı vermez.
      </p>
      <div className="c012-controls">
        {[
          { key: "filter", label: "Filtre: askıda katıyı %90 azalt" },
          {
            key: "carbon",
            label: "Aktif karbon: organik kirleticiyi %75 azalt",
          },
          { key: "exchange", label: "İyon değişimi: sertlik yükünü %90 azalt" },
          {
            key: "disinfect",
            label: "Dezenfeksiyon: mikrop birimini %99 azalt",
          },
        ].map((x) => (
          <label className="c012-check" htmlFor={`${uid}-${x.key}`} key={x.key}>
            <input
              id={`${uid}-${x.key}`}
              type="checkbox"
              checked={s[x.key as "filter"]}
              onChange={(e) =>
                set({ [x.key]: e.target.checked, checked: false })
              }
            />
            {x.label}
          </label>
        ))}
      </div>
      <Drawing
        title={categories
          .map((x) => `${x.name}: kalan ${fmt(r[x.key])} ${x.unit}`)
          .join("; ")}
      >
        {categories.map((x, i) => (
          <g key={x.key}>
            <rect
              x="60"
              y={35 + i * 65}
              width="500"
              height="27"
              className="c012-empty"
            />
            <rect
              data-treatment-bar={x.key}
              x="60"
              y={35 + i * 65}
              width={(500 * r[x.key]) / treatmentInitial[x.key]}
              height="27"
              className={i % 2 ? "c012-secondary" : "c012-primary"}
            />
            <text x="310" y={81 + i * 65} textAnchor="middle">
              {i + 1}. bileşen · %
              {fmt((100 * r[x.key]) / treatmentInitial[x.key])} kaldı
            </text>
          </g>
        ))}
      </Drawing>
      <div data-model-result className="c012-result">
        <strong>Kirleticileri ayrı hesapla</strong>
        <ul>
          {categories.map((x) => (
            <li key={x.key}>
              {x.name}: başlangıç {fmt(treatmentInitial[x.key])} {x.unit}; kalan{" "}
              {fmt(r[x.key])} {x.unit}.
            </li>
          ))}
        </ul>
        <p>
          Askıda katı derişimi {fmt(r.suspended / 20)} mg/L. Berraklık ve
          sertlik, bütün içilebilirlik ölçütlerinin yerine geçmez.
        </p>
      </div>
      <p className="small muted">
        CaCO₃ eşdeğeri farklı sertlik iyonlarını ortak bir ölçekte ifade eder;
        bütün suyun gerçekten katı CaCO₃ içerdiği anlamına gelmez. Mikrop birimi
        temsili sayımdır; klinik veya cihaz verisi değildir.
      </p>
      <Prediction
        value={s.guess}
        reason={s.reason}
        checked={s.checked}
        expected={expected}
        change={set}
      />
    </>
  );
}
export default function Forge012ChemistryLab({ id }: { id: string }) {
  return (
    <section className="c012-lab" data-forge012={id}>
      {id === "katilar-viskozite" ? (
        <Solids />
      ) : id === "buharlasma-buhar-basinci" ? (
        <Vapour />
      ) : id === "kaynama-bagil-nem" ? (
        <Boiling />
      ) : id === "gazlar-hal-degisim-plazma" ? (
        <Gas />
      ) : (
        <Nature />
      )}
      <p className="small muted c012-evidence">
        Keşif ve gerekçen bu cihazda korunur. Bu alan XP, soru doğrusu, tekrar
        tarihi veya konu tamamlama kaydı oluşturmaz.
      </p>
    </section>
  );
}
