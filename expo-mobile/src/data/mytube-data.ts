import type { Media } from '@/types/media';

const thumbWaterfall = require('../../assets/thumbs/thumb-waterfall.jpg');
const thumbLofi = require('../../assets/thumbs/thumb-lofi.jpg');
const thumbEv = require('../../assets/thumbs/thumb-ev.jpg');
const thumbLake = require('../../assets/thumbs/thumb-lake.jpg');

export const categoryTabs = ['Trending', 'Music', 'Gaming', 'News'] as const;
export type CategoryTab = (typeof categoryTabs)[number];

export const featured: Media = {
  id: 'sw4k',
  title: 'Switzerland 4K – Relaxing Nature in 4K Ultra HD',
  channel: 'Scenic Relaxation',
  meta: '12M views · 2 weeks ago',
  duration: '12:45',
  thumb: thumbWaterfall,
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
  },
  {
    id: 'ev',
    title: 'The Future of Electric Vehicles',
    channel: 'Marques Brownlee',
    meta: '3.4M views · 3 days ago',
    duration: '11:06',
    thumb: thumbEv,
  },
  {
    id: 'focus',
    title: 'Deep Focus Music for Work & Study',
    channel: 'Quiet Quest – Study Music',
    meta: '8.7M views · 1 year ago',
    duration: '3:02:14',
    thumb: thumbLake,
  },
  {
    id: 'steak',
    title: 'Cooking the Perfect Steak – Step by Step',
    channel: 'Brian Lagerstrom',
    meta: '1.2M views · 1 week ago',
    duration: '8:16',
    thumb: thumbLofi,
  },
];

const allMedia: Media[] = [featured, ...recommended];

export function getMediaById(id: string): Media | undefined {
  return allMedia.find((item) => item.id === id);
}
