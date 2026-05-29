import { Bell, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SearchHeader = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return { href, label };
  });

  return (
    <div className="hidden md:block h-[84px] w-full border-b border-border bg-[#F4F6F8]">
      <div className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,620px)_auto] items-center gap-4 px-8 xl:px-10">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 overflow-hidden font-['Archivo',sans-serif] text-[11px] font-bold tracking-[0.14em] text-slate-500">
            <Link to="/" className="shrink-0 text-slate-600 hover:text-slate-800">
              Home
            </Link>
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              return (
                <div key={crumb.href} className="flex min-w-0 items-center gap-2">
                  <span className="shrink-0 text-slate-300">/</span>
                  {isLast ? (
                    <span className="truncate text-slate-800">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.href} className="truncate hover:text-slate-700">
                      {crumb.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex h-12 w-full items-center gap-3 rounded-[14px] border border-slate-200 bg-white px-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-slate-300 focus-within:shadow-[0_4px_12px_rgba(15,23,42,0.06)]">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              readOnly
              placeholder="Search collections, artworks, experience"
              className="w-full border-0 bg-transparent p-0 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-12 w-12 items-center justify-center rounded-[14px] border border-slate-200 bg-white text-slate-500 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-slate-300 hover:text-slate-700 hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)] focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-[#F4F6F8]"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#F59E0B]" />
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;
