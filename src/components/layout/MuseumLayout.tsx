import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SearchHeader from "@/components/layout/SearchHeader";
import {
  LayoutDashboard,
  GitBranch,
  Users,
  Shield,
  BarChart3,
  Landmark,
  Heart,
  Settings,
  Vote,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Layers,
} from "lucide-react";

const WORKSPACE_NAV = [
  { to: "/Workspace/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/Workspace/collections", icon: Layers, label: "Collections" },
  { to: "/Workspace/reaccessioning", icon: GitBranch, label: "Reaccessioning" },
  { to: "/Workspace/governance", icon: Vote, label: "Governance" },
  { to: "/Workspace/blockchain", icon: Landmark, label: "Blockchain" },
  { to: "/Workspace/compliance", icon: Shield, label: "Compliance" },
];

const INSIGHTS_NAV = [
  { to: "/Insights/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/Insights/stakeholders", icon: Users, label: "Stakeholders" },
  { to: "/Insights/community", icon: Heart, label: "Community" },
  { to: "/Insights/voting", icon: MessageSquare, label: "Visitor Votes" },
  { to: "/Insights/settings", icon: Settings, label: "Settings" },
];

const SVG_LOGO = (
  <svg preserveAspectRatio="xMidYMid meet" data-bbox="0 6.44 781.71 97.05" viewBox="0 6.44 781.71 97.05" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "180px", height: "auto", display: "block" }}><g><path d="M41.58 45.06q0-5.925-2.61-10.32c-1.74-2.93-4.24-5.19-7.48-6.8-3.25-1.6-7.11-2.4-11.59-2.4H0v61.1h11.86v-21.1h8.41c4.28 0 8.02-.86 11.21-2.59s5.67-4.13 7.44-7.21 2.65-6.64 2.65-10.67Zm-12.96 5.3c-.84 1.44-2.03 2.56-3.56 3.38s-3.34 1.22-5.41 1.22h-7.79V36.18h7.3c3.29 0 5.9.82 7.83 2.47 1.93 1.64 2.9 3.9 2.9 6.78 0 1.85-.42 3.5-1.26 4.93Z" fill="#ffffff"/><path d="m63.01 25.53-25.29 61.1h12.56l5.24-13.26h24.92l5.24 13.26h12.6l-25.29-61.1H63Zm4.8 14.3h.33l9.08 23.54H58.73z" fill="#ffffff"/><path d="M142.47 54.38c1.88-3.09 2.82-6.56 2.82-10.4s-.91-7.3-2.74-10.03-4.29-4.82-7.4-6.26-6.61-2.16-10.51-2.16h-20.97v61.1h11.86V64.5h6.3c.74 0 1.46-.03 2.16-.07l13.09 22.21h13.43l-15.25-25.36c3.08-1.77 5.49-4.06 7.21-6.89Zm-26.95.33V36.18h7.25c3.23 0 5.84.82 7.83 2.47 1.99 1.64 2.98 3.9 2.98 6.78 0 1.85-.44 3.48-1.31 4.87-.87 1.4-2.08 2.48-3.63 3.25s-3.34 1.16-5.39 1.16h-7.75Z" fill="#ffffff"/><path d="M199.13 86.63h12.6l-25.29-61.1h-9.99l-25.29 61.1h12.56l5.24-13.26h24.92l5.24 13.26Zm-17.86-46.8h.33l9.08 23.54h-18.49z" fill="#ffffff"/><path d="M267.94 55.63c0-4.97-.82-9.34-2.45-13.1s-3.85-6.89-6.67-9.41a28.7 28.7 0 0 0-9.68-5.68c-3.63-1.27-7.45-1.91-11.46-1.91h-20.56v61.1h21.47c3.79 0 7.43-.66 10.94-1.99s6.65-3.3 9.41-5.93q4.14-3.945 6.57-9.72c2.43-5.775 2.42-8.31 2.42-13.37Zm-13.41 9.1c-1.04 2.56-2.4 4.67-4.1 6.34s-3.55 2.91-5.55 3.71-4 1.2-5.99 1.2h-9.91V36.19h9.91c1.99 0 3.99.37 5.99 1.12s3.85 1.9 5.55 3.46 3.07 3.57 4.1 6.03c1.04 2.46 1.55 5.4 1.55 8.83s-.52 6.54-1.55 9.1" fill="#ffffff"/><path fill="#ffffff" d="M289.04 25.53v61.1h-11.9v-61.1z"/><path d="M353.46 74.28c2.24-4.03 3.36-8.62 3.36-13.76v-8.58h-29.1v10.03h17.78c0 2.76-.66 5.26-1.99 7.48s-3.19 3.98-5.58 5.26-5.16 1.93-8.31 1.93c-2.79 0-5.36-.5-7.71-1.51a18.8 18.8 0 0 1-6.18-4.27c-1.77-1.84-3.14-4.02-4.12-6.55s-1.47-5.31-1.47-8.35c0-4.09.88-7.65 2.63-10.69s4.15-5.4 7.17-7.07c3.03-1.67 6.45-2.51 10.26-2.51 3.07 0 5.85.48 8.35 1.43s4.51 2.19 6.03 3.71l4.56-10.69c-2.68-1.71-5.64-3.02-8.87-3.92s-6.59-1.35-10.07-1.35c-4.7 0-8.99.79-12.89 2.38s-7.27 3.81-10.11 6.65-5.04 6.17-6.59 9.97-2.32 7.94-2.32 12.41.78 8.6 2.34 12.37 3.74 7.05 6.55 9.84c2.8 2.79 6.1 4.95 9.89 6.49 3.79 1.53 7.92 2.3 12.39 2.3q8.325 0 14.49-3.48c6.165-3.48 7.27-5.5 9.51-9.53Z" fill="#ffffff"/><path fill="#ffffff" d="m377.66 62.84-.25-15.01h.34l16.95 26.45h2.65l16.96-26.45h.33l-.25 15.01v23.79h11.85v-61.1h-8.95l-21.1 31.71h-.33L374.8 25.53h-8.99v61.1h11.85z"/><path d="M596.4 54.76c-1.81-1.35-3.63-2.42-5.45-3.21s-3.32-1.36-4.48-1.72c-.99-.33-2.16-.73-3.5-1.2s-2.65-1.06-3.92-1.78-2.33-1.6-3.17-2.65q-1.26-1.575-1.26-3.81 0-3.15 2.28-4.68t4.89-1.53c1.58 0 2.95.35 4.12 1.06 1.17.7 2.13 1.52 2.88 2.45s1.27 1.73 1.58 2.42l10.9-4.39c-.94-2.18-2.29-4.2-4.04-6.05-1.76-1.85-3.92-3.34-6.51-4.46-2.58-1.12-5.59-1.68-9.02-1.68-3.68 0-6.93.68-9.76 2.05s-5.05 3.31-6.65 5.82-2.4 5.5-2.4 8.95.73 6.12 2.18 8.41 3.36 4.18 5.74 5.66 4.96 2.7 7.75 3.67c1.13.39 2.41.84 3.83 1.35s2.8 1.13 4.12 1.84c1.33.72 2.42 1.61 3.3 2.67.87 1.06 1.31 2.34 1.31 3.83a6.3 6.3 0 0 1-1.2 3.75c-.8 1.12-1.85 2-3.15 2.63-1.3.64-2.71.95-4.23.95-1.8 0-3.41-.43-4.83-1.28-1.42-.86-2.63-1.94-3.61-3.25s-1.71-2.65-2.18-4l-11.23 4.73c.86 2.6 2.35 5.01 4.48 7.23s4.71 4.01 7.75 5.37c3.04 1.35 6.31 2.03 9.82 2.03 3.81 0 7.24-.81 10.28-2.42 3.04-1.62 5.44-3.81 7.19-6.59s2.63-5.88 2.63-9.31c0-3.01-.62-5.57-1.87-7.67-1.24-2.1-2.77-3.83-4.58-5.18Z" fill="#ffffff"/><path fill="#ffffff" d="M651.09 48.95h-26.44V24.17h-11.86v61.09h11.86V59.61h26.44v25.65h11.86V24.17h-11.86z"/><path fill="#ffffff" d="M687.7 24.17v61.1h-11.9v-61.1z"/><path fill="#ffffff" d="M700.59 85.26h11.85V61.35h19.28V50.69h-19.28V34.82h22.96V24.17h-34.81z"/><path fill="#ffffff" d="M781.71 24.17h-42.33v10.65h15.26v50.44h11.85V34.82h15.22z"/><path fill="#003153" d="m455.58 14.04 12.92-7.6 71.12 40.13-57.32 33.72-.27-15 31.15-18.44z"/><path fill="#d1d1d1" d="m455.58 14.04.17 81.75 13.92 7.7-.94-66.9 31.12 18.16 13.33-7.9z"/><path fill="#06a2f9" d="m468.73 36.59.94 66.9 70.24-41.2-.29-15.72-57.32 33.72-.66-36.15z"/></g></svg>
);

