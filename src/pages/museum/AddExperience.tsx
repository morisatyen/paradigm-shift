import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { COLLECTIONS } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const TYPES = ["Physical", "Talk", "Digital", "Workshop"];

const EMPTY = {
  title: "", type: "", description: "", date: "",
  time: "", capacity: "", museum: "", image: "", collectionId: "",
};

const AddExperience = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ ...EMPTY, collectionId: searchParams.get("collectionId") || "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const req: Record<string, string> = {};
    if (!form.title.trim()) req.title = "Required";
    if (!form.type) req.type = "Required";
    if (!form.date) req.date = "Required";
    if (!form.capacity) req.capacity = "Required";
    if (!form.museum.trim()) req.museum = "Required";
    if (!form.collectionId) req.collectionId = "Required";
    setErrors(req);
    return Object.keys(req).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate("/museum/collections-groups");
  };

  const Field = ({ label, id, required, error, children }: { label: string; id: string; required?: boolean; error?: string; children: React.ReactNode }) => (
    <div>
      <Label htmlFor={id}>{label}{required && <span className="text-destructive ml-1">*</span>}</Label>
      <div className="mt-1">{children}</div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="p-8 max-w-3xl">
      <Link to="/museum/collections-groups" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />Back to Collections
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">Add New Experience</h1>
        <p className="text-muted-foreground text-sm mt-1">Create a new museum experience linked to a collection</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section 1 — Basic Info */}
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Experience Details</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Title" id="title" required error={errors.title}>
              <Input id="title" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Private Viewing — After Hours" />
            </Field>
            <Field label="Type" id="type" required error={errors.type}>
              <select id="type" value={form.type} onChange={e => set("type", e.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
                <option value="">Select type...</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Museum / Venue" id="museum" required error={errors.museum}>
              <Input id="museum" value={form.museum} onChange={e => set("museum", e.target.value)} placeholder="e.g. Metropolitan Museum of Art" />
            </Field>
            <Field label="Capacity (guests)" id="capacity" required error={errors.capacity}>
              <Input id="capacity" type="number" value={form.capacity} onChange={e => set("capacity", e.target.value)} placeholder="e.g. 20" min={1} />
            </Field>
            <Field label="Date" id="date" required error={errors.date}>
              <Input id="date" type="date" value={form.date} onChange={e => set("date", e.target.value)} />
            </Field>
            <Field label="Time" id="time">
              <Input id="time" type="time" value={form.time} onChange={e => set("time", e.target.value)} />
            </Field>
          </div>
          <Field label="Description" id="description">
            <Textarea id="description" value={form.description} onChange={e => set("description", e.target.value)} placeholder="Describe the experience..." rows={3} />
          </Field>
          <Field label="Image URL" id="image">
            <Input id="image" value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://..." />
          </Field>
        </div>

        {/* Section 2 — Link to Collection */}
        <div className="glass-card rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-foreground border-b border-border pb-3">Link to Collection</h2>
          <Field label="Collection" id="collectionId" required error={errors.collectionId}>
            <select id="collectionId" value={form.collectionId} onChange={e => set("collectionId", e.target.value)} className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-sm">
              <option value="">Select collection...</option>
              {COLLECTIONS.map(c => <option key={c.id} value={c.id}>{c.name} — {c.museum}</option>)}
            </select>
          </Field>
          {form.collectionId && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              {(() => { const col = COLLECTIONS.find(c => c.id === form.collectionId); return col ? (<><img src={col.image} alt={col.name} className="w-10 h-10 rounded-lg object-cover" /><div><p className="text-sm font-medium text-foreground">{col.name}</p><p className="text-xs text-muted-foreground">{col.museum}</p></div></>) : null; })()}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/museum/collections-groups")}>Cancel</Button>
          <Button type="submit">Add Experience</Button>
        </div>
      </form>
    </div>
  );
};
export default AddExperience;
