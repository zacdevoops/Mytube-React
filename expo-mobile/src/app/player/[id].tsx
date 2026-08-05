import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, FontSize, IconSize, Radii, Spacing } from '@/constants/theme';
import { getMediaById } from '@/data/mytube-data';

export default function PlayerPlaceholderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const media = typeof id === 'string' ? getMediaById(id) : undefined;

  return (
    <View style={[styles.root, { paddingTop: insets.top + Spacing[2] }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={styles.back}
          accessibilityRole="button"
          accessibilityLabel="Go back">
          <ChevronLeft size={IconSize.header} color={Colors.foreground} />
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      </View>

      <View style={styles.media}>
        {media?.thumb ? (
          <Image source={media.thumb} style={styles.image} contentFit="cover" />
        ) : (
          <View style={styles.mediaEmpty} />
        )}
        <View style={styles.placeholderOverlay}>
          <Text style={styles.placeholderText}>Playback placeholder</Text>
        </View>
      </View>

      <Text style={styles.title}>{media?.title ?? 'Unknown media'}</Text>
      {media ? (
        <Text style={styles.meta}>
          {media.channel} · {media.meta}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing[4],
  },
  header: {
    marginBottom: Spacing[4],
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    alignSelf: 'flex-start',
  },
  backLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: Colors.foreground,
  },
  media: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Radii['2xl'],
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  image: {
    ...StyleSheet.absoluteFill,
    opacity: 0.45,
  },
  mediaEmpty: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.surfaceAlt,
  },
  placeholderOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: Colors.mutedForeground,
  },
  title: {
    marginTop: Spacing[4],
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.foreground,
    lineHeight: 20,
  },
  meta: {
    marginTop: Spacing[1],
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.mutedForeground,
  },
});
