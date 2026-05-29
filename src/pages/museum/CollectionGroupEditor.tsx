import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ARTWORKS, COLLECTIONS, EXPERIENCES } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import FormField from "@/components/museum/FormField";

type CollectionGroupEditorProps = {
  mode: "add" | "edit";
};

const EMPTY = {
  name: "",
  museum: "",
  description: "",
  image: "",
  totalVotes: "",
  avgRating: "",
  artworks: [] as string[],
  experiences: [] as string[],
};

const CollectionGroupEditor = ({ mode }: CollectionGroupEditorProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const collection = COLLECTIONS.find((item) => item.id === id);
  const collectionExperiences = collection ? EXPERIENCES.filter((experience) => experience.collectionId === collection.id).map((experience) => experience.id) : [];
  const [form, setForm] = useState(() => {
    if (mode === "edit" && collection) {
      return {
        name: collection.name,
        museum: collection.museum,
        description: collection.description,
        image: collection.image,
        totalVotes: String(collection.totalVotes),
        avgRating: String(collection.avgRating),
        artworks: [...collection.artworks],
        experiences: collectionExperiences,
      };
    }

    return EMPTY;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const toggleSelection = (key: "artworks" | "experiences", value: string, checked: boolean) => {
    setForm((previous) => ({
      ...previous,
      [key]: checked ? [...previous[key], value] : previous[key].filter((item) => item !== value),
    }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Required";
    if (!form.museum.trim()) nextErrors.museum = "Required";
    if (!form.description.trim()) nextErrors.description = "Required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    navigate("/Workspace/collections");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <Link to="/Workspace/collections" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />Back to Collections
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">{mode === "edit" ? "Edit Collection" : "Add Collection"}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {mode === "edit" ? "Update the collection story, cover image, and linked content." : "Create a new collection and attach artworks and experiences to it."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Collection Details</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Collection Title" id="name" required error={errors.name}>
              <Input id="name" value={form.name} onChange={(event) => set("name", event.target.value)} placeholder="e.g. Emotions Through Centuries" />
            </FormField>
            <FormField label="Museum / Institution" id="museum" required error={errors.museum}>
              <Input id="museum" value={form.museum} onChange={(event) => set("museum", event.target.value)} placeholder="e.g. Metropolitan Museum of Art" />
            </FormField>
          </div>
          <FormField label="Cover Image URL" id="image">
            <Input id="image" value={form.image} onChange={(event) => set("image", event.target.value)} placeholder="https://..." />
          </FormField>
          <FormField label="Description" id="description" required error={errors.description}>
            <Textarea id="description" value={form.description} onChange={(event) => set("description", event.target.value)} placeholder="Describe the curatorial theme of the collection..." rows={3} />
          </FormField>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Visitor Signals</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Total Votes" id="totalVotes">
              <Input id="totalVotes" type="number" value={form.totalVotes} onChange={(event) => set("totalVotes", event.target.value)} placeholder="e.g. 1247" min={0} />
            </FormField>
            <FormField label="Average Rating" id="avgRating">
              <Input id="avgRating" type="number" value={form.avgRating} onChange={(event) => set("avgRating", event.target.value)} placeholder="e.g. 4.6" min={0} max={5} step="0.1" />
            </FormField>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Linked Artworks</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ARTWORKS.map((artwork) => (
              <label key={artwork.id} className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/40">
                <Checkbox checked={form.artworks.includes(artwork.id)} onCheckedChange={(checked) => toggleSelection("artworks", artwork.id, checked === true)} />
                <div>
                  <p className="text-sm font-medium text-foreground">{artwork.title}</p>
                  <p className="text-xs text-muted-foreground">{artwork.artist} - {artwork.museum}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Linked Experiences</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {EXPERIENCES.map((experience) => (
              <label key={experience.id} className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/40">
                <Checkbox checked={form.experiences.includes(experience.id)} onCheckedChange={(checked) => toggleSelection("experiences", experience.id, checked === true)} />
                <div>
                  <p className="text-sm font-medium text-foreground">{experience.title}</p>
                  <p className="text-xs text-muted-foreground">{experience.type} - {experience.museum}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/Workspace/collections")}>Cancel</Button>
          <Button type="submit">{mode === "edit" ? "Save Collection" : "Add Collection"}</Button>
        </div>
      </form>
    </div>
  );
};

export default CollectionGroupEditor;

