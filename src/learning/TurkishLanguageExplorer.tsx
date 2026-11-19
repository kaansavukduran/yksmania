import { useId } from "react";
import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";
import "./turkish-language.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

export const soundCases = [
  {
    base: "kitap",
    suffix: "ı",
    result: "kitabı",
    event: "Yumuşama",
    evidence:
      "Kök sonundaki p → b; ünlüyle başlayan -ı geldi. Ekin ı’sı yeni bir türeme değildir.",
  },
  {
    base: "kitap",
    suffix: "da",
    result: "kitapta",
    event: "Benzeşme",
    evidence:
      "Sert p’den sonra ek başındaki d → t. Kökün p’si değişmedi; bu yüzden yumuşama değildir.",
  },
  {
    base: "bekle",
    suffix: "yor",
    result: "bekliyor",
    event: "Ünlü daralması",
    evidence:
      "Kök sonundaki e → i. Bir ünlü yok olmadı, geniş ünlü dar ünlüye dönüştü.",
  },
  {
    base: "burun",
    suffix: "u",
    result: "burnu",
    event: "Ünlü düşmesi",
    evidence:
      "Burun kökündeki ikinci u kayboldu; son -u eki korunuyor. Düşen sesin kökteki yerini göster.",
  },
  {
    base: "az",
    suffix: "cık",
    result: "azıcık",
    event: "Ünlü türemesi",
    evidence:
      "Az tabanı ile -cık ekinin arasında fazladan ı beliriyor. Ev sözcüğüne gelen -i ekiyle aynı türden bir ekleme değil.",
  },
  {
    base: "küçük",
    suffix: "cük",
    result: "küçücük",
    event: "Ünsüz düşmesi",
    evidence:
      "Küçük tabanının son k’si kayboldu. Ünlü değil ünsüz eksiliyor; hece sayısı tek başına ölçüt değil.",
  },
  {
    base: "his",
    suffix: "i",
    result: "hissi",
    event: "Ünsüz türemesi",
    evidence:
      "Tabanda tek s varken sonuçta iki s var. Karşılaştırmaya dayanan bu ikizleşme, yalnız yan yana harf görmekten farklıdır.",
  },
  {
    base: "ev",
    suffix: "i",
    result: "evi",
    event: "Ses olayı yok",
    evidence:
      "i zaten ekin kendisi. Tabandaki e ve v korunuyor; bu karşılaştırmada düşme, daralma veya türeme yok.",
  },
  {
    base: "kitap",
    suffix: "cık + ı",
    result: "kitapçığı",
    event: "Benzeşme ve yumuşama",
    evidence:
      "Önce kitap + cık → kitapçık: c → ç benzeşmesi. Sonra kitapçık + ı → kitapçığı: k → ğ yumuşaması. İki ayrı ek basamağı var.",
  },
  {
    base: "süt",
    suffix: "ü",
    result: "sütü",
    event: "Ses olayı yok",
    evidence:
      "Kök sonundaki t korunur. p/ç/t/k sonlarının her örnekte zorunlu yumuşadığını söylemek yanlış olur.",
  },
  {
    base: "başla",
    suffix: "acak",
    result: "başlayacak",
    event: "Yardımcı ünsüz",
    evidence:
      "Bu eklemede kökün a’sı korunur; iki ünlü arasına yardımcı y girer. -yor daralması bu gelecek zaman biçimine taşınmaz.",
  },
  {
    base: "ben",
    suffix: "e",
    result: "bana",
    event: "Ünlü değişmesi",
    evidence:
      "Kökteki e → a olur. Geniş e başka bir geniş ünlüye döndüğü için bunu ünlü daralması sayma.",
  },
];
const eventNames = [
  "Yumuşama",
  "Benzeşme",
  "Ünlü daralması",
  "Ünlü düşmesi",
  "Ünlü türemesi",
  "Ünsüz düşmesi",
  "Ünsüz türemesi",
  "Benzeşme ve yumuşama",
  "Ünlü değişmesi",
  "Yardımcı ünsüz",
  "Ses olayı yok",
];
export type WordPiece = {
  text: string;
  kind: "root" | "derive" | "inflect" | "bridge" | "compound";
  detail: string;
  joinedText?: string;
};
export const wordCases: {
  sentence: string;
  word: string;
  structure: string;
  pieces: WordPiece[];
}[] = [
  {
    sentence: "Evlerimizden erkenden çıktık.",
    word: "evlerimizden",
    structure: "Basit",
    pieces: [
      {
        text: "ev",
        kind: "root",
        detail: "Ad kökü. Yerleşim/barınma anlamı korunur.",
      },
      {
        text: "ler",
        kind: "inflect",
        detail: "Çokluk çekimi; yeni taban türetmez.",
      },
      {
        text: "imiz",
        kind: "inflect",
        detail: "Birinci çoğul kişi iyeliği: bizim evlerimiz.",
      },
      {
        text: "den",
        kind: "inflect",
        detail: "Ayrılma hâli; nereden çıktık ilişkisini kurar.",
      },
    ],
  },
  {
    sentence: "Evsizlerimizden yardım bekleyenler vardı.",
    word: "evsizlerimizden",
    structure: "Türemiş",
    pieces: [
      {
        text: "ev",
        kind: "root",
        detail: "Ad kökü; önceki örnekteki aynı başlangıç.",
      },
      {
        text: "siz",
        kind: "derive",
        detail:
          "Yokluk niteliğiyle yeni evsiz tabanını türetir; addan ad soylu türetme.",
      },
      { text: "ler", kind: "inflect", detail: "Çokluk çekimi." },
      {
        text: "imiz",
        kind: "inflect",
        detail: "Bizimlik iyeliği; yeni bir gövde oluşturmaz.",
      },
      {
        text: "den",
        kind: "inflect",
        detail:
          "Ayrılma hâli. -siz eklenince yapı değişti, bu ekin görevi değişmedi.",
      },
    ],
  },
  {
    sentence: "Gözlükçülerimizden yeni çerçeveler aldık.",
    word: "gözlükçülerimizden",
    structure: "Türemiş",
    pieces: [
      {
        text: "göz",
        kind: "root",
        detail: "Ad kökü; görme organıyla anlam ilişkisi korunur.",
      },
      {
        text: "lük",
        kind: "derive",
        detail: "Gözlük adlı nesneyi türetir; ilk gövde oluşur.",
      },
      {
        text: "çü",
        kind: "derive",
        detail:
          "Gözlük işini yapan kişiyi türetir; ikinci gövde. Ek uyumlu -cü/-çü biçiminde görünebilir.",
      },
      { text: "ler", kind: "inflect", detail: "Çokluk çekimi." },
      { text: "imiz", kind: "inflect", detail: "Bizimlik iyeliği." },
      {
        text: "den",
        kind: "inflect",
        detail: "Ayrılma hâli; son taban yine türemiştir.",
      },
    ],
  },
  {
    sentence: "Çocuk, ‘Duvarı taşladım’ dedi.",
    word: "taşladım",
    structure: "Türemiş",
    pieces: [
      {
        text: "taş",
        kind: "root",
        detail:
          "İlk kök addır. Son sözcüğün fiil olması bu başlangıcı değiştirmez.",
      },
      {
        text: "la",
        kind: "derive",
        detail: "Taşlama işi kuran addan fiil yapımı.",
      },
      { text: "dı", kind: "inflect", detail: "Görülen geçmiş zaman çekimi." },
      {
        text: "m",
        kind: "inflect",
        detail: "Birinci tekil kişi: eylemi yapan ben.",
      },
    ],
  },
  {
    sentence: "Annemsiz yolculuğa çıkmam.",
    word: "annemsiz",
    structure: "Türemiş",
    pieces: [
      { text: "anne", kind: "root", detail: "Ad kökü." },
      { text: "m", kind: "inflect", detail: "Benim annem: iyelik çekimi." },
      {
        text: "siz",
        kind: "derive",
        detail:
          "Yokluk niteliği türetir. Bu örnekte çekimden sonra yapım gelmesi yaygın sıranın istisnasıdır.",
      },
    ],
  },
  {
    sentence: "Onun kitabını okudum.",
    word: "kitabını",
    structure: "Basit",
    pieces: [
      {
        text: "kitap",
        joinedText: "kitab",
        kind: "root",
        detail:
          "Ad kökü kitap; ünlü ek önünde p → b yumuşaması yazıda kitab biçimini verir. Ses değişimi yapım eki değildir.",
      },
      {
        text: "ı",
        kind: "inflect",
        detail: "Onun kitabı: üçüncü tekil kişi iyeliği.",
      },
      {
        text: "n",
        kind: "bridge",
        detail:
          "İyelikli tabandan sonra yardımcı n; ayrı yapım eki olarak sayılmaz.",
      },
      {
        text: "ı",
        kind: "inflect",
        detail:
          "Neyi okudum? Onun kitabını: belirtme hâli. Aynı sözcükte ikinci ı başka görev üstlenir.",
      },
    ],
  },
  {
    sentence: "Bu konuyu bilgisizler de öğrenebilir.",
    word: "bilgisizler",
    structure: "Türemiş",
    pieces: [
      { text: "bil", kind: "root", detail: "Bil- fiil kökü." },
      { text: "gi", kind: "derive", detail: "Fiilden ad: bilgi, ilk gövde." },
      {
        text: "siz",
        kind: "derive",
        detail:
          "Bilgi tabanından yokluk niteliği; ikinci gövde. Gövdeden türeme var.",
      },
      {
        text: "ler",
        kind: "inflect",
        detail: "Çokluk çekimi; üçüncü bir yapım basamağı değildir.",
      },
    ],
  },
  {
    sentence: "Komşum bugün bana yardım etti.",
    word: "yardım etti",
    structure: "Birleşik",
    pieces: [
      {
        text: "yardım ",
        kind: "root",
        detail:
          "Ad soylu parça; ardından yardımcı eylemle anlam birliği kurar.",
      },
      {
        text: "et",
        kind: "compound",
        detail:
          "Yardımcı eylem et-; yardım et- birleşik fiil tabanı ayrı yazılır.",
      },
      {
        text: "ti",
        kind: "inflect",
        detail:
          "Geçmiş zaman çekimi. Ayrı yazım veya çekim birleşik oluşumu silmez.",
      },
    ],
  },
];
export const joinWord = (pieces: WordPiece[]) =>
  pieces.map((p) => p.joinedText ?? p.text).join("");
