import { useId } from "react";
import {
  baseNames,
  dnaSequenceStats,
  nucleotideIdentity,
  rnaRoles,
  type NucleicKind,
  type StandardBase,
} from "./nucleicAcids";
import { useExploration } from "./useExploration";
import "./nucleic-acids.css";
import { ChoiceSelect } from "../components/ChoiceSelect";

const dnaBases: StandardBase[] = ["A", "G", "C", "T"];
const rnaBases: StandardBase[] = ["A", "G", "C", "U"];
const partInfo = {
  phosphate: {
    title: "Fosfat · nükleozitten nükleotide",
    text: "Baz ile şeker birlikte nükleozittir. Fosfatı eklediğinde bir nükleotit kurarsın. Fosfat bazın çeşidini veya şekerin DNA/RNA kimliğini tek başına belirlemez.",
  },
  sugar: {
    title: "Pentoz · bir oksijenin farkı",
    text: "DNA’nın deoksiribozunda 2′ karbonunda H; RNA’nın ribozunda OH gösterilir. İkisi de beş karbonlu şekerdir: halkadaki köşelerin biri oksijendir, beşinci karbon halkanın dışındadır.",
  },
  base: {
    title: "Organik baz · halkanın sayısını gör",
    text: "A ve G, iki halkalı pürin; C, T ve U, tek halkalı pirimidindir. Aynı A bazı hem DNA hem RNA’da olabilir; şekerleri farklı olduğu için bütün nükleotit aynı değildir.",
  },
} as const;

function RnaRoleDrawing({ type }: { type: string }) {
  if (type === "tRNA")
    return (
      <svg
        viewBox="0 0 420 280"
        role="img"
        aria-label="Katlanmış taşıyıcı RNA, bir ucunda amino asit ve diğer bölgesinde antikodon; kendi içinde bazı kısa bölgelerde eşleşme"
      >
        <path
          className="nucleic-strand"
          d="M195 68V113C150 87 120 111 132 145C85 139 85 190 134 185C145 220 174 204 186 192V228H234V192C246 204 275 220 286 185C335 190 335 139 288 145C300 111 270 87 225 113V68"
        />
        {[80, 92, 104].map((y) => (
          <line
            key={y}
            x1="195"
            x2="225"
            y1={y}
            y2={y}
            className="nucleic-hydrogen"
          />
        ))}
        <circle cx="225" cy="38" r="24" className="nucleic-amino" />
        <text x="225" y="44" textAnchor="middle">
          aa
        </text>
        <text x="265" y="43">
          Amino asit
        </text>
        <text x="210" y="256" textAnchor="middle">
          Antikodon bölgesi
        </text>
      </svg>
    );
  if (type === "rRNA")
    return (
      <svg
        viewBox="0 0 420 280"
        role="img"
        aria-label="Proteinler ve ribozomal RNA içeren iki ribozom alt birimi; amino asitler arasında bağ oluşumuna katılan işlev"
      >
        <path d="M85 143C70 42 340 42 335 143Z" className="nucleic-ribosome" />
        <path
          d="M100 183C86 250 330 250 320 183Z"
          className="nucleic-ribosome"
        />
        <path
          className="nucleic-strand"
          d="M118 120Q140 80 162 115T205 112T248 110T298 122M130 206Q155 184 180 211T230 210T290 205"
        />
        <circle cx="142" cy="86" r="10" className="nucleic-protein" />
        <circle cx="268" cy="87" r="10" className="nucleic-protein" />
        <circle cx="170" cy="222" r="10" className="nucleic-protein" />
        <path d="M60 166H360" className="nucleic-message" />
        <circle cx="190" cy="46" r="15" className="nucleic-amino" />
        <circle cx="230" cy="46" r="15" className="nucleic-amino" />
        <path d="M205 46H215" className="nucleic-connection" />
        <text x="210" y="270" textAnchor="middle">
          rRNA + protein → ribozom
        </text>
      </svg>
    );
  return (
    <svg
      viewBox="0 0 420 280"
      role="img"
      aria-label="Mesajcı RNA boyunca sıralanmış örnek kodonlar AUG, GCU, AAA; mesajı okuyan ribozom"
    >
      <path d="M36 170H386" className="nucleic-strand" />
      {["AUG", "GCU", "AAA"].map((codon, index) => (
        <g key={codon}>
          <rect
            x={52 + index * 110}
            y="142"
            width="91"
            height="53"
            rx="8"
            className="nucleic-codon"
          />
          <text x={97 + index * 110} y="175" textAnchor="middle">
            {codon}
          </text>
        </g>
      ))}
      <path d="M160 122C153 58 273 58 265 122Z" className="nucleic-ribosome" />
      <path d="M167 207Q211 244 258 207Z" className="nucleic-ribosome" />
      <text x="210" y="40" textAnchor="middle">
        Kodonlar okunur
      </text>
      <text x="210" y="271" textAnchor="middle">
        Amino asit taşıyan: tRNA
      </text>
    </svg>
  );
}

