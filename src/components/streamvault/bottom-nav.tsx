import { Link } from "@tanstack/react-router";
import { Home, Library, Download, Settings } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/library", label: "Library", icon: Library },
  { to: "/downloads", label: "Downloads", icon: Download },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function BottomNav() {
  return (
    <nav className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-4 px-2 pt-2 pb-3">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact: to === "/" }}
            className="text-muted-foreground flex flex-col items-center gap-1 text-[10px] font-medium"
            activeProps={{ className: "!text-primary" }}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
