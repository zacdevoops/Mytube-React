import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, MoreVertical, Play } from "lucide-react";
import { Screen } from "@/components/streamvault/screen";
import { Logo } from "@/components/streamvault/logo";
import { Tab } from "@/components/streamvault/chip";
import { MediaCard } from "@/components/streamvault/media-card";
import { featured, recommended } from "@/lib/streamvault-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StreamVault — Play & Download Videos and MP3" },
      {
        name: "description",
        content:
          "StreamVault lets you stream and download videos and audio in the highest quality. Fast, private and powerful.",
      },
      { property: "og:title", content: "StreamVault — Play & Download Videos and MP3" },
      {
        property: "og:description",
        content: "Stream instantly or download for offline. No accounts, no tracking.",
      },
    ],
  }),
  component: HomeScreen,
});

const tabs = ["Trending", "Music", "Gaming", "News"];

function HomeScreen() {
  const [tab, setTab] = useState("Trending");

  return (
    <Screen>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Menu size={20} className="text-muted-foreground shrink-0" />
          <Logo size={18} />
        </div>
        <div className="text-muted-foreground flex shrink-0 items-center gap-3">
          <Search size={20} />
          <MoreVertical size={20} />
        </div>
      </header>

      <div className="border-border no-scrollbar mt-4 flex gap-5 overflow-x-auto border-b">
        {tabs.map((t) => (
          <Tab key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </Tab>
        ))}
      </div>

      <h1 className="sr-only">StreamVault — {tab}</h1>

      <Link to="/player" className="bg-surface shadow-card mt-5 block overflow-hidden rounded-2xl">
        <div className="relative aspect-video">
          <img
            src={featured.thumb}
            alt={featured.title}
            width={768}
            height={512}
            className="h-full w-full object-cover"
          />
          <span className="bg-background/80 absolute right-2 bottom-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold">
            {featured.duration}
          </span>
          <span className="gradient-primary shadow-glow absolute bottom-2 left-2 grid h-9 w-9 place-items-center rounded-full">
            <Play size={14} className="fill-primary-foreground text-primary-foreground" />
          </span>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 p-3">
          <div className="min-w-0">
            <p className="text-sm leading-snug font-semibold">{featured.title}</p>
            <p className="text-muted-foreground mt-1 truncate text-[11px]">
              {featured.channel} · {featured.meta}
            </p>
          </div>
          <MoreVertical size={16} className="text-muted-foreground shrink-0" />
        </div>
      </Link>

      <h2 className="mt-6 mb-3 text-sm font-semibold">Recommended</h2>
      <div className="space-y-2.5">
        {recommended.map((v) => (
          <MediaCard
            key={v.id}
            to="/player"
            title={v.title}
            subtitle={v.channel}
            meta={v.meta}
            thumb={v.thumb}
            badge={v.duration}
            badgeAccent={v.live}
          />
        ))}
      </div>
    </Screen>
  );
}
