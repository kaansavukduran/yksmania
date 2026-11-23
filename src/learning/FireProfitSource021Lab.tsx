import { useId } from "react";
import { fireProfit021, parseLira021 } from "./fireProfitSource021Model";
import {
  r035,
  r035Abs,
  r035DecimalInfo,
  r035Div,
  r035Text,
  type R035,
} from "./rationalSource035Model";
import { useExploration } from "./useExploration";

const defaults = {
  purchased: 18,
  sellable: 15,
  cost: "360,00",
  price: "27,00",
};
const maxPurchased = 60;
type FireModel = ReturnType<typeof fireProfit021>;

function exactText(value: R035) {
  const decimal = r035DecimalInfo(value, 4);
  return (
    decimal.terminated && !decimal.truncated ? decimal.display : r035Text(value)
  ).replace("-", "−");
}

function money(cents: R035 | bigint) {
  const amount = typeof cents === "bigint" ? r035(cents) : cents;
  return `${exactText(r035Div(amount, r035(100)))} TL`;
}

function inputMoney(cents: bigint) {
  return `${cents / 100n},${String(cents % 100n).padStart(2, "0")}`;
}

function rateText(value: R035) {
  const magnitude = exactText(r035Abs(value));
  return magnitude.includes("/") ? `%(${magnitude})` : `%${magnitude}`;
}

