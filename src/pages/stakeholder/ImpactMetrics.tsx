import { ARTWORKS } from "@/data/mockData";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Leaf, Users, Eye, Heart, TrendingUp } from "lucide-react";

const radarData = [
  { metric: "Community Reach", value: 87 },
  { metric: "Cultural Preservation", value: 94 },
  { metric: "Education Impact", value: 78 },
  { metric: "Public Access", value: 91 },
  { metric: "Artist Support", value: 72 },
  { metric: "Heritage Value", value: 88 },
];

const visitorData = [
  { month: "Oct", visitors: 142000, programs: 8 },
  { month: "Nov", visitors: 158000, programs: 10 },
  { month: "Dec", visitors: 175000, programs: 12 },
  { month: "Jan", visitors: 192000, programs: 11 },
  { month: "Feb", visitors: 210000, programs: 14 },
  { month: "Mar", visitors: 245000, programs: 16 },
];

const IMPACT_STATS = [
  { label: "Annual Visitors", value: "1.2M", change: "+18%", icon: Eye },
  { label: "Community Programs", value: "34", change: "+6", icon: Heart },
  { label: "Students Reached", value: "48K", change: "+22%", icon: Users },
  { label: "Cultural Score", value: "94/100", change: "+3", icon: Leaf },
];

const ImpactMetrics = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Impact Metrics</h1>
    <p className="text-muted-foreground text-sm mb-8">Cultural & community impact alongside your financial performance</p>

    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {IMPACT_STATS.map(s => (
        <div key={s.label} className="glass-card rounded-xl p-5">
          <s.icon className="w-5 h-5 text-secondary mb-3" />
          <div className="text-2xl font-bold text-foreground">{s.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          <div className="text-xs text-success mt-1">{s.change} this quarter</div>
        </div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Cultural Impact Score</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(220 13% 88%)" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} />
            <Radar dataKey="value" stroke="hsl(202 56% 56%)" fill="hsl(202 56% 56% / 0.2)" />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Visitor & Program Growth</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={visitorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <Tooltip formatter={(v: number, name: string) => [name === "visitors" ? `${(v / 1000).toFixed(0)}K` : v, name]} />
            <Bar dataKey="visitors" fill="hsl(215 58% 26%)" radius={[4, 4, 0, 0]} name="Visitors" />
            <Bar dataKey="programs" fill="hsl(202 56% 56%)" radius={[4, 4, 0, 0]} name="Programs" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="glass-card rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-4">Impact per Artwork in Your Portfolio</h3>
      <div className="space-y-4">
        {ARTWORKS.slice(0, 4).map(a => (
          <div key={a.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
            <img src={a.image} alt={a.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{a.title}</div>
              <div className="text-xs text-muted-foreground">{a.museum}</div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center shrink-0">
              <div>
                <div className="text-sm font-semibold text-foreground">{(Math.random() * 50 + 20).toFixed(0)}K</div>
                <div className="text-xs text-muted-foreground">Annual Views</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-success">+{a.appreciation}%</div>
                <div className="text-xs text-muted-foreground">Financial</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-secondary">{(Math.random() * 20 + 75).toFixed(0)}/100</div>
                <div className="text-xs text-muted-foreground">Impact Score</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default ImpactMetrics;
