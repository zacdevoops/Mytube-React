import thumbLake from "@/assets/thumb-lake.jpg";
import thumbWaterfall from "@/assets/thumb-waterfall.jpg";
import thumbLofi from "@/assets/thumb-lofi.jpg";
import thumbEv from "@/assets/thumb-ev.jpg";

export const thumbs = {
  lake: thumbLake,
  waterfall: thumbWaterfall,
  lofi: thumbLofi,
  ev: thumbEv,
};

export type Media = {
  id: string;
  title: string;
  channel: string;
  meta: string;
  duration: string;
  thumb: string;
  live?: boolean;
};

export const featured: Media = {
  id: "sw4k",
  title: "Switzerland 4K – Relaxing Nature in 4K Ultra HD",
  channel: "Scenic Relaxation",
  meta: "12M views · 2 weeks ago",
  duration: "12:45",
  thumb: thumbWaterfall,
};

export const recommended: Media[] = [
  {
    id: "lofi",
    title: "Lofi Hip Hop Radio 24/7 Chill Beats",
    channel: "Chillhop Music",
    meta: "2.1K watching",
    duration: "LIVE",
    thumb: thumbLofi,
    live: true,
  },
  {
    id: "ev",
    title: "The Future of Electric Vehicles",
    channel: "Marques Brownlee",
    meta: "3.4M views · 3 days ago",
    duration: "11:06",
    thumb: thumbEv,
  },
  {
    id: "focus",
    title: "Deep Focus Music for Work & Study",
    channel: "Quiet Quest – Study Music",
    meta: "8.7M views · 1 year ago",
    duration: "3:02:14",
    thumb: thumbLake,
  },
  {
    id: "steak",
    title: "Cooking the Perfect Steak – Step by Step",
    channel: "Brian Lagerstrom",
    meta: "1.2M views · 1 week ago",
    duration: "8:16",
    thumb: thumbLofi,
  },
];

export const videoFormats = [
  { label: "2160p (4K)", ext: "MP4", size: "1.48 GB" },
  { label: "1440p (2K)", ext: "MP4", size: "620 MB" },
  { label: "1080p (HD)", ext: "MP4", size: "310 MB" },
  { label: "720p (HD)", ext: "MP4", size: "180 MB" },
  { label: "480p", ext: "MP4", size: "95 MB" },
];

export const audioFormats = [
  { label: "MP3 320 kbps", ext: "MP3", size: "12.6 MB" },
  { label: "MP3 192 kbps", ext: "MP3", size: "7.6 MB" },
  { label: "M4A 128 kbps", ext: "M4A", size: "5.1 MB" },
];

export const inProgress = [
  {
    id: "d1",
    title: "Switzerland 4K – Relaxing Nature",
    format: "2160p · MP4",
    percent: 76,
    detail: "1.12 GB / 1.48 GB",
    thumb: thumbWaterfall,
  },
];

export const completed = [
  {
    id: "c1",
    title: "Lofi Hip Hop Radio",
    format: "MP3 · 320 kbps",
    size: "52 MB",
    kind: "audio" as const,
    thumb: thumbLofi,
  },
  {
    id: "c2",
    title: "The Future of Electric Vehicles",
    format: "1080p · MP4",
    size: "310 MB",
    kind: "video" as const,
    thumb: thumbEv,
  },
  {
    id: "c3",
    title: "Deep Focus Music for Work & Study",
    format: "MP3 · 192 kbps",
    size: "95 MB",
    kind: "audio" as const,
    thumb: thumbLake,
  },
  {
    id: "c4",
    title: "Cooking the Perfect Steak",
    format: "720p · MP4",
    size: "180 MB",
    kind: "video" as const,
    thumb: thumbLofi,
  },
];

export const playlists = [
  { id: "p1", name: "Chill Vibes", count: 24, thumb: thumbLofi },
  { id: "p2", name: "Tech Talks", count: 18, thumb: thumbEv },
  { id: "p3", name: "Workout Mix", count: 32, thumb: thumbLake },
  { id: "p4", name: "Documentaries", count: 15, thumb: thumbWaterfall },
  { id: "p5", name: "Live Concerts", count: 9, thumb: thumbLofi },
];
