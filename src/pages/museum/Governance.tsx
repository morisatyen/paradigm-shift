import { GOVERNANCE_PROPOSALS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Clock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Governance = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Governance</h1>
    <p className="text-muted-foreground text-sm mt-1 mb-8">Multi-signature voting panel</p>

    <div className="space-y-6">
      {GOVERNANCE_PROPOSALS.map(p => {
        const pct = Math.round((p.votesFor / (p.votesFor + p.votesAgainst)) * 100);
        return (
          <div key={p.id} className="glass-card rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-serif italic font-normal text-foreground">{p.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.status === "active" ? "bg-secondary/10 text-secondary" : "bg-success/10 text-success"}`}>{p.status}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
              {p.status === "active" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-success border-success/30 hover:bg-success/10"><ThumbsUp className="w-4 h-4 mr-1" />Approve</Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10"><ThumbsDown className="w-4 h-4 mr-1" />Reject</Button>
                </div>
              )}
            </div>
            <div className="mb-3"><Progress value={pct} className="h-2" /></div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex gap-4">
                <span className="text-success">{p.votesFor.toLocaleString()} For ({pct}%)</span>
                <span className="text-destructive">{p.votesAgainst.toLocaleString()} Against</span>
                <span>{p.totalVoters.toLocaleString()} Total Voters</span>
              </div>
              <span className="flex items-center gap-1">{p.status === "passed" ? <CheckCircle2 className="w-3 h-3 text-success" /> : <Clock className="w-3 h-3" />}{p.deadline}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
export default Governance;

