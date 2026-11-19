import { useId } from "react";
import { useExploration } from "./useExploration";
import "./periodicReasoning.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const labs = {
  "elementlerin-siniflandirilmasi": {
    title: "Konumdan kanıta: sınıfı keşfet",
    cases: [
      {
        name: "Hidrojen",
        labels: ["1. grup", "H", "Ametal"],
        values: [1, 1, 1],
        why: "Hidrojenin 1. gruptaki konumu onu alkali metal yapmaz. Sınıfı ametaldir.",
      },
      {
        name: "Cıva",
        labels: ["Metal", "Hg", "Sıvı"],
        values: [1, 1, 1],
        why: "Oda koşullarında sıvı olan cıva metaldir. Katı olma genellemesinin istisnasını görüyorsun.",
      },
      {
        name: "Grafit",
        labels: ["Karbon", "Grafit", "İletken"],
        values: [1, 1, 1],
        why: "Karbonun grafit biçimi elektrik iletir. İletken olmak tek başına metal sınıfını kanıtlamaz.",
      },
      {
        name: "Silisyum",
        labels: ["Katı", "Si", "Yarı metal"],
        values: [1, 1, 1],
        why: "Silisyum yarı iletkendir; fiziksel ve kimyasal kanıtları birlikte kullanarak sınıflandırılır.",
      },
    ],
  },
  "atom-capi-karsilastirma": {
    title: "Elektron bulutlarını karşılaştır",
    cases: [
      {
        name: "Aynı grup: Li, Na, K",
        labels: ["Li", "Na", "K"],
        values: [24, 35, 46],
        why: "Aşağı indikçe yeni katmanlar ve perdeleme artar. Bağıl büyüklük: Li < Na < K.",
      },
      {
        name: "Aynı periyot: Na, Mg, Al",
        labels: ["Na", "Mg", "Al"],
        values: [46, 35, 26],
        why: "Katman sayısı aynıyken etkin çekim artar. Bağıl büyüklük: Na > Mg > Al.",
      },
      {
        name: "Eş elektronlu: F⁻, Na⁺, Mg²⁺",
        labels: ["F⁻: 9p, 10e", "Na⁺: 11p, 10e", "Mg²⁺: 12p, 10e"],
        values: [46, 33, 25],
        why: "Hepsi 10 elektrondur. Daha çok proton aynı elektron bulutunu daha güçlü çeker: F⁻ > Na⁺ > Mg²⁺.",
      },
    ],
  },
  "iyonlasma-enerjisi": {
    title: "Genel eğilim mi, istisna mı?",
    cases: [
      {
        name: "Na, Mg, Al: ilk iyonlaşma",
        labels: ["Na", "Mg", "Al"],
        values: [496, 738, 578],
        why: "Yaklaşık ilk iyonlaşma enerjileri kJ/mol. Mg’nin dolu s düzeni istisna yaratır: Na < Al < Mg.",
      },
      {
        name: "N, O, F: ilk iyonlaşma",
        labels: ["N", "O", "F"],
        values: [1402, 1314, 1681],
        why: "Yaklaşık ilk iyonlaşma enerjileri kJ/mol. O’nun p elektron eşleşmesi kopmayı kolaylaştırır; O < N < F.",
      },
      {
        name: "Ana grup X: ardışık koparmalar",
        labels: ["İE₁", "İE₂", "İE₃"],
        values: [900, 1750, 14850],
        why: "Bu örnek ana grup atomunda sıçrama ikinci koparmadan sonradır. İlk iki elektron değerlik katmanındadır; değerlik elektron sayısı 2’dir.",
      },
    ],
  },
  "elektron-ilgisi-elektronegatiflik": {
    title: "Süreci gör: koparma, alma, paylaşma",
    cases: [
      {
        name: "İyonlaşma: elektronu kopar",
        labels: ["X(g)", "+ enerji", "X⁺(g) + e⁻"],
        values: [1, 1, 1],
        why: "Elektron atomdan uzaklaşır; enerji verilmesi gerekir. Bu iyonlaşmadır, elektron alma değildir.",
      },
      {
        name: "Elektron ilgisi: elektron ekle",
        labels: ["X(g) + e⁻", "ΔE < 0 ise", "X⁻(g) + enerji"],
        values: [1, 1, 1],
        why: "Gaz atomu elektron alır. Negatif ΔE tanımı altında enerji açığa çıkar. Her elektron alma sürecinin enerji verdiğini genelleme.",
      },
      {
        name: "Elektronegatiflik: bağ elektronunu çek",
        labels: ["H δ⁺", "ortak elektronlar →", "Cl δ⁻"],
        values: [1, 1, 1],
        why: "Ortak elektronlar Cl tarafına daha çok çekilir. Buradaki δ işaretleri kısmi yüklerdir; tam iyon yükleri değildir.",
      },
    ],
  },
} as const;
export default function PeriodicReasoning({ id }: { id: string }) {
  const lab = labs[id as keyof typeof labs];
  const uid = useId();
  const [state, set] = useExploration(`periodic-reasoning:${id}`, {
    selected: 0,
    revealed: false,
  });
  const index = Math.min(
    lab.cases.length - 1,
    Math.max(0, Number(state.selected) || 0),
  );
  const item = lab.cases[index];
  const radius = id === "atom-capi-karsilastirma";
  const bars = id === "iyonlasma-enerjisi";
  return (
    <section
      className="visual-lab periodic-comparison"
      aria-labelledby={`${uid}-title`}
    >
      <h2 id={`${uid}-title`}>{lab.title}</h2>
      <p>
        Bir durum seç. Önce değişimin nedenini kendi cümlenle tahmin et; sonra
        gerekçeyi aç.
      </p>
      <label htmlFor={`${uid}-case`}>İncelenecek durum</label>
      <ChoiceSelect
        id={`${uid}-case`}
        value={index}
        onChange={(e) =>
          set({ selected: Number(e.target.value), revealed: false })
        }
      >
        {lab.cases.map((c, i) => (
          <option key={c.name} value={i}>
            {c.name}
          </option>
        ))}
      </ChoiceSelect>
      {radius || bars ? (
        <svg
          viewBox="0 0 600 230"
          role="img"
          aria-label={`${item.name}. ${radius ? "Bağıl büyüklük şeması; sayısal yarıçap ölçeği değildir." : item.values.map((n, i) => `${item.labels[i]} ${n} kJ/mol`).join(", ")}`}
        >
          {item.values.map((n, i) => (
            <g key={i}>
              {radius ? (
                <circle
                  cx={100 + i * 200}
                  cy="100"
                  r={n}
                  fill="var(--accent)"
                  fillOpacity=".3"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              ) : (
                <rect
                  x={60 + i * 200}
                  y={165 - (n / Math.max(...item.values)) * 130}
                  width="80"
                  height={(n / Math.max(...item.values)) * 130}
                  rx="6"
                  fill="var(--accent)"
                />
              )}
              <text
                x={100 + i * 200}
                y="195"
                textAnchor="middle"
                fill="currentColor"
                fontSize="17"
              >
                {item.labels[i]}
              </text>
              {bars && (
                <text
                  x={100 + i * 200}
                  y="222"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="16"
                >
                  {n}
                </text>
              )}
            </g>
          ))}
        </svg>
      ) : (
        <ol className="periodic-evidence">
          {item.labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ol>
      )}
      <p>Soldan sağa: {item.labels.join(" · ")}</p>
      {bars && (
        <ul>
          {item.values.map((value, i) => (
            <li key={item.labels[i]}>
              {item.labels[i]}: {value} kJ/mol
            </li>
          ))}
        </ul>
      )}
      <p className="muted">
        {radius
          ? "Daireler yalnız göreli sıralamayı temsil eder; gerçek atom görüntüsü veya ölçülmüş yarıçaplar değildir."
          : bars
            ? "Sütunlar seçili örnek içinde doğrusal ölçeklidir. Birim: kJ/mol. Durum değişince ölçek yeniden hesaplanır."
            : "Adımlar bir kanıt veya süreç şemasıdır; parçacıkların gerçek görüntüsü değildir."}
      </p>
      <button
        className="secondary"
        aria-expanded={Boolean(state.revealed)}
        onClick={() => set({ revealed: !state.revealed })}
      >
        {state.revealed ? "Gerekçeyi gizle" : "Gerekçeyi göster"}
      </button>
      {state.revealed && <p role="status">{item.why}</p>}
      <p className="lab-caption">
        Keşif ve tahmin puan kazandırmaz. Sorular bölümündeki cevapların ayrıca
        kaydedilir.
      </p>
    </section>
  );
}
