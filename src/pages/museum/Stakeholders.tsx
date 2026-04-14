import { STAKEHOLDERS } from "@/data/mockData";
import { Users, Mail, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const tierColors: Record<string, string> = { Gold: "bg-warning/10 text-warning", Collector: "bg-secondary/10 text-secondary", Patron: "bg-gold/10 text-gold", Silver: "bg-silver text-foreground" };

const Stakeholders = () => {
  const [search, setSearch] = useState("");
  const filtered = STAKEHOLDERS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-heading font-bold text-foreground">Stakeholders</h1><p className="text-muted-foreground text-sm mt-1">{STAKEHOLDERS.length} fractional owners</p></div>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-64" /></div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Name", "Tier", "Total Invested", "Holdings", "Joined", "KYC", ""].map(h => <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>)}</tr></thead>
          <tbody>{filtered.map(s => (
            <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="p-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">{s.name.split(" ").map(n => n[0]).join("")}</div><div><div className="text-sm font-medium text-foreground">{s.name}</div><div className="text-xs text-muted-foreground">{s.email}</div></div></div></td>
              <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColors[s.tier] || "bg-muted text-muted-foreground"}`}>{s.tier}</span></td>
              <td className="p-4 text-sm font-semibold text-foreground">${(s.totalInvested / 1e6).toFixed(2)}M</td>
              <td className="p-4 text-sm text-foreground">{s.holdings}</td>
              <td className="p-4 text-sm text-muted-foreground">{s.joinDate}</td>
              <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${s.kycStatus === "verified" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{s.kycStatus}</span></td>
              <td className="p-4"><button className="text-secondary hover:text-secondary/80"><Mail className="w-4 h-4" /></button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
};
export default Stakeholders;
