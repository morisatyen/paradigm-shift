import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EXPERIENCES, COLLECTIONS } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { QrCode, X, Download, Printer, Star, Users, Calendar, MapPin, Eye, Plus } from "lucide-react";
import ContentTypeCards from "@/components/museum/ContentTypeCards";

const TYPE_COLORS: Record<string, string> = {
  Physical: "bg-success/10 text-success",
  Talk: "bg-secondary/10 text-secondary",
  Digital: "bg-primary/10 text-primary",
  Workshop: "bg-warning/10 text-warning",
};

const Experiences = () => {
  const navigate = useNavigate();
  const [qrTarget, setQrTarget] = useState<{ id: string; title: string } | null>(null);
  const qrUrl = qrTarget ? `${window.location.origin}/visitor/login?type=experience&id=${qrTarget.id}` : "";

  return (
    <div className="p-8">
      <ContentTypeCards />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Experiences</h1>
          <p className="text-muted-foreground text-sm mt-1">Standalone experiences that can optionally connect to collections and artworks</p>
        </div>
        <Button onClick={() => navigate("/museum/collections-groups/experiences/add")}>
          <Plus className="w-4 h-4 mr-2" />Add Experience
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {EXPERIENCES.map((experience) => {
          const collection = COLLECTIONS.find((item) => item.id === experience.collectionId);

          return (
            <div key={experience.id} className="glass-card rounded-xl overflow-hidden">
              <div className="relative">
                <img src={experience.image} alt={experience.title} className="w-full h-44 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${TYPE_COLORS[experience.type] || "bg-muted text-muted-foreground"}`}>
                    {experience.type}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button onClick={() => setQrTarget({ id: experience.id, title: experience.title })} className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white transition-colors">
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-heading font-bold text-base leading-tight">{experience.title}</h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-sm text-muted-foreground">{experience.description}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{experience.date} - {experience.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>Capacity: {experience.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{experience.museum}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4 shrink-0 text-warning" />
                    <span>{experience.avgRating}/5 - {experience.totalVotes} votes</span>
                  </div>
                </div>

                {collection && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                    <span className="text-xs text-muted-foreground">Part of collection:</span>
                    <span className="text-xs font-medium text-foreground">{collection.name}</span>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/museum/collections-groups/experiences/${experience.id}`)}>
                    <Eye className="w-4 h-4 mr-1.5" />View Details
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {qrTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Visitor QR Code</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Place at the experience venue for visitors to scan</p>
              </div>
              <button onClick={() => setQrTarget(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-xl" id="qr-exp-area">
                <QRCodeSVG value={qrUrl} size={200} level="H" includeMargin />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{qrTarget.title}</p>
                <p className="text-xs text-muted-foreground mt-1">Scan to vote on this experience</p>
              </div>
              <div className="w-full p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground break-all text-center">{qrUrl}</p>
              </div>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-1.5" />Print
                </Button>
                <Button className="flex-1" onClick={() => {
                  const svg = document.querySelector("#qr-exp-area svg") as SVGElement;
                  if (!svg) return;
                  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
                  const anchor = document.createElement("a");
                  anchor.href = URL.createObjectURL(blob);
                  anchor.download = `qr-${qrTarget.id}.svg`;
                  anchor.click();
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

export default Experiences;
