import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontFamily, FontSize, Gradient, PlayerLayout, Radii, Spacing } from '@/constants/theme';

type Props = {
  /** 0–100 */
  value: number;
  left?: string;
  right?: string;
};

export function ProgressBar({ value, left, right }: Props) {
  const width = Math.min(100, Math.max(0, value));

  return (
    <View style={styles.row}>
      {left ? <Text style={styles.label}>{left}</Text> : null}
      <View style={styles.track}>
        <LinearGradient
          colors={[...Gradient.primary.colors]}
          start={Gradient.primary.start}
          end={Gradient.primary.end}
          style={[styles.fill, { width: `${width}%` }]}
        />
      </View>
      {right ? <Text style={styles.label}>{right}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    width: '100%',
  },
  label: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    color: Colors.mutedForeground,
    fontVariant: ['tabular-nums'],
    flexShrink: 0,
  },
  track: {
    flex: 1,
    minWidth: 0,
    height: PlayerLayout.progressTrack,
    borderRadius: Radii.full,
    backgroundColor: Colors.surfaceAlt,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radii.full,
  },
});
