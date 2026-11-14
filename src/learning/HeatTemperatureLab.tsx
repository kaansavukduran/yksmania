import { useId } from "react";
import { ModelNumber } from "./ModelNumber";
import { thermalContact, waterHeating } from "./heatTemperature";
import { useExploration } from "./useExploration";
import "./heatTemperatureLab.css";

const fmt = (n: number, digits = 1) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    n === 0 ? 0 : n,
  );
const bound = (n: number, min: number, max: number, fallback: number) =>
  Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : fallback;

export default function HeatTemperatureLab() {
  const uid = useId();
  const [saved, set] = useExploration("heat-temperature", {
    mode: "contact",
    materialA: "water",
    massA: 200,
    massB: 300,
    initialA: 80,
    initialB: 20,
    progress: 0,
    prediction: "",
    reason: "",
    revealed: false,
    iceMass: 100,
    energyPercent: 0,
  });
  const massA = bound(saved.massA, 100, 1000, 200);
  const massB = bound(saved.massB, 100, 1000, 300);
  const initialA = bound(saved.initialA, 10, 90, 80);
  const initialB = bound(saved.initialB, 10, 90, 20);
  const progress = bound(saved.progress, 0, 100, 0);
  const materialA = saved.materialA === "aluminium" ? "aluminium" : "water";
  const cA = materialA === "water" ? 4200 : 900;
  const capacityA = (massA / 1000) * cA;
  const capacityB = (massB / 1000) * 4200;
  const contact = thermalContact(
    capacityA,
    capacityB,
    initialA,
    initialB,
    progress / 100,
  );
  const inEquilibrium = initialA === initialB || progress === 100;
  const iceMass = bound(saved.iceMass, 50, 200, 100);
  const energyPercent = bound(saved.energyPercent, 0, 100, 0);
  const curve = waterHeating(
    iceMass,
    (waterHeating(iceMass, 0).maximum * energyPercent) / 100,
  );
  const changeContact = (changes: Parameters<typeof set>[0]) =>
    set({ ...changes, revealed: false });
  const nearest =
    initialA === initialB
      ? "Başlangıç sıcaklıkları zaten aynı; her iki örnek aynı sıcaklıkta kalır."
      : capacityA === capacityB
        ? "Isı sığaları eşit: denge tam ortadadır."
        : capacityA > capacityB
          ? "A’nın ısı sığası daha büyük: denge A’nın ilk sıcaklığına daha yakındır."
          : "B’nin ısı sığası daha büyük: denge B’nin ilk sıcaklığına daha yakındır.";
  const graphX = (q: number) => 48 + (q / curve.maximum) * 440;
  const graphY = (t: number) => 188 - ((t + 10) / 30) * 144;
  return (
    <section
      className="concept-model heat-temperature-lab"
      aria-label="Isı ve sıcaklık laboratuvarı"
    >
      <h3>Enerjinin izini sür</h3>
      <p>
        Kütleyi ve malzemeyi değiştir, dengeyi tahmin et. Sonra enerjinin
        hesabını gör.
      </p>
      <div
        className="heat-lab-modes"
        role="group"
        aria-label="Isı modeli seçimi"
      >
        <button
          className="secondary"
          type="button"
          aria-pressed={saved.mode !== "heating"}
          onClick={() => set({ mode: "contact" })}
        >
          Isıl temas
        </button>
        <button
          className="secondary"
          type="button"
          aria-pressed={saved.mode === "heating"}
          onClick={() => set({ mode: "heating" })}
        >
          Sıcaklık–enerji grafiği
        </button>
      </div>
      {saved.mode !== "heating" ? (
        <div className="heat-contact">
          <p className="small muted">
            İki örnek dışarıya karşı yalıtılmıştır. Kap ve mekanik iş ihmal
            edilir; tepkime ve hâl değişimi yoktur. Her örnek kendi içinde aynı
            sıcaklıktadır, c sabittir. A ve B ayrı örneklerdir; ısıl temas
            kurarlar.
          </p>
          <div className="heat-lab-settings">
            <fieldset>
              <legend>A örneği</legend>
              <label htmlFor={`${uid}-material`}>A’nın malzemesi</label>
              <select
                id={`${uid}-material`}
                value={materialA}
                onChange={(e) =>
                  changeContact({ materialA: e.target.value, progress: 0 })
                }
              >
                <option value="water">Su · c=4200 J/(kg·°C)</option>
                <option value="aluminium">Alüminyum · c=900 J/(kg·°C)</option>
              </select>
              <ModelNumber
                label="A kütlesi (g)"
                min={100}
                max={1000}
                value={massA}
                onChange={(n) => changeContact({ massA: n, progress: 0 })}
              />
              <ModelNumber
                label="A ilk sıcaklığı (°C)"
                min={10}
                max={90}
                value={initialA}
                onChange={(n) => changeContact({ initialA: n, progress: 0 })}
              />
              <p>
                Isı sığası C<sub>A</sub> ={" "}
                <strong>{fmt(capacityA)} J/°C</strong>
              </p>
            </fieldset>
            <fieldset>
              <legend>B örneği · su</legend>
              <p>c=4200 J/(kg·°C)</p>
              <ModelNumber
                label="B kütlesi (g)"
                min={100}
                max={1000}
                value={massB}
                onChange={(n) => changeContact({ massB: n, progress: 0 })}
              />
              <ModelNumber
                label="B ilk sıcaklığı (°C)"
                min={10}
                max={90}
                value={initialB}
                onChange={(n) => changeContact({ initialB: n, progress: 0 })}
              />
              <p>
                Isı sığası C<sub>B</sub> ={" "}
                <strong>{fmt(capacityB)} J/°C</strong>
              </p>
            </fieldset>
          </div>
          <fieldset className="heat-prediction">
            <legend>Denge hangi ilk sıcaklığa daha yakın olur?</legend>
            <div className="heat-prediction-choices">
              {[
                ["a", "A’nın ilk sıcaklığına"],
                ["middle", "Tam ortaya / başlangıçlar eşitse aynı noktaya"],
                ["b", "B’nin ilk sıcaklığına"],
              ].map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`${uid}-prediction`}
                    value={value}
                    checked={saved.prediction === value}
                    onChange={() => set({ prediction: value, revealed: false })}
                  />
                  {label}
                </label>
              ))}
            </div>
            <label htmlFor={`${uid}-reason`}>Neden böyle düşündün?</label>
            <textarea
              id={`${uid}-reason`}
              rows={3}
              maxLength={500}
              value={saved.reason.slice(0, 500)}
              onChange={(e) => set({ reason: e.target.value, revealed: false })}
              placeholder="Kütle ve öz ısıyı birlikte düşün…"
            />
            <button
              className="secondary"
              type="button"
              disabled={!saved.prediction || !saved.reason.trim()}
              onClick={() => set({ revealed: true })}
            >
              Tahminimi modelle karşılaştır
            </button>
            {saved.revealed && (
              <div className="heat-reasoning" role="status">
                <strong>{nearest}</strong>
                <p>
                  T<sub>d</sub> = ({fmt(capacityA)} × {initialA} +{" "}
                  {fmt(capacityB)} × {initialB}) ÷ {fmt(capacityA + capacityB)}{" "}
                  = {fmt(contact.equilibrium, 2)} °C. Ağırlıkları sıcaklık değil
                  ısı sığası belirler.
                </p>
                <p>Gerekçen: {saved.reason.slice(0, 500)}</p>
              </div>
            )}
          </fieldset>
          <ModelNumber
            label="Temas ilerlemesi (%)"
            min={0}
            max={100}
            value={progress}
            onChange={(n) => set({ progress: n })}
          />
          <p className="small muted">
            Bu kontrol, dengeye kadar aktarılacak enerjinin yüzdesini seçer.
            Gerçek geçen süreyi, iletkenliği veya ısınma hızını temsil etmez.
          </p>
          <div className="heat-lab-vessels">
            {[
              {
                id: "A",
                temperature: contact.temperatureA,
                energy: contact.energyA,
                mass: massA,
                material: materialA === "water" ? "Su" : "Alüminyum",
              },
              {
                id: "B",
                temperature: contact.temperatureB,
                energy: contact.energyB,
                mass: massB,
                material: "Su",
              },
            ].map((v) => (
              <figure key={v.id}>
                <div
                  className="heat-thermometer"
                  role="img"
                  aria-label={`${v.id} örneği ${fmt(v.temperature, 2)} derece Celsius`}
                >
                  <span className="heat-thermometer-scale">100 °C</span>
                  <div className="heat-thermometer-tube">
                    <div
                      style={{ height: `${(v.temperature / 100) * 100}%` }}
                    />
                  </div>
                  <span className="heat-thermometer-scale">0 °C</span>
                </div>
                <figcaption>
                  <strong>
                    {v.id} · {v.material} · {v.mass} g
                  </strong>
                  <output>{fmt(v.temperature, 2)} °C</output>
                  <span>
                    Q<sub>{v.id}</sub> = {v.energy > 0 ? "+" : ""}
                    {fmt(v.energy)} J
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="heat-lab-balance" role="status">
            <strong>
              {inEquilibrium
                ? "Isıl denge: net ısı aktarımı yok."
                : initialA > initialB
                  ? "Net ısı akış yönü: A → B"
                  : "Net ısı akış yönü: B → A"}
            </strong>
            <p>
              Q<sub>A</sub> + Q<sub>B</sub> = {fmt(contact.energyA)} + (
              {fmt(contact.energyB)}) = 0 J.
            </p>
            <p>
              Hedef denge sıcaklığı:{" "}
              <strong>{fmt(contact.equilibrium, 2)} °C</strong>. Eşit olan
              sıcaklıktır; örneklerin iç enerjileri veya sıcaklık değişimleri
              eşit olmak zorunda değildir.
            </p>
          </div>
        </div>
      ) : (
        <div className="heat-curve">
          <h4>Enerji geldi, sıcaklık neden durdu?</h4>
          <p>
            Normal atmosfer basıncında −10 °C saf buzdan 20 °C suya geçiş. Kap,
            iş ve kayıplar ihmal edilir; c<sub>buz</sub>=2,1 J/(g·°C), L=334
            J/g, c<sub>su</sub>=4,2 J/(g·°C) sabit kabul edilir. Bu, hâl
            değişimi konusuna kısa bir köprüdür.
          </p>
          <ModelNumber
            label="Buzun başlangıç kütlesi (g)"
            min={50}
            max={200}
            value={iceMass}
            onChange={(n) => set({ iceMass: n })}
          />
          <ModelNumber
            label="Aktarılan enerji payı (%)"
            min={0}
            max={100}
            value={energyPercent}
            onChange={(n) => set({ energyPercent: n })}
          />
          <svg
            viewBox="0 0 530 245"
            role="img"
            aria-label={`Sıcaklık–alınan enerji grafiği: ${fmt(curve.energy)} joule aktarıldı; sıcaklık ${fmt(curve.temperature, 2)} derece Celsius. ${curve.phase}. Sıvılaşan pay yüzde ${fmt(curve.liquidFraction * 100)}.`}
          >
            <path d="M48 26V188H500" stroke="var(--muted)" fill="none" />
            <path
              d={`M48 ${graphY(0)}H488`}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <polyline
              points={`48,${graphY(-10)} ${graphX(curve.warmIce)},${graphY(0)} ${graphX(curve.warmIce + curve.melt)},${graphY(0)} 488,${graphY(20)}`}
              stroke="var(--accent)"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx={graphX(curve.energy)}
              cy={graphY(curve.temperature)}
              r="7"
              fill="var(--mint)"
              stroke="var(--text)"
              strokeWidth="2"
            />
            <g fill="var(--text)" fontSize="13">
              <text x="8" y="20">
                T (°C)
              </text>
              <text x="14" y={graphY(20) + 4}>
                20
              </text>
              <text x="22" y={graphY(0) + 4}>
                0
              </text>
              <text x="8" y="192">
                −10
              </text>
              <text x="46" y="211">
                0
              </text>
              <text x="488" y="211" textAnchor="end">
                {fmt(curve.maximum, 0)}
              </text>
              <text x="490" y="235" textAnchor="end">
                Alınan enerji Q (J)
              </text>
            </g>
          </svg>
          <div className="heat-lab-balance" role="status">
            <strong>
              {curve.phase} · {fmt(curve.temperature, 2)} °C
            </strong>
            <p>
              Aktarılan enerji: {fmt(curve.energy)} J. Başlangıç kütlesinin %
              {fmt(curve.liquidFraction * 100)} kadarı sıvı hâlde.
            </p>
          </div>
          <div
            className="heat-phase-bar"
            role="img"
            aria-label={`Sıvı yüzde ${fmt(curve.liquidFraction * 100)}, buz yüzde ${fmt((1 - curve.liquidFraction) * 100)}`}
          >
            <span style={{ width: `${(1 - curve.liquidFraction) * 100}%` }} />
            <span style={{ width: `${curve.liquidFraction * 100}%` }} />
          </div>
          <p className="small">
            Açık alan: buz; koyu alan: sıvı su. Şerit, toplam başlangıç
            kütlesinin hâllere dağılımını gösterir; gerçek hacim değildir.
          </p>
          <dl className="heat-energy-steps">
            <div>
              <dt>Buzu −10 → 0 °C ısıt</dt>
              <dd>{fmt(curve.warmIce)} J · mcΔT</dd>
            </div>
            <div>
              <dt>0 °C’de tüm buzu erit</dt>
              <dd>{fmt(curve.melt)} J · mL</dd>
            </div>
            <div>
              <dt>Suyu 0 → 20 °C ısıt</dt>
              <dd>{fmt(iceMass * 4.2 * 20)} J · mcΔT</dd>
            </div>
          </dl>
          <p>
            {curve.energy < curve.warmIce
              ? "Tek hâl: enerji artışı buzun sıcaklığını yükseltiyor."
              : curve.energy < curve.warmIce + curve.melt
                ? "Erime basamağında enerji aktarımı sürüyor. Sıcaklık 0 °C kalırken sıvı oranı artıyor; ΔT=0, Q=0 demek değildir."
                : "Buz tamamen eridi. Artan enerji artık sıvı suyun sıcaklığını yükseltiyor."}
          </p>
          <p className="small muted">
            Yatay eksen zaman değildir. Kütle değişince gereken J miktarı
            değişir; grafiğin yatay ölçeği yeni toplam enerjiye göre yeniden
            çizilir. Eğim karşılaştırırken eksendeki sayıyı da oku.
          </p>
        </div>
      )}
      <p className="small muted">
        Seçimlerin ve gerekçen bu cihazda saklanır. Bu keşif XP, ustalık veya
        soru doğrusu oluşturmaz; bağımsız sorular Sorular bölümündedir.
      </p>
    </section>
  );
}
