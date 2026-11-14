import { useId } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useExploration } from "./useExploration";
import { clampInt } from "./mathModels";
import "./ottomanWorkshop.css";

type EvidenceTask = {
  evidence: string;
  answer: number;
  reason: string;
  limit: string;
  chain: [string, string, string];
};
export const ottomanEvidence: Record<
  string,
  { choices: string[]; tasks: EvidenceTask[] }
> = {
  "osmanli-kurulus-siyaseti": {
    choices: ["İskân", "İstimâlet", "Satın alma", "Çeyiz"],
    tasks: [
      {
        evidence:
          "Bir yönetim, yeni aldığı bölgedeki boş tarım alanlarına aileler yerleştirip üretim ve yol güvenliğinin sürekliliğini destekliyor. Hangi araç en doğrudan anlatılıyor?",
        answer: 0,
        reason:
          "Belirleyici kanıt ailelerin yerleştirilmesidir. Nüfus, üretim ve yerleşim bağı iskânı gösterir.",
        limit:
          "Yerleştirme bilgisi tek başına yerel halkın bütün kültürel farklılıklarının kaybolduğunu göstermez.",
        chain: ["Nüfus", "Yerleştirme", "Üretim ve kalıcılık"],
      },
      {
        evidence:
          "Bir metin, fethedilen şehir halkının güveninin kazanılması için can-mal güvenliğinin gözetildiğini ve yerel ilişkilerin uzlaşmayla yürütüldüğünü anlatıyor. Aile naklinden söz etmiyor. Hangi araç öne çıkar?",
        answer: 1,
        reason:
          "Güven kazanma ve uzlaştırıcı yerel siyaset istimâleti gösterir. Nüfus nakli verilmediğinden iskânı doğrudan seçemeyiz.",
        limit:
          "Bir siyasetin güven kazanmayı amaçlaması, her yerde bütün sorunların tamamen bittiğini kanıtlamaz.",
        chain: ["Yerel halk", "Güven ve uzlaşma", "Yönetimle bağ"],
      },
      {
        evidence:
          "Bir beylikten bazı şehirlerin belirli bir bedel karşılığında alındığı yazılıdır. Metin evlilik veya silahlı çatışma vermemektedir. Hangi araç açıkça kanıtlıdır?",
        answer: 2,
        reason:
          "Bedel karşılığı devir satın almayı gösterir. Amaç siyasi genişleme olabilir; kullanılan araç burada savaştan farklıdır.",
        limit:
          "Bu tek olay, öteki bütün toprak kazanımlarının da aynı yöntemle gerçekleştiğini göstermez.",
        chain: ["Bedel", "Satın alma", "Toprak kazanımı"],
      },
      {
        evidence:
          "İki hanedan arasında kurulan evlilikle bazı yerlerin evlenen tarafa bırakıldığı anlatılıyor. Bu aktarıma hangi kavram daha doğrudan karşılık gelir?",
        answer: 3,
        reason:
          "Hanedan evliliğiyle verilen yerler çeyiz aracını gösterir. Bu, hukuki-hanedan ilişkilerinin siyasi sonuç doğurabilmesine örnektir.",
        limit:
          "Aynı beyliğin daha sonraki vasiyet veya savaşla katılma aşaması bu olayla eşitlenmez.",
        chain: ["Hanedan evliliği", "Çeyiz", "Siyasi sonuç"],
      },
    ],
  },
  "osmanli-askeri-teskilat": {
    choices: [
      "Yeniçeri",
      "Tımarlı sipahi",
      "Kapıkulu süvarisi",
      "Yaya / müsellem",
    ],
    tasks: [
      {
        evidence:
          "Profil: sürekli merkez piyadesi; merkez hazinesinden ulufe; kapıkulu ocaklarından biri. Üç bilgiyi birlikte kullandığında hangi seçim en uygundur?",
        answer: 0,
        reason:
          "Merkez + ulufe + piyade özellikleri yeniçeriyi işaret eder. Ulufe tek başına bütün kapıkulunun piyade olduğunu söylemez.",
        limit:
          "Bu profil, bütün askerlerin aynı kaynaktan veya aynı görevle yetiştiği sonucunu vermez.",
        chain: ["Merkez hazinesi", "Ulufeli piyade", "Merkez kuvveti"],
      },
      {
        evidence:
          "Profil: taşrada belirli vergi gelirleri hizmet karşılığı tahsis edilmiş; gelire göre cebelü yetiştiriyor ve atlı olarak sefere katılıyor. Hangi seçim uygundur?",
        answer: 1,
        reason:
          "Dirlik geliri, taşra ve cebelü yükümlülüğü birlikte tımarlı sipahiyi gösterir.",
        limit:
          "Gelir tahsisi toprağın keyfî özel mülkiyeti veya istediğini vergilendirme hakkı değildir.",
        chain: ["Dirlik geliri", "Sipahi ve cebelü", "Taşra atlı gücü"],
      },
      {
        evidence:
          "Profil: atlı; merkezî kapıkulu düzeninde; hazineden ulufe alıyor. ‘Atlı’ sözcüğüne tek başına bağlanmadan hangi seçim yapılmalıdır?",
        answer: 2,
        reason:
          "Atlı olup merkezden ulufe alması kapıkulu süvarisine uygundur. Tımarlı sipahi için dirlik geliri ve taşra hizmeti belirleyicidir.",
        limit:
          "Aynı savaş alanında bulunmak farklı gelir ve teşkilat düzenlerini tekleştirmez.",
        chain: ["Merkez hazinesi", "Ulufeli atlı", "Kapıkulu süvarisi"],
      },
      {
        evidence:
          "Profil: Orhan Bey döneminin ilk düzenli piyade ve atlı birlikleri; sonraki merkez ocaklarından önce bir kurumlaşma adımı. Hangi seçim uygundur?",
        answer: 3,
        reason:
          "Orhan Bey dönemindeki ilk düzenli yaya ve müsellem birlikleri anlatılıyor; yaya piyade, müsellem atlıdır.",
        limit:
          "İlk düzenli birlik olmak, Osmanlı tarihinin bütün dönemlerinde aynı görevde kalmayı gerektirmez.",
        chain: ["Süreklilik ihtiyacı", "Yaya / müsellem", "Düzenli birlik"],
      },
    ],
  },
  "osmanli-medeniyeti": {
    choices: ["Müderris", "Kadı", "Müftü", "Kalemiye"],
    tasks: [
      {
        evidence:
          "Bir görevli medresede belirli derslerin öğretimini yürütüyor. Metin mahkeme hükmü veya mali kayıt görevinden söz etmiyor. Hangi seçim uygundur?",
        answer: 0,
        reason: "Ayırıcı eylem medresede öğretimdir; bu müderrisi gösterir.",
        limit:
          "İlmiye içinde olmak, kadı veya müftünün bütün görevlerini de aynı kişinin yaptığı anlamına gelmez.",
        chain: ["Medrese", "Öğretim", "Müderris"],
      },
      {
        evidence:
          "Bir görevli şehirdeki bir uyuşmazlığı hükme bağlayıp mahkeme kaydına geçiriyor. Hangisi en doğrudan karşılıktır?",
        answer: 1,
        reason:
          "Yargılama, hüküm ve mahkeme kaydı kadının ayırıcı işleridir; kadının şehirle ilgili başka görevleri de olabilir.",
        limit:
          "Hüküm vermek ile dinî-hukuki görüş bildirmek aynı işlem değildir.",
        chain: ["Uyuşmazlık", "Hüküm ve kayıt", "Kadı"],
      },
      {
        evidence:
          "Bir mesele için dinî-hukuki görüş isteniyor; görevli fetva bildiriyor. Hangisi en doğrudan karşılıktır?",
        answer: 2,
        reason:
          "Fetva bir görüş bildirme işlemidir; müftüyle eşleştirilir. Soru mahkeme hükmü vermiyor.",
        limit:
          "Aynı ilmiye alanında bulunmaları, müftü ile kadının işlemlerini özdeş yapmaz.",
        chain: ["Hukuki mesele", "Fetva / görüş", "Müftü"],
      },
      {
        evidence:
          "Bir görev çevresi resmî yazışmaları, mali hesapları ve diplomatik kayıtları yürütüyor. Hangi sınıflandırma uygundur?",
        answer: 3,
        reason:
          "Yazışma, maliye ve diplomasi kalem ehlinin, yani kalemiyenin temel işlevleridir.",
        limit:
          "Bir yönetici yazı da yazabilir; görev sınıfı tek bir gündelik hareketten değil, temel yetkiden belirlenir.",
        chain: ["Yazı ve maliye", "Bürokratik kayıt", "Kalemiye"],
      },
    ],
  },
};

