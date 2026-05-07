import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ARTWORKS, COLLECTIONS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import FormField from "@/components/museum/FormField";

const CATEGORIES = ["Impressionism", "Post-Impressionism", "Art Nouveau", "Dutch Golden Age", "Ukiyo-e", "Abstract", "Renaissance", "Baroque", "Modernism", "Contemporary"];
const CONDITIONS = ["Excellent", "Very Good", "Good", "Fair"];
const MEDIUMS = ["Oil on canvas", "Oil and gold leaf on canvas", "Watercolor", "Woodblock print", "Acrylic on canvas", "Mixed media", "Sculpture", "Photography"];

const EMPTY = {
  title: "",
  artist: "",
  year: "",
  medium: "",
  dimensions: "",
  image: "",
  estimatedValue: "",
  museumOwnership: "",
  investorOwnership: "",
  dividendYield: "",
  museum: "",
  category: "",
  tokenSymbol: "",
  totalTokens: "",
  pricePerToken: "",
  provenance: "",
  condition: "",
  collectionId: "",
};

type ArtworkEditorProps = {
  mode: "add" | "edit";
};

const ArtworkEditor = ({ mode }: ArtworkEditorProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const artwork = ARTWORKS.find((item) => item.id === id);
  const linkedCollection = artwork ? COLLECTIONS.find((collection) => collection.artworks.includes(artwork.id)) : null;
  const requestedCollectionId = searchParams.get("collectionId") ?? linkedCollection?.id ?? "";
  const backTo = requestedCollectionId ? "/museum/collections-groups" : "/museum/collections-groups/artworks";
  const [form, setForm] = useState(() => {
    if (mode === "edit" && artwork) {
      return {
        title: artwork.title,
        artist: artwork.artist,
        year: String(artwork.year),
        medium: artwork.medium,
        dimensions: artwork.dimensions,
        image: artwork.image,
        estimatedValue: String(artwork.estimatedValue),
        museumOwnership: String(artwork.museumOwnership),
        investorOwnership: String(artwork.investorOwnership),
        dividendYield: String(artwork.dividendYield),
        museum: artwork.museum,
        category: artwork.category,
        tokenSymbol: artwork.tokenSymbol,
        totalTokens: String(artwork.totalTokens),
        pricePerToken: String(artwork.pricePerToken),
        provenance: artwork.provenance,
        condition: artwork.condition,
        collectionId: linkedCollection?.id ?? "",
      };
    }

    return { ...EMPTY, collectionId: requestedCollectionId };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Required";
    if (!form.artist.trim()) nextErrors.artist = "Required";
    if (!form.year) nextErrors.year = "Required";
    if (!form.estimatedValue) nextErrors.estimatedValue = "Required";
    if (!form.museumOwnership) nextErrors.museumOwnership = "Required";
    if (!form.tokenSymbol.trim()) nextErrors.tokenSymbol = "Required";
    if (!form.totalTokens) nextErrors.totalTokens = "Required";
    if (!form.pricePerToken) nextErrors.pricePerToken = "Required";

    const museumOwnership = Number(form.museumOwnership);
    const investorOwnership = Number(form.investorOwnership);
    if (museumOwnership + investorOwnership !== 100) nextErrors.investorOwnership = "Museum + Investor must equal 100%";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    navigate(mode === "edit" && artwork ? `/museum/collections-groups/artworks/${artwork.id}` : backTo);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <Link to={backTo} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />{requestedCollectionId ? "Back to Collections" : "Back to Artworks"}
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">{mode === "edit" ? "Edit Artwork" : "Add New Artwork"}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {mode === "edit" ? "Update artwork details, ownership, and token settings." : "Register a new artwork and optionally link it to a collection."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Artwork Information</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Artwork Title" id="title" required error={errors.title}>
              <Input id="title" value={form.title} onChange={(event) => set("title", event.target.value)} placeholder="e.g. Water Lilies, Series III" />
            </FormField>
            <FormField label="Artist" id="artist" required error={errors.artist}>
              <Input id="artist" value={form.artist} onChange={(event) => set("artist", event.target.value)} placeholder="e.g. Claude Monet" />
            </FormField>
            <FormField label="Year" id="year" required error={errors.year}>
              <Input id="year" type="number" value={form.year} onChange={(event) => set("year", event.target.value)} placeholder="e.g. 1917" min={1000} max={new Date().getFullYear()} />
            </FormField>
            <FormField label="Category" id="category">
              <select id="category" value={form.category} onChange={(event) => set("category", event.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select category...</option>
                {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </FormField>
            <FormField label="Medium" id="medium">
              <select id="medium" value={form.medium} onChange={(event) => set("medium", event.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select medium...</option>
                {MEDIUMS.map((medium) => <option key={medium} value={medium}>{medium}</option>)}
              </select>
            </FormField>
            <FormField label="Dimensions" id="dimensions">
              <Input id="dimensions" value={form.dimensions} onChange={(event) => set("dimensions", event.target.value)} placeholder="e.g. 200 x 180 cm" />
            </FormField>
            <FormField label="Condition" id="condition">
              <select id="condition" value={form.condition} onChange={(event) => set("condition", event.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select condition...</option>
                {CONDITIONS.map((condition) => <option key={condition} value={condition}>{condition}</option>)}
              </select>
            </FormField>
            <FormField label="Museum / Institution" id="museum">
              <Input id="museum" value={form.museum} onChange={(event) => set("museum", event.target.value)} placeholder="e.g. Metropolitan Museum of Art" />
            </FormField>
          </div>
          <FormField label="Image URL" id="image">
            <Input id="image" value={form.image} onChange={(event) => set("image", event.target.value)} placeholder="https://..." />
          </FormField>
          <FormField label="Provenance" id="provenance">
            <Textarea id="provenance" value={form.provenance} onChange={(event) => set("provenance", event.target.value)} placeholder="e.g. Private Collection (1917-1952) -> Galerie Durand-Ruel -> MMA Acquisition (1952)" rows={2} />
          </FormField>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Valuation & Ownership</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Estimated Value ($)" id="estimatedValue" required error={errors.estimatedValue}>
              <Input id="estimatedValue" type="number" value={form.estimatedValue} onChange={(event) => set("estimatedValue", event.target.value)} placeholder="e.g. 42500000" />
            </FormField>
            <FormField label="Dividend Yield (%)" id="dividendYield">
              <Input id="dividendYield" type="number" value={form.dividendYield} onChange={(event) => set("dividendYield", event.target.value)} placeholder="e.g. 4.2" step="0.1" min={0} max={100} />
            </FormField>
            <FormField label="Museum Ownership (%)" id="museumOwnership" required error={errors.museumOwnership}>
              <Input
                id="museumOwnership"
                type="number"
                value={form.museumOwnership}
                onChange={(event) => {
                  set("museumOwnership", event.target.value);
                  set("investorOwnership", String(100 - Number(event.target.value)));
                }}
                placeholder="e.g. 60"
                min={0}
                max={100}
              />
            </FormField>
            <FormField label="Investor Ownership (%)" id="investorOwnership" error={errors.investorOwnership}>
              <Input id="investorOwnership" type="number" value={form.investorOwnership} onChange={(event) => set("investorOwnership", event.target.value)} placeholder="Auto-calculated" min={0} max={100} />
              <p className="text-xs text-muted-foreground mt-1">Museum + Investor must equal 100%</p>
            </FormField>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Token Configuration</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <FormField label="Token Symbol" id="tokenSymbol" required error={errors.tokenSymbol}>
              <Input id="tokenSymbol" value={form.tokenSymbol} onChange={(event) => set("tokenSymbol", event.target.value.toUpperCase())} placeholder="e.g. MONET-WL3" />
            </FormField>
            <FormField label="Total Tokens" id="totalTokens" required error={errors.totalTokens}>
              <Input id="totalTokens" type="number" value={form.totalTokens} onChange={(event) => set("totalTokens", event.target.value)} placeholder="e.g. 10000" />
            </FormField>
            <FormField label="Price Per Token ($)" id="pricePerToken" required error={errors.pricePerToken}>
              <Input id="pricePerToken" type="number" value={form.pricePerToken} onChange={(event) => set("pricePerToken", event.target.value)} placeholder="e.g. 4820" />
            </FormField>
          </div>

          {form.totalTokens && form.pricePerToken && (
            <div className="p-4 rounded-lg bg-muted flex gap-8 text-sm">
              <div><span className="text-muted-foreground">Total Token Value: </span><span className="font-semibold text-foreground">${(Number(form.totalTokens) * Number(form.pricePerToken)).toLocaleString()}</span></div>
              {form.museumOwnership && <div><span className="text-muted-foreground">Museum Tokens: </span><span className="font-semibold text-foreground">{Math.floor(Number(form.totalTokens) * Number(form.museumOwnership) / 100).toLocaleString()}</span></div>}
              {form.investorOwnership && <div><span className="text-muted-foreground">Investor Tokens: </span><span className="font-semibold text-foreground">{Math.floor(Number(form.totalTokens) * Number(form.investorOwnership) / 100).toLocaleString()}</span></div>}
            </div>
          )}
        </div>

        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Collection Link</h2>
          <FormField label="Assign to Collection" id="collectionId">
            <select id="collectionId" value={form.collectionId} onChange={(event) => set("collectionId", event.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
              <option value="">Leave unassigned for now</option>
              {COLLECTIONS.map((collection) => <option key={collection.id} value={collection.id}>{collection.name} - {collection.museum}</option>)}
            </select>
          </FormField>
          <p className="text-xs text-muted-foreground">You can manage the collection link here while keeping the artwork as a standalone asset.</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(mode === "edit" && artwork ? `/museum/collections-groups/artworks/${artwork.id}` : backTo)}>Cancel</Button>
          <Button type="submit">{mode === "edit" ? "Save Artwork" : "Add Artwork"}</Button>
        </div>
      </form>
    </div>
  );
};

export default ArtworkEditor;
