import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, MoreVertical, Plus } from "lucide-react";
import { Screen } from "@/components/streamvault/screen";
import { Tab } from "@/components/streamvault/chip";
import { MediaCard } from "@/components/streamvault/media-card";
import { PrimaryButton } from "@/components/streamvault/buttons";
import { playlists, recommended } from "@/lib/streamvault-data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — StreamVault" },
      {
        name: "description",
        content: "Your playlists, watch later queue and viewing history, stored locally on device.",
      },
      { property: "og:title", content: "Library — StreamVault" },
      {
        property: "og:description",
        content: "Organise playlists and offline media — no account required.",
      },
    ],
  }),
  component: LibraryScreen,
});

const tabs = ["Playlists", "Watch Later", "History"] as const;

function LibraryScreen() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Playlists");

  return (
    <Screen>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Menu size={20} className="text-muted-foreground shrink-0" />
          <h1 className="truncate text-base font-semibold">Library</h1>
        </div>
        <MoreVertical size={20} className="text-muted-foreground shrink-0" />
      </header>

      <div className="border-border no-scrollbar mt-4 flex gap-5 overflow-x-auto border-b">
        {tabs.map((t) => (
          <Tab key={t} active={tab === t} onClick={() => setTab(t)}>
            {t}
          </Tab>
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        {tab === "Playlists"
          ? playlists.map((p) => (
              <MediaCard key={p.id} title={p.name} subtitle={`${p.count} videos`} thumb={p.thumb} />
            ))
          : recommended.map((v) => (
              <MediaCard
                key={v.id}
                to="/player"
                title={v.title}
                subtitle={v.channel}
                meta={tab === "History" ? `Watched · ${v.meta}` : v.meta}
                thumb={v.thumb}
                badge={v.duration}
                badgeAccent={v.live}
              />
            ))}
      </div>

      {tab === "Playlists" ? (
        <PrimaryButton className="mt-5 w-full">
          <Plus size={16} /> New Playlist
        </PrimaryButton>
      ) : null}
    </Screen>
  );
}
