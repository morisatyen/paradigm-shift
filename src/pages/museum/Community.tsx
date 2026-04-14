import { Heart, Users, Target, Zap } from "lucide-react";

const Community = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Community — Cultural Infusion</h1>
    <p className="text-muted-foreground text-sm mb-8">Powered by Cultural Infusion</p>

    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div className="glass-card rounded-xl p-6 text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Mission Alignment Score</h3>
        <div className="text-5xl font-heading font-bold text-foreground mb-1">94<span className="text-2xl text-muted-foreground">/100</span></div>
        <p className="text-sm text-success">+3 from last quarter</p>
      </div>
      <div className="glass-card rounded-xl p-6 text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Community Engagement</h3>
        <div className="text-5xl font-heading font-bold text-foreground mb-1">87<span className="text-2xl text-muted-foreground">/100</span></div>
        <p className="text-sm text-success">+8 from last quarter</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[{ label: "Community Members", value: "8,420", icon: Users }, { label: "Cultural Programs", value: "34", icon: Heart }, { label: "Mission Goals Met", value: "12/14", icon: Target }, { label: "Active Initiatives", value: "8", icon: Zap }].map(m => (
        <div key={m.label} className="glass-card rounded-xl p-5"><m.icon className="w-5 h-5 text-secondary mb-3" /><div className="text-2xl font-bold text-foreground">{m.value}</div><div className="text-xs text-muted-foreground">{m.label}</div></div>
      ))}
    </div>

    <div className="glass-card rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-4">Recent Community Initiatives</h3>
      <div className="space-y-4">
        {[{ title: "Youth Art Workshop — Spring 2024", status: "Active", participants: 120, impact: "High" }, { title: "Virtual Gallery Tour — International Museums", status: "Active", participants: 3400, impact: "High" }, { title: "Art History Lecture Series", status: "Completed", participants: 890, impact: "Medium" }, { title: "Community Mural Project — Lower East Side", status: "Planning", participants: 0, impact: "High" }].map((init, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div><div className="text-sm font-medium text-foreground">{init.title}</div><div className="text-xs text-muted-foreground">{init.participants > 0 ? `${init.participants.toLocaleString()} participants` : "Upcoming"}</div></div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${init.status === "Active" ? "bg-success/10 text-success" : init.status === "Completed" ? "bg-muted text-muted-foreground" : "bg-secondary/10 text-secondary"}`}>{init.status}</span>
              <span className="text-xs text-muted-foreground">Impact: {init.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default Community;
