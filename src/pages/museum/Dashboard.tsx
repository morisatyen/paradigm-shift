import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Image, Users, ArrowUpRight } from "lucide-react";
import { REVENUE_DATA, ARTWORKS } from "@/data/mockData";

const KPI = [
  { label: "Total Portfolio Value", value: "$1.2B", change: "+12.4%", icon: DollarSign },
  { label: "Active Artworks", value: "68", change: "+8", icon: Image },
  { label: "Revenue This Quarter", value: "$18.4M", change: "+22.1%", icon: TrendingUp },
  { label: "Active Stakeholders", value: "12,400", change: "+1,200", icon: Users },
];

const MuseumDashboard = () => (
  <div className="p-8">
    <div className="mb-8">
      <h1 className="text-2xl font-heading font-bold text-foreground">Museum Dashboard</h1>
      <p className="text-muted-foreground text-sm mt-1">Metropolitan Museum of Art — Overview</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {KPI.map((k, i) => (
        <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <k.icon className="w-5 h-5 text-secondary" />
            <span className="text-xs text-success flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{k.change}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{k.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Revenue Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 88%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <YAxis tickFormatter={v => `$${v / 1e6}M`} tick={{ fontSize: 12 }} stroke="hsl(220 10% 46%)" />
            <Tooltip formatter={(v: number) => [`$${(v / 1e6).toFixed(1)}M`]} />
            <Area type="monotone" dataKey="museumRevenue" stroke="hsl(215 58% 26%)" fill="hsl(215 58% 26% / 0.15)" name="Museum Revenue" />
            <Area type="monotone" dataKey="stakeholderReturns" stroke="hsl(202 56% 56%)" fill="hsl(202 56% 56% / 0.15)" name="Stakeholder Returns" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Top Performing</h3>
        <div className="space-y-4">
          {ARTWORKS.slice(0, 4).map(a => (
            <div key={a.id} className="flex items-center gap-3">
              <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.artist}</div>
              </div>
              <span className="text-sm font-semibold text-success">+{a.appreciation}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default MuseumDashboard;
