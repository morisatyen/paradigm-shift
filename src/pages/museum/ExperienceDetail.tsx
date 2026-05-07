import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { EXPERIENCES, COLLECTIONS, ARTWORKS } from "@/data/mockData";
import { ArrowLeft, Calendar, Users, Star, MapPin, QrCode, X, Download, Printer, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

const TYPE_COLORS: Record<string, string> = {
  Physical: "bg-success/10 text-success",
  Talk: "bg-secondary/10 text-secondary",
  Digital: "bg-primary/10 text-primary",
  Workshop: "bg-warning/10 text-warning",
};

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const exp = EXPERIENCES.find((experience) => experience.id === id) || EXPERIENCES[0];
  const collection = COLLECTIONS.find((item) => item.id === exp.collectionId);
  const artwork = ARTWORKS.find((item) => item.id === exp.artworkId);
  const qrUrl = `${window.location.origin}/visitor/login?type=experience&id=${exp.id}`;

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <Link to="/museum/collections-groups/experiences" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />Back to Experiences
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/museum/collections-groups/experiences/${exp.id}/edit`)}>
            <Pencil className="w-4 h-4 mr-1.5" />Edit
          </Button>
          <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setShowDelete(true)}>
            <Trash2 className="w-4 h-4 mr-1.5" />Delete
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowQR(true)}>
            <QrCode className="w-4 h-4 mr-1.5" />Visitor QR
          </Button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden mb-6 relative">
        <img src={exp.image} alt={exp.title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <span className={`text-xs px-2 py-1 rounded-full font-medium mb-2 inline-block ${TYPE_COLORS[exp.type] || "bg-muted text-muted-foreground"}`}>{exp.type}</span>
          <h1 className="text-2xl font-heading font-bold text-white">{exp.title}</h1>
          <p className="text-white/70 text-sm mt-1">{exp.museum}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 mb-5">
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{exp.description}</p>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {[
            { label: "Date", value: exp.date },
            { label: "Time", value: exp.time },
            { label: "Capacity", value: `${exp.capacity} guests` },
            { label: "Location", value: exp.museum },
            { label: "Avg Rating", value: `${exp.avgRating} / 5` },
            { label: "Total Votes", value: exp.totalVotes.toLocaleString() },
          ].map((detail) => (
            <div key={detail.label} className="flex flex-col gap-0.5 border-b border-border pb-3">
              <span className="text-xs text-muted-foreground">{detail.label}</span>
              <span className="text-sm font-medium text-foreground">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>

      {(collection || artwork) && (
        <div className="grid gap-4 md:grid-cols-2">
          {collection && (
            <div className="glass-card rounded-xl p-5 flex items-center gap-4">
              <img src={collection.image} alt={collection.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Part of collection</p>
                <p className="text-sm font-semibold text-foreground">{collection.name}</p>
                <p className="text-xs text-muted-foreground">{collection.museum}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/museum/collections-groups")}>View</Button>
            </div>
          )}
          {artwork && (
            <div className="glass-card rounded-xl p-5 flex items-center gap-4">
              <img src={artwork.image} alt={artwork.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Linked artwork</p>
                <p className="text-sm font-semibold text-foreground">{artwork.title}</p>
                <p className="text-xs text-muted-foreground">{artwork.artist}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate(`/museum/collections-groups/artworks/${artwork.id}`)}>View</Button>
            </div>
          )}
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Delete Experience</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">Are you sure you want to delete <span className="font-medium text-foreground">{exp.title}</span>?</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowDelete(false)}>Cancel</Button>
              <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={() => navigate("/museum/collections-groups/experiences")}>Delete</Button>
            </div>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Visitor QR Code</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Place at the experience venue</p>
              </div>
              <button onClick={() => setShowQR(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-xl" id="qr-exp-detail">
                <QRCodeSVG value={qrUrl} size={200} level="H" includeMargin />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{exp.title}</p>
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
                  const svg = document.querySelector("#qr-exp-detail svg") as SVGElement;
                  if (!svg) return;
                  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
                  const anchor = document.createElement("a");
                  anchor.href = URL.createObjectURL(blob);
                  anchor.download = `qr-${exp.id}.svg`;
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

export default ExperienceDetail;
