import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MoreVertical, Play } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  Colors,
  FontFamily,
  FontSize,
  Gradient,
  IconSize,
  Radii,
  Shadows,
  Spacing,
} from '@/constants/theme';
import type { Media } from '@/types/media';

type Props = {
  media: Media;
  onPress?: () => void;
};

export function FeaturedCard({ media, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, Shadows.card]}>
      <View style={styles.media}>
        <Image source={media.thumb} style={styles.image} contentFit="cover" transition={0} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{media.duration}</Text>
        </View>
        <LinearGradient
          colors={[...Gradient.primary.colors]}
          start={Gradient.primary.start}
          end={Gradient.primary.end}
          style={[styles.playFab, Shadows.glow]}>
          <Play
            size={IconSize.featuredPlay}
            color={Colors.primaryForeground}
            fill={Colors.primaryForeground}
          />
        </LinearGradient>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaText}>
          <Text style={styles.title}>{media.title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {media.channel} · {media.meta}
          </Text>
        </View>
        <MoreVertical size={IconSize.cardMore} color={Colors.mutedForeground} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Spacing[5],
    backgroundColor: Colors.surface,
    borderRadius: Radii['2xl'],
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  durationBadge: {
    position: 'absolute',
    right: Spacing[2],
    bottom: Spacing[2],
    backgroundColor: Colors.background80,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing[1.5],
    paddingVertical: Spacing[0.5],
  },
  durationText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xs,
    color: Colors.foreground,
  },
  playFab: {
    position: 'absolute',
    left: Spacing[2],
    bottom: Spacing[2],
    width: Spacing.playFab,
    height: Spacing.playFab,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing[2],
    padding: Spacing[3],
  },
  metaText: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.foreground,
    lineHeight: 18,
  },
  subtitle: {
    marginTop: Spacing[1],
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
  },
});
