import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLLECTIONS, ARTWORKS } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { QrCode, X, Download, Printer, Eye, Star, Users } from "lucide-react";

const CollectionsGroups = () => {
  const navigate = useNavigate();
  const [qrTarget, setQrTarget] = useState<{ id: string; name: string } | null>(null);
  const qrUrl = qrTarget ? `${window.location.origin}/visitor/login?type=collection&id=${qrTarget.id}` : "";

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Collections</h1>
          <p className="text-muted-foreground text-sm mt-1">Curated artwork groups with visitor voting</p>
        </div>
      </div>

      <div className="space-y-6">
        {COLLECTIONS.map(col => {
          const artworks = ARTWORKS.filter(a => col.artworks.includes(a.id));
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
                    <Button size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" onClick={() => setQrTarget({ id: col.id, name: col.name })}>
                      <QrCode className="w-4 h-4 mr-1.5" />Visitor QR
                    </Button>
                  </div>
                </div>
              </div>

              {/* Artworks in this collection */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Artworks in this collection</span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{artworks.length}</span>
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
    </div>
  );
};
export default CollectionsGroups;