export default function NucleicAcidsLab() {
  const uid = useId();
  const [saved, set] = useExploration("nucleic-acids", {
    panel: "builder",
    kind: "DNA",
    base: "A",
    phosphate: true,
    part: "sugar",
    sequence: "AGTCCA",
    selected: 0,
    prediction: "",
    reason: "",
    checked: false,
    showBonds: false,
    rnaType: "mRNA",
  });
  const kind: NucleicKind = saved.kind === "RNA" ? "RNA" : "DNA";
  const panel = ["builder", "chains", "roles"].includes(saved.panel)
    ? saved.panel
    : "builder";
  const bases = kind === "DNA" ? dnaBases : rnaBases;
  const base = bases.includes(saved.base as StandardBase)
    ? (saved.base as StandardBase)
    : "A";
  const part = Object.hasOwn(partInfo, saved.part)
    ? (saved.part as keyof typeof partInfo)
    : "sugar";
  const sequence = /^[ATGC]{6}$/.test(saved.sequence)
    ? saved.sequence
    : "AGTCCA";
  const selected = Number.isFinite(saved.selected)
    ? Math.min(5, Math.max(0, Math.round(saved.selected)))
    : 0;
  const stats = dnaSequenceStats(sequence);
  const displayedSequence =
    kind === "RNA" ? sequence.replaceAll("T", "U") : sequence;
  const rnaCounts = Object.fromEntries(
    rnaBases.map((b) => [
      b,
      [...displayedSequence].filter((c) => c === b).length,
    ]),
  );
  const identity = nucleotideIdentity(kind, base, saved.phosphate);
  const selectedRole =
    rnaRoles.find((role) => role.id === saved.rnaType) ?? rnaRoles[0];
  const reason = saved.reason.slice(0, 500);
  const prediction = saved.prediction.slice(0, 3);
  const validPrediction =
    /^\d{1,2}$/.test(prediction) && Number(prediction) <= 99;
  const chooseKind = (next: NucleicKind) =>
    set({
      kind: next,
      base:
        next === "DNA" && base === "U"
          ? "T"
          : next === "RNA" && base === "T"
            ? "U"
            : base,
      checked: false,
    });
  const replaceBase = (next: StandardBase) => {
    const canonical = next === "U" ? "T" : next;
    set({
      sequence:
        sequence.slice(0, selected) + canonical + sequence.slice(selected + 1),
      checked: false,
      showBonds: false,
    });
  };
  return (
    <section
      className="concept-model nucleic-lab"
      aria-labelledby={`${uid}-title`}
    >
      <h3 id={`${uid}-title`}>Bir yapıtaşından iki zincire</h3>
      <p>
        Parçayı seç, bir özelliği değiştir ve sonucunu açıkla. Şemalar atom
        ölçeğinde değildir; bağ türlerini ve koşulları ayırmak içindir.
      </p>
      <div
        className="nucleic-controls"
        role="group"
        aria-label="Nükleik asit keşfi"
      >
        {[
          ["builder", "Nükleotit kur"],
          ["chains", "Zincirleri karşılaştır"],
          ["roles", "RNA görevleri"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={panel === value}
            onClick={() => set({ panel: value })}
          >
            {label}
          </button>
        ))}
      </div>
      {panel !== "roles" && (
        <div
          className="nucleic-controls"
          role="group"
          aria-label="Molekül türü"
        >
          {(["DNA", "RNA"] as const).map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={kind === value}
              onClick={() => chooseKind(value)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
      {panel === "builder" && (
        <div className="nucleic-builder">
          <div
            className="nucleic-controls"
            role="group"
            aria-label="Organik baz seçimi"
          >
            {bases.map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={base === value}
                onClick={() => set({ base: value })}
              >
                {value} · {baseNames[value]}
              </button>
            ))}
          </div>
          <label className="nucleic-check">
            <input
              type="checkbox"
              checked={saved.phosphate}
              onChange={(e) => set({ phosphate: e.target.checked })}
            />
            Fosfatı ekle
          </label>
          <figure className="nucleic-figure">
            <svg
              viewBox="0 0 530 310"
              role="img"
              aria-label={`${identity.identity}: ${identity.sugar}; ${saved.phosphate ? "fosfat var, nükleotit" : "fosfat yok, nükleozit"}. 2′ karbonunda ${kind === "DNA" ? "H" : "OH"}. ${identity.group}.`}
            >
              <path
                d="M300 150L260 215L190 195L180 130L245 103Z"
                className={`nucleic-sugar ${part === "sugar" ? "nucleic-selected" : ""}`}
              />
              <path d="M180 130L137 97" className="nucleic-connection" />
              <text x="129" y="83">
                5′
              </text>
              <text x="307" y="149">
                1′
              </text>
              <text x="267" y="224">
                2′
              </text>
              {/* 3′ and 4′ sit outside the ring, clear of its edges and bonds. */}
              <text x="182" y="200" textAnchor="end">
                3′
              </text>
              <text x="173" y="155" textAnchor="end">
                4′
              </text>
              <text x="239" y="109" className="nucleic-oxygen">
                O
              </text>
              <path d="M260 215V254" className="nucleic-connection" />
              <text
                x="260"
                y="282"
                textAnchor="middle"
                className="nucleic-sugar-label"
              >
                {kind === "DNA" ? "H" : "OH"}
              </text>
              <path d="M190 195L164 249" className="nucleic-connection" />
              <text x="142" y="273">
                OH
              </text>
              {saved.phosphate ? (
                <g>
                  <path d="M137 97H92" className="nucleic-connection" />
                  <circle
                    cx="64"
                    cy="97"
                    r="28"
                    className={`nucleic-phosphate ${part === "phosphate" ? "nucleic-selected" : ""}`}
                  />
                  <text x="64" y="104" textAnchor="middle">
                    P
                  </text>
                </g>
              ) : (
                <g>
                  <circle cx="64" cy="97" r="28" className="nucleic-absent" />
                  <text x="64" y="104" textAnchor="middle">
                    −P
                  </text>
                </g>
              )}
              <path d="M300 150H348" className="nucleic-connection" />
              <g className={part === "base" ? "nucleic-selected-base" : ""}>
                <path
                  d="M365 121L399 101L433 121V161L399 181L365 161Z"
                  className="nucleic-base"
                />
                {(base === "A" || base === "G") && (
                  <path
                    d="M433 121L467 110L490 142L467 174L433 161Z"
                    className="nucleic-base"
                  />
                )}
              </g>
              <text x="399" y="149" textAnchor="middle">
                {base}
              </text>
              <text x="245" y="43" textAnchor="middle">
                {identity.sugar}
              </text>
            </svg>
            <figcaption>
              Şekerin 1′–5′ işaretleri karbonları ayırt eder. Baz halkaları
              şematiktir; bütün atomlar ve bağlar gösterilmez.
            </figcaption>
          </figure>
          <div
            className="nucleic-controls"
            role="group"
            aria-label="Yapıtaşı bölümünü incele"
          >
            {[
              ["phosphate", "Fosfat"],
              ["sugar", "Şeker"],
              ["base", "Baz"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={part === value}
                onClick={() => set({ part: value })}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="nucleic-result" role="status">
            <strong>
              {identity.unit} · {identity.identity}
            </strong>
            <p>
              {identity.sugar} + {baseNames[base]}
              {saved.phosphate ? " + fosfat" : " · fosfat eklenmedi"}.{" "}
              {identity.group}.
            </p>
            <p>
              Şekerin 2′ konumu: <strong>{kind === "DNA" ? "H" : "OH"}</strong>.
            </p>
            <h4>{partInfo[part].title}</h4>
            <p>{partInfo[part].text}</p>
          </div>
        </div>
      )}
      {panel === "chains" && (
        <div className="nucleic-chains">
          <label htmlFor={`${uid}-sequence`}>Örnek baz dizisi</label>
          <ChoiceSelect
            id={`${uid}-sequence`}
            value={sequence}
            onChange={(e) =>
              set({
                sequence: e.target.value,
                selected: 0,
                checked: false,
                showBonds: false,
              })
            }
          >
            {!["AGTCCA", "GGCCGA", "ATTAAT"].includes(sequence) && (
              <option value={sequence}>
                Düzenlediğin dizi: {displayedSequence}
              </option>
            )}
            <option value="AGTCCA">
              {kind === "DNA" ? "AGTCCA" : "AGUCCA"} · karma örnek
            </option>
            <option value="GGCCGA">GGCCGA · G/C ağırlıklı</option>
            <option value="ATTAAT">
              {kind === "DNA" ? "ATTAAT" : "AUUAAU"} · A/
              {kind === "DNA" ? "T" : "U"} ağırlıklı
            </option>
          </ChoiceSelect>
          <p>
            Üst dizinin bir yerini seç; sonra o bazı değiştir. DNA’da karşı
            zincir eşleşmeye göre yeniden kurulur. RNA görünümünde aynı örnekte
            T yerine U kullanılır.
          </p>
          <div
            className="nucleic-controls nucleic-positions"
            role="group"
            aria-label="Bazın dizi içindeki yerini seç"
          >
            {[...displayedSequence].map((value, index) => (
              <button
                type="button"
                key={index}
                aria-pressed={selected === index}
                onClick={() => set({ selected: index })}
              >
                {index + 1}. baz {value}
              </button>
            ))}
          </div>
          <div
            className="nucleic-controls"
            role="group"
            aria-label="Seçili bazı değiştir"
          >
            {bases.map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => replaceBase(value)}
                aria-label={`Seçili bazı ${value} yap`}
              >
                {value} yap
              </button>
            ))}
          </div>
          <figure className="nucleic-figure">
            <svg
              viewBox="0 0 490 290"
              role="img"
              aria-label={
                kind === "DNA"
                  ? `Doğrusal çift zincirli DNA: üst 5′ ${sequence} 3′; alt 3′ ${stats.complement} 5′.${saved.showBonds ? ` ${stats.hydrogenBonds} hidrojen bağı; ${stats.linearPhosphodiesterBonds} fosfodiester bağı.` : " Hidrojen bağları henüz açılmadı."}`
                  : `Tek zincirli RNA: 5′ ${displayedSequence} 3′. İkinci tam zincir gösterilmiyor; kendi üzerine katlanma bu modelde hesaplanmıyor.`
              }
            >
              <path d="M68 77H422" className="nucleic-strand" />
              {kind === "DNA" && (
                <path d="M68 221H422" className="nucleic-strand" />
              )}
              <g className="nucleic-direction">
                <text x="22" y="85">
                  5′
                </text>
                <text x="442" y="85">
                  3′
                </text>
                {kind === "DNA" && (
                  <>
                    <text x="22" y="229">
                      3′
                    </text>
                    <text x="442" y="229">
                      5′
                    </text>
                  </>
                )}
              </g>
              {[...displayedSequence].map((value, index) => {
                const x = 84 + index * 64;
                const bondCount =
                  sequence[index] === "A" || sequence[index] === "T" ? 2 : 3;
                return (
                  <g key={index}>
                    <rect
                      x={x - 21}
                      y="60"
                      width="42"
                      height="45"
                      rx="8"
                      className={`nucleic-base ${selected === index ? "nucleic-selected" : ""}`}
                    />
                    <text x={x} y="89" textAnchor="middle">
                      {value}
                    </text>
                    {kind === "DNA" && (
                      <>
                        <rect
                          x={x - 21}
                          y="200"
                          width="42"
                          height="45"
                          rx="8"
                          className="nucleic-base"
                        />
                        <text x={x} y="229" textAnchor="middle">
                          {stats.complement[index]}
                        </text>
                        {saved.showBonds &&
                          Array.from({ length: bondCount }, (_, bond) => (
                            <line
                              className="nucleic-hydrogen"
                              data-bond="hydrogen"
                              key={bond}
                              x1={x - 10 + bond * 10}
                              x2={x - 10 + bond * 10}
                              y1="114"
                              y2="191"
                            />
                          ))}
                      </>
                    )}
                  </g>
                );
              })}
              {kind === "RNA" && (
                <>
                  <path
                    d="M128 152Q245 223 362 152"
                    className="nucleic-fold-hint"
                  />
                  <text x="245" y="254" textAnchor="middle">
                    Katlanma bu şemada hesaplanmıyor.
                  </text>
                </>
              )}
            </svg>
            <figcaption>
              {kind === "DNA"
                ? "Aynı hizadaki tamamlayıcı diziler ters yönlüdür. Çizgiler açılınca A–T için 2, G–C için 3 H bağı görünür. Düz çizim gerçek çift sarmalın ölçekli resmi değildir."
                : "RNA çoğunlukla tek zincirlidir; bazı bölgeleri kendi üzerine katlanıp eşleşebilir. Burada bütün bazları ikinci bir zincire zorla eşlemiyoruz."}
            </figcaption>
          </figure>
          <dl className="nucleic-sequence-lines">
            <div>
              <dt>{kind === "DNA" ? "Üst zincir" : "Tek RNA zinciri"}</dt>
              <dd>5′–{displayedSequence}–3′</dd>
            </div>
            {kind === "DNA" && (
              <div>
                <dt>Aynı hizadaki alt zincir</dt>
                <dd>3′–{stats.complement}–5′</dd>
              </div>
            )}
          </dl>
          {kind === "DNA" ? (
            <>
              <div className="nucleic-prediction">
                <label htmlFor={`${uid}-prediction`}>
                  Beklediğin toplam hidrojen bağı
                </label>
                <input
                  id={`${uid}-prediction`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  value={prediction}
                  onChange={(e) =>
                    set({
                      prediction: e.target.value.replace(/\D/g, "").slice(0, 2),
                      checked: false,
                    })
                  }
                />
                <label htmlFor={`${uid}-reason`}>Hesabının gerekçesi</label>
                <textarea
                  id={`${uid}-reason`}
                  rows={3}
                  maxLength={500}
                  value={reason}
                  onChange={(e) =>
                    set({ reason: e.target.value, checked: false })
                  }
                  placeholder="A–T ve G–C çiftlerini ayrı say…"
                />
                <button
                  type="button"
                  disabled={!validPrediction || !reason.trim()}
                  onClick={() => set({ checked: true, showBonds: true })}
                >
                  Hesabımı denetle
                </button>
              </div>
              <button
                type="button"
                className="nucleic-reveal"
                onClick={() => set({ showBonds: !saved.showBonds })}
              >
                {saved.showBonds
                  ? "Bağ hesabını kapat"
                  : "Bağları ve hesabı göster"}
              </button>
              {saved.showBonds && (
                <div className="nucleic-result" role="status">
                  <strong>{stats.hydrogenBonds} hidrojen bağı</strong>
                  <p>
                    {stats.AT} A–T çifti × 2 + {stats.GC} G–C çifti × 3 ={" "}
                    {stats.hydrogenBonds}.
                  </p>
                  <p>
                    {stats.pairs} baz çifti = {stats.totalNucleotides}{" "}
                    nükleotit. İki doğrusal, açık uçlu zincirin omurgasında: 2 ×
                    ({stats.pairs} − 1) = {stats.linearPhosphodiesterBonds}{" "}
                    fosfodiester bağı.
                  </p>
                  <p>
                    Bütün molekülde A={stats.wholeBases.A}, T=
                    {stats.wholeBases.T}, G={stats.wholeBases.G}, C=
                    {stats.wholeBases.C}. Üst zincirin kendi içinde A=T olmak
                    zorunda değildir.
                  </p>
                  {saved.checked && (
                    <p>
                      <strong>
                        {Number(prediction) === stats.hydrogenBonds
                          ? "Tahminin bu modelin hesabıyla uyuşuyor."
                          : `Tahminin ${prediction}; doğru bağ hesabı ${stats.hydrogenBonds}.`}
                      </strong>{" "}
                      Gerekçen: {reason}
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="nucleic-result" role="status">
              <strong>Toplam hidrojen bağı bu bilgilerle belirlenemez.</strong>
              <p>
                Tek RNA zincirinde A={rnaCounts.A}, U={rnaCounts.U}, G=
                {rnaCounts.G}, C={rnaCounts.C}. A=U veya G=C zorunlu değildir.
                Katlanma ve hangi bölgelerin eşleştiği verilmediğinden H bağı
                sayısını 0 kabul edemeyiz.
              </p>
              <p>
                Doğrusal tek zincirde {sequence.length} nükleotit arasında{" "}
                {sequence.length - 1} fosfodiester bağı vardır. Bu sayı bazlar
                arası hidrojen bağı sayısı değildir.
              </p>
            </div>
          )}
        </div>
      )}
      {panel === "roles" && (
        <div className="nucleic-rna-roles">
          <p>
            Aynı "RNA" adı, aynı görevi anlatmaz. Görev seçildiğinde yapının
            hangi işi desteklediğine bak.
          </p>
          <div
            className="nucleic-controls"
            role="group"
            aria-label="RNA çeşidini seç"
          >
            {rnaRoles.map((role) => (
              <button
                type="button"
                key={role.id}
                aria-pressed={selectedRole.id === role.id}
                onClick={() => set({ rnaType: role.id })}
              >
                {role.id} · {role.name}
              </button>
            ))}
          </div>
          <figure className="nucleic-figure">
            <RnaRoleDrawing type={selectedRole.id} />
            <figcaption>
              İşlev şemasıdır; RNA’nın tam dizisini, gerçek boyutlarını veya
              bütün atomlarını göstermez.
            </figcaption>
          </figure>
          <div className="nucleic-result" role="status">
            <strong>
              {selectedRole.name} · {selectedRole.cargo}
            </strong>
            <p>{selectedRole.role}</p>
            <p>
              Protein sentezinde bir mesaj, amino asit taşıyıcısı ve ribozom
              bileşeni birlikte çalışır; bu görevleri birbirinin yerine koyma.
            </p>
          </div>
        </div>
      )}
      <p className="small muted">
        Seçimlerin, tahminin ve gerekçen bu cihazda saklanır. Bu keşif XP,
        ustalık veya soru doğrusu oluşturmaz.
      </p>
    </section>
  );
}
