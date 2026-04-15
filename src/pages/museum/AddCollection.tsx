import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = ["Impressionism", "Post-Impressionism", "Art Nouveau", "Dutch Golden Age", "Ukiyo-e", "Abstract", "Renaissance", "Baroque", "Modernism", "Contemporary"];
const CONDITIONS = ["Excellent", "Very Good", "Good", "Fair"];
const MEDIUMS = ["Oil on canvas", "Oil and gold leaf on canvas", "Watercolor", "Woodblock print", "Acrylic on canvas", "Mixed media", "Sculpture", "Photography"];

const EMPTY = {
  title: "", artist: "", year: "", medium: "", dimensions: "", image: "",
  estimatedValue: "", museumOwnership: "", investorOwnership: "",
  dividendYield: "", museum: "", category: "", tokenSymbol: "",
  totalTokens: "", pricePerToken: "", provenance: "", condition: "",
};

const AddCollection = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const req: Record<string, string> = {};
    if (!form.title.trim()) req.title = "Required";
    if (!form.artist.trim()) req.artist = "Required";
    if (!form.year) req.year = "Required";
    if (!form.estimatedValue) req.estimatedValue = "Required";
    if (!form.museumOwnership) req.museumOwnership = "Required";
    if (!form.tokenSymbol.trim()) req.tokenSymbol = "Required";
    if (!form.totalTokens) req.totalTokens = "Required";
    if (!form.pricePerToken) req.pricePerToken = "Required";
    const mo = Number(form.museumOwnership);
    const io = Number(form.investorOwnership);
    if (mo + io !== 100) req.investorOwnership = "Museum + Investor must equal 100%";
    setErrors(req);
    return Object.keys(req).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Static flow — no real data entry, just redirect back
    navigate("/museum/collection");
  };

  const Field = ({ label, id, required, error, children }: { label: string; id: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div>
      <Label htmlFor={id}>{label}{required && <span className="text-destructive ml-1">*</span>}</Label>
      <div className="mt-1">{children}</div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="p-8 max-w-4xl">
      <Link to="/museum/collection" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />Back to Collection
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Add New Artwork</h1>
        <p className="text-muted-foreground text-sm mt-1">Register a new artwork to the tokenized collection</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Section 1 — Artwork Info */}
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Artwork Information</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Artwork Title" id="title" required error={errors.title}>
              <Input id="title" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Water Lilies, Series III" />
            </Field>
            <Field label="Artist" id="artist" required error={errors.artist}>
              <Input id="artist" value={form.artist} onChange={e => set("artist", e.target.value)} placeholder="e.g. Claude Monet" />
            </Field>
            <Field label="Year" id="year" required error={errors.year}>
              <Input id="year" type="number" value={form.year} onChange={e => set("year", e.target.value)} placeholder="e.g. 1917" min={1000} max={new Date().getFullYear()} />
            </Field>
            <Field label="Category" id="category">
              <select id="category" value={form.category} onChange={e => set("category", e.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select category...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Medium" id="medium">
              <select id="medium" value={form.medium} onChange={e => set("medium", e.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select medium...</option>
                {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Dimensions" id="dimensions">
              <Input id="dimensions" value={form.dimensions} onChange={e => set("dimensions", e.target.value)} placeholder="e.g. 200 × 180 cm" />
            </Field>
            <Field label="Condition" id="condition">
              <select id="condition" value={form.condition} onChange={e => set("condition", e.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select condition...</option>
                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Museum / Institution" id="museum">
              <Input id="museum" value={form.museum} onChange={e => set("museum", e.target.value)} placeholder="e.g. Metropolitan Museum of Art" />
            </Field>
          </div>
          <Field label="Image URL" id="image">
            <Input id="image" value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Provenance" id="provenance">
            <Textarea id="provenance" value={form.provenance} onChange={e => set("provenance", e.target.value)} placeholder="e.g. Private Collection (1917–1952) → Galerie Durand-Ruel → MMA Acquisition (1952)" rows={2} />
          </Field>
        </div>

        {/* Section 2 — Valuation */}
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Valuation & Ownership</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Estimated Value ($)" id="estimatedValue" required error={errors.estimatedValue}>
              <Input id="estimatedValue" type="number" value={form.estimatedValue} onChange={e => set("estimatedValue", e.target.value)} placeholder="e.g. 42500000" />
            </Field>
            <Field label="Dividend Yield (%)" id="dividendYield">
              <Input id="dividendYield" type="number" value={form.dividendYield} onChange={e => set("dividendYield", e.target.value)} placeholder="e.g. 4.2" step="0.1" min={0} max={100} />
            </Field>
            <Field label="Museum Ownership (%)" id="museumOwnership" required error={errors.museumOwnership}>
              <Input id="museumOwnership" type="number" value={form.museumOwnership} onChange={e => {
                set("museumOwnership", e.target.value);
                set("investorOwnership", String(100 - Number(e.target.value)));
              }} placeholder="e.g. 60" min={0} max={100} />
            </Field>
            <Field label="Investor Ownership (%)" id="investorOwnership" error={errors.investorOwnership}>
              <Input id="investorOwnership" type="number" value={form.investorOwnership} onChange={e => set("investorOwnership", e.target.value)} placeholder="Auto-calculated" min={0} max={100} />
              <p className="text-xs text-muted-foreground mt-1">Museum + Investor must equal 100%</p>
            </Field>
          </div>
        </div>

        {/* Section 3 — Token Config */}
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Token Configuration</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <Field label="Token Symbol" id="tokenSymbol" required error={errors.tokenSymbol}>
              <Input id="tokenSymbol" value={form.tokenSymbol} onChange={e => set("tokenSymbol", e.target.value.toUpperCase())} placeholder="e.g. MONET-WL3" />
            </Field>
            <Field label="Total Tokens" id="totalTokens" required error={errors.totalTokens}>
              <Input id="totalTokens" type="number" value={form.totalTokens} onChange={e => set("totalTokens", e.target.value)} placeholder="e.g. 10000" />
            </Field>
            <Field label="Price Per Token ($)" id="pricePerToken" required error={errors.pricePerToken}>
              <Input id="pricePerToken" type="number" value={form.pricePerToken} onChange={e => set("pricePerToken", e.target.value)} placeholder="e.g. 4820" />
            </Field>
          </div>

          {form.totalTokens && form.pricePerToken && (
            <div className="p-4 rounded-lg bg-muted flex gap-8 text-sm">
              <div><span className="text-muted-foreground">Total Token Value: </span><span className="font-semibold text-foreground">${(Number(form.totalTokens) * Number(form.pricePerToken)).toLocaleString()}</span></div>
              {form.museumOwnership && <div><span className="text-muted-foreground">Museum Tokens: </span><span className="font-semibold text-foreground">{Math.floor(Number(form.totalTokens) * Number(form.museumOwnership) / 100).toLocaleString()}</span></div>}
              {form.investorOwnership && <div><span className="text-muted-foreground">Investor Tokens: </span><span className="font-semibold text-foreground">{Math.floor(Number(form.totalTokens) * Number(form.investorOwnership) / 100).toLocaleString()}</span></div>}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/museum/collection")}>Cancel</Button>
          <Button type="submit">Add to Collection</Button>
        </div>
      </form>
    </div>
  );
};
export default AddCollection;
