import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ARTWORKS, COLLECTIONS, EXPERIENCES } from "@/data/mockData";
import { ArrowLeft, Shield, History, Coins, BarChart3, Info, Pencil, Trash2, QrCode, X, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QRCodeSVG } from "qrcode.react";
const BASE_TABS = ["Overview", "Provenance"];
const FINANCIAL_TABS = ["Financials", "Token Info"];

const CollectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [showFinancialDetails, setShowFinancialDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const art = ARTWORKS.find((artwork) => artwork.id === id) || ARTWORKS[0];
  const linkedCollections = COLLECTIONS.filter((collection) => collection.artworks.includes(art.id));
  const linkedExperiences = EXPERIENCES.filter(
    (experience) =>
      experience.artworkId === art.id ||
      linkedCollections.some((collection) => collection.id === experience.collectionId)
  );
  const qrUrl = `${window.location.origin}/visitor/login?type=artwork&id=${art.id}`;
  const tabs = showFinancialDetails
    ? ["Overview", ...FINANCIAL_TABS, "Provenance"]
    : BASE_TABS;

  useEffect(() => {
    if (!showFinancialDetails && tab > 1) setTab(1);
  }, [showFinancialDetails, tab]);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <Link to="/Workspace/collections/artworks" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />Back to Artworks
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/Workspace/collections/artworks/${art.id}/edit`)}>
            <Pencil className="w-4 h-4 mr-1.5" />Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowQR(true)}>
            <QrCode className="w-4 h-4 mr-1.5" />Visitor QR
          </Button>
          <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 className="w-4 h-4 mr-1.5" />Delete
          </Button>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Visitor QR Code</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Place this near the artwork for visitors to scan</p>
              </div>
              <button onClick={() => setShowQR(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-xl" id="qr-print-area">
                <QRCodeSVG value={qrUrl} size={200} level="H" includeMargin />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{art.title}</p>
                <p className="text-xs text-muted-foreground">{art.museum}</p>
                <p className="text-xs text-muted-foreground mt-1">Scan to open this artwork experience</p>
              </div>
              <div className="w-full p-3 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground break-all text-center">{qrUrl}</p>
              </div>
              <div className="flex gap-3 w-full">
                <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-1.5" />Print
                </Button>
                <Button className="flex-1" onClick={() => {
                  const svg = document.querySelector("#qr-print-area svg") as SVGElement;
                  if (!svg) return;
                  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
                  const anchor = document.createElement("a");
                  anchor.href = URL.createObjectURL(blob);
                  anchor.download = `qr-${art.tokenSymbol}.svg`;
                  anchor.click();
                }}>
                  <Download className="w-4 h-4 mr-1.5" />Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Delete Artwork</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">Are you sure you want to remove <span className="font-medium text-foreground">{art.title}</span> from the artwork library?</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={() => navigate("/Workspace/collections/artworks")}>Delete</Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="rounded-xl overflow-hidden">
          <img src={art.image} alt={art.title} className="w-full aspect-[4/3] object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{art.museum}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${art.status === "active" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{art.status}</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground mb-1">{art.title}</h1>
          <p className="text-lg text-muted-foreground mb-1">{art.artist}</p>
          <p className="text-sm text-muted-foreground mb-6">{art.year} - {art.category}</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Current Value", value: `$${(art.currentValue / 1e6).toFixed(1)}M`, color: "text-foreground" },
              { label: "Appreciation", value: `+${art.appreciation}%`, color: "text-success" },
              { label: "Dividend Yield", value: `${art.dividendYield}%`, color: "text-success" },
              { label: "Token Symbol", value: art.tokenSymbol, color: "text-secondary" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-lg bg-muted">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <div className={`text-xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <div className="glass-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Linked Collections</p>
          {linkedCollections.length === 0 ? (
            <p className="text-sm text-muted-foreground">This artwork is not linked to a collection yet.</p>
          ) : (
            <div className="space-y-3">
              {linkedCollections.map((collection) => (
                <div key={collection.id} className="flex items-center gap-3">
                  <img src={collection.image} alt={collection.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{collection.name}</p>
                    <p className="text-xs text-muted-foreground">{collection.museum}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="glass-card rounded-xl p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">Related Experiences</p>
          {linkedExperiences.length === 0 ? (
            <p className="text-sm text-muted-foreground">No experiences are connected to this artwork yet.</p>
          ) : (
            <div className="space-y-3">
              {linkedExperiences.slice(0, 3).map((experience) => (
                <button key={experience.id} type="button" onClick={() => navigate(`/Workspace/collections/experiences/${experience.id}`)} className="w-full flex items-center gap-3 rounded-lg p-2 -m-2 text-left transition-colors hover:bg-muted/40">
                  <img src={experience.image} alt={experience.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{experience.title}</p>
                    <p className="text-xs text-muted-foreground">{experience.type} - {experience.date}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((tabName, index) => (
          <button key={tabName} onClick={() => setTab(index)} className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${index === tab ? "border-secondary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {tabName}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6">
        {tab === 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-secondary" />
              <h3 className="font-semibold text-foreground">Artwork Details</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "Medium", value: art.medium },
                { label: "Dimensions", value: art.dimensions },
                { label: "Condition", value: art.condition },
                { label: "Last Appraisal", value: art.lastAppraisal },
                { label: "Category", value: art.category },
                { label: "Museum", value: art.museum },
              ].map((detail) => (
                <div key={detail.label} className="flex flex-col gap-0.5 border-b border-border pb-3">
                  <span className="text-xs text-muted-foreground">{detail.label}</span>
                  <span className="text-sm font-medium text-foreground">{detail.value}</span>
                </div>
              ))}
            </div>
            <div className="pt-1">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
                <Checkbox
                  id="showFinancialDetails"
                  checked={showFinancialDetails}
                  onCheckedChange={(checked) => setShowFinancialDetails(Boolean(checked))}
                />
                <div className="space-y-1">
                  <label htmlFor="showFinancialDetails" className="text-sm font-medium text-foreground cursor-pointer">
                    Financial Details
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Show or hide the Financials and Token Info tabs for this artwork view.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs text-muted-foreground">Ownership Distribution</span>
              <div className="flex gap-1 h-3 mt-2 rounded-full overflow-hidden">
                <div className="bg-primary" style={{ width: `${art.museumOwnership}%` }} />
                <div className="bg-secondary" style={{ width: `${art.investorOwnership}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Museum {art.museumOwnership}%</span>
                <span>Investors {art.investorOwnership}%</span>
              </div>
            </div>
          </div>
        )}

        {showFinancialDetails && tab === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-secondary" />
              <h3 className="font-semibold text-foreground">Financial Overview</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Estimated Value", value: `$${(art.estimatedValue / 1e6).toFixed(1)}M` },
                { label: "Current Value", value: `$${(art.currentValue / 1e6).toFixed(1)}M` },
                { label: "Appreciation", value: `+${art.appreciation}%`, green: true },
                { label: "Dividend Yield", value: `${art.dividendYield}%`, green: true },
                { label: "Price Per Token", value: `$${art.pricePerToken.toLocaleString()}` },
                { label: "Total Token Value", value: `$${(art.totalTokens * art.pricePerToken).toLocaleString()}` },
              ].map((detail) => (
                <div key={detail.label} className="p-4 rounded-lg bg-muted text-center">
                  <span className="text-xs text-muted-foreground">{detail.label}</span>
                  <div className={`text-lg font-bold mt-1 ${detail.green ? "text-success" : "text-foreground"}`}>{detail.value}</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg border border-border text-sm text-muted-foreground">
              Quarterly dividends are distributed to all token holders based on exhibition revenue, licensing fees, and appreciation gains. Museum retains {art.museumOwnership}% of all distributions.
            </div>
          </div>
        )}

        {showFinancialDetails && tab === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-secondary" />
              <h3 className="font-semibold text-foreground">Token Configuration</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: "Token Symbol", value: art.tokenSymbol },
                { label: "Total Supply", value: art.totalTokens.toLocaleString() },
                { label: "Price Per Token", value: `$${art.pricePerToken.toLocaleString()}` },
                { label: "Museum Tokens", value: Math.floor(art.totalTokens * art.museumOwnership / 100).toLocaleString() },
                { label: "Investor Tokens", value: Math.floor(art.totalTokens * art.investorOwnership / 100).toLocaleString() },
                { label: "Token Status", value: art.status === "active" ? "Live on Marketplace" : "Pending Launch" },
              ].map((detail) => (
                <div key={detail.label} className="flex flex-col gap-0.5 border-b border-border pb-3">
                  <span className="text-xs text-muted-foreground">{detail.label}</span>
                  <span className="text-sm font-medium text-foreground">{detail.value}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-success" />
                <span className="font-medium text-foreground">Token contract verified on-chain</span>
              </div>
            </div>
          </div>
        )}

        {((showFinancialDetails && tab === 3) || (!showFinancialDetails && tab === 1)) && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <History className="w-4 h-4 text-secondary" />
              <h3 className="font-semibold text-foreground">Provenance Chain</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{art.provenance}</p>
            <div className="space-y-3 mt-2">
              {art.provenance.split("->").map((step, index, allSteps) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1 shrink-0" />
                    {index < allSteps.length - 1 && <div className="w-px flex-1 bg-border mt-1" style={{ minHeight: "20px" }} />}
                  </div>
                  <span className="text-sm text-foreground pb-3">{step.trim()}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-success" />
                <span className="font-medium text-foreground">Provenance verified on-chain. Last Appraisal: {art.lastAppraisal}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetail;
