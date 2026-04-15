import { useState } from "react";
import { ARTWORKS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, TrendingUp, Gift, FileText, CheckCircle2 } from "lucide-react";

const MODES = ["Investment", "Donation", "Hybrid (Split)"] as const;
type Mode = typeof MODES[number];

const TAX_BRACKETS = [
  { label: "37% (>$578K)", rate: 0.37 },
  { label: "35% ($231K–$578K)", rate: 0.35 },
  { label: "32% ($182K–$231K)", rate: 0.32 },
  { label: "24% ($89K–$182K)", rate: 0.24 },
];

const DONOR_HISTORY = [
  { artwork: "Water Lilies, Series III", type: "Hybrid", invested: 24100, donated: 24100, taxSaving: 8917, date: "2024-01-15" },
  { artwork: "The Kiss", type: "Donation", invested: 0, donated: 36000, taxSaving: 13320, date: "2023-11-20" },
  { artwork: "Composition VIII", type: "Investment", invested: 19749, donated: 0, taxSaving: 0, date: "2023-09-05" },
];

const DonorInvestor = () => {
  const [mode, setMode] = useState<Mode>("Hybrid (Split)");
  const [amount, setAmount] = useState("50000");
  const [split, setSplit] = useState(50);
  const [taxRate, setTaxRate] = useState(0.37);
  const [selectedArt, setSelectedArt] = useState(ARTWORKS[0].id);

  const total = parseFloat(amount) || 0;
  const investPortion = mode === "Investment" ? total : mode === "Donation" ? 0 : total * (split / 100);
  const donatePortion = mode === "Donation" ? total : mode === "Investment" ? 0 : total * ((100 - split) / 100);
  const taxSaving = donatePortion * taxRate;
  const art = ARTWORKS.find(a => a.id === selectedArt) || ARTWORKS[0];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Donor–Investor Tools</h1>
      <p className="text-muted-foreground text-sm mb-8">Combine philanthropic giving with fractional investment — your choice</p>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {[
          { mode: "Investment" as Mode, icon: TrendingUp, desc: "Full financial return, token ownership, dividends" },
          { mode: "Hybrid (Split)" as Mode, icon: Gift, desc: "Split between investment tokens and tax-deductible donation" },
          { mode: "Donation" as Mode, icon: Heart, desc: "Full charitable contribution, maximum tax deduction" },
        ].map(m => (
          <button key={m.mode} onClick={() => setMode(m.mode)} className={`glass-card rounded-xl p-5 text-left transition-all ${mode === m.mode ? "ring-2 ring-secondary" : ""}`}>
            <m.icon className={`w-6 h-6 mb-3 ${mode === m.mode ? "text-secondary" : "text-muted-foreground"}`} />
            <div className="font-semibold text-foreground mb-1">{m.mode}</div>
            <div className="text-xs text-muted-foreground">{m.desc}</div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h3 className="font-semibold text-foreground">Configure Your Contribution</h3>

          <div>
            <Label>Select Artwork</Label>
            <select value={selectedArt} onChange={e => setSelectedArt(e.target.value)} className="w-full mt-1 p-2 rounded-lg border border-border bg-background text-foreground text-sm">
              {ARTWORKS.map(a => <option key={a.id} value={a.id}>{a.title} — {a.tokenSymbol}</option>)}
            </select>
          </div>

          <div>
            <Label>Total Amount ($)</Label>
            <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1" placeholder="50000" />
          </div>

          {mode === "Hybrid (Split)" && (
            <div>
              <Label>Investment / Donation Split: {split}% / {100 - split}%</Label>
              <input type="range" min={10} max={90} step={5} value={split} onChange={e => setSplit(Number(e.target.value))}
                className="w-full mt-2 accent-secondary" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>More Donation</span><span>More Investment</span>
              </div>
            </div>
          )}

          <div>
            <Label>Your Tax Bracket</Label>
            <select value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-full mt-1 p-2 rounded-lg border border-border bg-background text-foreground text-sm">
              {TAX_BRACKETS.map(t => <option key={t.rate} value={t.rate}>{t.label}</option>)}
            </select>
          </div>

          <Button className="w-full">Proceed with {mode}</Button>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Contribution Summary</h3>

          <div className="p-4 rounded-lg bg-muted space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Artwork</span><span className="font-medium text-foreground">{art.title}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Amount</span><span className="font-semibold text-foreground">${total.toLocaleString()}</span></div>
            {investPortion > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Investment Portion</span><span className="font-semibold text-secondary">${investPortion.toLocaleString()}</span></div>}
            {donatePortion > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Donation Portion</span><span className="font-semibold text-success">${donatePortion.toLocaleString()}</span></div>}
            {taxSaving > 0 && (
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Est. Tax Saving ({(taxRate * 100).toFixed(0)}%)</span><span className="font-bold text-success">-${taxSaving.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">Net Cost After Tax</span><span className="font-bold text-foreground">${(total - taxSaving).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
              </div>
            )}
          </div>

          {investPortion > 0 && (
            <div className="p-3 rounded-lg border border-secondary/30 bg-secondary/5">
              <div className="text-xs font-medium text-secondary mb-1">Investment Benefits</div>
              <div className="text-xs text-muted-foreground">~{Math.floor(investPortion / art.pricePerToken)} tokens · {art.dividendYield}% annual yield · Governance voting rights</div>
            </div>
          )}
          {donatePortion > 0 && (
            <div className="p-3 rounded-lg border border-success/30 bg-success/5">
              <div className="text-xs font-medium text-success mb-1">Donation Benefits</div>
              <div className="text-xs text-muted-foreground">IRS 501(c)(3) deductible · Official donor recognition · Cultural impact certificate</div>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-muted">
            <FileText className="w-4 h-4 shrink-0" />
            Tax documentation and donor acknowledgment letter will be issued within 30 days.
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Your Contribution History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border">
              {["Artwork", "Type", "Invested", "Donated", "Tax Saving", "Date"].map(h => <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>)}
            </tr></thead>
            <tbody>
              {DONOR_HISTORY.map((d, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4 text-sm font-medium text-foreground">{d.artwork}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${d.type === "Hybrid" ? "bg-secondary/10 text-secondary" : d.type === "Donation" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{d.type}</span></td>
                  <td className="p-4 text-sm text-foreground">{d.invested > 0 ? `$${d.invested.toLocaleString()}` : "—"}</td>
                  <td className="p-4 text-sm text-foreground">{d.donated > 0 ? `$${d.donated.toLocaleString()}` : "—"}</td>
                  <td className="p-4 text-sm text-success font-medium">{d.taxSaving > 0 ? `$${d.taxSaving.toLocaleString()}` : "—"}</td>
                  <td className="p-4 text-sm text-muted-foreground">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default DonorInvestor;
