import { useEvent } from 'expo';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { VideoView, useVideoPlayer, type VideoSource } from 'expo-video';
import { ArrowLeft, Cast, Maximize2, MoreVertical, Play } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressBar } from '@/components/mytube/ProgressBar';
import {
  Colors,
  FontFamily,
  FontSize,
  Gradient,
  IconSize,
  PlayerLayout,
  Radii,
  Shadows,
  Spacing,
} from '@/constants/theme';

type Props = {
  title: string;
  thumb: ImageSourcePropType;
  playbackUrl?: string;
  onBack: () => void;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '00:00';
  }
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  if (h > 0) {
    return `${h}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export function PlayerStage({ title, thumb, playbackUrl, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const videoRef = useRef<VideoView>(null);
  const [firstFrame, setFirstFrame] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const source: VideoSource | null = playbackUrl ? { uri: playbackUrl } : null;
  const missingUrl = !playbackUrl;

  const player = useVideoPlayer(source, (instance) => {
    instance.timeUpdateEventInterval = 0.25;
    instance.loop = false;
  });

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });
  const { status, error } = useEvent(player, 'statusChange', {
    status: player.status,
  });

  useEffect(() => {
    const sub = player.addListener('timeUpdate', ({ currentTime }) => {
      setPosition(currentTime);
      if (player.duration > 0) {
        setDuration(player.duration);
      }
    });
    return () => {
      sub.remove();
    };
  }, [player]);

  const isLoading = !missingUrl && (status === 'loading' || (!firstFrame && status !== 'error'));
  const hasError = missingUrl || status === 'error';
  const progress = duration > 0 ? (position / duration) * 100 : 0;

  const togglePlay = () => {
    if (hasError) {
      return;
    }
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const onFullscreen = () => {
    void videoRef.current?.enterFullscreen();
  };

  return (
    <View style={styles.stage}>
      {!firstFrame ? (
        <Image source={thumb} style={styles.poster} contentFit="cover" transition={0} />
      ) : null}

      {!missingUrl ? (
        <VideoView
          ref={videoRef}
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
          fullscreenOptions={{ enable: true }}
          onFirstFrameRender={() => setFirstFrame(true)}
          accessibilityLabel={title}
        />
      ) : (
        <View style={styles.video} />
      )}

      <LinearGradient
        colors={['rgba(11, 14, 20, 0.8)', 'transparent']}
        style={styles.topFade}
        pointerEvents="none"
      />

      <View style={[styles.overlayHeader, { paddingTop: insets.top + PlayerLayout.overlayPadding }]}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={styles.iconHit}>
          <ArrowLeft size={IconSize.header} color={Colors.foreground} />
        </Pressable>
        <View style={styles.overlayRight}>
          <Pressable
            disabled
            accessibilityRole="button"
            accessibilityState={{ disabled: true }}
            accessibilityLabel="Cast unavailable"
            style={[styles.iconHit, styles.disabled]}>
            <Cast size={IconSize.playerOverlay} color={Colors.mutedForeground} />
          </Pressable>
          <Pressable
            onPress={onFullscreen}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Fullscreen"
            style={styles.iconHit}>
            <Maximize2 size={IconSize.playerOverlay} color={Colors.foreground} />
          </Pressable>
          <Pressable
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="More"
            style={styles.iconHit}>
            <MoreVertical size={IconSize.playerOverlay} color={Colors.foreground} />
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.centerHit} onPress={togglePlay} disabled={hasError}>
        {isLoading ? (
          <ActivityIndicator color={Colors.primaryForeground} size="large" />
        ) : hasError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              {missingUrl
                ? 'Playback URL unavailable'
                : (error?.message ?? 'Playback error')}
            </Text>
          </View>
        ) : !isPlaying ? (
          <LinearGradient
            colors={[...Gradient.primary.colors]}
            start={Gradient.primary.start}
            end={Gradient.primary.end}
            style={[styles.playFab, Shadows.glow]}>
            <Play
              size={IconSize.playerPlay}
              color={Colors.primaryForeground}
              fill={Colors.primaryForeground}
            />
          </LinearGradient>
        ) : null}
      </Pressable>

      <View style={styles.progressWrap}>
        <ProgressBar
          value={progress}
          left={formatTime(position)}
          right={duration > 0 ? formatTime(duration) : '--:--'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    width: '100%',
    aspectRatio: PlayerLayout.aspectRatio,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  poster: {
    ...StyleSheet.absoluteFill,
  },
  video: {
    ...StyleSheet.absoluteFill,
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
  },
  overlayHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PlayerLayout.overlayPadding,
    paddingBottom: PlayerLayout.overlayPadding,
  },
  overlayRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
  },
  iconHit: {
    padding: 2,
  },
  disabled: {
    opacity: 0.45,
  },
  centerHit: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playFab: {
    width: PlayerLayout.playFab,
    height: PlayerLayout.playFab,
    borderRadius: Radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    backgroundColor: Colors.background80,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderRadius: Radii.md,
    maxWidth: '80%',
  },
  errorText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.foreground,
    textAlign: 'center',
  },
  progressWrap: {
    position: 'absolute',
    left: Spacing[3],
    right: Spacing[3],
    bottom: Spacing[3],
  },
});
