import { COMPLIANCE_ITEMS } from "@/data/mockData";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

const GaugeChart = ({ score }: { score: number }) => {
  const deg = (score / 100) * 180;
  return (
    <div className="relative w-48 h-24 mx-auto">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="hsl(220 13% 88%)" strokeWidth="12" strokeLinecap="round" />
        <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="hsl(142 71% 45%)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(score / 100) * 283} 283`} />
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-3xl font-bold text-foreground">{score}</div>
        <div className="text-xs text-muted-foreground">/100</div>
      </div>
    </div>
  );
};

const Compliance = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Compliance</h1>
    <p className="text-muted-foreground text-sm mb-8">Regulatory compliance overview</p>

    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      <div className="glass-card rounded-xl p-6 text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Overall Compliance Score</h3>
        <GaugeChart score={98} />
      </div>
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Status Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between"><span className="text-sm text-foreground flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" />Compliant</span><span className="font-semibold text-foreground">5</span></div>
          <div className="flex items-center justify-between"><span className="text-sm text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-warning" />Under Review</span><span className="font-semibold text-foreground">1</span></div>
        </div>
      </div>
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Jurisdiction Simulator</h3>
        <select className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm mb-3">
          <option>United States</option><option>European Union</option><option>Switzerland</option><option>United Kingdom</option><option>Singapore</option>
        </select>
        <p className="text-xs text-muted-foreground">All applicable regulations are met for the selected jurisdiction.</p>
      </div>
    </div>

    <div className="glass-card rounded-xl overflow-hidden">
      <table className="w-full">
        <thead><tr className="border-b border-border">
          {["Regulation", "Jurisdiction", "Score", "Last Audit", "Status"].map(h => <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>)}
        </tr></thead>
        <tbody>
          {COMPLIANCE_ITEMS.map(c => (
            <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="p-4 text-sm font-medium text-foreground flex items-center gap-2"><Shield className="w-4 h-4 text-secondary" />{c.regulation}</td>
              <td className="p-4 text-sm text-muted-foreground">{c.jurisdiction}</td>
              <td className="p-4 text-sm font-semibold text-foreground">{c.score}/100</td>
              <td className="p-4 text-sm text-muted-foreground">{c.lastAudit}</td>
              <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === "compliant" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{c.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default Compliance;
