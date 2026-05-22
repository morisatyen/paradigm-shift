import { useState } from "react";
import { Link } from "react-router-dom";
import { ARTWORKS } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const Discover = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("value");
  const filtered = ARTWORKS.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.artist.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === "yield" ? b.dividendYield - a.dividendYield : b.currentValue - a.currentValue);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Discover</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-8">Museum-grade artworks available for investment</p>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search artworks..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="w-4 h-4" />Sort:</div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground">
          <option value="value">Asset Value</option><option value="yield">Yield</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(a => (
          <Link to={`/stakeholder/asset/${a.id}`} key={a.id} className="group glass-card rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-card/90 backdrop-blur text-xs font-medium text-success">{a.dividendYield}% Yield</div>
            </div>
            <div className="p-5">
              <div className="text-xs text-muted-foreground">{a.museum}</div>
              <h3 className="font-semibold text-foreground mt-1">{a.title}</h3>
              <div className="text-sm text-muted-foreground mb-3">{a.artist}, {a.year}</div>
              <div className="flex justify-between items-center">
                <div><span className="text-xs text-muted-foreground">Value</span><div className="font-semibold text-foreground">${(a.currentValue / 1e6).toFixed(1)}M</div></div>
                <div><span className="text-xs text-muted-foreground">Per Token</span><div className="font-semibold text-foreground">${a.pricePerToken.toLocaleString()}</div></div>
                <div><span className="text-xs text-muted-foreground">Available</span><div className="font-semibold text-secondary">{a.investorOwnership}%</div></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Discover;

