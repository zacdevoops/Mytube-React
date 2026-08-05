import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionRow } from '@/components/mytube/ActionRow';
import { ChannelRow } from '@/components/mytube/ChannelRow';
import { DescriptionBlock } from '@/components/mytube/DescriptionBlock';
import { DownloadPanel } from '@/components/mytube/DownloadPanel';
import { PlayerStage } from '@/components/mytube/PlayerStage';
import { Colors, FontFamily, FontSize, Radii, Spacing } from '@/constants/theme';
import { getMediaById, getPlaybackUrl } from '@/data/mytube-data';

function goBackOrHome(router: ReturnType<typeof useRouter>) {
  if (router.canGoBack()) {
    router.back();
    return;
  }
  router.replace('/');
}

export default function PlayerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const rawId = params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const media = typeof id === 'string' && id.length > 0 ? getMediaById(id) : undefined;

  if (!media) {
    return (
      <View style={[styles.errorRoot, { paddingTop: insets.top + Spacing[4] }]}>
        <Pressable
          onPress={() => goBackOrHome(router)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={styles.errorBack}>
          <Text style={styles.errorBackLabel}>Back</Text>
        </Pressable>
        <View style={styles.errorBody}>
          <Text style={styles.errorTitle}>Video not found</Text>
          <Text style={styles.errorSubtitle}>
            This media ID is missing or unknown. Choose a video from Home.
          </Text>
          <Pressable
            onPress={() => router.replace('/')}
            style={styles.homeButton}
            accessibilityRole="button">
            <Text style={styles.homeButtonLabel}>Go to Home</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const playbackUrl = getPlaybackUrl(media);

  return (
    <View style={styles.root}>
      <PlayerStage
        key={media.id}
        title={media.title}
        thumb={media.thumb}
        playbackUrl={playbackUrl}
        onBack={() => goBackOrHome(router)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, Spacing[4]) + Spacing[4] },
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{media.title}</Text>
        <DescriptionBlock
          detailMeta={media.detailMeta}
          hashtag={media.hashtag}
          description={media.description}
        />
        <ChannelRow
          channel={media.channel}
          initials={media.channelInitials}
          subscribers={media.subscribers}
        />
        <ActionRow />
        <DownloadPanel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing[4],
    paddingTop: Spacing[4],
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    color: Colors.foreground,
    lineHeight: 22,
  },
  errorRoot: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing[4],
  },
  errorBack: {
    alignSelf: 'flex-start',
    marginBottom: Spacing[6],
  },
  errorBackLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: Colors.foreground,
  },
  errorBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing[6],
  },
  errorTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    color: Colors.foreground,
    textAlign: 'center',
  },
  errorSubtitle: {
    marginTop: Spacing[2],
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: Colors.mutedForeground,
    textAlign: 'center',
  },
  homeButton: {
    marginTop: Spacing[5],
    backgroundColor: Colors.surface,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[2.5],
  },
  homeButtonLabel: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.primary,
  },
});
