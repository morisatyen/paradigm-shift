import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Image, GitBranch, Users, Shield, BarChart3, Landmark, Heart, Settings, Vote, LogOut } from "lucide-react";

const NAV = [
  { to: "/museum", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/museum/collection", icon: Image, label: "Collection" },
  { to: "/museum/reaccessioning", icon: GitBranch, label: "Reaccessioning" },
  { to: "/museum/governance", icon: Vote, label: "Governance" },
  { to: "/museum/blockchain", icon: Landmark, label: "Blockchain" },
  { to: "/museum/compliance", icon: Shield, label: "Compliance" },
  { to: "/museum/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/museum/stakeholders", icon: Users, label: "Stakeholders" },
  { to: "/museum/community", icon: Heart, label: "Community" },
  { to: "/museum/settings", icon: Settings, label: "Settings" },
];

const MuseumLayout = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 gradient-navy flex flex-col shrink-0">
        <div className="p-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="text-sidebar-foreground font-heading font-semibold text-lg tracking-tight">Paradigm Shift</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-hide">
          {NAV.map(n => {
            const active = pathname === n.to || (n.to !== "/museum" && pathname.startsWith(n.to));
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"}`}>
                <n.icon className="w-4 h-4" />{n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground text-xs font-semibold">MA</div>
            <div className="text-sm"><div className="text-sidebar-foreground font-medium">{user?.name}</div><div className="text-sidebar-foreground/50 text-xs">{user?.email}</div></div>
          </div>
          <button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm w-full"><LogOut className="w-4 h-4" />Sign Out</button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
};
export default MuseumLayout;
