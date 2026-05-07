import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ARTWORKS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, List, Search, Plus, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ContentTypeCards from "@/components/museum/ContentTypeCards";

const Collection = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");
  const filtered = ARTWORKS.filter((artwork) =>
    artwork.title.toLowerCase().includes(search.toLowerCase()) ||
    artwork.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <ContentTypeCards />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Artworks</h1>
          <p className="text-muted-foreground text-sm mt-1">{ARTWORKS.length} individual artworks available to manage</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search artworks..." value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9 w-64" />
          </div>
          <div className="flex border border-border rounded-lg">
            <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"} rounded-l-lg`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setView("table")} className={`p-2 ${view === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground"} rounded-r-lg`}>
              <List className="w-4 h-4" />
            </button>
          </div>
          <Button onClick={() => navigate("/museum/collections-groups/artworks/add")}><Plus className="w-4 h-4 mr-2" />Add Artwork</Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artwork) => (
            <div key={artwork.id} className="glass-card rounded-xl overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
                <button onClick={() => navigate(`/museum/collections-groups/artworks/${artwork.id}`)} className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground">{artwork.artist}, {artwork.year}</div>
                <h3 className="font-semibold text-foreground mt-1 mb-3">{artwork.title}</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Museum {artwork.museumOwnership}%</span>
                    <span className="text-muted-foreground">Investor {artwork.investorOwnership}%</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="bg-primary rounded-full" style={{ width: `${artwork.museumOwnership}%` }} />
                    <div className="bg-secondary rounded-full" style={{ width: `${artwork.investorOwnership}%` }} />
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-semibold">${(artwork.currentValue / 1e6).toFixed(1)}M</span>
                  <span className="text-success font-medium">+{artwork.appreciation}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                {["Artwork", "Artist", "Value", "Ownership", "Yield", "Status", ""].map((header) => (
                  <th key={header} className="p-4 text-xs font-medium text-muted-foreground">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((artwork) => (
                <tr key={artwork.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={artwork.image} alt="" className="w-10 h-10 rounded object-cover" />
                    <span className="font-medium text-sm text-foreground">{artwork.title}</span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{artwork.artist}</td>
                  <td className="p-4 text-sm font-semibold text-foreground">${(artwork.currentValue / 1e6).toFixed(1)}M</td>
                  <td className="p-4">
                    <div className="w-24"><Progress value={artwork.museumOwnership} className="h-2" /></div>
                    <span className="text-xs text-muted-foreground">{artwork.museumOwnership}% Museum</span>
                  </td>
                  <td className="p-4 text-sm text-success font-medium">{artwork.dividendYield}%</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${artwork.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{artwork.status}</span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => navigate(`/museum/collections-groups/artworks/${artwork.id}`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
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