export default function OttomanWorkshop({ id }: { id: string }) {
  const data = ottomanEvidence[id];
  const label = useId();
  const [saved, set] = useExploration(`ottoman-evidence:${id}`, {
    task: 0,
    selected: -1,
    checked: false,
  });
  if (!data) return null;
  const index = clampInt(saved.task, 0, data.tasks.length - 1);
  const selected = clampInt(saved.selected, -1, data.choices.length - 1);
  const current = data.tasks[index];
  const correct = selected === current.answer;
  const changeTask = (next: number) =>
    set({ task: next, selected: -1, checked: false });
  return (
    <section
      className="concept-model ottoman-workshop"
      aria-labelledby={`${label}-heading`}
    >
      <h3 id={`${label}-heading`}>Kanıttan kavrama: sen seç</h3>
      <p className="small muted">
        Örnek {index + 1}/{data.tasks.length} · Önce kanıtı oku, sonra kavramı
        seç.
      </p>
      <p className="ottoman-evidence">{current.evidence}</p>
      <div
        className="ottoman-choices"
        role="group"
        aria-label="Kanıtın gösterdiği kavram"
      >
        {data.choices.map((choice, i) => (
          <button
            key={choice}
            className="secondary"
            aria-pressed={selected === i}
            onClick={() => set({ selected: i, checked: false })}
          >
            {choice}
          </button>
        ))}
      </div>
      <button
        className="secondary"
        disabled={selected < 0}
        onClick={() => set({ checked: true })}
      >
        Gerekçeyle kontrol et
      </button>
      {saved.checked && (
        <div className="ottoman-feedback" role="status">
          <strong>
            {correct
              ? "Kanıtla uyumlu."
              : `Bu kanıt ${data.choices[current.answer]} seçimini destekliyor.`}
          </strong>
          <p>{current.reason}</p>
          <svg
            viewBox="0 0 600 100"
            role="img"
            aria-label={`${current.chain.join(" → ")}. ${current.limit}`}
          >
            <path
              className="ottoman-flow"
              d="M100 50H290M310 50H500"
              fill="none"
              stroke="var(--plot-blue)"
              strokeWidth="3"
              strokeDasharray="9 6"
            />
            {[80, 300, 520].map((x, i) => (
              <g key={x}>
                <circle
                  cx={x}
                  cy="50"
                  r="27"
                  fill="var(--surface)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <text x={x} y="56" textAnchor="middle" fill="var(--text)">
                  {i === 0 ? "?" : i === 1 ? "→" : "✓"}
                </text>
              </g>
            ))}
          </svg>
          <ol className="ottoman-chain">
            {current.chain.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            <strong>Buradan ötesini çıkarma:</strong> {current.limit}
          </p>
        </div>
      )}
      <div className="ottoman-controls">
        <button
          className="text-button"
          disabled={index === 0}
          onClick={() => changeTask(index - 1)}
        >
          <ArrowLeft size={16} /> Önceki örnek
        </button>
        <button
          className="text-button"
          disabled={index === data.tasks.length - 1}
          onClick={() => changeTask(index + 1)}
        >
          Sonraki örnek <ArrowRight size={16} />
        </button>
      </div>
      <p className="small muted">
        Bu atölye açıklamalı keşiftir; ilerleme, doğru cevap kaydı veya XP
        oluşturmaz. Bağımsız çalışma için Sorular bölümündeki ayrı seti çöz.
      </p>
    </section>
  );
}
