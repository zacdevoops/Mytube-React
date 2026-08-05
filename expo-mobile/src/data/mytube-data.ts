import type { MediaFormat } from '@/types/format';
import type { Media } from '@/types/media';

const thumbWaterfall = require('../../assets/thumbs/thumb-waterfall.jpg');
const thumbLofi = require('../../assets/thumbs/thumb-lofi.jpg');
const thumbEv = require('../../assets/thumbs/thumb-ev.jpg');
const thumbLake = require('../../assets/thumbs/thumb-lake.jpg');

/**
 * Safe public HTTPS sample used for Phase 2 development playback.
 * Keep isolated here — do not hardcode inside PlayerStage.
 */
export const SAMPLE_PLAYBACK_URL =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

export const categoryTabs = ['Trending', 'Music', 'Gaming', 'News'] as const;
export type CategoryTab = (typeof categoryTabs)[number];

export const featured: Media = {
  id: 'sw4k',
  title: 'Switzerland 4K – Relaxing Nature in 4K Ultra HD',
  channel: 'Scenic Relaxation',
  meta: '12M views · 2 weeks ago',
  duration: '12:45',
  thumb: thumbWaterfall,
  channelInitials: 'SR',
  subscribers: '2.35M subscribers',
  detailMeta: '12,345,678 views · 2 weeks ago',
  hashtag: '#switzerland',
  description:
    'Relax with breathtaking 4K footage of Switzerland’s lakes, mountains, and forests. Perfect for focus, sleep, or ambient viewing. This preview uses a public sample stream for development playback.',
};

export const recommended: Media[] = [
  {
    id: 'lofi',
    title: 'Lofi Hip Hop Radio 24/7 Chill Beats',
    channel: 'Chillhop Music',
    meta: '2.1K watching',
    duration: 'LIVE',
    thumb: thumbLofi,
    live: true,
    channelInitials: 'CM',
    subscribers: '4.8M subscribers',
    detailMeta: '2,145 watching · Live now',
    hashtag: '#lofi',
    description:
      'Round-the-clock chill beats for studying, coding, and winding down. Development playback uses a public sample MP4.',
  },
  {
    id: 'ev',
    title: 'The Future of Electric Vehicles',
    channel: 'Marques Brownlee',
    meta: '3.4M views · 3 days ago',
    duration: '11:06',
    thumb: thumbEv,
    channelInitials: 'MB',
    subscribers: '19.2M subscribers',
    detailMeta: '3,412,088 views · 3 days ago',
    hashtag: '#ev',
    description:
      'A look at where electric vehicles are headed next — range, charging, and design. Development playback uses a public sample MP4.',
  },
  {
    id: 'focus',
    title: 'Deep Focus Music for Work & Study',
    channel: 'Quiet Quest – Study Music',
    meta: '8.7M views · 1 year ago',
    duration: '3:02:14',
    thumb: thumbLake,
    channelInitials: 'QQ',
    subscribers: '1.1M subscribers',
    detailMeta: '8,701,442 views · 1 year ago',
    hashtag: '#focus',
    description:
      'Ambient focus music designed for deep work sessions. Development playback uses a public sample MP4.',
  },
  {
    id: 'steak',
    title: 'Cooking the Perfect Steak – Step by Step',
    channel: 'Brian Lagerstrom',
    meta: '1.2M views · 1 week ago',
    duration: '8:16',
    thumb: thumbLofi,
    channelInitials: 'BL',
    subscribers: '2.0M subscribers',
    detailMeta: '1,204,331 views · 1 week ago',
    hashtag: '#cooking',
    description:
      'Technique-focused steak tutorial covering sear, rest, and seasoning. Development playback uses a public sample MP4.',
  },
];

export const videoFormats: MediaFormat[] = [
  { id: 'v-2160', label: '2160p (4K)', ext: 'MP4', size: '1.48 GB', kind: 'video' },
  { id: 'v-1440', label: '1440p (2K)', ext: 'MP4', size: '620 MB', kind: 'video' },
  { id: 'v-1080', label: '1080p (HD)', ext: 'MP4', size: '310 MB', kind: 'video' },
  { id: 'v-720', label: '720p (HD)', ext: 'MP4', size: '180 MB', kind: 'video' },
  { id: 'v-480', label: '480p', ext: 'MP4', size: '95 MB', kind: 'video' },
];

export const audioFormats: MediaFormat[] = [
  { id: 'a-320', label: 'MP3 320 kbps', ext: 'MP3', size: '12.6 MB', kind: 'audio' },
  { id: 'a-192', label: 'MP3 192 kbps', ext: 'MP3', size: '7.6 MB', kind: 'audio' },
  { id: 'a-128', label: 'M4A 128 kbps', ext: 'M4A', size: '5.1 MB', kind: 'audio' },
];

const allMedia: Media[] = [featured, ...recommended];

export function getMediaById(id: string): Media | undefined {
  return allMedia.find((item) => item.id === id);
}

/** Returns a playback URL for a valid media item, or undefined if unavailable. */
export function getPlaybackUrl(media: Media): string | undefined {
  const url = media.playbackUrl ?? SAMPLE_PLAYBACK_URL;
  return url.trim().length > 0 ? url : undefined;
}
