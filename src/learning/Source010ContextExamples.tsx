import { useId } from "react";
import { priceEq036System, transferEq036System } from "./linearSystemsSource036Model";
import { r035Text, type R035 } from "./rationalSource035Model";
import { useExploration } from "./useExploration";

const defaults = { firstReceipt: 31, secondReceipt: 34, litres: 18, moved: 3, context: "price" };
type Control = Exclude<keyof typeof defaults, "context">;

const amount = (value: number, maximum: number) =>
  Number.isSafeInteger(value) ? Math.max(0, Math.min(maximum, value)) : 0;

function TankLevels({ before, after, total }: {
  before: { x: R035; y: R035 };
  after: { x: R035; y: R035 };
  total: number;
}) {
  const pixels = (value: R035) => total === 0 ? 0 : 150 * Number(value.n) / Number(value.d) / total;
  return (
    <figure className="f036-system-figure">
      <svg viewBox="0 0 400 190" role="img" aria-label={`Aktarım öncesinde A ${r035Text(before.x)}, B ${r035Text(before.y)} litre. Aktarımdan sonra A ${r035Text(after.x)}, B ${r035Text(after.y)} litre.`}>
        <text x="25" y="28">Önce</text>
        <text x="25" y="126">Sonra</text>
        <text x="25" y="74">A</text>
        <text x="215" y="74">B</text>
        <text x="25" y="172">A</text>
        <text x="215" y="172">B</text>
        <rect className="f036-box" x="52" y="49" width="150" height="30" />
        <rect className="f036-box" x="242" y="49" width="150" height="30" />
        <rect className="f036-box" x="52" y="147" width="150" height="30" />
        <rect className="f036-box" x="242" y="147" width="150" height="30" />
        <rect className="f036-bar-a" x="52" y="49" width={pixels(before.x)} height="30" />
        <rect className="f036-bar-b" x="242" y="49" width={pixels(before.y)} height="30" />
        <rect className="f036-bar-a" x="52" y="147" width={pixels(after.x)} height="30" />
        <rect className="f036-bar-b" x="242" y="147" width={pixels(after.y)} height="30" />
      </svg>
      <figcaption>Çubuk uzunluğu, her deponun toplam sıvıdan aldığı payı gösterir.</figcaption>
    </figure>
  );
}

export function Source010ContextExamples() {
  const uid = useId();
  const [values, set] = useExploration("linear-systems-source-010-context", defaults);
  const firstReceipt = amount(values.firstReceipt, 90);
  const secondReceipt = amount(values.secondReceipt, 90);
  const litres = amount(values.litres, 60);
  const moved = amount(values.moved, 40);
  const isTank = values.context === "tank";
  const prices = isTank ? null : priceEq036System([[2, 3, firstReceipt], [3, 2, secondReceipt]]);
  const tank = isTank ? transferEq036System(litres, moved) : null;

  const slider = (key: Control, label: string, value: number, maximum: number) => (
    <div className="f036-range">
      <div><label htmlFor={`${uid}-${key}`}>{label}</label><output htmlFor={`${uid}-${key}`}>{value}</output></div>
      <input id={`${uid}-${key}`} type="range" min="0" max={maximum} value={value}
        onChange={(event) => set({ [key]: event.currentTarget.valueAsNumber })} />
    </div>
  );

  return (
    <details className="f036-system-context">
      <summary>Fiyat ve depo problemlerini dene</summary>
      <div className="f036-actions" role="group" aria-label="Günlük problem">
        <button className="secondary" type="button" aria-pressed={!isTank} onClick={() => set({ context: "price" })}>Fiyatları bul</button>
        <button className="secondary" type="button" aria-pressed={isTank} onClick={() => set({ context: "tank" })}>Depoları eşitle</button>
      </div>
      {prices && (
        <section aria-label="Alışveriş fiyatları">
          <p>x, A ürününün birim fiyatı. y, B ürününün birim fiyatı. Aynı ürünün fiyatı iki alışverişte de sabit.</p>
          {slider("firstReceipt", "2 A ve 3 B için toplam (TL)", firstReceipt, 90)}
          {slider("secondReceipt", "3 A ve 2 B için toplam (TL)", secondReceipt, 90)}
          <p>2x + 3y = {firstReceipt}. 3x + 2y = {secondReceipt}.</p>
          <div aria-live="polite">
            {prices.kind === "valid" && prices.solution.point && prices.checks ? (
              <p>A {r035Text(prices.solution.point.x)} TL, B {r035Text(prices.solution.point.y)} TL. Kontrol edildiğinde iki toplam {r035Text(prices.checks.rows[0].left)} TL ve {r035Text(prices.checks.rows[1].left)} TL çıkar.</p>
            ) : (
              <p>Bu iki toplamla pozitif iki birim fiyat bulunamıyor.</p>
            )}
          </div>
        </section>
      )}
      {tank && (
        <section aria-label="Depolar arasında sıvı aktarımı">
          <p>A’dan B’ye sıvı aktarılıyor. Toplam miktar korunuyor. Aktarımdan sonra iki depoda da aynı miktar bulunuyor.</p>
          {slider("litres", "Toplam sıvı (litre)", litres, 60)}
          {slider("moved", "A’dan B’ye aktarılan (litre)", moved, 40)}
          <p>Başlangıçta A + B = {litres}. Eşitlik için A − {moved} = B + {moved}.</p>
          <div aria-live="polite">
            {tank.after ? (
              <>
                <TankLevels before={tank.initial} after={tank.after} total={litres} />
                <p>Başlangıçta A {r035Text(tank.initial.x)} litre, B {r035Text(tank.initial.y)} litre. Aktarımdan sonra iki depoda da {r035Text(tank.after.x)} litre bulunur.</p>
              </>
            ) : (
              <p>Bu miktarda aktarım mümkün değil. Hesap, B deposunun başlangıçta negatif miktar taşımasını gerektiriyor.</p>
            )}
          </div>
        </section>
      )}
    </details>
  );
}
