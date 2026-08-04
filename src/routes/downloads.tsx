import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MoreVertical, Pause, Music2, Video } from "lucide-react";
import { Screen } from "@/components/streamvault/screen";
import { Chip } from "@/components/streamvault/chip";
import { MediaCard } from "@/components/streamvault/media-card";
import { ProgressBar } from "@/components/streamvault/progress-bar";
import { inProgress, completed } from "@/lib/streamvault-data";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — StreamVault" },
      {
        name: "description",
        content:
          "Track in-progress downloads and browse completed offline video and audio files in StreamVault.",
      },
      { property: "og:title", content: "Downloads — StreamVault" },
      {
        property: "og:description",
        content: "Multi-threaded downloads with live progress and storage usage.",
      },
    ],
  }),
  component: DownloadsScreen,
});

const filters = ["All", "Video", "Audio"] as const;

function DownloadsScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = completed.filter((c) =>
    filter === "All" ? true : filter === "Video" ? c.kind === "video" : c.kind === "audio",
  );

  return (
    <Screen>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Link to="/" aria-label="Back">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="truncate text-base font-semibold">Downloads</h1>
        </div>
        <MoreVertical size={20} className="text-muted-foreground shrink-0" />
      </header>

      <div className="mt-4 flex gap-2">
        {filters.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      {filter !== "Audio" ? (
        <>
          <h2 className="text-muted-foreground mt-6 mb-2 text-xs font-medium">In Progress</h2>
          {inProgress.map((d) => (
            <MediaCard
              key={d.id}
              title={d.title}
              subtitle={d.format}
              thumb={d.thumb}
              action={
                <button
                  type="button"
                  aria-label="Pause download"
                  className="gradient-primary text-primary-foreground grid h-8 w-8 place-items-center rounded-full"
                >
                  <Pause size={14} />
                </button>
              }
            >
              <ProgressBar
                className="mt-2"
                value={d.percent}
                left={`${d.percent}%`}
                right={d.detail}
              />
            </MediaCard>
          ))}
        </>
      ) : null}

      <h2 className="text-muted-foreground mt-6 mb-2 text-xs font-medium">Completed</h2>
      <div className="space-y-2.5">
        {list.map((c) => (
          <MediaCard
            key={c.id}
            title={c.title}
            subtitle={c.format}
            meta={c.size}
            thumb={c.kind === "video" ? c.thumb : undefined}
            icon={c.kind === "video" ? <Video size={18} /> : <Music2 size={18} />}
          />
        ))}
      </div>

      <div className="bg-surface shadow-card mt-6 rounded-2xl p-3">
        <ProgressBar value={62} left="Storage" right="26.4 GB free" />
      </div>
    </Screen>
  );
}
