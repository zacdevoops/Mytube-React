import { Image } from 'expo-image';
import { MoreVertical } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSize, IconSize, Radii, Shadows, Spacing } from '@/constants/theme';
import type { Media } from '@/types/media';

type Props = {
  media: Media;
  onPress?: () => void;
};

export function MediaCard({ media, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, Shadows.card]}>
      <View style={styles.thumb}>
        <Image source={media.thumb} style={styles.image} contentFit="cover" transition={0} />
        <View style={[styles.badge, media.live ? styles.badgeLive : styles.badgeDefault]}>
          <Text style={[styles.badgeText, media.live ? styles.badgeTextLive : null]}>
            {media.duration}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {media.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {media.channel}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {media.meta}
        </Text>
      </View>
      <MoreVertical
        size={IconSize.cardMore}
        color={Colors.mutedForeground}
        style={styles.more}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing[3],
    backgroundColor: Colors.surface,
    borderRadius: Radii['2xl'],
    padding: Spacing[2.5],
  },
  thumb: {
    width: Spacing.thumbW,
    height: Spacing.thumbH,
    borderRadius: Radii.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceAlt,
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    right: Spacing[1],
    bottom: Spacing[1],
    borderRadius: Radii.md,
    paddingHorizontal: Spacing[1.5],
    paddingVertical: Spacing[0.5],
  },
  badgeDefault: {
    backgroundColor: Colors.background80,
  },
  badgeLive: {
    backgroundColor: Colors.accent,
  },
  badgeText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xs,
    color: Colors.foreground,
  },
  badgeTextLive: {
    color: Colors.accentForeground,
  },
  body: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.md,
    color: Colors.foreground,
    lineHeight: 16,
  },
  subtitle: {
    marginTop: Spacing[1],
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
  },
  meta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
  },
  more: {
    marginTop: Spacing[1],
    flexShrink: 0,
  },
});
