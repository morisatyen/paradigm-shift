import { ARTWORKS } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, PieChart, Calendar } from "lucide-react";

const holdings = ARTWORKS.slice(0, 4).map(a => ({
  ...a,
  tokensOwned: Math.floor(Math.random() * 50) + 10,
  purchasePrice: a.pricePerToken * 0.85,
  gain: ((a.pricePerToken - a.pricePerToken * 0.85) / (a.pricePerToken * 0.85) * 100).toFixed(1),
  nextDividend: "2024-06-15",
}));

const portfolioValue = holdings.reduce((s, h) => s + h.tokensOwned * h.pricePerToken, 0);
const totalGain = holdings.reduce((s, h) => s + h.tokensOwned * (h.pricePerToken - h.purchasePrice), 0);

const chartData = [
  { month: "Oct", value: portfolioValue * 0.82 }, { month: "Nov", value: portfolioValue * 0.87 },
  { month: "Dec", value: portfolioValue * 0.91 }, { month: "Jan", value: portfolioValue * 0.93 },
  { month: "Feb", value: portfolioValue * 0.96 }, { month: "Mar", value: portfolioValue * 0.98 },
  { month: "Apr", value: portfolioValue },
];

const Portfolio = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Portfolio</h1>
    <p className="text-muted-foreground text-sm mt-1 mb-8">Your investment overview</p>

    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {[{ label: "Portfolio Value", value: `$${(portfolioValue / 1e3).toFixed(1)}K`, icon: DollarSign }, { label: "Total Gain", value: `+$${(totalGain / 1e3).toFixed(1)}K`, icon: TrendingUp, green: true }, { label: "Holdings", value: holdings.length.toString(), icon: PieChart }, { label: "Next Dividend", value: "Jun 15", icon: Calendar }].map(k => (
        <div key={k.label} className="glass-card rounded-xl p-5"><k.icon className={`w-5 h-5 mb-3 ${k.green ? "text-success" : "text-secondary"}`} /><div className={`text-2xl font-bold ${k.green ? "text-success" : "text-foreground"}`}>{k.value}</div><div className="text-xs text-muted-foreground">{k.label}</div></div>
      ))}
    </div>

    <div className="glass-card rounded-xl p-6 mb-8">
      <h3 className="font-semibold text-foreground mb-4">Portfolio Performance</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
          <YAxis tickFormatter={v => `$${(v / 1e3).toFixed(0)}K`} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
          <Tooltip formatter={(v: number) => [`$${(v / 1e3).toFixed(1)}K`]} />
          <Area type="monotone" dataKey="value" stroke="hsl(202 56% 56%)" fill="hsl(202 56% 56% / 0.15)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div className="glass-card rounded-xl overflow-hidden">
      <h3 className="font-semibold text-foreground p-6 pb-4">Holdings</h3>
      <table className="w-full">
        <thead><tr className="border-b border-border">{["Artwork", "Tokens", "Avg Cost", "Current", "Gain/Loss", "Dividend"].map(h => <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>)}</tr></thead>
        <tbody>{holdings.map(h => (
          <tr key={h.id} className="border-b border-border last:border-0 hover:bg-muted/50">
            <td className="p-4 flex items-center gap-3"><img src={h.image} alt="" className="w-10 h-10 rounded object-cover" /><div><div className="text-sm font-medium text-foreground">{h.title}</div><div className="text-xs text-muted-foreground">{h.tokenSymbol}</div></div></td>
            <td className="p-4 text-sm text-foreground">{h.tokensOwned}</td>
            <td className="p-4 text-sm text-muted-foreground">${h.purchasePrice.toFixed(0)}</td>
            <td className="p-4 text-sm font-semibold text-foreground">${h.pricePerToken.toLocaleString()}</td>
            <td className="p-4 text-sm font-semibold text-success">+{h.gain}%</td>
            <td className="p-4 text-sm text-muted-foreground">{h.nextDividend}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);
export default Portfolio;

