import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ARTWORKS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, List, Search, Plus, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Collection = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");
  const filtered = ARTWORKS.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.artist.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Collection</h1>
          <p className="text-muted-foreground text-sm mt-1">{ARTWORKS.length} artworks tokenized</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-64" /></div>
          <div className="flex border border-border rounded-lg">
            <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"} rounded-l-lg`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setView("table")} className={`p-2 ${view === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground"} rounded-r-lg`}><List className="w-4 h-4" /></button>
          </div>
          <Button onClick={() => navigate("/museum/collection/add")}><Plus className="w-4 h-4 mr-2" />Add Collection</Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => (
            <div key={a.id} className="glass-card rounded-xl overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                <button onClick={() => navigate(`/museum/collection/${a.id}`)} className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white transition-colors"><Eye className="w-4 h-4" /></button>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground">{a.artist}, {a.year}</div>
                <h3 className="font-semibold text-foreground mt-1 mb-3">{a.title}</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs"><span className="text-muted-foreground">Museum {a.museumOwnership}%</span><span className="text-muted-foreground">Investor {a.investorOwnership}%</span></div>
                  <div className="flex gap-1 h-2">
                    <div className="bg-primary rounded-full" style={{ width: `${a.museumOwnership}%` }} />
                    <div className="bg-secondary rounded-full" style={{ width: `${a.investorOwnership}%` }} />
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-semibold">${(a.currentValue / 1e6).toFixed(1)}M</span>
                  <span className="text-success font-medium">+{a.appreciation}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-border text-left">
              {["Artwork", "Artist", "Value", "Ownership", "Yield", "Status", ""].map(h => <th key={h} className="p-4 text-xs font-medium text-muted-foreground">{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4 flex items-center gap-3"><img src={a.image} alt="" className="w-10 h-10 rounded object-cover" /><span className="font-medium text-sm text-foreground">{a.title}</span></td>
                  <td className="p-4 text-sm text-muted-foreground">{a.artist}</td>
                  <td className="p-4 text-sm font-semibold text-foreground">${(a.currentValue / 1e6).toFixed(1)}M</td>
                  <td className="p-4"><div className="w-24"><Progress value={a.museumOwnership} className="h-2" /></div><span className="text-xs text-muted-foreground">{a.museumOwnership}% Museum</span></td>
                  <td className="p-4 text-sm text-success font-medium">{a.dividendYield}%</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${a.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{a.status}</span></td>
                  <td className="p-4"><button onClick={() => navigate(`/museum/collection/${a.id}`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Eye className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Collection;
