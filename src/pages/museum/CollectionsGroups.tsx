import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLLECTIONS, ARTWORKS, EXPERIENCES } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { QrCode, X, Download, Printer, Eye, Star, Calendar, Users, Plus, Pencil, Trash2 } from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  Physical: "bg-success/10 text-success",
  Talk: "bg-secondary/10 text-secondary",
  Digital: "bg-primary/10 text-primary",
  Workshop: "bg-warning/10 text-warning",
};

const CollectionsGroups = () => {
  const navigate = useNavigate();
  const [qrTarget, setQrTarget] = useState<{ id: string; name: string; isExp?: boolean } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const qrUrl = qrTarget ? `${window.location.origin}/visitor/login?type=${qrTarget.isExp ? "experience" : "collection"}&id=${qrTarget.id}` : "";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Collections</h1>
          <p className="text-muted-foreground text-sm mt-1">Curated artwork groups with visitor voting</p>
        </div>
        {/* <Button onClick={() => navigate("/museum/collections-groups/add")}>
          <Plus className="w-4 h-4 mr-2" />Add Collection
        </Button> */}
      </div>

      <div className="space-y-6">
        {COLLECTIONS.map(col => {
          const artworks = ARTWORKS.filter(a => col.artworks.includes(a.id));
          const experiences = EXPERIENCES.filter(e => e.collectionId === col.id);
          return (
            <div key={col.id} className="glass-card rounded-xl overflow-hidden">
              {/* Collection Header */}
              <div className="relative h-40 overflow-hidden">
                <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                <div className="absolute inset-0 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-white mb-1">{col.name}</h2>
                    <p className="text-white/70 text-sm">{col.museum}</p>
                    <p className="text-white/60 text-xs mt-1 max-w-md">{col.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center text-white">
                      <div className="flex items-center gap-1 text-sm font-semibold"><Star className="w-4 h-4 text-warning" />{col.avgRating}</div>
                      <div className="text-xs text-white/60">{col.totalVotes} votes</div>
                    </div>
                    <button onClick={() => navigate(`/museum/collections-groups/${col.id}/edit`)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteTarget({ id: col.id, name: col.name })} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" onClick={() => setQrTarget({ id: col.id, name: col.name })}>
                      <QrCode className="w-4 h-4 mr-1.5" />Visitor QR
                    </Button>
                  </div>
                </div>
              </div>

              {/* Artworks */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Artworks</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{artworks.length}</span>
                  </div>
                  <button onClick={() => navigate(`/museum/collection/add`)} className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 font-medium">
                    + Add Artwork
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {artworks.map(a => (
                    <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <img src={a.image} alt={a.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.artist}, {a.year}</div>
                        <div className="text-xs text-secondary font-medium">{a.tokenSymbol}</div>
                      </div>
                      <button onClick={() => navigate(`/museum/collection/${a.id}`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground shrink-0">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experiences linked to this collection */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Experiences</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{experiences.length}</span>
                  </div>
                  <button onClick={() => navigate(`/museum/experiences/add?collectionId=${col.id}`)} className="flex items-center gap-1 text-xs text-secondary hover:text-secondary/80 font-medium">
                    + Add Experience
                  </button>
                </div>
                {experiences.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No experiences linked to this collection yet.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {experiences.map(exp => (
                      <div key={exp.id} className="flex gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <img src={exp.image} alt={exp.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[exp.type] || "bg-muted text-muted-foreground"}`}>{exp.type}</span>
                          </div>
                          <div className="text-sm font-medium text-foreground truncate">{exp.title}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.date}</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" />{exp.capacity}</span>
                            <span className="text-xs text-warning">⭐ {exp.avgRating}</span>
                          </div>
                        </div>
                        <button onClick={() => setQrTarget({ id: exp.id, name: exp.title, isExp: true })} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground shrink-0">
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button onClick={() => navigate(`/museum/experiences/${exp.id}`)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground shrink-0">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* QR Modal */}
      {qrTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Visitor QR Code</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Place near the collection for visitors to scan</p>
              </div>
              <button onClick={() => setQrTarget(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-xl" id="qr-col-area">
                <QRCodeSVG value={qrUrl} size={200} level="H" includeMargin />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{qrTarget.name}</p>
                <p className="text-xs text-muted-foreground mt-1">Scan to vote on this collection</p>
              </div>
              <div className="w-full p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground break-all text-center">{qrUrl}</p>
              </div>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-1.5" />Print
                </Button>
                <Button className="flex-1" onClick={() => {
                  const svg = document.querySelector('#qr-col-area svg') as SVGElement;
                  if (!svg) return;
                  const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = `qr-${qrTarget.id}.svg`;
                  a.click();
                }}>
                  <Download className="w-4 h-4 mr-1.5" />Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirm Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Delete Collection</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">Are you sure you want to delete <span className="font-medium text-foreground">{deleteTarget.name}</span>? All linked experiences will also be removed.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>Cancel</Button>
              <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={() => setDeleteTarget(null)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CollectionsGroups;