const MuseumLayout = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const resolvePageLabel = () => {
    const allNav = [...WORKSPACE_NAV, ...INSIGHTS_NAV];
    const direct = allNav.find((item) => pathname === item.to);
    if (direct) return direct.label;

    const prefixed = allNav
      .filter((item) => item.to !== "/Workspace/dashboard" && pathname.startsWith(item.to))
      .sort((a, b) => b.to.length - a.to.length)[0];
    if (prefixed) return prefixed.label;

    if (pathname.includes("/artworks/")) return "Artwork";
    if (pathname.includes("/experiences/")) return "Experience";
    if (pathname.includes("/collections/")) return "Collections";

    const last = pathname.split("/").filter(Boolean).pop() ?? "Dashboard";
    return last
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const isActivePath = (to: string) =>
    to === "/Workspace/collections"
      ? pathname.startsWith("/Workspace/collections") ||
        pathname.startsWith("/Workspace/artworks") ||
        pathname.startsWith("/Workspace/experiences")
      : pathname === to || (to !== "/Workspace/dashboard" && pathname.startsWith(to));

  const SidebarContent = () => (
    <>
      <div className="px-3 pt-1 pb-6 border-b border-sidebar-border/70 mb-5 flex items-center justify-between">
        <Link to="/" className="block w-full max-w-[180px]" onClick={() => setSidebarOpen(false)}>{SVG_LOGO}</Link>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground"><X className="w-4 h-4" /></button>
      </div>
      <nav className="flex-1 px-4 pt-0 pb-6 space-y-4 overflow-y-auto scrollbar-hide">
        <section>
          <div className="px-3 pt-3 pb-2 text-[10px] tracking-[0.14em] font-bold uppercase text-sidebar-foreground/55">Workspace</div>
          <div className="space-y-1">
            {WORKSPACE_NAV.map((n) => {
              const active = isActivePath(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-2.5 py-2 my-[1px] rounded-md text-[13px] font-medium transition-all duration-150 ease-in ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/45"
                  }`}
                >
                  <n.icon className={`w-4 h-4 ${active ? "text-[#E89A6B]" : "text-sidebar-foreground/55"}`} />
                  <span className={`${active ? "font-bold" : "font-medium"}`}>{n.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
        <section>
          <div className="px-3 pt-3 pb-2 text-[10px] tracking-[0.14em] font-bold uppercase text-sidebar-foreground/55">Insights</div>
          <div className="space-y-1">
            {INSIGHTS_NAV.map((n) => {
              const active = isActivePath(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-2.5 py-2 my-[1px] rounded-md text-[13px] font-medium transition-all duration-150 ease-in ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/45"
                  }`}
                >
                  <n.icon className={`w-4 h-4 ${active ? "text-[#E89A6B]" : "text-sidebar-foreground/55"}`} />
                  <span className={`${active ? "font-bold" : "font-medium"}`}>{n.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </nav>
      <div className="p-4 border-t border-sidebar-border/70">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground text-xs font-semibold">MA</div>
          <div className="text-sm"><div className="text-sidebar-foreground font-medium">{user?.name}</div><div className="text-sidebar-foreground/50 text-xs">{user?.email}</div></div>
        </div>
        <button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-2 text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm w-full"><LogOut className="w-4 h-4" />Sign Out</button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[240px] gradient-navy flex-col shrink-0 p-3">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Mobile sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[240px] gradient-navy flex flex-col z-50 md:hidden p-3 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 gradient-navy border-b border-sidebar-border shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="text-sidebar-foreground"><Menu className="w-5 h-5" /></button>
          <Link to="/">{SVG_LOGO}</Link>
        </div>
        <SearchHeader />
        <main className="app-page-content flex-1 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default MuseumLayout;
