import { useParams, Link } from "react-router-dom";
import { ARTWORKS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, TrendingUp, Shield, Award, History } from "lucide-react";

const TABS = ["Overview", "Financials", "Provenance", "Benefits"];

const AssetDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const art = ARTWORKS.find(a => a.id === id) || ARTWORKS[0];

  return (
    <div className="p-8">
      <Link to="/stakeholder/discover" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6"><ArrowLeft className="w-4 h-4" />Back to Discover</Link>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="rounded-xl overflow-hidden"><img src={art.image} alt={art.title} className="w-full aspect-[4/3] object-cover" /></div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">{art.museum}</div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-1">{art.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{art.artist}, {art.year}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-muted"><span className="text-xs text-muted-foreground">Current Value</span><div className="text-xl font-bold text-foreground">${(art.currentValue / 1e6).toFixed(1)}M</div></div>
            <div className="p-4 rounded-lg bg-muted"><span className="text-xs text-muted-foreground">Price Per Token</span><div className="text-xl font-bold text-foreground">${art.pricePerToken.toLocaleString()}</div></div>
            <div className="p-4 rounded-lg bg-muted"><span className="text-xs text-muted-foreground">Dividend Yield</span><div className="text-xl font-bold text-success">{art.dividendYield}%</div></div>
            <div className="p-4 rounded-lg bg-muted"><span className="text-xs text-muted-foreground">Appreciation</span><div className="text-xl font-bold text-success">+{art.appreciation}%</div></div>
          </div>
          <Button size="lg" className="w-full">Invest in {art.tokenSymbol}</Button>
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b border-border">
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${i === tab ? "border-secondary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6">
        {tab === 0 && (<div className="space-y-4"><div className="grid grid-cols-2 gap-4">{[{ l: "Medium", v: art.medium }, { l: "Dimensions", v: art.dimensions }, { l: "Category", v: art.category }, { l: "Condition", v: art.condition }, { l: "Total Tokens", v: art.totalTokens.toLocaleString() }, { l: "Last Appraisal", v: art.lastAppraisal }].map(d => (<div key={d.l}><span className="text-xs text-muted-foreground">{d.l}</span><div className="text-sm font-medium text-foreground">{d.v}</div></div>))}</div><div className="mt-4"><span className="text-xs text-muted-foreground">Ownership Distribution</span><div className="flex gap-1 h-3 mt-2 rounded-full overflow-hidden"><div className="bg-primary" style={{ width: `${art.museumOwnership}%` }} /><div className="bg-secondary" style={{ width: `${art.investorOwnership}%` }} /></div><div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Museum {art.museumOwnership}%</span><span>Investors {art.investorOwnership}%</span></div></div></div>)}
        {tab === 1 && (<div className="space-y-4"><div className="grid grid-cols-3 gap-4">{[{ l: "Est. Value", v: `$${(art.estimatedValue / 1e6).toFixed(1)}M` }, { l: "Current Value", v: `$${(art.currentValue / 1e6).toFixed(1)}M` }, { l: "Appreciation", v: `+${art.appreciation}%` }].map(d => (<div key={d.l} className="p-4 rounded-lg bg-muted text-center"><span className="text-xs text-muted-foreground">{d.l}</span><div className="text-lg font-bold text-foreground mt-1">{d.v}</div></div>))}</div><p className="text-sm text-muted-foreground">Quarterly dividends distributed to all token holders based on exhibition revenue, licensing fees, and appreciation gains.</p></div>)}
        {tab === 2 && (<div><h4 className="font-medium text-foreground mb-3 flex items-center gap-2"><History className="w-4 h-4 text-secondary" />Provenance Chain</h4><p className="text-sm text-muted-foreground leading-relaxed">{art.provenance}</p><div className="mt-4 p-4 rounded-lg bg-muted"><div className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-success" /><span className="text-foreground font-medium">Provenance verified on-chain</span></div></div></div>)}
        {tab === 3 && (<div className="space-y-3">{["Priority access to private viewings", "Annual exhibition invitations", "NFT certificate of ownership", "Governance voting rights", "Quarterly dividend payments"].map((b, i) => (<div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border"><Award className="w-4 h-4 text-secondary" /><span className="text-sm text-foreground">{b}</span></div>))}</div>)}
      </div>
    </div>
  );
};
export default AssetDetail;