const kindNames = {
  root: "Kök",
  derive: "Yapım",
  inflect: "Çekim",
  bridge: "Yardımcı ses",
  compound: "Birleşme",
};

function SoundExplorer() {
  const id = useId();
  const [state, set] = useExploration("turkish-sounds", {
    choice: 0,
    joined: false,
    claim: "",
    checked: false,
  });
  const index = clampInt(state.choice, 0, soundCases.length - 1),
    item = soundCases[index];
  const select = (choice: number) =>
    set({ choice, joined: false, claim: "", checked: false });
  return (
    <section
      className="visual-lab language-lab sound-lab"
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`}>Sözcüğü kur, değişen sesi bul</h2>
      <p>
        Bir örnek seç. Önce hangi olayın oluşacağını tahmin edebilir, sonra
        parçaları birleştirip kanıtı inceleyebilirsin.
      </p>
      <label className="field">
        Ses örneği
        <ChoiceSelect
          aria-label="Ses örneği"
          value={index}
          onChange={(e) => select(Number(e.target.value))}
        >
          {soundCases.map((c, i) => (
            <option key={i} value={i}>
              {i + 1}. {c.base} → {c.result}
            </option>
          ))}
        </ChoiceSelect>
      </label>
      <div
        className={`morph-pieces ${state.joined ? "is-joined" : ""}`}
        aria-label="Başlangıç ve ek"
      >
        <span className="morph-piece">
          {item.base}
          <small>Başlangıç</small>
        </span>
        <span aria-hidden="true">+</span>
        <span className="morph-piece">
          {item.suffix}
          <small>Eklenecek parça</small>
        </span>
      </div>
      <button
        className="secondary"
        onClick={() => set({ joined: !state.joined })}
      >
        {state.joined
          ? "Başlangıcı yeniden karşılaştır"
          : "Birleştir ve değişimi gör"}
      </button>
      {state.joined && (
        <div className="language-result" role="status">
          <strong>{item.result}</strong>
          <p>{item.evidence}</p>
        </div>
      )}
      <label className="field">
        Hangi değişimi bekliyorsun?
        <ChoiceSelect
          aria-label="Beklediğin ses olayı"
          value={state.claim}
          onChange={(e) => set({ claim: e.target.value, checked: false })}
        >
          <option value="">Olayı seç</option>
          {eventNames.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </ChoiceSelect>
      </label>
      <button
        className="secondary"
        disabled={!state.claim}
        onClick={() => set({ checked: true, joined: true })}
      >
        Kanıtla karşılaştır
      </button>
      {state.checked && (
        <div className="language-feedback" role="status">
          <strong>
            {state.claim === item.event
              ? "Karşılaştırman bu örnekle örtüşüyor."
              : "Başlangıç ile sonucu yeniden karşılaştır."}
          </strong>
          <p>
            Bu örnekte: {item.event}. {item.evidence}
          </p>
        </div>
      )}
      <div className="language-actions">
        <button
          className="text-button"
          disabled={index === 0}
          onClick={() => select(index - 1)}
        >
          Önceki örnek
        </button>
        <button
          className="text-button"
          disabled={index === soundCases.length - 1}
          onClick={() => select(index + 1)}
        >
          Sonraki örnek
        </button>
      </div>
      <p className="lab-caption">
        Parça gösterimleri çözümleme içindir; yanlış ara biçimleri standart
        yazım diye kullanma. Verilen yardımcı sesler ayrıca gösterilir. Bu
        destekli keşif, soru doğrusu veya konu tamamlanması oluşturmaz.
      </p>
    </section>
  );
}
function StructureExplorer() {
  const id = useId();
  const [state, set] = useExploration("turkish-word-structure", {
    choice: 0,
    selected: 0,
    joined: false,
  });
  const index = clampInt(state.choice, 0, wordCases.length - 1),
    item = wordCases[index],
    selected = clampInt(state.selected, 0, item.pieces.length - 1),
    piece = item.pieces[selected];
  const select = (choice: number) =>
    set({ choice, selected: 0, joined: false });
  const derivations = item.pieces.filter((p) => p.kind === "derive").length,
    inflections = item.pieces.filter((p) => p.kind === "inflect").length;
  return (
    <section
      className="visual-lab language-lab structure-lab"
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`}>Kökten sözcüğe, parça parça</h2>
      <p>
        Her parçayı seçip ne yaptığını gör. Ek sayısını değil, yeni bir taban mı
        yoksa cümle ilişkisi mi kurduğunu takip et.
      </p>
      <label className="field">
        Yapı örneği
        <ChoiceSelect
          aria-label="Yapı örneği"
          value={index}
          onChange={(e) => select(Number(e.target.value))}
        >
          {wordCases.map((c, i) => (
            <option key={c.word} value={i}>
              {i + 1}. {c.word}
            </option>
          ))}
        </ChoiceSelect>
      </label>
      <p className="language-sentence">{item.sentence}</p>
      <div
        className={`morph-pieces ${state.joined ? "is-joined" : ""}`}
        aria-label="Sözcük parçaları"
      >
        {item.pieces.map((p, i) => (
          <button
            key={i}
            className={`morph-piece kind-${p.kind}`}
            aria-pressed={selected === i}
            onClick={() => set({ selected: i })}
          >
            <strong>
              {state.joined ? (p.joinedText ?? p.text).trim() : p.text.trim()}
            </strong>
            <small>{kindNames[p.kind]}</small>
          </button>
        ))}
      </div>
      <div className="language-actions">
        <button
          className="secondary"
          onClick={() => set({ joined: !state.joined })}
        >
          {state.joined ? "Parçaları ayır" : "Sözcüğü birleştir"}
        </button>
        {index < 2 && (
          <button
            className="text-button"
            onClick={() => select(index === 0 ? 1 : 0)}
          >
            {index === 0
              ? "Bir yapım eki ekle: -siz"
              : "Yapım ekini çıkar: -siz"}
          </button>
        )}
      </div>
      {state.joined && (
        <output className="language-word" aria-label="Birleşen sözcük">
          {joinWord(item.pieces)}
        </output>
      )}
      <div className="language-result" role="status">
        <h3>
          {piece.text.trim()} · {kindNames[piece.kind]}
        </h3>
        <p>{piece.detail}</p>
        <p>
          <strong>
            {derivations} yapım · {inflections} çekim · {item.structure}
          </strong>
        </p>
        <p>
          Yardımcı ses ve birleşme parçaları yapım/çekim adedine otomatik
          eklenmez.
        </p>
      </div>
      <div className="language-actions">
        <button
          className="text-button"
          disabled={selected === 0}
          onClick={() => set({ selected: selected - 1 })}
        >
          Önceki parça
        </button>
        <button
          className="text-button"
          disabled={selected === item.pieces.length - 1}
          onClick={() => set({ selected: selected + 1 })}
        >
          Sonraki parça
        </button>
      </div>
      <p className="lab-caption">
        Renklerin yanında ek görevi yazıyla da gösterilir. Model bu cümlelerin
        güncel okul dil bilgisi çözümlemesidir; tarihsel köken çözümlemesi
        değildir. Keşif soru doğrusu, XP veya konu tamamlanması oluşturmaz.
      </p>
    </section>
  );
}
export default function TurkishLanguageExplorer({
  structure = false,
}: {
  structure?: boolean;
}) {
  return structure ? <StructureExplorer /> : <SoundExplorer />;
}
