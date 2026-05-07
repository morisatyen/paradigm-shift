import { useLocation, useNavigate } from "react-router-dom";
import { Image, Layers, Sparkles } from "lucide-react";
import { ARTWORKS, COLLECTIONS, EXPERIENCES } from "@/data/mockData";

const MODULES = [
  {
    key: "collections",
    title: "Collections",
    count: COLLECTIONS.length,
    to: "/museum/collections-groups",
    icon: Layers,
  },
  {
    key: "artworks",
    title: "Artworks",
    count: ARTWORKS.length,
    to: "/museum/collections-groups/artworks",
    icon: Image,
  },
  {
    key: "experiences",
    title: "Experiences",
    count: EXPERIENCES.length,
    to: "/museum/collections-groups/experiences",
    icon: Sparkles,
  },
];

const ContentTypeCards = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3">
        {MODULES.map((module) => {
          const active =
            module.key === "collections"
              ? location.pathname === module.to || !location.pathname.includes("/artworks") && !location.pathname.includes("/experiences") && location.pathname.startsWith("/museum/collections-groups")
              : location.pathname.startsWith(module.to);

          return (
            <button
              key={module.key}
              type="button"
              onClick={() => navigate(module.to)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted/40"
              }`}
            >
              <module.icon className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <span>{module.title}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                {module.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContentTypeCards;
