import { createFileRoute } from "@tanstack/react-router";
import {
  Settings as SettingsIcon,
  Palette,
  Play,
  Download,
  Shield,
  DatabaseBackup,
  Info,
  Heart,
  ChevronRight,
  Search,
  MoreVertical,
  Sun,
  Moon,
} from "lucide-react";
import { Screen } from "@/components/streamvault/screen";
import { Logo } from "@/components/streamvault/logo";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — StreamVault" },
      {
        name: "description",
        content:
          "Configure appearance, playback, downloads, privacy and backup options in StreamVault.",
      },
      { property: "og:title", content: "Settings — StreamVault" },
      {
        property: "og:description",
        content: "Privacy-first settings: no accounts, no tracking, fully local.",
      },
    ],
  }),
  component: SettingsScreen,
});

const items = [
  { icon: SettingsIcon, label: "Settings", hint: "General preferences" },
  { icon: Palette, label: "Appearance", hint: "Theme and layout" },
  { icon: Play, label: "Playback", hint: "Quality, background play" },
  { icon: Download, label: "Downloads", hint: "Default formats, location" },
  { icon: Shield, label: "Privacy", hint: "No tracking, local only" },
  { icon: DatabaseBackup, label: "Backup & Restore", hint: "Export your library" },
  { icon: Info, label: "About", hint: "yt-dlp powered, open source" },
  { icon: Heart, label: "Donate", hint: "Support development" },
];

function SettingsScreen() {
  const { light, toggle } = useTheme();

  return (
    <Screen>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <Logo size={18} className="min-w-0" />
        <div className="text-muted-foreground flex shrink-0 items-center gap-3">
          <Search size={20} />
          <MoreVertical size={20} />
        </div>
      </header>

      <h1 className="sr-only">Settings</h1>

      <div className="bg-surface shadow-card mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-4">
        <div className="min-w-0">
          <p className="text-sm font-medium">Light & Dark</p>
          <p className="text-muted-foreground text-[11px]">Beautiful UI in either mode</p>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle theme"
          className="gradient-primary text-primary-foreground shadow-glow grid h-9 w-9 shrink-0 place-items-center rounded-full"
        >
          {light ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="bg-surface shadow-card mt-4 overflow-hidden rounded-2xl">
        {items.map(({ icon: Icon, label, hint }, i) => (
          <button
            key={label}
            type="button"
            className={`hover:bg-surface-alt flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors ${
              i > 0 ? "border-border border-t" : ""
            }`}
          >
            <span className="bg-surface-alt text-primary grid h-9 w-9 shrink-0 place-items-center rounded-xl">
              <Icon size={16} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{label}</span>
              <span className="text-muted-foreground block truncate text-[11px]">{hint}</span>
            </span>
            <ChevronRight size={16} className="text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>

      <p className="text-muted-foreground mt-6 text-center text-[11px]">Version 1.0.0</p>
      <p className="text-muted-foreground text-center text-[11px]">
        Built with <span className="text-accent">♥</span> using yt-dlp
      </p>
    </Screen>
  );
}
