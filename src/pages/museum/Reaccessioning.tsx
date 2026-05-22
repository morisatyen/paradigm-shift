import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft } from "lucide-react";

const STEPS = [
  { title: "Selection", desc: "Choose artwork for reaccessioning" },
  { title: "Valuation", desc: "Independent appraisal and pricing" },
  { title: "Donor Intent", desc: "Verify donor intent compliance" },
  { title: "Board Multi-sig", desc: "Board member approval votes" },
  { title: "Token Config", desc: "Configure tokenization parameters" },
  { title: "Compliance", desc: "Regulatory review and approval" },
  { title: "Launch", desc: "List on marketplace" },
];

const KEY = "ps_reaccession_state";

const Reaccessioning = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});

  useEffect(() => {
    const s = localStorage.getItem(KEY);
    if (s) { const p = JSON.parse(s); setStep(p.step); setData(p.data); }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ step, data }));
  }, [step, data]);

  const update = (key: string, val: string) => setData(prev => ({ ...prev, [key]: val }));

  const renderStepContent = () => {
    switch (step) {
      case 0: return (<div className="space-y-4"><Label>Artwork Title</Label><Input value={data.title || ""} onChange={e => update("title", e.target.value)} placeholder="e.g. Water Lilies, Series III" /><Label>Artist</Label><Input value={data.artist || ""} onChange={e => update("artist", e.target.value)} placeholder="e.g. Claude Monet" /><Label>Reason for Reaccessioning</Label><Textarea value={data.reason || ""} onChange={e => update("reason", e.target.value)} placeholder="Describe the rationale..." /></div>);
      case 1: return (<div className="space-y-4"><Label>Estimated Value ($)</Label><Input type="number" value={data.valuation || ""} onChange={e => update("valuation", e.target.value)} placeholder="42500000" /><Label>Appraiser</Label><Input value={data.appraiser || ""} onChange={e => update("appraiser", e.target.value)} placeholder="Christie's Appraisal Services" /><Label>Appraisal Report Notes</Label><Textarea value={data.appraisalNotes || ""} onChange={e => update("appraisalNotes", e.target.value)} /></div>);
      case 2: return (<div className="space-y-4"><Label>Original Donor</Label><Input value={data.donor || ""} onChange={e => update("donor", e.target.value)} placeholder="Estate of J. Smith" /><Label>Donor Intent Review</Label><Textarea value={data.donorIntent || ""} onChange={e => update("donorIntent", e.target.value)} placeholder="Summary of deed of gift restrictions..." /><div className="p-4 rounded-lg bg-muted"><p className="text-sm text-muted-foreground">✓ No restrictions on deaccessioning found in deed of gift</p></div></div>);
      case 3: return (<div className="space-y-4"><p className="text-sm text-muted-foreground mb-4">Required: 3 of 5 board members must approve</p>{["Dr. Sarah Mitchell", "Prof. James Chen", "Maria Rodriguez", "David Thompson", "Dr. Lisa Park"].map((name, i) => (<div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border"><span className="text-sm font-medium text-foreground">{name}</span><span className={`text-xs px-2 py-1 rounded-full ${i < 3 ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{i < 3 ? "Approved" : "Pending"}</span></div>))}</div>);
      case 4: return (<div className="space-y-4"><Label>Token Symbol</Label><Input value={data.tokenSymbol || ""} onChange={e => update("tokenSymbol", e.target.value)} placeholder="MONET-WL3" /><Label>Total Tokens</Label><Input type="number" value={data.totalTokens || ""} onChange={e => update("totalTokens", e.target.value)} placeholder="10000" /><Label>Price Per Token ($)</Label><Input type="number" value={data.pricePerToken || ""} onChange={e => update("pricePerToken", e.target.value)} placeholder="4820" /><Label>Museum Retention (%)</Label><Input type="number" value={data.retention || ""} onChange={e => update("retention", e.target.value)} placeholder="60" /></div>);
      case 5: return (<div className="space-y-4"><div className="p-4 rounded-lg border border-border space-y-3">{[{ reg: "SEC Regulation D", status: "✓ Passed" }, { reg: "GDPR Compliance", status: "✓ Passed" }, { reg: "AAM Code of Ethics", status: "✓ Passed" }, { reg: "AML/KYC Requirements", status: "✓ Passed" }].map(c => (<div key={c.reg} className="flex justify-between"><span className="text-sm text-foreground">{c.reg}</span><span className="text-sm text-success">{c.status}</span></div>))}</div><Label>Compliance Notes</Label><Textarea value={data.complianceNotes || ""} onChange={e => update("complianceNotes", e.target.value)} /></div>);
      case 6: return (<div className="text-center py-8"><div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-success" /></div><h3 className="text-3xl font-serif italic font-normal text-foreground mb-2">Ready to Launch</h3><p className="text-muted-foreground mb-4">All steps completed. The artwork is ready for marketplace listing.</p><Button size="lg">Launch on Marketplace <ArrowRight className="w-4 h-4 ml-2" /></Button></div>);
      default: return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Reaccessioning Workflow</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-8">7-step process for artwork tokenization</p>

      <div className="flex gap-2 mb-8 overflow-x-auto">
        {STEPS.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
            {i < step ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            {s.title}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-xl p-8 max-w-2xl">
        <h3 className="text-2xl font-serif italic font-normal text-foreground mb-1">Step {step + 1}: {STEPS[step].title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{STEPS[step].desc}</p>
        {renderStepContent()}
        {step < 6 && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>
            <Button onClick={() => setStep(Math.min(6, step + 1))}>Next <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Reaccessioning;

