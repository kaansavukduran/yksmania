import { useId } from "react";
import {
  covalentPairs,
  covalentPairResult,
  polarityMolecules,
  rotateChemistryVector,
  sumBondVectors,
  type DipoleVector,
  type PolarityMolecule,
} from "./forge093Chemistry";
import { useExploration } from "./useExploration";
import "./forge093Chemistry.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const number = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const fmt = (n: number) => number.format(Math.abs(n) < 1e-9 ? 0 : n);
const project = (vector: DipoleVector, angle: number, scale = 130) => {
  const [x, y, z] = rotateChemistryVector(vector, angle);
  return { x: 260 + x * scale, y: 190 - y * scale, depth: z };
};
const multiply = (v: DipoleVector, value: number): DipoleVector => [
  v[0] * value,
  v[1] * value,
  v[2] * value,
];

function MoleculeDrawing({
  molecule,
  angle,
  vectors,
  selected,
  marker,
}: {
  molecule: PolarityMolecule;
  angle: number;
  vectors: boolean;
  selected: number;
  marker: string;
}) {
  const net = sumBondVectors(molecule.directions, molecule.weights);
  const space =
    molecule.shape === "Dört yüzlü" || molecule.shape === "Üçgen piramit";
  const end = project(net.vector, angle, 70);
  return (
    <svg
      viewBox="0 0 520 380"
      role="img"
      aria-label={`${molecule.formula}, ${molecule.shape}. ${molecule.explanation} ${vectors ? "Bağ dipolleri ve varsa net dipol gösteriliyor." : "Dipol okları henüz açılmadı."}`}
    >
      <defs>
        <marker
          id={`${marker}-bond`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0L6 3L0 6Z" className="f093c-arrow-tip" />
        </marker>
        <marker
          id={`${marker}-net`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0 0L6 3L0 6Z" className="f093c-net-tip" />
        </marker>
      </defs>
      {molecule.directions.map((direction, i) => {
        const p = project(direction, angle),
          dx = p.x - 260,
          dy = p.y - 190;
        const length = Math.hypot(dx, dy) || 1,
          ux = dx / length,
          uy = dy / length;
        const start = project(
          multiply(direction, 0.5 - molecule.weights[i] * 0.12),
          angle,
        );
        const finish = project(
          multiply(direction, 0.5 + molecule.weights[i] * 0.12),
          angle,
        );
        return (
          <g key={i}>
            {space && p.depth > 0.15 ? (
              <path
                d={`M${260 - uy * 2},${190 + ux * 2} L${p.x - uy * 7},${p.y + ux * 7} L${p.x + uy * 7},${p.y - ux * 7}Z`}
                className="f093c-wedge"
              />
            ) : (
              Array.from({ length: molecule.orders[i] }, (_, order) => {
                const offset = (order - (molecule.orders[i] - 1) / 2) * 8;
                return (
                  <line
                    key={order}
                    x1={260 - uy * offset}
                    y1={190 + ux * offset}
                    x2={p.x - uy * offset}
                    y2={p.y + ux * offset}
                    className="f093c-bond"
                    strokeDasharray={
                      space && p.depth < -0.15 ? "6 6" : undefined
                    }
                  />
                );
              })
            )}
            {vectors && (
              <line
                data-bond-dipole="true"
                x1={start.x}
                y1={start.y}
                x2={finish.x}
                y2={finish.y}
                className="f093c-bond-dipole"
                markerEnd={`url(#${marker}-bond)`}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r="25"
              className={i === selected ? "f093c-atom selected" : "f093c-atom"}
            />
            <text x={p.x} y={p.y + 8} textAnchor="middle">
              {molecule.ligands[i]}
            </text>
          </g>
        );
      })}
      {vectors && net.polar && (
        <line
          data-net-dipole="true"
          x1="260"
          y1="190"
          x2={end.x}
          y2={end.y}
          className="f093c-net-dipole"
          markerEnd={`url(#${marker}-net)`}
        />
      )}
      <circle cx="260" cy="190" r="27" className="f093c-center" />
      <text x="260" y="198" textAnchor="middle">
        {molecule.center}
      </text>
    </svg>
  );
}

export default function Forge093ChemistryLab({ id }: { id: string }) {
  const marker = useId().replace(/:/g, "");
  const molecular = id === "molekullerde-polarlik-apolarlik";
  const [saved, set] = useExploration(`forge093:chemistry:${id}`, {
    pair: "h2",
    stage: 0,
    molecule: "co2",
    vectors: false,
    angle: 25,
    bond: 0,
    prediction: "",
    reason: "",
    checked: false,
  });
  const pair =
    covalentPairs.find((item) => item.id === saved.pair) ?? covalentPairs[0];
  const pairResult = covalentPairResult(pair);
  const stage = Number.isFinite(saved.stage)
    ? Math.max(0, Math.min(2, Math.round(saved.stage)))
    : 0;
  const molecule =
    polarityMolecules.find((item) => item.id === saved.molecule) ??
    polarityMolecules[0];
  const bond = Number.isFinite(saved.bond)
    ? Math.max(
        0,
        Math.min(molecule.directions.length - 1, Math.round(saved.bond)),
      )
    : 0;
  const angle = Number.isFinite(saved.angle)
    ? ((saved.angle % 360) + 360) % 360
    : 25;
  const net = sumBondVectors(molecule.directions, molecule.weights);
  const polar = molecular ? net.polar : pairResult.polar;
  const reason = saved.reason.slice(0, 500);
  const prediction = ["polar", "apolar"].includes(saved.prediction)
    ? saved.prediction
    : "";
  const correct = prediction === (polar ? "polar" : "apolar");
  const cloudShift = pairResult.difference * 24;
  const negative = pairResult.difference > 0 ? pair.atoms[1] : pair.atoms[0];
  return (
    <section
      className="visual-lab forge093-chemistry"
      data-forge093={id}
      aria-labelledby={`${marker}-title`}
    >
      <h2 id={`${marker}-title`}>
        {molecular ? "Şekli kur, yönleri dengele" : "Ortak çiftten kısmi yüke"}
      </h2>
      <p>
        {molecular
          ? "Molekülü seç, tahminini yap; üç boyutlu yönlerin toplamını incele. Görünümü döndürmek molekülün kutupluluğunu değiştirmez."
          : "Bir bağ seç. Önce ortak elektronları say; sonra eşit ve eşitsiz paylaşımın farkını gör."}
      </p>
      {molecular ? (
        <>
          <label htmlFor={`${marker}-molecule`}>Molekül örneği</label>
          <ChoiceSelect
            id={`${marker}-molecule`}
            value={molecule.id}
            onChange={(e) =>
              set({
                molecule: e.target.value,
                bond: 0,
                prediction: "",
                checked: false,
                vectors: false,
              })
            }
          >
            {polarityMolecules.map((item) => (
              <option key={item.id} value={item.id}>
                {item.formula}
              </option>
            ))}
          </ChoiceSelect>
          <dl className="f093c-facts">
            <div>
              <dt>Atom geometrisi</dt>
              <dd>{molecule.shape}</dd>
            </div>
            <div>
              <dt>Merkez ve bağlı uçlar</dt>
              <dd>
                {molecule.center} · {molecule.ligands.join(", ")}
              </dd>
            </div>
            <div>
              <dt>Merkezde bölgeler</dt>
              <dd>
                {molecule.ligands.length} bağ yönü + {molecule.lonePairs} yalnız
                çift
              </dd>
            </div>
          </dl>
          <MoleculeDrawing
            molecule={molecule}
            angle={angle}
            vectors={saved.vectors}
            selected={bond}
            marker={marker}
          />
          <p className="small muted">
            {molecule.shape === "Dört yüzlü" ||
            molecule.shape === "Üçgen piramit"
              ? "Üç boyutlu modelin düz ekrana izdüşümü: kalın kama öne, kesik bağlantı arkaya yönelir. Bütün elektronlar gösterilmez."
              : "Bağlantı ve yön şemasıdır; gerçek atom çapı, bağ uzunluğu veya elektron yoğunluğu ölçekli gösterilmez."}
          </p>
          <div className="f093c-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => set({ vectors: !saved.vectors })}
            >
              {saved.vectors ? "Okları ve neti kapat" : "Okları ve neti göster"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => set({ angle: (angle + 35) % 360 })}
            >
              Şekli döndür
            </button>
          </div>
          <label htmlFor={`${marker}-bond-choice`}>İncelenecek bağ</label>
          <ChoiceSelect
            id={`${marker}-bond-choice`}
            value={bond}
            onChange={(e) => set({ bond: Number(e.target.value) })}
          >
            {molecule.ligands.map((atom, i) => (
              <option key={i} value={i}>
                {molecule.center}–{atom} · {i + 1}. yön
              </option>
            ))}
          </ChoiceSelect>
          <div className="f093c-result" data-model-result role="status">
            <strong>
              {molecule.formula} ·{" "}
              {saved.vectors
                ? net.polar
                  ? "Polar molekül"
                  : "Apolar molekül"
                : molecule.shape}
            </strong>
            <p>
              {saved.vectors
                ? molecule.explanation
                : "Net sonucu açmadan önce eşdeğer bağları ve yönleri karşılaştır. Yalnız geometri adı veya yalnız çift sayısı kararın tamamı değildir."}
            </p>
            {saved.vectors && (
              <>
                <p>
                  Üç boyutlu net model vektörü: ({fmt(net.vector[0])},{" "}
                  {fmt(net.vector[1])}, {fmt(net.vector[2])}). Büyüklük:{" "}
                  {fmt(net.magnitude)} göreli birim.
                </p>
                <p>
                  {net.polar
                    ? "Üç boyutlu toplam sıfırdan farklıdır. Ekranda bir bileşenin kısalması bu sonucu değiştirmez."
                    : "Üç boyutlu toplam sıfırdır; bağlar polar olsa da molekülün kalıcı net dipolü yoktur."}
                </p>
              </>
            )}
            <p>
              Seçili {molecule.center}–{molecule.ligands[bond]} bağı: ok{" "}
              {molecule.weights[bond] > 0
                ? `${molecule.center} atomundan ${molecule.ligands[bond]} ucuna`
                : `${molecule.ligands[bond]} ucundan ${molecule.center} atomuna`}{" "}
              yönelir. Şemadaki ağırlık: {fmt(Math.abs(molecule.weights[bond]))}
              .
            </p>
            <p className="small muted">
              Ağırlıklar yön toplamını göstermek için seçilmiştir: C–H için 0,2,
              diğer gösterilen bağlar için 1. Bunlar ölçülmüş debye değerleri
              veya elektronegatiflikten hesaplanmış momentler değildir. Görünüm
              açısı: {fmt(angle)}°.
            </p>
          </div>
        </>
      ) : (
        <>
          <label htmlFor={`${marker}-pair`}>Bağ örneği</label>
          <ChoiceSelect
            id={`${marker}-pair`}
            value={pair.id}
            onChange={(e) =>
              set({
                pair: e.target.value,
                stage: 0,
                prediction: "",
                checked: false,
              })
            }
          >
            {covalentPairs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.formula}
              </option>
            ))}
          </ChoiceSelect>
          <p>
            Verilen nötr değerlik elektronları: {pair.atoms[0]} için{" "}
            {pair.valence[0]}, {pair.atoms[1]} için {pair.valence[1]}. Toplam{" "}
            {pairResult.total} elektron.
          </p>
          <svg
            viewBox="0 0 520 250"
            role="img"
            aria-label={`${pair.formula}. ${stage === 0 ? "İki atom için başlangıç bütçesi; bağ henüz açılmadı." : `${pair.order} ortak çift, ${pairResult.shared} bağ elektronu.`} ${stage === 2 ? (pairResult.polar ? `Ortak yoğunluk ${negative} tarafına kayar; kısmi yükler oluşur.` : "Eş uçlar ortak elektronları eşit çeker.") : "Kutuplanma henüz açılmadı."}`}
          >
            <defs>
              <marker
                id={`${marker}-pair-arrow`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0L6 3L0 6Z" className="f093c-arrow-tip" />
              </marker>
            </defs>
            {stage === 2 && (
              <ellipse
                cx={260 + cloudShift}
                cy="125"
                rx="119"
                ry="61"
                className="f093c-cloud"
              />
            )}
            {stage >= 1 &&
              Array.from({ length: pair.order }, (_, i) => (
                <line
                  key={i}
                  x1="164"
                  y1={125 + (i - (pair.order - 1) / 2) * 13}
                  x2="356"
                  y2={125 + (i - (pair.order - 1) / 2) * 13}
                  className="f093c-bond"
                />
              ))}
            {[145, 375].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="125" r="37" className="f093c-atom" />
                <text x={x} y="133" textAnchor="middle">
                  {pair.atoms[i]}
                </text>
                {stage === 2 && pairResult.polar && (
                  <text x={x} y="63" textAnchor="middle">
                    {(i === 1
                      ? pairResult.difference
                      : -pairResult.difference) > 0
                      ? "δ−"
                      : "δ+"}
                  </text>
                )}
              </g>
            ))}
            {stage === 2 && pairResult.polar && (
              <line
                data-bond-dipole="true"
                x1={pairResult.difference > 0 ? "205" : "315"}
                y1="205"
                x2={pairResult.difference > 0 ? "315" : "205"}
                y2="205"
                className="f093c-bond-dipole"
                markerEnd={`url(#${marker}-pair-arrow)`}
              />
            )}
          </svg>
          <div className="f093c-actions">
            <button
              type="button"
              className="secondary"
              disabled={stage === 0}
              onClick={() => set({ stage: stage - 1 })}
            >
              Önceki bağ adımı
            </button>
            <button
              type="button"
              className="secondary"
              disabled={stage === 2}
              onClick={() => set({ stage: stage + 1 })}
            >
              Sonraki bağ adımı
            </button>
            <button
              type="button"
              className="text-button"
              onClick={() => set({ stage: 0, prediction: "", checked: false })}
            >
              Baştan incele
            </button>
          </div>
          <div className="f093c-result" data-model-result role="status">
            <strong>
              {pair.formula} ·{" "}
              {stage === 0
                ? "Önce bütçeyi kur"
                : stage === 1
                  ? "Ortak elektronları say"
                  : pairResult.polar
                    ? "Polar kovalent bağ"
                    : "Apolar kovalent bağ"}
            </strong>
            <p>
              {stage === 0
                ? "Başlangıç atomlarının değerlik elektronları sayıldı. Sonraki adım ortak çifti gösterir; boş bağ alanı elektronların yokluğu değildir."
                : `${pair.order} ortak çift = ${pairResult.shared} ortak elektron. Toplam ${pairResult.total} elektrondan ${pairResult.nonbonding} bağ dışı elektron kalır. Bir çizgi iki elektrondur.`}
            </p>
            <p>
              Yaklaşık Pauling değerleri: {pair.atoms[0]}{" "}
              {fmt(pair.electronegativity[0])}; {pair.atoms[1]}{" "}
              {fmt(pair.electronegativity[1])}. Farkın büyüklüğü{" "}
              {fmt(Math.abs(pairResult.difference))}.
            </p>
            {stage === 2 && (
              <p>
                {pairResult.polar
                  ? `${negative} daha çok çeker ve kısmi negatif uçtur; diğer uç kısmi pozitiftir. δ, tam iyon yükü değildir; seçilen molekül nötrdür.`
                  : "Aynı iki atom ortak elektronları eşit çeker; kalıcı kısmi negatif uç seçilemez. Bağın mertebesi bu eşliği bozmaz."}
              </p>
            )}
            <p className="small muted">
              Bulut nitel bir paylaşım şemasıdır; ölçülmüş elektron yoğunluğu
              veya orbital değildir. Elektronegatiflik farkı tek başına bağ
              enerjisini veya ölçülmüş dipol büyüklüğünü vermez.
            </p>
          </div>
        </>
      )}
      <p className="small muted">
        Oklar kimyasal kutuplanma gösterimidir: kısmi pozitif uçtan kısmi
        negatif uca, δ+ → δ− yönelir. Renklerin yanında yön ve sayılar metinde
        de açıklanır.
      </p>
      <fieldset className="f093c-prediction">
        <legend>Önce tahmin et, sonra gerekçeni karşılaştır</legend>
        <label htmlFor={`${marker}-prediction`}>
          {molecular
            ? "Molekül kutupluluğu tahminin"
            : "Bağ kutupluluğu tahminin"}
        </label>
        <ChoiceSelect
          id={`${marker}-prediction`}
          value={prediction}
          onChange={(e) => set({ prediction: e.target.value, checked: false })}
        >
          <option value="">Bir sonuç seç</option>
          <option value="polar">Polar</option>
          <option value="apolar">Apolar</option>
        </ChoiceSelect>
        <label htmlFor={`${marker}-reason`}>Tahmininin gerekçesi</label>
        <textarea
          id={`${marker}-reason`}
          rows={3}
          maxLength={500}
          value={reason}
          onChange={(e) => set({ reason: e.target.value, checked: false })}
          placeholder={
            molecular
              ? "Eş bağları ve gerçek yönleri birlikte düşün…"
              : "Paylaşımı, bağ sayısını ve iki ucun çekimini ayır…"
          }
        />
        <button
          type="button"
          className="secondary"
          disabled={!prediction || !reason.trim()}
          onClick={() => set({ checked: true, vectors: true, stage: 2 })}
        >
          Kuralı kontrol et
        </button>
        {saved.checked && (
          <div className="f093c-feedback" role="status">
            <strong>
              {correct
                ? "Tahminin modelin koşullarıyla uyuşuyor."
                : "Tahminini modelin koşullarıyla yeniden karşılaştır."}
            </strong>
            <p>
              {molecular
                ? molecule.explanation
                : pairResult.polar
                  ? `${negative} ortak elektronları daha güçlü çeker; bağ polar kovalenttir. Bu kısmi yük, tam iyon yükü değildir.`
                  : "Eş atomların çekimi eşittir; bağ apolar kovalenttir. Çoklu bağda da aynı iki uç eş kalır."}
            </p>
            <p>Gerekçen: {reason}</p>
          </div>
        )}
      </fieldset>
      <p className="small muted">
        Seçimlerin ve gerekçen bu cihazda saklanır. Bu keşif XP, ustalık,
        bağımsız soru doğrusu veya konu tamamlama kaydı oluşturmaz.
      </p>
    </section>
  );
}
