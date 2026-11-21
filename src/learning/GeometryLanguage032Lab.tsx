import { useEffect, useId, useRef, useState } from "react";
import { useExploration } from "./useExploration";
import "./geometryLanguage032.css";

const objectNames = {
  line: "Doğru",
  ray: "Işın",
  segment: "Doğru parçası",
} as const;
const descriptions = {
  line: "AB doğrusu iki yönde sınırsızdır. A ve B, doğru üzerindeki iki farklı noktadır; doğrunun uçları değildir.",
  ray: "[AB ışını A’dan başlar ve B yönünde sınırsız uzanır. B’yi ileri taşımak yeni bir uç oluşturmaz.",
  segment:
    "[AB] doğru parçası A ve B arasında iki uçla sınırlıdır. B’yi taşımak parçanın uzunluğunu değiştirir.",
} as const;

export default function GeometryLanguage032Lab({ id }: { id: string }) {
  const uid = useId();
  const [v, set] = useExploration(`g032:language:${id}`, {
    mode: "objects",
    object: "line",
    pointB: 410,
    angle: 60,
    pair: "corresponding",
    letters: false,
    turnStep: 0,
  });
  const ref = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(640);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const resize = () => setWidth(svg.getBoundingClientRect().width || 640);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);
  const object =
    v.object === "ray" || v.object === "segment" ? v.object : "line";
  const mode =
    v.mode === "parallels" || v.mode === "rotation" ? v.mode : "objects";
  const turnStep = Math.min(
    5,
    Math.max(0, Math.round(Number.isFinite(v.turnStep) ? v.turnStep : 0)),
  );
  const pointB = Math.min(
    470,
    Math.max(300, Number.isFinite(v.pointB) ? v.pointB : 410),
  );
  const angle = Math.min(
    130,
    Math.max(50, Number.isFinite(v.angle) ? v.angle : 60),
  );
  const letters = v.letters;
  const pair = letters
    ? v.pair === "sourceSame"
      ? "sourceSame"
      : "alternate"
    : v.pair === "alternate" || v.pair === "sameSide"
      ? v.pair
      : "corresponding";
  const font = Math.max(20, (15 * 640) / Math.max(1, width));
  const selected =
    pair === "corresponding"
      ? [1, 5]
      : pair === "alternate"
        ? [3, 5]
        : pair === "sourceSame"
          ? [3, 8]
          : [2, 5];
  const topX = 320;
  const cot = 1 / Math.tan((angle * Math.PI) / 180);
  const topY = 180;
  const lowerY = 410;
  const lowerX = topX - (lowerY - topY) * cot;
  // Place each numeral inside its actual angle, along the angle bisector.
  // The old fixed offsets put opaque number discs over the transversal.
  // Leave room for the rendered type size instead of erasing a line behind it.
  const halfNarrow = (Math.min(angle, 180 - angle) * Math.PI) / 360;
  // Measured Lexend glyph boxes include tall ascenders and a middle-baseline offset.
  // Keep that whole box clear of lines without reducing the selected text size.
  const labelDistance = Math.max(76, (font * 0.85 + 8) / Math.sin(halfNarrow));
  const labels = [topY, lowerY]
    .flatMap((y, cross) =>
      [0, -90, 180, 90].map((offset, index) => {
        const direction = ((angle / 2 + offset) * Math.PI) / 180;
        const x = cross === 0 ? topX : lowerX;
        return [
          4 * cross + index + 1,
          x + labelDistance * Math.cos(direction),
          y - labelDistance * Math.sin(direction),
        ];
      }),
    )
    .filter(([number]) => !letters || [3, 5, 8].includes(number));
  const relation = letters
    ? pair === "sourceSame"
      ? `a ve c aynı yan iç: ${angle}° + ${180 - angle}° = 180°. Paralellik koşulu kullanıldı.`
      : `a ve b iç ters: ${angle}° = ${angle}°. Paralellik koşulu kullanıldı.`
    : pair === "corresponding"
      ? `1 ve 5 yöndeş: ${angle}° = ${angle}°. İki kesişimde aynı konumdalar.`
      : pair === "alternate"
        ? `3 ve 5 iç ters: ${angle}° = ${angle}°. Paraleller arasında, kesenin karşı yanlarındalar.`
        : `2 ve 5 aynı yan iç: ${180 - angle}° + ${angle}° = 180°. Paraleller arasında, kesenin aynı yanındalar.`;

  return (
    <section className="visual-lab gl032-lab" aria-labelledby={`${uid}-title`}>
      <h2 id={`${uid}-title`}>Çizimin dilini keşfet</h2>
      <p>
        Nesneyi veya açı çiftini seç. Okları, uçları ve verilen koşulu okuyarak
        açıklamayı karşılaştır.
      </p>
      <div role="group" aria-label="Şema türü" className="gl032-options">
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "objects"}
          onClick={() => set({ mode: "objects" })}
        >
          Doğru, ışın, parça
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "parallels"}
          onClick={() => set({ mode: "parallels" })}
        >
          Paralel açı çiftleri
        </button>
        <button
          type="button"
          className="secondary"
          aria-pressed={mode === "rotation"}
          onClick={() => set({ mode: "rotation" })}
        >
          Tam turda dönüş
        </button>
      </div>
      {mode === "objects" ? (
        <>
          <div
            role="group"
            aria-label="Geometrik nesne"
            className="gl032-options"
          >
            {(
              Object.entries(objectNames) as [
                keyof typeof objectNames,
                string,
              ][]
            ).map(([key, label]) => (
              <button
                type="button"
                className="secondary"
                key={key}
                aria-pressed={object === key}
                onClick={() => set({ object: key })}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="gl032-range" htmlFor={`${uid}-point-b`}>
            <span>
              B noktasının konumu <output>{pointB}</output>
            </span>
            <input
              id={`${uid}-point-b`}
              type="range"
              min="300"
              max="470"
              step="10"
              value={pointB}
              onChange={(event) => set({ pointB: Number(event.target.value) })}
            />
          </label>
        </>
      ) : mode === "rotation" ? (
        <div className="gl032-rotation">
          <h3>Dönüşü çizerek denetle</h3>
          <p>
            Bu özgün çözüm çiziminde dikdörtgen duvarlar, saat yönünde eşit beş
            adımda bir tam tur ve 2. ışının alt kenarla, 3. ışının sol kenarla
            eş dar açılar yapması kullanılıyor. 6. ışın 1. ışınla çakışır.
          </p>
          <div className="gl032-options">
            <button
              type="button"
              className="secondary"
              disabled={turnStep === 0}
              onClick={() => set({ turnStep: turnStep - 1 })}
            >
              Önceki dönüş
            </button>
            <button
              type="button"
              className="secondary"
              disabled={turnStep === 5}
              onClick={() => set({ turnStep: turnStep + 1 })}
            >
              Sonraki dönüş
            </button>
          </div>
          <p role="status">
            {turnStep + 1}. ışın · {turnStep} eş adım · {turnStep * 72}° toplam
            dönüş.{" "}
            {turnStep === 5
              ? "360° tamamlandı; 6. ve 1. ışın aynı yönde."
              : "Her adım 72°dir."}
          </p>
        </div>
      ) : (
        <>
          <label className="gl032-condition" htmlFor={`${uid}-letters`}>
            <input
              id={`${uid}-letters`}
              type="checkbox"
              checked={letters}
              onChange={(event) =>
                set({ letters: event.target.checked, pair: "alternate" })
              }
            />
            Kaynak şemasını a, b, c ile göster
          </label>
          <div
            role="group"
            aria-label="Paralel açı çifti"
            className="gl032-options"
          >
            {!letters ? (
              <>
                <button
                  type="button"
                  className="secondary"
                  aria-pressed={pair === "corresponding"}
                  onClick={() => set({ pair: "corresponding" })}
                >
                  Yöndeş 1–5
                </button>
                <button
                  type="button"
                  className="secondary"
                  aria-pressed={pair === "alternate"}
                  onClick={() => set({ pair: "alternate" })}
                >
                  İç ters 3–5
                </button>
                <button
                  type="button"
                  className="secondary"
                  aria-pressed={pair === "sameSide"}
                  onClick={() => set({ pair: "sameSide" })}
                >
                  Aynı yan iç 2–5
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="secondary"
                  aria-pressed={pair === "alternate"}
                  onClick={() => set({ pair: "alternate" })}
                >
                  İç ters a–b
                </button>
                <button
                  type="button"
                  className="secondary"
                  aria-pressed={pair === "sourceSame"}
                  onClick={() => set({ pair: "sourceSame" })}
                >
                  Aynı yan iç a–c
                </button>
              </>
            )}
          </div>
          <label className="gl032-range" htmlFor={`${uid}-angle`}>
            <span>
              {letters ? "a açısı" : "1 numaralı açı"} <output>{angle}°</output>
            </span>
            <input
              id={`${uid}-angle`}
              type="range"
              min="50"
              max="130"
              step="5"
              value={angle}
              onChange={(event) => set({ angle: Number(event.target.value) })}
            />
          </label>
          <p className="gl032-condition">
            Verilen koşul: d₁ ∥ d₂. İki yatay doğru paraleldir; eğik çizgi
            kesendir.
          </p>
        </>
      )}
      <svg
        ref={ref}
        viewBox={`0 0 640 ${mode === "objects" ? 240 : mode === "rotation" ? 560 : 620}`}
        role="img"
        aria-label={
          mode === "objects"
            ? `${objectNames[object]}: ${descriptions[object]}`
            : mode === "rotation"
              ? "Dikdörtgen bölgede bir noktadan çıkan ve72° eş dönüşle sıralanan ışınlar. Tamamlanmış çözümde2. ışın alt kenara,3. ışın sol kenara81° yapar;4. ışının üst kenara yaptığı dar açı63°dir."
              : `Paralel iki doğru ve kesen. ${relation}`
        }
        data-testid="geometry-language032-svg"
        style={{ fontSize: font }}
      >
        <defs>
          <marker
            id={`${uid}-arrow`}
            markerWidth="12"
            markerHeight="12"
            refX="9"
            refY="6"
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M2,1 L9,6 L2,11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </marker>
        </defs>
        {mode === "objects" ? (
          <>
            <line
              x1={object === "line" ? 65 : 170}
              y1="135"
              x2={object === "segment" ? pointB : 575}
              y2="135"
              markerStart={object === "line" ? `url(#${uid}-arrow)` : undefined}
              markerEnd={
                object === "segment" ? undefined : `url(#${uid}-arrow)`
              }
            />
            <circle cx="170" cy="135" r={object === "line" ? 6 : 9} />
            <circle cx={pointB} cy="135" r={object === "segment" ? 9 : 6} />
            <text x="170" y="95" textAnchor="middle">
              A
            </text>
            <text x={pointB} y="95" textAnchor="middle">
              B
            </text>
          </>
        ) : mode === "rotation" ? (
          <g className="gl032-room">
            <rect
              x="70"
              y="95"
              width="500"
              height="320"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle cx="320" cy="255" r="6" />
            {Array.from({ length: Math.min(5, turnStep + 1) }, (_, index) => {
              const direction = ((27 + 72 * index) * Math.PI) / 180;
              const dx = Math.cos(direction),
                dy = Math.sin(direction);
              const distance = Math.min(
                dx > 0 ? 250 / dx : dx < 0 ? -250 / dx : Infinity,
                dy > 0 ? 160 / dy : dy < 0 ? -160 / dy : Infinity,
              );
              const x = 320 + distance * dx,
                y = 255 + distance * dy;
              const label =
                index === 0
                  ? [600, y]
                  : index === 1
                    ? [x, 455]
                    : index === 2
                      ? [35, y]
                      : [x, 60];
              return (
                <g key={index}>
                  <line
                    x1="320"
                    y1="255"
                    x2={x}
                    y2={y}
                    className={
                      index === (turnStep === 5 ? 0 : turnStep)
                        ? "gl032-transversal"
                        : ""
                    }
                  />
                  <text
                    x={label[0]}
                    y={label[1]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
          </g>
        ) : (
          <>
            <line x1="35" y1={topY} x2="605" y2={topY} />
            <line x1="35" y1={lowerY} x2="605" y2={lowerY} />
            <line
              x1={topX + (topY - 60) * cot}
              y1="60"
              x2={topX - (530 - topY) * cot}
              y2="530"
              className="gl032-transversal"
            />
            {labels.map(([n, x, y]) => (
              <g
                key={n}
                className={selected.includes(n) ? "gl032-selected" : ""}
              >
                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
                  {letters
                    ? ({ 3: "a", 5: "b", 8: "c" } as Record<number, string>)[n]
                    : n}
                </text>
              </g>
            ))}
          </>
        )}
      </svg>
      <p role="status" className="gl032-result">
        {mode === "objects"
          ? descriptions[object]
          : mode === "rotation"
            ? "Beş eş adım: 360°/5=72°. Diklikteki 90°−72°=18° iki eş paya ayrılır: 9°. Üst yatay kenarla aranan dar açı 72°−9°=63°dir."
            : relation}
      </p>
      {mode === "objects" ? (
        <p>
          Konum sayısı yalnız çizim içindeki yeri gösterir; santimetre veya açı
          ölçüsü değildir. Nokta boyutsuzdur; görünür benek çizim işaretidir.
        </p>
      ) : mode === "rotation" ? (
        <div className="gl032-official-reference">
          <p>
            2024 TYT Temel Matematik31. sorunun özgün çözüm açıklaması: resmî
            kitapçık fiziksel34. sayfa ve cevap anahtarı43. sayfa
            karşılaştırıldı; D seçeneği63°dir. Bu çizim öğretim için yeniden
            oluşturuldu; yukarıdaki bağımsız alıştırmalar resmî soru değildir.
          </p>
          <a
            href="https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf#page=34"
            target="_blank"
            rel="noopener noreferrer"
          >
            ÖSYM2024 TYT:31. sorunun bulunduğu resmî sayfa
          </a>
          <a
            href="https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf#page=43"
            target="_blank"
            rel="noopener noreferrer"
          >
            ÖSYM2024 TYT:resmî cevap anahtarı
          </a>
        </div>
      ) : (
        <p>
          Paralellik verilmeden farklı kesişimlerde bu eşitlikleri varsayma.
          Aynı kesişimdeki 1 ve 3 gibi ters açılar ise paralellikten bağımsız
          eşittir.
        </p>
      )}
      <p className="gl032-evidence">
        Şema seçmek ve sürgüyü değiştirmek konu tamamlama veya öğrenme puanı
        oluşturmaz. Seçimler bu cihazda saklanır.
      </p>
      <div className="gl032-sources">
        <h3>Güncel kaynağın MEB/OGM atıfları</h3>
        <p>
          Bu atıflar güncel yedi sayfalık kopya kağıdında yer alır. Aşağıdaki
          bağlantılar için internet gerekir; bu ünitenin aktarımı, bağlantı
          verilen kitapların tamamının işlendiği anlamına gelmez.
        </p>
        <a
          href="https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/kazanim_kavrama/pdf/9/matematik.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          MEB/OGM: Matematik 9 Kazanım Çalışmaları
        </a>
        <a
          href="https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/defterim/9/matematik/files/basic-html/page245.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          MEB/OGM: Defterim Matematik 9 · sayfa 245
        </a>
      </div>
      <div className="gl032-sources gl032-older-videos">
        <h3>Önceki kaynağın video önerileri</h3>
        <p>
          Bu iki bağlantı kaynağın önceki dört sayfalık sürümündeki önerilerdir.
          İnternet gerektirir; güncel oynatma durumu doğrulanmadı. Uygulamadaki
          anlatım ve sorular çevrimdışı kullanılabilir.
        </p>
        <a
          href="https://www.youtube.com/watch?v=gmdLObUrhys"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mert Hoca: Doğruda Açılar 1 · konu anlatımı
        </a>
        <a
          href="https://www.youtube.com/watch?v=yqtFTJChYqw"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mert Hoca: Doğruda Açılar · soru çözümü
        </a>
      </div>
    </section>
  );
}
