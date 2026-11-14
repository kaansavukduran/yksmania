import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";
const soundExamples = [
  {
    name: "kitabı",
    before: ["kitap", "ı"],
    after: "kitabı",
    event: "Ünsüz yumuşaması",
    change: "Kökün sonundaki p, b oldu. Ek ünlüyle başlar.",
  },
  {
    name: "kitapta",
    before: ["kitap", "da"],
    after: "kitapta",
    event: "Ünsüz benzeşmesi",
    change: "Kökün p’si korunur; ek başındaki d, t oldu.",
  },
  {
    name: "burnu",
    before: ["burun", "u"],
    after: "burnu",
    event: "Ünlü düşmesi",
    change: "Kökün ikinci hecesindeki u düştü. Ekin u’su korunur.",
  },
  {
    name: "bekliyor",
    before: ["bekle", "yor"],
    after: "bekliyor",
    event: "Ünlü daralması",
    change: "Kök sonundaki geniş e, dar i’ye dönüştü.",
  },
  {
    name: "affet",
    before: ["af", "et"],
    after: "affet",
    event: "Ünsüz türemesi",
    change: "Bir f daha ortaya çıktı. Son biçimde iki f var.",
  },
  {
    name: "evi",
    before: ["ev", "i"],
    after: "evi",
    event: "Bu örnekte ünlü türemesi yok",
    change: "i zaten ekin kendisi. Her ünlü eklenişi ses türemesi sayılmaz.",
  },
];
export function SoundModel() {
  const [saved, set] = useExploration("word-sound-transform", {
    example: 0,
    joined: false,
  });
  const item =
    soundExamples[clampInt(saved.example, 0, soundExamples.length - 1)];
  return (
    <section className="concept-model" aria-label="Ses değişimi keşfi">
      <h3>Önceki biçimle karşılaştır</h3>
      <div className="walk-scenarios">
        {soundExamples.map((s, i) => (
          <button
            className="secondary"
            key={s.name}
            aria-pressed={s === item}
            onClick={() => set({ example: i, joined: false })}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div
        className={`word-transform ${saved.joined ? "joined" : ""}`}
        aria-live="polite"
      >
        <p>
          <span className="small muted">Önceki parçalar</span>
          <span className="word-parts">
            {item.before.map((part, i) => (
              <span key={i}>
                {i > 0 && <span aria-hidden="true"> + </span>}
                <strong>{part}</strong>
              </span>
            ))}
          </span>
        </p>
        <p className="word-final">
          <span className="small muted">Standart son biçim</span>
          <strong>
            {saved.joined ? item.after : "Birleştirince göreceksin"}
          </strong>
        </p>
      </div>
      <button
        className="secondary"
        aria-pressed={saved.joined}
        onClick={() => set({ joined: !saved.joined })}
      >
        {saved.joined ? "Kök ve eki yeniden ayır" : "Eki birleştir"}
      </button>
      {saved.joined && (
        <p className="model-result">
          <strong>{item.event}</strong> · {item.change}
        </p>
      )}
      <p className="small muted">
        Önceki parçalar karşılaştırma içindir; ara yazımlar standart yazım
        önerisi değildir. Bu bir ses kaydı veya söyleyiş ölçümü değildir.
      </p>
    </section>
  );
}
const families = [
  {
    name: "Gözlükçüler",
    steps: [
      {
        word: "göz",
        part: "göz",
        kind: "Ad kökü",
        detail: "Görme organı anlamı sonraki türetmelerle ilişkilidir.",
      },
      {
        word: "gözlük",
        part: "-lük",
        kind: "Yapım eki",
        detail: "Gözle ilişkili nesne adı türedi; ilk gövde.",
      },
      {
        word: "gözlükçü",
        part: "-çü",
        kind: "Yapım eki",
        detail: "İş/meslek kişisi adı türedi; ikinci gövde.",
      },
      {
        word: "gözlükçüler",
        part: "-ler",
        kind: "Çekim eki",
        detail: "Çokluk eklendi; yeni sözcük türemedi. Yapı türemiştir.",
      },
    ],
  },
  {
    name: "Evlerimizden",
    steps: [
      {
        word: "ev",
        part: "ev",
        kind: "Ad kökü",
        detail: "Yapım eki yok; basit taban.",
      },
      {
        word: "evler",
        part: "-ler",
        kind: "Çekim eki",
        detail: "Çokluk; yeni nesne adı türetilmedi.",
      },
      {
        word: "evlerimiz",
        part: "-imiz",
        kind: "Çekim eki",
        detail: "İyelik: bizim evlerimiz.",
      },
      {
        word: "evlerimizden",
        part: "-den",
        kind: "Çekim eki",
        detail: "Ayrılma ilişkisi eklendi. Uzun olsa da yapı basittir.",
      },
    ],
  },
];
export function WordStructureModel() {
  const [saved, set] = useExploration("word-structure", { family: 0, step: 0 });
  const family = families[clampInt(saved.family, 0, 1)],
    step = clampInt(saved.step, 0, family.steps.length - 1),
    current = family.steps[step];
  return (
    <section className="concept-model" aria-label="Kök gövde ek keşfi">
      <h3>Sözcüğü basamak basamak kur</h3>
      <div className="walk-scenarios">
        {families.map((f, i) => (
          <button
            className="secondary"
            key={f.name}
            aria-pressed={f === family}
            onClick={() => set({ family: i, step: 0 })}
          >
            {f.name}
          </button>
        ))}
      </div>
      <div className="word-branches" aria-label="Türetme ve çekim basamakları">
        {family.steps.map((item, i) => (
          <button
            key={item.word}
            className="secondary"
            aria-pressed={step === i}
            onClick={() => set({ step: i })}
          >
            <strong>{item.word}</strong>
            <span>
              {item.part} · {item.kind}
            </span>
          </button>
        ))}
      </div>
      <p className="model-result" aria-live="polite">
        <strong>
          {current.word}: {current.kind}
        </strong>{" "}
        · {current.detail}
      </p>
      <p className="small muted">
        Basamaklara dokun; her adımda yeni sözcük mü, cümle ilişkisi mi
        kurulduğunu denetle. Model seçili bağlamları gösterir; yalnız harflere
        bakarak bütün ekleri sınıflandırmaz.
      </p>
    </section>
  );
}
