import type { ImageSourcePropType } from 'react-native';

export type Media = {
  id: string;
  title: string;
  channel: string;
  meta: string;
  duration: string;
  thumb: ImageSourcePropType;
  live?: boolean;
  channelInitials: string;
  subscribers: string;
  description: string;
  detailMeta: string;
  hashtag?: string;
  /** Optional override; otherwise the shared sample playback URL is used. */
  playbackUrl?: string;
};
