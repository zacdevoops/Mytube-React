import type { ImageSourcePropType } from 'react-native';

export type Media = {
  id: string;
  title: string;
  channel: string;
  meta: string;
  duration: string;
  thumb: ImageSourcePropType;
  live?: boolean;
};
