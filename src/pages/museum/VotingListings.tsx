import { useState } from "react";
import { VISITOR_VOTES, COLLECTIONS, EXPERIENCES } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Users, Star, ThumbsUp, Filter } from "lucide-react";

const feelingData = [
  { name: "Inspiring", count: 42 },
  { name: "Emotional", count: 28 },
  { name: "Thoughtful", count: 19 },
  { name: "Peaceful", count: 11 },
];

const VotingListings = () => {
  const [filter, setFilter] = useState<"all" | "collection" | "experience">("all");
  const [selectedTarget, setSelectedTarget] = useState("all");

  const filtered = VISITOR_VOTES.filter(v => {
    if (filter !== "all" && v.type !== filter) return false;
    if (selectedTarget !== "all" && v.targetId !== selectedTarget) return false;
    return true;
  });

  const avgRating = filtered.length
    ? (filtered.reduce((s, v) => s + v.rating, 0) / filtered.length).toFixed(1)
    : "0";

  const recommendPct = filtered.length
    ? Math.round((filtered.filter(v => v.recommend === "Yes").length / filtered.length) * 100)
    : 0;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Visitor Votes</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time sentiment on collections and experiences from museum visitors</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Votes", value: VISITOR_VOTES.length.toString(), icon: Users },
          { label: "Avg Rating", value: `${avgRating}/5`, icon: Star },
          { label: "Would Recommend", value: `${recommendPct}%`, icon: ThumbsUp },
          { label: "Collections Voted", value: COLLECTIONS.length.toString(), icon: Filter },
        ].map(s => (
          <div key={s.label} className="glass-card rounded-xl p-5">
            <s.icon className="w-5 h-5 text-secondary mb-3" />
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* Feeling Chart */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">How Visitors Felt</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={feelingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(202 56% 56%)" radius={[4, 4, 0, 0]} name="Votes" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Collection Scores */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Collection Ratings</h3>
          <div className="space-y-4">
            {COLLECTIONS.map(c => (
              <div key={c.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium truncate mr-2">{c.name}</span>
                  <span className="text-secondary shrink-0">⭐ {c.avgRating} ({c.totalVotes})</span>
                </div>
                <div className="h-2 bg-muted rounded-full">
                  <div className="h-2 gradient-navy rounded-full" style={{ width: `${(c.avgRating / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="flex border border-border rounded-lg overflow-hidden">
          {(["all", "collection", "experience"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm capitalize transition-colors ${filter === f ? "gradient-navy text-white" : "text-muted-foreground hover:text-foreground"}`}>
              {f === "all" ? "All" : f === "collection" ? "Collections" : "Experiences"}
            </button>
          ))}
        </div>
        <select value={selectedTarget} onChange={e => setSelectedTarget(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground">
          <option value="all">All Targets</option>
          {COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          {EXPERIENCES.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
        </select>
        <span className="text-sm text-muted-foreground">{filtered.length} votes</span>
      </div>

      {/* Votes Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Visitor", "Type", "Target", "Feeling", "Rating", "Relevant", "Recommend", "Time"].map(h => (
                <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => (
              <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="p-4 text-sm font-mono text-muted-foreground">{v.phone}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.type === "collection" ? "bg-secondary/10 text-secondary" : "bg-warning/10 text-warning"}`}>
                    {v.type}
                  </span>
                </td>
                <td className="p-4 text-sm text-foreground max-w-[160px] truncate">{v.targetName}</td>
                <td className="p-4 text-sm text-foreground">{v.feeling}</td>
                <td className="p-4 text-sm text-foreground">{"⭐".repeat(v.rating)}</td>
                <td className="p-4">
                  <span className={`text-xs font-medium ${v.relevant === "Yes" ? "text-success" : "text-muted-foreground"}`}>{v.relevant}</span>
                </td>
                <td className="p-4">
                  <span className={`text-xs font-medium ${v.recommend === "Yes" ? "text-success" : "text-muted-foreground"}`}>{v.recommend}</span>
                </td>
                <td className="p-4 text-xs text-muted-foreground">{v.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VotingListings;
