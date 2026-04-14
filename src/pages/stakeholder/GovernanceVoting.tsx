import { GOVERNANCE_PROPOSALS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const GovernanceVoting = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Governance</h1>
    <p className="text-muted-foreground text-sm mb-8">Vote on museum-proposed community projects</p>

    <div className="space-y-6">
      {GOVERNANCE_PROPOSALS.map(p => {
        const pct = Math.round((p.votesFor / (p.votesFor + p.votesAgainst)) * 100);
        return (
          <div key={p.id} className="glass-card rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1"><h3 className="font-semibold text-foreground">{p.title}</h3><span className={`px-2 py-0.5 rounded-full text-xs ${p.status === "active" ? "bg-secondary/10 text-secondary" : "bg-success/10 text-success"}`}>{p.status}</span></div>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Proposed by: {p.proposer}</p>
              </div>
              {p.status === "active" && (
                <div className="flex gap-2">
                  <Button size="sm"><ThumbsUp className="w-4 h-4 mr-1" />Vote Yes</Button>
                  <Button size="sm" variant="outline"><ThumbsDown className="w-4 h-4 mr-1" />Vote No</Button>
                </div>
              )}
            </div>
            <Progress value={pct} className="h-2 mb-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="text-success">{pct}% Approval ({p.votesFor.toLocaleString()} votes)</span>
              <span className="flex items-center gap-1">{p.status === "passed" ? <CheckCircle2 className="w-3 h-3 text-success" /> : <Clock className="w-3 h-3" />}Deadline: {p.deadline}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
export default GovernanceVoting;
