import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Key, Users, Plug, CheckCircle2, XCircle } from "lucide-react";

const integrations = [
  { name: "The Museum System (TMS)", status: "connected", lastSync: "2024-04-10" },
  { name: "Artnet Price Database", status: "connected", lastSync: "2024-04-09" },
  { name: "Christie's API", status: "disconnected", lastSync: "—" },
  { name: "Sotheby's API", status: "connected", lastSync: "2024-04-08" },
];

const logs = [
  { action: "Login", user: "museum@demo.com", timestamp: "2024-04-10 14:32", ip: "192.168.1.1" },
  { action: "Role Updated", user: "admin@museum.com", timestamp: "2024-04-10 10:15", ip: "192.168.1.2" },
  { action: "API Key Generated", user: "dev@museum.com", timestamp: "2024-04-09 16:45", ip: "192.168.1.3" },
  { action: "Password Changed", user: "curator@museum.com", timestamp: "2024-04-09 09:20", ip: "192.168.1.4" },
];

const MuseumSettings = () => (
  <div className="p-8">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Settings</h1>
    <p className="text-muted-foreground text-sm mb-8">API integrations, roles & security</p>

    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Plug className="w-4 h-4 text-secondary" />API Integrations</h3>
        <div className="space-y-3">
          {integrations.map(i => (
            <div key={i.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {i.status === "connected" ? <CheckCircle2 className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                <div><div className="text-sm font-medium text-foreground">{i.name}</div><div className="text-xs text-muted-foreground">Last sync: {i.lastSync}</div></div>
              </div>
              <Button size="sm" variant={i.status === "connected" ? "outline" : "default"}>{i.status === "connected" ? "Configure" : "Connect"}</Button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-secondary" />User Roles</h3>
        <div className="space-y-3">
          {[{ role: "Admin", count: 2, perms: "Full Access" }, { role: "Curator", count: 4, perms: "Collection, Analytics" }, { role: "Board Member", count: 5, perms: "Governance, View-Only" }, { role: "Finance", count: 2, perms: "Revenue, Compliance" }].map(r => (
            <div key={r.role} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div><div className="text-sm font-medium text-foreground">{r.role}</div><div className="text-xs text-muted-foreground">{r.perms}</div></div>
              <span className="text-xs text-muted-foreground">{r.count} users</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="glass-card rounded-xl overflow-hidden">
      <h3 className="font-semibold text-foreground p-6 pb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-secondary" />Security Logs</h3>
      <table className="w-full">
        <thead><tr className="border-b border-border">{["Action", "User", "Timestamp", "IP Address"].map(h => <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground">{h}</th>)}</tr></thead>
        <tbody>{logs.map((l, i) => (
          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
            <td className="p-4 text-sm font-medium text-foreground">{l.action}</td>
            <td className="p-4 text-sm text-muted-foreground">{l.user}</td>
            <td className="p-4 text-sm text-muted-foreground">{l.timestamp}</td>
            <td className="p-4 text-sm font-mono text-muted-foreground">{l.ip}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  </div>
);
export default MuseumSettings;
