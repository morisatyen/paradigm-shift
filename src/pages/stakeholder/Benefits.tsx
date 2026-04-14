import { BENEFITS_TIERS } from "@/data/mockData";
import { Crown, Star, Award, Medal } from "lucide-react";

const icons: Record<string, typeof Crown> = { Patron: Crown, Collector: Star, Gold: Award, Silver: Medal };

const Benefits = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Benefits</h1>
    <p className="text-muted-foreground text-sm mb-8">Tiered access levels based on your investment</p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {BENEFITS_TIERS.map(t => {
        const Icon = icons[t.tier] || Medal;
        return (
          <div key={t.tier} className={`glass-card rounded-xl p-6 ${t.tier === "Patron" ? "ring-2 ring-gold" : ""}`}>
            <Icon className={`w-8 h-8 mb-4 ${t.tier === "Patron" ? "text-gold" : t.tier === "Collector" ? "text-secondary" : t.tier === "Gold" ? "text-warning" : "text-muted-foreground"}`} />
            <h3 className="text-lg font-heading font-bold text-foreground mb-1">{t.tier}</h3>
            <p className="text-sm text-muted-foreground mb-4">Min. ${(t.minInvestment / 1e6 >= 1 ? `${t.minInvestment / 1e6}M` : `${t.minInvestment / 1e3}K`)}</p>
            <ul className="space-y-2">
              {t.perks.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-success mt-0.5">✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  </div>
);
export default Benefits;
