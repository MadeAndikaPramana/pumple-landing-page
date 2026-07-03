const PAIRS = [
  { pair: "BTC/USDT", price: "97,412", change: "+2.4%", up: true },
  { pair: "ETH/USDT", price: "5,218", change: "+1.8%", up: true },
  { pair: "SOL/USDT", price: "312.40", change: "-0.9%", up: false },
  { pair: "BNB/USDT", price: "891.20", change: "+0.6%", up: true },
  { pair: "XRP/USDT", price: "2.84", change: "-1.2%", up: false },
  { pair: "DOGE/USDT", price: "0.3182", change: "+4.1%", up: true },
  { pair: "AVAX/USDT", price: "58.72", change: "+0.8%", up: true },
  { pair: "LINK/USDT", price: "31.05", change: "-0.4%", up: false },
];

function TickerRow() {
  return (
    <ul className="flex shrink-0 items-center">
      {PAIRS.map((p) => (
        <li
          key={p.pair}
          className="flex items-center gap-2 whitespace-nowrap px-6 font-mono text-xs"
        >
          <span className="font-medium text-pumple-text">{p.pair}</span>
          <span className="text-pumple-muted">{p.price}</span>
          <span className={p.up ? "text-pumple-green" : "text-pumple-red"}>
            {p.up ? "▲" : "▼"} {p.change}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  // Dekoratif — angka ilustrasi, bukan data live
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-3"
    >
      <div className="flex w-max animate-marquee">
        <TickerRow />
        <TickerRow />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-pumple-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-pumple-bg to-transparent" />
    </div>
  );
}
