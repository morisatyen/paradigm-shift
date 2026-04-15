import { useState } from "react";
import { ARTWORKS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, AlertTriangle, TrendingUp, TrendingDown, Clock } from "lucide-react";

type OrderType = "buy" | "sell";

const LISTINGS = [
  { id: "l1", artwork: "Water Lilies, Series III", symbol: "MONET-WL3", seller: "0x7a3f...8b2c", tokens: 5, askPrice: 4950, floorPrice: 4820, lockExpiry: null, image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600" },
  { id: "l2", artwork: "The Kiss", symbol: "KLIMT-TK", seller: "0x9c1d...4e7f", tokens: 3, askPrice: 7400, floorPrice: 7200, lockExpiry: null, image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600" },
  { id: "l3", artwork: "Composition VIII", symbol: "KAND-C8", seller: "0x2b5e...1a9c", tokens: 8, askPrice: 6700, floorPrice: 6583, lockExpiry: "2024-07-01", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600" },
];

const MY_HOLDINGS = ARTWORKS.slice(0, 3).map((a, i) => ({
  ...a,
  tokensOwned: [12, 5, 20][i],
  purchaseDate: ["2023-06-15", "2023-11-20", "2024-01-05"][i],
  lockExpiry: i === 1 ? "2024-11-20" : null,
  transferable: i !== 1,
}));

const TRADE_HISTORY = [
  { type: "Buy", artwork: "Water Lilies", tokens: 10, price: 4820, total: 48200, date: "2024-04-10", status: "Confirmed" },
  { type: "Sell", artwork: "Starry Night", tokens: 3, price: 5900, total: 17700, date: "2024-03-22", status: "Confirmed" },
  { type: "Buy", artwork: "The Kiss", tokens: 5, price: 7100, total: 35500, date: "2024-02-14", status: "Confirmed" },
];

const SecondaryMarket = () => {
  const [tab, setTab] = useState<"listings" | "sell" | "history">("listings");
  const [orderType] = useState<OrderType>("buy");
  const [selectedListing, setSelectedListing] = useState(LISTINGS[0]);
  const [buyQty, setBuyQty] = useState("1");
  const [sellHolding, setSellHolding] = useState(MY_HOLDINGS[0]);
  const [sellQty, setSellQty] = useState("1");
  const [sellPrice, setSellPrice] = useState("");

  const buyTotal = (parseFloat(buyQty) || 0) * selectedListing.askPrice;
  const sellTotal = (parseFloat(sellQty) || 0) * (parseFloat(sellPrice) || 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Secondary Market</h1>
      <p className="text-muted-foreground text-sm mb-6">SEC-compliant peer-to-peer token trading with institutional protections</p>

      {/* Compliance Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-secondary/30 bg-secondary/5 mb-8">
        <Shield className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="text-sm">
          <span className="font-medium text-foreground">Regulated Trading Framework — </span>
          <span className="text-muted-foreground">All trades are SEC Reg D compliant. Accredited investors only. 12-month lock-up applies to new purchases. Museum retains right of first refusal on large block transfers (&gt;1% of total supply).</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["listings", "sell", "history"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${tab === t ? "border-secondary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t === "listings" ? "Buy Tokens" : t === "sell" ? "Sell Tokens" : "Trade History"}
          </button>
        ))}
      </div>

      {/* BUY TAB */}
      {tab === "listings" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {LISTINGS.map(l => (
              <div key={l.id} onClick={() => setSelectedListing(l)} className={`glass-card rounded-xl p-5 cursor-pointer transition-all ${selectedListing.id === l.id ? "ring-2 ring-secondary" : ""}`}>
                <div className="flex items-center gap-4">
                  <img src={l.image} alt={l.artwork} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground">{l.artwork}</div>
                    <div className="text-xs text-muted-foreground">{l.symbol} · Seller: {l.seller}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-foreground">${l.askPrice.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{l.tokens} tokens available</div>
                    <div className={`text-xs mt-1 ${l.askPrice > l.floorPrice ? "text-warning" : "text-success"}`}>
                      {l.askPrice > l.floorPrice ? <span className="flex items-center gap-1 justify-end"><TrendingUp className="w-3 h-3" />+{(((l.askPrice - l.floorPrice) / l.floorPrice) * 100).toFixed(1)}% vs floor</span>
                        : <span className="flex items-center gap-1 justify-end"><TrendingDown className="w-3 h-3" />At floor price</span>}
                    </div>
                  </div>
                  {l.lockExpiry && (
                    <div className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded-full shrink-0">
                      <Lock className="w-3 h-3" />Locked till {l.lockExpiry}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-xl p-6 space-y-4 h-fit">
            <h3 className="font-semibold text-foreground">Place Buy Order</h3>
            <div className="p-3 rounded-lg bg-muted text-sm">
              <div className="font-medium text-foreground">{selectedListing.artwork}</div>
              <div className="text-muted-foreground text-xs mt-1">Floor: ${selectedListing.floorPrice.toLocaleString()} · Ask: ${selectedListing.askPrice.toLocaleString()}</div>
            </div>
            <div>
              <Label>Quantity (max {selectedListing.tokens})</Label>
              <Input type="number" value={buyQty} onChange={e => setBuyQty(e.target.value)} min={1} max={selectedListing.tokens} className="mt-1" />
            </div>
            <div className="p-3 rounded-lg border border-border space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Price per token</span><span>${selectedListing.askPrice.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Platform fee (1%)</span><span>${(buyTotal * 0.01).toFixed(0)}</span></div>
              <div className="flex justify-between font-semibold border-t border-border pt-2"><span>Total</span><span>${(buyTotal * 1.01).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-muted">
              <Clock className="w-4 h-4 shrink-0 mt-0.5" />
              12-month lock-up applies from purchase date. Museum has right of first refusal on transfers &gt;1% supply.
            </div>
            <Button className="w-full">Confirm Purchase</Button>
          </div>
        </div>
      )}

      {/* SELL TAB */}
      {tab === "sell" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-xl p-6 space-y-5">
            <h3 className="font-semibold text-foreground">List Tokens for Sale</h3>
            <div>
              <Label>Select Holding</Label>
              <select onChange={e => setSellHolding(MY_HOLDINGS.find(h => h.id === e.target.value) || MY_HOLDINGS[0])}
                className="w-full mt-1 p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                {MY_HOLDINGS.map(h => (
                  <option key={h.id} value={h.id} disabled={!h.transferable}>
                    {h.title} ({h.tokensOwned} tokens){!h.transferable ? " — Locked" : ""}
                  </option>
                ))}
              </select>
            </div>

            {!sellHolding.transferable ? (
              <div className="flex items-center gap-3 p-4 rounded-lg border border-warning/30 bg-warning/5">
                <Lock className="w-5 h-5 text-warning shrink-0" />
                <div className="text-sm"><div className="font-medium text-foreground">Transfer Restricted</div><div className="text-muted-foreground text-xs">Lock-up expires: {sellHolding.lockExpiry}</div></div>
              </div>
            ) : (
              <>
                <div>
                  <Label>Quantity to Sell (max {sellHolding.tokensOwned})</Label>
                  <Input type="number" value={sellQty} onChange={e => setSellQty(e.target.value)} min={1} max={sellHolding.tokensOwned} className="mt-1" />
                </div>
                <div>
                  <Label>Ask Price per Token ($)</Label>
                  <Input type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} placeholder={sellHolding.pricePerToken.toString()} className="mt-1" />
                  <p className="text-xs text-muted-foreground mt-1">Floor price: ${sellHolding.pricePerToken.toLocaleString()} · Max allowed: ${(sellHolding.pricePerToken * 1.15).toLocaleString(undefined, { maximumFractionDigits: 0 })} (+15% cap)</p>
                </div>
                <div className="p-3 rounded-lg border border-border space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Gross proceeds</span><span>${sellTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Platform fee (1.5%)</span><span>-${(sellTotal * 0.015).toFixed(0)}</span></div>
                  <div className="flex justify-between font-semibold border-t border-border pt-2"><span>Net proceeds</span><span>${(sellTotal * 0.985).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                </div>
                <Button className="w-full">List for Sale</Button>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Museum-First Trading Rules</h3>
              <div className="space-y-3">
                {[
                  { rule: "Price Stability Cap", desc: "Max +15% above floor price per listing", icon: Shield },
                  { rule: "Right of First Refusal", desc: "Museum can match any offer on transfers >1% supply", icon: AlertTriangle },
                  { rule: "12-Month Lock-Up", desc: "New purchases locked for 12 months from purchase date", icon: Lock },
                  { rule: "Accredited Investors Only", desc: "All buyers must pass KYC/AML and accreditation check", icon: Shield },
                ].map(r => (
                  <div key={r.rule} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <r.icon className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div><div className="text-sm font-medium text-foreground">{r.rule}</div><div className="text-xs text-muted-foreground">{r.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">Your Holdings</h3>
              <div className="space-y-3">
                {MY_HOLDINGS.map(h => (
                  <div key={h.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <img src={h.image} alt="" className="w-8 h-8 rounded object-cover" />
                      <div><div className="text-sm font-medium text-foreground">{h.tokenSymbol}</div><div className="text-xs text-muted-foreground">{h.tokensOwned} tokens</div></div>
                    </div>
                    {h.transferable
                      ? <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">Transferable</span>
                      : <span className="text-xs text-warning bg-warning/10 px-2 py-1 rounded-full flex items-center gap-1"><Lock className="w-3 h-3" />Locked</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY TAB */}
      {tab === "history" && (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-border">
              {["Type", "Artwork", "Tokens", "Price", "Total", "Date", "Status"].map(h => <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>)}
            </tr></thead>
            <tbody>
              {TRADE_HISTORY.map((t, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${t.type === "Buy" ? "bg-success/10 text-success" : "bg-secondary/10 text-secondary"}`}>{t.type}</span></td>
                  <td className="p-4 text-sm font-medium text-foreground">{t.artwork}</td>
                  <td className="p-4 text-sm text-foreground">{t.tokens}</td>
                  <td className="p-4 text-sm text-foreground">${t.price.toLocaleString()}</td>
                  <td className="p-4 text-sm font-semibold text-foreground">${t.total.toLocaleString()}</td>
                  <td className="p-4 text-sm text-muted-foreground">{t.date}</td>
                  <td className="p-4"><span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default SecondaryMarket;
