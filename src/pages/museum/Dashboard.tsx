import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Image, Users, ArrowUpRight } from "lucide-react";
import { REVENUE_DATA, ARTWORKS } from "@/data/mockData";

const KPI = [
  { label: "Total Portfolio Value", value: "$1.2B", change: "+12.4%", icon: DollarSign },
  { label: "Active Artworks", value: "68", change: "+8 this quarter", icon: Image },
  { label: "Revenue This Quarter", value: "$18.4M", change: "+23.1%", icon: TrendingUp },
  { label: "Active Stakeholders", value: "12,400", change: "+1,200", icon: Users },
];

const MuseumDashboard = () => (
  <div className="px-8 md:px-10 py-8">
    <div className="mb-8 flex items-start justify-between gap-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1 mb-8">Metropolitan Museum of Art</p>
      </div>
      <div className="hidden lg:block text-right">
        <p className="text-[11px] tracking-[0.18em] font-bold uppercase text-muted-foreground">Reporting Period</p>
        <p className="mt-1 text-1xl font-bold text-foreground">Jan - Dec 2026</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {KPI.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-card border border-border rounded-xl p-7"
        >
          <div className="text-[11px] tracking-[0.16em] font-bold uppercase text-muted-foreground mb-5">{k.label}</div>
          <div className="text-5xl font-extrabold tracking-[-0.04em] text-foreground">{k.value}</div>
          <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-success/10 px-2.5 py-1 text-sm font-bold text-success">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {k.change}
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8">
        <h3 className="text-[37px] font-heading font-bold tracking-[-0.02em] text-foreground mb-1">Revenue Performance</h3>
        <p className="text-sm text-muted-foreground mb-4">Monthly revenue, last 12 months</p>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="4 4" stroke="hsl(220 16% 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(240 5% 45%)" }} stroke="hsl(220 16% 90%)" />
            <YAxis tickFormatter={(v) => `$${v / 1e6}M`} tick={{ fontSize: 12, fill: "hsl(240 5% 45%)" }} stroke="hsl(220 16% 90%)" />
            <Tooltip formatter={(v: number) => [`$${(v / 1e6).toFixed(1)}M`]} />
            <Area type="monotone" dataKey="museumRevenue" stroke="hsl(205 100% 16%)" fill="hsl(205 100% 16% / 0.12)" name="Museum Revenue" />
            <Area type="monotone" dataKey="stakeholderReturns" stroke="hsl(201 95% 50%)" fill="hsl(201 95% 50% / 0.12)" name="Stakeholder Returns" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-[37px] font-heading font-bold tracking-[-0.02em] text-foreground mb-1">By Source</h3>
        <p className="text-sm text-muted-foreground mb-6">December breakdown, revenue streams</p>
        <div className="space-y-4">
          {ARTWORKS.slice(0, 4).map((a) => (
            <div key={a.id} className="flex items-center gap-3">
              <img src={a.image} alt={a.title} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.artist}</div>
              </div>
              <span className="text-sm font-bold text-success">+{a.appreciation}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MuseumDashboard;
