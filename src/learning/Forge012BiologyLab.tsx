import { useId, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import {
  sexualSnapshot,
  independentGametes,
  monoCross,
  linkedGametes,
  aboCross,
  aboGenotypes,
  aboPhenotype,
  xLinkedCross,
  pedigreeCandidates,
} from "./forge012Biology";
import "./forge012Biology.css";
import { ChoiceSelect } from "../components/ChoiceSelect";
const clamp = (x: number, a: number, b: number) =>
  Number.isFinite(x) ? Math.max(a, Math.min(b, Math.round(x))) : a;
const percent = (x: number) =>
  `${Math.round(x * 1000) / 10}`.replace(".", ",") + "%";
function Drawing({
  title,
  children,
  height = 280,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  const uid = useId();
  return (
    <svg
      className="bio012-drawing"
      viewBox={`0 0 640 ${height}`}
      role="img"
      aria-labelledby={uid}
    >
      <title id={uid}>{title}</title>
      {children}
    </svg>
  );
}
function Prediction({
  id,
  expected,
  explanation,
  options,
}: {
  id: string;
  expected: string;
  explanation: string;
  options: [string, string][];
}) {
  const uid = useId();
  const [s, set] = useExploration(`forge012-bio-prediction-${id}`, {
    answer: "",
    reason: "",
    checked: false,
  });
  const valid = options.some(([k]) => k === s.answer);
  return (
    <div className="bio012-prediction">
      <label htmlFor={uid + "-answer"}>Sonuç tahminin</label>
      <ChoiceSelect
        id={uid + "-answer"}
        value={valid ? s.answer : ""}
        onChange={(e) => set({ answer: e.target.value, checked: false })}
      >
        <option value="">Bir sonuç seç</option>
        {options.map(([k, v]) => (
          <option value={k} key={k}>
            {v}
          </option>
        ))}
      </ChoiceSelect>
      <output
        className="bio012-current-choice"
        htmlFor={uid + "-answer"}
        data-selected-prediction
      >
        {valid
          ? `Seçili tahmin: ${options.find(([key]) => key === s.answer)![1]}`
          : "Henüz bir tahmin seçilmedi."}
      </output>
      <label htmlFor={uid + "-reason"}>Gerekçen</label>
      <textarea
        id={uid + "-reason"}
        rows={3}
        maxLength={120}
        value={s.reason.slice(0, 120)}
        onChange={(e) =>
          set({ reason: e.target.value.slice(0, 120), checked: false })
        }
      />
      <button
        className="secondary"
        disabled={!valid || !s.reason.trim()}
        onClick={() => set({ checked: true })}
      >
        Tahminimi karşılaştır
      </button>
      {s.checked && valid && (
        <div className="bio012-feedback" role="status">
          <strong>
            {s.answer === expected
              ? "Seçimin bu modeldeki kanıtla uyumlu."
              : "Seçimini kanıtla yeniden karşılaştır."}
          </strong>
          <p>{explanation}</p>
          <p className="small muted">
            Gerekçen otomatik puanlanmaz; bu keşif soru doğrusu veya konu
            bitirme kaydı değildir.
          </p>
        </div>
      )}
    </div>
  );
}
function Sexual() {
  const uid = useId();
  const [s, set] = useExploration("forge012-bio-eseyli-ureme", {
    diploid: 8,
    stage: 1,
    rounds: 2,
  });
  const diploid = clamp(s.diploid, 4, 16) % 2 ? 8 : clamp(s.diploid, 4, 16),
    stage = clamp(s.stage, 0, 3),
    rounds = clamp(s.rounds, 0, 3),
    m = sexualSnapshot(diploid, stage, rounds);
  return (
    <>
      <h3>Birleştir, sonra çoğalt</h3>
      <p>
        Olağan diploit hayvan modelinde kromozom takımını ve hücre sayısını ayrı
        izle. Şema yalnız seçili hücreleri gösterir; gamet üretiminin bütün
        ürünlerini saymaz.
      </p>
      <div className="bio012-controls">
        <label htmlFor={uid + "-n"}>
          Başlangıç kromozom sayısı (2n)
          <input
            id={uid + "-n"}
            type="range"
            min="4"
            max="16"
            step="2"
            value={diploid}
            onChange={(e) => set({ diploid: +e.target.value })}
          />
          <output>{diploid}</output>
        </label>
        <label htmlFor={uid + "-stage"}>
          İzlenen olay
          <ChoiceSelect
            id={uid + "-stage"}
            value={stage}
            onChange={(e) => set({ stage: +e.target.value })}
          >
            {[
              "Diploit öncül",
              "İki ayrı gamet",
              "Döllenme: zigot",
              "Mitozla erken gelişme",
            ].map((t, i) => (
              <option key={t} value={i}>
                {t}
              </option>
            ))}
          </ChoiceSelect>
        </label>
        {stage === 3 && (
          <label htmlFor={uid + "-rounds"}>
            Eşzamanlı mitoz turu
            <input
              id={uid + "-rounds"}
              type="range"
              min="0"
              max="3"
              value={rounds}
              onChange={(e) => set({ rounds: +e.target.value })}
            />
            <output>{rounds}</output>
          </label>
        )}
      </div>
      <Drawing
        title={`${m.label}: ${m.cells} hücre, hücre başına ${m.chromosomes} kromozom.`}
      >
        {Array.from({ length: m.cells }, (_, i) => {
          const columns = Math.min(m.cells, 4),
            cx = 320 - ((columns - 1) * 155) / 2 + (i % 4) * 155,
            cy = m.cells > 4 ? 75 + Math.floor(i / 4) * 130 : 140;
          return (
            <g key={i} data-sexual-cell transform={`translate(${cx} ${cy})`}>
              <circle r="57" className="bio012-cell" />
              {Array.from({ length: m.chromosomes }, (_, j) => (
                <path
                  data-chromosome
                  key={j}
                  d={`M${-38 + (j % 8) * 11} ${-20 + Math.floor(j / 8) * 28}v18`}
                  className={
                    j < m.haploid ? "bio012-maternal" : "bio012-paternal"
                  }
                />
              ))}
            </g>
          );
        })}
      </Drawing>
      <div className="bio012-result" data-model-result>
        <strong>{m.label}</strong>
        <p>
          {m.cells} hücre; her hücrede {m.chromosomes} kromozom. Bir takım n=
          {m.haploid}.
        </p>
        <p>
          {stage === 1
            ? "İki gamet henüz birleşmedi; iki ayrı haploit hücre var."
            : stage === 2
              ? "Döllenme iki haploit takımı birleştirdi; bir diploit zigot oluştu."
              : stage === 3
                ? "Normal mitoz hücre sayısını artırır; hücre başına kromozom takımı korunur."
                : "Başlangıç iki kromozom takımı taşır."}
        </p>
      </div>
      <Prediction
        id={`eseyli-${diploid}-${stage}-${rounds}`}
        expected={stage === 1 ? "n" : "2n"}
        options={[
          ["n", "Her hücre bir takım taşır"],
          ["2n", "Her hücre iki takım taşır"],
        ]}
        explanation={`Seçili hücre başına ${m.chromosomes} kromozom var; bir takım ${m.haploid} kromozomdur. Hücre adedi ile takım sayısı ayrı büyüklüklerdir.`}
      />
    </>
  );
}
function Gametes() {
  const uid = useId();
  const [s, set] = useExploration("forge012-bio-kalitima-giris", {
    genotype: "AaBBcc",
    chosen: 0,
  });
  const genotype = ["AaBBcc", "AaBb", "AABbCc", "AABB"].includes(s.genotype)
      ? s.genotype
      : "AaBBcc",
    gametes = independentGametes(genotype),
    chosen = clamp(s.chosen, 0, gametes.length - 1);
  return (
    <>
      <h3>Her lokustan bir alel seç</h3>
      <p>
        Bu modelde lokuslar bağımsız; normal eş ayrılma varsayılıyor. Seçili
        gamet homolog çiftlerin her birinden tek alel taşır.
      </p>
      <div className="bio012-controls">
        <label htmlFor={uid + "-geno"}>
          Diploit genotip
          <ChoiceSelect
            id={uid + "-geno"}
            value={genotype}
            onChange={(e) => set({ genotype: e.target.value, chosen: 0 })}
          >
            {["AaBBcc", "AaBb", "AABbCc", "AABB"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </ChoiceSelect>
        </label>
        <label htmlFor={uid + "-choice"}>
          İzlenen gamet
          <ChoiceSelect
            id={uid + "-choice"}
            value={chosen}
            onChange={(e) => set({ chosen: +e.target.value })}
          >
            {gametes.map((g, i) => (
              <option key={g} value={i}>
                {g}
              </option>
            ))}
          </ChoiceSelect>
        </label>
      </div>
      <Drawing
        title={`${genotype}: ${gametes.length} olası gamet; seçili ${gametes[chosen]}.`}
      >
        <rect
          data-selected-gamete
          x={320 - ((genotype.length / 2 - 1) * 150) / 2 - 65}
          y="216"
          width={(genotype.length / 2 - 1) * 150 + 130}
          height="58"
          rx="29"
          className="bio012-cell"
        />
        {Array.from({ length: genotype.length / 2 }, (_, i) => (
          <g
            key={i}
            transform={`translate(${320 - ((genotype.length / 2 - 1) * 150) / 2 + i * 150} 55)`}
          >
            <path d="M-24 0 v 105" className="bio012-maternal" />
            <path d="M24 0 v 105" className="bio012-paternal" />
            {/* Allele letters stand beside their chromatid, never on it. */}
            <text x="-36" y="58" textAnchor="end">
              {genotype[i * 2]}
            </text>
            <text x="36" y="58" textAnchor="start">
              {genotype[i * 2 + 1]}
            </text>
            <path
              d="M0 125 v 30 m-8-10 8 10 8-10"
              className="bio012-connection"
            />
            <text y="192" textAnchor="middle" data-gamete-allele>
              {gametes[chosen][i]}
            </text>
          </g>
        ))}
      </Drawing>
      <div className="bio012-result" data-model-result>
        <strong>{gametes.length} gamet çeşidi</strong>
        <p>
          {gametes.join(", ")}. Her birinin olasılığı{" "}
          {percent(1 / gametes.length)}.
        </p>
        <p>
          Seçili tek gamet: {gametes[chosen]}. Bu ortak hücre sınırı içindeki
          aleller aynı haploit gamete aittir. İki alelli Aa biçimi gamet değil,
          diploit lokus gösterimidir.
        </p>
      </div>
      <Prediction
        id={`gametes-${genotype}`}
        expected={String(gametes.length)}
        options={
          ["1", "2", "4", "8"].map((n) => [n, `${n} çeşit`]) as [
            string,
            string,
          ][]
        }
        explanation="Yalnız bağımsız heterozigot lokuslar seçim sayısını iki katına çıkarır. Homozigot lokus yalnız bir seçenek verir; bu hesap tek mayozdaki kesin farklı ürün sayısı değildir."
      />
    </>
  );
}
function Punnett({
  first,
  second,
  cells,
  phenotype,
}: {
  first: string;
  second: string;
  cells: string[];
  phenotype?: (g: string) => string;
}) {
  return (
    <Drawing title={`${first} × ${second} olası birleşmeleri`} height={330}>
      {[...second].map((a, i) => (
        <text key={i} x={275 + i * 130} y="40" textAnchor="middle">
          {a}
        </text>
      ))}
      {[...first].map((a, i) => (
        <text key={i} x="150" y={125 + i * 130} textAnchor="middle">
          {a}
        </text>
      ))}
      {cells.map((g, i) => (
        <g
          key={i}
          transform={`translate(${215 + (i % 2) * 130} ${65 + Math.floor(i / 2) * 130})`}
          data-punnett-genotype={g}
        >
          <rect width="120" height="120" rx="18" className="bio012-cell" />
          <text x="60" y="55" textAnchor="middle">
            {g}
          </text>
          {phenotype && (
            <text
              x="60"
              y="88"
              textAnchor="middle"
              className="bio012-phenotype"
            >
              {phenotype(g)}
            </text>
          )}
        </g>
      ))}
    </Drawing>
  );
}
function Mendel() {
  const uid = useId();
  const [s, set] = useExploration("forge012-bio-mendel-genetigi", {
    first: "Aa",
    second: "Aa",
  });
  const first = ["AA", "Aa", "aa"].includes(s.first) ? s.first : "Aa",
    second = ["AA", "Aa", "aa"].includes(s.second) ? s.second : "Aa",
    m = monoCross(first, second);
  return (
    <>
      <h3>Gametten dört olası birleşmeye</h3>
      <p>
        Tek otozomal lokus, tam baskınlık, eş olasılıklı gametler ve rastgele
        döllenme varsayılır. Dört kutu dört gerçek çocuk değil, dört eş
        ağırlıklı döllenme yoludur.
      </p>
      <div className="bio012-controls">
        {(["first", "second"] as const).map((k, i) => (
          <label key={k} htmlFor={uid + k}>
            {i + 1}. ebeveyn genotipi
            <ChoiceSelect
              id={uid + k}
              value={k === "first" ? first : second}
              onChange={(e) => set({ [k]: e.target.value })}
            >
              {["AA", "Aa", "aa"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </ChoiceSelect>
          </label>
        ))}
      </div>
      <Punnett
        first={first}
        second={second}
        cells={m.cells}
        phenotype={(g) => (g === "aa" ? "Çekinik" : "Baskın")}
      />
      <div className="bio012-result" data-model-result>
        <strong>
          {first} × {second}
        </strong>
        <p>
          AA: {percent(m.counts.AA / 4)}; Aa: {percent(m.heterozygote)}; aa:{" "}
          {percent(m.recessive)}.
        </p>
        <p>
          Baskın fenotip: {percent(m.dominant)}; çekinik fenotip:{" "}
          {percent(m.recessive)}. Küçük bir ailede bu payların birebir
          gözlenmesi zorunlu değildir.
        </p>
      </div>
      <Prediction
        id={`mendel-${first}-${second}`}
        expected={String(m.counts.aa)}
        options={
          ["0", "1", "2", "4"].map((n) => [
            n,
            `Dört yoldan ${n} tanesi aa`,
          ]) as [string, string][]
        }
        explanation={`${m.cells.join(", ")} yollarının ${m.counts.aa} tanesi aa’dır. Olasılığı bulmak için dört eş yola böl; gözlenen kesin çocuk sayısıyla karıştırma.`}
      />
    </>
  );
}
function Deviations() {
  const uid = useId();
  const [s, set] = useExploration("forge012-bio-mendelden-sapmalar", {
    kind: "codominance",
    recombination: 0,
    phase: "cis",
  });
  const kind = ["codominance", "incomplete", "linkage"].includes(s.kind)
      ? s.kind
      : "codominance",
    r = clamp(s.recombination, 0, 50),
    phase = s.phase === "trans" ? "trans" : "cis",
    m = linkedGametes(r, phase);
  return (
    <>
      <h3>Hangi varsayım değişti?</h3>
      <p>
        İki heterozigotun tek lokus çaprazlaması ile iki bağlı lokusun gamet
        dağılımı farklı modellerdir. Görünüm ve gamet oranını aynı şey sanmadan
        karşılaştır.
      </p>
      <div className="bio012-controls">
        <label htmlFor={uid + "-kind"}>
          İncelenen kalıtım ilişkisi
          <ChoiceSelect
            id={uid + "-kind"}
            value={kind}
            onChange={(e) => set({ kind: e.target.value })}
          >
            <option value="codominance">Eş baskınlık: iki ürün birlikte</option>
            <option value="incomplete">Eksik baskınlık: ara görünüm</option>
            <option value="linkage">Bağlı genler: gamet payları</option>
          </ChoiceSelect>
        </label>
        {kind === "linkage" && (
          <>
            <label htmlFor={uid + "-r"}>
              Rekombinasyon yüzdesi
              <input
                id={uid + "-r"}
                type="range"
                min="0"
                max="50"
                step="5"
                value={r}
                onChange={(e) => set({ recombination: +e.target.value })}
              />
              <output>%{r}</output>
            </label>
            <label htmlFor={uid + "-phase"}>
              Alel yerleşimi
              <ChoiceSelect
                id={uid + "-phase"}
                value={phase}
                onChange={(e) => set({ phase: e.target.value })}
              >
                <option value="cis">AB / ab</option>
                <option value="trans">Ab / aB</option>
              </ChoiceSelect>
            </label>
          </>
        )}
      </div>
      <Drawing
        title={
          kind === "linkage"
            ? `Bağlı gamet dağılımı: rekombinasyon yüzde ${r}`
            : kind === "codominance"
              ? "İki alel ürünü heterozigotta birlikte görülür."
              : "Heterozigot ara fenotip gösterir."
        }
      >
        {kind === "linkage"
          ? Object.entries(m).map(([g, p], i) => (
              <g key={g} transform={`translate(65 ${35 + i * 62})`}>
                <text y="23">{g}</text>
                <rect
                  data-gamete={g}
                  x="65"
                  width={p * 850}
                  height="35"
                  rx="6"
                  className={
                    g === ("cis" === phase ? "AB" : "Ab") ||
                    g === ("cis" === phase ? "ab" : "aB")
                      ? "bio012-bar-parent"
                      : "bio012-bar-recombinant"
                  }
                />
              </g>
            ))
          : ["RR", "Rr", "Rr", "rr"].map((g, i) => (
              <g key={i} transform={`translate(${85 + i * 155} 115)`}>
                <circle
                  r="48"
                  fill={
                    g === "RR"
                      ? "var (--accent)"
                      : g === "rr"
                        ? "var (--text)"
                        : kind === "incomplete"
                          ? "color-mix (in srgb, var (--accent) 50%, var (--text))"
                          : "var (--accent)"
                  }
                  stroke="var (--border)"
                  strokeWidth="3"
                />
                {g === "Rr" && kind === "codominance" && (
                  <path
                    d="M0-48 A48 48 0 0 1 0 48 Z"
                    fill="var (--text)"
                    data-both-products
                  />
                )}
                <text y="85" textAnchor="middle">
                  {g}
                </text>
              </g>
            ))}
      </Drawing>
      <div className="bio012-result" data-model-result>
        {kind === "linkage" ? (
          <>
            <strong>
              {phase === "cis" ? "AB / ab" : "Ab / aB"}; rekombinasyon %{r}
            </strong>
            <p>
              {Object.entries(m)
                .map(([g, p]) => `${g}: ${percent(p)}`)
                .join("; ")}
              .
            </p>
            <p>
              İki ebeveyn tipinin toplamı %{100 - r}, iki rekombinant tipin
              toplamı %{r}. Oranlar simetrik iki lokus okul modeline aittir.
            </p>
          </>
        ) : (
          <>
            <strong>
              {kind === "codominance" ? "Eş baskınlık" : "Eksik baskınlık"}:
              1:2:1 fenotip
            </strong>
            <p>
              Rr × Rr → RR, Rr, Rr, rr. Heterozigot{" "}
              {kind === "codominance" ? "iki ürünü birlikte" : "ara görünümü"}{" "}
              gösterir; aleller gamette ayrı kalır.
            </p>
          </>
        )}
      </div>
      <Prediction
        id={`deviation-${kind}-${r}-${phase}`}
        expected={
          kind === "linkage" ? (m.AB === 0.25 ? "equal" : "unequal") : "same"
        }
        options={
          kind === "linkage"
            ? [
                ["equal", "Dört gamet eş paylı"],
                ["unequal", "Dört gamet eş paylı değil"],
              ]
            : [
                ["same", "Genotip oranı 1:2:1 kalır"],
                ["change", "Genotip oranı zorunlu 3:1 olur"],
              ]
        }
        explanation={
          kind === "linkage"
            ? `AB gametinin payı ${percent(m.AB)}. Eş dört pay yalnız seçili modelde r=%50 olduğunda oluşur.`
            : "Heterozigot fenotipi değişse bile R/r normal ayrılır; iki heterozigot çaprazında genotip oranı 1:2:1 kalır."
        }
      />
    </>
  );
}
function Blood() {
  const uid = useId();
  const [s, set] = useExploration("forge012-bio-kan-gruplari", {
    first: "AO",
    second: "BO",
    rh: false,
  });
  const first = (aboGenotypes as readonly string[]).includes(s.first)
      ? s.first
      : "AO",
    second = (aboGenotypes as readonly string[]).includes(s.second)
      ? s.second
      : "BO",
    m = aboCross(first, second);
  return (
    <>
      <h3>Önce alelleri, sonra fenotipleri birleştir</h3>
      <p>
        Üç yaygın alelli temel AB0 modeli kullanılır. Kare klinik kan nakli
        uygunluğu veya akrabalık kimliği belirlemez.
      </p>
      <div className="bio012-controls">
        {(["first", "second"] as const).map((k, i) => (
          <label key={k} htmlFor={uid + k}>
            {i + 1}. AB0 genotipi
            <ChoiceSelect
              id={uid + k}
              value={k === "first" ? first : second}
              onChange={(e) => set({ [k]: e.target.value })}
            >
              {aboGenotypes.map((g) => (
                <option key={g} value={g}>
                  {g} · {aboPhenotype(g)}
                </option>
              ))}
            </ChoiceSelect>
          </label>
        ))}
      </div>
      <label className="bio012-check">
        <input
          type="checkbox"
          checked={s.rh}
          onChange={(e) => set({ rh: e.target.checked })}
        />
        Bağımsız Dd × dd RhD modelini de göster
      </label>
      <Punnett
        first={first}
        second={second}
        cells={m.cells}
        phenotype={aboPhenotype}
      />
      <div className="bio012-result" data-model-result>
        <strong>AB0 fenotip olasılıkları</strong>
        <p>
          {Object.entries(m.probabilities)
            .map(([g, p]) => `${g}: ${percent(p)}`)
            .join("; ")}
          .
        </p>
        {s.rh && (
          <p>
            Dd × dd için Rh− %50. AB0 ile bağımsız kabul edildiğinde O, Rh−
            ortak olasılığı: {percent(m.probabilities.O * 0.5)}.
          </p>
        )}
        <p>
          Her kutu olası genotiptir; antijen ve plazma antikoru aynı yapı
          değildir.
        </p>
      </div>
      <Prediction
        id={`blood-${first}-${second}`}
        expected={m.probabilities.O > 0 ? "yes" : "no"}
        options={[
          ["yes", "O grubu çocuk mümkün"],
          ["no", "O grubu çocuk bu modelde mümkün değil"],
        ]}
        explanation="O fenotipli çocuk OO olmalıdır; her ebeveyn O aleli verebilmelidir. Fenotip etiketiyle genotip çiftini karıştırma."
      />
    </>
  );
}
function SexChromosomes() {
  const uid = useId();
  const [s, set] = useExploration("forge012-bio-eseyin-belirlenmesi", {
    mother: "Aa",
    father: "AY",
  });
  const mother = ["AA", "Aa", "aa"].includes(s.mother) ? s.mother : "Aa",
    father = ["AY", "aY"].includes(s.father) ? s.father : "AY",
    m = xLinkedCross(mother, father);
  return (
    <>
      <h3>X alelinin yolunu izle</h3>
      <p>
        X’e bağlı çekinik, tam ifadeli ve mutasyonsuz XX/XY okul modeli. A/a
        işlev alelleridir; gerçek bireylerin kimliği veya bütün gelişim
        çeşitliliği hakkında sonuç üretmez.
      </p>
      <div className="bio012-controls">
        <label htmlFor={uid + "-mother"}>
          XX ebeveynin alelleri
          <ChoiceSelect
            id={uid + "-mother"}
            value={mother}
            onChange={(e) => set({ mother: e.target.value })}
          >
            <option value="AA">XᴬXᴬ</option>
            <option value="Aa">XᴬXᵃ</option>
            <option value="aa">XᵃXᵃ</option>
          </ChoiceSelect>
        </label>
        <label htmlFor={uid + "-father"}>
          XY ebeveynin alelleri
          <ChoiceSelect
            id={uid + "-father"}
            value={father}
            onChange={(e) => set({ father: e.target.value })}
          >
            <option value="AY">XᴬY</option>
            <option value="aY">XᵃY</option>
          </ChoiceSelect>
        </label>
      </div>
      <Drawing title="Dört eş olasılıklı XX/XY birleşmesi">
        {m.cells.map((c, i) => (
          <g
            key={i}
            transform={`translate(${90 + i * 150} 130)`}
            data-x-genotype={c.genotype}
            data-affected={c.affected}
          >
            <path
              d="M-28-38 l 35 76 m-35 0 35-76"
              className="bio012-maternal"
            />
            {c.sex === "XX" ? (
              <path
                d="M17-38 l 35 76 m-35 0 35-76"
                className="bio012-paternal"
              />
            ) : (
              <path
                d="M17-38 l 18 31 18-31 m-18 31 v 45"
                className="bio012-paternal"
              />
            )}
            <circle
              cy="85"
              r="15"
              className={c.affected ? "bio012-affected" : "bio012-clear"}
            />
          </g>
        ))}
      </Drawing>
      <div className="bio012-result" data-model-result>
        <strong>Özelliği gösteren tüm çocuklar: {percent(m.affected)}</strong>
        <p>
          XY çocuklar arasında: {percent(m.sonsAffected)}; XX çocuklar arasında:{" "}
          {percent(m.daughtersAffected)}.
        </p>
        <ul>
          {m.cells.map((c, i) => (
            <li key={i}>
              {c.genotype} · {c.sex} ·{" "}
              {c.affected
                ? "özelliği gösterir"
                : c.carrier
                  ? "taşıyıcı, özelliği göstermez"
                  : "özelliği göstermez"}{" "}
              · %25
            </li>
          ))}
        </ul>
        <p>
          Turuncu çizgi XX ebeveynden gelen X’i, yeşil çizgi XY ebeveynden gelen
          X veya Y’yi temsil eder. Dolu küçük daire özelliği gösteren birleşmeyi
          işaretler.
        </p>
      </div>
      <Prediction
        id={`sex-${mother}-${father}`}
        expected={String(m.sonsAffected)}
        options={[
          ["0", "XY çocukların hiçbiri"],
          ["0.5", "XY çocukların yarısı"],
          ["1", "XY çocukların tamamı"],
        ]}
        explanation="XY çocuk X’i XX ebeveynden, Y’yi XY ebeveynden alır. Bu nedenle X’e bağlı çekinik özellikte oğulların koşullu payı annenin verdiği a alelinin payına bağlıdır."
      />
    </>
  );
}
function Pedigree() {
  const [s, set] = useExploration("forge012-bio-soy-agaclari", {
    father: false,
    mother: false,
    child: false,
    daughter: true,
  });
  const m = pedigreeCandidates(s);
  return (
    <>
      <h3>Aynı aileyi beş modelle sına</h3>
      <p>
        Bir ebeveyn çifti ve tek çocuk için doluluğu değiştir. Tek lokus, tam
        ifade, yeni mutasyon yokluğu ve standart XX/XY aktarımı varsayılıyor.
        Dolu simge incelenen fenotipi gösterir; otomatik aa demek değildir.
      </p>
      <div className="bio012-pedigree-actions">
        {(["father", "mother", "child"] as const).map((k, i) => (
          <label className="bio012-check" key={k}>
            <input
              type="checkbox"
              checked={s[k]}
              onChange={(e) => set({ [k]: e.target.checked })}
            />
            {
              [
                "Baba özelliği gösteriyor",
                "Anne özelliği gösteriyor",
                "Çocuk özelliği gösteriyor",
              ][i]
            }
          </label>
        ))}
        <label className="bio012-check">
          <input
            type="checkbox"
            checked={s.daughter}
            onChange={(e) => set({ daughter: e.target.checked })}
          />
          Çocuk kız (XX modeli)
        </label>
      </div>
      <Drawing
        title="Dolu simgeler özelliği gösteren aile bireyleridir"
        height={320}
      >
        <path d="M200 85 h 240 M320 85 v 120" className="bio012-connection" />
        <rect
          x="160"
          y="45"
          width="80"
          height="80"
          rx="4"
          className={s.father ? "bio012-affected" : "bio012-clear"}
          data-person="father"
        />
        <circle
          cx="440"
          cy="85"
          r="40"
          className={s.mother ? "bio012-affected" : "bio012-clear"}
          data-person="mother"
        />
        {s.daughter ? (
          <circle
            cx="320"
            cy="245"
            r="40"
            className={s.child ? "bio012-affected" : "bio012-clear"}
            data-person="child"
          />
        ) : (
          <rect
            x="280"
            y="205"
            width="80"
            height="80"
            rx="4"
            className={s.child ? "bio012-affected" : "bio012-clear"}
            data-person="child"
          />
        )}
      </Drawing>
      <div className="bio012-result" data-model-result>
        <strong>{m.length} uyumlu temel model</strong>
        <ul>
          {m.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong>: örnek uyumlu atama {c.witness}
            </li>
          ))}
        </ul>
        <p>
          Uyumlu model sayısı hastalık olasılığı değildir. Bir model için örnek
          atama bulunması onun gerçek ailede kanıtlandığı anlamına gelmez.
        </p>
      </div>
      <Prediction
        id={`pedigree-${s.father}-${s.mother}-${s.child}-${s.daughter}`}
        expected={m.some((c) => c.id === "AR") ? "yes" : "no"}
        options={[
          ["yes", "Otozomal çekinik model uyumlu olabilir"],
          ["no", "Otozomal çekinik model bu aileyle uyuşmaz"],
        ]}
        explanation="Her kişinin fenotipiyle uyumlu olası ebeveyn genotipleri ayrı denenir; en az bir geçerli çocuk birleşmesi modeli mümkün kılar. Fenotipten tek genotip uydurulmaz."
      />
    </>
  );
}
export default function Forge012BiologyLab({ id }: { id: string }) {
  return (
    <section className="bio012" data-forge012={id}>
      {id === "eseyli-ureme" ? (
        <Sexual />
      ) : id === "kalitima-giris" ? (
        <Gametes />
      ) : id === "mendel-genetigi" ? (
        <Mendel />
      ) : id === "mendelden-sapmalar" ? (
        <Deviations />
      ) : id === "kan-gruplari" ? (
        <Blood />
      ) : id === "eseyin-belirlenmesi" ? (
        <SexChromosomes />
      ) : (
        <Pedigree />
      )}
      <p className="small muted bio 012-evidence">
        Bu keşif seçimleri cihazda saklanır; bağımsız soru sonucu, XP veya konu
        tamamlanması oluşturmaz.
      </p>
    </section>
  );
}
