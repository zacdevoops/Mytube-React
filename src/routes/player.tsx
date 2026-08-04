import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Cast,
  Maximize2,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Share2,
  ListPlus,
  MoreHorizontal,
  ChevronDown,
  Play,
  Music2,
  Download,
} from "lucide-react";
import { Screen } from "@/components/streamvault/screen";
import { PrimaryButton } from "@/components/streamvault/buttons";
import { ProgressBar } from "@/components/streamvault/progress-bar";
import { featured, videoFormats, audioFormats } from "@/lib/streamvault-data";

export const Route = createFileRoute("/player")({
  head: () => ({
    meta: [
      { title: "Now Playing — StreamVault" },
      {
        name: "description",
        content:
          "Watch and download in up to 4K MP4 or extract MP3/M4A audio with StreamVault's player.",
      },
      { property: "og:title", content: "Now Playing — StreamVault" },
      {
        property: "og:description",
        content: "Stream in 4K or grab MP4 / MP3 / M4A downloads instantly.",
      },
    ],
  }),
  component: PlayerScreen,
});

function PlayerScreen() {
  const [openVideo, setOpenVideo] = useState(true);
  const [openAudio, setOpenAudio] = useState(true);
  const [openPanel, setOpenPanel] = useState(true);

  return (
    <Screen className="pt-0">
      <div className="relative -mx-4 aspect-video overflow-hidden">
        <img
          src={featured.thumb}
          alt={featured.title}
          width={768}
          height={512}
          className="h-full w-full object-cover"
        />
        <div className="from-background/80 absolute inset-0 bg-gradient-to-b to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <Link to="/" aria-label="Back">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-4">
            <Cast size={18} />
            <Maximize2 size={18} />
            <MoreVertical size={18} />
          </div>
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <span className="gradient-primary shadow-glow grid h-14 w-14 place-items-center rounded-full">
            <Play size={22} className="fill-primary-foreground text-primary-foreground" />
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <ProgressBar value={13} left="01:32" right="12:45" />
        </div>
      </div>

      <h1 className="mt-4 text-base leading-snug font-semibold">{featured.title}</h1>
      <p className="text-muted-foreground mt-1 text-[11px]">
        12,345,678 views · 2 weeks ago · <span className="text-secondary">#switzerland</span> ...more
      </p>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="bg-surface-alt grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold">
            SR
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium">{featured.channel}</p>
            <p className="text-muted-foreground text-[11px]">2.35M subscribers</p>
          </div>
        </div>
        <PrimaryButton className="shrink-0 px-4 py-2 text-xs">Subscribe</PrimaryButton>
      </div>

      <div className="no-scrollbar mt-4 flex items-center justify-between gap-2 overflow-x-auto">
        {[
          { icon: ThumbsUp, label: "150K" },
          { icon: ThumbsDown, label: "Dislike" },
          { icon: Share2, label: "Share" },
          { icon: ListPlus, label: "Add to" },
          { icon: MoreHorizontal, label: "More" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className="bg-surface text-muted-foreground hover:text-foreground flex min-w-16 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] font-medium transition-colors"
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <section className="bg-surface shadow-card mt-5 overflow-hidden rounded-2xl">
        <button
          type="button"
          onClick={() => setOpenPanel((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
        >
          <span className="flex items-center gap-2">
            <Download size={15} className="text-primary" /> Download
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${openPanel ? "" : "-rotate-90"}`}
          />
        </button>

        {openPanel ? (
          <div className="border-border border-t">
            <button
              type="button"
              onClick={() => setOpenVideo((v) => !v)}
              className="text-muted-foreground flex w-full items-center justify-between px-4 py-2.5 text-xs font-medium"
            >
              Video
              <ChevronDown
                size={14}
                className={`transition-transform ${openVideo ? "" : "-rotate-90"}`}
              />
            </button>
            {openVideo
              ? videoFormats.map((f) => (
                  <FormatRow
                    key={f.label}
                    icon={<Play size={12} />}
                    label={f.label}
                    right={`${f.ext} · ${f.size}`}
                  />
                ))
              : null}

            <button
              type="button"
              onClick={() => setOpenAudio((v) => !v)}
              className="text-muted-foreground flex w-full items-center justify-between px-4 py-2.5 text-xs font-medium"
            >
              Audio
              <ChevronDown
                size={14}
                className={`transition-transform ${openAudio ? "" : "-rotate-90"}`}
              />
            </button>
            {openAudio
              ? audioFormats.map((f) => (
                  <FormatRow
                    key={f.label}
                    icon={<Music2 size={12} />}
                    label={f.label}
                    right={`${f.ext} · ${f.size}`}
                  />
                ))
              : null}
            <div className="h-2" />
          </div>
        ) : null}
      </section>
    </Screen>
  );
}

function FormatRow({
  icon,
  label,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  right: string;
}) {
  return (
    <button
      type="button"
      className="hover:bg-surface-alt flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors"
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="bg-surface-alt text-primary grid h-6 w-6 shrink-0 place-items-center rounded-md">
          {icon}
        </span>
        <span className="truncate text-[13px]">{label}</span>
      </span>
      <span className="text-muted-foreground shrink-0 text-[11px]">{right}</span>
    </button>
  );
}