function CountRange({
  label,
  min,
  max,
  value,
  change,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  change: (next: number) => void;
}) {
  return (
    <label className="field">
      <span>
        {label} <strong aria-hidden="true">{value}</strong>
      </span>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => change(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}

function MoneyField({
  label,
  value,
  invalid,
  helpId,
  change,
}: {
  label: string;
  value: string;
  invalid: boolean;
  helpId: string;
  change: (next: string) => void;
}) {
  return (
    <label className="field">
      {label}
      <input
        type="text"
        inputMode="decimal"
        maxLength={9}
        value={value}
        aria-invalid={invalid}
        aria-describedby={helpId}
        onChange={(event) => change(event.currentTarget.value)}
      />
    </label>
  );
}

function FirePicture({ model }: { model: FireModel }) {
  const id = useId();
  const left = 22,
    span = 410;
  const maximum = Number(
    model.revenueKurus > model.totalCostKurus
      ? model.revenueKurus
      : model.totalCostKurus,
  );
  const width = (cents: bigint) => (span * Number(cents)) / maximum;
  const description = `Alınan ${model.purchased} adet. Satılabilir ${model.sellable} adet. Toplam alış maliyeti ${money(model.totalCostKurus)}. Gelir ${money(model.revenueKurus)}.`;
  return (
    <figure style={{ marginInline: 0 }}>
      <svg
        className="f011m-diagram"
        viewBox="0 -10 454 191"
        role="img"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-caption`}
      >
        <title id={`${id}-title`}>{description}</title>
        <g aria-hidden="true">
          <text x={left} y="18" fill="var(--text)" fontSize="18">
            Alınan ve satılabilen ürünler
          </text>
          <rect
            data-stage="purchased"
            x={left}
            y="29"
            width={span}
            height="19"
            className="f011m-whole"
          />
          <rect
            data-stage="sellable"
            x={left}
            y="29"
            width={span * (model.sellable / model.purchased)}
            height="19"
            fill="var(--mint)"
          />
          <text x={left} y="83" fill="var(--text)" fontSize="18">
            Toplam alış maliyeti
          </text>
          <rect
            data-stage="cost"
            x={left}
            y="93"
            width={width(model.totalCostKurus)}
            height="17"
            fill="var(--accent)"
          />
          <text x={left} y="142" fill="var(--text)" fontSize="18">
            Toplam satış geliri
          </text>
          <rect
            data-stage="revenue"
            x={left}
            y="152"
            width={width(model.revenueKurus)}
            height="17"
            fill="var(--mint)"
          />
          {model.revenueKurus === 0n && (
            <path d={`M${left} 152v17`} className="f011m-axis" />
          )}
        </g>
      </svg>
      <figcaption id={`${id}-caption`} className="f011m-limit">
        {description} Üst sıradaki çerçeve alınan adedi, dolu bölüm satılabileni
        gösterir. Alt iki çubuk aynı TL ölçeğini kullanır.
      </figcaption>
    </figure>
  );
}

export function FireProfitSource021Lab() {
  const id = useId();
  const [saved, set] = useExploration("fire-profit-source-021", defaults);
  const purchased =
    Number.isInteger(saved.purchased) &&
    saved.purchased >= 1 &&
    saved.purchased <= maxPurchased
      ? saved.purchased
      : defaults.purchased;
  const savedSellable = Number.isInteger(saved.sellable)
    ? saved.sellable
    : defaults.sellable;
  const sellable = Math.min(purchased, Math.max(0, savedSellable));
  const totalCostKurus = parseLira021(saved.cost);
  const priceKurus = parseLira021(saved.price);
  const costValid = totalCostKurus !== null && totalCostKurus > 0n;
  const model =
    costValid && priceKurus !== null
      ? fireProfit021({
          purchased,
          sellable,
          totalCostKurus,
          priceKurus,
        })
      : null;
  const threshold = model?.perSellable?.minNoLossKurus;

  return (
    <details data-model="source021-fire-profit">
      <summary>Fireyle değişen maliyet ve kâr</summary>
      <p>
        Bir grup ürünün alış bedeli ödendi. Fireden gelir ve geri ödeme gelmez.
        Satılabilir ürünlerin hepsi seçtiğin fiyatla satılır.
      </p>
      <div className="f011m-controls">
        <CountRange
          label="Satılabilir adet"
          min={0}
          max={purchased}
          value={sellable}
          change={(sellable) => set({ sellable })}
        />
        <MoneyField
          label="Birim satış fiyatı (TL)"
          value={saved.price}
          invalid={priceKurus === null}
          helpId={id}
          change={(price) => set({ price })}
        />
      </div>
      <details>
        <summary>Alınan adedi ve toplam alış maliyetini değiştir</summary>
        <div className="f011m-controls">
          <CountRange
            label="Alınan adet"
            min={1}
            max={maxPurchased}
            value={purchased}
            change={(purchased) =>
              set({ purchased, sellable: Math.min(purchased, sellable) })
            }
          />
          <MoneyField
            label="Toplam alış maliyeti (TL)"
            value={saved.cost}
            invalid={!costValid}
            helpId={id}
            change={(cost) => set({ cost })}
          />
        </div>
      </details>
      <p id={id} className="f011m-limit">
        Fiyatı TL olarak yazabilirsin. Örnek 27,50.
      </p>
      <div className="f011m-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => set(defaults)}
        >
          Örneğe dön
        </button>
        {threshold !== undefined && (
          <button
            type="button"
            className="secondary"
            onClick={() => set({ price: inputMoney(threshold) })}
          >
            Zarar etmeme fiyatını dene
          </button>
        )}
      </div>
      <div className="f011m-result" role="status" data-fire-profit-result>
        {!model ? (
          <p>
            {!costValid ? "Toplam maliyet sıfırdan büyük olmalı. " : ""}
            {priceKurus === null ? "Geçerli bir satış fiyatı gir. " : ""}
            Tutarlar en çok iki kuruş basamağı içerebilir.
          </p>
        ) : (
          <>
            <p>
              {model.purchased} ürün alındı, {model.fire} ürün fire verdi,{" "}
              {model.sellable} ürün satılabilir. Ödenen toplam alış maliyeti{" "}
              <strong>{money(model.totalCostKurus)}</strong>. Alınan ürün başına{" "}
              {money(model.costPerPurchasedKurus)} ödendi.
            </p>
            <p>
              Satış geliri{" "}
              <strong>
                {model.sellable} × {money(model.priceKurus)} ={" "}
                {money(model.revenueKurus)}
              </strong>
              .
            </p>
            <p>
              {model.kind === "break-even" ? (
                <strong>Başa baş. Gelir maliyete eşit.</strong>
              ) : model.gainKurus > 0n ? (
                <strong>Kâr {money(model.gainKurus)}.</strong>
              ) : (
                <strong>Zarar {money(-model.gainKurus)}.</strong>
              )}
              {model.gainKurus !== 0n && (
                <>
                  {" "}
                  Maliyete göre {model.gainKurus > 0n
                    ? "kâr"
                    : "zarar"} oranı {rateText(model.gainPercent)}.
                </>
              )}
            </p>
            {model.perSellable ? (
              <>
                <p>
                  Satılabilir ürün başına maliyet{" "}
                  <strong>{money(model.perSellable.costKurus)}</strong>. Ürün
                  başına {model.perSellable.gainKurus.n < 0n ? "zarar" : "kâr"}{" "}
                  <strong>{money(r035Abs(model.perSellable.gainKurus))}</strong>
                  .
                </p>
                <p>
                  Kuruşla zarar etmeme fiyatı en az{" "}
                  <strong>{money(model.perSellable.minNoLossKurus)}</strong>.
                  Kesin kâr için en az{" "}
                  <strong>{money(model.perSellable.minProfitKurus)}</strong>.
                </p>
                {!model.perSellable.exactBreakEven && (
                  <p>Bu adet için tam başa baş fiyatı kuruşla yazılamaz.</p>
                )}
              </>
            ) : (
              <p>
                Hiç ürün satılamıyor. Satılabilir ürün başına maliyet ve başa
                baş fiyatı bulunamaz.
              </p>
            )}
          </>
        )}
      </div>
      {model && <FirePicture model={model} />}
    </details>
  );
}
