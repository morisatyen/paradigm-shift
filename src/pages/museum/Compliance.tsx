import { COMPLIANCE_ITEMS } from "@/data/mockData";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

const GaugeChart = ({ score }: { score: number }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-40 h-40 shrink-0">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(220 13% 88%)" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="hsl(142 71% 45%)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-3xl font-bold text-foreground">{score}</div>
        <div className="text-xs text-muted-foreground">/100</div>
      </div>
    </div>
  );
};

const Compliance = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Compliance</h1>
    <p className="text-muted-foreground text-sm mt-1 mb-8">Regulatory status, audit history, and jurisdictional posture</p>

    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-2xl font-serif italic font-normal text-foreground mb-4">Overall Compliance Score</h3>
        <div className="flex items-center gap-6">
          <GaugeChart score={98} />
          <div>
            <p className="text-base font-semibold text-foreground">Overall Compliance</p>
            <p className="text-sm font-medium text-success">Excellent Standing</p>
            <p className="text-xs text-muted-foreground mt-1">Across six monitored regulations and three jurisdictions</p>
          </div>
        </div>
      </div>
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-2xl font-serif italic font-normal text-foreground mb-4">Status Summary</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between"><span className="text-sm text-foreground flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" />Compliant</span><span className="font-semibold text-foreground">5</span></div>
          <div className="flex items-center justify-between"><span className="text-sm text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-warning" />Under Review</span><span className="font-semibold text-foreground">1</span></div>
        </div>
      </div>
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-2xl font-serif italic font-normal text-foreground mb-4">Jurisdiction Simulator</h3>
        <select className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm mb-3">
          <option>United States</option><option>European Union</option><option>Switzerland</option><option>United Kingdom</option><option>Singapore</option>
        </select>
        <p className="text-xs text-muted-foreground">All applicable regulations are met for the selected jurisdiction.</p>
      </div>
    </div>

    <div className="glass-card rounded-xl overflow-hidden">
      <table className="w-full">
        <thead><tr className="border-b border-border">
          {["Regulation", "Jurisdiction", "Score", "Last Audit", "Status"].map(h => <th key={h} className="p-4 text-left text-sm font-bold tracking-wide text-foreground">{h}</th>)}
        </tr></thead>
        <tbody>
          {COMPLIANCE_ITEMS.map(c => (
            <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="p-4 text-xl font-serif italic font-normal text-foreground flex items-center gap-2"><Shield className="w-4 h-4 text-secondary" />{c.regulation}</td>
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

