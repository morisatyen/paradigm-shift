import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { REVENUE_DATA, ARTWORKS } from "@/data/mockData";
import { TrendingUp, Eye, Heart, Globe } from "lucide-react";

const culturalData = [
  { metric: "Educational Programs", value: 94, change: "+12%" },
  { metric: "Community Reach", value: 87, change: "+8%" },
  { metric: "Digital Engagement", value: 92, change: "+22%" },
  { metric: "Cultural Preservation", value: 96, change: "+5%" },
];

const Analytics = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Analytics</h1>
    <p className="text-muted-foreground text-sm mt-1 mb-8">Cultural impact and performance metrics across the portfolio</p>

    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {[{ label: "Cultural Impact Score", value: "94/100", icon: Heart }, { label: "Monthly Visitors", value: "285K", icon: Eye }, { label: "Global Reach", value: "42 Countries", icon: Globe }, { label: "YoY Growth", value: "+22.1%", icon: TrendingUp }].map(m => (
        <div key={m.label} className="glass-card rounded-xl p-5"><m.icon className="w-5 h-5 text-secondary mb-3" /><div className="text-2xl font-bold text-foreground">{m.value}</div><div className="text-xs text-muted-foreground">{m.label}</div></div>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Visitor Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <YAxis tickFormatter={v => `${v / 1e3}K`} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <Tooltip formatter={(v: number) => [`${(v / 1e3).toFixed(0)}K`]} />
            <Line type="monotone" dataKey="visitors" stroke="hsl(202 56% 56%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Cultural Impact Metrics</h3>
        <div className="space-y-4">
          {culturalData.map(c => (
            <div key={c.metric}>
              <div className="flex justify-between text-sm mb-1"><span className="text-foreground">{c.metric}</span><span className="text-success">{c.change}</span></div>
              <div className="h-2 bg-muted rounded-full"><div className="h-2 bg-secondary rounded-full" style={{ width: `${c.value}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="glass-card rounded-xl overflow-hidden">
      <h3 className="font-semibold text-foreground p-6 pb-4">Artwork Performance</h3>
      <table className="w-full">
        <thead><tr className="border-b border-border">{["Artwork", "Value", "Appreciation", "Yield", "Tokens Sold"].map(h => <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>)}</tr></thead>
        <tbody>{ARTWORKS.map(a => (
          <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50">
            <td className="p-4 text-sm font-medium text-foreground">{a.title}</td>
            <td className="p-4 text-sm text-foreground">${(a.currentValue / 1e6).toFixed(1)}M</td>
            <td className="p-4 text-sm text-success">+{a.appreciation}%</td>
            <td className="p-4 text-sm text-foreground">{a.dividendYield}%</td>
            <td className="p-4 text-sm text-muted-foreground">{Math.round(a.totalTokens * a.investorOwnership / 100).toLocaleString()}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);
export default Analytics;

