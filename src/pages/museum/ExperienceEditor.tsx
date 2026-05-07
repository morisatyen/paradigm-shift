import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ARTWORKS, COLLECTIONS, EXPERIENCES } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import FormField from "@/components/museum/FormField";

const TYPES = ["Physical", "Talk", "Digital", "Workshop"];

const EMPTY = {
  title: "",
  type: "",
  description: "",
  date: "",
  time: "",
  capacity: "",
  museum: "",
  image: "",
  collectionId: "",
  artworkId: "",
};

type ExperienceEditorProps = {
  mode: "add" | "edit";
};

const ExperienceEditor = ({ mode }: ExperienceEditorProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const experience = EXPERIENCES.find((item) => item.id === id);
  const [form, setForm] = useState(() => {
    if (mode === "edit" && experience) {
      return {
        title: experience.title,
        type: experience.type,
        description: experience.description,
        date: experience.date,
        time: experience.time,
        capacity: String(experience.capacity),
        museum: experience.museum,
        image: experience.image,
        collectionId: experience.collectionId ?? "",
        artworkId: experience.artworkId ?? "",
      };
    }

    return {
      ...EMPTY,
      collectionId: searchParams.get("collectionId") || "",
    };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Required";
    if (!form.type) nextErrors.type = "Required";
    if (!form.date) nextErrors.date = "Required";
    if (!form.capacity) nextErrors.capacity = "Required";
    if (!form.museum.trim()) nextErrors.museum = "Required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    navigate(mode === "edit" && experience ? `/museum/collections-groups/experiences/${experience.id}` : form.collectionId ? "/museum/collections-groups" : "/museum/collections-groups/experiences");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <Link to={form.collectionId ? "/museum/collections-groups" : "/museum/collections-groups/experiences"} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />{form.collectionId ? "Back to Collections" : "Back to Experiences"}
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">{mode === "edit" ? "Edit Experience" : "Add New Experience"}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {mode === "edit" ? "Update the experience details, venue, and links." : "Create a standalone experience and optionally connect it to a collection or artwork."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Experience Details</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Title" id="title" required error={errors.title}>
              <Input id="title" value={form.title} onChange={(event) => set("title", event.target.value)} placeholder="e.g. Private Viewing - After Hours" />
            </FormField>
            <FormField label="Type" id="type" required error={errors.type}>
              <select id="type" value={form.type} onChange={(event) => set("type", event.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select type...</option>
                {TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </FormField>
            <FormField label="Museum / Venue" id="museum" required error={errors.museum}>
              <Input id="museum" value={form.museum} onChange={(event) => set("museum", event.target.value)} placeholder="e.g. Metropolitan Museum of Art" />
            </FormField>
            <FormField label="Capacity (guests)" id="capacity" required error={errors.capacity}>
              <Input id="capacity" type="number" value={form.capacity} onChange={(event) => set("capacity", event.target.value)} placeholder="e.g. 20" min={1} />
            </FormField>
            <FormField label="Date" id="date" required error={errors.date}>
              <Input id="date" type="date" value={form.date} onChange={(event) => set("date", event.target.value)} />
            </FormField>
            <FormField label="Time" id="time">
              <Input id="time" type="time" value={form.time} onChange={(event) => set("time", event.target.value)} />
            </FormField>
          </div>
          <FormField label="Description" id="description">
            <Textarea id="description" value={form.description} onChange={(event) => set("description", event.target.value)} placeholder="Describe the experience..." rows={3} />
          </FormField>
          <FormField label="Image URL" id="image">
            <Input id="image" value={form.image} onChange={(event) => set("image", event.target.value)} placeholder="https://..." />
          </FormField>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Optional Links</h2>
          <FormField label="Collection" id="collectionId">
            <select id="collectionId" value={form.collectionId} onChange={(event) => set("collectionId", event.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
              <option value="">Leave unassigned for now</option>
              {COLLECTIONS.map((collection) => <option key={collection.id} value={collection.id}>{collection.name} - {collection.museum}</option>)}
            </select>
          </FormField>
          <FormField label="Artwork" id="artworkId">
            <select id="artworkId" value={form.artworkId} onChange={(event) => set("artworkId", event.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
              <option value="">No specific artwork linked</option>
              {ARTWORKS.map((artwork) => <option key={artwork.id} value={artwork.id}>{artwork.title} - {artwork.artist}</option>)}
            </select>
          </FormField>
          {!form.collectionId && !form.artworkId && (
            <p className="text-xs text-muted-foreground">You can save the experience first and connect it later from the content library.</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(mode === "edit" && experience ? `/museum/collections-groups/experiences/${experience.id}` : form.collectionId ? "/museum/collections-groups" : "/museum/collections-groups/experiences")}>Cancel</Button>
          <Button type="submit">{mode === "edit" ? "Save Experience" : "Add Experience"}</Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceEditor;
